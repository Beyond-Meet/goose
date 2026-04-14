//! Background knowledge review and pre-compression memory flush.
//!
//! Three mechanisms for autonomous knowledge extraction:
//!
//! 1. **Background memory review**: After a reply, if enough user turns have
//!    elapsed, review the conversation for memory-worthy facts.
//!
//! 2. **Background skill review**: After a reply, if enough tool iterations
//!    occurred (complex work), review whether a skill should be created/updated.
//!
//! 3. **Pre-compression flush**: Before context compaction, give the model
//!    one cheap API call with only memory tools to save anything worth keeping.

use std::sync::Arc;

use crate::agents::extension_manager::ExtensionManager;
use crate::agents::tool_execution::ToolCallContext;
use crate::conversation::message::{Message, MessageContent};
use crate::conversation::Conversation;
use crate::providers::base::Provider;
use rmcp::model::Tool;
use tokio_util::sync::CancellationToken;
use tracing::{debug, info, warn};

/// Default interval: review memory every N user turns.
pub const DEFAULT_MEMORY_REVIEW_INTERVAL: u32 = 5;

/// Default interval: review skills every N tool iterations in a single reply.
pub const DEFAULT_SKILL_REVIEW_ITERATIONS: u32 = 10;

/// Maximum tool calls the review agent can make per review.
const MAX_REVIEW_TOOL_CALLS: usize = 8;

const MEMORY_REVIEW_PROMPT: &str = r#"Review the conversation above and extract any durable facts worth saving to persistent memory. Focus on:

1. User identity/preferences: name, role, timezone, coding style, communication preferences, pet peeves
   → Save these with target "user"

2. Environment/project facts: OS, installed tools, project structure, build commands, API quirks, tool behaviors
   → Save these with target "memory"

3. Corrections: if the user corrected the agent's approach, save the correct approach

4. Lessons learned: non-obvious things discovered through trial and error
   → Save with target "memory"

Rules:
- Do NOT save task progress, session outcomes, or temporary state
- Do NOT save things that are obvious or easily re-discovered
- Keep entries concise — one fact per entry
- If nothing is worth saving, just say so.

Make your memory tool calls now."#;

const SKILL_REVIEW_PROMPT: &str = r#"Review the conversation above and consider saving or updating a skill if appropriate.

Focus on: was a non-trivial approach used to complete a task that required trial and error, or changing course due to experiential findings along the way, or did the user expect or desire a different method or outcome?

If a relevant skill already exists, update it with what you learned.
Otherwise, create a new skill if the approach is reusable.
If nothing is worth saving, just say "Nothing to save." and stop."#;

const COMBINED_REVIEW_PROMPT: &str = r#"Review the conversation above and consider two things:

**Memory**: Has the user revealed things about themselves — their persona, desires, preferences, or personal details? Has the user expressed expectations about how you should behave, their work style, or ways they want you to operate? If so, save using the memory tool.

**Skills**: Was a non-trivial approach used to complete a task that required trial and error, or changing course due to experiential findings along the way, or did the user expect or desire a different method or outcome? If a relevant skill already exists, update it. Otherwise, create a new one if the approach is reusable.

Only act if there's something genuinely worth saving.
If nothing stands out, just say "Nothing to save." and stop."#;

const FLUSH_PROMPT: &str = "[System: The session context is being compressed. Save anything worth remembering permanently — prioritize user preferences, corrections, environment facts, and recurring patterns over task-specific details. This is your last chance before earlier conversation turns are summarized away.]";

