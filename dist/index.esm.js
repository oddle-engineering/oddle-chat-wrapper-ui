var eo = Object.defineProperty;
var to = (e, t, n) => t in e ? eo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var G = (e, t, n) => to(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as c, jsxs as _, Fragment as ft } from "react/jsx-runtime";
import ht, { useState as ie, useEffect as ye, useCallback as te, useRef as ve, useMemo as Ce, Component as Tr, createContext as no, useContext as ro, memo as Ki, forwardRef as On, useImperativeHandle as qi } from "react";
async function io(e, t) {
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
async function ao(e, t, n) {
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
async function oo(e, t, n) {
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
async function Xi(e, t, n, r) {
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
    const l = await o.json().catch(() => ({
      error: "Failed to update thread"
    }));
    throw new Error(l.error || "Failed to update thread");
  }
  const s = await o.json();
  if (!s.success)
    throw new Error(s.error || "Failed to update thread");
  return s.data;
}
async function Yi(e, t, n, r) {
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
    const l = await o.json().catch(() => ({
      error: "Failed to update thread metadata"
    }));
    throw new Error(l.error || "Failed to update thread metadata");
  }
  const s = await o.json();
  if (!s.success)
    throw new Error(s.error || "Failed to update thread metadata");
  return s.data;
}
const Vr = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), r = (u, h) => {
    const p = typeof u == "function" ? u(t) : u;
    if (!Object.is(p, t)) {
      const m = t;
      t = h ?? (typeof p != "object" || p === null) ? p : Object.assign({}, t, p), n.forEach((d) => d(t, m));
    }
  }, i = () => t, s = { setState: r, getState: i, getInitialState: () => l, subscribe: (u) => (n.add(u), () => n.delete(u)) }, l = t = e(r, i, s);
  return s;
}, so = (e) => e ? Vr(e) : Vr, lo = (e) => e;
function co(e, t = lo) {
  const n = ht.useSyncExternalStore(
    e.subscribe,
    ht.useCallback(() => t(e.getState()), [e, t]),
    ht.useCallback(() => t(e.getInitialState()), [e, t])
  );
  return ht.useDebugValue(n), n;
}
const uo = (e) => {
  const t = so(e), n = (r) => co(t, r);
  return Object.assign(n, t), n;
}, ho = (e) => uo, $r = { BASE_URL: "/", DEV: !1, MODE: "production", PROD: !0, SSR: !1 }, ln = /* @__PURE__ */ new Map(), yn = (e) => {
  const t = ln.get(e);
  return t ? Object.fromEntries(
    Object.entries(t.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, po = (e, t, n) => {
  if (e === void 0)
    return {
      type: "untracked",
      connection: t.connect(n)
    };
  const r = ln.get(n.name);
  if (r)
    return { type: "tracked", store: e, ...r };
  const i = {
    connection: t.connect(n),
    stores: {}
  };
  return ln.set(n.name, i), { type: "tracked", store: e, ...i };
}, fo = (e, t) => {
  if (t === void 0) return;
  const n = ln.get(e);
  n && (delete n.stores[t], Object.keys(n.stores).length === 0 && ln.delete(e));
}, go = (e) => {
  var t, n;
  if (!e) return;
  const r = e.split(`
`), i = r.findIndex(
    (o) => o.includes("api.setState")
  );
  if (i < 0) return;
  const a = ((t = r[i + 1]) == null ? void 0 : t.trim()) || "";
  return (n = /.+ (.+) .+/.exec(a)) == null ? void 0 : n[1];
}, mo = (e, t = {}) => (n, r, i) => {
  const { enabled: a, anonymousActionType: o, store: s, ...l } = t;
  let u;
  try {
    u = (a ?? ($r ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!u)
    return e(n, r, i);
  const { connection: h, ...p } = po(s, u, l);
  let m = !0;
  i.setState = (w, R, S) => {
    const x = n(w, R);
    if (!m) return x;
    const M = S === void 0 ? {
      type: o || go(new Error().stack) || "anonymous"
    } : typeof S == "string" ? { type: S } : S;
    return s === void 0 ? (h == null || h.send(M, r()), x) : (h == null || h.send(
      {
        ...M,
        type: `${s}/${M.type}`
      },
      {
        ...yn(l.name),
        [s]: i.getState()
      }
    ), x);
  }, i.devtools = {
    cleanup: () => {
      h && typeof h.unsubscribe == "function" && h.unsubscribe(), fo(l.name, s);
    }
  };
  const d = (...w) => {
    const R = m;
    m = !1, n(...w), m = R;
  }, y = e(i.setState, r, i);
  if (p.type === "untracked" ? h == null || h.init(y) : (p.stores[p.store] = i, h == null || h.init(
    Object.fromEntries(
      Object.entries(p.stores).map(([w, R]) => [
        w,
        w === p.store ? y : R.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let w = !1;
    const R = i.dispatch;
    i.dispatch = (...S) => {
      ($r ? "production" : void 0) !== "production" && S[0].type === "__setState" && !w && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), w = !0), R(...S);
    };
  }
  return h.subscribe((w) => {
    var R;
    switch (w.type) {
      case "ACTION":
        if (typeof w.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return Wn(
          w.payload,
          (S) => {
            if (S.type === "__setState") {
              if (s === void 0) {
                d(S.state);
                return;
              }
              Object.keys(S.state).length !== 1 && console.error(
                `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
              );
              const x = S.state[s];
              if (x == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(x) && d(x);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(S);
          }
        );
      case "DISPATCH":
        switch (w.payload.type) {
          case "RESET":
            return d(y), s === void 0 ? h == null ? void 0 : h.init(i.getState()) : h == null ? void 0 : h.init(yn(l.name));
          case "COMMIT":
            if (s === void 0) {
              h == null || h.init(i.getState());
              return;
            }
            return h == null ? void 0 : h.init(yn(l.name));
          case "ROLLBACK":
            return Wn(w.state, (S) => {
              if (s === void 0) {
                d(S), h == null || h.init(i.getState());
                return;
              }
              d(S[s]), h == null || h.init(yn(l.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return Wn(w.state, (S) => {
              if (s === void 0) {
                d(S);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(S[s]) && d(S[s]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: S } = w.payload, x = (R = S.computedStates.slice(-1)[0]) == null ? void 0 : R.state;
            if (!x) return;
            d(s === void 0 ? x : x[s]), h == null || h.send(
              null,
              // FIXME no-any
              S
            );
            return;
          }
          case "PAUSE_RECORDING":
            return m = !m;
        }
        return;
    }
  }), y;
}, Co = mo, Wn = (e, t) => {
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
}, yo = (e) => ({
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
}), Qe = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, Wt = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, Pe = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, or = (e) => e === Qe.SUBMITTED || e === Qe.STREAMING, Uh = (e) => e === Qe.IDLE, zh = (e) => e === Qe.ERROR, Bh = (e) => e === Pe.PROCESSING, Wh = (e) => e === Pe.COMPLETED, Gh = (e) => e === Pe.ERROR, wo = (e) => ({
  // Initial state
  chatStatus: Qe.IDLE,
  streamingStatus: Wt.IDLE,
  // Actions
  setChatStatus: (t) => e({ chatStatus: t }),
  setStreamingStatus: (t) => e({ streamingStatus: t }),
  resetChatStatus: () => e({
    chatStatus: Qe.IDLE,
    streamingStatus: Wt.IDLE
  })
}), So = (e) => ({
  // Initial state
  isLoadingConversation: !1,
  conversationError: null,
  // Actions
  setIsLoadingConversation: (t) => e({ isLoadingConversation: t }),
  setConversationError: (t) => e({ conversationError: t }),
  clearConversationError: () => e({ conversationError: null })
}), Eo = (e) => ({
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
}), To = (e) => ({
  // Initial state
  isDevSettingsOpen: !1,
  // Actions
  setIsDevSettingsOpen: (t) => e({ isDevSettingsOpen: t }),
  toggleDevSettings: () => e((t) => ({ isDevSettingsOpen: !t.isDevSettingsOpen }))
}), _o = (e) => ({
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
}), Z = ho()(
  Co(
    (...e) => ({
      ...yo(...e),
      ...wo(...e),
      ...So(...e),
      ...Eo(...e),
      ...To(...e),
      ..._o(...e)
    }),
    {
      name: "ChatUI-Store"
    }
  )
), Vh = () => Z((e) => ({
  isModalOpen: e.isModalOpen,
  isCollapsed: e.isCollapsed,
  currentMode: e.currentMode,
  openModal: e.openModal,
  closeModal: e.closeModal,
  toggleCollapse: e.toggleCollapse,
  toggleFullscreen: e.toggleFullscreen
})), $h = () => Z((e) => ({
  chatStatus: e.chatStatus,
  streamingStatus: e.streamingStatus,
  setChatStatus: e.setChatStatus,
  setStreamingStatus: e.setStreamingStatus,
  resetChatStatus: e.resetChatStatus
})), jh = () => Z((e) => ({
  isLoadingConversation: e.isLoadingConversation,
  conversationError: e.conversationError,
  setIsLoadingConversation: e.setIsLoadingConversation,
  setConversationError: e.setConversationError,
  clearConversationError: e.clearConversationError
})), Zh = () => Z((e) => ({
  currentThreadId: e.currentThreadId,
  providerResId: e.providerResId,
  setCurrentThreadId: e.setCurrentThreadId,
  setProviderResId: e.setProviderResId,
  clearThreadData: e.clearThreadData
})), Kh = () => Z((e) => ({
  isDevSettingsOpen: e.isDevSettingsOpen,
  setIsDevSettingsOpen: e.setIsDevSettingsOpen,
  toggleDevSettings: e.toggleDevSettings
})), ko = ({
  isOpen: e,
  onClose: t,
  apiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  app: a = "UD21",
  // Default to UD21 if not specified
  onDisconnect: o,
  isConnected: s = !1
}) => {
  const [l, u] = ie(null), [h, p] = ie(""), [m, d] = ie(""), y = Z((f) => f.providerResId), [w, R] = ie(""), [S, x] = ie("BRAND"), [M, P] = ie(""), [L, T] = ie(""), [D, O] = ie(!1), [$, z] = ie(null), [N, b] = ie(null), [F, W] = ie("agent");
  ye(() => {
    e && !l && H();
  }, [e]);
  const H = te(async () => {
    O(!0), z(null);
    try {
      const f = await io(n, {
        userMpAuthToken: r,
        chatServerKey: i
      });
      if (!f)
        throw new Error(`No configuration found for app: ${a}`);
      u(f), p(f.promptPath), d(f.versionUuid);
    } catch (f) {
      z(f instanceof Error ? f.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", f);
    } finally {
      O(!1);
    }
  }, [n, a, r, i]), X = te(async () => {
    if (l) {
      O(!0), z(null);
      try {
        const f = await ao(n, {
          app: l.app,
          promptPath: h,
          versionUuid: m,
          isDefault: l.isDefault
        }, {
          userMpAuthToken: r,
          chatServerKey: i
        });
        u(f), t(), window.location.reload();
      } catch (f) {
        z(f instanceof Error ? f.message : "Failed to update configuration"), console.error("Error updating agent configuration:", f);
      } finally {
        O(!1);
      }
    }
  }, [n, h, m, l, t, r, i]), J = te(async () => {
    if (!y) {
      z("No active conversation to attach");
      return;
    }
    O(!0), z(null), b(null);
    try {
      let f;
      if (L.trim())
        try {
          f = JSON.parse(L);
        } catch {
          throw new Error("Invalid JSON in metadata field");
        }
      const Q = w && S, Ie = M || f;
      if (Q && await Xi(
        n,
        y,
        {
          entityId: w,
          entityType: S
        },
        {
          userMpAuthToken: r,
          chatServerKey: i
        }
      ), Ie && await Yi(
        n,
        y,
        {
          tag: M || void 0,
          metadata: f
        },
        {
          userMpAuthToken: r,
          chatServerKey: i
        }
      ), !Q && !Ie) {
        z("Please provide at least one field to update");
        return;
      }
      b("Thread updated successfully!"), setTimeout(() => {
        R(""), x("BRAND"), P(""), T(""), b(null);
      }, 2e3);
    } catch (f) {
      z(f instanceof Error ? f.message : "Failed to update thread"), console.error("Error updating thread:", f);
    } finally {
      O(!1);
    }
  }, [y, n, w, S, M, L, r, i]), de = te(() => {
    o && (z(null), b(null), o(), b("WebSocket disconnected successfully!"), setTimeout(() => {
      b(null), t();
    }, 1500));
  }, [o, t]), we = te(() => {
    l && (p(l.promptPath), d(l.versionUuid)), z(null), t();
  }, [l, t]);
  return e ? /* @__PURE__ */ c("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ c("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ c(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: we,
          title: "Close settings",
          children: /* @__PURE__ */ c(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ c(
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
    /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-tabs", children: [
      /* @__PURE__ */ c(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${F === "agent" ? "active" : ""}`,
          onClick: () => W("agent"),
          children: "Agent Config"
        }
      ),
      /* @__PURE__ */ c(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${F === "thread" ? "active" : ""}`,
          onClick: () => W("thread"),
          children: "Thread Attachment"
        }
      ),
      /* @__PURE__ */ c(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${F === "connection" ? "active" : ""}`,
          onClick: () => W("connection"),
          children: "Connection"
        }
      )
    ] }),
    /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-content", children: [
      N && /* @__PURE__ */ c("div", { className: "chat-wrapper__dev-settings-success", children: N }),
      D && /* @__PURE__ */ c("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      $ && /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ _("p", { children: [
          "Error: ",
          $
        ] }),
        /* @__PURE__ */ c(
          "button",
          {
            onClick: F === "agent" ? H : void 0,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      F === "agent" && l && !D && /* @__PURE__ */ _(ft, { children: [
        /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ c("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ c(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: h,
              onChange: (f) => p(f.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: D
            }
          ),
          /* @__PURE__ */ c("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ c("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ c(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: m,
              onChange: (f) => d(f.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: D
            }
          ),
          /* @__PURE__ */ c("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ c("label", { htmlFor: "app-name", children: "App:" }),
          /* @__PURE__ */ c(
            "input",
            {
              id: "app-name",
              type: "text",
              value: l.app,
              className: "chat-wrapper__dev-settings-input",
              disabled: !0,
              readOnly: !0
            }
          ),
          /* @__PURE__ */ c("p", { className: "chat-wrapper__dev-settings-help", children: "Application name for this agent configuration." })
        ] })
      ] }),
      F === "thread" && !D && /* @__PURE__ */ _(ft, { children: [
        /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-info", children: [
          /* @__PURE__ */ _("p", { children: [
            /* @__PURE__ */ c("strong", { children: "Provider Resource ID:" }),
            " ",
            y || "No active conversation"
          ] }),
          /* @__PURE__ */ c("p", { style: { fontSize: "12px", color: "#666", marginTop: "8px" }, children: "Note: Entity ownership is typically set at initialization. Use this to update business context." })
        ] }),
        /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-section", children: [
          /* @__PURE__ */ c("h4", { style: { marginBottom: "8px", fontSize: "14px", fontWeight: "600" }, children: "Update Business Context" }),
          /* @__PURE__ */ c("p", { style: { marginBottom: "12px", fontSize: "12px", color: "#666" }, children: "Update dynamic metadata like order IDs, table IDs, status, etc." }),
          /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-field", children: [
            /* @__PURE__ */ c("label", { htmlFor: "tag", children: "Tag:" }),
            /* @__PURE__ */ c(
              "input",
              {
                id: "tag",
                type: "text",
                value: M,
                onChange: (f) => P(f.target.value),
                placeholder: "e.g., customer-inquiry, support",
                className: "chat-wrapper__dev-settings-input",
                disabled: D || !y
              }
            ),
            /* @__PURE__ */ c("p", { className: "chat-wrapper__dev-settings-help", children: "Optional tag for categorizing the thread." })
          ] }),
          /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-field", children: [
            /* @__PURE__ */ c("label", { htmlFor: "metadata", children: "Metadata (JSON):" }),
            /* @__PURE__ */ c(
              "textarea",
              {
                id: "metadata",
                value: L,
                onChange: (f) => T(f.target.value),
                placeholder: '{"orderId": "order_789", "tableId": "table_5", "status": "pending"}',
                className: "chat-wrapper__dev-settings-input",
                rows: 4,
                disabled: D || !y
              }
            ),
            /* @__PURE__ */ c("p", { className: "chat-wrapper__dev-settings-help", children: "App-specific business data (orderId, tableId, campaignId, etc.)." })
          ] })
        ] }),
        /* @__PURE__ */ c("div", { style: { borderTop: "1px solid #e0e0e0", margin: "20px 0" } }),
        /* @__PURE__ */ _("details", { style: { marginTop: "16px" }, children: [
          /* @__PURE__ */ c("summary", { style: { cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#666" }, children: "Advanced: Change Entity Ownership (Rare)" }),
          /* @__PURE__ */ _("div", { style: { marginTop: "12px", padding: "12px", backgroundColor: "#f9f9f9", borderRadius: "4px" }, children: [
            /* @__PURE__ */ c("p", { style: { fontSize: "12px", color: "#666", marginBottom: "12px" }, children: "⚠️ Entity is typically set at initialization. Only change this if transferring conversation ownership." }),
            /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-field", children: [
              /* @__PURE__ */ c("label", { htmlFor: "entity-id", children: "Entity ID:" }),
              /* @__PURE__ */ c(
                "input",
                {
                  id: "entity-id",
                  type: "text",
                  value: w,
                  onChange: (f) => R(f.target.value),
                  placeholder: "e.g., brand_123 or account_456",
                  className: "chat-wrapper__dev-settings-input",
                  disabled: D || !y
                }
              ),
              /* @__PURE__ */ c("p", { className: "chat-wrapper__dev-settings-help", children: "The brand or account ID to attach this thread to." })
            ] }),
            /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-field", children: [
              /* @__PURE__ */ c("label", { htmlFor: "entity-type", children: "Entity Type:" }),
              /* @__PURE__ */ _(
                "select",
                {
                  id: "entity-type",
                  value: S,
                  onChange: (f) => x(f.target.value),
                  className: "chat-wrapper__dev-settings-input",
                  disabled: D || !y,
                  children: [
                    /* @__PURE__ */ c("option", { value: "", children: "-- Select Type --" }),
                    /* @__PURE__ */ c("option", { value: "BRAND", children: "BRAND" }),
                    /* @__PURE__ */ c("option", { value: "ACCOUNT", children: "ACCOUNT" })
                  ]
                }
              ),
              /* @__PURE__ */ c("p", { className: "chat-wrapper__dev-settings-help", children: "Type of entity (BRAND or ACCOUNT)." })
            ] })
          ] })
        ] })
      ] }),
      F === "connection" && !D && /* @__PURE__ */ _(ft, { children: [
        /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-info", children: [
          /* @__PURE__ */ _("p", { children: [
            /* @__PURE__ */ c("strong", { children: "Connection Status:" }),
            " ",
            s ? "🟢 Connected" : "🔴 Disconnected"
          ] }),
          /* @__PURE__ */ c("p", { style: { fontSize: "12px", color: "#666", marginTop: "8px" }, children: "Manage your WebSocket connection to the chat server." })
        ] }),
        /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-section", children: [
          /* @__PURE__ */ c("h4", { style: { marginBottom: "8px", fontSize: "14px", fontWeight: "600" }, children: "Disconnect WebSocket" }),
          /* @__PURE__ */ c("p", { style: { marginBottom: "12px", fontSize: "12px", color: "#666" }, children: "Click the button below to manually disconnect the WebSocket connection. This will stop all communication with the chat server." }),
          /* @__PURE__ */ c(
            "button",
            {
              className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
              onClick: de,
              disabled: !s || !o,
              style: { width: "100%", marginTop: "12px" },
              children: s ? "Disconnect WebSocket" : "Already Disconnected"
            }
          ),
          !o && /* @__PURE__ */ c("p", { style: { fontSize: "12px", color: "#ff6b6b", marginTop: "8px" }, children: "⚠️ Disconnect function not available" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ _("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ c(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: we,
          disabled: D,
          children: "Cancel"
        }
      ),
      F === "agent" && /* @__PURE__ */ c(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: X,
          disabled: D || !l,
          children: D ? "Saving..." : "Save & Reload"
        }
      ),
      F === "thread" && /* @__PURE__ */ c(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: J,
          disabled: D || !y,
          children: D ? "Updating..." : "Update Thread"
        }
      )
    ] })
  ] }) }) : null;
}, xo = {
  maxReconnectAttempts: 1 / 0,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, wn = {
  NORMAL: 1e3,
  // Normal closure
  GOING_AWAY: 1001
};
var nt = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(nt || {}), ct = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e.STOP_RUN = "stop_run", e))(ct || {}), De = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.THREAD_CREATED = "thread_created", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(De || {}), xn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(xn || {}), Rt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(Rt || {});
class Gt {
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
class xt {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(t) {
    return {
      type: ct.CHAT_MESSAGE,
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
      type: ct.CONFIGURE_TOOLS,
      toolSchemas: t,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(t) {
    return {
      type: ct.UPDATE_TOOLS,
      toolSchemas: t
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(t) {
    return {
      type: ct.UPDATE_CONTEXT_HELPERS,
      contextHelpers: t
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(t, n) {
    return {
      type: ct.TOOL_CALL_RESPONSE,
      callId: t,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(t, n) {
    return {
      type: ct.TOOL_CALL_RESPONSE,
      callId: t,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: ct.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(t, n) {
    return {
      type: ct.HEARTBEAT_PONG,
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
      type: ct.STOP_RUN,
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
class bo {
  constructor(t, n) {
    G(this, "ws", null);
    G(this, "config");
    G(this, "connectionState");
    G(this, "reconnectTimer", null);
    G(this, "heartbeatInterval", null);
    G(this, "visibilityChangeHandler");
    G(this, "currentTicket", null);
    G(this, "currentSessionId", null);
    G(this, "intentionalDisconnect", !1);
    // Track intentional disconnects
    G(this, "onOpen");
    G(this, "onMessage");
    G(this, "onError");
    G(this, "onClose");
    G(this, "onSystemEvent");
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
    if (t = t.endsWith("/ws") ? t : t + "/ws", this.currentSessionId) {
      const n = t.includes("?") ? "&" : "?";
      return t = `${t}${n}sessionId=${this.currentSessionId}`, t;
    }
    if (this.currentTicket) {
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
    }), this.processConnectionClosure(t), (n = this.onClose) == null || n.call(this, t), this.shouldReconnectAfterClose(t.code) ? (console.log("[WebSocketManager] Should reconnect, calling attemptReconnect"), this.attemptReconnect()) : console.log("[WebSocketManager] Should NOT reconnect");
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
      NORMAL: wn.NORMAL,
      GOING_AWAY: wn.GOING_AWAY
    }), this.intentionalDisconnect)
      return console.log("[WebSocketManager] Intentional disconnect - no reconnect"), !1;
    const { NORMAL: n } = wn, r = t !== n;
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
        Gt.connectionLost("Max reconnection attempts reached")
      ), this.connectionState.setReconnecting(!1);
      return;
    }
    if (this.reconnectTimer !== null) {
      console.log("[WebSocketManager] Reconnection already in progress, skipping");
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    console.log("[WebSocketManager] Firing RECONNECTING event", { attempt: t, maxAttempts: n }), (s = this.onSystemEvent) == null || s.call(this, Gt.reconnecting(t, n));
    const r = this.config.reconnectDelay, i = Math.random() * 90 + 10, a = r + i;
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null, this.connectionState.isConnected || this.reconnect();
    }, a);
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
  /**
   * Update the sessionId to be used for reconnections.
   * The server issues a sessionId in the `session_established` message which
   * should be used for subsequent reconnect attempts (tickets can be single-use).
   */
  updateSession(t) {
    this.currentSessionId = t;
  }
  setupReconnectHandlers() {
    this.ws && (this.ws.onopen = () => this.handleReconnectionOpened(), this.ws.onerror = () => this.handleReconnectionError(), this.ws.onmessage = (t) => {
      var n;
      return (n = this.onMessage) == null ? void 0 : n.call(this, t);
    }, this.ws.onclose = (t) => this.handleReconnectionClosed(t));
  }
  handleReconnectionOpened() {
    var t, n;
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Gt.connectionRestored()), (n = this.onOpen) == null || n.call(this);
  }
  handleReconnectionError() {
    this.scheduleReconnectAfterError();
  }
  scheduleReconnectAfterError() {
    const t = this.config.reconnectDelay, n = Math.random() * 90 + 10, r = t + n;
    this.reconnectTimer !== null && (window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null), setTimeout(
      () => this.attemptReconnect(),
      r
    );
  }
  handleReconnectionClosed(t) {
    this.processConnectionClosure(t), this.shouldReconnectAfterClose(t.code) ? this.attemptReconnect() : this.connectionState.setReconnecting(!1);
  }
  startHeartbeat() {
  }
  sendHeartbeat() {
    const t = xt.serializeHeartbeatPing();
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
    this.ws && this.ws.close(wn.NORMAL);
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
class vo {
  constructor() {
    G(this, "state");
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
class Rn {
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
class Ji {
  constructor(t = {}) {
    G(this, "handlers", {});
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
const K = {
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
}, be = {
  isThinkingMessage: (e) => e.startsWith(K.THINKING_PREFIX) || e.startsWith(K.REASONING_PREFIX) || e.startsWith(K.THOUGHT_PREFIX),
  isCompletedMessage: (e) => e.includes(K.COMPLETED_MARKER),
  isErrorMessage: (e) => e.includes(K.ERROR_MARKER),
  isHandlingMessage: (e) => e.includes(K.HANDLING_MARKER),
  extractDuration: (e) => {
    const t = e.match(K.PATTERNS.DURATION);
    return t ? ` for ${t[1]} seconds` : void 0;
  },
  cleanReasoningContent: (e) => {
    let t = e.replace(new RegExp(`^${K.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${K.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${K.THOUGHT_PREFIX}\\s*`), "");
    return t = t.replace(/\s*for [\d.]+\s*seconds$/, ""), t = t.replace(K.PATTERNS.THOUGHT_CONTENT, ""), t.trim();
  },
  getMessageType: (e, t) => t === !1 ? be.isErrorMessage(e) ? K.MESSAGE_TYPES.ERROR : (be.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || be.isThinkingMessage(e), K.MESSAGE_TYPES.THOUGHT) : be.isCompletedMessage(e) ? K.MESSAGE_TYPES.COMPLETED : be.isErrorMessage(e) ? K.MESSAGE_TYPES.ERROR : (be.isHandlingMessage(e) || be.isThinkingMessage(e) && !e.includes(K.UI_TEXT.AI_IS_THINKING), K.MESSAGE_TYPES.THINKING)
};
class Io extends Ji {
  constructor(n) {
    super({ onReasoningUpdate: n });
    G(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    G(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, o) {
    const s = this.getHandler("onReasoningUpdate");
    if (!s) return;
    const l = Rn.createReasoningCall(
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
    const o = `${K.THINKING_PREFIX} ${a}`;
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
    const s = i || K.UI_TEXT.THOUGHT, l = `${K.THOUGHT_PREFIX} ${s}${o}`;
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
class Ro extends Ji {
  constructor(n = {}, r) {
    super({ onReasoningUpdate: r });
    G(this, "processedToolCalls", /* @__PURE__ */ new Set());
    G(this, "clientTools", {});
    G(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var o, s, l;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (o = this.getHandler("onReasoningUpdate")) == null || o(!0, `${K.HANDLING_MARKER} ${i}`, n);
      try {
        const u = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, u), (s = this.getHandler("onReasoningUpdate")) == null || s(!1, `${K.COMPLETED_MARKER} ${i}`, n);
      } catch (u) {
        this.sendToolError(r, u), (l = this.getHandler("onReasoningUpdate")) == null || l(!1, `${K.ERROR_MARKER} Error: ${i} - ${u}`, n);
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
    const i = xt.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = xt.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = Rn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId,
        n.args || {}
      );
      r(!0, `${K.HANDLING_MARKER} ${n.toolName}`, a);
    }
  }
  handleServerToolResult(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = Rn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId
      );
      r(
        !1,
        `${K.COMPLETED_MARKER} ${n.toolName}`,
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
class Ao {
  constructor(t, n = {}) {
    G(this, "reasoningHandler");
    G(this, "toolHandler");
    G(this, "handlers");
    G(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new Io(t.onReasoningUpdate), this.toolHandler = new Ro(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case De.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case De.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case De.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case De.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case De.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case De.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case De.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case De.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case De.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case De.HEARTBEAT_ACK:
          break;
        case De.ERROR:
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
      case xn.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case xn.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case xn.CONTENT_DELTA:
        (n = t.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, t.data.delta));
        break;
    }
  }
  handleProviderEvent(t) {
    var r, i, a;
    switch ((r = t.data) == null ? void 0 : r.type) {
      case Rt.TEXT_DELTA:
        t.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, t.data.textDelta));
        break;
      case Rt.REASONING_START:
        this.reasoningHandler.handleReasoningStart(t.data);
        break;
      case Rt.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(t.data);
        break;
      case Rt.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(t.data);
        break;
      case Rt.TOOL_CALL:
        this.toolHandler.handleServerToolCall(t.data);
        break;
      case Rt.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(t.data);
        break;
    }
  }
  handleLatitudeEvent(t) {
    var n;
    if (((n = t.data) == null ? void 0 : n.type) === Rt.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = t.data;
      if (r.toolCallId && r.toolName) {
        const i = Rn.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${K.COMPLETED_MARKER} ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Gt.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      Gt.chatError(t.error || "Unknown error")
    );
  }
  handleToolCallRequest(t) {
    this.toolHandler.handleToolCallRequest(t);
  }
  handleHeartbeatPing(t) {
    if (!this.sendMessage)
      return;
    const n = xt.serializeHeartbeatPong(
      t.timestamp,
      t.pingTime
    );
    this.sendMessage(n);
  }
  handleError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      Gt.chatError(t.error || "Unknown WebSocket error")
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
async function No(e, t) {
  const n = {
    "Content-Type": "application/json"
  };
  t != null && t.userMpAuthToken && (n["x-oddle-mp-auth-token"] = t.userMpAuthToken), t != null && t.chatServerKey && (n["x-oddle-chat-server-key"] = t.chatServerKey);
  try {
    const r = await fetch(`${e}/api/v1/tickets`, {
      method: "POST",
      headers: n,
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
function sr(e) {
  if (!e.success || !e.ticket || !e.expiresAt)
    return !1;
  const t = new Date(e.expiresAt).getTime();
  return Date.now() < t - 3e4;
}
function jr(e) {
  const t = sr(e), n = new Date(e.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: t,
    expiresIn: i,
    expired: r >= n
  };
}
function Mo(e) {
  var r, i, a;
  const t = ((r = e == null ? void 0 : e.message) == null ? void 0 : r.toLowerCase()) || "", n = ((i = e == null ? void 0 : e.name) == null ? void 0 : i.toLowerCase()) || "";
  if (t.includes("cors") || t.includes("cross-origin") || t.includes("blocked by cors") || n === "typeerror" && t.includes("fetch"))
    return {
      isRetryable: !1,
      reason: "CORS error detected",
      errorType: "cors"
    };
  if (t.includes("unauthorized") || t.includes("forbidden") || t.includes("authentication") || t.includes("invalid token") || t.includes("access denied"))
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
function jt(e, t) {
  const n = Mo(e);
  return console.error(`[${t}] Error occurred:`, {
    error: (e == null ? void 0 : e.message) || e,
    classification: n,
    shouldRetry: n.isRetryable
  }), n;
}
class Lo {
  constructor(t, n, r = {}) {
    G(this, "ticket", null);
    G(this, "refreshPromise", null);
    G(this, "validationInterval", null);
    G(this, "authData");
    G(this, "apiUrl");
    G(this, "config");
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
    return this.ticket && sr(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
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
      apiUrl: this.apiUrl
    });
    try {
      return this.ticket = await No(this.apiUrl, this.authData), console.log("TicketManager: Ticket received successfully", {
        hasTicket: !!this.ticket.ticket,
        expiresAt: this.ticket.expiresAt
      }), this.ticket.ticket;
    } catch (t) {
      const n = jt(t, "TicketManager");
      throw n.isRetryable ? new Error(
        `Ticket refresh failed (retryable): ${t instanceof Error ? t.message : "Unknown error"}`
      ) : new Error(
        `Ticket refresh failed (non-retryable - ${n.reason}): ${t instanceof Error ? t.message : "Unknown error"}`
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
      const r = jr(this.ticket).expiresIn / 1e3;
      r < this.config.renewalThreshold && (console.log(
        `TicketManager: Ticket expires in ${r.toFixed(0)}s, renewing...`
      ), await this.refreshTicket(), console.log("TicketManager: Ticket renewed proactively"), t == null || t());
    } catch (n) {
      const r = jt(n, "TicketManager:ProactiveRenewal");
      r.isRetryable || (console.warn(`TicketManager: Stopping proactive renewal due to non-retryable error: ${r.reason}`), this.stopProactiveRenewal());
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
    return this.ticket ? sr(this.ticket) : !1;
  }
  /**
   * Get time until ticket expires (in milliseconds)
   */
  getExpiresIn() {
    if (this.ticket)
      try {
        return jr(this.ticket).expiresIn;
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
class Oo {
  constructor() {
    G(this, "config");
    G(this, "connectionState");
    G(this, "wsManager");
    G(this, "messageHandler");
    G(this, "initResolve");
    G(this, "initReject");
    // Client tools and context
    G(this, "toolSchemas", []);
    G(this, "contextHelpers", {});
    // Ticket management - now centralized in TicketManager
    G(this, "ticketManager", null);
    // Authentication credentials for HTTP API calls
    G(this, "authCredentials", {});
    this.config = {
      ...xo
    }, this.connectionState = new vo(), this.wsManager = new bo(this.config, this.connectionState), this.messageHandler = new Ao({}), this.setupWebSocketHandlers();
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
    var r, i, a, o;
    const n = this.messageHandler.handleMessage(t);
    if ((n == null ? void 0 : n.type) === "authentication_error" && (console.error(
      "WebSocket authentication failed:",
      n == null ? void 0 : n.error,
      n == null ? void 0 : n.code
    ), this.handleAuthenticationFailure(n)), (n == null ? void 0 : n.type) === De.THREAD_CREATED) {
      (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onThreadCreated) == null || i.call(r, n.data);
      return;
    }
    if ((n == null ? void 0 : n.type) === De.TOOLS_CONFIGURED) {
      (a = this.initResolve) == null || a.call(this);
      return;
    }
    if ((n == null ? void 0 : n.type) === De.SESSION_ESTABLISHED && (this.toolSchemas && this.toolSchemas.length > 0 ? this.sendToolConfiguration() : (o = this.initResolve) == null || o.call(this)), (n == null ? void 0 : n.type) === De.SESSION_ESTABLISHED) {
      const s = n == null ? void 0 : n.sessionId;
      s && this.wsManager.updateSession(s);
    }
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
      const o = jt(a, "TicketRefresh");
      o.isRetryable || console.warn(`[WebSocketClient] Ticket refresh failed, will not retry: ${o.reason}`), (s = this.initReject) == null || s.call(this, a);
    })) : (i = this.initReject) == null || i.call(
      this,
      new Error(`Authentication failed: ${n == null ? void 0 : n.error}`)
    );
  }
  sendToolConfiguration() {
    const t = xt.serializeConfigureTools(
      this.toolSchemas,
      this.contextHelpers
    );
    this.wsManager.send(t);
  }
  async onInit(t) {
    return this.setupEventHandlers(t), this.setupToolsAndContext(t), this.updateConfig(t), this.authCredentials = {
      userMpAuthToken: t.userMpAuthToken,
      chatServerKey: t.chatServerKey
    }, this.ticketManager = new Lo(
      {
        userMpAuthToken: t.userMpAuthToken,
        chatServerKey: t.chatServerKey,
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
    if (!this.connectionState.isConnected)
      throw new Error("Client not connected");
    const { message: n, media: r, providerResId: i } = t;
    try {
      this.messageHandler.clearProcessedToolCalls();
      const a = xt.serializeChatMessage({
        content: n,
        media: r,
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
    const n = xt.serializeUpdateContextHelpers(
      this.contextHelpers
    );
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = xt.serializeUpdateTools(this.toolSchemas);
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
  /**
   * Stop the current conversation run
   * Sends a stop_run message to the server to halt the current response generation
   */
  stopRun(t) {
    if (!this.connectionState.isConnected) {
      console.warn("WebSocketChatClient: Cannot stop run - client not connected");
      return;
    }
    console.log("WebSocketChatClient: Stopping conversation run:", t);
    const n = xt.serializeStopRun(t);
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
    console.log(
      `WebSocketChatClient: Updating entity attachment - providerResId: ${t}, entityId: ${n}, entityType: ${r}`
    );
    try {
      await Xi(
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
      throw console.error(
        "WebSocketChatClient: Failed to update entity attachment:",
        i
      ), i;
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
      await Yi(
        this.config.apiUrl,
        t,
        n,
        this.authCredentials
      ), console.log("WebSocketChatClient: Thread metadata updated successfully");
    } catch (r) {
      throw console.error(
        "WebSocketChatClient: Failed to update thread metadata:",
        r
      ), r;
    }
  }
}
function Do({
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
  onSystemEvent: l,
  onReasoningUpdate: u,
  onThreadCreated: h
}) {
  const [p, m] = ie(
    null
  ), [d, y] = ie(!1), [w, R] = ie(!1), [S, x] = ie(!1), [M, P] = ie(0), L = ve(null), T = ve(s), D = ve(l), O = ve(u), $ = ve(h);
  ye(() => {
    T.current = s, D.current = l, O.current = u, $.current = h;
  }, [s, l, u, h]);
  const { toolSchemas: z, clientToolExecutors: N } = Ce(() => {
    if (a && a.length > 0) {
      const H = a.map(({ execute: J, ...de }) => de), X = {};
      return a.forEach((J) => {
        X[J.name] = J.execute;
      }), {
        toolSchemas: H,
        clientToolExecutors: X
      };
    }
    return {
      toolSchemas: [],
      clientToolExecutors: {}
    };
  }, [a]), b = ve(), F = te(async () => {
    try {
      if (R(!0), !e)
        throw new Error("userMpAuthToken is required");
      if (!t)
        throw new Error("chatServerUrl is required");
      if (!n)
        throw new Error("chatServerKey is required");
      const H = new Oo();
      L.current = H, m(H);
      const X = o || {};
      await H.onInit({
        // Authentication and server properties
        userMpAuthToken: e,
        chatServerUrl: t,
        chatServerKey: n,
        entityId: r,
        entityType: i == null ? void 0 : i.toString(),
        // Tools configuration
        toolSchemas: z,
        clientTools: N,
        contextHelpers: X,
        onSetMessage: T.current,
        onSystemEvent: D.current,
        onReasoningUpdate: O.current,
        onThreadCreated: $.current
      }), y(!0);
    } catch (H) {
      const X = jt(H, "WebSocketConnection");
      y(!1), X.isRetryable ? (console.log(`[WebSocketConnection] Will retry in 2s: ${X.reason}`), setTimeout(() => {
        var J;
        (L.current === null || !L.current.getConnectionStatus().connected) && ((J = b.current) == null || J.call(b));
      }, 2e3)) : console.warn(`[WebSocketConnection] Will not retry: ${X.reason}`);
    } finally {
      R(!1);
    }
  }, [
    e,
    t,
    n,
    r,
    i,
    z,
    N,
    o
    // Removed onSetMessage, onSystemEvent, onReasoningUpdate to prevent reconnections
  ]), W = te(() => {
    L.current && (L.current.disconnect(), L.current = null), m(null), y(!1);
  }, []);
  return b.current = F, ye(() => (F(), () => {
    W();
  }), [F, W]), ye(() => {
    const H = setInterval(() => {
      if (L.current) {
        const X = L.current.getConnectionStatus();
        y(X.connected), x(X.isReconnecting), P(X.reconnectAttempts);
      }
    }, 1e3);
    return () => clearInterval(H);
  }, []), {
    chatClient: p,
    isConnected: d,
    isConnecting: w,
    isReconnecting: S,
    reconnectAttempts: M,
    connectChatClient: F,
    disconnectChatClient: W
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: Qi,
  setPrototypeOf: Zr,
  isFrozen: Po,
  getPrototypeOf: Ho,
  getOwnPropertyDescriptor: Fo
} = Object;
let {
  freeze: ze,
  seal: it,
  create: lr
} = Object, {
  apply: cr,
  construct: ur
} = typeof Reflect < "u" && Reflect;
ze || (ze = function(t) {
  return t;
});
it || (it = function(t) {
  return t;
});
cr || (cr = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
ur || (ur = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const Sn = Be(Array.prototype.forEach), Uo = Be(Array.prototype.lastIndexOf), Kr = Be(Array.prototype.pop), Yt = Be(Array.prototype.push), zo = Be(Array.prototype.splice), bn = Be(String.prototype.toLowerCase), Gn = Be(String.prototype.toString), Vn = Be(String.prototype.match), Jt = Be(String.prototype.replace), Bo = Be(String.prototype.indexOf), Wo = Be(String.prototype.trim), st = Be(Object.prototype.hasOwnProperty), Ue = Be(RegExp.prototype.test), Qt = Go(TypeError);
function Be(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return cr(e, t, r);
  };
}
function Go(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return ur(e, n);
  };
}
function ee(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : bn;
  Zr && Zr(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (Po(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function Vo(e) {
  for (let t = 0; t < e.length; t++)
    st(e, t) || (e[t] = null);
  return e;
}
function kt(e) {
  const t = lr(null);
  for (const [n, r] of Qi(e))
    st(e, n) && (Array.isArray(r) ? t[n] = Vo(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = kt(r) : t[n] = r);
  return t;
}
function en(e, t) {
  for (; e !== null; ) {
    const r = Fo(e, t);
    if (r) {
      if (r.get)
        return Be(r.get);
      if (typeof r.value == "function")
        return Be(r.value);
    }
    e = Ho(e);
  }
  function n() {
    return null;
  }
  return n;
}
const qr = ze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), $n = ze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), jn = ze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), $o = ze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Zn = ze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), jo = ze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Xr = ze(["#text"]), Yr = ze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Kn = ze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Jr = ze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), En = ze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Zo = it(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Ko = it(/<%[\w\W]*|[\w\W]*%>/gm), qo = it(/\$\{[\w\W]*/gm), Xo = it(/^data-[\-\w.\u00B7-\uFFFF]+$/), Yo = it(/^aria-[\-\w]+$/), ea = it(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Jo = it(/^(?:\w+script|data):/i), Qo = it(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), ta = it(/^html$/i), es = it(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Qr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Yo,
  ATTR_WHITESPACE: Qo,
  CUSTOM_ELEMENT: es,
  DATA_ATTR: Xo,
  DOCTYPE_NAME: ta,
  ERB_EXPR: Ko,
  IS_ALLOWED_URI: ea,
  IS_SCRIPT_OR_DATA: Jo,
  MUSTACHE_EXPR: Zo,
  TMPLIT_EXPR: qo
});
const tn = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, ts = function() {
  return typeof window > "u" ? null : window;
}, ns = function(t, n) {
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
}, ei = function() {
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
function na() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ts();
  const t = (V) => na(V);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== tn.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: o,
    Node: s,
    Element: l,
    NodeFilter: u,
    NamedNodeMap: h = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: p,
    DOMParser: m,
    trustedTypes: d
  } = e, y = l.prototype, w = en(y, "cloneNode"), R = en(y, "remove"), S = en(y, "nextSibling"), x = en(y, "childNodes"), M = en(y, "parentNode");
  if (typeof o == "function") {
    const V = n.createElement("template");
    V.content && V.content.ownerDocument && (n = V.content.ownerDocument);
  }
  let P, L = "";
  const {
    implementation: T,
    createNodeIterator: D,
    createDocumentFragment: O,
    getElementsByTagName: $
  } = n, {
    importNode: z
  } = r;
  let N = ei();
  t.isSupported = typeof Qi == "function" && typeof M == "function" && T && T.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: b,
    ERB_EXPR: F,
    TMPLIT_EXPR: W,
    DATA_ATTR: H,
    ARIA_ATTR: X,
    IS_SCRIPT_OR_DATA: J,
    ATTR_WHITESPACE: de,
    CUSTOM_ELEMENT: we
  } = Qr;
  let {
    IS_ALLOWED_URI: f
  } = Qr, Q = null;
  const Ie = ee({}, [...qr, ...$n, ...jn, ...Zn, ...Xr]);
  let g = null;
  const Se = ee({}, [...Yr, ...Kn, ...Jr, ...En]);
  let re = Object.seal(lr(null, {
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
  })), oe = null, je = null;
  const Te = Object.seal(lr(null, {
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
  let tt = !0, _e = !0, Me = !1, Nt = !0, at = !1, mt = !0, Ze = !1, Ct = !1, yt = !1, ot = !1, wt = !1, St = !1, Mt = !0, Lt = !1;
  const Ht = "user-content-";
  let Et = !0, Ke = !1, E = {}, A = null;
  const j = ee({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let B = null;
  const ne = ee({}, ["audio", "video", "img", "source", "image", "track"]);
  let Re = null;
  const Fe = ee({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Le = "http://www.w3.org/1998/Math/MathML", qe = "http://www.w3.org/2000/svg", Ee = "http://www.w3.org/1999/xhtml";
  let he = Ee, Ae = !1, ke = null;
  const qt = ee({}, [Le, qe, Ee], Gn);
  let Ot = ee({}, ["mi", "mo", "mn", "ms", "mtext"]), Ft = ee({}, ["annotation-xml"]);
  const Un = ee({}, ["title", "style", "font", "a", "script"]);
  let bt = null;
  const pn = ["application/xhtml+xml", "text/html"], fn = "text/html";
  let pe = null, Tt = null;
  const gn = n.createElement("form"), Xt = function(C) {
    return C instanceof RegExp || C instanceof Function;
  }, Ut = function() {
    let C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Tt && Tt === C)) {
      if ((!C || typeof C != "object") && (C = {}), C = kt(C), bt = // eslint-disable-next-line unicorn/prefer-includes
      pn.indexOf(C.PARSER_MEDIA_TYPE) === -1 ? fn : C.PARSER_MEDIA_TYPE, pe = bt === "application/xhtml+xml" ? Gn : bn, Q = st(C, "ALLOWED_TAGS") ? ee({}, C.ALLOWED_TAGS, pe) : Ie, g = st(C, "ALLOWED_ATTR") ? ee({}, C.ALLOWED_ATTR, pe) : Se, ke = st(C, "ALLOWED_NAMESPACES") ? ee({}, C.ALLOWED_NAMESPACES, Gn) : qt, Re = st(C, "ADD_URI_SAFE_ATTR") ? ee(kt(Fe), C.ADD_URI_SAFE_ATTR, pe) : Fe, B = st(C, "ADD_DATA_URI_TAGS") ? ee(kt(ne), C.ADD_DATA_URI_TAGS, pe) : ne, A = st(C, "FORBID_CONTENTS") ? ee({}, C.FORBID_CONTENTS, pe) : j, oe = st(C, "FORBID_TAGS") ? ee({}, C.FORBID_TAGS, pe) : kt({}), je = st(C, "FORBID_ATTR") ? ee({}, C.FORBID_ATTR, pe) : kt({}), E = st(C, "USE_PROFILES") ? C.USE_PROFILES : !1, tt = C.ALLOW_ARIA_ATTR !== !1, _e = C.ALLOW_DATA_ATTR !== !1, Me = C.ALLOW_UNKNOWN_PROTOCOLS || !1, Nt = C.ALLOW_SELF_CLOSE_IN_ATTR !== !1, at = C.SAFE_FOR_TEMPLATES || !1, mt = C.SAFE_FOR_XML !== !1, Ze = C.WHOLE_DOCUMENT || !1, ot = C.RETURN_DOM || !1, wt = C.RETURN_DOM_FRAGMENT || !1, St = C.RETURN_TRUSTED_TYPE || !1, yt = C.FORCE_BODY || !1, Mt = C.SANITIZE_DOM !== !1, Lt = C.SANITIZE_NAMED_PROPS || !1, Et = C.KEEP_CONTENT !== !1, Ke = C.IN_PLACE || !1, f = C.ALLOWED_URI_REGEXP || ea, he = C.NAMESPACE || Ee, Ot = C.MATHML_TEXT_INTEGRATION_POINTS || Ot, Ft = C.HTML_INTEGRATION_POINTS || Ft, re = C.CUSTOM_ELEMENT_HANDLING || {}, C.CUSTOM_ELEMENT_HANDLING && Xt(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (re.tagNameCheck = C.CUSTOM_ELEMENT_HANDLING.tagNameCheck), C.CUSTOM_ELEMENT_HANDLING && Xt(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (re.attributeNameCheck = C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), C.CUSTOM_ELEMENT_HANDLING && typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (re.allowCustomizedBuiltInElements = C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), at && (_e = !1), wt && (ot = !0), E && (Q = ee({}, Xr), g = [], E.html === !0 && (ee(Q, qr), ee(g, Yr)), E.svg === !0 && (ee(Q, $n), ee(g, Kn), ee(g, En)), E.svgFilters === !0 && (ee(Q, jn), ee(g, Kn), ee(g, En)), E.mathMl === !0 && (ee(Q, Zn), ee(g, Jr), ee(g, En))), C.ADD_TAGS && (typeof C.ADD_TAGS == "function" ? Te.tagCheck = C.ADD_TAGS : (Q === Ie && (Q = kt(Q)), ee(Q, C.ADD_TAGS, pe))), C.ADD_ATTR && (typeof C.ADD_ATTR == "function" ? Te.attributeCheck = C.ADD_ATTR : (g === Se && (g = kt(g)), ee(g, C.ADD_ATTR, pe))), C.ADD_URI_SAFE_ATTR && ee(Re, C.ADD_URI_SAFE_ATTR, pe), C.FORBID_CONTENTS && (A === j && (A = kt(A)), ee(A, C.FORBID_CONTENTS, pe)), Et && (Q["#text"] = !0), Ze && ee(Q, ["html", "head", "body"]), Q.table && (ee(Q, ["tbody"]), delete oe.tbody), C.TRUSTED_TYPES_POLICY) {
        if (typeof C.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Qt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof C.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Qt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        P = C.TRUSTED_TYPES_POLICY, L = P.createHTML("");
      } else
        P === void 0 && (P = ns(d, i)), P !== null && typeof L == "string" && (L = P.createHTML(""));
      ze && ze(C), Tt = C;
    }
  }, mn = ee({}, [...$n, ...jn, ...$o]), zn = ee({}, [...Zn, ...jo]), Cn = function(C) {
    let I = M(C);
    (!I || !I.tagName) && (I = {
      namespaceURI: he,
      tagName: "template"
    });
    const U = bn(C.tagName), ue = bn(I.tagName);
    return ke[C.namespaceURI] ? C.namespaceURI === qe ? I.namespaceURI === Ee ? U === "svg" : I.namespaceURI === Le ? U === "svg" && (ue === "annotation-xml" || Ot[ue]) : !!mn[U] : C.namespaceURI === Le ? I.namespaceURI === Ee ? U === "math" : I.namespaceURI === qe ? U === "math" && Ft[ue] : !!zn[U] : C.namespaceURI === Ee ? I.namespaceURI === qe && !Ft[ue] || I.namespaceURI === Le && !Ot[ue] ? !1 : !zn[U] && (Un[U] || !mn[U]) : !!(bt === "application/xhtml+xml" && ke[C.namespaceURI]) : !1;
  }, Xe = function(C) {
    Yt(t.removed, {
      element: C
    });
    try {
      M(C).removeChild(C);
    } catch {
      R(C);
    }
  }, k = function(C, I) {
    try {
      Yt(t.removed, {
        attribute: I.getAttributeNode(C),
        from: I
      });
    } catch {
      Yt(t.removed, {
        attribute: null,
        from: I
      });
    }
    if (I.removeAttribute(C), C === "is")
      if (ot || wt)
        try {
          Xe(I);
        } catch {
        }
      else
        try {
          I.setAttribute(C, "");
        } catch {
        }
  }, ce = function(C) {
    let I = null, U = null;
    if (yt)
      C = "<remove></remove>" + C;
    else {
      const ge = Vn(C, /^[\r\n\t ]+/);
      U = ge && ge[0];
    }
    bt === "application/xhtml+xml" && he === Ee && (C = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + C + "</body></html>");
    const ue = P ? P.createHTML(C) : C;
    if (he === Ee)
      try {
        I = new m().parseFromString(ue, bt);
      } catch {
      }
    if (!I || !I.documentElement) {
      I = T.createDocument(he, "template", null);
      try {
        I.documentElement.innerHTML = Ae ? L : ue;
      } catch {
      }
    }
    const Oe = I.body || I.documentElement;
    return C && U && Oe.insertBefore(n.createTextNode(U), Oe.childNodes[0] || null), he === Ee ? $.call(I, Ze ? "html" : "body")[0] : Ze ? I.documentElement : Oe;
  }, xe = function(C) {
    return D.call(
      C.ownerDocument || C,
      C,
      // eslint-disable-next-line no-bitwise
      u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT | u.SHOW_PROCESSING_INSTRUCTION | u.SHOW_CDATA_SECTION,
      null
    );
  }, fe = function(C) {
    return C instanceof p && (typeof C.nodeName != "string" || typeof C.textContent != "string" || typeof C.removeChild != "function" || !(C.attributes instanceof h) || typeof C.removeAttribute != "function" || typeof C.setAttribute != "function" || typeof C.namespaceURI != "string" || typeof C.insertBefore != "function" || typeof C.hasChildNodes != "function");
  }, vt = function(C) {
    return typeof s == "function" && C instanceof s;
  };
  function Ye(V, C, I) {
    Sn(V, (U) => {
      U.call(t, C, I, Tt);
    });
  }
  const Fr = function(C) {
    let I = null;
    if (Ye(N.beforeSanitizeElements, C, null), fe(C))
      return Xe(C), !0;
    const U = pe(C.nodeName);
    if (Ye(N.uponSanitizeElement, C, {
      tagName: U,
      allowedTags: Q
    }), mt && C.hasChildNodes() && !vt(C.firstElementChild) && Ue(/<[/\w!]/g, C.innerHTML) && Ue(/<[/\w!]/g, C.textContent) || C.nodeType === tn.progressingInstruction || mt && C.nodeType === tn.comment && Ue(/<[/\w]/g, C.data))
      return Xe(C), !0;
    if (!(Te.tagCheck instanceof Function && Te.tagCheck(U)) && (!Q[U] || oe[U])) {
      if (!oe[U] && zr(U) && (re.tagNameCheck instanceof RegExp && Ue(re.tagNameCheck, U) || re.tagNameCheck instanceof Function && re.tagNameCheck(U)))
        return !1;
      if (Et && !A[U]) {
        const ue = M(C) || C.parentNode, Oe = x(C) || C.childNodes;
        if (Oe && ue) {
          const ge = Oe.length;
          for (let We = ge - 1; We >= 0; --We) {
            const _t = w(Oe[We], !0);
            _t.__removalCount = (C.__removalCount || 0) + 1, ue.insertBefore(_t, S(C));
          }
        }
      }
      return Xe(C), !0;
    }
    return C instanceof l && !Cn(C) || (U === "noscript" || U === "noembed" || U === "noframes") && Ue(/<\/no(script|embed|frames)/i, C.innerHTML) ? (Xe(C), !0) : (at && C.nodeType === tn.text && (I = C.textContent, Sn([b, F, W], (ue) => {
      I = Jt(I, ue, " ");
    }), C.textContent !== I && (Yt(t.removed, {
      element: C.cloneNode()
    }), C.textContent = I)), Ye(N.afterSanitizeElements, C, null), !1);
  }, Ur = function(C, I, U) {
    if (Mt && (I === "id" || I === "name") && (U in n || U in gn))
      return !1;
    if (!(_e && !je[I] && Ue(H, I))) {
      if (!(tt && Ue(X, I))) {
        if (!(Te.attributeCheck instanceof Function && Te.attributeCheck(I, C))) {
          if (!g[I] || je[I]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(zr(C) && (re.tagNameCheck instanceof RegExp && Ue(re.tagNameCheck, C) || re.tagNameCheck instanceof Function && re.tagNameCheck(C)) && (re.attributeNameCheck instanceof RegExp && Ue(re.attributeNameCheck, I) || re.attributeNameCheck instanceof Function && re.attributeNameCheck(I, C)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              I === "is" && re.allowCustomizedBuiltInElements && (re.tagNameCheck instanceof RegExp && Ue(re.tagNameCheck, U) || re.tagNameCheck instanceof Function && re.tagNameCheck(U)))
            ) return !1;
          } else if (!Re[I]) {
            if (!Ue(f, Jt(U, de, ""))) {
              if (!((I === "src" || I === "xlink:href" || I === "href") && C !== "script" && Bo(U, "data:") === 0 && B[C])) {
                if (!(Me && !Ue(J, Jt(U, de, "")))) {
                  if (U)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, zr = function(C) {
    return C !== "annotation-xml" && Vn(C, we);
  }, Br = function(C) {
    Ye(N.beforeSanitizeAttributes, C, null);
    const {
      attributes: I
    } = C;
    if (!I || fe(C))
      return;
    const U = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: g,
      forceKeepAttr: void 0
    };
    let ue = I.length;
    for (; ue--; ) {
      const Oe = I[ue], {
        name: ge,
        namespaceURI: We,
        value: _t
      } = Oe, zt = pe(ge), Bn = _t;
      let Ne = ge === "value" ? Bn : Wo(Bn);
      if (U.attrName = zt, U.attrValue = Ne, U.keepAttr = !0, U.forceKeepAttr = void 0, Ye(N.uponSanitizeAttribute, C, U), Ne = U.attrValue, Lt && (zt === "id" || zt === "name") && (k(ge, C), Ne = Ht + Ne), mt && Ue(/((--!?|])>)|<\/(style|title|textarea)/i, Ne)) {
        k(ge, C);
        continue;
      }
      if (zt === "attributename" && Vn(Ne, "href")) {
        k(ge, C);
        continue;
      }
      if (U.forceKeepAttr)
        continue;
      if (!U.keepAttr) {
        k(ge, C);
        continue;
      }
      if (!Nt && Ue(/\/>/i, Ne)) {
        k(ge, C);
        continue;
      }
      at && Sn([b, F, W], (Gr) => {
        Ne = Jt(Ne, Gr, " ");
      });
      const Wr = pe(C.nodeName);
      if (!Ur(Wr, zt, Ne)) {
        k(ge, C);
        continue;
      }
      if (P && typeof d == "object" && typeof d.getAttributeType == "function" && !We)
        switch (d.getAttributeType(Wr, zt)) {
          case "TrustedHTML": {
            Ne = P.createHTML(Ne);
            break;
          }
          case "TrustedScriptURL": {
            Ne = P.createScriptURL(Ne);
            break;
          }
        }
      if (Ne !== Bn)
        try {
          We ? C.setAttributeNS(We, ge, Ne) : C.setAttribute(ge, Ne), fe(C) ? Xe(C) : Kr(t.removed);
        } catch {
          k(ge, C);
        }
    }
    Ye(N.afterSanitizeAttributes, C, null);
  }, Qa = function V(C) {
    let I = null;
    const U = xe(C);
    for (Ye(N.beforeSanitizeShadowDOM, C, null); I = U.nextNode(); )
      Ye(N.uponSanitizeShadowNode, I, null), Fr(I), Br(I), I.content instanceof a && V(I.content);
    Ye(N.afterSanitizeShadowDOM, C, null);
  };
  return t.sanitize = function(V) {
    let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, I = null, U = null, ue = null, Oe = null;
    if (Ae = !V, Ae && (V = "<!-->"), typeof V != "string" && !vt(V))
      if (typeof V.toString == "function") {
        if (V = V.toString(), typeof V != "string")
          throw Qt("dirty is not a string, aborting");
      } else
        throw Qt("toString is not a function");
    if (!t.isSupported)
      return V;
    if (Ct || Ut(C), t.removed = [], typeof V == "string" && (Ke = !1), Ke) {
      if (V.nodeName) {
        const _t = pe(V.nodeName);
        if (!Q[_t] || oe[_t])
          throw Qt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (V instanceof s)
      I = ce("<!---->"), U = I.ownerDocument.importNode(V, !0), U.nodeType === tn.element && U.nodeName === "BODY" || U.nodeName === "HTML" ? I = U : I.appendChild(U);
    else {
      if (!ot && !at && !Ze && // eslint-disable-next-line unicorn/prefer-includes
      V.indexOf("<") === -1)
        return P && St ? P.createHTML(V) : V;
      if (I = ce(V), !I)
        return ot ? null : St ? L : "";
    }
    I && yt && Xe(I.firstChild);
    const ge = xe(Ke ? V : I);
    for (; ue = ge.nextNode(); )
      Fr(ue), Br(ue), ue.content instanceof a && Qa(ue.content);
    if (Ke)
      return V;
    if (ot) {
      if (wt)
        for (Oe = O.call(I.ownerDocument); I.firstChild; )
          Oe.appendChild(I.firstChild);
      else
        Oe = I;
      return (g.shadowroot || g.shadowrootmode) && (Oe = z.call(r, Oe, !0)), Oe;
    }
    let We = Ze ? I.outerHTML : I.innerHTML;
    return Ze && Q["!doctype"] && I.ownerDocument && I.ownerDocument.doctype && I.ownerDocument.doctype.name && Ue(ta, I.ownerDocument.doctype.name) && (We = "<!DOCTYPE " + I.ownerDocument.doctype.name + `>
` + We), at && Sn([b, F, W], (_t) => {
      We = Jt(We, _t, " ");
    }), P && St ? P.createHTML(We) : We;
  }, t.setConfig = function() {
    let V = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Ut(V), Ct = !0;
  }, t.clearConfig = function() {
    Tt = null, Ct = !1;
  }, t.isValidAttribute = function(V, C, I) {
    Tt || Ut({});
    const U = pe(V), ue = pe(C);
    return Ur(U, ue, I);
  }, t.addHook = function(V, C) {
    typeof C == "function" && Yt(N[V], C);
  }, t.removeHook = function(V, C) {
    if (C !== void 0) {
      const I = Uo(N[V], C);
      return I === -1 ? void 0 : zo(N[V], I, 1)[0];
    }
    return Kr(N[V]);
  }, t.removeHooks = function(V) {
    N[V] = [];
  }, t.removeAllHooks = function() {
    N = ei();
  }, t;
}
var rs = na();
function is(e) {
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
function An(e, t = !1) {
  return e;
}
function as(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function ti(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || is(e));
  } catch {
    return !1;
  }
}
function os() {
  rs.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !ti(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !ti(n) && e.removeAttribute("src");
    }
  });
}
os();
function ss() {
  const [e, t] = ie([]), n = te(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = te(
    (o, s) => {
      const u = An(s, o === "assistant");
      t((h) => [
        ...h,
        {
          id: n(),
          role: o,
          content: u,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [n]
  ), i = te(
    (o, s) => {
      t(
        (l) => l.map(
          (u) => u.id === o ? { ...u, ...s } : u
        )
      );
    },
    []
  ), a = te(
    (o, s, l) => {
      t(
        (u) => u.map(
          (h) => h.id === o ? {
            ...h,
            content: s,
            isStreaming: l
          } : h
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
function ls() {
  const e = Z((x) => x.isStreaming), t = Z((x) => x.setIsStreaming), n = Z((x) => x.isThinking), r = Z((x) => x.setIsThinking), i = Z((x) => x.streamingContent), a = Z((x) => x.setStreamingContent), o = Z((x) => x.isHandlingTool), s = Z((x) => x.setIsHandlingTool), l = Z((x) => x.startStreaming), u = Z((x) => x.stopStreaming), h = Z((x) => x.clearStreamingBuffers), p = Z((x) => x.resetToolHandling), m = ve(""), d = Ce(() => ({
    get current() {
      return Z.getState().currentAssistantMessageId;
    },
    set current(x) {
      Z.getState().setCurrentAssistantMessageId(x);
    }
  }), []), y = te((x) => {
    x ? l(x) : (t(!0), r(!0), a("")), m.current = "";
  }, [l, t, r, a]), w = te(() => {
    u(), m.current = "";
  }, [u]), R = te(() => {
    p();
  }, [p]), S = te(() => {
    h(), m.current = "";
  }, [h]);
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
    currentAssistantMessageIdRef: d,
    streamingContentRef: m,
    // Actions
    startStreaming: y,
    stopStreaming: w,
    resetToolHandling: R,
    clearStreamingBuffers: S
  };
}
function cs() {
  const e = Ce(
    () => (i, a) => a === !1 ? be.isErrorMessage(i) ? Pe.ERROR : Pe.COMPLETED : be.isCompletedMessage(i) ? Pe.COMPLETED : be.isErrorMessage(i) ? Pe.ERROR : Pe.PROCESSING,
    []
  ), t = Ce(
    () => (i) => be.extractDuration(i),
    []
  ), n = Ce(
    () => (i) => be.cleanReasoningContent(i),
    []
  ), r = Ce(
    () => (i, a) => {
      switch (be.getMessageType(
        i,
        a
      )) {
        case K.MESSAGE_TYPES.ERROR:
          return "Error";
        case K.MESSAGE_TYPES.COMPLETED:
          return "Completed";
        case K.MESSAGE_TYPES.THOUGHT:
          return K.UI_TEXT.THOUGHT;
        case K.MESSAGE_TYPES.THINKING:
        default:
          return K.UI_TEXT.THINKING_ELLIPSIS;
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
function us() {
  const e = Ce(
    () => (n, r) => r === !1 ? n.includes(K.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : n.includes(K.COMPLETED_MARKER) || n.includes("✅") ? "Tool Completed" : n.includes(K.ERROR_MARKER) ? "Tool Error" : (n.includes(K.HANDLING_MARKER), "Tool Processing..."),
    []
  ), t = Ce(
    () => (n, r) => r === !1 ? n.includes(K.ERROR_MARKER) ? Pe.ERROR : Pe.COMPLETED : n.includes(K.COMPLETED_MARKER) || n.includes("✅") ? Pe.COMPLETED : n.includes(K.ERROR_MARKER) ? Pe.ERROR : Pe.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: t
  };
}
function hs({
  setMessages: e,
  addMessage: t,
  updateMessageContent: n,
  generateId: r,
  setIsThinking: i,
  setIsStreaming: a,
  setStreamingContent: o,
  setIsHandlingTool: s,
  currentAssistantMessageIdRef: l,
  streamingContentRef: u,
  clearStreamingBuffers: h,
  resetToolHandling: p
}) {
  const m = ve(/* @__PURE__ */ new Map()), d = ve(/* @__PURE__ */ new Map()), y = te(() => {
    if (l.current && u.current) {
      const P = An(
        u.current,
        !0
      );
      return n(
        l.current,
        P,
        !1
      ), h(), !0;
    }
    return !1;
  }, [
    l,
    u,
    n,
    h
  ]), w = te(
    (P) => {
      const L = An(P, !0);
      if (l.current)
        u.current += L, o(u.current), n(
          l.current,
          u.current,
          !0
        );
      else {
        i(!1);
        const T = r();
        l.current = T, u.current = L, o(L);
        const D = {
          id: T,
          role: "assistant",
          content: L,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        e((O) => [...O, D]);
      }
    },
    [
      l,
      u,
      o,
      n,
      i,
      r,
      e
    ]
  ), R = te(
    (P, L, T) => {
      const { callId: D } = T || {};
      if (s(P), !D) return;
      const O = be.isThinkingMessage(L) && !L.includes("for") && !L.includes("seconds"), $ = be.isThinkingMessage(L) && L.includes("for") && L.includes("seconds"), z = be.isHandlingMessage(L), N = be.isCompletedMessage(L), b = be.isErrorMessage(L);
      if (O || $) {
        const W = m.current.get(D);
        if (O && !W) {
          y();
          const H = r();
          m.current.set(D, H);
          const X = {
            id: H,
            role: "reasoning",
            content: L,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          e((J) => [...J, X]);
        } else $ && W ? (n(W, L, !1), m.current.delete(D)) : W && O && n(W, L, !0);
      }
      const F = d.current.get(D);
      if (z && !F) {
        y();
        const W = L.match(
          K.PATTERNS.HANDLING_TOOL
        ), H = W ? W[1] : "Unknown Tool", X = r();
        d.current.set(D, X);
        const J = {
          id: X,
          role: "tooling",
          content: L,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...T,
            toolName: H,
            callId: D,
            status: Pe.PROCESSING
          }
        };
        e((de) => [...de, J]);
      } else if ((N || b) && F) {
        const W = L.match(
          K.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), H = W ? W[1] : "Unknown Tool";
        e(
          (X) => X.map(
            (J) => J.id === F ? {
              ...J,
              content: L,
              isStreaming: !1,
              toolData: {
                ...J.toolData,
                toolName: H,
                status: b ? Pe.ERROR : Pe.COMPLETED,
                callId: D ?? ""
              }
            } : J
          )
        ), d.current.delete(D);
      } else F && P && !N && !b && n(F, L, !0);
    },
    [
      s,
      y,
      r,
      e,
      n
    ]
  ), S = te(() => {
    a(!1), i(!1), y();
  }, [a, i, y]), x = te(
    (P) => {
      console.error("Chat error:", P), a(!1), i(!1), y(), t("system", `❌ Chat error: ${P}`);
    },
    [
      a,
      i,
      y,
      t
    ]
  ), M = te(() => {
    a(!1), i(!1), h(), p();
  }, [
    a,
    i,
    h,
    p
  ]);
  return {
    handleSetMessage: w,
    handleReasoningUpdate: R,
    handleChatFinished: S,
    handleChatError: x,
    stopGeneration: M,
    finalizeCurrentStreamingMessage: y
  };
}
function ds() {
  const e = ss(), t = ls(), n = cs(), r = us(), i = hs({
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
function qh({ initialMode: e = "sidebar" }) {
  const t = Z();
  return ye(() => {
    e && t.currentMode !== e && t.setCurrentMode(e);
  }, [e]), ye(() => {
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
function ps({
  entityId: e,
  entityType: t,
  httpApiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  messages: a,
  setMessages: o,
  setIsLoadingConversation: s,
  setConversationError: l,
  setCurrentThreadId: u,
  setProviderResId: h,
  metadata: p
}) {
  const m = ve(!1), d = async () => {
    if (!e) {
      console.log("useConversationLoader: No entityId provided, skipping history fetch");
      return;
    }
    if (!p || typeof p == "object" && Object.keys(p).length === 0) {
      console.log("useConversationLoader: No metadata provided (empty/undefined), skipping history fetch - starting fresh conversation");
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
    if (!m.current && !(a.length > 0))
      try {
        s(!0), l(null), console.log("useConversationLoader: Fetching messages for entityId:", e, "entityType:", t);
        const w = await oo(
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
        console.log(`useConversationLoader: Loaded ${w.messages.length} messages`), o(w.messages), w.threadId && (console.log("useConversationLoader: Setting threadId from response:", w.threadId), u(w.threadId)), w.providerResId && (console.log("useConversationLoader: Setting providerResId:", w.providerResId), h(w.providerResId)), m.current = !0;
      } catch (w) {
        const R = jt(w, "ConversationLoader");
        l(
          w instanceof Error ? w.message : "Failed to load conversation"
        ), m.current = !0, R.isRetryable || console.warn(`[ConversationLoader] Will not retry conversation loading: ${R.reason}`);
      } finally {
        s(!1);
      }
  };
  return ye(() => {
    d();
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
    u,
    h,
    p
  ]), {
    hasLoadedConversationRef: m,
    resetConversationLoader: () => {
      console.log("useConversationLoader: Resetting loader state"), m.current = !1;
    },
    reloadConversation: d
  };
}
function fs({
  metadata: e,
  chatClient: t,
  currentProviderResId: n,
  isLoadingConversation: r,
  messages: i = [],
  entityId: a,
  entityType: o
}) {
  const s = ve(void 0), l = ve(!1);
  return ye(() => {
    if (r || !t)
      return;
    const u = !n && i.length === 0, h = !!n;
    if (u && (!a || !o) || h && !n)
      return;
    if (!l.current) {
      l.current = !0, s.current = e;
      return;
    }
    if (!(s.current !== e))
      return;
    if (!(e && Object.keys(e).length > 0)) {
      s.current = e;
      return;
    }
    u ? s.current = e : h && t.updateMetadata(n, { metadata: e }).then(() => {
      s.current = e;
    }).catch((d) => {
      console.error(
        "[useMetadataSync] ❌ Failed to update existing thread metadata:",
        d
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
    hasInitialized: l.current,
    isDraftState: !n && i.length === 0,
    isExistingThread: !!n
  };
}
function gs() {
  const [e, t] = ie(navigator.onLine), [n, r] = ie(!1);
  return ye(() => {
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
class ms {
  // 10MB
  constructor(t) {
    G(this, "config");
    G(this, "defaultFolder", "chat-uploads");
    G(this, "defaultMaxFileSize", 10 * 1024 * 1024);
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
          const u = l.loaded / l.total * 100;
          n(u);
        }
      }), s.addEventListener("load", async () => {
        if (s.status >= 200 && s.status < 300)
          try {
            const l = JSON.parse(s.responseText), u = this.processUploadResult(t, l);
            a(u);
          } catch {
            o(new Error("Invalid response format"));
          }
        else
          o(new Error(`Upload failed with status ${s.status}`));
      }), s.addEventListener("error", () => {
        o(new Error("Network error during upload"));
      }), s.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([l, u]) => {
        s.setRequestHeader(l, u);
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
class Cs {
  constructor(t, n = {}) {
    G(this, "config");
    G(this, "chatClient");
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
const ys = {
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
}, ra = {
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
}, ws = {
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
    if (!ra.isValidWebSocketUrl(e))
      throw new Error(`Invalid WebSocket URL: ${e}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (e) => e.trim().length > 0
}, ia = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...e) => e.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (e, t, n, r, i) => ia.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${e}`,
    t && `chat-wrapper--${t}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    e === "embedded" && i && "chat-wrapper--constrained"
  )
}, aa = {
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
  getUserFriendlyErrorMessage: (e) => aa.isNetworkError(e) ? "Connection error. Please check your internet connection and try again." : e.message.includes("authentication") || e.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : e.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, dt = {
  state: ys,
  url: ra,
  validation: ws,
  css: ia,
  error: aa
};
class ni extends Tr {
  constructor(n) {
    super(n);
    G(this, "resetTimeoutId", null);
    G(this, "resetErrorBoundary", () => {
      this.resetTimeoutId && clearTimeout(this.resetTimeoutId), this.setState({
        hasError: !1,
        error: void 0,
        errorInfo: void 0
      });
    });
    G(this, "handleRetry", () => {
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
        (l, u) => l !== o[u]
      ) && this.resetErrorBoundary();
    }
  }
  render() {
    const { hasError: n, error: r } = this.state, { children: i, fallback: a } = this.props;
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ c("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ _("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ c("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ c("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ c("p", { className: "chat-wrapper__error-message", children: dt.error.getUserFriendlyErrorMessage(r) }),
      /* @__PURE__ */ c("div", { className: "chat-wrapper__error-actions", children: /* @__PURE__ */ c(
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
      })() && /* @__PURE__ */ _("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ c("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ c("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : i;
  }
}
class Ss extends Tr {
  constructor(n) {
    super(n);
    G(this, "retryCount", 0);
    G(this, "retryTimeoutId", null);
    G(this, "handleRetry", () => {
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
    G(this, "handleManualReset", () => {
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
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || dt.error.isNetworkError(r)) ? /* @__PURE__ */ c("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ _("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ c("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ c("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ c("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ c("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ _("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ c("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ c("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ _(ft, { children: [
        this.retryCount < o && /* @__PURE__ */ _(
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
        /* @__PURE__ */ c(
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
      })() && /* @__PURE__ */ _("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ c("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ c("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
}
class Es extends Tr {
  constructor(n) {
    super(n);
    G(this, "handleRetry", () => {
      this.setState({
        hasError: !1,
        error: void 0,
        failedFiles: void 0
      }), this.props.onRetry && this.props.onRetry();
    });
    G(this, "handleDismiss", () => {
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
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ c("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ _("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ c("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ c("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ c("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ _("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ c("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ c("ul", { className: "chat-wrapper__failed-files-list", children: i.map((l, u) => /* @__PURE__ */ c("li", { className: "chat-wrapper__failed-file", children: l }, u)) })
      ] }),
      /* @__PURE__ */ _("div", { className: "chat-wrapper__error-actions", children: [
        o && /* @__PURE__ */ c(
          "button",
          {
            className: "chat-wrapper__error-retry",
            onClick: this.handleRetry,
            type: "button",
            children: "Try Again"
          }
        ),
        /* @__PURE__ */ c(
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
      })() && /* @__PURE__ */ _("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ c("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ c("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
  getFileUploadErrorMessage(n) {
    return n.message.includes("size") || n.message.includes("large") ? "File size is too large. Please try with smaller files." : n.message.includes("type") || n.message.includes("format") ? "File type is not supported. Please try with different file types." : n.message.includes("network") || n.message.includes("connection") ? "Network error during upload. Please check your connection and try again." : n.message.includes("timeout") ? "Upload timed out. Please try again with smaller files or better connection." : "Failed to upload files. Please try again.";
  }
}
const Ts = ({
  className: e,
  onClick: t,
  size: n = 24,
  color: r = "currentColor"
}) => /* @__PURE__ */ _(
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
      /* @__PURE__ */ c(
        "path",
        {
          d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
          fill: r
        }
      ),
      /* @__PURE__ */ c("circle", { cx: "7", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ c("circle", { cx: "12", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ c("circle", { cx: "17", cy: "10", r: "1", fill: r })
    ]
  }
), _s = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ c(
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
    children: /* @__PURE__ */ c(
      "path",
      {
        d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
        fill: r
      }
    )
  }
), ks = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor",
  isFullscreen: i = !1
}) => /* @__PURE__ */ c(
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
      /* @__PURE__ */ c(
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
      /* @__PURE__ */ c(
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
), xs = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ c(
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
    children: /* @__PURE__ */ c(
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
), oa = ({
  className: e,
  onClick: t,
  size: n = 16,
  color: r = "currentColor"
}) => /* @__PURE__ */ c(
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
    children: /* @__PURE__ */ c(
      "path",
      {
        d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
        fill: r
      }
    )
  }
), bs = ({
  className: e,
  onClick: t,
  size: n = 18,
  color: r = "currentColor"
}) => /* @__PURE__ */ _(
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
      /* @__PURE__ */ c("mask", { id: "mask0_444_23118", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "18", height: "18", children: /* @__PURE__ */ c("rect", { width: "18", height: "18", fill: "#D9D9D9" }) }),
      /* @__PURE__ */ c("g", { mask: "url(#mask0_444_23118)", children: /* @__PURE__ */ c(
        "path",
        {
          d: "M5.8498 13.4998C5.47855 13.4998 5.16074 13.3676 4.89637 13.1032C4.63199 12.8389 4.4998 12.5211 4.4998 12.1498V3.1498C4.4998 2.77855 4.63199 2.46074 4.89637 2.19637C5.16074 1.93199 5.47855 1.7998 5.8498 1.7998H14.8498C15.2211 1.7998 15.5389 1.93199 15.8032 2.19637C16.0676 2.46074 16.1998 2.77855 16.1998 3.1498V12.1498C16.1998 12.5211 16.0676 12.8389 15.8032 13.1032C15.5389 13.3676 15.2211 13.4998 14.8498 13.4998H5.8498ZM5.8498 12.1498H14.8498V3.1498H5.8498V12.1498ZM3.1498 16.1998C2.77855 16.1998 2.46074 16.0676 2.19637 15.8032C1.93199 15.5389 1.7998 15.2211 1.7998 14.8498V4.4998H3.1498V14.8498H13.4998V16.1998H3.1498Z",
          fill: r
        }
      ) })
    ]
  }
), vs = ({
  mode: e,
  headerName: t,
  bubbleText: n,
  showBubbleText: r = !0,
  onClick: i
}) => {
  const a = e === "modal" ? `Open ${t}` : `Expand ${t}`;
  return /* @__PURE__ */ _(
    "button",
    {
      className: "chat-wrapper__bubble-button",
      onClick: i,
      title: a,
      children: [
        /* @__PURE__ */ c(Ts, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ c("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, Is = ({
  headerName: e,
  mode: t,
  isCollapsed: n,
  isModalOpen: r,
  devMode: i = !1,
  onClose: a,
  onToggleFullscreen: o,
  onToggleCollapse: s,
  onOpenSettings: l
}) => {
  const u = () => t === "modal" && r && a ? /* @__PURE__ */ c(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: a,
      title: "Close chat",
      children: /* @__PURE__ */ c(_s, { size: 20 })
    }
  ) : null, h = () => {
    if ((t === "sidebar" || t === "fullscreen") && !n && o) {
      const d = t === "fullscreen";
      return /* @__PURE__ */ c(
        "button",
        {
          className: d ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: o,
          title: d ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ c(ks, { size: 20, isFullscreen: d })
        }
      );
    }
    return null;
  }, p = () => (t === "sidebar" || t === "fullscreen") && !n && s ? /* @__PURE__ */ c(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: s,
      title: "Collapse chat",
      children: /* @__PURE__ */ c(xs, { size: 20 })
    }
  ) : null;
  return /* @__PURE__ */ _("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ c("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ c("h2", { className: "chat-wrapper__title", children: e }) }),
    /* @__PURE__ */ _("div", { className: "chat-wrapper__header-controls", children: [
      !i || !l ? null : /* @__PURE__ */ c(
        "button",
        {
          className: "chat-wrapper__settings-button",
          onClick: l,
          title: "Developer Settings",
          children: /* @__PURE__ */ c(oa, { size: 16 })
        }
      ),
      h(),
      p(),
      u()
    ] })
  ] });
};
function Rs(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const As = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ns = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ms = {};
function ri(e, t) {
  return (Ms.jsx ? Ns : As).test(e);
}
const Ls = /[ \t\n\f\r]/g;
function Os(e) {
  return typeof e == "object" ? e.type === "text" ? ii(e.value) : !1 : ii(e);
}
function ii(e) {
  return e.replace(Ls, "") === "";
}
class un {
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
un.prototype.normal = {};
un.prototype.property = {};
un.prototype.space = void 0;
function sa(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new un(n, r, t);
}
function hr(e) {
  return e.toLowerCase();
}
class $e {
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
$e.prototype.attribute = "";
$e.prototype.booleanish = !1;
$e.prototype.boolean = !1;
$e.prototype.commaOrSpaceSeparated = !1;
$e.prototype.commaSeparated = !1;
$e.prototype.defined = !1;
$e.prototype.mustUseProperty = !1;
$e.prototype.number = !1;
$e.prototype.overloadedBoolean = !1;
$e.prototype.property = "";
$e.prototype.spaceSeparated = !1;
$e.prototype.space = void 0;
let Ds = 0;
const Y = Pt(), me = Pt(), dr = Pt(), v = Pt(), se = Pt(), Vt = Pt(), Je = Pt();
function Pt() {
  return 2 ** ++Ds;
}
const pr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: Y,
  booleanish: me,
  commaOrSpaceSeparated: Je,
  commaSeparated: Vt,
  number: v,
  overloadedBoolean: dr,
  spaceSeparated: se
}, Symbol.toStringTag, { value: "Module" })), qn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(pr)
);
class _r extends $e {
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
    if (super(t, n), ai(this, "space", i), typeof r == "number")
      for (; ++a < qn.length; ) {
        const o = qn[a];
        ai(this, qn[a], (r & pr[o]) === pr[o]);
      }
  }
}
_r.prototype.defined = !0;
function ai(e, t, n) {
  n && (e[t] = n);
}
function Zt(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new _r(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[hr(r)] = r, n[hr(a.attribute)] = r;
  }
  return new un(t, n, e.space);
}
const la = Zt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: me,
    ariaAutoComplete: null,
    ariaBusy: me,
    ariaChecked: me,
    ariaColCount: v,
    ariaColIndex: v,
    ariaColSpan: v,
    ariaControls: se,
    ariaCurrent: null,
    ariaDescribedBy: se,
    ariaDetails: null,
    ariaDisabled: me,
    ariaDropEffect: se,
    ariaErrorMessage: null,
    ariaExpanded: me,
    ariaFlowTo: se,
    ariaGrabbed: me,
    ariaHasPopup: null,
    ariaHidden: me,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: se,
    ariaLevel: v,
    ariaLive: null,
    ariaModal: me,
    ariaMultiLine: me,
    ariaMultiSelectable: me,
    ariaOrientation: null,
    ariaOwns: se,
    ariaPlaceholder: null,
    ariaPosInSet: v,
    ariaPressed: me,
    ariaReadOnly: me,
    ariaRelevant: null,
    ariaRequired: me,
    ariaRoleDescription: se,
    ariaRowCount: v,
    ariaRowIndex: v,
    ariaRowSpan: v,
    ariaSelected: me,
    ariaSetSize: v,
    ariaSort: null,
    ariaValueMax: v,
    ariaValueMin: v,
    ariaValueNow: v,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function ca(e, t) {
  return t in e ? e[t] : t;
}
function ua(e, t) {
  return ca(e, t.toLowerCase());
}
const Ps = Zt({
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
    accept: Vt,
    acceptCharset: se,
    accessKey: se,
    action: null,
    allow: null,
    allowFullScreen: Y,
    allowPaymentRequest: Y,
    allowUserMedia: Y,
    alt: null,
    as: null,
    async: Y,
    autoCapitalize: null,
    autoComplete: se,
    autoFocus: Y,
    autoPlay: Y,
    blocking: se,
    capture: null,
    charSet: null,
    checked: Y,
    cite: null,
    className: se,
    cols: v,
    colSpan: null,
    content: null,
    contentEditable: me,
    controls: Y,
    controlsList: se,
    coords: v | Vt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: Y,
    defer: Y,
    dir: null,
    dirName: null,
    disabled: Y,
    download: dr,
    draggable: me,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: Y,
    formTarget: null,
    headers: se,
    height: v,
    hidden: dr,
    high: v,
    href: null,
    hrefLang: null,
    htmlFor: se,
    httpEquiv: se,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: Y,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: Y,
    itemId: null,
    itemProp: se,
    itemRef: se,
    itemScope: Y,
    itemType: se,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: Y,
    low: v,
    manifest: null,
    max: null,
    maxLength: v,
    media: null,
    method: null,
    min: null,
    minLength: v,
    multiple: Y,
    muted: Y,
    name: null,
    nonce: null,
    noModule: Y,
    noValidate: Y,
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
    open: Y,
    optimum: v,
    pattern: null,
    ping: se,
    placeholder: null,
    playsInline: Y,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: Y,
    referrerPolicy: null,
    rel: se,
    required: Y,
    reversed: Y,
    rows: v,
    rowSpan: v,
    sandbox: se,
    scope: null,
    scoped: Y,
    seamless: Y,
    selected: Y,
    shadowRootClonable: Y,
    shadowRootDelegatesFocus: Y,
    shadowRootMode: null,
    shape: null,
    size: v,
    sizes: null,
    slot: null,
    span: v,
    spellCheck: me,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: v,
    step: null,
    style: null,
    tabIndex: v,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: Y,
    useMap: null,
    value: me,
    width: v,
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
    border: v,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: v,
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
    compact: Y,
    // Lists. Use CSS to reduce space between items instead
    declare: Y,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: v,
    // `<img>` and `<object>`
    leftMargin: v,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: v,
    // `<body>`
    marginWidth: v,
    // `<body>`
    noResize: Y,
    // `<frame>`
    noHref: Y,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: Y,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: Y,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: v,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: me,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: v,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: v,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: Y,
    disableRemotePlayback: Y,
    prefix: null,
    property: null,
    results: v,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: ua
}), Hs = Zt({
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
    about: Je,
    accentHeight: v,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: v,
    amplitude: v,
    arabicForm: null,
    ascent: v,
    attributeName: null,
    attributeType: null,
    azimuth: v,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: v,
    by: null,
    calcMode: null,
    capHeight: v,
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
    descent: v,
    diffuseConstant: v,
    direction: null,
    display: null,
    dur: null,
    divisor: v,
    dominantBaseline: null,
    download: Y,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: v,
    enableBackground: null,
    end: null,
    event: null,
    exponent: v,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: v,
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
    g1: Vt,
    g2: Vt,
    glyphName: Vt,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: v,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: v,
    horizOriginX: v,
    horizOriginY: v,
    id: null,
    ideographic: v,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: v,
    k: v,
    k1: v,
    k2: v,
    k3: v,
    k4: v,
    kernelMatrix: Je,
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
    limitingConeAngle: v,
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
    mediaSize: v,
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
    overlinePosition: v,
    overlineThickness: v,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: v,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: se,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: v,
    pointsAtY: v,
    pointsAtZ: v,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Je,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Je,
    rev: Je,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Je,
    requiredFeatures: Je,
    requiredFonts: Je,
    requiredFormats: Je,
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
    specularConstant: v,
    specularExponent: v,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: v,
    strikethroughThickness: v,
    string: null,
    stroke: null,
    strokeDashArray: Je,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: v,
    strokeOpacity: v,
    strokeWidth: null,
    style: null,
    surfaceScale: v,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Je,
    tabIndex: v,
    tableValues: null,
    target: null,
    targetX: v,
    targetY: v,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Je,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: v,
    underlineThickness: v,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: v,
    values: null,
    vAlphabetic: v,
    vMathematical: v,
    vectorEffect: null,
    vHanging: v,
    vIdeographic: v,
    version: null,
    vertAdvY: v,
    vertOriginX: v,
    vertOriginY: v,
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
    xHeight: v,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: ca
}), ha = Zt({
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
}), da = Zt({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: ua
}), pa = Zt({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), Fs = {
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
}, Us = /[A-Z]/g, oi = /-[a-z]/g, zs = /^data[-\w.:]+$/i;
function Bs(e, t) {
  const n = hr(t);
  let r = t, i = $e;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && zs.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(oi, Gs);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!oi.test(a)) {
        let o = a.replace(Us, Ws);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    i = _r;
  }
  return new i(r, t);
}
function Ws(e) {
  return "-" + e.toLowerCase();
}
function Gs(e) {
  return e.charAt(1).toUpperCase();
}
const Vs = sa([la, Ps, ha, da, pa], "html"), kr = sa([la, Hs, ha, da, pa], "svg");
function $s(e) {
  return e.join(" ").trim();
}
var Nn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function fa(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var xr = {}, si = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, js = /\n/g, Zs = /^\s*/, Ks = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, qs = /^:\s*/, Xs = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Ys = /^[;\s]*/, Js = /^\s+|\s+$/g, Qs = `
`, li = "/", ci = "*", Dt = "", el = "comment", tl = "declaration", nl = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(y) {
    var w = y.match(js);
    w && (n += w.length);
    var R = y.lastIndexOf(Qs);
    r = ~R ? y.length - R : r + y.length;
  }
  function a() {
    var y = { line: n, column: r };
    return function(w) {
      return w.position = new o(y), u(), w;
    };
  }
  function o(y) {
    this.start = y, this.end = { line: n, column: r }, this.source = t.source;
  }
  o.prototype.content = e;
  function s(y) {
    var w = new Error(
      t.source + ":" + n + ":" + r + ": " + y
    );
    if (w.reason = y, w.filename = t.source, w.line = n, w.column = r, w.source = e, !t.silent) throw w;
  }
  function l(y) {
    var w = y.exec(e);
    if (w) {
      var R = w[0];
      return i(R), e = e.slice(R.length), w;
    }
  }
  function u() {
    l(Zs);
  }
  function h(y) {
    var w;
    for (y = y || []; w = p(); )
      w !== !1 && y.push(w);
    return y;
  }
  function p() {
    var y = a();
    if (!(li != e.charAt(0) || ci != e.charAt(1))) {
      for (var w = 2; Dt != e.charAt(w) && (ci != e.charAt(w) || li != e.charAt(w + 1)); )
        ++w;
      if (w += 2, Dt === e.charAt(w - 1))
        return s("End of comment missing");
      var R = e.slice(2, w - 2);
      return r += 2, i(R), e = e.slice(w), r += 2, y({
        type: el,
        comment: R
      });
    }
  }
  function m() {
    var y = a(), w = l(Ks);
    if (w) {
      if (p(), !l(qs)) return s("property missing ':'");
      var R = l(Xs), S = y({
        type: tl,
        property: ui(w[0].replace(si, Dt)),
        value: R ? ui(R[0].replace(si, Dt)) : Dt
      });
      return l(Ys), S;
    }
  }
  function d() {
    var y = [];
    h(y);
    for (var w; w = m(); )
      w !== !1 && (y.push(w), h(y));
    return y;
  }
  return u(), d();
};
function ui(e) {
  return e ? e.replace(Js, Dt) : Dt;
}
var rl = Nn && Nn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(xr, "__esModule", { value: !0 });
xr.default = al;
var il = rl(nl);
function al(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, il.default)(e), i = typeof t == "function";
  return r.forEach(function(a) {
    if (a.type === "declaration") {
      var o = a.property, s = a.value;
      i ? t(o, s, a) : s && (n = n || {}, n[o] = s);
    }
  }), n;
}
var Dn = {};
Object.defineProperty(Dn, "__esModule", { value: !0 });
Dn.camelCase = void 0;
var ol = /^--[a-zA-Z0-9_-]+$/, sl = /-([a-z])/g, ll = /^[^-]+$/, cl = /^-(webkit|moz|ms|o|khtml)-/, ul = /^-(ms)-/, hl = function(e) {
  return !e || ll.test(e) || ol.test(e);
}, dl = function(e, t) {
  return t.toUpperCase();
}, hi = function(e, t) {
  return "".concat(t, "-");
}, pl = function(e, t) {
  return t === void 0 && (t = {}), hl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(ul, hi) : e = e.replace(cl, hi), e.replace(sl, dl));
};
Dn.camelCase = pl;
var fl = Nn && Nn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, gl = fl(xr), ml = Dn;
function fr(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, gl.default)(e, function(r, i) {
    r && i && (n[(0, ml.camelCase)(r, t)] = i);
  }), n;
}
fr.default = fr;
var Cl = fr;
const yl = /* @__PURE__ */ fa(Cl), ga = ma("end"), br = ma("start");
function ma(e) {
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
function wl(e) {
  const t = br(e), n = ga(e);
  if (t && n)
    return { start: t, end: n };
}
function an(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? di(e.position) : "start" in e || "end" in e ? di(e) : "line" in e || "column" in e ? gr(e) : "";
}
function gr(e) {
  return pi(e && e.line) + ":" + pi(e && e.column);
}
function di(e) {
  return gr(e && e.start) + "-" + gr(e && e.end);
}
function pi(e) {
  return e && typeof e == "number" ? e : 1;
}
class He extends Error {
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
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = s ? s.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = s ? s.line : void 0, this.name = an(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = o && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
He.prototype.file = "";
He.prototype.name = "";
He.prototype.reason = "";
He.prototype.message = "";
He.prototype.stack = "";
He.prototype.column = void 0;
He.prototype.line = void 0;
He.prototype.ancestors = void 0;
He.prototype.cause = void 0;
He.prototype.fatal = void 0;
He.prototype.place = void 0;
He.prototype.ruleId = void 0;
He.prototype.source = void 0;
const vr = {}.hasOwnProperty, Sl = /* @__PURE__ */ new Map(), El = /[A-Z]/g, Tl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), _l = /* @__PURE__ */ new Set(["td", "th"]), Ca = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function kl(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Ml(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Nl(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? kr : Vs,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = ya(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function ya(e, t, n) {
  if (t.type === "element")
    return xl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return bl(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return Il(e, t, n);
  if (t.type === "mdxjsEsm")
    return vl(e, t);
  if (t.type === "root")
    return Rl(e, t, n);
  if (t.type === "text")
    return Al(e, t);
}
function xl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = kr, e.schema = i), e.ancestors.push(t);
  const a = Sa(e, t.tagName, !1), o = Ll(e, t);
  let s = Rr(e, t);
  return Tl.has(t.tagName) && (s = s.filter(function(l) {
    return typeof l == "string" ? !Os(l) : !0;
  })), wa(e, o, a, t), Ir(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function bl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  cn(e, t.position);
}
function vl(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  cn(e, t.position);
}
function Il(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = kr, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : Sa(e, t.name, !0), o = Ol(e, t), s = Rr(e, t);
  return wa(e, o, a, t), Ir(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function Rl(e, t, n) {
  const r = {};
  return Ir(r, Rr(e, t)), e.create(t, e.Fragment, r, n);
}
function Al(e, t) {
  return t.value;
}
function wa(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function Ir(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function Nl(e, t, n) {
  return r;
  function r(i, a, o, s) {
    const u = Array.isArray(o.children) ? n : t;
    return s ? u(a, o, s) : u(a, o);
  }
}
function Ml(e, t) {
  return n;
  function n(r, i, a, o) {
    const s = Array.isArray(a.children), l = br(r);
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
function Ll(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && vr.call(t.properties, i)) {
      const a = Dl(e, i, t.properties[i]);
      if (a) {
        const [o, s] = a;
        e.tableCellAlignToStyle && o === "align" && typeof s == "string" && _l.has(t.tagName) ? r = s : n[o] = s;
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
function Ol(e, t) {
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
        cn(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const s = r.value.data.estree.body[0];
          s.type, a = e.evaluater.evaluateExpression(s.expression);
        } else
          cn(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function Rr(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Sl;
  for (; ++r < t.children.length; ) {
    const a = t.children[r];
    let o;
    if (e.passKeys) {
      const l = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (l) {
        const u = i.get(l) || 0;
        o = l + "-" + u, i.set(l, u + 1);
      }
    }
    const s = ya(e, a, o);
    s !== void 0 && n.push(s);
  }
  return n;
}
function Dl(e, t, n) {
  const r = Bs(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Rs(n) : $s(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Pl(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Hl(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Fs[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Pl(e, t) {
  try {
    return yl(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new He("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Ca + "#cannot-parse-style-attribute", i;
  }
}
function Sa(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let a = -1, o;
    for (; ++a < i.length; ) {
      const s = ri(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
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
    r = ri(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return vr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  cn(e);
}
function cn(e, t) {
  const n = new He(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Ca + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Hl(e) {
  const t = {};
  let n;
  for (n in e)
    vr.call(e, n) && (t[Fl(n)] = e[n]);
  return t;
}
function Fl(e) {
  let t = e.replace(El, Ul);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Ul(e) {
  return "-" + e.toLowerCase();
}
const Xn = {
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
}, zl = {};
function Bl(e, t) {
  const n = zl, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Ea(e, r, i);
}
function Ea(e, t, n) {
  if (Wl(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return fi(e.children, t, n);
  }
  return Array.isArray(e) ? fi(e, t, n) : "";
}
function fi(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Ea(e[i], t, n);
  return r.join("");
}
function Wl(e) {
  return !!(e && typeof e == "object");
}
const gi = document.createElement("i");
function Ar(e) {
  const t = "&" + e + ";";
  gi.innerHTML = t;
  const n = gi.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function gt(e, t, n, r) {
  const i = e.length;
  let a = 0, o;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(t, n), e.splice(...o);
  else
    for (n && e.splice(t, n); a < r.length; )
      o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
function rt(e, t) {
  return e.length > 0 ? (gt(e, e.length, 0, t), e) : t;
}
const mi = {}.hasOwnProperty;
function Gl(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    Vl(t, e[n]);
  return t;
}
function Vl(e, t) {
  let n;
  for (n in t) {
    const i = (mi.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let o;
    if (a)
      for (o in a) {
        mi.call(i, o) || (i[o] = []);
        const s = a[o];
        $l(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(s) ? s : s ? [s] : []
        );
      }
  }
}
function $l(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  gt(e, 0, 0, r);
}
function Ta(e, t) {
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
function $t(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const pt = At(/[A-Za-z]/), et = At(/[\dA-Za-z]/), jl = At(/[#-'*+\--9=?A-Z^-~]/);
function mr(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Cr = At(/\d/), Zl = At(/[\dA-Fa-f]/), Kl = At(/[!-/:-@[-`{-~]/);
function q(e) {
  return e !== null && e < -2;
}
function Ve(e) {
  return e !== null && (e < 0 || e === 32);
}
function ae(e) {
  return e === -2 || e === -1 || e === 32;
}
const ql = At(new RegExp("\\p{P}|\\p{S}", "u")), Xl = At(/\s/);
function At(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Kt(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let o = "";
    if (a === 37 && et(e.charCodeAt(n + 1)) && et(e.charCodeAt(n + 2)))
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
function le(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return o;
  function o(l) {
    return ae(l) ? (e.enter(n), s(l)) : t(l);
  }
  function s(l) {
    return ae(l) && a++ < i ? (e.consume(l), s) : (e.exit(n), t(l));
  }
}
const Yl = {
  tokenize: Jl
};
function Jl(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(s) {
    if (s === null) {
      e.consume(s);
      return;
    }
    return e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), le(e, t, "linePrefix");
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
    return q(s) ? (e.consume(s), e.exit("chunkText"), a) : (e.consume(s), o);
  }
}
const Ql = {
  tokenize: ec
}, Ci = {
  tokenize: tc
};
function ec(e) {
  const t = this, n = [];
  let r = 0, i, a, o;
  return s;
  function s(M) {
    if (r < n.length) {
      const P = n[r];
      return t.containerState = P[1], e.attempt(P[0].continuation, l, u)(M);
    }
    return u(M);
  }
  function l(M) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && x();
      const P = t.events.length;
      let L = P, T;
      for (; L--; )
        if (t.events[L][0] === "exit" && t.events[L][1].type === "chunkFlow") {
          T = t.events[L][1].end;
          break;
        }
      S(r);
      let D = P;
      for (; D < t.events.length; )
        t.events[D][1].end = {
          ...T
        }, D++;
      return gt(t.events, L + 1, 0, t.events.slice(P)), t.events.length = D, u(M);
    }
    return s(M);
  }
  function u(M) {
    if (r === n.length) {
      if (!i)
        return m(M);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return y(M);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(Ci, h, p)(M);
  }
  function h(M) {
    return i && x(), S(r), m(M);
  }
  function p(M) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, y(M);
  }
  function m(M) {
    return t.containerState = {}, e.attempt(Ci, d, y)(M);
  }
  function d(M) {
    return r++, n.push([t.currentConstruct, t.containerState]), m(M);
  }
  function y(M) {
    if (M === null) {
      i && x(), S(0), e.consume(M);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: a
    }), w(M);
  }
  function w(M) {
    if (M === null) {
      R(e.exit("chunkFlow"), !0), S(0), e.consume(M);
      return;
    }
    return q(M) ? (e.consume(M), R(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, s) : (e.consume(M), w);
  }
  function R(M, P) {
    const L = t.sliceStream(M);
    if (P && L.push(null), M.previous = a, a && (a.next = M), a = M, i.defineSkip(M.start), i.write(L), t.parser.lazy[M.start.line]) {
      let T = i.events.length;
      for (; T--; )
        if (
          // The token starts before the line ending…
          i.events[T][1].start.offset < o && // …and either is not ended yet…
          (!i.events[T][1].end || // …or ends after it.
          i.events[T][1].end.offset > o)
        )
          return;
      const D = t.events.length;
      let O = D, $, z;
      for (; O--; )
        if (t.events[O][0] === "exit" && t.events[O][1].type === "chunkFlow") {
          if ($) {
            z = t.events[O][1].end;
            break;
          }
          $ = !0;
        }
      for (S(r), T = D; T < t.events.length; )
        t.events[T][1].end = {
          ...z
        }, T++;
      gt(t.events, O + 1, 0, t.events.slice(D)), t.events.length = T;
    }
  }
  function S(M) {
    let P = n.length;
    for (; P-- > M; ) {
      const L = n[P];
      t.containerState = L[1], L[0].exit.call(t, e);
    }
    n.length = M;
  }
  function x() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function tc(e, t, n) {
  return le(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function yi(e) {
  if (e === null || Ve(e) || Xl(e))
    return 1;
  if (ql(e))
    return 2;
}
function Nr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const yr = {
  name: "attention",
  resolveAll: nc,
  tokenize: rc
};
function nc(e, t) {
  let n = -1, r, i, a, o, s, l, u, h;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          l = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const p = {
            ...e[r][1].end
          }, m = {
            ...e[n][1].start
          };
          wi(p, -l), wi(m, l), o = {
            type: l > 1 ? "strongSequence" : "emphasisSequence",
            start: p,
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
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = rt(u, [["enter", e[r][1], t], ["exit", e[r][1], t]])), u = rt(u, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["enter", a, t]]), u = rt(u, Nr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), u = rt(u, [["exit", a, t], ["enter", s, t], ["exit", s, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (h = 2, u = rt(u, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : h = 0, gt(e, r - 1, n - r + 3, u), n = r + u.length - h - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function rc(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = yi(r);
  let a;
  return o;
  function o(l) {
    return a = l, e.enter("attentionSequence"), s(l);
  }
  function s(l) {
    if (l === a)
      return e.consume(l), s;
    const u = e.exit("attentionSequence"), h = yi(l), p = !h || h === 2 && i || n.includes(l), m = !i || i === 2 && h || n.includes(r);
    return u._open = !!(a === 42 ? p : p && (i || !m)), u._close = !!(a === 42 ? m : m && (h || !p)), t(l);
  }
}
function wi(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const ic = {
  name: "autolink",
  tokenize: ac
};
function ac(e, t, n) {
  let r = 0;
  return i;
  function i(d) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(d) {
    return pt(d) ? (e.consume(d), o) : d === 64 ? n(d) : u(d);
  }
  function o(d) {
    return d === 43 || d === 45 || d === 46 || et(d) ? (r = 1, s(d)) : u(d);
  }
  function s(d) {
    return d === 58 ? (e.consume(d), r = 0, l) : (d === 43 || d === 45 || d === 46 || et(d)) && r++ < 32 ? (e.consume(d), s) : (r = 0, u(d));
  }
  function l(d) {
    return d === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.exit("autolink"), t) : d === null || d === 32 || d === 60 || mr(d) ? n(d) : (e.consume(d), l);
  }
  function u(d) {
    return d === 64 ? (e.consume(d), h) : jl(d) ? (e.consume(d), u) : n(d);
  }
  function h(d) {
    return et(d) ? p(d) : n(d);
  }
  function p(d) {
    return d === 46 ? (e.consume(d), r = 0, h) : d === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.exit("autolink"), t) : m(d);
  }
  function m(d) {
    if ((d === 45 || et(d)) && r++ < 63) {
      const y = d === 45 ? m : p;
      return e.consume(d), y;
    }
    return n(d);
  }
}
const Pn = {
  partial: !0,
  tokenize: oc
};
function oc(e, t, n) {
  return r;
  function r(a) {
    return ae(a) ? le(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || q(a) ? t(a) : n(a);
  }
}
const _a = {
  continuation: {
    tokenize: lc
  },
  exit: cc,
  name: "blockQuote",
  tokenize: sc
};
function sc(e, t, n) {
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
    return ae(o) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(o), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(o));
  }
}
function lc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return ae(o) ? le(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : a(o);
  }
  function a(o) {
    return e.attempt(_a, t, n)(o);
  }
}
function cc(e) {
  e.exit("blockQuote");
}
const ka = {
  name: "characterEscape",
  tokenize: uc
};
function uc(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return Kl(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const xa = {
  name: "characterReference",
  tokenize: hc
};
function hc(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return s;
  function s(p) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), l;
  }
  function l(p) {
    return p === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(p), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), a = 31, o = et, h(p));
  }
  function u(p) {
    return p === 88 || p === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(p), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, o = Zl, h) : (e.enter("characterReferenceValue"), a = 7, o = Cr, h(p));
  }
  function h(p) {
    if (p === 59 && i) {
      const m = e.exit("characterReferenceValue");
      return o === et && !Ar(r.sliceSerialize(m)) ? n(p) : (e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return o(p) && i++ < a ? (e.consume(p), h) : n(p);
  }
}
const Si = {
  partial: !0,
  tokenize: pc
}, Ei = {
  concrete: !0,
  name: "codeFenced",
  tokenize: dc
};
function dc(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: L
  };
  let a = 0, o = 0, s;
  return l;
  function l(T) {
    return u(T);
  }
  function u(T) {
    const D = r.events[r.events.length - 1];
    return a = D && D[1].type === "linePrefix" ? D[2].sliceSerialize(D[1], !0).length : 0, s = T, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), h(T);
  }
  function h(T) {
    return T === s ? (o++, e.consume(T), h) : o < 3 ? n(T) : (e.exit("codeFencedFenceSequence"), ae(T) ? le(e, p, "whitespace")(T) : p(T));
  }
  function p(T) {
    return T === null || q(T) ? (e.exit("codeFencedFence"), r.interrupt ? t(T) : e.check(Si, w, P)(T)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), m(T));
  }
  function m(T) {
    return T === null || q(T) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), p(T)) : ae(T) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), le(e, d, "whitespace")(T)) : T === 96 && T === s ? n(T) : (e.consume(T), m);
  }
  function d(T) {
    return T === null || q(T) ? p(T) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), y(T));
  }
  function y(T) {
    return T === null || q(T) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), p(T)) : T === 96 && T === s ? n(T) : (e.consume(T), y);
  }
  function w(T) {
    return e.attempt(i, P, R)(T);
  }
  function R(T) {
    return e.enter("lineEnding"), e.consume(T), e.exit("lineEnding"), S;
  }
  function S(T) {
    return a > 0 && ae(T) ? le(e, x, "linePrefix", a + 1)(T) : x(T);
  }
  function x(T) {
    return T === null || q(T) ? e.check(Si, w, P)(T) : (e.enter("codeFlowValue"), M(T));
  }
  function M(T) {
    return T === null || q(T) ? (e.exit("codeFlowValue"), x(T)) : (e.consume(T), M);
  }
  function P(T) {
    return e.exit("codeFenced"), t(T);
  }
  function L(T, D, O) {
    let $ = 0;
    return z;
    function z(H) {
      return T.enter("lineEnding"), T.consume(H), T.exit("lineEnding"), N;
    }
    function N(H) {
      return T.enter("codeFencedFence"), ae(H) ? le(T, b, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(H) : b(H);
    }
    function b(H) {
      return H === s ? (T.enter("codeFencedFenceSequence"), F(H)) : O(H);
    }
    function F(H) {
      return H === s ? ($++, T.consume(H), F) : $ >= o ? (T.exit("codeFencedFenceSequence"), ae(H) ? le(T, W, "whitespace")(H) : W(H)) : O(H);
    }
    function W(H) {
      return H === null || q(H) ? (T.exit("codeFencedFence"), D(H)) : O(H);
    }
  }
}
function pc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? n(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), a);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
const Yn = {
  name: "codeIndented",
  tokenize: gc
}, fc = {
  partial: !0,
  tokenize: mc
};
function gc(e, t, n) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("codeIndented"), le(e, a, "linePrefix", 5)(u);
  }
  function a(u) {
    const h = r.events[r.events.length - 1];
    return h && h[1].type === "linePrefix" && h[2].sliceSerialize(h[1], !0).length >= 4 ? o(u) : n(u);
  }
  function o(u) {
    return u === null ? l(u) : q(u) ? e.attempt(fc, o, l)(u) : (e.enter("codeFlowValue"), s(u));
  }
  function s(u) {
    return u === null || q(u) ? (e.exit("codeFlowValue"), o(u)) : (e.consume(u), s);
  }
  function l(u) {
    return e.exit("codeIndented"), t(u);
  }
}
function mc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : q(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : le(e, a, "linePrefix", 5)(o);
  }
  function a(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? t(o) : q(o) ? i(o) : n(o);
  }
}
const Cc = {
  name: "codeText",
  previous: wc,
  resolve: yc,
  tokenize: Sc
};
function yc(e) {
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
function wc(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Sc(e, t, n) {
  let r = 0, i, a;
  return o;
  function o(p) {
    return e.enter("codeText"), e.enter("codeTextSequence"), s(p);
  }
  function s(p) {
    return p === 96 ? (e.consume(p), r++, s) : (e.exit("codeTextSequence"), l(p));
  }
  function l(p) {
    return p === null ? n(p) : p === 32 ? (e.enter("space"), e.consume(p), e.exit("space"), l) : p === 96 ? (a = e.enter("codeTextSequence"), i = 0, h(p)) : q(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), l) : (e.enter("codeTextData"), u(p));
  }
  function u(p) {
    return p === null || p === 32 || p === 96 || q(p) ? (e.exit("codeTextData"), l(p)) : (e.consume(p), u);
  }
  function h(p) {
    return p === 96 ? (e.consume(p), i++, h) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(p)) : (a.type = "codeTextData", u(p));
  }
}
class Ec {
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
    return r && nn(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), nn(this.left, t);
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
    this.setCursor(0), nn(this.right, t.reverse());
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
        nn(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        nn(this.left, n.reverse());
      }
  }
}
function nn(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function ba(e) {
  const t = {};
  let n = -1, r, i, a, o, s, l, u;
  const h = new Ec(e);
  for (; ++n < h.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = h.get(n), n && r[1].type === "chunkFlow" && h.get(n - 1)[1].type === "listItemPrefix" && (l = r[1]._tokenizer.events, a = 0, a < l.length && l[a][1].type === "lineEndingBlank" && (a += 2), a < l.length && l[a][1].type === "content"))
      for (; ++a < l.length && l[a][1].type !== "content"; )
        l[a][1].type === "chunkText" && (l[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, Tc(h, n)), n = t[n], u = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (o = h.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
          o[0] === "enter" && (i && (h.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
        else if (!(o[1].type === "linePrefix" || o[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...h.get(i)[1].start
      }, s = h.slice(i, n), s.unshift(r), h.splice(i, n - i + 1, s));
    }
  }
  return gt(e, 0, Number.POSITIVE_INFINITY, h.slice(0)), !u;
}
function Tc(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const s = o.events, l = [], u = {};
  let h, p, m = -1, d = n, y = 0, w = 0;
  const R = [w];
  for (; d; ) {
    for (; e.get(++i)[1] !== d; )
      ;
    a.push(i), d._tokenizer || (h = r.sliceStream(d), d.next || h.push(null), p && o.defineSkip(d.start), d._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(h), d._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), p = d, d = d.next;
  }
  for (d = n; ++m < s.length; )
    // Find a void token that includes a break.
    s[m][0] === "exit" && s[m - 1][0] === "enter" && s[m][1].type === s[m - 1][1].type && s[m][1].start.line !== s[m][1].end.line && (w = m + 1, R.push(w), d._tokenizer = void 0, d.previous = void 0, d = d.next);
  for (o.events = [], d ? (d._tokenizer = void 0, d.previous = void 0) : R.pop(), m = R.length; m--; ) {
    const S = s.slice(R[m], R[m + 1]), x = a.pop();
    l.push([x, x + S.length - 1]), e.splice(x, 2, S);
  }
  for (l.reverse(), m = -1; ++m < l.length; )
    u[y + l[m][0]] = y + l[m][1], y += l[m][1] - l[m][0] - 1;
  return u;
}
const _c = {
  resolve: xc,
  tokenize: bc
}, kc = {
  partial: !0,
  tokenize: vc
};
function xc(e) {
  return ba(e), e;
}
function bc(e, t) {
  let n;
  return r;
  function r(s) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(s);
  }
  function i(s) {
    return s === null ? a(s) : q(s) ? e.check(kc, o, a)(s) : (e.consume(s), i);
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
function vc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), le(e, a, "linePrefix");
  }
  function a(o) {
    if (o === null || q(o))
      return n(o);
    const s = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function va(e, t, n, r, i, a, o, s, l) {
  const u = l || Number.POSITIVE_INFINITY;
  let h = 0;
  return p;
  function p(S) {
    return S === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(S), e.exit(a), m) : S === null || S === 32 || S === 41 || mr(S) ? n(S) : (e.enter(r), e.enter(o), e.enter(s), e.enter("chunkString", {
      contentType: "string"
    }), w(S));
  }
  function m(S) {
    return S === 62 ? (e.enter(a), e.consume(S), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter("chunkString", {
      contentType: "string"
    }), d(S));
  }
  function d(S) {
    return S === 62 ? (e.exit("chunkString"), e.exit(s), m(S)) : S === null || S === 60 || q(S) ? n(S) : (e.consume(S), S === 92 ? y : d);
  }
  function y(S) {
    return S === 60 || S === 62 || S === 92 ? (e.consume(S), d) : d(S);
  }
  function w(S) {
    return !h && (S === null || S === 41 || Ve(S)) ? (e.exit("chunkString"), e.exit(s), e.exit(o), e.exit(r), t(S)) : h < u && S === 40 ? (e.consume(S), h++, w) : S === 41 ? (e.consume(S), h--, w) : S === null || S === 32 || S === 40 || mr(S) ? n(S) : (e.consume(S), S === 92 ? R : w);
  }
  function R(S) {
    return S === 40 || S === 41 || S === 92 ? (e.consume(S), w) : w(S);
  }
}
function Ia(e, t, n, r, i, a) {
  const o = this;
  let s = 0, l;
  return u;
  function u(d) {
    return e.enter(r), e.enter(i), e.consume(d), e.exit(i), e.enter(a), h;
  }
  function h(d) {
    return s > 999 || d === null || d === 91 || d === 93 && !l || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    d === 94 && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(d) : d === 93 ? (e.exit(a), e.enter(i), e.consume(d), e.exit(i), e.exit(r), t) : q(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), h) : (e.enter("chunkString", {
      contentType: "string"
    }), p(d));
  }
  function p(d) {
    return d === null || d === 91 || d === 93 || q(d) || s++ > 999 ? (e.exit("chunkString"), h(d)) : (e.consume(d), l || (l = !ae(d)), d === 92 ? m : p);
  }
  function m(d) {
    return d === 91 || d === 92 || d === 93 ? (e.consume(d), s++, p) : p(d);
  }
}
function Ra(e, t, n, r, i, a) {
  let o;
  return s;
  function s(m) {
    return m === 34 || m === 39 || m === 40 ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), o = m === 40 ? 41 : m, l) : n(m);
  }
  function l(m) {
    return m === o ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), t) : (e.enter(a), u(m));
  }
  function u(m) {
    return m === o ? (e.exit(a), l(o)) : m === null ? n(m) : q(m) ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), le(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), h(m));
  }
  function h(m) {
    return m === o || m === null || q(m) ? (e.exit("chunkString"), u(m)) : (e.consume(m), m === 92 ? p : h);
  }
  function p(m) {
    return m === o || m === 92 ? (e.consume(m), h) : h(m);
  }
}
function on(e, t) {
  let n;
  return r;
  function r(i) {
    return q(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : ae(i) ? le(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const Ic = {
  name: "definition",
  tokenize: Ac
}, Rc = {
  partial: !0,
  tokenize: Nc
};
function Ac(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(d) {
    return e.enter("definition"), o(d);
  }
  function o(d) {
    return Ia.call(
      r,
      e,
      s,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(d);
  }
  function s(d) {
    return i = $t(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), d === 58 ? (e.enter("definitionMarker"), e.consume(d), e.exit("definitionMarker"), l) : n(d);
  }
  function l(d) {
    return Ve(d) ? on(e, u)(d) : u(d);
  }
  function u(d) {
    return va(
      e,
      h,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(d);
  }
  function h(d) {
    return e.attempt(Rc, p, p)(d);
  }
  function p(d) {
    return ae(d) ? le(e, m, "whitespace")(d) : m(d);
  }
  function m(d) {
    return d === null || q(d) ? (e.exit("definition"), r.parser.defined.push(i), t(d)) : n(d);
  }
}
function Nc(e, t, n) {
  return r;
  function r(s) {
    return Ve(s) ? on(e, i)(s) : n(s);
  }
  function i(s) {
    return Ra(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(s);
  }
  function a(s) {
    return ae(s) ? le(e, o, "whitespace")(s) : o(s);
  }
  function o(s) {
    return s === null || q(s) ? t(s) : n(s);
  }
}
const Mc = {
  name: "hardBreakEscape",
  tokenize: Lc
};
function Lc(e, t, n) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), i;
  }
  function i(a) {
    return q(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
  }
}
const Oc = {
  name: "headingAtx",
  resolve: Dc,
  tokenize: Pc
};
function Dc(e, t) {
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
  }, gt(e, r, n - r + 1, [["enter", i, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]])), e;
}
function Pc(e, t, n) {
  let r = 0;
  return i;
  function i(h) {
    return e.enter("atxHeading"), a(h);
  }
  function a(h) {
    return e.enter("atxHeadingSequence"), o(h);
  }
  function o(h) {
    return h === 35 && r++ < 6 ? (e.consume(h), o) : h === null || Ve(h) ? (e.exit("atxHeadingSequence"), s(h)) : n(h);
  }
  function s(h) {
    return h === 35 ? (e.enter("atxHeadingSequence"), l(h)) : h === null || q(h) ? (e.exit("atxHeading"), t(h)) : ae(h) ? le(e, s, "whitespace")(h) : (e.enter("atxHeadingText"), u(h));
  }
  function l(h) {
    return h === 35 ? (e.consume(h), l) : (e.exit("atxHeadingSequence"), s(h));
  }
  function u(h) {
    return h === null || h === 35 || Ve(h) ? (e.exit("atxHeadingText"), s(h)) : (e.consume(h), u);
  }
}
const Hc = [
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
], Ti = ["pre", "script", "style", "textarea"], Fc = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Bc,
  tokenize: Wc
}, Uc = {
  partial: !0,
  tokenize: Vc
}, zc = {
  partial: !0,
  tokenize: Gc
};
function Bc(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Wc(e, t, n) {
  const r = this;
  let i, a, o, s, l;
  return u;
  function u(g) {
    return h(g);
  }
  function h(g) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(g), p;
  }
  function p(g) {
    return g === 33 ? (e.consume(g), m) : g === 47 ? (e.consume(g), a = !0, w) : g === 63 ? (e.consume(g), i = 3, r.interrupt ? t : f) : pt(g) ? (e.consume(g), o = String.fromCharCode(g), R) : n(g);
  }
  function m(g) {
    return g === 45 ? (e.consume(g), i = 2, d) : g === 91 ? (e.consume(g), i = 5, s = 0, y) : pt(g) ? (e.consume(g), i = 4, r.interrupt ? t : f) : n(g);
  }
  function d(g) {
    return g === 45 ? (e.consume(g), r.interrupt ? t : f) : n(g);
  }
  function y(g) {
    const Se = "CDATA[";
    return g === Se.charCodeAt(s++) ? (e.consume(g), s === Se.length ? r.interrupt ? t : b : y) : n(g);
  }
  function w(g) {
    return pt(g) ? (e.consume(g), o = String.fromCharCode(g), R) : n(g);
  }
  function R(g) {
    if (g === null || g === 47 || g === 62 || Ve(g)) {
      const Se = g === 47, re = o.toLowerCase();
      return !Se && !a && Ti.includes(re) ? (i = 1, r.interrupt ? t(g) : b(g)) : Hc.includes(o.toLowerCase()) ? (i = 6, Se ? (e.consume(g), S) : r.interrupt ? t(g) : b(g)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(g) : a ? x(g) : M(g));
    }
    return g === 45 || et(g) ? (e.consume(g), o += String.fromCharCode(g), R) : n(g);
  }
  function S(g) {
    return g === 62 ? (e.consume(g), r.interrupt ? t : b) : n(g);
  }
  function x(g) {
    return ae(g) ? (e.consume(g), x) : z(g);
  }
  function M(g) {
    return g === 47 ? (e.consume(g), z) : g === 58 || g === 95 || pt(g) ? (e.consume(g), P) : ae(g) ? (e.consume(g), M) : z(g);
  }
  function P(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || et(g) ? (e.consume(g), P) : L(g);
  }
  function L(g) {
    return g === 61 ? (e.consume(g), T) : ae(g) ? (e.consume(g), L) : M(g);
  }
  function T(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), l = g, D) : ae(g) ? (e.consume(g), T) : O(g);
  }
  function D(g) {
    return g === l ? (e.consume(g), l = null, $) : g === null || q(g) ? n(g) : (e.consume(g), D);
  }
  function O(g) {
    return g === null || g === 34 || g === 39 || g === 47 || g === 60 || g === 61 || g === 62 || g === 96 || Ve(g) ? L(g) : (e.consume(g), O);
  }
  function $(g) {
    return g === 47 || g === 62 || ae(g) ? M(g) : n(g);
  }
  function z(g) {
    return g === 62 ? (e.consume(g), N) : n(g);
  }
  function N(g) {
    return g === null || q(g) ? b(g) : ae(g) ? (e.consume(g), N) : n(g);
  }
  function b(g) {
    return g === 45 && i === 2 ? (e.consume(g), X) : g === 60 && i === 1 ? (e.consume(g), J) : g === 62 && i === 4 ? (e.consume(g), Q) : g === 63 && i === 3 ? (e.consume(g), f) : g === 93 && i === 5 ? (e.consume(g), we) : q(g) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Uc, Ie, F)(g)) : g === null || q(g) ? (e.exit("htmlFlowData"), F(g)) : (e.consume(g), b);
  }
  function F(g) {
    return e.check(zc, W, Ie)(g);
  }
  function W(g) {
    return e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), H;
  }
  function H(g) {
    return g === null || q(g) ? F(g) : (e.enter("htmlFlowData"), b(g));
  }
  function X(g) {
    return g === 45 ? (e.consume(g), f) : b(g);
  }
  function J(g) {
    return g === 47 ? (e.consume(g), o = "", de) : b(g);
  }
  function de(g) {
    if (g === 62) {
      const Se = o.toLowerCase();
      return Ti.includes(Se) ? (e.consume(g), Q) : b(g);
    }
    return pt(g) && o.length < 8 ? (e.consume(g), o += String.fromCharCode(g), de) : b(g);
  }
  function we(g) {
    return g === 93 ? (e.consume(g), f) : b(g);
  }
  function f(g) {
    return g === 62 ? (e.consume(g), Q) : g === 45 && i === 2 ? (e.consume(g), f) : b(g);
  }
  function Q(g) {
    return g === null || q(g) ? (e.exit("htmlFlowData"), Ie(g)) : (e.consume(g), Q);
  }
  function Ie(g) {
    return e.exit("htmlFlow"), t(g);
  }
}
function Gc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return q(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), a) : n(o);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function Vc(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(Pn, t, n);
  }
}
const $c = {
  name: "htmlText",
  tokenize: jc
};
function jc(e, t, n) {
  const r = this;
  let i, a, o;
  return s;
  function s(f) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(f), l;
  }
  function l(f) {
    return f === 33 ? (e.consume(f), u) : f === 47 ? (e.consume(f), L) : f === 63 ? (e.consume(f), M) : pt(f) ? (e.consume(f), O) : n(f);
  }
  function u(f) {
    return f === 45 ? (e.consume(f), h) : f === 91 ? (e.consume(f), a = 0, y) : pt(f) ? (e.consume(f), x) : n(f);
  }
  function h(f) {
    return f === 45 ? (e.consume(f), d) : n(f);
  }
  function p(f) {
    return f === null ? n(f) : f === 45 ? (e.consume(f), m) : q(f) ? (o = p, J(f)) : (e.consume(f), p);
  }
  function m(f) {
    return f === 45 ? (e.consume(f), d) : p(f);
  }
  function d(f) {
    return f === 62 ? X(f) : f === 45 ? m(f) : p(f);
  }
  function y(f) {
    const Q = "CDATA[";
    return f === Q.charCodeAt(a++) ? (e.consume(f), a === Q.length ? w : y) : n(f);
  }
  function w(f) {
    return f === null ? n(f) : f === 93 ? (e.consume(f), R) : q(f) ? (o = w, J(f)) : (e.consume(f), w);
  }
  function R(f) {
    return f === 93 ? (e.consume(f), S) : w(f);
  }
  function S(f) {
    return f === 62 ? X(f) : f === 93 ? (e.consume(f), S) : w(f);
  }
  function x(f) {
    return f === null || f === 62 ? X(f) : q(f) ? (o = x, J(f)) : (e.consume(f), x);
  }
  function M(f) {
    return f === null ? n(f) : f === 63 ? (e.consume(f), P) : q(f) ? (o = M, J(f)) : (e.consume(f), M);
  }
  function P(f) {
    return f === 62 ? X(f) : M(f);
  }
  function L(f) {
    return pt(f) ? (e.consume(f), T) : n(f);
  }
  function T(f) {
    return f === 45 || et(f) ? (e.consume(f), T) : D(f);
  }
  function D(f) {
    return q(f) ? (o = D, J(f)) : ae(f) ? (e.consume(f), D) : X(f);
  }
  function O(f) {
    return f === 45 || et(f) ? (e.consume(f), O) : f === 47 || f === 62 || Ve(f) ? $(f) : n(f);
  }
  function $(f) {
    return f === 47 ? (e.consume(f), X) : f === 58 || f === 95 || pt(f) ? (e.consume(f), z) : q(f) ? (o = $, J(f)) : ae(f) ? (e.consume(f), $) : X(f);
  }
  function z(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || et(f) ? (e.consume(f), z) : N(f);
  }
  function N(f) {
    return f === 61 ? (e.consume(f), b) : q(f) ? (o = N, J(f)) : ae(f) ? (e.consume(f), N) : $(f);
  }
  function b(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), i = f, F) : q(f) ? (o = b, J(f)) : ae(f) ? (e.consume(f), b) : (e.consume(f), W);
  }
  function F(f) {
    return f === i ? (e.consume(f), i = void 0, H) : f === null ? n(f) : q(f) ? (o = F, J(f)) : (e.consume(f), F);
  }
  function W(f) {
    return f === null || f === 34 || f === 39 || f === 60 || f === 61 || f === 96 ? n(f) : f === 47 || f === 62 || Ve(f) ? $(f) : (e.consume(f), W);
  }
  function H(f) {
    return f === 47 || f === 62 || Ve(f) ? $(f) : n(f);
  }
  function X(f) {
    return f === 62 ? (e.consume(f), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(f);
  }
  function J(f) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), de;
  }
  function de(f) {
    return ae(f) ? le(e, we, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : we(f);
  }
  function we(f) {
    return e.enter("htmlTextData"), o(f);
  }
}
const Mr = {
  name: "labelEnd",
  resolveAll: Xc,
  resolveTo: Yc,
  tokenize: Jc
}, Zc = {
  tokenize: Qc
}, Kc = {
  tokenize: eu
}, qc = {
  tokenize: tu
};
function Xc(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e.length !== n.length && gt(e, 0, e.length, n), e;
}
function Yc(e, t) {
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
  }, u = {
    type: "label",
    start: {
      ...e[a][1].start
    },
    end: {
      ...e[o][1].end
    }
  }, h = {
    type: "labelText",
    start: {
      ...e[a + r + 2][1].end
    },
    end: {
      ...e[o - 2][1].start
    }
  };
  return s = [["enter", l, t], ["enter", u, t]], s = rt(s, e.slice(a + 1, a + r + 3)), s = rt(s, [["enter", h, t]]), s = rt(s, Nr(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t)), s = rt(s, [["exit", h, t], e[o - 2], e[o - 1], ["exit", u, t]]), s = rt(s, e.slice(o + 1)), s = rt(s, [["exit", l, t]]), gt(e, a, e.length, s), e;
}
function Jc(e, t, n) {
  const r = this;
  let i = r.events.length, a, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return s;
  function s(m) {
    return a ? a._inactive ? p(m) : (o = r.parser.defined.includes($t(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(m), e.exit("labelMarker"), e.exit("labelEnd"), l) : n(m);
  }
  function l(m) {
    return m === 40 ? e.attempt(Zc, h, o ? h : p)(m) : m === 91 ? e.attempt(Kc, h, o ? u : p)(m) : o ? h(m) : p(m);
  }
  function u(m) {
    return e.attempt(qc, h, p)(m);
  }
  function h(m) {
    return t(m);
  }
  function p(m) {
    return a._balanced = !0, n(m);
  }
}
function Qc(e, t, n) {
  return r;
  function r(p) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), i;
  }
  function i(p) {
    return Ve(p) ? on(e, a)(p) : a(p);
  }
  function a(p) {
    return p === 41 ? h(p) : va(e, o, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(p);
  }
  function o(p) {
    return Ve(p) ? on(e, l)(p) : h(p);
  }
  function s(p) {
    return n(p);
  }
  function l(p) {
    return p === 34 || p === 39 || p === 40 ? Ra(e, u, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(p) : h(p);
  }
  function u(p) {
    return Ve(p) ? on(e, h)(p) : h(p);
  }
  function h(p) {
    return p === 41 ? (e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), e.exit("resource"), t) : n(p);
  }
}
function eu(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return Ia.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(s);
  }
  function a(s) {
    return r.parser.defined.includes($t(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(s) : n(s);
  }
  function o(s) {
    return n(s);
  }
}
function tu(e, t, n) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), i;
  }
  function i(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), t) : n(a);
  }
}
const nu = {
  name: "labelStartImage",
  resolveAll: Mr.resolveAll,
  tokenize: ru
};
function ru(e, t, n) {
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
const iu = {
  name: "labelStartLink",
  resolveAll: Mr.resolveAll,
  tokenize: au
};
function au(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), a;
  }
  function a(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const Jn = {
  name: "lineEnding",
  tokenize: ou
};
function ou(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), le(e, t, "linePrefix");
  }
}
const vn = {
  name: "thematicBreak",
  tokenize: su
};
function su(e, t, n) {
  let r = 0, i;
  return a;
  function a(u) {
    return e.enter("thematicBreak"), o(u);
  }
  function o(u) {
    return i = u, s(u);
  }
  function s(u) {
    return u === i ? (e.enter("thematicBreakSequence"), l(u)) : r >= 3 && (u === null || q(u)) ? (e.exit("thematicBreak"), t(u)) : n(u);
  }
  function l(u) {
    return u === i ? (e.consume(u), r++, l) : (e.exit("thematicBreakSequence"), ae(u) ? le(e, s, "whitespace")(u) : s(u));
  }
}
const Ge = {
  continuation: {
    tokenize: hu
  },
  exit: pu,
  name: "list",
  tokenize: uu
}, lu = {
  partial: !0,
  tokenize: fu
}, cu = {
  partial: !0,
  tokenize: du
};
function uu(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return s;
  function s(d) {
    const y = r.containerState.type || (d === 42 || d === 43 || d === 45 ? "listUnordered" : "listOrdered");
    if (y === "listUnordered" ? !r.containerState.marker || d === r.containerState.marker : Cr(d)) {
      if (r.containerState.type || (r.containerState.type = y, e.enter(y, {
        _container: !0
      })), y === "listUnordered")
        return e.enter("listItemPrefix"), d === 42 || d === 45 ? e.check(vn, n, u)(d) : u(d);
      if (!r.interrupt || d === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), l(d);
    }
    return n(d);
  }
  function l(d) {
    return Cr(d) && ++o < 10 ? (e.consume(d), l) : (!r.interrupt || o < 2) && (r.containerState.marker ? d === r.containerState.marker : d === 41 || d === 46) ? (e.exit("listItemValue"), u(d)) : n(d);
  }
  function u(d) {
    return e.enter("listItemMarker"), e.consume(d), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || d, e.check(
      Pn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : h,
      e.attempt(lu, m, p)
    );
  }
  function h(d) {
    return r.containerState.initialBlankLine = !0, a++, m(d);
  }
  function p(d) {
    return ae(d) ? (e.enter("listItemPrefixWhitespace"), e.consume(d), e.exit("listItemPrefixWhitespace"), m) : n(d);
  }
  function m(d) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(d);
  }
}
function hu(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Pn, i, a);
  function i(s) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, le(e, t, "listItemIndent", r.containerState.size + 1)(s);
  }
  function a(s) {
    return r.containerState.furtherBlankLines || !ae(s) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(s)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(cu, t, o)(s));
  }
  function o(s) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, le(e, e.attempt(Ge, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s);
  }
}
function du(e, t, n) {
  const r = this;
  return le(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function pu(e) {
  e.exit(this.containerState.type);
}
function fu(e, t, n) {
  const r = this;
  return le(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const o = r.events[r.events.length - 1];
    return !ae(a) && o && o[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const _i = {
  name: "setextUnderline",
  resolveTo: gu,
  tokenize: mu
};
function gu(e, t) {
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
function mu(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(u) {
    let h = r.events.length, p;
    for (; h--; )
      if (r.events[h][1].type !== "lineEnding" && r.events[h][1].type !== "linePrefix" && r.events[h][1].type !== "content") {
        p = r.events[h][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || p) ? (e.enter("setextHeadingLine"), i = u, o(u)) : n(u);
  }
  function o(u) {
    return e.enter("setextHeadingLineSequence"), s(u);
  }
  function s(u) {
    return u === i ? (e.consume(u), s) : (e.exit("setextHeadingLineSequence"), ae(u) ? le(e, l, "lineSuffix")(u) : l(u));
  }
  function l(u) {
    return u === null || q(u) ? (e.exit("setextHeadingLine"), t(u)) : n(u);
  }
}
const Cu = {
  tokenize: yu
};
function yu(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    Pn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, le(e, e.attempt(this.parser.constructs.flow, i, e.attempt(_c, i)), "linePrefix"))
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
const wu = {
  resolveAll: Na()
}, Su = Aa("string"), Eu = Aa("text");
function Aa(e) {
  return {
    resolveAll: Na(e === "text" ? Tu : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], a = n.attempt(i, o, s);
    return o;
    function o(h) {
      return u(h) ? a(h) : s(h);
    }
    function s(h) {
      if (h === null) {
        n.consume(h);
        return;
      }
      return n.enter("data"), n.consume(h), l;
    }
    function l(h) {
      return u(h) ? (n.exit("data"), a(h)) : (n.consume(h), l);
    }
    function u(h) {
      if (h === null)
        return !0;
      const p = i[h];
      let m = -1;
      if (p)
        for (; ++m < p.length; ) {
          const d = p[m];
          if (!d.previous || d.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Na(e) {
  return t;
  function t(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === "data" && (a = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function Tu(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let a = i.length, o = -1, s = 0, l;
      for (; a--; ) {
        const u = i[a];
        if (typeof u == "string") {
          for (o = u.length; u.charCodeAt(o - 1) === 32; )
            s++, o--;
          if (o) break;
          o = -1;
        } else if (u === -2)
          l = !0, s++;
        else if (u !== -1) {
          a++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (s = 0), s) {
        const u = {
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
          ...u.start
        }, r.start.offset === r.end.offset ? Object.assign(r, u) : (e.splice(n, 0, ["enter", u, t], ["exit", u, t]), n += 2);
      }
      n++;
    }
  return e;
}
const _u = {
  42: Ge,
  43: Ge,
  45: Ge,
  48: Ge,
  49: Ge,
  50: Ge,
  51: Ge,
  52: Ge,
  53: Ge,
  54: Ge,
  55: Ge,
  56: Ge,
  57: Ge,
  62: _a
}, ku = {
  91: Ic
}, xu = {
  [-2]: Yn,
  [-1]: Yn,
  32: Yn
}, bu = {
  35: Oc,
  42: vn,
  45: [_i, vn],
  60: Fc,
  61: _i,
  95: vn,
  96: Ei,
  126: Ei
}, vu = {
  38: xa,
  92: ka
}, Iu = {
  [-5]: Jn,
  [-4]: Jn,
  [-3]: Jn,
  33: nu,
  38: xa,
  42: yr,
  60: [ic, $c],
  91: iu,
  92: [Mc, ka],
  93: Mr,
  95: yr,
  96: Cc
}, Ru = {
  null: [yr, wu]
}, Au = {
  null: [42, 95]
}, Nu = {
  null: []
}, Mu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Au,
  contentInitial: ku,
  disable: Nu,
  document: _u,
  flow: bu,
  flowInitial: xu,
  insideSpan: Ru,
  string: vu,
  text: Iu
}, Symbol.toStringTag, { value: "Module" }));
function Lu(e, t, n) {
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
    attempt: D(L),
    check: D(T),
    consume: x,
    enter: M,
    exit: P,
    interrupt: D(T, {
      interrupt: !0
    })
  }, u = {
    code: null,
    containerState: {},
    defineSkip: w,
    events: [],
    now: y,
    parser: e,
    previous: null,
    sliceSerialize: m,
    sliceStream: d,
    write: p
  };
  let h = t.tokenize.call(u, l);
  return t.resolveAll && a.push(t), u;
  function p(N) {
    return o = rt(o, N), R(), o[o.length - 1] !== null ? [] : (O(t, 0), u.events = Nr(a, u.events, u), u.events);
  }
  function m(N, b) {
    return Du(d(N), b);
  }
  function d(N) {
    return Ou(o, N);
  }
  function y() {
    const {
      _bufferIndex: N,
      _index: b,
      line: F,
      column: W,
      offset: H
    } = r;
    return {
      _bufferIndex: N,
      _index: b,
      line: F,
      column: W,
      offset: H
    };
  }
  function w(N) {
    i[N.line] = N.column, z();
  }
  function R() {
    let N;
    for (; r._index < o.length; ) {
      const b = o[r._index];
      if (typeof b == "string")
        for (N = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === N && r._bufferIndex < b.length; )
          S(b.charCodeAt(r._bufferIndex));
      else
        S(b);
    }
  }
  function S(N) {
    h = h(N);
  }
  function x(N) {
    q(N) ? (r.line++, r.column = 1, r.offset += N === -3 ? 2 : 1, z()) : N !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = N;
  }
  function M(N, b) {
    const F = b || {};
    return F.type = N, F.start = y(), u.events.push(["enter", F, u]), s.push(F), F;
  }
  function P(N) {
    const b = s.pop();
    return b.end = y(), u.events.push(["exit", b, u]), b;
  }
  function L(N, b) {
    O(N, b.from);
  }
  function T(N, b) {
    b.restore();
  }
  function D(N, b) {
    return F;
    function F(W, H, X) {
      let J, de, we, f;
      return Array.isArray(W) ? (
        /* c8 ignore next 1 */
        Ie(W)
      ) : "tokenize" in W ? (
        // Looks like a construct.
        Ie([
          /** @type {Construct} */
          W
        ])
      ) : Q(W);
      function Q(oe) {
        return je;
        function je(Te) {
          const tt = Te !== null && oe[Te], _e = Te !== null && oe.null, Me = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(tt) ? tt : tt ? [tt] : [],
            ...Array.isArray(_e) ? _e : _e ? [_e] : []
          ];
          return Ie(Me)(Te);
        }
      }
      function Ie(oe) {
        return J = oe, de = 0, oe.length === 0 ? X : g(oe[de]);
      }
      function g(oe) {
        return je;
        function je(Te) {
          return f = $(), we = oe, oe.partial || (u.currentConstruct = oe), oe.name && u.parser.constructs.disable.null.includes(oe.name) ? re() : oe.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            b ? Object.assign(Object.create(u), b) : u,
            l,
            Se,
            re
          )(Te);
        }
      }
      function Se(oe) {
        return N(we, f), H;
      }
      function re(oe) {
        return f.restore(), ++de < J.length ? g(J[de]) : X;
      }
    }
  }
  function O(N, b) {
    N.resolveAll && !a.includes(N) && a.push(N), N.resolve && gt(u.events, b, u.events.length - b, N.resolve(u.events.slice(b), u)), N.resolveTo && (u.events = N.resolveTo(u.events, u));
  }
  function $() {
    const N = y(), b = u.previous, F = u.currentConstruct, W = u.events.length, H = Array.from(s);
    return {
      from: W,
      restore: X
    };
    function X() {
      r = N, u.previous = b, u.currentConstruct = F, u.events.length = W, s = H, z();
    }
  }
  function z() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Ou(e, t) {
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
function Du(e, t) {
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
function Pu(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Gl([Mu, ...(e || {}).extensions || []])
    ),
    content: i(Yl),
    defined: [],
    document: i(Ql),
    flow: i(Cu),
    lazy: {},
    string: i(Su),
    text: i(Eu)
  };
  return r;
  function i(a) {
    return o;
    function o(s) {
      return Lu(r, a, s);
    }
  }
}
function Hu(e) {
  for (; !ba(e); )
    ;
  return e;
}
const ki = /[\0\t\n\r]/g;
function Fu() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, o, s) {
    const l = [];
    let u, h, p, m, d;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(o || void 0).decode(a)), p = 0, t = "", n && (a.charCodeAt(0) === 65279 && p++, n = void 0); p < a.length; ) {
      if (ki.lastIndex = p, u = ki.exec(a), m = u && u.index !== void 0 ? u.index : a.length, d = a.charCodeAt(m), !u) {
        t = a.slice(p);
        break;
      }
      if (d === 10 && p === m && r)
        l.push(-3), r = void 0;
      else
        switch (r && (l.push(-5), r = void 0), p < m && (l.push(a.slice(p, m)), e += m - p), d) {
          case 0: {
            l.push(65533), e++;
            break;
          }
          case 9: {
            for (h = Math.ceil(e / 4) * 4, l.push(-2); e++ < h; ) l.push(-1);
            break;
          }
          case 10: {
            l.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      p = m + 1;
    }
    return s && (r && l.push(-5), t && l.push(t), l.push(null)), l;
  }
}
const Uu = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function zu(e) {
  return e.replace(Uu, Bu);
}
function Bu(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return Ta(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return Ar(n) || e;
}
const Ma = {}.hasOwnProperty;
function Wu(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Gu(n)(Hu(Pu(n).document().write(Fu()(e, t, !0))));
}
function Gu(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(wt),
      autolinkProtocol: $,
      autolinkEmail: $,
      atxHeading: a(Ze),
      blockQuote: a(_e),
      characterEscape: $,
      characterReference: $,
      codeFenced: a(Me),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: a(Me, o),
      codeText: a(Nt, o),
      codeTextData: $,
      data: $,
      codeFlowValue: $,
      definition: a(at),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: a(mt),
      hardBreakEscape: a(Ct),
      hardBreakTrailing: a(Ct),
      htmlFlow: a(yt, o),
      htmlFlowData: $,
      htmlText: a(yt, o),
      htmlTextData: $,
      image: a(ot),
      label: o,
      link: a(wt),
      listItem: a(Mt),
      listItemValue: m,
      listOrdered: a(St, p),
      listUnordered: a(St),
      paragraph: a(Lt),
      reference: g,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: a(Ze),
      strong: a(Ht),
      thematicBreak: a(Ke)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: L,
      autolink: l(),
      autolinkEmail: tt,
      autolinkProtocol: Te,
      blockQuote: l(),
      characterEscapeValue: z,
      characterReferenceMarkerHexadecimal: re,
      characterReferenceMarkerNumeric: re,
      characterReferenceValue: oe,
      characterReference: je,
      codeFenced: l(R),
      codeFencedFence: w,
      codeFencedFenceInfo: d,
      codeFencedFenceMeta: y,
      codeFlowValue: z,
      codeIndented: l(S),
      codeText: l(H),
      codeTextData: z,
      data: z,
      definition: l(),
      definitionDestinationString: P,
      definitionLabelString: x,
      definitionTitleString: M,
      emphasis: l(),
      hardBreakEscape: l(b),
      hardBreakTrailing: l(b),
      htmlFlow: l(F),
      htmlFlowData: z,
      htmlText: l(W),
      htmlTextData: z,
      image: l(J),
      label: we,
      labelText: de,
      lineEnding: N,
      link: l(X),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: Se,
      resourceDestinationString: f,
      resourceTitleString: Q,
      resource: Ie,
      setextHeading: l(O),
      setextHeadingLineSequence: D,
      setextHeadingText: T,
      strong: l(),
      thematicBreak: l()
    }
  };
  La(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(E) {
    let A = {
      type: "root",
      children: []
    };
    const j = {
      stack: [A],
      tokenStack: [],
      config: t,
      enter: s,
      exit: u,
      buffer: o,
      resume: h,
      data: n
    }, B = [];
    let ne = -1;
    for (; ++ne < E.length; )
      if (E[ne][1].type === "listOrdered" || E[ne][1].type === "listUnordered")
        if (E[ne][0] === "enter")
          B.push(ne);
        else {
          const Re = B.pop();
          ne = i(E, Re, ne);
        }
    for (ne = -1; ++ne < E.length; ) {
      const Re = t[E[ne][0]];
      Ma.call(Re, E[ne][1].type) && Re[E[ne][1].type].call(Object.assign({
        sliceSerialize: E[ne][2].sliceSerialize
      }, j), E[ne][1]);
    }
    if (j.tokenStack.length > 0) {
      const Re = j.tokenStack[j.tokenStack.length - 1];
      (Re[1] || xi).call(j, void 0, Re[0]);
    }
    for (A.position = {
      start: It(E.length > 0 ? E[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: It(E.length > 0 ? E[E.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, ne = -1; ++ne < t.transforms.length; )
      A = t.transforms[ne](A) || A;
    return A;
  }
  function i(E, A, j) {
    let B = A - 1, ne = -1, Re = !1, Fe, Le, qe, Ee;
    for (; ++B <= j; ) {
      const he = E[B];
      switch (he[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          he[0] === "enter" ? ne++ : ne--, Ee = void 0;
          break;
        }
        case "lineEndingBlank": {
          he[0] === "enter" && (Fe && !Ee && !ne && !qe && (qe = B), Ee = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Ee = void 0;
      }
      if (!ne && he[0] === "enter" && he[1].type === "listItemPrefix" || ne === -1 && he[0] === "exit" && (he[1].type === "listUnordered" || he[1].type === "listOrdered")) {
        if (Fe) {
          let Ae = B;
          for (Le = void 0; Ae--; ) {
            const ke = E[Ae];
            if (ke[1].type === "lineEnding" || ke[1].type === "lineEndingBlank") {
              if (ke[0] === "exit") continue;
              Le && (E[Le][1].type = "lineEndingBlank", Re = !0), ke[1].type = "lineEnding", Le = Ae;
            } else if (!(ke[1].type === "linePrefix" || ke[1].type === "blockQuotePrefix" || ke[1].type === "blockQuotePrefixWhitespace" || ke[1].type === "blockQuoteMarker" || ke[1].type === "listItemIndent")) break;
          }
          qe && (!Le || qe < Le) && (Fe._spread = !0), Fe.end = Object.assign({}, Le ? E[Le][1].start : he[1].end), E.splice(Le || B, 0, ["exit", Fe, he[2]]), B++, j++;
        }
        if (he[1].type === "listItemPrefix") {
          const Ae = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, he[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Fe = Ae, E.splice(B, 0, ["enter", Ae, he[2]]), B++, j++, qe = void 0, Ee = !0;
        }
      }
    }
    return E[A][1]._spread = Re, j;
  }
  function a(E, A) {
    return j;
    function j(B) {
      s.call(this, E(B), B), A && A.call(this, B);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function s(E, A, j) {
    this.stack[this.stack.length - 1].children.push(E), this.stack.push(E), this.tokenStack.push([A, j || void 0]), E.position = {
      start: It(A.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function l(E) {
    return A;
    function A(j) {
      E && E.call(this, j), u.call(this, j);
    }
  }
  function u(E, A) {
    const j = this.stack.pop(), B = this.tokenStack.pop();
    if (B)
      B[0].type !== E.type && (A ? A.call(this, E, B[0]) : (B[1] || xi).call(this, E, B[0]));
    else throw new Error("Cannot close `" + E.type + "` (" + an({
      start: E.start,
      end: E.end
    }) + "): it’s not open");
    j.position.end = It(E.end);
  }
  function h() {
    return Bl(this.stack.pop());
  }
  function p() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(E) {
    if (this.data.expectingFirstListItemValue) {
      const A = this.stack[this.stack.length - 2];
      A.start = Number.parseInt(this.sliceSerialize(E), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function d() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.lang = E;
  }
  function y() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.meta = E;
  }
  function w() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function R() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function S() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = E.replace(/(\r?\n|\r)$/g, "");
  }
  function x(E) {
    const A = this.resume(), j = this.stack[this.stack.length - 1];
    j.label = A, j.identifier = $t(this.sliceSerialize(E)).toLowerCase();
  }
  function M() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.title = E;
  }
  function P() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.url = E;
  }
  function L(E) {
    const A = this.stack[this.stack.length - 1];
    if (!A.depth) {
      const j = this.sliceSerialize(E).length;
      A.depth = j;
    }
  }
  function T() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function D(E) {
    const A = this.stack[this.stack.length - 1];
    A.depth = this.sliceSerialize(E).codePointAt(0) === 61 ? 1 : 2;
  }
  function O() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function $(E) {
    const j = this.stack[this.stack.length - 1].children;
    let B = j[j.length - 1];
    (!B || B.type !== "text") && (B = Et(), B.position = {
      start: It(E.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, j.push(B)), this.stack.push(B);
  }
  function z(E) {
    const A = this.stack.pop();
    A.value += this.sliceSerialize(E), A.position.end = It(E.end);
  }
  function N(E) {
    const A = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const j = A.children[A.children.length - 1];
      j.position.end = It(E.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(A.type) && ($.call(this, E), z.call(this, E));
  }
  function b() {
    this.data.atHardBreak = !0;
  }
  function F() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = E;
  }
  function W() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = E;
  }
  function H() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = E;
  }
  function X() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const A = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = A, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function J() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const A = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = A, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function de(E) {
    const A = this.sliceSerialize(E), j = this.stack[this.stack.length - 2];
    j.label = zu(A), j.identifier = $t(A).toLowerCase();
  }
  function we() {
    const E = this.stack[this.stack.length - 1], A = this.resume(), j = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, j.type === "link") {
      const B = E.children;
      j.children = B;
    } else
      j.alt = A;
  }
  function f() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.url = E;
  }
  function Q() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.title = E;
  }
  function Ie() {
    this.data.inReference = void 0;
  }
  function g() {
    this.data.referenceType = "collapsed";
  }
  function Se(E) {
    const A = this.resume(), j = this.stack[this.stack.length - 1];
    j.label = A, j.identifier = $t(this.sliceSerialize(E)).toLowerCase(), this.data.referenceType = "full";
  }
  function re(E) {
    this.data.characterReferenceType = E.type;
  }
  function oe(E) {
    const A = this.sliceSerialize(E), j = this.data.characterReferenceType;
    let B;
    j ? (B = Ta(A, j === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : B = Ar(A);
    const ne = this.stack[this.stack.length - 1];
    ne.value += B;
  }
  function je(E) {
    const A = this.stack.pop();
    A.position.end = It(E.end);
  }
  function Te(E) {
    z.call(this, E);
    const A = this.stack[this.stack.length - 1];
    A.url = this.sliceSerialize(E);
  }
  function tt(E) {
    z.call(this, E);
    const A = this.stack[this.stack.length - 1];
    A.url = "mailto:" + this.sliceSerialize(E);
  }
  function _e() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function Me() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Nt() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function at() {
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
  function Ze() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Ct() {
    return {
      type: "break"
    };
  }
  function yt() {
    return {
      type: "html",
      value: ""
    };
  }
  function ot() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function wt() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function St(E) {
    return {
      type: "list",
      ordered: E.type === "listOrdered",
      start: null,
      spread: E._spread,
      children: []
    };
  }
  function Mt(E) {
    return {
      type: "listItem",
      spread: E._spread,
      checked: null,
      children: []
    };
  }
  function Lt() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Ht() {
    return {
      type: "strong",
      children: []
    };
  }
  function Et() {
    return {
      type: "text",
      value: ""
    };
  }
  function Ke() {
    return {
      type: "thematicBreak"
    };
  }
}
function It(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function La(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? La(e, r) : Vu(e, r);
  }
}
function Vu(e, t) {
  let n;
  for (n in t)
    if (Ma.call(t, n))
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
function xi(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + an({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + an({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + an({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function $u(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return Wu(r, {
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
function ju(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Zu(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function Ku(e, t) {
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
function qu(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Xu(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Yu(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Kt(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
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
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [l]
  };
  return e.patch(t, u), e.applyData(t, u);
}
function Ju(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Qu(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function Oa(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function e1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Oa(e, t);
  const i = { src: Kt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function t1(e, t) {
  const n = { src: Kt(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function n1(e, t) {
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
function r1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Oa(e, t);
  const i = { href: Kt(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function i1(e, t) {
  const n = { href: Kt(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function a1(e, t, n) {
  const r = e.all(t), i = n ? o1(n) : Da(t), a = {}, o = [];
  if (typeof t.checked == "boolean") {
    const h = r[0];
    let p;
    h && h.type === "element" && h.tagName === "p" ? p = h : (p = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(p)), p.children.length > 0 && p.children.unshift({ type: "text", value: " " }), p.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), a.className = ["task-list-item"];
  }
  let s = -1;
  for (; ++s < r.length; ) {
    const h = r[s];
    (i || s !== 0 || h.type !== "element" || h.tagName !== "p") && o.push({ type: "text", value: `
` }), h.type === "element" && h.tagName === "p" && !i ? o.push(...h.children) : o.push(h);
  }
  const l = r[r.length - 1];
  l && (i || l.type !== "element" || l.tagName !== "p") && o.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: a, children: o };
  return e.patch(t, u), e.applyData(t, u);
}
function o1(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = Da(n[r]);
  }
  return t;
}
function Da(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function s1(e, t) {
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
function l1(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function c1(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function u1(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function h1(e, t) {
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
    }, s = br(t.children[1]), l = ga(t.children[t.children.length - 1]);
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
function d1(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, s = o ? o.length : t.children.length;
  let l = -1;
  const u = [];
  for (; ++l < s; ) {
    const p = t.children[l], m = {}, d = o ? o[l] : void 0;
    d && (m.align = d);
    let y = { type: "element", tagName: a, properties: m, children: [] };
    p && (y.children = e.all(p), e.patch(p, y), y = e.applyData(p, y)), u.push(y);
  }
  const h = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(t, h), e.applyData(t, h);
}
function p1(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const bi = 9, vi = 32;
function f1(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const a = [];
  for (; r; )
    a.push(
      Ii(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return a.push(Ii(t.slice(i), i > 0, !1)), a.join("");
}
function Ii(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let a = e.codePointAt(r);
    for (; a === bi || a === vi; )
      r++, a = e.codePointAt(r);
  }
  if (n) {
    let a = e.codePointAt(i - 1);
    for (; a === bi || a === vi; )
      i--, a = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function g1(e, t) {
  const n = { type: "text", value: f1(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function m1(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const C1 = {
  blockquote: ju,
  break: Zu,
  code: Ku,
  delete: qu,
  emphasis: Xu,
  footnoteReference: Yu,
  heading: Ju,
  html: Qu,
  imageReference: e1,
  image: t1,
  inlineCode: n1,
  linkReference: r1,
  link: i1,
  listItem: a1,
  list: s1,
  paragraph: l1,
  // @ts-expect-error: root is different, but hard to type.
  root: c1,
  strong: u1,
  table: h1,
  tableCell: p1,
  tableRow: d1,
  text: g1,
  thematicBreak: m1,
  toml: Tn,
  yaml: Tn,
  definition: Tn,
  footnoteDefinition: Tn
};
function Tn() {
}
const Pa = -1, Hn = 0, sn = 1, Mn = 2, Lr = 3, Or = 4, Dr = 5, Pr = 6, Ha = 7, Fa = 8, Ri = typeof self == "object" ? self : globalThis, y1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, o] = t[i];
    switch (a) {
      case Hn:
      case Pa:
        return n(o, i);
      case sn: {
        const s = n([], i);
        for (const l of o)
          s.push(r(l));
        return s;
      }
      case Mn: {
        const s = n({}, i);
        for (const [l, u] of o)
          s[r(l)] = r(u);
        return s;
      }
      case Lr:
        return n(new Date(o), i);
      case Or: {
        const { source: s, flags: l } = o;
        return n(new RegExp(s, l), i);
      }
      case Dr: {
        const s = n(/* @__PURE__ */ new Map(), i);
        for (const [l, u] of o)
          s.set(r(l), r(u));
        return s;
      }
      case Pr: {
        const s = n(/* @__PURE__ */ new Set(), i);
        for (const l of o)
          s.add(r(l));
        return s;
      }
      case Ha: {
        const { name: s, message: l } = o;
        return n(new Ri[s](l), i);
      }
      case Fa:
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
    return n(new Ri[a](o), i);
  };
  return r;
}, Ai = (e) => y1(/* @__PURE__ */ new Map(), e)(0), Bt = "", { toString: w1 } = {}, { keys: S1 } = Object, rn = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Hn, t];
  const n = w1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [sn, Bt];
    case "Object":
      return [Mn, Bt];
    case "Date":
      return [Lr, Bt];
    case "RegExp":
      return [Or, Bt];
    case "Map":
      return [Dr, Bt];
    case "Set":
      return [Pr, Bt];
    case "DataView":
      return [sn, n];
  }
  return n.includes("Array") ? [sn, n] : n.includes("Error") ? [Ha, n] : [Mn, n];
}, _n = ([e, t]) => e === Hn && (t === "function" || t === "symbol"), E1 = (e, t, n, r) => {
  const i = (o, s) => {
    const l = r.push(o) - 1;
    return n.set(s, l), l;
  }, a = (o) => {
    if (n.has(o))
      return n.get(o);
    let [s, l] = rn(o);
    switch (s) {
      case Hn: {
        let h = o;
        switch (l) {
          case "bigint":
            s = Fa, h = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + l);
            h = null;
            break;
          case "undefined":
            return i([Pa], o);
        }
        return i([s, h], o);
      }
      case sn: {
        if (l) {
          let m = o;
          return l === "DataView" ? m = new Uint8Array(o.buffer) : l === "ArrayBuffer" && (m = new Uint8Array(o)), i([l, [...m]], o);
        }
        const h = [], p = i([s, h], o);
        for (const m of o)
          h.push(a(m));
        return p;
      }
      case Mn: {
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
        const h = [], p = i([s, h], o);
        for (const m of S1(o))
          (e || !_n(rn(o[m]))) && h.push([a(m), a(o[m])]);
        return p;
      }
      case Lr:
        return i([s, o.toISOString()], o);
      case Or: {
        const { source: h, flags: p } = o;
        return i([s, { source: h, flags: p }], o);
      }
      case Dr: {
        const h = [], p = i([s, h], o);
        for (const [m, d] of o)
          (e || !(_n(rn(m)) || _n(rn(d)))) && h.push([a(m), a(d)]);
        return p;
      }
      case Pr: {
        const h = [], p = i([s, h], o);
        for (const m of o)
          (e || !_n(rn(m))) && h.push(a(m));
        return p;
      }
    }
    const { message: u } = o;
    return i([s, { name: l, message: u }], o);
  };
  return a;
}, Ni = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return E1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, Ln = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Ai(Ni(e, t)) : structuredClone(e)
) : (e, t) => Ai(Ni(e, t));
function T1(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function _1(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function k1(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || T1, r = e.options.footnoteBackLabel || _1, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, s = [];
  let l = -1;
  for (; ++l < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[l]
    );
    if (!u)
      continue;
    const h = e.all(u), p = String(u.identifier).toUpperCase(), m = Kt(p.toLowerCase());
    let d = 0;
    const y = [], w = e.footnoteCounts.get(p);
    for (; w !== void 0 && ++d <= w; ) {
      y.length > 0 && y.push({ type: "text", value: " " });
      let x = typeof n == "string" ? n : n(l, d);
      typeof x == "string" && (x = { type: "text", value: x }), y.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + m + (d > 1 ? "-" + d : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(l, d),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(x) ? x : [x]
      });
    }
    const R = h[h.length - 1];
    if (R && R.type === "element" && R.tagName === "p") {
      const x = R.children[R.children.length - 1];
      x && x.type === "text" ? x.value += " " : R.children.push({ type: "text", value: " " }), R.children.push(...y);
    } else
      h.push(...y);
    const S = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + m },
      children: e.wrap(h, !0)
    };
    e.patch(u, S), s.push(S);
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
            ...Ln(o),
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
const Ua = (
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
      return I1;
    if (typeof e == "function")
      return Fn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? x1(e) : b1(e);
    if (typeof e == "string")
      return v1(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function x1(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Ua(e[n]);
  return Fn(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function b1(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Fn(n);
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
function v1(e) {
  return Fn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Fn(e) {
  return t;
  function t(n, r, i) {
    return !!(R1(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function I1() {
  return !0;
}
function R1(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const za = [], A1 = !0, Mi = !1, N1 = "skip";
function M1(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = Ua(i), o = r ? -1 : 1;
  s(e, void 0, [])();
  function s(l, u, h) {
    const p = (
      /** @type {Record<string, unknown>} */
      l && typeof l == "object" ? l : {}
    );
    if (typeof p.type == "string") {
      const d = (
        // `hast`
        typeof p.tagName == "string" ? p.tagName : (
          // `xast`
          typeof p.name == "string" ? p.name : void 0
        )
      );
      Object.defineProperty(m, "name", {
        value: "node (" + (l.type + (d ? "<" + d + ">" : "")) + ")"
      });
    }
    return m;
    function m() {
      let d = za, y, w, R;
      if ((!t || a(l, u, h[h.length - 1] || void 0)) && (d = L1(n(l, h)), d[0] === Mi))
        return d;
      if ("children" in l && l.children) {
        const S = (
          /** @type {UnistParent} */
          l
        );
        if (S.children && d[0] !== N1)
          for (w = (r ? S.children.length : -1) + o, R = h.concat(S); w > -1 && w < S.children.length; ) {
            const x = S.children[w];
            if (y = s(x, w, R)(), y[0] === Mi)
              return y;
            w = typeof y[1] == "number" ? y[1] : w + o;
          }
      }
      return d;
    }
  }
}
function L1(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [A1, e] : e == null ? za : [e];
}
function Ba(e, t, n, r) {
  let i, a, o;
  typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), M1(e, a, s, i);
  function s(l, u) {
    const h = u[u.length - 1], p = h ? h.children.indexOf(l) : void 0;
    return o(l, p, h);
  }
}
const wr = {}.hasOwnProperty, O1 = {};
function D1(e, t) {
  const n = t || O1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = { ...C1, ...n.handlers }, s = {
    all: u,
    applyData: H1,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: o,
    one: l,
    options: n,
    patch: P1,
    wrap: U1
  };
  return Ba(e, function(h) {
    if (h.type === "definition" || h.type === "footnoteDefinition") {
      const p = h.type === "definition" ? r : i, m = String(h.identifier).toUpperCase();
      p.has(m) || p.set(m, h);
    }
  }), s;
  function l(h, p) {
    const m = h.type, d = s.handlers[m];
    if (wr.call(s.handlers, m) && d)
      return d(s, h, p);
    if (s.options.passThrough && s.options.passThrough.includes(m)) {
      if ("children" in h) {
        const { children: w, ...R } = h, S = Ln(R);
        return S.children = s.all(h), S;
      }
      return Ln(h);
    }
    return (s.options.unknownHandler || F1)(s, h, p);
  }
  function u(h) {
    const p = [];
    if ("children" in h) {
      const m = h.children;
      let d = -1;
      for (; ++d < m.length; ) {
        const y = s.one(m[d], h);
        if (y) {
          if (d && m[d - 1].type === "break" && (!Array.isArray(y) && y.type === "text" && (y.value = Li(y.value)), !Array.isArray(y) && y.type === "element")) {
            const w = y.children[0];
            w && w.type === "text" && (w.value = Li(w.value));
          }
          Array.isArray(y) ? p.push(...y) : p.push(y);
        }
      }
    }
    return p;
  }
}
function P1(e, t) {
  e.position && (t.position = wl(e));
}
function H1(e, t) {
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
    n.type === "element" && a && Object.assign(n.properties, Ln(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function F1(e, t) {
  const n = t.data || {}, r = "value" in t && !(wr.call(n, "hProperties") || wr.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function U1(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Li(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function Oi(e, t) {
  const n = D1(e, t), r = n.one(e, void 0), i = k1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function z1(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      Oi(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      Oi(n, { file: r, ...e || t })
    );
  };
}
function Di(e) {
  if (e)
    throw e;
}
var In = Object.prototype.hasOwnProperty, Wa = Object.prototype.toString, Pi = Object.defineProperty, Hi = Object.getOwnPropertyDescriptor, Fi = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : Wa.call(t) === "[object Array]";
}, Ui = function(t) {
  if (!t || Wa.call(t) !== "[object Object]")
    return !1;
  var n = In.call(t, "constructor"), r = t.constructor && t.constructor.prototype && In.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || In.call(t, i);
}, zi = function(t, n) {
  Pi && n.name === "__proto__" ? Pi(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, Bi = function(t, n) {
  if (n === "__proto__")
    if (In.call(t, n)) {
      if (Hi)
        return Hi(t, n).value;
    } else return;
  return t[n];
}, B1 = function e() {
  var t, n, r, i, a, o, s = arguments[0], l = 1, u = arguments.length, h = !1;
  for (typeof s == "boolean" && (h = s, s = arguments[1] || {}, l = 2), (s == null || typeof s != "object" && typeof s != "function") && (s = {}); l < u; ++l)
    if (t = arguments[l], t != null)
      for (n in t)
        r = Bi(s, n), i = Bi(t, n), s !== i && (h && i && (Ui(i) || (a = Fi(i))) ? (a ? (a = !1, o = r && Fi(r) ? r : []) : o = r && Ui(r) ? r : {}, zi(s, { name: n, newValue: e(h, o, i) })) : typeof i < "u" && zi(s, { name: n, newValue: i }));
  return s;
};
const Qn = /* @__PURE__ */ fa(B1);
function Sr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function W1() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let a = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    s(null, ...i);
    function s(l, ...u) {
      const h = e[++a];
      let p = -1;
      if (l) {
        o(l);
        return;
      }
      for (; ++p < i.length; )
        (u[p] === null || u[p] === void 0) && (u[p] = i[p]);
      i = u, h ? G1(h, s)(...u) : o(null, ...u);
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
function G1(e, t) {
  let n;
  return r;
  function r(...o) {
    const s = e.length > o.length;
    let l;
    s && o.push(i);
    try {
      l = e.apply(this, o);
    } catch (u) {
      const h = (
        /** @type {Error} */
        u
      );
      if (s && n)
        throw h;
      return i(h);
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
const ut = { basename: V1, dirname: $1, extname: j1, join: Z1, sep: "/" };
function V1(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  hn(e);
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
function $1(e) {
  if (hn(e), e.length === 0)
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
function j1(e) {
  hn(e);
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
function Z1(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    hn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : K1(n);
}
function K1(e) {
  hn(e);
  const t = e.codePointAt(0) === 47;
  let n = q1(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function q1(e, t) {
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
function hn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const X1 = { cwd: Y1 };
function Y1() {
  return "/";
}
function Er(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function J1(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Er(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return Q1(e);
}
function Q1(e) {
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
const er = (
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
class Ga {
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
    t ? Er(t) ? n = { path: t } : typeof t == "string" || eh(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : X1.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < er.length; ) {
      const a = er[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      er.includes(i) || (this[i] = n[i]);
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
    nr(t, "basename"), tr(t, "basename"), this.path = ut.join(this.dirname || "", t);
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
    Wi(this.basename, "dirname"), this.path = ut.join(t || "", this.basename);
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
    if (tr(t, "extname"), Wi(this.dirname, "extname"), t) {
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
    Er(t) && (t = J1(t)), nr(t, "path"), this.path !== t && this.history.push(t);
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
    nr(t, "stem"), tr(t, "stem"), this.path = ut.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new He(
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
function tr(e, t) {
  if (e && e.includes(ut.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ut.sep + "`"
    );
}
function nr(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function Wi(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function eh(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const th = (
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
), nh = {}.hasOwnProperty;
class Hr extends th {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = W1();
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
      new Hr()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Qn(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (ar("data", this.frozen), this.namespace[t] = n, this) : nh.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (ar("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = kn(t), r = this.parser || this.Parser;
    return rr("parse", r), r(String(n), n);
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
    return this.freeze(), rr("process", this.parser || this.Parser), ir("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, o) {
      const s = kn(t), l = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(s)
      );
      r.run(l, s, function(h, p, m) {
        if (h || !p || !m)
          return u(h);
        const d = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          p
        ), y = r.stringify(d, m);
        ah(y) ? m.value = y : m.result = y, u(
          h,
          /** @type {VFileWithOutput<CompileResult>} */
          m
        );
      });
      function u(h, p) {
        h || !p ? o(h) : a ? a(p) : n(void 0, p);
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
    return this.freeze(), rr("processSync", this.parser || this.Parser), ir("processSync", this.compiler || this.Compiler), this.process(t, i), Vi("processSync", "process", n), r;
    function i(a, o) {
      n = !0, Di(a), r = o;
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
    Gi(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(o, s) {
      const l = kn(n);
      i.run(t, l, u);
      function u(h, p, m) {
        const d = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          p || t
        );
        h ? s(h) : o ? o(d) : r(void 0, d, m);
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
    return this.run(t, n, a), Vi("runSync", "run", r), i;
    function a(o, s) {
      Di(o), i = s, r = !0;
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
    const r = kn(n), i = this.compiler || this.Compiler;
    return ir("stringify", i), Gi(t), i(t, r);
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
    if (ar("use", this.frozen), t != null) if (typeof t == "function")
      l(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? s(t) : o(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function a(u) {
      if (typeof u == "function")
        l(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [h, ...p] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          l(h, p);
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
      s(u.plugins), u.settings && (i.settings = Qn(!0, i.settings, u.settings));
    }
    function s(u) {
      let h = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++h < u.length; ) {
          const p = u[h];
          a(p);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function l(u, h) {
      let p = -1, m = -1;
      for (; ++p < r.length; )
        if (r[p][0] === u) {
          m = p;
          break;
        }
      if (m === -1)
        r.push([u, ...h]);
      else if (h.length > 0) {
        let [d, ...y] = h;
        const w = r[m][1];
        Sr(w) && Sr(d) && (d = Qn(!0, w, d)), r[m] = [u, d, ...y];
      }
    }
  }
}
const rh = new Hr().freeze();
function rr(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function ir(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function ar(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Gi(e) {
  if (!Sr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Vi(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function kn(e) {
  return ih(e) ? e : new Ga(e);
}
function ih(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function ah(e) {
  return typeof e == "string" || oh(e);
}
function oh(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const sh = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", $i = [], ji = { allowDangerousHtml: !0 }, lh = /^(https?|ircs?|mailto|xmpp)$/i, ch = [
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
function Zi(e) {
  const t = uh(e), n = hh(e);
  return dh(t.runSync(t.parse(n), n), e);
}
function uh(e) {
  const t = e.rehypePlugins || $i, n = e.remarkPlugins || $i, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...ji } : ji;
  return rh().use($u).use(n).use(z1, r).use(t);
}
function hh(e) {
  const t = e.children || "", n = new Ga();
  return typeof t == "string" && (n.value = t), n;
}
function dh(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, s = t.unwrapDisallowed, l = t.urlTransform || ph;
  for (const h of ch)
    Object.hasOwn(t, h.from) && ("" + h.from + (h.to ? "use `" + h.to + "` instead" : "remove it") + sh + h.id, void 0);
  return Ba(e, u), kl(e, {
    Fragment: ft,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: c,
    jsxs: _,
    passKeys: !0,
    passNode: !0
  });
  function u(h, p, m) {
    if (h.type === "raw" && m && typeof p == "number")
      return o ? m.children.splice(p, 1) : m.children[p] = { type: "text", value: h.value }, p;
    if (h.type === "element") {
      let d;
      for (d in Xn)
        if (Object.hasOwn(Xn, d) && Object.hasOwn(h.properties, d)) {
          const y = h.properties[d], w = Xn[d];
          (w === null || w.includes(h.tagName)) && (h.properties[d] = l(String(y || ""), d, h));
        }
    }
    if (h.type === "element") {
      let d = n ? !n.includes(h.tagName) : a ? a.includes(h.tagName) : !1;
      if (!d && r && typeof p == "number" && (d = !r(h, p, m)), d && m && typeof p == "number")
        return s && h.children ? m.children.splice(p, 1, ...h.children) : m.children.splice(p, 1), p;
    }
  }
}
function ph(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    lh.test(e.slice(0, t)) ? e : ""
  );
}
function fh({ children: e, isStreaming: t }) {
  const [n, r] = ie(!0), [i, a] = ie(!1);
  ht.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const o = () => {
    t || r(!n);
  }, s = ht.Children.map(e, (l) => {
    if (ht.isValidElement(l)) {
      if (l.type === Va)
        return ht.cloneElement(
          l,
          {
            onToggle: o,
            isExpanded: n
          }
        );
      if (l.type === $a)
        return ht.cloneElement(
          l,
          {
            isVisible: n
          }
        );
    }
    return l;
  });
  return /* @__PURE__ */ c("div", { className: "chat-wrapper__reasoning", children: s });
}
function Va({
  title: e,
  status: t = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const a = () => /* @__PURE__ */ _(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ c(
          "mask",
          {
            id: "mask0_64_36210",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "16",
            height: "16",
            children: /* @__PURE__ */ c("rect", { width: "16", height: "16", fill: "#D9D9D9" })
          }
        ),
        /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36210)", children: /* @__PURE__ */ c(
          "path",
          {
            d: "M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z",
            fill: "#637381"
          }
        ) })
      ]
    }
  ), o = t === "completed" || e.includes(K.UI_TEXT.THINKING) || e.includes(K.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ _(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${o ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: o ? r : void 0,
      style: { cursor: o ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ c("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ _("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ c("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        o && /* @__PURE__ */ c(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ _(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ c(
                    "mask",
                    {
                      id: "mask0_44_18068",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ c("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ c("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ c(
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
function $a({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ c("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function gh({ children: e }) {
  return /* @__PURE__ */ c("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function mh({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var l, u;
  const a = () => {
    if (!r || !i) return null;
    const h = i.find((p) => p.name === r);
    return (h == null ? void 0 : h.description) || null;
  };
  let o;
  if (r != null && r.startsWith("lat_")) {
    const h = (l = n == null ? void 0 : n.parameters) == null ? void 0 : l.query, p = (u = n == null ? void 0 : n.parameters) == null ? void 0 : u.url;
    o = h || p || "Executing tool...";
  } else
    o = a();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ c("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ _("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ _(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ c("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ _(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ c("span", { children: o }),
          /* @__PURE__ */ _("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ _(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ c(
                    "mask",
                    {
                      id: "mask0_64_36278",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ c(
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
                  /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ c(
                    "path",
                    {
                      d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ c("span", { children: "Running..." })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ _("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ _(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ c("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ _(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ c("span", { children: o }),
          /* @__PURE__ */ _("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ _(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ c(
                    "mask",
                    {
                      id: "mask0_64_36345",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ c(
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
                  /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36345)", children: /* @__PURE__ */ c(
                    "path",
                    {
                      d: "M7.1501 10.7819L11.1168 6.83193L10.2668 5.98193L7.1501 9.08193L5.73343 7.68193L4.88343 8.53193L7.1501 10.7819ZM8.0001 14.7819C7.12232 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.643 2.1001 10.8653C1.76676 10.0875 1.6001 9.25971 1.6001 8.38193C1.6001 7.49304 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73899 2.81527 5.51676 2.48193C6.29454 2.1486 7.12232 1.98193 8.0001 1.98193C8.88899 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11805 13.9001 5.89027C14.2334 6.66249 14.4001 7.49304 14.4001 8.38193C14.4001 9.25971 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.264 13.9486 10.4918 14.2819C9.71954 14.6153 8.88899 14.7819 8.0001 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819Z",
                      fill: "#4EAD13"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ c("span", { children: "Completed" })
          ] })
        ] });
      case "error":
        return /* @__PURE__ */ _("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ c(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ c(
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
          /* @__PURE__ */ c("span", { className: "chat-wrapper__tooling-handle-title", children: e })
        ] });
      default:
        return /* @__PURE__ */ _("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ _(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ c("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ _(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ _("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ _(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c(
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
                /* @__PURE__ */ c("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ _(
            "svg",
            {
              width: "20",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ c("span", { children: "Pending..." })
        ] });
    }
  })() });
}
function ja({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ _("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ c("span", {}),
    /* @__PURE__ */ c("span", {}),
    /* @__PURE__ */ c("span", {})
  ] }) : t === "pulse" ? /* @__PURE__ */ c(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ c(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: e, height: e }
    }
  );
}
const Ch = ({ message: e }) => {
  const [t, n] = ie(!0);
  return /* @__PURE__ */ _("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ _(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!t),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          e.role === "system" ? /* @__PURE__ */ _("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ _(
              "svg",
              {
                width: "20",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ c(
                    "mask",
                    {
                      id: "mask0_64_36257",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ c("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ c(
                    "path",
                    {
                      d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }),
            /* @__PURE__ */ c("span", { children: "AI text input <show-toolname>..." })
          ] }) : /* @__PURE__ */ c("span", { children: "System Message" }),
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ _(
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
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ c(
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
    t && /* @__PURE__ */ c("div", { className: "chat-wrapper__system-message-content", children: /* @__PURE__ */ c("span", { children: e.content }) })
  ] });
}, Za = no(null);
function yh({ children: e, value: t }) {
  return /* @__PURE__ */ c(Za.Provider, { value: t, children: e });
}
function dn() {
  const e = ro(Za);
  if (!e)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return e;
}
const Ka = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ c("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ c("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ c("code", { className: "chat-wrapper__code-block", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ c("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ c("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ c("li", { className: "chat-wrapper__list-item", ...t, children: e })
}, wh = {
  ...Ka,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ c("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ c("code", { className: "chat-wrapper__code", ...n, children: e })
}, qa = Ki(
  ({ message: e }) => {
    const {
      getReasoningTitle: t,
      getReasoningStatus: n,
      getReasoningDuration: r,
      getReasoningContentOnly: i,
      getToolingTitle: a,
      getToolingStatus: o,
      clientTools: s,
      currentAssistantMessageIdRef: l,
      onRetryMessage: u
    } = dn(), [h, p] = ie(!1), [m, d] = ie(!1), y = te(async () => {
      try {
        await navigator.clipboard.writeText(e.content), p(!0), setTimeout(() => p(!1), 2e3);
      } catch (O) {
        console.error("Failed to copy message:", O);
      }
    }, [e.content]), w = te(() => {
      u && u(e.id);
    }, [u, e.id]), R = () => /* @__PURE__ */ _("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ c(ja, { size: 16, variant: "dots" }),
      /* @__PURE__ */ c("span", { children: K.UI_TEXT.THINKING })
    ] }), S = () => u && /* @__PURE__ */ c(
      "button",
      {
        className: "chat-wrapper__retry-button",
        onClick: w,
        children: "Retry"
      }
    ), x = () => /* @__PURE__ */ _(ft, { children: [
      /* @__PURE__ */ c("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ c(
        "button",
        {
          className: `chat-wrapper__copy-button ${m ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: y,
          title: "Copy message",
          children: /* @__PURE__ */ c(bs, {})
        }
      ) }),
      h && /* @__PURE__ */ c("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), M = () => /* @__PURE__ */ c("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ _("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ c("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ c(Zi, { components: Ka, children: e.content }) }),
      x()
    ] }) }), P = () => /* @__PURE__ */ _("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ c("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ c(Zi, { components: wh, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ c("div", { className: "chat-wrapper__media", children: e.media.map((O, $) => /* @__PURE__ */ c(
        "img",
        {
          src: O,
          alt: `Uploaded content ${$ + 1}`,
          className: "chat-wrapper__media-image"
        },
        $
      )) })
    ] }), L = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === l.current ? R() : e.role === "system" ? /* @__PURE__ */ c(Ch, { message: e }) : e.role === "assistant" ? M() : P(), T = () => /* @__PURE__ */ _(fh, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ c(
        Va,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ c($a, { children: i(e.content) })
    ] }), D = () => {
      var O;
      return /* @__PURE__ */ c(gh, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ c(
        mh,
        {
          title: a(e.content, e.isStreaming),
          status: o(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (O = e.toolData) == null ? void 0 : O.toolName,
          clientTools: s
        }
      ) });
    };
    return /* @__PURE__ */ c(
      "div",
      {
        className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
        onMouseEnter: () => e.role === "assistant" && d(!0),
        onMouseLeave: () => e.role === "assistant" && d(!1),
        children: e.role === "reasoning" ? T() : e.role === "tooling" ? D() : /* @__PURE__ */ _(ft, { children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__message-content", children: L() }),
          e.role === "user" && e.hasError && !e.isRetrying && S()
        ] })
      }
    );
  }
);
qa.displayName = "MessageItem";
const Sh = ({ isVisible: e }) => e ? /* @__PURE__ */ c("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ _("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ c("span", {}),
  /* @__PURE__ */ c("span", {}),
  /* @__PURE__ */ c("span", {})
] }) }) }) }) : null, Xa = On((e, t) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = dn();
  return /* @__PURE__ */ _("div", { className: "chat-wrapper__messages", children: [
    n.map((a) => /* @__PURE__ */ c(
      qa,
      {
        message: a
      },
      a.id
    )),
    /* @__PURE__ */ c(Sh, { isVisible: r && !i }),
    /* @__PURE__ */ c("div", { ref: t })
  ] });
});
Xa.displayName = "MessagesList";
const lt = (...e) => e.filter(Boolean).join(" "), Eh = () => /* @__PURE__ */ _(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ _("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ c(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ c("g", { clipPath: "url(#clip0_121_23927)", children: /* @__PURE__ */ c(
          "path",
          {
            d: "M16.3333 26.3541L18.2133 28.2341L25.6666 20.7941V37.0208H28.3333V20.7941L35.7733 28.2474L37.6666 26.3541L26.9999 15.6874L16.3333 26.3541Z",
            fill: "white"
          }
        ) })
      ] }),
      /* @__PURE__ */ _("defs", { children: [
        /* @__PURE__ */ _(
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
              /* @__PURE__ */ c("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ c(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ c("feOffset", { dy: "1" }),
              /* @__PURE__ */ c("feGaussianBlur", { stdDeviation: "1" }),
              /* @__PURE__ */ c("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ c(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                }
              ),
              /* @__PURE__ */ c(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ c(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ c("feOffset", { dy: "1" }),
              /* @__PURE__ */ c("feGaussianBlur", { stdDeviation: "1.5" }),
              /* @__PURE__ */ c("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ c(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                }
              ),
              /* @__PURE__ */ c(
                "feBlend",
                {
                  mode: "normal",
                  in2: "effect1_dropShadow_121_23927",
                  result: "effect2_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ c(
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
        /* @__PURE__ */ c("clipPath", { id: "clip0_121_23927", children: /* @__PURE__ */ c(
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
), Th = () => /* @__PURE__ */ _(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ _("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ c(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "inherit",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ c("rect", { x: "19", y: "19.3541", width: "16", height: "16", rx: "2", fill: "white" })
      ] }),
      /* @__PURE__ */ c("defs", { children: /* @__PURE__ */ _(
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
            /* @__PURE__ */ c("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
            /* @__PURE__ */ c(
              "feColorMatrix",
              {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
              }
            ),
            /* @__PURE__ */ c("feOffset", { dy: "1" }),
            /* @__PURE__ */ c("feGaussianBlur", { stdDeviation: "1" }),
            /* @__PURE__ */ c("feComposite", { in2: "hardAlpha", operator: "out" }),
            /* @__PURE__ */ c(
              "feColorMatrix",
              {
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
              }
            ),
            /* @__PURE__ */ c(
              "feBlend",
              {
                mode: "normal",
                in2: "BackgroundImageFix",
                result: "effect1_dropShadow_121_23927"
              }
            ),
            /* @__PURE__ */ c(
              "feColorMatrix",
              {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
              }
            ),
            /* @__PURE__ */ c("feOffset", { dy: "1" }),
            /* @__PURE__ */ c("feGaussianBlur", { stdDeviation: "1.5" }),
            /* @__PURE__ */ c("feComposite", { in2: "hardAlpha", operator: "out" }),
            /* @__PURE__ */ c(
              "feColorMatrix",
              {
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              }
            ),
            /* @__PURE__ */ c(
              "feBlend",
              {
                mode: "normal",
                in2: "effect1_dropShadow_121_23927",
                result: "effect2_dropShadow_121_23927"
              }
            ),
            /* @__PURE__ */ c(
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
      ) })
    ]
  }
), _h = ({ className: e, ...t }) => /* @__PURE__ */ c("form", { className: lt("chat-wrapper__prompt-input", e), ...t }), Ya = On(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...o
  }, s) => {
    const l = (u) => {
      if (u.key === "Enter") {
        if (u.shiftKey)
          return;
        u.preventDefault();
        const h = u.currentTarget.form;
        if (h) {
          const p = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          h.dispatchEvent(p);
        }
      }
      a == null || a(u);
    };
    return /* @__PURE__ */ c(
      "textarea",
      {
        ref: s,
        className: lt("chat-wrapper__prompt-textarea", t),
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
Ya.displayName = "PromptInputTextarea";
const kh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ c("div", { className: lt("chat-wrapper__prompt-toolbar", e), ...t }), xh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ c("div", { className: lt("chat-wrapper__prompt-tools", e), ...t }), bh = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || ht.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ c(
    "button",
    {
      className: lt(
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
}, vh = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = Qe.IDLE,
  children: i,
  disabled: a,
  ...o
}) => {
  const s = or(r);
  let l = s ? /* @__PURE__ */ c(Th, {}) : /* @__PURE__ */ c(Eh, {});
  return /* @__PURE__ */ c(
    "button",
    {
      className: lt(
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
      children: i ?? l
    }
  );
}, Xh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ c("select", { className: lt("chat-wrapper__prompt-select", e), ...n, children: t }), Yh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ c(
  "button",
  {
    className: lt("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), Jh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ c(
  "div",
  {
    className: lt("chat-wrapper__prompt-select-content", e),
    ...t
  }
), Qh = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ c(
  "div",
  {
    className: lt("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), ed = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ c(
  "span",
  {
    className: lt("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), Ih = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = ie(0), [a, o] = ie(!1), [s, l] = ie(0);
  return ye(() => {
    if (!t || e.length <= 1) return;
    const u = setInterval(() => {
      o(!0), setTimeout(() => {
        i((h) => (h + 1) % e.length), l((h) => h + 1), o(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(u);
  }, [t, e.length]), ye(() => {
    t || (i(0), o(!1), l(0));
  }, [t]), /* @__PURE__ */ c(
    "div",
    {
      className: `animated-placeholder-container ${n}`,
      children: /* @__PURE__ */ c(
        "span",
        {
          className: `animated-placeholder-text ${a ? "transitioning" : ""}`,
          children: e[r]
        },
        s
      )
    }
  );
}, Rh = On((e, t) => {
  const {
    placeholderTexts: n,
    isStreaming: r,
    isLoadingConversation: i,
    chatStatus: a,
    fileUploadEnabled: o,
    chipName: s,
    chipLogo: l,
    messages: u,
    onSubmit: h,
    onFileUpload: p,
    onStopGeneration: m
  } = dn(), d = u.length > 0, [y, w] = ie(""), [R, S] = ie([]), x = ve(null), M = n && n.length > 0 ? n : ["What would you like to know?"], P = y.length === 0 && !d && M.length > 1;
  qi(t, () => ({
    focus: () => {
      var O;
      (O = x.current) == null || O.focus();
    },
    setText: (O) => {
      w(O), setTimeout(() => {
        if (x.current) {
          x.current.focus();
          const $ = O.length;
          x.current.setSelectionRange($, $);
        }
      }, 0);
    }
  }));
  const L = te(
    (O) => {
      O.preventDefault();
      const z = new FormData(O.currentTarget).get("message");
      if (z != null && z.trim()) {
        const N = An(z.trim(), !1);
        if (!N.trim()) {
          console.warn("Message was blocked due to security concerns");
          return;
        }
        h(N, R), w(""), S([]);
      }
    },
    [h, R]
  ), T = te(
    (O) => {
      const z = O.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      w(z);
    },
    []
  ), D = te(async () => {
    const O = document.createElement("input");
    O.type = "file", O.accept = "image/*", O.multiple = !1, O.onchange = async ($) => {
      const z = $.target.files;
      if (z) {
        const N = Array.from(z).filter((b) => {
          const F = as(b.name);
          return F !== b.name && console.warn(
            `File name sanitized: ${b.name} -> ${F}`
          ), b.size > 10485760 ? (console.warn(`File too large: ${b.name} (${b.size} bytes)`), !1) : [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp"
          ].includes(b.type) ? !0 : (console.warn(`File type not allowed: ${b.name} (${b.type})`), !1);
        });
        if (N.length > 0) {
          const b = await p(N);
          S(b);
        }
      }
    }, O.click();
  }, [p]);
  return /* @__PURE__ */ _(
    _h,
    {
      onSubmit: L,
      style: { position: "relative" },
      className: r || i ? "chat-wrapper__prompt-input--disabled" : "",
      children: [
        /* @__PURE__ */ c(
          Ya,
          {
            ref: x,
            name: "message",
            value: y,
            onChange: T,
            placeholder: "",
            disabled: r || i
          }
        ),
        !y.trim() && /* @__PURE__ */ c(
          Ih,
          {
            placeholderTexts: M,
            shouldAnimate: P
          }
        ),
        R.length > 0 && /* @__PURE__ */ c(
          "div",
          {
            style: {
              padding: "8px 16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center"
            },
            children: R.map((O, $) => {
              const z = O.startsWith("data:image/"), N = O.startsWith("http://") || O.startsWith("https://"), b = z || N;
              return /* @__PURE__ */ _(
                "div",
                {
                  style: {
                    position: "relative",
                    display: "inline-block"
                  },
                  children: [
                    b ? /* @__PURE__ */ _(
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
                          /* @__PURE__ */ c(
                            "img",
                            {
                              src: O,
                              alt: `Attachment ${$ + 1}`,
                              style: {
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                              }
                            }
                          ),
                          /* @__PURE__ */ c(
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
                    ) : /* @__PURE__ */ _(
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
                          /* @__PURE__ */ c(
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
                              children: /* @__PURE__ */ _(
                                "svg",
                                {
                                  width: "24",
                                  height: "25",
                                  viewBox: "0 0 24 25",
                                  fill: "none",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  children: [
                                    /* @__PURE__ */ c(
                                      "mask",
                                      {
                                        id: "mask0_190_623",
                                        style: { maskType: "alpha" },
                                        maskUnits: "userSpaceOnUse",
                                        x: "0",
                                        y: "0",
                                        width: "24",
                                        height: "25",
                                        children: /* @__PURE__ */ c(
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
                                    /* @__PURE__ */ c("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ c(
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
                          /* @__PURE__ */ _("div", { style: { flex: 1, minWidth: 0 }, children: [
                            /* @__PURE__ */ c(
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
                                  const F = O.match(/name=([^;]+)/);
                                  return F ? decodeURIComponent(F[1]) : "document.pdf";
                                })()
                              }
                            ),
                            /* @__PURE__ */ c(
                              "div",
                              {
                                style: {
                                  color: "#9ca3af",
                                  fontSize: "12px",
                                  textTransform: "uppercase"
                                },
                                children: (() => {
                                  const F = O.match(/data:([^;]+)/);
                                  if (F) {
                                    const W = F[1];
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
                                        const H = W.split("/")[1];
                                        return H ? H.toUpperCase().substring(0, 4) : "FILE";
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
                    /* @__PURE__ */ c(
                      "button",
                      {
                        onClick: () => {
                          S(
                            (F) => F.filter((W, H) => H !== $)
                          );
                        },
                        style: {
                          position: "absolute",
                          top: b ? "6px" : "8px",
                          right: b ? "6px" : "8px",
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
                $
              );
            })
          }
        ),
        /* @__PURE__ */ _(kh, { children: [
          /* @__PURE__ */ _(xh, { children: [
            o && /* @__PURE__ */ _(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center"
                },
                children: [
                  /* @__PURE__ */ c(
                    bh,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: D,
                      title: R.length > 0 ? `${R.length} image(s) attached` : "Attach image",
                      disabled: r || i,
                      style: {
                        position: "relative"
                      },
                      children: /* @__PURE__ */ _(
                        "svg",
                        {
                          width: "36",
                          height: "37",
                          viewBox: "0 0 36 37",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                          children: [
                            /* @__PURE__ */ c(
                              "rect",
                              {
                                y: "0.354126",
                                width: "36",
                                height: "36",
                                rx: "18",
                                fill: "#F4F6F8"
                              }
                            ),
                            /* @__PURE__ */ c("g", { clipPath: "url(#clip0_121_9706)", children: /* @__PURE__ */ c(
                              "path",
                              {
                                d: "M21.3334 13.3541V22.9374C21.3334 24.7791 19.8417 26.2708 18 26.2708C16.1584 26.2708 14.6667 24.7791 14.6667 22.9374V12.5208C14.6667 11.3708 15.6 10.4374 16.75 10.4374C17.9 10.4374 18.8334 11.3708 18.8334 12.5208V21.2708C18.8334 21.7291 18.4584 22.1041 18 22.1041C17.5417 22.1041 17.1667 21.7291 17.1667 21.2708V13.3541H15.9167V21.2708C15.9167 22.4208 16.85 23.3541 18 23.3541C19.15 23.3541 20.0834 22.4208 20.0834 21.2708V12.5208C20.0834 10.6791 18.5917 9.18744 16.75 9.18744C14.9084 9.18744 13.4167 10.6791 13.4167 12.5208V22.9374C13.4167 25.4708 15.4667 27.5208 18 27.5208C20.5334 27.5208 22.5834 25.4708 22.5834 22.9374V13.3541H21.3334Z",
                                fill: "#212B36"
                              }
                            ) }),
                            /* @__PURE__ */ c("defs", { children: /* @__PURE__ */ c("clipPath", { id: "clip0_121_9706", children: /* @__PURE__ */ c(
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
                  /* @__PURE__ */ c(
                    "span",
                    {
                      onClick: D,
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
            o && s && /* @__PURE__ */ c("div", { className: "chat-wrapper__divider" }),
            s && /* @__PURE__ */ _("div", { className: "chat-wrapper__restaurant-chip", children: [
              l && /* @__PURE__ */ c(
                "img",
                {
                  src: l,
                  alt: "Chip logo",
                  className: "chat-wrapper__restaurant-logo"
                }
              ),
              /* @__PURE__ */ c("span", { className: "chat-wrapper__restaurant-name", children: s })
            ] })
          ] }),
          /* @__PURE__ */ c(
            vh,
            {
              status: a,
              disabled: or(a) ? !1 : !y.trim() || i,
              onClick: or(a) && m ? () => {
                m();
              } : void 0
            }
          )
        ] })
      ]
    }
  );
}), Ah = () => {
  const { suggestedPrompts: e, chatInputRef: t } = dn();
  if (!e || e.length === 0)
    return null;
  const n = (r) => {
    t.current && t.current.setText(r.description);
  };
  return /* @__PURE__ */ _("div", { className: "chat-wrapper__suggested-prompts", children: [
    /* @__PURE__ */ c("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
    /* @__PURE__ */ c("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((r, i) => /* @__PURE__ */ c(
      "button",
      {
        className: "chat-wrapper__suggested-prompt-card",
        onClick: () => n(r),
        children: /* @__PURE__ */ _("div", { className: "chat-wrapper__suggested-prompt-content", children: [
          /* @__PURE__ */ c("h4", { className: "chat-wrapper__suggested-prompt-title", children: r.title }),
          /* @__PURE__ */ c("p", { className: "chat-wrapper__suggested-prompt-description", children: r.description })
        ] })
      },
      i
    )) })
  ] });
}, Nh = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ c(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ c("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ c(ja, { size: e, variant: "dots" }) })
  }
), Mh = ({
  headerName: e,
  headerDescription: t
}) => /* @__PURE__ */ _("div", { className: "chat-wrapper__main-header", children: [
  /* @__PURE__ */ c("h1", { className: "chat-wrapper__main-title", children: e }),
  t && /* @__PURE__ */ c("p", { className: "chat-wrapper__description", children: t })
] }), Lh = () => {
  const {
    messages: e,
    isLoadingConversation: t,
    isStreaming: n,
    headerName: r,
    headerDescription: i,
    suggestedPrompts: a,
    messagesEndRef: o,
    chatInputRef: s,
    isOffline: l
    // conversationError,
  } = dn(), u = dt.state.shouldShowMainHeader(
    e.length,
    n,
    t
  ), h = dt.state.shouldShowSuggestedPrompts(
    e.length,
    n,
    t,
    a
  ), p = dt.state.getContentAreaClass(
    e.length,
    n,
    t
  );
  return /* @__PURE__ */ _(ft, { children: [
    u && /* @__PURE__ */ c("div", { style: l ? { paddingTop: "32px" } : void 0, children: /* @__PURE__ */ c(
      Mh,
      {
        headerName: r,
        headerDescription: i
      }
    ) }),
    /* @__PURE__ */ _(
      "div",
      {
        className: p,
        style: l ? { paddingTop: "32px" } : void 0,
        children: [
          t && e.length === 0 ? /* @__PURE__ */ c("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ c(Nh, { fullHeight: !0 }) }) : /* @__PURE__ */ c(Xa, { ref: o }),
          /* @__PURE__ */ c("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ c(Rh, { ref: s }) }),
          h && /* @__PURE__ */ c(Ah, {})
        ]
      }
    )
  ] });
};
function Oh({
  isVisible: e,
  isReconnecting: t = !1
}) {
  return e ? /* @__PURE__ */ c("div", { className: "network-status-banner", children: /* @__PURE__ */ c("div", { className: "network-status-banner__content", children: t ? /* @__PURE__ */ _(ft, { children: [
    /* @__PURE__ */ c("div", { className: "network-status-banner__spinner" }),
    /* @__PURE__ */ c("span", { children: "Reconnecting..." })
  ] }) : /* @__PURE__ */ _(ft, { children: [
    /* @__PURE__ */ c("div", { className: "network-status-banner__icon", children: "⚠️" }),
    /* @__PURE__ */ c("span", { children: "No internet connection" })
  ] }) }) }) : null;
}
const Ja = On(
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
    devMode: o = !1,
    contextHelpers: s
  }, l) => {
    var Cn, Xe;
    const { token: u, entityId: h, entityType: p } = e;
    dt.validation.validateAuthProps({
      userMpAuthToken: u,
      chatServerUrl: t,
      chatServerKey: n
    });
    const m = Ce(() => dt.url.convertWebSocketToHttp(t), [t]), d = Ce(
      () => new ms({
        apiUrl: m,
        userMpAuthToken: u,
        chatServerKey: n
      }),
      [m, u, n]
    ), y = Ce(() => a && a.length > 0 ? a.map(({ execute: k, ...ce }) => ce) : [], [a]), w = ds(), { isOnline: R, wasOffline: S } = gs(), x = ve(!0), M = Z((k) => k.isModalOpen), P = Z((k) => k.isCollapsed), L = Z((k) => k.currentMode), T = Z((k) => k.openModal), D = Z((k) => k.closeModal), O = Z((k) => k.toggleCollapse), $ = Z((k) => k.toggleFullscreen), z = Z((k) => k.setCurrentMode), N = Z((k) => k.chatStatus), b = Z((k) => k.setChatStatus), F = Z((k) => k.streamingStatus), W = Z((k) => k.setStreamingStatus), H = Z(
      (k) => k.isLoadingConversation
    ), X = Z(
      (k) => k.setIsLoadingConversation
    ), J = Z((k) => k.conversationError), de = Z(
      (k) => k.setConversationError
    ), we = Z((k) => k.setCurrentThreadId), f = Z((k) => k.providerResId), Q = Z((k) => k.setProviderResId), Ie = Z((k) => k.isDevSettingsOpen), g = Z(
      (k) => k.setIsDevSettingsOpen
    ), Se = Z((k) => k.isStreaming), re = Z((k) => k.setIsStreaming), oe = Z((k) => k.isThinking), je = Z((k) => k.setIsThinking), Te = Z((k) => k.streamingContent), tt = Z((k) => k.isHandlingTool);
    ye(() => {
      i.mode && z(i.mode);
    }, [i.mode, z]), ye(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const k = (ce) => {
        ce.key === "Escape" && L === "modal" && M && D();
      };
      if (L === "modal" && M)
        return document.addEventListener("keydown", k), () => document.removeEventListener("keydown", k);
    }, [L, M, D]);
    const {
      messages: _e,
      setMessages: Me,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: Nt,
      getReasoningStatus: at,
      getReasoningDuration: mt,
      getReasoningContentOnly: Ze,
      getReasoningTitle: Ct,
      getToolingTitle: yt,
      getToolingStatus: ot,
      handleSetMessage: wt,
      handleReasoningUpdate: St,
      handleChatFinished: Mt,
      handleChatError: Lt,
      stopGeneration: Ht
    } = w, Et = ve(null), Ke = ve(null), E = ve(null), A = te(
      (k) => {
        Q(k.providerResId), we(k.threadId), k.canUpdateMetadata && r && Object.keys(r).length > 0 && E.current && E.current.updateMetadata(k.providerResId, { metadata: r }).then(() => {
          console.log("[ChatWrapper] ✅ Metadata update successful");
        }).catch((ce) => {
          console.error(
            "[ChatWrapper] ❌ Failed to update metadata:",
            ce
          );
        });
      },
      [Q, we, r]
    ), j = te(
      (k) => {
        var ce, xe;
        switch (console.log("[ChatWrapper] System event received:", k), k.type) {
          case nt.CHAT_COMPLETED:
            (ce = k.data) != null && ce.conversationId && Q(k.data.conversationId), Mt(), b(Qe.IDLE), W(Wt.IDLE), setTimeout(() => {
              var fe;
              (fe = Ke.current) == null || fe.focus();
            }, 0);
            break;
          case nt.CHAT_ERROR:
            (xe = k.data) != null && xe.error && Lt(k.data.error);
            break;
          case nt.CONNECTION_LOST:
            break;
          case nt.CONNECTION_RESTORED:
            break;
          case nt.RECONNECTING:
            break;
        }
      },
      [
        Mt,
        Lt,
        Q,
        we
      ]
    ), {
      chatClient: B,
      isConnected: ne,
      // isConnecting,
      isReconnecting: Re,
      // reconnectAttempts: reconnectAttempt,
      connectChatClient: Fe,
      disconnectChatClient: Le
    } = Do({
      // Authentication and server properties
      userMpAuthToken: u,
      chatServerUrl: t,
      chatServerKey: n,
      // Entity configuration
      entityId: h,
      entityType: p,
      // Tools configuration
      tools: a,
      // Other properties
      contextHelpers: s,
      onSetMessage: wt,
      onSystemEvent: j,
      onReasoningUpdate: St,
      onThreadCreated: A
    });
    ye(() => {
      E.current = B;
    }, [B]), fs({
      metadata: r,
      chatClient: B,
      currentProviderResId: f,
      isLoadingConversation: H,
      messages: _e,
      entityId: h,
      entityType: p
    }), ye(() => {
      S && R && x.current ? (console.log("[ChatWrapper] Network restored, attempting reconnection..."), Fe().catch((k) => {
        const ce = jt(k, "NetworkReconnection");
        x.current = ce.isRetryable, ce.isRetryable || console.warn(`[ChatWrapper] Network reconnection failed with non-retryable error: ${ce.reason}`);
      })) : S && R && !x.current && console.warn("[ChatWrapper] Network restored but last error was non-retryable (CORS/auth), skipping reconnection");
    }, [R, S, Fe]);
    const qe = te(() => {
      Ht(), b(Qe.IDLE), W(Wt.IDLE), B && f ? (console.log("[ChatWrapper] Sending stop_run message for conversation:", f), B.stopRun(f)) : console.warn("[ChatWrapper] Cannot send stop_run: missing chatClient or currentProviderResId");
    }, [Ht, B, f, b, W]);
    qi(
      l,
      () => ({
        updateMetadata: (k) => {
          if (!B) {
            console.warn(
              "ChatWrapper: Cannot update metadata - chat client not initialized"
            );
            return;
          }
          if (!f) {
            console.warn(
              "ChatWrapper: Cannot update metadata - no active conversation (providerResId not set)"
            );
            return;
          }
          B.updateMetadata(f, k).catch((ce) => {
            console.error(
              "ChatWrapper: Failed to update thread metadata:",
              ce
            );
          });
        }
      }),
      [B, f]
    );
    const Ee = Ce(
      () => B ? new Cs(B, {
        onError: i.onError
      }) : null,
      [B, i.onError]
    ), {
      resetConversationLoader: he
      /*, reloadConversation*/
    } = ps({
      entityId: h,
      entityType: p,
      httpApiUrl: m,
      userMpAuthToken: u,
      chatServerKey: n,
      messages: _e,
      setMessages: Me,
      setIsLoadingConversation: X,
      setConversationError: de,
      setCurrentThreadId: we,
      setProviderResId: Q,
      metadata: r
    }), Ae = ve(null), ke = te(() => {
      Ae.current && cancelAnimationFrame(Ae.current), Ae.current = requestAnimationFrame(() => {
        var k;
        (k = Et.current) == null || k.scrollIntoView({ behavior: "smooth" }), Ae.current = null;
      });
    }, []);
    ye(() => {
      ke();
    }, [_e, ke]), ye(() => {
      Te && ke();
    }, [Te, ke]), ye(() => {
      i.onStreamingStatusChange && i.onStreamingStatusChange(F);
    }, [F, i]), ye(() => () => {
      Ae.current && cancelAnimationFrame(Ae.current);
    }, []);
    const qt = te(
      async (k, ce) => {
        if (!k.trim() || Se || !Ee || !B)
          return;
        re(!0), je(!0), b(Qe.SUBMITTED), W(Wt.STARTING);
        const xe = Ee.createUserMessage(
          k,
          ce
        );
        Me((fe) => [...fe, xe]);
        try {
          await B.onTriggerMessage({
            message: xe.content,
            media: ce,
            providerResId: f || void 0
          }), b(Qe.STREAMING);
        } catch (fe) {
          je(!1), b(Qe.ERROR), Me(
            (vt) => vt.map(
              (Ye) => Ye.id === xe.id ? {
                ...Ye,
                hasError: !0,
                errorMessage: ne ? fe instanceof Error ? fe.message : "Failed to send message" : "Failed to send message."
              } : Ye
            )
          ), re(!1), b(Qe.IDLE), W(Wt.IDLE);
        }
      },
      [
        Ee,
        B,
        Se,
        ne,
        Me,
        re,
        je,
        b,
        W,
        f
      ]
    ), Ot = te(
      async (k) => await d.uploadFiles(k),
      [d]
    ), Ft = Ce(
      () => dt.css.getContainerClasses(
        L,
        i.position,
        i.theme,
        P,
        i.constrainedHeight
      ),
      [
        L,
        i.position,
        i.theme,
        P,
        i.constrainedHeight
      ]
    ), Un = te(() => {
      L === "modal" ? T() : O();
    }, [L, T, O]), bt = te(() => {
      g(!0);
    }, [g]), pn = te(
      (k) => {
        Ke.current && Ke.current.setText(k.description);
      },
      []
    ), fn = Ce(
      () => ({
        messages: _e,
        isStreaming: Se,
        isThinking: oe,
        isHandlingTool: tt
      }),
      [_e, Se, oe, tt]
    ), pe = Ce(
      () => ({
        isLoadingConversation: H,
        chatStatus: N,
        conversationError: J,
        isOffline: !R
      }),
      [H, N, J, R]
    ), Tt = Ce(
      () => {
        var k;
        return {
          headerName: i.headerName,
          headerDescription: i.headerDescription,
          placeholderTexts: i.placeholderTexts,
          chipName: i.chipName,
          chipLogo: i.chipLogo,
          suggestedPrompts: i.suggestedPrompts,
          clientTools: y,
          fileUploadEnabled: (k = i.features) == null ? void 0 : k.fileUpload
        };
      },
      [
        i.headerName,
        i.headerDescription,
        i.placeholderTexts,
        i.chipName,
        i.chipLogo,
        i.suggestedPrompts,
        (Cn = i.features) == null ? void 0 : Cn.fileUpload,
        y
      ]
    ), gn = Ce(
      () => ({
        getReasoningTitle: Ct,
        getReasoningStatus: at,
        getReasoningDuration: mt,
        getReasoningContentOnly: Ze,
        getToolingTitle: yt,
        getToolingStatus: ot
      }),
      [
        Ct,
        at,
        mt,
        Ze,
        yt,
        ot
      ]
    ), Xt = te(
      async (k) => {
        const ce = _e.find((xe) => xe.id === k);
        if (ce) {
          Me((xe) => xe.map(
            (fe) => fe.id === k ? {
              ...fe,
              hasError: !1,
              isRetrying: !0,
              errorMessage: void 0
            } : fe
          ));
          try {
            he(), await Fe(), await (B == null ? void 0 : B.onTriggerMessage({
              message: ce.content,
              media: ce.media,
              providerResId: f || void 0
            })), Me(
              (xe) => xe.map(
                (fe) => fe.id === k ? { ...fe, isRetrying: !1 } : fe
              )
            );
          } catch (xe) {
            Me(
              (fe) => fe.map(
                (vt) => vt.id === k ? {
                  ...vt,
                  isRetrying: !1,
                  hasError: !0,
                  errorMessage: xe instanceof Error ? xe.message : "Retry failed"
                } : vt
              )
            );
          }
        }
      },
      [
        _e,
        Me,
        he,
        Fe,
        qt
      ]
    ), Ut = Ce(
      () => ({
        onSubmit: qt,
        onFileUpload: Ot,
        onStopGeneration: qe,
        onPromptSelect: pn,
        onRetryMessage: Xt
      }),
      [
        qt,
        Ot,
        qe,
        pn,
        Xt
      ]
    ), mn = Ce(
      () => ({
        ...fn,
        ...pe,
        ...Tt,
        ...gn,
        ...Ut,
        currentAssistantMessageIdRef: Nt,
        messagesEndRef: Et,
        chatInputRef: Ke
      }),
      [
        fn,
        pe,
        Tt,
        gn,
        Ut,
        Nt,
        Et,
        Ke
      ]
    );
    return Ce(
      () => dt.state.shouldShowBubble(
        L,
        M,
        P
      ),
      [L, M, P]
    ) ? /* @__PURE__ */ c(ni, { children: /* @__PURE__ */ c(
      vs,
      {
        mode: L,
        headerName: i.headerName,
        bubbleText: i.bubbleText,
        showBubbleText: ((Xe = i.features) == null ? void 0 : Xe.showBubbleText) !== !1,
        onClick: Un
      }
    ) }) : /* @__PURE__ */ c(ni, { children: /* @__PURE__ */ c(
      Ss,
      {
        onError: (k) => {
          console.error("WebSocket error in ChatWrapper:", k), i.onError && i.onError(k);
        },
        children: /* @__PURE__ */ _("div", { className: Ft, style: i.customStyles, children: [
          /* @__PURE__ */ c(
            Oh,
            {
              isVisible: !R,
              isReconnecting: Re
            }
          ),
          o && i.headerVisible === !1 && /* @__PURE__ */ c(
            "button",
            {
              className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
              onClick: bt,
              title: "Developer Settings",
              children: /* @__PURE__ */ c(oa, { size: 16 })
            }
          ),
          dt.state.shouldShowHeader(i.headerVisible) && /* @__PURE__ */ c(
            Is,
            {
              headerName: i.headerName,
              mode: L,
              isCollapsed: P,
              isModalOpen: M,
              devMode: o,
              onClose: D,
              onToggleFullscreen: $,
              onToggleCollapse: O,
              onOpenSettings: bt
            }
          ),
          !P && /* @__PURE__ */ c(
            Es,
            {
              onError: (k) => {
                console.error("File upload error:", k), i.onError && i.onError(k);
              },
              children: /* @__PURE__ */ c(yh, { value: mn, children: /* @__PURE__ */ c(Lh, {}) })
            }
          ),
          /* @__PURE__ */ c(
            ko,
            {
              isOpen: Ie,
              onClose: () => g(!1),
              apiUrl: m,
              userMpAuthToken: u,
              chatServerKey: n,
              onDisconnect: Le,
              isConnected: ne
            }
          )
        ] })
      }
    ) });
  }
);
Ja.displayName = "ChatWrapperContainer";
const td = Ki(Ja);
function nd({
  isConnected: e,
  isConnecting: t = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 1 / 0,
  onRetry: a,
  autoHideDuration: o = 3e3
}) {
  const [s, l] = ie("hidden"), [u, h] = ie(!1);
  if (ye(() => {
    console.log("[ConnectionNotification] State update:", {
      isConnected: e,
      isConnecting: t,
      isReconnecting: n,
      reconnectAttempt: r,
      wasDisconnected: u,
      currentState: s
    }), t ? l("connecting") : !e && !n ? (h(!0), i !== 1 / 0 && r >= i ? l("error") : l("hidden")) : n ? (console.log("[ConnectionNotification] Setting state to RECONNECTING"), l("reconnecting")) : e && u ? (l("hidden"), h(!1)) : e && !u && l("hidden");
  }, [e, t, n, r, i, u, o]), s === "hidden")
    return null;
  const p = () => {
    a && a();
  }, d = (() => {
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
  return d ? s === "connecting" ? /* @__PURE__ */ c("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ _("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ c("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ c("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ c("div", { className: "connection-notification__bubble" })
  ] }) }) : s === "reconnecting" ? (console.log("[ConnectionNotification] RENDERING RECONNECTING BANNER", { reconnectAttempt: r }), /* @__PURE__ */ c("div", { className: `connection-notification connection-notification--banner connection-notification--${s}`, children: /* @__PURE__ */ _("div", { className: "connection-notification__banner-content", children: [
    /* @__PURE__ */ c("span", { className: "connection-notification__banner-spinner" }),
    /* @__PURE__ */ _("span", { className: "connection-notification__banner-text", children: [
      "Reconnecting... (attempt ",
      r,
      ")"
    ] })
  ] }) })) : /* @__PURE__ */ c("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ _("div", { className: "connection-notification__content", children: [
    /* @__PURE__ */ c("div", { className: "connection-notification__icon", children: d.icon }),
    /* @__PURE__ */ c("div", { className: "connection-notification__title", children: d.title }),
    /* @__PURE__ */ c("div", { className: "connection-notification__message", children: d.message }),
    a && /* @__PURE__ */ c("div", { className: "connection-notification__actions", children: /* @__PURE__ */ c(
      "button",
      {
        className: "connection-notification__retry-btn primary",
        onClick: p,
        children: "Try Again"
      }
    ) })
  ] }) }) : null;
}
var Dh = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(Dh || {});
export {
  Ih as AnimatedPlaceholder,
  Qe as CHAT_STATUS,
  Ts as ChatIcon,
  td as ChatWrapper,
  _s as CloseIcon,
  xs as CollapseIcon,
  nd as ConnectionNotification,
  bs as CopyIcon,
  ko as DevSettings,
  Dh as EntityType,
  ks as FullscreenIcon,
  Nh as InlineLoader,
  ja as Loader,
  Pe as PROCESSING_STATUS,
  _h as PromptInput,
  bh as PromptInputButton,
  Xh as PromptInputModelSelect,
  Jh as PromptInputModelSelectContent,
  Qh as PromptInputModelSelectItem,
  Yh as PromptInputModelSelectTrigger,
  ed as PromptInputModelSelectValue,
  vh as PromptInputSubmit,
  Ya as PromptInputTextarea,
  kh as PromptInputToolbar,
  xh as PromptInputTools,
  fh as Reasoning,
  $a as ReasoningContent,
  Va as ReasoningTrigger,
  Wt as STREAMING_STATUS,
  oa as SettingsIcon,
  Ah as SuggestedPrompts,
  oo as fetchThreadMessages,
  or as isChatActive,
  zh as isChatError,
  Uh as isChatIdle,
  Bh as isProcessingActive,
  Wh as isProcessingComplete,
  Gh as isProcessingError,
  Xi as updateThread,
  Yi as updateThreadMetadata,
  $h as useChatState,
  jh as useConversationState,
  Kh as useDevState,
  Vh as useLayoutState,
  Zh as useThreadState,
  qh as useUIState,
  Z as useUIStore
};
