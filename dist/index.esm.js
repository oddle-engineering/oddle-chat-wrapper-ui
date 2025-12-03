var go = Object.defineProperty;
var mo = (e, t, n) => t in e ? go(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var X = (e, t, n) => mo(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as u, jsxs as v, Fragment as wt } from "react/jsx-runtime";
import mt, { useState as ue, useEffect as ve, useCallback as ie, useRef as De, useMemo as Ae, Component as Ar, createContext as Co, useContext as yo, memo as oa, forwardRef as Bn, useImperativeHandle as sa } from "react";
const rt = {
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
}, ze = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, pr = (e) => e === rt.SUBMITTED || e === rt.STREAMING, ih = (e) => e === rt.IDLE, ah = (e) => e === rt.ERROR, oh = (e) => e === ze.PROCESSING, sh = (e) => e === ze.COMPLETED, lh = (e) => e === ze.ERROR;
var wo = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(wo || {}), nt = /* @__PURE__ */ ((e) => (e.DISCONNECTED = "disconnected", e.CONNECTING = "connecting", e.CONNECTED = "connected", e.RECONNECTING = "reconnecting", e))(nt || {});
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
  const n = /* @__PURE__ */ new Set(), r = (p, l) => {
    const f = typeof p == "function" ? p(t) : p;
    if (!Object.is(f, t)) {
      const m = t;
      t = l ?? (typeof f != "object" || f === null) ? f : Object.assign({}, t, f), n.forEach((g) => g(t, m));
    }
  }, i = () => t, s = { setState: r, getState: i, getInitialState: () => c, subscribe: (p) => (n.add(p), () => n.delete(p)) }, c = t = e(r, i, s);
  return s;
}, To = (e) => e ? ti(e) : ti, bo = (e) => e;
function Eo(e, t = bo) {
  const n = mt.useSyncExternalStore(
    e.subscribe,
    mt.useCallback(() => t(e.getState()), [e, t]),
    mt.useCallback(() => t(e.getInitialState()), [e, t])
  );
  return mt.useDebugValue(n), n;
}
const _o = (e) => {
  const t = To(e), n = (r) => Eo(t, r);
  return Object.assign(n, t), n;
}, vo = (e) => _o, ni = { BASE_URL: "/", DEV: !0, MODE: "production", PROD: !1, SSR: !1, VITE_APP_TOLGEE_API_KEY: "tgpak_ge4v6ytcm5xtozdlobzxk4twgyzwqntjoe3xi4bwozygu5q", VITE_APP_TOLGEE_API_URL: "https://tolgee-translation.oddleapp.com", VITE_APP_TOLGEE_PROJECT_ID: "19", VITE_USER_NODE_ENV: "development" }, fn = /* @__PURE__ */ new Map(), En = (e) => {
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
  let p;
  try {
    p = (a ?? (ni ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!p)
    return e(n, r, i);
  const { connection: l, ...f } = Io(s, p, c);
  let m = !0;
  i.setState = (x, R, T) => {
    const I = n(x, R);
    if (!m) return I;
    const L = T === void 0 ? {
      type: o || Mo(new Error().stack) || "anonymous"
    } : typeof T == "string" ? { type: T } : T;
    return s === void 0 ? (l == null || l.send(L, r()), I) : (l == null || l.send(
      {
        ...L,
        type: `${s}/${L.type}`
      },
      {
        ...En(c.name),
        [s]: i.getState()
      }
    ), I);
  }, i.devtools = {
    cleanup: () => {
      l && typeof l.unsubscribe == "function" && l.unsubscribe(), Ro(c.name, s);
    }
  };
  const g = (...x) => {
    const R = m;
    m = !1, n(...x), m = R;
  }, k = e(i.setState, r, i);
  if (f.type === "untracked" ? l == null || l.init(k) : (f.stores[f.store] = i, l == null || l.init(
    Object.fromEntries(
      Object.entries(f.stores).map(([x, R]) => [
        x,
        x === f.store ? k : R.getState()
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
            return g(k), s === void 0 ? l == null ? void 0 : l.init(i.getState()) : l == null ? void 0 : l.init(En(c.name));
          case "COMMIT":
            if (s === void 0) {
              l == null || l.init(i.getState());
              return;
            }
            return l == null ? void 0 : l.init(En(c.name));
          case "ROLLBACK":
            return Zn(x.state, (T) => {
              if (s === void 0) {
                g(T), l == null || l.init(i.getState());
                return;
              }
              g(T[s]), l == null || l.init(En(c.name));
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
            const { nextLiftedState: T } = x.payload, I = (R = T.computedStates.slice(-1)[0]) == null ? void 0 : R.state;
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
  chatStatus: rt.IDLE,
  streamingStatus: Zt.IDLE,
  // Actions
  setChatStatus: (t) => e({ chatStatus: t }),
  setStreamingStatus: (t) => e({ streamingStatus: t }),
  resetChatStatus: () => e({
    chatStatus: rt.IDLE,
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
  const [o, s] = ue(null), [c, p] = ue(""), [l, f] = ue(""), m = ee((z) => z.providerResId), [g, k] = ue(""), [x, R] = ue("BRAND"), [T, I] = ue(""), [L, F] = ue(""), [N, E] = ue(!1), [q, W] = ue(null), [Q, ne] = ue(null), [Y, H] = ue("agent");
  ve(() => {
    e && !o && A();
  }, [e]);
  const A = ie(async () => {
    E(!0), W(null);
    try {
      const z = await So(n, {
        userMpAuthToken: r,
        chatServerKey: i
      });
      if (!z)
        throw new Error(`No configuration found for app: ${a}`);
      s(z), p(z.promptPath), f(z.versionUuid);
    } catch (z) {
      W(z instanceof Error ? z.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", z);
    } finally {
      E(!1);
    }
  }, [n, a, r, i]), P = ie(async () => {
    if (o) {
      E(!0), W(null);
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
        W(z instanceof Error ? z.message : "Failed to update configuration"), console.error("Error updating agent configuration:", z);
      } finally {
        E(!1);
      }
    }
  }, [n, c, l, o, t, r, i]), Z = ie(async () => {
    if (!m) {
      W("No active conversation to attach");
      return;
    }
    E(!0), W(null), ne(null);
    try {
      let z;
      if (L.trim())
        try {
          z = JSON.parse(L);
        } catch {
          throw new Error("Invalid JSON in metadata field");
        }
      const we = g && x, Te = T || z;
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
          metadata: z
        },
        {
          userMpAuthToken: r,
          chatServerKey: i
        }
      ), !we && !Te) {
        W("Please provide at least one field to update");
        return;
      }
      ne("Thread updated successfully!"), setTimeout(() => {
        k(""), R("BRAND"), I(""), F(""), ne(null);
      }, 2e3);
    } catch (z) {
      W(z instanceof Error ? z.message : "Failed to update thread"), console.error("Error updating thread:", z);
    } finally {
      E(!1);
    }
  }, [m, n, g, x, T, L, r, i]), ae = ie(() => {
    o && (p(o.promptPath), f(o.versionUuid)), W(null), t();
  }, [o, t]);
  return e ? /* @__PURE__ */ u("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ u("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: ae,
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
          className: `chat-wrapper__dev-settings-tab ${Y === "agent" ? "active" : ""}`,
          onClick: () => H("agent"),
          children: "Agent Config"
        }
      ),
      /* @__PURE__ */ u(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${Y === "thread" ? "active" : ""}`,
          onClick: () => H("thread"),
          children: "Thread Attachment"
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-content", children: [
      Q && /* @__PURE__ */ u("div", { className: "chat-wrapper__dev-settings-success", children: Q }),
      N && /* @__PURE__ */ u("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      q && /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ v("p", { children: [
          "Error: ",
          q
        ] }),
        /* @__PURE__ */ u(
          "button",
          {
            onClick: Y === "agent" ? A : void 0,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      Y === "agent" && o && !N && /* @__PURE__ */ v(wt, { children: [
        /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ u("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ u(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: c,
              onChange: (z) => p(z.target.value),
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
      Y === "thread" && !N && /* @__PURE__ */ v(wt, { children: [
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
                value: L,
                onChange: (z) => F(z.target.value),
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
                  onChange: (z) => R(z.target.value),
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
          onClick: ae,
          disabled: N,
          children: "Cancel"
        }
      ),
      Y === "agent" && /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: P,
          disabled: N || !o,
          children: N ? "Saving..." : "Save & Reload"
        }
      ),
      Y === "thread" && /* @__PURE__ */ u(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: Z,
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
var ot = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(ot || {}), pt = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e.STOP_RUN = "stop_run", e))(pt || {}), Ge = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.THREAD_CREATED = "thread_created", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(Ge || {}), Nn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(Nn || {}), Dt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(Dt || {});
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
    return this.createConnectionEvent(ot.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(ot.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(ot.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(ot.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(ot.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(ot.CHAT_ERROR, { error: t, errorCode: n });
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
    this.onOpen = t.onOpen, this.onMessage = t.onMessage, this.onError = t.onError, this.onClose = t.onClose, this.onSystemEvent = t.onSystemEvent;
  }
}
class Go {
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
}, Oe = {
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
  getMessageType: (e, t) => t === !1 ? Oe.isErrorMessage(e) ? te.MESSAGE_TYPES.ERROR : (Oe.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || Oe.isThinkingMessage(e), te.MESSAGE_TYPES.THOUGHT) : Oe.isCompletedMessage(e) ? te.MESSAGE_TYPES.COMPLETED : Oe.isErrorMessage(e) ? te.MESSAGE_TYPES.ERROR : (Oe.isHandlingMessage(e) || Oe.isThinkingMessage(e) && !e.includes(te.UI_TEXT.AI_IS_THINKING), te.MESSAGE_TYPES.THINKING)
};
class Wo extends ua {
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
        const p = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, p), (s = this.getHandler("onReasoningUpdate")) == null || s(!1, `${te.COMPLETED_MARKER} ${i}`, n);
      } catch (p) {
        this.sendToolError(r, p), (c = this.getHandler("onReasoningUpdate")) == null || c(!1, `${te.ERROR_MARKER} Error: ${i} - ${p}`, n);
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
    X(this, "reasoningHandler");
    X(this, "toolHandler");
    X(this, "handlers");
    X(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new Wo(t.onReasoningUpdate), this.toolHandler = new Vo(n, t.onReasoningUpdate);
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
async function $o(e, t) {
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
    X(this, "ticket", null);
    X(this, "refreshPromise", null);
    X(this, "validationInterval", null);
    X(this, "authData");
    X(this, "apiUrl");
    X(this, "config");
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
      return this.ticket = await $o(this.apiUrl, this.authData), console.log("TicketManager: Ticket received successfully", {
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
      ...Uo
    }, this.connectionState = new Go(), this.wsManager = new Bo(this.config, this.connectionState), this.messageHandler = new jo({}), this.setupWebSocketHandlers();
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
  onReasoningUpdate: p,
  onThreadCreated: l
}) {
  const [f, m] = ue(
    null
  ), [g, k] = ue(
    nt.DISCONNECTED
  ), [x, R] = ue(0), T = De(null), I = De(s), L = De(c), F = De(p), N = De(l);
  ve(() => {
    I.current = s, L.current = c, F.current = p, N.current = l;
  }, [s, c, p, l]);
  const { toolSchemas: E, clientToolExecutors: q } = Ae(() => {
    if (a && a.length > 0) {
      const Y = a.map(({ execute: A, ...P }) => P), H = {};
      return a.forEach((A) => {
        H[A.name] = A.execute;
      }), {
        toolSchemas: Y,
        clientToolExecutors: H
      };
    }
    return {
      toolSchemas: [],
      clientToolExecutors: {}
    };
  }, [a]), W = De(), Q = ie(async () => {
    try {
      if (k(nt.CONNECTING), !e)
        throw new Error("userMpAuthToken is required");
      if (!t)
        throw new Error("chatServerUrl is required");
      if (!n)
        throw new Error("chatServerKey is required");
      const Y = new Ko();
      T.current = Y, m(Y);
      const H = o || {};
      await Y.onInit({
        // Authentication and server properties
        userMpAuthToken: e,
        chatServerUrl: t,
        chatServerKey: n,
        entityId: r,
        entityType: i == null ? void 0 : i.toString(),
        // Tools configuration
        toolSchemas: E,
        clientTools: q,
        contextHelpers: H,
        onSetMessage: I.current,
        onSystemEvent: L.current,
        onReasoningUpdate: F.current,
        onThreadCreated: N.current
      }), k(nt.CONNECTED);
    } catch (Y) {
      const H = Jt(Y, "WebSocketConnection");
      k(nt.DISCONNECTED), H.isRetryable ? (console.log(`[WebSocketConnection] Will retry in 2s: ${H.reason}`), setTimeout(() => {
        var A;
        (T.current === null || !T.current.getConnectionStatus().connected) && ((A = W.current) == null || A.call(W));
      }, 2e3)) : console.warn(`[WebSocketConnection] Will not retry: ${H.reason}`);
    }
  }, [
    e,
    t,
    n,
    r,
    i,
    E,
    q,
    o
    // Removed onSetMessage, onSystemEvent, onReasoningUpdate to prevent reconnections
  ]), ne = ie(() => {
    T.current && (T.current.disconnect(), T.current = null), m(null), k(nt.DISCONNECTED);
  }, []);
  return W.current = Q, ve(() => (Q(), () => {
    ne();
  }), [Q, ne]), ve(() => {
    const Y = setInterval(() => {
      if (T.current) {
        const H = T.current.getConnectionStatus();
        H.connected ? k(nt.CONNECTED) : H.isReconnecting ? k(nt.RECONNECTING) : k(nt.DISCONNECTED), R(H.reconnectAttempts);
      }
    }, 1e3);
    return () => clearInterval(Y);
  }, []), {
    chatClient: f,
    connectionState: g,
    reconnectAttempts: x,
    connectChatClient: Q,
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
  freeze: We,
  seal: lt,
  create: gr
} = Object, {
  apply: mr,
  construct: Cr
} = typeof Reflect < "u" && Reflect;
We || (We = function(t) {
  return t;
});
lt || (lt = function(t) {
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
const vn = Ve(Array.prototype.forEach), es = Ve(Array.prototype.lastIndexOf), ai = Ve(Array.prototype.pop), rn = Ve(Array.prototype.push), ts = Ve(Array.prototype.splice), Ln = Ve(String.prototype.toLowerCase), Kn = Ve(String.prototype.toString), Xn = Ve(String.prototype.match), an = Ve(String.prototype.replace), ns = Ve(String.prototype.indexOf), rs = Ve(String.prototype.trim), dt = Ve(Object.prototype.hasOwnProperty), Be = Ve(RegExp.prototype.test), on = is(TypeError);
function Ve(e) {
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
function se(e, t) {
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
        return Ve(r.get);
      if (typeof r.value == "function")
        return Ve(r.value);
    }
    e = Jo(e);
  }
  function n() {
    return null;
  }
  return n;
}
const oi = We(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Yn = We(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Jn = We(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), os = We(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Qn = We(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), ss = We(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), si = We(["#text"]), li = We(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), er = We(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), ci = We(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), In = We(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), ls = lt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), cs = lt(/<%[\w\W]*|[\w\W]*%>/gm), us = lt(/\$\{[\w\W]*/gm), ds = lt(/^data-[\-\w.\u00B7-\uFFFF]+$/), hs = lt(/^aria-[\-\w]+$/), ha = lt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), ps = lt(/^(?:\w+script|data):/i), fs = lt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), pa = lt(/^html$/i), gs = lt(/^[a-z][.\w]*(-[.\w]+)+$/i);
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
  const t = (J) => fa(J);
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
    NodeFilter: p,
    NamedNodeMap: l = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: f,
    DOMParser: m,
    trustedTypes: g
  } = e, k = c.prototype, x = sn(k, "cloneNode"), R = sn(k, "remove"), T = sn(k, "nextSibling"), I = sn(k, "childNodes"), L = sn(k, "parentNode");
  if (typeof o == "function") {
    const J = n.createElement("template");
    J.content && J.content.ownerDocument && (n = J.content.ownerDocument);
  }
  let F, N = "";
  const {
    implementation: E,
    createNodeIterator: q,
    createDocumentFragment: W,
    getElementsByTagName: Q
  } = n, {
    importNode: ne
  } = r;
  let Y = di();
  t.isSupported = typeof da == "function" && typeof L == "function" && E && E.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: H,
    ERB_EXPR: A,
    TMPLIT_EXPR: P,
    DATA_ATTR: Z,
    ARIA_ATTR: ae,
    IS_SCRIPT_OR_DATA: z,
    ATTR_WHITESPACE: we,
    CUSTOM_ELEMENT: Te
  } = ui;
  let {
    IS_ALLOWED_URI: y
  } = ui, G = null;
  const ge = se({}, [...oi, ...Yn, ...Jn, ...Qn, ...si]);
  let C = null;
  const le = se({}, [...li, ...er, ...ci, ...In]);
  let K = Object.seal(gr(null, {
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
  })), fe = null, pe = null;
  const ce = Object.seal(gr(null, {
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
  let ct = !0, Ee = !0, Ne = !1, at = !0, Xe = !1, xt = !0, Ye = !1, kt = !1, Tt = !1, ut = !1, bt = !1, Et = !1, Ft = !0, Ht = !1;
  const Vt = "user-content-";
  let _t = !0, Je = !1, b = {}, _ = null;
  const B = se({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let $ = null;
  const oe = se({}, ["audio", "video", "img", "source", "image", "track"]);
  let xe = null;
  const Qe = se({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Le = "http://www.w3.org/1998/Math/MathML", et = "http://www.w3.org/2000/svg", be = "http://www.w3.org/1999/xhtml";
  let ye = be, je = !1, Fe = null;
  const $n = se({}, [Le, et, be], Kn);
  let jt = se({}, ["mi", "mo", "mn", "ms", "mtext"]), zt = se({}, ["annotation-xml"]);
  const wn = se({}, ["title", "style", "font", "a", "script"]);
  let Nt = null;
  const Sn = ["application/xhtml+xml", "text/html"], xn = "text/html";
  let _e = null, vt = null;
  const kn = n.createElement("form"), Tn = function(w) {
    return w instanceof RegExp || w instanceof Function;
  }, bn = function() {
    let w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(vt && vt === w)) {
      if ((!w || typeof w != "object") && (w = {}), w = Mt(w), Nt = // eslint-disable-next-line unicorn/prefer-includes
      Sn.indexOf(w.PARSER_MEDIA_TYPE) === -1 ? xn : w.PARSER_MEDIA_TYPE, _e = Nt === "application/xhtml+xml" ? Kn : Ln, G = dt(w, "ALLOWED_TAGS") ? se({}, w.ALLOWED_TAGS, _e) : ge, C = dt(w, "ALLOWED_ATTR") ? se({}, w.ALLOWED_ATTR, _e) : le, Fe = dt(w, "ALLOWED_NAMESPACES") ? se({}, w.ALLOWED_NAMESPACES, Kn) : $n, xe = dt(w, "ADD_URI_SAFE_ATTR") ? se(Mt(Qe), w.ADD_URI_SAFE_ATTR, _e) : Qe, $ = dt(w, "ADD_DATA_URI_TAGS") ? se(Mt(oe), w.ADD_DATA_URI_TAGS, _e) : oe, _ = dt(w, "FORBID_CONTENTS") ? se({}, w.FORBID_CONTENTS, _e) : B, fe = dt(w, "FORBID_TAGS") ? se({}, w.FORBID_TAGS, _e) : Mt({}), pe = dt(w, "FORBID_ATTR") ? se({}, w.FORBID_ATTR, _e) : Mt({}), b = dt(w, "USE_PROFILES") ? w.USE_PROFILES : !1, ct = w.ALLOW_ARIA_ATTR !== !1, Ee = w.ALLOW_DATA_ATTR !== !1, Ne = w.ALLOW_UNKNOWN_PROTOCOLS || !1, at = w.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Xe = w.SAFE_FOR_TEMPLATES || !1, xt = w.SAFE_FOR_XML !== !1, Ye = w.WHOLE_DOCUMENT || !1, ut = w.RETURN_DOM || !1, bt = w.RETURN_DOM_FRAGMENT || !1, Et = w.RETURN_TRUSTED_TYPE || !1, Tt = w.FORCE_BODY || !1, Ft = w.SANITIZE_DOM !== !1, Ht = w.SANITIZE_NAMED_PROPS || !1, _t = w.KEEP_CONTENT !== !1, Je = w.IN_PLACE || !1, y = w.ALLOWED_URI_REGEXP || ha, ye = w.NAMESPACE || be, jt = w.MATHML_TEXT_INTEGRATION_POINTS || jt, zt = w.HTML_INTEGRATION_POINTS || zt, K = w.CUSTOM_ELEMENT_HANDLING || {}, w.CUSTOM_ELEMENT_HANDLING && Tn(w.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (K.tagNameCheck = w.CUSTOM_ELEMENT_HANDLING.tagNameCheck), w.CUSTOM_ELEMENT_HANDLING && Tn(w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (K.attributeNameCheck = w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), w.CUSTOM_ELEMENT_HANDLING && typeof w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (K.allowCustomizedBuiltInElements = w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Xe && (Ee = !1), bt && (ut = !0), b && (G = se({}, si), C = [], b.html === !0 && (se(G, oi), se(C, li)), b.svg === !0 && (se(G, Yn), se(C, er), se(C, In)), b.svgFilters === !0 && (se(G, Jn), se(C, er), se(C, In)), b.mathMl === !0 && (se(G, Qn), se(C, ci), se(C, In))), w.ADD_TAGS && (typeof w.ADD_TAGS == "function" ? ce.tagCheck = w.ADD_TAGS : (G === ge && (G = Mt(G)), se(G, w.ADD_TAGS, _e))), w.ADD_ATTR && (typeof w.ADD_ATTR == "function" ? ce.attributeCheck = w.ADD_ATTR : (C === le && (C = Mt(C)), se(C, w.ADD_ATTR, _e))), w.ADD_URI_SAFE_ATTR && se(xe, w.ADD_URI_SAFE_ATTR, _e), w.FORBID_CONTENTS && (_ === B && (_ = Mt(_)), se(_, w.FORBID_CONTENTS, _e)), _t && (G["#text"] = !0), Ye && se(G, ["html", "head", "body"]), G.table && (se(G, ["tbody"]), delete fe.tbody), w.TRUSTED_TYPES_POLICY) {
        if (typeof w.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw on('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof w.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw on('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        F = w.TRUSTED_TYPES_POLICY, N = F.createHTML("");
      } else
        F === void 0 && (F = Cs(g, i)), F !== null && typeof N == "string" && (N = F.createHTML(""));
      We && We(w), vt = w;
    }
  }, tn = se({}, [...Yn, ...Jn, ...os]), nn = se({}, [...Qn, ...ss]), M = function(w) {
    let D = L(w);
    (!D || !D.tagName) && (D = {
      namespaceURI: ye,
      tagName: "template"
    });
    const j = Ln(w.tagName), Se = Ln(D.tagName);
    return Fe[w.namespaceURI] ? w.namespaceURI === et ? D.namespaceURI === be ? j === "svg" : D.namespaceURI === Le ? j === "svg" && (Se === "annotation-xml" || jt[Se]) : !!tn[j] : w.namespaceURI === Le ? D.namespaceURI === be ? j === "math" : D.namespaceURI === et ? j === "math" && zt[Se] : !!nn[j] : w.namespaceURI === be ? D.namespaceURI === et && !zt[Se] || D.namespaceURI === Le && !jt[Se] ? !1 : !nn[j] && (wn[j] || !tn[j]) : !!(Nt === "application/xhtml+xml" && Fe[w.namespaceURI]) : !1;
  }, de = function(w) {
    rn(t.removed, {
      element: w
    });
    try {
      L(w).removeChild(w);
    } catch {
      R(w);
    }
  }, ke = function(w, D) {
    try {
      rn(t.removed, {
        attribute: D.getAttributeNode(w),
        from: D
      });
    } catch {
      rn(t.removed, {
        attribute: null,
        from: D
      });
    }
    if (D.removeAttribute(w), w === "is")
      if (ut || bt)
        try {
          de(D);
        } catch {
        }
      else
        try {
          D.setAttribute(w, "");
        } catch {
        }
  }, Ie = function(w) {
    let D = null, j = null;
    if (Tt)
      w = "<remove></remove>" + w;
    else {
      const Re = Xn(w, /^[\r\n\t ]+/);
      j = Re && Re[0];
    }
    Nt === "application/xhtml+xml" && ye === be && (w = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + w + "</body></html>");
    const Se = F ? F.createHTML(w) : w;
    if (ye === be)
      try {
        D = new m().parseFromString(Se, Nt);
      } catch {
      }
    if (!D || !D.documentElement) {
      D = E.createDocument(ye, "template", null);
      try {
        D.documentElement.innerHTML = je ? N : Se;
      } catch {
      }
    }
    const He = D.body || D.documentElement;
    return w && j && He.insertBefore(n.createTextNode(j), He.childNodes[0] || null), ye === be ? Q.call(D, Ye ? "html" : "body")[0] : Ye ? D.documentElement : He;
  }, Lt = function(w) {
    return q.call(
      w.ownerDocument || w,
      w,
      // eslint-disable-next-line no-bitwise
      p.SHOW_ELEMENT | p.SHOW_COMMENT | p.SHOW_TEXT | p.SHOW_PROCESSING_INSTRUCTION | p.SHOW_CDATA_SECTION,
      null
    );
  }, Ut = function(w) {
    return w instanceof f && (typeof w.nodeName != "string" || typeof w.textContent != "string" || typeof w.removeChild != "function" || !(w.attributes instanceof l) || typeof w.removeAttribute != "function" || typeof w.setAttribute != "function" || typeof w.namespaceURI != "string" || typeof w.insertBefore != "function" || typeof w.hasChildNodes != "function");
  }, Zr = function(w) {
    return typeof s == "function" && w instanceof s;
  };
  function It(J, w, D) {
    vn(J, (j) => {
      j.call(t, w, D, vt);
    });
  }
  const Kr = function(w) {
    let D = null;
    if (It(Y.beforeSanitizeElements, w, null), Ut(w))
      return de(w), !0;
    const j = _e(w.nodeName);
    if (It(Y.uponSanitizeElement, w, {
      tagName: j,
      allowedTags: G
    }), xt && w.hasChildNodes() && !Zr(w.firstElementChild) && Be(/<[/\w!]/g, w.innerHTML) && Be(/<[/\w!]/g, w.textContent) || w.nodeType === ln.progressingInstruction || xt && w.nodeType === ln.comment && Be(/<[/\w]/g, w.data))
      return de(w), !0;
    if (!(ce.tagCheck instanceof Function && ce.tagCheck(j)) && (!G[j] || fe[j])) {
      if (!fe[j] && Yr(j) && (K.tagNameCheck instanceof RegExp && Be(K.tagNameCheck, j) || K.tagNameCheck instanceof Function && K.tagNameCheck(j)))
        return !1;
      if (_t && !_[j]) {
        const Se = L(w) || w.parentNode, He = I(w) || w.childNodes;
        if (He && Se) {
          const Re = He.length;
          for (let $e = Re - 1; $e >= 0; --$e) {
            const Rt = x(He[$e], !0);
            Rt.__removalCount = (w.__removalCount || 0) + 1, Se.insertBefore(Rt, T(w));
          }
        }
      }
      return de(w), !0;
    }
    return w instanceof c && !M(w) || (j === "noscript" || j === "noembed" || j === "noframes") && Be(/<\/no(script|embed|frames)/i, w.innerHTML) ? (de(w), !0) : (Xe && w.nodeType === ln.text && (D = w.textContent, vn([H, A, P], (Se) => {
      D = an(D, Se, " ");
    }), w.textContent !== D && (rn(t.removed, {
      element: w.cloneNode()
    }), w.textContent = D)), It(Y.afterSanitizeElements, w, null), !1);
  }, Xr = function(w, D, j) {
    if (Ft && (D === "id" || D === "name") && (j in n || j in kn))
      return !1;
    if (!(Ee && !pe[D] && Be(Z, D))) {
      if (!(ct && Be(ae, D))) {
        if (!(ce.attributeCheck instanceof Function && ce.attributeCheck(D, w))) {
          if (!C[D] || pe[D]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Yr(w) && (K.tagNameCheck instanceof RegExp && Be(K.tagNameCheck, w) || K.tagNameCheck instanceof Function && K.tagNameCheck(w)) && (K.attributeNameCheck instanceof RegExp && Be(K.attributeNameCheck, D) || K.attributeNameCheck instanceof Function && K.attributeNameCheck(D, w)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              D === "is" && K.allowCustomizedBuiltInElements && (K.tagNameCheck instanceof RegExp && Be(K.tagNameCheck, j) || K.tagNameCheck instanceof Function && K.tagNameCheck(j)))
            ) return !1;
          } else if (!xe[D]) {
            if (!Be(y, an(j, we, ""))) {
              if (!((D === "src" || D === "xlink:href" || D === "href") && w !== "script" && ns(j, "data:") === 0 && $[w])) {
                if (!(Ne && !Be(z, an(j, we, "")))) {
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
    return w !== "annotation-xml" && Xn(w, Te);
  }, Jr = function(w) {
    It(Y.beforeSanitizeAttributes, w, null);
    const {
      attributes: D
    } = w;
    if (!D || Ut(w))
      return;
    const j = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: C,
      forceKeepAttr: void 0
    };
    let Se = D.length;
    for (; Se--; ) {
      const He = D[Se], {
        name: Re,
        namespaceURI: $e,
        value: Rt
      } = He, $t = _e(Re), qn = Rt;
      let Pe = Re === "value" ? qn : rs(qn);
      if (j.attrName = $t, j.attrValue = Pe, j.keepAttr = !0, j.forceKeepAttr = void 0, It(Y.uponSanitizeAttribute, w, j), Pe = j.attrValue, Ht && ($t === "id" || $t === "name") && (ke(Re, w), Pe = Vt + Pe), xt && Be(/((--!?|])>)|<\/(style|title|textarea)/i, Pe)) {
        ke(Re, w);
        continue;
      }
      if ($t === "attributename" && Xn(Pe, "href")) {
        ke(Re, w);
        continue;
      }
      if (j.forceKeepAttr)
        continue;
      if (!j.keepAttr) {
        ke(Re, w);
        continue;
      }
      if (!at && Be(/\/>/i, Pe)) {
        ke(Re, w);
        continue;
      }
      Xe && vn([H, A, P], (ei) => {
        Pe = an(Pe, ei, " ");
      });
      const Qr = _e(w.nodeName);
      if (!Xr(Qr, $t, Pe)) {
        ke(Re, w);
        continue;
      }
      if (F && typeof g == "object" && typeof g.getAttributeType == "function" && !$e)
        switch (g.getAttributeType(Qr, $t)) {
          case "TrustedHTML": {
            Pe = F.createHTML(Pe);
            break;
          }
          case "TrustedScriptURL": {
            Pe = F.createScriptURL(Pe);
            break;
          }
        }
      if (Pe !== qn)
        try {
          $e ? w.setAttributeNS($e, Re, Pe) : w.setAttribute(Re, Pe), Ut(w) ? de(w) : ai(t.removed);
        } catch {
          ke(Re, w);
        }
    }
    It(Y.afterSanitizeAttributes, w, null);
  }, fo = function J(w) {
    let D = null;
    const j = Lt(w);
    for (It(Y.beforeSanitizeShadowDOM, w, null); D = j.nextNode(); )
      It(Y.uponSanitizeShadowNode, D, null), Kr(D), Jr(D), D.content instanceof a && J(D.content);
    It(Y.afterSanitizeShadowDOM, w, null);
  };
  return t.sanitize = function(J) {
    let w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, D = null, j = null, Se = null, He = null;
    if (je = !J, je && (J = "<!-->"), typeof J != "string" && !Zr(J))
      if (typeof J.toString == "function") {
        if (J = J.toString(), typeof J != "string")
          throw on("dirty is not a string, aborting");
      } else
        throw on("toString is not a function");
    if (!t.isSupported)
      return J;
    if (kt || bn(w), t.removed = [], typeof J == "string" && (Je = !1), Je) {
      if (J.nodeName) {
        const Rt = _e(J.nodeName);
        if (!G[Rt] || fe[Rt])
          throw on("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (J instanceof s)
      D = Ie("<!---->"), j = D.ownerDocument.importNode(J, !0), j.nodeType === ln.element && j.nodeName === "BODY" || j.nodeName === "HTML" ? D = j : D.appendChild(j);
    else {
      if (!ut && !Xe && !Ye && // eslint-disable-next-line unicorn/prefer-includes
      J.indexOf("<") === -1)
        return F && Et ? F.createHTML(J) : J;
      if (D = Ie(J), !D)
        return ut ? null : Et ? N : "";
    }
    D && Tt && de(D.firstChild);
    const Re = Lt(Je ? J : D);
    for (; Se = Re.nextNode(); )
      Kr(Se), Jr(Se), Se.content instanceof a && fo(Se.content);
    if (Je)
      return J;
    if (ut) {
      if (bt)
        for (He = W.call(D.ownerDocument); D.firstChild; )
          He.appendChild(D.firstChild);
      else
        He = D;
      return (C.shadowroot || C.shadowrootmode) && (He = ne.call(r, He, !0)), He;
    }
    let $e = Ye ? D.outerHTML : D.innerHTML;
    return Ye && G["!doctype"] && D.ownerDocument && D.ownerDocument.doctype && D.ownerDocument.doctype.name && Be(pa, D.ownerDocument.doctype.name) && ($e = "<!DOCTYPE " + D.ownerDocument.doctype.name + `>
` + $e), Xe && vn([H, A, P], (Rt) => {
      $e = an($e, Rt, " ");
    }), F && Et ? F.createHTML($e) : $e;
  }, t.setConfig = function() {
    let J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    bn(J), kt = !0;
  }, t.clearConfig = function() {
    vt = null, kt = !1;
  }, t.isValidAttribute = function(J, w, D) {
    vt || bn({});
    const j = _e(J), Se = _e(w);
    return Xr(j, Se, D);
  }, t.addHook = function(J, w) {
    typeof w == "function" && rn(Y[J], w);
  }, t.removeHook = function(J, w) {
    if (w !== void 0) {
      const D = es(Y[J], w);
      return D === -1 ? void 0 : ts(Y[J], D, 1)[0];
    }
    return ai(Y[J]);
  }, t.removeHooks = function(J) {
    Y[J] = [];
  }, t.removeAllHooks = function() {
    Y = di();
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
  const [e, t] = ue([]), n = ie(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = ie(
    (o, s) => {
      const p = Fn(s, o === "assistant");
      t((l) => [
        ...l,
        {
          id: n(),
          role: o,
          content: p,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [n]
  ), i = ie((o, s) => {
    t(
      (c) => c.map((p) => p.id === o ? { ...p, ...s } : p)
    );
  }, []), a = ie(
    (o, s, c) => {
      t(
        (p) => p.map(
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
  const e = ee((I) => I.isStreaming), t = ee((I) => I.setIsStreaming), n = ee((I) => I.isThinking), r = ee((I) => I.setIsThinking), i = ee((I) => I.streamingContent), a = ee((I) => I.setStreamingContent), o = ee((I) => I.isHandlingTool), s = ee((I) => I.setIsHandlingTool), c = ee((I) => I.startStreaming), p = ee((I) => I.stopStreaming), l = ee((I) => I.clearStreamingBuffers), f = ee((I) => I.resetToolHandling), m = De(""), g = Ae(() => ({
    get current() {
      return ee.getState().currentAssistantMessageId;
    },
    set current(I) {
      ee.getState().setCurrentAssistantMessageId(I);
    }
  }), []), k = ie((I) => {
    I ? c(I) : (t(!0), r(!0), a("")), m.current = "";
  }, [c, t, r, a]), x = ie(() => {
    p(), m.current = "";
  }, [p]), R = ie(() => {
    f();
  }, [f]), T = ie(() => {
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
    resetToolHandling: R,
    clearStreamingBuffers: T
  };
}
function bs() {
  const e = Ae(
    () => (i, a) => a === !1 ? Oe.isErrorMessage(i) ? ze.ERROR : ze.COMPLETED : Oe.isCompletedMessage(i) ? ze.COMPLETED : Oe.isErrorMessage(i) ? ze.ERROR : ze.PROCESSING,
    []
  ), t = Ae(
    () => (i) => Oe.extractDuration(i),
    []
  ), n = Ae(
    () => (i) => Oe.cleanReasoningContent(i),
    []
  ), r = Ae(
    () => (i, a) => {
      switch (Oe.getMessageType(
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
function Es() {
  const e = Ae(
    () => (n, r) => r === !1 ? n.includes(te.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : n.includes(te.COMPLETED_MARKER) || n.includes("✅") ? "Tool Completed" : n.includes(te.ERROR_MARKER) ? "Tool Error" : (n.includes(te.HANDLING_MARKER), "Tool Processing..."),
    []
  ), t = Ae(
    () => (n, r) => r === !1 ? n.includes(te.ERROR_MARKER) ? ze.ERROR : ze.COMPLETED : n.includes(te.COMPLETED_MARKER) || n.includes("✅") ? ze.COMPLETED : n.includes(te.ERROR_MARKER) ? ze.ERROR : ze.PROCESSING,
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
  streamingContentRef: p,
  clearStreamingBuffers: l,
  resetToolHandling: f
}) {
  const m = De(/* @__PURE__ */ new Map()), g = De(/* @__PURE__ */ new Map()), k = ie(() => {
    if (c.current && p.current) {
      const F = Fn(
        p.current,
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
    p,
    n,
    l
  ]), x = ie(
    (F) => {
      const N = Fn(F, !0);
      if (c.current)
        p.current += N, o(p.current), n(
          c.current,
          p.current,
          !0
        );
      else {
        i(!1);
        const E = r();
        c.current = E, p.current = N, o(N);
        const q = {
          id: E,
          role: "assistant",
          content: N,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        e((W) => [...W, q]);
      }
    },
    [
      c,
      p,
      o,
      n,
      i,
      r,
      e
    ]
  ), R = ie(
    (F, N, E) => {
      const { callId: q } = E || {};
      if (s(F), !q) return;
      const W = Oe.isThinkingMessage(N) && !N.includes("for") && !N.includes("seconds"), Q = Oe.isThinkingMessage(N) && N.includes("for") && N.includes("seconds"), ne = Oe.isHandlingMessage(N), Y = Oe.isCompletedMessage(N), H = Oe.isErrorMessage(N);
      if (W || Q) {
        const P = m.current.get(q);
        if (W && !P) {
          k();
          const Z = r();
          m.current.set(q, Z);
          const ae = {
            id: Z,
            role: "reasoning",
            content: N,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          e((z) => [...z, ae]);
        } else Q && P ? (n(P, N, !1), m.current.delete(q)) : P && W && n(P, N, !0);
      }
      const A = g.current.get(q);
      if (ne && !A) {
        k();
        const P = N.match(
          te.PATTERNS.HANDLING_TOOL
        ), Z = P ? P[1] : "Unknown Tool", ae = r();
        g.current.set(q, ae);
        const z = {
          id: ae,
          role: "tooling",
          content: N,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...E,
            toolName: Z,
            callId: q,
            status: ze.PROCESSING
          }
        };
        e((we) => [...we, z]);
      } else if ((Y || H) && A) {
        const P = N.match(
          te.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), Z = P ? P[1] : "Unknown Tool";
        e(
          (ae) => ae.map(
            (z) => z.id === A ? {
              ...z,
              content: N,
              isStreaming: !1,
              toolData: {
                ...z.toolData,
                toolName: Z,
                status: H ? ze.ERROR : ze.COMPLETED,
                callId: q ?? ""
              }
            } : z
          )
        ), g.current.delete(q);
      } else A && F && !Y && !H && n(A, N, !0);
    },
    [
      s,
      k,
      r,
      e,
      n
    ]
  ), T = ie(() => {
    a(!1), i(!1), k();
  }, [a, i, k]), I = ie(
    (F) => {
      console.error("Chat error:", F), a(!1), i(!1), k(), t("system", `❌ Chat error: ${F}`);
    },
    [
      a,
      i,
      k,
      t
    ]
  ), L = ie(() => {
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
    handleChatError: I,
    stopGeneration: L,
    finalizeCurrentStreamingMessage: k
  };
}
function vs() {
  const e = ks(), t = Ts(), n = bs(), r = Es(), i = _s({
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
  setCurrentThreadId: p,
  setProviderResId: l,
  metadata: f
}) {
  const m = De(!1), g = async () => {
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
        console.log(`useConversationLoader: Loaded ${x.messages.length} messages`), o(x.messages), x.threadId && (console.log("useConversationLoader: Setting threadId from response:", x.threadId), p(x.threadId)), x.providerResId && (console.log("useConversationLoader: Setting providerResId:", x.providerResId), l(x.providerResId)), m.current = !0;
      } catch (x) {
        const R = Jt(x, "ConversationLoader");
        c(
          x instanceof Error ? x.message : "Failed to load conversation"
        ), m.current = !0, R.isRetryable || console.warn(`[ConversationLoader] Will not retry conversation loading: ${R.reason}`);
      } finally {
        s(!1);
      }
  };
  return ve(() => {
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
    p,
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
  const s = De(void 0), c = De(!1);
  return ve(() => {
    if (r || !t)
      return;
    const p = !n && i.length === 0, l = !!n;
    if (p && (!a || !o) || l && !n)
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
    p ? s.current = e : l && t.updateMetadata(n, { metadata: e }).then(() => {
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
  const [e, t] = ue(navigator.onLine), [n, r] = ue(!1);
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
class As {
  // 10MB
  constructor(t) {
    X(this, "config");
    X(this, "defaultFolder", "chat-uploads");
    X(this, "defaultMaxFileSize", 10 * 1024 * 1024);
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
        const s = await this.uploadSingleFile(o, (c) => {
          n && (i[a].progress = c, n([...i]));
        });
        r.push(s), i[a].status = "completed", i[a].progress = 100;
      } catch (s) {
        console.error(`❌ Upload failed for ${o.name}:`, s), i[a].status = "error";
        const c = await this.handleUploadFallback(o);
        c && r.push(c);
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
      s.upload.addEventListener("progress", (c) => {
        if (c.lengthComputable && n) {
          const p = c.loaded / c.total * 100;
          n(p);
        }
      }), s.addEventListener("load", async () => {
        if (s.status >= 200 && s.status < 300)
          try {
            const c = JSON.parse(s.responseText), p = this.processUploadResult(t, c);
            a(p);
          } catch {
            o(new Error("Invalid response format"));
          }
        else
          o(new Error(`Upload failed with status ${s.status}`));
      }), s.addEventListener("error", () => {
        o(new Error("Network error during upload"));
      }), s.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([c, p]) => {
        s.setRequestHeader(c, p);
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
      return null;
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
class Ns {
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
    }), this.props.onError && this.props.onError(n, r), console.error("ChatErrorBoundary caught an error:", n, r);
  }
  componentDidUpdate(n) {
    const { resetOnPropsChange: r, resetKeys: i } = this.props, { hasError: a } = this.state;
    if (a && r && i) {
      const o = n.resetKeys || [];
      i.some(
        (c, p) => c !== o[p]
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
    X(this, "retryCount", 0);
    X(this, "retryTimeoutId", null);
    X(this, "handleRetry", () => {
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
        /* @__PURE__ */ u("ul", { className: "chat-wrapper__failed-files-list", children: i.map((c, p) => /* @__PURE__ */ u("li", { className: "chat-wrapper__failed-file", children: c }, p)) })
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
), Gs = ({
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
}, Ws = ({
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
  const p = () => t === "modal" && r && a ? /* @__PURE__ */ u(
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
      p()
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
function js(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const $s = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, qs = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Zs = {};
function fi(e, t) {
  return (Zs.jsx ? qs : $s).test(e);
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
class Ke {
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
Ke.prototype.attribute = "";
Ke.prototype.booleanish = !1;
Ke.prototype.boolean = !1;
Ke.prototype.commaOrSpaceSeparated = !1;
Ke.prototype.commaSeparated = !1;
Ke.prototype.defined = !1;
Ke.prototype.mustUseProperty = !1;
Ke.prototype.number = !1;
Ke.prototype.overloadedBoolean = !1;
Ke.prototype.property = "";
Ke.prototype.spaceSeparated = !1;
Ke.prototype.space = void 0;
let Ys = 0;
const re = Wt(), Me = Wt(), Sr = Wt(), O = Wt(), me = Wt(), Xt = Wt(), tt = Wt();
function Wt() {
  return 2 ** ++Ys;
}
const xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: re,
  booleanish: Me,
  commaOrSpaceSeparated: tt,
  commaSeparated: Xt,
  number: O,
  overloadedBoolean: Sr,
  spaceSeparated: me
}, Symbol.toStringTag, { value: "Module" })), tr = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(xr)
);
class Nr extends Ke {
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
    ariaAtomic: Me,
    ariaAutoComplete: null,
    ariaBusy: Me,
    ariaChecked: Me,
    ariaColCount: O,
    ariaColIndex: O,
    ariaColSpan: O,
    ariaControls: me,
    ariaCurrent: null,
    ariaDescribedBy: me,
    ariaDetails: null,
    ariaDisabled: Me,
    ariaDropEffect: me,
    ariaErrorMessage: null,
    ariaExpanded: Me,
    ariaFlowTo: me,
    ariaGrabbed: Me,
    ariaHasPopup: null,
    ariaHidden: Me,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: me,
    ariaLevel: O,
    ariaLive: null,
    ariaModal: Me,
    ariaMultiLine: Me,
    ariaMultiSelectable: Me,
    ariaOrientation: null,
    ariaOwns: me,
    ariaPlaceholder: null,
    ariaPosInSet: O,
    ariaPressed: Me,
    ariaReadOnly: Me,
    ariaRelevant: null,
    ariaRequired: Me,
    ariaRoleDescription: me,
    ariaRowCount: O,
    ariaRowIndex: O,
    ariaRowSpan: O,
    ariaSelected: Me,
    ariaSetSize: O,
    ariaSort: null,
    ariaValueMax: O,
    ariaValueMin: O,
    ariaValueNow: O,
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
    acceptCharset: me,
    accessKey: me,
    action: null,
    allow: null,
    allowFullScreen: re,
    allowPaymentRequest: re,
    allowUserMedia: re,
    alt: null,
    as: null,
    async: re,
    autoCapitalize: null,
    autoComplete: me,
    autoFocus: re,
    autoPlay: re,
    blocking: me,
    capture: null,
    charSet: null,
    checked: re,
    cite: null,
    className: me,
    cols: O,
    colSpan: null,
    content: null,
    contentEditable: Me,
    controls: re,
    controlsList: me,
    coords: O | Xt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: re,
    defer: re,
    dir: null,
    dirName: null,
    disabled: re,
    download: Sr,
    draggable: Me,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: re,
    formTarget: null,
    headers: me,
    height: O,
    hidden: Sr,
    high: O,
    href: null,
    hrefLang: null,
    htmlFor: me,
    httpEquiv: me,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: re,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: re,
    itemId: null,
    itemProp: me,
    itemRef: me,
    itemScope: re,
    itemType: me,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: re,
    low: O,
    manifest: null,
    max: null,
    maxLength: O,
    media: null,
    method: null,
    min: null,
    minLength: O,
    multiple: re,
    muted: re,
    name: null,
    nonce: null,
    noModule: re,
    noValidate: re,
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
    open: re,
    optimum: O,
    pattern: null,
    ping: me,
    placeholder: null,
    playsInline: re,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: re,
    referrerPolicy: null,
    rel: me,
    required: re,
    reversed: re,
    rows: O,
    rowSpan: O,
    sandbox: me,
    scope: null,
    scoped: re,
    seamless: re,
    selected: re,
    shadowRootClonable: re,
    shadowRootDelegatesFocus: re,
    shadowRootMode: null,
    shape: null,
    size: O,
    sizes: null,
    slot: null,
    span: O,
    spellCheck: Me,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: O,
    step: null,
    style: null,
    tabIndex: O,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: re,
    useMap: null,
    value: Me,
    width: O,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: me,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: O,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: O,
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
    compact: re,
    // Lists. Use CSS to reduce space between items instead
    declare: re,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: O,
    // `<img>` and `<object>`
    leftMargin: O,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: O,
    // `<body>`
    marginWidth: O,
    // `<body>`
    noResize: re,
    // `<frame>`
    noHref: re,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: re,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: re,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: O,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: Me,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: O,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: O,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: re,
    disableRemotePlayback: re,
    prefix: null,
    property: null,
    results: O,
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
    about: tt,
    accentHeight: O,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: O,
    amplitude: O,
    arabicForm: null,
    ascent: O,
    attributeName: null,
    attributeType: null,
    azimuth: O,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: O,
    by: null,
    calcMode: null,
    capHeight: O,
    className: me,
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
    descent: O,
    diffuseConstant: O,
    direction: null,
    display: null,
    dur: null,
    divisor: O,
    dominantBaseline: null,
    download: re,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: O,
    enableBackground: null,
    end: null,
    event: null,
    exponent: O,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: O,
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
    hanging: O,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: O,
    horizOriginX: O,
    horizOriginY: O,
    id: null,
    ideographic: O,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: O,
    k: O,
    k1: O,
    k2: O,
    k3: O,
    k4: O,
    kernelMatrix: tt,
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
    limitingConeAngle: O,
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
    mediaSize: O,
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
    overlinePosition: O,
    overlineThickness: O,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: O,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: me,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: O,
    pointsAtY: O,
    pointsAtZ: O,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: tt,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: tt,
    rev: tt,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: tt,
    requiredFeatures: tt,
    requiredFonts: tt,
    requiredFormats: tt,
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
    specularConstant: O,
    specularExponent: O,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: O,
    strikethroughThickness: O,
    string: null,
    stroke: null,
    strokeDashArray: tt,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: O,
    strokeOpacity: O,
    strokeWidth: null,
    style: null,
    surfaceScale: O,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: tt,
    tabIndex: O,
    tableValues: null,
    target: null,
    targetX: O,
    targetY: O,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: tt,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: O,
    underlineThickness: O,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: O,
    values: null,
    vAlphabetic: O,
    vMathematical: O,
    vectorEffect: null,
    vHanging: O,
    vIdeographic: O,
    version: null,
    vertAdvY: O,
    vertOriginX: O,
    vertOriginY: O,
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
    xHeight: O,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: ka
}), ba = Qt({
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
}), Ea = Qt({
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
  let r = t, i = Ke;
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
const ol = Sa([xa, Js, ba, Ea, _a], "html"), Lr = Sa([xa, Qs, ba, Ea, _a], "svg");
function sl(e) {
  return e.join(" ").trim();
}
var Hn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Or(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Dr = {}, yi = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, ll = /\n/g, cl = /^\s*/, ul = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, dl = /^:\s*/, hl = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, pl = /^[;\s]*/, fl = /^\s+|\s+$/g, gl = `
`, wi = "/", Si = "*", Gt = "", ml = "comment", Cl = "declaration", yl = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(k) {
    var x = k.match(ll);
    x && (n += x.length);
    var R = k.lastIndexOf(gl);
    r = ~R ? k.length - R : r + k.length;
  }
  function a() {
    var k = { line: n, column: r };
    return function(x) {
      return x.position = new o(k), p(), x;
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
      var R = x[0];
      return i(R), e = e.slice(R.length), x;
    }
  }
  function p() {
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
      for (var x = 2; Gt != e.charAt(x) && (Si != e.charAt(x) || wi != e.charAt(x + 1)); )
        ++x;
      if (x += 2, Gt === e.charAt(x - 1))
        return s("End of comment missing");
      var R = e.slice(2, x - 2);
      return r += 2, i(R), e = e.slice(x), r += 2, k({
        type: ml,
        comment: R
      });
    }
  }
  function m() {
    var k = a(), x = c(ul);
    if (x) {
      if (f(), !c(dl)) return s("property missing ':'");
      var R = c(hl), T = k({
        type: Cl,
        property: xi(x[0].replace(yi, Gt)),
        value: R ? xi(R[0].replace(yi, Gt)) : Gt
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
  return p(), g();
};
function xi(e) {
  return e ? e.replace(fl, Gt) : Gt;
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
var Gn = {};
Object.defineProperty(Gn, "__esModule", { value: !0 });
Gn.camelCase = void 0;
var kl = /^--[a-zA-Z0-9_-]+$/, Tl = /-([a-z])/g, bl = /^[^-]+$/, El = /^-(webkit|moz|ms|o|khtml)-/, _l = /^-(ms)-/, vl = function(e) {
  return !e || bl.test(e) || kl.test(e);
}, Il = function(e, t) {
  return t.toUpperCase();
}, ki = function(e, t) {
  return "".concat(t, "-");
}, Rl = function(e, t) {
  return t === void 0 && (t = {}), vl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(_l, ki) : e = e.replace(El, ki), e.replace(Tl, Il));
};
Gn.camelCase = Rl;
var Ml = Hn && Hn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, Al = Ml(Dr), Nl = Gn;
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
  return bi(e && e.line) + ":" + bi(e && e.column);
}
function Ti(e) {
  return Tr(e && e.start) + "-" + Tr(e && e.end);
}
function bi(e) {
  return e && typeof e == "number" ? e : 1;
}
class Ue extends Error {
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
Ue.prototype.file = "";
Ue.prototype.name = "";
Ue.prototype.reason = "";
Ue.prototype.message = "";
Ue.prototype.stack = "";
Ue.prototype.column = void 0;
Ue.prototype.line = void 0;
Ue.prototype.ancestors = void 0;
Ue.prototype.cause = void 0;
Ue.prototype.fatal = void 0;
Ue.prototype.place = void 0;
Ue.prototype.ruleId = void 0;
Ue.prototype.source = void 0;
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
    return Gl(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return Vl(e, t, n);
  if (t.type === "mdxjsEsm")
    return Wl(e, t);
  if (t.type === "root")
    return jl(e, t, n);
  if (t.type === "text")
    return $l(e, t);
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
function Gl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return S(r.type === "ExpressionStatement"), /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  gn(e, t.position);
}
function Wl(e, t) {
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
function jl(e, t, n) {
  const r = {};
  return Hr(r, zr(e, t)), e.create(t, e.Fragment, r, n);
}
function $l(e, t) {
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
    const p = Array.isArray(o.children) ? n : t;
    return s ? p(a, o, s) : p(a, o);
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
        const p = i.get(c) || 0;
        o = c + "-" + p, i.set(c, p + 1);
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
    if (Array.isArray(n) && (n = r.commaSeparated ? js(n) : sl(n)), r.property === "style") {
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
    ), i = new Ue("Cannot parse `style` attribute", {
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
  const n = new Ue(
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
function st(e, t) {
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
    n < h.ht || n === h.vt || n > h.cr && n < h.space || // Control character (DEL) of C0, and C1 controls.
    n > h.tilde && n < 160 || // Lone high surrogates and low surrogates.
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
const yt = Pt(/[A-Za-z]/), it = Pt(/[\dA-Za-z]/), lc = Pt(/[#-'*+\--9=?A-Z^-~]/);
function br(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < h.space || e === h.del)
  );
}
const Er = Pt(/\d/), cc = Pt(/[\dA-Fa-f]/), uc = Pt(/[!-/:-@[-`{-~]/);
function V(e) {
  return e !== null && e < h.horizontalTab;
}
function Ze(e) {
  return e !== null && (e < h.nul || e === h.space);
}
function he(e) {
  return e === h.horizontalTab || e === h.virtualSpace || e === h.space;
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
    if (a === h.percentSign && it(e.charCodeAt(n + 1)) && it(e.charCodeAt(n + 2)))
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
function Ce(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return o;
  function o(c) {
    return he(c) ? (e.enter(n), s(c)) : t(c);
  }
  function s(c) {
    return he(c) && a++ < i ? (e.consume(c), s) : (e.exit(n), t(c));
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
      s === h.eof || V(s),
      "expected eol or eof"
    ), s === h.eof) {
      e.consume(s);
      return;
    }
    return e.enter(d.lineEnding), e.consume(s), e.exit(d.lineEnding), Ce(e, t, d.linePrefix);
  }
  function i(s) {
    return S(
      s !== h.eof && !V(s),
      "expected anything other than a line ending or EOF"
    ), e.enter(d.paragraph), a(s);
  }
  function a(s) {
    const c = e.enter(d.chunkText, {
      contentType: U.contentTypeText,
      previous: n
    });
    return n && (n.next = c), n = c, o(s);
  }
  function o(s) {
    if (s === h.eof) {
      e.exit(d.chunkText), e.exit(d.paragraph), e.consume(s);
      return;
    }
    return V(s) ? (e.consume(s), e.exit(d.chunkText), a) : (e.consume(s), o);
  }
}
const gc = { tokenize: mc }, Ii = { tokenize: Cc };
function mc(e) {
  const t = this, n = [];
  let r = 0, i, a, o;
  return s;
  function s(L) {
    if (r < n.length) {
      const F = n[r];
      return t.containerState = F[1], S(
        F[0].continuation,
        "expected `continuation` to be defined on container construct"
      ), e.attempt(
        F[0].continuation,
        c,
        p
      )(L);
    }
    return p(L);
  }
  function c(L) {
    if (S(
      t.containerState,
      "expected `containerState` to be defined after continuation"
    ), r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && I();
      const F = t.events.length;
      let N = F, E;
      for (; N--; )
        if (t.events[N][0] === "exit" && t.events[N][1].type === d.chunkFlow) {
          E = t.events[N][1].end;
          break;
        }
      S(E, "could not find previous flow chunk"), T(r);
      let q = F;
      for (; q < t.events.length; )
        t.events[q][1].end = { ...E }, q++;
      return St(
        t.events,
        N + 1,
        0,
        t.events.slice(F)
      ), t.events.length = q, p(L);
    }
    return s(L);
  }
  function p(L) {
    if (r === n.length) {
      if (!i)
        return m(L);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return k(L);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(
      Ii,
      l,
      f
    )(L);
  }
  function l(L) {
    return i && I(), T(r), m(L);
  }
  function f(L) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, k(L);
  }
  function m(L) {
    return t.containerState = {}, e.attempt(
      Ii,
      g,
      k
    )(L);
  }
  function g(L) {
    return S(
      t.currentConstruct,
      "expected `currentConstruct` to be defined on tokenizer"
    ), S(
      t.containerState,
      "expected `containerState` to be defined on tokenizer"
    ), r++, n.push([t.currentConstruct, t.containerState]), m(L);
  }
  function k(L) {
    if (L === h.eof) {
      i && I(), T(0), e.consume(L);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter(d.chunkFlow, {
      _tokenizer: i,
      contentType: U.contentTypeFlow,
      previous: a
    }), x(L);
  }
  function x(L) {
    if (L === h.eof) {
      R(e.exit(d.chunkFlow), !0), T(0), e.consume(L);
      return;
    }
    return V(L) ? (e.consume(L), R(e.exit(d.chunkFlow)), r = 0, t.interrupt = void 0, s) : (e.consume(L), x);
  }
  function R(L, F) {
    S(i, "expected `childFlow` to be defined when continuing");
    const N = t.sliceStream(L);
    if (F && N.push(null), L.previous = a, a && (a.next = L), a = L, i.defineSkip(L.start), i.write(N), t.parser.lazy[L.start.line]) {
      let E = i.events.length;
      for (; E--; )
        if (
          // The token starts before the line ending…
          i.events[E][1].start.offset < o && // …and either is not ended yet…
          (!i.events[E][1].end || // …or ends after it.
          i.events[E][1].end.offset > o)
        )
          return;
      const q = t.events.length;
      let W = q, Q, ne;
      for (; W--; )
        if (t.events[W][0] === "exit" && t.events[W][1].type === d.chunkFlow) {
          if (Q) {
            ne = t.events[W][1].end;
            break;
          }
          Q = !0;
        }
      for (S(ne, "could not find previous flow chunk"), T(r), E = q; E < t.events.length; )
        t.events[E][1].end = { ...ne }, E++;
      St(
        t.events,
        W + 1,
        0,
        t.events.slice(q)
      ), t.events.length = E;
    }
  }
  function T(L) {
    let F = n.length;
    for (; F-- > L; ) {
      const N = n[F];
      t.containerState = N[1], S(
        N[0].exit,
        "expected `exit` to be defined on container construct"
      ), N[0].exit.call(t, e);
    }
    n.length = L;
  }
  function I() {
    S(
      t.containerState,
      "expected `containerState` to be defined when closing flow"
    ), S(i, "expected `childFlow` to be defined when closing it"), i.write([h.eof]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Cc(e, t, n) {
  return S(
    this.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), Ce(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    d.linePrefix,
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize
  );
}
function Ri(e) {
  if (e === h.eof || Ze(e) || hc(e))
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
  let n = -1, r, i, a, o, s, c, p, l;
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
          }, e[r][1].end = { ...o.start }, e[n][1].start = { ...s.end }, p = [], e[r][1].end.offset - e[r][1].start.offset && (p = st(p, [
            ["enter", e[r][1], t],
            ["exit", e[r][1], t]
          ])), p = st(p, [
            ["enter", i, t],
            ["enter", o, t],
            ["exit", o, t],
            ["enter", a, t]
          ]), S(
            t.parser.constructs.insideSpan.null,
            "expected `insideSpan` to be populated"
          ), p = st(
            p,
            Br(
              t.parser.constructs.insideSpan.null,
              e.slice(r + 1, n),
              t
            )
          ), p = st(p, [
            ["exit", a, t],
            ["enter", s, t],
            ["exit", s, t],
            ["exit", i, t]
          ]), e[n][1].end.offset - e[n][1].start.offset ? (l = 2, p = st(p, [
            ["enter", e[n][1], t],
            ["exit", e[n][1], t]
          ])) : l = 0, St(e, r - 1, n - r + 3, p), n = r + p.length - l - 2;
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
      c === h.asterisk || c === h.underscore,
      "expected asterisk or underscore"
    ), a = c, e.enter("attentionSequence"), s(c);
  }
  function s(c) {
    if (c === a)
      return e.consume(c), s;
    const p = e.exit("attentionSequence"), l = Ri(c);
    S(n, "expected `attentionMarkers` to be populated");
    const f = !l || l === U.characterGroupPunctuation && i || n.includes(c), m = !i || i === U.characterGroupPunctuation && l || n.includes(r);
    return p._open = !!(a === h.asterisk ? f : f && (i || !m)), p._close = !!(a === h.asterisk ? m : m && (l || !f)), t(c);
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
    return S(g === h.lessThan, "expected `<`"), e.enter(d.autolink), e.enter(d.autolinkMarker), e.consume(g), e.exit(d.autolinkMarker), e.enter(d.autolinkProtocol), a;
  }
  function a(g) {
    return yt(g) ? (e.consume(g), o) : g === h.atSign ? n(g) : p(g);
  }
  function o(g) {
    return g === h.plusSign || g === h.dash || g === h.dot || it(g) ? (r = 1, s(g)) : p(g);
  }
  function s(g) {
    return g === h.colon ? (e.consume(g), r = 0, c) : (g === h.plusSign || g === h.dash || g === h.dot || it(g)) && r++ < U.autolinkSchemeSizeMax ? (e.consume(g), s) : (r = 0, p(g));
  }
  function c(g) {
    return g === h.greaterThan ? (e.exit(d.autolinkProtocol), e.enter(d.autolinkMarker), e.consume(g), e.exit(d.autolinkMarker), e.exit(d.autolink), t) : g === h.eof || g === h.space || g === h.lessThan || br(g) ? n(g) : (e.consume(g), c);
  }
  function p(g) {
    return g === h.atSign ? (e.consume(g), l) : lc(g) ? (e.consume(g), p) : n(g);
  }
  function l(g) {
    return it(g) ? f(g) : n(g);
  }
  function f(g) {
    return g === h.dot ? (e.consume(g), r = 0, l) : g === h.greaterThan ? (e.exit(d.autolinkProtocol).type = d.autolinkEmail, e.enter(d.autolinkMarker), e.consume(g), e.exit(d.autolinkMarker), e.exit(d.autolink), t) : m(g);
  }
  function m(g) {
    if ((g === h.dash || it(g)) && r++ < U.autolinkDomainSizeMax) {
      const k = g === h.dash ? m : f;
      return e.consume(g), k;
    }
    return n(g);
  }
}
const Wn = { partial: !0, tokenize: kc };
function kc(e, t, n) {
  return r;
  function r(a) {
    return he(a) ? Ce(e, i, d.linePrefix)(a) : i(a);
  }
  function i(a) {
    return a === h.eof || V(a) ? t(a) : n(a);
  }
}
const Da = {
  continuation: { tokenize: bc },
  exit: Ec,
  name: "blockQuote",
  tokenize: Tc
};
function Tc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    if (o === h.greaterThan) {
      const s = r.containerState;
      return S(s, "expected `containerState` to be defined in container"), s.open || (e.enter(d.blockQuote, { _container: !0 }), s.open = !0), e.enter(d.blockQuotePrefix), e.enter(d.blockQuoteMarker), e.consume(o), e.exit(d.blockQuoteMarker), a;
    }
    return n(o);
  }
  function a(o) {
    return he(o) ? (e.enter(d.blockQuotePrefixWhitespace), e.consume(o), e.exit(d.blockQuotePrefixWhitespace), e.exit(d.blockQuotePrefix), t) : (e.exit(d.blockQuotePrefix), t(o));
  }
}
function bc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return he(o) ? (S(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Ce(
      e,
      a,
      d.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize
    )(o)) : a(o);
  }
  function a(o) {
    return e.attempt(Da, t, n)(o);
  }
}
function Ec(e) {
  e.exit(d.blockQuote);
}
const Pa = {
  name: "characterEscape",
  tokenize: _c
};
function _c(e, t, n) {
  return r;
  function r(a) {
    return S(a === h.backslash, "expected `\\`"), e.enter(d.characterEscape), e.enter(d.escapeMarker), e.consume(a), e.exit(d.escapeMarker), i;
  }
  function i(a) {
    return uc(a) ? (e.enter(d.characterEscapeValue), e.consume(a), e.exit(d.characterEscapeValue), e.exit(d.characterEscape), t) : n(a);
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
    return S(f === h.ampersand, "expected `&`"), e.enter(d.characterReference), e.enter(d.characterReferenceMarker), e.consume(f), e.exit(d.characterReferenceMarker), c;
  }
  function c(f) {
    return f === h.numberSign ? (e.enter(d.characterReferenceMarkerNumeric), e.consume(f), e.exit(d.characterReferenceMarkerNumeric), p) : (e.enter(d.characterReferenceValue), a = U.characterReferenceNamedSizeMax, o = it, l(f));
  }
  function p(f) {
    return f === h.uppercaseX || f === h.lowercaseX ? (e.enter(d.characterReferenceMarkerHexadecimal), e.consume(f), e.exit(d.characterReferenceMarkerHexadecimal), e.enter(d.characterReferenceValue), a = U.characterReferenceHexadecimalSizeMax, o = cc, l) : (e.enter(d.characterReferenceValue), a = U.characterReferenceDecimalSizeMax, o = Er, l(f));
  }
  function l(f) {
    if (f === h.semicolon && i) {
      const m = e.exit(d.characterReferenceValue);
      return o === it && !Ur(r.sliceSerialize(m)) ? n(f) : (e.enter(d.characterReferenceMarker), e.consume(f), e.exit(d.characterReferenceMarker), e.exit(d.characterReference), t);
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
    return p(E);
  }
  function p(E) {
    S(
      E === h.graveAccent || E === h.tilde,
      "expected `` ` `` or `~`"
    );
    const q = r.events[r.events.length - 1];
    return a = q && q[1].type === d.linePrefix ? q[2].sliceSerialize(q[1], !0).length : 0, s = E, e.enter(d.codeFenced), e.enter(d.codeFencedFence), e.enter(d.codeFencedFenceSequence), l(E);
  }
  function l(E) {
    return E === s ? (o++, e.consume(E), l) : o < U.codeFencedSequenceSizeMin ? n(E) : (e.exit(d.codeFencedFenceSequence), he(E) ? Ce(e, f, d.whitespace)(E) : f(E));
  }
  function f(E) {
    return E === h.eof || V(E) ? (e.exit(d.codeFencedFence), r.interrupt ? t(E) : e.check(Ai, x, F)(E)) : (e.enter(d.codeFencedFenceInfo), e.enter(d.chunkString, { contentType: U.contentTypeString }), m(E));
  }
  function m(E) {
    return E === h.eof || V(E) ? (e.exit(d.chunkString), e.exit(d.codeFencedFenceInfo), f(E)) : he(E) ? (e.exit(d.chunkString), e.exit(d.codeFencedFenceInfo), Ce(e, g, d.whitespace)(E)) : E === h.graveAccent && E === s ? n(E) : (e.consume(E), m);
  }
  function g(E) {
    return E === h.eof || V(E) ? f(E) : (e.enter(d.codeFencedFenceMeta), e.enter(d.chunkString, { contentType: U.contentTypeString }), k(E));
  }
  function k(E) {
    return E === h.eof || V(E) ? (e.exit(d.chunkString), e.exit(d.codeFencedFenceMeta), f(E)) : E === h.graveAccent && E === s ? n(E) : (e.consume(E), k);
  }
  function x(E) {
    return S(V(E), "expected eol"), e.attempt(i, F, R)(E);
  }
  function R(E) {
    return S(V(E), "expected eol"), e.enter(d.lineEnding), e.consume(E), e.exit(d.lineEnding), T;
  }
  function T(E) {
    return a > 0 && he(E) ? Ce(
      e,
      I,
      d.linePrefix,
      a + 1
    )(E) : I(E);
  }
  function I(E) {
    return E === h.eof || V(E) ? e.check(Ai, x, F)(E) : (e.enter(d.codeFlowValue), L(E));
  }
  function L(E) {
    return E === h.eof || V(E) ? (e.exit(d.codeFlowValue), I(E)) : (e.consume(E), L);
  }
  function F(E) {
    return e.exit(d.codeFenced), t(E);
  }
  function N(E, q, W) {
    let Q = 0;
    return ne;
    function ne(Z) {
      return S(V(Z), "expected eol"), E.enter(d.lineEnding), E.consume(Z), E.exit(d.lineEnding), Y;
    }
    function Y(Z) {
      return S(
        r.parser.constructs.disable.null,
        "expected `disable.null` to be populated"
      ), E.enter(d.codeFencedFence), he(Z) ? Ce(
        E,
        H,
        d.linePrefix,
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize
      )(Z) : H(Z);
    }
    function H(Z) {
      return Z === s ? (E.enter(d.codeFencedFenceSequence), A(Z)) : W(Z);
    }
    function A(Z) {
      return Z === s ? (Q++, E.consume(Z), A) : Q >= o ? (E.exit(d.codeFencedFenceSequence), he(Z) ? Ce(E, P, d.whitespace)(Z) : P(Z)) : W(Z);
    }
    function P(Z) {
      return Z === h.eof || V(Z) ? (E.exit(d.codeFencedFence), q(Z)) : W(Z);
    }
  }
}
function Rc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === h.eof ? n(o) : (S(V(o), "expected eol"), e.enter(d.lineEnding), e.consume(o), e.exit(d.lineEnding), a);
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
  function i(p) {
    return S(he(p)), e.enter(d.codeIndented), Ce(
      e,
      a,
      d.linePrefix,
      U.tabSize + 1
    )(p);
  }
  function a(p) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === d.linePrefix && l[2].sliceSerialize(l[1], !0).length >= U.tabSize ? o(p) : n(p);
  }
  function o(p) {
    return p === h.eof ? c(p) : V(p) ? e.attempt(Mc, o, c)(p) : (e.enter(d.codeFlowValue), s(p));
  }
  function s(p) {
    return p === h.eof || V(p) ? (e.exit(d.codeFlowValue), o(p)) : (e.consume(p), s);
  }
  function c(p) {
    return e.exit(d.codeIndented), t(p);
  }
}
function Nc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : V(o) ? (e.enter(d.lineEnding), e.consume(o), e.exit(d.lineEnding), i) : Ce(
      e,
      a,
      d.linePrefix,
      U.tabSize + 1
    )(o);
  }
  function a(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === d.linePrefix && s[2].sliceSerialize(s[1], !0).length >= U.tabSize ? t(o) : V(o) ? i(o) : n(o);
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
function Ha(e) {
  return e !== h.graveAccent || this.events[this.events.length - 1][1].type === d.characterEscape;
}
function Dc(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return s;
  function s(m) {
    return S(m === h.graveAccent, "expected `` ` ``"), S(Ha.call(r, r.previous), "expected correct previous"), e.enter(d.codeText), e.enter(d.codeTextSequence), c(m);
  }
  function c(m) {
    return m === h.graveAccent ? (e.consume(m), i++, c) : (e.exit(d.codeTextSequence), p(m));
  }
  function p(m) {
    return m === h.eof ? n(m) : m === h.space ? (e.enter("space"), e.consume(m), e.exit("space"), p) : m === h.graveAccent ? (o = e.enter(d.codeTextSequence), a = 0, f(m)) : V(m) ? (e.enter(d.lineEnding), e.consume(m), e.exit(d.lineEnding), p) : (e.enter(d.codeTextData), l(m));
  }
  function l(m) {
    return m === h.eof || m === h.space || m === h.graveAccent || V(m) ? (e.exit(d.codeTextData), p(m)) : (e.consume(m), l);
  }
  function f(m) {
    return m === h.graveAccent ? (e.consume(m), a++, f) : a === i ? (e.exit(d.codeTextSequence), e.exit(d.codeText), t(m)) : (o.type = d.codeTextData, l(m));
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
  let n = -1, r, i, a, o, s, c, p;
  const l = new Pc(e);
  for (; ++n < l.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = l.get(n), n && r[1].type === d.chunkFlow && l.get(n - 1)[1].type === d.listItemPrefix && (S(r[1]._tokenizer, "expected `_tokenizer` on subtokens"), c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === d.lineEndingBlank && (a += 2), a < c.length && c[a][1].type === d.content))
      for (; ++a < c.length && c[a][1].type !== d.content; )
        c[a][1].type === d.chunkText && (c[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, Fc(l, n)), n = t[n], p = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (o = l.get(a), o[1].type === d.lineEnding || o[1].type === d.lineEndingBlank)
          o[0] === "enter" && (i && (l.get(i)[1].type = d.lineEndingBlank), o[1].type = d.lineEnding, i = a);
        else if (!(o[1].type === d.linePrefix || o[1].type === d.listItemIndent)) break;
      i && (r[1].end = { ...l.get(i)[1].start }, s = l.slice(i, n), s.unshift(r), l.splice(i, n - i + 1, s));
    }
  }
  return St(e, 0, Number.POSITIVE_INFINITY, l.slice(0)), !p;
}
function Fc(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  S(n.contentType, "expected `contentType` on subtokens");
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const s = o.events, c = [], p = {};
  let l, f, m = -1, g = n, k = 0, x = 0;
  const R = [x];
  for (; g; ) {
    for (; e.get(++i)[1] !== g; )
      ;
    S(
      !f || g.previous === f,
      "expected previous to match"
    ), S(!f || f.next === g, "expected next to match"), a.push(i), g._tokenizer || (l = r.sliceStream(g), g.next || l.push(h.eof), f && o.defineSkip(g.start), g._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(l), g._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), f = g, g = g.next;
  }
  for (g = n; ++m < s.length; )
    // Find a void token that includes a break.
    s[m][0] === "exit" && s[m - 1][0] === "enter" && s[m][1].type === s[m - 1][1].type && s[m][1].start.line !== s[m][1].end.line && (S(g, "expected a current token"), x = m + 1, R.push(x), g._tokenizer = void 0, g.previous = void 0, g = g.next);
  for (o.events = [], g ? (g._tokenizer = void 0, g.previous = void 0, S(!g.next, "expected no next token")) : R.pop(), m = R.length; m--; ) {
    const T = s.slice(R[m], R[m + 1]), I = a.pop();
    S(I !== void 0, "expected a start position when splicing"), c.push([I, I + T.length - 1]), e.splice(I, 2, T);
  }
  for (c.reverse(), m = -1; ++m < c.length; )
    p[k + c[m][0]] = k + c[m][1], k += c[m][1] - c[m][0] - 1;
  return p;
}
const Hc = { resolve: Uc, tokenize: Bc }, zc = { partial: !0, tokenize: Gc };
function Uc(e) {
  return za(e), e;
}
function Bc(e, t) {
  let n;
  return r;
  function r(s) {
    return S(
      s !== h.eof && !V(s),
      "expected no eof or eol"
    ), e.enter(d.content), n = e.enter(d.chunkContent, {
      contentType: U.contentTypeContent
    }), i(s);
  }
  function i(s) {
    return s === h.eof ? a(s) : V(s) ? e.check(
      zc,
      o,
      a
    )(s) : (e.consume(s), i);
  }
  function a(s) {
    return e.exit(d.chunkContent), e.exit(d.content), t(s);
  }
  function o(s) {
    return S(V(s), "expected eol"), e.consume(s), e.exit(d.chunkContent), S(n, "expected previous token"), n.next = e.enter(d.chunkContent, {
      contentType: U.contentTypeContent,
      previous: n
    }), n = n.next, i;
  }
}
function Gc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return S(V(o), "expected a line ending"), e.exit(d.chunkContent), e.enter(d.lineEnding), e.consume(o), e.exit(d.lineEnding), Ce(e, a, d.linePrefix);
  }
  function a(o) {
    if (o === h.eof || V(o))
      return n(o);
    S(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    );
    const s = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && s && s[1].type === d.linePrefix && s[2].sliceSerialize(s[1], !0).length >= U.tabSize ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function Ua(e, t, n, r, i, a, o, s, c) {
  const p = c || Number.POSITIVE_INFINITY;
  let l = 0;
  return f;
  function f(T) {
    return T === h.lessThan ? (e.enter(r), e.enter(i), e.enter(a), e.consume(T), e.exit(a), m) : T === h.eof || T === h.space || T === h.rightParenthesis || br(T) ? n(T) : (e.enter(r), e.enter(o), e.enter(s), e.enter(d.chunkString, { contentType: U.contentTypeString }), x(T));
  }
  function m(T) {
    return T === h.greaterThan ? (e.enter(a), e.consume(T), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter(d.chunkString, { contentType: U.contentTypeString }), g(T));
  }
  function g(T) {
    return T === h.greaterThan ? (e.exit(d.chunkString), e.exit(s), m(T)) : T === h.eof || T === h.lessThan || V(T) ? n(T) : (e.consume(T), T === h.backslash ? k : g);
  }
  function k(T) {
    return T === h.lessThan || T === h.greaterThan || T === h.backslash ? (e.consume(T), g) : g(T);
  }
  function x(T) {
    return !l && (T === h.eof || T === h.rightParenthesis || Ze(T)) ? (e.exit(d.chunkString), e.exit(s), e.exit(o), e.exit(r), t(T)) : l < p && T === h.leftParenthesis ? (e.consume(T), l++, x) : T === h.rightParenthesis ? (e.consume(T), l--, x) : T === h.eof || T === h.space || T === h.leftParenthesis || br(T) ? n(T) : (e.consume(T), T === h.backslash ? R : x);
  }
  function R(T) {
    return T === h.leftParenthesis || T === h.rightParenthesis || T === h.backslash ? (e.consume(T), x) : x(T);
  }
}
function Ba(e, t, n, r, i, a) {
  const o = this;
  let s = 0, c;
  return p;
  function p(g) {
    return S(g === h.leftSquareBracket, "expected `[`"), e.enter(r), e.enter(i), e.consume(g), e.exit(i), e.enter(a), l;
  }
  function l(g) {
    return s > U.linkReferenceSizeMax || g === h.eof || g === h.leftSquareBracket || g === h.rightSquareBracket && !c || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    g === h.caret && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(g) : g === h.rightSquareBracket ? (e.exit(a), e.enter(i), e.consume(g), e.exit(i), e.exit(r), t) : V(g) ? (e.enter(d.lineEnding), e.consume(g), e.exit(d.lineEnding), l) : (e.enter(d.chunkString, { contentType: U.contentTypeString }), f(g));
  }
  function f(g) {
    return g === h.eof || g === h.leftSquareBracket || g === h.rightSquareBracket || V(g) || s++ > U.linkReferenceSizeMax ? (e.exit(d.chunkString), l(g)) : (e.consume(g), c || (c = !he(g)), g === h.backslash ? m : f);
  }
  function m(g) {
    return g === h.leftSquareBracket || g === h.backslash || g === h.rightSquareBracket ? (e.consume(g), s++, f) : f(g);
  }
}
function Ga(e, t, n, r, i, a) {
  let o;
  return s;
  function s(m) {
    return m === h.quotationMark || m === h.apostrophe || m === h.leftParenthesis ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), o = m === h.leftParenthesis ? h.rightParenthesis : m, c) : n(m);
  }
  function c(m) {
    return m === o ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), t) : (e.enter(a), p(m));
  }
  function p(m) {
    return m === o ? (e.exit(a), c(o)) : m === h.eof ? n(m) : V(m) ? (e.enter(d.lineEnding), e.consume(m), e.exit(d.lineEnding), Ce(e, p, d.linePrefix)) : (e.enter(d.chunkString, { contentType: U.contentTypeString }), l(m));
  }
  function l(m) {
    return m === o || m === h.eof || V(m) ? (e.exit(d.chunkString), p(m)) : (e.consume(m), m === h.backslash ? f : l);
  }
  function f(m) {
    return m === o || m === h.backslash ? (e.consume(m), l) : l(m);
  }
}
function hn(e, t) {
  let n;
  return r;
  function r(i) {
    return V(i) ? (e.enter(d.lineEnding), e.consume(i), e.exit(d.lineEnding), n = !0, r) : he(i) ? Ce(
      e,
      r,
      n ? d.linePrefix : d.lineSuffix
    )(i) : t(i);
  }
}
const Wc = { name: "definition", tokenize: jc }, Vc = { partial: !0, tokenize: $c };
function jc(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(g) {
    return e.enter(d.definition), o(g);
  }
  function o(g) {
    return S(g === h.leftSquareBracket, "expected `[`"), Ba.call(
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
    return i = Yt(
      r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
    ), g === h.colon ? (e.enter(d.definitionMarker), e.consume(g), e.exit(d.definitionMarker), c) : n(g);
  }
  function c(g) {
    return Ze(g) ? hn(e, p)(g) : p(g);
  }
  function p(g) {
    return Ua(
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
    return e.attempt(Vc, f, f)(g);
  }
  function f(g) {
    return he(g) ? Ce(e, m, d.whitespace)(g) : m(g);
  }
  function m(g) {
    return g === h.eof || V(g) ? (e.exit(d.definition), r.parser.defined.push(i), t(g)) : n(g);
  }
}
function $c(e, t, n) {
  return r;
  function r(s) {
    return Ze(s) ? hn(e, i)(s) : n(s);
  }
  function i(s) {
    return Ga(
      e,
      a,
      n,
      d.definitionTitle,
      d.definitionTitleMarker,
      d.definitionTitleString
    )(s);
  }
  function a(s) {
    return he(s) ? Ce(
      e,
      o,
      d.whitespace
    )(s) : o(s);
  }
  function o(s) {
    return s === h.eof || V(s) ? t(s) : n(s);
  }
}
const qc = {
  name: "hardBreakEscape",
  tokenize: Zc
};
function Zc(e, t, n) {
  return r;
  function r(a) {
    return S(a === h.backslash, "expected `\\`"), e.enter(d.hardBreakEscape), e.consume(a), i;
  }
  function i(a) {
    return V(a) ? (e.exit(d.hardBreakEscape), t(a)) : n(a);
  }
}
const Kc = {
  name: "headingAtx",
  resolve: Xc,
  tokenize: Yc
};
function Xc(e, t) {
  let n = e.length - 2, r = 3, i, a;
  return e[r][1].type === d.whitespace && (r += 2), n - 2 > r && e[n][1].type === d.whitespace && (n -= 2), e[n][1].type === d.atxHeadingSequence && (r === n - 1 || n - 4 > r && e[n - 2][1].type === d.whitespace) && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: d.atxHeadingText,
    start: e[r][1].start,
    end: e[n][1].end
  }, a = {
    type: d.chunkText,
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
    return e.enter(d.atxHeading), a(l);
  }
  function a(l) {
    return S(l === h.numberSign, "expected `#`"), e.enter(d.atxHeadingSequence), o(l);
  }
  function o(l) {
    return l === h.numberSign && r++ < U.atxHeadingOpeningFenceSizeMax ? (e.consume(l), o) : l === h.eof || Ze(l) ? (e.exit(d.atxHeadingSequence), s(l)) : n(l);
  }
  function s(l) {
    return l === h.numberSign ? (e.enter(d.atxHeadingSequence), c(l)) : l === h.eof || V(l) ? (e.exit(d.atxHeading), t(l)) : he(l) ? Ce(e, s, d.whitespace)(l) : (e.enter(d.atxHeadingText), p(l));
  }
  function c(l) {
    return l === h.numberSign ? (e.consume(l), c) : (e.exit(d.atxHeadingSequence), s(l));
  }
  function p(l) {
    return l === h.eof || l === h.numberSign || Ze(l) ? (e.exit(d.atxHeadingText), s(l)) : (e.consume(l), p);
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
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === d.htmlFlow); )
    ;
  return t > 1 && e[t - 2][1].type === d.linePrefix && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function ru(e, t, n) {
  const r = this;
  let i, a, o, s, c;
  return p;
  function p(C) {
    return l(C);
  }
  function l(C) {
    return S(C === h.lessThan, "expected `<`"), e.enter(d.htmlFlow), e.enter(d.htmlFlowData), e.consume(C), f;
  }
  function f(C) {
    return C === h.exclamationMark ? (e.consume(C), m) : C === h.slash ? (e.consume(C), a = !0, x) : C === h.questionMark ? (e.consume(C), i = U.htmlInstruction, r.interrupt ? t : y) : yt(C) ? (S(C !== null), e.consume(C), o = String.fromCharCode(C), R) : n(C);
  }
  function m(C) {
    return C === h.dash ? (e.consume(C), i = U.htmlComment, g) : C === h.leftSquareBracket ? (e.consume(C), i = U.htmlCdata, s = 0, k) : yt(C) ? (e.consume(C), i = U.htmlDeclaration, r.interrupt ? t : y) : n(C);
  }
  function g(C) {
    return C === h.dash ? (e.consume(C), r.interrupt ? t : y) : n(C);
  }
  function k(C) {
    const le = U.cdataOpeningString;
    return C === le.charCodeAt(s++) ? (e.consume(C), s === le.length ? r.interrupt ? t : H : k) : n(C);
  }
  function x(C) {
    return yt(C) ? (S(C !== null), e.consume(C), o = String.fromCharCode(C), R) : n(C);
  }
  function R(C) {
    if (C === h.eof || C === h.slash || C === h.greaterThan || Ze(C)) {
      const le = C === h.slash, K = o.toLowerCase();
      return !le && !a && Li.includes(K) ? (i = U.htmlRaw, r.interrupt ? t(C) : H(C)) : Jc.includes(o.toLowerCase()) ? (i = U.htmlBasic, le ? (e.consume(C), T) : r.interrupt ? t(C) : H(C)) : (i = U.htmlComplete, r.interrupt && !r.parser.lazy[r.now().line] ? n(C) : a ? I(C) : L(C));
    }
    return C === h.dash || it(C) ? (e.consume(C), o += String.fromCharCode(C), R) : n(C);
  }
  function T(C) {
    return C === h.greaterThan ? (e.consume(C), r.interrupt ? t : H) : n(C);
  }
  function I(C) {
    return he(C) ? (e.consume(C), I) : ne(C);
  }
  function L(C) {
    return C === h.slash ? (e.consume(C), ne) : C === h.colon || C === h.underscore || yt(C) ? (e.consume(C), F) : he(C) ? (e.consume(C), L) : ne(C);
  }
  function F(C) {
    return C === h.dash || C === h.dot || C === h.colon || C === h.underscore || it(C) ? (e.consume(C), F) : N(C);
  }
  function N(C) {
    return C === h.equalsTo ? (e.consume(C), E) : he(C) ? (e.consume(C), N) : L(C);
  }
  function E(C) {
    return C === h.eof || C === h.lessThan || C === h.equalsTo || C === h.greaterThan || C === h.graveAccent ? n(C) : C === h.quotationMark || C === h.apostrophe ? (e.consume(C), c = C, q) : he(C) ? (e.consume(C), E) : W(C);
  }
  function q(C) {
    return C === c ? (e.consume(C), c = null, Q) : C === h.eof || V(C) ? n(C) : (e.consume(C), q);
  }
  function W(C) {
    return C === h.eof || C === h.quotationMark || C === h.apostrophe || C === h.slash || C === h.lessThan || C === h.equalsTo || C === h.greaterThan || C === h.graveAccent || Ze(C) ? N(C) : (e.consume(C), W);
  }
  function Q(C) {
    return C === h.slash || C === h.greaterThan || he(C) ? L(C) : n(C);
  }
  function ne(C) {
    return C === h.greaterThan ? (e.consume(C), Y) : n(C);
  }
  function Y(C) {
    return C === h.eof || V(C) ? H(C) : he(C) ? (e.consume(C), Y) : n(C);
  }
  function H(C) {
    return C === h.dash && i === U.htmlComment ? (e.consume(C), ae) : C === h.lessThan && i === U.htmlRaw ? (e.consume(C), z) : C === h.greaterThan && i === U.htmlDeclaration ? (e.consume(C), G) : C === h.questionMark && i === U.htmlInstruction ? (e.consume(C), y) : C === h.rightSquareBracket && i === U.htmlCdata ? (e.consume(C), Te) : V(C) && (i === U.htmlBasic || i === U.htmlComplete) ? (e.exit(d.htmlFlowData), e.check(
      eu,
      ge,
      A
    )(C)) : C === h.eof || V(C) ? (e.exit(d.htmlFlowData), A(C)) : (e.consume(C), H);
  }
  function A(C) {
    return e.check(
      tu,
      P,
      ge
    )(C);
  }
  function P(C) {
    return S(V(C)), e.enter(d.lineEnding), e.consume(C), e.exit(d.lineEnding), Z;
  }
  function Z(C) {
    return C === h.eof || V(C) ? A(C) : (e.enter(d.htmlFlowData), H(C));
  }
  function ae(C) {
    return C === h.dash ? (e.consume(C), y) : H(C);
  }
  function z(C) {
    return C === h.slash ? (e.consume(C), o = "", we) : H(C);
  }
  function we(C) {
    if (C === h.greaterThan) {
      const le = o.toLowerCase();
      return Li.includes(le) ? (e.consume(C), G) : H(C);
    }
    return yt(C) && o.length < U.htmlRawSizeMax ? (S(C !== null), e.consume(C), o += String.fromCharCode(C), we) : H(C);
  }
  function Te(C) {
    return C === h.rightSquareBracket ? (e.consume(C), y) : H(C);
  }
  function y(C) {
    return C === h.greaterThan ? (e.consume(C), G) : C === h.dash && i === U.htmlComment ? (e.consume(C), y) : H(C);
  }
  function G(C) {
    return C === h.eof || V(C) ? (e.exit(d.htmlFlowData), ge(C)) : (e.consume(C), G);
  }
  function ge(C) {
    return e.exit(d.htmlFlow), t(C);
  }
}
function iu(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return V(o) ? (e.enter(d.lineEnding), e.consume(o), e.exit(d.lineEnding), a) : n(o);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function au(e, t, n) {
  return r;
  function r(i) {
    return S(V(i), "expected a line ending"), e.enter(d.lineEnding), e.consume(i), e.exit(d.lineEnding), e.attempt(Wn, t, n);
  }
}
const ou = { name: "htmlText", tokenize: su };
function su(e, t, n) {
  const r = this;
  let i, a, o;
  return s;
  function s(y) {
    return S(y === h.lessThan, "expected `<`"), e.enter(d.htmlText), e.enter(d.htmlTextData), e.consume(y), c;
  }
  function c(y) {
    return y === h.exclamationMark ? (e.consume(y), p) : y === h.slash ? (e.consume(y), N) : y === h.questionMark ? (e.consume(y), L) : yt(y) ? (e.consume(y), W) : n(y);
  }
  function p(y) {
    return y === h.dash ? (e.consume(y), l) : y === h.leftSquareBracket ? (e.consume(y), a = 0, k) : yt(y) ? (e.consume(y), I) : n(y);
  }
  function l(y) {
    return y === h.dash ? (e.consume(y), g) : n(y);
  }
  function f(y) {
    return y === h.eof ? n(y) : y === h.dash ? (e.consume(y), m) : V(y) ? (o = f, z(y)) : (e.consume(y), f);
  }
  function m(y) {
    return y === h.dash ? (e.consume(y), g) : f(y);
  }
  function g(y) {
    return y === h.greaterThan ? ae(y) : y === h.dash ? m(y) : f(y);
  }
  function k(y) {
    const G = U.cdataOpeningString;
    return y === G.charCodeAt(a++) ? (e.consume(y), a === G.length ? x : k) : n(y);
  }
  function x(y) {
    return y === h.eof ? n(y) : y === h.rightSquareBracket ? (e.consume(y), R) : V(y) ? (o = x, z(y)) : (e.consume(y), x);
  }
  function R(y) {
    return y === h.rightSquareBracket ? (e.consume(y), T) : x(y);
  }
  function T(y) {
    return y === h.greaterThan ? ae(y) : y === h.rightSquareBracket ? (e.consume(y), T) : x(y);
  }
  function I(y) {
    return y === h.eof || y === h.greaterThan ? ae(y) : V(y) ? (o = I, z(y)) : (e.consume(y), I);
  }
  function L(y) {
    return y === h.eof ? n(y) : y === h.questionMark ? (e.consume(y), F) : V(y) ? (o = L, z(y)) : (e.consume(y), L);
  }
  function F(y) {
    return y === h.greaterThan ? ae(y) : L(y);
  }
  function N(y) {
    return yt(y) ? (e.consume(y), E) : n(y);
  }
  function E(y) {
    return y === h.dash || it(y) ? (e.consume(y), E) : q(y);
  }
  function q(y) {
    return V(y) ? (o = q, z(y)) : he(y) ? (e.consume(y), q) : ae(y);
  }
  function W(y) {
    return y === h.dash || it(y) ? (e.consume(y), W) : y === h.slash || y === h.greaterThan || Ze(y) ? Q(y) : n(y);
  }
  function Q(y) {
    return y === h.slash ? (e.consume(y), ae) : y === h.colon || y === h.underscore || yt(y) ? (e.consume(y), ne) : V(y) ? (o = Q, z(y)) : he(y) ? (e.consume(y), Q) : ae(y);
  }
  function ne(y) {
    return y === h.dash || y === h.dot || y === h.colon || y === h.underscore || it(y) ? (e.consume(y), ne) : Y(y);
  }
  function Y(y) {
    return y === h.equalsTo ? (e.consume(y), H) : V(y) ? (o = Y, z(y)) : he(y) ? (e.consume(y), Y) : Q(y);
  }
  function H(y) {
    return y === h.eof || y === h.lessThan || y === h.equalsTo || y === h.greaterThan || y === h.graveAccent ? n(y) : y === h.quotationMark || y === h.apostrophe ? (e.consume(y), i = y, A) : V(y) ? (o = H, z(y)) : he(y) ? (e.consume(y), H) : (e.consume(y), P);
  }
  function A(y) {
    return y === i ? (e.consume(y), i = void 0, Z) : y === h.eof ? n(y) : V(y) ? (o = A, z(y)) : (e.consume(y), A);
  }
  function P(y) {
    return y === h.eof || y === h.quotationMark || y === h.apostrophe || y === h.lessThan || y === h.equalsTo || y === h.graveAccent ? n(y) : y === h.slash || y === h.greaterThan || Ze(y) ? Q(y) : (e.consume(y), P);
  }
  function Z(y) {
    return y === h.slash || y === h.greaterThan || Ze(y) ? Q(y) : n(y);
  }
  function ae(y) {
    return y === h.greaterThan ? (e.consume(y), e.exit(d.htmlTextData), e.exit(d.htmlText), t) : n(y);
  }
  function z(y) {
    return S(o, "expected return state"), S(V(y), "expected eol"), e.exit(d.htmlTextData), e.enter(d.lineEnding), e.consume(y), e.exit(d.lineEnding), we;
  }
  function we(y) {
    return S(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), he(y) ? Ce(
      e,
      Te,
      d.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize
    )(y) : Te(y);
  }
  function Te(y) {
    return e.enter(d.htmlTextData), o(y);
  }
}
const Gr = {
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
    if (n.push(e[t]), r.type === d.labelImage || r.type === d.labelLink || r.type === d.labelEnd) {
      const i = r.type === d.labelImage ? 4 : 2;
      r.type = d.data, t += i;
    }
  }
  return e.length !== n.length && St(e, 0, e.length, n), e;
}
function hu(e, t) {
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
  S(a !== void 0, "`open` is supposed to be found"), S(o !== void 0, "`close` is supposed to be found");
  const c = {
    type: e[a][1].type === d.labelLink ? d.link : d.image,
    start: { ...e[a][1].start },
    end: { ...e[e.length - 1][1].end }
  }, p = {
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
    ["enter", p, t]
  ], s = st(s, e.slice(a + 1, a + r + 3)), s = st(s, [["enter", l, t]]), S(
    t.parser.constructs.insideSpan.null,
    "expected `insideSpan.null` to be populated"
  ), s = st(
    s,
    Br(
      t.parser.constructs.insideSpan.null,
      e.slice(a + r + 4, o - 3),
      t
    )
  ), s = st(s, [
    ["exit", l, t],
    e[o - 2],
    e[o - 1],
    ["exit", p, t]
  ]), s = st(s, e.slice(o + 1)), s = st(s, [["exit", c, t]]), St(e, a, e.length, s), e;
}
function pu(e, t, n) {
  const r = this;
  let i = r.events.length, a, o;
  for (; i--; )
    if ((r.events[i][1].type === d.labelImage || r.events[i][1].type === d.labelLink) && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return s;
  function s(m) {
    return S(m === h.rightSquareBracket, "expected `]`"), a ? a._inactive ? f(m) : (o = r.parser.defined.includes(
      Yt(
        r.sliceSerialize({ start: a.end, end: r.now() })
      )
    ), e.enter(d.labelEnd), e.enter(d.labelMarker), e.consume(m), e.exit(d.labelMarker), e.exit(d.labelEnd), c) : n(m);
  }
  function c(m) {
    return m === h.leftParenthesis ? e.attempt(
      lu,
      l,
      o ? l : f
    )(m) : m === h.leftSquareBracket ? e.attempt(
      cu,
      l,
      o ? p : f
    )(m) : o ? l(m) : f(m);
  }
  function p(m) {
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
    return S(f === h.leftParenthesis, "expected left paren"), e.enter(d.resource), e.enter(d.resourceMarker), e.consume(f), e.exit(d.resourceMarker), i;
  }
  function i(f) {
    return Ze(f) ? hn(e, a)(f) : a(f);
  }
  function a(f) {
    return f === h.rightParenthesis ? l(f) : Ua(
      e,
      o,
      s,
      d.resourceDestination,
      d.resourceDestinationLiteral,
      d.resourceDestinationLiteralMarker,
      d.resourceDestinationRaw,
      d.resourceDestinationString,
      U.linkResourceDestinationBalanceMax
    )(f);
  }
  function o(f) {
    return Ze(f) ? hn(e, c)(f) : l(f);
  }
  function s(f) {
    return n(f);
  }
  function c(f) {
    return f === h.quotationMark || f === h.apostrophe || f === h.leftParenthesis ? Ga(
      e,
      p,
      n,
      d.resourceTitle,
      d.resourceTitleMarker,
      d.resourceTitleString
    )(f) : l(f);
  }
  function p(f) {
    return Ze(f) ? hn(e, l)(f) : l(f);
  }
  function l(f) {
    return f === h.rightParenthesis ? (e.enter(d.resourceMarker), e.consume(f), e.exit(d.resourceMarker), e.exit(d.resource), t) : n(f);
  }
}
function gu(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return S(s === h.leftSquareBracket, "expected left bracket"), Ba.call(
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
    return S(a === h.leftSquareBracket, "expected left bracket"), e.enter(d.reference), e.enter(d.referenceMarker), e.consume(a), e.exit(d.referenceMarker), i;
  }
  function i(a) {
    return a === h.rightSquareBracket ? (e.enter(d.referenceMarker), e.consume(a), e.exit(d.referenceMarker), e.exit(d.reference), t) : n(a);
  }
}
const Cu = {
  name: "labelStartImage",
  resolveAll: Gr.resolveAll,
  tokenize: yu
};
function yu(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return S(s === h.exclamationMark, "expected `!`"), e.enter(d.labelImage), e.enter(d.labelImageMarker), e.consume(s), e.exit(d.labelImageMarker), a;
  }
  function a(s) {
    return s === h.leftSquareBracket ? (e.enter(d.labelMarker), e.consume(s), e.exit(d.labelMarker), e.exit(d.labelImage), o) : n(s);
  }
  function o(s) {
    return s === h.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : t(s);
  }
}
const wu = {
  name: "labelStartLink",
  resolveAll: Gr.resolveAll,
  tokenize: Su
};
function Su(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return S(o === h.leftSquareBracket, "expected `[`"), e.enter(d.labelLink), e.enter(d.labelMarker), e.consume(o), e.exit(d.labelMarker), e.exit(d.labelLink), a;
  }
  function a(o) {
    return o === h.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const ir = { name: "lineEnding", tokenize: xu };
function xu(e, t) {
  return n;
  function n(r) {
    return S(V(r), "expected eol"), e.enter(d.lineEnding), e.consume(r), e.exit(d.lineEnding), Ce(e, t, d.linePrefix);
  }
}
const On = {
  name: "thematicBreak",
  tokenize: ku
};
function ku(e, t, n) {
  let r = 0, i;
  return a;
  function a(p) {
    return e.enter(d.thematicBreak), o(p);
  }
  function o(p) {
    return S(
      p === h.asterisk || p === h.dash || p === h.underscore,
      "expected `*`, `-`, or `_`"
    ), i = p, s(p);
  }
  function s(p) {
    return p === i ? (e.enter(d.thematicBreakSequence), c(p)) : r >= U.thematicBreakMarkerCountMin && (p === h.eof || V(p)) ? (e.exit(d.thematicBreak), t(p)) : n(p);
  }
  function c(p) {
    return p === i ? (e.consume(p), r++, c) : (e.exit(d.thematicBreakSequence), he(p) ? Ce(e, s, d.whitespace)(p) : s(p));
  }
}
const qe = {
  continuation: { tokenize: _u },
  exit: Iu,
  name: "list",
  tokenize: Eu
}, Tu = {
  partial: !0,
  tokenize: Ru
}, bu = { partial: !0, tokenize: vu };
function Eu(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === d.linePrefix ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return s;
  function s(g) {
    S(r.containerState, "expected state");
    const k = r.containerState.type || (g === h.asterisk || g === h.plusSign || g === h.dash ? d.listUnordered : d.listOrdered);
    if (k === d.listUnordered ? !r.containerState.marker || g === r.containerState.marker : Er(g)) {
      if (r.containerState.type || (r.containerState.type = k, e.enter(k, { _container: !0 })), k === d.listUnordered)
        return e.enter(d.listItemPrefix), g === h.asterisk || g === h.dash ? e.check(On, n, p)(g) : p(g);
      if (!r.interrupt || g === h.digit1)
        return e.enter(d.listItemPrefix), e.enter(d.listItemValue), c(g);
    }
    return n(g);
  }
  function c(g) {
    return S(r.containerState, "expected state"), Er(g) && ++o < U.listItemValueSizeMax ? (e.consume(g), c) : (!r.interrupt || o < 2) && (r.containerState.marker ? g === r.containerState.marker : g === h.rightParenthesis || g === h.dot) ? (e.exit(d.listItemValue), p(g)) : n(g);
  }
  function p(g) {
    return S(r.containerState, "expected state"), S(g !== h.eof, "eof (`null`) is not a marker"), e.enter(d.listItemMarker), e.consume(g), e.exit(d.listItemMarker), r.containerState.marker = r.containerState.marker || g, e.check(
      Wn,
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
    return he(g) ? (e.enter(d.listItemPrefixWhitespace), e.consume(g), e.exit(d.listItemPrefixWhitespace), m) : n(g);
  }
  function m(g) {
    return S(r.containerState, "expected state"), r.containerState.size = a + r.sliceSerialize(e.exit(d.listItemPrefix), !0).length, t(g);
  }
}
function _u(e, t, n) {
  const r = this;
  return S(r.containerState, "expected state"), r.containerState._closeFlow = void 0, e.check(Wn, i, a);
  function i(s) {
    return S(r.containerState, "expected state"), S(typeof r.containerState.size == "number", "expected size"), r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, Ce(
      e,
      t,
      d.listItemIndent,
      r.containerState.size + 1
    )(s);
  }
  function a(s) {
    return S(r.containerState, "expected state"), r.containerState.furtherBlankLines || !he(s) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(s)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(bu, t, o)(s));
  }
  function o(s) {
    return S(r.containerState, "expected state"), r.containerState._closeFlow = !0, r.interrupt = void 0, S(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Ce(
      e,
      e.attempt(qe, t, n),
      d.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize
    )(s);
  }
}
function vu(e, t, n) {
  const r = this;
  return S(r.containerState, "expected state"), S(typeof r.containerState.size == "number", "expected size"), Ce(
    e,
    i,
    d.listItemIndent,
    r.containerState.size + 1
  );
  function i(a) {
    S(r.containerState, "expected state");
    const o = r.events[r.events.length - 1];
    return o && o[1].type === d.listItemIndent && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(a) : n(a);
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
  ), Ce(
    e,
    i,
    d.listItemPrefixWhitespace,
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : U.tabSize + 1
  );
  function i(a) {
    const o = r.events[r.events.length - 1];
    return !he(a) && o && o[1].type === d.listItemPrefixWhitespace ? t(a) : n(a);
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
      if (e[n][1].type === d.content) {
        r = n;
        break;
      }
      e[n][1].type === d.paragraph && (i = n);
    } else
      e[n][1].type === d.content && e.splice(n, 1), !a && e[n][1].type === d.definition && (a = n);
  S(i !== void 0, "expected a `text` index to be found"), S(r !== void 0, "expected a `text` index to be found"), S(e[r][2] === t, "enter context should be same"), S(
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
function Au(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(p) {
    let l = r.events.length, f;
    for (S(
      p === h.dash || p === h.equalsTo,
      "expected `=` or `-`"
    ); l--; )
      if (r.events[l][1].type !== d.lineEnding && r.events[l][1].type !== d.linePrefix && r.events[l][1].type !== d.content) {
        f = r.events[l][1].type === d.paragraph;
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || f) ? (e.enter(d.setextHeadingLine), i = p, o(p)) : n(p);
  }
  function o(p) {
    return e.enter(d.setextHeadingLineSequence), s(p);
  }
  function s(p) {
    return p === i ? (e.consume(p), s) : (e.exit(d.setextHeadingLineSequence), he(p) ? Ce(e, c, d.lineSuffix)(p) : c(p));
  }
  function c(p) {
    return p === h.eof || V(p) ? (e.exit(d.setextHeadingLine), t(p)) : n(p);
  }
}
const Nu = { tokenize: Lu };
function Lu(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    Wn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(
      this.parser.constructs.flowInitial,
      i,
      Ce(
        e,
        e.attempt(
          this.parser.constructs.flow,
          i,
          e.attempt(Hc, i)
        ),
        d.linePrefix
      )
    )
  );
  return n;
  function r(a) {
    if (S(
      a === h.eof || V(a),
      "expected eol or eof"
    ), a === h.eof) {
      e.consume(a);
      return;
    }
    return e.enter(d.lineEndingBlank), e.consume(a), e.exit(d.lineEndingBlank), t.currentConstruct = void 0, n;
  }
  function i(a) {
    if (S(
      a === h.eof || V(a),
      "expected eol or eof"
    ), a === h.eof) {
      e.consume(a);
      return;
    }
    return e.enter(d.lineEnding), e.consume(a), e.exit(d.lineEnding), t.currentConstruct = void 0, n;
  }
}
const Ou = { resolveAll: Va() }, Du = Wa("string"), Pu = Wa("text");
function Wa(e) {
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
      return p(l) ? a(l) : s(l);
    }
    function s(l) {
      if (l === h.eof) {
        n.consume(l);
        return;
      }
      return n.enter(d.data), n.consume(l), c;
    }
    function c(l) {
      return p(l) ? (n.exit(d.data), a(l)) : (n.consume(l), c);
    }
    function p(l) {
      if (l === h.eof)
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
      a === void 0 ? n[i] && n[i][1].type === d.data && (a = i, i++) : (!n[i] || n[i][1].type !== d.data) && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function Fu(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === d.lineEnding) && e[n - 1][1].type === d.data) {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let a = i.length, o = -1, s = 0, c;
      for (; a--; ) {
        const p = i[a];
        if (typeof p == "string") {
          for (o = p.length; p.charCodeAt(o - 1) === h.space; )
            s++, o--;
          if (o) break;
          o = -1;
        } else if (p === h.horizontalTab)
          c = !0, s++;
        else if (p !== h.virtualSpace) {
          a++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (s = 0), s) {
        const p = {
          type: n === e.length || c || s < U.hardBreakPrefixSizeMin ? d.lineSuffix : d.hardBreakTrailing,
          start: {
            _bufferIndex: a ? o : r.start._bufferIndex + o,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - s,
            offset: r.end.offset - s
          },
          end: { ...r.end }
        };
        r.end = { ...p.start }, r.start.offset === r.end.offset ? Object.assign(r, p) : (e.splice(
          n,
          0,
          ["enter", p, t],
          ["exit", p, t]
        ), n += 2);
      }
      n++;
    }
  return e;
}
const Hu = {
  [h.asterisk]: qe,
  [h.plusSign]: qe,
  [h.dash]: qe,
  [h.digit0]: qe,
  [h.digit1]: qe,
  [h.digit2]: qe,
  [h.digit3]: qe,
  [h.digit4]: qe,
  [h.digit5]: qe,
  [h.digit6]: qe,
  [h.digit7]: qe,
  [h.digit8]: qe,
  [h.digit9]: qe,
  [h.greaterThan]: Da
}, zu = {
  [h.leftSquareBracket]: Wc
}, Uu = {
  [h.horizontalTab]: rr,
  [h.virtualSpace]: rr,
  [h.space]: rr
}, Bu = {
  [h.numberSign]: Kc,
  [h.asterisk]: On,
  [h.dash]: [Oi, On],
  [h.lessThan]: Qc,
  [h.equalsTo]: Oi,
  [h.underscore]: On,
  [h.graveAccent]: Ni,
  [h.tilde]: Ni
}, Gu = {
  [h.ampersand]: Fa,
  [h.backslash]: Pa
}, Wu = {
  [h.carriageReturn]: ir,
  [h.lineFeed]: ir,
  [h.carriageReturnLineFeed]: ir,
  [h.exclamationMark]: Cu,
  [h.ampersand]: Fa,
  [h.asterisk]: _r,
  [h.lessThan]: [Sc, ou],
  [h.leftSquareBracket]: wu,
  [h.backslash]: [qc, Pa],
  [h.rightSquareBracket]: Gr,
  [h.underscore]: _r,
  [h.graveAccent]: Lc
}, Vu = { null: [_r, Ou] }, ju = { null: [h.asterisk, h.underscore] }, $u = { null: [] }, qu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: ju,
  contentInitial: zu,
  disable: $u,
  document: Hu,
  flow: Bu,
  flowInitial: Uu,
  insideSpan: Vu,
  string: Gu,
  text: Wu
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
    return f >= r ? p(l, f, r, "day") : f >= n ? p(l, f, n, "hour") : f >= t ? p(l, f, t, "minute") : f >= e ? p(l, f, e, "second") : l + " ms";
  }
  function p(l, f, m, g) {
    var k = f >= m * 1.5;
    return Math.round(l / m) + " " + g + (k ? "s" : "");
  }
  return ar;
}
function Ku(e) {
  n.debug = n, n.default = n, n.coerce = c, n.disable = o, n.enable = i, n.enabled = s, n.humanize = Zu(), n.destroy = p, Object.keys(e).forEach((l) => {
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
    function x(...R) {
      if (!x.enabled)
        return;
      const T = x, I = Number(/* @__PURE__ */ new Date()), L = I - (f || I);
      T.diff = L, T.prev = f, T.curr = I, f = I, R[0] = n.coerce(R[0]), typeof R[0] != "string" && R.unshift("%O");
      let F = 0;
      R[0] = R[0].replace(/%([a-zA-Z%])/g, (E, q) => {
        if (E === "%%")
          return "%";
        F++;
        const W = n.formatters[q];
        if (typeof W == "function") {
          const Q = R[F];
          E = W.call(T, Q), R.splice(F, 1), F--;
        }
        return E;
      }), n.formatArgs.call(T, R), (T.log || n.log).apply(T, R);
    }
    return x.namespace = l, x.useColors = n.useColors(), x.color = n.selectColor(l), x.extend = r, x.destroy = n.destroy, Object.defineProperty(x, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => m !== null ? m : (g !== n.namespaces && (g = n.namespaces, k = n.enabled(l)), k),
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
  function p() {
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
    const p = "color: " + this.color;
    c.splice(1, 0, p, "color: inherit");
    let l = 0, f = 0;
    c[0].replace(/%[a-zA-Z%]/g, (m) => {
      m !== "%%" && (l++, m === "%c" && (f = l));
    }), c.splice(f, 0, p);
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
    } catch (p) {
      return "[UnexpectedJSONParseError]: " + p.message;
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
  const p = {
    attempt: Q(q),
    check: Q(W),
    consume: F,
    enter: N,
    exit: E,
    interrupt: Q(W, { interrupt: !0 })
  }, l = {
    code: h.eof,
    containerState: {},
    defineSkip: T,
    events: [],
    now: R,
    parser: e,
    previous: h.eof,
    sliceSerialize: k,
    sliceStream: x,
    write: g
  };
  let f = t.tokenize.call(l, p), m;
  return t.resolveAll && a.push(t), l;
  function g(A) {
    return o = st(o, A), I(), o[o.length - 1] !== h.eof ? [] : (ne(t, 0), l.events = Br(a, l.events, l), l.events);
  }
  function k(A, P) {
    return t1(x(A), P);
  }
  function x(A) {
    return e1(o, A);
  }
  function R() {
    const { _bufferIndex: A, _index: P, line: Z, column: ae, offset: z } = r;
    return { _bufferIndex: A, _index: P, line: Z, column: ae, offset: z };
  }
  function T(A) {
    i[A.line] = A.column, H(), Bt("position: define skip: `%j`", r);
  }
  function I() {
    let A;
    for (; r._index < o.length; ) {
      const P = o[r._index];
      if (typeof P == "string")
        for (A = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === A && r._bufferIndex < P.length; )
          L(P.charCodeAt(r._bufferIndex));
      else
        L(P);
    }
  }
  function L(A) {
    S(c === !0, "expected character to be consumed"), c = void 0, Bt("main: passing `%s` to %s", A, f && f.name), m = A, S(typeof f == "function", "expected state"), f = f(A);
  }
  function F(A) {
    S(A === m, "expected given code to equal expected code"), Bt("consume: `%s`", A), S(
      c === void 0,
      "expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used"
    ), S(
      A === null ? l.events.length === 0 || l.events[l.events.length - 1][0] === "exit" : l.events[l.events.length - 1][0] === "enter",
      "expected last token to be open"
    ), V(A) ? (r.line++, r.column = 1, r.offset += A === h.carriageReturnLineFeed ? 2 : 1, H(), Bt("position: after eol: `%j`", r)) : A !== h.virtualSpace && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = A, c = !0;
  }
  function N(A, P) {
    const Z = P || {};
    return Z.type = A, Z.start = R(), S(typeof A == "string", "expected string type"), S(A.length > 0, "expected non-empty string"), Bt("enter: `%s`", A), l.events.push(["enter", Z, l]), s.push(Z), Z;
  }
  function E(A) {
    S(typeof A == "string", "expected string type"), S(A.length > 0, "expected non-empty string");
    const P = s.pop();
    return S(P, "cannot close w/o open tokens"), P.end = R(), S(A === P.type, "expected exit token to match current token"), S(
      !(P.start._index === P.end._index && P.start._bufferIndex === P.end._bufferIndex),
      "expected non-empty token (`" + A + "`)"
    ), Bt("exit: `%s`", P.type), l.events.push(["exit", P, l]), P;
  }
  function q(A, P) {
    ne(A, P.from);
  }
  function W(A, P) {
    P.restore();
  }
  function Q(A, P) {
    return Z;
    function Z(ae, z, we) {
      let Te, y, G, ge;
      return Array.isArray(ae) ? (
        /* c8 ignore next 1 */
        le(ae)
      ) : "tokenize" in ae ? (
        // Looks like a construct.
        le([
          /** @type {Construct} */
          ae
        ])
      ) : C(ae);
      function C(ce) {
        return ct;
        function ct(Ee) {
          const Ne = Ee !== null && ce[Ee], at = Ee !== null && ce.null, Xe = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ne) ? Ne : Ne ? [Ne] : [],
            ...Array.isArray(at) ? at : at ? [at] : []
          ];
          return le(Xe)(Ee);
        }
      }
      function le(ce) {
        return Te = ce, y = 0, ce.length === 0 ? (S(we, "expected `bogusState` to be given"), we) : K(ce[y]);
      }
      function K(ce) {
        return ct;
        function ct(Ee) {
          return ge = Y(), G = ce, ce.partial || (l.currentConstruct = ce), S(
            l.parser.constructs.disable.null,
            "expected `disable.null` to be populated"
          ), ce.name && l.parser.constructs.disable.null.includes(ce.name) ? pe(Ee) : ce.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            P ? Object.assign(Object.create(l), P) : l,
            p,
            fe,
            pe
          )(Ee);
        }
      }
      function fe(ce) {
        return S(ce === m, "expected code"), c = !0, A(G, ge), z;
      }
      function pe(ce) {
        return S(ce === m, "expected code"), c = !0, ge.restore(), ++y < Te.length ? K(Te[y]) : we;
      }
    }
  }
  function ne(A, P) {
    A.resolveAll && !a.includes(A) && a.push(A), A.resolve && St(
      l.events,
      P,
      l.events.length - P,
      A.resolve(l.events.slice(P), l)
    ), A.resolveTo && (l.events = A.resolveTo(l.events, l)), S(
      A.partial || l.events.length === 0 || l.events[l.events.length - 1][0] === "exit",
      "expected last token to end"
    );
  }
  function Y() {
    const A = R(), P = l.previous, Z = l.currentConstruct, ae = l.events.length, z = Array.from(s);
    return { from: ae, restore: we };
    function we() {
      r = A, l.previous = P, l.currentConstruct = Z, l.events.length = ae, s = z, H(), Bt("position: restore: `%j`", r);
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
        case h.carriageReturn: {
          o = gt.cr;
          break;
        }
        case h.lineFeed: {
          o = gt.lf;
          break;
        }
        case h.carriageReturnLineFeed: {
          o = gt.cr + gt.lf;
          break;
        }
        case h.horizontalTab: {
          o = t ? gt.space : gt.ht;
          break;
        }
        case h.virtualSpace: {
          if (!t && i) continue;
          o = gt.space;
          break;
        }
        default:
          S(typeof a == "number", "expected number"), o = String.fromCharCode(a);
      }
    i = a === h.horizontalTab, r.push(o);
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
    let p, l, f, m, g;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(o || void 0).decode(a)), f = 0, t = "", n && (a.charCodeAt(0) === h.byteOrderMarker && f++, n = void 0); f < a.length; ) {
      if (Pi.lastIndex = f, p = Pi.exec(a), m = p && p.index !== void 0 ? p.index : a.length, g = a.charCodeAt(m), !p) {
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
            for (l = Math.ceil(e / U.tabSize) * U.tabSize, c.push(h.horizontalTab); e++ < l; ) c.push(h.virtualSpace);
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
const a1 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function o1(e) {
  return e.replace(a1, s1);
}
function s1(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === h.numberSign) {
    const i = n.charCodeAt(1), a = i === h.lowercaseX || i === h.uppercaseX;
    return Oa(
      n.slice(a ? 2 : 1),
      a ? U.numericBaseHexadecimal : U.numericBaseDecimal
    );
  }
  return Ur(n) || e;
}
const ja = {}.hasOwnProperty;
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
      autolink: a(bt),
      autolinkProtocol: Q,
      autolinkEmail: Q,
      atxHeading: a(Ye),
      blockQuote: a(Ee),
      characterEscape: Q,
      characterReference: Q,
      codeFenced: a(Ne),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: a(Ne, o),
      codeText: a(at, o),
      codeTextData: Q,
      data: Q,
      codeFlowValue: Q,
      definition: a(Xe),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: a(xt),
      hardBreakEscape: a(kt),
      hardBreakTrailing: a(kt),
      htmlFlow: a(Tt, o),
      htmlFlowData: Q,
      htmlText: a(Tt, o),
      htmlTextData: Q,
      image: a(ut),
      label: o,
      link: a(bt),
      listItem: a(Ft),
      listItemValue: m,
      listOrdered: a(Et, f),
      listUnordered: a(Et),
      paragraph: a(Ht),
      reference: C,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: a(Ye),
      strong: a(Vt),
      thematicBreak: a(Je)
    },
    exit: {
      atxHeading: c(),
      atxHeadingSequence: N,
      autolink: c(),
      autolinkEmail: ct,
      autolinkProtocol: ce,
      blockQuote: c(),
      characterEscapeValue: ne,
      characterReferenceMarkerHexadecimal: K,
      characterReferenceMarkerNumeric: K,
      characterReferenceValue: fe,
      characterReference: pe,
      codeFenced: c(R),
      codeFencedFence: x,
      codeFencedFenceInfo: g,
      codeFencedFenceMeta: k,
      codeFlowValue: ne,
      codeIndented: c(T),
      codeText: c(Z),
      codeTextData: ne,
      data: ne,
      definition: c(),
      definitionDestinationString: F,
      definitionLabelString: I,
      definitionTitleString: L,
      emphasis: c(),
      hardBreakEscape: c(H),
      hardBreakTrailing: c(H),
      htmlFlow: c(A),
      htmlFlowData: ne,
      htmlText: c(P),
      htmlTextData: ne,
      image: c(z),
      label: Te,
      labelText: we,
      lineEnding: Y,
      link: c(ae),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: le,
      resourceDestinationString: y,
      resourceTitleString: G,
      resource: ge,
      setextHeading: c(W),
      setextHeadingLineSequence: q,
      setextHeadingText: E,
      strong: c(),
      thematicBreak: c()
    }
  };
  $a(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(b) {
    let _ = { type: "root", children: [] };
    const B = {
      stack: [_],
      tokenStack: [],
      config: t,
      enter: s,
      exit: p,
      buffer: o,
      resume: l,
      data: n
    }, $ = [];
    let oe = -1;
    for (; ++oe < b.length; )
      if (b[oe][1].type === d.listOrdered || b[oe][1].type === d.listUnordered)
        if (b[oe][0] === "enter")
          $.push(oe);
        else {
          const xe = $.pop();
          S(typeof xe == "number", "expected list ot be open"), oe = i(b, xe, oe);
        }
    for (oe = -1; ++oe < b.length; ) {
      const xe = t[b[oe][0]];
      ja.call(xe, b[oe][1].type) && xe[b[oe][1].type].call(
        Object.assign(
          { sliceSerialize: b[oe][2].sliceSerialize },
          B
        ),
        b[oe][1]
      );
    }
    if (B.tokenStack.length > 0) {
      const xe = B.tokenStack[B.tokenStack.length - 1];
      (xe[1] || Fi).call(B, void 0, xe[0]);
    }
    for (_.position = {
      start: Ot(
        b.length > 0 ? b[0][1].start : { line: 1, column: 1, offset: 0 }
      ),
      end: Ot(
        b.length > 0 ? b[b.length - 2][1].end : { line: 1, column: 1, offset: 0 }
      )
    }, oe = -1; ++oe < t.transforms.length; )
      _ = t.transforms[oe](_) || _;
    return _;
  }
  function i(b, _, B) {
    let $ = _ - 1, oe = -1, xe = !1, Qe, Le, et, be;
    for (; ++$ <= B; ) {
      const ye = b[$];
      switch (ye[1].type) {
        case d.listUnordered:
        case d.listOrdered:
        case d.blockQuote: {
          ye[0] === "enter" ? oe++ : oe--, be = void 0;
          break;
        }
        case d.lineEndingBlank: {
          ye[0] === "enter" && (Qe && !be && !oe && !et && (et = $), be = void 0);
          break;
        }
        case d.linePrefix:
        case d.listItemValue:
        case d.listItemMarker:
        case d.listItemPrefix:
        case d.listItemPrefixWhitespace:
          break;
        default:
          be = void 0;
      }
      if (!oe && ye[0] === "enter" && ye[1].type === d.listItemPrefix || oe === -1 && ye[0] === "exit" && (ye[1].type === d.listUnordered || ye[1].type === d.listOrdered)) {
        if (Qe) {
          let je = $;
          for (Le = void 0; je--; ) {
            const Fe = b[je];
            if (Fe[1].type === d.lineEnding || Fe[1].type === d.lineEndingBlank) {
              if (Fe[0] === "exit") continue;
              Le && (b[Le][1].type = d.lineEndingBlank, xe = !0), Fe[1].type = d.lineEnding, Le = je;
            } else if (!(Fe[1].type === d.linePrefix || Fe[1].type === d.blockQuotePrefix || Fe[1].type === d.blockQuotePrefixWhitespace || Fe[1].type === d.blockQuoteMarker || Fe[1].type === d.listItemIndent)) break;
          }
          et && (!Le || et < Le) && (Qe._spread = !0), Qe.end = Object.assign(
            {},
            Le ? b[Le][1].start : ye[1].end
          ), b.splice(Le || $, 0, ["exit", Qe, ye[2]]), $++, B++;
        }
        if (ye[1].type === d.listItemPrefix) {
          const je = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, ye[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Qe = je, b.splice($, 0, ["enter", je, ye[2]]), $++, B++, et = void 0, be = !0;
        }
      }
    }
    return b[_][1]._spread = xe, B;
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
      b && b.call(this, B), p.call(this, B);
    }
  }
  function p(b, _) {
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
  function R() {
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
  function L() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "definition", "expected definition on stack"), _.title = b;
  }
  function F() {
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
  function q(b) {
    const _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "heading", "expected heading on stack"), _.depth = this.sliceSerialize(b).codePointAt(0) === h.equalsTo ? 1 : 2;
  }
  function W() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function Q(b) {
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
  function Y(b) {
    const _ = this.stack[this.stack.length - 1];
    if (S(_, "expected `node`"), this.data.atHardBreak) {
      S("children" in _, "expected `parent`");
      const B = _.children[_.children.length - 1];
      S(B.position, "expected tail to have a starting position"), B.position.end = Ot(b.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(_.type) && (Q.call(this, b), ne.call(this, b));
  }
  function H() {
    this.data.atHardBreak = !0;
  }
  function A() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "html", "expected html on stack"), _.value = b;
  }
  function P() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "html", "expected html on stack"), _.value = b;
  }
  function Z() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "inlineCode", "expected inline code on stack"), _.value = b;
  }
  function ae() {
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
  function we(b) {
    const _ = this.sliceSerialize(b), B = this.stack[this.stack.length - 2];
    S(B, "expected ancestor on stack"), S(
      B.type === "image" || B.type === "link",
      "expected image or link on stack"
    ), B.label = o1(_), B.identifier = Yt(_).toLowerCase();
  }
  function Te() {
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
  function G() {
    const b = this.resume(), _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(
      _.type === "image" || _.type === "link",
      "expected image or link on stack"
    ), _.title = b;
  }
  function ge() {
    this.data.inReference = void 0;
  }
  function C() {
    this.data.referenceType = "collapsed";
  }
  function le(b) {
    const _ = this.resume(), B = this.stack[this.stack.length - 1];
    S(B, "expected node on stack"), S(
      B.type === "image" || B.type === "link",
      "expected image reference or link reference on stack"
    ), B.label = _, B.identifier = Yt(
      this.sliceSerialize(b)
    ).toLowerCase(), this.data.referenceType = "full";
  }
  function K(b) {
    S(
      b.type === "characterReferenceMarkerNumeric" || b.type === "characterReferenceMarkerHexadecimal"
    ), this.data.characterReferenceType = b.type;
  }
  function fe(b) {
    const _ = this.sliceSerialize(b), B = this.data.characterReferenceType;
    let $;
    if (B)
      $ = Oa(
        _,
        B === d.characterReferenceMarkerNumeric ? U.numericBaseDecimal : U.numericBaseHexadecimal
      ), this.data.characterReferenceType = void 0;
    else {
      const xe = Ur(_);
      S(xe !== !1, "expected reference to decode"), $ = xe;
    }
    const oe = this.stack[this.stack.length - 1];
    S(oe, "expected `node`"), S("value" in oe, "expected `node.value`"), oe.value += $;
  }
  function pe(b) {
    const _ = this.stack.pop();
    S(_, "expected `node`"), S(_.position, "expected `node.position`"), _.position.end = Ot(b.end);
  }
  function ce(b) {
    ne.call(this, b);
    const _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "link", "expected link on stack"), _.url = this.sliceSerialize(b);
  }
  function ct(b) {
    ne.call(this, b);
    const _ = this.stack[this.stack.length - 1];
    S(_, "expected node on stack"), S(_.type === "link", "expected link on stack"), _.url = "mailto:" + this.sliceSerialize(b);
  }
  function Ee() {
    return { type: "blockquote", children: [] };
  }
  function Ne() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function at() {
    return { type: "inlineCode", value: "" };
  }
  function Xe() {
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
  function Ye() {
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
  function bt() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function Et(b) {
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
  function Je() {
    return { type: "thematicBreak" };
  }
}
function Ot(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function $a(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? $a(e, r) : u1(e, r);
  }
}
function u1(e, t) {
  let n;
  for (n in t)
    if (ja.call(t, n))
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
  const p = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [c]
  };
  return e.patch(t, p), e.applyData(t, p);
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
function b1(e, t) {
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
function E1(e, t, n) {
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
  const p = { type: "element", tagName: "li", properties: a, children: o };
  return e.patch(t, p), e.applyData(t, p);
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
  const p = [];
  for (; ++c < s; ) {
    const f = t.children[c], m = {}, g = o ? o[c] : void 0;
    g && (m.align = g);
    let k = { type: "element", tagName: a, properties: m, children: [] };
    f && (k.children = e.all(f), e.patch(f, k), k = e.applyData(f, k)), p.push(k);
  }
  const l = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(p, !0)
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
  link: b1,
  listItem: E1,
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
const Ka = -1, Vn = 0, pn = 1, zn = 2, Wr = 3, Vr = 4, jr = 5, $r = 6, Xa = 7, Ya = 8, Bi = typeof self == "object" ? self : globalThis, H1 = (e, t) => {
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
        for (const [c, p] of o)
          s[r(c)] = r(p);
        return s;
      }
      case Wr:
        return n(new Date(o), i);
      case Vr: {
        const { source: s, flags: c } = o;
        return n(new RegExp(s, c), i);
      }
      case jr: {
        const s = n(/* @__PURE__ */ new Map(), i);
        for (const [c, p] of o)
          s.set(r(c), r(p));
        return s;
      }
      case $r: {
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
}, Gi = (e) => H1(/* @__PURE__ */ new Map(), e)(0), qt = "", { toString: z1 } = {}, { keys: U1 } = Object, un = (e) => {
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
      return [Wr, qt];
    case "RegExp":
      return [Vr, qt];
    case "Map":
      return [jr, qt];
    case "Set":
      return [$r, qt];
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
      case Wr:
        return i([s, o.toISOString()], o);
      case Vr: {
        const { source: l, flags: f } = o;
        return i([s, { source: l, flags: f }], o);
      }
      case jr: {
        const l = [], f = i([s, l], o);
        for (const [m, g] of o)
          (e || !(Mn(un(m)) || Mn(un(g)))) && l.push([a(m), a(g)]);
        return f;
      }
      case $r: {
        const l = [], f = i([s, l], o);
        for (const m of o)
          (e || !Mn(un(m))) && l.push(a(m));
        return f;
      }
    }
    const { message: p } = o;
    return i([s, { name: c, message: p }], o);
  };
  return a;
}, Wi = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return B1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, Un = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Gi(Wi(e, t)) : structuredClone(e)
) : (e, t) => Gi(Wi(e, t));
function G1(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function W1(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function V1(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || G1, r = e.options.footnoteBackLabel || W1, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, s = [];
  let c = -1;
  for (; ++c < e.footnoteOrder.length; ) {
    const p = e.footnoteById.get(
      e.footnoteOrder[c]
    );
    if (!p)
      continue;
    const l = e.all(p), f = String(p.identifier).toUpperCase(), m = en(f.toLowerCase());
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
    const R = l[l.length - 1];
    if (R && R.type === "element" && R.tagName === "p") {
      const I = R.children[R.children.length - 1];
      I && I.type === "text" ? I.value += " " : R.children.push({ type: "text", value: " " }), R.children.push(...k);
    } else
      l.push(...k);
    const T = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + m },
      children: e.wrap(l, !0)
    };
    e.patch(p, T), s.push(T);
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
      return jn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? j1(e) : $1(e);
    if (typeof e == "string")
      return q1(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function j1(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Ja(e[n]);
  return jn(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function $1(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return jn(n);
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
  return jn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function jn(e) {
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
  function s(c, p, l) {
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
      let g = Qa, k, x, R;
      if ((!t || a(c, p, l[l.length - 1] || void 0)) && (g = Q1(n(c, l)), g[0] === Vi))
        return g;
      if ("children" in c && c.children) {
        const T = (
          /** @type {UnistParent} */
          c
        );
        if (T.children && g[0] !== Y1)
          for (x = (r ? T.children.length : -1) + o, R = l.concat(T); x > -1 && x < T.children.length; ) {
            const I = T.children[x];
            if (k = s(I, x, R)(), k[0] === Vi)
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
  function s(c, p) {
    const l = p[p.length - 1], f = l ? l.children.indexOf(c) : void 0;
    return o(c, f, l);
  }
}
const Ir = {}.hasOwnProperty, ed = {};
function td(e, t) {
  const n = t || ed, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = { ...F1, ...n.handlers }, s = {
    all: p,
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
        const { children: x, ...R } = l, T = Un(R);
        return T.children = s.all(l), T;
      }
      return Un(l);
    }
    return (s.options.unknownHandler || id)(s, l, f);
  }
  function p(l) {
    const f = [];
    if ("children" in l) {
      const m = l.children;
      let g = -1;
      for (; ++g < m.length; ) {
        const k = s.one(m[g], l);
        if (k) {
          if (g && m[g - 1].type === "break" && (!Array.isArray(k) && k.type === "text" && (k.value = ji(k.value)), !Array.isArray(k) && k.type === "element")) {
            const x = k.children[0];
            x && x.type === "text" && (x.value = ji(x.value));
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
function ji(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function $i(e, t) {
  const n = td(e, t), r = n.one(e, void 0), i = V1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && (S("children" in a), a.children.push({ type: "text", value: `
` }, i)), a;
}
function od(e, t) {
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
  var t, n, r, i, a, o, s = arguments[0], c = 1, p = arguments.length, l = !1;
  for (typeof s == "boolean" && (l = s, s = arguments[1] || {}, c = 2), (s == null || typeof s != "object" && typeof s != "function") && (s = {}); c < p; ++c)
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
    function s(c, ...p) {
      const l = e[++a];
      let f = -1;
      if (c) {
        o(c);
        return;
      }
      for (; ++f < i.length; )
        (p[f] === null || p[f] === void 0) && (p[f] = i[f]);
      i = p, l ? cd(l, s)(...p) : o(null, ...p);
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
    } catch (p) {
      const l = (
        /** @type {Error} */
        p
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
    const i = new Ue(
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
          return p(l);
        const g = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          f
        ), k = r.stringify(g, m);
        Ed(k) ? m.value = k : m.result = k, p(
          l,
          /** @type {VFileWithOutput<CompileResult>} */
          m
        );
      });
      function p(l, f) {
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
      i.run(t, c, p);
      function p(l, f, m) {
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
    function a(p) {
      if (typeof p == "function")
        c(p, []);
      else if (typeof p == "object")
        if (Array.isArray(p)) {
          const [l, ...f] = (
            /** @type {PluginTuple<Array<unknown>>} */
            p
          );
          c(l, f);
        } else
          o(p);
      else
        throw new TypeError("Expected usable value, not `" + p + "`");
    }
    function o(p) {
      if (!("plugins" in p) && !("settings" in p))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      s(p.plugins), p.settings && (i.settings = or(!0, i.settings, p.settings));
    }
    function s(p) {
      let l = -1;
      if (p != null) if (Array.isArray(p))
        for (; ++l < p.length; ) {
          const f = p[l];
          a(f);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + p + "`");
    }
    function c(p, l) {
      let f = -1, m = -1;
      for (; ++f < r.length; )
        if (r[f][0] === p) {
          m = f;
          break;
        }
      if (m === -1)
        r.push([p, ...l]);
      else if (l.length > 0) {
        let [g, ...k] = l;
        const x = r[m][1];
        Rr(x) && Rr(g) && (g = or(!0, x, g)), r[m] = [p, g, ...k];
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
  return bd(e) ? e : new no(e);
}
function bd(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Ed(e) {
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
  ), eo(e, p), Ul(e, {
    Fragment: wt,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: u,
    jsxs: v,
    passKeys: !0,
    passNode: !0
  });
  function p(l, f, m) {
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
  const [n, r] = ue(!0), [i, a] = ue(!1);
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
  var c, p;
  const a = () => {
    if (!r || !i) return null;
    const l = i.find((f) => f.name === r);
    return (l == null ? void 0 : l.description) || null;
  };
  let o;
  if (r != null && r.startsWith("lat_")) {
    const l = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.query, f = (p = n == null ? void 0 : n.parameters) == null ? void 0 : p.url;
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
  const [t, n] = ue(!0);
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
  const i = ie((o) => {
    o.key === "Escape" && n();
  }, [n]), a = ie((o) => {
    o.target === o.currentTarget && n();
  }, [n]);
  return ve(() => (t ? (document.addEventListener("keydown", i), document.body.style.overflow = "hidden") : (document.removeEventListener("keydown", i), document.body.style.overflow = ""), () => {
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
      onRetryMessage: p
    } = yn(), [l, f] = ue(!1), [m, g] = ue(!1), [k, x] = ue(null), R = ie(async () => {
      try {
        await navigator.clipboard.writeText(e.content), f(!0), setTimeout(() => f(!1), 2e3);
      } catch (H) {
        console.error("Failed to copy message:", H);
      }
    }, [e.content]), T = ie(() => {
      p && p(e.id);
    }, [p, e.id]), I = ie((H) => {
      x(H);
    }, []), L = ie(() => {
      x(null);
    }, []), F = () => /* @__PURE__ */ v("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ u(ao, { size: 16, variant: "dots" }),
      /* @__PURE__ */ u("span", { children: te.UI_TEXT.THINKING })
    ] }), N = () => p && /* @__PURE__ */ u(
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
          onClick: R,
          title: "Copy message",
          children: /* @__PURE__ */ u(Bs, {})
        }
      ) }),
      l && /* @__PURE__ */ u("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), q = () => /* @__PURE__ */ u("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ v("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ u(aa, { components: lo, children: e.content }) }),
      E()
    ] }) }), W = () => /* @__PURE__ */ v("div", { className: "chat-wrapper__regular-message", children: [
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
          onMouseEnter: (P) => {
            P.currentTarget.style.transform = "scale(1.02)", P.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
          },
          onMouseLeave: (P) => {
            P.currentTarget.style.transform = "scale(1)", P.currentTarget.style.boxShadow = "";
          },
          title: "Click to view full size"
        },
        A
      )) })
    ] }), Q = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === c.current ? F() : e.role === "system" ? /* @__PURE__ */ u(Fd, { message: e }) : e.role === "assistant" ? q() : W(), ne = () => /* @__PURE__ */ v(Od, { isStreaming: e.isStreaming || !1, children: [
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
          children: e.role === "reasoning" ? ne() : e.role === "tooling" ? Y() : /* @__PURE__ */ v(wt, { children: [
            /* @__PURE__ */ u("div", { className: "chat-wrapper__message-content", children: Q() }),
            e.role === "user" && e.hasError && !e.isRetrying && N()
          ] })
        }
      ),
      /* @__PURE__ */ u(
        oo,
        {
          imageUrl: k,
          isOpen: !!k,
          onClose: L,
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
), Gd = () => /* @__PURE__ */ v(
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
), Wd = ({ className: e, ...t }) => /* @__PURE__ */ u("form", { className: ht("chat-wrapper__prompt-input", e), ...t }), ho = Bn(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...o
  }, s) => {
    const c = (p) => {
      if (p.key === "Enter") {
        if (p.shiftKey)
          return;
        p.preventDefault();
        const l = p.currentTarget.form;
        if (l) {
          const f = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          l.dispatchEvent(f);
        }
      }
      a == null || a(p);
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
}) => /* @__PURE__ */ u("div", { className: ht("chat-wrapper__prompt-toolbar", e), ...t }), jd = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u("div", { className: ht("chat-wrapper__prompt-tools", e), ...t }), $d = ({
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
  status: r = rt.IDLE,
  children: i,
  disabled: a,
  ...o
}) => {
  const s = pr(r);
  let c = s ? /* @__PURE__ */ u(Gd, {}) : /* @__PURE__ */ u(Bd, {});
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
  const [r, i] = ue(0), [a, o] = ue(!1), [s, c] = ue(0);
  return ve(() => {
    if (!t || e.length <= 1) return;
    const p = setInterval(() => {
      o(!0), setTimeout(() => {
        i((l) => (l + 1) % e.length), c((l) => l + 1), o(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(p);
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
}, Kd = Bn((e, t) => {
  const {
    placeholderTexts: n,
    isStreaming: r,
    isLoadingConversation: i,
    chatStatus: a,
    fileUploadEnabled: o,
    chipName: s,
    chipLogo: c,
    messages: p,
    onSubmit: l,
    onFileUpload: f,
    onStopGeneration: m,
    connectionState: g
  } = yn(), k = r || i || g !== nt.CONNECTED, x = g === nt.CONNECTED, R = p.length > 0, [T, I] = ue(""), [L, F] = ue([]), [N, E] = ue(!1), [q, W] = ue(null), [Q, ne] = ue(null), [Y, H] = ue(!1), A = De(null), P = ie(
    (G) => {
      ne(G), H(!0);
    },
    []
  ), Z = n && n.length > 0 ? n : ["What would you like to know?"], ae = T.length === 0 && !R && Z.length > 1;
  sa(t, () => ({
    focus: () => {
      var G;
      (G = A.current) == null || G.focus();
    },
    setText: (G) => {
      I(G), setTimeout(() => {
        if (A.current) {
          A.current.focus();
          const ge = G.length;
          A.current.setSelectionRange(ge, ge);
        }
      }, 0);
    }
  }));
  const z = ie(
    (G) => {
      G.preventDefault();
      const C = new FormData(G.currentTarget).get("message");
      if (C != null && C.trim()) {
        const le = Fn(C.trim(), !1);
        if (!le.trim()) {
          console.warn("Message was blocked due to security concerns");
          return;
        }
        l(le, L), I(""), F([]);
      }
    },
    [l, L]
  ), we = ie(
    (G) => {
      const C = G.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      I(C);
    },
    []
  ), Te = ie(
    async (G) => {
      var le;
      const C = Array.from(((le = G.clipboardData) == null ? void 0 : le.items) || []).filter((K) => K.type.startsWith("image/"));
      if (C.length > 0) {
        G.preventDefault();
        try {
          E(!0), W(null);
          const K = await Promise.all(
            C.map((fe) => {
              const pe = fe.getAsFile();
              return pe ? new File(
                [pe],
                `clipboard-image-${Date.now()}.${pe.type.split("/")[1]}`,
                {
                  type: pe.type
                }
              ) : null;
            })
          ).then((fe) => fe.filter(Boolean));
          if (K.length > 0) {
            const fe = K.filter((pe) => pe.size > 10485760 ? (console.warn(
              `File too large: ${pe.name} (${pe.size} bytes)`
            ), W("Image too large. Maximum size is 10MB."), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ].includes(pe.type) ? !0 : (console.warn(
              `File type not allowed: ${pe.name} (${pe.type})`
            ), W(
              "Image type not supported. Please use JPEG, PNG, GIF, or WebP."
            ), !1));
            if (fe.length > 0) {
              const pe = await f(fe);
              F(pe), W(null);
            }
          }
        } catch (K) {
          console.error("Clipboard paste error:", K), W(
            K instanceof Error ? K.message : "Failed to paste image"
          );
        } finally {
          E(!1);
        }
      }
    },
    [f]
  ), y = ie(async () => {
    const G = document.createElement("input");
    G.type = "file", G.accept = "image/*", G.multiple = !1, G.onchange = async (ge) => {
      const C = ge.target.files;
      if (C)
        try {
          E(!0), W(null);
          const le = Array.from(C).filter((K) => {
            const fe = Ss(K.name);
            return fe !== K.name && console.warn(
              `File name sanitized: ${K.name} -> ${fe}`
            ), K.size > 10 * 1024 * 1024 ? (console.warn(`File too large: ${K.name} (${K.size} bytes)`), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ].includes(K.type) ? !0 : (console.warn(
              `File type not allowed: ${K.name} (${K.type})`
            ), !1);
          });
          if (le.length > 0) {
            const K = await f(le);
            F(K), W(null);
          }
        } catch (le) {
          console.error("File upload error:", le), W(
            le instanceof Error ? le.message : "Upload failed"
          );
        } finally {
          E(!1);
        }
    }, G.click();
  }, [f]);
  return /* @__PURE__ */ v(
    Wd,
    {
      onSubmit: z,
      style: { position: "relative" },
      className: k ? "chat-wrapper__prompt-input--disabled" : "",
      children: [
        /* @__PURE__ */ u(
          ho,
          {
            ref: A,
            name: "message",
            value: T,
            onChange: we,
            onPaste: Te,
            placeholder: "",
            disabled: k
          }
        ),
        !T.trim() && x && /* @__PURE__ */ u(
          Zd,
          {
            placeholderTexts: Z,
            shouldAnimate: ae
          }
        ),
        N && /* @__PURE__ */ v(
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
        q && /* @__PURE__ */ v(
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
                q
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
        L.length > 0 && /* @__PURE__ */ u(
          "div",
          {
            style: {
              padding: "8px 16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center"
            },
            children: L.map((G, ge) => {
              const C = G.startsWith("data:image/"), le = G.startsWith("http://") || G.startsWith("https://"), K = C || le;
              return /* @__PURE__ */ v(
                "div",
                {
                  style: {
                    position: "relative",
                    display: "inline-block"
                  },
                  children: [
                    K ? /* @__PURE__ */ v(
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
                        onClick: () => P(G),
                        title: "Click to view full image",
                        children: [
                          /* @__PURE__ */ u(
                            "img",
                            {
                              src: G,
                              alt: `Attachment ${ge + 1}`,
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
                                  const fe = G.match(/name=([^;]+)/);
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
                                  const fe = G.match(/data:([^;]+)/);
                                  if (fe) {
                                    const pe = fe[1];
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
                                        const ce = pe.split("/")[1];
                                        return ce ? ce.toUpperCase().substring(0, 4) : "FILE";
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
                          F(
                            (fe) => fe.filter((pe, ce) => ce !== ge)
                          ), q && W(null);
                        },
                        style: {
                          position: "absolute",
                          top: K ? "6px" : "8px",
                          right: K ? "6px" : "8px",
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
                ge
              );
            })
          }
        ),
        /* @__PURE__ */ v(Vd, { children: [
          /* @__PURE__ */ v(jd, { children: [
            o && /* @__PURE__ */ v(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center"
                },
                children: [
                  /* @__PURE__ */ u(
                    $d,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: y,
                      title: N ? "Uploading..." : L.length > 0 ? `${L.length} image(s) attached` : "Attach image",
                      disabled: k || N,
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
                      onClick: N ? void 0 : y,
                      style: {
                        fontSize: "12px",
                        color: N ? "#94a3b8" : "#919EAB",
                        marginLeft: "4px",
                        cursor: N ? "not-allowed" : "pointer"
                      },
                      children: N ? "Uploading..." : "Attach"
                    }
                  )
                ]
              }
            ),
            o && s && /* @__PURE__ */ u("div", { className: "chat-wrapper__divider" }),
            s && /* @__PURE__ */ v("div", { className: "chat-wrapper__restaurant-chip", children: [
              c && /* @__PURE__ */ u(
                "img",
                {
                  src: c,
                  alt: "Chip logo",
                  className: "chat-wrapper__restaurant-logo"
                }
              ),
              /* @__PURE__ */ u("span", { className: "chat-wrapper__restaurant-name", children: s })
            ] })
          ] }),
          /* @__PURE__ */ u(
            qd,
            {
              status: a,
              disabled: pr(a) ? !1 : !T.trim() || k,
              onClick: pr(a) && m ? () => {
                m();
              } : void 0
            }
          )
        ] }),
        /* @__PURE__ */ u(
          oo,
          {
            imageUrl: Q,
            isOpen: Y,
            onClose: () => {
              H(!1), ne(null);
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
  } = yn(), p = Ct.state.shouldShowMainHeader(
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
    p && /* @__PURE__ */ u("div", { style: c ? { paddingTop: "32px" } : void 0, children: /* @__PURE__ */ u(
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
    const { token: p, entityId: l, entityType: f } = e;
    Ct.validation.validateAuthProps({
      userMpAuthToken: p,
      chatServerUrl: t,
      chatServerKey: n
    });
    const m = Ae(() => Ct.url.convertWebSocketToHttp(t), [t]), g = Ae(
      () => new As({
        apiUrl: m,
        userMpAuthToken: p,
        chatServerKey: n
      }),
      [m, p, n]
    ), k = Ae(() => a && a.length > 0 ? a.map(({ execute: M, ...de }) => de) : [], [a]), x = vs(), { isOnline: R, wasOffline: T } = Ms(), I = De(!0), L = ee((M) => M.isModalOpen), F = ee((M) => M.isCollapsed), N = ee((M) => M.currentMode), E = ee((M) => M.openModal), q = ee((M) => M.closeModal), W = ee((M) => M.toggleCollapse), Q = ee((M) => M.toggleFullscreen), ne = ee((M) => M.setCurrentMode), Y = ee((M) => M.chatStatus), H = ee((M) => M.setChatStatus), A = ee((M) => M.streamingStatus), P = ee((M) => M.setStreamingStatus), Z = ee(
      (M) => M.isLoadingConversation
    ), ae = ee(
      (M) => M.setIsLoadingConversation
    ), z = ee((M) => M.conversationError), we = ee(
      (M) => M.setConversationError
    ), Te = ee((M) => M.setCurrentThreadId), y = ee((M) => M.providerResId), G = ee((M) => M.setProviderResId), ge = ee((M) => M.isDevSettingsOpen), C = ee(
      (M) => M.setIsDevSettingsOpen
    ), le = ee((M) => M.isStreaming), K = ee((M) => M.setIsStreaming), fe = ee((M) => M.isThinking), pe = ee((M) => M.setIsThinking), ce = ee((M) => M.streamingContent), ct = ee((M) => M.isHandlingTool);
    ve(() => {
      i.mode && ne(i.mode);
    }, [i.mode, ne]), ve(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const M = (de) => {
        de.key === "Escape" && N === "modal" && L && q();
      };
      if (N === "modal" && L)
        return document.addEventListener("keydown", M), () => document.removeEventListener("keydown", M);
    }, [N, L, q]);
    const {
      messages: Ee,
      setMessages: Ne,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: at,
      getReasoningStatus: Xe,
      getReasoningDuration: xt,
      getReasoningContentOnly: Ye,
      getReasoningTitle: kt,
      getToolingTitle: Tt,
      getToolingStatus: ut,
      handleSetMessage: bt,
      handleReasoningUpdate: Et,
      handleChatFinished: Ft,
      handleChatError: Ht,
      stopGeneration: Vt
    } = x, _t = De(null), Je = De(null), b = De(null), _ = ie(
      (M) => {
        G(M.providerResId), Te(M.threadId), M.canUpdateMetadata && r && Object.keys(r).length > 0 && b.current && b.current.updateMetadata(M.providerResId, { metadata: r }).then(() => {
          console.log("[ChatWrapper] ✅ Metadata update successful");
        }).catch((de) => {
          console.error(
            "[ChatWrapper] ❌ Failed to update metadata:",
            de
          );
        });
      },
      [G, Te, r]
    ), B = ie(
      (M) => {
        var de, ke;
        switch (console.log("[ChatWrapper] System event received:", M), M.type) {
          case ot.CHAT_COMPLETED:
            (de = M.data) != null && de.conversationId && G(M.data.conversationId), Ft(), H(rt.IDLE), P(Zt.IDLE), setTimeout(() => {
              var Ie;
              (Ie = Je.current) == null || Ie.focus();
            }, 0);
            break;
          case ot.CHAT_ERROR:
            (ke = M.data) != null && ke.error && Ht(M.data.error);
            break;
          case ot.CONNECTION_LOST:
            break;
          case ot.CONNECTION_RESTORED:
            break;
          case ot.RECONNECTING:
            break;
        }
      },
      [
        Ft,
        Ht,
        G,
        Te
      ]
    ), {
      chatClient: $,
      connectionState: oe,
      // reconnectAttempts: reconnectAttempt,
      connectChatClient: xe
    } = Xo({
      // Authentication and server properties
      userMpAuthToken: p,
      chatServerUrl: t,
      chatServerKey: n,
      // Entity configuration
      entityId: l,
      entityType: f,
      // Tools configuration
      tools: a,
      // Other properties
      contextHelpers: s,
      onSetMessage: bt,
      onSystemEvent: B,
      onReasoningUpdate: Et,
      onThreadCreated: _
    });
    ve(() => {
      b.current = $;
    }, [$]), Rs({
      metadata: r,
      chatClient: $,
      currentProviderResId: y,
      isLoadingConversation: Z,
      messages: Ee,
      entityId: l,
      entityType: f
    }), ve(() => {
      T && R && I.current ? (console.log(
        "[ChatWrapper] Network restored, attempting reconnection..."
      ), xe().catch((M) => {
        const de = Jt(
          M,
          "NetworkReconnection"
        );
        I.current = de.isRetryable, de.isRetryable || console.warn(
          `[ChatWrapper] Network reconnection failed with non-retryable error: ${de.reason}`
        );
      })) : T && R && !I.current && console.warn(
        "[ChatWrapper] Network restored but last error was non-retryable (CORS/auth), skipping reconnection"
      );
    }, [R, T, xe]);
    const Qe = ie(() => {
      console.log("[ChatWrapper] Stopping generation..."), Vt(), H(rt.IDLE), P(Zt.IDLE), $ && y && $.stopRun(y);
    }, [Vt, H, P, $, y]);
    sa(
      c,
      () => ({
        updateMetadata: (M) => {
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
          $.updateMetadata(y, M).catch((de) => {
            console.error(
              "ChatWrapper: Failed to update thread metadata:",
              de
            );
          });
        }
      }),
      [$, y]
    );
    const Le = Ae(
      () => $ ? new Ns($, {
        onError: i.onError
      }) : null,
      [$, i.onError]
    ), {
      resetConversationLoader: et
      /*, reloadConversation*/
    } = Is({
      entityId: l,
      entityType: f,
      httpApiUrl: m,
      userMpAuthToken: p,
      chatServerKey: n,
      messages: Ee,
      setMessages: Ne,
      setIsLoadingConversation: ae,
      setConversationError: we,
      setCurrentThreadId: Te,
      setProviderResId: G,
      metadata: r
    }), be = De(null), ye = ie(() => {
      be.current && cancelAnimationFrame(be.current), be.current = requestAnimationFrame(() => {
        var M;
        (M = _t.current) == null || M.scrollIntoView({ behavior: "smooth" }), be.current = null;
      });
    }, []);
    ve(() => {
      ye();
    }, [Ee, ye]), ve(() => {
      ce && ye();
    }, [ce, ye]), ve(() => {
      i.onStreamingStatusChange && i.onStreamingStatusChange(A);
    }, [A, i]), ve(() => () => {
      be.current && cancelAnimationFrame(be.current);
    }, []);
    const je = ie(
      async (M, de) => {
        if (!M.trim() || le || !Le || !$)
          return;
        K(!0), pe(!0), H(rt.SUBMITTED), P(Zt.STARTING);
        const ke = Le.createUserMessage(
          M,
          de
        );
        Ne((Ie) => [...Ie, ke]);
        try {
          await $.onTriggerMessage({
            message: ke.content,
            media: de,
            providerResId: y || void 0
          }), H(rt.STREAMING);
        } catch (Ie) {
          pe(!1), H(rt.ERROR), Ne(
            (Lt) => Lt.map(
              (Ut) => Ut.id === ke.id ? {
                ...Ut,
                hasError: !0,
                errorMessage: oe !== nt.CONNECTED ? "Failed to send message." : Ie instanceof Error ? Ie.message : "Failed to send message"
              } : Ut
            )
          ), K(!1), H(rt.IDLE), P(Zt.IDLE);
        }
      },
      [
        Le,
        $,
        le,
        oe,
        Ne,
        K,
        pe,
        H,
        P,
        y
      ]
    ), Fe = ie(
      async (M) => await g.uploadFiles(M),
      [g]
    ), $n = Ae(
      () => Ct.css.getContainerClasses(
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
    ), jt = ie(() => {
      N === "modal" ? E() : W();
    }, [N, E, W]), zt = ie(() => {
      C(!0);
    }, [C]), wn = ie(
      (M) => {
        Je.current && Je.current.setText(M.description);
      },
      []
    ), Nt = Ae(
      () => ({
        messages: Ee,
        isStreaming: le,
        isThinking: fe,
        isHandlingTool: ct
      }),
      [Ee, le, fe, ct]
    ), Sn = Ae(
      () => ({
        isLoadingConversation: Z,
        chatStatus: Y,
        conversationError: z,
        isOffline: !R,
        connectionState: oe
      }),
      [
        Z,
        Y,
        z,
        R,
        oe
      ]
    ), xn = Ae(
      () => {
        var M;
        return {
          headerName: i.headerName,
          headerDescription: i.headerDescription,
          placeholderTexts: i.placeholderTexts,
          chipName: i.chipName,
          chipLogo: i.chipLogo,
          suggestedPrompts: i.suggestedPrompts,
          clientTools: k,
          fileUploadEnabled: (M = i.features) == null ? void 0 : M.fileUpload
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
        k
      ]
    ), _e = Ae(
      () => ({
        getReasoningTitle: kt,
        getReasoningStatus: Xe,
        getReasoningDuration: xt,
        getReasoningContentOnly: Ye,
        getToolingTitle: Tt,
        getToolingStatus: ut
      }),
      [
        kt,
        Xe,
        xt,
        Ye,
        Tt,
        ut
      ]
    ), vt = ie(
      async (M) => {
        const de = Ee.find((ke) => ke.id === M);
        if (de) {
          Ne((ke) => ke.map(
            (Ie) => Ie.id === M ? {
              ...Ie,
              hasError: !1,
              isRetrying: !0,
              errorMessage: void 0
            } : Ie
          ));
          try {
            et(), await xe(), await ($ == null ? void 0 : $.onTriggerMessage({
              message: de.content,
              media: de.media,
              providerResId: y || void 0
            })), Ne(
              (ke) => ke.map(
                (Ie) => Ie.id === M ? { ...Ie, isRetrying: !1 } : Ie
              )
            );
          } catch (ke) {
            Ne(
              (Ie) => Ie.map(
                (Lt) => Lt.id === M ? {
                  ...Lt,
                  isRetrying: !1,
                  hasError: !0,
                  errorMessage: ke instanceof Error ? ke.message : "Retry failed"
                } : Lt
              )
            );
          }
        }
      },
      [
        Ee,
        Ne,
        et,
        xe,
        je
      ]
    ), kn = Ae(
      () => ({
        onSubmit: je,
        onFileUpload: Fe,
        onStopGeneration: Qe,
        onPromptSelect: wn,
        onRetryMessage: vt
      }),
      [
        je,
        Fe,
        Qe,
        wn,
        vt
      ]
    ), Tn = Ae(
      () => ({
        ...Nt,
        ...Sn,
        ...xn,
        ..._e,
        ...kn,
        currentAssistantMessageIdRef: at,
        messagesEndRef: _t,
        chatInputRef: Je
      }),
      [
        Nt,
        Sn,
        xn,
        _e,
        kn,
        at,
        _t,
        Je
      ]
    );
    return Ae(
      () => Ct.state.shouldShowBubble(
        N,
        L,
        F
      ),
      [N, L, F]
    ) ? /* @__PURE__ */ u(pi, { children: /* @__PURE__ */ u(
      Gs,
      {
        mode: N,
        headerName: i.headerName,
        bubbleText: i.bubbleText,
        showBubbleText: ((nn = i.features) == null ? void 0 : nn.showBubbleText) !== !1,
        onClick: jt
      }
    ) }) : /* @__PURE__ */ u(pi, { children: /* @__PURE__ */ u(
      Ds,
      {
        onError: (M) => {
          console.error("WebSocket error in ChatWrapper:", M), i.onError && i.onError(M);
        },
        children: /* @__PURE__ */ v("div", { className: $n, style: i.customStyles, children: [
          /* @__PURE__ */ u(
            eh,
            {
              isVisible: !R,
              isReconnecting: oe === nt.RECONNECTING
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
            Ws,
            {
              headerName: i.headerName,
              mode: N,
              isCollapsed: F,
              isModalOpen: L,
              devMode: o,
              onClose: q,
              onToggleFullscreen: Q,
              onToggleCollapse: W,
              onOpenSettings: zt
            }
          ),
          !F && /* @__PURE__ */ u(
            Ps,
            {
              onError: (M) => {
                console.error("File upload error:", M), i.onError && i.onError(M);
              },
              children: /* @__PURE__ */ u(Hd, { value: Tn, children: /* @__PURE__ */ u(Qd, {}) })
            }
          ),
          /* @__PURE__ */ u(
            zo,
            {
              isOpen: ge,
              onClose: () => C(!1),
              apiUrl: m,
              userMpAuthToken: p,
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
  const [s, c] = ue("hidden"), [p, l] = ue(!1);
  if (ve(() => {
    console.log("[ConnectionNotification] State update:", {
      isConnected: e,
      isConnecting: t,
      isReconnecting: n,
      reconnectAttempt: r,
      wasDisconnected: p,
      currentState: s
    }), t ? c("connecting") : !e && !n ? (l(!0), i !== 1 / 0 && r >= i ? c("error") : c("hidden")) : n ? (console.log("[ConnectionNotification] Setting state to RECONNECTING"), c("reconnecting")) : e && p ? (c("hidden"), l(!1)) : e && !p && c("hidden");
  }, [e, t, n, r, i, p, o]), s === "hidden")
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
  rt as CHAT_STATUS,
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
  ze as PROCESSING_STATUS,
  Wd as PromptInput,
  $d as PromptInputButton,
  gh as PromptInputModelSelect,
  Ch as PromptInputModelSelectContent,
  yh as PromptInputModelSelectItem,
  mh as PromptInputModelSelectTrigger,
  wh as PromptInputModelSelectValue,
  qd as PromptInputSubmit,
  ho as PromptInputTextarea,
  Vd as PromptInputToolbar,
  jd as PromptInputTools,
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
