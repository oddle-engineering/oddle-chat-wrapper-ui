var go = Object.defineProperty;
var mo = (e, t, n) => t in e ? go(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var q = (e, t, n) => mo(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as u, jsxs as v, Fragment as wt } from "react/jsx-runtime";
import mt, { useState as pe, useEffect as Re, useCallback as ae, useRef as Pe, useMemo as Ne, Component as Ar, createContext as Co, useContext as yo, memo as oa, forwardRef as Bn, useImperativeHandle as sa } from "react";
const it = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, Zt = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, Ue = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, pr = (e) => e === it.SUBMITTED || e === it.STREAMING, ih = (e) => e === it.IDLE, ah = (e) => e === it.ERROR, oh = (e) => e === Ue.PROCESSING, sh = (e) => e === Ue.COMPLETED, lh = (e) => e === Ue.ERROR;
var wo = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(wo || {}), rt = /* @__PURE__ */ ((e) => (e.DISCONNECTED = "disconnected", e.CONNECTING = "connecting", e.CONNECTED = "connected", e.RECONNECTING = "reconnecting", e))(rt || {});
async function So(e, t) {
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
async function xo(e, t, n) {
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
async function ko(e, t, n) {
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
}, To = (e) => e ? ti(e) : ti, Eo = (e) => e;
function bo(e, t = Eo) {
  const n = mt.useSyncExternalStore(
    e.subscribe,
    mt.useCallback(() => t(e.getState()), [e, t]),
    mt.useCallback(() => t(e.getInitialState()), [e, t])
  );
  return mt.useDebugValue(n), n;
}
const _o = (e) => {
  const t = To(e), n = (r) => bo(t, r);
  return Object.assign(n, t), n;
}, vo = (e) => _o, ni = { BASE_URL: "/", DEV: !0, MODE: "production", PROD: !1, SSR: !1, VITE_APP_TOLGEE_API_KEY: "tgpak_ge4v6ytcm5xtozdlobzxk4twgyzwqntjoe3xi4bwozygu5q", VITE_APP_TOLGEE_API_URL: "https://tolgee-translation.oddleapp.com", VITE_APP_TOLGEE_PROJECT_ID: "19", VITE_USER_NODE_ENV: "development" }, fn = /* @__PURE__ */ new Map(), bn = (e) => {
  const t = fn.get(e);
  return t ? Object.fromEntries(
    Object.entries(t.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, Io = (e, t, n) => {
  if (e === void 0)
    return {
      type: "untracked",
      connection: t.connect(n)
    };
  const r = fn.get(n.name);
  if (r)
    return { type: "tracked", store: e, ...r };
  const i = {
    connection: t.connect(n),
    stores: {}
  };
  return fn.set(n.name, i), { type: "tracked", store: e, ...i };
}, Ro = (e, t) => {
  if (t === void 0) return;
  const n = fn.get(e);
  n && (delete n.stores[t], Object.keys(n.stores).length === 0 && fn.delete(e));
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
  i.setState = (x, M, T) => {
    const I = n(x, M);
    if (!m) return I;
    const D = T === void 0 ? {
      type: o || Mo(new Error().stack) || "anonymous"
    } : typeof T == "string" ? { type: T } : T;
    return s === void 0 ? (l == null || l.send(D, r()), I) : (l == null || l.send(
      {
        ...D,
        type: `${s}/${D.type}`
      },
      {
        ...bn(c.name),
        [s]: i.getState()
      }
    ), I);
  }, i.devtools = {
    cleanup: () => {
      l && typeof l.unsubscribe == "function" && l.unsubscribe(), Ro(c.name, s);
    }
  };
  const g = (...x) => {
    const M = m;
    m = !1, n(...x), m = M;
  }, k = e(i.setState, r, i);
  if (f.type === "untracked" ? l == null || l.init(k) : (f.stores[f.store] = i, l == null || l.init(
    Object.fromEntries(
      Object.entries(f.stores).map(([x, M]) => [
        x,
        x === f.store ? k : M.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let x = !1;
    const M = i.dispatch;
    i.dispatch = (...T) => {
      (ni ? "production" : void 0) !== "production" && T[0].type === "__setState" && !x && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), x = !0), M(...T);
    };
  }
  return l.subscribe((x) => {
    var M;
    switch (x.type) {
      case "ACTION":
        if (typeof x.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return Zn(
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
              const I = T.state[s];
              if (I == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(I) && g(I);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(T);
          }
        );
      case "DISPATCH":
        switch (x.payload.type) {
          case "RESET":
            return g(k), s === void 0 ? l == null ? void 0 : l.init(i.getState()) : l == null ? void 0 : l.init(bn(c.name));
          case "COMMIT":
            if (s === void 0) {
              l == null || l.init(i.getState());
              return;
            }
            return l == null ? void 0 : l.init(bn(c.name));
          case "ROLLBACK":
            return Zn(x.state, (T) => {
              if (s === void 0) {
                g(T), l == null || l.init(i.getState());
                return;
              }
              g(T[s]), l == null || l.init(bn(c.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return Zn(x.state, (T) => {
              if (s === void 0) {
                g(T);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(T[s]) && g(T[s]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: T } = x.payload, I = (M = T.computedStates.slice(-1)[0]) == null ? void 0 : M.state;
            if (!I) return;
            g(s === void 0 ? I : I[s]), l == null || l.send(
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
  }), k;
}, No = Ao, Zn = (e, t) => {
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
  chatStatus: it.IDLE,
  streamingStatus: Zt.IDLE,
  // Actions
  setChatStatus: (t) => e({ chatStatus: t }),
  setStreamingStatus: (t) => e({ streamingStatus: t }),
  resetChatStatus: () => e({
    chatStatus: it.IDLE,
    streamingStatus: Zt.IDLE
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
), ch = () => ee((e) => ({
  isModalOpen: e.isModalOpen,
  isCollapsed: e.isCollapsed,
  currentMode: e.currentMode,
  openModal: e.openModal,
  closeModal: e.closeModal,
  toggleCollapse: e.toggleCollapse,
  toggleFullscreen: e.toggleFullscreen
})), uh = () => ee((e) => ({
  chatStatus: e.chatStatus,
  streamingStatus: e.streamingStatus,
  setChatStatus: e.setChatStatus,
  setStreamingStatus: e.setStreamingStatus,
  resetChatStatus: e.resetChatStatus
})), dh = () => ee((e) => ({
  isLoadingConversation: e.isLoadingConversation,
  conversationError: e.conversationError,
  setIsLoadingConversation: e.setIsLoadingConversation,
  setConversationError: e.setConversationError,
  clearConversationError: e.clearConversationError
})), hh = () => ee((e) => ({
  currentThreadId: e.currentThreadId,
  providerResId: e.providerResId,
  setCurrentThreadId: e.setCurrentThreadId,
  setProviderResId: e.setProviderResId,
  clearThreadData: e.clearThreadData
})), ph = () => ee((e) => ({
  isDevSettingsOpen: e.isDevSettingsOpen,
  setIsDevSettingsOpen: e.setIsDevSettingsOpen,
  toggleDevSettings: e.toggleDevSettings
})), zo = ({
  isOpen: e,
  onClose: t,
  apiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  app: a = "UD21"
  // Default to UD21 if not specified
}) => {
  const [o, s] = pe(null), [c, d] = pe(""), [l, f] = pe(""), m = ee((z) => z.providerResId), [g, k] = pe(""), [x, M] = pe("BRAND"), [T, I] = pe(""), [D, P] = pe(""), [N, E] = pe(!1), [j, X] = pe(null), [W, ne] = pe(null), [Z, H] = pe("agent");
  Re(() => {
    e && !o && A();
  }, [e]);
  const A = ae(async () => {
    E(!0), X(null);
    try {
      const z = await So(n, {
        userMpAuthToken: r,
        chatServerKey: i
      });
      if (!z)
        throw new Error(`No configuration found for app: ${a}`);
      s(z), d(z.promptPath), f(z.versionUuid);
    } catch (z) {
      X(z instanceof Error ? z.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", z);
    } finally {
      E(!1);
    }
  }, [n, a, r, i]), F = ae(async () => {
    if (o) {
      E(!0), X(null);
      try {
        const z = await xo(n, {
          app: o.app,
          promptPath: c,
          versionUuid: l,
          isDefault: o.isDefault
        }, {
          userMpAuthToken: r,
          chatServerKey: i
        });
        s(z), t(), window.location.reload();
      } catch (z) {
        X(z instanceof Error ? z.message : "Failed to update configuration"), console.error("Error updating agent configuration:", z);
      } finally {
        E(!1);
      }
    }
  }, [n, c, l, o, t, r, i]), K = ae(async () => {
    if (!m) {
      X("No active conversation to attach");
      return;
    }
    E(!0), X(null), ne(null);
    try {
      let z;
      if (D.trim())
        try {
          z = JSON.parse(D);
        } catch {
          throw new Error("Invalid JSON in metadata field");
        }
      const xe = g && x, _e = T || z;
      if (xe && await la(
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
      ), _e && await ca(
        n,
        m,
        {
          tag: T || void 0,
          metadata: z
        },
        {
          userMpAuthToken: r,
          chatServerKey: i
        }
      ), !xe && !_e) {
        X("Please provide at least one field to update");
        return;
      }
      ne("Thread updated successfully!"), setTimeout(() => {
        k(""), M("BRAND"), I(""), P(""), ne(null);
      }, 2e3);
    } catch (z) {
      X(z instanceof Error ? z.message : "Failed to update thread"), console.error("Error updating thread:", z);
    } finally {
      E(!1);
    }
  }, [m, n, g, x, T, D, r, i]), se = ae(() => {
    o && (d(o.promptPath), f(o.versionUuid)), X(null), t();
  }, [o, t]);
  return e ? /* @__PURE__ */ u("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ u("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: se,
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
    /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-tabs", children: [
      /* @__PURE__ */ u(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${Z === "agent" ? "active" : ""}`,
          onClick: () => H("agent"),
          children: "Agent Config"
        }
      ),
      /* @__PURE__ */ u(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${Z === "thread" ? "active" : ""}`,
          onClick: () => H("thread"),
          children: "Thread Attachment"
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-content", children: [
      W && /* @__PURE__ */ u("div", { className: "chat-wrapper__dev-settings-success", children: W }),
      N && /* @__PURE__ */ u("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      j && /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ v("p", { children: [
          "Error: ",
          j
        ] }),
        /* @__PURE__ */ u(
          "button",
          {
            onClick: Z === "agent" ? A : void 0,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      Z === "agent" && o && !N && /* @__PURE__ */ v(wt, { children: [
        /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ u("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ u(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: c,
              onChange: (z) => d(z.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: N
            }
          ),
          /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ u("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ u(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: l,
              onChange: (z) => f(z.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: N
            }
          ),
          /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-field", children: [
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
      Z === "thread" && !N && /* @__PURE__ */ v(wt, { children: [
        /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-info", children: [
          /* @__PURE__ */ v("p", { children: [
            /* @__PURE__ */ u("strong", { children: "Provider Resource ID:" }),
            " ",
            m || "No active conversation"
          ] }),
          /* @__PURE__ */ u("p", { style: { fontSize: "12px", color: "#666", marginTop: "8px" }, children: "Note: Entity ownership is typically set at initialization. Use this to update business context." })
        ] }),
        /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-section", children: [
          /* @__PURE__ */ u("h4", { style: { marginBottom: "8px", fontSize: "14px", fontWeight: "600" }, children: "Update Business Context" }),
          /* @__PURE__ */ u("p", { style: { marginBottom: "12px", fontSize: "12px", color: "#666" }, children: "Update dynamic metadata like order IDs, table IDs, status, etc." }),
          /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-field", children: [
            /* @__PURE__ */ u("label", { htmlFor: "tag", children: "Tag:" }),
            /* @__PURE__ */ u(
              "input",
              {
                id: "tag",
                type: "text",
                value: T,
                onChange: (z) => I(z.target.value),
                placeholder: "e.g., customer-inquiry, support",
                className: "chat-wrapper__dev-settings-input",
                disabled: N || !m
              }
            ),
            /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "Optional tag for categorizing the thread." })
          ] }),
          /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-field", children: [
            /* @__PURE__ */ u("label", { htmlFor: "metadata", children: "Metadata (JSON):" }),
            /* @__PURE__ */ u(
              "textarea",
              {
                id: "metadata",
                value: D,
                onChange: (z) => P(z.target.value),
                placeholder: '{"orderId": "order_789", "tableId": "table_5", "status": "pending"}',
                className: "chat-wrapper__dev-settings-input",
                rows: 4,
                disabled: N || !m
              }
            ),
            /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "App-specific business data (orderId, tableId, campaignId, etc.)." })
          ] })
        ] }),
        /* @__PURE__ */ u("div", { style: { borderTop: "1px solid #e0e0e0", margin: "20px 0" } }),
        /* @__PURE__ */ v("details", { style: { marginTop: "16px" }, children: [
          /* @__PURE__ */ u("summary", { style: { cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#666" }, children: "Advanced: Change Entity Ownership (Rare)" }),
          /* @__PURE__ */ v("div", { style: { marginTop: "12px", padding: "12px", backgroundColor: "#f9f9f9", borderRadius: "4px" }, children: [
            /* @__PURE__ */ u("p", { style: { fontSize: "12px", color: "#666", marginBottom: "12px" }, children: "⚠️ Entity is typically set at initialization. Only change this if transferring conversation ownership." }),
            /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-field", children: [
              /* @__PURE__ */ u("label", { htmlFor: "entity-id", children: "Entity ID:" }),
              /* @__PURE__ */ u(
                "input",
                {
                  id: "entity-id",
                  type: "text",
                  value: g,
                  onChange: (z) => k(z.target.value),
                  placeholder: "e.g., brand_123 or account_456",
                  className: "chat-wrapper__dev-settings-input",
                  disabled: N || !m
                }
              ),
              /* @__PURE__ */ u("p", { className: "chat-wrapper__dev-settings-help", children: "The brand or account ID to attach this thread to." })
            ] }),
            /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-field", children: [
              /* @__PURE__ */ u("label", { htmlFor: "entity-type", children: "Entity Type:" }),
              /* @__PURE__ */ v(
                "select",
                {
                  id: "entity-type",
                  value: x,
                  onChange: (z) => M(z.target.value),
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
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: se,
          disabled: N,
          children: "Cancel"
        }
      ),
      Z === "agent" && /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: F,
          disabled: N || !o,
          children: N ? "Saving..." : "Save & Reload"
        }
      ),
      Z === "thread" && /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: K,
          disabled: N || !m,
          children: N ? "Updating..." : "Update Thread"
        }
      )
    ] })
  ] }) }) : null;
}, Uo = {
  maxReconnectAttempts: 1 / 0,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, _n = {
  NORMAL: 1e3,
  // Normal closure
  GOING_AWAY: 1001
};
var st = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(st || {}), pt = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e.STOP_RUN = "stop_run", e))(pt || {}), Ge = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.THREAD_CREATED = "thread_created", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(Ge || {}), Nn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(Nn || {}), Dt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(Dt || {});
class Kt {
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
    return this.createConnectionEvent(st.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(st.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(st.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(st.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(st.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(st.CHAT_ERROR, { error: t, errorCode: n });
  }
}
class At {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(t) {
    return {
      type: pt.CHAT_MESSAGE,
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
      type: pt.CONFIGURE_TOOLS,
      toolSchemas: t,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(t) {
    return {
      type: pt.UPDATE_TOOLS,
      toolSchemas: t
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(t) {
    return {
      type: pt.UPDATE_CONTEXT_HELPERS,
      contextHelpers: t
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(t, n) {
    return {
      type: pt.TOOL_CALL_RESPONSE,
      callId: t,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(t, n) {
    return {
      type: pt.TOOL_CALL_RESPONSE,
      callId: t,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: pt.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(t, n) {
    return {
      type: pt.HEARTBEAT_PONG,
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
      type: pt.STOP_RUN,
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
class Bo {
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
    q(this, "onOpen");
    q(this, "onMessage");
    q(this, "onError");
    q(this, "onClose");
    q(this, "onSystemEvent");
    q(this, "onTicketRefresh");
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
        Kt.connectionLost("Max reconnection attempts reached")
      ), this.connectionState.setReconnecting(!1);
      return;
    }
    if (this.reconnectTimer !== null) {
      console.log("[WebSocketManager] Reconnection already in progress, skipping");
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    console.log("[WebSocketManager] Firing RECONNECTING event", { attempt: t, maxAttempts: n }), (s = this.onSystemEvent) == null || s.call(this, Kt.reconnecting(t, n));
    const r = this.config.reconnectDelay, i = Math.random() * 90 + 10, a = r + i;
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null, this.connectionState.isConnected || this.reconnect();
    }, a);
  }
  async reconnect() {
    try {
      if (this.closeConnection(), this.onTicketRefresh) {
        console.log("[WebSocketManager] Requesting fresh ticket for reconnection...");
        try {
          const n = await this.onTicketRefresh();
          this.currentTicket = n, console.log("[WebSocketManager] Fresh ticket obtained for reconnection");
        } catch (n) {
          console.error("[WebSocketManager] Failed to get fresh ticket:", n);
        }
      }
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
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Kt.connectionRestored()), (n = this.onOpen) == null || n.call(this);
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
    this.onOpen = t.onOpen, this.onMessage = t.onMessage, this.onError = t.onError, this.onClose = t.onClose, this.onSystemEvent = t.onSystemEvent, this.onTicketRefresh = t.onTicketRefresh;
  }
}
class Wo {
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
}, De = {
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
  getMessageType: (e, t) => t === !1 ? De.isErrorMessage(e) ? te.MESSAGE_TYPES.ERROR : (De.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || De.isThinkingMessage(e), te.MESSAGE_TYPES.THOUGHT) : De.isCompletedMessage(e) ? te.MESSAGE_TYPES.COMPLETED : De.isErrorMessage(e) ? te.MESSAGE_TYPES.ERROR : (De.isHandlingMessage(e) || De.isThinkingMessage(e) && !e.includes(te.UI_TEXT.AI_IS_THINKING), te.MESSAGE_TYPES.THINKING)
};
class Go extends ua {
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
class Vo extends ua {
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
class $o {
  constructor(t, n = {}) {
    q(this, "reasoningHandler");
    q(this, "toolHandler");
    q(this, "handlers");
    q(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new Go(t.onReasoningUpdate), this.toolHandler = new Vo(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case Ge.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case Ge.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case Ge.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case Ge.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case Ge.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case Ge.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case Ge.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case Ge.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case Ge.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case Ge.HEARTBEAT_ACK:
          break;
        case Ge.ERROR:
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
      case Dt.TEXT_DELTA:
        t.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, t.data.textDelta));
        break;
      case Dt.REASONING_START:
        this.reasoningHandler.handleReasoningStart(t.data);
        break;
      case Dt.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(t.data);
        break;
      case Dt.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(t.data);
        break;
      case Dt.TOOL_CALL:
        this.toolHandler.handleServerToolCall(t.data);
        break;
      case Dt.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(t.data);
        break;
    }
  }
  handleLatitudeEvent(t) {
    var n;
    if (((n = t.data) == null ? void 0 : n.type) === Dt.TOOL_RESULT && this.handlers.onReasoningUpdate) {
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
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Kt.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      Kt.chatError(t.error || "Unknown error")
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
      Kt.chatError(t.error || "Unknown WebSocket error")
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
async function jo(e, t) {
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
function fr(e) {
  if (!e.success || !e.ticket || !e.expiresAt)
    return !1;
  const t = new Date(e.expiresAt).getTime();
  return Date.now() < t - 3e4;
}
function ri(e) {
  const t = fr(e), n = new Date(e.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: t,
    expiresIn: i,
    expired: r >= n
  };
}
function qo(e) {
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
function Jt(e, t) {
  const n = qo(e);
  return console.error(`[${t}] Error occurred:`, {
    error: (e == null ? void 0 : e.message) || e,
    classification: n,
    shouldRetry: n.isRetryable
  }), n;
}
class Zo {
  constructor(t, n, r = {}) {
    q(this, "ticket", null);
    q(this, "refreshPromise", null);
    q(this, "validationInterval", null);
    q(this, "authData");
    q(this, "apiUrl");
    q(this, "config");
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
    return this.ticket && fr(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
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
      return this.ticket = await jo(this.apiUrl, this.authData), console.log("TicketManager: Ticket received successfully", {
        hasTicket: !!this.ticket.ticket,
        expiresAt: this.ticket.expiresAt
      }), this.ticket.ticket;
    } catch (t) {
      const n = Jt(t, "TicketManager");
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
      const r = ri(this.ticket).expiresIn / 1e3;
      r < this.config.renewalThreshold && (console.log(
        `TicketManager: Ticket expires in ${r.toFixed(0)}s, renewing...`
      ), await this.refreshTicket(), console.log("TicketManager: Ticket renewed proactively"), t == null || t());
    } catch (n) {
      const r = Jt(n, "TicketManager:ProactiveRenewal");
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
    return this.ticket ? fr(this.ticket) : !1;
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
class Ko {
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
      ...Uo
    }, this.connectionState = new Wo(), this.wsManager = new Bo(this.config, this.connectionState), this.messageHandler = new $o({}), this.setupWebSocketHandlers();
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
    ), this.handleAuthenticationFailure(n)), (n == null ? void 0 : n.type) === Ge.THREAD_CREATED) {
      (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onThreadCreated) == null || i.call(r, n.data);
      return;
    }
    if ((n == null ? void 0 : n.type) === Ge.TOOLS_CONFIGURED) {
      (a = this.initResolve) == null || a.call(this);
      return;
    }
    (n == null ? void 0 : n.type) === Ge.SESSION_ESTABLISHED && (this.toolSchemas && this.toolSchemas.length > 0 ? this.sendToolConfiguration() : (o = this.initResolve) == null || o.call(this));
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
      const o = Jt(a, "TicketRefresh");
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
    }, this.ticketManager = new Zo(
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
function Xo({
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
  const [f, m] = pe(
    null
  ), [g, k] = pe(
    rt.DISCONNECTED
  ), [x, M] = pe(0), T = Pe(null), I = Pe(s), D = Pe(c), P = Pe(d), N = Pe(l);
  Re(() => {
    I.current = s, D.current = c, P.current = d, N.current = l;
  }, [s, c, d, l]);
  const { toolSchemas: E, clientToolExecutors: j } = Ne(() => {
    if (a && a.length > 0) {
      const Z = a.map(({ execute: A, ...F }) => F), H = {};
      return a.forEach((A) => {
        H[A.name] = A.execute;
      }), {
        toolSchemas: Z,
        clientToolExecutors: H
      };
    }
    return {
      toolSchemas: [],
      clientToolExecutors: {}
    };
  }, [a]), X = Pe(), W = ae(async () => {
    try {
      if (k(rt.CONNECTING), !e)
        throw new Error("userMpAuthToken is required");
      if (!t)
        throw new Error("chatServerUrl is required");
      if (!n)
        throw new Error("chatServerKey is required");
      const Z = new Ko();
      T.current = Z, m(Z);
      const H = o || {};
      await Z.onInit({
        // Authentication and server properties
        userMpAuthToken: e,
        chatServerUrl: t,
        chatServerKey: n,
        entityId: r,
        entityType: i == null ? void 0 : i.toString(),
        // Tools configuration
        toolSchemas: E,
        clientTools: j,
        contextHelpers: H,
        onSetMessage: I.current,
        onSystemEvent: D.current,
        onReasoningUpdate: P.current,
        onThreadCreated: N.current
      }), k(rt.CONNECTED);
    } catch (Z) {
      const H = Jt(Z, "WebSocketConnection");
      k(rt.DISCONNECTED), H.isRetryable ? (console.log(`[WebSocketConnection] Will retry in 2s: ${H.reason}`), setTimeout(() => {
        var A;
        (T.current === null || !T.current.getConnectionStatus().connected) && ((A = X.current) == null || A.call(X));
      }, 2e3)) : console.warn(`[WebSocketConnection] Will not retry: ${H.reason}`);
    }
  }, [
    e,
    t,
    n,
    r,
    i,
    E,
    j,
    o
    // Removed onSetMessage, onSystemEvent, onReasoningUpdate to prevent reconnections
  ]), ne = ae(() => {
    T.current && (T.current.disconnect(), T.current = null), m(null), k(rt.DISCONNECTED);
  }, []);
  return X.current = W, Re(() => (W(), () => {
    ne();
  }), [W, ne]), Re(() => {
    const Z = setInterval(() => {
      if (T.current) {
        const H = T.current.getConnectionStatus();
        H.connected ? k(rt.CONNECTED) : H.isReconnecting ? k(rt.RECONNECTING) : k(rt.DISCONNECTED), M(H.reconnectAttempts);
      }
    }, 1e3);
    return () => clearInterval(Z);
  }, []), {
    chatClient: f,
    connectionState: g,
    reconnectAttempts: x,
    connectChatClient: W,
    disconnectChatClient: ne
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: da,
  setPrototypeOf: ii,
  isFrozen: Yo,
  getPrototypeOf: Jo,
  getOwnPropertyDescriptor: Qo
} = Object;
let {
  freeze: Ve,
  seal: ct,
  create: gr
} = Object, {
  apply: mr,
  construct: Cr
} = typeof Reflect < "u" && Reflect;
Ve || (Ve = function(t) {
  return t;
});
ct || (ct = function(t) {
  return t;
});
mr || (mr = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
Cr || (Cr = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const vn = $e(Array.prototype.forEach), es = $e(Array.prototype.lastIndexOf), ai = $e(Array.prototype.pop), rn = $e(Array.prototype.push), ts = $e(Array.prototype.splice), Ln = $e(String.prototype.toLowerCase), Kn = $e(String.prototype.toString), Xn = $e(String.prototype.match), an = $e(String.prototype.replace), ns = $e(String.prototype.indexOf), rs = $e(String.prototype.trim), dt = $e(Object.prototype.hasOwnProperty), We = $e(RegExp.prototype.test), on = is(TypeError);
function $e(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return mr(e, t, r);
  };
}
function is(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return Cr(e, n);
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
      a !== i && (Yo(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function as(e) {
  for (let t = 0; t < e.length; t++)
    dt(e, t) || (e[t] = null);
  return e;
}
function Mt(e) {
  const t = gr(null);
  for (const [n, r] of da(e))
    dt(e, n) && (Array.isArray(r) ? t[n] = as(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = Mt(r) : t[n] = r);
  return t;
}
function sn(e, t) {
  for (; e !== null; ) {
    const r = Qo(e, t);
    if (r) {
      if (r.get)
        return $e(r.get);
      if (typeof r.value == "function")
        return $e(r.value);
    }
    e = Jo(e);
  }
  function n() {
    return null;
  }
  return n;
}
const oi = Ve(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Yn = Ve(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Jn = Ve(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), os = Ve(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Qn = Ve(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), ss = Ve(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), si = Ve(["#text"]), li = Ve(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), er = Ve(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), ci = Ve(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), In = Ve(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), ls = ct(/\{\{[\w\W]*|[\w\W]*\}\}/gm), cs = ct(/<%[\w\W]*|[\w\W]*%>/gm), us = ct(/\$\{[\w\W]*/gm), ds = ct(/^data-[\-\w.\u00B7-\uFFFF]+$/), hs = ct(/^aria-[\-\w]+$/), ha = ct(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), ps = ct(/^(?:\w+script|data):/i), fs = ct(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), pa = ct(/^html$/i), gs = ct(/^[a-z][.\w]*(-[.\w]+)+$/i);
var ui = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: hs,
  ATTR_WHITESPACE: fs,
  CUSTOM_ELEMENT: gs,
  DATA_ATTR: ds,
  DOCTYPE_NAME: pa,
  ERB_EXPR: cs,
  IS_ALLOWED_URI: ha,
  IS_SCRIPT_OR_DATA: ps,
  MUSTACHE_EXPR: ls,
  TMPLIT_EXPR: us
});
const ln = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, ms = function() {
  return typeof window > "u" ? null : window;
}, Cs = function(t, n) {
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
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ms();
  const t = (Y) => fa(Y);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== ln.document || !e.Element)
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
  } = e, k = c.prototype, x = sn(k, "cloneNode"), M = sn(k, "remove"), T = sn(k, "nextSibling"), I = sn(k, "childNodes"), D = sn(k, "parentNode");
  if (typeof o == "function") {
    const Y = n.createElement("template");
    Y.content && Y.content.ownerDocument && (n = Y.content.ownerDocument);
  }
  let P, N = "";
  const {
    implementation: E,
    createNodeIterator: j,
    createDocumentFragment: X,
    getElementsByTagName: W
  } = n, {
    importNode: ne
  } = r;
  let Z = di();
  t.isSupported = typeof da == "function" && typeof D == "function" && E && E.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: H,
    ERB_EXPR: A,
    TMPLIT_EXPR: F,
    DATA_ATTR: K,
    ARIA_ATTR: se,
    IS_SCRIPT_OR_DATA: z,
    ATTR_WHITESPACE: xe,
    CUSTOM_ELEMENT: _e
  } = ui;
  let {
    IS_ALLOWED_URI: y
  } = ui, oe = null;
  const re = de({}, [...oi, ...Yn, ...Jn, ...Qn, ...si]);
  let C = null;
  const he = de({}, [...li, ...er, ...ci, ...In]);
  let Q = Object.seal(gr(null, {
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
  })), le = null, fe = null;
  const J = Object.seal(gr(null, {
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
  let Te = !0, me = !0, Le = !1, ot = !0, Ye = !1, xt = !0, Je = !1, kt = !1, Tt = !1, ut = !1, Et = !1, bt = !1, Ft = !0, Ht = !1;
  const Vt = "user-content-";
  let _t = !0, Qe = !1, b = {}, _ = null;
  const B = de({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let $ = null;
  const ce = de({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ee = null;
  const et = de({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Oe = "http://www.w3.org/1998/Math/MathML", tt = "http://www.w3.org/2000/svg", ve = "http://www.w3.org/1999/xhtml";
  let Se = ve, je = !1, He = null;
  const jn = de({}, [Oe, tt, ve], Kn);
  let $t = de({}, ["mi", "mo", "mn", "ms", "mtext"]), zt = de({}, ["annotation-xml"]);
  const wn = de({}, ["title", "style", "font", "a", "script"]);
  let Nt = null;
  const Sn = ["application/xhtml+xml", "text/html"], xn = "text/html";
  let Ie = null, vt = null;
  const kn = n.createElement("form"), Tn = function(w) {
    return w instanceof RegExp || w instanceof Function;
  }, En = function() {
    let w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(vt && vt === w)) {
      if ((!w || typeof w != "object") && (w = {}), w = Mt(w), Nt = // eslint-disable-next-line unicorn/prefer-includes
      Sn.indexOf(w.PARSER_MEDIA_TYPE) === -1 ? xn : w.PARSER_MEDIA_TYPE, Ie = Nt === "application/xhtml+xml" ? Kn : Ln, oe = dt(w, "ALLOWED_TAGS") ? de({}, w.ALLOWED_TAGS, Ie) : re, C = dt(w, "ALLOWED_ATTR") ? de({}, w.ALLOWED_ATTR, Ie) : he, He = dt(w, "ALLOWED_NAMESPACES") ? de({}, w.ALLOWED_NAMESPACES, Kn) : jn, Ee = dt(w, "ADD_URI_SAFE_ATTR") ? de(Mt(et), w.ADD_URI_SAFE_ATTR, Ie) : et, $ = dt(w, "ADD_DATA_URI_TAGS") ? de(Mt(ce), w.ADD_DATA_URI_TAGS, Ie) : ce, _ = dt(w, "FORBID_CONTENTS") ? de({}, w.FORBID_CONTENTS, Ie) : B, le = dt(w, "FORBID_TAGS") ? de({}, w.FORBID_TAGS, Ie) : Mt({}), fe = dt(w, "FORBID_ATTR") ? de({}, w.FORBID_ATTR, Ie) : Mt({}), b = dt(w, "USE_PROFILES") ? w.USE_PROFILES : !1, Te = w.ALLOW_ARIA_ATTR !== !1, me = w.ALLOW_DATA_ATTR !== !1, Le = w.ALLOW_UNKNOWN_PROTOCOLS || !1, ot = w.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ye = w.SAFE_FOR_TEMPLATES || !1, xt = w.SAFE_FOR_XML !== !1, Je = w.WHOLE_DOCUMENT || !1, ut = w.RETURN_DOM || !1, Et = w.RETURN_DOM_FRAGMENT || !1, bt = w.RETURN_TRUSTED_TYPE || !1, Tt = w.FORCE_BODY || !1, Ft = w.SANITIZE_DOM !== !1, Ht = w.SANITIZE_NAMED_PROPS || !1, _t = w.KEEP_CONTENT !== !1, Qe = w.IN_PLACE || !1, y = w.ALLOWED_URI_REGEXP || ha, Se = w.NAMESPACE || ve, $t = w.MATHML_TEXT_INTEGRATION_POINTS || $t, zt = w.HTML_INTEGRATION_POINTS || zt, Q = w.CUSTOM_ELEMENT_HANDLING || {}, w.CUSTOM_ELEMENT_HANDLING && Tn(w.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (Q.tagNameCheck = w.CUSTOM_ELEMENT_HANDLING.tagNameCheck), w.CUSTOM_ELEMENT_HANDLING && Tn(w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (Q.attributeNameCheck = w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), w.CUSTOM_ELEMENT_HANDLING && typeof w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (Q.allowCustomizedBuiltInElements = w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Ye && (me = !1), Et && (ut = !0), b && (oe = de({}, si), C = [], b.html === !0 && (de(oe, oi), de(C, li)), b.svg === !0 && (de(oe, Yn), de(C, er), de(C, In)), b.svgFilters === !0 && (de(oe, Jn), de(C, er), de(C, In)), b.mathMl === !0 && (de(oe, Qn), de(C, ci), de(C, In))), w.ADD_TAGS && (typeof w.ADD_TAGS == "function" ? J.tagCheck = w.ADD_TAGS : (oe === re && (oe = Mt(oe)), de(oe, w.ADD_TAGS, Ie))), w.ADD_ATTR && (typeof w.ADD_ATTR == "function" ? J.attributeCheck = w.ADD_ATTR : (C === he && (C = Mt(C)), de(C, w.ADD_ATTR, Ie))), w.ADD_URI_SAFE_ATTR && de(Ee, w.ADD_URI_SAFE_ATTR, Ie), w.FORBID_CONTENTS && (_ === B && (_ = Mt(_)), de(_, w.FORBID_CONTENTS, Ie)), _t && (oe["#text"] = !0), Je && de(oe, ["html", "head", "body"]), oe.table && (de(oe, ["tbody"]), delete le.tbody), w.TRUSTED_TYPES_POLICY) {
        if (typeof w.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw on('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof w.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw on('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        P = w.TRUSTED_TYPES_POLICY, N = P.createHTML("");
      } else
        P === void 0 && (P = Cs(g, i)), P !== null && typeof N == "string" && (N = P.createHTML(""));
      Ve && Ve(w), vt = w;
    }
  }, tn = de({}, [...Yn, ...Jn, ...os]), nn = de({}, [...Qn, ...ss]), R = function(w) {
    let O = D(w);
    (!O || !O.tagName) && (O = {
      namespaceURI: Se,
      tagName: "template"
    });
    const V = Ln(w.tagName), ke = Ln(O.tagName);
    return He[w.namespaceURI] ? w.namespaceURI === tt ? O.namespaceURI === ve ? V === "svg" : O.namespaceURI === Oe ? V === "svg" && (ke === "annotation-xml" || $t[ke]) : !!tn[V] : w.namespaceURI === Oe ? O.namespaceURI === ve ? V === "math" : O.namespaceURI === tt ? V === "math" && zt[ke] : !!nn[V] : w.namespaceURI === ve ? O.namespaceURI === tt && !zt[ke] || O.namespaceURI === Oe && !$t[ke] ? !1 : !nn[V] && (wn[V] || !tn[V]) : !!(Nt === "application/xhtml+xml" && He[w.namespaceURI]) : !1;
  }, ue = function(w) {
    rn(t.removed, {
      element: w
    });
    try {
      D(w).removeChild(w);
    } catch {
      M(w);
    }
  }, Ce = function(w, O) {
    try {
      rn(t.removed, {
        attribute: O.getAttributeNode(w),
        from: O
      });
    } catch {
      rn(t.removed, {
        attribute: null,
        from: O
      });
    }
    if (O.removeAttribute(w), w === "is")
      if (ut || Et)
        try {
          ue(O);
        } catch {
        }
      else
        try {
          O.setAttribute(w, "");
        } catch {
        }
  }, be = function(w) {
    let O = null, V = null;
    if (Tt)
      w = "<remove></remove>" + w;
    else {
      const Me = Xn(w, /^[\r\n\t ]+/);
      V = Me && Me[0];
    }
    Nt === "application/xhtml+xml" && Se === ve && (w = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + w + "</body></html>");
    const ke = P ? P.createHTML(w) : w;
    if (Se === ve)
      try {
        O = new m().parseFromString(ke, Nt);
      } catch {
      }
    if (!O || !O.documentElement) {
      O = E.createDocument(Se, "template", null);
      try {
        O.documentElement.innerHTML = je ? N : ke;
      } catch {
      }
    }
    const ze = O.body || O.documentElement;
    return w && V && ze.insertBefore(n.createTextNode(V), ze.childNodes[0] || null), Se === ve ? W.call(O, Je ? "html" : "body")[0] : Je ? O.documentElement : ze;
  }, Lt = function(w) {
    return j.call(
      w.ownerDocument || w,
      w,
      // eslint-disable-next-line no-bitwise
      d.SHOW_ELEMENT | d.SHOW_COMMENT | d.SHOW_TEXT | d.SHOW_PROCESSING_INSTRUCTION | d.SHOW_CDATA_SECTION,
      null
    );
  }, Ut = function(w) {
    return w instanceof f && (typeof w.nodeName != "string" || typeof w.textContent != "string" || typeof w.removeChild != "function" || !(w.attributes instanceof l) || typeof w.removeAttribute != "function" || typeof w.setAttribute != "function" || typeof w.namespaceURI != "string" || typeof w.insertBefore != "function" || typeof w.hasChildNodes != "function");
  }, Zr = function(w) {
    return typeof s == "function" && w instanceof s;
  };
  function It(Y, w, O) {
    vn(Y, (V) => {
      V.call(t, w, O, vt);
    });
  }
  const Kr = function(w) {
    let O = null;
    if (It(Z.beforeSanitizeElements, w, null), Ut(w))
      return ue(w), !0;
    const V = Ie(w.nodeName);
    if (It(Z.uponSanitizeElement, w, {
      tagName: V,
      allowedTags: oe
    }), xt && w.hasChildNodes() && !Zr(w.firstElementChild) && We(/<[/\w!]/g, w.innerHTML) && We(/<[/\w!]/g, w.textContent) || w.nodeType === ln.progressingInstruction || xt && w.nodeType === ln.comment && We(/<[/\w]/g, w.data))
      return ue(w), !0;
    if (!(J.tagCheck instanceof Function && J.tagCheck(V)) && (!oe[V] || le[V])) {
      if (!le[V] && Yr(V) && (Q.tagNameCheck instanceof RegExp && We(Q.tagNameCheck, V) || Q.tagNameCheck instanceof Function && Q.tagNameCheck(V)))
        return !1;
      if (_t && !_[V]) {
        const ke = D(w) || w.parentNode, ze = I(w) || w.childNodes;
        if (ze && ke) {
          const Me = ze.length;
          for (let qe = Me - 1; qe >= 0; --qe) {
            const Rt = x(ze[qe], !0);
            Rt.__removalCount = (w.__removalCount || 0) + 1, ke.insertBefore(Rt, T(w));
          }
        }
      }
      return ue(w), !0;
    }
    return w instanceof c && !R(w) || (V === "noscript" || V === "noembed" || V === "noframes") && We(/<\/no(script|embed|frames)/i, w.innerHTML) ? (ue(w), !0) : (Ye && w.nodeType === ln.text && (O = w.textContent, vn([H, A, F], (ke) => {
      O = an(O, ke, " ");
    }), w.textContent !== O && (rn(t.removed, {
      element: w.cloneNode()
    }), w.textContent = O)), It(Z.afterSanitizeElements, w, null), !1);
  }, Xr = function(w, O, V) {
    if (Ft && (O === "id" || O === "name") && (V in n || V in kn))
      return !1;
    if (!(me && !fe[O] && We(K, O))) {
      if (!(Te && We(se, O))) {
        if (!(J.attributeCheck instanceof Function && J.attributeCheck(O, w))) {
          if (!C[O] || fe[O]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Yr(w) && (Q.tagNameCheck instanceof RegExp && We(Q.tagNameCheck, w) || Q.tagNameCheck instanceof Function && Q.tagNameCheck(w)) && (Q.attributeNameCheck instanceof RegExp && We(Q.attributeNameCheck, O) || Q.attributeNameCheck instanceof Function && Q.attributeNameCheck(O, w)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              O === "is" && Q.allowCustomizedBuiltInElements && (Q.tagNameCheck instanceof RegExp && We(Q.tagNameCheck, V) || Q.tagNameCheck instanceof Function && Q.tagNameCheck(V)))
            ) return !1;
          } else if (!Ee[O]) {
            if (!We(y, an(V, xe, ""))) {
              if (!((O === "src" || O === "xlink:href" || O === "href") && w !== "script" && ns(V, "data:") === 0 && $[w])) {
                if (!(Le && !We(z, an(V, xe, "")))) {
                  if (V)
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
    return w !== "annotation-xml" && Xn(w, _e);
  }, Jr = function(w) {
    It(Z.beforeSanitizeAttributes, w, null);
    const {
      attributes: O
    } = w;
    if (!O || Ut(w))
      return;
    const V = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: C,
      forceKeepAttr: void 0
    };
    let ke = O.length;
    for (; ke--; ) {
      const ze = O[ke], {
        name: Me,
        namespaceURI: qe,
        value: Rt
      } = ze, jt = Ie(Me), qn = Rt;
      let Fe = Me === "value" ? qn : rs(qn);
      if (V.attrName = jt, V.attrValue = Fe, V.keepAttr = !0, V.forceKeepAttr = void 0, It(Z.uponSanitizeAttribute, w, V), Fe = V.attrValue, Ht && (jt === "id" || jt === "name") && (Ce(Me, w), Fe = Vt + Fe), xt && We(/((--!?|])>)|<\/(style|title|textarea)/i, Fe)) {
        Ce(Me, w);
        continue;
      }
      if (jt === "attributename" && Xn(Fe, "href")) {
        Ce(Me, w);
        continue;
      }
      if (V.forceKeepAttr)
        continue;
      if (!V.keepAttr) {
        Ce(Me, w);
        continue;
      }
      if (!ot && We(/\/>/i, Fe)) {
        Ce(Me, w);
        continue;
      }
      Ye && vn([H, A, F], (ei) => {
        Fe = an(Fe, ei, " ");
      });
      const Qr = Ie(w.nodeName);
      if (!Xr(Qr, jt, Fe)) {
        Ce(Me, w);
        continue;
      }
      if (P && typeof g == "object" && typeof g.getAttributeType == "function" && !qe)
        switch (g.getAttributeType(Qr, jt)) {
          case "TrustedHTML": {
            Fe = P.createHTML(Fe);
            break;
          }
          case "TrustedScriptURL": {
            Fe = P.createScriptURL(Fe);
            break;
          }
        }
      if (Fe !== qn)
        try {
          qe ? w.setAttributeNS(qe, Me, Fe) : w.setAttribute(Me, Fe), Ut(w) ? ue(w) : ai(t.removed);
        } catch {
          Ce(Me, w);
        }
    }
    It(Z.afterSanitizeAttributes, w, null);
  }, fo = function Y(w) {
    let O = null;
    const V = Lt(w);
    for (It(Z.beforeSanitizeShadowDOM, w, null); O = V.nextNode(); )
      It(Z.uponSanitizeShadowNode, O, null), Kr(O), Jr(O), O.content instanceof a && Y(O.content);
    It(Z.afterSanitizeShadowDOM, w, null);
  };
  return t.sanitize = function(Y) {
    let w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, O = null, V = null, ke = null, ze = null;
    if (je = !Y, je && (Y = "<!-->"), typeof Y != "string" && !Zr(Y))
      if (typeof Y.toString == "function") {
        if (Y = Y.toString(), typeof Y != "string")
          throw on("dirty is not a string, aborting");
      } else
        throw on("toString is not a function");
    if (!t.isSupported)
      return Y;
    if (kt || En(w), t.removed = [], typeof Y == "string" && (Qe = !1), Qe) {
      if (Y.nodeName) {
        const Rt = Ie(Y.nodeName);
        if (!oe[Rt] || le[Rt])
          throw on("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (Y instanceof s)
      O = be("<!---->"), V = O.ownerDocument.importNode(Y, !0), V.nodeType === ln.element && V.nodeName === "BODY" || V.nodeName === "HTML" ? O = V : O.appendChild(V);
    else {
      if (!ut && !Ye && !Je && // eslint-disable-next-line unicorn/prefer-includes
      Y.indexOf("<") === -1)
        return P && bt ? P.createHTML(Y) : Y;
      if (O = be(Y), !O)
        return ut ? null : bt ? N : "";
    }
    O && Tt && ue(O.firstChild);
    const Me = Lt(Qe ? Y : O);
    for (; ke = Me.nextNode(); )
      Kr(ke), Jr(ke), ke.content instanceof a && fo(ke.content);
    if (Qe)
      return Y;
    if (ut) {
      if (Et)
        for (ze = X.call(O.ownerDocument); O.firstChild; )
          ze.appendChild(O.firstChild);
      else
        ze = O;
      return (C.shadowroot || C.shadowrootmode) && (ze = ne.call(r, ze, !0)), ze;
    }
    let qe = Je ? O.outerHTML : O.innerHTML;
    return Je && oe["!doctype"] && O.ownerDocument && O.ownerDocument.doctype && O.ownerDocument.doctype.name && We(pa, O.ownerDocument.doctype.name) && (qe = "<!DOCTYPE " + O.ownerDocument.doctype.name + `>
` + qe), Ye && vn([H, A, F], (Rt) => {
      qe = an(qe, Rt, " ");
    }), P && bt ? P.createHTML(qe) : qe;
  }, t.setConfig = function() {
    let Y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    En(Y), kt = !0;
  }, t.clearConfig = function() {
    vt = null, kt = !1;
  }, t.isValidAttribute = function(Y, w, O) {
    vt || En({});
    const V = Ie(Y), ke = Ie(w);
    return Xr(V, ke, O);
  }, t.addHook = function(Y, w) {
    typeof w == "function" && rn(Z[Y], w);
  }, t.removeHook = function(Y, w) {
    if (w !== void 0) {
      const O = es(Z[Y], w);
      return O === -1 ? void 0 : ts(Z[Y], O, 1)[0];
    }
    return ai(Z[Y]);
  }, t.removeHooks = function(Y) {
    Z[Y] = [];
  }, t.removeAllHooks = function() {
    Z = di();
  }, t;
}
var ys = fa();
function ws(e) {
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
function Ss(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function hi(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || ws(e));
  } catch {
    return !1;
  }
}
function xs() {
  ys.addHook("beforeSanitizeAttributes", (e) => {
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
xs();
function ks() {
  const [e, t] = pe([]), n = ae(
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
function Ts() {
  const e = ee((I) => I.isStreaming), t = ee((I) => I.setIsStreaming), n = ee((I) => I.isThinking), r = ee((I) => I.setIsThinking), i = ee((I) => I.streamingContent), a = ee((I) => I.setStreamingContent), o = ee((I) => I.isHandlingTool), s = ee((I) => I.setIsHandlingTool), c = ee((I) => I.startStreaming), d = ee((I) => I.stopStreaming), l = ee((I) => I.clearStreamingBuffers), f = ee((I) => I.resetToolHandling), m = Pe(""), g = Ne(() => ({
    get current() {
      return ee.getState().currentAssistantMessageId;
    },
    set current(I) {
      ee.getState().setCurrentAssistantMessageId(I);
    }
  }), []), k = ae((I) => {
    I ? c(I) : (t(!0), r(!0), a("")), m.current = "";
  }, [c, t, r, a]), x = ae(() => {
    d(), m.current = "";
  }, [d]), M = ae(() => {
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
    startStreaming: k,
    stopStreaming: x,
    resetToolHandling: M,
    clearStreamingBuffers: T
  };
}
function Es() {
  const e = Ne(
    () => (i, a) => a === !1 ? De.isErrorMessage(i) ? Ue.ERROR : Ue.COMPLETED : De.isCompletedMessage(i) ? Ue.COMPLETED : De.isErrorMessage(i) ? Ue.ERROR : Ue.PROCESSING,
    []
  ), t = Ne(
    () => (i) => De.extractDuration(i),
    []
  ), n = Ne(
    () => (i) => De.cleanReasoningContent(i),
    []
  ), r = Ne(
    () => (i, a) => {
      switch (De.getMessageType(
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
function bs() {
  const e = Ne(
    () => (n, r) => r === !1 ? n.includes(te.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : n.includes(te.COMPLETED_MARKER) || n.includes("✅") ? "Tool Completed" : n.includes(te.ERROR_MARKER) ? "Tool Error" : (n.includes(te.HANDLING_MARKER), "Tool Processing..."),
    []
  ), t = Ne(
    () => (n, r) => r === !1 ? n.includes(te.ERROR_MARKER) ? Ue.ERROR : Ue.COMPLETED : n.includes(te.COMPLETED_MARKER) || n.includes("✅") ? Ue.COMPLETED : n.includes(te.ERROR_MARKER) ? Ue.ERROR : Ue.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: t
  };
}
function _s({
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
  const m = Pe(/* @__PURE__ */ new Map()), g = Pe(/* @__PURE__ */ new Map()), k = ae(() => {
    if (c.current && d.current) {
      const P = Fn(
        d.current,
        !0
      );
      return n(
        c.current,
        P,
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
    (P) => {
      const N = Fn(P, !0);
      if (c.current)
        d.current += N, o(d.current), n(
          c.current,
          d.current,
          !0
        );
      else {
        i(!1);
        const E = r();
        c.current = E, d.current = N, o(N);
        const j = {
          id: E,
          role: "assistant",
          content: N,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        e((X) => [...X, j]);
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
  ), M = ae(
    (P, N, E) => {
      const { callId: j } = E || {};
      if (s(P), !j) return;
      const X = De.isThinkingMessage(N) && !N.includes("for") && !N.includes("seconds"), W = De.isThinkingMessage(N) && N.includes("for") && N.includes("seconds"), ne = De.isHandlingMessage(N), Z = De.isCompletedMessage(N), H = De.isErrorMessage(N);
      if (X || W) {
        const F = m.current.get(j);
        if (X && !F) {
          k();
          const K = r();
          m.current.set(j, K);
          const se = {
            id: K,
            role: "reasoning",
            content: N,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          e((z) => [...z, se]);
        } else W && F ? (n(F, N, !1), m.current.delete(j)) : F && X && n(F, N, !0);
      }
      const A = g.current.get(j);
      if (ne && !A) {
        k();
        const F = N.match(
          te.PATTERNS.HANDLING_TOOL
        ), K = F ? F[1] : "Unknown Tool", se = r();
        g.current.set(j, se);
        const z = {
          id: se,
          role: "tooling",
          content: N,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...E,
            toolName: K,
            callId: j,
            status: Ue.PROCESSING
          }
        };
        e((xe) => [...xe, z]);
      } else if ((Z || H) && A) {
        const F = N.match(
          te.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), K = F ? F[1] : "Unknown Tool";
        e(
          (se) => se.map(
            (z) => z.id === A ? {
              ...z,
              content: N,
              isStreaming: !1,
              toolData: {
                ...z.toolData,
                toolName: K,
                status: H ? Ue.ERROR : Ue.COMPLETED,
                callId: j ?? ""
              }
            } : z
          )
        ), g.current.delete(j);
      } else A && P && !Z && !H && n(A, N, !0);
    },
    [
      s,
      k,
      r,
      e,
      n
    ]
  ), T = ae(() => {
    a(!1), i(!1), k();
  }, [a, i, k]), I = ae(
    (P) => {
      console.error("Chat error:", P), a(!1), i(!1), k(), t("system", `❌ Chat error: ${P}`);
    },
    [
      a,
      i,
      k,
      t
    ]
  ), D = ae(() => {
    a(!1), i(!1), l(), f();
  }, [
    a,
    i,
    l,
    f
  ]);
  return {
    handleSetMessage: x,
    handleReasoningUpdate: M,
    handleChatFinished: T,
    handleChatError: I,
    stopGeneration: D,
    finalizeCurrentStreamingMessage: k
  };
}
function vs() {
  const e = ks(), t = Ts(), n = Es(), r = bs(), i = _s({
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
function fh({ initialMode: e = "sidebar" }) {
  const t = ee();
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
function Is({
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
  metadata: f
}) {
  const m = Pe(!1), g = async () => {
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
    if (!m.current && !(a.length > 0))
      try {
        s(!0), c(null), console.log("useConversationLoader: Fetching messages for entityId:", e, "entityType:", t);
        const x = await ko(
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
        console.log(`useConversationLoader: Loaded ${x.messages.length} messages`), o(x.messages), x.threadId && (console.log("useConversationLoader: Setting threadId from response:", x.threadId), d(x.threadId)), x.providerResId && (console.log("useConversationLoader: Setting providerResId:", x.providerResId), l(x.providerResId)), m.current = !0;
      } catch (x) {
        const M = Jt(x, "ConversationLoader");
        c(
          x instanceof Error ? x.message : "Failed to load conversation"
        ), m.current = !0, M.isRetryable || console.warn(`[ConversationLoader] Will not retry conversation loading: ${M.reason}`);
      } finally {
        s(!1);
      }
  };
  return Re(() => {
    g();
  }, [
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
    hasLoadedConversationRef: m,
    resetConversationLoader: () => {
      console.log("useConversationLoader: Resetting loader state"), m.current = !1;
    },
    reloadConversation: g
  };
}
function Rs({
  metadata: e,
  chatClient: t,
  currentProviderResId: n,
  isLoadingConversation: r,
  messages: i = [],
  entityId: a,
  entityType: o
}) {
  const s = Pe(void 0), c = Pe(!1);
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
function Ms() {
  const [e, t] = pe(navigator.onLine), [n, r] = pe(!1);
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
class As {
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
class Ns {
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
const Ls = {
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
}, Os = {
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
}, Ct = {
  state: Ls,
  url: ga,
  validation: Os,
  css: ma,
  error: Ca
};
class pi extends Ar {
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
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ u("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ v("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ u("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ u("p", { className: "chat-wrapper__error-message", children: Ct.error.getUserFriendlyErrorMessage(r) }),
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
      })() && /* @__PURE__ */ v("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ u("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ u("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : i;
  }
}
class Ds extends Ar {
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
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || Ct.error.isNetworkError(r)) ? /* @__PURE__ */ u("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ v("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ u("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ u("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ v("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ u("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ u("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ v(wt, { children: [
        this.retryCount < o && /* @__PURE__ */ v(
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
      })() && /* @__PURE__ */ v("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ u("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ u("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
}
class Ps extends Ar {
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
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ u("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ v("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ u("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ u("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ v("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ u("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ u("ul", { className: "chat-wrapper__failed-files-list", children: i.map((c, d) => /* @__PURE__ */ u("li", { className: "chat-wrapper__failed-file", children: c }, d)) })
      ] }),
      /* @__PURE__ */ v("div", { className: "chat-wrapper__error-actions", children: [
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
      })() && /* @__PURE__ */ v("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ u("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ u("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
  getFileUploadErrorMessage(n) {
    return n.message.includes("size") || n.message.includes("large") ? "File size is too large. Please try with smaller files." : n.message.includes("type") || n.message.includes("format") ? "File type is not supported. Please try with different file types." : n.message.includes("network") || n.message.includes("connection") ? "Network error during upload. Please check your connection and try again." : n.message.includes("timeout") ? "Upload timed out. Please try again with smaller files or better connection." : "Failed to upload files. Please try again.";
  }
}
const Fs = ({
  className: e,
  onClick: t,
  size: n = 24,
  color: r = "currentColor"
}) => /* @__PURE__ */ v(
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
), Hs = ({
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
), zs = ({
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
), Us = ({
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
), Bs = ({
  className: e,
  onClick: t,
  size: n = 18,
  color: r = "currentColor"
}) => /* @__PURE__ */ v(
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
), Ws = ({
  mode: e,
  headerName: t,
  bubbleText: n,
  showBubbleText: r = !0,
  onClick: i
}) => {
  const a = e === "modal" ? `Open ${t}` : `Expand ${t}`;
  return /* @__PURE__ */ v(
    "button",
    {
      className: "chat-wrapper__bubble-button",
      onClick: i,
      title: a,
      children: [
        /* @__PURE__ */ u(Fs, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ u("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, Gs = ({
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
      children: /* @__PURE__ */ u(Hs, { size: 20 })
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
          children: /* @__PURE__ */ u(zs, { size: 20, isFullscreen: g })
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
      children: /* @__PURE__ */ u(Us, { size: 20 })
    }
  ) : null;
  return /* @__PURE__ */ v("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ u("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ u("h2", { className: "chat-wrapper__title", children: e }) }),
    /* @__PURE__ */ v("div", { className: "chat-wrapper__header-controls", children: [
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
class Vs extends Error {
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
function S(e, t) {
  wa(
    !!e,
    !1,
    !0,
    "ok",
    "Expected value to be truthy",
    t
  );
}
function yr(e) {
  wa(!1, !1, !0, "ok", "Unreachable", e);
}
function wa(e, t, n, r, i, a) {
  if (!e)
    throw a instanceof Error ? a : new Vs(
      a || i,
      t,
      n,
      r,
      !a
    );
}
function $s(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const js = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, qs = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Zs = {};
function fi(e, t) {
  return (Zs.jsx ? qs : js).test(e);
}
const Ks = /[ \t\n\f\r]/g;
function Xs(e) {
  return typeof e == "object" ? e.type === "text" ? gi(e.value) : !1 : gi(e);
}
function gi(e) {
  return e.replace(Ks, "") === "";
}
class mn {
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
mn.prototype.normal = {};
mn.prototype.property = {};
mn.prototype.space = void 0;
function Sa(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new mn(n, r, t);
}
function wr(e) {
  return e.toLowerCase();
}
class Xe {
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
Xe.prototype.attribute = "";
Xe.prototype.booleanish = !1;
Xe.prototype.boolean = !1;
Xe.prototype.commaOrSpaceSeparated = !1;
Xe.prototype.commaSeparated = !1;
Xe.prototype.defined = !1;
Xe.prototype.mustUseProperty = !1;
Xe.prototype.number = !1;
Xe.prototype.overloadedBoolean = !1;
Xe.prototype.property = "";
Xe.prototype.spaceSeparated = !1;
Xe.prototype.space = void 0;
let Ys = 0;
const ie = Gt(), Ae = Gt(), Sr = Gt(), L = Gt(), ye = Gt(), Xt = Gt(), nt = Gt();
function Gt() {
  return 2 ** ++Ys;
}
const xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: ie,
  booleanish: Ae,
  commaOrSpaceSeparated: nt,
  commaSeparated: Xt,
  number: L,
  overloadedBoolean: Sr,
  spaceSeparated: ye
}, Symbol.toStringTag, { value: "Module" })), tr = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(xr)
);
class Nr extends Xe {
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
      for (; ++a < tr.length; ) {
        const o = tr[a];
        mi(this, tr[a], (r & xr[o]) === xr[o]);
      }
  }
}
Nr.prototype.defined = !0;
function mi(e, t, n) {
  n && (e[t] = n);
}
function Qt(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new Nr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[wr(r)] = r, n[wr(a.attribute)] = r;
  }
  return new mn(t, n, e.space);
}
const xa = Qt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Ae,
    ariaAutoComplete: null,
    ariaBusy: Ae,
    ariaChecked: Ae,
    ariaColCount: L,
    ariaColIndex: L,
    ariaColSpan: L,
    ariaControls: ye,
    ariaCurrent: null,
    ariaDescribedBy: ye,
    ariaDetails: null,
    ariaDisabled: Ae,
    ariaDropEffect: ye,
    ariaErrorMessage: null,
    ariaExpanded: Ae,
    ariaFlowTo: ye,
    ariaGrabbed: Ae,
    ariaHasPopup: null,
    ariaHidden: Ae,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: ye,
    ariaLevel: L,
    ariaLive: null,
    ariaModal: Ae,
    ariaMultiLine: Ae,
    ariaMultiSelectable: Ae,
    ariaOrientation: null,
    ariaOwns: ye,
    ariaPlaceholder: null,
    ariaPosInSet: L,
    ariaPressed: Ae,
    ariaReadOnly: Ae,
    ariaRelevant: null,
    ariaRequired: Ae,
    ariaRoleDescription: ye,
    ariaRowCount: L,
    ariaRowIndex: L,
    ariaRowSpan: L,
    ariaSelected: Ae,
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
function ka(e, t) {
  return t in e ? e[t] : t;
}
function Ta(e, t) {
  return ka(e, t.toLowerCase());
}
const Js = Qt({
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
    accept: Xt,
    acceptCharset: ye,
    accessKey: ye,
    action: null,
    allow: null,
    allowFullScreen: ie,
    allowPaymentRequest: ie,
    allowUserMedia: ie,
    alt: null,
    as: null,
    async: ie,
    autoCapitalize: null,
    autoComplete: ye,
    autoFocus: ie,
    autoPlay: ie,
    blocking: ye,
    capture: null,
    charSet: null,
    checked: ie,
    cite: null,
    className: ye,
    cols: L,
    colSpan: null,
    content: null,
    contentEditable: Ae,
    controls: ie,
    controlsList: ye,
    coords: L | Xt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: ie,
    defer: ie,
    dir: null,
    dirName: null,
    disabled: ie,
    download: Sr,
    draggable: Ae,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: ie,
    formTarget: null,
    headers: ye,
    height: L,
    hidden: Sr,
    high: L,
    href: null,
    hrefLang: null,
    htmlFor: ye,
    httpEquiv: ye,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: ie,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: ie,
    itemId: null,
    itemProp: ye,
    itemRef: ye,
    itemScope: ie,
    itemType: ye,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: ie,
    low: L,
    manifest: null,
    max: null,
    maxLength: L,
    media: null,
    method: null,
    min: null,
    minLength: L,
    multiple: ie,
    muted: ie,
    name: null,
    nonce: null,
    noModule: ie,
    noValidate: ie,
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
    open: ie,
    optimum: L,
    pattern: null,
    ping: ye,
    placeholder: null,
    playsInline: ie,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: ie,
    referrerPolicy: null,
    rel: ye,
    required: ie,
    reversed: ie,
    rows: L,
    rowSpan: L,
    sandbox: ye,
    scope: null,
    scoped: ie,
    seamless: ie,
    selected: ie,
    shadowRootClonable: ie,
    shadowRootDelegatesFocus: ie,
    shadowRootMode: null,
    shape: null,
    size: L,
    sizes: null,
    slot: null,
    span: L,
    spellCheck: Ae,
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
    typeMustMatch: ie,
    useMap: null,
    value: Ae,
    width: L,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: ye,
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
    compact: ie,
    // Lists. Use CSS to reduce space between items instead
    declare: ie,
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
    noResize: ie,
    // `<frame>`
    noHref: ie,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: ie,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: ie,
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
    scrolling: Ae,
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
    disablePictureInPicture: ie,
    disableRemotePlayback: ie,
    prefix: null,
    property: null,
    results: L,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Ta
}), Qs = Qt({
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
    about: nt,
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
    className: ye,
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
    download: ie,
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
    g1: Xt,
    g2: Xt,
    glyphName: Xt,
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
    kernelMatrix: nt,
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
    ping: ye,
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
    property: nt,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: nt,
    rev: nt,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: nt,
    requiredFeatures: nt,
    requiredFonts: nt,
    requiredFormats: nt,
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
    strokeDashArray: nt,
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
    systemLanguage: nt,
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
    typeOf: nt,
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
  transform: ka
}), Ea = Qt({
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
}), ba = Qt({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Ta
}), _a = Qt({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), el = {
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
}, tl = /[A-Z]/g, Ci = /-[a-z]/g, nl = /^data[-\w.:]+$/i;
function rl(e, t) {
  const n = wr(t);
  let r = t, i = Xe;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && nl.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(Ci, al);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!Ci.test(a)) {
        let o = a.replace(tl, il);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    i = Nr;
  }
  return new i(r, t);
}
function il(e) {
  return "-" + e.toLowerCase();
}
function al(e) {
  return e.charAt(1).toUpperCase();
}
const ol = Sa([xa, Js, Ea, ba, _a], "html"), Lr = Sa([xa, Qs, Ea, ba, _a], "svg");
function sl(e) {
  return e.join(" ").trim();
}
var Hn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Or(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Dr = {}, yi = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, ll = /\n/g, cl = /^\s*/, ul = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, dl = /^:\s*/, hl = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, pl = /^[;\s]*/, fl = /^\s+|\s+$/g, gl = `
`, wi = "/", Si = "*", Wt = "", ml = "comment", Cl = "declaration", yl = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(k) {
    var x = k.match(ll);
    x && (n += x.length);
    var M = k.lastIndexOf(gl);
    r = ~M ? k.length - M : r + k.length;
  }
  function a() {
    var k = { line: n, column: r };
    return function(x) {
      return x.position = new o(k), d(), x;
    };
  }
  function o(k) {
    this.start = k, this.end = { line: n, column: r }, this.source = t.source;
  }
  o.prototype.content = e;
  function s(k) {
    var x = new Error(
      t.source + ":" + n + ":" + r + ": " + k
    );
    if (x.reason = k, x.filename = t.source, x.line = n, x.column = r, x.source = e, !t.silent) throw x;
  }
  function c(k) {
    var x = k.exec(e);
    if (x) {
      var M = x[0];
      return i(M), e = e.slice(M.length), x;
    }
  }
  function d() {
    c(cl);
  }
  function l(k) {
    var x;
    for (k = k || []; x = f(); )
      x !== !1 && k.push(x);
    return k;
  }
  function f() {
    var k = a();
    if (!(wi != e.charAt(0) || Si != e.charAt(1))) {
      for (var x = 2; Wt != e.charAt(x) && (Si != e.charAt(x) || wi != e.charAt(x + 1)); )
        ++x;
      if (x += 2, Wt === e.charAt(x - 1))
        return s("End of comment missing");
      var M = e.slice(2, x - 2);
      return r += 2, i(M), e = e.slice(x), r += 2, k({
        type: ml,
        comment: M
      });
    }
  }
  function m() {
    var k = a(), x = c(ul);
    if (x) {
      if (f(), !c(dl)) return s("property missing ':'");
      var M = c(hl), T = k({
        type: Cl,
        property: xi(x[0].replace(yi, Wt)),
        value: M ? xi(M[0].replace(yi, Wt)) : Wt
      });
      return c(pl), T;
    }
  }
  function g() {
    var k = [];
    l(k);
    for (var x; x = m(); )
      x !== !1 && (k.push(x), l(k));
    return k;
  }
  return d(), g();
};
function xi(e) {
  return e ? e.replace(fl, Wt) : Wt;
}
var wl = Hn && Hn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.default = xl;
var Sl = wl(yl);
function xl(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, Sl.default)(e), i = typeof t == "function";
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
var kl = /^--[a-zA-Z0-9_-]+$/, Tl = /-([a-z])/g, El = /^[^-]+$/, bl = /^-(webkit|moz|ms|o|khtml)-/, _l = /^-(ms)-/, vl = function(e) {
  return !e || El.test(e) || kl.test(e);
}, Il = function(e, t) {
  return t.toUpperCase();
}, ki = function(e, t) {
  return "".concat(t, "-");
}, Rl = function(e, t) {
  return t === void 0 && (t = {}), vl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(_l, ki) : e = e.replace(bl, ki), e.replace(Tl, Il));
};
Wn.camelCase = Rl;
var Ml = Hn && Hn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, Al = Ml(Dr), Nl = Wn;
function kr(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, Al.default)(e, function(r, i) {
    r && i && (n[(0, Nl.camelCase)(r, t)] = i);
  }), n;
}
kr.default = kr;
var Ll = kr;
const Ol = /* @__PURE__ */ Or(Ll), va = Ia("end"), Pr = Ia("start");
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
function Dl(e) {
  const t = Pr(e), n = va(e);
  if (t && n)
    return { start: t, end: n };
}
function dn(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Ti(e.position) : "start" in e || "end" in e ? Ti(e) : "line" in e || "column" in e ? Tr(e) : "";
}
function Tr(e) {
  return Ei(e && e.line) + ":" + Ei(e && e.column);
}
function Ti(e) {
  return Tr(e && e.start) + "-" + Tr(e && e.end);
}
function Ei(e) {
  return e && typeof e == "number" ? e : 1;
}
class Be extends Error {
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
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = s ? s.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = s ? s.line : void 0, this.name = dn(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = o && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Be.prototype.file = "";
Be.prototype.name = "";
Be.prototype.reason = "";
Be.prototype.message = "";
Be.prototype.stack = "";
Be.prototype.column = void 0;
Be.prototype.line = void 0;
Be.prototype.ancestors = void 0;
Be.prototype.cause = void 0;
Be.prototype.fatal = void 0;
Be.prototype.place = void 0;
Be.prototype.ruleId = void 0;
Be.prototype.source = void 0;
const Fr = {}.hasOwnProperty, Pl = /* @__PURE__ */ new Map(), Fl = /[A-Z]/g, Hl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), zl = /* @__PURE__ */ new Set(["td", "th"]), Ra = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Ul(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Zl(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = ql(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? Lr : ol,
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
    return Bl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return Wl(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return Vl(e, t, n);
  if (t.type === "mdxjsEsm")
    return Gl(e, t);
  if (t.type === "root")
    return $l(e, t, n);
  if (t.type === "text")
    return jl(e, t);
}
function Bl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Lr, e.schema = i), e.ancestors.push(t);
  const a = Na(e, t.tagName, !1), o = Kl(e, t);
  let s = zr(e, t);
  return Hl.has(t.tagName) && (s = s.filter(function(c) {
    return typeof c == "string" ? !Xs(c) : !0;
  })), Aa(e, o, a, t), Hr(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function Wl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return S(r.type === "ExpressionStatement"), /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  gn(e, t.position);
}
function Gl(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  gn(e, t.position);
}
function Vl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = Lr, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : Na(e, t.name, !0), o = Xl(e, t), s = zr(e, t);
  return Aa(e, o, a, t), Hr(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function $l(e, t, n) {
  const r = {};
  return Hr(r, zr(e, t)), e.create(t, e.Fragment, r, n);
}
function jl(e, t) {
  return t.value;
}
function Aa(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function Hr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function ql(e, t, n) {
  return r;
  function r(i, a, o, s) {
    const d = Array.isArray(o.children) ? n : t;
    return s ? d(a, o, s) : d(a, o);
  }
}
function Zl(e, t) {
  return n;
  function n(r, i, a, o) {
    const s = Array.isArray(a.children), c = Pr(r);
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
function Kl(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && Fr.call(t.properties, i)) {
      const a = Yl(e, i, t.properties[i]);
      if (a) {
        const [o, s] = a;
        e.tableCellAlignToStyle && o === "align" && typeof s == "string" && zl.has(t.tagName) ? r = s : n[o] = s;
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
function Xl(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const a = r.data.estree.body[0];
        S(a.type === "ExpressionStatement");
        const o = a.expression;
        S(o.type === "ObjectExpression");
        const s = o.properties[0];
        S(s.type === "SpreadElement"), Object.assign(
          n,
          e.evaluater.evaluateExpression(s.argument)
        );
      } else
        gn(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const s = r.value.data.estree.body[0];
          S(s.type === "ExpressionStatement"), a = e.evaluater.evaluateExpression(s.expression);
        } else
          gn(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function zr(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Pl;
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
function Yl(e, t, n) {
  const r = rl(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? $s(n) : sl(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Jl(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Ql(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? el[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Jl(e, t) {
  try {
    return Ol(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new Be("Cannot parse `style` attribute", {
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
    S(o, "always a result"), r = o;
  } else
    r = fi(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return Fr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  gn(e);
}
function gn(e, t) {
  const n = new Be(
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
function Ql(e) {
  const t = {};
  let n;
  for (n in e)
    Fr.call(e, n) && (t[ec(n)] = e[n]);
  return t;
}
function ec(e) {
  let t = e.replace(Fl, tc);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function tc(e) {
  return "-" + e.toLowerCase();
}
const nr = {
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
}, nc = {};
function rc(e, t) {
  const n = nc, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return La(e, r, i);
}
function La(e, t, n) {
  if (ic(e)) {
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
    r[i] = La(e[i], t, n);
  return r.join("");
}
function ic(e) {
  return !!(e && typeof e == "object");
}
const _i = document.createElement("i");
function Ur(e) {
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
), gt = (
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
function St(e, t, n, r) {
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
function lt(e, t) {
  return e.length > 0 ? (St(e, e.length, 0, t), e) : t;
}
const vi = {}.hasOwnProperty;
function ac(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    oc(t, e[n]);
  return t;
}
function oc(e, t) {
  let n;
  for (n in t) {
    const i = (vi.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let o;
    if (a)
      for (o in a) {
        vi.call(i, o) || (i[o] = []);
        const s = a[o];
        sc(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(s) ? s : s ? [s] : []
        );
      }
  }
}
function sc(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  St(e, 0, 0, r);
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
    n > 1114111 ? gt.replacementCharacter : String.fromCodePoint(n)
  );
}
function Yt(e) {
  return e.replace(/[\t\n\r ]+/g, gt.space).replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const yt = Pt(/[A-Za-z]/), at = Pt(/[\dA-Za-z]/), lc = Pt(/[#-'*+\--9=?A-Z^-~]/);
function Er(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < p.space || e === p.del)
  );
}
const br = Pt(/\d/), cc = Pt(/[\dA-Fa-f]/), uc = Pt(/[!-/:-@[-`{-~]/);
function G(e) {
  return e !== null && e < p.horizontalTab;
}
function Ke(e) {
  return e !== null && (e < p.nul || e === p.space);
}
function ge(e) {
  return e === p.horizontalTab || e === p.virtualSpace || e === p.space;
}
const dc = Pt(new RegExp("\\p{P}|\\p{S}", "u")), hc = Pt(/\s/);
function Pt(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function en(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let o = "";
    if (a === p.percentSign && at(e.charCodeAt(n + 1)) && at(e.charCodeAt(n + 2)))
      i = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (o = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const s = e.charCodeAt(n + 1);
      a < 56320 && s > 56319 && s < 57344 ? (o = String.fromCharCode(a, s), i = 1) : o = gt.replacementCharacter;
    } else
      o = String.fromCharCode(a);
    o && (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, o = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function we(e, t, n, r) {
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
const pc = { tokenize: fc };
function fc(e) {
  const t = e.attempt(
    this.parser.constructs.contentInitial,
    r,
    i
  );
  let n;
  return t;
  function r(s) {
    if (S(
      s === p.eof || G(s),
      "expected eol or eof"
    ), s === p.eof) {
      e.consume(s);
      return;
    }
    return e.enter(h.lineEnding), e.consume(s), e.exit(h.lineEnding), we(e, t, h.linePrefix);
  }
  function i(s) {
    return S(
      s !== p.eof && !G(s),
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
    return G(s) ? (e.consume(s), e.exit(h.chunkText), a) : (e.consume(s), o);
  }
}
const gc = { tokenize: mc }, Ii = { tokenize: Cc };
function mc(e) {
  const t = this, n = [];
  let r = 0, i, a, o;
  return s;
  function s(D) {
    if (r < n.length) {
      const P = n[r];
      return t.containerState = P[1], S(
        P[0].continuation,
        "expected `continuation` to be defined on container construct"
      ), e.attempt(
        P[0].continuation,
        c,
        d
      )(D);
    }
    return d(D);
  }
  function c(D) {
    if (S(
      t.containerState,
      "expected `containerState` to be defined after continuation"
    ), r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && I();
      const P = t.events.length;
      let N = P, E;
      for (; N--; )
        if (t.events[N][0] === "exit" && t.events[N][1].type === h.chunkFlow) {
          E = t.events[N][1].end;
          break;
        }
      S(E, "could not find previous flow chunk"), T(r);
      let j = P;
      for (; j < t.events.length; )
        t.events[j][1].end = { ...E }, j++;
      return St(
        t.events,
        N + 1,
        0,
        t.events.slice(P)
      ), t.events.length = j, d(D);
    }
    return s(D);
  }
  function d(D) {
    if (r === n.length) {
      if (!i)
        return m(D);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return k(D);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(
      Ii,
      l,
      f
    )(D);
  }
  function l(D) {
    return i && I(), T(r), m(D);
  }
  function f(D) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, k(D);
  }
  function m(D) {
    return t.containerState = {}, e.attempt(
      Ii,
      g,
      k
    )(D);
  }
  function g(D) {
    return S(
      t.currentConstruct,
      "expected `currentConstruct` to be defined on tokenizer"
    ), S(
      t.containerState,
      "expected `containerState` to be defined on tokenizer"
    ), r++, n.push([t.currentConstruct, t.containerState]), m(D);
  }
  function k(D) {
    if (D === p.eof) {
      i && I(), T(0), e.consume(D);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter(h.chunkFlow, {
      _tokenizer: i,
      contentType: U.contentTypeFlow,
      previous: a
    }), x(D);
  }
  function x(D) {
    if (D === p.eof) {
      M(e.exit(h.chunkFlow), !0), T(0), e.consume(D);
      return;
    }
    return G(D) ? (e.consume(D), M(e.exit(h.chunkFlow)), r = 0, t.interrupt = void 0, s) : (e.consume(D), x);
  }
  function M(D, P) {
    S(i, "expected `childFlow` to be defined when continuing");
    const N = t.sliceStream(D);
    if (P && N.push(null), D.previous = a, a && (a.next = D), a = D, i.defineSkip(D.start), i.write(N), t.parser.lazy[D.start.line]) {
      let E = i.events.length;
      for (; E--; )
        if (
          // The token starts before the line ending…
          i.events[E][1].start.offset < o && // …and either is not ended yet…
          (!i.events[E][1].end || // …or ends after it.
          i.events[E][1].end.offset > o)
        )
          return;
      const j = t.events.length;
      let X = j, W, ne;
      for (; X--; )
        if (t.events[X][0] === "exit" && t.events[X][1].type === h.chunkFlow) {
          if (W) {
            ne = t.events[X][1].end;
            break;
          }
          W = !0;
        }
      for (S(ne, "could not find previous flow chunk"), T(r), E = j; E < t.events.length; )
        t.events[E][1].end = { ...ne }, E++;
      St(
        t.events,
        X + 1,
        0,
        t.events.slice(j)
      ), t.events.length = E;
    }
  }
  function T(D) {
    let P = n.length;
    for (; P-- > D; ) {
      const N = n[P];
      t.containerState = N[1], S(
        N[0].exit,
        "expected `exit` to be defined on container construct"
      ), N[0].exit.call(t, e);
    }
    n.length = D;
  }
  function I() {
    S(
      t.containerState,
      "expected `containerState` to be defined when closing flow"
    ), S(i, "expected `childFlow` to be defined when closing it"), i.write([p.eof]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Cc(e, t, n) {
  return S(
    this.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), we(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    h.linePrefix,
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize
  );
}
function Ri(e) {
  if (e === p.eof || Ke(e) || hc(e))
    return U.characterGroupWhitespace;
  if (dc(e))
    return U.characterGroupPunctuation;
}
function Br(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const _r = {
  name: "attention",
  resolveAll: yc,
  tokenize: wc
};
function yc(e, t) {
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
          }, e[r][1].end = { ...o.start }, e[n][1].start = { ...s.end }, d = [], e[r][1].end.offset - e[r][1].start.offset && (d = lt(d, [
            ["enter", e[r][1], t],
            ["exit", e[r][1], t]
          ])), d = lt(d, [
            ["enter", i, t],
            ["enter", o, t],
            ["exit", o, t],
            ["enter", a, t]
          ]), S(
            t.parser.constructs.insideSpan.null,
            "expected `insideSpan` to be populated"
          ), d = lt(
            d,
            Br(
              t.parser.constructs.insideSpan.null,
              e.slice(r + 1, n),
              t
            )
          ), d = lt(d, [
            ["exit", a, t],
            ["enter", s, t],
            ["exit", s, t],
            ["exit", i, t]
          ]), e[n][1].end.offset - e[n][1].start.offset ? (l = 2, d = lt(d, [
            ["enter", e[n][1], t],
            ["exit", e[n][1], t]
          ])) : l = 0, St(e, r - 1, n - r + 3, d), n = r + d.length - l - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function wc(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Ri(r);
  let a;
  return o;
  function o(c) {
    return S(
      c === p.asterisk || c === p.underscore,
      "expected asterisk or underscore"
    ), a = c, e.enter("attentionSequence"), s(c);
  }
  function s(c) {
    if (c === a)
      return e.consume(c), s;
    const d = e.exit("attentionSequence"), l = Ri(c);
    S(n, "expected `attentionMarkers` to be populated");
    const f = !l || l === U.characterGroupPunctuation && i || n.includes(c), m = !i || i === U.characterGroupPunctuation && l || n.includes(r);
    return d._open = !!(a === p.asterisk ? f : f && (i || !m)), d._close = !!(a === p.asterisk ? m : m && (l || !f)), t(c);
  }
}
function Mi(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const Sc = { name: "autolink", tokenize: xc };
function xc(e, t, n) {
  let r = 0;
  return i;
  function i(g) {
    return S(g === p.lessThan, "expected `<`"), e.enter(h.autolink), e.enter(h.autolinkMarker), e.consume(g), e.exit(h.autolinkMarker), e.enter(h.autolinkProtocol), a;
  }
  function a(g) {
    return yt(g) ? (e.consume(g), o) : g === p.atSign ? n(g) : d(g);
  }
  function o(g) {
    return g === p.plusSign || g === p.dash || g === p.dot || at(g) ? (r = 1, s(g)) : d(g);
  }
  function s(g) {
    return g === p.colon ? (e.consume(g), r = 0, c) : (g === p.plusSign || g === p.dash || g === p.dot || at(g)) && r++ < U.autolinkSchemeSizeMax ? (e.consume(g), s) : (r = 0, d(g));
  }
  function c(g) {
    return g === p.greaterThan ? (e.exit(h.autolinkProtocol), e.enter(h.autolinkMarker), e.consume(g), e.exit(h.autolinkMarker), e.exit(h.autolink), t) : g === p.eof || g === p.space || g === p.lessThan || Er(g) ? n(g) : (e.consume(g), c);
  }
  function d(g) {
    return g === p.atSign ? (e.consume(g), l) : lc(g) ? (e.consume(g), d) : n(g);
  }
  function l(g) {
    return at(g) ? f(g) : n(g);
  }
  function f(g) {
    return g === p.dot ? (e.consume(g), r = 0, l) : g === p.greaterThan ? (e.exit(h.autolinkProtocol).type = h.autolinkEmail, e.enter(h.autolinkMarker), e.consume(g), e.exit(h.autolinkMarker), e.exit(h.autolink), t) : m(g);
  }
  function m(g) {
    if ((g === p.dash || at(g)) && r++ < U.autolinkDomainSizeMax) {
      const k = g === p.dash ? m : f;
      return e.consume(g), k;
    }
    return n(g);
  }
}
const Gn = { partial: !0, tokenize: kc };
function kc(e, t, n) {
  return r;
  function r(a) {
    return ge(a) ? we(e, i, h.linePrefix)(a) : i(a);
  }
  function i(a) {
    return a === p.eof || G(a) ? t(a) : n(a);
  }
}
const Da = {
  continuation: { tokenize: Ec },
  exit: bc,
  name: "blockQuote",
  tokenize: Tc
};
function Tc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    if (o === p.greaterThan) {
      const s = r.containerState;
      return S(s, "expected `containerState` to be defined in container"), s.open || (e.enter(h.blockQuote, { _container: !0 }), s.open = !0), e.enter(h.blockQuotePrefix), e.enter(h.blockQuoteMarker), e.consume(o), e.exit(h.blockQuoteMarker), a;
    }
    return n(o);
  }
  function a(o) {
    return ge(o) ? (e.enter(h.blockQuotePrefixWhitespace), e.consume(o), e.exit(h.blockQuotePrefixWhitespace), e.exit(h.blockQuotePrefix), t) : (e.exit(h.blockQuotePrefix), t(o));
  }
}
function Ec(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return ge(o) ? (S(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), we(
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
function bc(e) {
  e.exit(h.blockQuote);
}
const Pa = {
  name: "characterEscape",
  tokenize: _c
};
function _c(e, t, n) {
  return r;
  function r(a) {
    return S(a === p.backslash, "expected `\\`"), e.enter(h.characterEscape), e.enter(h.escapeMarker), e.consume(a), e.exit(h.escapeMarker), i;
  }
  function i(a) {
    return uc(a) ? (e.enter(h.characterEscapeValue), e.consume(a), e.exit(h.characterEscapeValue), e.exit(h.characterEscape), t) : n(a);
  }
}
const Fa = {
  name: "characterReference",
  tokenize: vc
};
function vc(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return s;
  function s(f) {
    return S(f === p.ampersand, "expected `&`"), e.enter(h.characterReference), e.enter(h.characterReferenceMarker), e.consume(f), e.exit(h.characterReferenceMarker), c;
  }
  function c(f) {
    return f === p.numberSign ? (e.enter(h.characterReferenceMarkerNumeric), e.consume(f), e.exit(h.characterReferenceMarkerNumeric), d) : (e.enter(h.characterReferenceValue), a = U.characterReferenceNamedSizeMax, o = at, l(f));
  }
  function d(f) {
    return f === p.uppercaseX || f === p.lowercaseX ? (e.enter(h.characterReferenceMarkerHexadecimal), e.consume(f), e.exit(h.characterReferenceMarkerHexadecimal), e.enter(h.characterReferenceValue), a = U.characterReferenceHexadecimalSizeMax, o = cc, l) : (e.enter(h.characterReferenceValue), a = U.characterReferenceDecimalSizeMax, o = br, l(f));
  }
  function l(f) {
    if (f === p.semicolon && i) {
      const m = e.exit(h.characterReferenceValue);
      return o === at && !Ur(r.sliceSerialize(m)) ? n(f) : (e.enter(h.characterReferenceMarker), e.consume(f), e.exit(h.characterReferenceMarker), e.exit(h.characterReference), t);
    }
    return o(f) && i++ < a ? (e.consume(f), l) : n(f);
  }
}
const Ai = {
  partial: !0,
  tokenize: Rc
}, Ni = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Ic
};
function Ic(e, t, n) {
  const r = this, i = { partial: !0, tokenize: N };
  let a = 0, o = 0, s;
  return c;
  function c(E) {
    return d(E);
  }
  function d(E) {
    S(
      E === p.graveAccent || E === p.tilde,
      "expected `` ` `` or `~`"
    );
    const j = r.events[r.events.length - 1];
    return a = j && j[1].type === h.linePrefix ? j[2].sliceSerialize(j[1], !0).length : 0, s = E, e.enter(h.codeFenced), e.enter(h.codeFencedFence), e.enter(h.codeFencedFenceSequence), l(E);
  }
  function l(E) {
    return E === s ? (o++, e.consume(E), l) : o < U.codeFencedSequenceSizeMin ? n(E) : (e.exit(h.codeFencedFenceSequence), ge(E) ? we(e, f, h.whitespace)(E) : f(E));
  }
  function f(E) {
    return E === p.eof || G(E) ? (e.exit(h.codeFencedFence), r.interrupt ? t(E) : e.check(Ai, x, P)(E)) : (e.enter(h.codeFencedFenceInfo), e.enter(h.chunkString, { contentType: U.contentTypeString }), m(E));
  }
  function m(E) {
    return E === p.eof || G(E) ? (e.exit(h.chunkString), e.exit(h.codeFencedFenceInfo), f(E)) : ge(E) ? (e.exit(h.chunkString), e.exit(h.codeFencedFenceInfo), we(e, g, h.whitespace)(E)) : E === p.graveAccent && E === s ? n(E) : (e.consume(E), m);
  }
  function g(E) {
    return E === p.eof || G(E) ? f(E) : (e.enter(h.codeFencedFenceMeta), e.enter(h.chunkString, { contentType: U.contentTypeString }), k(E));
  }
  function k(E) {
    return E === p.eof || G(E) ? (e.exit(h.chunkString), e.exit(h.codeFencedFenceMeta), f(E)) : E === p.graveAccent && E === s ? n(E) : (e.consume(E), k);
  }
  function x(E) {
    return S(G(E), "expected eol"), e.attempt(i, P, M)(E);
  }
  function M(E) {
    return S(G(E), "expected eol"), e.enter(h.lineEnding), e.consume(E), e.exit(h.lineEnding), T;
  }
  function T(E) {
    return a > 0 && ge(E) ? we(
      e,
      I,
      h.linePrefix,
      a + 1
    )(E) : I(E);
  }
  function I(E) {
    return E === p.eof || G(E) ? e.check(Ai, x, P)(E) : (e.enter(h.codeFlowValue), D(E));
  }
  function D(E) {
    return E === p.eof || G(E) ? (e.exit(h.codeFlowValue), I(E)) : (e.consume(E), D);
  }
  function P(E) {
    return e.exit(h.codeFenced), t(E);
  }
  function N(E, j, X) {
    let W = 0;
    return ne;
    function ne(K) {
      return S(G(K), "expected eol"), E.enter(h.lineEnding), E.consume(K), E.exit(h.lineEnding), Z;
    }
    function Z(K) {
      return S(
        r.parser.constructs.disable.null,
        "expected `disable.null` to be populated"
      ), E.enter(h.codeFencedFence), ge(K) ? we(
        E,
        H,
        h.linePrefix,
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize
      )(K) : H(K);
    }
    function H(K) {
      return K === s ? (E.enter(h.codeFencedFenceSequence), A(K)) : X(K);
    }
    function A(K) {
      return K === s ? (W++, E.consume(K), A) : W >= o ? (E.exit(h.codeFencedFenceSequence), ge(K) ? we(E, F, h.whitespace)(K) : F(K)) : X(K);
    }
    function F(K) {
      return K === p.eof || G(K) ? (E.exit(h.codeFencedFence), j(K)) : X(K);
    }
  }
}
function Rc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === p.eof ? n(o) : (S(G(o), "expected eol"), e.enter(h.lineEnding), e.consume(o), e.exit(h.lineEnding), a);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
const rr = {
  name: "codeIndented",
  tokenize: Ac
}, Mc = { partial: !0, tokenize: Nc };
function Ac(e, t, n) {
  const r = this;
  return i;
  function i(d) {
    return S(ge(d)), e.enter(h.codeIndented), we(
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
    return d === p.eof ? c(d) : G(d) ? e.attempt(Mc, o, c)(d) : (e.enter(h.codeFlowValue), s(d));
  }
  function s(d) {
    return d === p.eof || G(d) ? (e.exit(h.codeFlowValue), o(d)) : (e.consume(d), s);
  }
  function c(d) {
    return e.exit(h.codeIndented), t(d);
  }
}
function Nc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : G(o) ? (e.enter(h.lineEnding), e.consume(o), e.exit(h.lineEnding), i) : we(
      e,
      a,
      h.linePrefix,
      U.tabSize + 1
    )(o);
  }
  function a(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === h.linePrefix && s[2].sliceSerialize(s[1], !0).length >= U.tabSize ? t(o) : G(o) ? i(o) : n(o);
  }
}
const Lc = {
  name: "codeText",
  previous: Ha,
  resolve: Oc,
  tokenize: Dc
};
function Oc(e) {
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
function Dc(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return s;
  function s(m) {
    return S(m === p.graveAccent, "expected `` ` ``"), S(Ha.call(r, r.previous), "expected correct previous"), e.enter(h.codeText), e.enter(h.codeTextSequence), c(m);
  }
  function c(m) {
    return m === p.graveAccent ? (e.consume(m), i++, c) : (e.exit(h.codeTextSequence), d(m));
  }
  function d(m) {
    return m === p.eof ? n(m) : m === p.space ? (e.enter("space"), e.consume(m), e.exit("space"), d) : m === p.graveAccent ? (o = e.enter(h.codeTextSequence), a = 0, f(m)) : G(m) ? (e.enter(h.lineEnding), e.consume(m), e.exit(h.lineEnding), d) : (e.enter(h.codeTextData), l(m));
  }
  function l(m) {
    return m === p.eof || m === p.space || m === p.graveAccent || G(m) ? (e.exit(h.codeTextData), d(m)) : (e.consume(m), l);
  }
  function f(m) {
    return m === p.graveAccent ? (e.consume(m), a++, f) : a === i ? (e.exit(h.codeTextSequence), e.exit(h.codeText), t(m)) : (o.type = h.codeTextData, l(m));
  }
}
class Pc {
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
    return r && cn(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), cn(this.left, t);
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
    this.setCursor(0), cn(this.right, t.reverse());
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
        cn(this.right, n.reverse());
      } else {
        const n = this.right.splice(
          this.left.length + this.right.length - t,
          Number.POSITIVE_INFINITY
        );
        cn(this.left, n.reverse());
      }
  }
}
function cn(e, t) {
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
  const l = new Pc(e);
  for (; ++n < l.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = l.get(n), n && r[1].type === h.chunkFlow && l.get(n - 1)[1].type === h.listItemPrefix && (S(r[1]._tokenizer, "expected `_tokenizer` on subtokens"), c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === h.lineEndingBlank && (a += 2), a < c.length && c[a][1].type === h.content))
      for (; ++a < c.length && c[a][1].type !== h.content; )
        c[a][1].type === h.chunkText && (c[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, Fc(l, n)), n = t[n], d = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (o = l.get(a), o[1].type === h.lineEnding || o[1].type === h.lineEndingBlank)
          o[0] === "enter" && (i && (l.get(i)[1].type = h.lineEndingBlank), o[1].type = h.lineEnding, i = a);
        else if (!(o[1].type === h.linePrefix || o[1].type === h.listItemIndent)) break;
      i && (r[1].end = { ...l.get(i)[1].start }, s = l.slice(i, n), s.unshift(r), l.splice(i, n - i + 1, s));
    }
  }
  return St(e, 0, Number.POSITIVE_INFINITY, l.slice(0)), !d;
}
function Fc(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  S(n.contentType, "expected `contentType` on subtokens");
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const s = o.events, c = [], d = {};
  let l, f, m = -1, g = n, k = 0, x = 0;
  const M = [x];
  for (; g; ) {
    for (; e.get(++i)[1] !== g; )
      ;
    S(
      !f || g.previous === f,
      "expected previous to match"
    ), S(!f || f.next === g, "expected next to match"), a.push(i), g._tokenizer || (l = r.sliceStream(g), g.next || l.push(p.eof), f && o.defineSkip(g.start), g._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(l), g._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), f = g, g = g.next;
  }
  for (g = n; ++m < s.length; )
    // Find a void token that includes a break.
    s[m][0] === "exit" && s[m - 1][0] === "enter" && s[m][1].type === s[m - 1][1].type && s[m][1].start.line !== s[m][1].end.line && (S(g, "expected a current token"), x = m + 1, M.push(x), g._tokenizer = void 0, g.previous = void 0, g = g.next);
  for (o.events = [], g ? (g._tokenizer = void 0, g.previous = void 0, S(!g.next, "expected no next token")) : M.pop(), m = M.length; m--; ) {
    const T = s.slice(M[m], M[m + 1]), I = a.pop();
    S(I !== void 0, "expected a start position when splicing"), c.push([I, I + T.length - 1]), e.splice(I, 2, T);
  }
  for (c.reverse(), m = -1; ++m < c.length; )
    d[k + c[m][0]] = k + c[m][1], k += c[m][1] - c[m][0] - 1;
  return d;
}
const Hc = { resolve: Uc, tokenize: Bc }, zc = { partial: !0, tokenize: Wc };
function Uc(e) {
  return za(e), e;
}
function Bc(e, t) {
  let n;
  return r;
  function r(s) {
    return S(
      s !== p.eof && !G(s),
      "expected no eof or eol"
    ), e.enter(h.content), n = e.enter(h.chunkContent, {
      contentType: U.contentTypeContent
    }), i(s);
  }
  function i(s) {
    return s === p.eof ? a(s) : G(s) ? e.check(
      zc,
      o,
      a
    )(s) : (e.consume(s), i);
  }
  function a(s) {
    return e.exit(h.chunkContent), e.exit(h.content), t(s);
  }
  function o(s) {
    return S(G(s), "expected eol"), e.consume(s), e.exit(h.chunkContent), S(n, "expected previous token"), n.next = e.enter(h.chunkContent, {
      contentType: U.contentTypeContent,
      previous: n
    }), n = n.next, i;
  }
}
function Wc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return S(G(o), "expected a line ending"), e.exit(h.chunkContent), e.enter(h.lineEnding), e.consume(o), e.exit(h.lineEnding), we(e, a, h.linePrefix);
  }
  function a(o) {
    if (o === p.eof || G(o))
      return n(o);
    S(
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
    return T === p.greaterThan ? (e.exit(h.chunkString), e.exit(s), m(T)) : T === p.eof || T === p.lessThan || G(T) ? n(T) : (e.consume(T), T === p.backslash ? k : g);
  }
  function k(T) {
    return T === p.lessThan || T === p.greaterThan || T === p.backslash ? (e.consume(T), g) : g(T);
  }
  function x(T) {
    return !l && (T === p.eof || T === p.rightParenthesis || Ke(T)) ? (e.exit(h.chunkString), e.exit(s), e.exit(o), e.exit(r), t(T)) : l < d && T === p.leftParenthesis ? (e.consume(T), l++, x) : T === p.rightParenthesis ? (e.consume(T), l--, x) : T === p.eof || T === p.space || T === p.leftParenthesis || Er(T) ? n(T) : (e.consume(T), T === p.backslash ? M : x);
  }
  function M(T) {
    return T === p.leftParenthesis || T === p.rightParenthesis || T === p.backslash ? (e.consume(T), x) : x(T);
  }
}
function Ba(e, t, n, r, i, a) {
  const o = this;
  let s = 0, c;
  return d;
  function d(g) {
    return S(g === p.leftSquareBracket, "expected `[`"), e.enter(r), e.enter(i), e.consume(g), e.exit(i), e.enter(a), l;
  }
  function l(g) {
    return s > U.linkReferenceSizeMax || g === p.eof || g === p.leftSquareBracket || g === p.rightSquareBracket && !c || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    g === p.caret && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(g) : g === p.rightSquareBracket ? (e.exit(a), e.enter(i), e.consume(g), e.exit(i), e.exit(r), t) : G(g) ? (e.enter(h.lineEnding), e.consume(g), e.exit(h.lineEnding), l) : (e.enter(h.chunkString, { contentType: U.contentTypeString }), f(g));
  }
  function f(g) {
    return g === p.eof || g === p.leftSquareBracket || g === p.rightSquareBracket || G(g) || s++ > U.linkReferenceSizeMax ? (e.exit(h.chunkString), l(g)) : (e.consume(g), c || (c = !ge(g)), g === p.backslash ? m : f);
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
    return m === o ? (e.exit(a), c(o)) : m === p.eof ? n(m) : G(m) ? (e.enter(h.lineEnding), e.consume(m), e.exit(h.lineEnding), we(e, d, h.linePrefix)) : (e.enter(h.chunkString, { contentType: U.contentTypeString }), l(m));
  }
  function l(m) {
    return m === o || m === p.eof || G(m) ? (e.exit(h.chunkString), d(m)) : (e.consume(m), m === p.backslash ? f : l);
  }
  function f(m) {
    return m === o || m === p.backslash ? (e.consume(m), l) : l(m);
  }
}
function hn(e, t) {
  let n;
  return r;
  function r(i) {
    return G(i) ? (e.enter(h.lineEnding), e.consume(i), e.exit(h.lineEnding), n = !0, r) : ge(i) ? we(
      e,
      r,
      n ? h.linePrefix : h.lineSuffix
    )(i) : t(i);
  }
}
const Gc = { name: "definition", tokenize: $c }, Vc = { partial: !0, tokenize: jc };
function $c(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(g) {
    return e.enter(h.definition), o(g);
  }
  function o(g) {
    return S(g === p.leftSquareBracket, "expected `[`"), Ba.call(
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
    return i = Yt(
      r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
    ), g === p.colon ? (e.enter(h.definitionMarker), e.consume(g), e.exit(h.definitionMarker), c) : n(g);
  }
  function c(g) {
    return Ke(g) ? hn(e, d)(g) : d(g);
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
    return e.attempt(Vc, f, f)(g);
  }
  function f(g) {
    return ge(g) ? we(e, m, h.whitespace)(g) : m(g);
  }
  function m(g) {
    return g === p.eof || G(g) ? (e.exit(h.definition), r.parser.defined.push(i), t(g)) : n(g);
  }
}
function jc(e, t, n) {
  return r;
  function r(s) {
    return Ke(s) ? hn(e, i)(s) : n(s);
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
    return ge(s) ? we(
      e,
      o,
      h.whitespace
    )(s) : o(s);
  }
  function o(s) {
    return s === p.eof || G(s) ? t(s) : n(s);
  }
}
const qc = {
  name: "hardBreakEscape",
  tokenize: Zc
};
function Zc(e, t, n) {
  return r;
  function r(a) {
    return S(a === p.backslash, "expected `\\`"), e.enter(h.hardBreakEscape), e.consume(a), i;
  }
  function i(a) {
    return G(a) ? (e.exit(h.hardBreakEscape), t(a)) : n(a);
  }
}
const Kc = {
  name: "headingAtx",
  resolve: Xc,
  tokenize: Yc
};
function Xc(e, t) {
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
  }, St(e, r, n - r + 1, [
    ["enter", i, t],
    ["enter", a, t],
    ["exit", a, t],
    ["exit", i, t]
  ])), e;
}
function Yc(e, t, n) {
  let r = 0;
  return i;
  function i(l) {
    return e.enter(h.atxHeading), a(l);
  }
  function a(l) {
    return S(l === p.numberSign, "expected `#`"), e.enter(h.atxHeadingSequence), o(l);
  }
  function o(l) {
    return l === p.numberSign && r++ < U.atxHeadingOpeningFenceSizeMax ? (e.consume(l), o) : l === p.eof || Ke(l) ? (e.exit(h.atxHeadingSequence), s(l)) : n(l);
  }
  function s(l) {
    return l === p.numberSign ? (e.enter(h.atxHeadingSequence), c(l)) : l === p.eof || G(l) ? (e.exit(h.atxHeading), t(l)) : ge(l) ? we(e, s, h.whitespace)(l) : (e.enter(h.atxHeadingText), d(l));
  }
  function c(l) {
    return l === p.numberSign ? (e.consume(l), c) : (e.exit(h.atxHeadingSequence), s(l));
  }
  function d(l) {
    return l === p.eof || l === p.numberSign || Ke(l) ? (e.exit(h.atxHeadingText), s(l)) : (e.consume(l), d);
  }
}
const Jc = [
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
], Li = ["pre", "script", "style", "textarea"], Qc = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: nu,
  tokenize: ru
}, eu = { partial: !0, tokenize: au }, tu = {
  partial: !0,
  tokenize: iu
};
function nu(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === h.htmlFlow); )
    ;
  return t > 1 && e[t - 2][1].type === h.linePrefix && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function ru(e, t, n) {
  const r = this;
  let i, a, o, s, c;
  return d;
  function d(C) {
    return l(C);
  }
  function l(C) {
    return S(C === p.lessThan, "expected `<`"), e.enter(h.htmlFlow), e.enter(h.htmlFlowData), e.consume(C), f;
  }
  function f(C) {
    return C === p.exclamationMark ? (e.consume(C), m) : C === p.slash ? (e.consume(C), a = !0, x) : C === p.questionMark ? (e.consume(C), i = U.htmlInstruction, r.interrupt ? t : y) : yt(C) ? (S(C !== null), e.consume(C), o = String.fromCharCode(C), M) : n(C);
  }
  function m(C) {
    return C === p.dash ? (e.consume(C), i = U.htmlComment, g) : C === p.leftSquareBracket ? (e.consume(C), i = U.htmlCdata, s = 0, k) : yt(C) ? (e.consume(C), i = U.htmlDeclaration, r.interrupt ? t : y) : n(C);
  }
  function g(C) {
    return C === p.dash ? (e.consume(C), r.interrupt ? t : y) : n(C);
  }
  function k(C) {
    const he = U.cdataOpeningString;
    return C === he.charCodeAt(s++) ? (e.consume(C), s === he.length ? r.interrupt ? t : H : k) : n(C);
  }
  function x(C) {
    return yt(C) ? (S(C !== null), e.consume(C), o = String.fromCharCode(C), M) : n(C);
  }
  function M(C) {
    if (C === p.eof || C === p.slash || C === p.greaterThan || Ke(C)) {
      const he = C === p.slash, Q = o.toLowerCase();
      return !he && !a && Li.includes(Q) ? (i = U.htmlRaw, r.interrupt ? t(C) : H(C)) : Jc.includes(o.toLowerCase()) ? (i = U.htmlBasic, he ? (e.consume(C), T) : r.interrupt ? t(C) : H(C)) : (i = U.htmlComplete, r.interrupt && !r.parser.lazy[r.now().line] ? n(C) : a ? I(C) : D(C));
    }
    return C === p.dash || at(C) ? (e.consume(C), o += String.fromCharCode(C), M) : n(C);
  }
  function T(C) {
    return C === p.greaterThan ? (e.consume(C), r.interrupt ? t : H) : n(C);
  }
  function I(C) {
    return ge(C) ? (e.consume(C), I) : ne(C);
  }
  function D(C) {
    return C === p.slash ? (e.consume(C), ne) : C === p.colon || C === p.underscore || yt(C) ? (e.consume(C), P) : ge(C) ? (e.consume(C), D) : ne(C);
  }
  function P(C) {
    return C === p.dash || C === p.dot || C === p.colon || C === p.underscore || at(C) ? (e.consume(C), P) : N(C);
  }
  function N(C) {
    return C === p.equalsTo ? (e.consume(C), E) : ge(C) ? (e.consume(C), N) : D(C);
  }
  function E(C) {
    return C === p.eof || C === p.lessThan || C === p.equalsTo || C === p.greaterThan || C === p.graveAccent ? n(C) : C === p.quotationMark || C === p.apostrophe ? (e.consume(C), c = C, j) : ge(C) ? (e.consume(C), E) : X(C);
  }
  function j(C) {
    return C === c ? (e.consume(C), c = null, W) : C === p.eof || G(C) ? n(C) : (e.consume(C), j);
  }
  function X(C) {
    return C === p.eof || C === p.quotationMark || C === p.apostrophe || C === p.slash || C === p.lessThan || C === p.equalsTo || C === p.greaterThan || C === p.graveAccent || Ke(C) ? N(C) : (e.consume(C), X);
  }
  function W(C) {
    return C === p.slash || C === p.greaterThan || ge(C) ? D(C) : n(C);
  }
  function ne(C) {
    return C === p.greaterThan ? (e.consume(C), Z) : n(C);
  }
  function Z(C) {
    return C === p.eof || G(C) ? H(C) : ge(C) ? (e.consume(C), Z) : n(C);
  }
  function H(C) {
    return C === p.dash && i === U.htmlComment ? (e.consume(C), se) : C === p.lessThan && i === U.htmlRaw ? (e.consume(C), z) : C === p.greaterThan && i === U.htmlDeclaration ? (e.consume(C), oe) : C === p.questionMark && i === U.htmlInstruction ? (e.consume(C), y) : C === p.rightSquareBracket && i === U.htmlCdata ? (e.consume(C), _e) : G(C) && (i === U.htmlBasic || i === U.htmlComplete) ? (e.exit(h.htmlFlowData), e.check(
      eu,
      re,
      A
    )(C)) : C === p.eof || G(C) ? (e.exit(h.htmlFlowData), A(C)) : (e.consume(C), H);
  }
  function A(C) {
    return e.check(
      tu,
      F,
      re
    )(C);
  }
  function F(C) {
    return S(G(C)), e.enter(h.lineEnding), e.consume(C), e.exit(h.lineEnding), K;
  }
  function K(C) {
    return C === p.eof || G(C) ? A(C) : (e.enter(h.htmlFlowData), H(C));
  }
  function se(C) {
    return C === p.dash ? (e.consume(C), y) : H(C);
  }
  function z(C) {
    return C === p.slash ? (e.consume(C), o = "", xe) : H(C);
  }
  function xe(C) {
    if (C === p.greaterThan) {
      const he = o.toLowerCase();
      return Li.includes(he) ? (e.consume(C), oe) : H(C);
    }
    return yt(C) && o.length < U.htmlRawSizeMax ? (S(C !== null), e.consume(C), o += String.fromCharCode(C), xe) : H(C);
  }
  function _e(C) {
    return C === p.rightSquareBracket ? (e.consume(C), y) : H(C);
  }
  function y(C) {
    return C === p.greaterThan ? (e.consume(C), oe) : C === p.dash && i === U.htmlComment ? (e.consume(C), y) : H(C);
  }
  function oe(C) {
    return C === p.eof || G(C) ? (e.exit(h.htmlFlowData), re(C)) : (e.consume(C), oe);
  }
  function re(C) {
    return e.exit(h.htmlFlow), t(C);
  }
}
function iu(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return G(o) ? (e.enter(h.lineEnding), e.consume(o), e.exit(h.lineEnding), a) : n(o);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function au(e, t, n) {
  return r;
  function r(i) {
    return S(G(i), "expected a line ending"), e.enter(h.lineEnding), e.consume(i), e.exit(h.lineEnding), e.attempt(Gn, t, n);
  }
}
const ou = { name: "htmlText", tokenize: su };
function su(e, t, n) {
  const r = this;
  let i, a, o;
  return s;
  function s(y) {
    return S(y === p.lessThan, "expected `<`"), e.enter(h.htmlText), e.enter(h.htmlTextData), e.consume(y), c;
  }
  function c(y) {
    return y === p.exclamationMark ? (e.consume(y), d) : y === p.slash ? (e.consume(y), N) : y === p.questionMark ? (e.consume(y), D) : yt(y) ? (e.consume(y), X) : n(y);
  }
  function d(y) {
    return y === p.dash ? (e.consume(y), l) : y === p.leftSquareBracket ? (e.consume(y), a = 0, k) : yt(y) ? (e.consume(y), I) : n(y);
  }
  function l(y) {
    return y === p.dash ? (e.consume(y), g) : n(y);
  }
  function f(y) {
    return y === p.eof ? n(y) : y === p.dash ? (e.consume(y), m) : G(y) ? (o = f, z(y)) : (e.consume(y), f);
  }
  function m(y) {
    return y === p.dash ? (e.consume(y), g) : f(y);
  }
  function g(y) {
    return y === p.greaterThan ? se(y) : y === p.dash ? m(y) : f(y);
  }
  function k(y) {
    const oe = U.cdataOpeningString;
    return y === oe.charCodeAt(a++) ? (e.consume(y), a === oe.length ? x : k) : n(y);
  }
  function x(y) {
    return y === p.eof ? n(y) : y === p.rightSquareBracket ? (e.consume(y), M) : G(y) ? (o = x, z(y)) : (e.consume(y), x);
  }
  function M(y) {
    return y === p.rightSquareBracket ? (e.consume(y), T) : x(y);
  }
  function T(y) {
    return y === p.greaterThan ? se(y) : y === p.rightSquareBracket ? (e.consume(y), T) : x(y);
  }
  function I(y) {
    return y === p.eof || y === p.greaterThan ? se(y) : G(y) ? (o = I, z(y)) : (e.consume(y), I);
  }
  function D(y) {
    return y === p.eof ? n(y) : y === p.questionMark ? (e.consume(y), P) : G(y) ? (o = D, z(y)) : (e.consume(y), D);
  }
  function P(y) {
    return y === p.greaterThan ? se(y) : D(y);
  }
  function N(y) {
    return yt(y) ? (e.consume(y), E) : n(y);
  }
  function E(y) {
    return y === p.dash || at(y) ? (e.consume(y), E) : j(y);
  }
  function j(y) {
    return G(y) ? (o = j, z(y)) : ge(y) ? (e.consume(y), j) : se(y);
  }
  function X(y) {
    return y === p.dash || at(y) ? (e.consume(y), X) : y === p.slash || y === p.greaterThan || Ke(y) ? W(y) : n(y);
  }
  function W(y) {
    return y === p.slash ? (e.consume(y), se) : y === p.colon || y === p.underscore || yt(y) ? (e.consume(y), ne) : G(y) ? (o = W, z(y)) : ge(y) ? (e.consume(y), W) : se(y);
  }
  function ne(y) {
    return y === p.dash || y === p.dot || y === p.colon || y === p.underscore || at(y) ? (e.consume(y), ne) : Z(y);
  }
  function Z(y) {
    return y === p.equalsTo ? (e.consume(y), H) : G(y) ? (o = Z, z(y)) : ge(y) ? (e.consume(y), Z) : W(y);
  }
  function H(y) {
    return y === p.eof || y === p.lessThan || y === p.equalsTo || y === p.greaterThan || y === p.graveAccent ? n(y) : y === p.quotationMark || y === p.apostrophe ? (e.consume(y), i = y, A) : G(y) ? (o = H, z(y)) : ge(y) ? (e.consume(y), H) : (e.consume(y), F);
  }
  function A(y) {
    return y === i ? (e.consume(y), i = void 0, K) : y === p.eof ? n(y) : G(y) ? (o = A, z(y)) : (e.consume(y), A);
  }
  function F(y) {
    return y === p.eof || y === p.quotationMark || y === p.apostrophe || y === p.lessThan || y === p.equalsTo || y === p.graveAccent ? n(y) : y === p.slash || y === p.greaterThan || Ke(y) ? W(y) : (e.consume(y), F);
  }
  function K(y) {
    return y === p.slash || y === p.greaterThan || Ke(y) ? W(y) : n(y);
  }
  function se(y) {
    return y === p.greaterThan ? (e.consume(y), e.exit(h.htmlTextData), e.exit(h.htmlText), t) : n(y);
  }
  function z(y) {
    return S(o, "expected return state"), S(G(y), "expected eol"), e.exit(h.htmlTextData), e.enter(h.lineEnding), e.consume(y), e.exit(h.lineEnding), xe;
  }
  function xe(y) {
    return S(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), ge(y) ? we(
      e,
      _e,
      h.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize
    )(y) : _e(y);
  }
  function _e(y) {
    return e.enter(h.htmlTextData), o(y);
  }
}
const Wr = {
  name: "labelEnd",
  resolveAll: du,
  resolveTo: hu,
  tokenize: pu
}, lu = { tokenize: fu }, cu = { tokenize: gu }, uu = { tokenize: mu };
function du(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === h.labelImage || r.type === h.labelLink || r.type === h.labelEnd) {
      const i = r.type === h.labelImage ? 4 : 2;
      r.type = h.data, t += i;
    }
  }
  return e.length !== n.length && St(e, 0, e.length, n), e;
}
function hu(e, t) {
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
  S(a !== void 0, "`open` is supposed to be found"), S(o !== void 0, "`close` is supposed to be found");
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
  ], s = lt(s, e.slice(a + 1, a + r + 3)), s = lt(s, [["enter", l, t]]), S(
    t.parser.constructs.insideSpan.null,
    "expected `insideSpan.null` to be populated"
  ), s = lt(
    s,
    Br(
      t.parser.constructs.insideSpan.null,
      e.slice(a + r + 4, o - 3),
      t
    )
  ), s = lt(s, [
    ["exit", l, t],
    e[o - 2],
    e[o - 1],
    ["exit", d, t]
  ]), s = lt(s, e.slice(o + 1)), s = lt(s, [["exit", c, t]]), St(e, a, e.length, s), e;
}
function pu(e, t, n) {
  const r = this;
  let i = r.events.length, a, o;
  for (; i--; )
    if ((r.events[i][1].type === h.labelImage || r.events[i][1].type === h.labelLink) && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return s;
  function s(m) {
    return S(m === p.rightSquareBracket, "expected `]`"), a ? a._inactive ? f(m) : (o = r.parser.defined.includes(
      Yt(
        r.sliceSerialize({ start: a.end, end: r.now() })
      )
    ), e.enter(h.labelEnd), e.enter(h.labelMarker), e.consume(m), e.exit(h.labelMarker), e.exit(h.labelEnd), c) : n(m);
  }
  function c(m) {
    return m === p.leftParenthesis ? e.attempt(
      lu,
      l,
      o ? l : f
    )(m) : m === p.leftSquareBracket ? e.attempt(
      cu,
      l,
      o ? d : f
    )(m) : o ? l(m) : f(m);
  }
  function d(m) {
    return e.attempt(
      uu,
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
function fu(e, t, n) {
  return r;
  function r(f) {
    return S(f === p.leftParenthesis, "expected left paren"), e.enter(h.resource), e.enter(h.resourceMarker), e.consume(f), e.exit(h.resourceMarker), i;
  }
  function i(f) {
    return Ke(f) ? hn(e, a)(f) : a(f);
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
    return Ke(f) ? hn(e, c)(f) : l(f);
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
    return Ke(f) ? hn(e, l)(f) : l(f);
  }
  function l(f) {
    return f === p.rightParenthesis ? (e.enter(h.resourceMarker), e.consume(f), e.exit(h.resourceMarker), e.exit(h.resource), t) : n(f);
  }
}
function gu(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return S(s === p.leftSquareBracket, "expected left bracket"), Ba.call(
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
      Yt(
        r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
      )
    ) ? t(s) : n(s);
  }
  function o(s) {
    return n(s);
  }
}
function mu(e, t, n) {
  return r;
  function r(a) {
    return S(a === p.leftSquareBracket, "expected left bracket"), e.enter(h.reference), e.enter(h.referenceMarker), e.consume(a), e.exit(h.referenceMarker), i;
  }
  function i(a) {
    return a === p.rightSquareBracket ? (e.enter(h.referenceMarker), e.consume(a), e.exit(h.referenceMarker), e.exit(h.reference), t) : n(a);
  }
}
const Cu = {
  name: "labelStartImage",
  resolveAll: Wr.resolveAll,
  tokenize: yu
};
function yu(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return S(s === p.exclamationMark, "expected `!`"), e.enter(h.labelImage), e.enter(h.labelImageMarker), e.consume(s), e.exit(h.labelImageMarker), a;
  }
  function a(s) {
    return s === p.leftSquareBracket ? (e.enter(h.labelMarker), e.consume(s), e.exit(h.labelMarker), e.exit(h.labelImage), o) : n(s);
  }
  function o(s) {
    return s === p.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : t(s);
  }
}
const wu = {
  name: "labelStartLink",
  resolveAll: Wr.resolveAll,
  tokenize: Su
};
function Su(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return S(o === p.leftSquareBracket, "expected `[`"), e.enter(h.labelLink), e.enter(h.labelMarker), e.consume(o), e.exit(h.labelMarker), e.exit(h.labelLink), a;
  }
  function a(o) {
    return o === p.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const ir = { name: "lineEnding", tokenize: xu };
function xu(e, t) {
  return n;
  function n(r) {
    return S(G(r), "expected eol"), e.enter(h.lineEnding), e.consume(r), e.exit(h.lineEnding), we(e, t, h.linePrefix);
  }
}
const On = {
  name: "thematicBreak",
  tokenize: ku
};
function ku(e, t, n) {
  let r = 0, i;
  return a;
  function a(d) {
    return e.enter(h.thematicBreak), o(d);
  }
  function o(d) {
    return S(
      d === p.asterisk || d === p.dash || d === p.underscore,
      "expected `*`, `-`, or `_`"
    ), i = d, s(d);
  }
  function s(d) {
    return d === i ? (e.enter(h.thematicBreakSequence), c(d)) : r >= U.thematicBreakMarkerCountMin && (d === p.eof || G(d)) ? (e.exit(h.thematicBreak), t(d)) : n(d);
  }
  function c(d) {
    return d === i ? (e.consume(d), r++, c) : (e.exit(h.thematicBreakSequence), ge(d) ? we(e, s, h.whitespace)(d) : s(d));
  }
}
const Ze = {
  continuation: { tokenize: _u },
  exit: Iu,
  name: "list",
  tokenize: bu
}, Tu = {
  partial: !0,
  tokenize: Ru
}, Eu = { partial: !0, tokenize: vu };
function bu(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === h.linePrefix ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return s;
  function s(g) {
    S(r.containerState, "expected state");
    const k = r.containerState.type || (g === p.asterisk || g === p.plusSign || g === p.dash ? h.listUnordered : h.listOrdered);
    if (k === h.listUnordered ? !r.containerState.marker || g === r.containerState.marker : br(g)) {
      if (r.containerState.type || (r.containerState.type = k, e.enter(k, { _container: !0 })), k === h.listUnordered)
        return e.enter(h.listItemPrefix), g === p.asterisk || g === p.dash ? e.check(On, n, d)(g) : d(g);
      if (!r.interrupt || g === p.digit1)
        return e.enter(h.listItemPrefix), e.enter(h.listItemValue), c(g);
    }
    return n(g);
  }
  function c(g) {
    return S(r.containerState, "expected state"), br(g) && ++o < U.listItemValueSizeMax ? (e.consume(g), c) : (!r.interrupt || o < 2) && (r.containerState.marker ? g === r.containerState.marker : g === p.rightParenthesis || g === p.dot) ? (e.exit(h.listItemValue), d(g)) : n(g);
  }
  function d(g) {
    return S(r.containerState, "expected state"), S(g !== p.eof, "eof (`null`) is not a marker"), e.enter(h.listItemMarker), e.consume(g), e.exit(h.listItemMarker), r.containerState.marker = r.containerState.marker || g, e.check(
      Gn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : l,
      e.attempt(
        Tu,
        m,
        f
      )
    );
  }
  function l(g) {
    return S(r.containerState, "expected state"), r.containerState.initialBlankLine = !0, a++, m(g);
  }
  function f(g) {
    return ge(g) ? (e.enter(h.listItemPrefixWhitespace), e.consume(g), e.exit(h.listItemPrefixWhitespace), m) : n(g);
  }
  function m(g) {
    return S(r.containerState, "expected state"), r.containerState.size = a + r.sliceSerialize(e.exit(h.listItemPrefix), !0).length, t(g);
  }
}
function _u(e, t, n) {
  const r = this;
  return S(r.containerState, "expected state"), r.containerState._closeFlow = void 0, e.check(Gn, i, a);
  function i(s) {
    return S(r.containerState, "expected state"), S(typeof r.containerState.size == "number", "expected size"), r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, we(
      e,
      t,
      h.listItemIndent,
      r.containerState.size + 1
    )(s);
  }
  function a(s) {
    return S(r.containerState, "expected state"), r.containerState.furtherBlankLines || !ge(s) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(s)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Eu, t, o)(s));
  }
  function o(s) {
    return S(r.containerState, "expected state"), r.containerState._closeFlow = !0, r.interrupt = void 0, S(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), we(
      e,
      e.attempt(Ze, t, n),
      h.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize
    )(s);
  }
}
function vu(e, t, n) {
  const r = this;
  return S(r.containerState, "expected state"), S(typeof r.containerState.size == "number", "expected size"), we(
    e,
    i,
    h.listItemIndent,
    r.containerState.size + 1
  );
  function i(a) {
    S(r.containerState, "expected state");
    const o = r.events[r.events.length - 1];
    return o && o[1].type === h.listItemIndent && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function Iu(e) {
  S(this.containerState, "expected state"), S(typeof this.containerState.type == "string", "expected type"), e.exit(this.containerState.type);
}
function Ru(e, t, n) {
  const r = this;
  return S(
    r.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), we(
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
  resolveTo: Mu,
  tokenize: Au
};
function Mu(e, t) {
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
  S(i !== void 0, "expected a `text` index to be found"), S(r !== void 0, "expected a `text` index to be found"), S(e[r][2] === t, "enter context should be same"), S(
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
function Au(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(d) {
    let l = r.events.length, f;
    for (S(
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
    return d === i ? (e.consume(d), s) : (e.exit(h.setextHeadingLineSequence), ge(d) ? we(e, c, h.lineSuffix)(d) : c(d));
  }
  function c(d) {
    return d === p.eof || G(d) ? (e.exit(h.setextHeadingLine), t(d)) : n(d);
  }
}
const Nu = { tokenize: Lu };
function Lu(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    Gn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(
      this.parser.constructs.flowInitial,
      i,
      we(
        e,
        e.attempt(
          this.parser.constructs.flow,
          i,
          e.attempt(Hc, i)
        ),
        h.linePrefix
      )
    )
  );
  return n;
  function r(a) {
    if (S(
      a === p.eof || G(a),
      "expected eol or eof"
    ), a === p.eof) {
      e.consume(a);
      return;
    }
    return e.enter(h.lineEndingBlank), e.consume(a), e.exit(h.lineEndingBlank), t.currentConstruct = void 0, n;
  }
  function i(a) {
    if (S(
      a === p.eof || G(a),
      "expected eol or eof"
    ), a === p.eof) {
      e.consume(a);
      return;
    }
    return e.enter(h.lineEnding), e.consume(a), e.exit(h.lineEnding), t.currentConstruct = void 0, n;
  }
}
const Ou = { resolveAll: Va() }, Du = Ga("string"), Pu = Ga("text");
function Ga(e) {
  return {
    resolveAll: Va(
      e === "text" ? Fu : void 0
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
        for (S(Array.isArray(f), "expected `disable.null` to be populated"); ++m < f.length; ) {
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
function Fu(e, t) {
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
const Hu = {
  [p.asterisk]: Ze,
  [p.plusSign]: Ze,
  [p.dash]: Ze,
  [p.digit0]: Ze,
  [p.digit1]: Ze,
  [p.digit2]: Ze,
  [p.digit3]: Ze,
  [p.digit4]: Ze,
  [p.digit5]: Ze,
  [p.digit6]: Ze,
  [p.digit7]: Ze,
  [p.digit8]: Ze,
  [p.digit9]: Ze,
  [p.greaterThan]: Da
}, zu = {
  [p.leftSquareBracket]: Gc
}, Uu = {
  [p.horizontalTab]: rr,
  [p.virtualSpace]: rr,
  [p.space]: rr
}, Bu = {
  [p.numberSign]: Kc,
  [p.asterisk]: On,
  [p.dash]: [Oi, On],
  [p.lessThan]: Qc,
  [p.equalsTo]: Oi,
  [p.underscore]: On,
  [p.graveAccent]: Ni,
  [p.tilde]: Ni
}, Wu = {
  [p.ampersand]: Fa,
  [p.backslash]: Pa
}, Gu = {
  [p.carriageReturn]: ir,
  [p.lineFeed]: ir,
  [p.carriageReturnLineFeed]: ir,
  [p.exclamationMark]: Cu,
  [p.ampersand]: Fa,
  [p.asterisk]: _r,
  [p.lessThan]: [Sc, ou],
  [p.leftSquareBracket]: wu,
  [p.backslash]: [qc, Pa],
  [p.rightSquareBracket]: Wr,
  [p.underscore]: _r,
  [p.graveAccent]: Lc
}, Vu = { null: [_r, Ou] }, $u = { null: [p.asterisk, p.underscore] }, ju = { null: [] }, qu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: $u,
  contentInitial: zu,
  disable: ju,
  document: Hu,
  flow: Bu,
  flowInitial: Uu,
  insideSpan: Vu,
  string: Wu,
  text: Gu
}, Symbol.toStringTag, { value: "Module" }));
var vr = { exports: {} }, ar, Di;
function Zu() {
  if (Di) return ar;
  Di = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, a = r * 365.25;
  ar = function(l, f) {
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
    var k = f >= m * 1.5;
    return Math.round(l / m) + " " + g + (k ? "s" : "");
  }
  return ar;
}
function Ku(e) {
  n.debug = n, n.default = n, n.coerce = c, n.disable = o, n.enable = i, n.enabled = s, n.humanize = Zu(), n.destroy = d, Object.keys(e).forEach((l) => {
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
    let f, m = null, g, k;
    function x(...M) {
      if (!x.enabled)
        return;
      const T = x, I = Number(/* @__PURE__ */ new Date()), D = I - (f || I);
      T.diff = D, T.prev = f, T.curr = I, f = I, M[0] = n.coerce(M[0]), typeof M[0] != "string" && M.unshift("%O");
      let P = 0;
      M[0] = M[0].replace(/%([a-zA-Z%])/g, (E, j) => {
        if (E === "%%")
          return "%";
        P++;
        const X = n.formatters[j];
        if (typeof X == "function") {
          const W = M[P];
          E = X.call(T, W), M.splice(P, 1), P--;
        }
        return E;
      }), n.formatArgs.call(T, M), (T.log || n.log).apply(T, M);
    }
    return x.namespace = l, x.useColors = n.useColors(), x.color = n.selectColor(l), x.extend = r, x.destroy = n.destroy, Object.defineProperty(x, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => m !== null ? m : (g !== n.namespaces && (g = n.namespaces, k = n.enabled(l)), k),
      set: (M) => {
        m = M;
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
    let m = 0, g = 0, k = -1, x = 0;
    for (; m < l.length; )
      if (g < f.length && (f[g] === l[m] || f[g] === "*"))
        f[g] === "*" ? (k = g, x = m, g++) : (m++, g++);
      else if (k !== -1)
        g = k + 1, x++, m = x;
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
var Xu = Ku;
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
  e.exports = Xu(t);
  const { formatters: s } = e.exports;
  s.j = function(c) {
    try {
      return JSON.stringify(c);
    } catch (d) {
      return "[UnexpectedJSONParseError]: " + d.message;
    }
  };
})(vr, vr.exports);
var Yu = vr.exports;
const Ju = /* @__PURE__ */ Or(Yu), Bt = Ju("micromark");
function Qu(e, t, n) {
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
    attempt: W(j),
    check: W(X),
    consume: P,
    enter: N,
    exit: E,
    interrupt: W(X, { interrupt: !0 })
  }, l = {
    code: p.eof,
    containerState: {},
    defineSkip: T,
    events: [],
    now: M,
    parser: e,
    previous: p.eof,
    sliceSerialize: k,
    sliceStream: x,
    write: g
  };
  let f = t.tokenize.call(l, d), m;
  return t.resolveAll && a.push(t), l;
  function g(A) {
    return o = lt(o, A), I(), o[o.length - 1] !== p.eof ? [] : (ne(t, 0), l.events = Br(a, l.events, l), l.events);
  }
  function k(A, F) {
    return t1(x(A), F);
  }
  function x(A) {
    return e1(o, A);
  }
  function M() {
    const { _bufferIndex: A, _index: F, line: K, column: se, offset: z } = r;
    return { _bufferIndex: A, _index: F, line: K, column: se, offset: z };
  }
  function T(A) {
    i[A.line] = A.column, H(), Bt("position: define skip: `%j`", r);
  }
  function I() {
    let A;
    for (; r._index < o.length; ) {
      const F = o[r._index];
      if (typeof F == "string")
        for (A = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === A && r._bufferIndex < F.length; )
          D(F.charCodeAt(r._bufferIndex));
      else
        D(F);
    }
  }
  function D(A) {
    S(c === !0, "expected character to be consumed"), c = void 0, Bt("main: passing `%s` to %s", A, f && f.name), m = A, S(typeof f == "function", "expected state"), f = f(A);
  }
  function P(A) {
    S(A === m, "expected given code to equal expected code"), Bt("consume: `%s`", A), S(
      c === void 0,
      "expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used"
    ), S(
      A === null ? l.events.length === 0 || l.events[l.events.length - 1][0] === "exit" : l.events[l.events.length - 1][0] === "enter",
      "expected last token to be open"
    ), G(A) ? (r.line++, r.column = 1, r.offset += A === p.carriageReturnLineFeed ? 2 : 1, H(), Bt("position: after eol: `%j`", r)) : A !== p.virtualSpace && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = A, c = !0;
  }
  function N(A, F) {
    const K = F || {};
    return K.type = A, K.start = M(), S(typeof A == "string", "expected string type"), S(A.length > 0, "expected non-empty string"), Bt("enter: `%s`", A), l.events.push(["enter", K, l]), s.push(K), K;
  }
  function E(A) {
    S(typeof A == "string", "expected string type"), S(A.length > 0, "expected non-empty string");
    const F = s.pop();
    return S(F, "cannot close w/o open tokens"), F.end = M(), S(A === F.type, "expected exit token to match current token"), S(
      !(F.start._index === F.end._index && F.start._bufferIndex === F.end._bufferIndex),
      "expected non-empty token (`" + A + "`)"
    ), Bt("exit: `%s`", F.type), l.events.push(["exit", F, l]), F;
  }
  function j(A, F) {
    ne(A, F.from);
  }
  function X(A, F) {
    F.restore();
  }
  function W(A, F) {
    return K;
    function K(se, z, xe) {
      let _e, y, oe, re;
      return Array.isArray(se) ? (
        /* c8 ignore next 1 */
        he(se)
      ) : "tokenize" in se ? (
        // Looks like a construct.
        he([
          /** @type {Construct} */
          se
        ])
      ) : C(se);
      function C(J) {
        return Te;
        function Te(me) {
          const Le = me !== null && J[me], ot = me !== null && J.null, Ye = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Le) ? Le : Le ? [Le] : [],
            ...Array.isArray(ot) ? ot : ot ? [ot] : []
          ];
          return he(Ye)(me);
        }
      }
      function he(J) {
        return _e = J, y = 0, J.length === 0 ? (S(xe, "expected `bogusState` to be given"), xe) : Q(J[y]);
      }
      function Q(J) {
        return Te;
        function Te(me) {
          return re = Z(), oe = J, J.partial || (l.currentConstruct = J), S(
            l.parser.constructs.disable.null,
            "expected `disable.null` to be populated"
          ), J.name && l.parser.constructs.disable.null.includes(J.name) ? fe(me) : J.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            F ? Object.assign(Object.create(l), F) : l,
            d,
            le,
            fe
          )(me);
        }
      }
      function le(J) {
        return S(J === m, "expected code"), c = !0, A(oe, re), z;
      }
      function fe(J) {
        return S(J === m, "expected code"), c = !0, re.restore(), ++y < _e.length ? Q(_e[y]) : xe;
      }
    }
  }
  function ne(A, F) {
    A.resolveAll && !a.includes(A) && a.push(A), A.resolve && St(
      l.events,
      F,
      l.events.length - F,
      A.resolve(l.events.slice(F), l)
    ), A.resolveTo && (l.events = A.resolveTo(l.events, l)), S(
      A.partial || l.events.length === 0 || l.events[l.events.length - 1][0] === "exit",
      "expected last token to end"
    );
  }
  function Z() {
    const A = M(), F = l.previous, K = l.currentConstruct, se = l.events.length, z = Array.from(s);
    return { from: se, restore: xe };
    function xe() {
      r = A, l.previous = F, l.currentConstruct = K, l.events.length = se, s = z, H(), Bt("position: restore: `%j`", r);
    }
  }
  function H() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function e1(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex;
  let o;
  if (n === i)
    S(a > -1, "expected non-negative end buffer index"), S(r > -1, "expected non-negative start buffer index"), o = [e[n].slice(r, a)];
  else {
    if (o = e.slice(n, i), r > -1) {
      const s = o[0];
      typeof s == "string" ? o[0] = s.slice(r) : (S(r === 0, "expected `startBufferIndex` to be `0`"), o.shift());
    }
    a > 0 && o.push(e[i].slice(0, a));
  }
  return o;
}
function t1(e, t) {
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
          o = gt.cr;
          break;
        }
        case p.lineFeed: {
          o = gt.lf;
          break;
        }
        case p.carriageReturnLineFeed: {
          o = gt.cr + gt.lf;
          break;
        }
        case p.horizontalTab: {
          o = t ? gt.space : gt.ht;
          break;
        }
        case p.virtualSpace: {
          if (!t && i) continue;
          o = gt.space;
          break;
        }
        default:
          S(typeof a == "number", "expected number"), o = String.fromCharCode(a);
      }
    i = a === p.horizontalTab, r.push(o);
  }
  return r.join("");
}
function n1(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      ac([qu, ...(e || {}).extensions || []])
    ),
    content: i(pc),
    defined: [],
    document: i(gc),
    flow: i(Nu),
    lazy: {},
    string: i(Du),
    text: i(Pu)
  };
  return r;
  function i(a) {
    return o;
    function o(s) {
      return Qu(r, a, s);
    }
  }
}
function r1(e) {
  for (; !za(e); )
    ;
  return e;
}
const Pi = /[\0\t\n\r]/g;
function i1() {
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
const a1 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function o1(e) {
  return e.replace(a1, s1);
}
function s1(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === p.numberSign) {
    const i = n.charCodeAt(1), a = i === p.lowercaseX || i === p.uppercaseX;
    return Oa(
      n.slice(a ? 2 : 1),
      a ? U.numericBaseHexadecimal : U.numericBaseDecimal
    );
  }
  return Ur(n) || e;
}
const $a = {}.hasOwnProperty;
function l1(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), c1(n)(
    r1(
      n1(n).document().write(i1()(e, t, !0))
    )
  );
}
function c1(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(Et),
      autolinkProtocol: W,
      autolinkEmail: W,
      atxHeading: a(Je),
      blockQuote: a(me),
      characterEscape: W,
      characterReference: W,
      codeFenced: a(Le),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: a(Le, o),
      codeText: a(ot, o),
      codeTextData: W,
      data: W,
      codeFlowValue: W,
      definition: a(Ye),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: a(xt),
      hardBreakEscape: a(kt),
      hardBreakTrailing: a(kt),
      htmlFlow: a(Tt, o),
      htmlFlowData: W,
      htmlText: a(Tt, o),
      htmlTextData: W,
      image: a(ut),
      label: o,
      link: a(Et),
      listItem: a(Ft),
      listItemValue: m,
      listOrdered: a(bt, f),
      listUnordered: a(bt),
      paragraph: a(Ht),
      reference: C,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: a(Je),
      strong: a(Vt),
      thematicBreak: a(Qe)
    },
    exit: {
      atxHeading: c(),
      atxHeadingSequence: N,
      autolink: c(),
      autolinkEmail: Te,
      autolinkProtocol: J,
      blockQuote: c(),
      characterEscapeValue: ne,
      characterReferenceMarkerHexadecimal: Q,
      characterReferenceMarkerNumeric: Q,
      characterReferenceValue: le,
      characterReference: fe,
      codeFenced: c(M),
      codeFencedFence: x,
      codeFencedFenceInfo: g,
      codeFencedFenceMeta: k,
      codeFlowValue: ne,
      codeIndented: c(T),
      codeText: c(K),
      codeTextData: ne,
      data: ne,
      definition: c(),
      definitionDestinationString: P,
      definitionLabelString: I,
      definitionTitleString: D,
      emphasis: c(),
      hardBreakEscape: c(H),
      hardBreakTrailing: c(H),
      htmlFlow: c(A),
      htmlFlowData: ne,
      htmlText: c(F),
      htmlTextData: ne,
      image: c(z),
      label: _e,
      labelText: xe,
      lineEnding: Z,
      link: c(se),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: he,
      resourceDestinationString: y,
      resourceTitleString: oe,
      resource: re,
      setextHeading: c(X),
      setextHeadingLineSequence: j,
      setextHeadingText: E,
      strong: c(),
      thematicBreak: c()
    }
  };
  ja(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(b) {
    let _ = { type: "root", children: [] };
    const B = {
      stack: [_],
      tokenStack: [],
      config: t,
      enter: s,
      exit: d,
      buffer: o,
      resume: l,
      data: n
    }, $ = [];
    let ce = -1;
    for (; ++ce < b.length; )
      if (b[ce][1].type === h.listOrdered || b[ce][1].type === h.listUnordered)
        if (b[ce][0] === "enter")
          $.push(ce);
        else {
          const Ee = $.pop();
          S(typeof Ee == "number", "expected list ot be open"), ce = i(b, Ee, ce);
        }
    for (ce = -1; ++ce < b.length; ) {
      const Ee = t[b[ce][0]];
      $a.call(Ee, b[ce][1].type) && Ee[b[ce][1].type].call(
        Object.assign(
          { sliceSerialize: b[ce][2].sliceSerialize },
          B
        ),
        b[ce][1]
      );
    }
    if (B.tokenStack.length > 0) {
      const Ee = B.tokenStack[B.tokenStack.length - 1];
      (Ee[1] || Fi).call(B, void 0, Ee[0]);
    }
    for (_.position = {
      start: Ot(
        b.length > 0 ? b[0][1].start : { line: 1, column: 1, offset: 0 }
      ),
      end: Ot(
        b.length > 0 ? b[b.length - 2][1].end : { line: 1, column: 1, offset: 0 }
      )
    }, ce = -1; ++ce < t.transforms.length; )
      _ = t.transforms[ce](_) || _;
    return _;
  }
  function i(b, _, B) {
    let $ = _ - 1, ce = -1, Ee = !1, et, Oe, tt, ve;
    for (; ++$ <= B; ) {
      const Se = b[$];
      switch (Se[1].type) {
        case h.listUnordered:
        case h.listOrdered:
        case h.blockQuote: {
          Se[0] === "enter" ? ce++ : ce--, ve = void 0;
          break;
        }
        case h.lineEndingBlank: {
          Se[0] === "enter" && (et && !ve && !ce && !tt && (tt = $), ve = void 0);
          break;
        }
        case h.linePrefix:
        case h.listItemValue:
        case h.listItemMarker:
        case h.listItemPrefix:
        case h.listItemPrefixWhitespace:
          break;
        default:
          ve = void 0;
      }
      if (!ce && Se[0] === "enter" && Se[1].type === h.listItemPrefix || ce === -1 && Se[0] === "exit" && (Se[1].type === h.listUnordered || Se[1].type === h.listOrdered)) {
        if (et) {
          let je = $;
          for (Oe = void 0; je--; ) {
            const He = b[je];
            if (He[1].type === h.lineEnding || He[1].type === h.lineEndingBlank) {
              if (He[0] === "exit") continue;
              Oe && (b[Oe][1].type = h.lineEndingBlank, Ee = !0), He[1].type = h.lineEnding, Oe = je;
            } else if (!(He[1].type === h.linePrefix || He[1].type === h.blockQuotePrefix || He[1].type === h.blockQuotePrefixWhitespace || He[1].type === h.blockQuoteMarker || He[1].type === h.listItemIndent)) break;
          }
          tt && (!Oe || tt < Oe) && (et._spread = !0), et.end = Object.assign(
            {},
            Oe ? b[Oe][1].start : Se[1].end
          ), b.splice(Oe || $, 0, ["exit", et, Se[2]]), $++, B++;
        }
        if (Se[1].type === h.listItemPrefix) {
          const je = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Se[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          et = je, b.splice($, 0, ["enter", je, Se[2]]), $++, B++, tt = void 0, ve = !0;
        }
      }
    }
    return b[_][1]._spread = Ee, B;
  }
  function a(b, _) {
    return B;
    function B($) {
      s.call(this, b($), $), _ && _.call(this, $);
    }
  }
  function o() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function s(b, _, B) {
    const $ = this.stack[this.stack.length - 1];
    S($, "expected `parent`"), S("children" in $, "expected `parent`"), $.children.push(b), this.stack.push(b), this.tokenStack.push([_, B || void 0]), b.position = {
      start: Ot(_.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function c(b) {
    return _;
    function _(B) {
      b && b.call(this, B), d.call(this, B);
    }
  }
  function d(b, _) {
    const B = this.stack.pop();
    S(B, "expected `node`");
    const $ = this.tokenStack.pop();
    if ($)
      $[0].type !== b.type && (_ ? _.call(this, b, $[0]) : ($[1] || Fi).call(this, b, $[0]));
    else throw new Error(
      "Cannot close `" + b.type + "` (" + dn({ start: b.start, end: b.end }) + "): it’s not open"
    );
    S(B.type !== "fragment", "unexpected fragment `exit`ed"), S(B.position, "expected `position` to be defined"), B.position.end = Ot(b.end);
  }
  function l() {
    return rc(this.stack.pop());
  }
  function f() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(b) {
    if (this.data.expectingFirstListItemValue) {
      const _ = this.stack[this.stack.length - 2];
      S(_, "expected nodes on stack"), S(_.type === "list", "expected list on stack"), _.start = Number.parseInt(
        this.sliceSerialize(b),
        U.numericBaseDecimal
      ), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function g() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "code", "expected code on stack"), _.lang = b;
  }
  function k() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "code", "expected code on stack"), _.meta = b;
  }
  function x() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function M() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "code", "expected code on stack"), _.value = b.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function T() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "code", "expected code on stack"), _.value = b.replace(/(\r?\n|\r)$/g, "");
  }
  function I(b) {
    const _ = this.resume(), B = this.stack[this.stack.length - 1];
    S(B, "expected node on stack"), S(B.type === "definition", "expected definition on stack"), B.label = _, B.identifier = Yt(
      this.sliceSerialize(b)
    ).toLowerCase();
  }
  function D() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "definition", "expected definition on stack"), _.title = b;
  }
  function P() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "definition", "expected definition on stack"), _.url = b;
  }
  function N(b) {
    const _ = this.stack[this.stack.length - 1];
    if (S(_, "expected node on stack"), S(_.type === "heading", "expected heading on stack"), !_.depth) {
      const B = this.sliceSerialize(b).length;
      S(
        B === 1 || B === 2 || B === 3 || B === 4 || B === 5 || B === 6,
        "expected `depth` between `1` and `6`"
      ), _.depth = B;
    }
  }
  function E() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function j(b) {
    const _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "heading", "expected heading on stack"), _.depth = this.sliceSerialize(b).codePointAt(0) === p.equalsTo ? 1 : 2;
  }
  function X() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function W(b) {
    const _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S("children" in _, "expected parent on stack");
    const B = _.children;
    let $ = B[B.length - 1];
    (!$ || $.type !== "text") && ($ = _t(), $.position = {
      start: Ot(b.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, B.push($)), this.stack.push($);
  }
  function ne(b) {
    const _ = this.stack.pop();
    S(_, "expected a `node` to be on the stack"), S("value" in _, "expected a `literal` to be on the stack"), S(_.position, "expected `node` to have an open position"), _.value += this.sliceSerialize(b), _.position.end = Ot(b.end);
  }
  function Z(b) {
    const _ = this.stack[this.stack.length - 1];
    if (S(_, "expected `node`"), this.data.atHardBreak) {
      S("children" in _, "expected `parent`");
      const B = _.children[_.children.length - 1];
      S(B.position, "expected tail to have a starting position"), B.position.end = Ot(b.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(_.type) && (W.call(this, b), ne.call(this, b));
  }
  function H() {
    this.data.atHardBreak = !0;
  }
  function A() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "html", "expected html on stack"), _.value = b;
  }
  function F() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "html", "expected html on stack"), _.value = b;
  }
  function K() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "inlineCode", "expected inline code on stack"), _.value = b;
  }
  function se() {
    const b = this.stack[this.stack.length - 1];
    if (S(b, "expected node on stack"), S(b.type === "link", "expected link on stack"), this.data.inReference) {
      const _ = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = _, delete b.url, delete b.title;
    } else
      delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function z() {
    const b = this.stack[this.stack.length - 1];
    if (S(b, "expected node on stack"), S(b.type === "image", "expected image on stack"), this.data.inReference) {
      const _ = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = _, delete b.url, delete b.title;
    } else
      delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function xe(b) {
    const _ = this.sliceSerialize(b), B = this.stack[this.stack.length - 2];
    S(B, "expected ancestor on stack"), S(
      B.type === "image" || B.type === "link",
      "expected image or link on stack"
    ), B.label = o1(_), B.identifier = Yt(_).toLowerCase();
  }
  function _e() {
    const b = this.stack[this.stack.length - 1];
    S(b, "expected node on stack"), S(b.type === "fragment", "expected fragment on stack");
    const _ = this.resume(), B = this.stack[this.stack.length - 1];
    if (S(B, "expected node on stack"), S(
      B.type === "image" || B.type === "link",
      "expected image or link on stack"
    ), this.data.inReference = !0, B.type === "link") {
      const $ = b.children;
      B.children = $;
    } else
      B.alt = _;
  }
  function y() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(
      _.type === "image" || _.type === "link",
      "expected image or link on stack"
    ), _.url = b;
  }
  function oe() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(
      _.type === "image" || _.type === "link",
      "expected image or link on stack"
    ), _.title = b;
  }
  function re() {
    this.data.inReference = void 0;
  }
  function C() {
    this.data.referenceType = "collapsed";
  }
  function he(b) {
    const _ = this.resume(), B = this.stack[this.stack.length - 1];
    S(B, "expected node on stack"), S(
      B.type === "image" || B.type === "link",
      "expected image reference or link reference on stack"
    ), B.label = _, B.identifier = Yt(
      this.sliceSerialize(b)
    ).toLowerCase(), this.data.referenceType = "full";
  }
  function Q(b) {
    S(
      b.type === "characterReferenceMarkerNumeric" || b.type === "characterReferenceMarkerHexadecimal"
    ), this.data.characterReferenceType = b.type;
  }
  function le(b) {
    const _ = this.sliceSerialize(b), B = this.data.characterReferenceType;
    let $;
    if (B)
      $ = Oa(
        _,
        B === h.characterReferenceMarkerNumeric ? U.numericBaseDecimal : U.numericBaseHexadecimal
      ), this.data.characterReferenceType = void 0;
    else {
      const Ee = Ur(_);
      S(Ee !== !1, "expected reference to decode"), $ = Ee;
    }
    const ce = this.stack[this.stack.length - 1];
    S(ce, "expected `node`"), S("value" in ce, "expected `node.value`"), ce.value += $;
  }
  function fe(b) {
    const _ = this.stack.pop();
    S(_, "expected `node`"), S(_.position, "expected `node.position`"), _.position.end = Ot(b.end);
  }
  function J(b) {
    ne.call(this, b);
    const _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "link", "expected link on stack"), _.url = this.sliceSerialize(b);
  }
  function Te(b) {
    ne.call(this, b);
    const _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "link", "expected link on stack"), _.url = "mailto:" + this.sliceSerialize(b);
  }
  function me() {
    return { type: "blockquote", children: [] };
  }
  function Le() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function ot() {
    return { type: "inlineCode", value: "" };
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
  function xt() {
    return { type: "emphasis", children: [] };
  }
  function Je() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function kt() {
    return { type: "break" };
  }
  function Tt() {
    return { type: "html", value: "" };
  }
  function ut() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function Et() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function bt(b) {
    return {
      type: "list",
      ordered: b.type === "listOrdered",
      start: null,
      spread: b._spread,
      children: []
    };
  }
  function Ft(b) {
    return {
      type: "listItem",
      spread: b._spread,
      checked: null,
      children: []
    };
  }
  function Ht() {
    return { type: "paragraph", children: [] };
  }
  function Vt() {
    return { type: "strong", children: [] };
  }
  function _t() {
    return { type: "text", value: "" };
  }
  function Qe() {
    return { type: "thematicBreak" };
  }
}
function Ot(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function ja(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? ja(e, r) : u1(e, r);
  }
}
function u1(e, t) {
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
    "Cannot close `" + e.type + "` (" + dn({ start: e.start, end: e.end }) + "): a different token (`" + t.type + "`, " + dn({ start: t.start, end: t.end }) + ") is open"
  ) : new Error(
    "Cannot close document, a token (`" + t.type + "`, " + dn({ start: t.start, end: t.end }) + ") is still open"
  );
}
function d1(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return l1(r, {
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
function h1(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function p1(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function f1(e, t) {
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
function g1(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function m1(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function C1(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = en(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
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
function y1(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function w1(e, t) {
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
function S1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return qa(e, t);
  const i = { src: en(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function x1(e, t) {
  const n = { src: en(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function k1(e, t) {
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
function T1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return qa(e, t);
  const i = { href: en(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function E1(e, t) {
  const n = { href: en(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function b1(e, t, n) {
  const r = e.all(t), i = n ? _1(n) : Za(t), a = {}, o = [];
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
function _1(e) {
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
function v1(e, t) {
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
function I1(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function R1(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function M1(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function A1(e, t) {
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
    }, s = Pr(t.children[1]), c = va(t.children[t.children.length - 1]);
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
function N1(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, s = o ? o.length : t.children.length;
  let c = -1;
  const d = [];
  for (; ++c < s; ) {
    const f = t.children[c], m = {}, g = o ? o[c] : void 0;
    g && (m.align = g);
    let k = { type: "element", tagName: a, properties: m, children: [] };
    f && (k.children = e.all(f), e.patch(f, k), k = e.applyData(f, k)), d.push(k);
  }
  const l = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(d, !0)
  };
  return e.patch(t, l), e.applyData(t, l);
}
function L1(e, t) {
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
function O1(e) {
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
function D1(e, t) {
  const n = { type: "text", value: O1(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function P1(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const F1 = {
  blockquote: h1,
  break: p1,
  code: f1,
  delete: g1,
  emphasis: m1,
  footnoteReference: C1,
  heading: y1,
  html: w1,
  imageReference: S1,
  image: x1,
  inlineCode: k1,
  linkReference: T1,
  link: E1,
  listItem: b1,
  list: v1,
  paragraph: I1,
  // @ts-expect-error: root is different, but hard to type.
  root: R1,
  strong: M1,
  table: A1,
  tableCell: L1,
  tableRow: N1,
  text: D1,
  thematicBreak: P1,
  toml: Rn,
  yaml: Rn,
  definition: Rn,
  footnoteDefinition: Rn
};
function Rn() {
}
const Ka = -1, Vn = 0, pn = 1, zn = 2, Gr = 3, Vr = 4, $r = 5, jr = 6, Xa = 7, Ya = 8, Bi = typeof self == "object" ? self : globalThis, H1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, o] = t[i];
    switch (a) {
      case Vn:
      case Ka:
        return n(o, i);
      case pn: {
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
      case Gr:
        return n(new Date(o), i);
      case Vr: {
        const { source: s, flags: c } = o;
        return n(new RegExp(s, c), i);
      }
      case $r: {
        const s = n(/* @__PURE__ */ new Map(), i);
        for (const [c, d] of o)
          s.set(r(c), r(d));
        return s;
      }
      case jr: {
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
}, Wi = (e) => H1(/* @__PURE__ */ new Map(), e)(0), qt = "", { toString: z1 } = {}, { keys: U1 } = Object, un = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Vn, t];
  const n = z1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [pn, qt];
    case "Object":
      return [zn, qt];
    case "Date":
      return [Gr, qt];
    case "RegExp":
      return [Vr, qt];
    case "Map":
      return [$r, qt];
    case "Set":
      return [jr, qt];
    case "DataView":
      return [pn, n];
  }
  return n.includes("Array") ? [pn, n] : n.includes("Error") ? [Xa, n] : [zn, n];
}, Mn = ([e, t]) => e === Vn && (t === "function" || t === "symbol"), B1 = (e, t, n, r) => {
  const i = (o, s) => {
    const c = r.push(o) - 1;
    return n.set(s, c), c;
  }, a = (o) => {
    if (n.has(o))
      return n.get(o);
    let [s, c] = un(o);
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
      case pn: {
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
        for (const m of U1(o))
          (e || !Mn(un(o[m]))) && l.push([a(m), a(o[m])]);
        return f;
      }
      case Gr:
        return i([s, o.toISOString()], o);
      case Vr: {
        const { source: l, flags: f } = o;
        return i([s, { source: l, flags: f }], o);
      }
      case $r: {
        const l = [], f = i([s, l], o);
        for (const [m, g] of o)
          (e || !(Mn(un(m)) || Mn(un(g)))) && l.push([a(m), a(g)]);
        return f;
      }
      case jr: {
        const l = [], f = i([s, l], o);
        for (const m of o)
          (e || !Mn(un(m))) && l.push(a(m));
        return f;
      }
    }
    const { message: d } = o;
    return i([s, { name: c, message: d }], o);
  };
  return a;
}, Gi = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return B1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, Un = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Wi(Gi(e, t)) : structuredClone(e)
) : (e, t) => Wi(Gi(e, t));
function W1(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function G1(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function V1(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || W1, r = e.options.footnoteBackLabel || G1, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, s = [];
  let c = -1;
  for (; ++c < e.footnoteOrder.length; ) {
    const d = e.footnoteById.get(
      e.footnoteOrder[c]
    );
    if (!d)
      continue;
    const l = e.all(d), f = String(d.identifier).toUpperCase(), m = en(f.toLowerCase());
    let g = 0;
    const k = [], x = e.footnoteCounts.get(f);
    for (; x !== void 0 && ++g <= x; ) {
      k.length > 0 && k.push({ type: "text", value: " " });
      let I = typeof n == "string" ? n : n(c, g);
      typeof I == "string" && (I = { type: "text", value: I }), k.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + m + (g > 1 ? "-" + g : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(c, g),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(I) ? I : [I]
      });
    }
    const M = l[l.length - 1];
    if (M && M.type === "element" && M.tagName === "p") {
      const I = M.children[M.children.length - 1];
      I && I.type === "text" ? I.value += " " : M.children.push({ type: "text", value: " " }), M.children.push(...k);
    } else
      l.push(...k);
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
      return Z1;
    if (typeof e == "function")
      return $n(e);
    if (typeof e == "object")
      return Array.isArray(e) ? $1(e) : j1(e);
    if (typeof e == "string")
      return q1(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function $1(e) {
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
function j1(e) {
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
function q1(e) {
  return $n(t);
  function t(n) {
    return n && n.type === e;
  }
}
function $n(e) {
  return t;
  function t(n, r, i) {
    return !!(K1(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Z1() {
  return !0;
}
function K1(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Qa = [], X1 = !0, Vi = !1, Y1 = "skip";
function J1(e, t, n, r) {
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
      let g = Qa, k, x, M;
      if ((!t || a(c, d, l[l.length - 1] || void 0)) && (g = Q1(n(c, l)), g[0] === Vi))
        return g;
      if ("children" in c && c.children) {
        const T = (
          /** @type {UnistParent} */
          c
        );
        if (T.children && g[0] !== Y1)
          for (x = (r ? T.children.length : -1) + o, M = l.concat(T); x > -1 && x < T.children.length; ) {
            const I = T.children[x];
            if (k = s(I, x, M)(), k[0] === Vi)
              return k;
            x = typeof k[1] == "number" ? k[1] : x + o;
          }
      }
      return g;
    }
  }
}
function Q1(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [X1, e] : e == null ? Qa : [e];
}
function eo(e, t, n, r) {
  let i, a, o;
  typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), J1(e, a, s, i);
  function s(c, d) {
    const l = d[d.length - 1], f = l ? l.children.indexOf(c) : void 0;
    return o(c, f, l);
  }
}
const Ir = {}.hasOwnProperty, ed = {};
function td(e, t) {
  const n = t || ed, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = { ...F1, ...n.handlers }, s = {
    all: d,
    applyData: rd,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: o,
    one: c,
    options: n,
    patch: nd,
    wrap: ad
  };
  return eo(e, function(l) {
    if (l.type === "definition" || l.type === "footnoteDefinition") {
      const f = l.type === "definition" ? r : i, m = String(l.identifier).toUpperCase();
      f.has(m) || f.set(m, l);
    }
  }), s;
  function c(l, f) {
    const m = l.type, g = s.handlers[m];
    if (Ir.call(s.handlers, m) && g)
      return g(s, l, f);
    if (s.options.passThrough && s.options.passThrough.includes(m)) {
      if ("children" in l) {
        const { children: x, ...M } = l, T = Un(M);
        return T.children = s.all(l), T;
      }
      return Un(l);
    }
    return (s.options.unknownHandler || id)(s, l, f);
  }
  function d(l) {
    const f = [];
    if ("children" in l) {
      const m = l.children;
      let g = -1;
      for (; ++g < m.length; ) {
        const k = s.one(m[g], l);
        if (k) {
          if (g && m[g - 1].type === "break" && (!Array.isArray(k) && k.type === "text" && (k.value = $i(k.value)), !Array.isArray(k) && k.type === "element")) {
            const x = k.children[0];
            x && x.type === "text" && (x.value = $i(x.value));
          }
          Array.isArray(k) ? f.push(...k) : f.push(k);
        }
      }
    }
    return f;
  }
}
function nd(e, t) {
  e.position && (t.position = Dl(e));
}
function rd(e, t) {
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
function id(e, t) {
  const n = t.data || {}, r = "value" in t && !(Ir.call(n, "hProperties") || Ir.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function ad(e, t) {
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
  const n = td(e, t), r = n.one(e, void 0), i = V1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && (S("children" in a), a.children.push({ type: "text", value: `
` }, i)), a;
}
function od(e, t) {
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
}, sd = function e() {
  var t, n, r, i, a, o, s = arguments[0], c = 1, d = arguments.length, l = !1;
  for (typeof s == "boolean" && (l = s, s = arguments[1] || {}, c = 2), (s == null || typeof s != "object" && typeof s != "function") && (s = {}); c < d; ++c)
    if (t = arguments[c], t != null)
      for (n in t)
        r = Qi(s, n), i = Qi(t, n), s !== i && (l && i && (Yi(i) || (a = Xi(i))) ? (a ? (a = !1, o = r && Xi(r) ? r : []) : o = r && Yi(r) ? r : {}, Ji(s, { name: n, newValue: e(l, o, i) })) : typeof i < "u" && Ji(s, { name: n, newValue: i }));
  return s;
};
const or = /* @__PURE__ */ Or(sd);
function Rr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function ld() {
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
      i = d, l ? cd(l, s)(...d) : o(null, ...d);
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
function cd(e, t) {
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
const ft = { basename: ud, dirname: dd, extname: hd, join: pd, sep: "/" };
function ud(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  Cn(e);
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
function dd(e) {
  if (Cn(e), e.length === 0)
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
function hd(e) {
  Cn(e);
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
function pd(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    Cn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : fd(n);
}
function fd(e) {
  Cn(e);
  const t = e.codePointAt(0) === 47;
  let n = gd(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function gd(e, t) {
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
function Cn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const md = { cwd: Cd };
function Cd() {
  return "/";
}
function Mr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function yd(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Mr(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return wd(e);
}
function wd(e) {
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
const sr = (
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
    t ? Mr(t) ? n = { path: t } : typeof t == "string" || Sd(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : md.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < sr.length; ) {
      const a = sr[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      sr.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? ft.basename(this.path) : void 0;
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
    cr(t, "basename"), lr(t, "basename"), this.path = ft.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? ft.dirname(this.path) : void 0;
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
    ea(this.basename, "dirname"), this.path = ft.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? ft.extname(this.path) : void 0;
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
    if (lr(t, "extname"), ea(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ft.join(this.dirname, this.stem + (t || ""));
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
    Mr(t) && (t = yd(t)), cr(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? ft.basename(this.path, this.extname) : void 0;
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
    cr(t, "stem"), lr(t, "stem"), this.path = ft.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new Be(
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
function lr(e, t) {
  if (e && e.includes(ft.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ft.sep + "`"
    );
}
function cr(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function ea(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function Sd(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const xd = (
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
), kd = {}.hasOwnProperty;
class qr extends xd {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = ld();
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
      new qr()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(or(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (hr("data", this.frozen), this.namespace[t] = n, this) : kd.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (hr("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    return ur("parse", r), r(String(n), n);
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
    return this.freeze(), ur("process", this.parser || this.Parser), dr("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
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
        ), k = r.stringify(g, m);
        bd(k) ? m.value = k : m.result = k, d(
          l,
          /** @type {VFileWithOutput<CompileResult>} */
          m
        );
      });
      function d(l, f) {
        l || !f ? o(l) : a ? a(f) : (S(n, "`done` is defined if `resolve` is not"), n(void 0, f));
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
    return this.freeze(), ur("processSync", this.parser || this.Parser), dr("processSync", this.compiler || this.Compiler), this.process(t, i), na("processSync", "process", n), S(r, "we either bailed on an error or have a tree"), r;
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
      S(
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
        l ? s(l) : o ? o(g) : (S(r, "`done` is defined if `resolve` is not"), r(void 0, g, m));
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
    return this.run(t, n, a), na("runSync", "run", r), S(i, "we either bailed on an error or have a tree"), i;
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
    return dr("stringify", i), ta(t), i(t, r);
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
    if (hr("use", this.frozen), t != null) if (typeof t == "function")
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
      s(d.plugins), d.settings && (i.settings = or(!0, i.settings, d.settings));
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
        let [g, ...k] = l;
        const x = r[m][1];
        Rr(x) && Rr(g) && (g = or(!0, x, g)), r[m] = [d, g, ...k];
      }
    }
  }
}
const Td = new qr().freeze();
function ur(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function dr(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function hr(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function ta(e) {
  if (!Rr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function na(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function An(e) {
  return Ed(e) ? e : new no(e);
}
function Ed(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function bd(e) {
  return typeof e == "string" || _d(e);
}
function _d(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const vd = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", ra = [], ia = { allowDangerousHtml: !0 }, Id = /^(https?|ircs?|mailto|xmpp)$/i, Rd = [
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
  const t = Md(e), n = Ad(e);
  return Nd(t.runSync(t.parse(n), n), e);
}
function Md(e) {
  const t = e.rehypePlugins || ra, n = e.remarkPlugins || ra, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...ia } : ia;
  return Td().use(d1).use(n).use(od, r).use(t);
}
function Ad(e) {
  const t = e.children || "", n = new no();
  return typeof t == "string" ? n.value = t : yr(
    "Unexpected value `" + t + "` for `children` prop, expected `string`"
  ), n;
}
function Nd(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, s = t.unwrapDisallowed, c = t.urlTransform || Ld;
  for (const l of Rd)
    Object.hasOwn(t, l.from) && yr(
      "Unexpected `" + l.from + "` prop, " + (l.to ? "use `" + l.to + "` instead" : "remove it") + " (see <" + vd + "#" + l.id + "> for more info)"
    );
  return n && a && yr(
    "Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other"
  ), eo(e, d), Ul(e, {
    Fragment: wt,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: u,
    jsxs: v,
    passKeys: !0,
    passNode: !0
  });
  function d(l, f, m) {
    if (l.type === "raw" && m && typeof f == "number")
      return o ? m.children.splice(f, 1) : m.children[f] = { type: "text", value: l.value }, f;
    if (l.type === "element") {
      let g;
      for (g in nr)
        if (Object.hasOwn(nr, g) && Object.hasOwn(l.properties, g)) {
          const k = l.properties[g], x = nr[g];
          (x === null || x.includes(l.tagName)) && (l.properties[g] = c(String(k || ""), g, l));
        }
    }
    if (l.type === "element") {
      let g = n ? !n.includes(l.tagName) : a ? a.includes(l.tagName) : !1;
      if (!g && r && typeof f == "number" && (g = !r(l, f, m)), g && m && typeof f == "number")
        return s && l.children ? m.children.splice(f, 1, ...l.children) : m.children.splice(f, 1), f;
    }
  }
}
function Ld(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    Id.test(e.slice(0, t)) ? e : ""
  );
}
function Od({ children: e, isStreaming: t }) {
  const [n, r] = pe(!0), [i, a] = pe(!1);
  mt.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const o = () => {
    t || r(!n);
  }, s = mt.Children.map(e, (c) => {
    if (mt.isValidElement(c)) {
      if (c.type === ro)
        return mt.cloneElement(
          c,
          {
            onToggle: o,
            isExpanded: n
          }
        );
      if (c.type === io)
        return mt.cloneElement(
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
  const a = () => /* @__PURE__ */ v(
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
  return /* @__PURE__ */ v(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${o ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: o ? r : void 0,
      style: { cursor: o ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ u("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ v("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ u("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        o && /* @__PURE__ */ u(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ v(
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
function Dd({ children: e }) {
  return /* @__PURE__ */ u("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function Pd({
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
        return /* @__PURE__ */ v("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ v(
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
          ) : /* @__PURE__ */ v(
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
          /* @__PURE__ */ v("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
        return /* @__PURE__ */ v("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ v(
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
          ) : /* @__PURE__ */ v(
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
          /* @__PURE__ */ v("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
        return /* @__PURE__ */ v("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
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
        return /* @__PURE__ */ v("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ v(
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
          ) : /* @__PURE__ */ v(
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
          /* @__PURE__ */ v("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
  return t === "dots" ? /* @__PURE__ */ v("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
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
const Fd = ({ message: e }) => {
  const [t, n] = pe(!0);
  return /* @__PURE__ */ v("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ v(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!t),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          e.role === "system" ? /* @__PURE__ */ v("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
          /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
  return Re(() => (t ? (document.addEventListener("keydown", i), document.body.style.overflow = "hidden") : (document.removeEventListener("keydown", i), document.body.style.overflow = ""), () => {
    document.removeEventListener("keydown", i), document.body.style.overflow = "";
  }), [t, i]), !t || !e ? null : /* @__PURE__ */ v(
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
function Hd({ children: e, value: t }) {
  return /* @__PURE__ */ u(so.Provider, { value: t, children: e });
}
function yn() {
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
}, zd = {
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
    } = yn(), [l, f] = pe(!1), [m, g] = pe(!1), [k, x] = pe(null), M = ae(async () => {
      try {
        await navigator.clipboard.writeText(e.content), f(!0), setTimeout(() => f(!1), 2e3);
      } catch (H) {
        console.error("Failed to copy message:", H);
      }
    }, [e.content]), T = ae(() => {
      d && d(e.id);
    }, [d, e.id]), I = ae((H) => {
      x(H);
    }, []), D = ae(() => {
      x(null);
    }, []), P = () => /* @__PURE__ */ v("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ u(ao, { size: 16, variant: "dots" }),
      /* @__PURE__ */ u("span", { children: te.UI_TEXT.THINKING })
    ] }), N = () => d && /* @__PURE__ */ u(
      "button",
      {
        className: "chat-wrapper__retry-button",
        onClick: T,
        children: "Retry"
      }
    ), E = () => /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ u(
        "button",
        {
          className: `chat-wrapper__copy-button ${m ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: M,
          title: "Copy message",
          children: /* @__PURE__ */ u(Bs, {})
        }
      ) }),
      l && /* @__PURE__ */ u("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), j = () => /* @__PURE__ */ u("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ v("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ u(aa, { components: lo, children: e.content }) }),
      E()
    ] }) }), X = () => /* @__PURE__ */ v("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ u(aa, { components: zd, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ u("div", { className: "chat-wrapper__media", children: e.media.map((H, A) => /* @__PURE__ */ u(
        "img",
        {
          src: H,
          alt: `Uploaded content ${A + 1}`,
          className: "chat-wrapper__media-image chat-wrapper__media-image--clickable",
          onClick: () => I(H),
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
        A
      )) })
    ] }), W = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === c.current ? P() : e.role === "system" ? /* @__PURE__ */ u(Fd, { message: e }) : e.role === "assistant" ? j() : X(), ne = () => /* @__PURE__ */ v(Od, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ u(
        ro,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ u(io, { children: i(e.content) })
    ] }), Z = () => {
      var H;
      return /* @__PURE__ */ u(Dd, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ u(
        Pd,
        {
          title: a(e.content, e.isStreaming),
          status: o(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (H = e.toolData) == null ? void 0 : H.toolName,
          clientTools: s
        }
      ) });
    };
    return /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u(
        "div",
        {
          className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
          onMouseEnter: () => e.role === "assistant" && g(!0),
          onMouseLeave: () => e.role === "assistant" && g(!1),
          children: e.role === "reasoning" ? ne() : e.role === "tooling" ? Z() : /* @__PURE__ */ v(wt, { children: [
            /* @__PURE__ */ u("div", { className: "chat-wrapper__message-content", children: W() }),
            e.role === "user" && e.hasError && !e.isRetrying && N()
          ] })
        }
      ),
      /* @__PURE__ */ u(
        oo,
        {
          imageUrl: k,
          isOpen: !!k,
          onClose: D,
          alt: "Message image"
        }
      )
    ] });
  }
);
co.displayName = "MessageItem";
const Ud = ({ isVisible: e }) => e ? /* @__PURE__ */ u("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ v("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ u("span", {}),
  /* @__PURE__ */ u("span", {}),
  /* @__PURE__ */ u("span", {})
] }) }) }) }) : null, uo = Bn((e, t) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = yn();
  return /* @__PURE__ */ v("div", { className: "chat-wrapper__messages", children: [
    n.map((a) => /* @__PURE__ */ u(
      co,
      {
        message: a
      },
      a.id
    )),
    /* @__PURE__ */ u(Ud, { isVisible: r && !i }),
    /* @__PURE__ */ u("div", { ref: t })
  ] });
});
uo.displayName = "MessagesList";
const ht = (...e) => e.filter(Boolean).join(" "), Bd = () => /* @__PURE__ */ v(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ v("g", { filter: "url(#filter0_dd_121_23927)", children: [
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
      /* @__PURE__ */ v("defs", { children: [
        /* @__PURE__ */ v(
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
), Wd = () => /* @__PURE__ */ v(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ v("g", { filter: "url(#filter0_dd_121_23927)", children: [
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
      /* @__PURE__ */ u("defs", { children: /* @__PURE__ */ v(
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
), Gd = ({ className: e, ...t }) => /* @__PURE__ */ u("form", { className: ht("chat-wrapper__prompt-input", e), ...t }), ho = Bn(
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
        className: ht("chat-wrapper__prompt-textarea", t),
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
const Vd = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u("div", { className: ht("chat-wrapper__prompt-toolbar", e), ...t }), $d = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u("div", { className: ht("chat-wrapper__prompt-tools", e), ...t }), jd = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || mt.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ u(
    "button",
    {
      className: ht(
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
}, qd = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = it.IDLE,
  children: i,
  disabled: a,
  ...o
}) => {
  const s = pr(r);
  let c = s ? /* @__PURE__ */ u(Wd, {}) : /* @__PURE__ */ u(Bd, {});
  return /* @__PURE__ */ u(
    "button",
    {
      className: ht(
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
}, gh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ u("select", { className: ht("chat-wrapper__prompt-select", e), ...n, children: t }), mh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ u(
  "button",
  {
    className: ht("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), Ch = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u(
  "div",
  {
    className: ht("chat-wrapper__prompt-select-content", e),
    ...t
  }
), yh = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ u(
  "div",
  {
    className: ht("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), wh = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ u(
  "span",
  {
    className: ht("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), Zd = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = pe(0), [a, o] = pe(!1), [s, c] = pe(0);
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
}, Kd = Bn((e, t) => {
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
    connectionState: k
  } = yn(), x = r || i || k !== rt.CONNECTED, M = k === rt.CONNECTED, T = l.length > 0, [I, D] = pe(""), [P, N] = pe([]), [E, j] = pe(!1), [X, W] = pe(null), [ne, Z] = pe(null), [H, A] = pe(!1), F = Pe(null), K = ae(
    (re) => {
      Z(re), A(!0);
    },
    []
  ), se = n && n.length > 0 ? n : ["What would you like to know?"], z = I.length === 0 && !T && se.length > 1;
  sa(t, () => ({
    focus: () => {
      var re;
      (re = F.current) == null || re.focus();
    },
    setText: (re) => {
      D(re), setTimeout(() => {
        if (F.current) {
          F.current.focus();
          const C = re.length;
          F.current.setSelectionRange(C, C);
        }
      }, 0);
    }
  }));
  const xe = ae(
    (re) => {
      re.preventDefault();
      const he = new FormData(re.currentTarget).get("message");
      if (he != null && he.trim()) {
        const Q = Fn(he.trim(), !1);
        if (!Q.trim()) {
          console.warn("Message was blocked due to security concerns");
          return;
        }
        f(Q, P), D(""), N([]);
      }
    },
    [f, P]
  ), _e = ae(
    (re) => {
      const he = re.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      D(he);
    },
    []
  ), y = ae(
    async (re) => {
      var Q;
      const he = Array.from(((Q = re.clipboardData) == null ? void 0 : Q.items) || []).filter((le) => le.type.startsWith("image/"));
      if (he.length > 0) {
        re.preventDefault();
        try {
          j(!0), W(null);
          const le = await Promise.all(
            he.map((fe) => {
              const J = fe.getAsFile();
              return J ? new File(
                [J],
                `clipboard-image-${Date.now()}.${J.type.split("/")[1]}`,
                {
                  type: J.type
                }
              ) : null;
            })
          ).then((fe) => fe.filter(Boolean));
          if (le.length > 0) {
            const fe = le.filter((J) => {
              const Te = (s == null ? void 0 : s.maxFileSize) ?? 15728640;
              if (J.size > Te)
                return console.warn(
                  `File too large: ${J.name} (${J.size} bytes)`
                ), W(`File too large. Maximum size is ${Math.round(Te / 1048576)}MB.`), !1;
              const me = (s == null ? void 0 : s.allowedTypes) ?? [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp"
              ];
              return me.includes(J.type) ? !0 : (console.warn(
                `File type not allowed: ${J.name} (${J.type})`
              ), W(
                `File type not supported. Allowed types: ${me.join(", ")}`
              ), !1);
            });
            if (fe.length > 0) {
              const J = (s == null ? void 0 : s.maxFiles) ?? 5;
              if (P.length + fe.length > J) {
                W(`Maximum ${J} files allowed. Currently ${P.length} files, trying to add ${fe.length} more.`);
                return;
              }
              const me = await m(fe);
              N([...P, ...me]), W(null);
            }
          }
        } catch (le) {
          console.error("Clipboard paste error:", le), W(
            le instanceof Error ? le.message : "Failed to paste image"
          );
        } finally {
          j(!1);
        }
      }
    },
    [m, s, P]
  ), oe = ae(async () => {
    const re = document.createElement("input");
    re.type = "file", re.accept = "image/*", re.multiple = !0, re.onchange = async (C) => {
      const he = C.target.files;
      if (he)
        try {
          j(!0), W(null);
          const Q = Array.from(he).filter((le) => {
            const fe = Ss(le.name);
            fe !== le.name && console.warn(
              `File name sanitized: ${le.name} -> ${fe}`
            );
            const J = (s == null ? void 0 : s.maxFileSize) ?? 15 * 1024 * 1024;
            if (le.size > J)
              return console.warn(`File too large: ${le.name} (${le.size} bytes)`), W(`File too large. Maximum size is ${Math.round(J / (1024 * 1024))}MB.`), !1;
            const Te = (s == null ? void 0 : s.allowedTypes) ?? [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ];
            return Te.includes(le.type) ? !0 : (console.warn(
              `File type not allowed: ${le.name} (${le.type})`
            ), W(
              `File type not supported. Allowed types: ${Te.join(", ")}`
            ), !1);
          });
          if (Q.length > 0) {
            const le = (s == null ? void 0 : s.maxFiles) ?? 5;
            if (P.length + Q.length > le) {
              W(`Maximum ${le} files allowed. Currently ${P.length} files, trying to add ${Q.length} more.`);
              return;
            }
            const J = await m(Q);
            N([...P, ...J]), W(null);
          }
        } catch (Q) {
          console.error("File upload error:", Q), W(
            Q instanceof Error ? Q.message : "Upload failed"
          );
        } finally {
          j(!1);
        }
    }, re.click();
  }, [m, s, P]);
  return /* @__PURE__ */ v(
    Gd,
    {
      onSubmit: xe,
      style: { position: "relative" },
      className: x ? "chat-wrapper__prompt-input--disabled" : "",
      children: [
        /* @__PURE__ */ u(
          ho,
          {
            ref: F,
            name: "message",
            value: I,
            onChange: _e,
            onPaste: y,
            placeholder: "",
            disabled: x
          }
        ),
        !I.trim() && M && /* @__PURE__ */ u(
          Zd,
          {
            placeholderTexts: se,
            shouldAnimate: z
          }
        ),
        E && /* @__PURE__ */ v(
          "div",
          {
            style: {
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#f8fafc",
              border: "1px dashed #cbd5e1",
              borderRadius: "8px",
              margin: "8px 0"
            },
            children: [
              /* @__PURE__ */ u(
                "div",
                {
                  style: {
                    width: "20px",
                    height: "20px",
                    border: "2px solid #e2e8f0",
                    borderTop: "2px solid #3b82f6",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }
                }
              ),
              /* @__PURE__ */ u("span", { style: { color: "#64748b", fontSize: "14px" }, children: "Uploading image..." })
            ]
          }
        ),
        X && /* @__PURE__ */ v(
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
              /* @__PURE__ */ v("span", { style: { color: "#ef4444", fontSize: "14px" }, children: [
                "❌ ",
                X
              ] }),
              /* @__PURE__ */ u(
                "button",
                {
                  onClick: () => W(null),
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
        P.length > 0 && /* @__PURE__ */ u(
          "div",
          {
            style: {
              padding: "8px 16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center"
            },
            children: P.map((re, C) => {
              const he = re.startsWith("data:image/"), Q = re.startsWith("http://") || re.startsWith("https://"), le = he || Q;
              return /* @__PURE__ */ v(
                "div",
                {
                  style: {
                    position: "relative",
                    display: "inline-block"
                  },
                  children: [
                    le ? /* @__PURE__ */ v(
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
                        onClick: () => K(re),
                        title: "Click to view full image",
                        children: [
                          /* @__PURE__ */ u(
                            "img",
                            {
                              src: re,
                              alt: `Attachment ${C + 1}`,
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
                    ) : /* @__PURE__ */ v(
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
                              children: /* @__PURE__ */ v(
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
                          /* @__PURE__ */ v("div", { style: { flex: 1, minWidth: 0 }, children: [
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
                                  const fe = re.match(/name=([^;]+)/);
                                  return fe ? decodeURIComponent(fe[1]) : "document.pdf";
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
                                  const fe = re.match(/data:([^;]+)/);
                                  if (fe) {
                                    const J = fe[1];
                                    switch (J) {
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
                                        const Te = J.split("/")[1];
                                        return Te ? Te.toUpperCase().substring(0, 4) : "FILE";
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
                            (fe) => fe.filter((J, Te) => Te !== C)
                          ), X && W(null);
                        },
                        style: {
                          position: "absolute",
                          top: le ? "6px" : "8px",
                          right: le ? "6px" : "8px",
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
                C
              );
            })
          }
        ),
        /* @__PURE__ */ v(Vd, { children: [
          /* @__PURE__ */ v($d, { children: [
            o && /* @__PURE__ */ v(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center"
                },
                children: [
                  /* @__PURE__ */ u(
                    jd,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: oe,
                      title: E ? "Uploading..." : P.length > 0 ? `${P.length}/${(s == null ? void 0 : s.maxFiles) ?? 5} image(s) attached` : `Attach images (max ${(s == null ? void 0 : s.maxFiles) ?? 5} files, ${Math.round(((s == null ? void 0 : s.maxFileSize) ?? 15 * 1024 * 1024) / (1024 * 1024))}MB each)`,
                      disabled: x || E,
                      style: {
                        position: "relative"
                      },
                      children: /* @__PURE__ */ v(
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
                      onClick: E ? void 0 : oe,
                      style: {
                        fontSize: "12px",
                        color: E ? "#94a3b8" : "#919EAB",
                        marginLeft: "4px",
                        cursor: E ? "not-allowed" : "pointer"
                      },
                      children: E ? "Uploading..." : `Attach ${P.length > 0 ? `(${P.length}/${(s == null ? void 0 : s.maxFiles) ?? 5})` : ""}`
                    }
                  )
                ]
              }
            ),
            o && c && /* @__PURE__ */ u("div", { className: "chat-wrapper__divider" }),
            c && /* @__PURE__ */ v("div", { className: "chat-wrapper__restaurant-chip", children: [
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
            qd,
            {
              status: a,
              disabled: pr(a) ? !1 : !I.trim() || x,
              onClick: pr(a) && g ? () => {
                g();
              } : void 0
            }
          )
        ] }),
        /* @__PURE__ */ u(
          oo,
          {
            imageUrl: ne,
            isOpen: H,
            onClose: () => {
              A(!1), Z(null);
            },
            alt: "Image preview"
          }
        )
      ]
    }
  );
}), Xd = () => {
  const { suggestedPrompts: e, chatInputRef: t } = yn();
  if (!e || e.length === 0)
    return null;
  const n = (r) => {
    t.current && t.current.setText(r.description);
  };
  return /* @__PURE__ */ v("div", { className: "chat-wrapper__suggested-prompts", children: [
    /* @__PURE__ */ u("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
    /* @__PURE__ */ u("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((r, i) => /* @__PURE__ */ u(
      "button",
      {
        className: "chat-wrapper__suggested-prompt-card",
        onClick: () => n(r),
        children: /* @__PURE__ */ v("div", { className: "chat-wrapper__suggested-prompt-content", children: [
          /* @__PURE__ */ u("h4", { className: "chat-wrapper__suggested-prompt-title", children: r.title }),
          /* @__PURE__ */ u("p", { className: "chat-wrapper__suggested-prompt-description", children: r.description })
        ] })
      },
      i
    )) })
  ] });
}, Yd = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ u(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ u("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ u(ao, { size: e, variant: "dots" }) })
  }
), Jd = ({
  headerName: e,
  headerDescription: t
}) => /* @__PURE__ */ v("div", { className: "chat-wrapper__main-header", children: [
  /* @__PURE__ */ u("h1", { className: "chat-wrapper__main-title", children: e }),
  t && /* @__PURE__ */ u("p", { className: "chat-wrapper__description", children: t })
] }), Qd = () => {
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
  } = yn(), d = Ct.state.shouldShowMainHeader(
    e.length,
    n,
    t
  ), l = Ct.state.shouldShowSuggestedPrompts(
    e.length,
    n,
    t,
    a
  ), f = Ct.state.getContentAreaClass(
    e.length,
    n,
    t
  );
  return /* @__PURE__ */ v(wt, { children: [
    d && /* @__PURE__ */ u("div", { style: c ? { paddingTop: "32px" } : void 0, children: /* @__PURE__ */ u(
      Jd,
      {
        headerName: r,
        headerDescription: i
      }
    ) }),
    /* @__PURE__ */ v(
      "div",
      {
        className: f,
        style: c ? { paddingTop: "32px" } : void 0,
        children: [
          t && e.length === 0 ? /* @__PURE__ */ u("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ u(Yd, { fullHeight: !0 }) }) : /* @__PURE__ */ u(uo, { ref: o }),
          /* @__PURE__ */ u("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ u(Kd, { ref: s }) }),
          l && /* @__PURE__ */ u(Xd, {})
        ]
      }
    )
  ] });
};
function eh({
  isVisible: e,
  isReconnecting: t = !1
}) {
  return e ? /* @__PURE__ */ u("div", { className: "network-status-banner", children: /* @__PURE__ */ u("div", { className: "network-status-banner__content", children: t ? /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ u("div", { className: "network-status-banner__spinner" }),
    /* @__PURE__ */ u("span", { children: "Reconnecting..." })
  ] }) : /* @__PURE__ */ v(wt, { children: [
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
    var tn, nn;
    const { token: d, entityId: l, entityType: f } = e;
    Ct.validation.validateAuthProps({
      userMpAuthToken: d,
      chatServerUrl: t,
      chatServerKey: n
    });
    const m = Ne(() => Ct.url.convertWebSocketToHttp(t), [t]), g = Ne(
      () => {
        var R, ue;
        return new As({
          apiUrl: m,
          userMpAuthToken: d,
          chatServerKey: n,
          maxFileSize: (R = i.fileUploadConfig) == null ? void 0 : R.maxFileSize,
          allowedTypes: (ue = i.fileUploadConfig) == null ? void 0 : ue.allowedTypes
        });
      },
      [m, d, n, i.fileUploadConfig]
    ), k = Ne(() => a && a.length > 0 ? a.map(({ execute: R, ...ue }) => ue) : [], [a]), x = vs(), { isOnline: M, wasOffline: T } = Ms(), I = Pe(!0), D = ee((R) => R.isModalOpen), P = ee((R) => R.isCollapsed), N = ee((R) => R.currentMode), E = ee((R) => R.openModal), j = ee((R) => R.closeModal), X = ee((R) => R.toggleCollapse), W = ee((R) => R.toggleFullscreen), ne = ee((R) => R.setCurrentMode), Z = ee((R) => R.chatStatus), H = ee((R) => R.setChatStatus), A = ee((R) => R.streamingStatus), F = ee((R) => R.setStreamingStatus), K = ee(
      (R) => R.isLoadingConversation
    ), se = ee(
      (R) => R.setIsLoadingConversation
    ), z = ee((R) => R.conversationError), xe = ee(
      (R) => R.setConversationError
    ), _e = ee((R) => R.setCurrentThreadId), y = ee((R) => R.providerResId), oe = ee((R) => R.setProviderResId), re = ee((R) => R.isDevSettingsOpen), C = ee(
      (R) => R.setIsDevSettingsOpen
    ), he = ee((R) => R.isStreaming), Q = ee((R) => R.setIsStreaming), le = ee((R) => R.isThinking), fe = ee((R) => R.setIsThinking), J = ee((R) => R.streamingContent), Te = ee((R) => R.isHandlingTool);
    Re(() => {
      i.mode && ne(i.mode);
    }, [i.mode, ne]), Re(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const R = (ue) => {
        ue.key === "Escape" && N === "modal" && D && j();
      };
      if (N === "modal" && D)
        return document.addEventListener("keydown", R), () => document.removeEventListener("keydown", R);
    }, [N, D, j]);
    const {
      messages: me,
      setMessages: Le,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: ot,
      getReasoningStatus: Ye,
      getReasoningDuration: xt,
      getReasoningContentOnly: Je,
      getReasoningTitle: kt,
      getToolingTitle: Tt,
      getToolingStatus: ut,
      handleSetMessage: Et,
      handleReasoningUpdate: bt,
      handleChatFinished: Ft,
      handleChatError: Ht,
      stopGeneration: Vt
    } = x, _t = Pe(null), Qe = Pe(null), b = Pe(null), _ = ae(
      (R) => {
        oe(R.providerResId), _e(R.threadId), R.canUpdateMetadata && r && Object.keys(r).length > 0 && b.current && b.current.updateMetadata(R.providerResId, { metadata: r }).then(() => {
          console.log("[ChatWrapper] ✅ Metadata update successful");
        }).catch((ue) => {
          console.error(
            "[ChatWrapper] ❌ Failed to update metadata:",
            ue
          );
        });
      },
      [oe, _e, r]
    ), B = ae(
      (R) => {
        var ue, Ce;
        switch (console.log("[ChatWrapper] System event received:", R), R.type) {
          case st.CHAT_COMPLETED:
            (ue = R.data) != null && ue.conversationId && oe(R.data.conversationId), Ft(), H(it.IDLE), F(Zt.IDLE), setTimeout(() => {
              var be;
              (be = Qe.current) == null || be.focus();
            }, 0);
            break;
          case st.CHAT_ERROR:
            (Ce = R.data) != null && Ce.error && Ht(R.data.error);
            break;
          case st.CONNECTION_LOST:
            break;
          case st.CONNECTION_RESTORED:
            break;
          case st.RECONNECTING:
            break;
        }
      },
      [
        Ft,
        Ht,
        oe,
        _e
      ]
    ), {
      chatClient: $,
      connectionState: ce,
      // reconnectAttempts: reconnectAttempt,
      connectChatClient: Ee
    } = Xo({
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
      onSetMessage: Et,
      onSystemEvent: B,
      onReasoningUpdate: bt,
      onThreadCreated: _
    });
    Re(() => {
      b.current = $;
    }, [$]), Rs({
      metadata: r,
      chatClient: $,
      currentProviderResId: y,
      isLoadingConversation: K,
      messages: me,
      entityId: l,
      entityType: f
    }), Re(() => {
      T && M && I.current ? (console.log(
        "[ChatWrapper] Network restored, attempting reconnection..."
      ), Ee().catch((R) => {
        const ue = Jt(
          R,
          "NetworkReconnection"
        );
        I.current = ue.isRetryable, ue.isRetryable || console.warn(
          `[ChatWrapper] Network reconnection failed with non-retryable error: ${ue.reason}`
        );
      })) : T && M && !I.current && console.warn(
        "[ChatWrapper] Network restored but last error was non-retryable (CORS/auth), skipping reconnection"
      );
    }, [M, T, Ee]);
    const et = ae(() => {
      console.log("[ChatWrapper] Stopping generation..."), Vt(), H(it.IDLE), F(Zt.IDLE), $ && y && $.stopRun(y);
    }, [Vt, H, F, $, y]);
    sa(
      c,
      () => ({
        updateMetadata: (R) => {
          if (!$) {
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
          $.updateMetadata(y, R).catch((ue) => {
            console.error(
              "ChatWrapper: Failed to update thread metadata:",
              ue
            );
          });
        }
      }),
      [$, y]
    );
    const Oe = Ne(
      () => $ ? new Ns($, {
        onError: i.onError
      }) : null,
      [$, i.onError]
    ), {
      resetConversationLoader: tt
      /*, reloadConversation*/
    } = Is({
      entityId: l,
      entityType: f,
      httpApiUrl: m,
      userMpAuthToken: d,
      chatServerKey: n,
      messages: me,
      setMessages: Le,
      setIsLoadingConversation: se,
      setConversationError: xe,
      setCurrentThreadId: _e,
      setProviderResId: oe,
      metadata: r
    }), ve = Pe(null), Se = ae(() => {
      ve.current && cancelAnimationFrame(ve.current), ve.current = requestAnimationFrame(() => {
        var R;
        (R = _t.current) == null || R.scrollIntoView({ behavior: "smooth" }), ve.current = null;
      });
    }, []);
    Re(() => {
      Se();
    }, [me, Se]), Re(() => {
      J && Se();
    }, [J, Se]), Re(() => {
      i.onStreamingStatusChange && i.onStreamingStatusChange(A);
    }, [A, i]), Re(() => () => {
      ve.current && cancelAnimationFrame(ve.current);
    }, []);
    const je = ae(
      async (R, ue) => {
        if (!R.trim() || he || !Oe || !$)
          return;
        Q(!0), fe(!0), H(it.SUBMITTED), F(Zt.STARTING);
        const Ce = Oe.createUserMessage(
          R,
          ue
        );
        Le((be) => [...be, Ce]);
        try {
          await $.onTriggerMessage({
            message: Ce.content,
            media: ue,
            providerResId: y || void 0
          }), H(it.STREAMING);
        } catch (be) {
          fe(!1), H(it.ERROR), Le(
            (Lt) => Lt.map(
              (Ut) => Ut.id === Ce.id ? {
                ...Ut,
                hasError: !0,
                errorMessage: ce !== rt.CONNECTED ? "Failed to send message." : be instanceof Error ? be.message : "Failed to send message"
              } : Ut
            )
          ), Q(!1), H(it.IDLE), F(Zt.IDLE);
        }
      },
      [
        Oe,
        $,
        he,
        ce,
        Le,
        Q,
        fe,
        H,
        F,
        y
      ]
    ), He = ae(
      async (R) => await g.uploadFiles(R),
      [g]
    ), jn = Ne(
      () => Ct.css.getContainerClasses(
        N,
        i.position,
        i.theme,
        P,
        i.constrainedHeight
      ),
      [
        N,
        i.position,
        i.theme,
        P,
        i.constrainedHeight
      ]
    ), $t = ae(() => {
      N === "modal" ? E() : X();
    }, [N, E, X]), zt = ae(() => {
      C(!0);
    }, [C]), wn = ae(
      (R) => {
        Qe.current && Qe.current.setText(R.description);
      },
      []
    ), Nt = Ne(
      () => ({
        messages: me,
        isStreaming: he,
        isThinking: le,
        isHandlingTool: Te
      }),
      [me, he, le, Te]
    ), Sn = Ne(
      () => ({
        isLoadingConversation: K,
        chatStatus: Z,
        conversationError: z,
        isOffline: !M,
        connectionState: ce
      }),
      [
        K,
        Z,
        z,
        M,
        ce
      ]
    ), xn = Ne(
      () => {
        var R, ue, Ce, be;
        return {
          headerName: i.headerName,
          headerDescription: i.headerDescription,
          placeholderTexts: i.placeholderTexts,
          chipName: i.chipName,
          chipLogo: i.chipLogo,
          suggestedPrompts: i.suggestedPrompts,
          clientTools: k,
          fileUploadEnabled: (R = i.features) == null ? void 0 : R.fileUpload,
          fileUploadConfig: {
            maxFiles: ((ue = i.fileUploadConfig) == null ? void 0 : ue.maxFiles) ?? 5,
            maxFileSize: ((Ce = i.fileUploadConfig) == null ? void 0 : Ce.maxFileSize) ?? 15 * 1024 * 1024,
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
        (tn = i.features) == null ? void 0 : tn.fileUpload,
        i.fileUploadConfig,
        k
      ]
    ), Ie = Ne(
      () => ({
        getReasoningTitle: kt,
        getReasoningStatus: Ye,
        getReasoningDuration: xt,
        getReasoningContentOnly: Je,
        getToolingTitle: Tt,
        getToolingStatus: ut
      }),
      [
        kt,
        Ye,
        xt,
        Je,
        Tt,
        ut
      ]
    ), vt = ae(
      async (R) => {
        const ue = me.find((Ce) => Ce.id === R);
        if (ue) {
          Le((Ce) => Ce.map(
            (be) => be.id === R ? {
              ...be,
              hasError: !1,
              isRetrying: !0,
              errorMessage: void 0
            } : be
          ));
          try {
            tt(), await Ee(), await ($ == null ? void 0 : $.onTriggerMessage({
              message: ue.content,
              media: ue.media,
              providerResId: y || void 0
            })), Le(
              (Ce) => Ce.map(
                (be) => be.id === R ? { ...be, isRetrying: !1 } : be
              )
            );
          } catch (Ce) {
            Le(
              (be) => be.map(
                (Lt) => Lt.id === R ? {
                  ...Lt,
                  isRetrying: !1,
                  hasError: !0,
                  errorMessage: Ce instanceof Error ? Ce.message : "Retry failed"
                } : Lt
              )
            );
          }
        }
      },
      [
        me,
        Le,
        tt,
        Ee,
        je
      ]
    ), kn = Ne(
      () => ({
        onSubmit: je,
        onFileUpload: He,
        onStopGeneration: et,
        onPromptSelect: wn,
        onRetryMessage: vt
      }),
      [
        je,
        He,
        et,
        wn,
        vt
      ]
    ), Tn = Ne(
      () => ({
        ...Nt,
        ...Sn,
        ...xn,
        ...Ie,
        ...kn,
        currentAssistantMessageIdRef: ot,
        messagesEndRef: _t,
        chatInputRef: Qe
      }),
      [
        Nt,
        Sn,
        xn,
        Ie,
        kn,
        ot,
        _t,
        Qe
      ]
    );
    return Ne(
      () => Ct.state.shouldShowBubble(
        N,
        D,
        P
      ),
      [N, D, P]
    ) ? /* @__PURE__ */ u(pi, { children: /* @__PURE__ */ u(
      Ws,
      {
        mode: N,
        headerName: i.headerName,
        bubbleText: i.bubbleText,
        showBubbleText: ((nn = i.features) == null ? void 0 : nn.showBubbleText) !== !1,
        onClick: $t
      }
    ) }) : /* @__PURE__ */ u(pi, { children: /* @__PURE__ */ u(
      Ds,
      {
        onError: (R) => {
          console.error("WebSocket error in ChatWrapper:", R), i.onError && i.onError(R);
        },
        children: /* @__PURE__ */ v("div", { className: jn, style: i.customStyles, children: [
          /* @__PURE__ */ u(
            eh,
            {
              isVisible: !M,
              isReconnecting: ce === rt.RECONNECTING
            }
          ),
          o && i.headerVisible === !1 && /* @__PURE__ */ u(
            "button",
            {
              className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
              onClick: zt,
              title: "Developer Settings",
              children: /* @__PURE__ */ u(ya, { size: 16 })
            }
          ),
          Ct.state.shouldShowHeader(i.headerVisible) && /* @__PURE__ */ u(
            Gs,
            {
              headerName: i.headerName,
              mode: N,
              isCollapsed: P,
              isModalOpen: D,
              devMode: o,
              onClose: j,
              onToggleFullscreen: W,
              onToggleCollapse: X,
              onOpenSettings: zt
            }
          ),
          !P && /* @__PURE__ */ u(
            Ps,
            {
              onError: (R) => {
                console.error("File upload error:", R), i.onError && i.onError(R);
              },
              children: /* @__PURE__ */ u(Hd, { value: Tn, children: /* @__PURE__ */ u(Qd, {}) })
            }
          ),
          /* @__PURE__ */ u(
            zo,
            {
              isOpen: re,
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
const Sh = oa(po);
function xh({
  isConnected: e,
  isConnecting: t = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 1 / 0,
  onRetry: a,
  autoHideDuration: o = 3e3
}) {
  const [s, c] = pe("hidden"), [d, l] = pe(!1);
  if (Re(() => {
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
  return g ? s === "connecting" ? /* @__PURE__ */ u("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ v("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ u("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ u("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ u("div", { className: "connection-notification__bubble" })
  ] }) }) : s === "reconnecting" ? (console.log("[ConnectionNotification] RENDERING RECONNECTING BANNER", { reconnectAttempt: r }), /* @__PURE__ */ u("div", { className: `connection-notification connection-notification--banner connection-notification--${s}`, children: /* @__PURE__ */ v("div", { className: "connection-notification__banner-content", children: [
    /* @__PURE__ */ u("span", { className: "connection-notification__banner-spinner" }),
    /* @__PURE__ */ v("span", { className: "connection-notification__banner-text", children: [
      "Reconnecting... (attempt ",
      r,
      ")"
    ] })
  ] }) })) : /* @__PURE__ */ u("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ v("div", { className: "connection-notification__content", children: [
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
  Zd as AnimatedPlaceholder,
  it as CHAT_STATUS,
  Fs as ChatIcon,
  Sh as ChatWrapper,
  Hs as CloseIcon,
  Us as CollapseIcon,
  xh as ConnectionNotification,
  Bs as CopyIcon,
  zo as DevSettings,
  wo as EntityType,
  zs as FullscreenIcon,
  Yd as InlineLoader,
  ao as Loader,
  Ue as PROCESSING_STATUS,
  Gd as PromptInput,
  jd as PromptInputButton,
  gh as PromptInputModelSelect,
  Ch as PromptInputModelSelectContent,
  yh as PromptInputModelSelectItem,
  mh as PromptInputModelSelectTrigger,
  wh as PromptInputModelSelectValue,
  qd as PromptInputSubmit,
  ho as PromptInputTextarea,
  Vd as PromptInputToolbar,
  $d as PromptInputTools,
  Od as Reasoning,
  io as ReasoningContent,
  ro as ReasoningTrigger,
  Zt as STREAMING_STATUS,
  ya as SettingsIcon,
  Xd as SuggestedPrompts,
  ko as fetchThreadMessages,
  pr as isChatActive,
  ah as isChatError,
  ih as isChatIdle,
  oh as isProcessingActive,
  sh as isProcessingComplete,
  lh as isProcessingError,
  la as updateThread,
  ca as updateThreadMetadata,
  uh as useChatState,
  dh as useConversationState,
  ph as useDevState,
  ch as useLayoutState,
  hh as useThreadState,
  fh as useUIState,
  ee as useUIStore
};