/// Spawn a background task to review the conversation for memory and/or skill saves.
///
/// Runs AFTER the reply is delivered. The user never sees this.
#[allow(clippy::too_many_arguments)]
pub fn spawn_background_review(
    provider: Arc<dyn Provider>,
    extension_manager: Arc<ExtensionManager>,
    session_manager: Arc<crate::session::SessionManager>,
    conversation: Conversation,
    session_id: String,
    working_dir: std::path::PathBuf,
    review_memory: bool,
    review_skills: bool,
) {
    let base_prompt = if review_memory && review_skills {
        COMBINED_REVIEW_PROMPT
    } else if review_skills {
        SKILL_REVIEW_PROMPT
    } else {
        MEMORY_REVIEW_PROMPT
    };

    let task_name = if review_memory && review_skills {
        "combined_review"
    } else if review_skills {
        "skill_review"
    } else {
        "memory_review"
    };

    let sid = session_id.clone();
    tokio::spawn(async move {
        // Query past sessions for cross-session patterns
        let session_context = build_session_context(&session_manager, &sid).await;
        let prompt = if session_context.is_empty() {
            base_prompt.to_string()
        } else {
            format!(
                "{}\n\nContext from past sessions (consider saving recurring patterns):\n{}",
                base_prompt, session_context
            )
        };

        if let Err(e) = run_knowledge_extraction(
            provider.as_ref(),
            &extension_manager,
            &conversation,
            &sid,
            &working_dir,
            &prompt,
            task_name,
            ReviewScope {
                include_memory_tools: review_memory,
                include_skill_tools: review_skills,
            },
        )
        .await
        {
            warn!("Background {} failed: {}", task_name, e);
        }
    });
}

/// Query recent past sessions for recurring patterns to feed into the review.
///
/// Extracts key user messages from recent sessions to help the review agent
/// notice cross-session patterns (e.g. "user always does X", "this tool quirk
/// keeps coming up").
async fn build_session_context(
    session_manager: &crate::session::SessionManager,
    exclude_session_id: &str,
) -> String {
    use crate::session::session_manager::SessionType;

    // Search recent sessions for user messages (broad query)
    let results = session_manager
        .search_chat_history(
            "*", // broad search
            Some(5),
            None,
            None,
            Some(exclude_session_id.to_string()),
            vec![SessionType::User],
        )
        .await;

    let Ok(results) = results else {
        return String::new();
    };

    if results.results.is_empty() {
        return String::new();
    }

    let mut context = String::new();
    for session in results.results.iter().take(3) {
        if session.messages.is_empty() {
            continue;
        }
        context.push_str(&format!(
            "\n[Session: {} ({})]\n",
            session.session_description, session.last_activity
        ));
        for msg in session.messages.iter().take(5) {
            let preview: String = msg.content.chars().take(200).collect();
            context.push_str(&format!("  {}: {}\n", msg.role, preview));
        }
    }

    // Cap at 2000 chars to avoid bloating the review prompt
    let truncated: String = context.chars().take(2000).collect();
    if truncated.len() < context.len() {
        context = truncated;
        context.push_str("\n[...truncated]");
    }

    context
}

/// Run the pre-compression flush synchronously before compaction.
pub async fn flush_memories_before_compaction(
    provider: &dyn Provider,
    extension_manager: &ExtensionManager,
    conversation: &Conversation,
    session_id: &str,
    working_dir: &std::path::Path,
) -> anyhow::Result<()> {
    info!("Flushing memories before context compaction");

    let user_msg_count = conversation
        .messages()
        .iter()
        .filter(|m| matches!(m.role, rmcp::model::Role::User) && m.is_agent_visible())
        .count();

    if user_msg_count < 3 {
        debug!(
            "Skipping memory flush: too few user messages ({})",
            user_msg_count
        );
        return Ok(());
    }

    run_knowledge_extraction(
        provider,
        extension_manager,
        conversation,
        session_id,
        working_dir,
        FLUSH_PROMPT,
        "flush",
        ReviewScope {
            include_memory_tools: true,
            include_skill_tools: false,
        },
    )
    .await
}

/// What to review in a knowledge extraction call.
struct ReviewScope {
    include_memory_tools: bool,
    include_skill_tools: bool,
}

