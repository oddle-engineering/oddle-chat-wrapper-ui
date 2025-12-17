var ho = Object.defineProperty;
var po = (e, t, n) => t in e ? ho(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var $ = (e, t, n) => po(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as f, jsxs as L, Fragment as zt } from "react/jsx-runtime";
import xt, { useState as Ne, useRef as ge, useEffect as Re, useMemo as He, useCallback as de, Component as Nr, createContext as fo, useContext as go, memo as oa, forwardRef as Un, useImperativeHandle as sa } from "react";
const Se = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, st = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, $e = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, fr = (e) => e === Se.SUBMITTED || e === Se.STREAMING, eh = (e) => e === Se.IDLE, th = (e) => e === Se.ERROR, nh = (e) => e === $e.PROCESSING, rh = (e) => e === $e.COMPLETED, ih = (e) => e === $e.ERROR;
var mo = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(mo || {}), Ye = /* @__PURE__ */ ((e) => (e.DISCONNECTED = "disconnected", e.CONNECTING = "connecting", e.CONNECTED = "connected", e.RECONNECTING = "reconnecting", e))(Ye || {});
const Co = {
  maxReconnectAttempts: 1 / 0,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, En = {
  NORMAL: 1e3,
  // Normal closure
  GOING_AWAY: 1001
};
var ut = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(ut || {}), kt = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e.STOP_RUN = "stop_run", e))(kt || {}), Xe = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.THREAD_CREATED = "thread_created", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(Xe || {}), An = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(An || {}), Ht = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(Ht || {});
class Jt {
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
    return this.createConnectionEvent(ut.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(ut.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(ut.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(ut.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(ut.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(ut.CHAT_ERROR, { error: t, errorCode: n });
  }
}
class Ot {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(t) {
    return {
      type: kt.CHAT_MESSAGE,
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
      type: kt.CONFIGURE_TOOLS,
      toolSchemas: t,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(t) {
    return {
      type: kt.UPDATE_TOOLS,
      toolSchemas: t
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(t) {
    return {
      type: kt.UPDATE_CONTEXT_HELPERS,
      contextHelpers: t
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(t, n) {
    return {
      type: kt.TOOL_CALL_RESPONSE,
      callId: t,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(t, n) {
    return {
      type: kt.TOOL_CALL_RESPONSE,
      callId: t,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: kt.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(t, n) {
    return {
      type: kt.HEARTBEAT_PONG,
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
      type: kt.STOP_RUN,
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
    $(this, "ws", null);
    $(this, "config");
    $(this, "connectionState");
    $(this, "reconnectTimer", null);
    $(this, "heartbeatInterval", null);
    $(this, "visibilityChangeHandler");
    $(this, "currentTicket", null);
    $(this, "intentionalDisconnect", !1);
    // Track intentional disconnects
    $(this, "justRefreshedTicket", !1);
    // Track if ticket was just refreshed to skip duplicate validation
    $(this, "onOpen");
    $(this, "onMessage");
    $(this, "onError");
    $(this, "onClose");
    $(this, "onSystemEvent");
    $(this, "onTicketRefresh");
    $(this, "onTicketValidate");
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
      NORMAL: En.NORMAL,
      GOING_AWAY: En.GOING_AWAY
    }), this.intentionalDisconnect)
      return console.log("[WebSocketManager] Intentional disconnect - no reconnect"), !1;
    const { NORMAL: n } = En, r = t !== n;
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
        Jt.connectionLost("Max reconnection attempts reached")
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
    }), (s = this.onSystemEvent) == null || s.call(this, Jt.reconnecting(t, n));
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
    this.updateConnectionState(!0, !1), this.justRefreshedTicket = !1, this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Jt.connectionRestored()), (n = this.onOpen) == null || n.call(this);
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
    const t = Ot.serializeHeartbeatPing();
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
    this.ws && this.ws.close(En.NORMAL);
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
class Dn {
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
const ee = {
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
  isThinkingMessage: (e) => e.startsWith(ee.THINKING_PREFIX) || e.startsWith(ee.REASONING_PREFIX) || e.startsWith(ee.THOUGHT_PREFIX),
  isCompletedMessage: (e) => e.includes(ee.COMPLETED_MARKER),
  isErrorMessage: (e) => e.includes(ee.ERROR_MARKER),
  isHandlingMessage: (e) => e.includes(ee.HANDLING_MARKER),
  extractDuration: (e) => {
    const t = e.match(ee.PATTERNS.DURATION);
    return t ? ` for ${t[1]} seconds` : void 0;
  },
  cleanReasoningContent: (e) => {
    let t = e.replace(new RegExp(`^${ee.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${ee.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${ee.THOUGHT_PREFIX}\\s*`), "");
    return t = t.replace(/\s*for [\d.]+\s*seconds$/, ""), t = t.replace(ee.PATTERNS.THOUGHT_CONTENT, ""), t.trim();
  },
  getMessageType: (e, t) => t === !1 ? Be.isErrorMessage(e) ? ee.MESSAGE_TYPES.ERROR : (Be.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || Be.isThinkingMessage(e), ee.MESSAGE_TYPES.THOUGHT) : Be.isCompletedMessage(e) ? ee.MESSAGE_TYPES.COMPLETED : Be.isErrorMessage(e) ? ee.MESSAGE_TYPES.ERROR : (Be.isHandlingMessage(e) || Be.isThinkingMessage(e) && !e.includes(ee.UI_TEXT.AI_IS_THINKING), ee.MESSAGE_TYPES.THINKING)
};
class ko extends la {
  constructor(n) {
    super({ onReasoningUpdate: n });
    $(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    $(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, o) {
    const s = this.getHandler("onReasoningUpdate");
    if (!s) return;
    const c = Dn.createReasoningCall(
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
    const o = `${ee.THINKING_PREFIX} ${a}`;
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
    const s = i || ee.UI_TEXT.THOUGHT, c = `${ee.THOUGHT_PREFIX} ${s}${o}`;
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
    $(this, "processedToolCalls", /* @__PURE__ */ new Set());
    $(this, "clientTools", {});
    $(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var o, s, c;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (o = this.getHandler("onReasoningUpdate")) == null || o(!0, `${ee.HANDLING_MARKER} ${i}`, n);
      try {
        const d = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, d), (s = this.getHandler("onReasoningUpdate")) == null || s(!1, `${ee.COMPLETED_MARKER} ${i}`, n);
      } catch (d) {
        this.sendToolError(r, d), (c = this.getHandler("onReasoningUpdate")) == null || c(!1, `${ee.ERROR_MARKER} Error: ${i} - ${d}`, n);
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
    const i = Ot.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = Ot.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = Dn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId,
        n.args || {}
      );
      r(!0, `${ee.HANDLING_MARKER} ${n.toolName}`, a);
    }
  }
  handleServerToolResult(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = Dn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId
      );
      r(
        !1,
        `${ee.COMPLETED_MARKER} ${n.toolName}`,
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
    $(this, "reasoningHandler");
    $(this, "toolHandler");
    $(this, "handlers");
    $(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new ko(t.onReasoningUpdate), this.toolHandler = new So(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case Xe.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case Xe.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case Xe.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case Xe.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case Xe.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case Xe.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case Xe.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case Xe.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case Xe.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case Xe.HEARTBEAT_ACK:
          break;
        case Xe.ERROR:
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
      case An.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case An.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case An.CONTENT_DELTA:
        (n = t.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, t.data.delta));
        break;
    }
  }
  handleProviderEvent(t) {
    var r, i, a;
    switch ((r = t.data) == null ? void 0 : r.type) {
      case Ht.TEXT_DELTA:
        t.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, t.data.textDelta));
        break;
      case Ht.REASONING_START:
        this.reasoningHandler.handleReasoningStart(t.data);
        break;
      case Ht.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(t.data);
        break;
      case Ht.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(t.data);
        break;
      case Ht.TOOL_CALL:
        this.toolHandler.handleServerToolCall(t.data);
        break;
      case Ht.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(t.data);
        break;
    }
  }
  handleLatitudeEvent(t) {
    var n;
    if (((n = t.data) == null ? void 0 : n.type) === Ht.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = t.data;
      if (r.toolCallId && r.toolName) {
        const i = Dn.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${ee.COMPLETED_MARKER} ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Jt.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      Jt.chatError(t.error || "Unknown error")
    );
  }
  handleToolCallRequest(t) {
    this.toolHandler.handleToolCallRequest(t);
  }
  handleHeartbeatPing(t) {
    if (!this.sendMessage)
      return;
    const n = Ot.serializeHeartbeatPong(
      t.timestamp,
      t.pingTime
    );
    this.sendMessage(n);
  }
  handleError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      Jt.chatError(t.error || "Unknown WebSocket error")
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
async function xo(e, t, n = 1e4) {
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
function gr(e) {
  if (!e.success || !e.ticket || !e.expiresAt)
    return !1;
  const t = new Date(e.expiresAt).getTime();
  return Date.now() < t - 3e4;
}
function ti(e) {
  const t = gr(e), n = new Date(e.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: t,
    expiresIn: i,
    expired: r >= n
  };
}
async function Eo(e, t, n, r) {
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
function tn(e, t) {
  const n = bo(e);
  return console.error(`[${t}] Error occurred:`, {
    error: (e == null ? void 0 : e.message) || e,
    classification: n,
    shouldRetry: n.isRetryable
  }), n;
}
class _o {
  constructor(t, n, r = {}) {
    $(this, "ticket", null);
    $(this, "refreshPromise", null);
    $(this, "validationInterval", null);
    $(this, "authData");
    $(this, "apiUrl");
    $(this, "config");
    this.authData = t, this.apiUrl = this.convertToHttpUrl(n), this.config = {
      checkInterval: r.checkInterval ?? 6e4,
      renewalThreshold: r.renewalThreshold ?? 300,
      maxRetries: r.maxRetries ?? 3,
      retryBaseDelay: r.retryBaseDelay ?? 1e3,
      requestTimeout: r.requestTimeout ?? 1e4,
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
    return this.ticket && gr(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
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
        return this.ticket = await xo(
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
        const a = tn(i, "TicketManager");
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
      const r = tn(
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
    return this.ticket ? gr(this.ticket) : !1;
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
      const t = await Eo(
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
    $(this, "config");
    $(this, "connectionState");
    $(this, "wsManager");
    $(this, "messageHandler");
    $(this, "initResolve");
    $(this, "initReject");
    // Client tools and context
    $(this, "toolSchemas", []);
    $(this, "contextHelpers", {});
    // Ticket management - now centralized in TicketManager
    $(this, "ticketManager", null);
    // Authentication credentials for HTTP API calls
    $(this, "authCredentials", {});
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
    if ((n == null ? void 0 : n.type) === "authentication_error" && this.handleAuthenticationFailure(n), (n == null ? void 0 : n.type) === Xe.THREAD_CREATED) {
      (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onThreadCreated) == null || i.call(r, n.data);
      return;
    }
    if ((n == null ? void 0 : n.type) === Xe.TOOLS_CONFIGURED) {
      (a = this.initResolve) == null || a.call(this);
      return;
    }
    (n == null ? void 0 : n.type) === Xe.SESSION_ESTABLISHED && (this.toolSchemas && this.toolSchemas.length > 0 ? this.sendToolConfiguration() : (o = this.initResolve) == null || o.call(this));
  }
  handleConnectionOpen() {
  }
  handleAuthenticationFailure(t) {
    var r;
    const n = t;
    (n == null ? void 0 : n.code) === "TICKET_INVALID" || (n == null ? void 0 : n.code) === "TICKET_EXPIRED" ? this.refreshTicketAndReconnect().catch((i) => {
      var o;
      tn(i, "TicketRefresh").isRetryable, (o = this.initReject) == null || o.call(this, i);
    }) : (r = this.initReject) == null || r.call(
      this,
      new Error(`Authentication failed: ${n == null ? void 0 : n.error}`)
    );
  }
  sendToolConfiguration() {
    const t = Ot.serializeConfigureTools(
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
      const s = Ot.serializeChatMessage({
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
    const n = Ot.serializeUpdateContextHelpers(
      this.contextHelpers
    );
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = Ot.serializeUpdateTools(this.toolSchemas);
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
    const n = Ot.serializeStopRun(t);
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
  onReasoningUpdate: d,
  onThreadCreated: l,
  onError: p
}) {
  const [m, g] = Ne(
    null
  ), [T, S] = Ne(
    Ye.DISCONNECTED
  ), [M, x] = Ne(0), v = ge(null), D = ge(s), O = ge(c), U = ge(d), E = ge(l), B = ge(e), Q = ge(t), F = ge(n), ne = ge(r), G = ge(i), X = ge(a), I = ge(a);
  Re(() => {
    JSON.stringify(a) !== JSON.stringify(X.current) && (X.current = a, I.current = a);
  }, [a]);
  const P = ge(o), Z = ge(
    o
  );
  Re(() => {
    JSON.stringify(o) !== JSON.stringify(P.current) && (P.current = o, Z.current = o);
  }, [o]), Re(() => {
    D.current = s, O.current = c, U.current = d, E.current = l, B.current = e, Q.current = t, F.current = n, ne.current = r, G.current = i;
  }, [
    s,
    c,
    d,
    l,
    e,
    t,
    n,
    r,
    i
  ]);
  const { toolSchemas: re, clientToolExecutors: se } = He(() => {
    const ue = I.current;
    if (ue && ue.length > 0) {
      const C = ue.map(({ execute: q, ...ce }) => ce), Y = {};
      return ue.forEach((q) => {
        Y[q.name] = q.execute;
      }), {
        toolSchemas: C,
        clientToolExecutors: Y
      };
    }
    return {
      toolSchemas: [],
      clientToolExecutors: {}
    };
  }, [I.current]), Ce = ge(), ye = de(async () => {
    var ue;
    try {
      if (S(Ye.CONNECTING), !B.current)
        throw new Error("userMpAuthToken is required");
      if (!Q.current)
        throw new Error("chatServerUrl is required");
      if (!F.current)
        throw new Error("chatServerKey is required");
      const C = new Mo();
      v.current = C, g(C);
      const Y = Z.current || {};
      await C.onInit({
        // Authentication and server properties (from refs)
        userMpAuthToken: B.current,
        chatServerUrl: Q.current,
        chatServerKey: F.current,
        entityId: ne.current,
        entityType: (ue = G.current) == null ? void 0 : ue.toString(),
        // Tools configuration
        toolSchemas: re,
        clientTools: se,
        contextHelpers: Y,
        onSetMessage: D.current,
        onSystemEvent: O.current,
        onReasoningUpdate: U.current,
        onThreadCreated: E.current,
        onError: p
      }), S(Ye.CONNECTED);
    } catch (C) {
      const Y = tn(C, "WebSocketConnection");
      S(Ye.DISCONNECTED), Y.isRetryable && setTimeout(() => {
        var q;
        (v.current === null || !v.current.getConnectionStatus().connected) && ((q = Ce.current) == null || q.call(Ce));
      }, 2e3);
    }
  }, [
    re,
    se
    // All other props use refs to prevent reconnections
    // connectChatClient only recreates when tools change
  ]), y = de(() => {
    v.current && (v.current.disconnect(), v.current = null), g(null), S(Ye.DISCONNECTED);
  }, []);
  Ce.current = ye;
  const ie = ge(!1);
  return Re(() => (ie.current || (ie.current = !0, ye()), () => {
    y();
  }), []), Re(() => {
    const ue = setInterval(() => {
      if (v.current) {
        const C = v.current.getConnectionStatus();
        C.connected ? S(Ye.CONNECTED) : C.isReconnecting ? S(Ye.RECONNECTING) : S(Ye.DISCONNECTED), x(C.reconnectAttempts);
      }
    }, 1e3);
    return () => clearInterval(ue);
  }, []), {
    chatClient: m,
    connectionState: T,
    reconnectAttempts: M,
    connectChatClient: ye,
    disconnectChatClient: y
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
  freeze: Je,
  seal: ht,
  create: mr
} = Object, {
  apply: Cr,
  construct: yr
} = typeof Reflect < "u" && Reflect;
Je || (Je = function(t) {
  return t;
});
ht || (ht = function(t) {
  return t;
});
Cr || (Cr = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
yr || (yr = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const bn = Qe(Array.prototype.forEach), Do = Qe(Array.prototype.lastIndexOf), ri = Qe(Array.prototype.pop), on = Qe(Array.prototype.push), Po = Qe(Array.prototype.splice), Nn = Qe(String.prototype.toLowerCase), Kn = Qe(String.prototype.toString), Xn = Qe(String.prototype.match), sn = Qe(String.prototype.replace), Fo = Qe(String.prototype.indexOf), Ho = Qe(String.prototype.trim), gt = Qe(Object.prototype.hasOwnProperty), Ke = Qe(RegExp.prototype.test), ln = zo(TypeError);
function Qe(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Cr(e, t, r);
  };
}
function zo(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return yr(e, n);
  };
}
function he(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Nn;
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
    gt(e, t) || (e[t] = null);
  return e;
}
function Lt(e) {
  const t = mr(null);
  for (const [n, r] of ca(e))
    gt(e, n) && (Array.isArray(r) ? t[n] = Uo(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = Lt(r) : t[n] = r);
  return t;
}
function cn(e, t) {
  for (; e !== null; ) {
    const r = Oo(e, t);
    if (r) {
      if (r.get)
        return Qe(r.get);
      if (typeof r.value == "function")
        return Qe(r.value);
    }
    e = Lo(e);
  }
  function n() {
    return null;
  }
  return n;
}
const ii = Je(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Yn = Je(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Jn = Je(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Bo = Je(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Qn = Je(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Go = Je(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), ai = Je(["#text"]), oi = Je(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), er = Je(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), si = Je(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), _n = Je(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Vo = ht(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Wo = ht(/<%[\w\W]*|[\w\W]*%>/gm), jo = ht(/\$\{[\w\W]*/gm), $o = ht(/^data-[\-\w.\u00B7-\uFFFF]+$/), qo = ht(/^aria-[\-\w]+$/), ua = ht(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Zo = ht(/^(?:\w+script|data):/i), Ko = ht(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), da = ht(/^html$/i), Xo = ht(/^[a-z][.\w]*(-[.\w]+)+$/i);
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
  const t = (K) => ha(K);
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
    NodeFilter: d,
    NamedNodeMap: l = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: p,
    DOMParser: m,
    trustedTypes: g
  } = e, T = c.prototype, S = cn(T, "cloneNode"), M = cn(T, "remove"), x = cn(T, "nextSibling"), v = cn(T, "childNodes"), D = cn(T, "parentNode");
  if (typeof o == "function") {
    const K = n.createElement("template");
    K.content && K.content.ownerDocument && (n = K.content.ownerDocument);
  }
  let O, U = "";
  const {
    implementation: E,
    createNodeIterator: B,
    createDocumentFragment: Q,
    getElementsByTagName: F
  } = n, {
    importNode: ne
  } = r;
  let G = ci();
  t.isSupported = typeof ca == "function" && typeof D == "function" && E && E.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: X,
    ERB_EXPR: I,
    TMPLIT_EXPR: P,
    DATA_ATTR: Z,
    ARIA_ATTR: re,
    IS_SCRIPT_OR_DATA: se,
    ATTR_WHITESPACE: Ce,
    CUSTOM_ELEMENT: ye
  } = li;
  let {
    IS_ALLOWED_URI: y
  } = li, ie = null;
  const ue = he({}, [...ii, ...Yn, ...Jn, ...Qn, ...ai]);
  let C = null;
  const Y = he({}, [...oi, ...er, ...si, ..._n]);
  let q = Object.seal(mr(null, {
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
  })), ce = null, fe = null;
  const J = Object.seal(mr(null, {
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
  let pe = !0, ae = !0, ke = !1, De = !0, Ee = !1, Ze = !0, Ge = !1, vt = !1, Rt = !1, Ct = !1, It = !1, yt = !1, Bt = !0, Gt = !1;
  const Vt = "user-content-";
  let pt = !0, ft = !1, b = {}, _ = null;
  const z = he({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let j = null;
  const le = he({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ie = null;
  const at = he({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), ze = "http://www.w3.org/1998/Math/MathML", ct = "http://www.w3.org/2000/svg", Le = "http://www.w3.org/1999/xhtml";
  let be = Le, et = !1, We = null;
  const jn = he({}, [ze, ct, Le], Kn);
  let Zt = he({}, ["mi", "mo", "mn", "ms", "mtext"]), Wt = he({}, ["annotation-xml"]);
  const Sn = he({}, ["title", "style", "font", "a", "script"]);
  let Dt = null;
  const Tn = ["application/xhtml+xml", "text/html"], xn = "text/html";
  let Oe = null, Mt = null;
  const $n = n.createElement("form"), qn = function(w) {
    return w instanceof RegExp || w instanceof Function;
  }, Kt = function() {
    let w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Mt && Mt === w)) {
      if ((!w || typeof w != "object") && (w = {}), w = Lt(w), Dt = // eslint-disable-next-line unicorn/prefer-includes
      Tn.indexOf(w.PARSER_MEDIA_TYPE) === -1 ? xn : w.PARSER_MEDIA_TYPE, Oe = Dt === "application/xhtml+xml" ? Kn : Nn, ie = gt(w, "ALLOWED_TAGS") ? he({}, w.ALLOWED_TAGS, Oe) : ue, C = gt(w, "ALLOWED_ATTR") ? he({}, w.ALLOWED_ATTR, Oe) : Y, We = gt(w, "ALLOWED_NAMESPACES") ? he({}, w.ALLOWED_NAMESPACES, Kn) : jn, Ie = gt(w, "ADD_URI_SAFE_ATTR") ? he(Lt(at), w.ADD_URI_SAFE_ATTR, Oe) : at, j = gt(w, "ADD_DATA_URI_TAGS") ? he(Lt(le), w.ADD_DATA_URI_TAGS, Oe) : le, _ = gt(w, "FORBID_CONTENTS") ? he({}, w.FORBID_CONTENTS, Oe) : z, ce = gt(w, "FORBID_TAGS") ? he({}, w.FORBID_TAGS, Oe) : Lt({}), fe = gt(w, "FORBID_ATTR") ? he({}, w.FORBID_ATTR, Oe) : Lt({}), b = gt(w, "USE_PROFILES") ? w.USE_PROFILES : !1, pe = w.ALLOW_ARIA_ATTR !== !1, ae = w.ALLOW_DATA_ATTR !== !1, ke = w.ALLOW_UNKNOWN_PROTOCOLS || !1, De = w.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ee = w.SAFE_FOR_TEMPLATES || !1, Ze = w.SAFE_FOR_XML !== !1, Ge = w.WHOLE_DOCUMENT || !1, Ct = w.RETURN_DOM || !1, It = w.RETURN_DOM_FRAGMENT || !1, yt = w.RETURN_TRUSTED_TYPE || !1, Rt = w.FORCE_BODY || !1, Bt = w.SANITIZE_DOM !== !1, Gt = w.SANITIZE_NAMED_PROPS || !1, pt = w.KEEP_CONTENT !== !1, ft = w.IN_PLACE || !1, y = w.ALLOWED_URI_REGEXP || ua, be = w.NAMESPACE || Le, Zt = w.MATHML_TEXT_INTEGRATION_POINTS || Zt, Wt = w.HTML_INTEGRATION_POINTS || Wt, q = w.CUSTOM_ELEMENT_HANDLING || {}, w.CUSTOM_ELEMENT_HANDLING && qn(w.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (q.tagNameCheck = w.CUSTOM_ELEMENT_HANDLING.tagNameCheck), w.CUSTOM_ELEMENT_HANDLING && qn(w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (q.attributeNameCheck = w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), w.CUSTOM_ELEMENT_HANDLING && typeof w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (q.allowCustomizedBuiltInElements = w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Ee && (ae = !1), It && (Ct = !0), b && (ie = he({}, ai), C = [], b.html === !0 && (he(ie, ii), he(C, oi)), b.svg === !0 && (he(ie, Yn), he(C, er), he(C, _n)), b.svgFilters === !0 && (he(ie, Jn), he(C, er), he(C, _n)), b.mathMl === !0 && (he(ie, Qn), he(C, si), he(C, _n))), w.ADD_TAGS && (typeof w.ADD_TAGS == "function" ? J.tagCheck = w.ADD_TAGS : (ie === ue && (ie = Lt(ie)), he(ie, w.ADD_TAGS, Oe))), w.ADD_ATTR && (typeof w.ADD_ATTR == "function" ? J.attributeCheck = w.ADD_ATTR : (C === Y && (C = Lt(C)), he(C, w.ADD_ATTR, Oe))), w.ADD_URI_SAFE_ATTR && he(Ie, w.ADD_URI_SAFE_ATTR, Oe), w.FORBID_CONTENTS && (_ === z && (_ = Lt(_)), he(_, w.FORBID_CONTENTS, Oe)), pt && (ie["#text"] = !0), Ge && he(ie, ["html", "head", "body"]), ie.table && (he(ie, ["tbody"]), delete ce.tbody), w.TRUSTED_TYPES_POLICY) {
        if (typeof w.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw ln('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof w.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw ln('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        O = w.TRUSTED_TYPES_POLICY, U = O.createHTML("");
      } else
        O === void 0 && (O = Jo(g, i)), O !== null && typeof U == "string" && (U = O.createHTML(""));
      Je && Je(w), Mt = w;
    }
  }, an = he({}, [...Yn, ...Jn, ...Bo]), R = he({}, [...Qn, ...Go]), we = function(w) {
    let N = D(w);
    (!N || !N.tagName) && (N = {
      namespaceURI: be,
      tagName: "template"
    });
    const W = Nn(w.tagName), ve = Nn(N.tagName);
    return We[w.namespaceURI] ? w.namespaceURI === ct ? N.namespaceURI === Le ? W === "svg" : N.namespaceURI === ze ? W === "svg" && (ve === "annotation-xml" || Zt[ve]) : !!an[W] : w.namespaceURI === ze ? N.namespaceURI === Le ? W === "math" : N.namespaceURI === ct ? W === "math" && Wt[ve] : !!R[W] : w.namespaceURI === Le ? N.namespaceURI === ct && !Wt[ve] || N.namespaceURI === ze && !Zt[ve] ? !1 : !R[W] && (Sn[W] || !an[W]) : !!(Dt === "application/xhtml+xml" && We[w.namespaceURI]) : !1;
  }, Me = function(w) {
    on(t.removed, {
      element: w
    });
    try {
      D(w).removeChild(w);
    } catch {
      M(w);
    }
  }, _e = function(w, N) {
    try {
      on(t.removed, {
        attribute: N.getAttributeNode(w),
        from: N
      });
    } catch {
      on(t.removed, {
        attribute: null,
        from: N
      });
    }
    if (N.removeAttribute(w), w === "is")
      if (Ct || It)
        try {
          Me(N);
        } catch {
        }
      else
        try {
          N.setAttribute(w, "");
        } catch {
        }
  }, Ae = function(w) {
    let N = null, W = null;
    if (Rt)
      w = "<remove></remove>" + w;
    else {
      const Pe = Xn(w, /^[\r\n\t ]+/);
      W = Pe && Pe[0];
    }
    Dt === "application/xhtml+xml" && be === Le && (w = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + w + "</body></html>");
    const ve = O ? O.createHTML(w) : w;
    if (be === Le)
      try {
        N = new m().parseFromString(ve, Dt);
      } catch {
      }
    if (!N || !N.documentElement) {
      N = E.createDocument(be, "template", null);
      try {
        N.documentElement.innerHTML = et ? U : ve;
      } catch {
      }
    }
    const je = N.body || N.documentElement;
    return w && W && je.insertBefore(n.createTextNode(W), je.childNodes[0] || null), be === Le ? F.call(N, Ge ? "html" : "body")[0] : Ge ? N.documentElement : je;
  }, Ue = function(w) {
    return B.call(
      w.ownerDocument || w,
      w,
      // eslint-disable-next-line no-bitwise
      d.SHOW_ELEMENT | d.SHOW_COMMENT | d.SHOW_TEXT | d.SHOW_PROCESSING_INSTRUCTION | d.SHOW_CDATA_SECTION,
      null
    );
  }, wt = function(w) {
    return w instanceof p && (typeof w.nodeName != "string" || typeof w.textContent != "string" || typeof w.removeChild != "function" || !(w.attributes instanceof l) || typeof w.removeAttribute != "function" || typeof w.setAttribute != "function" || typeof w.namespaceURI != "string" || typeof w.insertBefore != "function" || typeof w.hasChildNodes != "function");
  }, Pt = function(w) {
    return typeof s == "function" && w instanceof s;
  };
  function At(K, w, N) {
    bn(K, (W) => {
      W.call(t, w, N, Mt);
    });
  }
  const Kr = function(w) {
    let N = null;
    if (At(G.beforeSanitizeElements, w, null), wt(w))
      return Me(w), !0;
    const W = Oe(w.nodeName);
    if (At(G.uponSanitizeElement, w, {
      tagName: W,
      allowedTags: ie
    }), Ze && w.hasChildNodes() && !Pt(w.firstElementChild) && Ke(/<[/\w!]/g, w.innerHTML) && Ke(/<[/\w!]/g, w.textContent) || w.nodeType === un.progressingInstruction || Ze && w.nodeType === un.comment && Ke(/<[/\w]/g, w.data))
      return Me(w), !0;
    if (!(J.tagCheck instanceof Function && J.tagCheck(W)) && (!ie[W] || ce[W])) {
      if (!ce[W] && Yr(W) && (q.tagNameCheck instanceof RegExp && Ke(q.tagNameCheck, W) || q.tagNameCheck instanceof Function && q.tagNameCheck(W)))
        return !1;
      if (pt && !_[W]) {
        const ve = D(w) || w.parentNode, je = v(w) || w.childNodes;
        if (je && ve) {
          const Pe = je.length;
          for (let tt = Pe - 1; tt >= 0; --tt) {
            const Nt = S(je[tt], !0);
            Nt.__removalCount = (w.__removalCount || 0) + 1, ve.insertBefore(Nt, x(w));
          }
        }
      }
      return Me(w), !0;
    }
    return w instanceof c && !we(w) || (W === "noscript" || W === "noembed" || W === "noframes") && Ke(/<\/no(script|embed|frames)/i, w.innerHTML) ? (Me(w), !0) : (Ee && w.nodeType === un.text && (N = w.textContent, bn([X, I, P], (ve) => {
      N = sn(N, ve, " ");
    }), w.textContent !== N && (on(t.removed, {
      element: w.cloneNode()
    }), w.textContent = N)), At(G.afterSanitizeElements, w, null), !1);
  }, Xr = function(w, N, W) {
    if (Bt && (N === "id" || N === "name") && (W in n || W in $n))
      return !1;
    if (!(ae && !fe[N] && Ke(Z, N))) {
      if (!(pe && Ke(re, N))) {
        if (!(J.attributeCheck instanceof Function && J.attributeCheck(N, w))) {
          if (!C[N] || fe[N]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Yr(w) && (q.tagNameCheck instanceof RegExp && Ke(q.tagNameCheck, w) || q.tagNameCheck instanceof Function && q.tagNameCheck(w)) && (q.attributeNameCheck instanceof RegExp && Ke(q.attributeNameCheck, N) || q.attributeNameCheck instanceof Function && q.attributeNameCheck(N, w)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              N === "is" && q.allowCustomizedBuiltInElements && (q.tagNameCheck instanceof RegExp && Ke(q.tagNameCheck, W) || q.tagNameCheck instanceof Function && q.tagNameCheck(W)))
            ) return !1;
          } else if (!Ie[N]) {
            if (!Ke(y, sn(W, Ce, ""))) {
              if (!((N === "src" || N === "xlink:href" || N === "href") && w !== "script" && Fo(W, "data:") === 0 && j[w])) {
                if (!(ke && !Ke(se, sn(W, Ce, "")))) {
                  if (W)
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
    return w !== "annotation-xml" && Xn(w, ye);
  }, Jr = function(w) {
    At(G.beforeSanitizeAttributes, w, null);
    const {
      attributes: N
    } = w;
    if (!N || wt(w))
      return;
    const W = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: C,
      forceKeepAttr: void 0
    };
    let ve = N.length;
    for (; ve--; ) {
      const je = N[ve], {
        name: Pe,
        namespaceURI: tt,
        value: Nt
      } = je, Xt = Oe(Pe), Zn = Nt;
      let Ve = Pe === "value" ? Zn : Ho(Zn);
      if (W.attrName = Xt, W.attrValue = Ve, W.keepAttr = !0, W.forceKeepAttr = void 0, At(G.uponSanitizeAttribute, w, W), Ve = W.attrValue, Gt && (Xt === "id" || Xt === "name") && (_e(Pe, w), Ve = Vt + Ve), Ze && Ke(/((--!?|])>)|<\/(style|title|textarea)/i, Ve)) {
        _e(Pe, w);
        continue;
      }
      if (Xt === "attributename" && Xn(Ve, "href")) {
        _e(Pe, w);
        continue;
      }
      if (W.forceKeepAttr)
        continue;
      if (!W.keepAttr) {
        _e(Pe, w);
        continue;
      }
      if (!De && Ke(/\/>/i, Ve)) {
        _e(Pe, w);
        continue;
      }
      Ee && bn([X, I, P], (ei) => {
        Ve = sn(Ve, ei, " ");
      });
      const Qr = Oe(w.nodeName);
      if (!Xr(Qr, Xt, Ve)) {
        _e(Pe, w);
        continue;
      }
      if (O && typeof g == "object" && typeof g.getAttributeType == "function" && !tt)
        switch (g.getAttributeType(Qr, Xt)) {
          case "TrustedHTML": {
            Ve = O.createHTML(Ve);
            break;
          }
          case "TrustedScriptURL": {
            Ve = O.createScriptURL(Ve);
            break;
          }
        }
      if (Ve !== Zn)
        try {
          tt ? w.setAttributeNS(tt, Pe, Ve) : w.setAttribute(Pe, Ve), wt(w) ? Me(w) : ri(t.removed);
        } catch {
          _e(Pe, w);
        }
    }
    At(G.afterSanitizeAttributes, w, null);
  }, uo = function K(w) {
    let N = null;
    const W = Ue(w);
    for (At(G.beforeSanitizeShadowDOM, w, null); N = W.nextNode(); )
      At(G.uponSanitizeShadowNode, N, null), Kr(N), Jr(N), N.content instanceof a && K(N.content);
    At(G.afterSanitizeShadowDOM, w, null);
  };
  return t.sanitize = function(K) {
    let w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, N = null, W = null, ve = null, je = null;
    if (et = !K, et && (K = "<!-->"), typeof K != "string" && !Pt(K))
      if (typeof K.toString == "function") {
        if (K = K.toString(), typeof K != "string")
          throw ln("dirty is not a string, aborting");
      } else
        throw ln("toString is not a function");
    if (!t.isSupported)
      return K;
    if (vt || Kt(w), t.removed = [], typeof K == "string" && (ft = !1), ft) {
      if (K.nodeName) {
        const Nt = Oe(K.nodeName);
        if (!ie[Nt] || ce[Nt])
          throw ln("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (K instanceof s)
      N = Ae("<!---->"), W = N.ownerDocument.importNode(K, !0), W.nodeType === un.element && W.nodeName === "BODY" || W.nodeName === "HTML" ? N = W : N.appendChild(W);
    else {
      if (!Ct && !Ee && !Ge && // eslint-disable-next-line unicorn/prefer-includes
      K.indexOf("<") === -1)
        return O && yt ? O.createHTML(K) : K;
      if (N = Ae(K), !N)
        return Ct ? null : yt ? U : "";
    }
    N && Rt && Me(N.firstChild);
    const Pe = Ue(ft ? K : N);
    for (; ve = Pe.nextNode(); )
      Kr(ve), Jr(ve), ve.content instanceof a && uo(ve.content);
    if (ft)
      return K;
    if (Ct) {
      if (It)
        for (je = Q.call(N.ownerDocument); N.firstChild; )
          je.appendChild(N.firstChild);
      else
        je = N;
      return (C.shadowroot || C.shadowrootmode) && (je = ne.call(r, je, !0)), je;
    }
    let tt = Ge ? N.outerHTML : N.innerHTML;
    return Ge && ie["!doctype"] && N.ownerDocument && N.ownerDocument.doctype && N.ownerDocument.doctype.name && Ke(da, N.ownerDocument.doctype.name) && (tt = "<!DOCTYPE " + N.ownerDocument.doctype.name + `>
` + tt), Ee && bn([X, I, P], (Nt) => {
      tt = sn(tt, Nt, " ");
    }), O && yt ? O.createHTML(tt) : tt;
  }, t.setConfig = function() {
    let K = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Kt(K), vt = !0;
  }, t.clearConfig = function() {
    Mt = null, vt = !1;
  }, t.isValidAttribute = function(K, w, N) {
    Mt || Kt({});
    const W = Oe(K), ve = Oe(w);
    return Xr(W, ve, N);
  }, t.addHook = function(K, w) {
    typeof w == "function" && on(G[K], w);
  }, t.removeHook = function(K, w) {
    if (w !== void 0) {
      const N = Do(G[K], w);
      return N === -1 ? void 0 : Po(G[K], N, 1)[0];
    }
    return ri(G[K]);
  }, t.removeHooks = function(K) {
    G[K] = [];
  }, t.removeAllHooks = function() {
    G = ci();
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
function Pn(e, t = !1) {
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
  const [e, t] = Ne([]), n = de(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = de(
    (o, s) => {
      const d = Pn(s, o === "assistant");
      t((l) => [
        ...l,
        {
          id: n(),
          role: o,
          content: d,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [n]
  ), i = de((o, s) => {
    t(
      (c) => c.map((d) => d.id === o ? { ...d, ...s } : d)
    );
  }, []), a = de(
    (o, s, c) => {
      t(
        (d) => d.map(
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
  const n = /* @__PURE__ */ new Set(), r = (d, l) => {
    const p = typeof d == "function" ? d(t) : d;
    if (!Object.is(p, t)) {
      const m = t;
      t = l ?? (typeof p != "object" || p === null) ? p : Object.assign({}, t, p), n.forEach((g) => g(t, m));
    }
  }, i = () => t, s = { setState: r, getState: i, getInitialState: () => c, subscribe: (d) => (n.add(d), () => n.delete(d)) }, c = t = e(r, i, s);
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
}, ls = (e) => ss, hi = { BASE_URL: "/", DEV: !0, MODE: "production", PROD: !1, SSR: !1, VITE_APP_TOLGEE_API_KEY: "tgpak_ge4v6ytcm5xtozdlobzxk4twgyzwqntjoe3xi4bwozygu5q", VITE_APP_TOLGEE_API_URL: "https://tolgee-translation.oddleapp.com", VITE_APP_TOLGEE_PROJECT_ID: "19", VITE_USER_NODE_ENV: "development" }, mn = /* @__PURE__ */ new Map(), vn = (e) => {
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
  let d;
  try {
    d = (a ?? (hi ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!d)
    return e(n, r, i);
  const { connection: l, ...p } = cs(s, d, c);
  let m = !0;
  i.setState = (S, M, x) => {
    const v = n(S, M);
    if (!m) return v;
    const D = x === void 0 ? {
      type: o || ds(new Error().stack) || "anonymous"
    } : typeof x == "string" ? { type: x } : x;
    return s === void 0 ? (l == null || l.send(D, r()), v) : (l == null || l.send(
      {
        ...D,
        type: `${s}/${D.type}`
      },
      {
        ...vn(c.name),
        [s]: i.getState()
      }
    ), v);
  }, i.devtools = {
    cleanup: () => {
      l && typeof l.unsubscribe == "function" && l.unsubscribe(), us(c.name, s);
    }
  };
  const g = (...S) => {
    const M = m;
    m = !1, n(...S), m = M;
  }, T = e(i.setState, r, i);
  if (p.type === "untracked" ? l == null || l.init(T) : (p.stores[p.store] = i, l == null || l.init(
    Object.fromEntries(
      Object.entries(p.stores).map(([S, M]) => [
        S,
        S === p.store ? T : M.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let S = !1;
    const M = i.dispatch;
    i.dispatch = (...x) => {
      (hi ? "production" : void 0) !== "production" && x[0].type === "__setState" && !S && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), S = !0), M(...x);
    };
  }
  return l.subscribe((S) => {
    var M;
    switch (S.type) {
      case "ACTION":
        if (typeof S.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return tr(
          S.payload,
          (x) => {
            if (x.type === "__setState") {
              if (s === void 0) {
                g(x.state);
                return;
              }
              Object.keys(x.state).length !== 1 && console.error(
                `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
              );
              const v = x.state[s];
              if (v == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(v) && g(v);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(x);
          }
        );
      case "DISPATCH":
        switch (S.payload.type) {
          case "RESET":
            return g(T), s === void 0 ? l == null ? void 0 : l.init(i.getState()) : l == null ? void 0 : l.init(vn(c.name));
          case "COMMIT":
            if (s === void 0) {
              l == null || l.init(i.getState());
              return;
            }
            return l == null ? void 0 : l.init(vn(c.name));
          case "ROLLBACK":
            return tr(S.state, (x) => {
              if (s === void 0) {
                g(x), l == null || l.init(i.getState());
                return;
              }
              g(x[s]), l == null || l.init(vn(c.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return tr(S.state, (x) => {
              if (s === void 0) {
                g(x);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(x[s]) && g(x[s]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: x } = S.payload, v = (M = x.computedStates.slice(-1)[0]) == null ? void 0 : M.state;
            if (!v) return;
            g(s === void 0 ? v : v[s]), l == null || l.send(
              null,
              // FIXME no-any
              x
            );
            return;
          }
          case "PAUSE_RECORDING":
            return m = !m;
        }
        return;
    }
  }), T;
}, ps = hs, tr = (e, t) => {
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
  chatStatus: Se.IDLE,
  streamingStatus: st.IDLE,
  // Actions
  setChatStatus: (t) => e({ chatStatus: t }),
  setStreamingStatus: (t) => e({ streamingStatus: t }),
  resetChatStatus: () => e({
    chatStatus: Se.IDLE,
    streamingStatus: st.IDLE
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
}), te = ls()(
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
), ah = () => te((e) => ({
  isModalOpen: e.isModalOpen,
  isCollapsed: e.isCollapsed,
  currentMode: e.currentMode,
  openModal: e.openModal,
  closeModal: e.closeModal,
  toggleCollapse: e.toggleCollapse,
  toggleFullscreen: e.toggleFullscreen
})), oh = () => te((e) => ({
  chatStatus: e.chatStatus,
  streamingStatus: e.streamingStatus,
  setChatStatus: e.setChatStatus,
  setStreamingStatus: e.setStreamingStatus,
  resetChatStatus: e.resetChatStatus
})), sh = () => te((e) => ({
  isLoadingConversation: e.isLoadingConversation,
  conversationError: e.conversationError,
  setIsLoadingConversation: e.setIsLoadingConversation,
  setConversationError: e.setConversationError,
  clearConversationError: e.clearConversationError
})), lh = () => te((e) => ({
  currentThreadId: e.currentThreadId,
  providerResId: e.providerResId,
  setCurrentThreadId: e.setCurrentThreadId,
  setProviderResId: e.setProviderResId,
  clearThreadData: e.clearThreadData
}));
function ws() {
  const e = te((v) => v.isStreaming), t = te((v) => v.setIsStreaming), n = te((v) => v.isThinking), r = te((v) => v.setIsThinking), i = te((v) => v.streamingContent), a = te((v) => v.setStreamingContent), o = te((v) => v.isHandlingTool), s = te((v) => v.setIsHandlingTool), c = te((v) => v.startStreaming), d = te((v) => v.stopStreaming), l = te((v) => v.clearStreamingBuffers), p = te((v) => v.resetToolHandling), m = ge(""), g = He(() => ({
    get current() {
      return te.getState().currentAssistantMessageId;
    },
    set current(v) {
      te.getState().setCurrentAssistantMessageId(v);
    }
  }), []), T = de((v) => {
    v ? c(v) : (t(!0), r(!0), a("")), m.current = "";
  }, [c, t, r, a]), S = de(() => {
    d(), m.current = "";
  }, [d]), M = de(() => {
    p();
  }, [p]), x = de(() => {
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
    resetToolHandling: M,
    clearStreamingBuffers: x
  };
}
function ks() {
  const e = He(
    () => (i, a) => a === !1 ? Be.isErrorMessage(i) ? $e.ERROR : $e.COMPLETED : Be.isCompletedMessage(i) ? $e.COMPLETED : Be.isErrorMessage(i) ? $e.ERROR : $e.PROCESSING,
    []
  ), t = He(
    () => (i) => Be.extractDuration(i),
    []
  ), n = He(
    () => (i) => Be.cleanReasoningContent(i),
    []
  ), r = He(
    () => (i, a) => {
      switch (Be.getMessageType(
        i,
        a
      )) {
        case ee.MESSAGE_TYPES.ERROR:
          return "Error";
        case ee.MESSAGE_TYPES.COMPLETED:
          return "Completed";
        case ee.MESSAGE_TYPES.THOUGHT:
          return ee.UI_TEXT.THOUGHT;
        case ee.MESSAGE_TYPES.THINKING:
        default:
          return ee.UI_TEXT.THINKING_ELLIPSIS;
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
  const e = He(
    () => (n, r) => r === !1 ? n.includes(ee.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : n.includes(ee.COMPLETED_MARKER) || n.includes("✅") ? "Tool Completed" : n.includes(ee.ERROR_MARKER) ? "Tool Error" : (n.includes(ee.HANDLING_MARKER), "Tool Processing..."),
    []
  ), t = He(
    () => (n, r) => r === !1 ? n.includes(ee.ERROR_MARKER) ? $e.ERROR : $e.COMPLETED : n.includes(ee.COMPLETED_MARKER) || n.includes("✅") ? $e.COMPLETED : n.includes(ee.ERROR_MARKER) ? $e.ERROR : $e.PROCESSING,
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
  streamingContentRef: d,
  clearStreamingBuffers: l,
  resetToolHandling: p
}) {
  const m = ge(/* @__PURE__ */ new Map()), g = ge(/* @__PURE__ */ new Map()), T = de(() => {
    if (c.current && d.current) {
      const O = Pn(
        d.current,
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
    d,
    n,
    l
  ]), S = de(
    (O) => {
      window.responseTimeoutId && (clearTimeout(window.responseTimeoutId), window.responseTimeoutId = null, c.current || e((E) => {
        var Q;
        const B = (Q = E.map((F, ne) => ({ msg: F, index: ne })).filter(({ msg: F }) => F.role === "user").pop()) == null ? void 0 : Q.index;
        return B !== void 0 ? E.map(
          (F, ne) => ne === B && (F.hasError || F.isRetrying) ? { ...F, hasError: !1, errorMessage: void 0, isRetrying: !1 } : F
        ) : E;
      }));
      const U = Pn(O, !0);
      if (c.current)
        d.current += U, o(d.current), n(
          c.current,
          d.current,
          !0
        );
      else {
        i(!1);
        const E = r();
        c.current = E, d.current = U, o(U);
        const B = {
          id: E,
          role: "assistant",
          content: U,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        e((Q) => [...Q, B]);
      }
    },
    [
      c,
      d,
      o,
      n,
      i,
      r,
      e
    ]
  ), M = de(
    (O, U, E) => {
      const { callId: B } = E || {};
      if (s(O), !B) return;
      const Q = Be.isThinkingMessage(U) && !U.includes("for") && !U.includes("seconds"), F = Be.isThinkingMessage(U) && U.includes("for") && U.includes("seconds"), ne = Be.isHandlingMessage(U), G = Be.isCompletedMessage(U), X = Be.isErrorMessage(U);
      if (Q || F) {
        const P = m.current.get(B);
        if (Q && !P) {
          T();
          const Z = r();
          m.current.set(B, Z);
          const re = {
            id: Z,
            role: "reasoning",
            content: U,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          e((se) => [...se, re]);
        } else F && P ? (n(P, U, !1), m.current.delete(B)) : P && Q && n(P, U, !0);
      }
      const I = g.current.get(B);
      if (ne && !I) {
        T();
        const P = U.match(
          ee.PATTERNS.HANDLING_TOOL
        ), Z = P ? P[1] : "Unknown Tool", re = r();
        g.current.set(B, re);
        const se = {
          id: re,
          role: "tooling",
          content: U,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...E,
            toolName: Z,
            callId: B,
            status: $e.PROCESSING
          }
        };
        e((Ce) => [...Ce, se]);
      } else if ((G || X) && I) {
        const P = U.match(
          ee.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), Z = P ? P[1] : "Unknown Tool";
        e(
          (re) => re.map(
            (se) => se.id === I ? {
              ...se,
              content: U,
              isStreaming: !1,
              toolData: {
                ...se.toolData,
                toolName: Z,
                status: X ? $e.ERROR : $e.COMPLETED,
                callId: B ?? ""
              }
            } : se
          )
        ), g.current.delete(B);
      } else I && O && !G && !X && n(I, U, !0);
    },
    [
      s,
      T,
      r,
      e,
      n
    ]
  ), x = de(() => {
    a(!1), i(!1), T();
  }, [a, i, T]), v = de(
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
    a(!1), i(!1), l(), p();
  }, [
    a,
    i,
    l,
    p
  ]);
  return {
    handleSetMessage: S,
    handleReasoningUpdate: M,
    handleChatFinished: x,
    handleChatError: v,
    stopGeneration: D,
    finalizeCurrentStreamingMessage: T
  };
}
function xs() {
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
function ch({ initialMode: e = "sidebar" }) {
  const t = te();
  return Re(() => {
    e && t.currentMode !== e && t.setCurrentMode(e);
  }, [e]), Re(() => {
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
function Es({
  entityId: e,
  entityType: t,
  httpApiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  messages: a,
  setMessages: o,
  setIsLoadingConversation: s,
  setConversationError: c,
  setCurrentThreadId: d,
  setProviderResId: l,
  metadata: p,
  isConnected: m = !0,
  // Default to true for backward compatibility
  onConversationInitialized: g
}) {
  const T = ge(!1), S = async () => {
    if (m && e && !(!p || typeof p == "object" && Object.keys(p).length === 0) && n && r && i && !T.current && !(a.length > 0))
      try {
        s(!0), c(null);
        const x = await vo(
          n,
          {
            entityId: e,
            entityType: t,
            metadata: p
          },
          {
            userMpAuthToken: r,
            chatServerKey: i
          }
        );
        o(x.messages), x.threadId && d(x.threadId), x.providerResId && l(x.providerResId), x.messages.length > 0 && g && g(), T.current = !0;
      } catch (x) {
        tn(x, "ConversationLoader"), c(
          x instanceof Error ? x.message : "Failed to load conversation"
        ), T.current = !0;
      } finally {
        s(!1);
      }
  };
  return Re(() => {
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
    d,
    l,
    p
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
  return Re(() => {
    if (r || !t)
      return;
    const d = !n && i.length === 0, l = !!n;
    if (d && (!a || !o) || l && !n)
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
    d ? s.current = e : l && t.updateMetadata(n, { metadata: e }).then(() => {
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
  const [e, t] = Ne(navigator.onLine), [n, r] = Ne(!1);
  return Re(() => {
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
    $(this, "config");
    $(this, "defaultFolder", "chat-uploads");
    $(this, "defaultMaxFileSize", 15 * 1024 * 1024);
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
      c.upload.addEventListener("progress", (d) => {
        if (d.lengthComputable && n) {
          const l = d.loaded / d.total * 100;
          a.forEach((p) => {
            p.progress = l;
          }), n([...a]);
        }
      }), c.addEventListener("load", async () => {
        if (c.status >= 200 && c.status < 300)
          try {
            const d = JSON.parse(c.responseText);
            let l;
            d.data && Array.isArray(d.data) ? l = d.data.map((p, m) => this.processUploadResult(t[m], p)) : Array.isArray(d) ? l = d.map((p, m) => this.processUploadResult(t[m], p)) : l = [this.processUploadResult(t[0], d)], a.forEach((p) => {
              p.status = "completed", p.progress = 100;
            }), n && n([...a]), o(l);
          } catch {
            a.forEach((l) => {
              l.status = "error";
            }), n && n([...a]), s(new Error("Invalid response format"));
          }
        else
          a.forEach((d) => {
            d.status = "error";
          }), n && n([...a]), s(new Error(`Upload failed with status ${c.status}`));
      }), c.addEventListener("error", () => {
        a.forEach((d) => {
          d.status = "error";
        }), n && n([...a]), s(new Error("Network error during upload"));
      }), c.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([d, l]) => {
        c.setRequestHeader(d, l);
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
          const d = c.loaded / c.total * 100;
          n(d);
        }
      }), s.addEventListener("load", async () => {
        if (s.status >= 200 && s.status < 300)
          try {
            const c = JSON.parse(s.responseText), d = this.processUploadResult(t, c);
            a(d);
          } catch {
            o(new Error("Invalid response format"));
          }
        else
          o(new Error(`Upload failed with status ${s.status}`));
      }), s.addEventListener("error", () => {
        o(new Error("Network error during upload"));
      }), s.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([c, d]) => {
        s.setRequestHeader(c, d);
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
    $(this, "config");
    $(this, "chatClient");
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
}, Et = {
  state: Is,
  url: pa,
  validation: Ms,
  css: fa,
  error: ga
};
class pi extends Nr {
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
    }), this.props.onError && this.props.onError(n, r);
  }
  componentDidUpdate(n) {
    const { resetOnPropsChange: r, resetKeys: i } = this.props, { hasError: a } = this.state;
    if (a && r && i) {
      const o = n.resetKeys || [];
      i.some(
        (c, d) => c !== o[d]
      ) && this.resetErrorBoundary();
    }
  }
  render() {
    const { hasError: n, error: r } = this.state, { children: i, fallback: a } = this.props;
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ f("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ L("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ f("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ f("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ f("p", { className: "chat-wrapper__error-message", children: Et.error.getUserFriendlyErrorMessage(r) }),
      /* @__PURE__ */ f("div", { className: "chat-wrapper__error-actions", children: /* @__PURE__ */ f(
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
      })() && /* @__PURE__ */ L("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ f("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ f("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : i;
  }
}
class As extends Nr {
  constructor(n) {
    super(n);
    $(this, "retryCount", 0);
    $(this, "retryTimeoutId", null);
    $(this, "handleRetry", () => {
      const { maxRetries: n = 3, retryDelay: r = 1e3, onRetry: i } = this.props;
      this.retryCount >= n || (this.setState({ isRetrying: !0 }), this.retryCount++, this.retryTimeoutId = window.setTimeout(() => {
        this.setState({
          hasError: !1,
          error: void 0,
          isRetrying: !1
        }), i && i();
      }, r * this.retryCount));
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
    this.props.onError && this.props.onError(n);
  }
  componentWillUnmount() {
    this.retryTimeoutId && clearTimeout(this.retryTimeoutId);
  }
  render() {
    const { hasError: n, error: r, isRetrying: i } = this.state, { children: a, maxRetries: o = 3 } = this.props;
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || Et.error.isNetworkError(r)) ? /* @__PURE__ */ f("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ L("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ f("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ f("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ f("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ f("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ L("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ f("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ f("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ L(zt, { children: [
        this.retryCount < o && /* @__PURE__ */ L(
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
        /* @__PURE__ */ f(
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
      })() && /* @__PURE__ */ L("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ f("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ f("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
}
class Ns extends Nr {
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
    const r = this.extractFailedFiles(n);
    this.setState({ failedFiles: r }), this.props.onError && this.props.onError(n, r);
  }
  extractFailedFiles(n) {
    const r = /file[s]?\s*['":]?\s*([^,\n]+)/gi, i = n.message.match(r);
    return i ? i.map((a) => a.replace(/file[s]?\s*['":]?\s*/i, "").trim()) : [];
  }
  render() {
    const { hasError: n, error: r, failedFiles: i } = this.state, { children: a, allowRetry: o = !0 } = this.props;
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ f("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ L("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ f("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ f("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ f("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ L("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ f("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ f("ul", { className: "chat-wrapper__failed-files-list", children: i.map((c, d) => /* @__PURE__ */ f("li", { className: "chat-wrapper__failed-file", children: c }, d)) })
      ] }),
      /* @__PURE__ */ L("div", { className: "chat-wrapper__error-actions", children: [
        o && /* @__PURE__ */ f(
          "button",
          {
            className: "chat-wrapper__error-retry",
            onClick: this.handleRetry,
            type: "button",
            children: "Try Again"
          }
        ),
        /* @__PURE__ */ f(
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
      })() && /* @__PURE__ */ L("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ f("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ f("pre", { className: "chat-wrapper__error-stack", children: r.stack })
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
}) => /* @__PURE__ */ L(
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
      /* @__PURE__ */ f(
        "path",
        {
          d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
          fill: r
        }
      ),
      /* @__PURE__ */ f("circle", { cx: "7", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ f("circle", { cx: "12", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ f("circle", { cx: "17", cy: "10", r: "1", fill: r })
    ]
  }
), Os = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ f(
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
    children: /* @__PURE__ */ f(
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
}) => /* @__PURE__ */ f(
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
      /* @__PURE__ */ f(
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
      /* @__PURE__ */ f(
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
}) => /* @__PURE__ */ f(
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
    children: /* @__PURE__ */ f(
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
), uh = ({
  className: e,
  onClick: t,
  size: n = 16,
  color: r = "currentColor"
}) => /* @__PURE__ */ f(
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
    children: /* @__PURE__ */ f(
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
}) => /* @__PURE__ */ L(
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
      /* @__PURE__ */ f("mask", { id: "mask0_444_23118", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "18", height: "18", children: /* @__PURE__ */ f("rect", { width: "18", height: "18", fill: "#D9D9D9" }) }),
      /* @__PURE__ */ f("g", { mask: "url(#mask0_444_23118)", children: /* @__PURE__ */ f(
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
  return /* @__PURE__ */ L(
    "button",
    {
      className: "chat-wrapper__bubble-button",
      onClick: i,
      title: a,
      children: [
        /* @__PURE__ */ f(Ls, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ f("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
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
  const s = () => t === "modal" && r && i ? /* @__PURE__ */ f(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: i,
      title: "Close chat",
      children: /* @__PURE__ */ f(Os, { size: 20 })
    }
  ) : null, c = () => {
    if ((t === "sidebar" || t === "fullscreen") && !n && a) {
      const l = t === "fullscreen";
      return /* @__PURE__ */ f(
        "button",
        {
          className: l ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: a,
          title: l ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ f(Ds, { size: 20, isFullscreen: l })
        }
      );
    }
    return null;
  }, d = () => (t === "sidebar" || t === "fullscreen") && !n && o ? /* @__PURE__ */ f(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: o,
      title: "Collapse chat",
      children: /* @__PURE__ */ f(Ps, { size: 20 })
    }
  ) : null;
  return /* @__PURE__ */ L("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ f("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ f("h2", { className: "chat-wrapper__title", children: e }) }),
    /* @__PURE__ */ L("div", { className: "chat-wrapper__header-controls", children: [
      c(),
      d(),
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
    $(
      this,
      "name",
      /** @type {const} */
      "Assertion"
    );
    $(
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
function wr(e) {
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
function kr(e) {
  return e.toLowerCase();
}
class it {
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
it.prototype.attribute = "";
it.prototype.booleanish = !1;
it.prototype.boolean = !1;
it.prototype.commaOrSpaceSeparated = !1;
it.prototype.commaSeparated = !1;
it.prototype.defined = !1;
it.prototype.mustUseProperty = !1;
it.prototype.number = !1;
it.prototype.overloadedBoolean = !1;
it.prototype.property = "";
it.prototype.spaceSeparated = !1;
it.prototype.space = void 0;
let qs = 0;
const oe = qt(), Fe = qt(), Sr = qt(), A = qt(), Te = qt(), Qt = qt(), ot = qt();
function qt() {
  return 2 ** ++qs;
}
const Tr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: oe,
  booleanish: Fe,
  commaOrSpaceSeparated: ot,
  commaSeparated: Qt,
  number: A,
  overloadedBoolean: Sr,
  spaceSeparated: Te
}, Symbol.toStringTag, { value: "Module" })), nr = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Tr)
);
class Lr extends it {
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
      for (; ++a < nr.length; ) {
        const o = nr[a];
        mi(this, nr[a], (r & Tr[o]) === Tr[o]);
      }
  }
}
Lr.prototype.defined = !0;
function mi(e, t, n) {
  n && (e[t] = n);
}
function nn(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new Lr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[kr(r)] = r, n[kr(a.attribute)] = r;
  }
  return new yn(t, n, e.space);
}
const ya = nn({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Fe,
    ariaAutoComplete: null,
    ariaBusy: Fe,
    ariaChecked: Fe,
    ariaColCount: A,
    ariaColIndex: A,
    ariaColSpan: A,
    ariaControls: Te,
    ariaCurrent: null,
    ariaDescribedBy: Te,
    ariaDetails: null,
    ariaDisabled: Fe,
    ariaDropEffect: Te,
    ariaErrorMessage: null,
    ariaExpanded: Fe,
    ariaFlowTo: Te,
    ariaGrabbed: Fe,
    ariaHasPopup: null,
    ariaHidden: Fe,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: Te,
    ariaLevel: A,
    ariaLive: null,
    ariaModal: Fe,
    ariaMultiLine: Fe,
    ariaMultiSelectable: Fe,
    ariaOrientation: null,
    ariaOwns: Te,
    ariaPlaceholder: null,
    ariaPosInSet: A,
    ariaPressed: Fe,
    ariaReadOnly: Fe,
    ariaRelevant: null,
    ariaRequired: Fe,
    ariaRoleDescription: Te,
    ariaRowCount: A,
    ariaRowIndex: A,
    ariaRowSpan: A,
    ariaSelected: Fe,
    ariaSetSize: A,
    ariaSort: null,
    ariaValueMax: A,
    ariaValueMin: A,
    ariaValueNow: A,
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
const Zs = nn({
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
    accept: Qt,
    acceptCharset: Te,
    accessKey: Te,
    action: null,
    allow: null,
    allowFullScreen: oe,
    allowPaymentRequest: oe,
    allowUserMedia: oe,
    alt: null,
    as: null,
    async: oe,
    autoCapitalize: null,
    autoComplete: Te,
    autoFocus: oe,
    autoPlay: oe,
    blocking: Te,
    capture: null,
    charSet: null,
    checked: oe,
    cite: null,
    className: Te,
    cols: A,
    colSpan: null,
    content: null,
    contentEditable: Fe,
    controls: oe,
    controlsList: Te,
    coords: A | Qt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: oe,
    defer: oe,
    dir: null,
    dirName: null,
    disabled: oe,
    download: Sr,
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
    headers: Te,
    height: A,
    hidden: Sr,
    high: A,
    href: null,
    hrefLang: null,
    htmlFor: Te,
    httpEquiv: Te,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: oe,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: oe,
    itemId: null,
    itemProp: Te,
    itemRef: Te,
    itemScope: oe,
    itemType: Te,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: oe,
    low: A,
    manifest: null,
    max: null,
    maxLength: A,
    media: null,
    method: null,
    min: null,
    minLength: A,
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
    optimum: A,
    pattern: null,
    ping: Te,
    placeholder: null,
    playsInline: oe,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: oe,
    referrerPolicy: null,
    rel: Te,
    required: oe,
    reversed: oe,
    rows: A,
    rowSpan: A,
    sandbox: Te,
    scope: null,
    scoped: oe,
    seamless: oe,
    selected: oe,
    shadowRootClonable: oe,
    shadowRootDelegatesFocus: oe,
    shadowRootMode: null,
    shape: null,
    size: A,
    sizes: null,
    slot: null,
    span: A,
    spellCheck: Fe,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: A,
    step: null,
    style: null,
    tabIndex: A,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: oe,
    useMap: null,
    value: Fe,
    width: A,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: Te,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: A,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: A,
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
    hSpace: A,
    // `<img>` and `<object>`
    leftMargin: A,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: A,
    // `<body>`
    marginWidth: A,
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
    rightMargin: A,
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
    topMargin: A,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: A,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: oe,
    disableRemotePlayback: oe,
    prefix: null,
    property: null,
    results: A,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: ka
}), Ks = nn({
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
    about: ot,
    accentHeight: A,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: A,
    amplitude: A,
    arabicForm: null,
    ascent: A,
    attributeName: null,
    attributeType: null,
    azimuth: A,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: A,
    by: null,
    calcMode: null,
    capHeight: A,
    className: Te,
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
    descent: A,
    diffuseConstant: A,
    direction: null,
    display: null,
    dur: null,
    divisor: A,
    dominantBaseline: null,
    download: oe,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: A,
    enableBackground: null,
    end: null,
    event: null,
    exponent: A,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: A,
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
    g1: Qt,
    g2: Qt,
    glyphName: Qt,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: A,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: A,
    horizOriginX: A,
    horizOriginY: A,
    id: null,
    ideographic: A,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: A,
    k: A,
    k1: A,
    k2: A,
    k3: A,
    k4: A,
    kernelMatrix: ot,
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
    limitingConeAngle: A,
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
    mediaSize: A,
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
    overlinePosition: A,
    overlineThickness: A,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: A,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: Te,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: A,
    pointsAtY: A,
    pointsAtZ: A,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: ot,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: ot,
    rev: ot,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: ot,
    requiredFeatures: ot,
    requiredFonts: ot,
    requiredFormats: ot,
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
    specularConstant: A,
    specularExponent: A,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: A,
    strikethroughThickness: A,
    string: null,
    stroke: null,
    strokeDashArray: ot,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: A,
    strokeOpacity: A,
    strokeWidth: null,
    style: null,
    surfaceScale: A,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: ot,
    tabIndex: A,
    tableValues: null,
    target: null,
    targetX: A,
    targetY: A,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: ot,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: A,
    underlineThickness: A,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: A,
    values: null,
    vAlphabetic: A,
    vMathematical: A,
    vectorEffect: null,
    vHanging: A,
    vIdeographic: A,
    version: null,
    vertAdvY: A,
    vertOriginX: A,
    vertOriginY: A,
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
    xHeight: A,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: wa
}), Sa = nn({
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
}), Ta = nn({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: ka
}), xa = nn({
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
  const n = kr(t);
  let r = t, i = it;
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
    i = Lr;
  }
  return new i(r, t);
}
function el(e) {
  return "-" + e.toLowerCase();
}
function tl(e) {
  return e.charAt(1).toUpperCase();
}
const nl = Ca([ya, Zs, Sa, Ta, xa], "html"), Or = Ca([ya, Ks, Sa, Ta, xa], "svg");
function rl(e) {
  return e.join(" ").trim();
}
var Fn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Dr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Pr = {}, yi = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, il = /\n/g, al = /^\s*/, ol = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, sl = /^:\s*/, ll = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, cl = /^[;\s]*/, ul = /^\s+|\s+$/g, dl = `
`, wi = "/", ki = "*", $t = "", hl = "comment", pl = "declaration", fl = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(T) {
    var S = T.match(il);
    S && (n += S.length);
    var M = T.lastIndexOf(dl);
    r = ~M ? T.length - M : r + T.length;
  }
  function a() {
    var T = { line: n, column: r };
    return function(S) {
      return S.position = new o(T), d(), S;
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
      var M = S[0];
      return i(M), e = e.slice(M.length), S;
    }
  }
  function d() {
    c(al);
  }
  function l(T) {
    var S;
    for (T = T || []; S = p(); )
      S !== !1 && T.push(S);
    return T;
  }
  function p() {
    var T = a();
    if (!(wi != e.charAt(0) || ki != e.charAt(1))) {
      for (var S = 2; $t != e.charAt(S) && (ki != e.charAt(S) || wi != e.charAt(S + 1)); )
        ++S;
      if (S += 2, $t === e.charAt(S - 1))
        return s("End of comment missing");
      var M = e.slice(2, S - 2);
      return r += 2, i(M), e = e.slice(S), r += 2, T({
        type: hl,
        comment: M
      });
    }
  }
  function m() {
    var T = a(), S = c(ol);
    if (S) {
      if (p(), !c(sl)) return s("property missing ':'");
      var M = c(ll), x = T({
        type: pl,
        property: Si(S[0].replace(yi, $t)),
        value: M ? Si(M[0].replace(yi, $t)) : $t
      });
      return c(cl), x;
    }
  }
  function g() {
    var T = [];
    l(T);
    for (var S; S = m(); )
      S !== !1 && (T.push(S), l(T));
    return T;
  }
  return d(), g();
};
function Si(e) {
  return e ? e.replace(ul, $t) : $t;
}
var gl = Fn && Fn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.default = Cl;
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
var Bn = {};
Object.defineProperty(Bn, "__esModule", { value: !0 });
Bn.camelCase = void 0;
var yl = /^--[a-zA-Z0-9_-]+$/, wl = /-([a-z])/g, kl = /^[^-]+$/, Sl = /^-(webkit|moz|ms|o|khtml)-/, Tl = /^-(ms)-/, xl = function(e) {
  return !e || kl.test(e) || yl.test(e);
}, El = function(e, t) {
  return t.toUpperCase();
}, Ti = function(e, t) {
  return "".concat(t, "-");
}, bl = function(e, t) {
  return t === void 0 && (t = {}), xl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Tl, Ti) : e = e.replace(Sl, Ti), e.replace(wl, El));
};
Bn.camelCase = bl;
var _l = Fn && Fn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, vl = _l(Pr), Rl = Bn;
function xr(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, vl.default)(e, function(r, i) {
    r && i && (n[(0, Rl.camelCase)(r, t)] = i);
  }), n;
}
xr.default = xr;
var Il = xr;
const Ml = /* @__PURE__ */ Dr(Il), Ea = ba("end"), Fr = ba("start");
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
  const t = Fr(e), n = Ea(e);
  if (t && n)
    return { start: t, end: n };
}
function pn(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? xi(e.position) : "start" in e || "end" in e ? xi(e) : "line" in e || "column" in e ? Er(e) : "";
}
function Er(e) {
  return Ei(e && e.line) + ":" + Ei(e && e.column);
}
function xi(e) {
  return Er(e && e.start) + "-" + Er(e && e.end);
}
function Ei(e) {
  return e && typeof e == "number" ? e : 1;
}
class qe extends Error {
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
qe.prototype.file = "";
qe.prototype.name = "";
qe.prototype.reason = "";
qe.prototype.message = "";
qe.prototype.stack = "";
qe.prototype.column = void 0;
qe.prototype.line = void 0;
qe.prototype.ancestors = void 0;
qe.prototype.cause = void 0;
qe.prototype.fatal = void 0;
qe.prototype.place = void 0;
qe.prototype.ruleId = void 0;
qe.prototype.source = void 0;
const Hr = {}.hasOwnProperty, Nl = /* @__PURE__ */ new Map(), Ll = /[A-Z]/g, Ol = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Dl = /* @__PURE__ */ new Set(["td", "th"]), _a = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
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
    schema: t.space === "svg" ? Or : nl,
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
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Or, e.schema = i), e.ancestors.push(t);
  const a = Ia(e, t.tagName, !1), o = jl(e, t);
  let s = Ur(e, t);
  return Ol.has(t.tagName) && (s = s.filter(function(c) {
    return typeof c == "string" ? !$s(c) : !0;
  })), Ra(e, o, a, t), zr(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
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
  t.name === "svg" && r.space === "html" && (i = Or, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : Ia(e, t.name, !0), o = $l(e, t), s = Ur(e, t);
  return Ra(e, o, a, t), zr(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function Bl(e, t, n) {
  const r = {};
  return zr(r, Ur(e, t)), e.create(t, e.Fragment, r, n);
}
function Gl(e, t) {
  return t.value;
}
function Ra(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function zr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function Vl(e, t, n) {
  return r;
  function r(i, a, o, s) {
    const d = Array.isArray(o.children) ? n : t;
    return s ? d(a, o, s) : d(a, o);
  }
}
function Wl(e, t) {
  return n;
  function n(r, i, a, o) {
    const s = Array.isArray(a.children), c = Fr(r);
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
    if (i !== "children" && Hr.call(t.properties, i)) {
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
function Ur(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Nl;
  for (; ++r < t.children.length; ) {
    const a = t.children[r];
    let o;
    if (e.passKeys) {
      const c = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (c) {
        const d = i.get(c) || 0;
        o = c + "-" + d, i.set(c, d + 1);
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
    ), i = new qe("Cannot parse `style` attribute", {
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
    return Hr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Cn(e);
}
function Cn(e, t) {
  const n = new qe(
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
    Hr.call(e, n) && (t[Xl(n)] = e[n]);
  return t;
}
function Xl(e) {
  let t = e.replace(Ll, Yl);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Yl(e) {
  return "-" + e.toLowerCase();
}
const rr = {
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
function Br(e) {
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
), H = (
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
), u = (
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
), Tt = (
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
function _t(e, t, n, r) {
  const i = e.length;
  let a = 0, o;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < H.v8MaxSafeChunkSize)
    o = Array.from(r), o.unshift(t, n), e.splice(...o);
  else
    for (n && e.splice(t, n); a < r.length; )
      o = r.slice(
        a,
        a + H.v8MaxSafeChunkSize
      ), o.unshift(t, 0), e.splice(...o), a += H.v8MaxSafeChunkSize, t += H.v8MaxSafeChunkSize;
}
function dt(e, t) {
  return e.length > 0 ? (_t(e, e.length, 0, t), e) : t;
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
  _t(e, 0, 0, r);
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
    n > 1114111 ? Tt.replacementCharacter : String.fromCodePoint(n)
  );
}
function en(e) {
  return e.replace(/[\t\n\r ]+/g, Tt.space).replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const bt = Ut(/[A-Za-z]/), lt = Ut(/[\dA-Za-z]/), ic = Ut(/[#-'*+\--9=?A-Z^-~]/);
function br(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < h.space || e === h.del)
  );
}
const _r = Ut(/\d/), ac = Ut(/[\dA-Fa-f]/), oc = Ut(/[!-/:-@[-`{-~]/);
function V(e) {
  return e !== null && e < h.horizontalTab;
}
function rt(e) {
  return e !== null && (e < h.nul || e === h.space);
}
function me(e) {
  return e === h.horizontalTab || e === h.virtualSpace || e === h.space;
}
const sc = Ut(new RegExp("\\p{P}|\\p{S}", "u")), lc = Ut(/\s/);
function Ut(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function rn(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let o = "";
    if (a === h.percentSign && lt(e.charCodeAt(n + 1)) && lt(e.charCodeAt(n + 2)))
      i = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (o = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const s = e.charCodeAt(n + 1);
      a < 56320 && s > 56319 && s < 57344 ? (o = String.fromCharCode(a, s), i = 1) : o = Tt.replacementCharacter;
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
      s === h.eof || V(s),
      "expected eol or eof"
    ), s === h.eof) {
      e.consume(s);
      return;
    }
    return e.enter(u.lineEnding), e.consume(s), e.exit(u.lineEnding), xe(e, t, u.linePrefix);
  }
  function i(s) {
    return k(
      s !== h.eof && !V(s),
      "expected anything other than a line ending or EOF"
    ), e.enter(u.paragraph), a(s);
  }
  function a(s) {
    const c = e.enter(u.chunkText, {
      contentType: H.contentTypeText,
      previous: n
    });
    return n && (n.next = c), n = c, o(s);
  }
  function o(s) {
    if (s === h.eof) {
      e.exit(u.chunkText), e.exit(u.paragraph), e.consume(s);
      return;
    }
    return V(s) ? (e.consume(s), e.exit(u.chunkText), a) : (e.consume(s), o);
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
        d
      )(D);
    }
    return d(D);
  }
  function c(D) {
    if (k(
      t.containerState,
      "expected `containerState` to be defined after continuation"
    ), r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && v();
      const O = t.events.length;
      let U = O, E;
      for (; U--; )
        if (t.events[U][0] === "exit" && t.events[U][1].type === u.chunkFlow) {
          E = t.events[U][1].end;
          break;
        }
      k(E, "could not find previous flow chunk"), x(r);
      let B = O;
      for (; B < t.events.length; )
        t.events[B][1].end = { ...E }, B++;
      return _t(
        t.events,
        U + 1,
        0,
        t.events.slice(O)
      ), t.events.length = B, d(D);
    }
    return s(D);
  }
  function d(D) {
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
      p
    )(D);
  }
  function l(D) {
    return i && v(), x(r), m(D);
  }
  function p(D) {
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
      i && v(), x(0), e.consume(D);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter(u.chunkFlow, {
      _tokenizer: i,
      contentType: H.contentTypeFlow,
      previous: a
    }), S(D);
  }
  function S(D) {
    if (D === h.eof) {
      M(e.exit(u.chunkFlow), !0), x(0), e.consume(D);
      return;
    }
    return V(D) ? (e.consume(D), M(e.exit(u.chunkFlow)), r = 0, t.interrupt = void 0, s) : (e.consume(D), S);
  }
  function M(D, O) {
    k(i, "expected `childFlow` to be defined when continuing");
    const U = t.sliceStream(D);
    if (O && U.push(null), D.previous = a, a && (a.next = D), a = D, i.defineSkip(D.start), i.write(U), t.parser.lazy[D.start.line]) {
      let E = i.events.length;
      for (; E--; )
        if (
          // The token starts before the line ending…
          i.events[E][1].start.offset < o && // …and either is not ended yet…
          (!i.events[E][1].end || // …or ends after it.
          i.events[E][1].end.offset > o)
        )
          return;
      const B = t.events.length;
      let Q = B, F, ne;
      for (; Q--; )
        if (t.events[Q][0] === "exit" && t.events[Q][1].type === u.chunkFlow) {
          if (F) {
            ne = t.events[Q][1].end;
            break;
          }
          F = !0;
        }
      for (k(ne, "could not find previous flow chunk"), x(r), E = B; E < t.events.length; )
        t.events[E][1].end = { ...ne }, E++;
      _t(
        t.events,
        Q + 1,
        0,
        t.events.slice(B)
      ), t.events.length = E;
    }
  }
  function x(D) {
    let O = n.length;
    for (; O-- > D; ) {
      const U = n[O];
      t.containerState = U[1], k(
        U[0].exit,
        "expected `exit` to be defined on container construct"
      ), U[0].exit.call(t, e);
    }
    n.length = D;
  }
  function v() {
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
    u.linePrefix,
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : H.tabSize
  );
}
function Ii(e) {
  if (e === h.eof || rt(e) || lc(e))
    return H.characterGroupWhitespace;
  if (sc(e))
    return H.characterGroupPunctuation;
}
function Gr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const vr = {
  name: "attention",
  resolveAll: fc,
  tokenize: gc
};
function fc(e, t) {
  let n = -1, r, i, a, o, s, c, d, l;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const p = { ...e[r][1].end }, m = { ...e[n][1].start };
          Mi(p, -c), Mi(m, c), o = {
            type: c > 1 ? u.strongSequence : u.emphasisSequence,
            start: p,
            end: { ...e[r][1].end }
          }, s = {
            type: c > 1 ? u.strongSequence : u.emphasisSequence,
            start: { ...e[n][1].start },
            end: m
          }, a = {
            type: c > 1 ? u.strongText : u.emphasisText,
            start: { ...e[r][1].end },
            end: { ...e[n][1].start }
          }, i = {
            type: c > 1 ? u.strong : u.emphasis,
            start: { ...o.start },
            end: { ...s.end }
          }, e[r][1].end = { ...o.start }, e[n][1].start = { ...s.end }, d = [], e[r][1].end.offset - e[r][1].start.offset && (d = dt(d, [
            ["enter", e[r][1], t],
            ["exit", e[r][1], t]
          ])), d = dt(d, [
            ["enter", i, t],
            ["enter", o, t],
            ["exit", o, t],
            ["enter", a, t]
          ]), k(
            t.parser.constructs.insideSpan.null,
            "expected `insideSpan` to be populated"
          ), d = dt(
            d,
            Gr(
              t.parser.constructs.insideSpan.null,
              e.slice(r + 1, n),
              t
            )
          ), d = dt(d, [
            ["exit", a, t],
            ["enter", s, t],
            ["exit", s, t],
            ["exit", i, t]
          ]), e[n][1].end.offset - e[n][1].start.offset ? (l = 2, d = dt(d, [
            ["enter", e[n][1], t],
            ["exit", e[n][1], t]
          ])) : l = 0, _t(e, r - 1, n - r + 3, d), n = r + d.length - l - 2;
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
    const d = e.exit("attentionSequence"), l = Ii(c);
    k(n, "expected `attentionMarkers` to be populated");
    const p = !l || l === H.characterGroupPunctuation && i || n.includes(c), m = !i || i === H.characterGroupPunctuation && l || n.includes(r);
    return d._open = !!(a === h.asterisk ? p : p && (i || !m)), d._close = !!(a === h.asterisk ? m : m && (l || !p)), t(c);
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
    return k(g === h.lessThan, "expected `<`"), e.enter(u.autolink), e.enter(u.autolinkMarker), e.consume(g), e.exit(u.autolinkMarker), e.enter(u.autolinkProtocol), a;
  }
  function a(g) {
    return bt(g) ? (e.consume(g), o) : g === h.atSign ? n(g) : d(g);
  }
  function o(g) {
    return g === h.plusSign || g === h.dash || g === h.dot || lt(g) ? (r = 1, s(g)) : d(g);
  }
  function s(g) {
    return g === h.colon ? (e.consume(g), r = 0, c) : (g === h.plusSign || g === h.dash || g === h.dot || lt(g)) && r++ < H.autolinkSchemeSizeMax ? (e.consume(g), s) : (r = 0, d(g));
  }
  function c(g) {
    return g === h.greaterThan ? (e.exit(u.autolinkProtocol), e.enter(u.autolinkMarker), e.consume(g), e.exit(u.autolinkMarker), e.exit(u.autolink), t) : g === h.eof || g === h.space || g === h.lessThan || br(g) ? n(g) : (e.consume(g), c);
  }
  function d(g) {
    return g === h.atSign ? (e.consume(g), l) : ic(g) ? (e.consume(g), d) : n(g);
  }
  function l(g) {
    return lt(g) ? p(g) : n(g);
  }
  function p(g) {
    return g === h.dot ? (e.consume(g), r = 0, l) : g === h.greaterThan ? (e.exit(u.autolinkProtocol).type = u.autolinkEmail, e.enter(u.autolinkMarker), e.consume(g), e.exit(u.autolinkMarker), e.exit(u.autolink), t) : m(g);
  }
  function m(g) {
    if ((g === h.dash || lt(g)) && r++ < H.autolinkDomainSizeMax) {
      const T = g === h.dash ? m : p;
      return e.consume(g), T;
    }
    return n(g);
  }
}
const Gn = { partial: !0, tokenize: yc };
function yc(e, t, n) {
  return r;
  function r(a) {
    return me(a) ? xe(e, i, u.linePrefix)(a) : i(a);
  }
  function i(a) {
    return a === h.eof || V(a) ? t(a) : n(a);
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
      return k(s, "expected `containerState` to be defined in container"), s.open || (e.enter(u.blockQuote, { _container: !0 }), s.open = !0), e.enter(u.blockQuotePrefix), e.enter(u.blockQuoteMarker), e.consume(o), e.exit(u.blockQuoteMarker), a;
    }
    return n(o);
  }
  function a(o) {
    return me(o) ? (e.enter(u.blockQuotePrefixWhitespace), e.consume(o), e.exit(u.blockQuotePrefixWhitespace), e.exit(u.blockQuotePrefix), t) : (e.exit(u.blockQuotePrefix), t(o));
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
      u.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : H.tabSize
    )(o)) : a(o);
  }
  function a(o) {
    return e.attempt(Na, t, n)(o);
  }
}
function Sc(e) {
  e.exit(u.blockQuote);
}
const La = {
  name: "characterEscape",
  tokenize: Tc
};
function Tc(e, t, n) {
  return r;
  function r(a) {
    return k(a === h.backslash, "expected `\\`"), e.enter(u.characterEscape), e.enter(u.escapeMarker), e.consume(a), e.exit(u.escapeMarker), i;
  }
  function i(a) {
    return oc(a) ? (e.enter(u.characterEscapeValue), e.consume(a), e.exit(u.characterEscapeValue), e.exit(u.characterEscape), t) : n(a);
  }
}
const Oa = {
  name: "characterReference",
  tokenize: xc
};
function xc(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return s;
  function s(p) {
    return k(p === h.ampersand, "expected `&`"), e.enter(u.characterReference), e.enter(u.characterReferenceMarker), e.consume(p), e.exit(u.characterReferenceMarker), c;
  }
  function c(p) {
    return p === h.numberSign ? (e.enter(u.characterReferenceMarkerNumeric), e.consume(p), e.exit(u.characterReferenceMarkerNumeric), d) : (e.enter(u.characterReferenceValue), a = H.characterReferenceNamedSizeMax, o = lt, l(p));
  }
  function d(p) {
    return p === h.uppercaseX || p === h.lowercaseX ? (e.enter(u.characterReferenceMarkerHexadecimal), e.consume(p), e.exit(u.characterReferenceMarkerHexadecimal), e.enter(u.characterReferenceValue), a = H.characterReferenceHexadecimalSizeMax, o = ac, l) : (e.enter(u.characterReferenceValue), a = H.characterReferenceDecimalSizeMax, o = _r, l(p));
  }
  function l(p) {
    if (p === h.semicolon && i) {
      const m = e.exit(u.characterReferenceValue);
      return o === lt && !Br(r.sliceSerialize(m)) ? n(p) : (e.enter(u.characterReferenceMarker), e.consume(p), e.exit(u.characterReferenceMarker), e.exit(u.characterReference), t);
    }
    return o(p) && i++ < a ? (e.consume(p), l) : n(p);
  }
}
const Ai = {
  partial: !0,
  tokenize: bc
}, Ni = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Ec
};
function Ec(e, t, n) {
  const r = this, i = { partial: !0, tokenize: U };
  let a = 0, o = 0, s;
  return c;
  function c(E) {
    return d(E);
  }
  function d(E) {
    k(
      E === h.graveAccent || E === h.tilde,
      "expected `` ` `` or `~`"
    );
    const B = r.events[r.events.length - 1];
    return a = B && B[1].type === u.linePrefix ? B[2].sliceSerialize(B[1], !0).length : 0, s = E, e.enter(u.codeFenced), e.enter(u.codeFencedFence), e.enter(u.codeFencedFenceSequence), l(E);
  }
  function l(E) {
    return E === s ? (o++, e.consume(E), l) : o < H.codeFencedSequenceSizeMin ? n(E) : (e.exit(u.codeFencedFenceSequence), me(E) ? xe(e, p, u.whitespace)(E) : p(E));
  }
  function p(E) {
    return E === h.eof || V(E) ? (e.exit(u.codeFencedFence), r.interrupt ? t(E) : e.check(Ai, S, O)(E)) : (e.enter(u.codeFencedFenceInfo), e.enter(u.chunkString, { contentType: H.contentTypeString }), m(E));
  }
  function m(E) {
    return E === h.eof || V(E) ? (e.exit(u.chunkString), e.exit(u.codeFencedFenceInfo), p(E)) : me(E) ? (e.exit(u.chunkString), e.exit(u.codeFencedFenceInfo), xe(e, g, u.whitespace)(E)) : E === h.graveAccent && E === s ? n(E) : (e.consume(E), m);
  }
  function g(E) {
    return E === h.eof || V(E) ? p(E) : (e.enter(u.codeFencedFenceMeta), e.enter(u.chunkString, { contentType: H.contentTypeString }), T(E));
  }
  function T(E) {
    return E === h.eof || V(E) ? (e.exit(u.chunkString), e.exit(u.codeFencedFenceMeta), p(E)) : E === h.graveAccent && E === s ? n(E) : (e.consume(E), T);
  }
  function S(E) {
    return k(V(E), "expected eol"), e.attempt(i, O, M)(E);
  }
  function M(E) {
    return k(V(E), "expected eol"), e.enter(u.lineEnding), e.consume(E), e.exit(u.lineEnding), x;
  }
  function x(E) {
    return a > 0 && me(E) ? xe(
      e,
      v,
      u.linePrefix,
      a + 1
    )(E) : v(E);
  }
  function v(E) {
    return E === h.eof || V(E) ? e.check(Ai, S, O)(E) : (e.enter(u.codeFlowValue), D(E));
  }
  function D(E) {
    return E === h.eof || V(E) ? (e.exit(u.codeFlowValue), v(E)) : (e.consume(E), D);
  }
  function O(E) {
    return e.exit(u.codeFenced), t(E);
  }
  function U(E, B, Q) {
    let F = 0;
    return ne;
    function ne(Z) {
      return k(V(Z), "expected eol"), E.enter(u.lineEnding), E.consume(Z), E.exit(u.lineEnding), G;
    }
    function G(Z) {
      return k(
        r.parser.constructs.disable.null,
        "expected `disable.null` to be populated"
      ), E.enter(u.codeFencedFence), me(Z) ? xe(
        E,
        X,
        u.linePrefix,
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : H.tabSize
      )(Z) : X(Z);
    }
    function X(Z) {
      return Z === s ? (E.enter(u.codeFencedFenceSequence), I(Z)) : Q(Z);
    }
    function I(Z) {
      return Z === s ? (F++, E.consume(Z), I) : F >= o ? (E.exit(u.codeFencedFenceSequence), me(Z) ? xe(E, P, u.whitespace)(Z) : P(Z)) : Q(Z);
    }
    function P(Z) {
      return Z === h.eof || V(Z) ? (E.exit(u.codeFencedFence), B(Z)) : Q(Z);
    }
  }
}
function bc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === h.eof ? n(o) : (k(V(o), "expected eol"), e.enter(u.lineEnding), e.consume(o), e.exit(u.lineEnding), a);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
const ir = {
  name: "codeIndented",
  tokenize: vc
}, _c = { partial: !0, tokenize: Rc };
function vc(e, t, n) {
  const r = this;
  return i;
  function i(d) {
    return k(me(d)), e.enter(u.codeIndented), xe(
      e,
      a,
      u.linePrefix,
      H.tabSize + 1
    )(d);
  }
  function a(d) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === u.linePrefix && l[2].sliceSerialize(l[1], !0).length >= H.tabSize ? o(d) : n(d);
  }
  function o(d) {
    return d === h.eof ? c(d) : V(d) ? e.attempt(_c, o, c)(d) : (e.enter(u.codeFlowValue), s(d));
  }
  function s(d) {
    return d === h.eof || V(d) ? (e.exit(u.codeFlowValue), o(d)) : (e.consume(d), s);
  }
  function c(d) {
    return e.exit(u.codeIndented), t(d);
  }
}
function Rc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : V(o) ? (e.enter(u.lineEnding), e.consume(o), e.exit(u.lineEnding), i) : xe(
      e,
      a,
      u.linePrefix,
      H.tabSize + 1
    )(o);
  }
  function a(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === u.linePrefix && s[2].sliceSerialize(s[1], !0).length >= H.tabSize ? t(o) : V(o) ? i(o) : n(o);
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
  if ((e[n][1].type === u.lineEnding || e[n][1].type === "space") && (e[t][1].type === u.lineEnding || e[t][1].type === "space")) {
    for (r = n; ++r < t; )
      if (e[r][1].type === u.codeTextData) {
        e[n][1].type = u.codeTextPadding, e[t][1].type = u.codeTextPadding, n += 2, t -= 2;
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    i === void 0 ? r !== t && e[r][1].type !== u.lineEnding && (i = r) : (r === t || e[r][1].type === u.lineEnding) && (e[i][1].type = u.codeTextData, r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function Da(e) {
  return e !== h.graveAccent || this.events[this.events.length - 1][1].type === u.characterEscape;
}
function Ac(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return s;
  function s(m) {
    return k(m === h.graveAccent, "expected `` ` ``"), k(Da.call(r, r.previous), "expected correct previous"), e.enter(u.codeText), e.enter(u.codeTextSequence), c(m);
  }
  function c(m) {
    return m === h.graveAccent ? (e.consume(m), i++, c) : (e.exit(u.codeTextSequence), d(m));
  }
  function d(m) {
    return m === h.eof ? n(m) : m === h.space ? (e.enter("space"), e.consume(m), e.exit("space"), d) : m === h.graveAccent ? (o = e.enter(u.codeTextSequence), a = 0, p(m)) : V(m) ? (e.enter(u.lineEnding), e.consume(m), e.exit(u.lineEnding), d) : (e.enter(u.codeTextData), l(m));
  }
  function l(m) {
    return m === h.eof || m === h.space || m === h.graveAccent || V(m) ? (e.exit(u.codeTextData), d(m)) : (e.consume(m), l);
  }
  function p(m) {
    return m === h.graveAccent ? (e.consume(m), a++, p) : a === i ? (e.exit(u.codeTextSequence), e.exit(u.codeText), t(m)) : (o.type = u.codeTextData, l(m));
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
  if (t.length < H.v8MaxSafeChunkSize)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(
        ...t.slice(n, n + H.v8MaxSafeChunkSize)
      ), n += H.v8MaxSafeChunkSize;
}
function Pa(e) {
  const t = {};
  let n = -1, r, i, a, o, s, c, d;
  const l = new Nc(e);
  for (; ++n < l.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = l.get(n), n && r[1].type === u.chunkFlow && l.get(n - 1)[1].type === u.listItemPrefix && (k(r[1]._tokenizer, "expected `_tokenizer` on subtokens"), c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === u.lineEndingBlank && (a += 2), a < c.length && c[a][1].type === u.content))
      for (; ++a < c.length && c[a][1].type !== u.content; )
        c[a][1].type === u.chunkText && (c[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, Lc(l, n)), n = t[n], d = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (o = l.get(a), o[1].type === u.lineEnding || o[1].type === u.lineEndingBlank)
          o[0] === "enter" && (i && (l.get(i)[1].type = u.lineEndingBlank), o[1].type = u.lineEnding, i = a);
        else if (!(o[1].type === u.linePrefix || o[1].type === u.listItemIndent)) break;
      i && (r[1].end = { ...l.get(i)[1].start }, s = l.slice(i, n), s.unshift(r), l.splice(i, n - i + 1, s));
    }
  }
  return _t(e, 0, Number.POSITIVE_INFINITY, l.slice(0)), !d;
}
function Lc(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  k(n.contentType, "expected `contentType` on subtokens");
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const s = o.events, c = [], d = {};
  let l, p, m = -1, g = n, T = 0, S = 0;
  const M = [S];
  for (; g; ) {
    for (; e.get(++i)[1] !== g; )
      ;
    k(
      !p || g.previous === p,
      "expected previous to match"
    ), k(!p || p.next === g, "expected next to match"), a.push(i), g._tokenizer || (l = r.sliceStream(g), g.next || l.push(h.eof), p && o.defineSkip(g.start), g._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(l), g._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), p = g, g = g.next;
  }
  for (g = n; ++m < s.length; )
    // Find a void token that includes a break.
    s[m][0] === "exit" && s[m - 1][0] === "enter" && s[m][1].type === s[m - 1][1].type && s[m][1].start.line !== s[m][1].end.line && (k(g, "expected a current token"), S = m + 1, M.push(S), g._tokenizer = void 0, g.previous = void 0, g = g.next);
  for (o.events = [], g ? (g._tokenizer = void 0, g.previous = void 0, k(!g.next, "expected no next token")) : M.pop(), m = M.length; m--; ) {
    const x = s.slice(M[m], M[m + 1]), v = a.pop();
    k(v !== void 0, "expected a start position when splicing"), c.push([v, v + x.length - 1]), e.splice(v, 2, x);
  }
  for (c.reverse(), m = -1; ++m < c.length; )
    d[T + c[m][0]] = T + c[m][1], T += c[m][1] - c[m][0] - 1;
  return d;
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
      s !== h.eof && !V(s),
      "expected no eof or eol"
    ), e.enter(u.content), n = e.enter(u.chunkContent, {
      contentType: H.contentTypeContent
    }), i(s);
  }
  function i(s) {
    return s === h.eof ? a(s) : V(s) ? e.check(
      Dc,
      o,
      a
    )(s) : (e.consume(s), i);
  }
  function a(s) {
    return e.exit(u.chunkContent), e.exit(u.content), t(s);
  }
  function o(s) {
    return k(V(s), "expected eol"), e.consume(s), e.exit(u.chunkContent), k(n, "expected previous token"), n.next = e.enter(u.chunkContent, {
      contentType: H.contentTypeContent,
      previous: n
    }), n = n.next, i;
  }
}
function Hc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return k(V(o), "expected a line ending"), e.exit(u.chunkContent), e.enter(u.lineEnding), e.consume(o), e.exit(u.lineEnding), xe(e, a, u.linePrefix);
  }
  function a(o) {
    if (o === h.eof || V(o))
      return n(o);
    k(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    );
    const s = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && s && s[1].type === u.linePrefix && s[2].sliceSerialize(s[1], !0).length >= H.tabSize ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function Fa(e, t, n, r, i, a, o, s, c) {
  const d = c || Number.POSITIVE_INFINITY;
  let l = 0;
  return p;
  function p(x) {
    return x === h.lessThan ? (e.enter(r), e.enter(i), e.enter(a), e.consume(x), e.exit(a), m) : x === h.eof || x === h.space || x === h.rightParenthesis || br(x) ? n(x) : (e.enter(r), e.enter(o), e.enter(s), e.enter(u.chunkString, { contentType: H.contentTypeString }), S(x));
  }
  function m(x) {
    return x === h.greaterThan ? (e.enter(a), e.consume(x), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter(u.chunkString, { contentType: H.contentTypeString }), g(x));
  }
  function g(x) {
    return x === h.greaterThan ? (e.exit(u.chunkString), e.exit(s), m(x)) : x === h.eof || x === h.lessThan || V(x) ? n(x) : (e.consume(x), x === h.backslash ? T : g);
  }
  function T(x) {
    return x === h.lessThan || x === h.greaterThan || x === h.backslash ? (e.consume(x), g) : g(x);
  }
  function S(x) {
    return !l && (x === h.eof || x === h.rightParenthesis || rt(x)) ? (e.exit(u.chunkString), e.exit(s), e.exit(o), e.exit(r), t(x)) : l < d && x === h.leftParenthesis ? (e.consume(x), l++, S) : x === h.rightParenthesis ? (e.consume(x), l--, S) : x === h.eof || x === h.space || x === h.leftParenthesis || br(x) ? n(x) : (e.consume(x), x === h.backslash ? M : S);
  }
  function M(x) {
    return x === h.leftParenthesis || x === h.rightParenthesis || x === h.backslash ? (e.consume(x), S) : S(x);
  }
}
function Ha(e, t, n, r, i, a) {
  const o = this;
  let s = 0, c;
  return d;
  function d(g) {
    return k(g === h.leftSquareBracket, "expected `[`"), e.enter(r), e.enter(i), e.consume(g), e.exit(i), e.enter(a), l;
  }
  function l(g) {
    return s > H.linkReferenceSizeMax || g === h.eof || g === h.leftSquareBracket || g === h.rightSquareBracket && !c || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    g === h.caret && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(g) : g === h.rightSquareBracket ? (e.exit(a), e.enter(i), e.consume(g), e.exit(i), e.exit(r), t) : V(g) ? (e.enter(u.lineEnding), e.consume(g), e.exit(u.lineEnding), l) : (e.enter(u.chunkString, { contentType: H.contentTypeString }), p(g));
  }
  function p(g) {
    return g === h.eof || g === h.leftSquareBracket || g === h.rightSquareBracket || V(g) || s++ > H.linkReferenceSizeMax ? (e.exit(u.chunkString), l(g)) : (e.consume(g), c || (c = !me(g)), g === h.backslash ? m : p);
  }
  function m(g) {
    return g === h.leftSquareBracket || g === h.backslash || g === h.rightSquareBracket ? (e.consume(g), s++, p) : p(g);
  }
}
function za(e, t, n, r, i, a) {
  let o;
  return s;
  function s(m) {
    return m === h.quotationMark || m === h.apostrophe || m === h.leftParenthesis ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), o = m === h.leftParenthesis ? h.rightParenthesis : m, c) : n(m);
  }
  function c(m) {
    return m === o ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), t) : (e.enter(a), d(m));
  }
  function d(m) {
    return m === o ? (e.exit(a), c(o)) : m === h.eof ? n(m) : V(m) ? (e.enter(u.lineEnding), e.consume(m), e.exit(u.lineEnding), xe(e, d, u.linePrefix)) : (e.enter(u.chunkString, { contentType: H.contentTypeString }), l(m));
  }
  function l(m) {
    return m === o || m === h.eof || V(m) ? (e.exit(u.chunkString), d(m)) : (e.consume(m), m === h.backslash ? p : l);
  }
  function p(m) {
    return m === o || m === h.backslash ? (e.consume(m), l) : l(m);
  }
}
function fn(e, t) {
  let n;
  return r;
  function r(i) {
    return V(i) ? (e.enter(u.lineEnding), e.consume(i), e.exit(u.lineEnding), n = !0, r) : me(i) ? xe(
      e,
      r,
      n ? u.linePrefix : u.lineSuffix
    )(i) : t(i);
  }
}
const zc = { name: "definition", tokenize: Bc }, Uc = { partial: !0, tokenize: Gc };
function Bc(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(g) {
    return e.enter(u.definition), o(g);
  }
  function o(g) {
    return k(g === h.leftSquareBracket, "expected `[`"), Ha.call(
      r,
      e,
      s,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      u.definitionLabel,
      u.definitionLabelMarker,
      u.definitionLabelString
    )(g);
  }
  function s(g) {
    return i = en(
      r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
    ), g === h.colon ? (e.enter(u.definitionMarker), e.consume(g), e.exit(u.definitionMarker), c) : n(g);
  }
  function c(g) {
    return rt(g) ? fn(e, d)(g) : d(g);
  }
  function d(g) {
    return Fa(
      e,
      l,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      u.definitionDestination,
      u.definitionDestinationLiteral,
      u.definitionDestinationLiteralMarker,
      u.definitionDestinationRaw,
      u.definitionDestinationString
    )(g);
  }
  function l(g) {
    return e.attempt(Uc, p, p)(g);
  }
  function p(g) {
    return me(g) ? xe(e, m, u.whitespace)(g) : m(g);
  }
  function m(g) {
    return g === h.eof || V(g) ? (e.exit(u.definition), r.parser.defined.push(i), t(g)) : n(g);
  }
}
function Gc(e, t, n) {
  return r;
  function r(s) {
    return rt(s) ? fn(e, i)(s) : n(s);
  }
  function i(s) {
    return za(
      e,
      a,
      n,
      u.definitionTitle,
      u.definitionTitleMarker,
      u.definitionTitleString
    )(s);
  }
  function a(s) {
    return me(s) ? xe(
      e,
      o,
      u.whitespace
    )(s) : o(s);
  }
  function o(s) {
    return s === h.eof || V(s) ? t(s) : n(s);
  }
}
const Vc = {
  name: "hardBreakEscape",
  tokenize: Wc
};
function Wc(e, t, n) {
  return r;
  function r(a) {
    return k(a === h.backslash, "expected `\\`"), e.enter(u.hardBreakEscape), e.consume(a), i;
  }
  function i(a) {
    return V(a) ? (e.exit(u.hardBreakEscape), t(a)) : n(a);
  }
}
const jc = {
  name: "headingAtx",
  resolve: $c,
  tokenize: qc
};
function $c(e, t) {
  let n = e.length - 2, r = 3, i, a;
  return e[r][1].type === u.whitespace && (r += 2), n - 2 > r && e[n][1].type === u.whitespace && (n -= 2), e[n][1].type === u.atxHeadingSequence && (r === n - 1 || n - 4 > r && e[n - 2][1].type === u.whitespace) && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: u.atxHeadingText,
    start: e[r][1].start,
    end: e[n][1].end
  }, a = {
    type: u.chunkText,
    start: e[r][1].start,
    end: e[n][1].end,
    contentType: H.contentTypeText
  }, _t(e, r, n - r + 1, [
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
    return e.enter(u.atxHeading), a(l);
  }
  function a(l) {
    return k(l === h.numberSign, "expected `#`"), e.enter(u.atxHeadingSequence), o(l);
  }
  function o(l) {
    return l === h.numberSign && r++ < H.atxHeadingOpeningFenceSizeMax ? (e.consume(l), o) : l === h.eof || rt(l) ? (e.exit(u.atxHeadingSequence), s(l)) : n(l);
  }
  function s(l) {
    return l === h.numberSign ? (e.enter(u.atxHeadingSequence), c(l)) : l === h.eof || V(l) ? (e.exit(u.atxHeading), t(l)) : me(l) ? xe(e, s, u.whitespace)(l) : (e.enter(u.atxHeadingText), d(l));
  }
  function c(l) {
    return l === h.numberSign ? (e.consume(l), c) : (e.exit(u.atxHeadingSequence), s(l));
  }
  function d(l) {
    return l === h.eof || l === h.numberSign || rt(l) ? (e.exit(u.atxHeadingText), s(l)) : (e.consume(l), d);
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
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === u.htmlFlow); )
    ;
  return t > 1 && e[t - 2][1].type === u.linePrefix && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Qc(e, t, n) {
  const r = this;
  let i, a, o, s, c;
  return d;
  function d(C) {
    return l(C);
  }
  function l(C) {
    return k(C === h.lessThan, "expected `<`"), e.enter(u.htmlFlow), e.enter(u.htmlFlowData), e.consume(C), p;
  }
  function p(C) {
    return C === h.exclamationMark ? (e.consume(C), m) : C === h.slash ? (e.consume(C), a = !0, S) : C === h.questionMark ? (e.consume(C), i = H.htmlInstruction, r.interrupt ? t : y) : bt(C) ? (k(C !== null), e.consume(C), o = String.fromCharCode(C), M) : n(C);
  }
  function m(C) {
    return C === h.dash ? (e.consume(C), i = H.htmlComment, g) : C === h.leftSquareBracket ? (e.consume(C), i = H.htmlCdata, s = 0, T) : bt(C) ? (e.consume(C), i = H.htmlDeclaration, r.interrupt ? t : y) : n(C);
  }
  function g(C) {
    return C === h.dash ? (e.consume(C), r.interrupt ? t : y) : n(C);
  }
  function T(C) {
    const Y = H.cdataOpeningString;
    return C === Y.charCodeAt(s++) ? (e.consume(C), s === Y.length ? r.interrupt ? t : X : T) : n(C);
  }
  function S(C) {
    return bt(C) ? (k(C !== null), e.consume(C), o = String.fromCharCode(C), M) : n(C);
  }
  function M(C) {
    if (C === h.eof || C === h.slash || C === h.greaterThan || rt(C)) {
      const Y = C === h.slash, q = o.toLowerCase();
      return !Y && !a && Li.includes(q) ? (i = H.htmlRaw, r.interrupt ? t(C) : X(C)) : Zc.includes(o.toLowerCase()) ? (i = H.htmlBasic, Y ? (e.consume(C), x) : r.interrupt ? t(C) : X(C)) : (i = H.htmlComplete, r.interrupt && !r.parser.lazy[r.now().line] ? n(C) : a ? v(C) : D(C));
    }
    return C === h.dash || lt(C) ? (e.consume(C), o += String.fromCharCode(C), M) : n(C);
  }
  function x(C) {
    return C === h.greaterThan ? (e.consume(C), r.interrupt ? t : X) : n(C);
  }
  function v(C) {
    return me(C) ? (e.consume(C), v) : ne(C);
  }
  function D(C) {
    return C === h.slash ? (e.consume(C), ne) : C === h.colon || C === h.underscore || bt(C) ? (e.consume(C), O) : me(C) ? (e.consume(C), D) : ne(C);
  }
  function O(C) {
    return C === h.dash || C === h.dot || C === h.colon || C === h.underscore || lt(C) ? (e.consume(C), O) : U(C);
  }
  function U(C) {
    return C === h.equalsTo ? (e.consume(C), E) : me(C) ? (e.consume(C), U) : D(C);
  }
  function E(C) {
    return C === h.eof || C === h.lessThan || C === h.equalsTo || C === h.greaterThan || C === h.graveAccent ? n(C) : C === h.quotationMark || C === h.apostrophe ? (e.consume(C), c = C, B) : me(C) ? (e.consume(C), E) : Q(C);
  }
  function B(C) {
    return C === c ? (e.consume(C), c = null, F) : C === h.eof || V(C) ? n(C) : (e.consume(C), B);
  }
  function Q(C) {
    return C === h.eof || C === h.quotationMark || C === h.apostrophe || C === h.slash || C === h.lessThan || C === h.equalsTo || C === h.greaterThan || C === h.graveAccent || rt(C) ? U(C) : (e.consume(C), Q);
  }
  function F(C) {
    return C === h.slash || C === h.greaterThan || me(C) ? D(C) : n(C);
  }
  function ne(C) {
    return C === h.greaterThan ? (e.consume(C), G) : n(C);
  }
  function G(C) {
    return C === h.eof || V(C) ? X(C) : me(C) ? (e.consume(C), G) : n(C);
  }
  function X(C) {
    return C === h.dash && i === H.htmlComment ? (e.consume(C), re) : C === h.lessThan && i === H.htmlRaw ? (e.consume(C), se) : C === h.greaterThan && i === H.htmlDeclaration ? (e.consume(C), ie) : C === h.questionMark && i === H.htmlInstruction ? (e.consume(C), y) : C === h.rightSquareBracket && i === H.htmlCdata ? (e.consume(C), ye) : V(C) && (i === H.htmlBasic || i === H.htmlComplete) ? (e.exit(u.htmlFlowData), e.check(
      Xc,
      ue,
      I
    )(C)) : C === h.eof || V(C) ? (e.exit(u.htmlFlowData), I(C)) : (e.consume(C), X);
  }
  function I(C) {
    return e.check(
      Yc,
      P,
      ue
    )(C);
  }
  function P(C) {
    return k(V(C)), e.enter(u.lineEnding), e.consume(C), e.exit(u.lineEnding), Z;
  }
  function Z(C) {
    return C === h.eof || V(C) ? I(C) : (e.enter(u.htmlFlowData), X(C));
  }
  function re(C) {
    return C === h.dash ? (e.consume(C), y) : X(C);
  }
  function se(C) {
    return C === h.slash ? (e.consume(C), o = "", Ce) : X(C);
  }
  function Ce(C) {
    if (C === h.greaterThan) {
      const Y = o.toLowerCase();
      return Li.includes(Y) ? (e.consume(C), ie) : X(C);
    }
    return bt(C) && o.length < H.htmlRawSizeMax ? (k(C !== null), e.consume(C), o += String.fromCharCode(C), Ce) : X(C);
  }
  function ye(C) {
    return C === h.rightSquareBracket ? (e.consume(C), y) : X(C);
  }
  function y(C) {
    return C === h.greaterThan ? (e.consume(C), ie) : C === h.dash && i === H.htmlComment ? (e.consume(C), y) : X(C);
  }
  function ie(C) {
    return C === h.eof || V(C) ? (e.exit(u.htmlFlowData), ue(C)) : (e.consume(C), ie);
  }
  function ue(C) {
    return e.exit(u.htmlFlow), t(C);
  }
}
function eu(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return V(o) ? (e.enter(u.lineEnding), e.consume(o), e.exit(u.lineEnding), a) : n(o);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function tu(e, t, n) {
  return r;
  function r(i) {
    return k(V(i), "expected a line ending"), e.enter(u.lineEnding), e.consume(i), e.exit(u.lineEnding), e.attempt(Gn, t, n);
  }
}
const nu = { name: "htmlText", tokenize: ru };
function ru(e, t, n) {
  const r = this;
  let i, a, o;
  return s;
  function s(y) {
    return k(y === h.lessThan, "expected `<`"), e.enter(u.htmlText), e.enter(u.htmlTextData), e.consume(y), c;
  }
  function c(y) {
    return y === h.exclamationMark ? (e.consume(y), d) : y === h.slash ? (e.consume(y), U) : y === h.questionMark ? (e.consume(y), D) : bt(y) ? (e.consume(y), Q) : n(y);
  }
  function d(y) {
    return y === h.dash ? (e.consume(y), l) : y === h.leftSquareBracket ? (e.consume(y), a = 0, T) : bt(y) ? (e.consume(y), v) : n(y);
  }
  function l(y) {
    return y === h.dash ? (e.consume(y), g) : n(y);
  }
  function p(y) {
    return y === h.eof ? n(y) : y === h.dash ? (e.consume(y), m) : V(y) ? (o = p, se(y)) : (e.consume(y), p);
  }
  function m(y) {
    return y === h.dash ? (e.consume(y), g) : p(y);
  }
  function g(y) {
    return y === h.greaterThan ? re(y) : y === h.dash ? m(y) : p(y);
  }
  function T(y) {
    const ie = H.cdataOpeningString;
    return y === ie.charCodeAt(a++) ? (e.consume(y), a === ie.length ? S : T) : n(y);
  }
  function S(y) {
    return y === h.eof ? n(y) : y === h.rightSquareBracket ? (e.consume(y), M) : V(y) ? (o = S, se(y)) : (e.consume(y), S);
  }
  function M(y) {
    return y === h.rightSquareBracket ? (e.consume(y), x) : S(y);
  }
  function x(y) {
    return y === h.greaterThan ? re(y) : y === h.rightSquareBracket ? (e.consume(y), x) : S(y);
  }
  function v(y) {
    return y === h.eof || y === h.greaterThan ? re(y) : V(y) ? (o = v, se(y)) : (e.consume(y), v);
  }
  function D(y) {
    return y === h.eof ? n(y) : y === h.questionMark ? (e.consume(y), O) : V(y) ? (o = D, se(y)) : (e.consume(y), D);
  }
  function O(y) {
    return y === h.greaterThan ? re(y) : D(y);
  }
  function U(y) {
    return bt(y) ? (e.consume(y), E) : n(y);
  }
  function E(y) {
    return y === h.dash || lt(y) ? (e.consume(y), E) : B(y);
  }
  function B(y) {
    return V(y) ? (o = B, se(y)) : me(y) ? (e.consume(y), B) : re(y);
  }
  function Q(y) {
    return y === h.dash || lt(y) ? (e.consume(y), Q) : y === h.slash || y === h.greaterThan || rt(y) ? F(y) : n(y);
  }
  function F(y) {
    return y === h.slash ? (e.consume(y), re) : y === h.colon || y === h.underscore || bt(y) ? (e.consume(y), ne) : V(y) ? (o = F, se(y)) : me(y) ? (e.consume(y), F) : re(y);
  }
  function ne(y) {
    return y === h.dash || y === h.dot || y === h.colon || y === h.underscore || lt(y) ? (e.consume(y), ne) : G(y);
  }
  function G(y) {
    return y === h.equalsTo ? (e.consume(y), X) : V(y) ? (o = G, se(y)) : me(y) ? (e.consume(y), G) : F(y);
  }
  function X(y) {
    return y === h.eof || y === h.lessThan || y === h.equalsTo || y === h.greaterThan || y === h.graveAccent ? n(y) : y === h.quotationMark || y === h.apostrophe ? (e.consume(y), i = y, I) : V(y) ? (o = X, se(y)) : me(y) ? (e.consume(y), X) : (e.consume(y), P);
  }
  function I(y) {
    return y === i ? (e.consume(y), i = void 0, Z) : y === h.eof ? n(y) : V(y) ? (o = I, se(y)) : (e.consume(y), I);
  }
  function P(y) {
    return y === h.eof || y === h.quotationMark || y === h.apostrophe || y === h.lessThan || y === h.equalsTo || y === h.graveAccent ? n(y) : y === h.slash || y === h.greaterThan || rt(y) ? F(y) : (e.consume(y), P);
  }
  function Z(y) {
    return y === h.slash || y === h.greaterThan || rt(y) ? F(y) : n(y);
  }
  function re(y) {
    return y === h.greaterThan ? (e.consume(y), e.exit(u.htmlTextData), e.exit(u.htmlText), t) : n(y);
  }
  function se(y) {
    return k(o, "expected return state"), k(V(y), "expected eol"), e.exit(u.htmlTextData), e.enter(u.lineEnding), e.consume(y), e.exit(u.lineEnding), Ce;
  }
  function Ce(y) {
    return k(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), me(y) ? xe(
      e,
      ye,
      u.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : H.tabSize
    )(y) : ye(y);
  }
  function ye(y) {
    return e.enter(u.htmlTextData), o(y);
  }
}
const Vr = {
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
    if (n.push(e[t]), r.type === u.labelImage || r.type === u.labelLink || r.type === u.labelEnd) {
      const i = r.type === u.labelImage ? 4 : 2;
      r.type = u.data, t += i;
    }
  }
  return e.length !== n.length && _t(e, 0, e.length, n), e;
}
function lu(e, t) {
  let n = e.length, r = 0, i, a, o, s;
  for (; n--; )
    if (i = e[n][1], a) {
      if (i.type === u.link || i.type === u.labelLink && i._inactive)
        break;
      e[n][0] === "enter" && i.type === u.labelLink && (i._inactive = !0);
    } else if (o) {
      if (e[n][0] === "enter" && (i.type === u.labelImage || i.type === u.labelLink) && !i._balanced && (a = n, i.type !== u.labelLink)) {
        r = 2;
        break;
      }
    } else i.type === u.labelEnd && (o = n);
  k(a !== void 0, "`open` is supposed to be found"), k(o !== void 0, "`close` is supposed to be found");
  const c = {
    type: e[a][1].type === u.labelLink ? u.link : u.image,
    start: { ...e[a][1].start },
    end: { ...e[e.length - 1][1].end }
  }, d = {
    type: u.label,
    start: { ...e[a][1].start },
    end: { ...e[o][1].end }
  }, l = {
    type: u.labelText,
    start: { ...e[a + r + 2][1].end },
    end: { ...e[o - 2][1].start }
  };
  return s = [
    ["enter", c, t],
    ["enter", d, t]
  ], s = dt(s, e.slice(a + 1, a + r + 3)), s = dt(s, [["enter", l, t]]), k(
    t.parser.constructs.insideSpan.null,
    "expected `insideSpan.null` to be populated"
  ), s = dt(
    s,
    Gr(
      t.parser.constructs.insideSpan.null,
      e.slice(a + r + 4, o - 3),
      t
    )
  ), s = dt(s, [
    ["exit", l, t],
    e[o - 2],
    e[o - 1],
    ["exit", d, t]
  ]), s = dt(s, e.slice(o + 1)), s = dt(s, [["exit", c, t]]), _t(e, a, e.length, s), e;
}
function cu(e, t, n) {
  const r = this;
  let i = r.events.length, a, o;
  for (; i--; )
    if ((r.events[i][1].type === u.labelImage || r.events[i][1].type === u.labelLink) && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return s;
  function s(m) {
    return k(m === h.rightSquareBracket, "expected `]`"), a ? a._inactive ? p(m) : (o = r.parser.defined.includes(
      en(
        r.sliceSerialize({ start: a.end, end: r.now() })
      )
    ), e.enter(u.labelEnd), e.enter(u.labelMarker), e.consume(m), e.exit(u.labelMarker), e.exit(u.labelEnd), c) : n(m);
  }
  function c(m) {
    return m === h.leftParenthesis ? e.attempt(
      iu,
      l,
      o ? l : p
    )(m) : m === h.leftSquareBracket ? e.attempt(
      au,
      l,
      o ? d : p
    )(m) : o ? l(m) : p(m);
  }
  function d(m) {
    return e.attempt(
      ou,
      l,
      p
    )(m);
  }
  function l(m) {
    return t(m);
  }
  function p(m) {
    return a._balanced = !0, n(m);
  }
}
function uu(e, t, n) {
  return r;
  function r(p) {
    return k(p === h.leftParenthesis, "expected left paren"), e.enter(u.resource), e.enter(u.resourceMarker), e.consume(p), e.exit(u.resourceMarker), i;
  }
  function i(p) {
    return rt(p) ? fn(e, a)(p) : a(p);
  }
  function a(p) {
    return p === h.rightParenthesis ? l(p) : Fa(
      e,
      o,
      s,
      u.resourceDestination,
      u.resourceDestinationLiteral,
      u.resourceDestinationLiteralMarker,
      u.resourceDestinationRaw,
      u.resourceDestinationString,
      H.linkResourceDestinationBalanceMax
    )(p);
  }
  function o(p) {
    return rt(p) ? fn(e, c)(p) : l(p);
  }
  function s(p) {
    return n(p);
  }
  function c(p) {
    return p === h.quotationMark || p === h.apostrophe || p === h.leftParenthesis ? za(
      e,
      d,
      n,
      u.resourceTitle,
      u.resourceTitleMarker,
      u.resourceTitleString
    )(p) : l(p);
  }
  function d(p) {
    return rt(p) ? fn(e, l)(p) : l(p);
  }
  function l(p) {
    return p === h.rightParenthesis ? (e.enter(u.resourceMarker), e.consume(p), e.exit(u.resourceMarker), e.exit(u.resource), t) : n(p);
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
      u.reference,
      u.referenceMarker,
      u.referenceString
    )(s);
  }
  function a(s) {
    return r.parser.defined.includes(
      en(
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
    return k(a === h.leftSquareBracket, "expected left bracket"), e.enter(u.reference), e.enter(u.referenceMarker), e.consume(a), e.exit(u.referenceMarker), i;
  }
  function i(a) {
    return a === h.rightSquareBracket ? (e.enter(u.referenceMarker), e.consume(a), e.exit(u.referenceMarker), e.exit(u.reference), t) : n(a);
  }
}
const pu = {
  name: "labelStartImage",
  resolveAll: Vr.resolveAll,
  tokenize: fu
};
function fu(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return k(s === h.exclamationMark, "expected `!`"), e.enter(u.labelImage), e.enter(u.labelImageMarker), e.consume(s), e.exit(u.labelImageMarker), a;
  }
  function a(s) {
    return s === h.leftSquareBracket ? (e.enter(u.labelMarker), e.consume(s), e.exit(u.labelMarker), e.exit(u.labelImage), o) : n(s);
  }
  function o(s) {
    return s === h.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : t(s);
  }
}
const gu = {
  name: "labelStartLink",
  resolveAll: Vr.resolveAll,
  tokenize: mu
};
function mu(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return k(o === h.leftSquareBracket, "expected `[`"), e.enter(u.labelLink), e.enter(u.labelMarker), e.consume(o), e.exit(u.labelMarker), e.exit(u.labelLink), a;
  }
  function a(o) {
    return o === h.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const ar = { name: "lineEnding", tokenize: Cu };
function Cu(e, t) {
  return n;
  function n(r) {
    return k(V(r), "expected eol"), e.enter(u.lineEnding), e.consume(r), e.exit(u.lineEnding), xe(e, t, u.linePrefix);
  }
}
const Ln = {
  name: "thematicBreak",
  tokenize: yu
};
function yu(e, t, n) {
  let r = 0, i;
  return a;
  function a(d) {
    return e.enter(u.thematicBreak), o(d);
  }
  function o(d) {
    return k(
      d === h.asterisk || d === h.dash || d === h.underscore,
      "expected `*`, `-`, or `_`"
    ), i = d, s(d);
  }
  function s(d) {
    return d === i ? (e.enter(u.thematicBreakSequence), c(d)) : r >= H.thematicBreakMarkerCountMin && (d === h.eof || V(d)) ? (e.exit(u.thematicBreak), t(d)) : n(d);
  }
  function c(d) {
    return d === i ? (e.consume(d), r++, c) : (e.exit(u.thematicBreakSequence), me(d) ? xe(e, s, u.whitespace)(d) : s(d));
  }
}
const nt = {
  continuation: { tokenize: Tu },
  exit: Eu,
  name: "list",
  tokenize: Su
}, wu = {
  partial: !0,
  tokenize: bu
}, ku = { partial: !0, tokenize: xu };
function Su(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === u.linePrefix ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return s;
  function s(g) {
    k(r.containerState, "expected state");
    const T = r.containerState.type || (g === h.asterisk || g === h.plusSign || g === h.dash ? u.listUnordered : u.listOrdered);
    if (T === u.listUnordered ? !r.containerState.marker || g === r.containerState.marker : _r(g)) {
      if (r.containerState.type || (r.containerState.type = T, e.enter(T, { _container: !0 })), T === u.listUnordered)
        return e.enter(u.listItemPrefix), g === h.asterisk || g === h.dash ? e.check(Ln, n, d)(g) : d(g);
      if (!r.interrupt || g === h.digit1)
        return e.enter(u.listItemPrefix), e.enter(u.listItemValue), c(g);
    }
    return n(g);
  }
  function c(g) {
    return k(r.containerState, "expected state"), _r(g) && ++o < H.listItemValueSizeMax ? (e.consume(g), c) : (!r.interrupt || o < 2) && (r.containerState.marker ? g === r.containerState.marker : g === h.rightParenthesis || g === h.dot) ? (e.exit(u.listItemValue), d(g)) : n(g);
  }
  function d(g) {
    return k(r.containerState, "expected state"), k(g !== h.eof, "eof (`null`) is not a marker"), e.enter(u.listItemMarker), e.consume(g), e.exit(u.listItemMarker), r.containerState.marker = r.containerState.marker || g, e.check(
      Gn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : l,
      e.attempt(
        wu,
        m,
        p
      )
    );
  }
  function l(g) {
    return k(r.containerState, "expected state"), r.containerState.initialBlankLine = !0, a++, m(g);
  }
  function p(g) {
    return me(g) ? (e.enter(u.listItemPrefixWhitespace), e.consume(g), e.exit(u.listItemPrefixWhitespace), m) : n(g);
  }
  function m(g) {
    return k(r.containerState, "expected state"), r.containerState.size = a + r.sliceSerialize(e.exit(u.listItemPrefix), !0).length, t(g);
  }
}
function Tu(e, t, n) {
  const r = this;
  return k(r.containerState, "expected state"), r.containerState._closeFlow = void 0, e.check(Gn, i, a);
  function i(s) {
    return k(r.containerState, "expected state"), k(typeof r.containerState.size == "number", "expected size"), r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, xe(
      e,
      t,
      u.listItemIndent,
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
      e.attempt(nt, t, n),
      u.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : H.tabSize
    )(s);
  }
}
function xu(e, t, n) {
  const r = this;
  return k(r.containerState, "expected state"), k(typeof r.containerState.size == "number", "expected size"), xe(
    e,
    i,
    u.listItemIndent,
    r.containerState.size + 1
  );
  function i(a) {
    k(r.containerState, "expected state");
    const o = r.events[r.events.length - 1];
    return o && o[1].type === u.listItemIndent && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function Eu(e) {
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
    u.listItemPrefixWhitespace,
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : H.tabSize + 1
  );
  function i(a) {
    const o = r.events[r.events.length - 1];
    return !me(a) && o && o[1].type === u.listItemPrefixWhitespace ? t(a) : n(a);
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
      if (e[n][1].type === u.content) {
        r = n;
        break;
      }
      e[n][1].type === u.paragraph && (i = n);
    } else
      e[n][1].type === u.content && e.splice(n, 1), !a && e[n][1].type === u.definition && (a = n);
  k(i !== void 0, "expected a `text` index to be found"), k(r !== void 0, "expected a `text` index to be found"), k(e[r][2] === t, "enter context should be same"), k(
    e[e.length - 1][2] === t,
    "enter context should be same"
  );
  const o = {
    type: u.setextHeading,
    start: { ...e[r][1].start },
    end: { ...e[e.length - 1][1].end }
  };
  return e[i][1].type = u.setextHeadingText, a ? (e.splice(i, 0, ["enter", o, t]), e.splice(a + 1, 0, ["exit", e[r][1], t]), e[r][1].end = { ...e[a][1].end }) : e[r][1] = o, e.push(["exit", o, t]), e;
}
function vu(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(d) {
    let l = r.events.length, p;
    for (k(
      d === h.dash || d === h.equalsTo,
      "expected `=` or `-`"
    ); l--; )
      if (r.events[l][1].type !== u.lineEnding && r.events[l][1].type !== u.linePrefix && r.events[l][1].type !== u.content) {
        p = r.events[l][1].type === u.paragraph;
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || p) ? (e.enter(u.setextHeadingLine), i = d, o(d)) : n(d);
  }
  function o(d) {
    return e.enter(u.setextHeadingLineSequence), s(d);
  }
  function s(d) {
    return d === i ? (e.consume(d), s) : (e.exit(u.setextHeadingLineSequence), me(d) ? xe(e, c, u.lineSuffix)(d) : c(d));
  }
  function c(d) {
    return d === h.eof || V(d) ? (e.exit(u.setextHeadingLine), t(d)) : n(d);
  }
}
const Ru = { tokenize: Iu };
function Iu(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    Gn,
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
        u.linePrefix
      )
    )
  );
  return n;
  function r(a) {
    if (k(
      a === h.eof || V(a),
      "expected eol or eof"
    ), a === h.eof) {
      e.consume(a);
      return;
    }
    return e.enter(u.lineEndingBlank), e.consume(a), e.exit(u.lineEndingBlank), t.currentConstruct = void 0, n;
  }
  function i(a) {
    if (k(
      a === h.eof || V(a),
      "expected eol or eof"
    ), a === h.eof) {
      e.consume(a);
      return;
    }
    return e.enter(u.lineEnding), e.consume(a), e.exit(u.lineEnding), t.currentConstruct = void 0, n;
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
      return d(l) ? a(l) : s(l);
    }
    function s(l) {
      if (l === h.eof) {
        n.consume(l);
        return;
      }
      return n.enter(u.data), n.consume(l), c;
    }
    function c(l) {
      return d(l) ? (n.exit(u.data), a(l)) : (n.consume(l), c);
    }
    function d(l) {
      if (l === h.eof)
        return !0;
      const p = i[l];
      let m = -1;
      if (p)
        for (k(Array.isArray(p), "expected `disable.null` to be populated"); ++m < p.length; ) {
          const g = p[m];
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
      a === void 0 ? n[i] && n[i][1].type === u.data && (a = i, i++) : (!n[i] || n[i][1].type !== u.data) && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function Lu(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === u.lineEnding) && e[n - 1][1].type === u.data) {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let a = i.length, o = -1, s = 0, c;
      for (; a--; ) {
        const d = i[a];
        if (typeof d == "string") {
          for (o = d.length; d.charCodeAt(o - 1) === h.space; )
            s++, o--;
          if (o) break;
          o = -1;
        } else if (d === h.horizontalTab)
          c = !0, s++;
        else if (d !== h.virtualSpace) {
          a++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (s = 0), s) {
        const d = {
          type: n === e.length || c || s < H.hardBreakPrefixSizeMin ? u.lineSuffix : u.hardBreakTrailing,
          start: {
            _bufferIndex: a ? o : r.start._bufferIndex + o,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - s,
            offset: r.end.offset - s
          },
          end: { ...r.end }
        };
        r.end = { ...d.start }, r.start.offset === r.end.offset ? Object.assign(r, d) : (e.splice(
          n,
          0,
          ["enter", d, t],
          ["exit", d, t]
        ), n += 2);
      }
      n++;
    }
  return e;
}
const Ou = {
  [h.asterisk]: nt,
  [h.plusSign]: nt,
  [h.dash]: nt,
  [h.digit0]: nt,
  [h.digit1]: nt,
  [h.digit2]: nt,
  [h.digit3]: nt,
  [h.digit4]: nt,
  [h.digit5]: nt,
  [h.digit6]: nt,
  [h.digit7]: nt,
  [h.digit8]: nt,
  [h.digit9]: nt,
  [h.greaterThan]: Na
}, Du = {
  [h.leftSquareBracket]: zc
}, Pu = {
  [h.horizontalTab]: ir,
  [h.virtualSpace]: ir,
  [h.space]: ir
}, Fu = {
  [h.numberSign]: jc,
  [h.asterisk]: Ln,
  [h.dash]: [Oi, Ln],
  [h.lessThan]: Kc,
  [h.equalsTo]: Oi,
  [h.underscore]: Ln,
  [h.graveAccent]: Ni,
  [h.tilde]: Ni
}, Hu = {
  [h.ampersand]: Oa,
  [h.backslash]: La
}, zu = {
  [h.carriageReturn]: ar,
  [h.lineFeed]: ar,
  [h.carriageReturnLineFeed]: ar,
  [h.exclamationMark]: pu,
  [h.ampersand]: Oa,
  [h.asterisk]: vr,
  [h.lessThan]: [mc, nu],
  [h.leftSquareBracket]: gu,
  [h.backslash]: [Vc, La],
  [h.rightSquareBracket]: Vr,
  [h.underscore]: vr,
  [h.graveAccent]: Ic
}, Uu = { null: [vr, Mu] }, Bu = { null: [h.asterisk, h.underscore] }, Gu = { null: [] }, Vu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
var Rr = { exports: {} }, or, Di;
function Wu() {
  if (Di) return or;
  Di = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, a = r * 365.25;
  or = function(l, p) {
    p = p || {};
    var m = typeof l;
    if (m === "string" && l.length > 0)
      return o(l);
    if (m === "number" && isFinite(l))
      return p.long ? c(l) : s(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function o(l) {
    if (l = String(l), !(l.length > 100)) {
      var p = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (p) {
        var m = parseFloat(p[1]), g = (p[2] || "ms").toLowerCase();
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
    var p = Math.abs(l);
    return p >= r ? Math.round(l / r) + "d" : p >= n ? Math.round(l / n) + "h" : p >= t ? Math.round(l / t) + "m" : p >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function c(l) {
    var p = Math.abs(l);
    return p >= r ? d(l, p, r, "day") : p >= n ? d(l, p, n, "hour") : p >= t ? d(l, p, t, "minute") : p >= e ? d(l, p, e, "second") : l + " ms";
  }
  function d(l, p, m, g) {
    var T = p >= m * 1.5;
    return Math.round(l / m) + " " + g + (T ? "s" : "");
  }
  return or;
}
function ju(e) {
  n.debug = n, n.default = n, n.coerce = c, n.disable = o, n.enable = i, n.enabled = s, n.humanize = Wu(), n.destroy = d, Object.keys(e).forEach((l) => {
    n[l] = e[l];
  }), n.names = [], n.skips = [], n.formatters = {};
  function t(l) {
    let p = 0;
    for (let m = 0; m < l.length; m++)
      p = (p << 5) - p + l.charCodeAt(m), p |= 0;
    return n.colors[Math.abs(p) % n.colors.length];
  }
  n.selectColor = t;
  function n(l) {
    let p, m = null, g, T;
    function S(...M) {
      if (!S.enabled)
        return;
      const x = S, v = Number(/* @__PURE__ */ new Date()), D = v - (p || v);
      x.diff = D, x.prev = p, x.curr = v, p = v, M[0] = n.coerce(M[0]), typeof M[0] != "string" && M.unshift("%O");
      let O = 0;
      M[0] = M[0].replace(/%([a-zA-Z%])/g, (E, B) => {
        if (E === "%%")
          return "%";
        O++;
        const Q = n.formatters[B];
        if (typeof Q == "function") {
          const F = M[O];
          E = Q.call(x, F), M.splice(O, 1), O--;
        }
        return E;
      }), n.formatArgs.call(x, M), (x.log || n.log).apply(x, M);
    }
    return S.namespace = l, S.useColors = n.useColors(), S.color = n.selectColor(l), S.extend = r, S.destroy = n.destroy, Object.defineProperty(S, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => m !== null ? m : (g !== n.namespaces && (g = n.namespaces, T = n.enabled(l)), T),
      set: (M) => {
        m = M;
      }
    }), typeof n.init == "function" && n.init(S), S;
  }
  function r(l, p) {
    const m = n(this.namespace + (typeof p > "u" ? ":" : p) + l);
    return m.log = this.log, m;
  }
  function i(l) {
    n.save(l), n.namespaces = l, n.names = [], n.skips = [];
    const p = (typeof l == "string" ? l : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
    for (const m of p)
      m[0] === "-" ? n.skips.push(m.slice(1)) : n.names.push(m);
  }
  function a(l, p) {
    let m = 0, g = 0, T = -1, S = 0;
    for (; m < l.length; )
      if (g < p.length && (p[g] === l[m] || p[g] === "*"))
        p[g] === "*" ? (T = g, S = m, g++) : (m++, g++);
      else if (T !== -1)
        g = T + 1, S++, m = S;
      else
        return !1;
    for (; g < p.length && p[g] === "*"; )
      g++;
    return g === p.length;
  }
  function o() {
    const l = [
      ...n.names,
      ...n.skips.map((p) => "-" + p)
    ].join(",");
    return n.enable(""), l;
  }
  function s(l) {
    for (const p of n.skips)
      if (a(l, p))
        return !1;
    for (const p of n.names)
      if (a(l, p))
        return !0;
    return !1;
  }
  function c(l) {
    return l instanceof Error ? l.stack || l.message : l;
  }
  function d() {
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
    const d = "color: " + this.color;
    c.splice(1, 0, d, "color: inherit");
    let l = 0, p = 0;
    c[0].replace(/%[a-zA-Z%]/g, (m) => {
      m !== "%%" && (l++, m === "%c" && (p = l));
    }), c.splice(p, 0, d);
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
    } catch (d) {
      return "[UnexpectedJSONParseError]: " + d.message;
    }
  };
})(Rr, Rr.exports);
var qu = Rr.exports;
const Zu = /* @__PURE__ */ Dr(qu), jt = Zu("micromark");
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
  const d = {
    attempt: F(B),
    check: F(Q),
    consume: O,
    enter: U,
    exit: E,
    interrupt: F(Q, { interrupt: !0 })
  }, l = {
    code: h.eof,
    containerState: {},
    defineSkip: x,
    events: [],
    now: M,
    parser: e,
    previous: h.eof,
    sliceSerialize: T,
    sliceStream: S,
    write: g
  };
  let p = t.tokenize.call(l, d), m;
  return t.resolveAll && a.push(t), l;
  function g(I) {
    return o = dt(o, I), v(), o[o.length - 1] !== h.eof ? [] : (ne(t, 0), l.events = Gr(a, l.events, l), l.events);
  }
  function T(I, P) {
    return Yu(S(I), P);
  }
  function S(I) {
    return Xu(o, I);
  }
  function M() {
    const { _bufferIndex: I, _index: P, line: Z, column: re, offset: se } = r;
    return { _bufferIndex: I, _index: P, line: Z, column: re, offset: se };
  }
  function x(I) {
    i[I.line] = I.column, X(), jt("position: define skip: `%j`", r);
  }
  function v() {
    let I;
    for (; r._index < o.length; ) {
      const P = o[r._index];
      if (typeof P == "string")
        for (I = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === I && r._bufferIndex < P.length; )
          D(P.charCodeAt(r._bufferIndex));
      else
        D(P);
    }
  }
  function D(I) {
    k(c === !0, "expected character to be consumed"), c = void 0, jt("main: passing `%s` to %s", I, p && p.name), m = I, k(typeof p == "function", "expected state"), p = p(I);
  }
  function O(I) {
    k(I === m, "expected given code to equal expected code"), jt("consume: `%s`", I), k(
      c === void 0,
      "expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used"
    ), k(
      I === null ? l.events.length === 0 || l.events[l.events.length - 1][0] === "exit" : l.events[l.events.length - 1][0] === "enter",
      "expected last token to be open"
    ), V(I) ? (r.line++, r.column = 1, r.offset += I === h.carriageReturnLineFeed ? 2 : 1, X(), jt("position: after eol: `%j`", r)) : I !== h.virtualSpace && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = I, c = !0;
  }
  function U(I, P) {
    const Z = P || {};
    return Z.type = I, Z.start = M(), k(typeof I == "string", "expected string type"), k(I.length > 0, "expected non-empty string"), jt("enter: `%s`", I), l.events.push(["enter", Z, l]), s.push(Z), Z;
  }
  function E(I) {
    k(typeof I == "string", "expected string type"), k(I.length > 0, "expected non-empty string");
    const P = s.pop();
    return k(P, "cannot close w/o open tokens"), P.end = M(), k(I === P.type, "expected exit token to match current token"), k(
      !(P.start._index === P.end._index && P.start._bufferIndex === P.end._bufferIndex),
      "expected non-empty token (`" + I + "`)"
    ), jt("exit: `%s`", P.type), l.events.push(["exit", P, l]), P;
  }
  function B(I, P) {
    ne(I, P.from);
  }
  function Q(I, P) {
    P.restore();
  }
  function F(I, P) {
    return Z;
    function Z(re, se, Ce) {
      let ye, y, ie, ue;
      return Array.isArray(re) ? (
        /* c8 ignore next 1 */
        Y(re)
      ) : "tokenize" in re ? (
        // Looks like a construct.
        Y([
          /** @type {Construct} */
          re
        ])
      ) : C(re);
      function C(J) {
        return pe;
        function pe(ae) {
          const ke = ae !== null && J[ae], De = ae !== null && J.null, Ee = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(ke) ? ke : ke ? [ke] : [],
            ...Array.isArray(De) ? De : De ? [De] : []
          ];
          return Y(Ee)(ae);
        }
      }
      function Y(J) {
        return ye = J, y = 0, J.length === 0 ? (k(Ce, "expected `bogusState` to be given"), Ce) : q(J[y]);
      }
      function q(J) {
        return pe;
        function pe(ae) {
          return ue = G(), ie = J, J.partial || (l.currentConstruct = J), k(
            l.parser.constructs.disable.null,
            "expected `disable.null` to be populated"
          ), J.name && l.parser.constructs.disable.null.includes(J.name) ? fe(ae) : J.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            P ? Object.assign(Object.create(l), P) : l,
            d,
            ce,
            fe
          )(ae);
        }
      }
      function ce(J) {
        return k(J === m, "expected code"), c = !0, I(ie, ue), se;
      }
      function fe(J) {
        return k(J === m, "expected code"), c = !0, ue.restore(), ++y < ye.length ? q(ye[y]) : Ce;
      }
    }
  }
  function ne(I, P) {
    I.resolveAll && !a.includes(I) && a.push(I), I.resolve && _t(
      l.events,
      P,
      l.events.length - P,
      I.resolve(l.events.slice(P), l)
    ), I.resolveTo && (l.events = I.resolveTo(l.events, l)), k(
      I.partial || l.events.length === 0 || l.events[l.events.length - 1][0] === "exit",
      "expected last token to end"
    );
  }
  function G() {
    const I = M(), P = l.previous, Z = l.currentConstruct, re = l.events.length, se = Array.from(s);
    return { from: re, restore: Ce };
    function Ce() {
      r = I, l.previous = P, l.currentConstruct = Z, l.events.length = re, s = se, X(), jt("position: restore: `%j`", r);
    }
  }
  function X() {
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
          o = Tt.cr;
          break;
        }
        case h.lineFeed: {
          o = Tt.lf;
          break;
        }
        case h.carriageReturnLineFeed: {
          o = Tt.cr + Tt.lf;
          break;
        }
        case h.horizontalTab: {
          o = t ? Tt.space : Tt.ht;
          break;
        }
        case h.virtualSpace: {
          if (!t && i) continue;
          o = Tt.space;
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
    let d, l, p, m, g;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(o || void 0).decode(a)), p = 0, t = "", n && (a.charCodeAt(0) === h.byteOrderMarker && p++, n = void 0); p < a.length; ) {
      if (Pi.lastIndex = p, d = Pi.exec(a), m = d && d.index !== void 0 ? d.index : a.length, g = a.charCodeAt(m), !d) {
        t = a.slice(p);
        break;
      }
      if (g === h.lf && p === m && r)
        c.push(h.carriageReturnLineFeed), r = void 0;
      else
        switch (r && (c.push(h.carriageReturn), r = void 0), p < m && (c.push(a.slice(p, m)), e += m - p), g) {
          case h.nul: {
            c.push(h.replacementCharacter), e++;
            break;
          }
          case h.ht: {
            for (l = Math.ceil(e / H.tabSize) * H.tabSize, c.push(h.horizontalTab); e++ < l; ) c.push(h.virtualSpace);
            break;
          }
          case h.lf: {
            c.push(h.lineFeed), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      p = m + 1;
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
      a ? H.numericBaseHexadecimal : H.numericBaseDecimal
    );
  }
  return Br(n) || e;
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
      autolinkProtocol: F,
      autolinkEmail: F,
      atxHeading: a(Ge),
      blockQuote: a(ae),
      characterEscape: F,
      characterReference: F,
      codeFenced: a(ke),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: a(ke, o),
      codeText: a(De, o),
      codeTextData: F,
      data: F,
      codeFlowValue: F,
      definition: a(Ee),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: a(Ze),
      hardBreakEscape: a(vt),
      hardBreakTrailing: a(vt),
      htmlFlow: a(Rt, o),
      htmlFlowData: F,
      htmlText: a(Rt, o),
      htmlTextData: F,
      image: a(Ct),
      label: o,
      link: a(It),
      listItem: a(Bt),
      listItemValue: m,
      listOrdered: a(yt, p),
      listUnordered: a(yt),
      paragraph: a(Gt),
      reference: C,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: a(Ge),
      strong: a(Vt),
      thematicBreak: a(ft)
    },
    exit: {
      atxHeading: c(),
      atxHeadingSequence: U,
      autolink: c(),
      autolinkEmail: pe,
      autolinkProtocol: J,
      blockQuote: c(),
      characterEscapeValue: ne,
      characterReferenceMarkerHexadecimal: q,
      characterReferenceMarkerNumeric: q,
      characterReferenceValue: ce,
      characterReference: fe,
      codeFenced: c(M),
      codeFencedFence: S,
      codeFencedFenceInfo: g,
      codeFencedFenceMeta: T,
      codeFlowValue: ne,
      codeIndented: c(x),
      codeText: c(Z),
      codeTextData: ne,
      data: ne,
      definition: c(),
      definitionDestinationString: O,
      definitionLabelString: v,
      definitionTitleString: D,
      emphasis: c(),
      hardBreakEscape: c(X),
      hardBreakTrailing: c(X),
      htmlFlow: c(I),
      htmlFlowData: ne,
      htmlText: c(P),
      htmlTextData: ne,
      image: c(se),
      label: ye,
      labelText: Ce,
      lineEnding: G,
      link: c(re),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: Y,
      resourceDestinationString: y,
      resourceTitleString: ie,
      resource: ue,
      setextHeading: c(Q),
      setextHeadingLineSequence: B,
      setextHeadingText: E,
      strong: c(),
      thematicBreak: c()
    }
  };
  Va(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(b) {
    let _ = { type: "root", children: [] };
    const z = {
      stack: [_],
      tokenStack: [],
      config: t,
      enter: s,
      exit: d,
      buffer: o,
      resume: l,
      data: n
    }, j = [];
    let le = -1;
    for (; ++le < b.length; )
      if (b[le][1].type === u.listOrdered || b[le][1].type === u.listUnordered)
        if (b[le][0] === "enter")
          j.push(le);
        else {
          const Ie = j.pop();
          k(typeof Ie == "number", "expected list ot be open"), le = i(b, Ie, le);
        }
    for (le = -1; ++le < b.length; ) {
      const Ie = t[b[le][0]];
      Ga.call(Ie, b[le][1].type) && Ie[b[le][1].type].call(
        Object.assign(
          { sliceSerialize: b[le][2].sliceSerialize },
          z
        ),
        b[le][1]
      );
    }
    if (z.tokenStack.length > 0) {
      const Ie = z.tokenStack[z.tokenStack.length - 1];
      (Ie[1] || Fi).call(z, void 0, Ie[0]);
    }
    for (_.position = {
      start: Ft(
        b.length > 0 ? b[0][1].start : { line: 1, column: 1, offset: 0 }
      ),
      end: Ft(
        b.length > 0 ? b[b.length - 2][1].end : { line: 1, column: 1, offset: 0 }
      )
    }, le = -1; ++le < t.transforms.length; )
      _ = t.transforms[le](_) || _;
    return _;
  }
  function i(b, _, z) {
    let j = _ - 1, le = -1, Ie = !1, at, ze, ct, Le;
    for (; ++j <= z; ) {
      const be = b[j];
      switch (be[1].type) {
        case u.listUnordered:
        case u.listOrdered:
        case u.blockQuote: {
          be[0] === "enter" ? le++ : le--, Le = void 0;
          break;
        }
        case u.lineEndingBlank: {
          be[0] === "enter" && (at && !Le && !le && !ct && (ct = j), Le = void 0);
          break;
        }
        case u.linePrefix:
        case u.listItemValue:
        case u.listItemMarker:
        case u.listItemPrefix:
        case u.listItemPrefixWhitespace:
          break;
        default:
          Le = void 0;
      }
      if (!le && be[0] === "enter" && be[1].type === u.listItemPrefix || le === -1 && be[0] === "exit" && (be[1].type === u.listUnordered || be[1].type === u.listOrdered)) {
        if (at) {
          let et = j;
          for (ze = void 0; et--; ) {
            const We = b[et];
            if (We[1].type === u.lineEnding || We[1].type === u.lineEndingBlank) {
              if (We[0] === "exit") continue;
              ze && (b[ze][1].type = u.lineEndingBlank, Ie = !0), We[1].type = u.lineEnding, ze = et;
            } else if (!(We[1].type === u.linePrefix || We[1].type === u.blockQuotePrefix || We[1].type === u.blockQuotePrefixWhitespace || We[1].type === u.blockQuoteMarker || We[1].type === u.listItemIndent)) break;
          }
          ct && (!ze || ct < ze) && (at._spread = !0), at.end = Object.assign(
            {},
            ze ? b[ze][1].start : be[1].end
          ), b.splice(ze || j, 0, ["exit", at, be[2]]), j++, z++;
        }
        if (be[1].type === u.listItemPrefix) {
          const et = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, be[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          at = et, b.splice(j, 0, ["enter", et, be[2]]), j++, z++, ct = void 0, Le = !0;
        }
      }
    }
    return b[_][1]._spread = Ie, z;
  }
  function a(b, _) {
    return z;
    function z(j) {
      s.call(this, b(j), j), _ && _.call(this, j);
    }
  }
  function o() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function s(b, _, z) {
    const j = this.stack[this.stack.length - 1];
    k(j, "expected `parent`"), k("children" in j, "expected `parent`"), j.children.push(b), this.stack.push(b), this.tokenStack.push([_, z || void 0]), b.position = {
      start: Ft(_.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function c(b) {
    return _;
    function _(z) {
      b && b.call(this, z), d.call(this, z);
    }
  }
  function d(b, _) {
    const z = this.stack.pop();
    k(z, "expected `node`");
    const j = this.tokenStack.pop();
    if (j)
      j[0].type !== b.type && (_ ? _.call(this, b, j[0]) : (j[1] || Fi).call(this, b, j[0]));
    else throw new Error(
      "Cannot close `" + b.type + "` (" + pn({ start: b.start, end: b.end }) + "): it’s not open"
    );
    k(z.type !== "fragment", "unexpected fragment `exit`ed"), k(z.position, "expected `position` to be defined"), z.position.end = Ft(b.end);
  }
  function l() {
    return Ql(this.stack.pop());
  }
  function p() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(b) {
    if (this.data.expectingFirstListItemValue) {
      const _ = this.stack[this.stack.length - 2];
      k(_, "expected nodes on stack"), k(_.type === "list", "expected list on stack"), _.start = Number.parseInt(
        this.sliceSerialize(b),
        H.numericBaseDecimal
      ), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function g() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "code", "expected code on stack"), _.lang = b;
  }
  function T() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "code", "expected code on stack"), _.meta = b;
  }
  function S() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function M() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "code", "expected code on stack"), _.value = b.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function x() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "code", "expected code on stack"), _.value = b.replace(/(\r?\n|\r)$/g, "");
  }
  function v(b) {
    const _ = this.resume(), z = this.stack[this.stack.length - 1];
    k(z, "expected node on stack"), k(z.type === "definition", "expected definition on stack"), z.label = _, z.identifier = en(
      this.sliceSerialize(b)
    ).toLowerCase();
  }
  function D() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "definition", "expected definition on stack"), _.title = b;
  }
  function O() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "definition", "expected definition on stack"), _.url = b;
  }
  function U(b) {
    const _ = this.stack[this.stack.length - 1];
    if (k(_, "expected node on stack"), k(_.type === "heading", "expected heading on stack"), !_.depth) {
      const z = this.sliceSerialize(b).length;
      k(
        z === 1 || z === 2 || z === 3 || z === 4 || z === 5 || z === 6,
        "expected `depth` between `1` and `6`"
      ), _.depth = z;
    }
  }
  function E() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function B(b) {
    const _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "heading", "expected heading on stack"), _.depth = this.sliceSerialize(b).codePointAt(0) === h.equalsTo ? 1 : 2;
  }
  function Q() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function F(b) {
    const _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k("children" in _, "expected parent on stack");
    const z = _.children;
    let j = z[z.length - 1];
    (!j || j.type !== "text") && (j = pt(), j.position = {
      start: Ft(b.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, z.push(j)), this.stack.push(j);
  }
  function ne(b) {
    const _ = this.stack.pop();
    k(_, "expected a `node` to be on the stack"), k("value" in _, "expected a `literal` to be on the stack"), k(_.position, "expected `node` to have an open position"), _.value += this.sliceSerialize(b), _.position.end = Ft(b.end);
  }
  function G(b) {
    const _ = this.stack[this.stack.length - 1];
    if (k(_, "expected `node`"), this.data.atHardBreak) {
      k("children" in _, "expected `parent`");
      const z = _.children[_.children.length - 1];
      k(z.position, "expected tail to have a starting position"), z.position.end = Ft(b.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(_.type) && (F.call(this, b), ne.call(this, b));
  }
  function X() {
    this.data.atHardBreak = !0;
  }
  function I() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "html", "expected html on stack"), _.value = b;
  }
  function P() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "html", "expected html on stack"), _.value = b;
  }
  function Z() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "inlineCode", "expected inline code on stack"), _.value = b;
  }
  function re() {
    const b = this.stack[this.stack.length - 1];
    if (k(b, "expected node on stack"), k(b.type === "link", "expected link on stack"), this.data.inReference) {
      const _ = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = _, delete b.url, delete b.title;
    } else
      delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function se() {
    const b = this.stack[this.stack.length - 1];
    if (k(b, "expected node on stack"), k(b.type === "image", "expected image on stack"), this.data.inReference) {
      const _ = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = _, delete b.url, delete b.title;
    } else
      delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function Ce(b) {
    const _ = this.sliceSerialize(b), z = this.stack[this.stack.length - 2];
    k(z, "expected ancestor on stack"), k(
      z.type === "image" || z.type === "link",
      "expected image or link on stack"
    ), z.label = n1(_), z.identifier = en(_).toLowerCase();
  }
  function ye() {
    const b = this.stack[this.stack.length - 1];
    k(b, "expected node on stack"), k(b.type === "fragment", "expected fragment on stack");
    const _ = this.resume(), z = this.stack[this.stack.length - 1];
    if (k(z, "expected node on stack"), k(
      z.type === "image" || z.type === "link",
      "expected image or link on stack"
    ), this.data.inReference = !0, z.type === "link") {
      const j = b.children;
      z.children = j;
    } else
      z.alt = _;
  }
  function y() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(
      _.type === "image" || _.type === "link",
      "expected image or link on stack"
    ), _.url = b;
  }
  function ie() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(
      _.type === "image" || _.type === "link",
      "expected image or link on stack"
    ), _.title = b;
  }
  function ue() {
    this.data.inReference = void 0;
  }
  function C() {
    this.data.referenceType = "collapsed";
  }
  function Y(b) {
    const _ = this.resume(), z = this.stack[this.stack.length - 1];
    k(z, "expected node on stack"), k(
      z.type === "image" || z.type === "link",
      "expected image reference or link reference on stack"
    ), z.label = _, z.identifier = en(
      this.sliceSerialize(b)
    ).toLowerCase(), this.data.referenceType = "full";
  }
  function q(b) {
    k(
      b.type === "characterReferenceMarkerNumeric" || b.type === "characterReferenceMarkerHexadecimal"
    ), this.data.characterReferenceType = b.type;
  }
  function ce(b) {
    const _ = this.sliceSerialize(b), z = this.data.characterReferenceType;
    let j;
    if (z)
      j = Aa(
        _,
        z === u.characterReferenceMarkerNumeric ? H.numericBaseDecimal : H.numericBaseHexadecimal
      ), this.data.characterReferenceType = void 0;
    else {
      const Ie = Br(_);
      k(Ie !== !1, "expected reference to decode"), j = Ie;
    }
    const le = this.stack[this.stack.length - 1];
    k(le, "expected `node`"), k("value" in le, "expected `node.value`"), le.value += j;
  }
  function fe(b) {
    const _ = this.stack.pop();
    k(_, "expected `node`"), k(_.position, "expected `node.position`"), _.position.end = Ft(b.end);
  }
  function J(b) {
    ne.call(this, b);
    const _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "link", "expected link on stack"), _.url = this.sliceSerialize(b);
  }
  function pe(b) {
    ne.call(this, b);
    const _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "link", "expected link on stack"), _.url = "mailto:" + this.sliceSerialize(b);
  }
  function ae() {
    return { type: "blockquote", children: [] };
  }
  function ke() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function De() {
    return { type: "inlineCode", value: "" };
  }
  function Ee() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Ze() {
    return { type: "emphasis", children: [] };
  }
  function Ge() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function vt() {
    return { type: "break" };
  }
  function Rt() {
    return { type: "html", value: "" };
  }
  function Ct() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function It() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function yt(b) {
    return {
      type: "list",
      ordered: b.type === "listOrdered",
      start: null,
      spread: b._spread,
      children: []
    };
  }
  function Bt(b) {
    return {
      type: "listItem",
      spread: b._spread,
      checked: null,
      children: []
    };
  }
  function Gt() {
    return { type: "paragraph", children: [] };
  }
  function Vt() {
    return { type: "strong", children: [] };
  }
  function pt() {
    return { type: "text", value: "" };
  }
  function ft() {
    return { type: "thematicBreak" };
  }
}
function Ft(e) {
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
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = rn(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
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
  const d = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [c]
  };
  return e.patch(t, d), e.applyData(t, d);
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
  const i = { src: rn(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function C1(e, t) {
  const n = { src: rn(t.url) };
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
  const i = { href: rn(r.url || "") };
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
  const n = { href: rn(t.url) };
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
    let p;
    l && l.type === "element" && l.tagName === "p" ? p = l : (p = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(p)), p.children.length > 0 && p.children.unshift({ type: "text", value: " " }), p.children.unshift({
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
  const d = { type: "element", tagName: "li", properties: a, children: o };
  return e.patch(t, d), e.applyData(t, d);
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
function x1(e, t) {
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
function E1(e, t) {
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
    }, s = Fr(t.children[1]), c = Ea(t.children[t.children.length - 1]);
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
  const d = [];
  for (; ++c < s; ) {
    const p = t.children[c], m = {}, g = o ? o[c] : void 0;
    g && (m.align = g);
    let T = { type: "element", tagName: a, properties: m, children: [] };
    p && (T.children = e.all(p), e.patch(p, T), T = e.applyData(p, T)), d.push(T);
  }
  const l = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(d, !0)
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
  list: x1,
  paragraph: E1,
  // @ts-expect-error: root is different, but hard to type.
  root: b1,
  strong: _1,
  table: v1,
  tableCell: I1,
  tableRow: R1,
  text: A1,
  thematicBreak: N1,
  toml: Rn,
  yaml: Rn,
  definition: Rn,
  footnoteDefinition: Rn
};
function Rn() {
}
const $a = -1, Vn = 0, gn = 1, Hn = 2, Wr = 3, jr = 4, $r = 5, qr = 6, qa = 7, Za = 8, Bi = typeof self == "object" ? self : globalThis, O1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, o] = t[i];
    switch (a) {
      case Vn:
      case $a:
        return n(o, i);
      case gn: {
        const s = n([], i);
        for (const c of o)
          s.push(r(c));
        return s;
      }
      case Hn: {
        const s = n({}, i);
        for (const [c, d] of o)
          s[r(c)] = r(d);
        return s;
      }
      case Wr:
        return n(new Date(o), i);
      case jr: {
        const { source: s, flags: c } = o;
        return n(new RegExp(s, c), i);
      }
      case $r: {
        const s = n(/* @__PURE__ */ new Map(), i);
        for (const [c, d] of o)
          s.set(r(c), r(d));
        return s;
      }
      case qr: {
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
}, Gi = (e) => O1(/* @__PURE__ */ new Map(), e)(0), Yt = "", { toString: D1 } = {}, { keys: P1 } = Object, hn = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Vn, t];
  const n = D1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [gn, Yt];
    case "Object":
      return [Hn, Yt];
    case "Date":
      return [Wr, Yt];
    case "RegExp":
      return [jr, Yt];
    case "Map":
      return [$r, Yt];
    case "Set":
      return [qr, Yt];
    case "DataView":
      return [gn, n];
  }
  return n.includes("Array") ? [gn, n] : n.includes("Error") ? [qa, n] : [Hn, n];
}, In = ([e, t]) => e === Vn && (t === "function" || t === "symbol"), F1 = (e, t, n, r) => {
  const i = (o, s) => {
    const c = r.push(o) - 1;
    return n.set(s, c), c;
  }, a = (o) => {
    if (n.has(o))
      return n.get(o);
    let [s, c] = hn(o);
    switch (s) {
      case Vn: {
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
        const l = [], p = i([s, l], o);
        for (const m of o)
          l.push(a(m));
        return p;
      }
      case Hn: {
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
        const l = [], p = i([s, l], o);
        for (const m of P1(o))
          (e || !In(hn(o[m]))) && l.push([a(m), a(o[m])]);
        return p;
      }
      case Wr:
        return i([s, o.toISOString()], o);
      case jr: {
        const { source: l, flags: p } = o;
        return i([s, { source: l, flags: p }], o);
      }
      case $r: {
        const l = [], p = i([s, l], o);
        for (const [m, g] of o)
          (e || !(In(hn(m)) || In(hn(g)))) && l.push([a(m), a(g)]);
        return p;
      }
      case qr: {
        const l = [], p = i([s, l], o);
        for (const m of o)
          (e || !In(hn(m))) && l.push(a(m));
        return p;
      }
    }
    const { message: d } = o;
    return i([s, { name: c, message: d }], o);
  };
  return a;
}, Vi = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return F1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, zn = typeof structuredClone == "function" ? (
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
    const d = e.footnoteById.get(
      e.footnoteOrder[c]
    );
    if (!d)
      continue;
    const l = e.all(d), p = String(d.identifier).toUpperCase(), m = rn(p.toLowerCase());
    let g = 0;
    const T = [], S = e.footnoteCounts.get(p);
    for (; S !== void 0 && ++g <= S; ) {
      T.length > 0 && T.push({ type: "text", value: " " });
      let v = typeof n == "string" ? n : n(c, g);
      typeof v == "string" && (v = { type: "text", value: v }), T.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + m + (g > 1 ? "-" + g : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(c, g),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(v) ? v : [v]
      });
    }
    const M = l[l.length - 1];
    if (M && M.type === "element" && M.tagName === "p") {
      const v = M.children[M.children.length - 1];
      v && v.type === "text" ? v.value += " " : M.children.push({ type: "text", value: " " }), M.children.push(...T);
    } else
      l.push(...T);
    const x = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + m },
      children: e.wrap(l, !0)
    };
    e.patch(d, x), s.push(x);
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
            ...zn(o),
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
      return Wn(e);
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
  return Wn(r);
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
  return Wn(n);
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
  return Wn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Wn(e) {
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
  function s(c, d, l) {
    const p = (
      /** @type {Record<string, unknown>} */
      c && typeof c == "object" ? c : {}
    );
    if (typeof p.type == "string") {
      const g = (
        // `hast`
        typeof p.tagName == "string" ? p.tagName : (
          // `xast`
          typeof p.name == "string" ? p.name : void 0
        )
      );
      Object.defineProperty(m, "name", {
        value: "node (" + (c.type + (g ? "<" + g + ">" : "")) + ")"
      });
    }
    return m;
    function m() {
      let g = Xa, T, S, M;
      if ((!t || a(c, d, l[l.length - 1] || void 0)) && (g = K1(n(c, l)), g[0] === Wi))
        return g;
      if ("children" in c && c.children) {
        const x = (
          /** @type {UnistParent} */
          c
        );
        if (x.children && g[0] !== q1)
          for (S = (r ? x.children.length : -1) + o, M = l.concat(x); S > -1 && S < x.children.length; ) {
            const v = x.children[S];
            if (T = s(v, S, M)(), T[0] === Wi)
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
  function s(c, d) {
    const l = d[d.length - 1], p = l ? l.children.indexOf(c) : void 0;
    return o(c, p, l);
  }
}
const Ir = {}.hasOwnProperty, X1 = {};
function Y1(e, t) {
  const n = t || X1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = { ...L1, ...n.handlers }, s = {
    all: d,
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
      const p = l.type === "definition" ? r : i, m = String(l.identifier).toUpperCase();
      p.has(m) || p.set(m, l);
    }
  }), s;
  function c(l, p) {
    const m = l.type, g = s.handlers[m];
    if (Ir.call(s.handlers, m) && g)
      return g(s, l, p);
    if (s.options.passThrough && s.options.passThrough.includes(m)) {
      if ("children" in l) {
        const { children: S, ...M } = l, x = zn(M);
        return x.children = s.all(l), x;
      }
      return zn(l);
    }
    return (s.options.unknownHandler || ed)(s, l, p);
  }
  function d(l) {
    const p = [];
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
          Array.isArray(T) ? p.push(...T) : p.push(T);
        }
      }
    }
    return p;
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
    n.type === "element" && a && Object.assign(n.properties, zn(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function ed(e, t) {
  const n = t.data || {}, r = "value" in t && !(Ir.call(n, "hProperties") || Ir.call(n, "hChildren")) ? { type: "text", value: t.value } : {
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
var On = Object.prototype.hasOwnProperty, Ja = Object.prototype.toString, Zi = Object.defineProperty, Ki = Object.getOwnPropertyDescriptor, Xi = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : Ja.call(t) === "[object Array]";
}, Yi = function(t) {
  if (!t || Ja.call(t) !== "[object Object]")
    return !1;
  var n = On.call(t, "constructor"), r = t.constructor && t.constructor.prototype && On.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || On.call(t, i);
}, Ji = function(t, n) {
  Zi && n.name === "__proto__" ? Zi(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, Qi = function(t, n) {
  if (n === "__proto__")
    if (On.call(t, n)) {
      if (Ki)
        return Ki(t, n).value;
    } else return;
  return t[n];
}, rd = function e() {
  var t, n, r, i, a, o, s = arguments[0], c = 1, d = arguments.length, l = !1;
  for (typeof s == "boolean" && (l = s, s = arguments[1] || {}, c = 2), (s == null || typeof s != "object" && typeof s != "function") && (s = {}); c < d; ++c)
    if (t = arguments[c], t != null)
      for (n in t)
        r = Qi(s, n), i = Qi(t, n), s !== i && (l && i && (Yi(i) || (a = Xi(i))) ? (a ? (a = !1, o = r && Xi(r) ? r : []) : o = r && Yi(r) ? r : {}, Ji(s, { name: n, newValue: e(l, o, i) })) : typeof i < "u" && Ji(s, { name: n, newValue: i }));
  return s;
};
const sr = /* @__PURE__ */ Dr(rd);
function Mr(e) {
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
    function s(c, ...d) {
      const l = e[++a];
      let p = -1;
      if (c) {
        o(c);
        return;
      }
      for (; ++p < i.length; )
        (d[p] === null || d[p] === void 0) && (d[p] = i[p]);
      i = d, l ? ad(l, s)(...d) : o(null, ...d);
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
    } catch (d) {
      const l = (
        /** @type {Error} */
        d
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
const St = { basename: od, dirname: sd, extname: ld, join: cd, sep: "/" };
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
function Ar(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function fd(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Ar(e)) {
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
const lr = (
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
    t ? Ar(t) ? n = { path: t } : typeof t == "string" || md(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : hd.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < lr.length; ) {
      const a = lr[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      lr.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? St.basename(this.path) : void 0;
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
    ur(t, "basename"), cr(t, "basename"), this.path = St.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? St.dirname(this.path) : void 0;
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
    ea(this.basename, "dirname"), this.path = St.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? St.extname(this.path) : void 0;
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
    if (cr(t, "extname"), ea(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = St.join(this.dirname, this.stem + (t || ""));
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
    Ar(t) && (t = fd(t)), ur(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? St.basename(this.path, this.extname) : void 0;
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
    ur(t, "stem"), cr(t, "stem"), this.path = St.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new qe(
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
function cr(e, t) {
  if (e && e.includes(St.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + St.sep + "`"
    );
}
function ur(e, t) {
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
class Zr extends Cd {
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
      new Zr()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(sr(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (pr("data", this.frozen), this.namespace[t] = n, this) : yd.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (pr("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = Mn(t), r = this.parser || this.Parser;
    return dr("parse", r), r(String(n), n);
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
    return this.freeze(), dr("process", this.parser || this.Parser), hr("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, o) {
      const s = Mn(t), c = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(s)
      );
      r.run(c, s, function(l, p, m) {
        if (l || !p || !m)
          return d(l);
        const g = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          p
        ), T = r.stringify(g, m);
        Sd(T) ? m.value = T : m.result = T, d(
          l,
          /** @type {VFileWithOutput<CompileResult>} */
          m
        );
      });
      function d(l, p) {
        l || !p ? o(l) : a ? a(p) : (k(n, "`done` is defined if `resolve` is not"), n(void 0, p));
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
    return this.freeze(), dr("processSync", this.parser || this.Parser), hr("processSync", this.compiler || this.Compiler), this.process(t, i), na("processSync", "process", n), k(r, "we either bailed on an error or have a tree"), r;
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
      const c = Mn(n);
      i.run(t, c, d);
      function d(l, p, m) {
        const g = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          p || t
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
    const r = Mn(n), i = this.compiler || this.Compiler;
    return hr("stringify", i), ta(t), i(t, r);
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
    if (pr("use", this.frozen), t != null) if (typeof t == "function")
      c(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? s(t) : o(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function a(d) {
      if (typeof d == "function")
        c(d, []);
      else if (typeof d == "object")
        if (Array.isArray(d)) {
          const [l, ...p] = (
            /** @type {PluginTuple<Array<unknown>>} */
            d
          );
          c(l, p);
        } else
          o(d);
      else
        throw new TypeError("Expected usable value, not `" + d + "`");
    }
    function o(d) {
      if (!("plugins" in d) && !("settings" in d))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      s(d.plugins), d.settings && (i.settings = sr(!0, i.settings, d.settings));
    }
    function s(d) {
      let l = -1;
      if (d != null) if (Array.isArray(d))
        for (; ++l < d.length; ) {
          const p = d[l];
          a(p);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + d + "`");
    }
    function c(d, l) {
      let p = -1, m = -1;
      for (; ++p < r.length; )
        if (r[p][0] === d) {
          m = p;
          break;
        }
      if (m === -1)
        r.push([d, ...l]);
      else if (l.length > 0) {
        let [g, ...T] = l;
        const S = r[m][1];
        Mr(S) && Mr(g) && (g = sr(!0, S, g)), r[m] = [d, g, ...T];
      }
    }
  }
}
const wd = new Zr().freeze();
function dr(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function hr(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function pr(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function ta(e) {
  if (!Mr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function na(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function Mn(e) {
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
const xd = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", ra = [], ia = { allowDangerousHtml: !0 }, Ed = /^(https?|ircs?|mailto|xmpp)$/i, bd = [
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
  return typeof t == "string" ? n.value = t : wr(
    "Unexpected value `" + t + "` for `children` prop, expected `string`"
  ), n;
}
function Rd(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, s = t.unwrapDisallowed, c = t.urlTransform || Id;
  for (const l of bd)
    Object.hasOwn(t, l.from) && wr(
      "Unexpected `" + l.from + "` prop, " + (l.to ? "use `" + l.to + "` instead" : "remove it") + " (see <" + xd + "#" + l.id + "> for more info)"
    );
  return n && a && wr(
    "Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other"
  ), Ya(e, d), Pl(e, {
    Fragment: zt,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: f,
    jsxs: L,
    passKeys: !0,
    passNode: !0
  });
  function d(l, p, m) {
    if (l.type === "raw" && m && typeof p == "number")
      return o ? m.children.splice(p, 1) : m.children[p] = { type: "text", value: l.value }, p;
    if (l.type === "element") {
      let g;
      for (g in rr)
        if (Object.hasOwn(rr, g) && Object.hasOwn(l.properties, g)) {
          const T = l.properties[g], S = rr[g];
          (S === null || S.includes(l.tagName)) && (l.properties[g] = c(String(T || ""), g, l));
        }
    }
    if (l.type === "element") {
      let g = n ? !n.includes(l.tagName) : a ? a.includes(l.tagName) : !1;
      if (!g && r && typeof p == "number" && (g = !r(l, p, m)), g && m && typeof p == "number")
        return s && l.children ? m.children.splice(p, 1, ...l.children) : m.children.splice(p, 1), p;
    }
  }
}
function Id(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    Ed.test(e.slice(0, t)) ? e : ""
  );
}
function Md({ children: e, isStreaming: t }) {
  const [n, r] = Ne(!0), [i, a] = Ne(!1);
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
  return /* @__PURE__ */ f("div", { className: "chat-wrapper__reasoning", children: s });
}
function eo({
  title: e,
  status: t = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const a = () => /* @__PURE__ */ L(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ f(
          "mask",
          {
            id: "mask0_64_36210",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "16",
            height: "16",
            children: /* @__PURE__ */ f("rect", { width: "16", height: "16", fill: "#D9D9D9" })
          }
        ),
        /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36210)", children: /* @__PURE__ */ f(
          "path",
          {
            d: "M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z",
            fill: "#637381"
          }
        ) })
      ]
    }
  ), o = t === "completed" || e.includes(ee.UI_TEXT.THINKING) || e.includes(ee.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ L(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${o ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: o ? r : void 0,
      style: { cursor: o ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ f("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ L("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ f("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        o && /* @__PURE__ */ f(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ L(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ f(
                    "mask",
                    {
                      id: "mask0_44_18068",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ f("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ f("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ f(
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
  return t ? /* @__PURE__ */ f("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function Ad({ children: e }) {
  return /* @__PURE__ */ f("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function Nd({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var c, d;
  const a = () => {
    if (!r || !i) return null;
    const l = i.find((p) => p.name === r);
    return (l == null ? void 0 : l.description) || null;
  };
  let o;
  if (r != null && r.startsWith("lat_")) {
    const l = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.query, p = (d = n == null ? void 0 : n.parameters) == null ? void 0 : d.url;
    o = l || p || "Executing tool...";
  } else
    o = a();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ f("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ L("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ L(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ f("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ L(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ f("span", { children: o }),
          /* @__PURE__ */ L("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ f(
                    "mask",
                    {
                      id: "mask0_64_36278",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ f(
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
                  /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ f(
                    "path",
                    {
                      d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ f("span", { children: "Running..." })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ L("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ L(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ f("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ L(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ f("span", { children: o }),
          /* @__PURE__ */ L("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ f(
                    "mask",
                    {
                      id: "mask0_64_36345",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ f(
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
                  /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36345)", children: /* @__PURE__ */ f(
                    "path",
                    {
                      d: "M7.1501 10.7819L11.1168 6.83193L10.2668 5.98193L7.1501 9.08193L5.73343 7.68193L4.88343 8.53193L7.1501 10.7819ZM8.0001 14.7819C7.12232 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.643 2.1001 10.8653C1.76676 10.0875 1.6001 9.25971 1.6001 8.38193C1.6001 7.49304 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73899 2.81527 5.51676 2.48193C6.29454 2.1486 7.12232 1.98193 8.0001 1.98193C8.88899 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11805 13.9001 5.89027C14.2334 6.66249 14.4001 7.49304 14.4001 8.38193C14.4001 9.25971 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.264 13.9486 10.4918 14.2819C9.71954 14.6153 8.88899 14.7819 8.0001 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819Z",
                      fill: "#4EAD13"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ f("span", { children: "Completed" })
          ] })
        ] });
      case "error":
        return /* @__PURE__ */ L("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ f("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ f(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ f(
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
          /* @__PURE__ */ f("span", { className: "chat-wrapper__tooling-handle-title", children: e })
        ] });
      default:
        return /* @__PURE__ */ L("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ L(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ f("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ L(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ L("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f(
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
                /* @__PURE__ */ f("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
            "svg",
            {
              width: "20",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ f("span", { children: "Pending..." })
        ] });
    }
  })() });
}
function no({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ L("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ f("span", {}),
    /* @__PURE__ */ f("span", {}),
    /* @__PURE__ */ f("span", {})
  ] }) : t === "pulse" ? /* @__PURE__ */ f(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ f(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: e, height: e }
    }
  );
}
const Ld = ({ message: e }) => {
  const [t, n] = Ne(!0);
  return /* @__PURE__ */ L("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ L(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!t),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          e.role === "system" ? /* @__PURE__ */ L("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
              "svg",
              {
                width: "20",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ f(
                    "mask",
                    {
                      id: "mask0_64_36257",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ f("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ f(
                    "path",
                    {
                      d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }),
            /* @__PURE__ */ f("span", { children: "AI text input <show-toolname>..." })
          ] }) : /* @__PURE__ */ f("span", { children: "System Message" }),
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
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
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ f(
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
    t && /* @__PURE__ */ f("div", { className: "chat-wrapper__system-message-content", children: /* @__PURE__ */ f("span", { children: e.content }) })
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
  return Re(() => (t ? (document.addEventListener("keydown", i), document.body.style.overflow = "hidden") : (document.removeEventListener("keydown", i), document.body.style.overflow = ""), () => {
    document.removeEventListener("keydown", i), document.body.style.overflow = "";
  }), [t, i]), !t || !e ? null : /* @__PURE__ */ L(
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
        /* @__PURE__ */ f(
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
        /* @__PURE__ */ f(
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
            children: /* @__PURE__ */ f(
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
        /* @__PURE__ */ f(
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
  return /* @__PURE__ */ f(io.Provider, { value: t, children: e });
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
  pre: ({ children: e, ...t }) => /* @__PURE__ */ f("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ f("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ f("code", { className: "chat-wrapper__code", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ f("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ f("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ f("li", { className: "chat-wrapper__list-item", ...t, children: e }),
  hr: ({ ...e }) => /* @__PURE__ */ f("hr", { className: "chat-wrapper__hr", ...e })
}, Dd = {
  ...ao,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ f("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ f("code", { className: "chat-wrapper__code", ...n, children: e })
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
      onRetryMessage: d
    } = kn(), [l, p] = Ne(!1), [m, g] = Ne(!1), [T, S] = Ne(null), M = de(async () => {
      try {
        await navigator.clipboard.writeText(e.content), p(!0), setTimeout(() => p(!1), 2e3);
      } catch (X) {
        console.error("Failed to copy message:", X);
      }
    }, [e.content]), x = de(() => {
      d && d(e.id);
    }, [d, e.id]), v = de((X) => {
      S(X);
    }, []), D = de(() => {
      S(null);
    }, []), O = () => /* @__PURE__ */ L("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ f(no, { size: 16, variant: "dots" }),
      /* @__PURE__ */ f("span", { children: ee.UI_TEXT.THINKING })
    ] }), U = () => d && /* @__PURE__ */ f(
      "button",
      {
        className: "chat-wrapper__retry-button",
        onClick: x,
        children: "Retry?"
      }
    ), E = () => /* @__PURE__ */ L(zt, { children: [
      /* @__PURE__ */ f("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ f(
        "button",
        {
          className: `chat-wrapper__copy-button ${m ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: M,
          title: "Copy message",
          children: /* @__PURE__ */ f(Fs, {})
        }
      ) }),
      l && /* @__PURE__ */ f("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), B = () => /* @__PURE__ */ f("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ L("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ f("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ f(aa, { components: ao, children: e.content }) }),
      E()
    ] }) }), Q = () => /* @__PURE__ */ L("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ f("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ f(aa, { components: Dd, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ f("div", { className: "chat-wrapper__media", children: e.media.map((X, I) => /* @__PURE__ */ f(
        "img",
        {
          src: X,
          alt: `Uploaded content ${I + 1}`,
          className: "chat-wrapper__media-image chat-wrapper__media-image--clickable",
          onClick: () => v(X),
          style: {
            cursor: "zoom-in",
            transition: "transform 0.2s, box-shadow 0.2s"
          },
          onMouseEnter: (P) => {
            P.currentTarget.style.transform = "scale(1.02)", P.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
          },
          onMouseLeave: (P) => {
            P.currentTarget.style.transform = "scale(1)", P.currentTarget.style.boxShadow = "";
          },
          title: "Click to view full size"
        },
        I
      )) })
    ] }), F = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === c.current ? O() : e.role === "system" ? /* @__PURE__ */ f(Ld, { message: e }) : e.role === "assistant" ? B() : Q(), ne = () => /* @__PURE__ */ L(Md, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ f(
        eo,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ f(to, { children: i(e.content) })
    ] }), G = () => {
      var X;
      return /* @__PURE__ */ f(Ad, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ f(
        Nd,
        {
          title: a(e.content, e.isStreaming),
          status: o(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (X = e.toolData) == null ? void 0 : X.toolName,
          clientTools: s
        }
      ) });
    };
    return /* @__PURE__ */ L(zt, { children: [
      /* @__PURE__ */ f(
        "div",
        {
          className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
          onMouseEnter: () => e.role === "assistant" && g(!0),
          onMouseLeave: () => e.role === "assistant" && g(!1),
          children: e.role === "reasoning" ? ne() : e.role === "tooling" ? G() : /* @__PURE__ */ L(zt, { children: [
            /* @__PURE__ */ f("div", { className: "chat-wrapper__message-content", children: F() }),
            e.role === "user" && e.hasError && !e.isRetrying && U()
          ] })
        }
      ),
      /* @__PURE__ */ f(
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
const Pd = ({ isVisible: e }) => e ? /* @__PURE__ */ f("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ L("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ f("span", {}),
  /* @__PURE__ */ f("span", {}),
  /* @__PURE__ */ f("span", {})
] }) }) }) }) : null, so = Un((e, t) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = kn();
  return /* @__PURE__ */ L("div", { className: "chat-wrapper__messages", children: [
    n.map((a) => /* @__PURE__ */ f(
      oo,
      {
        message: a
      },
      a.id
    )),
    /* @__PURE__ */ f(Pd, { isVisible: r && !i }),
    /* @__PURE__ */ f("div", { ref: t })
  ] });
});
so.displayName = "MessagesList";
const mt = (...e) => e.filter(Boolean).join(" "), Fd = () => /* @__PURE__ */ L(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ L("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ f(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ f("g", { clipPath: "url(#clip0_121_23927)", children: /* @__PURE__ */ f(
          "path",
          {
            d: "M16.3333 26.3541L18.2133 28.2341L25.6666 20.7941V37.0208H28.3333V20.7941L35.7733 28.2474L37.6666 26.3541L26.9999 15.6874L16.3333 26.3541Z",
            fill: "white"
          }
        ) })
      ] }),
      /* @__PURE__ */ L("defs", { children: [
        /* @__PURE__ */ L(
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
              /* @__PURE__ */ f("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ f(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ f("feOffset", { dy: "1" }),
              /* @__PURE__ */ f("feGaussianBlur", { stdDeviation: "1" }),
              /* @__PURE__ */ f("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ f(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                }
              ),
              /* @__PURE__ */ f(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ f(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ f("feOffset", { dy: "1" }),
              /* @__PURE__ */ f("feGaussianBlur", { stdDeviation: "1.5" }),
              /* @__PURE__ */ f("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ f(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                }
              ),
              /* @__PURE__ */ f(
                "feBlend",
                {
                  mode: "normal",
                  in2: "effect1_dropShadow_121_23927",
                  result: "effect2_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ f(
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
        /* @__PURE__ */ f("clipPath", { id: "clip0_121_23927", children: /* @__PURE__ */ f(
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
), Hd = () => /* @__PURE__ */ L(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ L("g", { filter: "url(#filter0_dd_stop_121_23927)", children: [
        /* @__PURE__ */ f(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ f("g", { transform: "translate(11, 11.3541)", children: /* @__PURE__ */ f("path", { d: "M21.3333 10.6667V21.3333H10.6667V10.6667H21.3333ZM24 8H8V24H24V8Z", fill: "white" }) })
      ] }),
      /* @__PURE__ */ f("defs", { children: /* @__PURE__ */ L(
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
            /* @__PURE__ */ f("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
            /* @__PURE__ */ f(
              "feColorMatrix",
              {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
              }
            ),
            /* @__PURE__ */ f("feOffset", { dy: "1" }),
            /* @__PURE__ */ f("feGaussianBlur", { stdDeviation: "1" }),
            /* @__PURE__ */ f("feComposite", { in2: "hardAlpha", operator: "out" }),
            /* @__PURE__ */ f(
              "feColorMatrix",
              {
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
              }
            ),
            /* @__PURE__ */ f(
              "feBlend",
              {
                mode: "normal",
                in2: "BackgroundImageFix",
                result: "effect1_dropShadow_stop_121_23927"
              }
            ),
            /* @__PURE__ */ f(
              "feColorMatrix",
              {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
              }
            ),
            /* @__PURE__ */ f("feOffset", { dy: "1" }),
            /* @__PURE__ */ f("feGaussianBlur", { stdDeviation: "1.5" }),
            /* @__PURE__ */ f("feComposite", { in2: "hardAlpha", operator: "out" }),
            /* @__PURE__ */ f(
              "feColorMatrix",
              {
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              }
            ),
            /* @__PURE__ */ f(
              "feBlend",
              {
                mode: "normal",
                in2: "effect1_dropShadow_stop_121_23927",
                result: "effect2_dropShadow_stop_121_23927"
              }
            ),
            /* @__PURE__ */ f(
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
), zd = ({ className: e, ...t }) => /* @__PURE__ */ f("form", { className: mt("chat-wrapper__prompt-input", e), ...t }), lo = Un(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...o
  }, s) => {
    const c = (d) => {
      if (d.key === "Enter") {
        if (d.shiftKey)
          return;
        d.preventDefault();
        const l = d.currentTarget.form;
        if (l) {
          const p = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          l.dispatchEvent(p);
        }
      }
      a == null || a(d);
    };
    return /* @__PURE__ */ f(
      "textarea",
      {
        ref: s,
        className: mt("chat-wrapper__prompt-textarea", t),
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
}) => /* @__PURE__ */ f("div", { className: mt("chat-wrapper__prompt-toolbar", e), ...t }), Bd = ({
  className: e,
  ...t
}) => /* @__PURE__ */ f("div", { className: mt("chat-wrapper__prompt-tools", e), ...t }), Gd = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || xt.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ f(
    "button",
    {
      className: mt(
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
  status: r = Se.IDLE,
  children: i,
  disabled: a,
  ...o
}) => {
  const s = fr(r);
  let c = s ? /* @__PURE__ */ f(Hd, {}) : /* @__PURE__ */ f(Fd, {});
  return /* @__PURE__ */ f(
    "button",
    {
      className: mt(
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
}, dh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ f("select", { className: mt("chat-wrapper__prompt-select", e), ...n, children: t }), hh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ f(
  "button",
  {
    className: mt("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), ph = ({
  className: e,
  ...t
}) => /* @__PURE__ */ f(
  "div",
  {
    className: mt("chat-wrapper__prompt-select-content", e),
    ...t
  }
), fh = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ f(
  "div",
  {
    className: mt("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), gh = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ f(
  "span",
  {
    className: mt("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), Wd = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = Ne(0), [a, o] = Ne(!1), [s, c] = Ne(0);
  return Re(() => {
    if (!t || e.length <= 1) return;
    const d = setInterval(() => {
      o(!0), setTimeout(() => {
        i((l) => (l + 1) % e.length), c((l) => l + 1), o(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(d);
  }, [t, e.length]), Re(() => {
    t || (i(0), o(!1), c(0));
  }, [t]), /* @__PURE__ */ f(
    "div",
    {
      className: `animated-placeholder-container ${n}`,
      children: /* @__PURE__ */ f(
        "span",
        {
          className: `animated-placeholder-text ${a ? "transitioning" : ""}`,
          children: e[r]
        },
        s
      )
    }
  );
}, jd = Un((e, t) => {
  const {
    placeholderTexts: n,
    isStreaming: r,
    isLoadingConversation: i,
    chatStatus: a,
    fileUploadEnabled: o,
    fileUploadConfig: s,
    chipName: c,
    chipLogo: d,
    messages: l,
    onSubmit: p,
    onFileUpload: m,
    onStopGeneration: g,
    connectionState: T
  } = kn(), S = r || i || T !== Ye.CONNECTED, M = T === Ye.CONNECTED, x = l.length > 0, [v, D] = Ne(""), [O, U] = Ne([]), [E, B] = Ne([]), [Q, F] = Ne(null), [ne, G] = Ne(null), [X, I] = Ne(!1), P = ge(null), Z = de(
    (C) => {
      G(C), I(!0);
    },
    []
  ), re = de((C) => new Promise((Y, q) => {
    const ce = new FileReader();
    ce.onload = () => Y(ce.result), ce.onerror = q, ce.readAsDataURL(C);
  }), []), se = n && n.length > 0 ? n : ["What would you like to know?"], Ce = v.length === 0 && !x && se.length > 1;
  sa(t, () => ({
    focus: () => {
      var C;
      (C = P.current) == null || C.focus();
    },
    setText: (C) => {
      D(C), setTimeout(() => {
        if (P.current) {
          P.current.focus();
          const Y = C.length;
          P.current.setSelectionRange(Y, Y);
        }
      }, 0);
    },
    textareaRef: P
  }), []);
  const ye = de(
    (C) => {
      C.preventDefault();
      const q = new FormData(C.currentTarget).get("message");
      if (q != null && q.trim()) {
        const ce = Pn(q.trim(), !1);
        if (!ce.trim())
          return;
        p(ce, O), D(""), U([]);
      }
    },
    [p, O]
  ), y = de(
    (C) => {
      const q = C.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      D(q), Q && q.trim() && F(null);
    },
    [Q]
  ), ie = de(
    async (C) => {
      var ce;
      const q = Array.from(((ce = C.clipboardData) == null ? void 0 : ce.items) || []).filter((fe) => fe.type.startsWith("image/"));
      if (q.length > 0) {
        C.preventDefault(), F(null);
        try {
          const fe = await Promise.all(
            q.map((J) => {
              const pe = J.getAsFile();
              return pe ? new File(
                [pe],
                `clipboard-image-${Date.now()}.${pe.type.split("/")[1]}`,
                {
                  type: pe.type
                }
              ) : null;
            })
          ).then((J) => J.filter(Boolean));
          if (fe.length > 0) {
            const J = fe.filter((pe) => {
              const ae = (s == null ? void 0 : s.maxFileSize) ?? 15728640;
              if (pe.size > ae)
                return F(`File too large. Maximum size is ${Math.round(ae / 1048576)}MB.`), !1;
              const ke = (s == null ? void 0 : s.allowedTypes) ?? [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp"
              ];
              return ke.includes(pe.type) ? !0 : (F(
                `File type not supported. Allowed types: ${ke.join(", ")}`
              ), !1);
            });
            if (J.length > 0) {
              const pe = (s == null ? void 0 : s.maxFiles) ?? 5;
              if (O.length + E.length + J.length > pe) {
                F(`Maximum ${pe} files allowed. Currently ${O.length + E.length} files, trying to add ${J.length} more.`);
                return;
              }
              const ke = J.map(async (Ee) => ({
                file: Ee,
                preview: await re(Ee),
                isUploading: !0,
                progress: 0
              })), De = await Promise.all(ke);
              B((Ee) => [...Ee, ...De]);
              try {
                const Ee = await m(J);
                B((Ze) => Ze.filter((Ge) => !J.includes(Ge.file))), U((Ze) => [...Ze, ...Ee]), F(null);
              } catch {
                B((Ze) => Ze.filter((Ge) => !J.includes(Ge.file))), F("File upload failed. Ensure a stable connection and try again.");
              }
            }
          }
        } catch (fe) {
          F(
            fe instanceof Error ? fe.message : "Failed to paste image"
          ), B([]);
        }
      }
    },
    [m, s, O, E, re]
  ), ue = de(async () => {
    const C = document.createElement("input");
    C.type = "file", C.accept = "image/*", C.multiple = !0, C.onchange = async (Y) => {
      const q = Y.target.files;
      if (q)
        try {
          F(null);
          const ce = Array.from(q).filter((fe) => {
            const J = ts(fe.name);
            fe.name;
            const pe = (s == null ? void 0 : s.maxFileSize) ?? 15 * 1024 * 1024;
            if (fe.size > pe)
              return F(`File too large. Maximum size is ${Math.round(pe / (1024 * 1024))}MB.`), !1;
            const ae = (s == null ? void 0 : s.allowedTypes) ?? [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ];
            return ae.includes(fe.type) ? !0 : (F(
              `File type not supported. Allowed types: ${ae.join(", ")}`
            ), !1);
          });
          if (ce.length > 0) {
            const fe = (s == null ? void 0 : s.maxFiles) ?? 5;
            if (O.length + E.length + ce.length > fe) {
              F(`Maximum ${fe} files allowed. Currently ${O.length + E.length} files, trying to add ${ce.length} more.`);
              return;
            }
            const pe = ce.map(async (ke) => ({
              file: ke,
              preview: await re(ke),
              isUploading: !0,
              progress: 0
            })), ae = await Promise.all(pe);
            B((ke) => [...ke, ...ae]);
            try {
              const ke = await m(ce);
              B((De) => De.filter((Ee) => !ce.includes(Ee.file))), U((De) => [...De, ...ke]), F(null);
            } catch {
              B((De) => De.filter((Ee) => !ce.includes(Ee.file))), F("File upload failed. Ensure a stable connection and try again.");
            }
          }
        } catch (ce) {
          F(
            ce instanceof Error ? ce.message : "Upload failed"
          ), B([]);
        }
    }, C.click();
  }, [m, s, O, E, re]);
  return /* @__PURE__ */ L(
    zd,
    {
      onSubmit: ye,
      style: { position: "relative" },
      className: `${S ? "chat-wrapper__prompt-input--disabled" : ""} ${O.length > 0 || E.length > 0 || Q ? "chat-wrapper__prompt-input--with-media" : ""}`,
      children: [
        /* @__PURE__ */ f(
          lo,
          {
            ref: P,
            name: "message",
            value: v,
            onChange: y,
            onPaste: ie,
            placeholder: "",
            disabled: S
          }
        ),
        !v.trim() && M && /* @__PURE__ */ f(
          Wd,
          {
            placeholderTexts: se,
            shouldAnimate: Ce
          }
        ),
        Q && /* @__PURE__ */ L("div", { className: "chat-wrapper__upload-error", children: [
          /* @__PURE__ */ f("div", { className: "chat-wrapper__upload-error-icon", children: /* @__PURE__ */ f("span", { className: "chat-wrapper__upload-error-icon-text", children: "!" }) }),
          /* @__PURE__ */ f("span", { className: "chat-wrapper__upload-error-message", children: Q }),
          /* @__PURE__ */ f(
            "button",
            {
              className: "chat-wrapper__upload-error-dismiss",
              onClick: () => F(null),
              title: "Dismiss",
              children: "×"
            }
          )
        ] }),
        (O.length > 0 || E.length > 0) && /* @__PURE__ */ L(
          "div",
          {
            style: {
              padding: "8px 16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center"
            },
            children: [
              E.map((C, Y) => /* @__PURE__ */ L(
                "div",
                {
                  style: {
                    position: "relative",
                    display: "inline-block"
                  },
                  children: [
                    /* @__PURE__ */ L(
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
                          /* @__PURE__ */ f(
                            "img",
                            {
                              src: C.preview,
                              alt: `Uploading ${Y + 1}`,
                              style: {
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                              }
                            }
                          ),
                          /* @__PURE__ */ f(
                            "div",
                            {
                              style: {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 2
                              },
                              children: /* @__PURE__ */ f(
                                "div",
                                {
                                  style: {
                                    width: "20px",
                                    height: "20px",
                                    border: "2px solid rgba(255, 255, 255, 0.3)",
                                    borderTop: "2px solid white",
                                    borderRadius: "50%",
                                    animation: "spin 1s linear infinite"
                                  }
                                }
                              )
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ f(
                      "button",
                      {
                        onClick: () => {
                          B((q) => q.filter((ce, fe) => fe !== Y));
                        },
                        style: {
                          position: "absolute",
                          top: "6px",
                          right: "6px",
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
                          zIndex: 3,
                          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                          fontWeight: "bold",
                          transition: "all 0.2s"
                        },
                        title: "Cancel upload",
                        children: "×"
                      }
                    )
                  ]
                },
                `uploading-${Y}`
              )),
              O.map((C, Y) => {
                const q = C.startsWith("data:image/"), ce = C.startsWith("http://") || C.startsWith("https://"), fe = q || ce;
                return /* @__PURE__ */ L(
                  "div",
                  {
                    style: {
                      position: "relative",
                      display: "inline-block"
                    },
                    children: [
                      fe ? /* @__PURE__ */ L(
                        "div",
                        {
                          style: {
                            position: "relative",
                            width: "56px",
                            height: "56px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            border: "1px solid #e2e8f0",
                            cursor: "pointer"
                          },
                          onClick: () => Z(C),
                          title: "Click to view full image",
                          children: [
                            /* @__PURE__ */ f(
                              "img",
                              {
                                src: C,
                                alt: `Attachment ${Y + 1}`,
                                style: {
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover"
                                }
                              }
                            ),
                            /* @__PURE__ */ f(
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
                            ),
                            /* @__PURE__ */ f(
                              "div",
                              {
                                style: {
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  color: "white",
                                  fontSize: "16px",
                                  zIndex: 2,
                                  opacity: 0.8,
                                  pointerEvents: "none"
                                }
                              }
                            )
                          ]
                        }
                      ) : /* @__PURE__ */ L(
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
                            /* @__PURE__ */ f(
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
                                children: /* @__PURE__ */ L(
                                  "svg",
                                  {
                                    width: "24",
                                    height: "25",
                                    viewBox: "0 0 24 25",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: [
                                      /* @__PURE__ */ f(
                                        "mask",
                                        {
                                          id: "mask0_190_623",
                                          style: { maskType: "alpha" },
                                          maskUnits: "userSpaceOnUse",
                                          x: "0",
                                          y: "0",
                                          width: "24",
                                          height: "25",
                                          children: /* @__PURE__ */ f(
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
                                      /* @__PURE__ */ f("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ f(
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
                            /* @__PURE__ */ L("div", { style: { flex: 1, minWidth: 0 }, children: [
                              /* @__PURE__ */ f(
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
                                    const J = C.match(/name=([^;]+)/);
                                    return J ? decodeURIComponent(J[1]) : "document.pdf";
                                  })()
                                }
                              ),
                              /* @__PURE__ */ f(
                                "div",
                                {
                                  style: {
                                    color: "#9ca3af",
                                    fontSize: "12px",
                                    textTransform: "uppercase"
                                  },
                                  children: (() => {
                                    const J = C.match(/data:([^;]+)/);
                                    if (J) {
                                      const pe = J[1];
                                      switch (pe) {
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
                                          const ae = pe.split("/")[1];
                                          return ae ? ae.toUpperCase().substring(0, 4) : "FILE";
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
                      /* @__PURE__ */ f(
                        "button",
                        {
                          onClick: () => {
                            U(
                              (J) => J.filter((pe, ae) => ae !== Y)
                            ), Q && F(null);
                          },
                          style: {
                            position: "absolute",
                            top: fe ? "6px" : "8px",
                            right: fe ? "6px" : "8px",
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
                  `uploaded-${Y}`
                );
              })
            ]
          }
        ),
        /* @__PURE__ */ L(Ud, { children: [
          /* @__PURE__ */ L(Bd, { children: [
            o && /* @__PURE__ */ f(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center"
                },
                children: /* @__PURE__ */ f(
                  Gd,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: ue,
                    title: E.length > 0 ? `Uploading ${E.length} file(s)...` : O.length > 0 ? `${O.length}/${(s == null ? void 0 : s.maxFiles) ?? 5} image(s) attached` : `Attach images (max ${(s == null ? void 0 : s.maxFiles) ?? 5} files, ${Math.round(((s == null ? void 0 : s.maxFileSize) ?? 15 * 1024 * 1024) / (1024 * 1024))}MB each)`,
                    disabled: S || E.length > 0,
                    style: {
                      position: "relative"
                    },
                    children: /* @__PURE__ */ L(
                      "svg",
                      {
                        width: "36",
                        height: "37",
                        viewBox: "0 0 36 37",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [
                          /* @__PURE__ */ f(
                            "rect",
                            {
                              y: "0.354126",
                              width: "36",
                              height: "36",
                              rx: "18",
                              fill: "#F4F6F8"
                            }
                          ),
                          /* @__PURE__ */ f("g", { clipPath: "url(#clip0_121_9706)", children: /* @__PURE__ */ f(
                            "path",
                            {
                              d: "M21.3334 13.3541V22.9374C21.3334 24.7791 19.8417 26.2708 18 26.2708C16.1584 26.2708 14.6667 24.7791 14.6667 22.9374V12.5208C14.6667 11.3708 15.6 10.4374 16.75 10.4374C17.9 10.4374 18.8334 11.3708 18.8334 12.5208V21.2708C18.8334 21.7291 18.4584 22.1041 18 22.1041C17.5417 22.1041 17.1667 21.7291 17.1667 21.2708V13.3541H15.9167V21.2708C15.9167 22.4208 16.85 23.3541 18 23.3541C19.15 23.3541 20.0834 22.4208 20.0834 21.2708V12.5208C20.0834 10.6791 18.5917 9.18744 16.75 9.18744C14.9084 9.18744 13.4167 10.6791 13.4167 12.5208V22.9374C13.4167 25.4708 15.4667 27.5208 18 27.5208C20.5334 27.5208 22.5834 25.4708 22.5834 22.9374V13.3541H21.3334Z",
                              fill: "#212B36"
                            }
                          ) }),
                          /* @__PURE__ */ f("defs", { children: /* @__PURE__ */ f("clipPath", { id: "clip0_121_9706", children: /* @__PURE__ */ f(
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
                )
              }
            ),
            o && c && /* @__PURE__ */ f("div", { className: "chat-wrapper__divider" }),
            c && /* @__PURE__ */ L("div", { className: "chat-wrapper__restaurant-chip", children: [
              d && /* @__PURE__ */ f(
                "img",
                {
                  src: d,
                  alt: "Chip logo",
                  className: "chat-wrapper__restaurant-logo"
                }
              ),
              /* @__PURE__ */ f("span", { className: "chat-wrapper__restaurant-name", children: c })
            ] })
          ] }),
          /* @__PURE__ */ f(
            Vd,
            {
              status: a,
              disabled: fr(a) ? !1 : !v.trim() || S || E.length > 0,
              onClick: fr(a) && g ? () => {
                g();
              } : void 0
            }
          )
        ] }),
        /* @__PURE__ */ f(
          ro,
          {
            imageUrl: ne,
            isOpen: X,
            onClose: () => {
              I(!1), G(null);
            },
            alt: "Image preview"
          }
        )
      ]
    }
  );
}), $d = () => {
  const { suggestedPrompts: e, chatInputRef: t, enableSuggestedPromptsAnimation: n = !1 } = kn(), r = ge(!1), i = ge(null), a = ge(null);
  if (Re(() => () => {
    i.current && cancelAnimationFrame(i.current), a.current && clearTimeout(a.current);
  }, []), !e || e.length === 0)
    return null;
  const o = de((s) => {
    var l;
    if (r.current)
      return;
    if (!t.current) {
      console.warn("Chat input ref not available");
      return;
    }
    if (!n) {
      t.current.setText(s.description), t.current.focus();
      return;
    }
    i.current && (cancelAnimationFrame(i.current), i.current = null), a.current && (clearTimeout(a.current), a.current = null);
    const c = (l = t.current.textareaRef) == null ? void 0 : l.current;
    if (!c) {
      console.warn("Textarea ref not available, using fallback"), t.current.setText(s.description);
      return;
    }
    t.current.setText(""), c.focus(), r.current = !0;
    let d = !1;
    return s.description.length > 0 && t.current.setText(s.description[0]), a.current = setTimeout(() => {
      let p = 1;
      const m = 10, g = () => {
        if (d || !t.current) {
          r.current = !1, a.current = null;
          return;
        }
        if (p < s.description.length) {
          const T = s.description.substring(0, p + 1);
          c.value = T;
          const S = new Event("input", { bubbles: !0 });
          c.dispatchEvent(S), p++, a.current = setTimeout(g, m);
        } else
          r.current = !1, a.current = null, t.current && t.current.setText(s.description);
      };
      g();
    }, 10), () => {
      d = !0, a.current && (clearTimeout(a.current), a.current = null), r.current = !1;
    };
  }, [t, n]);
  return /* @__PURE__ */ L("div", { className: "chat-wrapper__suggested-prompts", children: [
    /* @__PURE__ */ f("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
    /* @__PURE__ */ f("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((s, c) => /* @__PURE__ */ f(
      "button",
      {
        className: "chat-wrapper__suggested-prompt-card",
        onClick: () => o(s),
        children: /* @__PURE__ */ L("div", { className: "chat-wrapper__suggested-prompt-content", children: [
          /* @__PURE__ */ f("h4", { className: "chat-wrapper__suggested-prompt-title", children: s.title }),
          /* @__PURE__ */ f("p", { className: "chat-wrapper__suggested-prompt-description", children: s.description })
        ] })
      },
      c
    )) })
  ] });
}, qd = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ f(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ f("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ f(no, { size: e, variant: "dots" }) })
  }
), Zd = ({
  headerName: e,
  headerDescription: t
}) => /* @__PURE__ */ L("div", { className: "chat-wrapper__main-header", children: [
  /* @__PURE__ */ f("h1", { className: "chat-wrapper__main-title", children: e }),
  t && /* @__PURE__ */ f("p", { className: "chat-wrapper__description", children: t })
] }), Kd = () => {
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
    isOffline: d
    // conversationError,
  } = kn(), l = Et.state.shouldShowMainHeader(
    e.length,
    n,
    t
  ), p = Et.state.shouldShowSuggestedPrompts(
    e.length,
    n,
    t,
    a
  ), m = Et.state.getContentAreaClass(
    e.length,
    n,
    t
  );
  return /* @__PURE__ */ L(zt, { children: [
    l && /* @__PURE__ */ f("div", { style: d ? { paddingTop: "48px" } : void 0, children: /* @__PURE__ */ f(
      Zd,
      {
        headerName: r,
        headerDescription: i
      }
    ) }),
    /* @__PURE__ */ L(
      "div",
      {
        className: m,
        style: d && e.length > 0 ? { paddingTop: "72px" } : void 0,
        children: [
          t && e.length === 0 ? /* @__PURE__ */ f("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ f(qd, { fullHeight: !0 }) }) : /* @__PURE__ */ f(so, { ref: s }),
          /* @__PURE__ */ f("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ f(jd, { ref: c }) }),
          p && /* @__PURE__ */ f($d, {}),
          p && o && /* @__PURE__ */ f("div", { children: o })
        ]
      }
    )
  ] });
};
function Xd({
  isVisible: e,
  isReconnecting: t = !1
}) {
  return e ? /* @__PURE__ */ f("div", { className: "network-status-banner", children: /* @__PURE__ */ f("div", { className: "network-status-banner__content", children: t ? /* @__PURE__ */ L(zt, { children: [
    /* @__PURE__ */ f("div", { className: "network-status-banner__spinner" }),
    /* @__PURE__ */ f("span", { children: "Reconnecting..." })
  ] }) : /* @__PURE__ */ L(zt, { children: [
    /* @__PURE__ */ f("div", { className: "network-status-banner__icon", children: /* @__PURE__ */ f("span", { className: "network-status-banner__icon-text", children: "!" }) }),
    /* @__PURE__ */ f("span", { className: "network-status-banner__message", children: "No internet connection — please check your network settings and try again" })
  ] }) }) }) : null;
}
const co = Un(
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
    var Kt, an;
    const { token: c, entityId: d, entityType: l } = e;
    Et.validation.validateAuthProps({
      userMpAuthToken: c,
      chatServerUrl: t,
      chatServerKey: n
    });
    const p = He(() => Et.url.convertWebSocketToHttp(t), [t]), m = He(
      () => {
        var R, we;
        return new vs({
          apiUrl: p,
          userMpAuthToken: c,
          chatServerKey: n,
          maxFileSize: (R = i.fileUploadConfig) == null ? void 0 : R.maxFileSize,
          allowedTypes: (we = i.fileUploadConfig) == null ? void 0 : we.allowedTypes
        });
      },
      [p, c, n, i.fileUploadConfig]
    ), g = He(() => a && a.length > 0 ? a.map(({ execute: R, ...we }) => we) : [], [a]), T = xs(), { isOnline: S, wasOffline: M } = _s(), x = ge(!0), v = te((R) => R.isModalOpen), D = te((R) => R.isCollapsed), O = te((R) => R.currentMode), U = te((R) => R.openModal), E = te((R) => R.closeModal), B = te((R) => R.toggleCollapse), Q = te((R) => R.toggleFullscreen), F = te((R) => R.setCurrentMode), ne = te((R) => R.chatStatus), G = te((R) => R.setChatStatus), X = te((R) => R.streamingStatus), I = te((R) => R.setStreamingStatus), P = te(
      (R) => R.isLoadingConversation
    ), Z = te(
      (R) => R.setIsLoadingConversation
    ), re = te((R) => R.conversationError), se = te(
      (R) => R.setConversationError
    ), Ce = te((R) => R.setCurrentThreadId), ye = te((R) => R.providerResId), y = te((R) => R.setProviderResId), ie = te((R) => R.isStreaming), ue = te((R) => R.setIsStreaming), C = te((R) => R.isThinking), Y = te((R) => R.setIsThinking), q = te((R) => R.streamingContent), ce = te(
      (R) => R.setStreamingContent
    ), fe = te((R) => R.isHandlingTool), J = te((R) => R.setIsHandlingTool);
    Re(() => {
      i.mode && F(i.mode);
    }, [i.mode, F]), Re(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const R = (we) => {
        we.key === "Escape" && O === "modal" && v && E();
      };
      if (O === "modal" && v)
        return document.addEventListener("keydown", R), () => document.removeEventListener("keydown", R);
    }, [O, v, E]);
    const {
      messages: pe,
      setMessages: ae,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: ke,
      getReasoningStatus: De,
      getReasoningDuration: Ee,
      getReasoningContentOnly: Ze,
      getReasoningTitle: Ge,
      getToolingTitle: vt,
      getToolingStatus: Rt,
      handleSetMessage: Ct,
      handleReasoningUpdate: It,
      handleChatFinished: yt,
      handleChatError: Bt,
      stopGeneration: Gt
    } = T, Vt = ge(null), pt = ge(null), ft = ge(!1), b = ge(null), _ = de(
      (R) => {
        y(R.providerResId), Ce(R.threadId), R.canUpdateMetadata && r && Object.keys(r).length > 0 && b.current && b.current.updateMetadata(R.providerResId, { metadata: r }).catch((we) => {
        });
      },
      [y, Ce, r]
    ), z = de(
      (R) => {
        var we, Me;
        switch (R.type) {
          case ut.CHAT_COMPLETED:
            (we = R.data) != null && we.conversationId && y(R.data.conversationId), yt(), G(Se.IDLE), I(st.IDLE), setTimeout(() => {
              var _e;
              (_e = pt.current) == null || _e.focus();
            }, 0);
            break;
          case ut.CHAT_ERROR:
            (Me = R.data) != null && Me.error && Bt(R.data.error);
            break;
          case ut.CONNECTION_LOST:
            break;
          case ut.CONNECTION_RESTORED:
            break;
          case ut.RECONNECTING:
            break;
        }
      },
      [
        yt,
        Bt,
        y,
        Ce
      ]
    ), {
      chatClient: j,
      connectionState: le,
      // reconnectAttempts: reconnectAttempt,
      connectChatClient: Ie
    } = Ao({
      // Authentication and server properties
      userMpAuthToken: c,
      chatServerUrl: t,
      chatServerKey: n,
      // Entity configuration
      entityId: d,
      entityType: l,
      // Tools configuration
      tools: a,
      // Other properties
      contextHelpers: o,
      onSetMessage: Ct,
      onSystemEvent: z,
      onReasoningUpdate: It,
      onThreadCreated: _,
      onError: i.onError
    });
    Re(() => {
      b.current = j;
    }, [j]), bs({
      metadata: r,
      chatClient: j,
      currentProviderResId: ye,
      isLoadingConversation: P,
      messages: pe,
      entityId: d,
      entityType: l
    }), Re(() => {
      M && S && x.current ? Ie().catch((R) => {
        const we = tn(
          R,
          "NetworkReconnection"
        );
        x.current = we.isRetryable, we.isRetryable || console.warn(
          `[ChatWrapper] Network reconnection failed with non-retryable error: ${we.reason}`
        );
      }) : M && S && !x.current && console.warn(
        "[ChatWrapper] Network restored but last error was non-retryable (CORS/auth), skipping reconnection"
      );
    }, [S, M, Ie]);
    const at = de(() => {
      Gt(), G(Se.IDLE), I(st.IDLE), j && ye && j.stopRun(ye);
    }, [
      Gt,
      G,
      I,
      j,
      ye
    ]);
    sa(
      s,
      () => ({
        updateMetadata: (R) => {
          j && ye && j.updateMetadata(ye, R).catch((we) => {
          });
        }
      }),
      [j, ye]
    );
    const ze = He(
      () => j ? new Rs(j, {
        onError: i.onError
      }) : null,
      [j, i.onError]
    ), {
      resetConversationLoader: ct
      /*, reloadConversation*/
    } = Es({
      entityId: d,
      entityType: l,
      httpApiUrl: p,
      userMpAuthToken: c,
      chatServerKey: n,
      messages: pe,
      setMessages: ae,
      setIsLoadingConversation: Z,
      setConversationError: se,
      setCurrentThreadId: Ce,
      setProviderResId: y,
      metadata: r,
      isConnected: le === Ye.CONNECTED,
      // Only load after connection established
      onConversationInitialized: i.onConversationInitialized ? () => {
        var R;
        ft.current = !0, (R = i.onConversationInitialized) == null || R.call(i);
      } : void 0
    }), Le = ge(null), be = de(() => {
      Le.current && cancelAnimationFrame(Le.current), Le.current = requestAnimationFrame(() => {
        var R;
        (R = Vt.current) == null || R.scrollIntoView({ behavior: "smooth" }), Le.current = null;
      });
    }, []);
    Re(() => {
      be();
    }, [pe, be]), Re(() => {
      q && be();
    }, [q, be]), Re(() => {
      i.onStreamingStatusChange && i.onStreamingStatusChange(X);
    }, [X, i]), Re(() => () => {
      Le.current && cancelAnimationFrame(Le.current);
    }, []), Re(() => () => {
      ae([]), ue(!1), Y(!1), ce(""), J(!1), G(Se.IDLE), I(st.IDLE), Z(!1), se(null), Ce(null), y(null);
    }, [
      ae,
      ue,
      Y,
      ce,
      J,
      G,
      I,
      Z,
      se,
      Ce,
      y
    ]);
    const et = de(
      async (R, we) => {
        if (!R.trim() || ie || !ze || !j)
          return;
        ue(!0), Y(!0), G(Se.SUBMITTED), I(st.STARTING);
        const Me = ze.createUserMessage(
          R,
          we
        );
        if (ae((Ae) => [...Ae, Me]), i.onConversationInitialized && !ft.current && (ft.current = !0, i.onConversationInitialized()), !navigator.onLine) {
          Y(!1), G(Se.ERROR), ae(
            (Ae) => Ae.map(
              (Ue) => Ue.id === Me.id ? {
                ...Ue,
                hasError: !0,
                isRetrying: !1,
                errorMessage: "No internet connection. Please check your network and try again."
              } : Ue
            )
          ), ue(!1), G(Se.IDLE), I(st.IDLE);
          return;
        }
        try {
          const Ae = new Promise((wt, Pt) => {
            setTimeout(() => Pt(new Error("Message send timeout - connection may be lost")), 5e3);
          });
          await Promise.race([
            j.onTriggerMessage({
              message: Me.content,
              media: we,
              providerResId: ye || void 0
            }),
            Ae
          ]), G(Se.STREAMING);
          const Ue = setTimeout(() => {
            Y(!1), G(Se.ERROR), ae(
              (wt) => wt.map(
                (Pt) => Pt.id === Me.id ? {
                  ...Pt,
                  hasError: !0,
                  isRetrying: !1,
                  errorMessage: "No response received. Connection may be lost."
                } : Pt
              )
            ), ue(!1), G(Se.IDLE), I(st.IDLE);
          }, 8e3);
          window.responseTimeoutId = Ue;
        } catch (Ae) {
          Y(!1), G(Se.ERROR), ae(
            (Ue) => Ue.map(
              (wt) => wt.id === Me.id ? {
                ...wt,
                hasError: !0,
                isRetrying: !1,
                // Explicitly ensure not in retrying state
                errorMessage: le !== Ye.CONNECTED ? "Connection lost. Message not sent." : Ae instanceof Error ? Ae.message : "Failed to send message. Please try again."
              } : wt
            )
          ), ue(!1), G(Se.IDLE), I(st.IDLE);
        }
      },
      [
        ze,
        j,
        ie,
        le,
        ae,
        ue,
        Y,
        G,
        I,
        ye
      ]
    ), We = de(
      async (R) => await m.uploadFiles(R),
      [m]
    ), jn = He(
      () => Et.css.getContainerClasses(
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
    ), Zt = de(() => {
      O === "modal" ? U() : B();
    }, [O, U, B]), Wt = de(
      (R) => {
        pt.current && pt.current.setText(R.description);
      },
      []
    ), Sn = He(
      () => ({
        messages: pe,
        isStreaming: ie,
        isThinking: C,
        isHandlingTool: fe
      }),
      [pe, ie, C, fe]
    ), Dt = He(
      () => ({
        isLoadingConversation: P,
        chatStatus: ne,
        conversationError: re,
        isOffline: !S,
        connectionState: le
      }),
      [
        P,
        ne,
        re,
        S,
        le
      ]
    ), Tn = He(
      () => {
        var R, we, Me, _e;
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
          fileUploadEnabled: (R = i.features) == null ? void 0 : R.fileUpload,
          fileUploadConfig: {
            maxFiles: ((we = i.fileUploadConfig) == null ? void 0 : we.maxFiles) ?? 5,
            maxFileSize: ((Me = i.fileUploadConfig) == null ? void 0 : Me.maxFileSize) ?? 15 * 1024 * 1024,
            // 15MB default
            allowedTypes: ((_e = i.fileUploadConfig) == null ? void 0 : _e.allowedTypes) ?? [
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
        (Kt = i.features) == null ? void 0 : Kt.fileUpload,
        i.fileUploadConfig,
        g
      ]
    ), xn = He(
      () => ({
        getReasoningTitle: Ge,
        getReasoningStatus: De,
        getReasoningDuration: Ee,
        getReasoningContentOnly: Ze,
        getToolingTitle: vt,
        getToolingStatus: Rt
      }),
      [
        Ge,
        De,
        Ee,
        Ze,
        vt,
        Rt
      ]
    ), Oe = de(
      async (R) => {
        const we = pe.find((_e) => _e.id === R);
        if (!we)
          return;
        if (ue(!0), Y(!0), G(Se.SUBMITTED), I(st.STARTING), ae((_e) => _e.map(
          (Ae) => Ae.id === R ? {
            ...Ae,
            hasError: !1,
            isRetrying: !0,
            errorMessage: void 0
          } : Ae
        )), !navigator.onLine) {
          Y(!1), ue(!1), G(Se.ERROR), ae(
            (_e) => _e.map(
              (Ae) => Ae.id === R ? {
                ...Ae,
                isRetrying: !1,
                hasError: !0,
                errorMessage: "Still no internet connection. Please check your network and try again."
              } : Ae
            )
          ), G(Se.IDLE), I(st.IDLE);
          return;
        }
        try {
          le !== Ye.CONNECTED && await Ie(), await (j == null ? void 0 : j.onTriggerMessage({
            message: we.content,
            media: we.media,
            providerResId: ye || void 0
          })), G(Se.STREAMING);
          const _e = setTimeout(() => {
            Y(!1), G(Se.ERROR), ae(
              (Ae) => Ae.map(
                (Ue) => Ue.id === R ? {
                  ...Ue,
                  hasError: !0,
                  isRetrying: !1,
                  errorMessage: "No response received. Connection may be lost."
                } : Ue
              )
            ), ue(!1), G(Se.IDLE), I(st.IDLE);
          }, 8e3);
          window.responseTimeoutId = _e;
        } catch (_e) {
          Y(!1), ue(!1), G(Se.ERROR), I(st.IDLE), ae(
            (Ae) => Ae.map(
              (Ue) => Ue.id === R ? {
                ...Ue,
                isRetrying: !1,
                hasError: !0,
                errorMessage: _e instanceof Error ? _e.message : "Retry failed. Please try again."
              } : Ue
            )
          ), G(Se.IDLE);
        }
      },
      [
        pe,
        ae,
        ct,
        Ie,
        et
      ]
    ), Mt = He(
      () => ({
        onSubmit: et,
        onFileUpload: We,
        onStopGeneration: at,
        onPromptSelect: Wt,
        onRetryMessage: Oe
      }),
      [
        et,
        We,
        at,
        Wt,
        Oe
      ]
    ), $n = He(
      () => ({
        ...Sn,
        ...Dt,
        ...Tn,
        ...xn,
        ...Mt,
        currentAssistantMessageIdRef: ke,
        messagesEndRef: Vt,
        chatInputRef: pt
      }),
      [
        Sn,
        Dt,
        Tn,
        xn,
        Mt,
        ke,
        Vt,
        pt
      ]
    );
    return He(
      () => Et.state.shouldShowBubble(
        O,
        v,
        D
      ),
      [O, v, D]
    ) ? /* @__PURE__ */ f(pi, { children: /* @__PURE__ */ f(
      Hs,
      {
        mode: O,
        headerName: i.headerName,
        bubbleText: i.bubbleText,
        showBubbleText: ((an = i.features) == null ? void 0 : an.showBubbleText) !== !1,
        onClick: Zt
      }
    ) }) : /* @__PURE__ */ f(pi, { children: /* @__PURE__ */ f(
      As,
      {
        onError: (R) => {
          i.onError && i.onError(R);
        },
        children: /* @__PURE__ */ L("div", { className: jn, style: i.customStyles, children: [
          /* @__PURE__ */ f(
            Xd,
            {
              isVisible: !S,
              isReconnecting: le === Ye.RECONNECTING
            }
          ),
          Et.state.shouldShowHeader(i.headerVisible) && /* @__PURE__ */ f(
            zs,
            {
              headerName: i.headerName,
              mode: O,
              isCollapsed: D,
              isModalOpen: v,
              onClose: E,
              onToggleFullscreen: Q,
              onToggleCollapse: B
            }
          ),
          !D && /* @__PURE__ */ f(
            Ns,
            {
              onError: (R) => {
                i.onError && i.onError(R);
              },
              children: /* @__PURE__ */ f(Od, { value: $n, children: /* @__PURE__ */ f(Kd, {}) })
            }
          )
        ] })
      }
    ) });
  }
);
co.displayName = "ChatWrapperContainer";
const mh = oa(co);
function Ch({
  isConnected: e,
  isConnecting: t = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 1 / 0,
  onRetry: a,
  autoHideDuration: o = 3e3
}) {
  const [s, c] = Ne("hidden"), [d, l] = Ne(!1);
  if (Re(() => {
    t ? c("connecting") : !e && !n ? (l(!0), i !== 1 / 0 && r >= i ? c("error") : c("hidden")) : n ? c("reconnecting") : e && d ? (c("hidden"), l(!1)) : e && !d && c("hidden");
  }, [e, t, n, r, i, d, o]), s === "hidden")
    return null;
  const p = () => {
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
  return g ? s === "connecting" ? /* @__PURE__ */ f("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ L("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ f("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ f("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ f("div", { className: "connection-notification__bubble" })
  ] }) }) : s === "reconnecting" ? /* @__PURE__ */ f("div", { className: `connection-notification connection-notification--banner connection-notification--${s}`, children: /* @__PURE__ */ L("div", { className: "connection-notification__banner-content", children: [
    /* @__PURE__ */ f("span", { className: "connection-notification__banner-spinner" }),
    /* @__PURE__ */ L("span", { className: "connection-notification__banner-text", children: [
      "Reconnecting... (attempt ",
      r,
      ")"
    ] })
  ] }) }) : /* @__PURE__ */ f("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ L("div", { className: "connection-notification__content", children: [
    /* @__PURE__ */ f("div", { className: "connection-notification__icon", children: g.icon }),
    /* @__PURE__ */ f("div", { className: "connection-notification__title", children: g.title }),
    /* @__PURE__ */ f("div", { className: "connection-notification__message", children: g.message }),
    a && /* @__PURE__ */ f("div", { className: "connection-notification__actions", children: /* @__PURE__ */ f(
      "button",
      {
        className: "connection-notification__retry-btn primary",
        onClick: p,
        children: "Try Again"
      }
    ) })
  ] }) }) : null;
}
export {
  Wd as AnimatedPlaceholder,
  Se as CHAT_STATUS,
  Ls as ChatIcon,
  mh as ChatWrapper,
  Os as CloseIcon,
  Ps as CollapseIcon,
  Ch as ConnectionNotification,
  Fs as CopyIcon,
  mo as EntityType,
  Ds as FullscreenIcon,
  qd as InlineLoader,
  no as Loader,
  $e as PROCESSING_STATUS,
  zd as PromptInput,
  Gd as PromptInputButton,
  dh as PromptInputModelSelect,
  ph as PromptInputModelSelectContent,
  fh as PromptInputModelSelectItem,
  hh as PromptInputModelSelectTrigger,
  gh as PromptInputModelSelectValue,
  Vd as PromptInputSubmit,
  lo as PromptInputTextarea,
  Ud as PromptInputToolbar,
  Bd as PromptInputTools,
  Md as Reasoning,
  to as ReasoningContent,
  eo as ReasoningTrigger,
  st as STREAMING_STATUS,
  uh as SettingsIcon,
  $d as SuggestedPrompts,
  vo as fetchThreadMessages,
  fr as isChatActive,
  th as isChatError,
  eh as isChatIdle,
  nh as isProcessingActive,
  rh as isProcessingComplete,
  ih as isProcessingError,
  Ro as updateThread,
  Io as updateThreadMetadata,
  oh as useChatState,
  sh as useConversationState,
  ah as useLayoutState,
  lh as useThreadState,
  ch as useUIState,
  te as useUIStore
};
