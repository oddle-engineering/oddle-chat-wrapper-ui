var k = Object.defineProperty;
var K = (e, t, a) => t in e ? k(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var S = (e, t, a) => K(e, typeof t != "symbol" ? t + "" : t, a);
import { jsx as o, jsxs as m } from "react/jsx-runtime";
import { useState as N, useRef as C, useCallback as b, useEffect as $ } from "react";
class x {
  constructor(t, a) {
    S(this, "baseUrl");
    S(this, "apiKey");
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
    const r = await fetch(
      `${this.baseUrl}/api/conversation/${t}`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ message: a })
      }
    );
    if (!r.ok) throw new Error("Failed to send message");
    if (!r.body) throw new Error("No response body");
    const s = r.body.getReader(), i = new TextDecoder();
    for (; ; ) {
      const { done: w, value: n } = await s.read();
      if (w) break;
      const f = i.decode(n).split(`
`);
      for (const h of f)
        if (h.startsWith("data: ")) {
          const y = h.slice(6);
          if (y === "[DONE]") return;
          try {
            yield JSON.parse(y).content || "";
          } catch (_) {
            console.error("Failed to parse chunk:", _);
          }
        }
    }
  }
}
function D(e, t) {
  const [a, r] = N([]), [s, i] = N(!1), [w, n] = N(null), p = C(null), f = C(new x(e, t)), h = b(async () => {
    try {
      const c = await f.current.initConversation();
      return p.current = c, c;
    } catch (c) {
      throw n(c), c;
    }
  }, []), y = b(
    async (c) => {
      p.current || await h();
      const M = {
        id: Date.now().toString(),
        role: "user",
        content: c,
        timestamp: /* @__PURE__ */ new Date()
      };
      r((l) => [...l, M]), i(!0), n(null);
      const g = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      r((l) => [...l, g]);
      try {
        const l = f.current.streamMessage(
          p.current,
          c
        );
        for await (const u of l)
          r(
            (d) => d.map(
              (v) => v.id === g.id ? { ...v, content: v.content + u } : v
            )
          );
        r(
          (u) => u.map(
            (d) => d.id === g.id ? { ...d, isStreaming: !1 } : d
          )
        );
      } catch (l) {
        n(l), r((u) => u.filter((d) => d.id !== g.id));
      } finally {
        i(!1);
      }
    },
    [h]
  ), _ = b(() => {
    r([]), p.current = null;
  }, []);
  return {
    messages: a,
    isLoading: s,
    error: w,
    sendMessage: y,
    clearMessages: _
  };
}
function P({ messages: e }) {
  return /* @__PURE__ */ o("div", { className: "chat-wrapper__messages", children: e.map((t) => /* @__PURE__ */ m(
    "div",
    {
      className: `chat-wrapper__message chat-wrapper__message--${t.role}`,
      children: [
        /* @__PURE__ */ m("div", { className: "chat-wrapper__message-content", children: [
          t.content,
          t.isStreaming && /* @__PURE__ */ o("span", { className: "chat-wrapper__streaming-indicator", children: "..." })
        ] }),
        /* @__PURE__ */ o("div", { className: "chat-wrapper__message-timestamp", children: t.timestamp.toLocaleTimeString() })
      ]
    },
    t.id
  )) });
}
function T({ onSend: e, disabled: t, placeholder: a }) {
  const [r, s] = N(""), i = () => {
    r.trim() && !t && (e(r.trim()), s(""));
  };
  return /* @__PURE__ */ m("div", { className: "chat-wrapper__input", children: [
    /* @__PURE__ */ o(
      "textarea",
      {
        value: r,
        onChange: (n) => s(n.target.value),
        onKeyPress: (n) => {
          n.key === "Enter" && !n.shiftKey && (n.preventDefault(), i());
        },
        placeholder: a,
        disabled: t,
        className: "chat-wrapper__textarea",
        rows: 1
      }
    ),
    /* @__PURE__ */ o(
      "button",
      {
        onClick: i,
        disabled: t || !r.trim(),
        className: "chat-wrapper__send-button",
        children: "Send"
      }
    )
  ] });
}
function E(e) {
  var t, a, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var s = e.length;
    for (t = 0; t < s; t++) e[t] && (a = E(e[t])) && (r && (r += " "), r += a);
  } else for (a in e) e[a] && (r && (r += " "), r += a);
  return r;
}
function j() {
  for (var e, t, a = 0, r = "", s = arguments.length; a < s; a++) (e = arguments[a]) && (t = E(e)) && (r && (r += " "), r += t);
  return r;
}
function A(e) {
  const { messages: t, isLoading: a, error: r, sendMessage: s } = D(
    e.apiEndpoint,
    e.apiKey
  );
  $(() => {
    e.onError && r && e.onError(r);
  }, [r, e]);
  const i = j(
    "chat-wrapper",
    `chat-wrapper--${e.mode}`,
    e.position && `chat-wrapper--${e.position}`,
    e.theme && `chat-wrapper--${e.theme}`
  );
  return /* @__PURE__ */ m("div", { className: i, style: e.customStyles, children: [
    /* @__PURE__ */ o("div", { className: "chat-wrapper__header", children: /* @__PURE__ */ o("h2", { className: "chat-wrapper__title", children: e.appName }) }),
    /* @__PURE__ */ o(P, { messages: t }),
    /* @__PURE__ */ o(
      T,
      {
        onSend: s,
        disabled: a,
        placeholder: e.placeholder || "Type a message..."
      }
    ),
    r && /* @__PURE__ */ m("div", { className: "chat-wrapper__error", children: [
      "Error: ",
      r.message
    ] })
  ] });
}
export {
  A as ChatWrapper,
  D as useChatConnection
};