/// Core extraction logic shared by all review types.
#[allow(clippy::too_many_arguments)]
async fn run_knowledge_extraction(
    provider: &dyn Provider,
    extension_manager: &ExtensionManager,
    conversation: &Conversation,
    session_id: &str,
    working_dir: &std::path::Path,
    extraction_prompt: &str,
    task_name: &str,
    scope: ReviewScope,
) -> anyhow::Result<()> {
    let all_tools = extension_manager
        .get_prefixed_tools(session_id, None)
        .await
        .unwrap_or_default();

    let review_tools = filter_review_tools(all_tools, &scope);

    if review_tools.is_empty() {
        debug!("No relevant tools found, skipping {} extraction", task_name);
        return Ok(());
    }

    let mut messages: Vec<Message> = conversation
        .messages()
        .iter()
        .filter(|m| m.is_agent_visible())
        .cloned()
        .collect();

    messages.push(Message::user().with_text(extraction_prompt));

    let system_prompt =
        "You are reviewing a conversation to extract durable knowledge. \
         You have access to memory and/or skill tools. Use them to save important facts \
         or reusable approaches. Be selective — only save things that will matter in future sessions.";

    let mut tool_calls_made = 0;

    loop {
        if tool_calls_made >= MAX_REVIEW_TOOL_CALLS {
            break;
        }

        let result = provider
            .complete_fast(session_id, system_prompt, &messages, &review_tools)
            .await;

        let (response_message, _usage) = match result {
            Ok(r) => r,
            Err(e) => {
                debug!("{} model call failed: {}", task_name, e);
                break;
            }
        };

        let tool_requests: Vec<_> = response_message
            .content
            .iter()
            .filter_map(|c| {
                if let MessageContent::ToolRequest(tr) = c {
                    Some(tr.clone())
                } else {
                    None
                }
            })
            .collect();

        if tool_requests.is_empty() {
            break;
        }

        messages.push(response_message);

        for tool_request in &tool_requests {
            tool_calls_made += 1;

            let tool_call = match &tool_request.tool_call {
                Ok(call) => call.clone(),
                Err(_) => continue,
            };

            let ctx = ToolCallContext::new(
                session_id.to_string(),
                Some(working_dir.to_path_buf()),
                None,
            );

            match extension_manager
                .dispatch_tool_call(&ctx, tool_call, CancellationToken::default())
                .await
            {
                Ok(tool_result) => {
                    let call_result = tool_result.result.await;
                    debug!(
                        "{} tool call completed: {:?}",
                        task_name,
                        call_result.is_ok()
                    );
                    let response =
                        Message::user().with_tool_response(tool_request.id.clone(), call_result);
                    messages.push(response);
                }
                Err(e) => {
                    debug!("{} tool dispatch failed: {}", task_name, e);
                }
            }
        }
    }

    info!(
        "{} complete: {} tool calls made",
        task_name, tool_calls_made
    );
    Ok(())
}

