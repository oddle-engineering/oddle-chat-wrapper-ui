var Ja = Object.defineProperty;
var Qa = (e, t, n) => t in e ? Ja(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var G = (e, t, n) => Qa(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as u, jsxs as k, Fragment as Ht } from "react/jsx-runtime";
import ft, { useState as ae, useEffect as Me, useCallback as te, useRef as Ke, useMemo as Ee, Component as mr, createContext as eo, useContext as to, memo as $i, forwardRef as Rn, useImperativeHandle as Zi } from "react";
async function no(e, t) {
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
async function ro(e, t, n) {
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
async function io(e, t, n) {
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
async function Ki(e, t, n, r) {
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
async function qi(e, t, n, r) {
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
const Wr = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), r = (c, h) => {
    const p = typeof c == "function" ? c(t) : c;
    if (!Object.is(p, t)) {
      const m = t;
      t = h ?? (typeof p != "object" || p === null) ? p : Object.assign({}, t, p), n.forEach((d) => d(t, m));
    }
  }, i = () => t, s = { setState: r, getState: i, getInitialState: () => l, subscribe: (c) => (n.add(c), () => n.delete(c)) }, l = t = e(r, i, s);
  return s;
}, ao = (e) => e ? Wr(e) : Wr, oo = (e) => e;
function so(e, t = oo) {
  const n = ft.useSyncExternalStore(
    e.subscribe,
    ft.useCallback(() => t(e.getState()), [e, t]),
    ft.useCallback(() => t(e.getInitialState()), [e, t])
  );
  return ft.useDebugValue(n), n;
}
const lo = (e) => {
  const t = ao(e), n = (r) => so(t, r);
  return Object.assign(n, t), n;
}, co = (e) => lo, Gr = { BASE_URL: "/", DEV: !1, MODE: "production", PROD: !0, SSR: !1 }, an = /* @__PURE__ */ new Map(), dn = (e) => {
  const t = an.get(e);
  return t ? Object.fromEntries(
    Object.entries(t.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, uo = (e, t, n) => {
  if (e === void 0)
    return {
      type: "untracked",
      connection: t.connect(n)
    };
  const r = an.get(n.name);
  if (r)
    return { type: "tracked", store: e, ...r };
  const i = {
    connection: t.connect(n),
    stores: {}
  };
  return an.set(n.name, i), { type: "tracked", store: e, ...i };
}, ho = (e, t) => {
  if (t === void 0) return;
  const n = an.get(e);
  n && (delete n.stores[t], Object.keys(n.stores).length === 0 && an.delete(e));
}, po = (e) => {
  var t, n;
  if (!e) return;
  const r = e.split(`
`), i = r.findIndex(
    (o) => o.includes("api.setState")
  );
  if (i < 0) return;
  const a = ((t = r[i + 1]) == null ? void 0 : t.trim()) || "";
  return (n = /.+ (.+) .+/.exec(a)) == null ? void 0 : n[1];
}, fo = (e, t = {}) => (n, r, i) => {
  const { enabled: a, anonymousActionType: o, store: s, ...l } = t;
  let c;
  try {
    c = (a ?? (Gr ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!c)
    return e(n, r, i);
  const { connection: h, ...p } = uo(s, c, l);
  let m = !0;
  i.setState = (w, N, S) => {
    const _ = n(w, N);
    if (!m) return _;
    const M = S === void 0 ? {
      type: o || po(new Error().stack) || "anonymous"
    } : typeof S == "string" ? { type: S } : S;
    return s === void 0 ? (h == null || h.send(M, r()), _) : (h == null || h.send(
      {
        ...M,
        type: `${s}/${M.type}`
      },
      {
        ...dn(l.name),
        [s]: i.getState()
      }
    ), _);
  }, i.devtools = {
    cleanup: () => {
      h && typeof h.unsubscribe == "function" && h.unsubscribe(), ho(l.name, s);
    }
  };
  const d = (...w) => {
    const N = m;
    m = !1, n(...w), m = N;
  }, y = e(i.setState, r, i);
  if (p.type === "untracked" ? h == null || h.init(y) : (p.stores[p.store] = i, h == null || h.init(
    Object.fromEntries(
      Object.entries(p.stores).map(([w, N]) => [
        w,
        w === p.store ? y : N.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let w = !1;
    const N = i.dispatch;
    i.dispatch = (...S) => {
      (Gr ? "production" : void 0) !== "production" && S[0].type === "__setState" && !w && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), w = !0), N(...S);
    };
  }
  return h.subscribe((w) => {
    var N;
    switch (w.type) {
      case "ACTION":
        if (typeof w.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return Hn(
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
              const _ = S.state[s];
              if (_ == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(_) && d(_);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(S);
          }
        );
      case "DISPATCH":
        switch (w.payload.type) {
          case "RESET":
            return d(y), s === void 0 ? h == null ? void 0 : h.init(i.getState()) : h == null ? void 0 : h.init(dn(l.name));
          case "COMMIT":
            if (s === void 0) {
              h == null || h.init(i.getState());
              return;
            }
            return h == null ? void 0 : h.init(dn(l.name));
          case "ROLLBACK":
            return Hn(w.state, (S) => {
              if (s === void 0) {
                d(S), h == null || h.init(i.getState());
                return;
              }
              d(S[s]), h == null || h.init(dn(l.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return Hn(w.state, (S) => {
              if (s === void 0) {
                d(S);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(S[s]) && d(S[s]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: S } = w.payload, _ = (N = S.computedStates.slice(-1)[0]) == null ? void 0 : N.state;
            if (!_) return;
            d(s === void 0 ? _ : _[s]), h == null || h.send(
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
}, go = fo, Hn = (e, t) => {
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
}, mo = (e) => ({
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
}), et = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, _n = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, Le = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, Mh = (e) => e === et.SUBMITTED || e === et.STREAMING, Lh = (e) => e === et.IDLE, Oh = (e) => e === et.ERROR, Dh = (e) => e === Le.PROCESSING, Ph = (e) => e === Le.COMPLETED, Hh = (e) => e === Le.ERROR, Co = (e) => ({
  // Initial state
  chatStatus: et.IDLE,
  streamingStatus: _n.IDLE,
  // Actions
  setChatStatus: (t) => e({ chatStatus: t }),
  setStreamingStatus: (t) => e({ streamingStatus: t }),
  resetChatStatus: () => e({
    chatStatus: et.IDLE,
    streamingStatus: _n.IDLE
  })
}), yo = (e) => ({
  // Initial state
  isLoadingConversation: !1,
  conversationError: null,
  // Actions
  setIsLoadingConversation: (t) => e({ isLoadingConversation: t }),
  setConversationError: (t) => e({ conversationError: t }),
  clearConversationError: () => e({ conversationError: null })
}), wo = (e) => ({
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
}), So = (e) => ({
  // Initial state
  isDevSettingsOpen: !1,
  // Actions
  setIsDevSettingsOpen: (t) => e({ isDevSettingsOpen: t }),
  toggleDevSettings: () => e((t) => ({ isDevSettingsOpen: !t.isDevSettingsOpen }))
}), Eo = (e) => ({
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
}), $ = co()(
  go(
    (...e) => ({
      ...mo(...e),
      ...Co(...e),
      ...yo(...e),
      ...wo(...e),
      ...So(...e),
      ...Eo(...e)
    }),
    {
      name: "ChatUI-Store"
    }
  )
), Fh = () => $((e) => ({
  isModalOpen: e.isModalOpen,
  isCollapsed: e.isCollapsed,
  currentMode: e.currentMode,
  openModal: e.openModal,
  closeModal: e.closeModal,
  toggleCollapse: e.toggleCollapse,
  toggleFullscreen: e.toggleFullscreen
})), Uh = () => $((e) => ({
  chatStatus: e.chatStatus,
  streamingStatus: e.streamingStatus,
  setChatStatus: e.setChatStatus,
  setStreamingStatus: e.setStreamingStatus,
  resetChatStatus: e.resetChatStatus
})), zh = () => $((e) => ({
  isLoadingConversation: e.isLoadingConversation,
  conversationError: e.conversationError,
  setIsLoadingConversation: e.setIsLoadingConversation,
  setConversationError: e.setConversationError,
  clearConversationError: e.clearConversationError
})), Bh = () => $((e) => ({
  currentThreadId: e.currentThreadId,
  providerResId: e.providerResId,
  setCurrentThreadId: e.setCurrentThreadId,
  setProviderResId: e.setProviderResId,
  clearThreadData: e.clearThreadData
})), Wh = () => $((e) => ({
  isDevSettingsOpen: e.isDevSettingsOpen,
  setIsDevSettingsOpen: e.setIsDevSettingsOpen,
  toggleDevSettings: e.toggleDevSettings
})), To = ({
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
  const [l, c] = ae(null), [h, p] = ae(""), [m, d] = ae(""), y = $((f) => f.providerResId), [w, N] = ae(""), [S, _] = ae("BRAND"), [M, L] = ae(""), [D, T] = ae(""), [O, P] = ae(!1), [U, F] = ae(null), [R, I] = ae(null), [H, B] = ae("agent");
  Me(() => {
    e && !l && W();
  }, [e]);
  const W = te(async () => {
    P(!0), F(null);
    try {
      const f = await no(n, {
        userMpAuthToken: r,
        chatServerKey: i
      });
      if (!f)
        throw new Error(`No configuration found for app: ${a}`);
      c(f), p(f.promptPath), d(f.versionUuid);
    } catch (f) {
      F(f instanceof Error ? f.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", f);
    } finally {
      P(!1);
    }
  }, [n, a, r, i]), re = te(async () => {
    if (l) {
      P(!0), F(null);
      try {
        const f = await ro(n, {
          app: l.app,
          promptPath: h,
          versionUuid: m,
          isDefault: l.isDefault
        }, {
          userMpAuthToken: r,
          chatServerKey: i
        });
        c(f), t(), window.location.reload();
      } catch (f) {
        F(f instanceof Error ? f.message : "Failed to update configuration"), console.error("Error updating agent configuration:", f);
      } finally {
        P(!1);
      }
    }
  }, [n, h, m, l, t, r, i]), Y = te(async () => {
    if (!y) {
      F("No active conversation to attach");
      return;
    }
    P(!0), F(null), I(null);
    try {
      let f;
      if (D.trim())
        try {
          f = JSON.parse(D);
        } catch {
          throw new Error("Invalid JSON in metadata field");
        }
      const J = w && S, Te = M || f;
      if (J && await Ki(
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
      ), Te && await qi(
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
      ), !J && !Te) {
        F("Please provide at least one field to update");
        return;
      }
      I("Thread updated successfully!"), setTimeout(() => {
        N(""), _("BRAND"), L(""), T(""), I(null);
      }, 2e3);
    } catch (f) {
      F(f instanceof Error ? f.message : "Failed to update thread"), console.error("Error updating thread:", f);
    } finally {
      P(!1);
    }
  }, [y, n, w, S, M, D, r, i]), de = te(() => {
    o && (F(null), I(null), o(), I("WebSocket disconnected successfully!"), setTimeout(() => {
      I(null), t();
    }, 1500));
  }, [o, t]), Ie = te(() => {
    l && (p(l.promptPath), d(l.versionUuid)), F(null), t();
  }, [l, t]);
  return e ? /* @__PURE__ */ u("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ u("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: Ie,
          title: "Close settings",
          children: /* @__PURE__ */ u(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ u(
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
    /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-tabs", children: [
      /* @__PURE__ */ u(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${H === "agent" ? "active" : ""}`,
          onClick: () => B("agent"),
          children: "Agent Config"
        }
      ),
      /* @__PURE__ */ u(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${H === "thread" ? "active" : ""}`,
          onClick: () => B("thread"),
          children: "Thread Attachment"
        }
      ),
      /* @__PURE__ */ u(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${H === "connection" ? "active" : ""}`,
          onClick: () => B("connection"),
          children: "Connection"
        }
      )
    ] }),
    /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-content", children: [
      R && /* @__PURE__ */ u("div", { className: "chat-wrapper__dev-settings-success", children: R }),
      O && /* @__PURE__ */ u("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      U && /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ k("p", { children: [
          "Error: ",
          U
        ] }),
        /* @__PURE__ */ u(
          "button",
          {
            onClick: H === "agent" ? W : void 0,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      H === "agent" && l && !O && /* @__PURE__ */ k(Ht, { children: [
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ u("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ u(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: h,
              onChange: (f) => p(f.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: O
            }
          ),
          /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ u("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ u(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: m,
              onChange: (f) => d(f.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: O
            }
          ),
          /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ u("label", { htmlFor: "app-name", children: "App:" }),
          /* @__PURE__ */ u(
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
          /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "Application name for this agent configuration." })
        ] })
      ] }),
      H === "thread" && !O && /* @__PURE__ */ k(Ht, { children: [
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-info", children: [
          /* @__PURE__ */ k("p", { children: [
            /* @__PURE__ */ u("strong", { children: "Provider Resource ID:" }),
            " ",
            y || "No active conversation"
          ] }),
          /* @__PURE__ */ u("p", { style: { fontSize: "12px", color: "#666", marginTop: "8px" }, children: "Note: Entity ownership is typically set at initialization. Use this to update business context." })
        ] }),
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-section", children: [
          /* @__PURE__ */ u("h4", { style: { marginBottom: "8px", fontSize: "14px", fontWeight: "600" }, children: "Update Business Context" }),
          /* @__PURE__ */ u("p", { style: { marginBottom: "12px", fontSize: "12px", color: "#666" }, children: "Update dynamic metadata like order IDs, table IDs, status, etc." }),
          /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
            /* @__PURE__ */ u("label", { htmlFor: "tag", children: "Tag:" }),
            /* @__PURE__ */ u(
              "input",
              {
                id: "tag",
                type: "text",
                value: M,
                onChange: (f) => L(f.target.value),
                placeholder: "e.g., customer-inquiry, support",
                className: "chat-wrapper__dev-settings-input",
                disabled: O || !y
              }
            ),
            /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "Optional tag for categorizing the thread." })
          ] }),
          /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
            /* @__PURE__ */ u("label", { htmlFor: "metadata", children: "Metadata (JSON):" }),
            /* @__PURE__ */ u(
              "textarea",
              {
                id: "metadata",
                value: D,
                onChange: (f) => T(f.target.value),
                placeholder: '{"orderId": "order_789", "tableId": "table_5", "status": "pending"}',
                className: "chat-wrapper__dev-settings-input",
                rows: 4,
                disabled: O || !y
              }
            ),
            /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "App-specific business data (orderId, tableId, campaignId, etc.)." })
          ] })
        ] }),
        /* @__PURE__ */ u("div", { style: { borderTop: "1px solid #e0e0e0", margin: "20px 0" } }),
        /* @__PURE__ */ k("details", { style: { marginTop: "16px" }, children: [
          /* @__PURE__ */ u("summary", { style: { cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#666" }, children: "Advanced: Change Entity Ownership (Rare)" }),
          /* @__PURE__ */ k("div", { style: { marginTop: "12px", padding: "12px", backgroundColor: "#f9f9f9", borderRadius: "4px" }, children: [
            /* @__PURE__ */ u("p", { style: { fontSize: "12px", color: "#666", marginBottom: "12px" }, children: "⚠️ Entity is typically set at initialization. Only change this if transferring conversation ownership." }),
            /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
              /* @__PURE__ */ u("label", { htmlFor: "entity-id", children: "Entity ID:" }),
              /* @__PURE__ */ u(
                "input",
                {
                  id: "entity-id",
                  type: "text",
                  value: w,
                  onChange: (f) => N(f.target.value),
                  placeholder: "e.g., brand_123 or account_456",
                  className: "chat-wrapper__dev-settings-input",
                  disabled: O || !y
                }
              ),
              /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "The brand or account ID to attach this thread to." })
            ] }),
            /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
              /* @__PURE__ */ u("label", { htmlFor: "entity-type", children: "Entity Type:" }),
              /* @__PURE__ */ k(
                "select",
                {
                  id: "entity-type",
                  value: S,
                  onChange: (f) => _(f.target.value),
                  className: "chat-wrapper__dev-settings-input",
                  disabled: O || !y,
                  children: [
                    /* @__PURE__ */ u("option", { value: "", children: "-- Select Type --" }),
                    /* @__PURE__ */ u("option", { value: "BRAND", children: "BRAND" }),
                    /* @__PURE__ */ u("option", { value: "ACCOUNT", children: "ACCOUNT" })
                  ]
                }
              ),
              /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "Type of entity (BRAND or ACCOUNT)." })
            ] })
          ] })
        ] })
      ] }),
      H === "connection" && !O && /* @__PURE__ */ k(Ht, { children: [
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-info", children: [
          /* @__PURE__ */ k("p", { children: [
            /* @__PURE__ */ u("strong", { children: "Connection Status:" }),
            " ",
            s ? "🟢 Connected" : "🔴 Disconnected"
          ] }),
          /* @__PURE__ */ u("p", { style: { fontSize: "12px", color: "#666", marginTop: "8px" }, children: "Manage your WebSocket connection to the chat server." })
        ] }),
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-section", children: [
          /* @__PURE__ */ u("h4", { style: { marginBottom: "8px", fontSize: "14px", fontWeight: "600" }, children: "Disconnect WebSocket" }),
          /* @__PURE__ */ u("p", { style: { marginBottom: "12px", fontSize: "12px", color: "#666" }, children: "Click the button below to manually disconnect the WebSocket connection. This will stop all communication with the chat server." }),
          /* @__PURE__ */ u(
            "button",
            {
              className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
              onClick: de,
              disabled: !s || !o,
              style: { width: "100%", marginTop: "12px" },
              children: s ? "Disconnect WebSocket" : "Already Disconnected"
            }
          ),
          !o && /* @__PURE__ */ u("p", { style: { fontSize: "12px", color: "#ff6b6b", marginTop: "8px" }, children: "⚠️ Disconnect function not available" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: Ie,
          disabled: O,
          children: "Cancel"
        }
      ),
      H === "agent" && /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: re,
          disabled: O || !l,
          children: O ? "Saving..." : "Save & Reload"
        }
      ),
      H === "thread" && /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: Y,
          disabled: O || !y,
          children: O ? "Updating..." : "Update Thread"
        }
      )
    ] })
  ] }) }) : null;
}, _o = {
  maxReconnectAttempts: 1 / 0,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, pn = {
  NORMAL: 1e3,
  // Normal closure
  GOING_AWAY: 1001
};
var Je = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(Je || {}), Tt = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e))(Tt || {}), Pe = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(Pe || {}), wn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(wn || {}), Rt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(Rt || {});
class Bt {
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
    return this.createConnectionEvent(Je.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(Je.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(Je.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(Je.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(Je.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(Je.CHAT_ERROR, { error: t, errorCode: n });
  }
}
class At {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(t) {
    return {
      type: Tt.CHAT_MESSAGE,
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
      type: Tt.CONFIGURE_TOOLS,
      toolSchemas: t,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(t) {
    return {
      type: Tt.UPDATE_TOOLS,
      toolSchemas: t
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(t) {
    return {
      type: Tt.UPDATE_CONTEXT_HELPERS,
      contextHelpers: t
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(t, n) {
    return {
      type: Tt.TOOL_CALL_RESPONSE,
      callId: t,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(t, n) {
    return {
      type: Tt.TOOL_CALL_RESPONSE,
      callId: t,
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
  static createHeartbeatPong(t, n) {
    return {
      type: Tt.HEARTBEAT_PONG,
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
class ko {
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
      NORMAL: pn.NORMAL,
      GOING_AWAY: pn.GOING_AWAY
    }), this.intentionalDisconnect)
      return console.log("[WebSocketManager] Intentional disconnect - no reconnect"), !1;
    const { NORMAL: n } = pn, r = t !== n;
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
        Bt.connectionLost("Max reconnection attempts reached")
      ), this.connectionState.setReconnecting(!1);
      return;
    }
    if (this.reconnectTimer !== null) {
      console.log("[WebSocketManager] Reconnection already in progress, skipping");
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    console.log("[WebSocketManager] Firing RECONNECTING event", { attempt: t, maxAttempts: n }), (s = this.onSystemEvent) == null || s.call(this, Bt.reconnecting(t, n));
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
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Bt.connectionRestored()), (n = this.onOpen) == null || n.call(this);
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
    const t = At.serializeHeartbeatPing();
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
    this.ws && this.ws.close(pn.NORMAL);
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
class xo {
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
class kn {
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
class Xi {
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
const Z = {
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
}, ke = {
  isThinkingMessage: (e) => e.startsWith(Z.THINKING_PREFIX) || e.startsWith(Z.REASONING_PREFIX) || e.startsWith(Z.THOUGHT_PREFIX),
  isCompletedMessage: (e) => e.includes(Z.COMPLETED_MARKER),
  isErrorMessage: (e) => e.includes(Z.ERROR_MARKER),
  isHandlingMessage: (e) => e.includes(Z.HANDLING_MARKER),
  extractDuration: (e) => {
    const t = e.match(Z.PATTERNS.DURATION);
    return t ? ` for ${t[1]} seconds` : void 0;
  },
  cleanReasoningContent: (e) => {
    let t = e.replace(new RegExp(`^${Z.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${Z.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${Z.THOUGHT_PREFIX}\\s*`), "");
    return t = t.replace(/\s*for [\d.]+\s*seconds$/, ""), t = t.replace(Z.PATTERNS.THOUGHT_CONTENT, ""), t.trim();
  },
  getMessageType: (e, t) => t === !1 ? ke.isErrorMessage(e) ? Z.MESSAGE_TYPES.ERROR : (ke.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || ke.isThinkingMessage(e), Z.MESSAGE_TYPES.THOUGHT) : ke.isCompletedMessage(e) ? Z.MESSAGE_TYPES.COMPLETED : ke.isErrorMessage(e) ? Z.MESSAGE_TYPES.ERROR : (ke.isHandlingMessage(e) || ke.isThinkingMessage(e) && !e.includes(Z.UI_TEXT.AI_IS_THINKING), Z.MESSAGE_TYPES.THINKING)
};
class bo extends Xi {
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
    const l = kn.createReasoningCall(
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
    const o = `${Z.THINKING_PREFIX} ${a}`;
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
    const s = i || Z.UI_TEXT.THOUGHT, l = `${Z.THOUGHT_PREFIX} ${s}${o}`;
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
class vo extends Xi {
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
      this.processedToolCalls.add(r), (o = this.getHandler("onReasoningUpdate")) == null || o(!0, `${Z.HANDLING_MARKER} ${i}`, n);
      try {
        const c = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, c), (s = this.getHandler("onReasoningUpdate")) == null || s(!1, `${Z.COMPLETED_MARKER} ${i}`, n);
      } catch (c) {
        this.sendToolError(r, c), (l = this.getHandler("onReasoningUpdate")) == null || l(!1, `${Z.ERROR_MARKER} Error: ${i} - ${c}`, n);
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
    const i = At.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = At.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = kn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId,
        n.args || {}
      );
      r(!0, `${Z.HANDLING_MARKER} ${n.toolName}`, a);
    }
  }
  handleServerToolResult(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = kn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId
      );
      r(
        !1,
        `${Z.COMPLETED_MARKER} ${n.toolName}`,
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
class Io {
  constructor(t, n = {}) {
    G(this, "reasoningHandler");
    G(this, "toolHandler");
    G(this, "handlers");
    G(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new bo(t.onReasoningUpdate), this.toolHandler = new vo(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case Pe.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case Pe.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case Pe.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case Pe.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case Pe.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case Pe.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case Pe.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case Pe.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case Pe.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case Pe.HEARTBEAT_ACK:
          break;
        case Pe.ERROR:
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
      case wn.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case wn.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case wn.CONTENT_DELTA:
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
        const i = kn.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${Z.COMPLETED_MARKER} ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Bt.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Bt.chatError(t.error || "Unknown error"));
  }
  handleToolCallRequest(t) {
    this.toolHandler.handleToolCallRequest(t);
  }
  handleHeartbeatPing(t) {
    if (!this.sendMessage)
      return;
    const n = At.serializeHeartbeatPong(
      t.timestamp,
      t.pingTime
    );
    this.sendMessage(n);
  }
  handleError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Bt.chatError(t.error || "Unknown WebSocket error"));
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
async function Ro(e, t) {
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
function tr(e) {
  if (!e.success || !e.ticket || !e.expiresAt)
    return !1;
  const t = new Date(e.expiresAt).getTime();
  return Date.now() < t - 3e4;
}
function Vr(e) {
  const t = tr(e), n = new Date(e.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: t,
    expiresIn: i,
    expired: r >= n
  };
}
class Ao {
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
    return this.ticket && tr(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
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
      return this.ticket = await Ro(this.apiUrl, this.authData), console.log("TicketManager: Ticket received successfully", {
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
      const r = Vr(this.ticket).expiresIn / 1e3;
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
    return this.ticket ? tr(this.ticket) : !1;
  }
  /**
   * Get time until ticket expires (in milliseconds)
   */
  getExpiresIn() {
    if (this.ticket)
      try {
        return Vr(this.ticket).expiresIn;
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
class No {
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
      ..._o
    }, this.connectionState = new xo(), this.wsManager = new ko(this.config, this.connectionState), this.messageHandler = new Io({}), this.setupWebSocketHandlers();
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
    if ((n == null ? void 0 : n.type) === "authentication_error" && (console.error(
      "WebSocket authentication failed:",
      n == null ? void 0 : n.error,
      n == null ? void 0 : n.code
    ), this.handleAuthenticationFailure(n)), (n == null ? void 0 : n.type) === Pe.TOOLS_CONFIGURED && ((r = this.initResolve) == null || r.call(this)), (n == null ? void 0 : n.type) === Pe.SESSION_ESTABLISHED && (this.toolSchemas && this.toolSchemas.length > 0 ? this.sendToolConfiguration() : (i = this.initResolve) == null || i.call(this)), (n == null ? void 0 : n.type) === Pe.SESSION_ESTABLISHED) {
      const a = n == null ? void 0 : n.sessionId;
      a && (console.log("WebSocketChatClient: SESSION_ESTABLISHED - received sessionId", a), this.wsManager.updateSession(a));
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
      var o;
      console.error("Failed to refresh ticket:", a), (o = this.initReject) == null || o.call(this, a);
    })) : (i = this.initReject) == null || i.call(this, new Error(`Authentication failed: ${n == null ? void 0 : n.error}`));
  }
  sendToolConfiguration() {
    const t = At.serializeConfigureTools(
      this.toolSchemas,
      this.contextHelpers
    );
    this.wsManager.send(t);
  }
  async onInit(t) {
    return this.setupEventHandlers(t), this.setupToolsAndContext(t), this.updateConfig(t), this.authCredentials = {
      userMpAuthToken: t.userMpAuthToken,
      chatServerKey: t.chatServerKey
    }, this.ticketManager = new Ao(
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
      onReasoningUpdate: t.onReasoningUpdate
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
      const a = At.serializeChatMessage({
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
    const n = At.serializeUpdateContextHelpers(
      this.contextHelpers
    );
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = At.serializeUpdateTools(this.toolSchemas);
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
      throw new Error("WebSocketChatClient: Cannot update entityId - TicketManager not initialized");
    console.log(`WebSocketChatClient: Updating entity attachment - providerResId: ${t}, entityId: ${n}, entityType: ${r}`);
    try {
      await Ki(
        this.config.apiUrl,
        t,
        {
          entityId: n,
          entityType: r
        },
        this.authCredentials
      ), console.log("WebSocketChatClient: Thread entity attachment updated on server successfully");
      const i = { entityId: n, entityType: r };
      this.ticketManager.updateAuthData(i), console.log("WebSocketChatClient: Local auth data updated successfully");
    } catch (i) {
      throw console.error("WebSocketChatClient: Failed to update entity attachment:", i), i;
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
    console.log(`WebSocketChatClient: Updating thread metadata - providerResId: ${t}`);
    try {
      await qi(
        this.config.apiUrl,
        t,
        n,
        this.authCredentials
      ), console.log("WebSocketChatClient: Thread metadata updated successfully");
    } catch (r) {
      throw console.error("WebSocketChatClient: Failed to update thread metadata:", r), r;
    }
  }
}
function Mo({
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
  onReasoningUpdate: c
}) {
  const [h, p] = ae(
    null
  ), [m, d] = ae(!1), [y, w] = ae(!1), [N, S] = ae(!1), [_, M] = ae(0), L = Ke(null), D = Ke(s), T = Ke(l), O = Ke(c);
  Me(() => {
    D.current = s, T.current = l, O.current = c;
  }, [s, l, c]);
  const { toolSchemas: P, clientToolExecutors: U } = Ee(() => {
    if (a && a.length > 0) {
      const H = a.map(({ execute: W, ...re }) => re), B = {};
      return a.forEach((W) => {
        B[W.name] = W.execute;
      }), {
        toolSchemas: H,
        clientToolExecutors: B
      };
    }
    return {
      toolSchemas: [],
      clientToolExecutors: {}
    };
  }, [a]), F = Ke(), R = te(async () => {
    try {
      if (w(!0), !e)
        throw new Error("userMpAuthToken is required");
      if (!t)
        throw new Error("chatServerUrl is required");
      if (!n)
        throw new Error("chatServerKey is required");
      const H = new No();
      L.current = H, p(H);
      const B = o || {};
      await H.onInit({
        // Authentication and server properties
        userMpAuthToken: e,
        chatServerUrl: t,
        chatServerKey: n,
        entityId: r,
        entityType: i == null ? void 0 : i.toString(),
        // Tools configuration
        toolSchemas: P,
        clientTools: U,
        contextHelpers: B,
        onSetMessage: D.current,
        onSystemEvent: T.current,
        onReasoningUpdate: O.current
      }), d(!0);
    } catch (H) {
      console.error("Error connecting WebSocketChatClient:", H), d(!1), setTimeout(() => {
        var B;
        (L.current === null || !L.current.getConnectionStatus().connected) && ((B = F.current) == null || B.call(F));
      }, 2e3);
    } finally {
      w(!1);
    }
  }, [
    e,
    t,
    n,
    r,
    i,
    P,
    U,
    o
    // Removed onSetMessage, onSystemEvent, onReasoningUpdate to prevent reconnections
  ]), I = te(() => {
    L.current && (L.current.disconnect(), L.current = null), p(null), d(!1);
  }, []);
  return F.current = R, Me(() => (R(), () => {
    I();
  }), [R, I]), Me(() => {
    const H = setInterval(() => {
      if (L.current) {
        const B = L.current.getConnectionStatus();
        d(B.connected), S(B.isReconnecting), M(B.reconnectAttempts);
      }
    }, 1e3);
    return () => clearInterval(H);
  }, []), {
    chatClient: h,
    isConnected: m,
    isConnecting: y,
    isReconnecting: N,
    reconnectAttempts: _,
    connectChatClient: R,
    disconnectChatClient: I
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: Yi,
  setPrototypeOf: jr,
  isFrozen: Lo,
  getPrototypeOf: Oo,
  getOwnPropertyDescriptor: Do
} = Object;
let {
  freeze: He,
  seal: tt,
  create: nr
} = Object, {
  apply: rr,
  construct: ir
} = typeof Reflect < "u" && Reflect;
He || (He = function(t) {
  return t;
});
tt || (tt = function(t) {
  return t;
});
rr || (rr = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
ir || (ir = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const fn = Fe(Array.prototype.forEach), Po = Fe(Array.prototype.lastIndexOf), $r = Fe(Array.prototype.pop), Kt = Fe(Array.prototype.push), Ho = Fe(Array.prototype.splice), Sn = Fe(String.prototype.toLowerCase), Fn = Fe(String.prototype.toString), Un = Fe(String.prototype.match), qt = Fe(String.prototype.replace), Fo = Fe(String.prototype.indexOf), Uo = Fe(String.prototype.trim), ot = Fe(Object.prototype.hasOwnProperty), De = Fe(RegExp.prototype.test), Xt = zo(TypeError);
function Fe(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return rr(e, t, r);
  };
}
function zo(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return ir(e, n);
  };
}
function ee(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Sn;
  jr && jr(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (Lo(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function Bo(e) {
  for (let t = 0; t < e.length; t++)
    ot(e, t) || (e[t] = null);
  return e;
}
function _t(e) {
  const t = nr(null);
  for (const [n, r] of Yi(e))
    ot(e, n) && (Array.isArray(r) ? t[n] = Bo(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = _t(r) : t[n] = r);
  return t;
}
function Yt(e, t) {
  for (; e !== null; ) {
    const r = Do(e, t);
    if (r) {
      if (r.get)
        return Fe(r.get);
      if (typeof r.value == "function")
        return Fe(r.value);
    }
    e = Oo(e);
  }
  function n() {
    return null;
  }
  return n;
}
const Zr = He(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), zn = He(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Bn = He(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Wo = He(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Wn = He(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Go = He(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Kr = He(["#text"]), qr = He(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Gn = He(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Xr = He(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), gn = He(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Vo = tt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), jo = tt(/<%[\w\W]*|[\w\W]*%>/gm), $o = tt(/\$\{[\w\W]*/gm), Zo = tt(/^data-[\-\w.\u00B7-\uFFFF]+$/), Ko = tt(/^aria-[\-\w]+$/), Ji = tt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), qo = tt(/^(?:\w+script|data):/i), Xo = tt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Qi = tt(/^html$/i), Yo = tt(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Yr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Ko,
  ATTR_WHITESPACE: Xo,
  CUSTOM_ELEMENT: Yo,
  DATA_ATTR: Zo,
  DOCTYPE_NAME: Qi,
  ERB_EXPR: jo,
  IS_ALLOWED_URI: Ji,
  IS_SCRIPT_OR_DATA: qo,
  MUSTACHE_EXPR: Vo,
  TMPLIT_EXPR: $o
});
const Jt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Jo = function() {
  return typeof window > "u" ? null : window;
}, Qo = function(t, n) {
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
}, Jr = function() {
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
function ea() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Jo();
  const t = (V) => ea(V);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== Jt.document || !e.Element)
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
    NamedNodeMap: h = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: p,
    DOMParser: m,
    trustedTypes: d
  } = e, y = l.prototype, w = Yt(y, "cloneNode"), N = Yt(y, "remove"), S = Yt(y, "nextSibling"), _ = Yt(y, "childNodes"), M = Yt(y, "parentNode");
  if (typeof o == "function") {
    const V = n.createElement("template");
    V.content && V.content.ownerDocument && (n = V.content.ownerDocument);
  }
  let L, D = "";
  const {
    implementation: T,
    createNodeIterator: O,
    createDocumentFragment: P,
    getElementsByTagName: U
  } = n, {
    importNode: F
  } = r;
  let R = Jr();
  t.isSupported = typeof Yi == "function" && typeof M == "function" && T && T.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: I,
    ERB_EXPR: H,
    TMPLIT_EXPR: B,
    DATA_ATTR: W,
    ARIA_ATTR: re,
    IS_SCRIPT_OR_DATA: Y,
    ATTR_WHITESPACE: de,
    CUSTOM_ELEMENT: Ie
  } = Yr;
  let {
    IS_ALLOWED_URI: f
  } = Yr, J = null;
  const Te = ee({}, [...Zr, ...zn, ...Bn, ...Wn, ...Kr]);
  let g = null;
  const _e = ee({}, [...qr, ...Gn, ...Xr, ...gn]);
  let ne = Object.seal(nr(null, {
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
  })), oe = null, Re = null;
  const ce = Object.seal(nr(null, {
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
  let Xe = !0, Ve = !0, lt = !1, Mt = !0, nt = !1, yt = !0, je = !1, kt = !1, xt = !1, rt = !1, ct = !1, ut = !1, bt = !0, ht = !1;
  const $t = "user-content-";
  let me = !0, it = !1, E = {}, A = null;
  const j = ee({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let q = null;
  const Q = ee({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ce = null;
  const Ue = ee({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), xe = "http://www.w3.org/1998/Math/MathML", Ye = "http://www.w3.org/2000/svg", be = "http://www.w3.org/1999/xhtml";
  let he = be, $e = !1, Ae = null;
  const un = ee({}, [xe, Ye, be], Fn);
  let Lt = ee({}, ["mi", "mo", "mn", "ms", "mtext"]), Ot = ee({}, ["annotation-xml"]);
  const hn = ee({}, ["title", "style", "font", "a", "script"]);
  let vt = null;
  const On = ["application/xhtml+xml", "text/html"], Mr = "text/html";
  let fe = null, wt = null;
  const x = n.createElement("form"), ge = function(C) {
    return C instanceof RegExp || C instanceof Function;
  }, pe = function() {
    let C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(wt && wt === C)) {
      if ((!C || typeof C != "object") && (C = {}), C = _t(C), vt = // eslint-disable-next-line unicorn/prefer-includes
      On.indexOf(C.PARSER_MEDIA_TYPE) === -1 ? Mr : C.PARSER_MEDIA_TYPE, fe = vt === "application/xhtml+xml" ? Fn : Sn, J = ot(C, "ALLOWED_TAGS") ? ee({}, C.ALLOWED_TAGS, fe) : Te, g = ot(C, "ALLOWED_ATTR") ? ee({}, C.ALLOWED_ATTR, fe) : _e, Ae = ot(C, "ALLOWED_NAMESPACES") ? ee({}, C.ALLOWED_NAMESPACES, Fn) : un, Ce = ot(C, "ADD_URI_SAFE_ATTR") ? ee(_t(Ue), C.ADD_URI_SAFE_ATTR, fe) : Ue, q = ot(C, "ADD_DATA_URI_TAGS") ? ee(_t(Q), C.ADD_DATA_URI_TAGS, fe) : Q, A = ot(C, "FORBID_CONTENTS") ? ee({}, C.FORBID_CONTENTS, fe) : j, oe = ot(C, "FORBID_TAGS") ? ee({}, C.FORBID_TAGS, fe) : _t({}), Re = ot(C, "FORBID_ATTR") ? ee({}, C.FORBID_ATTR, fe) : _t({}), E = ot(C, "USE_PROFILES") ? C.USE_PROFILES : !1, Xe = C.ALLOW_ARIA_ATTR !== !1, Ve = C.ALLOW_DATA_ATTR !== !1, lt = C.ALLOW_UNKNOWN_PROTOCOLS || !1, Mt = C.ALLOW_SELF_CLOSE_IN_ATTR !== !1, nt = C.SAFE_FOR_TEMPLATES || !1, yt = C.SAFE_FOR_XML !== !1, je = C.WHOLE_DOCUMENT || !1, rt = C.RETURN_DOM || !1, ct = C.RETURN_DOM_FRAGMENT || !1, ut = C.RETURN_TRUSTED_TYPE || !1, xt = C.FORCE_BODY || !1, bt = C.SANITIZE_DOM !== !1, ht = C.SANITIZE_NAMED_PROPS || !1, me = C.KEEP_CONTENT !== !1, it = C.IN_PLACE || !1, f = C.ALLOWED_URI_REGEXP || Ji, he = C.NAMESPACE || be, Lt = C.MATHML_TEXT_INTEGRATION_POINTS || Lt, Ot = C.HTML_INTEGRATION_POINTS || Ot, ne = C.CUSTOM_ELEMENT_HANDLING || {}, C.CUSTOM_ELEMENT_HANDLING && ge(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (ne.tagNameCheck = C.CUSTOM_ELEMENT_HANDLING.tagNameCheck), C.CUSTOM_ELEMENT_HANDLING && ge(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (ne.attributeNameCheck = C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), C.CUSTOM_ELEMENT_HANDLING && typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (ne.allowCustomizedBuiltInElements = C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), nt && (Ve = !1), ct && (rt = !0), E && (J = ee({}, Kr), g = [], E.html === !0 && (ee(J, Zr), ee(g, qr)), E.svg === !0 && (ee(J, zn), ee(g, Gn), ee(g, gn)), E.svgFilters === !0 && (ee(J, Bn), ee(g, Gn), ee(g, gn)), E.mathMl === !0 && (ee(J, Wn), ee(g, Xr), ee(g, gn))), C.ADD_TAGS && (typeof C.ADD_TAGS == "function" ? ce.tagCheck = C.ADD_TAGS : (J === Te && (J = _t(J)), ee(J, C.ADD_TAGS, fe))), C.ADD_ATTR && (typeof C.ADD_ATTR == "function" ? ce.attributeCheck = C.ADD_ATTR : (g === _e && (g = _t(g)), ee(g, C.ADD_ATTR, fe))), C.ADD_URI_SAFE_ATTR && ee(Ce, C.ADD_URI_SAFE_ATTR, fe), C.FORBID_CONTENTS && (A === j && (A = _t(A)), ee(A, C.FORBID_CONTENTS, fe)), me && (J["#text"] = !0), je && ee(J, ["html", "head", "body"]), J.table && (ee(J, ["tbody"]), delete oe.tbody), C.TRUSTED_TYPES_POLICY) {
        if (typeof C.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Xt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof C.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Xt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        L = C.TRUSTED_TYPES_POLICY, D = L.createHTML("");
      } else
        L === void 0 && (L = Qo(d, i)), L !== null && typeof D == "string" && (D = L.createHTML(""));
      He && He(C), wt = C;
    }
  }, ye = ee({}, [...zn, ...Bn, ...Wo]), at = ee({}, [...Wn, ...Go]), Zt = function(C) {
    let v = M(C);
    (!v || !v.tagName) && (v = {
      namespaceURI: he,
      tagName: "template"
    });
    const z = Sn(C.tagName), ue = Sn(v.tagName);
    return Ae[C.namespaceURI] ? C.namespaceURI === Ye ? v.namespaceURI === be ? z === "svg" : v.namespaceURI === xe ? z === "svg" && (ue === "annotation-xml" || Lt[ue]) : !!ye[z] : C.namespaceURI === xe ? v.namespaceURI === be ? z === "math" : v.namespaceURI === Ye ? z === "math" && Ot[ue] : !!at[z] : C.namespaceURI === be ? v.namespaceURI === Ye && !Ot[ue] || v.namespaceURI === xe && !Lt[ue] ? !1 : !at[z] && (hn[z] || !ye[z]) : !!(vt === "application/xhtml+xml" && Ae[C.namespaceURI]) : !1;
  }, dt = function(C) {
    Kt(t.removed, {
      element: C
    });
    try {
      M(C).removeChild(C);
    } catch {
      N(C);
    }
  }, Dt = function(C, v) {
    try {
      Kt(t.removed, {
        attribute: v.getAttributeNode(C),
        from: v
      });
    } catch {
      Kt(t.removed, {
        attribute: null,
        from: v
      });
    }
    if (v.removeAttribute(C), C === "is")
      if (rt || ct)
        try {
          dt(v);
        } catch {
        }
      else
        try {
          v.setAttribute(C, "");
        } catch {
        }
  }, Lr = function(C) {
    let v = null, z = null;
    if (xt)
      C = "<remove></remove>" + C;
    else {
      const we = Un(C, /^[\r\n\t ]+/);
      z = we && we[0];
    }
    vt === "application/xhtml+xml" && he === be && (C = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + C + "</body></html>");
    const ue = L ? L.createHTML(C) : C;
    if (he === be)
      try {
        v = new m().parseFromString(ue, vt);
      } catch {
      }
    if (!v || !v.documentElement) {
      v = T.createDocument(he, "template", null);
      try {
        v.documentElement.innerHTML = $e ? D : ue;
      } catch {
      }
    }
    const Ne = v.body || v.documentElement;
    return C && z && Ne.insertBefore(n.createTextNode(z), Ne.childNodes[0] || null), he === be ? U.call(v, je ? "html" : "body")[0] : je ? v.documentElement : Ne;
  }, Or = function(C) {
    return O.call(
      C.ownerDocument || C,
      C,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, Dn = function(C) {
    return C instanceof p && (typeof C.nodeName != "string" || typeof C.textContent != "string" || typeof C.removeChild != "function" || !(C.attributes instanceof h) || typeof C.removeAttribute != "function" || typeof C.setAttribute != "function" || typeof C.namespaceURI != "string" || typeof C.insertBefore != "function" || typeof C.hasChildNodes != "function");
  }, Dr = function(C) {
    return typeof s == "function" && C instanceof s;
  };
  function St(V, C, v) {
    fn(V, (z) => {
      z.call(t, C, v, wt);
    });
  }
  const Pr = function(C) {
    let v = null;
    if (St(R.beforeSanitizeElements, C, null), Dn(C))
      return dt(C), !0;
    const z = fe(C.nodeName);
    if (St(R.uponSanitizeElement, C, {
      tagName: z,
      allowedTags: J
    }), yt && C.hasChildNodes() && !Dr(C.firstElementChild) && De(/<[/\w!]/g, C.innerHTML) && De(/<[/\w!]/g, C.textContent) || C.nodeType === Jt.progressingInstruction || yt && C.nodeType === Jt.comment && De(/<[/\w]/g, C.data))
      return dt(C), !0;
    if (!(ce.tagCheck instanceof Function && ce.tagCheck(z)) && (!J[z] || oe[z])) {
      if (!oe[z] && Fr(z) && (ne.tagNameCheck instanceof RegExp && De(ne.tagNameCheck, z) || ne.tagNameCheck instanceof Function && ne.tagNameCheck(z)))
        return !1;
      if (me && !A[z]) {
        const ue = M(C) || C.parentNode, Ne = _(C) || C.childNodes;
        if (Ne && ue) {
          const we = Ne.length;
          for (let ze = we - 1; ze >= 0; --ze) {
            const Et = w(Ne[ze], !0);
            Et.__removalCount = (C.__removalCount || 0) + 1, ue.insertBefore(Et, S(C));
          }
        }
      }
      return dt(C), !0;
    }
    return C instanceof l && !Zt(C) || (z === "noscript" || z === "noembed" || z === "noframes") && De(/<\/no(script|embed|frames)/i, C.innerHTML) ? (dt(C), !0) : (nt && C.nodeType === Jt.text && (v = C.textContent, fn([I, H, B], (ue) => {
      v = qt(v, ue, " ");
    }), C.textContent !== v && (Kt(t.removed, {
      element: C.cloneNode()
    }), C.textContent = v)), St(R.afterSanitizeElements, C, null), !1);
  }, Hr = function(C, v, z) {
    if (bt && (v === "id" || v === "name") && (z in n || z in x))
      return !1;
    if (!(Ve && !Re[v] && De(W, v))) {
      if (!(Xe && De(re, v))) {
        if (!(ce.attributeCheck instanceof Function && ce.attributeCheck(v, C))) {
          if (!g[v] || Re[v]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Fr(C) && (ne.tagNameCheck instanceof RegExp && De(ne.tagNameCheck, C) || ne.tagNameCheck instanceof Function && ne.tagNameCheck(C)) && (ne.attributeNameCheck instanceof RegExp && De(ne.attributeNameCheck, v) || ne.attributeNameCheck instanceof Function && ne.attributeNameCheck(v, C)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              v === "is" && ne.allowCustomizedBuiltInElements && (ne.tagNameCheck instanceof RegExp && De(ne.tagNameCheck, z) || ne.tagNameCheck instanceof Function && ne.tagNameCheck(z)))
            ) return !1;
          } else if (!Ce[v]) {
            if (!De(f, qt(z, de, ""))) {
              if (!((v === "src" || v === "xlink:href" || v === "href") && C !== "script" && Fo(z, "data:") === 0 && q[C])) {
                if (!(lt && !De(Y, qt(z, de, "")))) {
                  if (z)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Fr = function(C) {
    return C !== "annotation-xml" && Un(C, Ie);
  }, Ur = function(C) {
    St(R.beforeSanitizeAttributes, C, null);
    const {
      attributes: v
    } = C;
    if (!v || Dn(C))
      return;
    const z = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: g,
      forceKeepAttr: void 0
    };
    let ue = v.length;
    for (; ue--; ) {
      const Ne = v[ue], {
        name: we,
        namespaceURI: ze,
        value: Et
      } = Ne, Ut = fe(we), Pn = Et;
      let ve = we === "value" ? Pn : Uo(Pn);
      if (z.attrName = Ut, z.attrValue = ve, z.keepAttr = !0, z.forceKeepAttr = void 0, St(R.uponSanitizeAttribute, C, z), ve = z.attrValue, ht && (Ut === "id" || Ut === "name") && (Dt(we, C), ve = $t + ve), yt && De(/((--!?|])>)|<\/(style|title|textarea)/i, ve)) {
        Dt(we, C);
        continue;
      }
      if (Ut === "attributename" && Un(ve, "href")) {
        Dt(we, C);
        continue;
      }
      if (z.forceKeepAttr)
        continue;
      if (!z.keepAttr) {
        Dt(we, C);
        continue;
      }
      if (!Mt && De(/\/>/i, ve)) {
        Dt(we, C);
        continue;
      }
      nt && fn([I, H, B], (Br) => {
        ve = qt(ve, Br, " ");
      });
      const zr = fe(C.nodeName);
      if (!Hr(zr, Ut, ve)) {
        Dt(we, C);
        continue;
      }
      if (L && typeof d == "object" && typeof d.getAttributeType == "function" && !ze)
        switch (d.getAttributeType(zr, Ut)) {
          case "TrustedHTML": {
            ve = L.createHTML(ve);
            break;
          }
          case "TrustedScriptURL": {
            ve = L.createScriptURL(ve);
            break;
          }
        }
      if (ve !== Pn)
        try {
          ze ? C.setAttributeNS(ze, we, ve) : C.setAttribute(we, ve), Dn(C) ? dt(C) : $r(t.removed);
        } catch {
          Dt(we, C);
        }
    }
    St(R.afterSanitizeAttributes, C, null);
  }, Ya = function V(C) {
    let v = null;
    const z = Or(C);
    for (St(R.beforeSanitizeShadowDOM, C, null); v = z.nextNode(); )
      St(R.uponSanitizeShadowNode, v, null), Pr(v), Ur(v), v.content instanceof a && V(v.content);
    St(R.afterSanitizeShadowDOM, C, null);
  };
  return t.sanitize = function(V) {
    let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, v = null, z = null, ue = null, Ne = null;
    if ($e = !V, $e && (V = "<!-->"), typeof V != "string" && !Dr(V))
      if (typeof V.toString == "function") {
        if (V = V.toString(), typeof V != "string")
          throw Xt("dirty is not a string, aborting");
      } else
        throw Xt("toString is not a function");
    if (!t.isSupported)
      return V;
    if (kt || pe(C), t.removed = [], typeof V == "string" && (it = !1), it) {
      if (V.nodeName) {
        const Et = fe(V.nodeName);
        if (!J[Et] || oe[Et])
          throw Xt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (V instanceof s)
      v = Lr("<!---->"), z = v.ownerDocument.importNode(V, !0), z.nodeType === Jt.element && z.nodeName === "BODY" || z.nodeName === "HTML" ? v = z : v.appendChild(z);
    else {
      if (!rt && !nt && !je && // eslint-disable-next-line unicorn/prefer-includes
      V.indexOf("<") === -1)
        return L && ut ? L.createHTML(V) : V;
      if (v = Lr(V), !v)
        return rt ? null : ut ? D : "";
    }
    v && xt && dt(v.firstChild);
    const we = Or(it ? V : v);
    for (; ue = we.nextNode(); )
      Pr(ue), Ur(ue), ue.content instanceof a && Ya(ue.content);
    if (it)
      return V;
    if (rt) {
      if (ct)
        for (Ne = P.call(v.ownerDocument); v.firstChild; )
          Ne.appendChild(v.firstChild);
      else
        Ne = v;
      return (g.shadowroot || g.shadowrootmode) && (Ne = F.call(r, Ne, !0)), Ne;
    }
    let ze = je ? v.outerHTML : v.innerHTML;
    return je && J["!doctype"] && v.ownerDocument && v.ownerDocument.doctype && v.ownerDocument.doctype.name && De(Qi, v.ownerDocument.doctype.name) && (ze = "<!DOCTYPE " + v.ownerDocument.doctype.name + `>
` + ze), nt && fn([I, H, B], (Et) => {
      ze = qt(ze, Et, " ");
    }), L && ut ? L.createHTML(ze) : ze;
  }, t.setConfig = function() {
    let V = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    pe(V), kt = !0;
  }, t.clearConfig = function() {
    wt = null, kt = !1;
  }, t.isValidAttribute = function(V, C, v) {
    wt || pe({});
    const z = fe(V), ue = fe(C);
    return Hr(z, ue, v);
  }, t.addHook = function(V, C) {
    typeof C == "function" && Kt(R[V], C);
  }, t.removeHook = function(V, C) {
    if (C !== void 0) {
      const v = Po(R[V], C);
      return v === -1 ? void 0 : Ho(R[V], v, 1)[0];
    }
    return $r(R[V]);
  }, t.removeHooks = function(V) {
    R[V] = [];
  }, t.removeAllHooks = function() {
    R = Jr();
  }, t;
}
var es = ea();
function ts(e) {
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
function xn(e, t = !1) {
  return e;
}
function ns(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function Qr(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || ts(e));
  } catch {
    return !1;
  }
}
function rs() {
  es.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !Qr(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !Qr(n) && e.removeAttribute("src");
    }
  });
}
rs();
function is() {
  const [e, t] = ae([]), n = te(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = te(
    (o, s) => {
      const c = xn(s, o === "assistant");
      t((h) => [
        ...h,
        {
          id: n(),
          role: o,
          content: c,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [n]
  ), i = te(
    (o, s) => {
      t(
        (l) => l.map(
          (c) => c.id === o ? { ...c, ...s } : c
        )
      );
    },
    []
  ), a = te(
    (o, s, l) => {
      t(
        (c) => c.map(
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
function as() {
  const e = $((_) => _.isStreaming), t = $((_) => _.setIsStreaming), n = $((_) => _.isThinking), r = $((_) => _.setIsThinking), i = $((_) => _.streamingContent), a = $((_) => _.setStreamingContent), o = $((_) => _.isHandlingTool), s = $((_) => _.setIsHandlingTool), l = $((_) => _.startStreaming), c = $((_) => _.stopStreaming), h = $((_) => _.clearStreamingBuffers), p = $((_) => _.resetToolHandling), m = Ke(""), d = Ee(() => ({
    get current() {
      return $.getState().currentAssistantMessageId;
    },
    set current(_) {
      $.getState().setCurrentAssistantMessageId(_);
    }
  }), []), y = te((_) => {
    _ ? l(_) : (t(!0), r(!0), a("")), m.current = "";
  }, [l, t, r, a]), w = te(() => {
    c(), m.current = "";
  }, [c]), N = te(() => {
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
    resetToolHandling: N,
    clearStreamingBuffers: S
  };
}
function os() {
  const e = Ee(
    () => (i, a) => a === !1 ? ke.isErrorMessage(i) ? Le.ERROR : Le.COMPLETED : ke.isCompletedMessage(i) ? Le.COMPLETED : ke.isErrorMessage(i) ? Le.ERROR : Le.PROCESSING,
    []
  ), t = Ee(
    () => (i) => ke.extractDuration(i),
    []
  ), n = Ee(
    () => (i) => ke.cleanReasoningContent(i),
    []
  ), r = Ee(
    () => (i, a) => {
      switch (ke.getMessageType(
        i,
        a
      )) {
        case Z.MESSAGE_TYPES.ERROR:
          return "Error";
        case Z.MESSAGE_TYPES.COMPLETED:
          return "Completed";
        case Z.MESSAGE_TYPES.THOUGHT:
          return Z.UI_TEXT.THOUGHT;
        case Z.MESSAGE_TYPES.THINKING:
        default:
          return Z.UI_TEXT.THINKING_ELLIPSIS;
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
function ss() {
  const e = Ee(
    () => (n, r) => r === !1 ? n.includes(Z.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : n.includes(Z.COMPLETED_MARKER) || n.includes("✅") ? "Tool Completed" : n.includes(Z.ERROR_MARKER) ? "Tool Error" : (n.includes(Z.HANDLING_MARKER), "Tool Processing..."),
    []
  ), t = Ee(
    () => (n, r) => r === !1 ? n.includes(Z.ERROR_MARKER) ? Le.ERROR : Le.COMPLETED : n.includes(Z.COMPLETED_MARKER) || n.includes("✅") ? Le.COMPLETED : n.includes(Z.ERROR_MARKER) ? Le.ERROR : Le.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: t
  };
}
function ls({
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
  clearStreamingBuffers: h,
  resetToolHandling: p
}) {
  const m = Ke(/* @__PURE__ */ new Map()), d = Ke(/* @__PURE__ */ new Map()), y = te(() => {
    if (l.current && c.current) {
      const L = xn(
        c.current,
        !0
      );
      return n(
        l.current,
        L,
        !1
      ), h(), !0;
    }
    return !1;
  }, [
    l,
    c,
    n,
    h
  ]), w = te(
    (L) => {
      const D = xn(L, !0);
      if (l.current)
        c.current += D, o(c.current), n(
          l.current,
          c.current,
          !0
        );
      else {
        i(!1);
        const T = r();
        l.current = T, c.current = D, o(D);
        const O = {
          id: T,
          role: "assistant",
          content: D,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        e((P) => [...P, O]);
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
  ), N = te(
    (L, D, T) => {
      const { callId: O } = T || {};
      if (s(L), !O) return;
      const P = ke.isThinkingMessage(D) && !D.includes("for") && !D.includes("seconds"), U = ke.isThinkingMessage(D) && D.includes("for") && D.includes("seconds"), F = ke.isHandlingMessage(D), R = ke.isCompletedMessage(D), I = ke.isErrorMessage(D);
      if (P || U) {
        const B = m.current.get(O);
        if (P && !B) {
          y();
          const W = r();
          m.current.set(O, W);
          const re = {
            id: W,
            role: "reasoning",
            content: D,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          e((Y) => [...Y, re]);
        } else U && B ? (n(B, D, !1), m.current.delete(O)) : B && P && n(B, D, !0);
      }
      const H = d.current.get(O);
      if (F && !H) {
        y();
        const B = D.match(
          Z.PATTERNS.HANDLING_TOOL
        ), W = B ? B[1] : "Unknown Tool", re = r();
        d.current.set(O, re);
        const Y = {
          id: re,
          role: "tooling",
          content: D,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...T,
            toolName: W,
            callId: O,
            status: Le.PROCESSING
          }
        };
        e((de) => [...de, Y]);
      } else if ((R || I) && H) {
        const B = D.match(
          Z.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), W = B ? B[1] : "Unknown Tool";
        e(
          (re) => re.map(
            (Y) => Y.id === H ? {
              ...Y,
              content: D,
              isStreaming: !1,
              toolData: {
                ...Y.toolData,
                toolName: W,
                status: I ? Le.ERROR : Le.COMPLETED,
                callId: O ?? ""
              }
            } : Y
          )
        ), d.current.delete(O);
      } else H && L && !R && !I && n(H, D, !0);
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
  }, [a, i, y]), _ = te(
    (L) => {
      console.error("Chat error:", L), a(!1), i(!1), y(), t("system", `❌ Chat error: ${L}`);
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
    handleReasoningUpdate: N,
    handleChatFinished: S,
    handleChatError: _,
    stopGeneration: M,
    finalizeCurrentStreamingMessage: y
  };
}
function cs() {
  const e = is(), t = as(), n = os(), r = ss(), i = ls({
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
function Gh({ initialMode: e = "sidebar" }) {
  const t = $();
  return Me(() => {
    e && t.currentMode !== e && t.setCurrentMode(e);
  }, [e]), Me(() => {
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
function us({
  entityId: e,
  entityType: t,
  httpApiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  messages: a,
  setMessages: o,
  setIsLoadingConversation: s,
  setConversationError: l,
  setCurrentThreadId: c,
  setProviderResId: h,
  metadata: p
}) {
  const m = Ke(!1), d = async () => {
    if (!e) {
      console.log("useConversationLoader: No entityId provided, skipping history fetch");
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
        const w = await io(
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
        console.log(`useConversationLoader: Loaded ${w.messages.length} messages`), o(w.messages), w.threadId && (console.log("useConversationLoader: Setting threadId from response:", w.threadId), c(w.threadId)), w.providerResId && (console.log("useConversationLoader: Setting providerResId:", w.providerResId), h(w.providerResId)), m.current = !0;
      } catch (w) {
        console.error("❌ Error loading conversation:", w), l(
          w instanceof Error ? w.message : "Failed to load conversation"
        ), m.current = !0;
      } finally {
        s(!1);
      }
  };
  return Me(() => {
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
    c,
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
class hs {
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
class ds {
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
const ps = {
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
}, ta = {
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
}, fs = {
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
    if (!ta.isValidWebSocketUrl(e))
      throw new Error(`Invalid WebSocket URL: ${e}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (e) => e.trim().length > 0
}, na = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...e) => e.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (e, t, n, r, i) => na.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${e}`,
    t && `chat-wrapper--${t}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    e === "embedded" && i && "chat-wrapper--constrained"
  )
}, ra = {
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
  getUserFriendlyErrorMessage: (e) => ra.isNetworkError(e) ? "Connection error. Please check your internet connection and try again." : e.message.includes("authentication") || e.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : e.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, gt = {
  state: ps,
  url: ta,
  validation: fs,
  css: na,
  error: ra
};
class ei extends mr {
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
        (l, c) => l !== o[c]
      ) && this.resetErrorBoundary();
    }
  }
  render() {
    const { hasError: n, error: r } = this.state, { children: i, fallback: a } = this.props;
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ u("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ u("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ u("p", { className: "chat-wrapper__error-message", children: gt.error.getUserFriendlyErrorMessage(r) }),
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-actions", children: /* @__PURE__ */ u(
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
      })() && /* @__PURE__ */ k("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ u("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ u("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : i;
  }
}
class gs extends mr {
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
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || gt.error.isNetworkError(r)) ? /* @__PURE__ */ u("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ u("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ u("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ k("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ u("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ u("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ k(Ht, { children: [
        this.retryCount < o && /* @__PURE__ */ k(
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
        /* @__PURE__ */ u(
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
      })() && /* @__PURE__ */ k("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ u("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ u("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
}
class ms extends mr {
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
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ u("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ u("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ u("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ k("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ u("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ u("ul", { className: "chat-wrapper__failed-files-list", children: i.map((l, c) => /* @__PURE__ */ u("li", { className: "chat-wrapper__failed-file", children: l }, c)) })
      ] }),
      /* @__PURE__ */ k("div", { className: "chat-wrapper__error-actions", children: [
        o && /* @__PURE__ */ u(
          "button",
          {
            className: "chat-wrapper__error-retry",
            onClick: this.handleRetry,
            type: "button",
            children: "Try Again"
          }
        ),
        /* @__PURE__ */ u(
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
      })() && /* @__PURE__ */ k("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ u("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ u("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
  getFileUploadErrorMessage(n) {
    return n.message.includes("size") || n.message.includes("large") ? "File size is too large. Please try with smaller files." : n.message.includes("type") || n.message.includes("format") ? "File type is not supported. Please try with different file types." : n.message.includes("network") || n.message.includes("connection") ? "Network error during upload. Please check your connection and try again." : n.message.includes("timeout") ? "Upload timed out. Please try again with smaller files or better connection." : "Failed to upload files. Please try again.";
  }
}
const Cs = ({
  className: e,
  onClick: t,
  size: n = 24,
  color: r = "currentColor"
}) => /* @__PURE__ */ k(
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
      /* @__PURE__ */ u(
        "path",
        {
          d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
          fill: r
        }
      ),
      /* @__PURE__ */ u("circle", { cx: "7", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ u("circle", { cx: "12", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ u("circle", { cx: "17", cy: "10", r: "1", fill: r })
    ]
  }
), ys = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ u(
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
    children: /* @__PURE__ */ u(
      "path",
      {
        d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
        fill: r
      }
    )
  }
), ws = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor",
  isFullscreen: i = !1
}) => /* @__PURE__ */ u(
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
      /* @__PURE__ */ u(
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
      /* @__PURE__ */ u(
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
), Ss = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ u(
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
    children: /* @__PURE__ */ u(
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
), ia = ({
  className: e,
  onClick: t,
  size: n = 16,
  color: r = "currentColor"
}) => /* @__PURE__ */ u(
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
    children: /* @__PURE__ */ u(
      "path",
      {
        d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
        fill: r
      }
    )
  }
), Es = ({
  className: e,
  onClick: t,
  size: n = 18,
  color: r = "currentColor"
}) => /* @__PURE__ */ k(
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
      /* @__PURE__ */ u("mask", { id: "mask0_444_23118", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "18", height: "18", children: /* @__PURE__ */ u("rect", { width: "18", height: "18", fill: "#D9D9D9" }) }),
      /* @__PURE__ */ u("g", { mask: "url(#mask0_444_23118)", children: /* @__PURE__ */ u(
        "path",
        {
          d: "M5.8498 13.4998C5.47855 13.4998 5.16074 13.3676 4.89637 13.1032C4.63199 12.8389 4.4998 12.5211 4.4998 12.1498V3.1498C4.4998 2.77855 4.63199 2.46074 4.89637 2.19637C5.16074 1.93199 5.47855 1.7998 5.8498 1.7998H14.8498C15.2211 1.7998 15.5389 1.93199 15.8032 2.19637C16.0676 2.46074 16.1998 2.77855 16.1998 3.1498V12.1498C16.1998 12.5211 16.0676 12.8389 15.8032 13.1032C15.5389 13.3676 15.2211 13.4998 14.8498 13.4998H5.8498ZM5.8498 12.1498H14.8498V3.1498H5.8498V12.1498ZM3.1498 16.1998C2.77855 16.1998 2.46074 16.0676 2.19637 15.8032C1.93199 15.5389 1.7998 15.2211 1.7998 14.8498V4.4998H3.1498V14.8498H13.4998V16.1998H3.1498Z",
          fill: r
        }
      ) })
    ]
  }
), Ts = ({
  mode: e,
  headerName: t,
  bubbleText: n,
  showBubbleText: r = !0,
  onClick: i
}) => {
  const a = e === "modal" ? `Open ${t}` : `Expand ${t}`;
  return /* @__PURE__ */ k(
    "button",
    {
      className: "chat-wrapper__bubble-button",
      onClick: i,
      title: a,
      children: [
        /* @__PURE__ */ u(Cs, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ u("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, _s = ({
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
  const c = () => t === "modal" && r && a ? /* @__PURE__ */ u(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: a,
      title: "Close chat",
      children: /* @__PURE__ */ u(ys, { size: 20 })
    }
  ) : null, h = () => {
    if ((t === "sidebar" || t === "fullscreen") && !n && o) {
      const d = t === "fullscreen";
      return /* @__PURE__ */ u(
        "button",
        {
          className: d ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: o,
          title: d ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ u(ws, { size: 20, isFullscreen: d })
        }
      );
    }
    return null;
  }, p = () => (t === "sidebar" || t === "fullscreen") && !n && s ? /* @__PURE__ */ u(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: s,
      title: "Collapse chat",
      children: /* @__PURE__ */ u(Ss, { size: 20 })
    }
  ) : null;
  return /* @__PURE__ */ k("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ u("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ u("h2", { className: "chat-wrapper__title", children: e }) }),
    /* @__PURE__ */ k("div", { className: "chat-wrapper__header-controls", children: [
      !i || !l ? null : /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__settings-button",
          onClick: l,
          title: "Developer Settings",
          children: /* @__PURE__ */ u(ia, { size: 16 })
        }
      ),
      h(),
      p(),
      c()
    ] })
  ] });
};
function ks(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const xs = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, bs = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, vs = {};
function ti(e, t) {
  return (vs.jsx ? bs : xs).test(e);
}
const Is = /[ \t\n\f\r]/g;
function Rs(e) {
  return typeof e == "object" ? e.type === "text" ? ni(e.value) : !1 : ni(e);
}
function ni(e) {
  return e.replace(Is, "") === "";
}
class sn {
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
sn.prototype.normal = {};
sn.prototype.property = {};
sn.prototype.space = void 0;
function aa(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new sn(n, r, t);
}
function ar(e) {
  return e.toLowerCase();
}
class Ge {
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
Ge.prototype.attribute = "";
Ge.prototype.booleanish = !1;
Ge.prototype.boolean = !1;
Ge.prototype.commaOrSpaceSeparated = !1;
Ge.prototype.commaSeparated = !1;
Ge.prototype.defined = !1;
Ge.prototype.mustUseProperty = !1;
Ge.prototype.number = !1;
Ge.prototype.overloadedBoolean = !1;
Ge.prototype.property = "";
Ge.prototype.spaceSeparated = !1;
Ge.prototype.space = void 0;
let As = 0;
const X = Ft(), Se = Ft(), or = Ft(), b = Ft(), se = Ft(), Wt = Ft(), Ze = Ft();
function Ft() {
  return 2 ** ++As;
}
const sr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: X,
  booleanish: Se,
  commaOrSpaceSeparated: Ze,
  commaSeparated: Wt,
  number: b,
  overloadedBoolean: or,
  spaceSeparated: se
}, Symbol.toStringTag, { value: "Module" })), Vn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(sr)
);
class Cr extends Ge {
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
    if (super(t, n), ri(this, "space", i), typeof r == "number")
      for (; ++a < Vn.length; ) {
        const o = Vn[a];
        ri(this, Vn[a], (r & sr[o]) === sr[o]);
      }
  }
}
Cr.prototype.defined = !0;
function ri(e, t, n) {
  n && (e[t] = n);
}
function Vt(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new Cr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[ar(r)] = r, n[ar(a.attribute)] = r;
  }
  return new sn(t, n, e.space);
}
const oa = Vt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Se,
    ariaAutoComplete: null,
    ariaBusy: Se,
    ariaChecked: Se,
    ariaColCount: b,
    ariaColIndex: b,
    ariaColSpan: b,
    ariaControls: se,
    ariaCurrent: null,
    ariaDescribedBy: se,
    ariaDetails: null,
    ariaDisabled: Se,
    ariaDropEffect: se,
    ariaErrorMessage: null,
    ariaExpanded: Se,
    ariaFlowTo: se,
    ariaGrabbed: Se,
    ariaHasPopup: null,
    ariaHidden: Se,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: se,
    ariaLevel: b,
    ariaLive: null,
    ariaModal: Se,
    ariaMultiLine: Se,
    ariaMultiSelectable: Se,
    ariaOrientation: null,
    ariaOwns: se,
    ariaPlaceholder: null,
    ariaPosInSet: b,
    ariaPressed: Se,
    ariaReadOnly: Se,
    ariaRelevant: null,
    ariaRequired: Se,
    ariaRoleDescription: se,
    ariaRowCount: b,
    ariaRowIndex: b,
    ariaRowSpan: b,
    ariaSelected: Se,
    ariaSetSize: b,
    ariaSort: null,
    ariaValueMax: b,
    ariaValueMin: b,
    ariaValueNow: b,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function sa(e, t) {
  return t in e ? e[t] : t;
}
function la(e, t) {
  return sa(e, t.toLowerCase());
}
const Ns = Vt({
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
    accept: Wt,
    acceptCharset: se,
    accessKey: se,
    action: null,
    allow: null,
    allowFullScreen: X,
    allowPaymentRequest: X,
    allowUserMedia: X,
    alt: null,
    as: null,
    async: X,
    autoCapitalize: null,
    autoComplete: se,
    autoFocus: X,
    autoPlay: X,
    blocking: se,
    capture: null,
    charSet: null,
    checked: X,
    cite: null,
    className: se,
    cols: b,
    colSpan: null,
    content: null,
    contentEditable: Se,
    controls: X,
    controlsList: se,
    coords: b | Wt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: X,
    defer: X,
    dir: null,
    dirName: null,
    disabled: X,
    download: or,
    draggable: Se,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: X,
    formTarget: null,
    headers: se,
    height: b,
    hidden: or,
    high: b,
    href: null,
    hrefLang: null,
    htmlFor: se,
    httpEquiv: se,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: X,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: X,
    itemId: null,
    itemProp: se,
    itemRef: se,
    itemScope: X,
    itemType: se,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: X,
    low: b,
    manifest: null,
    max: null,
    maxLength: b,
    media: null,
    method: null,
    min: null,
    minLength: b,
    multiple: X,
    muted: X,
    name: null,
    nonce: null,
    noModule: X,
    noValidate: X,
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
    open: X,
    optimum: b,
    pattern: null,
    ping: se,
    placeholder: null,
    playsInline: X,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: X,
    referrerPolicy: null,
    rel: se,
    required: X,
    reversed: X,
    rows: b,
    rowSpan: b,
    sandbox: se,
    scope: null,
    scoped: X,
    seamless: X,
    selected: X,
    shadowRootClonable: X,
    shadowRootDelegatesFocus: X,
    shadowRootMode: null,
    shape: null,
    size: b,
    sizes: null,
    slot: null,
    span: b,
    spellCheck: Se,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: b,
    step: null,
    style: null,
    tabIndex: b,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: X,
    useMap: null,
    value: Se,
    width: b,
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
    border: b,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: b,
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
    compact: X,
    // Lists. Use CSS to reduce space between items instead
    declare: X,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: b,
    // `<img>` and `<object>`
    leftMargin: b,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: b,
    // `<body>`
    marginWidth: b,
    // `<body>`
    noResize: X,
    // `<frame>`
    noHref: X,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: X,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: X,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: b,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: Se,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: b,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: b,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: X,
    disableRemotePlayback: X,
    prefix: null,
    property: null,
    results: b,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: la
}), Ms = Vt({
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
    about: Ze,
    accentHeight: b,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: b,
    amplitude: b,
    arabicForm: null,
    ascent: b,
    attributeName: null,
    attributeType: null,
    azimuth: b,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: b,
    by: null,
    calcMode: null,
    capHeight: b,
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
    descent: b,
    diffuseConstant: b,
    direction: null,
    display: null,
    dur: null,
    divisor: b,
    dominantBaseline: null,
    download: X,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: b,
    enableBackground: null,
    end: null,
    event: null,
    exponent: b,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: b,
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
    g1: Wt,
    g2: Wt,
    glyphName: Wt,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: b,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: b,
    horizOriginX: b,
    horizOriginY: b,
    id: null,
    ideographic: b,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: b,
    k: b,
    k1: b,
    k2: b,
    k3: b,
    k4: b,
    kernelMatrix: Ze,
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
    limitingConeAngle: b,
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
    mediaSize: b,
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
    overlinePosition: b,
    overlineThickness: b,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: b,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: se,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: b,
    pointsAtY: b,
    pointsAtZ: b,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Ze,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Ze,
    rev: Ze,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Ze,
    requiredFeatures: Ze,
    requiredFonts: Ze,
    requiredFormats: Ze,
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
    specularConstant: b,
    specularExponent: b,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: b,
    strikethroughThickness: b,
    string: null,
    stroke: null,
    strokeDashArray: Ze,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: b,
    strokeOpacity: b,
    strokeWidth: null,
    style: null,
    surfaceScale: b,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Ze,
    tabIndex: b,
    tableValues: null,
    target: null,
    targetX: b,
    targetY: b,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Ze,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: b,
    underlineThickness: b,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: b,
    values: null,
    vAlphabetic: b,
    vMathematical: b,
    vectorEffect: null,
    vHanging: b,
    vIdeographic: b,
    version: null,
    vertAdvY: b,
    vertOriginX: b,
    vertOriginY: b,
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
    xHeight: b,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: sa
}), ca = Vt({
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
}), ua = Vt({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: la
}), ha = Vt({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), Ls = {
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
}, Os = /[A-Z]/g, ii = /-[a-z]/g, Ds = /^data[-\w.:]+$/i;
function Ps(e, t) {
  const n = ar(t);
  let r = t, i = Ge;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Ds.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(ii, Fs);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!ii.test(a)) {
        let o = a.replace(Os, Hs);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    i = Cr;
  }
  return new i(r, t);
}
function Hs(e) {
  return "-" + e.toLowerCase();
}
function Fs(e) {
  return e.charAt(1).toUpperCase();
}
const Us = aa([oa, Ns, ca, ua, ha], "html"), yr = aa([oa, Ms, ca, ua, ha], "svg");
function zs(e) {
  return e.join(" ").trim();
}
var bn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function da(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var wr = {}, ai = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Bs = /\n/g, Ws = /^\s*/, Gs = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Vs = /^:\s*/, js = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, $s = /^[;\s]*/, Zs = /^\s+|\s+$/g, Ks = `
`, oi = "/", si = "*", Pt = "", qs = "comment", Xs = "declaration", Ys = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(y) {
    var w = y.match(Bs);
    w && (n += w.length);
    var N = y.lastIndexOf(Ks);
    r = ~N ? y.length - N : r + y.length;
  }
  function a() {
    var y = { line: n, column: r };
    return function(w) {
      return w.position = new o(y), c(), w;
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
      var N = w[0];
      return i(N), e = e.slice(N.length), w;
    }
  }
  function c() {
    l(Ws);
  }
  function h(y) {
    var w;
    for (y = y || []; w = p(); )
      w !== !1 && y.push(w);
    return y;
  }
  function p() {
    var y = a();
    if (!(oi != e.charAt(0) || si != e.charAt(1))) {
      for (var w = 2; Pt != e.charAt(w) && (si != e.charAt(w) || oi != e.charAt(w + 1)); )
        ++w;
      if (w += 2, Pt === e.charAt(w - 1))
        return s("End of comment missing");
      var N = e.slice(2, w - 2);
      return r += 2, i(N), e = e.slice(w), r += 2, y({
        type: qs,
        comment: N
      });
    }
  }
  function m() {
    var y = a(), w = l(Gs);
    if (w) {
      if (p(), !l(Vs)) return s("property missing ':'");
      var N = l(js), S = y({
        type: Xs,
        property: li(w[0].replace(ai, Pt)),
        value: N ? li(N[0].replace(ai, Pt)) : Pt
      });
      return l($s), S;
    }
  }
  function d() {
    var y = [];
    h(y);
    for (var w; w = m(); )
      w !== !1 && (y.push(w), h(y));
    return y;
  }
  return c(), d();
};
function li(e) {
  return e ? e.replace(Zs, Pt) : Pt;
}
var Js = bn && bn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.default = el;
var Qs = Js(Ys);
function el(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, Qs.default)(e), i = typeof t == "function";
  return r.forEach(function(a) {
    if (a.type === "declaration") {
      var o = a.property, s = a.value;
      i ? t(o, s, a) : s && (n = n || {}, n[o] = s);
    }
  }), n;
}
var An = {};
Object.defineProperty(An, "__esModule", { value: !0 });
An.camelCase = void 0;
var tl = /^--[a-zA-Z0-9_-]+$/, nl = /-([a-z])/g, rl = /^[^-]+$/, il = /^-(webkit|moz|ms|o|khtml)-/, al = /^-(ms)-/, ol = function(e) {
  return !e || rl.test(e) || tl.test(e);
}, sl = function(e, t) {
  return t.toUpperCase();
}, ci = function(e, t) {
  return "".concat(t, "-");
}, ll = function(e, t) {
  return t === void 0 && (t = {}), ol(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(al, ci) : e = e.replace(il, ci), e.replace(nl, sl));
};
An.camelCase = ll;
var cl = bn && bn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, ul = cl(wr), hl = An;
function lr(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, ul.default)(e, function(r, i) {
    r && i && (n[(0, hl.camelCase)(r, t)] = i);
  }), n;
}
lr.default = lr;
var dl = lr;
const pl = /* @__PURE__ */ da(dl), pa = fa("end"), Sr = fa("start");
function fa(e) {
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
function fl(e) {
  const t = Sr(e), n = pa(e);
  if (t && n)
    return { start: t, end: n };
}
function tn(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? ui(e.position) : "start" in e || "end" in e ? ui(e) : "line" in e || "column" in e ? cr(e) : "";
}
function cr(e) {
  return hi(e && e.line) + ":" + hi(e && e.column);
}
function ui(e) {
  return cr(e && e.start) + "-" + cr(e && e.end);
}
function hi(e) {
  return e && typeof e == "number" ? e : 1;
}
class Oe extends Error {
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
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = s ? s.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = s ? s.line : void 0, this.name = tn(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = o && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Oe.prototype.file = "";
Oe.prototype.name = "";
Oe.prototype.reason = "";
Oe.prototype.message = "";
Oe.prototype.stack = "";
Oe.prototype.column = void 0;
Oe.prototype.line = void 0;
Oe.prototype.ancestors = void 0;
Oe.prototype.cause = void 0;
Oe.prototype.fatal = void 0;
Oe.prototype.place = void 0;
Oe.prototype.ruleId = void 0;
Oe.prototype.source = void 0;
const Er = {}.hasOwnProperty, gl = /* @__PURE__ */ new Map(), ml = /[A-Z]/g, Cl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), yl = /* @__PURE__ */ new Set(["td", "th"]), ga = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function wl(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = vl(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = bl(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? yr : Us,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = ma(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function ma(e, t, n) {
  if (t.type === "element")
    return Sl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return El(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return _l(e, t, n);
  if (t.type === "mdxjsEsm")
    return Tl(e, t);
  if (t.type === "root")
    return kl(e, t, n);
  if (t.type === "text")
    return xl(e, t);
}
function Sl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = yr, e.schema = i), e.ancestors.push(t);
  const a = ya(e, t.tagName, !1), o = Il(e, t);
  let s = _r(e, t);
  return Cl.has(t.tagName) && (s = s.filter(function(l) {
    return typeof l == "string" ? !Rs(l) : !0;
  })), Ca(e, o, a, t), Tr(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function El(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  on(e, t.position);
}
function Tl(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  on(e, t.position);
}
function _l(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = yr, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : ya(e, t.name, !0), o = Rl(e, t), s = _r(e, t);
  return Ca(e, o, a, t), Tr(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function kl(e, t, n) {
  const r = {};
  return Tr(r, _r(e, t)), e.create(t, e.Fragment, r, n);
}
function xl(e, t) {
  return t.value;
}
function Ca(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function Tr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function bl(e, t, n) {
  return r;
  function r(i, a, o, s) {
    const c = Array.isArray(o.children) ? n : t;
    return s ? c(a, o, s) : c(a, o);
  }
}
function vl(e, t) {
  return n;
  function n(r, i, a, o) {
    const s = Array.isArray(a.children), l = Sr(r);
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
function Il(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && Er.call(t.properties, i)) {
      const a = Al(e, i, t.properties[i]);
      if (a) {
        const [o, s] = a;
        e.tableCellAlignToStyle && o === "align" && typeof s == "string" && yl.has(t.tagName) ? r = s : n[o] = s;
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
function Rl(e, t) {
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
        on(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const s = r.value.data.estree.body[0];
          s.type, a = e.evaluater.evaluateExpression(s.expression);
        } else
          on(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function _r(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : gl;
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
    const s = ma(e, a, o);
    s !== void 0 && n.push(s);
  }
  return n;
}
function Al(e, t, n) {
  const r = Ps(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? ks(n) : zs(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Nl(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Ml(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Ls[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Nl(e, t) {
  try {
    return pl(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new Oe("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = ga + "#cannot-parse-style-attribute", i;
  }
}
function ya(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let a = -1, o;
    for (; ++a < i.length; ) {
      const s = ti(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
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
    r = ti(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return Er.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  on(e);
}
function on(e, t) {
  const n = new Oe(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = ga + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Ml(e) {
  const t = {};
  let n;
  for (n in e)
    Er.call(e, n) && (t[Ll(n)] = e[n]);
  return t;
}
function Ll(e) {
  let t = e.replace(ml, Ol);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Ol(e) {
  return "-" + e.toLowerCase();
}
const jn = {
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
}, Dl = {};
function Pl(e, t) {
  const n = Dl, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return wa(e, r, i);
}
function wa(e, t, n) {
  if (Hl(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return di(e.children, t, n);
  }
  return Array.isArray(e) ? di(e, t, n) : "";
}
function di(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = wa(e[i], t, n);
  return r.join("");
}
function Hl(e) {
  return !!(e && typeof e == "object");
}
const pi = document.createElement("i");
function kr(e) {
  const t = "&" + e + ";";
  pi.innerHTML = t;
  const n = pi.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function Ct(e, t, n, r) {
  const i = e.length;
  let a = 0, o;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(t, n), e.splice(...o);
  else
    for (n && e.splice(t, n); a < r.length; )
      o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
function Qe(e, t) {
  return e.length > 0 ? (Ct(e, e.length, 0, t), e) : t;
}
const fi = {}.hasOwnProperty;
function Fl(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    Ul(t, e[n]);
  return t;
}
function Ul(e, t) {
  let n;
  for (n in t) {
    const i = (fi.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let o;
    if (a)
      for (o in a) {
        fi.call(i, o) || (i[o] = []);
        const s = a[o];
        zl(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(s) ? s : s ? [s] : []
        );
      }
  }
}
function zl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  Ct(e, 0, 0, r);
}
function Sa(e, t) {
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
function Gt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const mt = Nt(/[A-Za-z]/), qe = Nt(/[\dA-Za-z]/), Bl = Nt(/[#-'*+\--9=?A-Z^-~]/);
function ur(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const hr = Nt(/\d/), Wl = Nt(/[\dA-Fa-f]/), Gl = Nt(/[!-/:-@[-`{-~]/);
function K(e) {
  return e !== null && e < -2;
}
function We(e) {
  return e !== null && (e < 0 || e === 32);
}
function ie(e) {
  return e === -2 || e === -1 || e === 32;
}
const Vl = Nt(new RegExp("\\p{P}|\\p{S}", "u")), jl = Nt(/\s/);
function Nt(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function jt(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let o = "";
    if (a === 37 && qe(e.charCodeAt(n + 1)) && qe(e.charCodeAt(n + 2)))
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
    return ie(l) ? (e.enter(n), s(l)) : t(l);
  }
  function s(l) {
    return ie(l) && a++ < i ? (e.consume(l), s) : (e.exit(n), t(l));
  }
}
const $l = {
  tokenize: Zl
};
function Zl(e) {
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
    return K(s) ? (e.consume(s), e.exit("chunkText"), a) : (e.consume(s), o);
  }
}
const Kl = {
  tokenize: ql
}, gi = {
  tokenize: Xl
};
function ql(e) {
  const t = this, n = [];
  let r = 0, i, a, o;
  return s;
  function s(M) {
    if (r < n.length) {
      const L = n[r];
      return t.containerState = L[1], e.attempt(L[0].continuation, l, c)(M);
    }
    return c(M);
  }
  function l(M) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && _();
      const L = t.events.length;
      let D = L, T;
      for (; D--; )
        if (t.events[D][0] === "exit" && t.events[D][1].type === "chunkFlow") {
          T = t.events[D][1].end;
          break;
        }
      S(r);
      let O = L;
      for (; O < t.events.length; )
        t.events[O][1].end = {
          ...T
        }, O++;
      return Ct(t.events, D + 1, 0, t.events.slice(L)), t.events.length = O, c(M);
    }
    return s(M);
  }
  function c(M) {
    if (r === n.length) {
      if (!i)
        return m(M);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return y(M);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(gi, h, p)(M);
  }
  function h(M) {
    return i && _(), S(r), m(M);
  }
  function p(M) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, y(M);
  }
  function m(M) {
    return t.containerState = {}, e.attempt(gi, d, y)(M);
  }
  function d(M) {
    return r++, n.push([t.currentConstruct, t.containerState]), m(M);
  }
  function y(M) {
    if (M === null) {
      i && _(), S(0), e.consume(M);
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
      N(e.exit("chunkFlow"), !0), S(0), e.consume(M);
      return;
    }
    return K(M) ? (e.consume(M), N(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, s) : (e.consume(M), w);
  }
  function N(M, L) {
    const D = t.sliceStream(M);
    if (L && D.push(null), M.previous = a, a && (a.next = M), a = M, i.defineSkip(M.start), i.write(D), t.parser.lazy[M.start.line]) {
      let T = i.events.length;
      for (; T--; )
        if (
          // The token starts before the line ending…
          i.events[T][1].start.offset < o && // …and either is not ended yet…
          (!i.events[T][1].end || // …or ends after it.
          i.events[T][1].end.offset > o)
        )
          return;
      const O = t.events.length;
      let P = O, U, F;
      for (; P--; )
        if (t.events[P][0] === "exit" && t.events[P][1].type === "chunkFlow") {
          if (U) {
            F = t.events[P][1].end;
            break;
          }
          U = !0;
        }
      for (S(r), T = O; T < t.events.length; )
        t.events[T][1].end = {
          ...F
        }, T++;
      Ct(t.events, P + 1, 0, t.events.slice(O)), t.events.length = T;
    }
  }
  function S(M) {
    let L = n.length;
    for (; L-- > M; ) {
      const D = n[L];
      t.containerState = D[1], D[0].exit.call(t, e);
    }
    n.length = M;
  }
  function _() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Xl(e, t, n) {
  return le(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function mi(e) {
  if (e === null || We(e) || jl(e))
    return 1;
  if (Vl(e))
    return 2;
}
function xr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const dr = {
  name: "attention",
  resolveAll: Yl,
  tokenize: Jl
};
function Yl(e, t) {
  let n = -1, r, i, a, o, s, l, c, h;
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
          Ci(p, -l), Ci(m, l), o = {
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
          }, c = [], e[r][1].end.offset - e[r][1].start.offset && (c = Qe(c, [["enter", e[r][1], t], ["exit", e[r][1], t]])), c = Qe(c, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["enter", a, t]]), c = Qe(c, xr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), c = Qe(c, [["exit", a, t], ["enter", s, t], ["exit", s, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (h = 2, c = Qe(c, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : h = 0, Ct(e, r - 1, n - r + 3, c), n = r + c.length - h - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Jl(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = mi(r);
  let a;
  return o;
  function o(l) {
    return a = l, e.enter("attentionSequence"), s(l);
  }
  function s(l) {
    if (l === a)
      return e.consume(l), s;
    const c = e.exit("attentionSequence"), h = mi(l), p = !h || h === 2 && i || n.includes(l), m = !i || i === 2 && h || n.includes(r);
    return c._open = !!(a === 42 ? p : p && (i || !m)), c._close = !!(a === 42 ? m : m && (h || !p)), t(l);
  }
}
function Ci(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const Ql = {
  name: "autolink",
  tokenize: ec
};
function ec(e, t, n) {
  let r = 0;
  return i;
  function i(d) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(d) {
    return mt(d) ? (e.consume(d), o) : d === 64 ? n(d) : c(d);
  }
  function o(d) {
    return d === 43 || d === 45 || d === 46 || qe(d) ? (r = 1, s(d)) : c(d);
  }
  function s(d) {
    return d === 58 ? (e.consume(d), r = 0, l) : (d === 43 || d === 45 || d === 46 || qe(d)) && r++ < 32 ? (e.consume(d), s) : (r = 0, c(d));
  }
  function l(d) {
    return d === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.exit("autolink"), t) : d === null || d === 32 || d === 60 || ur(d) ? n(d) : (e.consume(d), l);
  }
  function c(d) {
    return d === 64 ? (e.consume(d), h) : Bl(d) ? (e.consume(d), c) : n(d);
  }
  function h(d) {
    return qe(d) ? p(d) : n(d);
  }
  function p(d) {
    return d === 46 ? (e.consume(d), r = 0, h) : d === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.exit("autolink"), t) : m(d);
  }
  function m(d) {
    if ((d === 45 || qe(d)) && r++ < 63) {
      const y = d === 45 ? m : p;
      return e.consume(d), y;
    }
    return n(d);
  }
}
const Nn = {
  partial: !0,
  tokenize: tc
};
function tc(e, t, n) {
  return r;
  function r(a) {
    return ie(a) ? le(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || K(a) ? t(a) : n(a);
  }
}
const Ea = {
  continuation: {
    tokenize: rc
  },
  exit: ic,
  name: "blockQuote",
  tokenize: nc
};
function nc(e, t, n) {
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
    return ie(o) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(o), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(o));
  }
}
function rc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return ie(o) ? le(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : a(o);
  }
  function a(o) {
    return e.attempt(Ea, t, n)(o);
  }
}
function ic(e) {
  e.exit("blockQuote");
}
const Ta = {
  name: "characterEscape",
  tokenize: ac
};
function ac(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return Gl(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const _a = {
  name: "characterReference",
  tokenize: oc
};
function oc(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return s;
  function s(p) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), l;
  }
  function l(p) {
    return p === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(p), e.exit("characterReferenceMarkerNumeric"), c) : (e.enter("characterReferenceValue"), a = 31, o = qe, h(p));
  }
  function c(p) {
    return p === 88 || p === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(p), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, o = Wl, h) : (e.enter("characterReferenceValue"), a = 7, o = hr, h(p));
  }
  function h(p) {
    if (p === 59 && i) {
      const m = e.exit("characterReferenceValue");
      return o === qe && !kr(r.sliceSerialize(m)) ? n(p) : (e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return o(p) && i++ < a ? (e.consume(p), h) : n(p);
  }
}
const yi = {
  partial: !0,
  tokenize: lc
}, wi = {
  concrete: !0,
  name: "codeFenced",
  tokenize: sc
};
function sc(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: D
  };
  let a = 0, o = 0, s;
  return l;
  function l(T) {
    return c(T);
  }
  function c(T) {
    const O = r.events[r.events.length - 1];
    return a = O && O[1].type === "linePrefix" ? O[2].sliceSerialize(O[1], !0).length : 0, s = T, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), h(T);
  }
  function h(T) {
    return T === s ? (o++, e.consume(T), h) : o < 3 ? n(T) : (e.exit("codeFencedFenceSequence"), ie(T) ? le(e, p, "whitespace")(T) : p(T));
  }
  function p(T) {
    return T === null || K(T) ? (e.exit("codeFencedFence"), r.interrupt ? t(T) : e.check(yi, w, L)(T)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), m(T));
  }
  function m(T) {
    return T === null || K(T) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), p(T)) : ie(T) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), le(e, d, "whitespace")(T)) : T === 96 && T === s ? n(T) : (e.consume(T), m);
  }
  function d(T) {
    return T === null || K(T) ? p(T) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), y(T));
  }
  function y(T) {
    return T === null || K(T) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), p(T)) : T === 96 && T === s ? n(T) : (e.consume(T), y);
  }
  function w(T) {
    return e.attempt(i, L, N)(T);
  }
  function N(T) {
    return e.enter("lineEnding"), e.consume(T), e.exit("lineEnding"), S;
  }
  function S(T) {
    return a > 0 && ie(T) ? le(e, _, "linePrefix", a + 1)(T) : _(T);
  }
  function _(T) {
    return T === null || K(T) ? e.check(yi, w, L)(T) : (e.enter("codeFlowValue"), M(T));
  }
  function M(T) {
    return T === null || K(T) ? (e.exit("codeFlowValue"), _(T)) : (e.consume(T), M);
  }
  function L(T) {
    return e.exit("codeFenced"), t(T);
  }
  function D(T, O, P) {
    let U = 0;
    return F;
    function F(W) {
      return T.enter("lineEnding"), T.consume(W), T.exit("lineEnding"), R;
    }
    function R(W) {
      return T.enter("codeFencedFence"), ie(W) ? le(T, I, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(W) : I(W);
    }
    function I(W) {
      return W === s ? (T.enter("codeFencedFenceSequence"), H(W)) : P(W);
    }
    function H(W) {
      return W === s ? (U++, T.consume(W), H) : U >= o ? (T.exit("codeFencedFenceSequence"), ie(W) ? le(T, B, "whitespace")(W) : B(W)) : P(W);
    }
    function B(W) {
      return W === null || K(W) ? (T.exit("codeFencedFence"), O(W)) : P(W);
    }
  }
}
function lc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? n(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), a);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
const $n = {
  name: "codeIndented",
  tokenize: uc
}, cc = {
  partial: !0,
  tokenize: hc
};
function uc(e, t, n) {
  const r = this;
  return i;
  function i(c) {
    return e.enter("codeIndented"), le(e, a, "linePrefix", 5)(c);
  }
  function a(c) {
    const h = r.events[r.events.length - 1];
    return h && h[1].type === "linePrefix" && h[2].sliceSerialize(h[1], !0).length >= 4 ? o(c) : n(c);
  }
  function o(c) {
    return c === null ? l(c) : K(c) ? e.attempt(cc, o, l)(c) : (e.enter("codeFlowValue"), s(c));
  }
  function s(c) {
    return c === null || K(c) ? (e.exit("codeFlowValue"), o(c)) : (e.consume(c), s);
  }
  function l(c) {
    return e.exit("codeIndented"), t(c);
  }
}
function hc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : K(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : le(e, a, "linePrefix", 5)(o);
  }
  function a(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? t(o) : K(o) ? i(o) : n(o);
  }
}
const dc = {
  name: "codeText",
  previous: fc,
  resolve: pc,
  tokenize: gc
};
function pc(e) {
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
function fc(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function gc(e, t, n) {
  let r = 0, i, a;
  return o;
  function o(p) {
    return e.enter("codeText"), e.enter("codeTextSequence"), s(p);
  }
  function s(p) {
    return p === 96 ? (e.consume(p), r++, s) : (e.exit("codeTextSequence"), l(p));
  }
  function l(p) {
    return p === null ? n(p) : p === 32 ? (e.enter("space"), e.consume(p), e.exit("space"), l) : p === 96 ? (a = e.enter("codeTextSequence"), i = 0, h(p)) : K(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), l) : (e.enter("codeTextData"), c(p));
  }
  function c(p) {
    return p === null || p === 32 || p === 96 || K(p) ? (e.exit("codeTextData"), l(p)) : (e.consume(p), c);
  }
  function h(p) {
    return p === 96 ? (e.consume(p), i++, h) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(p)) : (a.type = "codeTextData", c(p));
  }
}
class mc {
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
    return r && Qt(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Qt(this.left, t);
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
    this.setCursor(0), Qt(this.right, t.reverse());
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
        Qt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Qt(this.left, n.reverse());
      }
  }
}
function Qt(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function ka(e) {
  const t = {};
  let n = -1, r, i, a, o, s, l, c;
  const h = new mc(e);
  for (; ++n < h.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = h.get(n), n && r[1].type === "chunkFlow" && h.get(n - 1)[1].type === "listItemPrefix" && (l = r[1]._tokenizer.events, a = 0, a < l.length && l[a][1].type === "lineEndingBlank" && (a += 2), a < l.length && l[a][1].type === "content"))
      for (; ++a < l.length && l[a][1].type !== "content"; )
        l[a][1].type === "chunkText" && (l[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, Cc(h, n)), n = t[n], c = !0);
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
  return Ct(e, 0, Number.POSITIVE_INFINITY, h.slice(0)), !c;
}
function Cc(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const s = o.events, l = [], c = {};
  let h, p, m = -1, d = n, y = 0, w = 0;
  const N = [w];
  for (; d; ) {
    for (; e.get(++i)[1] !== d; )
      ;
    a.push(i), d._tokenizer || (h = r.sliceStream(d), d.next || h.push(null), p && o.defineSkip(d.start), d._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(h), d._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), p = d, d = d.next;
  }
  for (d = n; ++m < s.length; )
    // Find a void token that includes a break.
    s[m][0] === "exit" && s[m - 1][0] === "enter" && s[m][1].type === s[m - 1][1].type && s[m][1].start.line !== s[m][1].end.line && (w = m + 1, N.push(w), d._tokenizer = void 0, d.previous = void 0, d = d.next);
  for (o.events = [], d ? (d._tokenizer = void 0, d.previous = void 0) : N.pop(), m = N.length; m--; ) {
    const S = s.slice(N[m], N[m + 1]), _ = a.pop();
    l.push([_, _ + S.length - 1]), e.splice(_, 2, S);
  }
  for (l.reverse(), m = -1; ++m < l.length; )
    c[y + l[m][0]] = y + l[m][1], y += l[m][1] - l[m][0] - 1;
  return c;
}
const yc = {
  resolve: Sc,
  tokenize: Ec
}, wc = {
  partial: !0,
  tokenize: Tc
};
function Sc(e) {
  return ka(e), e;
}
function Ec(e, t) {
  let n;
  return r;
  function r(s) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(s);
  }
  function i(s) {
    return s === null ? a(s) : K(s) ? e.check(wc, o, a)(s) : (e.consume(s), i);
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
function Tc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), le(e, a, "linePrefix");
  }
  function a(o) {
    if (o === null || K(o))
      return n(o);
    const s = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function xa(e, t, n, r, i, a, o, s, l) {
  const c = l || Number.POSITIVE_INFINITY;
  let h = 0;
  return p;
  function p(S) {
    return S === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(S), e.exit(a), m) : S === null || S === 32 || S === 41 || ur(S) ? n(S) : (e.enter(r), e.enter(o), e.enter(s), e.enter("chunkString", {
      contentType: "string"
    }), w(S));
  }
  function m(S) {
    return S === 62 ? (e.enter(a), e.consume(S), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter("chunkString", {
      contentType: "string"
    }), d(S));
  }
  function d(S) {
    return S === 62 ? (e.exit("chunkString"), e.exit(s), m(S)) : S === null || S === 60 || K(S) ? n(S) : (e.consume(S), S === 92 ? y : d);
  }
  function y(S) {
    return S === 60 || S === 62 || S === 92 ? (e.consume(S), d) : d(S);
  }
  function w(S) {
    return !h && (S === null || S === 41 || We(S)) ? (e.exit("chunkString"), e.exit(s), e.exit(o), e.exit(r), t(S)) : h < c && S === 40 ? (e.consume(S), h++, w) : S === 41 ? (e.consume(S), h--, w) : S === null || S === 32 || S === 40 || ur(S) ? n(S) : (e.consume(S), S === 92 ? N : w);
  }
  function N(S) {
    return S === 40 || S === 41 || S === 92 ? (e.consume(S), w) : w(S);
  }
}
function ba(e, t, n, r, i, a) {
  const o = this;
  let s = 0, l;
  return c;
  function c(d) {
    return e.enter(r), e.enter(i), e.consume(d), e.exit(i), e.enter(a), h;
  }
  function h(d) {
    return s > 999 || d === null || d === 91 || d === 93 && !l || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    d === 94 && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(d) : d === 93 ? (e.exit(a), e.enter(i), e.consume(d), e.exit(i), e.exit(r), t) : K(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), h) : (e.enter("chunkString", {
      contentType: "string"
    }), p(d));
  }
  function p(d) {
    return d === null || d === 91 || d === 93 || K(d) || s++ > 999 ? (e.exit("chunkString"), h(d)) : (e.consume(d), l || (l = !ie(d)), d === 92 ? m : p);
  }
  function m(d) {
    return d === 91 || d === 92 || d === 93 ? (e.consume(d), s++, p) : p(d);
  }
}
function va(e, t, n, r, i, a) {
  let o;
  return s;
  function s(m) {
    return m === 34 || m === 39 || m === 40 ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), o = m === 40 ? 41 : m, l) : n(m);
  }
  function l(m) {
    return m === o ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), t) : (e.enter(a), c(m));
  }
  function c(m) {
    return m === o ? (e.exit(a), l(o)) : m === null ? n(m) : K(m) ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), le(e, c, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), h(m));
  }
  function h(m) {
    return m === o || m === null || K(m) ? (e.exit("chunkString"), c(m)) : (e.consume(m), m === 92 ? p : h);
  }
  function p(m) {
    return m === o || m === 92 ? (e.consume(m), h) : h(m);
  }
}
function nn(e, t) {
  let n;
  return r;
  function r(i) {
    return K(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : ie(i) ? le(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const _c = {
  name: "definition",
  tokenize: xc
}, kc = {
  partial: !0,
  tokenize: bc
};
function xc(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(d) {
    return e.enter("definition"), o(d);
  }
  function o(d) {
    return ba.call(
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
    return i = Gt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), d === 58 ? (e.enter("definitionMarker"), e.consume(d), e.exit("definitionMarker"), l) : n(d);
  }
  function l(d) {
    return We(d) ? nn(e, c)(d) : c(d);
  }
  function c(d) {
    return xa(
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
    return e.attempt(kc, p, p)(d);
  }
  function p(d) {
    return ie(d) ? le(e, m, "whitespace")(d) : m(d);
  }
  function m(d) {
    return d === null || K(d) ? (e.exit("definition"), r.parser.defined.push(i), t(d)) : n(d);
  }
}
function bc(e, t, n) {
  return r;
  function r(s) {
    return We(s) ? nn(e, i)(s) : n(s);
  }
  function i(s) {
    return va(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(s);
  }
  function a(s) {
    return ie(s) ? le(e, o, "whitespace")(s) : o(s);
  }
  function o(s) {
    return s === null || K(s) ? t(s) : n(s);
  }
}
const vc = {
  name: "hardBreakEscape",
  tokenize: Ic
};
function Ic(e, t, n) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), i;
  }
  function i(a) {
    return K(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
  }
}
const Rc = {
  name: "headingAtx",
  resolve: Ac,
  tokenize: Nc
};
function Ac(e, t) {
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
  }, Ct(e, r, n - r + 1, [["enter", i, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]])), e;
}
function Nc(e, t, n) {
  let r = 0;
  return i;
  function i(h) {
    return e.enter("atxHeading"), a(h);
  }
  function a(h) {
    return e.enter("atxHeadingSequence"), o(h);
  }
  function o(h) {
    return h === 35 && r++ < 6 ? (e.consume(h), o) : h === null || We(h) ? (e.exit("atxHeadingSequence"), s(h)) : n(h);
  }
  function s(h) {
    return h === 35 ? (e.enter("atxHeadingSequence"), l(h)) : h === null || K(h) ? (e.exit("atxHeading"), t(h)) : ie(h) ? le(e, s, "whitespace")(h) : (e.enter("atxHeadingText"), c(h));
  }
  function l(h) {
    return h === 35 ? (e.consume(h), l) : (e.exit("atxHeadingSequence"), s(h));
  }
  function c(h) {
    return h === null || h === 35 || We(h) ? (e.exit("atxHeadingText"), s(h)) : (e.consume(h), c);
  }
}
const Mc = [
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
], Si = ["pre", "script", "style", "textarea"], Lc = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Pc,
  tokenize: Hc
}, Oc = {
  partial: !0,
  tokenize: Uc
}, Dc = {
  partial: !0,
  tokenize: Fc
};
function Pc(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Hc(e, t, n) {
  const r = this;
  let i, a, o, s, l;
  return c;
  function c(g) {
    return h(g);
  }
  function h(g) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(g), p;
  }
  function p(g) {
    return g === 33 ? (e.consume(g), m) : g === 47 ? (e.consume(g), a = !0, w) : g === 63 ? (e.consume(g), i = 3, r.interrupt ? t : f) : mt(g) ? (e.consume(g), o = String.fromCharCode(g), N) : n(g);
  }
  function m(g) {
    return g === 45 ? (e.consume(g), i = 2, d) : g === 91 ? (e.consume(g), i = 5, s = 0, y) : mt(g) ? (e.consume(g), i = 4, r.interrupt ? t : f) : n(g);
  }
  function d(g) {
    return g === 45 ? (e.consume(g), r.interrupt ? t : f) : n(g);
  }
  function y(g) {
    const _e = "CDATA[";
    return g === _e.charCodeAt(s++) ? (e.consume(g), s === _e.length ? r.interrupt ? t : I : y) : n(g);
  }
  function w(g) {
    return mt(g) ? (e.consume(g), o = String.fromCharCode(g), N) : n(g);
  }
  function N(g) {
    if (g === null || g === 47 || g === 62 || We(g)) {
      const _e = g === 47, ne = o.toLowerCase();
      return !_e && !a && Si.includes(ne) ? (i = 1, r.interrupt ? t(g) : I(g)) : Mc.includes(o.toLowerCase()) ? (i = 6, _e ? (e.consume(g), S) : r.interrupt ? t(g) : I(g)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(g) : a ? _(g) : M(g));
    }
    return g === 45 || qe(g) ? (e.consume(g), o += String.fromCharCode(g), N) : n(g);
  }
  function S(g) {
    return g === 62 ? (e.consume(g), r.interrupt ? t : I) : n(g);
  }
  function _(g) {
    return ie(g) ? (e.consume(g), _) : F(g);
  }
  function M(g) {
    return g === 47 ? (e.consume(g), F) : g === 58 || g === 95 || mt(g) ? (e.consume(g), L) : ie(g) ? (e.consume(g), M) : F(g);
  }
  function L(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || qe(g) ? (e.consume(g), L) : D(g);
  }
  function D(g) {
    return g === 61 ? (e.consume(g), T) : ie(g) ? (e.consume(g), D) : M(g);
  }
  function T(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), l = g, O) : ie(g) ? (e.consume(g), T) : P(g);
  }
  function O(g) {
    return g === l ? (e.consume(g), l = null, U) : g === null || K(g) ? n(g) : (e.consume(g), O);
  }
  function P(g) {
    return g === null || g === 34 || g === 39 || g === 47 || g === 60 || g === 61 || g === 62 || g === 96 || We(g) ? D(g) : (e.consume(g), P);
  }
  function U(g) {
    return g === 47 || g === 62 || ie(g) ? M(g) : n(g);
  }
  function F(g) {
    return g === 62 ? (e.consume(g), R) : n(g);
  }
  function R(g) {
    return g === null || K(g) ? I(g) : ie(g) ? (e.consume(g), R) : n(g);
  }
  function I(g) {
    return g === 45 && i === 2 ? (e.consume(g), re) : g === 60 && i === 1 ? (e.consume(g), Y) : g === 62 && i === 4 ? (e.consume(g), J) : g === 63 && i === 3 ? (e.consume(g), f) : g === 93 && i === 5 ? (e.consume(g), Ie) : K(g) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Oc, Te, H)(g)) : g === null || K(g) ? (e.exit("htmlFlowData"), H(g)) : (e.consume(g), I);
  }
  function H(g) {
    return e.check(Dc, B, Te)(g);
  }
  function B(g) {
    return e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), W;
  }
  function W(g) {
    return g === null || K(g) ? H(g) : (e.enter("htmlFlowData"), I(g));
  }
  function re(g) {
    return g === 45 ? (e.consume(g), f) : I(g);
  }
  function Y(g) {
    return g === 47 ? (e.consume(g), o = "", de) : I(g);
  }
  function de(g) {
    if (g === 62) {
      const _e = o.toLowerCase();
      return Si.includes(_e) ? (e.consume(g), J) : I(g);
    }
    return mt(g) && o.length < 8 ? (e.consume(g), o += String.fromCharCode(g), de) : I(g);
  }
  function Ie(g) {
    return g === 93 ? (e.consume(g), f) : I(g);
  }
  function f(g) {
    return g === 62 ? (e.consume(g), J) : g === 45 && i === 2 ? (e.consume(g), f) : I(g);
  }
  function J(g) {
    return g === null || K(g) ? (e.exit("htmlFlowData"), Te(g)) : (e.consume(g), J);
  }
  function Te(g) {
    return e.exit("htmlFlow"), t(g);
  }
}
function Fc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return K(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), a) : n(o);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function Uc(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(Nn, t, n);
  }
}
const zc = {
  name: "htmlText",
  tokenize: Bc
};
function Bc(e, t, n) {
  const r = this;
  let i, a, o;
  return s;
  function s(f) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(f), l;
  }
  function l(f) {
    return f === 33 ? (e.consume(f), c) : f === 47 ? (e.consume(f), D) : f === 63 ? (e.consume(f), M) : mt(f) ? (e.consume(f), P) : n(f);
  }
  function c(f) {
    return f === 45 ? (e.consume(f), h) : f === 91 ? (e.consume(f), a = 0, y) : mt(f) ? (e.consume(f), _) : n(f);
  }
  function h(f) {
    return f === 45 ? (e.consume(f), d) : n(f);
  }
  function p(f) {
    return f === null ? n(f) : f === 45 ? (e.consume(f), m) : K(f) ? (o = p, Y(f)) : (e.consume(f), p);
  }
  function m(f) {
    return f === 45 ? (e.consume(f), d) : p(f);
  }
  function d(f) {
    return f === 62 ? re(f) : f === 45 ? m(f) : p(f);
  }
  function y(f) {
    const J = "CDATA[";
    return f === J.charCodeAt(a++) ? (e.consume(f), a === J.length ? w : y) : n(f);
  }
  function w(f) {
    return f === null ? n(f) : f === 93 ? (e.consume(f), N) : K(f) ? (o = w, Y(f)) : (e.consume(f), w);
  }
  function N(f) {
    return f === 93 ? (e.consume(f), S) : w(f);
  }
  function S(f) {
    return f === 62 ? re(f) : f === 93 ? (e.consume(f), S) : w(f);
  }
  function _(f) {
    return f === null || f === 62 ? re(f) : K(f) ? (o = _, Y(f)) : (e.consume(f), _);
  }
  function M(f) {
    return f === null ? n(f) : f === 63 ? (e.consume(f), L) : K(f) ? (o = M, Y(f)) : (e.consume(f), M);
  }
  function L(f) {
    return f === 62 ? re(f) : M(f);
  }
  function D(f) {
    return mt(f) ? (e.consume(f), T) : n(f);
  }
  function T(f) {
    return f === 45 || qe(f) ? (e.consume(f), T) : O(f);
  }
  function O(f) {
    return K(f) ? (o = O, Y(f)) : ie(f) ? (e.consume(f), O) : re(f);
  }
  function P(f) {
    return f === 45 || qe(f) ? (e.consume(f), P) : f === 47 || f === 62 || We(f) ? U(f) : n(f);
  }
  function U(f) {
    return f === 47 ? (e.consume(f), re) : f === 58 || f === 95 || mt(f) ? (e.consume(f), F) : K(f) ? (o = U, Y(f)) : ie(f) ? (e.consume(f), U) : re(f);
  }
  function F(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || qe(f) ? (e.consume(f), F) : R(f);
  }
  function R(f) {
    return f === 61 ? (e.consume(f), I) : K(f) ? (o = R, Y(f)) : ie(f) ? (e.consume(f), R) : U(f);
  }
  function I(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), i = f, H) : K(f) ? (o = I, Y(f)) : ie(f) ? (e.consume(f), I) : (e.consume(f), B);
  }
  function H(f) {
    return f === i ? (e.consume(f), i = void 0, W) : f === null ? n(f) : K(f) ? (o = H, Y(f)) : (e.consume(f), H);
  }
  function B(f) {
    return f === null || f === 34 || f === 39 || f === 60 || f === 61 || f === 96 ? n(f) : f === 47 || f === 62 || We(f) ? U(f) : (e.consume(f), B);
  }
  function W(f) {
    return f === 47 || f === 62 || We(f) ? U(f) : n(f);
  }
  function re(f) {
    return f === 62 ? (e.consume(f), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(f);
  }
  function Y(f) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), de;
  }
  function de(f) {
    return ie(f) ? le(e, Ie, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : Ie(f);
  }
  function Ie(f) {
    return e.enter("htmlTextData"), o(f);
  }
}
const br = {
  name: "labelEnd",
  resolveAll: jc,
  resolveTo: $c,
  tokenize: Zc
}, Wc = {
  tokenize: Kc
}, Gc = {
  tokenize: qc
}, Vc = {
  tokenize: Xc
};
function jc(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e.length !== n.length && Ct(e, 0, e.length, n), e;
}
function $c(e, t) {
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
  }, h = {
    type: "labelText",
    start: {
      ...e[a + r + 2][1].end
    },
    end: {
      ...e[o - 2][1].start
    }
  };
  return s = [["enter", l, t], ["enter", c, t]], s = Qe(s, e.slice(a + 1, a + r + 3)), s = Qe(s, [["enter", h, t]]), s = Qe(s, xr(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t)), s = Qe(s, [["exit", h, t], e[o - 2], e[o - 1], ["exit", c, t]]), s = Qe(s, e.slice(o + 1)), s = Qe(s, [["exit", l, t]]), Ct(e, a, e.length, s), e;
}
function Zc(e, t, n) {
  const r = this;
  let i = r.events.length, a, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return s;
  function s(m) {
    return a ? a._inactive ? p(m) : (o = r.parser.defined.includes(Gt(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(m), e.exit("labelMarker"), e.exit("labelEnd"), l) : n(m);
  }
  function l(m) {
    return m === 40 ? e.attempt(Wc, h, o ? h : p)(m) : m === 91 ? e.attempt(Gc, h, o ? c : p)(m) : o ? h(m) : p(m);
  }
  function c(m) {
    return e.attempt(Vc, h, p)(m);
  }
  function h(m) {
    return t(m);
  }
  function p(m) {
    return a._balanced = !0, n(m);
  }
}
function Kc(e, t, n) {
  return r;
  function r(p) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), i;
  }
  function i(p) {
    return We(p) ? nn(e, a)(p) : a(p);
  }
  function a(p) {
    return p === 41 ? h(p) : xa(e, o, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(p);
  }
  function o(p) {
    return We(p) ? nn(e, l)(p) : h(p);
  }
  function s(p) {
    return n(p);
  }
  function l(p) {
    return p === 34 || p === 39 || p === 40 ? va(e, c, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(p) : h(p);
  }
  function c(p) {
    return We(p) ? nn(e, h)(p) : h(p);
  }
  function h(p) {
    return p === 41 ? (e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), e.exit("resource"), t) : n(p);
  }
}
function qc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return ba.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(s);
  }
  function a(s) {
    return r.parser.defined.includes(Gt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(s) : n(s);
  }
  function o(s) {
    return n(s);
  }
}
function Xc(e, t, n) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), i;
  }
  function i(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), t) : n(a);
  }
}
const Yc = {
  name: "labelStartImage",
  resolveAll: br.resolveAll,
  tokenize: Jc
};
function Jc(e, t, n) {
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
const Qc = {
  name: "labelStartLink",
  resolveAll: br.resolveAll,
  tokenize: eu
};
function eu(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), a;
  }
  function a(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const Zn = {
  name: "lineEnding",
  tokenize: tu
};
function tu(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), le(e, t, "linePrefix");
  }
}
const En = {
  name: "thematicBreak",
  tokenize: nu
};
function nu(e, t, n) {
  let r = 0, i;
  return a;
  function a(c) {
    return e.enter("thematicBreak"), o(c);
  }
  function o(c) {
    return i = c, s(c);
  }
  function s(c) {
    return c === i ? (e.enter("thematicBreakSequence"), l(c)) : r >= 3 && (c === null || K(c)) ? (e.exit("thematicBreak"), t(c)) : n(c);
  }
  function l(c) {
    return c === i ? (e.consume(c), r++, l) : (e.exit("thematicBreakSequence"), ie(c) ? le(e, s, "whitespace")(c) : s(c));
  }
}
const Be = {
  continuation: {
    tokenize: ou
  },
  exit: lu,
  name: "list",
  tokenize: au
}, ru = {
  partial: !0,
  tokenize: cu
}, iu = {
  partial: !0,
  tokenize: su
};
function au(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return s;
  function s(d) {
    const y = r.containerState.type || (d === 42 || d === 43 || d === 45 ? "listUnordered" : "listOrdered");
    if (y === "listUnordered" ? !r.containerState.marker || d === r.containerState.marker : hr(d)) {
      if (r.containerState.type || (r.containerState.type = y, e.enter(y, {
        _container: !0
      })), y === "listUnordered")
        return e.enter("listItemPrefix"), d === 42 || d === 45 ? e.check(En, n, c)(d) : c(d);
      if (!r.interrupt || d === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), l(d);
    }
    return n(d);
  }
  function l(d) {
    return hr(d) && ++o < 10 ? (e.consume(d), l) : (!r.interrupt || o < 2) && (r.containerState.marker ? d === r.containerState.marker : d === 41 || d === 46) ? (e.exit("listItemValue"), c(d)) : n(d);
  }
  function c(d) {
    return e.enter("listItemMarker"), e.consume(d), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || d, e.check(
      Nn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : h,
      e.attempt(ru, m, p)
    );
  }
  function h(d) {
    return r.containerState.initialBlankLine = !0, a++, m(d);
  }
  function p(d) {
    return ie(d) ? (e.enter("listItemPrefixWhitespace"), e.consume(d), e.exit("listItemPrefixWhitespace"), m) : n(d);
  }
  function m(d) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(d);
  }
}
function ou(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Nn, i, a);
  function i(s) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, le(e, t, "listItemIndent", r.containerState.size + 1)(s);
  }
  function a(s) {
    return r.containerState.furtherBlankLines || !ie(s) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(s)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(iu, t, o)(s));
  }
  function o(s) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, le(e, e.attempt(Be, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s);
  }
}
function su(e, t, n) {
  const r = this;
  return le(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function lu(e) {
  e.exit(this.containerState.type);
}
function cu(e, t, n) {
  const r = this;
  return le(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const o = r.events[r.events.length - 1];
    return !ie(a) && o && o[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const Ei = {
  name: "setextUnderline",
  resolveTo: uu,
  tokenize: hu
};
function uu(e, t) {
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
function hu(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(c) {
    let h = r.events.length, p;
    for (; h--; )
      if (r.events[h][1].type !== "lineEnding" && r.events[h][1].type !== "linePrefix" && r.events[h][1].type !== "content") {
        p = r.events[h][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || p) ? (e.enter("setextHeadingLine"), i = c, o(c)) : n(c);
  }
  function o(c) {
    return e.enter("setextHeadingLineSequence"), s(c);
  }
  function s(c) {
    return c === i ? (e.consume(c), s) : (e.exit("setextHeadingLineSequence"), ie(c) ? le(e, l, "lineSuffix")(c) : l(c));
  }
  function l(c) {
    return c === null || K(c) ? (e.exit("setextHeadingLine"), t(c)) : n(c);
  }
}
const du = {
  tokenize: pu
};
function pu(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    Nn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, le(e, e.attempt(this.parser.constructs.flow, i, e.attempt(yc, i)), "linePrefix"))
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
const fu = {
  resolveAll: Ra()
}, gu = Ia("string"), mu = Ia("text");
function Ia(e) {
  return {
    resolveAll: Ra(e === "text" ? Cu : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], a = n.attempt(i, o, s);
    return o;
    function o(h) {
      return c(h) ? a(h) : s(h);
    }
    function s(h) {
      if (h === null) {
        n.consume(h);
        return;
      }
      return n.enter("data"), n.consume(h), l;
    }
    function l(h) {
      return c(h) ? (n.exit("data"), a(h)) : (n.consume(h), l);
    }
    function c(h) {
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
function Ra(e) {
  return t;
  function t(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === "data" && (a = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function Cu(e, t) {
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
const yu = {
  42: Be,
  43: Be,
  45: Be,
  48: Be,
  49: Be,
  50: Be,
  51: Be,
  52: Be,
  53: Be,
  54: Be,
  55: Be,
  56: Be,
  57: Be,
  62: Ea
}, wu = {
  91: _c
}, Su = {
  [-2]: $n,
  [-1]: $n,
  32: $n
}, Eu = {
  35: Rc,
  42: En,
  45: [Ei, En],
  60: Lc,
  61: Ei,
  95: En,
  96: wi,
  126: wi
}, Tu = {
  38: _a,
  92: Ta
}, _u = {
  [-5]: Zn,
  [-4]: Zn,
  [-3]: Zn,
  33: Yc,
  38: _a,
  42: dr,
  60: [Ql, zc],
  91: Qc,
  92: [vc, Ta],
  93: br,
  95: dr,
  96: dc
}, ku = {
  null: [dr, fu]
}, xu = {
  null: [42, 95]
}, bu = {
  null: []
}, vu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: xu,
  contentInitial: wu,
  disable: bu,
  document: yu,
  flow: Eu,
  flowInitial: Su,
  insideSpan: ku,
  string: Tu,
  text: _u
}, Symbol.toStringTag, { value: "Module" }));
function Iu(e, t, n) {
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
    attempt: O(D),
    check: O(T),
    consume: _,
    enter: M,
    exit: L,
    interrupt: O(T, {
      interrupt: !0
    })
  }, c = {
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
  let h = t.tokenize.call(c, l);
  return t.resolveAll && a.push(t), c;
  function p(R) {
    return o = Qe(o, R), N(), o[o.length - 1] !== null ? [] : (P(t, 0), c.events = xr(a, c.events, c), c.events);
  }
  function m(R, I) {
    return Au(d(R), I);
  }
  function d(R) {
    return Ru(o, R);
  }
  function y() {
    const {
      _bufferIndex: R,
      _index: I,
      line: H,
      column: B,
      offset: W
    } = r;
    return {
      _bufferIndex: R,
      _index: I,
      line: H,
      column: B,
      offset: W
    };
  }
  function w(R) {
    i[R.line] = R.column, F();
  }
  function N() {
    let R;
    for (; r._index < o.length; ) {
      const I = o[r._index];
      if (typeof I == "string")
        for (R = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === R && r._bufferIndex < I.length; )
          S(I.charCodeAt(r._bufferIndex));
      else
        S(I);
    }
  }
  function S(R) {
    h = h(R);
  }
  function _(R) {
    K(R) ? (r.line++, r.column = 1, r.offset += R === -3 ? 2 : 1, F()) : R !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = R;
  }
  function M(R, I) {
    const H = I || {};
    return H.type = R, H.start = y(), c.events.push(["enter", H, c]), s.push(H), H;
  }
  function L(R) {
    const I = s.pop();
    return I.end = y(), c.events.push(["exit", I, c]), I;
  }
  function D(R, I) {
    P(R, I.from);
  }
  function T(R, I) {
    I.restore();
  }
  function O(R, I) {
    return H;
    function H(B, W, re) {
      let Y, de, Ie, f;
      return Array.isArray(B) ? (
        /* c8 ignore next 1 */
        Te(B)
      ) : "tokenize" in B ? (
        // Looks like a construct.
        Te([
          /** @type {Construct} */
          B
        ])
      ) : J(B);
      function J(oe) {
        return Re;
        function Re(ce) {
          const Xe = ce !== null && oe[ce], Ve = ce !== null && oe.null, lt = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Xe) ? Xe : Xe ? [Xe] : [],
            ...Array.isArray(Ve) ? Ve : Ve ? [Ve] : []
          ];
          return Te(lt)(ce);
        }
      }
      function Te(oe) {
        return Y = oe, de = 0, oe.length === 0 ? re : g(oe[de]);
      }
      function g(oe) {
        return Re;
        function Re(ce) {
          return f = U(), Ie = oe, oe.partial || (c.currentConstruct = oe), oe.name && c.parser.constructs.disable.null.includes(oe.name) ? ne() : oe.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            I ? Object.assign(Object.create(c), I) : c,
            l,
            _e,
            ne
          )(ce);
        }
      }
      function _e(oe) {
        return R(Ie, f), W;
      }
      function ne(oe) {
        return f.restore(), ++de < Y.length ? g(Y[de]) : re;
      }
    }
  }
  function P(R, I) {
    R.resolveAll && !a.includes(R) && a.push(R), R.resolve && Ct(c.events, I, c.events.length - I, R.resolve(c.events.slice(I), c)), R.resolveTo && (c.events = R.resolveTo(c.events, c));
  }
  function U() {
    const R = y(), I = c.previous, H = c.currentConstruct, B = c.events.length, W = Array.from(s);
    return {
      from: B,
      restore: re
    };
    function re() {
      r = R, c.previous = I, c.currentConstruct = H, c.events.length = B, s = W, F();
    }
  }
  function F() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Ru(e, t) {
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
function Au(e, t) {
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
function Nu(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Fl([vu, ...(e || {}).extensions || []])
    ),
    content: i($l),
    defined: [],
    document: i(Kl),
    flow: i(du),
    lazy: {},
    string: i(gu),
    text: i(mu)
  };
  return r;
  function i(a) {
    return o;
    function o(s) {
      return Iu(r, a, s);
    }
  }
}
function Mu(e) {
  for (; !ka(e); )
    ;
  return e;
}
const Ti = /[\0\t\n\r]/g;
function Lu() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, o, s) {
    const l = [];
    let c, h, p, m, d;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(o || void 0).decode(a)), p = 0, t = "", n && (a.charCodeAt(0) === 65279 && p++, n = void 0); p < a.length; ) {
      if (Ti.lastIndex = p, c = Ti.exec(a), m = c && c.index !== void 0 ? c.index : a.length, d = a.charCodeAt(m), !c) {
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
const Ou = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Du(e) {
  return e.replace(Ou, Pu);
}
function Pu(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return Sa(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return kr(n) || e;
}
const Aa = {}.hasOwnProperty;
function Hu(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Fu(n)(Mu(Nu(n).document().write(Lu()(e, t, !0))));
}
function Fu(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(ct),
      autolinkProtocol: U,
      autolinkEmail: U,
      atxHeading: a(je),
      blockQuote: a(Ve),
      characterEscape: U,
      characterReference: U,
      codeFenced: a(lt),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: a(lt, o),
      codeText: a(Mt, o),
      codeTextData: U,
      data: U,
      codeFlowValue: U,
      definition: a(nt),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: a(yt),
      hardBreakEscape: a(kt),
      hardBreakTrailing: a(kt),
      htmlFlow: a(xt, o),
      htmlFlowData: U,
      htmlText: a(xt, o),
      htmlTextData: U,
      image: a(rt),
      label: o,
      link: a(ct),
      listItem: a(bt),
      listItemValue: m,
      listOrdered: a(ut, p),
      listUnordered: a(ut),
      paragraph: a(ht),
      reference: g,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: a(je),
      strong: a($t),
      thematicBreak: a(it)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: D,
      autolink: l(),
      autolinkEmail: Xe,
      autolinkProtocol: ce,
      blockQuote: l(),
      characterEscapeValue: F,
      characterReferenceMarkerHexadecimal: ne,
      characterReferenceMarkerNumeric: ne,
      characterReferenceValue: oe,
      characterReference: Re,
      codeFenced: l(N),
      codeFencedFence: w,
      codeFencedFenceInfo: d,
      codeFencedFenceMeta: y,
      codeFlowValue: F,
      codeIndented: l(S),
      codeText: l(W),
      codeTextData: F,
      data: F,
      definition: l(),
      definitionDestinationString: L,
      definitionLabelString: _,
      definitionTitleString: M,
      emphasis: l(),
      hardBreakEscape: l(I),
      hardBreakTrailing: l(I),
      htmlFlow: l(H),
      htmlFlowData: F,
      htmlText: l(B),
      htmlTextData: F,
      image: l(Y),
      label: Ie,
      labelText: de,
      lineEnding: R,
      link: l(re),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: _e,
      resourceDestinationString: f,
      resourceTitleString: J,
      resource: Te,
      setextHeading: l(P),
      setextHeadingLineSequence: O,
      setextHeadingText: T,
      strong: l(),
      thematicBreak: l()
    }
  };
  Na(t, (e || {}).mdastExtensions || []);
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
      exit: c,
      buffer: o,
      resume: h,
      data: n
    }, q = [];
    let Q = -1;
    for (; ++Q < E.length; )
      if (E[Q][1].type === "listOrdered" || E[Q][1].type === "listUnordered")
        if (E[Q][0] === "enter")
          q.push(Q);
        else {
          const Ce = q.pop();
          Q = i(E, Ce, Q);
        }
    for (Q = -1; ++Q < E.length; ) {
      const Ce = t[E[Q][0]];
      Aa.call(Ce, E[Q][1].type) && Ce[E[Q][1].type].call(Object.assign({
        sliceSerialize: E[Q][2].sliceSerialize
      }, j), E[Q][1]);
    }
    if (j.tokenStack.length > 0) {
      const Ce = j.tokenStack[j.tokenStack.length - 1];
      (Ce[1] || _i).call(j, void 0, Ce[0]);
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
    }, Q = -1; ++Q < t.transforms.length; )
      A = t.transforms[Q](A) || A;
    return A;
  }
  function i(E, A, j) {
    let q = A - 1, Q = -1, Ce = !1, Ue, xe, Ye, be;
    for (; ++q <= j; ) {
      const he = E[q];
      switch (he[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          he[0] === "enter" ? Q++ : Q--, be = void 0;
          break;
        }
        case "lineEndingBlank": {
          he[0] === "enter" && (Ue && !be && !Q && !Ye && (Ye = q), be = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          be = void 0;
      }
      if (!Q && he[0] === "enter" && he[1].type === "listItemPrefix" || Q === -1 && he[0] === "exit" && (he[1].type === "listUnordered" || he[1].type === "listOrdered")) {
        if (Ue) {
          let $e = q;
          for (xe = void 0; $e--; ) {
            const Ae = E[$e];
            if (Ae[1].type === "lineEnding" || Ae[1].type === "lineEndingBlank") {
              if (Ae[0] === "exit") continue;
              xe && (E[xe][1].type = "lineEndingBlank", Ce = !0), Ae[1].type = "lineEnding", xe = $e;
            } else if (!(Ae[1].type === "linePrefix" || Ae[1].type === "blockQuotePrefix" || Ae[1].type === "blockQuotePrefixWhitespace" || Ae[1].type === "blockQuoteMarker" || Ae[1].type === "listItemIndent")) break;
          }
          Ye && (!xe || Ye < xe) && (Ue._spread = !0), Ue.end = Object.assign({}, xe ? E[xe][1].start : he[1].end), E.splice(xe || q, 0, ["exit", Ue, he[2]]), q++, j++;
        }
        if (he[1].type === "listItemPrefix") {
          const $e = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, he[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ue = $e, E.splice(q, 0, ["enter", $e, he[2]]), q++, j++, Ye = void 0, be = !0;
        }
      }
    }
    return E[A][1]._spread = Ce, j;
  }
  function a(E, A) {
    return j;
    function j(q) {
      s.call(this, E(q), q), A && A.call(this, q);
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
      E && E.call(this, j), c.call(this, j);
    }
  }
  function c(E, A) {
    const j = this.stack.pop(), q = this.tokenStack.pop();
    if (q)
      q[0].type !== E.type && (A ? A.call(this, E, q[0]) : (q[1] || _i).call(this, E, q[0]));
    else throw new Error("Cannot close `" + E.type + "` (" + tn({
      start: E.start,
      end: E.end
    }) + "): it’s not open");
    j.position.end = It(E.end);
  }
  function h() {
    return Pl(this.stack.pop());
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
  function N() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function S() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = E.replace(/(\r?\n|\r)$/g, "");
  }
  function _(E) {
    const A = this.resume(), j = this.stack[this.stack.length - 1];
    j.label = A, j.identifier = Gt(this.sliceSerialize(E)).toLowerCase();
  }
  function M() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.title = E;
  }
  function L() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.url = E;
  }
  function D(E) {
    const A = this.stack[this.stack.length - 1];
    if (!A.depth) {
      const j = this.sliceSerialize(E).length;
      A.depth = j;
    }
  }
  function T() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function O(E) {
    const A = this.stack[this.stack.length - 1];
    A.depth = this.sliceSerialize(E).codePointAt(0) === 61 ? 1 : 2;
  }
  function P() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function U(E) {
    const j = this.stack[this.stack.length - 1].children;
    let q = j[j.length - 1];
    (!q || q.type !== "text") && (q = me(), q.position = {
      start: It(E.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, j.push(q)), this.stack.push(q);
  }
  function F(E) {
    const A = this.stack.pop();
    A.value += this.sliceSerialize(E), A.position.end = It(E.end);
  }
  function R(E) {
    const A = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const j = A.children[A.children.length - 1];
      j.position.end = It(E.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(A.type) && (U.call(this, E), F.call(this, E));
  }
  function I() {
    this.data.atHardBreak = !0;
  }
  function H() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = E;
  }
  function B() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = E;
  }
  function W() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = E;
  }
  function re() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const A = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = A, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function Y() {
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
    j.label = Du(A), j.identifier = Gt(A).toLowerCase();
  }
  function Ie() {
    const E = this.stack[this.stack.length - 1], A = this.resume(), j = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, j.type === "link") {
      const q = E.children;
      j.children = q;
    } else
      j.alt = A;
  }
  function f() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.url = E;
  }
  function J() {
    const E = this.resume(), A = this.stack[this.stack.length - 1];
    A.title = E;
  }
  function Te() {
    this.data.inReference = void 0;
  }
  function g() {
    this.data.referenceType = "collapsed";
  }
  function _e(E) {
    const A = this.resume(), j = this.stack[this.stack.length - 1];
    j.label = A, j.identifier = Gt(this.sliceSerialize(E)).toLowerCase(), this.data.referenceType = "full";
  }
  function ne(E) {
    this.data.characterReferenceType = E.type;
  }
  function oe(E) {
    const A = this.sliceSerialize(E), j = this.data.characterReferenceType;
    let q;
    j ? (q = Sa(A, j === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : q = kr(A);
    const Q = this.stack[this.stack.length - 1];
    Q.value += q;
  }
  function Re(E) {
    const A = this.stack.pop();
    A.position.end = It(E.end);
  }
  function ce(E) {
    F.call(this, E);
    const A = this.stack[this.stack.length - 1];
    A.url = this.sliceSerialize(E);
  }
  function Xe(E) {
    F.call(this, E);
    const A = this.stack[this.stack.length - 1];
    A.url = "mailto:" + this.sliceSerialize(E);
  }
  function Ve() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function lt() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Mt() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function nt() {
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
  function je() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function kt() {
    return {
      type: "break"
    };
  }
  function xt() {
    return {
      type: "html",
      value: ""
    };
  }
  function rt() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function ct() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function ut(E) {
    return {
      type: "list",
      ordered: E.type === "listOrdered",
      start: null,
      spread: E._spread,
      children: []
    };
  }
  function bt(E) {
    return {
      type: "listItem",
      spread: E._spread,
      checked: null,
      children: []
    };
  }
  function ht() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function $t() {
    return {
      type: "strong",
      children: []
    };
  }
  function me() {
    return {
      type: "text",
      value: ""
    };
  }
  function it() {
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
function Na(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Na(e, r) : Uu(e, r);
  }
}
function Uu(e, t) {
  let n;
  for (n in t)
    if (Aa.call(t, n))
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
function _i(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + tn({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + tn({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + tn({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function zu(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return Hu(r, {
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
function Bu(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Wu(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function Gu(e, t) {
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
function Vu(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function ju(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function $u(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = jt(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
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
function Zu(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Ku(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function Ma(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function qu(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Ma(e, t);
  const i = { src: jt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function Xu(e, t) {
  const n = { src: jt(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function Yu(e, t) {
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
function Ju(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Ma(e, t);
  const i = { href: jt(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function Qu(e, t) {
  const n = { href: jt(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function e1(e, t, n) {
  const r = e.all(t), i = n ? t1(n) : La(t), a = {}, o = [];
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
  const c = { type: "element", tagName: "li", properties: a, children: o };
  return e.patch(t, c), e.applyData(t, c);
}
function t1(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = La(n[r]);
  }
  return t;
}
function La(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function n1(e, t) {
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
function r1(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function i1(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function a1(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function o1(e, t) {
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
    }, s = Sr(t.children[1]), l = pa(t.children[t.children.length - 1]);
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
function s1(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, s = o ? o.length : t.children.length;
  let l = -1;
  const c = [];
  for (; ++l < s; ) {
    const p = t.children[l], m = {}, d = o ? o[l] : void 0;
    d && (m.align = d);
    let y = { type: "element", tagName: a, properties: m, children: [] };
    p && (y.children = e.all(p), e.patch(p, y), y = e.applyData(p, y)), c.push(y);
  }
  const h = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(c, !0)
  };
  return e.patch(t, h), e.applyData(t, h);
}
function l1(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const ki = 9, xi = 32;
function c1(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const a = [];
  for (; r; )
    a.push(
      bi(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return a.push(bi(t.slice(i), i > 0, !1)), a.join("");
}
function bi(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let a = e.codePointAt(r);
    for (; a === ki || a === xi; )
      r++, a = e.codePointAt(r);
  }
  if (n) {
    let a = e.codePointAt(i - 1);
    for (; a === ki || a === xi; )
      i--, a = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function u1(e, t) {
  const n = { type: "text", value: c1(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function h1(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const d1 = {
  blockquote: Bu,
  break: Wu,
  code: Gu,
  delete: Vu,
  emphasis: ju,
  footnoteReference: $u,
  heading: Zu,
  html: Ku,
  imageReference: qu,
  image: Xu,
  inlineCode: Yu,
  linkReference: Ju,
  link: Qu,
  listItem: e1,
  list: n1,
  paragraph: r1,
  // @ts-expect-error: root is different, but hard to type.
  root: i1,
  strong: a1,
  table: o1,
  tableCell: l1,
  tableRow: s1,
  text: u1,
  thematicBreak: h1,
  toml: mn,
  yaml: mn,
  definition: mn,
  footnoteDefinition: mn
};
function mn() {
}
const Oa = -1, Mn = 0, rn = 1, vn = 2, vr = 3, Ir = 4, Rr = 5, Ar = 6, Da = 7, Pa = 8, vi = typeof self == "object" ? self : globalThis, p1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, o] = t[i];
    switch (a) {
      case Mn:
      case Oa:
        return n(o, i);
      case rn: {
        const s = n([], i);
        for (const l of o)
          s.push(r(l));
        return s;
      }
      case vn: {
        const s = n({}, i);
        for (const [l, c] of o)
          s[r(l)] = r(c);
        return s;
      }
      case vr:
        return n(new Date(o), i);
      case Ir: {
        const { source: s, flags: l } = o;
        return n(new RegExp(s, l), i);
      }
      case Rr: {
        const s = n(/* @__PURE__ */ new Map(), i);
        for (const [l, c] of o)
          s.set(r(l), r(c));
        return s;
      }
      case Ar: {
        const s = n(/* @__PURE__ */ new Set(), i);
        for (const l of o)
          s.add(r(l));
        return s;
      }
      case Da: {
        const { name: s, message: l } = o;
        return n(new vi[s](l), i);
      }
      case Pa:
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
    return n(new vi[a](o), i);
  };
  return r;
}, Ii = (e) => p1(/* @__PURE__ */ new Map(), e)(0), zt = "", { toString: f1 } = {}, { keys: g1 } = Object, en = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Mn, t];
  const n = f1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [rn, zt];
    case "Object":
      return [vn, zt];
    case "Date":
      return [vr, zt];
    case "RegExp":
      return [Ir, zt];
    case "Map":
      return [Rr, zt];
    case "Set":
      return [Ar, zt];
    case "DataView":
      return [rn, n];
  }
  return n.includes("Array") ? [rn, n] : n.includes("Error") ? [Da, n] : [vn, n];
}, Cn = ([e, t]) => e === Mn && (t === "function" || t === "symbol"), m1 = (e, t, n, r) => {
  const i = (o, s) => {
    const l = r.push(o) - 1;
    return n.set(s, l), l;
  }, a = (o) => {
    if (n.has(o))
      return n.get(o);
    let [s, l] = en(o);
    switch (s) {
      case Mn: {
        let h = o;
        switch (l) {
          case "bigint":
            s = Pa, h = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + l);
            h = null;
            break;
          case "undefined":
            return i([Oa], o);
        }
        return i([s, h], o);
      }
      case rn: {
        if (l) {
          let m = o;
          return l === "DataView" ? m = new Uint8Array(o.buffer) : l === "ArrayBuffer" && (m = new Uint8Array(o)), i([l, [...m]], o);
        }
        const h = [], p = i([s, h], o);
        for (const m of o)
          h.push(a(m));
        return p;
      }
      case vn: {
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
        for (const m of g1(o))
          (e || !Cn(en(o[m]))) && h.push([a(m), a(o[m])]);
        return p;
      }
      case vr:
        return i([s, o.toISOString()], o);
      case Ir: {
        const { source: h, flags: p } = o;
        return i([s, { source: h, flags: p }], o);
      }
      case Rr: {
        const h = [], p = i([s, h], o);
        for (const [m, d] of o)
          (e || !(Cn(en(m)) || Cn(en(d)))) && h.push([a(m), a(d)]);
        return p;
      }
      case Ar: {
        const h = [], p = i([s, h], o);
        for (const m of o)
          (e || !Cn(en(m))) && h.push(a(m));
        return p;
      }
    }
    const { message: c } = o;
    return i([s, { name: l, message: c }], o);
  };
  return a;
}, Ri = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return m1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, In = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Ii(Ri(e, t)) : structuredClone(e)
) : (e, t) => Ii(Ri(e, t));
function C1(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function y1(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function w1(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || C1, r = e.options.footnoteBackLabel || y1, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, s = [];
  let l = -1;
  for (; ++l < e.footnoteOrder.length; ) {
    const c = e.footnoteById.get(
      e.footnoteOrder[l]
    );
    if (!c)
      continue;
    const h = e.all(c), p = String(c.identifier).toUpperCase(), m = jt(p.toLowerCase());
    let d = 0;
    const y = [], w = e.footnoteCounts.get(p);
    for (; w !== void 0 && ++d <= w; ) {
      y.length > 0 && y.push({ type: "text", value: " " });
      let _ = typeof n == "string" ? n : n(l, d);
      typeof _ == "string" && (_ = { type: "text", value: _ }), y.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + m + (d > 1 ? "-" + d : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(l, d),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(_) ? _ : [_]
      });
    }
    const N = h[h.length - 1];
    if (N && N.type === "element" && N.tagName === "p") {
      const _ = N.children[N.children.length - 1];
      _ && _.type === "text" ? _.value += " " : N.children.push({ type: "text", value: " " }), N.children.push(...y);
    } else
      h.push(...y);
    const S = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + m },
      children: e.wrap(h, !0)
    };
    e.patch(c, S), s.push(S);
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
            ...In(o),
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
const Ha = (
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
      return _1;
    if (typeof e == "function")
      return Ln(e);
    if (typeof e == "object")
      return Array.isArray(e) ? S1(e) : E1(e);
    if (typeof e == "string")
      return T1(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function S1(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Ha(e[n]);
  return Ln(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function E1(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Ln(n);
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
function T1(e) {
  return Ln(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Ln(e) {
  return t;
  function t(n, r, i) {
    return !!(k1(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function _1() {
  return !0;
}
function k1(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Fa = [], x1 = !0, Ai = !1, b1 = "skip";
function v1(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = Ha(i), o = r ? -1 : 1;
  s(e, void 0, [])();
  function s(l, c, h) {
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
      let d = Fa, y, w, N;
      if ((!t || a(l, c, h[h.length - 1] || void 0)) && (d = I1(n(l, h)), d[0] === Ai))
        return d;
      if ("children" in l && l.children) {
        const S = (
          /** @type {UnistParent} */
          l
        );
        if (S.children && d[0] !== b1)
          for (w = (r ? S.children.length : -1) + o, N = h.concat(S); w > -1 && w < S.children.length; ) {
            const _ = S.children[w];
            if (y = s(_, w, N)(), y[0] === Ai)
              return y;
            w = typeof y[1] == "number" ? y[1] : w + o;
          }
      }
      return d;
    }
  }
}
function I1(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [x1, e] : e == null ? Fa : [e];
}
function Ua(e, t, n, r) {
  let i, a, o;
  typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), v1(e, a, s, i);
  function s(l, c) {
    const h = c[c.length - 1], p = h ? h.children.indexOf(l) : void 0;
    return o(l, p, h);
  }
}
const pr = {}.hasOwnProperty, R1 = {};
function A1(e, t) {
  const n = t || R1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = { ...d1, ...n.handlers }, s = {
    all: c,
    applyData: M1,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: o,
    one: l,
    options: n,
    patch: N1,
    wrap: O1
  };
  return Ua(e, function(h) {
    if (h.type === "definition" || h.type === "footnoteDefinition") {
      const p = h.type === "definition" ? r : i, m = String(h.identifier).toUpperCase();
      p.has(m) || p.set(m, h);
    }
  }), s;
  function l(h, p) {
    const m = h.type, d = s.handlers[m];
    if (pr.call(s.handlers, m) && d)
      return d(s, h, p);
    if (s.options.passThrough && s.options.passThrough.includes(m)) {
      if ("children" in h) {
        const { children: w, ...N } = h, S = In(N);
        return S.children = s.all(h), S;
      }
      return In(h);
    }
    return (s.options.unknownHandler || L1)(s, h, p);
  }
  function c(h) {
    const p = [];
    if ("children" in h) {
      const m = h.children;
      let d = -1;
      for (; ++d < m.length; ) {
        const y = s.one(m[d], h);
        if (y) {
          if (d && m[d - 1].type === "break" && (!Array.isArray(y) && y.type === "text" && (y.value = Ni(y.value)), !Array.isArray(y) && y.type === "element")) {
            const w = y.children[0];
            w && w.type === "text" && (w.value = Ni(w.value));
          }
          Array.isArray(y) ? p.push(...y) : p.push(y);
        }
      }
    }
    return p;
  }
}
function N1(e, t) {
  e.position && (t.position = fl(e));
}
function M1(e, t) {
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
    n.type === "element" && a && Object.assign(n.properties, In(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function L1(e, t) {
  const n = t.data || {}, r = "value" in t && !(pr.call(n, "hProperties") || pr.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function O1(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Ni(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function Mi(e, t) {
  const n = A1(e, t), r = n.one(e, void 0), i = w1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function D1(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      Mi(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      Mi(n, { file: r, ...e || t })
    );
  };
}
function Li(e) {
  if (e)
    throw e;
}
var Tn = Object.prototype.hasOwnProperty, za = Object.prototype.toString, Oi = Object.defineProperty, Di = Object.getOwnPropertyDescriptor, Pi = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : za.call(t) === "[object Array]";
}, Hi = function(t) {
  if (!t || za.call(t) !== "[object Object]")
    return !1;
  var n = Tn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && Tn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || Tn.call(t, i);
}, Fi = function(t, n) {
  Oi && n.name === "__proto__" ? Oi(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, Ui = function(t, n) {
  if (n === "__proto__")
    if (Tn.call(t, n)) {
      if (Di)
        return Di(t, n).value;
    } else return;
  return t[n];
}, P1 = function e() {
  var t, n, r, i, a, o, s = arguments[0], l = 1, c = arguments.length, h = !1;
  for (typeof s == "boolean" && (h = s, s = arguments[1] || {}, l = 2), (s == null || typeof s != "object" && typeof s != "function") && (s = {}); l < c; ++l)
    if (t = arguments[l], t != null)
      for (n in t)
        r = Ui(s, n), i = Ui(t, n), s !== i && (h && i && (Hi(i) || (a = Pi(i))) ? (a ? (a = !1, o = r && Pi(r) ? r : []) : o = r && Hi(r) ? r : {}, Fi(s, { name: n, newValue: e(h, o, i) })) : typeof i < "u" && Fi(s, { name: n, newValue: i }));
  return s;
};
const Kn = /* @__PURE__ */ da(P1);
function fr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function H1() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let a = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    s(null, ...i);
    function s(l, ...c) {
      const h = e[++a];
      let p = -1;
      if (l) {
        o(l);
        return;
      }
      for (; ++p < i.length; )
        (c[p] === null || c[p] === void 0) && (c[p] = i[p]);
      i = c, h ? F1(h, s)(...c) : o(null, ...c);
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
function F1(e, t) {
  let n;
  return r;
  function r(...o) {
    const s = e.length > o.length;
    let l;
    s && o.push(i);
    try {
      l = e.apply(this, o);
    } catch (c) {
      const h = (
        /** @type {Error} */
        c
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
const pt = { basename: U1, dirname: z1, extname: B1, join: W1, sep: "/" };
function U1(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  ln(e);
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
function z1(e) {
  if (ln(e), e.length === 0)
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
function B1(e) {
  ln(e);
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
function W1(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    ln(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : G1(n);
}
function G1(e) {
  ln(e);
  const t = e.codePointAt(0) === 47;
  let n = V1(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function V1(e, t) {
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
function ln(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const j1 = { cwd: $1 };
function $1() {
  return "/";
}
function gr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Z1(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!gr(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return K1(e);
}
function K1(e) {
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
const qn = (
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
class Ba {
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
    t ? gr(t) ? n = { path: t } : typeof t == "string" || q1(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : j1.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < qn.length; ) {
      const a = qn[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      qn.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? pt.basename(this.path) : void 0;
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
    Yn(t, "basename"), Xn(t, "basename"), this.path = pt.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? pt.dirname(this.path) : void 0;
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
    zi(this.basename, "dirname"), this.path = pt.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? pt.extname(this.path) : void 0;
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
    if (Xn(t, "extname"), zi(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = pt.join(this.dirname, this.stem + (t || ""));
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
    gr(t) && (t = Z1(t)), Yn(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? pt.basename(this.path, this.extname) : void 0;
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
    Yn(t, "stem"), Xn(t, "stem"), this.path = pt.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new Oe(
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
function Xn(e, t) {
  if (e && e.includes(pt.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + pt.sep + "`"
    );
}
function Yn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function zi(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function q1(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const X1 = (
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
), Y1 = {}.hasOwnProperty;
class Nr extends X1 {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = H1();
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
      new Nr()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Kn(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (er("data", this.frozen), this.namespace[t] = n, this) : Y1.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (er("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = yn(t), r = this.parser || this.Parser;
    return Jn("parse", r), r(String(n), n);
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
    return this.freeze(), Jn("process", this.parser || this.Parser), Qn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, o) {
      const s = yn(t), l = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(s)
      );
      r.run(l, s, function(h, p, m) {
        if (h || !p || !m)
          return c(h);
        const d = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          p
        ), y = r.stringify(d, m);
        eh(y) ? m.value = y : m.result = y, c(
          h,
          /** @type {VFileWithOutput<CompileResult>} */
          m
        );
      });
      function c(h, p) {
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
    return this.freeze(), Jn("processSync", this.parser || this.Parser), Qn("processSync", this.compiler || this.Compiler), this.process(t, i), Wi("processSync", "process", n), r;
    function i(a, o) {
      n = !0, Li(a), r = o;
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
    Bi(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(o, s) {
      const l = yn(n);
      i.run(t, l, c);
      function c(h, p, m) {
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
    return this.run(t, n, a), Wi("runSync", "run", r), i;
    function a(o, s) {
      Li(o), i = s, r = !0;
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
    const r = yn(n), i = this.compiler || this.Compiler;
    return Qn("stringify", i), Bi(t), i(t, r);
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
    if (er("use", this.frozen), t != null) if (typeof t == "function")
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
          const [h, ...p] = (
            /** @type {PluginTuple<Array<unknown>>} */
            c
          );
          l(h, p);
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
      s(c.plugins), c.settings && (i.settings = Kn(!0, i.settings, c.settings));
    }
    function s(c) {
      let h = -1;
      if (c != null) if (Array.isArray(c))
        for (; ++h < c.length; ) {
          const p = c[h];
          a(p);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + c + "`");
    }
    function l(c, h) {
      let p = -1, m = -1;
      for (; ++p < r.length; )
        if (r[p][0] === c) {
          m = p;
          break;
        }
      if (m === -1)
        r.push([c, ...h]);
      else if (h.length > 0) {
        let [d, ...y] = h;
        const w = r[m][1];
        fr(w) && fr(d) && (d = Kn(!0, w, d)), r[m] = [c, d, ...y];
      }
    }
  }
}
const J1 = new Nr().freeze();
function Jn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Qn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function er(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Bi(e) {
  if (!fr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Wi(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function yn(e) {
  return Q1(e) ? e : new Ba(e);
}
function Q1(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function eh(e) {
  return typeof e == "string" || th(e);
}
function th(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const nh = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Gi = [], Vi = { allowDangerousHtml: !0 }, rh = /^(https?|ircs?|mailto|xmpp)$/i, ih = [
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
function ji(e) {
  const t = ah(e), n = oh(e);
  return sh(t.runSync(t.parse(n), n), e);
}
function ah(e) {
  const t = e.rehypePlugins || Gi, n = e.remarkPlugins || Gi, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Vi } : Vi;
  return J1().use(zu).use(n).use(D1, r).use(t);
}
function oh(e) {
  const t = e.children || "", n = new Ba();
  return typeof t == "string" && (n.value = t), n;
}
function sh(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, s = t.unwrapDisallowed, l = t.urlTransform || lh;
  for (const h of ih)
    Object.hasOwn(t, h.from) && ("" + h.from + (h.to ? "use `" + h.to + "` instead" : "remove it") + nh + h.id, void 0);
  return Ua(e, c), wl(e, {
    Fragment: Ht,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: u,
    jsxs: k,
    passKeys: !0,
    passNode: !0
  });
  function c(h, p, m) {
    if (h.type === "raw" && m && typeof p == "number")
      return o ? m.children.splice(p, 1) : m.children[p] = { type: "text", value: h.value }, p;
    if (h.type === "element") {
      let d;
      for (d in jn)
        if (Object.hasOwn(jn, d) && Object.hasOwn(h.properties, d)) {
          const y = h.properties[d], w = jn[d];
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
function lh(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    rh.test(e.slice(0, t)) ? e : ""
  );
}
function ch({ children: e, isStreaming: t }) {
  const [n, r] = ae(!0), [i, a] = ae(!1);
  ft.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const o = () => {
    t || r(!n);
  }, s = ft.Children.map(e, (l) => {
    if (ft.isValidElement(l)) {
      if (l.type === Wa)
        return ft.cloneElement(
          l,
          {
            onToggle: o,
            isExpanded: n
          }
        );
      if (l.type === Ga)
        return ft.cloneElement(
          l,
          {
            isVisible: n
          }
        );
    }
    return l;
  });
  return /* @__PURE__ */ u("div", { className: "chat-wrapper__reasoning", children: s });
}
function Wa({
  title: e,
  status: t = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const a = () => /* @__PURE__ */ k(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ u(
          "mask",
          {
            id: "mask0_64_36210",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "16",
            height: "16",
            children: /* @__PURE__ */ u("rect", { width: "16", height: "16", fill: "#D9D9D9" })
          }
        ),
        /* @__PURE__ */ u("g", { mask: "url(#mask0_64_36210)", children: /* @__PURE__ */ u(
          "path",
          {
            d: "M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z",
            fill: "#637381"
          }
        ) })
      ]
    }
  ), o = t === "completed" || e.includes(Z.UI_TEXT.THINKING) || e.includes(Z.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ k(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${o ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: o ? r : void 0,
      style: { cursor: o ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ u("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ k("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ u("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        o && /* @__PURE__ */ u(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ k(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ u(
                    "mask",
                    {
                      id: "mask0_44_18068",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ u("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ u("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ u(
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
function Ga({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ u("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function uh({ children: e }) {
  return /* @__PURE__ */ u("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function hh({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var l, c;
  const a = () => {
    if (!r || !i) return null;
    const h = i.find((p) => p.name === r);
    return (h == null ? void 0 : h.description) || null;
  };
  let o;
  if (r != null && r.startsWith("lat_")) {
    const h = (l = n == null ? void 0 : n.parameters) == null ? void 0 : l.query, p = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.url;
    o = h || p || "Executing tool...";
  } else
    o = a();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ u("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ k("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ k(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ u(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ u("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ u("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ u(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ k(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ u(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ u("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ u("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ u(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ u("span", { children: o }),
          /* @__PURE__ */ k("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ k(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ u(
                    "mask",
                    {
                      id: "mask0_64_36278",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ u(
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
                  /* @__PURE__ */ u("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ u(
                    "path",
                    {
                      d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ u("span", { children: "Running..." })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ k("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ k(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ u(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ u("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ u("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ u(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ k(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ u(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ u("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ u("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ u(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ u("span", { children: o }),
          /* @__PURE__ */ k("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ k(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ u(
                    "mask",
                    {
                      id: "mask0_64_36345",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ u(
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
                  /* @__PURE__ */ u("g", { mask: "url(#mask0_64_36345)", children: /* @__PURE__ */ u(
                    "path",
                    {
                      d: "M7.1501 10.7819L11.1168 6.83193L10.2668 5.98193L7.1501 9.08193L5.73343 7.68193L4.88343 8.53193L7.1501 10.7819ZM8.0001 14.7819C7.12232 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.643 2.1001 10.8653C1.76676 10.0875 1.6001 9.25971 1.6001 8.38193C1.6001 7.49304 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73899 2.81527 5.51676 2.48193C6.29454 2.1486 7.12232 1.98193 8.0001 1.98193C8.88899 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11805 13.9001 5.89027C14.2334 6.66249 14.4001 7.49304 14.4001 8.38193C14.4001 9.25971 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.264 13.9486 10.4918 14.2819C9.71954 14.6153 8.88899 14.7819 8.0001 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819Z",
                      fill: "#4EAD13"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ u("span", { children: "Completed" })
          ] })
        ] });
      case "error":
        return /* @__PURE__ */ k("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ u("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ u(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ u(
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
          /* @__PURE__ */ u("span", { className: "chat-wrapper__tooling-handle-title", children: e })
        ] });
      default:
        return /* @__PURE__ */ k("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ k(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ u(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ u("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ u("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ u(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ k(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ u(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ u("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ u("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ u(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ k("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ k(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ u(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ u(
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
                /* @__PURE__ */ u("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ u(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ k(
            "svg",
            {
              width: "20",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ u(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ u("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ u("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ u(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ u("span", { children: "Pending..." })
        ] });
    }
  })() });
}
function Va({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ k("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ u("span", {}),
    /* @__PURE__ */ u("span", {}),
    /* @__PURE__ */ u("span", {})
  ] }) : t === "pulse" ? /* @__PURE__ */ u(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ u(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: e, height: e }
    }
  );
}
const dh = ({ message: e }) => {
  const [t, n] = ae(!0);
  return /* @__PURE__ */ k("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ k(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!t),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          e.role === "system" ? /* @__PURE__ */ k("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ k(
              "svg",
              {
                width: "20",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ u(
                    "mask",
                    {
                      id: "mask0_64_36257",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ u("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ u("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ u(
                    "path",
                    {
                      d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }),
            /* @__PURE__ */ u("span", { children: "AI text input <show-toolname>..." })
          ] }) : /* @__PURE__ */ u("span", { children: "System Message" }),
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ k(
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
                /* @__PURE__ */ u(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ u("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ u("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ u(
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
    t && /* @__PURE__ */ u("div", { className: "chat-wrapper__system-message-content", children: /* @__PURE__ */ u("span", { children: e.content }) })
  ] });
}, ja = eo(null);
function ph({ children: e, value: t }) {
  return /* @__PURE__ */ u(ja.Provider, { value: t, children: e });
}
function cn() {
  const e = to(ja);
  if (!e)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return e;
}
const $a = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ u("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ u("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ u("code", { className: "chat-wrapper__code-block", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ u("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ u("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ u("li", { className: "chat-wrapper__list-item", ...t, children: e })
}, fh = {
  ...$a,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ u("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ u("code", { className: "chat-wrapper__code", ...n, children: e })
}, Za = $i(
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
      onRetryMessage: c
    } = cn(), [h, p] = ae(!1), [m, d] = ae(!1), y = te(async () => {
      try {
        await navigator.clipboard.writeText(e.content), p(!0), setTimeout(() => p(!1), 2e3);
      } catch (U) {
        console.error("Failed to copy message:", U);
      }
    }, [e.content]), w = te(() => {
      c && c(e.id);
    }, [c, e.id]), N = () => /* @__PURE__ */ k("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ u(Va, { size: 16, variant: "dots" }),
      /* @__PURE__ */ u("span", { children: Z.UI_TEXT.THINKING })
    ] }), S = () => /* @__PURE__ */ k("div", { className: "chat-wrapper__error-message chat-wrapper__error-message--retrying", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-icon", children: "🔄" }),
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-content", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__error-text chat-wrapper__error-text--retrying", children: "Retrying message..." }) })
    ] }), _ = () => /* @__PURE__ */ k("div", { className: "chat-wrapper__error-message", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ k("div", { className: "chat-wrapper__error-content", children: [
        /* @__PURE__ */ u("div", { className: "chat-wrapper__error-text", children: e.errorMessage || "Failed to send message. Server may be down." }),
        c && /* @__PURE__ */ u(
          "button",
          {
            className: "chat-wrapper__retry-button",
            onClick: w,
            children: "🔄 Retry"
          }
        )
      ] })
    ] }), M = () => /* @__PURE__ */ k(Ht, { children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ u(
        "button",
        {
          className: `chat-wrapper__copy-button ${m ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: y,
          title: "Copy message",
          children: /* @__PURE__ */ u(Es, {})
        }
      ) }),
      h && /* @__PURE__ */ u("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), L = () => /* @__PURE__ */ u("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ u(ji, { components: $a, children: e.content }) }),
      M()
    ] }) }), D = () => /* @__PURE__ */ k("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ u(ji, { components: fh, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ u("div", { className: "chat-wrapper__media", children: e.media.map((U, F) => /* @__PURE__ */ u(
        "img",
        {
          src: U,
          alt: `Uploaded content ${F + 1}`,
          className: "chat-wrapper__media-image"
        },
        F
      )) }),
      e.isRetrying && S(),
      e.hasError && !e.isRetrying && _()
    ] }), T = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === l.current ? N() : e.role === "system" ? /* @__PURE__ */ u(dh, { message: e }) : e.role === "assistant" ? L() : D(), O = () => /* @__PURE__ */ k(ch, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ u(
        Wa,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ u(Ga, { children: i(e.content) })
    ] }), P = () => {
      var U;
      return /* @__PURE__ */ u(uh, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ u(
        hh,
        {
          title: a(e.content, e.isStreaming),
          status: o(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (U = e.toolData) == null ? void 0 : U.toolName,
          clientTools: s
        }
      ) });
    };
    return /* @__PURE__ */ u(
      "div",
      {
        className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
        onMouseEnter: () => e.role === "assistant" && d(!0),
        onMouseLeave: () => e.role === "assistant" && d(!1),
        children: e.role === "reasoning" ? O() : e.role === "tooling" ? P() : /* @__PURE__ */ u("div", { className: "chat-wrapper__message-content", children: T() })
      }
    );
  }
);
Za.displayName = "MessageItem";
const gh = ({ isVisible: e }) => e ? /* @__PURE__ */ u("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ u("span", {}),
  /* @__PURE__ */ u("span", {}),
  /* @__PURE__ */ u("span", {})
] }) }) }) }) : null, Ka = Rn((e, t) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = cn();
  return /* @__PURE__ */ k("div", { className: "chat-wrapper__messages", children: [
    n.map((a) => /* @__PURE__ */ u(
      Za,
      {
        message: a
      },
      a.id
    )),
    /* @__PURE__ */ u(gh, { isVisible: r && !i }),
    /* @__PURE__ */ u("div", { ref: t })
  ] });
});
Ka.displayName = "MessagesList";
const st = (...e) => e.filter(Boolean).join(" "), mh = () => /* @__PURE__ */ k(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ k("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ u(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ u("g", { clipPath: "url(#clip0_121_23927)", children: /* @__PURE__ */ u(
          "path",
          {
            d: "M16.3333 26.3541L18.2133 28.2341L25.6666 20.7941V37.0208H28.3333V20.7941L35.7733 28.2474L37.6666 26.3541L26.9999 15.6874L16.3333 26.3541Z",
            fill: "white"
          }
        ) })
      ] }),
      /* @__PURE__ */ k("defs", { children: [
        /* @__PURE__ */ k(
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
              /* @__PURE__ */ u("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ u(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ u("feOffset", { dy: "1" }),
              /* @__PURE__ */ u("feGaussianBlur", { stdDeviation: "1" }),
              /* @__PURE__ */ u("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ u(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                }
              ),
              /* @__PURE__ */ u(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ u(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ u("feOffset", { dy: "1" }),
              /* @__PURE__ */ u("feGaussianBlur", { stdDeviation: "1.5" }),
              /* @__PURE__ */ u("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ u(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                }
              ),
              /* @__PURE__ */ u(
                "feBlend",
                {
                  mode: "normal",
                  in2: "effect1_dropShadow_121_23927",
                  result: "effect2_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ u(
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
        /* @__PURE__ */ u("clipPath", { id: "clip0_121_23927", children: /* @__PURE__ */ u(
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
), Ch = ({ className: e, ...t }) => /* @__PURE__ */ u("form", { className: st("chat-wrapper__prompt-input", e), ...t }), qa = Rn(
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
        const h = c.currentTarget.form;
        if (h) {
          const p = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          h.dispatchEvent(p);
        }
      }
      a == null || a(c);
    };
    return /* @__PURE__ */ u(
      "textarea",
      {
        ref: s,
        className: st("chat-wrapper__prompt-textarea", t),
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
qa.displayName = "PromptInputTextarea";
const yh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u("div", { className: st("chat-wrapper__prompt-toolbar", e), ...t }), wh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u("div", { className: st("chat-wrapper__prompt-tools", e), ...t }), Sh = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || ft.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ u(
    "button",
    {
      className: st(
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
}, Eh = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = et.IDLE,
  children: i,
  disabled: a,
  ...o
}) => {
  let s = /* @__PURE__ */ u(mh, {});
  return /* @__PURE__ */ u(
    "button",
    {
      className: st(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${t}`,
        `chat-wrapper__prompt-submit--${n}`,
        !a && "chat-wrapper__prompt-submit--enabled",
        // status === "streaming" && "chat-wrapper__prompt-submit--stop",
        e
      ),
      type: "submit",
      disabled: a,
      ...o,
      children: i ?? s
    }
  );
}, Vh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ u("select", { className: st("chat-wrapper__prompt-select", e), ...n, children: t }), jh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ u(
  "button",
  {
    className: st("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), $h = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u(
  "div",
  {
    className: st("chat-wrapper__prompt-select-content", e),
    ...t
  }
), Zh = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ u(
  "div",
  {
    className: st("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), Kh = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ u(
  "span",
  {
    className: st("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), Th = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = ae(0), [a, o] = ae(!1), [s, l] = ae(0);
  return Me(() => {
    if (!t || e.length <= 1) return;
    const c = setInterval(() => {
      o(!0), setTimeout(() => {
        i((h) => (h + 1) % e.length), l((h) => h + 1), o(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(c);
  }, [t, e.length]), Me(() => {
    t || (i(0), o(!1), l(0));
  }, [t]), /* @__PURE__ */ u(
    "div",
    {
      className: `animated-placeholder-container ${n}`,
      children: /* @__PURE__ */ u(
        "span",
        {
          className: `animated-placeholder-text ${a ? "transitioning" : ""}`,
          children: e[r]
        },
        s
      )
    }
  );
}, _h = Rn((e, t) => {
  const {
    placeholderTexts: n,
    isStreaming: r,
    isLoadingConversation: i,
    chatStatus: a,
    fileUploadEnabled: o,
    chipName: s,
    chipLogo: l,
    messages: c,
    onSubmit: h,
    onFileUpload: p,
    onStopGeneration: m
  } = cn(), d = c.length > 0, [y, w] = ae(""), [N, S] = ae([]), _ = Ke(null), M = n && n.length > 0 ? n : ["What would you like to know?"], L = y.length === 0 && !d && M.length > 1;
  Zi(t, () => ({
    focus: () => {
      var P;
      (P = _.current) == null || P.focus();
    },
    setText: (P) => {
      w(P), setTimeout(() => {
        if (_.current) {
          _.current.focus();
          const U = P.length;
          _.current.setSelectionRange(U, U);
        }
      }, 0);
    }
  }));
  const D = te(
    (P) => {
      P.preventDefault();
      const F = new FormData(P.currentTarget).get("message");
      if (F != null && F.trim()) {
        const R = xn(F.trim(), !1);
        if (!R.trim()) {
          console.warn("Message was blocked due to security concerns");
          return;
        }
        h(R, N), w(""), S([]);
      }
    },
    [h, N]
  ), T = te(
    (P) => {
      const F = P.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      w(F);
    },
    []
  ), O = te(async () => {
    const P = document.createElement("input");
    P.type = "file", P.accept = "image/*", P.multiple = !1, P.onchange = async (U) => {
      const F = U.target.files;
      if (F) {
        const R = Array.from(F).filter((I) => {
          const H = ns(I.name);
          return H !== I.name && console.warn(
            `File name sanitized: ${I.name} -> ${H}`
          ), I.size > 10485760 ? (console.warn(`File too large: ${I.name} (${I.size} bytes)`), !1) : [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp"
          ].includes(I.type) ? !0 : (console.warn(`File type not allowed: ${I.name} (${I.type})`), !1);
        });
        if (R.length > 0) {
          const I = await p(R);
          S(I);
        }
      }
    }, P.click();
  }, [p]);
  return /* @__PURE__ */ k(
    Ch,
    {
      onSubmit: D,
      style: { position: "relative" },
      className: r || i ? "chat-wrapper__prompt-input--disabled" : "",
      children: [
        /* @__PURE__ */ u(
          qa,
          {
            ref: _,
            name: "message",
            value: y,
            onChange: T,
            placeholder: "",
            disabled: r || i
          }
        ),
        !y.trim() && /* @__PURE__ */ u(
          Th,
          {
            placeholderTexts: M,
            shouldAnimate: L
          }
        ),
        N.length > 0 && /* @__PURE__ */ u(
          "div",
          {
            style: {
              padding: "8px 16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center"
            },
            children: N.map((P, U) => {
              const F = P.startsWith("data:image/"), R = P.startsWith("http://") || P.startsWith("https://"), I = F || R;
              return /* @__PURE__ */ k(
                "div",
                {
                  style: {
                    position: "relative",
                    display: "inline-block"
                  },
                  children: [
                    I ? /* @__PURE__ */ k(
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
                          /* @__PURE__ */ u(
                            "img",
                            {
                              src: P,
                              alt: `Attachment ${U + 1}`,
                              style: {
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                              }
                            }
                          ),
                          /* @__PURE__ */ u(
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
                    ) : /* @__PURE__ */ k(
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
                          /* @__PURE__ */ u(
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
                              children: /* @__PURE__ */ k(
                                "svg",
                                {
                                  width: "24",
                                  height: "25",
                                  viewBox: "0 0 24 25",
                                  fill: "none",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  children: [
                                    /* @__PURE__ */ u(
                                      "mask",
                                      {
                                        id: "mask0_190_623",
                                        style: { maskType: "alpha" },
                                        maskUnits: "userSpaceOnUse",
                                        x: "0",
                                        y: "0",
                                        width: "24",
                                        height: "25",
                                        children: /* @__PURE__ */ u(
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
                                    /* @__PURE__ */ u("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ u(
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
                          /* @__PURE__ */ k("div", { style: { flex: 1, minWidth: 0 }, children: [
                            /* @__PURE__ */ u(
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
                                  const H = P.match(/name=([^;]+)/);
                                  return H ? decodeURIComponent(H[1]) : "document.pdf";
                                })()
                              }
                            ),
                            /* @__PURE__ */ u(
                              "div",
                              {
                                style: {
                                  color: "#9ca3af",
                                  fontSize: "12px",
                                  textTransform: "uppercase"
                                },
                                children: (() => {
                                  const H = P.match(/data:([^;]+)/);
                                  if (H) {
                                    const B = H[1];
                                    switch (B) {
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
                                        const W = B.split("/")[1];
                                        return W ? W.toUpperCase().substring(0, 4) : "FILE";
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
                    /* @__PURE__ */ u(
                      "button",
                      {
                        onClick: () => {
                          S(
                            (H) => H.filter((B, W) => W !== U)
                          );
                        },
                        style: {
                          position: "absolute",
                          top: I ? "6px" : "8px",
                          right: I ? "6px" : "8px",
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
        /* @__PURE__ */ k(yh, { children: [
          /* @__PURE__ */ k(wh, { children: [
            o && /* @__PURE__ */ k(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center"
                },
                children: [
                  /* @__PURE__ */ u(
                    Sh,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: O,
                      title: N.length > 0 ? `${N.length} image(s) attached` : "Attach image",
                      disabled: r || i,
                      style: {
                        position: "relative"
                      },
                      children: /* @__PURE__ */ k(
                        "svg",
                        {
                          width: "36",
                          height: "37",
                          viewBox: "0 0 36 37",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                          children: [
                            /* @__PURE__ */ u(
                              "rect",
                              {
                                y: "0.354126",
                                width: "36",
                                height: "36",
                                rx: "18",
                                fill: "#F4F6F8"
                              }
                            ),
                            /* @__PURE__ */ u("g", { clipPath: "url(#clip0_121_9706)", children: /* @__PURE__ */ u(
                              "path",
                              {
                                d: "M21.3334 13.3541V22.9374C21.3334 24.7791 19.8417 26.2708 18 26.2708C16.1584 26.2708 14.6667 24.7791 14.6667 22.9374V12.5208C14.6667 11.3708 15.6 10.4374 16.75 10.4374C17.9 10.4374 18.8334 11.3708 18.8334 12.5208V21.2708C18.8334 21.7291 18.4584 22.1041 18 22.1041C17.5417 22.1041 17.1667 21.7291 17.1667 21.2708V13.3541H15.9167V21.2708C15.9167 22.4208 16.85 23.3541 18 23.3541C19.15 23.3541 20.0834 22.4208 20.0834 21.2708V12.5208C20.0834 10.6791 18.5917 9.18744 16.75 9.18744C14.9084 9.18744 13.4167 10.6791 13.4167 12.5208V22.9374C13.4167 25.4708 15.4667 27.5208 18 27.5208C20.5334 27.5208 22.5834 25.4708 22.5834 22.9374V13.3541H21.3334Z",
                                fill: "#212B36"
                              }
                            ) }),
                            /* @__PURE__ */ u("defs", { children: /* @__PURE__ */ u("clipPath", { id: "clip0_121_9706", children: /* @__PURE__ */ u(
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
                  /* @__PURE__ */ u(
                    "span",
                    {
                      onClick: O,
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
            o && s && /* @__PURE__ */ u("div", { className: "chat-wrapper__divider" }),
            s && /* @__PURE__ */ k("div", { className: "chat-wrapper__restaurant-chip", children: [
              l && /* @__PURE__ */ u(
                "img",
                {
                  src: l,
                  alt: "Chip logo",
                  className: "chat-wrapper__restaurant-logo"
                }
              ),
              /* @__PURE__ */ u("span", { className: "chat-wrapper__restaurant-name", children: s })
            ] })
          ] }),
          /* @__PURE__ */ u(
            Eh,
            {
              status: a,
              disabled: !y.trim() || i,
              onClick: a === et.STREAMING && m ? () => {
                m();
              } : void 0
            }
          )
        ] })
      ]
    }
  );
}), kh = () => {
  const { suggestedPrompts: e, chatInputRef: t } = cn();
  if (!e || e.length === 0)
    return null;
  const n = (r) => {
    t.current && t.current.setText(r.description);
  };
  return /* @__PURE__ */ k("div", { className: "chat-wrapper__suggested-prompts", children: [
    /* @__PURE__ */ u("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
    /* @__PURE__ */ u("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((r, i) => /* @__PURE__ */ u(
      "button",
      {
        className: "chat-wrapper__suggested-prompt-card",
        onClick: () => n(r),
        children: /* @__PURE__ */ k("div", { className: "chat-wrapper__suggested-prompt-content", children: [
          /* @__PURE__ */ u("h4", { className: "chat-wrapper__suggested-prompt-title", children: r.title }),
          /* @__PURE__ */ u("p", { className: "chat-wrapper__suggested-prompt-description", children: r.description })
        ] })
      },
      i
    )) })
  ] });
}, xh = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ u(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ u("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ u(Va, { size: e, variant: "dots" }) })
  }
), bh = ({
  headerName: e,
  headerDescription: t
}) => /* @__PURE__ */ k("div", { className: "chat-wrapper__main-header", children: [
  /* @__PURE__ */ u("h1", { className: "chat-wrapper__main-title", children: e }),
  t && /* @__PURE__ */ u("p", { className: "chat-wrapper__description", children: t })
] }), vh = () => {
  const {
    messages: e,
    isLoadingConversation: t,
    isStreaming: n,
    headerName: r,
    headerDescription: i,
    suggestedPrompts: a,
    messagesEndRef: o,
    chatInputRef: s,
    conversationError: l
  } = cn(), c = gt.state.shouldShowMainHeader(
    e.length,
    n,
    t
  ), h = gt.state.shouldShowSuggestedPrompts(
    e.length,
    n,
    t,
    a
  ), p = gt.state.getContentAreaClass(
    e.length,
    n,
    t
  );
  return /* @__PURE__ */ k(Ht, { children: [
    l && /* @__PURE__ */ u("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ k("p", { children: [
      "⚠️ ",
      l
    ] }) }),
    c && /* @__PURE__ */ u(bh, { headerName: r, headerDescription: i }),
    /* @__PURE__ */ k("div", { className: p, children: [
      t && e.length === 0 ? /* @__PURE__ */ u("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ u(xh, { fullHeight: !0 }) }) : /* @__PURE__ */ u(Ka, { ref: o }),
      /* @__PURE__ */ u("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ u(_h, { ref: s }) }),
      h && /* @__PURE__ */ u(kh, {})
    ] })
  ] });
}, Xa = Rn(
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
    var fe, wt;
    const { token: c, entityId: h, entityType: p } = e;
    gt.validation.validateAuthProps({
      userMpAuthToken: c,
      chatServerUrl: t,
      chatServerKey: n
    });
    const m = Ee(() => gt.url.convertWebSocketToHttp(t), [t]), d = Ee(
      () => new hs({
        apiUrl: m,
        userMpAuthToken: c,
        chatServerKey: n
      }),
      [m, c, n]
    ), y = Ee(() => a && a.length > 0 ? a.map(({ execute: x, ...ge }) => ge) : [], [a]), w = cs(), N = $((x) => x.isModalOpen), S = $((x) => x.isCollapsed), _ = $((x) => x.currentMode), M = $((x) => x.openModal), L = $((x) => x.closeModal), D = $((x) => x.toggleCollapse), T = $((x) => x.toggleFullscreen), O = $((x) => x.setCurrentMode), P = $((x) => x.chatStatus), U = $((x) => x.setChatStatus), F = $((x) => x.streamingStatus), R = $((x) => x.setStreamingStatus), I = $(
      (x) => x.isLoadingConversation
    ), H = $(
      (x) => x.setIsLoadingConversation
    ), B = $((x) => x.conversationError), W = $(
      (x) => x.setConversationError
    ), re = $((x) => x.setCurrentThreadId), Y = $((x) => x.providerResId), de = $((x) => x.setProviderResId), Ie = $((x) => x.isDevSettingsOpen), f = $(
      (x) => x.setIsDevSettingsOpen
    ), J = $((x) => x.isStreaming), Te = $((x) => x.setIsStreaming), g = $((x) => x.isThinking), _e = $((x) => x.setIsThinking), ne = $((x) => x.streamingContent), oe = $((x) => x.isHandlingTool);
    Me(() => {
      i.mode && O(i.mode);
    }, [i.mode, O]), Me(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const x = (ge) => {
        ge.key === "Escape" && _ === "modal" && N && L();
      };
      if (_ === "modal" && N)
        return document.addEventListener("keydown", x), () => document.removeEventListener("keydown", x);
    }, [_, N, L]);
    const {
      messages: Re,
      setMessages: ce,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: Xe,
      getReasoningStatus: Ve,
      getReasoningDuration: lt,
      getReasoningContentOnly: Mt,
      getReasoningTitle: nt,
      getToolingTitle: yt,
      getToolingStatus: je,
      handleSetMessage: kt,
      handleReasoningUpdate: xt,
      handleChatFinished: rt,
      handleChatError: ct,
      stopGeneration: ut
    } = w, bt = Ke(null), ht = Ke(null), $t = te(
      (x) => {
        var ge, pe, ye;
        switch (console.log("[ChatWrapper] System event received:", x), x.type) {
          case Je.CHAT_COMPLETED:
            (ge = x.data) != null && ge.conversationId && de(x.data.conversationId), rt(), setTimeout(() => {
              var at;
              (at = ht.current) == null || at.focus();
            }, 0);
            break;
          case Je.CHAT_ERROR:
            (pe = x.data) != null && pe.error && ct(x.data.error);
            break;
          case Je.CONNECTION_LOST:
            console.log("[ChatWrapper] CONNECTION_LOST event");
            break;
          case Je.CONNECTION_RESTORED:
            console.log("[ChatWrapper] CONNECTION_RESTORED event");
            break;
          case Je.RECONNECTING:
            console.log("[ChatWrapper] RECONNECTING event, attempt:", (ye = x.data) == null ? void 0 : ye.attempt);
            break;
        }
      },
      [rt, ct, de]
    ), {
      chatClient: me,
      isConnected: it,
      // isConnecting, 
      // isReconnecting,
      // reconnectAttempts: reconnectAttempt,
      connectChatClient: E,
      disconnectChatClient: A
    } = Mo({
      // Authentication and server properties
      userMpAuthToken: c,
      chatServerUrl: t,
      chatServerKey: n,
      // Entity configuration
      entityId: h,
      entityType: p,
      // Tools configuration
      tools: a,
      // Other properties
      contextHelpers: s,
      onSetMessage: kt,
      onSystemEvent: $t,
      onReasoningUpdate: xt
    });
    Zi(
      l,
      () => ({
        updateEntityId: (x, ge) => {
          if (!me) {
            console.warn(
              "ChatWrapper: Cannot update entityId - chat client not initialized"
            );
            return;
          }
          if (!Y) {
            console.warn(
              "ChatWrapper: Cannot update entityId - no active conversation (providerResId not set)"
            );
            return;
          }
          if (!ge) {
            console.warn(
              "ChatWrapper: Cannot update entityId - entityType is required"
            );
            return;
          }
          me.updateEntityId(
            Y,
            x,
            ge.toString()
          ).catch((pe) => {
            console.error(
              "ChatWrapper: Failed to update entity attachment:",
              pe
            );
          });
        },
        updateMetadata: (x) => {
          if (!me) {
            console.warn(
              "ChatWrapper: Cannot update metadata - chat client not initialized"
            );
            return;
          }
          if (!Y) {
            console.warn(
              "ChatWrapper: Cannot update metadata - no active conversation (providerResId not set)"
            );
            return;
          }
          me.updateMetadata(Y, x).catch((ge) => {
            console.error(
              "ChatWrapper: Failed to update thread metadata:",
              ge
            );
          });
        }
      }),
      [me, Y]
    );
    const j = Ee(
      () => me ? new ds(me, {
        onError: i.onError
      }) : null,
      [me, i.onError]
    ), {
      resetConversationLoader: q
      /*, reloadConversation*/
    } = us({
      entityId: h,
      entityType: p,
      httpApiUrl: m,
      userMpAuthToken: c,
      chatServerKey: n,
      messages: Re,
      setMessages: ce,
      setIsLoadingConversation: H,
      setConversationError: W,
      setCurrentThreadId: re,
      setProviderResId: de,
      metadata: r
    }), Q = Ke(null), Ce = te(() => {
      Q.current && cancelAnimationFrame(Q.current), Q.current = requestAnimationFrame(() => {
        var x;
        (x = bt.current) == null || x.scrollIntoView({ behavior: "smooth" }), Q.current = null;
      });
    }, []);
    Me(() => {
      Ce();
    }, [Re, Ce]), Me(() => {
      ne && Ce();
    }, [ne, Ce]), Me(() => {
      i.onStreamingStatusChange && i.onStreamingStatusChange(F);
    }, [F, i]), Me(() => () => {
      Q.current && cancelAnimationFrame(Q.current);
    }, []);
    const Ue = te(
      async (x, ge) => {
        if (!x.trim() || J || !j || !me)
          return;
        Te(!0), _e(!0), U(et.SUBMITTED), R(_n.STARTING);
        const pe = j.createUserMessage(x, ge);
        ce((ye) => [...ye, pe]);
        try {
          await me.onTriggerMessage({
            message: pe.content,
            media: ge,
            providerResId: Y || void 0
          }), U(et.STREAMING);
        } catch (ye) {
          _e(!1), U(et.ERROR), ce(
            (at) => at.map(
              (Zt) => Zt.id === pe.id ? {
                ...Zt,
                hasError: !0,
                errorMessage: it ? ye instanceof Error ? ye.message : "Failed to send message" : "Failed to send message."
              } : Zt
            )
          ), Te(!1), U(et.IDLE), R(_n.IDLE);
        }
      },
      [
        j,
        me,
        J,
        it,
        ce,
        Te,
        _e,
        U,
        R,
        Y
      ]
    ), xe = te(
      async (x) => await d.uploadFiles(x),
      [d]
    ), Ye = Ee(
      () => gt.css.getContainerClasses(
        _,
        i.position,
        i.theme,
        S,
        i.constrainedHeight
      ),
      [
        _,
        i.position,
        i.theme,
        S,
        i.constrainedHeight
      ]
    ), be = te(() => {
      _ === "modal" ? M() : D();
    }, [_, M, D]), he = te(() => {
      f(!0);
    }, [f]), $e = te(
      (x) => {
        ht.current && ht.current.setText(x.description);
      },
      []
    ), Ae = Ee(
      () => ({
        messages: Re,
        isStreaming: J,
        isThinking: g,
        isHandlingTool: oe
      }),
      [Re, J, g, oe]
    ), un = Ee(
      () => ({
        isLoadingConversation: I,
        chatStatus: P,
        conversationError: B
      }),
      [I, P, B]
    ), Lt = Ee(
      () => {
        var x;
        return {
          headerName: i.headerName,
          headerDescription: i.headerDescription,
          placeholderTexts: i.placeholderTexts,
          chipName: i.chipName,
          chipLogo: i.chipLogo,
          suggestedPrompts: i.suggestedPrompts,
          clientTools: y,
          fileUploadEnabled: (x = i.features) == null ? void 0 : x.fileUpload
        };
      },
      [
        i.headerName,
        i.headerDescription,
        i.placeholderTexts,
        i.chipName,
        i.chipLogo,
        i.suggestedPrompts,
        (fe = i.features) == null ? void 0 : fe.fileUpload,
        y
      ]
    ), Ot = Ee(
      () => ({
        getReasoningTitle: nt,
        getReasoningStatus: Ve,
        getReasoningDuration: lt,
        getReasoningContentOnly: Mt,
        getToolingTitle: yt,
        getToolingStatus: je
      }),
      [
        nt,
        Ve,
        lt,
        Mt,
        yt,
        je
      ]
    ), hn = te(async (x) => {
      console.log("ChatWrapper: Retrying message:", x);
      const ge = Re.find((pe) => pe.id === x);
      if (!ge) {
        console.warn("ChatWrapper: Message not found for retry:", x);
        return;
      }
      console.log("[handleRetryMessage] Marking message as retrying:", x), ce((pe) => (console.log("[handleRetryMessage] Marking message as retrying, messageId:", x), pe.map(
        (ye) => ye.id === x ? { ...ye, hasError: !1, isRetrying: !0, errorMessage: void 0 } : ye
      )));
      try {
        q(), await E(), await (me == null ? void 0 : me.onTriggerMessage({
          message: ge.content,
          media: ge.media,
          providerResId: Y || void 0
        })), ce(
          (pe) => pe.map(
            (ye) => ye.id === x ? { ...ye, isRetrying: !1 } : ye
          )
        ), console.log("[handleRetryMessage] Retry succeeded for message:", x);
      } catch (pe) {
        console.log("[handleRetryMessage] Retry failed for message:", x, pe), ce(
          (ye) => ye.map(
            (at) => at.id === x ? {
              ...at,
              isRetrying: !1,
              hasError: !0,
              errorMessage: pe instanceof Error ? pe.message : "Retry failed"
            } : at
          )
        );
      }
    }, [Re, ce, q, E, Ue]), vt = Ee(
      () => ({
        onSubmit: Ue,
        onFileUpload: xe,
        onStopGeneration: ut,
        onPromptSelect: $e,
        onRetryMessage: hn
      }),
      [Ue, xe, ut, $e, hn]
    ), On = Ee(
      () => ({
        ...Ae,
        ...un,
        ...Lt,
        ...Ot,
        ...vt,
        currentAssistantMessageIdRef: Xe,
        messagesEndRef: bt,
        chatInputRef: ht
      }),
      [
        Ae,
        un,
        Lt,
        Ot,
        vt,
        Xe,
        bt,
        ht
      ]
    );
    return Ee(
      () => gt.state.shouldShowBubble(
        _,
        N,
        S
      ),
      [_, N, S]
    ) ? /* @__PURE__ */ u(ei, { children: /* @__PURE__ */ u(
      Ts,
      {
        mode: _,
        headerName: i.headerName,
        bubbleText: i.bubbleText,
        showBubbleText: ((wt = i.features) == null ? void 0 : wt.showBubbleText) !== !1,
        onClick: be
      }
    ) }) : /* @__PURE__ */ u(ei, { children: /* @__PURE__ */ u(
      gs,
      {
        onError: (x) => {
          console.error("WebSocket error in ChatWrapper:", x), i.onError && i.onError(x);
        },
        children: /* @__PURE__ */ k("div", { className: Ye, style: i.customStyles, children: [
          o && i.headerVisible === !1 && /* @__PURE__ */ u(
            "button",
            {
              className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
              onClick: he,
              title: "Developer Settings",
              children: /* @__PURE__ */ u(ia, { size: 16 })
            }
          ),
          gt.state.shouldShowHeader(i.headerVisible) && /* @__PURE__ */ u(
            _s,
            {
              headerName: i.headerName,
              mode: _,
              isCollapsed: S,
              isModalOpen: N,
              devMode: o,
              onClose: L,
              onToggleFullscreen: T,
              onToggleCollapse: D,
              onOpenSettings: he
            }
          ),
          !S && /* @__PURE__ */ u(
            ms,
            {
              onError: (x) => {
                console.error("File upload error:", x), i.onError && i.onError(x);
              },
              children: /* @__PURE__ */ u(ph, { value: On, children: /* @__PURE__ */ u(vh, {}) })
            }
          ),
          /* @__PURE__ */ u(
            To,
            {
              isOpen: Ie,
              onClose: () => f(!1),
              apiUrl: m,
              userMpAuthToken: c,
              chatServerKey: n,
              onDisconnect: A,
              isConnected: it
            }
          )
        ] })
      }
    ) });
  }
);
Xa.displayName = "ChatWrapperContainer";
const qh = $i(Xa);
function Xh({
  isConnected: e,
  isConnecting: t = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 1 / 0,
  onRetry: a,
  autoHideDuration: o = 3e3
}) {
  const [s, l] = ae("hidden"), [c, h] = ae(!1);
  if (Me(() => {
    console.log("[ConnectionNotification] State update:", {
      isConnected: e,
      isConnecting: t,
      isReconnecting: n,
      reconnectAttempt: r,
      wasDisconnected: c,
      currentState: s
    }), t ? l("connecting") : !e && !n ? (h(!0), i !== 1 / 0 && r >= i ? l("error") : l("hidden")) : n ? (console.log("[ConnectionNotification] Setting state to RECONNECTING"), l("reconnecting")) : e && c ? (l("hidden"), h(!1)) : e && !c && l("hidden");
  }, [e, t, n, r, i, c, o]), s === "hidden")
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
  return d ? s === "connecting" ? /* @__PURE__ */ u("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ k("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ u("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ u("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ u("div", { className: "connection-notification__bubble" })
  ] }) }) : s === "reconnecting" ? (console.log("[ConnectionNotification] RENDERING RECONNECTING BANNER", { reconnectAttempt: r }), /* @__PURE__ */ u("div", { className: `connection-notification connection-notification--banner connection-notification--${s}`, children: /* @__PURE__ */ k("div", { className: "connection-notification__banner-content", children: [
    /* @__PURE__ */ u("span", { className: "connection-notification__banner-spinner" }),
    /* @__PURE__ */ k("span", { className: "connection-notification__banner-text", children: [
      "Reconnecting... (attempt ",
      r,
      ")"
    ] })
  ] }) })) : /* @__PURE__ */ u("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ k("div", { className: "connection-notification__content", children: [
    /* @__PURE__ */ u("div", { className: "connection-notification__icon", children: d.icon }),
    /* @__PURE__ */ u("div", { className: "connection-notification__title", children: d.title }),
    /* @__PURE__ */ u("div", { className: "connection-notification__message", children: d.message }),
    a && /* @__PURE__ */ u("div", { className: "connection-notification__actions", children: /* @__PURE__ */ u(
      "button",
      {
        className: "connection-notification__retry-btn primary",
        onClick: p,
        children: "Try Again"
      }
    ) })
  ] }) }) : null;
}
var Ih = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(Ih || {});
export {
  Th as AnimatedPlaceholder,
  et as CHAT_STATUS,
  Cs as ChatIcon,
  qh as ChatWrapper,
  ys as CloseIcon,
  Ss as CollapseIcon,
  Xh as ConnectionNotification,
  Es as CopyIcon,
  To as DevSettings,
  Ih as EntityType,
  ws as FullscreenIcon,
  xh as InlineLoader,
  Va as Loader,
  Le as PROCESSING_STATUS,
  Ch as PromptInput,
  Sh as PromptInputButton,
  Vh as PromptInputModelSelect,
  $h as PromptInputModelSelectContent,
  Zh as PromptInputModelSelectItem,
  jh as PromptInputModelSelectTrigger,
  Kh as PromptInputModelSelectValue,
  Eh as PromptInputSubmit,
  qa as PromptInputTextarea,
  yh as PromptInputToolbar,
  wh as PromptInputTools,
  ch as Reasoning,
  Ga as ReasoningContent,
  Wa as ReasoningTrigger,
  _n as STREAMING_STATUS,
  ia as SettingsIcon,
  kh as SuggestedPrompts,
  io as fetchThreadMessages,
  Mh as isChatActive,
  Oh as isChatError,
  Lh as isChatIdle,
  Dh as isProcessingActive,
  Ph as isProcessingComplete,
  Hh as isProcessingError,
  Ki as updateThread,
  qi as updateThreadMetadata,
  Uh as useChatState,
  zh as useConversationState,
  Wh as useDevState,
  Fh as useLayoutState,
  Bh as useThreadState,
  Gh as useUIState,
  $ as useUIStore
};
