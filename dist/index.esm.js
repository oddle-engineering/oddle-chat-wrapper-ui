var ne = Object.defineProperty;
var oe = (l, t, n) => t in l ? ne(l, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : l[t] = n;
var z = (l, t, n) => oe(l, typeof t != "symbol" ? t + "" : t, n);
import { jsxs as f, jsx as i, Fragment as ie } from "react/jsx-runtime";
import { useState as p, useRef as B, useCallback as y, useEffect as L } from "react";
function ce({
  onSend: l,
  disabled: t,
  placeholder: n,
  value: a,
  onChange: d,
  onStop: h,
  onClear: I,
  showStopButton: k,
  showClearButton: m
}) {
  const w = () => {
    const s = a || "";
    s.trim() && !t && (l(s.trim()), d && d(""));
  };
  return /* @__PURE__ */ f("div", { className: "chat-wrapper__input", children: [
    /* @__PURE__ */ i(
      "textarea",
      {
        value: a || "",
        onChange: (s) => d ? d(s.target.value) : void 0,
        onKeyPress: (s) => {
          s.key === "Enter" && !s.shiftKey && (s.preventDefault(), w());
        },
        placeholder: n,
        disabled: t,
        className: "chat-wrapper__textarea",
        rows: 1
      }
    ),
    /* @__PURE__ */ f("div", { className: "chat-wrapper__input-buttons", children: [
      k && /* @__PURE__ */ i(
        "button",
        {
          onClick: () => {
            h && h();
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
          disabled: t || !(a != null && a.trim()),
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
  tools: n,
  initialMessages: a = []
}) {
  const [d, h] = p(a), [I, k] = p(""), [m, w] = p(!1), [S, _] = p(null), [P, s] = p([]), [J, v] = p([]), [b, M] = p([]), [C, j] = p([]), [q, T] = p(""), [X, O] = p(!1), [W, x] = p(""), G = B(null), F = B(null), A = B(null), U = y(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), V = y(() => {
    var e;
    (e = G.current) == null || e.scrollIntoView({ behavior: "smooth" });
  }, []);
  L(() => {
    n && Object.keys(n).length > 0 && console.log("Available tools:", Object.keys(n));
  }, [n]), L(() => {
    V();
  }, [d, V]), L(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(q);
  }, [q, t]);
  const g = y(
    (e) => {
      const c = F.current;
      c && h(
        (E) => E.map((u) => u.id === c ? e(u) : u)
      );
    },
    []
  ), H = y(
    (e) => {
      var c, E, u, K, o, R, N, D;
      switch (console.log("Processing stream event:", e.type, e), e.type) {
        case "event":
          e.event === "latitude-event" ? ((c = e.data) == null ? void 0 : c.type) === "chain-started" ? (T("Planning chain started"), O(!0), x(
            "🔗 Starting comprehensive planning chain..."
          )) : ((E = e.data) == null ? void 0 : E.type) === "step-started" ? (T("Planning step started"), O(!0), x("📊 Executing planning step...")) : ((u = e.data) == null ? void 0 : u.type) === "provider-completed" ? (T("AI planning completed"), O(!1), x(""), (K = e.data.response) != null && K.text && g((r) => ({
            ...r,
            content: e.data.response.text,
            isStreaming: !1
          }))) : ((o = e.data) == null ? void 0 : o.type) === "chain-completed" && (T("Planning completed"), O(!1), x(""), e.data.uuid && _(e.data.uuid), g((r) => ({
            ...r,
            isStreaming: !1
          }))) : e.event === "provider-event" && ((R = e.data) == null ? void 0 : R.type) === "text-delta" && (O(!1), x(""), g((r) => ({
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
              id: e.data.id || U(),
              title: e.data.title || `${e.tool} result`,
              description: e.data.description,
              status: e.data.status || "completed",
              created_at: e.data.created_at || (/* @__PURE__ */ new Date()).toISOString(),
              ...e.data
            };
            s(($) => [...$, r]);
          }
          e.todos && (v(e.todos), t.onToolResult && t.onToolResult("todos", e.todos)), e.briefs && (M(e.briefs), t.onToolResult && t.onToolResult("briefs", e.briefs));
          break;
        case "finished":
          T("Stream finished"), e.uuid && _(e.uuid), (D = (N = e.result) == null ? void 0 : N.response) != null && D.text ? g((r) => ({
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
    [g, U, t]
  ), Y = y(
    async (e, c) => {
      if (!e.trim() || m) return;
      const E = {
        id: U(),
        role: "user",
        content: e.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: c
      };
      h((o) => [...o, E]), w(!0), T("Starting...");
      const u = U();
      F.current = u;
      const K = {
        id: u,
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      h((o) => [...o, K]);
      try {
        A.current = new AbortController();
        const o = `${l}/api/brief-planner`, R = {
          messages: [...d, E],
          promptPath: t.promptPath || "briefPlanner",
          conversationUuid: S,
          todos: J,
          // Send current todos to the API
          briefs: b,
          // Send current briefs to the API
          media: c || []
          // Use media from function parameter, not uploadedMedia
        };
        console.log("Sending request to:", o), console.log("Request payload:", JSON.stringify(R, null, 2));
        const N = await fetch(o, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...t.apiKey && { Authorization: `Bearer ${t.apiKey}` }
          },
          body: JSON.stringify(R),
          signal: A.current.signal
        });
        if (!N.ok)
          throw new Error(`HTTP error! status: ${N.status}`);
        if (!S && t.endpoint !== "brief-planner") {
          const D = await N.json();
          _(D.conversationId);
          const r = `${l}/api/conversation/${D.conversationId}`, $ = await fetch(r, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...t.apiKey && {
                Authorization: `Bearer ${t.apiKey}`
              }
            },
            body: JSON.stringify({ message: e.trim() }),
            signal: A.current.signal
          });
          if (!$.ok)
            throw new Error(`HTTP error! status: ${$.status}`);
          await Q($);
        } else
          await Q(N);
      } catch (o) {
        o instanceof Error && o.name === "AbortError" ? console.log("Request aborted") : (console.error("Request error:", o), g((R) => ({
          ...R,
          content: `Sorry, there was an error: ${o instanceof Error ? o.message : "Unknown error"}`,
          isStreaming: !1
        })), t.onError && t.onError(
          o instanceof Error ? o : new Error("Unknown error")
        ));
      } finally {
        w(!1), T(""), O(!1), x(""), A.current = null, F.current = null;
      }
    },
    [
      m,
      U,
      d,
      S,
      J,
      b,
      C,
      n,
      t,
      l,
      g,
      H
    ]
  ), Q = y(
    async (e) => {
      var K;
      const c = (K = e.body) == null ? void 0 : K.getReader(), E = new TextDecoder();
      if (!c)
        throw new Error("No response body reader available");
      let u = "";
      for (; ; ) {
        const { done: o, value: R } = await c.read();
        if (o) {
          console.log("Stream completed");
          break;
        }
        u += E.decode(R, { stream: !0 });
        const N = u.split(/\r?\n/);
        u = N.pop() || "";
        for (const D of N)
          if (D.startsWith("data: ")) {
            const r = D.slice(6).trim();
            if (r === "[DONE]" || r === "")
              continue;
            try {
              const $ = JSON.parse(r);
              H($);
            } catch ($) {
              console.error("Failed to parse event:", $);
            }
          }
      }
    },
    [H]
  ), Z = y(() => {
    A.current && (A.current.abort(), w(!1), T(""), O(!1), x(""));
  }, []), ee = y(() => {
    h(a), _(null), s([]), v([]), M([]), j([]), T(""), O(!1), x(""), console.log("Chat cleared");
  }, [a]), te = ((...e) => e.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${t.mode}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`
  ), re = () => t.mode === "modal" ? /* @__PURE__ */ i("div", { className: "chat-wrapper-overlay" }) : null, ae = () => !X || !W ? null : /* @__PURE__ */ i("div", { className: "chat-wrapper__thinking", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-content", children: [
    /* @__PURE__ */ i("span", { className: "chat-wrapper__thinking-spinner" }),
    /* @__PURE__ */ i("span", { children: W })
  ] }) }), se = () => {
    var e;
    return !((e = t.features) != null && e.showToolResults) || P.length === 0 ? null : /* @__PURE__ */ f("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ i("h4", { children: "Tool Results" }),
      /* @__PURE__ */ i("div", { className: "chat-wrapper__tool-results-list", children: P.map((c) => /* @__PURE__ */ f("div", { className: "chat-wrapper__tool-result", children: [
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
        q && /* @__PURE__ */ i("div", { className: "chat-wrapper__status", children: q })
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
          onChange: k,
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
  constructor(t, n) {
    z(this, "baseUrl");
    z(this, "apiKey");
    this.baseUrl = t, this.apiKey = n;
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
  async *streamMessage(t, n) {
    const a = await fetch(
      `${this.baseUrl}/api/conversation/${t}`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ message: n })
      }
    );
    if (!a.ok) throw new Error("Failed to send message");
    if (!a.body) throw new Error("No response body");
    const d = a.body.getReader(), h = new TextDecoder();
    for (; ; ) {
      const { done: I, value: k } = await d.read();
      if (I) break;
      const w = h.decode(k).split(`
`);
      for (const S of w)
        if (S.startsWith("data: ")) {
          const _ = S.slice(6);
          if (_ === "[DONE]") return;
          try {
            yield JSON.parse(_).content || "";
          } catch (P) {
            console.error("Failed to parse chunk:", P);
          }
        }
    }
  }
}
function fe(l, t) {
  const [n, a] = p([]), [d, h] = p(!1), [I, k] = p(null), m = B(null), w = B(new le(l, t)), S = y(async () => {
    try {
      const s = await w.current.initConversation();
      return m.current = s, s;
    } catch (s) {
      throw k(s), s;
    }
  }, []), _ = y(
    async (s) => {
      m.current || await S();
      const J = {
        id: Date.now().toString(),
        role: "user",
        content: s,
        timestamp: /* @__PURE__ */ new Date()
      };
      a((b) => [...b, J]), h(!0), k(null);
      const v = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      a((b) => [...b, v]);
      try {
        const b = w.current.streamMessage(
          m.current,
          s
        );
        for await (const M of b)
          a(
            (C) => C.map(
              (j) => j.id === v.id ? { ...j, content: j.content + M } : j
            )
          );
        a(
          (M) => M.map(
            (C) => C.id === v.id ? { ...C, isStreaming: !1 } : C
          )
        );
      } catch (b) {
        k(b), a((M) => M.filter((C) => C.id !== v.id));
      } finally {
        h(!1);
      }
    },
    [S]
  ), P = y(() => {
    a([]), m.current = null;
  }, []);
  return {
    messages: n,
    isLoading: d,
    error: I,
    sendMessage: _,
    clearMessages: P
  };
}
export {
  me as ChatWrapper,
  fe as useChatConnection
};