/// Filter tools to just the ones relevant for a given review scope.
/// Extracted for testability.
fn filter_review_tools(all_tools: Vec<Tool>, scope: &ReviewScope) -> Vec<Tool> {
    all_tools
        .into_iter()
        .filter(|t| {
            let name: &str = &t.name;
            let is_memory = name == "memory" || name.ends_with("__memory");
            let is_skill = name == "create_skill"
                || name == "patch_skill"
                || name == "load_skill"
                || name.ends_with("__create_skill")
                || name.ends_with("__patch_skill")
                || name.ends_with("__load_skill");
            (scope.include_memory_tools && is_memory) || (scope.include_skill_tools && is_skill)
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use rmcp::model::Tool;

    fn make_tool(name: &str) -> Tool {
        let schema: serde_json::Map<String, serde_json::Value> =
            serde_json::from_value(serde_json::json!({"type": "object"})).unwrap();
        Tool::new(name.to_string(), "test".to_string(), schema)
    }

    fn test_tools() -> Vec<Tool> {
        vec![
            make_tool("memory"),
            make_tool("platform__memory"),
            make_tool("create_skill"),
            make_tool("patch_skill"),
            make_tool("load_skill"),
            make_tool("skills__create_skill"),
            make_tool("skills__patch_skill"),
            make_tool("skills__load_skill"),
            make_tool("read_file"),
            make_tool("write_file"),
            make_tool("developer__shell"),
        ]
    }

    #[test]
    fn test_filter_memory_tools_only() {
        let tools = test_tools();
        let scope = ReviewScope {
            include_memory_tools: true,
            include_skill_tools: false,
        };
        let filtered = filter_review_tools(tools, &scope);
        let names: Vec<&str> = filtered.iter().map(|t| t.name.as_ref()).collect();
        assert_eq!(names, vec!["memory", "platform__memory"]);
    }

    #[test]
    fn test_filter_skill_tools_only() {
        let tools = test_tools();
        let scope = ReviewScope {
            include_memory_tools: false,
            include_skill_tools: true,
        };
        let filtered = filter_review_tools(tools, &scope);
        let names: Vec<&str> = filtered.iter().map(|t| t.name.as_ref()).collect();
        assert_eq!(
            names,
            vec![
                "create_skill",
                "patch_skill",
                "load_skill",
                "skills__create_skill",
                "skills__patch_skill",
                "skills__load_skill",
            ]
        );
    }

    #[test]
    fn test_filter_combined_tools() {
        let tools = test_tools();
        let scope = ReviewScope {
            include_memory_tools: true,
            include_skill_tools: true,
        };
        let filtered = filter_review_tools(tools, &scope);
        let names: Vec<&str> = filtered.iter().map(|t| t.name.as_ref()).collect();
        assert_eq!(
            names,
            vec![
                "memory",
                "platform__memory",
                "create_skill",
                "patch_skill",
                "load_skill",
                "skills__create_skill",
                "skills__patch_skill",
                "skills__load_skill",
            ]
        );
    }

    #[test]
    fn test_filter_excludes_unrelated_tools() {
        let tools = test_tools();
        let scope = ReviewScope {
            include_memory_tools: true,
            include_skill_tools: true,
        };
        let filtered = filter_review_tools(tools, &scope);
        let names: Vec<&str> = filtered.iter().map(|t| t.name.as_ref()).collect();
        assert!(!names.contains(&"read_file"));
        assert!(!names.contains(&"write_file"));
        assert!(!names.contains(&"developer__shell"));
    }

    #[test]
    fn test_filter_empty_when_no_scope() {
        let tools = test_tools();
        let scope = ReviewScope {
            include_memory_tools: false,
            include_skill_tools: false,
        };
        let filtered = filter_review_tools(tools, &scope);
        assert!(filtered.is_empty());
    }

    #[test]
    fn test_prompt_selection_memory_only() {
        let review_memory = true;
        let review_skills = false;
        let prompt = if review_memory && review_skills {
            COMBINED_REVIEW_PROMPT
        } else if review_skills {
            SKILL_REVIEW_PROMPT
        } else {
            MEMORY_REVIEW_PROMPT
        };
        assert!(prompt.contains("persistent memory"));
        assert!(!prompt.contains("skill"));
    }

    #[test]
    fn test_prompt_selection_skills_only() {
        let review_memory = false;
        let review_skills = true;
        let prompt = if review_memory && review_skills {
            COMBINED_REVIEW_PROMPT
        } else if review_skills {
            SKILL_REVIEW_PROMPT
        } else {
            MEMORY_REVIEW_PROMPT
        };
        assert!(prompt.contains("skill"));
    }

    #[test]
    fn test_prompt_selection_combined() {
        let review_memory = true;
        let review_skills = true;
        let prompt = if review_memory && review_skills {
            COMBINED_REVIEW_PROMPT
        } else if review_skills {
            SKILL_REVIEW_PROMPT
        } else {
            MEMORY_REVIEW_PROMPT
        };
        assert!(prompt.contains("Memory"));
        assert!(prompt.contains("Skills"));
    }

    #[test]
    fn test_trigger_thresholds() {
        // Memory review fires at DEFAULT_MEMORY_REVIEW_INTERVAL turns
        assert_eq!(DEFAULT_MEMORY_REVIEW_INTERVAL, 5);
        assert!(5 >= DEFAULT_MEMORY_REVIEW_INTERVAL);
        assert!(!(4 >= DEFAULT_MEMORY_REVIEW_INTERVAL));

        // Skill review fires at DEFAULT_SKILL_REVIEW_ITERATIONS tool calls
        assert_eq!(DEFAULT_SKILL_REVIEW_ITERATIONS, 10);
        assert!(10u32 >= DEFAULT_SKILL_REVIEW_ITERATIONS);
        assert!(!(9u32 >= DEFAULT_SKILL_REVIEW_ITERATIONS));
    }

    #[test]
    fn test_max_review_tool_calls_limit() {
        // Sanity check — shouldn't be unbounded
        assert!(MAX_REVIEW_TOOL_CALLS > 0);
        assert!(MAX_REVIEW_TOOL_CALLS <= 20);
    }
}
