var k = Object.defineProperty;
var E = (r, e, t) => e in r ? k(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var b = (r, e, t) => E(r, typeof e != "symbol" ? e + "" : e, t);
import { jsx as i, jsxs as m, Fragment as K } from "react/jsx-runtime";
import { useState as N, useRef as C, useCallback as S, useEffect as O } from "react";
class $ {
  constructor(e, t) {
    b(this, "baseUrl");
    b(this, "apiKey");
    this.baseUrl = e, this.apiKey = t;
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
  async *streamMessage(e, t) {
    const a = await fetch(
      `${this.baseUrl}/api/conversation/${e}`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ message: t })
      }
    );
    if (!a.ok) throw new Error("Failed to send message");
    if (!a.body) throw new Error("No response body");
    const o = a.body.getReader(), s = new TextDecoder();
    for (; ; ) {
      const { done: u, value: n } = await o.read();
      if (u) break;
      const w = s.decode(n).split(`
`);
      for (const d of w)
        if (d.startsWith("data: ")) {
          const f = d.slice(6);
          if (f === "[DONE]") return;
          try {
            yield JSON.parse(f).content || "";
          } catch (v) {
            console.error("Failed to parse chunk:", v);
          }
        }
    }
  }
}
function j(r, e) {
  const [t, a] = N([]), [o, s] = N(!1), [u, n] = N(null), l = C(null), w = C(new $(r, e)), d = S(async () => {
    try {
      const c = await w.current.initConversation();
      return l.current = c, c;
    } catch (c) {
      throw n(c), c;
    }
  }, []), f = S(
    async (c) => {
      l.current || await d();
      const M = {
        id: Date.now().toString(),
        role: "user",
        content: c,
        timestamp: /* @__PURE__ */ new Date()
      };
      a((p) => [...p, M]), s(!0), n(null);
      const _ = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      a((p) => [...p, _]);
      try {
        const p = w.current.streamMessage(
          l.current,
          c
        );
        for await (const y of p)
          a(
            (h) => h.map(
              (g) => g.id === _.id ? { ...g, content: g.content + y } : g
            )
          );
        a(
          (y) => y.map(
            (h) => h.id === _.id ? { ...h, isStreaming: !1 } : h
          )
        );
      } catch (p) {
        n(p), a((y) => y.filter((h) => h.id !== _.id));
      } finally {
        s(!1);
      }
    },
    [d]
  ), v = S(() => {
    a([]), l.current = null;
  }, []);
  return {
    messages: t,
    isLoading: o,
    error: u,
    sendMessage: f,
    clearMessages: v
  };
}
function D({ messages: r }) {
  return /* @__PURE__ */ i("div", { className: "chat-wrapper__messages", children: r.map((e) => /* @__PURE__ */ m(
    "div",
    {
      className: `chat-wrapper__message chat-wrapper__message--${e.role}`,
      children: [
        /* @__PURE__ */ m("div", { className: "chat-wrapper__message-content", children: [
          e.content,
          e.isStreaming && /* @__PURE__ */ i("span", { className: "chat-wrapper__streaming-indicator", children: "..." })
        ] }),
        /* @__PURE__ */ i("div", { className: "chat-wrapper__message-timestamp", children: e.timestamp.toLocaleTimeString() })
      ]
    },
    e.id
  )) });
}
function x({ onSend: r, disabled: e, placeholder: t }) {
  const [a, o] = N(""), s = () => {
    a.trim() && !e && (r(a.trim()), o(""));
  };
  return /* @__PURE__ */ m("div", { className: "chat-wrapper__input", children: [
    /* @__PURE__ */ i(
      "textarea",
      {
        value: a,
        onChange: (n) => o(n.target.value),
        onKeyPress: (n) => {
          n.key === "Enter" && !n.shiftKey && (n.preventDefault(), s());
        },
        placeholder: t,
        disabled: e,
        className: "chat-wrapper__textarea",
        rows: 1
      }
    ),
    /* @__PURE__ */ i(
      "button",
      {
        onClick: s,
        disabled: e || !a.trim(),
        className: "chat-wrapper__send-button",
        children: "Send"
      }
    )
  ] });
}
function L({ apiUrl: r, config: e, tools: t }) {
  const { messages: a, isLoading: o, error: s, sendMessage: u } = j(
    r,
    e.apiKey
  );
  t && Object.keys(t).length > 0 && console.log("Available tools:", Object.keys(t)), O(() => {
    e.onError && s && e.onError(s);
  }, [s, e]);
  const l = ((...d) => d.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${e.mode}`,
    e.position && `chat-wrapper--${e.position}`,
    e.theme && `chat-wrapper--${e.theme}`
  );
  return /* @__PURE__ */ m(K, { children: [
    e.mode === "modal" ? /* @__PURE__ */ i("div", { className: "chat-wrapper-overlay" }) : null,
    /* @__PURE__ */ m("div", { className: l, style: e.customStyles, children: [
      /* @__PURE__ */ i("div", { className: "chat-wrapper__header", children: /* @__PURE__ */ i("h2", { className: "chat-wrapper__title", children: e.appName }) }),
      /* @__PURE__ */ i(D, { messages: a }),
      /* @__PURE__ */ i(
        x,
        {
          onSend: u,
          disabled: o,
          placeholder: e.placeholder || "Type a message..."
        }
      ),
      s && /* @__PURE__ */ m("div", { className: "chat-wrapper__error", children: [
        "Error: ",
        s.message
      ] })
    ] })
  ] });
}
export {
  L as ChatWrapper,
  j as useChatConnection
};
