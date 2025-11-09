var Ja = Object.defineProperty;
var Qa = (e, t, n) => t in e ? Ja(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var G = (e, t, n) => Qa(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as h, jsxs as k, Fragment as Gt } from "react/jsx-runtime";
import ht, { useState as ae, useEffect as Ie, useCallback as ne, useRef as Xe, useMemo as me, Component as dr, createContext as es, useContext as ts, memo as ji, forwardRef as bn, useImperativeHandle as $i } from "react";
async function ns(e, t) {
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
async function rs(e, t, n) {
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
    const s = await i.json().catch(() => ({}));
    throw new Error(
      s.message || `Failed to update agent configuration: ${i.statusText}`
    );
  }
  return (await i.json()).configuration;
}
async function Lh(e, t, n) {
  const r = new URLSearchParams();
  n != null && n.includeArchived && r.append("includeArchived", "true"), n != null && n.limit && r.append("limit", n.limit.toString());
  const i = `${e}/api/v1/threads/user/${t}${r.toString() ? `?${r.toString()}` : ""}`, a = await fetch(i);
  if (!a.ok) {
    const o = await a.json().catch(() => ({
      error: "Failed to fetch threads"
    }));
    throw new Error(o.error || "Failed to fetch threads");
  }
  return (await a.json()).threads;
}
async function Oh(e, t) {
  const n = `${e}/api/v1/threads/conv/${t}`, r = await fetch(n);
  if (!r.ok) {
    const i = await r.json().catch(() => ({
      error: "Thread not found"
    }));
    throw new Error(i.error || "Thread not found");
  }
  return r.json();
}
async function Dh(e, t, n) {
  const r = `${e}/api/v1/messages/thread/${t}?format=client`, i = {};
  n != null && n.userMpAuthToken && (i["x-oddle-mp-auth-token"] = n.userMpAuthToken), n != null && n.chatServerKey && (i["x-oddle-chat-server-key"] = n.chatServerKey);
  const a = await fetch(r, { headers: i });
  if (!a.ok) {
    const l = await a.json().catch(() => ({
      error: "Failed to fetch messages"
    }));
    throw new Error(l.error || "Failed to fetch messages");
  }
  const s = await a.json();
  return {
    messages: s.messages.map((l) => ({
      ...l,
      timestamp: new Date(l.timestamp)
    })),
    providerResId: s.providerResId
  };
}
async function is(e, t, n) {
  const r = new URLSearchParams();
  r.append("userId", t.userId), r.append("format", "client"), t.entityId && r.append("entityId", t.entityId), t.entityType && r.append("entityType", t.entityType), t.metadata && Object.keys(t.metadata).length > 0 && r.append("metadata", JSON.stringify(t.metadata));
  const i = `${e}/api/v1/messages/query?${r.toString()}`, a = {};
  n != null && n.userMpAuthToken && (a["x-oddle-mp-auth-token"] = n.userMpAuthToken), n != null && n.chatServerKey && (a["x-oddle-chat-server-key"] = n.chatServerKey);
  const s = await fetch(i, { headers: a });
  if (!s.ok) {
    const c = await s.json().catch(() => ({
      error: "Failed to fetch messages"
    }));
    throw new Error(c.error || "Failed to fetch messages");
  }
  const o = await s.json();
  return {
    messages: o.messages.map((c) => ({
      ...c,
      timestamp: new Date(c.timestamp)
    })),
    providerResId: o.providerResId,
    threadId: o.threadId
    // Server may return the matched threadId
  };
}
async function Zi(e, t, n, r) {
  const i = `${e}/api/v1/threads/${t}`, a = {
    "Content-Type": "application/json"
  };
  r != null && r.userMpAuthToken && (a["x-oddle-mp-auth-token"] = r.userMpAuthToken), r != null && r.chatServerKey && (a["x-oddle-chat-server-key"] = r.chatServerKey);
  const s = await fetch(i, {
    method: "PATCH",
    headers: a,
    body: JSON.stringify(n)
  });
  if (!s.ok) {
    const l = await s.json().catch(() => ({
      error: "Failed to update thread"
    }));
    throw new Error(l.error || "Failed to update thread");
  }
  const o = await s.json();
  if (!o.success)
    throw new Error(o.error || "Failed to update thread");
  return o.data;
}
async function Ki(e, t, n, r) {
  const i = `${e}/api/v1/threads/${t}`, a = {
    "Content-Type": "application/json"
  };
  r != null && r.userMpAuthToken && (a["x-oddle-mp-auth-token"] = r.userMpAuthToken), r != null && r.chatServerKey && (a["x-oddle-chat-server-key"] = r.chatServerKey);
  const s = await fetch(i, {
    method: "PATCH",
    headers: a,
    body: JSON.stringify(n)
  });
  if (!s.ok) {
    const l = await s.json().catch(() => ({
      error: "Failed to update thread metadata"
    }));
    throw new Error(l.error || "Failed to update thread metadata");
  }
  const o = await s.json();
  if (!o.success)
    throw new Error(o.error || "Failed to update thread metadata");
  return o.data;
}
const zr = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), r = (c, u) => {
    const p = typeof c == "function" ? c(t) : c;
    if (!Object.is(p, t)) {
      const f = t;
      t = u ?? (typeof p != "object" || p === null) ? p : Object.assign({}, t, p), n.forEach((d) => d(t, f));
    }
  }, i = () => t, o = { setState: r, getState: i, getInitialState: () => l, subscribe: (c) => (n.add(c), () => n.delete(c)) }, l = t = e(r, i, o);
  return o;
}, as = (e) => e ? zr(e) : zr, ss = (e) => e;
function os(e, t = ss) {
  const n = ht.useSyncExternalStore(
    e.subscribe,
    ht.useCallback(() => t(e.getState()), [e, t]),
    ht.useCallback(() => t(e.getInitialState()), [e, t])
  );
  return ht.useDebugValue(n), n;
}
const ls = (e) => {
  const t = as(e), n = (r) => os(t, r);
  return Object.assign(n, t), n;
}, cs = (e) => ls, Br = { BASE_URL: "/", DEV: !1, MODE: "production", PROD: !0, SSR: !1 }, tn = /* @__PURE__ */ new Map(), un = (e) => {
  const t = tn.get(e);
  return t ? Object.fromEntries(
    Object.entries(t.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, us = (e, t, n) => {
  if (e === void 0)
    return {
      type: "untracked",
      connection: t.connect(n)
    };
  const r = tn.get(n.name);
  if (r)
    return { type: "tracked", store: e, ...r };
  const i = {
    connection: t.connect(n),
    stores: {}
  };
  return tn.set(n.name, i), { type: "tracked", store: e, ...i };
}, hs = (e, t) => {
  if (t === void 0) return;
  const n = tn.get(e);
  n && (delete n.stores[t], Object.keys(n.stores).length === 0 && tn.delete(e));
}, ds = (e) => {
  var t, n;
  if (!e) return;
  const r = e.split(`
`), i = r.findIndex(
    (s) => s.includes("api.setState")
  );
  if (i < 0) return;
  const a = ((t = r[i + 1]) == null ? void 0 : t.trim()) || "";
  return (n = /.+ (.+) .+/.exec(a)) == null ? void 0 : n[1];
}, ps = (e, t = {}) => (n, r, i) => {
  const { enabled: a, anonymousActionType: s, store: o, ...l } = t;
  let c;
  try {
    c = (a ?? (Br ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!c)
    return e(n, r, i);
  const { connection: u, ...p } = us(o, c, l);
  let f = !0;
  i.setState = (y, A, S) => {
    const _ = n(y, A);
    if (!f) return _;
    const L = S === void 0 ? {
      type: s || ds(new Error().stack) || "anonymous"
    } : typeof S == "string" ? { type: S } : S;
    return o === void 0 ? (u == null || u.send(L, r()), _) : (u == null || u.send(
      {
        ...L,
        type: `${o}/${L.type}`
      },
      {
        ...un(l.name),
        [o]: i.getState()
      }
    ), _);
  }, i.devtools = {
    cleanup: () => {
      u && typeof u.unsubscribe == "function" && u.unsubscribe(), hs(l.name, o);
    }
  };
  const d = (...y) => {
    const A = f;
    f = !1, n(...y), f = A;
  }, w = e(i.setState, r, i);
  if (p.type === "untracked" ? u == null || u.init(w) : (p.stores[p.store] = i, u == null || u.init(
    Object.fromEntries(
      Object.entries(p.stores).map(([y, A]) => [
        y,
        y === p.store ? w : A.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let y = !1;
    const A = i.dispatch;
    i.dispatch = (...S) => {
      (Br ? "production" : void 0) !== "production" && S[0].type === "__setState" && !y && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), y = !0), A(...S);
    };
  }
  return u.subscribe((y) => {
    var A;
    switch (y.type) {
      case "ACTION":
        if (typeof y.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return Ln(
          y.payload,
          (S) => {
            if (S.type === "__setState") {
              if (o === void 0) {
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
              const _ = S.state[o];
              if (_ == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(_) && d(_);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(S);
          }
        );
      case "DISPATCH":
        switch (y.payload.type) {
          case "RESET":
            return d(w), o === void 0 ? u == null ? void 0 : u.init(i.getState()) : u == null ? void 0 : u.init(un(l.name));
          case "COMMIT":
            if (o === void 0) {
              u == null || u.init(i.getState());
              return;
            }
            return u == null ? void 0 : u.init(un(l.name));
          case "ROLLBACK":
            return Ln(y.state, (S) => {
              if (o === void 0) {
                d(S), u == null || u.init(i.getState());
                return;
              }
              d(S[o]), u == null || u.init(un(l.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return Ln(y.state, (S) => {
              if (o === void 0) {
                d(S);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(S[o]) && d(S[o]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: S } = y.payload, _ = (A = S.computedStates.slice(-1)[0]) == null ? void 0 : A.state;
            if (!_) return;
            d(o === void 0 ? _ : _[o]), u == null || u.send(
              null,
              // FIXME no-any
              S
            );
            return;
          }
          case "PAUSE_RECORDING":
            return f = !f;
        }
        return;
    }
  }), w;
}, fs = ps, Ln = (e, t) => {
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
}, gs = (e) => ({
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
}), Ye = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, Sn = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, Re = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, Ph = (e) => e === Ye.SUBMITTED || e === Ye.STREAMING, Hh = (e) => e === Ye.IDLE, Fh = (e) => e === Ye.ERROR, Uh = (e) => e === Re.PROCESSING, zh = (e) => e === Re.COMPLETED, Bh = (e) => e === Re.ERROR, ms = (e) => ({
  // Initial state
  chatStatus: Ye.IDLE,
  streamingStatus: Sn.IDLE,
  // Actions
  setChatStatus: (t) => e({ chatStatus: t }),
  setStreamingStatus: (t) => e({ streamingStatus: t }),
  resetChatStatus: () => e({
    chatStatus: Ye.IDLE,
    streamingStatus: Sn.IDLE
  })
}), Cs = (e) => ({
  // Initial state
  isLoadingConversation: !1,
  conversationError: null,
  // Actions
  setIsLoadingConversation: (t) => e({ isLoadingConversation: t }),
  setConversationError: (t) => e({ conversationError: t }),
  clearConversationError: () => e({ conversationError: null })
}), ys = (e) => ({
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
}), ws = (e) => ({
  // Initial state
  isDevSettingsOpen: !1,
  // Actions
  setIsDevSettingsOpen: (t) => e({ isDevSettingsOpen: t }),
  toggleDevSettings: () => e((t) => ({ isDevSettingsOpen: !t.isDevSettingsOpen }))
}), Ss = (e) => ({
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
}), $ = cs()(
  fs(
    (...e) => ({
      ...gs(...e),
      ...ms(...e),
      ...Cs(...e),
      ...ys(...e),
      ...ws(...e),
      ...Ss(...e)
    }),
    {
      name: "ChatUI-Store"
    }
  )
), Gh = () => $((e) => ({
  isModalOpen: e.isModalOpen,
  isCollapsed: e.isCollapsed,
  currentMode: e.currentMode,
  openModal: e.openModal,
  closeModal: e.closeModal,
  toggleCollapse: e.toggleCollapse,
  toggleFullscreen: e.toggleFullscreen
})), Wh = () => $((e) => ({
  chatStatus: e.chatStatus,
  streamingStatus: e.streamingStatus,
  setChatStatus: e.setChatStatus,
  setStreamingStatus: e.setStreamingStatus,
  resetChatStatus: e.resetChatStatus
})), Vh = () => $((e) => ({
  isLoadingConversation: e.isLoadingConversation,
  conversationError: e.conversationError,
  setIsLoadingConversation: e.setIsLoadingConversation,
  setConversationError: e.setConversationError,
  clearConversationError: e.clearConversationError
})), jh = () => $((e) => ({
  currentThreadId: e.currentThreadId,
  providerResId: e.providerResId,
  setCurrentThreadId: e.setCurrentThreadId,
  setProviderResId: e.setProviderResId,
  clearThreadData: e.clearThreadData
})), $h = () => $((e) => ({
  isDevSettingsOpen: e.isDevSettingsOpen,
  setIsDevSettingsOpen: e.setIsDevSettingsOpen,
  toggleDevSettings: e.toggleDevSettings
})), Es = ({
  isOpen: e,
  onClose: t,
  apiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  app: a = "UD21"
  // Default to UD21 if not specified
}) => {
  const [s, o] = ae(null), [l, c] = ae(""), [u, p] = ae(""), f = $((O) => O.providerResId), [d, w] = ae(""), [y, A] = ae("BRAND"), [S, _] = ae(""), [L, P] = ae(""), [N, T] = ae(!1), [U, D] = ae(null), [H, z] = ae(null), [b, M] = ae("agent");
  Ie(() => {
    e && !s && V();
  }, [e]);
  const V = ne(async () => {
    T(!0), D(null);
    try {
      const O = await ns(n, {
        userMpAuthToken: r,
        chatServerKey: i
      });
      if (!O)
        throw new Error(`No configuration found for app: ${a}`);
      o(O), c(O.promptPath), p(O.versionUuid);
    } catch (O) {
      D(O instanceof Error ? O.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", O);
    } finally {
      T(!1);
    }
  }, [n, a, r, i]), q = ne(async () => {
    if (s) {
      T(!0), D(null);
      try {
        const O = await rs(n, {
          app: s.app,
          promptPath: l,
          versionUuid: u,
          isDefault: s.isDefault
        }, {
          userMpAuthToken: r,
          chatServerKey: i
        });
        o(O), t(), window.location.reload();
      } catch (O) {
        D(O instanceof Error ? O.message : "Failed to update configuration"), console.error("Error updating agent configuration:", O);
      } finally {
        T(!1);
      }
    }
  }, [n, l, u, s, t, r, i]), W = ne(async () => {
    if (!f) {
      D("No active conversation to attach");
      return;
    }
    T(!0), D(null), z(null);
    try {
      let O;
      if (L.trim())
        try {
          O = JSON.parse(L);
        } catch {
          throw new Error("Invalid JSON in metadata field");
        }
      const ue = d && y, _e = S || O;
      if (ue && await Zi(
        n,
        f,
        {
          entityId: d,
          entityType: y
        },
        {
          userMpAuthToken: r,
          chatServerKey: i
        }
      ), _e && await Ki(
        n,
        f,
        {
          tag: S || void 0,
          metadata: O
        },
        {
          userMpAuthToken: r,
          chatServerKey: i
        }
      ), !ue && !_e) {
        D("Please provide at least one field to update");
        return;
      }
      z("Thread updated successfully!"), setTimeout(() => {
        w(""), A("BRAND"), _(""), P(""), z(null);
      }, 2e3);
    } catch (O) {
      D(O instanceof Error ? O.message : "Failed to update thread"), console.error("Error updating thread:", O);
    } finally {
      T(!1);
    }
  }, [f, n, d, y, S, L, r, i]), ie = ne(() => {
    s && (c(s.promptPath), p(s.versionUuid)), D(null), t();
  }, [s, t]);
  return e ? /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ h("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: ie,
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
    /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-tabs", children: [
      /* @__PURE__ */ h(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${b === "agent" ? "active" : ""}`,
          onClick: () => M("agent"),
          children: "Agent Config"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${b === "thread" ? "active" : ""}`,
          onClick: () => M("thread"),
          children: "Thread Attachment"
        }
      )
    ] }),
    /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-content", children: [
      H && /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-success", children: H }),
      N && /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      U && /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ k("p", { children: [
          "Error: ",
          U
        ] }),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: b === "agent" ? V : void 0,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      b === "agent" && s && !N && /* @__PURE__ */ k(Gt, { children: [
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: l,
              onChange: (O) => c(O.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: N
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: u,
              onChange: (O) => p(O.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: N
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
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
      ] }),
      b === "thread" && !N && /* @__PURE__ */ k(Gt, { children: [
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-info", children: [
          /* @__PURE__ */ k("p", { children: [
            /* @__PURE__ */ h("strong", { children: "Provider Resource ID:" }),
            " ",
            f || "No active conversation"
          ] }),
          /* @__PURE__ */ h("p", { style: { fontSize: "12px", color: "#666", marginTop: "8px" }, children: "Note: Entity ownership is typically set at initialization. Use this to update business context." })
        ] }),
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-section", children: [
          /* @__PURE__ */ h("h4", { style: { marginBottom: "8px", fontSize: "14px", fontWeight: "600" }, children: "Update Business Context" }),
          /* @__PURE__ */ h("p", { style: { marginBottom: "12px", fontSize: "12px", color: "#666" }, children: "Update dynamic metadata like order IDs, table IDs, status, etc." }),
          /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
            /* @__PURE__ */ h("label", { htmlFor: "tag", children: "Tag:" }),
            /* @__PURE__ */ h(
              "input",
              {
                id: "tag",
                type: "text",
                value: S,
                onChange: (O) => _(O.target.value),
                placeholder: "e.g., customer-inquiry, support",
                className: "chat-wrapper__dev-settings-input",
                disabled: N || !f
              }
            ),
            /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Optional tag for categorizing the thread." })
          ] }),
          /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
            /* @__PURE__ */ h("label", { htmlFor: "metadata", children: "Metadata (JSON):" }),
            /* @__PURE__ */ h(
              "textarea",
              {
                id: "metadata",
                value: L,
                onChange: (O) => P(O.target.value),
                placeholder: '{"orderId": "order_789", "tableId": "table_5", "status": "pending"}',
                className: "chat-wrapper__dev-settings-input",
                rows: 4,
                disabled: N || !f
              }
            ),
            /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "App-specific business data (orderId, tableId, campaignId, etc.)." })
          ] })
        ] }),
        /* @__PURE__ */ h("div", { style: { borderTop: "1px solid #e0e0e0", margin: "20px 0" } }),
        /* @__PURE__ */ k("details", { style: { marginTop: "16px" }, children: [
          /* @__PURE__ */ h("summary", { style: { cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#666" }, children: "Advanced: Change Entity Ownership (Rare)" }),
          /* @__PURE__ */ k("div", { style: { marginTop: "12px", padding: "12px", backgroundColor: "#f9f9f9", borderRadius: "4px" }, children: [
            /* @__PURE__ */ h("p", { style: { fontSize: "12px", color: "#666", marginBottom: "12px" }, children: "⚠️ Entity is typically set at initialization. Only change this if transferring conversation ownership." }),
            /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
              /* @__PURE__ */ h("label", { htmlFor: "entity-id", children: "Entity ID:" }),
              /* @__PURE__ */ h(
                "input",
                {
                  id: "entity-id",
                  type: "text",
                  value: d,
                  onChange: (O) => w(O.target.value),
                  placeholder: "e.g., brand_123 or account_456",
                  className: "chat-wrapper__dev-settings-input",
                  disabled: N || !f
                }
              ),
              /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "The brand or account ID to attach this thread to." })
            ] }),
            /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
              /* @__PURE__ */ h("label", { htmlFor: "entity-type", children: "Entity Type:" }),
              /* @__PURE__ */ k(
                "select",
                {
                  id: "entity-type",
                  value: y,
                  onChange: (O) => A(O.target.value),
                  className: "chat-wrapper__dev-settings-input",
                  disabled: N || !f,
                  children: [
                    /* @__PURE__ */ h("option", { value: "", children: "-- Select Type --" }),
                    /* @__PURE__ */ h("option", { value: "BRAND", children: "BRAND" }),
                    /* @__PURE__ */ h("option", { value: "ACCOUNT", children: "ACCOUNT" })
                  ]
                }
              ),
              /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Type of entity (BRAND or ACCOUNT)." })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: ie,
          disabled: N,
          children: "Cancel"
        }
      ),
      b === "agent" && /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: q,
          disabled: N || !s,
          children: N ? "Saving..." : "Save & Reload"
        }
      ),
      b === "thread" && /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: W,
          disabled: N || !f,
          children: N ? "Updating..." : "Update Thread"
        }
      )
    ] })
  ] }) }) : null;
}, Ts = {
  maxReconnectAttempts: 5,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, Gr = {
  NORMAL: 1e3,
  GOING_AWAY: 1001
};
var nt = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(nt || {}), St = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e))(St || {}), Fe = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(Fe || {}), mn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(mn || {}), xt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(xt || {});
class Ut {
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
      type: St.CHAT_MESSAGE,
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
class _s {
  constructor(t, n) {
    G(this, "ws", null);
    G(this, "config");
    G(this, "connectionState");
    G(this, "reconnectTimer", null);
    G(this, "heartbeatInterval", null);
    G(this, "visibilityChangeHandler");
    G(this, "currentTicket", null);
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
    const { NORMAL: n, GOING_AWAY: r } = Gr;
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
        Ut.connectionLost("Max reconnection attempts reached")
      ));
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    (a = this.onSystemEvent) == null || a.call(this, Ut.reconnecting(t, n)), this.reconnectTimer = window.setTimeout(() => {
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
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Ut.connectionRestored()), (n = this.onOpen) == null || n.call(this);
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
    this.ws && this.ws.close(Gr.NORMAL);
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
class ks {
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
class En {
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
class qi {
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
}, we = {
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
  getMessageType: (e, t) => t === !1 ? we.isErrorMessage(e) ? Z.MESSAGE_TYPES.ERROR : (we.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || we.isThinkingMessage(e), Z.MESSAGE_TYPES.THOUGHT) : we.isCompletedMessage(e) ? Z.MESSAGE_TYPES.COMPLETED : we.isErrorMessage(e) ? Z.MESSAGE_TYPES.ERROR : (we.isHandlingMessage(e) || we.isThinkingMessage(e) && !e.includes(Z.UI_TEXT.AI_IS_THINKING), Z.MESSAGE_TYPES.THINKING)
};
class xs extends qi {
  constructor(n) {
    super({ onReasoningUpdate: n });
    G(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    G(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, s) {
    const o = this.getHandler("onReasoningUpdate");
    if (!o) return;
    const l = En.createReasoningCall(
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
    const s = `${Z.THINKING_PREFIX} ${a}`;
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
    const o = i || Z.UI_TEXT.THOUGHT, l = `${Z.THOUGHT_PREFIX} ${o}${s}`;
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
class bs extends qi {
  constructor(n = {}, r) {
    super({ onReasoningUpdate: r });
    G(this, "processedToolCalls", /* @__PURE__ */ new Set());
    G(this, "clientTools", {});
    G(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var s, o, l;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (s = this.getHandler("onReasoningUpdate")) == null || s(!0, `${Z.HANDLING_MARKER} ${i}`, n);
      try {
        const c = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, c), (o = this.getHandler("onReasoningUpdate")) == null || o(!1, `${Z.COMPLETED_MARKER} ${i}`, n);
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
      const a = En.createLatitudeToolCall(
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
      const a = En.createLatitudeToolCall(
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
class vs {
  constructor(t, n = {}) {
    G(this, "reasoningHandler");
    G(this, "toolHandler");
    G(this, "handlers");
    G(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new xs(t.onReasoningUpdate), this.toolHandler = new bs(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case Fe.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case Fe.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case Fe.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case Fe.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case Fe.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case Fe.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case Fe.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case Fe.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case Fe.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case Fe.HEARTBEAT_ACK:
          break;
        case Fe.ERROR:
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
      case mn.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case mn.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case mn.CONTENT_DELTA:
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
        const i = En.createServerToolCall(
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
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Ut.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Ut.chatError(t.error || "Unknown error"));
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
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Ut.chatError(t.error || "Unknown WebSocket error"));
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
async function Is(e, t) {
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
function Yn(e) {
  if (!e.success || !e.ticket || !e.expiresAt)
    return !1;
  const t = new Date(e.expiresAt).getTime();
  return Date.now() < t - 3e4;
}
function Wr(e) {
  const t = Yn(e), n = new Date(e.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: t,
    expiresIn: i,
    expired: r >= n
  };
}
class Rs {
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
    return this.ticket && Yn(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
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
      return this.ticket = await Is(this.apiUrl, this.authData), console.log("TicketManager: Ticket received successfully", {
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
      const r = Wr(this.ticket).expiresIn / 1e3;
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
    return this.ticket ? Yn(this.ticket) : !1;
  }
  /**
   * Get time until ticket expires (in milliseconds)
   */
  getExpiresIn() {
    if (this.ticket)
      try {
        return Wr(this.ticket).expiresIn;
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
class As {
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
      ...Ts
    }, this.connectionState = new ks(), this.wsManager = new _s(this.config, this.connectionState), this.messageHandler = new vs({}), this.setupWebSocketHandlers();
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
    ), this.handleAuthenticationFailure(n)), (n == null ? void 0 : n.type) === Fe.TOOLS_CONFIGURED && ((r = this.initResolve) == null || r.call(this)), (n == null ? void 0 : n.type) === Fe.SESSION_ESTABLISHED && (this.toolSchemas && this.toolSchemas.length > 0 ? this.sendToolConfiguration() : (i = this.initResolve) == null || i.call(this));
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
      console.error("Failed to refresh ticket:", a), (s = this.initReject) == null || s.call(this, a);
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
    return this.setupEventHandlers(t), this.setupToolsAndContext(t), this.updateConfig(t), this.authCredentials = {
      userMpAuthToken: t.userMpAuthToken,
      chatServerKey: t.chatServerKey
    }, this.ticketManager = new Rs(
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
      await Zi(
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
      await Ki(
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
function Ns({
  // Authentication and server properties
  userMpAuthToken: e,
  chatServerUrl: t,
  chatServerKey: n,
  // Entity configuration
  userId: r,
  entityId: i,
  entityType: a,
  // Tools configuration
  tools: s,
  // Other properties
  contextHelpers: o,
  onSetMessage: l,
  onSystemEvent: c,
  onReasoningUpdate: u
}) {
  const [p, f] = ae(null), [d, w] = ae(!1), [y, A] = ae(!1), S = Xe(null), _ = Xe(l), L = Xe(c), P = Xe(u);
  Ie(() => {
    _.current = l, L.current = c, P.current = u;
  }, [l, c, u]);
  const { toolSchemas: N, clientToolExecutors: T } = me(() => {
    if (s && s.length > 0) {
      const H = s.map(({ execute: b, ...M }) => M), z = {};
      return s.forEach((b) => {
        z[b.name] = b.execute;
      }), {
        toolSchemas: H,
        clientToolExecutors: z
      };
    }
    return {
      toolSchemas: [],
      clientToolExecutors: {}
    };
  }, [s]), U = ne(async () => {
    try {
      if (A(!0), !e)
        throw new Error("userMpAuthToken is required");
      if (!t)
        throw new Error("chatServerUrl is required");
      if (!n)
        throw new Error("chatServerKey is required");
      if (!r)
        throw new Error("userId is required");
      const H = new As();
      S.current = H, f(H);
      const z = o || {};
      await H.onInit({
        // Authentication and server properties
        userMpAuthToken: e,
        chatServerUrl: t,
        chatServerKey: n,
        userId: r,
        entityId: i,
        entityType: a == null ? void 0 : a.toString(),
        // Tools configuration
        toolSchemas: N,
        clientTools: T,
        contextHelpers: z,
        onSetMessage: _.current,
        onSystemEvent: L.current,
        onReasoningUpdate: P.current
      }), w(!0);
    } catch (H) {
      console.error("Error connecting WebSocketChatClient:", H), w(!1);
    } finally {
      A(!1);
    }
  }, [
    e,
    t,
    n,
    r,
    i,
    a,
    N,
    T,
    o
    // Removed onSetMessage, onSystemEvent, onReasoningUpdate to prevent reconnections
  ]), D = ne(() => {
    S.current && (S.current.disconnect(), S.current = null), f(null), w(!1);
  }, []);
  return Ie(() => (U(), () => {
    D();
  }), [U, D]), Ie(() => {
    const H = setInterval(() => {
      if (S.current) {
        const z = S.current.getConnectionStatus();
        w(z.connected);
      }
    }, 1e3);
    return () => clearInterval(H);
  }, []), {
    chatClient: p,
    isConnected: d,
    isConnecting: y,
    connectChatClient: U,
    disconnectChatClient: D
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: Xi,
  setPrototypeOf: Vr,
  isFrozen: Ms,
  getPrototypeOf: Ls,
  getOwnPropertyDescriptor: Os
} = Object;
let {
  freeze: Le,
  seal: Je,
  create: Jn
} = Object, {
  apply: Qn,
  construct: er
} = typeof Reflect < "u" && Reflect;
Le || (Le = function(t) {
  return t;
});
Je || (Je = function(t) {
  return t;
});
Qn || (Qn = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
er || (er = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const hn = Oe(Array.prototype.forEach), Ds = Oe(Array.prototype.lastIndexOf), jr = Oe(Array.prototype.pop), jt = Oe(Array.prototype.push), Ps = Oe(Array.prototype.splice), Cn = Oe(String.prototype.toLowerCase), On = Oe(String.prototype.toString), Dn = Oe(String.prototype.match), $t = Oe(String.prototype.replace), Hs = Oe(String.prototype.indexOf), Fs = Oe(String.prototype.trim), tt = Oe(Object.prototype.hasOwnProperty), Me = Oe(RegExp.prototype.test), Zt = Us(TypeError);
function Oe(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Qn(e, t, r);
  };
}
function Us(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return er(e, n);
  };
}
function Q(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Cn;
  Vr && Vr(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (Ms(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function zs(e) {
  for (let t = 0; t < e.length; t++)
    tt(e, t) || (e[t] = null);
  return e;
}
function Et(e) {
  const t = Jn(null);
  for (const [n, r] of Xi(e))
    tt(e, n) && (Array.isArray(r) ? t[n] = zs(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = Et(r) : t[n] = r);
  return t;
}
function Kt(e, t) {
  for (; e !== null; ) {
    const r = Os(e, t);
    if (r) {
      if (r.get)
        return Oe(r.get);
      if (typeof r.value == "function")
        return Oe(r.value);
    }
    e = Ls(e);
  }
  function n() {
    return null;
  }
  return n;
}
const $r = Le(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Pn = Le(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Hn = Le(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Bs = Le(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Fn = Le(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Gs = Le(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Zr = Le(["#text"]), Kr = Le(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Un = Le(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), qr = Le(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), dn = Le(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Ws = Je(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Vs = Je(/<%[\w\W]*|[\w\W]*%>/gm), js = Je(/\$\{[\w\W]*/gm), $s = Je(/^data-[\-\w.\u00B7-\uFFFF]+$/), Zs = Je(/^aria-[\-\w]+$/), Yi = Je(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Ks = Je(/^(?:\w+script|data):/i), qs = Je(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Ji = Je(/^html$/i), Xs = Je(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Xr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Zs,
  ATTR_WHITESPACE: qs,
  CUSTOM_ELEMENT: Xs,
  DATA_ATTR: $s,
  DOCTYPE_NAME: Ji,
  ERB_EXPR: Vs,
  IS_ALLOWED_URI: Yi,
  IS_SCRIPT_OR_DATA: Ks,
  MUSTACHE_EXPR: Ws,
  TMPLIT_EXPR: js
});
const qt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Ys = function() {
  return typeof window > "u" ? null : window;
}, Js = function(t, n) {
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
}, Yr = function() {
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
function Qi() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ys();
  const t = (B) => Qi(B);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== qt.document || !e.Element)
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
    HTMLFormElement: p,
    DOMParser: f,
    trustedTypes: d
  } = e, w = l.prototype, y = Kt(w, "cloneNode"), A = Kt(w, "remove"), S = Kt(w, "nextSibling"), _ = Kt(w, "childNodes"), L = Kt(w, "parentNode");
  if (typeof s == "function") {
    const B = n.createElement("template");
    B.content && B.content.ownerDocument && (n = B.content.ownerDocument);
  }
  let P, N = "";
  const {
    implementation: T,
    createNodeIterator: U,
    createDocumentFragment: D,
    getElementsByTagName: H
  } = n, {
    importNode: z
  } = r;
  let b = Yr();
  t.isSupported = typeof Xi == "function" && typeof L == "function" && T && T.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: M,
    ERB_EXPR: V,
    TMPLIT_EXPR: q,
    DATA_ATTR: W,
    ARIA_ATTR: ie,
    IS_SCRIPT_OR_DATA: O,
    ATTR_WHITESPACE: ue,
    CUSTOM_ELEMENT: _e
  } = Xr;
  let {
    IS_ALLOWED_URI: m
  } = Xr, ee = null;
  const ke = Q({}, [...$r, ...Pn, ...Hn, ...Fn, ...Zr]);
  let g = null;
  const ye = Q({}, [...Kr, ...Un, ...qr, ...dn]);
  let te = Object.seal(Jn(null, {
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
  })), se = null, De = null;
  const Ce = Object.seal(Jn(null, {
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
  let Ze = !0, Be = !0, it = !1, It = !0, Qe = !1, gt = !0, Ge = !1, mt = !1, Tt = !1, at = !1, st = !1, ot = !1, Rt = !0, _t = !1;
  const Ct = "user-content-";
  let At = !0, xe = !1, E = {}, R = null;
  const j = Q({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let X = null;
  const J = Q({}, ["audio", "video", "img", "source", "image", "track"]);
  let pe = null;
  const We = Q({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Se = "http://www.w3.org/1998/Math/MathML", Ke = "http://www.w3.org/2000/svg", Ee = "http://www.w3.org/1999/xhtml";
  let he = Ee, Ve = !1, be = null;
  const on = Q({}, [Se, Ke, Ee], On);
  let Nt = Q({}, ["mi", "mo", "mn", "ms", "mtext"]), Mt = Q({}, ["annotation-xml"]);
  const ln = Q({}, ["title", "style", "font", "a", "script"]);
  let Lt = null;
  const Ir = ["application/xhtml+xml", "text/html"], cn = "text/html";
  let de = null, x = null;
  const Ne = n.createElement("form"), et = function(C) {
    return C instanceof RegExp || C instanceof Function;
  }, lt = function() {
    let C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(x && x === C)) {
      if ((!C || typeof C != "object") && (C = {}), C = Et(C), Lt = // eslint-disable-next-line unicorn/prefer-includes
      Ir.indexOf(C.PARSER_MEDIA_TYPE) === -1 ? cn : C.PARSER_MEDIA_TYPE, de = Lt === "application/xhtml+xml" ? On : Cn, ee = tt(C, "ALLOWED_TAGS") ? Q({}, C.ALLOWED_TAGS, de) : ke, g = tt(C, "ALLOWED_ATTR") ? Q({}, C.ALLOWED_ATTR, de) : ye, be = tt(C, "ALLOWED_NAMESPACES") ? Q({}, C.ALLOWED_NAMESPACES, On) : on, pe = tt(C, "ADD_URI_SAFE_ATTR") ? Q(Et(We), C.ADD_URI_SAFE_ATTR, de) : We, X = tt(C, "ADD_DATA_URI_TAGS") ? Q(Et(J), C.ADD_DATA_URI_TAGS, de) : J, R = tt(C, "FORBID_CONTENTS") ? Q({}, C.FORBID_CONTENTS, de) : j, se = tt(C, "FORBID_TAGS") ? Q({}, C.FORBID_TAGS, de) : Et({}), De = tt(C, "FORBID_ATTR") ? Q({}, C.FORBID_ATTR, de) : Et({}), E = tt(C, "USE_PROFILES") ? C.USE_PROFILES : !1, Ze = C.ALLOW_ARIA_ATTR !== !1, Be = C.ALLOW_DATA_ATTR !== !1, it = C.ALLOW_UNKNOWN_PROTOCOLS || !1, It = C.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Qe = C.SAFE_FOR_TEMPLATES || !1, gt = C.SAFE_FOR_XML !== !1, Ge = C.WHOLE_DOCUMENT || !1, at = C.RETURN_DOM || !1, st = C.RETURN_DOM_FRAGMENT || !1, ot = C.RETURN_TRUSTED_TYPE || !1, Tt = C.FORCE_BODY || !1, Rt = C.SANITIZE_DOM !== !1, _t = C.SANITIZE_NAMED_PROPS || !1, At = C.KEEP_CONTENT !== !1, xe = C.IN_PLACE || !1, m = C.ALLOWED_URI_REGEXP || Yi, he = C.NAMESPACE || Ee, Nt = C.MATHML_TEXT_INTEGRATION_POINTS || Nt, Mt = C.HTML_INTEGRATION_POINTS || Mt, te = C.CUSTOM_ELEMENT_HANDLING || {}, C.CUSTOM_ELEMENT_HANDLING && et(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (te.tagNameCheck = C.CUSTOM_ELEMENT_HANDLING.tagNameCheck), C.CUSTOM_ELEMENT_HANDLING && et(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (te.attributeNameCheck = C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), C.CUSTOM_ELEMENT_HANDLING && typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (te.allowCustomizedBuiltInElements = C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Qe && (Be = !1), st && (at = !0), E && (ee = Q({}, Zr), g = [], E.html === !0 && (Q(ee, $r), Q(g, Kr)), E.svg === !0 && (Q(ee, Pn), Q(g, Un), Q(g, dn)), E.svgFilters === !0 && (Q(ee, Hn), Q(g, Un), Q(g, dn)), E.mathMl === !0 && (Q(ee, Fn), Q(g, qr), Q(g, dn))), C.ADD_TAGS && (typeof C.ADD_TAGS == "function" ? Ce.tagCheck = C.ADD_TAGS : (ee === ke && (ee = Et(ee)), Q(ee, C.ADD_TAGS, de))), C.ADD_ATTR && (typeof C.ADD_ATTR == "function" ? Ce.attributeCheck = C.ADD_ATTR : (g === ye && (g = Et(g)), Q(g, C.ADD_ATTR, de))), C.ADD_URI_SAFE_ATTR && Q(pe, C.ADD_URI_SAFE_ATTR, de), C.FORBID_CONTENTS && (R === j && (R = Et(R)), Q(R, C.FORBID_CONTENTS, de)), At && (ee["#text"] = !0), Ge && Q(ee, ["html", "head", "body"]), ee.table && (Q(ee, ["tbody"]), delete se.tbody), C.TRUSTED_TYPES_POLICY) {
        if (typeof C.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Zt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof C.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Zt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        P = C.TRUSTED_TYPES_POLICY, N = P.createHTML("");
      } else
        P === void 0 && (P = Js(d, i)), P !== null && typeof N == "string" && (N = P.createHTML(""));
      Le && Le(C), x = C;
    }
  }, Rr = Q({}, [...Pn, ...Hn, ...Bs]), Ar = Q({}, [...Fn, ...Gs]), Xa = function(C) {
    let I = L(C);
    (!I || !I.tagName) && (I = {
      namespaceURI: he,
      tagName: "template"
    });
    const F = Cn(C.tagName), ce = Cn(I.tagName);
    return be[C.namespaceURI] ? C.namespaceURI === Ke ? I.namespaceURI === Ee ? F === "svg" : I.namespaceURI === Se ? F === "svg" && (ce === "annotation-xml" || Nt[ce]) : !!Rr[F] : C.namespaceURI === Se ? I.namespaceURI === Ee ? F === "math" : I.namespaceURI === Ke ? F === "math" && Mt[ce] : !!Ar[F] : C.namespaceURI === Ee ? I.namespaceURI === Ke && !Mt[ce] || I.namespaceURI === Se && !Nt[ce] ? !1 : !Ar[F] && (ln[F] || !Rr[F]) : !!(Lt === "application/xhtml+xml" && be[C.namespaceURI]) : !1;
  }, ct = function(C) {
    jt(t.removed, {
      element: C
    });
    try {
      L(C).removeChild(C);
    } catch {
      A(C);
    }
  }, Ot = function(C, I) {
    try {
      jt(t.removed, {
        attribute: I.getAttributeNode(C),
        from: I
      });
    } catch {
      jt(t.removed, {
        attribute: null,
        from: I
      });
    }
    if (I.removeAttribute(C), C === "is")
      if (at || st)
        try {
          ct(I);
        } catch {
        }
      else
        try {
          I.setAttribute(C, "");
        } catch {
        }
  }, Nr = function(C) {
    let I = null, F = null;
    if (Tt)
      C = "<remove></remove>" + C;
    else {
      const fe = Dn(C, /^[\r\n\t ]+/);
      F = fe && fe[0];
    }
    Lt === "application/xhtml+xml" && he === Ee && (C = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + C + "</body></html>");
    const ce = P ? P.createHTML(C) : C;
    if (he === Ee)
      try {
        I = new f().parseFromString(ce, Lt);
      } catch {
      }
    if (!I || !I.documentElement) {
      I = T.createDocument(he, "template", null);
      try {
        I.documentElement.innerHTML = Ve ? N : ce;
      } catch {
      }
    }
    const ve = I.body || I.documentElement;
    return C && F && ve.insertBefore(n.createTextNode(F), ve.childNodes[0] || null), he === Ee ? H.call(I, Ge ? "html" : "body")[0] : Ge ? I.documentElement : ve;
  }, Mr = function(C) {
    return U.call(
      C.ownerDocument || C,
      C,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, Nn = function(C) {
    return C instanceof p && (typeof C.nodeName != "string" || typeof C.textContent != "string" || typeof C.removeChild != "function" || !(C.attributes instanceof u) || typeof C.removeAttribute != "function" || typeof C.setAttribute != "function" || typeof C.namespaceURI != "string" || typeof C.insertBefore != "function" || typeof C.hasChildNodes != "function");
  }, Lr = function(C) {
    return typeof o == "function" && C instanceof o;
  };
  function yt(B, C, I) {
    hn(B, (F) => {
      F.call(t, C, I, x);
    });
  }
  const Or = function(C) {
    let I = null;
    if (yt(b.beforeSanitizeElements, C, null), Nn(C))
      return ct(C), !0;
    const F = de(C.nodeName);
    if (yt(b.uponSanitizeElement, C, {
      tagName: F,
      allowedTags: ee
    }), gt && C.hasChildNodes() && !Lr(C.firstElementChild) && Me(/<[/\w!]/g, C.innerHTML) && Me(/<[/\w!]/g, C.textContent) || C.nodeType === qt.progressingInstruction || gt && C.nodeType === qt.comment && Me(/<[/\w]/g, C.data))
      return ct(C), !0;
    if (!(Ce.tagCheck instanceof Function && Ce.tagCheck(F)) && (!ee[F] || se[F])) {
      if (!se[F] && Pr(F) && (te.tagNameCheck instanceof RegExp && Me(te.tagNameCheck, F) || te.tagNameCheck instanceof Function && te.tagNameCheck(F)))
        return !1;
      if (At && !R[F]) {
        const ce = L(C) || C.parentNode, ve = _(C) || C.childNodes;
        if (ve && ce) {
          const fe = ve.length;
          for (let Pe = fe - 1; Pe >= 0; --Pe) {
            const wt = y(ve[Pe], !0);
            wt.__removalCount = (C.__removalCount || 0) + 1, ce.insertBefore(wt, S(C));
          }
        }
      }
      return ct(C), !0;
    }
    return C instanceof l && !Xa(C) || (F === "noscript" || F === "noembed" || F === "noframes") && Me(/<\/no(script|embed|frames)/i, C.innerHTML) ? (ct(C), !0) : (Qe && C.nodeType === qt.text && (I = C.textContent, hn([M, V, q], (ce) => {
      I = $t(I, ce, " ");
    }), C.textContent !== I && (jt(t.removed, {
      element: C.cloneNode()
    }), C.textContent = I)), yt(b.afterSanitizeElements, C, null), !1);
  }, Dr = function(C, I, F) {
    if (Rt && (I === "id" || I === "name") && (F in n || F in Ne))
      return !1;
    if (!(Be && !De[I] && Me(W, I))) {
      if (!(Ze && Me(ie, I))) {
        if (!(Ce.attributeCheck instanceof Function && Ce.attributeCheck(I, C))) {
          if (!g[I] || De[I]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Pr(C) && (te.tagNameCheck instanceof RegExp && Me(te.tagNameCheck, C) || te.tagNameCheck instanceof Function && te.tagNameCheck(C)) && (te.attributeNameCheck instanceof RegExp && Me(te.attributeNameCheck, I) || te.attributeNameCheck instanceof Function && te.attributeNameCheck(I, C)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              I === "is" && te.allowCustomizedBuiltInElements && (te.tagNameCheck instanceof RegExp && Me(te.tagNameCheck, F) || te.tagNameCheck instanceof Function && te.tagNameCheck(F)))
            ) return !1;
          } else if (!pe[I]) {
            if (!Me(m, $t(F, ue, ""))) {
              if (!((I === "src" || I === "xlink:href" || I === "href") && C !== "script" && Hs(F, "data:") === 0 && X[C])) {
                if (!(it && !Me(O, $t(F, ue, "")))) {
                  if (F)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Pr = function(C) {
    return C !== "annotation-xml" && Dn(C, _e);
  }, Hr = function(C) {
    yt(b.beforeSanitizeAttributes, C, null);
    const {
      attributes: I
    } = C;
    if (!I || Nn(C))
      return;
    const F = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: g,
      forceKeepAttr: void 0
    };
    let ce = I.length;
    for (; ce--; ) {
      const ve = I[ce], {
        name: fe,
        namespaceURI: Pe,
        value: wt
      } = ve, Ht = de(fe), Mn = wt;
      let Te = fe === "value" ? Mn : Fs(Mn);
      if (F.attrName = Ht, F.attrValue = Te, F.keepAttr = !0, F.forceKeepAttr = void 0, yt(b.uponSanitizeAttribute, C, F), Te = F.attrValue, _t && (Ht === "id" || Ht === "name") && (Ot(fe, C), Te = Ct + Te), gt && Me(/((--!?|])>)|<\/(style|title|textarea)/i, Te)) {
        Ot(fe, C);
        continue;
      }
      if (Ht === "attributename" && Dn(Te, "href")) {
        Ot(fe, C);
        continue;
      }
      if (F.forceKeepAttr)
        continue;
      if (!F.keepAttr) {
        Ot(fe, C);
        continue;
      }
      if (!It && Me(/\/>/i, Te)) {
        Ot(fe, C);
        continue;
      }
      Qe && hn([M, V, q], (Ur) => {
        Te = $t(Te, Ur, " ");
      });
      const Fr = de(C.nodeName);
      if (!Dr(Fr, Ht, Te)) {
        Ot(fe, C);
        continue;
      }
      if (P && typeof d == "object" && typeof d.getAttributeType == "function" && !Pe)
        switch (d.getAttributeType(Fr, Ht)) {
          case "TrustedHTML": {
            Te = P.createHTML(Te);
            break;
          }
          case "TrustedScriptURL": {
            Te = P.createScriptURL(Te);
            break;
          }
        }
      if (Te !== Mn)
        try {
          Pe ? C.setAttributeNS(Pe, fe, Te) : C.setAttribute(fe, Te), Nn(C) ? ct(C) : jr(t.removed);
        } catch {
          Ot(fe, C);
        }
    }
    yt(b.afterSanitizeAttributes, C, null);
  }, Ya = function B(C) {
    let I = null;
    const F = Mr(C);
    for (yt(b.beforeSanitizeShadowDOM, C, null); I = F.nextNode(); )
      yt(b.uponSanitizeShadowNode, I, null), Or(I), Hr(I), I.content instanceof a && B(I.content);
    yt(b.afterSanitizeShadowDOM, C, null);
  };
  return t.sanitize = function(B) {
    let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, I = null, F = null, ce = null, ve = null;
    if (Ve = !B, Ve && (B = "<!-->"), typeof B != "string" && !Lr(B))
      if (typeof B.toString == "function") {
        if (B = B.toString(), typeof B != "string")
          throw Zt("dirty is not a string, aborting");
      } else
        throw Zt("toString is not a function");
    if (!t.isSupported)
      return B;
    if (mt || lt(C), t.removed = [], typeof B == "string" && (xe = !1), xe) {
      if (B.nodeName) {
        const wt = de(B.nodeName);
        if (!ee[wt] || se[wt])
          throw Zt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (B instanceof o)
      I = Nr("<!---->"), F = I.ownerDocument.importNode(B, !0), F.nodeType === qt.element && F.nodeName === "BODY" || F.nodeName === "HTML" ? I = F : I.appendChild(F);
    else {
      if (!at && !Qe && !Ge && // eslint-disable-next-line unicorn/prefer-includes
      B.indexOf("<") === -1)
        return P && ot ? P.createHTML(B) : B;
      if (I = Nr(B), !I)
        return at ? null : ot ? N : "";
    }
    I && Tt && ct(I.firstChild);
    const fe = Mr(xe ? B : I);
    for (; ce = fe.nextNode(); )
      Or(ce), Hr(ce), ce.content instanceof a && Ya(ce.content);
    if (xe)
      return B;
    if (at) {
      if (st)
        for (ve = D.call(I.ownerDocument); I.firstChild; )
          ve.appendChild(I.firstChild);
      else
        ve = I;
      return (g.shadowroot || g.shadowrootmode) && (ve = z.call(r, ve, !0)), ve;
    }
    let Pe = Ge ? I.outerHTML : I.innerHTML;
    return Ge && ee["!doctype"] && I.ownerDocument && I.ownerDocument.doctype && I.ownerDocument.doctype.name && Me(Ji, I.ownerDocument.doctype.name) && (Pe = "<!DOCTYPE " + I.ownerDocument.doctype.name + `>
` + Pe), Qe && hn([M, V, q], (wt) => {
      Pe = $t(Pe, wt, " ");
    }), P && ot ? P.createHTML(Pe) : Pe;
  }, t.setConfig = function() {
    let B = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    lt(B), mt = !0;
  }, t.clearConfig = function() {
    x = null, mt = !1;
  }, t.isValidAttribute = function(B, C, I) {
    x || lt({});
    const F = de(B), ce = de(C);
    return Dr(F, ce, I);
  }, t.addHook = function(B, C) {
    typeof C == "function" && jt(b[B], C);
  }, t.removeHook = function(B, C) {
    if (C !== void 0) {
      const I = Ds(b[B], C);
      return I === -1 ? void 0 : Ps(b[B], I, 1)[0];
    }
    return jr(b[B]);
  }, t.removeHooks = function(B) {
    b[B] = [];
  }, t.removeAllHooks = function() {
    b = Yr();
  }, t;
}
var Qs = Qi();
function eo(e) {
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
function Tn(e, t = !1) {
  return e;
}
function to(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function Jr(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || eo(e));
  } catch {
    return !1;
  }
}
function no() {
  Qs.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !Jr(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !Jr(n) && e.removeAttribute("src");
    }
  });
}
no();
function ro() {
  const [e, t] = ae([]), n = ne(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = ne(
    (s, o) => {
      const c = Tn(o, s === "assistant");
      t((u) => [
        ...u,
        {
          id: n(),
          role: s,
          content: c,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [n]
  ), i = ne(
    (s, o) => {
      t(
        (l) => l.map(
          (c) => c.id === s ? { ...c, ...o } : c
        )
      );
    },
    []
  ), a = ne(
    (s, o, l) => {
      t(
        (c) => c.map(
          (u) => u.id === s ? {
            ...u,
            content: o,
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
function io() {
  const e = $((_) => _.isStreaming), t = $((_) => _.setIsStreaming), n = $((_) => _.isThinking), r = $((_) => _.setIsThinking), i = $((_) => _.streamingContent), a = $((_) => _.setStreamingContent), s = $((_) => _.isHandlingTool), o = $((_) => _.setIsHandlingTool), l = $((_) => _.startStreaming), c = $((_) => _.stopStreaming), u = $((_) => _.clearStreamingBuffers), p = $((_) => _.resetToolHandling), f = Xe(""), d = me(() => ({
    get current() {
      return $.getState().currentAssistantMessageId;
    },
    set current(_) {
      $.getState().setCurrentAssistantMessageId(_);
    }
  }), []), w = ne((_) => {
    _ ? l(_) : (t(!0), r(!0), a("")), f.current = "";
  }, [l, t, r, a]), y = ne(() => {
    c(), f.current = "";
  }, [c]), A = ne(() => {
    p();
  }, [p]), S = ne(() => {
    u(), f.current = "";
  }, [u]);
  return {
    // State
    isStreaming: e,
    setIsStreaming: t,
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
    startStreaming: w,
    stopStreaming: y,
    resetToolHandling: A,
    clearStreamingBuffers: S
  };
}
function ao() {
  const e = me(
    () => (i, a) => a === !1 ? we.isErrorMessage(i) ? Re.ERROR : Re.COMPLETED : we.isCompletedMessage(i) ? Re.COMPLETED : we.isErrorMessage(i) ? Re.ERROR : Re.PROCESSING,
    []
  ), t = me(
    () => (i) => we.extractDuration(i),
    []
  ), n = me(
    () => (i) => we.cleanReasoningContent(i),
    []
  ), r = me(
    () => (i, a) => {
      switch (we.getMessageType(
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
function so() {
  const e = me(
    () => (n, r) => r === !1 ? n.includes(Z.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : n.includes(Z.COMPLETED_MARKER) || n.includes("✅") ? "Tool Completed" : n.includes(Z.ERROR_MARKER) ? "Tool Error" : (n.includes(Z.HANDLING_MARKER), "Tool Processing..."),
    []
  ), t = me(
    () => (n, r) => r === !1 ? n.includes(Z.ERROR_MARKER) ? Re.ERROR : Re.COMPLETED : n.includes(Z.COMPLETED_MARKER) || n.includes("✅") ? Re.COMPLETED : n.includes(Z.ERROR_MARKER) ? Re.ERROR : Re.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: t
  };
}
function oo({
  setMessages: e,
  addMessage: t,
  updateMessageContent: n,
  generateId: r,
  setIsThinking: i,
  setIsStreaming: a,
  setStreamingContent: s,
  setIsHandlingTool: o,
  currentAssistantMessageIdRef: l,
  streamingContentRef: c,
  clearStreamingBuffers: u,
  resetToolHandling: p
}) {
  const f = Xe(/* @__PURE__ */ new Map()), d = Xe(/* @__PURE__ */ new Map()), w = ne(() => {
    if (l.current && c.current) {
      const P = Tn(
        c.current,
        !0
      );
      return n(
        l.current,
        P,
        !1
      ), u(), !0;
    }
    return !1;
  }, [
    l,
    c,
    n,
    u
  ]), y = ne(
    (P) => {
      const N = Tn(P, !0);
      if (l.current)
        c.current += N, s(c.current), n(
          l.current,
          c.current,
          !0
        );
      else {
        i(!1);
        const T = r();
        l.current = T, c.current = N, s(N);
        const U = {
          id: T,
          role: "assistant",
          content: N,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        e((D) => [...D, U]);
      }
    },
    [
      l,
      c,
      s,
      n,
      i,
      r,
      e
    ]
  ), A = ne(
    (P, N, T) => {
      const { callId: U } = T || {};
      if (o(P), !U) return;
      const D = we.isThinkingMessage(N) && !N.includes("for") && !N.includes("seconds"), H = we.isThinkingMessage(N) && N.includes("for") && N.includes("seconds"), z = we.isHandlingMessage(N), b = we.isCompletedMessage(N), M = we.isErrorMessage(N);
      if (D || H) {
        const q = f.current.get(U);
        if (D && !q) {
          w();
          const W = r();
          f.current.set(U, W);
          const ie = {
            id: W,
            role: "reasoning",
            content: N,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          e((O) => [...O, ie]);
        } else H && q ? (n(q, N, !1), f.current.delete(U)) : q && D && n(q, N, !0);
      }
      const V = d.current.get(U);
      if (z && !V) {
        w();
        const q = N.match(
          Z.PATTERNS.HANDLING_TOOL
        ), W = q ? q[1] : "Unknown Tool", ie = r();
        d.current.set(U, ie);
        const O = {
          id: ie,
          role: "tooling",
          content: N,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...T,
            toolName: W,
            callId: U,
            status: Re.PROCESSING
          }
        };
        e((ue) => [...ue, O]);
      } else if ((b || M) && V) {
        const q = N.match(
          Z.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), W = q ? q[1] : "Unknown Tool";
        e(
          (ie) => ie.map(
            (O) => O.id === V ? {
              ...O,
              content: N,
              isStreaming: !1,
              toolData: {
                ...O.toolData,
                toolName: W,
                status: M ? Re.ERROR : Re.COMPLETED,
                callId: U ?? ""
              }
            } : O
          )
        ), d.current.delete(U);
      } else V && P && !b && !M && n(V, N, !0);
    },
    [
      o,
      w,
      r,
      e,
      n
    ]
  ), S = ne(() => {
    a(!1), i(!1), w();
  }, [a, i, w]), _ = ne(
    (P) => {
      console.error("Chat error:", P), a(!1), i(!1), w(), t("system", `❌ Chat error: ${P}`);
    },
    [
      a,
      i,
      w,
      t
    ]
  ), L = ne(() => {
    a(!1), i(!1), u(), p();
  }, [
    a,
    i,
    u,
    p
  ]);
  return {
    handleSetMessage: y,
    handleReasoningUpdate: A,
    handleChatFinished: S,
    handleChatError: _,
    stopGeneration: L,
    finalizeCurrentStreamingMessage: w
  };
}
function lo() {
  const e = ro(), t = io(), n = ao(), r = so(), i = oo({
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
function Zh({ initialMode: e = "sidebar" }) {
  const t = $();
  return Ie(() => {
    e && t.currentMode !== e && t.setCurrentMode(e);
  }, [e]), Ie(() => {
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
function co({
  entityId: e,
  entityType: t,
  userId: n,
  httpApiUrl: r,
  userMpAuthToken: i,
  chatServerKey: a,
  messages: s,
  setMessages: o,
  setIsLoadingConversation: l,
  setConversationError: c,
  setCurrentThreadId: u,
  setProviderResId: p,
  metadata: f
}) {
  const d = Xe(!1);
  return Ie(() => {
    (async () => {
      if (!e) {
        console.log("useConversationLoader: No entityId provided, skipping history fetch");
        return;
      }
      if (!n) {
        console.error("userId is required for conversation loading");
        return;
      }
      if (!r) {
        console.error("httpApiUrl is required for conversation loading");
        return;
      }
      if (!i) {
        console.error("userMpAuthToken is required for conversation loading");
        return;
      }
      if (!a) {
        console.error("chatServerKey is required for conversation loading");
        return;
      }
      if (!d.current && !(s.length > 0))
        try {
          l(!0), c(null), console.log("useConversationLoader: Fetching messages for entityId:", e, "entityType:", t);
          const y = await is(
            r,
            {
              userId: n,
              entityId: e,
              entityType: t,
              metadata: f
            },
            {
              userMpAuthToken: i,
              chatServerKey: a
            }
          );
          console.log(`useConversationLoader: Loaded ${y.messages.length} messages`), o(y.messages), y.threadId && (console.log("useConversationLoader: Setting threadId from response:", y.threadId), u(y.threadId)), y.providerResId && (console.log("useConversationLoader: Setting providerResId:", y.providerResId), p(y.providerResId)), d.current = !0;
        } catch (y) {
          console.error("❌ Error loading conversation:", y), c(
            y instanceof Error ? y.message : "Failed to load conversation"
          ), d.current = !0;
        } finally {
          l(!1);
        }
    })();
  }, [
    e,
    t,
    n,
    r,
    i,
    a,
    s.length,
    o,
    l,
    c,
    u,
    p,
    f
  ]), {
    hasLoadedConversationRef: d
  };
}
class uo {
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
      }), o.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([l, c]) => {
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
class ho {
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
    } catch (s) {
      throw this.handleError(s), s;
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
const po = {
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
}, ea = {
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
}, fo = {
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
    if (!ea.isValidWebSocketUrl(e))
      throw new Error(`Invalid WebSocket URL: ${e}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (e) => e.trim().length > 0
}, ta = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...e) => e.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (e, t, n, r, i) => ta.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${e}`,
    t && `chat-wrapper--${t}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    e === "embedded" && i && "chat-wrapper--constrained"
  )
}, na = {
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
  getUserFriendlyErrorMessage: (e) => na.isNetworkError(e) ? "Connection error. Please check your internet connection and try again." : e.message.includes("authentication") || e.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : e.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, dt = {
  state: po,
  url: ea,
  validation: fo,
  css: ta,
  error: na
};
class Qr extends dr {
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
      const s = n.resetKeys || [];
      i.some(
        (l, c) => l !== s[c]
      ) && this.resetErrorBoundary();
    }
  }
  render() {
    const { hasError: n, error: r } = this.state, { children: i, fallback: a } = this.props;
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ h("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: dt.error.getUserFriendlyErrorMessage(r) }),
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
      })() && /* @__PURE__ */ k("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ h("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ h("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : i;
  }
}
class go extends dr {
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
    const { hasError: n, error: r, isRetrying: i } = this.state, { children: a, maxRetries: s = 3 } = this.props;
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || dt.error.isNetworkError(r)) ? /* @__PURE__ */ h("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ k("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ h("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ h("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ k(Gt, { children: [
        this.retryCount < s && /* @__PURE__ */ k(
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
      })() && /* @__PURE__ */ k("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ h("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ h("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
}
class mo extends dr {
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
    const { hasError: n, error: r, failedFiles: i } = this.state, { children: a, allowRetry: s = !0 } = this.props;
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ h("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ k("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ h("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ h("ul", { className: "chat-wrapper__failed-files-list", children: i.map((l, c) => /* @__PURE__ */ h("li", { className: "chat-wrapper__failed-file", children: l }, c)) })
      ] }),
      /* @__PURE__ */ k("div", { className: "chat-wrapper__error-actions", children: [
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
      })() && /* @__PURE__ */ k("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ h("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ h("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
  getFileUploadErrorMessage(n) {
    return n.message.includes("size") || n.message.includes("large") ? "File size is too large. Please try with smaller files." : n.message.includes("type") || n.message.includes("format") ? "File type is not supported. Please try with different file types." : n.message.includes("network") || n.message.includes("connection") ? "Network error during upload. Please check your connection and try again." : n.message.includes("timeout") ? "Upload timed out. Please try again with smaller files or better connection." : "Failed to upload files. Please try again.";
  }
}
function Co({
  isConnected: e,
  isConnecting: t = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 5,
  onRetry: a,
  autoHideDuration: s = 3e3
}) {
  const [o, l] = ae("hidden"), [c, u] = ae(!1);
  if (Ie(() => {
    t ? l("connecting") : !e && !n ? (u(!0), r >= i ? l("error") : l("disconnected")) : n ? l("reconnecting") : e && c ? (l("hidden"), u(!1)) : e && !c && l("hidden");
  }, [e, t, n, r, i, c, s]), o === "hidden")
    return null;
  const p = () => {
    a && a();
  }, d = (() => {
    switch (o) {
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
  return d ? o === "connecting" ? /* @__PURE__ */ h("div", { className: `connection-notification connection-notification--${o}`, children: /* @__PURE__ */ k("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ h("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ h("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ h("div", { className: "connection-notification__bubble" })
  ] }) }) : /* @__PURE__ */ h("div", { className: `connection-notification connection-notification--${o}`, children: /* @__PURE__ */ k("div", { className: "connection-notification__content", children: [
    /* @__PURE__ */ h("div", { className: "connection-notification__icon", children: d.icon }),
    /* @__PURE__ */ h("div", { className: "connection-notification__title", children: d.title }),
    /* @__PURE__ */ h("div", { className: "connection-notification__message", children: d.message }),
    o === "reconnecting" && /* @__PURE__ */ h("div", { className: "connection-notification__actions", children: /* @__PURE__ */ k("button", { className: "connection-notification__retry-btn primary", disabled: !0, children: [
      /* @__PURE__ */ h("span", { className: "connection-notification__spinner" }),
      "Reconnecting..."
    ] }) }),
    (o === "error" || o === "disconnected") && a && /* @__PURE__ */ h("div", { className: "connection-notification__actions", children: /* @__PURE__ */ h(
      "button",
      {
        className: "connection-notification__retry-btn primary",
        onClick: p,
        children: "Try Again"
      }
    ) })
  ] }) }) : null;
}
const yo = ({
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
), wo = ({
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
), So = ({
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
), Eo = ({
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
), ra = ({
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
), To = ({
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
), _o = ({
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
        /* @__PURE__ */ h(yo, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ h("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, ko = ({
  headerName: e,
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
      children: /* @__PURE__ */ h(wo, { size: 20 })
    }
  ) : null, u = () => {
    if ((t === "sidebar" || t === "fullscreen") && !n && s) {
      const d = t === "fullscreen";
      return /* @__PURE__ */ h(
        "button",
        {
          className: d ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: s,
          title: d ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ h(So, { size: 20, isFullscreen: d })
        }
      );
    }
    return null;
  }, p = () => (t === "sidebar" || t === "fullscreen") && !n && o ? /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: o,
      title: "Collapse chat",
      children: /* @__PURE__ */ h(Eo, { size: 20 })
    }
  ) : null;
  return /* @__PURE__ */ k("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ h("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ h("h2", { className: "chat-wrapper__title", children: e }) }),
    /* @__PURE__ */ k("div", { className: "chat-wrapper__header-controls", children: [
      !i || !l ? null : /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__settings-button",
          onClick: l,
          title: "Developer Settings",
          children: /* @__PURE__ */ h(ra, { size: 16 })
        }
      ),
      u(),
      p(),
      c()
    ] })
  ] });
};
function xo(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const bo = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, vo = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Io = {};
function ei(e, t) {
  return (Io.jsx ? vo : bo).test(e);
}
const Ro = /[ \t\n\f\r]/g;
function Ao(e) {
  return typeof e == "object" ? e.type === "text" ? ti(e.value) : !1 : ti(e);
}
function ti(e) {
  return e.replace(Ro, "") === "";
}
class rn {
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
rn.prototype.normal = {};
rn.prototype.property = {};
rn.prototype.space = void 0;
function ia(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new rn(n, r, t);
}
function tr(e) {
  return e.toLowerCase();
}
class ze {
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
ze.prototype.attribute = "";
ze.prototype.booleanish = !1;
ze.prototype.boolean = !1;
ze.prototype.commaOrSpaceSeparated = !1;
ze.prototype.commaSeparated = !1;
ze.prototype.defined = !1;
ze.prototype.mustUseProperty = !1;
ze.prototype.number = !1;
ze.prototype.overloadedBoolean = !1;
ze.prototype.property = "";
ze.prototype.spaceSeparated = !1;
ze.prototype.space = void 0;
let No = 0;
const Y = Pt(), ge = Pt(), nr = Pt(), v = Pt(), oe = Pt(), zt = Pt(), je = Pt();
function Pt() {
  return 2 ** ++No;
}
const rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: Y,
  booleanish: ge,
  commaOrSpaceSeparated: je,
  commaSeparated: zt,
  number: v,
  overloadedBoolean: nr,
  spaceSeparated: oe
}, Symbol.toStringTag, { value: "Module" })), zn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(rr)
);
class pr extends ze {
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
    if (super(t, n), ni(this, "space", i), typeof r == "number")
      for (; ++a < zn.length; ) {
        const s = zn[a];
        ni(this, zn[a], (r & rr[s]) === rr[s]);
      }
  }
}
pr.prototype.defined = !0;
function ni(e, t, n) {
  n && (e[t] = n);
}
function Wt(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new pr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[tr(r)] = r, n[tr(a.attribute)] = r;
  }
  return new rn(t, n, e.space);
}
const aa = Wt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: ge,
    ariaAutoComplete: null,
    ariaBusy: ge,
    ariaChecked: ge,
    ariaColCount: v,
    ariaColIndex: v,
    ariaColSpan: v,
    ariaControls: oe,
    ariaCurrent: null,
    ariaDescribedBy: oe,
    ariaDetails: null,
    ariaDisabled: ge,
    ariaDropEffect: oe,
    ariaErrorMessage: null,
    ariaExpanded: ge,
    ariaFlowTo: oe,
    ariaGrabbed: ge,
    ariaHasPopup: null,
    ariaHidden: ge,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: oe,
    ariaLevel: v,
    ariaLive: null,
    ariaModal: ge,
    ariaMultiLine: ge,
    ariaMultiSelectable: ge,
    ariaOrientation: null,
    ariaOwns: oe,
    ariaPlaceholder: null,
    ariaPosInSet: v,
    ariaPressed: ge,
    ariaReadOnly: ge,
    ariaRelevant: null,
    ariaRequired: ge,
    ariaRoleDescription: oe,
    ariaRowCount: v,
    ariaRowIndex: v,
    ariaRowSpan: v,
    ariaSelected: ge,
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
function sa(e, t) {
  return t in e ? e[t] : t;
}
function oa(e, t) {
  return sa(e, t.toLowerCase());
}
const Mo = Wt({
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
    accept: zt,
    acceptCharset: oe,
    accessKey: oe,
    action: null,
    allow: null,
    allowFullScreen: Y,
    allowPaymentRequest: Y,
    allowUserMedia: Y,
    alt: null,
    as: null,
    async: Y,
    autoCapitalize: null,
    autoComplete: oe,
    autoFocus: Y,
    autoPlay: Y,
    blocking: oe,
    capture: null,
    charSet: null,
    checked: Y,
    cite: null,
    className: oe,
    cols: v,
    colSpan: null,
    content: null,
    contentEditable: ge,
    controls: Y,
    controlsList: oe,
    coords: v | zt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: Y,
    defer: Y,
    dir: null,
    dirName: null,
    disabled: Y,
    download: nr,
    draggable: ge,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: Y,
    formTarget: null,
    headers: oe,
    height: v,
    hidden: nr,
    high: v,
    href: null,
    hrefLang: null,
    htmlFor: oe,
    httpEquiv: oe,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: Y,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: Y,
    itemId: null,
    itemProp: oe,
    itemRef: oe,
    itemScope: Y,
    itemType: oe,
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
    ping: oe,
    placeholder: null,
    playsInline: Y,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: Y,
    referrerPolicy: null,
    rel: oe,
    required: Y,
    reversed: Y,
    rows: v,
    rowSpan: v,
    sandbox: oe,
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
    spellCheck: ge,
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
    value: ge,
    width: v,
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
    scrolling: ge,
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
  transform: oa
}), Lo = Wt({
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
    about: je,
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
    g1: zt,
    g2: zt,
    glyphName: zt,
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
    kernelMatrix: je,
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
    ping: oe,
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
    property: je,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: je,
    rev: je,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: je,
    requiredFeatures: je,
    requiredFonts: je,
    requiredFormats: je,
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
    strokeDashArray: je,
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
    systemLanguage: je,
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
    typeOf: je,
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
  transform: sa
}), la = Wt({
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
}), ca = Wt({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: oa
}), ua = Wt({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), Oo = {
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
}, Do = /[A-Z]/g, ri = /-[a-z]/g, Po = /^data[-\w.:]+$/i;
function Ho(e, t) {
  const n = tr(t);
  let r = t, i = ze;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Po.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(ri, Uo);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!ri.test(a)) {
        let s = a.replace(Do, Fo);
        s.charAt(0) !== "-" && (s = "-" + s), t = "data" + s;
      }
    }
    i = pr;
  }
  return new i(r, t);
}
function Fo(e) {
  return "-" + e.toLowerCase();
}
function Uo(e) {
  return e.charAt(1).toUpperCase();
}
const zo = ia([aa, Mo, la, ca, ua], "html"), fr = ia([aa, Lo, la, ca, ua], "svg");
function Bo(e) {
  return e.join(" ").trim();
}
var _n = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ha(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var gr = {}, ii = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Go = /\n/g, Wo = /^\s*/, Vo = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, jo = /^:\s*/, $o = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Zo = /^[;\s]*/, Ko = /^\s+|\s+$/g, qo = `
`, ai = "/", si = "*", Dt = "", Xo = "comment", Yo = "declaration", Jo = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(w) {
    var y = w.match(Go);
    y && (n += y.length);
    var A = w.lastIndexOf(qo);
    r = ~A ? w.length - A : r + w.length;
  }
  function a() {
    var w = { line: n, column: r };
    return function(y) {
      return y.position = new s(w), c(), y;
    };
  }
  function s(w) {
    this.start = w, this.end = { line: n, column: r }, this.source = t.source;
  }
  s.prototype.content = e;
  function o(w) {
    var y = new Error(
      t.source + ":" + n + ":" + r + ": " + w
    );
    if (y.reason = w, y.filename = t.source, y.line = n, y.column = r, y.source = e, !t.silent) throw y;
  }
  function l(w) {
    var y = w.exec(e);
    if (y) {
      var A = y[0];
      return i(A), e = e.slice(A.length), y;
    }
  }
  function c() {
    l(Wo);
  }
  function u(w) {
    var y;
    for (w = w || []; y = p(); )
      y !== !1 && w.push(y);
    return w;
  }
  function p() {
    var w = a();
    if (!(ai != e.charAt(0) || si != e.charAt(1))) {
      for (var y = 2; Dt != e.charAt(y) && (si != e.charAt(y) || ai != e.charAt(y + 1)); )
        ++y;
      if (y += 2, Dt === e.charAt(y - 1))
        return o("End of comment missing");
      var A = e.slice(2, y - 2);
      return r += 2, i(A), e = e.slice(y), r += 2, w({
        type: Xo,
        comment: A
      });
    }
  }
  function f() {
    var w = a(), y = l(Vo);
    if (y) {
      if (p(), !l(jo)) return o("property missing ':'");
      var A = l($o), S = w({
        type: Yo,
        property: oi(y[0].replace(ii, Dt)),
        value: A ? oi(A[0].replace(ii, Dt)) : Dt
      });
      return l(Zo), S;
    }
  }
  function d() {
    var w = [];
    u(w);
    for (var y; y = f(); )
      y !== !1 && (w.push(y), u(w));
    return w;
  }
  return c(), d();
};
function oi(e) {
  return e ? e.replace(Ko, Dt) : Dt;
}
var Qo = _n && _n.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.default = tl;
var el = Qo(Jo);
function tl(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, el.default)(e), i = typeof t == "function";
  return r.forEach(function(a) {
    if (a.type === "declaration") {
      var s = a.property, o = a.value;
      i ? t(s, o, a) : o && (n = n || {}, n[s] = o);
    }
  }), n;
}
var vn = {};
Object.defineProperty(vn, "__esModule", { value: !0 });
vn.camelCase = void 0;
var nl = /^--[a-zA-Z0-9_-]+$/, rl = /-([a-z])/g, il = /^[^-]+$/, al = /^-(webkit|moz|ms|o|khtml)-/, sl = /^-(ms)-/, ol = function(e) {
  return !e || il.test(e) || nl.test(e);
}, ll = function(e, t) {
  return t.toUpperCase();
}, li = function(e, t) {
  return "".concat(t, "-");
}, cl = function(e, t) {
  return t === void 0 && (t = {}), ol(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(sl, li) : e = e.replace(al, li), e.replace(rl, ll));
};
vn.camelCase = cl;
var ul = _n && _n.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, hl = ul(gr), dl = vn;
function ir(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, hl.default)(e, function(r, i) {
    r && i && (n[(0, dl.camelCase)(r, t)] = i);
  }), n;
}
ir.default = ir;
var pl = ir;
const fl = /* @__PURE__ */ ha(pl), da = pa("end"), mr = pa("start");
function pa(e) {
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
function gl(e) {
  const t = mr(e), n = da(e);
  if (t && n)
    return { start: t, end: n };
}
function Jt(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? ci(e.position) : "start" in e || "end" in e ? ci(e) : "line" in e || "column" in e ? ar(e) : "";
}
function ar(e) {
  return ui(e && e.line) + ":" + ui(e && e.column);
}
function ci(e) {
  return ar(e && e.start) + "-" + ar(e && e.end);
}
function ui(e) {
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
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = o ? o.line : void 0, this.name = Jt(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = s && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
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
const Cr = {}.hasOwnProperty, ml = /* @__PURE__ */ new Map(), Cl = /[A-Z]/g, yl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), wl = /* @__PURE__ */ new Set(["td", "th"]), fa = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Sl(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Il(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = vl(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? fr : zo,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = ga(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function ga(e, t, n) {
  if (t.type === "element")
    return El(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return Tl(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return kl(e, t, n);
  if (t.type === "mdxjsEsm")
    return _l(e, t);
  if (t.type === "root")
    return xl(e, t, n);
  if (t.type === "text")
    return bl(e, t);
}
function El(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = fr, e.schema = i), e.ancestors.push(t);
  const a = Ca(e, t.tagName, !1), s = Rl(e, t);
  let o = wr(e, t);
  return yl.has(t.tagName) && (o = o.filter(function(l) {
    return typeof l == "string" ? !Ao(l) : !0;
  })), ma(e, s, a, t), yr(s, o), e.ancestors.pop(), e.schema = r, e.create(t, a, s, n);
}
function Tl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  nn(e, t.position);
}
function _l(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  nn(e, t.position);
}
function kl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = fr, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : Ca(e, t.name, !0), s = Al(e, t), o = wr(e, t);
  return ma(e, s, a, t), yr(s, o), e.ancestors.pop(), e.schema = r, e.create(t, a, s, n);
}
function xl(e, t, n) {
  const r = {};
  return yr(r, wr(e, t)), e.create(t, e.Fragment, r, n);
}
function bl(e, t) {
  return t.value;
}
function ma(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function yr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function vl(e, t, n) {
  return r;
  function r(i, a, s, o) {
    const c = Array.isArray(s.children) ? n : t;
    return o ? c(a, s, o) : c(a, s);
  }
}
function Il(e, t) {
  return n;
  function n(r, i, a, s) {
    const o = Array.isArray(a.children), l = mr(r);
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
function Rl(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && Cr.call(t.properties, i)) {
      const a = Nl(e, i, t.properties[i]);
      if (a) {
        const [s, o] = a;
        e.tableCellAlignToStyle && s === "align" && typeof o == "string" && wl.has(t.tagName) ? r = o : n[s] = o;
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
function Al(e, t) {
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
        nn(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const o = r.value.data.estree.body[0];
          o.type, a = e.evaluater.evaluateExpression(o.expression);
        } else
          nn(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function wr(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : ml;
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
    const o = ga(e, a, s);
    o !== void 0 && n.push(o);
  }
  return n;
}
function Nl(e, t, n) {
  const r = Ho(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? xo(n) : Bo(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Ml(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Ll(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Oo[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Ml(e, t) {
  try {
    return fl(t, { reactCompat: !0 });
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
    throw i.file = e.filePath || void 0, i.url = fa + "#cannot-parse-style-attribute", i;
  }
}
function Ca(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let a = -1, s;
    for (; ++a < i.length; ) {
      const o = ei(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
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
    r = ei(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return Cr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  nn(e);
}
function nn(e, t) {
  const n = new Ae(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = fa + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Ll(e) {
  const t = {};
  let n;
  for (n in e)
    Cr.call(e, n) && (t[Ol(n)] = e[n]);
  return t;
}
function Ol(e) {
  let t = e.replace(Cl, Dl);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Dl(e) {
  return "-" + e.toLowerCase();
}
const Bn = {
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
}, Pl = {};
function Hl(e, t) {
  const n = Pl, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return ya(e, r, i);
}
function ya(e, t, n) {
  if (Fl(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return hi(e.children, t, n);
  }
  return Array.isArray(e) ? hi(e, t, n) : "";
}
function hi(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = ya(e[i], t, n);
  return r.join("");
}
function Fl(e) {
  return !!(e && typeof e == "object");
}
const di = document.createElement("i");
function Sr(e) {
  const t = "&" + e + ";";
  di.innerHTML = t;
  const n = di.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function ft(e, t, n, r) {
  const i = e.length;
  let a = 0, s;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    s = Array.from(r), s.unshift(t, n), e.splice(...s);
  else
    for (n && e.splice(t, n); a < r.length; )
      s = r.slice(a, a + 1e4), s.unshift(t, 0), e.splice(...s), a += 1e4, t += 1e4;
}
function qe(e, t) {
  return e.length > 0 ? (ft(e, e.length, 0, t), e) : t;
}
const pi = {}.hasOwnProperty;
function Ul(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    zl(t, e[n]);
  return t;
}
function zl(e, t) {
  let n;
  for (n in t) {
    const i = (pi.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let s;
    if (a)
      for (s in a) {
        pi.call(i, s) || (i[s] = []);
        const o = a[s];
        Bl(
          // @ts-expect-error Looks like a list.
          i[s],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function Bl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  ft(e, 0, 0, r);
}
function wa(e, t) {
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
function Bt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const pt = vt(/[A-Za-z]/), $e = vt(/[\dA-Za-z]/), Gl = vt(/[#-'*+\--9=?A-Z^-~]/);
function sr(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const or = vt(/\d/), Wl = vt(/[\dA-Fa-f]/), Vl = vt(/[!-/:-@[-`{-~]/);
function K(e) {
  return e !== null && e < -2;
}
function Ue(e) {
  return e !== null && (e < 0 || e === 32);
}
function re(e) {
  return e === -2 || e === -1 || e === 32;
}
const jl = vt(new RegExp("\\p{P}|\\p{S}", "u")), $l = vt(/\s/);
function vt(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Vt(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let s = "";
    if (a === 37 && $e(e.charCodeAt(n + 1)) && $e(e.charCodeAt(n + 2)))
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
    return re(l) ? (e.enter(n), o(l)) : t(l);
  }
  function o(l) {
    return re(l) && a++ < i ? (e.consume(l), o) : (e.exit(n), t(l));
  }
}
const Zl = {
  tokenize: Kl
};
function Kl(e) {
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
    return K(o) ? (e.consume(o), e.exit("chunkText"), a) : (e.consume(o), s);
  }
}
const ql = {
  tokenize: Xl
}, fi = {
  tokenize: Yl
};
function Xl(e) {
  const t = this, n = [];
  let r = 0, i, a, s;
  return o;
  function o(L) {
    if (r < n.length) {
      const P = n[r];
      return t.containerState = P[1], e.attempt(P[0].continuation, l, c)(L);
    }
    return c(L);
  }
  function l(L) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && _();
      const P = t.events.length;
      let N = P, T;
      for (; N--; )
        if (t.events[N][0] === "exit" && t.events[N][1].type === "chunkFlow") {
          T = t.events[N][1].end;
          break;
        }
      S(r);
      let U = P;
      for (; U < t.events.length; )
        t.events[U][1].end = {
          ...T
        }, U++;
      return ft(t.events, N + 1, 0, t.events.slice(P)), t.events.length = U, c(L);
    }
    return o(L);
  }
  function c(L) {
    if (r === n.length) {
      if (!i)
        return f(L);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return w(L);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(fi, u, p)(L);
  }
  function u(L) {
    return i && _(), S(r), f(L);
  }
  function p(L) {
    return t.parser.lazy[t.now().line] = r !== n.length, s = t.now().offset, w(L);
  }
  function f(L) {
    return t.containerState = {}, e.attempt(fi, d, w)(L);
  }
  function d(L) {
    return r++, n.push([t.currentConstruct, t.containerState]), f(L);
  }
  function w(L) {
    if (L === null) {
      i && _(), S(0), e.consume(L);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: a
    }), y(L);
  }
  function y(L) {
    if (L === null) {
      A(e.exit("chunkFlow"), !0), S(0), e.consume(L);
      return;
    }
    return K(L) ? (e.consume(L), A(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, o) : (e.consume(L), y);
  }
  function A(L, P) {
    const N = t.sliceStream(L);
    if (P && N.push(null), L.previous = a, a && (a.next = L), a = L, i.defineSkip(L.start), i.write(N), t.parser.lazy[L.start.line]) {
      let T = i.events.length;
      for (; T--; )
        if (
          // The token starts before the line ending…
          i.events[T][1].start.offset < s && // …and either is not ended yet…
          (!i.events[T][1].end || // …or ends after it.
          i.events[T][1].end.offset > s)
        )
          return;
      const U = t.events.length;
      let D = U, H, z;
      for (; D--; )
        if (t.events[D][0] === "exit" && t.events[D][1].type === "chunkFlow") {
          if (H) {
            z = t.events[D][1].end;
            break;
          }
          H = !0;
        }
      for (S(r), T = U; T < t.events.length; )
        t.events[T][1].end = {
          ...z
        }, T++;
      ft(t.events, D + 1, 0, t.events.slice(U)), t.events.length = T;
    }
  }
  function S(L) {
    let P = n.length;
    for (; P-- > L; ) {
      const N = n[P];
      t.containerState = N[1], N[0].exit.call(t, e);
    }
    n.length = L;
  }
  function _() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Yl(e, t, n) {
  return le(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function gi(e) {
  if (e === null || Ue(e) || $l(e))
    return 1;
  if (jl(e))
    return 2;
}
function Er(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const lr = {
  name: "attention",
  resolveAll: Jl,
  tokenize: Ql
};
function Jl(e, t) {
  let n = -1, r, i, a, s, o, l, c, u;
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
          }, f = {
            ...e[n][1].start
          };
          mi(p, -l), mi(f, l), s = {
            type: l > 1 ? "strongSequence" : "emphasisSequence",
            start: p,
            end: {
              ...e[r][1].end
            }
          }, o = {
            type: l > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: f
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
          }, c = [], e[r][1].end.offset - e[r][1].start.offset && (c = qe(c, [["enter", e[r][1], t], ["exit", e[r][1], t]])), c = qe(c, [["enter", i, t], ["enter", s, t], ["exit", s, t], ["enter", a, t]]), c = qe(c, Er(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), c = qe(c, [["exit", a, t], ["enter", o, t], ["exit", o, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, c = qe(c, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : u = 0, ft(e, r - 1, n - r + 3, c), n = r + c.length - u - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Ql(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = gi(r);
  let a;
  return s;
  function s(l) {
    return a = l, e.enter("attentionSequence"), o(l);
  }
  function o(l) {
    if (l === a)
      return e.consume(l), o;
    const c = e.exit("attentionSequence"), u = gi(l), p = !u || u === 2 && i || n.includes(l), f = !i || i === 2 && u || n.includes(r);
    return c._open = !!(a === 42 ? p : p && (i || !f)), c._close = !!(a === 42 ? f : f && (u || !p)), t(l);
  }
}
function mi(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const ec = {
  name: "autolink",
  tokenize: tc
};
function tc(e, t, n) {
  let r = 0;
  return i;
  function i(d) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(d) {
    return pt(d) ? (e.consume(d), s) : d === 64 ? n(d) : c(d);
  }
  function s(d) {
    return d === 43 || d === 45 || d === 46 || $e(d) ? (r = 1, o(d)) : c(d);
  }
  function o(d) {
    return d === 58 ? (e.consume(d), r = 0, l) : (d === 43 || d === 45 || d === 46 || $e(d)) && r++ < 32 ? (e.consume(d), o) : (r = 0, c(d));
  }
  function l(d) {
    return d === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.exit("autolink"), t) : d === null || d === 32 || d === 60 || sr(d) ? n(d) : (e.consume(d), l);
  }
  function c(d) {
    return d === 64 ? (e.consume(d), u) : Gl(d) ? (e.consume(d), c) : n(d);
  }
  function u(d) {
    return $e(d) ? p(d) : n(d);
  }
  function p(d) {
    return d === 46 ? (e.consume(d), r = 0, u) : d === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.exit("autolink"), t) : f(d);
  }
  function f(d) {
    if ((d === 45 || $e(d)) && r++ < 63) {
      const w = d === 45 ? f : p;
      return e.consume(d), w;
    }
    return n(d);
  }
}
const In = {
  partial: !0,
  tokenize: nc
};
function nc(e, t, n) {
  return r;
  function r(a) {
    return re(a) ? le(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || K(a) ? t(a) : n(a);
  }
}
const Sa = {
  continuation: {
    tokenize: ic
  },
  exit: ac,
  name: "blockQuote",
  tokenize: rc
};
function rc(e, t, n) {
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
    return re(s) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(s), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(s));
  }
}
function ic(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return re(s) ? le(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s) : a(s);
  }
  function a(s) {
    return e.attempt(Sa, t, n)(s);
  }
}
function ac(e) {
  e.exit("blockQuote");
}
const Ea = {
  name: "characterEscape",
  tokenize: sc
};
function sc(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return Vl(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const Ta = {
  name: "characterReference",
  tokenize: oc
};
function oc(e, t, n) {
  const r = this;
  let i = 0, a, s;
  return o;
  function o(p) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), l;
  }
  function l(p) {
    return p === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(p), e.exit("characterReferenceMarkerNumeric"), c) : (e.enter("characterReferenceValue"), a = 31, s = $e, u(p));
  }
  function c(p) {
    return p === 88 || p === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(p), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, s = Wl, u) : (e.enter("characterReferenceValue"), a = 7, s = or, u(p));
  }
  function u(p) {
    if (p === 59 && i) {
      const f = e.exit("characterReferenceValue");
      return s === $e && !Sr(r.sliceSerialize(f)) ? n(p) : (e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return s(p) && i++ < a ? (e.consume(p), u) : n(p);
  }
}
const Ci = {
  partial: !0,
  tokenize: cc
}, yi = {
  concrete: !0,
  name: "codeFenced",
  tokenize: lc
};
function lc(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: N
  };
  let a = 0, s = 0, o;
  return l;
  function l(T) {
    return c(T);
  }
  function c(T) {
    const U = r.events[r.events.length - 1];
    return a = U && U[1].type === "linePrefix" ? U[2].sliceSerialize(U[1], !0).length : 0, o = T, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(T);
  }
  function u(T) {
    return T === o ? (s++, e.consume(T), u) : s < 3 ? n(T) : (e.exit("codeFencedFenceSequence"), re(T) ? le(e, p, "whitespace")(T) : p(T));
  }
  function p(T) {
    return T === null || K(T) ? (e.exit("codeFencedFence"), r.interrupt ? t(T) : e.check(Ci, y, P)(T)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), f(T));
  }
  function f(T) {
    return T === null || K(T) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), p(T)) : re(T) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), le(e, d, "whitespace")(T)) : T === 96 && T === o ? n(T) : (e.consume(T), f);
  }
  function d(T) {
    return T === null || K(T) ? p(T) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), w(T));
  }
  function w(T) {
    return T === null || K(T) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), p(T)) : T === 96 && T === o ? n(T) : (e.consume(T), w);
  }
  function y(T) {
    return e.attempt(i, P, A)(T);
  }
  function A(T) {
    return e.enter("lineEnding"), e.consume(T), e.exit("lineEnding"), S;
  }
  function S(T) {
    return a > 0 && re(T) ? le(e, _, "linePrefix", a + 1)(T) : _(T);
  }
  function _(T) {
    return T === null || K(T) ? e.check(Ci, y, P)(T) : (e.enter("codeFlowValue"), L(T));
  }
  function L(T) {
    return T === null || K(T) ? (e.exit("codeFlowValue"), _(T)) : (e.consume(T), L);
  }
  function P(T) {
    return e.exit("codeFenced"), t(T);
  }
  function N(T, U, D) {
    let H = 0;
    return z;
    function z(W) {
      return T.enter("lineEnding"), T.consume(W), T.exit("lineEnding"), b;
    }
    function b(W) {
      return T.enter("codeFencedFence"), re(W) ? le(T, M, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(W) : M(W);
    }
    function M(W) {
      return W === o ? (T.enter("codeFencedFenceSequence"), V(W)) : D(W);
    }
    function V(W) {
      return W === o ? (H++, T.consume(W), V) : H >= s ? (T.exit("codeFencedFenceSequence"), re(W) ? le(T, q, "whitespace")(W) : q(W)) : D(W);
    }
    function q(W) {
      return W === null || K(W) ? (T.exit("codeFencedFence"), U(W)) : D(W);
    }
  }
}
function cc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return s === null ? n(s) : (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), a);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
const Gn = {
  name: "codeIndented",
  tokenize: hc
}, uc = {
  partial: !0,
  tokenize: dc
};
function hc(e, t, n) {
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
    return c === null ? l(c) : K(c) ? e.attempt(uc, s, l)(c) : (e.enter("codeFlowValue"), o(c));
  }
  function o(c) {
    return c === null || K(c) ? (e.exit("codeFlowValue"), s(c)) : (e.consume(c), o);
  }
  function l(c) {
    return e.exit("codeIndented"), t(c);
  }
}
function dc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line] ? n(s) : K(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), i) : le(e, a, "linePrefix", 5)(s);
  }
  function a(s) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(s) : K(s) ? i(s) : n(s);
  }
}
const pc = {
  name: "codeText",
  previous: gc,
  resolve: fc,
  tokenize: mc
};
function fc(e) {
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
function gc(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function mc(e, t, n) {
  let r = 0, i, a;
  return s;
  function s(p) {
    return e.enter("codeText"), e.enter("codeTextSequence"), o(p);
  }
  function o(p) {
    return p === 96 ? (e.consume(p), r++, o) : (e.exit("codeTextSequence"), l(p));
  }
  function l(p) {
    return p === null ? n(p) : p === 32 ? (e.enter("space"), e.consume(p), e.exit("space"), l) : p === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(p)) : K(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), l) : (e.enter("codeTextData"), c(p));
  }
  function c(p) {
    return p === null || p === 32 || p === 96 || K(p) ? (e.exit("codeTextData"), l(p)) : (e.consume(p), c);
  }
  function u(p) {
    return p === 96 ? (e.consume(p), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(p)) : (a.type = "codeTextData", c(p));
  }
}
class Cc {
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
    return r && Xt(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Xt(this.left, t);
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
    this.setCursor(0), Xt(this.right, t.reverse());
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
        Xt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Xt(this.left, n.reverse());
      }
  }
}
function Xt(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function _a(e) {
  const t = {};
  let n = -1, r, i, a, s, o, l, c;
  const u = new Cc(e);
  for (; ++n < u.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (l = r[1]._tokenizer.events, a = 0, a < l.length && l[a][1].type === "lineEndingBlank" && (a += 2), a < l.length && l[a][1].type === "content"))
      for (; ++a < l.length && l[a][1].type !== "content"; )
        l[a][1].type === "chunkText" && (l[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, yc(u, n)), n = t[n], c = !0);
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
  return ft(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !c;
}
function yc(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let s = n._tokenizer;
  s || (s = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  const o = s.events, l = [], c = {};
  let u, p, f = -1, d = n, w = 0, y = 0;
  const A = [y];
  for (; d; ) {
    for (; e.get(++i)[1] !== d; )
      ;
    a.push(i), d._tokenizer || (u = r.sliceStream(d), d.next || u.push(null), p && s.defineSkip(d.start), d._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0), s.write(u), d._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)), p = d, d = d.next;
  }
  for (d = n; ++f < o.length; )
    // Find a void token that includes a break.
    o[f][0] === "exit" && o[f - 1][0] === "enter" && o[f][1].type === o[f - 1][1].type && o[f][1].start.line !== o[f][1].end.line && (y = f + 1, A.push(y), d._tokenizer = void 0, d.previous = void 0, d = d.next);
  for (s.events = [], d ? (d._tokenizer = void 0, d.previous = void 0) : A.pop(), f = A.length; f--; ) {
    const S = o.slice(A[f], A[f + 1]), _ = a.pop();
    l.push([_, _ + S.length - 1]), e.splice(_, 2, S);
  }
  for (l.reverse(), f = -1; ++f < l.length; )
    c[w + l[f][0]] = w + l[f][1], w += l[f][1] - l[f][0] - 1;
  return c;
}
const wc = {
  resolve: Ec,
  tokenize: Tc
}, Sc = {
  partial: !0,
  tokenize: _c
};
function Ec(e) {
  return _a(e), e;
}
function Tc(e, t) {
  let n;
  return r;
  function r(o) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(o);
  }
  function i(o) {
    return o === null ? a(o) : K(o) ? e.check(Sc, s, a)(o) : (e.consume(o), i);
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
function _c(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), le(e, a, "linePrefix");
  }
  function a(s) {
    if (s === null || K(s))
      return n(s);
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(s) : e.interrupt(r.parser.constructs.flow, n, t)(s);
  }
}
function ka(e, t, n, r, i, a, s, o, l) {
  const c = l || Number.POSITIVE_INFINITY;
  let u = 0;
  return p;
  function p(S) {
    return S === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(S), e.exit(a), f) : S === null || S === 32 || S === 41 || sr(S) ? n(S) : (e.enter(r), e.enter(s), e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), y(S));
  }
  function f(S) {
    return S === 62 ? (e.enter(a), e.consume(S), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), d(S));
  }
  function d(S) {
    return S === 62 ? (e.exit("chunkString"), e.exit(o), f(S)) : S === null || S === 60 || K(S) ? n(S) : (e.consume(S), S === 92 ? w : d);
  }
  function w(S) {
    return S === 60 || S === 62 || S === 92 ? (e.consume(S), d) : d(S);
  }
  function y(S) {
    return !u && (S === null || S === 41 || Ue(S)) ? (e.exit("chunkString"), e.exit(o), e.exit(s), e.exit(r), t(S)) : u < c && S === 40 ? (e.consume(S), u++, y) : S === 41 ? (e.consume(S), u--, y) : S === null || S === 32 || S === 40 || sr(S) ? n(S) : (e.consume(S), S === 92 ? A : y);
  }
  function A(S) {
    return S === 40 || S === 41 || S === 92 ? (e.consume(S), y) : y(S);
  }
}
function xa(e, t, n, r, i, a) {
  const s = this;
  let o = 0, l;
  return c;
  function c(d) {
    return e.enter(r), e.enter(i), e.consume(d), e.exit(i), e.enter(a), u;
  }
  function u(d) {
    return o > 999 || d === null || d === 91 || d === 93 && !l || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    d === 94 && !o && "_hiddenFootnoteSupport" in s.parser.constructs ? n(d) : d === 93 ? (e.exit(a), e.enter(i), e.consume(d), e.exit(i), e.exit(r), t) : K(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), p(d));
  }
  function p(d) {
    return d === null || d === 91 || d === 93 || K(d) || o++ > 999 ? (e.exit("chunkString"), u(d)) : (e.consume(d), l || (l = !re(d)), d === 92 ? f : p);
  }
  function f(d) {
    return d === 91 || d === 92 || d === 93 ? (e.consume(d), o++, p) : p(d);
  }
}
function ba(e, t, n, r, i, a) {
  let s;
  return o;
  function o(f) {
    return f === 34 || f === 39 || f === 40 ? (e.enter(r), e.enter(i), e.consume(f), e.exit(i), s = f === 40 ? 41 : f, l) : n(f);
  }
  function l(f) {
    return f === s ? (e.enter(i), e.consume(f), e.exit(i), e.exit(r), t) : (e.enter(a), c(f));
  }
  function c(f) {
    return f === s ? (e.exit(a), l(s)) : f === null ? n(f) : K(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), le(e, c, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), u(f));
  }
  function u(f) {
    return f === s || f === null || K(f) ? (e.exit("chunkString"), c(f)) : (e.consume(f), f === 92 ? p : u);
  }
  function p(f) {
    return f === s || f === 92 ? (e.consume(f), u) : u(f);
  }
}
function Qt(e, t) {
  let n;
  return r;
  function r(i) {
    return K(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : re(i) ? le(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const kc = {
  name: "definition",
  tokenize: bc
}, xc = {
  partial: !0,
  tokenize: vc
};
function bc(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(d) {
    return e.enter("definition"), s(d);
  }
  function s(d) {
    return xa.call(
      r,
      e,
      o,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(d);
  }
  function o(d) {
    return i = Bt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), d === 58 ? (e.enter("definitionMarker"), e.consume(d), e.exit("definitionMarker"), l) : n(d);
  }
  function l(d) {
    return Ue(d) ? Qt(e, c)(d) : c(d);
  }
  function c(d) {
    return ka(
      e,
      u,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(d);
  }
  function u(d) {
    return e.attempt(xc, p, p)(d);
  }
  function p(d) {
    return re(d) ? le(e, f, "whitespace")(d) : f(d);
  }
  function f(d) {
    return d === null || K(d) ? (e.exit("definition"), r.parser.defined.push(i), t(d)) : n(d);
  }
}
function vc(e, t, n) {
  return r;
  function r(o) {
    return Ue(o) ? Qt(e, i)(o) : n(o);
  }
  function i(o) {
    return ba(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
  }
  function a(o) {
    return re(o) ? le(e, s, "whitespace")(o) : s(o);
  }
  function s(o) {
    return o === null || K(o) ? t(o) : n(o);
  }
}
const Ic = {
  name: "hardBreakEscape",
  tokenize: Rc
};
function Rc(e, t, n) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), i;
  }
  function i(a) {
    return K(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
  }
}
const Ac = {
  name: "headingAtx",
  resolve: Nc,
  tokenize: Mc
};
function Nc(e, t) {
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
function Mc(e, t, n) {
  let r = 0;
  return i;
  function i(u) {
    return e.enter("atxHeading"), a(u);
  }
  function a(u) {
    return e.enter("atxHeadingSequence"), s(u);
  }
  function s(u) {
    return u === 35 && r++ < 6 ? (e.consume(u), s) : u === null || Ue(u) ? (e.exit("atxHeadingSequence"), o(u)) : n(u);
  }
  function o(u) {
    return u === 35 ? (e.enter("atxHeadingSequence"), l(u)) : u === null || K(u) ? (e.exit("atxHeading"), t(u)) : re(u) ? le(e, o, "whitespace")(u) : (e.enter("atxHeadingText"), c(u));
  }
  function l(u) {
    return u === 35 ? (e.consume(u), l) : (e.exit("atxHeadingSequence"), o(u));
  }
  function c(u) {
    return u === null || u === 35 || Ue(u) ? (e.exit("atxHeadingText"), o(u)) : (e.consume(u), c);
  }
}
const Lc = [
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
], wi = ["pre", "script", "style", "textarea"], Oc = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Hc,
  tokenize: Fc
}, Dc = {
  partial: !0,
  tokenize: zc
}, Pc = {
  partial: !0,
  tokenize: Uc
};
function Hc(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Fc(e, t, n) {
  const r = this;
  let i, a, s, o, l;
  return c;
  function c(g) {
    return u(g);
  }
  function u(g) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(g), p;
  }
  function p(g) {
    return g === 33 ? (e.consume(g), f) : g === 47 ? (e.consume(g), a = !0, y) : g === 63 ? (e.consume(g), i = 3, r.interrupt ? t : m) : pt(g) ? (e.consume(g), s = String.fromCharCode(g), A) : n(g);
  }
  function f(g) {
    return g === 45 ? (e.consume(g), i = 2, d) : g === 91 ? (e.consume(g), i = 5, o = 0, w) : pt(g) ? (e.consume(g), i = 4, r.interrupt ? t : m) : n(g);
  }
  function d(g) {
    return g === 45 ? (e.consume(g), r.interrupt ? t : m) : n(g);
  }
  function w(g) {
    const ye = "CDATA[";
    return g === ye.charCodeAt(o++) ? (e.consume(g), o === ye.length ? r.interrupt ? t : M : w) : n(g);
  }
  function y(g) {
    return pt(g) ? (e.consume(g), s = String.fromCharCode(g), A) : n(g);
  }
  function A(g) {
    if (g === null || g === 47 || g === 62 || Ue(g)) {
      const ye = g === 47, te = s.toLowerCase();
      return !ye && !a && wi.includes(te) ? (i = 1, r.interrupt ? t(g) : M(g)) : Lc.includes(s.toLowerCase()) ? (i = 6, ye ? (e.consume(g), S) : r.interrupt ? t(g) : M(g)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(g) : a ? _(g) : L(g));
    }
    return g === 45 || $e(g) ? (e.consume(g), s += String.fromCharCode(g), A) : n(g);
  }
  function S(g) {
    return g === 62 ? (e.consume(g), r.interrupt ? t : M) : n(g);
  }
  function _(g) {
    return re(g) ? (e.consume(g), _) : z(g);
  }
  function L(g) {
    return g === 47 ? (e.consume(g), z) : g === 58 || g === 95 || pt(g) ? (e.consume(g), P) : re(g) ? (e.consume(g), L) : z(g);
  }
  function P(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || $e(g) ? (e.consume(g), P) : N(g);
  }
  function N(g) {
    return g === 61 ? (e.consume(g), T) : re(g) ? (e.consume(g), N) : L(g);
  }
  function T(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), l = g, U) : re(g) ? (e.consume(g), T) : D(g);
  }
  function U(g) {
    return g === l ? (e.consume(g), l = null, H) : g === null || K(g) ? n(g) : (e.consume(g), U);
  }
  function D(g) {
    return g === null || g === 34 || g === 39 || g === 47 || g === 60 || g === 61 || g === 62 || g === 96 || Ue(g) ? N(g) : (e.consume(g), D);
  }
  function H(g) {
    return g === 47 || g === 62 || re(g) ? L(g) : n(g);
  }
  function z(g) {
    return g === 62 ? (e.consume(g), b) : n(g);
  }
  function b(g) {
    return g === null || K(g) ? M(g) : re(g) ? (e.consume(g), b) : n(g);
  }
  function M(g) {
    return g === 45 && i === 2 ? (e.consume(g), ie) : g === 60 && i === 1 ? (e.consume(g), O) : g === 62 && i === 4 ? (e.consume(g), ee) : g === 63 && i === 3 ? (e.consume(g), m) : g === 93 && i === 5 ? (e.consume(g), _e) : K(g) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Dc, ke, V)(g)) : g === null || K(g) ? (e.exit("htmlFlowData"), V(g)) : (e.consume(g), M);
  }
  function V(g) {
    return e.check(Pc, q, ke)(g);
  }
  function q(g) {
    return e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), W;
  }
  function W(g) {
    return g === null || K(g) ? V(g) : (e.enter("htmlFlowData"), M(g));
  }
  function ie(g) {
    return g === 45 ? (e.consume(g), m) : M(g);
  }
  function O(g) {
    return g === 47 ? (e.consume(g), s = "", ue) : M(g);
  }
  function ue(g) {
    if (g === 62) {
      const ye = s.toLowerCase();
      return wi.includes(ye) ? (e.consume(g), ee) : M(g);
    }
    return pt(g) && s.length < 8 ? (e.consume(g), s += String.fromCharCode(g), ue) : M(g);
  }
  function _e(g) {
    return g === 93 ? (e.consume(g), m) : M(g);
  }
  function m(g) {
    return g === 62 ? (e.consume(g), ee) : g === 45 && i === 2 ? (e.consume(g), m) : M(g);
  }
  function ee(g) {
    return g === null || K(g) ? (e.exit("htmlFlowData"), ke(g)) : (e.consume(g), ee);
  }
  function ke(g) {
    return e.exit("htmlFlow"), t(g);
  }
}
function Uc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return K(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), a) : n(s);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
function zc(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(In, t, n);
  }
}
const Bc = {
  name: "htmlText",
  tokenize: Gc
};
function Gc(e, t, n) {
  const r = this;
  let i, a, s;
  return o;
  function o(m) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(m), l;
  }
  function l(m) {
    return m === 33 ? (e.consume(m), c) : m === 47 ? (e.consume(m), N) : m === 63 ? (e.consume(m), L) : pt(m) ? (e.consume(m), D) : n(m);
  }
  function c(m) {
    return m === 45 ? (e.consume(m), u) : m === 91 ? (e.consume(m), a = 0, w) : pt(m) ? (e.consume(m), _) : n(m);
  }
  function u(m) {
    return m === 45 ? (e.consume(m), d) : n(m);
  }
  function p(m) {
    return m === null ? n(m) : m === 45 ? (e.consume(m), f) : K(m) ? (s = p, O(m)) : (e.consume(m), p);
  }
  function f(m) {
    return m === 45 ? (e.consume(m), d) : p(m);
  }
  function d(m) {
    return m === 62 ? ie(m) : m === 45 ? f(m) : p(m);
  }
  function w(m) {
    const ee = "CDATA[";
    return m === ee.charCodeAt(a++) ? (e.consume(m), a === ee.length ? y : w) : n(m);
  }
  function y(m) {
    return m === null ? n(m) : m === 93 ? (e.consume(m), A) : K(m) ? (s = y, O(m)) : (e.consume(m), y);
  }
  function A(m) {
    return m === 93 ? (e.consume(m), S) : y(m);
  }
  function S(m) {
    return m === 62 ? ie(m) : m === 93 ? (e.consume(m), S) : y(m);
  }
  function _(m) {
    return m === null || m === 62 ? ie(m) : K(m) ? (s = _, O(m)) : (e.consume(m), _);
  }
  function L(m) {
    return m === null ? n(m) : m === 63 ? (e.consume(m), P) : K(m) ? (s = L, O(m)) : (e.consume(m), L);
  }
  function P(m) {
    return m === 62 ? ie(m) : L(m);
  }
  function N(m) {
    return pt(m) ? (e.consume(m), T) : n(m);
  }
  function T(m) {
    return m === 45 || $e(m) ? (e.consume(m), T) : U(m);
  }
  function U(m) {
    return K(m) ? (s = U, O(m)) : re(m) ? (e.consume(m), U) : ie(m);
  }
  function D(m) {
    return m === 45 || $e(m) ? (e.consume(m), D) : m === 47 || m === 62 || Ue(m) ? H(m) : n(m);
  }
  function H(m) {
    return m === 47 ? (e.consume(m), ie) : m === 58 || m === 95 || pt(m) ? (e.consume(m), z) : K(m) ? (s = H, O(m)) : re(m) ? (e.consume(m), H) : ie(m);
  }
  function z(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || $e(m) ? (e.consume(m), z) : b(m);
  }
  function b(m) {
    return m === 61 ? (e.consume(m), M) : K(m) ? (s = b, O(m)) : re(m) ? (e.consume(m), b) : H(m);
  }
  function M(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (e.consume(m), i = m, V) : K(m) ? (s = M, O(m)) : re(m) ? (e.consume(m), M) : (e.consume(m), q);
  }
  function V(m) {
    return m === i ? (e.consume(m), i = void 0, W) : m === null ? n(m) : K(m) ? (s = V, O(m)) : (e.consume(m), V);
  }
  function q(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96 ? n(m) : m === 47 || m === 62 || Ue(m) ? H(m) : (e.consume(m), q);
  }
  function W(m) {
    return m === 47 || m === 62 || Ue(m) ? H(m) : n(m);
  }
  function ie(m) {
    return m === 62 ? (e.consume(m), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(m);
  }
  function O(m) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), ue;
  }
  function ue(m) {
    return re(m) ? le(e, _e, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m) : _e(m);
  }
  function _e(m) {
    return e.enter("htmlTextData"), s(m);
  }
}
const Tr = {
  name: "labelEnd",
  resolveAll: $c,
  resolveTo: Zc,
  tokenize: Kc
}, Wc = {
  tokenize: qc
}, Vc = {
  tokenize: Xc
}, jc = {
  tokenize: Yc
};
function $c(e) {
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
function Zc(e, t) {
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
  return o = [["enter", l, t], ["enter", c, t]], o = qe(o, e.slice(a + 1, a + r + 3)), o = qe(o, [["enter", u, t]]), o = qe(o, Er(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, s - 3), t)), o = qe(o, [["exit", u, t], e[s - 2], e[s - 1], ["exit", c, t]]), o = qe(o, e.slice(s + 1)), o = qe(o, [["exit", l, t]]), ft(e, a, e.length, o), e;
}
function Kc(e, t, n) {
  const r = this;
  let i = r.events.length, a, s;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return o;
  function o(f) {
    return a ? a._inactive ? p(f) : (s = r.parser.defined.includes(Bt(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(f), e.exit("labelMarker"), e.exit("labelEnd"), l) : n(f);
  }
  function l(f) {
    return f === 40 ? e.attempt(Wc, u, s ? u : p)(f) : f === 91 ? e.attempt(Vc, u, s ? c : p)(f) : s ? u(f) : p(f);
  }
  function c(f) {
    return e.attempt(jc, u, p)(f);
  }
  function u(f) {
    return t(f);
  }
  function p(f) {
    return a._balanced = !0, n(f);
  }
}
function qc(e, t, n) {
  return r;
  function r(p) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), i;
  }
  function i(p) {
    return Ue(p) ? Qt(e, a)(p) : a(p);
  }
  function a(p) {
    return p === 41 ? u(p) : ka(e, s, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(p);
  }
  function s(p) {
    return Ue(p) ? Qt(e, l)(p) : u(p);
  }
  function o(p) {
    return n(p);
  }
  function l(p) {
    return p === 34 || p === 39 || p === 40 ? ba(e, c, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(p) : u(p);
  }
  function c(p) {
    return Ue(p) ? Qt(e, u)(p) : u(p);
  }
  function u(p) {
    return p === 41 ? (e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), e.exit("resource"), t) : n(p);
  }
}
function Xc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return xa.call(r, e, a, s, "reference", "referenceMarker", "referenceString")(o);
  }
  function a(o) {
    return r.parser.defined.includes(Bt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(o) : n(o);
  }
  function s(o) {
    return n(o);
  }
}
function Yc(e, t, n) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), i;
  }
  function i(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), t) : n(a);
  }
}
const Jc = {
  name: "labelStartImage",
  resolveAll: Tr.resolveAll,
  tokenize: Qc
};
function Qc(e, t, n) {
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
const eu = {
  name: "labelStartLink",
  resolveAll: Tr.resolveAll,
  tokenize: tu
};
function tu(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(s), e.exit("labelMarker"), e.exit("labelLink"), a;
  }
  function a(s) {
    return s === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : t(s);
  }
}
const Wn = {
  name: "lineEnding",
  tokenize: nu
};
function nu(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), le(e, t, "linePrefix");
  }
}
const yn = {
  name: "thematicBreak",
  tokenize: ru
};
function ru(e, t, n) {
  let r = 0, i;
  return a;
  function a(c) {
    return e.enter("thematicBreak"), s(c);
  }
  function s(c) {
    return i = c, o(c);
  }
  function o(c) {
    return c === i ? (e.enter("thematicBreakSequence"), l(c)) : r >= 3 && (c === null || K(c)) ? (e.exit("thematicBreak"), t(c)) : n(c);
  }
  function l(c) {
    return c === i ? (e.consume(c), r++, l) : (e.exit("thematicBreakSequence"), re(c) ? le(e, o, "whitespace")(c) : o(c));
  }
}
const He = {
  continuation: {
    tokenize: ou
  },
  exit: cu,
  name: "list",
  tokenize: su
}, iu = {
  partial: !0,
  tokenize: uu
}, au = {
  partial: !0,
  tokenize: lu
};
function su(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, s = 0;
  return o;
  function o(d) {
    const w = r.containerState.type || (d === 42 || d === 43 || d === 45 ? "listUnordered" : "listOrdered");
    if (w === "listUnordered" ? !r.containerState.marker || d === r.containerState.marker : or(d)) {
      if (r.containerState.type || (r.containerState.type = w, e.enter(w, {
        _container: !0
      })), w === "listUnordered")
        return e.enter("listItemPrefix"), d === 42 || d === 45 ? e.check(yn, n, c)(d) : c(d);
      if (!r.interrupt || d === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), l(d);
    }
    return n(d);
  }
  function l(d) {
    return or(d) && ++s < 10 ? (e.consume(d), l) : (!r.interrupt || s < 2) && (r.containerState.marker ? d === r.containerState.marker : d === 41 || d === 46) ? (e.exit("listItemValue"), c(d)) : n(d);
  }
  function c(d) {
    return e.enter("listItemMarker"), e.consume(d), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || d, e.check(
      In,
      // Can’t be empty when interrupting.
      r.interrupt ? n : u,
      e.attempt(iu, f, p)
    );
  }
  function u(d) {
    return r.containerState.initialBlankLine = !0, a++, f(d);
  }
  function p(d) {
    return re(d) ? (e.enter("listItemPrefixWhitespace"), e.consume(d), e.exit("listItemPrefixWhitespace"), f) : n(d);
  }
  function f(d) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(d);
  }
}
function ou(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(In, i, a);
  function i(o) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, le(e, t, "listItemIndent", r.containerState.size + 1)(o);
  }
  function a(o) {
    return r.containerState.furtherBlankLines || !re(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(au, t, s)(o));
  }
  function s(o) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, le(e, e.attempt(He, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
  }
}
function lu(e, t, n) {
  const r = this;
  return le(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "listItemIndent" && s[2].sliceSerialize(s[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function cu(e) {
  e.exit(this.containerState.type);
}
function uu(e, t, n) {
  const r = this;
  return le(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const s = r.events[r.events.length - 1];
    return !re(a) && s && s[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const Si = {
  name: "setextUnderline",
  resolveTo: hu,
  tokenize: du
};
function hu(e, t) {
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
function du(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(c) {
    let u = r.events.length, p;
    for (; u--; )
      if (r.events[u][1].type !== "lineEnding" && r.events[u][1].type !== "linePrefix" && r.events[u][1].type !== "content") {
        p = r.events[u][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || p) ? (e.enter("setextHeadingLine"), i = c, s(c)) : n(c);
  }
  function s(c) {
    return e.enter("setextHeadingLineSequence"), o(c);
  }
  function o(c) {
    return c === i ? (e.consume(c), o) : (e.exit("setextHeadingLineSequence"), re(c) ? le(e, l, "lineSuffix")(c) : l(c));
  }
  function l(c) {
    return c === null || K(c) ? (e.exit("setextHeadingLine"), t(c)) : n(c);
  }
}
const pu = {
  tokenize: fu
};
function fu(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    In,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, le(e, e.attempt(this.parser.constructs.flow, i, e.attempt(wc, i)), "linePrefix"))
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
const gu = {
  resolveAll: Ia()
}, mu = va("string"), Cu = va("text");
function va(e) {
  return {
    resolveAll: Ia(e === "text" ? yu : void 0),
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
      const p = i[u];
      let f = -1;
      if (p)
        for (; ++f < p.length; ) {
          const d = p[f];
          if (!d.previous || d.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Ia(e) {
  return t;
  function t(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === "data" && (a = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function yu(e, t) {
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
const wu = {
  42: He,
  43: He,
  45: He,
  48: He,
  49: He,
  50: He,
  51: He,
  52: He,
  53: He,
  54: He,
  55: He,
  56: He,
  57: He,
  62: Sa
}, Su = {
  91: kc
}, Eu = {
  [-2]: Gn,
  [-1]: Gn,
  32: Gn
}, Tu = {
  35: Ac,
  42: yn,
  45: [Si, yn],
  60: Oc,
  61: Si,
  95: yn,
  96: yi,
  126: yi
}, _u = {
  38: Ta,
  92: Ea
}, ku = {
  [-5]: Wn,
  [-4]: Wn,
  [-3]: Wn,
  33: Jc,
  38: Ta,
  42: lr,
  60: [ec, Bc],
  91: eu,
  92: [Ic, Ea],
  93: Tr,
  95: lr,
  96: pc
}, xu = {
  null: [lr, gu]
}, bu = {
  null: [42, 95]
}, vu = {
  null: []
}, Iu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: bu,
  contentInitial: Su,
  disable: vu,
  document: wu,
  flow: Tu,
  flowInitial: Eu,
  insideSpan: xu,
  string: _u,
  text: ku
}, Symbol.toStringTag, { value: "Module" }));
function Ru(e, t, n) {
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
    attempt: U(N),
    check: U(T),
    consume: _,
    enter: L,
    exit: P,
    interrupt: U(T, {
      interrupt: !0
    })
  }, c = {
    code: null,
    containerState: {},
    defineSkip: y,
    events: [],
    now: w,
    parser: e,
    previous: null,
    sliceSerialize: f,
    sliceStream: d,
    write: p
  };
  let u = t.tokenize.call(c, l);
  return t.resolveAll && a.push(t), c;
  function p(b) {
    return s = qe(s, b), A(), s[s.length - 1] !== null ? [] : (D(t, 0), c.events = Er(a, c.events, c), c.events);
  }
  function f(b, M) {
    return Nu(d(b), M);
  }
  function d(b) {
    return Au(s, b);
  }
  function w() {
    const {
      _bufferIndex: b,
      _index: M,
      line: V,
      column: q,
      offset: W
    } = r;
    return {
      _bufferIndex: b,
      _index: M,
      line: V,
      column: q,
      offset: W
    };
  }
  function y(b) {
    i[b.line] = b.column, z();
  }
  function A() {
    let b;
    for (; r._index < s.length; ) {
      const M = s[r._index];
      if (typeof M == "string")
        for (b = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === b && r._bufferIndex < M.length; )
          S(M.charCodeAt(r._bufferIndex));
      else
        S(M);
    }
  }
  function S(b) {
    u = u(b);
  }
  function _(b) {
    K(b) ? (r.line++, r.column = 1, r.offset += b === -3 ? 2 : 1, z()) : b !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    s[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = b;
  }
  function L(b, M) {
    const V = M || {};
    return V.type = b, V.start = w(), c.events.push(["enter", V, c]), o.push(V), V;
  }
  function P(b) {
    const M = o.pop();
    return M.end = w(), c.events.push(["exit", M, c]), M;
  }
  function N(b, M) {
    D(b, M.from);
  }
  function T(b, M) {
    M.restore();
  }
  function U(b, M) {
    return V;
    function V(q, W, ie) {
      let O, ue, _e, m;
      return Array.isArray(q) ? (
        /* c8 ignore next 1 */
        ke(q)
      ) : "tokenize" in q ? (
        // Looks like a construct.
        ke([
          /** @type {Construct} */
          q
        ])
      ) : ee(q);
      function ee(se) {
        return De;
        function De(Ce) {
          const Ze = Ce !== null && se[Ce], Be = Ce !== null && se.null, it = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ze) ? Ze : Ze ? [Ze] : [],
            ...Array.isArray(Be) ? Be : Be ? [Be] : []
          ];
          return ke(it)(Ce);
        }
      }
      function ke(se) {
        return O = se, ue = 0, se.length === 0 ? ie : g(se[ue]);
      }
      function g(se) {
        return De;
        function De(Ce) {
          return m = H(), _e = se, se.partial || (c.currentConstruct = se), se.name && c.parser.constructs.disable.null.includes(se.name) ? te() : se.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            M ? Object.assign(Object.create(c), M) : c,
            l,
            ye,
            te
          )(Ce);
        }
      }
      function ye(se) {
        return b(_e, m), W;
      }
      function te(se) {
        return m.restore(), ++ue < O.length ? g(O[ue]) : ie;
      }
    }
  }
  function D(b, M) {
    b.resolveAll && !a.includes(b) && a.push(b), b.resolve && ft(c.events, M, c.events.length - M, b.resolve(c.events.slice(M), c)), b.resolveTo && (c.events = b.resolveTo(c.events, c));
  }
  function H() {
    const b = w(), M = c.previous, V = c.currentConstruct, q = c.events.length, W = Array.from(o);
    return {
      from: q,
      restore: ie
    };
    function ie() {
      r = b, c.previous = M, c.currentConstruct = V, c.events.length = q, o = W, z();
    }
  }
  function z() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Au(e, t) {
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
function Nu(e, t) {
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
function Mu(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Ul([Iu, ...(e || {}).extensions || []])
    ),
    content: i(Zl),
    defined: [],
    document: i(ql),
    flow: i(pu),
    lazy: {},
    string: i(mu),
    text: i(Cu)
  };
  return r;
  function i(a) {
    return s;
    function s(o) {
      return Ru(r, a, o);
    }
  }
}
function Lu(e) {
  for (; !_a(e); )
    ;
  return e;
}
const Ei = /[\0\t\n\r]/g;
function Ou() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, s, o) {
    const l = [];
    let c, u, p, f, d;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(s || void 0).decode(a)), p = 0, t = "", n && (a.charCodeAt(0) === 65279 && p++, n = void 0); p < a.length; ) {
      if (Ei.lastIndex = p, c = Ei.exec(a), f = c && c.index !== void 0 ? c.index : a.length, d = a.charCodeAt(f), !c) {
        t = a.slice(p);
        break;
      }
      if (d === 10 && p === f && r)
        l.push(-3), r = void 0;
      else
        switch (r && (l.push(-5), r = void 0), p < f && (l.push(a.slice(p, f)), e += f - p), d) {
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
      p = f + 1;
    }
    return o && (r && l.push(-5), t && l.push(t), l.push(null)), l;
  }
}
const Du = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Pu(e) {
  return e.replace(Du, Hu);
}
function Hu(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return wa(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return Sr(n) || e;
}
const Ra = {}.hasOwnProperty;
function Fu(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Uu(n)(Lu(Mu(n).document().write(Ou()(e, t, !0))));
}
function Uu(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(st),
      autolinkProtocol: H,
      autolinkEmail: H,
      atxHeading: a(Ge),
      blockQuote: a(Be),
      characterEscape: H,
      characterReference: H,
      codeFenced: a(it),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: a(it, s),
      codeText: a(It, s),
      codeTextData: H,
      data: H,
      codeFlowValue: H,
      definition: a(Qe),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: a(gt),
      hardBreakEscape: a(mt),
      hardBreakTrailing: a(mt),
      htmlFlow: a(Tt, s),
      htmlFlowData: H,
      htmlText: a(Tt, s),
      htmlTextData: H,
      image: a(at),
      label: s,
      link: a(st),
      listItem: a(Rt),
      listItemValue: f,
      listOrdered: a(ot, p),
      listUnordered: a(ot),
      paragraph: a(_t),
      reference: g,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: a(Ge),
      strong: a(Ct),
      thematicBreak: a(xe)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: N,
      autolink: l(),
      autolinkEmail: Ze,
      autolinkProtocol: Ce,
      blockQuote: l(),
      characterEscapeValue: z,
      characterReferenceMarkerHexadecimal: te,
      characterReferenceMarkerNumeric: te,
      characterReferenceValue: se,
      characterReference: De,
      codeFenced: l(A),
      codeFencedFence: y,
      codeFencedFenceInfo: d,
      codeFencedFenceMeta: w,
      codeFlowValue: z,
      codeIndented: l(S),
      codeText: l(W),
      codeTextData: z,
      data: z,
      definition: l(),
      definitionDestinationString: P,
      definitionLabelString: _,
      definitionTitleString: L,
      emphasis: l(),
      hardBreakEscape: l(M),
      hardBreakTrailing: l(M),
      htmlFlow: l(V),
      htmlFlowData: z,
      htmlText: l(q),
      htmlTextData: z,
      image: l(O),
      label: _e,
      labelText: ue,
      lineEnding: b,
      link: l(ie),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: ye,
      resourceDestinationString: m,
      resourceTitleString: ee,
      resource: ke,
      setextHeading: l(D),
      setextHeadingLineSequence: U,
      setextHeadingText: T,
      strong: l(),
      thematicBreak: l()
    }
  };
  Aa(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(E) {
    let R = {
      type: "root",
      children: []
    };
    const j = {
      stack: [R],
      tokenStack: [],
      config: t,
      enter: o,
      exit: c,
      buffer: s,
      resume: u,
      data: n
    }, X = [];
    let J = -1;
    for (; ++J < E.length; )
      if (E[J][1].type === "listOrdered" || E[J][1].type === "listUnordered")
        if (E[J][0] === "enter")
          X.push(J);
        else {
          const pe = X.pop();
          J = i(E, pe, J);
        }
    for (J = -1; ++J < E.length; ) {
      const pe = t[E[J][0]];
      Ra.call(pe, E[J][1].type) && pe[E[J][1].type].call(Object.assign({
        sliceSerialize: E[J][2].sliceSerialize
      }, j), E[J][1]);
    }
    if (j.tokenStack.length > 0) {
      const pe = j.tokenStack[j.tokenStack.length - 1];
      (pe[1] || Ti).call(j, void 0, pe[0]);
    }
    for (R.position = {
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
    }, J = -1; ++J < t.transforms.length; )
      R = t.transforms[J](R) || R;
    return R;
  }
  function i(E, R, j) {
    let X = R - 1, J = -1, pe = !1, We, Se, Ke, Ee;
    for (; ++X <= j; ) {
      const he = E[X];
      switch (he[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          he[0] === "enter" ? J++ : J--, Ee = void 0;
          break;
        }
        case "lineEndingBlank": {
          he[0] === "enter" && (We && !Ee && !J && !Ke && (Ke = X), Ee = void 0);
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
      if (!J && he[0] === "enter" && he[1].type === "listItemPrefix" || J === -1 && he[0] === "exit" && (he[1].type === "listUnordered" || he[1].type === "listOrdered")) {
        if (We) {
          let Ve = X;
          for (Se = void 0; Ve--; ) {
            const be = E[Ve];
            if (be[1].type === "lineEnding" || be[1].type === "lineEndingBlank") {
              if (be[0] === "exit") continue;
              Se && (E[Se][1].type = "lineEndingBlank", pe = !0), be[1].type = "lineEnding", Se = Ve;
            } else if (!(be[1].type === "linePrefix" || be[1].type === "blockQuotePrefix" || be[1].type === "blockQuotePrefixWhitespace" || be[1].type === "blockQuoteMarker" || be[1].type === "listItemIndent")) break;
          }
          Ke && (!Se || Ke < Se) && (We._spread = !0), We.end = Object.assign({}, Se ? E[Se][1].start : he[1].end), E.splice(Se || X, 0, ["exit", We, he[2]]), X++, j++;
        }
        if (he[1].type === "listItemPrefix") {
          const Ve = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, he[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          We = Ve, E.splice(X, 0, ["enter", Ve, he[2]]), X++, j++, Ke = void 0, Ee = !0;
        }
      }
    }
    return E[R][1]._spread = pe, j;
  }
  function a(E, R) {
    return j;
    function j(X) {
      o.call(this, E(X), X), R && R.call(this, X);
    }
  }
  function s() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function o(E, R, j) {
    this.stack[this.stack.length - 1].children.push(E), this.stack.push(E), this.tokenStack.push([R, j || void 0]), E.position = {
      start: kt(R.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function l(E) {
    return R;
    function R(j) {
      E && E.call(this, j), c.call(this, j);
    }
  }
  function c(E, R) {
    const j = this.stack.pop(), X = this.tokenStack.pop();
    if (X)
      X[0].type !== E.type && (R ? R.call(this, E, X[0]) : (X[1] || Ti).call(this, E, X[0]));
    else throw new Error("Cannot close `" + E.type + "` (" + Jt({
      start: E.start,
      end: E.end
    }) + "): it’s not open");
    j.position.end = kt(E.end);
  }
  function u() {
    return Hl(this.stack.pop());
  }
  function p() {
    this.data.expectingFirstListItemValue = !0;
  }
  function f(E) {
    if (this.data.expectingFirstListItemValue) {
      const R = this.stack[this.stack.length - 2];
      R.start = Number.parseInt(this.sliceSerialize(E), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function d() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.lang = E;
  }
  function w() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.meta = E;
  }
  function y() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function A() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function S() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.value = E.replace(/(\r?\n|\r)$/g, "");
  }
  function _(E) {
    const R = this.resume(), j = this.stack[this.stack.length - 1];
    j.label = R, j.identifier = Bt(this.sliceSerialize(E)).toLowerCase();
  }
  function L() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.title = E;
  }
  function P() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.url = E;
  }
  function N(E) {
    const R = this.stack[this.stack.length - 1];
    if (!R.depth) {
      const j = this.sliceSerialize(E).length;
      R.depth = j;
    }
  }
  function T() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function U(E) {
    const R = this.stack[this.stack.length - 1];
    R.depth = this.sliceSerialize(E).codePointAt(0) === 61 ? 1 : 2;
  }
  function D() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function H(E) {
    const j = this.stack[this.stack.length - 1].children;
    let X = j[j.length - 1];
    (!X || X.type !== "text") && (X = At(), X.position = {
      start: kt(E.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, j.push(X)), this.stack.push(X);
  }
  function z(E) {
    const R = this.stack.pop();
    R.value += this.sliceSerialize(E), R.position.end = kt(E.end);
  }
  function b(E) {
    const R = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const j = R.children[R.children.length - 1];
      j.position.end = kt(E.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(R.type) && (H.call(this, E), z.call(this, E));
  }
  function M() {
    this.data.atHardBreak = !0;
  }
  function V() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.value = E;
  }
  function q() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.value = E;
  }
  function W() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.value = E;
  }
  function ie() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const R = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = R, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function O() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const R = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = R, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function ue(E) {
    const R = this.sliceSerialize(E), j = this.stack[this.stack.length - 2];
    j.label = Pu(R), j.identifier = Bt(R).toLowerCase();
  }
  function _e() {
    const E = this.stack[this.stack.length - 1], R = this.resume(), j = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, j.type === "link") {
      const X = E.children;
      j.children = X;
    } else
      j.alt = R;
  }
  function m() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.url = E;
  }
  function ee() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.title = E;
  }
  function ke() {
    this.data.inReference = void 0;
  }
  function g() {
    this.data.referenceType = "collapsed";
  }
  function ye(E) {
    const R = this.resume(), j = this.stack[this.stack.length - 1];
    j.label = R, j.identifier = Bt(this.sliceSerialize(E)).toLowerCase(), this.data.referenceType = "full";
  }
  function te(E) {
    this.data.characterReferenceType = E.type;
  }
  function se(E) {
    const R = this.sliceSerialize(E), j = this.data.characterReferenceType;
    let X;
    j ? (X = wa(R, j === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : X = Sr(R);
    const J = this.stack[this.stack.length - 1];
    J.value += X;
  }
  function De(E) {
    const R = this.stack.pop();
    R.position.end = kt(E.end);
  }
  function Ce(E) {
    z.call(this, E);
    const R = this.stack[this.stack.length - 1];
    R.url = this.sliceSerialize(E);
  }
  function Ze(E) {
    z.call(this, E);
    const R = this.stack[this.stack.length - 1];
    R.url = "mailto:" + this.sliceSerialize(E);
  }
  function Be() {
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
  function Qe() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function gt() {
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
  function mt() {
    return {
      type: "break"
    };
  }
  function Tt() {
    return {
      type: "html",
      value: ""
    };
  }
  function at() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function st() {
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
  function Rt(E) {
    return {
      type: "listItem",
      spread: E._spread,
      checked: null,
      children: []
    };
  }
  function _t() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Ct() {
    return {
      type: "strong",
      children: []
    };
  }
  function At() {
    return {
      type: "text",
      value: ""
    };
  }
  function xe() {
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
function Aa(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Aa(e, r) : zu(e, r);
  }
}
function zu(e, t) {
  let n;
  for (n in t)
    if (Ra.call(t, n))
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
function Ti(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Jt({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Jt({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Jt({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function Bu(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return Fu(r, {
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
function Gu(e, t) {
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
function Vu(e, t) {
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
function ju(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function $u(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Zu(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Vt(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
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
function Ku(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function qu(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function Na(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return s && s.type === "text" ? s.value += r : i.push({ type: "text", value: r }), i;
}
function Xu(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Na(e, t);
  const i = { src: Vt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function Yu(e, t) {
  const n = { src: Vt(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function Ju(e, t) {
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
function Qu(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Na(e, t);
  const i = { href: Vt(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function e1(e, t) {
  const n = { href: Vt(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function t1(e, t, n) {
  const r = e.all(t), i = n ? n1(n) : Ma(t), a = {}, s = [];
  if (typeof t.checked == "boolean") {
    const u = r[0];
    let p;
    u && u.type === "element" && u.tagName === "p" ? p = u : (p = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(p)), p.children.length > 0 && p.children.unshift({ type: "text", value: " " }), p.children.unshift({
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
function n1(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = Ma(n[r]);
  }
  return t;
}
function Ma(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function r1(e, t) {
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
function i1(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function a1(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function s1(e, t) {
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
    }, o = mr(t.children[1]), l = da(t.children[t.children.length - 1]);
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
function l1(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", s = n && n.type === "table" ? n.align : void 0, o = s ? s.length : t.children.length;
  let l = -1;
  const c = [];
  for (; ++l < o; ) {
    const p = t.children[l], f = {}, d = s ? s[l] : void 0;
    d && (f.align = d);
    let w = { type: "element", tagName: a, properties: f, children: [] };
    p && (w.children = e.all(p), e.patch(p, w), w = e.applyData(p, w)), c.push(w);
  }
  const u = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(c, !0)
  };
  return e.patch(t, u), e.applyData(t, u);
}
function c1(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const _i = 9, ki = 32;
function u1(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const a = [];
  for (; r; )
    a.push(
      xi(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return a.push(xi(t.slice(i), i > 0, !1)), a.join("");
}
function xi(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let a = e.codePointAt(r);
    for (; a === _i || a === ki; )
      r++, a = e.codePointAt(r);
  }
  if (n) {
    let a = e.codePointAt(i - 1);
    for (; a === _i || a === ki; )
      i--, a = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function h1(e, t) {
  const n = { type: "text", value: u1(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function d1(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const p1 = {
  blockquote: Gu,
  break: Wu,
  code: Vu,
  delete: ju,
  emphasis: $u,
  footnoteReference: Zu,
  heading: Ku,
  html: qu,
  imageReference: Xu,
  image: Yu,
  inlineCode: Ju,
  linkReference: Qu,
  link: e1,
  listItem: t1,
  list: r1,
  paragraph: i1,
  // @ts-expect-error: root is different, but hard to type.
  root: a1,
  strong: s1,
  table: o1,
  tableCell: c1,
  tableRow: l1,
  text: h1,
  thematicBreak: d1,
  toml: pn,
  yaml: pn,
  definition: pn,
  footnoteDefinition: pn
};
function pn() {
}
const La = -1, Rn = 0, en = 1, kn = 2, _r = 3, kr = 4, xr = 5, br = 6, Oa = 7, Da = 8, bi = typeof self == "object" ? self : globalThis, f1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, s] = t[i];
    switch (a) {
      case Rn:
      case La:
        return n(s, i);
      case en: {
        const o = n([], i);
        for (const l of s)
          o.push(r(l));
        return o;
      }
      case kn: {
        const o = n({}, i);
        for (const [l, c] of s)
          o[r(l)] = r(c);
        return o;
      }
      case _r:
        return n(new Date(s), i);
      case kr: {
        const { source: o, flags: l } = s;
        return n(new RegExp(o, l), i);
      }
      case xr: {
        const o = n(/* @__PURE__ */ new Map(), i);
        for (const [l, c] of s)
          o.set(r(l), r(c));
        return o;
      }
      case br: {
        const o = n(/* @__PURE__ */ new Set(), i);
        for (const l of s)
          o.add(r(l));
        return o;
      }
      case Oa: {
        const { name: o, message: l } = s;
        return n(new bi[o](l), i);
      }
      case Da:
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
    return n(new bi[a](s), i);
  };
  return r;
}, vi = (e) => f1(/* @__PURE__ */ new Map(), e)(0), Ft = "", { toString: g1 } = {}, { keys: m1 } = Object, Yt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Rn, t];
  const n = g1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [en, Ft];
    case "Object":
      return [kn, Ft];
    case "Date":
      return [_r, Ft];
    case "RegExp":
      return [kr, Ft];
    case "Map":
      return [xr, Ft];
    case "Set":
      return [br, Ft];
    case "DataView":
      return [en, n];
  }
  return n.includes("Array") ? [en, n] : n.includes("Error") ? [Oa, n] : [kn, n];
}, fn = ([e, t]) => e === Rn && (t === "function" || t === "symbol"), C1 = (e, t, n, r) => {
  const i = (s, o) => {
    const l = r.push(s) - 1;
    return n.set(o, l), l;
  }, a = (s) => {
    if (n.has(s))
      return n.get(s);
    let [o, l] = Yt(s);
    switch (o) {
      case Rn: {
        let u = s;
        switch (l) {
          case "bigint":
            o = Da, u = s.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + l);
            u = null;
            break;
          case "undefined":
            return i([La], s);
        }
        return i([o, u], s);
      }
      case en: {
        if (l) {
          let f = s;
          return l === "DataView" ? f = new Uint8Array(s.buffer) : l === "ArrayBuffer" && (f = new Uint8Array(s)), i([l, [...f]], s);
        }
        const u = [], p = i([o, u], s);
        for (const f of s)
          u.push(a(f));
        return p;
      }
      case kn: {
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
        const u = [], p = i([o, u], s);
        for (const f of m1(s))
          (e || !fn(Yt(s[f]))) && u.push([a(f), a(s[f])]);
        return p;
      }
      case _r:
        return i([o, s.toISOString()], s);
      case kr: {
        const { source: u, flags: p } = s;
        return i([o, { source: u, flags: p }], s);
      }
      case xr: {
        const u = [], p = i([o, u], s);
        for (const [f, d] of s)
          (e || !(fn(Yt(f)) || fn(Yt(d)))) && u.push([a(f), a(d)]);
        return p;
      }
      case br: {
        const u = [], p = i([o, u], s);
        for (const f of s)
          (e || !fn(Yt(f))) && u.push(a(f));
        return p;
      }
    }
    const { message: c } = s;
    return i([o, { name: l, message: c }], s);
  };
  return a;
}, Ii = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return C1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, xn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? vi(Ii(e, t)) : structuredClone(e)
) : (e, t) => vi(Ii(e, t));
function y1(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function w1(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function S1(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || y1, r = e.options.footnoteBackLabel || w1, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", s = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let l = -1;
  for (; ++l < e.footnoteOrder.length; ) {
    const c = e.footnoteById.get(
      e.footnoteOrder[l]
    );
    if (!c)
      continue;
    const u = e.all(c), p = String(c.identifier).toUpperCase(), f = Vt(p.toLowerCase());
    let d = 0;
    const w = [], y = e.footnoteCounts.get(p);
    for (; y !== void 0 && ++d <= y; ) {
      w.length > 0 && w.push({ type: "text", value: " " });
      let _ = typeof n == "string" ? n : n(l, d);
      typeof _ == "string" && (_ = { type: "text", value: _ }), w.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + f + (d > 1 ? "-" + d : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(l, d),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(_) ? _ : [_]
      });
    }
    const A = u[u.length - 1];
    if (A && A.type === "element" && A.tagName === "p") {
      const _ = A.children[A.children.length - 1];
      _ && _.type === "text" ? _.value += " " : A.children.push({ type: "text", value: " " }), A.children.push(...w);
    } else
      u.push(...w);
    const S = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + f },
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
            ...xn(s),
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
const Pa = (
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
      return k1;
    if (typeof e == "function")
      return An(e);
    if (typeof e == "object")
      return Array.isArray(e) ? E1(e) : T1(e);
    if (typeof e == "string")
      return _1(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function E1(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Pa(e[n]);
  return An(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function T1(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return An(n);
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
function _1(e) {
  return An(t);
  function t(n) {
    return n && n.type === e;
  }
}
function An(e) {
  return t;
  function t(n, r, i) {
    return !!(x1(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function k1() {
  return !0;
}
function x1(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Ha = [], b1 = !0, Ri = !1, v1 = "skip";
function I1(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = Pa(i), s = r ? -1 : 1;
  o(e, void 0, [])();
  function o(l, c, u) {
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
      Object.defineProperty(f, "name", {
        value: "node (" + (l.type + (d ? "<" + d + ">" : "")) + ")"
      });
    }
    return f;
    function f() {
      let d = Ha, w, y, A;
      if ((!t || a(l, c, u[u.length - 1] || void 0)) && (d = R1(n(l, u)), d[0] === Ri))
        return d;
      if ("children" in l && l.children) {
        const S = (
          /** @type {UnistParent} */
          l
        );
        if (S.children && d[0] !== v1)
          for (y = (r ? S.children.length : -1) + s, A = u.concat(S); y > -1 && y < S.children.length; ) {
            const _ = S.children[y];
            if (w = o(_, y, A)(), w[0] === Ri)
              return w;
            y = typeof w[1] == "number" ? w[1] : y + s;
          }
      }
      return d;
    }
  }
}
function R1(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [b1, e] : e == null ? Ha : [e];
}
function Fa(e, t, n, r) {
  let i, a, s;
  typeof t == "function" && typeof n != "function" ? (a = void 0, s = t, i = n) : (a = t, s = n, i = r), I1(e, a, o, i);
  function o(l, c) {
    const u = c[c.length - 1], p = u ? u.children.indexOf(l) : void 0;
    return s(l, p, u);
  }
}
const cr = {}.hasOwnProperty, A1 = {};
function N1(e, t) {
  const n = t || A1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = { ...p1, ...n.handlers }, o = {
    all: c,
    applyData: L1,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: s,
    one: l,
    options: n,
    patch: M1,
    wrap: D1
  };
  return Fa(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const p = u.type === "definition" ? r : i, f = String(u.identifier).toUpperCase();
      p.has(f) || p.set(f, u);
    }
  }), o;
  function l(u, p) {
    const f = u.type, d = o.handlers[f];
    if (cr.call(o.handlers, f) && d)
      return d(o, u, p);
    if (o.options.passThrough && o.options.passThrough.includes(f)) {
      if ("children" in u) {
        const { children: y, ...A } = u, S = xn(A);
        return S.children = o.all(u), S;
      }
      return xn(u);
    }
    return (o.options.unknownHandler || O1)(o, u, p);
  }
  function c(u) {
    const p = [];
    if ("children" in u) {
      const f = u.children;
      let d = -1;
      for (; ++d < f.length; ) {
        const w = o.one(f[d], u);
        if (w) {
          if (d && f[d - 1].type === "break" && (!Array.isArray(w) && w.type === "text" && (w.value = Ai(w.value)), !Array.isArray(w) && w.type === "element")) {
            const y = w.children[0];
            y && y.type === "text" && (y.value = Ai(y.value));
          }
          Array.isArray(w) ? p.push(...w) : p.push(w);
        }
      }
    }
    return p;
  }
}
function M1(e, t) {
  e.position && (t.position = gl(e));
}
function L1(e, t) {
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
    n.type === "element" && a && Object.assign(n.properties, xn(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function O1(e, t) {
  const n = t.data || {}, r = "value" in t && !(cr.call(n, "hProperties") || cr.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function D1(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Ai(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function Ni(e, t) {
  const n = N1(e, t), r = n.one(e, void 0), i = S1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function P1(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      Ni(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      Ni(n, { file: r, ...e || t })
    );
  };
}
function Mi(e) {
  if (e)
    throw e;
}
var wn = Object.prototype.hasOwnProperty, Ua = Object.prototype.toString, Li = Object.defineProperty, Oi = Object.getOwnPropertyDescriptor, Di = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : Ua.call(t) === "[object Array]";
}, Pi = function(t) {
  if (!t || Ua.call(t) !== "[object Object]")
    return !1;
  var n = wn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && wn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || wn.call(t, i);
}, Hi = function(t, n) {
  Li && n.name === "__proto__" ? Li(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, Fi = function(t, n) {
  if (n === "__proto__")
    if (wn.call(t, n)) {
      if (Oi)
        return Oi(t, n).value;
    } else return;
  return t[n];
}, H1 = function e() {
  var t, n, r, i, a, s, o = arguments[0], l = 1, c = arguments.length, u = !1;
  for (typeof o == "boolean" && (u = o, o = arguments[1] || {}, l = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); l < c; ++l)
    if (t = arguments[l], t != null)
      for (n in t)
        r = Fi(o, n), i = Fi(t, n), o !== i && (u && i && (Pi(i) || (a = Di(i))) ? (a ? (a = !1, s = r && Di(r) ? r : []) : s = r && Pi(r) ? r : {}, Hi(o, { name: n, newValue: e(u, s, i) })) : typeof i < "u" && Hi(o, { name: n, newValue: i }));
  return o;
};
const Vn = /* @__PURE__ */ ha(H1);
function ur(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function F1() {
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
      let p = -1;
      if (l) {
        s(l);
        return;
      }
      for (; ++p < i.length; )
        (c[p] === null || c[p] === void 0) && (c[p] = i[p]);
      i = c, u ? U1(u, o)(...c) : s(null, ...c);
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
function U1(e, t) {
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
const ut = { basename: z1, dirname: B1, extname: G1, join: W1, sep: "/" };
function z1(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  an(e);
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
function B1(e) {
  if (an(e), e.length === 0)
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
function G1(e) {
  an(e);
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
function W1(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    an(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : V1(n);
}
function V1(e) {
  an(e);
  const t = e.codePointAt(0) === 47;
  let n = j1(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function j1(e, t) {
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
function an(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const $1 = { cwd: Z1 };
function Z1() {
  return "/";
}
function hr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function K1(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!hr(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return q1(e);
}
function q1(e) {
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
const jn = (
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
class za {
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
    t ? hr(t) ? n = { path: t } : typeof t == "string" || X1(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : $1.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < jn.length; ) {
      const a = jn[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      jn.includes(i) || (this[i] = n[i]);
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
    Zn(t, "basename"), $n(t, "basename"), this.path = ut.join(this.dirname || "", t);
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
    Ui(this.basename, "dirname"), this.path = ut.join(t || "", this.basename);
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
    if ($n(t, "extname"), Ui(this.dirname, "extname"), t) {
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
    hr(t) && (t = K1(t)), Zn(t, "path"), this.path !== t && this.history.push(t);
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
    Zn(t, "stem"), $n(t, "stem"), this.path = ut.join(this.dirname || "", t + (this.extname || ""));
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
function $n(e, t) {
  if (e && e.includes(ut.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ut.sep + "`"
    );
}
function Zn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function Ui(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function X1(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Y1 = (
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
), J1 = {}.hasOwnProperty;
class vr extends Y1 {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = F1();
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
      new vr()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Vn(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (Xn("data", this.frozen), this.namespace[t] = n, this) : J1.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Xn("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = gn(t), r = this.parser || this.Parser;
    return Kn("parse", r), r(String(n), n);
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
    return this.freeze(), Kn("process", this.parser || this.Parser), qn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, s) {
      const o = gn(t), l = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(o)
      );
      r.run(l, o, function(u, p, f) {
        if (u || !p || !f)
          return c(u);
        const d = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          p
        ), w = r.stringify(d, f);
        th(w) ? f.value = w : f.result = w, c(
          u,
          /** @type {VFileWithOutput<CompileResult>} */
          f
        );
      });
      function c(u, p) {
        u || !p ? s(u) : a ? a(p) : n(void 0, p);
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
    return this.freeze(), Kn("processSync", this.parser || this.Parser), qn("processSync", this.compiler || this.Compiler), this.process(t, i), Bi("processSync", "process", n), r;
    function i(a, s) {
      n = !0, Mi(a), r = s;
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
    zi(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(s, o) {
      const l = gn(n);
      i.run(t, l, c);
      function c(u, p, f) {
        const d = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          p || t
        );
        u ? o(u) : s ? s(d) : r(void 0, d, f);
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
    return this.run(t, n, a), Bi("runSync", "run", r), i;
    function a(s, o) {
      Mi(s), i = o, r = !0;
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
    const r = gn(n), i = this.compiler || this.Compiler;
    return qn("stringify", i), zi(t), i(t, r);
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
    if (Xn("use", this.frozen), t != null) if (typeof t == "function")
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
          const [u, ...p] = (
            /** @type {PluginTuple<Array<unknown>>} */
            c
          );
          l(u, p);
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
      o(c.plugins), c.settings && (i.settings = Vn(!0, i.settings, c.settings));
    }
    function o(c) {
      let u = -1;
      if (c != null) if (Array.isArray(c))
        for (; ++u < c.length; ) {
          const p = c[u];
          a(p);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + c + "`");
    }
    function l(c, u) {
      let p = -1, f = -1;
      for (; ++p < r.length; )
        if (r[p][0] === c) {
          f = p;
          break;
        }
      if (f === -1)
        r.push([c, ...u]);
      else if (u.length > 0) {
        let [d, ...w] = u;
        const y = r[f][1];
        ur(y) && ur(d) && (d = Vn(!0, y, d)), r[f] = [c, d, ...w];
      }
    }
  }
}
const Q1 = new vr().freeze();
function Kn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function qn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Xn(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function zi(e) {
  if (!ur(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Bi(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function gn(e) {
  return eh(e) ? e : new za(e);
}
function eh(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function th(e) {
  return typeof e == "string" || nh(e);
}
function nh(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const rh = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Gi = [], Wi = { allowDangerousHtml: !0 }, ih = /^(https?|ircs?|mailto|xmpp)$/i, ah = [
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
function Vi(e) {
  const t = sh(e), n = oh(e);
  return lh(t.runSync(t.parse(n), n), e);
}
function sh(e) {
  const t = e.rehypePlugins || Gi, n = e.remarkPlugins || Gi, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Wi } : Wi;
  return Q1().use(Bu).use(n).use(P1, r).use(t);
}
function oh(e) {
  const t = e.children || "", n = new za();
  return typeof t == "string" && (n.value = t), n;
}
function lh(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, s = t.skipHtml, o = t.unwrapDisallowed, l = t.urlTransform || ch;
  for (const u of ah)
    Object.hasOwn(t, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + rh + u.id, void 0);
  return Fa(e, c), Sl(e, {
    Fragment: Gt,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: h,
    jsxs: k,
    passKeys: !0,
    passNode: !0
  });
  function c(u, p, f) {
    if (u.type === "raw" && f && typeof p == "number")
      return s ? f.children.splice(p, 1) : f.children[p] = { type: "text", value: u.value }, p;
    if (u.type === "element") {
      let d;
      for (d in Bn)
        if (Object.hasOwn(Bn, d) && Object.hasOwn(u.properties, d)) {
          const w = u.properties[d], y = Bn[d];
          (y === null || y.includes(u.tagName)) && (u.properties[d] = l(String(w || ""), d, u));
        }
    }
    if (u.type === "element") {
      let d = n ? !n.includes(u.tagName) : a ? a.includes(u.tagName) : !1;
      if (!d && r && typeof p == "number" && (d = !r(u, p, f)), d && f && typeof p == "number")
        return o && u.children ? f.children.splice(p, 1, ...u.children) : f.children.splice(p, 1), p;
    }
  }
}
function ch(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    ih.test(e.slice(0, t)) ? e : ""
  );
}
function uh({ children: e, isStreaming: t }) {
  const [n, r] = ae(!0), [i, a] = ae(!1);
  ht.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const s = () => {
    t || r(!n);
  }, o = ht.Children.map(e, (l) => {
    if (ht.isValidElement(l)) {
      if (l.type === Ba)
        return ht.cloneElement(
          l,
          {
            onToggle: s,
            isExpanded: n
          }
        );
      if (l.type === Ga)
        return ht.cloneElement(
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
function Ba({
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
  ), s = t === "completed" || e.includes(Z.UI_TEXT.THINKING) || e.includes(Z.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ k(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${s ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: s ? r : void 0,
      style: { cursor: s ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ k("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ h("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        s && /* @__PURE__ */ h(
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
function Ga({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function hh({ children: e }) {
  return /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function dh({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var l, c;
  const a = () => {
    if (!r || !i) return null;
    const u = i.find((p) => p.name === r);
    return (u == null ? void 0 : u.description) || null;
  };
  let s;
  if (r != null && r.startsWith("lat_")) {
    const u = (l = n == null ? void 0 : n.parameters) == null ? void 0 : l.query, p = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.url;
    s = u || p || "Executing tool...";
  } else
    s = a();
  return s && (s.startsWith("http://") || s.startsWith("https://") || (s = s.charAt(0).toUpperCase() + s.slice(1))), /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ k("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ k(
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
          ) : /* @__PURE__ */ k(
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
          /* @__PURE__ */ k("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ k(
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
        return /* @__PURE__ */ k("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ k(
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
          ) : /* @__PURE__ */ k(
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
          /* @__PURE__ */ k("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ k(
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
        return /* @__PURE__ */ k("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
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
        return /* @__PURE__ */ k("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ k(
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
          ) : /* @__PURE__ */ k(
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
          /* @__PURE__ */ k("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ k(
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
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ k(
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
function Wa({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ k("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
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
const ph = ({ message: e }) => {
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
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ k(
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
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ k(
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
}, Va = es(null);
function fh({ children: e, value: t }) {
  return /* @__PURE__ */ h(Va.Provider, { value: t, children: e });
}
function sn() {
  const e = ts(Va);
  if (!e)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return e;
}
const ja = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ h("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code-block", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ h("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ h("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ h("li", { className: "chat-wrapper__list-item", ...t, children: e })
}, gh = {
  ...ja,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code", ...n, children: e })
}, $a = ji(
  ({ message: e }) => {
    const {
      getReasoningTitle: t,
      getReasoningStatus: n,
      getReasoningDuration: r,
      getReasoningContentOnly: i,
      getToolingTitle: a,
      getToolingStatus: s,
      clientTools: o,
      currentAssistantMessageIdRef: l
    } = sn(), [c, u] = ae(!1), [p, f] = ae(!1), d = ne(async () => {
      try {
        await navigator.clipboard.writeText(e.content), u(!0), setTimeout(() => u(!1), 2e3);
      } catch (N) {
        console.error("Failed to copy message:", N);
      }
    }, [e.content]), w = () => /* @__PURE__ */ k("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ h(Wa, { size: 16, variant: "dots" }),
      /* @__PURE__ */ h("span", { children: Z.UI_TEXT.THINKING })
    ] }), y = () => /* @__PURE__ */ k(Gt, { children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ h(
        "button",
        {
          className: `chat-wrapper__copy-button ${p ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: d,
          title: "Copy message",
          children: /* @__PURE__ */ h(To, {})
        }
      ) }),
      c && /* @__PURE__ */ h("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), A = () => /* @__PURE__ */ h("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(Vi, { components: ja, children: e.content }) }),
      y()
    ] }) }), S = () => /* @__PURE__ */ k("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(Vi, { components: gh, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ h("div", { className: "chat-wrapper__media", children: e.media.map((N, T) => /* @__PURE__ */ h(
        "img",
        {
          src: N,
          alt: `Uploaded content ${T + 1}`,
          className: "chat-wrapper__media-image"
        },
        T
      )) })
    ] }), _ = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === l.current ? w() : e.role === "system" ? /* @__PURE__ */ h(ph, { message: e }) : e.role === "assistant" ? A() : S(), L = () => /* @__PURE__ */ k(uh, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ h(
        Ba,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ h(Ga, { children: i(e.content) })
    ] }), P = () => {
      var N;
      return /* @__PURE__ */ h(hh, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ h(
        dh,
        {
          title: a(e.content, e.isStreaming),
          status: s(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (N = e.toolData) == null ? void 0 : N.toolName,
          clientTools: o
        }
      ) });
    };
    return /* @__PURE__ */ h(
      "div",
      {
        className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
        onMouseEnter: () => e.role === "assistant" && f(!0),
        onMouseLeave: () => e.role === "assistant" && f(!1),
        children: e.role === "reasoning" ? L() : e.role === "tooling" ? P() : /* @__PURE__ */ h("div", { className: "chat-wrapper__message-content", children: _() })
      }
    );
  }
);
$a.displayName = "MessageItem";
const mh = ({ isVisible: e }) => e ? /* @__PURE__ */ h("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ h("span", {}),
  /* @__PURE__ */ h("span", {}),
  /* @__PURE__ */ h("span", {})
] }) }) }) }) : null, Za = bn((e, t) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = sn();
  return /* @__PURE__ */ k("div", { className: "chat-wrapper__messages", children: [
    n.map((a) => /* @__PURE__ */ h(
      $a,
      {
        message: a
      },
      a.id
    )),
    /* @__PURE__ */ h(mh, { isVisible: r && !i }),
    /* @__PURE__ */ h("div", { ref: t })
  ] });
});
Za.displayName = "MessagesList";
const rt = (...e) => e.filter(Boolean).join(" "), Ch = () => /* @__PURE__ */ k(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ k("g", { filter: "url(#filter0_dd_121_23927)", children: [
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
), yh = ({ className: e, ...t }) => /* @__PURE__ */ h("form", { className: rt("chat-wrapper__prompt-input", e), ...t }), Ka = bn(
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
          const p = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          u.dispatchEvent(p);
        }
      }
      a == null || a(c);
    };
    return /* @__PURE__ */ h(
      "textarea",
      {
        ref: o,
        className: rt("chat-wrapper__prompt-textarea", t),
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
Ka.displayName = "PromptInputTextarea";
const wh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: rt("chat-wrapper__prompt-toolbar", e), ...t }), Sh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: rt("chat-wrapper__prompt-tools", e), ...t }), Eh = ({
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
}, Th = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = Ye.IDLE,
  children: i,
  disabled: a,
  ...s
}) => {
  let o = /* @__PURE__ */ h(Ch, {});
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
      ...s,
      children: i ?? o
    }
  );
}, Kh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ h("select", { className: rt("chat-wrapper__prompt-select", e), ...n, children: t }), qh = ({
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
), Xh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h(
  "div",
  {
    className: rt("chat-wrapper__prompt-select-content", e),
    ...t
  }
), Yh = ({
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
), Jh = ({
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
), _h = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = ae(0), [a, s] = ae(!1), [o, l] = ae(0);
  return Ie(() => {
    if (!t || e.length <= 1) return;
    const c = setInterval(() => {
      s(!0), setTimeout(() => {
        i((u) => (u + 1) % e.length), l((u) => u + 1), s(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(c);
  }, [t, e.length]), Ie(() => {
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
}, kh = bn((e, t) => {
  const {
    placeholderTexts: n,
    isStreaming: r,
    isLoadingConversation: i,
    chatStatus: a,
    fileUploadEnabled: s,
    chipName: o,
    chipLogo: l,
    messages: c,
    onSubmit: u,
    onFileUpload: p,
    onStopGeneration: f
  } = sn(), d = c.length > 0, [w, y] = ae(""), [A, S] = ae([]), _ = Xe(null), L = n && n.length > 0 ? n : ["What would you like to know?"], P = w.length === 0 && !d && L.length > 1;
  $i(t, () => ({
    focus: () => {
      var D;
      (D = _.current) == null || D.focus();
    },
    setText: (D) => {
      y(D), setTimeout(() => {
        var H;
        (H = _.current) == null || H.focus();
      }, 0);
    }
  }));
  const N = ne(
    (D) => {
      D.preventDefault();
      const z = new FormData(D.currentTarget).get("message");
      if (z != null && z.trim()) {
        const b = Tn(z.trim(), !1);
        if (!b.trim()) {
          console.warn("Message was blocked due to security concerns");
          return;
        }
        u(b, A), y(""), S([]);
      }
    },
    [u, A]
  ), T = ne(
    (D) => {
      const z = D.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      y(z);
    },
    []
  ), U = ne(async () => {
    const D = document.createElement("input");
    D.type = "file", D.accept = "image/*", D.multiple = !1, D.onchange = async (H) => {
      const z = H.target.files;
      if (z) {
        const b = Array.from(z).filter((M) => {
          const V = to(M.name);
          return V !== M.name && console.warn(
            `File name sanitized: ${M.name} -> ${V}`
          ), M.size > 10485760 ? (console.warn(`File too large: ${M.name} (${M.size} bytes)`), !1) : [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp"
          ].includes(M.type) ? !0 : (console.warn(`File type not allowed: ${M.name} (${M.type})`), !1);
        });
        if (b.length > 0) {
          const M = await p(b);
          S(M);
        }
      }
    }, D.click();
  }, [p]);
  return /* @__PURE__ */ k(yh, { onSubmit: N, style: { position: "relative" }, children: [
    /* @__PURE__ */ h(
      Ka,
      {
        ref: _,
        name: "message",
        value: w,
        onChange: T,
        placeholder: "",
        disabled: r || i
      }
    ),
    !w.trim() && /* @__PURE__ */ h(
      _h,
      {
        placeholderTexts: L,
        shouldAnimate: P
      }
    ),
    A.length > 0 && /* @__PURE__ */ h(
      "div",
      {
        style: {
          padding: "8px 16px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          alignItems: "center"
        },
        children: A.map((D, H) => {
          const z = D.startsWith("data:image/"), b = D.startsWith("http://") || D.startsWith("https://"), M = z || b;
          return /* @__PURE__ */ k(
            "div",
            {
              style: {
                position: "relative",
                display: "inline-block"
              },
              children: [
                M ? /* @__PURE__ */ k(
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
                          src: D,
                          alt: `Attachment ${H + 1}`,
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
                          children: /* @__PURE__ */ k(
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
                      /* @__PURE__ */ k("div", { style: { flex: 1, minWidth: 0 }, children: [
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
                              const V = D.match(/name=([^;]+)/);
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
                              const V = D.match(/data:([^;]+)/);
                              if (V) {
                                const q = V[1];
                                switch (q) {
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
                                    const W = q.split("/")[1];
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
                /* @__PURE__ */ h(
                  "button",
                  {
                    onClick: () => {
                      S(
                        (V) => V.filter((q, W) => W !== H)
                      );
                    },
                    style: {
                      position: "absolute",
                      top: M ? "6px" : "8px",
                      right: M ? "6px" : "8px",
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
            H
          );
        })
      }
    ),
    /* @__PURE__ */ k(wh, { children: [
      /* @__PURE__ */ k(Sh, { children: [
        s && /* @__PURE__ */ k(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ h(
                Eh,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: U,
                  title: A.length > 0 ? `${A.length} image(s) attached` : "Attach image",
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
                  onClick: U,
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
        s && o && /* @__PURE__ */ h("div", { className: "chat-wrapper__divider" }),
        o && /* @__PURE__ */ k("div", { className: "chat-wrapper__restaurant-chip", children: [
          l && /* @__PURE__ */ h(
            "img",
            {
              src: l,
              alt: "Chip logo",
              className: "chat-wrapper__restaurant-logo"
            }
          ),
          /* @__PURE__ */ h("span", { className: "chat-wrapper__restaurant-name", children: o })
        ] })
      ] }),
      /* @__PURE__ */ h(
        Th,
        {
          status: a,
          disabled: !w.trim() || i,
          onClick: a === Ye.STREAMING && f ? () => {
            f();
          } : void 0
        }
      )
    ] })
  ] });
}), xh = () => {
  const { suggestedPrompts: e, chatInputRef: t } = sn();
  if (!e || e.length === 0)
    return null;
  const n = (r) => {
    t.current && t.current.setText(r.description);
  };
  return /* @__PURE__ */ k("div", { className: "chat-wrapper__suggested-prompts", children: [
    /* @__PURE__ */ h("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
    /* @__PURE__ */ h("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((r, i) => /* @__PURE__ */ h(
      "button",
      {
        className: "chat-wrapper__suggested-prompt-card",
        onClick: () => n(r),
        children: /* @__PURE__ */ k("div", { className: "chat-wrapper__suggested-prompt-content", children: [
          /* @__PURE__ */ h("h4", { className: "chat-wrapper__suggested-prompt-title", children: r.title }),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__suggested-prompt-description", children: r.description })
        ] })
      },
      i
    )) })
  ] });
}, bh = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ h(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ h("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ h(Wa, { size: e, variant: "dots" }) })
  }
), vh = ({
  headerName: e,
  headerDescription: t
}) => /* @__PURE__ */ k("div", { className: "chat-wrapper__main-header", children: [
  /* @__PURE__ */ h("h1", { className: "chat-wrapper__main-title", children: e }),
  t && /* @__PURE__ */ h("p", { className: "chat-wrapper__description", children: t })
] }), Ih = () => {
  const {
    messages: e,
    isLoadingConversation: t,
    isStreaming: n,
    headerName: r,
    headerDescription: i,
    suggestedPrompts: a,
    messagesEndRef: s,
    chatInputRef: o,
    conversationError: l
  } = sn(), c = dt.state.shouldShowMainHeader(
    e.length,
    n,
    t
  ), u = dt.state.shouldShowSuggestedPrompts(
    e.length,
    n,
    t,
    a
  ), p = dt.state.getContentAreaClass(
    e.length,
    n,
    t
  );
  return /* @__PURE__ */ k(Gt, { children: [
    l && /* @__PURE__ */ h("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ k("p", { children: [
      "⚠️ ",
      l
    ] }) }),
    c && /* @__PURE__ */ h(vh, { headerName: r, headerDescription: i }),
    /* @__PURE__ */ k("div", { className: p, children: [
      t && e.length === 0 ? /* @__PURE__ */ h("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ h(bh, { fullHeight: !0 }) }) : /* @__PURE__ */ h(Za, { ref: s }),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ h(kh, { ref: o }) }),
      u && /* @__PURE__ */ h(xh, {})
    ] })
  ] });
}, qa = bn(
  ({
    // Authentication and server configuration
    userMpAuthToken: e,
    chatServerUrl: t,
    chatServerKey: n,
    // Entity and conversation configuration
    userId: r,
    entityId: i,
    entityType: a,
    metadata: s,
    // Existing props
    config: o,
    tools: l,
    devMode: c = !1,
    contextHelpers: u
  }, p) => {
    var cn, de;
    dt.validation.validateAuthProps({
      userMpAuthToken: e,
      chatServerUrl: t,
      chatServerKey: n,
      userId: r
    });
    const f = me(() => dt.url.convertWebSocketToHttp(t), [t]), d = me(
      () => new uo({
        apiUrl: f,
        userMpAuthToken: e,
        chatServerKey: n
      }),
      [f, e, n]
    ), w = me(() => l && l.length > 0 ? l.map(({ execute: x, ...Ne }) => Ne) : [], [l]), y = lo(), A = $((x) => x.isModalOpen), S = $((x) => x.isCollapsed), _ = $((x) => x.currentMode), L = $((x) => x.openModal), P = $((x) => x.closeModal), N = $((x) => x.toggleCollapse), T = $((x) => x.toggleFullscreen), U = $((x) => x.setCurrentMode), D = $((x) => x.chatStatus), H = $((x) => x.setChatStatus), z = $((x) => x.streamingStatus), b = $((x) => x.setStreamingStatus), M = $(
      (x) => x.isLoadingConversation
    ), V = $(
      (x) => x.setIsLoadingConversation
    ), q = $((x) => x.conversationError), W = $(
      (x) => x.setConversationError
    ), ie = $((x) => x.setCurrentThreadId), O = $((x) => x.providerResId), ue = $((x) => x.setProviderResId), _e = $((x) => x.isDevSettingsOpen), m = $(
      (x) => x.setIsDevSettingsOpen
    ), ee = $((x) => x.isStreaming), ke = $((x) => x.setIsStreaming), g = $((x) => x.isThinking), ye = $((x) => x.setIsThinking), te = $((x) => x.streamingContent), se = $((x) => x.isHandlingTool);
    Ie(() => {
      o.mode && U(o.mode);
    }, [o.mode, U]), Ie(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const x = (Ne) => {
        Ne.key === "Escape" && _ === "modal" && A && P();
      };
      if (_ === "modal" && A)
        return document.addEventListener("keydown", x), () => document.removeEventListener("keydown", x);
    }, [_, A, P]);
    const {
      messages: De,
      setMessages: Ce,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: Ze,
      getReasoningStatus: Be,
      getReasoningDuration: it,
      getReasoningContentOnly: It,
      getReasoningTitle: Qe,
      getToolingTitle: gt,
      getToolingStatus: Ge,
      addMessage: mt,
      handleSetMessage: Tt,
      handleReasoningUpdate: at,
      handleChatFinished: st,
      handleChatError: ot,
      stopGeneration: Rt
    } = y, _t = Xe(null), Ct = Xe(null), At = ne(
      (x) => {
        var Ne, et;
        switch (x.type) {
          case nt.CHAT_COMPLETED:
            (Ne = x.data) != null && Ne.conversationId && ue(x.data.conversationId), st(), setTimeout(() => {
              var lt;
              (lt = Ct.current) == null || lt.focus();
            }, 0);
            break;
          case nt.CHAT_ERROR:
            (et = x.data) != null && et.error && ot(x.data.error);
            break;
          case nt.CONNECTION_LOST:
          case nt.CONNECTION_RESTORED:
        }
      },
      [st, ot, ue]
    ), { chatClient: xe, isConnected: E, isConnecting: R, connectChatClient: j } = Ns({
      // Authentication and server properties
      userMpAuthToken: e,
      chatServerUrl: t,
      chatServerKey: n,
      // Entity configuration
      userId: r,
      entityId: i,
      entityType: a,
      // Tools configuration
      tools: l,
      // Other properties
      contextHelpers: u,
      onSetMessage: Tt,
      onSystemEvent: At,
      onReasoningUpdate: at
    });
    $i(
      p,
      () => ({
        updateEntityId: (x, Ne) => {
          if (!xe) {
            console.warn(
              "ChatWrapper: Cannot update entityId - chat client not initialized"
            );
            return;
          }
          if (!O) {
            console.warn(
              "ChatWrapper: Cannot update entityId - no active conversation (providerResId not set)"
            );
            return;
          }
          if (!Ne) {
            console.warn(
              "ChatWrapper: Cannot update entityId - entityType is required"
            );
            return;
          }
          xe.updateEntityId(
            O,
            x,
            Ne.toString()
          ).catch((et) => {
            console.error(
              "ChatWrapper: Failed to update entity attachment:",
              et
            );
          });
        },
        updateMetadata: (x) => {
          if (!xe) {
            console.warn(
              "ChatWrapper: Cannot update metadata - chat client not initialized"
            );
            return;
          }
          if (!O) {
            console.warn(
              "ChatWrapper: Cannot update metadata - no active conversation (providerResId not set)"
            );
            return;
          }
          xe.updateMetadata(O, x).catch((Ne) => {
            console.error(
              "ChatWrapper: Failed to update thread metadata:",
              Ne
            );
          });
        }
      }),
      [xe, O]
    );
    const X = me(
      () => xe ? new ho(xe, {
        onError: o.onError
      }) : null,
      [xe, o.onError]
    );
    co({
      entityId: i,
      entityType: a,
      userId: r,
      httpApiUrl: f,
      userMpAuthToken: e,
      chatServerKey: n,
      messages: De,
      setMessages: Ce,
      setIsLoadingConversation: V,
      setConversationError: W,
      setCurrentThreadId: ie,
      setProviderResId: ue,
      metadata: s
    });
    const J = Xe(null), pe = ne(() => {
      J.current && cancelAnimationFrame(J.current), J.current = requestAnimationFrame(() => {
        var x;
        (x = _t.current) == null || x.scrollIntoView({ behavior: "smooth" }), J.current = null;
      });
    }, []);
    Ie(() => {
      pe();
    }, [De, pe]), Ie(() => {
      te && pe();
    }, [te, pe]), Ie(() => {
      o.onStreamingStatusChange && o.onStreamingStatusChange(z);
    }, [z, o]), Ie(() => () => {
      J.current && cancelAnimationFrame(J.current);
    }, []);
    const We = ne(
      async (x, Ne) => {
        if (X != null && X.canSubmit(x, ee, E)) {
          ke(!0), ye(!0), H(Ye.SUBMITTED), b(Sn.STARTING);
          try {
            const et = await X.submitMessage({
              message: x,
              media: Ne,
              providerResId: O || void 0
            });
            Ce((lt) => [...lt, et]), H(Ye.STREAMING);
          } catch (et) {
            ye(!1), H(Ye.ERROR);
            const lt = X.createErrorMessage(et);
            mt("system", lt), ke(!1), H(Ye.IDLE), b(Sn.IDLE);
          }
        }
      },
      [
        X,
        ee,
        E,
        Ce,
        ke,
        ye,
        H,
        b,
        mt,
        O
      ]
    ), Se = ne(
      async (x) => await d.uploadFiles(x),
      [d]
    ), Ke = me(
      () => dt.css.getContainerClasses(
        _,
        o.position,
        o.theme,
        S,
        o.constrainedHeight
      ),
      [
        _,
        o.position,
        o.theme,
        S,
        o.constrainedHeight
      ]
    ), Ee = ne(() => {
      _ === "modal" ? L() : N();
    }, [_, L, N]), he = ne(() => {
      m(!0);
    }, [m]), Ve = ne(
      (x) => {
        Ct.current && Ct.current.setText(x.description);
      },
      []
    ), be = me(
      () => ({
        messages: De,
        isStreaming: ee,
        isThinking: g,
        isHandlingTool: se
      }),
      [De, ee, g, se]
    ), on = me(
      () => ({
        isLoadingConversation: M,
        chatStatus: D,
        conversationError: q
      }),
      [M, D, q]
    ), Nt = me(
      () => {
        var x;
        return {
          headerName: o.headerName,
          headerDescription: o.headerDescription,
          placeholderTexts: o.placeholderTexts,
          chipName: o.chipName,
          chipLogo: o.chipLogo,
          suggestedPrompts: o.suggestedPrompts,
          clientTools: w,
          fileUploadEnabled: (x = o.features) == null ? void 0 : x.fileUpload
        };
      },
      [
        o.headerName,
        o.headerDescription,
        o.placeholderTexts,
        o.chipName,
        o.chipLogo,
        o.suggestedPrompts,
        (cn = o.features) == null ? void 0 : cn.fileUpload,
        w
      ]
    ), Mt = me(
      () => ({
        getReasoningTitle: Qe,
        getReasoningStatus: Be,
        getReasoningDuration: it,
        getReasoningContentOnly: It,
        getToolingTitle: gt,
        getToolingStatus: Ge
      }),
      [
        Qe,
        Be,
        it,
        It,
        gt,
        Ge
      ]
    ), ln = me(
      () => ({
        onSubmit: We,
        onFileUpload: Se,
        onStopGeneration: Rt,
        onPromptSelect: Ve
      }),
      [We, Se, Rt, Ve]
    ), Lt = me(
      () => ({
        ...be,
        ...on,
        ...Nt,
        ...Mt,
        ...ln,
        currentAssistantMessageIdRef: Ze,
        messagesEndRef: _t,
        chatInputRef: Ct
      }),
      [
        be,
        on,
        Nt,
        Mt,
        ln,
        Ze,
        _t,
        Ct
      ]
    );
    return me(
      () => dt.state.shouldShowBubble(
        _,
        A,
        S
      ),
      [_, A, S]
    ) ? /* @__PURE__ */ h(Qr, { children: /* @__PURE__ */ h(
      _o,
      {
        mode: _,
        headerName: o.headerName,
        bubbleText: o.bubbleText,
        showBubbleText: ((de = o.features) == null ? void 0 : de.showBubbleText) !== !1,
        onClick: Ee
      }
    ) }) : /* @__PURE__ */ h(Qr, { children: /* @__PURE__ */ h(
      go,
      {
        onError: (x) => {
          console.error("WebSocket error in ChatWrapper:", x), o.onError && o.onError(x);
        },
        children: /* @__PURE__ */ k("div", { className: Ke, style: o.customStyles, children: [
          /* @__PURE__ */ h(
            Co,
            {
              isConnected: E,
              isConnecting: R,
              onRetry: j
            }
          ),
          c && o.headerVisible === !1 && /* @__PURE__ */ h(
            "button",
            {
              className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
              onClick: he,
              title: "Developer Settings",
              children: /* @__PURE__ */ h(ra, { size: 16 })
            }
          ),
          dt.state.shouldShowHeader(o.headerVisible) && /* @__PURE__ */ h(
            ko,
            {
              headerName: o.headerName,
              mode: _,
              isCollapsed: S,
              isModalOpen: A,
              devMode: c,
              onClose: P,
              onToggleFullscreen: T,
              onToggleCollapse: N,
              onOpenSettings: he
            }
          ),
          !S && /* @__PURE__ */ h(
            mo,
            {
              onError: (x) => {
                console.error("File upload error:", x), o.onError && o.onError(x);
              },
              children: /* @__PURE__ */ h(fh, { value: Lt, children: /* @__PURE__ */ h(Ih, {}) })
            }
          ),
          /* @__PURE__ */ h(
            Es,
            {
              isOpen: _e,
              onClose: () => m(!1),
              apiUrl: f,
              userMpAuthToken: e,
              chatServerKey: n
            }
          )
        ] })
      }
    ) });
  }
);
qa.displayName = "ChatWrapperContainer";
const Qh = ji(qa);
var Rh = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(Rh || {});
export {
  _h as AnimatedPlaceholder,
  Ye as CHAT_STATUS,
  yo as ChatIcon,
  Qh as ChatWrapper,
  wo as CloseIcon,
  Eo as CollapseIcon,
  Co as ConnectionNotification,
  To as CopyIcon,
  Es as DevSettings,
  Rh as EntityType,
  So as FullscreenIcon,
  bh as InlineLoader,
  Wa as Loader,
  Re as PROCESSING_STATUS,
  yh as PromptInput,
  Eh as PromptInputButton,
  Kh as PromptInputModelSelect,
  Xh as PromptInputModelSelectContent,
  Yh as PromptInputModelSelectItem,
  qh as PromptInputModelSelectTrigger,
  Jh as PromptInputModelSelectValue,
  Th as PromptInputSubmit,
  Ka as PromptInputTextarea,
  wh as PromptInputToolbar,
  Sh as PromptInputTools,
  uh as Reasoning,
  Ga as ReasoningContent,
  Ba as ReasoningTrigger,
  Sn as STREAMING_STATUS,
  ra as SettingsIcon,
  xh as SuggestedPrompts,
  Oh as fetchThreadByConvUuid,
  Dh as fetchThreadMessages,
  is as fetchThreadMessagesV2,
  Lh as fetchUserThreads,
  Ph as isChatActive,
  Fh as isChatError,
  Hh as isChatIdle,
  Uh as isProcessingActive,
  zh as isProcessingComplete,
  Bh as isProcessingError,
  Zi as updateThread,
  Ki as updateThreadMetadata,
  Wh as useChatState,
  Vh as useConversationState,
  $h as useDevState,
  Gh as useLayoutState,
  jh as useThreadState,
  Zh as useUIState,
  $ as useUIStore
};
