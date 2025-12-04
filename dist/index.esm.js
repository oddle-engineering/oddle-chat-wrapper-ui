var go = Object.defineProperty;
var mo = (e, t, n) => t in e ? go(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var q = (e, t, n) => mo(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as u, jsxs as I, Fragment as bt } from "react/jsx-runtime";
import St, { useState as fe, useEffect as ve, useCallback as ae, useRef as Oe, useMemo as Me, Component as Nr, createContext as Co, useContext as yo, memo as oa, forwardRef as Bn, useImperativeHandle as sa } from "react";
const tt = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, Ut = {
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
}, fr = (e) => e === tt.SUBMITTED || e === tt.STREAMING, sh = (e) => e === tt.IDLE, lh = (e) => e === tt.ERROR, ch = (e) => e === $e.PROCESSING, uh = (e) => e === $e.COMPLETED, dh = (e) => e === $e.ERROR;
var wo = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(wo || {}), Xe = /* @__PURE__ */ ((e) => (e.DISCONNECTED = "disconnected", e.CONNECTING = "connecting", e.CONNECTED = "connected", e.RECONNECTING = "reconnecting", e))(Xe || {});
async function ko(e, t) {
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
async function So(e, t, n) {
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
async function xo(e, t, n) {
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
async function la(e, t, n, r) {
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
async function ca(e, t, n, r) {
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
const ti = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), r = (d, l) => {
    const f = typeof d == "function" ? d(t) : d;
    if (!Object.is(f, t)) {
      const m = t;
      t = l ?? (typeof f != "object" || f === null) ? f : Object.assign({}, t, f), n.forEach((g) => g(t, m));
    }
  }, i = () => t, s = { setState: r, getState: i, getInitialState: () => c, subscribe: (d) => (n.add(d), () => n.delete(d)) }, c = t = e(r, i, s);
  return s;
}, To = (e) => e ? ti(e) : ti, bo = (e) => e;
function Eo(e, t = bo) {
  const n = St.useSyncExternalStore(
    e.subscribe,
    St.useCallback(() => t(e.getState()), [e, t]),
    St.useCallback(() => t(e.getInitialState()), [e, t])
  );
  return St.useDebugValue(n), n;
}
const _o = (e) => {
  const t = To(e), n = (r) => Eo(t, r);
  return Object.assign(n, t), n;
}, vo = (e) => _o, ni = { BASE_URL: "/", DEV: !0, MODE: "production", PROD: !1, SSR: !1, VITE_APP_TOLGEE_API_KEY: "tgpak_ge4v6ytcm5xtozdlobzxk4twgyzwqntjoe3xi4bwozygu5q", VITE_APP_TOLGEE_API_URL: "https://tolgee-translation.oddleapp.com", VITE_APP_TOLGEE_PROJECT_ID: "19", VITE_USER_NODE_ENV: "development" }, gn = /* @__PURE__ */ new Map(), En = (e) => {
  const t = gn.get(e);
  return t ? Object.fromEntries(
    Object.entries(t.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, Io = (e, t, n) => {
  if (e === void 0)
    return {
      type: "untracked",
      connection: t.connect(n)
    };
  const r = gn.get(n.name);
  if (r)
    return { type: "tracked", store: e, ...r };
  const i = {
    connection: t.connect(n),
    stores: {}
  };
  return gn.set(n.name, i), { type: "tracked", store: e, ...i };
}, Ro = (e, t) => {
  if (t === void 0) return;
  const n = gn.get(e);
  n && (delete n.stores[t], Object.keys(n.stores).length === 0 && gn.delete(e));
}, Mo = (e) => {
  var t, n;
  if (!e) return;
  const r = e.split(`
`), i = r.findIndex(
    (o) => o.includes("api.setState")
  );
  if (i < 0) return;
  const a = ((t = r[i + 1]) == null ? void 0 : t.trim()) || "";
  return (n = /.+ (.+) .+/.exec(a)) == null ? void 0 : n[1];
}, Ao = (e, t = {}) => (n, r, i) => {
  const { enabled: a, anonymousActionType: o, store: s, ...c } = t;
  let d;
  try {
    d = (a ?? (ni ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!d)
    return e(n, r, i);
  const { connection: l, ...f } = Io(s, d, c);
  let m = !0;
  i.setState = (x, R, T) => {
    const M = n(x, R);
    if (!m) return M;
    const P = T === void 0 ? {
      type: o || Mo(new Error().stack) || "anonymous"
    } : typeof T == "string" ? { type: T } : T;
    return s === void 0 ? (l == null || l.send(P, r()), M) : (l == null || l.send(
      {
        ...P,
        type: `${s}/${P.type}`
      },
      {
        ...En(c.name),
        [s]: i.getState()
      }
    ), M);
  }, i.devtools = {
    cleanup: () => {
      l && typeof l.unsubscribe == "function" && l.unsubscribe(), Ro(c.name, s);
    }
  };
  const g = (...x) => {
    const R = m;
    m = !1, n(...x), m = R;
  }, S = e(i.setState, r, i);
  if (f.type === "untracked" ? l == null || l.init(S) : (f.stores[f.store] = i, l == null || l.init(
    Object.fromEntries(
      Object.entries(f.stores).map(([x, R]) => [
        x,
        x === f.store ? S : R.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let x = !1;
    const R = i.dispatch;
    i.dispatch = (...T) => {
      (ni ? "production" : void 0) !== "production" && T[0].type === "__setState" && !x && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), x = !0), R(...T);
    };
  }
  return l.subscribe((x) => {
    var R;
    switch (x.type) {
      case "ACTION":
        if (typeof x.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return Kn(
          x.payload,
          (T) => {
            if (T.type === "__setState") {
              if (s === void 0) {
                g(T.state);
                return;
              }
              Object.keys(T.state).length !== 1 && console.error(
                `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
              );
              const M = T.state[s];
              if (M == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(M) && g(M);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(T);
          }
        );
      case "DISPATCH":
        switch (x.payload.type) {
          case "RESET":
            return g(S), s === void 0 ? l == null ? void 0 : l.init(i.getState()) : l == null ? void 0 : l.init(En(c.name));
          case "COMMIT":
            if (s === void 0) {
              l == null || l.init(i.getState());
              return;
            }
            return l == null ? void 0 : l.init(En(c.name));
          case "ROLLBACK":
            return Kn(x.state, (T) => {
              if (s === void 0) {
                g(T), l == null || l.init(i.getState());
                return;
              }
              g(T[s]), l == null || l.init(En(c.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return Kn(x.state, (T) => {
              if (s === void 0) {
                g(T);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(T[s]) && g(T[s]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: T } = x.payload, M = (R = T.computedStates.slice(-1)[0]) == null ? void 0 : R.state;
            if (!M) return;
            g(s === void 0 ? M : M[s]), l == null || l.send(
              null,
              // FIXME no-any
              T
            );
            return;
          }
          case "PAUSE_RECORDING":
            return m = !m;
        }
        return;
    }
  }), S;
}, No = Ao, Kn = (e, t) => {
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
}, Lo = (e) => ({
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
}), Oo = (e) => ({
  // Initial state
  chatStatus: tt.IDLE,
  streamingStatus: Ut.IDLE,
  // Actions
  setChatStatus: (t) => e({ chatStatus: t }),
  setStreamingStatus: (t) => e({ streamingStatus: t }),
  resetChatStatus: () => e({
    chatStatus: tt.IDLE,
    streamingStatus: Ut.IDLE
  })
}), Do = (e) => ({
  // Initial state
  isLoadingConversation: !1,
  conversationError: null,
  // Actions
  setIsLoadingConversation: (t) => e({ isLoadingConversation: t }),
  setConversationError: (t) => e({ conversationError: t }),
  clearConversationError: () => e({ conversationError: null })
}), Po = (e) => ({
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
}), Fo = (e) => ({
  // Initial state
  isDevSettingsOpen: !1,
  // Actions
  setIsDevSettingsOpen: (t) => e({ isDevSettingsOpen: t }),
  toggleDevSettings: () => e((t) => ({ isDevSettingsOpen: !t.isDevSettingsOpen }))
}), Ho = (e) => ({
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
}), ee = vo()(
  No(
    (...e) => ({
      ...Lo(...e),
      ...Oo(...e),
      ...Do(...e),
      ...Po(...e),
      ...Fo(...e),
      ...Ho(...e)
    }),
    {
      name: "ChatUI-Store"
    }
  )
), hh = () => ee((e) => ({
  isModalOpen: e.isModalOpen,
  isCollapsed: e.isCollapsed,
  currentMode: e.currentMode,
  openModal: e.openModal,
  closeModal: e.closeModal,
  toggleCollapse: e.toggleCollapse,
  toggleFullscreen: e.toggleFullscreen
})), ph = () => ee((e) => ({
  chatStatus: e.chatStatus,
  streamingStatus: e.streamingStatus,
  setChatStatus: e.setChatStatus,
  setStreamingStatus: e.setStreamingStatus,
  resetChatStatus: e.resetChatStatus
})), fh = () => ee((e) => ({
  isLoadingConversation: e.isLoadingConversation,
  conversationError: e.conversationError,
  setIsLoadingConversation: e.setIsLoadingConversation,
  setConversationError: e.setConversationError,
  clearConversationError: e.clearConversationError
})), gh = () => ee((e) => ({
  currentThreadId: e.currentThreadId,
  providerResId: e.providerResId,
  setCurrentThreadId: e.setCurrentThreadId,
  setProviderResId: e.setProviderResId,
  clearThreadData: e.clearThreadData
})), mh = () => ee((e) => ({
  isDevSettingsOpen: e.isDevSettingsOpen,
  setIsDevSettingsOpen: e.setIsDevSettingsOpen,
  toggleDevSettings: e.toggleDevSettings
})), zo = "1.0.10", Uo = ({
  isOpen: e,
  onClose: t,
  apiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  app: a = "UD21"
  // Default to UD21 if not specified
}) => {
  const [o, s] = fe(null), [c, d] = fe(""), [l, f] = fe(""), m = ee((H) => H.providerResId), [g, S] = fe(""), [x, R] = fe("BRAND"), [T, M] = fe(""), [P, F] = fe(""), [N, b] = fe(!1), [G, Z] = fe(null), [$, ne] = fe(null), [Y, W] = fe("agent");
  ve(() => {
    e && !o && O();
  }, [e]);
  const O = ae(async () => {
    b(!0), Z(null);
    try {
      const H = await ko(n, {
        userMpAuthToken: r,
        chatServerKey: i
      });
      if (!H)
        throw new Error(`No configuration found for app: ${a}`);
      s(H), d(H.promptPath), f(H.versionUuid);
    } catch (H) {
      Z(
        H instanceof Error ? H.message : "Failed to fetch configuration"
      ), console.error("Error fetching agent configuration:", H);
    } finally {
      b(!1);
    }
  }, [n, a, r, i]), A = ae(async () => {
    if (o) {
      b(!0), Z(null);
      try {
        const H = await So(
          n,
          {
            app: o.app,
            promptPath: c,
            versionUuid: l,
            isDefault: o.isDefault
          },
          {
            userMpAuthToken: r,
            chatServerKey: i
          }
        );
        s(H), t(), window.location.reload();
      } catch (H) {
        Z(
          H instanceof Error ? H.message : "Failed to update configuration"
        ), console.error("Error updating agent configuration:", H);
      } finally {
        b(!1);
      }
    }
  }, [
    n,
    c,
    l,
    o,
    t,
    r,
    i
  ]), B = ae(async () => {
    if (!m) {
      Z("No active conversation to attach");
      return;
    }
    b(!0), Z(null), ne(null);
    try {
      let H;
      if (P.trim())
        try {
          H = JSON.parse(P);
        } catch {
          throw new Error("Invalid JSON in metadata field");
        }
      const we = g && x, Te = T || H;
      if (we && await la(
        n,
        m,
        {
          entityId: g,
          entityType: x
        },
        {
          userMpAuthToken: r,
          chatServerKey: i
        }
      ), Te && await ca(
        n,
        m,
        {
          tag: T || void 0,
          metadata: H
        },
        {
          userMpAuthToken: r,
          chatServerKey: i
        }
      ), !we && !Te) {
        Z("Please provide at least one field to update");
        return;
      }
      ne("Thread updated successfully!"), setTimeout(() => {
        S(""), R("BRAND"), M(""), F(""), ne(null);
      }, 2e3);
    } catch (H) {
      Z(H instanceof Error ? H.message : "Failed to update thread"), console.error("Error updating thread:", H);
    } finally {
      b(!1);
    }
  }, [
    m,
    n,
    g,
    x,
    T,
    P,
    r,
    i
  ]), Q = ae(() => {
    o && (d(o.promptPath), f(o.versionUuid)), Z(null), t();
  }, [o, t]);
  return e ? /* @__PURE__ */ u("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ I("div", { children: [
        /* @__PURE__ */ u("h3", { children: "Developer Settings" }),
        /* @__PURE__ */ I(
          "span",
          {
            style: { fontSize: "12px", color: "#888", marginLeft: "8px" },
            children: [
              "v",
              zo
            ]
          }
        )
      ] }),
      /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: Q,
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
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-tabs", children: [
      /* @__PURE__ */ u(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${Y === "agent" ? "active" : ""}`,
          onClick: () => W("agent"),
          children: "Agent Config"
        }
      ),
      /* @__PURE__ */ u(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${Y === "thread" ? "active" : ""}`,
          onClick: () => W("thread"),
          children: "Thread Attachment"
        }
      )
    ] }),
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-content", children: [
      $ && /* @__PURE__ */ u("div", { className: "chat-wrapper__dev-settings-success", children: $ }),
      N && /* @__PURE__ */ u("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      G && /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ I("p", { children: [
          "Error: ",
          G
        ] }),
        /* @__PURE__ */ u(
          "button",
          {
            onClick: Y === "agent" ? O : void 0,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      Y === "agent" && o && !N && /* @__PURE__ */ I(bt, { children: [
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ u("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ u(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: c,
              onChange: (H) => d(H.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: N
            }
          ),
          /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ u("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ u(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: l,
              onChange: (H) => f(H.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: N
            }
          ),
          /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ u("label", { htmlFor: "app-name", children: "App:" }),
          /* @__PURE__ */ u(
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
          /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "Application name for this agent configuration." })
        ] })
      ] }),
      Y === "thread" && !N && /* @__PURE__ */ I(bt, { children: [
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-info", children: [
          /* @__PURE__ */ I("p", { children: [
            /* @__PURE__ */ u("strong", { children: "Provider Resource ID:" }),
            " ",
            m || "No active conversation"
          ] }),
          /* @__PURE__ */ u(
            "p",
            {
              style: { fontSize: "12px", color: "#666", marginTop: "8px" },
              children: "Note: Entity ownership is typically set at initialization. Use this to update business context."
            }
          )
        ] }),
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-section", children: [
          /* @__PURE__ */ u(
            "h4",
            {
              style: {
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "600"
              },
              children: "Update Business Context"
            }
          ),
          /* @__PURE__ */ u(
            "p",
            {
              style: {
                marginBottom: "12px",
                fontSize: "12px",
                color: "#666"
              },
              children: "Update dynamic metadata like order IDs, table IDs, status, etc."
            }
          ),
          /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
            /* @__PURE__ */ u("label", { htmlFor: "tag", children: "Tag:" }),
            /* @__PURE__ */ u(
              "input",
              {
                id: "tag",
                type: "text",
                value: T,
                onChange: (H) => M(H.target.value),
                placeholder: "e.g., customer-inquiry, support",
                className: "chat-wrapper__dev-settings-input",
                disabled: N || !m
              }
            ),
            /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "Optional tag for categorizing the thread." })
          ] }),
          /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
            /* @__PURE__ */ u("label", { htmlFor: "metadata", children: "Metadata (JSON):" }),
            /* @__PURE__ */ u(
              "textarea",
              {
                id: "metadata",
                value: P,
                onChange: (H) => F(H.target.value),
                placeholder: '{"orderId": "order_789", "tableId": "table_5", "status": "pending"}',
                className: "chat-wrapper__dev-settings-input",
                rows: 4,
                disabled: N || !m
              }
            ),
            /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "App-specific business data (orderId, tableId, campaignId, etc.)." })
          ] })
        ] }),
        /* @__PURE__ */ u(
          "div",
          {
            style: { borderTop: "1px solid #e0e0e0", margin: "20px 0" }
          }
        ),
        /* @__PURE__ */ I("details", { style: { marginTop: "16px" }, children: [
          /* @__PURE__ */ u(
            "summary",
            {
              style: {
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
                color: "#666"
              },
              children: "Advanced: Change Entity Ownership (Rare)"
            }
          ),
          /* @__PURE__ */ I(
            "div",
            {
              style: {
                marginTop: "12px",
                padding: "12px",
                backgroundColor: "#f9f9f9",
                borderRadius: "4px"
              },
              children: [
                /* @__PURE__ */ u(
                  "p",
                  {
                    style: {
                      fontSize: "12px",
                      color: "#666",
                      marginBottom: "12px"
                    },
                    children: "⚠️ Entity is typically set at initialization. Only change this if transferring conversation ownership."
                  }
                ),
                /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
                  /* @__PURE__ */ u("label", { htmlFor: "entity-id", children: "Entity ID:" }),
                  /* @__PURE__ */ u(
                    "input",
                    {
                      id: "entity-id",
                      type: "text",
                      value: g,
                      onChange: (H) => S(H.target.value),
                      placeholder: "e.g., brand_123 or account_456",
                      className: "chat-wrapper__dev-settings-input",
                      disabled: N || !m
                    }
                  ),
                  /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "The brand or account ID to attach this thread to." })
                ] }),
                /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
                  /* @__PURE__ */ u("label", { htmlFor: "entity-type", children: "Entity Type:" }),
                  /* @__PURE__ */ I(
                    "select",
                    {
                      id: "entity-type",
                      value: x,
                      onChange: (H) => R(
                        H.target.value
                      ),
                      className: "chat-wrapper__dev-settings-input",
                      disabled: N || !m,
                      children: [
                        /* @__PURE__ */ u("option", { value: "", children: "-- Select Type --" }),
                        /* @__PURE__ */ u("option", { value: "BRAND", children: "BRAND" }),
                        /* @__PURE__ */ u("option", { value: "ACCOUNT", children: "ACCOUNT" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "Type of entity (BRAND or ACCOUNT)." })
                ] })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: Q,
          disabled: N,
          children: "Cancel"
        }
      ),
      Y === "agent" && /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: A,
          disabled: N || !o,
          children: N ? "Saving..." : "Save & Reload"
        }
      ),
      Y === "thread" && /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: B,
          disabled: N || !m,
          children: N ? "Updating..." : "Update Thread"
        }
      )
    ] })
  ] }) }) : null;
}, Bo = {
  maxReconnectAttempts: 1 / 0,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, _n = {
  NORMAL: 1e3,
  // Normal closure
  GOING_AWAY: 1001
};
var ct = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(ct || {}), yt = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e.STOP_RUN = "stop_run", e))(yt || {}), Ke = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.THREAD_CREATED = "thread_created", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(Ke || {}), Nn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(Nn || {}), Pt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(Pt || {});
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
    return this.createConnectionEvent(ct.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(ct.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(ct.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(ct.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(ct.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(ct.CHAT_ERROR, { error: t, errorCode: n });
  }
}
class At {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(t) {
    return {
      type: yt.CHAT_MESSAGE,
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
      type: yt.CONFIGURE_TOOLS,
      toolSchemas: t,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(t) {
    return {
      type: yt.UPDATE_TOOLS,
      toolSchemas: t
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(t) {
    return {
      type: yt.UPDATE_CONTEXT_HELPERS,
      contextHelpers: t
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(t, n) {
    return {
      type: yt.TOOL_CALL_RESPONSE,
      callId: t,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(t, n) {
    return {
      type: yt.TOOL_CALL_RESPONSE,
      callId: t,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: yt.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(t, n) {
    return {
      type: yt.HEARTBEAT_PONG,
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
      type: yt.STOP_RUN,
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
class Wo {
  constructor(t, n) {
    q(this, "ws", null);
    q(this, "config");
    q(this, "connectionState");
    q(this, "reconnectTimer", null);
    q(this, "heartbeatInterval", null);
    q(this, "visibilityChangeHandler");
    q(this, "currentTicket", null);
    q(this, "intentionalDisconnect", !1);
    // Track intentional disconnects
    q(this, "justRefreshedTicket", !1);
    // Track if ticket was just refreshed to skip duplicate validation
    q(this, "onOpen");
    q(this, "onMessage");
    q(this, "onError");
    q(this, "onClose");
    q(this, "onSystemEvent");
    q(this, "onTicketRefresh");
    q(this, "onTicketValidate");
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
      NORMAL: _n.NORMAL,
      GOING_AWAY: _n.GOING_AWAY
    }), this.intentionalDisconnect)
      return console.log("[WebSocketManager] Intentional disconnect - no reconnect"), !1;
    const { NORMAL: n } = _n, r = t !== n;
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
    this.ws && this.ws.close(_n.NORMAL);
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
class Go {
  constructor() {
    q(this, "state");
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
class Pn {
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
class ua {
  constructor(t = {}) {
    q(this, "handlers", {});
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
}, ze = {
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
  getMessageType: (e, t) => t === !1 ? ze.isErrorMessage(e) ? te.MESSAGE_TYPES.ERROR : (ze.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || ze.isThinkingMessage(e), te.MESSAGE_TYPES.THOUGHT) : ze.isCompletedMessage(e) ? te.MESSAGE_TYPES.COMPLETED : ze.isErrorMessage(e) ? te.MESSAGE_TYPES.ERROR : (ze.isHandlingMessage(e) || ze.isThinkingMessage(e) && !e.includes(te.UI_TEXT.AI_IS_THINKING), te.MESSAGE_TYPES.THINKING)
};
class Vo extends ua {
  constructor(n) {
    super({ onReasoningUpdate: n });
    q(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    q(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, o) {
    const s = this.getHandler("onReasoningUpdate");
    if (!s) return;
    const c = Pn.createReasoningCall(
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
class $o extends ua {
  constructor(n = {}, r) {
    super({ onReasoningUpdate: r });
    q(this, "processedToolCalls", /* @__PURE__ */ new Set());
    q(this, "clientTools", {});
    q(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var o, s, c;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (o = this.getHandler("onReasoningUpdate")) == null || o(!0, `${te.HANDLING_MARKER} ${i}`, n);
      try {
        const d = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, d), (s = this.getHandler("onReasoningUpdate")) == null || s(!1, `${te.COMPLETED_MARKER} ${i}`, n);
      } catch (d) {
        this.sendToolError(r, d), (c = this.getHandler("onReasoningUpdate")) == null || c(!1, `${te.ERROR_MARKER} Error: ${i} - ${d}`, n);
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
      const a = Pn.createLatitudeToolCall(
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
      const a = Pn.createLatitudeToolCall(
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
class jo {
  constructor(t, n = {}) {
    q(this, "reasoningHandler");
    q(this, "toolHandler");
    q(this, "handlers");
    q(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new Vo(t.onReasoningUpdate), this.toolHandler = new $o(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
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
  handleChatEvent(t) {
    var n, r, i;
    switch (t.event) {
      case Nn.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case Nn.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case Nn.CONTENT_DELTA:
        (n = t.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, t.data.delta));
        break;
    }
  }
  handleProviderEvent(t) {
    var r, i, a;
    switch ((r = t.data) == null ? void 0 : r.type) {
      case Pt.TEXT_DELTA:
        t.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, t.data.textDelta));
        break;
      case Pt.REASONING_START:
        this.reasoningHandler.handleReasoningStart(t.data);
        break;
      case Pt.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(t.data);
        break;
      case Pt.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(t.data);
        break;
      case Pt.TOOL_CALL:
        this.toolHandler.handleServerToolCall(t.data);
        break;
      case Pt.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(t.data);
        break;
    }
  }
  handleLatitudeEvent(t) {
    var n;
    if (((n = t.data) == null ? void 0 : n.type) === Pt.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = t.data;
      if (r.toolCallId && r.toolName) {
        const i = Pn.createServerToolCall(
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
    const n = At.serializeHeartbeatPong(
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
async function qo(e, t, n = 1e4) {
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
function ri(e) {
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
async function Zo(e, t, n, r) {
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
function Ko(e) {
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
function Qt(e, t) {
  const n = Ko(e);
  return console.error(`[${t}] Error occurred:`, {
    error: (e == null ? void 0 : e.message) || e,
    classification: n,
    shouldRetry: n.isRetryable
  }), n;
}
class Xo {
  constructor(t, n, r = {}) {
    q(this, "ticket", null);
    q(this, "refreshPromise", null);
    q(this, "validationInterval", null);
    q(this, "authData");
    q(this, "apiUrl");
    q(this, "config");
    this.authData = t, this.apiUrl = this.convertToHttpUrl(n), this.config = {
      checkInterval: r.checkInterval ?? 6e4,
      renewalThreshold: r.renewalThreshold ?? 300,
      maxRetries: r.maxRetries ?? 3,
      retryBaseDelay: r.retryBaseDelay ?? 1e3,
      requestTimeout: r.requestTimeout ?? 1e4
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
        return this.ticket = await qo(
          this.apiUrl,
          this.authData,
          this.config.requestTimeout
        ), console.log("TicketManager: Ticket received successfully", {
          hasTicket: !!this.ticket.ticket,
          expiresAt: this.ticket.expiresAt
        }), this.ticket.ticket;
      } catch (i) {
        const a = Qt(i, "TicketManager");
        if (!a.isRetryable)
          throw new Error(
            `Ticket refresh failed (non-retryable - ${a.reason}): ${i instanceof Error ? i.message : "Unknown error"}`
          );
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
      const r = ri(this.ticket).expiresIn / 1e3;
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
      r.isRetryable || (console.warn(
        `TicketManager: Stopping proactive renewal due to non-retryable error: ${r.reason}`
      ), this.stopProactiveRenewal());
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
      const t = await Zo(
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
        return ri(this.ticket).expiresIn;
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
class Yo {
  constructor() {
    q(this, "config");
    q(this, "connectionState");
    q(this, "wsManager");
    q(this, "messageHandler");
    q(this, "initResolve");
    q(this, "initReject");
    // Client tools and context
    q(this, "toolSchemas", []);
    q(this, "contextHelpers", {});
    // Ticket management - now centralized in TicketManager
    q(this, "ticketManager", null);
    // Authentication credentials for HTTP API calls
    q(this, "authCredentials", {});
    this.config = {
      ...Bo
    }, this.connectionState = new Go(), this.wsManager = new Wo(this.config, this.connectionState), this.messageHandler = new jo({}), this.setupWebSocketHandlers();
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
        if (console.log("[WebSocketChatClient] Providing fresh ticket for reconnection..."), !this.ticketManager)
          throw new Error("TicketManager not available for ticket refresh");
        return await this.ticketManager.getValidTicket();
      },
      onTicketValidate: async () => {
        if (console.log("[WebSocketChatClient] Validating current ticket with server API..."), !this.ticketManager)
          return console.warn("[WebSocketChatClient] TicketManager not available for validation"), !1;
        try {
          const t = await this.ticketManager.validateWithServer();
          return console.log(`[WebSocketChatClient] Server validation result: ${t.valid ? "valid" : "invalid"}`, {
            error: t.error,
            code: t.code,
            retryable: t.retryable
          }), t.valid;
        } catch (t) {
          return console.error("[WebSocketChatClient] Server validation failed:", t), !1;
        }
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
    ), this.handleAuthenticationFailure(n)), (n == null ? void 0 : n.type) === Ke.THREAD_CREATED) {
      (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onThreadCreated) == null || i.call(r, n.data);
      return;
    }
    if ((n == null ? void 0 : n.type) === Ke.TOOLS_CONFIGURED) {
      (a = this.initResolve) == null || a.call(this);
      return;
    }
    (n == null ? void 0 : n.type) === Ke.SESSION_ESTABLISHED && (this.toolSchemas && this.toolSchemas.length > 0 ? this.sendToolConfiguration() : (o = this.initResolve) == null || o.call(this));
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
      const o = Qt(a, "TicketRefresh");
      o.isRetryable || console.warn(`[WebSocketClient] Ticket refresh failed, will not retry: ${o.reason}`), (s = this.initReject) == null || s.call(this, a);
    })) : (i = this.initReject) == null || i.call(
      this,
      new Error(`Authentication failed: ${n == null ? void 0 : n.error}`)
    );
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
    }, this.ticketManager = new Xo(
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
   * Stop the current conversation run
   * Sends a stop_run message to the server to halt the current response generation
   */
  stopRun(t) {
    if (!this.connectionState.isConnected) {
      console.warn("WebSocketChatClient: Cannot stop run - client not connected");
      return;
    }
    console.log("WebSocketChatClient: Stopping conversation run:", t);
    const n = At.serializeStopRun(t);
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
      await la(
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
      await ca(
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
function Jo(e, t) {
  return e === t || !e && !t ? !0 : !e || !t || e.length !== t.length ? !1 : e.every((n, r) => {
    const i = t[r];
    return n.name === i.name && n.description === i.description && JSON.stringify(n.parameters) === JSON.stringify(i.parameters) && n.execute === i.execute;
  });
}
function Qo({
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
  onThreadCreated: l
}) {
  const [f, m] = fe(
    null
  ), [g, S] = fe(
    Xe.DISCONNECTED
  ), [x, R] = fe(0), T = Oe(null), M = Oe(a), P = Oe(!0), F = Oe(s), N = Oe(c), b = Oe(d), G = Oe(l);
  ve(() => {
    F.current = s, N.current = c, b.current = d, G.current = l;
  }, [s, c, d, l]);
  const Z = Me(() => Jo(M.current, a) ? (console.log("[useWebSocketConnection] Tools reference changed but content is same, preventing reconnection"), M.current) : (console.log("[useWebSocketConnection] Tools content changed, allowing reconnection"), M.current = a, a), [a]), { toolSchemas: $, clientToolExecutors: ne } = Me(() => {
    if (Z && Z.length > 0) {
      const A = Z.map(({ execute: Q, ...H }) => H), B = {};
      return Z.forEach((Q) => {
        B[Q.name] = Q.execute;
      }), {
        toolSchemas: A,
        clientToolExecutors: B
      };
    }
    return {
      toolSchemas: [],
      clientToolExecutors: {}
    };
  }, [Z]), Y = Oe(), W = ae(async () => {
    try {
      if (S(Xe.CONNECTING), !e)
        throw new Error("userMpAuthToken is required");
      if (!t)
        throw new Error("chatServerUrl is required");
      if (!n)
        throw new Error("chatServerKey is required");
      const A = new Yo();
      T.current = A, m(A);
      const B = o || {};
      await A.onInit({
        // Authentication and server properties
        userMpAuthToken: e,
        chatServerUrl: t,
        chatServerKey: n,
        entityId: r,
        entityType: i == null ? void 0 : i.toString(),
        // Tools configuration
        toolSchemas: $,
        clientTools: ne,
        contextHelpers: B,
        onSetMessage: F.current,
        onSystemEvent: N.current,
        onReasoningUpdate: b.current,
        onThreadCreated: G.current
      }), S(Xe.CONNECTED);
    } catch (A) {
      const B = Qt(A, "WebSocketConnection");
      S(Xe.DISCONNECTED), B.isRetryable ? (console.log(`[WebSocketConnection] Will retry in 2s: ${B.reason}`), setTimeout(() => {
        var Q;
        (T.current === null || !T.current.getConnectionStatus().connected) && ((Q = Y.current) == null || Q.call(Y));
      }, 2e3)) : console.warn(`[WebSocketConnection] Will not retry: ${B.reason}`);
    }
  }, [
    e,
    t,
    n,
    r,
    i,
    $,
    ne,
    o
    // Removed onSetMessage, onSystemEvent, onReasoningUpdate to prevent reconnections
  ]), O = ae(() => {
    T.current && (T.current.disconnect(), T.current = null), m(null), S(Xe.DISCONNECTED);
  }, []);
  return Y.current = W, ve(() => {
    var A;
    if ((A = T.current) != null && A.getConnectionStatus().connected) {
      console.log("[useWebSocketConnection] Already connected, skipping reconnection");
      return;
    }
    return (P.current || g === Xe.DISCONNECTED) && (P.current = !1, W()), () => {
      O();
    };
  }, [W, O, g]), ve(() => {
    const A = setInterval(() => {
      if (T.current) {
        const B = T.current.getConnectionStatus();
        B.connected ? S(Xe.CONNECTED) : B.isReconnecting ? S(Xe.RECONNECTING) : S(Xe.DISCONNECTED), R(B.reconnectAttempts);
      }
    }, 1e3);
    return () => clearInterval(A);
  }, []), {
    chatClient: f,
    connectionState: g,
    reconnectAttempts: x,
    connectChatClient: W,
    disconnectChatClient: O
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: da,
  setPrototypeOf: ii,
  isFrozen: es,
  getPrototypeOf: ts,
  getOwnPropertyDescriptor: ns
} = Object;
let {
  freeze: Ye,
  seal: dt,
  create: mr
} = Object, {
  apply: Cr,
  construct: yr
} = typeof Reflect < "u" && Reflect;
Ye || (Ye = function(t) {
  return t;
});
dt || (dt = function(t) {
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
const vn = Je(Array.prototype.forEach), rs = Je(Array.prototype.lastIndexOf), ai = Je(Array.prototype.pop), an = Je(Array.prototype.push), is = Je(Array.prototype.splice), Ln = Je(String.prototype.toLowerCase), Xn = Je(String.prototype.toString), Yn = Je(String.prototype.match), on = Je(String.prototype.replace), as = Je(String.prototype.indexOf), os = Je(String.prototype.trim), pt = Je(Object.prototype.hasOwnProperty), Ze = Je(RegExp.prototype.test), sn = ss(TypeError);
function Je(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Cr(e, t, r);
  };
}
function ss(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return yr(e, n);
  };
}
function de(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ln;
  ii && ii(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (es(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function ls(e) {
  for (let t = 0; t < e.length; t++)
    pt(e, t) || (e[t] = null);
  return e;
}
function Mt(e) {
  const t = mr(null);
  for (const [n, r] of da(e))
    pt(e, n) && (Array.isArray(r) ? t[n] = ls(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = Mt(r) : t[n] = r);
  return t;
}
function ln(e, t) {
  for (; e !== null; ) {
    const r = ns(e, t);
    if (r) {
      if (r.get)
        return Je(r.get);
      if (typeof r.value == "function")
        return Je(r.value);
    }
    e = ts(e);
  }
  function n() {
    return null;
  }
  return n;
}
const oi = Ye(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Jn = Ye(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Qn = Ye(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), cs = Ye(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), er = Ye(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), us = Ye(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), si = Ye(["#text"]), li = Ye(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), tr = Ye(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), ci = Ye(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), In = Ye(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), ds = dt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), hs = dt(/<%[\w\W]*|[\w\W]*%>/gm), ps = dt(/\$\{[\w\W]*/gm), fs = dt(/^data-[\-\w.\u00B7-\uFFFF]+$/), gs = dt(/^aria-[\-\w]+$/), ha = dt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), ms = dt(/^(?:\w+script|data):/i), Cs = dt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), pa = dt(/^html$/i), ys = dt(/^[a-z][.\w]*(-[.\w]+)+$/i);
var ui = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: gs,
  ATTR_WHITESPACE: Cs,
  CUSTOM_ELEMENT: ys,
  DATA_ATTR: fs,
  DOCTYPE_NAME: pa,
  ERB_EXPR: hs,
  IS_ALLOWED_URI: ha,
  IS_SCRIPT_OR_DATA: ms,
  MUSTACHE_EXPR: ds,
  TMPLIT_EXPR: ps
});
const cn = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, ws = function() {
  return typeof window > "u" ? null : window;
}, ks = function(t, n) {
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
}, di = function() {
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
function fa() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ws();
  const t = (K) => fa(K);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== cn.document || !e.Element)
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
    HTMLFormElement: f,
    DOMParser: m,
    trustedTypes: g
  } = e, S = c.prototype, x = ln(S, "cloneNode"), R = ln(S, "remove"), T = ln(S, "nextSibling"), M = ln(S, "childNodes"), P = ln(S, "parentNode");
  if (typeof o == "function") {
    const K = n.createElement("template");
    K.content && K.content.ownerDocument && (n = K.content.ownerDocument);
  }
  let F, N = "";
  const {
    implementation: b,
    createNodeIterator: G,
    createDocumentFragment: Z,
    getElementsByTagName: $
  } = n, {
    importNode: ne
  } = r;
  let Y = di();
  t.isSupported = typeof da == "function" && typeof P == "function" && b && b.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: W,
    ERB_EXPR: O,
    TMPLIT_EXPR: A,
    DATA_ATTR: B,
    ARIA_ATTR: Q,
    IS_SCRIPT_OR_DATA: H,
    ATTR_WHITESPACE: we,
    CUSTOM_ELEMENT: Te
  } = ui;
  let {
    IS_ALLOWED_URI: y
  } = ui, oe = null;
  const Ge = de({}, [...oi, ...Jn, ...Qn, ...er, ...si]);
  let C = null;
  const le = de({}, [...li, ...tr, ...ci, ...In]);
  let X = Object.seal(mr(null, {
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
  })), ce = null, ie = null;
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
  let he = !0, me = !0, Ae = !1, ye = !0, xe = !1, Fe = !0, qe = !1, _t = !1, vt = !1, ht = !1, gt = !1, mt = !1, Gt = !0, Vt = !1;
  const $t = "user-content-";
  let Nt = !0, Ct = !1, E = {}, _ = null;
  const z = de({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let re = null;
  const pe = de({}, ["audio", "video", "img", "source", "image", "track"]);
  let ue = null;
  const Ue = de({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), De = "http://www.w3.org/1998/Math/MathML", it = "http://www.w3.org/2000/svg", Pe = "http://www.w3.org/1999/xhtml";
  let _e = Pe, Be = !1, He = null;
  const nn = de({}, [De, it, Pe], Xn);
  let Ht = de({}, ["mi", "mo", "mn", "ms", "mtext"]), jt = de({}, ["annotation-xml"]);
  const jn = de({}, ["title", "style", "font", "a", "script"]);
  let Lt = null;
  const kn = ["application/xhtml+xml", "text/html"], Sn = "text/html";
  let Ie = null, It = null;
  const xn = n.createElement("form"), rn = function(w) {
    return w instanceof RegExp || w instanceof Function;
  }, qt = function() {
    let w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(It && It === w)) {
      if ((!w || typeof w != "object") && (w = {}), w = Mt(w), Lt = // eslint-disable-next-line unicorn/prefer-includes
      kn.indexOf(w.PARSER_MEDIA_TYPE) === -1 ? Sn : w.PARSER_MEDIA_TYPE, Ie = Lt === "application/xhtml+xml" ? Xn : Ln, oe = pt(w, "ALLOWED_TAGS") ? de({}, w.ALLOWED_TAGS, Ie) : Ge, C = pt(w, "ALLOWED_ATTR") ? de({}, w.ALLOWED_ATTR, Ie) : le, He = pt(w, "ALLOWED_NAMESPACES") ? de({}, w.ALLOWED_NAMESPACES, Xn) : nn, ue = pt(w, "ADD_URI_SAFE_ATTR") ? de(Mt(Ue), w.ADD_URI_SAFE_ATTR, Ie) : Ue, re = pt(w, "ADD_DATA_URI_TAGS") ? de(Mt(pe), w.ADD_DATA_URI_TAGS, Ie) : pe, _ = pt(w, "FORBID_CONTENTS") ? de({}, w.FORBID_CONTENTS, Ie) : z, ce = pt(w, "FORBID_TAGS") ? de({}, w.FORBID_TAGS, Ie) : Mt({}), ie = pt(w, "FORBID_ATTR") ? de({}, w.FORBID_ATTR, Ie) : Mt({}), E = pt(w, "USE_PROFILES") ? w.USE_PROFILES : !1, he = w.ALLOW_ARIA_ATTR !== !1, me = w.ALLOW_DATA_ATTR !== !1, Ae = w.ALLOW_UNKNOWN_PROTOCOLS || !1, ye = w.ALLOW_SELF_CLOSE_IN_ATTR !== !1, xe = w.SAFE_FOR_TEMPLATES || !1, Fe = w.SAFE_FOR_XML !== !1, qe = w.WHOLE_DOCUMENT || !1, ht = w.RETURN_DOM || !1, gt = w.RETURN_DOM_FRAGMENT || !1, mt = w.RETURN_TRUSTED_TYPE || !1, vt = w.FORCE_BODY || !1, Gt = w.SANITIZE_DOM !== !1, Vt = w.SANITIZE_NAMED_PROPS || !1, Nt = w.KEEP_CONTENT !== !1, Ct = w.IN_PLACE || !1, y = w.ALLOWED_URI_REGEXP || ha, _e = w.NAMESPACE || Pe, Ht = w.MATHML_TEXT_INTEGRATION_POINTS || Ht, jt = w.HTML_INTEGRATION_POINTS || jt, X = w.CUSTOM_ELEMENT_HANDLING || {}, w.CUSTOM_ELEMENT_HANDLING && rn(w.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (X.tagNameCheck = w.CUSTOM_ELEMENT_HANDLING.tagNameCheck), w.CUSTOM_ELEMENT_HANDLING && rn(w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (X.attributeNameCheck = w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), w.CUSTOM_ELEMENT_HANDLING && typeof w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (X.allowCustomizedBuiltInElements = w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), xe && (me = !1), gt && (ht = !0), E && (oe = de({}, si), C = [], E.html === !0 && (de(oe, oi), de(C, li)), E.svg === !0 && (de(oe, Jn), de(C, tr), de(C, In)), E.svgFilters === !0 && (de(oe, Qn), de(C, tr), de(C, In)), E.mathMl === !0 && (de(oe, er), de(C, ci), de(C, In))), w.ADD_TAGS && (typeof w.ADD_TAGS == "function" ? J.tagCheck = w.ADD_TAGS : (oe === Ge && (oe = Mt(oe)), de(oe, w.ADD_TAGS, Ie))), w.ADD_ATTR && (typeof w.ADD_ATTR == "function" ? J.attributeCheck = w.ADD_ATTR : (C === le && (C = Mt(C)), de(C, w.ADD_ATTR, Ie))), w.ADD_URI_SAFE_ATTR && de(ue, w.ADD_URI_SAFE_ATTR, Ie), w.FORBID_CONTENTS && (_ === z && (_ = Mt(_)), de(_, w.FORBID_CONTENTS, Ie)), Nt && (oe["#text"] = !0), qe && de(oe, ["html", "head", "body"]), oe.table && (de(oe, ["tbody"]), delete ce.tbody), w.TRUSTED_TYPES_POLICY) {
        if (typeof w.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw sn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof w.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw sn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        F = w.TRUSTED_TYPES_POLICY, N = F.createHTML("");
      } else
        F === void 0 && (F = ks(g, i)), F !== null && typeof N == "string" && (N = F.createHTML(""));
      Ye && Ye(w), It = w;
    }
  }, Tn = de({}, [...Jn, ...Qn, ...cs]), qn = de({}, [...er, ...us]), bn = function(w) {
    let D = P(w);
    (!D || !D.tagName) && (D = {
      namespaceURI: _e,
      tagName: "template"
    });
    const j = Ln(w.tagName), Ee = Ln(D.tagName);
    return He[w.namespaceURI] ? w.namespaceURI === it ? D.namespaceURI === Pe ? j === "svg" : D.namespaceURI === De ? j === "svg" && (Ee === "annotation-xml" || Ht[Ee]) : !!Tn[j] : w.namespaceURI === De ? D.namespaceURI === Pe ? j === "math" : D.namespaceURI === it ? j === "math" && jt[Ee] : !!qn[j] : w.namespaceURI === Pe ? D.namespaceURI === it && !jt[Ee] || D.namespaceURI === De && !Ht[Ee] ? !1 : !qn[j] && (jn[j] || !Tn[j]) : !!(Lt === "application/xhtml+xml" && He[w.namespaceURI]) : !1;
  }, at = function(w) {
    an(t.removed, {
      element: w
    });
    try {
      P(w).removeChild(w);
    } catch {
      R(w);
    }
  }, v = function(w, D) {
    try {
      an(t.removed, {
        attribute: D.getAttributeNode(w),
        from: D
      });
    } catch {
      an(t.removed, {
        attribute: null,
        from: D
      });
    }
    if (D.removeAttribute(w), w === "is")
      if (ht || gt)
        try {
          at(D);
        } catch {
        }
      else
        try {
          D.setAttribute(w, "");
        } catch {
        }
  }, Ce = function(w) {
    let D = null, j = null;
    if (vt)
      w = "<remove></remove>" + w;
    else {
      const Ne = Yn(w, /^[\r\n\t ]+/);
      j = Ne && Ne[0];
    }
    Lt === "application/xhtml+xml" && _e === Pe && (w = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + w + "</body></html>");
    const Ee = F ? F.createHTML(w) : w;
    if (_e === Pe)
      try {
        D = new m().parseFromString(Ee, Lt);
      } catch {
      }
    if (!D || !D.documentElement) {
      D = b.createDocument(_e, "template", null);
      try {
        D.documentElement.innerHTML = Be ? N : Ee;
      } catch {
      }
    }
    const Ve = D.body || D.documentElement;
    return w && j && Ve.insertBefore(n.createTextNode(j), Ve.childNodes[0] || null), _e === Pe ? $.call(D, qe ? "html" : "body")[0] : qe ? D.documentElement : Ve;
  }, Re = function(w) {
    return G.call(
      w.ownerDocument || w,
      w,
      // eslint-disable-next-line no-bitwise
      d.SHOW_ELEMENT | d.SHOW_COMMENT | d.SHOW_TEXT | d.SHOW_PROCESSING_INSTRUCTION | d.SHOW_CDATA_SECTION,
      null
    );
  }, be = function(w) {
    return w instanceof f && (typeof w.nodeName != "string" || typeof w.textContent != "string" || typeof w.removeChild != "function" || !(w.attributes instanceof l) || typeof w.removeAttribute != "function" || typeof w.setAttribute != "function" || typeof w.namespaceURI != "string" || typeof w.insertBefore != "function" || typeof w.hasChildNodes != "function");
  }, Ot = function(w) {
    return typeof s == "function" && w instanceof s;
  };
  function ot(K, w, D) {
    vn(K, (j) => {
      j.call(t, w, D, It);
    });
  }
  const Kr = function(w) {
    let D = null;
    if (ot(Y.beforeSanitizeElements, w, null), be(w))
      return at(w), !0;
    const j = Ie(w.nodeName);
    if (ot(Y.uponSanitizeElement, w, {
      tagName: j,
      allowedTags: oe
    }), Fe && w.hasChildNodes() && !Ot(w.firstElementChild) && Ze(/<[/\w!]/g, w.innerHTML) && Ze(/<[/\w!]/g, w.textContent) || w.nodeType === cn.progressingInstruction || Fe && w.nodeType === cn.comment && Ze(/<[/\w]/g, w.data))
      return at(w), !0;
    if (!(J.tagCheck instanceof Function && J.tagCheck(j)) && (!oe[j] || ce[j])) {
      if (!ce[j] && Yr(j) && (X.tagNameCheck instanceof RegExp && Ze(X.tagNameCheck, j) || X.tagNameCheck instanceof Function && X.tagNameCheck(j)))
        return !1;
      if (Nt && !_[j]) {
        const Ee = P(w) || w.parentNode, Ve = M(w) || w.childNodes;
        if (Ve && Ee) {
          const Ne = Ve.length;
          for (let Qe = Ne - 1; Qe >= 0; --Qe) {
            const Rt = x(Ve[Qe], !0);
            Rt.__removalCount = (w.__removalCount || 0) + 1, Ee.insertBefore(Rt, T(w));
          }
        }
      }
      return at(w), !0;
    }
    return w instanceof c && !bn(w) || (j === "noscript" || j === "noembed" || j === "noframes") && Ze(/<\/no(script|embed|frames)/i, w.innerHTML) ? (at(w), !0) : (xe && w.nodeType === cn.text && (D = w.textContent, vn([W, O, A], (Ee) => {
      D = on(D, Ee, " ");
    }), w.textContent !== D && (an(t.removed, {
      element: w.cloneNode()
    }), w.textContent = D)), ot(Y.afterSanitizeElements, w, null), !1);
  }, Xr = function(w, D, j) {
    if (Gt && (D === "id" || D === "name") && (j in n || j in xn))
      return !1;
    if (!(me && !ie[D] && Ze(B, D))) {
      if (!(he && Ze(Q, D))) {
        if (!(J.attributeCheck instanceof Function && J.attributeCheck(D, w))) {
          if (!C[D] || ie[D]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Yr(w) && (X.tagNameCheck instanceof RegExp && Ze(X.tagNameCheck, w) || X.tagNameCheck instanceof Function && X.tagNameCheck(w)) && (X.attributeNameCheck instanceof RegExp && Ze(X.attributeNameCheck, D) || X.attributeNameCheck instanceof Function && X.attributeNameCheck(D, w)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              D === "is" && X.allowCustomizedBuiltInElements && (X.tagNameCheck instanceof RegExp && Ze(X.tagNameCheck, j) || X.tagNameCheck instanceof Function && X.tagNameCheck(j)))
            ) return !1;
          } else if (!ue[D]) {
            if (!Ze(y, on(j, we, ""))) {
              if (!((D === "src" || D === "xlink:href" || D === "href") && w !== "script" && as(j, "data:") === 0 && re[w])) {
                if (!(Ae && !Ze(H, on(j, we, "")))) {
                  if (j)
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
    return w !== "annotation-xml" && Yn(w, Te);
  }, Jr = function(w) {
    ot(Y.beforeSanitizeAttributes, w, null);
    const {
      attributes: D
    } = w;
    if (!D || be(w))
      return;
    const j = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: C,
      forceKeepAttr: void 0
    };
    let Ee = D.length;
    for (; Ee--; ) {
      const Ve = D[Ee], {
        name: Ne,
        namespaceURI: Qe,
        value: Rt
      } = Ve, Zt = Ie(Ne), Zn = Rt;
      let We = Ne === "value" ? Zn : os(Zn);
      if (j.attrName = Zt, j.attrValue = We, j.keepAttr = !0, j.forceKeepAttr = void 0, ot(Y.uponSanitizeAttribute, w, j), We = j.attrValue, Vt && (Zt === "id" || Zt === "name") && (v(Ne, w), We = $t + We), Fe && Ze(/((--!?|])>)|<\/(style|title|textarea)/i, We)) {
        v(Ne, w);
        continue;
      }
      if (Zt === "attributename" && Yn(We, "href")) {
        v(Ne, w);
        continue;
      }
      if (j.forceKeepAttr)
        continue;
      if (!j.keepAttr) {
        v(Ne, w);
        continue;
      }
      if (!ye && Ze(/\/>/i, We)) {
        v(Ne, w);
        continue;
      }
      xe && vn([W, O, A], (ei) => {
        We = on(We, ei, " ");
      });
      const Qr = Ie(w.nodeName);
      if (!Xr(Qr, Zt, We)) {
        v(Ne, w);
        continue;
      }
      if (F && typeof g == "object" && typeof g.getAttributeType == "function" && !Qe)
        switch (g.getAttributeType(Qr, Zt)) {
          case "TrustedHTML": {
            We = F.createHTML(We);
            break;
          }
          case "TrustedScriptURL": {
            We = F.createScriptURL(We);
            break;
          }
        }
      if (We !== Zn)
        try {
          Qe ? w.setAttributeNS(Qe, Ne, We) : w.setAttribute(Ne, We), be(w) ? at(w) : ai(t.removed);
        } catch {
          v(Ne, w);
        }
    }
    ot(Y.afterSanitizeAttributes, w, null);
  }, fo = function K(w) {
    let D = null;
    const j = Re(w);
    for (ot(Y.beforeSanitizeShadowDOM, w, null); D = j.nextNode(); )
      ot(Y.uponSanitizeShadowNode, D, null), Kr(D), Jr(D), D.content instanceof a && K(D.content);
    ot(Y.afterSanitizeShadowDOM, w, null);
  };
  return t.sanitize = function(K) {
    let w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, D = null, j = null, Ee = null, Ve = null;
    if (Be = !K, Be && (K = "<!-->"), typeof K != "string" && !Ot(K))
      if (typeof K.toString == "function") {
        if (K = K.toString(), typeof K != "string")
          throw sn("dirty is not a string, aborting");
      } else
        throw sn("toString is not a function");
    if (!t.isSupported)
      return K;
    if (_t || qt(w), t.removed = [], typeof K == "string" && (Ct = !1), Ct) {
      if (K.nodeName) {
        const Rt = Ie(K.nodeName);
        if (!oe[Rt] || ce[Rt])
          throw sn("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (K instanceof s)
      D = Ce("<!---->"), j = D.ownerDocument.importNode(K, !0), j.nodeType === cn.element && j.nodeName === "BODY" || j.nodeName === "HTML" ? D = j : D.appendChild(j);
    else {
      if (!ht && !xe && !qe && // eslint-disable-next-line unicorn/prefer-includes
      K.indexOf("<") === -1)
        return F && mt ? F.createHTML(K) : K;
      if (D = Ce(K), !D)
        return ht ? null : mt ? N : "";
    }
    D && vt && at(D.firstChild);
    const Ne = Re(Ct ? K : D);
    for (; Ee = Ne.nextNode(); )
      Kr(Ee), Jr(Ee), Ee.content instanceof a && fo(Ee.content);
    if (Ct)
      return K;
    if (ht) {
      if (gt)
        for (Ve = Z.call(D.ownerDocument); D.firstChild; )
          Ve.appendChild(D.firstChild);
      else
        Ve = D;
      return (C.shadowroot || C.shadowrootmode) && (Ve = ne.call(r, Ve, !0)), Ve;
    }
    let Qe = qe ? D.outerHTML : D.innerHTML;
    return qe && oe["!doctype"] && D.ownerDocument && D.ownerDocument.doctype && D.ownerDocument.doctype.name && Ze(pa, D.ownerDocument.doctype.name) && (Qe = "<!DOCTYPE " + D.ownerDocument.doctype.name + `>
` + Qe), xe && vn([W, O, A], (Rt) => {
      Qe = on(Qe, Rt, " ");
    }), F && mt ? F.createHTML(Qe) : Qe;
  }, t.setConfig = function() {
    let K = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    qt(K), _t = !0;
  }, t.clearConfig = function() {
    It = null, _t = !1;
  }, t.isValidAttribute = function(K, w, D) {
    It || qt({});
    const j = Ie(K), Ee = Ie(w);
    return Xr(j, Ee, D);
  }, t.addHook = function(K, w) {
    typeof w == "function" && an(Y[K], w);
  }, t.removeHook = function(K, w) {
    if (w !== void 0) {
      const D = rs(Y[K], w);
      return D === -1 ? void 0 : is(Y[K], D, 1)[0];
    }
    return ai(Y[K]);
  }, t.removeHooks = function(K) {
    Y[K] = [];
  }, t.removeAllHooks = function() {
    Y = di();
  }, t;
}
var Ss = fa();
function xs(e) {
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
function Fn(e, t = !1) {
  return e;
}
function Ts(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function hi(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || xs(e));
  } catch {
    return !1;
  }
}
function bs() {
  Ss.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !hi(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !hi(n) && e.removeAttribute("src");
    }
  });
}
bs();
function Es() {
  const [e, t] = fe([]), n = ae(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = ae(
    (o, s) => {
      const d = Fn(s, o === "assistant");
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
  ), i = ae((o, s) => {
    t(
      (c) => c.map((d) => d.id === o ? { ...d, ...s } : d)
    );
  }, []), a = ae(
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
function _s() {
  const e = ee((M) => M.isStreaming), t = ee((M) => M.setIsStreaming), n = ee((M) => M.isThinking), r = ee((M) => M.setIsThinking), i = ee((M) => M.streamingContent), a = ee((M) => M.setStreamingContent), o = ee((M) => M.isHandlingTool), s = ee((M) => M.setIsHandlingTool), c = ee((M) => M.startStreaming), d = ee((M) => M.stopStreaming), l = ee((M) => M.clearStreamingBuffers), f = ee((M) => M.resetToolHandling), m = Oe(""), g = Me(() => ({
    get current() {
      return ee.getState().currentAssistantMessageId;
    },
    set current(M) {
      ee.getState().setCurrentAssistantMessageId(M);
    }
  }), []), S = ae((M) => {
    M ? c(M) : (t(!0), r(!0), a("")), m.current = "";
  }, [c, t, r, a]), x = ae(() => {
    d(), m.current = "";
  }, [d]), R = ae(() => {
    f();
  }, [f]), T = ae(() => {
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
    startStreaming: S,
    stopStreaming: x,
    resetToolHandling: R,
    clearStreamingBuffers: T
  };
}
function vs() {
  const e = Me(
    () => (i, a) => a === !1 ? ze.isErrorMessage(i) ? $e.ERROR : $e.COMPLETED : ze.isCompletedMessage(i) ? $e.COMPLETED : ze.isErrorMessage(i) ? $e.ERROR : $e.PROCESSING,
    []
  ), t = Me(
    () => (i) => ze.extractDuration(i),
    []
  ), n = Me(
    () => (i) => ze.cleanReasoningContent(i),
    []
  ), r = Me(
    () => (i, a) => {
      switch (ze.getMessageType(
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
function Is() {
  const e = Me(
    () => (n, r) => r === !1 ? n.includes(te.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : n.includes(te.COMPLETED_MARKER) || n.includes("✅") ? "Tool Completed" : n.includes(te.ERROR_MARKER) ? "Tool Error" : (n.includes(te.HANDLING_MARKER), "Tool Processing..."),
    []
  ), t = Me(
    () => (n, r) => r === !1 ? n.includes(te.ERROR_MARKER) ? $e.ERROR : $e.COMPLETED : n.includes(te.COMPLETED_MARKER) || n.includes("✅") ? $e.COMPLETED : n.includes(te.ERROR_MARKER) ? $e.ERROR : $e.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: t
  };
}
function Rs({
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
  resetToolHandling: f
}) {
  const m = Oe(/* @__PURE__ */ new Map()), g = Oe(/* @__PURE__ */ new Map()), S = ae(() => {
    if (c.current && d.current) {
      const F = Fn(
        d.current,
        !0
      );
      return n(
        c.current,
        F,
        !1
      ), l(), !0;
    }
    return !1;
  }, [
    c,
    d,
    n,
    l
  ]), x = ae(
    (F) => {
      const N = Fn(F, !0);
      if (c.current)
        d.current += N, o(d.current), n(
          c.current,
          d.current,
          !0
        );
      else {
        i(!1);
        const b = r();
        c.current = b, d.current = N, o(N);
        const G = {
          id: b,
          role: "assistant",
          content: N,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        e((Z) => [...Z, G]);
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
  ), R = ae(
    (F, N, b) => {
      const { callId: G } = b || {};
      if (s(F), !G) return;
      const Z = ze.isThinkingMessage(N) && !N.includes("for") && !N.includes("seconds"), $ = ze.isThinkingMessage(N) && N.includes("for") && N.includes("seconds"), ne = ze.isHandlingMessage(N), Y = ze.isCompletedMessage(N), W = ze.isErrorMessage(N);
      if (Z || $) {
        const A = m.current.get(G);
        if (Z && !A) {
          S();
          const B = r();
          m.current.set(G, B);
          const Q = {
            id: B,
            role: "reasoning",
            content: N,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          e((H) => [...H, Q]);
        } else $ && A ? (n(A, N, !1), m.current.delete(G)) : A && Z && n(A, N, !0);
      }
      const O = g.current.get(G);
      if (ne && !O) {
        S();
        const A = N.match(
          te.PATTERNS.HANDLING_TOOL
        ), B = A ? A[1] : "Unknown Tool", Q = r();
        g.current.set(G, Q);
        const H = {
          id: Q,
          role: "tooling",
          content: N,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...b,
            toolName: B,
            callId: G,
            status: $e.PROCESSING
          }
        };
        e((we) => [...we, H]);
      } else if ((Y || W) && O) {
        const A = N.match(
          te.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), B = A ? A[1] : "Unknown Tool";
        e(
          (Q) => Q.map(
            (H) => H.id === O ? {
              ...H,
              content: N,
              isStreaming: !1,
              toolData: {
                ...H.toolData,
                toolName: B,
                status: W ? $e.ERROR : $e.COMPLETED,
                callId: G ?? ""
              }
            } : H
          )
        ), g.current.delete(G);
      } else O && F && !Y && !W && n(O, N, !0);
    },
    [
      s,
      S,
      r,
      e,
      n
    ]
  ), T = ae(() => {
    a(!1), i(!1), S();
  }, [a, i, S]), M = ae(
    (F) => {
      console.error("Chat error:", F), a(!1), i(!1), S(), t("system", `❌ Chat error: ${F}`);
    },
    [
      a,
      i,
      S,
      t
    ]
  ), P = ae(() => {
    a(!1), i(!1), l(), f();
  }, [
    a,
    i,
    l,
    f
  ]);
  return {
    handleSetMessage: x,
    handleReasoningUpdate: R,
    handleChatFinished: T,
    handleChatError: M,
    stopGeneration: P,
    finalizeCurrentStreamingMessage: S
  };
}
function Ms() {
  const e = Es(), t = _s(), n = vs(), r = Is(), i = Rs({
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
function Ch({ initialMode: e = "sidebar" }) {
  const t = ee();
  return ve(() => {
    e && t.currentMode !== e && t.setCurrentMode(e);
  }, [e]), ve(() => {
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
function As({
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
  metadata: f,
  isConnected: m = !0
  // Default to true for backward compatibility
}) {
  const g = Oe(!1), S = async () => {
    if (!m) {
      console.log("useConversationLoader: Waiting for connection to be established before loading messages");
      return;
    }
    if (!e) {
      console.log("useConversationLoader: No entityId provided, skipping history fetch");
      return;
    }
    if (!f || typeof f == "object" && Object.keys(f).length === 0) {
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
    if (!g.current && !(a.length > 0))
      try {
        s(!0), c(null), console.log("useConversationLoader: Fetching messages for entityId:", e, "entityType:", t);
        const R = await xo(
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
        console.log(`useConversationLoader: Loaded ${R.messages.length} messages`), o(R.messages), R.threadId && (console.log("useConversationLoader: Setting threadId from response:", R.threadId), d(R.threadId)), R.providerResId && (console.log("useConversationLoader: Setting providerResId:", R.providerResId), l(R.providerResId)), g.current = !0;
      } catch (R) {
        const T = Qt(R, "ConversationLoader");
        c(
          R instanceof Error ? R.message : "Failed to load conversation"
        ), g.current = !0, T.isRetryable || console.warn(`[ConversationLoader] Will not retry conversation loading: ${T.reason}`);
      } finally {
        s(!1);
      }
  };
  return ve(() => {
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
    f
  ]), {
    hasLoadedConversationRef: g,
    resetConversationLoader: () => {
      console.log("useConversationLoader: Resetting loader state"), g.current = !1;
    },
    reloadConversation: S
  };
}
function Ns({
  metadata: e,
  chatClient: t,
  currentProviderResId: n,
  isLoadingConversation: r,
  messages: i = [],
  entityId: a,
  entityType: o
}) {
  const s = Oe(void 0), c = Oe(!1);
  return ve(() => {
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
function Ls() {
  const [e, t] = fe(navigator.onLine), [n, r] = fe(!1);
  return ve(() => {
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
class Os {
  // 15MB
  constructor(t) {
    q(this, "config");
    q(this, "defaultFolder", "chat-uploads");
    q(this, "defaultMaxFileSize", 15 * 1024 * 1024);
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
          a.forEach((f) => {
            f.progress = l;
          }), n([...a]);
        }
      }), c.addEventListener("load", async () => {
        if (c.status >= 200 && c.status < 300)
          try {
            const d = JSON.parse(c.responseText);
            let l;
            d.data && Array.isArray(d.data) ? l = d.data.map((f, m) => this.processUploadResult(t[m], f)) : Array.isArray(d) ? l = d.map((f, m) => this.processUploadResult(t[m], f)) : l = [this.processUploadResult(t[0], d)], a.forEach((f) => {
              f.status = "completed", f.progress = 100;
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
class Ds {
  constructor(t, n = {}) {
    q(this, "config");
    q(this, "chatClient");
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
const Ps = {
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
}, ga = {
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
}, Fs = {
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
    if (!ga.isValidWebSocketUrl(e))
      throw new Error(`Invalid WebSocket URL: ${e}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (e) => e.trim().length > 0
}, ma = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...e) => e.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (e, t, n, r, i) => ma.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${e}`,
    t && `chat-wrapper--${t}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    e === "embedded" && i && "chat-wrapper--constrained"
  )
}, Ca = {
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
  getUserFriendlyErrorMessage: (e) => Ca.isNetworkError(e) ? "Connection error. Please check your internet connection and try again." : e.message.includes("authentication") || e.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : e.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, xt = {
  state: Ps,
  url: ga,
  validation: Fs,
  css: ma,
  error: Ca
};
class pi extends Nr {
  constructor(n) {
    super(n);
    q(this, "resetTimeoutId", null);
    q(this, "resetErrorBoundary", () => {
      this.resetTimeoutId && clearTimeout(this.resetTimeoutId), this.setState({
        hasError: !1,
        error: void 0,
        errorInfo: void 0
      });
    });
    q(this, "handleRetry", () => {
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
        (c, d) => c !== o[d]
      ) && this.resetErrorBoundary();
    }
  }
  render() {
    const { hasError: n, error: r } = this.state, { children: i, fallback: a } = this.props;
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ u("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ u("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ u("p", { className: "chat-wrapper__error-message", children: xt.error.getUserFriendlyErrorMessage(r) }),
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
          return !0;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ I("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ u("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ u("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : i;
  }
}
class Hs extends Nr {
  constructor(n) {
    super(n);
    q(this, "retryCount", 0);
    q(this, "retryTimeoutId", null);
    q(this, "handleRetry", () => {
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
    q(this, "handleManualReset", () => {
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
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || xt.error.isNetworkError(r)) ? /* @__PURE__ */ u("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ u("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ u("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ I("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ u("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ u("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ I(bt, { children: [
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
          return !0;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ I("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ u("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ u("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
}
class zs extends Nr {
  constructor(n) {
    super(n);
    q(this, "handleRetry", () => {
      this.setState({
        hasError: !1,
        error: void 0,
        failedFiles: void 0
      }), this.props.onRetry && this.props.onRetry();
    });
    q(this, "handleDismiss", () => {
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
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ u("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ u("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ u("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ I("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ u("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ u("ul", { className: "chat-wrapper__failed-files-list", children: i.map((c, d) => /* @__PURE__ */ u("li", { className: "chat-wrapper__failed-file", children: c }, d)) })
      ] }),
      /* @__PURE__ */ I("div", { className: "chat-wrapper__error-actions", children: [
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
          return !0;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ I("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ u("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ u("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
  getFileUploadErrorMessage(n) {
    return n.message.includes("size") || n.message.includes("large") ? "File size is too large. Please try with smaller files." : n.message.includes("type") || n.message.includes("format") ? "File type is not supported. Please try with different file types." : n.message.includes("network") || n.message.includes("connection") ? "Network error during upload. Please check your connection and try again." : n.message.includes("timeout") ? "Upload timed out. Please try again with smaller files or better connection." : "Failed to upload files. Please try again.";
  }
}
const Us = ({
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
), Bs = ({
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
), Ws = ({
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
), Gs = ({
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
), ya = ({
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
), Vs = ({
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
), $s = ({
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
        /* @__PURE__ */ u(Us, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ u("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, js = ({
  headerName: e,
  mode: t,
  isCollapsed: n,
  isModalOpen: r,
  devMode: i = !1,
  onClose: a,
  onToggleFullscreen: o,
  onToggleCollapse: s,
  onOpenSettings: c
}) => {
  const d = () => t === "modal" && r && a ? /* @__PURE__ */ u(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: a,
      title: "Close chat",
      children: /* @__PURE__ */ u(Bs, { size: 20 })
    }
  ) : null, l = () => {
    if ((t === "sidebar" || t === "fullscreen") && !n && o) {
      const g = t === "fullscreen";
      return /* @__PURE__ */ u(
        "button",
        {
          className: g ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: o,
          title: g ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ u(Ws, { size: 20, isFullscreen: g })
        }
      );
    }
    return null;
  }, f = () => (t === "sidebar" || t === "fullscreen") && !n && s ? /* @__PURE__ */ u(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: s,
      title: "Collapse chat",
      children: /* @__PURE__ */ u(Gs, { size: 20 })
    }
  ) : null;
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ u("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ u("h2", { className: "chat-wrapper__title", children: e }) }),
    /* @__PURE__ */ I("div", { className: "chat-wrapper__header-controls", children: [
      !i || !c ? null : /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__settings-button",
          onClick: c,
          title: "Developer Settings",
          children: /* @__PURE__ */ u(ya, { size: 16 })
        }
      ),
      l(),
      f(),
      d()
    ] })
  ] });
};
class qs extends Error {
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
    q(
      this,
      "name",
      /** @type {const} */
      "Assertion"
    );
    q(
      this,
      "code",
      /** @type {const} */
      "ERR_ASSERTION"
    );
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.actual = r, this.expected = i, this.generated = o, this.operator = a;
  }
}
function k(e, t) {
  wa(
    !!e,
    !1,
    !0,
    "ok",
    "Expected value to be truthy",
    t
  );
}
function wr(e) {
  wa(!1, !1, !0, "ok", "Unreachable", e);
}
function wa(e, t, n, r, i, a) {
  if (!e)
    throw a instanceof Error ? a : new qs(
      a || i,
      t,
      n,
      r,
      !a
    );
}
function Zs(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Ks = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Xs = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ys = {};
function fi(e, t) {
  return (Ys.jsx ? Xs : Ks).test(e);
}
const Js = /[ \t\n\f\r]/g;
function Qs(e) {
  return typeof e == "object" ? e.type === "text" ? gi(e.value) : !1 : gi(e);
}
function gi(e) {
  return e.replace(Js, "") === "";
}
class Cn {
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
Cn.prototype.normal = {};
Cn.prototype.property = {};
Cn.prototype.space = void 0;
function ka(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new Cn(n, r, t);
}
function kr(e) {
  return e.toLowerCase();
}
class rt {
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
rt.prototype.attribute = "";
rt.prototype.booleanish = !1;
rt.prototype.boolean = !1;
rt.prototype.commaOrSpaceSeparated = !1;
rt.prototype.commaSeparated = !1;
rt.prototype.defined = !1;
rt.prototype.mustUseProperty = !1;
rt.prototype.number = !1;
rt.prototype.overloadedBoolean = !1;
rt.prototype.property = "";
rt.prototype.spaceSeparated = !1;
rt.prototype.space = void 0;
let el = 0;
const se = Wt(), Le = Wt(), Sr = Wt(), L = Wt(), ke = Wt(), Yt = Wt(), st = Wt();
function Wt() {
  return 2 ** ++el;
}
const xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: se,
  booleanish: Le,
  commaOrSpaceSeparated: st,
  commaSeparated: Yt,
  number: L,
  overloadedBoolean: Sr,
  spaceSeparated: ke
}, Symbol.toStringTag, { value: "Module" })), nr = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(xr)
);
class Lr extends rt {
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
        mi(this, nr[a], (r & xr[o]) === xr[o]);
      }
  }
}
Lr.prototype.defined = !0;
function mi(e, t, n) {
  n && (e[t] = n);
}
function en(e) {
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
  return new Cn(t, n, e.space);
}
const Sa = en({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Le,
    ariaAutoComplete: null,
    ariaBusy: Le,
    ariaChecked: Le,
    ariaColCount: L,
    ariaColIndex: L,
    ariaColSpan: L,
    ariaControls: ke,
    ariaCurrent: null,
    ariaDescribedBy: ke,
    ariaDetails: null,
    ariaDisabled: Le,
    ariaDropEffect: ke,
    ariaErrorMessage: null,
    ariaExpanded: Le,
    ariaFlowTo: ke,
    ariaGrabbed: Le,
    ariaHasPopup: null,
    ariaHidden: Le,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: ke,
    ariaLevel: L,
    ariaLive: null,
    ariaModal: Le,
    ariaMultiLine: Le,
    ariaMultiSelectable: Le,
    ariaOrientation: null,
    ariaOwns: ke,
    ariaPlaceholder: null,
    ariaPosInSet: L,
    ariaPressed: Le,
    ariaReadOnly: Le,
    ariaRelevant: null,
    ariaRequired: Le,
    ariaRoleDescription: ke,
    ariaRowCount: L,
    ariaRowIndex: L,
    ariaRowSpan: L,
    ariaSelected: Le,
    ariaSetSize: L,
    ariaSort: null,
    ariaValueMax: L,
    ariaValueMin: L,
    ariaValueNow: L,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function xa(e, t) {
  return t in e ? e[t] : t;
}
function Ta(e, t) {
  return xa(e, t.toLowerCase());
}
const tl = en({
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
    acceptCharset: ke,
    accessKey: ke,
    action: null,
    allow: null,
    allowFullScreen: se,
    allowPaymentRequest: se,
    allowUserMedia: se,
    alt: null,
    as: null,
    async: se,
    autoCapitalize: null,
    autoComplete: ke,
    autoFocus: se,
    autoPlay: se,
    blocking: ke,
    capture: null,
    charSet: null,
    checked: se,
    cite: null,
    className: ke,
    cols: L,
    colSpan: null,
    content: null,
    contentEditable: Le,
    controls: se,
    controlsList: ke,
    coords: L | Yt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: se,
    defer: se,
    dir: null,
    dirName: null,
    disabled: se,
    download: Sr,
    draggable: Le,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: se,
    formTarget: null,
    headers: ke,
    height: L,
    hidden: Sr,
    high: L,
    href: null,
    hrefLang: null,
    htmlFor: ke,
    httpEquiv: ke,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: se,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: se,
    itemId: null,
    itemProp: ke,
    itemRef: ke,
    itemScope: se,
    itemType: ke,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: se,
    low: L,
    manifest: null,
    max: null,
    maxLength: L,
    media: null,
    method: null,
    min: null,
    minLength: L,
    multiple: se,
    muted: se,
    name: null,
    nonce: null,
    noModule: se,
    noValidate: se,
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
    open: se,
    optimum: L,
    pattern: null,
    ping: ke,
    placeholder: null,
    playsInline: se,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: se,
    referrerPolicy: null,
    rel: ke,
    required: se,
    reversed: se,
    rows: L,
    rowSpan: L,
    sandbox: ke,
    scope: null,
    scoped: se,
    seamless: se,
    selected: se,
    shadowRootClonable: se,
    shadowRootDelegatesFocus: se,
    shadowRootMode: null,
    shape: null,
    size: L,
    sizes: null,
    slot: null,
    span: L,
    spellCheck: Le,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: L,
    step: null,
    style: null,
    tabIndex: L,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: se,
    useMap: null,
    value: Le,
    width: L,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: ke,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: L,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: L,
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
    compact: se,
    // Lists. Use CSS to reduce space between items instead
    declare: se,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: L,
    // `<img>` and `<object>`
    leftMargin: L,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: L,
    // `<body>`
    marginWidth: L,
    // `<body>`
    noResize: se,
    // `<frame>`
    noHref: se,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: se,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: se,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: L,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: Le,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: L,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: L,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: se,
    disableRemotePlayback: se,
    prefix: null,
    property: null,
    results: L,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Ta
}), nl = en({
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
    about: st,
    accentHeight: L,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: L,
    amplitude: L,
    arabicForm: null,
    ascent: L,
    attributeName: null,
    attributeType: null,
    azimuth: L,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: L,
    by: null,
    calcMode: null,
    capHeight: L,
    className: ke,
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
    descent: L,
    diffuseConstant: L,
    direction: null,
    display: null,
    dur: null,
    divisor: L,
    dominantBaseline: null,
    download: se,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: L,
    enableBackground: null,
    end: null,
    event: null,
    exponent: L,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: L,
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
    hanging: L,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: L,
    horizOriginX: L,
    horizOriginY: L,
    id: null,
    ideographic: L,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: L,
    k: L,
    k1: L,
    k2: L,
    k3: L,
    k4: L,
    kernelMatrix: st,
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
    limitingConeAngle: L,
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
    mediaSize: L,
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
    overlinePosition: L,
    overlineThickness: L,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: L,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: ke,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: L,
    pointsAtY: L,
    pointsAtZ: L,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: st,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: st,
    rev: st,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: st,
    requiredFeatures: st,
    requiredFonts: st,
    requiredFormats: st,
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
    specularConstant: L,
    specularExponent: L,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: L,
    strikethroughThickness: L,
    string: null,
    stroke: null,
    strokeDashArray: st,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: L,
    strokeOpacity: L,
    strokeWidth: null,
    style: null,
    surfaceScale: L,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: st,
    tabIndex: L,
    tableValues: null,
    target: null,
    targetX: L,
    targetY: L,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: st,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: L,
    underlineThickness: L,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: L,
    values: null,
    vAlphabetic: L,
    vMathematical: L,
    vectorEffect: null,
    vHanging: L,
    vIdeographic: L,
    version: null,
    vertAdvY: L,
    vertOriginX: L,
    vertOriginY: L,
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
    xHeight: L,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: xa
}), ba = en({
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
}), Ea = en({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Ta
}), _a = en({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), rl = {
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
}, il = /[A-Z]/g, Ci = /-[a-z]/g, al = /^data[-\w.:]+$/i;
function ol(e, t) {
  const n = kr(t);
  let r = t, i = rt;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && al.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(Ci, ll);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!Ci.test(a)) {
        let o = a.replace(il, sl);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    i = Lr;
  }
  return new i(r, t);
}
function sl(e) {
  return "-" + e.toLowerCase();
}
function ll(e) {
  return e.charAt(1).toUpperCase();
}
const cl = ka([Sa, tl, ba, Ea, _a], "html"), Or = ka([Sa, nl, ba, Ea, _a], "svg");
function ul(e) {
  return e.join(" ").trim();
}
var Hn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Dr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Pr = {}, yi = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, dl = /\n/g, hl = /^\s*/, pl = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, fl = /^:\s*/, gl = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, ml = /^[;\s]*/, Cl = /^\s+|\s+$/g, yl = `
`, wi = "/", ki = "*", Bt = "", wl = "comment", kl = "declaration", Sl = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(S) {
    var x = S.match(dl);
    x && (n += x.length);
    var R = S.lastIndexOf(yl);
    r = ~R ? S.length - R : r + S.length;
  }
  function a() {
    var S = { line: n, column: r };
    return function(x) {
      return x.position = new o(S), d(), x;
    };
  }
  function o(S) {
    this.start = S, this.end = { line: n, column: r }, this.source = t.source;
  }
  o.prototype.content = e;
  function s(S) {
    var x = new Error(
      t.source + ":" + n + ":" + r + ": " + S
    );
    if (x.reason = S, x.filename = t.source, x.line = n, x.column = r, x.source = e, !t.silent) throw x;
  }
  function c(S) {
    var x = S.exec(e);
    if (x) {
      var R = x[0];
      return i(R), e = e.slice(R.length), x;
    }
  }
  function d() {
    c(hl);
  }
  function l(S) {
    var x;
    for (S = S || []; x = f(); )
      x !== !1 && S.push(x);
    return S;
  }
  function f() {
    var S = a();
    if (!(wi != e.charAt(0) || ki != e.charAt(1))) {
      for (var x = 2; Bt != e.charAt(x) && (ki != e.charAt(x) || wi != e.charAt(x + 1)); )
        ++x;
      if (x += 2, Bt === e.charAt(x - 1))
        return s("End of comment missing");
      var R = e.slice(2, x - 2);
      return r += 2, i(R), e = e.slice(x), r += 2, S({
        type: wl,
        comment: R
      });
    }
  }
  function m() {
    var S = a(), x = c(pl);
    if (x) {
      if (f(), !c(fl)) return s("property missing ':'");
      var R = c(gl), T = S({
        type: kl,
        property: Si(x[0].replace(yi, Bt)),
        value: R ? Si(R[0].replace(yi, Bt)) : Bt
      });
      return c(ml), T;
    }
  }
  function g() {
    var S = [];
    l(S);
    for (var x; x = m(); )
      x !== !1 && (S.push(x), l(S));
    return S;
  }
  return d(), g();
};
function Si(e) {
  return e ? e.replace(Cl, Bt) : Bt;
}
var xl = Hn && Hn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.default = bl;
var Tl = xl(Sl);
function bl(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, Tl.default)(e), i = typeof t == "function";
  return r.forEach(function(a) {
    if (a.type === "declaration") {
      var o = a.property, s = a.value;
      i ? t(o, s, a) : s && (n = n || {}, n[o] = s);
    }
  }), n;
}
var Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.camelCase = void 0;
var El = /^--[a-zA-Z0-9_-]+$/, _l = /-([a-z])/g, vl = /^[^-]+$/, Il = /^-(webkit|moz|ms|o|khtml)-/, Rl = /^-(ms)-/, Ml = function(e) {
  return !e || vl.test(e) || El.test(e);
}, Al = function(e, t) {
  return t.toUpperCase();
}, xi = function(e, t) {
  return "".concat(t, "-");
}, Nl = function(e, t) {
  return t === void 0 && (t = {}), Ml(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Rl, xi) : e = e.replace(Il, xi), e.replace(_l, Al));
};
Wn.camelCase = Nl;
var Ll = Hn && Hn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, Ol = Ll(Pr), Dl = Wn;
function Tr(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, Ol.default)(e, function(r, i) {
    r && i && (n[(0, Dl.camelCase)(r, t)] = i);
  }), n;
}
Tr.default = Tr;
var Pl = Tr;
const Fl = /* @__PURE__ */ Dr(Pl), va = Ia("end"), Fr = Ia("start");
function Ia(e) {
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
function Hl(e) {
  const t = Fr(e), n = va(e);
  if (t && n)
    return { start: t, end: n };
}
function hn(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Ti(e.position) : "start" in e || "end" in e ? Ti(e) : "line" in e || "column" in e ? br(e) : "";
}
function br(e) {
  return bi(e && e.line) + ":" + bi(e && e.column);
}
function Ti(e) {
  return br(e && e.start) + "-" + br(e && e.end);
}
function bi(e) {
  return e && typeof e == "number" ? e : 1;
}
class je extends Error {
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
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = s ? s.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = s ? s.line : void 0, this.name = hn(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = o && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
je.prototype.file = "";
je.prototype.name = "";
je.prototype.reason = "";
je.prototype.message = "";
je.prototype.stack = "";
je.prototype.column = void 0;
je.prototype.line = void 0;
je.prototype.ancestors = void 0;
je.prototype.cause = void 0;
je.prototype.fatal = void 0;
je.prototype.place = void 0;
je.prototype.ruleId = void 0;
je.prototype.source = void 0;
const Hr = {}.hasOwnProperty, zl = /* @__PURE__ */ new Map(), Ul = /[A-Z]/g, Bl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Wl = /* @__PURE__ */ new Set(["td", "th"]), Ra = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Gl(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Yl(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Xl(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? Or : cl,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = Ma(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function Ma(e, t, n) {
  if (t.type === "element")
    return Vl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return $l(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return ql(e, t, n);
  if (t.type === "mdxjsEsm")
    return jl(e, t);
  if (t.type === "root")
    return Zl(e, t, n);
  if (t.type === "text")
    return Kl(e, t);
}
function Vl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Or, e.schema = i), e.ancestors.push(t);
  const a = Na(e, t.tagName, !1), o = Jl(e, t);
  let s = Ur(e, t);
  return Bl.has(t.tagName) && (s = s.filter(function(c) {
    return typeof c == "string" ? !Qs(c) : !0;
  })), Aa(e, o, a, t), zr(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function $l(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return k(r.type === "ExpressionStatement"), /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  mn(e, t.position);
}
function jl(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  mn(e, t.position);
}
function ql(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = Or, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : Na(e, t.name, !0), o = Ql(e, t), s = Ur(e, t);
  return Aa(e, o, a, t), zr(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function Zl(e, t, n) {
  const r = {};
  return zr(r, Ur(e, t)), e.create(t, e.Fragment, r, n);
}
function Kl(e, t) {
  return t.value;
}
function Aa(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function zr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function Xl(e, t, n) {
  return r;
  function r(i, a, o, s) {
    const d = Array.isArray(o.children) ? n : t;
    return s ? d(a, o, s) : d(a, o);
  }
}
function Yl(e, t) {
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
function Jl(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && Hr.call(t.properties, i)) {
      const a = ec(e, i, t.properties[i]);
      if (a) {
        const [o, s] = a;
        e.tableCellAlignToStyle && o === "align" && typeof s == "string" && Wl.has(t.tagName) ? r = s : n[o] = s;
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
function Ql(e, t) {
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
        mn(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const s = r.value.data.estree.body[0];
          k(s.type === "ExpressionStatement"), a = e.evaluater.evaluateExpression(s.expression);
        } else
          mn(e, t.position);
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
  const i = e.passKeys ? /* @__PURE__ */ new Map() : zl;
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
    const s = Ma(e, a, o);
    s !== void 0 && n.push(s);
  }
  return n;
}
function ec(e, t, n) {
  const r = ol(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Zs(n) : ul(n)), r.property === "style") {
      let i = typeof n == "object" ? n : tc(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = nc(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? rl[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function tc(e, t) {
  try {
    return Fl(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new je("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Ra + "#cannot-parse-style-attribute", i;
  }
}
function Na(e, t, n) {
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
  mn(e);
}
function mn(e, t) {
  const n = new je(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Ra + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function nc(e) {
  const t = {};
  let n;
  for (n in e)
    Hr.call(e, n) && (t[rc(n)] = e[n]);
  return t;
}
function rc(e) {
  let t = e.replace(Ul, ic);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function ic(e) {
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
}, ac = {};
function oc(e, t) {
  const n = ac, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return La(e, r, i);
}
function La(e, t, n) {
  if (sc(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Ei(e.children, t, n);
  }
  return Array.isArray(e) ? Ei(e, t, n) : "";
}
function Ei(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = La(e[i], t, n);
  return r.join("");
}
function sc(e) {
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
const p = (
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
), U = (
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
), h = (
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
), kt = (
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
function Et(e, t, n, r) {
  const i = e.length;
  let a = 0, o;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < U.v8MaxSafeChunkSize)
    o = Array.from(r), o.unshift(t, n), e.splice(...o);
  else
    for (n && e.splice(t, n); a < r.length; )
      o = r.slice(
        a,
        a + U.v8MaxSafeChunkSize
      ), o.unshift(t, 0), e.splice(...o), a += U.v8MaxSafeChunkSize, t += U.v8MaxSafeChunkSize;
}
function ut(e, t) {
  return e.length > 0 ? (Et(e, e.length, 0, t), e) : t;
}
const vi = {}.hasOwnProperty;
function lc(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    cc(t, e[n]);
  return t;
}
function cc(e, t) {
  let n;
  for (n in t) {
    const i = (vi.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let o;
    if (a)
      for (o in a) {
        vi.call(i, o) || (i[o] = []);
        const s = a[o];
        uc(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(s) ? s : s ? [s] : []
        );
      }
  }
}
function uc(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  Et(e, 0, 0, r);
}
function Oa(e, t) {
  const n = Number.parseInt(e, t);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < p.ht || n === p.vt || n > p.cr && n < p.space || // Control character (DEL) of C0, and C1 controls.
    n > p.tilde && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? kt.replacementCharacter : String.fromCodePoint(n)
  );
}
function Jt(e) {
  return e.replace(/[\t\n\r ]+/g, kt.space).replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Tt = Ft(/[A-Za-z]/), lt = Ft(/[\dA-Za-z]/), dc = Ft(/[#-'*+\--9=?A-Z^-~]/);
function Er(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < p.space || e === p.del)
  );
}
const _r = Ft(/\d/), hc = Ft(/[\dA-Fa-f]/), pc = Ft(/[!-/:-@[-`{-~]/);
function V(e) {
  return e !== null && e < p.horizontalTab;
}
function nt(e) {
  return e !== null && (e < p.nul || e === p.space);
}
function ge(e) {
  return e === p.horizontalTab || e === p.virtualSpace || e === p.space;
}
const fc = Ft(new RegExp("\\p{P}|\\p{S}", "u")), gc = Ft(/\s/);
function Ft(e) {
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
    if (a === p.percentSign && lt(e.charCodeAt(n + 1)) && lt(e.charCodeAt(n + 2)))
      i = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (o = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const s = e.charCodeAt(n + 1);
      a < 56320 && s > 56319 && s < 57344 ? (o = String.fromCharCode(a, s), i = 1) : o = kt.replacementCharacter;
    } else
      o = String.fromCharCode(a);
    o && (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, o = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function Se(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return o;
  function o(c) {
    return ge(c) ? (e.enter(n), s(c)) : t(c);
  }
  function s(c) {
    return ge(c) && a++ < i ? (e.consume(c), s) : (e.exit(n), t(c));
  }
}
const mc = { tokenize: Cc };
function Cc(e) {
  const t = e.attempt(
    this.parser.constructs.contentInitial,
    r,
    i
  );
  let n;
  return t;
  function r(s) {
    if (k(
      s === p.eof || V(s),
      "expected eol or eof"
    ), s === p.eof) {
      e.consume(s);
      return;
    }
    return e.enter(h.lineEnding), e.consume(s), e.exit(h.lineEnding), Se(e, t, h.linePrefix);
  }
  function i(s) {
    return k(
      s !== p.eof && !V(s),
      "expected anything other than a line ending or EOF"
    ), e.enter(h.paragraph), a(s);
  }
  function a(s) {
    const c = e.enter(h.chunkText, {
      contentType: U.contentTypeText,
      previous: n
    });
    return n && (n.next = c), n = c, o(s);
  }
  function o(s) {
    if (s === p.eof) {
      e.exit(h.chunkText), e.exit(h.paragraph), e.consume(s);
      return;
    }
    return V(s) ? (e.consume(s), e.exit(h.chunkText), a) : (e.consume(s), o);
  }
}
const yc = { tokenize: wc }, Ii = { tokenize: kc };
function wc(e) {
  const t = this, n = [];
  let r = 0, i, a, o;
  return s;
  function s(P) {
    if (r < n.length) {
      const F = n[r];
      return t.containerState = F[1], k(
        F[0].continuation,
        "expected `continuation` to be defined on container construct"
      ), e.attempt(
        F[0].continuation,
        c,
        d
      )(P);
    }
    return d(P);
  }
  function c(P) {
    if (k(
      t.containerState,
      "expected `containerState` to be defined after continuation"
    ), r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && M();
      const F = t.events.length;
      let N = F, b;
      for (; N--; )
        if (t.events[N][0] === "exit" && t.events[N][1].type === h.chunkFlow) {
          b = t.events[N][1].end;
          break;
        }
      k(b, "could not find previous flow chunk"), T(r);
      let G = F;
      for (; G < t.events.length; )
        t.events[G][1].end = { ...b }, G++;
      return Et(
        t.events,
        N + 1,
        0,
        t.events.slice(F)
      ), t.events.length = G, d(P);
    }
    return s(P);
  }
  function d(P) {
    if (r === n.length) {
      if (!i)
        return m(P);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return S(P);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(
      Ii,
      l,
      f
    )(P);
  }
  function l(P) {
    return i && M(), T(r), m(P);
  }
  function f(P) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, S(P);
  }
  function m(P) {
    return t.containerState = {}, e.attempt(
      Ii,
      g,
      S
    )(P);
  }
  function g(P) {
    return k(
      t.currentConstruct,
      "expected `currentConstruct` to be defined on tokenizer"
    ), k(
      t.containerState,
      "expected `containerState` to be defined on tokenizer"
    ), r++, n.push([t.currentConstruct, t.containerState]), m(P);
  }
  function S(P) {
    if (P === p.eof) {
      i && M(), T(0), e.consume(P);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter(h.chunkFlow, {
      _tokenizer: i,
      contentType: U.contentTypeFlow,
      previous: a
    }), x(P);
  }
  function x(P) {
    if (P === p.eof) {
      R(e.exit(h.chunkFlow), !0), T(0), e.consume(P);
      return;
    }
    return V(P) ? (e.consume(P), R(e.exit(h.chunkFlow)), r = 0, t.interrupt = void 0, s) : (e.consume(P), x);
  }
  function R(P, F) {
    k(i, "expected `childFlow` to be defined when continuing");
    const N = t.sliceStream(P);
    if (F && N.push(null), P.previous = a, a && (a.next = P), a = P, i.defineSkip(P.start), i.write(N), t.parser.lazy[P.start.line]) {
      let b = i.events.length;
      for (; b--; )
        if (
          // The token starts before the line ending…
          i.events[b][1].start.offset < o && // …and either is not ended yet…
          (!i.events[b][1].end || // …or ends after it.
          i.events[b][1].end.offset > o)
        )
          return;
      const G = t.events.length;
      let Z = G, $, ne;
      for (; Z--; )
        if (t.events[Z][0] === "exit" && t.events[Z][1].type === h.chunkFlow) {
          if ($) {
            ne = t.events[Z][1].end;
            break;
          }
          $ = !0;
        }
      for (k(ne, "could not find previous flow chunk"), T(r), b = G; b < t.events.length; )
        t.events[b][1].end = { ...ne }, b++;
      Et(
        t.events,
        Z + 1,
        0,
        t.events.slice(G)
      ), t.events.length = b;
    }
  }
  function T(P) {
    let F = n.length;
    for (; F-- > P; ) {
      const N = n[F];
      t.containerState = N[1], k(
        N[0].exit,
        "expected `exit` to be defined on container construct"
      ), N[0].exit.call(t, e);
    }
    n.length = P;
  }
  function M() {
    k(
      t.containerState,
      "expected `containerState` to be defined when closing flow"
    ), k(i, "expected `childFlow` to be defined when closing it"), i.write([p.eof]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function kc(e, t, n) {
  return k(
    this.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), Se(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    h.linePrefix,
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize
  );
}
function Ri(e) {
  if (e === p.eof || nt(e) || gc(e))
    return U.characterGroupWhitespace;
  if (fc(e))
    return U.characterGroupPunctuation;
}
function Wr(e, t, n) {
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
  resolveAll: Sc,
  tokenize: xc
};
function Sc(e, t) {
  let n = -1, r, i, a, o, s, c, d, l;
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
            type: c > 1 ? h.strongSequence : h.emphasisSequence,
            start: f,
            end: { ...e[r][1].end }
          }, s = {
            type: c > 1 ? h.strongSequence : h.emphasisSequence,
            start: { ...e[n][1].start },
            end: m
          }, a = {
            type: c > 1 ? h.strongText : h.emphasisText,
            start: { ...e[r][1].end },
            end: { ...e[n][1].start }
          }, i = {
            type: c > 1 ? h.strong : h.emphasis,
            start: { ...o.start },
            end: { ...s.end }
          }, e[r][1].end = { ...o.start }, e[n][1].start = { ...s.end }, d = [], e[r][1].end.offset - e[r][1].start.offset && (d = ut(d, [
            ["enter", e[r][1], t],
            ["exit", e[r][1], t]
          ])), d = ut(d, [
            ["enter", i, t],
            ["enter", o, t],
            ["exit", o, t],
            ["enter", a, t]
          ]), k(
            t.parser.constructs.insideSpan.null,
            "expected `insideSpan` to be populated"
          ), d = ut(
            d,
            Wr(
              t.parser.constructs.insideSpan.null,
              e.slice(r + 1, n),
              t
            )
          ), d = ut(d, [
            ["exit", a, t],
            ["enter", s, t],
            ["exit", s, t],
            ["exit", i, t]
          ]), e[n][1].end.offset - e[n][1].start.offset ? (l = 2, d = ut(d, [
            ["enter", e[n][1], t],
            ["exit", e[n][1], t]
          ])) : l = 0, Et(e, r - 1, n - r + 3, d), n = r + d.length - l - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function xc(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Ri(r);
  let a;
  return o;
  function o(c) {
    return k(
      c === p.asterisk || c === p.underscore,
      "expected asterisk or underscore"
    ), a = c, e.enter("attentionSequence"), s(c);
  }
  function s(c) {
    if (c === a)
      return e.consume(c), s;
    const d = e.exit("attentionSequence"), l = Ri(c);
    k(n, "expected `attentionMarkers` to be populated");
    const f = !l || l === U.characterGroupPunctuation && i || n.includes(c), m = !i || i === U.characterGroupPunctuation && l || n.includes(r);
    return d._open = !!(a === p.asterisk ? f : f && (i || !m)), d._close = !!(a === p.asterisk ? m : m && (l || !f)), t(c);
  }
}
function Mi(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const Tc = { name: "autolink", tokenize: bc };
function bc(e, t, n) {
  let r = 0;
  return i;
  function i(g) {
    return k(g === p.lessThan, "expected `<`"), e.enter(h.autolink), e.enter(h.autolinkMarker), e.consume(g), e.exit(h.autolinkMarker), e.enter(h.autolinkProtocol), a;
  }
  function a(g) {
    return Tt(g) ? (e.consume(g), o) : g === p.atSign ? n(g) : d(g);
  }
  function o(g) {
    return g === p.plusSign || g === p.dash || g === p.dot || lt(g) ? (r = 1, s(g)) : d(g);
  }
  function s(g) {
    return g === p.colon ? (e.consume(g), r = 0, c) : (g === p.plusSign || g === p.dash || g === p.dot || lt(g)) && r++ < U.autolinkSchemeSizeMax ? (e.consume(g), s) : (r = 0, d(g));
  }
  function c(g) {
    return g === p.greaterThan ? (e.exit(h.autolinkProtocol), e.enter(h.autolinkMarker), e.consume(g), e.exit(h.autolinkMarker), e.exit(h.autolink), t) : g === p.eof || g === p.space || g === p.lessThan || Er(g) ? n(g) : (e.consume(g), c);
  }
  function d(g) {
    return g === p.atSign ? (e.consume(g), l) : dc(g) ? (e.consume(g), d) : n(g);
  }
  function l(g) {
    return lt(g) ? f(g) : n(g);
  }
  function f(g) {
    return g === p.dot ? (e.consume(g), r = 0, l) : g === p.greaterThan ? (e.exit(h.autolinkProtocol).type = h.autolinkEmail, e.enter(h.autolinkMarker), e.consume(g), e.exit(h.autolinkMarker), e.exit(h.autolink), t) : m(g);
  }
  function m(g) {
    if ((g === p.dash || lt(g)) && r++ < U.autolinkDomainSizeMax) {
      const S = g === p.dash ? m : f;
      return e.consume(g), S;
    }
    return n(g);
  }
}
const Gn = { partial: !0, tokenize: Ec };
function Ec(e, t, n) {
  return r;
  function r(a) {
    return ge(a) ? Se(e, i, h.linePrefix)(a) : i(a);
  }
  function i(a) {
    return a === p.eof || V(a) ? t(a) : n(a);
  }
}
const Da = {
  continuation: { tokenize: vc },
  exit: Ic,
  name: "blockQuote",
  tokenize: _c
};
function _c(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    if (o === p.greaterThan) {
      const s = r.containerState;
      return k(s, "expected `containerState` to be defined in container"), s.open || (e.enter(h.blockQuote, { _container: !0 }), s.open = !0), e.enter(h.blockQuotePrefix), e.enter(h.blockQuoteMarker), e.consume(o), e.exit(h.blockQuoteMarker), a;
    }
    return n(o);
  }
  function a(o) {
    return ge(o) ? (e.enter(h.blockQuotePrefixWhitespace), e.consume(o), e.exit(h.blockQuotePrefixWhitespace), e.exit(h.blockQuotePrefix), t) : (e.exit(h.blockQuotePrefix), t(o));
  }
}
function vc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return ge(o) ? (k(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Se(
      e,
      a,
      h.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize
    )(o)) : a(o);
  }
  function a(o) {
    return e.attempt(Da, t, n)(o);
  }
}
function Ic(e) {
  e.exit(h.blockQuote);
}
const Pa = {
  name: "characterEscape",
  tokenize: Rc
};
function Rc(e, t, n) {
  return r;
  function r(a) {
    return k(a === p.backslash, "expected `\\`"), e.enter(h.characterEscape), e.enter(h.escapeMarker), e.consume(a), e.exit(h.escapeMarker), i;
  }
  function i(a) {
    return pc(a) ? (e.enter(h.characterEscapeValue), e.consume(a), e.exit(h.characterEscapeValue), e.exit(h.characterEscape), t) : n(a);
  }
}
const Fa = {
  name: "characterReference",
  tokenize: Mc
};
function Mc(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return s;
  function s(f) {
    return k(f === p.ampersand, "expected `&`"), e.enter(h.characterReference), e.enter(h.characterReferenceMarker), e.consume(f), e.exit(h.characterReferenceMarker), c;
  }
  function c(f) {
    return f === p.numberSign ? (e.enter(h.characterReferenceMarkerNumeric), e.consume(f), e.exit(h.characterReferenceMarkerNumeric), d) : (e.enter(h.characterReferenceValue), a = U.characterReferenceNamedSizeMax, o = lt, l(f));
  }
  function d(f) {
    return f === p.uppercaseX || f === p.lowercaseX ? (e.enter(h.characterReferenceMarkerHexadecimal), e.consume(f), e.exit(h.characterReferenceMarkerHexadecimal), e.enter(h.characterReferenceValue), a = U.characterReferenceHexadecimalSizeMax, o = hc, l) : (e.enter(h.characterReferenceValue), a = U.characterReferenceDecimalSizeMax, o = _r, l(f));
  }
  function l(f) {
    if (f === p.semicolon && i) {
      const m = e.exit(h.characterReferenceValue);
      return o === lt && !Br(r.sliceSerialize(m)) ? n(f) : (e.enter(h.characterReferenceMarker), e.consume(f), e.exit(h.characterReferenceMarker), e.exit(h.characterReference), t);
    }
    return o(f) && i++ < a ? (e.consume(f), l) : n(f);
  }
}
const Ai = {
  partial: !0,
  tokenize: Nc
}, Ni = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Ac
};
function Ac(e, t, n) {
  const r = this, i = { partial: !0, tokenize: N };
  let a = 0, o = 0, s;
  return c;
  function c(b) {
    return d(b);
  }
  function d(b) {
    k(
      b === p.graveAccent || b === p.tilde,
      "expected `` ` `` or `~`"
    );
    const G = r.events[r.events.length - 1];
    return a = G && G[1].type === h.linePrefix ? G[2].sliceSerialize(G[1], !0).length : 0, s = b, e.enter(h.codeFenced), e.enter(h.codeFencedFence), e.enter(h.codeFencedFenceSequence), l(b);
  }
  function l(b) {
    return b === s ? (o++, e.consume(b), l) : o < U.codeFencedSequenceSizeMin ? n(b) : (e.exit(h.codeFencedFenceSequence), ge(b) ? Se(e, f, h.whitespace)(b) : f(b));
  }
  function f(b) {
    return b === p.eof || V(b) ? (e.exit(h.codeFencedFence), r.interrupt ? t(b) : e.check(Ai, x, F)(b)) : (e.enter(h.codeFencedFenceInfo), e.enter(h.chunkString, { contentType: U.contentTypeString }), m(b));
  }
  function m(b) {
    return b === p.eof || V(b) ? (e.exit(h.chunkString), e.exit(h.codeFencedFenceInfo), f(b)) : ge(b) ? (e.exit(h.chunkString), e.exit(h.codeFencedFenceInfo), Se(e, g, h.whitespace)(b)) : b === p.graveAccent && b === s ? n(b) : (e.consume(b), m);
  }
  function g(b) {
    return b === p.eof || V(b) ? f(b) : (e.enter(h.codeFencedFenceMeta), e.enter(h.chunkString, { contentType: U.contentTypeString }), S(b));
  }
  function S(b) {
    return b === p.eof || V(b) ? (e.exit(h.chunkString), e.exit(h.codeFencedFenceMeta), f(b)) : b === p.graveAccent && b === s ? n(b) : (e.consume(b), S);
  }
  function x(b) {
    return k(V(b), "expected eol"), e.attempt(i, F, R)(b);
  }
  function R(b) {
    return k(V(b), "expected eol"), e.enter(h.lineEnding), e.consume(b), e.exit(h.lineEnding), T;
  }
  function T(b) {
    return a > 0 && ge(b) ? Se(
      e,
      M,
      h.linePrefix,
      a + 1
    )(b) : M(b);
  }
  function M(b) {
    return b === p.eof || V(b) ? e.check(Ai, x, F)(b) : (e.enter(h.codeFlowValue), P(b));
  }
  function P(b) {
    return b === p.eof || V(b) ? (e.exit(h.codeFlowValue), M(b)) : (e.consume(b), P);
  }
  function F(b) {
    return e.exit(h.codeFenced), t(b);
  }
  function N(b, G, Z) {
    let $ = 0;
    return ne;
    function ne(B) {
      return k(V(B), "expected eol"), b.enter(h.lineEnding), b.consume(B), b.exit(h.lineEnding), Y;
    }
    function Y(B) {
      return k(
        r.parser.constructs.disable.null,
        "expected `disable.null` to be populated"
      ), b.enter(h.codeFencedFence), ge(B) ? Se(
        b,
        W,
        h.linePrefix,
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize
      )(B) : W(B);
    }
    function W(B) {
      return B === s ? (b.enter(h.codeFencedFenceSequence), O(B)) : Z(B);
    }
    function O(B) {
      return B === s ? ($++, b.consume(B), O) : $ >= o ? (b.exit(h.codeFencedFenceSequence), ge(B) ? Se(b, A, h.whitespace)(B) : A(B)) : Z(B);
    }
    function A(B) {
      return B === p.eof || V(B) ? (b.exit(h.codeFencedFence), G(B)) : Z(B);
    }
  }
}
function Nc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === p.eof ? n(o) : (k(V(o), "expected eol"), e.enter(h.lineEnding), e.consume(o), e.exit(h.lineEnding), a);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
const ir = {
  name: "codeIndented",
  tokenize: Oc
}, Lc = { partial: !0, tokenize: Dc };
function Oc(e, t, n) {
  const r = this;
  return i;
  function i(d) {
    return k(ge(d)), e.enter(h.codeIndented), Se(
      e,
      a,
      h.linePrefix,
      U.tabSize + 1
    )(d);
  }
  function a(d) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === h.linePrefix && l[2].sliceSerialize(l[1], !0).length >= U.tabSize ? o(d) : n(d);
  }
  function o(d) {
    return d === p.eof ? c(d) : V(d) ? e.attempt(Lc, o, c)(d) : (e.enter(h.codeFlowValue), s(d));
  }
  function s(d) {
    return d === p.eof || V(d) ? (e.exit(h.codeFlowValue), o(d)) : (e.consume(d), s);
  }
  function c(d) {
    return e.exit(h.codeIndented), t(d);
  }
}
function Dc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : V(o) ? (e.enter(h.lineEnding), e.consume(o), e.exit(h.lineEnding), i) : Se(
      e,
      a,
      h.linePrefix,
      U.tabSize + 1
    )(o);
  }
  function a(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === h.linePrefix && s[2].sliceSerialize(s[1], !0).length >= U.tabSize ? t(o) : V(o) ? i(o) : n(o);
  }
}
const Pc = {
  name: "codeText",
  previous: Ha,
  resolve: Fc,
  tokenize: Hc
};
function Fc(e) {
  let t = e.length - 4, n = 3, r, i;
  if ((e[n][1].type === h.lineEnding || e[n][1].type === "space") && (e[t][1].type === h.lineEnding || e[t][1].type === "space")) {
    for (r = n; ++r < t; )
      if (e[r][1].type === h.codeTextData) {
        e[n][1].type = h.codeTextPadding, e[t][1].type = h.codeTextPadding, n += 2, t -= 2;
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    i === void 0 ? r !== t && e[r][1].type !== h.lineEnding && (i = r) : (r === t || e[r][1].type === h.lineEnding) && (e[i][1].type = h.codeTextData, r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function Ha(e) {
  return e !== p.graveAccent || this.events[this.events.length - 1][1].type === h.characterEscape;
}
function Hc(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return s;
  function s(m) {
    return k(m === p.graveAccent, "expected `` ` ``"), k(Ha.call(r, r.previous), "expected correct previous"), e.enter(h.codeText), e.enter(h.codeTextSequence), c(m);
  }
  function c(m) {
    return m === p.graveAccent ? (e.consume(m), i++, c) : (e.exit(h.codeTextSequence), d(m));
  }
  function d(m) {
    return m === p.eof ? n(m) : m === p.space ? (e.enter("space"), e.consume(m), e.exit("space"), d) : m === p.graveAccent ? (o = e.enter(h.codeTextSequence), a = 0, f(m)) : V(m) ? (e.enter(h.lineEnding), e.consume(m), e.exit(h.lineEnding), d) : (e.enter(h.codeTextData), l(m));
  }
  function l(m) {
    return m === p.eof || m === p.space || m === p.graveAccent || V(m) ? (e.exit(h.codeTextData), d(m)) : (e.consume(m), l);
  }
  function f(m) {
    return m === p.graveAccent ? (e.consume(m), a++, f) : a === i ? (e.exit(h.codeTextSequence), e.exit(h.codeText), t(m)) : (o.type = h.codeTextData, l(m));
  }
}
class zc {
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
    return r && un(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), un(this.left, t);
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
    this.setCursor(0), un(this.right, t.reverse());
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
        un(this.right, n.reverse());
      } else {
        const n = this.right.splice(
          this.left.length + this.right.length - t,
          Number.POSITIVE_INFINITY
        );
        un(this.left, n.reverse());
      }
  }
}
function un(e, t) {
  let n = 0;
  if (t.length < U.v8MaxSafeChunkSize)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(
        ...t.slice(n, n + U.v8MaxSafeChunkSize)
      ), n += U.v8MaxSafeChunkSize;
}
function za(e) {
  const t = {};
  let n = -1, r, i, a, o, s, c, d;
  const l = new zc(e);
  for (; ++n < l.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = l.get(n), n && r[1].type === h.chunkFlow && l.get(n - 1)[1].type === h.listItemPrefix && (k(r[1]._tokenizer, "expected `_tokenizer` on subtokens"), c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === h.lineEndingBlank && (a += 2), a < c.length && c[a][1].type === h.content))
      for (; ++a < c.length && c[a][1].type !== h.content; )
        c[a][1].type === h.chunkText && (c[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, Uc(l, n)), n = t[n], d = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (o = l.get(a), o[1].type === h.lineEnding || o[1].type === h.lineEndingBlank)
          o[0] === "enter" && (i && (l.get(i)[1].type = h.lineEndingBlank), o[1].type = h.lineEnding, i = a);
        else if (!(o[1].type === h.linePrefix || o[1].type === h.listItemIndent)) break;
      i && (r[1].end = { ...l.get(i)[1].start }, s = l.slice(i, n), s.unshift(r), l.splice(i, n - i + 1, s));
    }
  }
  return Et(e, 0, Number.POSITIVE_INFINITY, l.slice(0)), !d;
}
function Uc(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  k(n.contentType, "expected `contentType` on subtokens");
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const s = o.events, c = [], d = {};
  let l, f, m = -1, g = n, S = 0, x = 0;
  const R = [x];
  for (; g; ) {
    for (; e.get(++i)[1] !== g; )
      ;
    k(
      !f || g.previous === f,
      "expected previous to match"
    ), k(!f || f.next === g, "expected next to match"), a.push(i), g._tokenizer || (l = r.sliceStream(g), g.next || l.push(p.eof), f && o.defineSkip(g.start), g._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(l), g._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), f = g, g = g.next;
  }
  for (g = n; ++m < s.length; )
    // Find a void token that includes a break.
    s[m][0] === "exit" && s[m - 1][0] === "enter" && s[m][1].type === s[m - 1][1].type && s[m][1].start.line !== s[m][1].end.line && (k(g, "expected a current token"), x = m + 1, R.push(x), g._tokenizer = void 0, g.previous = void 0, g = g.next);
  for (o.events = [], g ? (g._tokenizer = void 0, g.previous = void 0, k(!g.next, "expected no next token")) : R.pop(), m = R.length; m--; ) {
    const T = s.slice(R[m], R[m + 1]), M = a.pop();
    k(M !== void 0, "expected a start position when splicing"), c.push([M, M + T.length - 1]), e.splice(M, 2, T);
  }
  for (c.reverse(), m = -1; ++m < c.length; )
    d[S + c[m][0]] = S + c[m][1], S += c[m][1] - c[m][0] - 1;
  return d;
}
const Bc = { resolve: Gc, tokenize: Vc }, Wc = { partial: !0, tokenize: $c };
function Gc(e) {
  return za(e), e;
}
function Vc(e, t) {
  let n;
  return r;
  function r(s) {
    return k(
      s !== p.eof && !V(s),
      "expected no eof or eol"
    ), e.enter(h.content), n = e.enter(h.chunkContent, {
      contentType: U.contentTypeContent
    }), i(s);
  }
  function i(s) {
    return s === p.eof ? a(s) : V(s) ? e.check(
      Wc,
      o,
      a
    )(s) : (e.consume(s), i);
  }
  function a(s) {
    return e.exit(h.chunkContent), e.exit(h.content), t(s);
  }
  function o(s) {
    return k(V(s), "expected eol"), e.consume(s), e.exit(h.chunkContent), k(n, "expected previous token"), n.next = e.enter(h.chunkContent, {
      contentType: U.contentTypeContent,
      previous: n
    }), n = n.next, i;
  }
}
function $c(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return k(V(o), "expected a line ending"), e.exit(h.chunkContent), e.enter(h.lineEnding), e.consume(o), e.exit(h.lineEnding), Se(e, a, h.linePrefix);
  }
  function a(o) {
    if (o === p.eof || V(o))
      return n(o);
    k(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    );
    const s = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && s && s[1].type === h.linePrefix && s[2].sliceSerialize(s[1], !0).length >= U.tabSize ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function Ua(e, t, n, r, i, a, o, s, c) {
  const d = c || Number.POSITIVE_INFINITY;
  let l = 0;
  return f;
  function f(T) {
    return T === p.lessThan ? (e.enter(r), e.enter(i), e.enter(a), e.consume(T), e.exit(a), m) : T === p.eof || T === p.space || T === p.rightParenthesis || Er(T) ? n(T) : (e.enter(r), e.enter(o), e.enter(s), e.enter(h.chunkString, { contentType: U.contentTypeString }), x(T));
  }
  function m(T) {
    return T === p.greaterThan ? (e.enter(a), e.consume(T), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter(h.chunkString, { contentType: U.contentTypeString }), g(T));
  }
  function g(T) {
    return T === p.greaterThan ? (e.exit(h.chunkString), e.exit(s), m(T)) : T === p.eof || T === p.lessThan || V(T) ? n(T) : (e.consume(T), T === p.backslash ? S : g);
  }
  function S(T) {
    return T === p.lessThan || T === p.greaterThan || T === p.backslash ? (e.consume(T), g) : g(T);
  }
  function x(T) {
    return !l && (T === p.eof || T === p.rightParenthesis || nt(T)) ? (e.exit(h.chunkString), e.exit(s), e.exit(o), e.exit(r), t(T)) : l < d && T === p.leftParenthesis ? (e.consume(T), l++, x) : T === p.rightParenthesis ? (e.consume(T), l--, x) : T === p.eof || T === p.space || T === p.leftParenthesis || Er(T) ? n(T) : (e.consume(T), T === p.backslash ? R : x);
  }
  function R(T) {
    return T === p.leftParenthesis || T === p.rightParenthesis || T === p.backslash ? (e.consume(T), x) : x(T);
  }
}
function Ba(e, t, n, r, i, a) {
  const o = this;
  let s = 0, c;
  return d;
  function d(g) {
    return k(g === p.leftSquareBracket, "expected `[`"), e.enter(r), e.enter(i), e.consume(g), e.exit(i), e.enter(a), l;
  }
  function l(g) {
    return s > U.linkReferenceSizeMax || g === p.eof || g === p.leftSquareBracket || g === p.rightSquareBracket && !c || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    g === p.caret && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(g) : g === p.rightSquareBracket ? (e.exit(a), e.enter(i), e.consume(g), e.exit(i), e.exit(r), t) : V(g) ? (e.enter(h.lineEnding), e.consume(g), e.exit(h.lineEnding), l) : (e.enter(h.chunkString, { contentType: U.contentTypeString }), f(g));
  }
  function f(g) {
    return g === p.eof || g === p.leftSquareBracket || g === p.rightSquareBracket || V(g) || s++ > U.linkReferenceSizeMax ? (e.exit(h.chunkString), l(g)) : (e.consume(g), c || (c = !ge(g)), g === p.backslash ? m : f);
  }
  function m(g) {
    return g === p.leftSquareBracket || g === p.backslash || g === p.rightSquareBracket ? (e.consume(g), s++, f) : f(g);
  }
}
function Wa(e, t, n, r, i, a) {
  let o;
  return s;
  function s(m) {
    return m === p.quotationMark || m === p.apostrophe || m === p.leftParenthesis ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), o = m === p.leftParenthesis ? p.rightParenthesis : m, c) : n(m);
  }
  function c(m) {
    return m === o ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), t) : (e.enter(a), d(m));
  }
  function d(m) {
    return m === o ? (e.exit(a), c(o)) : m === p.eof ? n(m) : V(m) ? (e.enter(h.lineEnding), e.consume(m), e.exit(h.lineEnding), Se(e, d, h.linePrefix)) : (e.enter(h.chunkString, { contentType: U.contentTypeString }), l(m));
  }
  function l(m) {
    return m === o || m === p.eof || V(m) ? (e.exit(h.chunkString), d(m)) : (e.consume(m), m === p.backslash ? f : l);
  }
  function f(m) {
    return m === o || m === p.backslash ? (e.consume(m), l) : l(m);
  }
}
function pn(e, t) {
  let n;
  return r;
  function r(i) {
    return V(i) ? (e.enter(h.lineEnding), e.consume(i), e.exit(h.lineEnding), n = !0, r) : ge(i) ? Se(
      e,
      r,
      n ? h.linePrefix : h.lineSuffix
    )(i) : t(i);
  }
}
const jc = { name: "definition", tokenize: Zc }, qc = { partial: !0, tokenize: Kc };
function Zc(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(g) {
    return e.enter(h.definition), o(g);
  }
  function o(g) {
    return k(g === p.leftSquareBracket, "expected `[`"), Ba.call(
      r,
      e,
      s,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      h.definitionLabel,
      h.definitionLabelMarker,
      h.definitionLabelString
    )(g);
  }
  function s(g) {
    return i = Jt(
      r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
    ), g === p.colon ? (e.enter(h.definitionMarker), e.consume(g), e.exit(h.definitionMarker), c) : n(g);
  }
  function c(g) {
    return nt(g) ? pn(e, d)(g) : d(g);
  }
  function d(g) {
    return Ua(
      e,
      l,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      h.definitionDestination,
      h.definitionDestinationLiteral,
      h.definitionDestinationLiteralMarker,
      h.definitionDestinationRaw,
      h.definitionDestinationString
    )(g);
  }
  function l(g) {
    return e.attempt(qc, f, f)(g);
  }
  function f(g) {
    return ge(g) ? Se(e, m, h.whitespace)(g) : m(g);
  }
  function m(g) {
    return g === p.eof || V(g) ? (e.exit(h.definition), r.parser.defined.push(i), t(g)) : n(g);
  }
}
function Kc(e, t, n) {
  return r;
  function r(s) {
    return nt(s) ? pn(e, i)(s) : n(s);
  }
  function i(s) {
    return Wa(
      e,
      a,
      n,
      h.definitionTitle,
      h.definitionTitleMarker,
      h.definitionTitleString
    )(s);
  }
  function a(s) {
    return ge(s) ? Se(
      e,
      o,
      h.whitespace
    )(s) : o(s);
  }
  function o(s) {
    return s === p.eof || V(s) ? t(s) : n(s);
  }
}
const Xc = {
  name: "hardBreakEscape",
  tokenize: Yc
};
function Yc(e, t, n) {
  return r;
  function r(a) {
    return k(a === p.backslash, "expected `\\`"), e.enter(h.hardBreakEscape), e.consume(a), i;
  }
  function i(a) {
    return V(a) ? (e.exit(h.hardBreakEscape), t(a)) : n(a);
  }
}
const Jc = {
  name: "headingAtx",
  resolve: Qc,
  tokenize: eu
};
function Qc(e, t) {
  let n = e.length - 2, r = 3, i, a;
  return e[r][1].type === h.whitespace && (r += 2), n - 2 > r && e[n][1].type === h.whitespace && (n -= 2), e[n][1].type === h.atxHeadingSequence && (r === n - 1 || n - 4 > r && e[n - 2][1].type === h.whitespace) && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: h.atxHeadingText,
    start: e[r][1].start,
    end: e[n][1].end
  }, a = {
    type: h.chunkText,
    start: e[r][1].start,
    end: e[n][1].end,
    contentType: U.contentTypeText
  }, Et(e, r, n - r + 1, [
    ["enter", i, t],
    ["enter", a, t],
    ["exit", a, t],
    ["exit", i, t]
  ])), e;
}
function eu(e, t, n) {
  let r = 0;
  return i;
  function i(l) {
    return e.enter(h.atxHeading), a(l);
  }
  function a(l) {
    return k(l === p.numberSign, "expected `#`"), e.enter(h.atxHeadingSequence), o(l);
  }
  function o(l) {
    return l === p.numberSign && r++ < U.atxHeadingOpeningFenceSizeMax ? (e.consume(l), o) : l === p.eof || nt(l) ? (e.exit(h.atxHeadingSequence), s(l)) : n(l);
  }
  function s(l) {
    return l === p.numberSign ? (e.enter(h.atxHeadingSequence), c(l)) : l === p.eof || V(l) ? (e.exit(h.atxHeading), t(l)) : ge(l) ? Se(e, s, h.whitespace)(l) : (e.enter(h.atxHeadingText), d(l));
  }
  function c(l) {
    return l === p.numberSign ? (e.consume(l), c) : (e.exit(h.atxHeadingSequence), s(l));
  }
  function d(l) {
    return l === p.eof || l === p.numberSign || nt(l) ? (e.exit(h.atxHeadingText), s(l)) : (e.consume(l), d);
  }
}
const tu = [
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
], Li = ["pre", "script", "style", "textarea"], nu = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: au,
  tokenize: ou
}, ru = { partial: !0, tokenize: lu }, iu = {
  partial: !0,
  tokenize: su
};
function au(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === h.htmlFlow); )
    ;
  return t > 1 && e[t - 2][1].type === h.linePrefix && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function ou(e, t, n) {
  const r = this;
  let i, a, o, s, c;
  return d;
  function d(C) {
    return l(C);
  }
  function l(C) {
    return k(C === p.lessThan, "expected `<`"), e.enter(h.htmlFlow), e.enter(h.htmlFlowData), e.consume(C), f;
  }
  function f(C) {
    return C === p.exclamationMark ? (e.consume(C), m) : C === p.slash ? (e.consume(C), a = !0, x) : C === p.questionMark ? (e.consume(C), i = U.htmlInstruction, r.interrupt ? t : y) : Tt(C) ? (k(C !== null), e.consume(C), o = String.fromCharCode(C), R) : n(C);
  }
  function m(C) {
    return C === p.dash ? (e.consume(C), i = U.htmlComment, g) : C === p.leftSquareBracket ? (e.consume(C), i = U.htmlCdata, s = 0, S) : Tt(C) ? (e.consume(C), i = U.htmlDeclaration, r.interrupt ? t : y) : n(C);
  }
  function g(C) {
    return C === p.dash ? (e.consume(C), r.interrupt ? t : y) : n(C);
  }
  function S(C) {
    const le = U.cdataOpeningString;
    return C === le.charCodeAt(s++) ? (e.consume(C), s === le.length ? r.interrupt ? t : W : S) : n(C);
  }
  function x(C) {
    return Tt(C) ? (k(C !== null), e.consume(C), o = String.fromCharCode(C), R) : n(C);
  }
  function R(C) {
    if (C === p.eof || C === p.slash || C === p.greaterThan || nt(C)) {
      const le = C === p.slash, X = o.toLowerCase();
      return !le && !a && Li.includes(X) ? (i = U.htmlRaw, r.interrupt ? t(C) : W(C)) : tu.includes(o.toLowerCase()) ? (i = U.htmlBasic, le ? (e.consume(C), T) : r.interrupt ? t(C) : W(C)) : (i = U.htmlComplete, r.interrupt && !r.parser.lazy[r.now().line] ? n(C) : a ? M(C) : P(C));
    }
    return C === p.dash || lt(C) ? (e.consume(C), o += String.fromCharCode(C), R) : n(C);
  }
  function T(C) {
    return C === p.greaterThan ? (e.consume(C), r.interrupt ? t : W) : n(C);
  }
  function M(C) {
    return ge(C) ? (e.consume(C), M) : ne(C);
  }
  function P(C) {
    return C === p.slash ? (e.consume(C), ne) : C === p.colon || C === p.underscore || Tt(C) ? (e.consume(C), F) : ge(C) ? (e.consume(C), P) : ne(C);
  }
  function F(C) {
    return C === p.dash || C === p.dot || C === p.colon || C === p.underscore || lt(C) ? (e.consume(C), F) : N(C);
  }
  function N(C) {
    return C === p.equalsTo ? (e.consume(C), b) : ge(C) ? (e.consume(C), N) : P(C);
  }
  function b(C) {
    return C === p.eof || C === p.lessThan || C === p.equalsTo || C === p.greaterThan || C === p.graveAccent ? n(C) : C === p.quotationMark || C === p.apostrophe ? (e.consume(C), c = C, G) : ge(C) ? (e.consume(C), b) : Z(C);
  }
  function G(C) {
    return C === c ? (e.consume(C), c = null, $) : C === p.eof || V(C) ? n(C) : (e.consume(C), G);
  }
  function Z(C) {
    return C === p.eof || C === p.quotationMark || C === p.apostrophe || C === p.slash || C === p.lessThan || C === p.equalsTo || C === p.greaterThan || C === p.graveAccent || nt(C) ? N(C) : (e.consume(C), Z);
  }
  function $(C) {
    return C === p.slash || C === p.greaterThan || ge(C) ? P(C) : n(C);
  }
  function ne(C) {
    return C === p.greaterThan ? (e.consume(C), Y) : n(C);
  }
  function Y(C) {
    return C === p.eof || V(C) ? W(C) : ge(C) ? (e.consume(C), Y) : n(C);
  }
  function W(C) {
    return C === p.dash && i === U.htmlComment ? (e.consume(C), Q) : C === p.lessThan && i === U.htmlRaw ? (e.consume(C), H) : C === p.greaterThan && i === U.htmlDeclaration ? (e.consume(C), oe) : C === p.questionMark && i === U.htmlInstruction ? (e.consume(C), y) : C === p.rightSquareBracket && i === U.htmlCdata ? (e.consume(C), Te) : V(C) && (i === U.htmlBasic || i === U.htmlComplete) ? (e.exit(h.htmlFlowData), e.check(
      ru,
      Ge,
      O
    )(C)) : C === p.eof || V(C) ? (e.exit(h.htmlFlowData), O(C)) : (e.consume(C), W);
  }
  function O(C) {
    return e.check(
      iu,
      A,
      Ge
    )(C);
  }
  function A(C) {
    return k(V(C)), e.enter(h.lineEnding), e.consume(C), e.exit(h.lineEnding), B;
  }
  function B(C) {
    return C === p.eof || V(C) ? O(C) : (e.enter(h.htmlFlowData), W(C));
  }
  function Q(C) {
    return C === p.dash ? (e.consume(C), y) : W(C);
  }
  function H(C) {
    return C === p.slash ? (e.consume(C), o = "", we) : W(C);
  }
  function we(C) {
    if (C === p.greaterThan) {
      const le = o.toLowerCase();
      return Li.includes(le) ? (e.consume(C), oe) : W(C);
    }
    return Tt(C) && o.length < U.htmlRawSizeMax ? (k(C !== null), e.consume(C), o += String.fromCharCode(C), we) : W(C);
  }
  function Te(C) {
    return C === p.rightSquareBracket ? (e.consume(C), y) : W(C);
  }
  function y(C) {
    return C === p.greaterThan ? (e.consume(C), oe) : C === p.dash && i === U.htmlComment ? (e.consume(C), y) : W(C);
  }
  function oe(C) {
    return C === p.eof || V(C) ? (e.exit(h.htmlFlowData), Ge(C)) : (e.consume(C), oe);
  }
  function Ge(C) {
    return e.exit(h.htmlFlow), t(C);
  }
}
function su(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return V(o) ? (e.enter(h.lineEnding), e.consume(o), e.exit(h.lineEnding), a) : n(o);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function lu(e, t, n) {
  return r;
  function r(i) {
    return k(V(i), "expected a line ending"), e.enter(h.lineEnding), e.consume(i), e.exit(h.lineEnding), e.attempt(Gn, t, n);
  }
}
const cu = { name: "htmlText", tokenize: uu };
function uu(e, t, n) {
  const r = this;
  let i, a, o;
  return s;
  function s(y) {
    return k(y === p.lessThan, "expected `<`"), e.enter(h.htmlText), e.enter(h.htmlTextData), e.consume(y), c;
  }
  function c(y) {
    return y === p.exclamationMark ? (e.consume(y), d) : y === p.slash ? (e.consume(y), N) : y === p.questionMark ? (e.consume(y), P) : Tt(y) ? (e.consume(y), Z) : n(y);
  }
  function d(y) {
    return y === p.dash ? (e.consume(y), l) : y === p.leftSquareBracket ? (e.consume(y), a = 0, S) : Tt(y) ? (e.consume(y), M) : n(y);
  }
  function l(y) {
    return y === p.dash ? (e.consume(y), g) : n(y);
  }
  function f(y) {
    return y === p.eof ? n(y) : y === p.dash ? (e.consume(y), m) : V(y) ? (o = f, H(y)) : (e.consume(y), f);
  }
  function m(y) {
    return y === p.dash ? (e.consume(y), g) : f(y);
  }
  function g(y) {
    return y === p.greaterThan ? Q(y) : y === p.dash ? m(y) : f(y);
  }
  function S(y) {
    const oe = U.cdataOpeningString;
    return y === oe.charCodeAt(a++) ? (e.consume(y), a === oe.length ? x : S) : n(y);
  }
  function x(y) {
    return y === p.eof ? n(y) : y === p.rightSquareBracket ? (e.consume(y), R) : V(y) ? (o = x, H(y)) : (e.consume(y), x);
  }
  function R(y) {
    return y === p.rightSquareBracket ? (e.consume(y), T) : x(y);
  }
  function T(y) {
    return y === p.greaterThan ? Q(y) : y === p.rightSquareBracket ? (e.consume(y), T) : x(y);
  }
  function M(y) {
    return y === p.eof || y === p.greaterThan ? Q(y) : V(y) ? (o = M, H(y)) : (e.consume(y), M);
  }
  function P(y) {
    return y === p.eof ? n(y) : y === p.questionMark ? (e.consume(y), F) : V(y) ? (o = P, H(y)) : (e.consume(y), P);
  }
  function F(y) {
    return y === p.greaterThan ? Q(y) : P(y);
  }
  function N(y) {
    return Tt(y) ? (e.consume(y), b) : n(y);
  }
  function b(y) {
    return y === p.dash || lt(y) ? (e.consume(y), b) : G(y);
  }
  function G(y) {
    return V(y) ? (o = G, H(y)) : ge(y) ? (e.consume(y), G) : Q(y);
  }
  function Z(y) {
    return y === p.dash || lt(y) ? (e.consume(y), Z) : y === p.slash || y === p.greaterThan || nt(y) ? $(y) : n(y);
  }
  function $(y) {
    return y === p.slash ? (e.consume(y), Q) : y === p.colon || y === p.underscore || Tt(y) ? (e.consume(y), ne) : V(y) ? (o = $, H(y)) : ge(y) ? (e.consume(y), $) : Q(y);
  }
  function ne(y) {
    return y === p.dash || y === p.dot || y === p.colon || y === p.underscore || lt(y) ? (e.consume(y), ne) : Y(y);
  }
  function Y(y) {
    return y === p.equalsTo ? (e.consume(y), W) : V(y) ? (o = Y, H(y)) : ge(y) ? (e.consume(y), Y) : $(y);
  }
  function W(y) {
    return y === p.eof || y === p.lessThan || y === p.equalsTo || y === p.greaterThan || y === p.graveAccent ? n(y) : y === p.quotationMark || y === p.apostrophe ? (e.consume(y), i = y, O) : V(y) ? (o = W, H(y)) : ge(y) ? (e.consume(y), W) : (e.consume(y), A);
  }
  function O(y) {
    return y === i ? (e.consume(y), i = void 0, B) : y === p.eof ? n(y) : V(y) ? (o = O, H(y)) : (e.consume(y), O);
  }
  function A(y) {
    return y === p.eof || y === p.quotationMark || y === p.apostrophe || y === p.lessThan || y === p.equalsTo || y === p.graveAccent ? n(y) : y === p.slash || y === p.greaterThan || nt(y) ? $(y) : (e.consume(y), A);
  }
  function B(y) {
    return y === p.slash || y === p.greaterThan || nt(y) ? $(y) : n(y);
  }
  function Q(y) {
    return y === p.greaterThan ? (e.consume(y), e.exit(h.htmlTextData), e.exit(h.htmlText), t) : n(y);
  }
  function H(y) {
    return k(o, "expected return state"), k(V(y), "expected eol"), e.exit(h.htmlTextData), e.enter(h.lineEnding), e.consume(y), e.exit(h.lineEnding), we;
  }
  function we(y) {
    return k(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), ge(y) ? Se(
      e,
      Te,
      h.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize
    )(y) : Te(y);
  }
  function Te(y) {
    return e.enter(h.htmlTextData), o(y);
  }
}
const Gr = {
  name: "labelEnd",
  resolveAll: fu,
  resolveTo: gu,
  tokenize: mu
}, du = { tokenize: Cu }, hu = { tokenize: yu }, pu = { tokenize: wu };
function fu(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === h.labelImage || r.type === h.labelLink || r.type === h.labelEnd) {
      const i = r.type === h.labelImage ? 4 : 2;
      r.type = h.data, t += i;
    }
  }
  return e.length !== n.length && Et(e, 0, e.length, n), e;
}
function gu(e, t) {
  let n = e.length, r = 0, i, a, o, s;
  for (; n--; )
    if (i = e[n][1], a) {
      if (i.type === h.link || i.type === h.labelLink && i._inactive)
        break;
      e[n][0] === "enter" && i.type === h.labelLink && (i._inactive = !0);
    } else if (o) {
      if (e[n][0] === "enter" && (i.type === h.labelImage || i.type === h.labelLink) && !i._balanced && (a = n, i.type !== h.labelLink)) {
        r = 2;
        break;
      }
    } else i.type === h.labelEnd && (o = n);
  k(a !== void 0, "`open` is supposed to be found"), k(o !== void 0, "`close` is supposed to be found");
  const c = {
    type: e[a][1].type === h.labelLink ? h.link : h.image,
    start: { ...e[a][1].start },
    end: { ...e[e.length - 1][1].end }
  }, d = {
    type: h.label,
    start: { ...e[a][1].start },
    end: { ...e[o][1].end }
  }, l = {
    type: h.labelText,
    start: { ...e[a + r + 2][1].end },
    end: { ...e[o - 2][1].start }
  };
  return s = [
    ["enter", c, t],
    ["enter", d, t]
  ], s = ut(s, e.slice(a + 1, a + r + 3)), s = ut(s, [["enter", l, t]]), k(
    t.parser.constructs.insideSpan.null,
    "expected `insideSpan.null` to be populated"
  ), s = ut(
    s,
    Wr(
      t.parser.constructs.insideSpan.null,
      e.slice(a + r + 4, o - 3),
      t
    )
  ), s = ut(s, [
    ["exit", l, t],
    e[o - 2],
    e[o - 1],
    ["exit", d, t]
  ]), s = ut(s, e.slice(o + 1)), s = ut(s, [["exit", c, t]]), Et(e, a, e.length, s), e;
}
function mu(e, t, n) {
  const r = this;
  let i = r.events.length, a, o;
  for (; i--; )
    if ((r.events[i][1].type === h.labelImage || r.events[i][1].type === h.labelLink) && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return s;
  function s(m) {
    return k(m === p.rightSquareBracket, "expected `]`"), a ? a._inactive ? f(m) : (o = r.parser.defined.includes(
      Jt(
        r.sliceSerialize({ start: a.end, end: r.now() })
      )
    ), e.enter(h.labelEnd), e.enter(h.labelMarker), e.consume(m), e.exit(h.labelMarker), e.exit(h.labelEnd), c) : n(m);
  }
  function c(m) {
    return m === p.leftParenthesis ? e.attempt(
      du,
      l,
      o ? l : f
    )(m) : m === p.leftSquareBracket ? e.attempt(
      hu,
      l,
      o ? d : f
    )(m) : o ? l(m) : f(m);
  }
  function d(m) {
    return e.attempt(
      pu,
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
function Cu(e, t, n) {
  return r;
  function r(f) {
    return k(f === p.leftParenthesis, "expected left paren"), e.enter(h.resource), e.enter(h.resourceMarker), e.consume(f), e.exit(h.resourceMarker), i;
  }
  function i(f) {
    return nt(f) ? pn(e, a)(f) : a(f);
  }
  function a(f) {
    return f === p.rightParenthesis ? l(f) : Ua(
      e,
      o,
      s,
      h.resourceDestination,
      h.resourceDestinationLiteral,
      h.resourceDestinationLiteralMarker,
      h.resourceDestinationRaw,
      h.resourceDestinationString,
      U.linkResourceDestinationBalanceMax
    )(f);
  }
  function o(f) {
    return nt(f) ? pn(e, c)(f) : l(f);
  }
  function s(f) {
    return n(f);
  }
  function c(f) {
    return f === p.quotationMark || f === p.apostrophe || f === p.leftParenthesis ? Wa(
      e,
      d,
      n,
      h.resourceTitle,
      h.resourceTitleMarker,
      h.resourceTitleString
    )(f) : l(f);
  }
  function d(f) {
    return nt(f) ? pn(e, l)(f) : l(f);
  }
  function l(f) {
    return f === p.rightParenthesis ? (e.enter(h.resourceMarker), e.consume(f), e.exit(h.resourceMarker), e.exit(h.resource), t) : n(f);
  }
}
function yu(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return k(s === p.leftSquareBracket, "expected left bracket"), Ba.call(
      r,
      e,
      a,
      o,
      h.reference,
      h.referenceMarker,
      h.referenceString
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
function wu(e, t, n) {
  return r;
  function r(a) {
    return k(a === p.leftSquareBracket, "expected left bracket"), e.enter(h.reference), e.enter(h.referenceMarker), e.consume(a), e.exit(h.referenceMarker), i;
  }
  function i(a) {
    return a === p.rightSquareBracket ? (e.enter(h.referenceMarker), e.consume(a), e.exit(h.referenceMarker), e.exit(h.reference), t) : n(a);
  }
}
const ku = {
  name: "labelStartImage",
  resolveAll: Gr.resolveAll,
  tokenize: Su
};
function Su(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return k(s === p.exclamationMark, "expected `!`"), e.enter(h.labelImage), e.enter(h.labelImageMarker), e.consume(s), e.exit(h.labelImageMarker), a;
  }
  function a(s) {
    return s === p.leftSquareBracket ? (e.enter(h.labelMarker), e.consume(s), e.exit(h.labelMarker), e.exit(h.labelImage), o) : n(s);
  }
  function o(s) {
    return s === p.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : t(s);
  }
}
const xu = {
  name: "labelStartLink",
  resolveAll: Gr.resolveAll,
  tokenize: Tu
};
function Tu(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return k(o === p.leftSquareBracket, "expected `[`"), e.enter(h.labelLink), e.enter(h.labelMarker), e.consume(o), e.exit(h.labelMarker), e.exit(h.labelLink), a;
  }
  function a(o) {
    return o === p.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const ar = { name: "lineEnding", tokenize: bu };
function bu(e, t) {
  return n;
  function n(r) {
    return k(V(r), "expected eol"), e.enter(h.lineEnding), e.consume(r), e.exit(h.lineEnding), Se(e, t, h.linePrefix);
  }
}
const On = {
  name: "thematicBreak",
  tokenize: Eu
};
function Eu(e, t, n) {
  let r = 0, i;
  return a;
  function a(d) {
    return e.enter(h.thematicBreak), o(d);
  }
  function o(d) {
    return k(
      d === p.asterisk || d === p.dash || d === p.underscore,
      "expected `*`, `-`, or `_`"
    ), i = d, s(d);
  }
  function s(d) {
    return d === i ? (e.enter(h.thematicBreakSequence), c(d)) : r >= U.thematicBreakMarkerCountMin && (d === p.eof || V(d)) ? (e.exit(h.thematicBreak), t(d)) : n(d);
  }
  function c(d) {
    return d === i ? (e.consume(d), r++, c) : (e.exit(h.thematicBreakSequence), ge(d) ? Se(e, s, h.whitespace)(d) : s(d));
  }
}
const et = {
  continuation: { tokenize: Ru },
  exit: Au,
  name: "list",
  tokenize: Iu
}, _u = {
  partial: !0,
  tokenize: Nu
}, vu = { partial: !0, tokenize: Mu };
function Iu(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === h.linePrefix ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return s;
  function s(g) {
    k(r.containerState, "expected state");
    const S = r.containerState.type || (g === p.asterisk || g === p.plusSign || g === p.dash ? h.listUnordered : h.listOrdered);
    if (S === h.listUnordered ? !r.containerState.marker || g === r.containerState.marker : _r(g)) {
      if (r.containerState.type || (r.containerState.type = S, e.enter(S, { _container: !0 })), S === h.listUnordered)
        return e.enter(h.listItemPrefix), g === p.asterisk || g === p.dash ? e.check(On, n, d)(g) : d(g);
      if (!r.interrupt || g === p.digit1)
        return e.enter(h.listItemPrefix), e.enter(h.listItemValue), c(g);
    }
    return n(g);
  }
  function c(g) {
    return k(r.containerState, "expected state"), _r(g) && ++o < U.listItemValueSizeMax ? (e.consume(g), c) : (!r.interrupt || o < 2) && (r.containerState.marker ? g === r.containerState.marker : g === p.rightParenthesis || g === p.dot) ? (e.exit(h.listItemValue), d(g)) : n(g);
  }
  function d(g) {
    return k(r.containerState, "expected state"), k(g !== p.eof, "eof (`null`) is not a marker"), e.enter(h.listItemMarker), e.consume(g), e.exit(h.listItemMarker), r.containerState.marker = r.containerState.marker || g, e.check(
      Gn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : l,
      e.attempt(
        _u,
        m,
        f
      )
    );
  }
  function l(g) {
    return k(r.containerState, "expected state"), r.containerState.initialBlankLine = !0, a++, m(g);
  }
  function f(g) {
    return ge(g) ? (e.enter(h.listItemPrefixWhitespace), e.consume(g), e.exit(h.listItemPrefixWhitespace), m) : n(g);
  }
  function m(g) {
    return k(r.containerState, "expected state"), r.containerState.size = a + r.sliceSerialize(e.exit(h.listItemPrefix), !0).length, t(g);
  }
}
function Ru(e, t, n) {
  const r = this;
  return k(r.containerState, "expected state"), r.containerState._closeFlow = void 0, e.check(Gn, i, a);
  function i(s) {
    return k(r.containerState, "expected state"), k(typeof r.containerState.size == "number", "expected size"), r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, Se(
      e,
      t,
      h.listItemIndent,
      r.containerState.size + 1
    )(s);
  }
  function a(s) {
    return k(r.containerState, "expected state"), r.containerState.furtherBlankLines || !ge(s) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(s)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(vu, t, o)(s));
  }
  function o(s) {
    return k(r.containerState, "expected state"), r.containerState._closeFlow = !0, r.interrupt = void 0, k(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Se(
      e,
      e.attempt(et, t, n),
      h.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize
    )(s);
  }
}
function Mu(e, t, n) {
  const r = this;
  return k(r.containerState, "expected state"), k(typeof r.containerState.size == "number", "expected size"), Se(
    e,
    i,
    h.listItemIndent,
    r.containerState.size + 1
  );
  function i(a) {
    k(r.containerState, "expected state");
    const o = r.events[r.events.length - 1];
    return o && o[1].type === h.listItemIndent && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function Au(e) {
  k(this.containerState, "expected state"), k(typeof this.containerState.type == "string", "expected type"), e.exit(this.containerState.type);
}
function Nu(e, t, n) {
  const r = this;
  return k(
    r.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), Se(
    e,
    i,
    h.listItemPrefixWhitespace,
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize + 1
  );
  function i(a) {
    const o = r.events[r.events.length - 1];
    return !ge(a) && o && o[1].type === h.listItemPrefixWhitespace ? t(a) : n(a);
  }
}
const Oi = {
  name: "setextUnderline",
  resolveTo: Lu,
  tokenize: Ou
};
function Lu(e, t) {
  let n = e.length, r, i, a;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === h.content) {
        r = n;
        break;
      }
      e[n][1].type === h.paragraph && (i = n);
    } else
      e[n][1].type === h.content && e.splice(n, 1), !a && e[n][1].type === h.definition && (a = n);
  k(i !== void 0, "expected a `text` index to be found"), k(r !== void 0, "expected a `text` index to be found"), k(e[r][2] === t, "enter context should be same"), k(
    e[e.length - 1][2] === t,
    "enter context should be same"
  );
  const o = {
    type: h.setextHeading,
    start: { ...e[r][1].start },
    end: { ...e[e.length - 1][1].end }
  };
  return e[i][1].type = h.setextHeadingText, a ? (e.splice(i, 0, ["enter", o, t]), e.splice(a + 1, 0, ["exit", e[r][1], t]), e[r][1].end = { ...e[a][1].end }) : e[r][1] = o, e.push(["exit", o, t]), e;
}
function Ou(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(d) {
    let l = r.events.length, f;
    for (k(
      d === p.dash || d === p.equalsTo,
      "expected `=` or `-`"
    ); l--; )
      if (r.events[l][1].type !== h.lineEnding && r.events[l][1].type !== h.linePrefix && r.events[l][1].type !== h.content) {
        f = r.events[l][1].type === h.paragraph;
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || f) ? (e.enter(h.setextHeadingLine), i = d, o(d)) : n(d);
  }
  function o(d) {
    return e.enter(h.setextHeadingLineSequence), s(d);
  }
  function s(d) {
    return d === i ? (e.consume(d), s) : (e.exit(h.setextHeadingLineSequence), ge(d) ? Se(e, c, h.lineSuffix)(d) : c(d));
  }
  function c(d) {
    return d === p.eof || V(d) ? (e.exit(h.setextHeadingLine), t(d)) : n(d);
  }
}
const Du = { tokenize: Pu };
function Pu(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    Gn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(
      this.parser.constructs.flowInitial,
      i,
      Se(
        e,
        e.attempt(
          this.parser.constructs.flow,
          i,
          e.attempt(Bc, i)
        ),
        h.linePrefix
      )
    )
  );
  return n;
  function r(a) {
    if (k(
      a === p.eof || V(a),
      "expected eol or eof"
    ), a === p.eof) {
      e.consume(a);
      return;
    }
    return e.enter(h.lineEndingBlank), e.consume(a), e.exit(h.lineEndingBlank), t.currentConstruct = void 0, n;
  }
  function i(a) {
    if (k(
      a === p.eof || V(a),
      "expected eol or eof"
    ), a === p.eof) {
      e.consume(a);
      return;
    }
    return e.enter(h.lineEnding), e.consume(a), e.exit(h.lineEnding), t.currentConstruct = void 0, n;
  }
}
const Fu = { resolveAll: Va() }, Hu = Ga("string"), zu = Ga("text");
function Ga(e) {
  return {
    resolveAll: Va(
      e === "text" ? Uu : void 0
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
      if (l === p.eof) {
        n.consume(l);
        return;
      }
      return n.enter(h.data), n.consume(l), c;
    }
    function c(l) {
      return d(l) ? (n.exit(h.data), a(l)) : (n.consume(l), c);
    }
    function d(l) {
      if (l === p.eof)
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
function Va(e) {
  return t;
  function t(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === h.data && (a = i, i++) : (!n[i] || n[i][1].type !== h.data) && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function Uu(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === h.lineEnding) && e[n - 1][1].type === h.data) {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let a = i.length, o = -1, s = 0, c;
      for (; a--; ) {
        const d = i[a];
        if (typeof d == "string") {
          for (o = d.length; d.charCodeAt(o - 1) === p.space; )
            s++, o--;
          if (o) break;
          o = -1;
        } else if (d === p.horizontalTab)
          c = !0, s++;
        else if (d !== p.virtualSpace) {
          a++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (s = 0), s) {
        const d = {
          type: n === e.length || c || s < U.hardBreakPrefixSizeMin ? h.lineSuffix : h.hardBreakTrailing,
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
const Bu = {
  [p.asterisk]: et,
  [p.plusSign]: et,
  [p.dash]: et,
  [p.digit0]: et,
  [p.digit1]: et,
  [p.digit2]: et,
  [p.digit3]: et,
  [p.digit4]: et,
  [p.digit5]: et,
  [p.digit6]: et,
  [p.digit7]: et,
  [p.digit8]: et,
  [p.digit9]: et,
  [p.greaterThan]: Da
}, Wu = {
  [p.leftSquareBracket]: jc
}, Gu = {
  [p.horizontalTab]: ir,
  [p.virtualSpace]: ir,
  [p.space]: ir
}, Vu = {
  [p.numberSign]: Jc,
  [p.asterisk]: On,
  [p.dash]: [Oi, On],
  [p.lessThan]: nu,
  [p.equalsTo]: Oi,
  [p.underscore]: On,
  [p.graveAccent]: Ni,
  [p.tilde]: Ni
}, $u = {
  [p.ampersand]: Fa,
  [p.backslash]: Pa
}, ju = {
  [p.carriageReturn]: ar,
  [p.lineFeed]: ar,
  [p.carriageReturnLineFeed]: ar,
  [p.exclamationMark]: ku,
  [p.ampersand]: Fa,
  [p.asterisk]: vr,
  [p.lessThan]: [Tc, cu],
  [p.leftSquareBracket]: xu,
  [p.backslash]: [Xc, Pa],
  [p.rightSquareBracket]: Gr,
  [p.underscore]: vr,
  [p.graveAccent]: Pc
}, qu = { null: [vr, Fu] }, Zu = { null: [p.asterisk, p.underscore] }, Ku = { null: [] }, Xu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Zu,
  contentInitial: Wu,
  disable: Ku,
  document: Bu,
  flow: Vu,
  flowInitial: Gu,
  insideSpan: qu,
  string: $u,
  text: ju
}, Symbol.toStringTag, { value: "Module" }));
var Ir = { exports: {} }, or, Di;
function Yu() {
  if (Di) return or;
  Di = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, a = r * 365.25;
  or = function(l, f) {
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
    return f >= r ? d(l, f, r, "day") : f >= n ? d(l, f, n, "hour") : f >= t ? d(l, f, t, "minute") : f >= e ? d(l, f, e, "second") : l + " ms";
  }
  function d(l, f, m, g) {
    var S = f >= m * 1.5;
    return Math.round(l / m) + " " + g + (S ? "s" : "");
  }
  return or;
}
function Ju(e) {
  n.debug = n, n.default = n, n.coerce = c, n.disable = o, n.enable = i, n.enabled = s, n.humanize = Yu(), n.destroy = d, Object.keys(e).forEach((l) => {
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
    let f, m = null, g, S;
    function x(...R) {
      if (!x.enabled)
        return;
      const T = x, M = Number(/* @__PURE__ */ new Date()), P = M - (f || M);
      T.diff = P, T.prev = f, T.curr = M, f = M, R[0] = n.coerce(R[0]), typeof R[0] != "string" && R.unshift("%O");
      let F = 0;
      R[0] = R[0].replace(/%([a-zA-Z%])/g, (b, G) => {
        if (b === "%%")
          return "%";
        F++;
        const Z = n.formatters[G];
        if (typeof Z == "function") {
          const $ = R[F];
          b = Z.call(T, $), R.splice(F, 1), F--;
        }
        return b;
      }), n.formatArgs.call(T, R), (T.log || n.log).apply(T, R);
    }
    return x.namespace = l, x.useColors = n.useColors(), x.color = n.selectColor(l), x.extend = r, x.destroy = n.destroy, Object.defineProperty(x, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => m !== null ? m : (g !== n.namespaces && (g = n.namespaces, S = n.enabled(l)), S),
      set: (R) => {
        m = R;
      }
    }), typeof n.init == "function" && n.init(x), x;
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
    let m = 0, g = 0, S = -1, x = 0;
    for (; m < l.length; )
      if (g < f.length && (f[g] === l[m] || f[g] === "*"))
        f[g] === "*" ? (S = g, x = m, g++) : (m++, g++);
      else if (S !== -1)
        g = S + 1, x++, m = x;
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
  function d() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return n.enable(n.load()), n;
}
var Qu = Ju;
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
    let l = 0, f = 0;
    c[0].replace(/%[a-zA-Z%]/g, (m) => {
      m !== "%%" && (l++, m === "%c" && (f = l));
    }), c.splice(f, 0, d);
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
  e.exports = Qu(t);
  const { formatters: s } = e.exports;
  s.j = function(c) {
    try {
      return JSON.stringify(c);
    } catch (d) {
      return "[UnexpectedJSONParseError]: " + d.message;
    }
  };
})(Ir, Ir.exports);
var e1 = Ir.exports;
const t1 = /* @__PURE__ */ Dr(e1), zt = t1("micromark");
function n1(e, t, n) {
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
    attempt: $(G),
    check: $(Z),
    consume: F,
    enter: N,
    exit: b,
    interrupt: $(Z, { interrupt: !0 })
  }, l = {
    code: p.eof,
    containerState: {},
    defineSkip: T,
    events: [],
    now: R,
    parser: e,
    previous: p.eof,
    sliceSerialize: S,
    sliceStream: x,
    write: g
  };
  let f = t.tokenize.call(l, d), m;
  return t.resolveAll && a.push(t), l;
  function g(O) {
    return o = ut(o, O), M(), o[o.length - 1] !== p.eof ? [] : (ne(t, 0), l.events = Wr(a, l.events, l), l.events);
  }
  function S(O, A) {
    return i1(x(O), A);
  }
  function x(O) {
    return r1(o, O);
  }
  function R() {
    const { _bufferIndex: O, _index: A, line: B, column: Q, offset: H } = r;
    return { _bufferIndex: O, _index: A, line: B, column: Q, offset: H };
  }
  function T(O) {
    i[O.line] = O.column, W(), zt("position: define skip: `%j`", r);
  }
  function M() {
    let O;
    for (; r._index < o.length; ) {
      const A = o[r._index];
      if (typeof A == "string")
        for (O = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === O && r._bufferIndex < A.length; )
          P(A.charCodeAt(r._bufferIndex));
      else
        P(A);
    }
  }
  function P(O) {
    k(c === !0, "expected character to be consumed"), c = void 0, zt("main: passing `%s` to %s", O, f && f.name), m = O, k(typeof f == "function", "expected state"), f = f(O);
  }
  function F(O) {
    k(O === m, "expected given code to equal expected code"), zt("consume: `%s`", O), k(
      c === void 0,
      "expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used"
    ), k(
      O === null ? l.events.length === 0 || l.events[l.events.length - 1][0] === "exit" : l.events[l.events.length - 1][0] === "enter",
      "expected last token to be open"
    ), V(O) ? (r.line++, r.column = 1, r.offset += O === p.carriageReturnLineFeed ? 2 : 1, W(), zt("position: after eol: `%j`", r)) : O !== p.virtualSpace && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = O, c = !0;
  }
  function N(O, A) {
    const B = A || {};
    return B.type = O, B.start = R(), k(typeof O == "string", "expected string type"), k(O.length > 0, "expected non-empty string"), zt("enter: `%s`", O), l.events.push(["enter", B, l]), s.push(B), B;
  }
  function b(O) {
    k(typeof O == "string", "expected string type"), k(O.length > 0, "expected non-empty string");
    const A = s.pop();
    return k(A, "cannot close w/o open tokens"), A.end = R(), k(O === A.type, "expected exit token to match current token"), k(
      !(A.start._index === A.end._index && A.start._bufferIndex === A.end._bufferIndex),
      "expected non-empty token (`" + O + "`)"
    ), zt("exit: `%s`", A.type), l.events.push(["exit", A, l]), A;
  }
  function G(O, A) {
    ne(O, A.from);
  }
  function Z(O, A) {
    A.restore();
  }
  function $(O, A) {
    return B;
    function B(Q, H, we) {
      let Te, y, oe, Ge;
      return Array.isArray(Q) ? (
        /* c8 ignore next 1 */
        le(Q)
      ) : "tokenize" in Q ? (
        // Looks like a construct.
        le([
          /** @type {Construct} */
          Q
        ])
      ) : C(Q);
      function C(J) {
        return he;
        function he(me) {
          const Ae = me !== null && J[me], ye = me !== null && J.null, xe = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ae) ? Ae : Ae ? [Ae] : [],
            ...Array.isArray(ye) ? ye : ye ? [ye] : []
          ];
          return le(xe)(me);
        }
      }
      function le(J) {
        return Te = J, y = 0, J.length === 0 ? (k(we, "expected `bogusState` to be given"), we) : X(J[y]);
      }
      function X(J) {
        return he;
        function he(me) {
          return Ge = Y(), oe = J, J.partial || (l.currentConstruct = J), k(
            l.parser.constructs.disable.null,
            "expected `disable.null` to be populated"
          ), J.name && l.parser.constructs.disable.null.includes(J.name) ? ie(me) : J.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            A ? Object.assign(Object.create(l), A) : l,
            d,
            ce,
            ie
          )(me);
        }
      }
      function ce(J) {
        return k(J === m, "expected code"), c = !0, O(oe, Ge), H;
      }
      function ie(J) {
        return k(J === m, "expected code"), c = !0, Ge.restore(), ++y < Te.length ? X(Te[y]) : we;
      }
    }
  }
  function ne(O, A) {
    O.resolveAll && !a.includes(O) && a.push(O), O.resolve && Et(
      l.events,
      A,
      l.events.length - A,
      O.resolve(l.events.slice(A), l)
    ), O.resolveTo && (l.events = O.resolveTo(l.events, l)), k(
      O.partial || l.events.length === 0 || l.events[l.events.length - 1][0] === "exit",
      "expected last token to end"
    );
  }
  function Y() {
    const O = R(), A = l.previous, B = l.currentConstruct, Q = l.events.length, H = Array.from(s);
    return { from: Q, restore: we };
    function we() {
      r = O, l.previous = A, l.currentConstruct = B, l.events.length = Q, s = H, W(), zt("position: restore: `%j`", r);
    }
  }
  function W() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function r1(e, t) {
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
function i1(e, t) {
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
        case p.carriageReturn: {
          o = kt.cr;
          break;
        }
        case p.lineFeed: {
          o = kt.lf;
          break;
        }
        case p.carriageReturnLineFeed: {
          o = kt.cr + kt.lf;
          break;
        }
        case p.horizontalTab: {
          o = t ? kt.space : kt.ht;
          break;
        }
        case p.virtualSpace: {
          if (!t && i) continue;
          o = kt.space;
          break;
        }
        default:
          k(typeof a == "number", "expected number"), o = String.fromCharCode(a);
      }
    i = a === p.horizontalTab, r.push(o);
  }
  return r.join("");
}
function a1(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      lc([Xu, ...(e || {}).extensions || []])
    ),
    content: i(mc),
    defined: [],
    document: i(yc),
    flow: i(Du),
    lazy: {},
    string: i(Hu),
    text: i(zu)
  };
  return r;
  function i(a) {
    return o;
    function o(s) {
      return n1(r, a, s);
    }
  }
}
function o1(e) {
  for (; !za(e); )
    ;
  return e;
}
const Pi = /[\0\t\n\r]/g;
function s1() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, o, s) {
    const c = [];
    let d, l, f, m, g;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(o || void 0).decode(a)), f = 0, t = "", n && (a.charCodeAt(0) === p.byteOrderMarker && f++, n = void 0); f < a.length; ) {
      if (Pi.lastIndex = f, d = Pi.exec(a), m = d && d.index !== void 0 ? d.index : a.length, g = a.charCodeAt(m), !d) {
        t = a.slice(f);
        break;
      }
      if (g === p.lf && f === m && r)
        c.push(p.carriageReturnLineFeed), r = void 0;
      else
        switch (r && (c.push(p.carriageReturn), r = void 0), f < m && (c.push(a.slice(f, m)), e += m - f), g) {
          case p.nul: {
            c.push(p.replacementCharacter), e++;
            break;
          }
          case p.ht: {
            for (l = Math.ceil(e / U.tabSize) * U.tabSize, c.push(p.horizontalTab); e++ < l; ) c.push(p.virtualSpace);
            break;
          }
          case p.lf: {
            c.push(p.lineFeed), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      f = m + 1;
    }
    return s && (r && c.push(p.carriageReturn), t && c.push(t), c.push(p.eof)), c;
  }
}
const l1 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function c1(e) {
  return e.replace(l1, u1);
}
function u1(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === p.numberSign) {
    const i = n.charCodeAt(1), a = i === p.lowercaseX || i === p.uppercaseX;
    return Oa(
      n.slice(a ? 2 : 1),
      a ? U.numericBaseHexadecimal : U.numericBaseDecimal
    );
  }
  return Br(n) || e;
}
const $a = {}.hasOwnProperty;
function d1(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), h1(n)(
    o1(
      a1(n).document().write(s1()(e, t, !0))
    )
  );
}
function h1(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(gt),
      autolinkProtocol: $,
      autolinkEmail: $,
      atxHeading: a(qe),
      blockQuote: a(me),
      characterEscape: $,
      characterReference: $,
      codeFenced: a(Ae),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: a(Ae, o),
      codeText: a(ye, o),
      codeTextData: $,
      data: $,
      codeFlowValue: $,
      definition: a(xe),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: a(Fe),
      hardBreakEscape: a(_t),
      hardBreakTrailing: a(_t),
      htmlFlow: a(vt, o),
      htmlFlowData: $,
      htmlText: a(vt, o),
      htmlTextData: $,
      image: a(ht),
      label: o,
      link: a(gt),
      listItem: a(Gt),
      listItemValue: m,
      listOrdered: a(mt, f),
      listUnordered: a(mt),
      paragraph: a(Vt),
      reference: C,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: a(qe),
      strong: a($t),
      thematicBreak: a(Ct)
    },
    exit: {
      atxHeading: c(),
      atxHeadingSequence: N,
      autolink: c(),
      autolinkEmail: he,
      autolinkProtocol: J,
      blockQuote: c(),
      characterEscapeValue: ne,
      characterReferenceMarkerHexadecimal: X,
      characterReferenceMarkerNumeric: X,
      characterReferenceValue: ce,
      characterReference: ie,
      codeFenced: c(R),
      codeFencedFence: x,
      codeFencedFenceInfo: g,
      codeFencedFenceMeta: S,
      codeFlowValue: ne,
      codeIndented: c(T),
      codeText: c(B),
      codeTextData: ne,
      data: ne,
      definition: c(),
      definitionDestinationString: F,
      definitionLabelString: M,
      definitionTitleString: P,
      emphasis: c(),
      hardBreakEscape: c(W),
      hardBreakTrailing: c(W),
      htmlFlow: c(O),
      htmlFlowData: ne,
      htmlText: c(A),
      htmlTextData: ne,
      image: c(H),
      label: Te,
      labelText: we,
      lineEnding: Y,
      link: c(Q),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: le,
      resourceDestinationString: y,
      resourceTitleString: oe,
      resource: Ge,
      setextHeading: c(Z),
      setextHeadingLineSequence: G,
      setextHeadingText: b,
      strong: c(),
      thematicBreak: c()
    }
  };
  ja(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(E) {
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
    }, re = [];
    let pe = -1;
    for (; ++pe < E.length; )
      if (E[pe][1].type === h.listOrdered || E[pe][1].type === h.listUnordered)
        if (E[pe][0] === "enter")
          re.push(pe);
        else {
          const ue = re.pop();
          k(typeof ue == "number", "expected list ot be open"), pe = i(E, ue, pe);
        }
    for (pe = -1; ++pe < E.length; ) {
      const ue = t[E[pe][0]];
      $a.call(ue, E[pe][1].type) && ue[E[pe][1].type].call(
        Object.assign(
          { sliceSerialize: E[pe][2].sliceSerialize },
          z
        ),
        E[pe][1]
      );
    }
    if (z.tokenStack.length > 0) {
      const ue = z.tokenStack[z.tokenStack.length - 1];
      (ue[1] || Fi).call(z, void 0, ue[0]);
    }
    for (_.position = {
      start: Dt(
        E.length > 0 ? E[0][1].start : { line: 1, column: 1, offset: 0 }
      ),
      end: Dt(
        E.length > 0 ? E[E.length - 2][1].end : { line: 1, column: 1, offset: 0 }
      )
    }, pe = -1; ++pe < t.transforms.length; )
      _ = t.transforms[pe](_) || _;
    return _;
  }
  function i(E, _, z) {
    let re = _ - 1, pe = -1, ue = !1, Ue, De, it, Pe;
    for (; ++re <= z; ) {
      const _e = E[re];
      switch (_e[1].type) {
        case h.listUnordered:
        case h.listOrdered:
        case h.blockQuote: {
          _e[0] === "enter" ? pe++ : pe--, Pe = void 0;
          break;
        }
        case h.lineEndingBlank: {
          _e[0] === "enter" && (Ue && !Pe && !pe && !it && (it = re), Pe = void 0);
          break;
        }
        case h.linePrefix:
        case h.listItemValue:
        case h.listItemMarker:
        case h.listItemPrefix:
        case h.listItemPrefixWhitespace:
          break;
        default:
          Pe = void 0;
      }
      if (!pe && _e[0] === "enter" && _e[1].type === h.listItemPrefix || pe === -1 && _e[0] === "exit" && (_e[1].type === h.listUnordered || _e[1].type === h.listOrdered)) {
        if (Ue) {
          let Be = re;
          for (De = void 0; Be--; ) {
            const He = E[Be];
            if (He[1].type === h.lineEnding || He[1].type === h.lineEndingBlank) {
              if (He[0] === "exit") continue;
              De && (E[De][1].type = h.lineEndingBlank, ue = !0), He[1].type = h.lineEnding, De = Be;
            } else if (!(He[1].type === h.linePrefix || He[1].type === h.blockQuotePrefix || He[1].type === h.blockQuotePrefixWhitespace || He[1].type === h.blockQuoteMarker || He[1].type === h.listItemIndent)) break;
          }
          it && (!De || it < De) && (Ue._spread = !0), Ue.end = Object.assign(
            {},
            De ? E[De][1].start : _e[1].end
          ), E.splice(De || re, 0, ["exit", Ue, _e[2]]), re++, z++;
        }
        if (_e[1].type === h.listItemPrefix) {
          const Be = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, _e[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ue = Be, E.splice(re, 0, ["enter", Be, _e[2]]), re++, z++, it = void 0, Pe = !0;
        }
      }
    }
    return E[_][1]._spread = ue, z;
  }
  function a(E, _) {
    return z;
    function z(re) {
      s.call(this, E(re), re), _ && _.call(this, re);
    }
  }
  function o() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function s(E, _, z) {
    const re = this.stack[this.stack.length - 1];
    k(re, "expected `parent`"), k("children" in re, "expected `parent`"), re.children.push(E), this.stack.push(E), this.tokenStack.push([_, z || void 0]), E.position = {
      start: Dt(_.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function c(E) {
    return _;
    function _(z) {
      E && E.call(this, z), d.call(this, z);
    }
  }
  function d(E, _) {
    const z = this.stack.pop();
    k(z, "expected `node`");
    const re = this.tokenStack.pop();
    if (re)
      re[0].type !== E.type && (_ ? _.call(this, E, re[0]) : (re[1] || Fi).call(this, E, re[0]));
    else throw new Error(
      "Cannot close `" + E.type + "` (" + hn({ start: E.start, end: E.end }) + "): it’s not open"
    );
    k(z.type !== "fragment", "unexpected fragment `exit`ed"), k(z.position, "expected `position` to be defined"), z.position.end = Dt(E.end);
  }
  function l() {
    return oc(this.stack.pop());
  }
  function f() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(E) {
    if (this.data.expectingFirstListItemValue) {
      const _ = this.stack[this.stack.length - 2];
      k(_, "expected nodes on stack"), k(_.type === "list", "expected list on stack"), _.start = Number.parseInt(
        this.sliceSerialize(E),
        U.numericBaseDecimal
      ), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function g() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "code", "expected code on stack"), _.lang = E;
  }
  function S() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "code", "expected code on stack"), _.meta = E;
  }
  function x() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function R() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "code", "expected code on stack"), _.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function T() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "code", "expected code on stack"), _.value = E.replace(/(\r?\n|\r)$/g, "");
  }
  function M(E) {
    const _ = this.resume(), z = this.stack[this.stack.length - 1];
    k(z, "expected node on stack"), k(z.type === "definition", "expected definition on stack"), z.label = _, z.identifier = Jt(
      this.sliceSerialize(E)
    ).toLowerCase();
  }
  function P() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "definition", "expected definition on stack"), _.title = E;
  }
  function F() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "definition", "expected definition on stack"), _.url = E;
  }
  function N(E) {
    const _ = this.stack[this.stack.length - 1];
    if (k(_, "expected node on stack"), k(_.type === "heading", "expected heading on stack"), !_.depth) {
      const z = this.sliceSerialize(E).length;
      k(
        z === 1 || z === 2 || z === 3 || z === 4 || z === 5 || z === 6,
        "expected `depth` between `1` and `6`"
      ), _.depth = z;
    }
  }
  function b() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function G(E) {
    const _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "heading", "expected heading on stack"), _.depth = this.sliceSerialize(E).codePointAt(0) === p.equalsTo ? 1 : 2;
  }
  function Z() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function $(E) {
    const _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k("children" in _, "expected parent on stack");
    const z = _.children;
    let re = z[z.length - 1];
    (!re || re.type !== "text") && (re = Nt(), re.position = {
      start: Dt(E.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, z.push(re)), this.stack.push(re);
  }
  function ne(E) {
    const _ = this.stack.pop();
    k(_, "expected a `node` to be on the stack"), k("value" in _, "expected a `literal` to be on the stack"), k(_.position, "expected `node` to have an open position"), _.value += this.sliceSerialize(E), _.position.end = Dt(E.end);
  }
  function Y(E) {
    const _ = this.stack[this.stack.length - 1];
    if (k(_, "expected `node`"), this.data.atHardBreak) {
      k("children" in _, "expected `parent`");
      const z = _.children[_.children.length - 1];
      k(z.position, "expected tail to have a starting position"), z.position.end = Dt(E.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(_.type) && ($.call(this, E), ne.call(this, E));
  }
  function W() {
    this.data.atHardBreak = !0;
  }
  function O() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "html", "expected html on stack"), _.value = E;
  }
  function A() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "html", "expected html on stack"), _.value = E;
  }
  function B() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "inlineCode", "expected inline code on stack"), _.value = E;
  }
  function Q() {
    const E = this.stack[this.stack.length - 1];
    if (k(E, "expected node on stack"), k(E.type === "link", "expected link on stack"), this.data.inReference) {
      const _ = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = _, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function H() {
    const E = this.stack[this.stack.length - 1];
    if (k(E, "expected node on stack"), k(E.type === "image", "expected image on stack"), this.data.inReference) {
      const _ = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = _, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function we(E) {
    const _ = this.sliceSerialize(E), z = this.stack[this.stack.length - 2];
    k(z, "expected ancestor on stack"), k(
      z.type === "image" || z.type === "link",
      "expected image or link on stack"
    ), z.label = c1(_), z.identifier = Jt(_).toLowerCase();
  }
  function Te() {
    const E = this.stack[this.stack.length - 1];
    k(E, "expected node on stack"), k(E.type === "fragment", "expected fragment on stack");
    const _ = this.resume(), z = this.stack[this.stack.length - 1];
    if (k(z, "expected node on stack"), k(
      z.type === "image" || z.type === "link",
      "expected image or link on stack"
    ), this.data.inReference = !0, z.type === "link") {
      const re = E.children;
      z.children = re;
    } else
      z.alt = _;
  }
  function y() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(
      _.type === "image" || _.type === "link",
      "expected image or link on stack"
    ), _.url = E;
  }
  function oe() {
    const E = this.resume(), _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(
      _.type === "image" || _.type === "link",
      "expected image or link on stack"
    ), _.title = E;
  }
  function Ge() {
    this.data.inReference = void 0;
  }
  function C() {
    this.data.referenceType = "collapsed";
  }
  function le(E) {
    const _ = this.resume(), z = this.stack[this.stack.length - 1];
    k(z, "expected node on stack"), k(
      z.type === "image" || z.type === "link",
      "expected image reference or link reference on stack"
    ), z.label = _, z.identifier = Jt(
      this.sliceSerialize(E)
    ).toLowerCase(), this.data.referenceType = "full";
  }
  function X(E) {
    k(
      E.type === "characterReferenceMarkerNumeric" || E.type === "characterReferenceMarkerHexadecimal"
    ), this.data.characterReferenceType = E.type;
  }
  function ce(E) {
    const _ = this.sliceSerialize(E), z = this.data.characterReferenceType;
    let re;
    if (z)
      re = Oa(
        _,
        z === h.characterReferenceMarkerNumeric ? U.numericBaseDecimal : U.numericBaseHexadecimal
      ), this.data.characterReferenceType = void 0;
    else {
      const ue = Br(_);
      k(ue !== !1, "expected reference to decode"), re = ue;
    }
    const pe = this.stack[this.stack.length - 1];
    k(pe, "expected `node`"), k("value" in pe, "expected `node.value`"), pe.value += re;
  }
  function ie(E) {
    const _ = this.stack.pop();
    k(_, "expected `node`"), k(_.position, "expected `node.position`"), _.position.end = Dt(E.end);
  }
  function J(E) {
    ne.call(this, E);
    const _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "link", "expected link on stack"), _.url = this.sliceSerialize(E);
  }
  function he(E) {
    ne.call(this, E);
    const _ = this.stack[this.stack.length - 1];
    k(_, "expected node on stack"), k(_.type === "link", "expected link on stack"), _.url = "mailto:" + this.sliceSerialize(E);
  }
  function me() {
    return { type: "blockquote", children: [] };
  }
  function Ae() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function ye() {
    return { type: "inlineCode", value: "" };
  }
  function xe() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Fe() {
    return { type: "emphasis", children: [] };
  }
  function qe() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function _t() {
    return { type: "break" };
  }
  function vt() {
    return { type: "html", value: "" };
  }
  function ht() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function gt() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function mt(E) {
    return {
      type: "list",
      ordered: E.type === "listOrdered",
      start: null,
      spread: E._spread,
      children: []
    };
  }
  function Gt(E) {
    return {
      type: "listItem",
      spread: E._spread,
      checked: null,
      children: []
    };
  }
  function Vt() {
    return { type: "paragraph", children: [] };
  }
  function $t() {
    return { type: "strong", children: [] };
  }
  function Nt() {
    return { type: "text", value: "" };
  }
  function Ct() {
    return { type: "thematicBreak" };
  }
}
function Dt(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function ja(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? ja(e, r) : p1(e, r);
  }
}
function p1(e, t) {
  let n;
  for (n in t)
    if ($a.call(t, n))
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
    "Cannot close `" + e.type + "` (" + hn({ start: e.start, end: e.end }) + "): a different token (`" + t.type + "`, " + hn({ start: t.start, end: t.end }) + ") is open"
  ) : new Error(
    "Cannot close document, a token (`" + t.type + "`, " + hn({ start: t.start, end: t.end }) + ") is still open"
  );
}
function f1(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return d1(r, {
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
function g1(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function m1(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function C1(e, t) {
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
function y1(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function w1(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function k1(e, t) {
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
  const d = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [c]
  };
  return e.patch(t, d), e.applyData(t, d);
}
function S1(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function x1(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function qa(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function T1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return qa(e, t);
  const i = { src: tn(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function b1(e, t) {
  const n = { src: tn(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function E1(e, t) {
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
function _1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return qa(e, t);
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
function v1(e, t) {
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
function I1(e, t, n) {
  const r = e.all(t), i = n ? R1(n) : Za(t), a = {}, o = [];
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
  const d = { type: "element", tagName: "li", properties: a, children: o };
  return e.patch(t, d), e.applyData(t, d);
}
function R1(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = Za(n[r]);
  }
  return t;
}
function Za(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function M1(e, t) {
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
function A1(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function N1(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function L1(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function O1(e, t) {
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
    }, s = Fr(t.children[1]), c = va(t.children[t.children.length - 1]);
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
function D1(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, s = o ? o.length : t.children.length;
  let c = -1;
  const d = [];
  for (; ++c < s; ) {
    const f = t.children[c], m = {}, g = o ? o[c] : void 0;
    g && (m.align = g);
    let S = { type: "element", tagName: a, properties: m, children: [] };
    f && (S.children = e.all(f), e.patch(f, S), S = e.applyData(f, S)), d.push(S);
  }
  const l = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(d, !0)
  };
  return e.patch(t, l), e.applyData(t, l);
}
function P1(e, t) {
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
function F1(e) {
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
function H1(e, t) {
  const n = { type: "text", value: F1(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function z1(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const U1 = {
  blockquote: g1,
  break: m1,
  code: C1,
  delete: y1,
  emphasis: w1,
  footnoteReference: k1,
  heading: S1,
  html: x1,
  imageReference: T1,
  image: b1,
  inlineCode: E1,
  linkReference: _1,
  link: v1,
  listItem: I1,
  list: M1,
  paragraph: A1,
  // @ts-expect-error: root is different, but hard to type.
  root: N1,
  strong: L1,
  table: O1,
  tableCell: P1,
  tableRow: D1,
  text: H1,
  thematicBreak: z1,
  toml: Rn,
  yaml: Rn,
  definition: Rn,
  footnoteDefinition: Rn
};
function Rn() {
}
const Ka = -1, Vn = 0, fn = 1, zn = 2, Vr = 3, $r = 4, jr = 5, qr = 6, Xa = 7, Ya = 8, Bi = typeof self == "object" ? self : globalThis, B1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, o] = t[i];
    switch (a) {
      case Vn:
      case Ka:
        return n(o, i);
      case fn: {
        const s = n([], i);
        for (const c of o)
          s.push(r(c));
        return s;
      }
      case zn: {
        const s = n({}, i);
        for (const [c, d] of o)
          s[r(c)] = r(d);
        return s;
      }
      case Vr:
        return n(new Date(o), i);
      case $r: {
        const { source: s, flags: c } = o;
        return n(new RegExp(s, c), i);
      }
      case jr: {
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
      case Xa: {
        const { name: s, message: c } = o;
        return n(new Bi[s](c), i);
      }
      case Ya:
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
}, Wi = (e) => B1(/* @__PURE__ */ new Map(), e)(0), Kt = "", { toString: W1 } = {}, { keys: G1 } = Object, dn = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Vn, t];
  const n = W1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [fn, Kt];
    case "Object":
      return [zn, Kt];
    case "Date":
      return [Vr, Kt];
    case "RegExp":
      return [$r, Kt];
    case "Map":
      return [jr, Kt];
    case "Set":
      return [qr, Kt];
    case "DataView":
      return [fn, n];
  }
  return n.includes("Array") ? [fn, n] : n.includes("Error") ? [Xa, n] : [zn, n];
}, Mn = ([e, t]) => e === Vn && (t === "function" || t === "symbol"), V1 = (e, t, n, r) => {
  const i = (o, s) => {
    const c = r.push(o) - 1;
    return n.set(s, c), c;
  }, a = (o) => {
    if (n.has(o))
      return n.get(o);
    let [s, c] = dn(o);
    switch (s) {
      case Vn: {
        let l = o;
        switch (c) {
          case "bigint":
            s = Ya, l = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + c);
            l = null;
            break;
          case "undefined":
            return i([Ka], o);
        }
        return i([s, l], o);
      }
      case fn: {
        if (c) {
          let m = o;
          return c === "DataView" ? m = new Uint8Array(o.buffer) : c === "ArrayBuffer" && (m = new Uint8Array(o)), i([c, [...m]], o);
        }
        const l = [], f = i([s, l], o);
        for (const m of o)
          l.push(a(m));
        return f;
      }
      case zn: {
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
        for (const m of G1(o))
          (e || !Mn(dn(o[m]))) && l.push([a(m), a(o[m])]);
        return f;
      }
      case Vr:
        return i([s, o.toISOString()], o);
      case $r: {
        const { source: l, flags: f } = o;
        return i([s, { source: l, flags: f }], o);
      }
      case jr: {
        const l = [], f = i([s, l], o);
        for (const [m, g] of o)
          (e || !(Mn(dn(m)) || Mn(dn(g)))) && l.push([a(m), a(g)]);
        return f;
      }
      case qr: {
        const l = [], f = i([s, l], o);
        for (const m of o)
          (e || !Mn(dn(m))) && l.push(a(m));
        return f;
      }
    }
    const { message: d } = o;
    return i([s, { name: c, message: d }], o);
  };
  return a;
}, Gi = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return V1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, Un = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Wi(Gi(e, t)) : structuredClone(e)
) : (e, t) => Wi(Gi(e, t));
function $1(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function j1(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function q1(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || $1, r = e.options.footnoteBackLabel || j1, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, s = [];
  let c = -1;
  for (; ++c < e.footnoteOrder.length; ) {
    const d = e.footnoteById.get(
      e.footnoteOrder[c]
    );
    if (!d)
      continue;
    const l = e.all(d), f = String(d.identifier).toUpperCase(), m = tn(f.toLowerCase());
    let g = 0;
    const S = [], x = e.footnoteCounts.get(f);
    for (; x !== void 0 && ++g <= x; ) {
      S.length > 0 && S.push({ type: "text", value: " " });
      let M = typeof n == "string" ? n : n(c, g);
      typeof M == "string" && (M = { type: "text", value: M }), S.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + m + (g > 1 ? "-" + g : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(c, g),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(M) ? M : [M]
      });
    }
    const R = l[l.length - 1];
    if (R && R.type === "element" && R.tagName === "p") {
      const M = R.children[R.children.length - 1];
      M && M.type === "text" ? M.value += " " : R.children.push({ type: "text", value: " " }), R.children.push(...S);
    } else
      l.push(...S);
    const T = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + m },
      children: e.wrap(l, !0)
    };
    e.patch(d, T), s.push(T);
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
            ...Un(o),
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
const Ja = (
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
      return Y1;
    if (typeof e == "function")
      return $n(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Z1(e) : K1(e);
    if (typeof e == "string")
      return X1(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function Z1(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Ja(e[n]);
  return $n(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function K1(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return $n(n);
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
function X1(e) {
  return $n(t);
  function t(n) {
    return n && n.type === e;
  }
}
function $n(e) {
  return t;
  function t(n, r, i) {
    return !!(J1(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Y1() {
  return !0;
}
function J1(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Qa = [], Q1 = !0, Vi = !1, ed = "skip";
function td(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = Ja(i), o = r ? -1 : 1;
  s(e, void 0, [])();
  function s(c, d, l) {
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
      let g = Qa, S, x, R;
      if ((!t || a(c, d, l[l.length - 1] || void 0)) && (g = nd(n(c, l)), g[0] === Vi))
        return g;
      if ("children" in c && c.children) {
        const T = (
          /** @type {UnistParent} */
          c
        );
        if (T.children && g[0] !== ed)
          for (x = (r ? T.children.length : -1) + o, R = l.concat(T); x > -1 && x < T.children.length; ) {
            const M = T.children[x];
            if (S = s(M, x, R)(), S[0] === Vi)
              return S;
            x = typeof S[1] == "number" ? S[1] : x + o;
          }
      }
      return g;
    }
  }
}
function nd(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Q1, e] : e == null ? Qa : [e];
}
function eo(e, t, n, r) {
  let i, a, o;
  typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), td(e, a, s, i);
  function s(c, d) {
    const l = d[d.length - 1], f = l ? l.children.indexOf(c) : void 0;
    return o(c, f, l);
  }
}
const Rr = {}.hasOwnProperty, rd = {};
function id(e, t) {
  const n = t || rd, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = { ...U1, ...n.handlers }, s = {
    all: d,
    applyData: od,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: o,
    one: c,
    options: n,
    patch: ad,
    wrap: ld
  };
  return eo(e, function(l) {
    if (l.type === "definition" || l.type === "footnoteDefinition") {
      const f = l.type === "definition" ? r : i, m = String(l.identifier).toUpperCase();
      f.has(m) || f.set(m, l);
    }
  }), s;
  function c(l, f) {
    const m = l.type, g = s.handlers[m];
    if (Rr.call(s.handlers, m) && g)
      return g(s, l, f);
    if (s.options.passThrough && s.options.passThrough.includes(m)) {
      if ("children" in l) {
        const { children: x, ...R } = l, T = Un(R);
        return T.children = s.all(l), T;
      }
      return Un(l);
    }
    return (s.options.unknownHandler || sd)(s, l, f);
  }
  function d(l) {
    const f = [];
    if ("children" in l) {
      const m = l.children;
      let g = -1;
      for (; ++g < m.length; ) {
        const S = s.one(m[g], l);
        if (S) {
          if (g && m[g - 1].type === "break" && (!Array.isArray(S) && S.type === "text" && (S.value = $i(S.value)), !Array.isArray(S) && S.type === "element")) {
            const x = S.children[0];
            x && x.type === "text" && (x.value = $i(x.value));
          }
          Array.isArray(S) ? f.push(...S) : f.push(S);
        }
      }
    }
    return f;
  }
}
function ad(e, t) {
  e.position && (t.position = Hl(e));
}
function od(e, t) {
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
    n.type === "element" && a && Object.assign(n.properties, Un(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function sd(e, t) {
  const n = t.data || {}, r = "value" in t && !(Rr.call(n, "hProperties") || Rr.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function ld(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function $i(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function ji(e, t) {
  const n = id(e, t), r = n.one(e, void 0), i = q1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && (k("children" in a), a.children.push({ type: "text", value: `
` }, i)), a;
}
function cd(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      ji(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      ji(n, { file: r, ...e || t })
    );
  };
}
function qi(e) {
  if (e)
    throw e;
}
var Dn = Object.prototype.hasOwnProperty, to = Object.prototype.toString, Zi = Object.defineProperty, Ki = Object.getOwnPropertyDescriptor, Xi = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : to.call(t) === "[object Array]";
}, Yi = function(t) {
  if (!t || to.call(t) !== "[object Object]")
    return !1;
  var n = Dn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && Dn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || Dn.call(t, i);
}, Ji = function(t, n) {
  Zi && n.name === "__proto__" ? Zi(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, Qi = function(t, n) {
  if (n === "__proto__")
    if (Dn.call(t, n)) {
      if (Ki)
        return Ki(t, n).value;
    } else return;
  return t[n];
}, ud = function e() {
  var t, n, r, i, a, o, s = arguments[0], c = 1, d = arguments.length, l = !1;
  for (typeof s == "boolean" && (l = s, s = arguments[1] || {}, c = 2), (s == null || typeof s != "object" && typeof s != "function") && (s = {}); c < d; ++c)
    if (t = arguments[c], t != null)
      for (n in t)
        r = Qi(s, n), i = Qi(t, n), s !== i && (l && i && (Yi(i) || (a = Xi(i))) ? (a ? (a = !1, o = r && Xi(r) ? r : []) : o = r && Yi(r) ? r : {}, Ji(s, { name: n, newValue: e(l, o, i) })) : typeof i < "u" && Ji(s, { name: n, newValue: i }));
  return s;
};
const sr = /* @__PURE__ */ Dr(ud);
function Mr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function dd() {
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
      let f = -1;
      if (c) {
        o(c);
        return;
      }
      for (; ++f < i.length; )
        (d[f] === null || d[f] === void 0) && (d[f] = i[f]);
      i = d, l ? hd(l, s)(...d) : o(null, ...d);
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
function hd(e, t) {
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
const wt = { basename: pd, dirname: fd, extname: gd, join: md, sep: "/" };
function pd(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  yn(e);
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
function fd(e) {
  if (yn(e), e.length === 0)
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
function gd(e) {
  yn(e);
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
function md(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    yn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : Cd(n);
}
function Cd(e) {
  yn(e);
  const t = e.codePointAt(0) === 47;
  let n = yd(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function yd(e, t) {
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
function yn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const wd = { cwd: kd };
function kd() {
  return "/";
}
function Ar(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Sd(e) {
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
  return xd(e);
}
function xd(e) {
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
class no {
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
    t ? Ar(t) ? n = { path: t } : typeof t == "string" || Td(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : wd.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
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
    return typeof this.path == "string" ? wt.basename(this.path) : void 0;
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
    ur(t, "basename"), cr(t, "basename"), this.path = wt.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? wt.dirname(this.path) : void 0;
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
    ea(this.basename, "dirname"), this.path = wt.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? wt.extname(this.path) : void 0;
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
    this.path = wt.join(this.dirname, this.stem + (t || ""));
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
    Ar(t) && (t = Sd(t)), ur(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? wt.basename(this.path, this.extname) : void 0;
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
    ur(t, "stem"), cr(t, "stem"), this.path = wt.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new je(
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
  if (e && e.includes(wt.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + wt.sep + "`"
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
function Td(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const bd = (
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
), Ed = {}.hasOwnProperty;
class Zr extends bd {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = dd();
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
    return typeof t == "string" ? arguments.length === 2 ? (pr("data", this.frozen), this.namespace[t] = n, this) : Ed.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (pr("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = An(t), r = this.parser || this.Parser;
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
      const s = An(t), c = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(s)
      );
      r.run(c, s, function(l, f, m) {
        if (l || !f || !m)
          return d(l);
        const g = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          f
        ), S = r.stringify(g, m);
        Id(S) ? m.value = S : m.result = S, d(
          l,
          /** @type {VFileWithOutput<CompileResult>} */
          m
        );
      });
      function d(l, f) {
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
      const c = An(n);
      i.run(t, c, d);
      function d(l, f, m) {
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
    const r = An(n), i = this.compiler || this.Compiler;
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
          const [l, ...f] = (
            /** @type {PluginTuple<Array<unknown>>} */
            d
          );
          c(l, f);
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
          const f = d[l];
          a(f);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + d + "`");
    }
    function c(d, l) {
      let f = -1, m = -1;
      for (; ++f < r.length; )
        if (r[f][0] === d) {
          m = f;
          break;
        }
      if (m === -1)
        r.push([d, ...l]);
      else if (l.length > 0) {
        let [g, ...S] = l;
        const x = r[m][1];
        Mr(x) && Mr(g) && (g = sr(!0, x, g)), r[m] = [d, g, ...S];
      }
    }
  }
}
const _d = new Zr().freeze();
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
function An(e) {
  return vd(e) ? e : new no(e);
}
function vd(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Id(e) {
  return typeof e == "string" || Rd(e);
}
function Rd(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Md = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", ra = [], ia = { allowDangerousHtml: !0 }, Ad = /^(https?|ircs?|mailto|xmpp)$/i, Nd = [
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
  const t = Ld(e), n = Od(e);
  return Dd(t.runSync(t.parse(n), n), e);
}
function Ld(e) {
  const t = e.rehypePlugins || ra, n = e.remarkPlugins || ra, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...ia } : ia;
  return _d().use(f1).use(n).use(cd, r).use(t);
}
function Od(e) {
  const t = e.children || "", n = new no();
  return typeof t == "string" ? n.value = t : wr(
    "Unexpected value `" + t + "` for `children` prop, expected `string`"
  ), n;
}
function Dd(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, s = t.unwrapDisallowed, c = t.urlTransform || Pd;
  for (const l of Nd)
    Object.hasOwn(t, l.from) && wr(
      "Unexpected `" + l.from + "` prop, " + (l.to ? "use `" + l.to + "` instead" : "remove it") + " (see <" + Md + "#" + l.id + "> for more info)"
    );
  return n && a && wr(
    "Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other"
  ), eo(e, d), Gl(e, {
    Fragment: bt,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: u,
    jsxs: I,
    passKeys: !0,
    passNode: !0
  });
  function d(l, f, m) {
    if (l.type === "raw" && m && typeof f == "number")
      return o ? m.children.splice(f, 1) : m.children[f] = { type: "text", value: l.value }, f;
    if (l.type === "element") {
      let g;
      for (g in rr)
        if (Object.hasOwn(rr, g) && Object.hasOwn(l.properties, g)) {
          const S = l.properties[g], x = rr[g];
          (x === null || x.includes(l.tagName)) && (l.properties[g] = c(String(S || ""), g, l));
        }
    }
    if (l.type === "element") {
      let g = n ? !n.includes(l.tagName) : a ? a.includes(l.tagName) : !1;
      if (!g && r && typeof f == "number" && (g = !r(l, f, m)), g && m && typeof f == "number")
        return s && l.children ? m.children.splice(f, 1, ...l.children) : m.children.splice(f, 1), f;
    }
  }
}
function Pd(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    Ad.test(e.slice(0, t)) ? e : ""
  );
}
function Fd({ children: e, isStreaming: t }) {
  const [n, r] = fe(!0), [i, a] = fe(!1);
  St.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const o = () => {
    t || r(!n);
  }, s = St.Children.map(e, (c) => {
    if (St.isValidElement(c)) {
      if (c.type === ro)
        return St.cloneElement(
          c,
          {
            onToggle: o,
            isExpanded: n
          }
        );
      if (c.type === io)
        return St.cloneElement(
          c,
          {
            isVisible: n
          }
        );
    }
    return c;
  });
  return /* @__PURE__ */ u("div", { className: "chat-wrapper__reasoning", children: s });
}
function ro({
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
  ), o = t === "completed" || e.includes(te.UI_TEXT.THINKING) || e.includes(te.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ I(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${o ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: o ? r : void 0,
      style: { cursor: o ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ u("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ I("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ u("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        o && /* @__PURE__ */ u(
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
function io({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ u("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function Hd({ children: e }) {
  return /* @__PURE__ */ u("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function zd({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var c, d;
  const a = () => {
    if (!r || !i) return null;
    const l = i.find((f) => f.name === r);
    return (l == null ? void 0 : l.description) || null;
  };
  let o;
  if (r != null && r.startsWith("lat_")) {
    const l = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.query, f = (d = n == null ? void 0 : n.parameters) == null ? void 0 : d.url;
    o = l || f || "Executing tool...";
  } else
    o = a();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ u("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
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
          ) : /* @__PURE__ */ I(
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
          /* @__PURE__ */ I("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
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
          ) : /* @__PURE__ */ I(
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
          /* @__PURE__ */ I("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
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
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
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
          ) : /* @__PURE__ */ I(
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
          /* @__PURE__ */ I("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
function ao({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ I("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
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
const Ud = ({ message: e }) => {
  const [t, n] = fe(!0);
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ I(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!t),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          e.role === "system" ? /* @__PURE__ */ I("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
};
function oo({
  imageUrl: e,
  isOpen: t,
  onClose: n,
  alt: r = "Image preview"
}) {
  const i = ae((o) => {
    o.key === "Escape" && n();
  }, [n]), a = ae((o) => {
    o.target === o.currentTarget && n();
  }, [n]);
  return ve(() => (t ? (document.addEventListener("keydown", i), document.body.style.overflow = "hidden") : (document.removeEventListener("keydown", i), document.body.style.overflow = ""), () => {
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
        /* @__PURE__ */ u(
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
        /* @__PURE__ */ u(
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
            children: /* @__PURE__ */ u(
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
        /* @__PURE__ */ u(
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
const so = Co(null);
function Bd({ children: e, value: t }) {
  return /* @__PURE__ */ u(so.Provider, { value: t, children: e });
}
function wn() {
  const e = yo(so);
  if (!e)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return e;
}
const lo = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ u("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ u("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ u("code", { className: "chat-wrapper__code", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ u("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ u("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ u("li", { className: "chat-wrapper__list-item", ...t, children: e }),
  hr: ({ ...e }) => /* @__PURE__ */ u("hr", { className: "chat-wrapper__hr", ...e })
}, Wd = {
  ...lo,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ u("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ u("code", { className: "chat-wrapper__code", ...n, children: e })
}, co = oa(
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
    } = wn(), [l, f] = fe(!1), [m, g] = fe(!1), [S, x] = fe(null), R = ae(async () => {
      try {
        await navigator.clipboard.writeText(e.content), f(!0), setTimeout(() => f(!1), 2e3);
      } catch (W) {
        console.error("Failed to copy message:", W);
      }
    }, [e.content]), T = ae(() => {
      d && d(e.id);
    }, [d, e.id]), M = ae((W) => {
      x(W);
    }, []), P = ae(() => {
      x(null);
    }, []), F = () => /* @__PURE__ */ I("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ u(ao, { size: 16, variant: "dots" }),
      /* @__PURE__ */ u("span", { children: te.UI_TEXT.THINKING })
    ] }), N = () => d && /* @__PURE__ */ u(
      "button",
      {
        className: "chat-wrapper__retry-button",
        onClick: T,
        children: "Retry"
      }
    ), b = () => /* @__PURE__ */ I(bt, { children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ u(
        "button",
        {
          className: `chat-wrapper__copy-button ${m ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: R,
          title: "Copy message",
          children: /* @__PURE__ */ u(Vs, {})
        }
      ) }),
      l && /* @__PURE__ */ u("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), G = () => /* @__PURE__ */ u("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ u(aa, { components: lo, children: e.content }) }),
      b()
    ] }) }), Z = () => /* @__PURE__ */ I("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ u(aa, { components: Wd, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ u("div", { className: "chat-wrapper__media", children: e.media.map((W, O) => /* @__PURE__ */ u(
        "img",
        {
          src: W,
          alt: `Uploaded content ${O + 1}`,
          className: "chat-wrapper__media-image chat-wrapper__media-image--clickable",
          onClick: () => M(W),
          style: {
            cursor: "zoom-in",
            transition: "transform 0.2s, box-shadow 0.2s"
          },
          onMouseEnter: (A) => {
            A.currentTarget.style.transform = "scale(1.02)", A.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
          },
          onMouseLeave: (A) => {
            A.currentTarget.style.transform = "scale(1)", A.currentTarget.style.boxShadow = "";
          },
          title: "Click to view full size"
        },
        O
      )) })
    ] }), $ = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === c.current ? F() : e.role === "system" ? /* @__PURE__ */ u(Ud, { message: e }) : e.role === "assistant" ? G() : Z(), ne = () => /* @__PURE__ */ I(Fd, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ u(
        ro,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ u(io, { children: i(e.content) })
    ] }), Y = () => {
      var W;
      return /* @__PURE__ */ u(Hd, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ u(
        zd,
        {
          title: a(e.content, e.isStreaming),
          status: o(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (W = e.toolData) == null ? void 0 : W.toolName,
          clientTools: s
        }
      ) });
    };
    return /* @__PURE__ */ I(bt, { children: [
      /* @__PURE__ */ u(
        "div",
        {
          className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
          onMouseEnter: () => e.role === "assistant" && g(!0),
          onMouseLeave: () => e.role === "assistant" && g(!1),
          children: e.role === "reasoning" ? ne() : e.role === "tooling" ? Y() : /* @__PURE__ */ I(bt, { children: [
            /* @__PURE__ */ u("div", { className: "chat-wrapper__message-content", children: $() }),
            e.role === "user" && e.hasError && !e.isRetrying && N()
          ] })
        }
      ),
      /* @__PURE__ */ u(
        oo,
        {
          imageUrl: S,
          isOpen: !!S,
          onClose: P,
          alt: "Message image"
        }
      )
    ] });
  }
);
co.displayName = "MessageItem";
const Gd = ({ isVisible: e }) => e ? /* @__PURE__ */ u("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ u("span", {}),
  /* @__PURE__ */ u("span", {}),
  /* @__PURE__ */ u("span", {})
] }) }) }) }) : null, uo = Bn((e, t) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = wn();
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__messages", children: [
    n.map((a) => /* @__PURE__ */ u(
      co,
      {
        message: a
      },
      a.id
    )),
    /* @__PURE__ */ u(Gd, { isVisible: r && !i }),
    /* @__PURE__ */ u("div", { ref: t })
  ] });
});
uo.displayName = "MessagesList";
const ft = (...e) => e.filter(Boolean).join(" "), Vd = () => /* @__PURE__ */ I(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ I("g", { filter: "url(#filter0_dd_121_23927)", children: [
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
), $d = () => /* @__PURE__ */ I(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ I("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ u(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "inherit",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ u("rect", { x: "19", y: "19.3541", width: "16", height: "16", rx: "2", fill: "white" })
      ] }),
      /* @__PURE__ */ u("defs", { children: /* @__PURE__ */ I(
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
      ) })
    ]
  }
), jd = ({ className: e, ...t }) => /* @__PURE__ */ u("form", { className: ft("chat-wrapper__prompt-input", e), ...t }), ho = Bn(
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
          const f = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          l.dispatchEvent(f);
        }
      }
      a == null || a(d);
    };
    return /* @__PURE__ */ u(
      "textarea",
      {
        ref: s,
        className: ft("chat-wrapper__prompt-textarea", t),
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
ho.displayName = "PromptInputTextarea";
const qd = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u("div", { className: ft("chat-wrapper__prompt-toolbar", e), ...t }), Zd = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u("div", { className: ft("chat-wrapper__prompt-tools", e), ...t }), Kd = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || St.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ u(
    "button",
    {
      className: ft(
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
}, Xd = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = tt.IDLE,
  children: i,
  disabled: a,
  ...o
}) => {
  const s = fr(r);
  let c = s ? /* @__PURE__ */ u($d, {}) : /* @__PURE__ */ u(Vd, {});
  return /* @__PURE__ */ u(
    "button",
    {
      className: ft(
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
}, yh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ u("select", { className: ft("chat-wrapper__prompt-select", e), ...n, children: t }), wh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ u(
  "button",
  {
    className: ft("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), kh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u(
  "div",
  {
    className: ft("chat-wrapper__prompt-select-content", e),
    ...t
  }
), Sh = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ u(
  "div",
  {
    className: ft("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), xh = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ u(
  "span",
  {
    className: ft("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), Yd = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = fe(0), [a, o] = fe(!1), [s, c] = fe(0);
  return ve(() => {
    if (!t || e.length <= 1) return;
    const d = setInterval(() => {
      o(!0), setTimeout(() => {
        i((l) => (l + 1) % e.length), c((l) => l + 1), o(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(d);
  }, [t, e.length]), ve(() => {
    t || (i(0), o(!1), c(0));
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
}, Jd = Bn((e, t) => {
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
    onSubmit: f,
    onFileUpload: m,
    onStopGeneration: g,
    connectionState: S
  } = wn(), x = r || i || S !== Xe.CONNECTED, R = S === Xe.CONNECTED, T = l.length > 0, [M, P] = fe(""), [F, N] = fe([]), [b, G] = fe([]), [Z, $] = fe(null), [ne, Y] = fe(null), [W, O] = fe(!1), A = Oe(null), B = ae(
    (C) => {
      Y(C), O(!0);
    },
    []
  ), Q = ae((C) => new Promise((le, X) => {
    const ce = new FileReader();
    ce.onload = () => le(ce.result), ce.onerror = X, ce.readAsDataURL(C);
  }), []), H = n && n.length > 0 ? n : ["What would you like to know?"], we = M.length === 0 && !T && H.length > 1;
  sa(t, () => ({
    focus: () => {
      var C;
      (C = A.current) == null || C.focus();
    },
    setText: (C) => {
      P(C), setTimeout(() => {
        if (A.current) {
          A.current.focus();
          const le = C.length;
          A.current.setSelectionRange(le, le);
        }
      }, 0);
    }
  }));
  const Te = ae(
    (C) => {
      C.preventDefault();
      const X = new FormData(C.currentTarget).get("message");
      if (X != null && X.trim()) {
        const ce = Fn(X.trim(), !1);
        if (!ce.trim()) {
          console.warn("Message was blocked due to security concerns");
          return;
        }
        f(ce, F), P(""), N([]);
      }
    },
    [f, F]
  ), y = ae(
    (C) => {
      const X = C.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      P(X);
    },
    []
  ), oe = ae(
    async (C) => {
      var ce;
      const X = Array.from(((ce = C.clipboardData) == null ? void 0 : ce.items) || []).filter((ie) => ie.type.startsWith("image/"));
      if (X.length > 0) {
        C.preventDefault(), $(null);
        try {
          const ie = await Promise.all(
            X.map((J) => {
              const he = J.getAsFile();
              return he ? new File(
                [he],
                `clipboard-image-${Date.now()}.${he.type.split("/")[1]}`,
                {
                  type: he.type
                }
              ) : null;
            })
          ).then((J) => J.filter(Boolean));
          if (ie.length > 0) {
            const J = ie.filter((he) => {
              const me = (s == null ? void 0 : s.maxFileSize) ?? 15728640;
              if (he.size > me)
                return console.warn(
                  `File too large: ${he.name} (${he.size} bytes)`
                ), $(`File too large. Maximum size is ${Math.round(me / 1048576)}MB.`), !1;
              const Ae = (s == null ? void 0 : s.allowedTypes) ?? [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp"
              ];
              return Ae.includes(he.type) ? !0 : (console.warn(
                `File type not allowed: ${he.name} (${he.type})`
              ), $(
                `File type not supported. Allowed types: ${Ae.join(", ")}`
              ), !1);
            });
            if (J.length > 0) {
              const he = (s == null ? void 0 : s.maxFiles) ?? 5;
              if (F.length + b.length + J.length > he) {
                $(`Maximum ${he} files allowed. Currently ${F.length + b.length} files, trying to add ${J.length} more.`);
                return;
              }
              const Ae = J.map(async (Fe) => ({
                file: Fe,
                preview: await Q(Fe),
                isUploading: !0,
                progress: 0
              })), ye = await Promise.all(Ae);
              G((Fe) => [...Fe, ...ye]);
              const xe = await m(J);
              G((Fe) => Fe.filter((qe) => !J.includes(qe.file))), N((Fe) => [...Fe, ...xe]), $(null);
            }
          }
        } catch (ie) {
          console.error("Clipboard paste error:", ie), $(
            ie instanceof Error ? ie.message : "Failed to paste image"
          ), G([]);
        }
      }
    },
    [m, s, F, b, Q]
  ), Ge = ae(async () => {
    const C = document.createElement("input");
    C.type = "file", C.accept = "image/*", C.multiple = !0, C.onchange = async (le) => {
      const X = le.target.files;
      if (X)
        try {
          $(null);
          const ce = Array.from(X).filter((ie) => {
            const J = Ts(ie.name);
            J !== ie.name && console.warn(
              `File name sanitized: ${ie.name} -> ${J}`
            );
            const he = (s == null ? void 0 : s.maxFileSize) ?? 15 * 1024 * 1024;
            if (ie.size > he)
              return console.warn(`File too large: ${ie.name} (${ie.size} bytes)`), $(`File too large. Maximum size is ${Math.round(he / (1024 * 1024))}MB.`), !1;
            const me = (s == null ? void 0 : s.allowedTypes) ?? [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ];
            return me.includes(ie.type) ? !0 : (console.warn(
              `File type not allowed: ${ie.name} (${ie.type})`
            ), $(
              `File type not supported. Allowed types: ${me.join(", ")}`
            ), !1);
          });
          if (ce.length > 0) {
            const ie = (s == null ? void 0 : s.maxFiles) ?? 5;
            if (F.length + b.length + ce.length > ie) {
              $(`Maximum ${ie} files allowed. Currently ${F.length + b.length} files, trying to add ${ce.length} more.`);
              return;
            }
            const he = ce.map(async (ye) => ({
              file: ye,
              preview: await Q(ye),
              isUploading: !0,
              progress: 0
            })), me = await Promise.all(he);
            G((ye) => [...ye, ...me]);
            const Ae = await m(ce);
            G((ye) => ye.filter((xe) => !ce.includes(xe.file))), N((ye) => [...ye, ...Ae]), $(null);
          }
        } catch (ce) {
          console.error("File upload error:", ce), $(
            ce instanceof Error ? ce.message : "Upload failed"
          ), G([]);
        }
    }, C.click();
  }, [m, s, F, b, Q]);
  return /* @__PURE__ */ I(
    jd,
    {
      onSubmit: Te,
      style: { position: "relative" },
      className: x ? "chat-wrapper__prompt-input--disabled" : "",
      children: [
        /* @__PURE__ */ u(
          ho,
          {
            ref: A,
            name: "message",
            value: M,
            onChange: y,
            onPaste: oe,
            placeholder: "",
            disabled: x
          }
        ),
        !M.trim() && R && /* @__PURE__ */ u(
          Yd,
          {
            placeholderTexts: H,
            shouldAnimate: we
          }
        ),
        Z && /* @__PURE__ */ I(
          "div",
          {
            style: {
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              margin: "8px 0"
            },
            children: [
              /* @__PURE__ */ I("span", { style: { color: "#ef4444", fontSize: "14px" }, children: [
                "❌ ",
                Z
              ] }),
              /* @__PURE__ */ u(
                "button",
                {
                  onClick: () => $(null),
                  style: {
                    marginLeft: "auto",
                    background: "none",
                    border: "none",
                    color: "#ef4444",
                    cursor: "pointer",
                    fontSize: "16px"
                  },
                  children: "×"
                }
              )
            ]
          }
        ),
        (F.length > 0 || b.length > 0) && /* @__PURE__ */ I(
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
              b.map((C, le) => /* @__PURE__ */ I(
                "div",
                {
                  style: {
                    position: "relative",
                    display: "inline-block"
                  },
                  children: [
                    /* @__PURE__ */ I(
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
                              src: C.preview,
                              alt: `Uploading ${le + 1}`,
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
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 2
                              },
                              children: /* @__PURE__ */ u(
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
                    /* @__PURE__ */ u(
                      "button",
                      {
                        onClick: () => {
                          G((X) => X.filter((ce, ie) => ie !== le));
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
                `uploading-${le}`
              )),
              F.map((C, le) => {
                const X = C.startsWith("data:image/"), ce = C.startsWith("http://") || C.startsWith("https://"), ie = X || ce;
                return /* @__PURE__ */ I(
                  "div",
                  {
                    style: {
                      position: "relative",
                      display: "inline-block"
                    },
                    children: [
                      ie ? /* @__PURE__ */ I(
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
                          onClick: () => B(C),
                          title: "Click to view full image",
                          children: [
                            /* @__PURE__ */ u(
                              "img",
                              {
                                src: C,
                                alt: `Attachment ${le + 1}`,
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
                            ),
                            /* @__PURE__ */ u(
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
                                children: /* @__PURE__ */ I(
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
                            /* @__PURE__ */ I("div", { style: { flex: 1, minWidth: 0 }, children: [
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
                                    const J = C.match(/name=([^;]+)/);
                                    return J ? decodeURIComponent(J[1]) : "document.pdf";
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
                                    const J = C.match(/data:([^;]+)/);
                                    if (J) {
                                      const he = J[1];
                                      switch (he) {
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
                                          const me = he.split("/")[1];
                                          return me ? me.toUpperCase().substring(0, 4) : "FILE";
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
                            N(
                              (J) => J.filter((he, me) => me !== le)
                            ), Z && $(null);
                          },
                          style: {
                            position: "absolute",
                            top: ie ? "6px" : "8px",
                            right: ie ? "6px" : "8px",
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
                  `uploaded-${le}`
                );
              })
            ]
          }
        ),
        /* @__PURE__ */ I(qd, { children: [
          /* @__PURE__ */ I(Zd, { children: [
            o && /* @__PURE__ */ u(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center"
                },
                children: /* @__PURE__ */ u(
                  Kd,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: Ge,
                    title: b.length > 0 ? `Uploading ${b.length} file(s)...` : F.length > 0 ? `${F.length}/${(s == null ? void 0 : s.maxFiles) ?? 5} image(s) attached` : `Attach images (max ${(s == null ? void 0 : s.maxFiles) ?? 5} files, ${Math.round(((s == null ? void 0 : s.maxFileSize) ?? 15 * 1024 * 1024) / (1024 * 1024))}MB each)`,
                    disabled: x || b.length > 0,
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
                )
              }
            ),
            o && c && /* @__PURE__ */ u("div", { className: "chat-wrapper__divider" }),
            c && /* @__PURE__ */ I("div", { className: "chat-wrapper__restaurant-chip", children: [
              d && /* @__PURE__ */ u(
                "img",
                {
                  src: d,
                  alt: "Chip logo",
                  className: "chat-wrapper__restaurant-logo"
                }
              ),
              /* @__PURE__ */ u("span", { className: "chat-wrapper__restaurant-name", children: c })
            ] })
          ] }),
          /* @__PURE__ */ u(
            Xd,
            {
              status: a,
              disabled: fr(a) ? !1 : !M.trim() || x || b.length > 0,
              onClick: fr(a) && g ? () => {
                g();
              } : void 0
            }
          )
        ] }),
        /* @__PURE__ */ u(
          oo,
          {
            imageUrl: ne,
            isOpen: W,
            onClose: () => {
              O(!1), Y(null);
            },
            alt: "Image preview"
          }
        )
      ]
    }
  );
}), Qd = () => {
  const { suggestedPrompts: e, chatInputRef: t } = wn();
  if (!e || e.length === 0)
    return null;
  const n = (r) => {
    t.current && t.current.setText(r.description);
  };
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__suggested-prompts", children: [
    /* @__PURE__ */ u("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
    /* @__PURE__ */ u("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((r, i) => /* @__PURE__ */ u(
      "button",
      {
        className: "chat-wrapper__suggested-prompt-card",
        onClick: () => n(r),
        children: /* @__PURE__ */ I("div", { className: "chat-wrapper__suggested-prompt-content", children: [
          /* @__PURE__ */ u("h4", { className: "chat-wrapper__suggested-prompt-title", children: r.title }),
          /* @__PURE__ */ u("p", { className: "chat-wrapper__suggested-prompt-description", children: r.description })
        ] })
      },
      i
    )) })
  ] });
}, eh = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ u(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ u("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ u(ao, { size: e, variant: "dots" }) })
  }
), th = ({
  headerName: e,
  headerDescription: t
}) => /* @__PURE__ */ I("div", { className: "chat-wrapper__main-header", children: [
  /* @__PURE__ */ u("h1", { className: "chat-wrapper__main-title", children: e }),
  t && /* @__PURE__ */ u("p", { className: "chat-wrapper__description", children: t })
] }), nh = () => {
  const {
    messages: e,
    isLoadingConversation: t,
    isStreaming: n,
    headerName: r,
    headerDescription: i,
    suggestedPrompts: a,
    messagesEndRef: o,
    chatInputRef: s,
    isOffline: c
    // conversationError,
  } = wn(), d = xt.state.shouldShowMainHeader(
    e.length,
    n,
    t
  ), l = xt.state.shouldShowSuggestedPrompts(
    e.length,
    n,
    t,
    a
  ), f = xt.state.getContentAreaClass(
    e.length,
    n,
    t
  );
  return /* @__PURE__ */ I(bt, { children: [
    d && /* @__PURE__ */ u("div", { style: c ? { paddingTop: "32px" } : void 0, children: /* @__PURE__ */ u(
      th,
      {
        headerName: r,
        headerDescription: i
      }
    ) }),
    /* @__PURE__ */ I(
      "div",
      {
        className: f,
        style: c ? { paddingTop: "32px" } : void 0,
        children: [
          t && e.length === 0 ? /* @__PURE__ */ u("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ u(eh, { fullHeight: !0 }) }) : /* @__PURE__ */ u(uo, { ref: o }),
          /* @__PURE__ */ u("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ u(Jd, { ref: s }) }),
          l && /* @__PURE__ */ u(Qd, {})
        ]
      }
    )
  ] });
};
function rh({
  isVisible: e,
  isReconnecting: t = !1
}) {
  return e ? /* @__PURE__ */ u("div", { className: "network-status-banner", children: /* @__PURE__ */ u("div", { className: "network-status-banner__content", children: t ? /* @__PURE__ */ I(bt, { children: [
    /* @__PURE__ */ u("div", { className: "network-status-banner__spinner" }),
    /* @__PURE__ */ u("span", { children: "Reconnecting..." })
  ] }) : /* @__PURE__ */ I(bt, { children: [
    /* @__PURE__ */ u("div", { className: "network-status-banner__icon", children: "⚠️" }),
    /* @__PURE__ */ u("span", { children: "No internet connection" })
  ] }) }) }) : null;
}
const po = Bn(
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
  }, c) => {
    var bn, at;
    const { token: d, entityId: l, entityType: f } = e;
    xt.validation.validateAuthProps({
      userMpAuthToken: d,
      chatServerUrl: t,
      chatServerKey: n
    });
    const m = Me(() => xt.url.convertWebSocketToHttp(t), [t]), g = Me(
      () => {
        var v, Ce;
        return new Os({
          apiUrl: m,
          userMpAuthToken: d,
          chatServerKey: n,
          maxFileSize: (v = i.fileUploadConfig) == null ? void 0 : v.maxFileSize,
          allowedTypes: (Ce = i.fileUploadConfig) == null ? void 0 : Ce.allowedTypes
        });
      },
      [m, d, n, i.fileUploadConfig]
    ), S = Me(() => a && a.length > 0 ? a.map(({ execute: v, ...Ce }) => Ce) : [], [a]), x = Ms(), { isOnline: R, wasOffline: T } = Ls(), M = Oe(!0), P = ee((v) => v.isModalOpen), F = ee((v) => v.isCollapsed), N = ee((v) => v.currentMode), b = ee((v) => v.openModal), G = ee((v) => v.closeModal), Z = ee((v) => v.toggleCollapse), $ = ee((v) => v.toggleFullscreen), ne = ee((v) => v.setCurrentMode), Y = ee((v) => v.chatStatus), W = ee((v) => v.setChatStatus), O = ee((v) => v.streamingStatus), A = ee((v) => v.setStreamingStatus), B = ee(
      (v) => v.isLoadingConversation
    ), Q = ee(
      (v) => v.setIsLoadingConversation
    ), H = ee((v) => v.conversationError), we = ee(
      (v) => v.setConversationError
    ), Te = ee((v) => v.setCurrentThreadId), y = ee((v) => v.providerResId), oe = ee((v) => v.setProviderResId), Ge = ee((v) => v.isDevSettingsOpen), C = ee(
      (v) => v.setIsDevSettingsOpen
    ), le = ee((v) => v.isStreaming), X = ee((v) => v.setIsStreaming), ce = ee((v) => v.isThinking), ie = ee((v) => v.setIsThinking), J = ee((v) => v.streamingContent), he = ee((v) => v.setStreamingContent), me = ee((v) => v.isHandlingTool), Ae = ee((v) => v.setIsHandlingTool);
    ve(() => {
      i.mode && ne(i.mode);
    }, [i.mode, ne]), ve(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const v = (Ce) => {
        Ce.key === "Escape" && N === "modal" && P && G();
      };
      if (N === "modal" && P)
        return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
    }, [N, P, G]);
    const {
      messages: ye,
      setMessages: xe,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: Fe,
      getReasoningStatus: qe,
      getReasoningDuration: _t,
      getReasoningContentOnly: vt,
      getReasoningTitle: ht,
      getToolingTitle: gt,
      getToolingStatus: mt,
      handleSetMessage: Gt,
      handleReasoningUpdate: Vt,
      handleChatFinished: $t,
      handleChatError: Nt,
      stopGeneration: Ct
    } = x, E = Oe(null), _ = Oe(null), z = Oe(null), re = ae(
      (v) => {
        oe(v.providerResId), Te(v.threadId), v.canUpdateMetadata && r && Object.keys(r).length > 0 && z.current && z.current.updateMetadata(v.providerResId, { metadata: r }).then(() => {
          console.log("[ChatWrapper] ✅ Metadata update successful");
        }).catch((Ce) => {
          console.error(
            "[ChatWrapper] ❌ Failed to update metadata:",
            Ce
          );
        });
      },
      [oe, Te, r]
    ), pe = ae(
      (v) => {
        var Ce, Re;
        switch (console.log("[ChatWrapper] System event received:", v), v.type) {
          case ct.CHAT_COMPLETED:
            (Ce = v.data) != null && Ce.conversationId && oe(v.data.conversationId), $t(), W(tt.IDLE), A(Ut.IDLE), setTimeout(() => {
              var be;
              (be = _.current) == null || be.focus();
            }, 0);
            break;
          case ct.CHAT_ERROR:
            (Re = v.data) != null && Re.error && Nt(v.data.error);
            break;
          case ct.CONNECTION_LOST:
            break;
          case ct.CONNECTION_RESTORED:
            break;
          case ct.RECONNECTING:
            break;
        }
      },
      [
        $t,
        Nt,
        oe,
        Te
      ]
    ), {
      chatClient: ue,
      connectionState: Ue,
      // reconnectAttempts: reconnectAttempt,
      connectChatClient: De
    } = Qo({
      // Authentication and server properties
      userMpAuthToken: d,
      chatServerUrl: t,
      chatServerKey: n,
      // Entity configuration
      entityId: l,
      entityType: f,
      // Tools configuration
      tools: a,
      // Other properties
      contextHelpers: s,
      onSetMessage: Gt,
      onSystemEvent: pe,
      onReasoningUpdate: Vt,
      onThreadCreated: re
    });
    ve(() => {
      z.current = ue;
    }, [ue]), Ns({
      metadata: r,
      chatClient: ue,
      currentProviderResId: y,
      isLoadingConversation: B,
      messages: ye,
      entityId: l,
      entityType: f
    }), ve(() => {
      T && R && M.current ? (console.log(
        "[ChatWrapper] Network restored, attempting reconnection..."
      ), De().catch((v) => {
        const Ce = Qt(
          v,
          "NetworkReconnection"
        );
        M.current = Ce.isRetryable, Ce.isRetryable || console.warn(
          `[ChatWrapper] Network reconnection failed with non-retryable error: ${Ce.reason}`
        );
      })) : T && R && !M.current && console.warn(
        "[ChatWrapper] Network restored but last error was non-retryable (CORS/auth), skipping reconnection"
      );
    }, [R, T, De]);
    const it = ae(() => {
      console.log("[ChatWrapper] Stopping generation..."), Ct(), W(tt.IDLE), A(Ut.IDLE), ue && y && ue.stopRun(y);
    }, [Ct, W, A, ue, y]);
    sa(
      c,
      () => ({
        updateMetadata: (v) => {
          if (!ue) {
            console.warn(
              "ChatWrapper: Cannot update metadata - chat client not initialized"
            );
            return;
          }
          if (!y) {
            console.warn(
              "ChatWrapper: Cannot update metadata - no active conversation (providerResId not set)"
            );
            return;
          }
          ue.updateMetadata(y, v).catch((Ce) => {
            console.error(
              "ChatWrapper: Failed to update thread metadata:",
              Ce
            );
          });
        }
      }),
      [ue, y]
    );
    const Pe = Me(
      () => ue ? new Ds(ue, {
        onError: i.onError
      }) : null,
      [ue, i.onError]
    ), {
      resetConversationLoader: _e
      /*, reloadConversation*/
    } = As({
      entityId: l,
      entityType: f,
      httpApiUrl: m,
      userMpAuthToken: d,
      chatServerKey: n,
      messages: ye,
      setMessages: xe,
      setIsLoadingConversation: Q,
      setConversationError: we,
      setCurrentThreadId: Te,
      setProviderResId: oe,
      metadata: r,
      isConnected: Ue === Xe.CONNECTED
      // Only load after connection established
    }), Be = Oe(null), He = ae(() => {
      Be.current && cancelAnimationFrame(Be.current), Be.current = requestAnimationFrame(() => {
        var v;
        (v = E.current) == null || v.scrollIntoView({ behavior: "smooth" }), Be.current = null;
      });
    }, []);
    ve(() => {
      He();
    }, [ye, He]), ve(() => {
      J && He();
    }, [J, He]), ve(() => {
      i.onStreamingStatusChange && i.onStreamingStatusChange(O);
    }, [O, i]), ve(() => () => {
      Be.current && cancelAnimationFrame(Be.current);
    }, []), ve(() => () => {
      console.log("[ChatWrapper] Unmounting - cleaning up state and connections"), xe([]), X(!1), ie(!1), he(""), Ae(!1), W(tt.IDLE), A(Ut.IDLE), Q(!1), we(null), Te(null), oe(null);
    }, [
      xe,
      X,
      ie,
      he,
      Ae,
      W,
      A,
      Q,
      we,
      Te,
      oe
    ]);
    const nn = ae(
      async (v, Ce) => {
        if (!v.trim() || le || !Pe || !ue)
          return;
        X(!0), ie(!0), W(tt.SUBMITTED), A(Ut.STARTING);
        const Re = Pe.createUserMessage(
          v,
          Ce
        );
        xe((be) => [...be, Re]);
        try {
          await ue.onTriggerMessage({
            message: Re.content,
            media: Ce,
            providerResId: y || void 0
          }), W(tt.STREAMING);
        } catch (be) {
          ie(!1), W(tt.ERROR), xe(
            (Ot) => Ot.map(
              (ot) => ot.id === Re.id ? {
                ...ot,
                hasError: !0,
                errorMessage: Ue !== Xe.CONNECTED ? "Failed to send message." : be instanceof Error ? be.message : "Failed to send message"
              } : ot
            )
          ), X(!1), W(tt.IDLE), A(Ut.IDLE);
        }
      },
      [
        Pe,
        ue,
        le,
        Ue,
        xe,
        X,
        ie,
        W,
        A,
        y
      ]
    ), Ht = ae(
      async (v) => await g.uploadFiles(v),
      [g]
    ), jt = Me(
      () => xt.css.getContainerClasses(
        N,
        i.position,
        i.theme,
        F,
        i.constrainedHeight
      ),
      [
        N,
        i.position,
        i.theme,
        F,
        i.constrainedHeight
      ]
    ), jn = ae(() => {
      N === "modal" ? b() : Z();
    }, [N, b, Z]), Lt = ae(() => {
      C(!0);
    }, [C]), kn = ae(
      (v) => {
        _.current && _.current.setText(v.description);
      },
      []
    ), Sn = Me(
      () => ({
        messages: ye,
        isStreaming: le,
        isThinking: ce,
        isHandlingTool: me
      }),
      [ye, le, ce, me]
    ), Ie = Me(
      () => ({
        isLoadingConversation: B,
        chatStatus: Y,
        conversationError: H,
        isOffline: !R,
        connectionState: Ue
      }),
      [
        B,
        Y,
        H,
        R,
        Ue
      ]
    ), It = Me(
      () => {
        var v, Ce, Re, be;
        return {
          headerName: i.headerName,
          headerDescription: i.headerDescription,
          placeholderTexts: i.placeholderTexts,
          chipName: i.chipName,
          chipLogo: i.chipLogo,
          suggestedPrompts: i.suggestedPrompts,
          clientTools: S,
          fileUploadEnabled: (v = i.features) == null ? void 0 : v.fileUpload,
          fileUploadConfig: {
            maxFiles: ((Ce = i.fileUploadConfig) == null ? void 0 : Ce.maxFiles) ?? 5,
            maxFileSize: ((Re = i.fileUploadConfig) == null ? void 0 : Re.maxFileSize) ?? 15 * 1024 * 1024,
            // 15MB default
            allowedTypes: ((be = i.fileUploadConfig) == null ? void 0 : be.allowedTypes) ?? ["image/jpeg", "image/png", "image/gif", "image/webp"]
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
        (bn = i.features) == null ? void 0 : bn.fileUpload,
        i.fileUploadConfig,
        S
      ]
    ), xn = Me(
      () => ({
        getReasoningTitle: ht,
        getReasoningStatus: qe,
        getReasoningDuration: _t,
        getReasoningContentOnly: vt,
        getToolingTitle: gt,
        getToolingStatus: mt
      }),
      [
        ht,
        qe,
        _t,
        vt,
        gt,
        mt
      ]
    ), rn = ae(
      async (v) => {
        const Ce = ye.find((Re) => Re.id === v);
        if (Ce) {
          xe((Re) => Re.map(
            (be) => be.id === v ? {
              ...be,
              hasError: !1,
              isRetrying: !0,
              errorMessage: void 0
            } : be
          ));
          try {
            _e(), await De(), await (ue == null ? void 0 : ue.onTriggerMessage({
              message: Ce.content,
              media: Ce.media,
              providerResId: y || void 0
            })), xe(
              (Re) => Re.map(
                (be) => be.id === v ? { ...be, isRetrying: !1 } : be
              )
            );
          } catch (Re) {
            xe(
              (be) => be.map(
                (Ot) => Ot.id === v ? {
                  ...Ot,
                  isRetrying: !1,
                  hasError: !0,
                  errorMessage: Re instanceof Error ? Re.message : "Retry failed"
                } : Ot
              )
            );
          }
        }
      },
      [
        ye,
        xe,
        _e,
        De,
        nn
      ]
    ), qt = Me(
      () => ({
        onSubmit: nn,
        onFileUpload: Ht,
        onStopGeneration: it,
        onPromptSelect: kn,
        onRetryMessage: rn
      }),
      [
        nn,
        Ht,
        it,
        kn,
        rn
      ]
    ), Tn = Me(
      () => ({
        ...Sn,
        ...Ie,
        ...It,
        ...xn,
        ...qt,
        currentAssistantMessageIdRef: Fe,
        messagesEndRef: E,
        chatInputRef: _
      }),
      [
        Sn,
        Ie,
        It,
        xn,
        qt,
        Fe,
        E,
        _
      ]
    );
    return Me(
      () => xt.state.shouldShowBubble(
        N,
        P,
        F
      ),
      [N, P, F]
    ) ? /* @__PURE__ */ u(pi, { children: /* @__PURE__ */ u(
      $s,
      {
        mode: N,
        headerName: i.headerName,
        bubbleText: i.bubbleText,
        showBubbleText: ((at = i.features) == null ? void 0 : at.showBubbleText) !== !1,
        onClick: jn
      }
    ) }) : /* @__PURE__ */ u(pi, { children: /* @__PURE__ */ u(
      Hs,
      {
        onError: (v) => {
          console.error("WebSocket error in ChatWrapper:", v), i.onError && i.onError(v);
        },
        children: /* @__PURE__ */ I("div", { className: jt, style: i.customStyles, children: [
          /* @__PURE__ */ u(
            rh,
            {
              isVisible: !R,
              isReconnecting: Ue === Xe.RECONNECTING
            }
          ),
          o && i.headerVisible === !1 && /* @__PURE__ */ u(
            "button",
            {
              className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
              onClick: Lt,
              title: "Developer Settings",
              children: /* @__PURE__ */ u(ya, { size: 16 })
            }
          ),
          xt.state.shouldShowHeader(i.headerVisible) && /* @__PURE__ */ u(
            js,
            {
              headerName: i.headerName,
              mode: N,
              isCollapsed: F,
              isModalOpen: P,
              devMode: o,
              onClose: G,
              onToggleFullscreen: $,
              onToggleCollapse: Z,
              onOpenSettings: Lt
            }
          ),
          !F && /* @__PURE__ */ u(
            zs,
            {
              onError: (v) => {
                console.error("File upload error:", v), i.onError && i.onError(v);
              },
              children: /* @__PURE__ */ u(Bd, { value: Tn, children: /* @__PURE__ */ u(nh, {}) })
            }
          ),
          /* @__PURE__ */ u(
            Uo,
            {
              isOpen: Ge,
              onClose: () => C(!1),
              apiUrl: m,
              userMpAuthToken: d,
              chatServerKey: n
            }
          )
        ] })
      }
    ) });
  }
);
po.displayName = "ChatWrapperContainer";
const Th = oa(po);
function bh({
  isConnected: e,
  isConnecting: t = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 1 / 0,
  onRetry: a,
  autoHideDuration: o = 3e3
}) {
  const [s, c] = fe("hidden"), [d, l] = fe(!1);
  if (ve(() => {
    console.log("[ConnectionNotification] State update:", {
      isConnected: e,
      isConnecting: t,
      isReconnecting: n,
      reconnectAttempt: r,
      wasDisconnected: d,
      currentState: s
    }), t ? c("connecting") : !e && !n ? (l(!0), i !== 1 / 0 && r >= i ? c("error") : c("hidden")) : n ? (console.log("[ConnectionNotification] Setting state to RECONNECTING"), c("reconnecting")) : e && d ? (c("hidden"), l(!1)) : e && !d && c("hidden");
  }, [e, t, n, r, i, d, o]), s === "hidden")
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
  return g ? s === "connecting" ? /* @__PURE__ */ u("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ I("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ u("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ u("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ u("div", { className: "connection-notification__bubble" })
  ] }) }) : s === "reconnecting" ? (console.log("[ConnectionNotification] RENDERING RECONNECTING BANNER", { reconnectAttempt: r }), /* @__PURE__ */ u("div", { className: `connection-notification connection-notification--banner connection-notification--${s}`, children: /* @__PURE__ */ I("div", { className: "connection-notification__banner-content", children: [
    /* @__PURE__ */ u("span", { className: "connection-notification__banner-spinner" }),
    /* @__PURE__ */ I("span", { className: "connection-notification__banner-text", children: [
      "Reconnecting... (attempt ",
      r,
      ")"
    ] })
  ] }) })) : /* @__PURE__ */ u("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ I("div", { className: "connection-notification__content", children: [
    /* @__PURE__ */ u("div", { className: "connection-notification__icon", children: g.icon }),
    /* @__PURE__ */ u("div", { className: "connection-notification__title", children: g.title }),
    /* @__PURE__ */ u("div", { className: "connection-notification__message", children: g.message }),
    a && /* @__PURE__ */ u("div", { className: "connection-notification__actions", children: /* @__PURE__ */ u(
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
  Yd as AnimatedPlaceholder,
  tt as CHAT_STATUS,
  Us as ChatIcon,
  Th as ChatWrapper,
  Bs as CloseIcon,
  Gs as CollapseIcon,
  bh as ConnectionNotification,
  Vs as CopyIcon,
  Uo as DevSettings,
  wo as EntityType,
  Ws as FullscreenIcon,
  eh as InlineLoader,
  ao as Loader,
  $e as PROCESSING_STATUS,
  jd as PromptInput,
  Kd as PromptInputButton,
  yh as PromptInputModelSelect,
  kh as PromptInputModelSelectContent,
  Sh as PromptInputModelSelectItem,
  wh as PromptInputModelSelectTrigger,
  xh as PromptInputModelSelectValue,
  Xd as PromptInputSubmit,
  ho as PromptInputTextarea,
  qd as PromptInputToolbar,
  Zd as PromptInputTools,
  Fd as Reasoning,
  io as ReasoningContent,
  ro as ReasoningTrigger,
  Ut as STREAMING_STATUS,
  ya as SettingsIcon,
  Qd as SuggestedPrompts,
  xo as fetchThreadMessages,
  fr as isChatActive,
  lh as isChatError,
  sh as isChatIdle,
  ch as isProcessingActive,
  uh as isProcessingComplete,
  dh as isProcessingError,
  la as updateThread,
  ca as updateThreadMetadata,
  ph as useChatState,
  fh as useConversationState,
  mh as useDevState,
  hh as useLayoutState,
  gh as useThreadState,
  Ch as useUIState,
  ee as useUIStore
};
