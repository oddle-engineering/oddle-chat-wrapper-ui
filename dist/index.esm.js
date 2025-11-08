var Xa = Object.defineProperty;
var Ya = (e, t, n) => t in e ? Xa(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var G = (e, t, n) => Ya(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as h, jsxs as x, Fragment as zt } from "react/jsx-runtime";
import ut, { useState as se, useEffect as be, useCallback as re, useRef as qe, useMemo as fe, Component as pr, createContext as Ja, useContext as Qa, memo as ji, forwardRef as xn, useImperativeHandle as $i } from "react";
async function es(e, t) {
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
async function ts(e, t, n) {
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
async function Mh(e, t, n) {
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
async function Lh(e, t) {
  const n = `${e}/api/v1/threads/conv/${t}`, r = await fetch(n);
  if (!r.ok) {
    const i = await r.json().catch(() => ({
      error: "Thread not found"
    }));
    throw new Error(i.error || "Thread not found");
  }
  return r.json();
}
async function Oh(e, t, n) {
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
async function ns(e, t, n) {
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
async function rs(e, t, n, r) {
  const i = `${e}/api/v1/threads/provider/${t}`, a = {
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
}, is = (e) => e ? zr(e) : zr, as = (e) => e;
function ss(e, t = as) {
  const n = ut.useSyncExternalStore(
    e.subscribe,
    ut.useCallback(() => t(e.getState()), [e, t]),
    ut.useCallback(() => t(e.getInitialState()), [e, t])
  );
  return ut.useDebugValue(n), n;
}
const os = (e) => {
  const t = is(e), n = (r) => ss(t, r);
  return Object.assign(n, t), n;
}, ls = (e) => os, Br = { BASE_URL: "/", DEV: !1, MODE: "production", PROD: !0, SSR: !1 }, en = /* @__PURE__ */ new Map(), cn = (e) => {
  const t = en.get(e);
  return t ? Object.fromEntries(
    Object.entries(t.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, cs = (e, t, n) => {
  if (e === void 0)
    return {
      type: "untracked",
      connection: t.connect(n)
    };
  const r = en.get(n.name);
  if (r)
    return { type: "tracked", store: e, ...r };
  const i = {
    connection: t.connect(n),
    stores: {}
  };
  return en.set(n.name, i), { type: "tracked", store: e, ...i };
}, us = (e, t) => {
  if (t === void 0) return;
  const n = en.get(e);
  n && (delete n.stores[t], Object.keys(n.stores).length === 0 && en.delete(e));
}, hs = (e) => {
  var t, n;
  if (!e) return;
  const r = e.split(`
`), i = r.findIndex(
    (s) => s.includes("api.setState")
  );
  if (i < 0) return;
  const a = ((t = r[i + 1]) == null ? void 0 : t.trim()) || "";
  return (n = /.+ (.+) .+/.exec(a)) == null ? void 0 : n[1];
}, ds = (e, t = {}) => (n, r, i) => {
  const { enabled: a, anonymousActionType: s, store: o, ...l } = t;
  let c;
  try {
    c = (a ?? (Br ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!c)
    return e(n, r, i);
  const { connection: u, ...p } = cs(o, c, l);
  let f = !0;
  i.setState = (S, A, w) => {
    const k = n(S, A);
    if (!f) return k;
    const N = w === void 0 ? {
      type: s || hs(new Error().stack) || "anonymous"
    } : typeof w == "string" ? { type: w } : w;
    return o === void 0 ? (u == null || u.send(N, r()), k) : (u == null || u.send(
      {
        ...N,
        type: `${o}/${N.type}`
      },
      {
        ...cn(l.name),
        [o]: i.getState()
      }
    ), k);
  }, i.devtools = {
    cleanup: () => {
      u && typeof u.unsubscribe == "function" && u.unsubscribe(), us(l.name, o);
    }
  };
  const d = (...S) => {
    const A = f;
    f = !1, n(...S), f = A;
  }, y = e(i.setState, r, i);
  if (p.type === "untracked" ? u == null || u.init(y) : (p.stores[p.store] = i, u == null || u.init(
    Object.fromEntries(
      Object.entries(p.stores).map(([S, A]) => [
        S,
        S === p.store ? y : A.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let S = !1;
    const A = i.dispatch;
    i.dispatch = (...w) => {
      (Br ? "production" : void 0) !== "production" && w[0].type === "__setState" && !S && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), S = !0), A(...w);
    };
  }
  return u.subscribe((S) => {
    var A;
    switch (S.type) {
      case "ACTION":
        if (typeof S.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return On(
          S.payload,
          (w) => {
            if (w.type === "__setState") {
              if (o === void 0) {
                d(w.state);
                return;
              }
              Object.keys(w.state).length !== 1 && console.error(
                `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
              );
              const k = w.state[o];
              if (k == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(k) && d(k);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(w);
          }
        );
      case "DISPATCH":
        switch (S.payload.type) {
          case "RESET":
            return d(y), o === void 0 ? u == null ? void 0 : u.init(i.getState()) : u == null ? void 0 : u.init(cn(l.name));
          case "COMMIT":
            if (o === void 0) {
              u == null || u.init(i.getState());
              return;
            }
            return u == null ? void 0 : u.init(cn(l.name));
          case "ROLLBACK":
            return On(S.state, (w) => {
              if (o === void 0) {
                d(w), u == null || u.init(i.getState());
                return;
              }
              d(w[o]), u == null || u.init(cn(l.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return On(S.state, (w) => {
              if (o === void 0) {
                d(w);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(w[o]) && d(w[o]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: w } = S.payload, k = (A = w.computedStates.slice(-1)[0]) == null ? void 0 : A.state;
            if (!k) return;
            d(o === void 0 ? k : k[o]), u == null || u.send(
              null,
              // FIXME no-any
              w
            );
            return;
          }
          case "PAUSE_RECORDING":
            return f = !f;
        }
        return;
    }
  }), y;
}, ps = ds, On = (e, t) => {
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
}), Xe = {
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
}, ve = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, Dh = (e) => e === Xe.SUBMITTED || e === Xe.STREAMING, Ph = (e) => e === Xe.IDLE, Hh = (e) => e === Xe.ERROR, Fh = (e) => e === ve.PROCESSING, Uh = (e) => e === ve.COMPLETED, zh = (e) => e === ve.ERROR, gs = (e) => ({
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
  isDevSettingsOpen: !1,
  // Actions
  setIsDevSettingsOpen: (t) => e({ isDevSettingsOpen: t }),
  toggleDevSettings: () => e((t) => ({ isDevSettingsOpen: !t.isDevSettingsOpen }))
}), ws = (e) => ({
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
}), $ = ls()(
  ps(
    (...e) => ({
      ...fs(...e),
      ...gs(...e),
      ...ms(...e),
      ...Cs(...e),
      ...ys(...e),
      ...ws(...e)
    }),
    {
      name: "ChatUI-Store"
    }
  )
), Bh = () => $((e) => ({
  isModalOpen: e.isModalOpen,
  isCollapsed: e.isCollapsed,
  currentMode: e.currentMode,
  openModal: e.openModal,
  closeModal: e.closeModal,
  toggleCollapse: e.toggleCollapse,
  toggleFullscreen: e.toggleFullscreen
})), Gh = () => $((e) => ({
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
})), Wh = () => $((e) => ({
  currentThreadId: e.currentThreadId,
  providerResId: e.providerResId,
  setCurrentThreadId: e.setCurrentThreadId,
  setProviderResId: e.setProviderResId,
  clearThreadData: e.clearThreadData
})), jh = () => $((e) => ({
  isDevSettingsOpen: e.isDevSettingsOpen,
  setIsDevSettingsOpen: e.setIsDevSettingsOpen,
  toggleDevSettings: e.toggleDevSettings
})), Ss = ({
  isOpen: e,
  onClose: t,
  apiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  app: a = "UD21"
  // Default to UD21 if not specified
}) => {
  const [s, o] = se(null), [l, c] = se(""), [u, p] = se(""), f = $((D) => D.providerResId), [d, y] = se(""), [S, A] = se("BRAND"), [w, k] = se(""), [N, P] = se(""), [L, T] = se(!1), [z, O] = se(null), [F, U] = se(null), [b, M] = se("agent");
  be(() => {
    e && !s && W();
  }, [e]);
  const W = re(async () => {
    T(!0), O(null);
    try {
      const D = await es(n, {
        userMpAuthToken: r,
        chatServerKey: i
      });
      if (!D)
        throw new Error(`No configuration found for app: ${a}`);
      o(D), c(D.promptPath), p(D.versionUuid);
    } catch (D) {
      O(D instanceof Error ? D.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", D);
    } finally {
      T(!1);
    }
  }, [n, a, r, i]), q = re(async () => {
    if (s) {
      T(!0), O(null);
      try {
        const D = await ts(n, {
          app: s.app,
          promptPath: l,
          versionUuid: u,
          isDefault: s.isDefault
        }, {
          userMpAuthToken: r,
          chatServerKey: i
        });
        o(D), t(), window.location.reload();
      } catch (D) {
        O(D instanceof Error ? D.message : "Failed to update configuration"), console.error("Error updating agent configuration:", D);
      } finally {
        T(!1);
      }
    }
  }, [n, l, u, s, t, r, i]), j = re(async () => {
    if (!f) {
      O("No active conversation to attach");
      return;
    }
    T(!0), O(null), U(null);
    try {
      let D;
      if (N.trim())
        try {
          D = JSON.parse(N);
        } catch {
          throw new Error("Invalid JSON in metadata field");
        }
      const ce = {};
      d && (ce.entityId = d, ce.entityType = S || null), w && (ce.tag = w), D && (ce.metadata = D), await rs(
        n,
        f,
        ce,
        {
          userMpAuthToken: r,
          chatServerKey: i
        }
      ), U("Thread updated successfully!"), setTimeout(() => {
        y(""), A("BRAND"), k(""), P(""), U(null);
      }, 2e3);
    } catch (D) {
      O(D instanceof Error ? D.message : "Failed to update thread"), console.error("Error updating thread:", D);
    } finally {
      T(!1);
    }
  }, [f, n, d, S, w, N, r, i]), ne = re(() => {
    s && (c(s.promptPath), p(s.versionUuid)), O(null), t();
  }, [s, t]);
  return e ? /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ x("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ x("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ h("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: ne,
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
    /* @__PURE__ */ x("div", { className: "chat-wrapper__dev-settings-tabs", children: [
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
    /* @__PURE__ */ x("div", { className: "chat-wrapper__dev-settings-content", children: [
      F && /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-success", children: F }),
      L && /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      z && /* @__PURE__ */ x("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ x("p", { children: [
          "Error: ",
          z
        ] }),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: b === "agent" ? W : void 0,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      b === "agent" && s && !L && /* @__PURE__ */ x(zt, { children: [
        /* @__PURE__ */ x("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: l,
              onChange: (D) => c(D.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: L
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ x("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: u,
              onChange: (D) => p(D.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: L
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ x("div", { className: "chat-wrapper__dev-settings-field", children: [
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
      b === "thread" && !L && /* @__PURE__ */ x(zt, { children: [
        /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-info", children: /* @__PURE__ */ x("p", { children: [
          /* @__PURE__ */ h("strong", { children: "Provider Resource ID:" }),
          " ",
          f || "No active conversation"
        ] }) }),
        /* @__PURE__ */ x("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "entity-id", children: "Entity ID:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "entity-id",
              type: "text",
              value: d,
              onChange: (D) => y(D.target.value),
              placeholder: "e.g., brand_123 or account_456",
              className: "chat-wrapper__dev-settings-input",
              disabled: L || !f
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "The brand or account ID to attach this thread to." })
        ] }),
        /* @__PURE__ */ x("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "entity-type", children: "Entity Type:" }),
          /* @__PURE__ */ x(
            "select",
            {
              id: "entity-type",
              value: S,
              onChange: (D) => A(D.target.value),
              className: "chat-wrapper__dev-settings-input",
              disabled: L || !f,
              children: [
                /* @__PURE__ */ h("option", { value: "", children: "-- Select Type --" }),
                /* @__PURE__ */ h("option", { value: "BRAND", children: "BRAND" }),
                /* @__PURE__ */ h("option", { value: "ACCOUNT", children: "ACCOUNT" })
              ]
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Type of entity (BRAND or ACCOUNT)." })
        ] }),
        /* @__PURE__ */ x("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "tag", children: "Tag:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "tag",
              type: "text",
              value: w,
              onChange: (D) => k(D.target.value),
              placeholder: "e.g., customer-inquiry, support",
              className: "chat-wrapper__dev-settings-input",
              disabled: L || !f
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Optional tag for categorizing the thread." })
        ] }),
        /* @__PURE__ */ x("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "metadata", children: "Metadata (JSON):" }),
          /* @__PURE__ */ h(
            "textarea",
            {
              id: "metadata",
              value: N,
              onChange: (D) => P(D.target.value),
              placeholder: '{"priority": "high", "category": "billing"}',
              className: "chat-wrapper__dev-settings-input",
              rows: 4,
              disabled: L || !f
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Custom metadata as JSON object. Leave empty for no metadata." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ x("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: ne,
          disabled: L,
          children: "Cancel"
        }
      ),
      b === "agent" && /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: q,
          disabled: L || !s,
          children: L ? "Saving..." : "Save & Reload"
        }
      ),
      b === "thread" && /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: j,
          disabled: L || !f,
          children: L ? "Updating..." : "Update Thread"
        }
      )
    ] })
  ] }) }) : null;
}, Es = {
  maxReconnectAttempts: 5,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, Gr = {
  NORMAL: 1e3,
  GOING_AWAY: 1001
};
var nt = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(nt || {}), yt = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e))(yt || {}), De = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(De || {}), gn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(gn || {}), xt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(xt || {});
class Ht {
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
      type: yt.CHAT_MESSAGE,
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
class Ts {
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
        Ht.connectionLost("Max reconnection attempts reached")
      ));
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    (a = this.onSystemEvent) == null || a.call(this, Ht.reconnecting(t, n)), this.reconnectTimer = window.setTimeout(() => {
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
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Ht.connectionRestored()), (n = this.onOpen) == null || n.call(this);
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
class _s {
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
class Sn {
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
class Zi {
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
class ks extends Zi {
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
    const l = Sn.createReasoningCall(
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
class xs extends Zi {
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
      const a = Sn.createLatitudeToolCall(
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
      const a = Sn.createLatitudeToolCall(
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
class bs {
  constructor(t, n = {}) {
    G(this, "reasoningHandler");
    G(this, "toolHandler");
    G(this, "handlers");
    G(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new ks(t.onReasoningUpdate), this.toolHandler = new xs(n, t.onReasoningUpdate);
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
      case gn.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case gn.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case gn.CONTENT_DELTA:
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
        const i = Sn.createServerToolCall(
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
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Ht.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Ht.chatError(t.error || "Unknown error"));
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
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Ht.chatError(t.error || "Unknown WebSocket error"));
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
async function vs(e, t) {
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
function Jn(e) {
  if (!e.success || !e.ticket || !e.expiresAt)
    return !1;
  const t = new Date(e.expiresAt).getTime();
  return Date.now() < t - 3e4;
}
function Vr(e) {
  const t = Jn(e), n = new Date(e.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: t,
    expiresIn: i,
    expired: r >= n
  };
}
class Is {
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
    return this.ticket && Jn(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
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
      return this.ticket = await vs(this.apiUrl, this.authData), console.log("TicketManager: Ticket received successfully", {
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
    return this.ticket ? Jn(this.ticket) : !1;
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
class Rs {
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
    this.config = {
      ...Es
    }, this.connectionState = new _s(), this.wsManager = new Ts(this.config, this.connectionState), this.messageHandler = new bs({}), this.setupWebSocketHandlers();
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
    ), this.handleAuthenticationFailure(n)), (n == null ? void 0 : n.type) === De.TOOLS_CONFIGURED && ((r = this.initResolve) == null || r.call(this)), (n == null ? void 0 : n.type) === De.SESSION_ESTABLISHED && (this.toolSchemas && this.toolSchemas.length > 0 ? this.sendToolConfiguration() : (i = this.initResolve) == null || i.call(this));
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
    return this.setupEventHandlers(t), this.setupToolsAndContext(t), this.updateConfig(t), this.ticketManager = new Is(
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
   * Update entity information (entityId and/or entityType)
   * This is useful when a conversation starts without an entity,
   * then later gets associated with one (e.g., user creates/selects an entity)
   * 
   * @param entityId - New entity ID to associate with this conversation
   * @param entityType - New entity type (optional, only if changed)
   * 
   * Note: This updates the auth data in TicketManager, so future ticket
   * renewals will include the new entity information
   */
  updateEntityId(t, n) {
    if (!this.ticketManager) {
      console.warn("WebSocketChatClient: Cannot update entityId - TicketManager not initialized");
      return;
    }
    console.log(`WebSocketChatClient: Updating entity - ID: ${t}, Type: ${n || "unchanged"}`);
    const r = { entityId: t };
    n !== void 0 && (r.entityType = n), this.ticketManager.updateAuthData(r), console.log("WebSocketChatClient: Entity information updated successfully");
  }
}
function As({
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
  const [p, f] = se(null), [d, y] = se(!1), [S, A] = se(!1), w = qe(null), k = qe(l), N = qe(c), P = qe(u);
  be(() => {
    k.current = l, N.current = c, P.current = u;
  }, [l, c, u]);
  const { toolSchemas: L, clientToolExecutors: T } = fe(() => {
    if (s && s.length > 0) {
      const F = s.map(({ execute: b, ...M }) => M), U = {};
      return s.forEach((b) => {
        U[b.name] = b.execute;
      }), {
        toolSchemas: F,
        clientToolExecutors: U
      };
    }
    return {
      toolSchemas: [],
      clientToolExecutors: {}
    };
  }, [s]), z = re(async () => {
    try {
      if (A(!0), !e)
        throw new Error("userMpAuthToken is required");
      if (!t)
        throw new Error("chatServerUrl is required");
      if (!n)
        throw new Error("chatServerKey is required");
      if (!r)
        throw new Error("userId is required");
      const F = new Rs();
      w.current = F, f(F);
      const U = o || {};
      await F.onInit({
        // Authentication and server properties
        userMpAuthToken: e,
        chatServerUrl: t,
        chatServerKey: n,
        userId: r,
        entityId: i,
        entityType: a == null ? void 0 : a.toString(),
        // Tools configuration
        toolSchemas: L,
        clientTools: T,
        contextHelpers: U,
        onSetMessage: k.current,
        onSystemEvent: N.current,
        onReasoningUpdate: P.current
      }), y(!0);
    } catch (F) {
      console.error("Error connecting WebSocketChatClient:", F), y(!1);
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
    L,
    T,
    o
    // Removed onSetMessage, onSystemEvent, onReasoningUpdate to prevent reconnections
  ]), O = re(() => {
    w.current && (w.current.disconnect(), w.current = null), f(null), y(!1);
  }, []);
  return be(() => (z(), () => {
    O();
  }), [z, O]), be(() => {
    const F = setInterval(() => {
      if (w.current) {
        const U = w.current.getConnectionStatus();
        y(U.connected);
      }
    }, 1e3);
    return () => clearInterval(F);
  }, []), {
    chatClient: p,
    isConnected: d,
    isConnecting: S,
    connectChatClient: z,
    disconnectChatClient: O
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: Ki,
  setPrototypeOf: Wr,
  isFrozen: Ns,
  getPrototypeOf: Ms,
  getOwnPropertyDescriptor: Ls
} = Object;
let {
  freeze: Ne,
  seal: Ye,
  create: Qn
} = Object, {
  apply: er,
  construct: tr
} = typeof Reflect < "u" && Reflect;
Ne || (Ne = function(t) {
  return t;
});
Ye || (Ye = function(t) {
  return t;
});
er || (er = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
tr || (tr = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const un = Me(Array.prototype.forEach), Os = Me(Array.prototype.lastIndexOf), jr = Me(Array.prototype.pop), Wt = Me(Array.prototype.push), Ds = Me(Array.prototype.splice), mn = Me(String.prototype.toLowerCase), Dn = Me(String.prototype.toString), Pn = Me(String.prototype.match), jt = Me(String.prototype.replace), Ps = Me(String.prototype.indexOf), Hs = Me(String.prototype.trim), tt = Me(Object.prototype.hasOwnProperty), Ae = Me(RegExp.prototype.test), $t = Fs(TypeError);
function Me(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return er(e, t, r);
  };
}
function Fs(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return tr(e, n);
  };
}
function J(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : mn;
  Wr && Wr(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (Ns(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function Us(e) {
  for (let t = 0; t < e.length; t++)
    tt(e, t) || (e[t] = null);
  return e;
}
function wt(e) {
  const t = Qn(null);
  for (const [n, r] of Ki(e))
    tt(e, n) && (Array.isArray(r) ? t[n] = Us(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = wt(r) : t[n] = r);
  return t;
}
function Zt(e, t) {
  for (; e !== null; ) {
    const r = Ls(e, t);
    if (r) {
      if (r.get)
        return Me(r.get);
      if (typeof r.value == "function")
        return Me(r.value);
    }
    e = Ms(e);
  }
  function n() {
    return null;
  }
  return n;
}
const $r = Ne(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Hn = Ne(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Fn = Ne(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), zs = Ne(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Un = Ne(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Bs = Ne(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Zr = Ne(["#text"]), Kr = Ne(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), zn = Ne(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), qr = Ne(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), hn = Ne(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Gs = Ye(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Vs = Ye(/<%[\w\W]*|[\w\W]*%>/gm), Ws = Ye(/\$\{[\w\W]*/gm), js = Ye(/^data-[\-\w.\u00B7-\uFFFF]+$/), $s = Ye(/^aria-[\-\w]+$/), qi = Ye(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Zs = Ye(/^(?:\w+script|data):/i), Ks = Ye(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Xi = Ye(/^html$/i), qs = Ye(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Xr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: $s,
  ATTR_WHITESPACE: Ks,
  CUSTOM_ELEMENT: qs,
  DATA_ATTR: js,
  DOCTYPE_NAME: Xi,
  ERB_EXPR: Vs,
  IS_ALLOWED_URI: qi,
  IS_SCRIPT_OR_DATA: Zs,
  MUSTACHE_EXPR: Gs,
  TMPLIT_EXPR: Ws
});
const Kt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Xs = function() {
  return typeof window > "u" ? null : window;
}, Ys = function(t, n) {
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
function Yi() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Xs();
  const t = (B) => Yi(B);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== Kt.document || !e.Element)
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
  } = e, y = l.prototype, S = Zt(y, "cloneNode"), A = Zt(y, "remove"), w = Zt(y, "nextSibling"), k = Zt(y, "childNodes"), N = Zt(y, "parentNode");
  if (typeof s == "function") {
    const B = n.createElement("template");
    B.content && B.content.ownerDocument && (n = B.content.ownerDocument);
  }
  let P, L = "";
  const {
    implementation: T,
    createNodeIterator: z,
    createDocumentFragment: O,
    getElementsByTagName: F
  } = n, {
    importNode: U
  } = r;
  let b = Yr();
  t.isSupported = typeof Ki == "function" && typeof N == "function" && T && T.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: M,
    ERB_EXPR: W,
    TMPLIT_EXPR: q,
    DATA_ATTR: j,
    ARIA_ATTR: ne,
    IS_SCRIPT_OR_DATA: D,
    ATTR_WHITESPACE: ce,
    CUSTOM_ELEMENT: Te
  } = Xr;
  let {
    IS_ALLOWED_URI: m
  } = Xr, ee = null;
  const Re = J({}, [...$r, ...Hn, ...Fn, ...Un, ...Zr]);
  let g = null;
  const Se = J({}, [...Kr, ...zn, ...qr, ...hn]);
  let te = Object.seal(Qn(null, {
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
  })), ae = null, Fe = null;
  const me = Object.seal(Qn(null, {
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
  let je = !0, Ue = !0, it = !1, It = !0, Je = !1, ft = !0, ze = !1, St = !1, Et = !1, Qe = !1, at = !1, st = !1, Tt = !0, ot = !1;
  const Vt = "user-content-";
  let $e = !0, et = !1, E = {}, R = null;
  const V = J({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let X = null;
  const Q = J({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ce = null;
  const Be = J({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), _e = "http://www.w3.org/1998/Math/MathML", Ze = "http://www.w3.org/2000/svg", ye = "http://www.w3.org/1999/xhtml";
  let he = ye, Ge = !1, ke = null;
  const sn = J({}, [_e, Ze, ye], Dn);
  let Rt = J({}, ["mi", "mo", "mn", "ms", "mtext"]), At = J({}, ["annotation-xml"]);
  const An = J({}, ["title", "style", "font", "a", "script"]);
  let Ot = null;
  const on = ["application/xhtml+xml", "text/html"], ln = "text/html";
  let _ = null, ge = null;
  const _t = n.createElement("form"), gt = function(C) {
    return C instanceof RegExp || C instanceof Function;
  }, Nn = function() {
    let C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(ge && ge === C)) {
      if ((!C || typeof C != "object") && (C = {}), C = wt(C), Ot = // eslint-disable-next-line unicorn/prefer-includes
      on.indexOf(C.PARSER_MEDIA_TYPE) === -1 ? ln : C.PARSER_MEDIA_TYPE, _ = Ot === "application/xhtml+xml" ? Dn : mn, ee = tt(C, "ALLOWED_TAGS") ? J({}, C.ALLOWED_TAGS, _) : Re, g = tt(C, "ALLOWED_ATTR") ? J({}, C.ALLOWED_ATTR, _) : Se, ke = tt(C, "ALLOWED_NAMESPACES") ? J({}, C.ALLOWED_NAMESPACES, Dn) : sn, Ce = tt(C, "ADD_URI_SAFE_ATTR") ? J(wt(Be), C.ADD_URI_SAFE_ATTR, _) : Be, X = tt(C, "ADD_DATA_URI_TAGS") ? J(wt(Q), C.ADD_DATA_URI_TAGS, _) : Q, R = tt(C, "FORBID_CONTENTS") ? J({}, C.FORBID_CONTENTS, _) : V, ae = tt(C, "FORBID_TAGS") ? J({}, C.FORBID_TAGS, _) : wt({}), Fe = tt(C, "FORBID_ATTR") ? J({}, C.FORBID_ATTR, _) : wt({}), E = tt(C, "USE_PROFILES") ? C.USE_PROFILES : !1, je = C.ALLOW_ARIA_ATTR !== !1, Ue = C.ALLOW_DATA_ATTR !== !1, it = C.ALLOW_UNKNOWN_PROTOCOLS || !1, It = C.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Je = C.SAFE_FOR_TEMPLATES || !1, ft = C.SAFE_FOR_XML !== !1, ze = C.WHOLE_DOCUMENT || !1, Qe = C.RETURN_DOM || !1, at = C.RETURN_DOM_FRAGMENT || !1, st = C.RETURN_TRUSTED_TYPE || !1, Et = C.FORCE_BODY || !1, Tt = C.SANITIZE_DOM !== !1, ot = C.SANITIZE_NAMED_PROPS || !1, $e = C.KEEP_CONTENT !== !1, et = C.IN_PLACE || !1, m = C.ALLOWED_URI_REGEXP || qi, he = C.NAMESPACE || ye, Rt = C.MATHML_TEXT_INTEGRATION_POINTS || Rt, At = C.HTML_INTEGRATION_POINTS || At, te = C.CUSTOM_ELEMENT_HANDLING || {}, C.CUSTOM_ELEMENT_HANDLING && gt(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (te.tagNameCheck = C.CUSTOM_ELEMENT_HANDLING.tagNameCheck), C.CUSTOM_ELEMENT_HANDLING && gt(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (te.attributeNameCheck = C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), C.CUSTOM_ELEMENT_HANDLING && typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (te.allowCustomizedBuiltInElements = C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Je && (Ue = !1), at && (Qe = !0), E && (ee = J({}, Zr), g = [], E.html === !0 && (J(ee, $r), J(g, Kr)), E.svg === !0 && (J(ee, Hn), J(g, zn), J(g, hn)), E.svgFilters === !0 && (J(ee, Fn), J(g, zn), J(g, hn)), E.mathMl === !0 && (J(ee, Un), J(g, qr), J(g, hn))), C.ADD_TAGS && (typeof C.ADD_TAGS == "function" ? me.tagCheck = C.ADD_TAGS : (ee === Re && (ee = wt(ee)), J(ee, C.ADD_TAGS, _))), C.ADD_ATTR && (typeof C.ADD_ATTR == "function" ? me.attributeCheck = C.ADD_ATTR : (g === Se && (g = wt(g)), J(g, C.ADD_ATTR, _))), C.ADD_URI_SAFE_ATTR && J(Ce, C.ADD_URI_SAFE_ATTR, _), C.FORBID_CONTENTS && (R === V && (R = wt(R)), J(R, C.FORBID_CONTENTS, _)), $e && (ee["#text"] = !0), ze && J(ee, ["html", "head", "body"]), ee.table && (J(ee, ["tbody"]), delete ae.tbody), C.TRUSTED_TYPES_POLICY) {
        if (typeof C.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw $t('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof C.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw $t('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        P = C.TRUSTED_TYPES_POLICY, L = P.createHTML("");
      } else
        P === void 0 && (P = Ys(d, i)), P !== null && typeof L == "string" && (L = P.createHTML(""));
      Ne && Ne(C), ge = C;
    }
  }, Rr = J({}, [...Hn, ...Fn, ...zs]), Ar = J({}, [...Un, ...Bs]), Ka = function(C) {
    let I = N(C);
    (!I || !I.tagName) && (I = {
      namespaceURI: he,
      tagName: "template"
    });
    const H = mn(C.tagName), ue = mn(I.tagName);
    return ke[C.namespaceURI] ? C.namespaceURI === Ze ? I.namespaceURI === ye ? H === "svg" : I.namespaceURI === _e ? H === "svg" && (ue === "annotation-xml" || Rt[ue]) : !!Rr[H] : C.namespaceURI === _e ? I.namespaceURI === ye ? H === "math" : I.namespaceURI === Ze ? H === "math" && At[ue] : !!Ar[H] : C.namespaceURI === ye ? I.namespaceURI === Ze && !At[ue] || I.namespaceURI === _e && !Rt[ue] ? !1 : !Ar[H] && (An[H] || !Rr[H]) : !!(Ot === "application/xhtml+xml" && ke[C.namespaceURI]) : !1;
  }, lt = function(C) {
    Wt(t.removed, {
      element: C
    });
    try {
      N(C).removeChild(C);
    } catch {
      A(C);
    }
  }, Nt = function(C, I) {
    try {
      Wt(t.removed, {
        attribute: I.getAttributeNode(C),
        from: I
      });
    } catch {
      Wt(t.removed, {
        attribute: null,
        from: I
      });
    }
    if (I.removeAttribute(C), C === "is")
      if (Qe || at)
        try {
          lt(I);
        } catch {
        }
      else
        try {
          I.setAttribute(C, "");
        } catch {
        }
  }, Nr = function(C) {
    let I = null, H = null;
    if (Et)
      C = "<remove></remove>" + C;
    else {
      const de = Pn(C, /^[\r\n\t ]+/);
      H = de && de[0];
    }
    Ot === "application/xhtml+xml" && he === ye && (C = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + C + "</body></html>");
    const ue = P ? P.createHTML(C) : C;
    if (he === ye)
      try {
        I = new f().parseFromString(ue, Ot);
      } catch {
      }
    if (!I || !I.documentElement) {
      I = T.createDocument(he, "template", null);
      try {
        I.documentElement.innerHTML = Ge ? L : ue;
      } catch {
      }
    }
    const xe = I.body || I.documentElement;
    return C && H && xe.insertBefore(n.createTextNode(H), xe.childNodes[0] || null), he === ye ? F.call(I, ze ? "html" : "body")[0] : ze ? I.documentElement : xe;
  }, Mr = function(C) {
    return z.call(
      C.ownerDocument || C,
      C,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, Mn = function(C) {
    return C instanceof p && (typeof C.nodeName != "string" || typeof C.textContent != "string" || typeof C.removeChild != "function" || !(C.attributes instanceof u) || typeof C.removeAttribute != "function" || typeof C.setAttribute != "function" || typeof C.namespaceURI != "string" || typeof C.insertBefore != "function" || typeof C.hasChildNodes != "function");
  }, Lr = function(C) {
    return typeof o == "function" && C instanceof o;
  };
  function mt(B, C, I) {
    un(B, (H) => {
      H.call(t, C, I, ge);
    });
  }
  const Or = function(C) {
    let I = null;
    if (mt(b.beforeSanitizeElements, C, null), Mn(C))
      return lt(C), !0;
    const H = _(C.nodeName);
    if (mt(b.uponSanitizeElement, C, {
      tagName: H,
      allowedTags: ee
    }), ft && C.hasChildNodes() && !Lr(C.firstElementChild) && Ae(/<[/\w!]/g, C.innerHTML) && Ae(/<[/\w!]/g, C.textContent) || C.nodeType === Kt.progressingInstruction || ft && C.nodeType === Kt.comment && Ae(/<[/\w]/g, C.data))
      return lt(C), !0;
    if (!(me.tagCheck instanceof Function && me.tagCheck(H)) && (!ee[H] || ae[H])) {
      if (!ae[H] && Pr(H) && (te.tagNameCheck instanceof RegExp && Ae(te.tagNameCheck, H) || te.tagNameCheck instanceof Function && te.tagNameCheck(H)))
        return !1;
      if ($e && !R[H]) {
        const ue = N(C) || C.parentNode, xe = k(C) || C.childNodes;
        if (xe && ue) {
          const de = xe.length;
          for (let Le = de - 1; Le >= 0; --Le) {
            const Ct = S(xe[Le], !0);
            Ct.__removalCount = (C.__removalCount || 0) + 1, ue.insertBefore(Ct, w(C));
          }
        }
      }
      return lt(C), !0;
    }
    return C instanceof l && !Ka(C) || (H === "noscript" || H === "noembed" || H === "noframes") && Ae(/<\/no(script|embed|frames)/i, C.innerHTML) ? (lt(C), !0) : (Je && C.nodeType === Kt.text && (I = C.textContent, un([M, W, q], (ue) => {
      I = jt(I, ue, " ");
    }), C.textContent !== I && (Wt(t.removed, {
      element: C.cloneNode()
    }), C.textContent = I)), mt(b.afterSanitizeElements, C, null), !1);
  }, Dr = function(C, I, H) {
    if (Tt && (I === "id" || I === "name") && (H in n || H in _t))
      return !1;
    if (!(Ue && !Fe[I] && Ae(j, I))) {
      if (!(je && Ae(ne, I))) {
        if (!(me.attributeCheck instanceof Function && me.attributeCheck(I, C))) {
          if (!g[I] || Fe[I]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Pr(C) && (te.tagNameCheck instanceof RegExp && Ae(te.tagNameCheck, C) || te.tagNameCheck instanceof Function && te.tagNameCheck(C)) && (te.attributeNameCheck instanceof RegExp && Ae(te.attributeNameCheck, I) || te.attributeNameCheck instanceof Function && te.attributeNameCheck(I, C)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              I === "is" && te.allowCustomizedBuiltInElements && (te.tagNameCheck instanceof RegExp && Ae(te.tagNameCheck, H) || te.tagNameCheck instanceof Function && te.tagNameCheck(H)))
            ) return !1;
          } else if (!Ce[I]) {
            if (!Ae(m, jt(H, ce, ""))) {
              if (!((I === "src" || I === "xlink:href" || I === "href") && C !== "script" && Ps(H, "data:") === 0 && X[C])) {
                if (!(it && !Ae(D, jt(H, ce, "")))) {
                  if (H)
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
    return C !== "annotation-xml" && Pn(C, Te);
  }, Hr = function(C) {
    mt(b.beforeSanitizeAttributes, C, null);
    const {
      attributes: I
    } = C;
    if (!I || Mn(C))
      return;
    const H = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: g,
      forceKeepAttr: void 0
    };
    let ue = I.length;
    for (; ue--; ) {
      const xe = I[ue], {
        name: de,
        namespaceURI: Le,
        value: Ct
      } = xe, Dt = _(de), Ln = Ct;
      let Ee = de === "value" ? Ln : Hs(Ln);
      if (H.attrName = Dt, H.attrValue = Ee, H.keepAttr = !0, H.forceKeepAttr = void 0, mt(b.uponSanitizeAttribute, C, H), Ee = H.attrValue, ot && (Dt === "id" || Dt === "name") && (Nt(de, C), Ee = Vt + Ee), ft && Ae(/((--!?|])>)|<\/(style|title|textarea)/i, Ee)) {
        Nt(de, C);
        continue;
      }
      if (Dt === "attributename" && Pn(Ee, "href")) {
        Nt(de, C);
        continue;
      }
      if (H.forceKeepAttr)
        continue;
      if (!H.keepAttr) {
        Nt(de, C);
        continue;
      }
      if (!It && Ae(/\/>/i, Ee)) {
        Nt(de, C);
        continue;
      }
      Je && un([M, W, q], (Ur) => {
        Ee = jt(Ee, Ur, " ");
      });
      const Fr = _(C.nodeName);
      if (!Dr(Fr, Dt, Ee)) {
        Nt(de, C);
        continue;
      }
      if (P && typeof d == "object" && typeof d.getAttributeType == "function" && !Le)
        switch (d.getAttributeType(Fr, Dt)) {
          case "TrustedHTML": {
            Ee = P.createHTML(Ee);
            break;
          }
          case "TrustedScriptURL": {
            Ee = P.createScriptURL(Ee);
            break;
          }
        }
      if (Ee !== Ln)
        try {
          Le ? C.setAttributeNS(Le, de, Ee) : C.setAttribute(de, Ee), Mn(C) ? lt(C) : jr(t.removed);
        } catch {
          Nt(de, C);
        }
    }
    mt(b.afterSanitizeAttributes, C, null);
  }, qa = function B(C) {
    let I = null;
    const H = Mr(C);
    for (mt(b.beforeSanitizeShadowDOM, C, null); I = H.nextNode(); )
      mt(b.uponSanitizeShadowNode, I, null), Or(I), Hr(I), I.content instanceof a && B(I.content);
    mt(b.afterSanitizeShadowDOM, C, null);
  };
  return t.sanitize = function(B) {
    let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, I = null, H = null, ue = null, xe = null;
    if (Ge = !B, Ge && (B = "<!-->"), typeof B != "string" && !Lr(B))
      if (typeof B.toString == "function") {
        if (B = B.toString(), typeof B != "string")
          throw $t("dirty is not a string, aborting");
      } else
        throw $t("toString is not a function");
    if (!t.isSupported)
      return B;
    if (St || Nn(C), t.removed = [], typeof B == "string" && (et = !1), et) {
      if (B.nodeName) {
        const Ct = _(B.nodeName);
        if (!ee[Ct] || ae[Ct])
          throw $t("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (B instanceof o)
      I = Nr("<!---->"), H = I.ownerDocument.importNode(B, !0), H.nodeType === Kt.element && H.nodeName === "BODY" || H.nodeName === "HTML" ? I = H : I.appendChild(H);
    else {
      if (!Qe && !Je && !ze && // eslint-disable-next-line unicorn/prefer-includes
      B.indexOf("<") === -1)
        return P && st ? P.createHTML(B) : B;
      if (I = Nr(B), !I)
        return Qe ? null : st ? L : "";
    }
    I && Et && lt(I.firstChild);
    const de = Mr(et ? B : I);
    for (; ue = de.nextNode(); )
      Or(ue), Hr(ue), ue.content instanceof a && qa(ue.content);
    if (et)
      return B;
    if (Qe) {
      if (at)
        for (xe = O.call(I.ownerDocument); I.firstChild; )
          xe.appendChild(I.firstChild);
      else
        xe = I;
      return (g.shadowroot || g.shadowrootmode) && (xe = U.call(r, xe, !0)), xe;
    }
    let Le = ze ? I.outerHTML : I.innerHTML;
    return ze && ee["!doctype"] && I.ownerDocument && I.ownerDocument.doctype && I.ownerDocument.doctype.name && Ae(Xi, I.ownerDocument.doctype.name) && (Le = "<!DOCTYPE " + I.ownerDocument.doctype.name + `>
` + Le), Je && un([M, W, q], (Ct) => {
      Le = jt(Le, Ct, " ");
    }), P && st ? P.createHTML(Le) : Le;
  }, t.setConfig = function() {
    let B = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Nn(B), St = !0;
  }, t.clearConfig = function() {
    ge = null, St = !1;
  }, t.isValidAttribute = function(B, C, I) {
    ge || Nn({});
    const H = _(B), ue = _(C);
    return Dr(H, ue, I);
  }, t.addHook = function(B, C) {
    typeof C == "function" && Wt(b[B], C);
  }, t.removeHook = function(B, C) {
    if (C !== void 0) {
      const I = Os(b[B], C);
      return I === -1 ? void 0 : Ds(b[B], I, 1)[0];
    }
    return jr(b[B]);
  }, t.removeHooks = function(B) {
    b[B] = [];
  }, t.removeAllHooks = function() {
    b = Yr();
  }, t;
}
var Js = Yi();
function Qs(e) {
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
function En(e, t = !1) {
  return e;
}
function eo(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function Jr(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || Qs(e));
  } catch {
    return !1;
  }
}
function to() {
  Js.addHook("beforeSanitizeAttributes", (e) => {
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
to();
function no() {
  const [e, t] = se([]), n = re(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = re(
    (s, o) => {
      const c = En(o, s === "assistant");
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
  ), i = re(
    (s, o) => {
      t(
        (l) => l.map(
          (c) => c.id === s ? { ...c, ...o } : c
        )
      );
    },
    []
  ), a = re(
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
function ro() {
  const e = $((k) => k.isStreaming), t = $((k) => k.setIsStreaming), n = $((k) => k.isThinking), r = $((k) => k.setIsThinking), i = $((k) => k.streamingContent), a = $((k) => k.setStreamingContent), s = $((k) => k.isHandlingTool), o = $((k) => k.setIsHandlingTool), l = $((k) => k.startStreaming), c = $((k) => k.stopStreaming), u = $((k) => k.clearStreamingBuffers), p = $((k) => k.resetToolHandling), f = qe(""), d = fe(() => ({
    get current() {
      return $.getState().currentAssistantMessageId;
    },
    set current(k) {
      $.getState().setCurrentAssistantMessageId(k);
    }
  }), []), y = re((k) => {
    k ? l(k) : (t(!0), r(!0), a("")), f.current = "";
  }, [l, t, r, a]), S = re(() => {
    c(), f.current = "";
  }, [c]), A = re(() => {
    p();
  }, [p]), w = re(() => {
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
    startStreaming: y,
    stopStreaming: S,
    resetToolHandling: A,
    clearStreamingBuffers: w
  };
}
function io() {
  const e = fe(
    () => (i, a) => a === !1 ? we.isErrorMessage(i) ? ve.ERROR : ve.COMPLETED : we.isCompletedMessage(i) ? ve.COMPLETED : we.isErrorMessage(i) ? ve.ERROR : ve.PROCESSING,
    []
  ), t = fe(
    () => (i) => we.extractDuration(i),
    []
  ), n = fe(
    () => (i) => we.cleanReasoningContent(i),
    []
  ), r = fe(
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
function ao() {
  const e = fe(
    () => (n, r) => r === !1 ? n.includes(Z.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : n.includes(Z.COMPLETED_MARKER) || n.includes("✅") ? "Tool Completed" : n.includes(Z.ERROR_MARKER) ? "Tool Error" : (n.includes(Z.HANDLING_MARKER), "Tool Processing..."),
    []
  ), t = fe(
    () => (n, r) => r === !1 ? n.includes(Z.ERROR_MARKER) ? ve.ERROR : ve.COMPLETED : n.includes(Z.COMPLETED_MARKER) || n.includes("✅") ? ve.COMPLETED : n.includes(Z.ERROR_MARKER) ? ve.ERROR : ve.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: t
  };
}
function so({
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
  const f = qe(/* @__PURE__ */ new Map()), d = qe(/* @__PURE__ */ new Map()), y = re(() => {
    if (l.current && c.current) {
      const P = En(
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
  ]), S = re(
    (P) => {
      const L = En(P, !0);
      if (l.current)
        c.current += L, s(c.current), n(
          l.current,
          c.current,
          !0
        );
      else {
        i(!1);
        const T = r();
        l.current = T, c.current = L, s(L);
        const z = {
          id: T,
          role: "assistant",
          content: L,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        e((O) => [...O, z]);
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
  ), A = re(
    (P, L, T) => {
      const { callId: z } = T || {};
      if (o(P), !z) return;
      const O = we.isThinkingMessage(L) && !L.includes("for") && !L.includes("seconds"), F = we.isThinkingMessage(L) && L.includes("for") && L.includes("seconds"), U = we.isHandlingMessage(L), b = we.isCompletedMessage(L), M = we.isErrorMessage(L);
      if (O || F) {
        const q = f.current.get(z);
        if (O && !q) {
          y();
          const j = r();
          f.current.set(z, j);
          const ne = {
            id: j,
            role: "reasoning",
            content: L,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          e((D) => [...D, ne]);
        } else F && q ? (n(q, L, !1), f.current.delete(z)) : q && O && n(q, L, !0);
      }
      const W = d.current.get(z);
      if (U && !W) {
        y();
        const q = L.match(
          Z.PATTERNS.HANDLING_TOOL
        ), j = q ? q[1] : "Unknown Tool", ne = r();
        d.current.set(z, ne);
        const D = {
          id: ne,
          role: "tooling",
          content: L,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...T,
            toolName: j,
            callId: z,
            status: ve.PROCESSING
          }
        };
        e((ce) => [...ce, D]);
      } else if ((b || M) && W) {
        const q = L.match(
          Z.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), j = q ? q[1] : "Unknown Tool";
        e(
          (ne) => ne.map(
            (D) => D.id === W ? {
              ...D,
              content: L,
              isStreaming: !1,
              toolData: {
                ...D.toolData,
                toolName: j,
                status: M ? ve.ERROR : ve.COMPLETED,
                callId: z ?? ""
              }
            } : D
          )
        ), d.current.delete(z);
      } else W && P && !b && !M && n(W, L, !0);
    },
    [
      o,
      y,
      r,
      e,
      n
    ]
  ), w = re(() => {
    a(!1), i(!1), y();
  }, [a, i, y]), k = re(
    (P) => {
      console.error("Chat error:", P), a(!1), i(!1), y(), t("system", `❌ Chat error: ${P}`);
    },
    [
      a,
      i,
      y,
      t
    ]
  ), N = re(() => {
    a(!1), i(!1), u(), p();
  }, [
    a,
    i,
    u,
    p
  ]);
  return {
    handleSetMessage: S,
    handleReasoningUpdate: A,
    handleChatFinished: w,
    handleChatError: k,
    stopGeneration: N,
    finalizeCurrentStreamingMessage: y
  };
}
function oo() {
  const e = no(), t = ro(), n = io(), r = ao(), i = so({
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
function $h({ initialMode: e = "sidebar" }) {
  const t = $();
  return be(() => {
    e && t.currentMode !== e && t.setCurrentMode(e);
  }, [e]), be(() => {
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
function lo({
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
  setProviderResId: p
}) {
  const f = qe(!1);
  return be(() => {
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
      if (!f.current && !(s.length > 0))
        try {
          l(!0), c(null), console.log("useConversationLoader: Fetching messages for entityId:", e, "entityType:", t);
          const y = await ns(
            r,
            {
              userId: n,
              entityId: e,
              entityType: t
            },
            {
              userMpAuthToken: i,
              chatServerKey: a
            }
          );
          console.log(`useConversationLoader: Loaded ${y.messages.length} messages`), o(y.messages), y.threadId && (console.log("useConversationLoader: Setting threadId from response:", y.threadId), u(y.threadId)), y.providerResId && (console.log("useConversationLoader: Setting providerResId:", y.providerResId), p(y.providerResId)), f.current = !0;
        } catch (y) {
          console.error("❌ Error loading conversation:", y), c(
            y instanceof Error ? y.message : "Failed to load conversation"
          ), f.current = !0;
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
    p
  ]), {
    hasLoadedConversationRef: f
  };
}
class co {
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
class uo {
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
const ho = {
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
}, Ji = {
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
}, po = {
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
    if (!Ji.isValidWebSocketUrl(e))
      throw new Error(`Invalid WebSocket URL: ${e}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (e) => e.trim().length > 0
}, Qi = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...e) => e.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (e, t, n, r, i) => Qi.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${e}`,
    t && `chat-wrapper--${t}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    e === "embedded" && i && "chat-wrapper--constrained"
  )
}, ea = {
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
  getUserFriendlyErrorMessage: (e) => ea.isNetworkError(e) ? "Connection error. Please check your internet connection and try again." : e.message.includes("authentication") || e.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : e.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, ht = {
  state: ho,
  url: Ji,
  validation: po,
  css: Qi,
  error: ea
};
class Qr extends pr {
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
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ h("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ x("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: ht.error.getUserFriendlyErrorMessage(r) }),
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
      })() && /* @__PURE__ */ x("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ h("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ h("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : i;
  }
}
class fo extends pr {
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
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || ht.error.isNetworkError(r)) ? /* @__PURE__ */ h("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ x("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ x("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ h("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ h("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ x(zt, { children: [
        this.retryCount < s && /* @__PURE__ */ x(
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
      })() && /* @__PURE__ */ x("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ h("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ h("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
}
class go extends pr {
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
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ h("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ x("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ x("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ h("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ h("ul", { className: "chat-wrapper__failed-files-list", children: i.map((l, c) => /* @__PURE__ */ h("li", { className: "chat-wrapper__failed-file", children: l }, c)) })
      ] }),
      /* @__PURE__ */ x("div", { className: "chat-wrapper__error-actions", children: [
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
      })() && /* @__PURE__ */ x("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ h("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ h("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
  getFileUploadErrorMessage(n) {
    return n.message.includes("size") || n.message.includes("large") ? "File size is too large. Please try with smaller files." : n.message.includes("type") || n.message.includes("format") ? "File type is not supported. Please try with different file types." : n.message.includes("network") || n.message.includes("connection") ? "Network error during upload. Please check your connection and try again." : n.message.includes("timeout") ? "Upload timed out. Please try again with smaller files or better connection." : "Failed to upload files. Please try again.";
  }
}
function mo({
  isConnected: e,
  isConnecting: t = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 5,
  onRetry: a,
  autoHideDuration: s = 3e3
}) {
  const [o, l] = se("hidden"), [c, u] = se(!1);
  if (be(() => {
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
  return d ? o === "connecting" ? /* @__PURE__ */ h("div", { className: `connection-notification connection-notification--${o}`, children: /* @__PURE__ */ x("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ h("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ h("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ h("div", { className: "connection-notification__bubble" })
  ] }) }) : /* @__PURE__ */ h("div", { className: `connection-notification connection-notification--${o}`, children: /* @__PURE__ */ x("div", { className: "connection-notification__content", children: [
    /* @__PURE__ */ h("div", { className: "connection-notification__icon", children: d.icon }),
    /* @__PURE__ */ h("div", { className: "connection-notification__title", children: d.title }),
    /* @__PURE__ */ h("div", { className: "connection-notification__message", children: d.message }),
    o === "reconnecting" && /* @__PURE__ */ h("div", { className: "connection-notification__actions", children: /* @__PURE__ */ x("button", { className: "connection-notification__retry-btn primary", disabled: !0, children: [
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
const Co = ({
  className: e,
  onClick: t,
  size: n = 24,
  color: r = "currentColor"
}) => /* @__PURE__ */ x(
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
), yo = ({
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
), wo = ({
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
), So = ({
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
), ta = ({
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
), Eo = ({
  className: e,
  onClick: t,
  size: n = 18,
  color: r = "currentColor"
}) => /* @__PURE__ */ x(
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
), To = ({
  mode: e,
  headerName: t,
  bubbleText: n,
  showBubbleText: r = !0,
  onClick: i
}) => {
  const a = e === "modal" ? `Open ${t}` : `Expand ${t}`;
  return /* @__PURE__ */ x(
    "button",
    {
      className: "chat-wrapper__bubble-button",
      onClick: i,
      title: a,
      children: [
        /* @__PURE__ */ h(Co, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ h("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, _o = ({
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
      children: /* @__PURE__ */ h(yo, { size: 20 })
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
          children: /* @__PURE__ */ h(wo, { size: 20, isFullscreen: d })
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
      children: /* @__PURE__ */ h(So, { size: 20 })
    }
  ) : null;
  return /* @__PURE__ */ x("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ h("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ h("h2", { className: "chat-wrapper__title", children: e }) }),
    /* @__PURE__ */ x("div", { className: "chat-wrapper__header-controls", children: [
      !i || !l ? null : /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__settings-button",
          onClick: l,
          title: "Developer Settings",
          children: /* @__PURE__ */ h(ta, { size: 16 })
        }
      ),
      u(),
      p(),
      c()
    ] })
  ] });
};
function ko(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const xo = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, bo = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, vo = {};
function ei(e, t) {
  return (vo.jsx ? bo : xo).test(e);
}
const Io = /[ \t\n\f\r]/g;
function Ro(e) {
  return typeof e == "object" ? e.type === "text" ? ti(e.value) : !1 : ti(e);
}
function ti(e) {
  return e.replace(Io, "") === "";
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
function na(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new nn(n, r, t);
}
function nr(e) {
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
let Ao = 0;
const Y = Lt(), pe = Lt(), rr = Lt(), v = Lt(), oe = Lt(), Ft = Lt(), Ve = Lt();
function Lt() {
  return 2 ** ++Ao;
}
const ir = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: Y,
  booleanish: pe,
  commaOrSpaceSeparated: Ve,
  commaSeparated: Ft,
  number: v,
  overloadedBoolean: rr,
  spaceSeparated: oe
}, Symbol.toStringTag, { value: "Module" })), Bn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(ir)
);
class fr extends He {
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
      for (; ++a < Bn.length; ) {
        const s = Bn[a];
        ni(this, Bn[a], (r & ir[s]) === ir[s]);
      }
  }
}
fr.prototype.defined = !0;
function ni(e, t, n) {
  n && (e[t] = n);
}
function Bt(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new fr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[nr(r)] = r, n[nr(a.attribute)] = r;
  }
  return new nn(t, n, e.space);
}
const ra = Bt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: pe,
    ariaAutoComplete: null,
    ariaBusy: pe,
    ariaChecked: pe,
    ariaColCount: v,
    ariaColIndex: v,
    ariaColSpan: v,
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
    ariaLevel: v,
    ariaLive: null,
    ariaModal: pe,
    ariaMultiLine: pe,
    ariaMultiSelectable: pe,
    ariaOrientation: null,
    ariaOwns: oe,
    ariaPlaceholder: null,
    ariaPosInSet: v,
    ariaPressed: pe,
    ariaReadOnly: pe,
    ariaRelevant: null,
    ariaRequired: pe,
    ariaRoleDescription: oe,
    ariaRowCount: v,
    ariaRowIndex: v,
    ariaRowSpan: v,
    ariaSelected: pe,
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
function ia(e, t) {
  return t in e ? e[t] : t;
}
function aa(e, t) {
  return ia(e, t.toLowerCase());
}
const No = Bt({
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
    accept: Ft,
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
    contentEditable: pe,
    controls: Y,
    controlsList: oe,
    coords: v | Ft,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: Y,
    defer: Y,
    dir: null,
    dirName: null,
    disabled: Y,
    download: rr,
    draggable: pe,
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
    hidden: rr,
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
    spellCheck: pe,
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
    value: pe,
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
    scrolling: pe,
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
  transform: aa
}), Mo = Bt({
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
    about: Ve,
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
    g1: Ft,
    g2: Ft,
    glyphName: Ft,
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
    kernelMatrix: Ve,
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
    property: Ve,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Ve,
    rev: Ve,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Ve,
    requiredFeatures: Ve,
    requiredFonts: Ve,
    requiredFormats: Ve,
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
    strokeDashArray: Ve,
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
    systemLanguage: Ve,
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
    typeOf: Ve,
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
  transform: ia
}), sa = Bt({
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
}), oa = Bt({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: aa
}), la = Bt({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), Lo = {
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
}, Oo = /[A-Z]/g, ri = /-[a-z]/g, Do = /^data[-\w.:]+$/i;
function Po(e, t) {
  const n = nr(t);
  let r = t, i = He;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Do.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(ri, Fo);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!ri.test(a)) {
        let s = a.replace(Oo, Ho);
        s.charAt(0) !== "-" && (s = "-" + s), t = "data" + s;
      }
    }
    i = fr;
  }
  return new i(r, t);
}
function Ho(e) {
  return "-" + e.toLowerCase();
}
function Fo(e) {
  return e.charAt(1).toUpperCase();
}
const Uo = na([ra, No, sa, oa, la], "html"), gr = na([ra, Mo, sa, oa, la], "svg");
function zo(e) {
  return e.join(" ").trim();
}
var Tn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ca(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var mr = {}, ii = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Bo = /\n/g, Go = /^\s*/, Vo = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Wo = /^:\s*/, jo = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, $o = /^[;\s]*/, Zo = /^\s+|\s+$/g, Ko = `
`, ai = "/", si = "*", Mt = "", qo = "comment", Xo = "declaration", Yo = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(y) {
    var S = y.match(Bo);
    S && (n += S.length);
    var A = y.lastIndexOf(Ko);
    r = ~A ? y.length - A : r + y.length;
  }
  function a() {
    var y = { line: n, column: r };
    return function(S) {
      return S.position = new s(y), c(), S;
    };
  }
  function s(y) {
    this.start = y, this.end = { line: n, column: r }, this.source = t.source;
  }
  s.prototype.content = e;
  function o(y) {
    var S = new Error(
      t.source + ":" + n + ":" + r + ": " + y
    );
    if (S.reason = y, S.filename = t.source, S.line = n, S.column = r, S.source = e, !t.silent) throw S;
  }
  function l(y) {
    var S = y.exec(e);
    if (S) {
      var A = S[0];
      return i(A), e = e.slice(A.length), S;
    }
  }
  function c() {
    l(Go);
  }
  function u(y) {
    var S;
    for (y = y || []; S = p(); )
      S !== !1 && y.push(S);
    return y;
  }
  function p() {
    var y = a();
    if (!(ai != e.charAt(0) || si != e.charAt(1))) {
      for (var S = 2; Mt != e.charAt(S) && (si != e.charAt(S) || ai != e.charAt(S + 1)); )
        ++S;
      if (S += 2, Mt === e.charAt(S - 1))
        return o("End of comment missing");
      var A = e.slice(2, S - 2);
      return r += 2, i(A), e = e.slice(S), r += 2, y({
        type: qo,
        comment: A
      });
    }
  }
  function f() {
    var y = a(), S = l(Vo);
    if (S) {
      if (p(), !l(Wo)) return o("property missing ':'");
      var A = l(jo), w = y({
        type: Xo,
        property: oi(S[0].replace(ii, Mt)),
        value: A ? oi(A[0].replace(ii, Mt)) : Mt
      });
      return l($o), w;
    }
  }
  function d() {
    var y = [];
    u(y);
    for (var S; S = f(); )
      S !== !1 && (y.push(S), u(y));
    return y;
  }
  return c(), d();
};
function oi(e) {
  return e ? e.replace(Zo, Mt) : Mt;
}
var Jo = Tn && Tn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.default = el;
var Qo = Jo(Yo);
function el(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, Qo.default)(e), i = typeof t == "function";
  return r.forEach(function(a) {
    if (a.type === "declaration") {
      var s = a.property, o = a.value;
      i ? t(s, o, a) : o && (n = n || {}, n[s] = o);
    }
  }), n;
}
var bn = {};
Object.defineProperty(bn, "__esModule", { value: !0 });
bn.camelCase = void 0;
var tl = /^--[a-zA-Z0-9_-]+$/, nl = /-([a-z])/g, rl = /^[^-]+$/, il = /^-(webkit|moz|ms|o|khtml)-/, al = /^-(ms)-/, sl = function(e) {
  return !e || rl.test(e) || tl.test(e);
}, ol = function(e, t) {
  return t.toUpperCase();
}, li = function(e, t) {
  return "".concat(t, "-");
}, ll = function(e, t) {
  return t === void 0 && (t = {}), sl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(al, li) : e = e.replace(il, li), e.replace(nl, ol));
};
bn.camelCase = ll;
var cl = Tn && Tn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, ul = cl(mr), hl = bn;
function ar(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, ul.default)(e, function(r, i) {
    r && i && (n[(0, hl.camelCase)(r, t)] = i);
  }), n;
}
ar.default = ar;
var dl = ar;
const pl = /* @__PURE__ */ ca(dl), ua = ha("end"), Cr = ha("start");
function ha(e) {
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
  const t = Cr(e), n = ua(e);
  if (t && n)
    return { start: t, end: n };
}
function Yt(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? ci(e.position) : "start" in e || "end" in e ? ci(e) : "line" in e || "column" in e ? sr(e) : "";
}
function sr(e) {
  return ui(e && e.line) + ":" + ui(e && e.column);
}
function ci(e) {
  return sr(e && e.start) + "-" + sr(e && e.end);
}
function ui(e) {
  return e && typeof e == "number" ? e : 1;
}
class Ie extends Error {
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
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = o ? o.line : void 0, this.name = Yt(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = s && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Ie.prototype.file = "";
Ie.prototype.name = "";
Ie.prototype.reason = "";
Ie.prototype.message = "";
Ie.prototype.stack = "";
Ie.prototype.column = void 0;
Ie.prototype.line = void 0;
Ie.prototype.ancestors = void 0;
Ie.prototype.cause = void 0;
Ie.prototype.fatal = void 0;
Ie.prototype.place = void 0;
Ie.prototype.ruleId = void 0;
Ie.prototype.source = void 0;
const yr = {}.hasOwnProperty, gl = /* @__PURE__ */ new Map(), ml = /[A-Z]/g, Cl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), yl = /* @__PURE__ */ new Set(["td", "th"]), da = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
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
    schema: t.space === "svg" ? gr : Uo,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = pa(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function pa(e, t, n) {
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
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = gr, e.schema = i), e.ancestors.push(t);
  const a = ga(e, t.tagName, !1), s = Il(e, t);
  let o = Sr(e, t);
  return Cl.has(t.tagName) && (o = o.filter(function(l) {
    return typeof l == "string" ? !Ro(l) : !0;
  })), fa(e, s, a, t), wr(s, o), e.ancestors.pop(), e.schema = r, e.create(t, a, s, n);
}
function El(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  tn(e, t.position);
}
function Tl(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  tn(e, t.position);
}
function _l(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = gr, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : ga(e, t.name, !0), s = Rl(e, t), o = Sr(e, t);
  return fa(e, s, a, t), wr(s, o), e.ancestors.pop(), e.schema = r, e.create(t, a, s, n);
}
function kl(e, t, n) {
  const r = {};
  return wr(r, Sr(e, t)), e.create(t, e.Fragment, r, n);
}
function xl(e, t) {
  return t.value;
}
function fa(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function wr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function bl(e, t, n) {
  return r;
  function r(i, a, s, o) {
    const c = Array.isArray(s.children) ? n : t;
    return o ? c(a, s, o) : c(a, s);
  }
}
function vl(e, t) {
  return n;
  function n(r, i, a, s) {
    const o = Array.isArray(a.children), l = Cr(r);
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
function Il(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && yr.call(t.properties, i)) {
      const a = Al(e, i, t.properties[i]);
      if (a) {
        const [s, o] = a;
        e.tableCellAlignToStyle && s === "align" && typeof o == "string" && yl.has(t.tagName) ? r = o : n[s] = o;
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
        const s = a.expression;
        s.type;
        const o = s.properties[0];
        o.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(o.argument)
        );
      } else
        tn(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const o = r.value.data.estree.body[0];
          o.type, a = e.evaluater.evaluateExpression(o.expression);
        } else
          tn(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function Sr(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : gl;
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
    const o = pa(e, a, s);
    o !== void 0 && n.push(o);
  }
  return n;
}
function Al(e, t, n) {
  const r = Po(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? ko(n) : zo(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Nl(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Ml(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Lo[r.property] || r.property : r.attribute,
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
    ), i = new Ie("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = da + "#cannot-parse-style-attribute", i;
  }
}
function ga(e, t, n) {
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
    return yr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  tn(e);
}
function tn(e, t) {
  const n = new Ie(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = da + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Ml(e) {
  const t = {};
  let n;
  for (n in e)
    yr.call(e, n) && (t[Ll(n)] = e[n]);
  return t;
}
function Ll(e) {
  let t = e.replace(ml, Ol);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Ol(e) {
  return "-" + e.toLowerCase();
}
const Gn = {
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
  return ma(e, r, i);
}
function ma(e, t, n) {
  if (Hl(e)) {
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
    r[i] = ma(e[i], t, n);
  return r.join("");
}
function Hl(e) {
  return !!(e && typeof e == "object");
}
const di = document.createElement("i");
function Er(e) {
  const t = "&" + e + ";";
  di.innerHTML = t;
  const n = di.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function pt(e, t, n, r) {
  const i = e.length;
  let a = 0, s;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    s = Array.from(r), s.unshift(t, n), e.splice(...s);
  else
    for (n && e.splice(t, n); a < r.length; )
      s = r.slice(a, a + 1e4), s.unshift(t, 0), e.splice(...s), a += 1e4, t += 1e4;
}
function Ke(e, t) {
  return e.length > 0 ? (pt(e, e.length, 0, t), e) : t;
}
const pi = {}.hasOwnProperty;
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
    const i = (pi.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let s;
    if (a)
      for (s in a) {
        pi.call(i, s) || (i[s] = []);
        const o = a[s];
        zl(
          // @ts-expect-error Looks like a list.
          i[s],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function zl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  pt(e, 0, 0, r);
}
function Ca(e, t) {
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
function Ut(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const dt = vt(/[A-Za-z]/), We = vt(/[\dA-Za-z]/), Bl = vt(/[#-'*+\--9=?A-Z^-~]/);
function or(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const lr = vt(/\d/), Gl = vt(/[\dA-Fa-f]/), Vl = vt(/[!-/:-@[-`{-~]/);
function K(e) {
  return e !== null && e < -2;
}
function Pe(e) {
  return e !== null && (e < 0 || e === 32);
}
function ie(e) {
  return e === -2 || e === -1 || e === 32;
}
const Wl = vt(new RegExp("\\p{P}|\\p{S}", "u")), jl = vt(/\s/);
function vt(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Gt(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let s = "";
    if (a === 37 && We(e.charCodeAt(n + 1)) && We(e.charCodeAt(n + 2)))
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
    return ie(l) ? (e.enter(n), o(l)) : t(l);
  }
  function o(l) {
    return ie(l) && a++ < i ? (e.consume(l), o) : (e.exit(n), t(l));
  }
}
const $l = {
  tokenize: Zl
};
function Zl(e) {
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
const Kl = {
  tokenize: ql
}, fi = {
  tokenize: Xl
};
function ql(e) {
  const t = this, n = [];
  let r = 0, i, a, s;
  return o;
  function o(N) {
    if (r < n.length) {
      const P = n[r];
      return t.containerState = P[1], e.attempt(P[0].continuation, l, c)(N);
    }
    return c(N);
  }
  function l(N) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && k();
      const P = t.events.length;
      let L = P, T;
      for (; L--; )
        if (t.events[L][0] === "exit" && t.events[L][1].type === "chunkFlow") {
          T = t.events[L][1].end;
          break;
        }
      w(r);
      let z = P;
      for (; z < t.events.length; )
        t.events[z][1].end = {
          ...T
        }, z++;
      return pt(t.events, L + 1, 0, t.events.slice(P)), t.events.length = z, c(N);
    }
    return o(N);
  }
  function c(N) {
    if (r === n.length) {
      if (!i)
        return f(N);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return y(N);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(fi, u, p)(N);
  }
  function u(N) {
    return i && k(), w(r), f(N);
  }
  function p(N) {
    return t.parser.lazy[t.now().line] = r !== n.length, s = t.now().offset, y(N);
  }
  function f(N) {
    return t.containerState = {}, e.attempt(fi, d, y)(N);
  }
  function d(N) {
    return r++, n.push([t.currentConstruct, t.containerState]), f(N);
  }
  function y(N) {
    if (N === null) {
      i && k(), w(0), e.consume(N);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: a
    }), S(N);
  }
  function S(N) {
    if (N === null) {
      A(e.exit("chunkFlow"), !0), w(0), e.consume(N);
      return;
    }
    return K(N) ? (e.consume(N), A(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, o) : (e.consume(N), S);
  }
  function A(N, P) {
    const L = t.sliceStream(N);
    if (P && L.push(null), N.previous = a, a && (a.next = N), a = N, i.defineSkip(N.start), i.write(L), t.parser.lazy[N.start.line]) {
      let T = i.events.length;
      for (; T--; )
        if (
          // The token starts before the line ending…
          i.events[T][1].start.offset < s && // …and either is not ended yet…
          (!i.events[T][1].end || // …or ends after it.
          i.events[T][1].end.offset > s)
        )
          return;
      const z = t.events.length;
      let O = z, F, U;
      for (; O--; )
        if (t.events[O][0] === "exit" && t.events[O][1].type === "chunkFlow") {
          if (F) {
            U = t.events[O][1].end;
            break;
          }
          F = !0;
        }
      for (w(r), T = z; T < t.events.length; )
        t.events[T][1].end = {
          ...U
        }, T++;
      pt(t.events, O + 1, 0, t.events.slice(z)), t.events.length = T;
    }
  }
  function w(N) {
    let P = n.length;
    for (; P-- > N; ) {
      const L = n[P];
      t.containerState = L[1], L[0].exit.call(t, e);
    }
    n.length = N;
  }
  function k() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Xl(e, t, n) {
  return le(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function gi(e) {
  if (e === null || Pe(e) || jl(e))
    return 1;
  if (Wl(e))
    return 2;
}
function Tr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const cr = {
  name: "attention",
  resolveAll: Yl,
  tokenize: Jl
};
function Yl(e, t) {
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
          }, c = [], e[r][1].end.offset - e[r][1].start.offset && (c = Ke(c, [["enter", e[r][1], t], ["exit", e[r][1], t]])), c = Ke(c, [["enter", i, t], ["enter", s, t], ["exit", s, t], ["enter", a, t]]), c = Ke(c, Tr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), c = Ke(c, [["exit", a, t], ["enter", o, t], ["exit", o, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, c = Ke(c, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : u = 0, pt(e, r - 1, n - r + 3, c), n = r + c.length - u - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Jl(e, t) {
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
    return dt(d) ? (e.consume(d), s) : d === 64 ? n(d) : c(d);
  }
  function s(d) {
    return d === 43 || d === 45 || d === 46 || We(d) ? (r = 1, o(d)) : c(d);
  }
  function o(d) {
    return d === 58 ? (e.consume(d), r = 0, l) : (d === 43 || d === 45 || d === 46 || We(d)) && r++ < 32 ? (e.consume(d), o) : (r = 0, c(d));
  }
  function l(d) {
    return d === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.exit("autolink"), t) : d === null || d === 32 || d === 60 || or(d) ? n(d) : (e.consume(d), l);
  }
  function c(d) {
    return d === 64 ? (e.consume(d), u) : Bl(d) ? (e.consume(d), c) : n(d);
  }
  function u(d) {
    return We(d) ? p(d) : n(d);
  }
  function p(d) {
    return d === 46 ? (e.consume(d), r = 0, u) : d === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.exit("autolink"), t) : f(d);
  }
  function f(d) {
    if ((d === 45 || We(d)) && r++ < 63) {
      const y = d === 45 ? f : p;
      return e.consume(d), y;
    }
    return n(d);
  }
}
const vn = {
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
const ya = {
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
    return ie(s) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(s), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(s));
  }
}
function rc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return ie(s) ? le(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s) : a(s);
  }
  function a(s) {
    return e.attempt(ya, t, n)(s);
  }
}
function ic(e) {
  e.exit("blockQuote");
}
const wa = {
  name: "characterEscape",
  tokenize: ac
};
function ac(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return Vl(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const Sa = {
  name: "characterReference",
  tokenize: sc
};
function sc(e, t, n) {
  const r = this;
  let i = 0, a, s;
  return o;
  function o(p) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), l;
  }
  function l(p) {
    return p === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(p), e.exit("characterReferenceMarkerNumeric"), c) : (e.enter("characterReferenceValue"), a = 31, s = We, u(p));
  }
  function c(p) {
    return p === 88 || p === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(p), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, s = Gl, u) : (e.enter("characterReferenceValue"), a = 7, s = lr, u(p));
  }
  function u(p) {
    if (p === 59 && i) {
      const f = e.exit("characterReferenceValue");
      return s === We && !Er(r.sliceSerialize(f)) ? n(p) : (e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return s(p) && i++ < a ? (e.consume(p), u) : n(p);
  }
}
const Ci = {
  partial: !0,
  tokenize: lc
}, yi = {
  concrete: !0,
  name: "codeFenced",
  tokenize: oc
};
function oc(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: L
  };
  let a = 0, s = 0, o;
  return l;
  function l(T) {
    return c(T);
  }
  function c(T) {
    const z = r.events[r.events.length - 1];
    return a = z && z[1].type === "linePrefix" ? z[2].sliceSerialize(z[1], !0).length : 0, o = T, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(T);
  }
  function u(T) {
    return T === o ? (s++, e.consume(T), u) : s < 3 ? n(T) : (e.exit("codeFencedFenceSequence"), ie(T) ? le(e, p, "whitespace")(T) : p(T));
  }
  function p(T) {
    return T === null || K(T) ? (e.exit("codeFencedFence"), r.interrupt ? t(T) : e.check(Ci, S, P)(T)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), f(T));
  }
  function f(T) {
    return T === null || K(T) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), p(T)) : ie(T) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), le(e, d, "whitespace")(T)) : T === 96 && T === o ? n(T) : (e.consume(T), f);
  }
  function d(T) {
    return T === null || K(T) ? p(T) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), y(T));
  }
  function y(T) {
    return T === null || K(T) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), p(T)) : T === 96 && T === o ? n(T) : (e.consume(T), y);
  }
  function S(T) {
    return e.attempt(i, P, A)(T);
  }
  function A(T) {
    return e.enter("lineEnding"), e.consume(T), e.exit("lineEnding"), w;
  }
  function w(T) {
    return a > 0 && ie(T) ? le(e, k, "linePrefix", a + 1)(T) : k(T);
  }
  function k(T) {
    return T === null || K(T) ? e.check(Ci, S, P)(T) : (e.enter("codeFlowValue"), N(T));
  }
  function N(T) {
    return T === null || K(T) ? (e.exit("codeFlowValue"), k(T)) : (e.consume(T), N);
  }
  function P(T) {
    return e.exit("codeFenced"), t(T);
  }
  function L(T, z, O) {
    let F = 0;
    return U;
    function U(j) {
      return T.enter("lineEnding"), T.consume(j), T.exit("lineEnding"), b;
    }
    function b(j) {
      return T.enter("codeFencedFence"), ie(j) ? le(T, M, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(j) : M(j);
    }
    function M(j) {
      return j === o ? (T.enter("codeFencedFenceSequence"), W(j)) : O(j);
    }
    function W(j) {
      return j === o ? (F++, T.consume(j), W) : F >= s ? (T.exit("codeFencedFenceSequence"), ie(j) ? le(T, q, "whitespace")(j) : q(j)) : O(j);
    }
    function q(j) {
      return j === null || K(j) ? (T.exit("codeFencedFence"), z(j)) : O(j);
    }
  }
}
function lc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return s === null ? n(s) : (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), a);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
const Vn = {
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
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? s(c) : n(c);
  }
  function s(c) {
    return c === null ? l(c) : K(c) ? e.attempt(cc, s, l)(c) : (e.enter("codeFlowValue"), o(c));
  }
  function o(c) {
    return c === null || K(c) ? (e.exit("codeFlowValue"), s(c)) : (e.consume(c), o);
  }
  function l(c) {
    return e.exit("codeIndented"), t(c);
  }
}
function hc(e, t, n) {
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
function Ea(e) {
  const t = {};
  let n = -1, r, i, a, s, o, l, c;
  const u = new mc(e);
  for (; ++n < u.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (l = r[1]._tokenizer.events, a = 0, a < l.length && l[a][1].type === "lineEndingBlank" && (a += 2), a < l.length && l[a][1].type === "content"))
      for (; ++a < l.length && l[a][1].type !== "content"; )
        l[a][1].type === "chunkText" && (l[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, Cc(u, n)), n = t[n], c = !0);
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
  return pt(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !c;
}
function Cc(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let s = n._tokenizer;
  s || (s = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  const o = s.events, l = [], c = {};
  let u, p, f = -1, d = n, y = 0, S = 0;
  const A = [S];
  for (; d; ) {
    for (; e.get(++i)[1] !== d; )
      ;
    a.push(i), d._tokenizer || (u = r.sliceStream(d), d.next || u.push(null), p && s.defineSkip(d.start), d._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0), s.write(u), d._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)), p = d, d = d.next;
  }
  for (d = n; ++f < o.length; )
    // Find a void token that includes a break.
    o[f][0] === "exit" && o[f - 1][0] === "enter" && o[f][1].type === o[f - 1][1].type && o[f][1].start.line !== o[f][1].end.line && (S = f + 1, A.push(S), d._tokenizer = void 0, d.previous = void 0, d = d.next);
  for (s.events = [], d ? (d._tokenizer = void 0, d.previous = void 0) : A.pop(), f = A.length; f--; ) {
    const w = o.slice(A[f], A[f + 1]), k = a.pop();
    l.push([k, k + w.length - 1]), e.splice(k, 2, w);
  }
  for (l.reverse(), f = -1; ++f < l.length; )
    c[y + l[f][0]] = y + l[f][1], y += l[f][1] - l[f][0] - 1;
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
  return Ea(e), e;
}
function Ec(e, t) {
  let n;
  return r;
  function r(o) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(o);
  }
  function i(o) {
    return o === null ? a(o) : K(o) ? e.check(wc, s, a)(o) : (e.consume(o), i);
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
function Tc(e, t, n) {
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
function Ta(e, t, n, r, i, a, s, o, l) {
  const c = l || Number.POSITIVE_INFINITY;
  let u = 0;
  return p;
  function p(w) {
    return w === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(w), e.exit(a), f) : w === null || w === 32 || w === 41 || or(w) ? n(w) : (e.enter(r), e.enter(s), e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), S(w));
  }
  function f(w) {
    return w === 62 ? (e.enter(a), e.consume(w), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), d(w));
  }
  function d(w) {
    return w === 62 ? (e.exit("chunkString"), e.exit(o), f(w)) : w === null || w === 60 || K(w) ? n(w) : (e.consume(w), w === 92 ? y : d);
  }
  function y(w) {
    return w === 60 || w === 62 || w === 92 ? (e.consume(w), d) : d(w);
  }
  function S(w) {
    return !u && (w === null || w === 41 || Pe(w)) ? (e.exit("chunkString"), e.exit(o), e.exit(s), e.exit(r), t(w)) : u < c && w === 40 ? (e.consume(w), u++, S) : w === 41 ? (e.consume(w), u--, S) : w === null || w === 32 || w === 40 || or(w) ? n(w) : (e.consume(w), w === 92 ? A : S);
  }
  function A(w) {
    return w === 40 || w === 41 || w === 92 ? (e.consume(w), S) : S(w);
  }
}
function _a(e, t, n, r, i, a) {
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
    return d === null || d === 91 || d === 93 || K(d) || o++ > 999 ? (e.exit("chunkString"), u(d)) : (e.consume(d), l || (l = !ie(d)), d === 92 ? f : p);
  }
  function f(d) {
    return d === 91 || d === 92 || d === 93 ? (e.consume(d), o++, p) : p(d);
  }
}
function ka(e, t, n, r, i, a) {
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
function Jt(e, t) {
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
    return e.enter("definition"), s(d);
  }
  function s(d) {
    return _a.call(
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
    return i = Ut(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), d === 58 ? (e.enter("definitionMarker"), e.consume(d), e.exit("definitionMarker"), l) : n(d);
  }
  function l(d) {
    return Pe(d) ? Jt(e, c)(d) : c(d);
  }
  function c(d) {
    return Ta(
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
    return e.attempt(kc, p, p)(d);
  }
  function p(d) {
    return ie(d) ? le(e, f, "whitespace")(d) : f(d);
  }
  function f(d) {
    return d === null || K(d) ? (e.exit("definition"), r.parser.defined.push(i), t(d)) : n(d);
  }
}
function bc(e, t, n) {
  return r;
  function r(o) {
    return Pe(o) ? Jt(e, i)(o) : n(o);
  }
  function i(o) {
    return ka(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
  }
  function a(o) {
    return ie(o) ? le(e, s, "whitespace")(o) : s(o);
  }
  function s(o) {
    return o === null || K(o) ? t(o) : n(o);
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
  }, pt(e, r, n - r + 1, [["enter", i, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]])), e;
}
function Nc(e, t, n) {
  let r = 0;
  return i;
  function i(u) {
    return e.enter("atxHeading"), a(u);
  }
  function a(u) {
    return e.enter("atxHeadingSequence"), s(u);
  }
  function s(u) {
    return u === 35 && r++ < 6 ? (e.consume(u), s) : u === null || Pe(u) ? (e.exit("atxHeadingSequence"), o(u)) : n(u);
  }
  function o(u) {
    return u === 35 ? (e.enter("atxHeadingSequence"), l(u)) : u === null || K(u) ? (e.exit("atxHeading"), t(u)) : ie(u) ? le(e, o, "whitespace")(u) : (e.enter("atxHeadingText"), c(u));
  }
  function l(u) {
    return u === 35 ? (e.consume(u), l) : (e.exit("atxHeadingSequence"), o(u));
  }
  function c(u) {
    return u === null || u === 35 || Pe(u) ? (e.exit("atxHeadingText"), o(u)) : (e.consume(u), c);
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
], wi = ["pre", "script", "style", "textarea"], Lc = {
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
  let i, a, s, o, l;
  return c;
  function c(g) {
    return u(g);
  }
  function u(g) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(g), p;
  }
  function p(g) {
    return g === 33 ? (e.consume(g), f) : g === 47 ? (e.consume(g), a = !0, S) : g === 63 ? (e.consume(g), i = 3, r.interrupt ? t : m) : dt(g) ? (e.consume(g), s = String.fromCharCode(g), A) : n(g);
  }
  function f(g) {
    return g === 45 ? (e.consume(g), i = 2, d) : g === 91 ? (e.consume(g), i = 5, o = 0, y) : dt(g) ? (e.consume(g), i = 4, r.interrupt ? t : m) : n(g);
  }
  function d(g) {
    return g === 45 ? (e.consume(g), r.interrupt ? t : m) : n(g);
  }
  function y(g) {
    const Se = "CDATA[";
    return g === Se.charCodeAt(o++) ? (e.consume(g), o === Se.length ? r.interrupt ? t : M : y) : n(g);
  }
  function S(g) {
    return dt(g) ? (e.consume(g), s = String.fromCharCode(g), A) : n(g);
  }
  function A(g) {
    if (g === null || g === 47 || g === 62 || Pe(g)) {
      const Se = g === 47, te = s.toLowerCase();
      return !Se && !a && wi.includes(te) ? (i = 1, r.interrupt ? t(g) : M(g)) : Mc.includes(s.toLowerCase()) ? (i = 6, Se ? (e.consume(g), w) : r.interrupt ? t(g) : M(g)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(g) : a ? k(g) : N(g));
    }
    return g === 45 || We(g) ? (e.consume(g), s += String.fromCharCode(g), A) : n(g);
  }
  function w(g) {
    return g === 62 ? (e.consume(g), r.interrupt ? t : M) : n(g);
  }
  function k(g) {
    return ie(g) ? (e.consume(g), k) : U(g);
  }
  function N(g) {
    return g === 47 ? (e.consume(g), U) : g === 58 || g === 95 || dt(g) ? (e.consume(g), P) : ie(g) ? (e.consume(g), N) : U(g);
  }
  function P(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || We(g) ? (e.consume(g), P) : L(g);
  }
  function L(g) {
    return g === 61 ? (e.consume(g), T) : ie(g) ? (e.consume(g), L) : N(g);
  }
  function T(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), l = g, z) : ie(g) ? (e.consume(g), T) : O(g);
  }
  function z(g) {
    return g === l ? (e.consume(g), l = null, F) : g === null || K(g) ? n(g) : (e.consume(g), z);
  }
  function O(g) {
    return g === null || g === 34 || g === 39 || g === 47 || g === 60 || g === 61 || g === 62 || g === 96 || Pe(g) ? L(g) : (e.consume(g), O);
  }
  function F(g) {
    return g === 47 || g === 62 || ie(g) ? N(g) : n(g);
  }
  function U(g) {
    return g === 62 ? (e.consume(g), b) : n(g);
  }
  function b(g) {
    return g === null || K(g) ? M(g) : ie(g) ? (e.consume(g), b) : n(g);
  }
  function M(g) {
    return g === 45 && i === 2 ? (e.consume(g), ne) : g === 60 && i === 1 ? (e.consume(g), D) : g === 62 && i === 4 ? (e.consume(g), ee) : g === 63 && i === 3 ? (e.consume(g), m) : g === 93 && i === 5 ? (e.consume(g), Te) : K(g) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Oc, Re, W)(g)) : g === null || K(g) ? (e.exit("htmlFlowData"), W(g)) : (e.consume(g), M);
  }
  function W(g) {
    return e.check(Dc, q, Re)(g);
  }
  function q(g) {
    return e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), j;
  }
  function j(g) {
    return g === null || K(g) ? W(g) : (e.enter("htmlFlowData"), M(g));
  }
  function ne(g) {
    return g === 45 ? (e.consume(g), m) : M(g);
  }
  function D(g) {
    return g === 47 ? (e.consume(g), s = "", ce) : M(g);
  }
  function ce(g) {
    if (g === 62) {
      const Se = s.toLowerCase();
      return wi.includes(Se) ? (e.consume(g), ee) : M(g);
    }
    return dt(g) && s.length < 8 ? (e.consume(g), s += String.fromCharCode(g), ce) : M(g);
  }
  function Te(g) {
    return g === 93 ? (e.consume(g), m) : M(g);
  }
  function m(g) {
    return g === 62 ? (e.consume(g), ee) : g === 45 && i === 2 ? (e.consume(g), m) : M(g);
  }
  function ee(g) {
    return g === null || K(g) ? (e.exit("htmlFlowData"), Re(g)) : (e.consume(g), ee);
  }
  function Re(g) {
    return e.exit("htmlFlow"), t(g);
  }
}
function Fc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return K(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), a) : n(s);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
function Uc(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(vn, t, n);
  }
}
const zc = {
  name: "htmlText",
  tokenize: Bc
};
function Bc(e, t, n) {
  const r = this;
  let i, a, s;
  return o;
  function o(m) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(m), l;
  }
  function l(m) {
    return m === 33 ? (e.consume(m), c) : m === 47 ? (e.consume(m), L) : m === 63 ? (e.consume(m), N) : dt(m) ? (e.consume(m), O) : n(m);
  }
  function c(m) {
    return m === 45 ? (e.consume(m), u) : m === 91 ? (e.consume(m), a = 0, y) : dt(m) ? (e.consume(m), k) : n(m);
  }
  function u(m) {
    return m === 45 ? (e.consume(m), d) : n(m);
  }
  function p(m) {
    return m === null ? n(m) : m === 45 ? (e.consume(m), f) : K(m) ? (s = p, D(m)) : (e.consume(m), p);
  }
  function f(m) {
    return m === 45 ? (e.consume(m), d) : p(m);
  }
  function d(m) {
    return m === 62 ? ne(m) : m === 45 ? f(m) : p(m);
  }
  function y(m) {
    const ee = "CDATA[";
    return m === ee.charCodeAt(a++) ? (e.consume(m), a === ee.length ? S : y) : n(m);
  }
  function S(m) {
    return m === null ? n(m) : m === 93 ? (e.consume(m), A) : K(m) ? (s = S, D(m)) : (e.consume(m), S);
  }
  function A(m) {
    return m === 93 ? (e.consume(m), w) : S(m);
  }
  function w(m) {
    return m === 62 ? ne(m) : m === 93 ? (e.consume(m), w) : S(m);
  }
  function k(m) {
    return m === null || m === 62 ? ne(m) : K(m) ? (s = k, D(m)) : (e.consume(m), k);
  }
  function N(m) {
    return m === null ? n(m) : m === 63 ? (e.consume(m), P) : K(m) ? (s = N, D(m)) : (e.consume(m), N);
  }
  function P(m) {
    return m === 62 ? ne(m) : N(m);
  }
  function L(m) {
    return dt(m) ? (e.consume(m), T) : n(m);
  }
  function T(m) {
    return m === 45 || We(m) ? (e.consume(m), T) : z(m);
  }
  function z(m) {
    return K(m) ? (s = z, D(m)) : ie(m) ? (e.consume(m), z) : ne(m);
  }
  function O(m) {
    return m === 45 || We(m) ? (e.consume(m), O) : m === 47 || m === 62 || Pe(m) ? F(m) : n(m);
  }
  function F(m) {
    return m === 47 ? (e.consume(m), ne) : m === 58 || m === 95 || dt(m) ? (e.consume(m), U) : K(m) ? (s = F, D(m)) : ie(m) ? (e.consume(m), F) : ne(m);
  }
  function U(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || We(m) ? (e.consume(m), U) : b(m);
  }
  function b(m) {
    return m === 61 ? (e.consume(m), M) : K(m) ? (s = b, D(m)) : ie(m) ? (e.consume(m), b) : F(m);
  }
  function M(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (e.consume(m), i = m, W) : K(m) ? (s = M, D(m)) : ie(m) ? (e.consume(m), M) : (e.consume(m), q);
  }
  function W(m) {
    return m === i ? (e.consume(m), i = void 0, j) : m === null ? n(m) : K(m) ? (s = W, D(m)) : (e.consume(m), W);
  }
  function q(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96 ? n(m) : m === 47 || m === 62 || Pe(m) ? F(m) : (e.consume(m), q);
  }
  function j(m) {
    return m === 47 || m === 62 || Pe(m) ? F(m) : n(m);
  }
  function ne(m) {
    return m === 62 ? (e.consume(m), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(m);
  }
  function D(m) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), ce;
  }
  function ce(m) {
    return ie(m) ? le(e, Te, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m) : Te(m);
  }
  function Te(m) {
    return e.enter("htmlTextData"), s(m);
  }
}
const _r = {
  name: "labelEnd",
  resolveAll: jc,
  resolveTo: $c,
  tokenize: Zc
}, Gc = {
  tokenize: Kc
}, Vc = {
  tokenize: qc
}, Wc = {
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
  return e.length !== n.length && pt(e, 0, e.length, n), e;
}
function $c(e, t) {
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
  return o = [["enter", l, t], ["enter", c, t]], o = Ke(o, e.slice(a + 1, a + r + 3)), o = Ke(o, [["enter", u, t]]), o = Ke(o, Tr(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, s - 3), t)), o = Ke(o, [["exit", u, t], e[s - 2], e[s - 1], ["exit", c, t]]), o = Ke(o, e.slice(s + 1)), o = Ke(o, [["exit", l, t]]), pt(e, a, e.length, o), e;
}
function Zc(e, t, n) {
  const r = this;
  let i = r.events.length, a, s;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return o;
  function o(f) {
    return a ? a._inactive ? p(f) : (s = r.parser.defined.includes(Ut(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(f), e.exit("labelMarker"), e.exit("labelEnd"), l) : n(f);
  }
  function l(f) {
    return f === 40 ? e.attempt(Gc, u, s ? u : p)(f) : f === 91 ? e.attempt(Vc, u, s ? c : p)(f) : s ? u(f) : p(f);
  }
  function c(f) {
    return e.attempt(Wc, u, p)(f);
  }
  function u(f) {
    return t(f);
  }
  function p(f) {
    return a._balanced = !0, n(f);
  }
}
function Kc(e, t, n) {
  return r;
  function r(p) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), i;
  }
  function i(p) {
    return Pe(p) ? Jt(e, a)(p) : a(p);
  }
  function a(p) {
    return p === 41 ? u(p) : Ta(e, s, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(p);
  }
  function s(p) {
    return Pe(p) ? Jt(e, l)(p) : u(p);
  }
  function o(p) {
    return n(p);
  }
  function l(p) {
    return p === 34 || p === 39 || p === 40 ? ka(e, c, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(p) : u(p);
  }
  function c(p) {
    return Pe(p) ? Jt(e, u)(p) : u(p);
  }
  function u(p) {
    return p === 41 ? (e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), e.exit("resource"), t) : n(p);
  }
}
function qc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return _a.call(r, e, a, s, "reference", "referenceMarker", "referenceString")(o);
  }
  function a(o) {
    return r.parser.defined.includes(Ut(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(o) : n(o);
  }
  function s(o) {
    return n(o);
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
  resolveAll: _r.resolveAll,
  tokenize: Jc
};
function Jc(e, t, n) {
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
const Qc = {
  name: "labelStartLink",
  resolveAll: _r.resolveAll,
  tokenize: eu
};
function eu(e, t, n) {
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
  tokenize: tu
};
function tu(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), le(e, t, "linePrefix");
  }
}
const Cn = {
  name: "thematicBreak",
  tokenize: nu
};
function nu(e, t, n) {
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
    return c === i ? (e.consume(c), r++, l) : (e.exit("thematicBreakSequence"), ie(c) ? le(e, o, "whitespace")(c) : o(c));
  }
}
const Oe = {
  continuation: {
    tokenize: su
  },
  exit: lu,
  name: "list",
  tokenize: au
}, ru = {
  partial: !0,
  tokenize: cu
}, iu = {
  partial: !0,
  tokenize: ou
};
function au(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, s = 0;
  return o;
  function o(d) {
    const y = r.containerState.type || (d === 42 || d === 43 || d === 45 ? "listUnordered" : "listOrdered");
    if (y === "listUnordered" ? !r.containerState.marker || d === r.containerState.marker : lr(d)) {
      if (r.containerState.type || (r.containerState.type = y, e.enter(y, {
        _container: !0
      })), y === "listUnordered")
        return e.enter("listItemPrefix"), d === 42 || d === 45 ? e.check(Cn, n, c)(d) : c(d);
      if (!r.interrupt || d === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), l(d);
    }
    return n(d);
  }
  function l(d) {
    return lr(d) && ++s < 10 ? (e.consume(d), l) : (!r.interrupt || s < 2) && (r.containerState.marker ? d === r.containerState.marker : d === 41 || d === 46) ? (e.exit("listItemValue"), c(d)) : n(d);
  }
  function c(d) {
    return e.enter("listItemMarker"), e.consume(d), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || d, e.check(
      vn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : u,
      e.attempt(ru, f, p)
    );
  }
  function u(d) {
    return r.containerState.initialBlankLine = !0, a++, f(d);
  }
  function p(d) {
    return ie(d) ? (e.enter("listItemPrefixWhitespace"), e.consume(d), e.exit("listItemPrefixWhitespace"), f) : n(d);
  }
  function f(d) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(d);
  }
}
function su(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(vn, i, a);
  function i(o) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, le(e, t, "listItemIndent", r.containerState.size + 1)(o);
  }
  function a(o) {
    return r.containerState.furtherBlankLines || !ie(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(iu, t, s)(o));
  }
  function s(o) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, le(e, e.attempt(Oe, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
  }
}
function ou(e, t, n) {
  const r = this;
  return le(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "listItemIndent" && s[2].sliceSerialize(s[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function lu(e) {
  e.exit(this.containerState.type);
}
function cu(e, t, n) {
  const r = this;
  return le(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const s = r.events[r.events.length - 1];
    return !ie(a) && s && s[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const Si = {
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
function hu(e, t, n) {
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
    return c === i ? (e.consume(c), o) : (e.exit("setextHeadingLineSequence"), ie(c) ? le(e, l, "lineSuffix")(c) : l(c));
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
    vn,
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
  resolveAll: ba()
}, gu = xa("string"), mu = xa("text");
function xa(e) {
  return {
    resolveAll: ba(e === "text" ? Cu : void 0),
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
function ba(e) {
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
const yu = {
  42: Oe,
  43: Oe,
  45: Oe,
  48: Oe,
  49: Oe,
  50: Oe,
  51: Oe,
  52: Oe,
  53: Oe,
  54: Oe,
  55: Oe,
  56: Oe,
  57: Oe,
  62: ya
}, wu = {
  91: _c
}, Su = {
  [-2]: Vn,
  [-1]: Vn,
  32: Vn
}, Eu = {
  35: Rc,
  42: Cn,
  45: [Si, Cn],
  60: Lc,
  61: Si,
  95: Cn,
  96: yi,
  126: yi
}, Tu = {
  38: Sa,
  92: wa
}, _u = {
  [-5]: Wn,
  [-4]: Wn,
  [-3]: Wn,
  33: Yc,
  38: Sa,
  42: cr,
  60: [Ql, zc],
  91: Qc,
  92: [vc, wa],
  93: _r,
  95: cr,
  96: dc
}, ku = {
  null: [cr, fu]
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
  let s = [], o = [];
  const l = {
    attempt: z(L),
    check: z(T),
    consume: k,
    enter: N,
    exit: P,
    interrupt: z(T, {
      interrupt: !0
    })
  }, c = {
    code: null,
    containerState: {},
    defineSkip: S,
    events: [],
    now: y,
    parser: e,
    previous: null,
    sliceSerialize: f,
    sliceStream: d,
    write: p
  };
  let u = t.tokenize.call(c, l);
  return t.resolveAll && a.push(t), c;
  function p(b) {
    return s = Ke(s, b), A(), s[s.length - 1] !== null ? [] : (O(t, 0), c.events = Tr(a, c.events, c), c.events);
  }
  function f(b, M) {
    return Au(d(b), M);
  }
  function d(b) {
    return Ru(s, b);
  }
  function y() {
    const {
      _bufferIndex: b,
      _index: M,
      line: W,
      column: q,
      offset: j
    } = r;
    return {
      _bufferIndex: b,
      _index: M,
      line: W,
      column: q,
      offset: j
    };
  }
  function S(b) {
    i[b.line] = b.column, U();
  }
  function A() {
    let b;
    for (; r._index < s.length; ) {
      const M = s[r._index];
      if (typeof M == "string")
        for (b = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === b && r._bufferIndex < M.length; )
          w(M.charCodeAt(r._bufferIndex));
      else
        w(M);
    }
  }
  function w(b) {
    u = u(b);
  }
  function k(b) {
    K(b) ? (r.line++, r.column = 1, r.offset += b === -3 ? 2 : 1, U()) : b !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    s[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = b;
  }
  function N(b, M) {
    const W = M || {};
    return W.type = b, W.start = y(), c.events.push(["enter", W, c]), o.push(W), W;
  }
  function P(b) {
    const M = o.pop();
    return M.end = y(), c.events.push(["exit", M, c]), M;
  }
  function L(b, M) {
    O(b, M.from);
  }
  function T(b, M) {
    M.restore();
  }
  function z(b, M) {
    return W;
    function W(q, j, ne) {
      let D, ce, Te, m;
      return Array.isArray(q) ? (
        /* c8 ignore next 1 */
        Re(q)
      ) : "tokenize" in q ? (
        // Looks like a construct.
        Re([
          /** @type {Construct} */
          q
        ])
      ) : ee(q);
      function ee(ae) {
        return Fe;
        function Fe(me) {
          const je = me !== null && ae[me], Ue = me !== null && ae.null, it = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(je) ? je : je ? [je] : [],
            ...Array.isArray(Ue) ? Ue : Ue ? [Ue] : []
          ];
          return Re(it)(me);
        }
      }
      function Re(ae) {
        return D = ae, ce = 0, ae.length === 0 ? ne : g(ae[ce]);
      }
      function g(ae) {
        return Fe;
        function Fe(me) {
          return m = F(), Te = ae, ae.partial || (c.currentConstruct = ae), ae.name && c.parser.constructs.disable.null.includes(ae.name) ? te() : ae.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            M ? Object.assign(Object.create(c), M) : c,
            l,
            Se,
            te
          )(me);
        }
      }
      function Se(ae) {
        return b(Te, m), j;
      }
      function te(ae) {
        return m.restore(), ++ce < D.length ? g(D[ce]) : ne;
      }
    }
  }
  function O(b, M) {
    b.resolveAll && !a.includes(b) && a.push(b), b.resolve && pt(c.events, M, c.events.length - M, b.resolve(c.events.slice(M), c)), b.resolveTo && (c.events = b.resolveTo(c.events, c));
  }
  function F() {
    const b = y(), M = c.previous, W = c.currentConstruct, q = c.events.length, j = Array.from(o);
    return {
      from: q,
      restore: ne
    };
    function ne() {
      r = b, c.previous = M, c.currentConstruct = W, c.events.length = q, o = j, U();
    }
  }
  function U() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Ru(e, t) {
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
function Au(e, t) {
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
    return s;
    function s(o) {
      return Iu(r, a, o);
    }
  }
}
function Mu(e) {
  for (; !Ea(e); )
    ;
  return e;
}
const Ei = /[\0\t\n\r]/g;
function Lu() {
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
const Ou = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Du(e) {
  return e.replace(Ou, Pu);
}
function Pu(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return Ca(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return Er(n) || e;
}
const va = {}.hasOwnProperty;
function Hu(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Fu(n)(Mu(Nu(n).document().write(Lu()(e, t, !0))));
}
function Fu(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(at),
      autolinkProtocol: F,
      autolinkEmail: F,
      atxHeading: a(ze),
      blockQuote: a(Ue),
      characterEscape: F,
      characterReference: F,
      codeFenced: a(it),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: a(it, s),
      codeText: a(It, s),
      codeTextData: F,
      data: F,
      codeFlowValue: F,
      definition: a(Je),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: a(ft),
      hardBreakEscape: a(St),
      hardBreakTrailing: a(St),
      htmlFlow: a(Et, s),
      htmlFlowData: F,
      htmlText: a(Et, s),
      htmlTextData: F,
      image: a(Qe),
      label: s,
      link: a(at),
      listItem: a(Tt),
      listItemValue: f,
      listOrdered: a(st, p),
      listUnordered: a(st),
      paragraph: a(ot),
      reference: g,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: a(ze),
      strong: a(Vt),
      thematicBreak: a(et)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: L,
      autolink: l(),
      autolinkEmail: je,
      autolinkProtocol: me,
      blockQuote: l(),
      characterEscapeValue: U,
      characterReferenceMarkerHexadecimal: te,
      characterReferenceMarkerNumeric: te,
      characterReferenceValue: ae,
      characterReference: Fe,
      codeFenced: l(A),
      codeFencedFence: S,
      codeFencedFenceInfo: d,
      codeFencedFenceMeta: y,
      codeFlowValue: U,
      codeIndented: l(w),
      codeText: l(j),
      codeTextData: U,
      data: U,
      definition: l(),
      definitionDestinationString: P,
      definitionLabelString: k,
      definitionTitleString: N,
      emphasis: l(),
      hardBreakEscape: l(M),
      hardBreakTrailing: l(M),
      htmlFlow: l(W),
      htmlFlowData: U,
      htmlText: l(q),
      htmlTextData: U,
      image: l(D),
      label: Te,
      labelText: ce,
      lineEnding: b,
      link: l(ne),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: Se,
      resourceDestinationString: m,
      resourceTitleString: ee,
      resource: Re,
      setextHeading: l(O),
      setextHeadingLineSequence: z,
      setextHeadingText: T,
      strong: l(),
      thematicBreak: l()
    }
  };
  Ia(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(E) {
    let R = {
      type: "root",
      children: []
    };
    const V = {
      stack: [R],
      tokenStack: [],
      config: t,
      enter: o,
      exit: c,
      buffer: s,
      resume: u,
      data: n
    }, X = [];
    let Q = -1;
    for (; ++Q < E.length; )
      if (E[Q][1].type === "listOrdered" || E[Q][1].type === "listUnordered")
        if (E[Q][0] === "enter")
          X.push(Q);
        else {
          const Ce = X.pop();
          Q = i(E, Ce, Q);
        }
    for (Q = -1; ++Q < E.length; ) {
      const Ce = t[E[Q][0]];
      va.call(Ce, E[Q][1].type) && Ce[E[Q][1].type].call(Object.assign({
        sliceSerialize: E[Q][2].sliceSerialize
      }, V), E[Q][1]);
    }
    if (V.tokenStack.length > 0) {
      const Ce = V.tokenStack[V.tokenStack.length - 1];
      (Ce[1] || Ti).call(V, void 0, Ce[0]);
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
    }, Q = -1; ++Q < t.transforms.length; )
      R = t.transforms[Q](R) || R;
    return R;
  }
  function i(E, R, V) {
    let X = R - 1, Q = -1, Ce = !1, Be, _e, Ze, ye;
    for (; ++X <= V; ) {
      const he = E[X];
      switch (he[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          he[0] === "enter" ? Q++ : Q--, ye = void 0;
          break;
        }
        case "lineEndingBlank": {
          he[0] === "enter" && (Be && !ye && !Q && !Ze && (Ze = X), ye = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          ye = void 0;
      }
      if (!Q && he[0] === "enter" && he[1].type === "listItemPrefix" || Q === -1 && he[0] === "exit" && (he[1].type === "listUnordered" || he[1].type === "listOrdered")) {
        if (Be) {
          let Ge = X;
          for (_e = void 0; Ge--; ) {
            const ke = E[Ge];
            if (ke[1].type === "lineEnding" || ke[1].type === "lineEndingBlank") {
              if (ke[0] === "exit") continue;
              _e && (E[_e][1].type = "lineEndingBlank", Ce = !0), ke[1].type = "lineEnding", _e = Ge;
            } else if (!(ke[1].type === "linePrefix" || ke[1].type === "blockQuotePrefix" || ke[1].type === "blockQuotePrefixWhitespace" || ke[1].type === "blockQuoteMarker" || ke[1].type === "listItemIndent")) break;
          }
          Ze && (!_e || Ze < _e) && (Be._spread = !0), Be.end = Object.assign({}, _e ? E[_e][1].start : he[1].end), E.splice(_e || X, 0, ["exit", Be, he[2]]), X++, V++;
        }
        if (he[1].type === "listItemPrefix") {
          const Ge = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, he[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Be = Ge, E.splice(X, 0, ["enter", Ge, he[2]]), X++, V++, Ze = void 0, ye = !0;
        }
      }
    }
    return E[R][1]._spread = Ce, V;
  }
  function a(E, R) {
    return V;
    function V(X) {
      o.call(this, E(X), X), R && R.call(this, X);
    }
  }
  function s() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function o(E, R, V) {
    this.stack[this.stack.length - 1].children.push(E), this.stack.push(E), this.tokenStack.push([R, V || void 0]), E.position = {
      start: kt(R.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function l(E) {
    return R;
    function R(V) {
      E && E.call(this, V), c.call(this, V);
    }
  }
  function c(E, R) {
    const V = this.stack.pop(), X = this.tokenStack.pop();
    if (X)
      X[0].type !== E.type && (R ? R.call(this, E, X[0]) : (X[1] || Ti).call(this, E, X[0]));
    else throw new Error("Cannot close `" + E.type + "` (" + Yt({
      start: E.start,
      end: E.end
    }) + "): it’s not open");
    V.position.end = kt(E.end);
  }
  function u() {
    return Pl(this.stack.pop());
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
  function y() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.meta = E;
  }
  function S() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function A() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function w() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.value = E.replace(/(\r?\n|\r)$/g, "");
  }
  function k(E) {
    const R = this.resume(), V = this.stack[this.stack.length - 1];
    V.label = R, V.identifier = Ut(this.sliceSerialize(E)).toLowerCase();
  }
  function N() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.title = E;
  }
  function P() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.url = E;
  }
  function L(E) {
    const R = this.stack[this.stack.length - 1];
    if (!R.depth) {
      const V = this.sliceSerialize(E).length;
      R.depth = V;
    }
  }
  function T() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function z(E) {
    const R = this.stack[this.stack.length - 1];
    R.depth = this.sliceSerialize(E).codePointAt(0) === 61 ? 1 : 2;
  }
  function O() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function F(E) {
    const V = this.stack[this.stack.length - 1].children;
    let X = V[V.length - 1];
    (!X || X.type !== "text") && (X = $e(), X.position = {
      start: kt(E.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, V.push(X)), this.stack.push(X);
  }
  function U(E) {
    const R = this.stack.pop();
    R.value += this.sliceSerialize(E), R.position.end = kt(E.end);
  }
  function b(E) {
    const R = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const V = R.children[R.children.length - 1];
      V.position.end = kt(E.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(R.type) && (F.call(this, E), U.call(this, E));
  }
  function M() {
    this.data.atHardBreak = !0;
  }
  function W() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.value = E;
  }
  function q() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.value = E;
  }
  function j() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.value = E;
  }
  function ne() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const R = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = R, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function D() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const R = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = R, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function ce(E) {
    const R = this.sliceSerialize(E), V = this.stack[this.stack.length - 2];
    V.label = Du(R), V.identifier = Ut(R).toLowerCase();
  }
  function Te() {
    const E = this.stack[this.stack.length - 1], R = this.resume(), V = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, V.type === "link") {
      const X = E.children;
      V.children = X;
    } else
      V.alt = R;
  }
  function m() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.url = E;
  }
  function ee() {
    const E = this.resume(), R = this.stack[this.stack.length - 1];
    R.title = E;
  }
  function Re() {
    this.data.inReference = void 0;
  }
  function g() {
    this.data.referenceType = "collapsed";
  }
  function Se(E) {
    const R = this.resume(), V = this.stack[this.stack.length - 1];
    V.label = R, V.identifier = Ut(this.sliceSerialize(E)).toLowerCase(), this.data.referenceType = "full";
  }
  function te(E) {
    this.data.characterReferenceType = E.type;
  }
  function ae(E) {
    const R = this.sliceSerialize(E), V = this.data.characterReferenceType;
    let X;
    V ? (X = Ca(R, V === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : X = Er(R);
    const Q = this.stack[this.stack.length - 1];
    Q.value += X;
  }
  function Fe(E) {
    const R = this.stack.pop();
    R.position.end = kt(E.end);
  }
  function me(E) {
    U.call(this, E);
    const R = this.stack[this.stack.length - 1];
    R.url = this.sliceSerialize(E);
  }
  function je(E) {
    U.call(this, E);
    const R = this.stack[this.stack.length - 1];
    R.url = "mailto:" + this.sliceSerialize(E);
  }
  function Ue() {
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
  function ft() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function ze() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function St() {
    return {
      type: "break"
    };
  }
  function Et() {
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
  function st(E) {
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
  function ot() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Vt() {
    return {
      type: "strong",
      children: []
    };
  }
  function $e() {
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
function Ia(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Ia(e, r) : Uu(e, r);
  }
}
function Uu(e, t) {
  let n;
  for (n in t)
    if (va.call(t, n))
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
  throw e ? new Error("Cannot close `" + e.type + "` (" + Yt({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Yt({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Yt({
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
function Gu(e, t) {
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
function Wu(e, t) {
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
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Gt(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
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
function Ra(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return s && s.type === "text" ? s.value += r : i.push({ type: "text", value: r }), i;
}
function qu(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Ra(e, t);
  const i = { src: Gt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function Xu(e, t) {
  const n = { src: Gt(t.url) };
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
    return Ra(e, t);
  const i = { href: Gt(r.url || "") };
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
  const n = { href: Gt(t.url) };
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
  const r = e.all(t), i = n ? t1(n) : Aa(t), a = {}, s = [];
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
function t1(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = Aa(n[r]);
  }
  return t;
}
function Aa(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function n1(e, t) {
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
function s1(e, t) {
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
    }, o = Cr(t.children[1]), l = ua(t.children[t.children.length - 1]);
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
function o1(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", s = n && n.type === "table" ? n.align : void 0, o = s ? s.length : t.children.length;
  let l = -1;
  const c = [];
  for (; ++l < o; ) {
    const p = t.children[l], f = {}, d = s ? s[l] : void 0;
    d && (f.align = d);
    let y = { type: "element", tagName: a, properties: f, children: [] };
    p && (y.children = e.all(p), e.patch(p, y), y = e.applyData(p, y)), c.push(y);
  }
  const u = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(c, !0)
  };
  return e.patch(t, u), e.applyData(t, u);
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
const _i = 9, ki = 32;
function c1(e) {
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
  break: Gu,
  code: Vu,
  delete: Wu,
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
  table: s1,
  tableCell: l1,
  tableRow: o1,
  text: u1,
  thematicBreak: h1,
  toml: dn,
  yaml: dn,
  definition: dn,
  footnoteDefinition: dn
};
function dn() {
}
const Na = -1, In = 0, Qt = 1, _n = 2, kr = 3, xr = 4, br = 5, vr = 6, Ma = 7, La = 8, bi = typeof self == "object" ? self : globalThis, p1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, s] = t[i];
    switch (a) {
      case In:
      case Na:
        return n(s, i);
      case Qt: {
        const o = n([], i);
        for (const l of s)
          o.push(r(l));
        return o;
      }
      case _n: {
        const o = n({}, i);
        for (const [l, c] of s)
          o[r(l)] = r(c);
        return o;
      }
      case kr:
        return n(new Date(s), i);
      case xr: {
        const { source: o, flags: l } = s;
        return n(new RegExp(o, l), i);
      }
      case br: {
        const o = n(/* @__PURE__ */ new Map(), i);
        for (const [l, c] of s)
          o.set(r(l), r(c));
        return o;
      }
      case vr: {
        const o = n(/* @__PURE__ */ new Set(), i);
        for (const l of s)
          o.add(r(l));
        return o;
      }
      case Ma: {
        const { name: o, message: l } = s;
        return n(new bi[o](l), i);
      }
      case La:
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
}, vi = (e) => p1(/* @__PURE__ */ new Map(), e)(0), Pt = "", { toString: f1 } = {}, { keys: g1 } = Object, Xt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [In, t];
  const n = f1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [Qt, Pt];
    case "Object":
      return [_n, Pt];
    case "Date":
      return [kr, Pt];
    case "RegExp":
      return [xr, Pt];
    case "Map":
      return [br, Pt];
    case "Set":
      return [vr, Pt];
    case "DataView":
      return [Qt, n];
  }
  return n.includes("Array") ? [Qt, n] : n.includes("Error") ? [Ma, n] : [_n, n];
}, pn = ([e, t]) => e === In && (t === "function" || t === "symbol"), m1 = (e, t, n, r) => {
  const i = (s, o) => {
    const l = r.push(s) - 1;
    return n.set(o, l), l;
  }, a = (s) => {
    if (n.has(s))
      return n.get(s);
    let [o, l] = Xt(s);
    switch (o) {
      case In: {
        let u = s;
        switch (l) {
          case "bigint":
            o = La, u = s.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + l);
            u = null;
            break;
          case "undefined":
            return i([Na], s);
        }
        return i([o, u], s);
      }
      case Qt: {
        if (l) {
          let f = s;
          return l === "DataView" ? f = new Uint8Array(s.buffer) : l === "ArrayBuffer" && (f = new Uint8Array(s)), i([l, [...f]], s);
        }
        const u = [], p = i([o, u], s);
        for (const f of s)
          u.push(a(f));
        return p;
      }
      case _n: {
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
        for (const f of g1(s))
          (e || !pn(Xt(s[f]))) && u.push([a(f), a(s[f])]);
        return p;
      }
      case kr:
        return i([o, s.toISOString()], s);
      case xr: {
        const { source: u, flags: p } = s;
        return i([o, { source: u, flags: p }], s);
      }
      case br: {
        const u = [], p = i([o, u], s);
        for (const [f, d] of s)
          (e || !(pn(Xt(f)) || pn(Xt(d)))) && u.push([a(f), a(d)]);
        return p;
      }
      case vr: {
        const u = [], p = i([o, u], s);
        for (const f of s)
          (e || !pn(Xt(f))) && u.push(a(f));
        return p;
      }
    }
    const { message: c } = s;
    return i([o, { name: l, message: c }], s);
  };
  return a;
}, Ii = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return m1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, kn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? vi(Ii(e, t)) : structuredClone(e)
) : (e, t) => vi(Ii(e, t));
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
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || C1, r = e.options.footnoteBackLabel || y1, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", s = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let l = -1;
  for (; ++l < e.footnoteOrder.length; ) {
    const c = e.footnoteById.get(
      e.footnoteOrder[l]
    );
    if (!c)
      continue;
    const u = e.all(c), p = String(c.identifier).toUpperCase(), f = Gt(p.toLowerCase());
    let d = 0;
    const y = [], S = e.footnoteCounts.get(p);
    for (; S !== void 0 && ++d <= S; ) {
      y.length > 0 && y.push({ type: "text", value: " " });
      let k = typeof n == "string" ? n : n(l, d);
      typeof k == "string" && (k = { type: "text", value: k }), y.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + f + (d > 1 ? "-" + d : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(l, d),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(k) ? k : [k]
      });
    }
    const A = u[u.length - 1];
    if (A && A.type === "element" && A.tagName === "p") {
      const k = A.children[A.children.length - 1];
      k && k.type === "text" ? k.value += " " : A.children.push({ type: "text", value: " " }), A.children.push(...y);
    } else
      u.push(...y);
    const w = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + f },
      children: e.wrap(u, !0)
    };
    e.patch(c, w), o.push(w);
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
            ...kn(s),
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
const Oa = (
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
      return Rn(e);
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
    t[n] = Oa(e[n]);
  return Rn(r);
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
  return Rn(n);
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
  return Rn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Rn(e) {
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
const Da = [], x1 = !0, Ri = !1, b1 = "skip";
function v1(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = Oa(i), s = r ? -1 : 1;
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
      let d = Da, y, S, A;
      if ((!t || a(l, c, u[u.length - 1] || void 0)) && (d = I1(n(l, u)), d[0] === Ri))
        return d;
      if ("children" in l && l.children) {
        const w = (
          /** @type {UnistParent} */
          l
        );
        if (w.children && d[0] !== b1)
          for (S = (r ? w.children.length : -1) + s, A = u.concat(w); S > -1 && S < w.children.length; ) {
            const k = w.children[S];
            if (y = o(k, S, A)(), y[0] === Ri)
              return y;
            S = typeof y[1] == "number" ? y[1] : S + s;
          }
      }
      return d;
    }
  }
}
function I1(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [x1, e] : e == null ? Da : [e];
}
function Pa(e, t, n, r) {
  let i, a, s;
  typeof t == "function" && typeof n != "function" ? (a = void 0, s = t, i = n) : (a = t, s = n, i = r), v1(e, a, o, i);
  function o(l, c) {
    const u = c[c.length - 1], p = u ? u.children.indexOf(l) : void 0;
    return s(l, p, u);
  }
}
const ur = {}.hasOwnProperty, R1 = {};
function A1(e, t) {
  const n = t || R1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = { ...d1, ...n.handlers }, o = {
    all: c,
    applyData: M1,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: s,
    one: l,
    options: n,
    patch: N1,
    wrap: O1
  };
  return Pa(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const p = u.type === "definition" ? r : i, f = String(u.identifier).toUpperCase();
      p.has(f) || p.set(f, u);
    }
  }), o;
  function l(u, p) {
    const f = u.type, d = o.handlers[f];
    if (ur.call(o.handlers, f) && d)
      return d(o, u, p);
    if (o.options.passThrough && o.options.passThrough.includes(f)) {
      if ("children" in u) {
        const { children: S, ...A } = u, w = kn(A);
        return w.children = o.all(u), w;
      }
      return kn(u);
    }
    return (o.options.unknownHandler || L1)(o, u, p);
  }
  function c(u) {
    const p = [];
    if ("children" in u) {
      const f = u.children;
      let d = -1;
      for (; ++d < f.length; ) {
        const y = o.one(f[d], u);
        if (y) {
          if (d && f[d - 1].type === "break" && (!Array.isArray(y) && y.type === "text" && (y.value = Ai(y.value)), !Array.isArray(y) && y.type === "element")) {
            const S = y.children[0];
            S && S.type === "text" && (S.value = Ai(S.value));
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
        const s = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: s };
      }
    n.type === "element" && a && Object.assign(n.properties, kn(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function L1(e, t) {
  const n = t.data || {}, r = "value" in t && !(ur.call(n, "hProperties") || ur.call(n, "hChildren")) ? { type: "text", value: t.value } : {
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
function Ai(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function Ni(e, t) {
  const n = A1(e, t), r = n.one(e, void 0), i = w1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function D1(e, t) {
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
var yn = Object.prototype.hasOwnProperty, Ha = Object.prototype.toString, Li = Object.defineProperty, Oi = Object.getOwnPropertyDescriptor, Di = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : Ha.call(t) === "[object Array]";
}, Pi = function(t) {
  if (!t || Ha.call(t) !== "[object Object]")
    return !1;
  var n = yn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && yn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || yn.call(t, i);
}, Hi = function(t, n) {
  Li && n.name === "__proto__" ? Li(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, Fi = function(t, n) {
  if (n === "__proto__")
    if (yn.call(t, n)) {
      if (Oi)
        return Oi(t, n).value;
    } else return;
  return t[n];
}, P1 = function e() {
  var t, n, r, i, a, s, o = arguments[0], l = 1, c = arguments.length, u = !1;
  for (typeof o == "boolean" && (u = o, o = arguments[1] || {}, l = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); l < c; ++l)
    if (t = arguments[l], t != null)
      for (n in t)
        r = Fi(o, n), i = Fi(t, n), o !== i && (u && i && (Pi(i) || (a = Di(i))) ? (a ? (a = !1, s = r && Di(r) ? r : []) : s = r && Pi(r) ? r : {}, Hi(o, { name: n, newValue: e(u, s, i) })) : typeof i < "u" && Hi(o, { name: n, newValue: i }));
  return o;
};
const jn = /* @__PURE__ */ ca(P1);
function hr(e) {
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
      i = c, u ? F1(u, o)(...c) : s(null, ...c);
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
const ct = { basename: U1, dirname: z1, extname: B1, join: G1, sep: "/" };
function U1(e, t) {
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
function z1(e) {
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
function B1(e) {
  rn(e);
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
function G1(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    rn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : V1(n);
}
function V1(e) {
  rn(e);
  const t = e.codePointAt(0) === 47;
  let n = W1(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function W1(e, t) {
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
function rn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const j1 = { cwd: $1 };
function $1() {
  return "/";
}
function dr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Z1(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!dr(e)) {
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
const $n = (
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
class Fa {
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
    t ? dr(t) ? n = { path: t } : typeof t == "string" || q1(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : j1.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < $n.length; ) {
      const a = $n[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      $n.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? ct.basename(this.path) : void 0;
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
    Kn(t, "basename"), Zn(t, "basename"), this.path = ct.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? ct.dirname(this.path) : void 0;
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
    Ui(this.basename, "dirname"), this.path = ct.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? ct.extname(this.path) : void 0;
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
    if (Zn(t, "extname"), Ui(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ct.join(this.dirname, this.stem + (t || ""));
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
    dr(t) && (t = Z1(t)), Kn(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? ct.basename(this.path, this.extname) : void 0;
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
    Kn(t, "stem"), Zn(t, "stem"), this.path = ct.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new Ie(
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
function Zn(e, t) {
  if (e && e.includes(ct.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ct.sep + "`"
    );
}
function Kn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function Ui(e, t) {
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
class Ir extends X1 {
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
      new Ir()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(jn(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (Yn("data", this.frozen), this.namespace[t] = n, this) : Y1.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Yn("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = fn(t), r = this.parser || this.Parser;
    return qn("parse", r), r(String(n), n);
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
    return this.freeze(), qn("process", this.parser || this.Parser), Xn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, s) {
      const o = fn(t), l = (
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
        ), y = r.stringify(d, f);
        eh(y) ? f.value = y : f.result = y, c(
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
    return this.freeze(), qn("processSync", this.parser || this.Parser), Xn("processSync", this.compiler || this.Compiler), this.process(t, i), Bi("processSync", "process", n), r;
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
      const l = fn(n);
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
    const r = fn(n), i = this.compiler || this.Compiler;
    return Xn("stringify", i), zi(t), i(t, r);
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
    if (Yn("use", this.frozen), t != null) if (typeof t == "function")
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
      o(c.plugins), c.settings && (i.settings = jn(!0, i.settings, c.settings));
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
        let [d, ...y] = u;
        const S = r[f][1];
        hr(S) && hr(d) && (d = jn(!0, S, d)), r[f] = [c, d, ...y];
      }
    }
  }
}
const J1 = new Ir().freeze();
function qn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Xn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Yn(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function zi(e) {
  if (!hr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Bi(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function fn(e) {
  return Q1(e) ? e : new Fa(e);
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
function Wi(e) {
  const t = ah(e), n = sh(e);
  return oh(t.runSync(t.parse(n), n), e);
}
function ah(e) {
  const t = e.rehypePlugins || Gi, n = e.remarkPlugins || Gi, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Vi } : Vi;
  return J1().use(zu).use(n).use(D1, r).use(t);
}
function sh(e) {
  const t = e.children || "", n = new Fa();
  return typeof t == "string" && (n.value = t), n;
}
function oh(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, s = t.skipHtml, o = t.unwrapDisallowed, l = t.urlTransform || lh;
  for (const u of ih)
    Object.hasOwn(t, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + nh + u.id, void 0);
  return Pa(e, c), wl(e, {
    Fragment: zt,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: h,
    jsxs: x,
    passKeys: !0,
    passNode: !0
  });
  function c(u, p, f) {
    if (u.type === "raw" && f && typeof p == "number")
      return s ? f.children.splice(p, 1) : f.children[p] = { type: "text", value: u.value }, p;
    if (u.type === "element") {
      let d;
      for (d in Gn)
        if (Object.hasOwn(Gn, d) && Object.hasOwn(u.properties, d)) {
          const y = u.properties[d], S = Gn[d];
          (S === null || S.includes(u.tagName)) && (u.properties[d] = l(String(y || ""), d, u));
        }
    }
    if (u.type === "element") {
      let d = n ? !n.includes(u.tagName) : a ? a.includes(u.tagName) : !1;
      if (!d && r && typeof p == "number" && (d = !r(u, p, f)), d && f && typeof p == "number")
        return o && u.children ? f.children.splice(p, 1, ...u.children) : f.children.splice(p, 1), p;
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
  const [n, r] = se(!0), [i, a] = se(!1);
  ut.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const s = () => {
    t || r(!n);
  }, o = ut.Children.map(e, (l) => {
    if (ut.isValidElement(l)) {
      if (l.type === Ua)
        return ut.cloneElement(
          l,
          {
            onToggle: s,
            isExpanded: n
          }
        );
      if (l.type === za)
        return ut.cloneElement(
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
function Ua({
  title: e,
  status: t = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const a = () => /* @__PURE__ */ x(
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
  return /* @__PURE__ */ x(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${s ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: s ? r : void 0,
      style: { cursor: s ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ x("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ h("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        s && /* @__PURE__ */ h(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ x(
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
function za({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function uh({ children: e }) {
  return /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle", children: e });
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
        return /* @__PURE__ */ x("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ x(
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
          ) : /* @__PURE__ */ x(
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
          /* @__PURE__ */ x("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ x(
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
        return /* @__PURE__ */ x("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ x(
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
          ) : /* @__PURE__ */ x(
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
          /* @__PURE__ */ x("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ x(
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
        return /* @__PURE__ */ x("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
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
        return /* @__PURE__ */ x("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ x(
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
          ) : /* @__PURE__ */ x(
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
          /* @__PURE__ */ x("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ x(
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
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ x(
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
function Ba({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ x("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
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
const dh = ({ message: e }) => {
  const [t, n] = se(!0);
  return /* @__PURE__ */ x("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ x(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!t),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          e.role === "system" ? /* @__PURE__ */ x("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ x(
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
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ x(
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
}, Ga = Ja(null);
function ph({ children: e, value: t }) {
  return /* @__PURE__ */ h(Ga.Provider, { value: t, children: e });
}
function an() {
  const e = Qa(Ga);
  if (!e)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return e;
}
const Va = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ h("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code-block", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ h("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ h("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ h("li", { className: "chat-wrapper__list-item", ...t, children: e })
}, fh = {
  ...Va,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code", ...n, children: e })
}, Wa = ji(
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
    } = an(), [c, u] = se(!1), [p, f] = se(!1), d = re(async () => {
      try {
        await navigator.clipboard.writeText(e.content), u(!0), setTimeout(() => u(!1), 2e3);
      } catch (L) {
        console.error("Failed to copy message:", L);
      }
    }, [e.content]), y = () => /* @__PURE__ */ x("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ h(Ba, { size: 16, variant: "dots" }),
      /* @__PURE__ */ h("span", { children: Z.UI_TEXT.THINKING })
    ] }), S = () => /* @__PURE__ */ x(zt, { children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ h(
        "button",
        {
          className: `chat-wrapper__copy-button ${p ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: d,
          title: "Copy message",
          children: /* @__PURE__ */ h(Eo, {})
        }
      ) }),
      c && /* @__PURE__ */ h("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), A = () => /* @__PURE__ */ h("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ x("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(Wi, { components: Va, children: e.content }) }),
      S()
    ] }) }), w = () => /* @__PURE__ */ x("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(Wi, { components: fh, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ h("div", { className: "chat-wrapper__media", children: e.media.map((L, T) => /* @__PURE__ */ h(
        "img",
        {
          src: L,
          alt: `Uploaded content ${T + 1}`,
          className: "chat-wrapper__media-image"
        },
        T
      )) })
    ] }), k = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === l.current ? y() : e.role === "system" ? /* @__PURE__ */ h(dh, { message: e }) : e.role === "assistant" ? A() : w(), N = () => /* @__PURE__ */ x(ch, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ h(
        Ua,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ h(za, { children: i(e.content) })
    ] }), P = () => {
      var L;
      return /* @__PURE__ */ h(uh, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ h(
        hh,
        {
          title: a(e.content, e.isStreaming),
          status: s(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (L = e.toolData) == null ? void 0 : L.toolName,
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
        children: e.role === "reasoning" ? N() : e.role === "tooling" ? P() : /* @__PURE__ */ h("div", { className: "chat-wrapper__message-content", children: k() })
      }
    );
  }
);
Wa.displayName = "MessageItem";
const gh = ({ isVisible: e }) => e ? /* @__PURE__ */ h("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ x("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ h("span", {}),
  /* @__PURE__ */ h("span", {}),
  /* @__PURE__ */ h("span", {})
] }) }) }) }) : null, ja = xn((e, t) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = an();
  return /* @__PURE__ */ x("div", { className: "chat-wrapper__messages", children: [
    n.map((a) => /* @__PURE__ */ h(
      Wa,
      {
        message: a
      },
      a.id
    )),
    /* @__PURE__ */ h(gh, { isVisible: r && !i }),
    /* @__PURE__ */ h("div", { ref: t })
  ] });
});
ja.displayName = "MessagesList";
const rt = (...e) => e.filter(Boolean).join(" "), mh = () => /* @__PURE__ */ x(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ x("g", { filter: "url(#filter0_dd_121_23927)", children: [
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
      /* @__PURE__ */ x("defs", { children: [
        /* @__PURE__ */ x(
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
), Ch = ({ className: e, ...t }) => /* @__PURE__ */ h("form", { className: rt("chat-wrapper__prompt-input", e), ...t }), $a = xn(
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
$a.displayName = "PromptInputTextarea";
const yh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: rt("chat-wrapper__prompt-toolbar", e), ...t }), wh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: rt("chat-wrapper__prompt-tools", e), ...t }), Sh = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || ut.Children.count(r) === 1) ? "icon" : t;
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
}, Eh = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = Xe.IDLE,
  children: i,
  disabled: a,
  ...s
}) => {
  let o = /* @__PURE__ */ h(mh, {});
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
}, Zh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ h("select", { className: rt("chat-wrapper__prompt-select", e), ...n, children: t }), Kh = ({
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
), Xh = ({
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
), Yh = ({
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
), Th = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = se(0), [a, s] = se(!1), [o, l] = se(0);
  return be(() => {
    if (!t || e.length <= 1) return;
    const c = setInterval(() => {
      s(!0), setTimeout(() => {
        i((u) => (u + 1) % e.length), l((u) => u + 1), s(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(c);
  }, [t, e.length]), be(() => {
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
}, _h = xn((e, t) => {
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
  } = an(), d = c.length > 0, [y, S] = se(""), [A, w] = se([]), k = qe(null), N = n && n.length > 0 ? n : ["What would you like to know?"], P = y.length === 0 && !d && N.length > 1;
  $i(t, () => ({
    focus: () => {
      var O;
      (O = k.current) == null || O.focus();
    },
    setText: (O) => {
      S(O), setTimeout(() => {
        var F;
        (F = k.current) == null || F.focus();
      }, 0);
    }
  }));
  const L = re(
    (O) => {
      O.preventDefault();
      const U = new FormData(O.currentTarget).get("message");
      if (U != null && U.trim()) {
        const b = En(U.trim(), !1);
        if (!b.trim()) {
          console.warn("Message was blocked due to security concerns");
          return;
        }
        u(b, A), S(""), w([]);
      }
    },
    [u, A]
  ), T = re(
    (O) => {
      const U = O.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      S(U);
    },
    []
  ), z = re(async () => {
    const O = document.createElement("input");
    O.type = "file", O.accept = "image/*", O.multiple = !1, O.onchange = async (F) => {
      const U = F.target.files;
      if (U) {
        const b = Array.from(U).filter((M) => {
          const W = eo(M.name);
          return W !== M.name && console.warn(
            `File name sanitized: ${M.name} -> ${W}`
          ), M.size > 10485760 ? (console.warn(`File too large: ${M.name} (${M.size} bytes)`), !1) : [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp"
          ].includes(M.type) ? !0 : (console.warn(`File type not allowed: ${M.name} (${M.type})`), !1);
        });
        if (b.length > 0) {
          const M = await p(b);
          w(M);
        }
      }
    }, O.click();
  }, [p]);
  return /* @__PURE__ */ x(Ch, { onSubmit: L, style: { position: "relative" }, children: [
    /* @__PURE__ */ h(
      $a,
      {
        ref: k,
        name: "message",
        value: y,
        onChange: T,
        placeholder: "",
        disabled: r || i
      }
    ),
    !y.trim() && /* @__PURE__ */ h(
      Th,
      {
        placeholderTexts: N,
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
        children: A.map((O, F) => {
          const U = O.startsWith("data:image/"), b = O.startsWith("http://") || O.startsWith("https://"), M = U || b;
          return /* @__PURE__ */ x(
            "div",
            {
              style: {
                position: "relative",
                display: "inline-block"
              },
              children: [
                M ? /* @__PURE__ */ x(
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
                          src: O,
                          alt: `Attachment ${F + 1}`,
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
                ) : /* @__PURE__ */ x(
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
                          children: /* @__PURE__ */ x(
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
                      /* @__PURE__ */ x("div", { style: { flex: 1, minWidth: 0 }, children: [
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
                              const W = O.match(/name=([^;]+)/);
                              return W ? decodeURIComponent(W[1]) : "document.pdf";
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
                              const W = O.match(/data:([^;]+)/);
                              if (W) {
                                const q = W[1];
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
                                    const j = q.split("/")[1];
                                    return j ? j.toUpperCase().substring(0, 4) : "FILE";
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
                      w(
                        (W) => W.filter((q, j) => j !== F)
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
            F
          );
        })
      }
    ),
    /* @__PURE__ */ x(yh, { children: [
      /* @__PURE__ */ x(wh, { children: [
        s && /* @__PURE__ */ x(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ h(
                Sh,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: z,
                  title: A.length > 0 ? `${A.length} image(s) attached` : "Attach image",
                  disabled: r || i,
                  style: {
                    position: "relative"
                  },
                  children: /* @__PURE__ */ x(
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
                  onClick: z,
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
        o && /* @__PURE__ */ x("div", { className: "chat-wrapper__restaurant-chip", children: [
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
        Eh,
        {
          status: a,
          disabled: !y.trim() || i,
          onClick: a === Xe.STREAMING && f ? () => {
            f();
          } : void 0
        }
      )
    ] })
  ] });
}), kh = () => {
  const { suggestedPrompts: e, chatInputRef: t } = an();
  if (!e || e.length === 0)
    return null;
  const n = (r) => {
    t.current && t.current.setText(r.description);
  };
  return /* @__PURE__ */ x("div", { className: "chat-wrapper__suggested-prompts", children: [
    /* @__PURE__ */ h("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
    /* @__PURE__ */ h("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((r, i) => /* @__PURE__ */ h(
      "button",
      {
        className: "chat-wrapper__suggested-prompt-card",
        onClick: () => n(r),
        children: /* @__PURE__ */ x("div", { className: "chat-wrapper__suggested-prompt-content", children: [
          /* @__PURE__ */ h("h4", { className: "chat-wrapper__suggested-prompt-title", children: r.title }),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__suggested-prompt-description", children: r.description })
        ] })
      },
      i
    )) })
  ] });
}, xh = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ h(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ h("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ h(Ba, { size: e, variant: "dots" }) })
  }
), bh = ({
  headerName: e,
  headerDescription: t
}) => /* @__PURE__ */ x("div", { className: "chat-wrapper__main-header", children: [
  /* @__PURE__ */ h("h1", { className: "chat-wrapper__main-title", children: e }),
  t && /* @__PURE__ */ h("p", { className: "chat-wrapper__description", children: t })
] }), vh = () => {
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
  } = an(), c = ht.state.shouldShowMainHeader(
    e.length,
    n,
    t
  ), u = ht.state.shouldShowSuggestedPrompts(
    e.length,
    n,
    t,
    a
  ), p = ht.state.getContentAreaClass(
    e.length,
    n,
    t
  );
  return /* @__PURE__ */ x(zt, { children: [
    l && /* @__PURE__ */ h("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ x("p", { children: [
      "⚠️ ",
      l
    ] }) }),
    c && /* @__PURE__ */ h(bh, { headerName: r, headerDescription: i }),
    /* @__PURE__ */ x("div", { className: p, children: [
      t && e.length === 0 ? /* @__PURE__ */ h("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ h(xh, { fullHeight: !0 }) }) : /* @__PURE__ */ h(ja, { ref: s }),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ h(_h, { ref: o }) }),
      u && /* @__PURE__ */ h(kh, {})
    ] })
  ] });
}, Za = xn(
  ({
    // Authentication and server configuration
    userMpAuthToken: e,
    chatServerUrl: t,
    chatServerKey: n,
    // Entity and conversation configuration
    userId: r,
    entityId: i,
    entityType: a,
    // Existing props
    config: s,
    tools: o,
    devMode: l = !1,
    contextHelpers: c
  }, u) => {
    var on, ln;
    ht.validation.validateAuthProps({
      userMpAuthToken: e,
      chatServerUrl: t,
      chatServerKey: n,
      userId: r
    });
    const p = fe(() => ht.url.convertWebSocketToHttp(t), [t]), f = fe(
      () => new co({
        apiUrl: p,
        userMpAuthToken: e,
        chatServerKey: n
      }),
      [p, e, n]
    ), d = fe(() => o && o.length > 0 ? o.map(({ execute: _, ...ge }) => ge) : [], [o]), y = oo(), S = $((_) => _.isModalOpen), A = $((_) => _.isCollapsed), w = $((_) => _.currentMode), k = $((_) => _.openModal), N = $((_) => _.closeModal), P = $((_) => _.toggleCollapse), L = $((_) => _.toggleFullscreen), T = $((_) => _.setCurrentMode), z = $((_) => _.chatStatus), O = $((_) => _.setChatStatus), F = $((_) => _.streamingStatus), U = $((_) => _.setStreamingStatus), b = $(
      (_) => _.isLoadingConversation
    ), M = $(
      (_) => _.setIsLoadingConversation
    ), W = $((_) => _.conversationError), q = $(
      (_) => _.setConversationError
    ), j = $((_) => _.setCurrentThreadId), ne = $((_) => _.providerResId), D = $((_) => _.setProviderResId), ce = $((_) => _.isDevSettingsOpen), Te = $(
      (_) => _.setIsDevSettingsOpen
    ), m = $((_) => _.isStreaming), ee = $((_) => _.setIsStreaming), Re = $((_) => _.isThinking), g = $((_) => _.setIsThinking), Se = $((_) => _.streamingContent), te = $((_) => _.isHandlingTool);
    be(() => {
      s.mode && T(s.mode);
    }, [s.mode, T]), be(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const _ = (ge) => {
        ge.key === "Escape" && w === "modal" && S && N();
      };
      if (w === "modal" && S)
        return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
    }, [w, S, N]);
    const {
      messages: ae,
      setMessages: Fe,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: me,
      getReasoningStatus: je,
      getReasoningDuration: Ue,
      getReasoningContentOnly: it,
      getReasoningTitle: It,
      getToolingTitle: Je,
      getToolingStatus: ft,
      addMessage: ze,
      handleSetMessage: St,
      handleReasoningUpdate: Et,
      handleChatFinished: Qe,
      handleChatError: at,
      stopGeneration: st
    } = y, Tt = qe(null), ot = qe(null), Vt = re(
      (_) => {
        var ge, _t;
        switch (_.type) {
          case nt.CHAT_COMPLETED:
            (ge = _.data) != null && ge.conversationId && (console.log("ChatWrapper: Setting providerResId from CHAT_COMPLETED:", _.data.conversationId), D(_.data.conversationId)), Qe(), setTimeout(() => {
              var gt;
              (gt = ot.current) == null || gt.focus();
            }, 0);
            break;
          case nt.CHAT_ERROR:
            (_t = _.data) != null && _t.error && at(_.data.error);
            break;
          case nt.CONNECTION_LOST:
          case nt.CONNECTION_RESTORED:
        }
      },
      [Qe, at, D]
    ), { chatClient: $e, isConnected: et, isConnecting: E, connectChatClient: R } = As({
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
      contextHelpers: c,
      onSetMessage: St,
      onSystemEvent: Vt,
      onReasoningUpdate: Et
    });
    $i(u, () => ({
      updateEntityId: (_, ge) => {
        $e ? $e.updateEntityId(
          _,
          ge == null ? void 0 : ge.toString()
        ) : console.warn("ChatWrapper: Cannot update entityId - chat client not initialized");
      }
    }), [$e]);
    const V = fe(
      () => $e ? new uo($e, {
        onError: s.onError
      }) : null,
      [$e, s.onError]
    );
    lo({
      entityId: i,
      entityType: a,
      userId: r,
      httpApiUrl: p,
      userMpAuthToken: e,
      chatServerKey: n,
      messages: ae,
      setMessages: Fe,
      setIsLoadingConversation: M,
      setConversationError: q,
      setCurrentThreadId: j,
      setProviderResId: D
    });
    const X = qe(null), Q = re(() => {
      X.current && cancelAnimationFrame(X.current), X.current = requestAnimationFrame(() => {
        var _;
        (_ = Tt.current) == null || _.scrollIntoView({ behavior: "smooth" }), X.current = null;
      });
    }, []);
    be(() => {
      Q();
    }, [ae, Q]), be(() => {
      Se && Q();
    }, [Se, Q]), be(() => {
      s.onStreamingStatusChange && s.onStreamingStatusChange(F);
    }, [F, s]), be(() => () => {
      X.current && cancelAnimationFrame(X.current);
    }, []);
    const Ce = re(
      async (_, ge) => {
        if (V != null && V.canSubmit(_, m, et)) {
          ee(!0), g(!0), O(Xe.SUBMITTED), U(wn.STARTING);
          try {
            const _t = await V.submitMessage({
              message: _,
              media: ge,
              providerResId: ne || void 0
            });
            Fe((gt) => [...gt, _t]), O(Xe.STREAMING);
          } catch (_t) {
            g(!1), O(Xe.ERROR);
            const gt = V.createErrorMessage(_t);
            ze("system", gt), ee(!1), O(Xe.IDLE), U(wn.IDLE);
          }
        }
      },
      [
        V,
        m,
        et,
        Fe,
        ee,
        g,
        O,
        U,
        ze,
        ne
      ]
    ), Be = re(
      async (_) => await f.uploadFiles(_),
      [f]
    ), _e = fe(
      () => ht.css.getContainerClasses(
        w,
        s.position,
        s.theme,
        A,
        s.constrainedHeight
      ),
      [
        w,
        s.position,
        s.theme,
        A,
        s.constrainedHeight
      ]
    ), Ze = re(() => {
      w === "modal" ? k() : P();
    }, [w, k, P]), ye = re(() => {
      Te(!0);
    }, [Te]), he = re((_) => {
      ot.current && ot.current.setText(_.description);
    }, []), Ge = fe(
      () => ({
        messages: ae,
        isStreaming: m,
        isThinking: Re,
        isHandlingTool: te
      }),
      [ae, m, Re, te]
    ), ke = fe(
      () => ({
        isLoadingConversation: b,
        chatStatus: z,
        conversationError: W
      }),
      [b, z, W]
    ), sn = fe(
      () => {
        var _;
        return {
          headerName: s.headerName,
          headerDescription: s.headerDescription,
          placeholderTexts: s.placeholderTexts,
          chipName: s.chipName,
          chipLogo: s.chipLogo,
          suggestedPrompts: s.suggestedPrompts,
          clientTools: d,
          fileUploadEnabled: (_ = s.features) == null ? void 0 : _.fileUpload
        };
      },
      [
        s.headerName,
        s.headerDescription,
        s.placeholderTexts,
        s.chipName,
        s.chipLogo,
        s.suggestedPrompts,
        (on = s.features) == null ? void 0 : on.fileUpload,
        d
      ]
    ), Rt = fe(
      () => ({
        getReasoningTitle: It,
        getReasoningStatus: je,
        getReasoningDuration: Ue,
        getReasoningContentOnly: it,
        getToolingTitle: Je,
        getToolingStatus: ft
      }),
      [
        It,
        je,
        Ue,
        it,
        Je,
        ft
      ]
    ), At = fe(
      () => ({
        onSubmit: Ce,
        onFileUpload: Be,
        onStopGeneration: st,
        onPromptSelect: he
      }),
      [Ce, Be, st, he]
    ), An = fe(
      () => ({
        ...Ge,
        ...ke,
        ...sn,
        ...Rt,
        ...At,
        currentAssistantMessageIdRef: me,
        messagesEndRef: Tt,
        chatInputRef: ot
      }),
      [
        Ge,
        ke,
        sn,
        Rt,
        At,
        me,
        Tt,
        ot
      ]
    );
    return fe(
      () => ht.state.shouldShowBubble(
        w,
        S,
        A
      ),
      [w, S, A]
    ) ? /* @__PURE__ */ h(Qr, { children: /* @__PURE__ */ h(
      To,
      {
        mode: w,
        headerName: s.headerName,
        bubbleText: s.bubbleText,
        showBubbleText: ((ln = s.features) == null ? void 0 : ln.showBubbleText) !== !1,
        onClick: Ze
      }
    ) }) : /* @__PURE__ */ h(Qr, { children: /* @__PURE__ */ h(
      fo,
      {
        onError: (_) => {
          console.error("WebSocket error in ChatWrapper:", _), s.onError && s.onError(_);
        },
        children: /* @__PURE__ */ x("div", { className: _e, style: s.customStyles, children: [
          /* @__PURE__ */ h(
            mo,
            {
              isConnected: et,
              isConnecting: E,
              onRetry: R
            }
          ),
          l && s.headerVisible === !1 && /* @__PURE__ */ h(
            "button",
            {
              className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
              onClick: ye,
              title: "Developer Settings",
              children: /* @__PURE__ */ h(ta, { size: 16 })
            }
          ),
          ht.state.shouldShowHeader(s.headerVisible) && /* @__PURE__ */ h(
            _o,
            {
              headerName: s.headerName,
              mode: w,
              isCollapsed: A,
              isModalOpen: S,
              devMode: l,
              onClose: N,
              onToggleFullscreen: L,
              onToggleCollapse: P,
              onOpenSettings: ye
            }
          ),
          !A && /* @__PURE__ */ h(
            go,
            {
              onError: (_) => {
                console.error("File upload error:", _), s.onError && s.onError(_);
              },
              children: /* @__PURE__ */ h(ph, { value: An, children: /* @__PURE__ */ h(vh, {}) })
            }
          ),
          /* @__PURE__ */ h(
            Ss,
            {
              isOpen: ce,
              onClose: () => Te(!1),
              apiUrl: p,
              userMpAuthToken: e,
              chatServerKey: n
            }
          )
        ] })
      }
    ) });
  }
);
Za.displayName = "ChatWrapperContainer";
const Jh = ji(Za);
var Ih = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(Ih || {});
export {
  Th as AnimatedPlaceholder,
  Xe as CHAT_STATUS,
  Co as ChatIcon,
  Jh as ChatWrapper,
  yo as CloseIcon,
  So as CollapseIcon,
  mo as ConnectionNotification,
  Eo as CopyIcon,
  Ss as DevSettings,
  Ih as EntityType,
  wo as FullscreenIcon,
  xh as InlineLoader,
  Ba as Loader,
  ve as PROCESSING_STATUS,
  Ch as PromptInput,
  Sh as PromptInputButton,
  Zh as PromptInputModelSelect,
  qh as PromptInputModelSelectContent,
  Xh as PromptInputModelSelectItem,
  Kh as PromptInputModelSelectTrigger,
  Yh as PromptInputModelSelectValue,
  Eh as PromptInputSubmit,
  $a as PromptInputTextarea,
  yh as PromptInputToolbar,
  wh as PromptInputTools,
  ch as Reasoning,
  za as ReasoningContent,
  Ua as ReasoningTrigger,
  wn as STREAMING_STATUS,
  ta as SettingsIcon,
  kh as SuggestedPrompts,
  Lh as fetchThreadByConvUuid,
  Oh as fetchThreadMessages,
  ns as fetchThreadMessagesV2,
  Mh as fetchUserThreads,
  Dh as isChatActive,
  Hh as isChatError,
  Ph as isChatIdle,
  Fh as isProcessingActive,
  Uh as isProcessingComplete,
  zh as isProcessingError,
  rs as updateThread,
  Gh as useChatState,
  Vh as useConversationState,
  jh as useDevState,
  Bh as useLayoutState,
  Wh as useThreadState,
  $h as useUIState,
  $ as useUIStore
};
