mod persist;

use axum::extract::{Query, State};
use axum::response::Html;
use axum::routing::get;
use axum::Router;
use minijinja::render;
use oauth2::TokenResponse;
use rmcp::transport::auth::{
    AuthorizationMetadata, AuthorizationSession, CredentialStore, OAuthState, StoredCredentials,
};
use rmcp::transport::AuthorizationManager;
use serde::Deserialize;
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::sync::{oneshot, Mutex};
use tracing::warn;
use url::Url;

use crate::oauth::persist::GooseCredentialStore;

const CALLBACK_TEMPLATE: &str = include_str!("oauth_callback.html");
const CLIENT_METADATA_URL: &str = "https://goose-docs.ai/oauth/client-metadata.json";

#[derive(Clone)]
struct AppState {
    code_receiver: Arc<Mutex<Option<oneshot::Sender<CallbackParams>>>>,
}

#[derive(Debug, Deserialize)]
struct CallbackParams {
    code: String,
    state: String,
}

pub async fn oauth_flow(
    mcp_server_url: &String,
    name: &String,
) -> Result<AuthorizationManager, anyhow::Error> {
    let credential_store = GooseCredentialStore::new(name.clone());
    let mut auth_manager = AuthorizationManager::new(mcp_server_url).await?;
    auth_manager.set_credential_store(credential_store.clone());

    if auth_manager.initialize_from_store().await? {
        if auth_manager.refresh_token().await.is_ok() {
            return Ok(auth_manager);
        }

        if let Err(e) = credential_store.clear().await {
            warn!("error clearing bad credentials: {}", e);
        }
    }

    // No existing credentials or they were invalid - need to do the full oauth flow
    let (code_sender, code_receiver) = oneshot::channel::<CallbackParams>();
    let app_state = AppState {
        code_receiver: Arc::new(Mutex::new(Some(code_sender))),
    };

    let rendered = render!(CALLBACK_TEMPLATE, name => name);
    let handler = move |Query(params): Query<CallbackParams>, State(state): State<AppState>| {
        let rendered = rendered.clone();
        async move {
            if let Some(sender) = state.code_receiver.lock().await.take() {
                let _ = sender.send(params);
            }
            Html(rendered)
        }
    };
    let app = Router::new()
        .route("/oauth_callback", get(handler))
        .with_state(app_state);

    let addr = SocketAddr::from(([127, 0, 0, 1], 0));
    let listener = tokio::net::TcpListener::bind(addr).await?;
    let used_addr = listener.local_addr()?;
    tokio::spawn(async move {
        let result = axum::serve(listener, app).await;
        if let Err(e) = result {
            eprintln!("Callback server error: {}", e);
        }
    });

    let mut oauth_state = OAuthState::new(mcp_server_url, None).await?;

    let redirect_uri = format!("http://127.0.0.1:{}/oauth_callback", used_addr.port());
    if let Err(e) = oauth_state
        .start_authorization_with_metadata_url(
            &[],
            redirect_uri.as_str(),
            Some("goose"),
            Some(CLIENT_METADATA_URL),
        )
        .await
    {
        // Workaround for an rmcp bug where resource metadata discovery fails fatally
        // when the MCP server returns non-JSON (e.g. HTML) at its base URL with HTTP 200,
        // preventing fallback to .well-known/oauth-authorization-server discovery.
        // See: https://github.com/modelcontextprotocol/rust-sdk/pull/810
        warn!(
            "OAuth authorization failed, retrying with direct metadata discovery: {}",
            e
        );
        oauth_state = start_authorization_with_wellknown_fallback(mcp_server_url, &redirect_uri)
            .await
            .map_err(|fallback_err| {
                anyhow::anyhow!(
                    "OAuth authorization failed: {e}; fallback also failed: {fallback_err}"
                )
            })?;
    }

    let authorization_url = oauth_state.get_authorization_url().await?;
    if webbrowser::open(authorization_url.as_str()).is_err() {
        eprintln!("Open the following URL to authorize {}:", name);
        eprintln!("  {}", authorization_url);
    }

    let CallbackParams {
        code: auth_code,
        state: csrf_token,
    } = code_receiver.await?;
    oauth_state.handle_callback(&auth_code, &csrf_token).await?;

    let (client_id, token_response) = oauth_state.get_credentials().await?;

    let mut auth_manager = oauth_state
        .into_authorization_manager()
        .ok_or_else(|| anyhow::anyhow!("Failed to get authorization manager"))?;

    let granted_scopes: Vec<String> = token_response
        .as_ref()
        .and_then(|tr| tr.scopes())
        .map(|scopes| scopes.iter().map(|s| s.to_string()).collect())
        .unwrap_or_default();

    credential_store
        .save(StoredCredentials {
            client_id,
            token_response,
            granted_scopes,
            token_received_at: Some(
                std::time::SystemTime::now()
                    .duration_since(std::time::UNIX_EPOCH)
                    .map(|duration| duration.as_secs())
                    .unwrap_or(0),
            ),
        })
        .await?;

    auth_manager.set_credential_store(credential_store);

    Ok(auth_manager)
}

/// Fallback for when OAuthState::start_authorization_with_metadata_url fails due to
/// the resource metadata discovery bug. Fetches OAuth metadata directly from the
/// .well-known/oauth-authorization-server endpoint and creates the session manually.
async fn start_authorization_with_wellknown_fallback(
    mcp_server_url: &str,
    redirect_uri: &str,
) -> Result<OAuthState, anyhow::Error> {
    let base_url = Url::parse(mcp_server_url)?;
    let wellknown_url = format!(
        "{}/.well-known/oauth-authorization-server",
        base_url.origin().ascii_serialization()
    );
    let metadata = reqwest::get(&wellknown_url)
        .await?
        .error_for_status()?
        .json::<AuthorizationMetadata>()
        .await?;

    let mut manager = AuthorizationManager::new(mcp_server_url).await?;
    manager.set_metadata(metadata);

    let session = AuthorizationSession::new(
        manager,
        &[],
        redirect_uri,
        Some("goose"),
        Some(CLIENT_METADATA_URL),
    )
    .await?;

    Ok(OAuthState::Session(session))
}
