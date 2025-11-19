var Ja = Object.defineProperty;
var Qa = (e, t, n) => t in e ? Ja(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var W = (e, t, n) => Qa(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as h, jsxs as k, Fragment as Ht } from "react/jsx-runtime";
import dt, { useState as ae, useEffect as xe, useCallback as te, useRef as Ae, useMemo as Ce, Component as Cr, createContext as eo, useContext as to, memo as $i, forwardRef as Nn, useImperativeHandle as Zi } from "react";
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
  const n = /* @__PURE__ */ new Set(), r = (c, u) => {
    const p = typeof c == "function" ? c(t) : c;
    if (!Object.is(p, t)) {
      const g = t;
      t = u ?? (typeof p != "object" || p === null) ? p : Object.assign({}, t, p), n.forEach((d) => d(t, g));
    }
  }, i = () => t, s = { setState: r, getState: i, getInitialState: () => l, subscribe: (c) => (n.add(c), () => n.delete(c)) }, l = t = e(r, i, s);
  return s;
}, ao = (e) => e ? Wr(e) : Wr, oo = (e) => e;
function so(e, t = oo) {
  const n = dt.useSyncExternalStore(
    e.subscribe,
    dt.useCallback(() => t(e.getState()), [e, t]),
    dt.useCallback(() => t(e.getInitialState()), [e, t])
  );
  return dt.useDebugValue(n), n;
}
const lo = (e) => {
  const t = ao(e), n = (r) => so(t, r);
  return Object.assign(n, t), n;
}, co = (e) => lo, Gr = { BASE_URL: "/", DEV: !1, MODE: "production", PROD: !0, SSR: !1 }, rn = /* @__PURE__ */ new Map(), fn = (e) => {
  const t = rn.get(e);
  return t ? Object.fromEntries(
    Object.entries(t.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, uo = (e, t, n) => {
  if (e === void 0)
    return {
      type: "untracked",
      connection: t.connect(n)
    };
  const r = rn.get(n.name);
  if (r)
    return { type: "tracked", store: e, ...r };
  const i = {
    connection: t.connect(n),
    stores: {}
  };
  return rn.set(n.name, i), { type: "tracked", store: e, ...i };
}, ho = (e, t) => {
  if (t === void 0) return;
  const n = rn.get(e);
  n && (delete n.stores[t], Object.keys(n.stores).length === 0 && rn.delete(e));
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
  const { connection: u, ...p } = uo(s, c, l);
  let g = !0;
  i.setState = (w, A, E) => {
    const _ = n(w, A);
    if (!g) return _;
    const M = E === void 0 ? {
      type: o || po(new Error().stack) || "anonymous"
    } : typeof E == "string" ? { type: E } : E;
    return s === void 0 ? (u == null || u.send(M, r()), _) : (u == null || u.send(
      {
        ...M,
        type: `${s}/${M.type}`
      },
      {
        ...fn(l.name),
        [s]: i.getState()
      }
    ), _);
  }, i.devtools = {
    cleanup: () => {
      u && typeof u.unsubscribe == "function" && u.unsubscribe(), ho(l.name, s);
    }
  };
  const d = (...w) => {
    const A = g;
    g = !1, n(...w), g = A;
  }, y = e(i.setState, r, i);
  if (p.type === "untracked" ? u == null || u.init(y) : (p.stores[p.store] = i, u == null || u.init(
    Object.fromEntries(
      Object.entries(p.stores).map(([w, A]) => [
        w,
        w === p.store ? y : A.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let w = !1;
    const A = i.dispatch;
    i.dispatch = (...E) => {
      (Gr ? "production" : void 0) !== "production" && E[0].type === "__setState" && !w && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), w = !0), A(...E);
    };
  }
  return u.subscribe((w) => {
    var A;
    switch (w.type) {
      case "ACTION":
        if (typeof w.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return Fn(
          w.payload,
          (E) => {
            if (E.type === "__setState") {
              if (s === void 0) {
                d(E.state);
                return;
              }
              Object.keys(E.state).length !== 1 && console.error(
                `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
              );
              const _ = E.state[s];
              if (_ == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(_) && d(_);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(E);
          }
        );
      case "DISPATCH":
        switch (w.payload.type) {
          case "RESET":
            return d(y), s === void 0 ? u == null ? void 0 : u.init(i.getState()) : u == null ? void 0 : u.init(fn(l.name));
          case "COMMIT":
            if (s === void 0) {
              u == null || u.init(i.getState());
              return;
            }
            return u == null ? void 0 : u.init(fn(l.name));
          case "ROLLBACK":
            return Fn(w.state, (E) => {
              if (s === void 0) {
                d(E), u == null || u.init(i.getState());
                return;
              }
              d(E[s]), u == null || u.init(fn(l.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return Fn(w.state, (E) => {
              if (s === void 0) {
                d(E);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(E[s]) && d(E[s]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: E } = w.payload, _ = (A = E.computedStates.slice(-1)[0]) == null ? void 0 : A.state;
            if (!_) return;
            d(s === void 0 ? _ : _[s]), u == null || u.send(
              null,
              // FIXME no-any
              E
            );
            return;
          }
          case "PAUSE_RECORDING":
            return g = !g;
        }
        return;
    }
  }), y;
}, go = fo, Fn = (e, t) => {
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
}, xn = {
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
}, Lh = (e) => e === et.SUBMITTED || e === et.STREAMING, Oh = (e) => e === et.IDLE, Dh = (e) => e === et.ERROR, Ph = (e) => e === Pe.PROCESSING, Hh = (e) => e === Pe.COMPLETED, Fh = (e) => e === Pe.ERROR, Co = (e) => ({
  // Initial state
  chatStatus: et.IDLE,
  streamingStatus: xn.IDLE,
  // Actions
  setChatStatus: (t) => e({ chatStatus: t }),
  setStreamingStatus: (t) => e({ streamingStatus: t }),
  resetChatStatus: () => e({
    chatStatus: et.IDLE,
    streamingStatus: xn.IDLE
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
), Uh = () => $((e) => ({
  isModalOpen: e.isModalOpen,
  isCollapsed: e.isCollapsed,
  currentMode: e.currentMode,
  openModal: e.openModal,
  closeModal: e.closeModal,
  toggleCollapse: e.toggleCollapse,
  toggleFullscreen: e.toggleFullscreen
})), zh = () => $((e) => ({
  chatStatus: e.chatStatus,
  streamingStatus: e.streamingStatus,
  setChatStatus: e.setChatStatus,
  setStreamingStatus: e.setStreamingStatus,
  resetChatStatus: e.resetChatStatus
})), Bh = () => $((e) => ({
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
})), Gh = () => $((e) => ({
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
  const [l, c] = ae(null), [u, p] = ae(""), [g, d] = ae(""), y = $((f) => f.providerResId), [w, A] = ae(""), [E, _] = ae("BRAND"), [M, P] = ae(""), [L, T] = ae(""), [O, D] = ae(!1), [H, z] = ae(null), [N, b] = ae(null), [F, V] = ae("agent");
  xe(() => {
    e && !l && U();
  }, [e]);
  const U = te(async () => {
    D(!0), z(null);
    try {
      const f = await no(n, {
        userMpAuthToken: r,
        chatServerKey: i
      });
      if (!f)
        throw new Error(`No configuration found for app: ${a}`);
      c(f), p(f.promptPath), d(f.versionUuid);
    } catch (f) {
      z(f instanceof Error ? f.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", f);
    } finally {
      D(!1);
    }
  }, [n, a, r, i]), q = te(async () => {
    if (l) {
      D(!0), z(null);
      try {
        const f = await ro(n, {
          app: l.app,
          promptPath: u,
          versionUuid: g,
          isDefault: l.isDefault
        }, {
          userMpAuthToken: r,
          chatServerKey: i
        });
        c(f), t(), window.location.reload();
      } catch (f) {
        z(f instanceof Error ? f.message : "Failed to update configuration"), console.error("Error updating agent configuration:", f);
      } finally {
        D(!1);
      }
    }
  }, [n, u, g, l, t, r, i]), X = te(async () => {
    if (!y) {
      z("No active conversation to attach");
      return;
    }
    D(!0), z(null), b(null);
    try {
      let f;
      if (L.trim())
        try {
          f = JSON.parse(L);
        } catch {
          throw new Error("Invalid JSON in metadata field");
        }
      const Q = w && E, ye = M || f;
      if (Q && await Ki(
        n,
        y,
        {
          entityId: w,
          entityType: E
        },
        {
          userMpAuthToken: r,
          chatServerKey: i
        }
      ), ye && await qi(
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
      ), !Q && !ye) {
        z("Please provide at least one field to update");
        return;
      }
      b("Thread updated successfully!"), setTimeout(() => {
        A(""), _("BRAND"), P(""), T(""), b(null);
      }, 2e3);
    } catch (f) {
      z(f instanceof Error ? f.message : "Failed to update thread"), console.error("Error updating thread:", f);
    } finally {
      D(!1);
    }
  }, [y, n, w, E, M, L, r, i]), oe = te(() => {
    o && (z(null), b(null), o(), b("WebSocket disconnected successfully!"), setTimeout(() => {
      b(null), t();
    }, 1500));
  }, [o, t]), Ne = te(() => {
    l && (p(l.promptPath), d(l.versionUuid)), z(null), t();
  }, [l, t]);
  return e ? /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ h("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: Ne,
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
          className: `chat-wrapper__dev-settings-tab ${F === "agent" ? "active" : ""}`,
          onClick: () => V("agent"),
          children: "Agent Config"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${F === "thread" ? "active" : ""}`,
          onClick: () => V("thread"),
          children: "Thread Attachment"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${F === "connection" ? "active" : ""}`,
          onClick: () => V("connection"),
          children: "Connection"
        }
      )
    ] }),
    /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-content", children: [
      N && /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-success", children: N }),
      O && /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      H && /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ k("p", { children: [
          "Error: ",
          H
        ] }),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: F === "agent" ? U : void 0,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      F === "agent" && l && !O && /* @__PURE__ */ k(Ht, { children: [
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: u,
              onChange: (f) => p(f.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: O
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
              value: g,
              onChange: (f) => d(f.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: O
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
              value: l.app,
              className: "chat-wrapper__dev-settings-input",
              disabled: !0,
              readOnly: !0
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Application name for this agent configuration." })
        ] })
      ] }),
      F === "thread" && !O && /* @__PURE__ */ k(Ht, { children: [
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-info", children: [
          /* @__PURE__ */ k("p", { children: [
            /* @__PURE__ */ h("strong", { children: "Provider Resource ID:" }),
            " ",
            y || "No active conversation"
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
                value: M,
                onChange: (f) => P(f.target.value),
                placeholder: "e.g., customer-inquiry, support",
                className: "chat-wrapper__dev-settings-input",
                disabled: O || !y
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
                onChange: (f) => T(f.target.value),
                placeholder: '{"orderId": "order_789", "tableId": "table_5", "status": "pending"}',
                className: "chat-wrapper__dev-settings-input",
                rows: 4,
                disabled: O || !y
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
                  value: w,
                  onChange: (f) => A(f.target.value),
                  placeholder: "e.g., brand_123 or account_456",
                  className: "chat-wrapper__dev-settings-input",
                  disabled: O || !y
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
                  value: E,
                  onChange: (f) => _(f.target.value),
                  className: "chat-wrapper__dev-settings-input",
                  disabled: O || !y,
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
      ] }),
      F === "connection" && !O && /* @__PURE__ */ k(Ht, { children: [
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-info", children: [
          /* @__PURE__ */ k("p", { children: [
            /* @__PURE__ */ h("strong", { children: "Connection Status:" }),
            " ",
            s ? "🟢 Connected" : "🔴 Disconnected"
          ] }),
          /* @__PURE__ */ h("p", { style: { fontSize: "12px", color: "#666", marginTop: "8px" }, children: "Manage your WebSocket connection to the chat server." })
        ] }),
        /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-section", children: [
          /* @__PURE__ */ h("h4", { style: { marginBottom: "8px", fontSize: "14px", fontWeight: "600" }, children: "Disconnect WebSocket" }),
          /* @__PURE__ */ h("p", { style: { marginBottom: "12px", fontSize: "12px", color: "#666" }, children: "Click the button below to manually disconnect the WebSocket connection. This will stop all communication with the chat server." }),
          /* @__PURE__ */ h(
            "button",
            {
              className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
              onClick: oe,
              disabled: !s || !o,
              style: { width: "100%", marginTop: "12px" },
              children: s ? "Disconnect WebSocket" : "Already Disconnected"
            }
          ),
          !o && /* @__PURE__ */ h("p", { style: { fontSize: "12px", color: "#ff6b6b", marginTop: "8px" }, children: "⚠️ Disconnect function not available" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ k("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: Ne,
          disabled: O,
          children: "Cancel"
        }
      ),
      F === "agent" && /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: q,
          disabled: O || !l,
          children: O ? "Saving..." : "Save & Reload"
        }
      ),
      F === "thread" && /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: X,
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
}, gn = {
  NORMAL: 1e3,
  // Normal closure
  GOING_AWAY: 1001
};
var Je = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(Je || {}), St = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e))(St || {}), De = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.THREAD_CREATED = "thread_created", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(De || {}), En = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(En || {}), vt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(vt || {});
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
class It {
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
    W(this, "ws", null);
    W(this, "config");
    W(this, "connectionState");
    W(this, "reconnectTimer", null);
    W(this, "heartbeatInterval", null);
    W(this, "visibilityChangeHandler");
    W(this, "currentTicket", null);
    W(this, "currentSessionId", null);
    W(this, "intentionalDisconnect", !1);
    // Track intentional disconnects
    W(this, "onOpen");
    W(this, "onMessage");
    W(this, "onError");
    W(this, "onClose");
    W(this, "onSystemEvent");
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
      NORMAL: gn.NORMAL,
      GOING_AWAY: gn.GOING_AWAY
    }), this.intentionalDisconnect)
      return console.log("[WebSocketManager] Intentional disconnect - no reconnect"), !1;
    const { NORMAL: n } = gn, r = t !== n;
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
    const t = It.serializeHeartbeatPing();
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
    this.ws && this.ws.close(gn.NORMAL);
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
    W(this, "state");
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
class bn {
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
    W(this, "handlers", {});
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
}, be = {
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
  getMessageType: (e, t) => t === !1 ? be.isErrorMessage(e) ? Z.MESSAGE_TYPES.ERROR : (be.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || be.isThinkingMessage(e), Z.MESSAGE_TYPES.THOUGHT) : be.isCompletedMessage(e) ? Z.MESSAGE_TYPES.COMPLETED : be.isErrorMessage(e) ? Z.MESSAGE_TYPES.ERROR : (be.isHandlingMessage(e) || be.isThinkingMessage(e) && !e.includes(Z.UI_TEXT.AI_IS_THINKING), Z.MESSAGE_TYPES.THINKING)
};
class bo extends Xi {
  constructor(n) {
    super({ onReasoningUpdate: n });
    W(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    W(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, o) {
    const s = this.getHandler("onReasoningUpdate");
    if (!s) return;
    const l = bn.createReasoningCall(
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
    W(this, "processedToolCalls", /* @__PURE__ */ new Set());
    W(this, "clientTools", {});
    W(this, "sendMessage");
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
    const i = It.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = It.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = bn.createLatitudeToolCall(
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
      const a = bn.createLatitudeToolCall(
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
    W(this, "reasoningHandler");
    W(this, "toolHandler");
    W(this, "handlers");
    W(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new bo(t.onReasoningUpdate), this.toolHandler = new vo(n, t.onReasoningUpdate);
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
      case En.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case En.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case En.CONTENT_DELTA:
        (n = t.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, t.data.delta));
        break;
    }
  }
  handleProviderEvent(t) {
    var r, i, a;
    switch ((r = t.data) == null ? void 0 : r.type) {
      case vt.TEXT_DELTA:
        t.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, t.data.textDelta));
        break;
      case vt.REASONING_START:
        this.reasoningHandler.handleReasoningStart(t.data);
        break;
      case vt.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(t.data);
        break;
      case vt.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(t.data);
        break;
      case vt.TOOL_CALL:
        this.toolHandler.handleServerToolCall(t.data);
        break;
      case vt.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(t.data);
        break;
    }
  }
  handleLatitudeEvent(t) {
    var n;
    if (((n = t.data) == null ? void 0 : n.type) === vt.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = t.data;
      if (r.toolCallId && r.toolName) {
        const i = bn.createServerToolCall(
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
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      Bt.chatError(t.error || "Unknown error")
    );
  }
  handleToolCallRequest(t) {
    this.toolHandler.handleToolCallRequest(t);
  }
  handleHeartbeatPing(t) {
    if (!this.sendMessage)
      return;
    const n = It.serializeHeartbeatPong(
      t.timestamp,
      t.pingTime
    );
    this.sendMessage(n);
  }
  handleError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      Bt.chatError(t.error || "Unknown WebSocket error")
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
function nr(e) {
  if (!e.success || !e.ticket || !e.expiresAt)
    return !1;
  const t = new Date(e.expiresAt).getTime();
  return Date.now() < t - 3e4;
}
function Vr(e) {
  const t = nr(e), n = new Date(e.expiresAt).getTime(), r = Date.now(), i = Math.max(
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
    W(this, "ticket", null);
    W(this, "refreshPromise", null);
    W(this, "validationInterval", null);
    W(this, "authData");
    W(this, "apiUrl");
    W(this, "config");
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
    return this.ticket && nr(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
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
    return this.ticket ? nr(this.ticket) : !1;
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
    W(this, "config");
    W(this, "connectionState");
    W(this, "wsManager");
    W(this, "messageHandler");
    W(this, "initResolve");
    W(this, "initReject");
    // Client tools and context
    W(this, "toolSchemas", []);
    W(this, "contextHelpers", {});
    // Ticket management - now centralized in TicketManager
    W(this, "ticketManager", null);
    // Authentication credentials for HTTP API calls
    W(this, "authCredentials", {});
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
      var o;
      console.error("Failed to refresh ticket:", a), (o = this.initReject) == null || o.call(this, a);
    })) : (i = this.initReject) == null || i.call(
      this,
      new Error(`Authentication failed: ${n == null ? void 0 : n.error}`)
    );
  }
  sendToolConfiguration() {
    const t = It.serializeConfigureTools(
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
      const a = It.serializeChatMessage({
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
    const n = It.serializeUpdateContextHelpers(
      this.contextHelpers
    );
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = It.serializeUpdateTools(this.toolSchemas);
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
      throw new Error(
        "WebSocketChatClient: Cannot update entityId - TicketManager not initialized"
      );
    console.log(
      `WebSocketChatClient: Updating entity attachment - providerResId: ${t}, entityId: ${n}, entityType: ${r}`
    );
    try {
      await Ki(
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
      await qi(
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
  onReasoningUpdate: c,
  onThreadCreated: u
}) {
  const [p, g] = ae(
    null
  ), [d, y] = ae(!1), [w, A] = ae(!1), [E, _] = ae(!1), [M, P] = ae(0), L = Ae(null), T = Ae(s), O = Ae(l), D = Ae(c), H = Ae(u);
  xe(() => {
    T.current = s, O.current = l, D.current = c, H.current = u;
  }, [s, l, c, u]);
  const { toolSchemas: z, clientToolExecutors: N } = Ce(() => {
    if (a && a.length > 0) {
      const U = a.map(({ execute: X, ...oe }) => oe), q = {};
      return a.forEach((X) => {
        q[X.name] = X.execute;
      }), {
        toolSchemas: U,
        clientToolExecutors: q
      };
    }
    return {
      toolSchemas: [],
      clientToolExecutors: {}
    };
  }, [a]), b = Ae(), F = te(async () => {
    try {
      if (A(!0), !e)
        throw new Error("userMpAuthToken is required");
      if (!t)
        throw new Error("chatServerUrl is required");
      if (!n)
        throw new Error("chatServerKey is required");
      const U = new No();
      L.current = U, g(U);
      const q = o || {};
      await U.onInit({
        // Authentication and server properties
        userMpAuthToken: e,
        chatServerUrl: t,
        chatServerKey: n,
        entityId: r,
        entityType: i == null ? void 0 : i.toString(),
        // Tools configuration
        toolSchemas: z,
        clientTools: N,
        contextHelpers: q,
        onSetMessage: T.current,
        onSystemEvent: O.current,
        onReasoningUpdate: D.current,
        onThreadCreated: H.current
      }), y(!0);
    } catch (U) {
      console.error("Error connecting WebSocketChatClient:", U), y(!1), setTimeout(() => {
        var q;
        (L.current === null || !L.current.getConnectionStatus().connected) && ((q = b.current) == null || q.call(b));
      }, 2e3);
    } finally {
      A(!1);
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
  ]), V = te(() => {
    L.current && (L.current.disconnect(), L.current = null), g(null), y(!1);
  }, []);
  return b.current = F, xe(() => (F(), () => {
    V();
  }), [F, V]), xe(() => {
    const U = setInterval(() => {
      if (L.current) {
        const q = L.current.getConnectionStatus();
        y(q.connected), _(q.isReconnecting), P(q.reconnectAttempts);
      }
    }, 1e3);
    return () => clearInterval(U);
  }, []), {
    chatClient: p,
    isConnected: d,
    isConnecting: w,
    isReconnecting: E,
    reconnectAttempts: M,
    connectChatClient: F,
    disconnectChatClient: V
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
  freeze: Ue,
  seal: tt,
  create: rr
} = Object, {
  apply: ir,
  construct: ar
} = typeof Reflect < "u" && Reflect;
Ue || (Ue = function(t) {
  return t;
});
tt || (tt = function(t) {
  return t;
});
ir || (ir = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
ar || (ar = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const mn = ze(Array.prototype.forEach), Po = ze(Array.prototype.lastIndexOf), $r = ze(Array.prototype.pop), Zt = ze(Array.prototype.push), Ho = ze(Array.prototype.splice), Tn = ze(String.prototype.toLowerCase), Un = ze(String.prototype.toString), zn = ze(String.prototype.match), Kt = ze(String.prototype.replace), Fo = ze(String.prototype.indexOf), Uo = ze(String.prototype.trim), at = ze(Object.prototype.hasOwnProperty), Fe = ze(RegExp.prototype.test), qt = zo(TypeError);
function ze(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return ir(e, t, r);
  };
}
function zo(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return ar(e, n);
  };
}
function ee(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Tn;
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
    at(e, t) || (e[t] = null);
  return e;
}
function Et(e) {
  const t = rr(null);
  for (const [n, r] of Yi(e))
    at(e, n) && (Array.isArray(r) ? t[n] = Bo(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = Et(r) : t[n] = r);
  return t;
}
function Xt(e, t) {
  for (; e !== null; ) {
    const r = Do(e, t);
    if (r) {
      if (r.get)
        return ze(r.get);
      if (typeof r.value == "function")
        return ze(r.value);
    }
    e = Oo(e);
  }
  function n() {
    return null;
  }
  return n;
}
const Zr = Ue(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Bn = Ue(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Wn = Ue(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Wo = Ue(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Gn = Ue(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Go = Ue(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Kr = Ue(["#text"]), qr = Ue(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Vn = Ue(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Xr = Ue(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Cn = Ue(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Vo = tt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), jo = tt(/<%[\w\W]*|[\w\W]*%>/gm), $o = tt(/\$\{[\w\W]*/gm), Zo = tt(/^data-[\-\w.\u00B7-\uFFFF]+$/), Ko = tt(/^aria-[\-\w]+$/), Ji = tt(
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
const Yt = {
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
  const t = (G) => ea(G);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== Yt.document || !e.Element)
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
    NamedNodeMap: u = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: p,
    DOMParser: g,
    trustedTypes: d
  } = e, y = l.prototype, w = Xt(y, "cloneNode"), A = Xt(y, "remove"), E = Xt(y, "nextSibling"), _ = Xt(y, "childNodes"), M = Xt(y, "parentNode");
  if (typeof o == "function") {
    const G = n.createElement("template");
    G.content && G.content.ownerDocument && (n = G.content.ownerDocument);
  }
  let P, L = "";
  const {
    implementation: T,
    createNodeIterator: O,
    createDocumentFragment: D,
    getElementsByTagName: H
  } = n, {
    importNode: z
  } = r;
  let N = Jr();
  t.isSupported = typeof Yi == "function" && typeof M == "function" && T && T.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: b,
    ERB_EXPR: F,
    TMPLIT_EXPR: V,
    DATA_ATTR: U,
    ARIA_ATTR: q,
    IS_SCRIPT_OR_DATA: X,
    ATTR_WHITESPACE: oe,
    CUSTOM_ELEMENT: Ne
  } = Yr;
  let {
    IS_ALLOWED_URI: f
  } = Yr, Q = null;
  const ye = ee({}, [...Zr, ...Bn, ...Wn, ...Gn, ...Kr]);
  let m = null;
  const Ee = ee({}, [...qr, ...Vn, ...Xr, ...Cn]);
  let re = Object.seal(rr(null, {
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
  })), se = null, ve = null;
  const ue = Object.seal(rr(null, {
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
  let Xe = !0, $e = !0, st = !1, At = !0, nt = !1, mt = !0, Ze = !1, Tt = !1, _t = !1, rt = !1, lt = !1, ct = !1, kt = !0, ut = !1;
  const Nt = "user-content-";
  let Mt = !0, Ct = !1, S = {}, I = null;
  const j = ee({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let J = null;
  const ne = ee({}, ["audio", "video", "img", "source", "image", "track"]);
  let Te = null;
  const Ie = ee({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), we = "http://www.w3.org/1998/Math/MathML", Be = "http://www.w3.org/2000/svg", _e = "http://www.w3.org/1999/xhtml";
  let de = _e, Ye = !1, Me = null;
  const cn = ee({}, [we, Be, _e], Un);
  let Lt = ee({}, ["mi", "mo", "mn", "ms", "mtext"]), Ot = ee({}, ["annotation-xml"]);
  const un = ee({}, ["title", "style", "font", "a", "script"]);
  let xt = null;
  const hn = ["application/xhtml+xml", "text/html"], dn = "text/html";
  let pe = null, Dt = null;
  const pn = n.createElement("form"), $t = function(C) {
    return C instanceof RegExp || C instanceof Function;
  }, x = function() {
    let C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Dt && Dt === C)) {
      if ((!C || typeof C != "object") && (C = {}), C = Et(C), xt = // eslint-disable-next-line unicorn/prefer-includes
      hn.indexOf(C.PARSER_MEDIA_TYPE) === -1 ? dn : C.PARSER_MEDIA_TYPE, pe = xt === "application/xhtml+xml" ? Un : Tn, Q = at(C, "ALLOWED_TAGS") ? ee({}, C.ALLOWED_TAGS, pe) : ye, m = at(C, "ALLOWED_ATTR") ? ee({}, C.ALLOWED_ATTR, pe) : Ee, Me = at(C, "ALLOWED_NAMESPACES") ? ee({}, C.ALLOWED_NAMESPACES, Un) : cn, Te = at(C, "ADD_URI_SAFE_ATTR") ? ee(Et(Ie), C.ADD_URI_SAFE_ATTR, pe) : Ie, J = at(C, "ADD_DATA_URI_TAGS") ? ee(Et(ne), C.ADD_DATA_URI_TAGS, pe) : ne, I = at(C, "FORBID_CONTENTS") ? ee({}, C.FORBID_CONTENTS, pe) : j, se = at(C, "FORBID_TAGS") ? ee({}, C.FORBID_TAGS, pe) : Et({}), ve = at(C, "FORBID_ATTR") ? ee({}, C.FORBID_ATTR, pe) : Et({}), S = at(C, "USE_PROFILES") ? C.USE_PROFILES : !1, Xe = C.ALLOW_ARIA_ATTR !== !1, $e = C.ALLOW_DATA_ATTR !== !1, st = C.ALLOW_UNKNOWN_PROTOCOLS || !1, At = C.ALLOW_SELF_CLOSE_IN_ATTR !== !1, nt = C.SAFE_FOR_TEMPLATES || !1, mt = C.SAFE_FOR_XML !== !1, Ze = C.WHOLE_DOCUMENT || !1, rt = C.RETURN_DOM || !1, lt = C.RETURN_DOM_FRAGMENT || !1, ct = C.RETURN_TRUSTED_TYPE || !1, _t = C.FORCE_BODY || !1, kt = C.SANITIZE_DOM !== !1, ut = C.SANITIZE_NAMED_PROPS || !1, Mt = C.KEEP_CONTENT !== !1, Ct = C.IN_PLACE || !1, f = C.ALLOWED_URI_REGEXP || Ji, de = C.NAMESPACE || _e, Lt = C.MATHML_TEXT_INTEGRATION_POINTS || Lt, Ot = C.HTML_INTEGRATION_POINTS || Ot, re = C.CUSTOM_ELEMENT_HANDLING || {}, C.CUSTOM_ELEMENT_HANDLING && $t(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (re.tagNameCheck = C.CUSTOM_ELEMENT_HANDLING.tagNameCheck), C.CUSTOM_ELEMENT_HANDLING && $t(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (re.attributeNameCheck = C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), C.CUSTOM_ELEMENT_HANDLING && typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (re.allowCustomizedBuiltInElements = C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), nt && ($e = !1), lt && (rt = !0), S && (Q = ee({}, Kr), m = [], S.html === !0 && (ee(Q, Zr), ee(m, qr)), S.svg === !0 && (ee(Q, Bn), ee(m, Vn), ee(m, Cn)), S.svgFilters === !0 && (ee(Q, Wn), ee(m, Vn), ee(m, Cn)), S.mathMl === !0 && (ee(Q, Gn), ee(m, Xr), ee(m, Cn))), C.ADD_TAGS && (typeof C.ADD_TAGS == "function" ? ue.tagCheck = C.ADD_TAGS : (Q === ye && (Q = Et(Q)), ee(Q, C.ADD_TAGS, pe))), C.ADD_ATTR && (typeof C.ADD_ATTR == "function" ? ue.attributeCheck = C.ADD_ATTR : (m === Ee && (m = Et(m)), ee(m, C.ADD_ATTR, pe))), C.ADD_URI_SAFE_ATTR && ee(Te, C.ADD_URI_SAFE_ATTR, pe), C.FORBID_CONTENTS && (I === j && (I = Et(I)), ee(I, C.FORBID_CONTENTS, pe)), Mt && (Q["#text"] = !0), Ze && ee(Q, ["html", "head", "body"]), Q.table && (ee(Q, ["tbody"]), delete se.tbody), C.TRUSTED_TYPES_POLICY) {
        if (typeof C.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw qt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof C.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw qt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        P = C.TRUSTED_TYPES_POLICY, L = P.createHTML("");
      } else
        P === void 0 && (P = Qo(d, i)), P !== null && typeof L == "string" && (L = P.createHTML(""));
      Ue && Ue(C), Dt = C;
    }
  }, fe = ee({}, [...Bn, ...Wn, ...Wo]), ke = ee({}, [...Gn, ...Go]), Se = function(C) {
    let R = M(C);
    (!R || !R.tagName) && (R = {
      namespaceURI: de,
      tagName: "template"
    });
    const B = Tn(C.tagName), he = Tn(R.tagName);
    return Me[C.namespaceURI] ? C.namespaceURI === Be ? R.namespaceURI === _e ? B === "svg" : R.namespaceURI === we ? B === "svg" && (he === "annotation-xml" || Lt[he]) : !!fe[B] : C.namespaceURI === we ? R.namespaceURI === _e ? B === "math" : R.namespaceURI === Be ? B === "math" && Ot[he] : !!ke[B] : C.namespaceURI === _e ? R.namespaceURI === Be && !Ot[he] || R.namespaceURI === we && !Lt[he] ? !1 : !ke[B] && (un[B] || !fe[B]) : !!(xt === "application/xhtml+xml" && Me[C.namespaceURI]) : !1;
  }, Le = function(C) {
    Zt(t.removed, {
      element: C
    });
    try {
      M(C).removeChild(C);
    } catch {
      A(C);
    }
  }, it = function(C, R) {
    try {
      Zt(t.removed, {
        attribute: R.getAttributeNode(C),
        from: R
      });
    } catch {
      Zt(t.removed, {
        attribute: null,
        from: R
      });
    }
    if (R.removeAttribute(C), C === "is")
      if (rt || lt)
        try {
          Le(R);
        } catch {
        }
      else
        try {
          R.setAttribute(C, "");
        } catch {
        }
  }, Lr = function(C) {
    let R = null, B = null;
    if (_t)
      C = "<remove></remove>" + C;
    else {
      const ge = zn(C, /^[\r\n\t ]+/);
      B = ge && ge[0];
    }
    xt === "application/xhtml+xml" && de === _e && (C = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + C + "</body></html>");
    const he = P ? P.createHTML(C) : C;
    if (de === _e)
      try {
        R = new g().parseFromString(he, xt);
      } catch {
      }
    if (!R || !R.documentElement) {
      R = T.createDocument(de, "template", null);
      try {
        R.documentElement.innerHTML = Ye ? L : he;
      } catch {
      }
    }
    const Oe = R.body || R.documentElement;
    return C && B && Oe.insertBefore(n.createTextNode(B), Oe.childNodes[0] || null), de === _e ? H.call(R, Ze ? "html" : "body")[0] : Ze ? R.documentElement : Oe;
  }, Or = function(C) {
    return O.call(
      C.ownerDocument || C,
      C,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, Pn = function(C) {
    return C instanceof p && (typeof C.nodeName != "string" || typeof C.textContent != "string" || typeof C.removeChild != "function" || !(C.attributes instanceof u) || typeof C.removeAttribute != "function" || typeof C.setAttribute != "function" || typeof C.namespaceURI != "string" || typeof C.insertBefore != "function" || typeof C.hasChildNodes != "function");
  }, Dr = function(C) {
    return typeof s == "function" && C instanceof s;
  };
  function yt(G, C, R) {
    mn(G, (B) => {
      B.call(t, C, R, Dt);
    });
  }
  const Pr = function(C) {
    let R = null;
    if (yt(N.beforeSanitizeElements, C, null), Pn(C))
      return Le(C), !0;
    const B = pe(C.nodeName);
    if (yt(N.uponSanitizeElement, C, {
      tagName: B,
      allowedTags: Q
    }), mt && C.hasChildNodes() && !Dr(C.firstElementChild) && Fe(/<[/\w!]/g, C.innerHTML) && Fe(/<[/\w!]/g, C.textContent) || C.nodeType === Yt.progressingInstruction || mt && C.nodeType === Yt.comment && Fe(/<[/\w]/g, C.data))
      return Le(C), !0;
    if (!(ue.tagCheck instanceof Function && ue.tagCheck(B)) && (!Q[B] || se[B])) {
      if (!se[B] && Fr(B) && (re.tagNameCheck instanceof RegExp && Fe(re.tagNameCheck, B) || re.tagNameCheck instanceof Function && re.tagNameCheck(B)))
        return !1;
      if (Mt && !I[B]) {
        const he = M(C) || C.parentNode, Oe = _(C) || C.childNodes;
        if (Oe && he) {
          const ge = Oe.length;
          for (let We = ge - 1; We >= 0; --We) {
            const wt = w(Oe[We], !0);
            wt.__removalCount = (C.__removalCount || 0) + 1, he.insertBefore(wt, E(C));
          }
        }
      }
      return Le(C), !0;
    }
    return C instanceof l && !Se(C) || (B === "noscript" || B === "noembed" || B === "noframes") && Fe(/<\/no(script|embed|frames)/i, C.innerHTML) ? (Le(C), !0) : (nt && C.nodeType === Yt.text && (R = C.textContent, mn([b, F, V], (he) => {
      R = Kt(R, he, " ");
    }), C.textContent !== R && (Zt(t.removed, {
      element: C.cloneNode()
    }), C.textContent = R)), yt(N.afterSanitizeElements, C, null), !1);
  }, Hr = function(C, R, B) {
    if (kt && (R === "id" || R === "name") && (B in n || B in pn))
      return !1;
    if (!($e && !ve[R] && Fe(U, R))) {
      if (!(Xe && Fe(q, R))) {
        if (!(ue.attributeCheck instanceof Function && ue.attributeCheck(R, C))) {
          if (!m[R] || ve[R]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Fr(C) && (re.tagNameCheck instanceof RegExp && Fe(re.tagNameCheck, C) || re.tagNameCheck instanceof Function && re.tagNameCheck(C)) && (re.attributeNameCheck instanceof RegExp && Fe(re.attributeNameCheck, R) || re.attributeNameCheck instanceof Function && re.attributeNameCheck(R, C)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              R === "is" && re.allowCustomizedBuiltInElements && (re.tagNameCheck instanceof RegExp && Fe(re.tagNameCheck, B) || re.tagNameCheck instanceof Function && re.tagNameCheck(B)))
            ) return !1;
          } else if (!Te[R]) {
            if (!Fe(f, Kt(B, oe, ""))) {
              if (!((R === "src" || R === "xlink:href" || R === "href") && C !== "script" && Fo(B, "data:") === 0 && J[C])) {
                if (!(st && !Fe(X, Kt(B, oe, "")))) {
                  if (B)
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
    return C !== "annotation-xml" && zn(C, Ne);
  }, Ur = function(C) {
    yt(N.beforeSanitizeAttributes, C, null);
    const {
      attributes: R
    } = C;
    if (!R || Pn(C))
      return;
    const B = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: m,
      forceKeepAttr: void 0
    };
    let he = R.length;
    for (; he--; ) {
      const Oe = R[he], {
        name: ge,
        namespaceURI: We,
        value: wt
      } = Oe, Ut = pe(ge), Hn = wt;
      let Re = ge === "value" ? Hn : Uo(Hn);
      if (B.attrName = Ut, B.attrValue = Re, B.keepAttr = !0, B.forceKeepAttr = void 0, yt(N.uponSanitizeAttribute, C, B), Re = B.attrValue, ut && (Ut === "id" || Ut === "name") && (it(ge, C), Re = Nt + Re), mt && Fe(/((--!?|])>)|<\/(style|title|textarea)/i, Re)) {
        it(ge, C);
        continue;
      }
      if (Ut === "attributename" && zn(Re, "href")) {
        it(ge, C);
        continue;
      }
      if (B.forceKeepAttr)
        continue;
      if (!B.keepAttr) {
        it(ge, C);
        continue;
      }
      if (!At && Fe(/\/>/i, Re)) {
        it(ge, C);
        continue;
      }
      nt && mn([b, F, V], (Br) => {
        Re = Kt(Re, Br, " ");
      });
      const zr = pe(C.nodeName);
      if (!Hr(zr, Ut, Re)) {
        it(ge, C);
        continue;
      }
      if (P && typeof d == "object" && typeof d.getAttributeType == "function" && !We)
        switch (d.getAttributeType(zr, Ut)) {
          case "TrustedHTML": {
            Re = P.createHTML(Re);
            break;
          }
          case "TrustedScriptURL": {
            Re = P.createScriptURL(Re);
            break;
          }
        }
      if (Re !== Hn)
        try {
          We ? C.setAttributeNS(We, ge, Re) : C.setAttribute(ge, Re), Pn(C) ? Le(C) : $r(t.removed);
        } catch {
          it(ge, C);
        }
    }
    yt(N.afterSanitizeAttributes, C, null);
  }, Ya = function G(C) {
    let R = null;
    const B = Or(C);
    for (yt(N.beforeSanitizeShadowDOM, C, null); R = B.nextNode(); )
      yt(N.uponSanitizeShadowNode, R, null), Pr(R), Ur(R), R.content instanceof a && G(R.content);
    yt(N.afterSanitizeShadowDOM, C, null);
  };
  return t.sanitize = function(G) {
    let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, R = null, B = null, he = null, Oe = null;
    if (Ye = !G, Ye && (G = "<!-->"), typeof G != "string" && !Dr(G))
      if (typeof G.toString == "function") {
        if (G = G.toString(), typeof G != "string")
          throw qt("dirty is not a string, aborting");
      } else
        throw qt("toString is not a function");
    if (!t.isSupported)
      return G;
    if (Tt || x(C), t.removed = [], typeof G == "string" && (Ct = !1), Ct) {
      if (G.nodeName) {
        const wt = pe(G.nodeName);
        if (!Q[wt] || se[wt])
          throw qt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (G instanceof s)
      R = Lr("<!---->"), B = R.ownerDocument.importNode(G, !0), B.nodeType === Yt.element && B.nodeName === "BODY" || B.nodeName === "HTML" ? R = B : R.appendChild(B);
    else {
      if (!rt && !nt && !Ze && // eslint-disable-next-line unicorn/prefer-includes
      G.indexOf("<") === -1)
        return P && ct ? P.createHTML(G) : G;
      if (R = Lr(G), !R)
        return rt ? null : ct ? L : "";
    }
    R && _t && Le(R.firstChild);
    const ge = Or(Ct ? G : R);
    for (; he = ge.nextNode(); )
      Pr(he), Ur(he), he.content instanceof a && Ya(he.content);
    if (Ct)
      return G;
    if (rt) {
      if (lt)
        for (Oe = D.call(R.ownerDocument); R.firstChild; )
          Oe.appendChild(R.firstChild);
      else
        Oe = R;
      return (m.shadowroot || m.shadowrootmode) && (Oe = z.call(r, Oe, !0)), Oe;
    }
    let We = Ze ? R.outerHTML : R.innerHTML;
    return Ze && Q["!doctype"] && R.ownerDocument && R.ownerDocument.doctype && R.ownerDocument.doctype.name && Fe(Qi, R.ownerDocument.doctype.name) && (We = "<!DOCTYPE " + R.ownerDocument.doctype.name + `>
` + We), nt && mn([b, F, V], (wt) => {
      We = Kt(We, wt, " ");
    }), P && ct ? P.createHTML(We) : We;
  }, t.setConfig = function() {
    let G = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    x(G), Tt = !0;
  }, t.clearConfig = function() {
    Dt = null, Tt = !1;
  }, t.isValidAttribute = function(G, C, R) {
    Dt || x({});
    const B = pe(G), he = pe(C);
    return Hr(B, he, R);
  }, t.addHook = function(G, C) {
    typeof C == "function" && Zt(N[G], C);
  }, t.removeHook = function(G, C) {
    if (C !== void 0) {
      const R = Po(N[G], C);
      return R === -1 ? void 0 : Ho(N[G], R, 1)[0];
    }
    return $r(N[G]);
  }, t.removeHooks = function(G) {
    N[G] = [];
  }, t.removeAllHooks = function() {
    N = Jr();
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
function vn(e, t = !1) {
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
      const c = vn(s, o === "assistant");
      t((u) => [
        ...u,
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
          (u) => u.id === o ? {
            ...u,
            content: s,
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
function as() {
  const e = $((_) => _.isStreaming), t = $((_) => _.setIsStreaming), n = $((_) => _.isThinking), r = $((_) => _.setIsThinking), i = $((_) => _.streamingContent), a = $((_) => _.setStreamingContent), o = $((_) => _.isHandlingTool), s = $((_) => _.setIsHandlingTool), l = $((_) => _.startStreaming), c = $((_) => _.stopStreaming), u = $((_) => _.clearStreamingBuffers), p = $((_) => _.resetToolHandling), g = Ae(""), d = Ce(() => ({
    get current() {
      return $.getState().currentAssistantMessageId;
    },
    set current(_) {
      $.getState().setCurrentAssistantMessageId(_);
    }
  }), []), y = te((_) => {
    _ ? l(_) : (t(!0), r(!0), a("")), g.current = "";
  }, [l, t, r, a]), w = te(() => {
    c(), g.current = "";
  }, [c]), A = te(() => {
    p();
  }, [p]), E = te(() => {
    u(), g.current = "";
  }, [u]);
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
    streamingContentRef: g,
    // Actions
    startStreaming: y,
    stopStreaming: w,
    resetToolHandling: A,
    clearStreamingBuffers: E
  };
}
function os() {
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
  const e = Ce(
    () => (n, r) => r === !1 ? n.includes(Z.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : n.includes(Z.COMPLETED_MARKER) || n.includes("✅") ? "Tool Completed" : n.includes(Z.ERROR_MARKER) ? "Tool Error" : (n.includes(Z.HANDLING_MARKER), "Tool Processing..."),
    []
  ), t = Ce(
    () => (n, r) => r === !1 ? n.includes(Z.ERROR_MARKER) ? Pe.ERROR : Pe.COMPLETED : n.includes(Z.COMPLETED_MARKER) || n.includes("✅") ? Pe.COMPLETED : n.includes(Z.ERROR_MARKER) ? Pe.ERROR : Pe.PROCESSING,
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
  clearStreamingBuffers: u,
  resetToolHandling: p
}) {
  const g = Ae(/* @__PURE__ */ new Map()), d = Ae(/* @__PURE__ */ new Map()), y = te(() => {
    if (l.current && c.current) {
      const P = vn(
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
  ]), w = te(
    (P) => {
      const L = vn(P, !0);
      if (l.current)
        c.current += L, o(c.current), n(
          l.current,
          c.current,
          !0
        );
      else {
        i(!1);
        const T = r();
        l.current = T, c.current = L, o(L);
        const O = {
          id: T,
          role: "assistant",
          content: L,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        e((D) => [...D, O]);
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
  ), A = te(
    (P, L, T) => {
      const { callId: O } = T || {};
      if (s(P), !O) return;
      const D = be.isThinkingMessage(L) && !L.includes("for") && !L.includes("seconds"), H = be.isThinkingMessage(L) && L.includes("for") && L.includes("seconds"), z = be.isHandlingMessage(L), N = be.isCompletedMessage(L), b = be.isErrorMessage(L);
      if (D || H) {
        const V = g.current.get(O);
        if (D && !V) {
          y();
          const U = r();
          g.current.set(O, U);
          const q = {
            id: U,
            role: "reasoning",
            content: L,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          e((X) => [...X, q]);
        } else H && V ? (n(V, L, !1), g.current.delete(O)) : V && D && n(V, L, !0);
      }
      const F = d.current.get(O);
      if (z && !F) {
        y();
        const V = L.match(
          Z.PATTERNS.HANDLING_TOOL
        ), U = V ? V[1] : "Unknown Tool", q = r();
        d.current.set(O, q);
        const X = {
          id: q,
          role: "tooling",
          content: L,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...T,
            toolName: U,
            callId: O,
            status: Pe.PROCESSING
          }
        };
        e((oe) => [...oe, X]);
      } else if ((N || b) && F) {
        const V = L.match(
          Z.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), U = V ? V[1] : "Unknown Tool";
        e(
          (q) => q.map(
            (X) => X.id === F ? {
              ...X,
              content: L,
              isStreaming: !1,
              toolData: {
                ...X.toolData,
                toolName: U,
                status: b ? Pe.ERROR : Pe.COMPLETED,
                callId: O ?? ""
              }
            } : X
          )
        ), d.current.delete(O);
      } else F && P && !N && !b && n(F, L, !0);
    },
    [
      s,
      y,
      r,
      e,
      n
    ]
  ), E = te(() => {
    a(!1), i(!1), y();
  }, [a, i, y]), _ = te(
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
    a(!1), i(!1), u(), p();
  }, [
    a,
    i,
    u,
    p
  ]);
  return {
    handleSetMessage: w,
    handleReasoningUpdate: A,
    handleChatFinished: E,
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
function Vh({ initialMode: e = "sidebar" }) {
  const t = $();
  return xe(() => {
    e && t.currentMode !== e && t.setCurrentMode(e);
  }, [e]), xe(() => {
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
  setProviderResId: u,
  metadata: p
}) {
  const g = Ae(!1), d = async () => {
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
    if (!g.current && !(a.length > 0))
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
        console.log(`useConversationLoader: Loaded ${w.messages.length} messages`), o(w.messages), w.threadId && (console.log("useConversationLoader: Setting threadId from response:", w.threadId), c(w.threadId)), w.providerResId && (console.log("useConversationLoader: Setting providerResId:", w.providerResId), u(w.providerResId)), g.current = !0;
      } catch (w) {
        console.error("❌ Error loading conversation:", w), l(
          w instanceof Error ? w.message : "Failed to load conversation"
        ), g.current = !0;
      } finally {
        s(!1);
      }
  };
  return xe(() => {
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
    u,
    p
  ]), {
    hasLoadedConversationRef: g,
    resetConversationLoader: () => {
      console.log("useConversationLoader: Resetting loader state"), g.current = !1;
    },
    reloadConversation: d
  };
}
function hs({
  metadata: e,
  chatClient: t,
  currentProviderResId: n,
  isLoadingConversation: r,
  messages: i = [],
  entityId: a,
  entityType: o
}) {
  const s = Ae(void 0), l = Ae(!1);
  return xe(() => {
    if (r || !t)
      return;
    const c = !n && i.length === 0, u = !!n;
    if (c && (!a || !o) || u && !n)
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
    c ? s.current = e : u && t.updateMetadata(n, { metadata: e }).then(() => {
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
class ds {
  // 10MB
  constructor(t) {
    W(this, "config");
    W(this, "defaultFolder", "chat-uploads");
    W(this, "defaultMaxFileSize", 10 * 1024 * 1024);
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
class ps {
  constructor(t, n = {}) {
    W(this, "config");
    W(this, "chatClient");
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
const fs = {
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
}, gs = {
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
}, pt = {
  state: fs,
  url: ta,
  validation: gs,
  css: na,
  error: ra
};
class ei extends Cr {
  constructor(n) {
    super(n);
    W(this, "resetTimeoutId", null);
    W(this, "resetErrorBoundary", () => {
      this.resetTimeoutId && clearTimeout(this.resetTimeoutId), this.setState({
        hasError: !1,
        error: void 0,
        errorInfo: void 0
      });
    });
    W(this, "handleRetry", () => {
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
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ h("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: pt.error.getUserFriendlyErrorMessage(r) }),
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
class ms extends Cr {
  constructor(n) {
    super(n);
    W(this, "retryCount", 0);
    W(this, "retryTimeoutId", null);
    W(this, "handleRetry", () => {
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
    W(this, "handleManualReset", () => {
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
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || pt.error.isNetworkError(r)) ? /* @__PURE__ */ h("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ k("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ h("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ h("div", { className: "chat-wrapper__spinner" })
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
class Cs extends Cr {
  constructor(n) {
    super(n);
    W(this, "handleRetry", () => {
      this.setState({
        hasError: !1,
        error: void 0,
        failedFiles: void 0
      }), this.props.onRetry && this.props.onRetry();
    });
    W(this, "handleDismiss", () => {
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
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ h("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ h("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ h("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ k("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ h("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ h("ul", { className: "chat-wrapper__failed-files-list", children: i.map((l, c) => /* @__PURE__ */ h("li", { className: "chat-wrapper__failed-file", children: l }, c)) })
      ] }),
      /* @__PURE__ */ k("div", { className: "chat-wrapper__error-actions", children: [
        o && /* @__PURE__ */ h(
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
const ys = ({
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
), ws = ({
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
), Ss = ({
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
), Es = ({
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
), ia = ({
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
), Ts = ({
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
), _s = ({
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
        /* @__PURE__ */ h(ys, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ h("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, ks = ({
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
  const c = () => t === "modal" && r && a ? /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: a,
      title: "Close chat",
      children: /* @__PURE__ */ h(ws, { size: 20 })
    }
  ) : null, u = () => {
    if ((t === "sidebar" || t === "fullscreen") && !n && o) {
      const d = t === "fullscreen";
      return /* @__PURE__ */ h(
        "button",
        {
          className: d ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: o,
          title: d ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ h(Ss, { size: 20, isFullscreen: d })
        }
      );
    }
    return null;
  }, p = () => (t === "sidebar" || t === "fullscreen") && !n && s ? /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: s,
      title: "Collapse chat",
      children: /* @__PURE__ */ h(Es, { size: 20 })
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
          children: /* @__PURE__ */ h(ia, { size: 16 })
        }
      ),
      u(),
      p(),
      c()
    ] })
  ] });
};
function xs(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const bs = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, vs = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Is = {};
function ti(e, t) {
  return (Is.jsx ? vs : bs).test(e);
}
const Rs = /[ \t\n\f\r]/g;
function As(e) {
  return typeof e == "object" ? e.type === "text" ? ni(e.value) : !1 : ni(e);
}
function ni(e) {
  return e.replace(Rs, "") === "";
}
class on {
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
on.prototype.normal = {};
on.prototype.property = {};
on.prototype.space = void 0;
function aa(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new on(n, r, t);
}
function or(e) {
  return e.toLowerCase();
}
class je {
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
je.prototype.attribute = "";
je.prototype.booleanish = !1;
je.prototype.boolean = !1;
je.prototype.commaOrSpaceSeparated = !1;
je.prototype.commaSeparated = !1;
je.prototype.defined = !1;
je.prototype.mustUseProperty = !1;
je.prototype.number = !1;
je.prototype.overloadedBoolean = !1;
je.prototype.property = "";
je.prototype.spaceSeparated = !1;
je.prototype.space = void 0;
let Ns = 0;
const Y = Ft(), me = Ft(), sr = Ft(), v = Ft(), le = Ft(), Wt = Ft(), Ke = Ft();
function Ft() {
  return 2 ** ++Ns;
}
const lr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: Y,
  booleanish: me,
  commaOrSpaceSeparated: Ke,
  commaSeparated: Wt,
  number: v,
  overloadedBoolean: sr,
  spaceSeparated: le
}, Symbol.toStringTag, { value: "Module" })), jn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(lr)
);
class yr extends je {
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
      for (; ++a < jn.length; ) {
        const o = jn[a];
        ri(this, jn[a], (r & lr[o]) === lr[o]);
      }
  }
}
yr.prototype.defined = !0;
function ri(e, t, n) {
  n && (e[t] = n);
}
function Vt(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new yr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[or(r)] = r, n[or(a.attribute)] = r;
  }
  return new on(t, n, e.space);
}
const oa = Vt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: me,
    ariaAutoComplete: null,
    ariaBusy: me,
    ariaChecked: me,
    ariaColCount: v,
    ariaColIndex: v,
    ariaColSpan: v,
    ariaControls: le,
    ariaCurrent: null,
    ariaDescribedBy: le,
    ariaDetails: null,
    ariaDisabled: me,
    ariaDropEffect: le,
    ariaErrorMessage: null,
    ariaExpanded: me,
    ariaFlowTo: le,
    ariaGrabbed: me,
    ariaHasPopup: null,
    ariaHidden: me,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: le,
    ariaLevel: v,
    ariaLive: null,
    ariaModal: me,
    ariaMultiLine: me,
    ariaMultiSelectable: me,
    ariaOrientation: null,
    ariaOwns: le,
    ariaPlaceholder: null,
    ariaPosInSet: v,
    ariaPressed: me,
    ariaReadOnly: me,
    ariaRelevant: null,
    ariaRequired: me,
    ariaRoleDescription: le,
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
function sa(e, t) {
  return t in e ? e[t] : t;
}
function la(e, t) {
  return sa(e, t.toLowerCase());
}
const Ms = Vt({
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
    acceptCharset: le,
    accessKey: le,
    action: null,
    allow: null,
    allowFullScreen: Y,
    allowPaymentRequest: Y,
    allowUserMedia: Y,
    alt: null,
    as: null,
    async: Y,
    autoCapitalize: null,
    autoComplete: le,
    autoFocus: Y,
    autoPlay: Y,
    blocking: le,
    capture: null,
    charSet: null,
    checked: Y,
    cite: null,
    className: le,
    cols: v,
    colSpan: null,
    content: null,
    contentEditable: me,
    controls: Y,
    controlsList: le,
    coords: v | Wt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: Y,
    defer: Y,
    dir: null,
    dirName: null,
    disabled: Y,
    download: sr,
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
    headers: le,
    height: v,
    hidden: sr,
    high: v,
    href: null,
    hrefLang: null,
    htmlFor: le,
    httpEquiv: le,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: Y,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: Y,
    itemId: null,
    itemProp: le,
    itemRef: le,
    itemScope: Y,
    itemType: le,
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
    ping: le,
    placeholder: null,
    playsInline: Y,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: Y,
    referrerPolicy: null,
    rel: le,
    required: Y,
    reversed: Y,
    rows: v,
    rowSpan: v,
    sandbox: le,
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
    archive: le,
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
  transform: la
}), Ls = Vt({
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
    about: Ke,
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
    className: le,
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
    g1: Wt,
    g2: Wt,
    glyphName: Wt,
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
    kernelMatrix: Ke,
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
    ping: le,
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
    property: Ke,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Ke,
    rev: Ke,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Ke,
    requiredFeatures: Ke,
    requiredFonts: Ke,
    requiredFormats: Ke,
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
    strokeDashArray: Ke,
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
    systemLanguage: Ke,
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
    typeOf: Ke,
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
}), Os = {
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
}, Ds = /[A-Z]/g, ii = /-[a-z]/g, Ps = /^data[-\w.:]+$/i;
function Hs(e, t) {
  const n = or(t);
  let r = t, i = je;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Ps.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(ii, Us);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!ii.test(a)) {
        let o = a.replace(Ds, Fs);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    i = yr;
  }
  return new i(r, t);
}
function Fs(e) {
  return "-" + e.toLowerCase();
}
function Us(e) {
  return e.charAt(1).toUpperCase();
}
const zs = aa([oa, Ms, ca, ua, ha], "html"), wr = aa([oa, Ls, ca, ua, ha], "svg");
function Bs(e) {
  return e.join(" ").trim();
}
var In = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function da(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Sr = {}, ai = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Ws = /\n/g, Gs = /^\s*/, Vs = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, js = /^:\s*/, $s = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Zs = /^[;\s]*/, Ks = /^\s+|\s+$/g, qs = `
`, oi = "/", si = "*", Pt = "", Xs = "comment", Ys = "declaration", Js = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(y) {
    var w = y.match(Ws);
    w && (n += w.length);
    var A = y.lastIndexOf(qs);
    r = ~A ? y.length - A : r + y.length;
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
      var A = w[0];
      return i(A), e = e.slice(A.length), w;
    }
  }
  function c() {
    l(Gs);
  }
  function u(y) {
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
      var A = e.slice(2, w - 2);
      return r += 2, i(A), e = e.slice(w), r += 2, y({
        type: Xs,
        comment: A
      });
    }
  }
  function g() {
    var y = a(), w = l(Vs);
    if (w) {
      if (p(), !l(js)) return s("property missing ':'");
      var A = l($s), E = y({
        type: Ys,
        property: li(w[0].replace(ai, Pt)),
        value: A ? li(A[0].replace(ai, Pt)) : Pt
      });
      return l(Zs), E;
    }
  }
  function d() {
    var y = [];
    u(y);
    for (var w; w = g(); )
      w !== !1 && (y.push(w), u(y));
    return y;
  }
  return c(), d();
};
function li(e) {
  return e ? e.replace(Ks, Pt) : Pt;
}
var Qs = In && In.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.default = tl;
var el = Qs(Js);
function tl(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, el.default)(e), i = typeof t == "function";
  return r.forEach(function(a) {
    if (a.type === "declaration") {
      var o = a.property, s = a.value;
      i ? t(o, s, a) : s && (n = n || {}, n[o] = s);
    }
  }), n;
}
var Mn = {};
Object.defineProperty(Mn, "__esModule", { value: !0 });
Mn.camelCase = void 0;
var nl = /^--[a-zA-Z0-9_-]+$/, rl = /-([a-z])/g, il = /^[^-]+$/, al = /^-(webkit|moz|ms|o|khtml)-/, ol = /^-(ms)-/, sl = function(e) {
  return !e || il.test(e) || nl.test(e);
}, ll = function(e, t) {
  return t.toUpperCase();
}, ci = function(e, t) {
  return "".concat(t, "-");
}, cl = function(e, t) {
  return t === void 0 && (t = {}), sl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(ol, ci) : e = e.replace(al, ci), e.replace(rl, ll));
};
Mn.camelCase = cl;
var ul = In && In.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, hl = ul(Sr), dl = Mn;
function cr(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, hl.default)(e, function(r, i) {
    r && i && (n[(0, dl.camelCase)(r, t)] = i);
  }), n;
}
cr.default = cr;
var pl = cr;
const fl = /* @__PURE__ */ da(pl), pa = fa("end"), Er = fa("start");
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
function gl(e) {
  const t = Er(e), n = pa(e);
  if (t && n)
    return { start: t, end: n };
}
function en(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? ui(e.position) : "start" in e || "end" in e ? ui(e) : "line" in e || "column" in e ? ur(e) : "";
}
function ur(e) {
  return hi(e && e.line) + ":" + hi(e && e.column);
}
function ui(e) {
  return ur(e && e.start) + "-" + ur(e && e.end);
}
function hi(e) {
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
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = s ? s.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = s ? s.line : void 0, this.name = en(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = o && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
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
const Tr = {}.hasOwnProperty, ml = /* @__PURE__ */ new Map(), Cl = /[A-Z]/g, yl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), wl = /* @__PURE__ */ new Set(["td", "th"]), ga = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
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
    schema: t.space === "svg" ? wr : zs,
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
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = wr, e.schema = i), e.ancestors.push(t);
  const a = ya(e, t.tagName, !1), o = Rl(e, t);
  let s = kr(e, t);
  return yl.has(t.tagName) && (s = s.filter(function(l) {
    return typeof l == "string" ? !As(l) : !0;
  })), Ca(e, o, a, t), _r(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function Tl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  an(e, t.position);
}
function _l(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  an(e, t.position);
}
function kl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = wr, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : ya(e, t.name, !0), o = Al(e, t), s = kr(e, t);
  return Ca(e, o, a, t), _r(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function xl(e, t, n) {
  const r = {};
  return _r(r, kr(e, t)), e.create(t, e.Fragment, r, n);
}
function bl(e, t) {
  return t.value;
}
function Ca(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function _r(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function vl(e, t, n) {
  return r;
  function r(i, a, o, s) {
    const c = Array.isArray(o.children) ? n : t;
    return s ? c(a, o, s) : c(a, o);
  }
}
function Il(e, t) {
  return n;
  function n(r, i, a, o) {
    const s = Array.isArray(a.children), l = Er(r);
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
function Rl(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && Tr.call(t.properties, i)) {
      const a = Nl(e, i, t.properties[i]);
      if (a) {
        const [o, s] = a;
        e.tableCellAlignToStyle && o === "align" && typeof s == "string" && wl.has(t.tagName) ? r = s : n[o] = s;
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
        const o = a.expression;
        o.type;
        const s = o.properties[0];
        s.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(s.argument)
        );
      } else
        an(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const s = r.value.data.estree.body[0];
          s.type, a = e.evaluater.evaluateExpression(s.expression);
        } else
          an(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function kr(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : ml;
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
function Nl(e, t, n) {
  const r = Hs(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? xs(n) : Bs(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Ml(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Ll(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Os[r.property] || r.property : r.attribute,
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
    ), i = new He("Cannot parse `style` attribute", {
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
    return Tr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  an(e);
}
function an(e, t) {
  const n = new He(
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
function Ll(e) {
  const t = {};
  let n;
  for (n in e)
    Tr.call(e, n) && (t[Ol(n)] = e[n]);
  return t;
}
function Ol(e) {
  let t = e.replace(Cl, Dl);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Dl(e) {
  return "-" + e.toLowerCase();
}
const $n = {
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
  return wa(e, r, i);
}
function wa(e, t, n) {
  if (Fl(e)) {
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
function Fl(e) {
  return !!(e && typeof e == "object");
}
const pi = document.createElement("i");
function xr(e) {
  const t = "&" + e + ";";
  pi.innerHTML = t;
  const n = pi.textContent;
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
function Qe(e, t) {
  return e.length > 0 ? (gt(e, e.length, 0, t), e) : t;
}
const fi = {}.hasOwnProperty;
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
    const i = (fi.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let o;
    if (a)
      for (o in a) {
        fi.call(i, o) || (i[o] = []);
        const s = a[o];
        Bl(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(s) ? s : s ? [s] : []
        );
      }
  }
}
function Bl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  gt(e, 0, 0, r);
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
const ft = Rt(/[A-Za-z]/), qe = Rt(/[\dA-Za-z]/), Wl = Rt(/[#-'*+\--9=?A-Z^-~]/);
function hr(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const dr = Rt(/\d/), Gl = Rt(/[\dA-Fa-f]/), Vl = Rt(/[!-/:-@[-`{-~]/);
function K(e) {
  return e !== null && e < -2;
}
function Ve(e) {
  return e !== null && (e < 0 || e === 32);
}
function ie(e) {
  return e === -2 || e === -1 || e === 32;
}
const jl = Rt(new RegExp("\\p{P}|\\p{S}", "u")), $l = Rt(/\s/);
function Rt(e) {
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
function ce(e, t, n, r) {
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
const Zl = {
  tokenize: Kl
};
function Kl(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(s) {
    if (s === null) {
      e.consume(s);
      return;
    }
    return e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), ce(e, t, "linePrefix");
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
const ql = {
  tokenize: Xl
}, gi = {
  tokenize: Yl
};
function Xl(e) {
  const t = this, n = [];
  let r = 0, i, a, o;
  return s;
  function s(M) {
    if (r < n.length) {
      const P = n[r];
      return t.containerState = P[1], e.attempt(P[0].continuation, l, c)(M);
    }
    return c(M);
  }
  function l(M) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && _();
      const P = t.events.length;
      let L = P, T;
      for (; L--; )
        if (t.events[L][0] === "exit" && t.events[L][1].type === "chunkFlow") {
          T = t.events[L][1].end;
          break;
        }
      E(r);
      let O = P;
      for (; O < t.events.length; )
        t.events[O][1].end = {
          ...T
        }, O++;
      return gt(t.events, L + 1, 0, t.events.slice(P)), t.events.length = O, c(M);
    }
    return s(M);
  }
  function c(M) {
    if (r === n.length) {
      if (!i)
        return g(M);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return y(M);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(gi, u, p)(M);
  }
  function u(M) {
    return i && _(), E(r), g(M);
  }
  function p(M) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, y(M);
  }
  function g(M) {
    return t.containerState = {}, e.attempt(gi, d, y)(M);
  }
  function d(M) {
    return r++, n.push([t.currentConstruct, t.containerState]), g(M);
  }
  function y(M) {
    if (M === null) {
      i && _(), E(0), e.consume(M);
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
      A(e.exit("chunkFlow"), !0), E(0), e.consume(M);
      return;
    }
    return K(M) ? (e.consume(M), A(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, s) : (e.consume(M), w);
  }
  function A(M, P) {
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
      const O = t.events.length;
      let D = O, H, z;
      for (; D--; )
        if (t.events[D][0] === "exit" && t.events[D][1].type === "chunkFlow") {
          if (H) {
            z = t.events[D][1].end;
            break;
          }
          H = !0;
        }
      for (E(r), T = O; T < t.events.length; )
        t.events[T][1].end = {
          ...z
        }, T++;
      gt(t.events, D + 1, 0, t.events.slice(O)), t.events.length = T;
    }
  }
  function E(M) {
    let P = n.length;
    for (; P-- > M; ) {
      const L = n[P];
      t.containerState = L[1], L[0].exit.call(t, e);
    }
    n.length = M;
  }
  function _() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Yl(e, t, n) {
  return ce(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function mi(e) {
  if (e === null || Ve(e) || $l(e))
    return 1;
  if (jl(e))
    return 2;
}
function br(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const pr = {
  name: "attention",
  resolveAll: Jl,
  tokenize: Ql
};
function Jl(e, t) {
  let n = -1, r, i, a, o, s, l, c, u;
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
          }, g = {
            ...e[n][1].start
          };
          Ci(p, -l), Ci(g, l), o = {
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
            end: g
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
          }, c = [], e[r][1].end.offset - e[r][1].start.offset && (c = Qe(c, [["enter", e[r][1], t], ["exit", e[r][1], t]])), c = Qe(c, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["enter", a, t]]), c = Qe(c, br(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), c = Qe(c, [["exit", a, t], ["enter", s, t], ["exit", s, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, c = Qe(c, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : u = 0, gt(e, r - 1, n - r + 3, c), n = r + c.length - u - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Ql(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = mi(r);
  let a;
  return o;
  function o(l) {
    return a = l, e.enter("attentionSequence"), s(l);
  }
  function s(l) {
    if (l === a)
      return e.consume(l), s;
    const c = e.exit("attentionSequence"), u = mi(l), p = !u || u === 2 && i || n.includes(l), g = !i || i === 2 && u || n.includes(r);
    return c._open = !!(a === 42 ? p : p && (i || !g)), c._close = !!(a === 42 ? g : g && (u || !p)), t(l);
  }
}
function Ci(e, t) {
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
    return ft(d) ? (e.consume(d), o) : d === 64 ? n(d) : c(d);
  }
  function o(d) {
    return d === 43 || d === 45 || d === 46 || qe(d) ? (r = 1, s(d)) : c(d);
  }
  function s(d) {
    return d === 58 ? (e.consume(d), r = 0, l) : (d === 43 || d === 45 || d === 46 || qe(d)) && r++ < 32 ? (e.consume(d), s) : (r = 0, c(d));
  }
  function l(d) {
    return d === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.exit("autolink"), t) : d === null || d === 32 || d === 60 || hr(d) ? n(d) : (e.consume(d), l);
  }
  function c(d) {
    return d === 64 ? (e.consume(d), u) : Wl(d) ? (e.consume(d), c) : n(d);
  }
  function u(d) {
    return qe(d) ? p(d) : n(d);
  }
  function p(d) {
    return d === 46 ? (e.consume(d), r = 0, u) : d === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.exit("autolink"), t) : g(d);
  }
  function g(d) {
    if ((d === 45 || qe(d)) && r++ < 63) {
      const y = d === 45 ? g : p;
      return e.consume(d), y;
    }
    return n(d);
  }
}
const Ln = {
  partial: !0,
  tokenize: nc
};
function nc(e, t, n) {
  return r;
  function r(a) {
    return ie(a) ? ce(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || K(a) ? t(a) : n(a);
  }
}
const Ea = {
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
function ic(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return ie(o) ? ce(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : a(o);
  }
  function a(o) {
    return e.attempt(Ea, t, n)(o);
  }
}
function ac(e) {
  e.exit("blockQuote");
}
const Ta = {
  name: "characterEscape",
  tokenize: oc
};
function oc(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return Vl(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const _a = {
  name: "characterReference",
  tokenize: sc
};
function sc(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return s;
  function s(p) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), l;
  }
  function l(p) {
    return p === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(p), e.exit("characterReferenceMarkerNumeric"), c) : (e.enter("characterReferenceValue"), a = 31, o = qe, u(p));
  }
  function c(p) {
    return p === 88 || p === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(p), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, o = Gl, u) : (e.enter("characterReferenceValue"), a = 7, o = dr, u(p));
  }
  function u(p) {
    if (p === 59 && i) {
      const g = e.exit("characterReferenceValue");
      return o === qe && !xr(r.sliceSerialize(g)) ? n(p) : (e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return o(p) && i++ < a ? (e.consume(p), u) : n(p);
  }
}
const yi = {
  partial: !0,
  tokenize: cc
}, wi = {
  concrete: !0,
  name: "codeFenced",
  tokenize: lc
};
function lc(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: L
  };
  let a = 0, o = 0, s;
  return l;
  function l(T) {
    return c(T);
  }
  function c(T) {
    const O = r.events[r.events.length - 1];
    return a = O && O[1].type === "linePrefix" ? O[2].sliceSerialize(O[1], !0).length : 0, s = T, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(T);
  }
  function u(T) {
    return T === s ? (o++, e.consume(T), u) : o < 3 ? n(T) : (e.exit("codeFencedFenceSequence"), ie(T) ? ce(e, p, "whitespace")(T) : p(T));
  }
  function p(T) {
    return T === null || K(T) ? (e.exit("codeFencedFence"), r.interrupt ? t(T) : e.check(yi, w, P)(T)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), g(T));
  }
  function g(T) {
    return T === null || K(T) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), p(T)) : ie(T) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), ce(e, d, "whitespace")(T)) : T === 96 && T === s ? n(T) : (e.consume(T), g);
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
    return e.attempt(i, P, A)(T);
  }
  function A(T) {
    return e.enter("lineEnding"), e.consume(T), e.exit("lineEnding"), E;
  }
  function E(T) {
    return a > 0 && ie(T) ? ce(e, _, "linePrefix", a + 1)(T) : _(T);
  }
  function _(T) {
    return T === null || K(T) ? e.check(yi, w, P)(T) : (e.enter("codeFlowValue"), M(T));
  }
  function M(T) {
    return T === null || K(T) ? (e.exit("codeFlowValue"), _(T)) : (e.consume(T), M);
  }
  function P(T) {
    return e.exit("codeFenced"), t(T);
  }
  function L(T, O, D) {
    let H = 0;
    return z;
    function z(U) {
      return T.enter("lineEnding"), T.consume(U), T.exit("lineEnding"), N;
    }
    function N(U) {
      return T.enter("codeFencedFence"), ie(U) ? ce(T, b, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(U) : b(U);
    }
    function b(U) {
      return U === s ? (T.enter("codeFencedFenceSequence"), F(U)) : D(U);
    }
    function F(U) {
      return U === s ? (H++, T.consume(U), F) : H >= o ? (T.exit("codeFencedFenceSequence"), ie(U) ? ce(T, V, "whitespace")(U) : V(U)) : D(U);
    }
    function V(U) {
      return U === null || K(U) ? (T.exit("codeFencedFence"), O(U)) : D(U);
    }
  }
}
function cc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? n(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), a);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
const Zn = {
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
    return e.enter("codeIndented"), ce(e, a, "linePrefix", 5)(c);
  }
  function a(c) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? o(c) : n(c);
  }
  function o(c) {
    return c === null ? l(c) : K(c) ? e.attempt(uc, o, l)(c) : (e.enter("codeFlowValue"), s(c));
  }
  function s(c) {
    return c === null || K(c) ? (e.exit("codeFlowValue"), o(c)) : (e.consume(c), s);
  }
  function l(c) {
    return e.exit("codeIndented"), t(c);
  }
}
function dc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : K(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : ce(e, a, "linePrefix", 5)(o);
  }
  function a(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? t(o) : K(o) ? i(o) : n(o);
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
  return o;
  function o(p) {
    return e.enter("codeText"), e.enter("codeTextSequence"), s(p);
  }
  function s(p) {
    return p === 96 ? (e.consume(p), r++, s) : (e.exit("codeTextSequence"), l(p));
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
    return r && Jt(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Jt(this.left, t);
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
    this.setCursor(0), Jt(this.right, t.reverse());
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
        Jt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Jt(this.left, n.reverse());
      }
  }
}
function Jt(e, t) {
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
        if (o = u.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
          o[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
        else if (!(o[1].type === "linePrefix" || o[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...u.get(i)[1].start
      }, s = u.slice(i, n), s.unshift(r), u.splice(i, n - i + 1, s));
    }
  }
  return gt(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !c;
}
function yc(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const s = o.events, l = [], c = {};
  let u, p, g = -1, d = n, y = 0, w = 0;
  const A = [w];
  for (; d; ) {
    for (; e.get(++i)[1] !== d; )
      ;
    a.push(i), d._tokenizer || (u = r.sliceStream(d), d.next || u.push(null), p && o.defineSkip(d.start), d._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), d._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), p = d, d = d.next;
  }
  for (d = n; ++g < s.length; )
    // Find a void token that includes a break.
    s[g][0] === "exit" && s[g - 1][0] === "enter" && s[g][1].type === s[g - 1][1].type && s[g][1].start.line !== s[g][1].end.line && (w = g + 1, A.push(w), d._tokenizer = void 0, d.previous = void 0, d = d.next);
  for (o.events = [], d ? (d._tokenizer = void 0, d.previous = void 0) : A.pop(), g = A.length; g--; ) {
    const E = s.slice(A[g], A[g + 1]), _ = a.pop();
    l.push([_, _ + E.length - 1]), e.splice(_, 2, E);
  }
  for (l.reverse(), g = -1; ++g < l.length; )
    c[y + l[g][0]] = y + l[g][1], y += l[g][1] - l[g][0] - 1;
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
  return ka(e), e;
}
function Tc(e, t) {
  let n;
  return r;
  function r(s) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(s);
  }
  function i(s) {
    return s === null ? a(s) : K(s) ? e.check(Sc, o, a)(s) : (e.consume(s), i);
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
function _c(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), ce(e, a, "linePrefix");
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
  let u = 0;
  return p;
  function p(E) {
    return E === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(E), e.exit(a), g) : E === null || E === 32 || E === 41 || hr(E) ? n(E) : (e.enter(r), e.enter(o), e.enter(s), e.enter("chunkString", {
      contentType: "string"
    }), w(E));
  }
  function g(E) {
    return E === 62 ? (e.enter(a), e.consume(E), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter("chunkString", {
      contentType: "string"
    }), d(E));
  }
  function d(E) {
    return E === 62 ? (e.exit("chunkString"), e.exit(s), g(E)) : E === null || E === 60 || K(E) ? n(E) : (e.consume(E), E === 92 ? y : d);
  }
  function y(E) {
    return E === 60 || E === 62 || E === 92 ? (e.consume(E), d) : d(E);
  }
  function w(E) {
    return !u && (E === null || E === 41 || Ve(E)) ? (e.exit("chunkString"), e.exit(s), e.exit(o), e.exit(r), t(E)) : u < c && E === 40 ? (e.consume(E), u++, w) : E === 41 ? (e.consume(E), u--, w) : E === null || E === 32 || E === 40 || hr(E) ? n(E) : (e.consume(E), E === 92 ? A : w);
  }
  function A(E) {
    return E === 40 || E === 41 || E === 92 ? (e.consume(E), w) : w(E);
  }
}
function ba(e, t, n, r, i, a) {
  const o = this;
  let s = 0, l;
  return c;
  function c(d) {
    return e.enter(r), e.enter(i), e.consume(d), e.exit(i), e.enter(a), u;
  }
  function u(d) {
    return s > 999 || d === null || d === 91 || d === 93 && !l || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    d === 94 && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(d) : d === 93 ? (e.exit(a), e.enter(i), e.consume(d), e.exit(i), e.exit(r), t) : K(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), p(d));
  }
  function p(d) {
    return d === null || d === 91 || d === 93 || K(d) || s++ > 999 ? (e.exit("chunkString"), u(d)) : (e.consume(d), l || (l = !ie(d)), d === 92 ? g : p);
  }
  function g(d) {
    return d === 91 || d === 92 || d === 93 ? (e.consume(d), s++, p) : p(d);
  }
}
function va(e, t, n, r, i, a) {
  let o;
  return s;
  function s(g) {
    return g === 34 || g === 39 || g === 40 ? (e.enter(r), e.enter(i), e.consume(g), e.exit(i), o = g === 40 ? 41 : g, l) : n(g);
  }
  function l(g) {
    return g === o ? (e.enter(i), e.consume(g), e.exit(i), e.exit(r), t) : (e.enter(a), c(g));
  }
  function c(g) {
    return g === o ? (e.exit(a), l(o)) : g === null ? n(g) : K(g) ? (e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), ce(e, c, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), u(g));
  }
  function u(g) {
    return g === o || g === null || K(g) ? (e.exit("chunkString"), c(g)) : (e.consume(g), g === 92 ? p : u);
  }
  function p(g) {
    return g === o || g === 92 ? (e.consume(g), u) : u(g);
  }
}
function tn(e, t) {
  let n;
  return r;
  function r(i) {
    return K(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : ie(i) ? ce(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
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
    return Ve(d) ? tn(e, c)(d) : c(d);
  }
  function c(d) {
    return xa(
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
    return ie(d) ? ce(e, g, "whitespace")(d) : g(d);
  }
  function g(d) {
    return d === null || K(d) ? (e.exit("definition"), r.parser.defined.push(i), t(d)) : n(d);
  }
}
function vc(e, t, n) {
  return r;
  function r(s) {
    return Ve(s) ? tn(e, i)(s) : n(s);
  }
  function i(s) {
    return va(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(s);
  }
  function a(s) {
    return ie(s) ? ce(e, o, "whitespace")(s) : o(s);
  }
  function o(s) {
    return s === null || K(s) ? t(s) : n(s);
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
  }, gt(e, r, n - r + 1, [["enter", i, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]])), e;
}
function Mc(e, t, n) {
  let r = 0;
  return i;
  function i(u) {
    return e.enter("atxHeading"), a(u);
  }
  function a(u) {
    return e.enter("atxHeadingSequence"), o(u);
  }
  function o(u) {
    return u === 35 && r++ < 6 ? (e.consume(u), o) : u === null || Ve(u) ? (e.exit("atxHeadingSequence"), s(u)) : n(u);
  }
  function s(u) {
    return u === 35 ? (e.enter("atxHeadingSequence"), l(u)) : u === null || K(u) ? (e.exit("atxHeading"), t(u)) : ie(u) ? ce(e, s, "whitespace")(u) : (e.enter("atxHeadingText"), c(u));
  }
  function l(u) {
    return u === 35 ? (e.consume(u), l) : (e.exit("atxHeadingSequence"), s(u));
  }
  function c(u) {
    return u === null || u === 35 || Ve(u) ? (e.exit("atxHeadingText"), s(u)) : (e.consume(u), c);
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
], Si = ["pre", "script", "style", "textarea"], Oc = {
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
  let i, a, o, s, l;
  return c;
  function c(m) {
    return u(m);
  }
  function u(m) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(m), p;
  }
  function p(m) {
    return m === 33 ? (e.consume(m), g) : m === 47 ? (e.consume(m), a = !0, w) : m === 63 ? (e.consume(m), i = 3, r.interrupt ? t : f) : ft(m) ? (e.consume(m), o = String.fromCharCode(m), A) : n(m);
  }
  function g(m) {
    return m === 45 ? (e.consume(m), i = 2, d) : m === 91 ? (e.consume(m), i = 5, s = 0, y) : ft(m) ? (e.consume(m), i = 4, r.interrupt ? t : f) : n(m);
  }
  function d(m) {
    return m === 45 ? (e.consume(m), r.interrupt ? t : f) : n(m);
  }
  function y(m) {
    const Ee = "CDATA[";
    return m === Ee.charCodeAt(s++) ? (e.consume(m), s === Ee.length ? r.interrupt ? t : b : y) : n(m);
  }
  function w(m) {
    return ft(m) ? (e.consume(m), o = String.fromCharCode(m), A) : n(m);
  }
  function A(m) {
    if (m === null || m === 47 || m === 62 || Ve(m)) {
      const Ee = m === 47, re = o.toLowerCase();
      return !Ee && !a && Si.includes(re) ? (i = 1, r.interrupt ? t(m) : b(m)) : Lc.includes(o.toLowerCase()) ? (i = 6, Ee ? (e.consume(m), E) : r.interrupt ? t(m) : b(m)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(m) : a ? _(m) : M(m));
    }
    return m === 45 || qe(m) ? (e.consume(m), o += String.fromCharCode(m), A) : n(m);
  }
  function E(m) {
    return m === 62 ? (e.consume(m), r.interrupt ? t : b) : n(m);
  }
  function _(m) {
    return ie(m) ? (e.consume(m), _) : z(m);
  }
  function M(m) {
    return m === 47 ? (e.consume(m), z) : m === 58 || m === 95 || ft(m) ? (e.consume(m), P) : ie(m) ? (e.consume(m), M) : z(m);
  }
  function P(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || qe(m) ? (e.consume(m), P) : L(m);
  }
  function L(m) {
    return m === 61 ? (e.consume(m), T) : ie(m) ? (e.consume(m), L) : M(m);
  }
  function T(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (e.consume(m), l = m, O) : ie(m) ? (e.consume(m), T) : D(m);
  }
  function O(m) {
    return m === l ? (e.consume(m), l = null, H) : m === null || K(m) ? n(m) : (e.consume(m), O);
  }
  function D(m) {
    return m === null || m === 34 || m === 39 || m === 47 || m === 60 || m === 61 || m === 62 || m === 96 || Ve(m) ? L(m) : (e.consume(m), D);
  }
  function H(m) {
    return m === 47 || m === 62 || ie(m) ? M(m) : n(m);
  }
  function z(m) {
    return m === 62 ? (e.consume(m), N) : n(m);
  }
  function N(m) {
    return m === null || K(m) ? b(m) : ie(m) ? (e.consume(m), N) : n(m);
  }
  function b(m) {
    return m === 45 && i === 2 ? (e.consume(m), q) : m === 60 && i === 1 ? (e.consume(m), X) : m === 62 && i === 4 ? (e.consume(m), Q) : m === 63 && i === 3 ? (e.consume(m), f) : m === 93 && i === 5 ? (e.consume(m), Ne) : K(m) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Dc, ye, F)(m)) : m === null || K(m) ? (e.exit("htmlFlowData"), F(m)) : (e.consume(m), b);
  }
  function F(m) {
    return e.check(Pc, V, ye)(m);
  }
  function V(m) {
    return e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), U;
  }
  function U(m) {
    return m === null || K(m) ? F(m) : (e.enter("htmlFlowData"), b(m));
  }
  function q(m) {
    return m === 45 ? (e.consume(m), f) : b(m);
  }
  function X(m) {
    return m === 47 ? (e.consume(m), o = "", oe) : b(m);
  }
  function oe(m) {
    if (m === 62) {
      const Ee = o.toLowerCase();
      return Si.includes(Ee) ? (e.consume(m), Q) : b(m);
    }
    return ft(m) && o.length < 8 ? (e.consume(m), o += String.fromCharCode(m), oe) : b(m);
  }
  function Ne(m) {
    return m === 93 ? (e.consume(m), f) : b(m);
  }
  function f(m) {
    return m === 62 ? (e.consume(m), Q) : m === 45 && i === 2 ? (e.consume(m), f) : b(m);
  }
  function Q(m) {
    return m === null || K(m) ? (e.exit("htmlFlowData"), ye(m)) : (e.consume(m), Q);
  }
  function ye(m) {
    return e.exit("htmlFlow"), t(m);
  }
}
function Uc(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return K(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), a) : n(o);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function zc(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(Ln, t, n);
  }
}
const Bc = {
  name: "htmlText",
  tokenize: Wc
};
function Wc(e, t, n) {
  const r = this;
  let i, a, o;
  return s;
  function s(f) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(f), l;
  }
  function l(f) {
    return f === 33 ? (e.consume(f), c) : f === 47 ? (e.consume(f), L) : f === 63 ? (e.consume(f), M) : ft(f) ? (e.consume(f), D) : n(f);
  }
  function c(f) {
    return f === 45 ? (e.consume(f), u) : f === 91 ? (e.consume(f), a = 0, y) : ft(f) ? (e.consume(f), _) : n(f);
  }
  function u(f) {
    return f === 45 ? (e.consume(f), d) : n(f);
  }
  function p(f) {
    return f === null ? n(f) : f === 45 ? (e.consume(f), g) : K(f) ? (o = p, X(f)) : (e.consume(f), p);
  }
  function g(f) {
    return f === 45 ? (e.consume(f), d) : p(f);
  }
  function d(f) {
    return f === 62 ? q(f) : f === 45 ? g(f) : p(f);
  }
  function y(f) {
    const Q = "CDATA[";
    return f === Q.charCodeAt(a++) ? (e.consume(f), a === Q.length ? w : y) : n(f);
  }
  function w(f) {
    return f === null ? n(f) : f === 93 ? (e.consume(f), A) : K(f) ? (o = w, X(f)) : (e.consume(f), w);
  }
  function A(f) {
    return f === 93 ? (e.consume(f), E) : w(f);
  }
  function E(f) {
    return f === 62 ? q(f) : f === 93 ? (e.consume(f), E) : w(f);
  }
  function _(f) {
    return f === null || f === 62 ? q(f) : K(f) ? (o = _, X(f)) : (e.consume(f), _);
  }
  function M(f) {
    return f === null ? n(f) : f === 63 ? (e.consume(f), P) : K(f) ? (o = M, X(f)) : (e.consume(f), M);
  }
  function P(f) {
    return f === 62 ? q(f) : M(f);
  }
  function L(f) {
    return ft(f) ? (e.consume(f), T) : n(f);
  }
  function T(f) {
    return f === 45 || qe(f) ? (e.consume(f), T) : O(f);
  }
  function O(f) {
    return K(f) ? (o = O, X(f)) : ie(f) ? (e.consume(f), O) : q(f);
  }
  function D(f) {
    return f === 45 || qe(f) ? (e.consume(f), D) : f === 47 || f === 62 || Ve(f) ? H(f) : n(f);
  }
  function H(f) {
    return f === 47 ? (e.consume(f), q) : f === 58 || f === 95 || ft(f) ? (e.consume(f), z) : K(f) ? (o = H, X(f)) : ie(f) ? (e.consume(f), H) : q(f);
  }
  function z(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || qe(f) ? (e.consume(f), z) : N(f);
  }
  function N(f) {
    return f === 61 ? (e.consume(f), b) : K(f) ? (o = N, X(f)) : ie(f) ? (e.consume(f), N) : H(f);
  }
  function b(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), i = f, F) : K(f) ? (o = b, X(f)) : ie(f) ? (e.consume(f), b) : (e.consume(f), V);
  }
  function F(f) {
    return f === i ? (e.consume(f), i = void 0, U) : f === null ? n(f) : K(f) ? (o = F, X(f)) : (e.consume(f), F);
  }
  function V(f) {
    return f === null || f === 34 || f === 39 || f === 60 || f === 61 || f === 96 ? n(f) : f === 47 || f === 62 || Ve(f) ? H(f) : (e.consume(f), V);
  }
  function U(f) {
    return f === 47 || f === 62 || Ve(f) ? H(f) : n(f);
  }
  function q(f) {
    return f === 62 ? (e.consume(f), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(f);
  }
  function X(f) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), oe;
  }
  function oe(f) {
    return ie(f) ? ce(e, Ne, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : Ne(f);
  }
  function Ne(f) {
    return e.enter("htmlTextData"), o(f);
  }
}
const vr = {
  name: "labelEnd",
  resolveAll: $c,
  resolveTo: Zc,
  tokenize: Kc
}, Gc = {
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
  return e.length !== n.length && gt(e, 0, e.length, n), e;
}
function Zc(e, t) {
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
  }, u = {
    type: "labelText",
    start: {
      ...e[a + r + 2][1].end
    },
    end: {
      ...e[o - 2][1].start
    }
  };
  return s = [["enter", l, t], ["enter", c, t]], s = Qe(s, e.slice(a + 1, a + r + 3)), s = Qe(s, [["enter", u, t]]), s = Qe(s, br(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t)), s = Qe(s, [["exit", u, t], e[o - 2], e[o - 1], ["exit", c, t]]), s = Qe(s, e.slice(o + 1)), s = Qe(s, [["exit", l, t]]), gt(e, a, e.length, s), e;
}
function Kc(e, t, n) {
  const r = this;
  let i = r.events.length, a, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return s;
  function s(g) {
    return a ? a._inactive ? p(g) : (o = r.parser.defined.includes(Gt(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(g), e.exit("labelMarker"), e.exit("labelEnd"), l) : n(g);
  }
  function l(g) {
    return g === 40 ? e.attempt(Gc, u, o ? u : p)(g) : g === 91 ? e.attempt(Vc, u, o ? c : p)(g) : o ? u(g) : p(g);
  }
  function c(g) {
    return e.attempt(jc, u, p)(g);
  }
  function u(g) {
    return t(g);
  }
  function p(g) {
    return a._balanced = !0, n(g);
  }
}
function qc(e, t, n) {
  return r;
  function r(p) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), i;
  }
  function i(p) {
    return Ve(p) ? tn(e, a)(p) : a(p);
  }
  function a(p) {
    return p === 41 ? u(p) : xa(e, o, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(p);
  }
  function o(p) {
    return Ve(p) ? tn(e, l)(p) : u(p);
  }
  function s(p) {
    return n(p);
  }
  function l(p) {
    return p === 34 || p === 39 || p === 40 ? va(e, c, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(p) : u(p);
  }
  function c(p) {
    return Ve(p) ? tn(e, u)(p) : u(p);
  }
  function u(p) {
    return p === 41 ? (e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), e.exit("resource"), t) : n(p);
  }
}
function Xc(e, t, n) {
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
  resolveAll: vr.resolveAll,
  tokenize: Qc
};
function Qc(e, t, n) {
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
const eu = {
  name: "labelStartLink",
  resolveAll: vr.resolveAll,
  tokenize: tu
};
function tu(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), a;
  }
  function a(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const Kn = {
  name: "lineEnding",
  tokenize: nu
};
function nu(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), ce(e, t, "linePrefix");
  }
}
const _n = {
  name: "thematicBreak",
  tokenize: ru
};
function ru(e, t, n) {
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
    return c === i ? (e.consume(c), r++, l) : (e.exit("thematicBreakSequence"), ie(c) ? ce(e, s, "whitespace")(c) : s(c));
  }
}
const Ge = {
  continuation: {
    tokenize: su
  },
  exit: cu,
  name: "list",
  tokenize: ou
}, iu = {
  partial: !0,
  tokenize: uu
}, au = {
  partial: !0,
  tokenize: lu
};
function ou(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return s;
  function s(d) {
    const y = r.containerState.type || (d === 42 || d === 43 || d === 45 ? "listUnordered" : "listOrdered");
    if (y === "listUnordered" ? !r.containerState.marker || d === r.containerState.marker : dr(d)) {
      if (r.containerState.type || (r.containerState.type = y, e.enter(y, {
        _container: !0
      })), y === "listUnordered")
        return e.enter("listItemPrefix"), d === 42 || d === 45 ? e.check(_n, n, c)(d) : c(d);
      if (!r.interrupt || d === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), l(d);
    }
    return n(d);
  }
  function l(d) {
    return dr(d) && ++o < 10 ? (e.consume(d), l) : (!r.interrupt || o < 2) && (r.containerState.marker ? d === r.containerState.marker : d === 41 || d === 46) ? (e.exit("listItemValue"), c(d)) : n(d);
  }
  function c(d) {
    return e.enter("listItemMarker"), e.consume(d), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || d, e.check(
      Ln,
      // Can’t be empty when interrupting.
      r.interrupt ? n : u,
      e.attempt(iu, g, p)
    );
  }
  function u(d) {
    return r.containerState.initialBlankLine = !0, a++, g(d);
  }
  function p(d) {
    return ie(d) ? (e.enter("listItemPrefixWhitespace"), e.consume(d), e.exit("listItemPrefixWhitespace"), g) : n(d);
  }
  function g(d) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(d);
  }
}
function su(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Ln, i, a);
  function i(s) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, ce(e, t, "listItemIndent", r.containerState.size + 1)(s);
  }
  function a(s) {
    return r.containerState.furtherBlankLines || !ie(s) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(s)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(au, t, o)(s));
  }
  function o(s) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, ce(e, e.attempt(Ge, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s);
  }
}
function lu(e, t, n) {
  const r = this;
  return ce(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function cu(e) {
  e.exit(this.containerState.type);
}
function uu(e, t, n) {
  const r = this;
  return ce(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const o = r.events[r.events.length - 1];
    return !ie(a) && o && o[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const Ei = {
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
    return !r.parser.lazy[r.now().line] && (r.interrupt || p) ? (e.enter("setextHeadingLine"), i = c, o(c)) : n(c);
  }
  function o(c) {
    return e.enter("setextHeadingLineSequence"), s(c);
  }
  function s(c) {
    return c === i ? (e.consume(c), s) : (e.exit("setextHeadingLineSequence"), ie(c) ? ce(e, l, "lineSuffix")(c) : l(c));
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
    Ln,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, ce(e, e.attempt(this.parser.constructs.flow, i, e.attempt(wc, i)), "linePrefix"))
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
  resolveAll: Ra()
}, mu = Ia("string"), Cu = Ia("text");
function Ia(e) {
  return {
    resolveAll: Ra(e === "text" ? yu : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], a = n.attempt(i, o, s);
    return o;
    function o(u) {
      return c(u) ? a(u) : s(u);
    }
    function s(u) {
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
      let g = -1;
      if (p)
        for (; ++g < p.length; ) {
          const d = p[g];
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
function yu(e, t) {
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
const wu = {
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
  62: Ea
}, Su = {
  91: kc
}, Eu = {
  [-2]: Zn,
  [-1]: Zn,
  32: Zn
}, Tu = {
  35: Ac,
  42: _n,
  45: [Ei, _n],
  60: Oc,
  61: Ei,
  95: _n,
  96: wi,
  126: wi
}, _u = {
  38: _a,
  92: Ta
}, ku = {
  [-5]: Kn,
  [-4]: Kn,
  [-3]: Kn,
  33: Jc,
  38: _a,
  42: pr,
  60: [ec, Bc],
  91: eu,
  92: [Ic, Ta],
  93: vr,
  95: pr,
  96: pc
}, xu = {
  null: [pr, gu]
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
  let o = [], s = [];
  const l = {
    attempt: O(L),
    check: O(T),
    consume: _,
    enter: M,
    exit: P,
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
    sliceSerialize: g,
    sliceStream: d,
    write: p
  };
  let u = t.tokenize.call(c, l);
  return t.resolveAll && a.push(t), c;
  function p(N) {
    return o = Qe(o, N), A(), o[o.length - 1] !== null ? [] : (D(t, 0), c.events = br(a, c.events, c), c.events);
  }
  function g(N, b) {
    return Nu(d(N), b);
  }
  function d(N) {
    return Au(o, N);
  }
  function y() {
    const {
      _bufferIndex: N,
      _index: b,
      line: F,
      column: V,
      offset: U
    } = r;
    return {
      _bufferIndex: N,
      _index: b,
      line: F,
      column: V,
      offset: U
    };
  }
  function w(N) {
    i[N.line] = N.column, z();
  }
  function A() {
    let N;
    for (; r._index < o.length; ) {
      const b = o[r._index];
      if (typeof b == "string")
        for (N = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === N && r._bufferIndex < b.length; )
          E(b.charCodeAt(r._bufferIndex));
      else
        E(b);
    }
  }
  function E(N) {
    u = u(N);
  }
  function _(N) {
    K(N) ? (r.line++, r.column = 1, r.offset += N === -3 ? 2 : 1, z()) : N !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = N;
  }
  function M(N, b) {
    const F = b || {};
    return F.type = N, F.start = y(), c.events.push(["enter", F, c]), s.push(F), F;
  }
  function P(N) {
    const b = s.pop();
    return b.end = y(), c.events.push(["exit", b, c]), b;
  }
  function L(N, b) {
    D(N, b.from);
  }
  function T(N, b) {
    b.restore();
  }
  function O(N, b) {
    return F;
    function F(V, U, q) {
      let X, oe, Ne, f;
      return Array.isArray(V) ? (
        /* c8 ignore next 1 */
        ye(V)
      ) : "tokenize" in V ? (
        // Looks like a construct.
        ye([
          /** @type {Construct} */
          V
        ])
      ) : Q(V);
      function Q(se) {
        return ve;
        function ve(ue) {
          const Xe = ue !== null && se[ue], $e = ue !== null && se.null, st = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Xe) ? Xe : Xe ? [Xe] : [],
            ...Array.isArray($e) ? $e : $e ? [$e] : []
          ];
          return ye(st)(ue);
        }
      }
      function ye(se) {
        return X = se, oe = 0, se.length === 0 ? q : m(se[oe]);
      }
      function m(se) {
        return ve;
        function ve(ue) {
          return f = H(), Ne = se, se.partial || (c.currentConstruct = se), se.name && c.parser.constructs.disable.null.includes(se.name) ? re() : se.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            b ? Object.assign(Object.create(c), b) : c,
            l,
            Ee,
            re
          )(ue);
        }
      }
      function Ee(se) {
        return N(Ne, f), U;
      }
      function re(se) {
        return f.restore(), ++oe < X.length ? m(X[oe]) : q;
      }
    }
  }
  function D(N, b) {
    N.resolveAll && !a.includes(N) && a.push(N), N.resolve && gt(c.events, b, c.events.length - b, N.resolve(c.events.slice(b), c)), N.resolveTo && (c.events = N.resolveTo(c.events, c));
  }
  function H() {
    const N = y(), b = c.previous, F = c.currentConstruct, V = c.events.length, U = Array.from(s);
    return {
      from: V,
      restore: q
    };
    function q() {
      r = N, c.previous = b, c.currentConstruct = F, c.events.length = V, s = U, z();
    }
  }
  function z() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Au(e, t) {
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
function Nu(e, t) {
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
    return o;
    function o(s) {
      return Ru(r, a, s);
    }
  }
}
function Lu(e) {
  for (; !ka(e); )
    ;
  return e;
}
const Ti = /[\0\t\n\r]/g;
function Ou() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, o, s) {
    const l = [];
    let c, u, p, g, d;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(o || void 0).decode(a)), p = 0, t = "", n && (a.charCodeAt(0) === 65279 && p++, n = void 0); p < a.length; ) {
      if (Ti.lastIndex = p, c = Ti.exec(a), g = c && c.index !== void 0 ? c.index : a.length, d = a.charCodeAt(g), !c) {
        t = a.slice(p);
        break;
      }
      if (d === 10 && p === g && r)
        l.push(-3), r = void 0;
      else
        switch (r && (l.push(-5), r = void 0), p < g && (l.push(a.slice(p, g)), e += g - p), d) {
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
      p = g + 1;
    }
    return s && (r && l.push(-5), t && l.push(t), l.push(null)), l;
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
    return Sa(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return xr(n) || e;
}
const Aa = {}.hasOwnProperty;
function Fu(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Uu(n)(Lu(Mu(n).document().write(Ou()(e, t, !0))));
}
function Uu(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(lt),
      autolinkProtocol: H,
      autolinkEmail: H,
      atxHeading: a(Ze),
      blockQuote: a($e),
      characterEscape: H,
      characterReference: H,
      codeFenced: a(st),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: a(st, o),
      codeText: a(At, o),
      codeTextData: H,
      data: H,
      codeFlowValue: H,
      definition: a(nt),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: a(mt),
      hardBreakEscape: a(Tt),
      hardBreakTrailing: a(Tt),
      htmlFlow: a(_t, o),
      htmlFlowData: H,
      htmlText: a(_t, o),
      htmlTextData: H,
      image: a(rt),
      label: o,
      link: a(lt),
      listItem: a(kt),
      listItemValue: g,
      listOrdered: a(ct, p),
      listUnordered: a(ct),
      paragraph: a(ut),
      reference: m,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: a(Ze),
      strong: a(Nt),
      thematicBreak: a(Ct)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: L,
      autolink: l(),
      autolinkEmail: Xe,
      autolinkProtocol: ue,
      blockQuote: l(),
      characterEscapeValue: z,
      characterReferenceMarkerHexadecimal: re,
      characterReferenceMarkerNumeric: re,
      characterReferenceValue: se,
      characterReference: ve,
      codeFenced: l(A),
      codeFencedFence: w,
      codeFencedFenceInfo: d,
      codeFencedFenceMeta: y,
      codeFlowValue: z,
      codeIndented: l(E),
      codeText: l(U),
      codeTextData: z,
      data: z,
      definition: l(),
      definitionDestinationString: P,
      definitionLabelString: _,
      definitionTitleString: M,
      emphasis: l(),
      hardBreakEscape: l(b),
      hardBreakTrailing: l(b),
      htmlFlow: l(F),
      htmlFlowData: z,
      htmlText: l(V),
      htmlTextData: z,
      image: l(X),
      label: Ne,
      labelText: oe,
      lineEnding: N,
      link: l(q),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: Ee,
      resourceDestinationString: f,
      resourceTitleString: Q,
      resource: ye,
      setextHeading: l(D),
      setextHeadingLineSequence: O,
      setextHeadingText: T,
      strong: l(),
      thematicBreak: l()
    }
  };
  Na(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(S) {
    let I = {
      type: "root",
      children: []
    };
    const j = {
      stack: [I],
      tokenStack: [],
      config: t,
      enter: s,
      exit: c,
      buffer: o,
      resume: u,
      data: n
    }, J = [];
    let ne = -1;
    for (; ++ne < S.length; )
      if (S[ne][1].type === "listOrdered" || S[ne][1].type === "listUnordered")
        if (S[ne][0] === "enter")
          J.push(ne);
        else {
          const Te = J.pop();
          ne = i(S, Te, ne);
        }
    for (ne = -1; ++ne < S.length; ) {
      const Te = t[S[ne][0]];
      Aa.call(Te, S[ne][1].type) && Te[S[ne][1].type].call(Object.assign({
        sliceSerialize: S[ne][2].sliceSerialize
      }, j), S[ne][1]);
    }
    if (j.tokenStack.length > 0) {
      const Te = j.tokenStack[j.tokenStack.length - 1];
      (Te[1] || _i).call(j, void 0, Te[0]);
    }
    for (I.position = {
      start: bt(S.length > 0 ? S[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: bt(S.length > 0 ? S[S.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, ne = -1; ++ne < t.transforms.length; )
      I = t.transforms[ne](I) || I;
    return I;
  }
  function i(S, I, j) {
    let J = I - 1, ne = -1, Te = !1, Ie, we, Be, _e;
    for (; ++J <= j; ) {
      const de = S[J];
      switch (de[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          de[0] === "enter" ? ne++ : ne--, _e = void 0;
          break;
        }
        case "lineEndingBlank": {
          de[0] === "enter" && (Ie && !_e && !ne && !Be && (Be = J), _e = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          _e = void 0;
      }
      if (!ne && de[0] === "enter" && de[1].type === "listItemPrefix" || ne === -1 && de[0] === "exit" && (de[1].type === "listUnordered" || de[1].type === "listOrdered")) {
        if (Ie) {
          let Ye = J;
          for (we = void 0; Ye--; ) {
            const Me = S[Ye];
            if (Me[1].type === "lineEnding" || Me[1].type === "lineEndingBlank") {
              if (Me[0] === "exit") continue;
              we && (S[we][1].type = "lineEndingBlank", Te = !0), Me[1].type = "lineEnding", we = Ye;
            } else if (!(Me[1].type === "linePrefix" || Me[1].type === "blockQuotePrefix" || Me[1].type === "blockQuotePrefixWhitespace" || Me[1].type === "blockQuoteMarker" || Me[1].type === "listItemIndent")) break;
          }
          Be && (!we || Be < we) && (Ie._spread = !0), Ie.end = Object.assign({}, we ? S[we][1].start : de[1].end), S.splice(we || J, 0, ["exit", Ie, de[2]]), J++, j++;
        }
        if (de[1].type === "listItemPrefix") {
          const Ye = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, de[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ie = Ye, S.splice(J, 0, ["enter", Ye, de[2]]), J++, j++, Be = void 0, _e = !0;
        }
      }
    }
    return S[I][1]._spread = Te, j;
  }
  function a(S, I) {
    return j;
    function j(J) {
      s.call(this, S(J), J), I && I.call(this, J);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function s(S, I, j) {
    this.stack[this.stack.length - 1].children.push(S), this.stack.push(S), this.tokenStack.push([I, j || void 0]), S.position = {
      start: bt(I.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function l(S) {
    return I;
    function I(j) {
      S && S.call(this, j), c.call(this, j);
    }
  }
  function c(S, I) {
    const j = this.stack.pop(), J = this.tokenStack.pop();
    if (J)
      J[0].type !== S.type && (I ? I.call(this, S, J[0]) : (J[1] || _i).call(this, S, J[0]));
    else throw new Error("Cannot close `" + S.type + "` (" + en({
      start: S.start,
      end: S.end
    }) + "): it’s not open");
    j.position.end = bt(S.end);
  }
  function u() {
    return Hl(this.stack.pop());
  }
  function p() {
    this.data.expectingFirstListItemValue = !0;
  }
  function g(S) {
    if (this.data.expectingFirstListItemValue) {
      const I = this.stack[this.stack.length - 2];
      I.start = Number.parseInt(this.sliceSerialize(S), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function d() {
    const S = this.resume(), I = this.stack[this.stack.length - 1];
    I.lang = S;
  }
  function y() {
    const S = this.resume(), I = this.stack[this.stack.length - 1];
    I.meta = S;
  }
  function w() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function A() {
    const S = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = S.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function E() {
    const S = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = S.replace(/(\r?\n|\r)$/g, "");
  }
  function _(S) {
    const I = this.resume(), j = this.stack[this.stack.length - 1];
    j.label = I, j.identifier = Gt(this.sliceSerialize(S)).toLowerCase();
  }
  function M() {
    const S = this.resume(), I = this.stack[this.stack.length - 1];
    I.title = S;
  }
  function P() {
    const S = this.resume(), I = this.stack[this.stack.length - 1];
    I.url = S;
  }
  function L(S) {
    const I = this.stack[this.stack.length - 1];
    if (!I.depth) {
      const j = this.sliceSerialize(S).length;
      I.depth = j;
    }
  }
  function T() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function O(S) {
    const I = this.stack[this.stack.length - 1];
    I.depth = this.sliceSerialize(S).codePointAt(0) === 61 ? 1 : 2;
  }
  function D() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function H(S) {
    const j = this.stack[this.stack.length - 1].children;
    let J = j[j.length - 1];
    (!J || J.type !== "text") && (J = Mt(), J.position = {
      start: bt(S.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, j.push(J)), this.stack.push(J);
  }
  function z(S) {
    const I = this.stack.pop();
    I.value += this.sliceSerialize(S), I.position.end = bt(S.end);
  }
  function N(S) {
    const I = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const j = I.children[I.children.length - 1];
      j.position.end = bt(S.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(I.type) && (H.call(this, S), z.call(this, S));
  }
  function b() {
    this.data.atHardBreak = !0;
  }
  function F() {
    const S = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = S;
  }
  function V() {
    const S = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = S;
  }
  function U() {
    const S = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = S;
  }
  function q() {
    const S = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const I = this.data.referenceType || "shortcut";
      S.type += "Reference", S.referenceType = I, delete S.url, delete S.title;
    } else
      delete S.identifier, delete S.label;
    this.data.referenceType = void 0;
  }
  function X() {
    const S = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const I = this.data.referenceType || "shortcut";
      S.type += "Reference", S.referenceType = I, delete S.url, delete S.title;
    } else
      delete S.identifier, delete S.label;
    this.data.referenceType = void 0;
  }
  function oe(S) {
    const I = this.sliceSerialize(S), j = this.stack[this.stack.length - 2];
    j.label = Pu(I), j.identifier = Gt(I).toLowerCase();
  }
  function Ne() {
    const S = this.stack[this.stack.length - 1], I = this.resume(), j = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, j.type === "link") {
      const J = S.children;
      j.children = J;
    } else
      j.alt = I;
  }
  function f() {
    const S = this.resume(), I = this.stack[this.stack.length - 1];
    I.url = S;
  }
  function Q() {
    const S = this.resume(), I = this.stack[this.stack.length - 1];
    I.title = S;
  }
  function ye() {
    this.data.inReference = void 0;
  }
  function m() {
    this.data.referenceType = "collapsed";
  }
  function Ee(S) {
    const I = this.resume(), j = this.stack[this.stack.length - 1];
    j.label = I, j.identifier = Gt(this.sliceSerialize(S)).toLowerCase(), this.data.referenceType = "full";
  }
  function re(S) {
    this.data.characterReferenceType = S.type;
  }
  function se(S) {
    const I = this.sliceSerialize(S), j = this.data.characterReferenceType;
    let J;
    j ? (J = Sa(I, j === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : J = xr(I);
    const ne = this.stack[this.stack.length - 1];
    ne.value += J;
  }
  function ve(S) {
    const I = this.stack.pop();
    I.position.end = bt(S.end);
  }
  function ue(S) {
    z.call(this, S);
    const I = this.stack[this.stack.length - 1];
    I.url = this.sliceSerialize(S);
  }
  function Xe(S) {
    z.call(this, S);
    const I = this.stack[this.stack.length - 1];
    I.url = "mailto:" + this.sliceSerialize(S);
  }
  function $e() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function st() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function At() {
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
  function Tt() {
    return {
      type: "break"
    };
  }
  function _t() {
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
  function lt() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function ct(S) {
    return {
      type: "list",
      ordered: S.type === "listOrdered",
      start: null,
      spread: S._spread,
      children: []
    };
  }
  function kt(S) {
    return {
      type: "listItem",
      spread: S._spread,
      checked: null,
      children: []
    };
  }
  function ut() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Nt() {
    return {
      type: "strong",
      children: []
    };
  }
  function Mt() {
    return {
      type: "text",
      value: ""
    };
  }
  function Ct() {
    return {
      type: "thematicBreak"
    };
  }
}
function bt(e) {
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
    Array.isArray(r) ? Na(e, r) : zu(e, r);
  }
}
function zu(e, t) {
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
  throw e ? new Error("Cannot close `" + e.type + "` (" + en({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + en({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + en({
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
function Wu(e, t) {
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
function Xu(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Ma(e, t);
  const i = { src: jt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function Yu(e, t) {
  const n = { src: jt(t.url) };
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
function e1(e, t) {
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
function t1(e, t, n) {
  const r = e.all(t), i = n ? n1(n) : La(t), a = {}, o = [];
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
  let s = -1;
  for (; ++s < r.length; ) {
    const u = r[s];
    (i || s !== 0 || u.type !== "element" || u.tagName !== "p") && o.push({ type: "text", value: `
` }), u.type === "element" && u.tagName === "p" && !i ? o.push(...u.children) : o.push(u);
  }
  const l = r[r.length - 1];
  l && (i || l.type !== "element" || l.tagName !== "p") && o.push({ type: "text", value: `
` });
  const c = { type: "element", tagName: "li", properties: a, children: o };
  return e.patch(t, c), e.applyData(t, c);
}
function n1(e) {
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
function r1(e, t) {
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
function o1(e, t) {
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
    }, s = Er(t.children[1]), l = pa(t.children[t.children.length - 1]);
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
function l1(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, s = o ? o.length : t.children.length;
  let l = -1;
  const c = [];
  for (; ++l < s; ) {
    const p = t.children[l], g = {}, d = o ? o[l] : void 0;
    d && (g.align = d);
    let y = { type: "element", tagName: a, properties: g, children: [] };
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
const ki = 9, xi = 32;
function u1(e) {
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
  blockquote: Wu,
  break: Gu,
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
  strong: o1,
  table: s1,
  tableCell: c1,
  tableRow: l1,
  text: h1,
  thematicBreak: d1,
  toml: yn,
  yaml: yn,
  definition: yn,
  footnoteDefinition: yn
};
function yn() {
}
const Oa = -1, On = 0, nn = 1, Rn = 2, Ir = 3, Rr = 4, Ar = 5, Nr = 6, Da = 7, Pa = 8, vi = typeof self == "object" ? self : globalThis, f1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, o] = t[i];
    switch (a) {
      case On:
      case Oa:
        return n(o, i);
      case nn: {
        const s = n([], i);
        for (const l of o)
          s.push(r(l));
        return s;
      }
      case Rn: {
        const s = n({}, i);
        for (const [l, c] of o)
          s[r(l)] = r(c);
        return s;
      }
      case Ir:
        return n(new Date(o), i);
      case Rr: {
        const { source: s, flags: l } = o;
        return n(new RegExp(s, l), i);
      }
      case Ar: {
        const s = n(/* @__PURE__ */ new Map(), i);
        for (const [l, c] of o)
          s.set(r(l), r(c));
        return s;
      }
      case Nr: {
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
}, Ii = (e) => f1(/* @__PURE__ */ new Map(), e)(0), zt = "", { toString: g1 } = {}, { keys: m1 } = Object, Qt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [On, t];
  const n = g1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [nn, zt];
    case "Object":
      return [Rn, zt];
    case "Date":
      return [Ir, zt];
    case "RegExp":
      return [Rr, zt];
    case "Map":
      return [Ar, zt];
    case "Set":
      return [Nr, zt];
    case "DataView":
      return [nn, n];
  }
  return n.includes("Array") ? [nn, n] : n.includes("Error") ? [Da, n] : [Rn, n];
}, wn = ([e, t]) => e === On && (t === "function" || t === "symbol"), C1 = (e, t, n, r) => {
  const i = (o, s) => {
    const l = r.push(o) - 1;
    return n.set(s, l), l;
  }, a = (o) => {
    if (n.has(o))
      return n.get(o);
    let [s, l] = Qt(o);
    switch (s) {
      case On: {
        let u = o;
        switch (l) {
          case "bigint":
            s = Pa, u = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + l);
            u = null;
            break;
          case "undefined":
            return i([Oa], o);
        }
        return i([s, u], o);
      }
      case nn: {
        if (l) {
          let g = o;
          return l === "DataView" ? g = new Uint8Array(o.buffer) : l === "ArrayBuffer" && (g = new Uint8Array(o)), i([l, [...g]], o);
        }
        const u = [], p = i([s, u], o);
        for (const g of o)
          u.push(a(g));
        return p;
      }
      case Rn: {
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
        const u = [], p = i([s, u], o);
        for (const g of m1(o))
          (e || !wn(Qt(o[g]))) && u.push([a(g), a(o[g])]);
        return p;
      }
      case Ir:
        return i([s, o.toISOString()], o);
      case Rr: {
        const { source: u, flags: p } = o;
        return i([s, { source: u, flags: p }], o);
      }
      case Ar: {
        const u = [], p = i([s, u], o);
        for (const [g, d] of o)
          (e || !(wn(Qt(g)) || wn(Qt(d)))) && u.push([a(g), a(d)]);
        return p;
      }
      case Nr: {
        const u = [], p = i([s, u], o);
        for (const g of o)
          (e || !wn(Qt(g))) && u.push(a(g));
        return p;
      }
    }
    const { message: c } = o;
    return i([s, { name: l, message: c }], o);
  };
  return a;
}, Ri = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return C1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, An = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Ii(Ri(e, t)) : structuredClone(e)
) : (e, t) => Ii(Ri(e, t));
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
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || y1, r = e.options.footnoteBackLabel || w1, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, s = [];
  let l = -1;
  for (; ++l < e.footnoteOrder.length; ) {
    const c = e.footnoteById.get(
      e.footnoteOrder[l]
    );
    if (!c)
      continue;
    const u = e.all(c), p = String(c.identifier).toUpperCase(), g = jt(p.toLowerCase());
    let d = 0;
    const y = [], w = e.footnoteCounts.get(p);
    for (; w !== void 0 && ++d <= w; ) {
      y.length > 0 && y.push({ type: "text", value: " " });
      let _ = typeof n == "string" ? n : n(l, d);
      typeof _ == "string" && (_ = { type: "text", value: _ }), y.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + g + (d > 1 ? "-" + d : ""),
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
      _ && _.type === "text" ? _.value += " " : A.children.push({ type: "text", value: " " }), A.children.push(...y);
    } else
      u.push(...y);
    const E = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + g },
      children: e.wrap(u, !0)
    };
    e.patch(c, E), s.push(E);
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
            ...An(o),
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
      return k1;
    if (typeof e == "function")
      return Dn(e);
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
    t[n] = Ha(e[n]);
  return Dn(r);
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
  return Dn(n);
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
  return Dn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Dn(e) {
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
const Fa = [], b1 = !0, Ai = !1, v1 = "skip";
function I1(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = Ha(i), o = r ? -1 : 1;
  s(e, void 0, [])();
  function s(l, c, u) {
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
      Object.defineProperty(g, "name", {
        value: "node (" + (l.type + (d ? "<" + d + ">" : "")) + ")"
      });
    }
    return g;
    function g() {
      let d = Fa, y, w, A;
      if ((!t || a(l, c, u[u.length - 1] || void 0)) && (d = R1(n(l, u)), d[0] === Ai))
        return d;
      if ("children" in l && l.children) {
        const E = (
          /** @type {UnistParent} */
          l
        );
        if (E.children && d[0] !== v1)
          for (w = (r ? E.children.length : -1) + o, A = u.concat(E); w > -1 && w < E.children.length; ) {
            const _ = E.children[w];
            if (y = s(_, w, A)(), y[0] === Ai)
              return y;
            w = typeof y[1] == "number" ? y[1] : w + o;
          }
      }
      return d;
    }
  }
}
function R1(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [b1, e] : e == null ? Fa : [e];
}
function Ua(e, t, n, r) {
  let i, a, o;
  typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), I1(e, a, s, i);
  function s(l, c) {
    const u = c[c.length - 1], p = u ? u.children.indexOf(l) : void 0;
    return o(l, p, u);
  }
}
const fr = {}.hasOwnProperty, A1 = {};
function N1(e, t) {
  const n = t || A1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = { ...p1, ...n.handlers }, s = {
    all: c,
    applyData: L1,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: o,
    one: l,
    options: n,
    patch: M1,
    wrap: D1
  };
  return Ua(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const p = u.type === "definition" ? r : i, g = String(u.identifier).toUpperCase();
      p.has(g) || p.set(g, u);
    }
  }), s;
  function l(u, p) {
    const g = u.type, d = s.handlers[g];
    if (fr.call(s.handlers, g) && d)
      return d(s, u, p);
    if (s.options.passThrough && s.options.passThrough.includes(g)) {
      if ("children" in u) {
        const { children: w, ...A } = u, E = An(A);
        return E.children = s.all(u), E;
      }
      return An(u);
    }
    return (s.options.unknownHandler || O1)(s, u, p);
  }
  function c(u) {
    const p = [];
    if ("children" in u) {
      const g = u.children;
      let d = -1;
      for (; ++d < g.length; ) {
        const y = s.one(g[d], u);
        if (y) {
          if (d && g[d - 1].type === "break" && (!Array.isArray(y) && y.type === "text" && (y.value = Ni(y.value)), !Array.isArray(y) && y.type === "element")) {
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
        const o = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: o };
      }
    n.type === "element" && a && Object.assign(n.properties, An(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function O1(e, t) {
  const n = t.data || {}, r = "value" in t && !(fr.call(n, "hProperties") || fr.call(n, "hChildren")) ? { type: "text", value: t.value } : {
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
function Ni(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function Mi(e, t) {
  const n = N1(e, t), r = n.one(e, void 0), i = S1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function P1(e, t) {
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
var kn = Object.prototype.hasOwnProperty, za = Object.prototype.toString, Oi = Object.defineProperty, Di = Object.getOwnPropertyDescriptor, Pi = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : za.call(t) === "[object Array]";
}, Hi = function(t) {
  if (!t || za.call(t) !== "[object Object]")
    return !1;
  var n = kn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && kn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || kn.call(t, i);
}, Fi = function(t, n) {
  Oi && n.name === "__proto__" ? Oi(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, Ui = function(t, n) {
  if (n === "__proto__")
    if (kn.call(t, n)) {
      if (Di)
        return Di(t, n).value;
    } else return;
  return t[n];
}, H1 = function e() {
  var t, n, r, i, a, o, s = arguments[0], l = 1, c = arguments.length, u = !1;
  for (typeof s == "boolean" && (u = s, s = arguments[1] || {}, l = 2), (s == null || typeof s != "object" && typeof s != "function") && (s = {}); l < c; ++l)
    if (t = arguments[l], t != null)
      for (n in t)
        r = Ui(s, n), i = Ui(t, n), s !== i && (u && i && (Hi(i) || (a = Pi(i))) ? (a ? (a = !1, o = r && Pi(r) ? r : []) : o = r && Hi(r) ? r : {}, Fi(s, { name: n, newValue: e(u, o, i) })) : typeof i < "u" && Fi(s, { name: n, newValue: i }));
  return s;
};
const qn = /* @__PURE__ */ da(H1);
function gr(e) {
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
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    s(null, ...i);
    function s(l, ...c) {
      const u = e[++a];
      let p = -1;
      if (l) {
        o(l);
        return;
      }
      for (; ++p < i.length; )
        (c[p] === null || c[p] === void 0) && (c[p] = i[p]);
      i = c, u ? U1(u, s)(...c) : o(null, ...c);
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
  function r(...o) {
    const s = e.length > o.length;
    let l;
    s && o.push(i);
    try {
      l = e.apply(this, o);
    } catch (c) {
      const u = (
        /** @type {Error} */
        c
      );
      if (s && n)
        throw u;
      return i(u);
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
const ht = { basename: z1, dirname: B1, extname: W1, join: G1, sep: "/" };
function z1(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  sn(e);
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
function B1(e) {
  if (sn(e), e.length === 0)
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
function W1(e) {
  sn(e);
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
function G1(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    sn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : V1(n);
}
function V1(e) {
  sn(e);
  const t = e.codePointAt(0) === 47;
  let n = j1(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function j1(e, t) {
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
function sn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const $1 = { cwd: Z1 };
function Z1() {
  return "/";
}
function mr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function K1(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!mr(e)) {
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
const Xn = (
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
    t ? mr(t) ? n = { path: t } : typeof t == "string" || X1(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : $1.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Xn.length; ) {
      const a = Xn[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      Xn.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? ht.basename(this.path) : void 0;
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
    Jn(t, "basename"), Yn(t, "basename"), this.path = ht.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? ht.dirname(this.path) : void 0;
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
    zi(this.basename, "dirname"), this.path = ht.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? ht.extname(this.path) : void 0;
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
    if (Yn(t, "extname"), zi(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ht.join(this.dirname, this.stem + (t || ""));
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
    mr(t) && (t = K1(t)), Jn(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? ht.basename(this.path, this.extname) : void 0;
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
    Jn(t, "stem"), Yn(t, "stem"), this.path = ht.join(this.dirname || "", t + (this.extname || ""));
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
function Yn(e, t) {
  if (e && e.includes(ht.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ht.sep + "`"
    );
}
function Jn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function zi(e, t) {
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
class Mr extends Y1 {
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
      new Mr()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(qn(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (tr("data", this.frozen), this.namespace[t] = n, this) : J1.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (tr("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = Sn(t), r = this.parser || this.Parser;
    return Qn("parse", r), r(String(n), n);
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
    return this.freeze(), Qn("process", this.parser || this.Parser), er("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, o) {
      const s = Sn(t), l = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(s)
      );
      r.run(l, s, function(u, p, g) {
        if (u || !p || !g)
          return c(u);
        const d = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          p
        ), y = r.stringify(d, g);
        th(y) ? g.value = y : g.result = y, c(
          u,
          /** @type {VFileWithOutput<CompileResult>} */
          g
        );
      });
      function c(u, p) {
        u || !p ? o(u) : a ? a(p) : n(void 0, p);
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
    return this.freeze(), Qn("processSync", this.parser || this.Parser), er("processSync", this.compiler || this.Compiler), this.process(t, i), Wi("processSync", "process", n), r;
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
      const l = Sn(n);
      i.run(t, l, c);
      function c(u, p, g) {
        const d = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          p || t
        );
        u ? s(u) : o ? o(d) : r(void 0, d, g);
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
    const r = Sn(n), i = this.compiler || this.Compiler;
    return er("stringify", i), Bi(t), i(t, r);
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
    if (tr("use", this.frozen), t != null) if (typeof t == "function")
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
          const [u, ...p] = (
            /** @type {PluginTuple<Array<unknown>>} */
            c
          );
          l(u, p);
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
      s(c.plugins), c.settings && (i.settings = qn(!0, i.settings, c.settings));
    }
    function s(c) {
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
      let p = -1, g = -1;
      for (; ++p < r.length; )
        if (r[p][0] === c) {
          g = p;
          break;
        }
      if (g === -1)
        r.push([c, ...u]);
      else if (u.length > 0) {
        let [d, ...y] = u;
        const w = r[g][1];
        gr(w) && gr(d) && (d = qn(!0, w, d)), r[g] = [c, d, ...y];
      }
    }
  }
}
const Q1 = new Mr().freeze();
function Qn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function er(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function tr(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Bi(e) {
  if (!gr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Wi(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function Sn(e) {
  return eh(e) ? e : new Ba(e);
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
const rh = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Gi = [], Vi = { allowDangerousHtml: !0 }, ih = /^(https?|ircs?|mailto|xmpp)$/i, ah = [
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
  const t = oh(e), n = sh(e);
  return lh(t.runSync(t.parse(n), n), e);
}
function oh(e) {
  const t = e.rehypePlugins || Gi, n = e.remarkPlugins || Gi, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Vi } : Vi;
  return Q1().use(Bu).use(n).use(P1, r).use(t);
}
function sh(e) {
  const t = e.children || "", n = new Ba();
  return typeof t == "string" && (n.value = t), n;
}
function lh(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, s = t.unwrapDisallowed, l = t.urlTransform || ch;
  for (const u of ah)
    Object.hasOwn(t, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + rh + u.id, void 0);
  return Ua(e, c), Sl(e, {
    Fragment: Ht,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: h,
    jsxs: k,
    passKeys: !0,
    passNode: !0
  });
  function c(u, p, g) {
    if (u.type === "raw" && g && typeof p == "number")
      return o ? g.children.splice(p, 1) : g.children[p] = { type: "text", value: u.value }, p;
    if (u.type === "element") {
      let d;
      for (d in $n)
        if (Object.hasOwn($n, d) && Object.hasOwn(u.properties, d)) {
          const y = u.properties[d], w = $n[d];
          (w === null || w.includes(u.tagName)) && (u.properties[d] = l(String(y || ""), d, u));
        }
    }
    if (u.type === "element") {
      let d = n ? !n.includes(u.tagName) : a ? a.includes(u.tagName) : !1;
      if (!d && r && typeof p == "number" && (d = !r(u, p, g)), d && g && typeof p == "number")
        return s && u.children ? g.children.splice(p, 1, ...u.children) : g.children.splice(p, 1), p;
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
  dt.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const o = () => {
    t || r(!n);
  }, s = dt.Children.map(e, (l) => {
    if (dt.isValidElement(l)) {
      if (l.type === Wa)
        return dt.cloneElement(
          l,
          {
            onToggle: o,
            isExpanded: n
          }
        );
      if (l.type === Ga)
        return dt.cloneElement(
          l,
          {
            isVisible: n
          }
        );
    }
    return l;
  });
  return /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning", children: s });
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
  ), o = t === "completed" || e.includes(Z.UI_TEXT.THINKING) || e.includes(Z.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ k(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${o ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: o ? r : void 0,
      style: { cursor: o ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ k("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ h("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        o && /* @__PURE__ */ h(
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
  let o;
  if (r != null && r.startsWith("lat_")) {
    const u = (l = n == null ? void 0 : n.parameters) == null ? void 0 : l.query, p = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.url;
    o = u || p || "Executing tool...";
  } else
    o = a();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
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
          /* @__PURE__ */ h("span", { children: o }),
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
          /* @__PURE__ */ h("span", { children: o }),
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
function Va({ size: e = 16, variant: t = "dots" }) {
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
}, ja = eo(null);
function fh({ children: e, value: t }) {
  return /* @__PURE__ */ h(ja.Provider, { value: t, children: e });
}
function ln() {
  const e = to(ja);
  if (!e)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return e;
}
const $a = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ h("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code-block", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ h("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ h("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ h("li", { className: "chat-wrapper__list-item", ...t, children: e })
}, gh = {
  ...$a,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code", ...n, children: e })
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
    } = ln(), [u, p] = ae(!1), [g, d] = ae(!1), y = te(async () => {
      try {
        await navigator.clipboard.writeText(e.content), p(!0), setTimeout(() => p(!1), 2e3);
      } catch (H) {
        console.error("Failed to copy message:", H);
      }
    }, [e.content]), w = te(() => {
      c && c(e.id);
    }, [c, e.id]), A = () => /* @__PURE__ */ k("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ h(Va, { size: 16, variant: "dots" }),
      /* @__PURE__ */ h("span", { children: Z.UI_TEXT.THINKING })
    ] }), E = () => /* @__PURE__ */ k("div", { className: "chat-wrapper__error-message chat-wrapper__error-message--retrying", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "🔄" }),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-content", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__error-text chat-wrapper__error-text--retrying", children: "Retrying message..." }) })
    ] }), _ = () => /* @__PURE__ */ k("div", { className: "chat-wrapper__error-message", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ k("div", { className: "chat-wrapper__error-content", children: [
        /* @__PURE__ */ h("div", { className: "chat-wrapper__error-text", children: e.errorMessage || "Failed to send message. Server may be down." }),
        c && /* @__PURE__ */ h(
          "button",
          {
            className: "chat-wrapper__retry-button",
            onClick: w,
            children: "🔄 Retry"
          }
        )
      ] })
    ] }), M = () => /* @__PURE__ */ k(Ht, { children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ h(
        "button",
        {
          className: `chat-wrapper__copy-button ${g ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: y,
          title: "Copy message",
          children: /* @__PURE__ */ h(Ts, {})
        }
      ) }),
      u && /* @__PURE__ */ h("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), P = () => /* @__PURE__ */ h("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(ji, { components: $a, children: e.content }) }),
      M()
    ] }) }), L = () => /* @__PURE__ */ k("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(ji, { components: gh, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ h("div", { className: "chat-wrapper__media", children: e.media.map((H, z) => /* @__PURE__ */ h(
        "img",
        {
          src: H,
          alt: `Uploaded content ${z + 1}`,
          className: "chat-wrapper__media-image"
        },
        z
      )) }),
      e.isRetrying && E(),
      e.hasError && !e.isRetrying && _()
    ] }), T = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === l.current ? A() : e.role === "system" ? /* @__PURE__ */ h(ph, { message: e }) : e.role === "assistant" ? P() : L(), O = () => /* @__PURE__ */ k(uh, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ h(
        Wa,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ h(Ga, { children: i(e.content) })
    ] }), D = () => {
      var H;
      return /* @__PURE__ */ h(hh, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ h(
        dh,
        {
          title: a(e.content, e.isStreaming),
          status: o(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (H = e.toolData) == null ? void 0 : H.toolName,
          clientTools: s
        }
      ) });
    };
    return /* @__PURE__ */ h(
      "div",
      {
        className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
        onMouseEnter: () => e.role === "assistant" && d(!0),
        onMouseLeave: () => e.role === "assistant" && d(!1),
        children: e.role === "reasoning" ? O() : e.role === "tooling" ? D() : /* @__PURE__ */ h("div", { className: "chat-wrapper__message-content", children: T() })
      }
    );
  }
);
Za.displayName = "MessageItem";
const mh = ({ isVisible: e }) => e ? /* @__PURE__ */ h("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ h("span", {}),
  /* @__PURE__ */ h("span", {}),
  /* @__PURE__ */ h("span", {})
] }) }) }) }) : null, Ka = Nn((e, t) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = ln();
  return /* @__PURE__ */ k("div", { className: "chat-wrapper__messages", children: [
    n.map((a) => /* @__PURE__ */ h(
      Za,
      {
        message: a
      },
      a.id
    )),
    /* @__PURE__ */ h(mh, { isVisible: r && !i }),
    /* @__PURE__ */ h("div", { ref: t })
  ] });
});
Ka.displayName = "MessagesList";
const ot = (...e) => e.filter(Boolean).join(" "), Ch = () => /* @__PURE__ */ k(
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
), yh = ({ className: e, ...t }) => /* @__PURE__ */ h("form", { className: ot("chat-wrapper__prompt-input", e), ...t }), qa = Nn(
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
        ref: s,
        className: ot("chat-wrapper__prompt-textarea", t),
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
const wh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: ot("chat-wrapper__prompt-toolbar", e), ...t }), Sh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: ot("chat-wrapper__prompt-tools", e), ...t }), Eh = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || dt.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ h(
    "button",
    {
      className: ot(
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
  status: r = et.IDLE,
  children: i,
  disabled: a,
  ...o
}) => {
  let s = /* @__PURE__ */ h(Ch, {});
  return /* @__PURE__ */ h(
    "button",
    {
      className: ot(
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
}, jh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ h("select", { className: ot("chat-wrapper__prompt-select", e), ...n, children: t }), $h = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ h(
  "button",
  {
    className: ot("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), Zh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h(
  "div",
  {
    className: ot("chat-wrapper__prompt-select-content", e),
    ...t
  }
), Kh = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ h(
  "div",
  {
    className: ot("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), qh = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ h(
  "span",
  {
    className: ot("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), _h = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = ae(0), [a, o] = ae(!1), [s, l] = ae(0);
  return xe(() => {
    if (!t || e.length <= 1) return;
    const c = setInterval(() => {
      o(!0), setTimeout(() => {
        i((u) => (u + 1) % e.length), l((u) => u + 1), o(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(c);
  }, [t, e.length]), xe(() => {
    t || (i(0), o(!1), l(0));
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
        s
      )
    }
  );
}, kh = Nn((e, t) => {
  const {
    placeholderTexts: n,
    isStreaming: r,
    isLoadingConversation: i,
    chatStatus: a,
    fileUploadEnabled: o,
    chipName: s,
    chipLogo: l,
    messages: c,
    onSubmit: u,
    onFileUpload: p,
    onStopGeneration: g
  } = ln(), d = c.length > 0, [y, w] = ae(""), [A, E] = ae([]), _ = Ae(null), M = n && n.length > 0 ? n : ["What would you like to know?"], P = y.length === 0 && !d && M.length > 1;
  Zi(t, () => ({
    focus: () => {
      var D;
      (D = _.current) == null || D.focus();
    },
    setText: (D) => {
      w(D), setTimeout(() => {
        if (_.current) {
          _.current.focus();
          const H = D.length;
          _.current.setSelectionRange(H, H);
        }
      }, 0);
    }
  }));
  const L = te(
    (D) => {
      D.preventDefault();
      const z = new FormData(D.currentTarget).get("message");
      if (z != null && z.trim()) {
        const N = vn(z.trim(), !1);
        if (!N.trim()) {
          console.warn("Message was blocked due to security concerns");
          return;
        }
        u(N, A), w(""), E([]);
      }
    },
    [u, A]
  ), T = te(
    (D) => {
      const z = D.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      w(z);
    },
    []
  ), O = te(async () => {
    const D = document.createElement("input");
    D.type = "file", D.accept = "image/*", D.multiple = !1, D.onchange = async (H) => {
      const z = H.target.files;
      if (z) {
        const N = Array.from(z).filter((b) => {
          const F = ns(b.name);
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
          E(b);
        }
      }
    }, D.click();
  }, [p]);
  return /* @__PURE__ */ k(
    yh,
    {
      onSubmit: L,
      style: { position: "relative" },
      className: r || i ? "chat-wrapper__prompt-input--disabled" : "",
      children: [
        /* @__PURE__ */ h(
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
        !y.trim() && /* @__PURE__ */ h(
          _h,
          {
            placeholderTexts: M,
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
              const z = D.startsWith("data:image/"), N = D.startsWith("http://") || D.startsWith("https://"), b = z || N;
              return /* @__PURE__ */ k(
                "div",
                {
                  style: {
                    position: "relative",
                    display: "inline-block"
                  },
                  children: [
                    b ? /* @__PURE__ */ k(
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
                                  const F = D.match(/name=([^;]+)/);
                                  return F ? decodeURIComponent(F[1]) : "document.pdf";
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
                                  const F = D.match(/data:([^;]+)/);
                                  if (F) {
                                    const V = F[1];
                                    switch (V) {
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
                                        const U = V.split("/")[1];
                                        return U ? U.toUpperCase().substring(0, 4) : "FILE";
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
                          E(
                            (F) => F.filter((V, U) => U !== H)
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
                H
              );
            })
          }
        ),
        /* @__PURE__ */ k(wh, { children: [
          /* @__PURE__ */ k(Sh, { children: [
            o && /* @__PURE__ */ k(
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
                      onClick: O,
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
            o && s && /* @__PURE__ */ h("div", { className: "chat-wrapper__divider" }),
            s && /* @__PURE__ */ k("div", { className: "chat-wrapper__restaurant-chip", children: [
              l && /* @__PURE__ */ h(
                "img",
                {
                  src: l,
                  alt: "Chip logo",
                  className: "chat-wrapper__restaurant-logo"
                }
              ),
              /* @__PURE__ */ h("span", { className: "chat-wrapper__restaurant-name", children: s })
            ] })
          ] }),
          /* @__PURE__ */ h(
            Th,
            {
              status: a,
              disabled: !y.trim() || i,
              onClick: a === et.STREAMING && g ? () => {
                g();
              } : void 0
            }
          )
        ] })
      ]
    }
  );
}), xh = () => {
  const { suggestedPrompts: e, chatInputRef: t } = ln();
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
    children: /* @__PURE__ */ h("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ h(Va, { size: e, variant: "dots" }) })
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
    messagesEndRef: o,
    chatInputRef: s,
    conversationError: l
  } = ln(), c = pt.state.shouldShowMainHeader(
    e.length,
    n,
    t
  ), u = pt.state.shouldShowSuggestedPrompts(
    e.length,
    n,
    t,
    a
  ), p = pt.state.getContentAreaClass(
    e.length,
    n,
    t
  );
  return /* @__PURE__ */ k(Ht, { children: [
    l && /* @__PURE__ */ h("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ k("p", { children: [
      "⚠️ ",
      l
    ] }) }),
    c && /* @__PURE__ */ h(vh, { headerName: r, headerDescription: i }),
    /* @__PURE__ */ k("div", { className: p, children: [
      t && e.length === 0 ? /* @__PURE__ */ h("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ h(bh, { fullHeight: !0 }) }) : /* @__PURE__ */ h(Ka, { ref: o }),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ h(kh, { ref: s }) }),
      u && /* @__PURE__ */ h(xh, {})
    ] })
  ] });
}, Xa = Nn(
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
    var pn, $t;
    const { token: c, entityId: u, entityType: p } = e;
    pt.validation.validateAuthProps({
      userMpAuthToken: c,
      chatServerUrl: t,
      chatServerKey: n
    });
    const g = Ce(() => pt.url.convertWebSocketToHttp(t), [t]), d = Ce(
      () => new ds({
        apiUrl: g,
        userMpAuthToken: c,
        chatServerKey: n
      }),
      [g, c, n]
    ), y = Ce(() => a && a.length > 0 ? a.map(({ execute: x, ...fe }) => fe) : [], [a]), w = cs(), A = $((x) => x.isModalOpen), E = $((x) => x.isCollapsed), _ = $((x) => x.currentMode), M = $((x) => x.openModal), P = $((x) => x.closeModal), L = $((x) => x.toggleCollapse), T = $((x) => x.toggleFullscreen), O = $((x) => x.setCurrentMode), D = $((x) => x.chatStatus), H = $((x) => x.setChatStatus), z = $((x) => x.streamingStatus), N = $((x) => x.setStreamingStatus), b = $(
      (x) => x.isLoadingConversation
    ), F = $(
      (x) => x.setIsLoadingConversation
    ), V = $((x) => x.conversationError), U = $(
      (x) => x.setConversationError
    ), q = $((x) => x.setCurrentThreadId), X = $((x) => x.providerResId), oe = $((x) => x.setProviderResId), Ne = $((x) => x.isDevSettingsOpen), f = $(
      (x) => x.setIsDevSettingsOpen
    ), Q = $((x) => x.isStreaming), ye = $((x) => x.setIsStreaming), m = $((x) => x.isThinking), Ee = $((x) => x.setIsThinking), re = $((x) => x.streamingContent), se = $((x) => x.isHandlingTool);
    xe(() => {
      i.mode && O(i.mode);
    }, [i.mode, O]), xe(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const x = (fe) => {
        fe.key === "Escape" && _ === "modal" && A && P();
      };
      if (_ === "modal" && A)
        return document.addEventListener("keydown", x), () => document.removeEventListener("keydown", x);
    }, [_, A, P]);
    const {
      messages: ve,
      setMessages: ue,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: Xe,
      getReasoningStatus: $e,
      getReasoningDuration: st,
      getReasoningContentOnly: At,
      getReasoningTitle: nt,
      getToolingTitle: mt,
      getToolingStatus: Ze,
      handleSetMessage: Tt,
      handleReasoningUpdate: _t,
      handleChatFinished: rt,
      handleChatError: lt,
      stopGeneration: ct
    } = w, kt = Ae(null), ut = Ae(null), Nt = Ae(null), Mt = te(
      (x) => {
        oe(x.providerResId), q(x.threadId), x.canUpdateMetadata && r && Object.keys(r).length > 0 && Nt.current && Nt.current.updateMetadata(x.providerResId, { metadata: r }).then(() => {
          console.log("[ChatWrapper] ✅ Metadata update successful");
        }).catch((fe) => {
          console.error(
            "[ChatWrapper] ❌ Failed to update metadata:",
            fe
          );
        });
      },
      [oe, q, r]
    ), Ct = te(
      (x) => {
        var fe, ke;
        switch (console.log("[ChatWrapper] System event received:", x), x.type) {
          case Je.CHAT_COMPLETED:
            (fe = x.data) != null && fe.conversationId && oe(x.data.conversationId), rt(), setTimeout(() => {
              var Se;
              (Se = ut.current) == null || Se.focus();
            }, 0);
            break;
          case Je.CHAT_ERROR:
            (ke = x.data) != null && ke.error && lt(x.data.error);
            break;
          case Je.CONNECTION_LOST:
            break;
          case Je.CONNECTION_RESTORED:
            break;
          case Je.RECONNECTING:
            break;
        }
      },
      [
        rt,
        lt,
        oe,
        q
      ]
    ), {
      chatClient: S,
      isConnected: I,
      // isConnecting,
      // isReconnecting,
      // reconnectAttempts: reconnectAttempt,
      connectChatClient: j,
      disconnectChatClient: J
    } = Mo({
      // Authentication and server properties
      userMpAuthToken: c,
      chatServerUrl: t,
      chatServerKey: n,
      // Entity configuration
      entityId: u,
      entityType: p,
      // Tools configuration
      tools: a,
      // Other properties
      contextHelpers: s,
      onSetMessage: Tt,
      onSystemEvent: Ct,
      onReasoningUpdate: _t,
      onThreadCreated: Mt
    });
    xe(() => {
      Nt.current = S;
    }, [S]), hs({
      metadata: r,
      chatClient: S,
      currentProviderResId: X,
      isLoadingConversation: b,
      messages: ve,
      entityId: u,
      entityType: p
    }), Zi(
      l,
      () => ({
        updateMetadata: (x) => {
          if (!S) {
            console.warn(
              "ChatWrapper: Cannot update metadata - chat client not initialized"
            );
            return;
          }
          if (!X) {
            console.warn(
              "ChatWrapper: Cannot update metadata - no active conversation (providerResId not set)"
            );
            return;
          }
          S.updateMetadata(X, x).catch((fe) => {
            console.error(
              "ChatWrapper: Failed to update thread metadata:",
              fe
            );
          });
        }
      }),
      [S, X]
    );
    const ne = Ce(
      () => S ? new ps(S, {
        onError: i.onError
      }) : null,
      [S, i.onError]
    ), {
      resetConversationLoader: Te
      /*, reloadConversation*/
    } = us({
      entityId: u,
      entityType: p,
      httpApiUrl: g,
      userMpAuthToken: c,
      chatServerKey: n,
      messages: ve,
      setMessages: ue,
      setIsLoadingConversation: F,
      setConversationError: U,
      setCurrentThreadId: q,
      setProviderResId: oe,
      metadata: r
    }), Ie = Ae(null), we = te(() => {
      Ie.current && cancelAnimationFrame(Ie.current), Ie.current = requestAnimationFrame(() => {
        var x;
        (x = kt.current) == null || x.scrollIntoView({ behavior: "smooth" }), Ie.current = null;
      });
    }, []);
    xe(() => {
      we();
    }, [ve, we]), xe(() => {
      re && we();
    }, [re, we]), xe(() => {
      i.onStreamingStatusChange && i.onStreamingStatusChange(z);
    }, [z, i]), xe(() => () => {
      Ie.current && cancelAnimationFrame(Ie.current);
    }, []);
    const Be = te(
      async (x, fe) => {
        if (!x.trim() || Q || !ne || !S)
          return;
        ye(!0), Ee(!0), H(et.SUBMITTED), N(xn.STARTING);
        const ke = ne.createUserMessage(
          x,
          fe
        );
        ue((Se) => [...Se, ke]);
        try {
          await S.onTriggerMessage({
            message: ke.content,
            media: fe,
            providerResId: X || void 0
          }), H(et.STREAMING);
        } catch (Se) {
          Ee(!1), H(et.ERROR), ue(
            (Le) => Le.map(
              (it) => it.id === ke.id ? {
                ...it,
                hasError: !0,
                errorMessage: I ? Se instanceof Error ? Se.message : "Failed to send message" : "Failed to send message."
              } : it
            )
          ), ye(!1), H(et.IDLE), N(xn.IDLE);
        }
      },
      [
        ne,
        S,
        Q,
        I,
        ue,
        ye,
        Ee,
        H,
        N,
        X
      ]
    ), _e = te(
      async (x) => await d.uploadFiles(x),
      [d]
    ), de = Ce(
      () => pt.css.getContainerClasses(
        _,
        i.position,
        i.theme,
        E,
        i.constrainedHeight
      ),
      [
        _,
        i.position,
        i.theme,
        E,
        i.constrainedHeight
      ]
    ), Ye = te(() => {
      _ === "modal" ? M() : L();
    }, [_, M, L]), Me = te(() => {
      f(!0);
    }, [f]), cn = te(
      (x) => {
        ut.current && ut.current.setText(x.description);
      },
      []
    ), Lt = Ce(
      () => ({
        messages: ve,
        isStreaming: Q,
        isThinking: m,
        isHandlingTool: se
      }),
      [ve, Q, m, se]
    ), Ot = Ce(
      () => ({
        isLoadingConversation: b,
        chatStatus: D,
        conversationError: V
      }),
      [b, D, V]
    ), un = Ce(
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
        (pn = i.features) == null ? void 0 : pn.fileUpload,
        y
      ]
    ), xt = Ce(
      () => ({
        getReasoningTitle: nt,
        getReasoningStatus: $e,
        getReasoningDuration: st,
        getReasoningContentOnly: At,
        getToolingTitle: mt,
        getToolingStatus: Ze
      }),
      [
        nt,
        $e,
        st,
        At,
        mt,
        Ze
      ]
    ), hn = te(
      async (x) => {
        const fe = ve.find((ke) => ke.id === x);
        if (fe) {
          ue((ke) => ke.map(
            (Se) => Se.id === x ? {
              ...Se,
              hasError: !1,
              isRetrying: !0,
              errorMessage: void 0
            } : Se
          ));
          try {
            Te(), await j(), await (S == null ? void 0 : S.onTriggerMessage({
              message: fe.content,
              media: fe.media,
              providerResId: X || void 0
            })), ue(
              (ke) => ke.map(
                (Se) => Se.id === x ? { ...Se, isRetrying: !1 } : Se
              )
            );
          } catch (ke) {
            ue(
              (Se) => Se.map(
                (Le) => Le.id === x ? {
                  ...Le,
                  isRetrying: !1,
                  hasError: !0,
                  errorMessage: ke instanceof Error ? ke.message : "Retry failed"
                } : Le
              )
            );
          }
        }
      },
      [
        ve,
        ue,
        Te,
        j,
        Be
      ]
    ), dn = Ce(
      () => ({
        onSubmit: Be,
        onFileUpload: _e,
        onStopGeneration: ct,
        onPromptSelect: cn,
        onRetryMessage: hn
      }),
      [
        Be,
        _e,
        ct,
        cn,
        hn
      ]
    ), pe = Ce(
      () => ({
        ...Lt,
        ...Ot,
        ...un,
        ...xt,
        ...dn,
        currentAssistantMessageIdRef: Xe,
        messagesEndRef: kt,
        chatInputRef: ut
      }),
      [
        Lt,
        Ot,
        un,
        xt,
        dn,
        Xe,
        kt,
        ut
      ]
    );
    return Ce(
      () => pt.state.shouldShowBubble(
        _,
        A,
        E
      ),
      [_, A, E]
    ) ? /* @__PURE__ */ h(ei, { children: /* @__PURE__ */ h(
      _s,
      {
        mode: _,
        headerName: i.headerName,
        bubbleText: i.bubbleText,
        showBubbleText: (($t = i.features) == null ? void 0 : $t.showBubbleText) !== !1,
        onClick: Ye
      }
    ) }) : /* @__PURE__ */ h(ei, { children: /* @__PURE__ */ h(
      ms,
      {
        onError: (x) => {
          console.error("WebSocket error in ChatWrapper:", x), i.onError && i.onError(x);
        },
        children: /* @__PURE__ */ k("div", { className: de, style: i.customStyles, children: [
          o && i.headerVisible === !1 && /* @__PURE__ */ h(
            "button",
            {
              className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
              onClick: Me,
              title: "Developer Settings",
              children: /* @__PURE__ */ h(ia, { size: 16 })
            }
          ),
          pt.state.shouldShowHeader(i.headerVisible) && /* @__PURE__ */ h(
            ks,
            {
              headerName: i.headerName,
              mode: _,
              isCollapsed: E,
              isModalOpen: A,
              devMode: o,
              onClose: P,
              onToggleFullscreen: T,
              onToggleCollapse: L,
              onOpenSettings: Me
            }
          ),
          !E && /* @__PURE__ */ h(
            Cs,
            {
              onError: (x) => {
                console.error("File upload error:", x), i.onError && i.onError(x);
              },
              children: /* @__PURE__ */ h(fh, { value: pe, children: /* @__PURE__ */ h(Ih, {}) })
            }
          ),
          /* @__PURE__ */ h(
            To,
            {
              isOpen: Ne,
              onClose: () => f(!1),
              apiUrl: g,
              userMpAuthToken: c,
              chatServerKey: n,
              onDisconnect: J,
              isConnected: I
            }
          )
        ] })
      }
    ) });
  }
);
Xa.displayName = "ChatWrapperContainer";
const Xh = $i(Xa);
function Yh({
  isConnected: e,
  isConnecting: t = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 1 / 0,
  onRetry: a,
  autoHideDuration: o = 3e3
}) {
  const [s, l] = ae("hidden"), [c, u] = ae(!1);
  if (xe(() => {
    console.log("[ConnectionNotification] State update:", {
      isConnected: e,
      isConnecting: t,
      isReconnecting: n,
      reconnectAttempt: r,
      wasDisconnected: c,
      currentState: s
    }), t ? l("connecting") : !e && !n ? (u(!0), i !== 1 / 0 && r >= i ? l("error") : l("hidden")) : n ? (console.log("[ConnectionNotification] Setting state to RECONNECTING"), l("reconnecting")) : e && c ? (l("hidden"), u(!1)) : e && !c && l("hidden");
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
  return d ? s === "connecting" ? /* @__PURE__ */ h("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ k("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ h("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ h("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ h("div", { className: "connection-notification__bubble" })
  ] }) }) : s === "reconnecting" ? (console.log("[ConnectionNotification] RENDERING RECONNECTING BANNER", { reconnectAttempt: r }), /* @__PURE__ */ h("div", { className: `connection-notification connection-notification--banner connection-notification--${s}`, children: /* @__PURE__ */ k("div", { className: "connection-notification__banner-content", children: [
    /* @__PURE__ */ h("span", { className: "connection-notification__banner-spinner" }),
    /* @__PURE__ */ k("span", { className: "connection-notification__banner-text", children: [
      "Reconnecting... (attempt ",
      r,
      ")"
    ] })
  ] }) })) : /* @__PURE__ */ h("div", { className: `connection-notification connection-notification--${s}`, children: /* @__PURE__ */ k("div", { className: "connection-notification__content", children: [
    /* @__PURE__ */ h("div", { className: "connection-notification__icon", children: d.icon }),
    /* @__PURE__ */ h("div", { className: "connection-notification__title", children: d.title }),
    /* @__PURE__ */ h("div", { className: "connection-notification__message", children: d.message }),
    a && /* @__PURE__ */ h("div", { className: "connection-notification__actions", children: /* @__PURE__ */ h(
      "button",
      {
        className: "connection-notification__retry-btn primary",
        onClick: p,
        children: "Try Again"
      }
    ) })
  ] }) }) : null;
}
var Rh = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(Rh || {});
export {
  _h as AnimatedPlaceholder,
  et as CHAT_STATUS,
  ys as ChatIcon,
  Xh as ChatWrapper,
  ws as CloseIcon,
  Es as CollapseIcon,
  Yh as ConnectionNotification,
  Ts as CopyIcon,
  To as DevSettings,
  Rh as EntityType,
  Ss as FullscreenIcon,
  bh as InlineLoader,
  Va as Loader,
  Pe as PROCESSING_STATUS,
  yh as PromptInput,
  Eh as PromptInputButton,
  jh as PromptInputModelSelect,
  Zh as PromptInputModelSelectContent,
  Kh as PromptInputModelSelectItem,
  $h as PromptInputModelSelectTrigger,
  qh as PromptInputModelSelectValue,
  Th as PromptInputSubmit,
  qa as PromptInputTextarea,
  wh as PromptInputToolbar,
  Sh as PromptInputTools,
  uh as Reasoning,
  Ga as ReasoningContent,
  Wa as ReasoningTrigger,
  xn as STREAMING_STATUS,
  ia as SettingsIcon,
  xh as SuggestedPrompts,
  io as fetchThreadMessages,
  Lh as isChatActive,
  Dh as isChatError,
  Oh as isChatIdle,
  Ph as isProcessingActive,
  Hh as isProcessingComplete,
  Fh as isProcessingError,
  Ki as updateThread,
  qi as updateThreadMetadata,
  zh as useChatState,
  Bh as useConversationState,
  Gh as useDevState,
  Uh as useLayoutState,
  Wh as useThreadState,
  Vh as useUIState,
  $ as useUIStore
};
