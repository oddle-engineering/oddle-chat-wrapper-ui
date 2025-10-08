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
  onStop: h,
  onClear: $,
  showStopButton: b,
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
      b && /* @__PURE__ */ i(
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
  const [d, h] = p(s), [$, b] = p(""), [m, w] = p(!1), [g, N] = p(null), [I, n] = p([]), [q, D] = p([]), [_, M] = p([]), [k, j] = p([]), [F, C] = p(""), [Q, P] = p(!1), [W, x] = p(""), G = U(null), J = U(null), A = U(null), K = y(
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
    t.onStreamingStatusChange && t.onStreamingStatusChange(F);
  }, [F, t]);
  const S = y(
    (e) => {
      const c = J.current;
      c && h(
        (T) => T.map((u) => u.id === c ? e(u) : u)
      );
    },
    []
  ), H = y(
    (e) => {
      var c, T, u, O, o, E, R, v;
      switch (console.log("Processing stream event:", e.type, e), e.type) {
        case "event":
          e.event === "latitude-event" ? ((c = e.data) == null ? void 0 : c.type) === "chain-started" ? (C("Planning chain started"), P(!0), x(
            "🔗 Starting comprehensive planning chain..."
          )) : ((T = e.data) == null ? void 0 : T.type) === "step-started" ? (C("Planning step started"), P(!0), x("📊 Executing planning step...")) : ((u = e.data) == null ? void 0 : u.type) === "provider-completed" ? (C("AI planning completed"), P(!1), x(""), (O = e.data.response) != null && O.text && S((r) => ({
            ...r,
            content: e.data.response.text,
            isStreaming: !1
          }))) : ((o = e.data) == null ? void 0 : o.type) === "chain-completed" && (C("Planning completed"), P(!1), x(""), e.data.uuid && N(e.data.uuid), S((r) => ({
            ...r,
            isStreaming: !1
          }))) : e.event === "provider-event" && ((E = e.data) == null ? void 0 : E.type) === "text-delta" && (P(!1), x(""), S((r) => ({
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
              id: e.data.id || K(),
              title: e.data.title || `${e.tool} result`,
              description: e.data.description,
              status: e.data.status || "completed",
              created_at: e.data.created_at || (/* @__PURE__ */ new Date()).toISOString(),
              ...e.data
            };
            n((B) => [...B, r]);
          }
          e.todos && (D(e.todos), t.onToolResult && t.onToolResult("todos", e.todos)), e.briefs && (M(e.briefs), t.onToolResult && t.onToolResult("briefs", e.briefs));
          break;
        case "finished":
          C("Stream finished"), e.uuid && N(e.uuid), (v = (R = e.result) == null ? void 0 : R.response) != null && v.text ? S((r) => ({
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
    },
    [S, K, t]
  ), X = y(
    async (e, c) => {
      if (!e.trim() || m) return;
      const T = {
        id: K(),
        role: "user",
        content: e.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: c
      };
      h((o) => [...o, T]), w(!0), C("Starting...");
      const u = K();
      J.current = u;
      const O = {
        id: u,
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      h((o) => [...o, O]);
      try {
        A.current = new AbortController();
        const o = t.endpoint === "brief-planner" ? `${l}/api/brief-planner` : g ? `${l}/api/conversation/${g}` : `${l}/api/conversation/init`, E = t.endpoint === "brief-planner" ? {
          messages: [...d, T],
          promptPath: t.promptPath || "briefPlanner",
          conversationUuid: g,
          todos: q,
          // Send current todos to the API
          briefs: _,
          // Send current briefs to the API
          media: c || []
          // Use media from function parameter, not uploadedMedia
        } : {
          message: e.trim(),
          tools: a ? Object.keys(a) : []
        };
        console.log("Sending request to:", o), console.log("Request payload:", JSON.stringify(E, null, 2));
        const R = await fetch(o, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...t.apiKey && { Authorization: `Bearer ${t.apiKey}` }
          },
          body: JSON.stringify(E),
          signal: A.current.signal
        });
        if (!R.ok)
          throw new Error(`HTTP error! status: ${R.status}`);
        await Y(R);
      } catch (o) {
        o instanceof Error && o.name === "AbortError" ? console.log("Request aborted") : (console.error("Request error:", o), S((E) => ({
          ...E,
          content: `Sorry, there was an error: ${o instanceof Error ? o.message : "Unknown error"}`,
          isStreaming: !1
        })), t.onError && t.onError(
          o instanceof Error ? o : new Error("Unknown error")
        ));
      } finally {
        w(!1), C(""), P(!1), x(""), A.current = null, J.current = null;
      }
    },
    [
      m,
      K,
      d,
      g,
      q,
      _,
      k,
      a,
      t,
      l,
      S,
      H
    ]
  ), Y = y(
    async (e) => {
      var O;
      const c = (O = e.body) == null ? void 0 : O.getReader(), T = new TextDecoder();
      if (!c)
        throw new Error("No response body reader available");
      let u = "";
      for (; ; ) {
        const { done: o, value: E } = await c.read();
        if (o) {
          console.log("Stream completed");
          break;
        }
        u += T.decode(E, { stream: !0 });
        const R = u.split(/\r?\n/);
        u = R.pop() || "";
        for (const v of R)
          if (v.startsWith("data: ")) {
            const r = v.slice(6).trim();
            if (r === "[DONE]" || r === "")
              continue;
            try {
              const B = JSON.parse(r);
              H(B);
            } catch (B) {
              console.error("Failed to parse event:", B);
            }
          }
      }
    },
    [H]
  ), Z = y(() => {
    A.current && (A.current.abort(), w(!1), C(""), P(!1), x(""));
  }, []), ee = y(() => {
    h(s), N(null), n([]), D([]), M([]), j([]), C(""), P(!1), x(""), console.log("Chat cleared");
  }, [s]), te = ((...e) => e.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${t.mode}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`
  ), re = () => t.mode === "modal" ? /* @__PURE__ */ i("div", { className: "chat-wrapper-overlay" }) : null, ae = () => !Q || !W ? null : /* @__PURE__ */ i("div", { className: "chat-wrapper__thinking", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-content", children: [
    /* @__PURE__ */ i("span", { className: "chat-wrapper__thinking-spinner" }),
    /* @__PURE__ */ i("span", { children: W })
  ] }) }), se = () => {
    var e;
    return !((e = t.features) != null && e.showToolResults) || I.length === 0 ? null : /* @__PURE__ */ f("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ i("h4", { children: "Tool Results" }),
      /* @__PURE__ */ i("div", { className: "chat-wrapper__tool-results-list", children: I.map((c) => /* @__PURE__ */ f("div", { className: "chat-wrapper__tool-result", children: [
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
        F && /* @__PURE__ */ i("div", { className: "chat-wrapper__status", children: F })
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
          onSend: X,
          disabled: m,
          placeholder: t.placeholder || "Type a message...",
          value: $,
          onChange: b,
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
    const d = s.body.getReader(), h = new TextDecoder();
    for (; ; ) {
      const { done: $, value: b } = await d.read();
      if ($) break;
      const w = h.decode(b).split(`
`);
      for (const g of w)
        if (g.startsWith("data: ")) {
          const N = g.slice(6);
          if (N === "[DONE]") return;
          try {
            yield JSON.parse(N).content || "";
          } catch (I) {
            console.error("Failed to parse chunk:", I);
          }
        }
    }
  }
}
function fe(l, t) {
  const [a, s] = p([]), [d, h] = p(!1), [$, b] = p(null), m = U(null), w = U(new le(l, t)), g = y(async () => {
    try {
      const n = await w.current.initConversation();
      return m.current = n, n;
    } catch (n) {
      throw b(n), n;
    }
  }, []), N = y(
    async (n) => {
      m.current || await g();
      const q = {
        id: Date.now().toString(),
        role: "user",
        content: n,
        timestamp: /* @__PURE__ */ new Date()
      };
      s((_) => [..._, q]), h(!0), b(null);
      const D = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      s((_) => [..._, D]);
      try {
        const _ = w.current.streamMessage(
          m.current,
          n
        );
        for await (const M of _)
          s(
            (k) => k.map(
              (j) => j.id === D.id ? { ...j, content: j.content + M } : j
            )
          );
        s(
          (M) => M.map(
            (k) => k.id === D.id ? { ...k, isStreaming: !1 } : k
          )
        );
      } catch (_) {
        b(_), s((M) => M.filter((k) => k.id !== D.id));
      } finally {
        h(!1);
      }
    },
    [g]
  ), I = y(() => {
    s([]), m.current = null;
  }, []);
  return {
    messages: a,
    isLoading: d,
    error: $,
    sendMessage: N,
    clearMessages: I
  };
}
export {
  me as ChatWrapper,
  fe as useChatConnection
};
