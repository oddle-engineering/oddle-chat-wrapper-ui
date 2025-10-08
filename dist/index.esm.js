var hr = Object.defineProperty;
var mr = (i, a, l) => a in i ? hr(i, a, { enumerable: !0, configurable: !0, writable: !0, value: l }) : i[a] = l;
var te = (i, a, l) => mr(i, typeof a != "symbol" ? a + "" : a, l);
import Fe, { useState as q, useRef as Pe, useCallback as ae, useEffect as yr } from "react";
var ne = { exports: {} }, Y = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ke;
function gr() {
  if (ke) return Y;
  ke = 1;
  var i = Fe, a = Symbol.for("react.element"), l = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, g = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, b = { key: !0, ref: !0, __self: !0, __source: !0 };
  function j(m, v, x) {
    var y, E = {}, S = null, T = null;
    x !== void 0 && (S = "" + x), v.key !== void 0 && (S = "" + v.key), v.ref !== void 0 && (T = v.ref);
    for (y in v) o.call(v, y) && !b.hasOwnProperty(y) && (E[y] = v[y]);
    if (m && m.defaultProps) for (y in v = m.defaultProps, v) E[y] === void 0 && (E[y] = v[y]);
    return { $$typeof: a, type: m, key: S, ref: T, props: E, _owner: g.current };
  }
  return Y.Fragment = l, Y.jsx = j, Y.jsxs = j, Y;
}
var L = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var De;
function _r() {
  return De || (De = 1, process.env.NODE_ENV !== "production" && function() {
    var i = Fe, a = Symbol.for("react.element"), l = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), j = Symbol.for("react.provider"), m = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), y = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), T = Symbol.for("react.offscreen"), U = Symbol.iterator, A = "@@iterator";
    function P(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = U && e[U] || e[A];
      return typeof r == "function" ? r : null;
    }
    var C = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function d(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        $("error", e, t);
      }
    }
    function $(e, r, t) {
      {
        var n = C.ReactDebugCurrentFrame, c = n.getStackAddendum();
        c !== "" && (r += "%s", t = t.concat([c]));
        var f = t.map(function(u) {
          return String(u);
        });
        f.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, f);
      }
    }
    var $e = !1, Ie = !1, Ne = !1, Me = !1, We = !1, ie;
    ie = Symbol.for("react.module.reference");
    function Ye(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === o || e === b || We || e === g || e === x || e === y || Me || e === T || $e || Ie || Ne || typeof e == "object" && e !== null && (e.$$typeof === S || e.$$typeof === E || e.$$typeof === j || e.$$typeof === m || e.$$typeof === v || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ie || e.getModuleId !== void 0));
    }
    function Le(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var c = r.displayName || r.name || "";
      return c !== "" ? t + "(" + c + ")" : t;
    }
    function oe(e) {
      return e.displayName || "Context";
    }
    function k(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && d("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case o:
          return "Fragment";
        case l:
          return "Portal";
        case b:
          return "Profiler";
        case g:
          return "StrictMode";
        case x:
          return "Suspense";
        case y:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case m:
            var r = e;
            return oe(r) + ".Consumer";
          case j:
            var t = e;
            return oe(t._context) + ".Provider";
          case v:
            return Le(e, e.render, "ForwardRef");
          case E:
            var n = e.displayName || null;
            return n !== null ? n : k(e.type) || "Memo";
          case S: {
            var c = e, f = c._payload, u = c._init;
            try {
              return k(u(f));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var D = Object.assign, M = 0, se, ue, ce, le, fe, de, ve;
    function pe() {
    }
    pe.__reactDisabledLog = !0;
    function Ue() {
      {
        if (M === 0) {
          se = console.log, ue = console.info, ce = console.warn, le = console.error, fe = console.group, de = console.groupCollapsed, ve = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: pe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        M++;
      }
    }
    function Ve() {
      {
        if (M--, M === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: D({}, e, {
              value: se
            }),
            info: D({}, e, {
              value: ue
            }),
            warn: D({}, e, {
              value: ce
            }),
            error: D({}, e, {
              value: le
            }),
            group: D({}, e, {
              value: fe
            }),
            groupCollapsed: D({}, e, {
              value: de
            }),
            groupEnd: D({}, e, {
              value: ve
            })
          });
        }
        M < 0 && d("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var z = C.ReactCurrentDispatcher, G;
    function V(e, r, t) {
      {
        if (G === void 0)
          try {
            throw Error();
          } catch (c) {
            var n = c.stack.trim().match(/\n( *(at )?)/);
            G = n && n[1] || "";
          }
        return `
` + G + e;
      }
    }
    var H = !1, K;
    {
      var Ke = typeof WeakMap == "function" ? WeakMap : Map;
      K = new Ke();
    }
    function he(e, r) {
      if (!e || H)
        return "";
      {
        var t = K.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      H = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var f;
      f = z.current, z.current = null, Ue();
      try {
        if (r) {
          var u = function() {
            throw Error();
          };
          if (Object.defineProperty(u.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(u, []);
            } catch (R) {
              n = R;
            }
            Reflect.construct(e, [], u);
          } else {
            try {
              u.call();
            } catch (R) {
              n = R;
            }
            e.call(u.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (R) {
            n = R;
          }
          e();
        }
      } catch (R) {
        if (R && n && typeof R.stack == "string") {
          for (var s = R.stack.split(`
`), _ = n.stack.split(`
`), p = s.length - 1, h = _.length - 1; p >= 1 && h >= 0 && s[p] !== _[h]; )
            h--;
          for (; p >= 1 && h >= 0; p--, h--)
            if (s[p] !== _[h]) {
              if (p !== 1 || h !== 1)
                do
                  if (p--, h--, h < 0 || s[p] !== _[h]) {
                    var O = `
` + s[p].replace(" at new ", " at ");
                    return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), typeof e == "function" && K.set(e, O), O;
                  }
                while (p >= 1 && h >= 0);
              break;
            }
        }
      } finally {
        H = !1, z.current = f, Ve(), Error.prepareStackTrace = c;
      }
      var N = e ? e.displayName || e.name : "", F = N ? V(N) : "";
      return typeof e == "function" && K.set(e, F), F;
    }
    function Je(e, r, t) {
      return he(e, !1);
    }
    function Be(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function J(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return he(e, Be(e));
      if (typeof e == "string")
        return V(e);
      switch (e) {
        case x:
          return V("Suspense");
        case y:
          return V("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case v:
            return Je(e.render);
          case E:
            return J(e.type, r, t);
          case S: {
            var n = e, c = n._payload, f = n._init;
            try {
              return J(f(c), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var W = Object.prototype.hasOwnProperty, me = {}, ye = C.ReactDebugCurrentFrame;
    function B(e) {
      if (e) {
        var r = e._owner, t = J(e.type, e._source, r ? r.type : null);
        ye.setExtraStackFrame(t);
      } else
        ye.setExtraStackFrame(null);
    }
    function qe(e, r, t, n, c) {
      {
        var f = Function.call.bind(W);
        for (var u in e)
          if (f(e, u)) {
            var s = void 0;
            try {
              if (typeof e[u] != "function") {
                var _ = Error((n || "React class") + ": " + t + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw _.name = "Invariant Violation", _;
              }
              s = e[u](r, u, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (p) {
              s = p;
            }
            s && !(s instanceof Error) && (B(c), d("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, u, typeof s), B(null)), s instanceof Error && !(s.message in me) && (me[s.message] = !0, B(c), d("Failed %s type: %s", t, s.message), B(null));
          }
      }
    }
    var ze = Array.isArray;
    function X(e) {
      return ze(e);
    }
    function Ge(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function He(e) {
      try {
        return ge(e), !1;
      } catch {
        return !0;
      }
    }
    function ge(e) {
      return "" + e;
    }
    function _e(e) {
      if (He(e))
        return d("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ge(e)), ge(e);
    }
    var be = C.ReactCurrentOwner, Xe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ee, Re;
    function Ze(e) {
      if (W.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Qe(e) {
      if (W.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function er(e, r) {
      typeof e.ref == "string" && be.current;
    }
    function rr(e, r) {
      {
        var t = function() {
          Ee || (Ee = !0, d("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function tr(e, r) {
      {
        var t = function() {
          Re || (Re = !0, d("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var ar = function(e, r, t, n, c, f, u) {
      var s = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: u,
        // Record the component responsible for creating this element.
        _owner: f
      };
      return s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(s, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: c
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function nr(e, r, t, n, c) {
      {
        var f, u = {}, s = null, _ = null;
        t !== void 0 && (_e(t), s = "" + t), Qe(r) && (_e(r.key), s = "" + r.key), Ze(r) && (_ = r.ref, er(r, c));
        for (f in r)
          W.call(r, f) && !Xe.hasOwnProperty(f) && (u[f] = r[f]);
        if (e && e.defaultProps) {
          var p = e.defaultProps;
          for (f in p)
            u[f] === void 0 && (u[f] = p[f]);
        }
        if (s || _) {
          var h = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && rr(u, h), _ && tr(u, h);
        }
        return ar(e, s, _, c, n, be.current, u);
      }
    }
    var Z = C.ReactCurrentOwner, we = C.ReactDebugCurrentFrame;
    function I(e) {
      if (e) {
        var r = e._owner, t = J(e.type, e._source, r ? r.type : null);
        we.setExtraStackFrame(t);
      } else
        we.setExtraStackFrame(null);
    }
    var Q;
    Q = !1;
    function ee(e) {
      return typeof e == "object" && e !== null && e.$$typeof === a;
    }
    function Te() {
      {
        if (Z.current) {
          var e = k(Z.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ir(e) {
      return "";
    }
    var Se = {};
    function or(e) {
      {
        var r = Te();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Ce(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = or(r);
        if (Se[t])
          return;
        Se[t] = !0;
        var n = "";
        e && e._owner && e._owner !== Z.current && (n = " It was passed a child from " + k(e._owner.type) + "."), I(e), d('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), I(null);
      }
    }
    function Oe(e, r) {
      {
        if (typeof e != "object")
          return;
        if (X(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            ee(n) && Ce(n, r);
          }
        else if (ee(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var c = P(e);
          if (typeof c == "function" && c !== e.entries)
            for (var f = c.call(e), u; !(u = f.next()).done; )
              ee(u.value) && Ce(u.value, r);
        }
      }
    }
    function sr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === v || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === E))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = k(r);
          qe(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !Q) {
          Q = !0;
          var c = k(r);
          d("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", c || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && d("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ur(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            I(e), d("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), I(null);
            break;
          }
        }
        e.ref !== null && (I(e), d("Invalid attribute `ref` supplied to `React.Fragment`."), I(null));
      }
    }
    var je = {};
    function xe(e, r, t, n, c, f) {
      {
        var u = Ye(e);
        if (!u) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var _ = ir();
          _ ? s += _ : s += Te();
          var p;
          e === null ? p = "null" : X(e) ? p = "array" : e !== void 0 && e.$$typeof === a ? (p = "<" + (k(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : p = typeof e, d("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", p, s);
        }
        var h = nr(e, r, t, c, f);
        if (h == null)
          return h;
        if (u) {
          var O = r.children;
          if (O !== void 0)
            if (n)
              if (X(O)) {
                for (var N = 0; N < O.length; N++)
                  Oe(O[N], e);
                Object.freeze && Object.freeze(O);
              } else
                d("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Oe(O, e);
        }
        if (W.call(r, "key")) {
          var F = k(e), R = Object.keys(r).filter(function(pr) {
            return pr !== "key";
          }), re = R.length > 0 ? "{key: someKey, " + R.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!je[F + re]) {
            var vr = R.length > 0 ? "{" + R.join(": ..., ") + ": ...}" : "{}";
            d(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, re, F, vr, F), je[F + re] = !0;
          }
        }
        return e === o ? ur(h) : sr(h), h;
      }
    }
    function cr(e, r, t) {
      return xe(e, r, t, !0);
    }
    function lr(e, r, t) {
      return xe(e, r, t, !1);
    }
    var fr = lr, dr = cr;
    L.Fragment = o, L.jsx = fr, L.jsxs = dr;
  }()), L;
}
process.env.NODE_ENV === "production" ? ne.exports = gr() : ne.exports = _r();
var w = ne.exports;
class br {
  constructor(a, l) {
    te(this, "baseUrl");
    te(this, "apiKey");
    this.baseUrl = a, this.apiKey = l;
  }
  getHeaders() {
    const a = {
      "Content-Type": "application/json"
    };
    return this.apiKey && (a.Authorization = `Bearer ${this.apiKey}`), a;
  }
  async initConversation() {
    const a = await fetch(`${this.baseUrl}/api/conversation/init`, {
      method: "POST",
      headers: this.getHeaders()
    });
    if (!a.ok) throw new Error("Failed to initialize conversation");
    return (await a.json()).conversationId;
  }
  async *streamMessage(a, l) {
    const o = await fetch(
      `${this.baseUrl}/api/conversation/${a}`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ message: l })
      }
    );
    if (!o.ok) throw new Error("Failed to send message");
    if (!o.body) throw new Error("No response body");
    const g = o.body.getReader(), b = new TextDecoder();
    for (; ; ) {
      const { done: j, value: m } = await g.read();
      if (j) break;
      const x = b.decode(m).split(`
`);
      for (const y of x)
        if (y.startsWith("data: ")) {
          const E = y.slice(6);
          if (E === "[DONE]") return;
          try {
            yield JSON.parse(E).content || "";
          } catch (S) {
            console.error("Failed to parse chunk:", S);
          }
        }
    }
  }
}
function Er(i, a) {
  const [l, o] = q([]), [g, b] = q(!1), [j, m] = q(null), v = Pe(null), x = Pe(new br(i, a)), y = ae(async () => {
    try {
      const T = await x.current.initConversation();
      return v.current = T, T;
    } catch (T) {
      throw m(T), T;
    }
  }, []), E = ae(
    async (T) => {
      v.current || await y();
      const U = {
        id: Date.now().toString(),
        role: "user",
        content: T,
        timestamp: /* @__PURE__ */ new Date()
      };
      o((P) => [...P, U]), b(!0), m(null);
      const A = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      o((P) => [...P, A]);
      try {
        const P = x.current.streamMessage(
          v.current,
          T
        );
        for await (const C of P)
          o(
            (d) => d.map(
              ($) => $.id === A.id ? { ...$, content: $.content + C } : $
            )
          );
        o(
          (C) => C.map(
            (d) => d.id === A.id ? { ...d, isStreaming: !1 } : d
          )
        );
      } catch (P) {
        m(P), o((C) => C.filter((d) => d.id !== A.id));
      } finally {
        b(!1);
      }
    },
    [y]
  ), S = ae(() => {
    o([]), v.current = null;
  }, []);
  return {
    messages: l,
    isLoading: g,
    error: j,
    sendMessage: E,
    clearMessages: S
  };
}
function Rr({ messages: i }) {
  return /* @__PURE__ */ w.jsx("div", { className: "chat-wrapper__messages", children: i.map((a) => /* @__PURE__ */ w.jsxs(
    "div",
    {
      className: `chat-wrapper__message chat-wrapper__message--${a.role}`,
      children: [
        /* @__PURE__ */ w.jsxs("div", { className: "chat-wrapper__message-content", children: [
          a.content,
          a.isStreaming && /* @__PURE__ */ w.jsx("span", { className: "chat-wrapper__streaming-indicator", children: "..." })
        ] }),
        /* @__PURE__ */ w.jsx("div", { className: "chat-wrapper__message-timestamp", children: a.timestamp.toLocaleTimeString() })
      ]
    },
    a.id
  )) });
}
function wr({ onSend: i, disabled: a, placeholder: l }) {
  const [o, g] = q(""), b = () => {
    o.trim() && !a && (i(o.trim()), g(""));
  }, j = (m) => {
    m.key === "Enter" && !m.shiftKey && (m.preventDefault(), b());
  };
  return /* @__PURE__ */ w.jsxs("div", { className: "chat-wrapper__input", children: [
    /* @__PURE__ */ w.jsx(
      "textarea",
      {
        value: o,
        onChange: (m) => g(m.target.value),
        onKeyPress: j,
        placeholder: l,
        disabled: a,
        className: "chat-wrapper__textarea",
        rows: 1
      }
    ),
    /* @__PURE__ */ w.jsx(
      "button",
      {
        onClick: b,
        disabled: a || !o.trim(),
        className: "chat-wrapper__send-button",
        children: "Send"
      }
    )
  ] });
}
function Ae(i) {
  var a, l, o = "";
  if (typeof i == "string" || typeof i == "number") o += i;
  else if (typeof i == "object") if (Array.isArray(i)) {
    var g = i.length;
    for (a = 0; a < g; a++) i[a] && (l = Ae(i[a])) && (o && (o += " "), o += l);
  } else for (l in i) i[l] && (o && (o += " "), o += l);
  return o;
}
function Tr() {
  for (var i, a, l = 0, o = "", g = arguments.length; l < g; l++) (i = arguments[l]) && (a = Ae(i)) && (o && (o += " "), o += a);
  return o;
}
function Or(i) {
  const { messages: a, isLoading: l, error: o, sendMessage: g } = Er(
    i.apiEndpoint,
    i.apiKey
  );
  yr(() => {
    i.onError && o && i.onError(o);
  }, [o, i]);
  const b = Tr(
    "chat-wrapper",
    `chat-wrapper--${i.mode}`,
    i.position && `chat-wrapper--${i.position}`,
    i.theme && `chat-wrapper--${i.theme}`
  );
  return /* @__PURE__ */ w.jsxs("div", { className: b, style: i.customStyles, children: [
    /* @__PURE__ */ w.jsx("div", { className: "chat-wrapper__header", children: /* @__PURE__ */ w.jsx("h2", { className: "chat-wrapper__title", children: i.appName }) }),
    /* @__PURE__ */ w.jsx(Rr, { messages: a }),
    /* @__PURE__ */ w.jsx(
      wr,
      {
        onSend: g,
        disabled: l,
        placeholder: i.placeholder || "Type a message..."
      }
    ),
    o && /* @__PURE__ */ w.jsxs("div", { className: "chat-wrapper__error", children: [
      "Error: ",
      o.message
    ] })
  ] });
}
export {
  Or as ChatWrapper,
  Er as useChatConnection
};
