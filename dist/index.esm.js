var ne = Object.defineProperty;
var oe = (l, t, a) => t in l ? ne(l, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : l[t] = a;
var z = (l, t, a) => oe(l, typeof t != "symbol" ? t + "" : t, a);
import { jsxs as f, jsx as i, Fragment as ie } from "react/jsx-runtime";
import { useState as p, useRef as U, useCallback as y, useEffect as L } from "react";
function ce({
  onSend: l,
  disabled: t,
  placeholder: a,
  value: s,
  onChange: d,
  onStop: u,
  onClear: I,
  showStopButton: C,
  showClearButton: m
}) {
  const w = () => {
    const n = s || "";
    n.trim() && !t && (l(n.trim()), d && d(""));
  };
  return /* @__PURE__ */ f("div", { className: "chat-wrapper__input", children: [
    /* @__PURE__ */ i(
      "textarea",
      {
        value: s || "",
        onChange: (n) => d ? d(n.target.value) : void 0,
        onKeyPress: (n) => {
          n.key === "Enter" && !n.shiftKey && (n.preventDefault(), w());
        },
        placeholder: a,
        disabled: t,
        className: "chat-wrapper__textarea",
        rows: 1
      }
    ),
    /* @__PURE__ */ f("div", { className: "chat-wrapper__input-buttons", children: [
      C && /* @__PURE__ */ i(
        "button",
        {
          onClick: () => {
            u && u();
          },
          className: "chat-wrapper__stop-button",
          title: "Stop generation",
          children: "Stop"
        }
      ),
      m && !t && /* @__PURE__ */ i(
        "button",
        {
          onClick: () => {
            I && I();
          },
          className: "chat-wrapper__clear-button",
          title: "Clear chat",
          children: "Clear"
        }
      ),
      /* @__PURE__ */ i(
        "button",
        {
          onClick: w,
          disabled: t || !(s != null && s.trim()),
          className: "chat-wrapper__send-button",
          children: t ? "Sending..." : "Send"
        }
      )
    ] })
  ] });
}
function me({
  apiUrl: l,
  config: t,
  tools: a,
  initialMessages: s = []
}) {
  const [d, u] = p(s), [I, C] = p(""), [m, w] = p(!1), [S, b] = p(null), [$, n] = p([]), [F, j] = p([]), [_, P] = p([]), [N, A] = p([]), [H, T] = p(""), [X, M] = p(!1), [W, O] = p(""), G = U(null), J = U(null), v = U(null), B = y(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), V = y(() => {
    var e;
    (e = G.current) == null || e.scrollIntoView({ behavior: "smooth" });
  }, []);
  L(() => {
    a && Object.keys(a).length > 0 && console.log("Available tools:", Object.keys(a));
  }, [a]), L(() => {
    V();
  }, [d, V]), L(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(H);
  }, [H, t]);
  const g = y(
    (e) => {
      const c = J.current;
      c && u(
        (E) => E.map((h) => h.id === c ? e(h) : h)
      );
    },
    []
  ), q = y(
    (e) => {
      var c, E, h, K, o, x, k, D;
      switch (console.log("Processing stream event:", e.type, e), e.type) {
        case "event":
          e.event === "latitude-event" ? ((c = e.data) == null ? void 0 : c.type) === "chain-started" ? (T("Planning chain started"), M(!0), O(
            "🔗 Starting comprehensive planning chain..."
          )) : ((E = e.data) == null ? void 0 : E.type) === "step-started" ? (T("Planning step started"), M(!0), O("📊 Executing planning step...")) : ((h = e.data) == null ? void 0 : h.type) === "provider-completed" ? (T("AI planning completed"), M(!1), O(""), (K = e.data.response) != null && K.text && g((r) => ({
            ...r,
            content: e.data.response.text,
            isStreaming: !1
          }))) : ((o = e.data) == null ? void 0 : o.type) === "chain-completed" && (T("Planning completed"), M(!1), O(""), e.data.uuid && b(e.data.uuid), g((r) => ({
            ...r,
            isStreaming: !1
          }))) : e.event === "provider-event" && ((x = e.data) == null ? void 0 : x.type) === "text-delta" && (M(!1), O(""), g((r) => ({
            ...r,
            content: r.content + e.data.textDelta
          })));
          break;
        case "text-delta":
          e.content && g((r) => ({
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
          e.todos && (j(e.todos), t.onToolResult && t.onToolResult("todos", e.todos)), e.briefs && (P(e.briefs), t.onToolResult && t.onToolResult("briefs", e.briefs));
          break;
        case "finished":
          T("Stream finished"), e.uuid && b(e.uuid), (D = (k = e.result) == null ? void 0 : k.response) != null && D.text ? g((r) => ({
            ...r,
            content: e.result.response.text,
            isStreaming: !1
          })) : g((r) => ({
            ...r,
            isStreaming: !1
          }));
          break;
        case "stream-error":
          console.error("Stream error:", e.error), g((r) => ({
            ...r,
            content: `Stream Error: ${e.error}`,
            isStreaming: !1
          }));
          break;
        case "error":
          console.error("API error:", e.error), g((r) => ({
            ...r,
            content: `Error: ${e.error}`,
            isStreaming: !1
          }));
          break;
      }
    },
    [g, B, t]
  ), Y = y(
    async (e, c) => {
      if (!e.trim() || m) return;
      const E = {
        id: B(),
        role: "user",
        content: e.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: c
      };
      u((o) => [...o, E]), w(!0), T("Starting...");
      const h = B();
      J.current = h;
      const K = {
        id: h,
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      u((o) => [...o, K]);
      try {
        v.current = new AbortController();
        const o = `${l}/api/brief-planner`, x = t.endpoint === "brief-planner" ? {
          messages: [...d, E],
          promptPath: t.promptPath || "briefPlanner",
          conversationUuid: S,
          todos: F,
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
          signal: v.current.signal
        });
        if (!k.ok)
          throw new Error(`HTTP error! status: ${k.status}`);
        if (!S && t.endpoint !== "brief-planner") {
          const D = await k.json();
          b(D.conversationId);
          const r = `${l}/api/conversation/${D.conversationId}`, R = await fetch(r, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...t.apiKey && {
                Authorization: `Bearer ${t.apiKey}`
              }
            },
            body: JSON.stringify({ message: e.trim() }),
            signal: v.current.signal
          });
          if (!R.ok)
            throw new Error(`HTTP error! status: ${R.status}`);
          await Q(R);
        } else
          await Q(k);
      } catch (o) {
        o instanceof Error && o.name === "AbortError" ? console.log("Request aborted") : (console.error("Request error:", o), g((x) => ({
          ...x,
          content: `Sorry, there was an error: ${o instanceof Error ? o.message : "Unknown error"}`,
          isStreaming: !1
        })), t.onError && t.onError(
          o instanceof Error ? o : new Error("Unknown error")
        ));
      } finally {
        w(!1), T(""), M(!1), O(""), v.current = null, J.current = null;
      }
    },
    [
      m,
      B,
      d,
      S,
      F,
      _,
      N,
      a,
      t,
      l,
      g,
      q
    ]
  ), Q = y(
    async (e) => {
      var K;
      const c = (K = e.body) == null ? void 0 : K.getReader(), E = new TextDecoder();
      if (!c)
        throw new Error("No response body reader available");
      let h = "";
      for (; ; ) {
        const { done: o, value: x } = await c.read();
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
              q(R);
            } catch (R) {
              console.error("Failed to parse event:", R);
            }
          }
      }
    },
    [q]
  ), Z = y(() => {
    v.current && (v.current.abort(), w(!1), T(""), M(!1), O(""));
  }, []), ee = y(() => {
    u(s), b(null), n([]), j([]), P([]), A([]), T(""), M(!1), O(""), console.log("Chat cleared");
  }, [s]), te = ((...e) => e.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${t.mode}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`
  ), re = () => t.mode === "modal" ? /* @__PURE__ */ i("div", { className: "chat-wrapper-overlay" }) : null, ae = () => !X || !W ? null : /* @__PURE__ */ i("div", { className: "chat-wrapper__thinking", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-content", children: [
    /* @__PURE__ */ i("span", { className: "chat-wrapper__thinking-spinner" }),
    /* @__PURE__ */ i("span", { children: W })
  ] }) }), se = () => {
    var e;
    return !((e = t.features) != null && e.showToolResults) || $.length === 0 ? null : /* @__PURE__ */ f("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ i("h4", { children: "Tool Results" }),
      /* @__PURE__ */ i("div", { className: "chat-wrapper__tool-results-list", children: $.map((c) => /* @__PURE__ */ f("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ i("div", { className: "chat-wrapper__tool-result-title", children: c.title }),
        c.description && /* @__PURE__ */ i("div", { className: "chat-wrapper__tool-result-description", children: c.description }),
        /* @__PURE__ */ f("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          c.status || "completed"
        ] })
      ] }, c.id)) })
    ] });
  };
  return /* @__PURE__ */ f(ie, { children: [
    re(),
    /* @__PURE__ */ f("div", { className: te, style: t.customStyles, children: [
      /* @__PURE__ */ f("div", { className: "chat-wrapper__header", children: [
        /* @__PURE__ */ i("h2", { className: "chat-wrapper__title", children: t.appName }),
        H && /* @__PURE__ */ i("div", { className: "chat-wrapper__status", children: H })
      ] }),
      ae(),
      /* @__PURE__ */ f("div", { className: "chat-wrapper__messages", children: [
        d.map((e) => /* @__PURE__ */ f(
          "div",
          {
            className: `chat-wrapper__message chat-wrapper__message--${e.role}`,
            children: [
              /* @__PURE__ */ f("div", { className: "chat-wrapper__message-content", children: [
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
      se(),
      /* @__PURE__ */ i(
        ce,
        {
          onSend: Y,
          disabled: m,
          placeholder: t.placeholder || "Type a message...",
          value: I,
          onChange: C,
          onStop: Z,
          onClear: ee,
          showStopButton: m,
          showClearButton: d.length > 0
        }
      ),
      t.onError && /* @__PURE__ */ i("div", { className: "chat-wrapper__error-boundary" })
    ] })
  ] });
}
class le {
  constructor(t, a) {
    z(this, "baseUrl");
    z(this, "apiKey");
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
    const d = s.body.getReader(), u = new TextDecoder();
    for (; ; ) {
      const { done: I, value: C } = await d.read();
      if (I) break;
      const w = u.decode(C).split(`
`);
      for (const S of w)
        if (S.startsWith("data: ")) {
          const b = S.slice(6);
          if (b === "[DONE]") return;
          try {
            yield JSON.parse(b).content || "";
          } catch ($) {
            console.error("Failed to parse chunk:", $);
          }
        }
    }
  }
}
function fe(l, t) {
  const [a, s] = p([]), [d, u] = p(!1), [I, C] = p(null), m = U(null), w = U(new le(l, t)), S = y(async () => {
    try {
      const n = await w.current.initConversation();
      return m.current = n, n;
    } catch (n) {
      throw C(n), n;
    }
  }, []), b = y(
    async (n) => {
      m.current || await S();
      const F = {
        id: Date.now().toString(),
        role: "user",
        content: n,
        timestamp: /* @__PURE__ */ new Date()
      };
      s((_) => [..._, F]), u(!0), C(null);
      const j = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      s((_) => [..._, j]);
      try {
        const _ = w.current.streamMessage(
          m.current,
          n
        );
        for await (const P of _)
          s(
            (N) => N.map(
              (A) => A.id === j.id ? { ...A, content: A.content + P } : A
            )
          );
        s(
          (P) => P.map(
            (N) => N.id === j.id ? { ...N, isStreaming: !1 } : N
          )
        );
      } catch (_) {
        C(_), s((P) => P.filter((N) => N.id !== j.id));
      } finally {
        u(!1);
      }
    },
    [S]
  ), $ = y(() => {
    s([]), m.current = null;
  }, []);
  return {
    messages: a,
    isLoading: d,
    error: I,
    sendMessage: b,
    clearMessages: $
  };
}
export {
  me as ChatWrapper,
  fe as useChatConnection
};
