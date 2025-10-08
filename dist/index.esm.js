var oe = Object.defineProperty;
var ie = (c, t, a) => t in c ? oe(c, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : c[t] = a;
var U = (c, t, a) => ie(c, typeof t != "symbol" ? t + "" : t, a);
import { jsxs as w, jsx as i, Fragment as ce } from "react/jsx-runtime";
import { useState as p, useRef as F, useCallback as g, useEffect as L } from "react";
function le({
  onSend: c,
  disabled: t,
  placeholder: a,
  value: s,
  onChange: d,
  onStop: m,
  onClear: $,
  showStopButton: C,
  showClearButton: f
}) {
  const y = () => {
    const n = s || "";
    n.trim() && !t && (c(n.trim()), d && d(""));
  };
  return /* @__PURE__ */ w("div", { className: "chat-wrapper__input", children: [
    /* @__PURE__ */ i(
      "textarea",
      {
        value: s || "",
        onChange: (n) => d ? d(n.target.value) : void 0,
        onKeyPress: (n) => {
          n.key === "Enter" && !n.shiftKey && (n.preventDefault(), y());
        },
        placeholder: a,
        disabled: t,
        className: "chat-wrapper__textarea",
        rows: 1
      }
    ),
    /* @__PURE__ */ w("div", { className: "chat-wrapper__input-buttons", children: [
      C && /* @__PURE__ */ i(
        "button",
        {
          onClick: () => {
            m && m();
          },
          className: "chat-wrapper__stop-button",
          title: "Stop generation",
          children: "Stop"
        }
      ),
      f && !t && /* @__PURE__ */ i(
        "button",
        {
          onClick: () => {
            $ && $();
          },
          className: "chat-wrapper__clear-button",
          title: "Clear chat",
          children: "Clear"
        }
      ),
      /* @__PURE__ */ i(
        "button",
        {
          onClick: y,
          disabled: t || !(s != null && s.trim()),
          className: "chat-wrapper__send-button",
          children: t ? "Sending..." : "Send"
        }
      )
    ] })
  ] });
}
function fe({
  apiUrl: c,
  config: t,
  tools: a,
  initialMessages: s = []
}) {
  const [d, m] = p(s), [$, C] = p(""), [f, y] = p(!1), [u, b] = p(null), [I, n] = p([]), [H, v] = p([]), [_, P] = p([]), [N, A] = p([]), [J, T] = p(""), [Y, M] = p(!1), [W, O] = p(""), G = F(null), q = F(null), K = F(null), B = g(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), V = g(() => {
    var e;
    (e = G.current) == null || e.scrollIntoView({ behavior: "smooth" });
  }, []);
  L(() => {
    a && Object.keys(a).length > 0 && console.log("Available tools:", Object.keys(a));
  }, [a]), L(() => {
    V();
  }, [d, V]), L(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(J);
  }, [J, t]);
  const S = g((e) => {
    const l = q.current;
    l && m((E) => E.map(
      (h) => h.id === l ? e(h) : h
    ));
  }, []), Q = g(() => (t.endpoint || "conversation") === "brief-planner" ? `${c}/api/brief-planner` : u ? `${c}/api/conversation/${u}` : `${c}/api/conversation/init`, [c, t.endpoint, u]), z = g((e) => {
    var l, E, h, j, o, x, k, D;
    switch (console.log("Processing stream event:", e.type, e), e.type) {
      case "event":
        e.event === "latitude-event" ? ((l = e.data) == null ? void 0 : l.type) === "chain-started" ? (T("Planning chain started"), M(!0), O("🔗 Starting comprehensive planning chain...")) : ((E = e.data) == null ? void 0 : E.type) === "step-started" ? (T("Planning step started"), M(!0), O("📊 Executing planning step...")) : ((h = e.data) == null ? void 0 : h.type) === "provider-completed" ? (T("AI planning completed"), M(!1), O(""), (j = e.data.response) != null && j.text && S((r) => ({
          ...r,
          content: e.data.response.text,
          isStreaming: !1
        }))) : ((o = e.data) == null ? void 0 : o.type) === "chain-completed" && (T("Planning completed"), M(!1), O(""), e.data.uuid && b(e.data.uuid), S((r) => ({
          ...r,
          isStreaming: !1
        }))) : e.event === "provider-event" && ((x = e.data) == null ? void 0 : x.type) === "text-delta" && (M(!1), O(""), S((r) => ({
          ...r,
          content: r.content + e.data.textDelta
        })));
        break;
      case "text-delta":
        e.content && S((r) => ({
          ...r,
          content: r.content + e.content
        }));
        break;
      case "tool-result":
        if (console.log("Tool result received:", e), e.tool && e.data && (e.data.id || e.data.success)) {
          const r = {
            id: e.data.id || B(),
            title: e.data.title || `${e.tool} result`,
            description: e.data.description,
            status: e.data.status || "completed",
            created_at: e.data.created_at || (/* @__PURE__ */ new Date()).toISOString(),
            ...e.data
          };
          n((R) => [...R, r]);
        }
        e.todos && (v(e.todos), t.onToolResult && t.onToolResult("todos", e.todos)), e.briefs && (P(e.briefs), t.onToolResult && t.onToolResult("briefs", e.briefs));
        break;
      case "finished":
        T("Stream finished"), e.uuid && b(e.uuid), (D = (k = e.result) == null ? void 0 : k.response) != null && D.text ? S((r) => ({
          ...r,
          content: e.result.response.text,
          isStreaming: !1
        })) : S((r) => ({
          ...r,
          isStreaming: !1
        }));
        break;
      case "stream-error":
        console.error("Stream error:", e.error), S((r) => ({
          ...r,
          content: `Stream Error: ${e.error}`,
          isStreaming: !1
        }));
        break;
      case "error":
        console.error("API error:", e.error), S((r) => ({
          ...r,
          content: `Error: ${e.error}`,
          isStreaming: !1
        }));
        break;
    }
  }, [S, B, t]), Z = g(async (e, l) => {
    if (!e.trim() || f) return;
    const E = {
      id: B(),
      role: "user",
      content: e.trim(),
      timestamp: /* @__PURE__ */ new Date(),
      media: l
    };
    m((o) => [...o, E]), y(!0), T("Starting...");
    const h = B();
    q.current = h;
    const j = {
      id: h,
      role: "assistant",
      content: "",
      timestamp: /* @__PURE__ */ new Date(),
      isStreaming: !0
    };
    m((o) => [...o, j]);
    try {
      K.current = new AbortController();
      const o = Q(), x = t.endpoint === "brief-planner" ? {
        messages: [...d, E],
        promptPath: t.promptPath || "briefPlanner",
        conversationUuid: u,
        todos: H,
        // Send current todos to the API
        briefs: _,
        // Send current briefs to the API  
        media: N
        // Send uploaded images as base64
      } : {
        message: e.trim(),
        tools: a ? Object.keys(a) : []
      };
      console.log("Sending request to:", o);
      const k = await fetch(o, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...t.apiKey && { Authorization: `Bearer ${t.apiKey}` }
        },
        body: JSON.stringify(x),
        signal: K.current.signal
      });
      if (!k.ok)
        throw new Error(`HTTP error! status: ${k.status}`);
      if (!u && t.endpoint !== "brief-planner") {
        const D = await k.json();
        b(D.conversationId);
        const r = `${c}/api/conversation/${D.conversationId}`, R = await fetch(r, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...t.apiKey && { Authorization: `Bearer ${t.apiKey}` }
          },
          body: JSON.stringify({ message: e.trim() }),
          signal: K.current.signal
        });
        if (!R.ok)
          throw new Error(`HTTP error! status: ${R.status}`);
        await X(R);
      } else
        await X(k);
    } catch (o) {
      o instanceof Error && o.name === "AbortError" ? console.log("Request aborted") : (console.error("Request error:", o), S((x) => ({
        ...x,
        content: `Sorry, there was an error: ${o instanceof Error ? o.message : "Unknown error"}`,
        isStreaming: !1
      })), t.onError && t.onError(o instanceof Error ? o : new Error("Unknown error")));
    } finally {
      y(!1), T(""), M(!1), O(""), K.current = null, q.current = null;
    }
  }, [
    f,
    B,
    d,
    u,
    H,
    _,
    N,
    a,
    t,
    c,
    Q,
    S,
    z
  ]), X = g(async (e) => {
    var j;
    const l = (j = e.body) == null ? void 0 : j.getReader(), E = new TextDecoder();
    if (!l)
      throw new Error("No response body reader available");
    let h = "";
    for (; ; ) {
      const { done: o, value: x } = await l.read();
      if (o) {
        console.log("Stream completed");
        break;
      }
      h += E.decode(x, { stream: !0 });
      const k = h.split(/\r?\n/);
      h = k.pop() || "";
      for (const D of k)
        if (D.startsWith("data: ")) {
          const r = D.slice(6).trim();
          if (r === "[DONE]" || r === "")
            continue;
          try {
            const R = JSON.parse(r);
            z(R);
          } catch (R) {
            console.error("Failed to parse event:", R);
          }
        }
    }
  }, [z]), ee = g(() => {
    K.current && (K.current.abort(), y(!1), T(""), M(!1), O(""));
  }, []), te = g(() => {
    m(s), b(null), n([]), v([]), P([]), A([]), T(""), M(!1), O(""), console.log("Chat cleared");
  }, [s]), re = ((...e) => e.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${t.mode}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`
  ), ae = () => t.mode === "modal" ? /* @__PURE__ */ i("div", { className: "chat-wrapper-overlay" }) : null, se = () => !Y || !W ? null : /* @__PURE__ */ i("div", { className: "chat-wrapper__thinking", children: /* @__PURE__ */ w("div", { className: "chat-wrapper__thinking-content", children: [
    /* @__PURE__ */ i("span", { className: "chat-wrapper__thinking-spinner" }),
    /* @__PURE__ */ i("span", { children: W })
  ] }) }), ne = () => {
    var e;
    return !((e = t.features) != null && e.showToolResults) || I.length === 0 ? null : /* @__PURE__ */ w("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ i("h4", { children: "Tool Results" }),
      /* @__PURE__ */ i("div", { className: "chat-wrapper__tool-results-list", children: I.map((l) => /* @__PURE__ */ w("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ i("div", { className: "chat-wrapper__tool-result-title", children: l.title }),
        l.description && /* @__PURE__ */ i("div", { className: "chat-wrapper__tool-result-description", children: l.description }),
        /* @__PURE__ */ w("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          l.status || "completed"
        ] })
      ] }, l.id)) })
    ] });
  };
  return /* @__PURE__ */ w(ce, { children: [
    ae(),
    /* @__PURE__ */ w("div", { className: re, style: t.customStyles, children: [
      /* @__PURE__ */ w("div", { className: "chat-wrapper__header", children: [
        /* @__PURE__ */ i("h2", { className: "chat-wrapper__title", children: t.appName }),
        J && /* @__PURE__ */ i("div", { className: "chat-wrapper__status", children: J })
      ] }),
      se(),
      /* @__PURE__ */ w("div", { className: "chat-wrapper__messages", children: [
        d.map((e) => /* @__PURE__ */ w(
          "div",
          {
            className: `chat-wrapper__message chat-wrapper__message--${e.role}`,
            children: [
              /* @__PURE__ */ w("div", { className: "chat-wrapper__message-content", children: [
                e.content,
                e.isStreaming && /* @__PURE__ */ i("span", { className: "chat-wrapper__streaming-indicator", children: "..." })
              ] }),
              /* @__PURE__ */ i("div", { className: "chat-wrapper__message-timestamp", children: e.timestamp.toLocaleTimeString() })
            ]
          },
          e.id
        )),
        /* @__PURE__ */ i("div", { ref: G })
      ] }),
      ne(),
      /* @__PURE__ */ i(
        le,
        {
          onSend: Z,
          disabled: f,
          placeholder: t.placeholder || "Type a message...",
          value: $,
          onChange: C,
          onStop: ee,
          onClear: te,
          showStopButton: f,
          showClearButton: d.length > 0
        }
      ),
      t.onError && /* @__PURE__ */ i("div", { className: "chat-wrapper__error-boundary" })
    ] })
  ] });
}
class de {
  constructor(t, a) {
    U(this, "baseUrl");
    U(this, "apiKey");
    this.baseUrl = t, this.apiKey = a;
  }
  getHeaders() {
    const t = {
      "Content-Type": "application/json"
    };
    return this.apiKey && (t.Authorization = `Bearer ${this.apiKey}`), t;
  }
  async initConversation() {
    const t = await fetch(`${this.baseUrl}/api/conversation/init`, {
      method: "POST",
      headers: this.getHeaders()
    });
    if (!t.ok) throw new Error("Failed to initialize conversation");
    return (await t.json()).conversationId;
  }
  async *streamMessage(t, a) {
    const s = await fetch(
      `${this.baseUrl}/api/conversation/${t}`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ message: a })
      }
    );
    if (!s.ok) throw new Error("Failed to send message");
    if (!s.body) throw new Error("No response body");
    const d = s.body.getReader(), m = new TextDecoder();
    for (; ; ) {
      const { done: $, value: C } = await d.read();
      if ($) break;
      const y = m.decode(C).split(`
`);
      for (const u of y)
        if (u.startsWith("data: ")) {
          const b = u.slice(6);
          if (b === "[DONE]") return;
          try {
            yield JSON.parse(b).content || "";
          } catch (I) {
            console.error("Failed to parse chunk:", I);
          }
        }
    }
  }
}
function we(c, t) {
  const [a, s] = p([]), [d, m] = p(!1), [$, C] = p(null), f = F(null), y = F(new de(c, t)), u = g(async () => {
    try {
      const n = await y.current.initConversation();
      return f.current = n, n;
    } catch (n) {
      throw C(n), n;
    }
  }, []), b = g(
    async (n) => {
      f.current || await u();
      const H = {
        id: Date.now().toString(),
        role: "user",
        content: n,
        timestamp: /* @__PURE__ */ new Date()
      };
      s((_) => [..._, H]), m(!0), C(null);
      const v = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      s((_) => [..._, v]);
      try {
        const _ = y.current.streamMessage(
          f.current,
          n
        );
        for await (const P of _)
          s(
            (N) => N.map(
              (A) => A.id === v.id ? { ...A, content: A.content + P } : A
            )
          );
        s(
          (P) => P.map(
            (N) => N.id === v.id ? { ...N, isStreaming: !1 } : N
          )
        );
      } catch (_) {
        C(_), s((P) => P.filter((N) => N.id !== v.id));
      } finally {
        m(!1);
      }
    },
    [u]
  ), I = g(() => {
    s([]), f.current = null;
  }, []);
  return {
    messages: a,
    isLoading: d,
    error: $,
    sendMessage: b,
    clearMessages: I
  };
}
export {
  fe as ChatWrapper,
  we as useChatConnection
};
