var fo = Object.defineProperty;
var go = (t, e, n) => e in t ? fo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var X = (t, e, n) => go(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as m, Fragment as Ft, jsxs as P } from "react/jsx-runtime";
import wt, { useState as xe, useRef as pe, useEffect as Te, useMemo as He, useCallback as oe, createContext as ni, useContext as ri, Component as ii, memo as Za, forwardRef as In, useImperativeHandle as Ya } from "react";
const Ee = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, ht = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, Ze = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, Lr = (t) => t === Ee.SUBMITTED || t === Ee.STREAMING, sf = (t) => t === Ee.IDLE, of = (t) => t === Ee.ERROR, lf = (t) => t === Ze.PROCESSING, cf = (t) => t === Ze.COMPLETED, uf = (t) => t === Ze.ERROR;
var mo = /* @__PURE__ */ ((t) => (t.BRAND = "BRAND", t.ACCOUNT = "ACCOUNT", t.USER = "USER", t))(mo || {}), De = /* @__PURE__ */ ((t) => (t.DISCONNECTED = "disconnected", t.CONNECTING = "connecting", t.CONNECTED = "connected", t.RECONNECTING = "reconnecting", t))(De || {});
const Co = {
  maxReconnectAttempts: 1 / 0,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, zn = {
  NORMAL: 1e3,
  // Normal closure
  GOING_AWAY: 1001
};
var pt = /* @__PURE__ */ ((t) => (t.CONNECTION_ESTABLISHED = "connection_established", t.CONNECTION_LOST = "connection_lost", t.CONNECTION_RESTORED = "connection_restored", t.CONNECTION_FAILED = "connection_failed", t.RECONNECTING = "reconnecting", t.CHAT_COMPLETED = "chat_completed", t.CHAT_ERROR = "chat_error", t))(pt || {}), Tt = /* @__PURE__ */ ((t) => (t.CHAT_MESSAGE = "chat_message", t.CONFIGURE_TOOLS = "configure_tools", t.UPDATE_TOOLS = "update_tools", t.UPDATE_CONTEXT_HELPERS = "update_context_helpers", t.TOOL_CALL_RESPONSE = "tool_call_response", t.HEARTBEAT_PING = "heartbeat_ping", t.HEARTBEAT_PONG = "heartbeat_pong", t.STOP_RUN = "stop_run", t))(Tt || {}), Ke = /* @__PURE__ */ ((t) => (t.SESSION_ESTABLISHED = "session_established", t.TOOLS_CONFIGURED = "tools_configured", t.CLIENT_TOOLS_UPDATED = "client_tools_updated", t.CONFIGURE_TOOLS = "configure_tools", t.CHAT_EVENT = "chat_event", t.CHAT_FINISHED = "chat_finished", t.CHAT_ERROR = "chat_error", t.MESSAGES_PERSISTED = "messages_persisted", t.THREAD_CREATED = "thread_created", t.TOOL_CALL_REQUEST = "tool_call_request", t.HEARTBEAT_PING = "heartbeat_ping", t.HEARTBEAT_ACK = "heartbeat_ack", t.ERROR = "error", t))(Ke || {}), qn = /* @__PURE__ */ ((t) => (t.PROVIDER_EVENT = "provider-event", t.LATITUDE_EVENT = "latitude-event", t.CONTENT_DELTA = "content-delta", t))(qn || {}), Bt = /* @__PURE__ */ ((t) => (t.TEXT_DELTA = "text-delta", t.REASONING_START = "reasoning-start", t.REASONING_DELTA = "reasoning-delta", t.REASONING_END = "reasoning-end", t.TOOL_CALL = "tool-call", t.TOOL_RESULT = "tool-result", t))(Bt || {});
class nn {
  static createConnectionEvent(e, n) {
    return {
      type: e,
      timestamp: /* @__PURE__ */ new Date(),
      data: n
    };
  }
  static createChatEvent(e, n) {
    return {
      type: e,
      timestamp: /* @__PURE__ */ new Date(),
      data: n
    };
  }
  // Convenience methods for common events
  static connectionEstablished() {
    return this.createConnectionEvent(pt.CONNECTION_ESTABLISHED);
  }
  static connectionLost(e) {
    return this.createConnectionEvent(pt.CONNECTION_LOST, { reason: e });
  }
  static connectionRestored() {
    return this.createConnectionEvent(pt.CONNECTION_RESTORED);
  }
  static reconnecting(e, n) {
    return this.createConnectionEvent(pt.RECONNECTING, { attempt: e, maxAttempts: n });
  }
  static chatCompleted(e) {
    return this.createChatEvent(pt.CHAT_COMPLETED, { conversationId: e });
  }
  static chatError(e, n) {
    return this.createChatEvent(pt.CHAT_ERROR, { error: e, errorCode: n });
  }
}
class Dt {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(e) {
    return {
      type: Tt.CHAT_MESSAGE,
      content: e.content,
      media: e.media || [],
      providerResId: e.providerResId
    };
  }
  /**
   * Create a configure tools message
   */
  static createConfigureToolsMessage(e, n) {
    return {
      type: Tt.CONFIGURE_TOOLS,
      toolSchemas: e,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(e) {
    return {
      type: Tt.UPDATE_TOOLS,
      toolSchemas: e
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(e) {
    return {
      type: Tt.UPDATE_CONTEXT_HELPERS,
      contextHelpers: e
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(e, n) {
    return {
      type: Tt.TOOL_CALL_RESPONSE,
      callId: e,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(e, n) {
    return {
      type: Tt.TOOL_CALL_RESPONSE,
      callId: e,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: Tt.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(e, n) {
    return {
      type: Tt.HEARTBEAT_PONG,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      originalTimestamp: e,
      pingTime: n
    };
  }
  /**
   * Create a stop run message
   */
  static createStopRunMessage(e) {
    return {
      type: Tt.STOP_RUN,
      conversationUuid: e
    };
  }
  /**
   * Serialize a message to JSON string for sending over WebSocket
   */
  static serialize(e) {
    return JSON.stringify(e);
  }
  /**
   * Generic helper to create and serialize any message in one call
   */
  static createAndSerialize(e) {
    return this.serialize(e());
  }
  /**
   * Helper methods to create and serialize messages in one call
   */
  static serializeChatMessage(e) {
    return this.createAndSerialize(() => this.createChatMessage(e));
  }
  static serializeConfigureTools(e, n) {
    return this.createAndSerialize(
      () => this.createConfigureToolsMessage(e, n)
    );
  }
  static serializeUpdateTools(e) {
    return this.createAndSerialize(() => this.createUpdateToolsMessage(e));
  }
  static serializeUpdateContextHelpers(e) {
    return this.createAndSerialize(
      () => this.createUpdateContextHelpersMessage(e)
    );
  }
  static serializeToolCallSuccess(e, n) {
    return this.createAndSerialize(
      () => this.createToolCallSuccessResponse(e, n)
    );
  }
  static serializeToolCallError(e, n) {
    return this.createAndSerialize(
      () => this.createToolCallErrorResponse(e, n)
    );
  }
  static serializeHeartbeatPing() {
    return this.createAndSerialize(() => this.createHeartbeatPing());
  }
  static serializeHeartbeatPong(e, n) {
    return this.createAndSerialize(
      () => this.createHeartbeatPong(e, n)
    );
  }
  static serializeStopRun(e) {
    return this.createAndSerialize(
      () => this.createStopRunMessage(e)
    );
  }
}
class yo {
  constructor(e, n) {
    X(this, "ws", null);
    X(this, "config");
    X(this, "connectionState");
    X(this, "reconnectTimer", null);
    X(this, "heartbeatInterval", null);
    X(this, "visibilityChangeHandler");
    X(this, "currentTicket", null);
    X(this, "intentionalDisconnect", !1);
    // Track intentional disconnects
    X(this, "onOpen");
    X(this, "onMessage");
    X(this, "onError");
    X(this, "onClose");
    X(this, "onSystemEvent");
    X(this, "onTicketRefresh");
    X(this, "onTicketValidate");
    this.config = e, this.connectionState = n, this.visibilityChangeHandler = this.handleVisibilityChange.bind(this), this.registerVisibilityHandler();
  }
  connect(e) {
    return new Promise((n, r) => {
      try {
        this.intentionalDisconnect = !1, e && (this.currentTicket = e);
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
    let e = this.config.apiUrl.replace(/^https:\/\//, "wss://").replace(/^http:\/\//, "ws://");
    if (e = e.endsWith("/ws") ? e : e + "/ws", this.currentTicket) {
      const n = e.includes("?") ? "&" : "?";
      e = `${e}${n}ticket=${this.currentTicket}`;
    }
    return e;
  }
  setupEventHandlers(e, n) {
    this.ws && (this.ws.onopen = () => this.handleConnectionOpened(e), this.ws.onerror = (r) => this.handleConnectionError(r, e, n), this.ws.onmessage = (r) => {
      var i;
      return (i = this.onMessage) == null ? void 0 : i.call(this, r);
    }, this.ws.onclose = (r) => this.handleConnectionClosed(r));
  }
  handleConnectionOpened(e) {
    var n;
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (n = this.onOpen) == null || n.call(this), e == null || e();
  }
  handleConnectionError(e, n, r) {
    var i;
    if ((i = this.onError) == null || i.call(this, e), this.connectionState.setConnected(!1), r) {
      r(e);
      return;
    }
    this.intentionalDisconnect || this.scheduleReconnectAfterError();
  }
  handleConnectionClosed(e) {
    var n;
    console.log("[WebSocketManager] Connection closed", {
      code: e.code,
      reason: e.reason,
      intentionalDisconnect: this.intentionalDisconnect
    }), this.processConnectionClosure(e), (n = this.onClose) == null || n.call(this, e), this.shouldReconnectAfterClose(e.code) ? (console.log(
      "[WebSocketManager] Should reconnect, calling attemptReconnect"
    ), this.attemptReconnect()) : console.log("[WebSocketManager] Should NOT reconnect");
  }
  updateConnectionState(e, n) {
    this.connectionState.setConnected(e), this.connectionState.setReconnecting(n), this.connectionState.resetReconnectAttempts(), this.connectionState.updateReconnectDelay(this.config.reconnectDelay);
  }
  processConnectionClosure(e) {
    this.connectionState.setConnected(!1), this.stopHeartbeat();
  }
  shouldReconnectAfterClose(e) {
    if (console.log("[WebSocketManager] shouldReconnectAfterClose check", {
      closeCode: e,
      intentionalDisconnect: this.intentionalDisconnect,
      NORMAL: zn.NORMAL,
      GOING_AWAY: zn.GOING_AWAY
    }), this.intentionalDisconnect)
      return console.log("[WebSocketManager] Intentional disconnect - no reconnect"), !1;
    const { NORMAL: n } = zn, r = e !== n;
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
    var s, o;
    if (console.log("[WebSocketManager] attemptReconnect called", {
      reconnectAttempts: this.connectionState.reconnectAttempts,
      maxReconnectAttempts: this.config.maxReconnectAttempts,
      isReconnecting: this.connectionState.isReconnecting,
      reconnectTimer: this.reconnectTimer
    }), this.connectionState.reconnectAttempts >= this.config.maxReconnectAttempts) {
      console.log("[WebSocketManager] Max reconnection attempts reached"), (s = this.onSystemEvent) == null || s.call(
        this,
        nn.connectionLost("Max reconnection attempts reached")
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
    const e = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    console.log("[WebSocketManager] Firing RECONNECTING event", {
      attempt: e,
      maxAttempts: n
    }), (o = this.onSystemEvent) == null || o.call(this, nn.reconnecting(e, n));
    const r = this.config.reconnectDelay, i = Math.random() * 90 + 10, a = r + i;
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null, this.connectionState.isConnected || this.reconnect();
    }, a);
  }
  async reconnect() {
    try {
      console.log("[WebSocketManager] ====== RECONNECT ATTEMPT START ======", {
        hasCurrentTicket: !!this.currentTicket,
        reconnectAttempt: this.connectionState.reconnectAttempts
      }), this.closeConnection();
      let e = !0;
      if (this.onTicketValidate && this.currentTicket) {
        console.log(
          "[WebSocketManager] Validating current ticket before reconnection..."
        );
        try {
          await this.onTicketValidate() ? (console.log(
            "[WebSocketManager] Current ticket is still valid, proceeding with reconnection"
          ), e = !1) : console.log(
            "[WebSocketManager] Current ticket is invalid according to server, need to get fresh ticket"
          );
        } catch (r) {
          console.error("[WebSocketManager] Failed to validate ticket with server API:", r), console.log("[WebSocketManager] Validation API failed - server might be down, will retry with fresh ticket");
        }
      } else this.currentTicket || console.log(
        "[WebSocketManager] No current ticket, need to get fresh ticket"
      );
      if (e && this.onTicketRefresh) {
        console.log(
          "[WebSocketManager] Requesting fresh ticket for reconnection..."
        );
        try {
          const r = await this.onTicketRefresh();
          this.currentTicket = r, console.log(
            "[WebSocketManager] Fresh ticket obtained for reconnection"
          );
        } catch (r) {
          throw console.error(
            "[WebSocketManager] Failed to get fresh ticket:",
            r
          ), r;
        }
      } else if (e && !this.onTicketRefresh)
        throw console.warn(
          "[WebSocketManager] Need fresh ticket but no ticket refresh callback available"
        ), new Error(
          "Cannot refresh expired ticket - no refresh callback available"
        );
      console.log("[WebSocketManager] Creating WebSocket connection...");
      const n = this.buildWebSocketUrl();
      this.ws = new WebSocket(n), this.setupReconnectHandlers(), console.log("[WebSocketManager] ====== RECONNECT ATTEMPT END (connection initiated) ======");
    } catch (e) {
      console.log("[WebSocketManager] ====== RECONNECT ATTEMPT FAILED ======", e), this.scheduleReconnectAfterError();
    }
  }
  /**
   * Update the ticket for future connections
   */
  updateTicket(e) {
    this.currentTicket = e;
  }
  setupReconnectHandlers() {
    this.ws && (this.ws.onopen = () => this.handleReconnectionOpened(), this.ws.onerror = () => this.handleReconnectionError(), this.ws.onmessage = (e) => {
      var n;
      return (n = this.onMessage) == null ? void 0 : n.call(this, e);
    }, this.ws.onclose = (e) => this.handleReconnectionClosed(e));
  }
  handleReconnectionOpened() {
    var e, n;
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (e = this.onSystemEvent) == null || e.call(this, nn.connectionRestored()), (n = this.onOpen) == null || n.call(this);
  }
  handleReconnectionError() {
    this.scheduleReconnectAfterError();
  }
  scheduleReconnectAfterError() {
    const e = this.config.reconnectDelay, n = Math.random() * 90 + 10, r = e + n;
    this.reconnectTimer !== null && (window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null), setTimeout(() => this.attemptReconnect(), r);
  }
  handleReconnectionClosed(e) {
    this.processConnectionClosure(e), this.shouldReconnectAfterClose(e.code) ? this.attemptReconnect() : this.connectionState.setReconnecting(!1);
  }
  startHeartbeat() {
  }
  sendHeartbeat() {
    const e = Dt.serializeHeartbeatPing();
    this.send(e);
  }
  stopHeartbeat() {
    this.heartbeatInterval && (clearInterval(this.heartbeatInterval), this.heartbeatInterval = null);
  }
  send(e) {
    var n;
    ((n = this.ws) == null ? void 0 : n.readyState) === WebSocket.OPEN && this.ws.send(e);
  }
  closeConnection() {
    this.ws && this.ws.close(zn.NORMAL);
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
  setEventHandlers(e) {
    this.onOpen = e.onOpen, this.onMessage = e.onMessage, this.onError = e.onError, this.onClose = e.onClose, this.onSystemEvent = e.onSystemEvent, this.onTicketRefresh = e.onTicketRefresh, this.onTicketValidate = e.onTicketValidate;
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
  update(e) {
    Object.assign(this.state, e);
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
  setConnected(e) {
    this.state.isConnected = e;
  }
  setReconnecting(e) {
    this.state.isReconnecting = e;
  }
  incrementReconnectAttempts() {
    this.state.reconnectAttempts++;
  }
  resetReconnectAttempts() {
    this.state.reconnectAttempts = 0;
  }
  updateReconnectDelay(e) {
    this.state.reconnectDelay = e;
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
class Xn {
  /**
   * Create a synthetic ToolCallRequest for server-side tool calls
   */
  static createServerToolCall(e, n, r = {}) {
    return {
      toolName: e,
      callId: n,
      parameters: r
    };
  }
  /**
   * Create a synthetic ToolCallRequest for reasoning operations
   */
  static createReasoningCall(e, n, r) {
    return {
      toolName: "reasoning",
      callId: e,
      parameters: { phase: n, ...r }
    };
  }
  /**
   * Create a synthetic ToolCallRequest for Latitude tool calls
   */
  static createLatitudeToolCall(e, n, r = {}) {
    return {
      toolName: e,
      callId: n,
      parameters: r
    };
  }
}
class Xa {
  constructor(e = {}) {
    X(this, "handlers", {});
    this.handlers = e;
  }
  updateEventHandlers(e) {
    Object.assign(this.handlers, e), this.onHandlersUpdated(e);
  }
  /**
   * Hook for subclasses to react to handler updates
   */
  onHandlersUpdated(e) {
  }
  getHandler(e) {
    return this.handlers[e];
  }
}
const se = {
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
    THOUGHT: "Thought",
    DURATION_FOR: "for",
    DURATION_SECOND: "second",
    DURATION_SECONDS: "seconds"
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
  // Detection patterns (language-agnostic)
  PATTERNS: {
    DURATION: /for ([\d.]+) \w+/,
    // Matches "for <number> <any-word>"
    THOUGHT_CONTENT: /\*\*(.*?)\*\*/g,
    HANDLING_TOOL: /🔧 Handling: (.+)/,
    COMPLETED_OR_ERROR_TOOL: /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
  }
}, Ue = {
  isThinkingMessage: (t) => t.startsWith(se.THINKING_PREFIX) || t.startsWith(se.REASONING_PREFIX) || t.startsWith(se.THOUGHT_PREFIX),
  isCompletedMessage: (t) => t.includes(se.COMPLETED_MARKER),
  isErrorMessage: (t) => t.includes(se.ERROR_MARKER),
  isHandlingMessage: (t) => t.includes(se.HANDLING_MARKER),
  extractDuration: (t, e) => {
    const n = t.match(se.PATTERNS.DURATION);
    if (!n) return;
    const r = parseFloat(n[1]);
    if (e) {
      const a = e("chat.reasoning.duration.for"), s = e(r === 1 ? "chat.reasoning.duration.second" : "chat.reasoning.duration.seconds");
      return ` ${a} ${r} ${s}`;
    }
    const i = r === 1 ? se.UI_TEXT.DURATION_SECOND : se.UI_TEXT.DURATION_SECONDS;
    return ` ${se.UI_TEXT.DURATION_FOR} ${r} ${i}`;
  },
  cleanReasoningContent: (t) => {
    let e = t.replace(new RegExp(`^${se.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${se.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${se.THOUGHT_PREFIX}\\s*`), "");
    return e = e.replace(/\s*for [\d.]+\s+\w+$/, ""), e = e.replace(se.PATTERNS.THOUGHT_CONTENT, ""), e.trim();
  },
  getMessageType: (t, e) => e === !1 ? Ue.isErrorMessage(t) ? se.MESSAGE_TYPES.ERROR : (Ue.isThinkingMessage(t) && se.PATTERNS.DURATION.test(t) || Ue.isThinkingMessage(t), se.MESSAGE_TYPES.THOUGHT) : Ue.isCompletedMessage(t) ? se.MESSAGE_TYPES.COMPLETED : Ue.isErrorMessage(t) ? se.MESSAGE_TYPES.ERROR : (Ue.isHandlingMessage(t) || Ue.isThinkingMessage(t) && !t.includes(se.UI_TEXT.AI_IS_THINKING), se.MESSAGE_TYPES.THINKING)
};
class So extends Xa {
  constructor(n) {
    super({ onReasoningUpdate: n });
    X(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    X(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, s) {
    const o = this.getHandler("onReasoningUpdate");
    if (!o) return;
    const c = Xn.createReasoningCall(
      i,
      a,
      s || {}
    );
    o(n, r, c);
  }
  handleReasoningStart(n) {
    const r = n.id || "reasoning";
    this.reasoningStartTimes.set(r, Date.now()), this.reasoningContent.set(r, "");
  }
  handleReasoningDelta(n) {
    if (!n.text) return;
    const r = n.id || "reasoning", a = (this.reasoningContent.get(r) || "") + n.text;
    this.reasoningContent.set(r, a);
    const s = `${se.THINKING_PREFIX} ${a}`;
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
    const o = i || se.UI_TEXT.THOUGHT, c = `${se.THOUGHT_PREFIX} ${o}${s}`;
    this.triggerReasoningUpdate(
      !1,
      c,
      r,
      "end",
      { duration: s, fullContent: i }
    ), this.reasoningContent.delete(r);
  }
  setReasoningUpdateHandler(n) {
    this.updateEventHandlers({ onReasoningUpdate: n });
  }
}
class xo extends Xa {
  constructor(n = {}, r) {
    super({ onReasoningUpdate: r });
    X(this, "processedToolCalls", /* @__PURE__ */ new Set());
    X(this, "clientTools", {});
    X(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var s, o, c;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (s = this.getHandler("onReasoningUpdate")) == null || s(!0, `${se.HANDLING_MARKER} ${i}`, n);
      try {
        const u = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, u), (o = this.getHandler("onReasoningUpdate")) == null || o(!1, `${se.COMPLETED_MARKER} ${i}`, n);
      } catch (u) {
        this.sendToolError(r, u), (c = this.getHandler("onReasoningUpdate")) == null || c(!1, `${se.ERROR_MARKER} Error: ${i} - ${u}`, n);
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
    const i = Dt.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = Dt.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = Xn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId,
        n.args || {}
      );
      r(!0, `${se.HANDLING_MARKER} ${n.toolName}`, a);
    }
  }
  handleServerToolResult(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = Xn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId
      );
      r(
        !1,
        `${se.COMPLETED_MARKER} ${n.toolName}`,
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
class ko {
  constructor(e, n = {}) {
    X(this, "reasoningHandler");
    X(this, "toolHandler");
    X(this, "handlers");
    X(this, "sendMessage");
    this.handlers = e, this.reasoningHandler = new So(e.onReasoningUpdate), this.toolHandler = new xo(n, e.onReasoningUpdate);
  }
  handleMessage(e) {
    try {
      const n = JSON.parse(e.data);
      switch (n.type) {
        case Ke.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case Ke.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case Ke.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case Ke.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case Ke.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case Ke.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case Ke.MESSAGES_PERSISTED:
          this.handleMessagesPersisted(n);
          break;
        case Ke.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case Ke.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case Ke.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case Ke.HEARTBEAT_ACK:
          break;
        case Ke.ERROR:
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
  handleChatEvent(e) {
    var n, r, i;
    switch (e.event) {
      case qn.PROVIDER_EVENT:
        this.handleProviderEvent(e);
        break;
      case qn.LATITUDE_EVENT:
        this.handleLatitudeEvent(e);
        break;
      case qn.CONTENT_DELTA:
        (n = e.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, e.data.delta));
        break;
    }
  }
  handleProviderEvent(e) {
    var r, i, a;
    switch ((r = e.data) == null ? void 0 : r.type) {
      case Bt.TEXT_DELTA:
        e.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, e.data.textDelta));
        break;
      case Bt.REASONING_START:
        this.reasoningHandler.handleReasoningStart(e.data);
        break;
      case Bt.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(e.data);
        break;
      case Bt.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(e.data);
        break;
      case Bt.TOOL_CALL:
        this.toolHandler.handleServerToolCall(e.data);
        break;
      case Bt.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(e.data);
        break;
    }
  }
  handleLatitudeEvent(e) {
    var n;
    if (((n = e.data) == null ? void 0 : n.type) === Bt.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = e.data;
      if (r.toolCallId && r.toolName) {
        const i = Xn.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${se.COMPLETED_MARKER} ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(e) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, nn.chatCompleted(e.uuid));
  }
  handleMessagesPersisted(e) {
    var n, r;
    this.handlers.onMessagesPersisted && this.handlers.onMessagesPersisted({
      threadId: (n = e.data) == null ? void 0 : n.threadId,
      providerResId: (r = e.data) == null ? void 0 : r.providerResId
    });
  }
  handleChatError(e) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      nn.chatError(e.error || "Unknown error")
    );
  }
  handleToolCallRequest(e) {
    this.toolHandler.handleToolCallRequest(e);
  }
  handleHeartbeatPing(e) {
    if (!this.sendMessage)
      return;
    const n = Dt.serializeHeartbeatPong(
      e.timestamp,
      e.pingTime
    );
    this.sendMessage(n);
  }
  handleError(e) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      nn.chatError(e.error || "Unknown WebSocket error")
    );
  }
  updateClientTools(e) {
    this.toolHandler.updateClientTools(e);
  }
  clearProcessedToolCalls() {
    this.toolHandler.clearProcessedToolCalls();
  }
  setSendMessageHandler(e) {
    this.sendMessage = e, this.toolHandler.setSendMessageHandler(e);
  }
  updateEventHandlers(e) {
    Object.assign(this.handlers, e), this.reasoningHandler.updateEventHandlers(e), this.toolHandler.updateEventHandlers(e);
  }
}
async function To(t, e, n = 1e4) {
  const r = {
    "Content-Type": "application/json"
  };
  e != null && e.userMpAuthToken && (r["x-oddle-mp-auth-token"] = e.userMpAuthToken), e != null && e.chatServerKey && (r["x-oddle-chat-server-key"] = e.chatServerKey);
  try {
    const i = new AbortController(), a = setTimeout(() => i.abort(), n);
    try {
      const s = await fetch(`${t}/api/v1/tickets`, {
        method: "POST",
        headers: r,
        signal: i.signal,
        body: JSON.stringify({
          entityId: e.entityId,
          entityType: e.entityType,
          providerResId: e.providerResId,
          clientInfo: {
            userAgent: navigator.userAgent,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            ...e.clientInfo
          }
        })
      });
      if (clearTimeout(a), !s.ok) {
        const c = await s.json().catch(() => ({}));
        throw new Error(
          c.error || `Failed to get WebSocket ticket: ${s.statusText}`
        );
      }
      const o = await s.json();
      if (!o.success || !o.ticket)
        throw new Error(o.error || "Invalid ticket response from server");
      return o;
    } catch (s) {
      throw clearTimeout(a), s instanceof Error && s.name === "AbortError" ? new Error(`Ticket request timed out after ${n}ms`) : s;
    }
  } catch (i) {
    throw console.error("Error requesting WebSocket ticket:", i), i;
  }
}
function Pr(t) {
  if (!t.success || !t.ticket || !t.expiresAt)
    return !1;
  const e = new Date(t.expiresAt).getTime();
  return Date.now() < e - 3e4;
}
function Ri(t) {
  const e = Pr(t), n = new Date(t.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: e,
    expiresIn: i,
    expired: r >= n
  };
}
async function Eo(t, e, n, r) {
  try {
    const i = {
      "Content-Type": "application/json",
      "x-oddle-mp-auth-token": n.userMpAuthToken,
      "x-oddle-chat-server-key": n.chatServerKey
    }, a = {
      ticket: e,
      ...r
    };
    console.log("[TicketAPI] Validating ticket with server:", {
      url: `${t}/api/v1/tickets/validate`,
      ticket: e.substring(0, 8) + "...",
      context: r
    });
    const s = await fetch(`${t}/api/v1/tickets/validate`, {
      method: "POST",
      headers: i,
      body: JSON.stringify(a)
    });
    if (!s.ok)
      throw new Error(`Ticket validation failed: ${s.status} ${s.statusText}`);
    const o = await s.json();
    return console.log("[TicketAPI] Server validation result:", {
      valid: o.valid,
      error: o.error,
      details: o.details
    }), o.valid || (o.retryable = !1), o;
  } catch (i) {
    console.error("[TicketAPI] Ticket validation error:", i);
    let a = "VALIDATION_ERROR", s = "Validation request failed";
    return i instanceof Error && (s = i.message, i.message.includes("fetch") ? (a = "NETWORK_ERROR", s = "Network error during ticket validation - server may be temporarily unavailable") : i.message.includes("500") || i.message.includes("502") || i.message.includes("503") ? (a = "SERVER_ERROR", s = "Server error during ticket validation - validation service may be temporarily down") : i.message.includes("timeout") && (a = "TIMEOUT_ERROR", s = "Timeout during ticket validation - validation service may be slow or overloaded")), console.log(`[TicketAPI] Validation failed with error type: ${a}`), {
      valid: !1,
      error: s,
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
function bo(t) {
  var r, i, a;
  const e = ((r = t == null ? void 0 : t.message) == null ? void 0 : r.toLowerCase()) || "", n = ((i = t == null ? void 0 : t.name) == null ? void 0 : i.toLowerCase()) || "";
  if (e.includes("connection refused") || e.includes("econnrefused") || e.includes("err_connection_refused") || e.includes("network request failed") || e.includes("failed to connect"))
    return {
      isRetryable: !0,
      reason: "Server unreachable or connection refused",
      errorType: "network"
    };
  if (n === "typeerror" && e.includes("failed to fetch"))
    return e.includes("cors") || e.includes("cross-origin") || e.includes("blocked by cors") ? {
      isRetryable: !1,
      reason: "CORS policy blocking request",
      errorType: "cors"
    } : {
      isRetryable: !0,
      reason: "Network error - server may be unreachable",
      errorType: "network"
    };
  if (e.includes("cors") || e.includes("cross-origin") || e.includes("blocked by cors"))
    return {
      isRetryable: !1,
      reason: "CORS error detected",
      errorType: "cors"
    };
  if (e.includes("unauthorized") || e.includes("forbidden") || e.includes("authentication") || e.includes("invalid token") || e.includes("expired token") || e.includes("expired authentication") || e.includes("access denied") || e.includes("ticket expired") || e.includes("invalid ticket") || e.includes("ticket revoked") || e.includes("ticket not found") || e.includes("user not found") || e.includes("entity not found") || e.includes("permission denied") || e.includes("invalid credentials"))
    return {
      isRetryable: !1,
      reason: "Authentication/authorization error",
      errorType: "auth"
    };
  if (t != null && t.status || t != null && t.response && typeof t.response == "object") {
    const s = t.status || ((a = t.response) == null ? void 0 : a.status);
    if (s === 401 || s === 403)
      return {
        isRetryable: !1,
        reason: `HTTP ${s} - authentication/permission denied`,
        errorType: "auth"
      };
    if (s === 404)
      return {
        isRetryable: !1,
        reason: "HTTP 404 - endpoint not found",
        errorType: "permission"
      };
    if (s >= 400 && s < 500)
      return {
        isRetryable: !1,
        reason: `HTTP ${s} - client error`,
        errorType: "permission"
      };
    if (s >= 500)
      return {
        isRetryable: !0,
        reason: `HTTP ${s} - server error (temporary)`,
        errorType: "server"
      };
  }
  return e.includes("network") || e.includes("timeout") || e.includes("connection") || e.includes("offline") || n === "networkerror" ? {
    isRetryable: !0,
    reason: "Network connectivity issue",
    errorType: "network"
  } : e.includes("websocket") || e.includes("ws") || n === "websocketerror" ? {
    isRetryable: !0,
    reason: "WebSocket connection issue",
    errorType: "network"
  } : {
    isRetryable: !1,
    reason: "Unknown error type",
    errorType: "unknown"
  };
}
function sn(t, e) {
  const n = bo(t);
  return console.error(`[${e}] Error occurred:`, {
    error: (t == null ? void 0 : t.message) || t,
    classification: n,
    shouldRetry: n.isRetryable
  }), n;
}
class _o {
  // 30 seconds cache
  constructor(e, n, r = {}) {
    X(this, "ticket", null);
    X(this, "refreshPromise", null);
    X(this, "validationInterval", null);
    X(this, "authData");
    X(this, "apiUrl");
    X(this, "config");
    // Validation cache to prevent repeated validations of the same ticket
    X(this, "lastValidationResult", null);
    X(this, "validationCacheTTL", 3e4);
    this.authData = e, this.apiUrl = this.convertToHttpUrl(n), this.config = {
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
  convertToHttpUrl(e) {
    return e.replace(/^wss:\/\//, "https://").replace(/^ws:\/\//, "http://");
  }
  /**
   * Get a valid ticket, refreshing if necessary
   * This is the main entry point for getting tickets
   *
   * @returns Valid ticket string
   * @throws Error if ticket refresh fails
   */
  async getValidTicket() {
    return this.ticket && Pr(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
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
    const e = this.config.maxRetries, n = this.config.retryBaseDelay;
    for (let r = 1; r <= e; r++) {
      console.log(
        `TicketManager: Requesting new ticket (attempt ${r}/${e})...`,
        {
          apiUrl: this.apiUrl
        }
      );
      try {
        return this.ticket = await To(
          this.apiUrl,
          this.authData,
          this.config.requestTimeout
        ), console.log("TicketManager: Ticket received successfully", {
          hasTicket: !!this.ticket.ticket,
          expiresAt: this.ticket.expiresAt
        }), this.lastValidationResult = null, this.ticket.ticket;
      } catch (i) {
        console.log("[TicketManager] Caught error during ticket request:", {
          error: i instanceof Error ? i.message : i,
          attempt: r,
          maxRetries: e,
          hasOnErrorCallback: !!this.config.onError
        });
        const a = sn(i, "TicketManager");
        if (!a.isRetryable) {
          const o = `Ticket refresh failed (non-retryable - ${a.reason}): ${i instanceof Error ? i.message : "Unknown error"}`, c = new Error(o);
          throw this.config.onError ? (this.config.onError(c, {
            reason: a.reason,
            errorType: a.errorType
          }), c) : (console.warn(
            "[TicketManager] No onError callback configured, throwing error"
          ), c);
        }
        if (r === e)
          throw new Error(
            `Ticket refresh failed after ${e} attempts (${a.reason}): ${i instanceof Error ? i.message : "Unknown error"}`
          );
        const s = n * Math.pow(2, r - 1);
        console.log(
          `TicketManager: Ticket request failed (${a.reason}), retrying in ${s}ms...`
        ), await new Promise((o) => setTimeout(o, s));
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
  startProactiveRenewal(e) {
    this.stopProactiveRenewal(), console.log("TicketManager: Starting proactive renewal", {
      checkInterval: this.config.checkInterval,
      renewalThreshold: this.config.renewalThreshold
    }), this.validationInterval = window.setInterval(async () => {
      await this.checkAndRenew(e);
    }, this.config.checkInterval);
  }
  /**
   * Check ticket validity and renew if needed
   * @private
   */
  async checkAndRenew(e) {
    if (!this.ticket) {
      console.warn("TicketManager: No ticket to validate");
      return;
    }
    try {
      const r = Ri(this.ticket).expiresIn / 1e3;
      r < this.config.renewalThreshold && (console.log(
        `TicketManager: Ticket expires in ${r.toFixed(
          0
        )}s, renewing...`
      ), await this.refreshTicket(), console.log("TicketManager: Ticket renewed proactively"), e == null || e());
    } catch (n) {
      const r = sn(
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
    return this.ticket ? Pr(this.ticket) : !1;
  }
  /**
   * Validate current ticket with server API
   * This provides authoritative server-side validation
   * Uses a 30-second cache to prevent repeated validations of the same ticket
   */
  async validateWithServer() {
    if (!this.ticket)
      return {
        valid: !1,
        error: "No ticket available to validate",
        code: "NO_TICKET"
      };
    const e = Date.now();
    if (this.lastValidationResult && this.lastValidationResult.ticket === this.ticket.ticket && e - this.lastValidationResult.timestamp < this.validationCacheTTL) {
      const n = ((e - this.lastValidationResult.timestamp) / 1e3).toFixed(1);
      return console.log(
        `[TicketManager] Using cached validation result (${n}s old):`,
        {
          valid: this.lastValidationResult.valid,
          ticket: this.ticket.ticket.substring(0, 8) + "..."
        }
      ), {
        valid: this.lastValidationResult.valid,
        code: this.lastValidationResult.valid ? "VALID" : "INVALID_CACHED"
      };
    }
    try {
      console.log("[TicketManager] Validating ticket with server API...");
      const n = await Eo(
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
        valid: n.valid,
        error: n.error,
        code: n.code,
        retryable: n.retryable
      }), (!n.retryable || n.valid) && (this.lastValidationResult = {
        ticket: this.ticket.ticket,
        valid: n.valid,
        timestamp: e
      }, console.log("[TicketManager] Cached validation result for 30 seconds")), n.valid || (n.retryable ? console.log(
        "[TicketManager] Validation API failed (connectivity issue) - will get fresh ticket and retry"
      ) : (console.log(
        "[TicketManager] Ticket is definitively invalid - clearing and will get fresh ticket"
      ), this.ticket = null)), n;
    } catch (n) {
      return console.error(
        "[TicketManager] Server validation failed unexpectedly:",
        n
      ), {
        valid: !1,
        error: n instanceof Error ? n.message : "Server validation failed unexpectedly",
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
        return Ri(this.ticket).expiresIn;
      } catch (e) {
        console.warn("TicketManager: Error getting ticket info", e);
        return;
      }
  }
  /**
   * Get ticket expiration timestamp
   */
  getExpiresAt() {
    var e;
    return (e = this.ticket) == null ? void 0 : e.expiresAt;
  }
  /**
   * Update authentication data (e.g., after user login)
   */
  updateAuthData(e) {
    this.authData = { ...this.authData, ...e }, console.log("TicketManager: Auth data updated");
  }
  /**
   * Clear ticket (e.g., on logout)
   */
  clear() {
    this.ticket = null, this.lastValidationResult = null, this.stopProactiveRenewal(), console.log("TicketManager: Ticket cleared");
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
async function vo(t, e, n) {
  const r = new URLSearchParams();
  r.append("format", "client"), e.entityId && r.append("entityId", e.entityId), e.entityType && r.append("entityType", e.entityType), console.log("Metadata to append:", e.metadata), e.metadata && Object.keys(e.metadata).length > 0 && r.append("metadata", JSON.stringify(e.metadata));
  const i = `${t}/api/v1/messages/query?${r.toString()}`, a = {
    "Content-Type": "application/json"
  };
  n != null && n.userMpAuthToken && (a["x-oddle-mp-auth-token"] = n.userMpAuthToken), n != null && n.chatServerKey && (a["x-oddle-chat-server-key"] = n.chatServerKey), console.log("Fetching thread messages from:", i);
  const s = await fetch(i, {
    method: "GET",
    headers: a
  });
  if (!s.ok)
    throw new Error(`Failed to fetch thread messages: ${s.statusText}`);
  const o = await s.json();
  return {
    messages: o.messages || [],
    providerResId: o.providerResId,
    threadId: o.threadId
  };
}
async function Ro(t, e, n, r) {
  const i = `${t}/api/v1/threads/${e}`, a = {
    "Content-Type": "application/json"
  };
  r != null && r.userMpAuthToken && (a["x-oddle-mp-auth-token"] = r.userMpAuthToken), r != null && r.chatServerKey && (a["x-oddle-chat-server-key"] = r.chatServerKey);
  const s = await fetch(i, {
    method: "PATCH",
    headers: a,
    body: JSON.stringify(n)
  });
  if (!s.ok) {
    const c = await s.json().catch(() => ({
      error: "Failed to update thread"
    }));
    throw new Error(c.error || "Failed to update thread");
  }
  const o = await s.json();
  if (!o.success)
    throw new Error(o.error || "Failed to update thread");
  return o.data;
}
async function Io(t, e, n, r) {
  const i = `${t}/api/v1/threads/${e}`, a = {
    "Content-Type": "application/json"
  };
  r != null && r.userMpAuthToken && (a["x-oddle-mp-auth-token"] = r.userMpAuthToken), r != null && r.chatServerKey && (a["x-oddle-chat-server-key"] = r.chatServerKey);
  const s = await fetch(i, {
    method: "PATCH",
    headers: a,
    body: JSON.stringify(n)
  });
  if (!s.ok) {
    const c = await s.json().catch(() => ({
      error: "Failed to update thread metadata"
    }));
    throw new Error(c.error || "Failed to update thread metadata");
  }
  const o = await s.json();
  if (!o.success)
    throw new Error(o.error || "Failed to update thread metadata");
  return o.data;
}
class No {
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
    }, this.connectionState = new wo(), this.wsManager = new yo(this.config, this.connectionState), this.messageHandler = new ko({}), this.setupWebSocketHandlers();
  }
  setupWebSocketHandlers() {
    this.wsManager.setEventHandlers({
      onMessage: (e) => this.handleWebSocketMessage(e),
      onOpen: () => this.handleConnectionOpen(),
      onSystemEvent: (e) => {
        var r, i;
        (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onSystemEvent) == null || i.call(r, e);
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
      (e) => this.wsManager.send(e)
    );
  }
  handleWebSocketMessage(e) {
    var r, i, a, s;
    const n = this.messageHandler.handleMessage(e);
    if ((n == null ? void 0 : n.type) === "authentication_error" && this.handleAuthenticationFailure(n), (n == null ? void 0 : n.type) === Ke.THREAD_CREATED) {
      (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onThreadCreated) == null || i.call(r, n.data);
      return;
    }
    if ((n == null ? void 0 : n.type) === Ke.TOOLS_CONFIGURED) {
      (a = this.initResolve) == null || a.call(this);
      return;
    }
    (n == null ? void 0 : n.type) === Ke.SESSION_ESTABLISHED && (this.toolSchemas && this.toolSchemas.length > 0 ? this.sendToolConfiguration() : (s = this.initResolve) == null || s.call(this));
  }
  handleConnectionOpen() {
  }
  handleAuthenticationFailure(e) {
    var r;
    const n = e;
    (n == null ? void 0 : n.code) === "TICKET_INVALID" || (n == null ? void 0 : n.code) === "TICKET_EXPIRED" ? this.refreshTicketAndReconnect().catch((i) => {
      var s;
      sn(i, "TicketRefresh").isRetryable, (s = this.initReject) == null || s.call(this, i);
    }) : (r = this.initReject) == null || r.call(
      this,
      new Error(`Authentication failed: ${n == null ? void 0 : n.error}`)
    );
  }
  sendToolConfiguration() {
    const e = Dt.serializeConfigureTools(
      this.toolSchemas,
      this.contextHelpers
    );
    this.wsManager.send(e);
  }
  async onInit(e) {
    return this.setupEventHandlers(e), this.setupToolsAndContext(e), this.updateConfig(e), this.authCredentials = {
      userMpAuthToken: e.userMpAuthToken,
      chatServerKey: e.chatServerKey
    }, this.ticketManager = new _o(
      {
        userMpAuthToken: e.userMpAuthToken,
        chatServerKey: e.chatServerKey,
        entityId: e.entityId,
        entityType: e.entityType
      },
      this.config.apiUrl,
      {
        onError: e.onError
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
  setupEventHandlers(e) {
    const n = {
      onSetMessage: e.onSetMessage,
      onSystemEvent: e.onSystemEvent,
      onReasoningUpdate: e.onReasoningUpdate,
      onThreadCreated: e.onThreadCreated,
      onMessagesPersisted: e.onMessagesPersisted
    };
    this.messageHandler.updateEventHandlers(n);
  }
  setupToolsAndContext(e) {
    this.toolSchemas = e.toolSchemas || [], this.contextHelpers = e.contextHelpers, e.clientTools && this.messageHandler.updateClientTools(e.clientTools);
  }
  updateConfig(e) {
    e.chatServerUrl && (this.config.apiUrl = e.chatServerUrl);
  }
  async onTriggerMessage(e) {
    const n = this.wsManager.getWebSocketState();
    if (!this.connectionState.isConnected || n !== "OPEN") {
      const o = "Connection lost. Please check your internet connection and try again.";
      throw new Error(o);
    }
    const { message: i, media: a, providerResId: s } = e;
    try {
      this.messageHandler.clearProcessedToolCalls();
      const o = Dt.serializeChatMessage({
        content: i,
        media: a,
        providerResId: s
      });
      this.wsManager.send(o);
    } catch (o) {
      throw this.wsManager.getWebSocketState() !== "OPEN" ? new Error("Connection lost during message send. Please try again.") : o;
    }
  }
  disconnect() {
    var e, n;
    (e = this.ticketManager) == null || e.stopProactiveRenewal(), (n = this.ticketManager) == null || n.clear(), this.wsManager.disconnect();
  }
  isClientConnected() {
    return this.connectionState.isConnected;
  }
  updateContextHelpers(e) {
    this.contextHelpers = { ...this.contextHelpers, ...e };
    const n = Dt.serializeUpdateContextHelpers(
      this.contextHelpers
    );
    this.wsManager.send(n);
  }
  addClientTools(e, n) {
    this.messageHandler.updateClientTools(e), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = Dt.serializeUpdateTools(this.toolSchemas);
    this.wsManager.send(r);
  }
  /**
   * Update client-side tool executors without modifying schemas or reconnecting
   * This ensures fresh closures when useCallback dependencies change
   */
  updateClientTools(e) {
    this.messageHandler.updateClientTools(e);
  }
  getConnectionStatus() {
    var e, n;
    return {
      connected: this.connectionState.isConnected,
      reconnectAttempts: this.connectionState.reconnectAttempts,
      isReconnecting: this.connectionState.isReconnecting,
      websocketState: this.wsManager.getWebSocketState(),
      hasValidTicket: ((e = this.ticketManager) == null ? void 0 : e.isValid()) ?? !1,
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
      const e = await this.ticketManager.refreshTicket();
      this.wsManager.updateTicket(e), await this.wsManager.connect();
    } catch (e) {
      throw e;
    }
  }
  /**
   * Check if current ticket is valid
   */
  isTicketValid() {
    var e;
    return ((e = this.ticketManager) == null ? void 0 : e.isValid()) ?? !1;
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
  stopRun(e) {
    if (!this.connectionState.isConnected)
      return;
    const n = Dt.serializeStopRun(e);
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
  async updateEntityId(e, n, r) {
    if (!this.ticketManager)
      throw new Error(
        "WebSocketChatClient: Cannot update entityId - TicketManager not initialized"
      );
    try {
      await Ro(
        this.config.apiUrl,
        e,
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
  async updateMetadata(e, n) {
    try {
      await Io(
        this.config.apiUrl,
        e,
        n,
        this.authCredentials
      );
    } catch (r) {
      throw r;
    }
  }
}
function Mo({
  // Authentication and server properties
  userMpAuthToken: t,
  chatServerUrl: e,
  chatServerKey: n,
  // Entity configuration
  entityId: r,
  entityType: i,
  // Tools configuration
  tools: a,
  // Other properties
  contextHelpers: s,
  onSetMessage: o,
  onSystemEvent: c,
  onReasoningUpdate: u,
  onThreadCreated: l,
  onMessagesPersisted: h,
  onError: f
}) {
  const [d, y] = xe(
    null
  ), [x, I] = xe(
    De.DISCONNECTED
  ), [T, _] = xe(0), [N, A] = xe(!0), L = pe(null), E = pe(o), U = pe(c), B = pe(u), G = pe(l), Z = pe(h), W = pe(t), z = pe(e), b = pe(n), O = pe(r), H = pe(i), ee = pe(a), ie = pe(a);
  Te(() => {
    JSON.stringify(a) !== JSON.stringify(ee.current) && (ee.current = a, ie.current = a);
  }, [a]);
  const ge = pe(s), Ce = pe(
    s
  );
  Te(() => {
    JSON.stringify(s) !== JSON.stringify(ge.current) && (ge.current = s, Ce.current = s, L.current && s && L.current.updateContextHelpers(s));
  }, [s]), Te(() => {
    E.current = o, U.current = c, B.current = u, G.current = l, Z.current = h, W.current = t, z.current = e, b.current = n, O.current = r, H.current = i;
  }, [
    o,
    c,
    u,
    l,
    h,
    t,
    e,
    n,
    r,
    i
  ]);
  const w = He(() => {
    const le = ie.current;
    return le && le.length > 0 ? le.map(({ execute: ae, ...te }) => te) : [];
  }, [ie.current]), Q = He(() => {
    if (a && a.length > 0) {
      const le = {};
      return a.forEach((ae) => {
        le[ae.name] = ae.execute;
      }), le;
    }
    return {};
  }, [a]);
  Te(() => {
    L.current && Object.keys(Q).length > 0 && L.current.updateClientTools(Q);
  }, [Q]);
  const $ = pe(), C = oe(async () => {
    var le;
    try {
      if (!navigator.onLine)
        throw I(De.DISCONNECTED), A(!1), new Error("No internet connection. Please check your network and try again.");
      if (I(De.CONNECTING), !W.current)
        throw new Error("userMpAuthToken is required");
      if (!z.current)
        throw new Error("chatServerUrl is required");
      if (!b.current)
        throw new Error("chatServerKey is required");
      const ae = new No();
      L.current = ae, y(ae);
      const te = Ce.current || {};
      await ae.onInit({
        // Authentication and server properties (from refs)
        userMpAuthToken: W.current,
        chatServerUrl: z.current,
        chatServerKey: b.current,
        entityId: O.current,
        entityType: (le = H.current) == null ? void 0 : le.toString(),
        // Tools configuration
        toolSchemas: w,
        clientTools: Q,
        contextHelpers: te,
        onSetMessage: E.current,
        onSystemEvent: U.current,
        onReasoningUpdate: B.current,
        onThreadCreated: G.current,
        onMessagesPersisted: Z.current,
        onError: f
      }), I(De.CONNECTED), A(!1);
    } catch (ae) {
      const te = sn(ae, "WebSocketConnection");
      I(De.DISCONNECTED), te.isRetryable ? setTimeout(() => {
        var Se;
        (L.current === null || !L.current.getConnectionStatus().connected) && ((Se = $.current) == null || Se.call($));
      }, 2e3) : A(!1);
    }
  }, [
    w,
    Q
    // All other props use refs to prevent reconnections
    // connectChatClient only recreates when tools change
  ]), re = oe(() => {
    L.current && (L.current.disconnect(), L.current = null), y(null), I(De.DISCONNECTED);
  }, []);
  $.current = C;
  const q = pe(!1);
  return Te(() => (q.current || (q.current = !0, C()), () => {
    re();
  }), []), Te(() => {
    const le = setInterval(() => {
      if (L.current) {
        const ae = L.current.getConnectionStatus();
        if (N && x === De.CONNECTING)
          return;
        ae.connected && x !== De.CONNECTED ? I(De.CONNECTED) : ae.isReconnecting && x !== De.RECONNECTING ? I(De.RECONNECTING) : !ae.connected && !ae.isReconnecting && x !== De.DISCONNECTED && I(De.DISCONNECTED), _(ae.reconnectAttempts);
      }
    }, 1e3);
    return () => clearInterval(le);
  }, [x, N]), {
    chatClient: d,
    connectionState: x,
    reconnectAttempts: T,
    isInitialConnection: N,
    connectChatClient: C,
    disconnectChatClient: re
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: Ja,
  setPrototypeOf: Ii,
  isFrozen: Ao,
  getPrototypeOf: Oo,
  getOwnPropertyDescriptor: Lo
} = Object;
let {
  freeze: et,
  seal: gt,
  create: Dr
} = Object, {
  apply: Fr,
  construct: Hr
} = typeof Reflect < "u" && Reflect;
et || (et = function(e) {
  return e;
});
gt || (gt = function(e) {
  return e;
});
Fr || (Fr = function(e, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return e.apply(n, i);
});
Hr || (Hr = function(e) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new e(...r);
});
const Un = tt(Array.prototype.forEach), Po = tt(Array.prototype.lastIndexOf), Ni = tt(Array.prototype.pop), pn = tt(Array.prototype.push), Do = tt(Array.prototype.splice), Kn = tt(String.prototype.toLowerCase), hr = tt(String.prototype.toString), dr = tt(String.prototype.match), fn = tt(String.prototype.replace), Fo = tt(String.prototype.indexOf), Ho = tt(String.prototype.trim), yt = tt(Object.prototype.hasOwnProperty), Qe = tt(RegExp.prototype.test), gn = zo(TypeError);
function tt(t) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Fr(t, e, r);
  };
}
function zo(t) {
  return function() {
    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
      n[r] = arguments[r];
    return Hr(t, n);
  };
}
function me(t, e) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Kn;
  Ii && Ii(t, null);
  let r = e.length;
  for (; r--; ) {
    let i = e[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (Ao(e) || (e[r] = a), i = a);
    }
    t[i] = !0;
  }
  return t;
}
function Uo(t) {
  for (let e = 0; e < t.length; e++)
    yt(t, e) || (t[e] = null);
  return t;
}
function Pt(t) {
  const e = Dr(null);
  for (const [n, r] of Ja(t))
    yt(t, n) && (Array.isArray(r) ? e[n] = Uo(r) : r && typeof r == "object" && r.constructor === Object ? e[n] = Pt(r) : e[n] = r);
  return e;
}
function mn(t, e) {
  for (; t !== null; ) {
    const r = Lo(t, e);
    if (r) {
      if (r.get)
        return tt(r.get);
      if (typeof r.value == "function")
        return tt(r.value);
    }
    t = Oo(t);
  }
  function n() {
    return null;
  }
  return n;
}
const Mi = et(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), pr = et(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), fr = et(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Bo = et(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), gr = et(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), $o = et(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Ai = et(["#text"]), Oi = et(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), mr = et(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Li = et(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Bn = et(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Vo = gt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), jo = gt(/<%[\w\W]*|[\w\W]*%>/gm), Go = gt(/\$\{[\w\W]*/gm), Wo = gt(/^data-[\-\w.\u00B7-\uFFFF]+$/), qo = gt(/^aria-[\-\w]+$/), Qa = gt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Ko = gt(/^(?:\w+script|data):/i), Zo = gt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), es = gt(/^html$/i), Yo = gt(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Pi = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: qo,
  ATTR_WHITESPACE: Zo,
  CUSTOM_ELEMENT: Yo,
  DATA_ATTR: Wo,
  DOCTYPE_NAME: es,
  ERB_EXPR: jo,
  IS_ALLOWED_URI: Qa,
  IS_SCRIPT_OR_DATA: Ko,
  MUSTACHE_EXPR: Vo,
  TMPLIT_EXPR: Go
});
const Cn = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Xo = function() {
  return typeof window > "u" ? null : window;
}, Jo = function(e, n) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let r = null;
  const i = "data-tt-policy-suffix";
  n && n.hasAttribute(i) && (r = n.getAttribute(i));
  const a = "dompurify" + (r ? "#" + r : "");
  try {
    return e.createPolicy(a, {
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
}, Di = function() {
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
function ts() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Xo();
  const e = (ne) => ts(ne);
  if (e.version = "3.3.0", e.removed = [], !t || !t.document || t.document.nodeType !== Cn.document || !t.Element)
    return e.isSupported = !1, e;
  let {
    document: n
  } = t;
  const r = n, i = r.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: s,
    Node: o,
    Element: c,
    NodeFilter: u,
    NamedNodeMap: l = t.NamedNodeMap || t.MozNamedAttrMap,
    HTMLFormElement: h,
    DOMParser: f,
    trustedTypes: d
  } = t, y = c.prototype, x = mn(y, "cloneNode"), I = mn(y, "remove"), T = mn(y, "nextSibling"), _ = mn(y, "childNodes"), N = mn(y, "parentNode");
  if (typeof s == "function") {
    const ne = n.createElement("template");
    ne.content && ne.content.ownerDocument && (n = ne.content.ownerDocument);
  }
  let A, L = "";
  const {
    implementation: E,
    createNodeIterator: U,
    createDocumentFragment: B,
    getElementsByTagName: G
  } = n, {
    importNode: Z
  } = r;
  let W = Di();
  e.isSupported = typeof Ja == "function" && typeof N == "function" && E && E.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: z,
    ERB_EXPR: b,
    TMPLIT_EXPR: O,
    DATA_ATTR: H,
    ARIA_ATTR: ee,
    IS_SCRIPT_OR_DATA: ie,
    ATTR_WHITESPACE: ge,
    CUSTOM_ELEMENT: Ce
  } = Pi;
  let {
    IS_ALLOWED_URI: w
  } = Pi, Q = null;
  const $ = me({}, [...Mi, ...pr, ...fr, ...gr, ...Ai]);
  let C = null;
  const re = me({}, [...Oi, ...mr, ...Li, ...Bn]);
  let q = Object.seal(Dr(null, {
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
  })), le = null, ae = null;
  const te = Object.seal(Dr(null, {
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
  let Se = !0, fe = !0, Ne = !1, ve = !0, Fe = !1, lt = !0, ct = !1, Nt = !1, Mt = !1, xt = !1, At = !1, kt = !1, jt = !0, Gt = !1;
  const Wt = "user-content-";
  let mt = !0, Ct = !1, v = {}, R = null;
  const j = me({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let J = null;
  const de = me({}, ["audio", "video", "img", "source", "image", "track"]);
  let Me = null;
  const Be = me({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), $e = "http://www.w3.org/1998/Math/MathML", rt = "http://www.w3.org/2000/svg", Ve = "http://www.w3.org/1999/xhtml";
  let ke = Ve, Xe = !1, je = null;
  const On = me({}, [$e, rt, Ve], hr);
  let Xt = me({}, ["mi", "mo", "mn", "ms", "mtext"]), Jt = me({}, ["annotation-xml"]);
  const Ln = me({}, ["title", "style", "font", "a", "script"]);
  let Ht = null;
  const Pn = ["application/xhtml+xml", "text/html"], Dn = "text/html";
  let Ae = null, Ot = null;
  const Fn = n.createElement("form"), un = function(S) {
    return S instanceof RegExp || S instanceof Function;
  }, hn = function() {
    let S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Ot && Ot === S)) {
      if ((!S || typeof S != "object") && (S = {}), S = Pt(S), Ht = // eslint-disable-next-line unicorn/prefer-includes
      Pn.indexOf(S.PARSER_MEDIA_TYPE) === -1 ? Dn : S.PARSER_MEDIA_TYPE, Ae = Ht === "application/xhtml+xml" ? hr : Kn, Q = yt(S, "ALLOWED_TAGS") ? me({}, S.ALLOWED_TAGS, Ae) : $, C = yt(S, "ALLOWED_ATTR") ? me({}, S.ALLOWED_ATTR, Ae) : re, je = yt(S, "ALLOWED_NAMESPACES") ? me({}, S.ALLOWED_NAMESPACES, hr) : On, Me = yt(S, "ADD_URI_SAFE_ATTR") ? me(Pt(Be), S.ADD_URI_SAFE_ATTR, Ae) : Be, J = yt(S, "ADD_DATA_URI_TAGS") ? me(Pt(de), S.ADD_DATA_URI_TAGS, Ae) : de, R = yt(S, "FORBID_CONTENTS") ? me({}, S.FORBID_CONTENTS, Ae) : j, le = yt(S, "FORBID_TAGS") ? me({}, S.FORBID_TAGS, Ae) : Pt({}), ae = yt(S, "FORBID_ATTR") ? me({}, S.FORBID_ATTR, Ae) : Pt({}), v = yt(S, "USE_PROFILES") ? S.USE_PROFILES : !1, Se = S.ALLOW_ARIA_ATTR !== !1, fe = S.ALLOW_DATA_ATTR !== !1, Ne = S.ALLOW_UNKNOWN_PROTOCOLS || !1, ve = S.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Fe = S.SAFE_FOR_TEMPLATES || !1, lt = S.SAFE_FOR_XML !== !1, ct = S.WHOLE_DOCUMENT || !1, xt = S.RETURN_DOM || !1, At = S.RETURN_DOM_FRAGMENT || !1, kt = S.RETURN_TRUSTED_TYPE || !1, Mt = S.FORCE_BODY || !1, jt = S.SANITIZE_DOM !== !1, Gt = S.SANITIZE_NAMED_PROPS || !1, mt = S.KEEP_CONTENT !== !1, Ct = S.IN_PLACE || !1, w = S.ALLOWED_URI_REGEXP || Qa, ke = S.NAMESPACE || Ve, Xt = S.MATHML_TEXT_INTEGRATION_POINTS || Xt, Jt = S.HTML_INTEGRATION_POINTS || Jt, q = S.CUSTOM_ELEMENT_HANDLING || {}, S.CUSTOM_ELEMENT_HANDLING && un(S.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (q.tagNameCheck = S.CUSTOM_ELEMENT_HANDLING.tagNameCheck), S.CUSTOM_ELEMENT_HANDLING && un(S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (q.attributeNameCheck = S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), S.CUSTOM_ELEMENT_HANDLING && typeof S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (q.allowCustomizedBuiltInElements = S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Fe && (fe = !1), At && (xt = !0), v && (Q = me({}, Ai), C = [], v.html === !0 && (me(Q, Mi), me(C, Oi)), v.svg === !0 && (me(Q, pr), me(C, mr), me(C, Bn)), v.svgFilters === !0 && (me(Q, fr), me(C, mr), me(C, Bn)), v.mathMl === !0 && (me(Q, gr), me(C, Li), me(C, Bn))), S.ADD_TAGS && (typeof S.ADD_TAGS == "function" ? te.tagCheck = S.ADD_TAGS : (Q === $ && (Q = Pt(Q)), me(Q, S.ADD_TAGS, Ae))), S.ADD_ATTR && (typeof S.ADD_ATTR == "function" ? te.attributeCheck = S.ADD_ATTR : (C === re && (C = Pt(C)), me(C, S.ADD_ATTR, Ae))), S.ADD_URI_SAFE_ATTR && me(Me, S.ADD_URI_SAFE_ATTR, Ae), S.FORBID_CONTENTS && (R === j && (R = Pt(R)), me(R, S.FORBID_CONTENTS, Ae)), mt && (Q["#text"] = !0), ct && me(Q, ["html", "head", "body"]), Q.table && (me(Q, ["tbody"]), delete le.tbody), S.TRUSTED_TYPES_POLICY) {
        if (typeof S.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw gn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof S.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw gn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        A = S.TRUSTED_TYPES_POLICY, L = A.createHTML("");
      } else
        A === void 0 && (A = Jo(d, i)), A !== null && typeof L == "string" && (L = A.createHTML(""));
      et && et(S), Ot = S;
    }
  }, cr = me({}, [...pr, ...fr, ...Bo]), dn = me({}, [...gr, ...$o]), Hn = function(S) {
    let F = N(S);
    (!F || !F.tagName) && (F = {
      namespaceURI: ke,
      tagName: "template"
    });
    const Y = Kn(S.tagName), Ie = Kn(F.tagName);
    return je[S.namespaceURI] ? S.namespaceURI === rt ? F.namespaceURI === Ve ? Y === "svg" : F.namespaceURI === $e ? Y === "svg" && (Ie === "annotation-xml" || Xt[Ie]) : !!cr[Y] : S.namespaceURI === $e ? F.namespaceURI === Ve ? Y === "math" : F.namespaceURI === rt ? Y === "math" && Jt[Ie] : !!dn[Y] : S.namespaceURI === Ve ? F.namespaceURI === rt && !Jt[Ie] || F.namespaceURI === $e && !Xt[Ie] ? !1 : !dn[Y] && (Ln[Y] || !cr[Y]) : !!(Ht === "application/xhtml+xml" && je[S.namespaceURI]) : !1;
  }, M = function(S) {
    pn(e.removed, {
      element: S
    });
    try {
      N(S).removeChild(S);
    } catch {
      I(S);
    }
  }, ye = function(S, F) {
    try {
      pn(e.removed, {
        attribute: F.getAttributeNode(S),
        from: F
      });
    } catch {
      pn(e.removed, {
        attribute: null,
        from: F
      });
    }
    if (F.removeAttribute(S), S === "is")
      if (xt || At)
        try {
          M(F);
        } catch {
        }
      else
        try {
          F.setAttribute(S, "");
        } catch {
        }
  }, Je = function(S) {
    let F = null, Y = null;
    if (Mt)
      S = "<remove></remove>" + S;
    else {
      const Le = dr(S, /^[\r\n\t ]+/);
      Y = Le && Le[0];
    }
    Ht === "application/xhtml+xml" && ke === Ve && (S = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + S + "</body></html>");
    const Ie = A ? A.createHTML(S) : S;
    if (ke === Ve)
      try {
        F = new f().parseFromString(Ie, Ht);
      } catch {
      }
    if (!F || !F.documentElement) {
      F = E.createDocument(ke, "template", null);
      try {
        F.documentElement.innerHTML = Xe ? L : Ie;
      } catch {
      }
    }
    const qe = F.body || F.documentElement;
    return S && Y && qe.insertBefore(n.createTextNode(Y), qe.childNodes[0] || null), ke === Ve ? G.call(F, ct ? "html" : "body")[0] : ct ? F.documentElement : qe;
  }, Oe = function(S) {
    return U.call(
      S.ownerDocument || S,
      S,
      // eslint-disable-next-line no-bitwise
      u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT | u.SHOW_PROCESSING_INSTRUCTION | u.SHOW_CDATA_SECTION,
      null
    );
  }, Re = function(S) {
    return S instanceof h && (typeof S.nodeName != "string" || typeof S.textContent != "string" || typeof S.removeChild != "function" || !(S.attributes instanceof l) || typeof S.removeAttribute != "function" || typeof S.setAttribute != "function" || typeof S.namespaceURI != "string" || typeof S.insertBefore != "function" || typeof S.hasChildNodes != "function");
  }, ze = function(S) {
    return typeof o == "function" && S instanceof o;
  };
  function We(ne, S, F) {
    Un(ne, (Y) => {
      Y.call(e, S, F, Ot);
    });
  }
  const zt = function(S) {
    let F = null;
    if (We(W.beforeSanitizeElements, S, null), Re(S))
      return M(S), !0;
    const Y = Ae(S.nodeName);
    if (We(W.uponSanitizeElement, S, {
      tagName: Y,
      allowedTags: Q
    }), lt && S.hasChildNodes() && !ze(S.firstElementChild) && Qe(/<[/\w!]/g, S.innerHTML) && Qe(/<[/\w!]/g, S.textContent) || S.nodeType === Cn.progressingInstruction || lt && S.nodeType === Cn.comment && Qe(/<[/\w]/g, S.data))
      return M(S), !0;
    if (!(te.tagCheck instanceof Function && te.tagCheck(Y)) && (!Q[Y] || le[Y])) {
      if (!le[Y] && Ei(Y) && (q.tagNameCheck instanceof RegExp && Qe(q.tagNameCheck, Y) || q.tagNameCheck instanceof Function && q.tagNameCheck(Y)))
        return !1;
      if (mt && !R[Y]) {
        const Ie = N(S) || S.parentNode, qe = _(S) || S.childNodes;
        if (qe && Ie) {
          const Le = qe.length;
          for (let it = Le - 1; it >= 0; --it) {
            const Lt = x(qe[it], !0);
            Lt.__removalCount = (S.__removalCount || 0) + 1, Ie.insertBefore(Lt, T(S));
          }
        }
      }
      return M(S), !0;
    }
    return S instanceof c && !Hn(S) || (Y === "noscript" || Y === "noembed" || Y === "noframes") && Qe(/<\/no(script|embed|frames)/i, S.innerHTML) ? (M(S), !0) : (Fe && S.nodeType === Cn.text && (F = S.textContent, Un([z, b, O], (Ie) => {
      F = fn(F, Ie, " ");
    }), S.textContent !== F && (pn(e.removed, {
      element: S.cloneNode()
    }), S.textContent = F)), We(W.afterSanitizeElements, S, null), !1);
  }, Ti = function(S, F, Y) {
    if (jt && (F === "id" || F === "name") && (Y in n || Y in Fn))
      return !1;
    if (!(fe && !ae[F] && Qe(H, F))) {
      if (!(Se && Qe(ee, F))) {
        if (!(te.attributeCheck instanceof Function && te.attributeCheck(F, S))) {
          if (!C[F] || ae[F]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Ei(S) && (q.tagNameCheck instanceof RegExp && Qe(q.tagNameCheck, S) || q.tagNameCheck instanceof Function && q.tagNameCheck(S)) && (q.attributeNameCheck instanceof RegExp && Qe(q.attributeNameCheck, F) || q.attributeNameCheck instanceof Function && q.attributeNameCheck(F, S)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              F === "is" && q.allowCustomizedBuiltInElements && (q.tagNameCheck instanceof RegExp && Qe(q.tagNameCheck, Y) || q.tagNameCheck instanceof Function && q.tagNameCheck(Y)))
            ) return !1;
          } else if (!Me[F]) {
            if (!Qe(w, fn(Y, ge, ""))) {
              if (!((F === "src" || F === "xlink:href" || F === "href") && S !== "script" && Fo(Y, "data:") === 0 && J[S])) {
                if (!(Ne && !Qe(ie, fn(Y, ge, "")))) {
                  if (Y)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Ei = function(S) {
    return S !== "annotation-xml" && dr(S, Ce);
  }, bi = function(S) {
    We(W.beforeSanitizeAttributes, S, null);
    const {
      attributes: F
    } = S;
    if (!F || Re(S))
      return;
    const Y = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: C,
      forceKeepAttr: void 0
    };
    let Ie = F.length;
    for (; Ie--; ) {
      const qe = F[Ie], {
        name: Le,
        namespaceURI: it,
        value: Lt
      } = qe, Qt = Ae(Le), ur = Lt;
      let Ge = Le === "value" ? ur : Ho(ur);
      if (Y.attrName = Qt, Y.attrValue = Ge, Y.keepAttr = !0, Y.forceKeepAttr = void 0, We(W.uponSanitizeAttribute, S, Y), Ge = Y.attrValue, Gt && (Qt === "id" || Qt === "name") && (ye(Le, S), Ge = Wt + Ge), lt && Qe(/((--!?|])>)|<\/(style|title|textarea)/i, Ge)) {
        ye(Le, S);
        continue;
      }
      if (Qt === "attributename" && dr(Ge, "href")) {
        ye(Le, S);
        continue;
      }
      if (Y.forceKeepAttr)
        continue;
      if (!Y.keepAttr) {
        ye(Le, S);
        continue;
      }
      if (!ve && Qe(/\/>/i, Ge)) {
        ye(Le, S);
        continue;
      }
      Fe && Un([z, b, O], (vi) => {
        Ge = fn(Ge, vi, " ");
      });
      const _i = Ae(S.nodeName);
      if (!Ti(_i, Qt, Ge)) {
        ye(Le, S);
        continue;
      }
      if (A && typeof d == "object" && typeof d.getAttributeType == "function" && !it)
        switch (d.getAttributeType(_i, Qt)) {
          case "TrustedHTML": {
            Ge = A.createHTML(Ge);
            break;
          }
          case "TrustedScriptURL": {
            Ge = A.createScriptURL(Ge);
            break;
          }
        }
      if (Ge !== ur)
        try {
          it ? S.setAttributeNS(it, Le, Ge) : S.setAttribute(Le, Ge), Re(S) ? M(S) : Ni(e.removed);
        } catch {
          ye(Le, S);
        }
    }
    We(W.afterSanitizeAttributes, S, null);
  }, po = function ne(S) {
    let F = null;
    const Y = Oe(S);
    for (We(W.beforeSanitizeShadowDOM, S, null); F = Y.nextNode(); )
      We(W.uponSanitizeShadowNode, F, null), zt(F), bi(F), F.content instanceof a && ne(F.content);
    We(W.afterSanitizeShadowDOM, S, null);
  };
  return e.sanitize = function(ne) {
    let S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, F = null, Y = null, Ie = null, qe = null;
    if (Xe = !ne, Xe && (ne = "<!-->"), typeof ne != "string" && !ze(ne))
      if (typeof ne.toString == "function") {
        if (ne = ne.toString(), typeof ne != "string")
          throw gn("dirty is not a string, aborting");
      } else
        throw gn("toString is not a function");
    if (!e.isSupported)
      return ne;
    if (Nt || hn(S), e.removed = [], typeof ne == "string" && (Ct = !1), Ct) {
      if (ne.nodeName) {
        const Lt = Ae(ne.nodeName);
        if (!Q[Lt] || le[Lt])
          throw gn("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (ne instanceof o)
      F = Je("<!---->"), Y = F.ownerDocument.importNode(ne, !0), Y.nodeType === Cn.element && Y.nodeName === "BODY" || Y.nodeName === "HTML" ? F = Y : F.appendChild(Y);
    else {
      if (!xt && !Fe && !ct && // eslint-disable-next-line unicorn/prefer-includes
      ne.indexOf("<") === -1)
        return A && kt ? A.createHTML(ne) : ne;
      if (F = Je(ne), !F)
        return xt ? null : kt ? L : "";
    }
    F && Mt && M(F.firstChild);
    const Le = Oe(Ct ? ne : F);
    for (; Ie = Le.nextNode(); )
      zt(Ie), bi(Ie), Ie.content instanceof a && po(Ie.content);
    if (Ct)
      return ne;
    if (xt) {
      if (At)
        for (qe = B.call(F.ownerDocument); F.firstChild; )
          qe.appendChild(F.firstChild);
      else
        qe = F;
      return (C.shadowroot || C.shadowrootmode) && (qe = Z.call(r, qe, !0)), qe;
    }
    let it = ct ? F.outerHTML : F.innerHTML;
    return ct && Q["!doctype"] && F.ownerDocument && F.ownerDocument.doctype && F.ownerDocument.doctype.name && Qe(es, F.ownerDocument.doctype.name) && (it = "<!DOCTYPE " + F.ownerDocument.doctype.name + `>
` + it), Fe && Un([z, b, O], (Lt) => {
      it = fn(it, Lt, " ");
    }), A && kt ? A.createHTML(it) : it;
  }, e.setConfig = function() {
    let ne = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    hn(ne), Nt = !0;
  }, e.clearConfig = function() {
    Ot = null, Nt = !1;
  }, e.isValidAttribute = function(ne, S, F) {
    Ot || hn({});
    const Y = Ae(ne), Ie = Ae(S);
    return Ti(Y, Ie, F);
  }, e.addHook = function(ne, S) {
    typeof S == "function" && pn(W[ne], S);
  }, e.removeHook = function(ne, S) {
    if (S !== void 0) {
      const F = Po(W[ne], S);
      return F === -1 ? void 0 : Do(W[ne], F, 1)[0];
    }
    return Ni(W[ne]);
  }, e.removeHooks = function(ne) {
    W[ne] = [];
  }, e.removeAllHooks = function() {
    W = Di();
  }, e;
}
var ns = ts();
const Qo = {
  // For user messages - very strict, no HTML allowed except basic formatting
  userMessage: {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "code", "pre", "br"],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: !0,
    ALLOW_DATA_ATTR: !1
  },
  // For assistant messages - allow more formatting but still secure
  assistantMessage: {
    ALLOWED_TAGS: [
      "p",
      "br",
      "b",
      "i",
      "em",
      "strong",
      "code",
      "pre",
      "ul",
      "ol",
      "li",
      "blockquote",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6"
    ],
    ALLOWED_ATTR: ["class"],
    KEEP_CONTENT: !0,
    ALLOW_DATA_ATTR: !1
  },
  // For plain text only - strips all HTML
  plainText: {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: !0
  }
};
function el(t, e = "userMessage") {
  if (typeof t != "string")
    return console.warn("sanitizeInput received non-string input:", typeof t), "";
  if (!t.trim())
    return "";
  try {
    const n = Qo[e], r = ns.sanitize(t, n);
    return rs(r) ? (console.warn("Suspicious content detected and removed:", t), r.replace(/javascript:/gi, "").replace(/data:/gi, "")) : r;
  } catch (n) {
    return console.error("Error sanitizing input:", n), "";
  }
}
function rs(t) {
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
  ].some((n) => n.test(t));
}
function ai(t, e = !1) {
  const n = "___NEWLINE___", r = t.replace(/\n/g, n);
  return el(r, e ? "assistantMessage" : "userMessage").replace(new RegExp(n, "g"), `
`);
}
function tl(t) {
  return typeof t != "string" ? "" : t.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function Fi(t) {
  if (typeof t != "string") return !1;
  try {
    const e = new URL(t);
    return !(!["http:", "https:", "data:"].includes(e.protocol) || rs(t));
  } catch {
    return !1;
  }
}
function nl() {
  ns.addHook("beforeSanitizeAttributes", (t) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      t.hasAttribute(n) && t.removeAttribute(n);
    }), t.hasAttribute("href")) {
      const n = t.getAttribute("href");
      n && !Fi(n) && t.removeAttribute("href");
    }
    if (t.hasAttribute("src")) {
      const n = t.getAttribute("src");
      n && !Fi(n) && t.removeAttribute("src");
    }
  });
}
nl();
function rl() {
  const [t, e] = xe([]), n = oe(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = oe(
    (s, o) => {
      const u = ai(o, s === "assistant");
      e((l) => [
        ...l,
        {
          id: n(),
          role: s,
          content: u,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [n]
  ), i = oe((s, o) => {
    e(
      (c) => c.map((u) => u.id === s ? { ...u, ...o } : u)
    );
  }, []), a = oe(
    (s, o, c) => {
      e(
        (u) => u.map(
          (l) => l.id === s ? {
            ...l,
            content: o,
            isStreaming: c
          } : l
        )
      );
    },
    []
  );
  return {
    messages: t,
    setMessages: e,
    addMessage: r,
    updateMessage: i,
    updateMessageContent: a,
    generateId: n
  };
}
const Hi = (t) => {
  let e;
  const n = /* @__PURE__ */ new Set(), r = (u, l) => {
    const h = typeof u == "function" ? u(e) : u;
    if (!Object.is(h, e)) {
      const f = e;
      e = l ?? (typeof h != "object" || h === null) ? h : Object.assign({}, e, h), n.forEach((d) => d(e, f));
    }
  }, i = () => e, o = { setState: r, getState: i, getInitialState: () => c, subscribe: (u) => (n.add(u), () => n.delete(u)) }, c = e = t(r, i, o);
  return o;
}, il = (t) => t ? Hi(t) : Hi, al = (t) => t;
function sl(t, e = al) {
  const n = wt.useSyncExternalStore(
    t.subscribe,
    wt.useCallback(() => e(t.getState()), [t, e]),
    wt.useCallback(() => e(t.getInitialState()), [t, e])
  );
  return wt.useDebugValue(n), n;
}
const ol = (t) => {
  const e = il(t), n = (r) => sl(e, r);
  return Object.assign(n, e), n;
}, ll = (t) => ol, zi = { BASE_URL: "/", DEV: !0, MODE: "production", PROD: !1, SSR: !1, VITE_APP_TOLGEE_API_KEY: "tgpak_ge4v6ytcm5xtozdlobzxk4twgyzwqntjoe3xi4bwozygu5q", VITE_APP_TOLGEE_API_URL: "https://tolgee-translation.oddleapp.com", VITE_APP_TOLGEE_PROJECT_ID: "19", VITE_USER_NODE_ENV: "development" }, _n = /* @__PURE__ */ new Map(), $n = (t) => {
  const e = _n.get(t);
  return e ? Object.fromEntries(
    Object.entries(e.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, cl = (t, e, n) => {
  if (t === void 0)
    return {
      type: "untracked",
      connection: e.connect(n)
    };
  const r = _n.get(n.name);
  if (r)
    return { type: "tracked", store: t, ...r };
  const i = {
    connection: e.connect(n),
    stores: {}
  };
  return _n.set(n.name, i), { type: "tracked", store: t, ...i };
}, ul = (t, e) => {
  if (e === void 0) return;
  const n = _n.get(t);
  n && (delete n.stores[e], Object.keys(n.stores).length === 0 && _n.delete(t));
}, hl = (t) => {
  var e, n;
  if (!t) return;
  const r = t.split(`
`), i = r.findIndex(
    (s) => s.includes("api.setState")
  );
  if (i < 0) return;
  const a = ((e = r[i + 1]) == null ? void 0 : e.trim()) || "";
  return (n = /.+ (.+) .+/.exec(a)) == null ? void 0 : n[1];
}, dl = (t, e = {}) => (n, r, i) => {
  const { enabled: a, anonymousActionType: s, store: o, ...c } = e;
  let u;
  try {
    u = (a ?? (zi ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!u)
    return t(n, r, i);
  const { connection: l, ...h } = cl(o, u, c);
  let f = !0;
  i.setState = (x, I, T) => {
    const _ = n(x, I);
    if (!f) return _;
    const N = T === void 0 ? {
      type: s || hl(new Error().stack) || "anonymous"
    } : typeof T == "string" ? { type: T } : T;
    return o === void 0 ? (l == null || l.send(N, r()), _) : (l == null || l.send(
      {
        ...N,
        type: `${o}/${N.type}`
      },
      {
        ...$n(c.name),
        [o]: i.getState()
      }
    ), _);
  }, i.devtools = {
    cleanup: () => {
      l && typeof l.unsubscribe == "function" && l.unsubscribe(), ul(c.name, o);
    }
  };
  const d = (...x) => {
    const I = f;
    f = !1, n(...x), f = I;
  }, y = t(i.setState, r, i);
  if (h.type === "untracked" ? l == null || l.init(y) : (h.stores[h.store] = i, l == null || l.init(
    Object.fromEntries(
      Object.entries(h.stores).map(([x, I]) => [
        x,
        x === h.store ? y : I.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let x = !1;
    const I = i.dispatch;
    i.dispatch = (...T) => {
      (zi ? "production" : void 0) !== "production" && T[0].type === "__setState" && !x && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), x = !0), I(...T);
    };
  }
  return l.subscribe((x) => {
    var I;
    switch (x.type) {
      case "ACTION":
        if (typeof x.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return Cr(
          x.payload,
          (T) => {
            if (T.type === "__setState") {
              if (o === void 0) {
                d(T.state);
                return;
              }
              Object.keys(T.state).length !== 1 && console.error(
                `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
              );
              const _ = T.state[o];
              if (_ == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(_) && d(_);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(T);
          }
        );
      case "DISPATCH":
        switch (x.payload.type) {
          case "RESET":
            return d(y), o === void 0 ? l == null ? void 0 : l.init(i.getState()) : l == null ? void 0 : l.init($n(c.name));
          case "COMMIT":
            if (o === void 0) {
              l == null || l.init(i.getState());
              return;
            }
            return l == null ? void 0 : l.init($n(c.name));
          case "ROLLBACK":
            return Cr(x.state, (T) => {
              if (o === void 0) {
                d(T), l == null || l.init(i.getState());
                return;
              }
              d(T[o]), l == null || l.init($n(c.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return Cr(x.state, (T) => {
              if (o === void 0) {
                d(T);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(T[o]) && d(T[o]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: T } = x.payload, _ = (I = T.computedStates.slice(-1)[0]) == null ? void 0 : I.state;
            if (!_) return;
            d(o === void 0 ? _ : _[o]), l == null || l.send(
              null,
              // FIXME no-any
              T
            );
            return;
          }
          case "PAUSE_RECORDING":
            return f = !f;
        }
        return;
    }
  }), y;
}, pl = dl, Cr = (t, e) => {
  let n;
  try {
    n = JSON.parse(t);
  } catch (r) {
    console.error(
      "[zustand devtools middleware] Could not parse the received json",
      r
    );
  }
  n !== void 0 && e(n);
}, fl = (t) => ({
  // Initial state
  isModalOpen: !1,
  isCollapsed: !1,
  currentMode: "sidebar",
  // Actions
  setIsModalOpen: (e) => t({ isModalOpen: e }),
  setIsCollapsed: (e) => t({ isCollapsed: e }),
  setCurrentMode: (e) => t({ currentMode: e }),
  openModal: () => t({ isModalOpen: !0 }),
  closeModal: () => t({ isModalOpen: !1 }),
  toggleCollapse: () => t((e) => ({ isCollapsed: !e.isCollapsed })),
  toggleFullscreen: () => t((e) => ({
    currentMode: e.currentMode === "sidebar" ? "fullscreen" : "sidebar"
  }))
}), gl = (t) => ({
  // Initial state
  chatStatus: Ee.IDLE,
  streamingStatus: ht.IDLE,
  // Actions
  setChatStatus: (e) => t({ chatStatus: e }),
  setStreamingStatus: (e) => t({ streamingStatus: e }),
  resetChatStatus: () => t({
    chatStatus: Ee.IDLE,
    streamingStatus: ht.IDLE
  })
}), ml = (t) => ({
  // Initial state
  isLoadingConversation: !1,
  conversationError: null,
  // Actions
  setIsLoadingConversation: (e) => t({ isLoadingConversation: e }),
  setConversationError: (e) => t({ conversationError: e }),
  clearConversationError: () => t({ conversationError: null })
}), Cl = (t) => ({
  // Initial state
  currentThreadId: null,
  providerResId: null,
  // Actions
  setCurrentThreadId: (e) => t({ currentThreadId: e }),
  setProviderResId: (e) => t({ providerResId: e }),
  clearThreadData: () => t({
    currentThreadId: null,
    providerResId: null
  })
}), yl = (t) => ({
  // Initial state
  isStreaming: !1,
  isThinking: !1,
  streamingContent: "",
  isHandlingTool: !1,
  currentAssistantMessageId: null,
  // Individual setters
  setIsStreaming: (e) => t({ isStreaming: e }),
  setIsThinking: (e) => t({ isThinking: e }),
  setStreamingContent: (e) => t({ streamingContent: e }),
  setIsHandlingTool: (e) => t({ isHandlingTool: e }),
  setCurrentAssistantMessageId: (e) => t({ currentAssistantMessageId: e }),
  // Lifecycle actions
  startStreaming: (e) => t({
    isStreaming: !0,
    isThinking: !0,
    currentAssistantMessageId: e,
    streamingContent: "",
    isHandlingTool: !1
  }),
  stopStreaming: () => t({
    isStreaming: !1,
    isThinking: !1
  }),
  clearStreamingBuffers: () => t({
    streamingContent: "",
    currentAssistantMessageId: null
  }),
  resetToolHandling: () => t({
    isHandlingTool: !1
  })
}), ce = ll()(
  pl(
    (...t) => ({
      ...fl(...t),
      ...gl(...t),
      ...ml(...t),
      ...Cl(...t),
      ...yl(...t)
    }),
    {
      name: "ChatUI-Store"
    }
  )
), hf = () => ce((t) => ({
  isModalOpen: t.isModalOpen,
  isCollapsed: t.isCollapsed,
  currentMode: t.currentMode,
  openModal: t.openModal,
  closeModal: t.closeModal,
  toggleCollapse: t.toggleCollapse,
  toggleFullscreen: t.toggleFullscreen
})), df = () => ce((t) => ({
  chatStatus: t.chatStatus,
  streamingStatus: t.streamingStatus,
  setChatStatus: t.setChatStatus,
  setStreamingStatus: t.setStreamingStatus,
  resetChatStatus: t.resetChatStatus
})), pf = () => ce((t) => ({
  isLoadingConversation: t.isLoadingConversation,
  conversationError: t.conversationError,
  setIsLoadingConversation: t.setIsLoadingConversation,
  setConversationError: t.setConversationError,
  clearConversationError: t.clearConversationError
})), ff = () => ce((t) => ({
  currentThreadId: t.currentThreadId,
  providerResId: t.providerResId,
  setCurrentThreadId: t.setCurrentThreadId,
  setProviderResId: t.setProviderResId,
  clearThreadData: t.clearThreadData
}));
function wl() {
  const t = ce((_) => _.isStreaming), e = ce((_) => _.setIsStreaming), n = ce((_) => _.isThinking), r = ce((_) => _.setIsThinking), i = ce((_) => _.streamingContent), a = ce((_) => _.setStreamingContent), s = ce((_) => _.isHandlingTool), o = ce((_) => _.setIsHandlingTool), c = ce((_) => _.startStreaming), u = ce((_) => _.stopStreaming), l = ce((_) => _.clearStreamingBuffers), h = ce((_) => _.resetToolHandling), f = pe(""), d = He(() => ({
    get current() {
      return ce.getState().currentAssistantMessageId;
    },
    set current(_) {
      ce.getState().setCurrentAssistantMessageId(_);
    }
  }), []), y = oe((_) => {
    _ ? c(_) : (e(!0), r(!0), a("")), f.current = "";
  }, [c, e, r, a]), x = oe(() => {
    u(), f.current = "";
  }, [u]), I = oe(() => {
    h();
  }, [h]), T = oe(() => {
    l(), f.current = "";
  }, [l]);
  return {
    // State
    isStreaming: t,
    setIsStreaming: e,
    isThinking: n,
    setIsThinking: r,
    streamingContent: i,
    setStreamingContent: a,
    isHandlingTool: s,
    setIsHandlingTool: o,
    // Refs (backward compatible interface)
    currentAssistantMessageIdRef: d,
    streamingContentRef: f,
    // Actions
    startStreaming: y,
    stopStreaming: x,
    resetToolHandling: I,
    clearStreamingBuffers: T
  };
}
const ue = (t) => typeof t == "string", yn = () => {
  let t, e;
  const n = new Promise((r, i) => {
    t = r, e = i;
  });
  return n.resolve = t, n.reject = e, n;
}, Ui = (t) => t == null ? "" : "" + t, Sl = (t, e, n) => {
  t.forEach((r) => {
    e[r] && (n[r] = e[r]);
  });
}, xl = /###/g, Bi = (t) => t && t.indexOf("###") > -1 ? t.replace(xl, ".") : t, $i = (t) => !t || ue(t), xn = (t, e, n) => {
  const r = ue(e) ? e.split(".") : e;
  let i = 0;
  for (; i < r.length - 1; ) {
    if ($i(t)) return {};
    const a = Bi(r[i]);
    !t[a] && n && (t[a] = new n()), Object.prototype.hasOwnProperty.call(t, a) ? t = t[a] : t = {}, ++i;
  }
  return $i(t) ? {} : {
    obj: t,
    k: Bi(r[i])
  };
}, Vi = (t, e, n) => {
  const {
    obj: r,
    k: i
  } = xn(t, e, Object);
  if (r !== void 0 || e.length === 1) {
    r[i] = n;
    return;
  }
  let a = e[e.length - 1], s = e.slice(0, e.length - 1), o = xn(t, s, Object);
  for (; o.obj === void 0 && s.length; )
    a = `${s[s.length - 1]}.${a}`, s = s.slice(0, s.length - 1), o = xn(t, s, Object), o != null && o.obj && typeof o.obj[`${o.k}.${a}`] < "u" && (o.obj = void 0);
  o.obj[`${o.k}.${a}`] = n;
}, kl = (t, e, n, r) => {
  const {
    obj: i,
    k: a
  } = xn(t, e, Object);
  i[a] = i[a] || [], i[a].push(n);
}, Jn = (t, e) => {
  const {
    obj: n,
    k: r
  } = xn(t, e);
  if (n && Object.prototype.hasOwnProperty.call(n, r))
    return n[r];
}, Tl = (t, e, n) => {
  const r = Jn(t, n);
  return r !== void 0 ? r : Jn(e, n);
}, is = (t, e, n) => {
  for (const r in e)
    r !== "__proto__" && r !== "constructor" && (r in t ? ue(t[r]) || t[r] instanceof String || ue(e[r]) || e[r] instanceof String ? n && (t[r] = e[r]) : is(t[r], e[r], n) : t[r] = e[r]);
  return t;
}, en = (t) => t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var El = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
const bl = (t) => ue(t) ? t.replace(/[&<>"'\/]/g, (e) => El[e]) : t;
class _l {
  constructor(e) {
    this.capacity = e, this.regExpMap = /* @__PURE__ */ new Map(), this.regExpQueue = [];
  }
  getRegExp(e) {
    const n = this.regExpMap.get(e);
    if (n !== void 0)
      return n;
    const r = new RegExp(e);
    return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()), this.regExpMap.set(e, r), this.regExpQueue.push(e), r;
  }
}
const vl = [" ", ",", "?", "!", ";"], Rl = new _l(20), Il = (t, e, n) => {
  e = e || "", n = n || "";
  const r = vl.filter((s) => e.indexOf(s) < 0 && n.indexOf(s) < 0);
  if (r.length === 0) return !0;
  const i = Rl.getRegExp(`(${r.map((s) => s === "?" ? "\\?" : s).join("|")})`);
  let a = !i.test(t);
  if (!a) {
    const s = t.indexOf(n);
    s > 0 && !i.test(t.substring(0, s)) && (a = !0);
  }
  return a;
}, zr = (t, e, n = ".") => {
  if (!t) return;
  if (t[e])
    return Object.prototype.hasOwnProperty.call(t, e) ? t[e] : void 0;
  const r = e.split(n);
  let i = t;
  for (let a = 0; a < r.length; ) {
    if (!i || typeof i != "object")
      return;
    let s, o = "";
    for (let c = a; c < r.length; ++c)
      if (c !== a && (o += n), o += r[c], s = i[o], s !== void 0) {
        if (["string", "number", "boolean"].indexOf(typeof s) > -1 && c < r.length - 1)
          continue;
        a += c - a + 1;
        break;
      }
    i = s;
  }
  return i;
}, vn = (t) => t == null ? void 0 : t.replace("_", "-"), Nl = {
  type: "logger",
  log(t) {
    this.output("log", t);
  },
  warn(t) {
    this.output("warn", t);
  },
  error(t) {
    this.output("error", t);
  },
  output(t, e) {
    var n, r;
    (r = (n = console == null ? void 0 : console[t]) == null ? void 0 : n.apply) == null || r.call(n, console, e);
  }
};
class Qn {
  constructor(e, n = {}) {
    this.init(e, n);
  }
  init(e, n = {}) {
    this.prefix = n.prefix || "i18next:", this.logger = e || Nl, this.options = n, this.debug = n.debug;
  }
  log(...e) {
    return this.forward(e, "log", "", !0);
  }
  warn(...e) {
    return this.forward(e, "warn", "", !0);
  }
  error(...e) {
    return this.forward(e, "error", "");
  }
  deprecate(...e) {
    return this.forward(e, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(e, n, r, i) {
    return i && !this.debug ? null : (ue(e[0]) && (e[0] = `${r}${this.prefix} ${e[0]}`), this.logger[n](e));
  }
  create(e) {
    return new Qn(this.logger, {
      prefix: `${this.prefix}:${e}:`,
      ...this.options
    });
  }
  clone(e) {
    return e = e || this.options, e.prefix = e.prefix || this.prefix, new Qn(this.logger, e);
  }
}
var Rt = new Qn();
class ir {
  constructor() {
    this.observers = {};
  }
  on(e, n) {
    return e.split(" ").forEach((r) => {
      this.observers[r] || (this.observers[r] = /* @__PURE__ */ new Map());
      const i = this.observers[r].get(n) || 0;
      this.observers[r].set(n, i + 1);
    }), this;
  }
  off(e, n) {
    if (this.observers[e]) {
      if (!n) {
        delete this.observers[e];
        return;
      }
      this.observers[e].delete(n);
    }
  }
  emit(e, ...n) {
    this.observers[e] && Array.from(this.observers[e].entries()).forEach(([i, a]) => {
      for (let s = 0; s < a; s++)
        i(...n);
    }), this.observers["*"] && Array.from(this.observers["*"].entries()).forEach(([i, a]) => {
      for (let s = 0; s < a; s++)
        i.apply(i, [e, ...n]);
    });
  }
}
class ji extends ir {
  constructor(e, n = {
    ns: ["translation"],
    defaultNS: "translation"
  }) {
    super(), this.data = e || {}, this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(e) {
    this.options.ns.indexOf(e) < 0 && this.options.ns.push(e);
  }
  removeNamespaces(e) {
    const n = this.options.ns.indexOf(e);
    n > -1 && this.options.ns.splice(n, 1);
  }
  getResource(e, n, r, i = {}) {
    var u, l;
    const a = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator, s = i.ignoreJSONStructure !== void 0 ? i.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let o;
    e.indexOf(".") > -1 ? o = e.split(".") : (o = [e, n], r && (Array.isArray(r) ? o.push(...r) : ue(r) && a ? o.push(...r.split(a)) : o.push(r)));
    const c = Jn(this.data, o);
    return !c && !n && !r && e.indexOf(".") > -1 && (e = o[0], n = o[1], r = o.slice(2).join(".")), c || !s || !ue(r) ? c : zr((l = (u = this.data) == null ? void 0 : u[e]) == null ? void 0 : l[n], r, a);
  }
  addResource(e, n, r, i, a = {
    silent: !1
  }) {
    const s = a.keySeparator !== void 0 ? a.keySeparator : this.options.keySeparator;
    let o = [e, n];
    r && (o = o.concat(s ? r.split(s) : r)), e.indexOf(".") > -1 && (o = e.split("."), i = n, n = o[1]), this.addNamespaces(n), Vi(this.data, o, i), a.silent || this.emit("added", e, n, r, i);
  }
  addResources(e, n, r, i = {
    silent: !1
  }) {
    for (const a in r)
      (ue(r[a]) || Array.isArray(r[a])) && this.addResource(e, n, a, r[a], {
        silent: !0
      });
    i.silent || this.emit("added", e, n, r);
  }
  addResourceBundle(e, n, r, i, a, s = {
    silent: !1,
    skipCopy: !1
  }) {
    let o = [e, n];
    e.indexOf(".") > -1 && (o = e.split("."), i = r, r = n, n = o[1]), this.addNamespaces(n);
    let c = Jn(this.data, o) || {};
    s.skipCopy || (r = JSON.parse(JSON.stringify(r))), i ? is(c, r, a) : c = {
      ...c,
      ...r
    }, Vi(this.data, o, c), s.silent || this.emit("added", e, n, r);
  }
  removeResourceBundle(e, n) {
    this.hasResourceBundle(e, n) && delete this.data[e][n], this.removeNamespaces(n), this.emit("removed", e, n);
  }
  hasResourceBundle(e, n) {
    return this.getResource(e, n) !== void 0;
  }
  getResourceBundle(e, n) {
    return n || (n = this.options.defaultNS), this.getResource(e, n);
  }
  getDataByLanguage(e) {
    return this.data[e];
  }
  hasLanguageSomeTranslations(e) {
    const n = this.getDataByLanguage(e);
    return !!(n && Object.keys(n) || []).find((i) => n[i] && Object.keys(n[i]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var as = {
  processors: {},
  addPostProcessor(t) {
    this.processors[t.name] = t;
  },
  handle(t, e, n, r, i) {
    return t.forEach((a) => {
      var s;
      e = ((s = this.processors[a]) == null ? void 0 : s.process(e, n, r, i)) ?? e;
    }), e;
  }
};
const ss = Symbol("i18next/PATH_KEY");
function Ml() {
  const t = [], e = /* @__PURE__ */ Object.create(null);
  let n;
  return e.get = (r, i) => {
    var a;
    return (a = n == null ? void 0 : n.revoke) == null || a.call(n), i === ss ? t : (t.push(i), n = Proxy.revocable(r, e), n.proxy);
  }, Proxy.revocable(/* @__PURE__ */ Object.create(null), e).proxy;
}
function Ur(t, e) {
  const {
    [ss]: n
  } = t(Ml());
  return n.join((e == null ? void 0 : e.keySeparator) ?? ".");
}
const Gi = {}, yr = (t) => !ue(t) && typeof t != "boolean" && typeof t != "number";
class er extends ir {
  constructor(e, n = {}) {
    super(), Sl(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = Rt.create("translator");
  }
  changeLanguage(e) {
    e && (this.language = e);
  }
  exists(e, n = {
    interpolation: {}
  }) {
    const r = {
      ...n
    };
    if (e == null) return !1;
    const i = this.resolve(e, r);
    if ((i == null ? void 0 : i.res) === void 0) return !1;
    const a = yr(i.res);
    return !(r.returnObjects === !1 && a);
  }
  extractFromKey(e, n) {
    let r = n.nsSeparator !== void 0 ? n.nsSeparator : this.options.nsSeparator;
    r === void 0 && (r = ":");
    const i = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator;
    let a = n.ns || this.options.defaultNS || [];
    const s = r && e.indexOf(r) > -1, o = !this.options.userDefinedKeySeparator && !n.keySeparator && !this.options.userDefinedNsSeparator && !n.nsSeparator && !Il(e, r, i);
    if (s && !o) {
      const c = e.match(this.interpolator.nestingRegexp);
      if (c && c.length > 0)
        return {
          key: e,
          namespaces: ue(a) ? [a] : a
        };
      const u = e.split(r);
      (r !== i || r === i && this.options.ns.indexOf(u[0]) > -1) && (a = u.shift()), e = u.join(i);
    }
    return {
      key: e,
      namespaces: ue(a) ? [a] : a
    };
  }
  translate(e, n, r) {
    let i = typeof n == "object" ? {
      ...n
    } : n;
    if (typeof i != "object" && this.options.overloadTranslationOptionHandler && (i = this.options.overloadTranslationOptionHandler(arguments)), typeof i == "object" && (i = {
      ...i
    }), i || (i = {}), e == null) return "";
    typeof e == "function" && (e = Ur(e, {
      ...this.options,
      ...i
    })), Array.isArray(e) || (e = [String(e)]);
    const a = i.returnDetails !== void 0 ? i.returnDetails : this.options.returnDetails, s = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator, {
      key: o,
      namespaces: c
    } = this.extractFromKey(e[e.length - 1], i), u = c[c.length - 1];
    let l = i.nsSeparator !== void 0 ? i.nsSeparator : this.options.nsSeparator;
    l === void 0 && (l = ":");
    const h = i.lng || this.language, f = i.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if ((h == null ? void 0 : h.toLowerCase()) === "cimode")
      return f ? a ? {
        res: `${u}${l}${o}`,
        usedKey: o,
        exactUsedKey: o,
        usedLng: h,
        usedNS: u,
        usedParams: this.getUsedParamsDetails(i)
      } : `${u}${l}${o}` : a ? {
        res: o,
        usedKey: o,
        exactUsedKey: o,
        usedLng: h,
        usedNS: u,
        usedParams: this.getUsedParamsDetails(i)
      } : o;
    const d = this.resolve(e, i);
    let y = d == null ? void 0 : d.res;
    const x = (d == null ? void 0 : d.usedKey) || o, I = (d == null ? void 0 : d.exactUsedKey) || o, T = ["[object Number]", "[object Function]", "[object RegExp]"], _ = i.joinArrays !== void 0 ? i.joinArrays : this.options.joinArrays, N = !this.i18nFormat || this.i18nFormat.handleAsObject, A = i.count !== void 0 && !ue(i.count), L = er.hasDefaultValue(i), E = A ? this.pluralResolver.getSuffix(h, i.count, i) : "", U = i.ordinal && A ? this.pluralResolver.getSuffix(h, i.count, {
      ordinal: !1
    }) : "", B = A && !i.ordinal && i.count === 0, G = B && i[`defaultValue${this.options.pluralSeparator}zero`] || i[`defaultValue${E}`] || i[`defaultValue${U}`] || i.defaultValue;
    let Z = y;
    N && !y && L && (Z = G);
    const W = yr(Z), z = Object.prototype.toString.apply(Z);
    if (N && Z && W && T.indexOf(z) < 0 && !(ue(_) && Array.isArray(Z))) {
      if (!i.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const b = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(x, Z, {
          ...i,
          ns: c
        }) : `key '${o} (${this.language})' returned an object instead of string.`;
        return a ? (d.res = b, d.usedParams = this.getUsedParamsDetails(i), d) : b;
      }
      if (s) {
        const b = Array.isArray(Z), O = b ? [] : {}, H = b ? I : x;
        for (const ee in Z)
          if (Object.prototype.hasOwnProperty.call(Z, ee)) {
            const ie = `${H}${s}${ee}`;
            L && !y ? O[ee] = this.translate(ie, {
              ...i,
              defaultValue: yr(G) ? G[ee] : void 0,
              joinArrays: !1,
              ns: c
            }) : O[ee] = this.translate(ie, {
              ...i,
              joinArrays: !1,
              ns: c
            }), O[ee] === ie && (O[ee] = Z[ee]);
          }
        y = O;
      }
    } else if (N && ue(_) && Array.isArray(y))
      y = y.join(_), y && (y = this.extendTranslation(y, e, i, r));
    else {
      let b = !1, O = !1;
      !this.isValidLookup(y) && L && (b = !0, y = G), this.isValidLookup(y) || (O = !0, y = o);
      const ee = (i.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && O ? void 0 : y, ie = L && G !== y && this.options.updateMissing;
      if (O || b || ie) {
        if (this.logger.log(ie ? "updateKey" : "missingKey", h, u, o, ie ? G : y), s) {
          const Q = this.resolve(o, {
            ...i,
            keySeparator: !1
          });
          Q && Q.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let ge = [];
        const Ce = this.languageUtils.getFallbackCodes(this.options.fallbackLng, i.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && Ce && Ce[0])
          for (let Q = 0; Q < Ce.length; Q++)
            ge.push(Ce[Q]);
        else this.options.saveMissingTo === "all" ? ge = this.languageUtils.toResolveHierarchy(i.lng || this.language) : ge.push(i.lng || this.language);
        const w = (Q, $, C) => {
          var q;
          const re = L && C !== y ? C : ee;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(Q, u, $, re, ie, i) : (q = this.backendConnector) != null && q.saveMissing && this.backendConnector.saveMissing(Q, u, $, re, ie, i), this.emit("missingKey", Q, u, $, y);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && A ? ge.forEach((Q) => {
          const $ = this.pluralResolver.getSuffixes(Q, i);
          B && i[`defaultValue${this.options.pluralSeparator}zero`] && $.indexOf(`${this.options.pluralSeparator}zero`) < 0 && $.push(`${this.options.pluralSeparator}zero`), $.forEach((C) => {
            w([Q], o + C, i[`defaultValue${C}`] || G);
          });
        }) : w(ge, o, G));
      }
      y = this.extendTranslation(y, e, i, d, r), O && y === o && this.options.appendNamespaceToMissingKey && (y = `${u}${l}${o}`), (O || b) && this.options.parseMissingKeyHandler && (y = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${u}${l}${o}` : o, b ? y : void 0, i));
    }
    return a ? (d.res = y, d.usedParams = this.getUsedParamsDetails(i), d) : y;
  }
  extendTranslation(e, n, r, i, a) {
    var c, u;
    if ((c = this.i18nFormat) != null && c.parse)
      e = this.i18nFormat.parse(e, {
        ...this.options.interpolation.defaultVariables,
        ...r
      }, r.lng || this.language || i.usedLng, i.usedNS, i.usedKey, {
        resolved: i
      });
    else if (!r.skipInterpolation) {
      r.interpolation && this.interpolator.init({
        ...r,
        interpolation: {
          ...this.options.interpolation,
          ...r.interpolation
        }
      });
      const l = ue(e) && (((u = r == null ? void 0 : r.interpolation) == null ? void 0 : u.skipOnVariables) !== void 0 ? r.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let h;
      if (l) {
        const d = e.match(this.interpolator.nestingRegexp);
        h = d && d.length;
      }
      let f = r.replace && !ue(r.replace) ? r.replace : r;
      if (this.options.interpolation.defaultVariables && (f = {
        ...this.options.interpolation.defaultVariables,
        ...f
      }), e = this.interpolator.interpolate(e, f, r.lng || this.language || i.usedLng, r), l) {
        const d = e.match(this.interpolator.nestingRegexp), y = d && d.length;
        h < y && (r.nest = !1);
      }
      !r.lng && i && i.res && (r.lng = this.language || i.usedLng), r.nest !== !1 && (e = this.interpolator.nest(e, (...d) => (a == null ? void 0 : a[0]) === d[0] && !r.context ? (this.logger.warn(`It seems you are nesting recursively key: ${d[0]} in key: ${n[0]}`), null) : this.translate(...d, n), r)), r.interpolation && this.interpolator.reset();
    }
    const s = r.postProcess || this.options.postProcess, o = ue(s) ? [s] : s;
    return e != null && (o != null && o.length) && r.applyPostProcessor !== !1 && (e = as.handle(o, e, n, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: {
        ...i,
        usedParams: this.getUsedParamsDetails(r)
      },
      ...r
    } : r, this)), e;
  }
  resolve(e, n = {}) {
    let r, i, a, s, o;
    return ue(e) && (e = [e]), e.forEach((c) => {
      if (this.isValidLookup(r)) return;
      const u = this.extractFromKey(c, n), l = u.key;
      i = l;
      let h = u.namespaces;
      this.options.fallbackNS && (h = h.concat(this.options.fallbackNS));
      const f = n.count !== void 0 && !ue(n.count), d = f && !n.ordinal && n.count === 0, y = n.context !== void 0 && (ue(n.context) || typeof n.context == "number") && n.context !== "", x = n.lngs ? n.lngs : this.languageUtils.toResolveHierarchy(n.lng || this.language, n.fallbackLng);
      h.forEach((I) => {
        var T, _;
        this.isValidLookup(r) || (o = I, !Gi[`${x[0]}-${I}`] && ((T = this.utils) != null && T.hasLoadedNamespace) && !((_ = this.utils) != null && _.hasLoadedNamespace(o)) && (Gi[`${x[0]}-${I}`] = !0, this.logger.warn(`key "${i}" for languages "${x.join(", ")}" won't get resolved as namespace "${o}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), x.forEach((N) => {
          var E;
          if (this.isValidLookup(r)) return;
          s = N;
          const A = [l];
          if ((E = this.i18nFormat) != null && E.addLookupKeys)
            this.i18nFormat.addLookupKeys(A, l, N, I, n);
          else {
            let U;
            f && (U = this.pluralResolver.getSuffix(N, n.count, n));
            const B = `${this.options.pluralSeparator}zero`, G = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (f && (n.ordinal && U.indexOf(G) === 0 && A.push(l + U.replace(G, this.options.pluralSeparator)), A.push(l + U), d && A.push(l + B)), y) {
              const Z = `${l}${this.options.contextSeparator || "_"}${n.context}`;
              A.push(Z), f && (n.ordinal && U.indexOf(G) === 0 && A.push(Z + U.replace(G, this.options.pluralSeparator)), A.push(Z + U), d && A.push(Z + B));
            }
          }
          let L;
          for (; L = A.pop(); )
            this.isValidLookup(r) || (a = L, r = this.getResource(N, I, L, n));
        }));
      });
    }), {
      res: r,
      usedKey: i,
      exactUsedKey: a,
      usedLng: s,
      usedNS: o
    };
  }
  isValidLookup(e) {
    return e !== void 0 && !(!this.options.returnNull && e === null) && !(!this.options.returnEmptyString && e === "");
  }
  getResource(e, n, r, i = {}) {
    var a;
    return (a = this.i18nFormat) != null && a.getResource ? this.i18nFormat.getResource(e, n, r, i) : this.resourceStore.getResource(e, n, r, i);
  }
  getUsedParamsDetails(e = {}) {
    const n = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"], r = e.replace && !ue(e.replace);
    let i = r ? e.replace : e;
    if (r && typeof e.count < "u" && (i.count = e.count), this.options.interpolation.defaultVariables && (i = {
      ...this.options.interpolation.defaultVariables,
      ...i
    }), !r) {
      i = {
        ...i
      };
      for (const a of n)
        delete i[a];
    }
    return i;
  }
  static hasDefaultValue(e) {
    const n = "defaultValue";
    for (const r in e)
      if (Object.prototype.hasOwnProperty.call(e, r) && n === r.substring(0, n.length) && e[r] !== void 0)
        return !0;
    return !1;
  }
}
class Wi {
  constructor(e) {
    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = Rt.create("languageUtils");
  }
  getScriptPartFromCode(e) {
    if (e = vn(e), !e || e.indexOf("-") < 0) return null;
    const n = e.split("-");
    return n.length === 2 || (n.pop(), n[n.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(n.join("-"));
  }
  getLanguagePartFromCode(e) {
    if (e = vn(e), !e || e.indexOf("-") < 0) return e;
    const n = e.split("-");
    return this.formatLanguageCode(n[0]);
  }
  formatLanguageCode(e) {
    if (ue(e) && e.indexOf("-") > -1) {
      let n;
      try {
        n = Intl.getCanonicalLocales(e)[0];
      } catch {
      }
      return n && this.options.lowerCaseLng && (n = n.toLowerCase()), n || (this.options.lowerCaseLng ? e.toLowerCase() : e);
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e;
  }
  isSupportedCode(e) {
    return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1;
  }
  getBestMatchFromCodes(e) {
    if (!e) return null;
    let n;
    return e.forEach((r) => {
      if (n) return;
      const i = this.formatLanguageCode(r);
      (!this.options.supportedLngs || this.isSupportedCode(i)) && (n = i);
    }), !n && this.options.supportedLngs && e.forEach((r) => {
      if (n) return;
      const i = this.getScriptPartFromCode(r);
      if (this.isSupportedCode(i)) return n = i;
      const a = this.getLanguagePartFromCode(r);
      if (this.isSupportedCode(a)) return n = a;
      n = this.options.supportedLngs.find((s) => {
        if (s === a) return s;
        if (!(s.indexOf("-") < 0 && a.indexOf("-") < 0) && (s.indexOf("-") > 0 && a.indexOf("-") < 0 && s.substring(0, s.indexOf("-")) === a || s.indexOf(a) === 0 && a.length > 1))
          return s;
      });
    }), n || (n = this.getFallbackCodes(this.options.fallbackLng)[0]), n;
  }
  getFallbackCodes(e, n) {
    if (!e) return [];
    if (typeof e == "function" && (e = e(n)), ue(e) && (e = [e]), Array.isArray(e)) return e;
    if (!n) return e.default || [];
    let r = e[n];
    return r || (r = e[this.getScriptPartFromCode(n)]), r || (r = e[this.formatLanguageCode(n)]), r || (r = e[this.getLanguagePartFromCode(n)]), r || (r = e.default), r || [];
  }
  toResolveHierarchy(e, n) {
    const r = this.getFallbackCodes((n === !1 ? [] : n) || this.options.fallbackLng || [], e), i = [], a = (s) => {
      s && (this.isSupportedCode(s) ? i.push(s) : this.logger.warn(`rejecting language code not found in supportedLngs: ${s}`));
    };
    return ue(e) && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && a(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && a(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && a(this.getLanguagePartFromCode(e))) : ue(e) && a(this.formatLanguageCode(e)), r.forEach((s) => {
      i.indexOf(s) < 0 && a(this.formatLanguageCode(s));
    }), i;
  }
}
const qi = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
}, Ki = {
  select: (t) => t === 1 ? "one" : "other",
  resolvedOptions: () => ({
    pluralCategories: ["one", "other"]
  })
};
class Al {
  constructor(e, n = {}) {
    this.languageUtils = e, this.options = n, this.logger = Rt.create("pluralResolver"), this.pluralRulesCache = {};
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(e, n = {}) {
    const r = vn(e === "dev" ? "en" : e), i = n.ordinal ? "ordinal" : "cardinal", a = JSON.stringify({
      cleanedCode: r,
      type: i
    });
    if (a in this.pluralRulesCache)
      return this.pluralRulesCache[a];
    let s;
    try {
      s = new Intl.PluralRules(r, {
        type: i
      });
    } catch {
      if (!Intl)
        return this.logger.error("No Intl support, please use an Intl polyfill!"), Ki;
      if (!e.match(/-|_/)) return Ki;
      const c = this.languageUtils.getLanguagePartFromCode(e);
      s = this.getRule(c, n);
    }
    return this.pluralRulesCache[a] = s, s;
  }
  needsPlural(e, n = {}) {
    let r = this.getRule(e, n);
    return r || (r = this.getRule("dev", n)), (r == null ? void 0 : r.resolvedOptions().pluralCategories.length) > 1;
  }
  getPluralFormsOfKey(e, n, r = {}) {
    return this.getSuffixes(e, r).map((i) => `${n}${i}`);
  }
  getSuffixes(e, n = {}) {
    let r = this.getRule(e, n);
    return r || (r = this.getRule("dev", n)), r ? r.resolvedOptions().pluralCategories.sort((i, a) => qi[i] - qi[a]).map((i) => `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${i}`) : [];
  }
  getSuffix(e, n, r = {}) {
    const i = this.getRule(e, r);
    return i ? `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${i.select(n)}` : (this.logger.warn(`no plural rule found for: ${e}`), this.getSuffix("dev", n, r));
  }
}
const Zi = (t, e, n, r = ".", i = !0) => {
  let a = Tl(t, e, n);
  return !a && i && ue(n) && (a = zr(t, n, r), a === void 0 && (a = zr(e, n, r))), a;
}, wr = (t) => t.replace(/\$/g, "$$$$");
class Yi {
  constructor(e = {}) {
    var n;
    this.logger = Rt.create("interpolator"), this.options = e, this.format = ((n = e == null ? void 0 : e.interpolation) == null ? void 0 : n.format) || ((r) => r), this.init(e);
  }
  init(e = {}) {
    e.interpolation || (e.interpolation = {
      escapeValue: !0
    });
    const {
      escape: n,
      escapeValue: r,
      useRawValueToEscape: i,
      prefix: a,
      prefixEscaped: s,
      suffix: o,
      suffixEscaped: c,
      formatSeparator: u,
      unescapeSuffix: l,
      unescapePrefix: h,
      nestingPrefix: f,
      nestingPrefixEscaped: d,
      nestingSuffix: y,
      nestingSuffixEscaped: x,
      nestingOptionsSeparator: I,
      maxReplaces: T,
      alwaysFormat: _
    } = e.interpolation;
    this.escape = n !== void 0 ? n : bl, this.escapeValue = r !== void 0 ? r : !0, this.useRawValueToEscape = i !== void 0 ? i : !1, this.prefix = a ? en(a) : s || "{{", this.suffix = o ? en(o) : c || "}}", this.formatSeparator = u || ",", this.unescapePrefix = l ? "" : h || "-", this.unescapeSuffix = this.unescapePrefix ? "" : l || "", this.nestingPrefix = f ? en(f) : d || en("$t("), this.nestingSuffix = y ? en(y) : x || en(")"), this.nestingOptionsSeparator = I || ",", this.maxReplaces = T || 1e3, this.alwaysFormat = _ !== void 0 ? _ : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const e = (n, r) => (n == null ? void 0 : n.source) === r ? (n.lastIndex = 0, n) : new RegExp(r, "g");
    this.regexp = e(this.regexp, `${this.prefix}(.+?)${this.suffix}`), this.regexpUnescape = e(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`), this.nestingRegexp = e(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
  }
  interpolate(e, n, r, i) {
    var d;
    let a, s, o;
    const c = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}, u = (y) => {
      if (y.indexOf(this.formatSeparator) < 0) {
        const _ = Zi(n, c, y, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(_, void 0, r, {
          ...i,
          ...n,
          interpolationkey: y
        }) : _;
      }
      const x = y.split(this.formatSeparator), I = x.shift().trim(), T = x.join(this.formatSeparator).trim();
      return this.format(Zi(n, c, I, this.options.keySeparator, this.options.ignoreJSONStructure), T, r, {
        ...i,
        ...n,
        interpolationkey: I
      });
    };
    this.resetRegExp();
    const l = (i == null ? void 0 : i.missingInterpolationHandler) || this.options.missingInterpolationHandler, h = ((d = i == null ? void 0 : i.interpolation) == null ? void 0 : d.skipOnVariables) !== void 0 ? i.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (y) => wr(y)
    }, {
      regex: this.regexp,
      safeValue: (y) => this.escapeValue ? wr(this.escape(y)) : wr(y)
    }].forEach((y) => {
      for (o = 0; a = y.regex.exec(e); ) {
        const x = a[1].trim();
        if (s = u(x), s === void 0)
          if (typeof l == "function") {
            const T = l(e, a, i);
            s = ue(T) ? T : "";
          } else if (i && Object.prototype.hasOwnProperty.call(i, x))
            s = "";
          else if (h) {
            s = a[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${x} for interpolating ${e}`), s = "";
        else !ue(s) && !this.useRawValueToEscape && (s = Ui(s));
        const I = y.safeValue(s);
        if (e = e.replace(a[0], I), h ? (y.regex.lastIndex += s.length, y.regex.lastIndex -= a[0].length) : y.regex.lastIndex = 0, o++, o >= this.maxReplaces)
          break;
      }
    }), e;
  }
  nest(e, n, r = {}) {
    let i, a, s;
    const o = (c, u) => {
      const l = this.nestingOptionsSeparator;
      if (c.indexOf(l) < 0) return c;
      const h = c.split(new RegExp(`${l}[ ]*{`));
      let f = `{${h[1]}`;
      c = h[0], f = this.interpolate(f, s);
      const d = f.match(/'/g), y = f.match(/"/g);
      (((d == null ? void 0 : d.length) ?? 0) % 2 === 0 && !y || y.length % 2 !== 0) && (f = f.replace(/'/g, '"'));
      try {
        s = JSON.parse(f), u && (s = {
          ...u,
          ...s
        });
      } catch (x) {
        return this.logger.warn(`failed parsing options string in nesting for key ${c}`, x), `${c}${l}${f}`;
      }
      return s.defaultValue && s.defaultValue.indexOf(this.prefix) > -1 && delete s.defaultValue, c;
    };
    for (; i = this.nestingRegexp.exec(e); ) {
      let c = [];
      s = {
        ...r
      }, s = s.replace && !ue(s.replace) ? s.replace : s, s.applyPostProcessor = !1, delete s.defaultValue;
      const u = /{.*}/.test(i[1]) ? i[1].lastIndexOf("}") + 1 : i[1].indexOf(this.formatSeparator);
      if (u !== -1 && (c = i[1].slice(u).split(this.formatSeparator).map((l) => l.trim()).filter(Boolean), i[1] = i[1].slice(0, u)), a = n(o.call(this, i[1].trim(), s), s), a && i[0] === e && !ue(a)) return a;
      ue(a) || (a = Ui(a)), a || (this.logger.warn(`missed to resolve ${i[1]} for nesting ${e}`), a = ""), c.length && (a = c.reduce((l, h) => this.format(l, h, r.lng, {
        ...r,
        interpolationkey: i[1].trim()
      }), a.trim())), e = e.replace(i[0], a), this.regexp.lastIndex = 0;
    }
    return e;
  }
}
const Ol = (t) => {
  let e = t.toLowerCase().trim();
  const n = {};
  if (t.indexOf("(") > -1) {
    const r = t.split("(");
    e = r[0].toLowerCase().trim();
    const i = r[1].substring(0, r[1].length - 1);
    e === "currency" && i.indexOf(":") < 0 ? n.currency || (n.currency = i.trim()) : e === "relativetime" && i.indexOf(":") < 0 ? n.range || (n.range = i.trim()) : i.split(";").forEach((s) => {
      if (s) {
        const [o, ...c] = s.split(":"), u = c.join(":").trim().replace(/^'+|'+$/g, ""), l = o.trim();
        n[l] || (n[l] = u), u === "false" && (n[l] = !1), u === "true" && (n[l] = !0), isNaN(u) || (n[l] = parseInt(u, 10));
      }
    });
  }
  return {
    formatName: e,
    formatOptions: n
  };
}, Xi = (t) => {
  const e = {};
  return (n, r, i) => {
    let a = i;
    i && i.interpolationkey && i.formatParams && i.formatParams[i.interpolationkey] && i[i.interpolationkey] && (a = {
      ...a,
      [i.interpolationkey]: void 0
    });
    const s = r + JSON.stringify(a);
    let o = e[s];
    return o || (o = t(vn(r), i), e[s] = o), o(n);
  };
}, Ll = (t) => (e, n, r) => t(vn(n), r)(e);
class Pl {
  constructor(e = {}) {
    this.logger = Rt.create("formatter"), this.options = e, this.init(e);
  }
  init(e, n = {
    interpolation: {}
  }) {
    this.formatSeparator = n.interpolation.formatSeparator || ",";
    const r = n.cacheInBuiltFormats ? Xi : Ll;
    this.formats = {
      number: r((i, a) => {
        const s = new Intl.NumberFormat(i, {
          ...a
        });
        return (o) => s.format(o);
      }),
      currency: r((i, a) => {
        const s = new Intl.NumberFormat(i, {
          ...a,
          style: "currency"
        });
        return (o) => s.format(o);
      }),
      datetime: r((i, a) => {
        const s = new Intl.DateTimeFormat(i, {
          ...a
        });
        return (o) => s.format(o);
      }),
      relativetime: r((i, a) => {
        const s = new Intl.RelativeTimeFormat(i, {
          ...a
        });
        return (o) => s.format(o, a.range || "day");
      }),
      list: r((i, a) => {
        const s = new Intl.ListFormat(i, {
          ...a
        });
        return (o) => s.format(o);
      })
    };
  }
  add(e, n) {
    this.formats[e.toLowerCase().trim()] = n;
  }
  addCached(e, n) {
    this.formats[e.toLowerCase().trim()] = Xi(n);
  }
  format(e, n, r, i = {}) {
    const a = n.split(this.formatSeparator);
    if (a.length > 1 && a[0].indexOf("(") > 1 && a[0].indexOf(")") < 0 && a.find((o) => o.indexOf(")") > -1)) {
      const o = a.findIndex((c) => c.indexOf(")") > -1);
      a[0] = [a[0], ...a.splice(1, o)].join(this.formatSeparator);
    }
    return a.reduce((o, c) => {
      var h;
      const {
        formatName: u,
        formatOptions: l
      } = Ol(c);
      if (this.formats[u]) {
        let f = o;
        try {
          const d = ((h = i == null ? void 0 : i.formatParams) == null ? void 0 : h[i.interpolationkey]) || {}, y = d.locale || d.lng || i.locale || i.lng || r;
          f = this.formats[u](o, y, {
            ...l,
            ...i,
            ...d
          });
        } catch (d) {
          this.logger.warn(d);
        }
        return f;
      } else
        this.logger.warn(`there was no format function for ${u}`);
      return o;
    }, e);
  }
}
const Dl = (t, e) => {
  t.pending[e] !== void 0 && (delete t.pending[e], t.pendingCount--);
};
class Fl extends ir {
  constructor(e, n, r, i = {}) {
    var a, s;
    super(), this.backend = e, this.store = n, this.services = r, this.languageUtils = r.languageUtils, this.options = i, this.logger = Rt.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = i.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = i.maxRetries >= 0 ? i.maxRetries : 5, this.retryTimeout = i.retryTimeout >= 1 ? i.retryTimeout : 350, this.state = {}, this.queue = [], (s = (a = this.backend) == null ? void 0 : a.init) == null || s.call(a, r, i.backend, i);
  }
  queueLoad(e, n, r, i) {
    const a = {}, s = {}, o = {}, c = {};
    return e.forEach((u) => {
      let l = !0;
      n.forEach((h) => {
        const f = `${u}|${h}`;
        !r.reload && this.store.hasResourceBundle(u, h) ? this.state[f] = 2 : this.state[f] < 0 || (this.state[f] === 1 ? s[f] === void 0 && (s[f] = !0) : (this.state[f] = 1, l = !1, s[f] === void 0 && (s[f] = !0), a[f] === void 0 && (a[f] = !0), c[h] === void 0 && (c[h] = !0)));
      }), l || (o[u] = !0);
    }), (Object.keys(a).length || Object.keys(s).length) && this.queue.push({
      pending: s,
      pendingCount: Object.keys(s).length,
      loaded: {},
      errors: [],
      callback: i
    }), {
      toLoad: Object.keys(a),
      pending: Object.keys(s),
      toLoadLanguages: Object.keys(o),
      toLoadNamespaces: Object.keys(c)
    };
  }
  loaded(e, n, r) {
    const i = e.split("|"), a = i[0], s = i[1];
    n && this.emit("failedLoading", a, s, n), !n && r && this.store.addResourceBundle(a, s, r, void 0, void 0, {
      skipCopy: !0
    }), this.state[e] = n ? -1 : 2, n && r && (this.state[e] = 0);
    const o = {};
    this.queue.forEach((c) => {
      kl(c.loaded, [a], s), Dl(c, e), n && c.errors.push(n), c.pendingCount === 0 && !c.done && (Object.keys(c.loaded).forEach((u) => {
        o[u] || (o[u] = {});
        const l = c.loaded[u];
        l.length && l.forEach((h) => {
          o[u][h] === void 0 && (o[u][h] = !0);
        });
      }), c.done = !0, c.errors.length ? c.callback(c.errors) : c.callback());
    }), this.emit("loaded", o), this.queue = this.queue.filter((c) => !c.done);
  }
  read(e, n, r, i = 0, a = this.retryTimeout, s) {
    if (!e.length) return s(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: e,
        ns: n,
        fcName: r,
        tried: i,
        wait: a,
        callback: s
      });
      return;
    }
    this.readingCalls++;
    const o = (u, l) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const h = this.waitingReads.shift();
        this.read(h.lng, h.ns, h.fcName, h.tried, h.wait, h.callback);
      }
      if (u && l && i < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, e, n, r, i + 1, a * 2, s);
        }, a);
        return;
      }
      s(u, l);
    }, c = this.backend[r].bind(this.backend);
    if (c.length === 2) {
      try {
        const u = c(e, n);
        u && typeof u.then == "function" ? u.then((l) => o(null, l)).catch(o) : o(null, u);
      } catch (u) {
        o(u);
      }
      return;
    }
    return c(e, n, o);
  }
  prepareLoading(e, n, r = {}, i) {
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), i && i();
    ue(e) && (e = this.languageUtils.toResolveHierarchy(e)), ue(n) && (n = [n]);
    const a = this.queueLoad(e, n, r, i);
    if (!a.toLoad.length)
      return a.pending.length || i(), null;
    a.toLoad.forEach((s) => {
      this.loadOne(s);
    });
  }
  load(e, n, r) {
    this.prepareLoading(e, n, {}, r);
  }
  reload(e, n, r) {
    this.prepareLoading(e, n, {
      reload: !0
    }, r);
  }
  loadOne(e, n = "") {
    const r = e.split("|"), i = r[0], a = r[1];
    this.read(i, a, "read", void 0, void 0, (s, o) => {
      s && this.logger.warn(`${n}loading namespace ${a} for language ${i} failed`, s), !s && o && this.logger.log(`${n}loaded namespace ${a} for language ${i}`, o), this.loaded(e, s, o);
    });
  }
  saveMissing(e, n, r, i, a, s = {}, o = () => {
  }) {
    var c, u, l, h, f;
    if ((u = (c = this.services) == null ? void 0 : c.utils) != null && u.hasLoadedNamespace && !((h = (l = this.services) == null ? void 0 : l.utils) != null && h.hasLoadedNamespace(n))) {
      this.logger.warn(`did not save key "${r}" as the namespace "${n}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(r == null || r === "")) {
      if ((f = this.backend) != null && f.create) {
        const d = {
          ...s,
          isUpdate: a
        }, y = this.backend.create.bind(this.backend);
        if (y.length < 6)
          try {
            let x;
            y.length === 5 ? x = y(e, n, r, i, d) : x = y(e, n, r, i), x && typeof x.then == "function" ? x.then((I) => o(null, I)).catch(o) : o(null, x);
          } catch (x) {
            o(x);
          }
        else
          y(e, n, r, i, o, d);
      }
      !e || !e[0] || this.store.addResource(e[0], n, r, i);
    }
  }
}
const Sr = () => ({
  debug: !1,
  initAsync: !0,
  ns: ["translation"],
  defaultNS: ["translation"],
  fallbackLng: ["dev"],
  fallbackNS: !1,
  supportedLngs: !1,
  nonExplicitSupportedLngs: !1,
  load: "all",
  preload: !1,
  simplifyPluralSuffix: !0,
  keySeparator: ".",
  nsSeparator: ":",
  pluralSeparator: "_",
  contextSeparator: "_",
  partialBundledLanguages: !1,
  saveMissing: !1,
  updateMissing: !1,
  saveMissingTo: "fallback",
  saveMissingPlurals: !0,
  missingKeyHandler: !1,
  missingInterpolationHandler: !1,
  postProcess: !1,
  postProcessPassResolved: !1,
  returnNull: !1,
  returnEmptyString: !0,
  returnObjects: !1,
  joinArrays: !1,
  returnedObjectHandler: !1,
  parseMissingKeyHandler: !1,
  appendNamespaceToMissingKey: !1,
  appendNamespaceToCIMode: !1,
  overloadTranslationOptionHandler: (t) => {
    let e = {};
    if (typeof t[1] == "object" && (e = t[1]), ue(t[1]) && (e.defaultValue = t[1]), ue(t[2]) && (e.tDescription = t[2]), typeof t[2] == "object" || typeof t[3] == "object") {
      const n = t[3] || t[2];
      Object.keys(n).forEach((r) => {
        e[r] = n[r];
      });
    }
    return e;
  },
  interpolation: {
    escapeValue: !0,
    format: (t) => t,
    prefix: "{{",
    suffix: "}}",
    formatSeparator: ",",
    unescapePrefix: "-",
    nestingPrefix: "$t(",
    nestingSuffix: ")",
    nestingOptionsSeparator: ",",
    maxReplaces: 1e3,
    skipOnVariables: !0
  },
  cacheInBuiltFormats: !0
}), Ji = (t) => {
  var e, n;
  return ue(t.ns) && (t.ns = [t.ns]), ue(t.fallbackLng) && (t.fallbackLng = [t.fallbackLng]), ue(t.fallbackNS) && (t.fallbackNS = [t.fallbackNS]), ((n = (e = t.supportedLngs) == null ? void 0 : e.indexOf) == null ? void 0 : n.call(e, "cimode")) < 0 && (t.supportedLngs = t.supportedLngs.concat(["cimode"])), typeof t.initImmediate == "boolean" && (t.initAsync = t.initImmediate), t;
}, Vn = () => {
}, Hl = (t) => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(t)).forEach((n) => {
    typeof t[n] == "function" && (t[n] = t[n].bind(t));
  });
};
class kn extends ir {
  constructor(e = {}, n) {
    if (super(), this.options = Ji(e), this.services = {}, this.logger = Rt, this.modules = {
      external: []
    }, Hl(this), n && !this.isInitialized && !e.isClone) {
      if (!this.options.initAsync)
        return this.init(e, n), this;
      setTimeout(() => {
        this.init(e, n);
      }, 0);
    }
  }
  init(e = {}, n) {
    this.isInitializing = !0, typeof e == "function" && (n = e, e = {}), e.defaultNS == null && e.ns && (ue(e.ns) ? e.defaultNS = e.ns : e.ns.indexOf("translation") < 0 && (e.defaultNS = e.ns[0]));
    const r = Sr();
    this.options = {
      ...r,
      ...this.options,
      ...Ji(e)
    }, this.options.interpolation = {
      ...r.interpolation,
      ...this.options.interpolation
    }, e.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = e.keySeparator), e.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = e.nsSeparator), typeof this.options.overloadTranslationOptionHandler != "function" && (this.options.overloadTranslationOptionHandler = r.overloadTranslationOptionHandler);
    const i = (u) => u ? typeof u == "function" ? new u() : u : null;
    if (!this.options.isClone) {
      this.modules.logger ? Rt.init(i(this.modules.logger), this.options) : Rt.init(null, this.options);
      let u;
      this.modules.formatter ? u = this.modules.formatter : u = Pl;
      const l = new Wi(this.options);
      this.store = new ji(this.options.resources, this.options);
      const h = this.services;
      h.logger = Rt, h.resourceStore = this.store, h.languageUtils = l, h.pluralResolver = new Al(l, {
        prepend: this.options.pluralSeparator,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), this.options.interpolation.format && this.options.interpolation.format !== r.interpolation.format && this.logger.deprecate("init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting"), u && (!this.options.interpolation.format || this.options.interpolation.format === r.interpolation.format) && (h.formatter = i(u), h.formatter.init && h.formatter.init(h, this.options), this.options.interpolation.format = h.formatter.format.bind(h.formatter)), h.interpolator = new Yi(this.options), h.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, h.backendConnector = new Fl(i(this.modules.backend), h.resourceStore, h, this.options), h.backendConnector.on("*", (d, ...y) => {
        this.emit(d, ...y);
      }), this.modules.languageDetector && (h.languageDetector = i(this.modules.languageDetector), h.languageDetector.init && h.languageDetector.init(h, this.options.detection, this.options)), this.modules.i18nFormat && (h.i18nFormat = i(this.modules.i18nFormat), h.i18nFormat.init && h.i18nFormat.init(this)), this.translator = new er(this.services, this.options), this.translator.on("*", (d, ...y) => {
        this.emit(d, ...y);
      }), this.modules.external.forEach((d) => {
        d.init && d.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, n || (n = Vn), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const u = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      u.length > 0 && u[0] !== "dev" && (this.options.lng = u[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((u) => {
      this[u] = (...l) => this.store[u](...l);
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((u) => {
      this[u] = (...l) => (this.store[u](...l), this);
    });
    const o = yn(), c = () => {
      const u = (l, h) => {
        this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), o.resolve(h), n(l, h);
      };
      if (this.languages && !this.isInitialized) return u(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, u);
    };
    return this.options.resources || !this.options.initAsync ? c() : setTimeout(c, 0), o;
  }
  loadResources(e, n = Vn) {
    var a, s;
    let r = n;
    const i = ue(e) ? e : this.language;
    if (typeof e == "function" && (r = e), !this.options.resources || this.options.partialBundledLanguages) {
      if ((i == null ? void 0 : i.toLowerCase()) === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return r();
      const o = [], c = (u) => {
        if (!u || u === "cimode") return;
        this.services.languageUtils.toResolveHierarchy(u).forEach((h) => {
          h !== "cimode" && o.indexOf(h) < 0 && o.push(h);
        });
      };
      i ? c(i) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((l) => c(l)), (s = (a = this.options.preload) == null ? void 0 : a.forEach) == null || s.call(a, (u) => c(u)), this.services.backendConnector.load(o, this.options.ns, (u) => {
        !u && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), r(u);
      });
    } else
      r(null);
  }
  reloadResources(e, n, r) {
    const i = yn();
    return typeof e == "function" && (r = e, e = void 0), typeof n == "function" && (r = n, n = void 0), e || (e = this.languages), n || (n = this.options.ns), r || (r = Vn), this.services.backendConnector.reload(e, n, (a) => {
      i.resolve(), r(a);
    }), i;
  }
  use(e) {
    if (!e) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!e.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return e.type === "backend" && (this.modules.backend = e), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && (this.modules.languageDetector = e), e.type === "i18nFormat" && (this.modules.i18nFormat = e), e.type === "postProcessor" && as.addPostProcessor(e), e.type === "formatter" && (this.modules.formatter = e), e.type === "3rdParty" && this.modules.external.push(e), this;
  }
  setResolvedLanguage(e) {
    if (!(!e || !this.languages) && !(["cimode", "dev"].indexOf(e) > -1)) {
      for (let n = 0; n < this.languages.length; n++) {
        const r = this.languages[n];
        if (!(["cimode", "dev"].indexOf(r) > -1) && this.store.hasLanguageSomeTranslations(r)) {
          this.resolvedLanguage = r;
          break;
        }
      }
      !this.resolvedLanguage && this.languages.indexOf(e) < 0 && this.store.hasLanguageSomeTranslations(e) && (this.resolvedLanguage = e, this.languages.unshift(e));
    }
  }
  changeLanguage(e, n) {
    this.isLanguageChangingTo = e;
    const r = yn();
    this.emit("languageChanging", e);
    const i = (o) => {
      this.language = o, this.languages = this.services.languageUtils.toResolveHierarchy(o), this.resolvedLanguage = void 0, this.setResolvedLanguage(o);
    }, a = (o, c) => {
      c ? this.isLanguageChangingTo === e && (i(c), this.translator.changeLanguage(c), this.isLanguageChangingTo = void 0, this.emit("languageChanged", c), this.logger.log("languageChanged", c)) : this.isLanguageChangingTo = void 0, r.resolve((...u) => this.t(...u)), n && n(o, (...u) => this.t(...u));
    }, s = (o) => {
      var l, h;
      !e && !o && this.services.languageDetector && (o = []);
      const c = ue(o) ? o : o && o[0], u = this.store.hasLanguageSomeTranslations(c) ? c : this.services.languageUtils.getBestMatchFromCodes(ue(o) ? [o] : o);
      u && (this.language || i(u), this.translator.language || this.translator.changeLanguage(u), (h = (l = this.services.languageDetector) == null ? void 0 : l.cacheUserLanguage) == null || h.call(l, u)), this.loadResources(u, (f) => {
        a(f, u);
      });
    };
    return !e && this.services.languageDetector && !this.services.languageDetector.async ? s(this.services.languageDetector.detect()) : !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(s) : this.services.languageDetector.detect(s) : s(e), r;
  }
  getFixedT(e, n, r) {
    const i = (a, s, ...o) => {
      let c;
      typeof s != "object" ? c = this.options.overloadTranslationOptionHandler([a, s].concat(o)) : c = {
        ...s
      }, c.lng = c.lng || i.lng, c.lngs = c.lngs || i.lngs, c.ns = c.ns || i.ns, c.keyPrefix !== "" && (c.keyPrefix = c.keyPrefix || r || i.keyPrefix);
      const u = this.options.keySeparator || ".";
      let l;
      return c.keyPrefix && Array.isArray(a) ? l = a.map((h) => (typeof h == "function" && (h = Ur(h, {
        ...this.options,
        ...s
      })), `${c.keyPrefix}${u}${h}`)) : (typeof a == "function" && (a = Ur(a, {
        ...this.options,
        ...s
      })), l = c.keyPrefix ? `${c.keyPrefix}${u}${a}` : a), this.t(l, c);
    };
    return ue(e) ? i.lng = e : i.lngs = e, i.ns = n, i.keyPrefix = r, i;
  }
  t(...e) {
    var n;
    return (n = this.translator) == null ? void 0 : n.translate(...e);
  }
  exists(...e) {
    var n;
    return (n = this.translator) == null ? void 0 : n.exists(...e);
  }
  setDefaultNamespace(e) {
    this.options.defaultNS = e;
  }
  hasLoadedNamespace(e, n = {}) {
    if (!this.isInitialized)
      return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
    if (!this.languages || !this.languages.length)
      return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
    const r = n.lng || this.resolvedLanguage || this.languages[0], i = this.options ? this.options.fallbackLng : !1, a = this.languages[this.languages.length - 1];
    if (r.toLowerCase() === "cimode") return !0;
    const s = (o, c) => {
      const u = this.services.backendConnector.state[`${o}|${c}`];
      return u === -1 || u === 0 || u === 2;
    };
    if (n.precheck) {
      const o = n.precheck(this, s);
      if (o !== void 0) return o;
    }
    return !!(this.hasResourceBundle(r, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || s(r, e) && (!i || s(a, e)));
  }
  loadNamespaces(e, n) {
    const r = yn();
    return this.options.ns ? (ue(e) && (e = [e]), e.forEach((i) => {
      this.options.ns.indexOf(i) < 0 && this.options.ns.push(i);
    }), this.loadResources((i) => {
      r.resolve(), n && n(i);
    }), r) : (n && n(), Promise.resolve());
  }
  loadLanguages(e, n) {
    const r = yn();
    ue(e) && (e = [e]);
    const i = this.options.preload || [], a = e.filter((s) => i.indexOf(s) < 0 && this.services.languageUtils.isSupportedCode(s));
    return a.length ? (this.options.preload = i.concat(a), this.loadResources((s) => {
      r.resolve(), n && n(s);
    }), r) : (n && n(), Promise.resolve());
  }
  dir(e) {
    var i, a;
    if (e || (e = this.resolvedLanguage || (((i = this.languages) == null ? void 0 : i.length) > 0 ? this.languages[0] : this.language)), !e) return "rtl";
    try {
      const s = new Intl.Locale(e);
      if (s && s.getTextInfo) {
        const o = s.getTextInfo();
        if (o && o.direction) return o.direction;
      }
    } catch {
    }
    const n = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], r = ((a = this.services) == null ? void 0 : a.languageUtils) || new Wi(Sr());
    return e.toLowerCase().indexOf("-latn") > 1 ? "ltr" : n.indexOf(r.getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance(e = {}, n) {
    const r = new kn(e, n);
    return r.createInstance = kn.createInstance, r;
  }
  cloneInstance(e = {}, n = Vn) {
    const r = e.forkResourceStore;
    r && delete e.forkResourceStore;
    const i = {
      ...this.options,
      ...e,
      isClone: !0
    }, a = new kn(i);
    if ((e.debug !== void 0 || e.prefix !== void 0) && (a.logger = a.logger.clone(e)), ["store", "services", "language"].forEach((o) => {
      a[o] = this[o];
    }), a.services = {
      ...this.services
    }, a.services.utils = {
      hasLoadedNamespace: a.hasLoadedNamespace.bind(a)
    }, r) {
      const o = Object.keys(this.store.data).reduce((c, u) => (c[u] = {
        ...this.store.data[u]
      }, c[u] = Object.keys(c[u]).reduce((l, h) => (l[h] = {
        ...c[u][h]
      }, l), c[u]), c), {});
      a.store = new ji(o, i), a.services.resourceStore = a.store;
    }
    if (e.interpolation) {
      const c = {
        ...Sr().interpolation,
        ...this.options.interpolation,
        ...e.interpolation
      }, u = {
        ...i,
        interpolation: c
      };
      a.services.interpolator = new Yi(u);
    }
    return a.translator = new er(a.services, i), a.translator.on("*", (o, ...c) => {
      a.emit(o, ...c);
    }), a.init(i, n), a.translator.options = i, a.translator.backendConnector.services.utils = {
      hasLoadedNamespace: a.hasLoadedNamespace.bind(a)
    }, a;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const nt = kn.createInstance();
nt.createInstance;
nt.dir;
nt.init;
nt.loadResources;
nt.reloadResources;
nt.use;
nt.changeLanguage;
nt.getFixedT;
nt.t;
nt.exists;
nt.setDefaultNamespace;
nt.hasLoadedNamespace;
nt.loadNamespaces;
nt.loadLanguages;
var tr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function si(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
const zl = (t, e, n, r) => {
  var a, s, o, c;
  const i = [n, {
    code: e,
    ...r || {}
  }];
  if ((s = (a = t == null ? void 0 : t.services) == null ? void 0 : a.logger) != null && s.forward)
    return t.services.logger.forward(i, "warn", "react-i18next::", !0);
  Zt(i[0]) && (i[0] = `react-i18next:: ${i[0]}`), (c = (o = t == null ? void 0 : t.services) == null ? void 0 : o.logger) != null && c.warn ? t.services.logger.warn(...i) : console != null && console.warn && console.warn(...i);
}, Qi = {}, os = (t, e, n, r) => {
  Zt(n) && Qi[n] || (Zt(n) && (Qi[n] = /* @__PURE__ */ new Date()), zl(t, e, n, r));
}, ls = (t, e) => () => {
  if (t.isInitialized)
    e();
  else {
    const n = () => {
      setTimeout(() => {
        t.off("initialized", n);
      }, 0), e();
    };
    t.on("initialized", n);
  }
}, Br = (t, e, n) => {
  t.loadNamespaces(e, ls(t, n));
}, ea = (t, e, n, r) => {
  if (Zt(n) && (n = [n]), t.options.preload && t.options.preload.indexOf(e) > -1) return Br(t, n, r);
  n.forEach((i) => {
    t.options.ns.indexOf(i) < 0 && t.options.ns.push(i);
  }), t.loadLanguages(e, ls(t, r));
}, Ul = (t, e, n = {}) => !e.languages || !e.languages.length ? (os(e, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
  languages: e.languages
}), !0) : e.hasLoadedNamespace(t, {
  lng: n.lng,
  precheck: (r, i) => {
    if (n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && r.services.backendConnector.backend && r.isLanguageChangingTo && !i(r.isLanguageChangingTo, t)) return !1;
  }
}), Zt = (t) => typeof t == "string", Bl = (t) => typeof t == "object" && t !== null, $l = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, Vl = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
}, jl = (t) => Vl[t], Gl = (t) => t.replace($l, jl);
let $r = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: Gl,
  transDefaultProps: void 0
};
const Wl = (t = {}) => {
  $r = {
    ...$r,
    ...t
  };
}, ql = () => $r;
let cs;
const Kl = (t) => {
  cs = t;
}, Zl = () => cs, Yl = {
  type: "3rdParty",
  init(t) {
    Wl(t.options.react), Kl(t);
  }
}, Xl = ni();
class Jl {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(e) {
    e.forEach((n) => {
      this.usedNamespaces[n] || (this.usedNamespaces[n] = !0);
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
var us = { exports: {} }, hs = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var on = wt;
function Ql(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var ec = typeof Object.is == "function" ? Object.is : Ql, tc = on.useState, nc = on.useEffect, rc = on.useLayoutEffect, ic = on.useDebugValue;
function ac(t, e) {
  var n = e(), r = tc({ inst: { value: n, getSnapshot: e } }), i = r[0].inst, a = r[1];
  return rc(
    function() {
      i.value = n, i.getSnapshot = e, xr(i) && a({ inst: i });
    },
    [t, n, e]
  ), nc(
    function() {
      return xr(i) && a({ inst: i }), t(function() {
        xr(i) && a({ inst: i });
      });
    },
    [t]
  ), ic(n), n;
}
function xr(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !ec(t, n);
  } catch {
    return !0;
  }
}
function sc(t, e) {
  return e();
}
var oc = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? sc : ac;
hs.useSyncExternalStore = on.useSyncExternalStore !== void 0 ? on.useSyncExternalStore : oc;
us.exports = hs;
var lc = us.exports;
const cc = (t, e) => Zt(e) ? e : Bl(e) && Zt(e.defaultValue) ? e.defaultValue : Array.isArray(t) ? t[t.length - 1] : t, uc = {
  t: cc,
  ready: !1
}, hc = () => () => {
}, dc = (t, e = {}) => {
  var G, Z, W;
  const {
    i18n: n
  } = e, {
    i18n: r,
    defaultNS: i
  } = ri(Xl) || {}, a = n || r || Zl();
  a && !a.reportNamespaces && (a.reportNamespaces = new Jl()), a || os(a, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
  const s = He(() => {
    var z;
    return {
      ...ql(),
      ...(z = a == null ? void 0 : a.options) == null ? void 0 : z.react,
      ...e
    };
  }, [a, e]), {
    useSuspense: o,
    keyPrefix: c
  } = s, u = i || ((G = a == null ? void 0 : a.options) == null ? void 0 : G.defaultNS), l = Zt(u) ? [u] : u || ["translation"], h = He(() => l, l);
  (W = (Z = a == null ? void 0 : a.reportNamespaces) == null ? void 0 : Z.addUsedNamespaces) == null || W.call(Z, h);
  const f = pe(0), d = oe((z) => {
    if (!a) return hc;
    const {
      bindI18n: b,
      bindI18nStore: O
    } = s, H = () => {
      f.current += 1, z();
    };
    return b && a.on(b, H), O && a.store.on(O, H), () => {
      b && b.split(" ").forEach((ee) => a.off(ee, H)), O && O.split(" ").forEach((ee) => a.store.off(ee, H));
    };
  }, [a, s]), y = pe(), x = oe(() => {
    if (!a)
      return uc;
    const z = !!(a.isInitialized || a.initializedStoreOnce) && h.every((ge) => Ul(ge, a, s)), b = e.lng || a.language, O = f.current, H = y.current;
    if (H && H.ready === z && H.lng === b && H.keyPrefix === c && H.revision === O)
      return H;
    const ie = {
      t: a.getFixedT(b, s.nsMode === "fallback" ? h : h[0], c),
      ready: z,
      lng: b,
      keyPrefix: c,
      revision: O
    };
    return y.current = ie, ie;
  }, [a, h, c, s, e.lng]), [I, T] = xe(0), {
    t: _,
    ready: N
  } = lc.useSyncExternalStore(d, x, x);
  Te(() => {
    if (a && !N && !o) {
      const z = () => T((b) => b + 1);
      e.lng ? ea(a, e.lng, h, z) : Br(a, h, z);
    }
  }, [a, e.lng, h, N, o, I]);
  const A = a || {}, L = pe(null), E = pe(), U = (z) => {
    const b = Object.getOwnPropertyDescriptors(z);
    b.__original && delete b.__original;
    const O = Object.create(Object.getPrototypeOf(z), b);
    if (!Object.prototype.hasOwnProperty.call(O, "__original"))
      try {
        Object.defineProperty(O, "__original", {
          value: z,
          writable: !1,
          enumerable: !1,
          configurable: !1
        });
      } catch {
      }
    return O;
  }, B = He(() => {
    const z = A, b = z == null ? void 0 : z.language;
    let O = z;
    z && (L.current && L.current.__original === z ? E.current !== b ? (O = U(z), L.current = O, E.current = b) : O = L.current : (O = U(z), L.current = O, E.current = b));
    const H = [_, O, N];
    return H.t = _, H.i18n = O, H.ready = N, H;
  }, [_, A, N, A.resolvedLanguage, A.language, A.languages]);
  if (a && o && !N)
    throw new Promise((z) => {
      const b = () => z();
      e.lng ? ea(a, e.lng, h, b) : Br(a, h, b);
    });
  return B;
};
async function ds({
  chatServerUrl: t,
  chatServerKey: e,
  mpAuthToken: n,
  locale: r
}) {
  const a = `${t.replace(/\/$/, "").replace(/^ws(s)?:/, "http$1:")}/api/v1/translations/${r}`, s = await fetch(a, {
    method: "GET",
    headers: {
      "x-oddle-chat-server-key": e,
      "x-oddle-mp-auth-token": n,
      "Content-Type": "application/json"
    }
  });
  if (!s.ok) {
    if (s.status === 404 && r !== "en")
      return console.warn(`Translations not found for locale '${r}', falling back to 'en'`), ds({
        chatServerUrl: t,
        chatServerKey: e,
        mpAuthToken: n,
        locale: "en"
      });
    throw new Error(`Failed to fetch translations: ${s.status} ${s.statusText}`);
  }
  const o = await s.json();
  if (!o.success || !o.translations)
    throw new Error("Invalid translation response: missing translations data");
  return o.translations;
}
const pc = () => {
  const t = nt.createInstance();
  return t.use(Yl), t;
}, ps = ni(null), fc = {
  chat: {
    connection: {
      reconnecting: "Reconnecting..."
    },
    errors: {
      authentication: "Authentication error. Please refresh the page and try again.",
      connection: "Connection error. Please check your internet connection and try again.",
      retry: "Retry",
      timeout: "Request timed out. Please try again.",
      unexpected: "An unexpected error occurred. Please try again."
    },
    fileUpload: {
      maxFilesExceeded: "Maximum {{maxFiles}} files allowed",
      sizeLimitExceeded: "File size must be less than {{maxSize}}MB",
      typeNotAllowed: "Only image files are allowed"
    },
    input: {
      placeholder: "What would you like to know?"
    },
    tools: {
      completed: "Completed",
      executing: "Executing...",
      failed: "Failed"
    },
    reasoning: {
      thinking: "Thinking...",
      thought: "Thought",
      completed: "Completed",
      error: "Error",
      processing: "Processing",
      duration: {
        for: "for",
        second: "second",
        seconds: "seconds"
      }
    }
  }
};
function gc({
  children: t,
  locale: e = "en",
  chatServerUrl: n,
  chatServerKey: r,
  mpAuthToken: i,
  fallback: a
}) {
  const [s] = xe(() => pc()), [o, c] = xe(!0), [u, l] = xe(!1), [h, f] = xe(null), d = pe(!1), y = oe(
    async (T, _) => {
      s.isInitialized ? (s.addResourceBundle(
        _,
        "translation",
        T,
        !0,
        !0
      ), await s.changeLanguage(_)) : await s.init({
        lng: _,
        fallbackLng: "en",
        resources: {
          [_]: {
            translation: T
          }
        },
        interpolation: {
          escapeValue: !1
          // React already escapes values
        },
        react: {
          useSuspense: !1
        }
      });
    },
    [s]
  );
  Te(() => {
    if (d.current)
      return;
    let T = !0;
    return (async () => {
      c(!0), f(null);
      try {
        const N = await ds({
          chatServerUrl: n,
          chatServerKey: r,
          mpAuthToken: i,
          locale: e
        });
        if (!T) return;
        await y(N, e), d.current = !0, l(!0);
      } catch (N) {
        if (!T) return;
        console.error("Failed to load translations:", N), f(
          N instanceof Error ? N : new Error("Failed to load translations")
        ), await y(fc, "en"), d.current = !0, l(!0);
      } finally {
        T && c(!1);
      }
    })(), () => {
      T = !1;
    };
  }, [e, n, r, i, y]);
  const x = oe(
    (T, _) => s.isInitialized && s.t(T, _) || T,
    [s]
  ), I = He(
    () => ({
      t: x,
      locale: e,
      isLoading: o,
      isReady: u,
      error: h
    }),
    [x, e, o, u, h]
  );
  return o && a ? /* @__PURE__ */ m(Ft, { children: a }) : /* @__PURE__ */ m(ps.Provider, { value: I, children: t });
}
function $t() {
  const t = ri(ps);
  if (!t)
    throw new Error(
      "useTranslations must be used within TranslationProvider. Make sure your component is wrapped with <TranslationProvider>."
    );
  return t;
}
function gf() {
  return dc();
}
function mc() {
  const { t } = $t(), e = oe(
    (a, s) => s === !1 ? Ue.isErrorMessage(a) ? Ze.ERROR : Ze.COMPLETED : Ue.isCompletedMessage(a) ? Ze.COMPLETED : Ue.isErrorMessage(a) ? Ze.ERROR : Ze.PROCESSING,
    []
  ), n = oe(
    (a) => Ue.extractDuration(a, t),
    [t]
  ), r = oe(
    (a) => Ue.cleanReasoningContent(a),
    []
  ), i = oe(
    (a, s) => {
      switch (Ue.getMessageType(
        a,
        s
      )) {
        case se.MESSAGE_TYPES.ERROR:
          return t("chat.reasoning.error");
        case se.MESSAGE_TYPES.COMPLETED:
          return t("chat.reasoning.completed");
        case se.MESSAGE_TYPES.THOUGHT:
          return t("chat.reasoning.thought");
        case se.MESSAGE_TYPES.THINKING:
        default:
          return t("chat.reasoning.thinking");
      }
    },
    [t]
  );
  return {
    getReasoningStatus: e,
    getReasoningDuration: n,
    getReasoningContentOnly: r,
    getReasoningTitle: i
  };
}
function Cc() {
  const { t } = $t(), e = oe(
    (r, i) => i === !1 ? r.includes(se.ERROR_MARKER) ? t("chat.tools.failed") : t("chat.tools.completed") : r.includes(se.COMPLETED_MARKER) || r.includes("✅") ? t("chat.tools.completed") : r.includes(se.ERROR_MARKER) ? t("chat.tools.failed") : (r.includes(se.HANDLING_MARKER), t("chat.tools.executing")),
    [t]
  ), n = oe(
    (r, i) => i === !1 ? r.includes(se.ERROR_MARKER) ? Ze.ERROR : Ze.COMPLETED : r.includes(se.COMPLETED_MARKER) || r.includes("✅") ? Ze.COMPLETED : r.includes(se.ERROR_MARKER) ? Ze.ERROR : Ze.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: n
  };
}
function yc({
  setMessages: t,
  addMessage: e,
  updateMessageContent: n,
  generateId: r,
  setIsThinking: i,
  setIsStreaming: a,
  setStreamingContent: s,
  setIsHandlingTool: o,
  currentAssistantMessageIdRef: c,
  streamingContentRef: u,
  clearStreamingBuffers: l,
  resetToolHandling: h
}) {
  const f = pe(/* @__PURE__ */ new Map()), d = pe(/* @__PURE__ */ new Map()), y = oe(() => {
    if (c.current && u.current) {
      const A = ai(
        u.current,
        !0
      );
      return n(
        c.current,
        A,
        !1
      ), l(), !0;
    }
    return !1;
  }, [
    c,
    u,
    n,
    l
  ]), x = oe(
    (A) => {
      if (window.responseTimeoutId && (clearTimeout(window.responseTimeoutId), window.responseTimeoutId = null, c.current || t((L) => {
        var U;
        const E = (U = L.map((B, G) => ({ msg: B, index: G })).filter(({ msg: B }) => B.role === "user").pop()) == null ? void 0 : U.index;
        return E !== void 0 ? L.map(
          (B, G) => G === E && (B.hasError || B.isRetrying) ? { ...B, hasError: !1, errorMessage: void 0, isRetrying: !1 } : B
        ) : L;
      })), c.current)
        u.current += A, s(u.current), n(
          c.current,
          u.current,
          !0
        );
      else {
        i(!1);
        const L = r();
        c.current = L, u.current = A, s(A);
        const E = {
          id: L,
          role: "assistant",
          content: A,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        t((U) => [...U, E]);
      }
    },
    [
      c,
      u,
      s,
      n,
      i,
      r,
      t
    ]
  ), I = oe(
    (A, L, E) => {
      const { callId: U } = E || {};
      if (o(A), !U) return;
      const B = Ue.isThinkingMessage(L) && !se.PATTERNS.DURATION.test(L), G = Ue.isThinkingMessage(L) && se.PATTERNS.DURATION.test(L), Z = Ue.isHandlingMessage(L), W = Ue.isCompletedMessage(L), z = Ue.isErrorMessage(L);
      if (B || G) {
        const O = f.current.get(U);
        if (B && !O) {
          y();
          const H = r();
          f.current.set(U, H);
          const ee = {
            id: H,
            role: "reasoning",
            content: L,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          t((ie) => [...ie, ee]);
        } else G && O ? (n(O, L, !1), f.current.delete(U)) : O && B && n(O, L, !0);
      }
      const b = d.current.get(U);
      if (Z && !b) {
        y();
        const O = L.match(
          se.PATTERNS.HANDLING_TOOL
        ), H = O ? O[1] : "Unknown Tool", ee = r();
        d.current.set(U, ee);
        const ie = {
          id: ee,
          role: "tooling",
          content: L,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...E,
            toolName: H,
            callId: U,
            status: Ze.PROCESSING
          }
        };
        t((ge) => [...ge, ie]);
      } else if ((W || z) && b) {
        const O = L.match(
          se.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), H = O ? O[1] : "Unknown Tool";
        t(
          (ee) => ee.map(
            (ie) => ie.id === b ? {
              ...ie,
              content: L,
              isStreaming: !1,
              toolData: {
                ...ie.toolData,
                toolName: H,
                status: z ? Ze.ERROR : Ze.COMPLETED,
                callId: U ?? ""
              }
            } : ie
          )
        ), d.current.delete(U);
      } else b && A && !W && !z && n(b, L, !0);
    },
    [
      o,
      y,
      r,
      t,
      n
    ]
  ), T = oe(() => {
    a(!1), i(!1), y();
  }, [a, i, y]), _ = oe(
    (A) => {
      a(!1), i(!1), y(), e("system", `❌ Chat error: ${A}`);
    },
    [
      a,
      i,
      y,
      e
    ]
  ), N = oe(() => {
    a(!1), i(!1), l(), h();
  }, [
    a,
    i,
    l,
    h
  ]);
  return {
    handleSetMessage: x,
    handleReasoningUpdate: I,
    handleChatFinished: T,
    handleChatError: _,
    stopGeneration: N,
    finalizeCurrentStreamingMessage: y
  };
}
function wc() {
  const t = rl(), e = wl(), n = mc(), r = Cc(), i = yc({
    // From useMessages
    setMessages: t.setMessages,
    addMessage: t.addMessage,
    updateMessageContent: t.updateMessageContent,
    generateId: t.generateId,
    // From useStreamingState
    setIsThinking: e.setIsThinking,
    setIsStreaming: e.setIsStreaming,
    setStreamingContent: e.setStreamingContent,
    setIsHandlingTool: e.setIsHandlingTool,
    currentAssistantMessageIdRef: e.currentAssistantMessageIdRef,
    streamingContentRef: e.streamingContentRef,
    clearStreamingBuffers: e.clearStreamingBuffers,
    resetToolHandling: e.resetToolHandling
  });
  return {
    // State from useMessages
    messages: t.messages,
    setMessages: t.setMessages,
    // State from useStreamingState
    isStreaming: e.isStreaming,
    setIsStreaming: e.setIsStreaming,
    isThinking: e.isThinking,
    setIsThinking: e.setIsThinking,
    streamingContent: e.streamingContent,
    isHandlingTool: e.isHandlingTool,
    currentAssistantMessageIdRef: e.currentAssistantMessageIdRef,
    // Helper functions from useReasoningHelpers
    getReasoningStatus: n.getReasoningStatus,
    getReasoningDuration: n.getReasoningDuration,
    getReasoningContentOnly: n.getReasoningContentOnly,
    getReasoningTitle: n.getReasoningTitle,
    // Helper functions from useToolingHelpers
    getToolingTitle: r.getToolingTitle,
    getToolingStatus: r.getToolingStatus,
    // Actions from useMessages
    addMessage: t.addMessage,
    // Actions from useMessageHandlers
    handleSetMessage: i.handleSetMessage,
    handleReasoningUpdate: i.handleReasoningUpdate,
    handleChatFinished: i.handleChatFinished,
    handleChatError: i.handleChatError,
    stopGeneration: i.stopGeneration,
    finalizeCurrentStreamingMessage: i.finalizeCurrentStreamingMessage
  };
}
function mf({ initialMode: t = "sidebar" }) {
  const e = ce();
  return Te(() => {
    t && e.currentMode !== t && e.setCurrentMode(t);
  }, [t]), Te(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const n = (r) => {
      r.key === "Escape" && e.currentMode === "modal" && e.isModalOpen && e.closeModal();
    };
    if (e.currentMode === "modal" && e.isModalOpen)
      return document.addEventListener("keydown", n), () => document.removeEventListener("keydown", n);
  }, [e.currentMode, e.isModalOpen, e.closeModal]), {
    // Modal and layout state
    isModalOpen: e.isModalOpen,
    setIsModalOpen: e.setIsModalOpen,
    isCollapsed: e.isCollapsed,
    setIsCollapsed: e.setIsCollapsed,
    currentMode: e.currentMode,
    setCurrentMode: e.setCurrentMode,
    // Chat state
    chatStatus: e.chatStatus,
    setChatStatus: e.setChatStatus,
    streamingStatus: e.streamingStatus,
    setStreamingStatus: e.setStreamingStatus,
    // Conversation state
    isLoadingConversation: e.isLoadingConversation,
    setIsLoadingConversation: e.setIsLoadingConversation,
    conversationError: e.conversationError,
    setConversationError: e.setConversationError,
    // Thread state
    currentThreadId: e.currentThreadId,
    setCurrentThreadId: e.setCurrentThreadId,
    providerResId: e.providerResId,
    setProviderResId: e.setProviderResId,
    // Actions
    openModal: e.openModal,
    closeModal: e.closeModal,
    toggleCollapse: e.toggleCollapse,
    toggleFullscreen: e.toggleFullscreen
  };
}
function Sc({
  entityId: t,
  entityType: e,
  httpApiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  messages: a,
  setMessages: s,
  setIsLoadingConversation: o,
  setConversationError: c,
  setCurrentThreadId: u,
  setProviderResId: l,
  metadata: h,
  isConnected: f = !0,
  // Default to true for backward compatibility
  onConversationInitialized: d
}) {
  const y = pe(!1), x = async () => {
    if (f) {
      if (!t) {
        o(!1);
        return;
      }
      if (!h || typeof h == "object" && Object.keys(h).length === 0) {
        o(!1);
        return;
      }
      if (!n) {
        o(!1);
        return;
      }
      if (!r) {
        o(!1);
        return;
      }
      if (!i) {
        o(!1);
        return;
      }
      if (!y.current && !(a.length > 0))
        try {
          o(!0), c(null);
          const T = await vo(
            n,
            {
              entityId: t,
              entityType: e,
              metadata: h
            },
            {
              userMpAuthToken: r,
              chatServerKey: i
            }
          );
          s(T.messages), T.threadId && u(T.threadId), T.providerResId && l(T.providerResId), T.messages.length > 0 && d && d(), y.current = !0;
        } catch (T) {
          sn(T, "ConversationLoader"), c(
            T instanceof Error ? T.message : "Failed to load conversation"
          ), y.current = !0;
        } finally {
          o(!1);
        }
    }
  };
  return Te(() => {
    x();
  }, [
    f,
    // Load when connection is established
    t,
    e,
    n,
    r,
    i,
    a.length,
    s,
    o,
    c,
    u,
    l,
    h
  ]), {
    hasLoadedConversationRef: y,
    resetConversationLoader: () => {
      y.current = !1;
    },
    reloadConversation: x
  };
}
function xc(t) {
  if (!t || typeof t != "object") return !1;
  const e = Object.keys(t);
  return e.length === 0 ? !1 : e.some((n) => t[n] != null);
}
function kc({
  metadata: t,
  chatClient: e,
  currentProviderResId: n,
  isLoadingConversation: r,
  messages: i = [],
  entityId: a,
  entityType: s
}) {
  const o = pe(void 0), c = pe(!1), u = pe(null), l = pe(void 0);
  return Te(() => {
    if (r || !e)
      return;
    const h = !n && i.length === 0, f = !!n;
    if (h && (!a || !s) || f && !n)
      return;
    if (!c.current) {
      c.current = !0, o.current = t;
      return;
    }
    if (!(o.current !== t))
      return;
    if (!xc(t)) {
      o.current = t;
      return;
    }
    if (h)
      o.current = t;
    else if (f) {
      if (l.current === t)
        return;
      if (u.current) {
        u.current.finally(() => {
          if (l.current !== t) {
            const I = e.updateMetadata(n, { metadata: t }).then(() => {
              o.current = t, l.current = t, u.current = null;
            }).catch((T) => {
              console.error(
                "[useMetadataSync] ❌ Failed to update existing thread metadata:",
                T
              ), u.current = null;
            });
            u.current = I;
          }
        });
        return;
      }
      const x = e.updateMetadata(n, { metadata: t }).then(() => {
        o.current = t, l.current = t, u.current = null;
      }).catch((I) => {
        console.error(
          "[useMetadataSync] ❌ Failed to update existing thread metadata:",
          I
        ), u.current = null;
      });
      u.current = x;
    }
  }, [
    t,
    n,
    e,
    r,
    i.length,
    a,
    s
  ]), {
    // Debug info
    lastMetadata: o.current,
    hasInitialized: c.current,
    isDraftState: !n && i.length === 0,
    isExistingThread: !!n
  };
}
function Tc() {
  const [t, e] = xe(navigator.onLine), [n, r] = xe(!1);
  return Te(() => {
    const i = () => {
      e(!0), n && r(!1);
    }, a = () => {
      e(!1), r(!0);
    };
    return window.addEventListener("online", i), window.addEventListener("offline", a), () => {
      window.removeEventListener("online", i), window.removeEventListener("offline", a);
    };
  }, [n]), { isOnline: t, wasOffline: n };
}
class Ec {
  // 15MB
  constructor(e) {
    X(this, "config");
    X(this, "defaultFolder", "chat-uploads");
    X(this, "defaultMaxFileSize", 15 * 1024 * 1024);
    this.config = {
      folder: this.defaultFolder,
      maxFileSize: this.defaultMaxFileSize,
      ...e
    };
  }
  /**
   * Upload files with authentication and error handling
   * Single file: uses "file" field name
   * Multiple files: uses "files" field name in single request
   */
  async uploadFiles(e, n) {
    return e.forEach((r) => this.validateFile(r)), e.length === 1 ? [await this.uploadSingleFile(e[0], n ? (r) => {
      const i = [{
        file: e[0],
        progress: r,
        status: r === 100 ? "completed" : "uploading"
      }];
      n(i);
    } : void 0)] : this.uploadMultipleFiles(e, n);
  }
  /**
   * Upload multiple files in a single request using "files" field name
   */
  async uploadMultipleFiles(e, n) {
    const r = new FormData();
    e.forEach((s) => {
      r.append("files", s);
    }), r.append("folder", this.config.folder || this.defaultFolder);
    const i = this.buildAuthHeaders(), a = e.map((s) => ({
      file: s,
      progress: 0,
      status: "uploading"
    }));
    return new Promise((s, o) => {
      const c = new XMLHttpRequest();
      c.upload.addEventListener("progress", (u) => {
        if (u.lengthComputable && n) {
          const l = u.loaded / u.total * 100;
          a.forEach((h) => {
            h.progress = l;
          }), n([...a]);
        }
      }), c.addEventListener("load", async () => {
        if (c.status >= 200 && c.status < 300)
          try {
            const u = JSON.parse(c.responseText);
            let l;
            u.data && Array.isArray(u.data) ? l = u.data.map((h, f) => this.processUploadResult(e[f], h)) : Array.isArray(u) ? l = u.map((h, f) => this.processUploadResult(e[f], h)) : l = [this.processUploadResult(e[0], u)], a.forEach((h) => {
              h.status = "completed", h.progress = 100;
            }), n && n([...a]), s(l);
          } catch {
            a.forEach((l) => {
              l.status = "error";
            }), n && n([...a]), o(new Error("Invalid response format"));
          }
        else
          a.forEach((u) => {
            u.status = "error";
          }), n && n([...a]), o(new Error(`Upload failed with status ${c.status}`));
      }), c.addEventListener("error", () => {
        a.forEach((u) => {
          u.status = "error";
        }), n && n([...a]), o(new Error("Network error during upload"));
      }), c.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([u, l]) => {
        c.setRequestHeader(u, l);
      }), c.send(r);
    });
  }
  /**
   * Upload a single file with authentication
   */
  async uploadSingleFile(e, n) {
    const r = new FormData();
    r.append("file", e), r.append("folder", this.config.folder || this.defaultFolder);
    const i = this.buildAuthHeaders();
    return new Promise((a, s) => {
      const o = new XMLHttpRequest();
      o.upload.addEventListener("progress", (c) => {
        if (c.lengthComputable && n) {
          const u = c.loaded / c.total * 100;
          n(u);
        }
      }), o.addEventListener("load", async () => {
        if (o.status >= 200 && o.status < 300)
          try {
            const c = JSON.parse(o.responseText), u = this.processUploadResult(e, c);
            a(u);
          } catch {
            s(new Error("Invalid response format"));
          }
        else
          s(new Error(`Upload failed with status ${o.status}`));
      }), o.addEventListener("error", () => {
        s(new Error("Network error during upload"));
      }), o.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([c, u]) => {
        o.setRequestHeader(c, u);
      }), o.send(r);
    });
  }
  /**
   * Process the upload result and return the CDN URL directly
   */
  processUploadResult(e, n) {
    return n.cdnUrl || n.url;
  }
  /**
   * Validate file before upload
   */
  validateFile(e) {
    if (e.size > (this.config.maxFileSize || this.defaultMaxFileSize))
      throw new Error(
        `File ${e.name} is too large. Maximum size is ${this.formatFileSize(
          this.config.maxFileSize || this.defaultMaxFileSize
        )}`
      );
    if (this.config.allowedTypes && this.config.allowedTypes.length > 0 && !this.config.allowedTypes.some(
      (r) => e.type.startsWith(r) || e.name.toLowerCase().endsWith(r)
    ))
      throw new Error(`File type ${e.type} is not allowed`);
  }
  /**
   * Build authentication headers
   */
  buildAuthHeaders() {
    const e = {};
    return this.config.userMpAuthToken && (e["x-oddle-mp-auth-token"] = this.config.userMpAuthToken), this.config.chatServerKey && (e["x-oddle-chat-server-key"] = this.config.chatServerKey), e;
  }
  /**
   * Format file size for display
   */
  formatFileSize(e) {
    if (e === 0) return "0 Bytes";
    const n = 1024, r = ["Bytes", "KB", "MB", "GB"], i = Math.floor(Math.log(e) / Math.log(n));
    return parseFloat((e / Math.pow(n, i)).toFixed(2)) + " " + r[i];
  }
  /**
   * Update configuration
   */
  updateConfig(e) {
    this.config = { ...this.config, ...e };
  }
  /**
   * Get current configuration
   */
  getConfig() {
    return { ...this.config };
  }
}
class bc {
  constructor(e, n = {}) {
    X(this, "config");
    X(this, "chatClient");
    this.chatClient = e, this.config = n;
  }
  /**
   * Validates if a message can be submitted
   */
  canSubmit(e, n, r) {
    return !!(e.trim() && !n && this.chatClient && r);
  }
  /**
   * Creates a user message object
   */
  createUserMessage(e, n) {
    return {
      id: this.generateId(),
      role: "user",
      content: e.trim(),
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
  async submitMessage(e) {
    const { message: n, media: r, providerResId: i } = e, a = this.createUserMessage(n, r);
    try {
      return await this.chatClient.onTriggerMessage({
        message: a.content,
        media: r,
        providerResId: i
      }), a;
    } catch (s) {
      throw this.handleError(s), s;
    }
  }
  /**
   * Handles submission errors
   */
  handleError(e) {
    const n = e instanceof Error ? e : new Error("Unknown error");
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
  createErrorMessage(e) {
    return `Sorry, there was an error: ${e instanceof Error ? e.message : "Unknown error"}`;
  }
}
const _c = {
  /**
   * Determine if the bubble button should be shown based on mode and state
   */
  shouldShowBubble: (t, e, n) => t === "modal" && !e || (t === "sidebar" || t === "fullscreen") && n,
  /**
   * Determine if the chat is in a collapsed state
   */
  isCollapsedState: (t, e) => (t === "sidebar" || t === "fullscreen") && e,
  /**
   * Get the appropriate title text based on mode and state
   */
  getBubbleTitle: (t, e) => t === "modal" ? `Open ${e}` : `Expand ${e}`,
  /**
   * Determine if header should be visible
   */
  shouldShowHeader: (t) => t !== !1,
  /**
   * Determine if main header section should be shown
   */
  shouldShowMainHeader: (t, e, n) => t === 0 && !e && !n,
  /**
   * Get content area CSS class based on message state
   */
  getContentAreaClass: (t, e, n) => `chat-wrapper__content ${t === 0 && !e && !n ? "chat-wrapper__content--empty" : "chat-wrapper__content--with-messages"}`,
  /**
   * Determine if suggested prompts should be shown
   */
  shouldShowSuggestedPrompts: (t, e, n, r) => t === 0 && !e && !n && !!r
}, fs = {
  /**
   * Convert WebSocket URL to HTTP URL for REST API calls
   */
  convertWebSocketToHttp: (t) => t.replace(
    /^wss?:\/\//,
    (e) => e === "wss://" ? "https://" : "http://"
  ),
  /**
   * Validate if a URL is a valid WebSocket URL
   */
  isValidWebSocketUrl: (t) => {
    try {
      const e = new URL(t);
      return e.protocol === "ws:" || e.protocol === "wss:";
    } catch {
      return !1;
    }
  },
  /**
   * Validate if a URL is a valid HTTP URL
   */
  isValidHttpUrl: (t) => {
    try {
      const e = new URL(t);
      return e.protocol === "http:" || e.protocol === "https:";
    } catch {
      return !1;
    }
  }
}, vc = {
  /**
   * Validate required authentication props
   */
  validateAuthProps: (t) => {
    if (!t.userMpAuthToken)
      throw new Error("ChatWrapper: userMpAuthToken is required");
    if (!t.chatServerUrl)
      throw new Error("ChatWrapper: chatServerUrl is required");
    if (!t.chatServerKey)
      throw new Error("ChatWrapper: chatServerKey is required");
  },
  /**
   * Validate WebSocket URL format
   */
  validateWebSocketUrl: (t) => {
    if (!fs.isValidWebSocketUrl(t))
      throw new Error(`Invalid WebSocket URL: ${t}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (t) => t.trim().length > 0
}, gs = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...t) => t.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (t, e, n, r, i) => gs.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${t}`,
    e && `chat-wrapper--${e}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    t === "embedded" && i && "chat-wrapper--constrained"
  )
}, ms = {
  /**
   * Create a standardized error for the chat system
   */
  createChatError: (t, e, n) => {
    const r = new Error(t);
    return r.code = e, r.originalError = n, r;
  },
  /**
   * Check if an error is a network error
   */
  isNetworkError: (t) => t.message.includes("fetch") || t.message.includes("network") || t.message.includes("connection"),
  /**
   * Get user-friendly error message
   */
  getUserFriendlyErrorMessage: (t) => ms.isNetworkError(t) ? "Connection error. Please check your internet connection and try again." : t.message.includes("authentication") || t.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : t.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, _t = {
  state: _c,
  url: fs,
  validation: vc,
  css: gs,
  error: ms
};
class ta extends ii {
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
      const s = n.resetKeys || [];
      i.some(
        (c, u) => c !== s[u]
      ) && this.resetErrorBoundary();
    }
  }
  render() {
    const { hasError: n, error: r } = this.state, { children: i, fallback: a } = this.props;
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ m("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ P("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ m("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ m("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ m("p", { className: "chat-wrapper__error-message", children: _t.error.getUserFriendlyErrorMessage(r) }),
      /* @__PURE__ */ m("div", { className: "chat-wrapper__error-actions", children: /* @__PURE__ */ m(
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
      })() && /* @__PURE__ */ P("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ m("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ m("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : i;
  }
}
class Rc extends ii {
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
    const { hasError: n, error: r, isRetrying: i } = this.state, { children: a, maxRetries: s = 3 } = this.props;
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || _t.error.isNetworkError(r)) ? /* @__PURE__ */ m("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ P("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ m("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ m("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ m("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ m("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ P("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ m("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ m("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ P(Ft, { children: [
        this.retryCount < s && /* @__PURE__ */ P(
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
        /* @__PURE__ */ m(
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
      })() && /* @__PURE__ */ P("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ m("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ m("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
}
class Ic extends ii {
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
    const { hasError: n, error: r, failedFiles: i } = this.state, { children: a, allowRetry: s = !0 } = this.props;
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ m("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ P("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ m("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ m("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ m("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ P("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ m("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ m("ul", { className: "chat-wrapper__failed-files-list", children: i.map((c, u) => /* @__PURE__ */ m("li", { className: "chat-wrapper__failed-file", children: c }, u)) })
      ] }),
      /* @__PURE__ */ P("div", { className: "chat-wrapper__error-actions", children: [
        s && /* @__PURE__ */ m(
          "button",
          {
            className: "chat-wrapper__error-retry",
            onClick: this.handleRetry,
            type: "button",
            children: "Try Again"
          }
        ),
        /* @__PURE__ */ m(
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
      })() && /* @__PURE__ */ P("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ m("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ m("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
  getFileUploadErrorMessage(n) {
    return n.message.includes("size") || n.message.includes("large") ? "File size is too large. Please try with smaller files." : n.message.includes("type") || n.message.includes("format") ? "File type is not supported. Please try with different file types." : n.message.includes("network") || n.message.includes("connection") ? "Network error during upload. Please check your connection and try again." : n.message.includes("timeout") ? "Upload timed out. Please try again with smaller files or better connection." : "Failed to upload files. Please try again.";
  }
}
const Nc = ({
  className: t,
  onClick: e,
  size: n = 24,
  color: r = "currentColor"
}) => /* @__PURE__ */ P(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: t,
    onClick: e,
    style: { cursor: e ? "pointer" : "default" },
    children: [
      /* @__PURE__ */ m(
        "path",
        {
          d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
          fill: r
        }
      ),
      /* @__PURE__ */ m("circle", { cx: "7", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ m("circle", { cx: "12", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ m("circle", { cx: "17", cy: "10", r: "1", fill: r })
    ]
  }
), Mc = ({
  className: t,
  onClick: e,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ m(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: t,
    onClick: e,
    style: { cursor: e ? "pointer" : "default" },
    children: /* @__PURE__ */ m(
      "path",
      {
        d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
        fill: r
      }
    )
  }
), Ac = ({
  className: t,
  onClick: e,
  size: n = 20,
  color: r = "currentColor",
  isFullscreen: i = !1
}) => /* @__PURE__ */ m(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: t,
    onClick: e,
    style: { cursor: e ? "pointer" : "default" },
    children: i ? (
      // Minimize icon (arrows pointing inward)
      /* @__PURE__ */ m(
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
      /* @__PURE__ */ m(
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
), Oc = ({
  className: t,
  onClick: e,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ m(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: t,
    onClick: e,
    style: { cursor: e ? "pointer" : "default" },
    children: /* @__PURE__ */ m(
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
), Cf = ({
  className: t,
  onClick: e,
  size: n = 16,
  color: r = "currentColor"
}) => /* @__PURE__ */ m(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: t,
    onClick: e,
    style: { cursor: e ? "pointer" : "default" },
    children: /* @__PURE__ */ m(
      "path",
      {
        d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
        fill: r
      }
    )
  }
), Lc = ({
  className: t,
  onClick: e,
  size: n = 18,
  color: r = "currentColor"
}) => /* @__PURE__ */ P(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 18 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: t,
    onClick: e,
    style: { cursor: e ? "pointer" : "default" },
    children: [
      /* @__PURE__ */ m("mask", { id: "mask0_444_23118", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "18", height: "18", children: /* @__PURE__ */ m("rect", { width: "18", height: "18", fill: "#D9D9D9" }) }),
      /* @__PURE__ */ m("g", { mask: "url(#mask0_444_23118)", children: /* @__PURE__ */ m(
        "path",
        {
          d: "M5.8498 13.4998C5.47855 13.4998 5.16074 13.3676 4.89637 13.1032C4.63199 12.8389 4.4998 12.5211 4.4998 12.1498V3.1498C4.4998 2.77855 4.63199 2.46074 4.89637 2.19637C5.16074 1.93199 5.47855 1.7998 5.8498 1.7998H14.8498C15.2211 1.7998 15.5389 1.93199 15.8032 2.19637C16.0676 2.46074 16.1998 2.77855 16.1998 3.1498V12.1498C16.1998 12.5211 16.0676 12.8389 15.8032 13.1032C15.5389 13.3676 15.2211 13.4998 14.8498 13.4998H5.8498ZM5.8498 12.1498H14.8498V3.1498H5.8498V12.1498ZM3.1498 16.1998C2.77855 16.1998 2.46074 16.0676 2.19637 15.8032C1.93199 15.5389 1.7998 15.2211 1.7998 14.8498V4.4998H3.1498V14.8498H13.4998V16.1998H3.1498Z",
          fill: r
        }
      ) })
    ]
  }
), Pc = ({
  mode: t,
  headerName: e,
  bubbleText: n,
  showBubbleText: r = !0,
  onClick: i
}) => {
  const a = t === "modal" ? `Open ${e}` : `Expand ${e}`;
  return /* @__PURE__ */ P(
    "button",
    {
      className: "chat-wrapper__bubble-button",
      onClick: i,
      title: a,
      children: [
        /* @__PURE__ */ m(Nc, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ m("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, Dc = ({
  headerName: t,
  mode: e,
  isCollapsed: n,
  isModalOpen: r,
  onClose: i,
  onToggleFullscreen: a,
  onToggleCollapse: s
}) => {
  const o = () => e === "modal" && r && i ? /* @__PURE__ */ m(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: i,
      title: "Close chat",
      children: /* @__PURE__ */ m(Mc, { size: 20 })
    }
  ) : null, c = () => {
    if ((e === "sidebar" || e === "fullscreen") && !n && a) {
      const l = e === "fullscreen";
      return /* @__PURE__ */ m(
        "button",
        {
          className: l ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: a,
          title: l ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ m(Ac, { size: 20, isFullscreen: l })
        }
      );
    }
    return null;
  }, u = () => (e === "sidebar" || e === "fullscreen") && !n && s ? /* @__PURE__ */ m(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: s,
      title: "Collapse chat",
      children: /* @__PURE__ */ m(Oc, { size: 20 })
    }
  ) : null;
  return /* @__PURE__ */ P("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ m("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ m("h2", { className: "chat-wrapper__title", children: t }) }),
    /* @__PURE__ */ P("div", { className: "chat-wrapper__header-controls", children: [
      c(),
      u(),
      o()
    ] })
  ] });
};
class Fc extends Error {
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
  constructor(n, r, i, a, s) {
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
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.actual = r, this.expected = i, this.generated = s, this.operator = a;
  }
}
function k(t, e) {
  Cs(
    !!t,
    !1,
    !0,
    "ok",
    "Expected value to be truthy",
    e
  );
}
function Vr(t) {
  Cs(!1, !1, !0, "ok", "Unreachable", t);
}
function Cs(t, e, n, r, i, a) {
  if (!t)
    throw a instanceof Error ? a : new Fc(
      a || i,
      e,
      n,
      r,
      !a
    );
}
function Hc(t, e) {
  const n = {};
  return (t[t.length - 1] === "" ? [...t, ""] : t).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const zc = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Uc = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Bc = {};
function na(t, e) {
  return (Bc.jsx ? Uc : zc).test(t);
}
const $c = /[ \t\n\f\r]/g;
function Vc(t) {
  return typeof t == "object" ? t.type === "text" ? ra(t.value) : !1 : ra(t);
}
function ra(t) {
  return t.replace($c, "") === "";
}
class Nn {
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
  constructor(e, n, r) {
    this.normal = n, this.property = e, r && (this.space = r);
  }
}
Nn.prototype.normal = {};
Nn.prototype.property = {};
Nn.prototype.space = void 0;
function ys(t, e) {
  const n = {}, r = {};
  for (const i of t)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new Nn(n, r, e);
}
function jr(t) {
  return t.toLowerCase();
}
class ot {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(e, n) {
    this.attribute = n, this.property = e;
  }
}
ot.prototype.attribute = "";
ot.prototype.booleanish = !1;
ot.prototype.boolean = !1;
ot.prototype.commaOrSpaceSeparated = !1;
ot.prototype.commaSeparated = !1;
ot.prototype.defined = !1;
ot.prototype.mustUseProperty = !1;
ot.prototype.number = !1;
ot.prototype.overloadedBoolean = !1;
ot.prototype.property = "";
ot.prototype.spaceSeparated = !1;
ot.prototype.space = void 0;
let jc = 0;
const he = Yt(), Pe = Yt(), Gr = Yt(), D = Yt(), be = Yt(), rn = Yt(), ut = Yt();
function Yt() {
  return 2 ** ++jc;
}
const Wr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: he,
  booleanish: Pe,
  commaOrSpaceSeparated: ut,
  commaSeparated: rn,
  number: D,
  overloadedBoolean: Gr,
  spaceSeparated: be
}, Symbol.toStringTag, { value: "Module" })), kr = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Wr)
);
class oi extends ot {
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
  constructor(e, n, r, i) {
    let a = -1;
    if (super(e, n), ia(this, "space", i), typeof r == "number")
      for (; ++a < kr.length; ) {
        const s = kr[a];
        ia(this, kr[a], (r & Wr[s]) === Wr[s]);
      }
  }
}
oi.prototype.defined = !0;
function ia(t, e, n) {
  n && (t[e] = n);
}
function ln(t) {
  const e = {}, n = {};
  for (const [r, i] of Object.entries(t.properties)) {
    const a = new oi(
      r,
      t.transform(t.attributes || {}, r),
      i,
      t.space
    );
    t.mustUseProperty && t.mustUseProperty.includes(r) && (a.mustUseProperty = !0), e[r] = a, n[jr(r)] = r, n[jr(a.attribute)] = r;
  }
  return new Nn(e, n, t.space);
}
const ws = ln({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Pe,
    ariaAutoComplete: null,
    ariaBusy: Pe,
    ariaChecked: Pe,
    ariaColCount: D,
    ariaColIndex: D,
    ariaColSpan: D,
    ariaControls: be,
    ariaCurrent: null,
    ariaDescribedBy: be,
    ariaDetails: null,
    ariaDisabled: Pe,
    ariaDropEffect: be,
    ariaErrorMessage: null,
    ariaExpanded: Pe,
    ariaFlowTo: be,
    ariaGrabbed: Pe,
    ariaHasPopup: null,
    ariaHidden: Pe,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: be,
    ariaLevel: D,
    ariaLive: null,
    ariaModal: Pe,
    ariaMultiLine: Pe,
    ariaMultiSelectable: Pe,
    ariaOrientation: null,
    ariaOwns: be,
    ariaPlaceholder: null,
    ariaPosInSet: D,
    ariaPressed: Pe,
    ariaReadOnly: Pe,
    ariaRelevant: null,
    ariaRequired: Pe,
    ariaRoleDescription: be,
    ariaRowCount: D,
    ariaRowIndex: D,
    ariaRowSpan: D,
    ariaSelected: Pe,
    ariaSetSize: D,
    ariaSort: null,
    ariaValueMax: D,
    ariaValueMin: D,
    ariaValueNow: D,
    ariaValueText: null,
    role: null
  },
  transform(t, e) {
    return e === "role" ? e : "aria-" + e.slice(4).toLowerCase();
  }
});
function Ss(t, e) {
  return e in t ? t[e] : e;
}
function xs(t, e) {
  return Ss(t, e.toLowerCase());
}
const Gc = ln({
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
    accept: rn,
    acceptCharset: be,
    accessKey: be,
    action: null,
    allow: null,
    allowFullScreen: he,
    allowPaymentRequest: he,
    allowUserMedia: he,
    alt: null,
    as: null,
    async: he,
    autoCapitalize: null,
    autoComplete: be,
    autoFocus: he,
    autoPlay: he,
    blocking: be,
    capture: null,
    charSet: null,
    checked: he,
    cite: null,
    className: be,
    cols: D,
    colSpan: null,
    content: null,
    contentEditable: Pe,
    controls: he,
    controlsList: be,
    coords: D | rn,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: he,
    defer: he,
    dir: null,
    dirName: null,
    disabled: he,
    download: Gr,
    draggable: Pe,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: he,
    formTarget: null,
    headers: be,
    height: D,
    hidden: Gr,
    high: D,
    href: null,
    hrefLang: null,
    htmlFor: be,
    httpEquiv: be,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: he,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: he,
    itemId: null,
    itemProp: be,
    itemRef: be,
    itemScope: he,
    itemType: be,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: he,
    low: D,
    manifest: null,
    max: null,
    maxLength: D,
    media: null,
    method: null,
    min: null,
    minLength: D,
    multiple: he,
    muted: he,
    name: null,
    nonce: null,
    noModule: he,
    noValidate: he,
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
    open: he,
    optimum: D,
    pattern: null,
    ping: be,
    placeholder: null,
    playsInline: he,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: he,
    referrerPolicy: null,
    rel: be,
    required: he,
    reversed: he,
    rows: D,
    rowSpan: D,
    sandbox: be,
    scope: null,
    scoped: he,
    seamless: he,
    selected: he,
    shadowRootClonable: he,
    shadowRootDelegatesFocus: he,
    shadowRootMode: null,
    shape: null,
    size: D,
    sizes: null,
    slot: null,
    span: D,
    spellCheck: Pe,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: D,
    step: null,
    style: null,
    tabIndex: D,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: he,
    useMap: null,
    value: Pe,
    width: D,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: be,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: D,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: D,
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
    compact: he,
    // Lists. Use CSS to reduce space between items instead
    declare: he,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: D,
    // `<img>` and `<object>`
    leftMargin: D,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: D,
    // `<body>`
    marginWidth: D,
    // `<body>`
    noResize: he,
    // `<frame>`
    noHref: he,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: he,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: he,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: D,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: Pe,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: D,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: D,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: he,
    disableRemotePlayback: he,
    prefix: null,
    property: null,
    results: D,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: xs
}), Wc = ln({
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
    about: ut,
    accentHeight: D,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: D,
    amplitude: D,
    arabicForm: null,
    ascent: D,
    attributeName: null,
    attributeType: null,
    azimuth: D,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: D,
    by: null,
    calcMode: null,
    capHeight: D,
    className: be,
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
    descent: D,
    diffuseConstant: D,
    direction: null,
    display: null,
    dur: null,
    divisor: D,
    dominantBaseline: null,
    download: he,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: D,
    enableBackground: null,
    end: null,
    event: null,
    exponent: D,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: D,
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
    g1: rn,
    g2: rn,
    glyphName: rn,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: D,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: D,
    horizOriginX: D,
    horizOriginY: D,
    id: null,
    ideographic: D,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: D,
    k: D,
    k1: D,
    k2: D,
    k3: D,
    k4: D,
    kernelMatrix: ut,
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
    limitingConeAngle: D,
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
    mediaSize: D,
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
    overlinePosition: D,
    overlineThickness: D,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: D,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: be,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: D,
    pointsAtY: D,
    pointsAtZ: D,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: ut,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: ut,
    rev: ut,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: ut,
    requiredFeatures: ut,
    requiredFonts: ut,
    requiredFormats: ut,
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
    specularConstant: D,
    specularExponent: D,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: D,
    strikethroughThickness: D,
    string: null,
    stroke: null,
    strokeDashArray: ut,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: D,
    strokeOpacity: D,
    strokeWidth: null,
    style: null,
    surfaceScale: D,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: ut,
    tabIndex: D,
    tableValues: null,
    target: null,
    targetX: D,
    targetY: D,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: ut,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: D,
    underlineThickness: D,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: D,
    values: null,
    vAlphabetic: D,
    vMathematical: D,
    vectorEffect: null,
    vHanging: D,
    vIdeographic: D,
    version: null,
    vertAdvY: D,
    vertOriginX: D,
    vertOriginY: D,
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
    xHeight: D,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Ss
}), ks = ln({
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
  transform(t, e) {
    return "xlink:" + e.slice(5).toLowerCase();
  }
}), Ts = ln({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: xs
}), Es = ln({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(t, e) {
    return "xml:" + e.slice(3).toLowerCase();
  }
}), qc = {
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
}, Kc = /[A-Z]/g, aa = /-[a-z]/g, Zc = /^data[-\w.:]+$/i;
function Yc(t, e) {
  const n = jr(e);
  let r = e, i = ot;
  if (n in t.normal)
    return t.property[t.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Zc.test(e)) {
    if (e.charAt(4) === "-") {
      const a = e.slice(5).replace(aa, Jc);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = e.slice(4);
      if (!aa.test(a)) {
        let s = a.replace(Kc, Xc);
        s.charAt(0) !== "-" && (s = "-" + s), e = "data" + s;
      }
    }
    i = oi;
  }
  return new i(r, e);
}
function Xc(t) {
  return "-" + t.toLowerCase();
}
function Jc(t) {
  return t.charAt(1).toUpperCase();
}
const Qc = ys([ws, Gc, ks, Ts, Es], "html"), li = ys([ws, Wc, ks, Ts, Es], "svg");
function eu(t) {
  return t.join(" ").trim();
}
var ci = {}, sa = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, tu = /\n/g, nu = /^\s*/, ru = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, iu = /^:\s*/, au = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, su = /^[;\s]*/, ou = /^\s+|\s+$/g, lu = `
`, oa = "/", la = "*", Kt = "", cu = "comment", uu = "declaration", hu = function(t, e) {
  if (typeof t != "string")
    throw new TypeError("First argument must be a string");
  if (!t) return [];
  e = e || {};
  var n = 1, r = 1;
  function i(y) {
    var x = y.match(tu);
    x && (n += x.length);
    var I = y.lastIndexOf(lu);
    r = ~I ? y.length - I : r + y.length;
  }
  function a() {
    var y = { line: n, column: r };
    return function(x) {
      return x.position = new s(y), u(), x;
    };
  }
  function s(y) {
    this.start = y, this.end = { line: n, column: r }, this.source = e.source;
  }
  s.prototype.content = t;
  function o(y) {
    var x = new Error(
      e.source + ":" + n + ":" + r + ": " + y
    );
    if (x.reason = y, x.filename = e.source, x.line = n, x.column = r, x.source = t, !e.silent) throw x;
  }
  function c(y) {
    var x = y.exec(t);
    if (x) {
      var I = x[0];
      return i(I), t = t.slice(I.length), x;
    }
  }
  function u() {
    c(nu);
  }
  function l(y) {
    var x;
    for (y = y || []; x = h(); )
      x !== !1 && y.push(x);
    return y;
  }
  function h() {
    var y = a();
    if (!(oa != t.charAt(0) || la != t.charAt(1))) {
      for (var x = 2; Kt != t.charAt(x) && (la != t.charAt(x) || oa != t.charAt(x + 1)); )
        ++x;
      if (x += 2, Kt === t.charAt(x - 1))
        return o("End of comment missing");
      var I = t.slice(2, x - 2);
      return r += 2, i(I), t = t.slice(x), r += 2, y({
        type: cu,
        comment: I
      });
    }
  }
  function f() {
    var y = a(), x = c(ru);
    if (x) {
      if (h(), !c(iu)) return o("property missing ':'");
      var I = c(au), T = y({
        type: uu,
        property: ca(x[0].replace(sa, Kt)),
        value: I ? ca(I[0].replace(sa, Kt)) : Kt
      });
      return c(su), T;
    }
  }
  function d() {
    var y = [];
    l(y);
    for (var x; x = f(); )
      x !== !1 && (y.push(x), l(y));
    return y;
  }
  return u(), d();
};
function ca(t) {
  return t ? t.replace(ou, Kt) : Kt;
}
var du = tr && tr.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(ci, "__esModule", { value: !0 });
ci.default = fu;
var pu = du(hu);
function fu(t, e) {
  var n = null;
  if (!t || typeof t != "string")
    return n;
  var r = (0, pu.default)(t), i = typeof e == "function";
  return r.forEach(function(a) {
    if (a.type === "declaration") {
      var s = a.property, o = a.value;
      i ? e(s, o, a) : o && (n = n || {}, n[s] = o);
    }
  }), n;
}
var ar = {};
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.camelCase = void 0;
var gu = /^--[a-zA-Z0-9_-]+$/, mu = /-([a-z])/g, Cu = /^[^-]+$/, yu = /^-(webkit|moz|ms|o|khtml)-/, wu = /^-(ms)-/, Su = function(t) {
  return !t || Cu.test(t) || gu.test(t);
}, xu = function(t, e) {
  return e.toUpperCase();
}, ua = function(t, e) {
  return "".concat(e, "-");
}, ku = function(t, e) {
  return e === void 0 && (e = {}), Su(t) ? t : (t = t.toLowerCase(), e.reactCompat ? t = t.replace(wu, ua) : t = t.replace(yu, ua), t.replace(mu, xu));
};
ar.camelCase = ku;
var Tu = tr && tr.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
}, Eu = Tu(ci), bu = ar;
function qr(t, e) {
  var n = {};
  return !t || typeof t != "string" || (0, Eu.default)(t, function(r, i) {
    r && i && (n[(0, bu.camelCase)(r, e)] = i);
  }), n;
}
qr.default = qr;
var _u = qr;
const vu = /* @__PURE__ */ si(_u), bs = _s("end"), ui = _s("start");
function _s(t) {
  return e;
  function e(n) {
    const r = n && n.position && n.position[t] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function Ru(t) {
  const e = ui(t), n = bs(t);
  if (e && n)
    return { start: e, end: n };
}
function Tn(t) {
  return !t || typeof t != "object" ? "" : "position" in t || "type" in t ? ha(t.position) : "start" in t || "end" in t ? ha(t) : "line" in t || "column" in t ? Kr(t) : "";
}
function Kr(t) {
  return da(t && t.line) + ":" + da(t && t.column);
}
function ha(t) {
  return Kr(t && t.start) + "-" + Kr(t && t.end);
}
function da(t) {
  return t && typeof t == "number" ? t : 1;
}
class Ye extends Error {
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
  constructor(e, n, r) {
    super(), typeof n == "string" && (r = n, n = void 0);
    let i = "", a = {}, s = !1;
    if (n && ("line" in n && "column" in n ? a = { place: n } : "start" in n && "end" in n ? a = { place: n } : "type" in n ? a = {
      ancestors: [n],
      place: n.position
    } : a = { ...n }), typeof e == "string" ? i = e : !a.cause && e && (s = !0, i = e.message, a.cause = e), !a.ruleId && !a.source && typeof r == "string") {
      const c = r.indexOf(":");
      c === -1 ? a.ruleId = r : (a.source = r.slice(0, c), a.ruleId = r.slice(c + 1));
    }
    if (!a.place && a.ancestors && a.ancestors) {
      const c = a.ancestors[a.ancestors.length - 1];
      c && (a.place = c.position);
    }
    const o = a.place && "start" in a.place ? a.place.start : a.place;
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = o ? o.line : void 0, this.name = Tn(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = s && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Ye.prototype.file = "";
Ye.prototype.name = "";
Ye.prototype.reason = "";
Ye.prototype.message = "";
Ye.prototype.stack = "";
Ye.prototype.column = void 0;
Ye.prototype.line = void 0;
Ye.prototype.ancestors = void 0;
Ye.prototype.cause = void 0;
Ye.prototype.fatal = void 0;
Ye.prototype.place = void 0;
Ye.prototype.ruleId = void 0;
Ye.prototype.source = void 0;
const hi = {}.hasOwnProperty, Iu = /* @__PURE__ */ new Map(), Nu = /[A-Z]/g, Mu = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Au = /* @__PURE__ */ new Set(["td", "th"]), vs = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Ou(t, e) {
  if (!e || e.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = e.filePath || void 0;
  let r;
  if (e.development) {
    if (typeof e.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Bu(n, e.jsxDEV);
  } else {
    if (typeof e.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof e.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Uu(n, e.jsx, e.jsxs);
  }
  const i = {
    Fragment: e.Fragment,
    ancestors: [],
    components: e.components || {},
    create: r,
    elementAttributeNameCase: e.elementAttributeNameCase || "react",
    evaluater: e.createEvaluater ? e.createEvaluater() : void 0,
    filePath: n,
    ignoreInvalidStyle: e.ignoreInvalidStyle || !1,
    passKeys: e.passKeys !== !1,
    passNode: e.passNode || !1,
    schema: e.space === "svg" ? li : Qc,
    stylePropertyNameCase: e.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: e.tableCellAlignToStyle !== !1
  }, a = Rs(i, t, void 0);
  return a && typeof a != "string" ? a : i.create(
    t,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function Rs(t, e, n) {
  if (e.type === "element")
    return Lu(t, e, n);
  if (e.type === "mdxFlowExpression" || e.type === "mdxTextExpression")
    return Pu(t, e);
  if (e.type === "mdxJsxFlowElement" || e.type === "mdxJsxTextElement")
    return Fu(t, e, n);
  if (e.type === "mdxjsEsm")
    return Du(t, e);
  if (e.type === "root")
    return Hu(t, e, n);
  if (e.type === "text")
    return zu(t, e);
}
function Lu(t, e, n) {
  const r = t.schema;
  let i = r;
  e.tagName.toLowerCase() === "svg" && r.space === "html" && (i = li, t.schema = i), t.ancestors.push(e);
  const a = Ns(t, e.tagName, !1), s = $u(t, e);
  let o = pi(t, e);
  return Mu.has(e.tagName) && (o = o.filter(function(c) {
    return typeof c == "string" ? !Vc(c) : !0;
  })), Is(t, s, a, e), di(s, o), t.ancestors.pop(), t.schema = r, t.create(e, a, s, n);
}
function Pu(t, e) {
  if (e.data && e.data.estree && t.evaluater) {
    const r = e.data.estree.body[0];
    return k(r.type === "ExpressionStatement"), /** @type {Child | undefined} */
    t.evaluater.evaluateExpression(r.expression);
  }
  Rn(t, e.position);
}
function Du(t, e) {
  if (e.data && e.data.estree && t.evaluater)
    return (
      /** @type {Child | undefined} */
      t.evaluater.evaluateProgram(e.data.estree)
    );
  Rn(t, e.position);
}
function Fu(t, e, n) {
  const r = t.schema;
  let i = r;
  e.name === "svg" && r.space === "html" && (i = li, t.schema = i), t.ancestors.push(e);
  const a = e.name === null ? t.Fragment : Ns(t, e.name, !0), s = Vu(t, e), o = pi(t, e);
  return Is(t, s, a, e), di(s, o), t.ancestors.pop(), t.schema = r, t.create(e, a, s, n);
}
function Hu(t, e, n) {
  const r = {};
  return di(r, pi(t, e)), t.create(e, t.Fragment, r, n);
}
function zu(t, e) {
  return e.value;
}
function Is(t, e, n, r) {
  typeof n != "string" && n !== t.Fragment && t.passNode && (e.node = r);
}
function di(t, e) {
  if (e.length > 0) {
    const n = e.length > 1 ? e : e[0];
    n && (t.children = n);
  }
}
function Uu(t, e, n) {
  return r;
  function r(i, a, s, o) {
    const u = Array.isArray(s.children) ? n : e;
    return o ? u(a, s, o) : u(a, s);
  }
}
function Bu(t, e) {
  return n;
  function n(r, i, a, s) {
    const o = Array.isArray(a.children), c = ui(r);
    return e(
      i,
      a,
      s,
      o,
      {
        columnNumber: c ? c.column - 1 : void 0,
        fileName: t,
        lineNumber: c ? c.line : void 0
      },
      void 0
    );
  }
}
function $u(t, e) {
  const n = {};
  let r, i;
  for (i in e.properties)
    if (i !== "children" && hi.call(e.properties, i)) {
      const a = ju(t, i, e.properties[i]);
      if (a) {
        const [s, o] = a;
        t.tableCellAlignToStyle && s === "align" && typeof o == "string" && Au.has(e.tagName) ? r = o : n[s] = o;
      }
    }
  if (r) {
    const a = (
      /** @type {Style} */
      n.style || (n.style = {})
    );
    a[t.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function Vu(t, e) {
  const n = {};
  for (const r of e.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && t.evaluater) {
        const a = r.data.estree.body[0];
        k(a.type === "ExpressionStatement");
        const s = a.expression;
        k(s.type === "ObjectExpression");
        const o = s.properties[0];
        k(o.type === "SpreadElement"), Object.assign(
          n,
          t.evaluater.evaluateExpression(o.argument)
        );
      } else
        Rn(t, e.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && t.evaluater) {
          const o = r.value.data.estree.body[0];
          k(o.type === "ExpressionStatement"), a = t.evaluater.evaluateExpression(o.expression);
        } else
          Rn(t, e.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function pi(t, e) {
  const n = [];
  let r = -1;
  const i = t.passKeys ? /* @__PURE__ */ new Map() : Iu;
  for (; ++r < e.children.length; ) {
    const a = e.children[r];
    let s;
    if (t.passKeys) {
      const c = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (c) {
        const u = i.get(c) || 0;
        s = c + "-" + u, i.set(c, u + 1);
      }
    }
    const o = Rs(t, a, s);
    o !== void 0 && n.push(o);
  }
  return n;
}
function ju(t, e, n) {
  const r = Yc(t.schema, e);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Hc(n) : eu(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Gu(t, String(n));
      return t.stylePropertyNameCase === "css" && (i = Wu(i)), ["style", i];
    }
    return [
      t.elementAttributeNameCase === "react" && r.space ? qc[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Gu(t, e) {
  try {
    return vu(e, { reactCompat: !0 });
  } catch (n) {
    if (t.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new Ye("Cannot parse `style` attribute", {
      ancestors: t.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = t.filePath || void 0, i.url = vs + "#cannot-parse-style-attribute", i;
  }
}
function Ns(t, e, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: e };
  else if (e.includes(".")) {
    const i = e.split(".");
    let a = -1, s;
    for (; ++a < i.length; ) {
      const o = na(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
      s = s ? {
        type: "MemberExpression",
        object: s,
        property: o,
        computed: !!(a && o.type === "Literal"),
        optional: !1
      } : o;
    }
    k(s, "always a result"), r = s;
  } else
    r = na(e) && !/^[a-z]/.test(e) ? { type: "Identifier", name: e } : { type: "Literal", value: e };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return hi.call(t.components, i) ? t.components[i] : i;
  }
  if (t.evaluater)
    return t.evaluater.evaluateExpression(r);
  Rn(t);
}
function Rn(t, e) {
  const n = new Ye(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: t.ancestors,
      place: e,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = t.filePath || void 0, n.url = vs + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Wu(t) {
  const e = {};
  let n;
  for (n in t)
    hi.call(t, n) && (e[qu(n)] = t[n]);
  return e;
}
function qu(t) {
  let e = t.replace(Nu, Ku);
  return e.slice(0, 3) === "ms-" && (e = "-" + e), e;
}
function Ku(t) {
  return "-" + t.toLowerCase();
}
const Tr = {
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
}, Zu = {};
function Yu(t, e) {
  const n = Zu, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Ms(t, r, i);
}
function Ms(t, e, n) {
  if (Xu(t)) {
    if ("value" in t)
      return t.type === "html" && !n ? "" : t.value;
    if (e && "alt" in t && t.alt)
      return t.alt;
    if ("children" in t)
      return pa(t.children, e, n);
  }
  return Array.isArray(t) ? pa(t, e, n) : "";
}
function pa(t, e, n) {
  const r = [];
  let i = -1;
  for (; ++i < t.length; )
    r[i] = Ms(t[i], e, n);
  return r.join("");
}
function Xu(t) {
  return !!(t && typeof t == "object");
}
const fa = document.createElement("i");
function fi(t) {
  const e = "&" + t + ";";
  fa.innerHTML = e;
  const n = fa.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && t !== "semi" || n === e ? !1 : n
  );
}
const g = (
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
), V = (
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
), p = (
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
), bt = (
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
function It(t, e, n, r) {
  const i = t.length;
  let a = 0, s;
  if (e < 0 ? e = -e > i ? 0 : i + e : e = e > i ? i : e, n = n > 0 ? n : 0, r.length < V.v8MaxSafeChunkSize)
    s = Array.from(r), s.unshift(e, n), t.splice(...s);
  else
    for (n && t.splice(e, n); a < r.length; )
      s = r.slice(
        a,
        a + V.v8MaxSafeChunkSize
      ), s.unshift(e, 0), t.splice(...s), a += V.v8MaxSafeChunkSize, e += V.v8MaxSafeChunkSize;
}
function ft(t, e) {
  return t.length > 0 ? (It(t, t.length, 0, e), t) : e;
}
const ga = {}.hasOwnProperty;
function Ju(t) {
  const e = {};
  let n = -1;
  for (; ++n < t.length; )
    Qu(e, t[n]);
  return e;
}
function Qu(t, e) {
  let n;
  for (n in e) {
    const i = (ga.call(t, n) ? t[n] : void 0) || (t[n] = {}), a = e[n];
    let s;
    if (a)
      for (s in a) {
        ga.call(i, s) || (i[s] = []);
        const o = a[s];
        eh(
          // @ts-expect-error Looks like a list.
          i[s],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function eh(t, e) {
  let n = -1;
  const r = [];
  for (; ++n < e.length; )
    (e[n].add === "after" ? t : r).push(e[n]);
  It(t, 0, 0, r);
}
function As(t, e) {
  const n = Number.parseInt(t, e);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < g.ht || n === g.vt || n > g.cr && n < g.space || // Control character (DEL) of C0, and C1 controls.
    n > g.tilde && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? bt.replacementCharacter : String.fromCodePoint(n)
  );
}
function an(t) {
  return t.replace(/[\t\n\r ]+/g, bt.space).replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const vt = Vt(/[A-Za-z]/), dt = Vt(/[\dA-Za-z]/), th = Vt(/[#-'*+\--9=?A-Z^-~]/);
function Zr(t) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    t !== null && (t < g.space || t === g.del)
  );
}
const Yr = Vt(/\d/), nh = Vt(/[\dA-Fa-f]/), rh = Vt(/[!-/:-@[-`{-~]/);
function K(t) {
  return t !== null && t < g.horizontalTab;
}
function st(t) {
  return t !== null && (t < g.nul || t === g.space);
}
function we(t) {
  return t === g.horizontalTab || t === g.virtualSpace || t === g.space;
}
const ih = Vt(new RegExp("\\p{P}|\\p{S}", "u")), ah = Vt(/\s/);
function Vt(t) {
  return e;
  function e(n) {
    return n !== null && n > -1 && t.test(String.fromCharCode(n));
  }
}
function cn(t) {
  const e = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < t.length; ) {
    const a = t.charCodeAt(n);
    let s = "";
    if (a === g.percentSign && dt(t.charCodeAt(n + 1)) && dt(t.charCodeAt(n + 2)))
      i = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (s = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const o = t.charCodeAt(n + 1);
      a < 56320 && o > 56319 && o < 57344 ? (s = String.fromCharCode(a, o), i = 1) : s = bt.replacementCharacter;
    } else
      s = String.fromCharCode(a);
    s && (e.push(t.slice(r, n), encodeURIComponent(s)), r = n + i + 1, s = ""), i && (n += i, i = 0);
  }
  return e.join("") + t.slice(r);
}
function _e(t, e, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return s;
  function s(c) {
    return we(c) ? (t.enter(n), o(c)) : e(c);
  }
  function o(c) {
    return we(c) && a++ < i ? (t.consume(c), o) : (t.exit(n), e(c));
  }
}
const sh = { tokenize: oh };
function oh(t) {
  const e = t.attempt(
    this.parser.constructs.contentInitial,
    r,
    i
  );
  let n;
  return e;
  function r(o) {
    if (k(
      o === g.eof || K(o),
      "expected eol or eof"
    ), o === g.eof) {
      t.consume(o);
      return;
    }
    return t.enter(p.lineEnding), t.consume(o), t.exit(p.lineEnding), _e(t, e, p.linePrefix);
  }
  function i(o) {
    return k(
      o !== g.eof && !K(o),
      "expected anything other than a line ending or EOF"
    ), t.enter(p.paragraph), a(o);
  }
  function a(o) {
    const c = t.enter(p.chunkText, {
      contentType: V.contentTypeText,
      previous: n
    });
    return n && (n.next = c), n = c, s(o);
  }
  function s(o) {
    if (o === g.eof) {
      t.exit(p.chunkText), t.exit(p.paragraph), t.consume(o);
      return;
    }
    return K(o) ? (t.consume(o), t.exit(p.chunkText), a) : (t.consume(o), s);
  }
}
const lh = { tokenize: ch }, ma = { tokenize: uh };
function ch(t) {
  const e = this, n = [];
  let r = 0, i, a, s;
  return o;
  function o(N) {
    if (r < n.length) {
      const A = n[r];
      return e.containerState = A[1], k(
        A[0].continuation,
        "expected `continuation` to be defined on container construct"
      ), t.attempt(
        A[0].continuation,
        c,
        u
      )(N);
    }
    return u(N);
  }
  function c(N) {
    if (k(
      e.containerState,
      "expected `containerState` to be defined after continuation"
    ), r++, e.containerState._closeFlow) {
      e.containerState._closeFlow = void 0, i && _();
      const A = e.events.length;
      let L = A, E;
      for (; L--; )
        if (e.events[L][0] === "exit" && e.events[L][1].type === p.chunkFlow) {
          E = e.events[L][1].end;
          break;
        }
      k(E, "could not find previous flow chunk"), T(r);
      let U = A;
      for (; U < e.events.length; )
        e.events[U][1].end = { ...E }, U++;
      return It(
        e.events,
        L + 1,
        0,
        e.events.slice(A)
      ), e.events.length = U, u(N);
    }
    return o(N);
  }
  function u(N) {
    if (r === n.length) {
      if (!i)
        return f(N);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return y(N);
      e.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return e.containerState = {}, t.check(
      ma,
      l,
      h
    )(N);
  }
  function l(N) {
    return i && _(), T(r), f(N);
  }
  function h(N) {
    return e.parser.lazy[e.now().line] = r !== n.length, s = e.now().offset, y(N);
  }
  function f(N) {
    return e.containerState = {}, t.attempt(
      ma,
      d,
      y
    )(N);
  }
  function d(N) {
    return k(
      e.currentConstruct,
      "expected `currentConstruct` to be defined on tokenizer"
    ), k(
      e.containerState,
      "expected `containerState` to be defined on tokenizer"
    ), r++, n.push([e.currentConstruct, e.containerState]), f(N);
  }
  function y(N) {
    if (N === g.eof) {
      i && _(), T(0), t.consume(N);
      return;
    }
    return i = i || e.parser.flow(e.now()), t.enter(p.chunkFlow, {
      _tokenizer: i,
      contentType: V.contentTypeFlow,
      previous: a
    }), x(N);
  }
  function x(N) {
    if (N === g.eof) {
      I(t.exit(p.chunkFlow), !0), T(0), t.consume(N);
      return;
    }
    return K(N) ? (t.consume(N), I(t.exit(p.chunkFlow)), r = 0, e.interrupt = void 0, o) : (t.consume(N), x);
  }
  function I(N, A) {
    k(i, "expected `childFlow` to be defined when continuing");
    const L = e.sliceStream(N);
    if (A && L.push(null), N.previous = a, a && (a.next = N), a = N, i.defineSkip(N.start), i.write(L), e.parser.lazy[N.start.line]) {
      let E = i.events.length;
      for (; E--; )
        if (
          // The token starts before the line ending…
          i.events[E][1].start.offset < s && // …and either is not ended yet…
          (!i.events[E][1].end || // …or ends after it.
          i.events[E][1].end.offset > s)
        )
          return;
      const U = e.events.length;
      let B = U, G, Z;
      for (; B--; )
        if (e.events[B][0] === "exit" && e.events[B][1].type === p.chunkFlow) {
          if (G) {
            Z = e.events[B][1].end;
            break;
          }
          G = !0;
        }
      for (k(Z, "could not find previous flow chunk"), T(r), E = U; E < e.events.length; )
        e.events[E][1].end = { ...Z }, E++;
      It(
        e.events,
        B + 1,
        0,
        e.events.slice(U)
      ), e.events.length = E;
    }
  }
  function T(N) {
    let A = n.length;
    for (; A-- > N; ) {
      const L = n[A];
      e.containerState = L[1], k(
        L[0].exit,
        "expected `exit` to be defined on container construct"
      ), L[0].exit.call(e, t);
    }
    n.length = N;
  }
  function _() {
    k(
      e.containerState,
      "expected `containerState` to be defined when closing flow"
    ), k(i, "expected `childFlow` to be defined when closing it"), i.write([g.eof]), a = void 0, i = void 0, e.containerState._closeFlow = void 0;
  }
}
function uh(t, e, n) {
  return k(
    this.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), _e(
    t,
    t.attempt(this.parser.constructs.document, e, n),
    p.linePrefix,
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : V.tabSize
  );
}
function Ca(t) {
  if (t === g.eof || st(t) || ah(t))
    return V.characterGroupWhitespace;
  if (ih(t))
    return V.characterGroupPunctuation;
}
function gi(t, e, n) {
  const r = [];
  let i = -1;
  for (; ++i < t.length; ) {
    const a = t[i].resolveAll;
    a && !r.includes(a) && (e = a(e, n), r.push(a));
  }
  return e;
}
const Xr = {
  name: "attention",
  resolveAll: hh,
  tokenize: dh
};
function hh(t, e) {
  let n = -1, r, i, a, s, o, c, u, l;
  for (; ++n < t.length; )
    if (t[n][0] === "enter" && t[n][1].type === "attentionSequence" && t[n][1]._close) {
      for (r = n; r--; )
        if (t[r][0] === "exit" && t[r][1].type === "attentionSequence" && t[r][1]._open && // If the markers are the same:
        e.sliceSerialize(t[r][1]).charCodeAt(0) === e.sliceSerialize(t[n][1]).charCodeAt(0)) {
          if ((t[r][1]._close || t[n][1]._open) && (t[n][1].end.offset - t[n][1].start.offset) % 3 && !((t[r][1].end.offset - t[r][1].start.offset + t[n][1].end.offset - t[n][1].start.offset) % 3))
            continue;
          c = t[r][1].end.offset - t[r][1].start.offset > 1 && t[n][1].end.offset - t[n][1].start.offset > 1 ? 2 : 1;
          const h = { ...t[r][1].end }, f = { ...t[n][1].start };
          ya(h, -c), ya(f, c), s = {
            type: c > 1 ? p.strongSequence : p.emphasisSequence,
            start: h,
            end: { ...t[r][1].end }
          }, o = {
            type: c > 1 ? p.strongSequence : p.emphasisSequence,
            start: { ...t[n][1].start },
            end: f
          }, a = {
            type: c > 1 ? p.strongText : p.emphasisText,
            start: { ...t[r][1].end },
            end: { ...t[n][1].start }
          }, i = {
            type: c > 1 ? p.strong : p.emphasis,
            start: { ...s.start },
            end: { ...o.end }
          }, t[r][1].end = { ...s.start }, t[n][1].start = { ...o.end }, u = [], t[r][1].end.offset - t[r][1].start.offset && (u = ft(u, [
            ["enter", t[r][1], e],
            ["exit", t[r][1], e]
          ])), u = ft(u, [
            ["enter", i, e],
            ["enter", s, e],
            ["exit", s, e],
            ["enter", a, e]
          ]), k(
            e.parser.constructs.insideSpan.null,
            "expected `insideSpan` to be populated"
          ), u = ft(
            u,
            gi(
              e.parser.constructs.insideSpan.null,
              t.slice(r + 1, n),
              e
            )
          ), u = ft(u, [
            ["exit", a, e],
            ["enter", o, e],
            ["exit", o, e],
            ["exit", i, e]
          ]), t[n][1].end.offset - t[n][1].start.offset ? (l = 2, u = ft(u, [
            ["enter", t[n][1], e],
            ["exit", t[n][1], e]
          ])) : l = 0, It(t, r - 1, n - r + 3, u), n = r + u.length - l - 2;
          break;
        }
    }
  for (n = -1; ++n < t.length; )
    t[n][1].type === "attentionSequence" && (t[n][1].type = "data");
  return t;
}
function dh(t, e) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Ca(r);
  let a;
  return s;
  function s(c) {
    return k(
      c === g.asterisk || c === g.underscore,
      "expected asterisk or underscore"
    ), a = c, t.enter("attentionSequence"), o(c);
  }
  function o(c) {
    if (c === a)
      return t.consume(c), o;
    const u = t.exit("attentionSequence"), l = Ca(c);
    k(n, "expected `attentionMarkers` to be populated");
    const h = !l || l === V.characterGroupPunctuation && i || n.includes(c), f = !i || i === V.characterGroupPunctuation && l || n.includes(r);
    return u._open = !!(a === g.asterisk ? h : h && (i || !f)), u._close = !!(a === g.asterisk ? f : f && (l || !h)), e(c);
  }
}
function ya(t, e) {
  t.column += e, t.offset += e, t._bufferIndex += e;
}
const ph = { name: "autolink", tokenize: fh };
function fh(t, e, n) {
  let r = 0;
  return i;
  function i(d) {
    return k(d === g.lessThan, "expected `<`"), t.enter(p.autolink), t.enter(p.autolinkMarker), t.consume(d), t.exit(p.autolinkMarker), t.enter(p.autolinkProtocol), a;
  }
  function a(d) {
    return vt(d) ? (t.consume(d), s) : d === g.atSign ? n(d) : u(d);
  }
  function s(d) {
    return d === g.plusSign || d === g.dash || d === g.dot || dt(d) ? (r = 1, o(d)) : u(d);
  }
  function o(d) {
    return d === g.colon ? (t.consume(d), r = 0, c) : (d === g.plusSign || d === g.dash || d === g.dot || dt(d)) && r++ < V.autolinkSchemeSizeMax ? (t.consume(d), o) : (r = 0, u(d));
  }
  function c(d) {
    return d === g.greaterThan ? (t.exit(p.autolinkProtocol), t.enter(p.autolinkMarker), t.consume(d), t.exit(p.autolinkMarker), t.exit(p.autolink), e) : d === g.eof || d === g.space || d === g.lessThan || Zr(d) ? n(d) : (t.consume(d), c);
  }
  function u(d) {
    return d === g.atSign ? (t.consume(d), l) : th(d) ? (t.consume(d), u) : n(d);
  }
  function l(d) {
    return dt(d) ? h(d) : n(d);
  }
  function h(d) {
    return d === g.dot ? (t.consume(d), r = 0, l) : d === g.greaterThan ? (t.exit(p.autolinkProtocol).type = p.autolinkEmail, t.enter(p.autolinkMarker), t.consume(d), t.exit(p.autolinkMarker), t.exit(p.autolink), e) : f(d);
  }
  function f(d) {
    if ((d === g.dash || dt(d)) && r++ < V.autolinkDomainSizeMax) {
      const y = d === g.dash ? f : h;
      return t.consume(d), y;
    }
    return n(d);
  }
}
const sr = { partial: !0, tokenize: gh };
function gh(t, e, n) {
  return r;
  function r(a) {
    return we(a) ? _e(t, i, p.linePrefix)(a) : i(a);
  }
  function i(a) {
    return a === g.eof || K(a) ? e(a) : n(a);
  }
}
const Os = {
  continuation: { tokenize: Ch },
  exit: yh,
  name: "blockQuote",
  tokenize: mh
};
function mh(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    if (s === g.greaterThan) {
      const o = r.containerState;
      return k(o, "expected `containerState` to be defined in container"), o.open || (t.enter(p.blockQuote, { _container: !0 }), o.open = !0), t.enter(p.blockQuotePrefix), t.enter(p.blockQuoteMarker), t.consume(s), t.exit(p.blockQuoteMarker), a;
    }
    return n(s);
  }
  function a(s) {
    return we(s) ? (t.enter(p.blockQuotePrefixWhitespace), t.consume(s), t.exit(p.blockQuotePrefixWhitespace), t.exit(p.blockQuotePrefix), e) : (t.exit(p.blockQuotePrefix), e(s));
  }
}
function Ch(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return we(s) ? (k(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), _e(
      t,
      a,
      p.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : V.tabSize
    )(s)) : a(s);
  }
  function a(s) {
    return t.attempt(Os, e, n)(s);
  }
}
function yh(t) {
  t.exit(p.blockQuote);
}
const Ls = {
  name: "characterEscape",
  tokenize: wh
};
function wh(t, e, n) {
  return r;
  function r(a) {
    return k(a === g.backslash, "expected `\\`"), t.enter(p.characterEscape), t.enter(p.escapeMarker), t.consume(a), t.exit(p.escapeMarker), i;
  }
  function i(a) {
    return rh(a) ? (t.enter(p.characterEscapeValue), t.consume(a), t.exit(p.characterEscapeValue), t.exit(p.characterEscape), e) : n(a);
  }
}
const Ps = {
  name: "characterReference",
  tokenize: Sh
};
function Sh(t, e, n) {
  const r = this;
  let i = 0, a, s;
  return o;
  function o(h) {
    return k(h === g.ampersand, "expected `&`"), t.enter(p.characterReference), t.enter(p.characterReferenceMarker), t.consume(h), t.exit(p.characterReferenceMarker), c;
  }
  function c(h) {
    return h === g.numberSign ? (t.enter(p.characterReferenceMarkerNumeric), t.consume(h), t.exit(p.characterReferenceMarkerNumeric), u) : (t.enter(p.characterReferenceValue), a = V.characterReferenceNamedSizeMax, s = dt, l(h));
  }
  function u(h) {
    return h === g.uppercaseX || h === g.lowercaseX ? (t.enter(p.characterReferenceMarkerHexadecimal), t.consume(h), t.exit(p.characterReferenceMarkerHexadecimal), t.enter(p.characterReferenceValue), a = V.characterReferenceHexadecimalSizeMax, s = nh, l) : (t.enter(p.characterReferenceValue), a = V.characterReferenceDecimalSizeMax, s = Yr, l(h));
  }
  function l(h) {
    if (h === g.semicolon && i) {
      const f = t.exit(p.characterReferenceValue);
      return s === dt && !fi(r.sliceSerialize(f)) ? n(h) : (t.enter(p.characterReferenceMarker), t.consume(h), t.exit(p.characterReferenceMarker), t.exit(p.characterReference), e);
    }
    return s(h) && i++ < a ? (t.consume(h), l) : n(h);
  }
}
const wa = {
  partial: !0,
  tokenize: kh
}, Sa = {
  concrete: !0,
  name: "codeFenced",
  tokenize: xh
};
function xh(t, e, n) {
  const r = this, i = { partial: !0, tokenize: L };
  let a = 0, s = 0, o;
  return c;
  function c(E) {
    return u(E);
  }
  function u(E) {
    k(
      E === g.graveAccent || E === g.tilde,
      "expected `` ` `` or `~`"
    );
    const U = r.events[r.events.length - 1];
    return a = U && U[1].type === p.linePrefix ? U[2].sliceSerialize(U[1], !0).length : 0, o = E, t.enter(p.codeFenced), t.enter(p.codeFencedFence), t.enter(p.codeFencedFenceSequence), l(E);
  }
  function l(E) {
    return E === o ? (s++, t.consume(E), l) : s < V.codeFencedSequenceSizeMin ? n(E) : (t.exit(p.codeFencedFenceSequence), we(E) ? _e(t, h, p.whitespace)(E) : h(E));
  }
  function h(E) {
    return E === g.eof || K(E) ? (t.exit(p.codeFencedFence), r.interrupt ? e(E) : t.check(wa, x, A)(E)) : (t.enter(p.codeFencedFenceInfo), t.enter(p.chunkString, { contentType: V.contentTypeString }), f(E));
  }
  function f(E) {
    return E === g.eof || K(E) ? (t.exit(p.chunkString), t.exit(p.codeFencedFenceInfo), h(E)) : we(E) ? (t.exit(p.chunkString), t.exit(p.codeFencedFenceInfo), _e(t, d, p.whitespace)(E)) : E === g.graveAccent && E === o ? n(E) : (t.consume(E), f);
  }
  function d(E) {
    return E === g.eof || K(E) ? h(E) : (t.enter(p.codeFencedFenceMeta), t.enter(p.chunkString, { contentType: V.contentTypeString }), y(E));
  }
  function y(E) {
    return E === g.eof || K(E) ? (t.exit(p.chunkString), t.exit(p.codeFencedFenceMeta), h(E)) : E === g.graveAccent && E === o ? n(E) : (t.consume(E), y);
  }
  function x(E) {
    return k(K(E), "expected eol"), t.attempt(i, A, I)(E);
  }
  function I(E) {
    return k(K(E), "expected eol"), t.enter(p.lineEnding), t.consume(E), t.exit(p.lineEnding), T;
  }
  function T(E) {
    return a > 0 && we(E) ? _e(
      t,
      _,
      p.linePrefix,
      a + 1
    )(E) : _(E);
  }
  function _(E) {
    return E === g.eof || K(E) ? t.check(wa, x, A)(E) : (t.enter(p.codeFlowValue), N(E));
  }
  function N(E) {
    return E === g.eof || K(E) ? (t.exit(p.codeFlowValue), _(E)) : (t.consume(E), N);
  }
  function A(E) {
    return t.exit(p.codeFenced), e(E);
  }
  function L(E, U, B) {
    let G = 0;
    return Z;
    function Z(H) {
      return k(K(H), "expected eol"), E.enter(p.lineEnding), E.consume(H), E.exit(p.lineEnding), W;
    }
    function W(H) {
      return k(
        r.parser.constructs.disable.null,
        "expected `disable.null` to be populated"
      ), E.enter(p.codeFencedFence), we(H) ? _e(
        E,
        z,
        p.linePrefix,
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : V.tabSize
      )(H) : z(H);
    }
    function z(H) {
      return H === o ? (E.enter(p.codeFencedFenceSequence), b(H)) : B(H);
    }
    function b(H) {
      return H === o ? (G++, E.consume(H), b) : G >= s ? (E.exit(p.codeFencedFenceSequence), we(H) ? _e(E, O, p.whitespace)(H) : O(H)) : B(H);
    }
    function O(H) {
      return H === g.eof || K(H) ? (E.exit(p.codeFencedFence), U(H)) : B(H);
    }
  }
}
function kh(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return s === g.eof ? n(s) : (k(K(s), "expected eol"), t.enter(p.lineEnding), t.consume(s), t.exit(p.lineEnding), a);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : e(s);
  }
}
const Er = {
  name: "codeIndented",
  tokenize: Eh
}, Th = { partial: !0, tokenize: bh };
function Eh(t, e, n) {
  const r = this;
  return i;
  function i(u) {
    return k(we(u)), t.enter(p.codeIndented), _e(
      t,
      a,
      p.linePrefix,
      V.tabSize + 1
    )(u);
  }
  function a(u) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === p.linePrefix && l[2].sliceSerialize(l[1], !0).length >= V.tabSize ? s(u) : n(u);
  }
  function s(u) {
    return u === g.eof ? c(u) : K(u) ? t.attempt(Th, s, c)(u) : (t.enter(p.codeFlowValue), o(u));
  }
  function o(u) {
    return u === g.eof || K(u) ? (t.exit(p.codeFlowValue), s(u)) : (t.consume(u), o);
  }
  function c(u) {
    return t.exit(p.codeIndented), e(u);
  }
}
function bh(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line] ? n(s) : K(s) ? (t.enter(p.lineEnding), t.consume(s), t.exit(p.lineEnding), i) : _e(
      t,
      a,
      p.linePrefix,
      V.tabSize + 1
    )(s);
  }
  function a(s) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === p.linePrefix && o[2].sliceSerialize(o[1], !0).length >= V.tabSize ? e(s) : K(s) ? i(s) : n(s);
  }
}
const _h = {
  name: "codeText",
  previous: Ds,
  resolve: vh,
  tokenize: Rh
};
function vh(t) {
  let e = t.length - 4, n = 3, r, i;
  if ((t[n][1].type === p.lineEnding || t[n][1].type === "space") && (t[e][1].type === p.lineEnding || t[e][1].type === "space")) {
    for (r = n; ++r < e; )
      if (t[r][1].type === p.codeTextData) {
        t[n][1].type = p.codeTextPadding, t[e][1].type = p.codeTextPadding, n += 2, e -= 2;
        break;
      }
  }
  for (r = n - 1, e++; ++r <= e; )
    i === void 0 ? r !== e && t[r][1].type !== p.lineEnding && (i = r) : (r === e || t[r][1].type === p.lineEnding) && (t[i][1].type = p.codeTextData, r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), e -= r - i - 2, r = i + 2), i = void 0);
  return t;
}
function Ds(t) {
  return t !== g.graveAccent || this.events[this.events.length - 1][1].type === p.characterEscape;
}
function Rh(t, e, n) {
  const r = this;
  let i = 0, a, s;
  return o;
  function o(f) {
    return k(f === g.graveAccent, "expected `` ` ``"), k(Ds.call(r, r.previous), "expected correct previous"), t.enter(p.codeText), t.enter(p.codeTextSequence), c(f);
  }
  function c(f) {
    return f === g.graveAccent ? (t.consume(f), i++, c) : (t.exit(p.codeTextSequence), u(f));
  }
  function u(f) {
    return f === g.eof ? n(f) : f === g.space ? (t.enter("space"), t.consume(f), t.exit("space"), u) : f === g.graveAccent ? (s = t.enter(p.codeTextSequence), a = 0, h(f)) : K(f) ? (t.enter(p.lineEnding), t.consume(f), t.exit(p.lineEnding), u) : (t.enter(p.codeTextData), l(f));
  }
  function l(f) {
    return f === g.eof || f === g.space || f === g.graveAccent || K(f) ? (t.exit(p.codeTextData), u(f)) : (t.consume(f), l);
  }
  function h(f) {
    return f === g.graveAccent ? (t.consume(f), a++, h) : a === i ? (t.exit(p.codeTextSequence), t.exit(p.codeText), e(f)) : (s.type = p.codeTextData, l(f));
  }
}
class Ih {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(e) {
    this.left = e ? [...e] : [], this.right = [];
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
  get(e) {
    if (e < 0 || e >= this.left.length + this.right.length)
      throw new RangeError(
        "Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`"
      );
    return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
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
  slice(e, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(e, r) : e > this.left.length ? this.right.slice(
      this.right.length - r + this.left.length,
      this.right.length - e + this.left.length
    ).reverse() : this.left.slice(e).concat(
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
  splice(e, n, r) {
    const i = n || 0;
    this.setCursor(Math.trunc(e));
    const a = this.right.splice(
      this.right.length - i,
      Number.POSITIVE_INFINITY
    );
    return r && wn(this.left, r), a.reverse();
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
  push(e) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(e);
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
  pushMany(e) {
    this.setCursor(Number.POSITIVE_INFINITY), wn(this.left, e);
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
  unshift(e) {
    this.setCursor(0), this.right.push(e);
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
  unshiftMany(e) {
    this.setCursor(0), wn(this.right, e.reverse());
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
  setCursor(e) {
    if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0))
      if (e < this.left.length) {
        const n = this.left.splice(e, Number.POSITIVE_INFINITY);
        wn(this.right, n.reverse());
      } else {
        const n = this.right.splice(
          this.left.length + this.right.length - e,
          Number.POSITIVE_INFINITY
        );
        wn(this.left, n.reverse());
      }
  }
}
function wn(t, e) {
  let n = 0;
  if (e.length < V.v8MaxSafeChunkSize)
    t.push(...e);
  else
    for (; n < e.length; )
      t.push(
        ...e.slice(n, n + V.v8MaxSafeChunkSize)
      ), n += V.v8MaxSafeChunkSize;
}
function Fs(t) {
  const e = {};
  let n = -1, r, i, a, s, o, c, u;
  const l = new Ih(t);
  for (; ++n < l.length; ) {
    for (; n in e; )
      n = e[n];
    if (r = l.get(n), n && r[1].type === p.chunkFlow && l.get(n - 1)[1].type === p.listItemPrefix && (k(r[1]._tokenizer, "expected `_tokenizer` on subtokens"), c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === p.lineEndingBlank && (a += 2), a < c.length && c[a][1].type === p.content))
      for (; ++a < c.length && c[a][1].type !== p.content; )
        c[a][1].type === p.chunkText && (c[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(e, Nh(l, n)), n = e[n], u = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (s = l.get(a), s[1].type === p.lineEnding || s[1].type === p.lineEndingBlank)
          s[0] === "enter" && (i && (l.get(i)[1].type = p.lineEndingBlank), s[1].type = p.lineEnding, i = a);
        else if (!(s[1].type === p.linePrefix || s[1].type === p.listItemIndent)) break;
      i && (r[1].end = { ...l.get(i)[1].start }, o = l.slice(i, n), o.unshift(r), l.splice(i, n - i + 1, o));
    }
  }
  return It(t, 0, Number.POSITIVE_INFINITY, l.slice(0)), !u;
}
function Nh(t, e) {
  const n = t.get(e)[1], r = t.get(e)[2];
  let i = e - 1;
  const a = [];
  k(n.contentType, "expected `contentType` on subtokens");
  let s = n._tokenizer;
  s || (s = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  const o = s.events, c = [], u = {};
  let l, h, f = -1, d = n, y = 0, x = 0;
  const I = [x];
  for (; d; ) {
    for (; t.get(++i)[1] !== d; )
      ;
    k(
      !h || d.previous === h,
      "expected previous to match"
    ), k(!h || h.next === d, "expected next to match"), a.push(i), d._tokenizer || (l = r.sliceStream(d), d.next || l.push(g.eof), h && s.defineSkip(d.start), d._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0), s.write(l), d._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)), h = d, d = d.next;
  }
  for (d = n; ++f < o.length; )
    // Find a void token that includes a break.
    o[f][0] === "exit" && o[f - 1][0] === "enter" && o[f][1].type === o[f - 1][1].type && o[f][1].start.line !== o[f][1].end.line && (k(d, "expected a current token"), x = f + 1, I.push(x), d._tokenizer = void 0, d.previous = void 0, d = d.next);
  for (s.events = [], d ? (d._tokenizer = void 0, d.previous = void 0, k(!d.next, "expected no next token")) : I.pop(), f = I.length; f--; ) {
    const T = o.slice(I[f], I[f + 1]), _ = a.pop();
    k(_ !== void 0, "expected a start position when splicing"), c.push([_, _ + T.length - 1]), t.splice(_, 2, T);
  }
  for (c.reverse(), f = -1; ++f < c.length; )
    u[y + c[f][0]] = y + c[f][1], y += c[f][1] - c[f][0] - 1;
  return u;
}
const Mh = { resolve: Oh, tokenize: Lh }, Ah = { partial: !0, tokenize: Ph };
function Oh(t) {
  return Fs(t), t;
}
function Lh(t, e) {
  let n;
  return r;
  function r(o) {
    return k(
      o !== g.eof && !K(o),
      "expected no eof or eol"
    ), t.enter(p.content), n = t.enter(p.chunkContent, {
      contentType: V.contentTypeContent
    }), i(o);
  }
  function i(o) {
    return o === g.eof ? a(o) : K(o) ? t.check(
      Ah,
      s,
      a
    )(o) : (t.consume(o), i);
  }
  function a(o) {
    return t.exit(p.chunkContent), t.exit(p.content), e(o);
  }
  function s(o) {
    return k(K(o), "expected eol"), t.consume(o), t.exit(p.chunkContent), k(n, "expected previous token"), n.next = t.enter(p.chunkContent, {
      contentType: V.contentTypeContent,
      previous: n
    }), n = n.next, i;
  }
}
function Ph(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return k(K(s), "expected a line ending"), t.exit(p.chunkContent), t.enter(p.lineEnding), t.consume(s), t.exit(p.lineEnding), _e(t, a, p.linePrefix);
  }
  function a(s) {
    if (s === g.eof || K(s))
      return n(s);
    k(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    );
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === p.linePrefix && o[2].sliceSerialize(o[1], !0).length >= V.tabSize ? e(s) : t.interrupt(r.parser.constructs.flow, n, e)(s);
  }
}
function Hs(t, e, n, r, i, a, s, o, c) {
  const u = c || Number.POSITIVE_INFINITY;
  let l = 0;
  return h;
  function h(T) {
    return T === g.lessThan ? (t.enter(r), t.enter(i), t.enter(a), t.consume(T), t.exit(a), f) : T === g.eof || T === g.space || T === g.rightParenthesis || Zr(T) ? n(T) : (t.enter(r), t.enter(s), t.enter(o), t.enter(p.chunkString, { contentType: V.contentTypeString }), x(T));
  }
  function f(T) {
    return T === g.greaterThan ? (t.enter(a), t.consume(T), t.exit(a), t.exit(i), t.exit(r), e) : (t.enter(o), t.enter(p.chunkString, { contentType: V.contentTypeString }), d(T));
  }
  function d(T) {
    return T === g.greaterThan ? (t.exit(p.chunkString), t.exit(o), f(T)) : T === g.eof || T === g.lessThan || K(T) ? n(T) : (t.consume(T), T === g.backslash ? y : d);
  }
  function y(T) {
    return T === g.lessThan || T === g.greaterThan || T === g.backslash ? (t.consume(T), d) : d(T);
  }
  function x(T) {
    return !l && (T === g.eof || T === g.rightParenthesis || st(T)) ? (t.exit(p.chunkString), t.exit(o), t.exit(s), t.exit(r), e(T)) : l < u && T === g.leftParenthesis ? (t.consume(T), l++, x) : T === g.rightParenthesis ? (t.consume(T), l--, x) : T === g.eof || T === g.space || T === g.leftParenthesis || Zr(T) ? n(T) : (t.consume(T), T === g.backslash ? I : x);
  }
  function I(T) {
    return T === g.leftParenthesis || T === g.rightParenthesis || T === g.backslash ? (t.consume(T), x) : x(T);
  }
}
function zs(t, e, n, r, i, a) {
  const s = this;
  let o = 0, c;
  return u;
  function u(d) {
    return k(d === g.leftSquareBracket, "expected `[`"), t.enter(r), t.enter(i), t.consume(d), t.exit(i), t.enter(a), l;
  }
  function l(d) {
    return o > V.linkReferenceSizeMax || d === g.eof || d === g.leftSquareBracket || d === g.rightSquareBracket && !c || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    d === g.caret && !o && "_hiddenFootnoteSupport" in s.parser.constructs ? n(d) : d === g.rightSquareBracket ? (t.exit(a), t.enter(i), t.consume(d), t.exit(i), t.exit(r), e) : K(d) ? (t.enter(p.lineEnding), t.consume(d), t.exit(p.lineEnding), l) : (t.enter(p.chunkString, { contentType: V.contentTypeString }), h(d));
  }
  function h(d) {
    return d === g.eof || d === g.leftSquareBracket || d === g.rightSquareBracket || K(d) || o++ > V.linkReferenceSizeMax ? (t.exit(p.chunkString), l(d)) : (t.consume(d), c || (c = !we(d)), d === g.backslash ? f : h);
  }
  function f(d) {
    return d === g.leftSquareBracket || d === g.backslash || d === g.rightSquareBracket ? (t.consume(d), o++, h) : h(d);
  }
}
function Us(t, e, n, r, i, a) {
  let s;
  return o;
  function o(f) {
    return f === g.quotationMark || f === g.apostrophe || f === g.leftParenthesis ? (t.enter(r), t.enter(i), t.consume(f), t.exit(i), s = f === g.leftParenthesis ? g.rightParenthesis : f, c) : n(f);
  }
  function c(f) {
    return f === s ? (t.enter(i), t.consume(f), t.exit(i), t.exit(r), e) : (t.enter(a), u(f));
  }
  function u(f) {
    return f === s ? (t.exit(a), c(s)) : f === g.eof ? n(f) : K(f) ? (t.enter(p.lineEnding), t.consume(f), t.exit(p.lineEnding), _e(t, u, p.linePrefix)) : (t.enter(p.chunkString, { contentType: V.contentTypeString }), l(f));
  }
  function l(f) {
    return f === s || f === g.eof || K(f) ? (t.exit(p.chunkString), u(f)) : (t.consume(f), f === g.backslash ? h : l);
  }
  function h(f) {
    return f === s || f === g.backslash ? (t.consume(f), l) : l(f);
  }
}
function En(t, e) {
  let n;
  return r;
  function r(i) {
    return K(i) ? (t.enter(p.lineEnding), t.consume(i), t.exit(p.lineEnding), n = !0, r) : we(i) ? _e(
      t,
      r,
      n ? p.linePrefix : p.lineSuffix
    )(i) : e(i);
  }
}
const Dh = { name: "definition", tokenize: Hh }, Fh = { partial: !0, tokenize: zh };
function Hh(t, e, n) {
  const r = this;
  let i;
  return a;
  function a(d) {
    return t.enter(p.definition), s(d);
  }
  function s(d) {
    return k(d === g.leftSquareBracket, "expected `[`"), zs.call(
      r,
      t,
      o,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      p.definitionLabel,
      p.definitionLabelMarker,
      p.definitionLabelString
    )(d);
  }
  function o(d) {
    return i = an(
      r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
    ), d === g.colon ? (t.enter(p.definitionMarker), t.consume(d), t.exit(p.definitionMarker), c) : n(d);
  }
  function c(d) {
    return st(d) ? En(t, u)(d) : u(d);
  }
  function u(d) {
    return Hs(
      t,
      l,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      p.definitionDestination,
      p.definitionDestinationLiteral,
      p.definitionDestinationLiteralMarker,
      p.definitionDestinationRaw,
      p.definitionDestinationString
    )(d);
  }
  function l(d) {
    return t.attempt(Fh, h, h)(d);
  }
  function h(d) {
    return we(d) ? _e(t, f, p.whitespace)(d) : f(d);
  }
  function f(d) {
    return d === g.eof || K(d) ? (t.exit(p.definition), r.parser.defined.push(i), e(d)) : n(d);
  }
}
function zh(t, e, n) {
  return r;
  function r(o) {
    return st(o) ? En(t, i)(o) : n(o);
  }
  function i(o) {
    return Us(
      t,
      a,
      n,
      p.definitionTitle,
      p.definitionTitleMarker,
      p.definitionTitleString
    )(o);
  }
  function a(o) {
    return we(o) ? _e(
      t,
      s,
      p.whitespace
    )(o) : s(o);
  }
  function s(o) {
    return o === g.eof || K(o) ? e(o) : n(o);
  }
}
const Uh = {
  name: "hardBreakEscape",
  tokenize: Bh
};
function Bh(t, e, n) {
  return r;
  function r(a) {
    return k(a === g.backslash, "expected `\\`"), t.enter(p.hardBreakEscape), t.consume(a), i;
  }
  function i(a) {
    return K(a) ? (t.exit(p.hardBreakEscape), e(a)) : n(a);
  }
}
const $h = {
  name: "headingAtx",
  resolve: Vh,
  tokenize: jh
};
function Vh(t, e) {
  let n = t.length - 2, r = 3, i, a;
  return t[r][1].type === p.whitespace && (r += 2), n - 2 > r && t[n][1].type === p.whitespace && (n -= 2), t[n][1].type === p.atxHeadingSequence && (r === n - 1 || n - 4 > r && t[n - 2][1].type === p.whitespace) && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: p.atxHeadingText,
    start: t[r][1].start,
    end: t[n][1].end
  }, a = {
    type: p.chunkText,
    start: t[r][1].start,
    end: t[n][1].end,
    contentType: V.contentTypeText
  }, It(t, r, n - r + 1, [
    ["enter", i, e],
    ["enter", a, e],
    ["exit", a, e],
    ["exit", i, e]
  ])), t;
}
function jh(t, e, n) {
  let r = 0;
  return i;
  function i(l) {
    return t.enter(p.atxHeading), a(l);
  }
  function a(l) {
    return k(l === g.numberSign, "expected `#`"), t.enter(p.atxHeadingSequence), s(l);
  }
  function s(l) {
    return l === g.numberSign && r++ < V.atxHeadingOpeningFenceSizeMax ? (t.consume(l), s) : l === g.eof || st(l) ? (t.exit(p.atxHeadingSequence), o(l)) : n(l);
  }
  function o(l) {
    return l === g.numberSign ? (t.enter(p.atxHeadingSequence), c(l)) : l === g.eof || K(l) ? (t.exit(p.atxHeading), e(l)) : we(l) ? _e(t, o, p.whitespace)(l) : (t.enter(p.atxHeadingText), u(l));
  }
  function c(l) {
    return l === g.numberSign ? (t.consume(l), c) : (t.exit(p.atxHeadingSequence), o(l));
  }
  function u(l) {
    return l === g.eof || l === g.numberSign || st(l) ? (t.exit(p.atxHeadingText), o(l)) : (t.consume(l), u);
  }
}
const Gh = [
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
], xa = ["pre", "script", "style", "textarea"], Wh = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Zh,
  tokenize: Yh
}, qh = { partial: !0, tokenize: Jh }, Kh = {
  partial: !0,
  tokenize: Xh
};
function Zh(t) {
  let e = t.length;
  for (; e-- && !(t[e][0] === "enter" && t[e][1].type === p.htmlFlow); )
    ;
  return e > 1 && t[e - 2][1].type === p.linePrefix && (t[e][1].start = t[e - 2][1].start, t[e + 1][1].start = t[e - 2][1].start, t.splice(e - 2, 2)), t;
}
function Yh(t, e, n) {
  const r = this;
  let i, a, s, o, c;
  return u;
  function u(C) {
    return l(C);
  }
  function l(C) {
    return k(C === g.lessThan, "expected `<`"), t.enter(p.htmlFlow), t.enter(p.htmlFlowData), t.consume(C), h;
  }
  function h(C) {
    return C === g.exclamationMark ? (t.consume(C), f) : C === g.slash ? (t.consume(C), a = !0, x) : C === g.questionMark ? (t.consume(C), i = V.htmlInstruction, r.interrupt ? e : w) : vt(C) ? (k(C !== null), t.consume(C), s = String.fromCharCode(C), I) : n(C);
  }
  function f(C) {
    return C === g.dash ? (t.consume(C), i = V.htmlComment, d) : C === g.leftSquareBracket ? (t.consume(C), i = V.htmlCdata, o = 0, y) : vt(C) ? (t.consume(C), i = V.htmlDeclaration, r.interrupt ? e : w) : n(C);
  }
  function d(C) {
    return C === g.dash ? (t.consume(C), r.interrupt ? e : w) : n(C);
  }
  function y(C) {
    const re = V.cdataOpeningString;
    return C === re.charCodeAt(o++) ? (t.consume(C), o === re.length ? r.interrupt ? e : z : y) : n(C);
  }
  function x(C) {
    return vt(C) ? (k(C !== null), t.consume(C), s = String.fromCharCode(C), I) : n(C);
  }
  function I(C) {
    if (C === g.eof || C === g.slash || C === g.greaterThan || st(C)) {
      const re = C === g.slash, q = s.toLowerCase();
      return !re && !a && xa.includes(q) ? (i = V.htmlRaw, r.interrupt ? e(C) : z(C)) : Gh.includes(s.toLowerCase()) ? (i = V.htmlBasic, re ? (t.consume(C), T) : r.interrupt ? e(C) : z(C)) : (i = V.htmlComplete, r.interrupt && !r.parser.lazy[r.now().line] ? n(C) : a ? _(C) : N(C));
    }
    return C === g.dash || dt(C) ? (t.consume(C), s += String.fromCharCode(C), I) : n(C);
  }
  function T(C) {
    return C === g.greaterThan ? (t.consume(C), r.interrupt ? e : z) : n(C);
  }
  function _(C) {
    return we(C) ? (t.consume(C), _) : Z(C);
  }
  function N(C) {
    return C === g.slash ? (t.consume(C), Z) : C === g.colon || C === g.underscore || vt(C) ? (t.consume(C), A) : we(C) ? (t.consume(C), N) : Z(C);
  }
  function A(C) {
    return C === g.dash || C === g.dot || C === g.colon || C === g.underscore || dt(C) ? (t.consume(C), A) : L(C);
  }
  function L(C) {
    return C === g.equalsTo ? (t.consume(C), E) : we(C) ? (t.consume(C), L) : N(C);
  }
  function E(C) {
    return C === g.eof || C === g.lessThan || C === g.equalsTo || C === g.greaterThan || C === g.graveAccent ? n(C) : C === g.quotationMark || C === g.apostrophe ? (t.consume(C), c = C, U) : we(C) ? (t.consume(C), E) : B(C);
  }
  function U(C) {
    return C === c ? (t.consume(C), c = null, G) : C === g.eof || K(C) ? n(C) : (t.consume(C), U);
  }
  function B(C) {
    return C === g.eof || C === g.quotationMark || C === g.apostrophe || C === g.slash || C === g.lessThan || C === g.equalsTo || C === g.greaterThan || C === g.graveAccent || st(C) ? L(C) : (t.consume(C), B);
  }
  function G(C) {
    return C === g.slash || C === g.greaterThan || we(C) ? N(C) : n(C);
  }
  function Z(C) {
    return C === g.greaterThan ? (t.consume(C), W) : n(C);
  }
  function W(C) {
    return C === g.eof || K(C) ? z(C) : we(C) ? (t.consume(C), W) : n(C);
  }
  function z(C) {
    return C === g.dash && i === V.htmlComment ? (t.consume(C), ee) : C === g.lessThan && i === V.htmlRaw ? (t.consume(C), ie) : C === g.greaterThan && i === V.htmlDeclaration ? (t.consume(C), Q) : C === g.questionMark && i === V.htmlInstruction ? (t.consume(C), w) : C === g.rightSquareBracket && i === V.htmlCdata ? (t.consume(C), Ce) : K(C) && (i === V.htmlBasic || i === V.htmlComplete) ? (t.exit(p.htmlFlowData), t.check(
      qh,
      $,
      b
    )(C)) : C === g.eof || K(C) ? (t.exit(p.htmlFlowData), b(C)) : (t.consume(C), z);
  }
  function b(C) {
    return t.check(
      Kh,
      O,
      $
    )(C);
  }
  function O(C) {
    return k(K(C)), t.enter(p.lineEnding), t.consume(C), t.exit(p.lineEnding), H;
  }
  function H(C) {
    return C === g.eof || K(C) ? b(C) : (t.enter(p.htmlFlowData), z(C));
  }
  function ee(C) {
    return C === g.dash ? (t.consume(C), w) : z(C);
  }
  function ie(C) {
    return C === g.slash ? (t.consume(C), s = "", ge) : z(C);
  }
  function ge(C) {
    if (C === g.greaterThan) {
      const re = s.toLowerCase();
      return xa.includes(re) ? (t.consume(C), Q) : z(C);
    }
    return vt(C) && s.length < V.htmlRawSizeMax ? (k(C !== null), t.consume(C), s += String.fromCharCode(C), ge) : z(C);
  }
  function Ce(C) {
    return C === g.rightSquareBracket ? (t.consume(C), w) : z(C);
  }
  function w(C) {
    return C === g.greaterThan ? (t.consume(C), Q) : C === g.dash && i === V.htmlComment ? (t.consume(C), w) : z(C);
  }
  function Q(C) {
    return C === g.eof || K(C) ? (t.exit(p.htmlFlowData), $(C)) : (t.consume(C), Q);
  }
  function $(C) {
    return t.exit(p.htmlFlow), e(C);
  }
}
function Xh(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return K(s) ? (t.enter(p.lineEnding), t.consume(s), t.exit(p.lineEnding), a) : n(s);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : e(s);
  }
}
function Jh(t, e, n) {
  return r;
  function r(i) {
    return k(K(i), "expected a line ending"), t.enter(p.lineEnding), t.consume(i), t.exit(p.lineEnding), t.attempt(sr, e, n);
  }
}
const Qh = { name: "htmlText", tokenize: ed };
function ed(t, e, n) {
  const r = this;
  let i, a, s;
  return o;
  function o(w) {
    return k(w === g.lessThan, "expected `<`"), t.enter(p.htmlText), t.enter(p.htmlTextData), t.consume(w), c;
  }
  function c(w) {
    return w === g.exclamationMark ? (t.consume(w), u) : w === g.slash ? (t.consume(w), L) : w === g.questionMark ? (t.consume(w), N) : vt(w) ? (t.consume(w), B) : n(w);
  }
  function u(w) {
    return w === g.dash ? (t.consume(w), l) : w === g.leftSquareBracket ? (t.consume(w), a = 0, y) : vt(w) ? (t.consume(w), _) : n(w);
  }
  function l(w) {
    return w === g.dash ? (t.consume(w), d) : n(w);
  }
  function h(w) {
    return w === g.eof ? n(w) : w === g.dash ? (t.consume(w), f) : K(w) ? (s = h, ie(w)) : (t.consume(w), h);
  }
  function f(w) {
    return w === g.dash ? (t.consume(w), d) : h(w);
  }
  function d(w) {
    return w === g.greaterThan ? ee(w) : w === g.dash ? f(w) : h(w);
  }
  function y(w) {
    const Q = V.cdataOpeningString;
    return w === Q.charCodeAt(a++) ? (t.consume(w), a === Q.length ? x : y) : n(w);
  }
  function x(w) {
    return w === g.eof ? n(w) : w === g.rightSquareBracket ? (t.consume(w), I) : K(w) ? (s = x, ie(w)) : (t.consume(w), x);
  }
  function I(w) {
    return w === g.rightSquareBracket ? (t.consume(w), T) : x(w);
  }
  function T(w) {
    return w === g.greaterThan ? ee(w) : w === g.rightSquareBracket ? (t.consume(w), T) : x(w);
  }
  function _(w) {
    return w === g.eof || w === g.greaterThan ? ee(w) : K(w) ? (s = _, ie(w)) : (t.consume(w), _);
  }
  function N(w) {
    return w === g.eof ? n(w) : w === g.questionMark ? (t.consume(w), A) : K(w) ? (s = N, ie(w)) : (t.consume(w), N);
  }
  function A(w) {
    return w === g.greaterThan ? ee(w) : N(w);
  }
  function L(w) {
    return vt(w) ? (t.consume(w), E) : n(w);
  }
  function E(w) {
    return w === g.dash || dt(w) ? (t.consume(w), E) : U(w);
  }
  function U(w) {
    return K(w) ? (s = U, ie(w)) : we(w) ? (t.consume(w), U) : ee(w);
  }
  function B(w) {
    return w === g.dash || dt(w) ? (t.consume(w), B) : w === g.slash || w === g.greaterThan || st(w) ? G(w) : n(w);
  }
  function G(w) {
    return w === g.slash ? (t.consume(w), ee) : w === g.colon || w === g.underscore || vt(w) ? (t.consume(w), Z) : K(w) ? (s = G, ie(w)) : we(w) ? (t.consume(w), G) : ee(w);
  }
  function Z(w) {
    return w === g.dash || w === g.dot || w === g.colon || w === g.underscore || dt(w) ? (t.consume(w), Z) : W(w);
  }
  function W(w) {
    return w === g.equalsTo ? (t.consume(w), z) : K(w) ? (s = W, ie(w)) : we(w) ? (t.consume(w), W) : G(w);
  }
  function z(w) {
    return w === g.eof || w === g.lessThan || w === g.equalsTo || w === g.greaterThan || w === g.graveAccent ? n(w) : w === g.quotationMark || w === g.apostrophe ? (t.consume(w), i = w, b) : K(w) ? (s = z, ie(w)) : we(w) ? (t.consume(w), z) : (t.consume(w), O);
  }
  function b(w) {
    return w === i ? (t.consume(w), i = void 0, H) : w === g.eof ? n(w) : K(w) ? (s = b, ie(w)) : (t.consume(w), b);
  }
  function O(w) {
    return w === g.eof || w === g.quotationMark || w === g.apostrophe || w === g.lessThan || w === g.equalsTo || w === g.graveAccent ? n(w) : w === g.slash || w === g.greaterThan || st(w) ? G(w) : (t.consume(w), O);
  }
  function H(w) {
    return w === g.slash || w === g.greaterThan || st(w) ? G(w) : n(w);
  }
  function ee(w) {
    return w === g.greaterThan ? (t.consume(w), t.exit(p.htmlTextData), t.exit(p.htmlText), e) : n(w);
  }
  function ie(w) {
    return k(s, "expected return state"), k(K(w), "expected eol"), t.exit(p.htmlTextData), t.enter(p.lineEnding), t.consume(w), t.exit(p.lineEnding), ge;
  }
  function ge(w) {
    return k(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), we(w) ? _e(
      t,
      Ce,
      p.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : V.tabSize
    )(w) : Ce(w);
  }
  function Ce(w) {
    return t.enter(p.htmlTextData), s(w);
  }
}
const mi = {
  name: "labelEnd",
  resolveAll: id,
  resolveTo: ad,
  tokenize: sd
}, td = { tokenize: od }, nd = { tokenize: ld }, rd = { tokenize: cd };
function id(t) {
  let e = -1;
  const n = [];
  for (; ++e < t.length; ) {
    const r = t[e][1];
    if (n.push(t[e]), r.type === p.labelImage || r.type === p.labelLink || r.type === p.labelEnd) {
      const i = r.type === p.labelImage ? 4 : 2;
      r.type = p.data, e += i;
    }
  }
  return t.length !== n.length && It(t, 0, t.length, n), t;
}
function ad(t, e) {
  let n = t.length, r = 0, i, a, s, o;
  for (; n--; )
    if (i = t[n][1], a) {
      if (i.type === p.link || i.type === p.labelLink && i._inactive)
        break;
      t[n][0] === "enter" && i.type === p.labelLink && (i._inactive = !0);
    } else if (s) {
      if (t[n][0] === "enter" && (i.type === p.labelImage || i.type === p.labelLink) && !i._balanced && (a = n, i.type !== p.labelLink)) {
        r = 2;
        break;
      }
    } else i.type === p.labelEnd && (s = n);
  k(a !== void 0, "`open` is supposed to be found"), k(s !== void 0, "`close` is supposed to be found");
  const c = {
    type: t[a][1].type === p.labelLink ? p.link : p.image,
    start: { ...t[a][1].start },
    end: { ...t[t.length - 1][1].end }
  }, u = {
    type: p.label,
    start: { ...t[a][1].start },
    end: { ...t[s][1].end }
  }, l = {
    type: p.labelText,
    start: { ...t[a + r + 2][1].end },
    end: { ...t[s - 2][1].start }
  };
  return o = [
    ["enter", c, e],
    ["enter", u, e]
  ], o = ft(o, t.slice(a + 1, a + r + 3)), o = ft(o, [["enter", l, e]]), k(
    e.parser.constructs.insideSpan.null,
    "expected `insideSpan.null` to be populated"
  ), o = ft(
    o,
    gi(
      e.parser.constructs.insideSpan.null,
      t.slice(a + r + 4, s - 3),
      e
    )
  ), o = ft(o, [
    ["exit", l, e],
    t[s - 2],
    t[s - 1],
    ["exit", u, e]
  ]), o = ft(o, t.slice(s + 1)), o = ft(o, [["exit", c, e]]), It(t, a, t.length, o), t;
}
function sd(t, e, n) {
  const r = this;
  let i = r.events.length, a, s;
  for (; i--; )
    if ((r.events[i][1].type === p.labelImage || r.events[i][1].type === p.labelLink) && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return o;
  function o(f) {
    return k(f === g.rightSquareBracket, "expected `]`"), a ? a._inactive ? h(f) : (s = r.parser.defined.includes(
      an(
        r.sliceSerialize({ start: a.end, end: r.now() })
      )
    ), t.enter(p.labelEnd), t.enter(p.labelMarker), t.consume(f), t.exit(p.labelMarker), t.exit(p.labelEnd), c) : n(f);
  }
  function c(f) {
    return f === g.leftParenthesis ? t.attempt(
      td,
      l,
      s ? l : h
    )(f) : f === g.leftSquareBracket ? t.attempt(
      nd,
      l,
      s ? u : h
    )(f) : s ? l(f) : h(f);
  }
  function u(f) {
    return t.attempt(
      rd,
      l,
      h
    )(f);
  }
  function l(f) {
    return e(f);
  }
  function h(f) {
    return a._balanced = !0, n(f);
  }
}
function od(t, e, n) {
  return r;
  function r(h) {
    return k(h === g.leftParenthesis, "expected left paren"), t.enter(p.resource), t.enter(p.resourceMarker), t.consume(h), t.exit(p.resourceMarker), i;
  }
  function i(h) {
    return st(h) ? En(t, a)(h) : a(h);
  }
  function a(h) {
    return h === g.rightParenthesis ? l(h) : Hs(
      t,
      s,
      o,
      p.resourceDestination,
      p.resourceDestinationLiteral,
      p.resourceDestinationLiteralMarker,
      p.resourceDestinationRaw,
      p.resourceDestinationString,
      V.linkResourceDestinationBalanceMax
    )(h);
  }
  function s(h) {
    return st(h) ? En(t, c)(h) : l(h);
  }
  function o(h) {
    return n(h);
  }
  function c(h) {
    return h === g.quotationMark || h === g.apostrophe || h === g.leftParenthesis ? Us(
      t,
      u,
      n,
      p.resourceTitle,
      p.resourceTitleMarker,
      p.resourceTitleString
    )(h) : l(h);
  }
  function u(h) {
    return st(h) ? En(t, l)(h) : l(h);
  }
  function l(h) {
    return h === g.rightParenthesis ? (t.enter(p.resourceMarker), t.consume(h), t.exit(p.resourceMarker), t.exit(p.resource), e) : n(h);
  }
}
function ld(t, e, n) {
  const r = this;
  return i;
  function i(o) {
    return k(o === g.leftSquareBracket, "expected left bracket"), zs.call(
      r,
      t,
      a,
      s,
      p.reference,
      p.referenceMarker,
      p.referenceString
    )(o);
  }
  function a(o) {
    return r.parser.defined.includes(
      an(
        r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
      )
    ) ? e(o) : n(o);
  }
  function s(o) {
    return n(o);
  }
}
function cd(t, e, n) {
  return r;
  function r(a) {
    return k(a === g.leftSquareBracket, "expected left bracket"), t.enter(p.reference), t.enter(p.referenceMarker), t.consume(a), t.exit(p.referenceMarker), i;
  }
  function i(a) {
    return a === g.rightSquareBracket ? (t.enter(p.referenceMarker), t.consume(a), t.exit(p.referenceMarker), t.exit(p.reference), e) : n(a);
  }
}
const ud = {
  name: "labelStartImage",
  resolveAll: mi.resolveAll,
  tokenize: hd
};
function hd(t, e, n) {
  const r = this;
  return i;
  function i(o) {
    return k(o === g.exclamationMark, "expected `!`"), t.enter(p.labelImage), t.enter(p.labelImageMarker), t.consume(o), t.exit(p.labelImageMarker), a;
  }
  function a(o) {
    return o === g.leftSquareBracket ? (t.enter(p.labelMarker), t.consume(o), t.exit(p.labelMarker), t.exit(p.labelImage), s) : n(o);
  }
  function s(o) {
    return o === g.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : e(o);
  }
}
const dd = {
  name: "labelStartLink",
  resolveAll: mi.resolveAll,
  tokenize: pd
};
function pd(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return k(s === g.leftSquareBracket, "expected `[`"), t.enter(p.labelLink), t.enter(p.labelMarker), t.consume(s), t.exit(p.labelMarker), t.exit(p.labelLink), a;
  }
  function a(s) {
    return s === g.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : e(s);
  }
}
const br = { name: "lineEnding", tokenize: fd };
function fd(t, e) {
  return n;
  function n(r) {
    return k(K(r), "expected eol"), t.enter(p.lineEnding), t.consume(r), t.exit(p.lineEnding), _e(t, e, p.linePrefix);
  }
}
const Zn = {
  name: "thematicBreak",
  tokenize: gd
};
function gd(t, e, n) {
  let r = 0, i;
  return a;
  function a(u) {
    return t.enter(p.thematicBreak), s(u);
  }
  function s(u) {
    return k(
      u === g.asterisk || u === g.dash || u === g.underscore,
      "expected `*`, `-`, or `_`"
    ), i = u, o(u);
  }
  function o(u) {
    return u === i ? (t.enter(p.thematicBreakSequence), c(u)) : r >= V.thematicBreakMarkerCountMin && (u === g.eof || K(u)) ? (t.exit(p.thematicBreak), e(u)) : n(u);
  }
  function c(u) {
    return u === i ? (t.consume(u), r++, c) : (t.exit(p.thematicBreakSequence), we(u) ? _e(t, o, p.whitespace)(u) : o(u));
  }
}
const at = {
  continuation: { tokenize: wd },
  exit: xd,
  name: "list",
  tokenize: yd
}, md = {
  partial: !0,
  tokenize: kd
}, Cd = { partial: !0, tokenize: Sd };
function yd(t, e, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === p.linePrefix ? i[2].sliceSerialize(i[1], !0).length : 0, s = 0;
  return o;
  function o(d) {
    k(r.containerState, "expected state");
    const y = r.containerState.type || (d === g.asterisk || d === g.plusSign || d === g.dash ? p.listUnordered : p.listOrdered);
    if (y === p.listUnordered ? !r.containerState.marker || d === r.containerState.marker : Yr(d)) {
      if (r.containerState.type || (r.containerState.type = y, t.enter(y, { _container: !0 })), y === p.listUnordered)
        return t.enter(p.listItemPrefix), d === g.asterisk || d === g.dash ? t.check(Zn, n, u)(d) : u(d);
      if (!r.interrupt || d === g.digit1)
        return t.enter(p.listItemPrefix), t.enter(p.listItemValue), c(d);
    }
    return n(d);
  }
  function c(d) {
    return k(r.containerState, "expected state"), Yr(d) && ++s < V.listItemValueSizeMax ? (t.consume(d), c) : (!r.interrupt || s < 2) && (r.containerState.marker ? d === r.containerState.marker : d === g.rightParenthesis || d === g.dot) ? (t.exit(p.listItemValue), u(d)) : n(d);
  }
  function u(d) {
    return k(r.containerState, "expected state"), k(d !== g.eof, "eof (`null`) is not a marker"), t.enter(p.listItemMarker), t.consume(d), t.exit(p.listItemMarker), r.containerState.marker = r.containerState.marker || d, t.check(
      sr,
      // Can’t be empty when interrupting.
      r.interrupt ? n : l,
      t.attempt(
        md,
        f,
        h
      )
    );
  }
  function l(d) {
    return k(r.containerState, "expected state"), r.containerState.initialBlankLine = !0, a++, f(d);
  }
  function h(d) {
    return we(d) ? (t.enter(p.listItemPrefixWhitespace), t.consume(d), t.exit(p.listItemPrefixWhitespace), f) : n(d);
  }
  function f(d) {
    return k(r.containerState, "expected state"), r.containerState.size = a + r.sliceSerialize(t.exit(p.listItemPrefix), !0).length, e(d);
  }
}
function wd(t, e, n) {
  const r = this;
  return k(r.containerState, "expected state"), r.containerState._closeFlow = void 0, t.check(sr, i, a);
  function i(o) {
    return k(r.containerState, "expected state"), k(typeof r.containerState.size == "number", "expected size"), r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, _e(
      t,
      e,
      p.listItemIndent,
      r.containerState.size + 1
    )(o);
  }
  function a(o) {
    return k(r.containerState, "expected state"), r.containerState.furtherBlankLines || !we(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, t.attempt(Cd, e, s)(o));
  }
  function s(o) {
    return k(r.containerState, "expected state"), r.containerState._closeFlow = !0, r.interrupt = void 0, k(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), _e(
      t,
      t.attempt(at, e, n),
      p.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : V.tabSize
    )(o);
  }
}
function Sd(t, e, n) {
  const r = this;
  return k(r.containerState, "expected state"), k(typeof r.containerState.size == "number", "expected size"), _e(
    t,
    i,
    p.listItemIndent,
    r.containerState.size + 1
  );
  function i(a) {
    k(r.containerState, "expected state");
    const s = r.events[r.events.length - 1];
    return s && s[1].type === p.listItemIndent && s[2].sliceSerialize(s[1], !0).length === r.containerState.size ? e(a) : n(a);
  }
}
function xd(t) {
  k(this.containerState, "expected state"), k(typeof this.containerState.type == "string", "expected type"), t.exit(this.containerState.type);
}
function kd(t, e, n) {
  const r = this;
  return k(
    r.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), _e(
    t,
    i,
    p.listItemPrefixWhitespace,
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : V.tabSize + 1
  );
  function i(a) {
    const s = r.events[r.events.length - 1];
    return !we(a) && s && s[1].type === p.listItemPrefixWhitespace ? e(a) : n(a);
  }
}
const ka = {
  name: "setextUnderline",
  resolveTo: Td,
  tokenize: Ed
};
function Td(t, e) {
  let n = t.length, r, i, a;
  for (; n--; )
    if (t[n][0] === "enter") {
      if (t[n][1].type === p.content) {
        r = n;
        break;
      }
      t[n][1].type === p.paragraph && (i = n);
    } else
      t[n][1].type === p.content && t.splice(n, 1), !a && t[n][1].type === p.definition && (a = n);
  k(i !== void 0, "expected a `text` index to be found"), k(r !== void 0, "expected a `text` index to be found"), k(t[r][2] === e, "enter context should be same"), k(
    t[t.length - 1][2] === e,
    "enter context should be same"
  );
  const s = {
    type: p.setextHeading,
    start: { ...t[r][1].start },
    end: { ...t[t.length - 1][1].end }
  };
  return t[i][1].type = p.setextHeadingText, a ? (t.splice(i, 0, ["enter", s, e]), t.splice(a + 1, 0, ["exit", t[r][1], e]), t[r][1].end = { ...t[a][1].end }) : t[r][1] = s, t.push(["exit", s, e]), t;
}
function Ed(t, e, n) {
  const r = this;
  let i;
  return a;
  function a(u) {
    let l = r.events.length, h;
    for (k(
      u === g.dash || u === g.equalsTo,
      "expected `=` or `-`"
    ); l--; )
      if (r.events[l][1].type !== p.lineEnding && r.events[l][1].type !== p.linePrefix && r.events[l][1].type !== p.content) {
        h = r.events[l][1].type === p.paragraph;
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || h) ? (t.enter(p.setextHeadingLine), i = u, s(u)) : n(u);
  }
  function s(u) {
    return t.enter(p.setextHeadingLineSequence), o(u);
  }
  function o(u) {
    return u === i ? (t.consume(u), o) : (t.exit(p.setextHeadingLineSequence), we(u) ? _e(t, c, p.lineSuffix)(u) : c(u));
  }
  function c(u) {
    return u === g.eof || K(u) ? (t.exit(p.setextHeadingLine), e(u)) : n(u);
  }
}
const bd = { tokenize: _d };
function _d(t) {
  const e = this, n = t.attempt(
    // Try to parse a blank line.
    sr,
    r,
    // Try to parse initial flow (essentially, only code).
    t.attempt(
      this.parser.constructs.flowInitial,
      i,
      _e(
        t,
        t.attempt(
          this.parser.constructs.flow,
          i,
          t.attempt(Mh, i)
        ),
        p.linePrefix
      )
    )
  );
  return n;
  function r(a) {
    if (k(
      a === g.eof || K(a),
      "expected eol or eof"
    ), a === g.eof) {
      t.consume(a);
      return;
    }
    return t.enter(p.lineEndingBlank), t.consume(a), t.exit(p.lineEndingBlank), e.currentConstruct = void 0, n;
  }
  function i(a) {
    if (k(
      a === g.eof || K(a),
      "expected eol or eof"
    ), a === g.eof) {
      t.consume(a);
      return;
    }
    return t.enter(p.lineEnding), t.consume(a), t.exit(p.lineEnding), e.currentConstruct = void 0, n;
  }
}
const vd = { resolveAll: $s() }, Rd = Bs("string"), Id = Bs("text");
function Bs(t) {
  return {
    resolveAll: $s(
      t === "text" ? Nd : void 0
    ),
    tokenize: e
  };
  function e(n) {
    const r = this, i = this.parser.constructs[t], a = n.attempt(i, s, o);
    return s;
    function s(l) {
      return u(l) ? a(l) : o(l);
    }
    function o(l) {
      if (l === g.eof) {
        n.consume(l);
        return;
      }
      return n.enter(p.data), n.consume(l), c;
    }
    function c(l) {
      return u(l) ? (n.exit(p.data), a(l)) : (n.consume(l), c);
    }
    function u(l) {
      if (l === g.eof)
        return !0;
      const h = i[l];
      let f = -1;
      if (h)
        for (k(Array.isArray(h), "expected `disable.null` to be populated"); ++f < h.length; ) {
          const d = h[f];
          if (!d.previous || d.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function $s(t) {
  return e;
  function e(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === p.data && (a = i, i++) : (!n[i] || n[i][1].type !== p.data) && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return t ? t(n, r) : n;
  }
}
function Nd(t, e) {
  let n = 0;
  for (; ++n <= t.length; )
    if ((n === t.length || t[n][1].type === p.lineEnding) && t[n - 1][1].type === p.data) {
      const r = t[n - 1][1], i = e.sliceStream(r);
      let a = i.length, s = -1, o = 0, c;
      for (; a--; ) {
        const u = i[a];
        if (typeof u == "string") {
          for (s = u.length; u.charCodeAt(s - 1) === g.space; )
            o++, s--;
          if (s) break;
          s = -1;
        } else if (u === g.horizontalTab)
          c = !0, o++;
        else if (u !== g.virtualSpace) {
          a++;
          break;
        }
      }
      if (e._contentTypeTextTrailing && n === t.length && (o = 0), o) {
        const u = {
          type: n === t.length || c || o < V.hardBreakPrefixSizeMin ? p.lineSuffix : p.hardBreakTrailing,
          start: {
            _bufferIndex: a ? s : r.start._bufferIndex + s,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - o,
            offset: r.end.offset - o
          },
          end: { ...r.end }
        };
        r.end = { ...u.start }, r.start.offset === r.end.offset ? Object.assign(r, u) : (t.splice(
          n,
          0,
          ["enter", u, e],
          ["exit", u, e]
        ), n += 2);
      }
      n++;
    }
  return t;
}
const Md = {
  [g.asterisk]: at,
  [g.plusSign]: at,
  [g.dash]: at,
  [g.digit0]: at,
  [g.digit1]: at,
  [g.digit2]: at,
  [g.digit3]: at,
  [g.digit4]: at,
  [g.digit5]: at,
  [g.digit6]: at,
  [g.digit7]: at,
  [g.digit8]: at,
  [g.digit9]: at,
  [g.greaterThan]: Os
}, Ad = {
  [g.leftSquareBracket]: Dh
}, Od = {
  [g.horizontalTab]: Er,
  [g.virtualSpace]: Er,
  [g.space]: Er
}, Ld = {
  [g.numberSign]: $h,
  [g.asterisk]: Zn,
  [g.dash]: [ka, Zn],
  [g.lessThan]: Wh,
  [g.equalsTo]: ka,
  [g.underscore]: Zn,
  [g.graveAccent]: Sa,
  [g.tilde]: Sa
}, Pd = {
  [g.ampersand]: Ps,
  [g.backslash]: Ls
}, Dd = {
  [g.carriageReturn]: br,
  [g.lineFeed]: br,
  [g.carriageReturnLineFeed]: br,
  [g.exclamationMark]: ud,
  [g.ampersand]: Ps,
  [g.asterisk]: Xr,
  [g.lessThan]: [ph, Qh],
  [g.leftSquareBracket]: dd,
  [g.backslash]: [Uh, Ls],
  [g.rightSquareBracket]: mi,
  [g.underscore]: Xr,
  [g.graveAccent]: _h
}, Fd = { null: [Xr, vd] }, Hd = { null: [g.asterisk, g.underscore] }, zd = { null: [] }, Ud = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Hd,
  contentInitial: Ad,
  disable: zd,
  document: Md,
  flow: Ld,
  flowInitial: Od,
  insideSpan: Fd,
  string: Pd,
  text: Dd
}, Symbol.toStringTag, { value: "Module" }));
var Jr = { exports: {} }, _r, Ta;
function Bd() {
  if (Ta) return _r;
  Ta = 1;
  var t = 1e3, e = t * 60, n = e * 60, r = n * 24, i = r * 7, a = r * 365.25;
  _r = function(l, h) {
    h = h || {};
    var f = typeof l;
    if (f === "string" && l.length > 0)
      return s(l);
    if (f === "number" && isFinite(l))
      return h.long ? c(l) : o(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function s(l) {
    if (l = String(l), !(l.length > 100)) {
      var h = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (h) {
        var f = parseFloat(h[1]), d = (h[2] || "ms").toLowerCase();
        switch (d) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return f * a;
          case "weeks":
          case "week":
          case "w":
            return f * i;
          case "days":
          case "day":
          case "d":
            return f * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return f * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return f * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return f * t;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return f;
          default:
            return;
        }
      }
    }
  }
  function o(l) {
    var h = Math.abs(l);
    return h >= r ? Math.round(l / r) + "d" : h >= n ? Math.round(l / n) + "h" : h >= e ? Math.round(l / e) + "m" : h >= t ? Math.round(l / t) + "s" : l + "ms";
  }
  function c(l) {
    var h = Math.abs(l);
    return h >= r ? u(l, h, r, "day") : h >= n ? u(l, h, n, "hour") : h >= e ? u(l, h, e, "minute") : h >= t ? u(l, h, t, "second") : l + " ms";
  }
  function u(l, h, f, d) {
    var y = h >= f * 1.5;
    return Math.round(l / f) + " " + d + (y ? "s" : "");
  }
  return _r;
}
function $d(t) {
  n.debug = n, n.default = n, n.coerce = c, n.disable = s, n.enable = i, n.enabled = o, n.humanize = Bd(), n.destroy = u, Object.keys(t).forEach((l) => {
    n[l] = t[l];
  }), n.names = [], n.skips = [], n.formatters = {};
  function e(l) {
    let h = 0;
    for (let f = 0; f < l.length; f++)
      h = (h << 5) - h + l.charCodeAt(f), h |= 0;
    return n.colors[Math.abs(h) % n.colors.length];
  }
  n.selectColor = e;
  function n(l) {
    let h, f = null, d, y;
    function x(...I) {
      if (!x.enabled)
        return;
      const T = x, _ = Number(/* @__PURE__ */ new Date()), N = _ - (h || _);
      T.diff = N, T.prev = h, T.curr = _, h = _, I[0] = n.coerce(I[0]), typeof I[0] != "string" && I.unshift("%O");
      let A = 0;
      I[0] = I[0].replace(/%([a-zA-Z%])/g, (E, U) => {
        if (E === "%%")
          return "%";
        A++;
        const B = n.formatters[U];
        if (typeof B == "function") {
          const G = I[A];
          E = B.call(T, G), I.splice(A, 1), A--;
        }
        return E;
      }), n.formatArgs.call(T, I), (T.log || n.log).apply(T, I);
    }
    return x.namespace = l, x.useColors = n.useColors(), x.color = n.selectColor(l), x.extend = r, x.destroy = n.destroy, Object.defineProperty(x, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => f !== null ? f : (d !== n.namespaces && (d = n.namespaces, y = n.enabled(l)), y),
      set: (I) => {
        f = I;
      }
    }), typeof n.init == "function" && n.init(x), x;
  }
  function r(l, h) {
    const f = n(this.namespace + (typeof h > "u" ? ":" : h) + l);
    return f.log = this.log, f;
  }
  function i(l) {
    n.save(l), n.namespaces = l, n.names = [], n.skips = [];
    const h = (typeof l == "string" ? l : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
    for (const f of h)
      f[0] === "-" ? n.skips.push(f.slice(1)) : n.names.push(f);
  }
  function a(l, h) {
    let f = 0, d = 0, y = -1, x = 0;
    for (; f < l.length; )
      if (d < h.length && (h[d] === l[f] || h[d] === "*"))
        h[d] === "*" ? (y = d, x = f, d++) : (f++, d++);
      else if (y !== -1)
        d = y + 1, x++, f = x;
      else
        return !1;
    for (; d < h.length && h[d] === "*"; )
      d++;
    return d === h.length;
  }
  function s() {
    const l = [
      ...n.names,
      ...n.skips.map((h) => "-" + h)
    ].join(",");
    return n.enable(""), l;
  }
  function o(l) {
    for (const h of n.skips)
      if (a(l, h))
        return !1;
    for (const h of n.names)
      if (a(l, h))
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
var Vd = $d;
(function(t, e) {
  e.formatArgs = r, e.save = i, e.load = a, e.useColors = n, e.storage = s(), e.destroy = /* @__PURE__ */ (() => {
    let c = !1;
    return () => {
      c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e.colors = [
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
    if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors)
      return;
    const u = "color: " + this.color;
    c.splice(1, 0, u, "color: inherit");
    let l = 0, h = 0;
    c[0].replace(/%[a-zA-Z%]/g, (f) => {
      f !== "%%" && (l++, f === "%c" && (h = l));
    }), c.splice(h, 0, u);
  }
  e.log = console.debug || console.log || (() => {
  });
  function i(c) {
    try {
      c ? e.storage.setItem("debug", c) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function a() {
    let c;
    try {
      c = e.storage.getItem("debug") || e.storage.getItem("DEBUG");
    } catch {
    }
    return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
  }
  function s() {
    try {
      return localStorage;
    } catch {
    }
  }
  t.exports = Vd(e);
  const { formatters: o } = t.exports;
  o.j = function(c) {
    try {
      return JSON.stringify(c);
    } catch (u) {
      return "[UnexpectedJSONParseError]: " + u.message;
    }
  };
})(Jr, Jr.exports);
var jd = Jr.exports;
const Gd = /* @__PURE__ */ si(jd), qt = Gd("micromark");
function Wd(t, e, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, a = [];
  let s = [], o = [], c = !0;
  const u = {
    attempt: G(U),
    check: G(B),
    consume: A,
    enter: L,
    exit: E,
    interrupt: G(B, { interrupt: !0 })
  }, l = {
    code: g.eof,
    containerState: {},
    defineSkip: T,
    events: [],
    now: I,
    parser: t,
    previous: g.eof,
    sliceSerialize: y,
    sliceStream: x,
    write: d
  };
  let h = e.tokenize.call(l, u), f;
  return e.resolveAll && a.push(e), l;
  function d(b) {
    return s = ft(s, b), _(), s[s.length - 1] !== g.eof ? [] : (Z(e, 0), l.events = gi(a, l.events, l), l.events);
  }
  function y(b, O) {
    return Kd(x(b), O);
  }
  function x(b) {
    return qd(s, b);
  }
  function I() {
    const { _bufferIndex: b, _index: O, line: H, column: ee, offset: ie } = r;
    return { _bufferIndex: b, _index: O, line: H, column: ee, offset: ie };
  }
  function T(b) {
    i[b.line] = b.column, z(), qt("position: define skip: `%j`", r);
  }
  function _() {
    let b;
    for (; r._index < s.length; ) {
      const O = s[r._index];
      if (typeof O == "string")
        for (b = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === b && r._bufferIndex < O.length; )
          N(O.charCodeAt(r._bufferIndex));
      else
        N(O);
    }
  }
  function N(b) {
    k(c === !0, "expected character to be consumed"), c = void 0, qt("main: passing `%s` to %s", b, h && h.name), f = b, k(typeof h == "function", "expected state"), h = h(b);
  }
  function A(b) {
    k(b === f, "expected given code to equal expected code"), qt("consume: `%s`", b), k(
      c === void 0,
      "expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used"
    ), k(
      b === null ? l.events.length === 0 || l.events[l.events.length - 1][0] === "exit" : l.events[l.events.length - 1][0] === "enter",
      "expected last token to be open"
    ), K(b) ? (r.line++, r.column = 1, r.offset += b === g.carriageReturnLineFeed ? 2 : 1, z(), qt("position: after eol: `%j`", r)) : b !== g.virtualSpace && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    s[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = b, c = !0;
  }
  function L(b, O) {
    const H = O || {};
    return H.type = b, H.start = I(), k(typeof b == "string", "expected string type"), k(b.length > 0, "expected non-empty string"), qt("enter: `%s`", b), l.events.push(["enter", H, l]), o.push(H), H;
  }
  function E(b) {
    k(typeof b == "string", "expected string type"), k(b.length > 0, "expected non-empty string");
    const O = o.pop();
    return k(O, "cannot close w/o open tokens"), O.end = I(), k(b === O.type, "expected exit token to match current token"), k(
      !(O.start._index === O.end._index && O.start._bufferIndex === O.end._bufferIndex),
      "expected non-empty token (`" + b + "`)"
    ), qt("exit: `%s`", O.type), l.events.push(["exit", O, l]), O;
  }
  function U(b, O) {
    Z(b, O.from);
  }
  function B(b, O) {
    O.restore();
  }
  function G(b, O) {
    return H;
    function H(ee, ie, ge) {
      let Ce, w, Q, $;
      return Array.isArray(ee) ? (
        /* c8 ignore next 1 */
        re(ee)
      ) : "tokenize" in ee ? (
        // Looks like a construct.
        re([
          /** @type {Construct} */
          ee
        ])
      ) : C(ee);
      function C(te) {
        return Se;
        function Se(fe) {
          const Ne = fe !== null && te[fe], ve = fe !== null && te.null, Fe = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ne) ? Ne : Ne ? [Ne] : [],
            ...Array.isArray(ve) ? ve : ve ? [ve] : []
          ];
          return re(Fe)(fe);
        }
      }
      function re(te) {
        return Ce = te, w = 0, te.length === 0 ? (k(ge, "expected `bogusState` to be given"), ge) : q(te[w]);
      }
      function q(te) {
        return Se;
        function Se(fe) {
          return $ = W(), Q = te, te.partial || (l.currentConstruct = te), k(
            l.parser.constructs.disable.null,
            "expected `disable.null` to be populated"
          ), te.name && l.parser.constructs.disable.null.includes(te.name) ? ae(fe) : te.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            O ? Object.assign(Object.create(l), O) : l,
            u,
            le,
            ae
          )(fe);
        }
      }
      function le(te) {
        return k(te === f, "expected code"), c = !0, b(Q, $), ie;
      }
      function ae(te) {
        return k(te === f, "expected code"), c = !0, $.restore(), ++w < Ce.length ? q(Ce[w]) : ge;
      }
    }
  }
  function Z(b, O) {
    b.resolveAll && !a.includes(b) && a.push(b), b.resolve && It(
      l.events,
      O,
      l.events.length - O,
      b.resolve(l.events.slice(O), l)
    ), b.resolveTo && (l.events = b.resolveTo(l.events, l)), k(
      b.partial || l.events.length === 0 || l.events[l.events.length - 1][0] === "exit",
      "expected last token to end"
    );
  }
  function W() {
    const b = I(), O = l.previous, H = l.currentConstruct, ee = l.events.length, ie = Array.from(o);
    return { from: ee, restore: ge };
    function ge() {
      r = b, l.previous = O, l.currentConstruct = H, l.events.length = ee, o = ie, z(), qt("position: restore: `%j`", r);
    }
  }
  function z() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function qd(t, e) {
  const n = e.start._index, r = e.start._bufferIndex, i = e.end._index, a = e.end._bufferIndex;
  let s;
  if (n === i)
    k(a > -1, "expected non-negative end buffer index"), k(r > -1, "expected non-negative start buffer index"), s = [t[n].slice(r, a)];
  else {
    if (s = t.slice(n, i), r > -1) {
      const o = s[0];
      typeof o == "string" ? s[0] = o.slice(r) : (k(r === 0, "expected `startBufferIndex` to be `0`"), s.shift());
    }
    a > 0 && s.push(t[i].slice(0, a));
  }
  return s;
}
function Kd(t, e) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < t.length; ) {
    const a = t[n];
    let s;
    if (typeof a == "string")
      s = a;
    else
      switch (a) {
        case g.carriageReturn: {
          s = bt.cr;
          break;
        }
        case g.lineFeed: {
          s = bt.lf;
          break;
        }
        case g.carriageReturnLineFeed: {
          s = bt.cr + bt.lf;
          break;
        }
        case g.horizontalTab: {
          s = e ? bt.space : bt.ht;
          break;
        }
        case g.virtualSpace: {
          if (!e && i) continue;
          s = bt.space;
          break;
        }
        default:
          k(typeof a == "number", "expected number"), s = String.fromCharCode(a);
      }
    i = a === g.horizontalTab, r.push(s);
  }
  return r.join("");
}
function Zd(t) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Ju([Ud, ...(t || {}).extensions || []])
    ),
    content: i(sh),
    defined: [],
    document: i(lh),
    flow: i(bd),
    lazy: {},
    string: i(Rd),
    text: i(Id)
  };
  return r;
  function i(a) {
    return s;
    function s(o) {
      return Wd(r, a, o);
    }
  }
}
function Yd(t) {
  for (; !Fs(t); )
    ;
  return t;
}
const Ea = /[\0\t\n\r]/g;
function Xd() {
  let t = 1, e = "", n = !0, r;
  return i;
  function i(a, s, o) {
    const c = [];
    let u, l, h, f, d;
    for (a = e + (typeof a == "string" ? a.toString() : new TextDecoder(s || void 0).decode(a)), h = 0, e = "", n && (a.charCodeAt(0) === g.byteOrderMarker && h++, n = void 0); h < a.length; ) {
      if (Ea.lastIndex = h, u = Ea.exec(a), f = u && u.index !== void 0 ? u.index : a.length, d = a.charCodeAt(f), !u) {
        e = a.slice(h);
        break;
      }
      if (d === g.lf && h === f && r)
        c.push(g.carriageReturnLineFeed), r = void 0;
      else
        switch (r && (c.push(g.carriageReturn), r = void 0), h < f && (c.push(a.slice(h, f)), t += f - h), d) {
          case g.nul: {
            c.push(g.replacementCharacter), t++;
            break;
          }
          case g.ht: {
            for (l = Math.ceil(t / V.tabSize) * V.tabSize, c.push(g.horizontalTab); t++ < l; ) c.push(g.virtualSpace);
            break;
          }
          case g.lf: {
            c.push(g.lineFeed), t = 1;
            break;
          }
          default:
            r = !0, t = 1;
        }
      h = f + 1;
    }
    return o && (r && c.push(g.carriageReturn), e && c.push(e), c.push(g.eof)), c;
  }
}
const Jd = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Qd(t) {
  return t.replace(Jd, e1);
}
function e1(t, e, n) {
  if (e)
    return e;
  if (n.charCodeAt(0) === g.numberSign) {
    const i = n.charCodeAt(1), a = i === g.lowercaseX || i === g.uppercaseX;
    return As(
      n.slice(a ? 2 : 1),
      a ? V.numericBaseHexadecimal : V.numericBaseDecimal
    );
  }
  return fi(n) || t;
}
const Vs = {}.hasOwnProperty;
function t1(t, e, n) {
  return typeof e != "string" && (n = e, e = void 0), n1(n)(
    Yd(
      Zd(n).document().write(Xd()(t, e, !0))
    )
  );
}
function n1(t) {
  const e = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(At),
      autolinkProtocol: G,
      autolinkEmail: G,
      atxHeading: a(ct),
      blockQuote: a(fe),
      characterEscape: G,
      characterReference: G,
      codeFenced: a(Ne),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: a(Ne, s),
      codeText: a(ve, s),
      codeTextData: G,
      data: G,
      codeFlowValue: G,
      definition: a(Fe),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: a(lt),
      hardBreakEscape: a(Nt),
      hardBreakTrailing: a(Nt),
      htmlFlow: a(Mt, s),
      htmlFlowData: G,
      htmlText: a(Mt, s),
      htmlTextData: G,
      image: a(xt),
      label: s,
      link: a(At),
      listItem: a(jt),
      listItemValue: f,
      listOrdered: a(kt, h),
      listUnordered: a(kt),
      paragraph: a(Gt),
      reference: C,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: a(ct),
      strong: a(Wt),
      thematicBreak: a(Ct)
    },
    exit: {
      atxHeading: c(),
      atxHeadingSequence: L,
      autolink: c(),
      autolinkEmail: Se,
      autolinkProtocol: te,
      blockQuote: c(),
      characterEscapeValue: Z,
      characterReferenceMarkerHexadecimal: q,
      characterReferenceMarkerNumeric: q,
      characterReferenceValue: le,
      characterReference: ae,
      codeFenced: c(I),
      codeFencedFence: x,
      codeFencedFenceInfo: d,
      codeFencedFenceMeta: y,
      codeFlowValue: Z,
      codeIndented: c(T),
      codeText: c(H),
      codeTextData: Z,
      data: Z,
      definition: c(),
      definitionDestinationString: A,
      definitionLabelString: _,
      definitionTitleString: N,
      emphasis: c(),
      hardBreakEscape: c(z),
      hardBreakTrailing: c(z),
      htmlFlow: c(b),
      htmlFlowData: Z,
      htmlText: c(O),
      htmlTextData: Z,
      image: c(ie),
      label: Ce,
      labelText: ge,
      lineEnding: W,
      link: c(ee),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: re,
      resourceDestinationString: w,
      resourceTitleString: Q,
      resource: $,
      setextHeading: c(B),
      setextHeadingLineSequence: U,
      setextHeadingText: E,
      strong: c(),
      thematicBreak: c()
    }
  };
  js(e, (t || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(v) {
    let R = { type: "root", children: [] };
    const j = {
      stack: [R],
      tokenStack: [],
      config: e,
      enter: o,
      exit: u,
      buffer: s,
      resume: l,
      data: n
    }, J = [];
    let de = -1;
    for (; ++de < v.length; )
      if (v[de][1].type === p.listOrdered || v[de][1].type === p.listUnordered)
        if (v[de][0] === "enter")
          J.push(de);
        else {
          const Me = J.pop();
          k(typeof Me == "number", "expected list ot be open"), de = i(v, Me, de);
        }
    for (de = -1; ++de < v.length; ) {
      const Me = e[v[de][0]];
      Vs.call(Me, v[de][1].type) && Me[v[de][1].type].call(
        Object.assign(
          { sliceSerialize: v[de][2].sliceSerialize },
          j
        ),
        v[de][1]
      );
    }
    if (j.tokenStack.length > 0) {
      const Me = j.tokenStack[j.tokenStack.length - 1];
      (Me[1] || ba).call(j, void 0, Me[0]);
    }
    for (R.position = {
      start: Ut(
        v.length > 0 ? v[0][1].start : { line: 1, column: 1, offset: 0 }
      ),
      end: Ut(
        v.length > 0 ? v[v.length - 2][1].end : { line: 1, column: 1, offset: 0 }
      )
    }, de = -1; ++de < e.transforms.length; )
      R = e.transforms[de](R) || R;
    return R;
  }
  function i(v, R, j) {
    let J = R - 1, de = -1, Me = !1, Be, $e, rt, Ve;
    for (; ++J <= j; ) {
      const ke = v[J];
      switch (ke[1].type) {
        case p.listUnordered:
        case p.listOrdered:
        case p.blockQuote: {
          ke[0] === "enter" ? de++ : de--, Ve = void 0;
          break;
        }
        case p.lineEndingBlank: {
          ke[0] === "enter" && (Be && !Ve && !de && !rt && (rt = J), Ve = void 0);
          break;
        }
        case p.linePrefix:
        case p.listItemValue:
        case p.listItemMarker:
        case p.listItemPrefix:
        case p.listItemPrefixWhitespace:
          break;
        default:
          Ve = void 0;
      }
      if (!de && ke[0] === "enter" && ke[1].type === p.listItemPrefix || de === -1 && ke[0] === "exit" && (ke[1].type === p.listUnordered || ke[1].type === p.listOrdered)) {
        if (Be) {
          let Xe = J;
          for ($e = void 0; Xe--; ) {
            const je = v[Xe];
            if (je[1].type === p.lineEnding || je[1].type === p.lineEndingBlank) {
              if (je[0] === "exit") continue;
              $e && (v[$e][1].type = p.lineEndingBlank, Me = !0), je[1].type = p.lineEnding, $e = Xe;
            } else if (!(je[1].type === p.linePrefix || je[1].type === p.blockQuotePrefix || je[1].type === p.blockQuotePrefixWhitespace || je[1].type === p.blockQuoteMarker || je[1].type === p.listItemIndent)) break;
          }
          rt && (!$e || rt < $e) && (Be._spread = !0), Be.end = Object.assign(
            {},
            $e ? v[$e][1].start : ke[1].end
          ), v.splice($e || J, 0, ["exit", Be, ke[2]]), J++, j++;
        }
        if (ke[1].type === p.listItemPrefix) {
          const Xe = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, ke[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Be = Xe, v.splice(J, 0, ["enter", Xe, ke[2]]), J++, j++, rt = void 0, Ve = !0;
        }
      }
    }
    return v[R][1]._spread = Me, j;
  }
  function a(v, R) {
    return j;
    function j(J) {
      o.call(this, v(J), J), R && R.call(this, J);
    }
  }
  function s() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function o(v, R, j) {
    const J = this.stack[this.stack.length - 1];
    k(J, "expected `parent`"), k("children" in J, "expected `parent`"), J.children.push(v), this.stack.push(v), this.tokenStack.push([R, j || void 0]), v.position = {
      start: Ut(R.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function c(v) {
    return R;
    function R(j) {
      v && v.call(this, j), u.call(this, j);
    }
  }
  function u(v, R) {
    const j = this.stack.pop();
    k(j, "expected `node`");
    const J = this.tokenStack.pop();
    if (J)
      J[0].type !== v.type && (R ? R.call(this, v, J[0]) : (J[1] || ba).call(this, v, J[0]));
    else throw new Error(
      "Cannot close `" + v.type + "` (" + Tn({ start: v.start, end: v.end }) + "): it’s not open"
    );
    k(j.type !== "fragment", "unexpected fragment `exit`ed"), k(j.position, "expected `position` to be defined"), j.position.end = Ut(v.end);
  }
  function l() {
    return Yu(this.stack.pop());
  }
  function h() {
    this.data.expectingFirstListItemValue = !0;
  }
  function f(v) {
    if (this.data.expectingFirstListItemValue) {
      const R = this.stack[this.stack.length - 2];
      k(R, "expected nodes on stack"), k(R.type === "list", "expected list on stack"), R.start = Number.parseInt(
        this.sliceSerialize(v),
        V.numericBaseDecimal
      ), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function d() {
    const v = this.resume(), R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k(R.type === "code", "expected code on stack"), R.lang = v;
  }
  function y() {
    const v = this.resume(), R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k(R.type === "code", "expected code on stack"), R.meta = v;
  }
  function x() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function I() {
    const v = this.resume(), R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k(R.type === "code", "expected code on stack"), R.value = v.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function T() {
    const v = this.resume(), R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k(R.type === "code", "expected code on stack"), R.value = v.replace(/(\r?\n|\r)$/g, "");
  }
  function _(v) {
    const R = this.resume(), j = this.stack[this.stack.length - 1];
    k(j, "expected node on stack"), k(j.type === "definition", "expected definition on stack"), j.label = R, j.identifier = an(
      this.sliceSerialize(v)
    ).toLowerCase();
  }
  function N() {
    const v = this.resume(), R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k(R.type === "definition", "expected definition on stack"), R.title = v;
  }
  function A() {
    const v = this.resume(), R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k(R.type === "definition", "expected definition on stack"), R.url = v;
  }
  function L(v) {
    const R = this.stack[this.stack.length - 1];
    if (k(R, "expected node on stack"), k(R.type === "heading", "expected heading on stack"), !R.depth) {
      const j = this.sliceSerialize(v).length;
      k(
        j === 1 || j === 2 || j === 3 || j === 4 || j === 5 || j === 6,
        "expected `depth` between `1` and `6`"
      ), R.depth = j;
    }
  }
  function E() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function U(v) {
    const R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k(R.type === "heading", "expected heading on stack"), R.depth = this.sliceSerialize(v).codePointAt(0) === g.equalsTo ? 1 : 2;
  }
  function B() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function G(v) {
    const R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k("children" in R, "expected parent on stack");
    const j = R.children;
    let J = j[j.length - 1];
    (!J || J.type !== "text") && (J = mt(), J.position = {
      start: Ut(v.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, j.push(J)), this.stack.push(J);
  }
  function Z(v) {
    const R = this.stack.pop();
    k(R, "expected a `node` to be on the stack"), k("value" in R, "expected a `literal` to be on the stack"), k(R.position, "expected `node` to have an open position"), R.value += this.sliceSerialize(v), R.position.end = Ut(v.end);
  }
  function W(v) {
    const R = this.stack[this.stack.length - 1];
    if (k(R, "expected `node`"), this.data.atHardBreak) {
      k("children" in R, "expected `parent`");
      const j = R.children[R.children.length - 1];
      k(j.position, "expected tail to have a starting position"), j.position.end = Ut(v.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && e.canContainEols.includes(R.type) && (G.call(this, v), Z.call(this, v));
  }
  function z() {
    this.data.atHardBreak = !0;
  }
  function b() {
    const v = this.resume(), R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k(R.type === "html", "expected html on stack"), R.value = v;
  }
  function O() {
    const v = this.resume(), R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k(R.type === "html", "expected html on stack"), R.value = v;
  }
  function H() {
    const v = this.resume(), R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k(R.type === "inlineCode", "expected inline code on stack"), R.value = v;
  }
  function ee() {
    const v = this.stack[this.stack.length - 1];
    if (k(v, "expected node on stack"), k(v.type === "link", "expected link on stack"), this.data.inReference) {
      const R = this.data.referenceType || "shortcut";
      v.type += "Reference", v.referenceType = R, delete v.url, delete v.title;
    } else
      delete v.identifier, delete v.label;
    this.data.referenceType = void 0;
  }
  function ie() {
    const v = this.stack[this.stack.length - 1];
    if (k(v, "expected node on stack"), k(v.type === "image", "expected image on stack"), this.data.inReference) {
      const R = this.data.referenceType || "shortcut";
      v.type += "Reference", v.referenceType = R, delete v.url, delete v.title;
    } else
      delete v.identifier, delete v.label;
    this.data.referenceType = void 0;
  }
  function ge(v) {
    const R = this.sliceSerialize(v), j = this.stack[this.stack.length - 2];
    k(j, "expected ancestor on stack"), k(
      j.type === "image" || j.type === "link",
      "expected image or link on stack"
    ), j.label = Qd(R), j.identifier = an(R).toLowerCase();
  }
  function Ce() {
    const v = this.stack[this.stack.length - 1];
    k(v, "expected node on stack"), k(v.type === "fragment", "expected fragment on stack");
    const R = this.resume(), j = this.stack[this.stack.length - 1];
    if (k(j, "expected node on stack"), k(
      j.type === "image" || j.type === "link",
      "expected image or link on stack"
    ), this.data.inReference = !0, j.type === "link") {
      const J = v.children;
      j.children = J;
    } else
      j.alt = R;
  }
  function w() {
    const v = this.resume(), R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k(
      R.type === "image" || R.type === "link",
      "expected image or link on stack"
    ), R.url = v;
  }
  function Q() {
    const v = this.resume(), R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k(
      R.type === "image" || R.type === "link",
      "expected image or link on stack"
    ), R.title = v;
  }
  function $() {
    this.data.inReference = void 0;
  }
  function C() {
    this.data.referenceType = "collapsed";
  }
  function re(v) {
    const R = this.resume(), j = this.stack[this.stack.length - 1];
    k(j, "expected node on stack"), k(
      j.type === "image" || j.type === "link",
      "expected image reference or link reference on stack"
    ), j.label = R, j.identifier = an(
      this.sliceSerialize(v)
    ).toLowerCase(), this.data.referenceType = "full";
  }
  function q(v) {
    k(
      v.type === "characterReferenceMarkerNumeric" || v.type === "characterReferenceMarkerHexadecimal"
    ), this.data.characterReferenceType = v.type;
  }
  function le(v) {
    const R = this.sliceSerialize(v), j = this.data.characterReferenceType;
    let J;
    if (j)
      J = As(
        R,
        j === p.characterReferenceMarkerNumeric ? V.numericBaseDecimal : V.numericBaseHexadecimal
      ), this.data.characterReferenceType = void 0;
    else {
      const Me = fi(R);
      k(Me !== !1, "expected reference to decode"), J = Me;
    }
    const de = this.stack[this.stack.length - 1];
    k(de, "expected `node`"), k("value" in de, "expected `node.value`"), de.value += J;
  }
  function ae(v) {
    const R = this.stack.pop();
    k(R, "expected `node`"), k(R.position, "expected `node.position`"), R.position.end = Ut(v.end);
  }
  function te(v) {
    Z.call(this, v);
    const R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k(R.type === "link", "expected link on stack"), R.url = this.sliceSerialize(v);
  }
  function Se(v) {
    Z.call(this, v);
    const R = this.stack[this.stack.length - 1];
    k(R, "expected node on stack"), k(R.type === "link", "expected link on stack"), R.url = "mailto:" + this.sliceSerialize(v);
  }
  function fe() {
    return { type: "blockquote", children: [] };
  }
  function Ne() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function ve() {
    return { type: "inlineCode", value: "" };
  }
  function Fe() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function lt() {
    return { type: "emphasis", children: [] };
  }
  function ct() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Nt() {
    return { type: "break" };
  }
  function Mt() {
    return { type: "html", value: "" };
  }
  function xt() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function At() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function kt(v) {
    return {
      type: "list",
      ordered: v.type === "listOrdered",
      start: null,
      spread: v._spread,
      children: []
    };
  }
  function jt(v) {
    return {
      type: "listItem",
      spread: v._spread,
      checked: null,
      children: []
    };
  }
  function Gt() {
    return { type: "paragraph", children: [] };
  }
  function Wt() {
    return { type: "strong", children: [] };
  }
  function mt() {
    return { type: "text", value: "" };
  }
  function Ct() {
    return { type: "thematicBreak" };
  }
}
function Ut(t) {
  return { line: t.line, column: t.column, offset: t.offset };
}
function js(t, e) {
  let n = -1;
  for (; ++n < e.length; ) {
    const r = e[n];
    Array.isArray(r) ? js(t, r) : r1(t, r);
  }
}
function r1(t, e) {
  let n;
  for (n in e)
    if (Vs.call(e, n))
      switch (n) {
        case "canContainEols": {
          const r = e[n];
          r && t[n].push(...r);
          break;
        }
        case "transforms": {
          const r = e[n];
          r && t[n].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = e[n];
          r && Object.assign(t[n], r);
          break;
        }
      }
}
function ba(t, e) {
  throw t ? new Error(
    "Cannot close `" + t.type + "` (" + Tn({ start: t.start, end: t.end }) + "): a different token (`" + e.type + "`, " + Tn({ start: e.start, end: e.end }) + ") is open"
  ) : new Error(
    "Cannot close document, a token (`" + e.type + "`, " + Tn({ start: e.start, end: e.end }) + ") is still open"
  );
}
function i1(t) {
  const e = this;
  e.parser = n;
  function n(r) {
    return t1(r, {
      ...e.data("settings"),
      ...t,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: e.data("micromarkExtensions") || [],
      mdastExtensions: e.data("fromMarkdownExtensions") || []
    });
  }
}
function a1(t, e) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: t.wrap(t.all(e), !0)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function s1(t, e) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return t.patch(e, n), [t.applyData(e, n), { type: "text", value: `
` }];
}
function o1(t, e) {
  const n = e.value ? e.value + `
` : "", r = {}, i = e.lang ? e.lang.split(/\s+/) : [];
  i.length > 0 && (r.className = ["language-" + i[0]]);
  let a = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: n }]
  };
  return e.meta && (a.data = { meta: e.meta }), t.patch(e, a), a = t.applyData(e, a), a = { type: "element", tagName: "pre", properties: {}, children: [a] }, t.patch(e, a), a;
}
function l1(t, e) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function c1(t, e) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function u1(t, e) {
  const n = typeof t.options.clobberPrefix == "string" ? t.options.clobberPrefix : "user-content-", r = String(e.identifier).toUpperCase(), i = cn(r.toLowerCase()), a = t.footnoteOrder.indexOf(r);
  let s, o = t.footnoteCounts.get(r);
  o === void 0 ? (o = 0, t.footnoteOrder.push(r), s = t.footnoteOrder.length) : s = a + 1, o += 1, t.footnoteCounts.set(r, o);
  const c = {
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
  t.patch(e, c);
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [c]
  };
  return t.patch(e, u), t.applyData(e, u);
}
function h1(t, e) {
  const n = {
    type: "element",
    tagName: "h" + e.depth,
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function d1(t, e) {
  if (t.options.allowDangerousHtml) {
    const n = { type: "raw", value: e.value };
    return t.patch(e, n), t.applyData(e, n);
  }
}
function Gs(t, e) {
  const n = e.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (e.label || e.identifier) + "]"), e.type === "imageReference")
    return [{ type: "text", value: "![" + e.alt + r }];
  const i = t.all(e), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return s && s.type === "text" ? s.value += r : i.push({ type: "text", value: r }), i;
}
function p1(t, e) {
  const n = String(e.identifier).toUpperCase(), r = t.definitionById.get(n);
  if (!r)
    return Gs(t, e);
  const i = { src: cn(r.url || ""), alt: e.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return t.patch(e, a), t.applyData(e, a);
}
function f1(t, e) {
  const n = { src: cn(e.url) };
  e.alt !== null && e.alt !== void 0 && (n.alt = e.alt), e.title !== null && e.title !== void 0 && (n.title = e.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return t.patch(e, r), t.applyData(e, r);
}
function g1(t, e) {
  const n = { type: "text", value: e.value.replace(/\r?\n|\r/g, " ") };
  t.patch(e, n);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [n]
  };
  return t.patch(e, r), t.applyData(e, r);
}
function m1(t, e) {
  const n = String(e.identifier).toUpperCase(), r = t.definitionById.get(n);
  if (!r)
    return Gs(t, e);
  const i = { href: cn(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: t.all(e)
  };
  return t.patch(e, a), t.applyData(e, a);
}
function C1(t, e) {
  const n = { href: cn(e.url) };
  e.title !== null && e.title !== void 0 && (n.title = e.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: t.all(e)
  };
  return t.patch(e, r), t.applyData(e, r);
}
function y1(t, e, n) {
  const r = t.all(e), i = n ? w1(n) : Ws(e), a = {}, s = [];
  if (typeof e.checked == "boolean") {
    const l = r[0];
    let h;
    l && l.type === "element" && l.tagName === "p" ? h = l : (h = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(h)), h.children.length > 0 && h.children.unshift({ type: "text", value: " " }), h.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: e.checked, disabled: !0 },
      children: []
    }), a.className = ["task-list-item"];
  }
  let o = -1;
  for (; ++o < r.length; ) {
    const l = r[o];
    (i || o !== 0 || l.type !== "element" || l.tagName !== "p") && s.push({ type: "text", value: `
` }), l.type === "element" && l.tagName === "p" && !i ? s.push(...l.children) : s.push(l);
  }
  const c = r[r.length - 1];
  c && (i || c.type !== "element" || c.tagName !== "p") && s.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: a, children: s };
  return t.patch(e, u), t.applyData(e, u);
}
function w1(t) {
  let e = !1;
  if (t.type === "list") {
    e = t.spread || !1;
    const n = t.children;
    let r = -1;
    for (; !e && ++r < n.length; )
      e = Ws(n[r]);
  }
  return e;
}
function Ws(t) {
  const e = t.spread;
  return e ?? t.children.length > 1;
}
function S1(t, e) {
  const n = {}, r = t.all(e);
  let i = -1;
  for (typeof e.start == "number" && e.start !== 1 && (n.start = e.start); ++i < r.length; ) {
    const s = r[i];
    if (s.type === "element" && s.tagName === "li" && s.properties && Array.isArray(s.properties.className) && s.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const a = {
    type: "element",
    tagName: e.ordered ? "ol" : "ul",
    properties: n,
    children: t.wrap(r, !0)
  };
  return t.patch(e, a), t.applyData(e, a);
}
function x1(t, e) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function k1(t, e) {
  const n = { type: "root", children: t.wrap(t.all(e)) };
  return t.patch(e, n), t.applyData(e, n);
}
function T1(t, e) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function E1(t, e) {
  const n = t.all(e), r = n.shift(), i = [];
  if (r) {
    const s = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: t.wrap([r], !0)
    };
    t.patch(e.children[0], s), i.push(s);
  }
  if (n.length > 0) {
    const s = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: t.wrap(n, !0)
    }, o = ui(e.children[1]), c = bs(e.children[e.children.length - 1]);
    o && c && (s.position = { start: o, end: c }), i.push(s);
  }
  const a = {
    type: "element",
    tagName: "table",
    properties: {},
    children: t.wrap(i, !0)
  };
  return t.patch(e, a), t.applyData(e, a);
}
function b1(t, e, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(e) : 1) === 0 ? "th" : "td", s = n && n.type === "table" ? n.align : void 0, o = s ? s.length : e.children.length;
  let c = -1;
  const u = [];
  for (; ++c < o; ) {
    const h = e.children[c], f = {}, d = s ? s[c] : void 0;
    d && (f.align = d);
    let y = { type: "element", tagName: a, properties: f, children: [] };
    h && (y.children = t.all(h), t.patch(h, y), y = t.applyData(h, y)), u.push(y);
  }
  const l = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: t.wrap(u, !0)
  };
  return t.patch(e, l), t.applyData(e, l);
}
function _1(t, e) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
const _a = 9, va = 32;
function v1(t) {
  const e = String(t), n = /\r?\n|\r/g;
  let r = n.exec(e), i = 0;
  const a = [];
  for (; r; )
    a.push(
      Ra(e.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(e);
  return a.push(Ra(e.slice(i), i > 0, !1)), a.join("");
}
function Ra(t, e, n) {
  let r = 0, i = t.length;
  if (e) {
    let a = t.codePointAt(r);
    for (; a === _a || a === va; )
      r++, a = t.codePointAt(r);
  }
  if (n) {
    let a = t.codePointAt(i - 1);
    for (; a === _a || a === va; )
      i--, a = t.codePointAt(i - 1);
  }
  return i > r ? t.slice(r, i) : "";
}
function R1(t, e) {
  const n = { type: "text", value: v1(String(e.value)) };
  return t.patch(e, n), t.applyData(e, n);
}
function I1(t, e) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return t.patch(e, n), t.applyData(e, n);
}
const N1 = {
  blockquote: a1,
  break: s1,
  code: o1,
  delete: l1,
  emphasis: c1,
  footnoteReference: u1,
  heading: h1,
  html: d1,
  imageReference: p1,
  image: f1,
  inlineCode: g1,
  linkReference: m1,
  link: C1,
  listItem: y1,
  list: S1,
  paragraph: x1,
  // @ts-expect-error: root is different, but hard to type.
  root: k1,
  strong: T1,
  table: E1,
  tableCell: _1,
  tableRow: b1,
  text: R1,
  thematicBreak: I1,
  toml: jn,
  yaml: jn,
  definition: jn,
  footnoteDefinition: jn
};
function jn() {
}
const qs = -1, or = 0, bn = 1, nr = 2, Ci = 3, yi = 4, wi = 5, Si = 6, Ks = 7, Zs = 8, Ia = typeof self == "object" ? self : globalThis, M1 = (t, e) => {
  const n = (i, a) => (t.set(a, i), i), r = (i) => {
    if (t.has(i))
      return t.get(i);
    const [a, s] = e[i];
    switch (a) {
      case or:
      case qs:
        return n(s, i);
      case bn: {
        const o = n([], i);
        for (const c of s)
          o.push(r(c));
        return o;
      }
      case nr: {
        const o = n({}, i);
        for (const [c, u] of s)
          o[r(c)] = r(u);
        return o;
      }
      case Ci:
        return n(new Date(s), i);
      case yi: {
        const { source: o, flags: c } = s;
        return n(new RegExp(o, c), i);
      }
      case wi: {
        const o = n(/* @__PURE__ */ new Map(), i);
        for (const [c, u] of s)
          o.set(r(c), r(u));
        return o;
      }
      case Si: {
        const o = n(/* @__PURE__ */ new Set(), i);
        for (const c of s)
          o.add(r(c));
        return o;
      }
      case Ks: {
        const { name: o, message: c } = s;
        return n(new Ia[o](c), i);
      }
      case Zs:
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
    return n(new Ia[a](s), i);
  };
  return r;
}, Na = (t) => M1(/* @__PURE__ */ new Map(), t)(0), tn = "", { toString: A1 } = {}, { keys: O1 } = Object, Sn = (t) => {
  const e = typeof t;
  if (e !== "object" || !t)
    return [or, e];
  const n = A1.call(t).slice(8, -1);
  switch (n) {
    case "Array":
      return [bn, tn];
    case "Object":
      return [nr, tn];
    case "Date":
      return [Ci, tn];
    case "RegExp":
      return [yi, tn];
    case "Map":
      return [wi, tn];
    case "Set":
      return [Si, tn];
    case "DataView":
      return [bn, n];
  }
  return n.includes("Array") ? [bn, n] : n.includes("Error") ? [Ks, n] : [nr, n];
}, Gn = ([t, e]) => t === or && (e === "function" || e === "symbol"), L1 = (t, e, n, r) => {
  const i = (s, o) => {
    const c = r.push(s) - 1;
    return n.set(o, c), c;
  }, a = (s) => {
    if (n.has(s))
      return n.get(s);
    let [o, c] = Sn(s);
    switch (o) {
      case or: {
        let l = s;
        switch (c) {
          case "bigint":
            o = Zs, l = s.toString();
            break;
          case "function":
          case "symbol":
            if (t)
              throw new TypeError("unable to serialize " + c);
            l = null;
            break;
          case "undefined":
            return i([qs], s);
        }
        return i([o, l], s);
      }
      case bn: {
        if (c) {
          let f = s;
          return c === "DataView" ? f = new Uint8Array(s.buffer) : c === "ArrayBuffer" && (f = new Uint8Array(s)), i([c, [...f]], s);
        }
        const l = [], h = i([o, l], s);
        for (const f of s)
          l.push(a(f));
        return h;
      }
      case nr: {
        if (c)
          switch (c) {
            case "BigInt":
              return i([c, s.toString()], s);
            case "Boolean":
            case "Number":
            case "String":
              return i([c, s.valueOf()], s);
          }
        if (e && "toJSON" in s)
          return a(s.toJSON());
        const l = [], h = i([o, l], s);
        for (const f of O1(s))
          (t || !Gn(Sn(s[f]))) && l.push([a(f), a(s[f])]);
        return h;
      }
      case Ci:
        return i([o, s.toISOString()], s);
      case yi: {
        const { source: l, flags: h } = s;
        return i([o, { source: l, flags: h }], s);
      }
      case wi: {
        const l = [], h = i([o, l], s);
        for (const [f, d] of s)
          (t || !(Gn(Sn(f)) || Gn(Sn(d)))) && l.push([a(f), a(d)]);
        return h;
      }
      case Si: {
        const l = [], h = i([o, l], s);
        for (const f of s)
          (t || !Gn(Sn(f))) && l.push(a(f));
        return h;
      }
    }
    const { message: u } = s;
    return i([o, { name: c, message: u }], s);
  };
  return a;
}, Ma = (t, { json: e, lossy: n } = {}) => {
  const r = [];
  return L1(!(e || n), !!e, /* @__PURE__ */ new Map(), r)(t), r;
}, rr = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (t, e) => e && ("json" in e || "lossy" in e) ? Na(Ma(t, e)) : structuredClone(t)
) : (t, e) => Na(Ma(t, e));
function P1(t, e) {
  const n = [{ type: "text", value: "↩" }];
  return e > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(e) }]
  }), n;
}
function D1(t, e) {
  return "Back to reference " + (t + 1) + (e > 1 ? "-" + e : "");
}
function F1(t) {
  const e = typeof t.options.clobberPrefix == "string" ? t.options.clobberPrefix : "user-content-", n = t.options.footnoteBackContent || P1, r = t.options.footnoteBackLabel || D1, i = t.options.footnoteLabel || "Footnotes", a = t.options.footnoteLabelTagName || "h2", s = t.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let c = -1;
  for (; ++c < t.footnoteOrder.length; ) {
    const u = t.footnoteById.get(
      t.footnoteOrder[c]
    );
    if (!u)
      continue;
    const l = t.all(u), h = String(u.identifier).toUpperCase(), f = cn(h.toLowerCase());
    let d = 0;
    const y = [], x = t.footnoteCounts.get(h);
    for (; x !== void 0 && ++d <= x; ) {
      y.length > 0 && y.push({ type: "text", value: " " });
      let _ = typeof n == "string" ? n : n(c, d);
      typeof _ == "string" && (_ = { type: "text", value: _ }), y.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + e + "fnref-" + f + (d > 1 ? "-" + d : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(c, d),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(_) ? _ : [_]
      });
    }
    const I = l[l.length - 1];
    if (I && I.type === "element" && I.tagName === "p") {
      const _ = I.children[I.children.length - 1];
      _ && _.type === "text" ? _.value += " " : I.children.push({ type: "text", value: " " }), I.children.push(...y);
    } else
      l.push(...y);
    const T = {
      type: "element",
      tagName: "li",
      properties: { id: e + "fn-" + f },
      children: t.wrap(l, !0)
    };
    t.patch(u, T), o.push(T);
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
            ...rr(s),
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
          children: t.wrap(o, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const xi = (
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
  function(t) {
    if (t == null)
      return B1;
    if (typeof t == "function")
      return lr(t);
    if (typeof t == "object")
      return Array.isArray(t) ? H1(t) : z1(t);
    if (typeof t == "string")
      return U1(t);
    throw new Error("Expected function, string, or object as test");
  }
);
function H1(t) {
  const e = [];
  let n = -1;
  for (; ++n < t.length; )
    e[n] = xi(t[n]);
  return lr(r);
  function r(...i) {
    let a = -1;
    for (; ++a < e.length; )
      if (e[a].apply(this, i)) return !0;
    return !1;
  }
}
function z1(t) {
  const e = (
    /** @type {Record<string, unknown>} */
    t
  );
  return lr(n);
  function n(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let a;
    for (a in t)
      if (i[a] !== e[a]) return !1;
    return !0;
  }
}
function U1(t) {
  return lr(e);
  function e(n) {
    return n && n.type === t;
  }
}
function lr(t) {
  return e;
  function e(n, r, i) {
    return !!($1(n) && t.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function B1() {
  return !0;
}
function $1(t) {
  return t !== null && typeof t == "object" && "type" in t;
}
const Ys = [], V1 = !0, Aa = !1, j1 = "skip";
function Xs(t, e, n, r) {
  let i;
  typeof e == "function" && typeof n != "function" ? (r = n, n = e) : i = e;
  const a = xi(i), s = r ? -1 : 1;
  o(t, void 0, [])();
  function o(c, u, l) {
    const h = (
      /** @type {Record<string, unknown>} */
      c && typeof c == "object" ? c : {}
    );
    if (typeof h.type == "string") {
      const d = (
        // `hast`
        typeof h.tagName == "string" ? h.tagName : (
          // `xast`
          typeof h.name == "string" ? h.name : void 0
        )
      );
      Object.defineProperty(f, "name", {
        value: "node (" + (c.type + (d ? "<" + d + ">" : "")) + ")"
      });
    }
    return f;
    function f() {
      let d = Ys, y, x, I;
      if ((!e || a(c, u, l[l.length - 1] || void 0)) && (d = G1(n(c, l)), d[0] === Aa))
        return d;
      if ("children" in c && c.children) {
        const T = (
          /** @type {UnistParent} */
          c
        );
        if (T.children && d[0] !== j1)
          for (x = (r ? T.children.length : -1) + s, I = l.concat(T); x > -1 && x < T.children.length; ) {
            const _ = T.children[x];
            if (y = o(_, x, I)(), y[0] === Aa)
              return y;
            x = typeof y[1] == "number" ? y[1] : x + s;
          }
      }
      return d;
    }
  }
}
function G1(t) {
  return Array.isArray(t) ? t : typeof t == "number" ? [V1, t] : t == null ? Ys : [t];
}
function Js(t, e, n, r) {
  let i, a, s;
  typeof e == "function" && typeof n != "function" ? (a = void 0, s = e, i = n) : (a = e, s = n, i = r), Xs(t, a, o, i);
  function o(c, u) {
    const l = u[u.length - 1], h = l ? l.children.indexOf(c) : void 0;
    return s(c, h, l);
  }
}
const Qr = {}.hasOwnProperty, W1 = {};
function q1(t, e) {
  const n = e || W1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = { ...N1, ...n.handlers }, o = {
    all: u,
    applyData: Z1,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: s,
    one: c,
    options: n,
    patch: K1,
    wrap: X1
  };
  return Js(t, function(l) {
    if (l.type === "definition" || l.type === "footnoteDefinition") {
      const h = l.type === "definition" ? r : i, f = String(l.identifier).toUpperCase();
      h.has(f) || h.set(f, l);
    }
  }), o;
  function c(l, h) {
    const f = l.type, d = o.handlers[f];
    if (Qr.call(o.handlers, f) && d)
      return d(o, l, h);
    if (o.options.passThrough && o.options.passThrough.includes(f)) {
      if ("children" in l) {
        const { children: x, ...I } = l, T = rr(I);
        return T.children = o.all(l), T;
      }
      return rr(l);
    }
    return (o.options.unknownHandler || Y1)(o, l, h);
  }
  function u(l) {
    const h = [];
    if ("children" in l) {
      const f = l.children;
      let d = -1;
      for (; ++d < f.length; ) {
        const y = o.one(f[d], l);
        if (y) {
          if (d && f[d - 1].type === "break" && (!Array.isArray(y) && y.type === "text" && (y.value = Oa(y.value)), !Array.isArray(y) && y.type === "element")) {
            const x = y.children[0];
            x && x.type === "text" && (x.value = Oa(x.value));
          }
          Array.isArray(y) ? h.push(...y) : h.push(y);
        }
      }
    }
    return h;
  }
}
function K1(t, e) {
  t.position && (e.position = Ru(t));
}
function Z1(t, e) {
  let n = e;
  if (t && t.data) {
    const r = t.data.hName, i = t.data.hChildren, a = t.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element")
        n.tagName = r;
      else {
        const s = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: s };
      }
    n.type === "element" && a && Object.assign(n.properties, rr(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function Y1(t, e) {
  const n = e.data || {}, r = "value" in e && !(Qr.call(n, "hProperties") || Qr.call(n, "hChildren")) ? { type: "text", value: e.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, r), t.applyData(e, r);
}
function X1(t, e) {
  const n = [];
  let r = -1;
  for (e && n.push({ type: "text", value: `
` }); ++r < t.length; )
    r && n.push({ type: "text", value: `
` }), n.push(t[r]);
  return e && t.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Oa(t) {
  let e = 0, n = t.charCodeAt(e);
  for (; n === 9 || n === 32; )
    e++, n = t.charCodeAt(e);
  return t.slice(e);
}
function La(t, e) {
  const n = q1(t, e), r = n.one(t, void 0), i = F1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && (k("children" in a), a.children.push({ type: "text", value: `
` }, i)), a;
}
function J1(t, e) {
  return t && "run" in t ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      La(n, { file: r, ...e })
    );
    await t.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      La(n, { file: r, ...t || e })
    );
  };
}
function Pa(t) {
  if (t)
    throw t;
}
var Yn = Object.prototype.hasOwnProperty, Qs = Object.prototype.toString, Da = Object.defineProperty, Fa = Object.getOwnPropertyDescriptor, Ha = function(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : Qs.call(e) === "[object Array]";
}, za = function(e) {
  if (!e || Qs.call(e) !== "[object Object]")
    return !1;
  var n = Yn.call(e, "constructor"), r = e.constructor && e.constructor.prototype && Yn.call(e.constructor.prototype, "isPrototypeOf");
  if (e.constructor && !n && !r)
    return !1;
  var i;
  for (i in e)
    ;
  return typeof i > "u" || Yn.call(e, i);
}, Ua = function(e, n) {
  Da && n.name === "__proto__" ? Da(e, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : e[n.name] = n.newValue;
}, Ba = function(e, n) {
  if (n === "__proto__")
    if (Yn.call(e, n)) {
      if (Fa)
        return Fa(e, n).value;
    } else return;
  return e[n];
}, Q1 = function t() {
  var e, n, r, i, a, s, o = arguments[0], c = 1, u = arguments.length, l = !1;
  for (typeof o == "boolean" && (l = o, o = arguments[1] || {}, c = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); c < u; ++c)
    if (e = arguments[c], e != null)
      for (n in e)
        r = Ba(o, n), i = Ba(e, n), o !== i && (l && i && (za(i) || (a = Ha(i))) ? (a ? (a = !1, s = r && Ha(r) ? r : []) : s = r && za(r) ? r : {}, Ua(o, { name: n, newValue: t(l, s, i) })) : typeof i < "u" && Ua(o, { name: n, newValue: i }));
  return o;
};
const vr = /* @__PURE__ */ si(Q1);
function ei(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function ep() {
  const t = [], e = { run: n, use: r };
  return e;
  function n(...i) {
    let a = -1;
    const s = i.pop();
    if (typeof s != "function")
      throw new TypeError("Expected function as last argument, not " + s);
    o(null, ...i);
    function o(c, ...u) {
      const l = t[++a];
      let h = -1;
      if (c) {
        s(c);
        return;
      }
      for (; ++h < i.length; )
        (u[h] === null || u[h] === void 0) && (u[h] = i[h]);
      i = u, l ? tp(l, o)(...u) : s(null, ...u);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return t.push(i), e;
  }
}
function tp(t, e) {
  let n;
  return r;
  function r(...s) {
    const o = t.length > s.length;
    let c;
    o && s.push(i);
    try {
      c = t.apply(this, s);
    } catch (u) {
      const l = (
        /** @type {Error} */
        u
      );
      if (o && n)
        throw l;
      return i(l);
    }
    o || (c && c.then && typeof c.then == "function" ? c.then(a, i) : c instanceof Error ? i(c) : a(c));
  }
  function i(s, ...o) {
    n || (n = !0, e(s, ...o));
  }
  function a(s) {
    i(null, s);
  }
}
const Et = { basename: np, dirname: rp, extname: ip, join: ap, sep: "/" };
function np(t, e) {
  if (e !== void 0 && typeof e != "string")
    throw new TypeError('"ext" argument must be a string');
  Mn(t);
  let n = 0, r = -1, i = t.length, a;
  if (e === void 0 || e.length === 0 || e.length > t.length) {
    for (; i--; )
      if (t.codePointAt(i) === 47) {
        if (a) {
          n = i + 1;
          break;
        }
      } else r < 0 && (a = !0, r = i + 1);
    return r < 0 ? "" : t.slice(n, r);
  }
  if (e === t)
    return "";
  let s = -1, o = e.length - 1;
  for (; i--; )
    if (t.codePointAt(i) === 47) {
      if (a) {
        n = i + 1;
        break;
      }
    } else
      s < 0 && (a = !0, s = i + 1), o > -1 && (t.codePointAt(i) === e.codePointAt(o--) ? o < 0 && (r = i) : (o = -1, r = s));
  return n === r ? r = s : r < 0 && (r = t.length), t.slice(n, r);
}
function rp(t) {
  if (Mn(t), t.length === 0)
    return ".";
  let e = -1, n = t.length, r;
  for (; --n; )
    if (t.codePointAt(n) === 47) {
      if (r) {
        e = n;
        break;
      }
    } else r || (r = !0);
  return e < 0 ? t.codePointAt(0) === 47 ? "/" : "." : e === 1 && t.codePointAt(0) === 47 ? "//" : t.slice(0, e);
}
function ip(t) {
  Mn(t);
  let e = t.length, n = -1, r = 0, i = -1, a = 0, s;
  for (; e--; ) {
    const o = t.codePointAt(e);
    if (o === 47) {
      if (s) {
        r = e + 1;
        break;
      }
      continue;
    }
    n < 0 && (s = !0, n = e + 1), o === 46 ? i < 0 ? i = e : a !== 1 && (a = 1) : i > -1 && (a = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  a === 0 || // The (right-most) trimmed path component is exactly `..`.
  a === 1 && i === n - 1 && i === r + 1 ? "" : t.slice(i, n);
}
function ap(...t) {
  let e = -1, n;
  for (; ++e < t.length; )
    Mn(t[e]), t[e] && (n = n === void 0 ? t[e] : n + "/" + t[e]);
  return n === void 0 ? "." : sp(n);
}
function sp(t) {
  Mn(t);
  const e = t.codePointAt(0) === 47;
  let n = op(t, !e);
  return n.length === 0 && !e && (n = "."), n.length > 0 && t.codePointAt(t.length - 1) === 47 && (n += "/"), e ? "/" + n : n;
}
function op(t, e) {
  let n = "", r = 0, i = -1, a = 0, s = -1, o, c;
  for (; ++s <= t.length; ) {
    if (s < t.length)
      o = t.codePointAt(s);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(i === s - 1 || a === 1)) if (i !== s - 1 && a === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (c = n.lastIndexOf("/"), c !== n.length - 1) {
              c < 0 ? (n = "", r = 0) : (n = n.slice(0, c), r = n.length - 1 - n.lastIndexOf("/")), i = s, a = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = s, a = 0;
            continue;
          }
        }
        e && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + t.slice(i + 1, s) : n = t.slice(i + 1, s), r = s - i - 1;
      i = s, a = 0;
    } else o === 46 && a > -1 ? a++ : a = -1;
  }
  return n;
}
function Mn(t) {
  if (typeof t != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(t)
    );
}
const lp = { cwd: cp };
function cp() {
  return "/";
}
function ti(t) {
  return !!(t !== null && typeof t == "object" && "href" in t && t.href && "protocol" in t && t.protocol && // @ts-expect-error: indexing is fine.
  t.auth === void 0);
}
function up(t) {
  if (typeof t == "string")
    t = new URL(t);
  else if (!ti(t)) {
    const e = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + t + "`"
    );
    throw e.code = "ERR_INVALID_ARG_TYPE", e;
  }
  if (t.protocol !== "file:") {
    const e = new TypeError("The URL must be of scheme file");
    throw e.code = "ERR_INVALID_URL_SCHEME", e;
  }
  return hp(t);
}
function hp(t) {
  if (t.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const e = t.pathname;
  let n = -1;
  for (; ++n < e.length; )
    if (e.codePointAt(n) === 37 && e.codePointAt(n + 1) === 50) {
      const r = e.codePointAt(n + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(e);
}
const Rr = (
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
class eo {
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
  constructor(e) {
    let n;
    e ? ti(e) ? n = { path: e } : typeof e == "string" || dp(e) ? n = { value: e } : n = e : n = {}, this.cwd = "cwd" in n ? "" : lp.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Rr.length; ) {
      const a = Rr[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      Rr.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Et.basename(this.path) : void 0;
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
  set basename(e) {
    Nr(e, "basename"), Ir(e, "basename"), this.path = Et.join(this.dirname || "", e);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Et.dirname(this.path) : void 0;
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
  set dirname(e) {
    $a(this.basename, "dirname"), this.path = Et.join(e || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Et.extname(this.path) : void 0;
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
  set extname(e) {
    if (Ir(e, "extname"), $a(this.dirname, "extname"), e) {
      if (e.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (e.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Et.join(this.dirname, this.stem + (e || ""));
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
  set path(e) {
    ti(e) && (e = up(e)), Nr(e, "path"), this.path !== e && this.history.push(e);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Et.basename(this.path, this.extname) : void 0;
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
  set stem(e) {
    Nr(e, "stem"), Ir(e, "stem"), this.path = Et.join(this.dirname || "", e + (this.extname || ""));
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
  fail(e, n, r) {
    const i = this.message(e, n, r);
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
  info(e, n, r) {
    const i = this.message(e, n, r);
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
  message(e, n, r) {
    const i = new Ye(
      // @ts-expect-error: the overloads are fine.
      e,
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
  toString(e) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(e || void 0).decode(this.value);
  }
}
function Ir(t, e) {
  if (t && t.includes(Et.sep))
    throw new Error(
      "`" + e + "` cannot be a path: did not expect `" + Et.sep + "`"
    );
}
function Nr(t, e) {
  if (!t)
    throw new Error("`" + e + "` cannot be empty");
}
function $a(t, e) {
  if (!t)
    throw new Error("Setting `" + e + "` requires `path` to be set too");
}
function dp(t) {
  return !!(t && typeof t == "object" && "byteLength" in t && "byteOffset" in t);
}
const pp = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(t) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[t], a = function() {
      return i.apply(a, arguments);
    };
    return Object.setPrototypeOf(a, r), a;
  }
), fp = {}.hasOwnProperty;
class ki extends pp {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = ep();
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
    const e = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new ki()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      e.use(...r);
    }
    return e.data(vr(!0, {}, this.namespace)), e;
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
  data(e, n) {
    return typeof e == "string" ? arguments.length === 2 ? (Or("data", this.frozen), this.namespace[e] = n, this) : fp.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (Or("data", this.frozen), this.namespace = e, this) : this.namespace;
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
    const e = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = n.call(e, ...r);
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
  parse(e) {
    this.freeze();
    const n = Wn(e), r = this.parser || this.Parser;
    return Mr("parse", r), r(String(n), n);
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
  process(e, n) {
    const r = this;
    return this.freeze(), Mr("process", this.parser || this.Parser), Ar("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, s) {
      const o = Wn(e), c = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(o)
      );
      r.run(c, o, function(l, h, f) {
        if (l || !h || !f)
          return u(l);
        const d = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          h
        ), y = r.stringify(d, f);
        Cp(y) ? f.value = y : f.result = y, u(
          l,
          /** @type {VFileWithOutput<CompileResult>} */
          f
        );
      });
      function u(l, h) {
        l || !h ? s(l) : a ? a(h) : (k(n, "`done` is defined if `resolve` is not"), n(void 0, h));
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
  processSync(e) {
    let n = !1, r;
    return this.freeze(), Mr("processSync", this.parser || this.Parser), Ar("processSync", this.compiler || this.Compiler), this.process(e, i), ja("processSync", "process", n), k(r, "we either bailed on an error or have a tree"), r;
    function i(a, s) {
      n = !0, Pa(a), r = s;
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
  run(e, n, r) {
    Va(e), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(s, o) {
      k(
        typeof n != "function",
        "`file` can’t be a `done` anymore, we checked"
      );
      const c = Wn(n);
      i.run(e, c, u);
      function u(l, h, f) {
        const d = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          h || e
        );
        l ? o(l) : s ? s(d) : (k(r, "`done` is defined if `resolve` is not"), r(void 0, d, f));
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
  runSync(e, n) {
    let r = !1, i;
    return this.run(e, n, a), ja("runSync", "run", r), k(i, "we either bailed on an error or have a tree"), i;
    function a(s, o) {
      Pa(s), i = o, r = !0;
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
  stringify(e, n) {
    this.freeze();
    const r = Wn(n), i = this.compiler || this.Compiler;
    return Ar("stringify", i), Va(e), i(e, r);
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
  use(e, ...n) {
    const r = this.attachers, i = this.namespace;
    if (Or("use", this.frozen), e != null) if (typeof e == "function")
      c(e, n);
    else if (typeof e == "object")
      Array.isArray(e) ? o(e) : s(e);
    else
      throw new TypeError("Expected usable value, not `" + e + "`");
    return this;
    function a(u) {
      if (typeof u == "function")
        c(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [l, ...h] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          c(l, h);
        } else
          s(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function s(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      o(u.plugins), u.settings && (i.settings = vr(!0, i.settings, u.settings));
    }
    function o(u) {
      let l = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++l < u.length; ) {
          const h = u[l];
          a(h);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function c(u, l) {
      let h = -1, f = -1;
      for (; ++h < r.length; )
        if (r[h][0] === u) {
          f = h;
          break;
        }
      if (f === -1)
        r.push([u, ...l]);
      else if (l.length > 0) {
        let [d, ...y] = l;
        const x = r[f][1];
        ei(x) && ei(d) && (d = vr(!0, x, d)), r[f] = [u, d, ...y];
      }
    }
  }
}
const gp = new ki().freeze();
function Mr(t, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + t + "` without `parser`");
}
function Ar(t, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + t + "` without `compiler`");
}
function Or(t, e) {
  if (e)
    throw new Error(
      "Cannot call `" + t + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Va(t) {
  if (!ei(t) || typeof t.type != "string")
    throw new TypeError("Expected node, got `" + t + "`");
}
function ja(t, e, n) {
  if (!n)
    throw new Error(
      "`" + t + "` finished async. Use `" + e + "` instead"
    );
}
function Wn(t) {
  return mp(t) ? t : new eo(t);
}
function mp(t) {
  return !!(t && typeof t == "object" && "message" in t && "messages" in t);
}
function Cp(t) {
  return typeof t == "string" || yp(t);
}
function yp(t) {
  return !!(t && typeof t == "object" && "byteLength" in t && "byteOffset" in t);
}
const wp = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Ga = [], Wa = { allowDangerousHtml: !0 }, Sp = /^(https?|ircs?|mailto|xmpp)$/i, xp = [
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
function qa(t) {
  const e = kp(t), n = Tp(t);
  return Ep(e.runSync(e.parse(n), n), t);
}
function kp(t) {
  const e = t.rehypePlugins || Ga, n = t.remarkPlugins || Ga, r = t.remarkRehypeOptions ? { ...t.remarkRehypeOptions, ...Wa } : Wa;
  return gp().use(i1).use(n).use(J1, r).use(e);
}
function Tp(t) {
  const e = t.children || "", n = new eo();
  return typeof e == "string" ? n.value = e : Vr(
    "Unexpected value `" + e + "` for `children` prop, expected `string`"
  ), n;
}
function Ep(t, e) {
  const n = e.allowedElements, r = e.allowElement, i = e.components, a = e.disallowedElements, s = e.skipHtml, o = e.unwrapDisallowed, c = e.urlTransform || bp;
  for (const l of xp)
    Object.hasOwn(e, l.from) && Vr(
      "Unexpected `" + l.from + "` prop, " + (l.to ? "use `" + l.to + "` instead" : "remove it") + " (see <" + wp + "#" + l.id + "> for more info)"
    );
  return n && a && Vr(
    "Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other"
  ), Js(t, u), Ou(t, {
    Fragment: Ft,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: m,
    jsxs: P,
    passKeys: !0,
    passNode: !0
  });
  function u(l, h, f) {
    if (l.type === "raw" && f && typeof h == "number")
      return s ? f.children.splice(h, 1) : f.children[h] = { type: "text", value: l.value }, h;
    if (l.type === "element") {
      let d;
      for (d in Tr)
        if (Object.hasOwn(Tr, d) && Object.hasOwn(l.properties, d)) {
          const y = l.properties[d], x = Tr[d];
          (x === null || x.includes(l.tagName)) && (l.properties[d] = c(String(y || ""), d, l));
        }
    }
    if (l.type === "element") {
      let d = n ? !n.includes(l.tagName) : a ? a.includes(l.tagName) : !1;
      if (!d && r && typeof h == "number" && (d = !r(l, h, f)), d && f && typeof h == "number")
        return o && l.children ? f.children.splice(h, 1, ...l.children) : f.children.splice(h, 1), h;
    }
  }
}
function bp(t) {
  const e = t.indexOf(":"), n = t.indexOf("?"), r = t.indexOf("#"), i = t.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    e === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && e > i || n !== -1 && e > n || r !== -1 && e > r || // It is a protocol, it should be allowed.
    Sp.test(t.slice(0, e)) ? t : ""
  );
}
function _p(t) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function vp(t, e, n) {
  const i = xi({}.ignore || []), a = Rp(e);
  let s = -1;
  for (; ++s < a.length; )
    Xs(t, "text", o);
  function o(u, l) {
    let h = -1, f;
    for (; ++h < l.length; ) {
      const d = l[h], y = f ? f.children : void 0;
      if (i(
        d,
        y ? y.indexOf(d) : void 0,
        f
      ))
        return;
      f = d;
    }
    if (f)
      return c(u, l);
  }
  function c(u, l) {
    const h = l[l.length - 1], f = a[s][0], d = a[s][1];
    let y = 0;
    const I = h.children.indexOf(u);
    let T = !1, _ = [];
    f.lastIndex = 0;
    let N = f.exec(u.value);
    for (; N; ) {
      const A = N.index, L = {
        index: N.index,
        input: N.input,
        stack: [...l, u]
      };
      let E = d(...N, L);
      if (typeof E == "string" && (E = E.length > 0 ? { type: "text", value: E } : void 0), E === !1 ? f.lastIndex = A + 1 : (y !== A && _.push({
        type: "text",
        value: u.value.slice(y, A)
      }), Array.isArray(E) ? _.push(...E) : E && _.push(E), y = A + N[0].length, T = !0), !f.global)
        break;
      N = f.exec(u.value);
    }
    return T ? (y < u.value.length && _.push({ type: "text", value: u.value.slice(y) }), h.children.splice(I, 1, ..._)) : _ = [u], I + _.length;
  }
}
function Rp(t) {
  const e = [];
  if (!Array.isArray(t))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const n = !t[0] || Array.isArray(t[0]) ? t : [t];
  let r = -1;
  for (; ++r < n.length; ) {
    const i = n[r];
    e.push([Ip(i[0]), Np(i[1])]);
  }
  return e;
}
function Ip(t) {
  return typeof t == "string" ? new RegExp(_p(t), "g") : t;
}
function Np(t) {
  return typeof t == "function" ? t : function() {
    return t;
  };
}
function Mp(t) {
  vp(t, [/\r?\n|\r/g, Ap]);
}
function Ap() {
  return { type: "break" };
}
function Ka() {
  return function(t) {
    Mp(t);
  };
}
function Op({ children: t, isStreaming: e }) {
  const [n, r] = xe(!0), [i, a] = xe(!1), [s, o] = xe("");
  wt.useEffect(() => {
    !e && !i ? (a(!0), r(!1)) : e && (a(!1), r(!0));
  }, [e, i]);
  const c = () => {
    e || r(!n);
  }, u = wt.Children.map(t, (l) => {
    if (wt.isValidElement(l)) {
      if (l.type === to) {
        const h = l.props;
        return h.title && h.title !== s && o(h.title), wt.cloneElement(
          l,
          {
            onToggle: c,
            isExpanded: n
          }
        );
      }
      if (l.type === no)
        return wt.cloneElement(
          l,
          {
            isVisible: n,
            title: s
          }
        );
    }
    return l;
  });
  return /* @__PURE__ */ m("div", { className: "chat-wrapper__reasoning", children: u });
}
function to({
  title: t,
  status: e = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const { t: a } = $t(), s = () => /* @__PURE__ */ P(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ m(
          "mask",
          {
            id: "mask0_64_36210",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "16",
            height: "16",
            children: /* @__PURE__ */ m("rect", { width: "16", height: "16", fill: "#D9D9D9" })
          }
        ),
        /* @__PURE__ */ m("g", { mask: "url(#mask0_64_36210)", children: /* @__PURE__ */ m(
          "path",
          {
            d: "M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z",
            fill: "#637381"
          }
        ) })
      ]
    }
  ), o = e === "completed" || t.includes(a("chat.reasoning.thinking")) || t.includes(a("chat.reasoning.processing"));
  return /* @__PURE__ */ P(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${o ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: o ? r : void 0,
      style: { cursor: o ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ m("div", { className: "chat-wrapper__reasoning-icon", children: s() }),
        /* @__PURE__ */ P("span", { className: "chat-wrapper__reasoning-title", children: [
          t,
          n && e === "completed" && /* @__PURE__ */ m("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        o && /* @__PURE__ */ m(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ P(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ m(
                    "mask",
                    {
                      id: "mask0_44_18068",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ m("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ m("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ m(
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
function no({
  children: t,
  isVisible: e = !0,
  title: n = ""
}) {
  return !e || !(n.toLowerCase().includes("thinking") || n.toLowerCase().includes("thought")) ? null : /* @__PURE__ */ m("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ m("div", { className: "chat-wrapper__reasoning-text", children: t }) });
}
function Lp({ children: t }) {
  return /* @__PURE__ */ m("div", { className: "chat-wrapper__tooling-handle", children: t });
}
function Pp({
  title: t,
  status: e = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var u, l;
  const { t: a } = $t(), s = () => {
    if (!r || !i) return null;
    const h = i.find((f) => f.name === r);
    return (h == null ? void 0 : h.description) || null;
  };
  let o;
  if (r != null && r.startsWith("lat_")) {
    const h = (u = n == null ? void 0 : n.parameters) == null ? void 0 : u.query, f = (l = n == null ? void 0 : n.parameters) == null ? void 0 : l.url;
    o = h || f || a("chat.tools.executing");
  } else
    o = s();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ m("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (e) {
      case "processing":
        return /* @__PURE__ */ P("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ m(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ m("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ m("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ m(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ m(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ m("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ m("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ m(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ m("span", { children: o }),
          /* @__PURE__ */ P("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ m(
                    "mask",
                    {
                      id: "mask0_64_36278",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ m(
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
                  /* @__PURE__ */ m("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ m(
                    "path",
                    {
                      d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ m("span", { children: a("chat.tools.executing") })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ P("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ m(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ m("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ m("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ m(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ m(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ m("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ m("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ m(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ m("span", { children: o }),
          /* @__PURE__ */ P("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ m(
                    "mask",
                    {
                      id: "mask0_64_36345",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ m(
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
                  /* @__PURE__ */ m("g", { mask: "url(#mask0_64_36345)", children: /* @__PURE__ */ m(
                    "path",
                    {
                      d: "M7.1501 10.7819L11.1168 6.83193L10.2668 5.98193L7.1501 9.08193L5.73343 7.68193L4.88343 8.53193L7.1501 10.7819ZM8.0001 14.7819C7.12232 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.643 2.1001 10.8653C1.76676 10.0875 1.6001 9.25971 1.6001 8.38193C1.6001 7.49304 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73899 2.81527 5.51676 2.48193C6.29454 2.1486 7.12232 1.98193 8.0001 1.98193C8.88899 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11805 13.9001 5.89027C14.2334 6.66249 14.4001 7.49304 14.4001 8.38193C14.4001 9.25971 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.264 13.9486 10.4918 14.2819C9.71954 14.6153 8.88899 14.7819 8.0001 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819Z",
                      fill: "#4EAD13"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ m("span", { children: a("chat.tools.completed") })
          ] })
        ] });
      case "error":
        return /* @__PURE__ */ P("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ m("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ m(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ m(
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
          /* @__PURE__ */ m("span", { className: "chat-wrapper__tooling-handle-title", children: t })
        ] });
      default:
        return /* @__PURE__ */ P("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ m(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ m("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ m("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ m(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ m(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ m("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ m("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ m(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ P("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ m(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ m(
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
                /* @__PURE__ */ m("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ m(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ m(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ m("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ m("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ m(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ m("span", { children: a("chat.tools.executing") })
        ] });
    }
  })() });
}
function ro({ size: t = 16, variant: e = "dots" }) {
  return e === "dots" ? /* @__PURE__ */ P("div", { className: "chat-wrapper__loader-dots", style: { fontSize: t }, children: [
    /* @__PURE__ */ m("span", {}),
    /* @__PURE__ */ m("span", {}),
    /* @__PURE__ */ m("span", {})
  ] }) : e === "pulse" ? /* @__PURE__ */ m(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: t, height: t }
    }
  ) : /* @__PURE__ */ m(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: t, height: t }
    }
  );
}
const Dp = ({ message: t }) => {
  const [e, n] = xe(!0);
  return /* @__PURE__ */ P("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ P(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!e),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          t.role === "system" ? /* @__PURE__ */ P("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
              "svg",
              {
                width: "20",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ m(
                    "mask",
                    {
                      id: "mask0_64_36257",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ m("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ m("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ m(
                    "path",
                    {
                      d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }),
            /* @__PURE__ */ m("span", { children: "AI text input <show-toolname>..." })
          ] }) : /* @__PURE__ */ m("span", { children: "System Message" }),
          /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              style: {
                transform: e ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease"
              },
              children: [
                /* @__PURE__ */ m(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ m("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ m("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ m(
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
    e && /* @__PURE__ */ m("div", { className: "chat-wrapper__system-message-content", children: /* @__PURE__ */ m("span", { children: t.content }) })
  ] });
};
function io({
  imageUrl: t,
  isOpen: e,
  onClose: n,
  alt: r = "Image preview"
}) {
  const i = oe((s) => {
    s.key === "Escape" && n();
  }, [n]), a = oe((s) => {
    s.target === s.currentTarget && n();
  }, [n]);
  return Te(() => (e ? (document.addEventListener("keydown", i), document.body.style.overflow = "hidden") : (document.removeEventListener("keydown", i), document.body.style.overflow = ""), () => {
    document.removeEventListener("keydown", i), document.body.style.overflow = "";
  }), [e, i]), !e || !t ? null : /* @__PURE__ */ P(
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
        /* @__PURE__ */ m(
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
            onMouseEnter: (s) => {
              s.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            },
            onMouseLeave: (s) => {
              s.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            },
            title: "Close (Esc)",
            children: "×"
          }
        ),
        /* @__PURE__ */ m(
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
            onClick: (s) => s.stopPropagation(),
            children: /* @__PURE__ */ m(
              "img",
              {
                src: t,
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
                onLoad: (s) => {
                  s.currentTarget.style.opacity = "1", s.currentTarget.style.transition = "opacity 0.2s";
                }
              }
            )
          }
        ),
        /* @__PURE__ */ m(
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
const ao = ni(null);
function Fp({ children: t, value: e }) {
  return /* @__PURE__ */ m(ao.Provider, { value: e, children: t });
}
function An() {
  const t = ri(ao);
  if (!t)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return t;
}
const so = {
  p: ({ children: t, ...e }) => /* @__PURE__ */ m("p", { className: "chat-wrapper__paragraph", ...e, children: t }),
  br: ({ ...t }) => /* @__PURE__ */ m("br", { ...t }),
  pre: ({ children: t, ...e }) => /* @__PURE__ */ m("pre", { className: "chat-wrapper__code-block", ...e, children: t }),
  code: ({ children: t, className: e, ...n }) => !e ? /* @__PURE__ */ m("code", { className: "chat-wrapper__inline-code", ...n, children: t }) : /* @__PURE__ */ m("code", { className: "chat-wrapper__code", ...n, children: t }),
  ul: ({ children: t, ...e }) => /* @__PURE__ */ m("ul", { className: "chat-wrapper__list", ...e, children: t }),
  ol: ({ children: t, ...e }) => /* @__PURE__ */ m("ol", { className: "chat-wrapper__ordered-list", ...e, children: t }),
  li: ({ children: t, ...e }) => /* @__PURE__ */ m("li", { className: "chat-wrapper__list-item", ...e, children: t }),
  hr: ({ ...t }) => /* @__PURE__ */ m("hr", { className: "chat-wrapper__hr", ...t })
}, Hp = {
  ...so,
  code: ({ children: t, className: e, ...n }) => !e ? /* @__PURE__ */ m("code", { className: "chat-wrapper__inline-code", ...n, children: t }) : /* @__PURE__ */ m("code", { className: "chat-wrapper__code", ...n, children: t })
}, oo = Za(
  ({ message: t }) => {
    const {
      getReasoningTitle: e,
      getReasoningStatus: n,
      getReasoningDuration: r,
      getReasoningContentOnly: i,
      getToolingTitle: a,
      getToolingStatus: s,
      clientTools: o,
      currentAssistantMessageIdRef: c,
      onRetryMessage: u
    } = An(), { t: l } = $t(), [h, f] = xe(!1), [d, y] = xe(!1), [x, I] = xe(null), T = oe(async () => {
      try {
        await navigator.clipboard.writeText(t.content), f(!0), setTimeout(() => f(!1), 2e3);
      } catch (b) {
        console.error("Failed to copy message:", b);
      }
    }, [t.content]), _ = oe(() => {
      u && u(t.id);
    }, [u, t.id]), N = oe((b) => {
      I(b);
    }, []), A = oe(() => {
      I(null);
    }, []), L = () => /* @__PURE__ */ P("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ m(ro, { size: 16, variant: "dots" }),
      /* @__PURE__ */ m("span", { children: l("chat.reasoning.thinking") })
    ] }), E = () => u && /* @__PURE__ */ m(
      "button",
      {
        className: "chat-wrapper__retry-button",
        onClick: _,
        children: l("chat.errors.retry")
      }
    ), U = () => /* @__PURE__ */ P(Ft, { children: [
      /* @__PURE__ */ m("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ m(
        "button",
        {
          className: `chat-wrapper__copy-button ${d ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: T,
          title: "Copy message",
          children: /* @__PURE__ */ m(Lc, {})
        }
      ) }),
      h && /* @__PURE__ */ m("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), B = () => /* @__PURE__ */ m("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ P("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ m("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ m(
        qa,
        {
          components: so,
          remarkPlugins: [Ka],
          children: t.content
        },
        `${t.id}-${t.isStreaming ? "streaming" : "final"}`
      ) }),
      U()
    ] }) }), G = () => /* @__PURE__ */ P("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ m("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ m(
        qa,
        {
          remarkPlugins: [Ka],
          components: Hp,
          children: t.content
        },
        `${t.id}-user`
      ) }),
      t.media && t.media.length > 0 && /* @__PURE__ */ m("div", { className: "chat-wrapper__media", children: t.media.map((b, O) => /* @__PURE__ */ m(
        "img",
        {
          src: b,
          alt: `Uploaded content ${O + 1}`,
          className: "chat-wrapper__media-image chat-wrapper__media-image--clickable",
          onClick: () => N(b),
          style: {
            cursor: "zoom-in",
            transition: "transform 0.2s, box-shadow 0.2s"
          },
          onMouseEnter: (H) => {
            H.currentTarget.style.transform = "scale(1.02)", H.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
          },
          onMouseLeave: (H) => {
            H.currentTarget.style.transform = "scale(1)", H.currentTarget.style.boxShadow = "";
          },
          title: "Click to view full size"
        },
        O
      )) })
    ] }), Z = () => t.role === "assistant" && t.isStreaming && t.content === "" && t.id === c.current ? L() : t.role === "system" ? /* @__PURE__ */ m(Dp, { message: t }) : t.role === "assistant" ? B() : G(), W = () => /* @__PURE__ */ P(Op, { isStreaming: t.isStreaming || !1, children: [
      /* @__PURE__ */ m(
        to,
        {
          title: e(t.content, t.isStreaming),
          status: n(t.content, t.isStreaming),
          duration: r(t.content)
        }
      ),
      /* @__PURE__ */ m(no, { children: i(t.content) })
    ] }), z = () => {
      var b;
      return /* @__PURE__ */ m(Lp, { isStreaming: t.isStreaming || !1, children: /* @__PURE__ */ m(
        Pp,
        {
          title: a(t.content, t.isStreaming),
          status: s(t.content, t.isStreaming),
          toolData: t.toolData,
          toolName: (b = t.toolData) == null ? void 0 : b.toolName,
          clientTools: o
        }
      ) });
    };
    return /* @__PURE__ */ P(Ft, { children: [
      /* @__PURE__ */ m(
        "div",
        {
          className: `chat-wrapper__message chat-wrapper__message--${t.role === "system" ? "assistant" : t.role === "reasoning" ? "reasoning" : t.role === "tooling" ? "tooling" : t.role}`,
          onMouseEnter: () => t.role === "assistant" && y(!0),
          onMouseLeave: () => t.role === "assistant" && y(!1),
          children: t.role === "reasoning" ? W() : t.role === "tooling" ? z() : /* @__PURE__ */ P(Ft, { children: [
            /* @__PURE__ */ m("div", { className: "chat-wrapper__message-content", children: Z() }),
            t.role === "user" && t.hasError && !t.isRetrying && E()
          ] })
        }
      ),
      /* @__PURE__ */ m(
        io,
        {
          imageUrl: x,
          isOpen: !!x,
          onClose: A,
          alt: "Message image"
        }
      )
    ] });
  }
);
oo.displayName = "MessageItem";
const zp = ({ isVisible: t }) => t ? /* @__PURE__ */ m("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ m("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ P("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ m("span", {}),
  /* @__PURE__ */ m("span", {}),
  /* @__PURE__ */ m("span", {})
] }) }) }) }) : null, lo = In((t, e) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = An();
  return /* @__PURE__ */ P("div", { className: "chat-wrapper__messages", children: [
    n.map((a) => /* @__PURE__ */ m(
      oo,
      {
        message: a
      },
      a.id
    )),
    /* @__PURE__ */ m(zp, { isVisible: r && !i }),
    /* @__PURE__ */ m("div", { ref: e })
  ] });
});
lo.displayName = "MessagesList";
const St = (...t) => t.filter(Boolean).join(" "), Up = () => /* @__PURE__ */ P(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ P("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ m(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ m("g", { clipPath: "url(#clip0_121_23927)", children: /* @__PURE__ */ m(
          "path",
          {
            d: "M16.3333 26.3541L18.2133 28.2341L25.6666 20.7941V37.0208H28.3333V20.7941L35.7733 28.2474L37.6666 26.3541L26.9999 15.6874L16.3333 26.3541Z",
            fill: "white"
          }
        ) })
      ] }),
      /* @__PURE__ */ P("defs", { children: [
        /* @__PURE__ */ P(
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
              /* @__PURE__ */ m("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ m(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ m("feOffset", { dy: "1" }),
              /* @__PURE__ */ m("feGaussianBlur", { stdDeviation: "1" }),
              /* @__PURE__ */ m("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ m(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                }
              ),
              /* @__PURE__ */ m(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ m(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ m("feOffset", { dy: "1" }),
              /* @__PURE__ */ m("feGaussianBlur", { stdDeviation: "1.5" }),
              /* @__PURE__ */ m("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ m(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                }
              ),
              /* @__PURE__ */ m(
                "feBlend",
                {
                  mode: "normal",
                  in2: "effect1_dropShadow_121_23927",
                  result: "effect2_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ m(
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
        /* @__PURE__ */ m("clipPath", { id: "clip0_121_23927", children: /* @__PURE__ */ m(
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
), Bp = () => /* @__PURE__ */ P(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ P("g", { filter: "url(#filter0_dd_stop_121_23927)", children: [
        /* @__PURE__ */ m(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ m("g", { transform: "translate(11, 11.3541)", children: /* @__PURE__ */ m("path", { d: "M21.3333 10.6667V21.3333H10.6667V10.6667H21.3333ZM24 8H8V24H24V8Z", fill: "white" }) })
      ] }),
      /* @__PURE__ */ m("defs", { children: /* @__PURE__ */ P(
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
            /* @__PURE__ */ m("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
            /* @__PURE__ */ m(
              "feColorMatrix",
              {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
              }
            ),
            /* @__PURE__ */ m("feOffset", { dy: "1" }),
            /* @__PURE__ */ m("feGaussianBlur", { stdDeviation: "1" }),
            /* @__PURE__ */ m("feComposite", { in2: "hardAlpha", operator: "out" }),
            /* @__PURE__ */ m(
              "feColorMatrix",
              {
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
              }
            ),
            /* @__PURE__ */ m(
              "feBlend",
              {
                mode: "normal",
                in2: "BackgroundImageFix",
                result: "effect1_dropShadow_stop_121_23927"
              }
            ),
            /* @__PURE__ */ m(
              "feColorMatrix",
              {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
              }
            ),
            /* @__PURE__ */ m("feOffset", { dy: "1" }),
            /* @__PURE__ */ m("feGaussianBlur", { stdDeviation: "1.5" }),
            /* @__PURE__ */ m("feComposite", { in2: "hardAlpha", operator: "out" }),
            /* @__PURE__ */ m(
              "feColorMatrix",
              {
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              }
            ),
            /* @__PURE__ */ m(
              "feBlend",
              {
                mode: "normal",
                in2: "effect1_dropShadow_stop_121_23927",
                result: "effect2_dropShadow_stop_121_23927"
              }
            ),
            /* @__PURE__ */ m(
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
), $p = ({ className: t, ...e }) => /* @__PURE__ */ m("form", { className: St("chat-wrapper__prompt-input", t), ...e }), co = In(
  ({
    onChange: t,
    className: e,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...s
  }, o) => {
    const c = (u) => {
      if (u.key === "Enter") {
        if (u.shiftKey)
          return;
        u.preventDefault();
        const l = u.currentTarget.form;
        if (l) {
          const h = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          l.dispatchEvent(h);
        }
      }
      a == null || a(u);
    };
    return /* @__PURE__ */ m(
      "textarea",
      {
        ref: o,
        className: St("chat-wrapper__prompt-textarea", e),
        name: "message",
        onChange: t,
        onKeyDown: c,
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
co.displayName = "PromptInputTextarea";
const Vp = ({
  className: t,
  ...e
}) => /* @__PURE__ */ m("div", { className: St("chat-wrapper__prompt-toolbar", t), ...e }), jp = ({
  className: t,
  ...e
}) => /* @__PURE__ */ m("div", { className: St("chat-wrapper__prompt-tools", t), ...e }), Gp = ({
  variant: t = "ghost",
  size: e = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = e === "default" && (typeof r == "string" || wt.Children.count(r) === 1) ? "icon" : e;
  return /* @__PURE__ */ m(
    "button",
    {
      className: St(
        "chat-wrapper__prompt-button",
        `chat-wrapper__prompt-button--${t}`,
        `chat-wrapper__prompt-button--${a}`,
        n
      ),
      type: "button",
      ...i,
      children: r
    }
  );
}, Wp = ({
  className: t,
  variant: e = "default",
  size: n = "icon",
  status: r = Ee.IDLE,
  children: i,
  disabled: a,
  ...s
}) => {
  const o = Lr(r);
  let c = o ? /* @__PURE__ */ m(Bp, {}) : /* @__PURE__ */ m(Up, {});
  return /* @__PURE__ */ m(
    "button",
    {
      className: St(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${e}`,
        `chat-wrapper__prompt-submit--${n}`,
        !a && "chat-wrapper__prompt-submit--enabled",
        o && "chat-wrapper__prompt-submit--stop",
        t
      ),
      type: o ? "button" : "submit",
      disabled: a,
      ...s,
      children: i ?? c
    }
  );
}, yf = ({
  className: t,
  children: e,
  ...n
}) => /* @__PURE__ */ m("select", { className: St("chat-wrapper__prompt-select", t), ...n, children: e }), wf = ({
  className: t,
  children: e,
  ...n
}) => /* @__PURE__ */ m(
  "button",
  {
    className: St("chat-wrapper__prompt-select-trigger", t),
    type: "button",
    ...n,
    children: e
  }
), Sf = ({
  className: t,
  ...e
}) => /* @__PURE__ */ m(
  "div",
  {
    className: St("chat-wrapper__prompt-select-content", t),
    ...e
  }
), xf = ({
  className: t,
  value: e,
  ...n
}) => /* @__PURE__ */ m(
  "div",
  {
    className: St("chat-wrapper__prompt-select-item", t),
    "data-value": e,
    ...n
  }
), kf = ({
  className: t,
  placeholder: e,
  ...n
}) => /* @__PURE__ */ m(
  "span",
  {
    className: St("chat-wrapper__prompt-select-value", t),
    ...n,
    children: e
  }
), qp = ({
  placeholderTexts: t,
  shouldAnimate: e,
  className: n = ""
}) => {
  const [r, i] = xe(0), [a, s] = xe(!1), [o, c] = xe(0);
  return Te(() => {
    if (!e || t.length <= 1) return;
    const u = setInterval(() => {
      s(!0), setTimeout(() => {
        i((l) => (l + 1) % t.length), c((l) => l + 1), s(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(u);
  }, [e, t.length]), Te(() => {
    e || (i(0), s(!1), c(0));
  }, [e]), /* @__PURE__ */ m(
    "div",
    {
      className: `animated-placeholder-container ${n}`,
      children: /* @__PURE__ */ m(
        "span",
        {
          className: `animated-placeholder-text ${a ? "transitioning" : ""}`,
          children: t[r]
        },
        o
      )
    }
  );
}, Kp = In((t, e) => {
  const {
    placeholderTexts: n,
    isStreaming: r,
    isLoadingConversation: i,
    chatStatus: a,
    fileUploadEnabled: s,
    fileUploadConfig: o,
    chipName: c,
    chipLogo: u,
    messages: l,
    onSubmit: h,
    onFileUpload: f,
    onStopGeneration: d
  } = An(), { t: y } = $t(), x = r || i, I = l.length > 0, [T, _] = xe(""), [N, A] = xe([]), [L, E] = xe([]), [U, B] = xe(null), [G, Z] = xe(null), [W, z] = xe(!1), b = pe(null), O = oe(($) => {
    Z($), z(!0);
  }, []), H = oe(($) => new Promise((C, re) => {
    const q = new FileReader();
    q.onload = () => C(q.result), q.onerror = re, q.readAsDataURL($);
  }), []), ee = n && n.length > 0 ? n : [y("chat.input.placeholder")], ie = T.length === 0 && !I && ee.length > 1;
  Ya(
    e,
    () => ({
      focus: () => {
        var $;
        ($ = b.current) == null || $.focus();
      },
      setText: ($) => {
        _($), setTimeout(() => {
          if (b.current) {
            b.current.focus();
            const C = $.length;
            b.current.setSelectionRange(C, C);
          }
        }, 0);
      },
      textareaRef: b
    }),
    []
  );
  const ge = oe(
    ($) => {
      $.preventDefault();
      const re = new FormData($.currentTarget).get("message");
      if (re != null && re.trim()) {
        const q = ai(re.trim(), !1);
        if (!q.trim())
          return;
        h(q, N), _(""), A([]);
      }
    },
    [h, N]
  ), Ce = oe(
    ($) => {
      const re = $.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      _(re), U && re.trim() && B(null);
    },
    [U]
  ), w = oe(
    async ($) => {
      var q;
      const re = Array.from(((q = $.clipboardData) == null ? void 0 : q.items) || []).filter((le) => le.type.startsWith("image/"));
      if (re.length > 0) {
        $.preventDefault(), B(null);
        try {
          const le = await Promise.all(
            re.map((ae) => {
              const te = ae.getAsFile();
              return te ? new File(
                [te],
                `clipboard-image-${Date.now()}.${te.type.split("/")[1]}`,
                {
                  type: te.type
                }
              ) : null;
            })
          ).then((ae) => ae.filter(Boolean));
          if (le.length > 0) {
            const ae = le.filter((te) => {
              const Se = (o == null ? void 0 : o.maxFileSize) ?? 15728640;
              return te.size > Se ? (B(
                y("chat.fileUpload.sizeLimitExceeded", {
                  maxSize: Math.round(Se / 1048576)
                })
              ), !1) : ((o == null ? void 0 : o.allowedTypes) ?? [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp"
              ]).includes(te.type) ? !0 : (B(y("chat.fileUpload.typeNotAllowed")), !1);
            });
            if (ae.length > 0) {
              const te = (o == null ? void 0 : o.maxFiles) ?? 5;
              if (N.length + L.length + ae.length > te) {
                B(
                  y("chat.fileUpload.maxFilesExceeded", { maxFiles: te })
                );
                return;
              }
              const fe = ae.map(async (ve) => ({
                file: ve,
                preview: await H(ve),
                isUploading: !0,
                progress: 0
              })), Ne = await Promise.all(fe);
              E((ve) => [...ve, ...Ne]);
              try {
                const ve = await f(ae);
                E(
                  (Fe) => Fe.filter((lt) => !ae.includes(lt.file))
                ), A((Fe) => [...Fe, ...ve]), B(null);
              } catch {
                E(
                  (Fe) => Fe.filter((lt) => !ae.includes(lt.file))
                ), B(y("chat.errors.connection"));
              }
            }
          }
        } catch (le) {
          B(
            le instanceof Error ? le.message : y("chat.errors.unexpected")
          ), E([]);
        }
      }
    },
    [
      f,
      o,
      N,
      L,
      H,
      y
    ]
  ), Q = oe(async () => {
    const $ = document.createElement("input");
    $.type = "file", $.accept = "image/*", $.multiple = !0, $.onchange = async (C) => {
      const re = C.target.files;
      if (re)
        try {
          B(null);
          const q = Array.from(re).filter((le) => {
            const ae = tl(le.name);
            le.name;
            const te = (o == null ? void 0 : o.maxFileSize) ?? 15 * 1024 * 1024;
            return le.size > te ? (B(
              y("chat.fileUpload.sizeLimitExceeded", {
                maxSize: Math.round(te / (1024 * 1024))
              })
            ), !1) : ((o == null ? void 0 : o.allowedTypes) ?? [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ]).includes(le.type) ? !0 : (B(y("chat.fileUpload.typeNotAllowed")), !1);
          });
          if (q.length > 0) {
            const le = (o == null ? void 0 : o.maxFiles) ?? 5;
            if (N.length + L.length + q.length > le) {
              B(
                y("chat.fileUpload.maxFilesExceeded", { maxFiles: le })
              );
              return;
            }
            const te = q.map(async (fe) => ({
              file: fe,
              preview: await H(fe),
              isUploading: !0,
              progress: 0
            })), Se = await Promise.all(te);
            E((fe) => [...fe, ...Se]);
            try {
              const fe = await f(q);
              E(
                (Ne) => Ne.filter((ve) => !q.includes(ve.file))
              ), A((Ne) => [...Ne, ...fe]), B(null);
            } catch {
              E(
                (Ne) => Ne.filter((ve) => !q.includes(ve.file))
              ), B(y("chat.errors.connection"));
            }
          }
        } catch (q) {
          B(
            q instanceof Error ? q.message : y("chat.errors.unexpected")
          ), E([]);
        }
    }, $.click();
  }, [
    f,
    o,
    N,
    L,
    H,
    y
  ]);
  return /* @__PURE__ */ P(
    $p,
    {
      onSubmit: ge,
      className: `${x ? "chat-wrapper__prompt-input--disabled" : ""} ${N.length > 0 || L.length > 0 || U ? "chat-wrapper__prompt-input--with-media" : ""}`,
      children: [
        /* @__PURE__ */ m(
          co,
          {
            ref: b,
            name: "message",
            value: T,
            onChange: Ce,
            onPaste: w,
            placeholder: "",
            disabled: x
          }
        ),
        !T.trim() && /* @__PURE__ */ m(
          qp,
          {
            placeholderTexts: ee,
            shouldAnimate: ie
          }
        ),
        U && /* @__PURE__ */ P("div", { className: "chat-wrapper__upload-error", children: [
          /* @__PURE__ */ m("div", { className: "chat-wrapper__upload-error-icon", children: /* @__PURE__ */ m("span", { className: "chat-wrapper__upload-error-icon-text", children: "!" }) }),
          /* @__PURE__ */ m("span", { className: "chat-wrapper__upload-error-message", children: U }),
          /* @__PURE__ */ m(
            "button",
            {
              className: "chat-wrapper__upload-error-dismiss",
              onClick: () => B(null),
              title: "Dismiss",
              children: "×"
            }
          )
        ] }),
        (N.length > 0 || L.length > 0) && /* @__PURE__ */ P("div", { className: "chat-wrapper__media-preview-container", children: [
          L.map(($, C) => /* @__PURE__ */ P(
            "div",
            {
              className: "chat-wrapper__media-item-wrapper",
              children: [
                /* @__PURE__ */ P("div", { className: "chat-wrapper__uploading-thumbnail", children: [
                  /* @__PURE__ */ m(
                    "img",
                    {
                      src: $.preview,
                      alt: `Uploading ${C + 1}`,
                      className: "chat-wrapper__uploading-thumbnail-image"
                    }
                  ),
                  /* @__PURE__ */ m("div", { className: "chat-wrapper__uploading-overlay", children: /* @__PURE__ */ m("div", { className: "chat-wrapper__uploading-spinner" }) })
                ] }),
                /* @__PURE__ */ m(
                  "button",
                  {
                    onClick: () => {
                      E(
                        (re) => re.filter((q, le) => le !== C)
                      );
                    },
                    className: "chat-wrapper__media-remove-button",
                    title: "Cancel upload",
                    children: "×"
                  }
                )
              ]
            },
            `uploading-${C}`
          )),
          N.map(($, C) => {
            const re = $.startsWith("data:image/"), q = $.startsWith("http://") || $.startsWith("https://"), le = re || q;
            return /* @__PURE__ */ P(
              "div",
              {
                className: "chat-wrapper__media-item-wrapper",
                children: [
                  le ? /* @__PURE__ */ P(
                    "div",
                    {
                      className: "chat-wrapper__media-thumbnail",
                      onClick: () => O($),
                      title: "Click to view full image",
                      children: [
                        /* @__PURE__ */ m(
                          "img",
                          {
                            src: $,
                            alt: `Attachment ${C + 1}`,
                            className: "chat-wrapper__media-thumbnail-image"
                          }
                        ),
                        /* @__PURE__ */ m("div", { className: "chat-wrapper__media-thumbnail-overlay" }),
                        /* @__PURE__ */ m("div", { className: "chat-wrapper__media-thumbnail-zoom-icon" })
                      ]
                    }
                  ) : /* @__PURE__ */ P("div", { className: "chat-wrapper__file-preview", children: [
                    /* @__PURE__ */ m("div", { className: "chat-wrapper__file-icon-container", children: /* @__PURE__ */ P(
                      "svg",
                      {
                        width: "24",
                        height: "25",
                        viewBox: "0 0 24 25",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [
                          /* @__PURE__ */ m(
                            "mask",
                            {
                              id: "mask0_190_623",
                              style: { maskType: "alpha" },
                              maskUnits: "userSpaceOnUse",
                              x: "0",
                              y: "0",
                              width: "24",
                              height: "25",
                              children: /* @__PURE__ */ m(
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
                          /* @__PURE__ */ m("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ m(
                            "path",
                            {
                              d: "M8.19225 13.0079H15.8077V11.5079H8.19225V13.0079ZM8.19225 15.8926H15.8077V14.3926H8.19225V15.8926ZM8.19225 18.7771H12.8077V17.2771H8.19225V18.7771ZM6.30775 21.8541C5.80258 21.8541 5.375 21.6791 5.025 21.3291C4.675 20.9791 4.5 20.5515 4.5 20.0464V4.66188C4.5 4.15671 4.675 3.72913 5.025 3.37913C5.375 3.02913 5.80258 2.85413 6.30775 2.85413H14.25L19.5 8.10413V20.0464C19.5 20.5515 19.325 20.9791 18.975 21.3291C18.625 21.6791 18.1974 21.8541 17.6923 21.8541H6.30775ZM13.5 8.85413V4.35413H6.30775C6.23075 4.35413 6.16025 4.38621 6.09625 4.45038C6.03208 4.51438 6 4.58488 6 4.66188V20.0464C6 20.1234 6.03208 20.1939 6.09625 20.2579C6.16025 20.322 6.23075 20.3541 6.30775 20.3541H17.6923C17.7692 20.3541 17.8398 20.322 17.9038 20.2579C17.9679 20.1939 18 20.1234 18 20.0464V8.85413H13.5Z",
                              fill: "white"
                            }
                          ) })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ P("div", { className: "chat-wrapper__file-info", children: [
                      /* @__PURE__ */ m("div", { className: "chat-wrapper__file-name", children: (() => {
                        const ae = $.match(/name=([^;]+)/);
                        return ae ? decodeURIComponent(ae[1]) : "document.pdf";
                      })() }),
                      /* @__PURE__ */ m("div", { className: "chat-wrapper__file-type", children: (() => {
                        const ae = $.match(/data:([^;]+)/);
                        if (ae) {
                          const te = ae[1];
                          switch (te) {
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
                              const Se = te.split("/")[1];
                              return Se ? Se.toUpperCase().substring(0, 4) : "FILE";
                          }
                        }
                        return "FILE";
                      })() })
                    ] })
                  ] }),
                  /* @__PURE__ */ m(
                    "button",
                    {
                      onClick: () => {
                        A(
                          (ae) => ae.filter((te, Se) => Se !== C)
                        ), U && B(null);
                      },
                      className: `chat-wrapper__media-remove-button ${le ? "" : "chat-wrapper__media-remove-button--file"}`,
                      title: "Remove attachment",
                      children: "×"
                    }
                  )
                ]
              },
              `uploaded-${C}`
            );
          })
        ] }),
        /* @__PURE__ */ P(Vp, { children: [
          /* @__PURE__ */ P(jp, { children: [
            s && /* @__PURE__ */ m("div", { className: "chat-wrapper__file-upload-container", children: /* @__PURE__ */ m(
              Gp,
              {
                variant: "ghost",
                size: "icon",
                onClick: Q,
                title: L.length > 0 ? `Uploading ${L.length} file(s)...` : N.length > 0 ? `${N.length}/${(o == null ? void 0 : o.maxFiles) ?? 5} image(s) attached` : `Attach images (max ${(o == null ? void 0 : o.maxFiles) ?? 5} files, ${Math.round(
                  ((o == null ? void 0 : o.maxFileSize) ?? 15 * 1024 * 1024) / (1024 * 1024)
                )}MB each)`,
                disabled: x || L.length > 0,
                children: /* @__PURE__ */ P(
                  "svg",
                  {
                    width: "36",
                    height: "37",
                    viewBox: "0 0 36 37",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: [
                      /* @__PURE__ */ m(
                        "rect",
                        {
                          y: "0.354126",
                          width: "36",
                          height: "36",
                          rx: "18",
                          fill: "#F4F6F8"
                        }
                      ),
                      /* @__PURE__ */ m("g", { clipPath: "url(#clip0_121_9706)", children: /* @__PURE__ */ m(
                        "path",
                        {
                          d: "M21.3334 13.3541V22.9374C21.3334 24.7791 19.8417 26.2708 18 26.2708C16.1584 26.2708 14.6667 24.7791 14.6667 22.9374V12.5208C14.6667 11.3708 15.6 10.4374 16.75 10.4374C17.9 10.4374 18.8334 11.3708 18.8334 12.5208V21.2708C18.8334 21.7291 18.4584 22.1041 18 22.1041C17.5417 22.1041 17.1667 21.7291 17.1667 21.2708V13.3541H15.9167V21.2708C15.9167 22.4208 16.85 23.3541 18 23.3541C19.15 23.3541 20.0834 22.4208 20.0834 21.2708V12.5208C20.0834 10.6791 18.5917 9.18744 16.75 9.18744C14.9084 9.18744 13.4167 10.6791 13.4167 12.5208V22.9374C13.4167 25.4708 15.4667 27.5208 18 27.5208C20.5334 27.5208 22.5834 25.4708 22.5834 22.9374V13.3541H21.3334Z",
                          fill: "#212B36"
                        }
                      ) }),
                      /* @__PURE__ */ m("defs", { children: /* @__PURE__ */ m("clipPath", { id: "clip0_121_9706", children: /* @__PURE__ */ m(
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
            s && c && /* @__PURE__ */ m("div", { className: "chat-wrapper__divider" }),
            c && /* @__PURE__ */ P("div", { className: "chat-wrapper__restaurant-chip", children: [
              u && /* @__PURE__ */ m(
                "img",
                {
                  src: u,
                  alt: "Chip logo",
                  className: "chat-wrapper__restaurant-logo"
                }
              ),
              /* @__PURE__ */ m("span", { className: "chat-wrapper__restaurant-name", children: c })
            ] })
          ] }),
          /* @__PURE__ */ m(
            Wp,
            {
              status: a,
              disabled: Lr(a) ? !1 : !T.trim() || x || L.length > 0,
              onClick: Lr(a) && d ? () => {
                d();
              } : void 0
            }
          )
        ] }),
        /* @__PURE__ */ m(
          io,
          {
            imageUrl: G,
            isOpen: W,
            onClose: () => {
              z(!1), Z(null);
            },
            alt: "Image preview"
          }
        )
      ]
    }
  );
}), Zp = () => {
  const { suggestedPrompts: t, chatInputRef: e, enableSuggestedPromptsAnimation: n = !0 } = An(), r = pe(!1), i = pe(null), a = pe(null);
  if (Te(() => () => {
    i.current && cancelAnimationFrame(i.current), a.current && clearTimeout(a.current);
  }, []), !t || t.length === 0)
    return null;
  const s = oe((o) => {
    var l;
    if (r.current)
      return;
    if (!e.current) {
      console.warn("Chat input ref not available");
      return;
    }
    if (!n) {
      e.current.setText(o.description), e.current.focus();
      return;
    }
    i.current && (cancelAnimationFrame(i.current), i.current = null), a.current && (clearTimeout(a.current), a.current = null);
    const c = (l = e.current.textareaRef) == null ? void 0 : l.current;
    if (!c) {
      console.warn("Textarea ref not available, using fallback"), e.current.setText(o.description);
      return;
    }
    e.current.setText(""), c.focus(), r.current = !0;
    let u = !1;
    return o.description.length > 0 && e.current.setText(o.description[0]), a.current = setTimeout(() => {
      let h = 1;
      const f = 10, d = () => {
        if (u || !e.current) {
          r.current = !1, a.current = null;
          return;
        }
        if (h < o.description.length) {
          const y = o.description.substring(0, h + 1);
          c.value = y;
          const x = new Event("input", { bubbles: !0 });
          c.dispatchEvent(x), h++, a.current = setTimeout(d, f);
        } else
          r.current = !1, a.current = null, e.current && e.current.setText(o.description);
      };
      d();
    }, 10), () => {
      u = !0, a.current && (clearTimeout(a.current), a.current = null), r.current = !1;
    };
  }, [e, n]);
  return /* @__PURE__ */ P("div", { className: "chat-wrapper__suggested-prompts", children: [
    /* @__PURE__ */ m("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
    /* @__PURE__ */ m("div", { className: "chat-wrapper__suggested-prompts-grid", children: t.map((o, c) => /* @__PURE__ */ m(
      "button",
      {
        className: "chat-wrapper__suggested-prompt-card",
        onClick: () => s(o),
        children: /* @__PURE__ */ P("div", { className: "chat-wrapper__suggested-prompt-content", children: [
          /* @__PURE__ */ m("h4", { className: "chat-wrapper__suggested-prompt-title", children: o.title }),
          /* @__PURE__ */ m("p", { className: "chat-wrapper__suggested-prompt-description", children: o.description })
        ] })
      },
      c
    )) })
  ] });
}, Yp = ({
  size: t = 20,
  fullHeight: e = !1
}) => /* @__PURE__ */ m(
  "div",
  {
    className: `chat-wrapper__inline-loader ${e ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ m("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ m(ro, { size: t, variant: "dots" }) })
  }
), Xp = ({
  headerName: t,
  headerDescription: e
}) => /* @__PURE__ */ P("div", { className: "chat-wrapper__main-header", children: [
  /* @__PURE__ */ m("h1", { className: "chat-wrapper__main-title", children: t }),
  e && /* @__PURE__ */ m("p", { className: "chat-wrapper__description", children: e })
] }), Jp = () => /* @__PURE__ */ P("div", { className: "chat-wrapper__skeleton", children: [
  /* @__PURE__ */ P("div", { className: "chat-wrapper__skeleton-header", children: [
    /* @__PURE__ */ m("div", { className: "chat-wrapper__skeleton-title" }),
    /* @__PURE__ */ m("div", { className: "chat-wrapper__skeleton-description" })
  ] }),
  /* @__PURE__ */ P("div", { className: "chat-wrapper__skeleton-content", children: [
    /* @__PURE__ */ m("div", { className: "chat-wrapper__skeleton-input", children: /* @__PURE__ */ m("div", { className: "chat-wrapper__skeleton-input-field" }) }),
    /* @__PURE__ */ P("div", { className: "chat-wrapper__skeleton-prompts", children: [
      /* @__PURE__ */ m("div", { className: "chat-wrapper__skeleton-prompts-title" }),
      /* @__PURE__ */ P("div", { className: "chat-wrapper__skeleton-prompts-grid", children: [
        /* @__PURE__ */ m("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ m("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ m("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ m("div", { className: "chat-wrapper__skeleton-prompt-card" })
      ] })
    ] })
  ] })
] }), Qp = ({
  errorType: t = "unknown",
  errorMessage: e,
  retryCount: n = 0,
  onRetry: r,
  footer: i
}) => {
  const { t: a } = $t(), s = () => {
    if (e)
      return {
        title: a("chat.errors.connection"),
        message: e
      };
    switch (t) {
      case "network":
        return {
          title: a("chat.errors.connection"),
          message: a("chat.errors.connection")
        };
      case "auth":
        return {
          title: a("chat.errors.authentication"),
          message: a("chat.errors.authentication")
        };
      case "server":
        return {
          title: a("chat.errors.unexpected"),
          message: a("chat.errors.unexpected")
        };
      default:
        return {
          title: a("chat.errors.unexpected"),
          message: a("chat.errors.unexpected")
        };
    }
  }, { title: o, message: c } = s();
  return /* @__PURE__ */ m("div", { className: "chat-wrapper__connection-error-overlay", children: /* @__PURE__ */ P("div", { className: "chat-wrapper__connection-error-card", children: [
    /* @__PURE__ */ m("div", { className: "chat-wrapper__connection-error-icon", children: /* @__PURE__ */ P(
      "svg",
      {
        width: "48",
        height: "48",
        viewBox: "0 0 48 48",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ m("circle", { cx: "24", cy: "24", r: "20", fill: "#FEE2E2" }),
          /* @__PURE__ */ m(
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
    /* @__PURE__ */ m("h3", { className: "chat-wrapper__connection-error-title", children: o }),
    /* @__PURE__ */ m("p", { className: "chat-wrapper__connection-error-message", children: c }),
    n > 0 && /* @__PURE__ */ P("p", { className: "chat-wrapper__connection-error-retry-count", children: [
      "Retry attempt: ",
      n
    ] }),
    r && /* @__PURE__ */ P(
      "button",
      {
        className: "chat-wrapper__connection-error-button",
        onClick: r,
        children: [
          /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ m(
                  "path",
                  {
                    d: "M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84871 2 11.5009 2.85147 12.6 4.2",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                  }
                ),
                /* @__PURE__ */ m(
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
          a("chat.errors.retry")
        ]
      }
    ),
    i && /* @__PURE__ */ m("div", { className: "chat-wrapper__connection-error-footer", children: i })
  ] }) });
}, ef = () => {
  const {
    messages: t,
    isLoadingConversation: e,
    isStreaming: n,
    headerName: r,
    headerDescription: i,
    suggestedPrompts: a,
    footer: s,
    messagesEndRef: o,
    chatInputRef: c,
    isOffline: u,
    connectionState: l,
    isInitialConnection: h,
    conversationError: f,
    onRetryConnection: d
  } = An(), y = t.length === 0 && !e && l === De.CONNECTING, x = t.length === 0 && !e && l === De.DISCONNECTED && !h;
  if (y || x)
    return /* @__PURE__ */ P("div", { style: { position: "relative", height: "100%" }, children: [
      /* @__PURE__ */ m(Jp, {}),
      x && /* @__PURE__ */ m(
        Qp,
        {
          errorType: u ? "network" : "server",
          errorMessage: f || void 0,
          onRetry: d,
          footer: s
        }
      )
    ] });
  const I = _t.state.shouldShowMainHeader(
    t.length,
    n,
    e
  ), T = _t.state.shouldShowSuggestedPrompts(
    t.length,
    n,
    e,
    a
  ), _ = _t.state.getContentAreaClass(
    t.length,
    n,
    e
  );
  return /* @__PURE__ */ P(Ft, { children: [
    I && /* @__PURE__ */ m("div", { style: u ? { paddingTop: "48px" } : void 0, children: /* @__PURE__ */ m(
      Xp,
      {
        headerName: r,
        headerDescription: i
      }
    ) }),
    /* @__PURE__ */ P(
      "div",
      {
        className: _,
        style: u && t.length > 0 ? { paddingTop: "72px" } : void 0,
        children: [
          e && t.length === 0 ? /* @__PURE__ */ m("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ m(Yp, { fullHeight: !0 }) }) : /* @__PURE__ */ m(lo, { ref: o }),
          /* @__PURE__ */ m("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ m(Kp, { ref: c }) }),
          T && /* @__PURE__ */ m(Zp, {}),
          T && s && /* @__PURE__ */ m("div", { children: s })
        ]
      }
    )
  ] });
};
function tf({
  isVisible: t,
  isReconnecting: e = !1
}) {
  const { t: n } = $t();
  return t ? /* @__PURE__ */ m("div", { className: "network-status-banner", children: /* @__PURE__ */ m("div", { className: "network-status-banner__content", children: e ? /* @__PURE__ */ P(Ft, { children: [
    /* @__PURE__ */ m("div", { className: "network-status-banner__spinner" }),
    /* @__PURE__ */ m("span", { children: n("chat.connection.reconnecting") })
  ] }) : /* @__PURE__ */ P(Ft, { children: [
    /* @__PURE__ */ m("div", { className: "network-status-banner__icon", children: /* @__PURE__ */ m("span", { className: "network-status-banner__icon-text", children: "!" }) }),
    /* @__PURE__ */ m("span", { className: "network-status-banner__message", children: n("chat.errors.connection") })
  ] }) }) }) : null;
}
const uo = In(
  ({
    // Authentication and entity context
    auth: t,
    // Server configuration
    chatServerUrl: e,
    chatServerKey: n,
    // Conversation configuration
    metadata: r,
    // Existing props
    config: i,
    tools: a,
    // Note: Tools are stabilized internally to prevent reconnections on re-renders
    contextHelpers: s
  }, o) => {
    var dn, Hn;
    const { token: c, entityId: u, entityType: l } = t;
    _t.validation.validateAuthProps({
      userMpAuthToken: c,
      chatServerUrl: e,
      chatServerKey: n
    });
    const h = He(() => _t.url.convertWebSocketToHttp(e), [e]), f = He(
      () => {
        var M, ye;
        return new Ec({
          apiUrl: h,
          userMpAuthToken: c,
          chatServerKey: n,
          maxFileSize: (M = i.fileUploadConfig) == null ? void 0 : M.maxFileSize,
          allowedTypes: (ye = i.fileUploadConfig) == null ? void 0 : ye.allowedTypes
        });
      },
      [h, c, n, i.fileUploadConfig]
    ), d = He(() => a && a.length > 0 ? a.map(({ execute: M, ...ye }) => ye) : [], [a]), y = wc(), { isOnline: x, wasOffline: I } = Tc(), T = pe(!0), _ = ce((M) => M.isModalOpen), N = ce((M) => M.isCollapsed), A = ce((M) => M.currentMode), L = ce((M) => M.openModal), E = ce((M) => M.closeModal), U = ce((M) => M.toggleCollapse), B = ce((M) => M.toggleFullscreen), G = ce((M) => M.setCurrentMode), Z = ce((M) => M.chatStatus), W = ce((M) => M.setChatStatus), z = ce((M) => M.streamingStatus), b = ce((M) => M.setStreamingStatus), O = ce(
      (M) => M.isLoadingConversation
    ), H = ce(
      (M) => M.setIsLoadingConversation
    ), ee = ce((M) => M.conversationError), ie = ce(
      (M) => M.setConversationError
    ), ge = ce((M) => M.setCurrentThreadId), Ce = ce((M) => M.providerResId), w = ce((M) => M.setProviderResId), Q = ce((M) => M.isStreaming), $ = ce((M) => M.setIsStreaming), C = ce((M) => M.isThinking), re = ce((M) => M.setIsThinking), q = ce((M) => M.streamingContent), le = ce(
      (M) => M.setStreamingContent
    ), ae = ce((M) => M.isHandlingTool), te = ce((M) => M.setIsHandlingTool);
    Te(() => {
      i.mode && G(i.mode);
    }, [i.mode, G]), Te(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const M = (ye) => {
        ye.key === "Escape" && A === "modal" && _ && E();
      };
      if (A === "modal" && _)
        return document.addEventListener("keydown", M), () => document.removeEventListener("keydown", M);
    }, [A, _, E]);
    const {
      messages: Se,
      setMessages: fe,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: Ne,
      getReasoningStatus: ve,
      getReasoningDuration: Fe,
      getReasoningContentOnly: lt,
      getReasoningTitle: ct,
      getToolingTitle: Nt,
      getToolingStatus: Mt,
      handleSetMessage: xt,
      handleReasoningUpdate: At,
      handleChatFinished: kt,
      handleChatError: jt,
      stopGeneration: Gt
    } = y, Wt = pe(null), mt = pe(null), Ct = pe(!1), v = pe(null), R = oe(
      (M) => {
        w(M.providerResId), ge(M.threadId);
      },
      [w, ge]
    ), j = oe(
      (M) => {
        var ye, Je;
        switch (M.type) {
          case pt.CHAT_COMPLETED:
            (ye = M.data) != null && ye.conversationId && w(M.data.conversationId), kt(), W(Ee.IDLE), b(ht.IDLE), setTimeout(() => {
              var Oe;
              (Oe = mt.current) == null || Oe.focus();
            }, 0);
            break;
          case pt.CHAT_ERROR:
            (Je = M.data) != null && Je.error && jt(M.data.error);
            break;
          case pt.CONNECTION_LOST:
            break;
          case pt.CONNECTION_RESTORED:
            break;
          case pt.RECONNECTING:
            break;
        }
      },
      [
        kt,
        jt,
        w,
        ge
      ]
    ), {
      chatClient: J,
      connectionState: de,
      // reconnectAttempts: reconnectAttempt,
      isInitialConnection: Me,
      connectChatClient: Be
    } = Mo({
      // Authentication and server properties
      userMpAuthToken: c,
      chatServerUrl: e,
      chatServerKey: n,
      // Entity configuration
      entityId: u,
      entityType: l,
      // Tools configuration
      tools: a,
      // Other properties
      contextHelpers: s,
      onSetMessage: xt,
      onSystemEvent: j,
      onReasoningUpdate: At,
      onThreadCreated: R,
      onMessagesPersisted: i.onMessagesPersisted,
      onError: i.onError
    });
    Te(() => {
      v.current = J;
    }, [J]), kc({
      metadata: r,
      chatClient: J,
      currentProviderResId: Ce,
      isLoadingConversation: O,
      messages: Se,
      entityId: u,
      entityType: l
    }), Te(() => {
      I && x && T.current ? Be().catch((M) => {
        const ye = sn(
          M,
          "NetworkReconnection"
        );
        T.current = ye.isRetryable, ye.isRetryable || console.warn(
          `[ChatWrapper] Network reconnection failed with non-retryable error: ${ye.reason}`
        );
      }) : I && x && !T.current && console.warn(
        "[ChatWrapper] Network restored but last error was non-retryable (CORS/auth), skipping reconnection"
      );
    }, [x, I, Be]);
    const $e = oe(() => {
      Gt(), W(Ee.IDLE), b(ht.IDLE), J && Ce && J.stopRun(Ce);
    }, [
      Gt,
      W,
      b,
      J,
      Ce
    ]);
    Ya(
      o,
      () => ({
        updateMetadata: (M) => {
          J && Ce && J.updateMetadata(Ce, M).catch((ye) => {
          });
        }
      }),
      [J, Ce]
    );
    const rt = He(
      () => J ? new bc(J, {
        onError: i.onError
      }) : null,
      [J, i.onError]
    ), {
      resetConversationLoader: Ve
      /*, reloadConversation*/
    } = Sc({
      entityId: u,
      entityType: l,
      httpApiUrl: h,
      userMpAuthToken: c,
      chatServerKey: n,
      messages: Se,
      setMessages: fe,
      setIsLoadingConversation: H,
      setConversationError: ie,
      setCurrentThreadId: ge,
      setProviderResId: w,
      metadata: r,
      isConnected: de === De.CONNECTED,
      // Only load after connection established
      onConversationInitialized: i.onConversationInitialized ? () => {
        var M;
        Ct.current = !0, (M = i.onConversationInitialized) == null || M.call(i);
      } : void 0
    }), ke = pe(null), Xe = oe(() => {
      ke.current && cancelAnimationFrame(ke.current), ke.current = requestAnimationFrame(() => {
        var M;
        (M = Wt.current) == null || M.scrollIntoView({ behavior: "smooth" }), ke.current = null;
      });
    }, []);
    Te(() => {
      Xe();
    }, [Se, Xe]), Te(() => {
      q && Xe();
    }, [q, Xe]), Te(() => {
      i.onStreamingStatusChange && i.onStreamingStatusChange(z);
    }, [z, i]), Te(() => () => {
      ke.current && cancelAnimationFrame(ke.current);
    }, []), Te(() => () => {
      fe([]), $(!1), re(!1), le(""), te(!1), W(Ee.IDLE), b(ht.IDLE), H(!1), ie(null), ge(null), w(null);
    }, [
      fe,
      $,
      re,
      le,
      te,
      W,
      b,
      H,
      ie,
      ge,
      w
    ]);
    const je = oe(
      async (M, ye) => {
        if (!M.trim() || Q || !rt || !J)
          return;
        $(!0), re(!0), W(Ee.SUBMITTED), b(ht.STARTING);
        const Je = rt.createUserMessage(
          M,
          ye
        );
        if (fe((Re) => [...Re, Je]), i.onConversationInitialized && !Ct.current && (Ct.current = !0, i.onConversationInitialized()), !navigator.onLine) {
          re(!1), W(Ee.ERROR), fe(
            (Re) => Re.map(
              (ze) => ze.id === Je.id ? {
                ...ze,
                hasError: !0,
                isRetrying: !1,
                errorMessage: "No internet connection. Please check your network and try again."
              } : ze
            )
          ), $(!1), W(Ee.IDLE), b(ht.IDLE);
          return;
        }
        try {
          const Re = new Promise((We, zt) => {
            setTimeout(() => zt(new Error("Message send timeout - connection may be lost")), 5e3);
          });
          await Promise.race([
            J.onTriggerMessage({
              message: Je.content,
              media: ye,
              providerResId: Ce || void 0
            }),
            Re
          ]), W(Ee.STREAMING);
          const ze = setTimeout(() => {
            re(!1), W(Ee.ERROR), fe(
              (We) => We.map(
                (zt) => zt.id === Je.id ? {
                  ...zt,
                  hasError: !0,
                  isRetrying: !1,
                  errorMessage: "No response received. Connection may be lost."
                } : zt
              )
            ), $(!1), W(Ee.IDLE), b(ht.IDLE);
          }, 12e4);
          window.responseTimeoutId = ze;
        } catch (Re) {
          re(!1), W(Ee.ERROR), fe(
            (ze) => ze.map(
              (We) => We.id === Je.id ? {
                ...We,
                hasError: !0,
                isRetrying: !1,
                // Explicitly ensure not in retrying state
                errorMessage: de !== De.CONNECTED ? "Connection lost. Message not sent." : Re instanceof Error ? Re.message : "Failed to send message. Please try again."
              } : We
            )
          ), $(!1), W(Ee.IDLE), b(ht.IDLE);
        }
      },
      [
        rt,
        J,
        Q,
        de,
        fe,
        $,
        re,
        W,
        b,
        Ce
      ]
    ), On = oe(
      async (M) => await f.uploadFiles(M),
      [f]
    ), Xt = He(
      () => _t.css.getContainerClasses(
        A,
        i.position,
        i.theme,
        N,
        i.constrainedHeight
      ),
      [
        A,
        i.position,
        i.theme,
        N,
        i.constrainedHeight
      ]
    ), Jt = oe(() => {
      A === "modal" ? L() : U();
    }, [A, L, U]), Ln = oe(
      (M) => {
        mt.current && mt.current.setText(M.description);
      },
      []
    ), Ht = He(
      () => ({
        messages: Se,
        isStreaming: Q,
        isThinking: C,
        isHandlingTool: ae
      }),
      [Se, Q, C, ae]
    ), Pn = He(
      () => ({
        isLoadingConversation: O,
        chatStatus: Z,
        conversationError: ee,
        isOffline: !x,
        connectionState: de,
        isInitialConnection: Me
      }),
      [
        O,
        Z,
        ee,
        x,
        de,
        Me
      ]
    ), Dn = He(
      () => {
        var M, ye, Je, Oe;
        return {
          headerName: i.headerName,
          headerDescription: i.headerDescription,
          placeholderTexts: i.placeholderTexts,
          chipName: i.chipName,
          chipLogo: i.chipLogo,
          suggestedPrompts: i.suggestedPrompts,
          enableSuggestedPromptsAnimation: i.enableSuggestedPromptsAnimation,
          footer: i.footer,
          clientTools: d,
          fileUploadEnabled: (M = i.features) == null ? void 0 : M.fileUpload,
          fileUploadConfig: {
            maxFiles: ((ye = i.fileUploadConfig) == null ? void 0 : ye.maxFiles) ?? 5,
            maxFileSize: ((Je = i.fileUploadConfig) == null ? void 0 : Je.maxFileSize) ?? 15 * 1024 * 1024,
            // 15MB default
            allowedTypes: ((Oe = i.fileUploadConfig) == null ? void 0 : Oe.allowedTypes) ?? [
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
        (dn = i.features) == null ? void 0 : dn.fileUpload,
        i.fileUploadConfig,
        d
      ]
    ), Ae = He(
      () => ({
        getReasoningTitle: ct,
        getReasoningStatus: ve,
        getReasoningDuration: Fe,
        getReasoningContentOnly: lt,
        getToolingTitle: Nt,
        getToolingStatus: Mt
      }),
      [
        ct,
        ve,
        Fe,
        lt,
        Nt,
        Mt
      ]
    ), Ot = oe(
      async (M) => {
        const ye = Se.find((Oe) => Oe.id === M);
        if (!ye)
          return;
        if ($(!0), re(!0), W(Ee.SUBMITTED), b(ht.STARTING), fe((Oe) => Oe.map(
          (Re) => Re.id === M ? {
            ...Re,
            hasError: !1,
            isRetrying: !0,
            errorMessage: void 0
          } : Re
        )), !navigator.onLine) {
          re(!1), $(!1), W(Ee.ERROR), fe(
            (Oe) => Oe.map(
              (Re) => Re.id === M ? {
                ...Re,
                isRetrying: !1,
                hasError: !0,
                errorMessage: "Still no internet connection. Please check your network and try again."
              } : Re
            )
          ), W(Ee.IDLE), b(ht.IDLE);
          return;
        }
        try {
          de !== De.CONNECTED && await Be(), await (J == null ? void 0 : J.onTriggerMessage({
            message: ye.content,
            media: ye.media,
            providerResId: Ce || void 0
          })), W(Ee.STREAMING);
          const Oe = setTimeout(() => {
            re(!1), W(Ee.ERROR), fe(
              (Re) => Re.map(
                (ze) => ze.id === M ? {
                  ...ze,
                  hasError: !0,
                  isRetrying: !1,
                  errorMessage: "No response received. Connection may be lost."
                } : ze
              )
            ), $(!1), W(Ee.IDLE), b(ht.IDLE);
          }, 12e4);
          window.responseTimeoutId = Oe;
        } catch (Oe) {
          re(!1), $(!1), W(Ee.ERROR), b(ht.IDLE), fe(
            (Re) => Re.map(
              (ze) => ze.id === M ? {
                ...ze,
                isRetrying: !1,
                hasError: !0,
                errorMessage: Oe instanceof Error ? Oe.message : "Retry failed. Please try again."
              } : ze
            )
          ), W(Ee.IDLE);
        }
      },
      [
        Se,
        fe,
        Ve,
        Be,
        je
      ]
    ), Fn = oe(async () => {
      try {
        await Be();
      } catch (M) {
        console.error("Failed to reconnect:", M);
      }
    }, [Be]), un = He(
      () => ({
        onSubmit: je,
        onFileUpload: On,
        onStopGeneration: $e,
        onPromptSelect: Ln,
        onRetryMessage: Ot,
        onRetryConnection: Fn
      }),
      [
        je,
        On,
        $e,
        Ln,
        Ot,
        Fn
      ]
    ), hn = He(
      () => ({
        ...Ht,
        ...Pn,
        ...Dn,
        ...Ae,
        ...un,
        currentAssistantMessageIdRef: Ne,
        messagesEndRef: Wt,
        chatInputRef: mt
      }),
      [
        Ht,
        Pn,
        Dn,
        Ae,
        un,
        Ne,
        Wt,
        mt
      ]
    );
    return He(
      () => _t.state.shouldShowBubble(
        A,
        _,
        N
      ),
      [A, _, N]
    ) ? /* @__PURE__ */ m(ta, { children: /* @__PURE__ */ m(
      Pc,
      {
        mode: A,
        headerName: i.headerName,
        bubbleText: i.bubbleText,
        showBubbleText: ((Hn = i.features) == null ? void 0 : Hn.showBubbleText) !== !1,
        onClick: Jt
      }
    ) }) : /* @__PURE__ */ m(ta, { children: /* @__PURE__ */ m(
      Rc,
      {
        onError: (M) => {
          i.onError && i.onError(M);
        },
        children: /* @__PURE__ */ P("div", { className: Xt, style: i.customStyles, children: [
          /* @__PURE__ */ m(
            tf,
            {
              isVisible: !x,
              isReconnecting: de === De.RECONNECTING
            }
          ),
          _t.state.shouldShowHeader(i.headerVisible) && /* @__PURE__ */ m(
            Dc,
            {
              headerName: i.headerName,
              mode: A,
              isCollapsed: N,
              isModalOpen: _,
              onClose: E,
              onToggleFullscreen: B,
              onToggleCollapse: U
            }
          ),
          !N && /* @__PURE__ */ m(
            Ic,
            {
              onError: (M) => {
                i.onError && i.onError(M);
              },
              children: /* @__PURE__ */ m(Fp, { value: hn, children: /* @__PURE__ */ m(ef, {}) })
            }
          )
        ] })
      }
    ) });
  }
);
uo.displayName = "ChatWrapperInner";
const ho = In(
  (t, e) => {
    const { auth: n, chatServerUrl: r, chatServerKey: i, contextHelpers: a } = t, s = (a == null ? void 0 : a.locale) || "en";
    return /* @__PURE__ */ m(
      gc,
      {
        locale: s,
        chatServerUrl: r,
        chatServerKey: i,
        mpAuthToken: n.token,
        children: /* @__PURE__ */ m(uo, { ref: e, ...t })
      }
    );
  }
);
ho.displayName = "ChatWrapperContainer";
const Tf = Za(ho);
function Ef({
  isConnected: t,
  isConnecting: e = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 1 / 0,
  onRetry: a,
  autoHideDuration: s = 3e3
}) {
  const [o, c] = xe("hidden"), [u, l] = xe(!1);
  if (Te(() => {
    e ? c("connecting") : !t && !n ? (l(!0), i !== 1 / 0 && r >= i ? c("error") : c("hidden")) : n ? c("reconnecting") : t && u ? (c("hidden"), l(!1)) : t && !u && c("hidden");
  }, [t, e, n, r, i, u, s]), o === "hidden")
    return null;
  const h = () => {
    a && a();
  }, d = (() => {
    switch (o) {
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
  return d ? o === "connecting" ? /* @__PURE__ */ m("div", { className: `connection-notification connection-notification--${o}`, children: /* @__PURE__ */ P("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ m("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ m("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ m("div", { className: "connection-notification__bubble" })
  ] }) }) : o === "reconnecting" ? /* @__PURE__ */ m("div", { className: `connection-notification connection-notification--banner connection-notification--${o}`, children: /* @__PURE__ */ P("div", { className: "connection-notification__banner-content", children: [
    /* @__PURE__ */ m("span", { className: "connection-notification__banner-spinner" }),
    /* @__PURE__ */ P("span", { className: "connection-notification__banner-text", children: [
      "Reconnecting... (attempt ",
      r,
      ")"
    ] })
  ] }) }) : /* @__PURE__ */ m("div", { className: `connection-notification connection-notification--${o}`, children: /* @__PURE__ */ P("div", { className: "connection-notification__content", children: [
    /* @__PURE__ */ m("div", { className: "connection-notification__icon", children: d.icon }),
    /* @__PURE__ */ m("div", { className: "connection-notification__title", children: d.title }),
    /* @__PURE__ */ m("div", { className: "connection-notification__message", children: d.message }),
    a && /* @__PURE__ */ m("div", { className: "connection-notification__actions", children: /* @__PURE__ */ m(
      "button",
      {
        className: "connection-notification__retry-btn primary",
        onClick: h,
        children: "Try Again"
      }
    ) })
  ] }) }) : null;
}
export {
  qp as AnimatedPlaceholder,
  Ee as CHAT_STATUS,
  Nc as ChatIcon,
  Jp as ChatSkeleton,
  Tf as ChatWrapper,
  Mc as CloseIcon,
  Oc as CollapseIcon,
  Qp as ConnectionError,
  Ef as ConnectionNotification,
  Lc as CopyIcon,
  mo as EntityType,
  Ac as FullscreenIcon,
  Yp as InlineLoader,
  ro as Loader,
  Ze as PROCESSING_STATUS,
  $p as PromptInput,
  Gp as PromptInputButton,
  yf as PromptInputModelSelect,
  Sf as PromptInputModelSelectContent,
  xf as PromptInputModelSelectItem,
  wf as PromptInputModelSelectTrigger,
  kf as PromptInputModelSelectValue,
  Wp as PromptInputSubmit,
  co as PromptInputTextarea,
  Vp as PromptInputToolbar,
  jp as PromptInputTools,
  Op as Reasoning,
  no as ReasoningContent,
  to as ReasoningTrigger,
  ht as STREAMING_STATUS,
  Cf as SettingsIcon,
  Zp as SuggestedPrompts,
  gc as TranslationProvider,
  vo as fetchThreadMessages,
  ds as fetchTranslations,
  Lr as isChatActive,
  of as isChatError,
  sf as isChatIdle,
  lf as isProcessingActive,
  cf as isProcessingComplete,
  uf as isProcessingError,
  Ro as updateThread,
  Io as updateThreadMetadata,
  df as useChatState,
  pf as useConversationState,
  gf as useI18next,
  hf as useLayoutState,
  ff as useThreadState,
  $t as useTranslations,
  mf as useUIState,
  ce as useUIStore
};
