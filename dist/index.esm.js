var ee = Object.defineProperty;
var te = (i, e, a) => e in i ? ee(i, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : i[e] = a;
var H = (i, e, a) => te(i, typeof e != "symbol" ? e + "" : e, a);
import { jsx as s, jsxs as _, Fragment as re } from "react/jsx-runtime";
import { useState as C, useRef as K, useCallback as S, useEffect as J } from "react";
function ae({ messages: i }) {
  return /* @__PURE__ */ s("div", { className: "chat-wrapper__messages", children: i.map((e) => /* @__PURE__ */ _(
    "div",
    {
      className: `chat-wrapper__message chat-wrapper__message--${e.role}`,
      children: [
        /* @__PURE__ */ _("div", { className: "chat-wrapper__message-content", children: [
          e.content,
          e.isStreaming && /* @__PURE__ */ s("span", { className: "chat-wrapper__streaming-indicator", children: "..." })
        ] }),
        /* @__PURE__ */ s("div", { className: "chat-wrapper__message-timestamp", children: e.timestamp.toLocaleTimeString() })
      ]
    },
    e.id
  )) });
}
function se({
  onSend: i,
  disabled: e,
  placeholder: a,
  value: n,
  onChange: d,
  onStop: g,
  onClear: P,
  showStopButton: $,
  showClearButton: y
}) {
  const b = () => {
    const o = n || "";
    o.trim() && !e && (i(o.trim()), d && d(""));
  };
  return /* @__PURE__ */ _("div", { className: "chat-wrapper__input", children: [
    /* @__PURE__ */ s(
      "textarea",
      {
        value: n || "",
        onChange: (o) => d ? d(o.target.value) : void 0,
        onKeyPress: (o) => {
          o.key === "Enter" && !o.shiftKey && (o.preventDefault(), b());
        },
        placeholder: a,
        disabled: e,
        className: "chat-wrapper__textarea",
        rows: 1
      }
    ),
    /* @__PURE__ */ _("div", { className: "chat-wrapper__input-buttons", children: [
      $ && /* @__PURE__ */ s(
        "button",
        {
          onClick: () => {
            g && g();
          },
          className: "chat-wrapper__stop-button",
          title: "Stop generation",
          children: "Stop"
        }
      ),
      y && !e && /* @__PURE__ */ s(
        "button",
        {
          onClick: () => {
            P && P();
          },
          className: "chat-wrapper__clear-button",
          title: "Clear chat",
          children: "Clear"
        }
      ),
      /* @__PURE__ */ s(
        "button",
        {
          onClick: b,
          disabled: e || !(n != null && n.trim()),
          className: "chat-wrapper__send-button",
          children: e ? "Sending..." : "Send"
        }
      )
    ] })
  ] });
}
function de({
  apiUrl: i,
  config: e,
  tools: a,
  initialMessages: n = []
}) {
  const [d, g] = C(n), [P, $] = C(""), [y, b] = C(!1), [h, T] = C(null), [N, o] = C([]), [M, p] = C(""), [I, u] = C(!1), [E, m] = C(""), q = K(null), B = K(null), j = K(null), A = S(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), z = S(() => {
    var t;
    (t = q.current) == null || t.scrollIntoView({ behavior: "smooth" });
  }, []);
  J(() => {
    a && Object.keys(a).length > 0 && console.log("Available tools:", Object.keys(a));
  }, [a]), J(() => {
    z();
  }, [d, z]), J(() => {
    e.onStreamingStatusChange && e.onStreamingStatusChange(M);
  }, [M, e]);
  const k = S((t) => {
    const l = B.current;
    l && g((v) => v.map(
      (f) => f.id === l ? t(f) : f
    ));
  }, []), L = S(() => (e.endpoint || "conversation") === "brief-planner" ? `${i}/api/brief-planner` : h ? `${i}/api/conversation/${h}` : `${i}/api/conversation/init`, [i, e.endpoint, h]), F = S((t) => {
    var l, v, f, D, c, x, R, w;
    switch (console.log("Processing stream event:", t.type, t), t.type) {
      case "event":
        t.event === "latitude-event" ? ((l = t.data) == null ? void 0 : l.type) === "chain-started" ? (p("Planning chain started"), u(!0), m("🔗 Starting comprehensive planning chain...")) : ((v = t.data) == null ? void 0 : v.type) === "step-started" ? (p("Planning step started"), u(!0), m("📊 Executing planning step...")) : ((f = t.data) == null ? void 0 : f.type) === "provider-completed" ? (p("AI planning completed"), u(!1), m(""), (D = t.data.response) != null && D.text && k((r) => ({
          ...r,
          content: t.data.response.text,
          isStreaming: !1
        }))) : ((c = t.data) == null ? void 0 : c.type) === "chain-completed" && (p("Planning completed"), u(!1), m(""), t.data.uuid && T(t.data.uuid), k((r) => ({
          ...r,
          isStreaming: !1
        }))) : t.event === "provider-event" && ((x = t.data) == null ? void 0 : x.type) === "text-delta" && (u(!1), m(""), k((r) => ({
          ...r,
          content: r.content + t.data.textDelta
        })));
        break;
      case "text-delta":
        t.content && k((r) => ({
          ...r,
          content: r.content + t.content
        }));
        break;
      case "tool-result":
        if (console.log("Tool result received:", t), t.tool && t.data && (t.data.id || t.data.success)) {
          const r = {
            id: t.data.id || A(),
            title: t.data.title || `${t.tool} result`,
            description: t.data.description,
            status: t.data.status || "completed",
            created_at: t.data.created_at || (/* @__PURE__ */ new Date()).toISOString(),
            ...t.data
          };
          o((O) => [...O, r]);
        }
        t.todos && e.onToolResult && e.onToolResult("todos", t.todos), t.briefs && e.onToolResult && e.onToolResult("briefs", t.briefs);
        break;
      case "finished":
        p("Stream finished"), t.uuid && T(t.uuid), (w = (R = t.result) == null ? void 0 : R.response) != null && w.text ? k((r) => ({
          ...r,
          content: t.result.response.text,
          isStreaming: !1
        })) : k((r) => ({
          ...r,
          isStreaming: !1
        }));
        break;
      case "stream-error":
        console.error("Stream error:", t.error), k((r) => ({
          ...r,
          content: `Stream Error: ${t.error}`,
          isStreaming: !1
        }));
        break;
      case "error":
        console.error("API error:", t.error), k((r) => ({
          ...r,
          content: `Error: ${t.error}`,
          isStreaming: !1
        }));
        break;
    }
  }, [k, A, e]), W = S(async (t, l) => {
    if (!t.trim() || y) return;
    const v = {
      id: A(),
      role: "user",
      content: t.trim(),
      timestamp: /* @__PURE__ */ new Date(),
      media: l
    };
    g((c) => [...c, v]), b(!0), p("Starting...");
    const f = A();
    B.current = f;
    const D = {
      id: f,
      role: "assistant",
      content: "",
      timestamp: /* @__PURE__ */ new Date(),
      isStreaming: !0
    };
    g((c) => [...c, D]);
    try {
      j.current = new AbortController();
      const c = L(), x = e.endpoint === "brief-planner" ? {
        messages: [...d, v],
        promptPath: "briefPlanner",
        conversationUuid: h,
        todos: N.filter((w) => w.status !== void 0),
        briefs: N.filter((w) => w.title && w.description),
        media: l || [],
        tools: a ? Object.keys(a) : []
      } : {
        message: t.trim(),
        tools: a ? Object.keys(a) : []
      };
      console.log("Sending request to:", c);
      const R = await fetch(c, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...e.apiKey && { Authorization: `Bearer ${e.apiKey}` }
        },
        body: JSON.stringify(x),
        signal: j.current.signal
      });
      if (!R.ok)
        throw new Error(`HTTP error! status: ${R.status}`);
      if (!h && e.endpoint !== "brief-planner") {
        const w = await R.json();
        T(w.conversationId);
        const r = `${i}/api/conversation/${w.conversationId}`, O = await fetch(r, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...e.apiKey && { Authorization: `Bearer ${e.apiKey}` }
          },
          body: JSON.stringify({ message: t.trim() }),
          signal: j.current.signal
        });
        if (!O.ok)
          throw new Error(`HTTP error! status: ${O.status}`);
        await U(O);
      } else
        await U(R);
    } catch (c) {
      c instanceof Error && c.name === "AbortError" ? console.log("Request aborted") : (console.error("Request error:", c), k((x) => ({
        ...x,
        content: `Sorry, there was an error: ${c instanceof Error ? c.message : "Unknown error"}`,
        isStreaming: !1
      })), e.onError && e.onError(c instanceof Error ? c : new Error("Unknown error")));
    } finally {
      b(!1), p(""), u(!1), m(""), j.current = null, B.current = null;
    }
  }, [
    y,
    A,
    d,
    h,
    N,
    a,
    e,
    i,
    L,
    k,
    F
  ]), U = S(async (t) => {
    var D;
    const l = (D = t.body) == null ? void 0 : D.getReader(), v = new TextDecoder();
    if (!l)
      throw new Error("No response body reader available");
    let f = "";
    for (; ; ) {
      const { done: c, value: x } = await l.read();
      if (c) {
        console.log("Stream completed");
        break;
      }
      f += v.decode(x, { stream: !0 });
      const R = f.split(/\r?\n/);
      f = R.pop() || "";
      for (const w of R)
        if (w.startsWith("data: ")) {
          const r = w.slice(6).trim();
          if (r === "[DONE]" || r === "")
            continue;
          try {
            const O = JSON.parse(r);
            F(O);
          } catch (O) {
            console.error("Failed to parse event:", O);
          }
        }
    }
  }, [F]), G = S(() => {
    j.current && (j.current.abort(), b(!1), p(""), u(!1), m(""));
  }, []), V = S(() => {
    g(n), T(null), o([]), p(""), u(!1), m(""), console.log("Chat cleared");
  }, [n]), Q = ((...t) => t.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${e.mode}`,
    e.position && `chat-wrapper--${e.position}`,
    e.theme && `chat-wrapper--${e.theme}`
  ), X = () => e.mode === "modal" ? /* @__PURE__ */ s("div", { className: "chat-wrapper-overlay" }) : null, Y = () => !I || !E ? null : /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking", children: /* @__PURE__ */ _("div", { className: "chat-wrapper__thinking-content", children: [
    /* @__PURE__ */ s("span", { className: "chat-wrapper__thinking-spinner" }),
    /* @__PURE__ */ s("span", { children: E })
  ] }) }), Z = () => {
    var t;
    return !((t = e.features) != null && t.showToolResults) || N.length === 0 ? null : /* @__PURE__ */ _("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ s("h4", { children: "Tool Results" }),
      /* @__PURE__ */ s("div", { className: "chat-wrapper__tool-results-list", children: N.map((l) => /* @__PURE__ */ _("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ s("div", { className: "chat-wrapper__tool-result-title", children: l.title }),
        l.description && /* @__PURE__ */ s("div", { className: "chat-wrapper__tool-result-description", children: l.description }),
        /* @__PURE__ */ _("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          l.status || "completed"
        ] })
      ] }, l.id)) })
    ] });
  };
  return /* @__PURE__ */ _(re, { children: [
    X(),
    /* @__PURE__ */ _("div", { className: Q, style: e.customStyles, children: [
      /* @__PURE__ */ _("div", { className: "chat-wrapper__header", children: [
        /* @__PURE__ */ s("h2", { className: "chat-wrapper__title", children: e.appName }),
        M && /* @__PURE__ */ s("div", { className: "chat-wrapper__status", children: M })
      ] }),
      Y(),
      /* @__PURE__ */ _("div", { className: "chat-wrapper__content", children: [
        /* @__PURE__ */ s(ae, { messages: d }),
        Z(),
        /* @__PURE__ */ s("div", { ref: q })
      ] }),
      /* @__PURE__ */ s(
        se,
        {
          onSend: W,
          disabled: y,
          placeholder: e.placeholder || "Type a message...",
          value: P,
          onChange: $,
          onStop: G,
          onClear: V,
          showStopButton: y,
          showClearButton: d.length > 0
        }
      ),
      e.onError && /* @__PURE__ */ s("div", { className: "chat-wrapper__error-boundary" })
    ] })
  ] });
}
class ne {
  constructor(e, a) {
    H(this, "baseUrl");
    H(this, "apiKey");
    this.baseUrl = e, this.apiKey = a;
  }
  getHeaders() {
    const e = {
      "Content-Type": "application/json"
    };
    return this.apiKey && (e.Authorization = `Bearer ${this.apiKey}`), e;
  }
  async initConversation() {
    const e = await fetch(`${this.baseUrl}/api/conversation/init`, {
      method: "POST",
      headers: this.getHeaders()
    });
    if (!e.ok) throw new Error("Failed to initialize conversation");
    return (await e.json()).conversationId;
  }
  async *streamMessage(e, a) {
    const n = await fetch(
      `${this.baseUrl}/api/conversation/${e}`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ message: a })
      }
    );
    if (!n.ok) throw new Error("Failed to send message");
    if (!n.body) throw new Error("No response body");
    const d = n.body.getReader(), g = new TextDecoder();
    for (; ; ) {
      const { done: P, value: $ } = await d.read();
      if (P) break;
      const b = g.decode($).split(`
`);
      for (const h of b)
        if (h.startsWith("data: ")) {
          const T = h.slice(6);
          if (T === "[DONE]") return;
          try {
            yield JSON.parse(T).content || "";
          } catch (N) {
            console.error("Failed to parse chunk:", N);
          }
        }
    }
  }
}
function pe(i, e) {
  const [a, n] = C([]), [d, g] = C(!1), [P, $] = C(null), y = K(null), b = K(new ne(i, e)), h = S(async () => {
    try {
      const o = await b.current.initConversation();
      return y.current = o, o;
    } catch (o) {
      throw $(o), o;
    }
  }, []), T = S(
    async (o) => {
      y.current || await h();
      const M = {
        id: Date.now().toString(),
        role: "user",
        content: o,
        timestamp: /* @__PURE__ */ new Date()
      };
      n((I) => [...I, M]), g(!0), $(null);
      const p = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      n((I) => [...I, p]);
      try {
        const I = b.current.streamMessage(
          y.current,
          o
        );
        for await (const u of I)
          n(
            (E) => E.map(
              (m) => m.id === p.id ? { ...m, content: m.content + u } : m
            )
          );
        n(
          (u) => u.map(
            (E) => E.id === p.id ? { ...E, isStreaming: !1 } : E
          )
        );
      } catch (I) {
        $(I), n((u) => u.filter((E) => E.id !== p.id));
      } finally {
        g(!1);
      }
    },
    [h]
  ), N = S(() => {
    n([]), y.current = null;
  }, []);
  return {
    messages: a,
    isLoading: d,
    error: P,
    sendMessage: T,
    clearMessages: N
  };
}
export {
  de as ChatWrapper,
  pe as useChatConnection
};
