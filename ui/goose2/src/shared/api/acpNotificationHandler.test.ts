import { beforeEach, describe, expect, it } from "vitest";
import type { SessionNotification } from "@agentclientprotocol/sdk";
import { useChatStore } from "@/features/chat/stores/chatStore";
import { registerSession } from "./acpSessionTracker";
import { handleSessionNotification } from "./acpNotificationHandler";

describe("acpNotificationHandler", () => {
  beforeEach(() => {
    useChatStore.setState({
      messagesBySession: {},
      sessionStateById: {},
      queuedMessageBySession: {},
      draftsBySession: {},
      activeSessionId: null,
      isConnected: false,
      loadingSessionIds: new Set<string>(),
      scrollTargetMessageBySession: {},
    });
  });

  it("buffers usage updates until the local session mapping is registered", async () => {
    const notification = {
      sessionId: "goose-session-1",
      update: {
        sessionUpdate: "usage_update",
        used: 512,
        size: 8192,
      },
    } as SessionNotification;

    await handleSessionNotification(notification);

    expect(
      useChatStore.getState().sessionStateById["draft-session-1"],
    ).toBeUndefined();
    expect(
      useChatStore.getState().sessionStateById["goose-session-1"],
    ).toBeUndefined();

    registerSession("draft-session-1", "goose-session-1", "goose", "/tmp");

    const runtime =
      useChatStore.getState().getSessionRuntime("draft-session-1");
    expect(runtime.tokenState.accumulatedTotal).toBe(512);
    expect(runtime.tokenState.contextLimit).toBe(8192);
  });
});
