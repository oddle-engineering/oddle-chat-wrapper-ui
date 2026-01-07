var ho = Object.defineProperty;
var po = (e, t, n) => t in e ? ho(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var X = (e, t, n) => po(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as p, jsxs as I, Fragment as Ht } from "react/jsx-runtime";
import xt, { useState as Ie, useRef as ge, useEffect as _e, useMemo as Oe, useCallback as de, Component as Lr, createContext as fo, useContext as go, memo as oa, forwardRef as Vn, useImperativeHandle as sa } from "react";
const Te = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, ut = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, Ke = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, gr = (e) => e === Te.SUBMITTED || e === Te.STREAMING, nh = (e) => e === Te.IDLE, rh = (e) => e === Te.ERROR, ih = (e) => e === Ke.PROCESSING, ah = (e) => e === Ke.COMPLETED, oh = (e) => e === Ke.ERROR;
var mo = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(mo || {}), He = /* @__PURE__ */ ((e) => (e.DISCONNECTED = "disconnected", e.CONNECTING = "connecting", e.CONNECTED = "connected", e.RECONNECTING = "reconnecting", e))(He || {});
const Co = {
  maxReconnectAttempts: 1 / 0,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, vn = {
  NORMAL: 1e3,
  // Normal closure
  GOING_AWAY: 1001
};
var ht = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(ht || {}), St = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e.STOP_RUN = "stop_run", e))(St || {}), et = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.THREAD_CREATED = "thread_created", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(et || {}), On = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(On || {}), Ft = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(Ft || {});
class Xt {
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
    return this.createConnectionEvent(ht.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(ht.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(ht.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(ht.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(ht.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(ht.CHAT_ERROR, { error: t, errorCode: n });
  }
}
class Lt {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(t) {
    return {
      type: St.CHAT_MESSAGE,
      content: t.content,
      media: t.media || [],
      providerResId: t.providerResId
    };
  }
  /**
   * Create a configure tools message
   */
  static createConfigureToolsMessage(t, n) {
    return {
      type: St.CONFIGURE_TOOLS,
      toolSchemas: t,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(t) {
    return {
      type: St.UPDATE_TOOLS,
      toolSchemas: t
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(t) {
    return {
      type: St.UPDATE_CONTEXT_HELPERS,
      contextHelpers: t
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(t, n) {
    return {
      type: St.TOOL_CALL_RESPONSE,
      callId: t,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(t, n) {
    return {
      type: St.TOOL_CALL_RESPONSE,
      callId: t,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: St.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(t, n) {
    return {
      type: St.HEARTBEAT_PONG,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      originalTimestamp: t,
      pingTime: n
    };
  }
  /**
   * Create a stop run message
   */
  static createStopRunMessage(t) {
    return {
      type: St.STOP_RUN,
      conversationUuid: t
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
  static serializeStopRun(t) {
    return this.createAndSerialize(
      () => this.createStopRunMessage(t)
    );
  }
}
class yo {
  constructor(t, n) {
    X(this, "ws", null);
    X(this, "config");
    X(this, "connectionState");
    X(this, "reconnectTimer", null);
    X(this, "heartbeatInterval", null);
    X(this, "visibilityChangeHandler");
    X(this, "currentTicket", null);
    X(this, "intentionalDisconnect", !1);
    // Track intentional disconnects
    X(this, "justRefreshedTicket", !1);
    // Track if ticket was just refreshed to skip duplicate validation
    X(this, "onOpen");
    X(this, "onMessage");
    X(this, "onError");
    X(this, "onClose");
    X(this, "onSystemEvent");
    X(this, "onTicketRefresh");
    X(this, "onTicketValidate");
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
    if ((i = this.onError) == null || i.call(this, t), this.connectionState.setConnected(!1), r) {
      r(t);
      return;
    }
    this.intentionalDisconnect || this.scheduleReconnectAfterError();
  }
  handleConnectionClosed(t) {
    var n;
    console.log("[WebSocketManager] Connection closed", {
      code: t.code,
      reason: t.reason,
      intentionalDisconnect: this.intentionalDisconnect
    }), this.processConnectionClosure(t), (n = this.onClose) == null || n.call(this, t), this.shouldReconnectAfterClose(t.code) ? (console.log(
      "[WebSocketManager] Should reconnect, calling attemptReconnect"
    ), this.attemptReconnect()) : console.log("[WebSocketManager] Should NOT reconnect");
  }
  updateConnectionState(t, n) {
    this.connectionState.setConnected(t), this.connectionState.setReconnecting(n), this.connectionState.resetReconnectAttempts(), this.connectionState.updateReconnectDelay(this.config.reconnectDelay);
  }
  processConnectionClosure(t) {
    this.connectionState.setConnected(!1), this.stopHeartbeat();
  }
  shouldReconnectAfterClose(t) {
    if (console.log("[WebSocketManager] shouldReconnectAfterClose check", {
      closeCode: t,
      intentionalDisconnect: this.intentionalDisconnect,
      NORMAL: vn.NORMAL,
      GOING_AWAY: vn.GOING_AWAY
    }), this.intentionalDisconnect)
      return console.log("[WebSocketManager] Intentional disconnect - no reconnect"), !1;
    const { NORMAL: n } = vn, r = t !== n;
    return console.log("[WebSocketManager] Should reconnect?", r), r;
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
    var o, s;
    if (console.log("[WebSocketManager] attemptReconnect called", {
      reconnectAttempts: this.connectionState.reconnectAttempts,
      maxReconnectAttempts: this.config.maxReconnectAttempts,
      isReconnecting: this.connectionState.isReconnecting,
      reconnectTimer: this.reconnectTimer
    }), this.connectionState.reconnectAttempts >= this.config.maxReconnectAttempts) {
      console.log("[WebSocketManager] Max reconnection attempts reached"), (o = this.onSystemEvent) == null || o.call(
        this,
        Xt.connectionLost("Max reconnection attempts reached")
      ), this.connectionState.setReconnecting(!1);
      return;
    }
    if (this.reconnectTimer !== null) {
      console.log(
        "[WebSocketManager] Reconnection already in progress, skipping"
      );
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    console.log("[WebSocketManager] Firing RECONNECTING event", {
      attempt: t,
      maxAttempts: n
    }), (s = this.onSystemEvent) == null || s.call(this, Xt.reconnecting(t, n));
    const r = this.config.reconnectDelay, i = Math.random() * 90 + 10, a = r + i;
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null, this.connectionState.isConnected || this.reconnect();
    }, a);
  }
  async reconnect() {
    try {
      console.log("[WebSocketManager] ====== RECONNECT ATTEMPT START ======", {
        hasCurrentTicket: !!this.currentTicket,
        justRefreshedTicket: this.justRefreshedTicket,
        reconnectAttempt: this.connectionState.reconnectAttempts
      }), this.closeConnection();
      let t = !0;
      if (this.justRefreshedTicket)
        console.log(
          "[WebSocketManager] Skipping validation - ticket was just refreshed in previous attempt"
        ), t = !1, this.justRefreshedTicket = !1;
      else if (this.onTicketValidate && this.currentTicket) {
        console.log(
          "[WebSocketManager] Validating current ticket before reconnection..."
        );
        try {
          await this.onTicketValidate() ? (console.log(
            "[WebSocketManager] Current ticket is still valid, proceeding with reconnection"
          ), t = !1) : console.log(
            "[WebSocketManager] Current ticket is invalid according to server, need to get fresh ticket"
          );
        } catch (r) {
          console.error("[WebSocketManager] Failed to validate ticket with server API:", r), console.log("[WebSocketManager] Validation API failed - server might be down, will retry with fresh ticket");
        }
      } else this.currentTicket || console.log(
        "[WebSocketManager] No current ticket, need to get fresh ticket"
      );
      if (t && this.onTicketRefresh) {
        console.log(
          "[WebSocketManager] Requesting fresh ticket for reconnection..."
        );
        try {
          const r = await this.onTicketRefresh();
          this.currentTicket = r, this.justRefreshedTicket = !0, console.log(
            "[WebSocketManager] Fresh ticket obtained for reconnection"
          );
        } catch (r) {
          throw console.error(
            "[WebSocketManager] Failed to get fresh ticket:",
            r
          ), r;
        }
      } else if (t && !this.onTicketRefresh)
        throw console.warn(
          "[WebSocketManager] Need fresh ticket but no ticket refresh callback available"
        ), new Error(
          "Cannot refresh expired ticket - no refresh callback available"
        );
      console.log("[WebSocketManager] Creating WebSocket connection...");
      const n = this.buildWebSocketUrl();
      this.ws = new WebSocket(n), this.setupReconnectHandlers(), console.log("[WebSocketManager] ====== RECONNECT ATTEMPT END (connection initiated) ======");
    } catch (t) {
      console.log("[WebSocketManager] ====== RECONNECT ATTEMPT FAILED ======", t), this.scheduleReconnectAfterError();
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
    this.updateConnectionState(!0, !1), this.justRefreshedTicket = !1, this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Xt.connectionRestored()), (n = this.onOpen) == null || n.call(this);
  }
  handleReconnectionError() {
    this.scheduleReconnectAfterError();
  }
  scheduleReconnectAfterError() {
    const t = this.config.reconnectDelay, n = Math.random() * 90 + 10, r = t + n;
    this.reconnectTimer !== null && (window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null), setTimeout(() => this.attemptReconnect(), r);
  }
  handleReconnectionClosed(t) {
    this.processConnectionClosure(t), this.shouldReconnectAfterClose(t.code) ? this.attemptReconnect() : this.connectionState.setReconnecting(!1);
  }
  startHeartbeat() {
  }
  sendHeartbeat() {
    const t = Lt.serializeHeartbeatPing();
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
    this.ws && this.ws.close(vn.NORMAL);
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
    this.onOpen = t.onOpen, this.onMessage = t.onMessage, this.onError = t.onError, this.onClose = t.onClose, this.onSystemEvent = t.onSystemEvent, this.onTicketRefresh = t.onTicketRefresh, this.onTicketValidate = t.onTicketValidate;
  }
}
class wo {
  constructor() {
    X(this, "state");
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
class Hn {
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
class la {
  constructor(t = {}) {
    X(this, "handlers", {});
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
const te = {
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
}, Be = {
  isThinkingMessage: (e) => e.startsWith(te.THINKING_PREFIX) || e.startsWith(te.REASONING_PREFIX) || e.startsWith(te.THOUGHT_PREFIX),
  isCompletedMessage: (e) => e.includes(te.COMPLETED_MARKER),
  isErrorMessage: (e) => e.includes(te.ERROR_MARKER),
  isHandlingMessage: (e) => e.includes(te.HANDLING_MARKER),
  extractDuration: (e) => {
    const t = e.match(te.PATTERNS.DURATION);
    return t ? ` for ${t[1]} seconds` : void 0;
  },
  cleanReasoningContent: (e) => {
    let t = e.replace(new RegExp(`^${te.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${te.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${te.THOUGHT_PREFIX}\\s*`), "");
    return t = t.replace(/\s*for [\d.]+\s*seconds$/, ""), t = t.replace(te.PATTERNS.THOUGHT_CONTENT, ""), t.trim();
  },
  getMessageType: (e, t) => t === !1 ? Be.isErrorMessage(e) ? te.MESSAGE_TYPES.ERROR : (Be.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || Be.isThinkingMessage(e), te.MESSAGE_TYPES.THOUGHT) : Be.isCompletedMessage(e) ? te.MESSAGE_TYPES.COMPLETED : Be.isErrorMessage(e) ? te.MESSAGE_TYPES.ERROR : (Be.isHandlingMessage(e) || Be.isThinkingMessage(e) && !e.includes(te.UI_TEXT.AI_IS_THINKING), te.MESSAGE_TYPES.THINKING)
};
class ko extends la {
  constructor(n) {
    super({ onReasoningUpdate: n });
    X(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    X(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, o) {
    const s = this.getHandler("onReasoningUpdate");
    if (!s) return;
    const c = Hn.createReasoningCall(
      i,
      a,
      o || {}
    );
    s(n, r, c);
  }
  handleReasoningStart(n) {
    const r = n.id || "reasoning";
    this.reasoningStartTimes.set(r, Date.now()), this.reasoningContent.set(r, "");
  }
  handleReasoningDelta(n) {
    if (!n.text) return;
    const r = n.id || "reasoning", a = (this.reasoningContent.get(r) || "") + n.text;
    this.reasoningContent.set(r, a);
    const o = `${te.THINKING_PREFIX} ${a}`;
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
    const s = i || te.UI_TEXT.THOUGHT, c = `${te.THOUGHT_PREFIX} ${s}${o}`;
    this.triggerReasoningUpdate(
      !1,
      c,
      r,
      "end",
      { duration: o, fullContent: i }
    ), this.reasoningContent.delete(r);
  }
  setReasoningUpdateHandler(n) {
    this.updateEventHandlers({ onReasoningUpdate: n });
  }
}
class So extends la {
  constructor(n = {}, r) {
    super({ onReasoningUpdate: r });
    X(this, "processedToolCalls", /* @__PURE__ */ new Set());
    X(this, "clientTools", {});
    X(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var o, s, c;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (o = this.getHandler("onReasoningUpdate")) == null || o(!0, `${te.HANDLING_MARKER} ${i}`, n);
      try {
        const u = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, u), (s = this.getHandler("onReasoningUpdate")) == null || s(!1, `${te.COMPLETED_MARKER} ${i}`, n);
      } catch (u) {
        this.sendToolError(r, u), (c = this.getHandler("onReasoningUpdate")) == null || c(!1, `${te.ERROR_MARKER} Error: ${i} - ${u}`, n);
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
    const i = Lt.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = Lt.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = Hn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId,
        n.args || {}
      );
      r(!0, `${te.HANDLING_MARKER} ${n.toolName}`, a);
    }
  }
  handleServerToolResult(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = Hn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId
      );
      r(
        !1,
        `${te.COMPLETED_MARKER} ${n.toolName}`,
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
class To {
  constructor(t, n = {}) {
    X(this, "reasoningHandler");
    X(this, "toolHandler");
    X(this, "handlers");
    X(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new ko(t.onReasoningUpdate), this.toolHandler = new So(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case et.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case et.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case et.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case et.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case et.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case et.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case et.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case et.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case et.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case et.HEARTBEAT_ACK:
          break;
        case et.ERROR:
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
      case On.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case On.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case On.CONTENT_DELTA:
        (n = t.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, t.data.delta));
        break;
    }
  }
  handleProviderEvent(t) {
    var r, i, a;
    switch ((r = t.data) == null ? void 0 : r.type) {
      case Ft.TEXT_DELTA:
        t.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, t.data.textDelta));
        break;
      case Ft.REASONING_START:
        this.reasoningHandler.handleReasoningStart(t.data);
        break;
      case Ft.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(t.data);
        break;
      case Ft.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(t.data);
        break;
      case Ft.TOOL_CALL:
        this.toolHandler.handleServerToolCall(t.data);
        break;
      case Ft.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(t.data);
        break;
    }
  }
  handleLatitudeEvent(t) {
    var n;
    if (((n = t.data) == null ? void 0 : n.type) === Ft.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = t.data;
      if (r.toolCallId && r.toolName) {
        const i = Hn.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${te.COMPLETED_MARKER} ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Xt.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      Xt.chatError(t.error || "Unknown error")
    );
  }
  handleToolCallRequest(t) {
    this.toolHandler.handleToolCallRequest(t);
  }
  handleHeartbeatPing(t) {
    if (!this.sendMessage)
      return;
    const n = Lt.serializeHeartbeatPong(
      t.timestamp,
      t.pingTime
    );
    this.sendMessage(n);
  }
  handleError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      Xt.chatError(t.error || "Unknown WebSocket error")
    );
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
async function Eo(e, t, n = 1e4) {
  const r = {
    "Content-Type": "application/json"
  };
  t != null && t.userMpAuthToken && (r["x-oddle-mp-auth-token"] = t.userMpAuthToken), t != null && t.chatServerKey && (r["x-oddle-chat-server-key"] = t.chatServerKey);
  try {
    const i = new AbortController(), a = setTimeout(() => i.abort(), n);
    try {
      const o = await fetch(`${e}/api/v1/tickets`, {
        method: "POST",
        headers: r,
        signal: i.signal,
        body: JSON.stringify({
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
      if (clearTimeout(a), !o.ok) {
        const c = await o.json().catch(() => ({}));
        throw new Error(
          c.error || `Failed to get WebSocket ticket: ${o.statusText}`
        );
      }
      const s = await o.json();
      if (!s.success || !s.ticket)
        throw new Error(s.error || "Invalid ticket response from server");
      return s;
    } catch (o) {
      throw clearTimeout(a), o instanceof Error && o.name === "AbortError" ? new Error(`Ticket request timed out after ${n}ms`) : o;
    }
  } catch (i) {
    throw console.error("Error requesting WebSocket ticket:", i), i;
  }
}
function mr(e) {
  if (!e.success || !e.ticket || !e.expiresAt)
    return !1;
  const t = new Date(e.expiresAt).getTime();
  return Date.now() < t - 3e4;
}
function ti(e) {
  const t = mr(e), n = new Date(e.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: t,
    expiresIn: i,
    expired: r >= n
  };
}
async function xo(e, t, n, r) {
  try {
    const i = {
      "Content-Type": "application/json",
      "x-oddle-mp-auth-token": n.userMpAuthToken,
      "x-oddle-chat-server-key": n.chatServerKey
    }, a = {
      ticket: t,
      ...r
    };
    console.log("[TicketAPI] Validating ticket with server:", {
      url: `${e}/api/v1/tickets/validate`,
      ticket: t.substring(0, 8) + "...",
      context: r
    });
    const o = await fetch(`${e}/api/v1/tickets/validate`, {
      method: "POST",
      headers: i,
      body: JSON.stringify(a)
    });
    if (!o.ok)
      throw new Error(`Ticket validation failed: ${o.status} ${o.statusText}`);
    const s = await o.json();
    return console.log("[TicketAPI] Server validation result:", {
      valid: s.valid,
      error: s.error,
      details: s.details
    }), s.valid || (s.retryable = !1), s;
  } catch (i) {
    console.error("[TicketAPI] Ticket validation error:", i);
    let a = "VALIDATION_ERROR", o = "Validation request failed";
    return i instanceof Error && (o = i.message, i.message.includes("fetch") ? (a = "NETWORK_ERROR", o = "Network error during ticket validation - server may be temporarily unavailable") : i.message.includes("500") || i.message.includes("502") || i.message.includes("503") ? (a = "SERVER_ERROR", o = "Server error during ticket validation - validation service may be temporarily down") : i.message.includes("timeout") && (a = "TIMEOUT_ERROR", o = "Timeout during ticket validation - validation service may be slow or overloaded")), console.log(`[TicketAPI] Validation failed with error type: ${a}`), {
      valid: !1,
      error: o,
      code: a,
      retryable: !0,
      // API failure = temporary issue, should retry
      details: {
        reason: "Validation API request failed - will retry with fresh ticket",
        retryable: !0
        // Indicate this error is retryable
      }
    };
  }
}
function bo(e) {
  var r, i, a;
  const t = ((r = e == null ? void 0 : e.message) == null ? void 0 : r.toLowerCase()) || "", n = ((i = e == null ? void 0 : e.name) == null ? void 0 : i.toLowerCase()) || "";
  if (t.includes("connection refused") || t.includes("econnrefused") || t.includes("err_connection_refused") || t.includes("network request failed") || t.includes("failed to connect"))
    return {
      isRetryable: !0,
      reason: "Server unreachable or connection refused",
      errorType: "network"
    };
  if (n === "typeerror" && t.includes("failed to fetch"))
    return t.includes("cors") || t.includes("cross-origin") || t.includes("blocked by cors") ? {
      isRetryable: !1,
      reason: "CORS policy blocking request",
      errorType: "cors"
    } : {
      isRetryable: !0,
      reason: "Network error - server may be unreachable",
      errorType: "network"
    };
  if (t.includes("cors") || t.includes("cross-origin") || t.includes("blocked by cors"))
    return {
      isRetryable: !1,
      reason: "CORS error detected",
      errorType: "cors"
    };
  if (t.includes("unauthorized") || t.includes("forbidden") || t.includes("authentication") || t.includes("invalid token") || t.includes("expired token") || t.includes("expired authentication") || t.includes("access denied") || t.includes("ticket expired") || t.includes("invalid ticket") || t.includes("ticket revoked") || t.includes("ticket not found") || t.includes("user not found") || t.includes("entity not found") || t.includes("permission denied") || t.includes("invalid credentials"))
    return {
      isRetryable: !1,
      reason: "Authentication/authorization error",
      errorType: "auth"
    };
  if (e != null && e.status || e != null && e.response && typeof e.response == "object") {
    const o = e.status || ((a = e.response) == null ? void 0 : a.status);
    if (o === 401 || o === 403)
      return {
        isRetryable: !1,
        reason: `HTTP ${o} - authentication/permission denied`,
        errorType: "auth"
      };
    if (o === 404)
      return {
        isRetryable: !1,
        reason: "HTTP 404 - endpoint not found",
        errorType: "permission"
      };
    if (o >= 400 && o < 500)
      return {
        isRetryable: !1,
        reason: `HTTP ${o} - client error`,
        errorType: "permission"
      };
    if (o >= 500)
      return {
        isRetryable: !0,
        reason: `HTTP ${o} - server error (temporary)`,
        errorType: "server"
      };
  }
  return t.includes("network") || t.includes("timeout") || t.includes("connection") || t.includes("offline") || n === "networkerror" ? {
    isRetryable: !0,
    reason: "Network connectivity issue",
    errorType: "network"
  } : t.includes("websocket") || t.includes("ws") || n === "websocketerror" ? {
    isRetryable: !0,
    reason: "WebSocket connection issue",
    errorType: "network"
  } : {
    isRetryable: !1,
    reason: "Unknown error type",
    errorType: "unknown"
  };
}
function Qt(e, t) {
  const n = bo(e);
  return console.error(`[${t}] Error occurred:`, {
    error: (e == null ? void 0 : e.message) || e,
    classification: n,
    shouldRetry: n.isRetryable
  }), n;
}
class _o {
  constructor(t, n, r = {}) {
    X(this, "ticket", null);
    X(this, "refreshPromise", null);
    X(this, "validationInterval", null);
    X(this, "authData");
    X(this, "apiUrl");
    X(this, "config");
    this.authData = t, this.apiUrl = this.convertToHttpUrl(n), this.config = {
      checkInterval: r.checkInterval ?? 6e4,
      renewalThreshold: r.renewalThreshold ?? 300,
      maxRetries: r.maxRetries ?? 3,
      retryBaseDelay: r.retryBaseDelay ?? 1e3,
      requestTimeout: r.requestTimeout ?? 3e4,
      // 30s for slow connections
      onError: r.onError
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
    return this.ticket && mr(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
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
   * Includes automatic retry logic for transient failures
   * @private
   */
  async _doRefresh() {
    const t = this.config.maxRetries, n = this.config.retryBaseDelay;
    for (let r = 1; r <= t; r++) {
      console.log(
        `TicketManager: Requesting new ticket (attempt ${r}/${t})...`,
        {
          apiUrl: this.apiUrl
        }
      );
      try {
        return this.ticket = await Eo(
          this.apiUrl,
          this.authData,
          this.config.requestTimeout
        ), console.log("TicketManager: Ticket received successfully", {
          hasTicket: !!this.ticket.ticket,
          expiresAt: this.ticket.expiresAt
        }), this.ticket.ticket;
      } catch (i) {
        console.log("[TicketManager] Caught error during ticket request:", {
          error: i instanceof Error ? i.message : i,
          attempt: r,
          maxRetries: t,
          hasOnErrorCallback: !!this.config.onError
        });
        const a = Qt(i, "TicketManager");
        if (!a.isRetryable) {
          const s = `Ticket refresh failed (non-retryable - ${a.reason}): ${i instanceof Error ? i.message : "Unknown error"}`, c = new Error(s);
          throw this.config.onError ? (this.config.onError(c, {
            reason: a.reason,
            errorType: a.errorType
          }), c) : (console.warn(
            "[TicketManager] No onError callback configured, throwing error"
          ), c);
        }
        if (r === t)
          throw new Error(
            `Ticket refresh failed after ${t} attempts (${a.reason}): ${i instanceof Error ? i.message : "Unknown error"}`
          );
        const o = n * Math.pow(2, r - 1);
        console.log(
          `TicketManager: Ticket request failed (${a.reason}), retrying in ${o}ms...`
        ), await new Promise((s) => setTimeout(s, o));
      }
    }
    throw new Error("Ticket refresh failed unexpectedly");
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
      const r = ti(this.ticket).expiresIn / 1e3;
      r < this.config.renewalThreshold && (console.log(
        `TicketManager: Ticket expires in ${r.toFixed(
          0
        )}s, renewing...`
      ), await this.refreshTicket(), console.log("TicketManager: Ticket renewed proactively"), t == null || t());
    } catch (n) {
      const r = Qt(
        n,
        "TicketManager:ProactiveRenewal"
      );
      if (!r.isRetryable && (console.warn(
        `TicketManager: Stopping proactive renewal due to non-retryable error: ${r.reason}`
      ), this.stopProactiveRenewal(), this.config.onError)) {
        const i = new Error(
          `Proactive ticket renewal failed (non-retryable - ${r.reason}): ${n instanceof Error ? n.message : "Unknown error"}`
        );
        this.config.onError(i, {
          reason: r.reason,
          errorType: r.errorType
        });
      }
    }
  }
  /**
   * Stop proactive renewal
   */
  stopProactiveRenewal() {
    this.validationInterval && (clearInterval(this.validationInterval), this.validationInterval = null, console.log("TicketManager: Stopped proactive renewal"));
  }
  /**
   * Check if current ticket is valid (local expiration check)
   */
  isValid() {
    return this.ticket ? mr(this.ticket) : !1;
  }
  /**
   * Validate current ticket with server API
   * This provides authoritative server-side validation
   */
  async validateWithServer() {
    if (!this.ticket)
      return {
        valid: !1,
        error: "No ticket available to validate",
        code: "NO_TICKET"
      };
    try {
      console.log("[TicketManager] Validating ticket with server API...");
      const t = await xo(
        this.apiUrl,
        this.ticket.ticket,
        {
          userMpAuthToken: this.authData.userMpAuthToken,
          chatServerKey: this.authData.chatServerKey
        },
        {
          entityId: this.authData.entityId,
          entityType: this.authData.entityType
        }
      );
      return console.log("[TicketManager] Server validation result:", {
        valid: t.valid,
        error: t.error,
        code: t.code,
        retryable: t.retryable
      }), t.valid || (t.retryable ? console.log(
        "[TicketManager] Validation API failed (connectivity issue) - will get fresh ticket and retry"
      ) : (console.log(
        "[TicketManager] Ticket is definitively invalid - clearing and will get fresh ticket"
      ), this.ticket = null)), t;
    } catch (t) {
      return console.error(
        "[TicketManager] Server validation failed unexpectedly:",
        t
      ), {
        valid: !1,
        error: t instanceof Error ? t.message : "Server validation failed unexpectedly",
        code: "VALIDATION_ERROR",
        details: {
          reason: "Unexpected error during validation - will retry with fresh ticket",
          retryable: !0
        }
      };
    }
  }
  /**
   * Get time until ticket expires (in milliseconds)
   */
  getExpiresIn() {
    if (this.ticket)
      try {
        return ti(this.ticket).expiresIn;
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
async function vo(e, t, n) {
  const r = new URLSearchParams();
  r.append("format", "client"), t.entityId && r.append("entityId", t.entityId), t.entityType && r.append("entityType", t.entityType), console.log("Metadata to append:", t.metadata), t.metadata && Object.keys(t.metadata).length > 0 && r.append("metadata", JSON.stringify(t.metadata));
  const i = `${e}/api/v1/messages/query?${r.toString()}`, a = {
    "Content-Type": "application/json"
  };
  n != null && n.userMpAuthToken && (a["x-oddle-mp-auth-token"] = n.userMpAuthToken), n != null && n.chatServerKey && (a["x-oddle-chat-server-key"] = n.chatServerKey), console.log("Fetching thread messages from:", i);
  const o = await fetch(i, {
    method: "GET",
    headers: a
  });
  if (!o.ok)
    throw new Error(`Failed to fetch thread messages: ${o.statusText}`);
  const s = await o.json();
  return {
    messages: s.messages || [],
    providerResId: s.providerResId,
    threadId: s.threadId
  };
}
async function Ro(e, t, n, r) {
  const i = `${e}/api/v1/threads/${t}`, a = {
    "Content-Type": "application/json"
  };
  r != null && r.userMpAuthToken && (a["x-oddle-mp-auth-token"] = r.userMpAuthToken), r != null && r.chatServerKey && (a["x-oddle-chat-server-key"] = r.chatServerKey);
  const o = await fetch(i, {
    method: "PATCH",
    headers: a,
    body: JSON.stringify(n)
  });
  if (!o.ok) {
    const c = await o.json().catch(() => ({
      error: "Failed to update thread"
    }));
    throw new Error(c.error || "Failed to update thread");
  }
  const s = await o.json();
  if (!s.success)
    throw new Error(s.error || "Failed to update thread");
  return s.data;
}
async function Io(e, t, n, r) {
  const i = `${e}/api/v1/threads/${t}`, a = {
    "Content-Type": "application/json"
  };
  r != null && r.userMpAuthToken && (a["x-oddle-mp-auth-token"] = r.userMpAuthToken), r != null && r.chatServerKey && (a["x-oddle-chat-server-key"] = r.chatServerKey);
  const o = await fetch(i, {
    method: "PATCH",
    headers: a,
    body: JSON.stringify(n)
  });
  if (!o.ok) {
    const c = await o.json().catch(() => ({
      error: "Failed to update thread metadata"
    }));
    throw new Error(c.error || "Failed to update thread metadata");
  }
  const s = await o.json();
  if (!s.success)
    throw new Error(s.error || "Failed to update thread metadata");
  return s.data;
}
class Mo {
  constructor() {
    X(this, "config");
    X(this, "connectionState");
    X(this, "wsManager");
    X(this, "messageHandler");
    X(this, "initResolve");
    X(this, "initReject");
    // Client tools and context
    X(this, "toolSchemas", []);
    X(this, "contextHelpers", {});
    // Ticket management - now centralized in TicketManager
    X(this, "ticketManager", null);
    // Authentication credentials for HTTP API calls
    X(this, "authCredentials", {});
    this.config = {
      ...Co
    }, this.connectionState = new wo(), this.wsManager = new yo(this.config, this.connectionState), this.messageHandler = new To({}), this.setupWebSocketHandlers();
  }
  setupWebSocketHandlers() {
    this.wsManager.setEventHandlers({
      onMessage: (t) => this.handleWebSocketMessage(t),
      onOpen: () => this.handleConnectionOpen(),
      onSystemEvent: (t) => {
        var r, i;
        (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onSystemEvent) == null || i.call(r, t);
      },
      onTicketRefresh: async () => {
        if (!this.ticketManager)
          throw new Error("TicketManager not available for ticket refresh");
        return await this.ticketManager.getValidTicket();
      },
      onTicketValidate: async () => {
        if (!this.ticketManager)
          return !1;
        try {
          return (await this.ticketManager.validateWithServer()).valid;
        } catch {
          return !1;
        }
      }
    }), this.messageHandler.setSendMessageHandler(
      (t) => this.wsManager.send(t)
    );
  }
  handleWebSocketMessage(t) {
    var r, i, a, o;
    const n = this.messageHandler.handleMessage(t);
    if ((n == null ? void 0 : n.type) === "authentication_error" && this.handleAuthenticationFailure(n), (n == null ? void 0 : n.type) === et.THREAD_CREATED) {
      (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onThreadCreated) == null || i.call(r, n.data);
      return;
    }
    if ((n == null ? void 0 : n.type) === et.TOOLS_CONFIGURED) {
      (a = this.initResolve) == null || a.call(this);
      return;
    }
    (n == null ? void 0 : n.type) === et.SESSION_ESTABLISHED && (this.toolSchemas && this.toolSchemas.length > 0 ? this.sendToolConfiguration() : (o = this.initResolve) == null || o.call(this));
  }
  handleConnectionOpen() {
  }
  handleAuthenticationFailure(t) {
    var r;
    const n = t;
    (n == null ? void 0 : n.code) === "TICKET_INVALID" || (n == null ? void 0 : n.code) === "TICKET_EXPIRED" ? this.refreshTicketAndReconnect().catch((i) => {
      var o;
      Qt(i, "TicketRefresh").isRetryable, (o = this.initReject) == null || o.call(this, i);
    }) : (r = this.initReject) == null || r.call(
      this,
      new Error(`Authentication failed: ${n == null ? void 0 : n.error}`)
    );
  }
  sendToolConfiguration() {
    const t = Lt.serializeConfigureTools(
      this.toolSchemas,
      this.contextHelpers
    );
    this.wsManager.send(t);
  }
  async onInit(t) {
    return this.setupEventHandlers(t), this.setupToolsAndContext(t), this.updateConfig(t), this.authCredentials = {
      userMpAuthToken: t.userMpAuthToken,
      chatServerKey: t.chatServerKey
    }, this.ticketManager = new _o(
      {
        userMpAuthToken: t.userMpAuthToken,
        chatServerKey: t.chatServerKey,
        entityId: t.entityId,
        entityType: t.entityType
      },
      this.config.apiUrl,
      {
        onError: t.onError
      }
    ), new Promise(async (n, r) => {
      this.initResolve = n, this.initReject = r;
      try {
        const i = await this.ticketManager.getValidTicket();
        await this.wsManager.connect(i);
      } catch (i) {
        r(i);
      }
    });
  }
  setupEventHandlers(t) {
    const n = {
      onSetMessage: t.onSetMessage,
      onSystemEvent: t.onSystemEvent,
      onReasoningUpdate: t.onReasoningUpdate,
      onThreadCreated: t.onThreadCreated
    };
    this.messageHandler.updateEventHandlers(n);
  }
  setupToolsAndContext(t) {
    this.toolSchemas = t.toolSchemas || [], this.contextHelpers = t.contextHelpers, t.clientTools && this.messageHandler.updateClientTools(t.clientTools);
  }
  updateConfig(t) {
    t.chatServerUrl && (this.config.apiUrl = t.chatServerUrl);
  }
  async onTriggerMessage(t) {
    const n = this.wsManager.getWebSocketState();
    if (!this.connectionState.isConnected || n !== "OPEN") {
      const s = "Connection lost. Please check your internet connection and try again.";
      throw new Error(s);
    }
    const { message: i, media: a, providerResId: o } = t;
    try {
      this.messageHandler.clearProcessedToolCalls();
      const s = Lt.serializeChatMessage({
        content: i,
        media: a,
        providerResId: o
      });
      this.wsManager.send(s);
    } catch (s) {
      throw this.wsManager.getWebSocketState() !== "OPEN" ? new Error("Connection lost during message send. Please try again.") : s;
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
    const n = Lt.serializeUpdateContextHelpers(
      this.contextHelpers
    );
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = Lt.serializeUpdateTools(this.toolSchemas);
    this.wsManager.send(r);
  }
  /**
   * Update client-side tool executors without modifying schemas or reconnecting
   * This ensures fresh closures when useCallback dependencies change
   */
  updateClientTools(t) {
    this.messageHandler.updateClientTools(t);
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
    try {
      if (!this.ticketManager)
        throw new Error("TicketManager not initialized");
      this.wsManager.disconnect();
      const t = await this.ticketManager.refreshTicket();
      this.wsManager.updateTicket(t), await this.wsManager.connect();
    } catch (t) {
      throw t;
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
    await this.refreshTicketAndReconnect();
  }
  /**
   * Stop the current conversation run
   * Sends a stop_run message to the server to halt the current response generation
   */
  stopRun(t) {
    if (!this.connectionState.isConnected)
      return;
    const n = Lt.serializeStopRun(t);
    this.wsManager.send(n);
  }
  /**
   * Update entity information (entityId and entityType) for a conversation
   * This is useful when a conversation starts without an entity,
   * then later gets associated with one (e.g., user creates/selects an entity)
   *
   * This method:
   * 1. Makes an HTTP PATCH request to persist the entity attachment on the server
   * 2. Updates the local TicketManager auth data for future ticket renewals
   *
   * Note: This should be used for changing entity ownership (rare).
   * For updating business context (orderId, tableId, etc.), use updateMetadata() instead.
   *
   * @param providerResId - Provider resource ID (conversationId) of the thread to update
   * @param entityId - New entity ID to associate with this conversation
   * @param entityType - Entity type (BRAND or ACCOUNT)
   * @returns Promise that resolves when the update is complete
   *
   * @example
   * await client.updateEntityId('conv_abc123', 'brand_456', 'BRAND');
   */
  async updateEntityId(t, n, r) {
    if (!this.ticketManager)
      throw new Error(
        "WebSocketChatClient: Cannot update entityId - TicketManager not initialized"
      );
    try {
      await Ro(
        this.config.apiUrl,
        t,
        {
          entityId: n,
          entityType: r
        },
        this.authCredentials
      );
      const i = { entityId: n, entityType: r };
      this.ticketManager.updateAuthData(i);
    } catch (i) {
      throw i;
    }
  }
  /**
   * Update thread metadata and/or tag for a conversation
   * This is useful for updating dynamic business context without changing entity ownership
   *
   * Use this for frequently changing data like:
   * - Order IDs, table IDs, campaign IDs
   * - Status updates, priority changes
   * - Custom app-specific metadata
   *
   * This method makes an HTTP PATCH request to update only the metadata/tag fields,
   * leaving entityId and entityType unchanged.
   *
   * @param providerResId - Provider resource ID (conversationId) of the thread to update
   * @param updates - Metadata and/or tag to update
   * @returns Promise that resolves when the update is complete
   *
   * @example
   * await client.updateMetadata('conv_abc123', {
   *   metadata: { orderId: 'order_789', tableId: 'table_5', status: 'pending' }
   * });
   *
   * @example
   * await client.updateMetadata('conv_abc123', {
   *   tag: 'high-priority',
   *   metadata: { priority: 'urgent', assignedTo: 'agent-123' }
   * });
   */
  async updateMetadata(t, n) {
    try {
      await Io(
        this.config.apiUrl,
        t,
        n,
        this.authCredentials
      );
    } catch (r) {
      throw r;
    }
  }
}
function Ao({
  // Authentication and server properties
  userMpAuthToken: e,
  chatServerUrl: t,
  chatServerKey: n,
  // Entity configuration
  entityId: r,
  entityType: i,
  // Tools configuration
  tools: a,
  // Other properties
  contextHelpers: o,
  onSetMessage: s,
  onSystemEvent: c,
  onReasoningUpdate: u,
  onThreadCreated: l,
  onError: f
}) {
  const [m, g] = Ie(
    null
  ), [T, S] = Ie(
    He.DISCONNECTED
  ), [A, E] = Ie(0), [R, D] = Ie(!0), O = ge(null), P = ge(s), _ = ge(c), B = ge(u), Q = ge(l), $ = ge(e), Z = ge(t), W = ge(n), J = ge(r), M = ge(i), F = ge(a), G = ge(a);
  _e(() => {
    JSON.stringify(a) !== JSON.stringify(F.current) && (F.current = a, G.current = a);
  }, [a]);
  const le = ge(o), ie = ge(
    o
  );
  _e(() => {
    JSON.stringify(o) !== JSON.stringify(le.current) && (le.current = o, ie.current = o, O.current && o && O.current.updateContextHelpers(o));
  }, [o]), _e(() => {
    P.current = s, _.current = c, B.current = u, Q.current = l, $.current = e, Z.current = t, W.current = n, J.current = r, M.current = i;
  }, [
    s,
    c,
    u,
    l,
    e,
    t,
    n,
    r,
    i
  ]);
  const ye = Oe(() => {
    const H = G.current;
    return H && H.length > 0 ? H.map(({ execute: V, ...he }) => he) : [];
  }, [G.current]), Ce = Oe(() => {
    if (a && a.length > 0) {
      const H = {};
      return a.forEach((V) => {
        H[V.name] = V.execute;
      }), H;
    }
    return {};
  }, [a]);
  _e(() => {
    O.current && Object.keys(Ce).length > 0 && O.current.updateClientTools(Ce);
  }, [Ce]);
  const y = ge(), ae = de(async () => {
    var H;
    try {
      if (S(He.CONNECTING), !$.current)
        throw new Error("userMpAuthToken is required");
      if (!Z.current)
        throw new Error("chatServerUrl is required");
      if (!W.current)
        throw new Error("chatServerKey is required");
      const V = new Mo();
      O.current = V, g(V);
      const he = ie.current || {};
      await V.onInit({
        // Authentication and server properties (from refs)
        userMpAuthToken: $.current,
        chatServerUrl: Z.current,
        chatServerKey: W.current,
        entityId: J.current,
        entityType: (H = M.current) == null ? void 0 : H.toString(),
        // Tools configuration
        toolSchemas: ye,
        clientTools: Ce,
        contextHelpers: he,
        onSetMessage: P.current,
        onSystemEvent: _.current,
        onReasoningUpdate: B.current,
        onThreadCreated: Q.current,
        onError: f
      }), S(He.CONNECTED), D(!1);
    } catch (V) {
      const he = Qt(V, "WebSocketConnection");
      S(He.DISCONNECTED), he.isRetryable ? setTimeout(() => {
        var ce;
        (O.current === null || !O.current.getConnectionStatus().connected) && ((ce = y.current) == null || ce.call(y));
      }, 2e3) : D(!1);
    }
  }, [
    ye,
    Ce
    // All other props use refs to prevent reconnections
    // connectChatClient only recreates when tools change
  ]), we = de(() => {
    O.current && (O.current.disconnect(), O.current = null), g(null), S(He.DISCONNECTED);
  }, []);
  y.current = ae;
  const C = ge(!1);
  return _e(() => (C.current || (C.current = !0, ae()), () => {
    we();
  }), []), _e(() => {
    const H = setInterval(() => {
      if (O.current) {
        const V = O.current.getConnectionStatus();
        V.connected ? S(He.CONNECTED) : V.isReconnecting ? S(He.RECONNECTING) : S(He.DISCONNECTED), E(V.reconnectAttempts);
      }
    }, 1e3);
    return () => clearInterval(H);
  }, []), {
    chatClient: m,
    connectionState: T,
    reconnectAttempts: A,
    isInitialConnection: R,
    connectChatClient: ae,
    disconnectChatClient: we
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: ca,
  setPrototypeOf: ni,
  isFrozen: No,
  getPrototypeOf: Lo,
  getOwnPropertyDescriptor: Oo
} = Object;
let {
  freeze: tt,
  seal: ft,
  create: Cr
} = Object, {
  apply: yr,
  construct: wr
} = typeof Reflect < "u" && Reflect;
tt || (tt = function(t) {
  return t;
});
ft || (ft = function(t) {
  return t;
});
yr || (yr = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
wr || (wr = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const Rn = nt(Array.prototype.forEach), Do = nt(Array.prototype.lastIndexOf), ri = nt(Array.prototype.pop), on = nt(Array.prototype.push), Po = nt(Array.prototype.splice), Dn = nt(String.prototype.toLowerCase), Xn = nt(String.prototype.toString), Yn = nt(String.prototype.match), sn = nt(String.prototype.replace), Fo = nt(String.prototype.indexOf), Ho = nt(String.prototype.trim), Ct = nt(Object.prototype.hasOwnProperty), Qe = nt(RegExp.prototype.test), ln = zo(TypeError);
function nt(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return yr(e, t, r);
  };
}
function zo(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return wr(e, n);
  };
}
function pe(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Dn;
  ni && ni(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (No(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function Uo(e) {
  for (let t = 0; t < e.length; t++)
    Ct(e, t) || (e[t] = null);
  return e;
}
function Nt(e) {
  const t = Cr(null);
  for (const [n, r] of ca(e))
    Ct(e, n) && (Array.isArray(r) ? t[n] = Uo(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = Nt(r) : t[n] = r);
  return t;
}
function cn(e, t) {
  for (; e !== null; ) {
    const r = Oo(e, t);
    if (r) {
      if (r.get)
        return nt(r.get);
      if (typeof r.value == "function")
        return nt(r.value);
    }
    e = Lo(e);
  }
  function n() {
    return null;
  }
  return n;
}
const ii = tt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Jn = tt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Qn = tt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Bo = tt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), er = tt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Go = tt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), ai = tt(["#text"]), oi = tt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), tr = tt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), si = tt(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), In = tt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Vo = ft(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Wo = ft(/<%[\w\W]*|[\w\W]*%>/gm), jo = ft(/\$\{[\w\W]*/gm), $o = ft(/^data-[\-\w.\u00B7-\uFFFF]+$/), qo = ft(/^aria-[\-\w]+$/), ua = ft(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Zo = ft(/^(?:\w+script|data):/i), Ko = ft(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), da = ft(/^html$/i), Xo = ft(/^[a-z][.\w]*(-[.\w]+)+$/i);
var li = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: qo,
  ATTR_WHITESPACE: Ko,
  CUSTOM_ELEMENT: Xo,
  DATA_ATTR: $o,
  DOCTYPE_NAME: da,
  ERB_EXPR: Wo,
  IS_ALLOWED_URI: ua,
  IS_SCRIPT_OR_DATA: Zo,
  MUSTACHE_EXPR: Vo,
  TMPLIT_EXPR: jo
});
const un = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Yo = function() {
  return typeof window > "u" ? null : window;
}, Jo = function(t, n) {
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
}, ci = function() {
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
function ha() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Yo();
  const t = (Y) => ha(Y);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== un.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: o,
    Node: s,
    Element: c,
    NodeFilter: u,
    NamedNodeMap: l = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: f,
    DOMParser: m,
    trustedTypes: g
  } = e, T = c.prototype, S = cn(T, "cloneNode"), A = cn(T, "remove"), E = cn(T, "nextSibling"), R = cn(T, "childNodes"), D = cn(T, "parentNode");
  if (typeof o == "function") {
    const Y = n.createElement("template");
    Y.content && Y.content.ownerDocument && (n = Y.content.ownerDocument);
  }
  let O, P = "";
  const {
    implementation: _,
    createNodeIterator: B,
    createDocumentFragment: Q,
    getElementsByTagName: $
  } = n, {
    importNode: Z
  } = r;
  let W = ci();
  t.isSupported = typeof ca == "function" && typeof D == "function" && _ && _.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: J,
    ERB_EXPR: M,
    TMPLIT_EXPR: F,
    DATA_ATTR: G,
    ARIA_ATTR: le,
    IS_SCRIPT_OR_DATA: ie,
    ATTR_WHITESPACE: ye,
    CUSTOM_ELEMENT: Ce
  } = li;
  let {
    IS_ALLOWED_URI: y
  } = li, ae = null;
  const we = pe({}, [...ii, ...Jn, ...Qn, ...er, ...ai]);
  let C = null;
  const H = pe({}, [...oi, ...tr, ...si, ...In]);
  let V = Object.seal(Cr(null, {
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
  })), he = null, ce = null;
  const ee = Object.seal(Cr(null, {
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
  let ue = !0, ne = !0, ke = !1, be = !0, Me = !1, Ae = !0, ze = !1, lt = !1, Rt = !1, wt = !1, It = !1, kt = !1, Ut = !0, Bt = !1;
  const Gt = "user-content-";
  let gt = !0, mt = !1, x = {}, b = null;
  const U = pe({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let K = null;
  const se = pe({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ne = null;
  const Ge = pe({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Ve = "http://www.w3.org/1998/Math/MathML", rt = "http://www.w3.org/2000/svg", We = "http://www.w3.org/1999/xhtml";
  let Se = We, Ye = !1, je = null;
  const Sn = pe({}, [Ve, rt, We], Xn);
  let $t = pe({}, ["mi", "mo", "mn", "ms", "mtext"]), qt = pe({}, ["annotation-xml"]);
  const Tn = pe({}, ["title", "style", "font", "a", "script"]);
  let Ot = null;
  const En = ["application/xhtml+xml", "text/html"], xn = "text/html";
  let Le = null, Mt = null;
  const bn = n.createElement("form"), nn = function(w) {
    return w instanceof RegExp || w instanceof Function;
  }, rn = function() {
    let w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Mt && Mt === w)) {
      if ((!w || typeof w != "object") && (w = {}), w = Nt(w), Ot = // eslint-disable-next-line unicorn/prefer-includes
      En.indexOf(w.PARSER_MEDIA_TYPE) === -1 ? xn : w.PARSER_MEDIA_TYPE, Le = Ot === "application/xhtml+xml" ? Xn : Dn, ae = Ct(w, "ALLOWED_TAGS") ? pe({}, w.ALLOWED_TAGS, Le) : we, C = Ct(w, "ALLOWED_ATTR") ? pe({}, w.ALLOWED_ATTR, Le) : H, je = Ct(w, "ALLOWED_NAMESPACES") ? pe({}, w.ALLOWED_NAMESPACES, Xn) : Sn, Ne = Ct(w, "ADD_URI_SAFE_ATTR") ? pe(Nt(Ge), w.ADD_URI_SAFE_ATTR, Le) : Ge, K = Ct(w, "ADD_DATA_URI_TAGS") ? pe(Nt(se), w.ADD_DATA_URI_TAGS, Le) : se, b = Ct(w, "FORBID_CONTENTS") ? pe({}, w.FORBID_CONTENTS, Le) : U, he = Ct(w, "FORBID_TAGS") ? pe({}, w.FORBID_TAGS, Le) : Nt({}), ce = Ct(w, "FORBID_ATTR") ? pe({}, w.FORBID_ATTR, Le) : Nt({}), x = Ct(w, "USE_PROFILES") ? w.USE_PROFILES : !1, ue = w.ALLOW_ARIA_ATTR !== !1, ne = w.ALLOW_DATA_ATTR !== !1, ke = w.ALLOW_UNKNOWN_PROTOCOLS || !1, be = w.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Me = w.SAFE_FOR_TEMPLATES || !1, Ae = w.SAFE_FOR_XML !== !1, ze = w.WHOLE_DOCUMENT || !1, wt = w.RETURN_DOM || !1, It = w.RETURN_DOM_FRAGMENT || !1, kt = w.RETURN_TRUSTED_TYPE || !1, Rt = w.FORCE_BODY || !1, Ut = w.SANITIZE_DOM !== !1, Bt = w.SANITIZE_NAMED_PROPS || !1, gt = w.KEEP_CONTENT !== !1, mt = w.IN_PLACE || !1, y = w.ALLOWED_URI_REGEXP || ua, Se = w.NAMESPACE || We, $t = w.MATHML_TEXT_INTEGRATION_POINTS || $t, qt = w.HTML_INTEGRATION_POINTS || qt, V = w.CUSTOM_ELEMENT_HANDLING || {}, w.CUSTOM_ELEMENT_HANDLING && nn(w.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (V.tagNameCheck = w.CUSTOM_ELEMENT_HANDLING.tagNameCheck), w.CUSTOM_ELEMENT_HANDLING && nn(w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (V.attributeNameCheck = w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), w.CUSTOM_ELEMENT_HANDLING && typeof w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (V.allowCustomizedBuiltInElements = w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Me && (ne = !1), It && (wt = !0), x && (ae = pe({}, ai), C = [], x.html === !0 && (pe(ae, ii), pe(C, oi)), x.svg === !0 && (pe(ae, Jn), pe(C, tr), pe(C, In)), x.svgFilters === !0 && (pe(ae, Qn), pe(C, tr), pe(C, In)), x.mathMl === !0 && (pe(ae, er), pe(C, si), pe(C, In))), w.ADD_TAGS && (typeof w.ADD_TAGS == "function" ? ee.tagCheck = w.ADD_TAGS : (ae === we && (ae = Nt(ae)), pe(ae, w.ADD_TAGS, Le))), w.ADD_ATTR && (typeof w.ADD_ATTR == "function" ? ee.attributeCheck = w.ADD_ATTR : (C === H && (C = Nt(C)), pe(C, w.ADD_ATTR, Le))), w.ADD_URI_SAFE_ATTR && pe(Ne, w.ADD_URI_SAFE_ATTR, Le), w.FORBID_CONTENTS && (b === U && (b = Nt(b)), pe(b, w.FORBID_CONTENTS, Le)), gt && (ae["#text"] = !0), ze && pe(ae, ["html", "head", "body"]), ae.table && (pe(ae, ["tbody"]), delete he.tbody), w.TRUSTED_TYPES_POLICY) {
        if (typeof w.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw ln('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof w.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw ln('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        O = w.TRUSTED_TYPES_POLICY, P = O.createHTML("");
      } else
        O === void 0 && (O = Jo(g, i)), O !== null && typeof P == "string" && (P = O.createHTML(""));
      tt && tt(w), Mt = w;
    }
  }, Zn = pe({}, [...Jn, ...Qn, ...Bo]), an = pe({}, [...er, ...Go]), _n = function(w) {
    let L = D(w);
    (!L || !L.tagName) && (L = {
      namespaceURI: Se,
      tagName: "template"
    });
    const q = Dn(w.tagName), Re = Dn(L.tagName);
    return je[w.namespaceURI] ? w.namespaceURI === rt ? L.namespaceURI === We ? q === "svg" : L.namespaceURI === Ve ? q === "svg" && (Re === "annotation-xml" || $t[Re]) : !!Zn[q] : w.namespaceURI === Ve ? L.namespaceURI === We ? q === "math" : L.namespaceURI === rt ? q === "math" && qt[Re] : !!an[q] : w.namespaceURI === We ? L.namespaceURI === rt && !qt[Re] || L.namespaceURI === Ve && !$t[Re] ? !1 : !an[q] && (Tn[q] || !Zn[q]) : !!(Ot === "application/xhtml+xml" && je[w.namespaceURI]) : !1;
  }, v = function(w) {
    on(t.removed, {
      element: w
    });
    try {
      D(w).removeChild(w);
    } catch {
      A(w);
    }
  }, fe = function(w, L) {
    try {
      on(t.removed, {
        attribute: L.getAttributeNode(w),
        from: L
      });
    } catch {
      on(t.removed, {
        attribute: null,
        from: L
      });
    }
    if (L.removeAttribute(w), w === "is")
      if (wt || It)
        try {
          v(L);
        } catch {
        }
      else
        try {
          L.setAttribute(w, "");
        } catch {
        }
  }, Je = function(w) {
    let L = null, q = null;
    if (Rt)
      w = "<remove></remove>" + w;
    else {
      const Pe = Yn(w, /^[\r\n\t ]+/);
      q = Pe && Pe[0];
    }
    Ot === "application/xhtml+xml" && Se === We && (w = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + w + "</body></html>");
    const Re = O ? O.createHTML(w) : w;
    if (Se === We)
      try {
        L = new m().parseFromString(Re, Ot);
      } catch {
      }
    if (!L || !L.documentElement) {
      L = _.createDocument(Se, "template", null);
      try {
        L.documentElement.innerHTML = Ye ? P : Re;
      } catch {
      }
    }
    const Ze = L.body || L.documentElement;
    return w && q && Ze.insertBefore(n.createTextNode(q), Ze.childNodes[0] || null), Se === We ? $.call(L, ze ? "html" : "body")[0] : ze ? L.documentElement : Ze;
  }, De = function(w) {
    return B.call(
      w.ownerDocument || w,
      w,
      // eslint-disable-next-line no-bitwise
      u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT | u.SHOW_PROCESSING_INSTRUCTION | u.SHOW_CDATA_SECTION,
      null
    );
  }, ve = function(w) {
    return w instanceof f && (typeof w.nodeName != "string" || typeof w.textContent != "string" || typeof w.removeChild != "function" || !(w.attributes instanceof l) || typeof w.removeAttribute != "function" || typeof w.setAttribute != "function" || typeof w.namespaceURI != "string" || typeof w.insertBefore != "function" || typeof w.hasChildNodes != "function");
  }, Ue = function(w) {
    return typeof s == "function" && w instanceof s;
  };
  function qe(Y, w, L) {
    Rn(Y, (q) => {
      q.call(t, w, L, Mt);
    });
  }
  const Dt = function(w) {
    let L = null;
    if (qe(W.beforeSanitizeElements, w, null), ve(w))
      return v(w), !0;
    const q = Le(w.nodeName);
    if (qe(W.uponSanitizeElement, w, {
      tagName: q,
      allowedTags: ae
    }), Ae && w.hasChildNodes() && !Ue(w.firstElementChild) && Qe(/<[/\w!]/g, w.innerHTML) && Qe(/<[/\w!]/g, w.textContent) || w.nodeType === un.progressingInstruction || Ae && w.nodeType === un.comment && Qe(/<[/\w]/g, w.data))
      return v(w), !0;
    if (!(ee.tagCheck instanceof Function && ee.tagCheck(q)) && (!ae[q] || he[q])) {
      if (!he[q] && Yr(q) && (V.tagNameCheck instanceof RegExp && Qe(V.tagNameCheck, q) || V.tagNameCheck instanceof Function && V.tagNameCheck(q)))
        return !1;
      if (gt && !b[q]) {
        const Re = D(w) || w.parentNode, Ze = R(w) || w.childNodes;
        if (Ze && Re) {
          const Pe = Ze.length;
          for (let it = Pe - 1; it >= 0; --it) {
            const At = S(Ze[it], !0);
            At.__removalCount = (w.__removalCount || 0) + 1, Re.insertBefore(At, E(w));
          }
        }
      }
      return v(w), !0;
    }
    return w instanceof c && !_n(w) || (q === "noscript" || q === "noembed" || q === "noframes") && Qe(/<\/no(script|embed|frames)/i, w.innerHTML) ? (v(w), !0) : (Me && w.nodeType === un.text && (L = w.textContent, Rn([J, M, F], (Re) => {
      L = sn(L, Re, " ");
    }), w.textContent !== L && (on(t.removed, {
      element: w.cloneNode()
    }), w.textContent = L)), qe(W.afterSanitizeElements, w, null), !1);
  }, Xr = function(w, L, q) {
    if (Ut && (L === "id" || L === "name") && (q in n || q in bn))
      return !1;
    if (!(ne && !ce[L] && Qe(G, L))) {
      if (!(ue && Qe(le, L))) {
        if (!(ee.attributeCheck instanceof Function && ee.attributeCheck(L, w))) {
          if (!C[L] || ce[L]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Yr(w) && (V.tagNameCheck instanceof RegExp && Qe(V.tagNameCheck, w) || V.tagNameCheck instanceof Function && V.tagNameCheck(w)) && (V.attributeNameCheck instanceof RegExp && Qe(V.attributeNameCheck, L) || V.attributeNameCheck instanceof Function && V.attributeNameCheck(L, w)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              L === "is" && V.allowCustomizedBuiltInElements && (V.tagNameCheck instanceof RegExp && Qe(V.tagNameCheck, q) || V.tagNameCheck instanceof Function && V.tagNameCheck(q)))
            ) return !1;
          } else if (!Ne[L]) {
            if (!Qe(y, sn(q, ye, ""))) {
              if (!((L === "src" || L === "xlink:href" || L === "href") && w !== "script" && Fo(q, "data:") === 0 && K[w])) {
                if (!(ke && !Qe(ie, sn(q, ye, "")))) {
                  if (q)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Yr = function(w) {
    return w !== "annotation-xml" && Yn(w, Ce);
  }, Jr = function(w) {
    qe(W.beforeSanitizeAttributes, w, null);
    const {
      attributes: L
    } = w;
    if (!L || ve(w))
      return;
    const q = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: C,
      forceKeepAttr: void 0
    };
    let Re = L.length;
    for (; Re--; ) {
      const Ze = L[Re], {
        name: Pe,
        namespaceURI: it,
        value: At
      } = Ze, Zt = Le(Pe), Kn = At;
      let $e = Pe === "value" ? Kn : Ho(Kn);
      if (q.attrName = Zt, q.attrValue = $e, q.keepAttr = !0, q.forceKeepAttr = void 0, qe(W.uponSanitizeAttribute, w, q), $e = q.attrValue, Bt && (Zt === "id" || Zt === "name") && (fe(Pe, w), $e = Gt + $e), Ae && Qe(/((--!?|])>)|<\/(style|title|textarea)/i, $e)) {
        fe(Pe, w);
        continue;
      }
      if (Zt === "attributename" && Yn($e, "href")) {
        fe(Pe, w);
        continue;
      }
      if (q.forceKeepAttr)
        continue;
      if (!q.keepAttr) {
        fe(Pe, w);
        continue;
      }
      if (!be && Qe(/\/>/i, $e)) {
        fe(Pe, w);
        continue;
      }
      Me && Rn([J, M, F], (ei) => {
        $e = sn($e, ei, " ");
      });
      const Qr = Le(w.nodeName);
      if (!Xr(Qr, Zt, $e)) {
        fe(Pe, w);
        continue;
      }
      if (O && typeof g == "object" && typeof g.getAttributeType == "function" && !it)
        switch (g.getAttributeType(Qr, Zt)) {
          case "TrustedHTML": {
            $e = O.createHTML($e);
            break;
          }
          case "TrustedScriptURL": {
            $e = O.createScriptURL($e);
            break;
          }
        }
      if ($e !== Kn)
        try {
          it ? w.setAttributeNS(it, Pe, $e) : w.setAttribute(Pe, $e), ve(w) ? v(w) : ri(t.removed);
        } catch {
          fe(Pe, w);
        }
    }
    qe(W.afterSanitizeAttributes, w, null);
  }, uo = function Y(w) {
    let L = null;
    const q = De(w);
    for (qe(W.beforeSanitizeShadowDOM, w, null); L = q.nextNode(); )
      qe(W.uponSanitizeShadowNode, L, null), Dt(L), Jr(L), L.content instanceof a && Y(L.content);
    qe(W.afterSanitizeShadowDOM, w, null);
  };
  return t.sanitize = function(Y) {
    let w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, L = null, q = null, Re = null, Ze = null;
    if (Ye = !Y, Ye && (Y = "<!-->"), typeof Y != "string" && !Ue(Y))
      if (typeof Y.toString == "function") {
        if (Y = Y.toString(), typeof Y != "string")
          throw ln("dirty is not a string, aborting");
      } else
        throw ln("toString is not a function");
    if (!t.isSupported)
      return Y;
    if (lt || rn(w), t.removed = [], typeof Y == "string" && (mt = !1), mt) {
      if (Y.nodeName) {
        const At = Le(Y.nodeName);
        if (!ae[At] || he[At])
          throw ln("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (Y instanceof s)
      L = Je("<!---->"), q = L.ownerDocument.importNode(Y, !0), q.nodeType === un.element && q.nodeName === "BODY" || q.nodeName === "HTML" ? L = q : L.appendChild(q);
    else {
      if (!wt && !Me && !ze && // eslint-disable-next-line unicorn/prefer-includes
      Y.indexOf("<") === -1)
        return O && kt ? O.createHTML(Y) : Y;
      if (L = Je(Y), !L)
        return wt ? null : kt ? P : "";
    }
    L && Rt && v(L.firstChild);
    const Pe = De(mt ? Y : L);
    for (; Re = Pe.nextNode(); )
      Dt(Re), Jr(Re), Re.content instanceof a && uo(Re.content);
    if (mt)
      return Y;
    if (wt) {
      if (It)
        for (Ze = Q.call(L.ownerDocument); L.firstChild; )
          Ze.appendChild(L.firstChild);
      else
        Ze = L;
      return (C.shadowroot || C.shadowrootmode) && (Ze = Z.call(r, Ze, !0)), Ze;
    }
    let it = ze ? L.outerHTML : L.innerHTML;
    return ze && ae["!doctype"] && L.ownerDocument && L.ownerDocument.doctype && L.ownerDocument.doctype.name && Qe(da, L.ownerDocument.doctype.name) && (it = "<!DOCTYPE " + L.ownerDocument.doctype.name + `>
` + it), Me && Rn([J, M, F], (At) => {
      it = sn(it, At, " ");
    }), O && kt ? O.createHTML(it) : it;
  }, t.setConfig = function() {
    let Y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    rn(Y), lt = !0;
  }, t.clearConfig = function() {
    Mt = null, lt = !1;
  }, t.isValidAttribute = function(Y, w, L) {
    Mt || rn({});
    const q = Le(Y), Re = Le(w);
    return Xr(q, Re, L);
  }, t.addHook = function(Y, w) {
    typeof w == "function" && on(W[Y], w);
  }, t.removeHook = function(Y, w) {
    if (w !== void 0) {
      const L = Do(W[Y], w);
      return L === -1 ? void 0 : Po(W[Y], L, 1)[0];
    }
    return ri(W[Y]);
  }, t.removeHooks = function(Y) {
    W[Y] = [];
  }, t.removeAllHooks = function() {
    W = ci();
  }, t;
}
var Qo = ha();
function es(e) {
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
function zn(e, t = !1) {
  return e;
}
function ts(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function ui(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || es(e));
  } catch {
    return !1;
  }
}
function ns() {
  Qo.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !ui(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !ui(n) && e.removeAttribute("src");
    }
  });
}
ns();
function rs() {
  const [e, t] = Ie([]), n = de(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = de(
    (o, s) => {
      const u = zn(s, o === "assistant");
      t((l) => [
        ...l,
        {
          id: n(),
          role: o,
          content: u,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [n]
  ), i = de((o, s) => {
    t(
      (c) => c.map((u) => u.id === o ? { ...u, ...s } : u)
    );
  }, []), a = de(
    (o, s, c) => {
      t(
        (u) => u.map(
          (l) => l.id === o ? {
            ...l,
            content: s,
            isStreaming: c
          } : l
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
const di = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), r = (u, l) => {
    const f = typeof u == "function" ? u(t) : u;
    if (!Object.is(f, t)) {
      const m = t;
      t = l ?? (typeof f != "object" || f === null) ? f : Object.assign({}, t, f), n.forEach((g) => g(t, m));
    }
  }, i = () => t, s = { setState: r, getState: i, getInitialState: () => c, subscribe: (u) => (n.add(u), () => n.delete(u)) }, c = t = e(r, i, s);
  return s;
}, is = (e) => e ? di(e) : di, as = (e) => e;
function os(e, t = as) {
  const n = xt.useSyncExternalStore(
    e.subscribe,
    xt.useCallback(() => t(e.getState()), [e, t]),
    xt.useCallback(() => t(e.getInitialState()), [e, t])
  );
  return xt.useDebugValue(n), n;
}
const ss = (e) => {
  const t = is(e), n = (r) => os(t, r);
  return Object.assign(n, t), n;
}, ls = (e) => ss, hi = { BASE_URL: "/", DEV: !0, MODE: "production", PROD: !1, SSR: !1, VITE_APP_TOLGEE_API_KEY: "tgpak_ge4v6ytcm5xtozdlobzxk4twgyzwqntjoe3xi4bwozygu5q", VITE_APP_TOLGEE_API_URL: "https://tolgee-translation.oddleapp.com", VITE_APP_TOLGEE_PROJECT_ID: "19", VITE_USER_NODE_ENV: "development" }, mn = /* @__PURE__ */ new Map(), Mn = (e) => {
  const t = mn.get(e);
  return t ? Object.fromEntries(
    Object.entries(t.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, cs = (e, t, n) => {
  if (e === void 0)
    return {
      type: "untracked",
      connection: t.connect(n)
    };
  const r = mn.get(n.name);
  if (r)
    return { type: "tracked", store: e, ...r };
  const i = {
    connection: t.connect(n),
    stores: {}
  };
  return mn.set(n.name, i), { type: "tracked", store: e, ...i };
}, us = (e, t) => {
  if (t === void 0) return;
  const n = mn.get(e);
  n && (delete n.stores[t], Object.keys(n.stores).length === 0 && mn.delete(e));
}, ds = (e) => {
  var t, n;
  if (!e) return;
  const r = e.split(`
`), i = r.findIndex(
    (o) => o.includes("api.setState")
  );
  if (i < 0) return;
  const a = ((t = r[i + 1]) == null ? void 0 : t.trim()) || "";
  return (n = /.+ (.+) .+/.exec(a)) == null ? void 0 : n[1];
}, hs = (e, t = {}) => (n, r, i) => {
  const { enabled: a, anonymousActionType: o, store: s, ...c } = t;
  let u;
  try {
    u = (a ?? (hi ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!u)
    return e(n, r, i);
  const { connection: l, ...f } = cs(s, u, c);
  let m = !0;
  i.setState = (S, A, E) => {
    const R = n(S, A);
    if (!m) return R;
    const D = E === void 0 ? {
      type: o || ds(new Error().stack) || "anonymous"
    } : typeof E == "string" ? { type: E } : E;
    return s === void 0 ? (l == null || l.send(D, r()), R) : (l == null || l.send(
      {
        ...D,
        type: `${s}/${D.type}`
      },
      {
        ...Mn(c.name),
        [s]: i.getState()
      }
    ), R);
  }, i.devtools = {
    cleanup: () => {
      l && typeof l.unsubscribe == "function" && l.unsubscribe(), us(c.name, s);
    }
  };
  const g = (...S) => {
    const A = m;
    m = !1, n(...S), m = A;
  }, T = e(i.setState, r, i);
  if (f.type === "untracked" ? l == null || l.init(T) : (f.stores[f.store] = i, l == null || l.init(
    Object.fromEntries(
      Object.entries(f.stores).map(([S, A]) => [
        S,
        S === f.store ? T : A.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let S = !1;
    const A = i.dispatch;
    i.dispatch = (...E) => {
      (hi ? "production" : void 0) !== "production" && E[0].type === "__setState" && !S && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), S = !0), A(...E);
    };
  }
  return l.subscribe((S) => {
    var A;
    switch (S.type) {
      case "ACTION":
        if (typeof S.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return nr(
          S.payload,
          (E) => {
            if (E.type === "__setState") {
              if (s === void 0) {
                g(E.state);
                return;
              }
              Object.keys(E.state).length !== 1 && console.error(
                `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
              );
              const R = E.state[s];
              if (R == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(R) && g(R);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(E);
          }
        );
      case "DISPATCH":
        switch (S.payload.type) {
          case "RESET":
            return g(T), s === void 0 ? l == null ? void 0 : l.init(i.getState()) : l == null ? void 0 : l.init(Mn(c.name));
          case "COMMIT":
            if (s === void 0) {
              l == null || l.init(i.getState());
              return;
            }
            return l == null ? void 0 : l.init(Mn(c.name));
          case "ROLLBACK":
            return nr(S.state, (E) => {
              if (s === void 0) {
                g(E), l == null || l.init(i.getState());
                return;
              }
              g(E[s]), l == null || l.init(Mn(c.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return nr(S.state, (E) => {
              if (s === void 0) {
                g(E);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(E[s]) && g(E[s]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: E } = S.payload, R = (A = E.computedStates.slice(-1)[0]) == null ? void 0 : A.state;
            if (!R) return;
            g(s === void 0 ? R : R[s]), l == null || l.send(
              null,
              // FIXME no-any
              E
            );
            return;
          }
          case "PAUSE_RECORDING":
            return m = !m;
        }
        return;
    }
  }), T;
}, ps = hs, nr = (e, t) => {
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
}, fs = (e) => ({
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
}), gs = (e) => ({
  // Initial state
  chatStatus: Te.IDLE,
  streamingStatus: ut.IDLE,
  // Actions
  setChatStatus: (t) => e({ chatStatus: t }),
  setStreamingStatus: (t) => e({ streamingStatus: t }),
  resetChatStatus: () => e({
    chatStatus: Te.IDLE,
    streamingStatus: ut.IDLE
  })
}), ms = (e) => ({
  // Initial state
  isLoadingConversation: !1,
  conversationError: null,
  // Actions
  setIsLoadingConversation: (t) => e({ isLoadingConversation: t }),
  setConversationError: (t) => e({ conversationError: t }),
  clearConversationError: () => e({ conversationError: null })
}), Cs = (e) => ({
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
}), ys = (e) => ({
  // Initial state
  isStreaming: !1,
  isThinking: !1,
  streamingContent: "",
  isHandlingTool: !1,
  currentAssistantMessageId: null,
  // Individual setters
  setIsStreaming: (t) => e({ isStreaming: t }),
  setIsThinking: (t) => e({ isThinking: t }),
  setStreamingContent: (t) => e({ streamingContent: t }),
  setIsHandlingTool: (t) => e({ isHandlingTool: t }),
  setCurrentAssistantMessageId: (t) => e({ currentAssistantMessageId: t }),
  // Lifecycle actions
  startStreaming: (t) => e({
    isStreaming: !0,
    isThinking: !0,
    currentAssistantMessageId: t,
    streamingContent: "",
    isHandlingTool: !1
  }),
  stopStreaming: () => e({
    isStreaming: !1,
    isThinking: !1
  }),
  clearStreamingBuffers: () => e({
    streamingContent: "",
    currentAssistantMessageId: null
  }),
  resetToolHandling: () => e({
    isHandlingTool: !1
  })
}), re = ls()(
  ps(
    (...e) => ({
      ...fs(...e),
      ...gs(...e),
      ...ms(...e),
      ...Cs(...e),
      ...ys(...e)
    }),
    {
      name: "ChatUI-Store"
    }
  )
), sh = () => re((e) => ({
  isModalOpen: e.isModalOpen,
  isCollapsed: e.isCollapsed,
  currentMode: e.currentMode,
  openModal: e.openModal,
  closeModal: e.closeModal,
  toggleCollapse: e.toggleCollapse,
  toggleFullscreen: e.toggleFullscreen
})), lh = () => re((e) => ({
  chatStatus: e.chatStatus,
  streamingStatus: e.streamingStatus,
  setChatStatus: e.setChatStatus,
  setStreamingStatus: e.setStreamingStatus,
  resetChatStatus: e.resetChatStatus
})), ch = () => re((e) => ({
  isLoadingConversation: e.isLoadingConversation,
  conversationError: e.conversationError,
  setIsLoadingConversation: e.setIsLoadingConversation,
  setConversationError: e.setConversationError,
  clearConversationError: e.clearConversationError
})), uh = () => re((e) => ({
  currentThreadId: e.currentThreadId,
  providerResId: e.providerResId,
  setCurrentThreadId: e.setCurrentThreadId,
  setProviderResId: e.setProviderResId,
  clearThreadData: e.clearThreadData
}));
function ws() {
  const e = re((R) => R.isStreaming), t = re((R) => R.setIsStreaming), n = re((R) => R.isThinking), r = re((R) => R.setIsThinking), i = re((R) => R.streamingContent), a = re((R) => R.setStreamingContent), o = re((R) => R.isHandlingTool), s = re((R) => R.setIsHandlingTool), c = re((R) => R.startStreaming), u = re((R) => R.stopStreaming), l = re((R) => R.clearStreamingBuffers), f = re((R) => R.resetToolHandling), m = ge(""), g = Oe(() => ({
    get current() {
      return re.getState().currentAssistantMessageId;
    },
    set current(R) {
      re.getState().setCurrentAssistantMessageId(R);
    }
  }), []), T = de((R) => {
    R ? c(R) : (t(!0), r(!0), a("")), m.current = "";
  }, [c, t, r, a]), S = de(() => {
    u(), m.current = "";
  }, [u]), A = de(() => {
    f();
  }, [f]), E = de(() => {
    l(), m.current = "";
  }, [l]);
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
    // Refs (backward compatible interface)
    currentAssistantMessageIdRef: g,
    streamingContentRef: m,
    // Actions
    startStreaming: T,
    stopStreaming: S,
    resetToolHandling: A,
    clearStreamingBuffers: E
  };
}
function ks() {
  const e = Oe(
    () => (i, a) => a === !1 ? Be.isErrorMessage(i) ? Ke.ERROR : Ke.COMPLETED : Be.isCompletedMessage(i) ? Ke.COMPLETED : Be.isErrorMessage(i) ? Ke.ERROR : Ke.PROCESSING,
    []
  ), t = Oe(
    () => (i) => Be.extractDuration(i),
    []
  ), n = Oe(
    () => (i) => Be.cleanReasoningContent(i),
    []
  ), r = Oe(
    () => (i, a) => {
      switch (Be.getMessageType(
        i,
        a
      )) {
        case te.MESSAGE_TYPES.ERROR:
          return "Error";
        case te.MESSAGE_TYPES.COMPLETED:
          return "Completed";
        case te.MESSAGE_TYPES.THOUGHT:
          return te.UI_TEXT.THOUGHT;
        case te.MESSAGE_TYPES.THINKING:
        default:
          return te.UI_TEXT.THINKING_ELLIPSIS;
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
function Ss() {
  const e = Oe(
    () => (n, r) => r === !1 ? n.includes(te.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : n.includes(te.COMPLETED_MARKER) || n.includes("✅") ? "Tool Completed" : n.includes(te.ERROR_MARKER) ? "Tool Error" : (n.includes(te.HANDLING_MARKER), "Tool Processing..."),
    []
  ), t = Oe(
    () => (n, r) => r === !1 ? n.includes(te.ERROR_MARKER) ? Ke.ERROR : Ke.COMPLETED : n.includes(te.COMPLETED_MARKER) || n.includes("✅") ? Ke.COMPLETED : n.includes(te.ERROR_MARKER) ? Ke.ERROR : Ke.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: t
  };
}
function Ts({
  setMessages: e,
  addMessage: t,
  updateMessageContent: n,
  generateId: r,
  setIsThinking: i,
  setIsStreaming: a,
  setStreamingContent: o,
  setIsHandlingTool: s,
  currentAssistantMessageIdRef: c,
  streamingContentRef: u,
  clearStreamingBuffers: l,
  resetToolHandling: f
}) {
  const m = ge(/* @__PURE__ */ new Map()), g = ge(/* @__PURE__ */ new Map()), T = de(() => {
    if (c.current && u.current) {
      const O = zn(
        u.current,
        !0
      );
      return n(
        c.current,
        O,
        !1
      ), l(), !0;
    }
    return !1;
  }, [
    c,
    u,
    n,
    l
  ]), S = de(
    (O) => {
      window.responseTimeoutId && (clearTimeout(window.responseTimeoutId), window.responseTimeoutId = null, c.current || e((_) => {
        var Q;
        const B = (Q = _.map(($, Z) => ({ msg: $, index: Z })).filter(({ msg: $ }) => $.role === "user").pop()) == null ? void 0 : Q.index;
        return B !== void 0 ? _.map(
          ($, Z) => Z === B && ($.hasError || $.isRetrying) ? { ...$, hasError: !1, errorMessage: void 0, isRetrying: !1 } : $
        ) : _;
      }));
      const P = zn(O, !0);
      if (c.current)
        u.current += P, o(u.current), n(
          c.current,
          u.current,
          !0
        );
      else {
        i(!1);
        const _ = r();
        c.current = _, u.current = P, o(P);
        const B = {
          id: _,
          role: "assistant",
          content: P,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        e((Q) => [...Q, B]);
      }
    },
    [
      c,
      u,
      o,
      n,
      i,
      r,
      e
    ]
  ), A = de(
    (O, P, _) => {
      const { callId: B } = _ || {};
      if (s(O), !B) return;
      const Q = Be.isThinkingMessage(P) && !P.includes("for") && !P.includes("seconds"), $ = Be.isThinkingMessage(P) && P.includes("for") && P.includes("seconds"), Z = Be.isHandlingMessage(P), W = Be.isCompletedMessage(P), J = Be.isErrorMessage(P);
      if (Q || $) {
        const F = m.current.get(B);
        if (Q && !F) {
          T();
          const G = r();
          m.current.set(B, G);
          const le = {
            id: G,
            role: "reasoning",
            content: P,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          e((ie) => [...ie, le]);
        } else $ && F ? (n(F, P, !1), m.current.delete(B)) : F && Q && n(F, P, !0);
      }
      const M = g.current.get(B);
      if (Z && !M) {
        T();
        const F = P.match(
          te.PATTERNS.HANDLING_TOOL
        ), G = F ? F[1] : "Unknown Tool", le = r();
        g.current.set(B, le);
        const ie = {
          id: le,
          role: "tooling",
          content: P,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ..._,
            toolName: G,
            callId: B,
            status: Ke.PROCESSING
          }
        };
        e((ye) => [...ye, ie]);
      } else if ((W || J) && M) {
        const F = P.match(
          te.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), G = F ? F[1] : "Unknown Tool";
        e(
          (le) => le.map(
            (ie) => ie.id === M ? {
              ...ie,
              content: P,
              isStreaming: !1,
              toolData: {
                ...ie.toolData,
                toolName: G,
                status: J ? Ke.ERROR : Ke.COMPLETED,
                callId: B ?? ""
              }
            } : ie
          )
        ), g.current.delete(B);
      } else M && O && !W && !J && n(M, P, !0);
    },
    [
      s,
      T,
      r,
      e,
      n
    ]
  ), E = de(() => {
    a(!1), i(!1), T();
  }, [a, i, T]), R = de(
    (O) => {
      a(!1), i(!1), T(), t("system", `❌ Chat error: ${O}`);
    },
    [
      a,
      i,
      T,
      t
    ]
  ), D = de(() => {
    a(!1), i(!1), l(), f();
  }, [
    a,
    i,
    l,
    f
  ]);
  return {
    handleSetMessage: S,
    handleReasoningUpdate: A,
    handleChatFinished: E,
    handleChatError: R,
    stopGeneration: D,
    finalizeCurrentStreamingMessage: T
  };
}
function Es() {
  const e = rs(), t = ws(), n = ks(), r = Ss(), i = Ts({
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
function dh({ initialMode: e = "sidebar" }) {
  const t = re();
  return _e(() => {
    e && t.currentMode !== e && t.setCurrentMode(e);
  }, [e]), _e(() => {
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
    // Actions
    openModal: t.openModal,
    closeModal: t.closeModal,
    toggleCollapse: t.toggleCollapse,
    toggleFullscreen: t.toggleFullscreen
  };
}
function xs({
  entityId: e,
  entityType: t,
  httpApiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  messages: a,
  setMessages: o,
  setIsLoadingConversation: s,
  setConversationError: c,
  setCurrentThreadId: u,
  setProviderResId: l,
  metadata: f,
  isConnected: m = !0,
  // Default to true for backward compatibility
  onConversationInitialized: g
}) {
  const T = ge(!1), S = async () => {
    if (m && e && !(!f || typeof f == "object" && Object.keys(f).length === 0) && n && r && i && !T.current && !(a.length > 0))
      try {
        s(!0), c(null);
        const E = await vo(
          n,
          {
            entityId: e,
            entityType: t,
            metadata: f
          },
          {
            userMpAuthToken: r,
            chatServerKey: i
          }
        );
        o(E.messages), E.threadId && u(E.threadId), E.providerResId && l(E.providerResId), E.messages.length > 0 && g && g(), T.current = !0;
      } catch (E) {
        Qt(E, "ConversationLoader"), c(
          E instanceof Error ? E.message : "Failed to load conversation"
        ), T.current = !0;
      } finally {
        s(!1);
      }
  };
  return _e(() => {
    S();
  }, [
    m,
    // Load when connection is established
    e,
    t,
    n,
    r,
    i,
    a.length,
    o,
    s,
    c,
    u,
    l,
    f
  ]), {
    hasLoadedConversationRef: T,
    resetConversationLoader: () => {
      T.current = !1;
    },
    reloadConversation: S
  };
}
function bs({
  metadata: e,
  chatClient: t,
  currentProviderResId: n,
  isLoadingConversation: r,
  messages: i = [],
  entityId: a,
  entityType: o
}) {
  const s = ge(void 0), c = ge(!1);
  return _e(() => {
    if (r || !t)
      return;
    const u = !n && i.length === 0, l = !!n;
    if (u && (!a || !o) || l && !n)
      return;
    if (!c.current) {
      c.current = !0, s.current = e;
      return;
    }
    if (!(s.current !== e))
      return;
    if (!(e && Object.keys(e).length > 0)) {
      s.current = e;
      return;
    }
    u ? s.current = e : l && t.updateMetadata(n, { metadata: e }).then(() => {
      s.current = e;
    }).catch((g) => {
      console.error(
        "[useMetadataSync] ❌ Failed to update existing thread metadata:",
        g
      );
    });
  }, [
    e,
    n,
    t,
    r,
    i.length,
    a,
    o
  ]), {
    // Debug info
    lastMetadata: s.current,
    hasInitialized: c.current,
    isDraftState: !n && i.length === 0,
    isExistingThread: !!n
  };
}
function _s() {
  const [e, t] = Ie(navigator.onLine), [n, r] = Ie(!1);
  return _e(() => {
    const i = () => {
      t(!0), n && r(!1);
    }, a = () => {
      t(!1), r(!0);
    };
    return window.addEventListener("online", i), window.addEventListener("offline", a), () => {
      window.removeEventListener("online", i), window.removeEventListener("offline", a);
    };
  }, [n]), { isOnline: e, wasOffline: n };
}
class vs {
  // 15MB
  constructor(t) {
    X(this, "config");
    X(this, "defaultFolder", "chat-uploads");
    X(this, "defaultMaxFileSize", 15 * 1024 * 1024);
    this.config = {
      folder: this.defaultFolder,
      maxFileSize: this.defaultMaxFileSize,
      ...t
    };
  }
  /**
   * Upload files with authentication and error handling
   * Single file: uses "file" field name
   * Multiple files: uses "files" field name in single request
   */
  async uploadFiles(t, n) {
    return t.forEach((r) => this.validateFile(r)), t.length === 1 ? [await this.uploadSingleFile(t[0], n ? (r) => {
      const i = [{
        file: t[0],
        progress: r,
        status: r === 100 ? "completed" : "uploading"
      }];
      n(i);
    } : void 0)] : this.uploadMultipleFiles(t, n);
  }
  /**
   * Upload multiple files in a single request using "files" field name
   */
  async uploadMultipleFiles(t, n) {
    const r = new FormData();
    t.forEach((o) => {
      r.append("files", o);
    }), r.append("folder", this.config.folder || this.defaultFolder);
    const i = this.buildAuthHeaders(), a = t.map((o) => ({
      file: o,
      progress: 0,
      status: "uploading"
    }));
    return new Promise((o, s) => {
      const c = new XMLHttpRequest();
      c.upload.addEventListener("progress", (u) => {
        if (u.lengthComputable && n) {
          const l = u.loaded / u.total * 100;
          a.forEach((f) => {
            f.progress = l;
          }), n([...a]);
        }
      }), c.addEventListener("load", async () => {
        if (c.status >= 200 && c.status < 300)
          try {
            const u = JSON.parse(c.responseText);
            let l;
            u.data && Array.isArray(u.data) ? l = u.data.map((f, m) => this.processUploadResult(t[m], f)) : Array.isArray(u) ? l = u.map((f, m) => this.processUploadResult(t[m], f)) : l = [this.processUploadResult(t[0], u)], a.forEach((f) => {
              f.status = "completed", f.progress = 100;
            }), n && n([...a]), o(l);
          } catch {
            a.forEach((l) => {
              l.status = "error";
            }), n && n([...a]), s(new Error("Invalid response format"));
          }
        else
          a.forEach((u) => {
            u.status = "error";
          }), n && n([...a]), s(new Error(`Upload failed with status ${c.status}`));
      }), c.addEventListener("error", () => {
        a.forEach((u) => {
          u.status = "error";
        }), n && n([...a]), s(new Error("Network error during upload"));
      }), c.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([u, l]) => {
        c.setRequestHeader(u, l);
      }), c.send(r);
    });
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
      s.upload.addEventListener("progress", (c) => {
        if (c.lengthComputable && n) {
          const u = c.loaded / c.total * 100;
          n(u);
        }
      }), s.addEventListener("load", async () => {
        if (s.status >= 200 && s.status < 300)
          try {
            const c = JSON.parse(s.responseText), u = this.processUploadResult(t, c);
            a(u);
          } catch {
            o(new Error("Invalid response format"));
          }
        else
          o(new Error(`Upload failed with status ${s.status}`));
      }), s.addEventListener("error", () => {
        o(new Error("Network error during upload"));
      }), s.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([c, u]) => {
        s.setRequestHeader(c, u);
      }), s.send(r);
    });
  }
  /**
   * Process the upload result and return the CDN URL directly
   */
  processUploadResult(t, n) {
    return n.cdnUrl || n.url;
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
class Rs {
  constructor(t, n = {}) {
    X(this, "config");
    X(this, "chatClient");
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
      media: n,
      hasError: !1,
      isRetrying: !1,
      isStreaming: !1
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
const Is = {
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
}, pa = {
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
}, Ms = {
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
  },
  /**
   * Validate WebSocket URL format
   */
  validateWebSocketUrl: (e) => {
    if (!pa.isValidWebSocketUrl(e))
      throw new Error(`Invalid WebSocket URL: ${e}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (e) => e.trim().length > 0
}, fa = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...e) => e.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (e, t, n, r, i) => fa.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${e}`,
    t && `chat-wrapper--${t}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    e === "embedded" && i && "chat-wrapper--constrained"
  )
}, ga = {
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
  getUserFriendlyErrorMessage: (e) => ga.isNetworkError(e) ? "Connection error. Please check your internet connection and try again." : e.message.includes("authentication") || e.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : e.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, bt = {
  state: Is,
  url: pa,
  validation: Ms,
  css: fa,
  error: ga
};
class pi extends Lr {
  constructor(n) {
    super(n);
    X(this, "resetTimeoutId", null);
    X(this, "resetErrorBoundary", () => {
      this.resetTimeoutId && clearTimeout(this.resetTimeoutId), this.setState({
        hasError: !1,
        error: void 0,
        errorInfo: void 0
      });
    });
    X(this, "handleRetry", () => {
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
    }), this.props.onError && this.props.onError(n, r);
  }
  componentDidUpdate(n) {
    const { resetOnPropsChange: r, resetKeys: i } = this.props, { hasError: a } = this.state;
    if (a && r && i) {
      const o = n.resetKeys || [];
      i.some(
        (c, u) => c !== o[u]
      ) && this.resetErrorBoundary();
    }
  }
  render() {
    const { hasError: n, error: r } = this.state, { children: i, fallback: a } = this.props;
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ p("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ p("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ p("p", { className: "chat-wrapper__error-message", children: bt.error.getUserFriendlyErrorMessage(r) }),
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-actions", children: /* @__PURE__ */ p(
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
          return !0;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ I("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ p("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ p("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : i;
  }
}
class As extends Lr {
  constructor(n) {
    super(n);
    X(this, "retryCount", 0);
    X(this, "retryTimeoutId", null);
    X(this, "handleRetry", () => {
      const { maxRetries: n = 3, retryDelay: r = 1e3, onRetry: i } = this.props;
      this.retryCount >= n || (this.setState({ isRetrying: !0 }), this.retryCount++, this.retryTimeoutId = window.setTimeout(() => {
        this.setState({
          hasError: !1,
          error: void 0,
          isRetrying: !1
        }), i && i();
      }, r * this.retryCount));
    });
    X(this, "handleManualReset", () => {
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
    this.props.onError && this.props.onError(n);
  }
  componentWillUnmount() {
    this.retryTimeoutId && clearTimeout(this.retryTimeoutId);
  }
  render() {
    const { hasError: n, error: r, isRetrying: i } = this.state, { children: a, maxRetries: o = 3 } = this.props;
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || bt.error.isNetworkError(r)) ? /* @__PURE__ */ p("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ p("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ p("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ I("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ p("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ I(Ht, { children: [
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
        /* @__PURE__ */ p(
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
          return !0;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ I("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ p("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ p("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
}
class Ns extends Lr {
  constructor(n) {
    super(n);
    X(this, "handleRetry", () => {
      this.setState({
        hasError: !1,
        error: void 0,
        failedFiles: void 0
      }), this.props.onRetry && this.props.onRetry();
    });
    X(this, "handleDismiss", () => {
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
    const r = this.extractFailedFiles(n);
    this.setState({ failedFiles: r }), this.props.onError && this.props.onError(n, r);
  }
  extractFailedFiles(n) {
    const r = /file[s]?\s*['":]?\s*([^,\n]+)/gi, i = n.message.match(r);
    return i ? i.map((a) => a.replace(/file[s]?\s*['":]?\s*/i, "").trim()) : [];
  }
  render() {
    const { hasError: n, error: r, failedFiles: i } = this.state, { children: a, allowRetry: o = !0 } = this.props;
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ p("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ p("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ p("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ I("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ p("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ p("ul", { className: "chat-wrapper__failed-files-list", children: i.map((c, u) => /* @__PURE__ */ p("li", { className: "chat-wrapper__failed-file", children: c }, u)) })
      ] }),
      /* @__PURE__ */ I("div", { className: "chat-wrapper__error-actions", children: [
        o && /* @__PURE__ */ p(
          "button",
          {
            className: "chat-wrapper__error-retry",
            onClick: this.handleRetry,
            type: "button",
            children: "Try Again"
          }
        ),
        /* @__PURE__ */ p(
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
          return !0;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ I("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ p("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ p("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
  getFileUploadErrorMessage(n) {
    return n.message.includes("size") || n.message.includes("large") ? "File size is too large. Please try with smaller files." : n.message.includes("type") || n.message.includes("format") ? "File type is not supported. Please try with different file types." : n.message.includes("network") || n.message.includes("connection") ? "Network error during upload. Please check your connection and try again." : n.message.includes("timeout") ? "Upload timed out. Please try again with smaller files or better connection." : "Failed to upload files. Please try again.";
  }
}
const Ls = ({
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
      /* @__PURE__ */ p(
        "path",
        {
          d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
          fill: r
        }
      ),
      /* @__PURE__ */ p("circle", { cx: "7", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ p("circle", { cx: "12", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ p("circle", { cx: "17", cy: "10", r: "1", fill: r })
    ]
  }
), Os = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ p(
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
    children: /* @__PURE__ */ p(
      "path",
      {
        d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
        fill: r
      }
    )
  }
), Ds = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor",
  isFullscreen: i = !1
}) => /* @__PURE__ */ p(
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
      /* @__PURE__ */ p(
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
      /* @__PURE__ */ p(
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
), Ps = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ p(
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
    children: /* @__PURE__ */ p(
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
), hh = ({
  className: e,
  onClick: t,
  size: n = 16,
  color: r = "currentColor"
}) => /* @__PURE__ */ p(
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
    children: /* @__PURE__ */ p(
      "path",
      {
        d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
        fill: r
      }
    )
  }
), Fs = ({
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
      /* @__PURE__ */ p("mask", { id: "mask0_444_23118", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "18", height: "18", children: /* @__PURE__ */ p("rect", { width: "18", height: "18", fill: "#D9D9D9" }) }),
      /* @__PURE__ */ p("g", { mask: "url(#mask0_444_23118)", children: /* @__PURE__ */ p(
        "path",
        {
          d: "M5.8498 13.4998C5.47855 13.4998 5.16074 13.3676 4.89637 13.1032C4.63199 12.8389 4.4998 12.5211 4.4998 12.1498V3.1498C4.4998 2.77855 4.63199 2.46074 4.89637 2.19637C5.16074 1.93199 5.47855 1.7998 5.8498 1.7998H14.8498C15.2211 1.7998 15.5389 1.93199 15.8032 2.19637C16.0676 2.46074 16.1998 2.77855 16.1998 3.1498V12.1498C16.1998 12.5211 16.0676 12.8389 15.8032 13.1032C15.5389 13.3676 15.2211 13.4998 14.8498 13.4998H5.8498ZM5.8498 12.1498H14.8498V3.1498H5.8498V12.1498ZM3.1498 16.1998C2.77855 16.1998 2.46074 16.0676 2.19637 15.8032C1.93199 15.5389 1.7998 15.2211 1.7998 14.8498V4.4998H3.1498V14.8498H13.4998V16.1998H3.1498Z",
          fill: r
        }
      ) })
    ]
  }
), Hs = ({
  mode: e,
  headerName: t,
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
        /* @__PURE__ */ p(Ls, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ p("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, zs = ({
  headerName: e,
  mode: t,
  isCollapsed: n,
  isModalOpen: r,
  onClose: i,
  onToggleFullscreen: a,
  onToggleCollapse: o
}) => {
  const s = () => t === "modal" && r && i ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: i,
      title: "Close chat",
      children: /* @__PURE__ */ p(Os, { size: 20 })
    }
  ) : null, c = () => {
    if ((t === "sidebar" || t === "fullscreen") && !n && a) {
      const l = t === "fullscreen";
      return /* @__PURE__ */ p(
        "button",
        {
          className: l ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: a,
          title: l ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ p(Ds, { size: 20, isFullscreen: l })
        }
      );
    }
    return null;
  }, u = () => (t === "sidebar" || t === "fullscreen") && !n && o ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: o,
      title: "Collapse chat",
      children: /* @__PURE__ */ p(Ps, { size: 20 })
    }
  ) : null;
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ p("h2", { className: "chat-wrapper__title", children: e }) }),
    /* @__PURE__ */ I("div", { className: "chat-wrapper__header-controls", children: [
      c(),
      u(),
      s()
    ] })
  ] });
};
class Us extends Error {
  /**
   * Create an assertion error.
   *
   * @param {string} message
   *   Message explaining error.
   * @param {unknown} actual
   *   Value.
   * @param {unknown} expected
   *   Baseline.
   * @param {string} operator
   *   Name of equality operation.
   * @param {boolean} generated
   *   Whether `message` is a custom message or not
   * @returns
   *   Instance.
   */
  // eslint-disable-next-line max-params
  constructor(n, r, i, a, o) {
    super(n);
    X(
      this,
      "name",
      /** @type {const} */
      "Assertion"
    );
    X(
      this,
      "code",
      /** @type {const} */
      "ERR_ASSERTION"
    );
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.actual = r, this.expected = i, this.generated = o, this.operator = a;
  }
}
function k(e, t) {
  ma(
    !!e,
    !1,
    !0,
    "ok",
    "Expected value to be truthy",
    t
  );
}
function kr(e) {
  ma(!1, !1, !0, "ok", "Unreachable", e);
}
function ma(e, t, n, r, i, a) {
  if (!e)
    throw a instanceof Error ? a : new Us(
      a || i,
      t,
      n,
      r,
      !a
    );
}
function Bs(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Gs = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Vs = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ws = {};
function fi(e, t) {
  return (Ws.jsx ? Vs : Gs).test(e);
}
const js = /[ \t\n\f\r]/g;
function $s(e) {
  return typeof e == "object" ? e.type === "text" ? gi(e.value) : !1 : gi(e);
}
function gi(e) {
  return e.replace(js, "") === "";
}
class yn {
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
yn.prototype.normal = {};
yn.prototype.property = {};
yn.prototype.space = void 0;
function Ca(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new yn(n, r, t);
}
function Sr(e) {
  return e.toLowerCase();
}
class st {
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
st.prototype.attribute = "";
st.prototype.booleanish = !1;
st.prototype.boolean = !1;
st.prototype.commaOrSpaceSeparated = !1;
st.prototype.commaSeparated = !1;
st.prototype.defined = !1;
st.prototype.mustUseProperty = !1;
st.prototype.number = !1;
st.prototype.overloadedBoolean = !1;
st.prototype.property = "";
st.prototype.spaceSeparated = !1;
st.prototype.space = void 0;
let qs = 0;
const oe = jt(), Fe = jt(), Tr = jt(), N = jt(), Ee = jt(), Yt = jt(), ct = jt();
function jt() {
  return 2 ** ++qs;
}
const Er = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: oe,
  booleanish: Fe,
  commaOrSpaceSeparated: ct,
  commaSeparated: Yt,
  number: N,
  overloadedBoolean: Tr,
  spaceSeparated: Ee
}, Symbol.toStringTag, { value: "Module" })), rr = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Er)
);
class Or extends st {
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
    if (super(t, n), mi(this, "space", i), typeof r == "number")
      for (; ++a < rr.length; ) {
        const o = rr[a];
        mi(this, rr[a], (r & Er[o]) === Er[o]);
      }
  }
}
Or.prototype.defined = !0;
function mi(e, t, n) {
  n && (e[t] = n);
}
function en(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new Or(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[Sr(r)] = r, n[Sr(a.attribute)] = r;
  }
  return new yn(t, n, e.space);
}
const ya = en({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Fe,
    ariaAutoComplete: null,
    ariaBusy: Fe,
    ariaChecked: Fe,
    ariaColCount: N,
    ariaColIndex: N,
    ariaColSpan: N,
    ariaControls: Ee,
    ariaCurrent: null,
    ariaDescribedBy: Ee,
    ariaDetails: null,
    ariaDisabled: Fe,
    ariaDropEffect: Ee,
    ariaErrorMessage: null,
    ariaExpanded: Fe,
    ariaFlowTo: Ee,
    ariaGrabbed: Fe,
    ariaHasPopup: null,
    ariaHidden: Fe,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: Ee,
    ariaLevel: N,
    ariaLive: null,
    ariaModal: Fe,
    ariaMultiLine: Fe,
    ariaMultiSelectable: Fe,
    ariaOrientation: null,
    ariaOwns: Ee,
    ariaPlaceholder: null,
    ariaPosInSet: N,
    ariaPressed: Fe,
    ariaReadOnly: Fe,
    ariaRelevant: null,
    ariaRequired: Fe,
    ariaRoleDescription: Ee,
    ariaRowCount: N,
    ariaRowIndex: N,
    ariaRowSpan: N,
    ariaSelected: Fe,
    ariaSetSize: N,
    ariaSort: null,
    ariaValueMax: N,
    ariaValueMin: N,
    ariaValueNow: N,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function wa(e, t) {
  return t in e ? e[t] : t;
}
function ka(e, t) {
  return wa(e, t.toLowerCase());
}
const Zs = en({
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
    accept: Yt,
    acceptCharset: Ee,
    accessKey: Ee,
    action: null,
    allow: null,
    allowFullScreen: oe,
    allowPaymentRequest: oe,
    allowUserMedia: oe,
    alt: null,
    as: null,
    async: oe,
    autoCapitalize: null,
    autoComplete: Ee,
    autoFocus: oe,
    autoPlay: oe,
    blocking: Ee,
    capture: null,
    charSet: null,
    checked: oe,
    cite: null,
    className: Ee,
    cols: N,
    colSpan: null,
    content: null,
    contentEditable: Fe,
    controls: oe,
    controlsList: Ee,
    coords: N | Yt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: oe,
    defer: oe,
    dir: null,
    dirName: null,
    disabled: oe,
    download: Tr,
    draggable: Fe,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: oe,
    formTarget: null,
    headers: Ee,
    height: N,
    hidden: Tr,
    high: N,
    href: null,
    hrefLang: null,
    htmlFor: Ee,
    httpEquiv: Ee,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: oe,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: oe,
    itemId: null,
    itemProp: Ee,
    itemRef: Ee,
    itemScope: oe,
    itemType: Ee,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: oe,
    low: N,
    manifest: null,
    max: null,
    maxLength: N,
    media: null,
    method: null,
    min: null,
    minLength: N,
    multiple: oe,
    muted: oe,
    name: null,
    nonce: null,
    noModule: oe,
    noValidate: oe,
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
    open: oe,
    optimum: N,
    pattern: null,
    ping: Ee,
    placeholder: null,
    playsInline: oe,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: oe,
    referrerPolicy: null,
    rel: Ee,
    required: oe,
    reversed: oe,
    rows: N,
    rowSpan: N,
    sandbox: Ee,
    scope: null,
    scoped: oe,
    seamless: oe,
    selected: oe,
    shadowRootClonable: oe,
    shadowRootDelegatesFocus: oe,
    shadowRootMode: null,
    shape: null,
    size: N,
    sizes: null,
    slot: null,
    span: N,
    spellCheck: Fe,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: N,
    step: null,
    style: null,
    tabIndex: N,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: oe,
    useMap: null,
    value: Fe,
    width: N,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: Ee,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: N,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: N,
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
    compact: oe,
    // Lists. Use CSS to reduce space between items instead
    declare: oe,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: N,
    // `<img>` and `<object>`
    leftMargin: N,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: N,
    // `<body>`
    marginWidth: N,
    // `<body>`
    noResize: oe,
    // `<frame>`
    noHref: oe,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: oe,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: oe,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: N,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: Fe,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: N,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: N,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: oe,
    disableRemotePlayback: oe,
    prefix: null,
    property: null,
    results: N,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: ka
}), Ks = en({
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
    about: ct,
    accentHeight: N,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: N,
    amplitude: N,
    arabicForm: null,
    ascent: N,
    attributeName: null,
    attributeType: null,
    azimuth: N,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: N,
    by: null,
    calcMode: null,
    capHeight: N,
    className: Ee,
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
    descent: N,
    diffuseConstant: N,
    direction: null,
    display: null,
    dur: null,
    divisor: N,
    dominantBaseline: null,
    download: oe,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: N,
    enableBackground: null,
    end: null,
    event: null,
    exponent: N,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: N,
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
    g1: Yt,
    g2: Yt,
    glyphName: Yt,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: N,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: N,
    horizOriginX: N,
    horizOriginY: N,
    id: null,
    ideographic: N,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: N,
    k: N,
    k1: N,
    k2: N,
    k3: N,
    k4: N,
    kernelMatrix: ct,
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
    limitingConeAngle: N,
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
    mediaSize: N,
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
    overlinePosition: N,
    overlineThickness: N,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: N,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: Ee,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: N,
    pointsAtY: N,
    pointsAtZ: N,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: ct,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: ct,
    rev: ct,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: ct,
    requiredFeatures: ct,
    requiredFonts: ct,
    requiredFormats: ct,
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
    specularConstant: N,
    specularExponent: N,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: N,
    strikethroughThickness: N,
    string: null,
    stroke: null,
    strokeDashArray: ct,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: N,
    strokeOpacity: N,
    strokeWidth: null,
    style: null,
    surfaceScale: N,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: ct,
    tabIndex: N,
    tableValues: null,
    target: null,
    targetX: N,
    targetY: N,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: ct,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: N,
    underlineThickness: N,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: N,
    values: null,
    vAlphabetic: N,
    vMathematical: N,
    vectorEffect: null,
    vHanging: N,
    vIdeographic: N,
    version: null,
    vertAdvY: N,
    vertOriginX: N,
    vertOriginY: N,
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
    xHeight: N,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: wa
}), Sa = en({
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
}), Ta = en({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: ka
}), Ea = en({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), Xs = {
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
}, Ys = /[A-Z]/g, Ci = /-[a-z]/g, Js = /^data[-\w.:]+$/i;
function Qs(e, t) {
  const n = Sr(t);
  let r = t, i = st;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Js.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(Ci, tl);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!Ci.test(a)) {
        let o = a.replace(Ys, el);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    i = Or;
  }
  return new i(r, t);
}
function el(e) {
  return "-" + e.toLowerCase();
}
function tl(e) {
  return e.charAt(1).toUpperCase();
}
const nl = Ca([ya, Zs, Sa, Ta, Ea], "html"), Dr = Ca([ya, Ks, Sa, Ta, Ea], "svg");
function rl(e) {
  return e.join(" ").trim();
}
var Un = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Pr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Fr = {}, yi = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, il = /\n/g, al = /^\s*/, ol = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, sl = /^:\s*/, ll = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, cl = /^[;\s]*/, ul = /^\s+|\s+$/g, dl = `
`, wi = "/", ki = "*", Wt = "", hl = "comment", pl = "declaration", fl = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(T) {
    var S = T.match(il);
    S && (n += S.length);
    var A = T.lastIndexOf(dl);
    r = ~A ? T.length - A : r + T.length;
  }
  function a() {
    var T = { line: n, column: r };
    return function(S) {
      return S.position = new o(T), u(), S;
    };
  }
  function o(T) {
    this.start = T, this.end = { line: n, column: r }, this.source = t.source;
  }
  o.prototype.content = e;
  function s(T) {
    var S = new Error(
      t.source + ":" + n + ":" + r + ": " + T
    );
    if (S.reason = T, S.filename = t.source, S.line = n, S.column = r, S.source = e, !t.silent) throw S;
  }
  function c(T) {
    var S = T.exec(e);
    if (S) {
      var A = S[0];
      return i(A), e = e.slice(A.length), S;
    }
  }
  function u() {
    c(al);
  }
  function l(T) {
    var S;
    for (T = T || []; S = f(); )
      S !== !1 && T.push(S);
    return T;
  }
  function f() {
    var T = a();
    if (!(wi != e.charAt(0) || ki != e.charAt(1))) {
      for (var S = 2; Wt != e.charAt(S) && (ki != e.charAt(S) || wi != e.charAt(S + 1)); )
        ++S;
      if (S += 2, Wt === e.charAt(S - 1))
        return s("End of comment missing");
      var A = e.slice(2, S - 2);
      return r += 2, i(A), e = e.slice(S), r += 2, T({
        type: hl,
        comment: A
      });
    }
  }
  function m() {
    var T = a(), S = c(ol);
    if (S) {
      if (f(), !c(sl)) return s("property missing ':'");
      var A = c(ll), E = T({
        type: pl,
        property: Si(S[0].replace(yi, Wt)),
        value: A ? Si(A[0].replace(yi, Wt)) : Wt
      });
      return c(cl), E;
    }
  }
  function g() {
    var T = [];
    l(T);
    for (var S; S = m(); )
      S !== !1 && (T.push(S), l(T));
    return T;
  }
  return u(), g();
};
function Si(e) {
  return e ? e.replace(ul, Wt) : Wt;
}
var gl = Un && Un.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.default = Cl;
const ml = gl(fl);
function Cl(e, t) {
  let n = null;
  if (!e || typeof e != "string")
    return n;
  const r = (0, ml.default)(e), i = typeof t == "function";
  return r.forEach((a) => {
    if (a.type !== "declaration")
      return;
    const { property: o, value: s } = a;
    i ? t(o, s, a) : s && (n = n || {}, n[o] = s);
  }), n;
}
var Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.camelCase = void 0;
var yl = /^--[a-zA-Z0-9_-]+$/, wl = /-([a-z])/g, kl = /^[^-]+$/, Sl = /^-(webkit|moz|ms|o|khtml)-/, Tl = /^-(ms)-/, El = function(e) {
  return !e || kl.test(e) || yl.test(e);
}, xl = function(e, t) {
  return t.toUpperCase();
}, Ti = function(e, t) {
  return "".concat(t, "-");
}, bl = function(e, t) {
  return t === void 0 && (t = {}), El(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Tl, Ti) : e = e.replace(Sl, Ti), e.replace(wl, xl));
};
Wn.camelCase = bl;
var _l = Un && Un.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, vl = _l(Fr), Rl = Wn;
function xr(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, vl.default)(e, function(r, i) {
    r && i && (n[(0, Rl.camelCase)(r, t)] = i);
  }), n;
}
xr.default = xr;
var Il = xr;
const Ml = /* @__PURE__ */ Pr(Il), xa = ba("end"), Hr = ba("start");
function ba(e) {
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
function Al(e) {
  const t = Hr(e), n = xa(e);
  if (t && n)
    return { start: t, end: n };
}
function pn(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Ei(e.position) : "start" in e || "end" in e ? Ei(e) : "line" in e || "column" in e ? br(e) : "";
}
function br(e) {
  return xi(e && e.line) + ":" + xi(e && e.column);
}
function Ei(e) {
  return br(e && e.start) + "-" + br(e && e.end);
}
function xi(e) {
  return e && typeof e == "number" ? e : 1;
}
class Xe extends Error {
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
      const c = r.indexOf(":");
      c === -1 ? a.ruleId = r : (a.source = r.slice(0, c), a.ruleId = r.slice(c + 1));
    }
    if (!a.place && a.ancestors && a.ancestors) {
      const c = a.ancestors[a.ancestors.length - 1];
      c && (a.place = c.position);
    }
    const s = a.place && "start" in a.place ? a.place.start : a.place;
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = s ? s.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = s ? s.line : void 0, this.name = pn(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = o && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Xe.prototype.file = "";
Xe.prototype.name = "";
Xe.prototype.reason = "";
Xe.prototype.message = "";
Xe.prototype.stack = "";
Xe.prototype.column = void 0;
Xe.prototype.line = void 0;
Xe.prototype.ancestors = void 0;
Xe.prototype.cause = void 0;
Xe.prototype.fatal = void 0;
Xe.prototype.place = void 0;
Xe.prototype.ruleId = void 0;
Xe.prototype.source = void 0;
const zr = {}.hasOwnProperty, Nl = /* @__PURE__ */ new Map(), Ll = /[A-Z]/g, Ol = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Dl = /* @__PURE__ */ new Set(["td", "th"]), _a = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Pl(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Wl(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Vl(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? Dr : nl,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = va(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function va(e, t, n) {
  if (t.type === "element")
    return Fl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return Hl(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return Ul(e, t, n);
  if (t.type === "mdxjsEsm")
    return zl(e, t);
  if (t.type === "root")
    return Bl(e, t, n);
  if (t.type === "text")
    return Gl(e, t);
}
function Fl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Dr, e.schema = i), e.ancestors.push(t);
  const a = Ia(e, t.tagName, !1), o = jl(e, t);
  let s = Br(e, t);
  return Ol.has(t.tagName) && (s = s.filter(function(c) {
    return typeof c == "string" ? !$s(c) : !0;
  })), Ra(e, o, a, t), Ur(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function Hl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return k(r.type === "ExpressionStatement"), /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Cn(e, t.position);
}
function zl(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Cn(e, t.position);
}
function Ul(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = Dr, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : Ia(e, t.name, !0), o = $l(e, t), s = Br(e, t);
  return Ra(e, o, a, t), Ur(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function Bl(e, t, n) {
  const r = {};
  return Ur(r, Br(e, t)), e.create(t, e.Fragment, r, n);
}
function Gl(e, t) {
  return t.value;
}
function Ra(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function Ur(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function Vl(e, t, n) {
  return r;
  function r(i, a, o, s) {
    const u = Array.isArray(o.children) ? n : t;
    return s ? u(a, o, s) : u(a, o);
  }
}
function Wl(e, t) {
  return n;
  function n(r, i, a, o) {
    const s = Array.isArray(a.children), c = Hr(r);
    return t(
      i,
      a,
      o,
      s,
      {
        columnNumber: c ? c.column - 1 : void 0,
        fileName: e,
        lineNumber: c ? c.line : void 0
      },
      void 0
    );
  }
}
function jl(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && zr.call(t.properties, i)) {
      const a = ql(e, i, t.properties[i]);
      if (a) {
        const [o, s] = a;
        e.tableCellAlignToStyle && o === "align" && typeof s == "string" && Dl.has(t.tagName) ? r = s : n[o] = s;
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
function $l(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const a = r.data.estree.body[0];
        k(a.type === "ExpressionStatement");
        const o = a.expression;
        k(o.type === "ObjectExpression");
        const s = o.properties[0];
        k(s.type === "SpreadElement"), Object.assign(
          n,
          e.evaluater.evaluateExpression(s.argument)
        );
      } else
        Cn(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const s = r.value.data.estree.body[0];
          k(s.type === "ExpressionStatement"), a = e.evaluater.evaluateExpression(s.expression);
        } else
          Cn(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function Br(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Nl;
  for (; ++r < t.children.length; ) {
    const a = t.children[r];
    let o;
    if (e.passKeys) {
      const c = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (c) {
        const u = i.get(c) || 0;
        o = c + "-" + u, i.set(c, u + 1);
      }
    }
    const s = va(e, a, o);
    s !== void 0 && n.push(s);
  }
  return n;
}
function ql(e, t, n) {
  const r = Qs(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Bs(n) : rl(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Zl(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Kl(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Xs[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Zl(e, t) {
  try {
    return Ml(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new Xe("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = _a + "#cannot-parse-style-attribute", i;
  }
}
function Ia(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let a = -1, o;
    for (; ++a < i.length; ) {
      const s = fi(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
      o = o ? {
        type: "MemberExpression",
        object: o,
        property: s,
        computed: !!(a && s.type === "Literal"),
        optional: !1
      } : s;
    }
    k(o, "always a result"), r = o;
  } else
    r = fi(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return zr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Cn(e);
}
function Cn(e, t) {
  const n = new Xe(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = _a + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Kl(e) {
  const t = {};
  let n;
  for (n in e)
    zr.call(e, n) && (t[Xl(n)] = e[n]);
  return t;
}
function Xl(e) {
  let t = e.replace(Ll, Yl);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Yl(e) {
  return "-" + e.toLowerCase();
}
const ir = {
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
}, Jl = {};
function Ql(e, t) {
  const n = Jl, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Ma(e, r, i);
}
function Ma(e, t, n) {
  if (ec(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return bi(e.children, t, n);
  }
  return Array.isArray(e) ? bi(e, t, n) : "";
}
function bi(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Ma(e[i], t, n);
  return r.join("");
}
function ec(e) {
  return !!(e && typeof e == "object");
}
const _i = document.createElement("i");
function Gr(e) {
  const t = "&" + e + ";";
  _i.innerHTML = t;
  const n = _i.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
const h = (
  /** @type {const} */
  {
    carriageReturn: -5,
    lineFeed: -4,
    carriageReturnLineFeed: -3,
    horizontalTab: -2,
    virtualSpace: -1,
    eof: null,
    nul: 0,
    ht: 9,
    // `\t`
    lf: 10,
    // `\n`
    vt: 11,
    // `\v`
    cr: 13,
    // `\r`
    space: 32,
    exclamationMark: 33,
    // `!`
    quotationMark: 34,
    // `"`
    numberSign: 35,
    // `#`
    percentSign: 37,
    // `%`
    ampersand: 38,
    // `&`
    apostrophe: 39,
    // `'`
    leftParenthesis: 40,
    // `(`
    rightParenthesis: 41,
    // `)`
    asterisk: 42,
    // `*`
    plusSign: 43,
    // `+`
    dash: 45,
    // `-`
    dot: 46,
    // `.`
    slash: 47,
    // `/`
    digit0: 48,
    // `0`
    digit1: 49,
    // `1`
    digit2: 50,
    // `2`
    digit3: 51,
    // `3`
    digit4: 52,
    // `4`
    digit5: 53,
    // `5`
    digit6: 54,
    // `6`
    digit7: 55,
    // `7`
    digit8: 56,
    // `8`
    digit9: 57,
    // `9`
    colon: 58,
    // `:`
    semicolon: 59,
    // `;`
    lessThan: 60,
    // `<`
    equalsTo: 61,
    // `=`
    greaterThan: 62,
    // `>`
    questionMark: 63,
    // `?`
    atSign: 64,
    // `@`
    uppercaseX: 88,
    // `X`
    leftSquareBracket: 91,
    // `[`
    backslash: 92,
    // `\`
    rightSquareBracket: 93,
    // `]`
    caret: 94,
    // `^`
    underscore: 95,
    // `_`
    graveAccent: 96,
    // `` ` ``
    lowercaseX: 120,
    // `x`
    tilde: 126,
    // `~`
    del: 127,
    // Unicode Specials block.
    byteOrderMarker: 65279,
    // Unicode Specials block.
    replacementCharacter: 65533
    // `�`
  }
), z = (
  /** @type {const} */
  {
    atxHeadingOpeningFenceSizeMax: 6,
    // 6 number signs is fine, 7 isn’t.
    autolinkDomainSizeMax: 63,
    // 63 characters is fine, 64 is too many.
    autolinkSchemeSizeMax: 32,
    // 32 characters is fine, 33 is too many.
    cdataOpeningString: "CDATA[",
    // And preceded by `<![`.
    characterGroupPunctuation: 2,
    // Symbol used to indicate a character is punctuation
    characterGroupWhitespace: 1,
    // Symbol used to indicate a character is whitespace
    characterReferenceDecimalSizeMax: 7,
    // `&#9999999;`.
    characterReferenceHexadecimalSizeMax: 6,
    // `&#xff9999;`.
    characterReferenceNamedSizeMax: 31,
    // `&CounterClockwiseContourIntegral;`.
    codeFencedSequenceSizeMin: 3,
    // At least 3 ticks or tildes are needed.
    contentTypeContent: "content",
    contentTypeFlow: "flow",
    contentTypeString: "string",
    contentTypeText: "text",
    hardBreakPrefixSizeMin: 2,
    // At least 2 trailing spaces are needed.
    htmlBasic: 6,
    // Symbol for `<div`
    htmlCdata: 5,
    // Symbol for `<![CDATA[]]>`
    htmlComment: 2,
    // Symbol for `<!---->`
    htmlComplete: 7,
    // Symbol for `<x>`
    htmlDeclaration: 4,
    // Symbol for `<!doctype>`
    htmlInstruction: 3,
    // Symbol for `<?php?>`
    htmlRawSizeMax: 8,
    // Length of `textarea`.
    htmlRaw: 1,
    // Symbol for `<script>`
    linkResourceDestinationBalanceMax: 32,
    // See: <https://spec.commonmark.org/0.30/#link-destination>, <https://github.com/remarkjs/react-markdown/issues/658#issuecomment-984345577>
    linkReferenceSizeMax: 999,
    // See: <https://spec.commonmark.org/0.30/#link-label>
    listItemValueSizeMax: 10,
    // See: <https://spec.commonmark.org/0.30/#ordered-list-marker>
    numericBaseDecimal: 10,
    numericBaseHexadecimal: 16,
    tabSize: 4,
    // Tabs have a hard-coded size of 4, per CommonMark.
    thematicBreakMarkerCountMin: 3,
    // At least 3 asterisks, dashes, or underscores are needed.
    v8MaxSafeChunkSize: 1e4
    // V8 (and potentially others) have problems injecting giant arrays into other arrays, hence we operate in chunks.
  }
), d = (
  /** @type {const} */
  {
    // Generic type for data, such as in a title, a destination, etc.
    data: "data",
    // Generic type for syntactic whitespace (tabs, virtual spaces, spaces).
    // Such as, between a fenced code fence and an info string.
    whitespace: "whitespace",
    // Generic type for line endings (line feed, carriage return, carriage return +
    // line feed).
    lineEnding: "lineEnding",
    // A line ending, but ending a blank line.
    lineEndingBlank: "lineEndingBlank",
    // Generic type for whitespace (tabs, virtual spaces, spaces) at the start of a
    // line.
    linePrefix: "linePrefix",
    // Generic type for whitespace (tabs, virtual spaces, spaces) at the end of a
    // line.
    lineSuffix: "lineSuffix",
    // Whole ATX heading:
    //
    // ```markdown
    // #
    // ## Alpha
    // ### Bravo ###
    // ```
    //
    // Includes `atxHeadingSequence`, `whitespace`, `atxHeadingText`.
    atxHeading: "atxHeading",
    // Sequence of number signs in an ATX heading (`###`).
    atxHeadingSequence: "atxHeadingSequence",
    // Content in an ATX heading (`alpha`).
    // Includes text.
    atxHeadingText: "atxHeadingText",
    // Whole autolink (`<https://example.com>` or `<admin@example.com>`)
    // Includes `autolinkMarker` and `autolinkProtocol` or `autolinkEmail`.
    autolink: "autolink",
    // Email autolink w/o markers (`admin@example.com`)
    autolinkEmail: "autolinkEmail",
    // Marker around an `autolinkProtocol` or `autolinkEmail` (`<` or `>`).
    autolinkMarker: "autolinkMarker",
    // Protocol autolink w/o markers (`https://example.com`)
    autolinkProtocol: "autolinkProtocol",
    // A whole character escape (`\-`).
    // Includes `escapeMarker` and `characterEscapeValue`.
    characterEscape: "characterEscape",
    // The escaped character (`-`).
    characterEscapeValue: "characterEscapeValue",
    // A whole character reference (`&amp;`, `&#8800;`, or `&#x1D306;`).
    // Includes `characterReferenceMarker`, an optional
    // `characterReferenceMarkerNumeric`, in which case an optional
    // `characterReferenceMarkerHexadecimal`, and a `characterReferenceValue`.
    characterReference: "characterReference",
    // The start or end marker (`&` or `;`).
    characterReferenceMarker: "characterReferenceMarker",
    // Mark reference as numeric (`#`).
    characterReferenceMarkerNumeric: "characterReferenceMarkerNumeric",
    // Mark reference as numeric (`x` or `X`).
    characterReferenceMarkerHexadecimal: "characterReferenceMarkerHexadecimal",
    // Value of character reference w/o markers (`amp`, `8800`, or `1D306`).
    characterReferenceValue: "characterReferenceValue",
    // Whole fenced code:
    //
    // ````markdown
    // ```js
    // alert(1)
    // ```
    // ````
    codeFenced: "codeFenced",
    // A fenced code fence, including whitespace, sequence, info, and meta
    // (` ```js `).
    codeFencedFence: "codeFencedFence",
    // Sequence of grave accent or tilde characters (` ``` `) in a fence.
    codeFencedFenceSequence: "codeFencedFenceSequence",
    // Info word (`js`) in a fence.
    // Includes string.
    codeFencedFenceInfo: "codeFencedFenceInfo",
    // Meta words (`highlight="1"`) in a fence.
    // Includes string.
    codeFencedFenceMeta: "codeFencedFenceMeta",
    // A line of code.
    codeFlowValue: "codeFlowValue",
    // Whole indented code:
    //
    // ```markdown
    //     alert(1)
    // ```
    //
    // Includes `lineEnding`, `linePrefix`, and `codeFlowValue`.
    codeIndented: "codeIndented",
    // A text code (``` `alpha` ```).
    // Includes `codeTextSequence`, `codeTextData`, `lineEnding`, and can include
    // `codeTextPadding`.
    codeText: "codeText",
    codeTextData: "codeTextData",
    // A space or line ending right after or before a tick.
    codeTextPadding: "codeTextPadding",
    // A text code fence (` `` `).
    codeTextSequence: "codeTextSequence",
    // Whole content:
    //
    // ```markdown
    // [a]: b
    // c
    // =
    // d
    // ```
    //
    // Includes `paragraph` and `definition`.
    content: "content",
    // Whole definition:
    //
    // ```markdown
    // [micromark]: https://github.com/micromark/micromark
    // ```
    //
    // Includes `definitionLabel`, `definitionMarker`, `whitespace`,
    // `definitionDestination`, and optionally `lineEnding` and `definitionTitle`.
    definition: "definition",
    // Destination of a definition (`https://github.com/micromark/micromark` or
    // `<https://github.com/micromark/micromark>`).
    // Includes `definitionDestinationLiteral` or `definitionDestinationRaw`.
    definitionDestination: "definitionDestination",
    // Enclosed destination of a definition
    // (`<https://github.com/micromark/micromark>`).
    // Includes `definitionDestinationLiteralMarker` and optionally
    // `definitionDestinationString`.
    definitionDestinationLiteral: "definitionDestinationLiteral",
    // Markers of an enclosed definition destination (`<` or `>`).
    definitionDestinationLiteralMarker: "definitionDestinationLiteralMarker",
    // Unenclosed destination of a definition
    // (`https://github.com/micromark/micromark`).
    // Includes `definitionDestinationString`.
    definitionDestinationRaw: "definitionDestinationRaw",
    // Text in an destination (`https://github.com/micromark/micromark`).
    // Includes string.
    definitionDestinationString: "definitionDestinationString",
    // Label of a definition (`[micromark]`).
    // Includes `definitionLabelMarker` and `definitionLabelString`.
    definitionLabel: "definitionLabel",
    // Markers of a definition label (`[` or `]`).
    definitionLabelMarker: "definitionLabelMarker",
    // Value of a definition label (`micromark`).
    // Includes string.
    definitionLabelString: "definitionLabelString",
    // Marker between a label and a destination (`:`).
    definitionMarker: "definitionMarker",
    // Title of a definition (`"x"`, `'y'`, or `(z)`).
    // Includes `definitionTitleMarker` and optionally `definitionTitleString`.
    definitionTitle: "definitionTitle",
    // Marker around a title of a definition (`"`, `'`, `(`, or `)`).
    definitionTitleMarker: "definitionTitleMarker",
    // Data without markers in a title (`z`).
    // Includes string.
    definitionTitleString: "definitionTitleString",
    // Emphasis (`*alpha*`).
    // Includes `emphasisSequence` and `emphasisText`.
    emphasis: "emphasis",
    // Sequence of emphasis markers (`*` or `_`).
    emphasisSequence: "emphasisSequence",
    // Emphasis text (`alpha`).
    // Includes text.
    emphasisText: "emphasisText",
    // The character escape marker (`\`).
    escapeMarker: "escapeMarker",
    // A hard break created with a backslash (`\\n`).
    // Note: does not include the line ending.
    hardBreakEscape: "hardBreakEscape",
    // A hard break created with trailing spaces (`  \n`).
    // Does not include the line ending.
    hardBreakTrailing: "hardBreakTrailing",
    // Flow HTML:
    //
    // ```markdown
    // <div
    // ```
    //
    // Inlcudes `lineEnding`, `htmlFlowData`.
    htmlFlow: "htmlFlow",
    htmlFlowData: "htmlFlowData",
    // HTML in text (the tag in `a <i> b`).
    // Includes `lineEnding`, `htmlTextData`.
    htmlText: "htmlText",
    htmlTextData: "htmlTextData",
    // Whole image (`![alpha](bravo)`, `![alpha][bravo]`, `![alpha][]`, or
    // `![alpha]`).
    // Includes `label` and an optional `resource` or `reference`.
    image: "image",
    // Whole link label (`[*alpha*]`).
    // Includes `labelLink` or `labelImage`, `labelText`, and `labelEnd`.
    label: "label",
    // Text in an label (`*alpha*`).
    // Includes text.
    labelText: "labelText",
    // Start a link label (`[`).
    // Includes a `labelMarker`.
    labelLink: "labelLink",
    // Start an image label (`![`).
    // Includes `labelImageMarker` and `labelMarker`.
    labelImage: "labelImage",
    // Marker of a label (`[` or `]`).
    labelMarker: "labelMarker",
    // Marker to start an image (`!`).
    labelImageMarker: "labelImageMarker",
    // End a label (`]`).
    // Includes `labelMarker`.
    labelEnd: "labelEnd",
    // Whole link (`[alpha](bravo)`, `[alpha][bravo]`, `[alpha][]`, or `[alpha]`).
    // Includes `label` and an optional `resource` or `reference`.
    link: "link",
    // Whole paragraph:
    //
    // ```markdown
    // alpha
    // bravo.
    // ```
    //
    // Includes text.
    paragraph: "paragraph",
    // A reference (`[alpha]` or `[]`).
    // Includes `referenceMarker` and an optional `referenceString`.
    reference: "reference",
    // A reference marker (`[` or `]`).
    referenceMarker: "referenceMarker",
    // Reference text (`alpha`).
    // Includes string.
    referenceString: "referenceString",
    // A resource (`(https://example.com "alpha")`).
    // Includes `resourceMarker`, an optional `resourceDestination` with an optional
    // `whitespace` and `resourceTitle`.
    resource: "resource",
    // A resource destination (`https://example.com`).
    // Includes `resourceDestinationLiteral` or `resourceDestinationRaw`.
    resourceDestination: "resourceDestination",
    // A literal resource destination (`<https://example.com>`).
    // Includes `resourceDestinationLiteralMarker` and optionally
    // `resourceDestinationString`.
    resourceDestinationLiteral: "resourceDestinationLiteral",
    // A resource destination marker (`<` or `>`).
    resourceDestinationLiteralMarker: "resourceDestinationLiteralMarker",
    // A raw resource destination (`https://example.com`).
    // Includes `resourceDestinationString`.
    resourceDestinationRaw: "resourceDestinationRaw",
    // Resource destination text (`https://example.com`).
    // Includes string.
    resourceDestinationString: "resourceDestinationString",
    // A resource marker (`(` or `)`).
    resourceMarker: "resourceMarker",
    // A resource title (`"alpha"`, `'alpha'`, or `(alpha)`).
    // Includes `resourceTitleMarker` and optionally `resourceTitleString`.
    resourceTitle: "resourceTitle",
    // A resource title marker (`"`, `'`, `(`, or `)`).
    resourceTitleMarker: "resourceTitleMarker",
    // Resource destination title (`alpha`).
    // Includes string.
    resourceTitleString: "resourceTitleString",
    // Whole setext heading:
    //
    // ```markdown
    // alpha
    // bravo
    // =====
    // ```
    //
    // Includes `setextHeadingText`, `lineEnding`, `linePrefix`, and
    // `setextHeadingLine`.
    setextHeading: "setextHeading",
    // Content in a setext heading (`alpha\nbravo`).
    // Includes text.
    setextHeadingText: "setextHeadingText",
    // Underline in a setext heading, including whitespace suffix (`==`).
    // Includes `setextHeadingLineSequence`.
    setextHeadingLine: "setextHeadingLine",
    // Sequence of equals or dash characters in underline in a setext heading (`-`).
    setextHeadingLineSequence: "setextHeadingLineSequence",
    // Strong (`**alpha**`).
    // Includes `strongSequence` and `strongText`.
    strong: "strong",
    // Sequence of strong markers (`**` or `__`).
    strongSequence: "strongSequence",
    // Strong text (`alpha`).
    // Includes text.
    strongText: "strongText",
    // Whole thematic break:
    //
    // ```markdown
    // * * *
    // ```
    //
    // Includes `thematicBreakSequence` and `whitespace`.
    thematicBreak: "thematicBreak",
    // A sequence of one or more thematic break markers (`***`).
    thematicBreakSequence: "thematicBreakSequence",
    // Whole block quote:
    //
    // ```markdown
    // > a
    // >
    // > b
    // ```
    //
    // Includes `blockQuotePrefix` and flow.
    blockQuote: "blockQuote",
    // The `>` or `> ` of a block quote.
    blockQuotePrefix: "blockQuotePrefix",
    // The `>` of a block quote prefix.
    blockQuoteMarker: "blockQuoteMarker",
    // The optional ` ` of a block quote prefix.
    blockQuotePrefixWhitespace: "blockQuotePrefixWhitespace",
    // Whole ordered list:
    //
    // ```markdown
    // 1. a
    //    b
    // ```
    //
    // Includes `listItemPrefix`, flow, and optionally  `listItemIndent` on further
    // lines.
    listOrdered: "listOrdered",
    // Whole unordered list:
    //
    // ```markdown
    // - a
    //   b
    // ```
    //
    // Includes `listItemPrefix`, flow, and optionally  `listItemIndent` on further
    // lines.
    listUnordered: "listUnordered",
    // The indent of further list item lines.
    listItemIndent: "listItemIndent",
    // A marker, as in, `*`, `+`, `-`, `.`, or `)`.
    listItemMarker: "listItemMarker",
    // The thing that starts a list item, such as `1. `.
    // Includes `listItemValue` if ordered, `listItemMarker`, and
    // `listItemPrefixWhitespace` (unless followed by a line ending).
    listItemPrefix: "listItemPrefix",
    // The whitespace after a marker.
    listItemPrefixWhitespace: "listItemPrefixWhitespace",
    // The numerical value of an ordered item.
    listItemValue: "listItemValue",
    chunkContent: "chunkContent",
    chunkFlow: "chunkFlow",
    chunkText: "chunkText",
    chunkString: "chunkString"
  }
), Et = (
  /** @type {const} */
  {
    ht: "	",
    lf: `
`,
    cr: "\r",
    space: " ",
    replacementCharacter: "�"
  }
);
function vt(e, t, n, r) {
  const i = e.length;
  let a = 0, o;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < z.v8MaxSafeChunkSize)
    o = Array.from(r), o.unshift(t, n), e.splice(...o);
  else
    for (n && e.splice(t, n); a < r.length; )
      o = r.slice(
        a,
        a + z.v8MaxSafeChunkSize
      ), o.unshift(t, 0), e.splice(...o), a += z.v8MaxSafeChunkSize, t += z.v8MaxSafeChunkSize;
}
function pt(e, t) {
  return e.length > 0 ? (vt(e, e.length, 0, t), e) : t;
}
const vi = {}.hasOwnProperty;
function tc(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    nc(t, e[n]);
  return t;
}
function nc(e, t) {
  let n;
  for (n in t) {
    const i = (vi.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let o;
    if (a)
      for (o in a) {
        vi.call(i, o) || (i[o] = []);
        const s = a[o];
        rc(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(s) ? s : s ? [s] : []
        );
      }
  }
}
function rc(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  vt(e, 0, 0, r);
}
function Aa(e, t) {
  const n = Number.parseInt(e, t);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < h.ht || n === h.vt || n > h.cr && n < h.space || // Control character (DEL) of C0, and C1 controls.
    n > h.tilde && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? Et.replacementCharacter : String.fromCodePoint(n)
  );
}
function Jt(e) {
  return e.replace(/[\t\n\r ]+/g, Et.space).replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const _t = zt(/[A-Za-z]/), dt = zt(/[\dA-Za-z]/), ic = zt(/[#-'*+\--9=?A-Z^-~]/);
function _r(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < h.space || e === h.del)
  );
}
const vr = zt(/\d/), ac = zt(/[\dA-Fa-f]/), oc = zt(/[!-/:-@[-`{-~]/);
function j(e) {
  return e !== null && e < h.horizontalTab;
}
function ot(e) {
  return e !== null && (e < h.nul || e === h.space);
}
function me(e) {
  return e === h.horizontalTab || e === h.virtualSpace || e === h.space;
}
const sc = zt(new RegExp("\\p{P}|\\p{S}", "u")), lc = zt(/\s/);
function zt(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function tn(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let o = "";
    if (a === h.percentSign && dt(e.charCodeAt(n + 1)) && dt(e.charCodeAt(n + 2)))
      i = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (o = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const s = e.charCodeAt(n + 1);
      a < 56320 && s > 56319 && s < 57344 ? (o = String.fromCharCode(a, s), i = 1) : o = Et.replacementCharacter;
    } else
      o = String.fromCharCode(a);
    o && (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, o = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function xe(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return o;
  function o(c) {
    return me(c) ? (e.enter(n), s(c)) : t(c);
  }
  function s(c) {
    return me(c) && a++ < i ? (e.consume(c), s) : (e.exit(n), t(c));
  }
}
const cc = { tokenize: uc };
function uc(e) {
  const t = e.attempt(
    this.parser.constructs.contentInitial,
    r,
    i
  );
  let n;
  return t;
  function r(s) {
    if (k(
      s === h.eof || j(s),
      "expected eol or eof"
    ), s === h.eof) {
      e.consume(s);
      return;
    }
    return e.enter(d.lineEnding), e.consume(s), e.exit(d.lineEnding), xe(e, t, d.linePrefix);
  }
  function i(s) {
    return k(
      s !== h.eof && !j(s),
      "expected anything other than a line ending or EOF"
    ), e.enter(d.paragraph), a(s);
  }
  function a(s) {
    const c = e.enter(d.chunkText, {
      contentType: z.contentTypeText,
      previous: n
    });
    return n && (n.next = c), n = c, o(s);
  }
  function o(s) {
    if (s === h.eof) {
      e.exit(d.chunkText), e.exit(d.paragraph), e.consume(s);
      return;
    }
    return j(s) ? (e.consume(s), e.exit(d.chunkText), a) : (e.consume(s), o);
  }
}
const dc = { tokenize: hc }, Ri = { tokenize: pc };
function hc(e) {
  const t = this, n = [];
  let r = 0, i, a, o;
  return s;
  function s(D) {
    if (r < n.length) {
      const O = n[r];
      return t.containerState = O[1], k(
        O[0].continuation,
        "expected `continuation` to be defined on container construct"
      ), e.attempt(
        O[0].continuation,
        c,
        u
      )(D);
    }
    return u(D);
  }
  function c(D) {
    if (k(
      t.containerState,
      "expected `containerState` to be defined after continuation"
    ), r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && R();
      const O = t.events.length;
      let P = O, _;
      for (; P--; )
        if (t.events[P][0] === "exit" && t.events[P][1].type === d.chunkFlow) {
          _ = t.events[P][1].end;
          break;
        }
      k(_, "could not find previous flow chunk"), E(r);
      let B = O;
      for (; B < t.events.length; )
        t.events[B][1].end = { ..._ }, B++;
      return vt(
        t.events,
        P + 1,
        0,
        t.events.slice(O)
      ), t.events.length = B, u(D);
    }
    return s(D);
  }
  function u(D) {
    if (r === n.length) {
      if (!i)
        return m(D);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return T(D);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(
      Ri,
      l,
      f
    )(D);
  }
  function l(D) {
    return i && R(), E(r), m(D);
  }
  function f(D) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, T(D);
  }
  function m(D) {
    return t.containerState = {}, e.attempt(
      Ri,
      g,
      T
    )(D);
  }
  function g(D) {
    return k(
      t.currentConstruct,
      "expected `currentConstruct` to be defined on tokenizer"
    ), k(
      t.containerState,
      "expected `containerState` to be defined on tokenizer"
    ), r++, n.push([t.currentConstruct, t.containerState]), m(D);
  }
  function T(D) {
    if (D === h.eof) {
      i && R(), E(0), e.consume(D);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter(d.chunkFlow, {
      _tokenizer: i,
      contentType: z.contentTypeFlow,
      previous: a
    }), S(D);
  }
  function S(D) {
    if (D === h.eof) {
      A(e.exit(d.chunkFlow), !0), E(0), e.consume(D);
      return;
    }
    return j(D) ? (e.consume(D), A(e.exit(d.chunkFlow)), r = 0, t.interrupt = void 0, s) : (e.consume(D), S);
  }
  function A(D, O) {
    k(i, "expected `childFlow` to be defined when continuing");
    const P = t.sliceStream(D);
    if (O && P.push(null), D.previous = a, a && (a.next = D), a = D, i.defineSkip(D.start), i.write(P), t.parser.lazy[D.start.line]) {
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
      let Q = B, $, Z;
      for (; Q--; )
        if (t.events[Q][0] === "exit" && t.events[Q][1].type === d.chunkFlow) {
          if ($) {
            Z = t.events[Q][1].end;
            break;
          }
          $ = !0;
        }
      for (k(Z, "could not find previous flow chunk"), E(r), _ = B; _ < t.events.length; )
        t.events[_][1].end = { ...Z }, _++;
      vt(
        t.events,
        Q + 1,
        0,
        t.events.slice(B)
      ), t.events.length = _;
    }
  }
  function E(D) {
    let O = n.length;
    for (; O-- > D; ) {
      const P = n[O];
      t.containerState = P[1], k(
        P[0].exit,
        "expected `exit` to be defined on container construct"
      ), P[0].exit.call(t, e);
    }
    n.length = D;
  }
  function R() {
    k(
      t.containerState,
      "expected `containerState` to be defined when closing flow"
    ), k(i, "expected `childFlow` to be defined when closing it"), i.write([h.eof]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function pc(e, t, n) {
  return k(
    this.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), xe(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    d.linePrefix,
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : z.tabSize
  );
}
function Ii(e) {
  if (e === h.eof || ot(e) || lc(e))
    return z.characterGroupWhitespace;
  if (sc(e))
    return z.characterGroupPunctuation;
}
function Vr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const Rr = {
  name: "attention",
  resolveAll: fc,
  tokenize: gc
};
function fc(e, t) {
  let n = -1, r, i, a, o, s, c, u, l;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const f = { ...e[r][1].end }, m = { ...e[n][1].start };
          Mi(f, -c), Mi(m, c), o = {
            type: c > 1 ? d.strongSequence : d.emphasisSequence,
            start: f,
            end: { ...e[r][1].end }
          }, s = {
            type: c > 1 ? d.strongSequence : d.emphasisSequence,
            start: { ...e[n][1].start },
            end: m
          }, a = {
            type: c > 1 ? d.strongText : d.emphasisText,
            start: { ...e[r][1].end },
            end: { ...e[n][1].start }
          }, i = {
            type: c > 1 ? d.strong : d.emphasis,
            start: { ...o.start },
            end: { ...s.end }
          }, e[r][1].end = { ...o.start }, e[n][1].start = { ...s.end }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = pt(u, [
            ["enter", e[r][1], t],
            ["exit", e[r][1], t]
          ])), u = pt(u, [
            ["enter", i, t],
            ["enter", o, t],
            ["exit", o, t],
            ["enter", a, t]
          ]), k(
            t.parser.constructs.insideSpan.null,
            "expected `insideSpan` to be populated"
          ), u = pt(
            u,
            Vr(
              t.parser.constructs.insideSpan.null,
              e.slice(r + 1, n),
              t
            )
          ), u = pt(u, [
            ["exit", a, t],
            ["enter", s, t],
            ["exit", s, t],
            ["exit", i, t]
          ]), e[n][1].end.offset - e[n][1].start.offset ? (l = 2, u = pt(u, [
            ["enter", e[n][1], t],
            ["exit", e[n][1], t]
          ])) : l = 0, vt(e, r - 1, n - r + 3, u), n = r + u.length - l - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function gc(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Ii(r);
  let a;
  return o;
  function o(c) {
    return k(
      c === h.asterisk || c === h.underscore,
      "expected asterisk or underscore"
    ), a = c, e.enter("attentionSequence"), s(c);
  }
  function s(c) {
    if (c === a)
      return e.consume(c), s;
    const u = e.exit("attentionSequence"), l = Ii(c);
    k(n, "expected `attentionMarkers` to be populated");
    const f = !l || l === z.characterGroupPunctuation && i || n.includes(c), m = !i || i === z.characterGroupPunctuation && l || n.includes(r);
    return u._open = !!(a === h.asterisk ? f : f && (i || !m)), u._close = !!(a === h.asterisk ? m : m && (l || !f)), t(c);
  }
}
function Mi(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const mc = { name: "autolink", tokenize: Cc };
function Cc(e, t, n) {
  let r = 0;
  return i;
  function i(g) {
    return k(g === h.lessThan, "expected `<`"), e.enter(d.autolink), e.enter(d.autolinkMarker), e.consume(g), e.exit(d.autolinkMarker), e.enter(d.autolinkProtocol), a;
  }
  function a(g) {
    return _t(g) ? (e.consume(g), o) : g === h.atSign ? n(g) : u(g);
  }
  function o(g) {
    return g === h.plusSign || g === h.dash || g === h.dot || dt(g) ? (r = 1, s(g)) : u(g);
  }
  function s(g) {
    return g === h.colon ? (e.consume(g), r = 0, c) : (g === h.plusSign || g === h.dash || g === h.dot || dt(g)) && r++ < z.autolinkSchemeSizeMax ? (e.consume(g), s) : (r = 0, u(g));
  }
  function c(g) {
    return g === h.greaterThan ? (e.exit(d.autolinkProtocol), e.enter(d.autolinkMarker), e.consume(g), e.exit(d.autolinkMarker), e.exit(d.autolink), t) : g === h.eof || g === h.space || g === h.lessThan || _r(g) ? n(g) : (e.consume(g), c);
  }
  function u(g) {
    return g === h.atSign ? (e.consume(g), l) : ic(g) ? (e.consume(g), u) : n(g);
  }
  function l(g) {
    return dt(g) ? f(g) : n(g);
  }
  function f(g) {
    return g === h.dot ? (e.consume(g), r = 0, l) : g === h.greaterThan ? (e.exit(d.autolinkProtocol).type = d.autolinkEmail, e.enter(d.autolinkMarker), e.consume(g), e.exit(d.autolinkMarker), e.exit(d.autolink), t) : m(g);
  }
  function m(g) {
    if ((g === h.dash || dt(g)) && r++ < z.autolinkDomainSizeMax) {
      const T = g === h.dash ? m : f;
      return e.consume(g), T;
    }
    return n(g);
  }
}
const jn = { partial: !0, tokenize: yc };
function yc(e, t, n) {
  return r;
  function r(a) {
    return me(a) ? xe(e, i, d.linePrefix)(a) : i(a);
  }
  function i(a) {
    return a === h.eof || j(a) ? t(a) : n(a);
  }
}
const Na = {
  continuation: { tokenize: kc },
  exit: Sc,
  name: "blockQuote",
  tokenize: wc
};
function wc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    if (o === h.greaterThan) {
      const s = r.containerState;
      return k(s, "expected `containerState` to be defined in container"), s.open || (e.enter(d.blockQuote, { _container: !0 }), s.open = !0), e.enter(d.blockQuotePrefix), e.enter(d.blockQuoteMarker), e.consume(o), e.exit(d.blockQuoteMarker), a;
    }
    return n(o);
  }
  function a(o) {
    return me(o) ? (e.enter(d.blockQuotePrefixWhitespace), e.consume(o), e.exit(d.blockQuotePrefixWhitespace), e.exit(d.blockQuotePrefix), t) : (e.exit(d.blockQuotePrefix), t(o));
  }
}
function kc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return me(o) ? (k(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), xe(
      e,
      a,
      d.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : z.tabSize
    )(o)) : a(o);
  }
  function a(o) {
    return e.attempt(Na, t, n)(o);
  }
}
function Sc(e) {
  e.exit(d.blockQuote);
}
const La = {
  name: "characterEscape",
  tokenize: Tc
};
function Tc(e, t, n) {
  return r;
  function r(a) {
    return k(a === h.backslash, "expected `\\`"), e.enter(d.characterEscape), e.enter(d.escapeMarker), e.consume(a), e.exit(d.escapeMarker), i;
  }
  function i(a) {
    return oc(a) ? (e.enter(d.characterEscapeValue), e.consume(a), e.exit(d.characterEscapeValue), e.exit(d.characterEscape), t) : n(a);
  }
}
const Oa = {
  name: "characterReference",
  tokenize: Ec
};
function Ec(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return s;
  function s(f) {
    return k(f === h.ampersand, "expected `&`"), e.enter(d.characterReference), e.enter(d.characterReferenceMarker), e.consume(f), e.exit(d.characterReferenceMarker), c;
  }
  function c(f) {
    return f === h.numberSign ? (e.enter(d.characterReferenceMarkerNumeric), e.consume(f), e.exit(d.characterReferenceMarkerNumeric), u) : (e.enter(d.characterReferenceValue), a = z.characterReferenceNamedSizeMax, o = dt, l(f));
  }
  function u(f) {
    return f === h.uppercaseX || f === h.lowercaseX ? (e.enter(d.characterReferenceMarkerHexadecimal), e.consume(f), e.exit(d.characterReferenceMarkerHexadecimal), e.enter(d.characterReferenceValue), a = z.characterReferenceHexadecimalSizeMax, o = ac, l) : (e.enter(d.characterReferenceValue), a = z.characterReferenceDecimalSizeMax, o = vr, l(f));
  }
  function l(f) {
    if (f === h.semicolon && i) {
      const m = e.exit(d.characterReferenceValue);
      return o === dt && !Gr(r.sliceSerialize(m)) ? n(f) : (e.enter(d.characterReferenceMarker), e.consume(f), e.exit(d.characterReferenceMarker), e.exit(d.characterReference), t);
    }
    return o(f) && i++ < a ? (e.consume(f), l) : n(f);
  }
}
const Ai = {
  partial: !0,
  tokenize: bc
}, Ni = {
  concrete: !0,
  name: "codeFenced",
  tokenize: xc
};
function xc(e, t, n) {
  const r = this, i = { partial: !0, tokenize: P };
  let a = 0, o = 0, s;
  return c;
  function c(_) {
    return u(_);
  }
  function u(_) {
    k(
      _ === h.graveAccent || _ === h.tilde,
      "expected `` ` `` or `~`"
    );
    const B = r.events[r.events.length - 1];
    return a = B && B[1].type === d.linePrefix ? B[2].sliceSerialize(B[1], !0).length : 0, s = _, e.enter(d.codeFenced), e.enter(d.codeFencedFence), e.enter(d.codeFencedFenceSequence), l(_);
  }
  function l(_) {
    return _ === s ? (o++, e.consume(_), l) : o < z.codeFencedSequenceSizeMin ? n(_) : (e.exit(d.codeFencedFenceSequence), me(_) ? xe(e, f, d.whitespace)(_) : f(_));
  }
  function f(_) {
    return _ === h.eof || j(_) ? (e.exit(d.codeFencedFence), r.interrupt ? t(_) : e.check(Ai, S, O)(_)) : (e.enter(d.codeFencedFenceInfo), e.enter(d.chunkString, { contentType: z.contentTypeString }), m(_));
  }
  function m(_) {
    return _ === h.eof || j(_) ? (e.exit(d.chunkString), e.exit(d.codeFencedFenceInfo), f(_)) : me(_) ? (e.exit(d.chunkString), e.exit(d.codeFencedFenceInfo), xe(e, g, d.whitespace)(_)) : _ === h.graveAccent && _ === s ? n(_) : (e.consume(_), m);
  }
  function g(_) {
    return _ === h.eof || j(_) ? f(_) : (e.enter(d.codeFencedFenceMeta), e.enter(d.chunkString, { contentType: z.contentTypeString }), T(_));
  }
  function T(_) {
    return _ === h.eof || j(_) ? (e.exit(d.chunkString), e.exit(d.codeFencedFenceMeta), f(_)) : _ === h.graveAccent && _ === s ? n(_) : (e.consume(_), T);
  }
  function S(_) {
    return k(j(_), "expected eol"), e.attempt(i, O, A)(_);
  }
  function A(_) {
    return k(j(_), "expected eol"), e.enter(d.lineEnding), e.consume(_), e.exit(d.lineEnding), E;
  }
  function E(_) {
    return a > 0 && me(_) ? xe(
      e,
      R,
      d.linePrefix,
      a + 1
    )(_) : R(_);
  }
  function R(_) {
    return _ === h.eof || j(_) ? e.check(Ai, S, O)(_) : (e.enter(d.codeFlowValue), D(_));
  }
  function D(_) {
    return _ === h.eof || j(_) ? (e.exit(d.codeFlowValue), R(_)) : (e.consume(_), D);
  }
  function O(_) {
    return e.exit(d.codeFenced), t(_);
  }
  function P(_, B, Q) {
    let $ = 0;
    return Z;
    function Z(G) {
      return k(j(G), "expected eol"), _.enter(d.lineEnding), _.consume(G), _.exit(d.lineEnding), W;
    }
    function W(G) {
      return k(
        r.parser.constructs.disable.null,
        "expected `disable.null` to be populated"
      ), _.enter(d.codeFencedFence), me(G) ? xe(
        _,
        J,
        d.linePrefix,
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : z.tabSize
      )(G) : J(G);
    }
    function J(G) {
      return G === s ? (_.enter(d.codeFencedFenceSequence), M(G)) : Q(G);
    }
    function M(G) {
      return G === s ? ($++, _.consume(G), M) : $ >= o ? (_.exit(d.codeFencedFenceSequence), me(G) ? xe(_, F, d.whitespace)(G) : F(G)) : Q(G);
    }
    function F(G) {
      return G === h.eof || j(G) ? (_.exit(d.codeFencedFence), B(G)) : Q(G);
    }
  }
}
function bc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === h.eof ? n(o) : (k(j(o), "expected eol"), e.enter(d.lineEnding), e.consume(o), e.exit(d.lineEnding), a);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
const ar = {
  name: "codeIndented",
  tokenize: vc
}, _c = { partial: !0, tokenize: Rc };
function vc(e, t, n) {
  const r = this;
  return i;
  function i(u) {
    return k(me(u)), e.enter(d.codeIndented), xe(
      e,
      a,
      d.linePrefix,
      z.tabSize + 1
    )(u);
  }
  function a(u) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === d.linePrefix && l[2].sliceSerialize(l[1], !0).length >= z.tabSize ? o(u) : n(u);
  }
  function o(u) {
    return u === h.eof ? c(u) : j(u) ? e.attempt(_c, o, c)(u) : (e.enter(d.codeFlowValue), s(u));
  }
  function s(u) {
    return u === h.eof || j(u) ? (e.exit(d.codeFlowValue), o(u)) : (e.consume(u), s);
  }
  function c(u) {
    return e.exit(d.codeIndented), t(u);
  }
}
function Rc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : j(o) ? (e.enter(d.lineEnding), e.consume(o), e.exit(d.lineEnding), i) : xe(
      e,
      a,
      d.linePrefix,
      z.tabSize + 1
    )(o);
  }
  function a(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === d.linePrefix && s[2].sliceSerialize(s[1], !0).length >= z.tabSize ? t(o) : j(o) ? i(o) : n(o);
  }
}
const Ic = {
  name: "codeText",
  previous: Da,
  resolve: Mc,
  tokenize: Ac
};
function Mc(e) {
  let t = e.length - 4, n = 3, r, i;
  if ((e[n][1].type === d.lineEnding || e[n][1].type === "space") && (e[t][1].type === d.lineEnding || e[t][1].type === "space")) {
    for (r = n; ++r < t; )
      if (e[r][1].type === d.codeTextData) {
        e[n][1].type = d.codeTextPadding, e[t][1].type = d.codeTextPadding, n += 2, t -= 2;
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    i === void 0 ? r !== t && e[r][1].type !== d.lineEnding && (i = r) : (r === t || e[r][1].type === d.lineEnding) && (e[i][1].type = d.codeTextData, r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function Da(e) {
  return e !== h.graveAccent || this.events[this.events.length - 1][1].type === d.characterEscape;
}
function Ac(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return s;
  function s(m) {
    return k(m === h.graveAccent, "expected `` ` ``"), k(Da.call(r, r.previous), "expected correct previous"), e.enter(d.codeText), e.enter(d.codeTextSequence), c(m);
  }
  function c(m) {
    return m === h.graveAccent ? (e.consume(m), i++, c) : (e.exit(d.codeTextSequence), u(m));
  }
  function u(m) {
    return m === h.eof ? n(m) : m === h.space ? (e.enter("space"), e.consume(m), e.exit("space"), u) : m === h.graveAccent ? (o = e.enter(d.codeTextSequence), a = 0, f(m)) : j(m) ? (e.enter(d.lineEnding), e.consume(m), e.exit(d.lineEnding), u) : (e.enter(d.codeTextData), l(m));
  }
  function l(m) {
    return m === h.eof || m === h.space || m === h.graveAccent || j(m) ? (e.exit(d.codeTextData), u(m)) : (e.consume(m), l);
  }
  function f(m) {
    return m === h.graveAccent ? (e.consume(m), a++, f) : a === i ? (e.exit(d.codeTextSequence), e.exit(d.codeText), t(m)) : (o.type = d.codeTextData, l(m));
  }
}
class Nc {
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
      throw new RangeError(
        "Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`"
      );
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
    return r < this.left.length ? this.left.slice(t, r) : t > this.left.length ? this.right.slice(
      this.right.length - r + this.left.length,
      this.right.length - t + this.left.length
    ).reverse() : this.left.slice(t).concat(
      this.right.slice(this.right.length - r + this.left.length).reverse()
    );
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
    const a = this.right.splice(
      this.right.length - i,
      Number.POSITIVE_INFINITY
    );
    return r && dn(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), dn(this.left, t);
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
    this.setCursor(0), dn(this.right, t.reverse());
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
        dn(this.right, n.reverse());
      } else {
        const n = this.right.splice(
          this.left.length + this.right.length - t,
          Number.POSITIVE_INFINITY
        );
        dn(this.left, n.reverse());
      }
  }
}
function dn(e, t) {
  let n = 0;
  if (t.length < z.v8MaxSafeChunkSize)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(
        ...t.slice(n, n + z.v8MaxSafeChunkSize)
      ), n += z.v8MaxSafeChunkSize;
}
function Pa(e) {
  const t = {};
  let n = -1, r, i, a, o, s, c, u;
  const l = new Nc(e);
  for (; ++n < l.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = l.get(n), n && r[1].type === d.chunkFlow && l.get(n - 1)[1].type === d.listItemPrefix && (k(r[1]._tokenizer, "expected `_tokenizer` on subtokens"), c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === d.lineEndingBlank && (a += 2), a < c.length && c[a][1].type === d.content))
      for (; ++a < c.length && c[a][1].type !== d.content; )
        c[a][1].type === d.chunkText && (c[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, Lc(l, n)), n = t[n], u = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (o = l.get(a), o[1].type === d.lineEnding || o[1].type === d.lineEndingBlank)
          o[0] === "enter" && (i && (l.get(i)[1].type = d.lineEndingBlank), o[1].type = d.lineEnding, i = a);
        else if (!(o[1].type === d.linePrefix || o[1].type === d.listItemIndent)) break;
      i && (r[1].end = { ...l.get(i)[1].start }, s = l.slice(i, n), s.unshift(r), l.splice(i, n - i + 1, s));
    }
  }
  return vt(e, 0, Number.POSITIVE_INFINITY, l.slice(0)), !u;
}
function Lc(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  k(n.contentType, "expected `contentType` on subtokens");
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const s = o.events, c = [], u = {};
  let l, f, m = -1, g = n, T = 0, S = 0;
  const A = [S];
  for (; g; ) {
    for (; e.get(++i)[1] !== g; )
      ;
    k(
      !f || g.previous === f,
      "expected previous to match"
    ), k(!f || f.next === g, "expected next to match"), a.push(i), g._tokenizer || (l = r.sliceStream(g), g.next || l.push(h.eof), f && o.defineSkip(g.start), g._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(l), g._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), f = g, g = g.next;
  }
  for (g = n; ++m < s.length; )
    // Find a void token that includes a break.
    s[m][0] === "exit" && s[m - 1][0] === "enter" && s[m][1].type === s[m - 1][1].type && s[m][1].start.line !== s[m][1].end.line && (k(g, "expected a current token"), S = m + 1, A.push(S), g._tokenizer = void 0, g.previous = void 0, g = g.next);
  for (o.events = [], g ? (g._tokenizer = void 0, g.previous = void 0, k(!g.next, "expected no next token")) : A.pop(), m = A.length; m--; ) {
    const E = s.slice(A[m], A[m + 1]), R = a.pop();
    k(R !== void 0, "expected a start position when splicing"), c.push([R, R + E.length - 1]), e.splice(R, 2, E);
  }
  for (c.reverse(), m = -1; ++m < c.length; )
    u[T + c[m][0]] = T + c[m][1], T += c[m][1] - c[m][0] - 1;
  return u;
}
const Oc = { resolve: Pc, tokenize: Fc }, Dc = { partial: !0, tokenize: Hc };
function Pc(e) {
  return Pa(e), e;
}
function Fc(e, t) {
  let n;
  return r;
  function r(s) {
    return k(
      s !== h.eof && !j(s),
      "expected no eof or eol"
    ), e.enter(d.content), n = e.enter(d.chunkContent, {
      contentType: z.contentTypeContent
    }), i(s);
  }
  function i(s) {
    return s === h.eof ? a(s) : j(s) ? e.check(
      Dc,
      o,
      a
    )(s) : (e.consume(s), i);
  }
  function a(s) {
    return e.exit(d.chunkContent), e.exit(d.content), t(s);
  }
  function o(s) {
    return k(j(s), "expected eol"), e.consume(s), e.exit(d.chunkContent), k(n, "expected previous token"), n.next = e.enter(d.chunkContent, {
      contentType: z.contentTypeContent,
      previous: n
    }), n = n.next, i;
  }
}
function Hc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return k(j(o), "expected a line ending"), e.exit(d.chunkContent), e.enter(d.lineEnding), e.consume(o), e.exit(d.lineEnding), xe(e, a, d.linePrefix);
  }
  function a(o) {
    if (o === h.eof || j(o))
      return n(o);
    k(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    );
    const s = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && s && s[1].type === d.linePrefix && s[2].sliceSerialize(s[1], !0).length >= z.tabSize ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function Fa(e, t, n, r, i, a, o, s, c) {
  const u = c || Number.POSITIVE_INFINITY;
  let l = 0;
  return f;
  function f(E) {
    return E === h.lessThan ? (e.enter(r), e.enter(i), e.enter(a), e.consume(E), e.exit(a), m) : E === h.eof || E === h.space || E === h.rightParenthesis || _r(E) ? n(E) : (e.enter(r), e.enter(o), e.enter(s), e.enter(d.chunkString, { contentType: z.contentTypeString }), S(E));
  }
  function m(E) {
    return E === h.greaterThan ? (e.enter(a), e.consume(E), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter(d.chunkString, { contentType: z.contentTypeString }), g(E));
  }
  function g(E) {
    return E === h.greaterThan ? (e.exit(d.chunkString), e.exit(s), m(E)) : E === h.eof || E === h.lessThan || j(E) ? n(E) : (e.consume(E), E === h.backslash ? T : g);
  }
  function T(E) {
    return E === h.lessThan || E === h.greaterThan || E === h.backslash ? (e.consume(E), g) : g(E);
  }
  function S(E) {
    return !l && (E === h.eof || E === h.rightParenthesis || ot(E)) ? (e.exit(d.chunkString), e.exit(s), e.exit(o), e.exit(r), t(E)) : l < u && E === h.leftParenthesis ? (e.consume(E), l++, S) : E === h.rightParenthesis ? (e.consume(E), l--, S) : E === h.eof || E === h.space || E === h.leftParenthesis || _r(E) ? n(E) : (e.consume(E), E === h.backslash ? A : S);
  }
  function A(E) {
    return E === h.leftParenthesis || E === h.rightParenthesis || E === h.backslash ? (e.consume(E), S) : S(E);
  }
}
function Ha(e, t, n, r, i, a) {
  const o = this;
  let s = 0, c;
  return u;
  function u(g) {
    return k(g === h.leftSquareBracket, "expected `[`"), e.enter(r), e.enter(i), e.consume(g), e.exit(i), e.enter(a), l;
  }
  function l(g) {
    return s > z.linkReferenceSizeMax || g === h.eof || g === h.leftSquareBracket || g === h.rightSquareBracket && !c || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    g === h.caret && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(g) : g === h.rightSquareBracket ? (e.exit(a), e.enter(i), e.consume(g), e.exit(i), e.exit(r), t) : j(g) ? (e.enter(d.lineEnding), e.consume(g), e.exit(d.lineEnding), l) : (e.enter(d.chunkString, { contentType: z.contentTypeString }), f(g));
  }
  function f(g) {
    return g === h.eof || g === h.leftSquareBracket || g === h.rightSquareBracket || j(g) || s++ > z.linkReferenceSizeMax ? (e.exit(d.chunkString), l(g)) : (e.consume(g), c || (c = !me(g)), g === h.backslash ? m : f);
  }
  function m(g) {
    return g === h.leftSquareBracket || g === h.backslash || g === h.rightSquareBracket ? (e.consume(g), s++, f) : f(g);
  }
}
function za(e, t, n, r, i, a) {
  let o;
  return s;
  function s(m) {
    return m === h.quotationMark || m === h.apostrophe || m === h.leftParenthesis ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), o = m === h.leftParenthesis ? h.rightParenthesis : m, c) : n(m);
  }
  function c(m) {
    return m === o ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), t) : (e.enter(a), u(m));
  }
  function u(m) {
    return m === o ? (e.exit(a), c(o)) : m === h.eof ? n(m) : j(m) ? (e.enter(d.lineEnding), e.consume(m), e.exit(d.lineEnding), xe(e, u, d.linePrefix)) : (e.enter(d.chunkString, { contentType: z.contentTypeString }), l(m));
  }
  function l(m) {
    return m === o || m === h.eof || j(m) ? (e.exit(d.chunkString), u(m)) : (e.consume(m), m === h.backslash ? f : l);
  }
  function f(m) {
    return m === o || m === h.backslash ? (e.consume(m), l) : l(m);
  }
}
function fn(e, t) {
  let n;
  return r;
  function r(i) {
    return j(i) ? (e.enter(d.lineEnding), e.consume(i), e.exit(d.lineEnding), n = !0, r) : me(i) ? xe(
      e,
      r,
      n ? d.linePrefix : d.lineSuffix
    )(i) : t(i);
  }
}
const zc = { name: "definition", tokenize: Bc }, Uc = { partial: !0, tokenize: Gc };
function Bc(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(g) {
    return e.enter(d.definition), o(g);
  }
  function o(g) {
    return k(g === h.leftSquareBracket, "expected `[`"), Ha.call(
      r,
      e,
      s,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      d.definitionLabel,
      d.definitionLabelMarker,
      d.definitionLabelString
    )(g);
  }
  function s(g) {
    return i = Jt(
      r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
    ), g === h.colon ? (e.enter(d.definitionMarker), e.consume(g), e.exit(d.definitionMarker), c) : n(g);
  }
  function c(g) {
    return ot(g) ? fn(e, u)(g) : u(g);
  }
  function u(g) {
    return Fa(
      e,
      l,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      d.definitionDestination,
      d.definitionDestinationLiteral,
      d.definitionDestinationLiteralMarker,
      d.definitionDestinationRaw,
      d.definitionDestinationString
    )(g);
  }
  function l(g) {
    return e.attempt(Uc, f, f)(g);
  }
  function f(g) {
    return me(g) ? xe(e, m, d.whitespace)(g) : m(g);
  }
  function m(g) {
    return g === h.eof || j(g) ? (e.exit(d.definition), r.parser.defined.push(i), t(g)) : n(g);
  }
}
function Gc(e, t, n) {
  return r;
  function r(s) {
    return ot(s) ? fn(e, i)(s) : n(s);
  }
  function i(s) {
    return za(
      e,
      a,
      n,
      d.definitionTitle,
      d.definitionTitleMarker,
      d.definitionTitleString
    )(s);
  }
  function a(s) {
    return me(s) ? xe(
      e,
      o,
      d.whitespace
    )(s) : o(s);
  }
  function o(s) {
    return s === h.eof || j(s) ? t(s) : n(s);
  }
}
const Vc = {
  name: "hardBreakEscape",
  tokenize: Wc
};
function Wc(e, t, n) {
  return r;
  function r(a) {
    return k(a === h.backslash, "expected `\\`"), e.enter(d.hardBreakEscape), e.consume(a), i;
  }
  function i(a) {
    return j(a) ? (e.exit(d.hardBreakEscape), t(a)) : n(a);
  }
}
const jc = {
  name: "headingAtx",
  resolve: $c,
  tokenize: qc
};
function $c(e, t) {
  let n = e.length - 2, r = 3, i, a;
  return e[r][1].type === d.whitespace && (r += 2), n - 2 > r && e[n][1].type === d.whitespace && (n -= 2), e[n][1].type === d.atxHeadingSequence && (r === n - 1 || n - 4 > r && e[n - 2][1].type === d.whitespace) && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: d.atxHeadingText,
    start: e[r][1].start,
    end: e[n][1].end
  }, a = {
    type: d.chunkText,
    start: e[r][1].start,
    end: e[n][1].end,
    contentType: z.contentTypeText
  }, vt(e, r, n - r + 1, [
    ["enter", i, t],
    ["enter", a, t],
    ["exit", a, t],
    ["exit", i, t]
  ])), e;
}
function qc(e, t, n) {
  let r = 0;
  return i;
  function i(l) {
    return e.enter(d.atxHeading), a(l);
  }
  function a(l) {
    return k(l === h.numberSign, "expected `#`"), e.enter(d.atxHeadingSequence), o(l);
  }
  function o(l) {
    return l === h.numberSign && r++ < z.atxHeadingOpeningFenceSizeMax ? (e.consume(l), o) : l === h.eof || ot(l) ? (e.exit(d.atxHeadingSequence), s(l)) : n(l);
  }
  function s(l) {
    return l === h.numberSign ? (e.enter(d.atxHeadingSequence), c(l)) : l === h.eof || j(l) ? (e.exit(d.atxHeading), t(l)) : me(l) ? xe(e, s, d.whitespace)(l) : (e.enter(d.atxHeadingText), u(l));
  }
  function c(l) {
    return l === h.numberSign ? (e.consume(l), c) : (e.exit(d.atxHeadingSequence), s(l));
  }
  function u(l) {
    return l === h.eof || l === h.numberSign || ot(l) ? (e.exit(d.atxHeadingText), s(l)) : (e.consume(l), u);
  }
}
const Zc = [
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
], Li = ["pre", "script", "style", "textarea"], Kc = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Jc,
  tokenize: Qc
}, Xc = { partial: !0, tokenize: tu }, Yc = {
  partial: !0,
  tokenize: eu
};
function Jc(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === d.htmlFlow); )
    ;
  return t > 1 && e[t - 2][1].type === d.linePrefix && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Qc(e, t, n) {
  const r = this;
  let i, a, o, s, c;
  return u;
  function u(C) {
    return l(C);
  }
  function l(C) {
    return k(C === h.lessThan, "expected `<`"), e.enter(d.htmlFlow), e.enter(d.htmlFlowData), e.consume(C), f;
  }
  function f(C) {
    return C === h.exclamationMark ? (e.consume(C), m) : C === h.slash ? (e.consume(C), a = !0, S) : C === h.questionMark ? (e.consume(C), i = z.htmlInstruction, r.interrupt ? t : y) : _t(C) ? (k(C !== null), e.consume(C), o = String.fromCharCode(C), A) : n(C);
  }
  function m(C) {
    return C === h.dash ? (e.consume(C), i = z.htmlComment, g) : C === h.leftSquareBracket ? (e.consume(C), i = z.htmlCdata, s = 0, T) : _t(C) ? (e.consume(C), i = z.htmlDeclaration, r.interrupt ? t : y) : n(C);
  }
  function g(C) {
    return C === h.dash ? (e.consume(C), r.interrupt ? t : y) : n(C);
  }
  function T(C) {
    const H = z.cdataOpeningString;
    return C === H.charCodeAt(s++) ? (e.consume(C), s === H.length ? r.interrupt ? t : J : T) : n(C);
  }
  function S(C) {
    return _t(C) ? (k(C !== null), e.consume(C), o = String.fromCharCode(C), A) : n(C);
  }
  function A(C) {
    if (C === h.eof || C === h.slash || C === h.greaterThan || ot(C)) {
      const H = C === h.slash, V = o.toLowerCase();
      return !H && !a && Li.includes(V) ? (i = z.htmlRaw, r.interrupt ? t(C) : J(C)) : Zc.includes(o.toLowerCase()) ? (i = z.htmlBasic, H ? (e.consume(C), E) : r.interrupt ? t(C) : J(C)) : (i = z.htmlComplete, r.interrupt && !r.parser.lazy[r.now().line] ? n(C) : a ? R(C) : D(C));
    }
    return C === h.dash || dt(C) ? (e.consume(C), o += String.fromCharCode(C), A) : n(C);
  }
  function E(C) {
    return C === h.greaterThan ? (e.consume(C), r.interrupt ? t : J) : n(C);
  }
  function R(C) {
    return me(C) ? (e.consume(C), R) : Z(C);
  }
  function D(C) {
    return C === h.slash ? (e.consume(C), Z) : C === h.colon || C === h.underscore || _t(C) ? (e.consume(C), O) : me(C) ? (e.consume(C), D) : Z(C);
  }
  function O(C) {
    return C === h.dash || C === h.dot || C === h.colon || C === h.underscore || dt(C) ? (e.consume(C), O) : P(C);
  }
  function P(C) {
    return C === h.equalsTo ? (e.consume(C), _) : me(C) ? (e.consume(C), P) : D(C);
  }
  function _(C) {
    return C === h.eof || C === h.lessThan || C === h.equalsTo || C === h.greaterThan || C === h.graveAccent ? n(C) : C === h.quotationMark || C === h.apostrophe ? (e.consume(C), c = C, B) : me(C) ? (e.consume(C), _) : Q(C);
  }
  function B(C) {
    return C === c ? (e.consume(C), c = null, $) : C === h.eof || j(C) ? n(C) : (e.consume(C), B);
  }
  function Q(C) {
    return C === h.eof || C === h.quotationMark || C === h.apostrophe || C === h.slash || C === h.lessThan || C === h.equalsTo || C === h.greaterThan || C === h.graveAccent || ot(C) ? P(C) : (e.consume(C), Q);
  }
  function $(C) {
    return C === h.slash || C === h.greaterThan || me(C) ? D(C) : n(C);
  }
  function Z(C) {
    return C === h.greaterThan ? (e.consume(C), W) : n(C);
  }
  function W(C) {
    return C === h.eof || j(C) ? J(C) : me(C) ? (e.consume(C), W) : n(C);
  }
  function J(C) {
    return C === h.dash && i === z.htmlComment ? (e.consume(C), le) : C === h.lessThan && i === z.htmlRaw ? (e.consume(C), ie) : C === h.greaterThan && i === z.htmlDeclaration ? (e.consume(C), ae) : C === h.questionMark && i === z.htmlInstruction ? (e.consume(C), y) : C === h.rightSquareBracket && i === z.htmlCdata ? (e.consume(C), Ce) : j(C) && (i === z.htmlBasic || i === z.htmlComplete) ? (e.exit(d.htmlFlowData), e.check(
      Xc,
      we,
      M
    )(C)) : C === h.eof || j(C) ? (e.exit(d.htmlFlowData), M(C)) : (e.consume(C), J);
  }
  function M(C) {
    return e.check(
      Yc,
      F,
      we
    )(C);
  }
  function F(C) {
    return k(j(C)), e.enter(d.lineEnding), e.consume(C), e.exit(d.lineEnding), G;
  }
  function G(C) {
    return C === h.eof || j(C) ? M(C) : (e.enter(d.htmlFlowData), J(C));
  }
  function le(C) {
    return C === h.dash ? (e.consume(C), y) : J(C);
  }
  function ie(C) {
    return C === h.slash ? (e.consume(C), o = "", ye) : J(C);
  }
  function ye(C) {
    if (C === h.greaterThan) {
      const H = o.toLowerCase();
      return Li.includes(H) ? (e.consume(C), ae) : J(C);
    }
    return _t(C) && o.length < z.htmlRawSizeMax ? (k(C !== null), e.consume(C), o += String.fromCharCode(C), ye) : J(C);
  }
  function Ce(C) {
    return C === h.rightSquareBracket ? (e.consume(C), y) : J(C);
  }
  function y(C) {
    return C === h.greaterThan ? (e.consume(C), ae) : C === h.dash && i === z.htmlComment ? (e.consume(C), y) : J(C);
  }
  function ae(C) {
    return C === h.eof || j(C) ? (e.exit(d.htmlFlowData), we(C)) : (e.consume(C), ae);
  }
  function we(C) {
    return e.exit(d.htmlFlow), t(C);
  }
}
function eu(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return j(o) ? (e.enter(d.lineEnding), e.consume(o), e.exit(d.lineEnding), a) : n(o);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function tu(e, t, n) {
  return r;
  function r(i) {
    return k(j(i), "expected a line ending"), e.enter(d.lineEnding), e.consume(i), e.exit(d.lineEnding), e.attempt(jn, t, n);
  }
}
const nu = { name: "htmlText", tokenize: ru };
function ru(e, t, n) {
  const r = this;
  let i, a, o;
  return s;
  function s(y) {
    return k(y === h.lessThan, "expected `<`"), e.enter(d.htmlText), e.enter(d.htmlTextData), e.consume(y), c;
  }
  function c(y) {
    return y === h.exclamationMark ? (e.consume(y), u) : y === h.slash ? (e.consume(y), P) : y === h.questionMark ? (e.consume(y), D) : _t(y) ? (e.consume(y), Q) : n(y);
  }
  function u(y) {
    return y === h.dash ? (e.consume(y), l) : y === h.leftSquareBracket ? (e.consume(y), a = 0, T) : _t(y) ? (e.consume(y), R) : n(y);
  }
  function l(y) {
    return y === h.dash ? (e.consume(y), g) : n(y);
  }
  function f(y) {
    return y === h.eof ? n(y) : y === h.dash ? (e.consume(y), m) : j(y) ? (o = f, ie(y)) : (e.consume(y), f);
  }
  function m(y) {
    return y === h.dash ? (e.consume(y), g) : f(y);
  }
  function g(y) {
    return y === h.greaterThan ? le(y) : y === h.dash ? m(y) : f(y);
  }
  function T(y) {
    const ae = z.cdataOpeningString;
    return y === ae.charCodeAt(a++) ? (e.consume(y), a === ae.length ? S : T) : n(y);
  }
  function S(y) {
    return y === h.eof ? n(y) : y === h.rightSquareBracket ? (e.consume(y), A) : j(y) ? (o = S, ie(y)) : (e.consume(y), S);
  }
  function A(y) {
    return y === h.rightSquareBracket ? (e.consume(y), E) : S(y);
  }
  function E(y) {
    return y === h.greaterThan ? le(y) : y === h.rightSquareBracket ? (e.consume(y), E) : S(y);
  }
  function R(y) {
    return y === h.eof || y === h.greaterThan ? le(y) : j(y) ? (o = R, ie(y)) : (e.consume(y), R);
  }
  function D(y) {
    return y === h.eof ? n(y) : y === h.questionMark ? (e.consume(y), O) : j(y) ? (o = D, ie(y)) : (e.consume(y), D);
  }
  function O(y) {
    return y === h.greaterThan ? le(y) : D(y);
  }
  function P(y) {
    return _t(y) ? (e.consume(y), _) : n(y);
  }
  function _(y) {
    return y === h.dash || dt(y) ? (e.consume(y), _) : B(y);
  }
  function B(y) {
    return j(y) ? (o = B, ie(y)) : me(y) ? (e.consume(y), B) : le(y);
  }
  function Q(y) {
    return y === h.dash || dt(y) ? (e.consume(y), Q) : y === h.slash || y === h.greaterThan || ot(y) ? $(y) : n(y);
  }
  function $(y) {
    return y === h.slash ? (e.consume(y), le) : y === h.colon || y === h.underscore || _t(y) ? (e.consume(y), Z) : j(y) ? (o = $, ie(y)) : me(y) ? (e.consume(y), $) : le(y);
  }
  function Z(y) {
    return y === h.dash || y === h.dot || y === h.colon || y === h.underscore || dt(y) ? (e.consume(y), Z) : W(y);
  }
  function W(y) {
    return y === h.equalsTo ? (e.consume(y), J) : j(y) ? (o = W, ie(y)) : me(y) ? (e.consume(y), W) : $(y);
  }
  function J(y) {
    return y === h.eof || y === h.lessThan || y === h.equalsTo || y === h.greaterThan || y === h.graveAccent ? n(y) : y === h.quotationMark || y === h.apostrophe ? (e.consume(y), i = y, M) : j(y) ? (o = J, ie(y)) : me(y) ? (e.consume(y), J) : (e.consume(y), F);
  }
  function M(y) {
    return y === i ? (e.consume(y), i = void 0, G) : y === h.eof ? n(y) : j(y) ? (o = M, ie(y)) : (e.consume(y), M);
  }
  function F(y) {
    return y === h.eof || y === h.quotationMark || y === h.apostrophe || y === h.lessThan || y === h.equalsTo || y === h.graveAccent ? n(y) : y === h.slash || y === h.greaterThan || ot(y) ? $(y) : (e.consume(y), F);
  }
  function G(y) {
    return y === h.slash || y === h.greaterThan || ot(y) ? $(y) : n(y);
  }
  function le(y) {
    return y === h.greaterThan ? (e.consume(y), e.exit(d.htmlTextData), e.exit(d.htmlText), t) : n(y);
  }
  function ie(y) {
    return k(o, "expected return state"), k(j(y), "expected eol"), e.exit(d.htmlTextData), e.enter(d.lineEnding), e.consume(y), e.exit(d.lineEnding), ye;
  }
  function ye(y) {
    return k(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), me(y) ? xe(
      e,
      Ce,
      d.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : z.tabSize
    )(y) : Ce(y);
  }
  function Ce(y) {
    return e.enter(d.htmlTextData), o(y);
  }
}
const Wr = {
  name: "labelEnd",
  resolveAll: su,
  resolveTo: lu,
  tokenize: cu
}, iu = { tokenize: uu }, au = { tokenize: du }, ou = { tokenize: hu };
function su(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === d.labelImage || r.type === d.labelLink || r.type === d.labelEnd) {
      const i = r.type === d.labelImage ? 4 : 2;
      r.type = d.data, t += i;
    }
  }
  return e.length !== n.length && vt(e, 0, e.length, n), e;
}
function lu(e, t) {
  let n = e.length, r = 0, i, a, o, s;
  for (; n--; )
    if (i = e[n][1], a) {
      if (i.type === d.link || i.type === d.labelLink && i._inactive)
        break;
      e[n][0] === "enter" && i.type === d.labelLink && (i._inactive = !0);
    } else if (o) {
      if (e[n][0] === "enter" && (i.type === d.labelImage || i.type === d.labelLink) && !i._balanced && (a = n, i.type !== d.labelLink)) {
        r = 2;
        break;
      }
    } else i.type === d.labelEnd && (o = n);
  k(a !== void 0, "`open` is supposed to be found"), k(o !== void 0, "`close` is supposed to be found");
  const c = {
    type: e[a][1].type === d.labelLink ? d.link : d.image,
    start: { ...e[a][1].start },
    end: { ...e[e.length - 1][1].end }
  }, u = {
    type: d.label,
    start: { ...e[a][1].start },
    end: { ...e[o][1].end }
  }, l = {
    type: d.labelText,
    start: { ...e[a + r + 2][1].end },
    end: { ...e[o - 2][1].start }
  };
  return s = [
    ["enter", c, t],
    ["enter", u, t]
  ], s = pt(s, e.slice(a + 1, a + r + 3)), s = pt(s, [["enter", l, t]]), k(
    t.parser.constructs.insideSpan.null,
    "expected `insideSpan.null` to be populated"
  ), s = pt(
    s,
    Vr(
      t.parser.constructs.insideSpan.null,
      e.slice(a + r + 4, o - 3),
      t
    )
  ), s = pt(s, [
    ["exit", l, t],
    e[o - 2],
    e[o - 1],
    ["exit", u, t]
  ]), s = pt(s, e.slice(o + 1)), s = pt(s, [["exit", c, t]]), vt(e, a, e.length, s), e;
}
function cu(e, t, n) {
  const r = this;
  let i = r.events.length, a, o;
  for (; i--; )
    if ((r.events[i][1].type === d.labelImage || r.events[i][1].type === d.labelLink) && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return s;
  function s(m) {
    return k(m === h.rightSquareBracket, "expected `]`"), a ? a._inactive ? f(m) : (o = r.parser.defined.includes(
      Jt(
        r.sliceSerialize({ start: a.end, end: r.now() })
      )
    ), e.enter(d.labelEnd), e.enter(d.labelMarker), e.consume(m), e.exit(d.labelMarker), e.exit(d.labelEnd), c) : n(m);
  }
  function c(m) {
    return m === h.leftParenthesis ? e.attempt(
      iu,
      l,
      o ? l : f
    )(m) : m === h.leftSquareBracket ? e.attempt(
      au,
      l,
      o ? u : f
    )(m) : o ? l(m) : f(m);
  }
  function u(m) {
    return e.attempt(
      ou,
      l,
      f
    )(m);
  }
  function l(m) {
    return t(m);
  }
  function f(m) {
    return a._balanced = !0, n(m);
  }
}
function uu(e, t, n) {
  return r;
  function r(f) {
    return k(f === h.leftParenthesis, "expected left paren"), e.enter(d.resource), e.enter(d.resourceMarker), e.consume(f), e.exit(d.resourceMarker), i;
  }
  function i(f) {
    return ot(f) ? fn(e, a)(f) : a(f);
  }
  function a(f) {
    return f === h.rightParenthesis ? l(f) : Fa(
      e,
      o,
      s,
      d.resourceDestination,
      d.resourceDestinationLiteral,
      d.resourceDestinationLiteralMarker,
      d.resourceDestinationRaw,
      d.resourceDestinationString,
      z.linkResourceDestinationBalanceMax
    )(f);
  }
  function o(f) {
    return ot(f) ? fn(e, c)(f) : l(f);
  }
  function s(f) {
    return n(f);
  }
  function c(f) {
    return f === h.quotationMark || f === h.apostrophe || f === h.leftParenthesis ? za(
      e,
      u,
      n,
      d.resourceTitle,
      d.resourceTitleMarker,
      d.resourceTitleString
    )(f) : l(f);
  }
  function u(f) {
    return ot(f) ? fn(e, l)(f) : l(f);
  }
  function l(f) {
    return f === h.rightParenthesis ? (e.enter(d.resourceMarker), e.consume(f), e.exit(d.resourceMarker), e.exit(d.resource), t) : n(f);
  }
}
function du(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return k(s === h.leftSquareBracket, "expected left bracket"), Ha.call(
      r,
      e,
      a,
      o,
      d.reference,
      d.referenceMarker,
      d.referenceString
    )(s);
  }
  function a(s) {
    return r.parser.defined.includes(
      Jt(
        r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
      )
    ) ? t(s) : n(s);
  }
  function o(s) {
    return n(s);
  }
}
function hu(e, t, n) {
  return r;
  function r(a) {
    return k(a === h.leftSquareBracket, "expected left bracket"), e.enter(d.reference), e.enter(d.referenceMarker), e.consume(a), e.exit(d.referenceMarker), i;
  }
  function i(a) {
    return a === h.rightSquareBracket ? (e.enter(d.referenceMarker), e.consume(a), e.exit(d.referenceMarker), e.exit(d.reference), t) : n(a);
  }
}
const pu = {
  name: "labelStartImage",
  resolveAll: Wr.resolveAll,
  tokenize: fu
};
function fu(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return k(s === h.exclamationMark, "expected `!`"), e.enter(d.labelImage), e.enter(d.labelImageMarker), e.consume(s), e.exit(d.labelImageMarker), a;
  }
  function a(s) {
    return s === h.leftSquareBracket ? (e.enter(d.labelMarker), e.consume(s), e.exit(d.labelMarker), e.exit(d.labelImage), o) : n(s);
  }
  function o(s) {
    return s === h.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : t(s);
  }
}
const gu = {
  name: "labelStartLink",
  resolveAll: Wr.resolveAll,
  tokenize: mu
};
function mu(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return k(o === h.leftSquareBracket, "expected `[`"), e.enter(d.labelLink), e.enter(d.labelMarker), e.consume(o), e.exit(d.labelMarker), e.exit(d.labelLink), a;
  }
  function a(o) {
    return o === h.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const or = { name: "lineEnding", tokenize: Cu };
function Cu(e, t) {
  return n;
  function n(r) {
    return k(j(r), "expected eol"), e.enter(d.lineEnding), e.consume(r), e.exit(d.lineEnding), xe(e, t, d.linePrefix);
  }
}
const Pn = {
  name: "thematicBreak",
  tokenize: yu
};
function yu(e, t, n) {
  let r = 0, i;
  return a;
  function a(u) {
    return e.enter(d.thematicBreak), o(u);
  }
  function o(u) {
    return k(
      u === h.asterisk || u === h.dash || u === h.underscore,
      "expected `*`, `-`, or `_`"
    ), i = u, s(u);
  }
  function s(u) {
    return u === i ? (e.enter(d.thematicBreakSequence), c(u)) : r >= z.thematicBreakMarkerCountMin && (u === h.eof || j(u)) ? (e.exit(d.thematicBreak), t(u)) : n(u);
  }
  function c(u) {
    return u === i ? (e.consume(u), r++, c) : (e.exit(d.thematicBreakSequence), me(u) ? xe(e, s, d.whitespace)(u) : s(u));
  }
}
const at = {
  continuation: { tokenize: Tu },
  exit: xu,
  name: "list",
  tokenize: Su
}, wu = {
  partial: !0,
  tokenize: bu
}, ku = { partial: !0, tokenize: Eu };
function Su(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === d.linePrefix ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return s;
  function s(g) {
    k(r.containerState, "expected state");
    const T = r.containerState.type || (g === h.asterisk || g === h.plusSign || g === h.dash ? d.listUnordered : d.listOrdered);
    if (T === d.listUnordered ? !r.containerState.marker || g === r.containerState.marker : vr(g)) {
      if (r.containerState.type || (r.containerState.type = T, e.enter(T, { _container: !0 })), T === d.listUnordered)
        return e.enter(d.listItemPrefix), g === h.asterisk || g === h.dash ? e.check(Pn, n, u)(g) : u(g);
      if (!r.interrupt || g === h.digit1)
        return e.enter(d.listItemPrefix), e.enter(d.listItemValue), c(g);
    }
    return n(g);
  }
  function c(g) {
    return k(r.containerState, "expected state"), vr(g) && ++o < z.listItemValueSizeMax ? (e.consume(g), c) : (!r.interrupt || o < 2) && (r.containerState.marker ? g === r.containerState.marker : g === h.rightParenthesis || g === h.dot) ? (e.exit(d.listItemValue), u(g)) : n(g);
  }
  function u(g) {
    return k(r.containerState, "expected state"), k(g !== h.eof, "eof (`null`) is not a marker"), e.enter(d.listItemMarker), e.consume(g), e.exit(d.listItemMarker), r.containerState.marker = r.containerState.marker || g, e.check(
      jn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : l,
      e.attempt(
        wu,
        m,
        f
      )
    );
  }
  function l(g) {
    return k(r.containerState, "expected state"), r.containerState.initialBlankLine = !0, a++, m(g);
  }
  function f(g) {
    return me(g) ? (e.enter(d.listItemPrefixWhitespace), e.consume(g), e.exit(d.listItemPrefixWhitespace), m) : n(g);
  }
  function m(g) {
    return k(r.containerState, "expected state"), r.containerState.size = a + r.sliceSerialize(e.exit(d.listItemPrefix), !0).length, t(g);
  }
}
function Tu(e, t, n) {
  const r = this;
  return k(r.containerState, "expected state"), r.containerState._closeFlow = void 0, e.check(jn, i, a);
  function i(s) {
    return k(r.containerState, "expected state"), k(typeof r.containerState.size == "number", "expected size"), r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, xe(
      e,
      t,
      d.listItemIndent,
      r.containerState.size + 1
    )(s);
  }
  function a(s) {
    return k(r.containerState, "expected state"), r.containerState.furtherBlankLines || !me(s) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(s)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(ku, t, o)(s));
  }
  function o(s) {
    return k(r.containerState, "expected state"), r.containerState._closeFlow = !0, r.interrupt = void 0, k(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), xe(
      e,
      e.attempt(at, t, n),
      d.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : z.tabSize
    )(s);
  }
}
function Eu(e, t, n) {
  const r = this;
  return k(r.containerState, "expected state"), k(typeof r.containerState.size == "number", "expected size"), xe(
    e,
    i,
    d.listItemIndent,
    r.containerState.size + 1
  );
  function i(a) {
    k(r.containerState, "expected state");
    const o = r.events[r.events.length - 1];
    return o && o[1].type === d.listItemIndent && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function xu(e) {
  k(this.containerState, "expected state"), k(typeof this.containerState.type == "string", "expected type"), e.exit(this.containerState.type);
}
function bu(e, t, n) {
  const r = this;
  return k(
    r.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), xe(
    e,
    i,
    d.listItemPrefixWhitespace,
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : z.tabSize + 1
  );
  function i(a) {
    const o = r.events[r.events.length - 1];
    return !me(a) && o && o[1].type === d.listItemPrefixWhitespace ? t(a) : n(a);
  }
}
const Oi = {
  name: "setextUnderline",
  resolveTo: _u,
  tokenize: vu
};
function _u(e, t) {
  let n = e.length, r, i, a;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === d.content) {
        r = n;
        break;
      }
      e[n][1].type === d.paragraph && (i = n);
    } else
      e[n][1].type === d.content && e.splice(n, 1), !a && e[n][1].type === d.definition && (a = n);
  k(i !== void 0, "expected a `text` index to be found"), k(r !== void 0, "expected a `text` index to be found"), k(e[r][2] === t, "enter context should be same"), k(
    e[e.length - 1][2] === t,
    "enter context should be same"
  );
  const o = {
    type: d.setextHeading,
    start: { ...e[r][1].start },
    end: { ...e[e.length - 1][1].end }
  };
  return e[i][1].type = d.setextHeadingText, a ? (e.splice(i, 0, ["enter", o, t]), e.splice(a + 1, 0, ["exit", e[r][1], t]), e[r][1].end = { ...e[a][1].end }) : e[r][1] = o, e.push(["exit", o, t]), e;
}
function vu(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(u) {
    let l = r.events.length, f;
    for (k(
      u === h.dash || u === h.equalsTo,
      "expected `=` or `-`"
    ); l--; )
      if (r.events[l][1].type !== d.lineEnding && r.events[l][1].type !== d.linePrefix && r.events[l][1].type !== d.content) {
        f = r.events[l][1].type === d.paragraph;
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || f) ? (e.enter(d.setextHeadingLine), i = u, o(u)) : n(u);
  }
  function o(u) {
    return e.enter(d.setextHeadingLineSequence), s(u);
  }
  function s(u) {
    return u === i ? (e.consume(u), s) : (e.exit(d.setextHeadingLineSequence), me(u) ? xe(e, c, d.lineSuffix)(u) : c(u));
  }
  function c(u) {
    return u === h.eof || j(u) ? (e.exit(d.setextHeadingLine), t(u)) : n(u);
  }
}
const Ru = { tokenize: Iu };
function Iu(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    jn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(
      this.parser.constructs.flowInitial,
      i,
      xe(
        e,
        e.attempt(
          this.parser.constructs.flow,
          i,
          e.attempt(Oc, i)
        ),
        d.linePrefix
      )
    )
  );
  return n;
  function r(a) {
    if (k(
      a === h.eof || j(a),
      "expected eol or eof"
    ), a === h.eof) {
      e.consume(a);
      return;
    }
    return e.enter(d.lineEndingBlank), e.consume(a), e.exit(d.lineEndingBlank), t.currentConstruct = void 0, n;
  }
  function i(a) {
    if (k(
      a === h.eof || j(a),
      "expected eol or eof"
    ), a === h.eof) {
      e.consume(a);
      return;
    }
    return e.enter(d.lineEnding), e.consume(a), e.exit(d.lineEnding), t.currentConstruct = void 0, n;
  }
}
const Mu = { resolveAll: Ba() }, Au = Ua("string"), Nu = Ua("text");
function Ua(e) {
  return {
    resolveAll: Ba(
      e === "text" ? Lu : void 0
    ),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], a = n.attempt(i, o, s);
    return o;
    function o(l) {
      return u(l) ? a(l) : s(l);
    }
    function s(l) {
      if (l === h.eof) {
        n.consume(l);
        return;
      }
      return n.enter(d.data), n.consume(l), c;
    }
    function c(l) {
      return u(l) ? (n.exit(d.data), a(l)) : (n.consume(l), c);
    }
    function u(l) {
      if (l === h.eof)
        return !0;
      const f = i[l];
      let m = -1;
      if (f)
        for (k(Array.isArray(f), "expected `disable.null` to be populated"); ++m < f.length; ) {
          const g = f[m];
          if (!g.previous || g.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Ba(e) {
  return t;
  function t(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === d.data && (a = i, i++) : (!n[i] || n[i][1].type !== d.data) && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function Lu(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === d.lineEnding) && e[n - 1][1].type === d.data) {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let a = i.length, o = -1, s = 0, c;
      for (; a--; ) {
        const u = i[a];
        if (typeof u == "string") {
          for (o = u.length; u.charCodeAt(o - 1) === h.space; )
            s++, o--;
          if (o) break;
          o = -1;
        } else if (u === h.horizontalTab)
          c = !0, s++;
        else if (u !== h.virtualSpace) {
          a++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (s = 0), s) {
        const u = {
          type: n === e.length || c || s < z.hardBreakPrefixSizeMin ? d.lineSuffix : d.hardBreakTrailing,
          start: {
            _bufferIndex: a ? o : r.start._bufferIndex + o,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - s,
            offset: r.end.offset - s
          },
          end: { ...r.end }
        };
        r.end = { ...u.start }, r.start.offset === r.end.offset ? Object.assign(r, u) : (e.splice(
          n,
          0,
          ["enter", u, t],
          ["exit", u, t]
        ), n += 2);
      }
      n++;
    }
  return e;
}
const Ou = {
  [h.asterisk]: at,
  [h.plusSign]: at,
  [h.dash]: at,
  [h.digit0]: at,
  [h.digit1]: at,
  [h.digit2]: at,
  [h.digit3]: at,
  [h.digit4]: at,
  [h.digit5]: at,
  [h.digit6]: at,
  [h.digit7]: at,
  [h.digit8]: at,
  [h.digit9]: at,
  [h.greaterThan]: Na
}, Du = {
  [h.leftSquareBracket]: zc
}, Pu = {
  [h.horizontalTab]: ar,
  [h.virtualSpace]: ar,
  [h.space]: ar
}, Fu = {
  [h.numberSign]: jc,
  [h.asterisk]: Pn,
  [h.dash]: [Oi, Pn],
  [h.lessThan]: Kc,
  [h.equalsTo]: Oi,
  [h.underscore]: Pn,
  [h.graveAccent]: Ni,
  [h.tilde]: Ni
}, Hu = {
  [h.ampersand]: Oa,
  [h.backslash]: La
}, zu = {
  [h.carriageReturn]: or,
  [h.lineFeed]: or,
  [h.carriageReturnLineFeed]: or,
  [h.exclamationMark]: pu,
  [h.ampersand]: Oa,
  [h.asterisk]: Rr,
  [h.lessThan]: [mc, nu],
  [h.leftSquareBracket]: gu,
  [h.backslash]: [Vc, La],
  [h.rightSquareBracket]: Wr,
  [h.underscore]: Rr,
  [h.graveAccent]: Ic
}, Uu = { null: [Rr, Mu] }, Bu = { null: [h.asterisk, h.underscore] }, Gu = { null: [] }, Vu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Bu,
  contentInitial: Du,
  disable: Gu,
  document: Ou,
  flow: Fu,
  flowInitial: Pu,
  insideSpan: Uu,
  string: Hu,
  text: zu
}, Symbol.toStringTag, { value: "Module" }));
var Ir = { exports: {} }, sr, Di;
function Wu() {
  if (Di) return sr;
  Di = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, a = r * 365.25;
  sr = function(l, f) {
    f = f || {};
    var m = typeof l;
    if (m === "string" && l.length > 0)
      return o(l);
    if (m === "number" && isFinite(l))
      return f.long ? c(l) : s(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function o(l) {
    if (l = String(l), !(l.length > 100)) {
      var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (f) {
        var m = parseFloat(f[1]), g = (f[2] || "ms").toLowerCase();
        switch (g) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return m * a;
          case "weeks":
          case "week":
          case "w":
            return m * i;
          case "days":
          case "day":
          case "d":
            return m * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return m * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return m * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return m * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return m;
          default:
            return;
        }
      }
    }
  }
  function s(l) {
    var f = Math.abs(l);
    return f >= r ? Math.round(l / r) + "d" : f >= n ? Math.round(l / n) + "h" : f >= t ? Math.round(l / t) + "m" : f >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function c(l) {
    var f = Math.abs(l);
    return f >= r ? u(l, f, r, "day") : f >= n ? u(l, f, n, "hour") : f >= t ? u(l, f, t, "minute") : f >= e ? u(l, f, e, "second") : l + " ms";
  }
  function u(l, f, m, g) {
    var T = f >= m * 1.5;
    return Math.round(l / m) + " " + g + (T ? "s" : "");
  }
  return sr;
}
function ju(e) {
  n.debug = n, n.default = n, n.coerce = c, n.disable = o, n.enable = i, n.enabled = s, n.humanize = Wu(), n.destroy = u, Object.keys(e).forEach((l) => {
    n[l] = e[l];
  }), n.names = [], n.skips = [], n.formatters = {};
  function t(l) {
    let f = 0;
    for (let m = 0; m < l.length; m++)
      f = (f << 5) - f + l.charCodeAt(m), f |= 0;
    return n.colors[Math.abs(f) % n.colors.length];
  }
  n.selectColor = t;
  function n(l) {
    let f, m = null, g, T;
    function S(...A) {
      if (!S.enabled)
        return;
      const E = S, R = Number(/* @__PURE__ */ new Date()), D = R - (f || R);
      E.diff = D, E.prev = f, E.curr = R, f = R, A[0] = n.coerce(A[0]), typeof A[0] != "string" && A.unshift("%O");
      let O = 0;
      A[0] = A[0].replace(/%([a-zA-Z%])/g, (_, B) => {
        if (_ === "%%")
          return "%";
        O++;
        const Q = n.formatters[B];
        if (typeof Q == "function") {
          const $ = A[O];
          _ = Q.call(E, $), A.splice(O, 1), O--;
        }
        return _;
      }), n.formatArgs.call(E, A), (E.log || n.log).apply(E, A);
    }
    return S.namespace = l, S.useColors = n.useColors(), S.color = n.selectColor(l), S.extend = r, S.destroy = n.destroy, Object.defineProperty(S, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => m !== null ? m : (g !== n.namespaces && (g = n.namespaces, T = n.enabled(l)), T),
      set: (A) => {
        m = A;
      }
    }), typeof n.init == "function" && n.init(S), S;
  }
  function r(l, f) {
    const m = n(this.namespace + (typeof f > "u" ? ":" : f) + l);
    return m.log = this.log, m;
  }
  function i(l) {
    n.save(l), n.namespaces = l, n.names = [], n.skips = [];
    const f = (typeof l == "string" ? l : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
    for (const m of f)
      m[0] === "-" ? n.skips.push(m.slice(1)) : n.names.push(m);
  }
  function a(l, f) {
    let m = 0, g = 0, T = -1, S = 0;
    for (; m < l.length; )
      if (g < f.length && (f[g] === l[m] || f[g] === "*"))
        f[g] === "*" ? (T = g, S = m, g++) : (m++, g++);
      else if (T !== -1)
        g = T + 1, S++, m = S;
      else
        return !1;
    for (; g < f.length && f[g] === "*"; )
      g++;
    return g === f.length;
  }
  function o() {
    const l = [
      ...n.names,
      ...n.skips.map((f) => "-" + f)
    ].join(",");
    return n.enable(""), l;
  }
  function s(l) {
    for (const f of n.skips)
      if (a(l, f))
        return !1;
    for (const f of n.names)
      if (a(l, f))
        return !0;
    return !1;
  }
  function c(l) {
    return l instanceof Error ? l.stack || l.message : l;
  }
  function u() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return n.enable(n.load()), n;
}
var $u = ju;
(function(e, t) {
  t.formatArgs = r, t.save = i, t.load = a, t.useColors = n, t.storage = o(), t.destroy = /* @__PURE__ */ (() => {
    let c = !1;
    return () => {
      c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), t.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function n() {
    if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
      return !0;
    if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
      return !1;
    let c;
    return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function r(c) {
    if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
      return;
    const u = "color: " + this.color;
    c.splice(1, 0, u, "color: inherit");
    let l = 0, f = 0;
    c[0].replace(/%[a-zA-Z%]/g, (m) => {
      m !== "%%" && (l++, m === "%c" && (f = l));
    }), c.splice(f, 0, u);
  }
  t.log = console.debug || console.log || (() => {
  });
  function i(c) {
    try {
      c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
    } catch {
    }
  }
  function a() {
    let c;
    try {
      c = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
    } catch {
    }
    return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
  }
  function o() {
    try {
      return localStorage;
    } catch {
    }
  }
  e.exports = $u(t);
  const { formatters: s } = e.exports;
  s.j = function(c) {
    try {
      return JSON.stringify(c);
    } catch (u) {
      return "[UnexpectedJSONParseError]: " + u.message;
    }
  };
})(Ir, Ir.exports);
var qu = Ir.exports;
const Zu = /* @__PURE__ */ Pr(qu), Vt = Zu("micromark");
function Ku(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, a = [];
  let o = [], s = [], c = !0;
  const u = {
    attempt: $(B),
    check: $(Q),
    consume: O,
    enter: P,
    exit: _,
    interrupt: $(Q, { interrupt: !0 })
  }, l = {
    code: h.eof,
    containerState: {},
    defineSkip: E,
    events: [],
    now: A,
    parser: e,
    previous: h.eof,
    sliceSerialize: T,
    sliceStream: S,
    write: g
  };
  let f = t.tokenize.call(l, u), m;
  return t.resolveAll && a.push(t), l;
  function g(M) {
    return o = pt(o, M), R(), o[o.length - 1] !== h.eof ? [] : (Z(t, 0), l.events = Vr(a, l.events, l), l.events);
  }
  function T(M, F) {
    return Yu(S(M), F);
  }
  function S(M) {
    return Xu(o, M);
  }
  function A() {
    const { _bufferIndex: M, _index: F, line: G, column: le, offset: ie } = r;
    return { _bufferIndex: M, _index: F, line: G, column: le, offset: ie };
  }
  function E(M) {
    i[M.line] = M.column, J(), Vt("position: define skip: `%j`", r);
  }
  function R() {
    let M;
    for (; r._index < o.length; ) {
      const F = o[r._index];
      if (typeof F == "string")
        for (M = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === M && r._bufferIndex < F.length; )
          D(F.charCodeAt(r._bufferIndex));
      else
        D(F);
    }
  }
  function D(M) {
    k(c === !0, "expected character to be consumed"), c = void 0, Vt("main: passing `%s` to %s", M, f && f.name), m = M, k(typeof f == "function", "expected state"), f = f(M);
  }
  function O(M) {
    k(M === m, "expected given code to equal expected code"), Vt("consume: `%s`", M), k(
      c === void 0,
      "expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used"
    ), k(
      M === null ? l.events.length === 0 || l.events[l.events.length - 1][0] === "exit" : l.events[l.events.length - 1][0] === "enter",
      "expected last token to be open"
    ), j(M) ? (r.line++, r.column = 1, r.offset += M === h.carriageReturnLineFeed ? 2 : 1, J(), Vt("position: after eol: `%j`", r)) : M !== h.virtualSpace && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = M, c = !0;
  }
  function P(M, F) {
    const G = F || {};
    return G.type = M, G.start = A(), k(typeof M == "string", "expected string type"), k(M.length > 0, "expected non-empty string"), Vt("enter: `%s`", M), l.events.push(["enter", G, l]), s.push(G), G;
  }
  function _(M) {
    k(typeof M == "string", "expected string type"), k(M.length > 0, "expected non-empty string");
    const F = s.pop();
    return k(F, "cannot close w/o open tokens"), F.end = A(), k(M === F.type, "expected exit token to match current token"), k(
      !(F.start._index === F.end._index && F.start._bufferIndex === F.end._bufferIndex),
      "expected non-empty token (`" + M + "`)"
    ), Vt("exit: `%s`", F.type), l.events.push(["exit", F, l]), F;
  }
  function B(M, F) {
    Z(M, F.from);
  }
  function Q(M, F) {
    F.restore();
  }
  function $(M, F) {
    return G;
    function G(le, ie, ye) {
      let Ce, y, ae, we;
      return Array.isArray(le) ? (
        /* c8 ignore next 1 */
        H(le)
      ) : "tokenize" in le ? (
        // Looks like a construct.
        H([
          /** @type {Construct} */
          le
        ])
      ) : C(le);
      function C(ee) {
        return ue;
        function ue(ne) {
          const ke = ne !== null && ee[ne], be = ne !== null && ee.null, Me = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(ke) ? ke : ke ? [ke] : [],
            ...Array.isArray(be) ? be : be ? [be] : []
          ];
          return H(Me)(ne);
        }
      }
      function H(ee) {
        return Ce = ee, y = 0, ee.length === 0 ? (k(ye, "expected `bogusState` to be given"), ye) : V(ee[y]);
      }
      function V(ee) {
        return ue;
        function ue(ne) {
          return we = W(), ae = ee, ee.partial || (l.currentConstruct = ee), k(
            l.parser.constructs.disable.null,
            "expected `disable.null` to be populated"
          ), ee.name && l.parser.constructs.disable.null.includes(ee.name) ? ce(ne) : ee.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            F ? Object.assign(Object.create(l), F) : l,
            u,
            he,
            ce
          )(ne);
        }
      }
      function he(ee) {
        return k(ee === m, "expected code"), c = !0, M(ae, we), ie;
      }
      function ce(ee) {
        return k(ee === m, "expected code"), c = !0, we.restore(), ++y < Ce.length ? V(Ce[y]) : ye;
      }
    }
  }
  function Z(M, F) {
    M.resolveAll && !a.includes(M) && a.push(M), M.resolve && vt(
      l.events,
      F,
      l.events.length - F,
      M.resolve(l.events.slice(F), l)
    ), M.resolveTo && (l.events = M.resolveTo(l.events, l)), k(
      M.partial || l.events.length === 0 || l.events[l.events.length - 1][0] === "exit",
      "expected last token to end"
    );
  }
  function W() {
    const M = A(), F = l.previous, G = l.currentConstruct, le = l.events.length, ie = Array.from(s);
    return { from: le, restore: ye };
    function ye() {
      r = M, l.previous = F, l.currentConstruct = G, l.events.length = le, s = ie, J(), Vt("position: restore: `%j`", r);
    }
  }
  function J() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Xu(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex;
  let o;
  if (n === i)
    k(a > -1, "expected non-negative end buffer index"), k(r > -1, "expected non-negative start buffer index"), o = [e[n].slice(r, a)];
  else {
    if (o = e.slice(n, i), r > -1) {
      const s = o[0];
      typeof s == "string" ? o[0] = s.slice(r) : (k(r === 0, "expected `startBufferIndex` to be `0`"), o.shift());
    }
    a > 0 && o.push(e[i].slice(0, a));
  }
  return o;
}
function Yu(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const a = e[n];
    let o;
    if (typeof a == "string")
      o = a;
    else
      switch (a) {
        case h.carriageReturn: {
          o = Et.cr;
          break;
        }
        case h.lineFeed: {
          o = Et.lf;
          break;
        }
        case h.carriageReturnLineFeed: {
          o = Et.cr + Et.lf;
          break;
        }
        case h.horizontalTab: {
          o = t ? Et.space : Et.ht;
          break;
        }
        case h.virtualSpace: {
          if (!t && i) continue;
          o = Et.space;
          break;
        }
        default:
          k(typeof a == "number", "expected number"), o = String.fromCharCode(a);
      }
    i = a === h.horizontalTab, r.push(o);
  }
  return r.join("");
}
function Ju(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      tc([Vu, ...(e || {}).extensions || []])
    ),
    content: i(cc),
    defined: [],
    document: i(dc),
    flow: i(Ru),
    lazy: {},
    string: i(Au),
    text: i(Nu)
  };
  return r;
  function i(a) {
    return o;
    function o(s) {
      return Ku(r, a, s);
    }
  }
}
function Qu(e) {
  for (; !Pa(e); )
    ;
  return e;
}
const Pi = /[\0\t\n\r]/g;
function e1() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, o, s) {
    const c = [];
    let u, l, f, m, g;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(o || void 0).decode(a)), f = 0, t = "", n && (a.charCodeAt(0) === h.byteOrderMarker && f++, n = void 0); f < a.length; ) {
      if (Pi.lastIndex = f, u = Pi.exec(a), m = u && u.index !== void 0 ? u.index : a.length, g = a.charCodeAt(m), !u) {
        t = a.slice(f);
        break;
      }
      if (g === h.lf && f === m && r)
        c.push(h.carriageReturnLineFeed), r = void 0;
      else
        switch (r && (c.push(h.carriageReturn), r = void 0), f < m && (c.push(a.slice(f, m)), e += m - f), g) {
          case h.nul: {
            c.push(h.replacementCharacter), e++;
            break;
          }
          case h.ht: {
            for (l = Math.ceil(e / z.tabSize) * z.tabSize, c.push(h.horizontalTab); e++ < l; ) c.push(h.virtualSpace);
            break;
          }
          case h.lf: {
            c.push(h.lineFeed), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      f = m + 1;
    }
    return s && (r && c.push(h.carriageReturn), t && c.push(t), c.push(h.eof)), c;
  }
}
const t1 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function n1(e) {
  return e.replace(t1, r1);
}
function r1(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === h.numberSign) {
    const i = n.charCodeAt(1), a = i === h.lowercaseX || i === h.uppercaseX;
    return Aa(
      n.slice(a ? 2 : 1),
      a ? z.numericBaseHexadecimal : z.numericBaseDecimal
    );
  }
  return Gr(n) || e;
}
const Ga = {}.hasOwnProperty;
function i1(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), a1(n)(
    Qu(
      Ju(n).document().write(e1()(e, t, !0))
    )
  );
}
function a1(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(It),
      autolinkProtocol: $,
      autolinkEmail: $,
      atxHeading: a(ze),
      blockQuote: a(ne),
      characterEscape: $,
      characterReference: $,
      codeFenced: a(ke),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: a(ke, o),
      codeText: a(be, o),
      codeTextData: $,
      data: $,
      codeFlowValue: $,
      definition: a(Me),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: a(Ae),
      hardBreakEscape: a(lt),
      hardBreakTrailing: a(lt),
      htmlFlow: a(Rt, o),
      htmlFlowData: $,
      htmlText: a(Rt, o),
      htmlTextData: $,
      image: a(wt),
      label: o,
      link: a(It),
      listItem: a(Ut),
      listItemValue: m,
      listOrdered: a(kt, f),
      listUnordered: a(kt),
      paragraph: a(Bt),
      reference: C,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: a(ze),
      strong: a(Gt),
      thematicBreak: a(mt)
    },
    exit: {
      atxHeading: c(),
      atxHeadingSequence: P,
      autolink: c(),
      autolinkEmail: ue,
      autolinkProtocol: ee,
      blockQuote: c(),
      characterEscapeValue: Z,
      characterReferenceMarkerHexadecimal: V,
      characterReferenceMarkerNumeric: V,
      characterReferenceValue: he,
      characterReference: ce,
      codeFenced: c(A),
      codeFencedFence: S,
      codeFencedFenceInfo: g,
      codeFencedFenceMeta: T,
      codeFlowValue: Z,
      codeIndented: c(E),
      codeText: c(G),
      codeTextData: Z,
      data: Z,
      definition: c(),
      definitionDestinationString: O,
      definitionLabelString: R,
      definitionTitleString: D,
      emphasis: c(),
      hardBreakEscape: c(J),
      hardBreakTrailing: c(J),
      htmlFlow: c(M),
      htmlFlowData: Z,
      htmlText: c(F),
      htmlTextData: Z,
      image: c(ie),
      label: Ce,
      labelText: ye,
      lineEnding: W,
      link: c(le),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: H,
      resourceDestinationString: y,
      resourceTitleString: ae,
      resource: we,
      setextHeading: c(Q),
      setextHeadingLineSequence: B,
      setextHeadingText: _,
      strong: c(),
      thematicBreak: c()
    }
  };
  Va(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(x) {
    let b = { type: "root", children: [] };
    const U = {
      stack: [b],
      tokenStack: [],
      config: t,
      enter: s,
      exit: u,
      buffer: o,
      resume: l,
      data: n
    }, K = [];
    let se = -1;
    for (; ++se < x.length; )
      if (x[se][1].type === d.listOrdered || x[se][1].type === d.listUnordered)
        if (x[se][0] === "enter")
          K.push(se);
        else {
          const Ne = K.pop();
          k(typeof Ne == "number", "expected list ot be open"), se = i(x, Ne, se);
        }
    for (se = -1; ++se < x.length; ) {
      const Ne = t[x[se][0]];
      Ga.call(Ne, x[se][1].type) && Ne[x[se][1].type].call(
        Object.assign(
          { sliceSerialize: x[se][2].sliceSerialize },
          U
        ),
        x[se][1]
      );
    }
    if (U.tokenStack.length > 0) {
      const Ne = U.tokenStack[U.tokenStack.length - 1];
      (Ne[1] || Fi).call(U, void 0, Ne[0]);
    }
    for (b.position = {
      start: Pt(
        x.length > 0 ? x[0][1].start : { line: 1, column: 1, offset: 0 }
      ),
      end: Pt(
        x.length > 0 ? x[x.length - 2][1].end : { line: 1, column: 1, offset: 0 }
      )
    }, se = -1; ++se < t.transforms.length; )
      b = t.transforms[se](b) || b;
    return b;
  }
  function i(x, b, U) {
    let K = b - 1, se = -1, Ne = !1, Ge, Ve, rt, We;
    for (; ++K <= U; ) {
      const Se = x[K];
      switch (Se[1].type) {
        case d.listUnordered:
        case d.listOrdered:
        case d.blockQuote: {
          Se[0] === "enter" ? se++ : se--, We = void 0;
          break;
        }
        case d.lineEndingBlank: {
          Se[0] === "enter" && (Ge && !We && !se && !rt && (rt = K), We = void 0);
          break;
        }
        case d.linePrefix:
        case d.listItemValue:
        case d.listItemMarker:
        case d.listItemPrefix:
        case d.listItemPrefixWhitespace:
          break;
        default:
          We = void 0;
      }
      if (!se && Se[0] === "enter" && Se[1].type === d.listItemPrefix || se === -1 && Se[0] === "exit" && (Se[1].type === d.listUnordered || Se[1].type === d.listOrdered)) {
        if (Ge) {
          let Ye = K;
          for (Ve = void 0; Ye--; ) {
            const je = x[Ye];
            if (je[1].type === d.lineEnding || je[1].type === d.lineEndingBlank) {
              if (je[0] === "exit") continue;
              Ve && (x[Ve][1].type = d.lineEndingBlank, Ne = !0), je[1].type = d.lineEnding, Ve = Ye;
            } else if (!(je[1].type === d.linePrefix || je[1].type === d.blockQuotePrefix || je[1].type === d.blockQuotePrefixWhitespace || je[1].type === d.blockQuoteMarker || je[1].type === d.listItemIndent)) break;
          }
          rt && (!Ve || rt < Ve) && (Ge._spread = !0), Ge.end = Object.assign(
            {},
            Ve ? x[Ve][1].start : Se[1].end
          ), x.splice(Ve || K, 0, ["exit", Ge, Se[2]]), K++, U++;
        }
        if (Se[1].type === d.listItemPrefix) {
          const Ye = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Se[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ge = Ye, x.splice(K, 0, ["enter", Ye, Se[2]]), K++, U++, rt = void 0, We = !0;
        }
      }
    }
    return x[b][1]._spread = Ne, U;
  }
  function a(x, b) {
    return U;
    function U(K) {
      s.call(this, x(K), K), b && b.call(this, K);
    }
  }
  function o() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function s(x, b, U) {
    const K = this.stack[this.stack.length - 1];
    k(K, "expected `parent`"), k("children" in K, "expected `parent`"), K.children.push(x), this.stack.push(x), this.tokenStack.push([b, U || void 0]), x.position = {
      start: Pt(b.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function c(x) {
    return b;
    function b(U) {
      x && x.call(this, U), u.call(this, U);
    }
  }
  function u(x, b) {
    const U = this.stack.pop();
    k(U, "expected `node`");
    const K = this.tokenStack.pop();
    if (K)
      K[0].type !== x.type && (b ? b.call(this, x, K[0]) : (K[1] || Fi).call(this, x, K[0]));
    else throw new Error(
      "Cannot close `" + x.type + "` (" + pn({ start: x.start, end: x.end }) + "): it’s not open"
    );
    k(U.type !== "fragment", "unexpected fragment `exit`ed"), k(U.position, "expected `position` to be defined"), U.position.end = Pt(x.end);
  }
  function l() {
    return Ql(this.stack.pop());
  }
  function f() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(x) {
    if (this.data.expectingFirstListItemValue) {
      const b = this.stack[this.stack.length - 2];
      k(b, "expected nodes on stack"), k(b.type === "list", "expected list on stack"), b.start = Number.parseInt(
        this.sliceSerialize(x),
        z.numericBaseDecimal
      ), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function g() {
    const x = this.resume(), b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(b.type === "code", "expected code on stack"), b.lang = x;
  }
  function T() {
    const x = this.resume(), b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(b.type === "code", "expected code on stack"), b.meta = x;
  }
  function S() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function A() {
    const x = this.resume(), b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(b.type === "code", "expected code on stack"), b.value = x.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function E() {
    const x = this.resume(), b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(b.type === "code", "expected code on stack"), b.value = x.replace(/(\r?\n|\r)$/g, "");
  }
  function R(x) {
    const b = this.resume(), U = this.stack[this.stack.length - 1];
    k(U, "expected node on stack"), k(U.type === "definition", "expected definition on stack"), U.label = b, U.identifier = Jt(
      this.sliceSerialize(x)
    ).toLowerCase();
  }
  function D() {
    const x = this.resume(), b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(b.type === "definition", "expected definition on stack"), b.title = x;
  }
  function O() {
    const x = this.resume(), b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(b.type === "definition", "expected definition on stack"), b.url = x;
  }
  function P(x) {
    const b = this.stack[this.stack.length - 1];
    if (k(b, "expected node on stack"), k(b.type === "heading", "expected heading on stack"), !b.depth) {
      const U = this.sliceSerialize(x).length;
      k(
        U === 1 || U === 2 || U === 3 || U === 4 || U === 5 || U === 6,
        "expected `depth` between `1` and `6`"
      ), b.depth = U;
    }
  }
  function _() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function B(x) {
    const b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(b.type === "heading", "expected heading on stack"), b.depth = this.sliceSerialize(x).codePointAt(0) === h.equalsTo ? 1 : 2;
  }
  function Q() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function $(x) {
    const b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k("children" in b, "expected parent on stack");
    const U = b.children;
    let K = U[U.length - 1];
    (!K || K.type !== "text") && (K = gt(), K.position = {
      start: Pt(x.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, U.push(K)), this.stack.push(K);
  }
  function Z(x) {
    const b = this.stack.pop();
    k(b, "expected a `node` to be on the stack"), k("value" in b, "expected a `literal` to be on the stack"), k(b.position, "expected `node` to have an open position"), b.value += this.sliceSerialize(x), b.position.end = Pt(x.end);
  }
  function W(x) {
    const b = this.stack[this.stack.length - 1];
    if (k(b, "expected `node`"), this.data.atHardBreak) {
      k("children" in b, "expected `parent`");
      const U = b.children[b.children.length - 1];
      k(U.position, "expected tail to have a starting position"), U.position.end = Pt(x.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(b.type) && ($.call(this, x), Z.call(this, x));
  }
  function J() {
    this.data.atHardBreak = !0;
  }
  function M() {
    const x = this.resume(), b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(b.type === "html", "expected html on stack"), b.value = x;
  }
  function F() {
    const x = this.resume(), b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(b.type === "html", "expected html on stack"), b.value = x;
  }
  function G() {
    const x = this.resume(), b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(b.type === "inlineCode", "expected inline code on stack"), b.value = x;
  }
  function le() {
    const x = this.stack[this.stack.length - 1];
    if (k(x, "expected node on stack"), k(x.type === "link", "expected link on stack"), this.data.inReference) {
      const b = this.data.referenceType || "shortcut";
      x.type += "Reference", x.referenceType = b, delete x.url, delete x.title;
    } else
      delete x.identifier, delete x.label;
    this.data.referenceType = void 0;
  }
  function ie() {
    const x = this.stack[this.stack.length - 1];
    if (k(x, "expected node on stack"), k(x.type === "image", "expected image on stack"), this.data.inReference) {
      const b = this.data.referenceType || "shortcut";
      x.type += "Reference", x.referenceType = b, delete x.url, delete x.title;
    } else
      delete x.identifier, delete x.label;
    this.data.referenceType = void 0;
  }
  function ye(x) {
    const b = this.sliceSerialize(x), U = this.stack[this.stack.length - 2];
    k(U, "expected ancestor on stack"), k(
      U.type === "image" || U.type === "link",
      "expected image or link on stack"
    ), U.label = n1(b), U.identifier = Jt(b).toLowerCase();
  }
  function Ce() {
    const x = this.stack[this.stack.length - 1];
    k(x, "expected node on stack"), k(x.type === "fragment", "expected fragment on stack");
    const b = this.resume(), U = this.stack[this.stack.length - 1];
    if (k(U, "expected node on stack"), k(
      U.type === "image" || U.type === "link",
      "expected image or link on stack"
    ), this.data.inReference = !0, U.type === "link") {
      const K = x.children;
      U.children = K;
    } else
      U.alt = b;
  }
  function y() {
    const x = this.resume(), b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(
      b.type === "image" || b.type === "link",
      "expected image or link on stack"
    ), b.url = x;
  }
  function ae() {
    const x = this.resume(), b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(
      b.type === "image" || b.type === "link",
      "expected image or link on stack"
    ), b.title = x;
  }
  function we() {
    this.data.inReference = void 0;
  }
  function C() {
    this.data.referenceType = "collapsed";
  }
  function H(x) {
    const b = this.resume(), U = this.stack[this.stack.length - 1];
    k(U, "expected node on stack"), k(
      U.type === "image" || U.type === "link",
      "expected image reference or link reference on stack"
    ), U.label = b, U.identifier = Jt(
      this.sliceSerialize(x)
    ).toLowerCase(), this.data.referenceType = "full";
  }
  function V(x) {
    k(
      x.type === "characterReferenceMarkerNumeric" || x.type === "characterReferenceMarkerHexadecimal"
    ), this.data.characterReferenceType = x.type;
  }
  function he(x) {
    const b = this.sliceSerialize(x), U = this.data.characterReferenceType;
    let K;
    if (U)
      K = Aa(
        b,
        U === d.characterReferenceMarkerNumeric ? z.numericBaseDecimal : z.numericBaseHexadecimal
      ), this.data.characterReferenceType = void 0;
    else {
      const Ne = Gr(b);
      k(Ne !== !1, "expected reference to decode"), K = Ne;
    }
    const se = this.stack[this.stack.length - 1];
    k(se, "expected `node`"), k("value" in se, "expected `node.value`"), se.value += K;
  }
  function ce(x) {
    const b = this.stack.pop();
    k(b, "expected `node`"), k(b.position, "expected `node.position`"), b.position.end = Pt(x.end);
  }
  function ee(x) {
    Z.call(this, x);
    const b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(b.type === "link", "expected link on stack"), b.url = this.sliceSerialize(x);
  }
  function ue(x) {
    Z.call(this, x);
    const b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(b.type === "link", "expected link on stack"), b.url = "mailto:" + this.sliceSerialize(x);
  }
  function ne() {
    return { type: "blockquote", children: [] };
  }
  function ke() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function be() {
    return { type: "inlineCode", value: "" };
  }
  function Me() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Ae() {
    return { type: "emphasis", children: [] };
  }
  function ze() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function lt() {
    return { type: "break" };
  }
  function Rt() {
    return { type: "html", value: "" };
  }
  function wt() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function It() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function kt(x) {
    return {
      type: "list",
      ordered: x.type === "listOrdered",
      start: null,
      spread: x._spread,
      children: []
    };
  }
  function Ut(x) {
    return {
      type: "listItem",
      spread: x._spread,
      checked: null,
      children: []
    };
  }
  function Bt() {
    return { type: "paragraph", children: [] };
  }
  function Gt() {
    return { type: "strong", children: [] };
  }
  function gt() {
    return { type: "text", value: "" };
  }
  function mt() {
    return { type: "thematicBreak" };
  }
}
function Pt(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function Va(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Va(e, r) : o1(e, r);
  }
}
function o1(e, t) {
  let n;
  for (n in t)
    if (Ga.call(t, n))
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
function Fi(e, t) {
  throw e ? new Error(
    "Cannot close `" + e.type + "` (" + pn({ start: e.start, end: e.end }) + "): a different token (`" + t.type + "`, " + pn({ start: t.start, end: t.end }) + ") is open"
  ) : new Error(
    "Cannot close document, a token (`" + t.type + "`, " + pn({ start: t.start, end: t.end }) + ") is still open"
  );
}
function s1(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return i1(r, {
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
function l1(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function c1(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function u1(e, t) {
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
function d1(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function h1(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function p1(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = tn(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
  let o, s = e.footnoteCounts.get(r);
  s === void 0 ? (s = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = a + 1, s += 1, e.footnoteCounts.set(r, s);
  const c = {
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
  e.patch(t, c);
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [c]
  };
  return e.patch(t, u), e.applyData(t, u);
}
function f1(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function g1(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function Wa(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function m1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Wa(e, t);
  const i = { src: tn(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function C1(e, t) {
  const n = { src: tn(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function y1(e, t) {
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
function w1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Wa(e, t);
  const i = { href: tn(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function k1(e, t) {
  const n = { href: tn(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function S1(e, t, n) {
  const r = e.all(t), i = n ? T1(n) : ja(t), a = {}, o = [];
  if (typeof t.checked == "boolean") {
    const l = r[0];
    let f;
    l && l.type === "element" && l.tagName === "p" ? f = l : (f = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(f)), f.children.length > 0 && f.children.unshift({ type: "text", value: " " }), f.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), a.className = ["task-list-item"];
  }
  let s = -1;
  for (; ++s < r.length; ) {
    const l = r[s];
    (i || s !== 0 || l.type !== "element" || l.tagName !== "p") && o.push({ type: "text", value: `
` }), l.type === "element" && l.tagName === "p" && !i ? o.push(...l.children) : o.push(l);
  }
  const c = r[r.length - 1];
  c && (i || c.type !== "element" || c.tagName !== "p") && o.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: a, children: o };
  return e.patch(t, u), e.applyData(t, u);
}
function T1(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = ja(n[r]);
  }
  return t;
}
function ja(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function E1(e, t) {
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
function x1(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function b1(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function _1(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function v1(e, t) {
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
    }, s = Hr(t.children[1]), c = xa(t.children[t.children.length - 1]);
    s && c && (o.position = { start: s, end: c }), i.push(o);
  }
  const a = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function R1(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, s = o ? o.length : t.children.length;
  let c = -1;
  const u = [];
  for (; ++c < s; ) {
    const f = t.children[c], m = {}, g = o ? o[c] : void 0;
    g && (m.align = g);
    let T = { type: "element", tagName: a, properties: m, children: [] };
    f && (T.children = e.all(f), e.patch(f, T), T = e.applyData(f, T)), u.push(T);
  }
  const l = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(t, l), e.applyData(t, l);
}
function I1(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Hi = 9, zi = 32;
function M1(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const a = [];
  for (; r; )
    a.push(
      Ui(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return a.push(Ui(t.slice(i), i > 0, !1)), a.join("");
}
function Ui(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let a = e.codePointAt(r);
    for (; a === Hi || a === zi; )
      r++, a = e.codePointAt(r);
  }
  if (n) {
    let a = e.codePointAt(i - 1);
    for (; a === Hi || a === zi; )
      i--, a = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function A1(e, t) {
  const n = { type: "text", value: M1(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function N1(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const L1 = {
  blockquote: l1,
  break: c1,
  code: u1,
  delete: d1,
  emphasis: h1,
  footnoteReference: p1,
  heading: f1,
  html: g1,
  imageReference: m1,
  image: C1,
  inlineCode: y1,
  linkReference: w1,
  link: k1,
  listItem: S1,
  list: E1,
  paragraph: x1,
  // @ts-expect-error: root is different, but hard to type.
  root: b1,
  strong: _1,
  table: v1,
  tableCell: I1,
  tableRow: R1,
  text: A1,
  thematicBreak: N1,
  toml: An,
  yaml: An,
  definition: An,
  footnoteDefinition: An
};
function An() {
}
const $a = -1, $n = 0, gn = 1, Bn = 2, jr = 3, $r = 4, qr = 5, Zr = 6, qa = 7, Za = 8, Bi = typeof self == "object" ? self : globalThis, O1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, o] = t[i];
    switch (a) {
      case $n:
      case $a:
        return n(o, i);
      case gn: {
        const s = n([], i);
        for (const c of o)
          s.push(r(c));
        return s;
      }
      case Bn: {
        const s = n({}, i);
        for (const [c, u] of o)
          s[r(c)] = r(u);
        return s;
      }
      case jr:
        return n(new Date(o), i);
      case $r: {
        const { source: s, flags: c } = o;
        return n(new RegExp(s, c), i);
      }
      case qr: {
        const s = n(/* @__PURE__ */ new Map(), i);
        for (const [c, u] of o)
          s.set(r(c), r(u));
        return s;
      }
      case Zr: {
        const s = n(/* @__PURE__ */ new Set(), i);
        for (const c of o)
          s.add(r(c));
        return s;
      }
      case qa: {
        const { name: s, message: c } = o;
        return n(new Bi[s](c), i);
      }
      case Za:
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
    return n(new Bi[a](o), i);
  };
  return r;
}, Gi = (e) => O1(/* @__PURE__ */ new Map(), e)(0), Kt = "", { toString: D1 } = {}, { keys: P1 } = Object, hn = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [$n, t];
  const n = D1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [gn, Kt];
    case "Object":
      return [Bn, Kt];
    case "Date":
      return [jr, Kt];
    case "RegExp":
      return [$r, Kt];
    case "Map":
      return [qr, Kt];
    case "Set":
      return [Zr, Kt];
    case "DataView":
      return [gn, n];
  }
  return n.includes("Array") ? [gn, n] : n.includes("Error") ? [qa, n] : [Bn, n];
}, Nn = ([e, t]) => e === $n && (t === "function" || t === "symbol"), F1 = (e, t, n, r) => {
  const i = (o, s) => {
    const c = r.push(o) - 1;
    return n.set(s, c), c;
  }, a = (o) => {
    if (n.has(o))
      return n.get(o);
    let [s, c] = hn(o);
    switch (s) {
      case $n: {
        let l = o;
        switch (c) {
          case "bigint":
            s = Za, l = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + c);
            l = null;
            break;
          case "undefined":
            return i([$a], o);
        }
        return i([s, l], o);
      }
      case gn: {
        if (c) {
          let m = o;
          return c === "DataView" ? m = new Uint8Array(o.buffer) : c === "ArrayBuffer" && (m = new Uint8Array(o)), i([c, [...m]], o);
        }
        const l = [], f = i([s, l], o);
        for (const m of o)
          l.push(a(m));
        return f;
      }
      case Bn: {
        if (c)
          switch (c) {
            case "BigInt":
              return i([c, o.toString()], o);
            case "Boolean":
            case "Number":
            case "String":
              return i([c, o.valueOf()], o);
          }
        if (t && "toJSON" in o)
          return a(o.toJSON());
        const l = [], f = i([s, l], o);
        for (const m of P1(o))
          (e || !Nn(hn(o[m]))) && l.push([a(m), a(o[m])]);
        return f;
      }
      case jr:
        return i([s, o.toISOString()], o);
      case $r: {
        const { source: l, flags: f } = o;
        return i([s, { source: l, flags: f }], o);
      }
      case qr: {
        const l = [], f = i([s, l], o);
        for (const [m, g] of o)
          (e || !(Nn(hn(m)) || Nn(hn(g)))) && l.push([a(m), a(g)]);
        return f;
      }
      case Zr: {
        const l = [], f = i([s, l], o);
        for (const m of o)
          (e || !Nn(hn(m))) && l.push(a(m));
        return f;
      }
    }
    const { message: u } = o;
    return i([s, { name: c, message: u }], o);
  };
  return a;
}, Vi = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return F1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, Gn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Gi(Vi(e, t)) : structuredClone(e)
) : (e, t) => Gi(Vi(e, t));
function H1(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function z1(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function U1(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || H1, r = e.options.footnoteBackLabel || z1, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, s = [];
  let c = -1;
  for (; ++c < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[c]
    );
    if (!u)
      continue;
    const l = e.all(u), f = String(u.identifier).toUpperCase(), m = tn(f.toLowerCase());
    let g = 0;
    const T = [], S = e.footnoteCounts.get(f);
    for (; S !== void 0 && ++g <= S; ) {
      T.length > 0 && T.push({ type: "text", value: " " });
      let R = typeof n == "string" ? n : n(c, g);
      typeof R == "string" && (R = { type: "text", value: R }), T.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + m + (g > 1 ? "-" + g : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(c, g),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(R) ? R : [R]
      });
    }
    const A = l[l.length - 1];
    if (A && A.type === "element" && A.tagName === "p") {
      const R = A.children[A.children.length - 1];
      R && R.type === "text" ? R.value += " " : A.children.push({ type: "text", value: " " }), A.children.push(...T);
    } else
      l.push(...T);
    const E = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + m },
      children: e.wrap(l, !0)
    };
    e.patch(u, E), s.push(E);
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
            ...Gn(o),
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
const Ka = (
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
      return W1;
    if (typeof e == "function")
      return qn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? B1(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        G1(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return V1(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function B1(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Ka(e[n]);
  return qn(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function G1(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return qn(n);
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
function V1(e) {
  return qn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function qn(e) {
  return t;
  function t(n, r, i) {
    return !!(j1(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function W1() {
  return !0;
}
function j1(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Xa = [], $1 = !0, Wi = !1, q1 = "skip";
function Z1(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = Ka(i), o = r ? -1 : 1;
  s(e, void 0, [])();
  function s(c, u, l) {
    const f = (
      /** @type {Record<string, unknown>} */
      c && typeof c == "object" ? c : {}
    );
    if (typeof f.type == "string") {
      const g = (
        // `hast`
        typeof f.tagName == "string" ? f.tagName : (
          // `xast`
          typeof f.name == "string" ? f.name : void 0
        )
      );
      Object.defineProperty(m, "name", {
        value: "node (" + (c.type + (g ? "<" + g + ">" : "")) + ")"
      });
    }
    return m;
    function m() {
      let g = Xa, T, S, A;
      if ((!t || a(c, u, l[l.length - 1] || void 0)) && (g = K1(n(c, l)), g[0] === Wi))
        return g;
      if ("children" in c && c.children) {
        const E = (
          /** @type {UnistParent} */
          c
        );
        if (E.children && g[0] !== q1)
          for (S = (r ? E.children.length : -1) + o, A = l.concat(E); S > -1 && S < E.children.length; ) {
            const R = E.children[S];
            if (T = s(R, S, A)(), T[0] === Wi)
              return T;
            S = typeof T[1] == "number" ? T[1] : S + o;
          }
      }
      return g;
    }
  }
}
function K1(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [$1, e] : e == null ? Xa : [e];
}
function Ya(e, t, n, r) {
  let i, a, o;
  typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), Z1(e, a, s, i);
  function s(c, u) {
    const l = u[u.length - 1], f = l ? l.children.indexOf(c) : void 0;
    return o(c, f, l);
  }
}
const Mr = {}.hasOwnProperty, X1 = {};
function Y1(e, t) {
  const n = t || X1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = { ...L1, ...n.handlers }, s = {
    all: u,
    applyData: Q1,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: o,
    one: c,
    options: n,
    patch: J1,
    wrap: td
  };
  return Ya(e, function(l) {
    if (l.type === "definition" || l.type === "footnoteDefinition") {
      const f = l.type === "definition" ? r : i, m = String(l.identifier).toUpperCase();
      f.has(m) || f.set(m, l);
    }
  }), s;
  function c(l, f) {
    const m = l.type, g = s.handlers[m];
    if (Mr.call(s.handlers, m) && g)
      return g(s, l, f);
    if (s.options.passThrough && s.options.passThrough.includes(m)) {
      if ("children" in l) {
        const { children: S, ...A } = l, E = Gn(A);
        return E.children = s.all(l), E;
      }
      return Gn(l);
    }
    return (s.options.unknownHandler || ed)(s, l, f);
  }
  function u(l) {
    const f = [];
    if ("children" in l) {
      const m = l.children;
      let g = -1;
      for (; ++g < m.length; ) {
        const T = s.one(m[g], l);
        if (T) {
          if (g && m[g - 1].type === "break" && (!Array.isArray(T) && T.type === "text" && (T.value = ji(T.value)), !Array.isArray(T) && T.type === "element")) {
            const S = T.children[0];
            S && S.type === "text" && (S.value = ji(S.value));
          }
          Array.isArray(T) ? f.push(...T) : f.push(T);
        }
      }
    }
    return f;
  }
}
function J1(e, t) {
  e.position && (t.position = Al(e));
}
function Q1(e, t) {
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
    n.type === "element" && a && Object.assign(n.properties, Gn(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function ed(e, t) {
  const n = t.data || {}, r = "value" in t && !(Mr.call(n, "hProperties") || Mr.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function td(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function ji(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function $i(e, t) {
  const n = Y1(e, t), r = n.one(e, void 0), i = U1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && (k("children" in a), a.children.push({ type: "text", value: `
` }, i)), a;
}
function nd(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      $i(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      $i(n, { file: r, ...e || t })
    );
  };
}
function qi(e) {
  if (e)
    throw e;
}
var Fn = Object.prototype.hasOwnProperty, Ja = Object.prototype.toString, Zi = Object.defineProperty, Ki = Object.getOwnPropertyDescriptor, Xi = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : Ja.call(t) === "[object Array]";
}, Yi = function(t) {
  if (!t || Ja.call(t) !== "[object Object]")
    return !1;
  var n = Fn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && Fn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || Fn.call(t, i);
}, Ji = function(t, n) {
  Zi && n.name === "__proto__" ? Zi(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, Qi = function(t, n) {
  if (n === "__proto__")
    if (Fn.call(t, n)) {
      if (Ki)
        return Ki(t, n).value;
    } else return;
  return t[n];
}, rd = function e() {
  var t, n, r, i, a, o, s = arguments[0], c = 1, u = arguments.length, l = !1;
  for (typeof s == "boolean" && (l = s, s = arguments[1] || {}, c = 2), (s == null || typeof s != "object" && typeof s != "function") && (s = {}); c < u; ++c)
    if (t = arguments[c], t != null)
      for (n in t)
        r = Qi(s, n), i = Qi(t, n), s !== i && (l && i && (Yi(i) || (a = Xi(i))) ? (a ? (a = !1, o = r && Xi(r) ? r : []) : o = r && Yi(r) ? r : {}, Ji(s, { name: n, newValue: e(l, o, i) })) : typeof i < "u" && Ji(s, { name: n, newValue: i }));
  return s;
};
const lr = /* @__PURE__ */ Pr(rd);
function Ar(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function id() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let a = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    s(null, ...i);
    function s(c, ...u) {
      const l = e[++a];
      let f = -1;
      if (c) {
        o(c);
        return;
      }
      for (; ++f < i.length; )
        (u[f] === null || u[f] === void 0) && (u[f] = i[f]);
      i = u, l ? ad(l, s)(...u) : o(null, ...u);
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
function ad(e, t) {
  let n;
  return r;
  function r(...o) {
    const s = e.length > o.length;
    let c;
    s && o.push(i);
    try {
      c = e.apply(this, o);
    } catch (u) {
      const l = (
        /** @type {Error} */
        u
      );
      if (s && n)
        throw l;
      return i(l);
    }
    s || (c && c.then && typeof c.then == "function" ? c.then(a, i) : c instanceof Error ? i(c) : a(c));
  }
  function i(o, ...s) {
    n || (n = !0, t(o, ...s));
  }
  function a(o) {
    i(null, o);
  }
}
const Tt = { basename: od, dirname: sd, extname: ld, join: cd, sep: "/" };
function od(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  wn(e);
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
function sd(e) {
  if (wn(e), e.length === 0)
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
function ld(e) {
  wn(e);
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
function cd(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    wn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : ud(n);
}
function ud(e) {
  wn(e);
  const t = e.codePointAt(0) === 47;
  let n = dd(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function dd(e, t) {
  let n = "", r = 0, i = -1, a = 0, o = -1, s, c;
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
            if (c = n.lastIndexOf("/"), c !== n.length - 1) {
              c < 0 ? (n = "", r = 0) : (n = n.slice(0, c), r = n.length - 1 - n.lastIndexOf("/")), i = o, a = 0;
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
function wn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const hd = { cwd: pd };
function pd() {
  return "/";
}
function Nr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function fd(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Nr(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return gd(e);
}
function gd(e) {
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
const cr = (
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
class Qa {
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
    t ? Nr(t) ? n = { path: t } : typeof t == "string" || md(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : hd.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < cr.length; ) {
      const a = cr[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      cr.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Tt.basename(this.path) : void 0;
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
    dr(t, "basename"), ur(t, "basename"), this.path = Tt.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Tt.dirname(this.path) : void 0;
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
    ea(this.basename, "dirname"), this.path = Tt.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Tt.extname(this.path) : void 0;
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
    if (ur(t, "extname"), ea(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Tt.join(this.dirname, this.stem + (t || ""));
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
    Nr(t) && (t = fd(t)), dr(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Tt.basename(this.path, this.extname) : void 0;
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
    dr(t, "stem"), ur(t, "stem"), this.path = Tt.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new Xe(
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
function ur(e, t) {
  if (e && e.includes(Tt.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + Tt.sep + "`"
    );
}
function dr(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function ea(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function md(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Cd = (
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
), yd = {}.hasOwnProperty;
class Kr extends Cd {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = id();
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
      new Kr()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(lr(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (fr("data", this.frozen), this.namespace[t] = n, this) : yd.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (fr("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = Ln(t), r = this.parser || this.Parser;
    return hr("parse", r), r(String(n), n);
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
    return this.freeze(), hr("process", this.parser || this.Parser), pr("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, o) {
      const s = Ln(t), c = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(s)
      );
      r.run(c, s, function(l, f, m) {
        if (l || !f || !m)
          return u(l);
        const g = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          f
        ), T = r.stringify(g, m);
        Sd(T) ? m.value = T : m.result = T, u(
          l,
          /** @type {VFileWithOutput<CompileResult>} */
          m
        );
      });
      function u(l, f) {
        l || !f ? o(l) : a ? a(f) : (k(n, "`done` is defined if `resolve` is not"), n(void 0, f));
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
    return this.freeze(), hr("processSync", this.parser || this.Parser), pr("processSync", this.compiler || this.Compiler), this.process(t, i), na("processSync", "process", n), k(r, "we either bailed on an error or have a tree"), r;
    function i(a, o) {
      n = !0, qi(a), r = o;
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
    ta(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(o, s) {
      k(
        typeof n != "function",
        "`file` can’t be a `done` anymore, we checked"
      );
      const c = Ln(n);
      i.run(t, c, u);
      function u(l, f, m) {
        const g = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          f || t
        );
        l ? s(l) : o ? o(g) : (k(r, "`done` is defined if `resolve` is not"), r(void 0, g, m));
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
    return this.run(t, n, a), na("runSync", "run", r), k(i, "we either bailed on an error or have a tree"), i;
    function a(o, s) {
      qi(o), i = s, r = !0;
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
    const r = Ln(n), i = this.compiler || this.Compiler;
    return pr("stringify", i), ta(t), i(t, r);
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
    if (fr("use", this.frozen), t != null) if (typeof t == "function")
      c(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? s(t) : o(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function a(u) {
      if (typeof u == "function")
        c(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [l, ...f] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          c(l, f);
        } else
          o(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function o(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      s(u.plugins), u.settings && (i.settings = lr(!0, i.settings, u.settings));
    }
    function s(u) {
      let l = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++l < u.length; ) {
          const f = u[l];
          a(f);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function c(u, l) {
      let f = -1, m = -1;
      for (; ++f < r.length; )
        if (r[f][0] === u) {
          m = f;
          break;
        }
      if (m === -1)
        r.push([u, ...l]);
      else if (l.length > 0) {
        let [g, ...T] = l;
        const S = r[m][1];
        Ar(S) && Ar(g) && (g = lr(!0, S, g)), r[m] = [u, g, ...T];
      }
    }
  }
}
const wd = new Kr().freeze();
function hr(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function pr(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function fr(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function ta(e) {
  if (!Ar(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function na(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function Ln(e) {
  return kd(e) ? e : new Qa(e);
}
function kd(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Sd(e) {
  return typeof e == "string" || Td(e);
}
function Td(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Ed = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", ra = [], ia = { allowDangerousHtml: !0 }, xd = /^(https?|ircs?|mailto|xmpp)$/i, bd = [
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
function aa(e) {
  const t = _d(e), n = vd(e);
  return Rd(t.runSync(t.parse(n), n), e);
}
function _d(e) {
  const t = e.rehypePlugins || ra, n = e.remarkPlugins || ra, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...ia } : ia;
  return wd().use(s1).use(n).use(nd, r).use(t);
}
function vd(e) {
  const t = e.children || "", n = new Qa();
  return typeof t == "string" ? n.value = t : kr(
    "Unexpected value `" + t + "` for `children` prop, expected `string`"
  ), n;
}
function Rd(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, s = t.unwrapDisallowed, c = t.urlTransform || Id;
  for (const l of bd)
    Object.hasOwn(t, l.from) && kr(
      "Unexpected `" + l.from + "` prop, " + (l.to ? "use `" + l.to + "` instead" : "remove it") + " (see <" + Ed + "#" + l.id + "> for more info)"
    );
  return n && a && kr(
    "Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other"
  ), Ya(e, u), Pl(e, {
    Fragment: Ht,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: p,
    jsxs: I,
    passKeys: !0,
    passNode: !0
  });
  function u(l, f, m) {
    if (l.type === "raw" && m && typeof f == "number")
      return o ? m.children.splice(f, 1) : m.children[f] = { type: "text", value: l.value }, f;
    if (l.type === "element") {
      let g;
      for (g in ir)
        if (Object.hasOwn(ir, g) && Object.hasOwn(l.properties, g)) {
          const T = l.properties[g], S = ir[g];
          (S === null || S.includes(l.tagName)) && (l.properties[g] = c(String(T || ""), g, l));
        }
    }
    if (l.type === "element") {
      let g = n ? !n.includes(l.tagName) : a ? a.includes(l.tagName) : !1;
      if (!g && r && typeof f == "number" && (g = !r(l, f, m)), g && m && typeof f == "number")
        return s && l.children ? m.children.splice(f, 1, ...l.children) : m.children.splice(f, 1), f;
    }
  }
}
function Id(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    xd.test(e.slice(0, t)) ? e : ""
  );
}
function Md({ children: e, isStreaming: t }) {
  const [n, r] = Ie(!0), [i, a] = Ie(!1);
  xt.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const o = () => {
    t || r(!n);
  }, s = xt.Children.map(e, (c) => {
    if (xt.isValidElement(c)) {
      if (c.type === eo)
        return xt.cloneElement(
          c,
          {
            onToggle: o,
            isExpanded: n
          }
        );
      if (c.type === to)
        return xt.cloneElement(
          c,
          {
            isVisible: n
          }
        );
    }
    return c;
  });
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning", children: s });
}
function eo({
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
        /* @__PURE__ */ p(
          "mask",
          {
            id: "mask0_64_36210",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "16",
            height: "16",
            children: /* @__PURE__ */ p("rect", { width: "16", height: "16", fill: "#D9D9D9" })
          }
        ),
        /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36210)", children: /* @__PURE__ */ p(
          "path",
          {
            d: "M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z",
            fill: "#637381"
          }
        ) })
      ]
    }
  ), o = t === "completed" || e.includes(te.UI_TEXT.THINKING) || e.includes(te.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ I(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${o ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: o ? r : void 0,
      style: { cursor: o ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ I("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ p("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        o && /* @__PURE__ */ p(
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
                  /* @__PURE__ */ p(
                    "mask",
                    {
                      id: "mask0_44_18068",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ p("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ p("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ p(
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
function to({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function Ad({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function Nd({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var c, u;
  const a = () => {
    if (!r || !i) return null;
    const l = i.find((f) => f.name === r);
    return (l == null ? void 0 : l.description) || null;
  };
  let o;
  if (r != null && r.startsWith("lat_")) {
    const l = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.query, f = (u = n == null ? void 0 : n.parameters) == null ? void 0 : u.url;
    o = l || f || "Executing tool...";
  } else
    o = a();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ p("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ p(
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
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ p("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ p("span", { children: o }),
          /* @__PURE__ */ I("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ p(
                    "mask",
                    {
                      id: "mask0_64_36278",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ p(
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
                  /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ p(
                    "path",
                    {
                      d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ p("span", { children: "Running..." })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ p("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ p(
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
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ p("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ p("span", { children: o }),
          /* @__PURE__ */ I("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ p(
                    "mask",
                    {
                      id: "mask0_64_36345",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ p(
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
                  /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36345)", children: /* @__PURE__ */ p(
                    "path",
                    {
                      d: "M7.1501 10.7819L11.1168 6.83193L10.2668 5.98193L7.1501 9.08193L5.73343 7.68193L4.88343 8.53193L7.1501 10.7819ZM8.0001 14.7819C7.12232 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.643 2.1001 10.8653C1.76676 10.0875 1.6001 9.25971 1.6001 8.38193C1.6001 7.49304 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73899 2.81527 5.51676 2.48193C6.29454 2.1486 7.12232 1.98193 8.0001 1.98193C8.88899 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11805 13.9001 5.89027C14.2334 6.66249 14.4001 7.49304 14.4001 8.38193C14.4001 9.25971 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.264 13.9486 10.4918 14.2819C9.71954 14.6153 8.88899 14.7819 8.0001 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819Z",
                      fill: "#4EAD13"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ p("span", { children: "Completed" })
          ] })
        ] });
      case "error":
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ p(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ p(
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
          /* @__PURE__ */ p("span", { className: "chat-wrapper__tooling-handle-title", children: e })
        ] });
      default:
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ p("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ p(
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
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ p("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ p(
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ p(
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
                /* @__PURE__ */ p("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ p("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ p("span", { children: "Pending..." })
        ] });
    }
  })() });
}
function no({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ I("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ p("span", {}),
    /* @__PURE__ */ p("span", {}),
    /* @__PURE__ */ p("span", {})
  ] }) : t === "pulse" ? /* @__PURE__ */ p(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ p(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: e, height: e }
    }
  );
}
const Ld = ({ message: e }) => {
  const [t, n] = Ie(!0);
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ I(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!t),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          e.role === "system" ? /* @__PURE__ */ I("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
              "svg",
              {
                width: "20",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ p(
                    "mask",
                    {
                      id: "mask0_64_36257",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ p("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ p(
                    "path",
                    {
                      d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }),
            /* @__PURE__ */ p("span", { children: "AI text input <show-toolname>..." })
          ] }) : /* @__PURE__ */ p("span", { children: "System Message" }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ p("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ p(
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
    t && /* @__PURE__ */ p("div", { className: "chat-wrapper__system-message-content", children: /* @__PURE__ */ p("span", { children: e.content }) })
  ] });
};
function ro({
  imageUrl: e,
  isOpen: t,
  onClose: n,
  alt: r = "Image preview"
}) {
  const i = de((o) => {
    o.key === "Escape" && n();
  }, [n]), a = de((o) => {
    o.target === o.currentTarget && n();
  }, [n]);
  return _e(() => (t ? (document.addEventListener("keydown", i), document.body.style.overflow = "hidden") : (document.removeEventListener("keydown", i), document.body.style.overflow = ""), () => {
    document.removeEventListener("keydown", i), document.body.style.overflow = "";
  }), [t, i]), !t || !e ? null : /* @__PURE__ */ I(
    "div",
    {
      className: "image-preview-modal__backdrop",
      onClick: a,
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        cursor: "zoom-out"
      },
      children: [
        /* @__PURE__ */ p(
          "button",
          {
            onClick: n,
            style: {
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s",
              zIndex: 1e4
            },
            onMouseEnter: (o) => {
              o.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            },
            onMouseLeave: (o) => {
              o.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            },
            title: "Close (Esc)",
            children: "×"
          }
        ),
        /* @__PURE__ */ p(
          "div",
          {
            style: {
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "default"
            },
            onClick: (o) => o.stopPropagation(),
            children: /* @__PURE__ */ p(
              "img",
              {
                src: e,
                alt: r,
                style: {
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  opacity: 1
                  // Ensure image is visible by default
                },
                onLoad: (o) => {
                  o.currentTarget.style.opacity = "1", o.currentTarget.style.transition = "opacity 0.2s";
                }
              }
            )
          }
        ),
        /* @__PURE__ */ p(
          "div",
          {
            style: {
              position: "absolute",
              bottom: "20px",
              left: "0",
              right: "0",
              width: "100%",
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "14px",
              textAlign: "center",
              pointerEvents: "none"
            },
            children: "Press Esc or click outside to close"
          }
        )
      ]
    }
  );
}
const io = fo(null);
function Od({ children: e, value: t }) {
  return /* @__PURE__ */ p(io.Provider, { value: t, children: e });
}
function kn() {
  const e = go(io);
  if (!e)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return e;
}
const ao = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ p("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ p("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ p("code", { className: "chat-wrapper__code", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ p("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ p("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ p("li", { className: "chat-wrapper__list-item", ...t, children: e }),
  hr: ({ ...e }) => /* @__PURE__ */ p("hr", { className: "chat-wrapper__hr", ...e })
}, Dd = {
  ...ao,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ p("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ p("code", { className: "chat-wrapper__code", ...n, children: e })
}, oo = oa(
  ({ message: e }) => {
    const {
      getReasoningTitle: t,
      getReasoningStatus: n,
      getReasoningDuration: r,
      getReasoningContentOnly: i,
      getToolingTitle: a,
      getToolingStatus: o,
      clientTools: s,
      currentAssistantMessageIdRef: c,
      onRetryMessage: u
    } = kn(), [l, f] = Ie(!1), [m, g] = Ie(!1), [T, S] = Ie(null), A = de(async () => {
      try {
        await navigator.clipboard.writeText(e.content), f(!0), setTimeout(() => f(!1), 2e3);
      } catch (J) {
        console.error("Failed to copy message:", J);
      }
    }, [e.content]), E = de(() => {
      u && u(e.id);
    }, [u, e.id]), R = de((J) => {
      S(J);
    }, []), D = de(() => {
      S(null);
    }, []), O = () => /* @__PURE__ */ I("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ p(no, { size: 16, variant: "dots" }),
      /* @__PURE__ */ p("span", { children: te.UI_TEXT.THINKING })
    ] }), P = () => u && /* @__PURE__ */ p(
      "button",
      {
        className: "chat-wrapper__retry-button",
        onClick: E,
        children: "Retry?"
      }
    ), _ = () => /* @__PURE__ */ I(Ht, { children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ p(
        "button",
        {
          className: `chat-wrapper__copy-button ${m ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: A,
          title: "Copy message",
          children: /* @__PURE__ */ p(Fs, {})
        }
      ) }),
      l && /* @__PURE__ */ p("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), B = () => /* @__PURE__ */ p("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(aa, { components: ao, children: e.content }) }),
      _()
    ] }) }), Q = () => /* @__PURE__ */ I("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(aa, { components: Dd, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ p("div", { className: "chat-wrapper__media", children: e.media.map((J, M) => /* @__PURE__ */ p(
        "img",
        {
          src: J,
          alt: `Uploaded content ${M + 1}`,
          className: "chat-wrapper__media-image chat-wrapper__media-image--clickable",
          onClick: () => R(J),
          style: {
            cursor: "zoom-in",
            transition: "transform 0.2s, box-shadow 0.2s"
          },
          onMouseEnter: (F) => {
            F.currentTarget.style.transform = "scale(1.02)", F.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
          },
          onMouseLeave: (F) => {
            F.currentTarget.style.transform = "scale(1)", F.currentTarget.style.boxShadow = "";
          },
          title: "Click to view full size"
        },
        M
      )) })
    ] }), $ = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === c.current ? O() : e.role === "system" ? /* @__PURE__ */ p(Ld, { message: e }) : e.role === "assistant" ? B() : Q(), Z = () => /* @__PURE__ */ I(Md, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ p(
        eo,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ p(to, { children: i(e.content) })
    ] }), W = () => {
      var J;
      return /* @__PURE__ */ p(Ad, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ p(
        Nd,
        {
          title: a(e.content, e.isStreaming),
          status: o(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (J = e.toolData) == null ? void 0 : J.toolName,
          clientTools: s
        }
      ) });
    };
    return /* @__PURE__ */ I(Ht, { children: [
      /* @__PURE__ */ p(
        "div",
        {
          className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
          onMouseEnter: () => e.role === "assistant" && g(!0),
          onMouseLeave: () => e.role === "assistant" && g(!1),
          children: e.role === "reasoning" ? Z() : e.role === "tooling" ? W() : /* @__PURE__ */ I(Ht, { children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__message-content", children: $() }),
            e.role === "user" && e.hasError && !e.isRetrying && P()
          ] })
        }
      ),
      /* @__PURE__ */ p(
        ro,
        {
          imageUrl: T,
          isOpen: !!T,
          onClose: D,
          alt: "Message image"
        }
      )
    ] });
  }
);
oo.displayName = "MessageItem";
const Pd = ({ isVisible: e }) => e ? /* @__PURE__ */ p("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ p("span", {}),
  /* @__PURE__ */ p("span", {}),
  /* @__PURE__ */ p("span", {})
] }) }) }) }) : null, so = Vn((e, t) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = kn();
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__messages", children: [
    n.map((a) => /* @__PURE__ */ p(
      oo,
      {
        message: a
      },
      a.id
    )),
    /* @__PURE__ */ p(Pd, { isVisible: r && !i }),
    /* @__PURE__ */ p("div", { ref: t })
  ] });
});
so.displayName = "MessagesList";
const yt = (...e) => e.filter(Boolean).join(" "), Fd = () => /* @__PURE__ */ I(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ I("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ p(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ p("g", { clipPath: "url(#clip0_121_23927)", children: /* @__PURE__ */ p(
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
              /* @__PURE__ */ p("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ p(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ p("feOffset", { dy: "1" }),
              /* @__PURE__ */ p("feGaussianBlur", { stdDeviation: "1" }),
              /* @__PURE__ */ p("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ p(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                }
              ),
              /* @__PURE__ */ p(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ p(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ p("feOffset", { dy: "1" }),
              /* @__PURE__ */ p("feGaussianBlur", { stdDeviation: "1.5" }),
              /* @__PURE__ */ p("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ p(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                }
              ),
              /* @__PURE__ */ p(
                "feBlend",
                {
                  mode: "normal",
                  in2: "effect1_dropShadow_121_23927",
                  result: "effect2_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ p(
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
        /* @__PURE__ */ p("clipPath", { id: "clip0_121_23927", children: /* @__PURE__ */ p(
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
), Hd = () => /* @__PURE__ */ I(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ I("g", { filter: "url(#filter0_dd_stop_121_23927)", children: [
        /* @__PURE__ */ p(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ p("g", { transform: "translate(11, 11.3541)", children: /* @__PURE__ */ p("path", { d: "M21.3333 10.6667V21.3333H10.6667V10.6667H21.3333ZM24 8H8V24H24V8Z", fill: "white" }) })
      ] }),
      /* @__PURE__ */ p("defs", { children: /* @__PURE__ */ I(
        "filter",
        {
          id: "filter0_dd_stop_121_23927",
          x: "0",
          y: "0.354126",
          width: "54",
          height: "54",
          filterUnits: "userSpaceOnUse",
          colorInterpolationFilters: "sRGB",
          children: [
            /* @__PURE__ */ p("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
            /* @__PURE__ */ p(
              "feColorMatrix",
              {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
              }
            ),
            /* @__PURE__ */ p("feOffset", { dy: "1" }),
            /* @__PURE__ */ p("feGaussianBlur", { stdDeviation: "1" }),
            /* @__PURE__ */ p("feComposite", { in2: "hardAlpha", operator: "out" }),
            /* @__PURE__ */ p(
              "feColorMatrix",
              {
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
              }
            ),
            /* @__PURE__ */ p(
              "feBlend",
              {
                mode: "normal",
                in2: "BackgroundImageFix",
                result: "effect1_dropShadow_stop_121_23927"
              }
            ),
            /* @__PURE__ */ p(
              "feColorMatrix",
              {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
              }
            ),
            /* @__PURE__ */ p("feOffset", { dy: "1" }),
            /* @__PURE__ */ p("feGaussianBlur", { stdDeviation: "1.5" }),
            /* @__PURE__ */ p("feComposite", { in2: "hardAlpha", operator: "out" }),
            /* @__PURE__ */ p(
              "feColorMatrix",
              {
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              }
            ),
            /* @__PURE__ */ p(
              "feBlend",
              {
                mode: "normal",
                in2: "effect1_dropShadow_stop_121_23927",
                result: "effect2_dropShadow_stop_121_23927"
              }
            ),
            /* @__PURE__ */ p(
              "feBlend",
              {
                mode: "normal",
                in: "SourceGraphic",
                in2: "effect2_dropShadow_stop_121_23927",
                result: "shape"
              }
            )
          ]
        }
      ) })
    ]
  }
), zd = ({ className: e, ...t }) => /* @__PURE__ */ p("form", { className: yt("chat-wrapper__prompt-input", e), ...t }), lo = Vn(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...o
  }, s) => {
    const c = (u) => {
      if (u.key === "Enter") {
        if (u.shiftKey)
          return;
        u.preventDefault();
        const l = u.currentTarget.form;
        if (l) {
          const f = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          l.dispatchEvent(f);
        }
      }
      a == null || a(u);
    };
    return /* @__PURE__ */ p(
      "textarea",
      {
        ref: s,
        className: yt("chat-wrapper__prompt-textarea", t),
        name: "message",
        onChange: e,
        onKeyDown: c,
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
lo.displayName = "PromptInputTextarea";
const Ud = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p("div", { className: yt("chat-wrapper__prompt-toolbar", e), ...t }), Bd = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p("div", { className: yt("chat-wrapper__prompt-tools", e), ...t }), Gd = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || xt.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ p(
    "button",
    {
      className: yt(
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
}, Vd = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = Te.IDLE,
  children: i,
  disabled: a,
  ...o
}) => {
  const s = gr(r);
  let c = s ? /* @__PURE__ */ p(Hd, {}) : /* @__PURE__ */ p(Fd, {});
  return /* @__PURE__ */ p(
    "button",
    {
      className: yt(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${t}`,
        `chat-wrapper__prompt-submit--${n}`,
        !a && "chat-wrapper__prompt-submit--enabled",
        s && "chat-wrapper__prompt-submit--stop",
        e
      ),
      type: s ? "button" : "submit",
      disabled: a,
      ...o,
      children: i ?? c
    }
  );
}, ph = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ p("select", { className: yt("chat-wrapper__prompt-select", e), ...n, children: t }), fh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ p(
  "button",
  {
    className: yt("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), gh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p(
  "div",
  {
    className: yt("chat-wrapper__prompt-select-content", e),
    ...t
  }
), mh = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ p(
  "div",
  {
    className: yt("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), Ch = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ p(
  "span",
  {
    className: yt("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), Wd = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = Ie(0), [a, o] = Ie(!1), [s, c] = Ie(0);
  return _e(() => {
    if (!t || e.length <= 1) return;
    const u = setInterval(() => {
      o(!0), setTimeout(() => {
        i((l) => (l + 1) % e.length), c((l) => l + 1), o(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(u);
  }, [t, e.length]), _e(() => {
    t || (i(0), o(!1), c(0));
  }, [t]), /* @__PURE__ */ p(
    "div",
    {
      className: `animated-placeholder-container ${n}`,
      children: /* @__PURE__ */ p(
        "span",
        {
          className: `animated-placeholder-text ${a ? "transitioning" : ""}`,
          children: e[r]
        },
        s
      )
    }
  );
}, jd = Vn((e, t) => {
  const {
    placeholderTexts: n,
    isStreaming: r,
    isLoadingConversation: i,
    chatStatus: a,
    fileUploadEnabled: o,
    fileUploadConfig: s,
    chipName: c,
    chipLogo: u,
    messages: l,
    onSubmit: f,
    onFileUpload: m,
    onStopGeneration: g,
    connectionState: T
  } = kn(), S = r || i || T !== He.CONNECTED, A = T === He.CONNECTING, E = T === He.CONNECTED, R = l.length > 0, [D, O] = Ie(""), [P, _] = Ie([]), [B, Q] = Ie([]), [$, Z] = Ie(null), [W, J] = Ie(null), [M, F] = Ie(!1), G = ge(null), le = de(
    (H) => {
      J(H), F(!0);
    },
    []
  ), ie = de((H) => new Promise((V, he) => {
    const ce = new FileReader();
    ce.onload = () => V(ce.result), ce.onerror = he, ce.readAsDataURL(H);
  }), []), ye = n && n.length > 0 ? n : ["What would you like to know?"], Ce = D.length === 0 && !R && ye.length > 1;
  sa(t, () => ({
    focus: () => {
      var H;
      (H = G.current) == null || H.focus();
    },
    setText: (H) => {
      O(H), setTimeout(() => {
        if (G.current) {
          G.current.focus();
          const V = H.length;
          G.current.setSelectionRange(V, V);
        }
      }, 0);
    },
    textareaRef: G
  }), []);
  const y = de(
    (H) => {
      H.preventDefault();
      const he = new FormData(H.currentTarget).get("message");
      if (he != null && he.trim()) {
        const ce = zn(he.trim(), !1);
        if (!ce.trim())
          return;
        f(ce, P), O(""), _([]);
      }
    },
    [f, P]
  ), ae = de(
    (H) => {
      const he = H.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      O(he), $ && he.trim() && Z(null);
    },
    [$]
  ), we = de(
    async (H) => {
      var ce;
      const he = Array.from(((ce = H.clipboardData) == null ? void 0 : ce.items) || []).filter((ee) => ee.type.startsWith("image/"));
      if (he.length > 0) {
        H.preventDefault(), Z(null);
        try {
          const ee = await Promise.all(
            he.map((ue) => {
              const ne = ue.getAsFile();
              return ne ? new File(
                [ne],
                `clipboard-image-${Date.now()}.${ne.type.split("/")[1]}`,
                {
                  type: ne.type
                }
              ) : null;
            })
          ).then((ue) => ue.filter(Boolean));
          if (ee.length > 0) {
            const ue = ee.filter((ne) => {
              const ke = (s == null ? void 0 : s.maxFileSize) ?? 15728640;
              if (ne.size > ke)
                return Z(`File too large. Maximum size is ${Math.round(ke / 1048576)}MB.`), !1;
              const be = (s == null ? void 0 : s.allowedTypes) ?? [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp"
              ];
              return be.includes(ne.type) ? !0 : (Z(
                `File type not supported. Allowed types: ${be.join(", ")}`
              ), !1);
            });
            if (ue.length > 0) {
              const ne = (s == null ? void 0 : s.maxFiles) ?? 5;
              if (P.length + B.length + ue.length > ne) {
                Z(`Maximum ${ne} files allowed. Currently ${P.length + B.length} files, trying to add ${ue.length} more.`);
                return;
              }
              const be = ue.map(async (Ae) => ({
                file: Ae,
                preview: await ie(Ae),
                isUploading: !0,
                progress: 0
              })), Me = await Promise.all(be);
              Q((Ae) => [...Ae, ...Me]);
              try {
                const Ae = await m(ue);
                Q((ze) => ze.filter((lt) => !ue.includes(lt.file))), _((ze) => [...ze, ...Ae]), Z(null);
              } catch {
                Q((ze) => ze.filter((lt) => !ue.includes(lt.file))), Z("File upload failed. Ensure a stable connection and try again.");
              }
            }
          }
        } catch (ee) {
          Z(
            ee instanceof Error ? ee.message : "Failed to paste image"
          ), Q([]);
        }
      }
    },
    [m, s, P, B, ie]
  ), C = de(async () => {
    const H = document.createElement("input");
    H.type = "file", H.accept = "image/*", H.multiple = !0, H.onchange = async (V) => {
      const he = V.target.files;
      if (he)
        try {
          Z(null);
          const ce = Array.from(he).filter((ee) => {
            const ue = ts(ee.name);
            ee.name;
            const ne = (s == null ? void 0 : s.maxFileSize) ?? 15 * 1024 * 1024;
            if (ee.size > ne)
              return Z(`File too large. Maximum size is ${Math.round(ne / (1024 * 1024))}MB.`), !1;
            const ke = (s == null ? void 0 : s.allowedTypes) ?? [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ];
            return ke.includes(ee.type) ? !0 : (Z(
              `File type not supported. Allowed types: ${ke.join(", ")}`
            ), !1);
          });
          if (ce.length > 0) {
            const ee = (s == null ? void 0 : s.maxFiles) ?? 5;
            if (P.length + B.length + ce.length > ee) {
              Z(`Maximum ${ee} files allowed. Currently ${P.length + B.length} files, trying to add ${ce.length} more.`);
              return;
            }
            const ne = ce.map(async (be) => ({
              file: be,
              preview: await ie(be),
              isUploading: !0,
              progress: 0
            })), ke = await Promise.all(ne);
            Q((be) => [...be, ...ke]);
            try {
              const be = await m(ce);
              Q((Me) => Me.filter((Ae) => !ce.includes(Ae.file))), _((Me) => [...Me, ...be]), Z(null);
            } catch {
              Q((Me) => Me.filter((Ae) => !ce.includes(Ae.file))), Z("File upload failed. Ensure a stable connection and try again.");
            }
          }
        } catch (ce) {
          Z(
            ce instanceof Error ? ce.message : "Upload failed"
          ), Q([]);
        }
    }, H.click();
  }, [m, s, P, B, ie]);
  return /* @__PURE__ */ I(
    zd,
    {
      onSubmit: y,
      className: `${S ? "chat-wrapper__prompt-input--disabled" : ""} ${P.length > 0 || B.length > 0 || $ ? "chat-wrapper__prompt-input--with-media" : ""}`,
      children: [
        /* @__PURE__ */ p(
          lo,
          {
            ref: G,
            name: "message",
            value: D,
            onChange: ae,
            onPaste: we,
            placeholder: "",
            disabled: S
          }
        ),
        !D.trim() && E && /* @__PURE__ */ p(
          Wd,
          {
            placeholderTexts: ye,
            shouldAnimate: Ce
          }
        ),
        A && /* @__PURE__ */ I("div", { className: "chat-wrapper__connecting-indicator", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__connecting-spinner" }),
          /* @__PURE__ */ p("span", { children: "Connecting..." })
        ] }),
        $ && /* @__PURE__ */ I("div", { className: "chat-wrapper__upload-error", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__upload-error-icon", children: /* @__PURE__ */ p("span", { className: "chat-wrapper__upload-error-icon-text", children: "!" }) }),
          /* @__PURE__ */ p("span", { className: "chat-wrapper__upload-error-message", children: $ }),
          /* @__PURE__ */ p(
            "button",
            {
              className: "chat-wrapper__upload-error-dismiss",
              onClick: () => Z(null),
              title: "Dismiss",
              children: "×"
            }
          )
        ] }),
        (P.length > 0 || B.length > 0) && /* @__PURE__ */ I("div", { className: "chat-wrapper__media-preview-container", children: [
          B.map((H, V) => /* @__PURE__ */ I(
            "div",
            {
              className: "chat-wrapper__media-item-wrapper",
              children: [
                /* @__PURE__ */ I("div", { className: "chat-wrapper__uploading-thumbnail", children: [
                  /* @__PURE__ */ p(
                    "img",
                    {
                      src: H.preview,
                      alt: `Uploading ${V + 1}`,
                      className: "chat-wrapper__uploading-thumbnail-image"
                    }
                  ),
                  /* @__PURE__ */ p("div", { className: "chat-wrapper__uploading-overlay", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__uploading-spinner" }) })
                ] }),
                /* @__PURE__ */ p(
                  "button",
                  {
                    onClick: () => {
                      Q((he) => he.filter((ce, ee) => ee !== V));
                    },
                    className: "chat-wrapper__media-remove-button",
                    title: "Cancel upload",
                    children: "×"
                  }
                )
              ]
            },
            `uploading-${V}`
          )),
          P.map((H, V) => {
            const he = H.startsWith("data:image/"), ce = H.startsWith("http://") || H.startsWith("https://"), ee = he || ce;
            return /* @__PURE__ */ I(
              "div",
              {
                className: "chat-wrapper__media-item-wrapper",
                children: [
                  ee ? /* @__PURE__ */ I(
                    "div",
                    {
                      className: "chat-wrapper__media-thumbnail",
                      onClick: () => le(H),
                      title: "Click to view full image",
                      children: [
                        /* @__PURE__ */ p(
                          "img",
                          {
                            src: H,
                            alt: `Attachment ${V + 1}`,
                            className: "chat-wrapper__media-thumbnail-image"
                          }
                        ),
                        /* @__PURE__ */ p("div", { className: "chat-wrapper__media-thumbnail-overlay" }),
                        /* @__PURE__ */ p("div", { className: "chat-wrapper__media-thumbnail-zoom-icon" })
                      ]
                    }
                  ) : /* @__PURE__ */ I("div", { className: "chat-wrapper__file-preview", children: [
                    /* @__PURE__ */ p("div", { className: "chat-wrapper__file-icon-container", children: /* @__PURE__ */ I(
                      "svg",
                      {
                        width: "24",
                        height: "25",
                        viewBox: "0 0 24 25",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [
                          /* @__PURE__ */ p(
                            "mask",
                            {
                              id: "mask0_190_623",
                              style: { maskType: "alpha" },
                              maskUnits: "userSpaceOnUse",
                              x: "0",
                              y: "0",
                              width: "24",
                              height: "25",
                              children: /* @__PURE__ */ p(
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
                          /* @__PURE__ */ p("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ p(
                            "path",
                            {
                              d: "M8.19225 13.0079H15.8077V11.5079H8.19225V13.0079ZM8.19225 15.8926H15.8077V14.3926H8.19225V15.8926ZM8.19225 18.7771H12.8077V17.2771H8.19225V18.7771ZM6.30775 21.8541C5.80258 21.8541 5.375 21.6791 5.025 21.3291C4.675 20.9791 4.5 20.5515 4.5 20.0464V4.66188C4.5 4.15671 4.675 3.72913 5.025 3.37913C5.375 3.02913 5.80258 2.85413 6.30775 2.85413H14.25L19.5 8.10413V20.0464C19.5 20.5515 19.325 20.9791 18.975 21.3291C18.625 21.6791 18.1974 21.8541 17.6923 21.8541H6.30775ZM13.5 8.85413V4.35413H6.30775C6.23075 4.35413 6.16025 4.38621 6.09625 4.45038C6.03208 4.51438 6 4.58488 6 4.66188V20.0464C6 20.1234 6.03208 20.1939 6.09625 20.2579C6.16025 20.322 6.23075 20.3541 6.30775 20.3541H17.6923C17.7692 20.3541 17.8398 20.322 17.9038 20.2579C17.9679 20.1939 18 20.1234 18 20.0464V8.85413H13.5Z",
                              fill: "white"
                            }
                          ) })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ I("div", { className: "chat-wrapper__file-info", children: [
                      /* @__PURE__ */ p("div", { className: "chat-wrapper__file-name", children: (() => {
                        const ue = H.match(/name=([^;]+)/);
                        return ue ? decodeURIComponent(ue[1]) : "document.pdf";
                      })() }),
                      /* @__PURE__ */ p("div", { className: "chat-wrapper__file-type", children: (() => {
                        const ue = H.match(/data:([^;]+)/);
                        if (ue) {
                          const ne = ue[1];
                          switch (ne) {
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
                              const ke = ne.split("/")[1];
                              return ke ? ke.toUpperCase().substring(0, 4) : "FILE";
                          }
                        }
                        return "FILE";
                      })() })
                    ] })
                  ] }),
                  /* @__PURE__ */ p(
                    "button",
                    {
                      onClick: () => {
                        _(
                          (ue) => ue.filter((ne, ke) => ke !== V)
                        ), $ && Z(null);
                      },
                      className: `chat-wrapper__media-remove-button ${ee ? "" : "chat-wrapper__media-remove-button--file"}`,
                      title: "Remove attachment",
                      children: "×"
                    }
                  )
                ]
              },
              `uploaded-${V}`
            );
          })
        ] }),
        /* @__PURE__ */ I(Ud, { children: [
          /* @__PURE__ */ I(Bd, { children: [
            o && /* @__PURE__ */ p("div", { className: "chat-wrapper__file-upload-container", children: /* @__PURE__ */ p(
              Gd,
              {
                variant: "ghost",
                size: "icon",
                onClick: C,
                title: B.length > 0 ? `Uploading ${B.length} file(s)...` : P.length > 0 ? `${P.length}/${(s == null ? void 0 : s.maxFiles) ?? 5} image(s) attached` : `Attach images (max ${(s == null ? void 0 : s.maxFiles) ?? 5} files, ${Math.round(((s == null ? void 0 : s.maxFileSize) ?? 15 * 1024 * 1024) / (1024 * 1024))}MB each)`,
                disabled: S || B.length > 0,
                children: /* @__PURE__ */ I(
                  "svg",
                  {
                    width: "36",
                    height: "37",
                    viewBox: "0 0 36 37",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: [
                      /* @__PURE__ */ p(
                        "rect",
                        {
                          y: "0.354126",
                          width: "36",
                          height: "36",
                          rx: "18",
                          fill: "#F4F6F8"
                        }
                      ),
                      /* @__PURE__ */ p("g", { clipPath: "url(#clip0_121_9706)", children: /* @__PURE__ */ p(
                        "path",
                        {
                          d: "M21.3334 13.3541V22.9374C21.3334 24.7791 19.8417 26.2708 18 26.2708C16.1584 26.2708 14.6667 24.7791 14.6667 22.9374V12.5208C14.6667 11.3708 15.6 10.4374 16.75 10.4374C17.9 10.4374 18.8334 11.3708 18.8334 12.5208V21.2708C18.8334 21.7291 18.4584 22.1041 18 22.1041C17.5417 22.1041 17.1667 21.7291 17.1667 21.2708V13.3541H15.9167V21.2708C15.9167 22.4208 16.85 23.3541 18 23.3541C19.15 23.3541 20.0834 22.4208 20.0834 21.2708V12.5208C20.0834 10.6791 18.5917 9.18744 16.75 9.18744C14.9084 9.18744 13.4167 10.6791 13.4167 12.5208V22.9374C13.4167 25.4708 15.4667 27.5208 18 27.5208C20.5334 27.5208 22.5834 25.4708 22.5834 22.9374V13.3541H21.3334Z",
                          fill: "#212B36"
                        }
                      ) }),
                      /* @__PURE__ */ p("defs", { children: /* @__PURE__ */ p("clipPath", { id: "clip0_121_9706", children: /* @__PURE__ */ p(
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
            ) }),
            o && c && /* @__PURE__ */ p("div", { className: "chat-wrapper__divider" }),
            c && /* @__PURE__ */ I("div", { className: "chat-wrapper__restaurant-chip", children: [
              u && /* @__PURE__ */ p(
                "img",
                {
                  src: u,
                  alt: "Chip logo",
                  className: "chat-wrapper__restaurant-logo"
                }
              ),
              /* @__PURE__ */ p("span", { className: "chat-wrapper__restaurant-name", children: c })
            ] })
          ] }),
          /* @__PURE__ */ p(
            Vd,
            {
              status: a,
              disabled: gr(a) ? !1 : !D.trim() || S || B.length > 0,
              onClick: gr(a) && g ? () => {
                g();
              } : void 0
            }
          )
        ] }),
        /* @__PURE__ */ p(
          ro,
          {
            imageUrl: W,
            isOpen: M,
            onClose: () => {
              F(!1), J(null);
            },
            alt: "Image preview"
          }
        )
      ]
    }
  );
}), $d = () => {
  const { suggestedPrompts: e, chatInputRef: t, enableSuggestedPromptsAnimation: n = !0, connectionState: r } = kn(), i = ge(!1), a = ge(null), o = ge(null);
  if (_e(() => () => {
    a.current && cancelAnimationFrame(a.current), o.current && clearTimeout(o.current);
  }, []), !e || e.length === 0)
    return null;
  const s = de((u) => {
    var m;
    if (r !== He.CONNECTED || i.current)
      return;
    if (!t.current) {
      console.warn("Chat input ref not available");
      return;
    }
    if (!n) {
      t.current.setText(u.description), t.current.focus();
      return;
    }
    a.current && (cancelAnimationFrame(a.current), a.current = null), o.current && (clearTimeout(o.current), o.current = null);
    const l = (m = t.current.textareaRef) == null ? void 0 : m.current;
    if (!l) {
      console.warn("Textarea ref not available, using fallback"), t.current.setText(u.description);
      return;
    }
    t.current.setText(""), l.focus(), i.current = !0;
    let f = !1;
    return u.description.length > 0 && t.current.setText(u.description[0]), o.current = setTimeout(() => {
      let g = 1;
      const T = 10, S = () => {
        if (f || !t.current) {
          i.current = !1, o.current = null;
          return;
        }
        if (g < u.description.length) {
          const A = u.description.substring(0, g + 1);
          l.value = A;
          const E = new Event("input", { bubbles: !0 });
          l.dispatchEvent(E), g++, o.current = setTimeout(S, T);
        } else
          i.current = !1, o.current = null, t.current && t.current.setText(u.description);
      };
      S();
    }, 10), () => {
      f = !0, o.current && (clearTimeout(o.current), o.current = null), i.current = !1;
    };
  }, [t, n, r]), c = r !== He.CONNECTED;
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__suggested-prompts", children: [
    /* @__PURE__ */ p("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
    /* @__PURE__ */ p("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((u, l) => /* @__PURE__ */ p(
      "button",
      {
        className: "chat-wrapper__suggested-prompt-card",
        onClick: () => s(u),
        disabled: c,
        style: {
          opacity: c ? 0.5 : 1,
          cursor: c ? "not-allowed" : "pointer",
          pointerEvents: c ? "none" : "auto"
        },
        children: /* @__PURE__ */ I("div", { className: "chat-wrapper__suggested-prompt-content", children: [
          /* @__PURE__ */ p("h4", { className: "chat-wrapper__suggested-prompt-title", children: u.title }),
          /* @__PURE__ */ p("p", { className: "chat-wrapper__suggested-prompt-description", children: u.description })
        ] })
      },
      l
    )) })
  ] });
}, qd = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ p(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ p("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ p(no, { size: e, variant: "dots" }) })
  }
), Zd = ({
  headerName: e,
  headerDescription: t
}) => /* @__PURE__ */ I("div", { className: "chat-wrapper__main-header", children: [
  /* @__PURE__ */ p("h1", { className: "chat-wrapper__main-title", children: e }),
  t && /* @__PURE__ */ p("p", { className: "chat-wrapper__description", children: t })
] }), Kd = () => /* @__PURE__ */ I("div", { className: "chat-wrapper__skeleton", children: [
  /* @__PURE__ */ I("div", { className: "chat-wrapper__skeleton-header", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-title" }),
    /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-description" })
  ] }),
  /* @__PURE__ */ I("div", { className: "chat-wrapper__skeleton-content", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-input", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-input-field" }) }),
    /* @__PURE__ */ I("div", { className: "chat-wrapper__skeleton-prompts", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompts-title" }),
      /* @__PURE__ */ I("div", { className: "chat-wrapper__skeleton-prompts-grid", children: [
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" })
      ] })
    ] })
  ] })
] }), Xd = ({
  errorType: e = "unknown",
  errorMessage: t,
  retryCount: n = 0,
  onRetry: r,
  footer: i
}) => {
  const a = () => {
    if (t)
      return {
        title: "Connection Failed",
        message: t
      };
    switch (e) {
      case "network":
        return {
          title: "Connection Failed",
          message: "We couldn't establish a connection. Please check your internet connection and try again."
        };
      case "auth":
        return {
          title: "Authentication Failed",
          message: "We couldn't verify your identity. Please refresh the page to try again."
        };
      case "server":
        return {
          title: "Something went wrong",
          message: "AI-Assist is temporarily unable to reach the server. Please try again."
        };
      default:
        return {
          title: "Something went wrong",
          message: "AI-Assist is temporarily unable to reach the server. Please try again."
        };
    }
  }, { title: o, message: s } = a();
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__connection-error-overlay", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__connection-error-card", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__connection-error-icon", children: /* @__PURE__ */ I(
      "svg",
      {
        width: "48",
        height: "48",
        viewBox: "0 0 48 48",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ p("circle", { cx: "24", cy: "24", r: "20", fill: "#FEE2E2" }),
          /* @__PURE__ */ p(
            "path",
            {
              d: "M24 16V26M24 30V32",
              stroke: "#DC2626",
              strokeWidth: "3",
              strokeLinecap: "round"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ p("h3", { className: "chat-wrapper__connection-error-title", children: o }),
    /* @__PURE__ */ p("p", { className: "chat-wrapper__connection-error-message", children: s }),
    n > 0 && /* @__PURE__ */ I("p", { className: "chat-wrapper__connection-error-retry-count", children: [
      "Retry attempt: ",
      n
    ] }),
    r && /* @__PURE__ */ I(
      "button",
      {
        className: "chat-wrapper__connection-error-button",
        onClick: r,
        children: [
          /* @__PURE__ */ I(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84871 2 11.5009 2.85147 12.6 4.2",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                  }
                ),
                /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M12 2V4.5H9.5",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              ]
            }
          ),
          "Try Again"
        ]
      }
    ),
    i && /* @__PURE__ */ p("div", { className: "chat-wrapper__connection-error-footer", children: i })
  ] }) });
}, Yd = () => {
  const {
    messages: e,
    isLoadingConversation: t,
    isStreaming: n,
    headerName: r,
    headerDescription: i,
    suggestedPrompts: a,
    footer: o,
    messagesEndRef: s,
    chatInputRef: c,
    isOffline: u,
    connectionState: l,
    isInitialConnection: f,
    conversationError: m,
    onRetryConnection: g
  } = kn(), T = e.length === 0 && !t && l === He.CONNECTING, S = e.length === 0 && !t && l === He.DISCONNECTED && !f;
  if (T || S)
    return /* @__PURE__ */ I("div", { style: { position: "relative", height: "100%" }, children: [
      /* @__PURE__ */ p(Kd, {}),
      S && /* @__PURE__ */ p(
        Xd,
        {
          errorType: u ? "network" : "server",
          errorMessage: m || void 0,
          onRetry: g,
          footer: o
        }
      )
    ] });
  const A = bt.state.shouldShowMainHeader(
    e.length,
    n,
    t
  ), E = bt.state.shouldShowSuggestedPrompts(
    e.length,
    n,
    t,
    a
  ), R = bt.state.getContentAreaClass(
    e.length,
    n,
    t
  );
  return /* @__PURE__ */ I(Ht, { children: [
    A && /* @__PURE__ */ p("div", { style: u ? { paddingTop: "48px" } : void 0, children: /* @__PURE__ */ p(
      Zd,
      {
        headerName: r,
        headerDescription: i
      }
    ) }),
    /* @__PURE__ */ I(
      "div",
      {
        className: R,
        style: u && e.length > 0 ? { paddingTop: "72px" } : void 0,
        children: [
          t && e.length === 0 ? /* @__PURE__ */ p("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ p(qd, { fullHeight: !0 }) }) : /* @__PURE__ */ p(so, { ref: s }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ p(jd, { ref: c }) }),
          E && /* @__PURE__ */ p($d, {}),
          E && o && /* @__PURE__ */ p("div", { children: o })
        ]
      }
    )
  ] });
};
function Jd({
  isVisible: e,
  isReconnecting: t = !1
}) {
  return e ? /* @__PURE__ */ p("div", { className: "network-status-banner", children: /* @__PURE__ */ p("div", { className: "network-status-banner__content", children: t ? /* @__PURE__ */ I(Ht, { children: [
    /* @__PURE__ */ p("div", { className: "network-status-banner__spinner" }),
    /* @__PURE__ */ p("span", { children: "Reconnecting..." })
  ] }) : /* @__PURE__ */ I(Ht, { children: [
    /* @__PURE__ */ p("div", { className: "network-status-banner__icon", children: /* @__PURE__ */ p("span", { className: "network-status-banner__icon-text", children: "!" }) }),
    /* @__PURE__ */ p("span", { className: "network-status-banner__message", children: "No internet connection — please check your network settings and try again" })
  ] }) }) }) : null;
}
const co = Vn(
  ({
    // Authentication and entity context
    auth: e,
    // Server configuration
    chatServerUrl: t,
    chatServerKey: n,
    // Conversation configuration
    metadata: r,
    // Existing props
    config: i,
    tools: a,
    // Note: Tools are stabilized internally to prevent reconnections on re-renders
    contextHelpers: o
  }, s) => {
    var an, _n;
    const { token: c, entityId: u, entityType: l } = e;
    bt.validation.validateAuthProps({
      userMpAuthToken: c,
      chatServerUrl: t,
      chatServerKey: n
    });
    const f = Oe(() => bt.url.convertWebSocketToHttp(t), [t]), m = Oe(
      () => {
        var v, fe;
        return new vs({
          apiUrl: f,
          userMpAuthToken: c,
          chatServerKey: n,
          maxFileSize: (v = i.fileUploadConfig) == null ? void 0 : v.maxFileSize,
          allowedTypes: (fe = i.fileUploadConfig) == null ? void 0 : fe.allowedTypes
        });
      },
      [f, c, n, i.fileUploadConfig]
    ), g = Oe(() => a && a.length > 0 ? a.map(({ execute: v, ...fe }) => fe) : [], [a]), T = Es(), { isOnline: S, wasOffline: A } = _s(), E = ge(!0), R = re((v) => v.isModalOpen), D = re((v) => v.isCollapsed), O = re((v) => v.currentMode), P = re((v) => v.openModal), _ = re((v) => v.closeModal), B = re((v) => v.toggleCollapse), Q = re((v) => v.toggleFullscreen), $ = re((v) => v.setCurrentMode), Z = re((v) => v.chatStatus), W = re((v) => v.setChatStatus), J = re((v) => v.streamingStatus), M = re((v) => v.setStreamingStatus), F = re(
      (v) => v.isLoadingConversation
    ), G = re(
      (v) => v.setIsLoadingConversation
    ), le = re((v) => v.conversationError), ie = re(
      (v) => v.setConversationError
    ), ye = re((v) => v.setCurrentThreadId), Ce = re((v) => v.providerResId), y = re((v) => v.setProviderResId), ae = re((v) => v.isStreaming), we = re((v) => v.setIsStreaming), C = re((v) => v.isThinking), H = re((v) => v.setIsThinking), V = re((v) => v.streamingContent), he = re(
      (v) => v.setStreamingContent
    ), ce = re((v) => v.isHandlingTool), ee = re((v) => v.setIsHandlingTool);
    _e(() => {
      i.mode && $(i.mode);
    }, [i.mode, $]), _e(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const v = (fe) => {
        fe.key === "Escape" && O === "modal" && R && _();
      };
      if (O === "modal" && R)
        return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
    }, [O, R, _]);
    const {
      messages: ue,
      setMessages: ne,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: ke,
      getReasoningStatus: be,
      getReasoningDuration: Me,
      getReasoningContentOnly: Ae,
      getReasoningTitle: ze,
      getToolingTitle: lt,
      getToolingStatus: Rt,
      handleSetMessage: wt,
      handleReasoningUpdate: It,
      handleChatFinished: kt,
      handleChatError: Ut,
      stopGeneration: Bt
    } = T, Gt = ge(null), gt = ge(null), mt = ge(!1), x = ge(null), b = de(
      (v) => {
        y(v.providerResId), ye(v.threadId), v.canUpdateMetadata && r && Object.keys(r).length > 0 && x.current && x.current.updateMetadata(v.providerResId, { metadata: r }).catch((fe) => {
        });
      },
      [y, ye, r]
    ), U = de(
      (v) => {
        var fe, Je;
        switch (v.type) {
          case ht.CHAT_COMPLETED:
            (fe = v.data) != null && fe.conversationId && y(v.data.conversationId), kt(), W(Te.IDLE), M(ut.IDLE), setTimeout(() => {
              var De;
              (De = gt.current) == null || De.focus();
            }, 0);
            break;
          case ht.CHAT_ERROR:
            (Je = v.data) != null && Je.error && Ut(v.data.error);
            break;
          case ht.CONNECTION_LOST:
            break;
          case ht.CONNECTION_RESTORED:
            break;
          case ht.RECONNECTING:
            break;
        }
      },
      [
        kt,
        Ut,
        y,
        ye
      ]
    ), {
      chatClient: K,
      connectionState: se,
      // reconnectAttempts: reconnectAttempt,
      isInitialConnection: Ne,
      connectChatClient: Ge
    } = Ao({
      // Authentication and server properties
      userMpAuthToken: c,
      chatServerUrl: t,
      chatServerKey: n,
      // Entity configuration
      entityId: u,
      entityType: l,
      // Tools configuration
      tools: a,
      // Other properties
      contextHelpers: o,
      onSetMessage: wt,
      onSystemEvent: U,
      onReasoningUpdate: It,
      onThreadCreated: b,
      onError: i.onError
    });
    _e(() => {
      x.current = K;
    }, [K]), bs({
      metadata: r,
      chatClient: K,
      currentProviderResId: Ce,
      isLoadingConversation: F,
      messages: ue,
      entityId: u,
      entityType: l
    }), _e(() => {
      A && S && E.current ? Ge().catch((v) => {
        const fe = Qt(
          v,
          "NetworkReconnection"
        );
        E.current = fe.isRetryable, fe.isRetryable || console.warn(
          `[ChatWrapper] Network reconnection failed with non-retryable error: ${fe.reason}`
        );
      }) : A && S && !E.current && console.warn(
        "[ChatWrapper] Network restored but last error was non-retryable (CORS/auth), skipping reconnection"
      );
    }, [S, A, Ge]);
    const Ve = de(() => {
      Bt(), W(Te.IDLE), M(ut.IDLE), K && Ce && K.stopRun(Ce);
    }, [
      Bt,
      W,
      M,
      K,
      Ce
    ]);
    sa(
      s,
      () => ({
        updateMetadata: (v) => {
          K && Ce && K.updateMetadata(Ce, v).catch((fe) => {
          });
        }
      }),
      [K, Ce]
    );
    const rt = Oe(
      () => K ? new Rs(K, {
        onError: i.onError
      }) : null,
      [K, i.onError]
    ), {
      resetConversationLoader: We
      /*, reloadConversation*/
    } = xs({
      entityId: u,
      entityType: l,
      httpApiUrl: f,
      userMpAuthToken: c,
      chatServerKey: n,
      messages: ue,
      setMessages: ne,
      setIsLoadingConversation: G,
      setConversationError: ie,
      setCurrentThreadId: ye,
      setProviderResId: y,
      metadata: r,
      isConnected: se === He.CONNECTED,
      // Only load after connection established
      onConversationInitialized: i.onConversationInitialized ? () => {
        var v;
        mt.current = !0, (v = i.onConversationInitialized) == null || v.call(i);
      } : void 0
    }), Se = ge(null), Ye = de(() => {
      Se.current && cancelAnimationFrame(Se.current), Se.current = requestAnimationFrame(() => {
        var v;
        (v = Gt.current) == null || v.scrollIntoView({ behavior: "smooth" }), Se.current = null;
      });
    }, []);
    _e(() => {
      Ye();
    }, [ue, Ye]), _e(() => {
      V && Ye();
    }, [V, Ye]), _e(() => {
      i.onStreamingStatusChange && i.onStreamingStatusChange(J);
    }, [J, i]), _e(() => () => {
      Se.current && cancelAnimationFrame(Se.current);
    }, []), _e(() => () => {
      ne([]), we(!1), H(!1), he(""), ee(!1), W(Te.IDLE), M(ut.IDLE), G(!1), ie(null), ye(null), y(null);
    }, [
      ne,
      we,
      H,
      he,
      ee,
      W,
      M,
      G,
      ie,
      ye,
      y
    ]);
    const je = de(
      async (v, fe) => {
        if (!v.trim() || ae || !rt || !K)
          return;
        we(!0), H(!0), W(Te.SUBMITTED), M(ut.STARTING);
        const Je = rt.createUserMessage(
          v,
          fe
        );
        if (ne((ve) => [...ve, Je]), i.onConversationInitialized && !mt.current && (mt.current = !0, i.onConversationInitialized()), !navigator.onLine) {
          H(!1), W(Te.ERROR), ne(
            (ve) => ve.map(
              (Ue) => Ue.id === Je.id ? {
                ...Ue,
                hasError: !0,
                isRetrying: !1,
                errorMessage: "No internet connection. Please check your network and try again."
              } : Ue
            )
          ), we(!1), W(Te.IDLE), M(ut.IDLE);
          return;
        }
        try {
          const ve = new Promise((qe, Dt) => {
            setTimeout(() => Dt(new Error("Message send timeout - connection may be lost")), 5e3);
          });
          await Promise.race([
            K.onTriggerMessage({
              message: Je.content,
              media: fe,
              providerResId: Ce || void 0
            }),
            ve
          ]), W(Te.STREAMING);
          const Ue = setTimeout(() => {
            H(!1), W(Te.ERROR), ne(
              (qe) => qe.map(
                (Dt) => Dt.id === Je.id ? {
                  ...Dt,
                  hasError: !0,
                  isRetrying: !1,
                  errorMessage: "No response received. Connection may be lost."
                } : Dt
              )
            ), we(!1), W(Te.IDLE), M(ut.IDLE);
          }, 12e4);
          window.responseTimeoutId = Ue;
        } catch (ve) {
          H(!1), W(Te.ERROR), ne(
            (Ue) => Ue.map(
              (qe) => qe.id === Je.id ? {
                ...qe,
                hasError: !0,
                isRetrying: !1,
                // Explicitly ensure not in retrying state
                errorMessage: se !== He.CONNECTED ? "Connection lost. Message not sent." : ve instanceof Error ? ve.message : "Failed to send message. Please try again."
              } : qe
            )
          ), we(!1), W(Te.IDLE), M(ut.IDLE);
        }
      },
      [
        rt,
        K,
        ae,
        se,
        ne,
        we,
        H,
        W,
        M,
        Ce
      ]
    ), Sn = de(
      async (v) => await m.uploadFiles(v),
      [m]
    ), $t = Oe(
      () => bt.css.getContainerClasses(
        O,
        i.position,
        i.theme,
        D,
        i.constrainedHeight
      ),
      [
        O,
        i.position,
        i.theme,
        D,
        i.constrainedHeight
      ]
    ), qt = de(() => {
      O === "modal" ? P() : B();
    }, [O, P, B]), Tn = de(
      (v) => {
        gt.current && gt.current.setText(v.description);
      },
      []
    ), Ot = Oe(
      () => ({
        messages: ue,
        isStreaming: ae,
        isThinking: C,
        isHandlingTool: ce
      }),
      [ue, ae, C, ce]
    ), En = Oe(
      () => ({
        isLoadingConversation: F,
        chatStatus: Z,
        conversationError: le,
        isOffline: !S,
        connectionState: se,
        isInitialConnection: Ne
      }),
      [
        F,
        Z,
        le,
        S,
        se,
        Ne
      ]
    ), xn = Oe(
      () => {
        var v, fe, Je, De;
        return {
          headerName: i.headerName,
          headerDescription: i.headerDescription,
          placeholderTexts: i.placeholderTexts,
          chipName: i.chipName,
          chipLogo: i.chipLogo,
          suggestedPrompts: i.suggestedPrompts,
          enableSuggestedPromptsAnimation: i.enableSuggestedPromptsAnimation,
          footer: i.footer,
          clientTools: g,
          fileUploadEnabled: (v = i.features) == null ? void 0 : v.fileUpload,
          fileUploadConfig: {
            maxFiles: ((fe = i.fileUploadConfig) == null ? void 0 : fe.maxFiles) ?? 5,
            maxFileSize: ((Je = i.fileUploadConfig) == null ? void 0 : Je.maxFileSize) ?? 15 * 1024 * 1024,
            // 15MB default
            allowedTypes: ((De = i.fileUploadConfig) == null ? void 0 : De.allowedTypes) ?? [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ]
          }
        };
      },
      [
        i.headerName,
        i.headerDescription,
        i.placeholderTexts,
        i.chipName,
        i.chipLogo,
        i.suggestedPrompts,
        i.enableSuggestedPromptsAnimation,
        (an = i.features) == null ? void 0 : an.fileUpload,
        i.fileUploadConfig,
        g
      ]
    ), Le = Oe(
      () => ({
        getReasoningTitle: ze,
        getReasoningStatus: be,
        getReasoningDuration: Me,
        getReasoningContentOnly: Ae,
        getToolingTitle: lt,
        getToolingStatus: Rt
      }),
      [
        ze,
        be,
        Me,
        Ae,
        lt,
        Rt
      ]
    ), Mt = de(
      async (v) => {
        const fe = ue.find((De) => De.id === v);
        if (!fe)
          return;
        if (we(!0), H(!0), W(Te.SUBMITTED), M(ut.STARTING), ne((De) => De.map(
          (ve) => ve.id === v ? {
            ...ve,
            hasError: !1,
            isRetrying: !0,
            errorMessage: void 0
          } : ve
        )), !navigator.onLine) {
          H(!1), we(!1), W(Te.ERROR), ne(
            (De) => De.map(
              (ve) => ve.id === v ? {
                ...ve,
                isRetrying: !1,
                hasError: !0,
                errorMessage: "Still no internet connection. Please check your network and try again."
              } : ve
            )
          ), W(Te.IDLE), M(ut.IDLE);
          return;
        }
        try {
          se !== He.CONNECTED && await Ge(), await (K == null ? void 0 : K.onTriggerMessage({
            message: fe.content,
            media: fe.media,
            providerResId: Ce || void 0
          })), W(Te.STREAMING);
          const De = setTimeout(() => {
            H(!1), W(Te.ERROR), ne(
              (ve) => ve.map(
                (Ue) => Ue.id === v ? {
                  ...Ue,
                  hasError: !0,
                  isRetrying: !1,
                  errorMessage: "No response received. Connection may be lost."
                } : Ue
              )
            ), we(!1), W(Te.IDLE), M(ut.IDLE);
          }, 12e4);
          window.responseTimeoutId = De;
        } catch (De) {
          H(!1), we(!1), W(Te.ERROR), M(ut.IDLE), ne(
            (ve) => ve.map(
              (Ue) => Ue.id === v ? {
                ...Ue,
                isRetrying: !1,
                hasError: !0,
                errorMessage: De instanceof Error ? De.message : "Retry failed. Please try again."
              } : Ue
            )
          ), W(Te.IDLE);
        }
      },
      [
        ue,
        ne,
        We,
        Ge,
        je
      ]
    ), bn = de(async () => {
      try {
        await Ge();
      } catch (v) {
        console.error("Failed to reconnect:", v);
      }
    }, [Ge]), nn = Oe(
      () => ({
        onSubmit: je,
        onFileUpload: Sn,
        onStopGeneration: Ve,
        onPromptSelect: Tn,
        onRetryMessage: Mt,
        onRetryConnection: bn
      }),
      [
        je,
        Sn,
        Ve,
        Tn,
        Mt,
        bn
      ]
    ), rn = Oe(
      () => ({
        ...Ot,
        ...En,
        ...xn,
        ...Le,
        ...nn,
        currentAssistantMessageIdRef: ke,
        messagesEndRef: Gt,
        chatInputRef: gt
      }),
      [
        Ot,
        En,
        xn,
        Le,
        nn,
        ke,
        Gt,
        gt
      ]
    );
    return Oe(
      () => bt.state.shouldShowBubble(
        O,
        R,
        D
      ),
      [O, R, D]
    ) ? /* @__PURE__ */ p(pi, { children: /* @__PURE__ */ p(
      Hs,
      {
        mode: O,
        headerName: i.headerName,
        bubbleText: i.bubbleText,
        showBubbleText: ((_n = i.features) == null ? void 0 : _n.showBubbleText) !== !1,
        onClick: qt
      }
    ) }) : /* @__PURE__ */ p(pi, { children: /* @__PURE__ */ p(
      As,
      {
        onError: (v) => {
          i.onError && i.onError(v);
        },
        children: /* @__PURE__ */ I("div", { className: $t, style: i.customStyles, children: [
          /* @__PURE__ */ p(
            Jd,
            {
              isVisible: !S,
              isReconnecting: se === He.RECONNECTING
            }
          ),
          bt.state.shouldShowHeader(i.headerVisible) && /* @__PURE__ */ p(
            zs,
            {
              headerName: i.headerName,
              mode: O,
              isCollapsed: D,
              isModalOpen: R,
              onClose: _,
              onToggleFullscreen: Q,
              onToggleCollapse: B
            }
          ),
          !D && /* @__PURE__ */ p(
            Ns,
            {
              onError: (v) => {
                i.onError && i.onError(v);
              },
              children: /* @__PURE__ */ p(Od, { value: rn, children: /* @__PURE__ */ p(Yd, {}) })
            }
          )
        ] })
      }
    ) });
  }
);
co.displayName = "ChatWrapperContainer";
const yh = oa(co);
function wh({
  isConnected: e,
  isConnecting: t = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 1 / 0,
  onRetry: a,
  autoHideDuration: o = 3e3
}) {
  const [s, c] = Ie("hidden"), [u, l] = Ie(!1);
  if (_e(() => {
    t ? c("connecting") : !e && !n ? (l(!0), i !== 1 / 0 && r >= i ? c("error") : c("hidden")) : n ? c("reconnecting") : e && u ? (c("hidden"), l(!1)) : e && !u && c("hidden");
  }, [e, t, n, r, i, u, o]), s === "hidden")
    return null;
  const f = () => {
    a && a();
  }, g = (() => {
    switch (s) {
      case "connecting":
        return {
          icon: "🔄",
          title: "Connecting...",
          message: "Establishing connection to the server"
        };
      case "reconnecting":
        return {
          icon: "🔄",
          title: "Reconnecting...",
          message: i === 1 / 0 ? `Attempting to restore connection (${r})` : `Attempting to restore connection (${r}/${i})`
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
  return g ? s === "connecting" ? /* @__PURE__ */ p("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ I("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ p("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ p("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ p("div", { className: "connection-notification__bubble" })
  ] }) }) : s === "reconnecting" ? /* @__PURE__ */ p("div", { className: `connection-notification connection-notification--banner connection-notification--${s}`, children: /* @__PURE__ */ I("div", { className: "connection-notification__banner-content", children: [
    /* @__PURE__ */ p("span", { className: "connection-notification__banner-spinner" }),
    /* @__PURE__ */ I("span", { className: "connection-notification__banner-text", children: [
      "Reconnecting... (attempt ",
      r,
      ")"
    ] })
  ] }) }) : /* @__PURE__ */ p("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ I("div", { className: "connection-notification__content", children: [
    /* @__PURE__ */ p("div", { className: "connection-notification__icon", children: g.icon }),
    /* @__PURE__ */ p("div", { className: "connection-notification__title", children: g.title }),
    /* @__PURE__ */ p("div", { className: "connection-notification__message", children: g.message }),
    a && /* @__PURE__ */ p("div", { className: "connection-notification__actions", children: /* @__PURE__ */ p(
      "button",
      {
        className: "connection-notification__retry-btn primary",
        onClick: f,
        children: "Try Again"
      }
    ) })
  ] }) }) : null;
}
export {
  Wd as AnimatedPlaceholder,
  Te as CHAT_STATUS,
  Ls as ChatIcon,
  Kd as ChatSkeleton,
  yh as ChatWrapper,
  Os as CloseIcon,
  Ps as CollapseIcon,
  Xd as ConnectionError,
  wh as ConnectionNotification,
  Fs as CopyIcon,
  mo as EntityType,
  Ds as FullscreenIcon,
  qd as InlineLoader,
  no as Loader,
  Ke as PROCESSING_STATUS,
  zd as PromptInput,
  Gd as PromptInputButton,
  ph as PromptInputModelSelect,
  gh as PromptInputModelSelectContent,
  mh as PromptInputModelSelectItem,
  fh as PromptInputModelSelectTrigger,
  Ch as PromptInputModelSelectValue,
  Vd as PromptInputSubmit,
  lo as PromptInputTextarea,
  Ud as PromptInputToolbar,
  Bd as PromptInputTools,
  Md as Reasoning,
  to as ReasoningContent,
  eo as ReasoningTrigger,
  ut as STREAMING_STATUS,
  hh as SettingsIcon,
  $d as SuggestedPrompts,
  vo as fetchThreadMessages,
  gr as isChatActive,
  rh as isChatError,
  nh as isChatIdle,
  ih as isProcessingActive,
  ah as isProcessingComplete,
  oh as isProcessingError,
  Ro as updateThread,
  Io as updateThreadMetadata,
  lh as useChatState,
  ch as useConversationState,
  sh as useLayoutState,
  uh as useThreadState,
  dh as useUIState,
  re as useUIStore
};
