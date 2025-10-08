var pe = Object.defineProperty;
var ue = (c, t, s) => t in c ? pe(c, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : c[t] = s;
var z = (c, t, s) => ue(c, typeof t != "symbol" ? t + "" : t, s);
import { jsxs as u, jsx as r, Fragment as he } from "react/jsx-runtime";
import { useState as d, useRef as K, useCallback as f, useEffect as F } from "react";
function me({
  onSend: c,
  disabled: t,
  placeholder: s,
  value: n,
  onChange: p,
  onStop: w,
  onClear: R,
  showStopButton: N,
  showClearButton: b
}) {
  const y = () => {
    const o = n || "";
    o.trim() && !t && (c(o.trim()), p && p(""));
  };
  return /* @__PURE__ */ u("div", { className: "chat-wrapper__input", children: [
    /* @__PURE__ */ r(
      "textarea",
      {
        value: n || "",
        onChange: (o) => p ? p(o.target.value) : void 0,
        onKeyPress: (o) => {
          o.key === "Enter" && !o.shiftKey && (o.preventDefault(), y());
        },
        placeholder: s,
        disabled: t,
        className: "chat-wrapper__textarea",
        rows: 1
      }
    ),
    /* @__PURE__ */ u("div", { className: "chat-wrapper__input-buttons", children: [
      N && /* @__PURE__ */ r(
        "button",
        {
          onClick: () => {
            w && w();
          },
          className: "chat-wrapper__stop-button",
          title: "Stop generation",
          children: "Stop"
        }
      ),
      b && !t && /* @__PURE__ */ r(
        "button",
        {
          onClick: () => {
            R && R();
          },
          className: "chat-wrapper__clear-button",
          title: "Clear chat",
          children: "Clear"
        }
      ),
      /* @__PURE__ */ r(
        "button",
        {
          onClick: y,
          disabled: t || !(n != null && n.trim()),
          className: "chat-wrapper__send-button",
          children: t ? "Sending..." : "Send"
        }
      )
    ] })
  ] });
}
function ge({
  apiUrl: c,
  config: t,
  tools: s,
  initialMessages: n = []
}) {
  const [p, w] = d(n), [R, N] = d(""), [b, y] = d(!1), [_, k] = d(null), [h, o] = d(!1), [H, I] = d([]), [S, L] = d([]), [C, O] = d([]), [Q, X] = d([]), [U, E] = d(""), [Y, $] = d(!1), [W, v] = d(""), Z = K(null), J = K(null), D = K(null), B = f(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), G = f(() => {
    var e;
    (e = Z.current) == null || e.scrollIntoView({ behavior: "smooth" });
  }, []);
  F(() => {
    s && Object.keys(s).length > 0 && console.log("Available tools:", Object.keys(s));
  }, [s]), F(() => {
    G();
  }, [p, G]), F(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(U);
  }, [U, t]);
  const g = f(
    (e) => {
      const i = J.current;
      i && w(
        (T) => T.map((m) => m.id === i ? e(m) : m)
      );
    },
    []
  ), V = f(
    (e) => {
      var i, T, m, P, l, x, M, j;
      switch (console.log("Processing stream event:", e.type, e), e.type) {
        case "event":
          e.event === "latitude-event" ? ((i = e.data) == null ? void 0 : i.type) === "chain-started" ? (E("Planning chain started"), $(!0), v(
            "🔗 Starting comprehensive planning chain..."
          )) : ((T = e.data) == null ? void 0 : T.type) === "step-started" ? (E("Planning step started"), $(!0), v("📊 Executing planning step...")) : ((m = e.data) == null ? void 0 : m.type) === "provider-completed" ? (E("AI planning completed"), $(!1), v(""), (P = e.data.response) != null && P.text && g((a) => ({
            ...a,
            content: e.data.response.text,
            isStreaming: !1
          }))) : ((l = e.data) == null ? void 0 : l.type) === "chain-completed" && (E("Planning completed"), $(!1), v(""), e.data.uuid && k(e.data.uuid), g((a) => ({
            ...a,
            isStreaming: !1
          }))) : e.event === "provider-event" && ((x = e.data) == null ? void 0 : x.type) === "text-delta" && ($(!1), v(""), g((a) => ({
            ...a,
            content: a.content + e.data.textDelta
          })));
          break;
        case "text-delta":
          e.content && g((a) => ({
            ...a,
            content: a.content + e.content
          }));
          break;
        case "tool-result":
          if (console.log("Tool result received:", e), e.tool && e.data && (e.data.id || e.data.success)) {
            const a = {
              id: e.data.id || B(),
              title: e.data.title || `${e.tool} result`,
              description: e.data.description,
              status: e.data.status || "completed",
              created_at: e.data.created_at || (/* @__PURE__ */ new Date()).toISOString(),
              ...e.data
            };
            I((A) => [...A, a]);
          }
          e.todos && (L(e.todos), t.onToolResult && t.onToolResult("todos", e.todos)), e.briefs && (O(e.briefs), t.onToolResult && t.onToolResult("briefs", e.briefs));
          break;
        case "finished":
          E("Stream finished"), e.uuid && k(e.uuid), (j = (M = e.result) == null ? void 0 : M.response) != null && j.text ? g((a) => ({
            ...a,
            content: e.result.response.text,
            isStreaming: !1
          })) : g((a) => ({
            ...a,
            isStreaming: !1
          }));
          break;
        case "stream-error":
          console.error("Stream error:", e.error), g((a) => ({
            ...a,
            content: `Stream Error: ${e.error}`,
            isStreaming: !1
          }));
          break;
        case "error":
          console.error("API error:", e.error), g((a) => ({
            ...a,
            content: `Error: ${e.error}`,
            isStreaming: !1
          }));
          break;
      }
    },
    [g, B, t]
  ), ee = f(
    async (e, i) => {
      if (!e.trim() || b) return;
      const T = {
        id: B(),
        role: "user",
        content: e.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: i
      };
      w((l) => [...l, T]), y(!0), E("Starting...");
      const m = B();
      J.current = m;
      const P = {
        id: m,
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      w((l) => [...l, P]);
      try {
        D.current = new AbortController();
        const l = t.endpoint === "brief-planner" ? `${c}/api/brief-planner` : _ ? `${c}/api/conversation/${_}` : `${c}/api/conversation/init`, x = t.endpoint === "brief-planner" ? {
          messages: [...p, T],
          promptPath: t.promptPath || "briefPlanner",
          conversationUuid: _,
          todos: S,
          // Send current todos to the API
          briefs: C,
          // Send current briefs to the API
          media: i || []
          // Use media from function parameter, not uploadedMedia
        } : {
          message: e.trim(),
          tools: s ? Object.keys(s) : []
        };
        console.log("Sending request to:", l), console.log("Request payload:", JSON.stringify(x, null, 2));
        const M = await fetch(l, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...t.apiKey && { Authorization: `Bearer ${t.apiKey}` }
          },
          body: JSON.stringify(x),
          signal: D.current.signal
        });
        if (!M.ok)
          throw new Error(`HTTP error! status: ${M.status}`);
        await te(M);
      } catch (l) {
        l instanceof Error && l.name === "AbortError" ? console.log("Request aborted") : (console.error("Request error:", l), g((x) => ({
          ...x,
          content: `Sorry, there was an error: ${l instanceof Error ? l.message : "Unknown error"}`,
          isStreaming: !1
        })), t.onError && t.onError(
          l instanceof Error ? l : new Error("Unknown error")
        ));
      } finally {
        y(!1), E(""), $(!1), v(""), D.current = null, J.current = null;
      }
    },
    [
      b,
      B,
      p,
      _,
      S,
      C,
      Q,
      s,
      t,
      c,
      g,
      V
    ]
  ), te = f(
    async (e) => {
      var P;
      const i = (P = e.body) == null ? void 0 : P.getReader(), T = new TextDecoder();
      if (!i)
        throw new Error("No response body reader available");
      let m = "";
      for (; ; ) {
        const { done: l, value: x } = await i.read();
        if (l) {
          console.log("Stream completed");
          break;
        }
        m += T.decode(x, { stream: !0 });
        const M = m.split(/\r?\n/);
        m = M.pop() || "";
        for (const j of M)
          if (j.startsWith("data: ")) {
            const a = j.slice(6).trim();
            if (a === "[DONE]" || a === "")
              continue;
            try {
              const A = JSON.parse(a);
              V(A);
            } catch (A) {
              console.error("Failed to parse event:", A);
            }
          }
      }
    },
    [V]
  ), re = f(() => {
    D.current && (D.current.abort(), y(!1), E(""), $(!1), v(""));
  }, []), ae = f(() => {
    w(n), k(null), I([]), L([]), O([]), X([]), E(""), $(!1), v(""), console.log("Chat cleared");
  }, [n]), se = f(() => {
    o(!0);
  }, []), q = f(() => {
    o(!1);
  }, []);
  F(() => {
    const e = (i) => {
      i.key === "Escape" && t.mode === "modal" && h && q();
    };
    if (t.mode === "modal" && h)
      return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
  }, [t.mode, h, q]);
  const ne = ((...e) => e.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${t.mode}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`
  ), oe = () => t.mode === "modal" && h ? /* @__PURE__ */ r(
    "div",
    {
      className: "chat-wrapper-overlay",
      onClick: q
    }
  ) : null, ie = () => {
    var e;
    return t.mode === "modal" && !h ? /* @__PURE__ */ u(
      "button",
      {
        className: "chat-wrapper__bubble-button",
        onClick: se,
        title: `Open ${t.appName}`,
        children: [
          /* @__PURE__ */ u(
            "svg",
            {
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: "chat-wrapper__bubble-icon",
              children: [
                /* @__PURE__ */ r(
                  "path",
                  {
                    d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
                    fill: "currentColor"
                  }
                ),
                /* @__PURE__ */ r("circle", { cx: "7", cy: "10", r: "1", fill: "currentColor" }),
                /* @__PURE__ */ r("circle", { cx: "12", cy: "10", r: "1", fill: "currentColor" }),
                /* @__PURE__ */ r("circle", { cx: "17", cy: "10", r: "1", fill: "currentColor" })
              ]
            }
          ),
          ((e = t.features) == null ? void 0 : e.showBubbleText) !== !1 && /* @__PURE__ */ r("span", { className: "chat-wrapper__bubble-text", children: t.bubbleText || "Chat" })
        ]
      }
    ) : null;
  }, le = () => t.mode === "modal" && h ? /* @__PURE__ */ r(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: q,
      title: "Close chat",
      children: /* @__PURE__ */ r(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ r(
            "path",
            {
              d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
              fill: "currentColor"
            }
          )
        }
      )
    }
  ) : null, ce = () => !Y || !W ? null : /* @__PURE__ */ r("div", { className: "chat-wrapper__thinking", children: /* @__PURE__ */ u("div", { className: "chat-wrapper__thinking-content", children: [
    /* @__PURE__ */ r("span", { className: "chat-wrapper__thinking-spinner" }),
    /* @__PURE__ */ r("span", { children: W })
  ] }) }), de = () => {
    var e;
    return !((e = t.features) != null && e.showToolResults) || H.length === 0 ? null : /* @__PURE__ */ u("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ r("h4", { children: "Tool Results" }),
      /* @__PURE__ */ r("div", { className: "chat-wrapper__tool-results-list", children: H.map((i) => /* @__PURE__ */ u("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ r("div", { className: "chat-wrapper__tool-result-title", children: i.title }),
        i.description && /* @__PURE__ */ r("div", { className: "chat-wrapper__tool-result-description", children: i.description }),
        /* @__PURE__ */ u("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          i.status || "completed"
        ] })
      ] }, i.id)) })
    ] });
  };
  return t.mode === "modal" && !h ? ie() : /* @__PURE__ */ u(he, { children: [
    oe(),
    /* @__PURE__ */ u("div", { className: ne, style: t.customStyles, children: [
      /* @__PURE__ */ u("div", { className: "chat-wrapper__header", children: [
        /* @__PURE__ */ r("h2", { className: "chat-wrapper__title", children: t.appName }),
        le(),
        U && /* @__PURE__ */ r("div", { className: "chat-wrapper__status", children: U })
      ] }),
      ce(),
      /* @__PURE__ */ u("div", { className: "chat-wrapper__messages", children: [
        p.map((e) => /* @__PURE__ */ u(
          "div",
          {
            className: `chat-wrapper__message chat-wrapper__message--${e.role}`,
            children: [
              /* @__PURE__ */ u("div", { className: "chat-wrapper__message-content", children: [
                e.content,
                e.isStreaming && /* @__PURE__ */ r("span", { className: "chat-wrapper__streaming-indicator", children: "..." })
              ] }),
              /* @__PURE__ */ r("div", { className: "chat-wrapper__message-timestamp", children: e.timestamp.toLocaleTimeString() })
            ]
          },
          e.id
        )),
        /* @__PURE__ */ r("div", { ref: Z })
      ] }),
      de(),
      /* @__PURE__ */ r(
        me,
        {
          onSend: ee,
          disabled: b,
          placeholder: t.placeholder || "Type a message...",
          value: R,
          onChange: N,
          onStop: re,
          onClear: ae,
          showStopButton: b,
          showClearButton: p.length > 0
        }
      ),
      t.onError && /* @__PURE__ */ r("div", { className: "chat-wrapper__error-boundary" })
    ] })
  ] });
}
class fe {
  constructor(t, s) {
    z(this, "baseUrl");
    z(this, "apiKey");
    this.baseUrl = t, this.apiKey = s;
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
  async *streamMessage(t, s) {
    const n = await fetch(
      `${this.baseUrl}/api/conversation/${t}`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ message: s })
      }
    );
    if (!n.ok) throw new Error("Failed to send message");
    if (!n.body) throw new Error("No response body");
    const p = n.body.getReader(), w = new TextDecoder();
    for (; ; ) {
      const { done: R, value: N } = await p.read();
      if (R) break;
      const y = w.decode(N).split(`
`);
      for (const _ of y)
        if (_.startsWith("data: ")) {
          const k = _.slice(6);
          if (k === "[DONE]") return;
          try {
            yield JSON.parse(k).content || "";
          } catch (h) {
            console.error("Failed to parse chunk:", h);
          }
        }
    }
  }
}
function Se(c, t) {
  const [s, n] = d([]), [p, w] = d(!1), [R, N] = d(null), b = K(null), y = K(new fe(c, t)), _ = f(async () => {
    try {
      const o = await y.current.initConversation();
      return b.current = o, o;
    } catch (o) {
      throw N(o), o;
    }
  }, []), k = f(
    async (o) => {
      b.current || await _();
      const H = {
        id: Date.now().toString(),
        role: "user",
        content: o,
        timestamp: /* @__PURE__ */ new Date()
      };
      n((S) => [...S, H]), w(!0), N(null);
      const I = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      n((S) => [...S, I]);
      try {
        const S = y.current.streamMessage(
          b.current,
          o
        );
        for await (const L of S)
          n(
            (C) => C.map(
              (O) => O.id === I.id ? { ...O, content: O.content + L } : O
            )
          );
        n(
          (L) => L.map(
            (C) => C.id === I.id ? { ...C, isStreaming: !1 } : C
          )
        );
      } catch (S) {
        N(S), n((L) => L.filter((C) => C.id !== I.id));
      } finally {
        w(!1);
      }
    },
    [_]
  ), h = f(() => {
    n([]), b.current = null;
  }, []);
  return {
    messages: s,
    isLoading: p,
    error: R,
    sendMessage: k,
    clearMessages: h
  };
}
export {
  ge as ChatWrapper,
  Se as useChatConnection
};
