var k = Object.defineProperty;
var E = (r, e, a) => e in r ? k(r, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : r[e] = a;
var S = (r, e, a) => E(r, typeof e != "symbol" ? e + "" : e, a);
import { jsx as i, jsxs as u, Fragment as K } from "react/jsx-runtime";
import { useState as N, useRef as C, useCallback as b, useEffect as $ } from "react";
class D {
  constructor(e, a) {
    S(this, "baseUrl");
    S(this, "apiKey");
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
    const t = await fetch(
      `${this.baseUrl}/api/conversation/${e}`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ message: a })
      }
    );
    if (!t.ok) throw new Error("Failed to send message");
    if (!t.body) throw new Error("No response body");
    const n = t.body.getReader(), o = new TextDecoder();
    for (; ; ) {
      const { done: m, value: s } = await n.read();
      if (m) break;
      const h = o.decode(s).split(`
`);
      for (const w of h)
        if (w.startsWith("data: ")) {
          const f = w.slice(6);
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
function O(r, e) {
  const [a, t] = N([]), [n, o] = N(!1), [m, s] = N(null), p = C(null), h = C(new D(r, e)), w = b(async () => {
    try {
      const c = await h.current.initConversation();
      return p.current = c, c;
    } catch (c) {
      throw s(c), c;
    }
  }, []), f = b(
    async (c) => {
      p.current || await w();
      const M = {
        id: Date.now().toString(),
        role: "user",
        content: c,
        timestamp: /* @__PURE__ */ new Date()
      };
      t((l) => [...l, M]), o(!0), s(null);
      const _ = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      t((l) => [...l, _]);
      try {
        const l = h.current.streamMessage(
          p.current,
          c
        );
        for await (const y of l)
          t(
            (d) => d.map(
              (g) => g.id === _.id ? { ...g, content: g.content + y } : g
            )
          );
        t(
          (y) => y.map(
            (d) => d.id === _.id ? { ...d, isStreaming: !1 } : d
          )
        );
      } catch (l) {
        s(l), t((y) => y.filter((d) => d.id !== _.id));
      } finally {
        o(!1);
      }
    },
    [w]
  ), v = b(() => {
    t([]), p.current = null;
  }, []);
  return {
    messages: a,
    isLoading: n,
    error: m,
    sendMessage: f,
    clearMessages: v
  };
}
function x({ messages: r }) {
  return /* @__PURE__ */ i("div", { className: "chat-wrapper__messages", children: r.map((e) => /* @__PURE__ */ u(
    "div",
    {
      className: `chat-wrapper__message chat-wrapper__message--${e.role}`,
      children: [
        /* @__PURE__ */ u("div", { className: "chat-wrapper__message-content", children: [
          e.content,
          e.isStreaming && /* @__PURE__ */ i("span", { className: "chat-wrapper__streaming-indicator", children: "..." })
        ] }),
        /* @__PURE__ */ i("div", { className: "chat-wrapper__message-timestamp", children: e.timestamp.toLocaleTimeString() })
      ]
    },
    e.id
  )) });
}
function P({ onSend: r, disabled: e, placeholder: a }) {
  const [t, n] = N(""), o = () => {
    t.trim() && !e && (r(t.trim()), n(""));
  };
  return /* @__PURE__ */ u("div", { className: "chat-wrapper__input", children: [
    /* @__PURE__ */ i(
      "textarea",
      {
        value: t,
        onChange: (s) => n(s.target.value),
        onKeyPress: (s) => {
          s.key === "Enter" && !s.shiftKey && (s.preventDefault(), o());
        },
        placeholder: a,
        disabled: e,
        className: "chat-wrapper__textarea",
        rows: 1
      }
    ),
    /* @__PURE__ */ i(
      "button",
      {
        onClick: o,
        disabled: e || !t.trim(),
        className: "chat-wrapper__send-button",
        children: "Send"
      }
    )
  ] });
}
function L({ apiUrl: r, config: e }) {
  const { messages: a, isLoading: t, error: n, sendMessage: o } = O(
    r,
    e.apiKey
  );
  $(() => {
    e.onError && n && e.onError(n);
  }, [n, e]);
  const s = ((...h) => h.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${e.mode}`,
    e.position && `chat-wrapper--${e.position}`,
    e.theme && `chat-wrapper--${e.theme}`
  );
  return /* @__PURE__ */ u(K, { children: [
    e.mode === "modal" ? /* @__PURE__ */ i("div", { className: "chat-wrapper-overlay" }) : null,
    /* @__PURE__ */ u("div", { className: s, style: e.customStyles, children: [
      /* @__PURE__ */ i("div", { className: "chat-wrapper__header", children: /* @__PURE__ */ i("h2", { className: "chat-wrapper__title", children: e.appName }) }),
      /* @__PURE__ */ i(x, { messages: a }),
      /* @__PURE__ */ i(
        P,
        {
          onSend: o,
          disabled: t,
          placeholder: e.placeholder || "Type a message..."
        }
      ),
      n && /* @__PURE__ */ u("div", { className: "chat-wrapper__error", children: [
        "Error: ",
        n.message
      ] })
    ] })
  ] });
}
export {
  L as ChatWrapper,
  O as useChatConnection
};
