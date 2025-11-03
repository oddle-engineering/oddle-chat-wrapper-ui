var Ua = Object.defineProperty;
var za = (e, t, n) => t in e ? Ua(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var $ = (e, t, n) => za(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as h, jsxs as I, Fragment as Yt } from "react/jsx-runtime";
import Mt, { useState as te, useEffect as Ye, useCallback as ae, useRef as Tt, useMemo as at, Component as rr, memo as Li, forwardRef as ir, useImperativeHandle as Ba } from "react";
async function Ga(e, t) {
  const n = {
    "Content-Type": "application/json"
  };
  t != null && t.userMpAuthToken && (n.Authorization = `Bearer ${t.userMpAuthToken}`), t != null && t.chatServerKey && (n["X-Chat-Server-Key"] = t.chatServerKey);
  const r = await fetch(`${e}/v1/api/agent-configurations`, {
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
async function Va(e, t, n) {
  return (await Ga(e, n)).find((i) => i.app === t) || null;
}
async function Wa(e, t, n) {
  const r = {
    "Content-Type": "application/json"
  };
  n != null && n.userMpAuthToken && (r.Authorization = `Bearer ${n.userMpAuthToken}`), n != null && n.chatServerKey && (r["X-Chat-Server-Key"] = n.chatServerKey);
  const i = await fetch(`${e}/v1/api/agent-configurations`, {
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
const $a = ({
  isOpen: e,
  onClose: t,
  apiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  app: a = "UD21"
  // Default to UD21 if not specified
}) => {
  const [s, o] = te(null), [l, c] = te(""), [u, d] = te(""), [m, p] = te(!1), [w, T] = te(null);
  Ye(() => {
    e && !s && R();
  }, [e]);
  const R = ae(async () => {
    p(!0), T(null);
    try {
      const k = await Va(n, a, {
        userMpAuthToken: r,
        chatServerKey: i
      });
      if (!k)
        throw new Error(`No configuration found for app: ${a}`);
      o(k), c(k.promptPath), d(k.versionUuid);
    } catch (k) {
      T(k instanceof Error ? k.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", k);
    } finally {
      p(!1);
    }
  }, [n, a, r, i]), S = ae(async () => {
    if (s) {
      p(!0), T(null);
      try {
        const k = await Wa(n, {
          app: s.app,
          promptPath: l,
          versionUuid: u,
          isDefault: s.isDefault
        }, {
          userMpAuthToken: r,
          chatServerKey: i
        });
        o(k), t(), window.location.reload();
      } catch (k) {
        T(k instanceof Error ? k.message : "Failed to update configuration"), console.error("Error updating agent configuration:", k);
      } finally {
        p(!1);
      }
    }
  }, [n, l, u, s, t, r, i]), D = ae(() => {
    s && (c(s.promptPath), d(s.versionUuid)), T(null), t();
  }, [s, t]);
  return e ? /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ h("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: D,
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
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-content", children: [
      m && /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      w && /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ I("p", { children: [
          "Error: ",
          w
        ] }),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: R,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      s && !m && /* @__PURE__ */ I(Yt, { children: [
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: l,
              onChange: (k) => c(k.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: m
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: u,
              onChange: (k) => d(k.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: m
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
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
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: D,
          disabled: m,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: S,
          disabled: m || !s,
          children: m ? "Saving..." : "Save"
        }
      )
    ] })
  ] }) }) : null;
}, ja = {
  maxReconnectAttempts: 5,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, Za = {
  NORMAL: 1e3,
  GOING_AWAY: 1001
};
var Xe = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(Xe || {}), rt = /* @__PURE__ */ ((e) => (e.TICKET_AUTHENTICATE = "ticket_authenticate", e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e))(rt || {}), Le = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(Le || {}), on = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(on || {}), Et = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(Et || {});
class Lt {
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
    return this.createConnectionEvent(Xe.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(Xe.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(Xe.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(Xe.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(Xe.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(Xe.CHAT_ERROR, { error: t, errorCode: n });
  }
}
class Ct {
  /**
   * Create a ticket authentication message
   */
  static createTicketAuthenticateMessage(t) {
    return {
      type: rt.TICKET_AUTHENTICATE,
      ticket: t.ticket,
      clientInfo: {
        userAgent: navigator.userAgent,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        ...t.clientInfo
      }
    };
  }
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(t) {
    return {
      type: rt.CHAT_MESSAGE,
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
      type: rt.CONFIGURE_TOOLS,
      toolSchemas: t,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(t) {
    return {
      type: rt.UPDATE_TOOLS,
      toolSchemas: t
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(t) {
    return {
      type: rt.UPDATE_CONTEXT_HELPERS,
      contextHelpers: t
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(t, n) {
    return {
      type: rt.TOOL_CALL_RESPONSE,
      callId: t,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(t, n) {
    return {
      type: rt.TOOL_CALL_RESPONSE,
      callId: t,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: rt.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(t, n) {
    return {
      type: rt.HEARTBEAT_PONG,
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
  static serializeTicketAuthenticate(t) {
    return this.createAndSerialize(() => this.createTicketAuthenticateMessage(t));
  }
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
class qa {
  constructor(t, n) {
    $(this, "ws", null);
    $(this, "config");
    $(this, "connectionState");
    $(this, "reconnectTimer", null);
    $(this, "heartbeatInterval", null);
    $(this, "visibilityChangeHandler");
    $(this, "onOpen");
    $(this, "onMessage");
    $(this, "onError");
    $(this, "onClose");
    $(this, "onSystemEvent");
    this.config = t, this.connectionState = n, this.visibilityChangeHandler = this.handleVisibilityChange.bind(this), this.registerVisibilityHandler();
  }
  connect() {
    return new Promise((t, n) => {
      try {
        const r = this.buildWebSocketUrl();
        if (this.ws = new WebSocket(r), !this.ws) {
          n(new Error("WebSocket not initialized"));
          return;
        }
        this.setupEventHandlers(t, n);
      } catch (r) {
        n(r);
      }
    });
  }
  buildWebSocketUrl() {
    const t = this.config.apiUrl;
    return t.endsWith("/ws") ? t : t + "/ws";
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
    const { NORMAL: n, GOING_AWAY: r } = Za;
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
        Lt.connectionLost("Max reconnection attempts reached")
      ));
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    (a = this.onSystemEvent) == null || a.call(this, Lt.reconnecting(t, n)), this.reconnectTimer = window.setTimeout(() => {
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
  setupReconnectHandlers() {
    this.ws && (this.ws.onopen = () => this.handleReconnectionOpened(), this.ws.onerror = () => this.handleReconnectionError(), this.ws.onmessage = (t) => {
      var n;
      return (n = this.onMessage) == null ? void 0 : n.call(this, t);
    }, this.ws.onclose = (t) => this.handleReconnectionClosed(t));
  }
  handleReconnectionOpened() {
    var t, n;
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Lt.connectionRestored()), (n = this.onOpen) == null || n.call(this);
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
    const t = Ct.serializeHeartbeatPing();
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
    this.ws && this.ws.close();
  }
  disconnect() {
    this.clearTimers(), this.removeEventListeners(), this.closeConnection(), this.connectionState.reset(), this.ws = null;
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
class Ka {
  constructor() {
    $(this, "state");
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
class Oi {
  constructor(t = {}) {
    $(this, "handlers", {});
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
const W = {
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
}, Ee = {
  isThinkingMessage: (e) => e.startsWith(W.THINKING_PREFIX) || e.startsWith(W.REASONING_PREFIX) || e.startsWith(W.THOUGHT_PREFIX),
  isCompletedMessage: (e) => e.includes(W.COMPLETED_MARKER),
  isErrorMessage: (e) => e.includes(W.ERROR_MARKER),
  isHandlingMessage: (e) => e.includes(W.HANDLING_MARKER),
  extractDuration: (e) => {
    const t = e.match(W.PATTERNS.DURATION);
    return t ? ` for ${t[1]} seconds` : void 0;
  },
  cleanReasoningContent: (e) => {
    let t = e.replace(new RegExp(`^${W.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${W.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${W.THOUGHT_PREFIX}\\s*`), "");
    return t = t.replace(/\s*for [\d.]+\s*seconds$/, ""), t = t.replace(W.PATTERNS.THOUGHT_CONTENT, ""), t.trim();
  },
  getMessageType: (e, t) => t === !1 ? Ee.isErrorMessage(e) ? W.MESSAGE_TYPES.ERROR : (Ee.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || Ee.isThinkingMessage(e), W.MESSAGE_TYPES.THOUGHT) : Ee.isCompletedMessage(e) ? W.MESSAGE_TYPES.COMPLETED : Ee.isErrorMessage(e) ? W.MESSAGE_TYPES.ERROR : (Ee.isHandlingMessage(e) || Ee.isThinkingMessage(e) && !e.includes(W.UI_TEXT.AI_IS_THINKING), W.MESSAGE_TYPES.THINKING)
};
class Xa extends Oi {
  constructor(n) {
    super({ onReasoningUpdate: n });
    $(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    $(this, "reasoningContent", /* @__PURE__ */ new Map());
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
    const s = `${W.THINKING_PREFIX} ${a}`;
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
    a && (s = ` for ${((Date.now() - a) / 1e3).toFixed(1)} seconds`, this.reasoningStartTimes.delete(r));
    const o = i || W.UI_TEXT.THOUGHT, l = `${W.THOUGHT_PREFIX} ${o}${s}`;
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
class Ya extends Oi {
  constructor(n = {}, r) {
    super({ onReasoningUpdate: r });
    $(this, "processedToolCalls", /* @__PURE__ */ new Set());
    $(this, "clientTools", {});
    $(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var s, o, l;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (s = this.getHandler("onReasoningUpdate")) == null || s(!0, `${W.HANDLING_MARKER} ${i}`, n);
      try {
        const c = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, c), (o = this.getHandler("onReasoningUpdate")) == null || o(!1, `${W.COMPLETED_MARKER} ${i}`, n);
      } catch (c) {
        this.sendToolError(r, c), (l = this.getHandler("onReasoningUpdate")) == null || l(!1, `${W.ERROR_MARKER} Error: ${i} - ${c}`, n);
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
    const i = Ct.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = Ct.serializeToolCallError(n, i);
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
      r(!0, `${W.HANDLING_MARKER} ${n.toolName}`, a);
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
        `${W.COMPLETED_MARKER} ${n.toolName}`,
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
class Qa {
  constructor(t, n = {}) {
    $(this, "reasoningHandler");
    $(this, "toolHandler");
    $(this, "handlers");
    $(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new Xa(t.onReasoningUpdate), this.toolHandler = new Ya(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case Le.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case Le.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case Le.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case Le.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case Le.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case Le.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case Le.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case Le.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case Le.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case Le.HEARTBEAT_ACK:
          break;
        case Le.ERROR:
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
      case on.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case on.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case on.CONTENT_DELTA:
        (n = t.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, t.data.delta));
        break;
    }
  }
  handleProviderEvent(t) {
    var r, i, a;
    switch ((r = t.data) == null ? void 0 : r.type) {
      case Et.TEXT_DELTA:
        t.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, t.data.textDelta));
        break;
      case Et.REASONING_START:
        this.reasoningHandler.handleReasoningStart(t.data);
        break;
      case Et.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(t.data);
        break;
      case Et.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(t.data);
        break;
      case Et.TOOL_CALL:
        this.toolHandler.handleServerToolCall(t.data);
        break;
      case Et.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(t.data);
        break;
    }
  }
  handleLatitudeEvent(t) {
    var n;
    if (((n = t.data) == null ? void 0 : n.type) === Et.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = t.data;
      if (r.toolCallId && r.toolName) {
        const i = dn.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${W.COMPLETED_MARKER} ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Lt.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Lt.chatError(t.error || "Unknown error"));
  }
  handleToolCallRequest(t) {
    this.toolHandler.handleToolCallRequest(t);
  }
  handleHeartbeatPing(t) {
    if (!this.sendMessage)
      return;
    const n = Ct.serializeHeartbeatPong(
      t.timestamp,
      t.pingTime
    );
    this.sendMessage(n);
  }
  handleError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Lt.chatError(t.error || "Unknown WebSocket error"));
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
async function Ja(e, t) {
  const n = {
    "Content-Type": "application/json"
  };
  t.userMpAuthToken && (n.Authorization = `Bearer ${t.userMpAuthToken}`), t.chatServerKey && (n["X-Chat-Server-Key"] = t.chatServerKey);
  try {
    const r = await fetch(`${e}/v1/api/websocket/ticket`, {
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
function ln(e) {
  if (!e.success || !e.ticket || !e.expiresAt)
    return !1;
  const t = new Date(e.expiresAt).getTime();
  return Date.now() < t - 3e4;
}
function _n(e) {
  const t = ln(e), n = new Date(e.expiresAt).getTime(), r = Date.now(), i = Math.max(0, Math.floor((n - r) / 1e3));
  return {
    isValid: t,
    expiresIn: i,
    expired: r >= n
  };
}
class es {
  constructor() {
    $(this, "config");
    $(this, "connectionState");
    $(this, "wsManager");
    $(this, "messageHandler");
    $(this, "initResolve");
    // Client tools and context
    $(this, "toolSchemas", []);
    $(this, "contextHelpers", {});
    // Authentication data and ticket
    $(this, "authData", {});
    $(this, "wsTicket", null);
    // Ticket management
    $(this, "ticketCheckInterval", null);
    $(this, "isRefreshingTicket", !1);
    $(this, "visibilityChangeHandler", null);
    this.config = {
      ...ja
    }, this.connectionState = new Ka(), this.wsManager = new qa(this.config, this.connectionState), this.messageHandler = new Qa({}), this.setupWebSocketHandlers();
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
    (n == null ? void 0 : n.type) === "authentication_success" ? (console.log("WebSocket authentication successful"), this.startTicketValidation(), this.toolSchemas && this.toolSchemas.length > 0 && this.sendToolConfiguration()) : (n == null ? void 0 : n.type) === "authentication_error" && (console.error("WebSocket authentication failed:", n == null ? void 0 : n.error, n == null ? void 0 : n.code), this.handleAuthenticationFailure(n)), (n == null ? void 0 : n.type) === Le.TOOLS_CONFIGURED && ((r = this.initResolve) == null || r.call(this)), (n == null ? void 0 : n.type) === Le.SESSION_ESTABLISHED && (!this.toolSchemas || this.toolSchemas.length === 0) && ((i = this.initResolve) == null || i.call(this));
  }
  handleConnectionOpen() {
    console.log("WebSocket connection opened, sending ticket authentication..."), this.sendTicketAuthentication();
  }
  sendTicketAuthentication() {
    if (!this.wsTicket || !this.wsTicket.ticket) {
      console.error("No valid WebSocket ticket available for authentication");
      return;
    }
    console.log("Sending ticket authentication with ticket:", this.wsTicket.ticket.substring(0, 20) + "...");
    const t = Ct.serializeTicketAuthenticate({
      ticket: this.wsTicket.ticket
    });
    this.wsManager.send(t);
  }
  handleAuthenticationFailure(t) {
    var r;
    const n = t;
    console.error("Authentication failure details:", {
      error: n == null ? void 0 : n.error,
      code: n == null ? void 0 : n.code,
      hasTicket: !!((r = this.wsTicket) != null && r.ticket),
      ticketValid: this.wsTicket ? ln(this.wsTicket) : !1
    }), ((n == null ? void 0 : n.code) === "TICKET_INVALID" || (n == null ? void 0 : n.code) === "TICKET_EXPIRED") && (console.log("Attempting to refresh ticket and reconnect..."), this.refreshTicketAndReconnect().catch((i) => {
      console.error("Failed to refresh ticket:", i);
    }));
  }
  sendToolConfiguration() {
    const t = Ct.serializeConfigureTools(
      this.toolSchemas,
      this.contextHelpers
    );
    this.wsManager.send(t);
  }
  async onInit(t) {
    return this.setupEventHandlers(t), this.setupToolsAndContext(t), this.updateConfig(t), await this.requestTicket(), new Promise((n) => {
      this.initResolve = n, this.wsManager.connect().then(() => {
        (!this.toolSchemas || this.toolSchemas.length === 0) && n();
      }).catch(() => {
        n();
      });
    });
  }
  async requestTicket() {
    try {
      if (!this.authData.userMpAuthToken || !this.authData.chatServerKey || !this.authData.userId)
        throw new Error("Missing required authentication data for ticket request");
      if (this.wsTicket && ln(this.wsTicket)) {
        console.log("Using existing valid WebSocket ticket");
        return;
      }
      console.log("Requesting new WebSocket ticket...", {
        userId: this.authData.userId,
        chatServerKey: this.authData.chatServerKey,
        hasToken: !!this.authData.userMpAuthToken
      });
      const t = this.config.apiUrl.replace(/^wss:\/\//, "https://").replace(/^ws:\/\//, "http://");
      console.log("Using HTTP API URL for ticket request:", t), this.wsTicket = await Ja(t, {
        userMpAuthToken: this.authData.userMpAuthToken,
        chatServerKey: this.authData.chatServerKey,
        userId: this.authData.userId,
        entityId: this.authData.entityId,
        entityType: this.authData.entityType,
        providerResId: this.authData.providerResId
      }), console.log("WebSocket ticket received successfully:", {
        hasTicket: !!this.wsTicket.ticket,
        expiresAt: this.wsTicket.expiresAt
      });
    } catch (t) {
      throw console.error("Failed to request WebSocket ticket:", t), new Error(`WebSocket ticket request failed: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
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
    t.chatServerUrl && (this.config.apiUrl = t.chatServerUrl), t.userId && (this.config.userId = t.userId), this.authData = {
      userMpAuthToken: t.userMpAuthToken,
      chatServerKey: t.chatServerKey,
      userId: t.userId,
      entityId: t.entityId,
      entityType: t.entityType,
      providerResId: t.providerResId
    };
  }
  async onTriggerMessage(t) {
    if (!this.connectionState.isConnected)
      throw new Error("Client not connected");
    const {
      message: n,
      app: r = "UD21",
      media: i,
      convUuid: a,
      agentPromptPath: s
    } = t;
    try {
      this.messageHandler.clearProcessedToolCalls();
      const o = Ct.serializeChatMessage({
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
    this.stopTicketValidation(), this.wsManager.disconnect();
  }
  isClientConnected() {
    return this.connectionState.isConnected;
  }
  updateContextHelpers(t) {
    this.contextHelpers = { ...this.contextHelpers, ...t };
    const n = Ct.serializeUpdateContextHelpers(this.contextHelpers);
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = Ct.serializeUpdateTools(this.toolSchemas);
    this.wsManager.send(r);
  }
  getConnectionStatus() {
    let t;
    if (this.wsTicket)
      try {
        t = _n(this.wsTicket).expiresIn;
      } catch (n) {
        console.warn("Error getting ticket info:", n);
      }
    return {
      connected: this.connectionState.isConnected,
      reconnectAttempts: this.connectionState.reconnectAttempts,
      isReconnecting: this.connectionState.isReconnecting,
      websocketState: this.wsManager.getWebSocketState(),
      hasValidTicket: this.isTicketValid(),
      ticketExpiresIn: t,
      isRefreshingTicket: this.isRefreshingTicket
    };
  }
  /**
   * Force refresh the WebSocket ticket and reconnect
   * Useful when authentication fails or ticket expires
   */
  async refreshTicketAndReconnect() {
    if (this.isRefreshingTicket) {
      console.log("Ticket refresh already in progress");
      return;
    }
    try {
      this.isRefreshingTicket = !0, console.log("Refreshing WebSocket ticket and reconnecting..."), this.stopTicketValidation(), this.wsTicket = null, this.wsManager.disconnect(), await this.requestTicket(), await this.wsManager.connect(), console.log("WebSocket ticket refreshed and reconnected successfully");
    } catch (t) {
      throw console.error("Failed to refresh ticket and reconnect:", t), t;
    } finally {
      this.isRefreshingTicket = !1;
    }
  }
  /**
   * Check if current ticket is valid
   */
  isTicketValid() {
    return this.wsTicket ? ln(this.wsTicket) : !1;
  }
  /**
   * Manual reconnection method for UI to call
   * Useful for "Reconnect" buttons or retry logic
   */
  async reconnect() {
    console.log("Manual reconnection requested"), await this.refreshTicketAndReconnect();
  }
  /**
   * Start periodic ticket validation to proactively renew before expiration
   */
  startTicketValidation() {
    this.stopTicketValidation(), this.ticketCheckInterval = window.setInterval(() => {
      this.checkAndRenewTicket();
    }, 3e4), this.setupVisibilityListener(), console.log("Started periodic ticket validation");
  }
  /**
   * Stop periodic ticket validation
   */
  stopTicketValidation() {
    this.ticketCheckInterval && (clearInterval(this.ticketCheckInterval), this.ticketCheckInterval = null), this.removeVisibilityListener();
  }
  /**
   * Check ticket validity and renew if close to expiration
   */
  async checkAndRenewTicket() {
    if (!(!this.wsTicket || this.isRefreshingTicket))
      try {
        const t = _n(this.wsTicket);
        t.expiresIn < 300 && (console.log(`Ticket expires in ${t.expiresIn}s, proactively renewing...`), await this.renewTicketProactively());
      } catch (t) {
        console.error("Error checking ticket validity:", t);
      }
  }
  /**
   * Proactively renew ticket without disconnecting
   */
  async renewTicketProactively() {
    if (this.isRefreshingTicket) {
      console.log("Ticket refresh already in progress");
      return;
    }
    let t = null;
    try {
      this.isRefreshingTicket = !0, console.log("Proactively renewing WebSocket ticket..."), t = this.wsTicket, this.wsTicket = null, await this.requestTicket(), console.log("Ticket renewed successfully without disconnection");
    } catch (n) {
      console.error("Failed to proactively renew ticket:", n), !this.wsTicket && t && (this.wsTicket = t);
    } finally {
      this.isRefreshingTicket = !1;
    }
  }
  /**
   * Setup page visibility listener to detect when user returns
   */
  setupVisibilityListener() {
    typeof document > "u" || (this.removeVisibilityListener(), this.visibilityChangeHandler = () => {
      document.hidden || (console.log("User returned to page, checking connection..."), this.handleUserReturn());
    }, document.addEventListener("visibilitychange", this.visibilityChangeHandler));
  }
  /**
   * Remove page visibility listener
   */
  removeVisibilityListener() {
    this.visibilityChangeHandler && typeof document < "u" && (document.removeEventListener("visibilitychange", this.visibilityChangeHandler), this.visibilityChangeHandler = null);
  }
  /**
   * Handle user returning to the page after being away
   */
  async handleUserReturn() {
    try {
      if (!this.connectionState.isConnected) {
        console.log("Connection lost while away, attempting to reconnect..."), await this.refreshTicketAndReconnect();
        return;
      }
      if (!this.isTicketValid()) {
        console.log("Ticket expired while away, refreshing..."), await this.refreshTicketAndReconnect();
        return;
      }
      this.wsTicket && _n(this.wsTicket).expiresIn < 900 && (console.log("Ticket expires soon, renewing proactively on user return..."), await this.renewTicketProactively());
    } catch (t) {
      console.error("Error handling user return:", t);
    }
  }
}
function ts({
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
  const [m, p] = te(null), [w, T] = te(!1), R = Tt(null), { toolSchemas: S, clientToolExecutors: D } = at(() => {
    if (o && o.length > 0) {
      const L = o.map(({ execute: U, ...Z }) => Z), y = {};
      return o.forEach((U) => {
        y[U.name] = U.execute;
      }), {
        toolSchemas: L,
        clientToolExecutors: y
      };
    }
    return {
      toolSchemas: [],
      clientToolExecutors: {}
    };
  }, [o]), k = ae(async () => {
    try {
      if (!e)
        throw new Error("userMpAuthToken is required");
      if (!t)
        throw new Error("chatServerUrl is required");
      if (!n)
        throw new Error("chatServerKey is required");
      if (!i)
        throw new Error("userId is required");
      const L = new es();
      R.current = L, p(L);
      const y = l || {};
      await L.onInit({
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
        toolSchemas: S,
        clientTools: D,
        contextHelpers: y,
        onSetMessage: c,
        onSystemEvent: u,
        onReasoningUpdate: d
      }), T(!0);
    } catch (L) {
      console.error("Error connecting WebSocketChatClient:", L), T(!1);
    }
  }, [
    e,
    t,
    n,
    r,
    i,
    a,
    s,
    S,
    D,
    l,
    c,
    u,
    d
  ]), P = ae(() => {
    R.current && (R.current.disconnect(), R.current = null), p(null), T(!1);
  }, []);
  return Ye(() => (k(), () => {
    P();
  }), [k, P]), Ye(() => {
    const L = setInterval(() => {
      if (R.current) {
        const y = R.current.getConnectionStatus();
        T(y.connected);
      }
    }, 1e3);
    return () => clearInterval(L);
  }, []), {
    agentClient: m,
    isConnected: w,
    connectAgentClient: k,
    disconnectAgentClient: P
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: Di,
  setPrototypeOf: Mr,
  isFrozen: ns,
  getPrototypeOf: rs,
  getOwnPropertyDescriptor: is
} = Object;
let {
  freeze: Re,
  seal: $e,
  create: Gn
} = Object, {
  apply: Vn,
  construct: Wn
} = typeof Reflect < "u" && Reflect;
Re || (Re = function(t) {
  return t;
});
$e || ($e = function(t) {
  return t;
});
Vn || (Vn = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
Wn || (Wn = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const tn = ve(Array.prototype.forEach), as = ve(Array.prototype.lastIndexOf), Lr = ve(Array.prototype.pop), zt = ve(Array.prototype.push), ss = ve(Array.prototype.splice), cn = ve(String.prototype.toLowerCase), xn = ve(String.prototype.toString), bn = ve(String.prototype.match), Bt = ve(String.prototype.replace), os = ve(String.prototype.indexOf), ls = ve(String.prototype.trim), Ke = ve(Object.prototype.hasOwnProperty), Ie = ve(RegExp.prototype.test), Gt = cs(TypeError);
function ve(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Vn(e, t, r);
  };
}
function cs(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return Wn(e, n);
  };
}
function J(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : cn;
  Mr && Mr(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (ns(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function us(e) {
  for (let t = 0; t < e.length; t++)
    Ke(e, t) || (e[t] = null);
  return e;
}
function gt(e) {
  const t = Gn(null);
  for (const [n, r] of Di(e))
    Ke(e, n) && (Array.isArray(r) ? t[n] = us(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = gt(r) : t[n] = r);
  return t;
}
function Vt(e, t) {
  for (; e !== null; ) {
    const r = is(e, t);
    if (r) {
      if (r.get)
        return ve(r.get);
      if (typeof r.value == "function")
        return ve(r.value);
    }
    e = rs(e);
  }
  function n() {
    return null;
  }
  return n;
}
const Or = Re(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), An = Re(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), In = Re(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), hs = Re(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Rn = Re(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), ps = Re(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Dr = Re(["#text"]), Pr = Re(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), vn = Re(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Hr = Re(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), nn = Re(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), ds = $e(/\{\{[\w\W]*|[\w\W]*\}\}/gm), fs = $e(/<%[\w\W]*|[\w\W]*%>/gm), ms = $e(/\$\{[\w\W]*/gm), gs = $e(/^data-[\-\w.\u00B7-\uFFFF]+$/), Cs = $e(/^aria-[\-\w]+$/), Pi = $e(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), ys = $e(/^(?:\w+script|data):/i), ws = $e(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Hi = $e(/^html$/i), Es = $e(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Fr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Cs,
  ATTR_WHITESPACE: ws,
  CUSTOM_ELEMENT: Es,
  DATA_ATTR: gs,
  DOCTYPE_NAME: Hi,
  ERB_EXPR: fs,
  IS_ALLOWED_URI: Pi,
  IS_SCRIPT_OR_DATA: ys,
  MUSTACHE_EXPR: ds,
  TMPLIT_EXPR: ms
});
const Wt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Ts = function() {
  return typeof window > "u" ? null : window;
}, Ss = function(t, n) {
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
}, Ur = function() {
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
function Fi() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ts();
  const t = (H) => Fi(H);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== Wt.document || !e.Element)
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
  } = e, w = l.prototype, T = Vt(w, "cloneNode"), R = Vt(w, "remove"), S = Vt(w, "nextSibling"), D = Vt(w, "childNodes"), k = Vt(w, "parentNode");
  if (typeof s == "function") {
    const H = n.createElement("template");
    H.content && H.content.ownerDocument && (n = H.content.ownerDocument);
  }
  let P, L = "";
  const {
    implementation: y,
    createNodeIterator: U,
    createDocumentFragment: Z,
    getElementsByTagName: z
  } = n, {
    importNode: B
  } = r;
  let A = Ur();
  t.isSupported = typeof Di == "function" && typeof k == "function" && y && y.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: N,
    ERB_EXPR: v,
    TMPLIT_EXPR: M,
    DATA_ATTR: F,
    ARIA_ATTR: X,
    IS_SCRIPT_OR_DATA: ee,
    ATTR_WHITESPACE: pe,
    CUSTOM_ELEMENT: ke
  } = Fr;
  let {
    IS_ALLOWED_URI: g
  } = Fr, Q = null;
  const de = J({}, [...Or, ...An, ...In, ...Rn, ...Dr]);
  let f = null;
  const se = J({}, [...Pr, ...vn, ...Hr, ...nn]);
  let G = Object.seal(Gn(null, {
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
  })), q = null, me = null;
  const ce = Object.seal(Gn(null, {
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
  let He = !0, Be = !0, ct = !1, It = !0, je = !1, yt = !0, Ge = !1, Je = !1, ut = !1, et = !1, Ze = !1, ht = !1, kt = !0, pt = !1;
  const Ft = "user-content-";
  let dt = !0, tt = !1, E = {}, _ = null;
  const V = J({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let Y = null;
  const ne = J({}, ["audio", "video", "img", "source", "image", "track"]);
  let Te = null;
  const Fe = J({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), _e = "http://www.w3.org/1998/Math/MathML", qe = "http://www.w3.org/2000/svg", ye = "http://www.w3.org/1999/xhtml";
  let he = ye, re = !1, fe = null;
  const _t = J({}, [_e, qe, ye], xn);
  let Ve = J({}, ["mi", "mo", "mn", "ms", "mtext"]), en = J({}, ["annotation-xml"]);
  const La = J({}, ["title", "style", "font", "a", "script"]);
  let Ut = null;
  const Oa = ["application/xhtml+xml", "text/html"], Da = "text/html";
  let we = null, Rt = null;
  const Pa = n.createElement("form"), Er = function(C) {
    return C instanceof RegExp || C instanceof Function;
  }, Tn = function() {
    let C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Rt && Rt === C)) {
      if ((!C || typeof C != "object") && (C = {}), C = gt(C), Ut = // eslint-disable-next-line unicorn/prefer-includes
      Oa.indexOf(C.PARSER_MEDIA_TYPE) === -1 ? Da : C.PARSER_MEDIA_TYPE, we = Ut === "application/xhtml+xml" ? xn : cn, Q = Ke(C, "ALLOWED_TAGS") ? J({}, C.ALLOWED_TAGS, we) : de, f = Ke(C, "ALLOWED_ATTR") ? J({}, C.ALLOWED_ATTR, we) : se, fe = Ke(C, "ALLOWED_NAMESPACES") ? J({}, C.ALLOWED_NAMESPACES, xn) : _t, Te = Ke(C, "ADD_URI_SAFE_ATTR") ? J(gt(Fe), C.ADD_URI_SAFE_ATTR, we) : Fe, Y = Ke(C, "ADD_DATA_URI_TAGS") ? J(gt(ne), C.ADD_DATA_URI_TAGS, we) : ne, _ = Ke(C, "FORBID_CONTENTS") ? J({}, C.FORBID_CONTENTS, we) : V, q = Ke(C, "FORBID_TAGS") ? J({}, C.FORBID_TAGS, we) : gt({}), me = Ke(C, "FORBID_ATTR") ? J({}, C.FORBID_ATTR, we) : gt({}), E = Ke(C, "USE_PROFILES") ? C.USE_PROFILES : !1, He = C.ALLOW_ARIA_ATTR !== !1, Be = C.ALLOW_DATA_ATTR !== !1, ct = C.ALLOW_UNKNOWN_PROTOCOLS || !1, It = C.ALLOW_SELF_CLOSE_IN_ATTR !== !1, je = C.SAFE_FOR_TEMPLATES || !1, yt = C.SAFE_FOR_XML !== !1, Ge = C.WHOLE_DOCUMENT || !1, et = C.RETURN_DOM || !1, Ze = C.RETURN_DOM_FRAGMENT || !1, ht = C.RETURN_TRUSTED_TYPE || !1, ut = C.FORCE_BODY || !1, kt = C.SANITIZE_DOM !== !1, pt = C.SANITIZE_NAMED_PROPS || !1, dt = C.KEEP_CONTENT !== !1, tt = C.IN_PLACE || !1, g = C.ALLOWED_URI_REGEXP || Pi, he = C.NAMESPACE || ye, Ve = C.MATHML_TEXT_INTEGRATION_POINTS || Ve, en = C.HTML_INTEGRATION_POINTS || en, G = C.CUSTOM_ELEMENT_HANDLING || {}, C.CUSTOM_ELEMENT_HANDLING && Er(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (G.tagNameCheck = C.CUSTOM_ELEMENT_HANDLING.tagNameCheck), C.CUSTOM_ELEMENT_HANDLING && Er(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (G.attributeNameCheck = C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), C.CUSTOM_ELEMENT_HANDLING && typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (G.allowCustomizedBuiltInElements = C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), je && (Be = !1), Ze && (et = !0), E && (Q = J({}, Dr), f = [], E.html === !0 && (J(Q, Or), J(f, Pr)), E.svg === !0 && (J(Q, An), J(f, vn), J(f, nn)), E.svgFilters === !0 && (J(Q, In), J(f, vn), J(f, nn)), E.mathMl === !0 && (J(Q, Rn), J(f, Hr), J(f, nn))), C.ADD_TAGS && (typeof C.ADD_TAGS == "function" ? ce.tagCheck = C.ADD_TAGS : (Q === de && (Q = gt(Q)), J(Q, C.ADD_TAGS, we))), C.ADD_ATTR && (typeof C.ADD_ATTR == "function" ? ce.attributeCheck = C.ADD_ATTR : (f === se && (f = gt(f)), J(f, C.ADD_ATTR, we))), C.ADD_URI_SAFE_ATTR && J(Te, C.ADD_URI_SAFE_ATTR, we), C.FORBID_CONTENTS && (_ === V && (_ = gt(_)), J(_, C.FORBID_CONTENTS, we)), dt && (Q["#text"] = !0), Ge && J(Q, ["html", "head", "body"]), Q.table && (J(Q, ["tbody"]), delete q.tbody), C.TRUSTED_TYPES_POLICY) {
        if (typeof C.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Gt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof C.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Gt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        P = C.TRUSTED_TYPES_POLICY, L = P.createHTML("");
      } else
        P === void 0 && (P = Ss(p, i)), P !== null && typeof L == "string" && (L = P.createHTML(""));
      Re && Re(C), Rt = C;
    }
  }, Tr = J({}, [...An, ...In, ...hs]), Sr = J({}, [...Rn, ...ps]), Ha = function(C) {
    let b = k(C);
    (!b || !b.tagName) && (b = {
      namespaceURI: he,
      tagName: "template"
    });
    const O = cn(C.tagName), ue = cn(b.tagName);
    return fe[C.namespaceURI] ? C.namespaceURI === qe ? b.namespaceURI === ye ? O === "svg" : b.namespaceURI === _e ? O === "svg" && (ue === "annotation-xml" || Ve[ue]) : !!Tr[O] : C.namespaceURI === _e ? b.namespaceURI === ye ? O === "math" : b.namespaceURI === qe ? O === "math" && en[ue] : !!Sr[O] : C.namespaceURI === ye ? b.namespaceURI === qe && !en[ue] || b.namespaceURI === _e && !Ve[ue] ? !1 : !Sr[O] && (La[O] || !Tr[O]) : !!(Ut === "application/xhtml+xml" && fe[C.namespaceURI]) : !1;
  }, nt = function(C) {
    zt(t.removed, {
      element: C
    });
    try {
      k(C).removeChild(C);
    } catch {
      R(C);
    }
  }, xt = function(C, b) {
    try {
      zt(t.removed, {
        attribute: b.getAttributeNode(C),
        from: b
      });
    } catch {
      zt(t.removed, {
        attribute: null,
        from: b
      });
    }
    if (b.removeAttribute(C), C === "is")
      if (et || Ze)
        try {
          nt(b);
        } catch {
        }
      else
        try {
          b.setAttribute(C, "");
        } catch {
        }
  }, kr = function(C) {
    let b = null, O = null;
    if (ut)
      C = "<remove></remove>" + C;
    else {
      const ge = bn(C, /^[\r\n\t ]+/);
      O = ge && ge[0];
    }
    Ut === "application/xhtml+xml" && he === ye && (C = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + C + "</body></html>");
    const ue = P ? P.createHTML(C) : C;
    if (he === ye)
      try {
        b = new m().parseFromString(ue, Ut);
      } catch {
      }
    if (!b || !b.documentElement) {
      b = y.createDocument(he, "template", null);
      try {
        b.documentElement.innerHTML = re ? L : ue;
      } catch {
      }
    }
    const xe = b.body || b.documentElement;
    return C && O && xe.insertBefore(n.createTextNode(O), xe.childNodes[0] || null), he === ye ? z.call(b, Ge ? "html" : "body")[0] : Ge ? b.documentElement : xe;
  }, _r = function(C) {
    return U.call(
      C.ownerDocument || C,
      C,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, Sn = function(C) {
    return C instanceof d && (typeof C.nodeName != "string" || typeof C.textContent != "string" || typeof C.removeChild != "function" || !(C.attributes instanceof u) || typeof C.removeAttribute != "function" || typeof C.setAttribute != "function" || typeof C.namespaceURI != "string" || typeof C.insertBefore != "function" || typeof C.hasChildNodes != "function");
  }, xr = function(C) {
    return typeof o == "function" && C instanceof o;
  };
  function ft(H, C, b) {
    tn(H, (O) => {
      O.call(t, C, b, Rt);
    });
  }
  const br = function(C) {
    let b = null;
    if (ft(A.beforeSanitizeElements, C, null), Sn(C))
      return nt(C), !0;
    const O = we(C.nodeName);
    if (ft(A.uponSanitizeElement, C, {
      tagName: O,
      allowedTags: Q
    }), yt && C.hasChildNodes() && !xr(C.firstElementChild) && Ie(/<[/\w!]/g, C.innerHTML) && Ie(/<[/\w!]/g, C.textContent) || C.nodeType === Wt.progressingInstruction || yt && C.nodeType === Wt.comment && Ie(/<[/\w]/g, C.data))
      return nt(C), !0;
    if (!(ce.tagCheck instanceof Function && ce.tagCheck(O)) && (!Q[O] || q[O])) {
      if (!q[O] && Ir(O) && (G.tagNameCheck instanceof RegExp && Ie(G.tagNameCheck, O) || G.tagNameCheck instanceof Function && G.tagNameCheck(O)))
        return !1;
      if (dt && !_[O]) {
        const ue = k(C) || C.parentNode, xe = D(C) || C.childNodes;
        if (xe && ue) {
          const ge = xe.length;
          for (let Ne = ge - 1; Ne >= 0; --Ne) {
            const mt = T(xe[Ne], !0);
            mt.__removalCount = (C.__removalCount || 0) + 1, ue.insertBefore(mt, S(C));
          }
        }
      }
      return nt(C), !0;
    }
    return C instanceof l && !Ha(C) || (O === "noscript" || O === "noembed" || O === "noframes") && Ie(/<\/no(script|embed|frames)/i, C.innerHTML) ? (nt(C), !0) : (je && C.nodeType === Wt.text && (b = C.textContent, tn([N, v, M], (ue) => {
      b = Bt(b, ue, " ");
    }), C.textContent !== b && (zt(t.removed, {
      element: C.cloneNode()
    }), C.textContent = b)), ft(A.afterSanitizeElements, C, null), !1);
  }, Ar = function(C, b, O) {
    if (kt && (b === "id" || b === "name") && (O in n || O in Pa))
      return !1;
    if (!(Be && !me[b] && Ie(F, b))) {
      if (!(He && Ie(X, b))) {
        if (!(ce.attributeCheck instanceof Function && ce.attributeCheck(b, C))) {
          if (!f[b] || me[b]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Ir(C) && (G.tagNameCheck instanceof RegExp && Ie(G.tagNameCheck, C) || G.tagNameCheck instanceof Function && G.tagNameCheck(C)) && (G.attributeNameCheck instanceof RegExp && Ie(G.attributeNameCheck, b) || G.attributeNameCheck instanceof Function && G.attributeNameCheck(b, C)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              b === "is" && G.allowCustomizedBuiltInElements && (G.tagNameCheck instanceof RegExp && Ie(G.tagNameCheck, O) || G.tagNameCheck instanceof Function && G.tagNameCheck(O)))
            ) return !1;
          } else if (!Te[b]) {
            if (!Ie(g, Bt(O, pe, ""))) {
              if (!((b === "src" || b === "xlink:href" || b === "href") && C !== "script" && os(O, "data:") === 0 && Y[C])) {
                if (!(ct && !Ie(ee, Bt(O, pe, "")))) {
                  if (O)
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
    return C !== "annotation-xml" && bn(C, ke);
  }, Rr = function(C) {
    ft(A.beforeSanitizeAttributes, C, null);
    const {
      attributes: b
    } = C;
    if (!b || Sn(C))
      return;
    const O = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: f,
      forceKeepAttr: void 0
    };
    let ue = b.length;
    for (; ue--; ) {
      const xe = b[ue], {
        name: ge,
        namespaceURI: Ne,
        value: mt
      } = xe, vt = we(ge), kn = mt;
      let Se = ge === "value" ? kn : ls(kn);
      if (O.attrName = vt, O.attrValue = Se, O.keepAttr = !0, O.forceKeepAttr = void 0, ft(A.uponSanitizeAttribute, C, O), Se = O.attrValue, pt && (vt === "id" || vt === "name") && (xt(ge, C), Se = Ft + Se), yt && Ie(/((--!?|])>)|<\/(style|title|textarea)/i, Se)) {
        xt(ge, C);
        continue;
      }
      if (vt === "attributename" && bn(Se, "href")) {
        xt(ge, C);
        continue;
      }
      if (O.forceKeepAttr)
        continue;
      if (!O.keepAttr) {
        xt(ge, C);
        continue;
      }
      if (!It && Ie(/\/>/i, Se)) {
        xt(ge, C);
        continue;
      }
      je && tn([N, v, M], (Nr) => {
        Se = Bt(Se, Nr, " ");
      });
      const vr = we(C.nodeName);
      if (!Ar(vr, vt, Se)) {
        xt(ge, C);
        continue;
      }
      if (P && typeof p == "object" && typeof p.getAttributeType == "function" && !Ne)
        switch (p.getAttributeType(vr, vt)) {
          case "TrustedHTML": {
            Se = P.createHTML(Se);
            break;
          }
          case "TrustedScriptURL": {
            Se = P.createScriptURL(Se);
            break;
          }
        }
      if (Se !== kn)
        try {
          Ne ? C.setAttributeNS(Ne, ge, Se) : C.setAttribute(ge, Se), Sn(C) ? nt(C) : Lr(t.removed);
        } catch {
          xt(ge, C);
        }
    }
    ft(A.afterSanitizeAttributes, C, null);
  }, Fa = function H(C) {
    let b = null;
    const O = _r(C);
    for (ft(A.beforeSanitizeShadowDOM, C, null); b = O.nextNode(); )
      ft(A.uponSanitizeShadowNode, b, null), br(b), Rr(b), b.content instanceof a && H(b.content);
    ft(A.afterSanitizeShadowDOM, C, null);
  };
  return t.sanitize = function(H) {
    let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, b = null, O = null, ue = null, xe = null;
    if (re = !H, re && (H = "<!-->"), typeof H != "string" && !xr(H))
      if (typeof H.toString == "function") {
        if (H = H.toString(), typeof H != "string")
          throw Gt("dirty is not a string, aborting");
      } else
        throw Gt("toString is not a function");
    if (!t.isSupported)
      return H;
    if (Je || Tn(C), t.removed = [], typeof H == "string" && (tt = !1), tt) {
      if (H.nodeName) {
        const mt = we(H.nodeName);
        if (!Q[mt] || q[mt])
          throw Gt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (H instanceof o)
      b = kr("<!---->"), O = b.ownerDocument.importNode(H, !0), O.nodeType === Wt.element && O.nodeName === "BODY" || O.nodeName === "HTML" ? b = O : b.appendChild(O);
    else {
      if (!et && !je && !Ge && // eslint-disable-next-line unicorn/prefer-includes
      H.indexOf("<") === -1)
        return P && ht ? P.createHTML(H) : H;
      if (b = kr(H), !b)
        return et ? null : ht ? L : "";
    }
    b && ut && nt(b.firstChild);
    const ge = _r(tt ? H : b);
    for (; ue = ge.nextNode(); )
      br(ue), Rr(ue), ue.content instanceof a && Fa(ue.content);
    if (tt)
      return H;
    if (et) {
      if (Ze)
        for (xe = Z.call(b.ownerDocument); b.firstChild; )
          xe.appendChild(b.firstChild);
      else
        xe = b;
      return (f.shadowroot || f.shadowrootmode) && (xe = B.call(r, xe, !0)), xe;
    }
    let Ne = Ge ? b.outerHTML : b.innerHTML;
    return Ge && Q["!doctype"] && b.ownerDocument && b.ownerDocument.doctype && b.ownerDocument.doctype.name && Ie(Hi, b.ownerDocument.doctype.name) && (Ne = "<!DOCTYPE " + b.ownerDocument.doctype.name + `>
` + Ne), je && tn([N, v, M], (mt) => {
      Ne = Bt(Ne, mt, " ");
    }), P && ht ? P.createHTML(Ne) : Ne;
  }, t.setConfig = function() {
    let H = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Tn(H), Je = !0;
  }, t.clearConfig = function() {
    Rt = null, Je = !1;
  }, t.isValidAttribute = function(H, C, b) {
    Rt || Tn({});
    const O = we(H), ue = we(C);
    return Ar(O, ue, b);
  }, t.addHook = function(H, C) {
    typeof C == "function" && zt(A[H], C);
  }, t.removeHook = function(H, C) {
    if (C !== void 0) {
      const b = as(A[H], C);
      return b === -1 ? void 0 : ss(A[H], b, 1)[0];
    }
    return Lr(A[H]);
  }, t.removeHooks = function(H) {
    A[H] = [];
  }, t.removeAllHooks = function() {
    A = Ur();
  }, t;
}
var ks = Fi();
function _s(e) {
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
function un(e, t = !1) {
  return e;
}
function xs(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function zr(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || _s(e));
  } catch {
    return !1;
  }
}
function bs() {
  ks.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !zr(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !zr(n) && e.removeAttribute("src");
    }
  });
}
bs();
const Oe = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, $n = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, be = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, Q1 = (e) => e === Oe.SUBMITTED || e === Oe.STREAMING, J1 = (e) => e === Oe.IDLE, eh = (e) => e === Oe.ERROR, th = (e) => e === be.PROCESSING, nh = (e) => e === be.COMPLETED, rh = (e) => e === be.ERROR;
function As() {
  const [e, t] = te([]), [n, r] = te(!1), [i, a] = te(!1), [s, o] = te(""), [l, c] = te(!1), [, u] = te(
    /* @__PURE__ */ new Map()
  ), [, d] = te(
    /* @__PURE__ */ new Map()
  ), m = Tt(null), p = Tt(""), w = ae(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), T = at(
    () => (v, M) => M === !1 ? Ee.isErrorMessage(v) ? be.ERROR : be.COMPLETED : Ee.isCompletedMessage(v) ? be.COMPLETED : Ee.isErrorMessage(v) ? be.ERROR : be.PROCESSING,
    []
  ), R = at(
    () => (v) => Ee.extractDuration(v),
    []
  ), S = at(
    () => (v) => Ee.cleanReasoningContent(v),
    []
  ), D = at(
    () => (v, M) => {
      switch (Ee.getMessageType(v, M)) {
        case W.MESSAGE_TYPES.ERROR:
          return "Error";
        case W.MESSAGE_TYPES.COMPLETED:
          return "Completed";
        case W.MESSAGE_TYPES.THOUGHT:
          return W.UI_TEXT.THOUGHT;
        case W.MESSAGE_TYPES.THINKING:
        default:
          return W.UI_TEXT.THINKING_ELLIPSIS;
      }
    },
    []
  ), k = at(
    () => (v, M) => M === !1 ? v.includes(W.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : v.includes(W.COMPLETED_MARKER) || v.includes("✅") ? "Tool Completed" : v.includes(W.ERROR_MARKER) ? "Tool Error" : (v.includes(W.HANDLING_MARKER), "Tool Processing..."),
    []
  ), P = at(
    () => (v, M) => M === !1 ? v.includes(W.ERROR_MARKER) ? be.ERROR : be.COMPLETED : v.includes(W.COMPLETED_MARKER) || v.includes("✅") ? be.COMPLETED : v.includes(W.ERROR_MARKER) ? be.ERROR : be.PROCESSING,
    []
  ), L = ae(
    (v, M) => {
      const X = un(M, v === "assistant");
      t((ee) => [
        ...ee,
        {
          id: w(),
          role: v,
          content: X,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [w]
  ), y = ae(() => {
    if (m.current && p.current) {
      const v = un(p.current, !0);
      return t(
        (M) => M.map(
          (F) => F.id === m.current ? {
            ...F,
            content: v,
            isStreaming: !1
          } : F
        )
      ), m.current = null, p.current = "", o(""), !0;
    }
    return !1;
  }, []), U = ae((v) => {
    const M = un(v, !0);
    if (m.current)
      p.current += M, o(p.current), t(
        (F) => F.map(
          (X) => X.id === m.current ? {
            ...X,
            content: p.current,
            isStreaming: !0
          } : X
        )
      );
    else {
      a(!1);
      const F = w();
      m.current = F, p.current = M, o(M);
      const X = {
        id: F,
        role: "assistant",
        content: M,
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      t((ee) => [...ee, X]);
    }
  }, [w]), Z = ae(
    (v, M, F) => {
      const { callId: X } = F || {};
      if (c(v), !X) return;
      const ee = Ee.isThinkingMessage(M) && !M.includes("for") && !M.includes("seconds"), pe = Ee.isThinkingMessage(M) && M.includes("for") && M.includes("seconds"), ke = Ee.isHandlingMessage(M), g = Ee.isCompletedMessage(M), Q = Ee.isErrorMessage(M);
      (ee || pe) && d((de) => {
        const f = new Map(de), se = f.get(X);
        if (ee && !se) {
          y();
          const G = w();
          f.set(X, G);
          const q = {
            id: G,
            role: "reasoning",
            content: M,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          t((me) => [...me, q]);
        } else pe && se ? (t(
          (G) => G.map(
            (q) => q.id === se ? {
              ...q,
              content: M,
              isStreaming: !1
            } : q
          )
        ), f.delete(X)) : se && ee && t(
          (G) => G.map(
            (q) => q.id === se ? {
              ...q,
              content: M,
              isStreaming: !0
            } : q
          )
        );
        return f;
      }), u((de) => {
        const f = new Map(de), se = f.get(X);
        if (ke && !se) {
          y();
          const G = M.match(
            W.PATTERNS.HANDLING_TOOL
          ), q = G ? G[1] : "Unknown Tool", me = w();
          f.set(X, me);
          const ce = {
            id: me,
            role: "tooling",
            content: M,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0,
            toolData: {
              ...F,
              toolName: q,
              callId: X,
              status: be.PROCESSING
            }
          };
          t((He) => [...He, ce]);
        } else if ((g || Q) && se) {
          const G = M.match(
            W.PATTERNS.COMPLETED_OR_ERROR_TOOL
          ), q = G ? G[1] : "Unknown Tool";
          t(
            (me) => me.map(
              (ce) => ce.id === se ? {
                ...ce,
                content: M,
                isStreaming: !1,
                toolData: {
                  ...ce.toolData,
                  toolName: q,
                  status: Q ? be.ERROR : be.COMPLETED,
                  callId: X ?? ""
                }
              } : ce
            )
          ), f.delete(X);
        } else se && l && !g && !Q && t(
          (G) => G.map(
            (q) => q.id === se ? {
              ...q,
              content: M,
              isStreaming: !0
            } : q
          )
        );
        return f;
      });
    },
    [y, w]
  ), z = ae(() => {
    r(!1), a(!1), y();
  }, [y]), B = ae(
    (v) => {
      console.error("Chat error:", v), r(!1), a(!1), y(), L("system", `❌ Chat error: ${v}`);
    },
    [L, y]
  ), A = ae(() => {
    c(!1);
  }, []), N = ae(() => {
    r(!1), a(!1), m.current = null, p.current = "", o(""), A();
  }, [A]);
  return {
    // State
    messages: e,
    setMessages: t,
    isStreaming: n,
    setIsStreaming: r,
    isThinking: i,
    setIsThinking: a,
    streamingContent: s,
    isHandlingTool: l,
    currentAssistantMessageIdRef: m,
    // Helper functions
    getReasoningStatus: T,
    getReasoningDuration: R,
    getReasoningContentOnly: S,
    getReasoningTitle: D,
    getToolingTitle: k,
    getToolingStatus: P,
    // Actions
    addMessage: L,
    handleSetMessage: U,
    handleReasoningUpdate: Z,
    handleChatFinished: z,
    handleChatError: B,
    stopGeneration: N,
    finalizeCurrentStreamingMessage: y
  };
}
function Is({ initialMode: e = "sidebar" }) {
  const [t, n] = te(!1), [r, i] = te(!1), [a, s] = te(e), [o, l] = te(Oe.IDLE), [c, u] = te($n.IDLE), [d, m] = te(!1), [p, w] = te(null), [T, R] = te(null), [S, D] = te(null), [k, P] = te(!1), L = ae(() => {
    n(!0);
  }, []), y = ae(() => {
    n(!1);
  }, []), U = ae(() => {
    i((z) => !z);
  }, []), Z = ae(() => {
    s((z) => z === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  return Ye(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const z = (B) => {
      B.key === "Escape" && a === "modal" && t && y();
    };
    if (a === "modal" && t)
      return document.addEventListener("keydown", z), () => document.removeEventListener("keydown", z);
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
    currentThreadId: T,
    setCurrentThreadId: R,
    currentConvUuid: S,
    setCurrentConvUuid: D,
    // Dev mode state
    isDevSettingsOpen: k,
    setIsDevSettingsOpen: P,
    // Actions
    openModal: L,
    closeModal: y,
    toggleCollapse: U,
    toggleFullscreen: Z
  };
}
async function ih(e, t, n) {
  const r = new URLSearchParams();
  n != null && n.includeArchived && r.append("includeArchived", "true"), n != null && n.limit && r.append("limit", n.limit.toString());
  const i = `${e}/v1/api/threads/user/${t}${r.toString() ? `?${r.toString()}` : ""}`, a = await fetch(i);
  if (!a.ok) {
    const o = await a.json().catch(() => ({
      error: "Failed to fetch threads"
    }));
    throw new Error(o.error || "Failed to fetch threads");
  }
  return (await a.json()).threads;
}
async function ah(e, t) {
  const n = `${e}/v1/api/threads/conv/${t}`, r = await fetch(n);
  if (!r.ok) {
    const i = await r.json().catch(() => ({
      error: "Thread not found"
    }));
    throw new Error(i.error || "Thread not found");
  }
  return r.json();
}
async function Rs(e, t, n) {
  const r = `${e}/v1/api/messages/thread/${t}?format=client`, i = {};
  n != null && n.userMpAuthToken && (i.Authorization = `Bearer ${n.userMpAuthToken}`), n != null && n.chatServerKey && (i["X-Chat-Server-Key"] = n.chatServerKey);
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
async function sh(e, t) {
  const n = `${e}/v1/api/messages/conv/${t}?format=client`, r = await fetch(n);
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
async function oh(e, t, n, r) {
  const i = `${e}/v1/api/threads`, a = await fetch(i, {
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
function vs({
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
  const u = Tt(!1);
  return Ye(() => {
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
          const w = await Rs(t, p.id, {
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
class Ns {
  // 10MB
  constructor(t) {
    $(this, "config");
    $(this, "defaultFolder", "chat-uploads");
    $(this, "defaultMaxFileSize", 10 * 1024 * 1024);
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
      }), o.open("POST", `${this.config.apiUrl}/upload`), Object.entries(i).forEach(([l, c]) => {
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
      throw new Error(`File ${t.name} is too large. Maximum size is ${this.formatFileSize(this.config.maxFileSize || this.defaultMaxFileSize)}`);
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
    return this.config.userMpAuthToken && (t.Authorization = `Bearer ${this.config.userMpAuthToken}`), this.config.chatServerKey && (t["X-Chat-Server-Key"] = this.config.chatServerKey), t;
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
const Ms = {
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
}, Ui = {
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
}, Ls = {
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
    if (!Ui.isValidWebSocketUrl(e))
      throw new Error(`Invalid WebSocket URL: ${e}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (e) => e.trim().length > 0
}, zi = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...e) => e.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (e, t, n, r, i) => zi.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${e}`,
    t && `chat-wrapper--${t}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    e === "embedded" && i && "chat-wrapper--constrained"
  )
}, Bi = {
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
  getUserFriendlyErrorMessage: (e) => Bi.isNetworkError(e) ? "Connection error. Please check your internet connection and try again." : e.message.includes("authentication") || e.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : e.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, st = {
  state: Ms,
  url: Ui,
  validation: Ls,
  css: zi,
  error: Bi
};
class Br extends rr {
  constructor(n) {
    super(n);
    $(this, "resetTimeoutId", null);
    $(this, "resetErrorBoundary", () => {
      this.resetTimeoutId && clearTimeout(this.resetTimeoutId), this.setState({
        hasError: !1,
        error: void 0,
        errorInfo: void 0
      });
    });
    $(this, "handleRetry", () => {
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
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ h("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: st.error.getUserFriendlyErrorMessage(r) }),
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
      })() && /* @__PURE__ */ I("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ h("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ h("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : i;
  }
}
class Os extends rr {
  constructor(n) {
    super(n);
    $(this, "retryCount", 0);
    $(this, "retryTimeoutId", null);
    $(this, "handleRetry", () => {
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
    $(this, "handleManualReset", () => {
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
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || st.error.isNetworkError(r)) ? /* @__PURE__ */ h("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ I("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ h("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ h("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ I(Yt, { children: [
        this.retryCount < s && /* @__PURE__ */ I(
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
      })() && /* @__PURE__ */ I("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ h("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ h("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
}
class Ds extends rr {
  constructor(n) {
    super(n);
    $(this, "handleRetry", () => {
      this.setState({
        hasError: !1,
        error: void 0,
        failedFiles: void 0
      }), this.props.onRetry && this.props.onRetry();
    });
    $(this, "handleDismiss", () => {
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
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ h("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ I("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ h("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ h("ul", { className: "chat-wrapper__failed-files-list", children: i.map((l, c) => /* @__PURE__ */ h("li", { className: "chat-wrapper__failed-file", children: l }, c)) })
      ] }),
      /* @__PURE__ */ I("div", { className: "chat-wrapper__error-actions", children: [
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
      })() && /* @__PURE__ */ I("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ h("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ h("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
  getFileUploadErrorMessage(n) {
    return n.message.includes("size") || n.message.includes("large") ? "File size is too large. Please try with smaller files." : n.message.includes("type") || n.message.includes("format") ? "File type is not supported. Please try with different file types." : n.message.includes("network") || n.message.includes("connection") ? "Network error during upload. Please check your connection and try again." : n.message.includes("timeout") ? "Upload timed out. Please try again with smaller files or better connection." : "Failed to upload files. Please try again.";
  }
}
const Ps = ({
  className: e,
  onClick: t,
  size: n = 24,
  color: r = "currentColor"
}) => /* @__PURE__ */ I(
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
), Hs = ({
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
), Fs = ({
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
), Us = ({
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
), Gi = ({
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
), zs = ({
  className: e,
  onClick: t,
  size: n = 18,
  color: r = "currentColor"
}) => /* @__PURE__ */ I(
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
), Bs = ({
  mode: e,
  appName: t,
  bubbleText: n,
  showBubbleText: r = !0,
  onClick: i
}) => {
  const a = e === "modal" ? `Open ${t}` : `Expand ${t}`;
  return /* @__PURE__ */ I(
    "button",
    {
      className: "chat-wrapper__bubble-button",
      onClick: i,
      title: a,
      children: [
        /* @__PURE__ */ h(Ps, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ h("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, Gs = ({
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
      children: /* @__PURE__ */ h(Hs, { size: 20 })
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
          children: /* @__PURE__ */ h(Fs, { size: 20, isFullscreen: p })
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
      children: /* @__PURE__ */ h(Us, { size: 20 })
    }
  ) : null;
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ h("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ h("h2", { className: "chat-wrapper__title", children: e }) }),
    /* @__PURE__ */ I("div", { className: "chat-wrapper__header-controls", children: [
      !i || !l ? null : /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__settings-button",
          onClick: l,
          title: "Developer Settings",
          children: /* @__PURE__ */ h(Gi, { size: 16 })
        }
      ),
      u(),
      d(),
      c()
    ] })
  ] });
};
function Vs(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Ws = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, $s = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, js = {};
function Gr(e, t) {
  return (js.jsx ? $s : Ws).test(e);
}
const Zs = /[ \t\n\f\r]/g;
function qs(e) {
  return typeof e == "object" ? e.type === "text" ? Vr(e.value) : !1 : Vr(e);
}
function Vr(e) {
  return e.replace(Zs, "") === "";
}
class Qt {
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
Qt.prototype.normal = {};
Qt.prototype.property = {};
Qt.prototype.space = void 0;
function Vi(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new Qt(n, r, t);
}
function jn(e) {
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
let Ks = 0;
const K = At(), Ce = At(), Zn = At(), x = At(), oe = At(), Ot = At(), Ue = At();
function At() {
  return 2 ** ++Ks;
}
const qn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: K,
  booleanish: Ce,
  commaOrSpaceSeparated: Ue,
  commaSeparated: Ot,
  number: x,
  overloadedBoolean: Zn,
  spaceSeparated: oe
}, Symbol.toStringTag, { value: "Module" })), Nn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(qn)
);
class ar extends Pe {
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
    if (super(t, n), Wr(this, "space", i), typeof r == "number")
      for (; ++a < Nn.length; ) {
        const s = Nn[a];
        Wr(this, Nn[a], (r & qn[s]) === qn[s]);
      }
  }
}
ar.prototype.defined = !0;
function Wr(e, t, n) {
  n && (e[t] = n);
}
function Pt(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new ar(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[jn(r)] = r, n[jn(a.attribute)] = r;
  }
  return new Qt(t, n, e.space);
}
const Wi = Pt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Ce,
    ariaAutoComplete: null,
    ariaBusy: Ce,
    ariaChecked: Ce,
    ariaColCount: x,
    ariaColIndex: x,
    ariaColSpan: x,
    ariaControls: oe,
    ariaCurrent: null,
    ariaDescribedBy: oe,
    ariaDetails: null,
    ariaDisabled: Ce,
    ariaDropEffect: oe,
    ariaErrorMessage: null,
    ariaExpanded: Ce,
    ariaFlowTo: oe,
    ariaGrabbed: Ce,
    ariaHasPopup: null,
    ariaHidden: Ce,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: oe,
    ariaLevel: x,
    ariaLive: null,
    ariaModal: Ce,
    ariaMultiLine: Ce,
    ariaMultiSelectable: Ce,
    ariaOrientation: null,
    ariaOwns: oe,
    ariaPlaceholder: null,
    ariaPosInSet: x,
    ariaPressed: Ce,
    ariaReadOnly: Ce,
    ariaRelevant: null,
    ariaRequired: Ce,
    ariaRoleDescription: oe,
    ariaRowCount: x,
    ariaRowIndex: x,
    ariaRowSpan: x,
    ariaSelected: Ce,
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
function $i(e, t) {
  return t in e ? e[t] : t;
}
function ji(e, t) {
  return $i(e, t.toLowerCase());
}
const Xs = Pt({
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
    accept: Ot,
    acceptCharset: oe,
    accessKey: oe,
    action: null,
    allow: null,
    allowFullScreen: K,
    allowPaymentRequest: K,
    allowUserMedia: K,
    alt: null,
    as: null,
    async: K,
    autoCapitalize: null,
    autoComplete: oe,
    autoFocus: K,
    autoPlay: K,
    blocking: oe,
    capture: null,
    charSet: null,
    checked: K,
    cite: null,
    className: oe,
    cols: x,
    colSpan: null,
    content: null,
    contentEditable: Ce,
    controls: K,
    controlsList: oe,
    coords: x | Ot,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: K,
    defer: K,
    dir: null,
    dirName: null,
    disabled: K,
    download: Zn,
    draggable: Ce,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: K,
    formTarget: null,
    headers: oe,
    height: x,
    hidden: Zn,
    high: x,
    href: null,
    hrefLang: null,
    htmlFor: oe,
    httpEquiv: oe,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: K,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: K,
    itemId: null,
    itemProp: oe,
    itemRef: oe,
    itemScope: K,
    itemType: oe,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: K,
    low: x,
    manifest: null,
    max: null,
    maxLength: x,
    media: null,
    method: null,
    min: null,
    minLength: x,
    multiple: K,
    muted: K,
    name: null,
    nonce: null,
    noModule: K,
    noValidate: K,
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
    open: K,
    optimum: x,
    pattern: null,
    ping: oe,
    placeholder: null,
    playsInline: K,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: K,
    referrerPolicy: null,
    rel: oe,
    required: K,
    reversed: K,
    rows: x,
    rowSpan: x,
    sandbox: oe,
    scope: null,
    scoped: K,
    seamless: K,
    selected: K,
    shadowRootClonable: K,
    shadowRootDelegatesFocus: K,
    shadowRootMode: null,
    shape: null,
    size: x,
    sizes: null,
    slot: null,
    span: x,
    spellCheck: Ce,
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
    typeMustMatch: K,
    useMap: null,
    value: Ce,
    width: x,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: oe,
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
    compact: K,
    // Lists. Use CSS to reduce space between items instead
    declare: K,
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
    noResize: K,
    // `<frame>`
    noHref: K,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: K,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: K,
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
    scrolling: Ce,
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
    disablePictureInPicture: K,
    disableRemotePlayback: K,
    prefix: null,
    property: null,
    results: x,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: ji
}), Ys = Pt({
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
    about: Ue,
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
    className: oe,
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
    download: K,
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
    g1: Ot,
    g2: Ot,
    glyphName: Ot,
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
    kernelMatrix: Ue,
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
    ping: oe,
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
    property: Ue,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Ue,
    rev: Ue,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Ue,
    requiredFeatures: Ue,
    requiredFonts: Ue,
    requiredFormats: Ue,
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
    strokeDashArray: Ue,
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
    systemLanguage: Ue,
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
    typeOf: Ue,
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
  transform: $i
}), Zi = Pt({
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
}), qi = Pt({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: ji
}), Ki = Pt({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), Qs = {
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
}, Js = /[A-Z]/g, $r = /-[a-z]/g, eo = /^data[-\w.:]+$/i;
function to(e, t) {
  const n = jn(t);
  let r = t, i = Pe;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && eo.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace($r, ro);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!$r.test(a)) {
        let s = a.replace(Js, no);
        s.charAt(0) !== "-" && (s = "-" + s), t = "data" + s;
      }
    }
    i = ar;
  }
  return new i(r, t);
}
function no(e) {
  return "-" + e.toLowerCase();
}
function ro(e) {
  return e.charAt(1).toUpperCase();
}
const io = Vi([Wi, Xs, Zi, qi, Ki], "html"), sr = Vi([Wi, Ys, Zi, qi, Ki], "svg");
function ao(e) {
  return e.join(" ").trim();
}
var fn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var or = {}, jr = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, so = /\n/g, oo = /^\s*/, lo = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, co = /^:\s*/, uo = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, ho = /^[;\s]*/, po = /^\s+|\s+$/g, fo = `
`, Zr = "/", qr = "*", bt = "", mo = "comment", go = "declaration", Co = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(w) {
    var T = w.match(so);
    T && (n += T.length);
    var R = w.lastIndexOf(fo);
    r = ~R ? w.length - R : r + w.length;
  }
  function a() {
    var w = { line: n, column: r };
    return function(T) {
      return T.position = new s(w), c(), T;
    };
  }
  function s(w) {
    this.start = w, this.end = { line: n, column: r }, this.source = t.source;
  }
  s.prototype.content = e;
  function o(w) {
    var T = new Error(
      t.source + ":" + n + ":" + r + ": " + w
    );
    if (T.reason = w, T.filename = t.source, T.line = n, T.column = r, T.source = e, !t.silent) throw T;
  }
  function l(w) {
    var T = w.exec(e);
    if (T) {
      var R = T[0];
      return i(R), e = e.slice(R.length), T;
    }
  }
  function c() {
    l(oo);
  }
  function u(w) {
    var T;
    for (w = w || []; T = d(); )
      T !== !1 && w.push(T);
    return w;
  }
  function d() {
    var w = a();
    if (!(Zr != e.charAt(0) || qr != e.charAt(1))) {
      for (var T = 2; bt != e.charAt(T) && (qr != e.charAt(T) || Zr != e.charAt(T + 1)); )
        ++T;
      if (T += 2, bt === e.charAt(T - 1))
        return o("End of comment missing");
      var R = e.slice(2, T - 2);
      return r += 2, i(R), e = e.slice(T), r += 2, w({
        type: mo,
        comment: R
      });
    }
  }
  function m() {
    var w = a(), T = l(lo);
    if (T) {
      if (d(), !l(co)) return o("property missing ':'");
      var R = l(uo), S = w({
        type: go,
        property: Kr(T[0].replace(jr, bt)),
        value: R ? Kr(R[0].replace(jr, bt)) : bt
      });
      return l(ho), S;
    }
  }
  function p() {
    var w = [];
    u(w);
    for (var T; T = m(); )
      T !== !1 && (w.push(T), u(w));
    return w;
  }
  return c(), p();
};
function Kr(e) {
  return e ? e.replace(po, bt) : bt;
}
var yo = fn && fn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(or, "__esModule", { value: !0 });
or.default = Eo;
var wo = yo(Co);
function Eo(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, wo.default)(e), i = typeof t == "function";
  return r.forEach(function(a) {
    if (a.type === "declaration") {
      var s = a.property, o = a.value;
      i ? t(s, o, a) : o && (n = n || {}, n[s] = o);
    }
  }), n;
}
var Cn = {};
Object.defineProperty(Cn, "__esModule", { value: !0 });
Cn.camelCase = void 0;
var To = /^--[a-zA-Z0-9_-]+$/, So = /-([a-z])/g, ko = /^[^-]+$/, _o = /^-(webkit|moz|ms|o|khtml)-/, xo = /^-(ms)-/, bo = function(e) {
  return !e || ko.test(e) || To.test(e);
}, Ao = function(e, t) {
  return t.toUpperCase();
}, Xr = function(e, t) {
  return "".concat(t, "-");
}, Io = function(e, t) {
  return t === void 0 && (t = {}), bo(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(xo, Xr) : e = e.replace(_o, Xr), e.replace(So, Ao));
};
Cn.camelCase = Io;
var Ro = fn && fn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, vo = Ro(or), No = Cn;
function Kn(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, vo.default)(e, function(r, i) {
    r && i && (n[(0, No.camelCase)(r, t)] = i);
  }), n;
}
Kn.default = Kn;
var Mo = Kn;
const Lo = /* @__PURE__ */ Xi(Mo), Yi = Qi("end"), lr = Qi("start");
function Qi(e) {
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
function Oo(e) {
  const t = lr(e), n = Yi(e);
  if (t && n)
    return { start: t, end: n };
}
function Zt(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Yr(e.position) : "start" in e || "end" in e ? Yr(e) : "line" in e || "column" in e ? Xn(e) : "";
}
function Xn(e) {
  return Qr(e && e.line) + ":" + Qr(e && e.column);
}
function Yr(e) {
  return Xn(e && e.start) + "-" + Xn(e && e.end);
}
function Qr(e) {
  return e && typeof e == "number" ? e : 1;
}
class Ae extends Error {
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
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = o ? o.line : void 0, this.name = Zt(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = s && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Ae.prototype.file = "";
Ae.prototype.name = "";
Ae.prototype.reason = "";
Ae.prototype.message = "";
Ae.prototype.stack = "";
Ae.prototype.column = void 0;
Ae.prototype.line = void 0;
Ae.prototype.ancestors = void 0;
Ae.prototype.cause = void 0;
Ae.prototype.fatal = void 0;
Ae.prototype.place = void 0;
Ae.prototype.ruleId = void 0;
Ae.prototype.source = void 0;
const cr = {}.hasOwnProperty, Do = /* @__PURE__ */ new Map(), Po = /[A-Z]/g, Ho = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Fo = /* @__PURE__ */ new Set(["td", "th"]), Ji = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Uo(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Zo(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = jo(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? sr : io,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = ea(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function ea(e, t, n) {
  if (t.type === "element")
    return zo(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return Bo(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return Vo(e, t, n);
  if (t.type === "mdxjsEsm")
    return Go(e, t);
  if (t.type === "root")
    return Wo(e, t, n);
  if (t.type === "text")
    return $o(e, t);
}
function zo(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = sr, e.schema = i), e.ancestors.push(t);
  const a = na(e, t.tagName, !1), s = qo(e, t);
  let o = hr(e, t);
  return Ho.has(t.tagName) && (o = o.filter(function(l) {
    return typeof l == "string" ? !qs(l) : !0;
  })), ta(e, s, a, t), ur(s, o), e.ancestors.pop(), e.schema = r, e.create(t, a, s, n);
}
function Bo(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Xt(e, t.position);
}
function Go(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Xt(e, t.position);
}
function Vo(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = sr, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : na(e, t.name, !0), s = Ko(e, t), o = hr(e, t);
  return ta(e, s, a, t), ur(s, o), e.ancestors.pop(), e.schema = r, e.create(t, a, s, n);
}
function Wo(e, t, n) {
  const r = {};
  return ur(r, hr(e, t)), e.create(t, e.Fragment, r, n);
}
function $o(e, t) {
  return t.value;
}
function ta(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function ur(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function jo(e, t, n) {
  return r;
  function r(i, a, s, o) {
    const c = Array.isArray(s.children) ? n : t;
    return o ? c(a, s, o) : c(a, s);
  }
}
function Zo(e, t) {
  return n;
  function n(r, i, a, s) {
    const o = Array.isArray(a.children), l = lr(r);
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
function qo(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && cr.call(t.properties, i)) {
      const a = Xo(e, i, t.properties[i]);
      if (a) {
        const [s, o] = a;
        e.tableCellAlignToStyle && s === "align" && typeof o == "string" && Fo.has(t.tagName) ? r = o : n[s] = o;
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
function Ko(e, t) {
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
        Xt(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const o = r.value.data.estree.body[0];
          o.type, a = e.evaluater.evaluateExpression(o.expression);
        } else
          Xt(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function hr(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Do;
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
    const o = ea(e, a, s);
    o !== void 0 && n.push(o);
  }
  return n;
}
function Xo(e, t, n) {
  const r = to(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Vs(n) : ao(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Yo(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Qo(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Qs[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Yo(e, t) {
  try {
    return Lo(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new Ae("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Ji + "#cannot-parse-style-attribute", i;
  }
}
function na(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let a = -1, s;
    for (; ++a < i.length; ) {
      const o = Gr(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
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
    r = Gr(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return cr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Xt(e);
}
function Xt(e, t) {
  const n = new Ae(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Ji + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Qo(e) {
  const t = {};
  let n;
  for (n in e)
    cr.call(e, n) && (t[Jo(n)] = e[n]);
  return t;
}
function Jo(e) {
  let t = e.replace(Po, el);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function el(e) {
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
}, tl = {};
function nl(e, t) {
  const n = tl, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return ra(e, r, i);
}
function ra(e, t, n) {
  if (rl(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Jr(e.children, t, n);
  }
  return Array.isArray(e) ? Jr(e, t, n) : "";
}
function Jr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = ra(e[i], t, n);
  return r.join("");
}
function rl(e) {
  return !!(e && typeof e == "object");
}
const ei = document.createElement("i");
function pr(e) {
  const t = "&" + e + ";";
  ei.innerHTML = t;
  const n = ei.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function lt(e, t, n, r) {
  const i = e.length;
  let a = 0, s;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    s = Array.from(r), s.unshift(t, n), e.splice(...s);
  else
    for (n && e.splice(t, n); a < r.length; )
      s = r.slice(a, a + 1e4), s.unshift(t, 0), e.splice(...s), a += 1e4, t += 1e4;
}
function We(e, t) {
  return e.length > 0 ? (lt(e, e.length, 0, t), e) : t;
}
const ti = {}.hasOwnProperty;
function il(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    al(t, e[n]);
  return t;
}
function al(e, t) {
  let n;
  for (n in t) {
    const i = (ti.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let s;
    if (a)
      for (s in a) {
        ti.call(i, s) || (i[s] = []);
        const o = a[s];
        sl(
          // @ts-expect-error Looks like a list.
          i[s],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function sl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  lt(e, 0, 0, r);
}
function ia(e, t) {
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
function Dt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const ot = St(/[A-Za-z]/), ze = St(/[\dA-Za-z]/), ol = St(/[#-'*+\--9=?A-Z^-~]/);
function Yn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Qn = St(/\d/), ll = St(/[\dA-Fa-f]/), cl = St(/[!-/:-@[-`{-~]/);
function j(e) {
  return e !== null && e < -2;
}
function De(e) {
  return e !== null && (e < 0 || e === 32);
}
function ie(e) {
  return e === -2 || e === -1 || e === 32;
}
const ul = St(new RegExp("\\p{P}|\\p{S}", "u")), hl = St(/\s/);
function St(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Ht(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let s = "";
    if (a === 37 && ze(e.charCodeAt(n + 1)) && ze(e.charCodeAt(n + 2)))
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
function le(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return s;
  function s(l) {
    return ie(l) ? (e.enter(n), o(l)) : t(l);
  }
  function o(l) {
    return ie(l) && a++ < i ? (e.consume(l), o) : (e.exit(n), t(l));
  }
}
const pl = {
  tokenize: dl
};
function dl(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), le(e, t, "linePrefix");
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
    return j(o) ? (e.consume(o), e.exit("chunkText"), a) : (e.consume(o), s);
  }
}
const fl = {
  tokenize: ml
}, ni = {
  tokenize: gl
};
function ml(e) {
  const t = this, n = [];
  let r = 0, i, a, s;
  return o;
  function o(k) {
    if (r < n.length) {
      const P = n[r];
      return t.containerState = P[1], e.attempt(P[0].continuation, l, c)(k);
    }
    return c(k);
  }
  function l(k) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && D();
      const P = t.events.length;
      let L = P, y;
      for (; L--; )
        if (t.events[L][0] === "exit" && t.events[L][1].type === "chunkFlow") {
          y = t.events[L][1].end;
          break;
        }
      S(r);
      let U = P;
      for (; U < t.events.length; )
        t.events[U][1].end = {
          ...y
        }, U++;
      return lt(t.events, L + 1, 0, t.events.slice(P)), t.events.length = U, c(k);
    }
    return o(k);
  }
  function c(k) {
    if (r === n.length) {
      if (!i)
        return m(k);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return w(k);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(ni, u, d)(k);
  }
  function u(k) {
    return i && D(), S(r), m(k);
  }
  function d(k) {
    return t.parser.lazy[t.now().line] = r !== n.length, s = t.now().offset, w(k);
  }
  function m(k) {
    return t.containerState = {}, e.attempt(ni, p, w)(k);
  }
  function p(k) {
    return r++, n.push([t.currentConstruct, t.containerState]), m(k);
  }
  function w(k) {
    if (k === null) {
      i && D(), S(0), e.consume(k);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: a
    }), T(k);
  }
  function T(k) {
    if (k === null) {
      R(e.exit("chunkFlow"), !0), S(0), e.consume(k);
      return;
    }
    return j(k) ? (e.consume(k), R(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, o) : (e.consume(k), T);
  }
  function R(k, P) {
    const L = t.sliceStream(k);
    if (P && L.push(null), k.previous = a, a && (a.next = k), a = k, i.defineSkip(k.start), i.write(L), t.parser.lazy[k.start.line]) {
      let y = i.events.length;
      for (; y--; )
        if (
          // The token starts before the line ending…
          i.events[y][1].start.offset < s && // …and either is not ended yet…
          (!i.events[y][1].end || // …or ends after it.
          i.events[y][1].end.offset > s)
        )
          return;
      const U = t.events.length;
      let Z = U, z, B;
      for (; Z--; )
        if (t.events[Z][0] === "exit" && t.events[Z][1].type === "chunkFlow") {
          if (z) {
            B = t.events[Z][1].end;
            break;
          }
          z = !0;
        }
      for (S(r), y = U; y < t.events.length; )
        t.events[y][1].end = {
          ...B
        }, y++;
      lt(t.events, Z + 1, 0, t.events.slice(U)), t.events.length = y;
    }
  }
  function S(k) {
    let P = n.length;
    for (; P-- > k; ) {
      const L = n[P];
      t.containerState = L[1], L[0].exit.call(t, e);
    }
    n.length = k;
  }
  function D() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function gl(e, t, n) {
  return le(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function ri(e) {
  if (e === null || De(e) || hl(e))
    return 1;
  if (ul(e))
    return 2;
}
function dr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const Jn = {
  name: "attention",
  resolveAll: Cl,
  tokenize: yl
};
function Cl(e, t) {
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
          ii(d, -l), ii(m, l), s = {
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
          }, c = [], e[r][1].end.offset - e[r][1].start.offset && (c = We(c, [["enter", e[r][1], t], ["exit", e[r][1], t]])), c = We(c, [["enter", i, t], ["enter", s, t], ["exit", s, t], ["enter", a, t]]), c = We(c, dr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), c = We(c, [["exit", a, t], ["enter", o, t], ["exit", o, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, c = We(c, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : u = 0, lt(e, r - 1, n - r + 3, c), n = r + c.length - u - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function yl(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = ri(r);
  let a;
  return s;
  function s(l) {
    return a = l, e.enter("attentionSequence"), o(l);
  }
  function o(l) {
    if (l === a)
      return e.consume(l), o;
    const c = e.exit("attentionSequence"), u = ri(l), d = !u || u === 2 && i || n.includes(l), m = !i || i === 2 && u || n.includes(r);
    return c._open = !!(a === 42 ? d : d && (i || !m)), c._close = !!(a === 42 ? m : m && (u || !d)), t(l);
  }
}
function ii(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const wl = {
  name: "autolink",
  tokenize: El
};
function El(e, t, n) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(p) {
    return ot(p) ? (e.consume(p), s) : p === 64 ? n(p) : c(p);
  }
  function s(p) {
    return p === 43 || p === 45 || p === 46 || ze(p) ? (r = 1, o(p)) : c(p);
  }
  function o(p) {
    return p === 58 ? (e.consume(p), r = 0, l) : (p === 43 || p === 45 || p === 46 || ze(p)) && r++ < 32 ? (e.consume(p), o) : (r = 0, c(p));
  }
  function l(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : p === null || p === 32 || p === 60 || Yn(p) ? n(p) : (e.consume(p), l);
  }
  function c(p) {
    return p === 64 ? (e.consume(p), u) : ol(p) ? (e.consume(p), c) : n(p);
  }
  function u(p) {
    return ze(p) ? d(p) : n(p);
  }
  function d(p) {
    return p === 46 ? (e.consume(p), r = 0, u) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : m(p);
  }
  function m(p) {
    if ((p === 45 || ze(p)) && r++ < 63) {
      const w = p === 45 ? m : d;
      return e.consume(p), w;
    }
    return n(p);
  }
}
const yn = {
  partial: !0,
  tokenize: Tl
};
function Tl(e, t, n) {
  return r;
  function r(a) {
    return ie(a) ? le(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || j(a) ? t(a) : n(a);
  }
}
const aa = {
  continuation: {
    tokenize: kl
  },
  exit: _l,
  name: "blockQuote",
  tokenize: Sl
};
function Sl(e, t, n) {
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
    return ie(s) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(s), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(s));
  }
}
function kl(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return ie(s) ? le(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s) : a(s);
  }
  function a(s) {
    return e.attempt(aa, t, n)(s);
  }
}
function _l(e) {
  e.exit("blockQuote");
}
const sa = {
  name: "characterEscape",
  tokenize: xl
};
function xl(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return cl(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const oa = {
  name: "characterReference",
  tokenize: bl
};
function bl(e, t, n) {
  const r = this;
  let i = 0, a, s;
  return o;
  function o(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), l;
  }
  function l(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), c) : (e.enter("characterReferenceValue"), a = 31, s = ze, u(d));
  }
  function c(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, s = ll, u) : (e.enter("characterReferenceValue"), a = 7, s = Qn, u(d));
  }
  function u(d) {
    if (d === 59 && i) {
      const m = e.exit("characterReferenceValue");
      return s === ze && !pr(r.sliceSerialize(m)) ? n(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return s(d) && i++ < a ? (e.consume(d), u) : n(d);
  }
}
const ai = {
  partial: !0,
  tokenize: Il
}, si = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Al
};
function Al(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: L
  };
  let a = 0, s = 0, o;
  return l;
  function l(y) {
    return c(y);
  }
  function c(y) {
    const U = r.events[r.events.length - 1];
    return a = U && U[1].type === "linePrefix" ? U[2].sliceSerialize(U[1], !0).length : 0, o = y, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(y);
  }
  function u(y) {
    return y === o ? (s++, e.consume(y), u) : s < 3 ? n(y) : (e.exit("codeFencedFenceSequence"), ie(y) ? le(e, d, "whitespace")(y) : d(y));
  }
  function d(y) {
    return y === null || j(y) ? (e.exit("codeFencedFence"), r.interrupt ? t(y) : e.check(ai, T, P)(y)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), m(y));
  }
  function m(y) {
    return y === null || j(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(y)) : ie(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), le(e, p, "whitespace")(y)) : y === 96 && y === o ? n(y) : (e.consume(y), m);
  }
  function p(y) {
    return y === null || j(y) ? d(y) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), w(y));
  }
  function w(y) {
    return y === null || j(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(y)) : y === 96 && y === o ? n(y) : (e.consume(y), w);
  }
  function T(y) {
    return e.attempt(i, P, R)(y);
  }
  function R(y) {
    return e.enter("lineEnding"), e.consume(y), e.exit("lineEnding"), S;
  }
  function S(y) {
    return a > 0 && ie(y) ? le(e, D, "linePrefix", a + 1)(y) : D(y);
  }
  function D(y) {
    return y === null || j(y) ? e.check(ai, T, P)(y) : (e.enter("codeFlowValue"), k(y));
  }
  function k(y) {
    return y === null || j(y) ? (e.exit("codeFlowValue"), D(y)) : (e.consume(y), k);
  }
  function P(y) {
    return e.exit("codeFenced"), t(y);
  }
  function L(y, U, Z) {
    let z = 0;
    return B;
    function B(F) {
      return y.enter("lineEnding"), y.consume(F), y.exit("lineEnding"), A;
    }
    function A(F) {
      return y.enter("codeFencedFence"), ie(F) ? le(y, N, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(F) : N(F);
    }
    function N(F) {
      return F === o ? (y.enter("codeFencedFenceSequence"), v(F)) : Z(F);
    }
    function v(F) {
      return F === o ? (z++, y.consume(F), v) : z >= s ? (y.exit("codeFencedFenceSequence"), ie(F) ? le(y, M, "whitespace")(F) : M(F)) : Z(F);
    }
    function M(F) {
      return F === null || j(F) ? (y.exit("codeFencedFence"), U(F)) : Z(F);
    }
  }
}
function Il(e, t, n) {
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
  tokenize: vl
}, Rl = {
  partial: !0,
  tokenize: Nl
};
function vl(e, t, n) {
  const r = this;
  return i;
  function i(c) {
    return e.enter("codeIndented"), le(e, a, "linePrefix", 5)(c);
  }
  function a(c) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? s(c) : n(c);
  }
  function s(c) {
    return c === null ? l(c) : j(c) ? e.attempt(Rl, s, l)(c) : (e.enter("codeFlowValue"), o(c));
  }
  function o(c) {
    return c === null || j(c) ? (e.exit("codeFlowValue"), s(c)) : (e.consume(c), o);
  }
  function l(c) {
    return e.exit("codeIndented"), t(c);
  }
}
function Nl(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line] ? n(s) : j(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), i) : le(e, a, "linePrefix", 5)(s);
  }
  function a(s) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(s) : j(s) ? i(s) : n(s);
  }
}
const Ml = {
  name: "codeText",
  previous: Ol,
  resolve: Ll,
  tokenize: Dl
};
function Ll(e) {
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
function Ol(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Dl(e, t, n) {
  let r = 0, i, a;
  return s;
  function s(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), o(d);
  }
  function o(d) {
    return d === 96 ? (e.consume(d), r++, o) : (e.exit("codeTextSequence"), l(d));
  }
  function l(d) {
    return d === null ? n(d) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), l) : d === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(d)) : j(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), l) : (e.enter("codeTextData"), c(d));
  }
  function c(d) {
    return d === null || d === 32 || d === 96 || j(d) ? (e.exit("codeTextData"), l(d)) : (e.consume(d), c);
  }
  function u(d) {
    return d === 96 ? (e.consume(d), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(d)) : (a.type = "codeTextData", c(d));
  }
}
class Pl {
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
    return r && $t(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), $t(this.left, t);
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
    this.setCursor(0), $t(this.right, t.reverse());
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
        $t(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        $t(this.left, n.reverse());
      }
  }
}
function $t(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function la(e) {
  const t = {};
  let n = -1, r, i, a, s, o, l, c;
  const u = new Pl(e);
  for (; ++n < u.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (l = r[1]._tokenizer.events, a = 0, a < l.length && l[a][1].type === "lineEndingBlank" && (a += 2), a < l.length && l[a][1].type === "content"))
      for (; ++a < l.length && l[a][1].type !== "content"; )
        l[a][1].type === "chunkText" && (l[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, Hl(u, n)), n = t[n], c = !0);
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
  return lt(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !c;
}
function Hl(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let s = n._tokenizer;
  s || (s = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  const o = s.events, l = [], c = {};
  let u, d, m = -1, p = n, w = 0, T = 0;
  const R = [T];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && s.defineSkip(p.start), p._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0), s.write(u), p._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
  }
  for (p = n; ++m < o.length; )
    // Find a void token that includes a break.
    o[m][0] === "exit" && o[m - 1][0] === "enter" && o[m][1].type === o[m - 1][1].type && o[m][1].start.line !== o[m][1].end.line && (T = m + 1, R.push(T), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (s.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : R.pop(), m = R.length; m--; ) {
    const S = o.slice(R[m], R[m + 1]), D = a.pop();
    l.push([D, D + S.length - 1]), e.splice(D, 2, S);
  }
  for (l.reverse(), m = -1; ++m < l.length; )
    c[w + l[m][0]] = w + l[m][1], w += l[m][1] - l[m][0] - 1;
  return c;
}
const Fl = {
  resolve: zl,
  tokenize: Bl
}, Ul = {
  partial: !0,
  tokenize: Gl
};
function zl(e) {
  return la(e), e;
}
function Bl(e, t) {
  let n;
  return r;
  function r(o) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(o);
  }
  function i(o) {
    return o === null ? a(o) : j(o) ? e.check(Ul, s, a)(o) : (e.consume(o), i);
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
function Gl(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), le(e, a, "linePrefix");
  }
  function a(s) {
    if (s === null || j(s))
      return n(s);
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(s) : e.interrupt(r.parser.constructs.flow, n, t)(s);
  }
}
function ca(e, t, n, r, i, a, s, o, l) {
  const c = l || Number.POSITIVE_INFINITY;
  let u = 0;
  return d;
  function d(S) {
    return S === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(S), e.exit(a), m) : S === null || S === 32 || S === 41 || Yn(S) ? n(S) : (e.enter(r), e.enter(s), e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), T(S));
  }
  function m(S) {
    return S === 62 ? (e.enter(a), e.consume(S), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), p(S));
  }
  function p(S) {
    return S === 62 ? (e.exit("chunkString"), e.exit(o), m(S)) : S === null || S === 60 || j(S) ? n(S) : (e.consume(S), S === 92 ? w : p);
  }
  function w(S) {
    return S === 60 || S === 62 || S === 92 ? (e.consume(S), p) : p(S);
  }
  function T(S) {
    return !u && (S === null || S === 41 || De(S)) ? (e.exit("chunkString"), e.exit(o), e.exit(s), e.exit(r), t(S)) : u < c && S === 40 ? (e.consume(S), u++, T) : S === 41 ? (e.consume(S), u--, T) : S === null || S === 32 || S === 40 || Yn(S) ? n(S) : (e.consume(S), S === 92 ? R : T);
  }
  function R(S) {
    return S === 40 || S === 41 || S === 92 ? (e.consume(S), T) : T(S);
  }
}
function ua(e, t, n, r, i, a) {
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
    p === 94 && !o && "_hiddenFootnoteSupport" in s.parser.constructs ? n(p) : p === 93 ? (e.exit(a), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : j(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), d(p));
  }
  function d(p) {
    return p === null || p === 91 || p === 93 || j(p) || o++ > 999 ? (e.exit("chunkString"), u(p)) : (e.consume(p), l || (l = !ie(p)), p === 92 ? m : d);
  }
  function m(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), o++, d) : d(p);
  }
}
function ha(e, t, n, r, i, a) {
  let s;
  return o;
  function o(m) {
    return m === 34 || m === 39 || m === 40 ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), s = m === 40 ? 41 : m, l) : n(m);
  }
  function l(m) {
    return m === s ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), t) : (e.enter(a), c(m));
  }
  function c(m) {
    return m === s ? (e.exit(a), l(s)) : m === null ? n(m) : j(m) ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), le(e, c, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), u(m));
  }
  function u(m) {
    return m === s || m === null || j(m) ? (e.exit("chunkString"), c(m)) : (e.consume(m), m === 92 ? d : u);
  }
  function d(m) {
    return m === s || m === 92 ? (e.consume(m), u) : u(m);
  }
}
function qt(e, t) {
  let n;
  return r;
  function r(i) {
    return j(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : ie(i) ? le(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const Vl = {
  name: "definition",
  tokenize: $l
}, Wl = {
  partial: !0,
  tokenize: jl
};
function $l(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(p) {
    return e.enter("definition"), s(p);
  }
  function s(p) {
    return ua.call(
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
    return i = Dt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), l) : n(p);
  }
  function l(p) {
    return De(p) ? qt(e, c)(p) : c(p);
  }
  function c(p) {
    return ca(
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
    return e.attempt(Wl, d, d)(p);
  }
  function d(p) {
    return ie(p) ? le(e, m, "whitespace")(p) : m(p);
  }
  function m(p) {
    return p === null || j(p) ? (e.exit("definition"), r.parser.defined.push(i), t(p)) : n(p);
  }
}
function jl(e, t, n) {
  return r;
  function r(o) {
    return De(o) ? qt(e, i)(o) : n(o);
  }
  function i(o) {
    return ha(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
  }
  function a(o) {
    return ie(o) ? le(e, s, "whitespace")(o) : s(o);
  }
  function s(o) {
    return o === null || j(o) ? t(o) : n(o);
  }
}
const Zl = {
  name: "hardBreakEscape",
  tokenize: ql
};
function ql(e, t, n) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), i;
  }
  function i(a) {
    return j(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
  }
}
const Kl = {
  name: "headingAtx",
  resolve: Xl,
  tokenize: Yl
};
function Xl(e, t) {
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
  }, lt(e, r, n - r + 1, [["enter", i, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]])), e;
}
function Yl(e, t, n) {
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
    return u === 35 ? (e.enter("atxHeadingSequence"), l(u)) : u === null || j(u) ? (e.exit("atxHeading"), t(u)) : ie(u) ? le(e, o, "whitespace")(u) : (e.enter("atxHeadingText"), c(u));
  }
  function l(u) {
    return u === 35 ? (e.consume(u), l) : (e.exit("atxHeadingSequence"), o(u));
  }
  function c(u) {
    return u === null || u === 35 || De(u) ? (e.exit("atxHeadingText"), o(u)) : (e.consume(u), c);
  }
}
const Ql = [
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
], oi = ["pre", "script", "style", "textarea"], Jl = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: nc,
  tokenize: rc
}, ec = {
  partial: !0,
  tokenize: ac
}, tc = {
  partial: !0,
  tokenize: ic
};
function nc(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function rc(e, t, n) {
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
    return f === 33 ? (e.consume(f), m) : f === 47 ? (e.consume(f), a = !0, T) : f === 63 ? (e.consume(f), i = 3, r.interrupt ? t : g) : ot(f) ? (e.consume(f), s = String.fromCharCode(f), R) : n(f);
  }
  function m(f) {
    return f === 45 ? (e.consume(f), i = 2, p) : f === 91 ? (e.consume(f), i = 5, o = 0, w) : ot(f) ? (e.consume(f), i = 4, r.interrupt ? t : g) : n(f);
  }
  function p(f) {
    return f === 45 ? (e.consume(f), r.interrupt ? t : g) : n(f);
  }
  function w(f) {
    const se = "CDATA[";
    return f === se.charCodeAt(o++) ? (e.consume(f), o === se.length ? r.interrupt ? t : N : w) : n(f);
  }
  function T(f) {
    return ot(f) ? (e.consume(f), s = String.fromCharCode(f), R) : n(f);
  }
  function R(f) {
    if (f === null || f === 47 || f === 62 || De(f)) {
      const se = f === 47, G = s.toLowerCase();
      return !se && !a && oi.includes(G) ? (i = 1, r.interrupt ? t(f) : N(f)) : Ql.includes(s.toLowerCase()) ? (i = 6, se ? (e.consume(f), S) : r.interrupt ? t(f) : N(f)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(f) : a ? D(f) : k(f));
    }
    return f === 45 || ze(f) ? (e.consume(f), s += String.fromCharCode(f), R) : n(f);
  }
  function S(f) {
    return f === 62 ? (e.consume(f), r.interrupt ? t : N) : n(f);
  }
  function D(f) {
    return ie(f) ? (e.consume(f), D) : B(f);
  }
  function k(f) {
    return f === 47 ? (e.consume(f), B) : f === 58 || f === 95 || ot(f) ? (e.consume(f), P) : ie(f) ? (e.consume(f), k) : B(f);
  }
  function P(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || ze(f) ? (e.consume(f), P) : L(f);
  }
  function L(f) {
    return f === 61 ? (e.consume(f), y) : ie(f) ? (e.consume(f), L) : k(f);
  }
  function y(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), l = f, U) : ie(f) ? (e.consume(f), y) : Z(f);
  }
  function U(f) {
    return f === l ? (e.consume(f), l = null, z) : f === null || j(f) ? n(f) : (e.consume(f), U);
  }
  function Z(f) {
    return f === null || f === 34 || f === 39 || f === 47 || f === 60 || f === 61 || f === 62 || f === 96 || De(f) ? L(f) : (e.consume(f), Z);
  }
  function z(f) {
    return f === 47 || f === 62 || ie(f) ? k(f) : n(f);
  }
  function B(f) {
    return f === 62 ? (e.consume(f), A) : n(f);
  }
  function A(f) {
    return f === null || j(f) ? N(f) : ie(f) ? (e.consume(f), A) : n(f);
  }
  function N(f) {
    return f === 45 && i === 2 ? (e.consume(f), X) : f === 60 && i === 1 ? (e.consume(f), ee) : f === 62 && i === 4 ? (e.consume(f), Q) : f === 63 && i === 3 ? (e.consume(f), g) : f === 93 && i === 5 ? (e.consume(f), ke) : j(f) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(ec, de, v)(f)) : f === null || j(f) ? (e.exit("htmlFlowData"), v(f)) : (e.consume(f), N);
  }
  function v(f) {
    return e.check(tc, M, de)(f);
  }
  function M(f) {
    return e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), F;
  }
  function F(f) {
    return f === null || j(f) ? v(f) : (e.enter("htmlFlowData"), N(f));
  }
  function X(f) {
    return f === 45 ? (e.consume(f), g) : N(f);
  }
  function ee(f) {
    return f === 47 ? (e.consume(f), s = "", pe) : N(f);
  }
  function pe(f) {
    if (f === 62) {
      const se = s.toLowerCase();
      return oi.includes(se) ? (e.consume(f), Q) : N(f);
    }
    return ot(f) && s.length < 8 ? (e.consume(f), s += String.fromCharCode(f), pe) : N(f);
  }
  function ke(f) {
    return f === 93 ? (e.consume(f), g) : N(f);
  }
  function g(f) {
    return f === 62 ? (e.consume(f), Q) : f === 45 && i === 2 ? (e.consume(f), g) : N(f);
  }
  function Q(f) {
    return f === null || j(f) ? (e.exit("htmlFlowData"), de(f)) : (e.consume(f), Q);
  }
  function de(f) {
    return e.exit("htmlFlow"), t(f);
  }
}
function ic(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return j(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), a) : n(s);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
function ac(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(yn, t, n);
  }
}
const sc = {
  name: "htmlText",
  tokenize: oc
};
function oc(e, t, n) {
  const r = this;
  let i, a, s;
  return o;
  function o(g) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), l;
  }
  function l(g) {
    return g === 33 ? (e.consume(g), c) : g === 47 ? (e.consume(g), L) : g === 63 ? (e.consume(g), k) : ot(g) ? (e.consume(g), Z) : n(g);
  }
  function c(g) {
    return g === 45 ? (e.consume(g), u) : g === 91 ? (e.consume(g), a = 0, w) : ot(g) ? (e.consume(g), D) : n(g);
  }
  function u(g) {
    return g === 45 ? (e.consume(g), p) : n(g);
  }
  function d(g) {
    return g === null ? n(g) : g === 45 ? (e.consume(g), m) : j(g) ? (s = d, ee(g)) : (e.consume(g), d);
  }
  function m(g) {
    return g === 45 ? (e.consume(g), p) : d(g);
  }
  function p(g) {
    return g === 62 ? X(g) : g === 45 ? m(g) : d(g);
  }
  function w(g) {
    const Q = "CDATA[";
    return g === Q.charCodeAt(a++) ? (e.consume(g), a === Q.length ? T : w) : n(g);
  }
  function T(g) {
    return g === null ? n(g) : g === 93 ? (e.consume(g), R) : j(g) ? (s = T, ee(g)) : (e.consume(g), T);
  }
  function R(g) {
    return g === 93 ? (e.consume(g), S) : T(g);
  }
  function S(g) {
    return g === 62 ? X(g) : g === 93 ? (e.consume(g), S) : T(g);
  }
  function D(g) {
    return g === null || g === 62 ? X(g) : j(g) ? (s = D, ee(g)) : (e.consume(g), D);
  }
  function k(g) {
    return g === null ? n(g) : g === 63 ? (e.consume(g), P) : j(g) ? (s = k, ee(g)) : (e.consume(g), k);
  }
  function P(g) {
    return g === 62 ? X(g) : k(g);
  }
  function L(g) {
    return ot(g) ? (e.consume(g), y) : n(g);
  }
  function y(g) {
    return g === 45 || ze(g) ? (e.consume(g), y) : U(g);
  }
  function U(g) {
    return j(g) ? (s = U, ee(g)) : ie(g) ? (e.consume(g), U) : X(g);
  }
  function Z(g) {
    return g === 45 || ze(g) ? (e.consume(g), Z) : g === 47 || g === 62 || De(g) ? z(g) : n(g);
  }
  function z(g) {
    return g === 47 ? (e.consume(g), X) : g === 58 || g === 95 || ot(g) ? (e.consume(g), B) : j(g) ? (s = z, ee(g)) : ie(g) ? (e.consume(g), z) : X(g);
  }
  function B(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || ze(g) ? (e.consume(g), B) : A(g);
  }
  function A(g) {
    return g === 61 ? (e.consume(g), N) : j(g) ? (s = A, ee(g)) : ie(g) ? (e.consume(g), A) : z(g);
  }
  function N(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), i = g, v) : j(g) ? (s = N, ee(g)) : ie(g) ? (e.consume(g), N) : (e.consume(g), M);
  }
  function v(g) {
    return g === i ? (e.consume(g), i = void 0, F) : g === null ? n(g) : j(g) ? (s = v, ee(g)) : (e.consume(g), v);
  }
  function M(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? n(g) : g === 47 || g === 62 || De(g) ? z(g) : (e.consume(g), M);
  }
  function F(g) {
    return g === 47 || g === 62 || De(g) ? z(g) : n(g);
  }
  function X(g) {
    return g === 62 ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(g);
  }
  function ee(g) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), pe;
  }
  function pe(g) {
    return ie(g) ? le(e, ke, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(g) : ke(g);
  }
  function ke(g) {
    return e.enter("htmlTextData"), s(g);
  }
}
const fr = {
  name: "labelEnd",
  resolveAll: hc,
  resolveTo: pc,
  tokenize: dc
}, lc = {
  tokenize: fc
}, cc = {
  tokenize: mc
}, uc = {
  tokenize: gc
};
function hc(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e.length !== n.length && lt(e, 0, e.length, n), e;
}
function pc(e, t) {
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
  return o = [["enter", l, t], ["enter", c, t]], o = We(o, e.slice(a + 1, a + r + 3)), o = We(o, [["enter", u, t]]), o = We(o, dr(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, s - 3), t)), o = We(o, [["exit", u, t], e[s - 2], e[s - 1], ["exit", c, t]]), o = We(o, e.slice(s + 1)), o = We(o, [["exit", l, t]]), lt(e, a, e.length, o), e;
}
function dc(e, t, n) {
  const r = this;
  let i = r.events.length, a, s;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return o;
  function o(m) {
    return a ? a._inactive ? d(m) : (s = r.parser.defined.includes(Dt(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(m), e.exit("labelMarker"), e.exit("labelEnd"), l) : n(m);
  }
  function l(m) {
    return m === 40 ? e.attempt(lc, u, s ? u : d)(m) : m === 91 ? e.attempt(cc, u, s ? c : d)(m) : s ? u(m) : d(m);
  }
  function c(m) {
    return e.attempt(uc, u, d)(m);
  }
  function u(m) {
    return t(m);
  }
  function d(m) {
    return a._balanced = !0, n(m);
  }
}
function fc(e, t, n) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), i;
  }
  function i(d) {
    return De(d) ? qt(e, a)(d) : a(d);
  }
  function a(d) {
    return d === 41 ? u(d) : ca(e, s, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function s(d) {
    return De(d) ? qt(e, l)(d) : u(d);
  }
  function o(d) {
    return n(d);
  }
  function l(d) {
    return d === 34 || d === 39 || d === 40 ? ha(e, c, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : u(d);
  }
  function c(d) {
    return De(d) ? qt(e, u)(d) : u(d);
  }
  function u(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), t) : n(d);
  }
}
function mc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return ua.call(r, e, a, s, "reference", "referenceMarker", "referenceString")(o);
  }
  function a(o) {
    return r.parser.defined.includes(Dt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(o) : n(o);
  }
  function s(o) {
    return n(o);
  }
}
function gc(e, t, n) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), i;
  }
  function i(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), t) : n(a);
  }
}
const Cc = {
  name: "labelStartImage",
  resolveAll: fr.resolveAll,
  tokenize: yc
};
function yc(e, t, n) {
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
const wc = {
  name: "labelStartLink",
  resolveAll: fr.resolveAll,
  tokenize: Ec
};
function Ec(e, t, n) {
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
  tokenize: Tc
};
function Tc(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), le(e, t, "linePrefix");
  }
}
const hn = {
  name: "thematicBreak",
  tokenize: Sc
};
function Sc(e, t, n) {
  let r = 0, i;
  return a;
  function a(c) {
    return e.enter("thematicBreak"), s(c);
  }
  function s(c) {
    return i = c, o(c);
  }
  function o(c) {
    return c === i ? (e.enter("thematicBreakSequence"), l(c)) : r >= 3 && (c === null || j(c)) ? (e.exit("thematicBreak"), t(c)) : n(c);
  }
  function l(c) {
    return c === i ? (e.consume(c), r++, l) : (e.exit("thematicBreakSequence"), ie(c) ? le(e, o, "whitespace")(c) : o(c));
  }
}
const Me = {
  continuation: {
    tokenize: bc
  },
  exit: Ic,
  name: "list",
  tokenize: xc
}, kc = {
  partial: !0,
  tokenize: Rc
}, _c = {
  partial: !0,
  tokenize: Ac
};
function xc(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, s = 0;
  return o;
  function o(p) {
    const w = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (w === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : Qn(p)) {
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
    return Qn(p) && ++s < 10 ? (e.consume(p), l) : (!r.interrupt || s < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), c(p)) : n(p);
  }
  function c(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      yn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : u,
      e.attempt(kc, m, d)
    );
  }
  function u(p) {
    return r.containerState.initialBlankLine = !0, a++, m(p);
  }
  function d(p) {
    return ie(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), m) : n(p);
  }
  function m(p) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(p);
  }
}
function bc(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(yn, i, a);
  function i(o) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, le(e, t, "listItemIndent", r.containerState.size + 1)(o);
  }
  function a(o) {
    return r.containerState.furtherBlankLines || !ie(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(_c, t, s)(o));
  }
  function s(o) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, le(e, e.attempt(Me, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
  }
}
function Ac(e, t, n) {
  const r = this;
  return le(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "listItemIndent" && s[2].sliceSerialize(s[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function Ic(e) {
  e.exit(this.containerState.type);
}
function Rc(e, t, n) {
  const r = this;
  return le(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const s = r.events[r.events.length - 1];
    return !ie(a) && s && s[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const li = {
  name: "setextUnderline",
  resolveTo: vc,
  tokenize: Nc
};
function vc(e, t) {
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
function Nc(e, t, n) {
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
    return c === i ? (e.consume(c), o) : (e.exit("setextHeadingLineSequence"), ie(c) ? le(e, l, "lineSuffix")(c) : l(c));
  }
  function l(c) {
    return c === null || j(c) ? (e.exit("setextHeadingLine"), t(c)) : n(c);
  }
}
const Mc = {
  tokenize: Lc
};
function Lc(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    yn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, le(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Fl, i)), "linePrefix"))
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
const Oc = {
  resolveAll: da()
}, Dc = pa("string"), Pc = pa("text");
function pa(e) {
  return {
    resolveAll: da(e === "text" ? Hc : void 0),
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
function da(e) {
  return t;
  function t(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === "data" && (a = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function Hc(e, t) {
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
const Fc = {
  42: Me,
  43: Me,
  45: Me,
  48: Me,
  49: Me,
  50: Me,
  51: Me,
  52: Me,
  53: Me,
  54: Me,
  55: Me,
  56: Me,
  57: Me,
  62: aa
}, Uc = {
  91: Vl
}, zc = {
  [-2]: Ln,
  [-1]: Ln,
  32: Ln
}, Bc = {
  35: Kl,
  42: hn,
  45: [li, hn],
  60: Jl,
  61: li,
  95: hn,
  96: si,
  126: si
}, Gc = {
  38: oa,
  92: sa
}, Vc = {
  [-5]: On,
  [-4]: On,
  [-3]: On,
  33: Cc,
  38: oa,
  42: Jn,
  60: [wl, sc],
  91: wc,
  92: [Zl, sa],
  93: fr,
  95: Jn,
  96: Ml
}, Wc = {
  null: [Jn, Oc]
}, $c = {
  null: [42, 95]
}, jc = {
  null: []
}, Zc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: $c,
  contentInitial: Uc,
  disable: jc,
  document: Fc,
  flow: Bc,
  flowInitial: zc,
  insideSpan: Wc,
  string: Gc,
  text: Vc
}, Symbol.toStringTag, { value: "Module" }));
function qc(e, t, n) {
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
    attempt: U(L),
    check: U(y),
    consume: D,
    enter: k,
    exit: P,
    interrupt: U(y, {
      interrupt: !0
    })
  }, c = {
    code: null,
    containerState: {},
    defineSkip: T,
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
  function d(A) {
    return s = We(s, A), R(), s[s.length - 1] !== null ? [] : (Z(t, 0), c.events = dr(a, c.events, c), c.events);
  }
  function m(A, N) {
    return Xc(p(A), N);
  }
  function p(A) {
    return Kc(s, A);
  }
  function w() {
    const {
      _bufferIndex: A,
      _index: N,
      line: v,
      column: M,
      offset: F
    } = r;
    return {
      _bufferIndex: A,
      _index: N,
      line: v,
      column: M,
      offset: F
    };
  }
  function T(A) {
    i[A.line] = A.column, B();
  }
  function R() {
    let A;
    for (; r._index < s.length; ) {
      const N = s[r._index];
      if (typeof N == "string")
        for (A = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === A && r._bufferIndex < N.length; )
          S(N.charCodeAt(r._bufferIndex));
      else
        S(N);
    }
  }
  function S(A) {
    u = u(A);
  }
  function D(A) {
    j(A) ? (r.line++, r.column = 1, r.offset += A === -3 ? 2 : 1, B()) : A !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    s[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = A;
  }
  function k(A, N) {
    const v = N || {};
    return v.type = A, v.start = w(), c.events.push(["enter", v, c]), o.push(v), v;
  }
  function P(A) {
    const N = o.pop();
    return N.end = w(), c.events.push(["exit", N, c]), N;
  }
  function L(A, N) {
    Z(A, N.from);
  }
  function y(A, N) {
    N.restore();
  }
  function U(A, N) {
    return v;
    function v(M, F, X) {
      let ee, pe, ke, g;
      return Array.isArray(M) ? (
        /* c8 ignore next 1 */
        de(M)
      ) : "tokenize" in M ? (
        // Looks like a construct.
        de([
          /** @type {Construct} */
          M
        ])
      ) : Q(M);
      function Q(q) {
        return me;
        function me(ce) {
          const He = ce !== null && q[ce], Be = ce !== null && q.null, ct = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(He) ? He : He ? [He] : [],
            ...Array.isArray(Be) ? Be : Be ? [Be] : []
          ];
          return de(ct)(ce);
        }
      }
      function de(q) {
        return ee = q, pe = 0, q.length === 0 ? X : f(q[pe]);
      }
      function f(q) {
        return me;
        function me(ce) {
          return g = z(), ke = q, q.partial || (c.currentConstruct = q), q.name && c.parser.constructs.disable.null.includes(q.name) ? G() : q.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            N ? Object.assign(Object.create(c), N) : c,
            l,
            se,
            G
          )(ce);
        }
      }
      function se(q) {
        return A(ke, g), F;
      }
      function G(q) {
        return g.restore(), ++pe < ee.length ? f(ee[pe]) : X;
      }
    }
  }
  function Z(A, N) {
    A.resolveAll && !a.includes(A) && a.push(A), A.resolve && lt(c.events, N, c.events.length - N, A.resolve(c.events.slice(N), c)), A.resolveTo && (c.events = A.resolveTo(c.events, c));
  }
  function z() {
    const A = w(), N = c.previous, v = c.currentConstruct, M = c.events.length, F = Array.from(o);
    return {
      from: M,
      restore: X
    };
    function X() {
      r = A, c.previous = N, c.currentConstruct = v, c.events.length = M, o = F, B();
    }
  }
  function B() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Kc(e, t) {
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
function Xc(e, t) {
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
function Yc(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      il([Zc, ...(e || {}).extensions || []])
    ),
    content: i(pl),
    defined: [],
    document: i(fl),
    flow: i(Mc),
    lazy: {},
    string: i(Dc),
    text: i(Pc)
  };
  return r;
  function i(a) {
    return s;
    function s(o) {
      return qc(r, a, o);
    }
  }
}
function Qc(e) {
  for (; !la(e); )
    ;
  return e;
}
const ci = /[\0\t\n\r]/g;
function Jc() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, s, o) {
    const l = [];
    let c, u, d, m, p;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(s || void 0).decode(a)), d = 0, t = "", n && (a.charCodeAt(0) === 65279 && d++, n = void 0); d < a.length; ) {
      if (ci.lastIndex = d, c = ci.exec(a), m = c && c.index !== void 0 ? c.index : a.length, p = a.charCodeAt(m), !c) {
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
const eu = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function tu(e) {
  return e.replace(eu, nu);
}
function nu(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return ia(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return pr(n) || e;
}
const fa = {}.hasOwnProperty;
function ru(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), iu(n)(Qc(Yc(n).document().write(Jc()(e, t, !0))));
}
function iu(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(Ze),
      autolinkProtocol: z,
      autolinkEmail: z,
      atxHeading: a(Ge),
      blockQuote: a(Be),
      characterEscape: z,
      characterReference: z,
      codeFenced: a(ct),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: a(ct, s),
      codeText: a(It, s),
      codeTextData: z,
      data: z,
      codeFlowValue: z,
      definition: a(je),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: a(yt),
      hardBreakEscape: a(Je),
      hardBreakTrailing: a(Je),
      htmlFlow: a(ut, s),
      htmlFlowData: z,
      htmlText: a(ut, s),
      htmlTextData: z,
      image: a(et),
      label: s,
      link: a(Ze),
      listItem: a(kt),
      listItemValue: m,
      listOrdered: a(ht, d),
      listUnordered: a(ht),
      paragraph: a(pt),
      reference: f,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: a(Ge),
      strong: a(Ft),
      thematicBreak: a(tt)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: L,
      autolink: l(),
      autolinkEmail: He,
      autolinkProtocol: ce,
      blockQuote: l(),
      characterEscapeValue: B,
      characterReferenceMarkerHexadecimal: G,
      characterReferenceMarkerNumeric: G,
      characterReferenceValue: q,
      characterReference: me,
      codeFenced: l(R),
      codeFencedFence: T,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: w,
      codeFlowValue: B,
      codeIndented: l(S),
      codeText: l(F),
      codeTextData: B,
      data: B,
      definition: l(),
      definitionDestinationString: P,
      definitionLabelString: D,
      definitionTitleString: k,
      emphasis: l(),
      hardBreakEscape: l(N),
      hardBreakTrailing: l(N),
      htmlFlow: l(v),
      htmlFlowData: B,
      htmlText: l(M),
      htmlTextData: B,
      image: l(ee),
      label: ke,
      labelText: pe,
      lineEnding: A,
      link: l(X),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: se,
      resourceDestinationString: g,
      resourceTitleString: Q,
      resource: de,
      setextHeading: l(Z),
      setextHeadingLineSequence: U,
      setextHeadingText: y,
      strong: l(),
      thematicBreak: l()
    }
  };
  ma(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(E) {
    let _ = {
      type: "root",
      children: []
    };
    const V = {
      stack: [_],
      tokenStack: [],
      config: t,
      enter: o,
      exit: c,
      buffer: s,
      resume: u,
      data: n
    }, Y = [];
    let ne = -1;
    for (; ++ne < E.length; )
      if (E[ne][1].type === "listOrdered" || E[ne][1].type === "listUnordered")
        if (E[ne][0] === "enter")
          Y.push(ne);
        else {
          const Te = Y.pop();
          ne = i(E, Te, ne);
        }
    for (ne = -1; ++ne < E.length; ) {
      const Te = t[E[ne][0]];
      fa.call(Te, E[ne][1].type) && Te[E[ne][1].type].call(Object.assign({
        sliceSerialize: E[ne][2].sliceSerialize
      }, V), E[ne][1]);
    }
    if (V.tokenStack.length > 0) {
      const Te = V.tokenStack[V.tokenStack.length - 1];
      (Te[1] || ui).call(V, void 0, Te[0]);
    }
    for (_.position = {
      start: wt(E.length > 0 ? E[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: wt(E.length > 0 ? E[E.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, ne = -1; ++ne < t.transforms.length; )
      _ = t.transforms[ne](_) || _;
    return _;
  }
  function i(E, _, V) {
    let Y = _ - 1, ne = -1, Te = !1, Fe, _e, qe, ye;
    for (; ++Y <= V; ) {
      const he = E[Y];
      switch (he[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          he[0] === "enter" ? ne++ : ne--, ye = void 0;
          break;
        }
        case "lineEndingBlank": {
          he[0] === "enter" && (Fe && !ye && !ne && !qe && (qe = Y), ye = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          ye = void 0;
      }
      if (!ne && he[0] === "enter" && he[1].type === "listItemPrefix" || ne === -1 && he[0] === "exit" && (he[1].type === "listUnordered" || he[1].type === "listOrdered")) {
        if (Fe) {
          let re = Y;
          for (_e = void 0; re--; ) {
            const fe = E[re];
            if (fe[1].type === "lineEnding" || fe[1].type === "lineEndingBlank") {
              if (fe[0] === "exit") continue;
              _e && (E[_e][1].type = "lineEndingBlank", Te = !0), fe[1].type = "lineEnding", _e = re;
            } else if (!(fe[1].type === "linePrefix" || fe[1].type === "blockQuotePrefix" || fe[1].type === "blockQuotePrefixWhitespace" || fe[1].type === "blockQuoteMarker" || fe[1].type === "listItemIndent")) break;
          }
          qe && (!_e || qe < _e) && (Fe._spread = !0), Fe.end = Object.assign({}, _e ? E[_e][1].start : he[1].end), E.splice(_e || Y, 0, ["exit", Fe, he[2]]), Y++, V++;
        }
        if (he[1].type === "listItemPrefix") {
          const re = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, he[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Fe = re, E.splice(Y, 0, ["enter", re, he[2]]), Y++, V++, qe = void 0, ye = !0;
        }
      }
    }
    return E[_][1]._spread = Te, V;
  }
  function a(E, _) {
    return V;
    function V(Y) {
      o.call(this, E(Y), Y), _ && _.call(this, Y);
    }
  }
  function s() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function o(E, _, V) {
    this.stack[this.stack.length - 1].children.push(E), this.stack.push(E), this.tokenStack.push([_, V || void 0]), E.position = {
      start: wt(_.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function l(E) {
    return _;
    function _(V) {
      E && E.call(this, V), c.call(this, V);
    }
  }
  function c(E, _) {
    const V = this.stack.pop(), Y = this.tokenStack.pop();
    if (Y)
      Y[0].type !== E.type && (_ ? _.call(this, E, Y[0]) : (Y[1] || ui).call(this, E, Y[0]));
    else throw new Error("Cannot close `" + E.type + "` (" + Zt({
      start: E.start,
      end: E.end
    }) + "): it’s not open");
    V.position.end = wt(E.end);
  }
  function u() {
    return nl(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(E) {
    if (this.data.expectingFirstListItemValue) {
      const _ = this.stack[this.stack.length - 2];
      _.start = Number.parseInt(this.sliceSerialize(E), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    _.lang = E;
  }
  function w() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    _.meta = E;
  }
  function T() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function R() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    _.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function S() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    _.value = E.replace(/(\r?\n|\r)$/g, "");
  }
  function D(E) {
    const _ = this.resume(), V = this.stack[this.stack.length - 1];
    V.label = _, V.identifier = Dt(this.sliceSerialize(E)).toLowerCase();
  }
  function k() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    _.title = E;
  }
  function P() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    _.url = E;
  }
  function L(E) {
    const _ = this.stack[this.stack.length - 1];
    if (!_.depth) {
      const V = this.sliceSerialize(E).length;
      _.depth = V;
    }
  }
  function y() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function U(E) {
    const _ = this.stack[this.stack.length - 1];
    _.depth = this.sliceSerialize(E).codePointAt(0) === 61 ? 1 : 2;
  }
  function Z() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function z(E) {
    const V = this.stack[this.stack.length - 1].children;
    let Y = V[V.length - 1];
    (!Y || Y.type !== "text") && (Y = dt(), Y.position = {
      start: wt(E.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, V.push(Y)), this.stack.push(Y);
  }
  function B(E) {
    const _ = this.stack.pop();
    _.value += this.sliceSerialize(E), _.position.end = wt(E.end);
  }
  function A(E) {
    const _ = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const V = _.children[_.children.length - 1];
      V.position.end = wt(E.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(_.type) && (z.call(this, E), B.call(this, E));
  }
  function N() {
    this.data.atHardBreak = !0;
  }
  function v() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    _.value = E;
  }
  function M() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    _.value = E;
  }
  function F() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    _.value = E;
  }
  function X() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const _ = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = _, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function ee() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const _ = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = _, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function pe(E) {
    const _ = this.sliceSerialize(E), V = this.stack[this.stack.length - 2];
    V.label = tu(_), V.identifier = Dt(_).toLowerCase();
  }
  function ke() {
    const E = this.stack[this.stack.length - 1], _ = this.resume(), V = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, V.type === "link") {
      const Y = E.children;
      V.children = Y;
    } else
      V.alt = _;
  }
  function g() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    _.url = E;
  }
  function Q() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    _.title = E;
  }
  function de() {
    this.data.inReference = void 0;
  }
  function f() {
    this.data.referenceType = "collapsed";
  }
  function se(E) {
    const _ = this.resume(), V = this.stack[this.stack.length - 1];
    V.label = _, V.identifier = Dt(this.sliceSerialize(E)).toLowerCase(), this.data.referenceType = "full";
  }
  function G(E) {
    this.data.characterReferenceType = E.type;
  }
  function q(E) {
    const _ = this.sliceSerialize(E), V = this.data.characterReferenceType;
    let Y;
    V ? (Y = ia(_, V === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : Y = pr(_);
    const ne = this.stack[this.stack.length - 1];
    ne.value += Y;
  }
  function me(E) {
    const _ = this.stack.pop();
    _.position.end = wt(E.end);
  }
  function ce(E) {
    B.call(this, E);
    const _ = this.stack[this.stack.length - 1];
    _.url = this.sliceSerialize(E);
  }
  function He(E) {
    B.call(this, E);
    const _ = this.stack[this.stack.length - 1];
    _.url = "mailto:" + this.sliceSerialize(E);
  }
  function Be() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function ct() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function It() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function je() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function yt() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Ge() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Je() {
    return {
      type: "break"
    };
  }
  function ut() {
    return {
      type: "html",
      value: ""
    };
  }
  function et() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Ze() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function ht(E) {
    return {
      type: "list",
      ordered: E.type === "listOrdered",
      start: null,
      spread: E._spread,
      children: []
    };
  }
  function kt(E) {
    return {
      type: "listItem",
      spread: E._spread,
      checked: null,
      children: []
    };
  }
  function pt() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Ft() {
    return {
      type: "strong",
      children: []
    };
  }
  function dt() {
    return {
      type: "text",
      value: ""
    };
  }
  function tt() {
    return {
      type: "thematicBreak"
    };
  }
}
function wt(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function ma(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? ma(e, r) : au(e, r);
  }
}
function au(e, t) {
  let n;
  for (n in t)
    if (fa.call(t, n))
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
function ui(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Zt({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Zt({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Zt({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function su(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return ru(r, {
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
function ou(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function lu(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function cu(e, t) {
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
function uu(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function hu(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function pu(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Ht(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
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
function du(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function fu(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function ga(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return s && s.type === "text" ? s.value += r : i.push({ type: "text", value: r }), i;
}
function mu(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return ga(e, t);
  const i = { src: Ht(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function gu(e, t) {
  const n = { src: Ht(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function Cu(e, t) {
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
function yu(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return ga(e, t);
  const i = { href: Ht(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function wu(e, t) {
  const n = { href: Ht(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Eu(e, t, n) {
  const r = e.all(t), i = n ? Tu(n) : Ca(t), a = {}, s = [];
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
function Tu(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = Ca(n[r]);
  }
  return t;
}
function Ca(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function Su(e, t) {
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
function ku(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function _u(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function xu(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function bu(e, t) {
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
    }, o = lr(t.children[1]), l = Yi(t.children[t.children.length - 1]);
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
function Au(e, t, n) {
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
function Iu(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const hi = 9, pi = 32;
function Ru(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const a = [];
  for (; r; )
    a.push(
      di(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return a.push(di(t.slice(i), i > 0, !1)), a.join("");
}
function di(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let a = e.codePointAt(r);
    for (; a === hi || a === pi; )
      r++, a = e.codePointAt(r);
  }
  if (n) {
    let a = e.codePointAt(i - 1);
    for (; a === hi || a === pi; )
      i--, a = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function vu(e, t) {
  const n = { type: "text", value: Ru(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Nu(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Mu = {
  blockquote: ou,
  break: lu,
  code: cu,
  delete: uu,
  emphasis: hu,
  footnoteReference: pu,
  heading: du,
  html: fu,
  imageReference: mu,
  image: gu,
  inlineCode: Cu,
  linkReference: yu,
  link: wu,
  listItem: Eu,
  list: Su,
  paragraph: ku,
  // @ts-expect-error: root is different, but hard to type.
  root: _u,
  strong: xu,
  table: bu,
  tableCell: Iu,
  tableRow: Au,
  text: vu,
  thematicBreak: Nu,
  toml: rn,
  yaml: rn,
  definition: rn,
  footnoteDefinition: rn
};
function rn() {
}
const ya = -1, wn = 0, Kt = 1, mn = 2, mr = 3, gr = 4, Cr = 5, yr = 6, wa = 7, Ea = 8, fi = typeof self == "object" ? self : globalThis, Lu = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, s] = t[i];
    switch (a) {
      case wn:
      case ya:
        return n(s, i);
      case Kt: {
        const o = n([], i);
        for (const l of s)
          o.push(r(l));
        return o;
      }
      case mn: {
        const o = n({}, i);
        for (const [l, c] of s)
          o[r(l)] = r(c);
        return o;
      }
      case mr:
        return n(new Date(s), i);
      case gr: {
        const { source: o, flags: l } = s;
        return n(new RegExp(o, l), i);
      }
      case Cr: {
        const o = n(/* @__PURE__ */ new Map(), i);
        for (const [l, c] of s)
          o.set(r(l), r(c));
        return o;
      }
      case yr: {
        const o = n(/* @__PURE__ */ new Set(), i);
        for (const l of s)
          o.add(r(l));
        return o;
      }
      case wa: {
        const { name: o, message: l } = s;
        return n(new fi[o](l), i);
      }
      case Ea:
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
    return n(new fi[a](s), i);
  };
  return r;
}, mi = (e) => Lu(/* @__PURE__ */ new Map(), e)(0), Nt = "", { toString: Ou } = {}, { keys: Du } = Object, jt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [wn, t];
  const n = Ou.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [Kt, Nt];
    case "Object":
      return [mn, Nt];
    case "Date":
      return [mr, Nt];
    case "RegExp":
      return [gr, Nt];
    case "Map":
      return [Cr, Nt];
    case "Set":
      return [yr, Nt];
    case "DataView":
      return [Kt, n];
  }
  return n.includes("Array") ? [Kt, n] : n.includes("Error") ? [wa, n] : [mn, n];
}, an = ([e, t]) => e === wn && (t === "function" || t === "symbol"), Pu = (e, t, n, r) => {
  const i = (s, o) => {
    const l = r.push(s) - 1;
    return n.set(o, l), l;
  }, a = (s) => {
    if (n.has(s))
      return n.get(s);
    let [o, l] = jt(s);
    switch (o) {
      case wn: {
        let u = s;
        switch (l) {
          case "bigint":
            o = Ea, u = s.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + l);
            u = null;
            break;
          case "undefined":
            return i([ya], s);
        }
        return i([o, u], s);
      }
      case Kt: {
        if (l) {
          let m = s;
          return l === "DataView" ? m = new Uint8Array(s.buffer) : l === "ArrayBuffer" && (m = new Uint8Array(s)), i([l, [...m]], s);
        }
        const u = [], d = i([o, u], s);
        for (const m of s)
          u.push(a(m));
        return d;
      }
      case mn: {
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
        for (const m of Du(s))
          (e || !an(jt(s[m]))) && u.push([a(m), a(s[m])]);
        return d;
      }
      case mr:
        return i([o, s.toISOString()], s);
      case gr: {
        const { source: u, flags: d } = s;
        return i([o, { source: u, flags: d }], s);
      }
      case Cr: {
        const u = [], d = i([o, u], s);
        for (const [m, p] of s)
          (e || !(an(jt(m)) || an(jt(p)))) && u.push([a(m), a(p)]);
        return d;
      }
      case yr: {
        const u = [], d = i([o, u], s);
        for (const m of s)
          (e || !an(jt(m))) && u.push(a(m));
        return d;
      }
    }
    const { message: c } = s;
    return i([o, { name: l, message: c }], s);
  };
  return a;
}, gi = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return Pu(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, gn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? mi(gi(e, t)) : structuredClone(e)
) : (e, t) => mi(gi(e, t));
function Hu(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function Fu(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function Uu(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || Hu, r = e.options.footnoteBackLabel || Fu, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", s = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let l = -1;
  for (; ++l < e.footnoteOrder.length; ) {
    const c = e.footnoteById.get(
      e.footnoteOrder[l]
    );
    if (!c)
      continue;
    const u = e.all(c), d = String(c.identifier).toUpperCase(), m = Ht(d.toLowerCase());
    let p = 0;
    const w = [], T = e.footnoteCounts.get(d);
    for (; T !== void 0 && ++p <= T; ) {
      w.length > 0 && w.push({ type: "text", value: " " });
      let D = typeof n == "string" ? n : n(l, p);
      typeof D == "string" && (D = { type: "text", value: D }), w.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + m + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(l, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(D) ? D : [D]
      });
    }
    const R = u[u.length - 1];
    if (R && R.type === "element" && R.tagName === "p") {
      const D = R.children[R.children.length - 1];
      D && D.type === "text" ? D.value += " " : R.children.push({ type: "text", value: " " }), R.children.push(...w);
    } else
      u.push(...w);
    const S = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + m },
      children: e.wrap(u, !0)
    };
    e.patch(c, S), o.push(S);
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
            ...gn(s),
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
const Ta = (
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
      return Vu;
    if (typeof e == "function")
      return En(e);
    if (typeof e == "object")
      return Array.isArray(e) ? zu(e) : Bu(e);
    if (typeof e == "string")
      return Gu(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function zu(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Ta(e[n]);
  return En(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function Bu(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return En(n);
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
function Gu(e) {
  return En(t);
  function t(n) {
    return n && n.type === e;
  }
}
function En(e) {
  return t;
  function t(n, r, i) {
    return !!(Wu(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Vu() {
  return !0;
}
function Wu(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Sa = [], $u = !0, Ci = !1, ju = "skip";
function Zu(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = Ta(i), s = r ? -1 : 1;
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
      let p = Sa, w, T, R;
      if ((!t || a(l, c, u[u.length - 1] || void 0)) && (p = qu(n(l, u)), p[0] === Ci))
        return p;
      if ("children" in l && l.children) {
        const S = (
          /** @type {UnistParent} */
          l
        );
        if (S.children && p[0] !== ju)
          for (T = (r ? S.children.length : -1) + s, R = u.concat(S); T > -1 && T < S.children.length; ) {
            const D = S.children[T];
            if (w = o(D, T, R)(), w[0] === Ci)
              return w;
            T = typeof w[1] == "number" ? w[1] : T + s;
          }
      }
      return p;
    }
  }
}
function qu(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [$u, e] : e == null ? Sa : [e];
}
function ka(e, t, n, r) {
  let i, a, s;
  typeof t == "function" && typeof n != "function" ? (a = void 0, s = t, i = n) : (a = t, s = n, i = r), Zu(e, a, o, i);
  function o(l, c) {
    const u = c[c.length - 1], d = u ? u.children.indexOf(l) : void 0;
    return s(l, d, u);
  }
}
const er = {}.hasOwnProperty, Ku = {};
function Xu(e, t) {
  const n = t || Ku, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = { ...Mu, ...n.handlers }, o = {
    all: c,
    applyData: Qu,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: s,
    one: l,
    options: n,
    patch: Yu,
    wrap: e1
  };
  return ka(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const d = u.type === "definition" ? r : i, m = String(u.identifier).toUpperCase();
      d.has(m) || d.set(m, u);
    }
  }), o;
  function l(u, d) {
    const m = u.type, p = o.handlers[m];
    if (er.call(o.handlers, m) && p)
      return p(o, u, d);
    if (o.options.passThrough && o.options.passThrough.includes(m)) {
      if ("children" in u) {
        const { children: T, ...R } = u, S = gn(R);
        return S.children = o.all(u), S;
      }
      return gn(u);
    }
    return (o.options.unknownHandler || Ju)(o, u, d);
  }
  function c(u) {
    const d = [];
    if ("children" in u) {
      const m = u.children;
      let p = -1;
      for (; ++p < m.length; ) {
        const w = o.one(m[p], u);
        if (w) {
          if (p && m[p - 1].type === "break" && (!Array.isArray(w) && w.type === "text" && (w.value = yi(w.value)), !Array.isArray(w) && w.type === "element")) {
            const T = w.children[0];
            T && T.type === "text" && (T.value = yi(T.value));
          }
          Array.isArray(w) ? d.push(...w) : d.push(w);
        }
      }
    }
    return d;
  }
}
function Yu(e, t) {
  e.position && (t.position = Oo(e));
}
function Qu(e, t) {
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
    n.type === "element" && a && Object.assign(n.properties, gn(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function Ju(e, t) {
  const n = t.data || {}, r = "value" in t && !(er.call(n, "hProperties") || er.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function e1(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function yi(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function wi(e, t) {
  const n = Xu(e, t), r = n.one(e, void 0), i = Uu(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function t1(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      wi(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      wi(n, { file: r, ...e || t })
    );
  };
}
function Ei(e) {
  if (e)
    throw e;
}
var pn = Object.prototype.hasOwnProperty, _a = Object.prototype.toString, Ti = Object.defineProperty, Si = Object.getOwnPropertyDescriptor, ki = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : _a.call(t) === "[object Array]";
}, _i = function(t) {
  if (!t || _a.call(t) !== "[object Object]")
    return !1;
  var n = pn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && pn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || pn.call(t, i);
}, xi = function(t, n) {
  Ti && n.name === "__proto__" ? Ti(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, bi = function(t, n) {
  if (n === "__proto__")
    if (pn.call(t, n)) {
      if (Si)
        return Si(t, n).value;
    } else return;
  return t[n];
}, n1 = function e() {
  var t, n, r, i, a, s, o = arguments[0], l = 1, c = arguments.length, u = !1;
  for (typeof o == "boolean" && (u = o, o = arguments[1] || {}, l = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); l < c; ++l)
    if (t = arguments[l], t != null)
      for (n in t)
        r = bi(o, n), i = bi(t, n), o !== i && (u && i && (_i(i) || (a = ki(i))) ? (a ? (a = !1, s = r && ki(r) ? r : []) : s = r && _i(r) ? r : {}, xi(o, { name: n, newValue: e(u, s, i) })) : typeof i < "u" && xi(o, { name: n, newValue: i }));
  return o;
};
const Dn = /* @__PURE__ */ Xi(n1);
function tr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function r1() {
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
      i = c, u ? i1(u, o)(...c) : s(null, ...c);
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
function i1(e, t) {
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
const it = { basename: a1, dirname: s1, extname: o1, join: l1, sep: "/" };
function a1(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  Jt(e);
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
function s1(e) {
  if (Jt(e), e.length === 0)
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
function o1(e) {
  Jt(e);
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
function l1(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    Jt(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : c1(n);
}
function c1(e) {
  Jt(e);
  const t = e.codePointAt(0) === 47;
  let n = u1(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function u1(e, t) {
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
function Jt(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const h1 = { cwd: p1 };
function p1() {
  return "/";
}
function nr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function d1(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!nr(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return f1(e);
}
function f1(e) {
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
class xa {
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
    t ? nr(t) ? n = { path: t } : typeof t == "string" || m1(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : h1.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
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
    return typeof this.path == "string" ? it.basename(this.path) : void 0;
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
    Fn(t, "basename"), Hn(t, "basename"), this.path = it.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? it.dirname(this.path) : void 0;
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
    Ai(this.basename, "dirname"), this.path = it.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? it.extname(this.path) : void 0;
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
    if (Hn(t, "extname"), Ai(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = it.join(this.dirname, this.stem + (t || ""));
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
    nr(t) && (t = d1(t)), Fn(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? it.basename(this.path, this.extname) : void 0;
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
    Fn(t, "stem"), Hn(t, "stem"), this.path = it.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new Ae(
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
  if (e && e.includes(it.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + it.sep + "`"
    );
}
function Fn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function Ai(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function m1(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const g1 = (
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
), C1 = {}.hasOwnProperty;
class wr extends g1 {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = r1();
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
      new wr()
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
    return typeof t == "string" ? arguments.length === 2 ? (Bn("data", this.frozen), this.namespace[t] = n, this) : C1.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Bn("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = sn(t), r = this.parser || this.Parser;
    return Un("parse", r), r(String(n), n);
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
    return this.freeze(), Un("process", this.parser || this.Parser), zn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, s) {
      const o = sn(t), l = (
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
        E1(w) ? m.value = w : m.result = w, c(
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
    return this.freeze(), Un("processSync", this.parser || this.Parser), zn("processSync", this.compiler || this.Compiler), this.process(t, i), Ri("processSync", "process", n), r;
    function i(a, s) {
      n = !0, Ei(a), r = s;
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
    Ii(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(s, o) {
      const l = sn(n);
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
    return this.run(t, n, a), Ri("runSync", "run", r), i;
    function a(s, o) {
      Ei(s), i = o, r = !0;
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
    const r = sn(n), i = this.compiler || this.Compiler;
    return zn("stringify", i), Ii(t), i(t, r);
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
        const T = r[m][1];
        tr(T) && tr(p) && (p = Dn(!0, T, p)), r[m] = [c, p, ...w];
      }
    }
  }
}
const y1 = new wr().freeze();
function Un(e, t) {
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
function Ii(e) {
  if (!tr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Ri(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function sn(e) {
  return w1(e) ? e : new xa(e);
}
function w1(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function E1(e) {
  return typeof e == "string" || T1(e);
}
function T1(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const S1 = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", vi = [], Ni = { allowDangerousHtml: !0 }, k1 = /^(https?|ircs?|mailto|xmpp)$/i, _1 = [
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
function Mi(e) {
  const t = x1(e), n = b1(e);
  return A1(t.runSync(t.parse(n), n), e);
}
function x1(e) {
  const t = e.rehypePlugins || vi, n = e.remarkPlugins || vi, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Ni } : Ni;
  return y1().use(su).use(n).use(t1, r).use(t);
}
function b1(e) {
  const t = e.children || "", n = new xa();
  return typeof t == "string" && (n.value = t), n;
}
function A1(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, s = t.skipHtml, o = t.unwrapDisallowed, l = t.urlTransform || I1;
  for (const u of _1)
    Object.hasOwn(t, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + S1 + u.id, void 0);
  return ka(e, c), Uo(e, {
    Fragment: Yt,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: h,
    jsxs: I,
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
          const w = u.properties[p], T = Mn[p];
          (T === null || T.includes(u.tagName)) && (u.properties[p] = l(String(w || ""), p, u));
        }
    }
    if (u.type === "element") {
      let p = n ? !n.includes(u.tagName) : a ? a.includes(u.tagName) : !1;
      if (!p && r && typeof d == "number" && (p = !r(u, d, m)), p && m && typeof d == "number")
        return o && u.children ? m.children.splice(d, 1, ...u.children) : m.children.splice(d, 1), d;
    }
  }
}
function I1(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    k1.test(e.slice(0, t)) ? e : ""
  );
}
function R1({ children: e, isStreaming: t }) {
  const [n, r] = te(!0), [i, a] = te(!1);
  Mt.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const s = () => {
    t || r(!n);
  }, o = Mt.Children.map(e, (l) => {
    if (Mt.isValidElement(l)) {
      if (l.type === ba)
        return Mt.cloneElement(
          l,
          {
            onToggle: s,
            isExpanded: n
          }
        );
      if (l.type === Aa)
        return Mt.cloneElement(
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
function ba({
  title: e,
  status: t = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const a = () => /* @__PURE__ */ I(
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
  ), s = t === "completed" || e.includes(W.UI_TEXT.THINKING) || e.includes(W.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ I(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${s ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: s ? r : void 0,
      style: { cursor: s ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ I("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ h("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        s && /* @__PURE__ */ h(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ I(
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
function Aa({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function v1({ children: e }) {
  return /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function N1({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var l, c;
  console.log("clog toolData", n);
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
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
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
          ) : /* @__PURE__ */ I(
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
          /* @__PURE__ */ I("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
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
          ) : /* @__PURE__ */ I(
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
          /* @__PURE__ */ I("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
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
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
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
          ) : /* @__PURE__ */ I(
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
          /* @__PURE__ */ I("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
function Ia({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ I("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
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
const M1 = ({ message: e }) => {
  const [t, n] = te(!0);
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ I(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!t),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          e.role === "system" ? /* @__PURE__ */ I("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
}, Ra = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ h("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code-block", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ h("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ h("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ h("li", { className: "chat-wrapper__list-item", ...t, children: e })
}, L1 = {
  ...Ra,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code", ...n, children: e })
}, va = Li(
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
    const [c, u] = te(!1), [d, m] = te(!1), p = ae(async () => {
      try {
        await navigator.clipboard.writeText(e.content), u(!0), setTimeout(() => u(!1), 2e3);
      } catch (L) {
        console.error("Failed to copy message:", L);
      }
    }, [e.content]), w = () => /* @__PURE__ */ I("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ h(Ia, { size: 16, variant: "dots" }),
      /* @__PURE__ */ h("span", { children: W.UI_TEXT.THINKING })
    ] }), T = () => /* @__PURE__ */ I(Yt, { children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ h(
        "button",
        {
          className: `chat-wrapper__copy-button ${d ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: p,
          title: "Copy message",
          children: /* @__PURE__ */ h(zs, {})
        }
      ) }),
      c && /* @__PURE__ */ h("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), R = () => /* @__PURE__ */ h("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(Mi, { components: Ra, children: e.content }) }),
      T()
    ] }) }), S = () => /* @__PURE__ */ I("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(Mi, { components: L1, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ h("div", { className: "chat-wrapper__media", children: e.media.map((L, y) => /* @__PURE__ */ h(
        "img",
        {
          src: L,
          alt: `Uploaded content ${y + 1}`,
          className: "chat-wrapper__media-image"
        },
        y
      )) })
    ] }), D = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === l.current ? w() : e.role === "system" ? /* @__PURE__ */ h(M1, { message: e }) : e.role === "assistant" ? R() : S(), k = () => /* @__PURE__ */ I(R1, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ h(
        ba,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ h(Aa, { children: i(e.content) })
    ] }), P = () => {
      var L;
      return /* @__PURE__ */ h(v1, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ h(
        N1,
        {
          title: a(e.content, e.isStreaming),
          status: s(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (L = e.toolData) == null ? void 0 : L.toolName,
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
        children: e.role === "reasoning" ? k() : e.role === "tooling" ? P() : /* @__PURE__ */ h("div", { className: "chat-wrapper__message-content", children: D() })
      }
    );
  }
);
va.displayName = "MessageItem";
const O1 = ({ isVisible: e }) => e ? /* @__PURE__ */ h("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ h("span", {}),
  /* @__PURE__ */ h("span", {}),
  /* @__PURE__ */ h("span", {})
] }) }) }) }) : null, Na = ir(({
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
}, d) => /* @__PURE__ */ I("div", { className: "chat-wrapper__messages", children: [
  e.map((m) => /* @__PURE__ */ h(
    va,
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
  /* @__PURE__ */ h(O1, { isVisible: t && !n }),
  /* @__PURE__ */ h("div", { ref: d })
] }));
Na.displayName = "MessagesList";
const Qe = (...e) => e.filter(Boolean).join(" "), D1 = () => /* @__PURE__ */ I(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ I("g", { filter: "url(#filter0_dd_121_23927)", children: [
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
      /* @__PURE__ */ I("defs", { children: [
        /* @__PURE__ */ I(
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
), P1 = ({ className: e, ...t }) => /* @__PURE__ */ h("form", { className: Qe("chat-wrapper__prompt-input", e), ...t }), Ma = ir(
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
        className: Qe("chat-wrapper__prompt-textarea", t),
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
Ma.displayName = "PromptInputTextarea";
const H1 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: Qe("chat-wrapper__prompt-toolbar", e), ...t }), F1 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: Qe("chat-wrapper__prompt-tools", e), ...t }), U1 = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || Mt.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ h(
    "button",
    {
      className: Qe(
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
}, z1 = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = Oe.IDLE,
  children: i,
  disabled: a,
  ...s
}) => {
  let o = /* @__PURE__ */ h(D1, {});
  const l = a || r === Oe.SUBMITTED || r === Oe.STREAMING;
  return /* @__PURE__ */ h(
    "button",
    {
      className: Qe(
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
}, lh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ h("select", { className: Qe("chat-wrapper__prompt-select", e), ...n, children: t }), ch = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ h(
  "button",
  {
    className: Qe("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), uh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h(
  "div",
  {
    className: Qe("chat-wrapper__prompt-select-content", e),
    ...t
  }
), hh = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ h(
  "div",
  {
    className: Qe("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), ph = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ h(
  "span",
  {
    className: Qe("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), B1 = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = te(0), [a, s] = te(!1), [o, l] = te(0);
  return Ye(() => {
    if (!t || e.length <= 1) return;
    const c = setInterval(() => {
      s(!0), setTimeout(() => {
        i((u) => (u + 1) % e.length), l((u) => u + 1), s(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(c);
  }, [t, e.length]), Ye(() => {
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
}, G1 = ir(
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
    const [m, p] = te(""), [w, T] = te([]), R = Tt(null), S = t && t.length > 0 ? t : [e], D = m.length === 0 && !o && S.length > 1;
    Ba(d, () => ({
      focus: () => {
        var y;
        (y = R.current) == null || y.focus();
      },
      setText: (y) => {
        p(y), setTimeout(() => {
          var U;
          (U = R.current) == null || U.focus();
        }, 0);
      }
    }));
    const k = ae(
      (y) => {
        y.preventDefault();
        const Z = new FormData(y.currentTarget).get("message");
        if (Z != null && Z.trim()) {
          const z = un(Z.trim(), !1);
          if (!z.trim()) {
            console.warn("Message was blocked due to security concerns");
            return;
          }
          l(z, w), p(""), T([]);
        }
      },
      [l, w]
    ), P = ae(
      (y) => {
        const Z = y.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
        p(Z);
      },
      []
    ), L = ae(async () => {
      const y = document.createElement("input");
      y.type = "file", y.accept = "image/*", y.multiple = !1, y.onchange = async (U) => {
        const Z = U.target.files;
        if (Z) {
          const z = Array.from(Z).filter((B) => {
            const A = xs(B.name);
            return A !== B.name && console.warn(
              `File name sanitized: ${B.name} -> ${A}`
            ), B.size > 10485760 ? (console.warn(`File too large: ${B.name} (${B.size} bytes)`), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ].includes(B.type) ? !0 : (console.warn(
              `File type not allowed: ${B.name} (${B.type})`
            ), !1);
          });
          if (z.length > 0) {
            const B = await c(z);
            T(B);
          }
        }
      }, y.click();
    }, [c]);
    return /* @__PURE__ */ I(P1, { onSubmit: k, style: { position: "relative" }, children: [
      /* @__PURE__ */ h(
        Ma,
        {
          ref: R,
          name: "message",
          value: m,
          onChange: P,
          placeholder: "",
          disabled: n
        }
      ),
      !m.trim() && /* @__PURE__ */ h(
        B1,
        {
          placeholderTexts: S,
          shouldAnimate: D
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
          children: w.map((y, U) => {
            const Z = y.startsWith("data:image/"), z = y.startsWith("http://") || y.startsWith("https://"), B = Z || z;
            return /* @__PURE__ */ I(
              "div",
              {
                style: {
                  position: "relative",
                  display: "inline-block"
                },
                children: [
                  B ? /* @__PURE__ */ I(
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
                            alt: `Attachment ${U + 1}`,
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
                  ) : /* @__PURE__ */ I(
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
                            children: /* @__PURE__ */ I(
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
                        /* @__PURE__ */ I("div", { style: { flex: 1, minWidth: 0 }, children: [
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
                                const A = y.match(/name=([^;]+)/);
                                return A ? decodeURIComponent(A[1]) : "document.pdf";
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
                                const A = y.match(/data:([^;]+)/);
                                if (A) {
                                  const N = A[1];
                                  switch (N) {
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
                                      const v = N.split("/")[1];
                                      return v ? v.toUpperCase().substring(0, 4) : "FILE";
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
                        T(
                          (A) => A.filter((N, v) => v !== U)
                        );
                      },
                      style: {
                        position: "absolute",
                        top: B ? "6px" : "8px",
                        right: B ? "6px" : "8px",
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
              U
            );
          })
        }
      ),
      /* @__PURE__ */ I(H1, { children: [
        /* @__PURE__ */ I(F1, { children: [
          i && /* @__PURE__ */ I(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center"
              },
              children: [
                /* @__PURE__ */ h(
                  U1,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: L,
                    title: w.length > 0 ? `${w.length} image(s) attached` : "Attach image",
                    disabled: n,
                    style: {
                      position: "relative"
                    },
                    children: /* @__PURE__ */ I(
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
                    onClick: L,
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
          a && /* @__PURE__ */ I("div", { className: "chat-wrapper__restaurant-chip", children: [
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
          z1,
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
), V1 = ({
  prompts: e,
  onPromptSelect: t
}) => /* @__PURE__ */ I("div", { className: "chat-wrapper__suggested-prompts", children: [
  /* @__PURE__ */ h("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
  /* @__PURE__ */ h("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((n, r) => /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__suggested-prompt-card",
      onClick: () => t(n),
      children: /* @__PURE__ */ I("div", { className: "chat-wrapper__suggested-prompt-content", children: [
        /* @__PURE__ */ h("h4", { className: "chat-wrapper__suggested-prompt-title", children: n.title }),
        /* @__PURE__ */ h("p", { className: "chat-wrapper__suggested-prompt-description", children: n.description })
      ] })
    },
    r
  )) })
] }), W1 = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ h(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ h("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ h(Ia, { size: e, variant: "dots" }) })
  }
), $1 = ({
  appName: e,
  description: t
}) => /* @__PURE__ */ I("div", { className: "chat-wrapper__main-header", children: [
  /* @__PURE__ */ h("h1", { className: "chat-wrapper__main-title", children: e }),
  t && /* @__PURE__ */ h("p", { className: "chat-wrapper__description", children: t })
] }), j1 = ({
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
  getReasoningStatus: T,
  getReasoningDuration: R,
  getReasoningContentOnly: S,
  getToolingTitle: D,
  getToolingStatus: k,
  currentAssistantMessageIdRef: P,
  fileUploadEnabled: L,
  onSubmit: y,
  onFileUpload: U,
  onStopGeneration: Z,
  onPromptSelect: z,
  messagesEndRef: B,
  chatInputRef: A,
  conversationError: N
}) => {
  const v = st.state.shouldShowMainHeader(
    e.length,
    n,
    t
  ), M = st.state.shouldShowSuggestedPrompts(
    e.length,
    n,
    t,
    d
  ), F = st.state.getContentAreaClass(
    e.length,
    n,
    t
  ), X = (ee) => {
    z ? z(ee) : A.current && A.current.setText(ee.description);
  };
  return /* @__PURE__ */ I(Yt, { children: [
    N && /* @__PURE__ */ h("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ I("p", { children: [
      "⚠️ ",
      N
    ] }) }),
    v && /* @__PURE__ */ h($1, { appName: a, description: s }),
    /* @__PURE__ */ I("div", { className: F, children: [
      t && e.length === 0 ? /* @__PURE__ */ h("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ h(W1, { fullHeight: !0 }) }) : /* @__PURE__ */ h(
        Na,
        {
          ref: B,
          messages: e,
          isThinking: r,
          isHandlingTool: i,
          getReasoningTitle: w,
          getReasoningStatus: T,
          getReasoningDuration: R,
          getReasoningContentOnly: S,
          getToolingTitle: D,
          getToolingStatus: k,
          clientTools: p || [],
          currentAssistantMessageIdRef: P
        }
      ),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ h(
        G1,
        {
          ref: A,
          placeholder: o,
          placeholderTexts: l,
          disabled: n,
          chatStatus: m,
          fileUploadEnabled: L,
          restaurantName: c,
          restaurantLogo: u,
          hasMessages: e.length > 0,
          onSubmit: (ee, pe) => y(ee, pe),
          onFileUpload: U,
          onStopGeneration: Z
        }
      ) }),
      M && /* @__PURE__ */ h(
        V1,
        {
          prompts: d,
          onPromptSelect: X
        }
      )
    ] })
  ] });
};
function Z1({
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
  var ye, he;
  st.validation.validateAuthProps({
    userMpAuthToken: e,
    chatServerUrl: t,
    chatServerKey: n,
    userId: i
  });
  const d = at(() => st.url.convertWebSocketToHttp(t), [t]), m = at(
    () => new Ns({
      apiUrl: d,
      userMpAuthToken: e,
      chatServerKey: n
    }),
    [d, e, n]
  ), p = at(() => l && l.length > 0 ? l.map(({ execute: re, ...fe }) => fe) : [], [l]), w = As(), T = Is({ initialMode: o.mode }), {
    messages: R,
    setMessages: S,
    isStreaming: D,
    setIsStreaming: k,
    isThinking: P,
    setIsThinking: L,
    streamingContent: y,
    isHandlingTool: U,
    currentAssistantMessageIdRef: Z,
    getReasoningStatus: z,
    getReasoningDuration: B,
    getReasoningContentOnly: A,
    getReasoningTitle: N,
    getToolingTitle: v,
    getToolingStatus: M,
    addMessage: F,
    handleSetMessage: X,
    handleReasoningUpdate: ee,
    handleChatFinished: pe,
    handleChatError: ke,
    stopGeneration: g
  } = w, {
    isModalOpen: Q,
    isCollapsed: de,
    currentMode: f,
    chatStatus: se,
    setChatStatus: G,
    streamingStatus: q,
    setStreamingStatus: me,
    isLoadingConversation: ce,
    setIsLoadingConversation: He,
    conversationError: Be,
    setConversationError: ct,
    setCurrentThreadId: It,
    currentConvUuid: je,
    setCurrentConvUuid: yt,
    isDevSettingsOpen: Ge,
    setIsDevSettingsOpen: Je,
    openModal: ut,
    closeModal: et,
    toggleCollapse: Ze,
    toggleFullscreen: ht
  } = T, kt = Tt(null), pt = Tt(null), Ft = ae((re) => {
    var fe;
    switch (re.type) {
      case Xe.CHAT_COMPLETED:
        pe(), setTimeout(() => {
          var _t;
          (_t = pt.current) == null || _t.focus();
        }, 0);
        break;
      case Xe.CHAT_ERROR:
        (fe = re.data) != null && fe.error && ke(re.data.error);
        break;
      case Xe.CONNECTION_LOST:
      case Xe.CONNECTION_RESTORED:
    }
  }, [pe, ke]), { agentClient: dt, isConnected: tt } = ts({
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
    onSetMessage: X,
    onSystemEvent: Ft,
    onReasoningUpdate: ee
  });
  vs({
    userId: i,
    httpApiUrl: d,
    userMpAuthToken: e,
    chatServerKey: n,
    messages: R,
    setMessages: S,
    setIsLoadingConversation: He,
    setConversationError: ct,
    setCurrentThreadId: It,
    setCurrentConvUuid: yt
  });
  const E = Tt(null), _ = ae(() => {
    E.current && cancelAnimationFrame(E.current), E.current = requestAnimationFrame(() => {
      var re;
      (re = kt.current) == null || re.scrollIntoView({ behavior: "smooth" }), E.current = null;
    });
  }, []);
  Ye(() => {
    _();
  }, [R, _]), Ye(() => {
    y && _();
  }, [y, _]), Ye(() => {
    o.onStreamingStatusChange && o.onStreamingStatusChange(q);
  }, [q, o]), Ye(() => () => {
    E.current && cancelAnimationFrame(E.current);
  }, []);
  const V = ae(
    async (re, fe) => {
      if (!re.trim() || D || !dt || !tt)
        return;
      const _t = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        role: "user",
        content: re.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: fe
      };
      S((Ve) => [...Ve, _t]), k(!0), L(!0), G(Oe.SUBMITTED), me($n.STARTING);
      try {
        await dt.onTriggerMessage({
          message: _t.content,
          media: fe,
          convUuid: je || void 0,
          agentPromptPath: void 0
        }), G(Oe.STREAMING);
      } catch (Ve) {
        console.error("Agent client send error:", Ve), L(!1), G(Oe.ERROR), F(
          "system",
          `Sorry, there was an error: ${Ve instanceof Error ? Ve.message : "Unknown error"}`
        ), o.onError && o.onError(
          Ve instanceof Error ? Ve : new Error("Unknown error")
        ), k(!1), G(Oe.IDLE), me($n.IDLE);
      }
    },
    [
      D,
      dt,
      tt,
      S,
      k,
      L,
      G,
      me,
      F,
      o,
      je
    ]
  ), Y = ae(
    async (re) => await m.uploadFiles(re),
    [m]
  ), ne = st.css.getContainerClasses(
    f,
    o.position,
    o.theme,
    de,
    o.constrainedHeight
  ), Te = ae(() => {
    f === "modal" ? ut() : Ze();
  }, [f, ut, Ze]), Fe = ae(() => {
    Je(!0);
  }, [Je]), _e = ae((re) => {
    pt.current && pt.current.setText(re.description);
  }, []);
  return st.state.shouldShowBubble(
    f,
    Q,
    de
  ) ? /* @__PURE__ */ h(Br, { children: /* @__PURE__ */ h(
    Bs,
    {
      mode: f,
      appName: o.appName,
      bubbleText: o.bubbleText,
      showBubbleText: ((ye = o.features) == null ? void 0 : ye.showBubbleText) !== !1,
      onClick: Te
    }
  ) }) : /* @__PURE__ */ h(Br, { children: /* @__PURE__ */ h(
    Os,
    {
      onError: (re) => {
        console.error("WebSocket error in ChatWrapper:", re), o.onError && o.onError(re);
      },
      children: /* @__PURE__ */ I("div", { className: ne, style: o.customStyles, children: [
        c && o.headerVisible === !1 && /* @__PURE__ */ h(
          "button",
          {
            className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
            onClick: Fe,
            title: "Developer Settings",
            children: /* @__PURE__ */ h(Gi, { size: 16 })
          }
        ),
        st.state.shouldShowHeader(o.headerVisible) && /* @__PURE__ */ h(
          Gs,
          {
            appName: o.appName,
            mode: f,
            isCollapsed: de,
            isModalOpen: Q,
            devMode: c,
            onClose: et,
            onToggleFullscreen: ht,
            onToggleCollapse: Ze,
            onOpenSettings: Fe
          }
        ),
        !de && /* @__PURE__ */ h(
          Ds,
          {
            onError: (re) => {
              console.error("File upload error:", re), o.onError && o.onError(re);
            },
            children: /* @__PURE__ */ h(
              j1,
              {
                messages: R,
                isLoadingConversation: ce,
                isStreaming: D,
                isThinking: P,
                isHandlingTool: U,
                appName: o.appName,
                description: o.description,
                placeholder: o.placeholder,
                placeholderTexts: o.placeholderTexts,
                restaurantName: o.restaurantName,
                restaurantLogo: o.restaurantLogo,
                suggestedPrompts: o.suggestedPrompts,
                chatStatus: se,
                clientTools: p,
                getReasoningTitle: N,
                getReasoningStatus: z,
                getReasoningDuration: B,
                getReasoningContentOnly: A,
                getToolingTitle: v,
                getToolingStatus: M,
                currentAssistantMessageIdRef: Z,
                fileUploadEnabled: (he = o.features) == null ? void 0 : he.fileUpload,
                onSubmit: V,
                onFileUpload: Y,
                onStopGeneration: g,
                onPromptSelect: _e,
                messagesEndRef: kt,
                chatInputRef: pt,
                conversationError: Be
              }
            )
          }
        ),
        /* @__PURE__ */ h(
          $a,
          {
            isOpen: Ge,
            onClose: () => Je(!1),
            apiUrl: d,
            userMpAuthToken: e,
            chatServerKey: n
          }
        )
      ] })
    }
  ) });
}
const dh = Li(Z1);
var q1 = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(q1 || {});
export {
  B1 as AnimatedPlaceholder,
  Oe as CHAT_STATUS,
  Ps as ChatIcon,
  dh as ChatWrapper,
  Hs as CloseIcon,
  Us as CollapseIcon,
  zs as CopyIcon,
  $a as DevSettings,
  q1 as EntityType,
  Fs as FullscreenIcon,
  W1 as InlineLoader,
  Ia as Loader,
  be as PROCESSING_STATUS,
  P1 as PromptInput,
  U1 as PromptInputButton,
  lh as PromptInputModelSelect,
  uh as PromptInputModelSelectContent,
  hh as PromptInputModelSelectItem,
  ch as PromptInputModelSelectTrigger,
  ph as PromptInputModelSelectValue,
  z1 as PromptInputSubmit,
  Ma as PromptInputTextarea,
  H1 as PromptInputToolbar,
  F1 as PromptInputTools,
  R1 as Reasoning,
  Aa as ReasoningContent,
  ba as ReasoningTrigger,
  $n as STREAMING_STATUS,
  Gi as SettingsIcon,
  V1 as SuggestedPrompts,
  oh as createThread,
  sh as fetchMessagesByConvUuid,
  ah as fetchThreadByConvUuid,
  Rs as fetchThreadMessages,
  ih as fetchUserThreads,
  Q1 as isChatActive,
  eh as isChatError,
  J1 as isChatIdle,
  th as isProcessingActive,
  nh as isProcessingComplete,
  rh as isProcessingError
};
