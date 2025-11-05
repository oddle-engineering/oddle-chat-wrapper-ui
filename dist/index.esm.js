var Ba = Object.defineProperty;
var Ga = (e, t, n) => t in e ? Ba(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var F = (e, t, n) => Ga(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as h, jsxs as A, Fragment as Jt } from "react/jsx-runtime";
import Ot, { useState as J, useEffect as Be, useCallback as te, useRef as Ge, useMemo as Le, Component as ir, memo as Pi, forwardRef as ar, useImperativeHandle as Va, createContext as Wa, useContext as $a } from "react";
async function ja(e, t) {
  const n = {
    "Content-Type": "application/json"
  };
  t != null && t.userMpAuthToken && (n["x-oddle-mp-auth-token"] = t.userMpAuthToken), t != null && t.chatServerKey && (n["x-oddle-chat-server-key"] = t.chatServerKey);
  const r = await fetch(`${e}/api/v1/agent-configurations`, {
    method: "GET",
    headers: n
  });
  if (!r.ok) {
    const a = await r.json().catch(() => ({}));
    throw new Error(
      a.message || `Failed to get agent configuration: ${r.statusText}`
    );
  }
  return (await r.json()).configurations;
}
async function Za(e, t, n) {
  return (await ja(e, n)).find((i) => i.app === t) || null;
}
async function qa(e, t, n) {
  const r = {
    "Content-Type": "application/json"
  };
  n != null && n.userMpAuthToken && (r["x-oddle-mp-auth-token"] = n.userMpAuthToken), n != null && n.chatServerKey && (r["x-oddle-chat-server-key"] = n.chatServerKey);
  const i = await fetch(`${e}/api/v1/agent-configurations`, {
    method: "PUT",
    headers: r,
    body: JSON.stringify(t)
  });
  if (!i.ok) {
    const s = await i.json().catch(() => ({}));
    throw new Error(
      s.message || `Failed to update agent configuration: ${i.statusText}`
    );
  }
  return (await i.json()).configuration;
}
const Ka = ({
  isOpen: e,
  onClose: t,
  apiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  app: a = "UD21"
  // Default to UD21 if not specified
}) => {
  const [s, o] = J(null), [l, c] = J(""), [u, d] = J(""), [m, p] = J(!1), [w, S] = J(null);
  Be(() => {
    e && !s && N();
  }, [e]);
  const N = te(async () => {
    p(!0), S(null);
    try {
      const _ = await Za(n, a, {
        userMpAuthToken: r,
        chatServerKey: i
      });
      if (!_)
        throw new Error(`No configuration found for app: ${a}`);
      o(_), c(_.promptPath), d(_.versionUuid);
    } catch (_) {
      S(_ instanceof Error ? _.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", _);
    } finally {
      p(!1);
    }
  }, [n, a, r, i]), T = te(async () => {
    if (s) {
      p(!0), S(null);
      try {
        const _ = await qa(n, {
          app: s.app,
          promptPath: l,
          versionUuid: u,
          isDefault: s.isDefault
        }, {
          userMpAuthToken: r,
          chatServerKey: i
        });
        o(_), t(), window.location.reload();
      } catch (_) {
        S(_ instanceof Error ? _.message : "Failed to update configuration"), console.error("Error updating agent configuration:", _);
      } finally {
        p(!1);
      }
    }
  }, [n, l, u, s, t, r, i]), O = te(() => {
    s && (c(s.promptPath), d(s.versionUuid)), S(null), t();
  }, [s, t]);
  return e ? /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ h("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: O,
          title: "Close settings",
          children: /* @__PURE__ */ h(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ h(
                "path",
                {
                  d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
                  fill: "currentColor"
                }
              )
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-content", children: [
      m && /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      w && /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ A("p", { children: [
          "Error: ",
          w
        ] }),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: N,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      s && !m && /* @__PURE__ */ A(Jt, { children: [
        /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: l,
              onChange: (_) => c(_.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: m
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: u,
              onChange: (_) => d(_.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: m
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "app-name", children: "App:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "app-name",
              type: "text",
              value: s.app,
              className: "chat-wrapper__dev-settings-input",
              disabled: !0,
              readOnly: !0
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Application name for this agent configuration." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: O,
          disabled: m,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: T,
          disabled: m || !s,
          children: m ? "Saving..." : "Save"
        }
      )
    ] })
  ] }) }) : null;
}, Xa = {
  maxReconnectAttempts: 5,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, Lr = {
  NORMAL: 1e3,
  GOING_AWAY: 1001
};
var tt = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(tt || {}), Ct = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e))(Ct || {}), Me = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(Me || {}), cn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(cn || {}), _t = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(_t || {});
class Dt {
  static createConnectionEvent(t, n) {
    return {
      type: t,
      timestamp: /* @__PURE__ */ new Date(),
      data: n
    };
  }
  static createChatEvent(t, n) {
    return {
      type: t,
      timestamp: /* @__PURE__ */ new Date(),
      data: n
    };
  }
  // Convenience methods for common events
  static connectionEstablished() {
    return this.createConnectionEvent(tt.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(tt.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(tt.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(tt.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(tt.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(tt.CHAT_ERROR, { error: t, errorCode: n });
  }
}
class kt {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(t) {
    return {
      type: Ct.CHAT_MESSAGE,
      content: t.content,
      app: t.app,
      media: t.media || [],
      saveToDatabase: t.saveToDatabase ?? !1,
      userId: t.userId,
      convUuid: t.convUuid,
      agentPromptPath: t.agentPromptPath
    };
  }
  /**
   * Create a configure tools message
   */
  static createConfigureToolsMessage(t, n) {
    return {
      type: Ct.CONFIGURE_TOOLS,
      toolSchemas: t,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(t) {
    return {
      type: Ct.UPDATE_TOOLS,
      toolSchemas: t
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(t) {
    return {
      type: Ct.UPDATE_CONTEXT_HELPERS,
      contextHelpers: t
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(t, n) {
    return {
      type: Ct.TOOL_CALL_RESPONSE,
      callId: t,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(t, n) {
    return {
      type: Ct.TOOL_CALL_RESPONSE,
      callId: t,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: Ct.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(t, n) {
    return {
      type: Ct.HEARTBEAT_PONG,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      originalTimestamp: t,
      pingTime: n
    };
  }
  /**
   * Serialize a message to JSON string for sending over WebSocket
   */
  static serialize(t) {
    return JSON.stringify(t);
  }
  /**
   * Generic helper to create and serialize any message in one call
   */
  static createAndSerialize(t) {
    return this.serialize(t());
  }
  /**
   * Helper methods to create and serialize messages in one call
   */
  static serializeChatMessage(t) {
    return this.createAndSerialize(() => this.createChatMessage(t));
  }
  static serializeConfigureTools(t, n) {
    return this.createAndSerialize(
      () => this.createConfigureToolsMessage(t, n)
    );
  }
  static serializeUpdateTools(t) {
    return this.createAndSerialize(() => this.createUpdateToolsMessage(t));
  }
  static serializeUpdateContextHelpers(t) {
    return this.createAndSerialize(
      () => this.createUpdateContextHelpersMessage(t)
    );
  }
  static serializeToolCallSuccess(t, n) {
    return this.createAndSerialize(
      () => this.createToolCallSuccessResponse(t, n)
    );
  }
  static serializeToolCallError(t, n) {
    return this.createAndSerialize(
      () => this.createToolCallErrorResponse(t, n)
    );
  }
  static serializeHeartbeatPing() {
    return this.createAndSerialize(() => this.createHeartbeatPing());
  }
  static serializeHeartbeatPong(t, n) {
    return this.createAndSerialize(
      () => this.createHeartbeatPong(t, n)
    );
  }
}
class Ya {
  constructor(t, n) {
    F(this, "ws", null);
    F(this, "config");
    F(this, "connectionState");
    F(this, "reconnectTimer", null);
    F(this, "heartbeatInterval", null);
    F(this, "visibilityChangeHandler");
    F(this, "currentTicket", null);
    F(this, "intentionalDisconnect", !1);
    // Track intentional disconnects
    F(this, "onOpen");
    F(this, "onMessage");
    F(this, "onError");
    F(this, "onClose");
    F(this, "onSystemEvent");
    this.config = t, this.connectionState = n, this.visibilityChangeHandler = this.handleVisibilityChange.bind(this), this.registerVisibilityHandler();
  }
  connect(t) {
    return new Promise((n, r) => {
      try {
        this.intentionalDisconnect = !1, t && (this.currentTicket = t);
        const i = this.buildWebSocketUrl();
        if (this.ws = new WebSocket(i), !this.ws) {
          r(new Error("WebSocket not initialized"));
          return;
        }
        this.setupEventHandlers(n, r);
      } catch (i) {
        r(i);
      }
    });
  }
  buildWebSocketUrl() {
    let t = this.config.apiUrl.replace(/^https:\/\//, "wss://").replace(/^http:\/\//, "ws://");
    if (t = t.endsWith("/ws") ? t : t + "/ws", this.currentTicket) {
      const n = t.includes("?") ? "&" : "?";
      t = `${t}${n}ticket=${this.currentTicket}`;
    }
    return t;
  }
  setupEventHandlers(t, n) {
    this.ws && (this.ws.onopen = () => this.handleConnectionOpened(t), this.ws.onerror = (r) => this.handleConnectionError(r, t, n), this.ws.onmessage = (r) => {
      var i;
      return (i = this.onMessage) == null ? void 0 : i.call(this, r);
    }, this.ws.onclose = (r) => this.handleConnectionClosed(r));
  }
  handleConnectionOpened(t) {
    var n;
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (n = this.onOpen) == null || n.call(this), t == null || t();
  }
  handleConnectionError(t, n, r) {
    var i;
    (i = this.onError) == null || i.call(this, t), t instanceof Event && n ? (this.connectionState.setConnected(!0), n()) : r == null || r(t);
  }
  handleConnectionClosed(t) {
    var n;
    this.processConnectionClosure(t), (n = this.onClose) == null || n.call(this, t), this.shouldReconnectAfterClose(t.code) && this.attemptReconnect();
  }
  updateConnectionState(t, n) {
    this.connectionState.setConnected(t), this.connectionState.setReconnecting(n), this.connectionState.resetReconnectAttempts(), this.connectionState.updateReconnectDelay(this.config.reconnectDelay);
  }
  processConnectionClosure(t) {
    this.connectionState.setConnected(!1), this.stopHeartbeat();
  }
  shouldReconnectAfterClose(t) {
    if (this.intentionalDisconnect)
      return !1;
    const { NORMAL: n, GOING_AWAY: r } = Lr;
    return t !== n && t !== r;
  }
  handleVisibilityChange() {
    document.visibilityState === "visible" && !this.connectionState.isConnected && !this.connectionState.isReconnecting && this.attemptReconnect();
  }
  registerVisibilityHandler() {
    typeof document < "u" && document.addEventListener(
      "visibilitychange",
      this.visibilityChangeHandler
    );
  }
  attemptReconnect() {
    var i, a;
    if (this.connectionState.isReconnecting || this.connectionState.reconnectAttempts >= this.config.maxReconnectAttempts) {
      this.connectionState.reconnectAttempts >= this.config.maxReconnectAttempts && ((i = this.onSystemEvent) == null || i.call(
        this,
        Dt.connectionLost("Max reconnection attempts reached")
      ));
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    (a = this.onSystemEvent) == null || a.call(this, Dt.reconnecting(t, n)), this.reconnectTimer = window.setTimeout(() => {
      this.connectionState.isConnected || this.reconnect();
    }, this.connectionState.reconnectDelay);
    const r = Math.min(this.connectionState.reconnectDelay * 1.5, 3e4);
    this.connectionState.updateReconnectDelay(r);
  }
  reconnect() {
    try {
      this.closeConnection();
      const t = this.buildWebSocketUrl();
      this.ws = new WebSocket(t), this.setupReconnectHandlers();
    } catch {
      this.scheduleReconnectAfterError();
    }
  }
  /**
   * Update the ticket for future connections
   */
  updateTicket(t) {
    this.currentTicket = t;
  }
  setupReconnectHandlers() {
    this.ws && (this.ws.onopen = () => this.handleReconnectionOpened(), this.ws.onerror = () => this.handleReconnectionError(), this.ws.onmessage = (t) => {
      var n;
      return (n = this.onMessage) == null ? void 0 : n.call(this, t);
    }, this.ws.onclose = (t) => this.handleReconnectionClosed(t));
  }
  handleReconnectionOpened() {
    var t, n;
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Dt.connectionRestored()), (n = this.onOpen) == null || n.call(this);
  }
  handleReconnectionError() {
    this.scheduleReconnectAfterError();
  }
  scheduleReconnectAfterError() {
    this.connectionState.setReconnecting(!1), setTimeout(
      () => this.attemptReconnect(),
      this.connectionState.reconnectDelay
    );
  }
  handleReconnectionClosed(t) {
    this.processConnectionClosure(t), this.connectionState.setReconnecting(!1), this.shouldReconnectAfterClose(t.code) && this.attemptReconnect();
  }
  startHeartbeat() {
  }
  sendHeartbeat() {
    const t = kt.serializeHeartbeatPing();
    this.send(t);
  }
  stopHeartbeat() {
    this.heartbeatInterval && (clearInterval(this.heartbeatInterval), this.heartbeatInterval = null);
  }
  send(t) {
    var n;
    ((n = this.ws) == null ? void 0 : n.readyState) === WebSocket.OPEN && this.ws.send(t);
  }
  closeConnection() {
    this.ws && this.ws.close(Lr.NORMAL);
  }
  disconnect() {
    this.intentionalDisconnect = !0, this.clearTimers(), this.removeEventListeners(), this.closeConnection(), this.connectionState.reset(), this.ws = null;
  }
  clearTimers() {
    this.reconnectTimer && (window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null), this.stopHeartbeat();
  }
  removeEventListeners() {
    typeof document < "u" && this.visibilityChangeHandler && document.removeEventListener(
      "visibilitychange",
      this.visibilityChangeHandler
    );
  }
  getWebSocketState() {
    return this.ws ? {
      [WebSocket.CONNECTING]: "CONNECTING",
      [WebSocket.OPEN]: "OPEN",
      [WebSocket.CLOSING]: "CLOSING",
      [WebSocket.CLOSED]: "CLOSED"
    }[this.ws.readyState] || "UNKNOWN" : "null";
  }
  setEventHandlers(t) {
    this.onOpen = t.onOpen, this.onMessage = t.onMessage, this.onError = t.onError, this.onClose = t.onClose, this.onSystemEvent = t.onSystemEvent;
  }
}
class Qa {
  constructor() {
    F(this, "state");
    this.state = {
      isConnected: !1,
      isReconnecting: !1,
      reconnectAttempts: 0,
      reconnectDelay: 1e3
    };
  }
  update(t) {
    Object.assign(this.state, t);
  }
  get isConnected() {
    return this.state.isConnected;
  }
  get isReconnecting() {
    return this.state.isReconnecting;
  }
  get reconnectAttempts() {
    return this.state.reconnectAttempts;
  }
  get reconnectDelay() {
    return this.state.reconnectDelay;
  }
  setConnected(t) {
    this.state.isConnected = t;
  }
  setReconnecting(t) {
    this.state.isReconnecting = t;
  }
  incrementReconnectAttempts() {
    this.state.reconnectAttempts++;
  }
  resetReconnectAttempts() {
    this.state.reconnectAttempts = 0;
  }
  updateReconnectDelay(t) {
    this.state.reconnectDelay = t;
  }
  reset() {
    this.state = {
      isConnected: !1,
      isReconnecting: !1,
      reconnectAttempts: 0,
      reconnectDelay: 1e3
    };
  }
  getSnapshot() {
    return { ...this.state };
  }
}
class dn {
  /**
   * Create a synthetic ToolCallRequest for server-side tool calls
   */
  static createServerToolCall(t, n, r = {}) {
    return {
      toolName: t,
      callId: n,
      parameters: r
    };
  }
  /**
   * Create a synthetic ToolCallRequest for reasoning operations
   */
  static createReasoningCall(t, n, r) {
    return {
      toolName: "reasoning",
      callId: t,
      parameters: { phase: n, ...r }
    };
  }
  /**
   * Create a synthetic ToolCallRequest for Latitude tool calls
   */
  static createLatitudeToolCall(t, n, r = {}) {
    return {
      toolName: t,
      callId: n,
      parameters: r
    };
  }
}
class Hi {
  constructor(t = {}) {
    F(this, "handlers", {});
    this.handlers = t;
  }
  updateEventHandlers(t) {
    Object.assign(this.handlers, t), this.onHandlersUpdated(t);
  }
  /**
   * Hook for subclasses to react to handler updates
   */
  onHandlersUpdated(t) {
  }
  getHandler(t) {
    return this.handlers[t];
  }
}
const G = {
  // Message prefixes and markers
  THINKING_PREFIX: "THINKING:",
  REASONING_PREFIX: "REASONING:",
  THOUGHT_PREFIX: "THOUGHT:",
  // Status indicators
  COMPLETED_MARKER: "✅ Completed:",
  ERROR_MARKER: "❌",
  HANDLING_MARKER: "🔧 Handling:",
  // UI Text constants
  UI_TEXT: {
    AI_IS_THINKING: "AI is thinking",
    THINKING: "Thinking",
    THINKING_ELLIPSIS: "Thinking...",
    PROCESSING: "Processing",
    THOUGHT: "Thought"
  },
  // Message types
  MESSAGE_TYPES: {
    THINKING: "thinking",
    REASONING: "reasoning",
    THOUGHT: "thought",
    COMPLETED: "completed",
    ERROR: "error",
    PROCESSING: "processing"
  },
  // Detection patterns
  PATTERNS: {
    DURATION: /for ([\d.]+) seconds/,
    THOUGHT_CONTENT: /\*\*(.*?)\*\*/g,
    HANDLING_TOOL: /🔧 Handling: (.+)/,
    COMPLETED_OR_ERROR_TOOL: /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
  }
}, ye = {
  isThinkingMessage: (e) => e.startsWith(G.THINKING_PREFIX) || e.startsWith(G.REASONING_PREFIX) || e.startsWith(G.THOUGHT_PREFIX),
  isCompletedMessage: (e) => e.includes(G.COMPLETED_MARKER),
  isErrorMessage: (e) => e.includes(G.ERROR_MARKER),
  isHandlingMessage: (e) => e.includes(G.HANDLING_MARKER),
  extractDuration: (e) => {
    const t = e.match(G.PATTERNS.DURATION);
    return t ? ` for ${t[1]} seconds` : void 0;
  },
  cleanReasoningContent: (e) => {
    let t = e.replace(new RegExp(`^${G.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${G.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${G.THOUGHT_PREFIX}\\s*`), "");
    return t = t.replace(/\s*for [\d.]+\s*seconds$/, ""), t = t.replace(G.PATTERNS.THOUGHT_CONTENT, ""), t.trim();
  },
  getMessageType: (e, t) => t === !1 ? ye.isErrorMessage(e) ? G.MESSAGE_TYPES.ERROR : (ye.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || ye.isThinkingMessage(e), G.MESSAGE_TYPES.THOUGHT) : ye.isCompletedMessage(e) ? G.MESSAGE_TYPES.COMPLETED : ye.isErrorMessage(e) ? G.MESSAGE_TYPES.ERROR : (ye.isHandlingMessage(e) || ye.isThinkingMessage(e) && !e.includes(G.UI_TEXT.AI_IS_THINKING), G.MESSAGE_TYPES.THINKING)
};
class Ja extends Hi {
  constructor(n) {
    super({ onReasoningUpdate: n });
    F(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    F(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, s) {
    const o = this.getHandler("onReasoningUpdate");
    if (!o) return;
    const l = dn.createReasoningCall(
      i,
      a,
      s || {}
    );
    o(n, r, l);
  }
  handleReasoningStart(n) {
    const r = n.id || "reasoning";
    this.reasoningStartTimes.set(r, Date.now()), this.reasoningContent.set(r, "");
  }
  handleReasoningDelta(n) {
    if (!n.text) return;
    const r = n.id || "reasoning", a = (this.reasoningContent.get(r) || "") + n.text;
    this.reasoningContent.set(r, a);
    const s = `${G.THINKING_PREFIX} ${a}`;
    this.triggerReasoningUpdate(
      !0,
      s,
      r,
      "thinking",
      { text: a }
    );
  }
  handleReasoningEnd(n) {
    const r = n.id || "reasoning", i = this.reasoningContent.get(r) || "", a = this.reasoningStartTimes.get(r);
    let s = "";
    a && (s = ` for ${((Date.now() - a) / 1e3).toFixed(0)} seconds`, this.reasoningStartTimes.delete(r));
    const o = i || G.UI_TEXT.THOUGHT, l = `${G.THOUGHT_PREFIX} ${o}${s}`;
    this.triggerReasoningUpdate(
      !1,
      l,
      r,
      "end",
      { duration: s, fullContent: i }
    ), this.reasoningContent.delete(r);
  }
  setReasoningUpdateHandler(n) {
    this.updateEventHandlers({ onReasoningUpdate: n });
  }
}
class es extends Hi {
  constructor(n = {}, r) {
    super({ onReasoningUpdate: r });
    F(this, "processedToolCalls", /* @__PURE__ */ new Set());
    F(this, "clientTools", {});
    F(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var s, o, l;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (s = this.getHandler("onReasoningUpdate")) == null || s(!0, `${G.HANDLING_MARKER} ${i}`, n);
      try {
        const c = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, c), (o = this.getHandler("onReasoningUpdate")) == null || o(!1, `${G.COMPLETED_MARKER} ${i}`, n);
      } catch (c) {
        this.sendToolError(r, c), (l = this.getHandler("onReasoningUpdate")) == null || l(!1, `${G.ERROR_MARKER} Error: ${i} - ${c}`, n);
      }
    }
  }
  async executeToolFunction(n, r) {
    const i = this.clientTools[n];
    if (!i)
      throw new Error(`Tool not found: ${n}`);
    return await i(r);
  }
  sendToolResponse(n, r) {
    if (!this.sendMessage)
      return;
    const i = kt.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = kt.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = dn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId,
        n.args || {}
      );
      r(!0, `${G.HANDLING_MARKER} ${n.toolName}`, a);
    }
  }
  handleServerToolResult(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = dn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId
      );
      r(
        !1,
        `${G.COMPLETED_MARKER} ${n.toolName}`,
        a
      );
    }
  }
  clearProcessedToolCalls() {
    this.processedToolCalls.clear();
  }
  updateClientTools(n) {
    this.clientTools = { ...this.clientTools, ...n };
  }
  setSendMessageHandler(n) {
    this.sendMessage = n;
  }
  setReasoningUpdateHandler(n) {
    this.updateEventHandlers({ onReasoningUpdate: n });
  }
}
class ts {
  constructor(t, n = {}) {
    F(this, "reasoningHandler");
    F(this, "toolHandler");
    F(this, "handlers");
    F(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new Ja(t.onReasoningUpdate), this.toolHandler = new es(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case Me.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case Me.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case Me.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case Me.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case Me.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case Me.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case Me.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case Me.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case Me.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case Me.HEARTBEAT_ACK:
          break;
        case Me.ERROR:
          this.handleError(n);
          break;
        default:
          break;
      }
      return n;
    } catch {
      return null;
    }
  }
  handleSessionEstablished() {
  }
  handleToolsConfigured() {
  }
  handleClientToolsUpdated() {
  }
  handleConfigureToolsRequest() {
  }
  handleChatEvent(t) {
    var n, r, i;
    switch (t.event) {
      case cn.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case cn.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case cn.CONTENT_DELTA:
        (n = t.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, t.data.delta));
        break;
    }
  }
  handleProviderEvent(t) {
    var r, i, a;
    switch ((r = t.data) == null ? void 0 : r.type) {
      case _t.TEXT_DELTA:
        t.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, t.data.textDelta));
        break;
      case _t.REASONING_START:
        this.reasoningHandler.handleReasoningStart(t.data);
        break;
      case _t.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(t.data);
        break;
      case _t.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(t.data);
        break;
      case _t.TOOL_CALL:
        this.toolHandler.handleServerToolCall(t.data);
        break;
      case _t.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(t.data);
        break;
    }
  }
  handleLatitudeEvent(t) {
    var n;
    if (((n = t.data) == null ? void 0 : n.type) === _t.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = t.data;
      if (r.toolCallId && r.toolName) {
        const i = dn.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${G.COMPLETED_MARKER} ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Dt.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Dt.chatError(t.error || "Unknown error"));
  }
  handleToolCallRequest(t) {
    this.toolHandler.handleToolCallRequest(t);
  }
  handleHeartbeatPing(t) {
    if (!this.sendMessage)
      return;
    const n = kt.serializeHeartbeatPong(
      t.timestamp,
      t.pingTime
    );
    this.sendMessage(n);
  }
  handleError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Dt.chatError(t.error || "Unknown WebSocket error"));
  }
  updateClientTools(t) {
    this.toolHandler.updateClientTools(t);
  }
  clearProcessedToolCalls() {
    this.toolHandler.clearProcessedToolCalls();
  }
  setSendMessageHandler(t) {
    this.sendMessage = t, this.toolHandler.setSendMessageHandler(t);
  }
  updateEventHandlers(t) {
    Object.assign(this.handlers, t), this.reasoningHandler.updateEventHandlers(t), this.toolHandler.updateEventHandlers(t);
  }
}
async function ns(e, t) {
  const n = {
    "Content-Type": "application/json"
  };
  t != null && t.userMpAuthToken && (n["x-oddle-mp-auth-token"] = t.userMpAuthToken), t != null && t.chatServerKey && (n["x-oddle-chat-server-key"] = t.chatServerKey);
  try {
    const r = await fetch(`${e}/api/v1/tickets`, {
      method: "POST",
      headers: n,
      body: JSON.stringify({
        userId: t.userId,
        entityId: t.entityId,
        entityType: t.entityType,
        providerResId: t.providerResId,
        clientInfo: {
          userAgent: navigator.userAgent,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          ...t.clientInfo
        }
      })
    });
    if (!r.ok) {
      const a = await r.json().catch(() => ({}));
      throw new Error(
        a.error || `Failed to get WebSocket ticket: ${r.statusText}`
      );
    }
    const i = await r.json();
    if (!i.success || !i.ticket)
      throw new Error(i.error || "Invalid ticket response from server");
    return i;
  } catch (r) {
    throw console.error("Error requesting WebSocket ticket:", r), r;
  }
}
function Gn(e) {
  if (!e.success || !e.ticket || !e.expiresAt)
    return !1;
  const t = new Date(e.expiresAt).getTime();
  return Date.now() < t - 3e4;
}
function Or(e) {
  const t = Gn(e), n = new Date(e.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: t,
    expiresIn: i,
    expired: r >= n
  };
}
class rs {
  constructor(t, n, r = {}) {
    F(this, "ticket", null);
    F(this, "refreshPromise", null);
    F(this, "validationInterval", null);
    F(this, "authData");
    F(this, "apiUrl");
    F(this, "config");
    this.authData = t, this.apiUrl = this.convertToHttpUrl(n), this.config = {
      checkInterval: r.checkInterval ?? 6e4,
      renewalThreshold: r.renewalThreshold ?? 300
    };
  }
  /**
   * Convert WebSocket URL to HTTP URL for ticket requests
   * wss:// -> https://, ws:// -> http://
   * Also handles http:// and https:// (keeps them as-is)
   */
  convertToHttpUrl(t) {
    return t.replace(/^wss:\/\//, "https://").replace(/^ws:\/\//, "http://");
  }
  /**
   * Get a valid ticket, refreshing if necessary
   * This is the main entry point for getting tickets
   * 
   * @returns Valid ticket string
   * @throws Error if ticket refresh fails
   */
  async getValidTicket() {
    return this.ticket && Gn(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
  }
  /**
   * Refresh the ticket, preventing duplicate refreshes
   * Multiple concurrent calls will wait for the same refresh
   * 
   * This prevents race conditions by:
   * 1. Checking if refresh is in progress
   * 2. If yes, returning the same promise (all callers wait together)
   * 3. If no, starting new refresh and storing the promise
   * 
   * @returns Promise that resolves to new ticket string
   */
  async refreshTicket() {
    if (this.refreshPromise)
      return console.log("TicketManager: Refresh already in progress, waiting..."), this.refreshPromise;
    this.refreshPromise = this._doRefresh();
    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }
  /**
   * Internal method to actually perform the refresh
   * @private
   */
  async _doRefresh() {
    console.log("TicketManager: Requesting new ticket...", {
      userId: this.authData.userId,
      apiUrl: this.apiUrl
    });
    try {
      return this.ticket = await ns(this.apiUrl, this.authData), console.log("TicketManager: Ticket received successfully", {
        hasTicket: !!this.ticket.ticket,
        expiresAt: this.ticket.expiresAt
      }), this.ticket.ticket;
    } catch (t) {
      throw console.error("TicketManager: Failed to refresh ticket", t), new Error(
        `Ticket refresh failed: ${t instanceof Error ? t.message : "Unknown error"}`
      );
    }
  }
  /**
   * Start proactive ticket renewal before expiration
   * Checks ticket validity at regular intervals and renews if needed
   * 
   * @param onRenewed - Optional callback when ticket is renewed
   */
  startProactiveRenewal(t) {
    this.stopProactiveRenewal(), console.log("TicketManager: Starting proactive renewal", {
      checkInterval: this.config.checkInterval,
      renewalThreshold: this.config.renewalThreshold
    }), this.validationInterval = window.setInterval(async () => {
      await this.checkAndRenew(t);
    }, this.config.checkInterval);
  }
  /**
   * Check ticket validity and renew if needed
   * @private
   */
  async checkAndRenew(t) {
    if (!this.ticket) {
      console.warn("TicketManager: No ticket to validate");
      return;
    }
    try {
      const r = Or(this.ticket).expiresIn / 1e3;
      r < this.config.renewalThreshold && (console.log(
        `TicketManager: Ticket expires in ${r.toFixed(0)}s, renewing...`
      ), await this.refreshTicket(), console.log("TicketManager: Ticket renewed proactively"), t == null || t());
    } catch (n) {
      console.error("TicketManager: Error during proactive renewal", n);
    }
  }
  /**
   * Stop proactive renewal
   */
  stopProactiveRenewal() {
    this.validationInterval && (clearInterval(this.validationInterval), this.validationInterval = null, console.log("TicketManager: Stopped proactive renewal"));
  }
  /**
   * Check if current ticket is valid
   */
  isValid() {
    return this.ticket ? Gn(this.ticket) : !1;
  }
  /**
   * Get time until ticket expires (in milliseconds)
   */
  getExpiresIn() {
    if (this.ticket)
      try {
        return Or(this.ticket).expiresIn;
      } catch (t) {
        console.warn("TicketManager: Error getting ticket info", t);
        return;
      }
  }
  /**
   * Get ticket expiration timestamp
   */
  getExpiresAt() {
    var t;
    return (t = this.ticket) == null ? void 0 : t.expiresAt;
  }
  /**
   * Update authentication data (e.g., after user login)
   */
  updateAuthData(t) {
    this.authData = { ...this.authData, ...t }, console.log("TicketManager: Auth data updated");
  }
  /**
   * Clear ticket (e.g., on logout)
   */
  clear() {
    this.ticket = null, this.stopProactiveRenewal(), console.log("TicketManager: Ticket cleared");
  }
  /**
   * Get debug information about current ticket state
   */
  getDebugInfo() {
    return {
      hasTicket: !!this.ticket,
      isValid: this.isValid(),
      expiresAt: this.getExpiresAt(),
      expiresIn: this.getExpiresIn(),
      isRefreshing: !!this.refreshPromise
    };
  }
}
class is {
  constructor() {
    F(this, "config");
    F(this, "connectionState");
    F(this, "wsManager");
    F(this, "messageHandler");
    F(this, "initResolve");
    F(this, "initReject");
    // Client tools and context
    F(this, "toolSchemas", []);
    F(this, "contextHelpers", {});
    // Ticket management - now centralized in TicketManager
    F(this, "ticketManager", null);
    this.config = {
      ...Xa
    }, this.connectionState = new Qa(), this.wsManager = new Ya(this.config, this.connectionState), this.messageHandler = new ts({}), this.setupWebSocketHandlers();
  }
  setupWebSocketHandlers() {
    this.wsManager.setEventHandlers({
      onMessage: (t) => this.handleWebSocketMessage(t),
      onOpen: () => this.handleConnectionOpen(),
      onSystemEvent: (t) => {
        var r, i;
        (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onSystemEvent) == null || i.call(r, t);
      }
    }), this.messageHandler.setSendMessageHandler(
      (t) => this.wsManager.send(t)
    );
  }
  handleWebSocketMessage(t) {
    var r, i;
    const n = this.messageHandler.handleMessage(t);
    (n == null ? void 0 : n.type) === "authentication_error" && (console.error(
      "WebSocket authentication failed:",
      n == null ? void 0 : n.error,
      n == null ? void 0 : n.code
    ), this.handleAuthenticationFailure(n)), (n == null ? void 0 : n.type) === Me.TOOLS_CONFIGURED && ((r = this.initResolve) == null || r.call(this)), (n == null ? void 0 : n.type) === Me.SESSION_ESTABLISHED && (this.toolSchemas && this.toolSchemas.length > 0 ? this.sendToolConfiguration() : (i = this.initResolve) == null || i.call(this));
  }
  handleConnectionOpen() {
    console.log("WebSocket connection opened with ticket authentication");
  }
  handleAuthenticationFailure(t) {
    var r, i;
    const n = t;
    console.error("Authentication failure details:", {
      error: n == null ? void 0 : n.error,
      code: n == null ? void 0 : n.code,
      hasTicket: ((r = this.ticketManager) == null ? void 0 : r.isValid()) ?? !1
    }), (n == null ? void 0 : n.code) === "TICKET_INVALID" || (n == null ? void 0 : n.code) === "TICKET_EXPIRED" ? (console.log("Attempting to refresh ticket and reconnect..."), this.refreshTicketAndReconnect().catch((a) => {
      var s;
      console.error("Failed to refresh ticket:", a), (s = this.initReject) == null || s.call(this, a);
    })) : (i = this.initReject) == null || i.call(this, new Error(`Authentication failed: ${n == null ? void 0 : n.error}`));
  }
  sendToolConfiguration() {
    const t = kt.serializeConfigureTools(
      this.toolSchemas,
      this.contextHelpers
    );
    this.wsManager.send(t);
  }
  async onInit(t) {
    return this.setupEventHandlers(t), this.setupToolsAndContext(t), this.updateConfig(t), this.ticketManager = new rs(
      {
        userMpAuthToken: t.userMpAuthToken,
        chatServerKey: t.chatServerKey,
        userId: t.userId,
        entityId: t.entityId,
        entityType: t.entityType,
        providerResId: t.providerResId
      },
      this.config.apiUrl
    ), new Promise(async (n, r) => {
      this.initResolve = n, this.initReject = r;
      try {
        const i = await this.ticketManager.getValidTicket();
        await this.wsManager.connect(i);
      } catch (i) {
        console.error("WebSocketChatClient: Initialization failed", i), r(i);
      }
    });
  }
  setupEventHandlers(t) {
    const n = {
      onSetMessage: t.onSetMessage,
      onSystemEvent: t.onSystemEvent,
      onReasoningUpdate: t.onReasoningUpdate
    };
    this.messageHandler.updateEventHandlers(n);
  }
  setupToolsAndContext(t) {
    this.toolSchemas = t.toolSchemas || [], this.contextHelpers = t.contextHelpers, t.clientTools && this.messageHandler.updateClientTools(t.clientTools);
  }
  updateConfig(t) {
    t.chatServerUrl && (this.config.apiUrl = t.chatServerUrl), t.userId && (this.config.userId = t.userId);
  }
  async onTriggerMessage(t) {
    if (!this.connectionState.isConnected)
      throw new Error("Client not connected");
    const { message: n, app: r = "UD21", media: i, convUuid: a, agentPromptPath: s } = t;
    try {
      this.messageHandler.clearProcessedToolCalls();
      const o = kt.serializeChatMessage({
        content: n,
        app: r,
        media: i,
        userId: this.config.userId,
        convUuid: a,
        agentPromptPath: s,
        saveToDatabase: !1
      });
      this.wsManager.send(o);
    } catch (o) {
      throw o;
    }
  }
  disconnect() {
    var t, n;
    (t = this.ticketManager) == null || t.stopProactiveRenewal(), (n = this.ticketManager) == null || n.clear(), this.wsManager.disconnect();
  }
  isClientConnected() {
    return this.connectionState.isConnected;
  }
  updateContextHelpers(t) {
    this.contextHelpers = { ...this.contextHelpers, ...t };
    const n = kt.serializeUpdateContextHelpers(
      this.contextHelpers
    );
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = kt.serializeUpdateTools(this.toolSchemas);
    this.wsManager.send(r);
  }
  getConnectionStatus() {
    var t, n;
    return {
      connected: this.connectionState.isConnected,
      reconnectAttempts: this.connectionState.reconnectAttempts,
      isReconnecting: this.connectionState.isReconnecting,
      websocketState: this.wsManager.getWebSocketState(),
      hasValidTicket: ((t = this.ticketManager) == null ? void 0 : t.isValid()) ?? !1,
      ticketExpiresIn: (n = this.ticketManager) == null ? void 0 : n.getExpiresIn()
    };
  }
  /**
   * Force refresh the WebSocket ticket and reconnect
   * Useful when authentication fails or ticket expires
   */
  async refreshTicketAndReconnect() {
    console.log("WebSocketChatClient: Refreshing ticket and reconnecting...");
    try {
      if (!this.ticketManager)
        throw new Error("TicketManager not initialized");
      this.wsManager.disconnect();
      const t = await this.ticketManager.refreshTicket();
      this.wsManager.updateTicket(t), await this.wsManager.connect(), console.log(
        "WebSocketChatClient: Successfully refreshed ticket and reconnected"
      );
    } catch (t) {
      throw console.error(
        "WebSocketChatClient: Failed to refresh ticket and reconnect:",
        t
      ), t;
    }
  }
  /**
   * Check if current ticket is valid
   */
  isTicketValid() {
    var t;
    return ((t = this.ticketManager) == null ? void 0 : t.isValid()) ?? !1;
  }
  /**
   * Manual reconnection method for UI to call
   * Useful for "Reconnect" buttons or retry logic
   */
  async reconnect() {
    console.log("WebSocketChatClient: Manual reconnection requested"), await this.refreshTicketAndReconnect();
  }
}
function as({
  // Authentication and server properties
  userMpAuthToken: e,
  chatServerUrl: t,
  chatServerKey: n,
  // Entity configuration
  providerResId: r,
  userId: i,
  entityId: a,
  entityType: s,
  // Tools configuration
  tools: o,
  // Other properties
  contextHelpers: l,
  onSetMessage: c,
  onSystemEvent: u,
  onReasoningUpdate: d
}) {
  const [m, p] = J(null), [w, S] = J(!1), [N, T] = J(!1), O = Ge(null), _ = Ge(c), M = Ge(u), R = Ge(d);
  Be(() => {
    _.current = c, M.current = u, R.current = d;
  }, [c, u, d]);
  const { toolSchemas: y, clientToolExecutors: L } = Le(() => {
    if (o && o.length > 0) {
      const D = o.map(({ execute: I, ...$ }) => $), k = {};
      return o.forEach((I) => {
        k[I.name] = I.execute;
      }), {
        toolSchemas: D,
        clientToolExecutors: k
      };
    }
    return {
      toolSchemas: [],
      clientToolExecutors: {}
    };
  }, [o]), B = te(async () => {
    try {
      if (T(!0), !e)
        throw new Error("userMpAuthToken is required");
      if (!t)
        throw new Error("chatServerUrl is required");
      if (!n)
        throw new Error("chatServerKey is required");
      if (!i)
        throw new Error("userId is required");
      const D = new is();
      O.current = D, p(D);
      const k = l || {};
      await D.onInit({
        // Authentication and server properties
        userMpAuthToken: e,
        chatServerUrl: t,
        chatServerKey: n,
        // Entity configuration
        providerResId: r,
        userId: i,
        entityId: a,
        entityType: s == null ? void 0 : s.toString(),
        // Tools configuration
        toolSchemas: y,
        clientTools: L,
        contextHelpers: k,
        onSetMessage: _.current,
        onSystemEvent: M.current,
        onReasoningUpdate: R.current
      }), S(!0);
    } catch (D) {
      console.error("Error connecting WebSocketChatClient:", D), S(!1);
    } finally {
      T(!1);
    }
  }, [
    e,
    t,
    n,
    r,
    i,
    a,
    s,
    y,
    L,
    l
    // Removed onSetMessage, onSystemEvent, onReasoningUpdate to prevent reconnections
  ]), H = te(() => {
    O.current && (O.current.disconnect(), O.current = null), p(null), S(!1);
  }, []);
  return Be(() => (B(), () => {
    H();
  }), [B, H]), Be(() => {
    const D = setInterval(() => {
      if (O.current) {
        const k = O.current.getConnectionStatus();
        S(k.connected);
      }
    }, 1e3);
    return () => clearInterval(D);
  }, []), {
    chatClient: m,
    isConnected: w,
    isConnecting: N,
    connectChatClient: B,
    disconnectChatClient: H
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: Ui,
  setPrototypeOf: Dr,
  isFrozen: ss,
  getPrototypeOf: os,
  getOwnPropertyDescriptor: ls
} = Object;
let {
  freeze: be,
  seal: Ke,
  create: Vn
} = Object, {
  apply: Wn,
  construct: $n
} = typeof Reflect < "u" && Reflect;
be || (be = function(t) {
  return t;
});
Ke || (Ke = function(t) {
  return t;
});
Wn || (Wn = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
$n || ($n = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const rn = ve(Array.prototype.forEach), cs = ve(Array.prototype.lastIndexOf), Pr = ve(Array.prototype.pop), Gt = ve(Array.prototype.push), us = ve(Array.prototype.splice), un = ve(String.prototype.toLowerCase), xn = ve(String.prototype.toString), bn = ve(String.prototype.match), Vt = ve(String.prototype.replace), hs = ve(String.prototype.indexOf), ps = ve(String.prototype.trim), et = ve(Object.prototype.hasOwnProperty), xe = ve(RegExp.prototype.test), Wt = ds(TypeError);
function ve(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Wn(e, t, r);
  };
}
function ds(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return $n(e, n);
  };
}
function K(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : un;
  Dr && Dr(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (ss(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function fs(e) {
  for (let t = 0; t < e.length; t++)
    et(e, t) || (e[t] = null);
  return e;
}
function yt(e) {
  const t = Vn(null);
  for (const [n, r] of Ui(e))
    et(e, n) && (Array.isArray(r) ? t[n] = fs(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = yt(r) : t[n] = r);
  return t;
}
function $t(e, t) {
  for (; e !== null; ) {
    const r = ls(e, t);
    if (r) {
      if (r.get)
        return ve(r.get);
      if (typeof r.value == "function")
        return ve(r.value);
    }
    e = os(e);
  }
  function n() {
    return null;
  }
  return n;
}
const Hr = be(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), vn = be(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), An = be(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), ms = be(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), In = be(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), gs = be(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Ur = be(["#text"]), Fr = be(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Rn = be(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), zr = be(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), an = be(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Cs = Ke(/\{\{[\w\W]*|[\w\W]*\}\}/gm), ys = Ke(/<%[\w\W]*|[\w\W]*%>/gm), ws = Ke(/\$\{[\w\W]*/gm), Es = Ke(/^data-[\-\w.\u00B7-\uFFFF]+$/), Ss = Ke(/^aria-[\-\w]+$/), Fi = Ke(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Ts = Ke(/^(?:\w+script|data):/i), _s = Ke(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), zi = Ke(/^html$/i), ks = Ke(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Br = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Ss,
  ATTR_WHITESPACE: _s,
  CUSTOM_ELEMENT: ks,
  DATA_ATTR: Es,
  DOCTYPE_NAME: zi,
  ERB_EXPR: ys,
  IS_ALLOWED_URI: Fi,
  IS_SCRIPT_OR_DATA: Ts,
  MUSTACHE_EXPR: Cs,
  TMPLIT_EXPR: ws
});
const jt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, xs = function() {
  return typeof window > "u" ? null : window;
}, bs = function(t, n) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let r = null;
  const i = "data-tt-policy-suffix";
  n && n.hasAttribute(i) && (r = n.getAttribute(i));
  const a = "dompurify" + (r ? "#" + r : "");
  try {
    return t.createPolicy(a, {
      createHTML(s) {
        return s;
      },
      createScriptURL(s) {
        return s;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + a + " could not be created."), null;
  }
}, Gr = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function Bi() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : xs();
  const t = (U) => Bi(U);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== jt.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: s,
    Node: o,
    Element: l,
    NodeFilter: c,
    NamedNodeMap: u = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: m,
    trustedTypes: p
  } = e, w = l.prototype, S = $t(w, "cloneNode"), N = $t(w, "remove"), T = $t(w, "nextSibling"), O = $t(w, "childNodes"), _ = $t(w, "parentNode");
  if (typeof s == "function") {
    const U = n.createElement("template");
    U.content && U.content.ownerDocument && (n = U.content.ownerDocument);
  }
  let M, R = "";
  const {
    implementation: y,
    createNodeIterator: L,
    createDocumentFragment: B,
    getElementsByTagName: H
  } = n, {
    importNode: D
  } = r;
  let k = Gr();
  t.isSupported = typeof Ui == "function" && typeof _ == "function" && y && y.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: I,
    ERB_EXPR: $,
    TMPLIT_EXPR: Z,
    DATA_ATTR: V,
    ARIA_ATTR: re,
    IS_SCRIPT_OR_DATA: X,
    ATTR_WHITESPACE: ue,
    CUSTOM_ELEMENT: Ae
  } = Br;
  let {
    IS_ALLOWED_URI: g
  } = Br, ee = null;
  const de = K({}, [...Hr, ...vn, ...An, ...In, ...Ur]);
  let f = null;
  const we = K({}, [...Fr, ...Rn, ...zr, ...an]);
  let Y = Object.seal(Vn(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), ae = null, He = null;
  const fe = Object.seal(Vn(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let Xe = !0, Ue = !0, ht = !1, Rt = !0, Ye = !1, wt = !0, We = !1, rt = !1, pt = !1, it = !1, Qe = !1, dt = !1, Et = !0, at = !1;
  const zt = "user-content-";
  let ft = !0, Je = !1, E = {}, v = null;
  const z = K({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let j = null;
  const Q = K({}, ["audio", "video", "img", "source", "image", "track"]);
  let me = null;
  const Fe = K({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Se = "http://www.w3.org/1998/Math/MathML", $e = "http://www.w3.org/2000/svg", ge = "http://www.w3.org/1999/xhtml";
  let ce = ge, je = !1, Ie = null;
  const nn = K({}, [Se, $e, ge], xn);
  let bt = K({}, ["mi", "mo", "mn", "ms", "mtext"]), ie = K({}, ["annotation-xml"]);
  const St = K({}, ["title", "style", "font", "a", "script"]);
  let Ze = null;
  const Bt = ["application/xhtml+xml", "text/html"], Ha = "text/html";
  let Ce = null, Nt = null;
  const Ua = n.createElement("form"), Sr = function(C) {
    return C instanceof RegExp || C instanceof Function;
  }, Tn = function() {
    let C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Nt && Nt === C)) {
      if ((!C || typeof C != "object") && (C = {}), C = yt(C), Ze = // eslint-disable-next-line unicorn/prefer-includes
      Bt.indexOf(C.PARSER_MEDIA_TYPE) === -1 ? Ha : C.PARSER_MEDIA_TYPE, Ce = Ze === "application/xhtml+xml" ? xn : un, ee = et(C, "ALLOWED_TAGS") ? K({}, C.ALLOWED_TAGS, Ce) : de, f = et(C, "ALLOWED_ATTR") ? K({}, C.ALLOWED_ATTR, Ce) : we, Ie = et(C, "ALLOWED_NAMESPACES") ? K({}, C.ALLOWED_NAMESPACES, xn) : nn, me = et(C, "ADD_URI_SAFE_ATTR") ? K(yt(Fe), C.ADD_URI_SAFE_ATTR, Ce) : Fe, j = et(C, "ADD_DATA_URI_TAGS") ? K(yt(Q), C.ADD_DATA_URI_TAGS, Ce) : Q, v = et(C, "FORBID_CONTENTS") ? K({}, C.FORBID_CONTENTS, Ce) : z, ae = et(C, "FORBID_TAGS") ? K({}, C.FORBID_TAGS, Ce) : yt({}), He = et(C, "FORBID_ATTR") ? K({}, C.FORBID_ATTR, Ce) : yt({}), E = et(C, "USE_PROFILES") ? C.USE_PROFILES : !1, Xe = C.ALLOW_ARIA_ATTR !== !1, Ue = C.ALLOW_DATA_ATTR !== !1, ht = C.ALLOW_UNKNOWN_PROTOCOLS || !1, Rt = C.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ye = C.SAFE_FOR_TEMPLATES || !1, wt = C.SAFE_FOR_XML !== !1, We = C.WHOLE_DOCUMENT || !1, it = C.RETURN_DOM || !1, Qe = C.RETURN_DOM_FRAGMENT || !1, dt = C.RETURN_TRUSTED_TYPE || !1, pt = C.FORCE_BODY || !1, Et = C.SANITIZE_DOM !== !1, at = C.SANITIZE_NAMED_PROPS || !1, ft = C.KEEP_CONTENT !== !1, Je = C.IN_PLACE || !1, g = C.ALLOWED_URI_REGEXP || Fi, ce = C.NAMESPACE || ge, bt = C.MATHML_TEXT_INTEGRATION_POINTS || bt, ie = C.HTML_INTEGRATION_POINTS || ie, Y = C.CUSTOM_ELEMENT_HANDLING || {}, C.CUSTOM_ELEMENT_HANDLING && Sr(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (Y.tagNameCheck = C.CUSTOM_ELEMENT_HANDLING.tagNameCheck), C.CUSTOM_ELEMENT_HANDLING && Sr(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (Y.attributeNameCheck = C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), C.CUSTOM_ELEMENT_HANDLING && typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (Y.allowCustomizedBuiltInElements = C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Ye && (Ue = !1), Qe && (it = !0), E && (ee = K({}, Ur), f = [], E.html === !0 && (K(ee, Hr), K(f, Fr)), E.svg === !0 && (K(ee, vn), K(f, Rn), K(f, an)), E.svgFilters === !0 && (K(ee, An), K(f, Rn), K(f, an)), E.mathMl === !0 && (K(ee, In), K(f, zr), K(f, an))), C.ADD_TAGS && (typeof C.ADD_TAGS == "function" ? fe.tagCheck = C.ADD_TAGS : (ee === de && (ee = yt(ee)), K(ee, C.ADD_TAGS, Ce))), C.ADD_ATTR && (typeof C.ADD_ATTR == "function" ? fe.attributeCheck = C.ADD_ATTR : (f === we && (f = yt(f)), K(f, C.ADD_ATTR, Ce))), C.ADD_URI_SAFE_ATTR && K(me, C.ADD_URI_SAFE_ATTR, Ce), C.FORBID_CONTENTS && (v === z && (v = yt(v)), K(v, C.FORBID_CONTENTS, Ce)), ft && (ee["#text"] = !0), We && K(ee, ["html", "head", "body"]), ee.table && (K(ee, ["tbody"]), delete ae.tbody), C.TRUSTED_TYPES_POLICY) {
        if (typeof C.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Wt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof C.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Wt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        M = C.TRUSTED_TYPES_POLICY, R = M.createHTML("");
      } else
        M === void 0 && (M = bs(p, i)), M !== null && typeof R == "string" && (R = M.createHTML(""));
      be && be(C), Nt = C;
    }
  }, Tr = K({}, [...vn, ...An, ...ms]), _r = K({}, [...In, ...gs]), Fa = function(C) {
    let b = _(C);
    (!b || !b.tagName) && (b = {
      namespaceURI: ce,
      tagName: "template"
    });
    const P = un(C.tagName), le = un(b.tagName);
    return Ie[C.namespaceURI] ? C.namespaceURI === $e ? b.namespaceURI === ge ? P === "svg" : b.namespaceURI === Se ? P === "svg" && (le === "annotation-xml" || bt[le]) : !!Tr[P] : C.namespaceURI === Se ? b.namespaceURI === ge ? P === "math" : b.namespaceURI === $e ? P === "math" && ie[le] : !!_r[P] : C.namespaceURI === ge ? b.namespaceURI === $e && !ie[le] || b.namespaceURI === Se && !bt[le] ? !1 : !_r[P] && (St[P] || !Tr[P]) : !!(Ze === "application/xhtml+xml" && Ie[C.namespaceURI]) : !1;
  }, st = function(C) {
    Gt(t.removed, {
      element: C
    });
    try {
      _(C).removeChild(C);
    } catch {
      N(C);
    }
  }, vt = function(C, b) {
    try {
      Gt(t.removed, {
        attribute: b.getAttributeNode(C),
        from: b
      });
    } catch {
      Gt(t.removed, {
        attribute: null,
        from: b
      });
    }
    if (b.removeAttribute(C), C === "is")
      if (it || Qe)
        try {
          st(b);
        } catch {
        }
      else
        try {
          b.setAttribute(C, "");
        } catch {
        }
  }, kr = function(C) {
    let b = null, P = null;
    if (pt)
      C = "<remove></remove>" + C;
    else {
      const he = bn(C, /^[\r\n\t ]+/);
      P = he && he[0];
    }
    Ze === "application/xhtml+xml" && ce === ge && (C = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + C + "</body></html>");
    const le = M ? M.createHTML(C) : C;
    if (ce === ge)
      try {
        b = new m().parseFromString(le, Ze);
      } catch {
      }
    if (!b || !b.documentElement) {
      b = y.createDocument(ce, "template", null);
      try {
        b.documentElement.innerHTML = je ? R : le;
      } catch {
      }
    }
    const Te = b.body || b.documentElement;
    return C && P && Te.insertBefore(n.createTextNode(P), Te.childNodes[0] || null), ce === ge ? H.call(b, We ? "html" : "body")[0] : We ? b.documentElement : Te;
  }, xr = function(C) {
    return L.call(
      C.ownerDocument || C,
      C,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, _n = function(C) {
    return C instanceof d && (typeof C.nodeName != "string" || typeof C.textContent != "string" || typeof C.removeChild != "function" || !(C.attributes instanceof u) || typeof C.removeAttribute != "function" || typeof C.setAttribute != "function" || typeof C.namespaceURI != "string" || typeof C.insertBefore != "function" || typeof C.hasChildNodes != "function");
  }, br = function(C) {
    return typeof o == "function" && C instanceof o;
  };
  function mt(U, C, b) {
    rn(U, (P) => {
      P.call(t, C, b, Nt);
    });
  }
  const vr = function(C) {
    let b = null;
    if (mt(k.beforeSanitizeElements, C, null), _n(C))
      return st(C), !0;
    const P = Ce(C.nodeName);
    if (mt(k.uponSanitizeElement, C, {
      tagName: P,
      allowedTags: ee
    }), wt && C.hasChildNodes() && !br(C.firstElementChild) && xe(/<[/\w!]/g, C.innerHTML) && xe(/<[/\w!]/g, C.textContent) || C.nodeType === jt.progressingInstruction || wt && C.nodeType === jt.comment && xe(/<[/\w]/g, C.data))
      return st(C), !0;
    if (!(fe.tagCheck instanceof Function && fe.tagCheck(P)) && (!ee[P] || ae[P])) {
      if (!ae[P] && Ir(P) && (Y.tagNameCheck instanceof RegExp && xe(Y.tagNameCheck, P) || Y.tagNameCheck instanceof Function && Y.tagNameCheck(P)))
        return !1;
      if (ft && !v[P]) {
        const le = _(C) || C.parentNode, Te = O(C) || C.childNodes;
        if (Te && le) {
          const he = Te.length;
          for (let Re = he - 1; Re >= 0; --Re) {
            const gt = S(Te[Re], !0);
            gt.__removalCount = (C.__removalCount || 0) + 1, le.insertBefore(gt, T(C));
          }
        }
      }
      return st(C), !0;
    }
    return C instanceof l && !Fa(C) || (P === "noscript" || P === "noembed" || P === "noframes") && xe(/<\/no(script|embed|frames)/i, C.innerHTML) ? (st(C), !0) : (Ye && C.nodeType === jt.text && (b = C.textContent, rn([I, $, Z], (le) => {
      b = Vt(b, le, " ");
    }), C.textContent !== b && (Gt(t.removed, {
      element: C.cloneNode()
    }), C.textContent = b)), mt(k.afterSanitizeElements, C, null), !1);
  }, Ar = function(C, b, P) {
    if (Et && (b === "id" || b === "name") && (P in n || P in Ua))
      return !1;
    if (!(Ue && !He[b] && xe(V, b))) {
      if (!(Xe && xe(re, b))) {
        if (!(fe.attributeCheck instanceof Function && fe.attributeCheck(b, C))) {
          if (!f[b] || He[b]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Ir(C) && (Y.tagNameCheck instanceof RegExp && xe(Y.tagNameCheck, C) || Y.tagNameCheck instanceof Function && Y.tagNameCheck(C)) && (Y.attributeNameCheck instanceof RegExp && xe(Y.attributeNameCheck, b) || Y.attributeNameCheck instanceof Function && Y.attributeNameCheck(b, C)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              b === "is" && Y.allowCustomizedBuiltInElements && (Y.tagNameCheck instanceof RegExp && xe(Y.tagNameCheck, P) || Y.tagNameCheck instanceof Function && Y.tagNameCheck(P)))
            ) return !1;
          } else if (!me[b]) {
            if (!xe(g, Vt(P, ue, ""))) {
              if (!((b === "src" || b === "xlink:href" || b === "href") && C !== "script" && hs(P, "data:") === 0 && j[C])) {
                if (!(ht && !xe(X, Vt(P, ue, "")))) {
                  if (P)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Ir = function(C) {
    return C !== "annotation-xml" && bn(C, Ae);
  }, Rr = function(C) {
    mt(k.beforeSanitizeAttributes, C, null);
    const {
      attributes: b
    } = C;
    if (!b || _n(C))
      return;
    const P = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: f,
      forceKeepAttr: void 0
    };
    let le = b.length;
    for (; le--; ) {
      const Te = b[le], {
        name: he,
        namespaceURI: Re,
        value: gt
      } = Te, Mt = Ce(he), kn = gt;
      let Ee = he === "value" ? kn : ps(kn);
      if (P.attrName = Mt, P.attrValue = Ee, P.keepAttr = !0, P.forceKeepAttr = void 0, mt(k.uponSanitizeAttribute, C, P), Ee = P.attrValue, at && (Mt === "id" || Mt === "name") && (vt(he, C), Ee = zt + Ee), wt && xe(/((--!?|])>)|<\/(style|title|textarea)/i, Ee)) {
        vt(he, C);
        continue;
      }
      if (Mt === "attributename" && bn(Ee, "href")) {
        vt(he, C);
        continue;
      }
      if (P.forceKeepAttr)
        continue;
      if (!P.keepAttr) {
        vt(he, C);
        continue;
      }
      if (!Rt && xe(/\/>/i, Ee)) {
        vt(he, C);
        continue;
      }
      Ye && rn([I, $, Z], (Mr) => {
        Ee = Vt(Ee, Mr, " ");
      });
      const Nr = Ce(C.nodeName);
      if (!Ar(Nr, Mt, Ee)) {
        vt(he, C);
        continue;
      }
      if (M && typeof p == "object" && typeof p.getAttributeType == "function" && !Re)
        switch (p.getAttributeType(Nr, Mt)) {
          case "TrustedHTML": {
            Ee = M.createHTML(Ee);
            break;
          }
          case "TrustedScriptURL": {
            Ee = M.createScriptURL(Ee);
            break;
          }
        }
      if (Ee !== kn)
        try {
          Re ? C.setAttributeNS(Re, he, Ee) : C.setAttribute(he, Ee), _n(C) ? st(C) : Pr(t.removed);
        } catch {
          vt(he, C);
        }
    }
    mt(k.afterSanitizeAttributes, C, null);
  }, za = function U(C) {
    let b = null;
    const P = xr(C);
    for (mt(k.beforeSanitizeShadowDOM, C, null); b = P.nextNode(); )
      mt(k.uponSanitizeShadowNode, b, null), vr(b), Rr(b), b.content instanceof a && U(b.content);
    mt(k.afterSanitizeShadowDOM, C, null);
  };
  return t.sanitize = function(U) {
    let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, b = null, P = null, le = null, Te = null;
    if (je = !U, je && (U = "<!-->"), typeof U != "string" && !br(U))
      if (typeof U.toString == "function") {
        if (U = U.toString(), typeof U != "string")
          throw Wt("dirty is not a string, aborting");
      } else
        throw Wt("toString is not a function");
    if (!t.isSupported)
      return U;
    if (rt || Tn(C), t.removed = [], typeof U == "string" && (Je = !1), Je) {
      if (U.nodeName) {
        const gt = Ce(U.nodeName);
        if (!ee[gt] || ae[gt])
          throw Wt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (U instanceof o)
      b = kr("<!---->"), P = b.ownerDocument.importNode(U, !0), P.nodeType === jt.element && P.nodeName === "BODY" || P.nodeName === "HTML" ? b = P : b.appendChild(P);
    else {
      if (!it && !Ye && !We && // eslint-disable-next-line unicorn/prefer-includes
      U.indexOf("<") === -1)
        return M && dt ? M.createHTML(U) : U;
      if (b = kr(U), !b)
        return it ? null : dt ? R : "";
    }
    b && pt && st(b.firstChild);
    const he = xr(Je ? U : b);
    for (; le = he.nextNode(); )
      vr(le), Rr(le), le.content instanceof a && za(le.content);
    if (Je)
      return U;
    if (it) {
      if (Qe)
        for (Te = B.call(b.ownerDocument); b.firstChild; )
          Te.appendChild(b.firstChild);
      else
        Te = b;
      return (f.shadowroot || f.shadowrootmode) && (Te = D.call(r, Te, !0)), Te;
    }
    let Re = We ? b.outerHTML : b.innerHTML;
    return We && ee["!doctype"] && b.ownerDocument && b.ownerDocument.doctype && b.ownerDocument.doctype.name && xe(zi, b.ownerDocument.doctype.name) && (Re = "<!DOCTYPE " + b.ownerDocument.doctype.name + `>
` + Re), Ye && rn([I, $, Z], (gt) => {
      Re = Vt(Re, gt, " ");
    }), M && dt ? M.createHTML(Re) : Re;
  }, t.setConfig = function() {
    let U = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Tn(U), rt = !0;
  }, t.clearConfig = function() {
    Nt = null, rt = !1;
  }, t.isValidAttribute = function(U, C, b) {
    Nt || Tn({});
    const P = Ce(U), le = Ce(C);
    return Ar(P, le, b);
  }, t.addHook = function(U, C) {
    typeof C == "function" && Gt(k[U], C);
  }, t.removeHook = function(U, C) {
    if (C !== void 0) {
      const b = cs(k[U], C);
      return b === -1 ? void 0 : us(k[U], b, 1)[0];
    }
    return Pr(k[U]);
  }, t.removeHooks = function(U) {
    k[U] = [];
  }, t.removeAllHooks = function() {
    k = Gr();
  }, t;
}
var vs = Bi();
function As(e) {
  return [
    /javascript:/i,
    /data:.*base64/i,
    /vbscript:/i,
    /on\w+\s*=/i,
    // event handlers like onclick=
    /<script/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<link/i,
    /<style/i
  ].some((n) => n.test(e));
}
function fn(e, t = !1) {
  return e;
}
function Is(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function Vr(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || As(e));
  } catch {
    return !1;
  }
}
function Rs() {
  vs.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !Vr(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !Vr(n) && e.removeAttribute("src");
    }
  });
}
Rs();
function Ns() {
  const [e, t] = J([]), n = te(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = te(
    (s, o) => {
      const c = fn(o, s === "assistant");
      t((u) => [
        ...u,
        {
          id: n(),
          role: s,
          content: c,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [n]
  ), i = te(
    (s, o) => {
      t(
        (l) => l.map(
          (c) => c.id === s ? { ...c, ...o } : c
        )
      );
    },
    []
  ), a = te(
    (s, o, l) => {
      t(
        (c) => c.map(
          (u) => u.id === s ? {
            ...u,
            content: o,
            isStreaming: l
          } : u
        )
      );
    },
    []
  );
  return {
    messages: e,
    setMessages: t,
    addMessage: r,
    updateMessage: i,
    updateMessageContent: a,
    generateId: n
  };
}
function Ms() {
  const [e, t] = J(!1), [n, r] = J(!1), [i, a] = J(""), [s, o] = J(!1), l = Ge(null), c = Ge(""), u = te(() => {
    t(!0), r(!0), c.current = "", a("");
  }, []), d = te(() => {
    t(!1), r(!1), a(""), l.current = null, c.current = "";
  }, []), m = te(() => {
    o(!1);
  }, []), p = te(() => {
    l.current = null, c.current = "", a("");
  }, []);
  return {
    // State
    isStreaming: e,
    setIsStreaming: t,
    isThinking: n,
    setIsThinking: r,
    streamingContent: i,
    setStreamingContent: a,
    isHandlingTool: s,
    setIsHandlingTool: o,
    // Refs
    currentAssistantMessageIdRef: l,
    streamingContentRef: c,
    // Actions
    startStreaming: u,
    stopStreaming: d,
    resetToolHandling: m,
    clearStreamingBuffers: p
  };
}
const Oe = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, jn = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, _e = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, hh = (e) => e === Oe.SUBMITTED || e === Oe.STREAMING, ph = (e) => e === Oe.IDLE, dh = (e) => e === Oe.ERROR, fh = (e) => e === _e.PROCESSING, mh = (e) => e === _e.COMPLETED, gh = (e) => e === _e.ERROR;
function Ls() {
  const e = Le(
    () => (i, a) => a === !1 ? ye.isErrorMessage(i) ? _e.ERROR : _e.COMPLETED : ye.isCompletedMessage(i) ? _e.COMPLETED : ye.isErrorMessage(i) ? _e.ERROR : _e.PROCESSING,
    []
  ), t = Le(
    () => (i) => ye.extractDuration(i),
    []
  ), n = Le(
    () => (i) => ye.cleanReasoningContent(i),
    []
  ), r = Le(
    () => (i, a) => {
      switch (ye.getMessageType(
        i,
        a
      )) {
        case G.MESSAGE_TYPES.ERROR:
          return "Error";
        case G.MESSAGE_TYPES.COMPLETED:
          return "Completed";
        case G.MESSAGE_TYPES.THOUGHT:
          return G.UI_TEXT.THOUGHT;
        case G.MESSAGE_TYPES.THINKING:
        default:
          return G.UI_TEXT.THINKING_ELLIPSIS;
      }
    },
    []
  );
  return {
    getReasoningStatus: e,
    getReasoningDuration: t,
    getReasoningContentOnly: n,
    getReasoningTitle: r
  };
}
function Os() {
  const e = Le(
    () => (n, r) => r === !1 ? n.includes(G.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : n.includes(G.COMPLETED_MARKER) || n.includes("✅") ? "Tool Completed" : n.includes(G.ERROR_MARKER) ? "Tool Error" : (n.includes(G.HANDLING_MARKER), "Tool Processing..."),
    []
  ), t = Le(
    () => (n, r) => r === !1 ? n.includes(G.ERROR_MARKER) ? _e.ERROR : _e.COMPLETED : n.includes(G.COMPLETED_MARKER) || n.includes("✅") ? _e.COMPLETED : n.includes(G.ERROR_MARKER) ? _e.ERROR : _e.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: t
  };
}
function Ds({
  setMessages: e,
  addMessage: t,
  updateMessageContent: n,
  generateId: r,
  setIsThinking: i,
  setIsStreaming: a,
  setStreamingContent: s,
  setIsHandlingTool: o,
  currentAssistantMessageIdRef: l,
  streamingContentRef: c,
  clearStreamingBuffers: u,
  resetToolHandling: d
}) {
  const m = Ge(/* @__PURE__ */ new Map()), p = Ge(/* @__PURE__ */ new Map()), w = te(() => {
    if (l.current && c.current) {
      const M = fn(
        c.current,
        !0
      );
      return n(
        l.current,
        M,
        !1
      ), u(), !0;
    }
    return !1;
  }, [
    l,
    c,
    n,
    u
  ]), S = te(
    (M) => {
      const R = fn(M, !0);
      if (l.current)
        c.current += R, s(c.current), n(
          l.current,
          c.current,
          !0
        );
      else {
        i(!1);
        const y = r();
        l.current = y, c.current = R, s(R);
        const L = {
          id: y,
          role: "assistant",
          content: R,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        e((B) => [...B, L]);
      }
    },
    [
      l,
      c,
      s,
      n,
      i,
      r,
      e
    ]
  ), N = te(
    (M, R, y) => {
      const { callId: L } = y || {};
      if (o(M), !L) return;
      const B = ye.isThinkingMessage(R) && !R.includes("for") && !R.includes("seconds"), H = ye.isThinkingMessage(R) && R.includes("for") && R.includes("seconds"), D = ye.isHandlingMessage(R), k = ye.isCompletedMessage(R), I = ye.isErrorMessage(R);
      if (B || H) {
        const Z = m.current.get(L);
        if (B && !Z) {
          w();
          const V = r();
          m.current.set(L, V);
          const re = {
            id: V,
            role: "reasoning",
            content: R,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          e((X) => [...X, re]);
        } else H && Z ? (n(Z, R, !1), m.current.delete(L)) : Z && B && n(Z, R, !0);
      }
      const $ = p.current.get(L);
      if (D && !$) {
        w();
        const Z = R.match(
          G.PATTERNS.HANDLING_TOOL
        ), V = Z ? Z[1] : "Unknown Tool", re = r();
        p.current.set(L, re);
        const X = {
          id: re,
          role: "tooling",
          content: R,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...y,
            toolName: V,
            callId: L,
            status: _e.PROCESSING
          }
        };
        e((ue) => [...ue, X]);
      } else if ((k || I) && $) {
        const Z = R.match(
          G.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), V = Z ? Z[1] : "Unknown Tool";
        e(
          (re) => re.map(
            (X) => X.id === $ ? {
              ...X,
              content: R,
              isStreaming: !1,
              toolData: {
                ...X.toolData,
                toolName: V,
                status: I ? _e.ERROR : _e.COMPLETED,
                callId: L ?? ""
              }
            } : X
          )
        ), p.current.delete(L);
      } else $ && M && !k && !I && n($, R, !0);
    },
    [
      o,
      w,
      r,
      e,
      n
    ]
  ), T = te(() => {
    a(!1), i(!1), w();
  }, [a, i, w]), O = te(
    (M) => {
      console.error("Chat error:", M), a(!1), i(!1), w(), t("system", `❌ Chat error: ${M}`);
    },
    [
      a,
      i,
      w,
      t
    ]
  ), _ = te(() => {
    a(!1), i(!1), u(), d();
  }, [
    a,
    i,
    u,
    d
  ]);
  return {
    handleSetMessage: S,
    handleReasoningUpdate: N,
    handleChatFinished: T,
    handleChatError: O,
    stopGeneration: _,
    finalizeCurrentStreamingMessage: w
  };
}
function Ps() {
  const e = Ns(), t = Ms(), n = Ls(), r = Os(), i = Ds({
    // From useMessages
    setMessages: e.setMessages,
    addMessage: e.addMessage,
    updateMessageContent: e.updateMessageContent,
    generateId: e.generateId,
    // From useStreamingState
    setIsThinking: t.setIsThinking,
    setIsStreaming: t.setIsStreaming,
    setStreamingContent: t.setStreamingContent,
    setIsHandlingTool: t.setIsHandlingTool,
    currentAssistantMessageIdRef: t.currentAssistantMessageIdRef,
    streamingContentRef: t.streamingContentRef,
    clearStreamingBuffers: t.clearStreamingBuffers,
    resetToolHandling: t.resetToolHandling
  });
  return {
    // State from useMessages
    messages: e.messages,
    setMessages: e.setMessages,
    // State from useStreamingState
    isStreaming: t.isStreaming,
    setIsStreaming: t.setIsStreaming,
    isThinking: t.isThinking,
    setIsThinking: t.setIsThinking,
    streamingContent: t.streamingContent,
    isHandlingTool: t.isHandlingTool,
    currentAssistantMessageIdRef: t.currentAssistantMessageIdRef,
    // Helper functions from useReasoningHelpers
    getReasoningStatus: n.getReasoningStatus,
    getReasoningDuration: n.getReasoningDuration,
    getReasoningContentOnly: n.getReasoningContentOnly,
    getReasoningTitle: n.getReasoningTitle,
    // Helper functions from useToolingHelpers
    getToolingTitle: r.getToolingTitle,
    getToolingStatus: r.getToolingStatus,
    // Actions from useMessages
    addMessage: e.addMessage,
    // Actions from useMessageHandlers
    handleSetMessage: i.handleSetMessage,
    handleReasoningUpdate: i.handleReasoningUpdate,
    handleChatFinished: i.handleChatFinished,
    handleChatError: i.handleChatError,
    stopGeneration: i.stopGeneration,
    finalizeCurrentStreamingMessage: i.finalizeCurrentStreamingMessage
  };
}
function Hs({ initialMode: e = "sidebar" }) {
  const [t, n] = J(!1), [r, i] = J(!1), [a, s] = J(e), [o, l] = J(Oe.IDLE), [c, u] = J(jn.IDLE), [d, m] = J(!1), [p, w] = J(null), [S, N] = J(null), [T, O] = J(null), [_, M] = J(!1), R = te(() => {
    n(!0);
  }, []), y = te(() => {
    n(!1);
  }, []), L = te(() => {
    i((H) => !H);
  }, []), B = te(() => {
    s((H) => H === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  return Be(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const H = (D) => {
      D.key === "Escape" && a === "modal" && t && y();
    };
    if (a === "modal" && t)
      return document.addEventListener("keydown", H), () => document.removeEventListener("keydown", H);
  }, [a, t, y]), {
    // Modal and layout state
    isModalOpen: t,
    setIsModalOpen: n,
    isCollapsed: r,
    setIsCollapsed: i,
    currentMode: a,
    setCurrentMode: s,
    // Chat state
    chatStatus: o,
    setChatStatus: l,
    streamingStatus: c,
    setStreamingStatus: u,
    // Conversation state
    isLoadingConversation: d,
    setIsLoadingConversation: m,
    conversationError: p,
    setConversationError: w,
    // Thread state
    currentThreadId: S,
    setCurrentThreadId: N,
    currentConvUuid: T,
    setCurrentConvUuid: O,
    // Dev mode state
    isDevSettingsOpen: _,
    setIsDevSettingsOpen: M,
    // Actions
    openModal: R,
    closeModal: y,
    toggleCollapse: L,
    toggleFullscreen: B
  };
}
async function Ch(e, t, n) {
  const r = new URLSearchParams();
  n != null && n.includeArchived && r.append("includeArchived", "true"), n != null && n.limit && r.append("limit", n.limit.toString());
  const i = `${e}/api/v1/threads/user/${t}${r.toString() ? `?${r.toString()}` : ""}`, a = await fetch(i);
  if (!a.ok) {
    const o = await a.json().catch(() => ({
      error: "Failed to fetch threads"
    }));
    throw new Error(o.error || "Failed to fetch threads");
  }
  return (await a.json()).threads;
}
async function yh(e, t) {
  const n = `${e}/api/v1/threads/conv/${t}`, r = await fetch(n);
  if (!r.ok) {
    const i = await r.json().catch(() => ({
      error: "Thread not found"
    }));
    throw new Error(i.error || "Thread not found");
  }
  return r.json();
}
async function Us(e, t, n) {
  const r = `${e}/api/v1/messages/thread/${t}?format=client`, i = {};
  n != null && n.userMpAuthToken && (i["x-oddle-mp-auth-token"] = n.userMpAuthToken), n != null && n.chatServerKey && (i["x-oddle-chat-server-key"] = n.chatServerKey);
  const a = await fetch(r, { headers: i });
  if (!a.ok) {
    const o = await a.json().catch(() => ({
      error: "Failed to fetch messages"
    }));
    throw new Error(o.error || "Failed to fetch messages");
  }
  return (await a.json()).messages.map((o) => ({
    ...o,
    timestamp: new Date(o.timestamp)
  }));
}
async function wh(e, t) {
  const n = `${e}/api/v1/messages/conv/${t}?format=client`, r = await fetch(n);
  if (!r.ok) {
    const a = await r.json().catch(() => ({
      error: "Failed to fetch messages"
    }));
    throw new Error(a.error || "Failed to fetch messages");
  }
  return (await r.json()).messages.map((a) => ({
    ...a,
    timestamp: new Date(a.timestamp)
  }));
}
async function Eh(e, t, n, r) {
  const i = `${e}/api/v1/threads`, a = await fetch(i, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: t,
      convUuid: n,
      title: (r == null ? void 0 : r.title) || "New conversation",
      agentType: (r == null ? void 0 : r.agentType) || "shop"
    })
  });
  if (!a.ok) {
    const s = await a.json().catch(() => ({
      error: "Failed to create thread"
    }));
    throw new Error(s.error || "Failed to create thread");
  }
  return a.json();
}
function Fs({
  userId: e,
  httpApiUrl: t,
  userMpAuthToken: n,
  chatServerKey: r,
  messages: i,
  setMessages: a,
  setIsLoadingConversation: s,
  setConversationError: o,
  setCurrentThreadId: l,
  setCurrentConvUuid: c
}) {
  const u = Ge(!1);
  return Be(() => {
    (async () => {
      if (!e) {
        console.error("userId is required for conversation loading");
        return;
      }
      if (!t) {
        console.error("httpApiUrl is required for conversation loading");
        return;
      }
      if (!n) {
        console.error("userMpAuthToken is required for conversation loading");
        return;
      }
      if (!r) {
        console.error("chatServerKey is required for conversation loading");
        return;
      }
      if (!u.current && !(i.length > 0))
        try {
          s(!0), o(null);
          const m = [];
          if (m.length === 0) {
            s(!1), u.current = !0;
            return;
          }
          const p = m[0];
          l(p.id), c(p.convUuid);
          const w = await Us(t, p.id, {
            userMpAuthToken: n,
            chatServerKey: r
          });
          a(w), u.current = !0;
        } catch (m) {
          console.error("❌ Error loading conversation:", m), o(
            m instanceof Error ? m.message : "Failed to load conversation"
          ), u.current = !0;
        } finally {
          s(!1);
        }
    })();
  }, [
    e,
    t,
    n,
    r,
    i.length,
    a,
    s,
    o,
    l,
    c
  ]), {
    hasLoadedConversationRef: u
  };
}
class zs {
  // 10MB
  constructor(t) {
    F(this, "config");
    F(this, "defaultFolder", "chat-uploads");
    F(this, "defaultMaxFileSize", 10 * 1024 * 1024);
    this.config = {
      folder: this.defaultFolder,
      maxFileSize: this.defaultMaxFileSize,
      ...t
    };
  }
  /**
   * Upload multiple files with authentication and error handling
   */
  async uploadFiles(t, n) {
    const r = [], i = t.map((a) => ({
      file: a,
      progress: 0,
      status: "uploading"
    }));
    for (let a = 0; a < t.length; a++) {
      const s = t[a];
      try {
        this.validateFile(s), n && (i[a].progress = 0, n([...i]));
        const o = await this.uploadSingleFile(s, (l) => {
          n && (i[a].progress = l, n([...i]));
        });
        r.push(o), i[a].status = "completed", i[a].progress = 100;
      } catch (o) {
        console.error(`❌ Upload failed for ${s.name}:`, o), i[a].status = "error";
        const l = await this.handleUploadFallback(s);
        l && r.push(l);
      }
      n && n([...i]);
    }
    return r;
  }
  /**
   * Upload a single file with authentication
   */
  async uploadSingleFile(t, n) {
    const r = new FormData();
    r.append("file", t), r.append("folder", this.config.folder || this.defaultFolder);
    const i = this.buildAuthHeaders();
    return new Promise((a, s) => {
      const o = new XMLHttpRequest();
      o.upload.addEventListener("progress", (l) => {
        if (l.lengthComputable && n) {
          const c = l.loaded / l.total * 100;
          n(c);
        }
      }), o.addEventListener("load", async () => {
        if (o.status >= 200 && o.status < 300)
          try {
            const l = JSON.parse(o.responseText), c = this.processUploadResult(t, l);
            a(c);
          } catch {
            s(new Error("Invalid response format"));
          }
        else
          s(new Error(`Upload failed with status ${o.status}`));
      }), o.addEventListener("error", () => {
        s(new Error("Network error during upload"));
      }), o.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([l, c]) => {
        o.setRequestHeader(l, c);
      }), o.send(r);
    });
  }
  /**
   * Process the upload result and return appropriate media URL
   */
  processUploadResult(t, n) {
    return t.type.startsWith("image/") ? n.url : `data:${t.type};name=${encodeURIComponent(
      n.fileName || t.name
    )};url=${encodeURIComponent(n.url)}`;
  }
  /**
   * Handle upload failure with fallback strategies
   */
  async handleUploadFallback(t) {
    if (t.type.startsWith("image/"))
      try {
        return await this.convertToBase64(t);
      } catch (n) {
        return console.error("Base64 conversion failed:", n), null;
      }
    else
      return `data:${t.type};name=${encodeURIComponent(
        t.name
      )};base64,placeholder`;
  }
  /**
   * Convert file to base64 data URL
   */
  convertToBase64(t) {
    return new Promise((n, r) => {
      const i = new FileReader();
      i.onload = () => n(i.result), i.onerror = r, i.readAsDataURL(t);
    });
  }
  /**
   * Validate file before upload
   */
  validateFile(t) {
    if (t.size > (this.config.maxFileSize || this.defaultMaxFileSize))
      throw new Error(
        `File ${t.name} is too large. Maximum size is ${this.formatFileSize(
          this.config.maxFileSize || this.defaultMaxFileSize
        )}`
      );
    if (this.config.allowedTypes && this.config.allowedTypes.length > 0 && !this.config.allowedTypes.some(
      (r) => t.type.startsWith(r) || t.name.toLowerCase().endsWith(r)
    ))
      throw new Error(`File type ${t.type} is not allowed`);
  }
  /**
   * Build authentication headers
   */
  buildAuthHeaders() {
    const t = {};
    return this.config.userMpAuthToken && (t["x-oddle-mp-auth-token"] = this.config.userMpAuthToken), this.config.chatServerKey && (t["x-oddle-chat-server-key"] = this.config.chatServerKey), t;
  }
  /**
   * Format file size for display
   */
  formatFileSize(t) {
    if (t === 0) return "0 Bytes";
    const n = 1024, r = ["Bytes", "KB", "MB", "GB"], i = Math.floor(Math.log(t) / Math.log(n));
    return parseFloat((t / Math.pow(n, i)).toFixed(2)) + " " + r[i];
  }
  /**
   * Update configuration
   */
  updateConfig(t) {
    this.config = { ...this.config, ...t };
  }
  /**
   * Get current configuration
   */
  getConfig() {
    return { ...this.config };
  }
}
class Bs {
  constructor(t, n = {}) {
    F(this, "config");
    F(this, "chatClient");
    this.chatClient = t, this.config = n;
  }
  /**
   * Validates if a message can be submitted
   */
  canSubmit(t, n, r) {
    return !!(t.trim() && !n && this.chatClient && r);
  }
  /**
   * Creates a user message object
   */
  createUserMessage(t, n) {
    return {
      id: this.generateId(),
      role: "user",
      content: t.trim(),
      timestamp: /* @__PURE__ */ new Date(),
      media: n
    };
  }
  /**
   * Submits a message to the WebSocket agent client
   * 
   * @param params - Message submission parameters
   * @returns The created user message
   * @throws Error if submission fails
   */
  async submitMessage(t) {
    const { message: n, media: r, convUuid: i, agentPromptPath: a } = t, s = this.createUserMessage(n, r);
    try {
      return await this.chatClient.onTriggerMessage({
        message: s.content,
        media: r,
        convUuid: i,
        agentPromptPath: a
      }), s;
    } catch (o) {
      throw this.handleError(o), o;
    }
  }
  /**
   * Handles submission errors
   */
  handleError(t) {
    const n = t instanceof Error ? t : new Error("Unknown error");
    console.error("Agent client send error:", n), this.config.onError && this.config.onError(n);
  }
  /**
   * Generates a unique message ID
   */
  generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  /**
   * Creates a system error message
   */
  createErrorMessage(t) {
    return `Sorry, there was an error: ${t instanceof Error ? t.message : "Unknown error"}`;
  }
}
const Gs = {
  /**
   * Determine if the bubble button should be shown based on mode and state
   */
  shouldShowBubble: (e, t, n) => e === "modal" && !t || (e === "sidebar" || e === "fullscreen") && n,
  /**
   * Determine if the chat is in a collapsed state
   */
  isCollapsedState: (e, t) => (e === "sidebar" || e === "fullscreen") && t,
  /**
   * Get the appropriate title text based on mode and state
   */
  getBubbleTitle: (e, t) => e === "modal" ? `Open ${t}` : `Expand ${t}`,
  /**
   * Determine if header should be visible
   */
  shouldShowHeader: (e) => e !== !1,
  /**
   * Determine if main header section should be shown
   */
  shouldShowMainHeader: (e, t, n) => e === 0 && !t && !n,
  /**
   * Get content area CSS class based on message state
   */
  getContentAreaClass: (e, t, n) => `chat-wrapper__content ${e === 0 && !t && !n ? "chat-wrapper__content--empty" : "chat-wrapper__content--with-messages"}`,
  /**
   * Determine if suggested prompts should be shown
   */
  shouldShowSuggestedPrompts: (e, t, n, r) => e === 0 && !t && !n && !!r
}, Gi = {
  /**
   * Convert WebSocket URL to HTTP URL for REST API calls
   */
  convertWebSocketToHttp: (e) => e.replace(
    /^wss?:\/\//,
    (t) => t === "wss://" ? "https://" : "http://"
  ),
  /**
   * Validate if a URL is a valid WebSocket URL
   */
  isValidWebSocketUrl: (e) => {
    try {
      const t = new URL(e);
      return t.protocol === "ws:" || t.protocol === "wss:";
    } catch {
      return !1;
    }
  },
  /**
   * Validate if a URL is a valid HTTP URL
   */
  isValidHttpUrl: (e) => {
    try {
      const t = new URL(e);
      return t.protocol === "http:" || t.protocol === "https:";
    } catch {
      return !1;
    }
  }
}, Vs = {
  /**
   * Validate required authentication props
   */
  validateAuthProps: (e) => {
    if (!e.userMpAuthToken)
      throw new Error("ChatWrapper: userMpAuthToken is required");
    if (!e.chatServerUrl)
      throw new Error("ChatWrapper: chatServerUrl is required");
    if (!e.chatServerKey)
      throw new Error("ChatWrapper: chatServerKey is required");
    if (!e.userId)
      throw new Error("ChatWrapper: userId is required");
  },
  /**
   * Validate WebSocket URL format
   */
  validateWebSocketUrl: (e) => {
    if (!Gi.isValidWebSocketUrl(e))
      throw new Error(`Invalid WebSocket URL: ${e}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (e) => e.trim().length > 0
}, Vi = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...e) => e.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (e, t, n, r, i) => Vi.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${e}`,
    t && `chat-wrapper--${t}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    e === "embedded" && i && "chat-wrapper--constrained"
  )
}, Wi = {
  /**
   * Create a standardized error for the chat system
   */
  createChatError: (e, t, n) => {
    const r = new Error(e);
    return r.code = t, r.originalError = n, r;
  },
  /**
   * Check if an error is a network error
   */
  isNetworkError: (e) => e.message.includes("fetch") || e.message.includes("network") || e.message.includes("connection"),
  /**
   * Get user-friendly error message
   */
  getUserFriendlyErrorMessage: (e) => Wi.isNetworkError(e) ? "Connection error. Please check your internet connection and try again." : e.message.includes("authentication") || e.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : e.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, lt = {
  state: Gs,
  url: Gi,
  validation: Vs,
  css: Vi,
  error: Wi
};
class Wr extends ir {
  constructor(n) {
    super(n);
    F(this, "resetTimeoutId", null);
    F(this, "resetErrorBoundary", () => {
      this.resetTimeoutId && clearTimeout(this.resetTimeoutId), this.setState({
        hasError: !1,
        error: void 0,
        errorInfo: void 0
      });
    });
    F(this, "handleRetry", () => {
      this.resetTimeoutId = window.setTimeout(() => {
        this.resetErrorBoundary();
      }, 100);
    });
    this.state = { hasError: !1 };
  }
  static getDerivedStateFromError(n) {
    return {
      hasError: !0,
      error: n
    };
  }
  componentDidCatch(n, r) {
    this.setState({
      error: n,
      errorInfo: r
    }), this.props.onError && this.props.onError(n, r), console.error("ChatErrorBoundary caught an error:", n, r);
  }
  componentDidUpdate(n) {
    const { resetOnPropsChange: r, resetKeys: i } = this.props, { hasError: a } = this.state;
    if (a && r && i) {
      const s = n.resetKeys || [];
      i.some(
        (l, c) => l !== s[c]
      ) && this.resetErrorBoundary();
    }
  }
  render() {
    const { hasError: n, error: r } = this.state, { children: i, fallback: a } = this.props;
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ h("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ A("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: lt.error.getUserFriendlyErrorMessage(r) }),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-actions", children: /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__error-retry",
          onClick: this.handleRetry,
          type: "button",
          children: "Try Again"
        }
      ) }),
      (() => {
        try {
          return !1;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ A("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ h("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ h("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : i;
  }
}
class Ws extends ir {
  constructor(n) {
    super(n);
    F(this, "retryCount", 0);
    F(this, "retryTimeoutId", null);
    F(this, "handleRetry", () => {
      const { maxRetries: n = 3, retryDelay: r = 1e3, onRetry: i } = this.props;
      if (this.retryCount >= n) {
        console.warn("Max retry attempts reached for WebSocket connection");
        return;
      }
      this.setState({ isRetrying: !0 }), this.retryCount++, this.retryTimeoutId = window.setTimeout(() => {
        this.setState({
          hasError: !1,
          error: void 0,
          isRetrying: !1
        }), i && i();
      }, r * this.retryCount);
    });
    F(this, "handleManualReset", () => {
      this.retryCount = 0, this.setState({
        hasError: !1,
        error: void 0,
        isRetrying: !1
      }), this.props.onRetry && this.props.onRetry();
    });
    this.state = {
      hasError: !1,
      isRetrying: !1
    };
  }
  static getDerivedStateFromError(n) {
    return {
      hasError: !0,
      error: n
    };
  }
  componentDidCatch(n) {
    console.error("WebSocketErrorBoundary caught an error:", n), this.props.onError && this.props.onError(n);
  }
  componentWillUnmount() {
    this.retryTimeoutId && clearTimeout(this.retryTimeoutId);
  }
  render() {
    const { hasError: n, error: r, isRetrying: i } = this.state, { children: a, maxRetries: s = 3 } = this.props;
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || lt.error.isNetworkError(r)) ? /* @__PURE__ */ h("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ A("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ A("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ h("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ h("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ A(Jt, { children: [
        this.retryCount < s && /* @__PURE__ */ A(
          "button",
          {
            className: "chat-wrapper__error-retry",
            onClick: this.handleRetry,
            type: "button",
            children: [
              "Retry Connection (",
              s - this.retryCount,
              " attempts left)"
            ]
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            className: "chat-wrapper__error-reset",
            onClick: this.handleManualReset,
            type: "button",
            children: "Reset Connection"
          }
        )
      ] }) }),
      (() => {
        try {
          return !1;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ A("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ h("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ h("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
}
class $s extends ir {
  constructor(n) {
    super(n);
    F(this, "handleRetry", () => {
      this.setState({
        hasError: !1,
        error: void 0,
        failedFiles: void 0
      }), this.props.onRetry && this.props.onRetry();
    });
    F(this, "handleDismiss", () => {
      this.setState({
        hasError: !1,
        error: void 0,
        failedFiles: void 0
      });
    });
    this.state = { hasError: !1 };
  }
  static getDerivedStateFromError(n) {
    return {
      hasError: !0,
      error: n
    };
  }
  componentDidCatch(n) {
    console.error("FileUploadErrorBoundary caught an error:", n);
    const r = this.extractFailedFiles(n);
    this.setState({ failedFiles: r }), this.props.onError && this.props.onError(n, r);
  }
  extractFailedFiles(n) {
    const r = /file[s]?\s*['":]?\s*([^,\n]+)/gi, i = n.message.match(r);
    return i ? i.map((a) => a.replace(/file[s]?\s*['":]?\s*/i, "").trim()) : [];
  }
  render() {
    const { hasError: n, error: r, failedFiles: i } = this.state, { children: a, allowRetry: s = !0 } = this.props;
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ h("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ A("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ A("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ h("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ h("ul", { className: "chat-wrapper__failed-files-list", children: i.map((l, c) => /* @__PURE__ */ h("li", { className: "chat-wrapper__failed-file", children: l }, c)) })
      ] }),
      /* @__PURE__ */ A("div", { className: "chat-wrapper__error-actions", children: [
        s && /* @__PURE__ */ h(
          "button",
          {
            className: "chat-wrapper__error-retry",
            onClick: this.handleRetry,
            type: "button",
            children: "Try Again"
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            className: "chat-wrapper__error-dismiss",
            onClick: this.handleDismiss,
            type: "button",
            children: "Continue Without Files"
          }
        )
      ] }),
      (() => {
        try {
          return !1;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ A("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ h("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ h("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
  getFileUploadErrorMessage(n) {
    return n.message.includes("size") || n.message.includes("large") ? "File size is too large. Please try with smaller files." : n.message.includes("type") || n.message.includes("format") ? "File type is not supported. Please try with different file types." : n.message.includes("network") || n.message.includes("connection") ? "Network error during upload. Please check your connection and try again." : n.message.includes("timeout") ? "Upload timed out. Please try again with smaller files or better connection." : "Failed to upload files. Please try again.";
  }
}
function js({
  isConnected: e,
  isConnecting: t = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 5,
  onRetry: a,
  autoHideDuration: s = 3e3
}) {
  const [o, l] = J("hidden"), [c, u] = J(!1);
  if (Be(() => {
    t ? l("connecting") : !e && !n ? (u(!0), r >= i ? l("error") : l("disconnected")) : n ? l("reconnecting") : e && c ? (l("hidden"), u(!1)) : e && !c && l("hidden");
  }, [e, t, n, r, i, c, s]), o === "hidden")
    return null;
  const d = () => {
    a && a();
  }, p = (() => {
    switch (o) {
      case "connecting":
        return {
          icon: "🔄",
          title: "Connecting...",
          message: "Establishing connection to the server"
        };
      case "disconnected":
        return {
          icon: "⚠️",
          title: "Connection Lost",
          message: "The connection to the server was interrupted. Your messages cannot be sent until the connection is restored."
        };
      case "reconnecting":
        return {
          icon: "🔄",
          title: "Reconnecting...",
          message: `Attempting to restore connection (${r}/${i})`
        };
      case "error":
        return {
          icon: "❌",
          title: "Connection Failed",
          message: "Unable to connect to the server. Please check your internet connection and try again."
        };
      default:
        return null;
    }
  })();
  return p ? o === "connecting" ? /* @__PURE__ */ h("div", { className: `connection-notification connection-notification--${o}`, children: /* @__PURE__ */ h("div", { className: "connection-notification__spinner-only" }) }) : /* @__PURE__ */ h("div", { className: `connection-notification connection-notification--${o}`, children: /* @__PURE__ */ A("div", { className: "connection-notification__content", children: [
    /* @__PURE__ */ h("div", { className: "connection-notification__icon", children: p.icon }),
    /* @__PURE__ */ h("div", { className: "connection-notification__title", children: p.title }),
    /* @__PURE__ */ h("div", { className: "connection-notification__message", children: p.message }),
    o === "reconnecting" && /* @__PURE__ */ h("div", { className: "connection-notification__actions", children: /* @__PURE__ */ A("button", { className: "connection-notification__retry-btn primary", disabled: !0, children: [
      /* @__PURE__ */ h("span", { className: "connection-notification__spinner" }),
      "Reconnecting..."
    ] }) }),
    (o === "error" || o === "disconnected") && a && /* @__PURE__ */ h("div", { className: "connection-notification__actions", children: /* @__PURE__ */ h(
      "button",
      {
        className: "connection-notification__retry-btn primary",
        onClick: d,
        children: "Try Again"
      }
    ) })
  ] }) }) : null;
}
const Zs = ({
  className: e,
  onClick: t,
  size: n = 24,
  color: r = "currentColor"
}) => /* @__PURE__ */ A(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    onClick: t,
    style: { cursor: t ? "pointer" : "default" },
    children: [
      /* @__PURE__ */ h(
        "path",
        {
          d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
          fill: r
        }
      ),
      /* @__PURE__ */ h("circle", { cx: "7", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ h("circle", { cx: "12", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ h("circle", { cx: "17", cy: "10", r: "1", fill: r })
    ]
  }
), qs = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ h(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    onClick: t,
    style: { cursor: t ? "pointer" : "default" },
    children: /* @__PURE__ */ h(
      "path",
      {
        d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
        fill: r
      }
    )
  }
), Ks = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor",
  isFullscreen: i = !1
}) => /* @__PURE__ */ h(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    onClick: t,
    style: { cursor: t ? "pointer" : "default" },
    children: i ? (
      // Minimize icon (arrows pointing inward)
      /* @__PURE__ */ h(
        "path",
        {
          d: "M8 3v3a2 2 0 01-2 2H3M21 8h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3M16 21v-3a2 2 0 012-2h3",
          stroke: r,
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    ) : (
      // Fullscreen icon (arrows pointing outward)
      /* @__PURE__ */ h(
        "path",
        {
          d: "M7 14H5v5h5v-2M5 10V5h5v2M17 14h2v5h-5v-2M19 10V5h-5v2",
          stroke: r,
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    )
  }
), Xs = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ h(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    onClick: t,
    style: { cursor: t ? "pointer" : "default" },
    children: /* @__PURE__ */ h(
      "path",
      {
        d: "M18 12l-3 3-3-3m-6 3l-3 3-3-3",
        stroke: r,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
), $i = ({
  className: e,
  onClick: t,
  size: n = 16,
  color: r = "currentColor"
}) => /* @__PURE__ */ h(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    onClick: t,
    style: { cursor: t ? "pointer" : "default" },
    children: /* @__PURE__ */ h(
      "path",
      {
        d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
        fill: r
      }
    )
  }
), Ys = ({
  className: e,
  onClick: t,
  size: n = 18,
  color: r = "currentColor"
}) => /* @__PURE__ */ A(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 18 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    onClick: t,
    style: { cursor: t ? "pointer" : "default" },
    children: [
      /* @__PURE__ */ h("mask", { id: "mask0_444_23118", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "18", height: "18", children: /* @__PURE__ */ h("rect", { width: "18", height: "18", fill: "#D9D9D9" }) }),
      /* @__PURE__ */ h("g", { mask: "url(#mask0_444_23118)", children: /* @__PURE__ */ h(
        "path",
        {
          d: "M5.8498 13.4998C5.47855 13.4998 5.16074 13.3676 4.89637 13.1032C4.63199 12.8389 4.4998 12.5211 4.4998 12.1498V3.1498C4.4998 2.77855 4.63199 2.46074 4.89637 2.19637C5.16074 1.93199 5.47855 1.7998 5.8498 1.7998H14.8498C15.2211 1.7998 15.5389 1.93199 15.8032 2.19637C16.0676 2.46074 16.1998 2.77855 16.1998 3.1498V12.1498C16.1998 12.5211 16.0676 12.8389 15.8032 13.1032C15.5389 13.3676 15.2211 13.4998 14.8498 13.4998H5.8498ZM5.8498 12.1498H14.8498V3.1498H5.8498V12.1498ZM3.1498 16.1998C2.77855 16.1998 2.46074 16.0676 2.19637 15.8032C1.93199 15.5389 1.7998 15.2211 1.7998 14.8498V4.4998H3.1498V14.8498H13.4998V16.1998H3.1498Z",
          fill: r
        }
      ) })
    ]
  }
), Qs = ({
  mode: e,
  appName: t,
  bubbleText: n,
  showBubbleText: r = !0,
  onClick: i
}) => {
  const a = e === "modal" ? `Open ${t}` : `Expand ${t}`;
  return /* @__PURE__ */ A(
    "button",
    {
      className: "chat-wrapper__bubble-button",
      onClick: i,
      title: a,
      children: [
        /* @__PURE__ */ h(Zs, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ h("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, Js = ({
  appName: e,
  mode: t,
  isCollapsed: n,
  isModalOpen: r,
  devMode: i = !1,
  onClose: a,
  onToggleFullscreen: s,
  onToggleCollapse: o,
  onOpenSettings: l
}) => {
  const c = () => t === "modal" && r && a ? /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: a,
      title: "Close chat",
      children: /* @__PURE__ */ h(qs, { size: 20 })
    }
  ) : null, u = () => {
    if ((t === "sidebar" || t === "fullscreen") && !n && s) {
      const p = t === "fullscreen";
      return /* @__PURE__ */ h(
        "button",
        {
          className: p ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: s,
          title: p ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ h(Ks, { size: 20, isFullscreen: p })
        }
      );
    }
    return null;
  }, d = () => (t === "sidebar" || t === "fullscreen") && !n && o ? /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: o,
      title: "Collapse chat",
      children: /* @__PURE__ */ h(Xs, { size: 20 })
    }
  ) : null;
  return /* @__PURE__ */ A("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ h("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ h("h2", { className: "chat-wrapper__title", children: e }) }),
    /* @__PURE__ */ A("div", { className: "chat-wrapper__header-controls", children: [
      !i || !l ? null : /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__settings-button",
          onClick: l,
          title: "Developer Settings",
          children: /* @__PURE__ */ h($i, { size: 16 })
        }
      ),
      u(),
      d(),
      c()
    ] })
  ] });
};
function eo(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const to = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, no = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ro = {};
function $r(e, t) {
  return (ro.jsx ? no : to).test(e);
}
const io = /[ \t\n\f\r]/g;
function ao(e) {
  return typeof e == "object" ? e.type === "text" ? jr(e.value) : !1 : jr(e);
}
function jr(e) {
  return e.replace(io, "") === "";
}
class en {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(t, n, r) {
    this.normal = n, this.property = t, r && (this.space = r);
  }
}
en.prototype.normal = {};
en.prototype.property = {};
en.prototype.space = void 0;
function ji(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new en(n, r, t);
}
function Zn(e) {
  return e.toLowerCase();
}
class Pe {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(t, n) {
    this.attribute = n, this.property = t;
  }
}
Pe.prototype.attribute = "";
Pe.prototype.booleanish = !1;
Pe.prototype.boolean = !1;
Pe.prototype.commaOrSpaceSeparated = !1;
Pe.prototype.commaSeparated = !1;
Pe.prototype.defined = !1;
Pe.prototype.mustUseProperty = !1;
Pe.prototype.number = !1;
Pe.prototype.overloadedBoolean = !1;
Pe.prototype.property = "";
Pe.prototype.spaceSeparated = !1;
Pe.prototype.space = void 0;
let so = 0;
const q = It(), pe = It(), qn = It(), x = It(), se = It(), Pt = It(), ze = It();
function It() {
  return 2 ** ++so;
}
const Kn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: q,
  booleanish: pe,
  commaOrSpaceSeparated: ze,
  commaSeparated: Pt,
  number: x,
  overloadedBoolean: qn,
  spaceSeparated: se
}, Symbol.toStringTag, { value: "Module" })), Nn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Kn)
);
class sr extends Pe {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(t, n, r, i) {
    let a = -1;
    if (super(t, n), Zr(this, "space", i), typeof r == "number")
      for (; ++a < Nn.length; ) {
        const s = Nn[a];
        Zr(this, Nn[a], (r & Kn[s]) === Kn[s]);
      }
  }
}
sr.prototype.defined = !0;
function Zr(e, t, n) {
  n && (e[t] = n);
}
function Ut(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new sr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[Zn(r)] = r, n[Zn(a.attribute)] = r;
  }
  return new en(t, n, e.space);
}
const Zi = Ut({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: pe,
    ariaAutoComplete: null,
    ariaBusy: pe,
    ariaChecked: pe,
    ariaColCount: x,
    ariaColIndex: x,
    ariaColSpan: x,
    ariaControls: se,
    ariaCurrent: null,
    ariaDescribedBy: se,
    ariaDetails: null,
    ariaDisabled: pe,
    ariaDropEffect: se,
    ariaErrorMessage: null,
    ariaExpanded: pe,
    ariaFlowTo: se,
    ariaGrabbed: pe,
    ariaHasPopup: null,
    ariaHidden: pe,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: se,
    ariaLevel: x,
    ariaLive: null,
    ariaModal: pe,
    ariaMultiLine: pe,
    ariaMultiSelectable: pe,
    ariaOrientation: null,
    ariaOwns: se,
    ariaPlaceholder: null,
    ariaPosInSet: x,
    ariaPressed: pe,
    ariaReadOnly: pe,
    ariaRelevant: null,
    ariaRequired: pe,
    ariaRoleDescription: se,
    ariaRowCount: x,
    ariaRowIndex: x,
    ariaRowSpan: x,
    ariaSelected: pe,
    ariaSetSize: x,
    ariaSort: null,
    ariaValueMax: x,
    ariaValueMin: x,
    ariaValueNow: x,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function qi(e, t) {
  return t in e ? e[t] : t;
}
function Ki(e, t) {
  return qi(e, t.toLowerCase());
}
const oo = Ut({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: Pt,
    acceptCharset: se,
    accessKey: se,
    action: null,
    allow: null,
    allowFullScreen: q,
    allowPaymentRequest: q,
    allowUserMedia: q,
    alt: null,
    as: null,
    async: q,
    autoCapitalize: null,
    autoComplete: se,
    autoFocus: q,
    autoPlay: q,
    blocking: se,
    capture: null,
    charSet: null,
    checked: q,
    cite: null,
    className: se,
    cols: x,
    colSpan: null,
    content: null,
    contentEditable: pe,
    controls: q,
    controlsList: se,
    coords: x | Pt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: q,
    defer: q,
    dir: null,
    dirName: null,
    disabled: q,
    download: qn,
    draggable: pe,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: q,
    formTarget: null,
    headers: se,
    height: x,
    hidden: qn,
    high: x,
    href: null,
    hrefLang: null,
    htmlFor: se,
    httpEquiv: se,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: q,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: q,
    itemId: null,
    itemProp: se,
    itemRef: se,
    itemScope: q,
    itemType: se,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: q,
    low: x,
    manifest: null,
    max: null,
    maxLength: x,
    media: null,
    method: null,
    min: null,
    minLength: x,
    multiple: q,
    muted: q,
    name: null,
    nonce: null,
    noModule: q,
    noValidate: q,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: q,
    optimum: x,
    pattern: null,
    ping: se,
    placeholder: null,
    playsInline: q,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: q,
    referrerPolicy: null,
    rel: se,
    required: q,
    reversed: q,
    rows: x,
    rowSpan: x,
    sandbox: se,
    scope: null,
    scoped: q,
    seamless: q,
    selected: q,
    shadowRootClonable: q,
    shadowRootDelegatesFocus: q,
    shadowRootMode: null,
    shape: null,
    size: x,
    sizes: null,
    slot: null,
    span: x,
    spellCheck: pe,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: x,
    step: null,
    style: null,
    tabIndex: x,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: q,
    useMap: null,
    value: pe,
    width: x,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: se,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: x,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: x,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: q,
    // Lists. Use CSS to reduce space between items instead
    declare: q,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: x,
    // `<img>` and `<object>`
    leftMargin: x,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: x,
    // `<body>`
    marginWidth: x,
    // `<body>`
    noResize: q,
    // `<frame>`
    noHref: q,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: q,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: q,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: x,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: pe,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: x,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: x,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: q,
    disableRemotePlayback: q,
    prefix: null,
    property: null,
    results: x,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Ki
}), lo = Ut({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: ze,
    accentHeight: x,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: x,
    amplitude: x,
    arabicForm: null,
    ascent: x,
    attributeName: null,
    attributeType: null,
    azimuth: x,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: x,
    by: null,
    calcMode: null,
    capHeight: x,
    className: se,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: x,
    diffuseConstant: x,
    direction: null,
    display: null,
    dur: null,
    divisor: x,
    dominantBaseline: null,
    download: q,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: x,
    enableBackground: null,
    end: null,
    event: null,
    exponent: x,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: x,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: Pt,
    g2: Pt,
    glyphName: Pt,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: x,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: x,
    horizOriginX: x,
    horizOriginY: x,
    id: null,
    ideographic: x,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: x,
    k: x,
    k1: x,
    k2: x,
    k3: x,
    k4: x,
    kernelMatrix: ze,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: x,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: x,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: x,
    overlineThickness: x,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: x,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: se,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: x,
    pointsAtY: x,
    pointsAtZ: x,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: ze,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: ze,
    rev: ze,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: ze,
    requiredFeatures: ze,
    requiredFonts: ze,
    requiredFormats: ze,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: x,
    specularExponent: x,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: x,
    strikethroughThickness: x,
    string: null,
    stroke: null,
    strokeDashArray: ze,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: x,
    strokeOpacity: x,
    strokeWidth: null,
    style: null,
    surfaceScale: x,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: ze,
    tabIndex: x,
    tableValues: null,
    target: null,
    targetX: x,
    targetY: x,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: ze,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: x,
    underlineThickness: x,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: x,
    values: null,
    vAlphabetic: x,
    vMathematical: x,
    vectorEffect: null,
    vHanging: x,
    vIdeographic: x,
    version: null,
    vertAdvY: x,
    vertOriginX: x,
    vertOriginY: x,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: x,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: qi
}), Xi = Ut({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(e, t) {
    return "xlink:" + t.slice(5).toLowerCase();
  }
}), Yi = Ut({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Ki
}), Qi = Ut({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), co = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, uo = /[A-Z]/g, qr = /-[a-z]/g, ho = /^data[-\w.:]+$/i;
function po(e, t) {
  const n = Zn(t);
  let r = t, i = Pe;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && ho.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(qr, mo);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!qr.test(a)) {
        let s = a.replace(uo, fo);
        s.charAt(0) !== "-" && (s = "-" + s), t = "data" + s;
      }
    }
    i = sr;
  }
  return new i(r, t);
}
function fo(e) {
  return "-" + e.toLowerCase();
}
function mo(e) {
  return e.charAt(1).toUpperCase();
}
const go = ji([Zi, oo, Xi, Yi, Qi], "html"), or = ji([Zi, lo, Xi, Yi, Qi], "svg");
function Co(e) {
  return e.join(" ").trim();
}
var mn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ji(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var lr = {}, Kr = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, yo = /\n/g, wo = /^\s*/, Eo = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, So = /^:\s*/, To = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, _o = /^[;\s]*/, ko = /^\s+|\s+$/g, xo = `
`, Xr = "/", Yr = "*", At = "", bo = "comment", vo = "declaration", Ao = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(w) {
    var S = w.match(yo);
    S && (n += S.length);
    var N = w.lastIndexOf(xo);
    r = ~N ? w.length - N : r + w.length;
  }
  function a() {
    var w = { line: n, column: r };
    return function(S) {
      return S.position = new s(w), c(), S;
    };
  }
  function s(w) {
    this.start = w, this.end = { line: n, column: r }, this.source = t.source;
  }
  s.prototype.content = e;
  function o(w) {
    var S = new Error(
      t.source + ":" + n + ":" + r + ": " + w
    );
    if (S.reason = w, S.filename = t.source, S.line = n, S.column = r, S.source = e, !t.silent) throw S;
  }
  function l(w) {
    var S = w.exec(e);
    if (S) {
      var N = S[0];
      return i(N), e = e.slice(N.length), S;
    }
  }
  function c() {
    l(wo);
  }
  function u(w) {
    var S;
    for (w = w || []; S = d(); )
      S !== !1 && w.push(S);
    return w;
  }
  function d() {
    var w = a();
    if (!(Xr != e.charAt(0) || Yr != e.charAt(1))) {
      for (var S = 2; At != e.charAt(S) && (Yr != e.charAt(S) || Xr != e.charAt(S + 1)); )
        ++S;
      if (S += 2, At === e.charAt(S - 1))
        return o("End of comment missing");
      var N = e.slice(2, S - 2);
      return r += 2, i(N), e = e.slice(S), r += 2, w({
        type: bo,
        comment: N
      });
    }
  }
  function m() {
    var w = a(), S = l(Eo);
    if (S) {
      if (d(), !l(So)) return o("property missing ':'");
      var N = l(To), T = w({
        type: vo,
        property: Qr(S[0].replace(Kr, At)),
        value: N ? Qr(N[0].replace(Kr, At)) : At
      });
      return l(_o), T;
    }
  }
  function p() {
    var w = [];
    u(w);
    for (var S; S = m(); )
      S !== !1 && (w.push(S), u(w));
    return w;
  }
  return c(), p();
};
function Qr(e) {
  return e ? e.replace(ko, At) : At;
}
var Io = mn && mn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(lr, "__esModule", { value: !0 });
lr.default = No;
var Ro = Io(Ao);
function No(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, Ro.default)(e), i = typeof t == "function";
  return r.forEach(function(a) {
    if (a.type === "declaration") {
      var s = a.property, o = a.value;
      i ? t(s, o, a) : o && (n = n || {}, n[s] = o);
    }
  }), n;
}
var yn = {};
Object.defineProperty(yn, "__esModule", { value: !0 });
yn.camelCase = void 0;
var Mo = /^--[a-zA-Z0-9_-]+$/, Lo = /-([a-z])/g, Oo = /^[^-]+$/, Do = /^-(webkit|moz|ms|o|khtml)-/, Po = /^-(ms)-/, Ho = function(e) {
  return !e || Oo.test(e) || Mo.test(e);
}, Uo = function(e, t) {
  return t.toUpperCase();
}, Jr = function(e, t) {
  return "".concat(t, "-");
}, Fo = function(e, t) {
  return t === void 0 && (t = {}), Ho(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Po, Jr) : e = e.replace(Do, Jr), e.replace(Lo, Uo));
};
yn.camelCase = Fo;
var zo = mn && mn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, Bo = zo(lr), Go = yn;
function Xn(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, Bo.default)(e, function(r, i) {
    r && i && (n[(0, Go.camelCase)(r, t)] = i);
  }), n;
}
Xn.default = Xn;
var Vo = Xn;
const Wo = /* @__PURE__ */ Ji(Vo), ea = ta("end"), cr = ta("start");
function ta(e) {
  return t;
  function t(n) {
    const r = n && n.position && n.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function $o(e) {
  const t = cr(e), n = ea(e);
  if (t && n)
    return { start: t, end: n };
}
function Kt(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? ei(e.position) : "start" in e || "end" in e ? ei(e) : "line" in e || "column" in e ? Yn(e) : "";
}
function Yn(e) {
  return ti(e && e.line) + ":" + ti(e && e.column);
}
function ei(e) {
  return Yn(e && e.start) + "-" + Yn(e && e.end);
}
function ti(e) {
  return e && typeof e == "number" ? e : 1;
}
class ke extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(t, n, r) {
    super(), typeof n == "string" && (r = n, n = void 0);
    let i = "", a = {}, s = !1;
    if (n && ("line" in n && "column" in n ? a = { place: n } : "start" in n && "end" in n ? a = { place: n } : "type" in n ? a = {
      ancestors: [n],
      place: n.position
    } : a = { ...n }), typeof t == "string" ? i = t : !a.cause && t && (s = !0, i = t.message, a.cause = t), !a.ruleId && !a.source && typeof r == "string") {
      const l = r.indexOf(":");
      l === -1 ? a.ruleId = r : (a.source = r.slice(0, l), a.ruleId = r.slice(l + 1));
    }
    if (!a.place && a.ancestors && a.ancestors) {
      const l = a.ancestors[a.ancestors.length - 1];
      l && (a.place = l.position);
    }
    const o = a.place && "start" in a.place ? a.place.start : a.place;
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = o ? o.line : void 0, this.name = Kt(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = s && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
ke.prototype.file = "";
ke.prototype.name = "";
ke.prototype.reason = "";
ke.prototype.message = "";
ke.prototype.stack = "";
ke.prototype.column = void 0;
ke.prototype.line = void 0;
ke.prototype.ancestors = void 0;
ke.prototype.cause = void 0;
ke.prototype.fatal = void 0;
ke.prototype.place = void 0;
ke.prototype.ruleId = void 0;
ke.prototype.source = void 0;
const ur = {}.hasOwnProperty, jo = /* @__PURE__ */ new Map(), Zo = /[A-Z]/g, qo = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Ko = /* @__PURE__ */ new Set(["td", "th"]), na = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Xo(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = il(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = rl(n, t.jsx, t.jsxs);
  }
  const i = {
    Fragment: t.Fragment,
    ancestors: [],
    components: t.components || {},
    create: r,
    elementAttributeNameCase: t.elementAttributeNameCase || "react",
    evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
    filePath: n,
    ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
    passKeys: t.passKeys !== !1,
    passNode: t.passNode || !1,
    schema: t.space === "svg" ? or : go,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = ra(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function ra(e, t, n) {
  if (t.type === "element")
    return Yo(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return Qo(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return el(e, t, n);
  if (t.type === "mdxjsEsm")
    return Jo(e, t);
  if (t.type === "root")
    return tl(e, t, n);
  if (t.type === "text")
    return nl(e, t);
}
function Yo(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = or, e.schema = i), e.ancestors.push(t);
  const a = aa(e, t.tagName, !1), s = al(e, t);
  let o = pr(e, t);
  return qo.has(t.tagName) && (o = o.filter(function(l) {
    return typeof l == "string" ? !ao(l) : !0;
  })), ia(e, s, a, t), hr(s, o), e.ancestors.pop(), e.schema = r, e.create(t, a, s, n);
}
function Qo(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Qt(e, t.position);
}
function Jo(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Qt(e, t.position);
}
function el(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = or, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : aa(e, t.name, !0), s = sl(e, t), o = pr(e, t);
  return ia(e, s, a, t), hr(s, o), e.ancestors.pop(), e.schema = r, e.create(t, a, s, n);
}
function tl(e, t, n) {
  const r = {};
  return hr(r, pr(e, t)), e.create(t, e.Fragment, r, n);
}
function nl(e, t) {
  return t.value;
}
function ia(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function hr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function rl(e, t, n) {
  return r;
  function r(i, a, s, o) {
    const c = Array.isArray(s.children) ? n : t;
    return o ? c(a, s, o) : c(a, s);
  }
}
function il(e, t) {
  return n;
  function n(r, i, a, s) {
    const o = Array.isArray(a.children), l = cr(r);
    return t(
      i,
      a,
      s,
      o,
      {
        columnNumber: l ? l.column - 1 : void 0,
        fileName: e,
        lineNumber: l ? l.line : void 0
      },
      void 0
    );
  }
}
function al(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && ur.call(t.properties, i)) {
      const a = ol(e, i, t.properties[i]);
      if (a) {
        const [s, o] = a;
        e.tableCellAlignToStyle && s === "align" && typeof o == "string" && Ko.has(t.tagName) ? r = o : n[s] = o;
      }
    }
  if (r) {
    const a = (
      /** @type {Style} */
      n.style || (n.style = {})
    );
    a[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function sl(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const a = r.data.estree.body[0];
        a.type;
        const s = a.expression;
        s.type;
        const o = s.properties[0];
        o.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(o.argument)
        );
      } else
        Qt(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const o = r.value.data.estree.body[0];
          o.type, a = e.evaluater.evaluateExpression(o.expression);
        } else
          Qt(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function pr(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : jo;
  for (; ++r < t.children.length; ) {
    const a = t.children[r];
    let s;
    if (e.passKeys) {
      const l = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (l) {
        const c = i.get(l) || 0;
        s = l + "-" + c, i.set(l, c + 1);
      }
    }
    const o = ra(e, a, s);
    o !== void 0 && n.push(o);
  }
  return n;
}
function ol(e, t, n) {
  const r = po(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? eo(n) : Co(n)), r.property === "style") {
      let i = typeof n == "object" ? n : ll(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = cl(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? co[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function ll(e, t) {
  try {
    return Wo(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new ke("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = na + "#cannot-parse-style-attribute", i;
  }
}
function aa(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let a = -1, s;
    for (; ++a < i.length; ) {
      const o = $r(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
      s = s ? {
        type: "MemberExpression",
        object: s,
        property: o,
        computed: !!(a && o.type === "Literal"),
        optional: !1
      } : o;
    }
    r = s;
  } else
    r = $r(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return ur.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Qt(e);
}
function Qt(e, t) {
  const n = new ke(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = na + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function cl(e) {
  const t = {};
  let n;
  for (n in e)
    ur.call(e, n) && (t[ul(n)] = e[n]);
  return t;
}
function ul(e) {
  let t = e.replace(Zo, hl);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function hl(e) {
  return "-" + e.toLowerCase();
}
const Mn = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, pl = {};
function dl(e, t) {
  const n = pl, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return sa(e, r, i);
}
function sa(e, t, n) {
  if (fl(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return ni(e.children, t, n);
  }
  return Array.isArray(e) ? ni(e, t, n) : "";
}
function ni(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = sa(e[i], t, n);
  return r.join("");
}
function fl(e) {
  return !!(e && typeof e == "object");
}
const ri = document.createElement("i");
function dr(e) {
  const t = "&" + e + ";";
  ri.innerHTML = t;
  const n = ri.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function ut(e, t, n, r) {
  const i = e.length;
  let a = 0, s;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    s = Array.from(r), s.unshift(t, n), e.splice(...s);
  else
    for (n && e.splice(t, n); a < r.length; )
      s = r.slice(a, a + 1e4), s.unshift(t, 0), e.splice(...s), a += 1e4, t += 1e4;
}
function qe(e, t) {
  return e.length > 0 ? (ut(e, e.length, 0, t), e) : t;
}
const ii = {}.hasOwnProperty;
function ml(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    gl(t, e[n]);
  return t;
}
function gl(e, t) {
  let n;
  for (n in t) {
    const i = (ii.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let s;
    if (a)
      for (s in a) {
        ii.call(i, s) || (i[s] = []);
        const o = a[s];
        Cl(
          // @ts-expect-error Looks like a list.
          i[s],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function Cl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  ut(e, 0, 0, r);
}
function oa(e, t) {
  const n = Number.parseInt(e, t);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < 9 || n === 11 || n > 13 && n < 32 || // Control character (DEL) of C0, and C1 controls.
    n > 126 && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? "�" : String.fromCodePoint(n)
  );
}
function Ht(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const ct = xt(/[A-Za-z]/), Ve = xt(/[\dA-Za-z]/), yl = xt(/[#-'*+\--9=?A-Z^-~]/);
function Qn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Jn = xt(/\d/), wl = xt(/[\dA-Fa-f]/), El = xt(/[!-/:-@[-`{-~]/);
function W(e) {
  return e !== null && e < -2;
}
function De(e) {
  return e !== null && (e < 0 || e === 32);
}
function ne(e) {
  return e === -2 || e === -1 || e === 32;
}
const Sl = xt(new RegExp("\\p{P}|\\p{S}", "u")), Tl = xt(/\s/);
function xt(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Ft(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let s = "";
    if (a === 37 && Ve(e.charCodeAt(n + 1)) && Ve(e.charCodeAt(n + 2)))
      i = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (s = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const o = e.charCodeAt(n + 1);
      a < 56320 && o > 56319 && o < 57344 ? (s = String.fromCharCode(a, o), i = 1) : s = "�";
    } else
      s = String.fromCharCode(a);
    s && (t.push(e.slice(r, n), encodeURIComponent(s)), r = n + i + 1, s = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function oe(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return s;
  function s(l) {
    return ne(l) ? (e.enter(n), o(l)) : t(l);
  }
  function o(l) {
    return ne(l) && a++ < i ? (e.consume(l), o) : (e.exit(n), t(l));
  }
}
const _l = {
  tokenize: kl
};
function kl(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), oe(e, t, "linePrefix");
  }
  function i(o) {
    return e.enter("paragraph"), a(o);
  }
  function a(o) {
    const l = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = l), n = l, s(o);
  }
  function s(o) {
    if (o === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(o);
      return;
    }
    return W(o) ? (e.consume(o), e.exit("chunkText"), a) : (e.consume(o), s);
  }
}
const xl = {
  tokenize: bl
}, ai = {
  tokenize: vl
};
function bl(e) {
  const t = this, n = [];
  let r = 0, i, a, s;
  return o;
  function o(_) {
    if (r < n.length) {
      const M = n[r];
      return t.containerState = M[1], e.attempt(M[0].continuation, l, c)(_);
    }
    return c(_);
  }
  function l(_) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && O();
      const M = t.events.length;
      let R = M, y;
      for (; R--; )
        if (t.events[R][0] === "exit" && t.events[R][1].type === "chunkFlow") {
          y = t.events[R][1].end;
          break;
        }
      T(r);
      let L = M;
      for (; L < t.events.length; )
        t.events[L][1].end = {
          ...y
        }, L++;
      return ut(t.events, R + 1, 0, t.events.slice(M)), t.events.length = L, c(_);
    }
    return o(_);
  }
  function c(_) {
    if (r === n.length) {
      if (!i)
        return m(_);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return w(_);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(ai, u, d)(_);
  }
  function u(_) {
    return i && O(), T(r), m(_);
  }
  function d(_) {
    return t.parser.lazy[t.now().line] = r !== n.length, s = t.now().offset, w(_);
  }
  function m(_) {
    return t.containerState = {}, e.attempt(ai, p, w)(_);
  }
  function p(_) {
    return r++, n.push([t.currentConstruct, t.containerState]), m(_);
  }
  function w(_) {
    if (_ === null) {
      i && O(), T(0), e.consume(_);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: a
    }), S(_);
  }
  function S(_) {
    if (_ === null) {
      N(e.exit("chunkFlow"), !0), T(0), e.consume(_);
      return;
    }
    return W(_) ? (e.consume(_), N(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, o) : (e.consume(_), S);
  }
  function N(_, M) {
    const R = t.sliceStream(_);
    if (M && R.push(null), _.previous = a, a && (a.next = _), a = _, i.defineSkip(_.start), i.write(R), t.parser.lazy[_.start.line]) {
      let y = i.events.length;
      for (; y--; )
        if (
          // The token starts before the line ending…
          i.events[y][1].start.offset < s && // …and either is not ended yet…
          (!i.events[y][1].end || // …or ends after it.
          i.events[y][1].end.offset > s)
        )
          return;
      const L = t.events.length;
      let B = L, H, D;
      for (; B--; )
        if (t.events[B][0] === "exit" && t.events[B][1].type === "chunkFlow") {
          if (H) {
            D = t.events[B][1].end;
            break;
          }
          H = !0;
        }
      for (T(r), y = L; y < t.events.length; )
        t.events[y][1].end = {
          ...D
        }, y++;
      ut(t.events, B + 1, 0, t.events.slice(L)), t.events.length = y;
    }
  }
  function T(_) {
    let M = n.length;
    for (; M-- > _; ) {
      const R = n[M];
      t.containerState = R[1], R[0].exit.call(t, e);
    }
    n.length = _;
  }
  function O() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function vl(e, t, n) {
  return oe(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function si(e) {
  if (e === null || De(e) || Tl(e))
    return 1;
  if (Sl(e))
    return 2;
}
function fr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const er = {
  name: "attention",
  resolveAll: Al,
  tokenize: Il
};
function Al(e, t) {
  let n = -1, r, i, a, s, o, l, c, u;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          l = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const d = {
            ...e[r][1].end
          }, m = {
            ...e[n][1].start
          };
          oi(d, -l), oi(m, l), s = {
            type: l > 1 ? "strongSequence" : "emphasisSequence",
            start: d,
            end: {
              ...e[r][1].end
            }
          }, o = {
            type: l > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: m
          }, a = {
            type: l > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[n][1].start
            }
          }, i = {
            type: l > 1 ? "strong" : "emphasis",
            start: {
              ...s.start
            },
            end: {
              ...o.end
            }
          }, e[r][1].end = {
            ...s.start
          }, e[n][1].start = {
            ...o.end
          }, c = [], e[r][1].end.offset - e[r][1].start.offset && (c = qe(c, [["enter", e[r][1], t], ["exit", e[r][1], t]])), c = qe(c, [["enter", i, t], ["enter", s, t], ["exit", s, t], ["enter", a, t]]), c = qe(c, fr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), c = qe(c, [["exit", a, t], ["enter", o, t], ["exit", o, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, c = qe(c, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : u = 0, ut(e, r - 1, n - r + 3, c), n = r + c.length - u - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Il(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = si(r);
  let a;
  return s;
  function s(l) {
    return a = l, e.enter("attentionSequence"), o(l);
  }
  function o(l) {
    if (l === a)
      return e.consume(l), o;
    const c = e.exit("attentionSequence"), u = si(l), d = !u || u === 2 && i || n.includes(l), m = !i || i === 2 && u || n.includes(r);
    return c._open = !!(a === 42 ? d : d && (i || !m)), c._close = !!(a === 42 ? m : m && (u || !d)), t(l);
  }
}
function oi(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const Rl = {
  name: "autolink",
  tokenize: Nl
};
function Nl(e, t, n) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(p) {
    return ct(p) ? (e.consume(p), s) : p === 64 ? n(p) : c(p);
  }
  function s(p) {
    return p === 43 || p === 45 || p === 46 || Ve(p) ? (r = 1, o(p)) : c(p);
  }
  function o(p) {
    return p === 58 ? (e.consume(p), r = 0, l) : (p === 43 || p === 45 || p === 46 || Ve(p)) && r++ < 32 ? (e.consume(p), o) : (r = 0, c(p));
  }
  function l(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : p === null || p === 32 || p === 60 || Qn(p) ? n(p) : (e.consume(p), l);
  }
  function c(p) {
    return p === 64 ? (e.consume(p), u) : yl(p) ? (e.consume(p), c) : n(p);
  }
  function u(p) {
    return Ve(p) ? d(p) : n(p);
  }
  function d(p) {
    return p === 46 ? (e.consume(p), r = 0, u) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : m(p);
  }
  function m(p) {
    if ((p === 45 || Ve(p)) && r++ < 63) {
      const w = p === 45 ? m : d;
      return e.consume(p), w;
    }
    return n(p);
  }
}
const wn = {
  partial: !0,
  tokenize: Ml
};
function Ml(e, t, n) {
  return r;
  function r(a) {
    return ne(a) ? oe(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || W(a) ? t(a) : n(a);
  }
}
const la = {
  continuation: {
    tokenize: Ol
  },
  exit: Dl,
  name: "blockQuote",
  tokenize: Ll
};
function Ll(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    if (s === 62) {
      const o = r.containerState;
      return o.open || (e.enter("blockQuote", {
        _container: !0
      }), o.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(s), e.exit("blockQuoteMarker"), a;
    }
    return n(s);
  }
  function a(s) {
    return ne(s) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(s), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(s));
  }
}
function Ol(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return ne(s) ? oe(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s) : a(s);
  }
  function a(s) {
    return e.attempt(la, t, n)(s);
  }
}
function Dl(e) {
  e.exit("blockQuote");
}
const ca = {
  name: "characterEscape",
  tokenize: Pl
};
function Pl(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return El(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const ua = {
  name: "characterReference",
  tokenize: Hl
};
function Hl(e, t, n) {
  const r = this;
  let i = 0, a, s;
  return o;
  function o(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), l;
  }
  function l(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), c) : (e.enter("characterReferenceValue"), a = 31, s = Ve, u(d));
  }
  function c(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, s = wl, u) : (e.enter("characterReferenceValue"), a = 7, s = Jn, u(d));
  }
  function u(d) {
    if (d === 59 && i) {
      const m = e.exit("characterReferenceValue");
      return s === Ve && !dr(r.sliceSerialize(m)) ? n(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return s(d) && i++ < a ? (e.consume(d), u) : n(d);
  }
}
const li = {
  partial: !0,
  tokenize: Fl
}, ci = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Ul
};
function Ul(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: R
  };
  let a = 0, s = 0, o;
  return l;
  function l(y) {
    return c(y);
  }
  function c(y) {
    const L = r.events[r.events.length - 1];
    return a = L && L[1].type === "linePrefix" ? L[2].sliceSerialize(L[1], !0).length : 0, o = y, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(y);
  }
  function u(y) {
    return y === o ? (s++, e.consume(y), u) : s < 3 ? n(y) : (e.exit("codeFencedFenceSequence"), ne(y) ? oe(e, d, "whitespace")(y) : d(y));
  }
  function d(y) {
    return y === null || W(y) ? (e.exit("codeFencedFence"), r.interrupt ? t(y) : e.check(li, S, M)(y)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), m(y));
  }
  function m(y) {
    return y === null || W(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(y)) : ne(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), oe(e, p, "whitespace")(y)) : y === 96 && y === o ? n(y) : (e.consume(y), m);
  }
  function p(y) {
    return y === null || W(y) ? d(y) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), w(y));
  }
  function w(y) {
    return y === null || W(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(y)) : y === 96 && y === o ? n(y) : (e.consume(y), w);
  }
  function S(y) {
    return e.attempt(i, M, N)(y);
  }
  function N(y) {
    return e.enter("lineEnding"), e.consume(y), e.exit("lineEnding"), T;
  }
  function T(y) {
    return a > 0 && ne(y) ? oe(e, O, "linePrefix", a + 1)(y) : O(y);
  }
  function O(y) {
    return y === null || W(y) ? e.check(li, S, M)(y) : (e.enter("codeFlowValue"), _(y));
  }
  function _(y) {
    return y === null || W(y) ? (e.exit("codeFlowValue"), O(y)) : (e.consume(y), _);
  }
  function M(y) {
    return e.exit("codeFenced"), t(y);
  }
  function R(y, L, B) {
    let H = 0;
    return D;
    function D(V) {
      return y.enter("lineEnding"), y.consume(V), y.exit("lineEnding"), k;
    }
    function k(V) {
      return y.enter("codeFencedFence"), ne(V) ? oe(y, I, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(V) : I(V);
    }
    function I(V) {
      return V === o ? (y.enter("codeFencedFenceSequence"), $(V)) : B(V);
    }
    function $(V) {
      return V === o ? (H++, y.consume(V), $) : H >= s ? (y.exit("codeFencedFenceSequence"), ne(V) ? oe(y, Z, "whitespace")(V) : Z(V)) : B(V);
    }
    function Z(V) {
      return V === null || W(V) ? (y.exit("codeFencedFence"), L(V)) : B(V);
    }
  }
}
function Fl(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return s === null ? n(s) : (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), a);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
const Ln = {
  name: "codeIndented",
  tokenize: Bl
}, zl = {
  partial: !0,
  tokenize: Gl
};
function Bl(e, t, n) {
  const r = this;
  return i;
  function i(c) {
    return e.enter("codeIndented"), oe(e, a, "linePrefix", 5)(c);
  }
  function a(c) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? s(c) : n(c);
  }
  function s(c) {
    return c === null ? l(c) : W(c) ? e.attempt(zl, s, l)(c) : (e.enter("codeFlowValue"), o(c));
  }
  function o(c) {
    return c === null || W(c) ? (e.exit("codeFlowValue"), s(c)) : (e.consume(c), o);
  }
  function l(c) {
    return e.exit("codeIndented"), t(c);
  }
}
function Gl(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line] ? n(s) : W(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), i) : oe(e, a, "linePrefix", 5)(s);
  }
  function a(s) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(s) : W(s) ? i(s) : n(s);
  }
}
const Vl = {
  name: "codeText",
  previous: $l,
  resolve: Wl,
  tokenize: jl
};
function Wl(e) {
  let t = e.length - 4, n = 3, r, i;
  if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
    for (r = n; ++r < t; )
      if (e[r][1].type === "codeTextData") {
        e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function $l(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function jl(e, t, n) {
  let r = 0, i, a;
  return s;
  function s(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), o(d);
  }
  function o(d) {
    return d === 96 ? (e.consume(d), r++, o) : (e.exit("codeTextSequence"), l(d));
  }
  function l(d) {
    return d === null ? n(d) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), l) : d === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(d)) : W(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), l) : (e.enter("codeTextData"), c(d));
  }
  function c(d) {
    return d === null || d === 32 || d === 96 || W(d) ? (e.exit("codeTextData"), l(d)) : (e.consume(d), c);
  }
  function u(d) {
    return d === 96 ? (e.consume(d), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(d)) : (a.type = "codeTextData", c(d));
  }
}
class Zl {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(t) {
    this.left = t ? [...t] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(t) {
    if (t < 0 || t >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return t < this.left.length ? this.left[t] : this.right[this.right.length - t + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(t, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(t, r) : t > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - t + this.left.length).reverse() : this.left.slice(t).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(t, n, r) {
    const i = n || 0;
    this.setCursor(Math.trunc(t));
    const a = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && Zt(this.left, r), a.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(t) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(t) {
    this.setCursor(Number.POSITIVE_INFINITY), Zt(this.left, t);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(t) {
    this.setCursor(0), this.right.push(t);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(t) {
    this.setCursor(0), Zt(this.right, t.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(t) {
    if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0))
      if (t < this.left.length) {
        const n = this.left.splice(t, Number.POSITIVE_INFINITY);
        Zt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Zt(this.left, n.reverse());
      }
  }
}
function Zt(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function ha(e) {
  const t = {};
  let n = -1, r, i, a, s, o, l, c;
  const u = new Zl(e);
  for (; ++n < u.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (l = r[1]._tokenizer.events, a = 0, a < l.length && l[a][1].type === "lineEndingBlank" && (a += 2), a < l.length && l[a][1].type === "content"))
      for (; ++a < l.length && l[a][1].type !== "content"; )
        l[a][1].type === "chunkText" && (l[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, ql(u, n)), n = t[n], c = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (s = u.get(a), s[1].type === "lineEnding" || s[1].type === "lineEndingBlank")
          s[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), s[1].type = "lineEnding", i = a);
        else if (!(s[1].type === "linePrefix" || s[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...u.get(i)[1].start
      }, o = u.slice(i, n), o.unshift(r), u.splice(i, n - i + 1, o));
    }
  }
  return ut(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !c;
}
function ql(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let s = n._tokenizer;
  s || (s = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  const o = s.events, l = [], c = {};
  let u, d, m = -1, p = n, w = 0, S = 0;
  const N = [S];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && s.defineSkip(p.start), p._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0), s.write(u), p._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
  }
  for (p = n; ++m < o.length; )
    // Find a void token that includes a break.
    o[m][0] === "exit" && o[m - 1][0] === "enter" && o[m][1].type === o[m - 1][1].type && o[m][1].start.line !== o[m][1].end.line && (S = m + 1, N.push(S), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (s.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : N.pop(), m = N.length; m--; ) {
    const T = o.slice(N[m], N[m + 1]), O = a.pop();
    l.push([O, O + T.length - 1]), e.splice(O, 2, T);
  }
  for (l.reverse(), m = -1; ++m < l.length; )
    c[w + l[m][0]] = w + l[m][1], w += l[m][1] - l[m][0] - 1;
  return c;
}
const Kl = {
  resolve: Yl,
  tokenize: Ql
}, Xl = {
  partial: !0,
  tokenize: Jl
};
function Yl(e) {
  return ha(e), e;
}
function Ql(e, t) {
  let n;
  return r;
  function r(o) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(o);
  }
  function i(o) {
    return o === null ? a(o) : W(o) ? e.check(Xl, s, a)(o) : (e.consume(o), i);
  }
  function a(o) {
    return e.exit("chunkContent"), e.exit("content"), t(o);
  }
  function s(o) {
    return e.consume(o), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, i;
  }
}
function Jl(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), oe(e, a, "linePrefix");
  }
  function a(s) {
    if (s === null || W(s))
      return n(s);
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(s) : e.interrupt(r.parser.constructs.flow, n, t)(s);
  }
}
function pa(e, t, n, r, i, a, s, o, l) {
  const c = l || Number.POSITIVE_INFINITY;
  let u = 0;
  return d;
  function d(T) {
    return T === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(T), e.exit(a), m) : T === null || T === 32 || T === 41 || Qn(T) ? n(T) : (e.enter(r), e.enter(s), e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), S(T));
  }
  function m(T) {
    return T === 62 ? (e.enter(a), e.consume(T), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), p(T));
  }
  function p(T) {
    return T === 62 ? (e.exit("chunkString"), e.exit(o), m(T)) : T === null || T === 60 || W(T) ? n(T) : (e.consume(T), T === 92 ? w : p);
  }
  function w(T) {
    return T === 60 || T === 62 || T === 92 ? (e.consume(T), p) : p(T);
  }
  function S(T) {
    return !u && (T === null || T === 41 || De(T)) ? (e.exit("chunkString"), e.exit(o), e.exit(s), e.exit(r), t(T)) : u < c && T === 40 ? (e.consume(T), u++, S) : T === 41 ? (e.consume(T), u--, S) : T === null || T === 32 || T === 40 || Qn(T) ? n(T) : (e.consume(T), T === 92 ? N : S);
  }
  function N(T) {
    return T === 40 || T === 41 || T === 92 ? (e.consume(T), S) : S(T);
  }
}
function da(e, t, n, r, i, a) {
  const s = this;
  let o = 0, l;
  return c;
  function c(p) {
    return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(a), u;
  }
  function u(p) {
    return o > 999 || p === null || p === 91 || p === 93 && !l || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !o && "_hiddenFootnoteSupport" in s.parser.constructs ? n(p) : p === 93 ? (e.exit(a), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : W(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), d(p));
  }
  function d(p) {
    return p === null || p === 91 || p === 93 || W(p) || o++ > 999 ? (e.exit("chunkString"), u(p)) : (e.consume(p), l || (l = !ne(p)), p === 92 ? m : d);
  }
  function m(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), o++, d) : d(p);
  }
}
function fa(e, t, n, r, i, a) {
  let s;
  return o;
  function o(m) {
    return m === 34 || m === 39 || m === 40 ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), s = m === 40 ? 41 : m, l) : n(m);
  }
  function l(m) {
    return m === s ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), t) : (e.enter(a), c(m));
  }
  function c(m) {
    return m === s ? (e.exit(a), l(s)) : m === null ? n(m) : W(m) ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), oe(e, c, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), u(m));
  }
  function u(m) {
    return m === s || m === null || W(m) ? (e.exit("chunkString"), c(m)) : (e.consume(m), m === 92 ? d : u);
  }
  function d(m) {
    return m === s || m === 92 ? (e.consume(m), u) : u(m);
  }
}
function Xt(e, t) {
  let n;
  return r;
  function r(i) {
    return W(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : ne(i) ? oe(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const ec = {
  name: "definition",
  tokenize: nc
}, tc = {
  partial: !0,
  tokenize: rc
};
function nc(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(p) {
    return e.enter("definition"), s(p);
  }
  function s(p) {
    return da.call(
      r,
      e,
      o,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(p);
  }
  function o(p) {
    return i = Ht(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), l) : n(p);
  }
  function l(p) {
    return De(p) ? Xt(e, c)(p) : c(p);
  }
  function c(p) {
    return pa(
      e,
      u,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(p);
  }
  function u(p) {
    return e.attempt(tc, d, d)(p);
  }
  function d(p) {
    return ne(p) ? oe(e, m, "whitespace")(p) : m(p);
  }
  function m(p) {
    return p === null || W(p) ? (e.exit("definition"), r.parser.defined.push(i), t(p)) : n(p);
  }
}
function rc(e, t, n) {
  return r;
  function r(o) {
    return De(o) ? Xt(e, i)(o) : n(o);
  }
  function i(o) {
    return fa(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
  }
  function a(o) {
    return ne(o) ? oe(e, s, "whitespace")(o) : s(o);
  }
  function s(o) {
    return o === null || W(o) ? t(o) : n(o);
  }
}
const ic = {
  name: "hardBreakEscape",
  tokenize: ac
};
function ac(e, t, n) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), i;
  }
  function i(a) {
    return W(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
  }
}
const sc = {
  name: "headingAtx",
  resolve: oc,
  tokenize: lc
};
function oc(e, t) {
  let n = e.length - 2, r = 3, i, a;
  return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[n][1].end
  }, a = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[n][1].end,
    contentType: "text"
  }, ut(e, r, n - r + 1, [["enter", i, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]])), e;
}
function lc(e, t, n) {
  let r = 0;
  return i;
  function i(u) {
    return e.enter("atxHeading"), a(u);
  }
  function a(u) {
    return e.enter("atxHeadingSequence"), s(u);
  }
  function s(u) {
    return u === 35 && r++ < 6 ? (e.consume(u), s) : u === null || De(u) ? (e.exit("atxHeadingSequence"), o(u)) : n(u);
  }
  function o(u) {
    return u === 35 ? (e.enter("atxHeadingSequence"), l(u)) : u === null || W(u) ? (e.exit("atxHeading"), t(u)) : ne(u) ? oe(e, o, "whitespace")(u) : (e.enter("atxHeadingText"), c(u));
  }
  function l(u) {
    return u === 35 ? (e.consume(u), l) : (e.exit("atxHeadingSequence"), o(u));
  }
  function c(u) {
    return u === null || u === 35 || De(u) ? (e.exit("atxHeadingText"), o(u)) : (e.consume(u), c);
  }
}
const cc = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], ui = ["pre", "script", "style", "textarea"], uc = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: dc,
  tokenize: fc
}, hc = {
  partial: !0,
  tokenize: gc
}, pc = {
  partial: !0,
  tokenize: mc
};
function dc(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function fc(e, t, n) {
  const r = this;
  let i, a, s, o, l;
  return c;
  function c(f) {
    return u(f);
  }
  function u(f) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(f), d;
  }
  function d(f) {
    return f === 33 ? (e.consume(f), m) : f === 47 ? (e.consume(f), a = !0, S) : f === 63 ? (e.consume(f), i = 3, r.interrupt ? t : g) : ct(f) ? (e.consume(f), s = String.fromCharCode(f), N) : n(f);
  }
  function m(f) {
    return f === 45 ? (e.consume(f), i = 2, p) : f === 91 ? (e.consume(f), i = 5, o = 0, w) : ct(f) ? (e.consume(f), i = 4, r.interrupt ? t : g) : n(f);
  }
  function p(f) {
    return f === 45 ? (e.consume(f), r.interrupt ? t : g) : n(f);
  }
  function w(f) {
    const we = "CDATA[";
    return f === we.charCodeAt(o++) ? (e.consume(f), o === we.length ? r.interrupt ? t : I : w) : n(f);
  }
  function S(f) {
    return ct(f) ? (e.consume(f), s = String.fromCharCode(f), N) : n(f);
  }
  function N(f) {
    if (f === null || f === 47 || f === 62 || De(f)) {
      const we = f === 47, Y = s.toLowerCase();
      return !we && !a && ui.includes(Y) ? (i = 1, r.interrupt ? t(f) : I(f)) : cc.includes(s.toLowerCase()) ? (i = 6, we ? (e.consume(f), T) : r.interrupt ? t(f) : I(f)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(f) : a ? O(f) : _(f));
    }
    return f === 45 || Ve(f) ? (e.consume(f), s += String.fromCharCode(f), N) : n(f);
  }
  function T(f) {
    return f === 62 ? (e.consume(f), r.interrupt ? t : I) : n(f);
  }
  function O(f) {
    return ne(f) ? (e.consume(f), O) : D(f);
  }
  function _(f) {
    return f === 47 ? (e.consume(f), D) : f === 58 || f === 95 || ct(f) ? (e.consume(f), M) : ne(f) ? (e.consume(f), _) : D(f);
  }
  function M(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || Ve(f) ? (e.consume(f), M) : R(f);
  }
  function R(f) {
    return f === 61 ? (e.consume(f), y) : ne(f) ? (e.consume(f), R) : _(f);
  }
  function y(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), l = f, L) : ne(f) ? (e.consume(f), y) : B(f);
  }
  function L(f) {
    return f === l ? (e.consume(f), l = null, H) : f === null || W(f) ? n(f) : (e.consume(f), L);
  }
  function B(f) {
    return f === null || f === 34 || f === 39 || f === 47 || f === 60 || f === 61 || f === 62 || f === 96 || De(f) ? R(f) : (e.consume(f), B);
  }
  function H(f) {
    return f === 47 || f === 62 || ne(f) ? _(f) : n(f);
  }
  function D(f) {
    return f === 62 ? (e.consume(f), k) : n(f);
  }
  function k(f) {
    return f === null || W(f) ? I(f) : ne(f) ? (e.consume(f), k) : n(f);
  }
  function I(f) {
    return f === 45 && i === 2 ? (e.consume(f), re) : f === 60 && i === 1 ? (e.consume(f), X) : f === 62 && i === 4 ? (e.consume(f), ee) : f === 63 && i === 3 ? (e.consume(f), g) : f === 93 && i === 5 ? (e.consume(f), Ae) : W(f) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(hc, de, $)(f)) : f === null || W(f) ? (e.exit("htmlFlowData"), $(f)) : (e.consume(f), I);
  }
  function $(f) {
    return e.check(pc, Z, de)(f);
  }
  function Z(f) {
    return e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), V;
  }
  function V(f) {
    return f === null || W(f) ? $(f) : (e.enter("htmlFlowData"), I(f));
  }
  function re(f) {
    return f === 45 ? (e.consume(f), g) : I(f);
  }
  function X(f) {
    return f === 47 ? (e.consume(f), s = "", ue) : I(f);
  }
  function ue(f) {
    if (f === 62) {
      const we = s.toLowerCase();
      return ui.includes(we) ? (e.consume(f), ee) : I(f);
    }
    return ct(f) && s.length < 8 ? (e.consume(f), s += String.fromCharCode(f), ue) : I(f);
  }
  function Ae(f) {
    return f === 93 ? (e.consume(f), g) : I(f);
  }
  function g(f) {
    return f === 62 ? (e.consume(f), ee) : f === 45 && i === 2 ? (e.consume(f), g) : I(f);
  }
  function ee(f) {
    return f === null || W(f) ? (e.exit("htmlFlowData"), de(f)) : (e.consume(f), ee);
  }
  function de(f) {
    return e.exit("htmlFlow"), t(f);
  }
}
function mc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return W(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), a) : n(s);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
function gc(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(wn, t, n);
  }
}
const Cc = {
  name: "htmlText",
  tokenize: yc
};
function yc(e, t, n) {
  const r = this;
  let i, a, s;
  return o;
  function o(g) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), l;
  }
  function l(g) {
    return g === 33 ? (e.consume(g), c) : g === 47 ? (e.consume(g), R) : g === 63 ? (e.consume(g), _) : ct(g) ? (e.consume(g), B) : n(g);
  }
  function c(g) {
    return g === 45 ? (e.consume(g), u) : g === 91 ? (e.consume(g), a = 0, w) : ct(g) ? (e.consume(g), O) : n(g);
  }
  function u(g) {
    return g === 45 ? (e.consume(g), p) : n(g);
  }
  function d(g) {
    return g === null ? n(g) : g === 45 ? (e.consume(g), m) : W(g) ? (s = d, X(g)) : (e.consume(g), d);
  }
  function m(g) {
    return g === 45 ? (e.consume(g), p) : d(g);
  }
  function p(g) {
    return g === 62 ? re(g) : g === 45 ? m(g) : d(g);
  }
  function w(g) {
    const ee = "CDATA[";
    return g === ee.charCodeAt(a++) ? (e.consume(g), a === ee.length ? S : w) : n(g);
  }
  function S(g) {
    return g === null ? n(g) : g === 93 ? (e.consume(g), N) : W(g) ? (s = S, X(g)) : (e.consume(g), S);
  }
  function N(g) {
    return g === 93 ? (e.consume(g), T) : S(g);
  }
  function T(g) {
    return g === 62 ? re(g) : g === 93 ? (e.consume(g), T) : S(g);
  }
  function O(g) {
    return g === null || g === 62 ? re(g) : W(g) ? (s = O, X(g)) : (e.consume(g), O);
  }
  function _(g) {
    return g === null ? n(g) : g === 63 ? (e.consume(g), M) : W(g) ? (s = _, X(g)) : (e.consume(g), _);
  }
  function M(g) {
    return g === 62 ? re(g) : _(g);
  }
  function R(g) {
    return ct(g) ? (e.consume(g), y) : n(g);
  }
  function y(g) {
    return g === 45 || Ve(g) ? (e.consume(g), y) : L(g);
  }
  function L(g) {
    return W(g) ? (s = L, X(g)) : ne(g) ? (e.consume(g), L) : re(g);
  }
  function B(g) {
    return g === 45 || Ve(g) ? (e.consume(g), B) : g === 47 || g === 62 || De(g) ? H(g) : n(g);
  }
  function H(g) {
    return g === 47 ? (e.consume(g), re) : g === 58 || g === 95 || ct(g) ? (e.consume(g), D) : W(g) ? (s = H, X(g)) : ne(g) ? (e.consume(g), H) : re(g);
  }
  function D(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || Ve(g) ? (e.consume(g), D) : k(g);
  }
  function k(g) {
    return g === 61 ? (e.consume(g), I) : W(g) ? (s = k, X(g)) : ne(g) ? (e.consume(g), k) : H(g);
  }
  function I(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), i = g, $) : W(g) ? (s = I, X(g)) : ne(g) ? (e.consume(g), I) : (e.consume(g), Z);
  }
  function $(g) {
    return g === i ? (e.consume(g), i = void 0, V) : g === null ? n(g) : W(g) ? (s = $, X(g)) : (e.consume(g), $);
  }
  function Z(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? n(g) : g === 47 || g === 62 || De(g) ? H(g) : (e.consume(g), Z);
  }
  function V(g) {
    return g === 47 || g === 62 || De(g) ? H(g) : n(g);
  }
  function re(g) {
    return g === 62 ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(g);
  }
  function X(g) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), ue;
  }
  function ue(g) {
    return ne(g) ? oe(e, Ae, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(g) : Ae(g);
  }
  function Ae(g) {
    return e.enter("htmlTextData"), s(g);
  }
}
const mr = {
  name: "labelEnd",
  resolveAll: Tc,
  resolveTo: _c,
  tokenize: kc
}, wc = {
  tokenize: xc
}, Ec = {
  tokenize: bc
}, Sc = {
  tokenize: vc
};
function Tc(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e.length !== n.length && ut(e, 0, e.length, n), e;
}
function _c(e, t) {
  let n = e.length, r = 0, i, a, s, o;
  for (; n--; )
    if (i = e[n][1], a) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (s) {
      if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (a = n, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (s = n);
  const l = {
    type: e[a][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[a][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, c = {
    type: "label",
    start: {
      ...e[a][1].start
    },
    end: {
      ...e[s][1].end
    }
  }, u = {
    type: "labelText",
    start: {
      ...e[a + r + 2][1].end
    },
    end: {
      ...e[s - 2][1].start
    }
  };
  return o = [["enter", l, t], ["enter", c, t]], o = qe(o, e.slice(a + 1, a + r + 3)), o = qe(o, [["enter", u, t]]), o = qe(o, fr(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, s - 3), t)), o = qe(o, [["exit", u, t], e[s - 2], e[s - 1], ["exit", c, t]]), o = qe(o, e.slice(s + 1)), o = qe(o, [["exit", l, t]]), ut(e, a, e.length, o), e;
}
function kc(e, t, n) {
  const r = this;
  let i = r.events.length, a, s;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return o;
  function o(m) {
    return a ? a._inactive ? d(m) : (s = r.parser.defined.includes(Ht(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(m), e.exit("labelMarker"), e.exit("labelEnd"), l) : n(m);
  }
  function l(m) {
    return m === 40 ? e.attempt(wc, u, s ? u : d)(m) : m === 91 ? e.attempt(Ec, u, s ? c : d)(m) : s ? u(m) : d(m);
  }
  function c(m) {
    return e.attempt(Sc, u, d)(m);
  }
  function u(m) {
    return t(m);
  }
  function d(m) {
    return a._balanced = !0, n(m);
  }
}
function xc(e, t, n) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), i;
  }
  function i(d) {
    return De(d) ? Xt(e, a)(d) : a(d);
  }
  function a(d) {
    return d === 41 ? u(d) : pa(e, s, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function s(d) {
    return De(d) ? Xt(e, l)(d) : u(d);
  }
  function o(d) {
    return n(d);
  }
  function l(d) {
    return d === 34 || d === 39 || d === 40 ? fa(e, c, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : u(d);
  }
  function c(d) {
    return De(d) ? Xt(e, u)(d) : u(d);
  }
  function u(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), t) : n(d);
  }
}
function bc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return da.call(r, e, a, s, "reference", "referenceMarker", "referenceString")(o);
  }
  function a(o) {
    return r.parser.defined.includes(Ht(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(o) : n(o);
  }
  function s(o) {
    return n(o);
  }
}
function vc(e, t, n) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), i;
  }
  function i(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), t) : n(a);
  }
}
const Ac = {
  name: "labelStartImage",
  resolveAll: mr.resolveAll,
  tokenize: Ic
};
function Ic(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(o), e.exit("labelImageMarker"), a;
  }
  function a(o) {
    return o === 91 ? (e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelImage"), s) : n(o);
  }
  function s(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const Rc = {
  name: "labelStartLink",
  resolveAll: mr.resolveAll,
  tokenize: Nc
};
function Nc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(s), e.exit("labelMarker"), e.exit("labelLink"), a;
  }
  function a(s) {
    return s === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : t(s);
  }
}
const On = {
  name: "lineEnding",
  tokenize: Mc
};
function Mc(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), oe(e, t, "linePrefix");
  }
}
const hn = {
  name: "thematicBreak",
  tokenize: Lc
};
function Lc(e, t, n) {
  let r = 0, i;
  return a;
  function a(c) {
    return e.enter("thematicBreak"), s(c);
  }
  function s(c) {
    return i = c, o(c);
  }
  function o(c) {
    return c === i ? (e.enter("thematicBreakSequence"), l(c)) : r >= 3 && (c === null || W(c)) ? (e.exit("thematicBreak"), t(c)) : n(c);
  }
  function l(c) {
    return c === i ? (e.consume(c), r++, l) : (e.exit("thematicBreakSequence"), ne(c) ? oe(e, o, "whitespace")(c) : o(c));
  }
}
const Ne = {
  continuation: {
    tokenize: Hc
  },
  exit: Fc,
  name: "list",
  tokenize: Pc
}, Oc = {
  partial: !0,
  tokenize: zc
}, Dc = {
  partial: !0,
  tokenize: Uc
};
function Pc(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, s = 0;
  return o;
  function o(p) {
    const w = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (w === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : Jn(p)) {
      if (r.containerState.type || (r.containerState.type = w, e.enter(w, {
        _container: !0
      })), w === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(hn, n, c)(p) : c(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), l(p);
    }
    return n(p);
  }
  function l(p) {
    return Jn(p) && ++s < 10 ? (e.consume(p), l) : (!r.interrupt || s < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), c(p)) : n(p);
  }
  function c(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      wn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : u,
      e.attempt(Oc, m, d)
    );
  }
  function u(p) {
    return r.containerState.initialBlankLine = !0, a++, m(p);
  }
  function d(p) {
    return ne(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), m) : n(p);
  }
  function m(p) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(p);
  }
}
function Hc(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(wn, i, a);
  function i(o) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, oe(e, t, "listItemIndent", r.containerState.size + 1)(o);
  }
  function a(o) {
    return r.containerState.furtherBlankLines || !ne(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Dc, t, s)(o));
  }
  function s(o) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, oe(e, e.attempt(Ne, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
  }
}
function Uc(e, t, n) {
  const r = this;
  return oe(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "listItemIndent" && s[2].sliceSerialize(s[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function Fc(e) {
  e.exit(this.containerState.type);
}
function zc(e, t, n) {
  const r = this;
  return oe(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const s = r.events[r.events.length - 1];
    return !ne(a) && s && s[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const hi = {
  name: "setextUnderline",
  resolveTo: Bc,
  tokenize: Gc
};
function Bc(e, t) {
  let n = e.length, r, i, a;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === "content") {
        r = n;
        break;
      }
      e[n][1].type === "paragraph" && (i = n);
    } else
      e[n][1].type === "content" && e.splice(n, 1), !a && e[n][1].type === "definition" && (a = n);
  const s = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", a ? (e.splice(i, 0, ["enter", s, t]), e.splice(a + 1, 0, ["exit", e[r][1], t]), e[r][1].end = {
    ...e[a][1].end
  }) : e[r][1] = s, e.push(["exit", s, t]), e;
}
function Gc(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(c) {
    let u = r.events.length, d;
    for (; u--; )
      if (r.events[u][1].type !== "lineEnding" && r.events[u][1].type !== "linePrefix" && r.events[u][1].type !== "content") {
        d = r.events[u][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || d) ? (e.enter("setextHeadingLine"), i = c, s(c)) : n(c);
  }
  function s(c) {
    return e.enter("setextHeadingLineSequence"), o(c);
  }
  function o(c) {
    return c === i ? (e.consume(c), o) : (e.exit("setextHeadingLineSequence"), ne(c) ? oe(e, l, "lineSuffix")(c) : l(c));
  }
  function l(c) {
    return c === null || W(c) ? (e.exit("setextHeadingLine"), t(c)) : n(c);
  }
}
const Vc = {
  tokenize: Wc
};
function Wc(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    wn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, oe(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Kl, i)), "linePrefix"))
  );
  return n;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(a), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
  }
  function i(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), t.currentConstruct = void 0, n;
  }
}
const $c = {
  resolveAll: ga()
}, jc = ma("string"), Zc = ma("text");
function ma(e) {
  return {
    resolveAll: ga(e === "text" ? qc : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], a = n.attempt(i, s, o);
    return s;
    function s(u) {
      return c(u) ? a(u) : o(u);
    }
    function o(u) {
      if (u === null) {
        n.consume(u);
        return;
      }
      return n.enter("data"), n.consume(u), l;
    }
    function l(u) {
      return c(u) ? (n.exit("data"), a(u)) : (n.consume(u), l);
    }
    function c(u) {
      if (u === null)
        return !0;
      const d = i[u];
      let m = -1;
      if (d)
        for (; ++m < d.length; ) {
          const p = d[m];
          if (!p.previous || p.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function ga(e) {
  return t;
  function t(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === "data" && (a = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function qc(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let a = i.length, s = -1, o = 0, l;
      for (; a--; ) {
        const c = i[a];
        if (typeof c == "string") {
          for (s = c.length; c.charCodeAt(s - 1) === 32; )
            o++, s--;
          if (s) break;
          s = -1;
        } else if (c === -2)
          l = !0, o++;
        else if (c !== -1) {
          a++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (o = 0), o) {
        const c = {
          type: n === e.length || l || o < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: a ? s : r.start._bufferIndex + s,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - o,
            offset: r.end.offset - o
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...c.start
        }, r.start.offset === r.end.offset ? Object.assign(r, c) : (e.splice(n, 0, ["enter", c, t], ["exit", c, t]), n += 2);
      }
      n++;
    }
  return e;
}
const Kc = {
  42: Ne,
  43: Ne,
  45: Ne,
  48: Ne,
  49: Ne,
  50: Ne,
  51: Ne,
  52: Ne,
  53: Ne,
  54: Ne,
  55: Ne,
  56: Ne,
  57: Ne,
  62: la
}, Xc = {
  91: ec
}, Yc = {
  [-2]: Ln,
  [-1]: Ln,
  32: Ln
}, Qc = {
  35: sc,
  42: hn,
  45: [hi, hn],
  60: uc,
  61: hi,
  95: hn,
  96: ci,
  126: ci
}, Jc = {
  38: ua,
  92: ca
}, eu = {
  [-5]: On,
  [-4]: On,
  [-3]: On,
  33: Ac,
  38: ua,
  42: er,
  60: [Rl, Cc],
  91: Rc,
  92: [ic, ca],
  93: mr,
  95: er,
  96: Vl
}, tu = {
  null: [er, $c]
}, nu = {
  null: [42, 95]
}, ru = {
  null: []
}, iu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: nu,
  contentInitial: Xc,
  disable: ru,
  document: Kc,
  flow: Qc,
  flowInitial: Yc,
  insideSpan: tu,
  string: Jc,
  text: eu
}, Symbol.toStringTag, { value: "Module" }));
function au(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, a = [];
  let s = [], o = [];
  const l = {
    attempt: L(R),
    check: L(y),
    consume: O,
    enter: _,
    exit: M,
    interrupt: L(y, {
      interrupt: !0
    })
  }, c = {
    code: null,
    containerState: {},
    defineSkip: S,
    events: [],
    now: w,
    parser: e,
    previous: null,
    sliceSerialize: m,
    sliceStream: p,
    write: d
  };
  let u = t.tokenize.call(c, l);
  return t.resolveAll && a.push(t), c;
  function d(k) {
    return s = qe(s, k), N(), s[s.length - 1] !== null ? [] : (B(t, 0), c.events = fr(a, c.events, c), c.events);
  }
  function m(k, I) {
    return ou(p(k), I);
  }
  function p(k) {
    return su(s, k);
  }
  function w() {
    const {
      _bufferIndex: k,
      _index: I,
      line: $,
      column: Z,
      offset: V
    } = r;
    return {
      _bufferIndex: k,
      _index: I,
      line: $,
      column: Z,
      offset: V
    };
  }
  function S(k) {
    i[k.line] = k.column, D();
  }
  function N() {
    let k;
    for (; r._index < s.length; ) {
      const I = s[r._index];
      if (typeof I == "string")
        for (k = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === k && r._bufferIndex < I.length; )
          T(I.charCodeAt(r._bufferIndex));
      else
        T(I);
    }
  }
  function T(k) {
    u = u(k);
  }
  function O(k) {
    W(k) ? (r.line++, r.column = 1, r.offset += k === -3 ? 2 : 1, D()) : k !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    s[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = k;
  }
  function _(k, I) {
    const $ = I || {};
    return $.type = k, $.start = w(), c.events.push(["enter", $, c]), o.push($), $;
  }
  function M(k) {
    const I = o.pop();
    return I.end = w(), c.events.push(["exit", I, c]), I;
  }
  function R(k, I) {
    B(k, I.from);
  }
  function y(k, I) {
    I.restore();
  }
  function L(k, I) {
    return $;
    function $(Z, V, re) {
      let X, ue, Ae, g;
      return Array.isArray(Z) ? (
        /* c8 ignore next 1 */
        de(Z)
      ) : "tokenize" in Z ? (
        // Looks like a construct.
        de([
          /** @type {Construct} */
          Z
        ])
      ) : ee(Z);
      function ee(ae) {
        return He;
        function He(fe) {
          const Xe = fe !== null && ae[fe], Ue = fe !== null && ae.null, ht = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Xe) ? Xe : Xe ? [Xe] : [],
            ...Array.isArray(Ue) ? Ue : Ue ? [Ue] : []
          ];
          return de(ht)(fe);
        }
      }
      function de(ae) {
        return X = ae, ue = 0, ae.length === 0 ? re : f(ae[ue]);
      }
      function f(ae) {
        return He;
        function He(fe) {
          return g = H(), Ae = ae, ae.partial || (c.currentConstruct = ae), ae.name && c.parser.constructs.disable.null.includes(ae.name) ? Y() : ae.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            I ? Object.assign(Object.create(c), I) : c,
            l,
            we,
            Y
          )(fe);
        }
      }
      function we(ae) {
        return k(Ae, g), V;
      }
      function Y(ae) {
        return g.restore(), ++ue < X.length ? f(X[ue]) : re;
      }
    }
  }
  function B(k, I) {
    k.resolveAll && !a.includes(k) && a.push(k), k.resolve && ut(c.events, I, c.events.length - I, k.resolve(c.events.slice(I), c)), k.resolveTo && (c.events = k.resolveTo(c.events, c));
  }
  function H() {
    const k = w(), I = c.previous, $ = c.currentConstruct, Z = c.events.length, V = Array.from(o);
    return {
      from: Z,
      restore: re
    };
    function re() {
      r = k, c.previous = I, c.currentConstruct = $, c.events.length = Z, o = V, D();
    }
  }
  function D() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function su(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex;
  let s;
  if (n === i)
    s = [e[n].slice(r, a)];
  else {
    if (s = e.slice(n, i), r > -1) {
      const o = s[0];
      typeof o == "string" ? s[0] = o.slice(r) : s.shift();
    }
    a > 0 && s.push(e[i].slice(0, a));
  }
  return s;
}
function ou(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const a = e[n];
    let s;
    if (typeof a == "string")
      s = a;
    else switch (a) {
      case -5: {
        s = "\r";
        break;
      }
      case -4: {
        s = `
`;
        break;
      }
      case -3: {
        s = `\r
`;
        break;
      }
      case -2: {
        s = t ? " " : "	";
        break;
      }
      case -1: {
        if (!t && i) continue;
        s = " ";
        break;
      }
      default:
        s = String.fromCharCode(a);
    }
    i = a === -2, r.push(s);
  }
  return r.join("");
}
function lu(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      ml([iu, ...(e || {}).extensions || []])
    ),
    content: i(_l),
    defined: [],
    document: i(xl),
    flow: i(Vc),
    lazy: {},
    string: i(jc),
    text: i(Zc)
  };
  return r;
  function i(a) {
    return s;
    function s(o) {
      return au(r, a, o);
    }
  }
}
function cu(e) {
  for (; !ha(e); )
    ;
  return e;
}
const pi = /[\0\t\n\r]/g;
function uu() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, s, o) {
    const l = [];
    let c, u, d, m, p;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(s || void 0).decode(a)), d = 0, t = "", n && (a.charCodeAt(0) === 65279 && d++, n = void 0); d < a.length; ) {
      if (pi.lastIndex = d, c = pi.exec(a), m = c && c.index !== void 0 ? c.index : a.length, p = a.charCodeAt(m), !c) {
        t = a.slice(d);
        break;
      }
      if (p === 10 && d === m && r)
        l.push(-3), r = void 0;
      else
        switch (r && (l.push(-5), r = void 0), d < m && (l.push(a.slice(d, m)), e += m - d), p) {
          case 0: {
            l.push(65533), e++;
            break;
          }
          case 9: {
            for (u = Math.ceil(e / 4) * 4, l.push(-2); e++ < u; ) l.push(-1);
            break;
          }
          case 10: {
            l.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      d = m + 1;
    }
    return o && (r && l.push(-5), t && l.push(t), l.push(null)), l;
  }
}
const hu = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function pu(e) {
  return e.replace(hu, du);
}
function du(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return oa(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return dr(n) || e;
}
const Ca = {}.hasOwnProperty;
function fu(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), mu(n)(cu(lu(n).document().write(uu()(e, t, !0))));
}
function mu(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(Qe),
      autolinkProtocol: H,
      autolinkEmail: H,
      atxHeading: a(We),
      blockQuote: a(Ue),
      characterEscape: H,
      characterReference: H,
      codeFenced: a(ht),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: a(ht, s),
      codeText: a(Rt, s),
      codeTextData: H,
      data: H,
      codeFlowValue: H,
      definition: a(Ye),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: a(wt),
      hardBreakEscape: a(rt),
      hardBreakTrailing: a(rt),
      htmlFlow: a(pt, s),
      htmlFlowData: H,
      htmlText: a(pt, s),
      htmlTextData: H,
      image: a(it),
      label: s,
      link: a(Qe),
      listItem: a(Et),
      listItemValue: m,
      listOrdered: a(dt, d),
      listUnordered: a(dt),
      paragraph: a(at),
      reference: f,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: a(We),
      strong: a(zt),
      thematicBreak: a(Je)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: R,
      autolink: l(),
      autolinkEmail: Xe,
      autolinkProtocol: fe,
      blockQuote: l(),
      characterEscapeValue: D,
      characterReferenceMarkerHexadecimal: Y,
      characterReferenceMarkerNumeric: Y,
      characterReferenceValue: ae,
      characterReference: He,
      codeFenced: l(N),
      codeFencedFence: S,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: w,
      codeFlowValue: D,
      codeIndented: l(T),
      codeText: l(V),
      codeTextData: D,
      data: D,
      definition: l(),
      definitionDestinationString: M,
      definitionLabelString: O,
      definitionTitleString: _,
      emphasis: l(),
      hardBreakEscape: l(I),
      hardBreakTrailing: l(I),
      htmlFlow: l($),
      htmlFlowData: D,
      htmlText: l(Z),
      htmlTextData: D,
      image: l(X),
      label: Ae,
      labelText: ue,
      lineEnding: k,
      link: l(re),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: we,
      resourceDestinationString: g,
      resourceTitleString: ee,
      resource: de,
      setextHeading: l(B),
      setextHeadingLineSequence: L,
      setextHeadingText: y,
      strong: l(),
      thematicBreak: l()
    }
  };
  ya(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(E) {
    let v = {
      type: "root",
      children: []
    };
    const z = {
      stack: [v],
      tokenStack: [],
      config: t,
      enter: o,
      exit: c,
      buffer: s,
      resume: u,
      data: n
    }, j = [];
    let Q = -1;
    for (; ++Q < E.length; )
      if (E[Q][1].type === "listOrdered" || E[Q][1].type === "listUnordered")
        if (E[Q][0] === "enter")
          j.push(Q);
        else {
          const me = j.pop();
          Q = i(E, me, Q);
        }
    for (Q = -1; ++Q < E.length; ) {
      const me = t[E[Q][0]];
      Ca.call(me, E[Q][1].type) && me[E[Q][1].type].call(Object.assign({
        sliceSerialize: E[Q][2].sliceSerialize
      }, z), E[Q][1]);
    }
    if (z.tokenStack.length > 0) {
      const me = z.tokenStack[z.tokenStack.length - 1];
      (me[1] || di).call(z, void 0, me[0]);
    }
    for (v.position = {
      start: Tt(E.length > 0 ? E[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Tt(E.length > 0 ? E[E.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Q = -1; ++Q < t.transforms.length; )
      v = t.transforms[Q](v) || v;
    return v;
  }
  function i(E, v, z) {
    let j = v - 1, Q = -1, me = !1, Fe, Se, $e, ge;
    for (; ++j <= z; ) {
      const ce = E[j];
      switch (ce[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          ce[0] === "enter" ? Q++ : Q--, ge = void 0;
          break;
        }
        case "lineEndingBlank": {
          ce[0] === "enter" && (Fe && !ge && !Q && !$e && ($e = j), ge = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          ge = void 0;
      }
      if (!Q && ce[0] === "enter" && ce[1].type === "listItemPrefix" || Q === -1 && ce[0] === "exit" && (ce[1].type === "listUnordered" || ce[1].type === "listOrdered")) {
        if (Fe) {
          let je = j;
          for (Se = void 0; je--; ) {
            const Ie = E[je];
            if (Ie[1].type === "lineEnding" || Ie[1].type === "lineEndingBlank") {
              if (Ie[0] === "exit") continue;
              Se && (E[Se][1].type = "lineEndingBlank", me = !0), Ie[1].type = "lineEnding", Se = je;
            } else if (!(Ie[1].type === "linePrefix" || Ie[1].type === "blockQuotePrefix" || Ie[1].type === "blockQuotePrefixWhitespace" || Ie[1].type === "blockQuoteMarker" || Ie[1].type === "listItemIndent")) break;
          }
          $e && (!Se || $e < Se) && (Fe._spread = !0), Fe.end = Object.assign({}, Se ? E[Se][1].start : ce[1].end), E.splice(Se || j, 0, ["exit", Fe, ce[2]]), j++, z++;
        }
        if (ce[1].type === "listItemPrefix") {
          const je = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, ce[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Fe = je, E.splice(j, 0, ["enter", je, ce[2]]), j++, z++, $e = void 0, ge = !0;
        }
      }
    }
    return E[v][1]._spread = me, z;
  }
  function a(E, v) {
    return z;
    function z(j) {
      o.call(this, E(j), j), v && v.call(this, j);
    }
  }
  function s() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function o(E, v, z) {
    this.stack[this.stack.length - 1].children.push(E), this.stack.push(E), this.tokenStack.push([v, z || void 0]), E.position = {
      start: Tt(v.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function l(E) {
    return v;
    function v(z) {
      E && E.call(this, z), c.call(this, z);
    }
  }
  function c(E, v) {
    const z = this.stack.pop(), j = this.tokenStack.pop();
    if (j)
      j[0].type !== E.type && (v ? v.call(this, E, j[0]) : (j[1] || di).call(this, E, j[0]));
    else throw new Error("Cannot close `" + E.type + "` (" + Kt({
      start: E.start,
      end: E.end
    }) + "): it’s not open");
    z.position.end = Tt(E.end);
  }
  function u() {
    return dl(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(E) {
    if (this.data.expectingFirstListItemValue) {
      const v = this.stack[this.stack.length - 2];
      v.start = Number.parseInt(this.sliceSerialize(E), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const E = this.resume(), v = this.stack[this.stack.length - 1];
    v.lang = E;
  }
  function w() {
    const E = this.resume(), v = this.stack[this.stack.length - 1];
    v.meta = E;
  }
  function S() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function N() {
    const E = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function T() {
    const E = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = E.replace(/(\r?\n|\r)$/g, "");
  }
  function O(E) {
    const v = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = v, z.identifier = Ht(this.sliceSerialize(E)).toLowerCase();
  }
  function _() {
    const E = this.resume(), v = this.stack[this.stack.length - 1];
    v.title = E;
  }
  function M() {
    const E = this.resume(), v = this.stack[this.stack.length - 1];
    v.url = E;
  }
  function R(E) {
    const v = this.stack[this.stack.length - 1];
    if (!v.depth) {
      const z = this.sliceSerialize(E).length;
      v.depth = z;
    }
  }
  function y() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function L(E) {
    const v = this.stack[this.stack.length - 1];
    v.depth = this.sliceSerialize(E).codePointAt(0) === 61 ? 1 : 2;
  }
  function B() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function H(E) {
    const z = this.stack[this.stack.length - 1].children;
    let j = z[z.length - 1];
    (!j || j.type !== "text") && (j = ft(), j.position = {
      start: Tt(E.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, z.push(j)), this.stack.push(j);
  }
  function D(E) {
    const v = this.stack.pop();
    v.value += this.sliceSerialize(E), v.position.end = Tt(E.end);
  }
  function k(E) {
    const v = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const z = v.children[v.children.length - 1];
      z.position.end = Tt(E.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(v.type) && (H.call(this, E), D.call(this, E));
  }
  function I() {
    this.data.atHardBreak = !0;
  }
  function $() {
    const E = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = E;
  }
  function Z() {
    const E = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = E;
  }
  function V() {
    const E = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = E;
  }
  function re() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const v = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = v, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function X() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const v = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = v, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function ue(E) {
    const v = this.sliceSerialize(E), z = this.stack[this.stack.length - 2];
    z.label = pu(v), z.identifier = Ht(v).toLowerCase();
  }
  function Ae() {
    const E = this.stack[this.stack.length - 1], v = this.resume(), z = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, z.type === "link") {
      const j = E.children;
      z.children = j;
    } else
      z.alt = v;
  }
  function g() {
    const E = this.resume(), v = this.stack[this.stack.length - 1];
    v.url = E;
  }
  function ee() {
    const E = this.resume(), v = this.stack[this.stack.length - 1];
    v.title = E;
  }
  function de() {
    this.data.inReference = void 0;
  }
  function f() {
    this.data.referenceType = "collapsed";
  }
  function we(E) {
    const v = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = v, z.identifier = Ht(this.sliceSerialize(E)).toLowerCase(), this.data.referenceType = "full";
  }
  function Y(E) {
    this.data.characterReferenceType = E.type;
  }
  function ae(E) {
    const v = this.sliceSerialize(E), z = this.data.characterReferenceType;
    let j;
    z ? (j = oa(v, z === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : j = dr(v);
    const Q = this.stack[this.stack.length - 1];
    Q.value += j;
  }
  function He(E) {
    const v = this.stack.pop();
    v.position.end = Tt(E.end);
  }
  function fe(E) {
    D.call(this, E);
    const v = this.stack[this.stack.length - 1];
    v.url = this.sliceSerialize(E);
  }
  function Xe(E) {
    D.call(this, E);
    const v = this.stack[this.stack.length - 1];
    v.url = "mailto:" + this.sliceSerialize(E);
  }
  function Ue() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function ht() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Rt() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Ye() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function wt() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function We() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function rt() {
    return {
      type: "break"
    };
  }
  function pt() {
    return {
      type: "html",
      value: ""
    };
  }
  function it() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Qe() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function dt(E) {
    return {
      type: "list",
      ordered: E.type === "listOrdered",
      start: null,
      spread: E._spread,
      children: []
    };
  }
  function Et(E) {
    return {
      type: "listItem",
      spread: E._spread,
      checked: null,
      children: []
    };
  }
  function at() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function zt() {
    return {
      type: "strong",
      children: []
    };
  }
  function ft() {
    return {
      type: "text",
      value: ""
    };
  }
  function Je() {
    return {
      type: "thematicBreak"
    };
  }
}
function Tt(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function ya(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? ya(e, r) : gu(e, r);
  }
}
function gu(e, t) {
  let n;
  for (n in t)
    if (Ca.call(t, n))
      switch (n) {
        case "canContainEols": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "transforms": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = t[n];
          r && Object.assign(e[n], r);
          break;
        }
      }
}
function di(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Kt({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Kt({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Kt({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function Cu(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return fu(r, {
      ...t.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: t.data("micromarkExtensions") || [],
      mdastExtensions: t.data("fromMarkdownExtensions") || []
    });
  }
}
function yu(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function wu(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function Eu(e, t) {
  const n = t.value ? t.value + `
` : "", r = {};
  t.lang && (r.className = ["language-" + t.lang]);
  let i = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: n }]
  };
  return t.meta && (i.data = { meta: t.meta }), e.patch(t, i), i = e.applyData(t, i), i = { type: "element", tagName: "pre", properties: {}, children: [i] }, e.patch(t, i), i;
}
function Su(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Tu(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function _u(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Ft(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
  let s, o = e.footnoteCounts.get(r);
  o === void 0 ? (o = 0, e.footnoteOrder.push(r), s = e.footnoteOrder.length) : s = a + 1, o += 1, e.footnoteCounts.set(r, o);
  const l = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (o > 1 ? "-" + o : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(s) }]
  };
  e.patch(t, l);
  const c = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [l]
  };
  return e.patch(t, c), e.applyData(t, c);
}
function ku(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function xu(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function wa(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return s && s.type === "text" ? s.value += r : i.push({ type: "text", value: r }), i;
}
function bu(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return wa(e, t);
  const i = { src: Ft(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function vu(e, t) {
  const n = { src: Ft(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function Au(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [n]
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Iu(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return wa(e, t);
  const i = { href: Ft(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function Ru(e, t) {
  const n = { href: Ft(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Nu(e, t, n) {
  const r = e.all(t), i = n ? Mu(n) : Ea(t), a = {}, s = [];
  if (typeof t.checked == "boolean") {
    const u = r[0];
    let d;
    u && u.type === "element" && u.tagName === "p" ? d = u : (d = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(d)), d.children.length > 0 && d.children.unshift({ type: "text", value: " " }), d.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), a.className = ["task-list-item"];
  }
  let o = -1;
  for (; ++o < r.length; ) {
    const u = r[o];
    (i || o !== 0 || u.type !== "element" || u.tagName !== "p") && s.push({ type: "text", value: `
` }), u.type === "element" && u.tagName === "p" && !i ? s.push(...u.children) : s.push(u);
  }
  const l = r[r.length - 1];
  l && (i || l.type !== "element" || l.tagName !== "p") && s.push({ type: "text", value: `
` });
  const c = { type: "element", tagName: "li", properties: a, children: s };
  return e.patch(t, c), e.applyData(t, c);
}
function Mu(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = Ea(n[r]);
  }
  return t;
}
function Ea(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function Lu(e, t) {
  const n = {}, r = e.all(t);
  let i = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length; ) {
    const s = r[i];
    if (s.type === "element" && s.tagName === "li" && s.properties && Array.isArray(s.properties.className) && s.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const a = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(r, !0)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function Ou(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Du(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Pu(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Hu(e, t) {
  const n = e.all(t), r = n.shift(), i = [];
  if (r) {
    const s = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(t.children[0], s), i.push(s);
  }
  if (n.length > 0) {
    const s = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(n, !0)
    }, o = cr(t.children[1]), l = ea(t.children[t.children.length - 1]);
    o && l && (s.position = { start: o, end: l }), i.push(s);
  }
  const a = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function Uu(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", s = n && n.type === "table" ? n.align : void 0, o = s ? s.length : t.children.length;
  let l = -1;
  const c = [];
  for (; ++l < o; ) {
    const d = t.children[l], m = {}, p = s ? s[l] : void 0;
    p && (m.align = p);
    let w = { type: "element", tagName: a, properties: m, children: [] };
    d && (w.children = e.all(d), e.patch(d, w), w = e.applyData(d, w)), c.push(w);
  }
  const u = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(c, !0)
  };
  return e.patch(t, u), e.applyData(t, u);
}
function Fu(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const fi = 9, mi = 32;
function zu(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const a = [];
  for (; r; )
    a.push(
      gi(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return a.push(gi(t.slice(i), i > 0, !1)), a.join("");
}
function gi(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let a = e.codePointAt(r);
    for (; a === fi || a === mi; )
      r++, a = e.codePointAt(r);
  }
  if (n) {
    let a = e.codePointAt(i - 1);
    for (; a === fi || a === mi; )
      i--, a = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function Bu(e, t) {
  const n = { type: "text", value: zu(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Gu(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Vu = {
  blockquote: yu,
  break: wu,
  code: Eu,
  delete: Su,
  emphasis: Tu,
  footnoteReference: _u,
  heading: ku,
  html: xu,
  imageReference: bu,
  image: vu,
  inlineCode: Au,
  linkReference: Iu,
  link: Ru,
  listItem: Nu,
  list: Lu,
  paragraph: Ou,
  // @ts-expect-error: root is different, but hard to type.
  root: Du,
  strong: Pu,
  table: Hu,
  tableCell: Fu,
  tableRow: Uu,
  text: Bu,
  thematicBreak: Gu,
  toml: sn,
  yaml: sn,
  definition: sn,
  footnoteDefinition: sn
};
function sn() {
}
const Sa = -1, En = 0, Yt = 1, gn = 2, gr = 3, Cr = 4, yr = 5, wr = 6, Ta = 7, _a = 8, Ci = typeof self == "object" ? self : globalThis, Wu = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, s] = t[i];
    switch (a) {
      case En:
      case Sa:
        return n(s, i);
      case Yt: {
        const o = n([], i);
        for (const l of s)
          o.push(r(l));
        return o;
      }
      case gn: {
        const o = n({}, i);
        for (const [l, c] of s)
          o[r(l)] = r(c);
        return o;
      }
      case gr:
        return n(new Date(s), i);
      case Cr: {
        const { source: o, flags: l } = s;
        return n(new RegExp(o, l), i);
      }
      case yr: {
        const o = n(/* @__PURE__ */ new Map(), i);
        for (const [l, c] of s)
          o.set(r(l), r(c));
        return o;
      }
      case wr: {
        const o = n(/* @__PURE__ */ new Set(), i);
        for (const l of s)
          o.add(r(l));
        return o;
      }
      case Ta: {
        const { name: o, message: l } = s;
        return n(new Ci[o](l), i);
      }
      case _a:
        return n(BigInt(s), i);
      case "BigInt":
        return n(Object(BigInt(s)), i);
      case "ArrayBuffer":
        return n(new Uint8Array(s).buffer, s);
      case "DataView": {
        const { buffer: o } = new Uint8Array(s);
        return n(new DataView(o), s);
      }
    }
    return n(new Ci[a](s), i);
  };
  return r;
}, yi = (e) => Wu(/* @__PURE__ */ new Map(), e)(0), Lt = "", { toString: $u } = {}, { keys: ju } = Object, qt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [En, t];
  const n = $u.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [Yt, Lt];
    case "Object":
      return [gn, Lt];
    case "Date":
      return [gr, Lt];
    case "RegExp":
      return [Cr, Lt];
    case "Map":
      return [yr, Lt];
    case "Set":
      return [wr, Lt];
    case "DataView":
      return [Yt, n];
  }
  return n.includes("Array") ? [Yt, n] : n.includes("Error") ? [Ta, n] : [gn, n];
}, on = ([e, t]) => e === En && (t === "function" || t === "symbol"), Zu = (e, t, n, r) => {
  const i = (s, o) => {
    const l = r.push(s) - 1;
    return n.set(o, l), l;
  }, a = (s) => {
    if (n.has(s))
      return n.get(s);
    let [o, l] = qt(s);
    switch (o) {
      case En: {
        let u = s;
        switch (l) {
          case "bigint":
            o = _a, u = s.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + l);
            u = null;
            break;
          case "undefined":
            return i([Sa], s);
        }
        return i([o, u], s);
      }
      case Yt: {
        if (l) {
          let m = s;
          return l === "DataView" ? m = new Uint8Array(s.buffer) : l === "ArrayBuffer" && (m = new Uint8Array(s)), i([l, [...m]], s);
        }
        const u = [], d = i([o, u], s);
        for (const m of s)
          u.push(a(m));
        return d;
      }
      case gn: {
        if (l)
          switch (l) {
            case "BigInt":
              return i([l, s.toString()], s);
            case "Boolean":
            case "Number":
            case "String":
              return i([l, s.valueOf()], s);
          }
        if (t && "toJSON" in s)
          return a(s.toJSON());
        const u = [], d = i([o, u], s);
        for (const m of ju(s))
          (e || !on(qt(s[m]))) && u.push([a(m), a(s[m])]);
        return d;
      }
      case gr:
        return i([o, s.toISOString()], s);
      case Cr: {
        const { source: u, flags: d } = s;
        return i([o, { source: u, flags: d }], s);
      }
      case yr: {
        const u = [], d = i([o, u], s);
        for (const [m, p] of s)
          (e || !(on(qt(m)) || on(qt(p)))) && u.push([a(m), a(p)]);
        return d;
      }
      case wr: {
        const u = [], d = i([o, u], s);
        for (const m of s)
          (e || !on(qt(m))) && u.push(a(m));
        return d;
      }
    }
    const { message: c } = s;
    return i([o, { name: l, message: c }], s);
  };
  return a;
}, wi = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return Zu(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, Cn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? yi(wi(e, t)) : structuredClone(e)
) : (e, t) => yi(wi(e, t));
function qu(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function Ku(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function Xu(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || qu, r = e.options.footnoteBackLabel || Ku, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", s = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let l = -1;
  for (; ++l < e.footnoteOrder.length; ) {
    const c = e.footnoteById.get(
      e.footnoteOrder[l]
    );
    if (!c)
      continue;
    const u = e.all(c), d = String(c.identifier).toUpperCase(), m = Ft(d.toLowerCase());
    let p = 0;
    const w = [], S = e.footnoteCounts.get(d);
    for (; S !== void 0 && ++p <= S; ) {
      w.length > 0 && w.push({ type: "text", value: " " });
      let O = typeof n == "string" ? n : n(l, p);
      typeof O == "string" && (O = { type: "text", value: O }), w.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + m + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(l, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(O) ? O : [O]
      });
    }
    const N = u[u.length - 1];
    if (N && N.type === "element" && N.tagName === "p") {
      const O = N.children[N.children.length - 1];
      O && O.type === "text" ? O.value += " " : N.children.push({ type: "text", value: " " }), N.children.push(...w);
    } else
      u.push(...w);
    const T = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + m },
      children: e.wrap(u, !0)
    };
    e.patch(c, T), o.push(T);
  }
  if (o.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: a,
          properties: {
            ...Cn(s),
            id: "footnote-label"
          },
          children: [{ type: "text", value: i }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(o, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const ka = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(e) {
    if (e == null)
      return e1;
    if (typeof e == "function")
      return Sn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Yu(e) : Qu(e);
    if (typeof e == "string")
      return Ju(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function Yu(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = ka(e[n]);
  return Sn(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function Qu(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Sn(n);
  function n(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let a;
    for (a in e)
      if (i[a] !== t[a]) return !1;
    return !0;
  }
}
function Ju(e) {
  return Sn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Sn(e) {
  return t;
  function t(n, r, i) {
    return !!(t1(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function e1() {
  return !0;
}
function t1(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const xa = [], n1 = !0, Ei = !1, r1 = "skip";
function i1(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = ka(i), s = r ? -1 : 1;
  o(e, void 0, [])();
  function o(l, c, u) {
    const d = (
      /** @type {Record<string, unknown>} */
      l && typeof l == "object" ? l : {}
    );
    if (typeof d.type == "string") {
      const p = (
        // `hast`
        typeof d.tagName == "string" ? d.tagName : (
          // `xast`
          typeof d.name == "string" ? d.name : void 0
        )
      );
      Object.defineProperty(m, "name", {
        value: "node (" + (l.type + (p ? "<" + p + ">" : "")) + ")"
      });
    }
    return m;
    function m() {
      let p = xa, w, S, N;
      if ((!t || a(l, c, u[u.length - 1] || void 0)) && (p = a1(n(l, u)), p[0] === Ei))
        return p;
      if ("children" in l && l.children) {
        const T = (
          /** @type {UnistParent} */
          l
        );
        if (T.children && p[0] !== r1)
          for (S = (r ? T.children.length : -1) + s, N = u.concat(T); S > -1 && S < T.children.length; ) {
            const O = T.children[S];
            if (w = o(O, S, N)(), w[0] === Ei)
              return w;
            S = typeof w[1] == "number" ? w[1] : S + s;
          }
      }
      return p;
    }
  }
}
function a1(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [n1, e] : e == null ? xa : [e];
}
function ba(e, t, n, r) {
  let i, a, s;
  typeof t == "function" && typeof n != "function" ? (a = void 0, s = t, i = n) : (a = t, s = n, i = r), i1(e, a, o, i);
  function o(l, c) {
    const u = c[c.length - 1], d = u ? u.children.indexOf(l) : void 0;
    return s(l, d, u);
  }
}
const tr = {}.hasOwnProperty, s1 = {};
function o1(e, t) {
  const n = t || s1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = { ...Vu, ...n.handlers }, o = {
    all: c,
    applyData: c1,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: s,
    one: l,
    options: n,
    patch: l1,
    wrap: h1
  };
  return ba(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const d = u.type === "definition" ? r : i, m = String(u.identifier).toUpperCase();
      d.has(m) || d.set(m, u);
    }
  }), o;
  function l(u, d) {
    const m = u.type, p = o.handlers[m];
    if (tr.call(o.handlers, m) && p)
      return p(o, u, d);
    if (o.options.passThrough && o.options.passThrough.includes(m)) {
      if ("children" in u) {
        const { children: S, ...N } = u, T = Cn(N);
        return T.children = o.all(u), T;
      }
      return Cn(u);
    }
    return (o.options.unknownHandler || u1)(o, u, d);
  }
  function c(u) {
    const d = [];
    if ("children" in u) {
      const m = u.children;
      let p = -1;
      for (; ++p < m.length; ) {
        const w = o.one(m[p], u);
        if (w) {
          if (p && m[p - 1].type === "break" && (!Array.isArray(w) && w.type === "text" && (w.value = Si(w.value)), !Array.isArray(w) && w.type === "element")) {
            const S = w.children[0];
            S && S.type === "text" && (S.value = Si(S.value));
          }
          Array.isArray(w) ? d.push(...w) : d.push(w);
        }
      }
    }
    return d;
  }
}
function l1(e, t) {
  e.position && (t.position = $o(e));
}
function c1(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, a = e.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element")
        n.tagName = r;
      else {
        const s = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: s };
      }
    n.type === "element" && a && Object.assign(n.properties, Cn(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function u1(e, t) {
  const n = t.data || {}, r = "value" in t && !(tr.call(n, "hProperties") || tr.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function h1(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Si(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function Ti(e, t) {
  const n = o1(e, t), r = n.one(e, void 0), i = Xu(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function p1(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      Ti(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      Ti(n, { file: r, ...e || t })
    );
  };
}
function _i(e) {
  if (e)
    throw e;
}
var pn = Object.prototype.hasOwnProperty, va = Object.prototype.toString, ki = Object.defineProperty, xi = Object.getOwnPropertyDescriptor, bi = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : va.call(t) === "[object Array]";
}, vi = function(t) {
  if (!t || va.call(t) !== "[object Object]")
    return !1;
  var n = pn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && pn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || pn.call(t, i);
}, Ai = function(t, n) {
  ki && n.name === "__proto__" ? ki(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, Ii = function(t, n) {
  if (n === "__proto__")
    if (pn.call(t, n)) {
      if (xi)
        return xi(t, n).value;
    } else return;
  return t[n];
}, d1 = function e() {
  var t, n, r, i, a, s, o = arguments[0], l = 1, c = arguments.length, u = !1;
  for (typeof o == "boolean" && (u = o, o = arguments[1] || {}, l = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); l < c; ++l)
    if (t = arguments[l], t != null)
      for (n in t)
        r = Ii(o, n), i = Ii(t, n), o !== i && (u && i && (vi(i) || (a = bi(i))) ? (a ? (a = !1, s = r && bi(r) ? r : []) : s = r && vi(r) ? r : {}, Ai(o, { name: n, newValue: e(u, s, i) })) : typeof i < "u" && Ai(o, { name: n, newValue: i }));
  return o;
};
const Dn = /* @__PURE__ */ Ji(d1);
function nr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function f1() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let a = -1;
    const s = i.pop();
    if (typeof s != "function")
      throw new TypeError("Expected function as last argument, not " + s);
    o(null, ...i);
    function o(l, ...c) {
      const u = e[++a];
      let d = -1;
      if (l) {
        s(l);
        return;
      }
      for (; ++d < i.length; )
        (c[d] === null || c[d] === void 0) && (c[d] = i[d]);
      i = c, u ? m1(u, o)(...c) : s(null, ...c);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), t;
  }
}
function m1(e, t) {
  let n;
  return r;
  function r(...s) {
    const o = e.length > s.length;
    let l;
    o && s.push(i);
    try {
      l = e.apply(this, s);
    } catch (c) {
      const u = (
        /** @type {Error} */
        c
      );
      if (o && n)
        throw u;
      return i(u);
    }
    o || (l && l.then && typeof l.then == "function" ? l.then(a, i) : l instanceof Error ? i(l) : a(l));
  }
  function i(s, ...o) {
    n || (n = !0, t(s, ...o));
  }
  function a(s) {
    i(null, s);
  }
}
const ot = { basename: g1, dirname: C1, extname: y1, join: w1, sep: "/" };
function g1(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  tn(e);
  let n = 0, r = -1, i = e.length, a;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (a) {
          n = i + 1;
          break;
        }
      } else r < 0 && (a = !0, r = i + 1);
    return r < 0 ? "" : e.slice(n, r);
  }
  if (t === e)
    return "";
  let s = -1, o = t.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (a) {
        n = i + 1;
        break;
      }
    } else
      s < 0 && (a = !0, s = i + 1), o > -1 && (e.codePointAt(i) === t.codePointAt(o--) ? o < 0 && (r = i) : (o = -1, r = s));
  return n === r ? r = s : r < 0 && (r = e.length), e.slice(n, r);
}
function C1(e) {
  if (tn(e), e.length === 0)
    return ".";
  let t = -1, n = e.length, r;
  for (; --n; )
    if (e.codePointAt(n) === 47) {
      if (r) {
        t = n;
        break;
      }
    } else r || (r = !0);
  return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function y1(e) {
  tn(e);
  let t = e.length, n = -1, r = 0, i = -1, a = 0, s;
  for (; t--; ) {
    const o = e.codePointAt(t);
    if (o === 47) {
      if (s) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (s = !0, n = t + 1), o === 46 ? i < 0 ? i = t : a !== 1 && (a = 1) : i > -1 && (a = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  a === 0 || // The (right-most) trimmed path component is exactly `..`.
  a === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function w1(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    tn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : E1(n);
}
function E1(e) {
  tn(e);
  const t = e.codePointAt(0) === 47;
  let n = S1(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function S1(e, t) {
  let n = "", r = 0, i = -1, a = 0, s = -1, o, l;
  for (; ++s <= e.length; ) {
    if (s < e.length)
      o = e.codePointAt(s);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(i === s - 1 || a === 1)) if (i !== s - 1 && a === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (l = n.lastIndexOf("/"), l !== n.length - 1) {
              l < 0 ? (n = "", r = 0) : (n = n.slice(0, l), r = n.length - 1 - n.lastIndexOf("/")), i = s, a = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = s, a = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + e.slice(i + 1, s) : n = e.slice(i + 1, s), r = s - i - 1;
      i = s, a = 0;
    } else o === 46 && a > -1 ? a++ : a = -1;
  }
  return n;
}
function tn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const T1 = { cwd: _1 };
function _1() {
  return "/";
}
function rr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function k1(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!rr(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return x1(e);
}
function x1(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const t = e.pathname;
  let n = -1;
  for (; ++n < t.length; )
    if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
      const r = t.codePointAt(n + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(t);
}
const Pn = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class Aa {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(t) {
    let n;
    t ? rr(t) ? n = { path: t } : typeof t == "string" || b1(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : T1.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Pn.length; ) {
      const a = Pn[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      Pn.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? ot.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(t) {
    Un(t, "basename"), Hn(t, "basename"), this.path = ot.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? ot.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(t) {
    Ri(this.basename, "dirname"), this.path = ot.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? ot.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(t) {
    if (Hn(t, "extname"), Ri(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ot.join(this.dirname, this.stem + (t || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(t) {
    rr(t) && (t = k1(t)), Un(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? ot.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(t) {
    Un(t, "stem"), Hn(t, "stem"), this.path = ot.join(this.dirname || "", t + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(t, n, r) {
    const i = this.message(t, n, r);
    throw i.fatal = !0, i;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(t, n, r) {
    const i = this.message(t, n, r);
    return i.fatal = void 0, i;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(t, n, r) {
    const i = new ke(
      // @ts-expect-error: the overloads are fine.
      t,
      n,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(t) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(t || void 0).decode(this.value);
  }
}
function Hn(e, t) {
  if (e && e.includes(ot.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ot.sep + "`"
    );
}
function Un(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function Ri(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function b1(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const v1 = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(e) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[e], a = function() {
      return i.apply(a, arguments);
    };
    return Object.setPrototypeOf(a, r), a;
  }
), A1 = {}.hasOwnProperty;
class Er extends v1 {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = f1();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const t = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new Er()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Dn(!0, {}, this.namespace)), t;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(t, n) {
    return typeof t == "string" ? arguments.length === 2 ? (Bn("data", this.frozen), this.namespace[t] = n, this) : A1.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Bn("data", this.frozen), this.namespace = t, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const t = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = n.call(t, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(t) {
    this.freeze();
    const n = ln(t), r = this.parser || this.Parser;
    return Fn("parse", r), r(String(n), n);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(t, n) {
    const r = this;
    return this.freeze(), Fn("process", this.parser || this.Parser), zn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, s) {
      const o = ln(t), l = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(o)
      );
      r.run(l, o, function(u, d, m) {
        if (u || !d || !m)
          return c(u);
        const p = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          d
        ), w = r.stringify(p, m);
        N1(w) ? m.value = w : m.result = w, c(
          u,
          /** @type {VFileWithOutput<CompileResult>} */
          m
        );
      });
      function c(u, d) {
        u || !d ? s(u) : a ? a(d) : n(void 0, d);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(t) {
    let n = !1, r;
    return this.freeze(), Fn("processSync", this.parser || this.Parser), zn("processSync", this.compiler || this.Compiler), this.process(t, i), Mi("processSync", "process", n), r;
    function i(a, s) {
      n = !0, _i(a), r = s;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(t, n, r) {
    Ni(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(s, o) {
      const l = ln(n);
      i.run(t, l, c);
      function c(u, d, m) {
        const p = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          d || t
        );
        u ? o(u) : s ? s(p) : r(void 0, p, m);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(t, n) {
    let r = !1, i;
    return this.run(t, n, a), Mi("runSync", "run", r), i;
    function a(s, o) {
      _i(s), i = o, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(t, n) {
    this.freeze();
    const r = ln(n), i = this.compiler || this.Compiler;
    return zn("stringify", i), Ni(t), i(t, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(t, ...n) {
    const r = this.attachers, i = this.namespace;
    if (Bn("use", this.frozen), t != null) if (typeof t == "function")
      l(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? o(t) : s(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function a(c) {
      if (typeof c == "function")
        l(c, []);
      else if (typeof c == "object")
        if (Array.isArray(c)) {
          const [u, ...d] = (
            /** @type {PluginTuple<Array<unknown>>} */
            c
          );
          l(u, d);
        } else
          s(c);
      else
        throw new TypeError("Expected usable value, not `" + c + "`");
    }
    function s(c) {
      if (!("plugins" in c) && !("settings" in c))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      o(c.plugins), c.settings && (i.settings = Dn(!0, i.settings, c.settings));
    }
    function o(c) {
      let u = -1;
      if (c != null) if (Array.isArray(c))
        for (; ++u < c.length; ) {
          const d = c[u];
          a(d);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + c + "`");
    }
    function l(c, u) {
      let d = -1, m = -1;
      for (; ++d < r.length; )
        if (r[d][0] === c) {
          m = d;
          break;
        }
      if (m === -1)
        r.push([c, ...u]);
      else if (u.length > 0) {
        let [p, ...w] = u;
        const S = r[m][1];
        nr(S) && nr(p) && (p = Dn(!0, S, p)), r[m] = [c, p, ...w];
      }
    }
  }
}
const I1 = new Er().freeze();
function Fn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function zn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Bn(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Ni(e) {
  if (!nr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Mi(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function ln(e) {
  return R1(e) ? e : new Aa(e);
}
function R1(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function N1(e) {
  return typeof e == "string" || M1(e);
}
function M1(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const L1 = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Li = [], Oi = { allowDangerousHtml: !0 }, O1 = /^(https?|ircs?|mailto|xmpp)$/i, D1 = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  { from: "className", id: "remove-classname" },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function Di(e) {
  const t = P1(e), n = H1(e);
  return U1(t.runSync(t.parse(n), n), e);
}
function P1(e) {
  const t = e.rehypePlugins || Li, n = e.remarkPlugins || Li, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Oi } : Oi;
  return I1().use(Cu).use(n).use(p1, r).use(t);
}
function H1(e) {
  const t = e.children || "", n = new Aa();
  return typeof t == "string" && (n.value = t), n;
}
function U1(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, s = t.skipHtml, o = t.unwrapDisallowed, l = t.urlTransform || F1;
  for (const u of D1)
    Object.hasOwn(t, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + L1 + u.id, void 0);
  return ba(e, c), Xo(e, {
    Fragment: Jt,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: h,
    jsxs: A,
    passKeys: !0,
    passNode: !0
  });
  function c(u, d, m) {
    if (u.type === "raw" && m && typeof d == "number")
      return s ? m.children.splice(d, 1) : m.children[d] = { type: "text", value: u.value }, d;
    if (u.type === "element") {
      let p;
      for (p in Mn)
        if (Object.hasOwn(Mn, p) && Object.hasOwn(u.properties, p)) {
          const w = u.properties[p], S = Mn[p];
          (S === null || S.includes(u.tagName)) && (u.properties[p] = l(String(w || ""), p, u));
        }
    }
    if (u.type === "element") {
      let p = n ? !n.includes(u.tagName) : a ? a.includes(u.tagName) : !1;
      if (!p && r && typeof d == "number" && (p = !r(u, d, m)), p && m && typeof d == "number")
        return o && u.children ? m.children.splice(d, 1, ...u.children) : m.children.splice(d, 1), d;
    }
  }
}
function F1(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    O1.test(e.slice(0, t)) ? e : ""
  );
}
function z1({ children: e, isStreaming: t }) {
  const [n, r] = J(!0), [i, a] = J(!1);
  Ot.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const s = () => {
    t || r(!n);
  }, o = Ot.Children.map(e, (l) => {
    if (Ot.isValidElement(l)) {
      if (l.type === Ia)
        return Ot.cloneElement(
          l,
          {
            onToggle: s,
            isExpanded: n
          }
        );
      if (l.type === Ra)
        return Ot.cloneElement(
          l,
          {
            isVisible: n
          }
        );
    }
    return l;
  });
  return /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning", children: o });
}
function Ia({
  title: e,
  status: t = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const a = () => /* @__PURE__ */ A(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ h(
          "mask",
          {
            id: "mask0_64_36210",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "16",
            height: "16",
            children: /* @__PURE__ */ h("rect", { width: "16", height: "16", fill: "#D9D9D9" })
          }
        ),
        /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36210)", children: /* @__PURE__ */ h(
          "path",
          {
            d: "M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z",
            fill: "#637381"
          }
        ) })
      ]
    }
  ), s = t === "completed" || e.includes(G.UI_TEXT.THINKING) || e.includes(G.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ A(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${s ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: s ? r : void 0,
      style: { cursor: s ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ A("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ h("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        s && /* @__PURE__ */ h(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ A(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ h(
                    "mask",
                    {
                      id: "mask0_44_18068",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ h("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ h("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ h(
                    "path",
                    {
                      d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function Ra({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function B1({ children: e }) {
  return /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function G1({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var l, c;
  const a = () => {
    if (!r || !i) return null;
    const u = i.find((d) => d.name === r);
    return (u == null ? void 0 : u.description) || null;
  };
  let s;
  if (r != null && r.startsWith("lat_")) {
    const u = (l = n == null ? void 0 : n.parameters) == null ? void 0 : l.query, d = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.url;
    s = u || d || "Executing tool...";
  } else
    s = a();
  return s && (s.startsWith("http://") || s.startsWith("https://") || (s = s.charAt(0).toUpperCase() + s.slice(1))), /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ A("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ h("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ h("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ h("span", { children: s }),
          /* @__PURE__ */ A("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ h(
                    "mask",
                    {
                      id: "mask0_64_36278",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ h(
                        "rect",
                        {
                          y: "0.381836",
                          width: "16",
                          height: "16",
                          fill: "#D9D9D9"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ h(
                    "path",
                    {
                      d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ h("span", { children: "Running..." })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ A("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ h("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ h("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ h("span", { children: s }),
          /* @__PURE__ */ A("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ h(
                    "mask",
                    {
                      id: "mask0_64_36345",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ h(
                        "rect",
                        {
                          y: "0.381836",
                          width: "16",
                          height: "16",
                          fill: "#D9D9D9"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36345)", children: /* @__PURE__ */ h(
                    "path",
                    {
                      d: "M7.1501 10.7819L11.1168 6.83193L10.2668 5.98193L7.1501 9.08193L5.73343 7.68193L4.88343 8.53193L7.1501 10.7819ZM8.0001 14.7819C7.12232 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.643 2.1001 10.8653C1.76676 10.0875 1.6001 9.25971 1.6001 8.38193C1.6001 7.49304 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73899 2.81527 5.51676 2.48193C6.29454 2.1486 7.12232 1.98193 8.0001 1.98193C8.88899 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11805 13.9001 5.89027C14.2334 6.66249 14.4001 7.49304 14.4001 8.38193C14.4001 9.25971 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.264 13.9486 10.4918 14.2819C9.71954 14.6153 8.88899 14.7819 8.0001 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819Z",
                      fill: "#4EAD13"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ h("span", { children: "Completed" })
          ] })
        ] });
      case "error":
        return /* @__PURE__ */ A("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ h(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ h(
                "path",
                {
                  d: "M18 6L6 18M6 6L18 18",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          ) }),
          /* @__PURE__ */ h("span", { className: "chat-wrapper__tooling-handle-title", children: e })
        ] });
      default:
        return /* @__PURE__ */ A("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ h("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ h("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ A("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ h(
                      "rect",
                      {
                        y: "0.000488281",
                        width: "16",
                        height: "16",
                        fill: "#D9D9D9"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ h("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ h("span", { children: "Pending..." })
        ] });
    }
  })() });
}
function Na({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ A("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ h("span", {}),
    /* @__PURE__ */ h("span", {}),
    /* @__PURE__ */ h("span", {})
  ] }) : t === "pulse" ? /* @__PURE__ */ h(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ h(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: e, height: e }
    }
  );
}
const V1 = ({ message: e }) => {
  const [t, n] = J(!0);
  return /* @__PURE__ */ A("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ A(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!t),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          e.role === "system" ? /* @__PURE__ */ A("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
              "svg",
              {
                width: "20",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ h(
                    "mask",
                    {
                      id: "mask0_64_36257",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ h("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ h(
                    "path",
                    {
                      d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }),
            /* @__PURE__ */ h("span", { children: "AI text input <show-toolname>..." })
          ] }) : /* @__PURE__ */ h("span", { children: "System Message" }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              style: {
                transform: t ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease"
              },
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ h("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) })
        ]
      }
    ),
    t && /* @__PURE__ */ h("div", { className: "chat-wrapper__system-message-content", children: /* @__PURE__ */ h("span", { children: e.content }) })
  ] });
}, Ma = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ h("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code-block", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ h("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ h("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ h("li", { className: "chat-wrapper__list-item", ...t, children: e })
}, W1 = {
  ...Ma,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code", ...n, children: e })
}, La = Pi(
  ({
    message: e,
    getReasoningTitle: t,
    getReasoningStatus: n,
    getReasoningDuration: r,
    getReasoningContentOnly: i,
    getToolingTitle: a,
    getToolingStatus: s,
    clientTools: o,
    currentAssistantMessageIdRef: l
  }) => {
    const [c, u] = J(!1), [d, m] = J(!1), p = te(async () => {
      try {
        await navigator.clipboard.writeText(e.content), u(!0), setTimeout(() => u(!1), 2e3);
      } catch (R) {
        console.error("Failed to copy message:", R);
      }
    }, [e.content]), w = () => /* @__PURE__ */ A("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ h(Na, { size: 16, variant: "dots" }),
      /* @__PURE__ */ h("span", { children: G.UI_TEXT.THINKING })
    ] }), S = () => /* @__PURE__ */ A(Jt, { children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ h(
        "button",
        {
          className: `chat-wrapper__copy-button ${d ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: p,
          title: "Copy message",
          children: /* @__PURE__ */ h(Ys, {})
        }
      ) }),
      c && /* @__PURE__ */ h("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), N = () => /* @__PURE__ */ h("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ A("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(Di, { components: Ma, children: e.content }) }),
      S()
    ] }) }), T = () => /* @__PURE__ */ A("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(Di, { components: W1, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ h("div", { className: "chat-wrapper__media", children: e.media.map((R, y) => /* @__PURE__ */ h(
        "img",
        {
          src: R,
          alt: `Uploaded content ${y + 1}`,
          className: "chat-wrapper__media-image"
        },
        y
      )) })
    ] }), O = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === l.current ? w() : e.role === "system" ? /* @__PURE__ */ h(V1, { message: e }) : e.role === "assistant" ? N() : T(), _ = () => /* @__PURE__ */ A(z1, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ h(
        Ia,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ h(Ra, { children: i(e.content) })
    ] }), M = () => {
      var R;
      return /* @__PURE__ */ h(B1, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ h(
        G1,
        {
          title: a(e.content, e.isStreaming),
          status: s(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (R = e.toolData) == null ? void 0 : R.toolName,
          clientTools: o
        }
      ) });
    };
    return /* @__PURE__ */ h(
      "div",
      {
        className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
        onMouseEnter: () => e.role === "assistant" && m(!0),
        onMouseLeave: () => e.role === "assistant" && m(!1),
        children: e.role === "reasoning" ? _() : e.role === "tooling" ? M() : /* @__PURE__ */ h("div", { className: "chat-wrapper__message-content", children: O() })
      }
    );
  }
);
La.displayName = "MessageItem";
const $1 = ({ isVisible: e }) => e ? /* @__PURE__ */ h("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ A("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ h("span", {}),
  /* @__PURE__ */ h("span", {}),
  /* @__PURE__ */ h("span", {})
] }) }) }) }) : null, Oa = ar(({
  messages: e,
  isThinking: t,
  isHandlingTool: n,
  getReasoningTitle: r,
  getReasoningStatus: i,
  getReasoningDuration: a,
  getReasoningContentOnly: s,
  getToolingTitle: o,
  getToolingStatus: l,
  clientTools: c,
  currentAssistantMessageIdRef: u
}, d) => /* @__PURE__ */ A("div", { className: "chat-wrapper__messages", children: [
  e.map((m) => /* @__PURE__ */ h(
    La,
    {
      message: m,
      getReasoningTitle: r,
      getReasoningStatus: i,
      getReasoningDuration: a,
      getReasoningContentOnly: s,
      getToolingTitle: o,
      getToolingStatus: l,
      clientTools: c,
      currentAssistantMessageIdRef: u
    },
    m.id
  )),
  /* @__PURE__ */ h($1, { isVisible: t && !n }),
  /* @__PURE__ */ h("div", { ref: d })
] }));
Oa.displayName = "MessagesList";
const nt = (...e) => e.filter(Boolean).join(" "), j1 = () => /* @__PURE__ */ A(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ A("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ h(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ h("g", { clipPath: "url(#clip0_121_23927)", children: /* @__PURE__ */ h(
          "path",
          {
            d: "M16.3333 26.3541L18.2133 28.2341L25.6666 20.7941V37.0208H28.3333V20.7941L35.7733 28.2474L37.6666 26.3541L26.9999 15.6874L16.3333 26.3541Z",
            fill: "white"
          }
        ) })
      ] }),
      /* @__PURE__ */ A("defs", { children: [
        /* @__PURE__ */ A(
          "filter",
          {
            id: "filter0_dd_121_23927",
            x: "0",
            y: "0.354126",
            width: "54",
            height: "54",
            filterUnits: "userSpaceOnUse",
            colorInterpolationFilters: "sRGB",
            children: [
              /* @__PURE__ */ h("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ h(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ h("feOffset", { dy: "1" }),
              /* @__PURE__ */ h("feGaussianBlur", { stdDeviation: "1" }),
              /* @__PURE__ */ h("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ h(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                }
              ),
              /* @__PURE__ */ h(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ h(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ h("feOffset", { dy: "1" }),
              /* @__PURE__ */ h("feGaussianBlur", { stdDeviation: "1.5" }),
              /* @__PURE__ */ h("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ h(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                }
              ),
              /* @__PURE__ */ h(
                "feBlend",
                {
                  mode: "normal",
                  in2: "effect1_dropShadow_121_23927",
                  result: "effect2_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ h(
                "feBlend",
                {
                  mode: "normal",
                  in: "SourceGraphic",
                  in2: "effect2_dropShadow_121_23927",
                  result: "shape"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ h("clipPath", { id: "clip0_121_23927", children: /* @__PURE__ */ h(
          "rect",
          {
            width: "32",
            height: "32",
            fill: "white",
            transform: "translate(11 10.3541)"
          }
        ) })
      ] })
    ]
  }
), Z1 = ({ className: e, ...t }) => /* @__PURE__ */ h("form", { className: nt("chat-wrapper__prompt-input", e), ...t }), Da = ar(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...s
  }, o) => {
    const l = (c) => {
      if (c.key === "Enter") {
        if (c.shiftKey)
          return;
        c.preventDefault();
        const u = c.currentTarget.form;
        if (u) {
          const d = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          u.dispatchEvent(d);
        }
      }
      a == null || a(c);
    };
    return /* @__PURE__ */ h(
      "textarea",
      {
        ref: o,
        className: nt("chat-wrapper__prompt-textarea", t),
        name: "message",
        onChange: e,
        onKeyDown: l,
        placeholder: n,
        style: {
          minHeight: `${r}px`,
          maxHeight: `${i}px`
        },
        ...s
      }
    );
  }
);
Da.displayName = "PromptInputTextarea";
const q1 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: nt("chat-wrapper__prompt-toolbar", e), ...t }), K1 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: nt("chat-wrapper__prompt-tools", e), ...t }), X1 = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || Ot.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ h(
    "button",
    {
      className: nt(
        "chat-wrapper__prompt-button",
        `chat-wrapper__prompt-button--${e}`,
        `chat-wrapper__prompt-button--${a}`,
        n
      ),
      type: "button",
      ...i,
      children: r
    }
  );
}, Y1 = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = Oe.IDLE,
  children: i,
  disabled: a,
  ...s
}) => {
  let o = /* @__PURE__ */ h(j1, {});
  const l = a || r === Oe.SUBMITTED || r === Oe.STREAMING;
  return /* @__PURE__ */ h(
    "button",
    {
      className: nt(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${t}`,
        `chat-wrapper__prompt-submit--${n}`,
        // status === "streaming" && "chat-wrapper__prompt-submit--stop",
        e
      ),
      type: "submit",
      disabled: l,
      ...s,
      children: i ?? o
    }
  );
}, Sh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ h("select", { className: nt("chat-wrapper__prompt-select", e), ...n, children: t }), Th = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ h(
  "button",
  {
    className: nt("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), _h = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h(
  "div",
  {
    className: nt("chat-wrapper__prompt-select-content", e),
    ...t
  }
), kh = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ h(
  "div",
  {
    className: nt("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), xh = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ h(
  "span",
  {
    className: nt("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), Q1 = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = J(0), [a, s] = J(!1), [o, l] = J(0);
  return Be(() => {
    if (!t || e.length <= 1) return;
    const c = setInterval(() => {
      s(!0), setTimeout(() => {
        i((u) => (u + 1) % e.length), l((u) => u + 1), s(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(c);
  }, [t, e.length]), Be(() => {
    t || (i(0), s(!1), l(0));
  }, [t]), /* @__PURE__ */ h(
    "div",
    {
      className: `animated-placeholder-container ${n}`,
      children: /* @__PURE__ */ h(
        "span",
        {
          className: `animated-placeholder-text ${a ? "transitioning" : ""}`,
          children: e[r]
        },
        o
      )
    }
  );
}, J1 = ar(
  ({
    placeholder: e = "What would you like to know?",
    placeholderTexts: t,
    disabled: n = !1,
    chatStatus: r,
    fileUploadEnabled: i = !1,
    restaurantName: a,
    restaurantLogo: s,
    hasMessages: o = !1,
    onSubmit: l,
    onFileUpload: c,
    onStopGeneration: u
  }, d) => {
    const [m, p] = J(""), [w, S] = J([]), N = Ge(null), T = t && t.length > 0 ? t : [e], O = m.length === 0 && !o && T.length > 1;
    Va(d, () => ({
      focus: () => {
        var y;
        (y = N.current) == null || y.focus();
      },
      setText: (y) => {
        p(y), setTimeout(() => {
          var L;
          (L = N.current) == null || L.focus();
        }, 0);
      }
    }));
    const _ = te(
      (y) => {
        y.preventDefault();
        const B = new FormData(y.currentTarget).get("message");
        if (B != null && B.trim()) {
          const H = fn(B.trim(), !1);
          if (!H.trim()) {
            console.warn("Message was blocked due to security concerns");
            return;
          }
          l(H, w), p(""), S([]);
        }
      },
      [l, w]
    ), M = te(
      (y) => {
        const B = y.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
        p(B);
      },
      []
    ), R = te(async () => {
      const y = document.createElement("input");
      y.type = "file", y.accept = "image/*", y.multiple = !1, y.onchange = async (L) => {
        const B = L.target.files;
        if (B) {
          const H = Array.from(B).filter((D) => {
            const k = Is(D.name);
            return k !== D.name && console.warn(
              `File name sanitized: ${D.name} -> ${k}`
            ), D.size > 10485760 ? (console.warn(`File too large: ${D.name} (${D.size} bytes)`), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ].includes(D.type) ? !0 : (console.warn(
              `File type not allowed: ${D.name} (${D.type})`
            ), !1);
          });
          if (H.length > 0) {
            const D = await c(H);
            S(D);
          }
        }
      }, y.click();
    }, [c]);
    return /* @__PURE__ */ A(Z1, { onSubmit: _, style: { position: "relative" }, children: [
      /* @__PURE__ */ h(
        Da,
        {
          ref: N,
          name: "message",
          value: m,
          onChange: M,
          placeholder: "",
          disabled: n
        }
      ),
      !m.trim() && /* @__PURE__ */ h(
        Q1,
        {
          placeholderTexts: T,
          shouldAnimate: O
        }
      ),
      w.length > 0 && /* @__PURE__ */ h(
        "div",
        {
          style: {
            padding: "8px 16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center"
          },
          children: w.map((y, L) => {
            const B = y.startsWith("data:image/"), H = y.startsWith("http://") || y.startsWith("https://"), D = B || H;
            return /* @__PURE__ */ A(
              "div",
              {
                style: {
                  position: "relative",
                  display: "inline-block"
                },
                children: [
                  D ? /* @__PURE__ */ A(
                    "div",
                    {
                      style: {
                        position: "relative",
                        width: "56px",
                        height: "56px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid #e2e8f0"
                      },
                      children: [
                        /* @__PURE__ */ h(
                          "img",
                          {
                            src: y,
                            alt: `Attachment ${L + 1}`,
                            style: {
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }
                          }
                        ),
                        /* @__PURE__ */ h(
                          "div",
                          {
                            style: {
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: "rgba(0, 0, 0, 0.3)",
                              zIndex: 1
                            }
                          }
                        )
                      ]
                    }
                  ) : /* @__PURE__ */ A(
                    "div",
                    {
                      style: {
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#1f2937",
                        borderRadius: "12px",
                        padding: "8px 12px",
                        minWidth: "200px",
                        maxWidth: "300px"
                      },
                      children: [
                        /* @__PURE__ */ h(
                          "div",
                          {
                            style: {
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#8b5cf6",
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: "12px",
                              flexShrink: 0
                            },
                            children: /* @__PURE__ */ A(
                              "svg",
                              {
                                width: "24",
                                height: "25",
                                viewBox: "0 0 24 25",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: [
                                  /* @__PURE__ */ h(
                                    "mask",
                                    {
                                      id: "mask0_190_623",
                                      style: { maskType: "alpha" },
                                      maskUnits: "userSpaceOnUse",
                                      x: "0",
                                      y: "0",
                                      width: "24",
                                      height: "25",
                                      children: /* @__PURE__ */ h(
                                        "rect",
                                        {
                                          y: "0.354126",
                                          width: "24",
                                          height: "24",
                                          fill: "#D9D9D9"
                                        }
                                      )
                                    }
                                  ),
                                  /* @__PURE__ */ h("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ h(
                                    "path",
                                    {
                                      d: "M8.19225 13.0079H15.8077V11.5079H8.19225V13.0079ZM8.19225 15.8926H15.8077V14.3926H8.19225V15.8926ZM8.19225 18.7771H12.8077V17.2771H8.19225V18.7771ZM6.30775 21.8541C5.80258 21.8541 5.375 21.6791 5.025 21.3291C4.675 20.9791 4.5 20.5515 4.5 20.0464V4.66188C4.5 4.15671 4.675 3.72913 5.025 3.37913C5.375 3.02913 5.80258 2.85413 6.30775 2.85413H14.25L19.5 8.10413V20.0464C19.5 20.5515 19.325 20.9791 18.975 21.3291C18.625 21.6791 18.1974 21.8541 17.6923 21.8541H6.30775ZM13.5 8.85413V4.35413H6.30775C6.23075 4.35413 6.16025 4.38621 6.09625 4.45038C6.03208 4.51438 6 4.58488 6 4.66188V20.0464C6 20.1234 6.03208 20.1939 6.09625 20.2579C6.16025 20.322 6.23075 20.3541 6.30775 20.3541H17.6923C17.7692 20.3541 17.8398 20.322 17.9038 20.2579C17.9679 20.1939 18 20.1234 18 20.0464V8.85413H13.5Z",
                                      fill: "white"
                                    }
                                  ) })
                                ]
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ A("div", { style: { flex: 1, minWidth: 0 }, children: [
                          /* @__PURE__ */ h(
                            "div",
                            {
                              style: {
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "500",
                                marginBottom: "2px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "100px"
                              },
                              children: (() => {
                                const k = y.match(/name=([^;]+)/);
                                return k ? decodeURIComponent(k[1]) : "document.pdf";
                              })()
                            }
                          ),
                          /* @__PURE__ */ h(
                            "div",
                            {
                              style: {
                                color: "#9ca3af",
                                fontSize: "12px",
                                textTransform: "uppercase"
                              },
                              children: (() => {
                                const k = y.match(/data:([^;]+)/);
                                if (k) {
                                  const I = k[1];
                                  switch (I) {
                                    case "application/pdf":
                                      return "PDF";
                                    case "application/msword":
                                    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                                      return "DOC";
                                    case "application/vnd.ms-excel":
                                    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                                      return "XLS";
                                    case "application/vnd.ms-powerpoint":
                                    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                                      return "PPT";
                                    case "text/plain":
                                      return "TXT";
                                    case "text/csv":
                                      return "CSV";
                                    case "application/json":
                                      return "JSON";
                                    case "application/xml":
                                    case "text/xml":
                                      return "XML";
                                    case "application/zip":
                                      return "ZIP";
                                    case "application/x-rar-compressed":
                                      return "RAR";
                                    default:
                                      const $ = I.split("/")[1];
                                      return $ ? $.toUpperCase().substring(0, 4) : "FILE";
                                  }
                                }
                                return "FILE";
                              })()
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ h(
                    "button",
                    {
                      onClick: () => {
                        S(
                          (k) => k.filter((I, $) => $ !== L)
                        );
                      },
                      style: {
                        position: "absolute",
                        top: D ? "6px" : "8px",
                        right: D ? "6px" : "8px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "transparent",
                        border: "2px solid white",
                        color: "white",
                        fontSize: "14px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2,
                        // Above the overlay
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                        fontWeight: "bold",
                        transition: "all 0.2s"
                      },
                      title: "Remove attachment",
                      children: "×"
                    }
                  )
                ]
              },
              L
            );
          })
        }
      ),
      /* @__PURE__ */ A(q1, { children: [
        /* @__PURE__ */ A(K1, { children: [
          i && /* @__PURE__ */ A(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center"
              },
              children: [
                /* @__PURE__ */ h(
                  X1,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: R,
                    title: w.length > 0 ? `${w.length} image(s) attached` : "Attach image",
                    disabled: n,
                    style: {
                      position: "relative"
                    },
                    children: /* @__PURE__ */ A(
                      "svg",
                      {
                        width: "36",
                        height: "37",
                        viewBox: "0 0 36 37",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [
                          /* @__PURE__ */ h(
                            "rect",
                            {
                              y: "0.354126",
                              width: "36",
                              height: "36",
                              rx: "18",
                              fill: "#F4F6F8"
                            }
                          ),
                          /* @__PURE__ */ h("g", { clipPath: "url(#clip0_121_9706)", children: /* @__PURE__ */ h(
                            "path",
                            {
                              d: "M21.3334 13.3541V22.9374C21.3334 24.7791 19.8417 26.2708 18 26.2708C16.1584 26.2708 14.6667 24.7791 14.6667 22.9374V12.5208C14.6667 11.3708 15.6 10.4374 16.75 10.4374C17.9 10.4374 18.8334 11.3708 18.8334 12.5208V21.2708C18.8334 21.7291 18.4584 22.1041 18 22.1041C17.5417 22.1041 17.1667 21.7291 17.1667 21.2708V13.3541H15.9167V21.2708C15.9167 22.4208 16.85 23.3541 18 23.3541C19.15 23.3541 20.0834 22.4208 20.0834 21.2708V12.5208C20.0834 10.6791 18.5917 9.18744 16.75 9.18744C14.9084 9.18744 13.4167 10.6791 13.4167 12.5208V22.9374C13.4167 25.4708 15.4667 27.5208 18 27.5208C20.5334 27.5208 22.5834 25.4708 22.5834 22.9374V13.3541H21.3334Z",
                              fill: "#212B36"
                            }
                          ) }),
                          /* @__PURE__ */ h("defs", { children: /* @__PURE__ */ h("clipPath", { id: "clip0_121_9706", children: /* @__PURE__ */ h(
                            "rect",
                            {
                              width: "20",
                              height: "20",
                              fill: "white",
                              transform: "translate(8 8.35413)"
                            }
                          ) }) })
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ h(
                  "span",
                  {
                    onClick: R,
                    style: {
                      fontSize: "12px",
                      color: "#919EAB",
                      marginLeft: "4px",
                      cursor: "pointer"
                    },
                    children: "Attach"
                  }
                )
              ]
            }
          ),
          i && a && /* @__PURE__ */ h("div", { className: "chat-wrapper__divider" }),
          a && /* @__PURE__ */ A("div", { className: "chat-wrapper__restaurant-chip", children: [
            s && /* @__PURE__ */ h(
              "img",
              {
                src: s,
                alt: "Restaurant logo",
                className: "chat-wrapper__restaurant-logo"
              }
            ),
            /* @__PURE__ */ h("span", { className: "chat-wrapper__restaurant-name", children: a })
          ] })
        ] }),
        /* @__PURE__ */ h(
          Y1,
          {
            status: r,
            disabled: !m.trim() && r !== Oe.STREAMING,
            onClick: r === Oe.STREAMING && u ? () => {
              u();
            } : void 0
          }
        )
      ] })
    ] });
  }
), eh = ({
  prompts: e,
  onPromptSelect: t
}) => /* @__PURE__ */ A("div", { className: "chat-wrapper__suggested-prompts", children: [
  /* @__PURE__ */ h("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
  /* @__PURE__ */ h("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((n, r) => /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__suggested-prompt-card",
      onClick: () => t(n),
      children: /* @__PURE__ */ A("div", { className: "chat-wrapper__suggested-prompt-content", children: [
        /* @__PURE__ */ h("h4", { className: "chat-wrapper__suggested-prompt-title", children: n.title }),
        /* @__PURE__ */ h("p", { className: "chat-wrapper__suggested-prompt-description", children: n.description })
      ] })
    },
    r
  )) })
] }), th = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ h(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ h("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ h(Na, { size: e, variant: "dots" }) })
  }
), nh = ({
  appName: e,
  description: t
}) => /* @__PURE__ */ A("div", { className: "chat-wrapper__main-header", children: [
  /* @__PURE__ */ h("h1", { className: "chat-wrapper__main-title", children: e }),
  t && /* @__PURE__ */ h("p", { className: "chat-wrapper__description", children: t })
] }), Pa = Wa(null);
function rh({ children: e, value: t }) {
  return /* @__PURE__ */ h(Pa.Provider, { value: t, children: e });
}
function ih() {
  const e = $a(Pa);
  if (!e)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return e;
}
const ah = () => {
  const {
    messages: e,
    isLoadingConversation: t,
    isStreaming: n,
    isThinking: r,
    isHandlingTool: i,
    appName: a,
    description: s,
    placeholder: o,
    placeholderTexts: l,
    restaurantName: c,
    restaurantLogo: u,
    suggestedPrompts: d,
    chatStatus: m,
    clientTools: p,
    getReasoningTitle: w,
    getReasoningStatus: S,
    getReasoningDuration: N,
    getReasoningContentOnly: T,
    getToolingTitle: O,
    getToolingStatus: _,
    currentAssistantMessageIdRef: M,
    fileUploadEnabled: R,
    onSubmit: y,
    onFileUpload: L,
    onStopGeneration: B,
    onPromptSelect: H,
    messagesEndRef: D,
    chatInputRef: k,
    conversationError: I
  } = ih(), $ = lt.state.shouldShowMainHeader(
    e.length,
    n,
    t
  ), Z = lt.state.shouldShowSuggestedPrompts(
    e.length,
    n,
    t,
    d
  ), V = lt.state.getContentAreaClass(
    e.length,
    n,
    t
  ), re = (X) => {
    H ? H(X) : k.current && k.current.setText(X.description);
  };
  return /* @__PURE__ */ A(Jt, { children: [
    I && /* @__PURE__ */ h("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ A("p", { children: [
      "⚠️ ",
      I
    ] }) }),
    $ && /* @__PURE__ */ h(nh, { appName: a, description: s }),
    /* @__PURE__ */ A("div", { className: V, children: [
      t && e.length === 0 ? /* @__PURE__ */ h("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ h(th, { fullHeight: !0 }) }) : /* @__PURE__ */ h(
        Oa,
        {
          ref: D,
          messages: e,
          isThinking: r,
          isHandlingTool: i,
          getReasoningTitle: w,
          getReasoningStatus: S,
          getReasoningDuration: N,
          getReasoningContentOnly: T,
          getToolingTitle: O,
          getToolingStatus: _,
          clientTools: p || [],
          currentAssistantMessageIdRef: M
        }
      ),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ h(
        J1,
        {
          ref: k,
          placeholder: o,
          placeholderTexts: l,
          disabled: n,
          chatStatus: m,
          fileUploadEnabled: R,
          restaurantName: c,
          restaurantLogo: u,
          hasMessages: e.length > 0,
          onSubmit: (X, ue) => y(X, ue),
          onFileUpload: L,
          onStopGeneration: B
        }
      ) }),
      Z && /* @__PURE__ */ h(
        eh,
        {
          prompts: d,
          onPromptSelect: re
        }
      )
    ] })
  ] });
};
function sh({
  // Authentication and server configuration
  userMpAuthToken: e,
  chatServerUrl: t,
  chatServerKey: n,
  // Entity and conversation configuration
  providerResId: r,
  userId: i,
  entityId: a,
  entityType: s,
  // Existing props
  config: o,
  tools: l,
  devMode: c = !1,
  contextHelpers: u
}) {
  var nn, bt;
  lt.validation.validateAuthProps({
    userMpAuthToken: e,
    chatServerUrl: t,
    chatServerKey: n,
    userId: i
  });
  const d = Le(() => lt.url.convertWebSocketToHttp(t), [t]), m = Le(
    () => new zs({
      apiUrl: d,
      userMpAuthToken: e,
      chatServerKey: n
    }),
    [d, e, n]
  ), p = Le(() => l && l.length > 0 ? l.map(({ execute: ie, ...St }) => St) : [], [l]), w = Ps(), S = Hs({ initialMode: o.mode }), {
    messages: N,
    setMessages: T,
    isStreaming: O,
    setIsStreaming: _,
    isThinking: M,
    setIsThinking: R,
    streamingContent: y,
    isHandlingTool: L,
    currentAssistantMessageIdRef: B,
    getReasoningStatus: H,
    getReasoningDuration: D,
    getReasoningContentOnly: k,
    getReasoningTitle: I,
    getToolingTitle: $,
    getToolingStatus: Z,
    addMessage: V,
    handleSetMessage: re,
    handleReasoningUpdate: X,
    handleChatFinished: ue,
    handleChatError: Ae,
    stopGeneration: g
  } = w, {
    isModalOpen: ee,
    isCollapsed: de,
    currentMode: f,
    chatStatus: we,
    setChatStatus: Y,
    streamingStatus: ae,
    setStreamingStatus: He,
    isLoadingConversation: fe,
    setIsLoadingConversation: Xe,
    conversationError: Ue,
    setConversationError: ht,
    setCurrentThreadId: Rt,
    currentConvUuid: Ye,
    setCurrentConvUuid: wt,
    isDevSettingsOpen: We,
    setIsDevSettingsOpen: rt,
    openModal: pt,
    closeModal: it,
    toggleCollapse: Qe,
    toggleFullscreen: dt
  } = S, Et = Ge(null), at = Ge(null), zt = te((ie) => {
    var St;
    switch (ie.type) {
      case tt.CHAT_COMPLETED:
        ue(), setTimeout(() => {
          var Ze;
          (Ze = at.current) == null || Ze.focus();
        }, 0);
        break;
      case tt.CHAT_ERROR:
        (St = ie.data) != null && St.error && Ae(ie.data.error);
        break;
      case tt.CONNECTION_LOST:
      case tt.CONNECTION_RESTORED:
    }
  }, [ue, Ae]), { chatClient: ft, isConnected: Je, isConnecting: E, connectChatClient: v } = as({
    // Authentication and server properties
    userMpAuthToken: e,
    chatServerUrl: t,
    chatServerKey: n,
    // Entity configuration
    providerResId: r,
    userId: i,
    entityId: a,
    entityType: s,
    // Tools configuration
    tools: l,
    // Other properties
    contextHelpers: u,
    onSetMessage: re,
    onSystemEvent: zt,
    onReasoningUpdate: X
  }), z = Le(
    () => ft ? new Bs(ft, {
      onError: o.onError
    }) : null,
    [ft, o.onError]
  );
  Fs({
    userId: i,
    httpApiUrl: d,
    userMpAuthToken: e,
    chatServerKey: n,
    messages: N,
    setMessages: T,
    setIsLoadingConversation: Xe,
    setConversationError: ht,
    setCurrentThreadId: Rt,
    setCurrentConvUuid: wt
  });
  const j = Ge(null), Q = te(() => {
    j.current && cancelAnimationFrame(j.current), j.current = requestAnimationFrame(() => {
      var ie;
      (ie = Et.current) == null || ie.scrollIntoView({ behavior: "smooth" }), j.current = null;
    });
  }, []);
  Be(() => {
    Q();
  }, [N, Q]), Be(() => {
    y && Q();
  }, [y, Q]), Be(() => {
    o.onStreamingStatusChange && o.onStreamingStatusChange(ae);
  }, [ae, o]), Be(() => () => {
    j.current && cancelAnimationFrame(j.current);
  }, []);
  const me = te(
    async (ie, St) => {
      if (z != null && z.canSubmit(ie, O, Je)) {
        _(!0), R(!0), Y(Oe.SUBMITTED), He(jn.STARTING);
        try {
          const Ze = await z.submitMessage({
            message: ie,
            media: St,
            convUuid: Ye || void 0,
            agentPromptPath: void 0
          });
          T((Bt) => [...Bt, Ze]), Y(Oe.STREAMING);
        } catch (Ze) {
          R(!1), Y(Oe.ERROR);
          const Bt = z.createErrorMessage(Ze);
          V("system", Bt), _(!1), Y(Oe.IDLE), He(jn.IDLE);
        }
      }
    },
    [
      z,
      O,
      Je,
      T,
      _,
      R,
      Y,
      He,
      V,
      Ye
    ]
  ), Fe = te(
    async (ie) => await m.uploadFiles(ie),
    [m]
  ), Se = Le(
    () => lt.css.getContainerClasses(
      f,
      o.position,
      o.theme,
      de,
      o.constrainedHeight
    ),
    [f, o.position, o.theme, de, o.constrainedHeight]
  ), $e = te(() => {
    f === "modal" ? pt() : Qe();
  }, [f, pt, Qe]), ge = te(() => {
    rt(!0);
  }, [rt]), ce = te((ie) => {
    at.current && at.current.setText(ie.description);
  }, []), je = Le(() => {
    var ie;
    return {
      // Message state
      messages: N,
      isStreaming: O,
      isThinking: M,
      isHandlingTool: L,
      // UI state
      isLoadingConversation: fe,
      chatStatus: we,
      conversationError: Ue,
      // Configuration
      appName: o.appName,
      description: o.description,
      placeholder: o.placeholder,
      placeholderTexts: o.placeholderTexts,
      restaurantName: o.restaurantName,
      restaurantLogo: o.restaurantLogo,
      suggestedPrompts: o.suggestedPrompts,
      // Tools & features
      clientTools: p,
      fileUploadEnabled: (ie = o.features) == null ? void 0 : ie.fileUpload,
      // Reasoning helpers
      getReasoningTitle: I,
      getReasoningStatus: H,
      getReasoningDuration: D,
      getReasoningContentOnly: k,
      // Tooling helpers
      getToolingTitle: $,
      getToolingStatus: Z,
      // Refs
      currentAssistantMessageIdRef: B,
      messagesEndRef: Et,
      chatInputRef: at,
      // Event handlers
      onSubmit: me,
      onFileUpload: Fe,
      onStopGeneration: g,
      onPromptSelect: ce
    };
  }, [
    N,
    O,
    M,
    L,
    fe,
    we,
    Ue,
    o.appName,
    o.description,
    o.placeholder,
    o.placeholderTexts,
    o.restaurantName,
    o.restaurantLogo,
    o.suggestedPrompts,
    (nn = o.features) == null ? void 0 : nn.fileUpload,
    p,
    I,
    H,
    D,
    k,
    $,
    Z,
    B,
    Et,
    at,
    me,
    Fe,
    g,
    ce
  ]);
  return Le(
    () => lt.state.shouldShowBubble(
      f,
      ee,
      de
    ),
    [f, ee, de]
  ) ? /* @__PURE__ */ h(Wr, { children: /* @__PURE__ */ h(
    Qs,
    {
      mode: f,
      appName: o.appName,
      bubbleText: o.bubbleText,
      showBubbleText: ((bt = o.features) == null ? void 0 : bt.showBubbleText) !== !1,
      onClick: $e
    }
  ) }) : /* @__PURE__ */ h(Wr, { children: /* @__PURE__ */ h(
    Ws,
    {
      onError: (ie) => {
        console.error("WebSocket error in ChatWrapper:", ie), o.onError && o.onError(ie);
      },
      children: /* @__PURE__ */ A("div", { className: Se, style: o.customStyles, children: [
        /* @__PURE__ */ h(
          js,
          {
            isConnected: Je,
            isConnecting: E,
            onRetry: v
          }
        ),
        c && o.headerVisible === !1 && /* @__PURE__ */ h(
          "button",
          {
            className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
            onClick: ge,
            title: "Developer Settings",
            children: /* @__PURE__ */ h($i, { size: 16 })
          }
        ),
        lt.state.shouldShowHeader(o.headerVisible) && /* @__PURE__ */ h(
          Js,
          {
            appName: o.appName,
            mode: f,
            isCollapsed: de,
            isModalOpen: ee,
            devMode: c,
            onClose: it,
            onToggleFullscreen: dt,
            onToggleCollapse: Qe,
            onOpenSettings: ge
          }
        ),
        !de && /* @__PURE__ */ h(
          $s,
          {
            onError: (ie) => {
              console.error("File upload error:", ie), o.onError && o.onError(ie);
            },
            children: /* @__PURE__ */ h(rh, { value: je, children: /* @__PURE__ */ h(ah, {}) })
          }
        ),
        /* @__PURE__ */ h(
          Ka,
          {
            isOpen: We,
            onClose: () => rt(!1),
            apiUrl: d,
            userMpAuthToken: e,
            chatServerKey: n
          }
        )
      ] })
    }
  ) });
}
const bh = Pi(sh);
var oh = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(oh || {});
export {
  Q1 as AnimatedPlaceholder,
  Oe as CHAT_STATUS,
  Zs as ChatIcon,
  bh as ChatWrapper,
  qs as CloseIcon,
  Xs as CollapseIcon,
  js as ConnectionNotification,
  Ys as CopyIcon,
  Ka as DevSettings,
  oh as EntityType,
  Ks as FullscreenIcon,
  th as InlineLoader,
  Na as Loader,
  _e as PROCESSING_STATUS,
  Z1 as PromptInput,
  X1 as PromptInputButton,
  Sh as PromptInputModelSelect,
  _h as PromptInputModelSelectContent,
  kh as PromptInputModelSelectItem,
  Th as PromptInputModelSelectTrigger,
  xh as PromptInputModelSelectValue,
  Y1 as PromptInputSubmit,
  Da as PromptInputTextarea,
  q1 as PromptInputToolbar,
  K1 as PromptInputTools,
  z1 as Reasoning,
  Ra as ReasoningContent,
  Ia as ReasoningTrigger,
  jn as STREAMING_STATUS,
  $i as SettingsIcon,
  eh as SuggestedPrompts,
  Eh as createThread,
  wh as fetchMessagesByConvUuid,
  yh as fetchThreadByConvUuid,
  Us as fetchThreadMessages,
  Ch as fetchUserThreads,
  hh as isChatActive,
  dh as isChatError,
  ph as isChatIdle,
  fh as isProcessingActive,
  mh as isProcessingComplete,
  gh as isProcessingError
};
