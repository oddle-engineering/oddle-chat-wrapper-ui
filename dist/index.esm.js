var qa = Object.defineProperty;
var Ka = (e, t, n) => t in e ? qa(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var F = (e, t, n) => Ka(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as h, jsxs as I, Fragment as tn } from "react/jsx-runtime";
import ht, { useState as le, useEffect as ke, useCallback as re, useRef as Ge, useMemo as De, Component as cr, createContext as Xa, useContext as Ya, memo as Vi, forwardRef as ur, useImperativeHandle as Ja } from "react";
async function Qa(e, t) {
  const n = {
    "Content-Type": "application/json"
  };
  t != null && t.userMpAuthToken && (n["x-oddle-mp-auth-token"] = t.userMpAuthToken), t != null && t.chatServerKey && (n["x-oddle-chat-server-key"] = t.chatServerKey);
  const r = await fetch(`${e}/api/v1/agent-configuration`, {
    method: "GET",
    headers: n
  });
  if (!r.ok) {
    const a = await r.json().catch(() => ({}));
    throw new Error(
      a.message || `Failed to get agent configuration: ${r.statusText}`
    );
  }
  return (await r.json()).configuration;
}
async function eo(e, t, n) {
  const r = {
    "Content-Type": "application/json"
  };
  n != null && n.userMpAuthToken && (r["x-oddle-mp-auth-token"] = n.userMpAuthToken), n != null && n.chatServerKey && (r["x-oddle-chat-server-key"] = n.chatServerKey);
  const i = await fetch(`${e}/api/v1/agent-configuration`, {
    method: "PUT",
    headers: r,
    body: JSON.stringify(t)
  });
  if (!i.ok) {
    const o = await i.json().catch(() => ({}));
    throw new Error(
      o.message || `Failed to update agent configuration: ${i.statusText}`
    );
  }
  return (await i.json()).configuration;
}
const to = ({
  isOpen: e,
  onClose: t,
  apiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  app: a = "UD21"
  // Default to UD21 if not specified
}) => {
  const [o, s] = le(null), [l, c] = le(""), [u, d] = le(""), [m, p] = le(!1), [w, S] = le(null);
  ke(() => {
    e && !o && R();
  }, [e]);
  const R = re(async () => {
    p(!0), S(null);
    try {
      const T = await Qa(n, {
        userMpAuthToken: r,
        chatServerKey: i
      });
      if (!T)
        throw new Error(`No configuration found for app: ${a}`);
      s(T), c(T.promptPath), d(T.versionUuid);
    } catch (T) {
      S(T instanceof Error ? T.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", T);
    } finally {
      p(!1);
    }
  }, [n, a, r, i]), y = re(async () => {
    if (o) {
      p(!0), S(null);
      try {
        const T = await eo(n, {
          app: o.app,
          promptPath: l,
          versionUuid: u,
          isDefault: o.isDefault
        }, {
          userMpAuthToken: r,
          chatServerKey: i
        });
        s(T), t(), window.location.reload();
      } catch (T) {
        S(T instanceof Error ? T.message : "Failed to update configuration"), console.error("Error updating agent configuration:", T);
      } finally {
        p(!1);
      }
    }
  }, [n, l, u, o, t, r, i]), L = re(() => {
    o && (c(o.promptPath), d(o.versionUuid)), S(null), t();
  }, [o, t]);
  return e ? /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ h("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: L,
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
      o && !m && /* @__PURE__ */ I(tn, { children: [
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: l,
              onChange: (T) => c(T.target.value),
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
              onChange: (T) => d(T.target.value),
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
              value: o.app,
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
          onClick: L,
          disabled: m,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: y,
          disabled: m || !o,
          children: m ? "Saving..." : "Save"
        }
      )
    ] })
  ] }) }) : null;
}, no = {
  maxReconnectAttempts: 5,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, Fr = {
  NORMAL: 1e3,
  GOING_AWAY: 1001
};
var nt = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(nt || {}), wt = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e))(wt || {}), Oe = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(Oe || {}), dn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(dn || {}), xt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(xt || {});
class Pt {
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
    return this.createConnectionEvent(nt.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(nt.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(nt.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(nt.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(nt.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(nt.CHAT_ERROR, { error: t, errorCode: n });
  }
}
class bt {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(t) {
    return {
      type: wt.CHAT_MESSAGE,
      content: t.content,
      media: t.media || [],
      userId: t.userId,
      providerResId: t.providerResId
    };
  }
  /**
   * Create a configure tools message
   */
  static createConfigureToolsMessage(t, n) {
    return {
      type: wt.CONFIGURE_TOOLS,
      toolSchemas: t,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(t) {
    return {
      type: wt.UPDATE_TOOLS,
      toolSchemas: t
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(t) {
    return {
      type: wt.UPDATE_CONTEXT_HELPERS,
      contextHelpers: t
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(t, n) {
    return {
      type: wt.TOOL_CALL_RESPONSE,
      callId: t,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(t, n) {
    return {
      type: wt.TOOL_CALL_RESPONSE,
      callId: t,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: wt.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(t, n) {
    return {
      type: wt.HEARTBEAT_PONG,
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
class ro {
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
    const { NORMAL: n, GOING_AWAY: r } = Fr;
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
        Pt.connectionLost("Max reconnection attempts reached")
      ));
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    (a = this.onSystemEvent) == null || a.call(this, Pt.reconnecting(t, n)), this.reconnectTimer = window.setTimeout(() => {
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
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Pt.connectionRestored()), (n = this.onOpen) == null || n.call(this);
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
    const t = bt.serializeHeartbeatPing();
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
    this.ws && this.ws.close(Fr.NORMAL);
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
class io {
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
class Cn {
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
class Wi {
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
const j = {
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
  isThinkingMessage: (e) => e.startsWith(j.THINKING_PREFIX) || e.startsWith(j.REASONING_PREFIX) || e.startsWith(j.THOUGHT_PREFIX),
  isCompletedMessage: (e) => e.includes(j.COMPLETED_MARKER),
  isErrorMessage: (e) => e.includes(j.ERROR_MARKER),
  isHandlingMessage: (e) => e.includes(j.HANDLING_MARKER),
  extractDuration: (e) => {
    const t = e.match(j.PATTERNS.DURATION);
    return t ? ` for ${t[1]} seconds` : void 0;
  },
  cleanReasoningContent: (e) => {
    let t = e.replace(new RegExp(`^${j.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${j.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${j.THOUGHT_PREFIX}\\s*`), "");
    return t = t.replace(/\s*for [\d.]+\s*seconds$/, ""), t = t.replace(j.PATTERNS.THOUGHT_CONTENT, ""), t.trim();
  },
  getMessageType: (e, t) => t === !1 ? ye.isErrorMessage(e) ? j.MESSAGE_TYPES.ERROR : (ye.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || ye.isThinkingMessage(e), j.MESSAGE_TYPES.THOUGHT) : ye.isCompletedMessage(e) ? j.MESSAGE_TYPES.COMPLETED : ye.isErrorMessage(e) ? j.MESSAGE_TYPES.ERROR : (ye.isHandlingMessage(e) || ye.isThinkingMessage(e) && !e.includes(j.UI_TEXT.AI_IS_THINKING), j.MESSAGE_TYPES.THINKING)
};
class ao extends Wi {
  constructor(n) {
    super({ onReasoningUpdate: n });
    F(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    F(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, o) {
    const s = this.getHandler("onReasoningUpdate");
    if (!s) return;
    const l = Cn.createReasoningCall(
      i,
      a,
      o || {}
    );
    s(n, r, l);
  }
  handleReasoningStart(n) {
    const r = n.id || "reasoning";
    this.reasoningStartTimes.set(r, Date.now()), this.reasoningContent.set(r, "");
  }
  handleReasoningDelta(n) {
    if (!n.text) return;
    const r = n.id || "reasoning", a = (this.reasoningContent.get(r) || "") + n.text;
    this.reasoningContent.set(r, a);
    const o = `${j.THINKING_PREFIX} ${a}`;
    this.triggerReasoningUpdate(
      !0,
      o,
      r,
      "thinking",
      { text: a }
    );
  }
  handleReasoningEnd(n) {
    const r = n.id || "reasoning", i = this.reasoningContent.get(r) || "", a = this.reasoningStartTimes.get(r);
    let o = "";
    a && (o = ` for ${((Date.now() - a) / 1e3).toFixed(0)} seconds`, this.reasoningStartTimes.delete(r));
    const s = i || j.UI_TEXT.THOUGHT, l = `${j.THOUGHT_PREFIX} ${s}${o}`;
    this.triggerReasoningUpdate(
      !1,
      l,
      r,
      "end",
      { duration: o, fullContent: i }
    ), this.reasoningContent.delete(r);
  }
  setReasoningUpdateHandler(n) {
    this.updateEventHandlers({ onReasoningUpdate: n });
  }
}
class oo extends Wi {
  constructor(n = {}, r) {
    super({ onReasoningUpdate: r });
    F(this, "processedToolCalls", /* @__PURE__ */ new Set());
    F(this, "clientTools", {});
    F(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var o, s, l;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (o = this.getHandler("onReasoningUpdate")) == null || o(!0, `${j.HANDLING_MARKER} ${i}`, n);
      try {
        const c = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, c), (s = this.getHandler("onReasoningUpdate")) == null || s(!1, `${j.COMPLETED_MARKER} ${i}`, n);
      } catch (c) {
        this.sendToolError(r, c), (l = this.getHandler("onReasoningUpdate")) == null || l(!1, `${j.ERROR_MARKER} Error: ${i} - ${c}`, n);
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
    const i = bt.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = bt.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = Cn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId,
        n.args || {}
      );
      r(!0, `${j.HANDLING_MARKER} ${n.toolName}`, a);
    }
  }
  handleServerToolResult(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = Cn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId
      );
      r(
        !1,
        `${j.COMPLETED_MARKER} ${n.toolName}`,
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
class so {
  constructor(t, n = {}) {
    F(this, "reasoningHandler");
    F(this, "toolHandler");
    F(this, "handlers");
    F(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new ao(t.onReasoningUpdate), this.toolHandler = new oo(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case Oe.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case Oe.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case Oe.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case Oe.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case Oe.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case Oe.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case Oe.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case Oe.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case Oe.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case Oe.HEARTBEAT_ACK:
          break;
        case Oe.ERROR:
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
      case dn.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case dn.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case dn.CONTENT_DELTA:
        (n = t.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, t.data.delta));
        break;
    }
  }
  handleProviderEvent(t) {
    var r, i, a;
    switch ((r = t.data) == null ? void 0 : r.type) {
      case xt.TEXT_DELTA:
        t.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, t.data.textDelta));
        break;
      case xt.REASONING_START:
        this.reasoningHandler.handleReasoningStart(t.data);
        break;
      case xt.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(t.data);
        break;
      case xt.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(t.data);
        break;
      case xt.TOOL_CALL:
        this.toolHandler.handleServerToolCall(t.data);
        break;
      case xt.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(t.data);
        break;
    }
  }
  handleLatitudeEvent(t) {
    var n;
    if (((n = t.data) == null ? void 0 : n.type) === xt.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = t.data;
      if (r.toolCallId && r.toolName) {
        const i = Cn.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${j.COMPLETED_MARKER} ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Pt.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Pt.chatError(t.error || "Unknown error"));
  }
  handleToolCallRequest(t) {
    this.toolHandler.handleToolCallRequest(t);
  }
  handleHeartbeatPing(t) {
    if (!this.sendMessage)
      return;
    const n = bt.serializeHeartbeatPong(
      t.timestamp,
      t.pingTime
    );
    this.sendMessage(n);
  }
  handleError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Pt.chatError(t.error || "Unknown WebSocket error"));
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
async function lo(e, t) {
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
function qn(e) {
  if (!e.success || !e.ticket || !e.expiresAt)
    return !1;
  const t = new Date(e.expiresAt).getTime();
  return Date.now() < t - 3e4;
}
function Ur(e) {
  const t = qn(e), n = new Date(e.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: t,
    expiresIn: i,
    expired: r >= n
  };
}
class co {
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
    return this.ticket && qn(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
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
      return this.ticket = await lo(this.apiUrl, this.authData), console.log("TicketManager: Ticket received successfully", {
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
      const r = Ur(this.ticket).expiresIn / 1e3;
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
    return this.ticket ? qn(this.ticket) : !1;
  }
  /**
   * Get time until ticket expires (in milliseconds)
   */
  getExpiresIn() {
    if (this.ticket)
      try {
        return Ur(this.ticket).expiresIn;
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
class uo {
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
      ...no
    }, this.connectionState = new io(), this.wsManager = new ro(this.config, this.connectionState), this.messageHandler = new so({}), this.setupWebSocketHandlers();
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
    ), this.handleAuthenticationFailure(n)), (n == null ? void 0 : n.type) === Oe.TOOLS_CONFIGURED && ((r = this.initResolve) == null || r.call(this)), (n == null ? void 0 : n.type) === Oe.SESSION_ESTABLISHED && (this.toolSchemas && this.toolSchemas.length > 0 ? this.sendToolConfiguration() : (i = this.initResolve) == null || i.call(this));
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
      var o;
      console.error("Failed to refresh ticket:", a), (o = this.initReject) == null || o.call(this, a);
    })) : (i = this.initReject) == null || i.call(this, new Error(`Authentication failed: ${n == null ? void 0 : n.error}`));
  }
  sendToolConfiguration() {
    const t = bt.serializeConfigureTools(
      this.toolSchemas,
      this.contextHelpers
    );
    this.wsManager.send(t);
  }
  async onInit(t) {
    return this.setupEventHandlers(t), this.setupToolsAndContext(t), this.updateConfig(t), this.ticketManager = new co(
      {
        userMpAuthToken: t.userMpAuthToken,
        chatServerKey: t.chatServerKey,
        userId: t.userId,
        entityId: t.entityId,
        entityType: t.entityType
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
    const { message: n, media: r, providerResId: i } = t;
    try {
      this.messageHandler.clearProcessedToolCalls();
      const a = bt.serializeChatMessage({
        content: n,
        media: r,
        userId: this.config.userId,
        providerResId: i
      });
      this.wsManager.send(a);
    } catch (a) {
      throw a;
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
    const n = bt.serializeUpdateContextHelpers(
      this.contextHelpers
    );
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = bt.serializeUpdateTools(this.toolSchemas);
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
function ho({
  // Authentication and server properties
  userMpAuthToken: e,
  chatServerUrl: t,
  chatServerKey: n,
  // Entity configuration
  userId: r,
  entityId: i,
  entityType: a,
  // Tools configuration
  tools: o,
  // Other properties
  contextHelpers: s,
  onSetMessage: l,
  onSystemEvent: c,
  onReasoningUpdate: u
}) {
  const [d, m] = le(null), [p, w] = le(!1), [S, R] = le(!1), y = Ge(null), L = Ge(l), T = Ge(c), D = Ge(u);
  ke(() => {
    L.current = l, T.current = c, D.current = u;
  }, [l, c, u]);
  const { toolSchemas: O, clientToolExecutors: _ } = De(() => {
    if (o && o.length > 0) {
      const M = o.map(({ execute: v, ...N }) => N), G = {};
      return o.forEach((v) => {
        G[v.name] = v.execute;
      }), {
        toolSchemas: M,
        clientToolExecutors: G
      };
    }
    return {
      toolSchemas: [],
      clientToolExecutors: {}
    };
  }, [o]), B = re(async () => {
    try {
      if (R(!0), !e)
        throw new Error("userMpAuthToken is required");
      if (!t)
        throw new Error("chatServerUrl is required");
      if (!n)
        throw new Error("chatServerKey is required");
      if (!r)
        throw new Error("userId is required");
      const M = new uo();
      y.current = M, m(M);
      const G = s || {};
      await M.onInit({
        // Authentication and server properties
        userMpAuthToken: e,
        chatServerUrl: t,
        chatServerKey: n,
        userId: r,
        entityId: i,
        entityType: a == null ? void 0 : a.toString(),
        // Tools configuration
        toolSchemas: O,
        clientTools: _,
        contextHelpers: G,
        onSetMessage: L.current,
        onSystemEvent: T.current,
        onReasoningUpdate: D.current
      }), w(!0);
    } catch (M) {
      console.error("Error connecting WebSocketChatClient:", M), w(!1);
    } finally {
      R(!1);
    }
  }, [
    e,
    t,
    n,
    r,
    i,
    a,
    O,
    _,
    s
    // Removed onSetMessage, onSystemEvent, onReasoningUpdate to prevent reconnections
  ]), q = re(() => {
    y.current && (y.current.disconnect(), y.current = null), m(null), w(!1);
  }, []);
  return ke(() => (B(), () => {
    q();
  }), [B, q]), ke(() => {
    const M = setInterval(() => {
      if (y.current) {
        const G = y.current.getConnectionStatus();
        w(G.connected);
      }
    }, 1e3);
    return () => clearInterval(M);
  }, []), {
    chatClient: d,
    isConnected: p,
    isConnecting: S,
    connectChatClient: B,
    disconnectChatClient: q
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: ji,
  setPrototypeOf: zr,
  isFrozen: po,
  getPrototypeOf: fo,
  getOwnPropertyDescriptor: mo
} = Object;
let {
  freeze: Re,
  seal: Ye,
  create: Kn
} = Object, {
  apply: Xn,
  construct: Yn
} = typeof Reflect < "u" && Reflect;
Re || (Re = function(t) {
  return t;
});
Ye || (Ye = function(t) {
  return t;
});
Xn || (Xn = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
Yn || (Yn = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const sn = Ae(Array.prototype.forEach), go = Ae(Array.prototype.lastIndexOf), Br = Ae(Array.prototype.pop), Vt = Ae(Array.prototype.push), Co = Ae(Array.prototype.splice), fn = Ae(String.prototype.toLowerCase), An = Ae(String.prototype.toString), Nn = Ae(String.prototype.match), Wt = Ae(String.prototype.replace), yo = Ae(String.prototype.indexOf), wo = Ae(String.prototype.trim), tt = Ae(Object.prototype.hasOwnProperty), Ie = Ae(RegExp.prototype.test), jt = So(TypeError);
function Ae(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Xn(e, t, r);
  };
}
function So(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return Yn(e, n);
  };
}
function X(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : fn;
  zr && zr(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (po(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function Eo(e) {
  for (let t = 0; t < e.length; t++)
    tt(e, t) || (e[t] = null);
  return e;
}
function St(e) {
  const t = Kn(null);
  for (const [n, r] of ji(e))
    tt(e, n) && (Array.isArray(r) ? t[n] = Eo(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = St(r) : t[n] = r);
  return t;
}
function $t(e, t) {
  for (; e !== null; ) {
    const r = mo(e, t);
    if (r) {
      if (r.get)
        return Ae(r.get);
      if (typeof r.value == "function")
        return Ae(r.value);
    }
    e = fo(e);
  }
  function n() {
    return null;
  }
  return n;
}
const Gr = Re(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Mn = Re(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Ln = Re(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), _o = Re(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), On = Re(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), To = Re(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Vr = Re(["#text"]), Wr = Re(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Dn = Re(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), jr = Re(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), ln = Re(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), ko = Ye(/\{\{[\w\W]*|[\w\W]*\}\}/gm), xo = Ye(/<%[\w\W]*|[\w\W]*%>/gm), bo = Ye(/\$\{[\w\W]*/gm), vo = Ye(/^data-[\-\w.\u00B7-\uFFFF]+$/), Io = Ye(/^aria-[\-\w]+$/), $i = Ye(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Ro = Ye(/^(?:\w+script|data):/i), Ao = Ye(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Zi = Ye(/^html$/i), No = Ye(/^[a-z][.\w]*(-[.\w]+)+$/i);
var $r = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Io,
  ATTR_WHITESPACE: Ao,
  CUSTOM_ELEMENT: No,
  DATA_ATTR: vo,
  DOCTYPE_NAME: Zi,
  ERB_EXPR: xo,
  IS_ALLOWED_URI: $i,
  IS_SCRIPT_OR_DATA: Ro,
  MUSTACHE_EXPR: ko,
  TMPLIT_EXPR: bo
});
const Zt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Mo = function() {
  return typeof window > "u" ? null : window;
}, Lo = function(t, n) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let r = null;
  const i = "data-tt-policy-suffix";
  n && n.hasAttribute(i) && (r = n.getAttribute(i));
  const a = "dompurify" + (r ? "#" + r : "");
  try {
    return t.createPolicy(a, {
      createHTML(o) {
        return o;
      },
      createScriptURL(o) {
        return o;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + a + " could not be created."), null;
  }
}, Zr = function() {
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
function qi() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Mo();
  const t = (H) => qi(H);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== Zt.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: o,
    Node: s,
    Element: l,
    NodeFilter: c,
    NamedNodeMap: u = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: m,
    trustedTypes: p
  } = e, w = l.prototype, S = $t(w, "cloneNode"), R = $t(w, "remove"), y = $t(w, "nextSibling"), L = $t(w, "childNodes"), T = $t(w, "parentNode");
  if (typeof o == "function") {
    const H = n.createElement("template");
    H.content && H.content.ownerDocument && (n = H.content.ownerDocument);
  }
  let D, O = "";
  const {
    implementation: _,
    createNodeIterator: B,
    createDocumentFragment: q,
    getElementsByTagName: M
  } = n, {
    importNode: G
  } = r;
  let v = Zr();
  t.isSupported = typeof ji == "function" && typeof T == "function" && _ && _.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: N,
    ERB_EXPR: U,
    TMPLIT_EXPR: V,
    DATA_ATTR: W,
    ARIA_ATTR: Q,
    IS_SCRIPT_OR_DATA: ne,
    ATTR_WHITESPACE: de,
    CUSTOM_ELEMENT: ve
  } = $r;
  let {
    IS_ALLOWED_URI: g
  } = $r, J = null;
  const we = X({}, [...Gr, ...Mn, ...Ln, ...On, ...Vr]);
  let f = null;
  const Se = X({}, [...Wr, ...Dn, ...jr, ...ln]);
  let ee = Object.seal(Kn(null, {
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
  })), ae = null, We = null;
  const fe = Object.seal(Kn(null, {
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
  let je = !0, Fe = !0, it = !1, It = !0, Je = !1, mt = !0, Ue = !1, Et = !1, _t = !1, Qe = !1, at = !1, ot = !1, Tt = !0, st = !1;
  const Bt = "user-content-";
  let gt = !0, et = !1, E = {}, b = null;
  const z = X({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let Z = null;
  const Y = X({}, ["audio", "video", "img", "source", "image", "track"]);
  let me = null;
  const ze = X({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), _e = "http://www.w3.org/1998/Math/MathML", $e = "http://www.w3.org/2000/svg", ge = "http://www.w3.org/1999/xhtml";
  let ue = ge, Ze = !1, Ne = null;
  const on = X({}, [_e, $e, ge], An);
  let Rt = X({}, ["mi", "mo", "mn", "ms", "mtext"]), A = X({}, ["annotation-xml"]);
  const lt = X({}, ["title", "style", "font", "a", "script"]);
  let qe = null;
  const Gt = ["application/xhtml+xml", "text/html"], Wa = "text/html";
  let Ce = null, Lt = null;
  const ja = n.createElement("form"), br = function(C) {
    return C instanceof RegExp || C instanceof Function;
  }, vn = function() {
    let C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Lt && Lt === C)) {
      if ((!C || typeof C != "object") && (C = {}), C = St(C), qe = // eslint-disable-next-line unicorn/prefer-includes
      Gt.indexOf(C.PARSER_MEDIA_TYPE) === -1 ? Wa : C.PARSER_MEDIA_TYPE, Ce = qe === "application/xhtml+xml" ? An : fn, J = tt(C, "ALLOWED_TAGS") ? X({}, C.ALLOWED_TAGS, Ce) : we, f = tt(C, "ALLOWED_ATTR") ? X({}, C.ALLOWED_ATTR, Ce) : Se, Ne = tt(C, "ALLOWED_NAMESPACES") ? X({}, C.ALLOWED_NAMESPACES, An) : on, me = tt(C, "ADD_URI_SAFE_ATTR") ? X(St(ze), C.ADD_URI_SAFE_ATTR, Ce) : ze, Z = tt(C, "ADD_DATA_URI_TAGS") ? X(St(Y), C.ADD_DATA_URI_TAGS, Ce) : Y, b = tt(C, "FORBID_CONTENTS") ? X({}, C.FORBID_CONTENTS, Ce) : z, ae = tt(C, "FORBID_TAGS") ? X({}, C.FORBID_TAGS, Ce) : St({}), We = tt(C, "FORBID_ATTR") ? X({}, C.FORBID_ATTR, Ce) : St({}), E = tt(C, "USE_PROFILES") ? C.USE_PROFILES : !1, je = C.ALLOW_ARIA_ATTR !== !1, Fe = C.ALLOW_DATA_ATTR !== !1, it = C.ALLOW_UNKNOWN_PROTOCOLS || !1, It = C.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Je = C.SAFE_FOR_TEMPLATES || !1, mt = C.SAFE_FOR_XML !== !1, Ue = C.WHOLE_DOCUMENT || !1, Qe = C.RETURN_DOM || !1, at = C.RETURN_DOM_FRAGMENT || !1, ot = C.RETURN_TRUSTED_TYPE || !1, _t = C.FORCE_BODY || !1, Tt = C.SANITIZE_DOM !== !1, st = C.SANITIZE_NAMED_PROPS || !1, gt = C.KEEP_CONTENT !== !1, et = C.IN_PLACE || !1, g = C.ALLOWED_URI_REGEXP || $i, ue = C.NAMESPACE || ge, Rt = C.MATHML_TEXT_INTEGRATION_POINTS || Rt, A = C.HTML_INTEGRATION_POINTS || A, ee = C.CUSTOM_ELEMENT_HANDLING || {}, C.CUSTOM_ELEMENT_HANDLING && br(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (ee.tagNameCheck = C.CUSTOM_ELEMENT_HANDLING.tagNameCheck), C.CUSTOM_ELEMENT_HANDLING && br(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (ee.attributeNameCheck = C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), C.CUSTOM_ELEMENT_HANDLING && typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (ee.allowCustomizedBuiltInElements = C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Je && (Fe = !1), at && (Qe = !0), E && (J = X({}, Vr), f = [], E.html === !0 && (X(J, Gr), X(f, Wr)), E.svg === !0 && (X(J, Mn), X(f, Dn), X(f, ln)), E.svgFilters === !0 && (X(J, Ln), X(f, Dn), X(f, ln)), E.mathMl === !0 && (X(J, On), X(f, jr), X(f, ln))), C.ADD_TAGS && (typeof C.ADD_TAGS == "function" ? fe.tagCheck = C.ADD_TAGS : (J === we && (J = St(J)), X(J, C.ADD_TAGS, Ce))), C.ADD_ATTR && (typeof C.ADD_ATTR == "function" ? fe.attributeCheck = C.ADD_ATTR : (f === Se && (f = St(f)), X(f, C.ADD_ATTR, Ce))), C.ADD_URI_SAFE_ATTR && X(me, C.ADD_URI_SAFE_ATTR, Ce), C.FORBID_CONTENTS && (b === z && (b = St(b)), X(b, C.FORBID_CONTENTS, Ce)), gt && (J["#text"] = !0), Ue && X(J, ["html", "head", "body"]), J.table && (X(J, ["tbody"]), delete ae.tbody), C.TRUSTED_TYPES_POLICY) {
        if (typeof C.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw jt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof C.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw jt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        D = C.TRUSTED_TYPES_POLICY, O = D.createHTML("");
      } else
        D === void 0 && (D = Lo(p, i)), D !== null && typeof O == "string" && (O = D.createHTML(""));
      Re && Re(C), Lt = C;
    }
  }, vr = X({}, [...Mn, ...Ln, ..._o]), Ir = X({}, [...On, ...To]), $a = function(C) {
    let x = T(C);
    (!x || !x.tagName) && (x = {
      namespaceURI: ue,
      tagName: "template"
    });
    const P = fn(C.tagName), ce = fn(x.tagName);
    return Ne[C.namespaceURI] ? C.namespaceURI === $e ? x.namespaceURI === ge ? P === "svg" : x.namespaceURI === _e ? P === "svg" && (ce === "annotation-xml" || Rt[ce]) : !!vr[P] : C.namespaceURI === _e ? x.namespaceURI === ge ? P === "math" : x.namespaceURI === $e ? P === "math" && A[ce] : !!Ir[P] : C.namespaceURI === ge ? x.namespaceURI === $e && !A[ce] || x.namespaceURI === _e && !Rt[ce] ? !1 : !Ir[P] && (lt[P] || !vr[P]) : !!(qe === "application/xhtml+xml" && Ne[C.namespaceURI]) : !1;
  }, ct = function(C) {
    Vt(t.removed, {
      element: C
    });
    try {
      T(C).removeChild(C);
    } catch {
      R(C);
    }
  }, At = function(C, x) {
    try {
      Vt(t.removed, {
        attribute: x.getAttributeNode(C),
        from: x
      });
    } catch {
      Vt(t.removed, {
        attribute: null,
        from: x
      });
    }
    if (x.removeAttribute(C), C === "is")
      if (Qe || at)
        try {
          ct(x);
        } catch {
        }
      else
        try {
          x.setAttribute(C, "");
        } catch {
        }
  }, Rr = function(C) {
    let x = null, P = null;
    if (_t)
      C = "<remove></remove>" + C;
    else {
      const he = Nn(C, /^[\r\n\t ]+/);
      P = he && he[0];
    }
    qe === "application/xhtml+xml" && ue === ge && (C = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + C + "</body></html>");
    const ce = D ? D.createHTML(C) : C;
    if (ue === ge)
      try {
        x = new m().parseFromString(ce, qe);
      } catch {
      }
    if (!x || !x.documentElement) {
      x = _.createDocument(ue, "template", null);
      try {
        x.documentElement.innerHTML = Ze ? O : ce;
      } catch {
      }
    }
    const Te = x.body || x.documentElement;
    return C && P && Te.insertBefore(n.createTextNode(P), Te.childNodes[0] || null), ue === ge ? M.call(x, Ue ? "html" : "body")[0] : Ue ? x.documentElement : Te;
  }, Ar = function(C) {
    return B.call(
      C.ownerDocument || C,
      C,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, In = function(C) {
    return C instanceof d && (typeof C.nodeName != "string" || typeof C.textContent != "string" || typeof C.removeChild != "function" || !(C.attributes instanceof u) || typeof C.removeAttribute != "function" || typeof C.setAttribute != "function" || typeof C.namespaceURI != "string" || typeof C.insertBefore != "function" || typeof C.hasChildNodes != "function");
  }, Nr = function(C) {
    return typeof s == "function" && C instanceof s;
  };
  function Ct(H, C, x) {
    sn(H, (P) => {
      P.call(t, C, x, Lt);
    });
  }
  const Mr = function(C) {
    let x = null;
    if (Ct(v.beforeSanitizeElements, C, null), In(C))
      return ct(C), !0;
    const P = Ce(C.nodeName);
    if (Ct(v.uponSanitizeElement, C, {
      tagName: P,
      allowedTags: J
    }), mt && C.hasChildNodes() && !Nr(C.firstElementChild) && Ie(/<[/\w!]/g, C.innerHTML) && Ie(/<[/\w!]/g, C.textContent) || C.nodeType === Zt.progressingInstruction || mt && C.nodeType === Zt.comment && Ie(/<[/\w]/g, C.data))
      return ct(C), !0;
    if (!(fe.tagCheck instanceof Function && fe.tagCheck(P)) && (!J[P] || ae[P])) {
      if (!ae[P] && Or(P) && (ee.tagNameCheck instanceof RegExp && Ie(ee.tagNameCheck, P) || ee.tagNameCheck instanceof Function && ee.tagNameCheck(P)))
        return !1;
      if (gt && !b[P]) {
        const ce = T(C) || C.parentNode, Te = L(C) || C.childNodes;
        if (Te && ce) {
          const he = Te.length;
          for (let Me = he - 1; Me >= 0; --Me) {
            const yt = S(Te[Me], !0);
            yt.__removalCount = (C.__removalCount || 0) + 1, ce.insertBefore(yt, y(C));
          }
        }
      }
      return ct(C), !0;
    }
    return C instanceof l && !$a(C) || (P === "noscript" || P === "noembed" || P === "noframes") && Ie(/<\/no(script|embed|frames)/i, C.innerHTML) ? (ct(C), !0) : (Je && C.nodeType === Zt.text && (x = C.textContent, sn([N, U, V], (ce) => {
      x = Wt(x, ce, " ");
    }), C.textContent !== x && (Vt(t.removed, {
      element: C.cloneNode()
    }), C.textContent = x)), Ct(v.afterSanitizeElements, C, null), !1);
  }, Lr = function(C, x, P) {
    if (Tt && (x === "id" || x === "name") && (P in n || P in ja))
      return !1;
    if (!(Fe && !We[x] && Ie(W, x))) {
      if (!(je && Ie(Q, x))) {
        if (!(fe.attributeCheck instanceof Function && fe.attributeCheck(x, C))) {
          if (!f[x] || We[x]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Or(C) && (ee.tagNameCheck instanceof RegExp && Ie(ee.tagNameCheck, C) || ee.tagNameCheck instanceof Function && ee.tagNameCheck(C)) && (ee.attributeNameCheck instanceof RegExp && Ie(ee.attributeNameCheck, x) || ee.attributeNameCheck instanceof Function && ee.attributeNameCheck(x, C)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              x === "is" && ee.allowCustomizedBuiltInElements && (ee.tagNameCheck instanceof RegExp && Ie(ee.tagNameCheck, P) || ee.tagNameCheck instanceof Function && ee.tagNameCheck(P)))
            ) return !1;
          } else if (!me[x]) {
            if (!Ie(g, Wt(P, de, ""))) {
              if (!((x === "src" || x === "xlink:href" || x === "href") && C !== "script" && yo(P, "data:") === 0 && Z[C])) {
                if (!(it && !Ie(ne, Wt(P, de, "")))) {
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
  }, Or = function(C) {
    return C !== "annotation-xml" && Nn(C, ve);
  }, Dr = function(C) {
    Ct(v.beforeSanitizeAttributes, C, null);
    const {
      attributes: x
    } = C;
    if (!x || In(C))
      return;
    const P = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: f,
      forceKeepAttr: void 0
    };
    let ce = x.length;
    for (; ce--; ) {
      const Te = x[ce], {
        name: he,
        namespaceURI: Me,
        value: yt
      } = Te, Ot = Ce(he), Rn = yt;
      let Ee = he === "value" ? Rn : wo(Rn);
      if (P.attrName = Ot, P.attrValue = Ee, P.keepAttr = !0, P.forceKeepAttr = void 0, Ct(v.uponSanitizeAttribute, C, P), Ee = P.attrValue, st && (Ot === "id" || Ot === "name") && (At(he, C), Ee = Bt + Ee), mt && Ie(/((--!?|])>)|<\/(style|title|textarea)/i, Ee)) {
        At(he, C);
        continue;
      }
      if (Ot === "attributename" && Nn(Ee, "href")) {
        At(he, C);
        continue;
      }
      if (P.forceKeepAttr)
        continue;
      if (!P.keepAttr) {
        At(he, C);
        continue;
      }
      if (!It && Ie(/\/>/i, Ee)) {
        At(he, C);
        continue;
      }
      Je && sn([N, U, V], (Hr) => {
        Ee = Wt(Ee, Hr, " ");
      });
      const Pr = Ce(C.nodeName);
      if (!Lr(Pr, Ot, Ee)) {
        At(he, C);
        continue;
      }
      if (D && typeof p == "object" && typeof p.getAttributeType == "function" && !Me)
        switch (p.getAttributeType(Pr, Ot)) {
          case "TrustedHTML": {
            Ee = D.createHTML(Ee);
            break;
          }
          case "TrustedScriptURL": {
            Ee = D.createScriptURL(Ee);
            break;
          }
        }
      if (Ee !== Rn)
        try {
          Me ? C.setAttributeNS(Me, he, Ee) : C.setAttribute(he, Ee), In(C) ? ct(C) : Br(t.removed);
        } catch {
          At(he, C);
        }
    }
    Ct(v.afterSanitizeAttributes, C, null);
  }, Za = function H(C) {
    let x = null;
    const P = Ar(C);
    for (Ct(v.beforeSanitizeShadowDOM, C, null); x = P.nextNode(); )
      Ct(v.uponSanitizeShadowNode, x, null), Mr(x), Dr(x), x.content instanceof a && H(x.content);
    Ct(v.afterSanitizeShadowDOM, C, null);
  };
  return t.sanitize = function(H) {
    let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, x = null, P = null, ce = null, Te = null;
    if (Ze = !H, Ze && (H = "<!-->"), typeof H != "string" && !Nr(H))
      if (typeof H.toString == "function") {
        if (H = H.toString(), typeof H != "string")
          throw jt("dirty is not a string, aborting");
      } else
        throw jt("toString is not a function");
    if (!t.isSupported)
      return H;
    if (Et || vn(C), t.removed = [], typeof H == "string" && (et = !1), et) {
      if (H.nodeName) {
        const yt = Ce(H.nodeName);
        if (!J[yt] || ae[yt])
          throw jt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (H instanceof s)
      x = Rr("<!---->"), P = x.ownerDocument.importNode(H, !0), P.nodeType === Zt.element && P.nodeName === "BODY" || P.nodeName === "HTML" ? x = P : x.appendChild(P);
    else {
      if (!Qe && !Je && !Ue && // eslint-disable-next-line unicorn/prefer-includes
      H.indexOf("<") === -1)
        return D && ot ? D.createHTML(H) : H;
      if (x = Rr(H), !x)
        return Qe ? null : ot ? O : "";
    }
    x && _t && ct(x.firstChild);
    const he = Ar(et ? H : x);
    for (; ce = he.nextNode(); )
      Mr(ce), Dr(ce), ce.content instanceof a && Za(ce.content);
    if (et)
      return H;
    if (Qe) {
      if (at)
        for (Te = q.call(x.ownerDocument); x.firstChild; )
          Te.appendChild(x.firstChild);
      else
        Te = x;
      return (f.shadowroot || f.shadowrootmode) && (Te = G.call(r, Te, !0)), Te;
    }
    let Me = Ue ? x.outerHTML : x.innerHTML;
    return Ue && J["!doctype"] && x.ownerDocument && x.ownerDocument.doctype && x.ownerDocument.doctype.name && Ie(Zi, x.ownerDocument.doctype.name) && (Me = "<!DOCTYPE " + x.ownerDocument.doctype.name + `>
` + Me), Je && sn([N, U, V], (yt) => {
      Me = Wt(Me, yt, " ");
    }), D && ot ? D.createHTML(Me) : Me;
  }, t.setConfig = function() {
    let H = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    vn(H), Et = !0;
  }, t.clearConfig = function() {
    Lt = null, Et = !1;
  }, t.isValidAttribute = function(H, C, x) {
    Lt || vn({});
    const P = Ce(H), ce = Ce(C);
    return Lr(P, ce, x);
  }, t.addHook = function(H, C) {
    typeof C == "function" && Vt(v[H], C);
  }, t.removeHook = function(H, C) {
    if (C !== void 0) {
      const x = go(v[H], C);
      return x === -1 ? void 0 : Co(v[H], x, 1)[0];
    }
    return Br(v[H]);
  }, t.removeHooks = function(H) {
    v[H] = [];
  }, t.removeAllHooks = function() {
    v = Zr();
  }, t;
}
var Oo = qi();
function Do(e) {
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
function yn(e, t = !1) {
  return e;
}
function Po(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function qr(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || Do(e));
  } catch {
    return !1;
  }
}
function Ho() {
  Oo.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !qr(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !qr(n) && e.removeAttribute("src");
    }
  });
}
Ho();
function Fo() {
  const [e, t] = le([]), n = re(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = re(
    (o, s) => {
      const c = yn(s, o === "assistant");
      t((u) => [
        ...u,
        {
          id: n(),
          role: o,
          content: c,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [n]
  ), i = re(
    (o, s) => {
      t(
        (l) => l.map(
          (c) => c.id === o ? { ...c, ...s } : c
        )
      );
    },
    []
  ), a = re(
    (o, s, l) => {
      t(
        (c) => c.map(
          (u) => u.id === o ? {
            ...u,
            content: s,
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
function Uo() {
  const [e, t] = le(!1), [n, r] = le(!1), [i, a] = le(""), [o, s] = le(!1), l = Ge(null), c = Ge(""), u = re(() => {
    t(!0), r(!0), c.current = "", a("");
  }, []), d = re(() => {
    t(!1), r(!1), a(""), l.current = null, c.current = "";
  }, []), m = re(() => {
    s(!1);
  }, []), p = re(() => {
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
    isHandlingTool: o,
    setIsHandlingTool: s,
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
const Xe = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, wn = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, xe = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, Ah = (e) => e === Xe.SUBMITTED || e === Xe.STREAMING, Nh = (e) => e === Xe.IDLE, Mh = (e) => e === Xe.ERROR, Lh = (e) => e === xe.PROCESSING, Oh = (e) => e === xe.COMPLETED, Dh = (e) => e === xe.ERROR;
function zo() {
  const e = De(
    () => (i, a) => a === !1 ? ye.isErrorMessage(i) ? xe.ERROR : xe.COMPLETED : ye.isCompletedMessage(i) ? xe.COMPLETED : ye.isErrorMessage(i) ? xe.ERROR : xe.PROCESSING,
    []
  ), t = De(
    () => (i) => ye.extractDuration(i),
    []
  ), n = De(
    () => (i) => ye.cleanReasoningContent(i),
    []
  ), r = De(
    () => (i, a) => {
      switch (ye.getMessageType(
        i,
        a
      )) {
        case j.MESSAGE_TYPES.ERROR:
          return "Error";
        case j.MESSAGE_TYPES.COMPLETED:
          return "Completed";
        case j.MESSAGE_TYPES.THOUGHT:
          return j.UI_TEXT.THOUGHT;
        case j.MESSAGE_TYPES.THINKING:
        default:
          return j.UI_TEXT.THINKING_ELLIPSIS;
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
function Bo() {
  const e = De(
    () => (n, r) => r === !1 ? n.includes(j.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : n.includes(j.COMPLETED_MARKER) || n.includes("✅") ? "Tool Completed" : n.includes(j.ERROR_MARKER) ? "Tool Error" : (n.includes(j.HANDLING_MARKER), "Tool Processing..."),
    []
  ), t = De(
    () => (n, r) => r === !1 ? n.includes(j.ERROR_MARKER) ? xe.ERROR : xe.COMPLETED : n.includes(j.COMPLETED_MARKER) || n.includes("✅") ? xe.COMPLETED : n.includes(j.ERROR_MARKER) ? xe.ERROR : xe.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: t
  };
}
function Go({
  setMessages: e,
  addMessage: t,
  updateMessageContent: n,
  generateId: r,
  setIsThinking: i,
  setIsStreaming: a,
  setStreamingContent: o,
  setIsHandlingTool: s,
  currentAssistantMessageIdRef: l,
  streamingContentRef: c,
  clearStreamingBuffers: u,
  resetToolHandling: d
}) {
  const m = Ge(/* @__PURE__ */ new Map()), p = Ge(/* @__PURE__ */ new Map()), w = re(() => {
    if (l.current && c.current) {
      const D = yn(
        c.current,
        !0
      );
      return n(
        l.current,
        D,
        !1
      ), u(), !0;
    }
    return !1;
  }, [
    l,
    c,
    n,
    u
  ]), S = re(
    (D) => {
      const O = yn(D, !0);
      if (l.current)
        c.current += O, o(c.current), n(
          l.current,
          c.current,
          !0
        );
      else {
        i(!1);
        const _ = r();
        l.current = _, c.current = O, o(O);
        const B = {
          id: _,
          role: "assistant",
          content: O,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        e((q) => [...q, B]);
      }
    },
    [
      l,
      c,
      o,
      n,
      i,
      r,
      e
    ]
  ), R = re(
    (D, O, _) => {
      const { callId: B } = _ || {};
      if (s(D), !B) return;
      const q = ye.isThinkingMessage(O) && !O.includes("for") && !O.includes("seconds"), M = ye.isThinkingMessage(O) && O.includes("for") && O.includes("seconds"), G = ye.isHandlingMessage(O), v = ye.isCompletedMessage(O), N = ye.isErrorMessage(O);
      if (q || M) {
        const V = m.current.get(B);
        if (q && !V) {
          w();
          const W = r();
          m.current.set(B, W);
          const Q = {
            id: W,
            role: "reasoning",
            content: O,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          e((ne) => [...ne, Q]);
        } else M && V ? (n(V, O, !1), m.current.delete(B)) : V && q && n(V, O, !0);
      }
      const U = p.current.get(B);
      if (G && !U) {
        w();
        const V = O.match(
          j.PATTERNS.HANDLING_TOOL
        ), W = V ? V[1] : "Unknown Tool", Q = r();
        p.current.set(B, Q);
        const ne = {
          id: Q,
          role: "tooling",
          content: O,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ..._,
            toolName: W,
            callId: B,
            status: xe.PROCESSING
          }
        };
        e((de) => [...de, ne]);
      } else if ((v || N) && U) {
        const V = O.match(
          j.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), W = V ? V[1] : "Unknown Tool";
        e(
          (Q) => Q.map(
            (ne) => ne.id === U ? {
              ...ne,
              content: O,
              isStreaming: !1,
              toolData: {
                ...ne.toolData,
                toolName: W,
                status: N ? xe.ERROR : xe.COMPLETED,
                callId: B ?? ""
              }
            } : ne
          )
        ), p.current.delete(B);
      } else U && D && !v && !N && n(U, O, !0);
    },
    [
      s,
      w,
      r,
      e,
      n
    ]
  ), y = re(() => {
    a(!1), i(!1), w();
  }, [a, i, w]), L = re(
    (D) => {
      console.error("Chat error:", D), a(!1), i(!1), w(), t("system", `❌ Chat error: ${D}`);
    },
    [
      a,
      i,
      w,
      t
    ]
  ), T = re(() => {
    a(!1), i(!1), u(), d();
  }, [
    a,
    i,
    u,
    d
  ]);
  return {
    handleSetMessage: S,
    handleReasoningUpdate: R,
    handleChatFinished: y,
    handleChatError: L,
    stopGeneration: T,
    finalizeCurrentStreamingMessage: w
  };
}
function Vo() {
  const e = Fo(), t = Uo(), n = zo(), r = Bo(), i = Go({
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
const Kr = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), r = (c, u) => {
    const d = typeof c == "function" ? c(t) : c;
    if (!Object.is(d, t)) {
      const m = t;
      t = u ?? (typeof d != "object" || d === null) ? d : Object.assign({}, t, d), n.forEach((p) => p(t, m));
    }
  }, i = () => t, s = { setState: r, getState: i, getInitialState: () => l, subscribe: (c) => (n.add(c), () => n.delete(c)) }, l = t = e(r, i, s);
  return s;
}, Wo = (e) => e ? Kr(e) : Kr, jo = (e) => e;
function $o(e, t = jo) {
  const n = ht.useSyncExternalStore(
    e.subscribe,
    ht.useCallback(() => t(e.getState()), [e, t]),
    ht.useCallback(() => t(e.getInitialState()), [e, t])
  );
  return ht.useDebugValue(n), n;
}
const Zo = (e) => {
  const t = Wo(e), n = (r) => $o(t, r);
  return Object.assign(n, t), n;
}, qo = (e) => Zo, Xr = { BASE_URL: "/", DEV: !1, MODE: "production", PROD: !0, SSR: !1 }, Qt = /* @__PURE__ */ new Map(), cn = (e) => {
  const t = Qt.get(e);
  return t ? Object.fromEntries(
    Object.entries(t.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, Ko = (e, t, n) => {
  if (e === void 0)
    return {
      type: "untracked",
      connection: t.connect(n)
    };
  const r = Qt.get(n.name);
  if (r)
    return { type: "tracked", store: e, ...r };
  const i = {
    connection: t.connect(n),
    stores: {}
  };
  return Qt.set(n.name, i), { type: "tracked", store: e, ...i };
}, Xo = (e, t) => {
  if (t === void 0) return;
  const n = Qt.get(e);
  n && (delete n.stores[t], Object.keys(n.stores).length === 0 && Qt.delete(e));
}, Yo = (e) => {
  var t, n;
  if (!e) return;
  const r = e.split(`
`), i = r.findIndex(
    (o) => o.includes("api.setState")
  );
  if (i < 0) return;
  const a = ((t = r[i + 1]) == null ? void 0 : t.trim()) || "";
  return (n = /.+ (.+) .+/.exec(a)) == null ? void 0 : n[1];
}, Jo = (e, t = {}) => (n, r, i) => {
  const { enabled: a, anonymousActionType: o, store: s, ...l } = t;
  let c;
  try {
    c = (a ?? (Xr ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!c)
    return e(n, r, i);
  const { connection: u, ...d } = Ko(s, c, l);
  let m = !0;
  i.setState = (S, R, y) => {
    const L = n(S, R);
    if (!m) return L;
    const T = y === void 0 ? {
      type: o || Yo(new Error().stack) || "anonymous"
    } : typeof y == "string" ? { type: y } : y;
    return s === void 0 ? (u == null || u.send(T, r()), L) : (u == null || u.send(
      {
        ...T,
        type: `${s}/${T.type}`
      },
      {
        ...cn(l.name),
        [s]: i.getState()
      }
    ), L);
  }, i.devtools = {
    cleanup: () => {
      u && typeof u.unsubscribe == "function" && u.unsubscribe(), Xo(l.name, s);
    }
  };
  const p = (...S) => {
    const R = m;
    m = !1, n(...S), m = R;
  }, w = e(i.setState, r, i);
  if (d.type === "untracked" ? u == null || u.init(w) : (d.stores[d.store] = i, u == null || u.init(
    Object.fromEntries(
      Object.entries(d.stores).map(([S, R]) => [
        S,
        S === d.store ? w : R.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let S = !1;
    const R = i.dispatch;
    i.dispatch = (...y) => {
      (Xr ? "production" : void 0) !== "production" && y[0].type === "__setState" && !S && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), S = !0), R(...y);
    };
  }
  return u.subscribe((S) => {
    var R;
    switch (S.type) {
      case "ACTION":
        if (typeof S.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return Pn(
          S.payload,
          (y) => {
            if (y.type === "__setState") {
              if (s === void 0) {
                p(y.state);
                return;
              }
              Object.keys(y.state).length !== 1 && console.error(
                `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
              );
              const L = y.state[s];
              if (L == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(L) && p(L);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(y);
          }
        );
      case "DISPATCH":
        switch (S.payload.type) {
          case "RESET":
            return p(w), s === void 0 ? u == null ? void 0 : u.init(i.getState()) : u == null ? void 0 : u.init(cn(l.name));
          case "COMMIT":
            if (s === void 0) {
              u == null || u.init(i.getState());
              return;
            }
            return u == null ? void 0 : u.init(cn(l.name));
          case "ROLLBACK":
            return Pn(S.state, (y) => {
              if (s === void 0) {
                p(y), u == null || u.init(i.getState());
                return;
              }
              p(y[s]), u == null || u.init(cn(l.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return Pn(S.state, (y) => {
              if (s === void 0) {
                p(y);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(y[s]) && p(y[s]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: y } = S.payload, L = (R = y.computedStates.slice(-1)[0]) == null ? void 0 : R.state;
            if (!L) return;
            p(s === void 0 ? L : L[s]), u == null || u.send(
              null,
              // FIXME no-any
              y
            );
            return;
          }
          case "PAUSE_RECORDING":
            return m = !m;
        }
        return;
    }
  }), w;
}, Qo = Jo, Pn = (e, t) => {
  let n;
  try {
    n = JSON.parse(e);
  } catch (r) {
    console.error(
      "[zustand devtools middleware] Could not parse the received json",
      r
    );
  }
  n !== void 0 && t(n);
}, es = (e) => ({
  // Initial state
  isModalOpen: !1,
  isCollapsed: !1,
  currentMode: "sidebar",
  // Actions
  setIsModalOpen: (t) => e({ isModalOpen: t }),
  setIsCollapsed: (t) => e({ isCollapsed: t }),
  setCurrentMode: (t) => e({ currentMode: t }),
  openModal: () => e({ isModalOpen: !0 }),
  closeModal: () => e({ isModalOpen: !1 }),
  toggleCollapse: () => e((t) => ({ isCollapsed: !t.isCollapsed })),
  toggleFullscreen: () => e((t) => ({
    currentMode: t.currentMode === "sidebar" ? "fullscreen" : "sidebar"
  }))
}), ts = (e) => ({
  // Initial state
  chatStatus: Xe.IDLE,
  streamingStatus: wn.IDLE,
  // Actions
  setChatStatus: (t) => e({ chatStatus: t }),
  setStreamingStatus: (t) => e({ streamingStatus: t }),
  resetChatStatus: () => e({
    chatStatus: Xe.IDLE,
    streamingStatus: wn.IDLE
  })
}), ns = (e) => ({
  // Initial state
  isLoadingConversation: !1,
  conversationError: null,
  // Actions
  setIsLoadingConversation: (t) => e({ isLoadingConversation: t }),
  setConversationError: (t) => e({ conversationError: t }),
  clearConversationError: () => e({ conversationError: null })
}), rs = (e) => ({
  // Initial state
  currentThreadId: null,
  providerResId: null,
  // Actions
  setCurrentThreadId: (t) => e({ currentThreadId: t }),
  setProviderResId: (t) => e({ providerResId: t }),
  clearThreadData: () => e({
    currentThreadId: null,
    providerResId: null
  })
}), is = (e) => ({
  // Initial state
  isDevSettingsOpen: !1,
  // Actions
  setIsDevSettingsOpen: (t) => e({ isDevSettingsOpen: t }),
  toggleDevSettings: () => e((t) => ({ isDevSettingsOpen: !t.isDevSettingsOpen }))
}), ie = qo()(
  Qo(
    (...e) => ({
      ...es(...e),
      ...ts(...e),
      ...ns(...e),
      ...rs(...e),
      ...is(...e)
    }),
    {
      name: "ChatUI-Store"
    }
  )
), Ph = () => ie((e) => ({
  isModalOpen: e.isModalOpen,
  isCollapsed: e.isCollapsed,
  currentMode: e.currentMode,
  openModal: e.openModal,
  closeModal: e.closeModal,
  toggleCollapse: e.toggleCollapse,
  toggleFullscreen: e.toggleFullscreen
})), Hh = () => ie((e) => ({
  chatStatus: e.chatStatus,
  streamingStatus: e.streamingStatus,
  setChatStatus: e.setChatStatus,
  setStreamingStatus: e.setStreamingStatus,
  resetChatStatus: e.resetChatStatus
})), Fh = () => ie((e) => ({
  isLoadingConversation: e.isLoadingConversation,
  conversationError: e.conversationError,
  setIsLoadingConversation: e.setIsLoadingConversation,
  setConversationError: e.setConversationError,
  clearConversationError: e.clearConversationError
})), Uh = () => ie((e) => ({
  currentThreadId: e.currentThreadId,
  providerResId: e.providerResId,
  setCurrentThreadId: e.setCurrentThreadId,
  setProviderResId: e.setProviderResId,
  clearThreadData: e.clearThreadData
})), zh = () => ie((e) => ({
  isDevSettingsOpen: e.isDevSettingsOpen,
  setIsDevSettingsOpen: e.setIsDevSettingsOpen,
  toggleDevSettings: e.toggleDevSettings
}));
function Bh({ initialMode: e = "sidebar" }) {
  const t = ie();
  return ke(() => {
    e && t.currentMode !== e && t.setCurrentMode(e);
  }, [e]), ke(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const n = (r) => {
      r.key === "Escape" && t.currentMode === "modal" && t.isModalOpen && t.closeModal();
    };
    if (t.currentMode === "modal" && t.isModalOpen)
      return document.addEventListener("keydown", n), () => document.removeEventListener("keydown", n);
  }, [t.currentMode, t.isModalOpen, t.closeModal]), {
    // Modal and layout state
    isModalOpen: t.isModalOpen,
    setIsModalOpen: t.setIsModalOpen,
    isCollapsed: t.isCollapsed,
    setIsCollapsed: t.setIsCollapsed,
    currentMode: t.currentMode,
    setCurrentMode: t.setCurrentMode,
    // Chat state
    chatStatus: t.chatStatus,
    setChatStatus: t.setChatStatus,
    streamingStatus: t.streamingStatus,
    setStreamingStatus: t.setStreamingStatus,
    // Conversation state
    isLoadingConversation: t.isLoadingConversation,
    setIsLoadingConversation: t.setIsLoadingConversation,
    conversationError: t.conversationError,
    setConversationError: t.setConversationError,
    // Thread state
    currentThreadId: t.currentThreadId,
    setCurrentThreadId: t.setCurrentThreadId,
    providerResId: t.providerResId,
    setProviderResId: t.setProviderResId,
    // Dev mode state
    isDevSettingsOpen: t.isDevSettingsOpen,
    setIsDevSettingsOpen: t.setIsDevSettingsOpen,
    // Actions
    openModal: t.openModal,
    closeModal: t.closeModal,
    toggleCollapse: t.toggleCollapse,
    toggleFullscreen: t.toggleFullscreen
  };
}
async function Gh(e, t, n) {
  const r = new URLSearchParams();
  n != null && n.includeArchived && r.append("includeArchived", "true"), n != null && n.limit && r.append("limit", n.limit.toString());
  const i = `${e}/api/v1/threads/user/${t}${r.toString() ? `?${r.toString()}` : ""}`, a = await fetch(i);
  if (!a.ok) {
    const s = await a.json().catch(() => ({
      error: "Failed to fetch threads"
    }));
    throw new Error(s.error || "Failed to fetch threads");
  }
  return (await a.json()).threads;
}
async function Vh(e, t) {
  const n = `${e}/api/v1/threads/conv/${t}`, r = await fetch(n);
  if (!r.ok) {
    const i = await r.json().catch(() => ({
      error: "Thread not found"
    }));
    throw new Error(i.error || "Thread not found");
  }
  return r.json();
}
async function as(e, t, n) {
  const r = `${e}/api/v1/messages/thread/${t}?format=client`, i = {};
  n != null && n.userMpAuthToken && (i["x-oddle-mp-auth-token"] = n.userMpAuthToken), n != null && n.chatServerKey && (i["x-oddle-chat-server-key"] = n.chatServerKey);
  const a = await fetch(r, { headers: i });
  if (!a.ok) {
    const l = await a.json().catch(() => ({
      error: "Failed to fetch messages"
    }));
    throw new Error(l.error || "Failed to fetch messages");
  }
  const o = await a.json();
  return {
    messages: o.messages.map((l) => ({
      ...l,
      timestamp: new Date(l.timestamp)
    })),
    providerResId: o.providerResId
  };
}
async function Wh(e, t) {
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
async function jh(e, t, n, r) {
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
    const o = await a.json().catch(() => ({
      error: "Failed to create thread"
    }));
    throw new Error(o.error || "Failed to create thread");
  }
  return a.json();
}
function os({
  threadId: e,
  userId: t,
  httpApiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  messages: a,
  setMessages: o,
  setIsLoadingConversation: s,
  setConversationError: l,
  setCurrentThreadId: c,
  setProviderResId: u
}) {
  const d = Ge(!1);
  return ke(() => {
    (async () => {
      if (!e) {
        console.log("useConversationLoader: No threadId provided, skipping history fetch");
        return;
      }
      if (!t) {
        console.error("userId is required for conversation loading");
        return;
      }
      if (!n) {
        console.error("httpApiUrl is required for conversation loading");
        return;
      }
      if (!r) {
        console.error("userMpAuthToken is required for conversation loading");
        return;
      }
      if (!i) {
        console.error("chatServerKey is required for conversation loading");
        return;
      }
      if (!d.current && !(a.length > 0))
        try {
          s(!0), l(null), console.log("useConversationLoader: Fetching messages for threadId:", e), c(e);
          const p = await as(n, e, {
            userMpAuthToken: r,
            chatServerKey: i
          });
          console.log(`useConversationLoader: Loaded ${p.messages.length} messages`), o(p.messages), p.providerResId && (console.log("useConversationLoader: Setting providerResId:", p.providerResId), u(p.providerResId)), d.current = !0;
        } catch (p) {
          console.error("❌ Error loading conversation:", p), l(
            p instanceof Error ? p.message : "Failed to load conversation"
          ), d.current = !0;
        } finally {
          s(!1);
        }
    })();
  }, [
    e,
    t,
    n,
    r,
    i,
    a.length,
    o,
    s,
    l,
    c,
    u
  ]), {
    hasLoadedConversationRef: d
  };
}
class ss {
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
      const o = t[a];
      try {
        this.validateFile(o), n && (i[a].progress = 0, n([...i]));
        const s = await this.uploadSingleFile(o, (l) => {
          n && (i[a].progress = l, n([...i]));
        });
        r.push(s), i[a].status = "completed", i[a].progress = 100;
      } catch (s) {
        console.error(`❌ Upload failed for ${o.name}:`, s), i[a].status = "error";
        const l = await this.handleUploadFallback(o);
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
    return new Promise((a, o) => {
      const s = new XMLHttpRequest();
      s.upload.addEventListener("progress", (l) => {
        if (l.lengthComputable && n) {
          const c = l.loaded / l.total * 100;
          n(c);
        }
      }), s.addEventListener("load", async () => {
        if (s.status >= 200 && s.status < 300)
          try {
            const l = JSON.parse(s.responseText), c = this.processUploadResult(t, l);
            a(c);
          } catch {
            o(new Error("Invalid response format"));
          }
        else
          o(new Error(`Upload failed with status ${s.status}`));
      }), s.addEventListener("error", () => {
        o(new Error("Network error during upload"));
      }), s.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([l, c]) => {
        s.setRequestHeader(l, c);
      }), s.send(r);
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
class ls {
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
    const { message: n, media: r, providerResId: i } = t, a = this.createUserMessage(n, r);
    try {
      return await this.chatClient.onTriggerMessage({
        message: a.content,
        media: r,
        providerResId: i
      }), a;
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
const cs = {
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
}, Ki = {
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
}, us = {
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
    if (!Ki.isValidWebSocketUrl(e))
      throw new Error(`Invalid WebSocket URL: ${e}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (e) => e.trim().length > 0
}, Xi = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...e) => e.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (e, t, n, r, i) => Xi.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${e}`,
    t && `chat-wrapper--${t}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    e === "embedded" && i && "chat-wrapper--constrained"
  )
}, Yi = {
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
  getUserFriendlyErrorMessage: (e) => Yi.isNetworkError(e) ? "Connection error. Please check your internet connection and try again." : e.message.includes("authentication") || e.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : e.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, pt = {
  state: cs,
  url: Ki,
  validation: us,
  css: Xi,
  error: Yi
};
class Yr extends cr {
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
      const o = n.resetKeys || [];
      i.some(
        (l, c) => l !== o[c]
      ) && this.resetErrorBoundary();
    }
  }
  render() {
    const { hasError: n, error: r } = this.state, { children: i, fallback: a } = this.props;
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ h("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: pt.error.getUserFriendlyErrorMessage(r) }),
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
class hs extends cr {
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
    const { hasError: n, error: r, isRetrying: i } = this.state, { children: a, maxRetries: o = 3 } = this.props;
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || pt.error.isNetworkError(r)) ? /* @__PURE__ */ h("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ I("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ h("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ h("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ I(tn, { children: [
        this.retryCount < o && /* @__PURE__ */ I(
          "button",
          {
            className: "chat-wrapper__error-retry",
            onClick: this.handleRetry,
            type: "button",
            children: [
              "Retry Connection (",
              o - this.retryCount,
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
class ps extends cr {
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
    const { hasError: n, error: r, failedFiles: i } = this.state, { children: a, allowRetry: o = !0 } = this.props;
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ h("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ I("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ h("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ h("ul", { className: "chat-wrapper__failed-files-list", children: i.map((l, c) => /* @__PURE__ */ h("li", { className: "chat-wrapper__failed-file", children: l }, c)) })
      ] }),
      /* @__PURE__ */ I("div", { className: "chat-wrapper__error-actions", children: [
        o && /* @__PURE__ */ h(
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
function ds({
  isConnected: e,
  isConnecting: t = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 5,
  onRetry: a,
  autoHideDuration: o = 3e3
}) {
  const [s, l] = le("hidden"), [c, u] = le(!1);
  if (ke(() => {
    t ? l("connecting") : !e && !n ? (u(!0), r >= i ? l("error") : l("disconnected")) : n ? l("reconnecting") : e && c ? (l("hidden"), u(!1)) : e && !c && l("hidden");
  }, [e, t, n, r, i, c, o]), s === "hidden")
    return null;
  const d = () => {
    a && a();
  }, p = (() => {
    switch (s) {
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
  return p ? s === "connecting" ? /* @__PURE__ */ h("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ I("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ h("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ h("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ h("div", { className: "connection-notification__bubble" })
  ] }) }) : /* @__PURE__ */ h("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ I("div", { className: "connection-notification__content", children: [
    /* @__PURE__ */ h("div", { className: "connection-notification__icon", children: p.icon }),
    /* @__PURE__ */ h("div", { className: "connection-notification__title", children: p.title }),
    /* @__PURE__ */ h("div", { className: "connection-notification__message", children: p.message }),
    s === "reconnecting" && /* @__PURE__ */ h("div", { className: "connection-notification__actions", children: /* @__PURE__ */ I("button", { className: "connection-notification__retry-btn primary", disabled: !0, children: [
      /* @__PURE__ */ h("span", { className: "connection-notification__spinner" }),
      "Reconnecting..."
    ] }) }),
    (s === "error" || s === "disconnected") && a && /* @__PURE__ */ h("div", { className: "connection-notification__actions", children: /* @__PURE__ */ h(
      "button",
      {
        className: "connection-notification__retry-btn primary",
        onClick: d,
        children: "Try Again"
      }
    ) })
  ] }) }) : null;
}
const fs = ({
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
), ms = ({
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
), gs = ({
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
), Cs = ({
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
), Ji = ({
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
), ys = ({
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
), ws = ({
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
        /* @__PURE__ */ h(fs, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ h("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, Ss = ({
  appName: e,
  mode: t,
  isCollapsed: n,
  isModalOpen: r,
  devMode: i = !1,
  onClose: a,
  onToggleFullscreen: o,
  onToggleCollapse: s,
  onOpenSettings: l
}) => {
  const c = () => t === "modal" && r && a ? /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: a,
      title: "Close chat",
      children: /* @__PURE__ */ h(ms, { size: 20 })
    }
  ) : null, u = () => {
    if ((t === "sidebar" || t === "fullscreen") && !n && o) {
      const p = t === "fullscreen";
      return /* @__PURE__ */ h(
        "button",
        {
          className: p ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: o,
          title: p ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ h(gs, { size: 20, isFullscreen: p })
        }
      );
    }
    return null;
  }, d = () => (t === "sidebar" || t === "fullscreen") && !n && s ? /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: s,
      title: "Collapse chat",
      children: /* @__PURE__ */ h(Cs, { size: 20 })
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
          children: /* @__PURE__ */ h(Ji, { size: 16 })
        }
      ),
      u(),
      d(),
      c()
    ] })
  ] });
};
function Es(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const _s = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ts = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ks = {};
function Jr(e, t) {
  return (ks.jsx ? Ts : _s).test(e);
}
const xs = /[ \t\n\f\r]/g;
function bs(e) {
  return typeof e == "object" ? e.type === "text" ? Qr(e.value) : !1 : Qr(e);
}
function Qr(e) {
  return e.replace(xs, "") === "";
}
class nn {
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
nn.prototype.normal = {};
nn.prototype.property = {};
nn.prototype.space = void 0;
function Qi(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new nn(n, r, t);
}
function Jn(e) {
  return e.toLowerCase();
}
class He {
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
He.prototype.attribute = "";
He.prototype.booleanish = !1;
He.prototype.boolean = !1;
He.prototype.commaOrSpaceSeparated = !1;
He.prototype.commaSeparated = !1;
He.prototype.defined = !1;
He.prototype.mustUseProperty = !1;
He.prototype.number = !1;
He.prototype.overloadedBoolean = !1;
He.prototype.property = "";
He.prototype.spaceSeparated = !1;
He.prototype.space = void 0;
let vs = 0;
const K = Mt(), pe = Mt(), Qn = Mt(), k = Mt(), oe = Mt(), Ht = Mt(), Be = Mt();
function Mt() {
  return 2 ** ++vs;
}
const er = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: K,
  booleanish: pe,
  commaOrSpaceSeparated: Be,
  commaSeparated: Ht,
  number: k,
  overloadedBoolean: Qn,
  spaceSeparated: oe
}, Symbol.toStringTag, { value: "Module" })), Hn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(er)
);
class hr extends He {
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
    if (super(t, n), ei(this, "space", i), typeof r == "number")
      for (; ++a < Hn.length; ) {
        const o = Hn[a];
        ei(this, Hn[a], (r & er[o]) === er[o]);
      }
  }
}
hr.prototype.defined = !0;
function ei(e, t, n) {
  n && (e[t] = n);
}
function Ut(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new hr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[Jn(r)] = r, n[Jn(a.attribute)] = r;
  }
  return new nn(t, n, e.space);
}
const ea = Ut({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: pe,
    ariaAutoComplete: null,
    ariaBusy: pe,
    ariaChecked: pe,
    ariaColCount: k,
    ariaColIndex: k,
    ariaColSpan: k,
    ariaControls: oe,
    ariaCurrent: null,
    ariaDescribedBy: oe,
    ariaDetails: null,
    ariaDisabled: pe,
    ariaDropEffect: oe,
    ariaErrorMessage: null,
    ariaExpanded: pe,
    ariaFlowTo: oe,
    ariaGrabbed: pe,
    ariaHasPopup: null,
    ariaHidden: pe,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: oe,
    ariaLevel: k,
    ariaLive: null,
    ariaModal: pe,
    ariaMultiLine: pe,
    ariaMultiSelectable: pe,
    ariaOrientation: null,
    ariaOwns: oe,
    ariaPlaceholder: null,
    ariaPosInSet: k,
    ariaPressed: pe,
    ariaReadOnly: pe,
    ariaRelevant: null,
    ariaRequired: pe,
    ariaRoleDescription: oe,
    ariaRowCount: k,
    ariaRowIndex: k,
    ariaRowSpan: k,
    ariaSelected: pe,
    ariaSetSize: k,
    ariaSort: null,
    ariaValueMax: k,
    ariaValueMin: k,
    ariaValueNow: k,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function ta(e, t) {
  return t in e ? e[t] : t;
}
function na(e, t) {
  return ta(e, t.toLowerCase());
}
const Is = Ut({
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
    accept: Ht,
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
    cols: k,
    colSpan: null,
    content: null,
    contentEditable: pe,
    controls: K,
    controlsList: oe,
    coords: k | Ht,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: K,
    defer: K,
    dir: null,
    dirName: null,
    disabled: K,
    download: Qn,
    draggable: pe,
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
    height: k,
    hidden: Qn,
    high: k,
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
    low: k,
    manifest: null,
    max: null,
    maxLength: k,
    media: null,
    method: null,
    min: null,
    minLength: k,
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
    optimum: k,
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
    rows: k,
    rowSpan: k,
    sandbox: oe,
    scope: null,
    scoped: K,
    seamless: K,
    selected: K,
    shadowRootClonable: K,
    shadowRootDelegatesFocus: K,
    shadowRootMode: null,
    shape: null,
    size: k,
    sizes: null,
    slot: null,
    span: k,
    spellCheck: pe,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: k,
    step: null,
    style: null,
    tabIndex: k,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: K,
    useMap: null,
    value: pe,
    width: k,
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
    border: k,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: k,
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
    hSpace: k,
    // `<img>` and `<object>`
    leftMargin: k,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: k,
    // `<body>`
    marginWidth: k,
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
    rightMargin: k,
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
    topMargin: k,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: k,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: K,
    disableRemotePlayback: K,
    prefix: null,
    property: null,
    results: k,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: na
}), Rs = Ut({
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
    about: Be,
    accentHeight: k,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: k,
    amplitude: k,
    arabicForm: null,
    ascent: k,
    attributeName: null,
    attributeType: null,
    azimuth: k,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: k,
    by: null,
    calcMode: null,
    capHeight: k,
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
    descent: k,
    diffuseConstant: k,
    direction: null,
    display: null,
    dur: null,
    divisor: k,
    dominantBaseline: null,
    download: K,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: k,
    enableBackground: null,
    end: null,
    event: null,
    exponent: k,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: k,
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
    g1: Ht,
    g2: Ht,
    glyphName: Ht,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: k,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: k,
    horizOriginX: k,
    horizOriginY: k,
    id: null,
    ideographic: k,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: k,
    k,
    k1: k,
    k2: k,
    k3: k,
    k4: k,
    kernelMatrix: Be,
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
    limitingConeAngle: k,
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
    mediaSize: k,
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
    overlinePosition: k,
    overlineThickness: k,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: k,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: oe,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: k,
    pointsAtY: k,
    pointsAtZ: k,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Be,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Be,
    rev: Be,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Be,
    requiredFeatures: Be,
    requiredFonts: Be,
    requiredFormats: Be,
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
    specularConstant: k,
    specularExponent: k,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: k,
    strikethroughThickness: k,
    string: null,
    stroke: null,
    strokeDashArray: Be,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: k,
    strokeOpacity: k,
    strokeWidth: null,
    style: null,
    surfaceScale: k,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Be,
    tabIndex: k,
    tableValues: null,
    target: null,
    targetX: k,
    targetY: k,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Be,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: k,
    underlineThickness: k,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: k,
    values: null,
    vAlphabetic: k,
    vMathematical: k,
    vectorEffect: null,
    vHanging: k,
    vIdeographic: k,
    version: null,
    vertAdvY: k,
    vertOriginX: k,
    vertOriginY: k,
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
    xHeight: k,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: ta
}), ra = Ut({
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
}), ia = Ut({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: na
}), aa = Ut({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), As = {
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
}, Ns = /[A-Z]/g, ti = /-[a-z]/g, Ms = /^data[-\w.:]+$/i;
function Ls(e, t) {
  const n = Jn(t);
  let r = t, i = He;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Ms.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(ti, Ds);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!ti.test(a)) {
        let o = a.replace(Ns, Os);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    i = hr;
  }
  return new i(r, t);
}
function Os(e) {
  return "-" + e.toLowerCase();
}
function Ds(e) {
  return e.charAt(1).toUpperCase();
}
const Ps = Qi([ea, Is, ra, ia, aa], "html"), pr = Qi([ea, Rs, ra, ia, aa], "svg");
function Hs(e) {
  return e.join(" ").trim();
}
var Sn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function oa(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var dr = {}, ni = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Fs = /\n/g, Us = /^\s*/, zs = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Bs = /^:\s*/, Gs = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Vs = /^[;\s]*/, Ws = /^\s+|\s+$/g, js = `
`, ri = "/", ii = "*", Nt = "", $s = "comment", Zs = "declaration", qs = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(w) {
    var S = w.match(Fs);
    S && (n += S.length);
    var R = w.lastIndexOf(js);
    r = ~R ? w.length - R : r + w.length;
  }
  function a() {
    var w = { line: n, column: r };
    return function(S) {
      return S.position = new o(w), c(), S;
    };
  }
  function o(w) {
    this.start = w, this.end = { line: n, column: r }, this.source = t.source;
  }
  o.prototype.content = e;
  function s(w) {
    var S = new Error(
      t.source + ":" + n + ":" + r + ": " + w
    );
    if (S.reason = w, S.filename = t.source, S.line = n, S.column = r, S.source = e, !t.silent) throw S;
  }
  function l(w) {
    var S = w.exec(e);
    if (S) {
      var R = S[0];
      return i(R), e = e.slice(R.length), S;
    }
  }
  function c() {
    l(Us);
  }
  function u(w) {
    var S;
    for (w = w || []; S = d(); )
      S !== !1 && w.push(S);
    return w;
  }
  function d() {
    var w = a();
    if (!(ri != e.charAt(0) || ii != e.charAt(1))) {
      for (var S = 2; Nt != e.charAt(S) && (ii != e.charAt(S) || ri != e.charAt(S + 1)); )
        ++S;
      if (S += 2, Nt === e.charAt(S - 1))
        return s("End of comment missing");
      var R = e.slice(2, S - 2);
      return r += 2, i(R), e = e.slice(S), r += 2, w({
        type: $s,
        comment: R
      });
    }
  }
  function m() {
    var w = a(), S = l(zs);
    if (S) {
      if (d(), !l(Bs)) return s("property missing ':'");
      var R = l(Gs), y = w({
        type: Zs,
        property: ai(S[0].replace(ni, Nt)),
        value: R ? ai(R[0].replace(ni, Nt)) : Nt
      });
      return l(Vs), y;
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
function ai(e) {
  return e ? e.replace(Ws, Nt) : Nt;
}
var Ks = Sn && Sn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(dr, "__esModule", { value: !0 });
dr.default = Ys;
var Xs = Ks(qs);
function Ys(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, Xs.default)(e), i = typeof t == "function";
  return r.forEach(function(a) {
    if (a.type === "declaration") {
      var o = a.property, s = a.value;
      i ? t(o, s, a) : s && (n = n || {}, n[o] = s);
    }
  }), n;
}
var Tn = {};
Object.defineProperty(Tn, "__esModule", { value: !0 });
Tn.camelCase = void 0;
var Js = /^--[a-zA-Z0-9_-]+$/, Qs = /-([a-z])/g, el = /^[^-]+$/, tl = /^-(webkit|moz|ms|o|khtml)-/, nl = /^-(ms)-/, rl = function(e) {
  return !e || el.test(e) || Js.test(e);
}, il = function(e, t) {
  return t.toUpperCase();
}, oi = function(e, t) {
  return "".concat(t, "-");
}, al = function(e, t) {
  return t === void 0 && (t = {}), rl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(nl, oi) : e = e.replace(tl, oi), e.replace(Qs, il));
};
Tn.camelCase = al;
var ol = Sn && Sn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, sl = ol(dr), ll = Tn;
function tr(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, sl.default)(e, function(r, i) {
    r && i && (n[(0, ll.camelCase)(r, t)] = i);
  }), n;
}
tr.default = tr;
var cl = tr;
const ul = /* @__PURE__ */ oa(cl), sa = la("end"), fr = la("start");
function la(e) {
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
function hl(e) {
  const t = fr(e), n = sa(e);
  if (t && n)
    return { start: t, end: n };
}
function Xt(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? si(e.position) : "start" in e || "end" in e ? si(e) : "line" in e || "column" in e ? nr(e) : "";
}
function nr(e) {
  return li(e && e.line) + ":" + li(e && e.column);
}
function si(e) {
  return nr(e && e.start) + "-" + nr(e && e.end);
}
function li(e) {
  return e && typeof e == "number" ? e : 1;
}
class be extends Error {
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
    let i = "", a = {}, o = !1;
    if (n && ("line" in n && "column" in n ? a = { place: n } : "start" in n && "end" in n ? a = { place: n } : "type" in n ? a = {
      ancestors: [n],
      place: n.position
    } : a = { ...n }), typeof t == "string" ? i = t : !a.cause && t && (o = !0, i = t.message, a.cause = t), !a.ruleId && !a.source && typeof r == "string") {
      const l = r.indexOf(":");
      l === -1 ? a.ruleId = r : (a.source = r.slice(0, l), a.ruleId = r.slice(l + 1));
    }
    if (!a.place && a.ancestors && a.ancestors) {
      const l = a.ancestors[a.ancestors.length - 1];
      l && (a.place = l.position);
    }
    const s = a.place && "start" in a.place ? a.place.start : a.place;
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = s ? s.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = s ? s.line : void 0, this.name = Xt(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = o && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
be.prototype.file = "";
be.prototype.name = "";
be.prototype.reason = "";
be.prototype.message = "";
be.prototype.stack = "";
be.prototype.column = void 0;
be.prototype.line = void 0;
be.prototype.ancestors = void 0;
be.prototype.cause = void 0;
be.prototype.fatal = void 0;
be.prototype.place = void 0;
be.prototype.ruleId = void 0;
be.prototype.source = void 0;
const mr = {}.hasOwnProperty, pl = /* @__PURE__ */ new Map(), dl = /[A-Z]/g, fl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), ml = /* @__PURE__ */ new Set(["td", "th"]), ca = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function gl(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = kl(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Tl(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? pr : Ps,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = ua(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function ua(e, t, n) {
  if (t.type === "element")
    return Cl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return yl(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return Sl(e, t, n);
  if (t.type === "mdxjsEsm")
    return wl(e, t);
  if (t.type === "root")
    return El(e, t, n);
  if (t.type === "text")
    return _l(e, t);
}
function Cl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = pr, e.schema = i), e.ancestors.push(t);
  const a = pa(e, t.tagName, !1), o = xl(e, t);
  let s = Cr(e, t);
  return fl.has(t.tagName) && (s = s.filter(function(l) {
    return typeof l == "string" ? !bs(l) : !0;
  })), ha(e, o, a, t), gr(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function yl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  en(e, t.position);
}
function wl(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  en(e, t.position);
}
function Sl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = pr, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : pa(e, t.name, !0), o = bl(e, t), s = Cr(e, t);
  return ha(e, o, a, t), gr(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function El(e, t, n) {
  const r = {};
  return gr(r, Cr(e, t)), e.create(t, e.Fragment, r, n);
}
function _l(e, t) {
  return t.value;
}
function ha(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function gr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function Tl(e, t, n) {
  return r;
  function r(i, a, o, s) {
    const c = Array.isArray(o.children) ? n : t;
    return s ? c(a, o, s) : c(a, o);
  }
}
function kl(e, t) {
  return n;
  function n(r, i, a, o) {
    const s = Array.isArray(a.children), l = fr(r);
    return t(
      i,
      a,
      o,
      s,
      {
        columnNumber: l ? l.column - 1 : void 0,
        fileName: e,
        lineNumber: l ? l.line : void 0
      },
      void 0
    );
  }
}
function xl(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && mr.call(t.properties, i)) {
      const a = vl(e, i, t.properties[i]);
      if (a) {
        const [o, s] = a;
        e.tableCellAlignToStyle && o === "align" && typeof s == "string" && ml.has(t.tagName) ? r = s : n[o] = s;
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
function bl(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const a = r.data.estree.body[0];
        a.type;
        const o = a.expression;
        o.type;
        const s = o.properties[0];
        s.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(s.argument)
        );
      } else
        en(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const s = r.value.data.estree.body[0];
          s.type, a = e.evaluater.evaluateExpression(s.expression);
        } else
          en(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function Cr(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : pl;
  for (; ++r < t.children.length; ) {
    const a = t.children[r];
    let o;
    if (e.passKeys) {
      const l = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (l) {
        const c = i.get(l) || 0;
        o = l + "-" + c, i.set(l, c + 1);
      }
    }
    const s = ua(e, a, o);
    s !== void 0 && n.push(s);
  }
  return n;
}
function vl(e, t, n) {
  const r = Ls(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Es(n) : Hs(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Il(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Rl(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? As[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Il(e, t) {
  try {
    return ul(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new be("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = ca + "#cannot-parse-style-attribute", i;
  }
}
function pa(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let a = -1, o;
    for (; ++a < i.length; ) {
      const s = Jr(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
      o = o ? {
        type: "MemberExpression",
        object: o,
        property: s,
        computed: !!(a && s.type === "Literal"),
        optional: !1
      } : s;
    }
    r = o;
  } else
    r = Jr(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return mr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  en(e);
}
function en(e, t) {
  const n = new be(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = ca + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Rl(e) {
  const t = {};
  let n;
  for (n in e)
    mr.call(e, n) && (t[Al(n)] = e[n]);
  return t;
}
function Al(e) {
  let t = e.replace(dl, Nl);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Nl(e) {
  return "-" + e.toLowerCase();
}
const Fn = {
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
}, Ml = {};
function Ll(e, t) {
  const n = Ml, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return da(e, r, i);
}
function da(e, t, n) {
  if (Ol(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return ci(e.children, t, n);
  }
  return Array.isArray(e) ? ci(e, t, n) : "";
}
function ci(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = da(e[i], t, n);
  return r.join("");
}
function Ol(e) {
  return !!(e && typeof e == "object");
}
const ui = document.createElement("i");
function yr(e) {
  const t = "&" + e + ";";
  ui.innerHTML = t;
  const n = ui.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function ft(e, t, n, r) {
  const i = e.length;
  let a = 0, o;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(t, n), e.splice(...o);
  else
    for (n && e.splice(t, n); a < r.length; )
      o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
function Ke(e, t) {
  return e.length > 0 ? (ft(e, e.length, 0, t), e) : t;
}
const hi = {}.hasOwnProperty;
function Dl(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    Pl(t, e[n]);
  return t;
}
function Pl(e, t) {
  let n;
  for (n in t) {
    const i = (hi.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let o;
    if (a)
      for (o in a) {
        hi.call(i, o) || (i[o] = []);
        const s = a[o];
        Hl(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(s) ? s : s ? [s] : []
        );
      }
  }
}
function Hl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  ft(e, 0, 0, r);
}
function fa(e, t) {
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
function Ft(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const dt = vt(/[A-Za-z]/), Ve = vt(/[\dA-Za-z]/), Fl = vt(/[#-'*+\--9=?A-Z^-~]/);
function rr(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const ir = vt(/\d/), Ul = vt(/[\dA-Fa-f]/), zl = vt(/[!-/:-@[-`{-~]/);
function $(e) {
  return e !== null && e < -2;
}
function Pe(e) {
  return e !== null && (e < 0 || e === 32);
}
function te(e) {
  return e === -2 || e === -1 || e === 32;
}
const Bl = vt(new RegExp("\\p{P}|\\p{S}", "u")), Gl = vt(/\s/);
function vt(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function zt(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let o = "";
    if (a === 37 && Ve(e.charCodeAt(n + 1)) && Ve(e.charCodeAt(n + 2)))
      i = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (o = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const s = e.charCodeAt(n + 1);
      a < 56320 && s > 56319 && s < 57344 ? (o = String.fromCharCode(a, s), i = 1) : o = "�";
    } else
      o = String.fromCharCode(a);
    o && (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, o = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function se(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return o;
  function o(l) {
    return te(l) ? (e.enter(n), s(l)) : t(l);
  }
  function s(l) {
    return te(l) && a++ < i ? (e.consume(l), s) : (e.exit(n), t(l));
  }
}
const Vl = {
  tokenize: Wl
};
function Wl(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(s) {
    if (s === null) {
      e.consume(s);
      return;
    }
    return e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), se(e, t, "linePrefix");
  }
  function i(s) {
    return e.enter("paragraph"), a(s);
  }
  function a(s) {
    const l = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = l), n = l, o(s);
  }
  function o(s) {
    if (s === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(s);
      return;
    }
    return $(s) ? (e.consume(s), e.exit("chunkText"), a) : (e.consume(s), o);
  }
}
const jl = {
  tokenize: $l
}, pi = {
  tokenize: Zl
};
function $l(e) {
  const t = this, n = [];
  let r = 0, i, a, o;
  return s;
  function s(T) {
    if (r < n.length) {
      const D = n[r];
      return t.containerState = D[1], e.attempt(D[0].continuation, l, c)(T);
    }
    return c(T);
  }
  function l(T) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && L();
      const D = t.events.length;
      let O = D, _;
      for (; O--; )
        if (t.events[O][0] === "exit" && t.events[O][1].type === "chunkFlow") {
          _ = t.events[O][1].end;
          break;
        }
      y(r);
      let B = D;
      for (; B < t.events.length; )
        t.events[B][1].end = {
          ..._
        }, B++;
      return ft(t.events, O + 1, 0, t.events.slice(D)), t.events.length = B, c(T);
    }
    return s(T);
  }
  function c(T) {
    if (r === n.length) {
      if (!i)
        return m(T);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return w(T);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(pi, u, d)(T);
  }
  function u(T) {
    return i && L(), y(r), m(T);
  }
  function d(T) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, w(T);
  }
  function m(T) {
    return t.containerState = {}, e.attempt(pi, p, w)(T);
  }
  function p(T) {
    return r++, n.push([t.currentConstruct, t.containerState]), m(T);
  }
  function w(T) {
    if (T === null) {
      i && L(), y(0), e.consume(T);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: a
    }), S(T);
  }
  function S(T) {
    if (T === null) {
      R(e.exit("chunkFlow"), !0), y(0), e.consume(T);
      return;
    }
    return $(T) ? (e.consume(T), R(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, s) : (e.consume(T), S);
  }
  function R(T, D) {
    const O = t.sliceStream(T);
    if (D && O.push(null), T.previous = a, a && (a.next = T), a = T, i.defineSkip(T.start), i.write(O), t.parser.lazy[T.start.line]) {
      let _ = i.events.length;
      for (; _--; )
        if (
          // The token starts before the line ending…
          i.events[_][1].start.offset < o && // …and either is not ended yet…
          (!i.events[_][1].end || // …or ends after it.
          i.events[_][1].end.offset > o)
        )
          return;
      const B = t.events.length;
      let q = B, M, G;
      for (; q--; )
        if (t.events[q][0] === "exit" && t.events[q][1].type === "chunkFlow") {
          if (M) {
            G = t.events[q][1].end;
            break;
          }
          M = !0;
        }
      for (y(r), _ = B; _ < t.events.length; )
        t.events[_][1].end = {
          ...G
        }, _++;
      ft(t.events, q + 1, 0, t.events.slice(B)), t.events.length = _;
    }
  }
  function y(T) {
    let D = n.length;
    for (; D-- > T; ) {
      const O = n[D];
      t.containerState = O[1], O[0].exit.call(t, e);
    }
    n.length = T;
  }
  function L() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Zl(e, t, n) {
  return se(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function di(e) {
  if (e === null || Pe(e) || Gl(e))
    return 1;
  if (Bl(e))
    return 2;
}
function wr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const ar = {
  name: "attention",
  resolveAll: ql,
  tokenize: Kl
};
function ql(e, t) {
  let n = -1, r, i, a, o, s, l, c, u;
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
          fi(d, -l), fi(m, l), o = {
            type: l > 1 ? "strongSequence" : "emphasisSequence",
            start: d,
            end: {
              ...e[r][1].end
            }
          }, s = {
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
              ...o.start
            },
            end: {
              ...s.end
            }
          }, e[r][1].end = {
            ...o.start
          }, e[n][1].start = {
            ...s.end
          }, c = [], e[r][1].end.offset - e[r][1].start.offset && (c = Ke(c, [["enter", e[r][1], t], ["exit", e[r][1], t]])), c = Ke(c, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["enter", a, t]]), c = Ke(c, wr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), c = Ke(c, [["exit", a, t], ["enter", s, t], ["exit", s, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, c = Ke(c, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : u = 0, ft(e, r - 1, n - r + 3, c), n = r + c.length - u - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Kl(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = di(r);
  let a;
  return o;
  function o(l) {
    return a = l, e.enter("attentionSequence"), s(l);
  }
  function s(l) {
    if (l === a)
      return e.consume(l), s;
    const c = e.exit("attentionSequence"), u = di(l), d = !u || u === 2 && i || n.includes(l), m = !i || i === 2 && u || n.includes(r);
    return c._open = !!(a === 42 ? d : d && (i || !m)), c._close = !!(a === 42 ? m : m && (u || !d)), t(l);
  }
}
function fi(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const Xl = {
  name: "autolink",
  tokenize: Yl
};
function Yl(e, t, n) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(p) {
    return dt(p) ? (e.consume(p), o) : p === 64 ? n(p) : c(p);
  }
  function o(p) {
    return p === 43 || p === 45 || p === 46 || Ve(p) ? (r = 1, s(p)) : c(p);
  }
  function s(p) {
    return p === 58 ? (e.consume(p), r = 0, l) : (p === 43 || p === 45 || p === 46 || Ve(p)) && r++ < 32 ? (e.consume(p), s) : (r = 0, c(p));
  }
  function l(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : p === null || p === 32 || p === 60 || rr(p) ? n(p) : (e.consume(p), l);
  }
  function c(p) {
    return p === 64 ? (e.consume(p), u) : Fl(p) ? (e.consume(p), c) : n(p);
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
const kn = {
  partial: !0,
  tokenize: Jl
};
function Jl(e, t, n) {
  return r;
  function r(a) {
    return te(a) ? se(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || $(a) ? t(a) : n(a);
  }
}
const ma = {
  continuation: {
    tokenize: ec
  },
  exit: tc,
  name: "blockQuote",
  tokenize: Ql
};
function Ql(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    if (o === 62) {
      const s = r.containerState;
      return s.open || (e.enter("blockQuote", {
        _container: !0
      }), s.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(o), e.exit("blockQuoteMarker"), a;
    }
    return n(o);
  }
  function a(o) {
    return te(o) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(o), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(o));
  }
}
function ec(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return te(o) ? se(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : a(o);
  }
  function a(o) {
    return e.attempt(ma, t, n)(o);
  }
}
function tc(e) {
  e.exit("blockQuote");
}
const ga = {
  name: "characterEscape",
  tokenize: nc
};
function nc(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return zl(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const Ca = {
  name: "characterReference",
  tokenize: rc
};
function rc(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return s;
  function s(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), l;
  }
  function l(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), c) : (e.enter("characterReferenceValue"), a = 31, o = Ve, u(d));
  }
  function c(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, o = Ul, u) : (e.enter("characterReferenceValue"), a = 7, o = ir, u(d));
  }
  function u(d) {
    if (d === 59 && i) {
      const m = e.exit("characterReferenceValue");
      return o === Ve && !yr(r.sliceSerialize(m)) ? n(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return o(d) && i++ < a ? (e.consume(d), u) : n(d);
  }
}
const mi = {
  partial: !0,
  tokenize: ac
}, gi = {
  concrete: !0,
  name: "codeFenced",
  tokenize: ic
};
function ic(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: O
  };
  let a = 0, o = 0, s;
  return l;
  function l(_) {
    return c(_);
  }
  function c(_) {
    const B = r.events[r.events.length - 1];
    return a = B && B[1].type === "linePrefix" ? B[2].sliceSerialize(B[1], !0).length : 0, s = _, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(_);
  }
  function u(_) {
    return _ === s ? (o++, e.consume(_), u) : o < 3 ? n(_) : (e.exit("codeFencedFenceSequence"), te(_) ? se(e, d, "whitespace")(_) : d(_));
  }
  function d(_) {
    return _ === null || $(_) ? (e.exit("codeFencedFence"), r.interrupt ? t(_) : e.check(mi, S, D)(_)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), m(_));
  }
  function m(_) {
    return _ === null || $(_) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(_)) : te(_) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), se(e, p, "whitespace")(_)) : _ === 96 && _ === s ? n(_) : (e.consume(_), m);
  }
  function p(_) {
    return _ === null || $(_) ? d(_) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), w(_));
  }
  function w(_) {
    return _ === null || $(_) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(_)) : _ === 96 && _ === s ? n(_) : (e.consume(_), w);
  }
  function S(_) {
    return e.attempt(i, D, R)(_);
  }
  function R(_) {
    return e.enter("lineEnding"), e.consume(_), e.exit("lineEnding"), y;
  }
  function y(_) {
    return a > 0 && te(_) ? se(e, L, "linePrefix", a + 1)(_) : L(_);
  }
  function L(_) {
    return _ === null || $(_) ? e.check(mi, S, D)(_) : (e.enter("codeFlowValue"), T(_));
  }
  function T(_) {
    return _ === null || $(_) ? (e.exit("codeFlowValue"), L(_)) : (e.consume(_), T);
  }
  function D(_) {
    return e.exit("codeFenced"), t(_);
  }
  function O(_, B, q) {
    let M = 0;
    return G;
    function G(W) {
      return _.enter("lineEnding"), _.consume(W), _.exit("lineEnding"), v;
    }
    function v(W) {
      return _.enter("codeFencedFence"), te(W) ? se(_, N, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(W) : N(W);
    }
    function N(W) {
      return W === s ? (_.enter("codeFencedFenceSequence"), U(W)) : q(W);
    }
    function U(W) {
      return W === s ? (M++, _.consume(W), U) : M >= o ? (_.exit("codeFencedFenceSequence"), te(W) ? se(_, V, "whitespace")(W) : V(W)) : q(W);
    }
    function V(W) {
      return W === null || $(W) ? (_.exit("codeFencedFence"), B(W)) : q(W);
    }
  }
}
function ac(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? n(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), a);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
const Un = {
  name: "codeIndented",
  tokenize: sc
}, oc = {
  partial: !0,
  tokenize: lc
};
function sc(e, t, n) {
  const r = this;
  return i;
  function i(c) {
    return e.enter("codeIndented"), se(e, a, "linePrefix", 5)(c);
  }
  function a(c) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? o(c) : n(c);
  }
  function o(c) {
    return c === null ? l(c) : $(c) ? e.attempt(oc, o, l)(c) : (e.enter("codeFlowValue"), s(c));
  }
  function s(c) {
    return c === null || $(c) ? (e.exit("codeFlowValue"), o(c)) : (e.consume(c), s);
  }
  function l(c) {
    return e.exit("codeIndented"), t(c);
  }
}
function lc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : $(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : se(e, a, "linePrefix", 5)(o);
  }
  function a(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? t(o) : $(o) ? i(o) : n(o);
  }
}
const cc = {
  name: "codeText",
  previous: hc,
  resolve: uc,
  tokenize: pc
};
function uc(e) {
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
function hc(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function pc(e, t, n) {
  let r = 0, i, a;
  return o;
  function o(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), s(d);
  }
  function s(d) {
    return d === 96 ? (e.consume(d), r++, s) : (e.exit("codeTextSequence"), l(d));
  }
  function l(d) {
    return d === null ? n(d) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), l) : d === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(d)) : $(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), l) : (e.enter("codeTextData"), c(d));
  }
  function c(d) {
    return d === null || d === 32 || d === 96 || $(d) ? (e.exit("codeTextData"), l(d)) : (e.consume(d), c);
  }
  function u(d) {
    return d === 96 ? (e.consume(d), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(d)) : (a.type = "codeTextData", c(d));
  }
}
class dc {
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
    return r && qt(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), qt(this.left, t);
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
    this.setCursor(0), qt(this.right, t.reverse());
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
        qt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        qt(this.left, n.reverse());
      }
  }
}
function qt(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function ya(e) {
  const t = {};
  let n = -1, r, i, a, o, s, l, c;
  const u = new dc(e);
  for (; ++n < u.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (l = r[1]._tokenizer.events, a = 0, a < l.length && l[a][1].type === "lineEndingBlank" && (a += 2), a < l.length && l[a][1].type === "content"))
      for (; ++a < l.length && l[a][1].type !== "content"; )
        l[a][1].type === "chunkText" && (l[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, fc(u, n)), n = t[n], c = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (o = u.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
          o[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
        else if (!(o[1].type === "linePrefix" || o[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...u.get(i)[1].start
      }, s = u.slice(i, n), s.unshift(r), u.splice(i, n - i + 1, s));
    }
  }
  return ft(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !c;
}
function fc(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const s = o.events, l = [], c = {};
  let u, d, m = -1, p = n, w = 0, S = 0;
  const R = [S];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
  }
  for (p = n; ++m < s.length; )
    // Find a void token that includes a break.
    s[m][0] === "exit" && s[m - 1][0] === "enter" && s[m][1].type === s[m - 1][1].type && s[m][1].start.line !== s[m][1].end.line && (S = m + 1, R.push(S), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : R.pop(), m = R.length; m--; ) {
    const y = s.slice(R[m], R[m + 1]), L = a.pop();
    l.push([L, L + y.length - 1]), e.splice(L, 2, y);
  }
  for (l.reverse(), m = -1; ++m < l.length; )
    c[w + l[m][0]] = w + l[m][1], w += l[m][1] - l[m][0] - 1;
  return c;
}
const mc = {
  resolve: Cc,
  tokenize: yc
}, gc = {
  partial: !0,
  tokenize: wc
};
function Cc(e) {
  return ya(e), e;
}
function yc(e, t) {
  let n;
  return r;
  function r(s) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(s);
  }
  function i(s) {
    return s === null ? a(s) : $(s) ? e.check(gc, o, a)(s) : (e.consume(s), i);
  }
  function a(s) {
    return e.exit("chunkContent"), e.exit("content"), t(s);
  }
  function o(s) {
    return e.consume(s), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, i;
  }
}
function wc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), se(e, a, "linePrefix");
  }
  function a(o) {
    if (o === null || $(o))
      return n(o);
    const s = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function wa(e, t, n, r, i, a, o, s, l) {
  const c = l || Number.POSITIVE_INFINITY;
  let u = 0;
  return d;
  function d(y) {
    return y === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(y), e.exit(a), m) : y === null || y === 32 || y === 41 || rr(y) ? n(y) : (e.enter(r), e.enter(o), e.enter(s), e.enter("chunkString", {
      contentType: "string"
    }), S(y));
  }
  function m(y) {
    return y === 62 ? (e.enter(a), e.consume(y), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter("chunkString", {
      contentType: "string"
    }), p(y));
  }
  function p(y) {
    return y === 62 ? (e.exit("chunkString"), e.exit(s), m(y)) : y === null || y === 60 || $(y) ? n(y) : (e.consume(y), y === 92 ? w : p);
  }
  function w(y) {
    return y === 60 || y === 62 || y === 92 ? (e.consume(y), p) : p(y);
  }
  function S(y) {
    return !u && (y === null || y === 41 || Pe(y)) ? (e.exit("chunkString"), e.exit(s), e.exit(o), e.exit(r), t(y)) : u < c && y === 40 ? (e.consume(y), u++, S) : y === 41 ? (e.consume(y), u--, S) : y === null || y === 32 || y === 40 || rr(y) ? n(y) : (e.consume(y), y === 92 ? R : S);
  }
  function R(y) {
    return y === 40 || y === 41 || y === 92 ? (e.consume(y), S) : S(y);
  }
}
function Sa(e, t, n, r, i, a) {
  const o = this;
  let s = 0, l;
  return c;
  function c(p) {
    return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(a), u;
  }
  function u(p) {
    return s > 999 || p === null || p === 91 || p === 93 && !l || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(p) : p === 93 ? (e.exit(a), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : $(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), d(p));
  }
  function d(p) {
    return p === null || p === 91 || p === 93 || $(p) || s++ > 999 ? (e.exit("chunkString"), u(p)) : (e.consume(p), l || (l = !te(p)), p === 92 ? m : d);
  }
  function m(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), s++, d) : d(p);
  }
}
function Ea(e, t, n, r, i, a) {
  let o;
  return s;
  function s(m) {
    return m === 34 || m === 39 || m === 40 ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), o = m === 40 ? 41 : m, l) : n(m);
  }
  function l(m) {
    return m === o ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), t) : (e.enter(a), c(m));
  }
  function c(m) {
    return m === o ? (e.exit(a), l(o)) : m === null ? n(m) : $(m) ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), se(e, c, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), u(m));
  }
  function u(m) {
    return m === o || m === null || $(m) ? (e.exit("chunkString"), c(m)) : (e.consume(m), m === 92 ? d : u);
  }
  function d(m) {
    return m === o || m === 92 ? (e.consume(m), u) : u(m);
  }
}
function Yt(e, t) {
  let n;
  return r;
  function r(i) {
    return $(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : te(i) ? se(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const Sc = {
  name: "definition",
  tokenize: _c
}, Ec = {
  partial: !0,
  tokenize: Tc
};
function _c(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(p) {
    return e.enter("definition"), o(p);
  }
  function o(p) {
    return Sa.call(
      r,
      e,
      s,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(p);
  }
  function s(p) {
    return i = Ft(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), l) : n(p);
  }
  function l(p) {
    return Pe(p) ? Yt(e, c)(p) : c(p);
  }
  function c(p) {
    return wa(
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
    return e.attempt(Ec, d, d)(p);
  }
  function d(p) {
    return te(p) ? se(e, m, "whitespace")(p) : m(p);
  }
  function m(p) {
    return p === null || $(p) ? (e.exit("definition"), r.parser.defined.push(i), t(p)) : n(p);
  }
}
function Tc(e, t, n) {
  return r;
  function r(s) {
    return Pe(s) ? Yt(e, i)(s) : n(s);
  }
  function i(s) {
    return Ea(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(s);
  }
  function a(s) {
    return te(s) ? se(e, o, "whitespace")(s) : o(s);
  }
  function o(s) {
    return s === null || $(s) ? t(s) : n(s);
  }
}
const kc = {
  name: "hardBreakEscape",
  tokenize: xc
};
function xc(e, t, n) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), i;
  }
  function i(a) {
    return $(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
  }
}
const bc = {
  name: "headingAtx",
  resolve: vc,
  tokenize: Ic
};
function vc(e, t) {
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
  }, ft(e, r, n - r + 1, [["enter", i, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]])), e;
}
function Ic(e, t, n) {
  let r = 0;
  return i;
  function i(u) {
    return e.enter("atxHeading"), a(u);
  }
  function a(u) {
    return e.enter("atxHeadingSequence"), o(u);
  }
  function o(u) {
    return u === 35 && r++ < 6 ? (e.consume(u), o) : u === null || Pe(u) ? (e.exit("atxHeadingSequence"), s(u)) : n(u);
  }
  function s(u) {
    return u === 35 ? (e.enter("atxHeadingSequence"), l(u)) : u === null || $(u) ? (e.exit("atxHeading"), t(u)) : te(u) ? se(e, s, "whitespace")(u) : (e.enter("atxHeadingText"), c(u));
  }
  function l(u) {
    return u === 35 ? (e.consume(u), l) : (e.exit("atxHeadingSequence"), s(u));
  }
  function c(u) {
    return u === null || u === 35 || Pe(u) ? (e.exit("atxHeadingText"), s(u)) : (e.consume(u), c);
  }
}
const Rc = [
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
], Ci = ["pre", "script", "style", "textarea"], Ac = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Lc,
  tokenize: Oc
}, Nc = {
  partial: !0,
  tokenize: Pc
}, Mc = {
  partial: !0,
  tokenize: Dc
};
function Lc(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Oc(e, t, n) {
  const r = this;
  let i, a, o, s, l;
  return c;
  function c(f) {
    return u(f);
  }
  function u(f) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(f), d;
  }
  function d(f) {
    return f === 33 ? (e.consume(f), m) : f === 47 ? (e.consume(f), a = !0, S) : f === 63 ? (e.consume(f), i = 3, r.interrupt ? t : g) : dt(f) ? (e.consume(f), o = String.fromCharCode(f), R) : n(f);
  }
  function m(f) {
    return f === 45 ? (e.consume(f), i = 2, p) : f === 91 ? (e.consume(f), i = 5, s = 0, w) : dt(f) ? (e.consume(f), i = 4, r.interrupt ? t : g) : n(f);
  }
  function p(f) {
    return f === 45 ? (e.consume(f), r.interrupt ? t : g) : n(f);
  }
  function w(f) {
    const Se = "CDATA[";
    return f === Se.charCodeAt(s++) ? (e.consume(f), s === Se.length ? r.interrupt ? t : N : w) : n(f);
  }
  function S(f) {
    return dt(f) ? (e.consume(f), o = String.fromCharCode(f), R) : n(f);
  }
  function R(f) {
    if (f === null || f === 47 || f === 62 || Pe(f)) {
      const Se = f === 47, ee = o.toLowerCase();
      return !Se && !a && Ci.includes(ee) ? (i = 1, r.interrupt ? t(f) : N(f)) : Rc.includes(o.toLowerCase()) ? (i = 6, Se ? (e.consume(f), y) : r.interrupt ? t(f) : N(f)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(f) : a ? L(f) : T(f));
    }
    return f === 45 || Ve(f) ? (e.consume(f), o += String.fromCharCode(f), R) : n(f);
  }
  function y(f) {
    return f === 62 ? (e.consume(f), r.interrupt ? t : N) : n(f);
  }
  function L(f) {
    return te(f) ? (e.consume(f), L) : G(f);
  }
  function T(f) {
    return f === 47 ? (e.consume(f), G) : f === 58 || f === 95 || dt(f) ? (e.consume(f), D) : te(f) ? (e.consume(f), T) : G(f);
  }
  function D(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || Ve(f) ? (e.consume(f), D) : O(f);
  }
  function O(f) {
    return f === 61 ? (e.consume(f), _) : te(f) ? (e.consume(f), O) : T(f);
  }
  function _(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), l = f, B) : te(f) ? (e.consume(f), _) : q(f);
  }
  function B(f) {
    return f === l ? (e.consume(f), l = null, M) : f === null || $(f) ? n(f) : (e.consume(f), B);
  }
  function q(f) {
    return f === null || f === 34 || f === 39 || f === 47 || f === 60 || f === 61 || f === 62 || f === 96 || Pe(f) ? O(f) : (e.consume(f), q);
  }
  function M(f) {
    return f === 47 || f === 62 || te(f) ? T(f) : n(f);
  }
  function G(f) {
    return f === 62 ? (e.consume(f), v) : n(f);
  }
  function v(f) {
    return f === null || $(f) ? N(f) : te(f) ? (e.consume(f), v) : n(f);
  }
  function N(f) {
    return f === 45 && i === 2 ? (e.consume(f), Q) : f === 60 && i === 1 ? (e.consume(f), ne) : f === 62 && i === 4 ? (e.consume(f), J) : f === 63 && i === 3 ? (e.consume(f), g) : f === 93 && i === 5 ? (e.consume(f), ve) : $(f) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Nc, we, U)(f)) : f === null || $(f) ? (e.exit("htmlFlowData"), U(f)) : (e.consume(f), N);
  }
  function U(f) {
    return e.check(Mc, V, we)(f);
  }
  function V(f) {
    return e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), W;
  }
  function W(f) {
    return f === null || $(f) ? U(f) : (e.enter("htmlFlowData"), N(f));
  }
  function Q(f) {
    return f === 45 ? (e.consume(f), g) : N(f);
  }
  function ne(f) {
    return f === 47 ? (e.consume(f), o = "", de) : N(f);
  }
  function de(f) {
    if (f === 62) {
      const Se = o.toLowerCase();
      return Ci.includes(Se) ? (e.consume(f), J) : N(f);
    }
    return dt(f) && o.length < 8 ? (e.consume(f), o += String.fromCharCode(f), de) : N(f);
  }
  function ve(f) {
    return f === 93 ? (e.consume(f), g) : N(f);
  }
  function g(f) {
    return f === 62 ? (e.consume(f), J) : f === 45 && i === 2 ? (e.consume(f), g) : N(f);
  }
  function J(f) {
    return f === null || $(f) ? (e.exit("htmlFlowData"), we(f)) : (e.consume(f), J);
  }
  function we(f) {
    return e.exit("htmlFlow"), t(f);
  }
}
function Dc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return $(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), a) : n(o);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function Pc(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(kn, t, n);
  }
}
const Hc = {
  name: "htmlText",
  tokenize: Fc
};
function Fc(e, t, n) {
  const r = this;
  let i, a, o;
  return s;
  function s(g) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), l;
  }
  function l(g) {
    return g === 33 ? (e.consume(g), c) : g === 47 ? (e.consume(g), O) : g === 63 ? (e.consume(g), T) : dt(g) ? (e.consume(g), q) : n(g);
  }
  function c(g) {
    return g === 45 ? (e.consume(g), u) : g === 91 ? (e.consume(g), a = 0, w) : dt(g) ? (e.consume(g), L) : n(g);
  }
  function u(g) {
    return g === 45 ? (e.consume(g), p) : n(g);
  }
  function d(g) {
    return g === null ? n(g) : g === 45 ? (e.consume(g), m) : $(g) ? (o = d, ne(g)) : (e.consume(g), d);
  }
  function m(g) {
    return g === 45 ? (e.consume(g), p) : d(g);
  }
  function p(g) {
    return g === 62 ? Q(g) : g === 45 ? m(g) : d(g);
  }
  function w(g) {
    const J = "CDATA[";
    return g === J.charCodeAt(a++) ? (e.consume(g), a === J.length ? S : w) : n(g);
  }
  function S(g) {
    return g === null ? n(g) : g === 93 ? (e.consume(g), R) : $(g) ? (o = S, ne(g)) : (e.consume(g), S);
  }
  function R(g) {
    return g === 93 ? (e.consume(g), y) : S(g);
  }
  function y(g) {
    return g === 62 ? Q(g) : g === 93 ? (e.consume(g), y) : S(g);
  }
  function L(g) {
    return g === null || g === 62 ? Q(g) : $(g) ? (o = L, ne(g)) : (e.consume(g), L);
  }
  function T(g) {
    return g === null ? n(g) : g === 63 ? (e.consume(g), D) : $(g) ? (o = T, ne(g)) : (e.consume(g), T);
  }
  function D(g) {
    return g === 62 ? Q(g) : T(g);
  }
  function O(g) {
    return dt(g) ? (e.consume(g), _) : n(g);
  }
  function _(g) {
    return g === 45 || Ve(g) ? (e.consume(g), _) : B(g);
  }
  function B(g) {
    return $(g) ? (o = B, ne(g)) : te(g) ? (e.consume(g), B) : Q(g);
  }
  function q(g) {
    return g === 45 || Ve(g) ? (e.consume(g), q) : g === 47 || g === 62 || Pe(g) ? M(g) : n(g);
  }
  function M(g) {
    return g === 47 ? (e.consume(g), Q) : g === 58 || g === 95 || dt(g) ? (e.consume(g), G) : $(g) ? (o = M, ne(g)) : te(g) ? (e.consume(g), M) : Q(g);
  }
  function G(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || Ve(g) ? (e.consume(g), G) : v(g);
  }
  function v(g) {
    return g === 61 ? (e.consume(g), N) : $(g) ? (o = v, ne(g)) : te(g) ? (e.consume(g), v) : M(g);
  }
  function N(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), i = g, U) : $(g) ? (o = N, ne(g)) : te(g) ? (e.consume(g), N) : (e.consume(g), V);
  }
  function U(g) {
    return g === i ? (e.consume(g), i = void 0, W) : g === null ? n(g) : $(g) ? (o = U, ne(g)) : (e.consume(g), U);
  }
  function V(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? n(g) : g === 47 || g === 62 || Pe(g) ? M(g) : (e.consume(g), V);
  }
  function W(g) {
    return g === 47 || g === 62 || Pe(g) ? M(g) : n(g);
  }
  function Q(g) {
    return g === 62 ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(g);
  }
  function ne(g) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), de;
  }
  function de(g) {
    return te(g) ? se(e, ve, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(g) : ve(g);
  }
  function ve(g) {
    return e.enter("htmlTextData"), o(g);
  }
}
const Sr = {
  name: "labelEnd",
  resolveAll: Gc,
  resolveTo: Vc,
  tokenize: Wc
}, Uc = {
  tokenize: jc
}, zc = {
  tokenize: $c
}, Bc = {
  tokenize: Zc
};
function Gc(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e.length !== n.length && ft(e, 0, e.length, n), e;
}
function Vc(e, t) {
  let n = e.length, r = 0, i, a, o, s;
  for (; n--; )
    if (i = e[n][1], a) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (o) {
      if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (a = n, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (o = n);
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
      ...e[o][1].end
    }
  }, u = {
    type: "labelText",
    start: {
      ...e[a + r + 2][1].end
    },
    end: {
      ...e[o - 2][1].start
    }
  };
  return s = [["enter", l, t], ["enter", c, t]], s = Ke(s, e.slice(a + 1, a + r + 3)), s = Ke(s, [["enter", u, t]]), s = Ke(s, wr(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t)), s = Ke(s, [["exit", u, t], e[o - 2], e[o - 1], ["exit", c, t]]), s = Ke(s, e.slice(o + 1)), s = Ke(s, [["exit", l, t]]), ft(e, a, e.length, s), e;
}
function Wc(e, t, n) {
  const r = this;
  let i = r.events.length, a, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return s;
  function s(m) {
    return a ? a._inactive ? d(m) : (o = r.parser.defined.includes(Ft(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(m), e.exit("labelMarker"), e.exit("labelEnd"), l) : n(m);
  }
  function l(m) {
    return m === 40 ? e.attempt(Uc, u, o ? u : d)(m) : m === 91 ? e.attempt(zc, u, o ? c : d)(m) : o ? u(m) : d(m);
  }
  function c(m) {
    return e.attempt(Bc, u, d)(m);
  }
  function u(m) {
    return t(m);
  }
  function d(m) {
    return a._balanced = !0, n(m);
  }
}
function jc(e, t, n) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), i;
  }
  function i(d) {
    return Pe(d) ? Yt(e, a)(d) : a(d);
  }
  function a(d) {
    return d === 41 ? u(d) : wa(e, o, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function o(d) {
    return Pe(d) ? Yt(e, l)(d) : u(d);
  }
  function s(d) {
    return n(d);
  }
  function l(d) {
    return d === 34 || d === 39 || d === 40 ? Ea(e, c, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : u(d);
  }
  function c(d) {
    return Pe(d) ? Yt(e, u)(d) : u(d);
  }
  function u(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), t) : n(d);
  }
}
function $c(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return Sa.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(s);
  }
  function a(s) {
    return r.parser.defined.includes(Ft(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(s) : n(s);
  }
  function o(s) {
    return n(s);
  }
}
function Zc(e, t, n) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), i;
  }
  function i(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), t) : n(a);
  }
}
const qc = {
  name: "labelStartImage",
  resolveAll: Sr.resolveAll,
  tokenize: Kc
};
function Kc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(s), e.exit("labelImageMarker"), a;
  }
  function a(s) {
    return s === 91 ? (e.enter("labelMarker"), e.consume(s), e.exit("labelMarker"), e.exit("labelImage"), o) : n(s);
  }
  function o(s) {
    return s === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : t(s);
  }
}
const Xc = {
  name: "labelStartLink",
  resolveAll: Sr.resolveAll,
  tokenize: Yc
};
function Yc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), a;
  }
  function a(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const zn = {
  name: "lineEnding",
  tokenize: Jc
};
function Jc(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), se(e, t, "linePrefix");
  }
}
const mn = {
  name: "thematicBreak",
  tokenize: Qc
};
function Qc(e, t, n) {
  let r = 0, i;
  return a;
  function a(c) {
    return e.enter("thematicBreak"), o(c);
  }
  function o(c) {
    return i = c, s(c);
  }
  function s(c) {
    return c === i ? (e.enter("thematicBreakSequence"), l(c)) : r >= 3 && (c === null || $(c)) ? (e.exit("thematicBreak"), t(c)) : n(c);
  }
  function l(c) {
    return c === i ? (e.consume(c), r++, l) : (e.exit("thematicBreakSequence"), te(c) ? se(e, s, "whitespace")(c) : s(c));
  }
}
const Le = {
  continuation: {
    tokenize: ru
  },
  exit: au,
  name: "list",
  tokenize: nu
}, eu = {
  partial: !0,
  tokenize: ou
}, tu = {
  partial: !0,
  tokenize: iu
};
function nu(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return s;
  function s(p) {
    const w = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (w === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : ir(p)) {
      if (r.containerState.type || (r.containerState.type = w, e.enter(w, {
        _container: !0
      })), w === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(mn, n, c)(p) : c(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), l(p);
    }
    return n(p);
  }
  function l(p) {
    return ir(p) && ++o < 10 ? (e.consume(p), l) : (!r.interrupt || o < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), c(p)) : n(p);
  }
  function c(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      kn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : u,
      e.attempt(eu, m, d)
    );
  }
  function u(p) {
    return r.containerState.initialBlankLine = !0, a++, m(p);
  }
  function d(p) {
    return te(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), m) : n(p);
  }
  function m(p) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(p);
  }
}
function ru(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(kn, i, a);
  function i(s) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, se(e, t, "listItemIndent", r.containerState.size + 1)(s);
  }
  function a(s) {
    return r.containerState.furtherBlankLines || !te(s) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(s)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(tu, t, o)(s));
  }
  function o(s) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, se(e, e.attempt(Le, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s);
  }
}
function iu(e, t, n) {
  const r = this;
  return se(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function au(e) {
  e.exit(this.containerState.type);
}
function ou(e, t, n) {
  const r = this;
  return se(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const o = r.events[r.events.length - 1];
    return !te(a) && o && o[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const yi = {
  name: "setextUnderline",
  resolveTo: su,
  tokenize: lu
};
function su(e, t) {
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
  const o = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", a ? (e.splice(i, 0, ["enter", o, t]), e.splice(a + 1, 0, ["exit", e[r][1], t]), e[r][1].end = {
    ...e[a][1].end
  }) : e[r][1] = o, e.push(["exit", o, t]), e;
}
function lu(e, t, n) {
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
    return !r.parser.lazy[r.now().line] && (r.interrupt || d) ? (e.enter("setextHeadingLine"), i = c, o(c)) : n(c);
  }
  function o(c) {
    return e.enter("setextHeadingLineSequence"), s(c);
  }
  function s(c) {
    return c === i ? (e.consume(c), s) : (e.exit("setextHeadingLineSequence"), te(c) ? se(e, l, "lineSuffix")(c) : l(c));
  }
  function l(c) {
    return c === null || $(c) ? (e.exit("setextHeadingLine"), t(c)) : n(c);
  }
}
const cu = {
  tokenize: uu
};
function uu(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    kn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, se(e, e.attempt(this.parser.constructs.flow, i, e.attempt(mc, i)), "linePrefix"))
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
const hu = {
  resolveAll: Ta()
}, pu = _a("string"), du = _a("text");
function _a(e) {
  return {
    resolveAll: Ta(e === "text" ? fu : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], a = n.attempt(i, o, s);
    return o;
    function o(u) {
      return c(u) ? a(u) : s(u);
    }
    function s(u) {
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
function Ta(e) {
  return t;
  function t(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === "data" && (a = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function fu(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let a = i.length, o = -1, s = 0, l;
      for (; a--; ) {
        const c = i[a];
        if (typeof c == "string") {
          for (o = c.length; c.charCodeAt(o - 1) === 32; )
            s++, o--;
          if (o) break;
          o = -1;
        } else if (c === -2)
          l = !0, s++;
        else if (c !== -1) {
          a++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (s = 0), s) {
        const c = {
          type: n === e.length || l || s < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: a ? o : r.start._bufferIndex + o,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - s,
            offset: r.end.offset - s
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
const mu = {
  42: Le,
  43: Le,
  45: Le,
  48: Le,
  49: Le,
  50: Le,
  51: Le,
  52: Le,
  53: Le,
  54: Le,
  55: Le,
  56: Le,
  57: Le,
  62: ma
}, gu = {
  91: Sc
}, Cu = {
  [-2]: Un,
  [-1]: Un,
  32: Un
}, yu = {
  35: bc,
  42: mn,
  45: [yi, mn],
  60: Ac,
  61: yi,
  95: mn,
  96: gi,
  126: gi
}, wu = {
  38: Ca,
  92: ga
}, Su = {
  [-5]: zn,
  [-4]: zn,
  [-3]: zn,
  33: qc,
  38: Ca,
  42: ar,
  60: [Xl, Hc],
  91: Xc,
  92: [kc, ga],
  93: Sr,
  95: ar,
  96: cc
}, Eu = {
  null: [ar, hu]
}, _u = {
  null: [42, 95]
}, Tu = {
  null: []
}, ku = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: _u,
  contentInitial: gu,
  disable: Tu,
  document: mu,
  flow: yu,
  flowInitial: Cu,
  insideSpan: Eu,
  string: wu,
  text: Su
}, Symbol.toStringTag, { value: "Module" }));
function xu(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, a = [];
  let o = [], s = [];
  const l = {
    attempt: B(O),
    check: B(_),
    consume: L,
    enter: T,
    exit: D,
    interrupt: B(_, {
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
  function d(v) {
    return o = Ke(o, v), R(), o[o.length - 1] !== null ? [] : (q(t, 0), c.events = wr(a, c.events, c), c.events);
  }
  function m(v, N) {
    return vu(p(v), N);
  }
  function p(v) {
    return bu(o, v);
  }
  function w() {
    const {
      _bufferIndex: v,
      _index: N,
      line: U,
      column: V,
      offset: W
    } = r;
    return {
      _bufferIndex: v,
      _index: N,
      line: U,
      column: V,
      offset: W
    };
  }
  function S(v) {
    i[v.line] = v.column, G();
  }
  function R() {
    let v;
    for (; r._index < o.length; ) {
      const N = o[r._index];
      if (typeof N == "string")
        for (v = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === v && r._bufferIndex < N.length; )
          y(N.charCodeAt(r._bufferIndex));
      else
        y(N);
    }
  }
  function y(v) {
    u = u(v);
  }
  function L(v) {
    $(v) ? (r.line++, r.column = 1, r.offset += v === -3 ? 2 : 1, G()) : v !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = v;
  }
  function T(v, N) {
    const U = N || {};
    return U.type = v, U.start = w(), c.events.push(["enter", U, c]), s.push(U), U;
  }
  function D(v) {
    const N = s.pop();
    return N.end = w(), c.events.push(["exit", N, c]), N;
  }
  function O(v, N) {
    q(v, N.from);
  }
  function _(v, N) {
    N.restore();
  }
  function B(v, N) {
    return U;
    function U(V, W, Q) {
      let ne, de, ve, g;
      return Array.isArray(V) ? (
        /* c8 ignore next 1 */
        we(V)
      ) : "tokenize" in V ? (
        // Looks like a construct.
        we([
          /** @type {Construct} */
          V
        ])
      ) : J(V);
      function J(ae) {
        return We;
        function We(fe) {
          const je = fe !== null && ae[fe], Fe = fe !== null && ae.null, it = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(je) ? je : je ? [je] : [],
            ...Array.isArray(Fe) ? Fe : Fe ? [Fe] : []
          ];
          return we(it)(fe);
        }
      }
      function we(ae) {
        return ne = ae, de = 0, ae.length === 0 ? Q : f(ae[de]);
      }
      function f(ae) {
        return We;
        function We(fe) {
          return g = M(), ve = ae, ae.partial || (c.currentConstruct = ae), ae.name && c.parser.constructs.disable.null.includes(ae.name) ? ee() : ae.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            N ? Object.assign(Object.create(c), N) : c,
            l,
            Se,
            ee
          )(fe);
        }
      }
      function Se(ae) {
        return v(ve, g), W;
      }
      function ee(ae) {
        return g.restore(), ++de < ne.length ? f(ne[de]) : Q;
      }
    }
  }
  function q(v, N) {
    v.resolveAll && !a.includes(v) && a.push(v), v.resolve && ft(c.events, N, c.events.length - N, v.resolve(c.events.slice(N), c)), v.resolveTo && (c.events = v.resolveTo(c.events, c));
  }
  function M() {
    const v = w(), N = c.previous, U = c.currentConstruct, V = c.events.length, W = Array.from(s);
    return {
      from: V,
      restore: Q
    };
    function Q() {
      r = v, c.previous = N, c.currentConstruct = U, c.events.length = V, s = W, G();
    }
  }
  function G() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function bu(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex;
  let o;
  if (n === i)
    o = [e[n].slice(r, a)];
  else {
    if (o = e.slice(n, i), r > -1) {
      const s = o[0];
      typeof s == "string" ? o[0] = s.slice(r) : o.shift();
    }
    a > 0 && o.push(e[i].slice(0, a));
  }
  return o;
}
function vu(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const a = e[n];
    let o;
    if (typeof a == "string")
      o = a;
    else switch (a) {
      case -5: {
        o = "\r";
        break;
      }
      case -4: {
        o = `
`;
        break;
      }
      case -3: {
        o = `\r
`;
        break;
      }
      case -2: {
        o = t ? " " : "	";
        break;
      }
      case -1: {
        if (!t && i) continue;
        o = " ";
        break;
      }
      default:
        o = String.fromCharCode(a);
    }
    i = a === -2, r.push(o);
  }
  return r.join("");
}
function Iu(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Dl([ku, ...(e || {}).extensions || []])
    ),
    content: i(Vl),
    defined: [],
    document: i(jl),
    flow: i(cu),
    lazy: {},
    string: i(pu),
    text: i(du)
  };
  return r;
  function i(a) {
    return o;
    function o(s) {
      return xu(r, a, s);
    }
  }
}
function Ru(e) {
  for (; !ya(e); )
    ;
  return e;
}
const wi = /[\0\t\n\r]/g;
function Au() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, o, s) {
    const l = [];
    let c, u, d, m, p;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(o || void 0).decode(a)), d = 0, t = "", n && (a.charCodeAt(0) === 65279 && d++, n = void 0); d < a.length; ) {
      if (wi.lastIndex = d, c = wi.exec(a), m = c && c.index !== void 0 ? c.index : a.length, p = a.charCodeAt(m), !c) {
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
    return s && (r && l.push(-5), t && l.push(t), l.push(null)), l;
  }
}
const Nu = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Mu(e) {
  return e.replace(Nu, Lu);
}
function Lu(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return fa(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return yr(n) || e;
}
const ka = {}.hasOwnProperty;
function Ou(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Du(n)(Ru(Iu(n).document().write(Au()(e, t, !0))));
}
function Du(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(at),
      autolinkProtocol: M,
      autolinkEmail: M,
      atxHeading: a(Ue),
      blockQuote: a(Fe),
      characterEscape: M,
      characterReference: M,
      codeFenced: a(it),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: a(it, o),
      codeText: a(It, o),
      codeTextData: M,
      data: M,
      codeFlowValue: M,
      definition: a(Je),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: a(mt),
      hardBreakEscape: a(Et),
      hardBreakTrailing: a(Et),
      htmlFlow: a(_t, o),
      htmlFlowData: M,
      htmlText: a(_t, o),
      htmlTextData: M,
      image: a(Qe),
      label: o,
      link: a(at),
      listItem: a(Tt),
      listItemValue: m,
      listOrdered: a(ot, d),
      listUnordered: a(ot),
      paragraph: a(st),
      reference: f,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: a(Ue),
      strong: a(Bt),
      thematicBreak: a(et)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: O,
      autolink: l(),
      autolinkEmail: je,
      autolinkProtocol: fe,
      blockQuote: l(),
      characterEscapeValue: G,
      characterReferenceMarkerHexadecimal: ee,
      characterReferenceMarkerNumeric: ee,
      characterReferenceValue: ae,
      characterReference: We,
      codeFenced: l(R),
      codeFencedFence: S,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: w,
      codeFlowValue: G,
      codeIndented: l(y),
      codeText: l(W),
      codeTextData: G,
      data: G,
      definition: l(),
      definitionDestinationString: D,
      definitionLabelString: L,
      definitionTitleString: T,
      emphasis: l(),
      hardBreakEscape: l(N),
      hardBreakTrailing: l(N),
      htmlFlow: l(U),
      htmlFlowData: G,
      htmlText: l(V),
      htmlTextData: G,
      image: l(ne),
      label: ve,
      labelText: de,
      lineEnding: v,
      link: l(Q),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: Se,
      resourceDestinationString: g,
      resourceTitleString: J,
      resource: we,
      setextHeading: l(q),
      setextHeadingLineSequence: B,
      setextHeadingText: _,
      strong: l(),
      thematicBreak: l()
    }
  };
  xa(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(E) {
    let b = {
      type: "root",
      children: []
    };
    const z = {
      stack: [b],
      tokenStack: [],
      config: t,
      enter: s,
      exit: c,
      buffer: o,
      resume: u,
      data: n
    }, Z = [];
    let Y = -1;
    for (; ++Y < E.length; )
      if (E[Y][1].type === "listOrdered" || E[Y][1].type === "listUnordered")
        if (E[Y][0] === "enter")
          Z.push(Y);
        else {
          const me = Z.pop();
          Y = i(E, me, Y);
        }
    for (Y = -1; ++Y < E.length; ) {
      const me = t[E[Y][0]];
      ka.call(me, E[Y][1].type) && me[E[Y][1].type].call(Object.assign({
        sliceSerialize: E[Y][2].sliceSerialize
      }, z), E[Y][1]);
    }
    if (z.tokenStack.length > 0) {
      const me = z.tokenStack[z.tokenStack.length - 1];
      (me[1] || Si).call(z, void 0, me[0]);
    }
    for (b.position = {
      start: kt(E.length > 0 ? E[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: kt(E.length > 0 ? E[E.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Y = -1; ++Y < t.transforms.length; )
      b = t.transforms[Y](b) || b;
    return b;
  }
  function i(E, b, z) {
    let Z = b - 1, Y = -1, me = !1, ze, _e, $e, ge;
    for (; ++Z <= z; ) {
      const ue = E[Z];
      switch (ue[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          ue[0] === "enter" ? Y++ : Y--, ge = void 0;
          break;
        }
        case "lineEndingBlank": {
          ue[0] === "enter" && (ze && !ge && !Y && !$e && ($e = Z), ge = void 0);
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
      if (!Y && ue[0] === "enter" && ue[1].type === "listItemPrefix" || Y === -1 && ue[0] === "exit" && (ue[1].type === "listUnordered" || ue[1].type === "listOrdered")) {
        if (ze) {
          let Ze = Z;
          for (_e = void 0; Ze--; ) {
            const Ne = E[Ze];
            if (Ne[1].type === "lineEnding" || Ne[1].type === "lineEndingBlank") {
              if (Ne[0] === "exit") continue;
              _e && (E[_e][1].type = "lineEndingBlank", me = !0), Ne[1].type = "lineEnding", _e = Ze;
            } else if (!(Ne[1].type === "linePrefix" || Ne[1].type === "blockQuotePrefix" || Ne[1].type === "blockQuotePrefixWhitespace" || Ne[1].type === "blockQuoteMarker" || Ne[1].type === "listItemIndent")) break;
          }
          $e && (!_e || $e < _e) && (ze._spread = !0), ze.end = Object.assign({}, _e ? E[_e][1].start : ue[1].end), E.splice(_e || Z, 0, ["exit", ze, ue[2]]), Z++, z++;
        }
        if (ue[1].type === "listItemPrefix") {
          const Ze = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, ue[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          ze = Ze, E.splice(Z, 0, ["enter", Ze, ue[2]]), Z++, z++, $e = void 0, ge = !0;
        }
      }
    }
    return E[b][1]._spread = me, z;
  }
  function a(E, b) {
    return z;
    function z(Z) {
      s.call(this, E(Z), Z), b && b.call(this, Z);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function s(E, b, z) {
    this.stack[this.stack.length - 1].children.push(E), this.stack.push(E), this.tokenStack.push([b, z || void 0]), E.position = {
      start: kt(b.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function l(E) {
    return b;
    function b(z) {
      E && E.call(this, z), c.call(this, z);
    }
  }
  function c(E, b) {
    const z = this.stack.pop(), Z = this.tokenStack.pop();
    if (Z)
      Z[0].type !== E.type && (b ? b.call(this, E, Z[0]) : (Z[1] || Si).call(this, E, Z[0]));
    else throw new Error("Cannot close `" + E.type + "` (" + Xt({
      start: E.start,
      end: E.end
    }) + "): it’s not open");
    z.position.end = kt(E.end);
  }
  function u() {
    return Ll(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(E) {
    if (this.data.expectingFirstListItemValue) {
      const b = this.stack[this.stack.length - 2];
      b.start = Number.parseInt(this.sliceSerialize(E), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.lang = E;
  }
  function w() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.meta = E;
  }
  function S() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function R() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function y() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = E.replace(/(\r?\n|\r)$/g, "");
  }
  function L(E) {
    const b = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = b, z.identifier = Ft(this.sliceSerialize(E)).toLowerCase();
  }
  function T() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.title = E;
  }
  function D() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.url = E;
  }
  function O(E) {
    const b = this.stack[this.stack.length - 1];
    if (!b.depth) {
      const z = this.sliceSerialize(E).length;
      b.depth = z;
    }
  }
  function _() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function B(E) {
    const b = this.stack[this.stack.length - 1];
    b.depth = this.sliceSerialize(E).codePointAt(0) === 61 ? 1 : 2;
  }
  function q() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function M(E) {
    const z = this.stack[this.stack.length - 1].children;
    let Z = z[z.length - 1];
    (!Z || Z.type !== "text") && (Z = gt(), Z.position = {
      start: kt(E.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, z.push(Z)), this.stack.push(Z);
  }
  function G(E) {
    const b = this.stack.pop();
    b.value += this.sliceSerialize(E), b.position.end = kt(E.end);
  }
  function v(E) {
    const b = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const z = b.children[b.children.length - 1];
      z.position.end = kt(E.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(b.type) && (M.call(this, E), G.call(this, E));
  }
  function N() {
    this.data.atHardBreak = !0;
  }
  function U() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = E;
  }
  function V() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = E;
  }
  function W() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = E;
  }
  function Q() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const b = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = b, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function ne() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const b = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = b, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function de(E) {
    const b = this.sliceSerialize(E), z = this.stack[this.stack.length - 2];
    z.label = Mu(b), z.identifier = Ft(b).toLowerCase();
  }
  function ve() {
    const E = this.stack[this.stack.length - 1], b = this.resume(), z = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, z.type === "link") {
      const Z = E.children;
      z.children = Z;
    } else
      z.alt = b;
  }
  function g() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.url = E;
  }
  function J() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.title = E;
  }
  function we() {
    this.data.inReference = void 0;
  }
  function f() {
    this.data.referenceType = "collapsed";
  }
  function Se(E) {
    const b = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = b, z.identifier = Ft(this.sliceSerialize(E)).toLowerCase(), this.data.referenceType = "full";
  }
  function ee(E) {
    this.data.characterReferenceType = E.type;
  }
  function ae(E) {
    const b = this.sliceSerialize(E), z = this.data.characterReferenceType;
    let Z;
    z ? (Z = fa(b, z === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : Z = yr(b);
    const Y = this.stack[this.stack.length - 1];
    Y.value += Z;
  }
  function We(E) {
    const b = this.stack.pop();
    b.position.end = kt(E.end);
  }
  function fe(E) {
    G.call(this, E);
    const b = this.stack[this.stack.length - 1];
    b.url = this.sliceSerialize(E);
  }
  function je(E) {
    G.call(this, E);
    const b = this.stack[this.stack.length - 1];
    b.url = "mailto:" + this.sliceSerialize(E);
  }
  function Fe() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function it() {
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
  function Je() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function mt() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Ue() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Et() {
    return {
      type: "break"
    };
  }
  function _t() {
    return {
      type: "html",
      value: ""
    };
  }
  function Qe() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function at() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function ot(E) {
    return {
      type: "list",
      ordered: E.type === "listOrdered",
      start: null,
      spread: E._spread,
      children: []
    };
  }
  function Tt(E) {
    return {
      type: "listItem",
      spread: E._spread,
      checked: null,
      children: []
    };
  }
  function st() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Bt() {
    return {
      type: "strong",
      children: []
    };
  }
  function gt() {
    return {
      type: "text",
      value: ""
    };
  }
  function et() {
    return {
      type: "thematicBreak"
    };
  }
}
function kt(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function xa(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? xa(e, r) : Pu(e, r);
  }
}
function Pu(e, t) {
  let n;
  for (n in t)
    if (ka.call(t, n))
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
function Si(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Xt({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Xt({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Xt({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function Hu(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return Ou(r, {
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
function Fu(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Uu(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function zu(e, t) {
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
function Bu(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Gu(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Vu(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = zt(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
  let o, s = e.footnoteCounts.get(r);
  s === void 0 ? (s = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = a + 1, s += 1, e.footnoteCounts.set(r, s);
  const l = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (s > 1 ? "-" + s : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(o) }]
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
function Wu(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function ju(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function ba(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function $u(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return ba(e, t);
  const i = { src: zt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function Zu(e, t) {
  const n = { src: zt(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function qu(e, t) {
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
function Ku(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return ba(e, t);
  const i = { href: zt(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function Xu(e, t) {
  const n = { href: zt(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Yu(e, t, n) {
  const r = e.all(t), i = n ? Ju(n) : va(t), a = {}, o = [];
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
  let s = -1;
  for (; ++s < r.length; ) {
    const u = r[s];
    (i || s !== 0 || u.type !== "element" || u.tagName !== "p") && o.push({ type: "text", value: `
` }), u.type === "element" && u.tagName === "p" && !i ? o.push(...u.children) : o.push(u);
  }
  const l = r[r.length - 1];
  l && (i || l.type !== "element" || l.tagName !== "p") && o.push({ type: "text", value: `
` });
  const c = { type: "element", tagName: "li", properties: a, children: o };
  return e.patch(t, c), e.applyData(t, c);
}
function Ju(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = va(n[r]);
  }
  return t;
}
function va(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function Qu(e, t) {
  const n = {}, r = e.all(t);
  let i = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length; ) {
    const o = r[i];
    if (o.type === "element" && o.tagName === "li" && o.properties && Array.isArray(o.properties.className) && o.properties.className.includes("task-list-item")) {
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
function e1(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function t1(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function n1(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function r1(e, t) {
  const n = e.all(t), r = n.shift(), i = [];
  if (r) {
    const o = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(t.children[0], o), i.push(o);
  }
  if (n.length > 0) {
    const o = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(n, !0)
    }, s = fr(t.children[1]), l = sa(t.children[t.children.length - 1]);
    s && l && (o.position = { start: s, end: l }), i.push(o);
  }
  const a = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function i1(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, s = o ? o.length : t.children.length;
  let l = -1;
  const c = [];
  for (; ++l < s; ) {
    const d = t.children[l], m = {}, p = o ? o[l] : void 0;
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
function a1(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Ei = 9, _i = 32;
function o1(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const a = [];
  for (; r; )
    a.push(
      Ti(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return a.push(Ti(t.slice(i), i > 0, !1)), a.join("");
}
function Ti(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let a = e.codePointAt(r);
    for (; a === Ei || a === _i; )
      r++, a = e.codePointAt(r);
  }
  if (n) {
    let a = e.codePointAt(i - 1);
    for (; a === Ei || a === _i; )
      i--, a = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function s1(e, t) {
  const n = { type: "text", value: o1(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function l1(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const c1 = {
  blockquote: Fu,
  break: Uu,
  code: zu,
  delete: Bu,
  emphasis: Gu,
  footnoteReference: Vu,
  heading: Wu,
  html: ju,
  imageReference: $u,
  image: Zu,
  inlineCode: qu,
  linkReference: Ku,
  link: Xu,
  listItem: Yu,
  list: Qu,
  paragraph: e1,
  // @ts-expect-error: root is different, but hard to type.
  root: t1,
  strong: n1,
  table: r1,
  tableCell: a1,
  tableRow: i1,
  text: s1,
  thematicBreak: l1,
  toml: un,
  yaml: un,
  definition: un,
  footnoteDefinition: un
};
function un() {
}
const Ia = -1, xn = 0, Jt = 1, En = 2, Er = 3, _r = 4, Tr = 5, kr = 6, Ra = 7, Aa = 8, ki = typeof self == "object" ? self : globalThis, u1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, o] = t[i];
    switch (a) {
      case xn:
      case Ia:
        return n(o, i);
      case Jt: {
        const s = n([], i);
        for (const l of o)
          s.push(r(l));
        return s;
      }
      case En: {
        const s = n({}, i);
        for (const [l, c] of o)
          s[r(l)] = r(c);
        return s;
      }
      case Er:
        return n(new Date(o), i);
      case _r: {
        const { source: s, flags: l } = o;
        return n(new RegExp(s, l), i);
      }
      case Tr: {
        const s = n(/* @__PURE__ */ new Map(), i);
        for (const [l, c] of o)
          s.set(r(l), r(c));
        return s;
      }
      case kr: {
        const s = n(/* @__PURE__ */ new Set(), i);
        for (const l of o)
          s.add(r(l));
        return s;
      }
      case Ra: {
        const { name: s, message: l } = o;
        return n(new ki[s](l), i);
      }
      case Aa:
        return n(BigInt(o), i);
      case "BigInt":
        return n(Object(BigInt(o)), i);
      case "ArrayBuffer":
        return n(new Uint8Array(o).buffer, o);
      case "DataView": {
        const { buffer: s } = new Uint8Array(o);
        return n(new DataView(s), o);
      }
    }
    return n(new ki[a](o), i);
  };
  return r;
}, xi = (e) => u1(/* @__PURE__ */ new Map(), e)(0), Dt = "", { toString: h1 } = {}, { keys: p1 } = Object, Kt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [xn, t];
  const n = h1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [Jt, Dt];
    case "Object":
      return [En, Dt];
    case "Date":
      return [Er, Dt];
    case "RegExp":
      return [_r, Dt];
    case "Map":
      return [Tr, Dt];
    case "Set":
      return [kr, Dt];
    case "DataView":
      return [Jt, n];
  }
  return n.includes("Array") ? [Jt, n] : n.includes("Error") ? [Ra, n] : [En, n];
}, hn = ([e, t]) => e === xn && (t === "function" || t === "symbol"), d1 = (e, t, n, r) => {
  const i = (o, s) => {
    const l = r.push(o) - 1;
    return n.set(s, l), l;
  }, a = (o) => {
    if (n.has(o))
      return n.get(o);
    let [s, l] = Kt(o);
    switch (s) {
      case xn: {
        let u = o;
        switch (l) {
          case "bigint":
            s = Aa, u = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + l);
            u = null;
            break;
          case "undefined":
            return i([Ia], o);
        }
        return i([s, u], o);
      }
      case Jt: {
        if (l) {
          let m = o;
          return l === "DataView" ? m = new Uint8Array(o.buffer) : l === "ArrayBuffer" && (m = new Uint8Array(o)), i([l, [...m]], o);
        }
        const u = [], d = i([s, u], o);
        for (const m of o)
          u.push(a(m));
        return d;
      }
      case En: {
        if (l)
          switch (l) {
            case "BigInt":
              return i([l, o.toString()], o);
            case "Boolean":
            case "Number":
            case "String":
              return i([l, o.valueOf()], o);
          }
        if (t && "toJSON" in o)
          return a(o.toJSON());
        const u = [], d = i([s, u], o);
        for (const m of p1(o))
          (e || !hn(Kt(o[m]))) && u.push([a(m), a(o[m])]);
        return d;
      }
      case Er:
        return i([s, o.toISOString()], o);
      case _r: {
        const { source: u, flags: d } = o;
        return i([s, { source: u, flags: d }], o);
      }
      case Tr: {
        const u = [], d = i([s, u], o);
        for (const [m, p] of o)
          (e || !(hn(Kt(m)) || hn(Kt(p)))) && u.push([a(m), a(p)]);
        return d;
      }
      case kr: {
        const u = [], d = i([s, u], o);
        for (const m of o)
          (e || !hn(Kt(m))) && u.push(a(m));
        return d;
      }
    }
    const { message: c } = o;
    return i([s, { name: l, message: c }], o);
  };
  return a;
}, bi = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return d1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, _n = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? xi(bi(e, t)) : structuredClone(e)
) : (e, t) => xi(bi(e, t));
function f1(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function m1(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function g1(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || f1, r = e.options.footnoteBackLabel || m1, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, s = [];
  let l = -1;
  for (; ++l < e.footnoteOrder.length; ) {
    const c = e.footnoteById.get(
      e.footnoteOrder[l]
    );
    if (!c)
      continue;
    const u = e.all(c), d = String(c.identifier).toUpperCase(), m = zt(d.toLowerCase());
    let p = 0;
    const w = [], S = e.footnoteCounts.get(d);
    for (; S !== void 0 && ++p <= S; ) {
      w.length > 0 && w.push({ type: "text", value: " " });
      let L = typeof n == "string" ? n : n(l, p);
      typeof L == "string" && (L = { type: "text", value: L }), w.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + m + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(l, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(L) ? L : [L]
      });
    }
    const R = u[u.length - 1];
    if (R && R.type === "element" && R.tagName === "p") {
      const L = R.children[R.children.length - 1];
      L && L.type === "text" ? L.value += " " : R.children.push({ type: "text", value: " " }), R.children.push(...w);
    } else
      u.push(...w);
    const y = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + m },
      children: e.wrap(u, !0)
    };
    e.patch(c, y), s.push(y);
  }
  if (s.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: a,
          properties: {
            ..._n(o),
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
          children: e.wrap(s, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const Na = (
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
      return S1;
    if (typeof e == "function")
      return bn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? C1(e) : y1(e);
    if (typeof e == "string")
      return w1(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function C1(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Na(e[n]);
  return bn(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function y1(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return bn(n);
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
function w1(e) {
  return bn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function bn(e) {
  return t;
  function t(n, r, i) {
    return !!(E1(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function S1() {
  return !0;
}
function E1(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Ma = [], _1 = !0, vi = !1, T1 = "skip";
function k1(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = Na(i), o = r ? -1 : 1;
  s(e, void 0, [])();
  function s(l, c, u) {
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
      let p = Ma, w, S, R;
      if ((!t || a(l, c, u[u.length - 1] || void 0)) && (p = x1(n(l, u)), p[0] === vi))
        return p;
      if ("children" in l && l.children) {
        const y = (
          /** @type {UnistParent} */
          l
        );
        if (y.children && p[0] !== T1)
          for (S = (r ? y.children.length : -1) + o, R = u.concat(y); S > -1 && S < y.children.length; ) {
            const L = y.children[S];
            if (w = s(L, S, R)(), w[0] === vi)
              return w;
            S = typeof w[1] == "number" ? w[1] : S + o;
          }
      }
      return p;
    }
  }
}
function x1(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [_1, e] : e == null ? Ma : [e];
}
function La(e, t, n, r) {
  let i, a, o;
  typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), k1(e, a, s, i);
  function s(l, c) {
    const u = c[c.length - 1], d = u ? u.children.indexOf(l) : void 0;
    return o(l, d, u);
  }
}
const or = {}.hasOwnProperty, b1 = {};
function v1(e, t) {
  const n = t || b1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = { ...c1, ...n.handlers }, s = {
    all: c,
    applyData: R1,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: o,
    one: l,
    options: n,
    patch: I1,
    wrap: N1
  };
  return La(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const d = u.type === "definition" ? r : i, m = String(u.identifier).toUpperCase();
      d.has(m) || d.set(m, u);
    }
  }), s;
  function l(u, d) {
    const m = u.type, p = s.handlers[m];
    if (or.call(s.handlers, m) && p)
      return p(s, u, d);
    if (s.options.passThrough && s.options.passThrough.includes(m)) {
      if ("children" in u) {
        const { children: S, ...R } = u, y = _n(R);
        return y.children = s.all(u), y;
      }
      return _n(u);
    }
    return (s.options.unknownHandler || A1)(s, u, d);
  }
  function c(u) {
    const d = [];
    if ("children" in u) {
      const m = u.children;
      let p = -1;
      for (; ++p < m.length; ) {
        const w = s.one(m[p], u);
        if (w) {
          if (p && m[p - 1].type === "break" && (!Array.isArray(w) && w.type === "text" && (w.value = Ii(w.value)), !Array.isArray(w) && w.type === "element")) {
            const S = w.children[0];
            S && S.type === "text" && (S.value = Ii(S.value));
          }
          Array.isArray(w) ? d.push(...w) : d.push(w);
        }
      }
    }
    return d;
  }
}
function I1(e, t) {
  e.position && (t.position = hl(e));
}
function R1(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, a = e.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element")
        n.tagName = r;
      else {
        const o = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: o };
      }
    n.type === "element" && a && Object.assign(n.properties, _n(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function A1(e, t) {
  const n = t.data || {}, r = "value" in t && !(or.call(n, "hProperties") || or.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function N1(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Ii(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function Ri(e, t) {
  const n = v1(e, t), r = n.one(e, void 0), i = g1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function M1(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      Ri(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      Ri(n, { file: r, ...e || t })
    );
  };
}
function Ai(e) {
  if (e)
    throw e;
}
var gn = Object.prototype.hasOwnProperty, Oa = Object.prototype.toString, Ni = Object.defineProperty, Mi = Object.getOwnPropertyDescriptor, Li = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : Oa.call(t) === "[object Array]";
}, Oi = function(t) {
  if (!t || Oa.call(t) !== "[object Object]")
    return !1;
  var n = gn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && gn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || gn.call(t, i);
}, Di = function(t, n) {
  Ni && n.name === "__proto__" ? Ni(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, Pi = function(t, n) {
  if (n === "__proto__")
    if (gn.call(t, n)) {
      if (Mi)
        return Mi(t, n).value;
    } else return;
  return t[n];
}, L1 = function e() {
  var t, n, r, i, a, o, s = arguments[0], l = 1, c = arguments.length, u = !1;
  for (typeof s == "boolean" && (u = s, s = arguments[1] || {}, l = 2), (s == null || typeof s != "object" && typeof s != "function") && (s = {}); l < c; ++l)
    if (t = arguments[l], t != null)
      for (n in t)
        r = Pi(s, n), i = Pi(t, n), s !== i && (u && i && (Oi(i) || (a = Li(i))) ? (a ? (a = !1, o = r && Li(r) ? r : []) : o = r && Oi(r) ? r : {}, Di(s, { name: n, newValue: e(u, o, i) })) : typeof i < "u" && Di(s, { name: n, newValue: i }));
  return s;
};
const Bn = /* @__PURE__ */ oa(L1);
function sr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function O1() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let a = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    s(null, ...i);
    function s(l, ...c) {
      const u = e[++a];
      let d = -1;
      if (l) {
        o(l);
        return;
      }
      for (; ++d < i.length; )
        (c[d] === null || c[d] === void 0) && (c[d] = i[d]);
      i = c, u ? D1(u, s)(...c) : o(null, ...c);
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
function D1(e, t) {
  let n;
  return r;
  function r(...o) {
    const s = e.length > o.length;
    let l;
    s && o.push(i);
    try {
      l = e.apply(this, o);
    } catch (c) {
      const u = (
        /** @type {Error} */
        c
      );
      if (s && n)
        throw u;
      return i(u);
    }
    s || (l && l.then && typeof l.then == "function" ? l.then(a, i) : l instanceof Error ? i(l) : a(l));
  }
  function i(o, ...s) {
    n || (n = !0, t(o, ...s));
  }
  function a(o) {
    i(null, o);
  }
}
const ut = { basename: P1, dirname: H1, extname: F1, join: U1, sep: "/" };
function P1(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  rn(e);
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
  let o = -1, s = t.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (a) {
        n = i + 1;
        break;
      }
    } else
      o < 0 && (a = !0, o = i + 1), s > -1 && (e.codePointAt(i) === t.codePointAt(s--) ? s < 0 && (r = i) : (s = -1, r = o));
  return n === r ? r = o : r < 0 && (r = e.length), e.slice(n, r);
}
function H1(e) {
  if (rn(e), e.length === 0)
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
function F1(e) {
  rn(e);
  let t = e.length, n = -1, r = 0, i = -1, a = 0, o;
  for (; t--; ) {
    const s = e.codePointAt(t);
    if (s === 47) {
      if (o) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (o = !0, n = t + 1), s === 46 ? i < 0 ? i = t : a !== 1 && (a = 1) : i > -1 && (a = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  a === 0 || // The (right-most) trimmed path component is exactly `..`.
  a === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function U1(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    rn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : z1(n);
}
function z1(e) {
  rn(e);
  const t = e.codePointAt(0) === 47;
  let n = B1(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function B1(e, t) {
  let n = "", r = 0, i = -1, a = 0, o = -1, s, l;
  for (; ++o <= e.length; ) {
    if (o < e.length)
      s = e.codePointAt(o);
    else {
      if (s === 47)
        break;
      s = 47;
    }
    if (s === 47) {
      if (!(i === o - 1 || a === 1)) if (i !== o - 1 && a === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (l = n.lastIndexOf("/"), l !== n.length - 1) {
              l < 0 ? (n = "", r = 0) : (n = n.slice(0, l), r = n.length - 1 - n.lastIndexOf("/")), i = o, a = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = o, a = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + e.slice(i + 1, o) : n = e.slice(i + 1, o), r = o - i - 1;
      i = o, a = 0;
    } else s === 46 && a > -1 ? a++ : a = -1;
  }
  return n;
}
function rn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const G1 = { cwd: V1 };
function V1() {
  return "/";
}
function lr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function W1(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!lr(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return j1(e);
}
function j1(e) {
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
const Gn = (
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
class Da {
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
    t ? lr(t) ? n = { path: t } : typeof t == "string" || $1(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : G1.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Gn.length; ) {
      const a = Gn[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      Gn.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? ut.basename(this.path) : void 0;
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
    Wn(t, "basename"), Vn(t, "basename"), this.path = ut.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? ut.dirname(this.path) : void 0;
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
    Hi(this.basename, "dirname"), this.path = ut.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? ut.extname(this.path) : void 0;
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
    if (Vn(t, "extname"), Hi(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ut.join(this.dirname, this.stem + (t || ""));
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
    lr(t) && (t = W1(t)), Wn(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? ut.basename(this.path, this.extname) : void 0;
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
    Wn(t, "stem"), Vn(t, "stem"), this.path = ut.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new be(
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
function Vn(e, t) {
  if (e && e.includes(ut.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ut.sep + "`"
    );
}
function Wn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function Hi(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function $1(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Z1 = (
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
), q1 = {}.hasOwnProperty;
class xr extends Z1 {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = O1();
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
      new xr()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Bn(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (Zn("data", this.frozen), this.namespace[t] = n, this) : q1.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Zn("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = pn(t), r = this.parser || this.Parser;
    return jn("parse", r), r(String(n), n);
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
    return this.freeze(), jn("process", this.parser || this.Parser), $n("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, o) {
      const s = pn(t), l = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(s)
      );
      r.run(l, s, function(u, d, m) {
        if (u || !d || !m)
          return c(u);
        const p = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          d
        ), w = r.stringify(p, m);
        Y1(w) ? m.value = w : m.result = w, c(
          u,
          /** @type {VFileWithOutput<CompileResult>} */
          m
        );
      });
      function c(u, d) {
        u || !d ? o(u) : a ? a(d) : n(void 0, d);
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
    return this.freeze(), jn("processSync", this.parser || this.Parser), $n("processSync", this.compiler || this.Compiler), this.process(t, i), Ui("processSync", "process", n), r;
    function i(a, o) {
      n = !0, Ai(a), r = o;
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
    Fi(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(o, s) {
      const l = pn(n);
      i.run(t, l, c);
      function c(u, d, m) {
        const p = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          d || t
        );
        u ? s(u) : o ? o(p) : r(void 0, p, m);
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
    return this.run(t, n, a), Ui("runSync", "run", r), i;
    function a(o, s) {
      Ai(o), i = s, r = !0;
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
    const r = pn(n), i = this.compiler || this.Compiler;
    return $n("stringify", i), Fi(t), i(t, r);
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
    if (Zn("use", this.frozen), t != null) if (typeof t == "function")
      l(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? s(t) : o(t);
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
          o(c);
      else
        throw new TypeError("Expected usable value, not `" + c + "`");
    }
    function o(c) {
      if (!("plugins" in c) && !("settings" in c))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      s(c.plugins), c.settings && (i.settings = Bn(!0, i.settings, c.settings));
    }
    function s(c) {
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
        sr(S) && sr(p) && (p = Bn(!0, S, p)), r[m] = [c, p, ...w];
      }
    }
  }
}
const K1 = new xr().freeze();
function jn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function $n(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Zn(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Fi(e) {
  if (!sr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Ui(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function pn(e) {
  return X1(e) ? e : new Da(e);
}
function X1(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Y1(e) {
  return typeof e == "string" || J1(e);
}
function J1(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Q1 = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", zi = [], Bi = { allowDangerousHtml: !0 }, eh = /^(https?|ircs?|mailto|xmpp)$/i, th = [
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
function Gi(e) {
  const t = nh(e), n = rh(e);
  return ih(t.runSync(t.parse(n), n), e);
}
function nh(e) {
  const t = e.rehypePlugins || zi, n = e.remarkPlugins || zi, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Bi } : Bi;
  return K1().use(Hu).use(n).use(M1, r).use(t);
}
function rh(e) {
  const t = e.children || "", n = new Da();
  return typeof t == "string" && (n.value = t), n;
}
function ih(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, s = t.unwrapDisallowed, l = t.urlTransform || ah;
  for (const u of th)
    Object.hasOwn(t, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + Q1 + u.id, void 0);
  return La(e, c), gl(e, {
    Fragment: tn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: h,
    jsxs: I,
    passKeys: !0,
    passNode: !0
  });
  function c(u, d, m) {
    if (u.type === "raw" && m && typeof d == "number")
      return o ? m.children.splice(d, 1) : m.children[d] = { type: "text", value: u.value }, d;
    if (u.type === "element") {
      let p;
      for (p in Fn)
        if (Object.hasOwn(Fn, p) && Object.hasOwn(u.properties, p)) {
          const w = u.properties[p], S = Fn[p];
          (S === null || S.includes(u.tagName)) && (u.properties[p] = l(String(w || ""), p, u));
        }
    }
    if (u.type === "element") {
      let p = n ? !n.includes(u.tagName) : a ? a.includes(u.tagName) : !1;
      if (!p && r && typeof d == "number" && (p = !r(u, d, m)), p && m && typeof d == "number")
        return s && u.children ? m.children.splice(d, 1, ...u.children) : m.children.splice(d, 1), d;
    }
  }
}
function ah(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    eh.test(e.slice(0, t)) ? e : ""
  );
}
function oh({ children: e, isStreaming: t }) {
  const [n, r] = le(!0), [i, a] = le(!1);
  ht.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const o = () => {
    t || r(!n);
  }, s = ht.Children.map(e, (l) => {
    if (ht.isValidElement(l)) {
      if (l.type === Pa)
        return ht.cloneElement(
          l,
          {
            onToggle: o,
            isExpanded: n
          }
        );
      if (l.type === Ha)
        return ht.cloneElement(
          l,
          {
            isVisible: n
          }
        );
    }
    return l;
  });
  return /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning", children: s });
}
function Pa({
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
  ), o = t === "completed" || e.includes(j.UI_TEXT.THINKING) || e.includes(j.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ I(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${o ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: o ? r : void 0,
      style: { cursor: o ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ I("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ h("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        o && /* @__PURE__ */ h(
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
function Ha({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function sh({ children: e }) {
  return /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function lh({
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
  let o;
  if (r != null && r.startsWith("lat_")) {
    const u = (l = n == null ? void 0 : n.parameters) == null ? void 0 : l.query, d = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.url;
    o = u || d || "Executing tool...";
  } else
    o = a();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
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
          /* @__PURE__ */ h("span", { children: o }),
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
          /* @__PURE__ */ h("span", { children: o }),
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
function Fa({ size: e = 16, variant: t = "dots" }) {
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
const ch = ({ message: e }) => {
  const [t, n] = le(!0);
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
}, Ua = Xa(null);
function uh({ children: e, value: t }) {
  return /* @__PURE__ */ h(Ua.Provider, { value: t, children: e });
}
function an() {
  const e = Ya(Ua);
  if (!e)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return e;
}
const za = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ h("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code-block", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ h("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ h("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ h("li", { className: "chat-wrapper__list-item", ...t, children: e })
}, hh = {
  ...za,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code", ...n, children: e })
}, Ba = Vi(
  ({ message: e }) => {
    const {
      getReasoningTitle: t,
      getReasoningStatus: n,
      getReasoningDuration: r,
      getReasoningContentOnly: i,
      getToolingTitle: a,
      getToolingStatus: o,
      clientTools: s,
      currentAssistantMessageIdRef: l
    } = an(), [c, u] = le(!1), [d, m] = le(!1), p = re(async () => {
      try {
        await navigator.clipboard.writeText(e.content), u(!0), setTimeout(() => u(!1), 2e3);
      } catch (O) {
        console.error("Failed to copy message:", O);
      }
    }, [e.content]), w = () => /* @__PURE__ */ I("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ h(Fa, { size: 16, variant: "dots" }),
      /* @__PURE__ */ h("span", { children: j.UI_TEXT.THINKING })
    ] }), S = () => /* @__PURE__ */ I(tn, { children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ h(
        "button",
        {
          className: `chat-wrapper__copy-button ${d ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: p,
          title: "Copy message",
          children: /* @__PURE__ */ h(ys, {})
        }
      ) }),
      c && /* @__PURE__ */ h("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), R = () => /* @__PURE__ */ h("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(Gi, { components: za, children: e.content }) }),
      S()
    ] }) }), y = () => /* @__PURE__ */ I("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(Gi, { components: hh, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ h("div", { className: "chat-wrapper__media", children: e.media.map((O, _) => /* @__PURE__ */ h(
        "img",
        {
          src: O,
          alt: `Uploaded content ${_ + 1}`,
          className: "chat-wrapper__media-image"
        },
        _
      )) })
    ] }), L = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === l.current ? w() : e.role === "system" ? /* @__PURE__ */ h(ch, { message: e }) : e.role === "assistant" ? R() : y(), T = () => /* @__PURE__ */ I(oh, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ h(
        Pa,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ h(Ha, { children: i(e.content) })
    ] }), D = () => {
      var O;
      return /* @__PURE__ */ h(sh, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ h(
        lh,
        {
          title: a(e.content, e.isStreaming),
          status: o(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (O = e.toolData) == null ? void 0 : O.toolName,
          clientTools: s
        }
      ) });
    };
    return /* @__PURE__ */ h(
      "div",
      {
        className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
        onMouseEnter: () => e.role === "assistant" && m(!0),
        onMouseLeave: () => e.role === "assistant" && m(!1),
        children: e.role === "reasoning" ? T() : e.role === "tooling" ? D() : /* @__PURE__ */ h("div", { className: "chat-wrapper__message-content", children: L() })
      }
    );
  }
);
Ba.displayName = "MessageItem";
const ph = ({ isVisible: e }) => e ? /* @__PURE__ */ h("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ h("span", {}),
  /* @__PURE__ */ h("span", {}),
  /* @__PURE__ */ h("span", {})
] }) }) }) }) : null, Ga = ur((e, t) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = an();
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__messages", children: [
    n.map((a) => /* @__PURE__ */ h(
      Ba,
      {
        message: a
      },
      a.id
    )),
    /* @__PURE__ */ h(ph, { isVisible: r && !i }),
    /* @__PURE__ */ h("div", { ref: t })
  ] });
});
Ga.displayName = "MessagesList";
const rt = (...e) => e.filter(Boolean).join(" "), dh = () => /* @__PURE__ */ I(
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
), fh = ({ className: e, ...t }) => /* @__PURE__ */ h("form", { className: rt("chat-wrapper__prompt-input", e), ...t }), Va = ur(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...o
  }, s) => {
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
        ref: s,
        className: rt("chat-wrapper__prompt-textarea", t),
        name: "message",
        onChange: e,
        onKeyDown: l,
        placeholder: n,
        style: {
          minHeight: `${r}px`,
          maxHeight: `${i}px`
        },
        ...o
      }
    );
  }
);
Va.displayName = "PromptInputTextarea";
const mh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: rt("chat-wrapper__prompt-toolbar", e), ...t }), gh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: rt("chat-wrapper__prompt-tools", e), ...t }), Ch = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || ht.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ h(
    "button",
    {
      className: rt(
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
}, yh = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = Xe.IDLE,
  children: i,
  disabled: a,
  ...o
}) => {
  let s = /* @__PURE__ */ h(dh, {});
  return /* @__PURE__ */ h(
    "button",
    {
      className: rt(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${t}`,
        `chat-wrapper__prompt-submit--${n}`,
        // status === "streaming" && "chat-wrapper__prompt-submit--stop",
        e
      ),
      type: "submit",
      disabled: a,
      ...o,
      children: i ?? s
    }
  );
}, $h = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ h("select", { className: rt("chat-wrapper__prompt-select", e), ...n, children: t }), Zh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ h(
  "button",
  {
    className: rt("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), qh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h(
  "div",
  {
    className: rt("chat-wrapper__prompt-select-content", e),
    ...t
  }
), Kh = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ h(
  "div",
  {
    className: rt("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), Xh = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ h(
  "span",
  {
    className: rt("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), wh = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = le(0), [a, o] = le(!1), [s, l] = le(0);
  return ke(() => {
    if (!t || e.length <= 1) return;
    const c = setInterval(() => {
      o(!0), setTimeout(() => {
        i((u) => (u + 1) % e.length), l((u) => u + 1), o(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(c);
  }, [t, e.length]), ke(() => {
    t || (i(0), o(!1), l(0));
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
        s
      )
    }
  );
}, Sh = ur((e, t) => {
  const {
    placeholder: n = "What would you like to know?",
    placeholderTexts: r,
    isStreaming: i,
    isLoadingConversation: a,
    chatStatus: o,
    fileUploadEnabled: s,
    restaurantName: l,
    restaurantLogo: c,
    messages: u,
    onSubmit: d,
    onFileUpload: m,
    onStopGeneration: p
  } = an(), w = u.length > 0, [S, R] = le(""), [y, L] = le([]), T = Ge(null), D = r && r.length > 0 ? r : [n], O = S.length === 0 && !w && D.length > 1;
  Ja(t, () => ({
    focus: () => {
      var M;
      (M = T.current) == null || M.focus();
    },
    setText: (M) => {
      R(M), setTimeout(() => {
        var G;
        (G = T.current) == null || G.focus();
      }, 0);
    }
  }));
  const _ = re(
    (M) => {
      M.preventDefault();
      const v = new FormData(M.currentTarget).get("message");
      if (v != null && v.trim()) {
        const N = yn(v.trim(), !1);
        if (!N.trim()) {
          console.warn("Message was blocked due to security concerns");
          return;
        }
        d(N, y), R(""), L([]);
      }
    },
    [d, y]
  ), B = re(
    (M) => {
      const v = M.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      R(v);
    },
    []
  ), q = re(async () => {
    const M = document.createElement("input");
    M.type = "file", M.accept = "image/*", M.multiple = !1, M.onchange = async (G) => {
      const v = G.target.files;
      if (v) {
        const N = Array.from(v).filter((U) => {
          const V = Po(U.name);
          return V !== U.name && console.warn(
            `File name sanitized: ${U.name} -> ${V}`
          ), U.size > 10485760 ? (console.warn(`File too large: ${U.name} (${U.size} bytes)`), !1) : [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp"
          ].includes(U.type) ? !0 : (console.warn(`File type not allowed: ${U.name} (${U.type})`), !1);
        });
        if (N.length > 0) {
          const U = await m(N);
          L(U);
        }
      }
    }, M.click();
  }, [m]);
  return /* @__PURE__ */ I(fh, { onSubmit: _, style: { position: "relative" }, children: [
    /* @__PURE__ */ h(
      Va,
      {
        ref: T,
        name: "message",
        value: S,
        onChange: B,
        placeholder: "",
        disabled: i || a
      }
    ),
    !S.trim() && /* @__PURE__ */ h(
      wh,
      {
        placeholderTexts: D,
        shouldAnimate: O
      }
    ),
    y.length > 0 && /* @__PURE__ */ h(
      "div",
      {
        style: {
          padding: "8px 16px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          alignItems: "center"
        },
        children: y.map((M, G) => {
          const v = M.startsWith("data:image/"), N = M.startsWith("http://") || M.startsWith("https://"), U = v || N;
          return /* @__PURE__ */ I(
            "div",
            {
              style: {
                position: "relative",
                display: "inline-block"
              },
              children: [
                U ? /* @__PURE__ */ I(
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
                          src: M,
                          alt: `Attachment ${G + 1}`,
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
                              const V = M.match(/name=([^;]+)/);
                              return V ? decodeURIComponent(V[1]) : "document.pdf";
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
                              const V = M.match(/data:([^;]+)/);
                              if (V) {
                                const W = V[1];
                                switch (W) {
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
                                    const Q = W.split("/")[1];
                                    return Q ? Q.toUpperCase().substring(0, 4) : "FILE";
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
                      L(
                        (V) => V.filter((W, Q) => Q !== G)
                      );
                    },
                    style: {
                      position: "absolute",
                      top: U ? "6px" : "8px",
                      right: U ? "6px" : "8px",
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
            G
          );
        })
      }
    ),
    /* @__PURE__ */ I(mh, { children: [
      /* @__PURE__ */ I(gh, { children: [
        s && /* @__PURE__ */ I(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ h(
                Ch,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: q,
                  title: y.length > 0 ? `${y.length} image(s) attached` : "Attach image",
                  disabled: i || a,
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
                  onClick: q,
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
        s && l && /* @__PURE__ */ h("div", { className: "chat-wrapper__divider" }),
        l && /* @__PURE__ */ I("div", { className: "chat-wrapper__restaurant-chip", children: [
          c && /* @__PURE__ */ h(
            "img",
            {
              src: c,
              alt: "Restaurant logo",
              className: "chat-wrapper__restaurant-logo"
            }
          ),
          /* @__PURE__ */ h("span", { className: "chat-wrapper__restaurant-name", children: l })
        ] })
      ] }),
      /* @__PURE__ */ h(
        yh,
        {
          status: o,
          disabled: !S.trim() || a,
          onClick: o === Xe.STREAMING && p ? () => {
            p();
          } : void 0
        }
      )
    ] })
  ] });
}), Eh = () => {
  const { suggestedPrompts: e, chatInputRef: t } = an();
  if (!e || e.length === 0)
    return null;
  const n = (r) => {
    t.current && t.current.setText(r.description);
  };
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__suggested-prompts", children: [
    /* @__PURE__ */ h("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
    /* @__PURE__ */ h("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((r, i) => /* @__PURE__ */ h(
      "button",
      {
        className: "chat-wrapper__suggested-prompt-card",
        onClick: () => n(r),
        children: /* @__PURE__ */ I("div", { className: "chat-wrapper__suggested-prompt-content", children: [
          /* @__PURE__ */ h("h4", { className: "chat-wrapper__suggested-prompt-title", children: r.title }),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__suggested-prompt-description", children: r.description })
        ] })
      },
      i
    )) })
  ] });
}, _h = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ h(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ h("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ h(Fa, { size: e, variant: "dots" }) })
  }
), Th = ({
  appName: e,
  description: t
}) => /* @__PURE__ */ I("div", { className: "chat-wrapper__main-header", children: [
  /* @__PURE__ */ h("h1", { className: "chat-wrapper__main-title", children: e }),
  t && /* @__PURE__ */ h("p", { className: "chat-wrapper__description", children: t })
] }), kh = () => {
  const {
    messages: e,
    isLoadingConversation: t,
    isStreaming: n,
    appName: r,
    description: i,
    suggestedPrompts: a,
    messagesEndRef: o,
    chatInputRef: s,
    conversationError: l
  } = an(), c = pt.state.shouldShowMainHeader(
    e.length,
    n,
    t
  ), u = pt.state.shouldShowSuggestedPrompts(
    e.length,
    n,
    t,
    a
  ), d = pt.state.getContentAreaClass(
    e.length,
    n,
    t
  );
  return /* @__PURE__ */ I(tn, { children: [
    l && /* @__PURE__ */ h("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ I("p", { children: [
      "⚠️ ",
      l
    ] }) }),
    c && /* @__PURE__ */ h(Th, { appName: r, description: i }),
    /* @__PURE__ */ I("div", { className: d, children: [
      t && e.length === 0 ? /* @__PURE__ */ h("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ h(_h, { fullHeight: !0 }) }) : /* @__PURE__ */ h(Ga, { ref: o }),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ h(Sh, { ref: s }) }),
      u && /* @__PURE__ */ h(Eh, {})
    ] })
  ] });
};
function xh({
  // Authentication and server configuration
  userMpAuthToken: e,
  chatServerUrl: t,
  chatServerKey: n,
  // Entity and conversation configuration
  threadId: r,
  userId: i,
  entityId: a,
  entityType: o,
  // Existing props
  config: s,
  tools: l,
  devMode: c = !1,
  contextHelpers: u
}) {
  var on, Rt;
  pt.validation.validateAuthProps({
    userMpAuthToken: e,
    chatServerUrl: t,
    chatServerKey: n,
    userId: i
  });
  const d = De(() => pt.url.convertWebSocketToHttp(t), [t]), m = De(
    () => new ss({
      apiUrl: d,
      userMpAuthToken: e,
      chatServerKey: n
    }),
    [d, e, n]
  ), p = De(() => l && l.length > 0 ? l.map(({ execute: A, ...lt }) => lt) : [], [l]), w = Vo(), S = ie((A) => A.isModalOpen), R = ie((A) => A.isCollapsed), y = ie((A) => A.currentMode), L = ie((A) => A.openModal), T = ie((A) => A.closeModal), D = ie((A) => A.toggleCollapse), O = ie((A) => A.toggleFullscreen), _ = ie((A) => A.setCurrentMode), B = ie((A) => A.chatStatus), q = ie((A) => A.setChatStatus), M = ie((A) => A.streamingStatus), G = ie((A) => A.setStreamingStatus), v = ie((A) => A.isLoadingConversation), N = ie((A) => A.setIsLoadingConversation), U = ie((A) => A.conversationError), V = ie((A) => A.setConversationError), W = ie((A) => A.setCurrentThreadId), Q = ie((A) => A.providerResId), ne = ie((A) => A.setProviderResId), de = ie((A) => A.isDevSettingsOpen), ve = ie((A) => A.setIsDevSettingsOpen);
  ke(() => {
    s.mode && y !== s.mode && _(s.mode);
  }, [s.mode, y, _]), ke(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const A = (lt) => {
      lt.key === "Escape" && y === "modal" && S && T();
    };
    if (y === "modal" && S)
      return document.addEventListener("keydown", A), () => document.removeEventListener("keydown", A);
  }, [y, S, T]);
  const {
    messages: g,
    setMessages: J,
    isStreaming: we,
    setIsStreaming: f,
    isThinking: Se,
    setIsThinking: ee,
    streamingContent: ae,
    isHandlingTool: We,
    currentAssistantMessageIdRef: fe,
    getReasoningStatus: je,
    getReasoningDuration: Fe,
    getReasoningContentOnly: it,
    getReasoningTitle: It,
    getToolingTitle: Je,
    getToolingStatus: mt,
    addMessage: Ue,
    handleSetMessage: Et,
    handleReasoningUpdate: _t,
    handleChatFinished: Qe,
    handleChatError: at,
    stopGeneration: ot
  } = w, Tt = Ge(null), st = Ge(null), Bt = re((A) => {
    var lt;
    switch (A.type) {
      case nt.CHAT_COMPLETED:
        Qe(), setTimeout(() => {
          var qe;
          (qe = st.current) == null || qe.focus();
        }, 0);
        break;
      case nt.CHAT_ERROR:
        (lt = A.data) != null && lt.error && at(A.data.error);
        break;
      case nt.CONNECTION_LOST:
      case nt.CONNECTION_RESTORED:
    }
  }, [Qe, at]), { chatClient: gt, isConnected: et, isConnecting: E, connectChatClient: b } = ho({
    // Authentication and server properties
    userMpAuthToken: e,
    chatServerUrl: t,
    chatServerKey: n,
    // Entity configuration
    userId: i,
    entityId: a,
    entityType: o,
    // Tools configuration
    tools: l,
    // Other properties
    contextHelpers: u,
    onSetMessage: Et,
    onSystemEvent: Bt,
    onReasoningUpdate: _t
  }), z = De(
    () => gt ? new ls(gt, {
      onError: s.onError
    }) : null,
    [gt, s.onError]
  );
  os({
    threadId: r,
    userId: i,
    httpApiUrl: d,
    userMpAuthToken: e,
    chatServerKey: n,
    messages: g,
    setMessages: J,
    setIsLoadingConversation: N,
    setConversationError: V,
    setCurrentThreadId: W,
    setProviderResId: ne
  });
  const Z = Ge(null), Y = re(() => {
    Z.current && cancelAnimationFrame(Z.current), Z.current = requestAnimationFrame(() => {
      var A;
      (A = Tt.current) == null || A.scrollIntoView({ behavior: "smooth" }), Z.current = null;
    });
  }, []);
  ke(() => {
    Y();
  }, [g, Y]), ke(() => {
    ae && Y();
  }, [ae, Y]), ke(() => {
    s.onStreamingStatusChange && s.onStreamingStatusChange(M);
  }, [M, s]), ke(() => () => {
    Z.current && cancelAnimationFrame(Z.current);
  }, []);
  const me = re(
    async (A, lt) => {
      if (z != null && z.canSubmit(A, we, et)) {
        f(!0), ee(!0), q(Xe.SUBMITTED), G(wn.STARTING);
        try {
          const qe = await z.submitMessage({
            message: A,
            media: lt,
            providerResId: Q || void 0
          });
          J((Gt) => [...Gt, qe]), q(Xe.STREAMING);
        } catch (qe) {
          ee(!1), q(Xe.ERROR);
          const Gt = z.createErrorMessage(qe);
          Ue("system", Gt), f(!1), q(Xe.IDLE), G(wn.IDLE);
        }
      }
    },
    [
      z,
      we,
      et,
      J,
      f,
      ee,
      q,
      G,
      Ue,
      Q
    ]
  ), ze = re(
    async (A) => await m.uploadFiles(A),
    [m]
  ), _e = De(
    () => pt.css.getContainerClasses(
      y,
      s.position,
      s.theme,
      R,
      s.constrainedHeight
    ),
    [y, s.position, s.theme, R, s.constrainedHeight]
  ), $e = re(() => {
    y === "modal" ? L() : D();
  }, [y, L, D]), ge = re(() => {
    ve(!0);
  }, [ve]), ue = re((A) => {
    st.current && st.current.setText(A.description);
  }, []), Ze = De(() => {
    var A;
    return {
      // Message state
      messages: g,
      isStreaming: we,
      isThinking: Se,
      isHandlingTool: We,
      // UI state
      isLoadingConversation: v,
      chatStatus: B,
      conversationError: U,
      // Configuration
      appName: s.appName,
      description: s.description,
      placeholder: s.placeholder,
      placeholderTexts: s.placeholderTexts,
      restaurantName: s.restaurantName,
      restaurantLogo: s.restaurantLogo,
      suggestedPrompts: s.suggestedPrompts,
      // Tools & features
      clientTools: p,
      fileUploadEnabled: (A = s.features) == null ? void 0 : A.fileUpload,
      // Reasoning helpers
      getReasoningTitle: It,
      getReasoningStatus: je,
      getReasoningDuration: Fe,
      getReasoningContentOnly: it,
      // Tooling helpers
      getToolingTitle: Je,
      getToolingStatus: mt,
      // Refs
      currentAssistantMessageIdRef: fe,
      messagesEndRef: Tt,
      chatInputRef: st,
      // Event handlers
      onSubmit: me,
      onFileUpload: ze,
      onStopGeneration: ot,
      onPromptSelect: ue
    };
  }, [
    g,
    we,
    Se,
    We,
    v,
    B,
    U,
    s.appName,
    s.description,
    s.placeholder,
    s.placeholderTexts,
    s.restaurantName,
    s.restaurantLogo,
    s.suggestedPrompts,
    (on = s.features) == null ? void 0 : on.fileUpload,
    p,
    It,
    je,
    Fe,
    it,
    Je,
    mt,
    fe,
    Tt,
    st,
    me,
    ze,
    ot,
    ue
  ]);
  return De(
    () => pt.state.shouldShowBubble(
      y,
      S,
      R
    ),
    [y, S, R]
  ) ? /* @__PURE__ */ h(Yr, { children: /* @__PURE__ */ h(
    ws,
    {
      mode: y,
      appName: s.appName,
      bubbleText: s.bubbleText,
      showBubbleText: ((Rt = s.features) == null ? void 0 : Rt.showBubbleText) !== !1,
      onClick: $e
    }
  ) }) : /* @__PURE__ */ h(Yr, { children: /* @__PURE__ */ h(
    hs,
    {
      onError: (A) => {
        console.error("WebSocket error in ChatWrapper:", A), s.onError && s.onError(A);
      },
      children: /* @__PURE__ */ I("div", { className: _e, style: s.customStyles, children: [
        /* @__PURE__ */ h(
          ds,
          {
            isConnected: et,
            isConnecting: E,
            onRetry: b
          }
        ),
        c && s.headerVisible === !1 && /* @__PURE__ */ h(
          "button",
          {
            className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
            onClick: ge,
            title: "Developer Settings",
            children: /* @__PURE__ */ h(Ji, { size: 16 })
          }
        ),
        pt.state.shouldShowHeader(s.headerVisible) && /* @__PURE__ */ h(
          Ss,
          {
            appName: s.appName,
            mode: y,
            isCollapsed: R,
            isModalOpen: S,
            devMode: c,
            onClose: T,
            onToggleFullscreen: O,
            onToggleCollapse: D,
            onOpenSettings: ge
          }
        ),
        !R && /* @__PURE__ */ h(
          ps,
          {
            onError: (A) => {
              console.error("File upload error:", A), s.onError && s.onError(A);
            },
            children: /* @__PURE__ */ h(uh, { value: Ze, children: /* @__PURE__ */ h(kh, {}) })
          }
        ),
        /* @__PURE__ */ h(
          to,
          {
            isOpen: de,
            onClose: () => ve(!1),
            apiUrl: d,
            userMpAuthToken: e,
            chatServerKey: n
          }
        )
      ] })
    }
  ) });
}
const Yh = Vi(xh);
var bh = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(bh || {});
export {
  wh as AnimatedPlaceholder,
  Xe as CHAT_STATUS,
  fs as ChatIcon,
  Yh as ChatWrapper,
  ms as CloseIcon,
  Cs as CollapseIcon,
  ds as ConnectionNotification,
  ys as CopyIcon,
  to as DevSettings,
  bh as EntityType,
  gs as FullscreenIcon,
  _h as InlineLoader,
  Fa as Loader,
  xe as PROCESSING_STATUS,
  fh as PromptInput,
  Ch as PromptInputButton,
  $h as PromptInputModelSelect,
  qh as PromptInputModelSelectContent,
  Kh as PromptInputModelSelectItem,
  Zh as PromptInputModelSelectTrigger,
  Xh as PromptInputModelSelectValue,
  yh as PromptInputSubmit,
  Va as PromptInputTextarea,
  mh as PromptInputToolbar,
  gh as PromptInputTools,
  oh as Reasoning,
  Ha as ReasoningContent,
  Pa as ReasoningTrigger,
  wn as STREAMING_STATUS,
  Ji as SettingsIcon,
  Eh as SuggestedPrompts,
  jh as createThread,
  Wh as fetchMessagesByConvUuid,
  Vh as fetchThreadByConvUuid,
  as as fetchThreadMessages,
  Gh as fetchUserThreads,
  Ah as isChatActive,
  Mh as isChatError,
  Nh as isChatIdle,
  Lh as isProcessingActive,
  Oh as isProcessingComplete,
  Dh as isProcessingError,
  Hh as useChatState,
  Fh as useConversationState,
  zh as useDevState,
  Ph as useLayoutState,
  Uh as useThreadState,
  Bh as useUIState,
  ie as useUIStore
};
