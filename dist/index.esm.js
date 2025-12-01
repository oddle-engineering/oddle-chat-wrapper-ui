var bs = Object.defineProperty;
var xs = (e, t, n) => t in e ? bs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var J = (e, t, n) => xs(e, typeof t != "symbol" ? t + "" : t, n);
import Ot, { useState as Ne, useEffect as Le, useCallback as ce, useRef as qe, useMemo as Fe, Component as Pr, createContext as Ns, useContext as Cs, memo as uo, forwardRef as Zn, useImperativeHandle as po } from "react";
import { jsxs as ws, jsx as Es, Fragment as ys } from "react/jsx-runtime";
var zn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Wr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var xr = { exports: {} }, On = {};
/**
 * @license React
 * react-jsx-dev-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ri;
function vs() {
  if (ri) return On;
  ri = 1;
  var e = Symbol.for("react.fragment");
  return On.Fragment = e, On.jsxDEV = void 0, On;
}
var In = {};
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ii;
function Ss() {
  return ii || (ii = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Ot, t = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), a = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), f = Symbol.for("react.offscreen"), E = Symbol.iterator, w = "@@iterator";
    function I(b) {
      if (b === null || typeof b != "object")
        return null;
      var O = E && b[E] || b[w];
      return typeof O == "function" ? O : null;
    }
    var y = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function D(b) {
      {
        for (var O = arguments.length, W = new Array(O > 1 ? O - 1 : 0), te = 1; te < O; te++)
          W[te - 1] = arguments[te];
        U("error", b, W);
      }
    }
    function U(b, O, W) {
      {
        var te = y.ReactDebugCurrentFrame, xe = te.getStackAddendum();
        xe !== "" && (O += "%s", W = W.concat([xe]));
        var fe = W.map(function(ge) {
          return String(ge);
        });
        fe.unshift("Warning: " + O), Function.prototype.apply.call(console[b], console, fe);
      }
    }
    var P = !1, M = !1, T = !1, K = !1, q = !1, ne;
    ne = Symbol.for("react.module.reference");
    function ae(b) {
      return !!(typeof b == "string" || typeof b == "function" || b === r || b === o || q || b === i || b === h || b === c || K || b === f || P || M || T || typeof b == "object" && b !== null && (b.$$typeof === g || b.$$typeof === m || b.$$typeof === s || b.$$typeof === a || b.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      b.$$typeof === ne || b.getModuleId !== void 0));
    }
    function X(b, O, W) {
      var te = b.displayName;
      if (te)
        return te;
      var xe = O.displayName || O.name || "";
      return xe !== "" ? W + "(" + xe + ")" : W;
    }
    function G(b) {
      return b.displayName || "Context";
    }
    function _(b) {
      if (b == null)
        return null;
      if (typeof b.tag == "number" && D("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof b == "function")
        return b.displayName || b.name || null;
      if (typeof b == "string")
        return b;
      switch (b) {
        case r:
          return "Fragment";
        case n:
          return "Portal";
        case o:
          return "Profiler";
        case i:
          return "StrictMode";
        case h:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof b == "object")
        switch (b.$$typeof) {
          case a:
            var O = b;
            return G(O) + ".Consumer";
          case s:
            var W = b;
            return G(W._context) + ".Provider";
          case u:
            return X(b, b.render, "ForwardRef");
          case m:
            var te = b.displayName || null;
            return te !== null ? te : _(b.type) || "Memo";
          case g: {
            var xe = b, fe = xe._payload, ge = xe._init;
            try {
              return _(ge(fe));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var L = Object.assign, B = 0, ie, F, ve, Oe, x, le, ee;
    function k() {
    }
    k.__reactDisabledLog = !0;
    function de() {
      {
        if (B === 0) {
          ie = console.log, F = console.info, ve = console.warn, Oe = console.error, x = console.group, le = console.groupCollapsed, ee = console.groupEnd;
          var b = {
            configurable: !0,
            enumerable: !0,
            value: k,
            writable: !0
          };
          Object.defineProperties(console, {
            info: b,
            log: b,
            warn: b,
            error: b,
            group: b,
            groupCollapsed: b,
            groupEnd: b
          });
        }
        B++;
      }
    }
    function re() {
      {
        if (B--, B === 0) {
          var b = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: L({}, b, {
              value: ie
            }),
            info: L({}, b, {
              value: F
            }),
            warn: L({}, b, {
              value: ve
            }),
            error: L({}, b, {
              value: Oe
            }),
            group: L({}, b, {
              value: x
            }),
            groupCollapsed: L({}, b, {
              value: le
            }),
            groupEnd: L({}, b, {
              value: ee
            })
          });
        }
        B < 0 && D("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ue = y.ReactCurrentDispatcher, Ee;
    function Q(b, O, W) {
      {
        if (Ee === void 0)
          try {
            throw Error();
          } catch (xe) {
            var te = xe.stack.trim().match(/\n( *(at )?)/);
            Ee = te && te[1] || "";
          }
        return `
` + Ee + b;
      }
    }
    var Pe = !1, we;
    {
      var Ae = typeof WeakMap == "function" ? WeakMap : Map;
      we = new Ae();
    }
    function et(b, O) {
      if (!b || Pe)
        return "";
      {
        var W = we.get(b);
        if (W !== void 0)
          return W;
      }
      var te;
      Pe = !0;
      var xe = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var fe;
      fe = ue.current, ue.current = null, de();
      try {
        if (O) {
          var ge = function() {
            throw Error();
          };
          if (Object.defineProperty(ge.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ge, []);
            } catch (V) {
              te = V;
            }
            Reflect.construct(b, [], ge);
          } else {
            try {
              ge.call();
            } catch (V) {
              te = V;
            }
            b.call(ge.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (V) {
            te = V;
          }
          b();
        }
      } catch (V) {
        if (V && te && typeof V.stack == "string") {
          for (var me = V.stack.split(`
`), Be = te.stack.split(`
`), Re = me.length - 1, Me = Be.length - 1; Re >= 1 && Me >= 0 && me[Re] !== Be[Me]; )
            Me--;
          for (; Re >= 1 && Me >= 0; Re--, Me--)
            if (me[Re] !== Be[Me]) {
              if (Re !== 1 || Me !== 1)
                do
                  if (Re--, Me--, Me < 0 || me[Re] !== Be[Me]) {
                    var $ = `
` + me[Re].replace(" at new ", " at ");
                    return b.displayName && $.includes("<anonymous>") && ($ = $.replace("<anonymous>", b.displayName)), typeof b == "function" && we.set(b, $), $;
                  }
                while (Re >= 1 && Me >= 0);
              break;
            }
        }
      } finally {
        Pe = !1, ue.current = fe, re(), Error.prepareStackTrace = xe;
      }
      var N = b ? b.displayName || b.name : "", R = N ? Q(N) : "";
      return typeof b == "function" && we.set(b, R), R;
    }
    function tt(b, O, W) {
      return et(b, !1);
    }
    function yt(b) {
      var O = b.prototype;
      return !!(O && O.isReactComponent);
    }
    function He(b, O, W) {
      if (b == null)
        return "";
      if (typeof b == "function")
        return et(b, yt(b));
      if (typeof b == "string")
        return Q(b);
      switch (b) {
        case h:
          return Q("Suspense");
        case c:
          return Q("SuspenseList");
      }
      if (typeof b == "object")
        switch (b.$$typeof) {
          case u:
            return tt(b.render);
          case m:
            return He(b.type, O, W);
          case g: {
            var te = b, xe = te._payload, fe = te._init;
            try {
              return He(fe(xe), O, W);
            } catch {
            }
          }
        }
      return "";
    }
    var nt = Object.prototype.hasOwnProperty, xt = {}, lt = y.ReactDebugCurrentFrame;
    function ct(b) {
      if (b) {
        var O = b._owner, W = He(b.type, b._source, O ? O.type : null);
        lt.setExtraStackFrame(W);
      } else
        lt.setExtraStackFrame(null);
    }
    function vt(b, O, W, te, xe) {
      {
        var fe = Function.call.bind(nt);
        for (var ge in b)
          if (fe(b, ge)) {
            var me = void 0;
            try {
              if (typeof b[ge] != "function") {
                var Be = Error((te || "React class") + ": " + W + " type `" + ge + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof b[ge] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Be.name = "Invariant Violation", Be;
              }
              me = b[ge](O, ge, te, W, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Re) {
              me = Re;
            }
            me && !(me instanceof Error) && (ct(xe), D("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", te || "React class", W, ge, typeof me), ct(null)), me instanceof Error && !(me.message in xt) && (xt[me.message] = !0, ct(xe), D("Failed %s type: %s", W, me.message), ct(null));
          }
      }
    }
    var Pt = Array.isArray;
    function St(b) {
      return Pt(b);
    }
    function zt(b) {
      {
        var O = typeof Symbol == "function" && Symbol.toStringTag, W = O && b[Symbol.toStringTag] || b.constructor.name || "Object";
        return W;
      }
    }
    function Tt(b) {
      try {
        return Ye(b), !1;
      } catch {
        return !0;
      }
    }
    function Ye(b) {
      return "" + b;
    }
    function v(b) {
      if (Tt(b))
        return D("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", zt(b)), Ye(b);
    }
    var S = y.ReactCurrentOwner, H = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Z, pe, Se;
    Se = {};
    function rt(b) {
      if (nt.call(b, "ref")) {
        var O = Object.getOwnPropertyDescriptor(b, "ref").get;
        if (O && O.isReactWarning)
          return !1;
      }
      return b.ref !== void 0;
    }
    function We(b) {
      if (nt.call(b, "key")) {
        var O = Object.getOwnPropertyDescriptor(b, "key").get;
        if (O && O.isReactWarning)
          return !1;
      }
      return b.key !== void 0;
    }
    function it(b, O) {
      if (typeof b.ref == "string" && S.current && O && S.current.stateNode !== O) {
        var W = _(S.current.type);
        Se[W] || (D('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', _(S.current.type), b.ref), Se[W] = !0);
      }
    }
    function Ie(b, O) {
      {
        var W = function() {
          Z || (Z = !0, D("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", O));
        };
        W.isReactWarning = !0, Object.defineProperty(b, "key", {
          get: W,
          configurable: !0
        });
      }
    }
    function Te(b, O) {
      {
        var W = function() {
          pe || (pe = !0, D("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", O));
        };
        W.isReactWarning = !0, Object.defineProperty(b, "ref", {
          get: W,
          configurable: !0
        });
      }
    }
    var Ke = function(b, O, W, te, xe, fe, ge) {
      var me = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: b,
        key: O,
        ref: W,
        props: ge,
        // Record the component responsible for creating this element.
        _owner: fe
      };
      return me._store = {}, Object.defineProperty(me._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(me, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: te
      }), Object.defineProperty(me, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: xe
      }), Object.freeze && (Object.freeze(me.props), Object.freeze(me)), me;
    };
    function ze(b, O, W, te, xe) {
      {
        var fe, ge = {}, me = null, Be = null;
        W !== void 0 && (v(W), me = "" + W), We(O) && (v(O.key), me = "" + O.key), rt(O) && (Be = O.ref, it(O, xe));
        for (fe in O)
          nt.call(O, fe) && !H.hasOwnProperty(fe) && (ge[fe] = O[fe]);
        if (b && b.defaultProps) {
          var Re = b.defaultProps;
          for (fe in Re)
            ge[fe] === void 0 && (ge[fe] = Re[fe]);
        }
        if (me || Be) {
          var Me = typeof b == "function" ? b.displayName || b.name || "Unknown" : b;
          me && Ie(ge, Me), Be && Te(ge, Me);
        }
        return Ke(b, me, Be, xe, te, S.current, ge);
      }
    }
    var Yt = y.ReactCurrentOwner, Wt = y.ReactDebugCurrentFrame;
    function ut(b) {
      if (b) {
        var O = b._owner, W = He(b.type, b._source, O ? O.type : null);
        Wt.setExtraStackFrame(W);
      } else
        Wt.setExtraStackFrame(null);
    }
    var Bt;
    Bt = !1;
    function Nt(b) {
      return typeof b == "object" && b !== null && b.$$typeof === t;
    }
    function Kt() {
      {
        if (Yt.current) {
          var b = _(Yt.current.type);
          if (b)
            return `

Check the render method of \`` + b + "`.";
        }
        return "";
      }
    }
    function rn(b) {
      {
        if (b !== void 0) {
          var O = b.fileName.replace(/^.*[\\\/]/, ""), W = b.lineNumber;
          return `

Check your code at ` + O + ":" + W + ".";
        }
        return "";
      }
    }
    var je = {};
    function _t(b) {
      {
        var O = Kt();
        if (!O) {
          var W = typeof b == "string" ? b : b.displayName || b.name;
          W && (O = `

Check the top-level render call using <` + W + ">.");
        }
        return O;
      }
    }
    function Xt(b, O) {
      {
        if (!b._store || b._store.validated || b.key != null)
          return;
        b._store.validated = !0;
        var W = _t(O);
        if (je[W])
          return;
        je[W] = !0;
        var te = "";
        b && b._owner && b._owner !== Yt.current && (te = " It was passed a child from " + _(b._owner.type) + "."), ut(b), D('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', W, te), ut(null);
      }
    }
    function Jt(b, O) {
      {
        if (typeof b != "object")
          return;
        if (St(b))
          for (var W = 0; W < b.length; W++) {
            var te = b[W];
            Nt(te) && Xt(te, O);
          }
        else if (Nt(b))
          b._store && (b._store.validated = !0);
        else if (b) {
          var xe = I(b);
          if (typeof xe == "function" && xe !== b.entries)
            for (var fe = xe.call(b), ge; !(ge = fe.next()).done; )
              Nt(ge.value) && Xt(ge.value, O);
        }
      }
    }
    function on(b) {
      {
        var O = b.type;
        if (O == null || typeof O == "string")
          return;
        var W;
        if (typeof O == "function")
          W = O.propTypes;
        else if (typeof O == "object" && (O.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        O.$$typeof === m))
          W = O.propTypes;
        else
          return;
        if (W) {
          var te = _(O);
          vt(W, b.props, "prop", te, b);
        } else if (O.PropTypes !== void 0 && !Bt) {
          Bt = !0;
          var xe = _(O);
          D("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", xe || "Unknown");
        }
        typeof O.getDefaultProps == "function" && !O.getDefaultProps.isReactClassApproved && D("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Qt(b) {
      {
        for (var O = Object.keys(b.props), W = 0; W < O.length; W++) {
          var te = O[W];
          if (te !== "children" && te !== "key") {
            ut(b), D("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", te), ut(null);
            break;
          }
        }
        b.ref !== null && (ut(b), D("Invalid attribute `ref` supplied to `React.Fragment`."), ut(null));
      }
    }
    var Gt = {};
    function j(b, O, W, te, xe, fe) {
      {
        var ge = ae(b);
        if (!ge) {
          var me = "";
          (b === void 0 || typeof b == "object" && b !== null && Object.keys(b).length === 0) && (me += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Be = rn(xe);
          Be ? me += Be : me += Kt();
          var Re;
          b === null ? Re = "null" : St(b) ? Re = "array" : b !== void 0 && b.$$typeof === t ? (Re = "<" + (_(b.type) || "Unknown") + " />", me = " Did you accidentally export a JSX literal instead of a component?") : Re = typeof b, D("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Re, me);
        }
        var Me = ze(b, O, W, xe, fe);
        if (Me == null)
          return Me;
        if (ge) {
          var $ = O.children;
          if ($ !== void 0)
            if (te)
              if (St($)) {
                for (var N = 0; N < $.length; N++)
                  Jt($[N], b);
                Object.freeze && Object.freeze($);
              } else
                D("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Jt($, b);
        }
        if (nt.call(O, "key")) {
          var R = _(b), V = Object.keys(O).filter(function(Ue) {
            return Ue !== "key";
          }), ye = V.length > 0 ? "{key: someKey, " + V.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Gt[R + ye]) {
            var Ge = V.length > 0 ? "{" + V.join(": ..., ") + ": ...}" : "{}";
            D(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ye, R, Ge, R), Gt[R + ye] = !0;
          }
        }
        return b === r ? Qt(Me) : on(Me), Me;
      }
    }
    var be = j;
    In.Fragment = r, In.jsxDEV = be;
  }()), In;
}
process.env.NODE_ENV === "production" ? xr.exports = vs() : xr.exports = Ss();
var l = xr.exports;
const kt = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, ln = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, Je = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, Nr = (e) => e === kt.SUBMITTED || e === kt.STREAMING, ph = (e) => e === kt.IDLE, hh = (e) => e === kt.ERROR, mh = (e) => e === Je.PROCESSING, fh = (e) => e === Je.COMPLETED, gh = (e) => e === Je.ERROR;
var Ts = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(Ts || {}), gt = /* @__PURE__ */ ((e) => (e.DISCONNECTED = "disconnected", e.CONNECTING = "connecting", e.CONNECTED = "connected", e.RECONNECTING = "reconnecting", e))(gt || {});
async function _s(e, t) {
  const n = {
    "Content-Type": "application/json"
  };
  t != null && t.userMpAuthToken && (n["x-oddle-mp-auth-token"] = t.userMpAuthToken), t != null && t.chatServerKey && (n["x-oddle-chat-server-key"] = t.chatServerKey);
  const r = await fetch(`${e}/api/v1/agent-configuration`, {
    method: "GET",
    headers: n
  });
  if (!r.ok) {
    const o = await r.json().catch(() => ({}));
    throw new Error(
      o.message || `Failed to get agent configuration: ${r.statusText}`
    );
  }
  return (await r.json()).configuration;
}
async function Ds(e, t, n) {
  const r = {
    "Content-Type": "application/json"
  };
  n != null && n.userMpAuthToken && (r["x-oddle-mp-auth-token"] = n.userMpAuthToken), n != null && n.chatServerKey && (r["x-oddle-chat-server-key"] = n.chatServerKey);
  const i = await fetch(`${e}/api/v1/agent-configuration`, {
    method: "PUT",
    headers: r,
    body: JSON.stringify(t)
  });
  if (!i.ok) {
    const s = await i.json().catch(() => ({}));
    throw new Error(
      s.message || `Failed to update agent configuration: ${i.statusText}`
    );
  }
  return (await i.json()).configuration;
}
async function Os(e, t, n) {
  const r = new URLSearchParams();
  r.append("format", "client"), t.entityId && r.append("entityId", t.entityId), t.entityType && r.append("entityType", t.entityType), console.log("Metadata to append:", t.metadata), t.metadata && Object.keys(t.metadata).length > 0 && r.append("metadata", JSON.stringify(t.metadata));
  const i = `${e}/api/v1/messages/query?${r.toString()}`, o = {
    "Content-Type": "application/json"
  };
  n != null && n.userMpAuthToken && (o["x-oddle-mp-auth-token"] = n.userMpAuthToken), n != null && n.chatServerKey && (o["x-oddle-chat-server-key"] = n.chatServerKey), console.log("Fetching thread messages from:", i);
  const s = await fetch(i, {
    method: "GET",
    headers: o
  });
  if (!s.ok)
    throw new Error(`Failed to fetch thread messages: ${s.statusText}`);
  const a = await s.json();
  return {
    messages: a.messages || [],
    providerResId: a.providerResId,
    threadId: a.threadId
  };
}
async function ho(e, t, n, r) {
  const i = `${e}/api/v1/threads/${t}`, o = {
    "Content-Type": "application/json"
  };
  r != null && r.userMpAuthToken && (o["x-oddle-mp-auth-token"] = r.userMpAuthToken), r != null && r.chatServerKey && (o["x-oddle-chat-server-key"] = r.chatServerKey);
  const s = await fetch(i, {
    method: "PATCH",
    headers: o,
    body: JSON.stringify(n)
  });
  if (!s.ok) {
    const u = await s.json().catch(() => ({
      error: "Failed to update thread"
    }));
    throw new Error(u.error || "Failed to update thread");
  }
  const a = await s.json();
  if (!a.success)
    throw new Error(a.error || "Failed to update thread");
  return a.data;
}
async function mo(e, t, n, r) {
  const i = `${e}/api/v1/threads/${t}`, o = {
    "Content-Type": "application/json"
  };
  r != null && r.userMpAuthToken && (o["x-oddle-mp-auth-token"] = r.userMpAuthToken), r != null && r.chatServerKey && (o["x-oddle-chat-server-key"] = r.chatServerKey);
  const s = await fetch(i, {
    method: "PATCH",
    headers: o,
    body: JSON.stringify(n)
  });
  if (!s.ok) {
    const u = await s.json().catch(() => ({
      error: "Failed to update thread metadata"
    }));
    throw new Error(u.error || "Failed to update thread metadata");
  }
  const a = await s.json();
  if (!a.success)
    throw new Error(a.error || "Failed to update thread metadata");
  return a.data;
}
const oi = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), r = (h, c) => {
    const m = typeof h == "function" ? h(t) : h;
    if (!Object.is(m, t)) {
      const g = t;
      t = c ?? (typeof m != "object" || m === null) ? m : Object.assign({}, t, m), n.forEach((f) => f(t, g));
    }
  }, i = () => t, a = { setState: r, getState: i, getInitialState: () => u, subscribe: (h) => (n.add(h), () => n.delete(h)) }, u = t = e(r, i, a);
  return a;
}, Is = (e) => e ? oi(e) : oi, js = (e) => e;
function Rs(e, t = js) {
  const n = Ot.useSyncExternalStore(
    e.subscribe,
    Ot.useCallback(() => t(e.getState()), [e, t]),
    Ot.useCallback(() => t(e.getInitialState()), [e, t])
  );
  return Ot.useDebugValue(n), n;
}
const Ms = (e) => {
  const t = Is(e), n = (r) => Rs(t, r);
  return Object.assign(n, t), n;
}, Us = (e) => Ms, si = { BASE_URL: "/", DEV: !0, MODE: "production", PROD: !1, SSR: !1, VITE_APP_TOLGEE_API_KEY: "tgpak_ge4v6ytcm5xtozdlobzxk4twgyzwqntjoe3xi4bwozygu5q", VITE_APP_TOLGEE_API_URL: "https://tolgee-translation.oddleapp.com", VITE_APP_TOLGEE_PROJECT_ID: "19", VITE_USER_NODE_ENV: "development" }, vn = /* @__PURE__ */ new Map(), jn = (e) => {
  const t = vn.get(e);
  return t ? Object.fromEntries(
    Object.entries(t.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, As = (e, t, n) => {
  if (e === void 0)
    return {
      type: "untracked",
      connection: t.connect(n)
    };
  const r = vn.get(n.name);
  if (r)
    return { type: "tracked", store: e, ...r };
  const i = {
    connection: t.connect(n),
    stores: {}
  };
  return vn.set(n.name, i), { type: "tracked", store: e, ...i };
}, Ls = (e, t) => {
  if (t === void 0) return;
  const n = vn.get(e);
  n && (delete n.stores[t], Object.keys(n.stores).length === 0 && vn.delete(e));
}, Ps = (e) => {
  var t, n;
  if (!e) return;
  const r = e.split(`
`), i = r.findIndex(
    (s) => s.includes("api.setState")
  );
  if (i < 0) return;
  const o = ((t = r[i + 1]) == null ? void 0 : t.trim()) || "";
  return (n = /.+ (.+) .+/.exec(o)) == null ? void 0 : n[1];
}, Ws = (e, t = {}) => (n, r, i) => {
  const { enabled: o, anonymousActionType: s, store: a, ...u } = t;
  let h;
  try {
    h = (o ?? (si ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!h)
    return e(n, r, i);
  const { connection: c, ...m } = As(a, h, u);
  let g = !0;
  i.setState = (w, I, y) => {
    const D = n(w, I);
    if (!g) return D;
    const U = y === void 0 ? {
      type: s || Ps(new Error().stack) || "anonymous"
    } : typeof y == "string" ? { type: y } : y;
    return a === void 0 ? (c == null || c.send(U, r()), D) : (c == null || c.send(
      {
        ...U,
        type: `${a}/${U.type}`
      },
      {
        ...jn(u.name),
        [a]: i.getState()
      }
    ), D);
  }, i.devtools = {
    cleanup: () => {
      c && typeof c.unsubscribe == "function" && c.unsubscribe(), Ls(u.name, a);
    }
  };
  const f = (...w) => {
    const I = g;
    g = !1, n(...w), g = I;
  }, E = e(i.setState, r, i);
  if (m.type === "untracked" ? c == null || c.init(E) : (m.stores[m.store] = i, c == null || c.init(
    Object.fromEntries(
      Object.entries(m.stores).map(([w, I]) => [
        w,
        w === m.store ? E : I.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let w = !1;
    const I = i.dispatch;
    i.dispatch = (...y) => {
      (si ? "production" : void 0) !== "production" && y[0].type === "__setState" && !w && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), w = !0), I(...y);
    };
  }
  return c.subscribe((w) => {
    var I;
    switch (w.type) {
      case "ACTION":
        if (typeof w.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return er(
          w.payload,
          (y) => {
            if (y.type === "__setState") {
              if (a === void 0) {
                f(y.state);
                return;
              }
              Object.keys(y.state).length !== 1 && console.error(
                `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
              );
              const D = y.state[a];
              if (D == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(D) && f(D);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(y);
          }
        );
      case "DISPATCH":
        switch (w.payload.type) {
          case "RESET":
            return f(E), a === void 0 ? c == null ? void 0 : c.init(i.getState()) : c == null ? void 0 : c.init(jn(u.name));
          case "COMMIT":
            if (a === void 0) {
              c == null || c.init(i.getState());
              return;
            }
            return c == null ? void 0 : c.init(jn(u.name));
          case "ROLLBACK":
            return er(w.state, (y) => {
              if (a === void 0) {
                f(y), c == null || c.init(i.getState());
                return;
              }
              f(y[a]), c == null || c.init(jn(u.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return er(w.state, (y) => {
              if (a === void 0) {
                f(y);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(y[a]) && f(y[a]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: y } = w.payload, D = (I = y.computedStates.slice(-1)[0]) == null ? void 0 : I.state;
            if (!D) return;
            f(a === void 0 ? D : D[a]), c == null || c.send(
              null,
              // FIXME no-any
              y
            );
            return;
          }
          case "PAUSE_RECORDING":
            return g = !g;
        }
        return;
    }
  }), E;
}, Vs = Ws, er = (e, t) => {
  let n;
  try {
    n = JSON.parse(e);
  } catch (r) {
    console.error(
      "[zustand devtools middleware] Could not parse the received json",
      r
    );
  }
  n !== void 0 && t(n);
}, Fs = (e) => ({
  // Initial state
  isModalOpen: !1,
  isCollapsed: !1,
  currentMode: "sidebar",
  // Actions
  setIsModalOpen: (t) => e({ isModalOpen: t }),
  setIsCollapsed: (t) => e({ isCollapsed: t }),
  setCurrentMode: (t) => e({ currentMode: t }),
  openModal: () => e({ isModalOpen: !0 }),
  closeModal: () => e({ isModalOpen: !1 }),
  toggleCollapse: () => e((t) => ({ isCollapsed: !t.isCollapsed })),
  toggleFullscreen: () => e((t) => ({
    currentMode: t.currentMode === "sidebar" ? "fullscreen" : "sidebar"
  }))
}), Hs = (e) => ({
  // Initial state
  chatStatus: kt.IDLE,
  streamingStatus: ln.IDLE,
  // Actions
  setChatStatus: (t) => e({ chatStatus: t }),
  setStreamingStatus: (t) => e({ streamingStatus: t }),
  resetChatStatus: () => e({
    chatStatus: kt.IDLE,
    streamingStatus: ln.IDLE
  })
}), zs = (e) => ({
  // Initial state
  isLoadingConversation: !1,
  conversationError: null,
  // Actions
  setIsLoadingConversation: (t) => e({ isLoadingConversation: t }),
  setConversationError: (t) => e({ conversationError: t }),
  clearConversationError: () => e({ conversationError: null })
}), Bs = (e) => ({
  // Initial state
  currentThreadId: null,
  providerResId: null,
  // Actions
  setCurrentThreadId: (t) => e({ currentThreadId: t }),
  setProviderResId: (t) => e({ providerResId: t }),
  clearThreadData: () => e({
    currentThreadId: null,
    providerResId: null
  })
}), Gs = (e) => ({
  // Initial state
  isDevSettingsOpen: !1,
  // Actions
  setIsDevSettingsOpen: (t) => e({ isDevSettingsOpen: t }),
  toggleDevSettings: () => e((t) => ({ isDevSettingsOpen: !t.isDevSettingsOpen }))
}), $s = (e) => ({
  // Initial state
  isStreaming: !1,
  isThinking: !1,
  streamingContent: "",
  isHandlingTool: !1,
  currentAssistantMessageId: null,
  // Individual setters
  setIsStreaming: (t) => e({ isStreaming: t }),
  setIsThinking: (t) => e({ isThinking: t }),
  setStreamingContent: (t) => e({ streamingContent: t }),
  setIsHandlingTool: (t) => e({ isHandlingTool: t }),
  setCurrentAssistantMessageId: (t) => e({ currentAssistantMessageId: t }),
  // Lifecycle actions
  startStreaming: (t) => e({
    isStreaming: !0,
    isThinking: !0,
    currentAssistantMessageId: t,
    streamingContent: "",
    isHandlingTool: !1
  }),
  stopStreaming: () => e({
    isStreaming: !1,
    isThinking: !1
  }),
  clearStreamingBuffers: () => e({
    streamingContent: "",
    currentAssistantMessageId: null
  }),
  resetToolHandling: () => e({
    isHandlingTool: !1
  })
}), oe = Us()(
  Vs(
    (...e) => ({
      ...Fs(...e),
      ...Hs(...e),
      ...zs(...e),
      ...Bs(...e),
      ...Gs(...e),
      ...$s(...e)
    }),
    {
      name: "ChatUI-Store"
    }
  )
), kh = () => oe((e) => ({
  isModalOpen: e.isModalOpen,
  isCollapsed: e.isCollapsed,
  currentMode: e.currentMode,
  openModal: e.openModal,
  closeModal: e.closeModal,
  toggleCollapse: e.toggleCollapse,
  toggleFullscreen: e.toggleFullscreen
})), bh = () => oe((e) => ({
  chatStatus: e.chatStatus,
  streamingStatus: e.streamingStatus,
  setChatStatus: e.setChatStatus,
  setStreamingStatus: e.setStreamingStatus,
  resetChatStatus: e.resetChatStatus
})), xh = () => oe((e) => ({
  isLoadingConversation: e.isLoadingConversation,
  conversationError: e.conversationError,
  setIsLoadingConversation: e.setIsLoadingConversation,
  setConversationError: e.setConversationError,
  clearConversationError: e.clearConversationError
})), Nh = () => oe((e) => ({
  currentThreadId: e.currentThreadId,
  providerResId: e.providerResId,
  setCurrentThreadId: e.setCurrentThreadId,
  setProviderResId: e.setProviderResId,
  clearThreadData: e.clearThreadData
})), Ch = () => oe((e) => ({
  isDevSettingsOpen: e.isDevSettingsOpen,
  setIsDevSettingsOpen: e.setIsDevSettingsOpen,
  toggleDevSettings: e.toggleDevSettings
})), qs = ({
  isOpen: e,
  onClose: t,
  apiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  app: o = "UD21"
  // Default to UD21 if not specified
}) => {
  const [s, a] = Ne(null), [u, h] = Ne(""), [c, m] = Ne(""), g = oe((F) => F.providerResId), [f, E] = Ne(""), [w, I] = Ne("BRAND"), [y, D] = Ne(""), [U, P] = Ne(""), [M, T] = Ne(!1), [K, q] = Ne(null), [ne, ae] = Ne(null), [X, G] = Ne("agent");
  Le(() => {
    e && !s && _();
  }, [e]);
  const _ = ce(async () => {
    T(!0), q(null);
    try {
      const F = await _s(n, {
        userMpAuthToken: r,
        chatServerKey: i
      });
      if (!F)
        throw new Error(`No configuration found for app: ${o}`);
      a(F), h(F.promptPath), m(F.versionUuid);
    } catch (F) {
      q(F instanceof Error ? F.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", F);
    } finally {
      T(!1);
    }
  }, [n, o, r, i]), L = ce(async () => {
    if (s) {
      T(!0), q(null);
      try {
        const F = await Ds(n, {
          app: s.app,
          promptPath: u,
          versionUuid: c,
          isDefault: s.isDefault
        }, {
          userMpAuthToken: r,
          chatServerKey: i
        });
        a(F), t(), window.location.reload();
      } catch (F) {
        q(F instanceof Error ? F.message : "Failed to update configuration"), console.error("Error updating agent configuration:", F);
      } finally {
        T(!1);
      }
    }
  }, [n, u, c, s, t, r, i]), B = ce(async () => {
    if (!g) {
      q("No active conversation to attach");
      return;
    }
    T(!0), q(null), ae(null);
    try {
      let F;
      if (U.trim())
        try {
          F = JSON.parse(U);
        } catch {
          throw new Error("Invalid JSON in metadata field");
        }
      const ve = f && w, Oe = y || F;
      if (ve && await ho(
        n,
        g,
        {
          entityId: f,
          entityType: w
        },
        {
          userMpAuthToken: r,
          chatServerKey: i
        }
      ), Oe && await mo(
        n,
        g,
        {
          tag: y || void 0,
          metadata: F
        },
        {
          userMpAuthToken: r,
          chatServerKey: i
        }
      ), !ve && !Oe) {
        q("Please provide at least one field to update");
        return;
      }
      ae("Thread updated successfully!"), setTimeout(() => {
        E(""), I("BRAND"), D(""), P(""), ae(null);
      }, 2e3);
    } catch (F) {
      q(F instanceof Error ? F.message : "Failed to update thread"), console.error("Error updating thread:", F);
    } finally {
      T(!1);
    }
  }, [g, n, f, w, y, U, r, i]), ie = ce(() => {
    s && (h(s.promptPath), m(s.versionUuid)), q(null), t();
  }, [s, t]);
  return e ? /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ l.jsxDEV("h3", { children: "Developer Settings" }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
        lineNumber: 197,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ l.jsxDEV(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: ie,
          title: "Close settings",
          children: /* @__PURE__ */ l.jsxDEV(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ l.jsxDEV(
                "path",
                {
                  d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
                  fill: "currentColor"
                },
                void 0,
                !1,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
                  lineNumber: 210,
                  columnNumber: 15
                },
                void 0
              )
            },
            void 0,
            !1,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
              lineNumber: 203,
              columnNumber: 13
            },
            void 0
          )
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
          lineNumber: 198,
          columnNumber: 11
        },
        void 0
      )
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
      lineNumber: 196,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-tabs", children: [
      /* @__PURE__ */ l.jsxDEV(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${X === "agent" ? "active" : ""}`,
          onClick: () => G("agent"),
          children: "Agent Config"
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
          lineNumber: 220,
          columnNumber: 11
        },
        void 0
      ),
      /* @__PURE__ */ l.jsxDEV(
        "button",
        {
          className: `chat-wrapper__dev-settings-tab ${X === "thread" ? "active" : ""}`,
          onClick: () => G("thread"),
          children: "Thread Attachment"
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
          lineNumber: 226,
          columnNumber: 11
        },
        void 0
      )
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
      lineNumber: 219,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-content", children: [
      ne && /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-success", children: ne }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
        lineNumber: 236,
        columnNumber: 13
      }, void 0),
      M && /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
        lineNumber: 242,
        columnNumber: 13
      }, void 0),
      K && /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ l.jsxDEV("p", { children: [
          "Error: ",
          K
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
          lineNumber: 249,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ l.jsxDEV(
          "button",
          {
            onClick: X === "agent" ? _ : void 0,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 250,
            columnNumber: 15
          },
          void 0
        )
      ] }, void 0, !0, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
        lineNumber: 248,
        columnNumber: 13
      }, void 0),
      X === "agent" && s && !M && /* @__PURE__ */ l.jsxDEV(l.Fragment, { children: [
        /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ l.jsxDEV("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 263,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ l.jsxDEV(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: u,
              onChange: (F) => h(F.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: M
            },
            void 0,
            !1,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
              lineNumber: 264,
              columnNumber: 17
            },
            void 0
          ),
          /* @__PURE__ */ l.jsxDEV("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 273,
            columnNumber: 17
          }, void 0)
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
          lineNumber: 262,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ l.jsxDEV("label", { htmlFor: "version-uuid", children: "Version UUID:" }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 279,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ l.jsxDEV(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: c,
              onChange: (F) => m(F.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: M
            },
            void 0,
            !1,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
              lineNumber: 280,
              columnNumber: 17
            },
            void 0
          ),
          /* @__PURE__ */ l.jsxDEV("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 289,
            columnNumber: 17
          }, void 0)
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
          lineNumber: 278,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ l.jsxDEV("label", { htmlFor: "app-name", children: "App:" }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 295,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ l.jsxDEV(
            "input",
            {
              id: "app-name",
              type: "text",
              value: s.app,
              className: "chat-wrapper__dev-settings-input",
              disabled: !0,
              readOnly: !0
            },
            void 0,
            !1,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
              lineNumber: 296,
              columnNumber: 17
            },
            void 0
          ),
          /* @__PURE__ */ l.jsxDEV("p", { className: "chat-wrapper__dev-settings-help", children: "Application name for this agent configuration." }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 304,
            columnNumber: 17
          }, void 0)
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
          lineNumber: 294,
          columnNumber: 15
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
        lineNumber: 261,
        columnNumber: 13
      }, void 0),
      X === "thread" && !M && /* @__PURE__ */ l.jsxDEV(l.Fragment, { children: [
        /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-info", children: [
          /* @__PURE__ */ l.jsxDEV("p", { children: [
            /* @__PURE__ */ l.jsxDEV("strong", { children: "Provider Resource ID:" }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
              lineNumber: 316,
              columnNumber: 20
            }, void 0),
            " ",
            g || "No active conversation"
          ] }, void 0, !0, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 316,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ l.jsxDEV("p", { style: { fontSize: "12px", color: "#666", marginTop: "8px" }, children: "Note: Entity ownership is typically set at initialization. Use this to update business context." }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 317,
            columnNumber: 17
          }, void 0)
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
          lineNumber: 315,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-section", children: [
          /* @__PURE__ */ l.jsxDEV("h4", { style: { marginBottom: "8px", fontSize: "14px", fontWeight: "600" }, children: "Update Business Context" }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 324,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ l.jsxDEV("p", { style: { marginBottom: "12px", fontSize: "12px", color: "#666" }, children: "Update dynamic metadata like order IDs, table IDs, status, etc." }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 325,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-field", children: [
            /* @__PURE__ */ l.jsxDEV("label", { htmlFor: "tag", children: "Tag:" }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
              lineNumber: 330,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ l.jsxDEV(
              "input",
              {
                id: "tag",
                type: "text",
                value: y,
                onChange: (F) => D(F.target.value),
                placeholder: "e.g., customer-inquiry, support",
                className: "chat-wrapper__dev-settings-input",
                disabled: M || !g
              },
              void 0,
              !1,
              {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
                lineNumber: 331,
                columnNumber: 19
              },
              void 0
            ),
            /* @__PURE__ */ l.jsxDEV("p", { className: "chat-wrapper__dev-settings-help", children: "Optional tag for categorizing the thread." }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
              lineNumber: 340,
              columnNumber: 19
            }, void 0)
          ] }, void 0, !0, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 329,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-field", children: [
            /* @__PURE__ */ l.jsxDEV("label", { htmlFor: "metadata", children: "Metadata (JSON):" }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
              lineNumber: 346,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ l.jsxDEV(
              "textarea",
              {
                id: "metadata",
                value: U,
                onChange: (F) => P(F.target.value),
                placeholder: '{"orderId": "order_789", "tableId": "table_5", "status": "pending"}',
                className: "chat-wrapper__dev-settings-input",
                rows: 4,
                disabled: M || !g
              },
              void 0,
              !1,
              {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
                lineNumber: 347,
                columnNumber: 19
              },
              void 0
            ),
            /* @__PURE__ */ l.jsxDEV("p", { className: "chat-wrapper__dev-settings-help", children: "App-specific business data (orderId, tableId, campaignId, etc.)." }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
              lineNumber: 356,
              columnNumber: 19
            }, void 0)
          ] }, void 0, !0, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 345,
            columnNumber: 17
          }, void 0)
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
          lineNumber: 323,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ l.jsxDEV("div", { style: { borderTop: "1px solid #e0e0e0", margin: "20px 0" } }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
          lineNumber: 363,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ l.jsxDEV("details", { style: { marginTop: "16px" }, children: [
          /* @__PURE__ */ l.jsxDEV("summary", { style: { cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#666" }, children: "Advanced: Change Entity Ownership (Rare)" }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 367,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ l.jsxDEV("div", { style: { marginTop: "12px", padding: "12px", backgroundColor: "#f9f9f9", borderRadius: "4px" }, children: [
            /* @__PURE__ */ l.jsxDEV("p", { style: { fontSize: "12px", color: "#666", marginBottom: "12px" }, children: "⚠️ Entity is typically set at initialization. Only change this if transferring conversation ownership." }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
              lineNumber: 371,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-field", children: [
              /* @__PURE__ */ l.jsxDEV("label", { htmlFor: "entity-id", children: "Entity ID:" }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
                lineNumber: 376,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ l.jsxDEV(
                "input",
                {
                  id: "entity-id",
                  type: "text",
                  value: f,
                  onChange: (F) => E(F.target.value),
                  placeholder: "e.g., brand_123 or account_456",
                  className: "chat-wrapper__dev-settings-input",
                  disabled: M || !g
                },
                void 0,
                !1,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
                  lineNumber: 377,
                  columnNumber: 21
                },
                void 0
              ),
              /* @__PURE__ */ l.jsxDEV("p", { className: "chat-wrapper__dev-settings-help", children: "The brand or account ID to attach this thread to." }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
                lineNumber: 386,
                columnNumber: 21
              }, void 0)
            ] }, void 0, !0, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
              lineNumber: 375,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-field", children: [
              /* @__PURE__ */ l.jsxDEV("label", { htmlFor: "entity-type", children: "Entity Type:" }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
                lineNumber: 392,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ l.jsxDEV(
                "select",
                {
                  id: "entity-type",
                  value: w,
                  onChange: (F) => I(F.target.value),
                  className: "chat-wrapper__dev-settings-input",
                  disabled: M || !g,
                  children: [
                    /* @__PURE__ */ l.jsxDEV("option", { value: "", children: "-- Select Type --" }, void 0, !1, {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
                      lineNumber: 400,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ l.jsxDEV("option", { value: "BRAND", children: "BRAND" }, void 0, !1, {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
                      lineNumber: 401,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ l.jsxDEV("option", { value: "ACCOUNT", children: "ACCOUNT" }, void 0, !1, {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
                      lineNumber: 402,
                      columnNumber: 23
                    }, void 0)
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
                  lineNumber: 393,
                  columnNumber: 21
                },
                void 0
              ),
              /* @__PURE__ */ l.jsxDEV("p", { className: "chat-wrapper__dev-settings-help", children: "Type of entity (BRAND or ACCOUNT)." }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
                lineNumber: 404,
                columnNumber: 21
              }, void 0)
            ] }, void 0, !0, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
              lineNumber: 391,
              columnNumber: 19
            }, void 0)
          ] }, void 0, !0, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
            lineNumber: 370,
            columnNumber: 17
          }, void 0)
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
          lineNumber: 366,
          columnNumber: 15
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
        lineNumber: 314,
        columnNumber: 13
      }, void 0)
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
      lineNumber: 234,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ l.jsxDEV(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: ie,
          disabled: M,
          children: "Cancel"
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
          lineNumber: 416,
          columnNumber: 11
        },
        void 0
      ),
      X === "agent" && /* @__PURE__ */ l.jsxDEV(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: L,
          disabled: M || !s,
          children: M ? "Saving..." : "Save & Reload"
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
          lineNumber: 424,
          columnNumber: 13
        },
        void 0
      ),
      X === "thread" && /* @__PURE__ */ l.jsxDEV(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: B,
          disabled: M || !g,
          children: M ? "Updating..." : "Update Thread"
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
          lineNumber: 433,
          columnNumber: 13
        },
        void 0
      )
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
      lineNumber: 415,
      columnNumber: 9
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
    lineNumber: 195,
    columnNumber: 7
  }, void 0) }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/DevSettings.tsx",
    lineNumber: 194,
    columnNumber: 5
  }, void 0) : null;
}, Zs = {
  maxReconnectAttempts: 1 / 0,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, Rn = {
  NORMAL: 1e3,
  // Normal closure
  GOING_AWAY: 1001
};
var Ct = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(Ct || {}), jt = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e.STOP_RUN = "stop_run", e))(jt || {}), Xe = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.THREAD_CREATED = "thread_created", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(Xe || {}), Wn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(Wn || {}), qt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(qt || {});
class cn {
  static createConnectionEvent(t, n) {
    return {
      type: t,
      timestamp: /* @__PURE__ */ new Date(),
      data: n
    };
  }
  static createChatEvent(t, n) {
    return {
      type: t,
      timestamp: /* @__PURE__ */ new Date(),
      data: n
    };
  }
  // Convenience methods for common events
  static connectionEstablished() {
    return this.createConnectionEvent(Ct.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(Ct.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(Ct.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(Ct.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(Ct.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(Ct.CHAT_ERROR, { error: t, errorCode: n });
  }
}
class Ht {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(t) {
    return {
      type: jt.CHAT_MESSAGE,
      content: t.content,
      media: t.media || [],
      providerResId: t.providerResId
    };
  }
  /**
   * Create a configure tools message
   */
  static createConfigureToolsMessage(t, n) {
    return {
      type: jt.CONFIGURE_TOOLS,
      toolSchemas: t,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(t) {
    return {
      type: jt.UPDATE_TOOLS,
      toolSchemas: t
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(t) {
    return {
      type: jt.UPDATE_CONTEXT_HELPERS,
      contextHelpers: t
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(t, n) {
    return {
      type: jt.TOOL_CALL_RESPONSE,
      callId: t,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(t, n) {
    return {
      type: jt.TOOL_CALL_RESPONSE,
      callId: t,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: jt.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(t, n) {
    return {
      type: jt.HEARTBEAT_PONG,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      originalTimestamp: t,
      pingTime: n
    };
  }
  /**
   * Create a stop run message
   */
  static createStopRunMessage(t) {
    return {
      type: jt.STOP_RUN,
      conversationUuid: t
    };
  }
  /**
   * Serialize a message to JSON string for sending over WebSocket
   */
  static serialize(t) {
    return JSON.stringify(t);
  }
  /**
   * Generic helper to create and serialize any message in one call
   */
  static createAndSerialize(t) {
    return this.serialize(t());
  }
  /**
   * Helper methods to create and serialize messages in one call
   */
  static serializeChatMessage(t) {
    return this.createAndSerialize(() => this.createChatMessage(t));
  }
  static serializeConfigureTools(t, n) {
    return this.createAndSerialize(
      () => this.createConfigureToolsMessage(t, n)
    );
  }
  static serializeUpdateTools(t) {
    return this.createAndSerialize(() => this.createUpdateToolsMessage(t));
  }
  static serializeUpdateContextHelpers(t) {
    return this.createAndSerialize(
      () => this.createUpdateContextHelpersMessage(t)
    );
  }
  static serializeToolCallSuccess(t, n) {
    return this.createAndSerialize(
      () => this.createToolCallSuccessResponse(t, n)
    );
  }
  static serializeToolCallError(t, n) {
    return this.createAndSerialize(
      () => this.createToolCallErrorResponse(t, n)
    );
  }
  static serializeHeartbeatPing() {
    return this.createAndSerialize(() => this.createHeartbeatPing());
  }
  static serializeHeartbeatPong(t, n) {
    return this.createAndSerialize(
      () => this.createHeartbeatPong(t, n)
    );
  }
  static serializeStopRun(t) {
    return this.createAndSerialize(
      () => this.createStopRunMessage(t)
    );
  }
}
class Ys {
  constructor(t, n) {
    J(this, "ws", null);
    J(this, "config");
    J(this, "connectionState");
    J(this, "reconnectTimer", null);
    J(this, "heartbeatInterval", null);
    J(this, "visibilityChangeHandler");
    J(this, "currentTicket", null);
    J(this, "currentSessionId", null);
    J(this, "intentionalDisconnect", !1);
    // Track intentional disconnects
    J(this, "onOpen");
    J(this, "onMessage");
    J(this, "onError");
    J(this, "onClose");
    J(this, "onSystemEvent");
    this.config = t, this.connectionState = n, this.visibilityChangeHandler = this.handleVisibilityChange.bind(this), this.registerVisibilityHandler();
  }
  connect(t) {
    return new Promise((n, r) => {
      try {
        this.intentionalDisconnect = !1, t && (this.currentTicket = t);
        const i = this.buildWebSocketUrl();
        if (this.ws = new WebSocket(i), !this.ws) {
          r(new Error("WebSocket not initialized"));
          return;
        }
        this.setupEventHandlers(n, r);
      } catch (i) {
        r(i);
      }
    });
  }
  buildWebSocketUrl() {
    let t = this.config.apiUrl.replace(/^https:\/\//, "wss://").replace(/^http:\/\//, "ws://");
    if (t = t.endsWith("/ws") ? t : t + "/ws", this.currentSessionId) {
      const n = t.includes("?") ? "&" : "?";
      return t = `${t}${n}sessionId=${this.currentSessionId}`, t;
    }
    if (this.currentTicket) {
      const n = t.includes("?") ? "&" : "?";
      t = `${t}${n}ticket=${this.currentTicket}`;
    }
    return t;
  }
  setupEventHandlers(t, n) {
    this.ws && (this.ws.onopen = () => this.handleConnectionOpened(t), this.ws.onerror = (r) => this.handleConnectionError(r, t, n), this.ws.onmessage = (r) => {
      var i;
      return (i = this.onMessage) == null ? void 0 : i.call(this, r);
    }, this.ws.onclose = (r) => this.handleConnectionClosed(r));
  }
  handleConnectionOpened(t) {
    var n;
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (n = this.onOpen) == null || n.call(this), t == null || t();
  }
  handleConnectionError(t, n, r) {
    var i;
    if ((i = this.onError) == null || i.call(this, t), this.connectionState.setConnected(!1), r) {
      r(t);
      return;
    }
    this.intentionalDisconnect || this.scheduleReconnectAfterError();
  }
  handleConnectionClosed(t) {
    var n;
    console.log("[WebSocketManager] Connection closed", {
      code: t.code,
      reason: t.reason,
      intentionalDisconnect: this.intentionalDisconnect
    }), this.processConnectionClosure(t), (n = this.onClose) == null || n.call(this, t), this.shouldReconnectAfterClose(t.code) ? (console.log("[WebSocketManager] Should reconnect, calling attemptReconnect"), this.attemptReconnect()) : console.log("[WebSocketManager] Should NOT reconnect");
  }
  updateConnectionState(t, n) {
    this.connectionState.setConnected(t), this.connectionState.setReconnecting(n), this.connectionState.resetReconnectAttempts(), this.connectionState.updateReconnectDelay(this.config.reconnectDelay);
  }
  processConnectionClosure(t) {
    this.connectionState.setConnected(!1), this.stopHeartbeat();
  }
  shouldReconnectAfterClose(t) {
    if (console.log("[WebSocketManager] shouldReconnectAfterClose check", {
      closeCode: t,
      intentionalDisconnect: this.intentionalDisconnect,
      NORMAL: Rn.NORMAL,
      GOING_AWAY: Rn.GOING_AWAY
    }), this.intentionalDisconnect)
      return console.log("[WebSocketManager] Intentional disconnect - no reconnect"), !1;
    const { NORMAL: n } = Rn, r = t !== n;
    return console.log("[WebSocketManager] Should reconnect?", r), r;
  }
  handleVisibilityChange() {
    document.visibilityState === "visible" && !this.connectionState.isConnected && !this.connectionState.isReconnecting && this.attemptReconnect();
  }
  registerVisibilityHandler() {
    typeof document < "u" && document.addEventListener(
      "visibilitychange",
      this.visibilityChangeHandler
    );
  }
  attemptReconnect() {
    var s, a;
    if (console.log("[WebSocketManager] attemptReconnect called", {
      reconnectAttempts: this.connectionState.reconnectAttempts,
      maxReconnectAttempts: this.config.maxReconnectAttempts,
      isReconnecting: this.connectionState.isReconnecting,
      reconnectTimer: this.reconnectTimer
    }), this.connectionState.reconnectAttempts >= this.config.maxReconnectAttempts) {
      console.log("[WebSocketManager] Max reconnection attempts reached"), (s = this.onSystemEvent) == null || s.call(
        this,
        cn.connectionLost("Max reconnection attempts reached")
      ), this.connectionState.setReconnecting(!1);
      return;
    }
    if (this.reconnectTimer !== null) {
      console.log("[WebSocketManager] Reconnection already in progress, skipping");
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    console.log("[WebSocketManager] Firing RECONNECTING event", { attempt: t, maxAttempts: n }), (a = this.onSystemEvent) == null || a.call(this, cn.reconnecting(t, n));
    const r = this.config.reconnectDelay, i = Math.random() * 90 + 10, o = r + i;
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null, this.connectionState.isConnected || this.reconnect();
    }, o);
  }
  reconnect() {
    try {
      this.closeConnection();
      const t = this.buildWebSocketUrl();
      this.ws = new WebSocket(t), this.setupReconnectHandlers();
    } catch {
      this.scheduleReconnectAfterError();
    }
  }
  /**
   * Update the ticket for future connections
   */
  updateTicket(t) {
    this.currentTicket = t;
  }
  /**
   * Update the sessionId to be used for reconnections.
   * The server issues a sessionId in the `session_established` message which
   * should be used for subsequent reconnect attempts (tickets can be single-use).
   */
  updateSession(t) {
    this.currentSessionId = t;
  }
  setupReconnectHandlers() {
    this.ws && (this.ws.onopen = () => this.handleReconnectionOpened(), this.ws.onerror = () => this.handleReconnectionError(), this.ws.onmessage = (t) => {
      var n;
      return (n = this.onMessage) == null ? void 0 : n.call(this, t);
    }, this.ws.onclose = (t) => this.handleReconnectionClosed(t));
  }
  handleReconnectionOpened() {
    var t, n;
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, cn.connectionRestored()), (n = this.onOpen) == null || n.call(this);
  }
  handleReconnectionError() {
    this.scheduleReconnectAfterError();
  }
  scheduleReconnectAfterError() {
    const t = this.config.reconnectDelay, n = Math.random() * 90 + 10, r = t + n;
    this.reconnectTimer !== null && (window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null), setTimeout(
      () => this.attemptReconnect(),
      r
    );
  }
  handleReconnectionClosed(t) {
    this.processConnectionClosure(t), this.shouldReconnectAfterClose(t.code) ? this.attemptReconnect() : this.connectionState.setReconnecting(!1);
  }
  startHeartbeat() {
  }
  sendHeartbeat() {
    const t = Ht.serializeHeartbeatPing();
    this.send(t);
  }
  stopHeartbeat() {
    this.heartbeatInterval && (clearInterval(this.heartbeatInterval), this.heartbeatInterval = null);
  }
  send(t) {
    var n;
    ((n = this.ws) == null ? void 0 : n.readyState) === WebSocket.OPEN && this.ws.send(t);
  }
  closeConnection() {
    this.ws && this.ws.close(Rn.NORMAL);
  }
  disconnect() {
    this.intentionalDisconnect = !0, this.clearTimers(), this.removeEventListeners(), this.closeConnection(), this.connectionState.reset(), this.ws = null;
  }
  clearTimers() {
    this.reconnectTimer && (window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null), this.stopHeartbeat();
  }
  removeEventListeners() {
    typeof document < "u" && this.visibilityChangeHandler && document.removeEventListener(
      "visibilitychange",
      this.visibilityChangeHandler
    );
  }
  getWebSocketState() {
    return this.ws ? {
      [WebSocket.CONNECTING]: "CONNECTING",
      [WebSocket.OPEN]: "OPEN",
      [WebSocket.CLOSING]: "CLOSING",
      [WebSocket.CLOSED]: "CLOSED"
    }[this.ws.readyState] || "UNKNOWN" : "null";
  }
  setEventHandlers(t) {
    this.onOpen = t.onOpen, this.onMessage = t.onMessage, this.onError = t.onError, this.onClose = t.onClose, this.onSystemEvent = t.onSystemEvent;
  }
}
class Ks {
  constructor() {
    J(this, "state");
    this.state = {
      isConnected: !1,
      isReconnecting: !1,
      reconnectAttempts: 0,
      reconnectDelay: 1e3
    };
  }
  update(t) {
    Object.assign(this.state, t);
  }
  get isConnected() {
    return this.state.isConnected;
  }
  get isReconnecting() {
    return this.state.isReconnecting;
  }
  get reconnectAttempts() {
    return this.state.reconnectAttempts;
  }
  get reconnectDelay() {
    return this.state.reconnectDelay;
  }
  setConnected(t) {
    this.state.isConnected = t;
  }
  setReconnecting(t) {
    this.state.isReconnecting = t;
  }
  incrementReconnectAttempts() {
    this.state.reconnectAttempts++;
  }
  resetReconnectAttempts() {
    this.state.reconnectAttempts = 0;
  }
  updateReconnectDelay(t) {
    this.state.reconnectDelay = t;
  }
  reset() {
    this.state = {
      isConnected: !1,
      isReconnecting: !1,
      reconnectAttempts: 0,
      reconnectDelay: 1e3
    };
  }
  getSnapshot() {
    return { ...this.state };
  }
}
class Bn {
  /**
   * Create a synthetic ToolCallRequest for server-side tool calls
   */
  static createServerToolCall(t, n, r = {}) {
    return {
      toolName: t,
      callId: n,
      parameters: r
    };
  }
  /**
   * Create a synthetic ToolCallRequest for reasoning operations
   */
  static createReasoningCall(t, n, r) {
    return {
      toolName: "reasoning",
      callId: t,
      parameters: { phase: n, ...r }
    };
  }
  /**
   * Create a synthetic ToolCallRequest for Latitude tool calls
   */
  static createLatitudeToolCall(t, n, r = {}) {
    return {
      toolName: t,
      callId: n,
      parameters: r
    };
  }
}
class fo {
  constructor(t = {}) {
    J(this, "handlers", {});
    this.handlers = t;
  }
  updateEventHandlers(t) {
    Object.assign(this.handlers, t), this.onHandlersUpdated(t);
  }
  /**
   * Hook for subclasses to react to handler updates
   */
  onHandlersUpdated(t) {
  }
  getHandler(t) {
    return this.handlers[t];
  }
}
const se = {
  // Message prefixes and markers
  THINKING_PREFIX: "THINKING:",
  REASONING_PREFIX: "REASONING:",
  THOUGHT_PREFIX: "THOUGHT:",
  // Status indicators
  COMPLETED_MARKER: "✅ Completed:",
  ERROR_MARKER: "❌",
  HANDLING_MARKER: "🔧 Handling:",
  // UI Text constants
  UI_TEXT: {
    AI_IS_THINKING: "AI is thinking",
    THINKING: "Thinking",
    THINKING_ELLIPSIS: "Thinking...",
    PROCESSING: "Processing",
    THOUGHT: "Thought"
  },
  // Message types
  MESSAGE_TYPES: {
    THINKING: "thinking",
    REASONING: "reasoning",
    THOUGHT: "thought",
    COMPLETED: "completed",
    ERROR: "error",
    PROCESSING: "processing"
  },
  // Detection patterns
  PATTERNS: {
    DURATION: /for ([\d.]+) seconds/,
    THOUGHT_CONTENT: /\*\*(.*?)\*\*/g,
    HANDLING_TOOL: /🔧 Handling: (.+)/,
    COMPLETED_OR_ERROR_TOOL: /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
  }
}, $e = {
  isThinkingMessage: (e) => e.startsWith(se.THINKING_PREFIX) || e.startsWith(se.REASONING_PREFIX) || e.startsWith(se.THOUGHT_PREFIX),
  isCompletedMessage: (e) => e.includes(se.COMPLETED_MARKER),
  isErrorMessage: (e) => e.includes(se.ERROR_MARKER),
  isHandlingMessage: (e) => e.includes(se.HANDLING_MARKER),
  extractDuration: (e) => {
    const t = e.match(se.PATTERNS.DURATION);
    return t ? ` for ${t[1]} seconds` : void 0;
  },
  cleanReasoningContent: (e) => {
    let t = e.replace(new RegExp(`^${se.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${se.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${se.THOUGHT_PREFIX}\\s*`), "");
    return t = t.replace(/\s*for [\d.]+\s*seconds$/, ""), t = t.replace(se.PATTERNS.THOUGHT_CONTENT, ""), t.trim();
  },
  getMessageType: (e, t) => t === !1 ? $e.isErrorMessage(e) ? se.MESSAGE_TYPES.ERROR : ($e.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || $e.isThinkingMessage(e), se.MESSAGE_TYPES.THOUGHT) : $e.isCompletedMessage(e) ? se.MESSAGE_TYPES.COMPLETED : $e.isErrorMessage(e) ? se.MESSAGE_TYPES.ERROR : ($e.isHandlingMessage(e) || $e.isThinkingMessage(e) && !e.includes(se.UI_TEXT.AI_IS_THINKING), se.MESSAGE_TYPES.THINKING)
};
class Xs extends fo {
  constructor(n) {
    super({ onReasoningUpdate: n });
    J(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    J(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, o, s) {
    const a = this.getHandler("onReasoningUpdate");
    if (!a) return;
    const u = Bn.createReasoningCall(
      i,
      o,
      s || {}
    );
    a(n, r, u);
  }
  handleReasoningStart(n) {
    const r = n.id || "reasoning";
    this.reasoningStartTimes.set(r, Date.now()), this.reasoningContent.set(r, "");
  }
  handleReasoningDelta(n) {
    if (!n.text) return;
    const r = n.id || "reasoning", o = (this.reasoningContent.get(r) || "") + n.text;
    this.reasoningContent.set(r, o);
    const s = `${se.THINKING_PREFIX} ${o}`;
    this.triggerReasoningUpdate(
      !0,
      s,
      r,
      "thinking",
      { text: o }
    );
  }
  handleReasoningEnd(n) {
    const r = n.id || "reasoning", i = this.reasoningContent.get(r) || "", o = this.reasoningStartTimes.get(r);
    let s = "";
    o && (s = ` for ${((Date.now() - o) / 1e3).toFixed(0)} seconds`, this.reasoningStartTimes.delete(r));
    const a = i || se.UI_TEXT.THOUGHT, u = `${se.THOUGHT_PREFIX} ${a}${s}`;
    this.triggerReasoningUpdate(
      !1,
      u,
      r,
      "end",
      { duration: s, fullContent: i }
    ), this.reasoningContent.delete(r);
  }
  setReasoningUpdateHandler(n) {
    this.updateEventHandlers({ onReasoningUpdate: n });
  }
}
class Js extends fo {
  constructor(n = {}, r) {
    super({ onReasoningUpdate: r });
    J(this, "processedToolCalls", /* @__PURE__ */ new Set());
    J(this, "clientTools", {});
    J(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var s, a, u;
    const { callId: r, toolName: i, parameters: o } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (s = this.getHandler("onReasoningUpdate")) == null || s(!0, `${se.HANDLING_MARKER} ${i}`, n);
      try {
        const h = await this.executeToolFunction(i, o);
        this.sendToolResponse(r, h), (a = this.getHandler("onReasoningUpdate")) == null || a(!1, `${se.COMPLETED_MARKER} ${i}`, n);
      } catch (h) {
        this.sendToolError(r, h), (u = this.getHandler("onReasoningUpdate")) == null || u(!1, `${se.ERROR_MARKER} Error: ${i} - ${h}`, n);
      }
    }
  }
  async executeToolFunction(n, r) {
    const i = this.clientTools[n];
    if (!i)
      throw new Error(`Tool not found: ${n}`);
    return await i(r);
  }
  sendToolResponse(n, r) {
    if (!this.sendMessage)
      return;
    const i = Ht.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", o = Ht.serializeToolCallError(n, i);
    this.sendMessage(o);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const o = Bn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId,
        n.args || {}
      );
      r(!0, `${se.HANDLING_MARKER} ${n.toolName}`, o);
    }
  }
  handleServerToolResult(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const o = Bn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId
      );
      r(
        !1,
        `${se.COMPLETED_MARKER} ${n.toolName}`,
        o
      );
    }
  }
  clearProcessedToolCalls() {
    this.processedToolCalls.clear();
  }
  updateClientTools(n) {
    this.clientTools = { ...this.clientTools, ...n };
  }
  setSendMessageHandler(n) {
    this.sendMessage = n;
  }
  setReasoningUpdateHandler(n) {
    this.updateEventHandlers({ onReasoningUpdate: n });
  }
}
class Qs {
  constructor(t, n = {}) {
    J(this, "reasoningHandler");
    J(this, "toolHandler");
    J(this, "handlers");
    J(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new Xs(t.onReasoningUpdate), this.toolHandler = new Js(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case Xe.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case Xe.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case Xe.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case Xe.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case Xe.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case Xe.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case Xe.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case Xe.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case Xe.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case Xe.HEARTBEAT_ACK:
          break;
        case Xe.ERROR:
          this.handleError(n);
          break;
        default:
          break;
      }
      return n;
    } catch {
      return null;
    }
  }
  handleSessionEstablished() {
  }
  handleToolsConfigured() {
  }
  handleClientToolsUpdated() {
  }
  handleConfigureToolsRequest() {
  }
  handleChatEvent(t) {
    var n, r, i;
    switch (t.event) {
      case Wn.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case Wn.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case Wn.CONTENT_DELTA:
        (n = t.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, t.data.delta));
        break;
    }
  }
  handleProviderEvent(t) {
    var r, i, o;
    switch ((r = t.data) == null ? void 0 : r.type) {
      case qt.TEXT_DELTA:
        t.data.textDelta && ((o = (i = this.handlers).onSetMessage) == null || o.call(i, t.data.textDelta));
        break;
      case qt.REASONING_START:
        this.reasoningHandler.handleReasoningStart(t.data);
        break;
      case qt.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(t.data);
        break;
      case qt.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(t.data);
        break;
      case qt.TOOL_CALL:
        this.toolHandler.handleServerToolCall(t.data);
        break;
      case qt.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(t.data);
        break;
    }
  }
  handleLatitudeEvent(t) {
    var n;
    if (((n = t.data) == null ? void 0 : n.type) === qt.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = t.data;
      if (r.toolCallId && r.toolName) {
        const i = Bn.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${se.COMPLETED_MARKER} ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, cn.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      cn.chatError(t.error || "Unknown error")
    );
  }
  handleToolCallRequest(t) {
    this.toolHandler.handleToolCallRequest(t);
  }
  handleHeartbeatPing(t) {
    if (!this.sendMessage)
      return;
    const n = Ht.serializeHeartbeatPong(
      t.timestamp,
      t.pingTime
    );
    this.sendMessage(n);
  }
  handleError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      cn.chatError(t.error || "Unknown WebSocket error")
    );
  }
  updateClientTools(t) {
    this.toolHandler.updateClientTools(t);
  }
  clearProcessedToolCalls() {
    this.toolHandler.clearProcessedToolCalls();
  }
  setSendMessageHandler(t) {
    this.sendMessage = t, this.toolHandler.setSendMessageHandler(t);
  }
  updateEventHandlers(t) {
    Object.assign(this.handlers, t), this.reasoningHandler.updateEventHandlers(t), this.toolHandler.updateEventHandlers(t);
  }
}
async function ea(e, t) {
  const n = {
    "Content-Type": "application/json"
  };
  t != null && t.userMpAuthToken && (n["x-oddle-mp-auth-token"] = t.userMpAuthToken), t != null && t.chatServerKey && (n["x-oddle-chat-server-key"] = t.chatServerKey);
  try {
    const r = await fetch(`${e}/api/v1/tickets`, {
      method: "POST",
      headers: n,
      body: JSON.stringify({
        entityId: t.entityId,
        entityType: t.entityType,
        providerResId: t.providerResId,
        clientInfo: {
          userAgent: navigator.userAgent,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          ...t.clientInfo
        }
      })
    });
    if (!r.ok) {
      const o = await r.json().catch(() => ({}));
      throw new Error(
        o.error || `Failed to get WebSocket ticket: ${r.statusText}`
      );
    }
    const i = await r.json();
    if (!i.success || !i.ticket)
      throw new Error(i.error || "Invalid ticket response from server");
    return i;
  } catch (r) {
    throw console.error("Error requesting WebSocket ticket:", r), r;
  }
}
function Cr(e) {
  if (!e.success || !e.ticket || !e.expiresAt)
    return !1;
  const t = new Date(e.expiresAt).getTime();
  return Date.now() < t - 3e4;
}
function ai(e) {
  const t = Cr(e), n = new Date(e.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: t,
    expiresIn: i,
    expired: r >= n
  };
}
function ta(e) {
  var r, i, o;
  const t = ((r = e == null ? void 0 : e.message) == null ? void 0 : r.toLowerCase()) || "", n = ((i = e == null ? void 0 : e.name) == null ? void 0 : i.toLowerCase()) || "";
  if (t.includes("cors") || t.includes("cross-origin") || t.includes("blocked by cors") || n === "typeerror" && t.includes("fetch"))
    return {
      isRetryable: !1,
      reason: "CORS error detected",
      errorType: "cors"
    };
  if (t.includes("unauthorized") || t.includes("forbidden") || t.includes("authentication") || t.includes("invalid token") || t.includes("access denied"))
    return {
      isRetryable: !1,
      reason: "Authentication/authorization error",
      errorType: "auth"
    };
  if (e != null && e.status || e != null && e.response && typeof e.response == "object") {
    const s = e.status || ((o = e.response) == null ? void 0 : o.status);
    if (s === 401 || s === 403)
      return {
        isRetryable: !1,
        reason: `HTTP ${s} - authentication/permission denied`,
        errorType: "auth"
      };
    if (s === 404)
      return {
        isRetryable: !1,
        reason: "HTTP 404 - endpoint not found",
        errorType: "permission"
      };
    if (s >= 400 && s < 500)
      return {
        isRetryable: !1,
        reason: `HTTP ${s} - client error`,
        errorType: "permission"
      };
    if (s >= 500)
      return {
        isRetryable: !0,
        reason: `HTTP ${s} - server error (temporary)`,
        errorType: "server"
      };
  }
  return t.includes("network") || t.includes("timeout") || t.includes("connection") || t.includes("offline") || n === "networkerror" ? {
    isRetryable: !0,
    reason: "Network connectivity issue",
    errorType: "network"
  } : t.includes("websocket") || t.includes("ws") || n === "websocketerror" ? {
    isRetryable: !0,
    reason: "WebSocket connection issue",
    errorType: "network"
  } : {
    isRetryable: !1,
    reason: "Unknown error type",
    errorType: "unknown"
  };
}
function pn(e, t) {
  const n = ta(e);
  return console.error(`[${t}] Error occurred:`, {
    error: (e == null ? void 0 : e.message) || e,
    classification: n,
    shouldRetry: n.isRetryable
  }), n;
}
class na {
  constructor(t, n, r = {}) {
    J(this, "ticket", null);
    J(this, "refreshPromise", null);
    J(this, "validationInterval", null);
    J(this, "authData");
    J(this, "apiUrl");
    J(this, "config");
    this.authData = t, this.apiUrl = this.convertToHttpUrl(n), this.config = {
      checkInterval: r.checkInterval ?? 6e4,
      renewalThreshold: r.renewalThreshold ?? 300
    };
  }
  /**
   * Convert WebSocket URL to HTTP URL for ticket requests
   * wss:// -> https://, ws:// -> http://
   * Also handles http:// and https:// (keeps them as-is)
   */
  convertToHttpUrl(t) {
    return t.replace(/^wss:\/\//, "https://").replace(/^ws:\/\//, "http://");
  }
  /**
   * Get a valid ticket, refreshing if necessary
   * This is the main entry point for getting tickets
   * 
   * @returns Valid ticket string
   * @throws Error if ticket refresh fails
   */
  async getValidTicket() {
    return this.ticket && Cr(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
  }
  /**
   * Refresh the ticket, preventing duplicate refreshes
   * Multiple concurrent calls will wait for the same refresh
   * 
   * This prevents race conditions by:
   * 1. Checking if refresh is in progress
   * 2. If yes, returning the same promise (all callers wait together)
   * 3. If no, starting new refresh and storing the promise
   * 
   * @returns Promise that resolves to new ticket string
   */
  async refreshTicket() {
    if (this.refreshPromise)
      return console.log("TicketManager: Refresh already in progress, waiting..."), this.refreshPromise;
    this.refreshPromise = this._doRefresh();
    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }
  /**
   * Internal method to actually perform the refresh
   * @private
   */
  async _doRefresh() {
    console.log("TicketManager: Requesting new ticket...", {
      apiUrl: this.apiUrl
    });
    try {
      return this.ticket = await ea(this.apiUrl, this.authData), console.log("TicketManager: Ticket received successfully", {
        hasTicket: !!this.ticket.ticket,
        expiresAt: this.ticket.expiresAt
      }), this.ticket.ticket;
    } catch (t) {
      const n = pn(t, "TicketManager");
      throw n.isRetryable ? new Error(
        `Ticket refresh failed (retryable): ${t instanceof Error ? t.message : "Unknown error"}`
      ) : new Error(
        `Ticket refresh failed (non-retryable - ${n.reason}): ${t instanceof Error ? t.message : "Unknown error"}`
      );
    }
  }
  /**
   * Start proactive ticket renewal before expiration
   * Checks ticket validity at regular intervals and renews if needed
   * 
   * @param onRenewed - Optional callback when ticket is renewed
   */
  startProactiveRenewal(t) {
    this.stopProactiveRenewal(), console.log("TicketManager: Starting proactive renewal", {
      checkInterval: this.config.checkInterval,
      renewalThreshold: this.config.renewalThreshold
    }), this.validationInterval = window.setInterval(async () => {
      await this.checkAndRenew(t);
    }, this.config.checkInterval);
  }
  /**
   * Check ticket validity and renew if needed
   * @private
   */
  async checkAndRenew(t) {
    if (!this.ticket) {
      console.warn("TicketManager: No ticket to validate");
      return;
    }
    try {
      const r = ai(this.ticket).expiresIn / 1e3;
      r < this.config.renewalThreshold && (console.log(
        `TicketManager: Ticket expires in ${r.toFixed(0)}s, renewing...`
      ), await this.refreshTicket(), console.log("TicketManager: Ticket renewed proactively"), t == null || t());
    } catch (n) {
      const r = pn(n, "TicketManager:ProactiveRenewal");
      r.isRetryable || (console.warn(`TicketManager: Stopping proactive renewal due to non-retryable error: ${r.reason}`), this.stopProactiveRenewal());
    }
  }
  /**
   * Stop proactive renewal
   */
  stopProactiveRenewal() {
    this.validationInterval && (clearInterval(this.validationInterval), this.validationInterval = null, console.log("TicketManager: Stopped proactive renewal"));
  }
  /**
   * Check if current ticket is valid
   */
  isValid() {
    return this.ticket ? Cr(this.ticket) : !1;
  }
  /**
   * Get time until ticket expires (in milliseconds)
   */
  getExpiresIn() {
    if (this.ticket)
      try {
        return ai(this.ticket).expiresIn;
      } catch (t) {
        console.warn("TicketManager: Error getting ticket info", t);
        return;
      }
  }
  /**
   * Get ticket expiration timestamp
   */
  getExpiresAt() {
    var t;
    return (t = this.ticket) == null ? void 0 : t.expiresAt;
  }
  /**
   * Update authentication data (e.g., after user login)
   */
  updateAuthData(t) {
    this.authData = { ...this.authData, ...t }, console.log("TicketManager: Auth data updated");
  }
  /**
   * Clear ticket (e.g., on logout)
   */
  clear() {
    this.ticket = null, this.stopProactiveRenewal(), console.log("TicketManager: Ticket cleared");
  }
  /**
   * Get debug information about current ticket state
   */
  getDebugInfo() {
    return {
      hasTicket: !!this.ticket,
      isValid: this.isValid(),
      expiresAt: this.getExpiresAt(),
      expiresIn: this.getExpiresIn(),
      isRefreshing: !!this.refreshPromise
    };
  }
}
class ra {
  constructor() {
    J(this, "config");
    J(this, "connectionState");
    J(this, "wsManager");
    J(this, "messageHandler");
    J(this, "initResolve");
    J(this, "initReject");
    // Client tools and context
    J(this, "toolSchemas", []);
    J(this, "contextHelpers", {});
    // Ticket management - now centralized in TicketManager
    J(this, "ticketManager", null);
    // Authentication credentials for HTTP API calls
    J(this, "authCredentials", {});
    this.config = {
      ...Zs
    }, this.connectionState = new Ks(), this.wsManager = new Ys(this.config, this.connectionState), this.messageHandler = new Qs({}), this.setupWebSocketHandlers();
  }
  setupWebSocketHandlers() {
    this.wsManager.setEventHandlers({
      onMessage: (t) => this.handleWebSocketMessage(t),
      onOpen: () => this.handleConnectionOpen(),
      onSystemEvent: (t) => {
        var r, i;
        (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onSystemEvent) == null || i.call(r, t);
      }
    }), this.messageHandler.setSendMessageHandler(
      (t) => this.wsManager.send(t)
    );
  }
  handleWebSocketMessage(t) {
    var r, i, o, s;
    const n = this.messageHandler.handleMessage(t);
    if ((n == null ? void 0 : n.type) === "authentication_error" && (console.error(
      "WebSocket authentication failed:",
      n == null ? void 0 : n.error,
      n == null ? void 0 : n.code
    ), this.handleAuthenticationFailure(n)), (n == null ? void 0 : n.type) === Xe.THREAD_CREATED) {
      (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onThreadCreated) == null || i.call(r, n.data);
      return;
    }
    if ((n == null ? void 0 : n.type) === Xe.TOOLS_CONFIGURED) {
      (o = this.initResolve) == null || o.call(this);
      return;
    }
    if ((n == null ? void 0 : n.type) === Xe.SESSION_ESTABLISHED && (this.toolSchemas && this.toolSchemas.length > 0 ? this.sendToolConfiguration() : (s = this.initResolve) == null || s.call(this)), (n == null ? void 0 : n.type) === Xe.SESSION_ESTABLISHED) {
      const a = n == null ? void 0 : n.sessionId;
      a && this.wsManager.updateSession(a);
    }
  }
  handleConnectionOpen() {
    console.log("WebSocket connection opened with ticket authentication");
  }
  handleAuthenticationFailure(t) {
    var r, i;
    const n = t;
    console.error("Authentication failure details:", {
      error: n == null ? void 0 : n.error,
      code: n == null ? void 0 : n.code,
      hasTicket: ((r = this.ticketManager) == null ? void 0 : r.isValid()) ?? !1
    }), (n == null ? void 0 : n.code) === "TICKET_INVALID" || (n == null ? void 0 : n.code) === "TICKET_EXPIRED" ? (console.log("Attempting to refresh ticket and reconnect..."), this.refreshTicketAndReconnect().catch((o) => {
      var a;
      const s = pn(o, "TicketRefresh");
      s.isRetryable || console.warn(`[WebSocketClient] Ticket refresh failed, will not retry: ${s.reason}`), (a = this.initReject) == null || a.call(this, o);
    })) : (i = this.initReject) == null || i.call(
      this,
      new Error(`Authentication failed: ${n == null ? void 0 : n.error}`)
    );
  }
  sendToolConfiguration() {
    const t = Ht.serializeConfigureTools(
      this.toolSchemas,
      this.contextHelpers
    );
    this.wsManager.send(t);
  }
  async onInit(t) {
    return this.setupEventHandlers(t), this.setupToolsAndContext(t), this.updateConfig(t), this.authCredentials = {
      userMpAuthToken: t.userMpAuthToken,
      chatServerKey: t.chatServerKey
    }, this.ticketManager = new na(
      {
        userMpAuthToken: t.userMpAuthToken,
        chatServerKey: t.chatServerKey,
        entityId: t.entityId,
        entityType: t.entityType
      },
      this.config.apiUrl
    ), new Promise(async (n, r) => {
      this.initResolve = n, this.initReject = r;
      try {
        const i = await this.ticketManager.getValidTicket();
        await this.wsManager.connect(i);
      } catch (i) {
        console.error("WebSocketChatClient: Initialization failed", i), r(i);
      }
    });
  }
  setupEventHandlers(t) {
    const n = {
      onSetMessage: t.onSetMessage,
      onSystemEvent: t.onSystemEvent,
      onReasoningUpdate: t.onReasoningUpdate,
      onThreadCreated: t.onThreadCreated
    };
    this.messageHandler.updateEventHandlers(n);
  }
  setupToolsAndContext(t) {
    this.toolSchemas = t.toolSchemas || [], this.contextHelpers = t.contextHelpers, t.clientTools && this.messageHandler.updateClientTools(t.clientTools);
  }
  updateConfig(t) {
    t.chatServerUrl && (this.config.apiUrl = t.chatServerUrl);
  }
  async onTriggerMessage(t) {
    if (!this.connectionState.isConnected)
      throw new Error("Client not connected");
    const { message: n, media: r, providerResId: i } = t;
    try {
      this.messageHandler.clearProcessedToolCalls();
      const o = Ht.serializeChatMessage({
        content: n,
        media: r,
        providerResId: i
      });
      this.wsManager.send(o);
    } catch (o) {
      throw o;
    }
  }
  disconnect() {
    var t, n;
    (t = this.ticketManager) == null || t.stopProactiveRenewal(), (n = this.ticketManager) == null || n.clear(), this.wsManager.disconnect();
  }
  isClientConnected() {
    return this.connectionState.isConnected;
  }
  updateContextHelpers(t) {
    this.contextHelpers = { ...this.contextHelpers, ...t };
    const n = Ht.serializeUpdateContextHelpers(
      this.contextHelpers
    );
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = Ht.serializeUpdateTools(this.toolSchemas);
    this.wsManager.send(r);
  }
  getConnectionStatus() {
    var t, n;
    return {
      connected: this.connectionState.isConnected,
      reconnectAttempts: this.connectionState.reconnectAttempts,
      isReconnecting: this.connectionState.isReconnecting,
      websocketState: this.wsManager.getWebSocketState(),
      hasValidTicket: ((t = this.ticketManager) == null ? void 0 : t.isValid()) ?? !1,
      ticketExpiresIn: (n = this.ticketManager) == null ? void 0 : n.getExpiresIn()
    };
  }
  /**
   * Force refresh the WebSocket ticket and reconnect
   * Useful when authentication fails or ticket expires
   */
  async refreshTicketAndReconnect() {
    console.log("WebSocketChatClient: Refreshing ticket and reconnecting...");
    try {
      if (!this.ticketManager)
        throw new Error("TicketManager not initialized");
      this.wsManager.disconnect();
      const t = await this.ticketManager.refreshTicket();
      this.wsManager.updateTicket(t), await this.wsManager.connect(), console.log(
        "WebSocketChatClient: Successfully refreshed ticket and reconnected"
      );
    } catch (t) {
      throw console.error(
        "WebSocketChatClient: Failed to refresh ticket and reconnect:",
        t
      ), t;
    }
  }
  /**
   * Check if current ticket is valid
   */
  isTicketValid() {
    var t;
    return ((t = this.ticketManager) == null ? void 0 : t.isValid()) ?? !1;
  }
  /**
   * Manual reconnection method for UI to call
   * Useful for "Reconnect" buttons or retry logic
   */
  async reconnect() {
    console.log("WebSocketChatClient: Manual reconnection requested"), await this.refreshTicketAndReconnect();
  }
  /**
   * Stop the current conversation run
   * Sends a stop_run message to the server to halt the current response generation
   */
  stopRun(t) {
    if (!this.connectionState.isConnected) {
      console.warn("WebSocketChatClient: Cannot stop run - client not connected");
      return;
    }
    console.log("WebSocketChatClient: Stopping conversation run:", t);
    const n = Ht.serializeStopRun(t);
    this.wsManager.send(n);
  }
  /**
   * Update entity information (entityId and entityType) for a conversation
   * This is useful when a conversation starts without an entity,
   * then later gets associated with one (e.g., user creates/selects an entity)
   *
   * This method:
   * 1. Makes an HTTP PATCH request to persist the entity attachment on the server
   * 2. Updates the local TicketManager auth data for future ticket renewals
   *
   * Note: This should be used for changing entity ownership (rare).
   * For updating business context (orderId, tableId, etc.), use updateMetadata() instead.
   *
   * @param providerResId - Provider resource ID (conversationId) of the thread to update
   * @param entityId - New entity ID to associate with this conversation
   * @param entityType - Entity type (BRAND or ACCOUNT)
   * @returns Promise that resolves when the update is complete
   *
   * @example
   * await client.updateEntityId('conv_abc123', 'brand_456', 'BRAND');
   */
  async updateEntityId(t, n, r) {
    if (!this.ticketManager)
      throw new Error(
        "WebSocketChatClient: Cannot update entityId - TicketManager not initialized"
      );
    console.log(
      `WebSocketChatClient: Updating entity attachment - providerResId: ${t}, entityId: ${n}, entityType: ${r}`
    );
    try {
      await ho(
        this.config.apiUrl,
        t,
        {
          entityId: n,
          entityType: r
        },
        this.authCredentials
      );
      const i = { entityId: n, entityType: r };
      this.ticketManager.updateAuthData(i);
    } catch (i) {
      throw console.error(
        "WebSocketChatClient: Failed to update entity attachment:",
        i
      ), i;
    }
  }
  /**
   * Update thread metadata and/or tag for a conversation
   * This is useful for updating dynamic business context without changing entity ownership
   *
   * Use this for frequently changing data like:
   * - Order IDs, table IDs, campaign IDs
   * - Status updates, priority changes
   * - Custom app-specific metadata
   *
   * This method makes an HTTP PATCH request to update only the metadata/tag fields,
   * leaving entityId and entityType unchanged.
   *
   * @param providerResId - Provider resource ID (conversationId) of the thread to update
   * @param updates - Metadata and/or tag to update
   * @returns Promise that resolves when the update is complete
   *
   * @example
   * await client.updateMetadata('conv_abc123', {
   *   metadata: { orderId: 'order_789', tableId: 'table_5', status: 'pending' }
   * });
   *
   * @example
   * await client.updateMetadata('conv_abc123', {
   *   tag: 'high-priority',
   *   metadata: { priority: 'urgent', assignedTo: 'agent-123' }
   * });
   */
  async updateMetadata(t, n) {
    try {
      await mo(
        this.config.apiUrl,
        t,
        n,
        this.authCredentials
      ), console.log("WebSocketChatClient: Thread metadata updated successfully");
    } catch (r) {
      throw console.error(
        "WebSocketChatClient: Failed to update thread metadata:",
        r
      ), r;
    }
  }
}
function ia({
  // Authentication and server properties
  userMpAuthToken: e,
  chatServerUrl: t,
  chatServerKey: n,
  // Entity configuration
  entityId: r,
  entityType: i,
  // Tools configuration
  tools: o,
  // Other properties
  contextHelpers: s,
  onSetMessage: a,
  onSystemEvent: u,
  onReasoningUpdate: h,
  onThreadCreated: c
}) {
  const [m, g] = Ne(
    null
  ), [f, E] = Ne(
    gt.DISCONNECTED
  ), [w, I] = Ne(0), y = qe(null), D = qe(a), U = qe(u), P = qe(h), M = qe(c);
  Le(() => {
    D.current = a, U.current = u, P.current = h, M.current = c;
  }, [a, u, h, c]);
  const { toolSchemas: T, clientToolExecutors: K } = Fe(() => {
    if (o && o.length > 0) {
      const X = o.map(({ execute: _, ...L }) => L), G = {};
      return o.forEach((_) => {
        G[_.name] = _.execute;
      }), {
        toolSchemas: X,
        clientToolExecutors: G
      };
    }
    return {
      toolSchemas: [],
      clientToolExecutors: {}
    };
  }, [o]), q = qe(), ne = ce(async () => {
    try {
      if (E(gt.CONNECTING), !e)
        throw new Error("userMpAuthToken is required");
      if (!t)
        throw new Error("chatServerUrl is required");
      if (!n)
        throw new Error("chatServerKey is required");
      const X = new ra();
      y.current = X, g(X);
      const G = s || {};
      await X.onInit({
        // Authentication and server properties
        userMpAuthToken: e,
        chatServerUrl: t,
        chatServerKey: n,
        entityId: r,
        entityType: i == null ? void 0 : i.toString(),
        // Tools configuration
        toolSchemas: T,
        clientTools: K,
        contextHelpers: G,
        onSetMessage: D.current,
        onSystemEvent: U.current,
        onReasoningUpdate: P.current,
        onThreadCreated: M.current
      }), E(gt.CONNECTED);
    } catch (X) {
      const G = pn(X, "WebSocketConnection");
      E(gt.DISCONNECTED), G.isRetryable ? (console.log(`[WebSocketConnection] Will retry in 2s: ${G.reason}`), setTimeout(() => {
        var _;
        (y.current === null || !y.current.getConnectionStatus().connected) && ((_ = q.current) == null || _.call(q));
      }, 2e3)) : console.warn(`[WebSocketConnection] Will not retry: ${G.reason}`);
    }
  }, [
    e,
    t,
    n,
    r,
    i,
    T,
    K,
    s
    // Removed onSetMessage, onSystemEvent, onReasoningUpdate to prevent reconnections
  ]), ae = ce(() => {
    y.current && (y.current.disconnect(), y.current = null), g(null), E(gt.DISCONNECTED);
  }, []);
  return q.current = ne, Le(() => (ne(), () => {
    ae();
  }), [ne, ae]), Le(() => {
    const X = setInterval(() => {
      if (y.current) {
        const G = y.current.getConnectionStatus();
        G.connected ? E(gt.CONNECTED) : G.isReconnecting ? E(gt.RECONNECTING) : E(gt.DISCONNECTED), I(G.reconnectAttempts);
      }
    }, 1e3);
    return () => clearInterval(X);
  }, []), {
    chatClient: m,
    connectionState: f,
    reconnectAttempts: w,
    connectChatClient: ne,
    disconnectChatClient: ae
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: go,
  setPrototypeOf: li,
  isFrozen: oa,
  getPrototypeOf: sa,
  getOwnPropertyDescriptor: aa
} = Object;
let {
  freeze: st,
  seal: Et,
  create: wr
} = Object, {
  apply: Er,
  construct: yr
} = typeof Reflect < "u" && Reflect;
st || (st = function(t) {
  return t;
});
Et || (Et = function(t) {
  return t;
});
Er || (Er = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++)
    i[o - 2] = arguments[o];
  return t.apply(n, i);
});
yr || (yr = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const Mn = at(Array.prototype.forEach), la = at(Array.prototype.lastIndexOf), ci = at(Array.prototype.pop), fn = at(Array.prototype.push), ca = at(Array.prototype.splice), Vn = at(String.prototype.toLowerCase), tr = at(String.prototype.toString), nr = at(String.prototype.match), gn = at(String.prototype.replace), ua = at(String.prototype.indexOf), da = at(String.prototype.trim), Dt = at(Object.prototype.hasOwnProperty), ot = at(RegExp.prototype.test), kn = pa(TypeError);
function at(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Er(e, t, r);
  };
}
function pa(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return yr(e, n);
  };
}
function ke(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Vn;
  li && li(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const o = n(i);
      o !== i && (oa(t) || (t[r] = o), i = o);
    }
    e[i] = !0;
  }
  return e;
}
function ha(e) {
  for (let t = 0; t < e.length; t++)
    Dt(e, t) || (e[t] = null);
  return e;
}
function Ft(e) {
  const t = wr(null);
  for (const [n, r] of go(e))
    Dt(e, n) && (Array.isArray(r) ? t[n] = ha(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = Ft(r) : t[n] = r);
  return t;
}
function bn(e, t) {
  for (; e !== null; ) {
    const r = aa(e, t);
    if (r) {
      if (r.get)
        return at(r.get);
      if (typeof r.value == "function")
        return at(r.value);
    }
    e = sa(e);
  }
  function n() {
    return null;
  }
  return n;
}
const ui = st(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), rr = st(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), ir = st(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), ma = st(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), or = st(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), fa = st(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), di = st(["#text"]), pi = st(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), sr = st(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), hi = st(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Un = st(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), ga = Et(/\{\{[\w\W]*|[\w\W]*\}\}/gm), ka = Et(/<%[\w\W]*|[\w\W]*%>/gm), ba = Et(/\$\{[\w\W]*/gm), xa = Et(/^data-[\-\w.\u00B7-\uFFFF]+$/), Na = Et(/^aria-[\-\w]+$/), ko = Et(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Ca = Et(/^(?:\w+script|data):/i), wa = Et(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), bo = Et(/^html$/i), Ea = Et(/^[a-z][.\w]*(-[.\w]+)+$/i);
var mi = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Na,
  ATTR_WHITESPACE: wa,
  CUSTOM_ELEMENT: Ea,
  DATA_ATTR: xa,
  DOCTYPE_NAME: bo,
  ERB_EXPR: ka,
  IS_ALLOWED_URI: ko,
  IS_SCRIPT_OR_DATA: Ca,
  MUSTACHE_EXPR: ga,
  TMPLIT_EXPR: ba
});
const xn = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, ya = function() {
  return typeof window > "u" ? null : window;
}, va = function(t, n) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let r = null;
  const i = "data-tt-policy-suffix";
  n && n.hasAttribute(i) && (r = n.getAttribute(i));
  const o = "dompurify" + (r ? "#" + r : "");
  try {
    return t.createPolicy(o, {
      createHTML(s) {
        return s;
      },
      createScriptURL(s) {
        return s;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + o + " could not be created."), null;
  }
}, fi = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function xo() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ya();
  const t = ($) => xo($);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== xn.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: o,
    HTMLTemplateElement: s,
    Node: a,
    Element: u,
    NodeFilter: h,
    NamedNodeMap: c = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: m,
    DOMParser: g,
    trustedTypes: f
  } = e, E = u.prototype, w = bn(E, "cloneNode"), I = bn(E, "remove"), y = bn(E, "nextSibling"), D = bn(E, "childNodes"), U = bn(E, "parentNode");
  if (typeof s == "function") {
    const $ = n.createElement("template");
    $.content && $.content.ownerDocument && (n = $.content.ownerDocument);
  }
  let P, M = "";
  const {
    implementation: T,
    createNodeIterator: K,
    createDocumentFragment: q,
    getElementsByTagName: ne
  } = n, {
    importNode: ae
  } = r;
  let X = fi();
  t.isSupported = typeof go == "function" && typeof U == "function" && T && T.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: G,
    ERB_EXPR: _,
    TMPLIT_EXPR: L,
    DATA_ATTR: B,
    ARIA_ATTR: ie,
    IS_SCRIPT_OR_DATA: F,
    ATTR_WHITESPACE: ve,
    CUSTOM_ELEMENT: Oe
  } = mi;
  let {
    IS_ALLOWED_URI: x
  } = mi, le = null;
  const ee = ke({}, [...ui, ...rr, ...ir, ...or, ...di]);
  let k = null;
  const de = ke({}, [...pi, ...sr, ...hi, ...Un]);
  let re = Object.seal(wr(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), ue = null, Ee = null;
  const Q = Object.seal(wr(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let Pe = !0, we = !0, Ae = !1, et = !0, tt = !1, yt = !0, He = !1, nt = !1, xt = !1, lt = !1, ct = !1, vt = !1, Pt = !0, St = !1;
  const zt = "user-content-";
  let Tt = !0, Ye = !1, v = {}, S = null;
  const H = ke({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let Z = null;
  const pe = ke({}, ["audio", "video", "img", "source", "image", "track"]);
  let Se = null;
  const rt = ke({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), We = "http://www.w3.org/1998/Math/MathML", it = "http://www.w3.org/2000/svg", Ie = "http://www.w3.org/1999/xhtml";
  let Te = Ie, Ke = !1, ze = null;
  const Yt = ke({}, [We, it, Ie], tr);
  let Wt = ke({}, ["mi", "mo", "mn", "ms", "mtext"]), ut = ke({}, ["annotation-xml"]);
  const Bt = ke({}, ["title", "style", "font", "a", "script"]);
  let Nt = null;
  const Kt = ["application/xhtml+xml", "text/html"], rn = "text/html";
  let je = null, _t = null;
  const Xt = n.createElement("form"), Jt = function(N) {
    return N instanceof RegExp || N instanceof Function;
  }, on = function() {
    let N = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(_t && _t === N)) {
      if ((!N || typeof N != "object") && (N = {}), N = Ft(N), Nt = // eslint-disable-next-line unicorn/prefer-includes
      Kt.indexOf(N.PARSER_MEDIA_TYPE) === -1 ? rn : N.PARSER_MEDIA_TYPE, je = Nt === "application/xhtml+xml" ? tr : Vn, le = Dt(N, "ALLOWED_TAGS") ? ke({}, N.ALLOWED_TAGS, je) : ee, k = Dt(N, "ALLOWED_ATTR") ? ke({}, N.ALLOWED_ATTR, je) : de, ze = Dt(N, "ALLOWED_NAMESPACES") ? ke({}, N.ALLOWED_NAMESPACES, tr) : Yt, Se = Dt(N, "ADD_URI_SAFE_ATTR") ? ke(Ft(rt), N.ADD_URI_SAFE_ATTR, je) : rt, Z = Dt(N, "ADD_DATA_URI_TAGS") ? ke(Ft(pe), N.ADD_DATA_URI_TAGS, je) : pe, S = Dt(N, "FORBID_CONTENTS") ? ke({}, N.FORBID_CONTENTS, je) : H, ue = Dt(N, "FORBID_TAGS") ? ke({}, N.FORBID_TAGS, je) : Ft({}), Ee = Dt(N, "FORBID_ATTR") ? ke({}, N.FORBID_ATTR, je) : Ft({}), v = Dt(N, "USE_PROFILES") ? N.USE_PROFILES : !1, Pe = N.ALLOW_ARIA_ATTR !== !1, we = N.ALLOW_DATA_ATTR !== !1, Ae = N.ALLOW_UNKNOWN_PROTOCOLS || !1, et = N.ALLOW_SELF_CLOSE_IN_ATTR !== !1, tt = N.SAFE_FOR_TEMPLATES || !1, yt = N.SAFE_FOR_XML !== !1, He = N.WHOLE_DOCUMENT || !1, lt = N.RETURN_DOM || !1, ct = N.RETURN_DOM_FRAGMENT || !1, vt = N.RETURN_TRUSTED_TYPE || !1, xt = N.FORCE_BODY || !1, Pt = N.SANITIZE_DOM !== !1, St = N.SANITIZE_NAMED_PROPS || !1, Tt = N.KEEP_CONTENT !== !1, Ye = N.IN_PLACE || !1, x = N.ALLOWED_URI_REGEXP || ko, Te = N.NAMESPACE || Ie, Wt = N.MATHML_TEXT_INTEGRATION_POINTS || Wt, ut = N.HTML_INTEGRATION_POINTS || ut, re = N.CUSTOM_ELEMENT_HANDLING || {}, N.CUSTOM_ELEMENT_HANDLING && Jt(N.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (re.tagNameCheck = N.CUSTOM_ELEMENT_HANDLING.tagNameCheck), N.CUSTOM_ELEMENT_HANDLING && Jt(N.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (re.attributeNameCheck = N.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), N.CUSTOM_ELEMENT_HANDLING && typeof N.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (re.allowCustomizedBuiltInElements = N.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), tt && (we = !1), ct && (lt = !0), v && (le = ke({}, di), k = [], v.html === !0 && (ke(le, ui), ke(k, pi)), v.svg === !0 && (ke(le, rr), ke(k, sr), ke(k, Un)), v.svgFilters === !0 && (ke(le, ir), ke(k, sr), ke(k, Un)), v.mathMl === !0 && (ke(le, or), ke(k, hi), ke(k, Un))), N.ADD_TAGS && (typeof N.ADD_TAGS == "function" ? Q.tagCheck = N.ADD_TAGS : (le === ee && (le = Ft(le)), ke(le, N.ADD_TAGS, je))), N.ADD_ATTR && (typeof N.ADD_ATTR == "function" ? Q.attributeCheck = N.ADD_ATTR : (k === de && (k = Ft(k)), ke(k, N.ADD_ATTR, je))), N.ADD_URI_SAFE_ATTR && ke(Se, N.ADD_URI_SAFE_ATTR, je), N.FORBID_CONTENTS && (S === H && (S = Ft(S)), ke(S, N.FORBID_CONTENTS, je)), Tt && (le["#text"] = !0), He && ke(le, ["html", "head", "body"]), le.table && (ke(le, ["tbody"]), delete ue.tbody), N.TRUSTED_TYPES_POLICY) {
        if (typeof N.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw kn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof N.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw kn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        P = N.TRUSTED_TYPES_POLICY, M = P.createHTML("");
      } else
        P === void 0 && (P = va(f, i)), P !== null && typeof M == "string" && (M = P.createHTML(""));
      st && st(N), _t = N;
    }
  }, Qt = ke({}, [...rr, ...ir, ...ma]), Gt = ke({}, [...or, ...fa]), j = function(N) {
    let R = U(N);
    (!R || !R.tagName) && (R = {
      namespaceURI: Te,
      tagName: "template"
    });
    const V = Vn(N.tagName), ye = Vn(R.tagName);
    return ze[N.namespaceURI] ? N.namespaceURI === it ? R.namespaceURI === Ie ? V === "svg" : R.namespaceURI === We ? V === "svg" && (ye === "annotation-xml" || Wt[ye]) : !!Qt[V] : N.namespaceURI === We ? R.namespaceURI === Ie ? V === "math" : R.namespaceURI === it ? V === "math" && ut[ye] : !!Gt[V] : N.namespaceURI === Ie ? R.namespaceURI === it && !ut[ye] || R.namespaceURI === We && !Wt[ye] ? !1 : !Gt[V] && (Bt[V] || !Qt[V]) : !!(Nt === "application/xhtml+xml" && ze[N.namespaceURI]) : !1;
  }, be = function(N) {
    fn(t.removed, {
      element: N
    });
    try {
      U(N).removeChild(N);
    } catch {
      I(N);
    }
  }, b = function(N, R) {
    try {
      fn(t.removed, {
        attribute: R.getAttributeNode(N),
        from: R
      });
    } catch {
      fn(t.removed, {
        attribute: null,
        from: R
      });
    }
    if (R.removeAttribute(N), N === "is")
      if (lt || ct)
        try {
          be(R);
        } catch {
        }
      else
        try {
          R.setAttribute(N, "");
        } catch {
        }
  }, O = function(N) {
    let R = null, V = null;
    if (xt)
      N = "<remove></remove>" + N;
    else {
      const Ue = nr(N, /^[\r\n\t ]+/);
      V = Ue && Ue[0];
    }
    Nt === "application/xhtml+xml" && Te === Ie && (N = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + N + "</body></html>");
    const ye = P ? P.createHTML(N) : N;
    if (Te === Ie)
      try {
        R = new g().parseFromString(ye, Nt);
      } catch {
      }
    if (!R || !R.documentElement) {
      R = T.createDocument(Te, "template", null);
      try {
        R.documentElement.innerHTML = Ke ? M : ye;
      } catch {
      }
    }
    const Ge = R.body || R.documentElement;
    return N && V && Ge.insertBefore(n.createTextNode(V), Ge.childNodes[0] || null), Te === Ie ? ne.call(R, He ? "html" : "body")[0] : He ? R.documentElement : Ge;
  }, W = function(N) {
    return K.call(
      N.ownerDocument || N,
      N,
      // eslint-disable-next-line no-bitwise
      h.SHOW_ELEMENT | h.SHOW_COMMENT | h.SHOW_TEXT | h.SHOW_PROCESSING_INSTRUCTION | h.SHOW_CDATA_SECTION,
      null
    );
  }, te = function(N) {
    return N instanceof m && (typeof N.nodeName != "string" || typeof N.textContent != "string" || typeof N.removeChild != "function" || !(N.attributes instanceof c) || typeof N.removeAttribute != "function" || typeof N.setAttribute != "function" || typeof N.namespaceURI != "string" || typeof N.insertBefore != "function" || typeof N.hasChildNodes != "function");
  }, xe = function(N) {
    return typeof a == "function" && N instanceof a;
  };
  function fe($, N, R) {
    Mn($, (V) => {
      V.call(t, N, R, _t);
    });
  }
  const ge = function(N) {
    let R = null;
    if (fe(X.beforeSanitizeElements, N, null), te(N))
      return be(N), !0;
    const V = je(N.nodeName);
    if (fe(X.uponSanitizeElement, N, {
      tagName: V,
      allowedTags: le
    }), yt && N.hasChildNodes() && !xe(N.firstElementChild) && ot(/<[/\w!]/g, N.innerHTML) && ot(/<[/\w!]/g, N.textContent) || N.nodeType === xn.progressingInstruction || yt && N.nodeType === xn.comment && ot(/<[/\w]/g, N.data))
      return be(N), !0;
    if (!(Q.tagCheck instanceof Function && Q.tagCheck(V)) && (!le[V] || ue[V])) {
      if (!ue[V] && Be(V) && (re.tagNameCheck instanceof RegExp && ot(re.tagNameCheck, V) || re.tagNameCheck instanceof Function && re.tagNameCheck(V)))
        return !1;
      if (Tt && !S[V]) {
        const ye = U(N) || N.parentNode, Ge = D(N) || N.childNodes;
        if (Ge && ye) {
          const Ue = Ge.length;
          for (let dt = Ue - 1; dt >= 0; --dt) {
            const Vt = w(Ge[dt], !0);
            Vt.__removalCount = (N.__removalCount || 0) + 1, ye.insertBefore(Vt, y(N));
          }
        }
      }
      return be(N), !0;
    }
    return N instanceof u && !j(N) || (V === "noscript" || V === "noembed" || V === "noframes") && ot(/<\/no(script|embed|frames)/i, N.innerHTML) ? (be(N), !0) : (tt && N.nodeType === xn.text && (R = N.textContent, Mn([G, _, L], (ye) => {
      R = gn(R, ye, " ");
    }), N.textContent !== R && (fn(t.removed, {
      element: N.cloneNode()
    }), N.textContent = R)), fe(X.afterSanitizeElements, N, null), !1);
  }, me = function(N, R, V) {
    if (Pt && (R === "id" || R === "name") && (V in n || V in Xt))
      return !1;
    if (!(we && !Ee[R] && ot(B, R))) {
      if (!(Pe && ot(ie, R))) {
        if (!(Q.attributeCheck instanceof Function && Q.attributeCheck(R, N))) {
          if (!k[R] || Ee[R]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Be(N) && (re.tagNameCheck instanceof RegExp && ot(re.tagNameCheck, N) || re.tagNameCheck instanceof Function && re.tagNameCheck(N)) && (re.attributeNameCheck instanceof RegExp && ot(re.attributeNameCheck, R) || re.attributeNameCheck instanceof Function && re.attributeNameCheck(R, N)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              R === "is" && re.allowCustomizedBuiltInElements && (re.tagNameCheck instanceof RegExp && ot(re.tagNameCheck, V) || re.tagNameCheck instanceof Function && re.tagNameCheck(V)))
            ) return !1;
          } else if (!Se[R]) {
            if (!ot(x, gn(V, ve, ""))) {
              if (!((R === "src" || R === "xlink:href" || R === "href") && N !== "script" && ua(V, "data:") === 0 && Z[N])) {
                if (!(Ae && !ot(F, gn(V, ve, "")))) {
                  if (V)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Be = function(N) {
    return N !== "annotation-xml" && nr(N, Oe);
  }, Re = function(N) {
    fe(X.beforeSanitizeAttributes, N, null);
    const {
      attributes: R
    } = N;
    if (!R || te(N))
      return;
    const V = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: k,
      forceKeepAttr: void 0
    };
    let ye = R.length;
    for (; ye--; ) {
      const Ge = R[ye], {
        name: Ue,
        namespaceURI: dt,
        value: Vt
      } = Ge, sn = je(Ue), Qn = Vt;
      let Ze = Ue === "value" ? Qn : da(Qn);
      if (V.attrName = sn, V.attrValue = Ze, V.keepAttr = !0, V.forceKeepAttr = void 0, fe(X.uponSanitizeAttribute, N, V), Ze = V.attrValue, St && (sn === "id" || sn === "name") && (b(Ue, N), Ze = zt + Ze), yt && ot(/((--!?|])>)|<\/(style|title|textarea)/i, Ze)) {
        b(Ue, N);
        continue;
      }
      if (sn === "attributename" && nr(Ze, "href")) {
        b(Ue, N);
        continue;
      }
      if (V.forceKeepAttr)
        continue;
      if (!V.keepAttr) {
        b(Ue, N);
        continue;
      }
      if (!et && ot(/\/>/i, Ze)) {
        b(Ue, N);
        continue;
      }
      tt && Mn([G, _, L], (ni) => {
        Ze = gn(Ze, ni, " ");
      });
      const ti = je(N.nodeName);
      if (!me(ti, sn, Ze)) {
        b(Ue, N);
        continue;
      }
      if (P && typeof f == "object" && typeof f.getAttributeType == "function" && !dt)
        switch (f.getAttributeType(ti, sn)) {
          case "TrustedHTML": {
            Ze = P.createHTML(Ze);
            break;
          }
          case "TrustedScriptURL": {
            Ze = P.createScriptURL(Ze);
            break;
          }
        }
      if (Ze !== Qn)
        try {
          dt ? N.setAttributeNS(dt, Ue, Ze) : N.setAttribute(Ue, Ze), te(N) ? be(N) : ci(t.removed);
        } catch {
          b(Ue, N);
        }
    }
    fe(X.afterSanitizeAttributes, N, null);
  }, Me = function $(N) {
    let R = null;
    const V = W(N);
    for (fe(X.beforeSanitizeShadowDOM, N, null); R = V.nextNode(); )
      fe(X.uponSanitizeShadowNode, R, null), ge(R), Re(R), R.content instanceof o && $(R.content);
    fe(X.afterSanitizeShadowDOM, N, null);
  };
  return t.sanitize = function($) {
    let N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, R = null, V = null, ye = null, Ge = null;
    if (Ke = !$, Ke && ($ = "<!-->"), typeof $ != "string" && !xe($))
      if (typeof $.toString == "function") {
        if ($ = $.toString(), typeof $ != "string")
          throw kn("dirty is not a string, aborting");
      } else
        throw kn("toString is not a function");
    if (!t.isSupported)
      return $;
    if (nt || on(N), t.removed = [], typeof $ == "string" && (Ye = !1), Ye) {
      if ($.nodeName) {
        const Vt = je($.nodeName);
        if (!le[Vt] || ue[Vt])
          throw kn("root node is forbidden and cannot be sanitized in-place");
      }
    } else if ($ instanceof a)
      R = O("<!---->"), V = R.ownerDocument.importNode($, !0), V.nodeType === xn.element && V.nodeName === "BODY" || V.nodeName === "HTML" ? R = V : R.appendChild(V);
    else {
      if (!lt && !tt && !He && // eslint-disable-next-line unicorn/prefer-includes
      $.indexOf("<") === -1)
        return P && vt ? P.createHTML($) : $;
      if (R = O($), !R)
        return lt ? null : vt ? M : "";
    }
    R && xt && be(R.firstChild);
    const Ue = W(Ye ? $ : R);
    for (; ye = Ue.nextNode(); )
      ge(ye), Re(ye), ye.content instanceof o && Me(ye.content);
    if (Ye)
      return $;
    if (lt) {
      if (ct)
        for (Ge = q.call(R.ownerDocument); R.firstChild; )
          Ge.appendChild(R.firstChild);
      else
        Ge = R;
      return (k.shadowroot || k.shadowrootmode) && (Ge = ae.call(r, Ge, !0)), Ge;
    }
    let dt = He ? R.outerHTML : R.innerHTML;
    return He && le["!doctype"] && R.ownerDocument && R.ownerDocument.doctype && R.ownerDocument.doctype.name && ot(bo, R.ownerDocument.doctype.name) && (dt = "<!DOCTYPE " + R.ownerDocument.doctype.name + `>
` + dt), tt && Mn([G, _, L], (Vt) => {
      dt = gn(dt, Vt, " ");
    }), P && vt ? P.createHTML(dt) : dt;
  }, t.setConfig = function() {
    let $ = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    on($), nt = !0;
  }, t.clearConfig = function() {
    _t = null, nt = !1;
  }, t.isValidAttribute = function($, N, R) {
    _t || on({});
    const V = je($), ye = je(N);
    return me(V, ye, R);
  }, t.addHook = function($, N) {
    typeof N == "function" && fn(X[$], N);
  }, t.removeHook = function($, N) {
    if (N !== void 0) {
      const R = la(X[$], N);
      return R === -1 ? void 0 : ca(X[$], R, 1)[0];
    }
    return ci(X[$]);
  }, t.removeHooks = function($) {
    X[$] = [];
  }, t.removeAllHooks = function() {
    X = fi();
  }, t;
}
var Sa = xo();
function Ta(e) {
  return [
    /javascript:/i,
    /data:.*base64/i,
    /vbscript:/i,
    /on\w+\s*=/i,
    // event handlers like onclick=
    /<script/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<link/i,
    /<style/i
  ].some((n) => n.test(e));
}
function Gn(e, t = !1) {
  return e;
}
function _a(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function gi(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || Ta(e));
  } catch {
    return !1;
  }
}
function Da() {
  Sa.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !gi(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !gi(n) && e.removeAttribute("src");
    }
  });
}
Da();
function Oa() {
  const [e, t] = Ne([]), n = ce(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = ce(
    (s, a) => {
      const h = Gn(a, s === "assistant");
      t((c) => [
        ...c,
        {
          id: n(),
          role: s,
          content: h,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [n]
  ), i = ce((s, a) => {
    t(
      (u) => u.map((h) => h.id === s ? { ...h, ...a } : h)
    );
  }, []), o = ce(
    (s, a, u) => {
      t(
        (h) => h.map(
          (c) => c.id === s ? {
            ...c,
            content: a,
            isStreaming: u
          } : c
        )
      );
    },
    []
  );
  return {
    messages: e,
    setMessages: t,
    addMessage: r,
    updateMessage: i,
    updateMessageContent: o,
    generateId: n
  };
}
function Ia() {
  const e = oe((D) => D.isStreaming), t = oe((D) => D.setIsStreaming), n = oe((D) => D.isThinking), r = oe((D) => D.setIsThinking), i = oe((D) => D.streamingContent), o = oe((D) => D.setStreamingContent), s = oe((D) => D.isHandlingTool), a = oe((D) => D.setIsHandlingTool), u = oe((D) => D.startStreaming), h = oe((D) => D.stopStreaming), c = oe((D) => D.clearStreamingBuffers), m = oe((D) => D.resetToolHandling), g = qe(""), f = Fe(() => ({
    get current() {
      return oe.getState().currentAssistantMessageId;
    },
    set current(D) {
      oe.getState().setCurrentAssistantMessageId(D);
    }
  }), []), E = ce((D) => {
    D ? u(D) : (t(!0), r(!0), o("")), g.current = "";
  }, [u, t, r, o]), w = ce(() => {
    h(), g.current = "";
  }, [h]), I = ce(() => {
    m();
  }, [m]), y = ce(() => {
    c(), g.current = "";
  }, [c]);
  return {
    // State
    isStreaming: e,
    setIsStreaming: t,
    isThinking: n,
    setIsThinking: r,
    streamingContent: i,
    setStreamingContent: o,
    isHandlingTool: s,
    setIsHandlingTool: a,
    // Refs (backward compatible interface)
    currentAssistantMessageIdRef: f,
    streamingContentRef: g,
    // Actions
    startStreaming: E,
    stopStreaming: w,
    resetToolHandling: I,
    clearStreamingBuffers: y
  };
}
function ja() {
  const e = Fe(
    () => (i, o) => o === !1 ? $e.isErrorMessage(i) ? Je.ERROR : Je.COMPLETED : $e.isCompletedMessage(i) ? Je.COMPLETED : $e.isErrorMessage(i) ? Je.ERROR : Je.PROCESSING,
    []
  ), t = Fe(
    () => (i) => $e.extractDuration(i),
    []
  ), n = Fe(
    () => (i) => $e.cleanReasoningContent(i),
    []
  ), r = Fe(
    () => (i, o) => {
      switch ($e.getMessageType(
        i,
        o
      )) {
        case se.MESSAGE_TYPES.ERROR:
          return "Error";
        case se.MESSAGE_TYPES.COMPLETED:
          return "Completed";
        case se.MESSAGE_TYPES.THOUGHT:
          return se.UI_TEXT.THOUGHT;
        case se.MESSAGE_TYPES.THINKING:
        default:
          return se.UI_TEXT.THINKING_ELLIPSIS;
      }
    },
    []
  );
  return {
    getReasoningStatus: e,
    getReasoningDuration: t,
    getReasoningContentOnly: n,
    getReasoningTitle: r
  };
}
function Ra() {
  const e = Fe(
    () => (n, r) => r === !1 ? n.includes(se.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : n.includes(se.COMPLETED_MARKER) || n.includes("✅") ? "Tool Completed" : n.includes(se.ERROR_MARKER) ? "Tool Error" : (n.includes(se.HANDLING_MARKER), "Tool Processing..."),
    []
  ), t = Fe(
    () => (n, r) => r === !1 ? n.includes(se.ERROR_MARKER) ? Je.ERROR : Je.COMPLETED : n.includes(se.COMPLETED_MARKER) || n.includes("✅") ? Je.COMPLETED : n.includes(se.ERROR_MARKER) ? Je.ERROR : Je.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: t
  };
}
function Ma({
  setMessages: e,
  addMessage: t,
  updateMessageContent: n,
  generateId: r,
  setIsThinking: i,
  setIsStreaming: o,
  setStreamingContent: s,
  setIsHandlingTool: a,
  currentAssistantMessageIdRef: u,
  streamingContentRef: h,
  clearStreamingBuffers: c,
  resetToolHandling: m
}) {
  const g = qe(/* @__PURE__ */ new Map()), f = qe(/* @__PURE__ */ new Map()), E = ce(() => {
    if (u.current && h.current) {
      const P = Gn(
        h.current,
        !0
      );
      return n(
        u.current,
        P,
        !1
      ), c(), !0;
    }
    return !1;
  }, [
    u,
    h,
    n,
    c
  ]), w = ce(
    (P) => {
      const M = Gn(P, !0);
      if (u.current)
        h.current += M, s(h.current), n(
          u.current,
          h.current,
          !0
        );
      else {
        i(!1);
        const T = r();
        u.current = T, h.current = M, s(M);
        const K = {
          id: T,
          role: "assistant",
          content: M,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        e((q) => [...q, K]);
      }
    },
    [
      u,
      h,
      s,
      n,
      i,
      r,
      e
    ]
  ), I = ce(
    (P, M, T) => {
      const { callId: K } = T || {};
      if (a(P), !K) return;
      const q = $e.isThinkingMessage(M) && !M.includes("for") && !M.includes("seconds"), ne = $e.isThinkingMessage(M) && M.includes("for") && M.includes("seconds"), ae = $e.isHandlingMessage(M), X = $e.isCompletedMessage(M), G = $e.isErrorMessage(M);
      if (q || ne) {
        const L = g.current.get(K);
        if (q && !L) {
          E();
          const B = r();
          g.current.set(K, B);
          const ie = {
            id: B,
            role: "reasoning",
            content: M,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          e((F) => [...F, ie]);
        } else ne && L ? (n(L, M, !1), g.current.delete(K)) : L && q && n(L, M, !0);
      }
      const _ = f.current.get(K);
      if (ae && !_) {
        E();
        const L = M.match(
          se.PATTERNS.HANDLING_TOOL
        ), B = L ? L[1] : "Unknown Tool", ie = r();
        f.current.set(K, ie);
        const F = {
          id: ie,
          role: "tooling",
          content: M,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...T,
            toolName: B,
            callId: K,
            status: Je.PROCESSING
          }
        };
        e((ve) => [...ve, F]);
      } else if ((X || G) && _) {
        const L = M.match(
          se.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), B = L ? L[1] : "Unknown Tool";
        e(
          (ie) => ie.map(
            (F) => F.id === _ ? {
              ...F,
              content: M,
              isStreaming: !1,
              toolData: {
                ...F.toolData,
                toolName: B,
                status: G ? Je.ERROR : Je.COMPLETED,
                callId: K ?? ""
              }
            } : F
          )
        ), f.current.delete(K);
      } else _ && P && !X && !G && n(_, M, !0);
    },
    [
      a,
      E,
      r,
      e,
      n
    ]
  ), y = ce(() => {
    o(!1), i(!1), E();
  }, [o, i, E]), D = ce(
    (P) => {
      console.error("Chat error:", P), o(!1), i(!1), E(), t("system", `❌ Chat error: ${P}`);
    },
    [
      o,
      i,
      E,
      t
    ]
  ), U = ce(() => {
    o(!1), i(!1), c(), m();
  }, [
    o,
    i,
    c,
    m
  ]);
  return {
    handleSetMessage: w,
    handleReasoningUpdate: I,
    handleChatFinished: y,
    handleChatError: D,
    stopGeneration: U,
    finalizeCurrentStreamingMessage: E
  };
}
function Ua() {
  const e = Oa(), t = Ia(), n = ja(), r = Ra(), i = Ma({
    // From useMessages
    setMessages: e.setMessages,
    addMessage: e.addMessage,
    updateMessageContent: e.updateMessageContent,
    generateId: e.generateId,
    // From useStreamingState
    setIsThinking: t.setIsThinking,
    setIsStreaming: t.setIsStreaming,
    setStreamingContent: t.setStreamingContent,
    setIsHandlingTool: t.setIsHandlingTool,
    currentAssistantMessageIdRef: t.currentAssistantMessageIdRef,
    streamingContentRef: t.streamingContentRef,
    clearStreamingBuffers: t.clearStreamingBuffers,
    resetToolHandling: t.resetToolHandling
  });
  return {
    // State from useMessages
    messages: e.messages,
    setMessages: e.setMessages,
    // State from useStreamingState
    isStreaming: t.isStreaming,
    setIsStreaming: t.setIsStreaming,
    isThinking: t.isThinking,
    setIsThinking: t.setIsThinking,
    streamingContent: t.streamingContent,
    isHandlingTool: t.isHandlingTool,
    currentAssistantMessageIdRef: t.currentAssistantMessageIdRef,
    // Helper functions from useReasoningHelpers
    getReasoningStatus: n.getReasoningStatus,
    getReasoningDuration: n.getReasoningDuration,
    getReasoningContentOnly: n.getReasoningContentOnly,
    getReasoningTitle: n.getReasoningTitle,
    // Helper functions from useToolingHelpers
    getToolingTitle: r.getToolingTitle,
    getToolingStatus: r.getToolingStatus,
    // Actions from useMessages
    addMessage: e.addMessage,
    // Actions from useMessageHandlers
    handleSetMessage: i.handleSetMessage,
    handleReasoningUpdate: i.handleReasoningUpdate,
    handleChatFinished: i.handleChatFinished,
    handleChatError: i.handleChatError,
    stopGeneration: i.stopGeneration,
    finalizeCurrentStreamingMessage: i.finalizeCurrentStreamingMessage
  };
}
function wh({ initialMode: e = "sidebar" }) {
  const t = oe();
  return Le(() => {
    e && t.currentMode !== e && t.setCurrentMode(e);
  }, [e]), Le(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const n = (r) => {
      r.key === "Escape" && t.currentMode === "modal" && t.isModalOpen && t.closeModal();
    };
    if (t.currentMode === "modal" && t.isModalOpen)
      return document.addEventListener("keydown", n), () => document.removeEventListener("keydown", n);
  }, [t.currentMode, t.isModalOpen, t.closeModal]), {
    // Modal and layout state
    isModalOpen: t.isModalOpen,
    setIsModalOpen: t.setIsModalOpen,
    isCollapsed: t.isCollapsed,
    setIsCollapsed: t.setIsCollapsed,
    currentMode: t.currentMode,
    setCurrentMode: t.setCurrentMode,
    // Chat state
    chatStatus: t.chatStatus,
    setChatStatus: t.setChatStatus,
    streamingStatus: t.streamingStatus,
    setStreamingStatus: t.setStreamingStatus,
    // Conversation state
    isLoadingConversation: t.isLoadingConversation,
    setIsLoadingConversation: t.setIsLoadingConversation,
    conversationError: t.conversationError,
    setConversationError: t.setConversationError,
    // Thread state
    currentThreadId: t.currentThreadId,
    setCurrentThreadId: t.setCurrentThreadId,
    providerResId: t.providerResId,
    setProviderResId: t.setProviderResId,
    // Dev mode state
    isDevSettingsOpen: t.isDevSettingsOpen,
    setIsDevSettingsOpen: t.setIsDevSettingsOpen,
    // Actions
    openModal: t.openModal,
    closeModal: t.closeModal,
    toggleCollapse: t.toggleCollapse,
    toggleFullscreen: t.toggleFullscreen
  };
}
function Aa({
  entityId: e,
  entityType: t,
  httpApiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  messages: o,
  setMessages: s,
  setIsLoadingConversation: a,
  setConversationError: u,
  setCurrentThreadId: h,
  setProviderResId: c,
  metadata: m
}) {
  const g = qe(!1), f = async () => {
    if (!e) {
      console.log("useConversationLoader: No entityId provided, skipping history fetch");
      return;
    }
    if (!m || typeof m == "object" && Object.keys(m).length === 0) {
      console.log("useConversationLoader: No metadata provided (empty/undefined), skipping history fetch - starting fresh conversation");
      return;
    }
    if (!n) {
      console.error("httpApiUrl is required for conversation loading");
      return;
    }
    if (!r) {
      console.error("userMpAuthToken is required for conversation loading");
      return;
    }
    if (!i) {
      console.error("chatServerKey is required for conversation loading");
      return;
    }
    if (!g.current && !(o.length > 0))
      try {
        a(!0), u(null), console.log("useConversationLoader: Fetching messages for entityId:", e, "entityType:", t);
        const w = await Os(
          n,
          {
            entityId: e,
            entityType: t,
            metadata: m
          },
          {
            userMpAuthToken: r,
            chatServerKey: i
          }
        );
        console.log(`useConversationLoader: Loaded ${w.messages.length} messages`), s(w.messages), w.threadId && (console.log("useConversationLoader: Setting threadId from response:", w.threadId), h(w.threadId)), w.providerResId && (console.log("useConversationLoader: Setting providerResId:", w.providerResId), c(w.providerResId)), g.current = !0;
      } catch (w) {
        const I = pn(w, "ConversationLoader");
        u(
          w instanceof Error ? w.message : "Failed to load conversation"
        ), g.current = !0, I.isRetryable || console.warn(`[ConversationLoader] Will not retry conversation loading: ${I.reason}`);
      } finally {
        a(!1);
      }
  };
  return Le(() => {
    f();
  }, [
    e,
    t,
    n,
    r,
    i,
    o.length,
    s,
    a,
    u,
    h,
    c,
    m
  ]), {
    hasLoadedConversationRef: g,
    resetConversationLoader: () => {
      console.log("useConversationLoader: Resetting loader state"), g.current = !1;
    },
    reloadConversation: f
  };
}
function La({
  metadata: e,
  chatClient: t,
  currentProviderResId: n,
  isLoadingConversation: r,
  messages: i = [],
  entityId: o,
  entityType: s
}) {
  const a = qe(void 0), u = qe(!1);
  return Le(() => {
    if (r || !t)
      return;
    const h = !n && i.length === 0, c = !!n;
    if (h && (!o || !s) || c && !n)
      return;
    if (!u.current) {
      u.current = !0, a.current = e;
      return;
    }
    if (!(a.current !== e))
      return;
    if (!(e && Object.keys(e).length > 0)) {
      a.current = e;
      return;
    }
    h ? a.current = e : c && t.updateMetadata(n, { metadata: e }).then(() => {
      a.current = e;
    }).catch((f) => {
      console.error(
        "[useMetadataSync] ❌ Failed to update existing thread metadata:",
        f
      );
    });
  }, [
    e,
    n,
    t,
    r,
    i.length,
    o,
    s
  ]), {
    // Debug info
    lastMetadata: a.current,
    hasInitialized: u.current,
    isDraftState: !n && i.length === 0,
    isExistingThread: !!n
  };
}
function Pa() {
  const [e, t] = Ne(navigator.onLine), [n, r] = Ne(!1);
  return Le(() => {
    const i = () => {
      t(!0), n && r(!1);
    }, o = () => {
      t(!1), r(!0);
    };
    return window.addEventListener("online", i), window.addEventListener("offline", o), () => {
      window.removeEventListener("online", i), window.removeEventListener("offline", o);
    };
  }, [n]), { isOnline: e, wasOffline: n };
}
class Wa {
  // 10MB
  constructor(t) {
    J(this, "config");
    J(this, "defaultFolder", "chat-uploads");
    J(this, "defaultMaxFileSize", 10 * 1024 * 1024);
    this.config = {
      folder: this.defaultFolder,
      maxFileSize: this.defaultMaxFileSize,
      ...t
    };
  }
  /**
   * Upload multiple files with authentication and error handling
   */
  async uploadFiles(t, n) {
    const r = [], i = t.map((o) => ({
      file: o,
      progress: 0,
      status: "uploading"
    }));
    for (let o = 0; o < t.length; o++) {
      const s = t[o];
      try {
        this.validateFile(s), n && (i[o].progress = 0, n([...i]));
        const a = await this.uploadSingleFile(s, (u) => {
          n && (i[o].progress = u, n([...i]));
        });
        r.push(a), i[o].status = "completed", i[o].progress = 100;
      } catch (a) {
        console.error(`❌ Upload failed for ${s.name}:`, a), i[o].status = "error";
        const u = await this.handleUploadFallback(s);
        u && r.push(u);
      }
      n && n([...i]);
    }
    return r;
  }
  /**
   * Upload a single file with authentication
   */
  async uploadSingleFile(t, n) {
    const r = new FormData();
    r.append("file", t), r.append("folder", this.config.folder || this.defaultFolder);
    const i = this.buildAuthHeaders();
    return new Promise((o, s) => {
      const a = new XMLHttpRequest();
      a.upload.addEventListener("progress", (u) => {
        if (u.lengthComputable && n) {
          const h = u.loaded / u.total * 100;
          n(h);
        }
      }), a.addEventListener("load", async () => {
        if (a.status >= 200 && a.status < 300)
          try {
            const u = JSON.parse(a.responseText), h = this.processUploadResult(t, u);
            o(h);
          } catch {
            s(new Error("Invalid response format"));
          }
        else
          s(new Error(`Upload failed with status ${a.status}`));
      }), a.addEventListener("error", () => {
        s(new Error("Network error during upload"));
      }), a.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([u, h]) => {
        a.setRequestHeader(u, h);
      }), a.send(r);
    });
  }
  /**
   * Process the upload result and return appropriate media URL with metadata
   */
  processUploadResult(t, n) {
    if (t.type.startsWith("image/")) {
      const r = n.thumbnailUrl || n.url, i = n.cdnUrl || n.url;
      return `data:${t.type};thumbnailUrl=${encodeURIComponent(
        r
      )};cdnUrl=${encodeURIComponent(
        i
      )};filename=${encodeURIComponent(
        n.filename || t.name
      )}`;
    } else
      return `data:${t.type};name=${encodeURIComponent(
        n.fileName || t.name
      )};url=${encodeURIComponent(n.url)}`;
  }
  /**
   * Handle upload failure with fallback strategies
   */
  async handleUploadFallback(t) {
    if (t.type.startsWith("image/"))
      try {
        return await this.convertToBase64(t);
      } catch (n) {
        return console.error("Base64 conversion failed:", n), null;
      }
    else
      return `data:${t.type};name=${encodeURIComponent(
        t.name
      )};base64,placeholder`;
  }
  /**
   * Convert file to base64 data URL
   */
  convertToBase64(t) {
    return new Promise((n, r) => {
      const i = new FileReader();
      i.onload = () => n(i.result), i.onerror = r, i.readAsDataURL(t);
    });
  }
  /**
   * Validate file before upload
   */
  validateFile(t) {
    if (t.size > (this.config.maxFileSize || this.defaultMaxFileSize))
      throw new Error(
        `File ${t.name} is too large. Maximum size is ${this.formatFileSize(
          this.config.maxFileSize || this.defaultMaxFileSize
        )}`
      );
    if (this.config.allowedTypes && this.config.allowedTypes.length > 0 && !this.config.allowedTypes.some(
      (r) => t.type.startsWith(r) || t.name.toLowerCase().endsWith(r)
    ))
      throw new Error(`File type ${t.type} is not allowed`);
  }
  /**
   * Build authentication headers
   */
  buildAuthHeaders() {
    const t = {};
    return this.config.userMpAuthToken && (t["x-oddle-mp-auth-token"] = this.config.userMpAuthToken), this.config.chatServerKey && (t["x-oddle-chat-server-key"] = this.config.chatServerKey), t;
  }
  /**
   * Format file size for display
   */
  formatFileSize(t) {
    if (t === 0) return "0 Bytes";
    const n = 1024, r = ["Bytes", "KB", "MB", "GB"], i = Math.floor(Math.log(t) / Math.log(n));
    return parseFloat((t / Math.pow(n, i)).toFixed(2)) + " " + r[i];
  }
  /**
   * Update configuration
   */
  updateConfig(t) {
    this.config = { ...this.config, ...t };
  }
  /**
   * Get current configuration
   */
  getConfig() {
    return { ...this.config };
  }
}
class Va {
  constructor(t, n = {}) {
    J(this, "config");
    J(this, "chatClient");
    this.chatClient = t, this.config = n;
  }
  /**
   * Validates if a message can be submitted
   */
  canSubmit(t, n, r) {
    return !!(t.trim() && !n && this.chatClient && r);
  }
  /**
   * Creates a user message object
   */
  createUserMessage(t, n) {
    return {
      id: this.generateId(),
      role: "user",
      content: t.trim(),
      timestamp: /* @__PURE__ */ new Date(),
      media: n
    };
  }
  /**
   * Submits a message to the WebSocket agent client
   * 
   * @param params - Message submission parameters
   * @returns The created user message
   * @throws Error if submission fails
   */
  async submitMessage(t) {
    const { message: n, media: r, providerResId: i } = t, o = this.createUserMessage(n, r);
    try {
      return await this.chatClient.onTriggerMessage({
        message: o.content,
        media: r,
        providerResId: i
      }), o;
    } catch (s) {
      throw this.handleError(s), s;
    }
  }
  /**
   * Handles submission errors
   */
  handleError(t) {
    const n = t instanceof Error ? t : new Error("Unknown error");
    console.error("Agent client send error:", n), this.config.onError && this.config.onError(n);
  }
  /**
   * Generates a unique message ID
   */
  generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  /**
   * Creates a system error message
   */
  createErrorMessage(t) {
    return `Sorry, there was an error: ${t instanceof Error ? t.message : "Unknown error"}`;
  }
}
const Fa = {
  /**
   * Determine if the bubble button should be shown based on mode and state
   */
  shouldShowBubble: (e, t, n) => e === "modal" && !t || (e === "sidebar" || e === "fullscreen") && n,
  /**
   * Determine if the chat is in a collapsed state
   */
  isCollapsedState: (e, t) => (e === "sidebar" || e === "fullscreen") && t,
  /**
   * Get the appropriate title text based on mode and state
   */
  getBubbleTitle: (e, t) => e === "modal" ? `Open ${t}` : `Expand ${t}`,
  /**
   * Determine if header should be visible
   */
  shouldShowHeader: (e) => e !== !1,
  /**
   * Determine if main header section should be shown
   */
  shouldShowMainHeader: (e, t, n) => e === 0 && !t && !n,
  /**
   * Get content area CSS class based on message state
   */
  getContentAreaClass: (e, t, n) => `chat-wrapper__content ${e === 0 && !t && !n ? "chat-wrapper__content--empty" : "chat-wrapper__content--with-messages"}`,
  /**
   * Determine if suggested prompts should be shown
   */
  shouldShowSuggestedPrompts: (e, t, n, r) => e === 0 && !t && !n && !!r
}, No = {
  /**
   * Convert WebSocket URL to HTTP URL for REST API calls
   */
  convertWebSocketToHttp: (e) => e.replace(
    /^wss?:\/\//,
    (t) => t === "wss://" ? "https://" : "http://"
  ),
  /**
   * Validate if a URL is a valid WebSocket URL
   */
  isValidWebSocketUrl: (e) => {
    try {
      const t = new URL(e);
      return t.protocol === "ws:" || t.protocol === "wss:";
    } catch {
      return !1;
    }
  },
  /**
   * Validate if a URL is a valid HTTP URL
   */
  isValidHttpUrl: (e) => {
    try {
      const t = new URL(e);
      return t.protocol === "http:" || t.protocol === "https:";
    } catch {
      return !1;
    }
  }
}, Ha = {
  /**
   * Validate required authentication props
   */
  validateAuthProps: (e) => {
    if (!e.userMpAuthToken)
      throw new Error("ChatWrapper: userMpAuthToken is required");
    if (!e.chatServerUrl)
      throw new Error("ChatWrapper: chatServerUrl is required");
    if (!e.chatServerKey)
      throw new Error("ChatWrapper: chatServerKey is required");
  },
  /**
   * Validate WebSocket URL format
   */
  validateWebSocketUrl: (e) => {
    if (!No.isValidWebSocketUrl(e))
      throw new Error(`Invalid WebSocket URL: ${e}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (e) => e.trim().length > 0
}, Co = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...e) => e.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (e, t, n, r, i) => Co.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${e}`,
    t && `chat-wrapper--${t}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    e === "embedded" && i && "chat-wrapper--constrained"
  )
}, wo = {
  /**
   * Create a standardized error for the chat system
   */
  createChatError: (e, t, n) => {
    const r = new Error(e);
    return r.code = t, r.originalError = n, r;
  },
  /**
   * Check if an error is a network error
   */
  isNetworkError: (e) => e.message.includes("fetch") || e.message.includes("network") || e.message.includes("connection"),
  /**
   * Get user-friendly error message
   */
  getUserFriendlyErrorMessage: (e) => wo.isNetworkError(e) ? "Connection error. Please check your internet connection and try again." : e.message.includes("authentication") || e.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : e.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, Ut = {
  state: Fa,
  url: No,
  validation: Ha,
  css: Co,
  error: wo
};
class ki extends Pr {
  constructor(n) {
    super(n);
    J(this, "resetTimeoutId", null);
    J(this, "resetErrorBoundary", () => {
      this.resetTimeoutId && clearTimeout(this.resetTimeoutId), this.setState({
        hasError: !1,
        error: void 0,
        errorInfo: void 0
      });
    });
    J(this, "handleRetry", () => {
      this.resetTimeoutId = window.setTimeout(() => {
        this.resetErrorBoundary();
      }, 100);
    });
    this.state = { hasError: !1 };
  }
  static getDerivedStateFromError(n) {
    return {
      hasError: !0,
      error: n
    };
  }
  componentDidCatch(n, r) {
    this.setState({
      error: n,
      errorInfo: r
    }), this.props.onError && this.props.onError(n, r), console.error("ChatErrorBoundary caught an error:", n, r);
  }
  componentDidUpdate(n) {
    const { resetOnPropsChange: r, resetKeys: i } = this.props, { hasError: o } = this.state;
    if (o && r && i) {
      const s = n.resetKeys || [];
      i.some(
        (u, h) => u !== s[h]
      ) && this.resetErrorBoundary();
    }
  }
  render() {
    const { hasError: n, error: r } = this.state, { children: i, fallback: o } = this.props;
    return n && r ? o ? o(r, this.handleRetry) : /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__error-icon", children: "⚠️" }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/ChatErrorBoundary.tsx",
        lineNumber: 99,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ l.jsxDEV("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/ChatErrorBoundary.tsx",
        lineNumber: 100,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ l.jsxDEV("p", { className: "chat-wrapper__error-message", children: Ut.error.getUserFriendlyErrorMessage(r) }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/ChatErrorBoundary.tsx",
        lineNumber: 101,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__error-actions", children: /* @__PURE__ */ l.jsxDEV(
        "button",
        {
          className: "chat-wrapper__error-retry",
          onClick: this.handleRetry,
          type: "button",
          children: "Try Again"
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/ChatErrorBoundary.tsx",
          lineNumber: 105,
          columnNumber: 15
        },
        this
      ) }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/ChatErrorBoundary.tsx",
        lineNumber: 104,
        columnNumber: 13
      }, this),
      (() => {
        try {
          return !0;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ l.jsxDEV("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ l.jsxDEV("summary", { children: "Error Details (Development)" }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/ChatErrorBoundary.tsx",
          lineNumber: 121,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ l.jsxDEV("pre", { className: "chat-wrapper__error-stack", children: r.stack }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/ChatErrorBoundary.tsx",
          lineNumber: 122,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/ChatErrorBoundary.tsx",
        lineNumber: 120,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/ChatErrorBoundary.tsx",
      lineNumber: 98,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/ChatErrorBoundary.tsx",
      lineNumber: 97,
      columnNumber: 9
    }, this) : i;
  }
}
class za extends Pr {
  constructor(n) {
    super(n);
    J(this, "retryCount", 0);
    J(this, "retryTimeoutId", null);
    J(this, "handleRetry", () => {
      const { maxRetries: n = 3, retryDelay: r = 1e3, onRetry: i } = this.props;
      if (this.retryCount >= n) {
        console.warn("Max retry attempts reached for WebSocket connection");
        return;
      }
      this.setState({ isRetrying: !0 }), this.retryCount++, this.retryTimeoutId = window.setTimeout(() => {
        this.setState({
          hasError: !1,
          error: void 0,
          isRetrying: !1
        }), i && i();
      }, r * this.retryCount);
    });
    J(this, "handleManualReset", () => {
      this.retryCount = 0, this.setState({
        hasError: !1,
        error: void 0,
        isRetrying: !1
      }), this.props.onRetry && this.props.onRetry();
    });
    this.state = {
      hasError: !1,
      isRetrying: !1
    };
  }
  static getDerivedStateFromError(n) {
    return {
      hasError: !0,
      error: n
    };
  }
  componentDidCatch(n) {
    console.error("WebSocketErrorBoundary caught an error:", n), this.props.onError && this.props.onError(n);
  }
  componentWillUnmount() {
    this.retryTimeoutId && clearTimeout(this.retryTimeoutId);
  }
  render() {
    const { hasError: n, error: r, isRetrying: i } = this.state, { children: o, maxRetries: s = 3 } = this.props;
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || Ut.error.isNetworkError(r)) ? /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__error-icon", children: "🔌" }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
        lineNumber: 101,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ l.jsxDEV("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
        lineNumber: 102,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ l.jsxDEV("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
        lineNumber: 103,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ l.jsxDEV("span", { children: "Reconnecting..." }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
          lineNumber: 109,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__spinner" }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
          lineNumber: 110,
          columnNumber: 21
        }, this)
      ] }, void 0, !0, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
        lineNumber: 108,
        columnNumber: 19
      }, this) : /* @__PURE__ */ l.jsxDEV(l.Fragment, { children: [
        this.retryCount < s && /* @__PURE__ */ l.jsxDEV(
          "button",
          {
            className: "chat-wrapper__error-retry",
            onClick: this.handleRetry,
            type: "button",
            children: [
              "Retry Connection (",
              s - this.retryCount,
              " attempts left)"
            ]
          },
          void 0,
          !0,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
            lineNumber: 115,
            columnNumber: 23
          },
          this
        ),
        /* @__PURE__ */ l.jsxDEV(
          "button",
          {
            className: "chat-wrapper__error-reset",
            onClick: this.handleManualReset,
            type: "button",
            children: "Reset Connection"
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
            lineNumber: 123,
            columnNumber: 21
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
        lineNumber: 113,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
        lineNumber: 106,
        columnNumber: 15
      }, this),
      (() => {
        try {
          return !0;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ l.jsxDEV("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ l.jsxDEV("summary", { children: "Error Details (Development)" }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
          lineNumber: 141,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ l.jsxDEV("pre", { className: "chat-wrapper__error-stack", children: r.stack }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
          lineNumber: 142,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
        lineNumber: 140,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
      lineNumber: 100,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/WebSocketErrorBoundary.tsx",
      lineNumber: 99,
      columnNumber: 11
    }, this) : o;
  }
}
class Ba extends Pr {
  constructor(n) {
    super(n);
    J(this, "handleRetry", () => {
      this.setState({
        hasError: !1,
        error: void 0,
        failedFiles: void 0
      }), this.props.onRetry && this.props.onRetry();
    });
    J(this, "handleDismiss", () => {
      this.setState({
        hasError: !1,
        error: void 0,
        failedFiles: void 0
      });
    });
    this.state = { hasError: !1 };
  }
  static getDerivedStateFromError(n) {
    return {
      hasError: !0,
      error: n
    };
  }
  componentDidCatch(n) {
    console.error("FileUploadErrorBoundary caught an error:", n);
    const r = this.extractFailedFiles(n);
    this.setState({ failedFiles: r }), this.props.onError && this.props.onError(n, r);
  }
  extractFailedFiles(n) {
    const r = /file[s]?\s*['":]?\s*([^,\n]+)/gi, i = n.message.match(r);
    return i ? i.map((o) => o.replace(/file[s]?\s*['":]?\s*/i, "").trim()) : [];
  }
  render() {
    const { hasError: n, error: r, failedFiles: i } = this.state, { children: o, allowRetry: s = !0 } = this.props;
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__error-icon", children: "📁" }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
        lineNumber: 87,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ l.jsxDEV("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
        lineNumber: 88,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ l.jsxDEV("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
        lineNumber: 89,
        columnNumber: 15
      }, this),
      i && i.length > 0 && /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ l.jsxDEV("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
          lineNumber: 95,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ l.jsxDEV("ul", { className: "chat-wrapper__failed-files-list", children: i.map((u, h) => /* @__PURE__ */ l.jsxDEV("li", { className: "chat-wrapper__failed-file", children: u }, h, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
          lineNumber: 98,
          columnNumber: 23
        }, this)) }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
          lineNumber: 96,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
        lineNumber: 94,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__error-actions", children: [
        s && /* @__PURE__ */ l.jsxDEV(
          "button",
          {
            className: "chat-wrapper__error-retry",
            onClick: this.handleRetry,
            type: "button",
            children: "Try Again"
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
            lineNumber: 108,
            columnNumber: 19
          },
          this
        ),
        /* @__PURE__ */ l.jsxDEV(
          "button",
          {
            className: "chat-wrapper__error-dismiss",
            onClick: this.handleDismiss,
            type: "button",
            children: "Continue Without Files"
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
            lineNumber: 116,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
        lineNumber: 106,
        columnNumber: 15
      }, this),
      (() => {
        try {
          return !0;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ l.jsxDEV("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ l.jsxDEV("summary", { children: "Error Details (Development)" }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
          lineNumber: 133,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ l.jsxDEV("pre", { className: "chat-wrapper__error-stack", children: r.stack }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
          lineNumber: 134,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
        lineNumber: 132,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
      lineNumber: 86,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/error/FileUploadErrorBoundary.tsx",
      lineNumber: 85,
      columnNumber: 11
    }, this) : o;
  }
  getFileUploadErrorMessage(n) {
    return n.message.includes("size") || n.message.includes("large") ? "File size is too large. Please try with smaller files." : n.message.includes("type") || n.message.includes("format") ? "File type is not supported. Please try with different file types." : n.message.includes("network") || n.message.includes("connection") ? "Network error during upload. Please check your connection and try again." : n.message.includes("timeout") ? "Upload timed out. Please try again with smaller files or better connection." : "Failed to upload files. Please try again.";
  }
}
const Ga = ({
  className: e,
  onClick: t,
  size: n = 24,
  color: r = "currentColor"
}) => /* @__PURE__ */ l.jsxDEV(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    onClick: t,
    style: { cursor: t ? "pointer" : "default" },
    children: [
      /* @__PURE__ */ l.jsxDEV(
        "path",
        {
          d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
          fill: r
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/ChatIcon.tsx",
          lineNumber: 21,
          columnNumber: 7
        },
        void 0
      ),
      /* @__PURE__ */ l.jsxDEV("circle", { cx: "7", cy: "10", r: "1", fill: r }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/ChatIcon.tsx",
        lineNumber: 25,
        columnNumber: 7
      }, void 0),
      /* @__PURE__ */ l.jsxDEV("circle", { cx: "12", cy: "10", r: "1", fill: r }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/ChatIcon.tsx",
        lineNumber: 26,
        columnNumber: 7
      }, void 0),
      /* @__PURE__ */ l.jsxDEV("circle", { cx: "17", cy: "10", r: "1", fill: r }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/ChatIcon.tsx",
        lineNumber: 27,
        columnNumber: 7
      }, void 0)
    ]
  },
  void 0,
  !0,
  {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/ChatIcon.tsx",
    lineNumber: 11,
    columnNumber: 5
  },
  void 0
), $a = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ l.jsxDEV(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    onClick: t,
    style: { cursor: t ? "pointer" : "default" },
    children: /* @__PURE__ */ l.jsxDEV(
      "path",
      {
        d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
        fill: r
      },
      void 0,
      !1,
      {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/CloseIcon.tsx",
        lineNumber: 21,
        columnNumber: 7
      },
      void 0
    )
  },
  void 0,
  !1,
  {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/CloseIcon.tsx",
    lineNumber: 11,
    columnNumber: 5
  },
  void 0
), qa = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor",
  isFullscreen: i = !1
}) => /* @__PURE__ */ l.jsxDEV(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    onClick: t,
    style: { cursor: t ? "pointer" : "default" },
    children: i ? (
      // Minimize icon (arrows pointing inward)
      /* @__PURE__ */ l.jsxDEV(
        "path",
        {
          d: "M8 3v3a2 2 0 01-2 2H3M21 8h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3M16 21v-3a2 2 0 012-2h3",
          stroke: r,
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/FullscreenIcon.tsx",
          lineNumber: 28,
          columnNumber: 9
        },
        void 0
      )
    ) : (
      // Fullscreen icon (arrows pointing outward)
      /* @__PURE__ */ l.jsxDEV(
        "path",
        {
          d: "M7 14H5v5h5v-2M5 10V5h5v2M17 14h2v5h-5v-2M19 10V5h-5v2",
          stroke: r,
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/FullscreenIcon.tsx",
          lineNumber: 37,
          columnNumber: 9
        },
        void 0
      )
    )
  },
  void 0,
  !1,
  {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/FullscreenIcon.tsx",
    lineNumber: 16,
    columnNumber: 5
  },
  void 0
), Za = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ l.jsxDEV(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    onClick: t,
    style: { cursor: t ? "pointer" : "default" },
    children: /* @__PURE__ */ l.jsxDEV(
      "path",
      {
        d: "M18 12l-3 3-3-3m-6 3l-3 3-3-3",
        stroke: r,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      },
      void 0,
      !1,
      {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/CollapseIcon.tsx",
        lineNumber: 21,
        columnNumber: 7
      },
      void 0
    )
  },
  void 0,
  !1,
  {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/CollapseIcon.tsx",
    lineNumber: 11,
    columnNumber: 5
  },
  void 0
), Eo = ({
  className: e,
  onClick: t,
  size: n = 16,
  color: r = "currentColor"
}) => /* @__PURE__ */ l.jsxDEV(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    onClick: t,
    style: { cursor: t ? "pointer" : "default" },
    children: /* @__PURE__ */ l.jsxDEV(
      "path",
      {
        d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
        fill: r
      },
      void 0,
      !1,
      {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/SettingsIcon.tsx",
        lineNumber: 21,
        columnNumber: 7
      },
      void 0
    )
  },
  void 0,
  !1,
  {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/SettingsIcon.tsx",
    lineNumber: 11,
    columnNumber: 5
  },
  void 0
), Ya = ({
  className: e,
  onClick: t,
  size: n = 18,
  color: r = "currentColor"
}) => /* @__PURE__ */ l.jsxDEV(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 18 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    onClick: t,
    style: { cursor: t ? "pointer" : "default" },
    children: [
      /* @__PURE__ */ l.jsxDEV("mask", { id: "mask0_444_23118", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "18", height: "18", children: /* @__PURE__ */ l.jsxDEV("rect", { width: "18", height: "18", fill: "#D9D9D9" }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/CopyIcon.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, void 0) }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/CopyIcon.tsx",
        lineNumber: 21,
        columnNumber: 7
      }, void 0),
      /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_444_23118)", children: /* @__PURE__ */ l.jsxDEV(
        "path",
        {
          d: "M5.8498 13.4998C5.47855 13.4998 5.16074 13.3676 4.89637 13.1032C4.63199 12.8389 4.4998 12.5211 4.4998 12.1498V3.1498C4.4998 2.77855 4.63199 2.46074 4.89637 2.19637C5.16074 1.93199 5.47855 1.7998 5.8498 1.7998H14.8498C15.2211 1.7998 15.5389 1.93199 15.8032 2.19637C16.0676 2.46074 16.1998 2.77855 16.1998 3.1498V12.1498C16.1998 12.5211 16.0676 12.8389 15.8032 13.1032C15.5389 13.3676 15.2211 13.4998 14.8498 13.4998H5.8498ZM5.8498 12.1498H14.8498V3.1498H5.8498V12.1498ZM3.1498 16.1998C2.77855 16.1998 2.46074 16.0676 2.19637 15.8032C1.93199 15.5389 1.7998 15.2211 1.7998 14.8498V4.4998H3.1498V14.8498H13.4998V16.1998H3.1498Z",
          fill: r
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/CopyIcon.tsx",
          lineNumber: 25,
          columnNumber: 9
        },
        void 0
      ) }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/CopyIcon.tsx",
        lineNumber: 24,
        columnNumber: 7
      }, void 0)
    ]
  },
  void 0,
  !0,
  {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/icons/CopyIcon.tsx",
    lineNumber: 11,
    columnNumber: 5
  },
  void 0
), Ka = ({
  mode: e,
  headerName: t,
  bubbleText: n,
  showBubbleText: r = !0,
  onClick: i
}) => {
  const o = e === "modal" ? `Open ${t}` : `Expand ${t}`;
  return /* @__PURE__ */ l.jsxDEV(
    "button",
    {
      className: "chat-wrapper__bubble-button",
      onClick: i,
      title: o,
      children: [
        /* @__PURE__ */ l.jsxDEV(Ga, { className: "chat-wrapper__bubble-icon", size: 24 }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatBubbleButton.tsx",
          lineNumber: 28,
          columnNumber: 7
        }, void 0),
        r && /* @__PURE__ */ l.jsxDEV("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatBubbleButton.tsx",
          lineNumber: 30,
          columnNumber: 9
        }, void 0)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatBubbleButton.tsx",
      lineNumber: 23,
      columnNumber: 5
    },
    void 0
  );
}, Xa = ({
  headerName: e,
  mode: t,
  isCollapsed: n,
  isModalOpen: r,
  devMode: i = !1,
  onClose: o,
  onToggleFullscreen: s,
  onToggleCollapse: a,
  onOpenSettings: u
}) => {
  const h = () => t === "modal" && r && o ? /* @__PURE__ */ l.jsxDEV(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: o,
      title: "Close chat",
      children: /* @__PURE__ */ l.jsxDEV($a, { size: 20 }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatHeader.tsx",
        lineNumber: 36,
        columnNumber: 11
      }, void 0)
    },
    void 0,
    !1,
    {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatHeader.tsx",
      lineNumber: 31,
      columnNumber: 9
    },
    void 0
  ) : null, c = () => {
    if ((t === "sidebar" || t === "fullscreen") && !n && s) {
      const f = t === "fullscreen";
      return /* @__PURE__ */ l.jsxDEV(
        "button",
        {
          className: f ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: s,
          title: f ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ l.jsxDEV(qa, { size: 20, isFullscreen: f }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatHeader.tsx",
            lineNumber: 61,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatHeader.tsx",
          lineNumber: 52,
          columnNumber: 9
        },
        void 0
      );
    }
    return null;
  }, m = () => (t === "sidebar" || t === "fullscreen") && !n && a ? /* @__PURE__ */ l.jsxDEV(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: a,
      title: "Collapse chat",
      children: /* @__PURE__ */ l.jsxDEV(Za, { size: 20 }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatHeader.tsx",
        lineNumber: 81,
        columnNumber: 11
      }, void 0)
    },
    void 0,
    !1,
    {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatHeader.tsx",
      lineNumber: 76,
      columnNumber: 9
    },
    void 0
  ) : null, g = () => !i || !u ? null : /* @__PURE__ */ l.jsxDEV(
    "button",
    {
      className: "chat-wrapper__settings-button",
      onClick: u,
      title: "Developer Settings",
      children: /* @__PURE__ */ l.jsxDEV(Eo, { size: 16 }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatHeader.tsx",
        lineNumber: 97,
        columnNumber: 9
      }, void 0)
    },
    void 0,
    !1,
    {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatHeader.tsx",
      lineNumber: 92,
      columnNumber: 7
    },
    void 0
  );
  return /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ l.jsxDEV("h2", { className: "chat-wrapper__title", children: e }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatHeader.tsx",
      lineNumber: 105,
      columnNumber: 9
    }, void 0) }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatHeader.tsx",
      lineNumber: 104,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__header-controls", children: [
      g(),
      c(),
      m(),
      h()
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatHeader.tsx",
      lineNumber: 107,
      columnNumber: 7
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatHeader.tsx",
    lineNumber: 103,
    columnNumber: 5
  }, void 0);
};
class Ja extends Error {
  /**
   * Create an assertion error.
   *
   * @param {string} message
   *   Message explaining error.
   * @param {unknown} actual
   *   Value.
   * @param {unknown} expected
   *   Baseline.
   * @param {string} operator
   *   Name of equality operation.
   * @param {boolean} generated
   *   Whether `message` is a custom message or not
   * @returns
   *   Instance.
   */
  // eslint-disable-next-line max-params
  constructor(n, r, i, o, s) {
    super(n);
    J(
      this,
      "name",
      /** @type {const} */
      "Assertion"
    );
    J(
      this,
      "code",
      /** @type {const} */
      "ERR_ASSERTION"
    );
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.actual = r, this.expected = i, this.generated = s, this.operator = o;
  }
}
function C(e, t) {
  yo(
    !!e,
    !1,
    !0,
    "ok",
    "Expected value to be truthy",
    t
  );
}
function vr(e) {
  yo(!1, !1, !0, "ok", "Unreachable", e);
}
function yo(e, t, n, r, i, o) {
  if (!e)
    throw o instanceof Error ? o : new Ja(
      o || i,
      t,
      n,
      r,
      !o
    );
}
function Qa(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const el = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, tl = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, nl = {};
function bi(e, t) {
  return (nl.jsx ? tl : el).test(e);
}
const rl = /[ \t\n\f\r]/g;
function il(e) {
  return typeof e == "object" ? e.type === "text" ? xi(e.value) : !1 : xi(e);
}
function xi(e) {
  return e.replace(rl, "") === "";
}
class Tn {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(t, n, r) {
    this.normal = n, this.property = t, r && (this.space = r);
  }
}
Tn.prototype.normal = {};
Tn.prototype.property = {};
Tn.prototype.space = void 0;
function vo(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new Tn(n, r, t);
}
function Sr(e) {
  return e.toLowerCase();
}
class mt {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(t, n) {
    this.attribute = n, this.property = t;
  }
}
mt.prototype.attribute = "";
mt.prototype.booleanish = !1;
mt.prototype.boolean = !1;
mt.prototype.commaOrSpaceSeparated = !1;
mt.prototype.commaSeparated = !1;
mt.prototype.defined = !1;
mt.prototype.mustUseProperty = !1;
mt.prototype.number = !1;
mt.prototype.overloadedBoolean = !1;
mt.prototype.property = "";
mt.prototype.spaceSeparated = !1;
mt.prototype.space = void 0;
let ol = 0;
const he = nn(), Ve = nn(), Tr = nn(), A = nn(), _e = nn(), un = nn(), ft = nn();
function nn() {
  return 2 ** ++ol;
}
const _r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: he,
  booleanish: Ve,
  commaOrSpaceSeparated: ft,
  commaSeparated: un,
  number: A,
  overloadedBoolean: Tr,
  spaceSeparated: _e
}, Symbol.toStringTag, { value: "Module" })), ar = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(_r)
);
class Vr extends mt {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(t, n, r, i) {
    let o = -1;
    if (super(t, n), Ni(this, "space", i), typeof r == "number")
      for (; ++o < ar.length; ) {
        const s = ar[o];
        Ni(this, ar[o], (r & _r[s]) === _r[s]);
      }
  }
}
Vr.prototype.defined = !0;
function Ni(e, t, n) {
  n && (e[t] = n);
}
function hn(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const o = new Vr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (o.mustUseProperty = !0), t[r] = o, n[Sr(r)] = r, n[Sr(o.attribute)] = r;
  }
  return new Tn(t, n, e.space);
}
const So = hn({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Ve,
    ariaAutoComplete: null,
    ariaBusy: Ve,
    ariaChecked: Ve,
    ariaColCount: A,
    ariaColIndex: A,
    ariaColSpan: A,
    ariaControls: _e,
    ariaCurrent: null,
    ariaDescribedBy: _e,
    ariaDetails: null,
    ariaDisabled: Ve,
    ariaDropEffect: _e,
    ariaErrorMessage: null,
    ariaExpanded: Ve,
    ariaFlowTo: _e,
    ariaGrabbed: Ve,
    ariaHasPopup: null,
    ariaHidden: Ve,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: _e,
    ariaLevel: A,
    ariaLive: null,
    ariaModal: Ve,
    ariaMultiLine: Ve,
    ariaMultiSelectable: Ve,
    ariaOrientation: null,
    ariaOwns: _e,
    ariaPlaceholder: null,
    ariaPosInSet: A,
    ariaPressed: Ve,
    ariaReadOnly: Ve,
    ariaRelevant: null,
    ariaRequired: Ve,
    ariaRoleDescription: _e,
    ariaRowCount: A,
    ariaRowIndex: A,
    ariaRowSpan: A,
    ariaSelected: Ve,
    ariaSetSize: A,
    ariaSort: null,
    ariaValueMax: A,
    ariaValueMin: A,
    ariaValueNow: A,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function To(e, t) {
  return t in e ? e[t] : t;
}
function _o(e, t) {
  return To(e, t.toLowerCase());
}
const sl = hn({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: un,
    acceptCharset: _e,
    accessKey: _e,
    action: null,
    allow: null,
    allowFullScreen: he,
    allowPaymentRequest: he,
    allowUserMedia: he,
    alt: null,
    as: null,
    async: he,
    autoCapitalize: null,
    autoComplete: _e,
    autoFocus: he,
    autoPlay: he,
    blocking: _e,
    capture: null,
    charSet: null,
    checked: he,
    cite: null,
    className: _e,
    cols: A,
    colSpan: null,
    content: null,
    contentEditable: Ve,
    controls: he,
    controlsList: _e,
    coords: A | un,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: he,
    defer: he,
    dir: null,
    dirName: null,
    disabled: he,
    download: Tr,
    draggable: Ve,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: he,
    formTarget: null,
    headers: _e,
    height: A,
    hidden: Tr,
    high: A,
    href: null,
    hrefLang: null,
    htmlFor: _e,
    httpEquiv: _e,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: he,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: he,
    itemId: null,
    itemProp: _e,
    itemRef: _e,
    itemScope: he,
    itemType: _e,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: he,
    low: A,
    manifest: null,
    max: null,
    maxLength: A,
    media: null,
    method: null,
    min: null,
    minLength: A,
    multiple: he,
    muted: he,
    name: null,
    nonce: null,
    noModule: he,
    noValidate: he,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: he,
    optimum: A,
    pattern: null,
    ping: _e,
    placeholder: null,
    playsInline: he,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: he,
    referrerPolicy: null,
    rel: _e,
    required: he,
    reversed: he,
    rows: A,
    rowSpan: A,
    sandbox: _e,
    scope: null,
    scoped: he,
    seamless: he,
    selected: he,
    shadowRootClonable: he,
    shadowRootDelegatesFocus: he,
    shadowRootMode: null,
    shape: null,
    size: A,
    sizes: null,
    slot: null,
    span: A,
    spellCheck: Ve,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: A,
    step: null,
    style: null,
    tabIndex: A,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: he,
    useMap: null,
    value: Ve,
    width: A,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: _e,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: A,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: A,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: he,
    // Lists. Use CSS to reduce space between items instead
    declare: he,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: A,
    // `<img>` and `<object>`
    leftMargin: A,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: A,
    // `<body>`
    marginWidth: A,
    // `<body>`
    noResize: he,
    // `<frame>`
    noHref: he,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: he,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: he,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: A,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: Ve,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: A,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: A,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: he,
    disableRemotePlayback: he,
    prefix: null,
    property: null,
    results: A,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: _o
}), al = hn({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: ft,
    accentHeight: A,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: A,
    amplitude: A,
    arabicForm: null,
    ascent: A,
    attributeName: null,
    attributeType: null,
    azimuth: A,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: A,
    by: null,
    calcMode: null,
    capHeight: A,
    className: _e,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: A,
    diffuseConstant: A,
    direction: null,
    display: null,
    dur: null,
    divisor: A,
    dominantBaseline: null,
    download: he,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: A,
    enableBackground: null,
    end: null,
    event: null,
    exponent: A,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: A,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: un,
    g2: un,
    glyphName: un,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: A,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: A,
    horizOriginX: A,
    horizOriginY: A,
    id: null,
    ideographic: A,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: A,
    k: A,
    k1: A,
    k2: A,
    k3: A,
    k4: A,
    kernelMatrix: ft,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: A,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: A,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: A,
    overlineThickness: A,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: A,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: _e,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: A,
    pointsAtY: A,
    pointsAtZ: A,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: ft,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: ft,
    rev: ft,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: ft,
    requiredFeatures: ft,
    requiredFonts: ft,
    requiredFormats: ft,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: A,
    specularExponent: A,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: A,
    strikethroughThickness: A,
    string: null,
    stroke: null,
    strokeDashArray: ft,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: A,
    strokeOpacity: A,
    strokeWidth: null,
    style: null,
    surfaceScale: A,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: ft,
    tabIndex: A,
    tableValues: null,
    target: null,
    targetX: A,
    targetY: A,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: ft,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: A,
    underlineThickness: A,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: A,
    values: null,
    vAlphabetic: A,
    vMathematical: A,
    vectorEffect: null,
    vHanging: A,
    vIdeographic: A,
    version: null,
    vertAdvY: A,
    vertOriginX: A,
    vertOriginY: A,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: A,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: To
}), Do = hn({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(e, t) {
    return "xlink:" + t.slice(5).toLowerCase();
  }
}), Oo = hn({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: _o
}), Io = hn({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), ll = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, cl = /[A-Z]/g, Ci = /-[a-z]/g, ul = /^data[-\w.:]+$/i;
function dl(e, t) {
  const n = Sr(t);
  let r = t, i = mt;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && ul.test(t)) {
    if (t.charAt(4) === "-") {
      const o = t.slice(5).replace(Ci, hl);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = t.slice(4);
      if (!Ci.test(o)) {
        let s = o.replace(cl, pl);
        s.charAt(0) !== "-" && (s = "-" + s), t = "data" + s;
      }
    }
    i = Vr;
  }
  return new i(r, t);
}
function pl(e) {
  return "-" + e.toLowerCase();
}
function hl(e) {
  return e.charAt(1).toUpperCase();
}
const ml = vo([So, sl, Do, Oo, Io], "html"), Fr = vo([So, al, Do, Oo, Io], "svg");
function fl(e) {
  return e.join(" ").trim();
}
var Hr = {}, wi = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, gl = /\n/g, kl = /^\s*/, bl = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, xl = /^:\s*/, Nl = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Cl = /^[;\s]*/, wl = /^\s+|\s+$/g, El = `
`, Ei = "/", yi = "*", tn = "", yl = "comment", vl = "declaration", Sl = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(E) {
    var w = E.match(gl);
    w && (n += w.length);
    var I = E.lastIndexOf(El);
    r = ~I ? E.length - I : r + E.length;
  }
  function o() {
    var E = { line: n, column: r };
    return function(w) {
      return w.position = new s(E), h(), w;
    };
  }
  function s(E) {
    this.start = E, this.end = { line: n, column: r }, this.source = t.source;
  }
  s.prototype.content = e;
  function a(E) {
    var w = new Error(
      t.source + ":" + n + ":" + r + ": " + E
    );
    if (w.reason = E, w.filename = t.source, w.line = n, w.column = r, w.source = e, !t.silent) throw w;
  }
  function u(E) {
    var w = E.exec(e);
    if (w) {
      var I = w[0];
      return i(I), e = e.slice(I.length), w;
    }
  }
  function h() {
    u(kl);
  }
  function c(E) {
    var w;
    for (E = E || []; w = m(); )
      w !== !1 && E.push(w);
    return E;
  }
  function m() {
    var E = o();
    if (!(Ei != e.charAt(0) || yi != e.charAt(1))) {
      for (var w = 2; tn != e.charAt(w) && (yi != e.charAt(w) || Ei != e.charAt(w + 1)); )
        ++w;
      if (w += 2, tn === e.charAt(w - 1))
        return a("End of comment missing");
      var I = e.slice(2, w - 2);
      return r += 2, i(I), e = e.slice(w), r += 2, E({
        type: yl,
        comment: I
      });
    }
  }
  function g() {
    var E = o(), w = u(bl);
    if (w) {
      if (m(), !u(xl)) return a("property missing ':'");
      var I = u(Nl), y = E({
        type: vl,
        property: vi(w[0].replace(wi, tn)),
        value: I ? vi(I[0].replace(wi, tn)) : tn
      });
      return u(Cl), y;
    }
  }
  function f() {
    var E = [];
    c(E);
    for (var w; w = g(); )
      w !== !1 && (E.push(w), c(E));
    return E;
  }
  return h(), f();
};
function vi(e) {
  return e ? e.replace(wl, tn) : tn;
}
var Tl = zn && zn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.default = Dl;
var _l = Tl(Sl);
function Dl(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, _l.default)(e), i = typeof t == "function";
  return r.forEach(function(o) {
    if (o.type === "declaration") {
      var s = o.property, a = o.value;
      i ? t(s, a, o) : a && (n = n || {}, n[s] = a);
    }
  }), n;
}
var Yn = {};
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.camelCase = void 0;
var Ol = /^--[a-zA-Z0-9_-]+$/, Il = /-([a-z])/g, jl = /^[^-]+$/, Rl = /^-(webkit|moz|ms|o|khtml)-/, Ml = /^-(ms)-/, Ul = function(e) {
  return !e || jl.test(e) || Ol.test(e);
}, Al = function(e, t) {
  return t.toUpperCase();
}, Si = function(e, t) {
  return "".concat(t, "-");
}, Ll = function(e, t) {
  return t === void 0 && (t = {}), Ul(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Ml, Si) : e = e.replace(Rl, Si), e.replace(Il, Al));
};
Yn.camelCase = Ll;
var Pl = zn && zn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, Wl = Pl(Hr), Vl = Yn;
function Dr(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, Wl.default)(e, function(r, i) {
    r && i && (n[(0, Vl.camelCase)(r, t)] = i);
  }), n;
}
Dr.default = Dr;
var Fl = Dr;
const Hl = /* @__PURE__ */ Wr(Fl), jo = Ro("end"), zr = Ro("start");
function Ro(e) {
  return t;
  function t(n) {
    const r = n && n.position && n.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function zl(e) {
  const t = zr(e), n = jo(e);
  if (t && n)
    return { start: t, end: n };
}
function wn(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Ti(e.position) : "start" in e || "end" in e ? Ti(e) : "line" in e || "column" in e ? Or(e) : "";
}
function Or(e) {
  return _i(e && e.line) + ":" + _i(e && e.column);
}
function Ti(e) {
  return Or(e && e.start) + "-" + Or(e && e.end);
}
function _i(e) {
  return e && typeof e == "number" ? e : 1;
}
class Qe extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(t, n, r) {
    super(), typeof n == "string" && (r = n, n = void 0);
    let i = "", o = {}, s = !1;
    if (n && ("line" in n && "column" in n ? o = { place: n } : "start" in n && "end" in n ? o = { place: n } : "type" in n ? o = {
      ancestors: [n],
      place: n.position
    } : o = { ...n }), typeof t == "string" ? i = t : !o.cause && t && (s = !0, i = t.message, o.cause = t), !o.ruleId && !o.source && typeof r == "string") {
      const u = r.indexOf(":");
      u === -1 ? o.ruleId = r : (o.source = r.slice(0, u), o.ruleId = r.slice(u + 1));
    }
    if (!o.place && o.ancestors && o.ancestors) {
      const u = o.ancestors[o.ancestors.length - 1];
      u && (o.place = u.position);
    }
    const a = o.place && "start" in o.place ? o.place.start : o.place;
    this.ancestors = o.ancestors || void 0, this.cause = o.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = wn(o.place) || "1:1", this.place = o.place || void 0, this.reason = this.message, this.ruleId = o.ruleId || void 0, this.source = o.source || void 0, this.stack = s && o.cause && typeof o.cause.stack == "string" ? o.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Qe.prototype.file = "";
Qe.prototype.name = "";
Qe.prototype.reason = "";
Qe.prototype.message = "";
Qe.prototype.stack = "";
Qe.prototype.column = void 0;
Qe.prototype.line = void 0;
Qe.prototype.ancestors = void 0;
Qe.prototype.cause = void 0;
Qe.prototype.fatal = void 0;
Qe.prototype.place = void 0;
Qe.prototype.ruleId = void 0;
Qe.prototype.source = void 0;
const Br = {}.hasOwnProperty, Bl = /* @__PURE__ */ new Map(), Gl = /[A-Z]/g, $l = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), ql = /* @__PURE__ */ new Set(["td", "th"]), Mo = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Zl(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = nc(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = tc(n, t.jsx, t.jsxs);
  }
  const i = {
    Fragment: t.Fragment,
    ancestors: [],
    components: t.components || {},
    create: r,
    elementAttributeNameCase: t.elementAttributeNameCase || "react",
    evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
    filePath: n,
    ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
    passKeys: t.passKeys !== !1,
    passNode: t.passNode || !1,
    schema: t.space === "svg" ? Fr : ml,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, o = Uo(i, e, void 0);
  return o && typeof o != "string" ? o : i.create(
    e,
    i.Fragment,
    { children: o || void 0 },
    void 0
  );
}
function Uo(e, t, n) {
  if (t.type === "element")
    return Yl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return Kl(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return Jl(e, t, n);
  if (t.type === "mdxjsEsm")
    return Xl(e, t);
  if (t.type === "root")
    return Ql(e, t, n);
  if (t.type === "text")
    return ec(e, t);
}
function Yl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Fr, e.schema = i), e.ancestors.push(t);
  const o = Lo(e, t.tagName, !1), s = rc(e, t);
  let a = $r(e, t);
  return $l.has(t.tagName) && (a = a.filter(function(u) {
    return typeof u == "string" ? !il(u) : !0;
  })), Ao(e, s, o, t), Gr(s, a), e.ancestors.pop(), e.schema = r, e.create(t, o, s, n);
}
function Kl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return C(r.type === "ExpressionStatement"), /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Sn(e, t.position);
}
function Xl(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Sn(e, t.position);
}
function Jl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = Fr, e.schema = i), e.ancestors.push(t);
  const o = t.name === null ? e.Fragment : Lo(e, t.name, !0), s = ic(e, t), a = $r(e, t);
  return Ao(e, s, o, t), Gr(s, a), e.ancestors.pop(), e.schema = r, e.create(t, o, s, n);
}
function Ql(e, t, n) {
  const r = {};
  return Gr(r, $r(e, t)), e.create(t, e.Fragment, r, n);
}
function ec(e, t) {
  return t.value;
}
function Ao(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function Gr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function tc(e, t, n) {
  return r;
  function r(i, o, s, a) {
    const h = Array.isArray(s.children) ? n : t;
    return a ? h(o, s, a) : h(o, s);
  }
}
function nc(e, t) {
  return n;
  function n(r, i, o, s) {
    const a = Array.isArray(o.children), u = zr(r);
    return t(
      i,
      o,
      s,
      a,
      {
        columnNumber: u ? u.column - 1 : void 0,
        fileName: e,
        lineNumber: u ? u.line : void 0
      },
      void 0
    );
  }
}
function rc(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && Br.call(t.properties, i)) {
      const o = oc(e, i, t.properties[i]);
      if (o) {
        const [s, a] = o;
        e.tableCellAlignToStyle && s === "align" && typeof a == "string" && ql.has(t.tagName) ? r = a : n[s] = a;
      }
    }
  if (r) {
    const o = (
      /** @type {Style} */
      n.style || (n.style = {})
    );
    o[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function ic(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const o = r.data.estree.body[0];
        C(o.type === "ExpressionStatement");
        const s = o.expression;
        C(s.type === "ObjectExpression");
        const a = s.properties[0];
        C(a.type === "SpreadElement"), Object.assign(
          n,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        Sn(e, t.position);
    else {
      const i = r.name;
      let o;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          C(a.type === "ExpressionStatement"), o = e.evaluater.evaluateExpression(a.expression);
        } else
          Sn(e, t.position);
      else
        o = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      o;
    }
  return n;
}
function $r(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Bl;
  for (; ++r < t.children.length; ) {
    const o = t.children[r];
    let s;
    if (e.passKeys) {
      const u = o.type === "element" ? o.tagName : o.type === "mdxJsxFlowElement" || o.type === "mdxJsxTextElement" ? o.name : void 0;
      if (u) {
        const h = i.get(u) || 0;
        s = u + "-" + h, i.set(u, h + 1);
      }
    }
    const a = Uo(e, o, s);
    a !== void 0 && n.push(a);
  }
  return n;
}
function oc(e, t, n) {
  const r = dl(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Qa(n) : fl(n)), r.property === "style") {
      let i = typeof n == "object" ? n : sc(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = ac(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? ll[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function sc(e, t) {
  try {
    return Hl(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new Qe("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Mo + "#cannot-parse-style-attribute", i;
  }
}
function Lo(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let o = -1, s;
    for (; ++o < i.length; ) {
      const a = bi(i[o]) ? { type: "Identifier", name: i[o] } : { type: "Literal", value: i[o] };
      s = s ? {
        type: "MemberExpression",
        object: s,
        property: a,
        computed: !!(o && a.type === "Literal"),
        optional: !1
      } : a;
    }
    C(s, "always a result"), r = s;
  } else
    r = bi(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return Br.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Sn(e);
}
function Sn(e, t) {
  const n = new Qe(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Mo + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function ac(e) {
  const t = {};
  let n;
  for (n in e)
    Br.call(e, n) && (t[lc(n)] = e[n]);
  return t;
}
function lc(e) {
  let t = e.replace(Gl, cc);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function cc(e) {
  return "-" + e.toLowerCase();
}
const lr = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, uc = {};
function dc(e, t) {
  const n = uc, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Po(e, r, i);
}
function Po(e, t, n) {
  if (pc(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Di(e.children, t, n);
  }
  return Array.isArray(e) ? Di(e, t, n) : "";
}
function Di(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Po(e[i], t, n);
  return r.join("");
}
function pc(e) {
  return !!(e && typeof e == "object");
}
const Oi = document.createElement("i");
function qr(e) {
  const t = "&" + e + ";";
  Oi.innerHTML = t;
  const n = Oi.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
const p = (
  /** @type {const} */
  {
    carriageReturn: -5,
    lineFeed: -4,
    carriageReturnLineFeed: -3,
    horizontalTab: -2,
    virtualSpace: -1,
    eof: null,
    nul: 0,
    ht: 9,
    // `\t`
    lf: 10,
    // `\n`
    vt: 11,
    // `\v`
    cr: 13,
    // `\r`
    space: 32,
    exclamationMark: 33,
    // `!`
    quotationMark: 34,
    // `"`
    numberSign: 35,
    // `#`
    percentSign: 37,
    // `%`
    ampersand: 38,
    // `&`
    apostrophe: 39,
    // `'`
    leftParenthesis: 40,
    // `(`
    rightParenthesis: 41,
    // `)`
    asterisk: 42,
    // `*`
    plusSign: 43,
    // `+`
    dash: 45,
    // `-`
    dot: 46,
    // `.`
    slash: 47,
    // `/`
    digit0: 48,
    // `0`
    digit1: 49,
    // `1`
    digit2: 50,
    // `2`
    digit3: 51,
    // `3`
    digit4: 52,
    // `4`
    digit5: 53,
    // `5`
    digit6: 54,
    // `6`
    digit7: 55,
    // `7`
    digit8: 56,
    // `8`
    digit9: 57,
    // `9`
    colon: 58,
    // `:`
    semicolon: 59,
    // `;`
    lessThan: 60,
    // `<`
    equalsTo: 61,
    // `=`
    greaterThan: 62,
    // `>`
    questionMark: 63,
    // `?`
    atSign: 64,
    // `@`
    uppercaseX: 88,
    // `X`
    leftSquareBracket: 91,
    // `[`
    backslash: 92,
    // `\`
    rightSquareBracket: 93,
    // `]`
    caret: 94,
    // `^`
    underscore: 95,
    // `_`
    graveAccent: 96,
    // `` ` ``
    lowercaseX: 120,
    // `x`
    tilde: 126,
    // `~`
    del: 127,
    // Unicode Specials block.
    byteOrderMarker: 65279,
    // Unicode Specials block.
    replacementCharacter: 65533
    // `�`
  }
), z = (
  /** @type {const} */
  {
    atxHeadingOpeningFenceSizeMax: 6,
    // 6 number signs is fine, 7 isn’t.
    autolinkDomainSizeMax: 63,
    // 63 characters is fine, 64 is too many.
    autolinkSchemeSizeMax: 32,
    // 32 characters is fine, 33 is too many.
    cdataOpeningString: "CDATA[",
    // And preceded by `<![`.
    characterGroupPunctuation: 2,
    // Symbol used to indicate a character is punctuation
    characterGroupWhitespace: 1,
    // Symbol used to indicate a character is whitespace
    characterReferenceDecimalSizeMax: 7,
    // `&#9999999;`.
    characterReferenceHexadecimalSizeMax: 6,
    // `&#xff9999;`.
    characterReferenceNamedSizeMax: 31,
    // `&CounterClockwiseContourIntegral;`.
    codeFencedSequenceSizeMin: 3,
    // At least 3 ticks or tildes are needed.
    contentTypeContent: "content",
    contentTypeFlow: "flow",
    contentTypeString: "string",
    contentTypeText: "text",
    hardBreakPrefixSizeMin: 2,
    // At least 2 trailing spaces are needed.
    htmlBasic: 6,
    // Symbol for `<div`
    htmlCdata: 5,
    // Symbol for `<![CDATA[]]>`
    htmlComment: 2,
    // Symbol for `<!---->`
    htmlComplete: 7,
    // Symbol for `<x>`
    htmlDeclaration: 4,
    // Symbol for `<!doctype>`
    htmlInstruction: 3,
    // Symbol for `<?php?>`
    htmlRawSizeMax: 8,
    // Length of `textarea`.
    htmlRaw: 1,
    // Symbol for `<script>`
    linkResourceDestinationBalanceMax: 32,
    // See: <https://spec.commonmark.org/0.30/#link-destination>, <https://github.com/remarkjs/react-markdown/issues/658#issuecomment-984345577>
    linkReferenceSizeMax: 999,
    // See: <https://spec.commonmark.org/0.30/#link-label>
    listItemValueSizeMax: 10,
    // See: <https://spec.commonmark.org/0.30/#ordered-list-marker>
    numericBaseDecimal: 10,
    numericBaseHexadecimal: 16,
    tabSize: 4,
    // Tabs have a hard-coded size of 4, per CommonMark.
    thematicBreakMarkerCountMin: 3,
    // At least 3 asterisks, dashes, or underscores are needed.
    v8MaxSafeChunkSize: 1e4
    // V8 (and potentially others) have problems injecting giant arrays into other arrays, hence we operate in chunks.
  }
), d = (
  /** @type {const} */
  {
    // Generic type for data, such as in a title, a destination, etc.
    data: "data",
    // Generic type for syntactic whitespace (tabs, virtual spaces, spaces).
    // Such as, between a fenced code fence and an info string.
    whitespace: "whitespace",
    // Generic type for line endings (line feed, carriage return, carriage return +
    // line feed).
    lineEnding: "lineEnding",
    // A line ending, but ending a blank line.
    lineEndingBlank: "lineEndingBlank",
    // Generic type for whitespace (tabs, virtual spaces, spaces) at the start of a
    // line.
    linePrefix: "linePrefix",
    // Generic type for whitespace (tabs, virtual spaces, spaces) at the end of a
    // line.
    lineSuffix: "lineSuffix",
    // Whole ATX heading:
    //
    // ```markdown
    // #
    // ## Alpha
    // ### Bravo ###
    // ```
    //
    // Includes `atxHeadingSequence`, `whitespace`, `atxHeadingText`.
    atxHeading: "atxHeading",
    // Sequence of number signs in an ATX heading (`###`).
    atxHeadingSequence: "atxHeadingSequence",
    // Content in an ATX heading (`alpha`).
    // Includes text.
    atxHeadingText: "atxHeadingText",
    // Whole autolink (`<https://example.com>` or `<admin@example.com>`)
    // Includes `autolinkMarker` and `autolinkProtocol` or `autolinkEmail`.
    autolink: "autolink",
    // Email autolink w/o markers (`admin@example.com`)
    autolinkEmail: "autolinkEmail",
    // Marker around an `autolinkProtocol` or `autolinkEmail` (`<` or `>`).
    autolinkMarker: "autolinkMarker",
    // Protocol autolink w/o markers (`https://example.com`)
    autolinkProtocol: "autolinkProtocol",
    // A whole character escape (`\-`).
    // Includes `escapeMarker` and `characterEscapeValue`.
    characterEscape: "characterEscape",
    // The escaped character (`-`).
    characterEscapeValue: "characterEscapeValue",
    // A whole character reference (`&amp;`, `&#8800;`, or `&#x1D306;`).
    // Includes `characterReferenceMarker`, an optional
    // `characterReferenceMarkerNumeric`, in which case an optional
    // `characterReferenceMarkerHexadecimal`, and a `characterReferenceValue`.
    characterReference: "characterReference",
    // The start or end marker (`&` or `;`).
    characterReferenceMarker: "characterReferenceMarker",
    // Mark reference as numeric (`#`).
    characterReferenceMarkerNumeric: "characterReferenceMarkerNumeric",
    // Mark reference as numeric (`x` or `X`).
    characterReferenceMarkerHexadecimal: "characterReferenceMarkerHexadecimal",
    // Value of character reference w/o markers (`amp`, `8800`, or `1D306`).
    characterReferenceValue: "characterReferenceValue",
    // Whole fenced code:
    //
    // ````markdown
    // ```js
    // alert(1)
    // ```
    // ````
    codeFenced: "codeFenced",
    // A fenced code fence, including whitespace, sequence, info, and meta
    // (` ```js `).
    codeFencedFence: "codeFencedFence",
    // Sequence of grave accent or tilde characters (` ``` `) in a fence.
    codeFencedFenceSequence: "codeFencedFenceSequence",
    // Info word (`js`) in a fence.
    // Includes string.
    codeFencedFenceInfo: "codeFencedFenceInfo",
    // Meta words (`highlight="1"`) in a fence.
    // Includes string.
    codeFencedFenceMeta: "codeFencedFenceMeta",
    // A line of code.
    codeFlowValue: "codeFlowValue",
    // Whole indented code:
    //
    // ```markdown
    //     alert(1)
    // ```
    //
    // Includes `lineEnding`, `linePrefix`, and `codeFlowValue`.
    codeIndented: "codeIndented",
    // A text code (``` `alpha` ```).
    // Includes `codeTextSequence`, `codeTextData`, `lineEnding`, and can include
    // `codeTextPadding`.
    codeText: "codeText",
    codeTextData: "codeTextData",
    // A space or line ending right after or before a tick.
    codeTextPadding: "codeTextPadding",
    // A text code fence (` `` `).
    codeTextSequence: "codeTextSequence",
    // Whole content:
    //
    // ```markdown
    // [a]: b
    // c
    // =
    // d
    // ```
    //
    // Includes `paragraph` and `definition`.
    content: "content",
    // Whole definition:
    //
    // ```markdown
    // [micromark]: https://github.com/micromark/micromark
    // ```
    //
    // Includes `definitionLabel`, `definitionMarker`, `whitespace`,
    // `definitionDestination`, and optionally `lineEnding` and `definitionTitle`.
    definition: "definition",
    // Destination of a definition (`https://github.com/micromark/micromark` or
    // `<https://github.com/micromark/micromark>`).
    // Includes `definitionDestinationLiteral` or `definitionDestinationRaw`.
    definitionDestination: "definitionDestination",
    // Enclosed destination of a definition
    // (`<https://github.com/micromark/micromark>`).
    // Includes `definitionDestinationLiteralMarker` and optionally
    // `definitionDestinationString`.
    definitionDestinationLiteral: "definitionDestinationLiteral",
    // Markers of an enclosed definition destination (`<` or `>`).
    definitionDestinationLiteralMarker: "definitionDestinationLiteralMarker",
    // Unenclosed destination of a definition
    // (`https://github.com/micromark/micromark`).
    // Includes `definitionDestinationString`.
    definitionDestinationRaw: "definitionDestinationRaw",
    // Text in an destination (`https://github.com/micromark/micromark`).
    // Includes string.
    definitionDestinationString: "definitionDestinationString",
    // Label of a definition (`[micromark]`).
    // Includes `definitionLabelMarker` and `definitionLabelString`.
    definitionLabel: "definitionLabel",
    // Markers of a definition label (`[` or `]`).
    definitionLabelMarker: "definitionLabelMarker",
    // Value of a definition label (`micromark`).
    // Includes string.
    definitionLabelString: "definitionLabelString",
    // Marker between a label and a destination (`:`).
    definitionMarker: "definitionMarker",
    // Title of a definition (`"x"`, `'y'`, or `(z)`).
    // Includes `definitionTitleMarker` and optionally `definitionTitleString`.
    definitionTitle: "definitionTitle",
    // Marker around a title of a definition (`"`, `'`, `(`, or `)`).
    definitionTitleMarker: "definitionTitleMarker",
    // Data without markers in a title (`z`).
    // Includes string.
    definitionTitleString: "definitionTitleString",
    // Emphasis (`*alpha*`).
    // Includes `emphasisSequence` and `emphasisText`.
    emphasis: "emphasis",
    // Sequence of emphasis markers (`*` or `_`).
    emphasisSequence: "emphasisSequence",
    // Emphasis text (`alpha`).
    // Includes text.
    emphasisText: "emphasisText",
    // The character escape marker (`\`).
    escapeMarker: "escapeMarker",
    // A hard break created with a backslash (`\\n`).
    // Note: does not include the line ending.
    hardBreakEscape: "hardBreakEscape",
    // A hard break created with trailing spaces (`  \n`).
    // Does not include the line ending.
    hardBreakTrailing: "hardBreakTrailing",
    // Flow HTML:
    //
    // ```markdown
    // <div
    // ```
    //
    // Inlcudes `lineEnding`, `htmlFlowData`.
    htmlFlow: "htmlFlow",
    htmlFlowData: "htmlFlowData",
    // HTML in text (the tag in `a <i> b`).
    // Includes `lineEnding`, `htmlTextData`.
    htmlText: "htmlText",
    htmlTextData: "htmlTextData",
    // Whole image (`![alpha](bravo)`, `![alpha][bravo]`, `![alpha][]`, or
    // `![alpha]`).
    // Includes `label` and an optional `resource` or `reference`.
    image: "image",
    // Whole link label (`[*alpha*]`).
    // Includes `labelLink` or `labelImage`, `labelText`, and `labelEnd`.
    label: "label",
    // Text in an label (`*alpha*`).
    // Includes text.
    labelText: "labelText",
    // Start a link label (`[`).
    // Includes a `labelMarker`.
    labelLink: "labelLink",
    // Start an image label (`![`).
    // Includes `labelImageMarker` and `labelMarker`.
    labelImage: "labelImage",
    // Marker of a label (`[` or `]`).
    labelMarker: "labelMarker",
    // Marker to start an image (`!`).
    labelImageMarker: "labelImageMarker",
    // End a label (`]`).
    // Includes `labelMarker`.
    labelEnd: "labelEnd",
    // Whole link (`[alpha](bravo)`, `[alpha][bravo]`, `[alpha][]`, or `[alpha]`).
    // Includes `label` and an optional `resource` or `reference`.
    link: "link",
    // Whole paragraph:
    //
    // ```markdown
    // alpha
    // bravo.
    // ```
    //
    // Includes text.
    paragraph: "paragraph",
    // A reference (`[alpha]` or `[]`).
    // Includes `referenceMarker` and an optional `referenceString`.
    reference: "reference",
    // A reference marker (`[` or `]`).
    referenceMarker: "referenceMarker",
    // Reference text (`alpha`).
    // Includes string.
    referenceString: "referenceString",
    // A resource (`(https://example.com "alpha")`).
    // Includes `resourceMarker`, an optional `resourceDestination` with an optional
    // `whitespace` and `resourceTitle`.
    resource: "resource",
    // A resource destination (`https://example.com`).
    // Includes `resourceDestinationLiteral` or `resourceDestinationRaw`.
    resourceDestination: "resourceDestination",
    // A literal resource destination (`<https://example.com>`).
    // Includes `resourceDestinationLiteralMarker` and optionally
    // `resourceDestinationString`.
    resourceDestinationLiteral: "resourceDestinationLiteral",
    // A resource destination marker (`<` or `>`).
    resourceDestinationLiteralMarker: "resourceDestinationLiteralMarker",
    // A raw resource destination (`https://example.com`).
    // Includes `resourceDestinationString`.
    resourceDestinationRaw: "resourceDestinationRaw",
    // Resource destination text (`https://example.com`).
    // Includes string.
    resourceDestinationString: "resourceDestinationString",
    // A resource marker (`(` or `)`).
    resourceMarker: "resourceMarker",
    // A resource title (`"alpha"`, `'alpha'`, or `(alpha)`).
    // Includes `resourceTitleMarker` and optionally `resourceTitleString`.
    resourceTitle: "resourceTitle",
    // A resource title marker (`"`, `'`, `(`, or `)`).
    resourceTitleMarker: "resourceTitleMarker",
    // Resource destination title (`alpha`).
    // Includes string.
    resourceTitleString: "resourceTitleString",
    // Whole setext heading:
    //
    // ```markdown
    // alpha
    // bravo
    // =====
    // ```
    //
    // Includes `setextHeadingText`, `lineEnding`, `linePrefix`, and
    // `setextHeadingLine`.
    setextHeading: "setextHeading",
    // Content in a setext heading (`alpha\nbravo`).
    // Includes text.
    setextHeadingText: "setextHeadingText",
    // Underline in a setext heading, including whitespace suffix (`==`).
    // Includes `setextHeadingLineSequence`.
    setextHeadingLine: "setextHeadingLine",
    // Sequence of equals or dash characters in underline in a setext heading (`-`).
    setextHeadingLineSequence: "setextHeadingLineSequence",
    // Strong (`**alpha**`).
    // Includes `strongSequence` and `strongText`.
    strong: "strong",
    // Sequence of strong markers (`**` or `__`).
    strongSequence: "strongSequence",
    // Strong text (`alpha`).
    // Includes text.
    strongText: "strongText",
    // Whole thematic break:
    //
    // ```markdown
    // * * *
    // ```
    //
    // Includes `thematicBreakSequence` and `whitespace`.
    thematicBreak: "thematicBreak",
    // A sequence of one or more thematic break markers (`***`).
    thematicBreakSequence: "thematicBreakSequence",
    // Whole block quote:
    //
    // ```markdown
    // > a
    // >
    // > b
    // ```
    //
    // Includes `blockQuotePrefix` and flow.
    blockQuote: "blockQuote",
    // The `>` or `> ` of a block quote.
    blockQuotePrefix: "blockQuotePrefix",
    // The `>` of a block quote prefix.
    blockQuoteMarker: "blockQuoteMarker",
    // The optional ` ` of a block quote prefix.
    blockQuotePrefixWhitespace: "blockQuotePrefixWhitespace",
    // Whole ordered list:
    //
    // ```markdown
    // 1. a
    //    b
    // ```
    //
    // Includes `listItemPrefix`, flow, and optionally  `listItemIndent` on further
    // lines.
    listOrdered: "listOrdered",
    // Whole unordered list:
    //
    // ```markdown
    // - a
    //   b
    // ```
    //
    // Includes `listItemPrefix`, flow, and optionally  `listItemIndent` on further
    // lines.
    listUnordered: "listUnordered",
    // The indent of further list item lines.
    listItemIndent: "listItemIndent",
    // A marker, as in, `*`, `+`, `-`, `.`, or `)`.
    listItemMarker: "listItemMarker",
    // The thing that starts a list item, such as `1. `.
    // Includes `listItemValue` if ordered, `listItemMarker`, and
    // `listItemPrefixWhitespace` (unless followed by a line ending).
    listItemPrefix: "listItemPrefix",
    // The whitespace after a marker.
    listItemPrefixWhitespace: "listItemPrefixWhitespace",
    // The numerical value of an ordered item.
    listItemValue: "listItemValue",
    chunkContent: "chunkContent",
    chunkFlow: "chunkFlow",
    chunkText: "chunkText",
    chunkString: "chunkString"
  }
), Mt = (
  /** @type {const} */
  {
    ht: "	",
    lf: `
`,
    cr: "\r",
    space: " ",
    replacementCharacter: "�"
  }
);
function Lt(e, t, n, r) {
  const i = e.length;
  let o = 0, s;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < z.v8MaxSafeChunkSize)
    s = Array.from(r), s.unshift(t, n), e.splice(...s);
  else
    for (n && e.splice(t, n); o < r.length; )
      s = r.slice(
        o,
        o + z.v8MaxSafeChunkSize
      ), s.unshift(t, 0), e.splice(...s), o += z.v8MaxSafeChunkSize, t += z.v8MaxSafeChunkSize;
}
function wt(e, t) {
  return e.length > 0 ? (Lt(e, e.length, 0, t), e) : t;
}
const Ii = {}.hasOwnProperty;
function hc(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    mc(t, e[n]);
  return t;
}
function mc(e, t) {
  let n;
  for (n in t) {
    const i = (Ii.call(e, n) ? e[n] : void 0) || (e[n] = {}), o = t[n];
    let s;
    if (o)
      for (s in o) {
        Ii.call(i, s) || (i[s] = []);
        const a = o[s];
        fc(
          // @ts-expect-error Looks like a list.
          i[s],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function fc(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  Lt(e, 0, 0, r);
}
function Wo(e, t) {
  const n = Number.parseInt(e, t);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < p.ht || n === p.vt || n > p.cr && n < p.space || // Control character (DEL) of C0, and C1 controls.
    n > p.tilde && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? Mt.replacementCharacter : String.fromCodePoint(n)
  );
}
function dn(e) {
  return e.replace(/[\t\n\r ]+/g, Mt.space).replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const At = Zt(/[A-Za-z]/), bt = Zt(/[\dA-Za-z]/), gc = Zt(/[#-'*+\--9=?A-Z^-~]/);
function Ir(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < p.space || e === p.del)
  );
}
const jr = Zt(/\d/), kc = Zt(/[\dA-Fa-f]/), bc = Zt(/[!-/:-@[-`{-~]/);
function Y(e) {
  return e !== null && e < p.horizontalTab;
}
function ht(e) {
  return e !== null && (e < p.nul || e === p.space);
}
function Ce(e) {
  return e === p.horizontalTab || e === p.virtualSpace || e === p.space;
}
const xc = Zt(new RegExp("\\p{P}|\\p{S}", "u")), Nc = Zt(/\s/);
function Zt(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function mn(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const o = e.charCodeAt(n);
    let s = "";
    if (o === p.percentSign && bt(e.charCodeAt(n + 1)) && bt(e.charCodeAt(n + 2)))
      i = 2;
    else if (o < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o)) || (s = String.fromCharCode(o));
    else if (o > 55295 && o < 57344) {
      const a = e.charCodeAt(n + 1);
      o < 56320 && a > 56319 && a < 57344 ? (s = String.fromCharCode(o, a), i = 1) : s = Mt.replacementCharacter;
    } else
      s = String.fromCharCode(o);
    s && (t.push(e.slice(r, n), encodeURIComponent(s)), r = n + i + 1, s = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function De(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let o = 0;
  return s;
  function s(u) {
    return Ce(u) ? (e.enter(n), a(u)) : t(u);
  }
  function a(u) {
    return Ce(u) && o++ < i ? (e.consume(u), a) : (e.exit(n), t(u));
  }
}
const Cc = { tokenize: wc };
function wc(e) {
  const t = e.attempt(
    this.parser.constructs.contentInitial,
    r,
    i
  );
  let n;
  return t;
  function r(a) {
    if (C(
      a === p.eof || Y(a),
      "expected eol or eof"
    ), a === p.eof) {
      e.consume(a);
      return;
    }
    return e.enter(d.lineEnding), e.consume(a), e.exit(d.lineEnding), De(e, t, d.linePrefix);
  }
  function i(a) {
    return C(
      a !== p.eof && !Y(a),
      "expected anything other than a line ending or EOF"
    ), e.enter(d.paragraph), o(a);
  }
  function o(a) {
    const u = e.enter(d.chunkText, {
      contentType: z.contentTypeText,
      previous: n
    });
    return n && (n.next = u), n = u, s(a);
  }
  function s(a) {
    if (a === p.eof) {
      e.exit(d.chunkText), e.exit(d.paragraph), e.consume(a);
      return;
    }
    return Y(a) ? (e.consume(a), e.exit(d.chunkText), o) : (e.consume(a), s);
  }
}
const Ec = { tokenize: yc }, ji = { tokenize: vc };
function yc(e) {
  const t = this, n = [];
  let r = 0, i, o, s;
  return a;
  function a(U) {
    if (r < n.length) {
      const P = n[r];
      return t.containerState = P[1], C(
        P[0].continuation,
        "expected `continuation` to be defined on container construct"
      ), e.attempt(
        P[0].continuation,
        u,
        h
      )(U);
    }
    return h(U);
  }
  function u(U) {
    if (C(
      t.containerState,
      "expected `containerState` to be defined after continuation"
    ), r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && D();
      const P = t.events.length;
      let M = P, T;
      for (; M--; )
        if (t.events[M][0] === "exit" && t.events[M][1].type === d.chunkFlow) {
          T = t.events[M][1].end;
          break;
        }
      C(T, "could not find previous flow chunk"), y(r);
      let K = P;
      for (; K < t.events.length; )
        t.events[K][1].end = { ...T }, K++;
      return Lt(
        t.events,
        M + 1,
        0,
        t.events.slice(P)
      ), t.events.length = K, h(U);
    }
    return a(U);
  }
  function h(U) {
    if (r === n.length) {
      if (!i)
        return g(U);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return E(U);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(
      ji,
      c,
      m
    )(U);
  }
  function c(U) {
    return i && D(), y(r), g(U);
  }
  function m(U) {
    return t.parser.lazy[t.now().line] = r !== n.length, s = t.now().offset, E(U);
  }
  function g(U) {
    return t.containerState = {}, e.attempt(
      ji,
      f,
      E
    )(U);
  }
  function f(U) {
    return C(
      t.currentConstruct,
      "expected `currentConstruct` to be defined on tokenizer"
    ), C(
      t.containerState,
      "expected `containerState` to be defined on tokenizer"
    ), r++, n.push([t.currentConstruct, t.containerState]), g(U);
  }
  function E(U) {
    if (U === p.eof) {
      i && D(), y(0), e.consume(U);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter(d.chunkFlow, {
      _tokenizer: i,
      contentType: z.contentTypeFlow,
      previous: o
    }), w(U);
  }
  function w(U) {
    if (U === p.eof) {
      I(e.exit(d.chunkFlow), !0), y(0), e.consume(U);
      return;
    }
    return Y(U) ? (e.consume(U), I(e.exit(d.chunkFlow)), r = 0, t.interrupt = void 0, a) : (e.consume(U), w);
  }
  function I(U, P) {
    C(i, "expected `childFlow` to be defined when continuing");
    const M = t.sliceStream(U);
    if (P && M.push(null), U.previous = o, o && (o.next = U), o = U, i.defineSkip(U.start), i.write(M), t.parser.lazy[U.start.line]) {
      let T = i.events.length;
      for (; T--; )
        if (
          // The token starts before the line ending…
          i.events[T][1].start.offset < s && // …and either is not ended yet…
          (!i.events[T][1].end || // …or ends after it.
          i.events[T][1].end.offset > s)
        )
          return;
      const K = t.events.length;
      let q = K, ne, ae;
      for (; q--; )
        if (t.events[q][0] === "exit" && t.events[q][1].type === d.chunkFlow) {
          if (ne) {
            ae = t.events[q][1].end;
            break;
          }
          ne = !0;
        }
      for (C(ae, "could not find previous flow chunk"), y(r), T = K; T < t.events.length; )
        t.events[T][1].end = { ...ae }, T++;
      Lt(
        t.events,
        q + 1,
        0,
        t.events.slice(K)
      ), t.events.length = T;
    }
  }
  function y(U) {
    let P = n.length;
    for (; P-- > U; ) {
      const M = n[P];
      t.containerState = M[1], C(
        M[0].exit,
        "expected `exit` to be defined on container construct"
      ), M[0].exit.call(t, e);
    }
    n.length = U;
  }
  function D() {
    C(
      t.containerState,
      "expected `containerState` to be defined when closing flow"
    ), C(i, "expected `childFlow` to be defined when closing it"), i.write([p.eof]), o = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function vc(e, t, n) {
  return C(
    this.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), De(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    d.linePrefix,
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : z.tabSize
  );
}
function Ri(e) {
  if (e === p.eof || ht(e) || Nc(e))
    return z.characterGroupWhitespace;
  if (xc(e))
    return z.characterGroupPunctuation;
}
function Zr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const o = e[i].resolveAll;
    o && !r.includes(o) && (t = o(t, n), r.push(o));
  }
  return t;
}
const Rr = {
  name: "attention",
  resolveAll: Sc,
  tokenize: Tc
};
function Sc(e, t) {
  let n = -1, r, i, o, s, a, u, h, c;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          u = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const m = { ...e[r][1].end }, g = { ...e[n][1].start };
          Mi(m, -u), Mi(g, u), s = {
            type: u > 1 ? d.strongSequence : d.emphasisSequence,
            start: m,
            end: { ...e[r][1].end }
          }, a = {
            type: u > 1 ? d.strongSequence : d.emphasisSequence,
            start: { ...e[n][1].start },
            end: g
          }, o = {
            type: u > 1 ? d.strongText : d.emphasisText,
            start: { ...e[r][1].end },
            end: { ...e[n][1].start }
          }, i = {
            type: u > 1 ? d.strong : d.emphasis,
            start: { ...s.start },
            end: { ...a.end }
          }, e[r][1].end = { ...s.start }, e[n][1].start = { ...a.end }, h = [], e[r][1].end.offset - e[r][1].start.offset && (h = wt(h, [
            ["enter", e[r][1], t],
            ["exit", e[r][1], t]
          ])), h = wt(h, [
            ["enter", i, t],
            ["enter", s, t],
            ["exit", s, t],
            ["enter", o, t]
          ]), C(
            t.parser.constructs.insideSpan.null,
            "expected `insideSpan` to be populated"
          ), h = wt(
            h,
            Zr(
              t.parser.constructs.insideSpan.null,
              e.slice(r + 1, n),
              t
            )
          ), h = wt(h, [
            ["exit", o, t],
            ["enter", a, t],
            ["exit", a, t],
            ["exit", i, t]
          ]), e[n][1].end.offset - e[n][1].start.offset ? (c = 2, h = wt(h, [
            ["enter", e[n][1], t],
            ["exit", e[n][1], t]
          ])) : c = 0, Lt(e, r - 1, n - r + 3, h), n = r + h.length - c - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Tc(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Ri(r);
  let o;
  return s;
  function s(u) {
    return C(
      u === p.asterisk || u === p.underscore,
      "expected asterisk or underscore"
    ), o = u, e.enter("attentionSequence"), a(u);
  }
  function a(u) {
    if (u === o)
      return e.consume(u), a;
    const h = e.exit("attentionSequence"), c = Ri(u);
    C(n, "expected `attentionMarkers` to be populated");
    const m = !c || c === z.characterGroupPunctuation && i || n.includes(u), g = !i || i === z.characterGroupPunctuation && c || n.includes(r);
    return h._open = !!(o === p.asterisk ? m : m && (i || !g)), h._close = !!(o === p.asterisk ? g : g && (c || !m)), t(u);
  }
}
function Mi(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const _c = { name: "autolink", tokenize: Dc };
function Dc(e, t, n) {
  let r = 0;
  return i;
  function i(f) {
    return C(f === p.lessThan, "expected `<`"), e.enter(d.autolink), e.enter(d.autolinkMarker), e.consume(f), e.exit(d.autolinkMarker), e.enter(d.autolinkProtocol), o;
  }
  function o(f) {
    return At(f) ? (e.consume(f), s) : f === p.atSign ? n(f) : h(f);
  }
  function s(f) {
    return f === p.plusSign || f === p.dash || f === p.dot || bt(f) ? (r = 1, a(f)) : h(f);
  }
  function a(f) {
    return f === p.colon ? (e.consume(f), r = 0, u) : (f === p.plusSign || f === p.dash || f === p.dot || bt(f)) && r++ < z.autolinkSchemeSizeMax ? (e.consume(f), a) : (r = 0, h(f));
  }
  function u(f) {
    return f === p.greaterThan ? (e.exit(d.autolinkProtocol), e.enter(d.autolinkMarker), e.consume(f), e.exit(d.autolinkMarker), e.exit(d.autolink), t) : f === p.eof || f === p.space || f === p.lessThan || Ir(f) ? n(f) : (e.consume(f), u);
  }
  function h(f) {
    return f === p.atSign ? (e.consume(f), c) : gc(f) ? (e.consume(f), h) : n(f);
  }
  function c(f) {
    return bt(f) ? m(f) : n(f);
  }
  function m(f) {
    return f === p.dot ? (e.consume(f), r = 0, c) : f === p.greaterThan ? (e.exit(d.autolinkProtocol).type = d.autolinkEmail, e.enter(d.autolinkMarker), e.consume(f), e.exit(d.autolinkMarker), e.exit(d.autolink), t) : g(f);
  }
  function g(f) {
    if ((f === p.dash || bt(f)) && r++ < z.autolinkDomainSizeMax) {
      const E = f === p.dash ? g : m;
      return e.consume(f), E;
    }
    return n(f);
  }
}
const Kn = { partial: !0, tokenize: Oc };
function Oc(e, t, n) {
  return r;
  function r(o) {
    return Ce(o) ? De(e, i, d.linePrefix)(o) : i(o);
  }
  function i(o) {
    return o === p.eof || Y(o) ? t(o) : n(o);
  }
}
const Vo = {
  continuation: { tokenize: jc },
  exit: Rc,
  name: "blockQuote",
  tokenize: Ic
};
function Ic(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    if (s === p.greaterThan) {
      const a = r.containerState;
      return C(a, "expected `containerState` to be defined in container"), a.open || (e.enter(d.blockQuote, { _container: !0 }), a.open = !0), e.enter(d.blockQuotePrefix), e.enter(d.blockQuoteMarker), e.consume(s), e.exit(d.blockQuoteMarker), o;
    }
    return n(s);
  }
  function o(s) {
    return Ce(s) ? (e.enter(d.blockQuotePrefixWhitespace), e.consume(s), e.exit(d.blockQuotePrefixWhitespace), e.exit(d.blockQuotePrefix), t) : (e.exit(d.blockQuotePrefix), t(s));
  }
}
function jc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return Ce(s) ? (C(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), De(
      e,
      o,
      d.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : z.tabSize
    )(s)) : o(s);
  }
  function o(s) {
    return e.attempt(Vo, t, n)(s);
  }
}
function Rc(e) {
  e.exit(d.blockQuote);
}
const Fo = {
  name: "characterEscape",
  tokenize: Mc
};
function Mc(e, t, n) {
  return r;
  function r(o) {
    return C(o === p.backslash, "expected `\\`"), e.enter(d.characterEscape), e.enter(d.escapeMarker), e.consume(o), e.exit(d.escapeMarker), i;
  }
  function i(o) {
    return bc(o) ? (e.enter(d.characterEscapeValue), e.consume(o), e.exit(d.characterEscapeValue), e.exit(d.characterEscape), t) : n(o);
  }
}
const Ho = {
  name: "characterReference",
  tokenize: Uc
};
function Uc(e, t, n) {
  const r = this;
  let i = 0, o, s;
  return a;
  function a(m) {
    return C(m === p.ampersand, "expected `&`"), e.enter(d.characterReference), e.enter(d.characterReferenceMarker), e.consume(m), e.exit(d.characterReferenceMarker), u;
  }
  function u(m) {
    return m === p.numberSign ? (e.enter(d.characterReferenceMarkerNumeric), e.consume(m), e.exit(d.characterReferenceMarkerNumeric), h) : (e.enter(d.characterReferenceValue), o = z.characterReferenceNamedSizeMax, s = bt, c(m));
  }
  function h(m) {
    return m === p.uppercaseX || m === p.lowercaseX ? (e.enter(d.characterReferenceMarkerHexadecimal), e.consume(m), e.exit(d.characterReferenceMarkerHexadecimal), e.enter(d.characterReferenceValue), o = z.characterReferenceHexadecimalSizeMax, s = kc, c) : (e.enter(d.characterReferenceValue), o = z.characterReferenceDecimalSizeMax, s = jr, c(m));
  }
  function c(m) {
    if (m === p.semicolon && i) {
      const g = e.exit(d.characterReferenceValue);
      return s === bt && !qr(r.sliceSerialize(g)) ? n(m) : (e.enter(d.characterReferenceMarker), e.consume(m), e.exit(d.characterReferenceMarker), e.exit(d.characterReference), t);
    }
    return s(m) && i++ < o ? (e.consume(m), c) : n(m);
  }
}
const Ui = {
  partial: !0,
  tokenize: Lc
}, Ai = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Ac
};
function Ac(e, t, n) {
  const r = this, i = { partial: !0, tokenize: M };
  let o = 0, s = 0, a;
  return u;
  function u(T) {
    return h(T);
  }
  function h(T) {
    C(
      T === p.graveAccent || T === p.tilde,
      "expected `` ` `` or `~`"
    );
    const K = r.events[r.events.length - 1];
    return o = K && K[1].type === d.linePrefix ? K[2].sliceSerialize(K[1], !0).length : 0, a = T, e.enter(d.codeFenced), e.enter(d.codeFencedFence), e.enter(d.codeFencedFenceSequence), c(T);
  }
  function c(T) {
    return T === a ? (s++, e.consume(T), c) : s < z.codeFencedSequenceSizeMin ? n(T) : (e.exit(d.codeFencedFenceSequence), Ce(T) ? De(e, m, d.whitespace)(T) : m(T));
  }
  function m(T) {
    return T === p.eof || Y(T) ? (e.exit(d.codeFencedFence), r.interrupt ? t(T) : e.check(Ui, w, P)(T)) : (e.enter(d.codeFencedFenceInfo), e.enter(d.chunkString, { contentType: z.contentTypeString }), g(T));
  }
  function g(T) {
    return T === p.eof || Y(T) ? (e.exit(d.chunkString), e.exit(d.codeFencedFenceInfo), m(T)) : Ce(T) ? (e.exit(d.chunkString), e.exit(d.codeFencedFenceInfo), De(e, f, d.whitespace)(T)) : T === p.graveAccent && T === a ? n(T) : (e.consume(T), g);
  }
  function f(T) {
    return T === p.eof || Y(T) ? m(T) : (e.enter(d.codeFencedFenceMeta), e.enter(d.chunkString, { contentType: z.contentTypeString }), E(T));
  }
  function E(T) {
    return T === p.eof || Y(T) ? (e.exit(d.chunkString), e.exit(d.codeFencedFenceMeta), m(T)) : T === p.graveAccent && T === a ? n(T) : (e.consume(T), E);
  }
  function w(T) {
    return C(Y(T), "expected eol"), e.attempt(i, P, I)(T);
  }
  function I(T) {
    return C(Y(T), "expected eol"), e.enter(d.lineEnding), e.consume(T), e.exit(d.lineEnding), y;
  }
  function y(T) {
    return o > 0 && Ce(T) ? De(
      e,
      D,
      d.linePrefix,
      o + 1
    )(T) : D(T);
  }
  function D(T) {
    return T === p.eof || Y(T) ? e.check(Ui, w, P)(T) : (e.enter(d.codeFlowValue), U(T));
  }
  function U(T) {
    return T === p.eof || Y(T) ? (e.exit(d.codeFlowValue), D(T)) : (e.consume(T), U);
  }
  function P(T) {
    return e.exit(d.codeFenced), t(T);
  }
  function M(T, K, q) {
    let ne = 0;
    return ae;
    function ae(B) {
      return C(Y(B), "expected eol"), T.enter(d.lineEnding), T.consume(B), T.exit(d.lineEnding), X;
    }
    function X(B) {
      return C(
        r.parser.constructs.disable.null,
        "expected `disable.null` to be populated"
      ), T.enter(d.codeFencedFence), Ce(B) ? De(
        T,
        G,
        d.linePrefix,
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : z.tabSize
      )(B) : G(B);
    }
    function G(B) {
      return B === a ? (T.enter(d.codeFencedFenceSequence), _(B)) : q(B);
    }
    function _(B) {
      return B === a ? (ne++, T.consume(B), _) : ne >= s ? (T.exit(d.codeFencedFenceSequence), Ce(B) ? De(T, L, d.whitespace)(B) : L(B)) : q(B);
    }
    function L(B) {
      return B === p.eof || Y(B) ? (T.exit(d.codeFencedFence), K(B)) : q(B);
    }
  }
}
function Lc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return s === p.eof ? n(s) : (C(Y(s), "expected eol"), e.enter(d.lineEnding), e.consume(s), e.exit(d.lineEnding), o);
  }
  function o(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
const cr = {
  name: "codeIndented",
  tokenize: Wc
}, Pc = { partial: !0, tokenize: Vc };
function Wc(e, t, n) {
  const r = this;
  return i;
  function i(h) {
    return C(Ce(h)), e.enter(d.codeIndented), De(
      e,
      o,
      d.linePrefix,
      z.tabSize + 1
    )(h);
  }
  function o(h) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === d.linePrefix && c[2].sliceSerialize(c[1], !0).length >= z.tabSize ? s(h) : n(h);
  }
  function s(h) {
    return h === p.eof ? u(h) : Y(h) ? e.attempt(Pc, s, u)(h) : (e.enter(d.codeFlowValue), a(h));
  }
  function a(h) {
    return h === p.eof || Y(h) ? (e.exit(d.codeFlowValue), s(h)) : (e.consume(h), a);
  }
  function u(h) {
    return e.exit(d.codeIndented), t(h);
  }
}
function Vc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line] ? n(s) : Y(s) ? (e.enter(d.lineEnding), e.consume(s), e.exit(d.lineEnding), i) : De(
      e,
      o,
      d.linePrefix,
      z.tabSize + 1
    )(s);
  }
  function o(s) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === d.linePrefix && a[2].sliceSerialize(a[1], !0).length >= z.tabSize ? t(s) : Y(s) ? i(s) : n(s);
  }
}
const Fc = {
  name: "codeText",
  previous: zo,
  resolve: Hc,
  tokenize: zc
};
function Hc(e) {
  let t = e.length - 4, n = 3, r, i;
  if ((e[n][1].type === d.lineEnding || e[n][1].type === "space") && (e[t][1].type === d.lineEnding || e[t][1].type === "space")) {
    for (r = n; ++r < t; )
      if (e[r][1].type === d.codeTextData) {
        e[n][1].type = d.codeTextPadding, e[t][1].type = d.codeTextPadding, n += 2, t -= 2;
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    i === void 0 ? r !== t && e[r][1].type !== d.lineEnding && (i = r) : (r === t || e[r][1].type === d.lineEnding) && (e[i][1].type = d.codeTextData, r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function zo(e) {
  return e !== p.graveAccent || this.events[this.events.length - 1][1].type === d.characterEscape;
}
function zc(e, t, n) {
  const r = this;
  let i = 0, o, s;
  return a;
  function a(g) {
    return C(g === p.graveAccent, "expected `` ` ``"), C(zo.call(r, r.previous), "expected correct previous"), e.enter(d.codeText), e.enter(d.codeTextSequence), u(g);
  }
  function u(g) {
    return g === p.graveAccent ? (e.consume(g), i++, u) : (e.exit(d.codeTextSequence), h(g));
  }
  function h(g) {
    return g === p.eof ? n(g) : g === p.space ? (e.enter("space"), e.consume(g), e.exit("space"), h) : g === p.graveAccent ? (s = e.enter(d.codeTextSequence), o = 0, m(g)) : Y(g) ? (e.enter(d.lineEnding), e.consume(g), e.exit(d.lineEnding), h) : (e.enter(d.codeTextData), c(g));
  }
  function c(g) {
    return g === p.eof || g === p.space || g === p.graveAccent || Y(g) ? (e.exit(d.codeTextData), h(g)) : (e.consume(g), c);
  }
  function m(g) {
    return g === p.graveAccent ? (e.consume(g), o++, m) : o === i ? (e.exit(d.codeTextSequence), e.exit(d.codeText), t(g)) : (s.type = d.codeTextData, c(g));
  }
}
class Bc {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(t) {
    this.left = t ? [...t] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(t) {
    if (t < 0 || t >= this.left.length + this.right.length)
      throw new RangeError(
        "Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`"
      );
    return t < this.left.length ? this.left[t] : this.right[this.right.length - t + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(t, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(t, r) : t > this.left.length ? this.right.slice(
      this.right.length - r + this.left.length,
      this.right.length - t + this.left.length
    ).reverse() : this.left.slice(t).concat(
      this.right.slice(this.right.length - r + this.left.length).reverse()
    );
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(t, n, r) {
    const i = n || 0;
    this.setCursor(Math.trunc(t));
    const o = this.right.splice(
      this.right.length - i,
      Number.POSITIVE_INFINITY
    );
    return r && Nn(this.left, r), o.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(t) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(t) {
    this.setCursor(Number.POSITIVE_INFINITY), Nn(this.left, t);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(t) {
    this.setCursor(0), this.right.push(t);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(t) {
    this.setCursor(0), Nn(this.right, t.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(t) {
    if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0))
      if (t < this.left.length) {
        const n = this.left.splice(t, Number.POSITIVE_INFINITY);
        Nn(this.right, n.reverse());
      } else {
        const n = this.right.splice(
          this.left.length + this.right.length - t,
          Number.POSITIVE_INFINITY
        );
        Nn(this.left, n.reverse());
      }
  }
}
function Nn(e, t) {
  let n = 0;
  if (t.length < z.v8MaxSafeChunkSize)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(
        ...t.slice(n, n + z.v8MaxSafeChunkSize)
      ), n += z.v8MaxSafeChunkSize;
}
function Bo(e) {
  const t = {};
  let n = -1, r, i, o, s, a, u, h;
  const c = new Bc(e);
  for (; ++n < c.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = c.get(n), n && r[1].type === d.chunkFlow && c.get(n - 1)[1].type === d.listItemPrefix && (C(r[1]._tokenizer, "expected `_tokenizer` on subtokens"), u = r[1]._tokenizer.events, o = 0, o < u.length && u[o][1].type === d.lineEndingBlank && (o += 2), o < u.length && u[o][1].type === d.content))
      for (; ++o < u.length && u[o][1].type !== d.content; )
        u[o][1].type === d.chunkText && (u[o][1]._isInFirstContentOfListItem = !0, o++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, Gc(c, n)), n = t[n], h = !0);
    else if (r[1]._container) {
      for (o = n, i = void 0; o--; )
        if (s = c.get(o), s[1].type === d.lineEnding || s[1].type === d.lineEndingBlank)
          s[0] === "enter" && (i && (c.get(i)[1].type = d.lineEndingBlank), s[1].type = d.lineEnding, i = o);
        else if (!(s[1].type === d.linePrefix || s[1].type === d.listItemIndent)) break;
      i && (r[1].end = { ...c.get(i)[1].start }, a = c.slice(i, n), a.unshift(r), c.splice(i, n - i + 1, a));
    }
  }
  return Lt(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !h;
}
function Gc(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const o = [];
  C(n.contentType, "expected `contentType` on subtokens");
  let s = n._tokenizer;
  s || (s = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  const a = s.events, u = [], h = {};
  let c, m, g = -1, f = n, E = 0, w = 0;
  const I = [w];
  for (; f; ) {
    for (; e.get(++i)[1] !== f; )
      ;
    C(
      !m || f.previous === m,
      "expected previous to match"
    ), C(!m || m.next === f, "expected next to match"), o.push(i), f._tokenizer || (c = r.sliceStream(f), f.next || c.push(p.eof), m && s.defineSkip(f.start), f._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0), s.write(c), f._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)), m = f, f = f.next;
  }
  for (f = n; ++g < a.length; )
    // Find a void token that includes a break.
    a[g][0] === "exit" && a[g - 1][0] === "enter" && a[g][1].type === a[g - 1][1].type && a[g][1].start.line !== a[g][1].end.line && (C(f, "expected a current token"), w = g + 1, I.push(w), f._tokenizer = void 0, f.previous = void 0, f = f.next);
  for (s.events = [], f ? (f._tokenizer = void 0, f.previous = void 0, C(!f.next, "expected no next token")) : I.pop(), g = I.length; g--; ) {
    const y = a.slice(I[g], I[g + 1]), D = o.pop();
    C(D !== void 0, "expected a start position when splicing"), u.push([D, D + y.length - 1]), e.splice(D, 2, y);
  }
  for (u.reverse(), g = -1; ++g < u.length; )
    h[E + u[g][0]] = E + u[g][1], E += u[g][1] - u[g][0] - 1;
  return h;
}
const $c = { resolve: Zc, tokenize: Yc }, qc = { partial: !0, tokenize: Kc };
function Zc(e) {
  return Bo(e), e;
}
function Yc(e, t) {
  let n;
  return r;
  function r(a) {
    return C(
      a !== p.eof && !Y(a),
      "expected no eof or eol"
    ), e.enter(d.content), n = e.enter(d.chunkContent, {
      contentType: z.contentTypeContent
    }), i(a);
  }
  function i(a) {
    return a === p.eof ? o(a) : Y(a) ? e.check(
      qc,
      s,
      o
    )(a) : (e.consume(a), i);
  }
  function o(a) {
    return e.exit(d.chunkContent), e.exit(d.content), t(a);
  }
  function s(a) {
    return C(Y(a), "expected eol"), e.consume(a), e.exit(d.chunkContent), C(n, "expected previous token"), n.next = e.enter(d.chunkContent, {
      contentType: z.contentTypeContent,
      previous: n
    }), n = n.next, i;
  }
}
function Kc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return C(Y(s), "expected a line ending"), e.exit(d.chunkContent), e.enter(d.lineEnding), e.consume(s), e.exit(d.lineEnding), De(e, o, d.linePrefix);
  }
  function o(s) {
    if (s === p.eof || Y(s))
      return n(s);
    C(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    );
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === d.linePrefix && a[2].sliceSerialize(a[1], !0).length >= z.tabSize ? t(s) : e.interrupt(r.parser.constructs.flow, n, t)(s);
  }
}
function Go(e, t, n, r, i, o, s, a, u) {
  const h = u || Number.POSITIVE_INFINITY;
  let c = 0;
  return m;
  function m(y) {
    return y === p.lessThan ? (e.enter(r), e.enter(i), e.enter(o), e.consume(y), e.exit(o), g) : y === p.eof || y === p.space || y === p.rightParenthesis || Ir(y) ? n(y) : (e.enter(r), e.enter(s), e.enter(a), e.enter(d.chunkString, { contentType: z.contentTypeString }), w(y));
  }
  function g(y) {
    return y === p.greaterThan ? (e.enter(o), e.consume(y), e.exit(o), e.exit(i), e.exit(r), t) : (e.enter(a), e.enter(d.chunkString, { contentType: z.contentTypeString }), f(y));
  }
  function f(y) {
    return y === p.greaterThan ? (e.exit(d.chunkString), e.exit(a), g(y)) : y === p.eof || y === p.lessThan || Y(y) ? n(y) : (e.consume(y), y === p.backslash ? E : f);
  }
  function E(y) {
    return y === p.lessThan || y === p.greaterThan || y === p.backslash ? (e.consume(y), f) : f(y);
  }
  function w(y) {
    return !c && (y === p.eof || y === p.rightParenthesis || ht(y)) ? (e.exit(d.chunkString), e.exit(a), e.exit(s), e.exit(r), t(y)) : c < h && y === p.leftParenthesis ? (e.consume(y), c++, w) : y === p.rightParenthesis ? (e.consume(y), c--, w) : y === p.eof || y === p.space || y === p.leftParenthesis || Ir(y) ? n(y) : (e.consume(y), y === p.backslash ? I : w);
  }
  function I(y) {
    return y === p.leftParenthesis || y === p.rightParenthesis || y === p.backslash ? (e.consume(y), w) : w(y);
  }
}
function $o(e, t, n, r, i, o) {
  const s = this;
  let a = 0, u;
  return h;
  function h(f) {
    return C(f === p.leftSquareBracket, "expected `[`"), e.enter(r), e.enter(i), e.consume(f), e.exit(i), e.enter(o), c;
  }
  function c(f) {
    return a > z.linkReferenceSizeMax || f === p.eof || f === p.leftSquareBracket || f === p.rightSquareBracket && !u || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    f === p.caret && !a && "_hiddenFootnoteSupport" in s.parser.constructs ? n(f) : f === p.rightSquareBracket ? (e.exit(o), e.enter(i), e.consume(f), e.exit(i), e.exit(r), t) : Y(f) ? (e.enter(d.lineEnding), e.consume(f), e.exit(d.lineEnding), c) : (e.enter(d.chunkString, { contentType: z.contentTypeString }), m(f));
  }
  function m(f) {
    return f === p.eof || f === p.leftSquareBracket || f === p.rightSquareBracket || Y(f) || a++ > z.linkReferenceSizeMax ? (e.exit(d.chunkString), c(f)) : (e.consume(f), u || (u = !Ce(f)), f === p.backslash ? g : m);
  }
  function g(f) {
    return f === p.leftSquareBracket || f === p.backslash || f === p.rightSquareBracket ? (e.consume(f), a++, m) : m(f);
  }
}
function qo(e, t, n, r, i, o) {
  let s;
  return a;
  function a(g) {
    return g === p.quotationMark || g === p.apostrophe || g === p.leftParenthesis ? (e.enter(r), e.enter(i), e.consume(g), e.exit(i), s = g === p.leftParenthesis ? p.rightParenthesis : g, u) : n(g);
  }
  function u(g) {
    return g === s ? (e.enter(i), e.consume(g), e.exit(i), e.exit(r), t) : (e.enter(o), h(g));
  }
  function h(g) {
    return g === s ? (e.exit(o), u(s)) : g === p.eof ? n(g) : Y(g) ? (e.enter(d.lineEnding), e.consume(g), e.exit(d.lineEnding), De(e, h, d.linePrefix)) : (e.enter(d.chunkString, { contentType: z.contentTypeString }), c(g));
  }
  function c(g) {
    return g === s || g === p.eof || Y(g) ? (e.exit(d.chunkString), h(g)) : (e.consume(g), g === p.backslash ? m : c);
  }
  function m(g) {
    return g === s || g === p.backslash ? (e.consume(g), c) : c(g);
  }
}
function En(e, t) {
  let n;
  return r;
  function r(i) {
    return Y(i) ? (e.enter(d.lineEnding), e.consume(i), e.exit(d.lineEnding), n = !0, r) : Ce(i) ? De(
      e,
      r,
      n ? d.linePrefix : d.lineSuffix
    )(i) : t(i);
  }
}
const Xc = { name: "definition", tokenize: Qc }, Jc = { partial: !0, tokenize: eu };
function Qc(e, t, n) {
  const r = this;
  let i;
  return o;
  function o(f) {
    return e.enter(d.definition), s(f);
  }
  function s(f) {
    return C(f === p.leftSquareBracket, "expected `[`"), $o.call(
      r,
      e,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      d.definitionLabel,
      d.definitionLabelMarker,
      d.definitionLabelString
    )(f);
  }
  function a(f) {
    return i = dn(
      r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
    ), f === p.colon ? (e.enter(d.definitionMarker), e.consume(f), e.exit(d.definitionMarker), u) : n(f);
  }
  function u(f) {
    return ht(f) ? En(e, h)(f) : h(f);
  }
  function h(f) {
    return Go(
      e,
      c,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      d.definitionDestination,
      d.definitionDestinationLiteral,
      d.definitionDestinationLiteralMarker,
      d.definitionDestinationRaw,
      d.definitionDestinationString
    )(f);
  }
  function c(f) {
    return e.attempt(Jc, m, m)(f);
  }
  function m(f) {
    return Ce(f) ? De(e, g, d.whitespace)(f) : g(f);
  }
  function g(f) {
    return f === p.eof || Y(f) ? (e.exit(d.definition), r.parser.defined.push(i), t(f)) : n(f);
  }
}
function eu(e, t, n) {
  return r;
  function r(a) {
    return ht(a) ? En(e, i)(a) : n(a);
  }
  function i(a) {
    return qo(
      e,
      o,
      n,
      d.definitionTitle,
      d.definitionTitleMarker,
      d.definitionTitleString
    )(a);
  }
  function o(a) {
    return Ce(a) ? De(
      e,
      s,
      d.whitespace
    )(a) : s(a);
  }
  function s(a) {
    return a === p.eof || Y(a) ? t(a) : n(a);
  }
}
const tu = {
  name: "hardBreakEscape",
  tokenize: nu
};
function nu(e, t, n) {
  return r;
  function r(o) {
    return C(o === p.backslash, "expected `\\`"), e.enter(d.hardBreakEscape), e.consume(o), i;
  }
  function i(o) {
    return Y(o) ? (e.exit(d.hardBreakEscape), t(o)) : n(o);
  }
}
const ru = {
  name: "headingAtx",
  resolve: iu,
  tokenize: ou
};
function iu(e, t) {
  let n = e.length - 2, r = 3, i, o;
  return e[r][1].type === d.whitespace && (r += 2), n - 2 > r && e[n][1].type === d.whitespace && (n -= 2), e[n][1].type === d.atxHeadingSequence && (r === n - 1 || n - 4 > r && e[n - 2][1].type === d.whitespace) && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: d.atxHeadingText,
    start: e[r][1].start,
    end: e[n][1].end
  }, o = {
    type: d.chunkText,
    start: e[r][1].start,
    end: e[n][1].end,
    contentType: z.contentTypeText
  }, Lt(e, r, n - r + 1, [
    ["enter", i, t],
    ["enter", o, t],
    ["exit", o, t],
    ["exit", i, t]
  ])), e;
}
function ou(e, t, n) {
  let r = 0;
  return i;
  function i(c) {
    return e.enter(d.atxHeading), o(c);
  }
  function o(c) {
    return C(c === p.numberSign, "expected `#`"), e.enter(d.atxHeadingSequence), s(c);
  }
  function s(c) {
    return c === p.numberSign && r++ < z.atxHeadingOpeningFenceSizeMax ? (e.consume(c), s) : c === p.eof || ht(c) ? (e.exit(d.atxHeadingSequence), a(c)) : n(c);
  }
  function a(c) {
    return c === p.numberSign ? (e.enter(d.atxHeadingSequence), u(c)) : c === p.eof || Y(c) ? (e.exit(d.atxHeading), t(c)) : Ce(c) ? De(e, a, d.whitespace)(c) : (e.enter(d.atxHeadingText), h(c));
  }
  function u(c) {
    return c === p.numberSign ? (e.consume(c), u) : (e.exit(d.atxHeadingSequence), a(c));
  }
  function h(c) {
    return c === p.eof || c === p.numberSign || ht(c) ? (e.exit(d.atxHeadingText), a(c)) : (e.consume(c), h);
  }
}
const su = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], Li = ["pre", "script", "style", "textarea"], au = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: uu,
  tokenize: du
}, lu = { partial: !0, tokenize: hu }, cu = {
  partial: !0,
  tokenize: pu
};
function uu(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === d.htmlFlow); )
    ;
  return t > 1 && e[t - 2][1].type === d.linePrefix && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function du(e, t, n) {
  const r = this;
  let i, o, s, a, u;
  return h;
  function h(k) {
    return c(k);
  }
  function c(k) {
    return C(k === p.lessThan, "expected `<`"), e.enter(d.htmlFlow), e.enter(d.htmlFlowData), e.consume(k), m;
  }
  function m(k) {
    return k === p.exclamationMark ? (e.consume(k), g) : k === p.slash ? (e.consume(k), o = !0, w) : k === p.questionMark ? (e.consume(k), i = z.htmlInstruction, r.interrupt ? t : x) : At(k) ? (C(k !== null), e.consume(k), s = String.fromCharCode(k), I) : n(k);
  }
  function g(k) {
    return k === p.dash ? (e.consume(k), i = z.htmlComment, f) : k === p.leftSquareBracket ? (e.consume(k), i = z.htmlCdata, a = 0, E) : At(k) ? (e.consume(k), i = z.htmlDeclaration, r.interrupt ? t : x) : n(k);
  }
  function f(k) {
    return k === p.dash ? (e.consume(k), r.interrupt ? t : x) : n(k);
  }
  function E(k) {
    const de = z.cdataOpeningString;
    return k === de.charCodeAt(a++) ? (e.consume(k), a === de.length ? r.interrupt ? t : G : E) : n(k);
  }
  function w(k) {
    return At(k) ? (C(k !== null), e.consume(k), s = String.fromCharCode(k), I) : n(k);
  }
  function I(k) {
    if (k === p.eof || k === p.slash || k === p.greaterThan || ht(k)) {
      const de = k === p.slash, re = s.toLowerCase();
      return !de && !o && Li.includes(re) ? (i = z.htmlRaw, r.interrupt ? t(k) : G(k)) : su.includes(s.toLowerCase()) ? (i = z.htmlBasic, de ? (e.consume(k), y) : r.interrupt ? t(k) : G(k)) : (i = z.htmlComplete, r.interrupt && !r.parser.lazy[r.now().line] ? n(k) : o ? D(k) : U(k));
    }
    return k === p.dash || bt(k) ? (e.consume(k), s += String.fromCharCode(k), I) : n(k);
  }
  function y(k) {
    return k === p.greaterThan ? (e.consume(k), r.interrupt ? t : G) : n(k);
  }
  function D(k) {
    return Ce(k) ? (e.consume(k), D) : ae(k);
  }
  function U(k) {
    return k === p.slash ? (e.consume(k), ae) : k === p.colon || k === p.underscore || At(k) ? (e.consume(k), P) : Ce(k) ? (e.consume(k), U) : ae(k);
  }
  function P(k) {
    return k === p.dash || k === p.dot || k === p.colon || k === p.underscore || bt(k) ? (e.consume(k), P) : M(k);
  }
  function M(k) {
    return k === p.equalsTo ? (e.consume(k), T) : Ce(k) ? (e.consume(k), M) : U(k);
  }
  function T(k) {
    return k === p.eof || k === p.lessThan || k === p.equalsTo || k === p.greaterThan || k === p.graveAccent ? n(k) : k === p.quotationMark || k === p.apostrophe ? (e.consume(k), u = k, K) : Ce(k) ? (e.consume(k), T) : q(k);
  }
  function K(k) {
    return k === u ? (e.consume(k), u = null, ne) : k === p.eof || Y(k) ? n(k) : (e.consume(k), K);
  }
  function q(k) {
    return k === p.eof || k === p.quotationMark || k === p.apostrophe || k === p.slash || k === p.lessThan || k === p.equalsTo || k === p.greaterThan || k === p.graveAccent || ht(k) ? M(k) : (e.consume(k), q);
  }
  function ne(k) {
    return k === p.slash || k === p.greaterThan || Ce(k) ? U(k) : n(k);
  }
  function ae(k) {
    return k === p.greaterThan ? (e.consume(k), X) : n(k);
  }
  function X(k) {
    return k === p.eof || Y(k) ? G(k) : Ce(k) ? (e.consume(k), X) : n(k);
  }
  function G(k) {
    return k === p.dash && i === z.htmlComment ? (e.consume(k), ie) : k === p.lessThan && i === z.htmlRaw ? (e.consume(k), F) : k === p.greaterThan && i === z.htmlDeclaration ? (e.consume(k), le) : k === p.questionMark && i === z.htmlInstruction ? (e.consume(k), x) : k === p.rightSquareBracket && i === z.htmlCdata ? (e.consume(k), Oe) : Y(k) && (i === z.htmlBasic || i === z.htmlComplete) ? (e.exit(d.htmlFlowData), e.check(
      lu,
      ee,
      _
    )(k)) : k === p.eof || Y(k) ? (e.exit(d.htmlFlowData), _(k)) : (e.consume(k), G);
  }
  function _(k) {
    return e.check(
      cu,
      L,
      ee
    )(k);
  }
  function L(k) {
    return C(Y(k)), e.enter(d.lineEnding), e.consume(k), e.exit(d.lineEnding), B;
  }
  function B(k) {
    return k === p.eof || Y(k) ? _(k) : (e.enter(d.htmlFlowData), G(k));
  }
  function ie(k) {
    return k === p.dash ? (e.consume(k), x) : G(k);
  }
  function F(k) {
    return k === p.slash ? (e.consume(k), s = "", ve) : G(k);
  }
  function ve(k) {
    if (k === p.greaterThan) {
      const de = s.toLowerCase();
      return Li.includes(de) ? (e.consume(k), le) : G(k);
    }
    return At(k) && s.length < z.htmlRawSizeMax ? (C(k !== null), e.consume(k), s += String.fromCharCode(k), ve) : G(k);
  }
  function Oe(k) {
    return k === p.rightSquareBracket ? (e.consume(k), x) : G(k);
  }
  function x(k) {
    return k === p.greaterThan ? (e.consume(k), le) : k === p.dash && i === z.htmlComment ? (e.consume(k), x) : G(k);
  }
  function le(k) {
    return k === p.eof || Y(k) ? (e.exit(d.htmlFlowData), ee(k)) : (e.consume(k), le);
  }
  function ee(k) {
    return e.exit(d.htmlFlow), t(k);
  }
}
function pu(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return Y(s) ? (e.enter(d.lineEnding), e.consume(s), e.exit(d.lineEnding), o) : n(s);
  }
  function o(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
function hu(e, t, n) {
  return r;
  function r(i) {
    return C(Y(i), "expected a line ending"), e.enter(d.lineEnding), e.consume(i), e.exit(d.lineEnding), e.attempt(Kn, t, n);
  }
}
const mu = { name: "htmlText", tokenize: fu };
function fu(e, t, n) {
  const r = this;
  let i, o, s;
  return a;
  function a(x) {
    return C(x === p.lessThan, "expected `<`"), e.enter(d.htmlText), e.enter(d.htmlTextData), e.consume(x), u;
  }
  function u(x) {
    return x === p.exclamationMark ? (e.consume(x), h) : x === p.slash ? (e.consume(x), M) : x === p.questionMark ? (e.consume(x), U) : At(x) ? (e.consume(x), q) : n(x);
  }
  function h(x) {
    return x === p.dash ? (e.consume(x), c) : x === p.leftSquareBracket ? (e.consume(x), o = 0, E) : At(x) ? (e.consume(x), D) : n(x);
  }
  function c(x) {
    return x === p.dash ? (e.consume(x), f) : n(x);
  }
  function m(x) {
    return x === p.eof ? n(x) : x === p.dash ? (e.consume(x), g) : Y(x) ? (s = m, F(x)) : (e.consume(x), m);
  }
  function g(x) {
    return x === p.dash ? (e.consume(x), f) : m(x);
  }
  function f(x) {
    return x === p.greaterThan ? ie(x) : x === p.dash ? g(x) : m(x);
  }
  function E(x) {
    const le = z.cdataOpeningString;
    return x === le.charCodeAt(o++) ? (e.consume(x), o === le.length ? w : E) : n(x);
  }
  function w(x) {
    return x === p.eof ? n(x) : x === p.rightSquareBracket ? (e.consume(x), I) : Y(x) ? (s = w, F(x)) : (e.consume(x), w);
  }
  function I(x) {
    return x === p.rightSquareBracket ? (e.consume(x), y) : w(x);
  }
  function y(x) {
    return x === p.greaterThan ? ie(x) : x === p.rightSquareBracket ? (e.consume(x), y) : w(x);
  }
  function D(x) {
    return x === p.eof || x === p.greaterThan ? ie(x) : Y(x) ? (s = D, F(x)) : (e.consume(x), D);
  }
  function U(x) {
    return x === p.eof ? n(x) : x === p.questionMark ? (e.consume(x), P) : Y(x) ? (s = U, F(x)) : (e.consume(x), U);
  }
  function P(x) {
    return x === p.greaterThan ? ie(x) : U(x);
  }
  function M(x) {
    return At(x) ? (e.consume(x), T) : n(x);
  }
  function T(x) {
    return x === p.dash || bt(x) ? (e.consume(x), T) : K(x);
  }
  function K(x) {
    return Y(x) ? (s = K, F(x)) : Ce(x) ? (e.consume(x), K) : ie(x);
  }
  function q(x) {
    return x === p.dash || bt(x) ? (e.consume(x), q) : x === p.slash || x === p.greaterThan || ht(x) ? ne(x) : n(x);
  }
  function ne(x) {
    return x === p.slash ? (e.consume(x), ie) : x === p.colon || x === p.underscore || At(x) ? (e.consume(x), ae) : Y(x) ? (s = ne, F(x)) : Ce(x) ? (e.consume(x), ne) : ie(x);
  }
  function ae(x) {
    return x === p.dash || x === p.dot || x === p.colon || x === p.underscore || bt(x) ? (e.consume(x), ae) : X(x);
  }
  function X(x) {
    return x === p.equalsTo ? (e.consume(x), G) : Y(x) ? (s = X, F(x)) : Ce(x) ? (e.consume(x), X) : ne(x);
  }
  function G(x) {
    return x === p.eof || x === p.lessThan || x === p.equalsTo || x === p.greaterThan || x === p.graveAccent ? n(x) : x === p.quotationMark || x === p.apostrophe ? (e.consume(x), i = x, _) : Y(x) ? (s = G, F(x)) : Ce(x) ? (e.consume(x), G) : (e.consume(x), L);
  }
  function _(x) {
    return x === i ? (e.consume(x), i = void 0, B) : x === p.eof ? n(x) : Y(x) ? (s = _, F(x)) : (e.consume(x), _);
  }
  function L(x) {
    return x === p.eof || x === p.quotationMark || x === p.apostrophe || x === p.lessThan || x === p.equalsTo || x === p.graveAccent ? n(x) : x === p.slash || x === p.greaterThan || ht(x) ? ne(x) : (e.consume(x), L);
  }
  function B(x) {
    return x === p.slash || x === p.greaterThan || ht(x) ? ne(x) : n(x);
  }
  function ie(x) {
    return x === p.greaterThan ? (e.consume(x), e.exit(d.htmlTextData), e.exit(d.htmlText), t) : n(x);
  }
  function F(x) {
    return C(s, "expected return state"), C(Y(x), "expected eol"), e.exit(d.htmlTextData), e.enter(d.lineEnding), e.consume(x), e.exit(d.lineEnding), ve;
  }
  function ve(x) {
    return C(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Ce(x) ? De(
      e,
      Oe,
      d.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : z.tabSize
    )(x) : Oe(x);
  }
  function Oe(x) {
    return e.enter(d.htmlTextData), s(x);
  }
}
const Yr = {
  name: "labelEnd",
  resolveAll: xu,
  resolveTo: Nu,
  tokenize: Cu
}, gu = { tokenize: wu }, ku = { tokenize: Eu }, bu = { tokenize: yu };
function xu(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === d.labelImage || r.type === d.labelLink || r.type === d.labelEnd) {
      const i = r.type === d.labelImage ? 4 : 2;
      r.type = d.data, t += i;
    }
  }
  return e.length !== n.length && Lt(e, 0, e.length, n), e;
}
function Nu(e, t) {
  let n = e.length, r = 0, i, o, s, a;
  for (; n--; )
    if (i = e[n][1], o) {
      if (i.type === d.link || i.type === d.labelLink && i._inactive)
        break;
      e[n][0] === "enter" && i.type === d.labelLink && (i._inactive = !0);
    } else if (s) {
      if (e[n][0] === "enter" && (i.type === d.labelImage || i.type === d.labelLink) && !i._balanced && (o = n, i.type !== d.labelLink)) {
        r = 2;
        break;
      }
    } else i.type === d.labelEnd && (s = n);
  C(o !== void 0, "`open` is supposed to be found"), C(s !== void 0, "`close` is supposed to be found");
  const u = {
    type: e[o][1].type === d.labelLink ? d.link : d.image,
    start: { ...e[o][1].start },
    end: { ...e[e.length - 1][1].end }
  }, h = {
    type: d.label,
    start: { ...e[o][1].start },
    end: { ...e[s][1].end }
  }, c = {
    type: d.labelText,
    start: { ...e[o + r + 2][1].end },
    end: { ...e[s - 2][1].start }
  };
  return a = [
    ["enter", u, t],
    ["enter", h, t]
  ], a = wt(a, e.slice(o + 1, o + r + 3)), a = wt(a, [["enter", c, t]]), C(
    t.parser.constructs.insideSpan.null,
    "expected `insideSpan.null` to be populated"
  ), a = wt(
    a,
    Zr(
      t.parser.constructs.insideSpan.null,
      e.slice(o + r + 4, s - 3),
      t
    )
  ), a = wt(a, [
    ["exit", c, t],
    e[s - 2],
    e[s - 1],
    ["exit", h, t]
  ]), a = wt(a, e.slice(s + 1)), a = wt(a, [["exit", u, t]]), Lt(e, o, e.length, a), e;
}
function Cu(e, t, n) {
  const r = this;
  let i = r.events.length, o, s;
  for (; i--; )
    if ((r.events[i][1].type === d.labelImage || r.events[i][1].type === d.labelLink) && !r.events[i][1]._balanced) {
      o = r.events[i][1];
      break;
    }
  return a;
  function a(g) {
    return C(g === p.rightSquareBracket, "expected `]`"), o ? o._inactive ? m(g) : (s = r.parser.defined.includes(
      dn(
        r.sliceSerialize({ start: o.end, end: r.now() })
      )
    ), e.enter(d.labelEnd), e.enter(d.labelMarker), e.consume(g), e.exit(d.labelMarker), e.exit(d.labelEnd), u) : n(g);
  }
  function u(g) {
    return g === p.leftParenthesis ? e.attempt(
      gu,
      c,
      s ? c : m
    )(g) : g === p.leftSquareBracket ? e.attempt(
      ku,
      c,
      s ? h : m
    )(g) : s ? c(g) : m(g);
  }
  function h(g) {
    return e.attempt(
      bu,
      c,
      m
    )(g);
  }
  function c(g) {
    return t(g);
  }
  function m(g) {
    return o._balanced = !0, n(g);
  }
}
function wu(e, t, n) {
  return r;
  function r(m) {
    return C(m === p.leftParenthesis, "expected left paren"), e.enter(d.resource), e.enter(d.resourceMarker), e.consume(m), e.exit(d.resourceMarker), i;
  }
  function i(m) {
    return ht(m) ? En(e, o)(m) : o(m);
  }
  function o(m) {
    return m === p.rightParenthesis ? c(m) : Go(
      e,
      s,
      a,
      d.resourceDestination,
      d.resourceDestinationLiteral,
      d.resourceDestinationLiteralMarker,
      d.resourceDestinationRaw,
      d.resourceDestinationString,
      z.linkResourceDestinationBalanceMax
    )(m);
  }
  function s(m) {
    return ht(m) ? En(e, u)(m) : c(m);
  }
  function a(m) {
    return n(m);
  }
  function u(m) {
    return m === p.quotationMark || m === p.apostrophe || m === p.leftParenthesis ? qo(
      e,
      h,
      n,
      d.resourceTitle,
      d.resourceTitleMarker,
      d.resourceTitleString
    )(m) : c(m);
  }
  function h(m) {
    return ht(m) ? En(e, c)(m) : c(m);
  }
  function c(m) {
    return m === p.rightParenthesis ? (e.enter(d.resourceMarker), e.consume(m), e.exit(d.resourceMarker), e.exit(d.resource), t) : n(m);
  }
}
function Eu(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return C(a === p.leftSquareBracket, "expected left bracket"), $o.call(
      r,
      e,
      o,
      s,
      d.reference,
      d.referenceMarker,
      d.referenceString
    )(a);
  }
  function o(a) {
    return r.parser.defined.includes(
      dn(
        r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
      )
    ) ? t(a) : n(a);
  }
  function s(a) {
    return n(a);
  }
}
function yu(e, t, n) {
  return r;
  function r(o) {
    return C(o === p.leftSquareBracket, "expected left bracket"), e.enter(d.reference), e.enter(d.referenceMarker), e.consume(o), e.exit(d.referenceMarker), i;
  }
  function i(o) {
    return o === p.rightSquareBracket ? (e.enter(d.referenceMarker), e.consume(o), e.exit(d.referenceMarker), e.exit(d.reference), t) : n(o);
  }
}
const vu = {
  name: "labelStartImage",
  resolveAll: Yr.resolveAll,
  tokenize: Su
};
function Su(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return C(a === p.exclamationMark, "expected `!`"), e.enter(d.labelImage), e.enter(d.labelImageMarker), e.consume(a), e.exit(d.labelImageMarker), o;
  }
  function o(a) {
    return a === p.leftSquareBracket ? (e.enter(d.labelMarker), e.consume(a), e.exit(d.labelMarker), e.exit(d.labelImage), s) : n(a);
  }
  function s(a) {
    return a === p.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(a) : t(a);
  }
}
const Tu = {
  name: "labelStartLink",
  resolveAll: Yr.resolveAll,
  tokenize: _u
};
function _u(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return C(s === p.leftSquareBracket, "expected `[`"), e.enter(d.labelLink), e.enter(d.labelMarker), e.consume(s), e.exit(d.labelMarker), e.exit(d.labelLink), o;
  }
  function o(s) {
    return s === p.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : t(s);
  }
}
const ur = { name: "lineEnding", tokenize: Du };
function Du(e, t) {
  return n;
  function n(r) {
    return C(Y(r), "expected eol"), e.enter(d.lineEnding), e.consume(r), e.exit(d.lineEnding), De(e, t, d.linePrefix);
  }
}
const Fn = {
  name: "thematicBreak",
  tokenize: Ou
};
function Ou(e, t, n) {
  let r = 0, i;
  return o;
  function o(h) {
    return e.enter(d.thematicBreak), s(h);
  }
  function s(h) {
    return C(
      h === p.asterisk || h === p.dash || h === p.underscore,
      "expected `*`, `-`, or `_`"
    ), i = h, a(h);
  }
  function a(h) {
    return h === i ? (e.enter(d.thematicBreakSequence), u(h)) : r >= z.thematicBreakMarkerCountMin && (h === p.eof || Y(h)) ? (e.exit(d.thematicBreak), t(h)) : n(h);
  }
  function u(h) {
    return h === i ? (e.consume(h), r++, u) : (e.exit(d.thematicBreakSequence), Ce(h) ? De(e, a, d.whitespace)(h) : a(h));
  }
}
const pt = {
  continuation: { tokenize: Mu },
  exit: Au,
  name: "list",
  tokenize: Ru
}, Iu = {
  partial: !0,
  tokenize: Lu
}, ju = { partial: !0, tokenize: Uu };
function Ru(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let o = i && i[1].type === d.linePrefix ? i[2].sliceSerialize(i[1], !0).length : 0, s = 0;
  return a;
  function a(f) {
    C(r.containerState, "expected state");
    const E = r.containerState.type || (f === p.asterisk || f === p.plusSign || f === p.dash ? d.listUnordered : d.listOrdered);
    if (E === d.listUnordered ? !r.containerState.marker || f === r.containerState.marker : jr(f)) {
      if (r.containerState.type || (r.containerState.type = E, e.enter(E, { _container: !0 })), E === d.listUnordered)
        return e.enter(d.listItemPrefix), f === p.asterisk || f === p.dash ? e.check(Fn, n, h)(f) : h(f);
      if (!r.interrupt || f === p.digit1)
        return e.enter(d.listItemPrefix), e.enter(d.listItemValue), u(f);
    }
    return n(f);
  }
  function u(f) {
    return C(r.containerState, "expected state"), jr(f) && ++s < z.listItemValueSizeMax ? (e.consume(f), u) : (!r.interrupt || s < 2) && (r.containerState.marker ? f === r.containerState.marker : f === p.rightParenthesis || f === p.dot) ? (e.exit(d.listItemValue), h(f)) : n(f);
  }
  function h(f) {
    return C(r.containerState, "expected state"), C(f !== p.eof, "eof (`null`) is not a marker"), e.enter(d.listItemMarker), e.consume(f), e.exit(d.listItemMarker), r.containerState.marker = r.containerState.marker || f, e.check(
      Kn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : c,
      e.attempt(
        Iu,
        g,
        m
      )
    );
  }
  function c(f) {
    return C(r.containerState, "expected state"), r.containerState.initialBlankLine = !0, o++, g(f);
  }
  function m(f) {
    return Ce(f) ? (e.enter(d.listItemPrefixWhitespace), e.consume(f), e.exit(d.listItemPrefixWhitespace), g) : n(f);
  }
  function g(f) {
    return C(r.containerState, "expected state"), r.containerState.size = o + r.sliceSerialize(e.exit(d.listItemPrefix), !0).length, t(f);
  }
}
function Mu(e, t, n) {
  const r = this;
  return C(r.containerState, "expected state"), r.containerState._closeFlow = void 0, e.check(Kn, i, o);
  function i(a) {
    return C(r.containerState, "expected state"), C(typeof r.containerState.size == "number", "expected size"), r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, De(
      e,
      t,
      d.listItemIndent,
      r.containerState.size + 1
    )(a);
  }
  function o(a) {
    return C(r.containerState, "expected state"), r.containerState.furtherBlankLines || !Ce(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(ju, t, s)(a));
  }
  function s(a) {
    return C(r.containerState, "expected state"), r.containerState._closeFlow = !0, r.interrupt = void 0, C(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), De(
      e,
      e.attempt(pt, t, n),
      d.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : z.tabSize
    )(a);
  }
}
function Uu(e, t, n) {
  const r = this;
  return C(r.containerState, "expected state"), C(typeof r.containerState.size == "number", "expected size"), De(
    e,
    i,
    d.listItemIndent,
    r.containerState.size + 1
  );
  function i(o) {
    C(r.containerState, "expected state");
    const s = r.events[r.events.length - 1];
    return s && s[1].type === d.listItemIndent && s[2].sliceSerialize(s[1], !0).length === r.containerState.size ? t(o) : n(o);
  }
}
function Au(e) {
  C(this.containerState, "expected state"), C(typeof this.containerState.type == "string", "expected type"), e.exit(this.containerState.type);
}
function Lu(e, t, n) {
  const r = this;
  return C(
    r.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), De(
    e,
    i,
    d.listItemPrefixWhitespace,
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : z.tabSize + 1
  );
  function i(o) {
    const s = r.events[r.events.length - 1];
    return !Ce(o) && s && s[1].type === d.listItemPrefixWhitespace ? t(o) : n(o);
  }
}
const Pi = {
  name: "setextUnderline",
  resolveTo: Pu,
  tokenize: Wu
};
function Pu(e, t) {
  let n = e.length, r, i, o;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === d.content) {
        r = n;
        break;
      }
      e[n][1].type === d.paragraph && (i = n);
    } else
      e[n][1].type === d.content && e.splice(n, 1), !o && e[n][1].type === d.definition && (o = n);
  C(i !== void 0, "expected a `text` index to be found"), C(r !== void 0, "expected a `text` index to be found"), C(e[r][2] === t, "enter context should be same"), C(
    e[e.length - 1][2] === t,
    "enter context should be same"
  );
  const s = {
    type: d.setextHeading,
    start: { ...e[r][1].start },
    end: { ...e[e.length - 1][1].end }
  };
  return e[i][1].type = d.setextHeadingText, o ? (e.splice(i, 0, ["enter", s, t]), e.splice(o + 1, 0, ["exit", e[r][1], t]), e[r][1].end = { ...e[o][1].end }) : e[r][1] = s, e.push(["exit", s, t]), e;
}
function Wu(e, t, n) {
  const r = this;
  let i;
  return o;
  function o(h) {
    let c = r.events.length, m;
    for (C(
      h === p.dash || h === p.equalsTo,
      "expected `=` or `-`"
    ); c--; )
      if (r.events[c][1].type !== d.lineEnding && r.events[c][1].type !== d.linePrefix && r.events[c][1].type !== d.content) {
        m = r.events[c][1].type === d.paragraph;
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || m) ? (e.enter(d.setextHeadingLine), i = h, s(h)) : n(h);
  }
  function s(h) {
    return e.enter(d.setextHeadingLineSequence), a(h);
  }
  function a(h) {
    return h === i ? (e.consume(h), a) : (e.exit(d.setextHeadingLineSequence), Ce(h) ? De(e, u, d.lineSuffix)(h) : u(h));
  }
  function u(h) {
    return h === p.eof || Y(h) ? (e.exit(d.setextHeadingLine), t(h)) : n(h);
  }
}
const Vu = { tokenize: Fu };
function Fu(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    Kn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(
      this.parser.constructs.flowInitial,
      i,
      De(
        e,
        e.attempt(
          this.parser.constructs.flow,
          i,
          e.attempt($c, i)
        ),
        d.linePrefix
      )
    )
  );
  return n;
  function r(o) {
    if (C(
      o === p.eof || Y(o),
      "expected eol or eof"
    ), o === p.eof) {
      e.consume(o);
      return;
    }
    return e.enter(d.lineEndingBlank), e.consume(o), e.exit(d.lineEndingBlank), t.currentConstruct = void 0, n;
  }
  function i(o) {
    if (C(
      o === p.eof || Y(o),
      "expected eol or eof"
    ), o === p.eof) {
      e.consume(o);
      return;
    }
    return e.enter(d.lineEnding), e.consume(o), e.exit(d.lineEnding), t.currentConstruct = void 0, n;
  }
}
const Hu = { resolveAll: Yo() }, zu = Zo("string"), Bu = Zo("text");
function Zo(e) {
  return {
    resolveAll: Yo(
      e === "text" ? Gu : void 0
    ),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], o = n.attempt(i, s, a);
    return s;
    function s(c) {
      return h(c) ? o(c) : a(c);
    }
    function a(c) {
      if (c === p.eof) {
        n.consume(c);
        return;
      }
      return n.enter(d.data), n.consume(c), u;
    }
    function u(c) {
      return h(c) ? (n.exit(d.data), o(c)) : (n.consume(c), u);
    }
    function h(c) {
      if (c === p.eof)
        return !0;
      const m = i[c];
      let g = -1;
      if (m)
        for (C(Array.isArray(m), "expected `disable.null` to be populated"); ++g < m.length; ) {
          const f = m[g];
          if (!f.previous || f.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Yo(e) {
  return t;
  function t(n, r) {
    let i = -1, o;
    for (; ++i <= n.length; )
      o === void 0 ? n[i] && n[i][1].type === d.data && (o = i, i++) : (!n[i] || n[i][1].type !== d.data) && (i !== o + 2 && (n[o][1].end = n[i - 1][1].end, n.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
    return e ? e(n, r) : n;
  }
}
function Gu(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === d.lineEnding) && e[n - 1][1].type === d.data) {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let o = i.length, s = -1, a = 0, u;
      for (; o--; ) {
        const h = i[o];
        if (typeof h == "string") {
          for (s = h.length; h.charCodeAt(s - 1) === p.space; )
            a++, s--;
          if (s) break;
          s = -1;
        } else if (h === p.horizontalTab)
          u = !0, a++;
        else if (h !== p.virtualSpace) {
          o++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (a = 0), a) {
        const h = {
          type: n === e.length || u || a < z.hardBreakPrefixSizeMin ? d.lineSuffix : d.hardBreakTrailing,
          start: {
            _bufferIndex: o ? s : r.start._bufferIndex + s,
            _index: r.start._index + o,
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a
          },
          end: { ...r.end }
        };
        r.end = { ...h.start }, r.start.offset === r.end.offset ? Object.assign(r, h) : (e.splice(
          n,
          0,
          ["enter", h, t],
          ["exit", h, t]
        ), n += 2);
      }
      n++;
    }
  return e;
}
const $u = {
  [p.asterisk]: pt,
  [p.plusSign]: pt,
  [p.dash]: pt,
  [p.digit0]: pt,
  [p.digit1]: pt,
  [p.digit2]: pt,
  [p.digit3]: pt,
  [p.digit4]: pt,
  [p.digit5]: pt,
  [p.digit6]: pt,
  [p.digit7]: pt,
  [p.digit8]: pt,
  [p.digit9]: pt,
  [p.greaterThan]: Vo
}, qu = {
  [p.leftSquareBracket]: Xc
}, Zu = {
  [p.horizontalTab]: cr,
  [p.virtualSpace]: cr,
  [p.space]: cr
}, Yu = {
  [p.numberSign]: ru,
  [p.asterisk]: Fn,
  [p.dash]: [Pi, Fn],
  [p.lessThan]: au,
  [p.equalsTo]: Pi,
  [p.underscore]: Fn,
  [p.graveAccent]: Ai,
  [p.tilde]: Ai
}, Ku = {
  [p.ampersand]: Ho,
  [p.backslash]: Fo
}, Xu = {
  [p.carriageReturn]: ur,
  [p.lineFeed]: ur,
  [p.carriageReturnLineFeed]: ur,
  [p.exclamationMark]: vu,
  [p.ampersand]: Ho,
  [p.asterisk]: Rr,
  [p.lessThan]: [_c, mu],
  [p.leftSquareBracket]: Tu,
  [p.backslash]: [tu, Fo],
  [p.rightSquareBracket]: Yr,
  [p.underscore]: Rr,
  [p.graveAccent]: Fc
}, Ju = { null: [Rr, Hu] }, Qu = { null: [p.asterisk, p.underscore] }, ed = { null: [] }, td = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Qu,
  contentInitial: qu,
  disable: ed,
  document: $u,
  flow: Yu,
  flowInitial: Zu,
  insideSpan: Ju,
  string: Ku,
  text: Xu
}, Symbol.toStringTag, { value: "Module" }));
var Mr = { exports: {} }, dr, Wi;
function nd() {
  if (Wi) return dr;
  Wi = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, o = r * 365.25;
  dr = function(c, m) {
    m = m || {};
    var g = typeof c;
    if (g === "string" && c.length > 0)
      return s(c);
    if (g === "number" && isFinite(c))
      return m.long ? u(c) : a(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function s(c) {
    if (c = String(c), !(c.length > 100)) {
      var m = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (m) {
        var g = parseFloat(m[1]), f = (m[2] || "ms").toLowerCase();
        switch (f) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return g * o;
          case "weeks":
          case "week":
          case "w":
            return g * i;
          case "days":
          case "day":
          case "d":
            return g * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return g * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return g * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return g * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return g;
          default:
            return;
        }
      }
    }
  }
  function a(c) {
    var m = Math.abs(c);
    return m >= r ? Math.round(c / r) + "d" : m >= n ? Math.round(c / n) + "h" : m >= t ? Math.round(c / t) + "m" : m >= e ? Math.round(c / e) + "s" : c + "ms";
  }
  function u(c) {
    var m = Math.abs(c);
    return m >= r ? h(c, m, r, "day") : m >= n ? h(c, m, n, "hour") : m >= t ? h(c, m, t, "minute") : m >= e ? h(c, m, e, "second") : c + " ms";
  }
  function h(c, m, g, f) {
    var E = m >= g * 1.5;
    return Math.round(c / g) + " " + f + (E ? "s" : "");
  }
  return dr;
}
function rd(e) {
  n.debug = n, n.default = n, n.coerce = u, n.disable = s, n.enable = i, n.enabled = a, n.humanize = nd(), n.destroy = h, Object.keys(e).forEach((c) => {
    n[c] = e[c];
  }), n.names = [], n.skips = [], n.formatters = {};
  function t(c) {
    let m = 0;
    for (let g = 0; g < c.length; g++)
      m = (m << 5) - m + c.charCodeAt(g), m |= 0;
    return n.colors[Math.abs(m) % n.colors.length];
  }
  n.selectColor = t;
  function n(c) {
    let m, g = null, f, E;
    function w(...I) {
      if (!w.enabled)
        return;
      const y = w, D = Number(/* @__PURE__ */ new Date()), U = D - (m || D);
      y.diff = U, y.prev = m, y.curr = D, m = D, I[0] = n.coerce(I[0]), typeof I[0] != "string" && I.unshift("%O");
      let P = 0;
      I[0] = I[0].replace(/%([a-zA-Z%])/g, (T, K) => {
        if (T === "%%")
          return "%";
        P++;
        const q = n.formatters[K];
        if (typeof q == "function") {
          const ne = I[P];
          T = q.call(y, ne), I.splice(P, 1), P--;
        }
        return T;
      }), n.formatArgs.call(y, I), (y.log || n.log).apply(y, I);
    }
    return w.namespace = c, w.useColors = n.useColors(), w.color = n.selectColor(c), w.extend = r, w.destroy = n.destroy, Object.defineProperty(w, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => g !== null ? g : (f !== n.namespaces && (f = n.namespaces, E = n.enabled(c)), E),
      set: (I) => {
        g = I;
      }
    }), typeof n.init == "function" && n.init(w), w;
  }
  function r(c, m) {
    const g = n(this.namespace + (typeof m > "u" ? ":" : m) + c);
    return g.log = this.log, g;
  }
  function i(c) {
    n.save(c), n.namespaces = c, n.names = [], n.skips = [];
    const m = (typeof c == "string" ? c : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
    for (const g of m)
      g[0] === "-" ? n.skips.push(g.slice(1)) : n.names.push(g);
  }
  function o(c, m) {
    let g = 0, f = 0, E = -1, w = 0;
    for (; g < c.length; )
      if (f < m.length && (m[f] === c[g] || m[f] === "*"))
        m[f] === "*" ? (E = f, w = g, f++) : (g++, f++);
      else if (E !== -1)
        f = E + 1, w++, g = w;
      else
        return !1;
    for (; f < m.length && m[f] === "*"; )
      f++;
    return f === m.length;
  }
  function s() {
    const c = [
      ...n.names,
      ...n.skips.map((m) => "-" + m)
    ].join(",");
    return n.enable(""), c;
  }
  function a(c) {
    for (const m of n.skips)
      if (o(c, m))
        return !1;
    for (const m of n.names)
      if (o(c, m))
        return !0;
    return !1;
  }
  function u(c) {
    return c instanceof Error ? c.stack || c.message : c;
  }
  function h() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return n.enable(n.load()), n;
}
var id = rd;
(function(e, t) {
  t.formatArgs = r, t.save = i, t.load = o, t.useColors = n, t.storage = s(), t.destroy = /* @__PURE__ */ (() => {
    let u = !1;
    return () => {
      u || (u = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), t.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function n() {
    if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
      return !0;
    if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
      return !1;
    let u;
    return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && (u = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(u[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function r(u) {
    if (u[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + u[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
      return;
    const h = "color: " + this.color;
    u.splice(1, 0, h, "color: inherit");
    let c = 0, m = 0;
    u[0].replace(/%[a-zA-Z%]/g, (g) => {
      g !== "%%" && (c++, g === "%c" && (m = c));
    }), u.splice(m, 0, h);
  }
  t.log = console.debug || console.log || (() => {
  });
  function i(u) {
    try {
      u ? t.storage.setItem("debug", u) : t.storage.removeItem("debug");
    } catch {
    }
  }
  function o() {
    let u;
    try {
      u = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
    } catch {
    }
    return !u && typeof process < "u" && "env" in process && (u = process.env.DEBUG), u;
  }
  function s() {
    try {
      return localStorage;
    } catch {
    }
  }
  e.exports = id(t);
  const { formatters: a } = e.exports;
  a.j = function(u) {
    try {
      return JSON.stringify(u);
    } catch (h) {
      return "[UnexpectedJSONParseError]: " + h.message;
    }
  };
})(Mr, Mr.exports);
var od = Mr.exports;
const sd = /* @__PURE__ */ Wr(od), en = sd("micromark");
function ad(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, o = [];
  let s = [], a = [], u = !0;
  const h = {
    attempt: ne(K),
    check: ne(q),
    consume: P,
    enter: M,
    exit: T,
    interrupt: ne(q, { interrupt: !0 })
  }, c = {
    code: p.eof,
    containerState: {},
    defineSkip: y,
    events: [],
    now: I,
    parser: e,
    previous: p.eof,
    sliceSerialize: E,
    sliceStream: w,
    write: f
  };
  let m = t.tokenize.call(c, h), g;
  return t.resolveAll && o.push(t), c;
  function f(_) {
    return s = wt(s, _), D(), s[s.length - 1] !== p.eof ? [] : (ae(t, 0), c.events = Zr(o, c.events, c), c.events);
  }
  function E(_, L) {
    return cd(w(_), L);
  }
  function w(_) {
    return ld(s, _);
  }
  function I() {
    const { _bufferIndex: _, _index: L, line: B, column: ie, offset: F } = r;
    return { _bufferIndex: _, _index: L, line: B, column: ie, offset: F };
  }
  function y(_) {
    i[_.line] = _.column, G(), en("position: define skip: `%j`", r);
  }
  function D() {
    let _;
    for (; r._index < s.length; ) {
      const L = s[r._index];
      if (typeof L == "string")
        for (_ = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === _ && r._bufferIndex < L.length; )
          U(L.charCodeAt(r._bufferIndex));
      else
        U(L);
    }
  }
  function U(_) {
    C(u === !0, "expected character to be consumed"), u = void 0, en("main: passing `%s` to %s", _, m && m.name), g = _, C(typeof m == "function", "expected state"), m = m(_);
  }
  function P(_) {
    C(_ === g, "expected given code to equal expected code"), en("consume: `%s`", _), C(
      u === void 0,
      "expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used"
    ), C(
      _ === null ? c.events.length === 0 || c.events[c.events.length - 1][0] === "exit" : c.events[c.events.length - 1][0] === "enter",
      "expected last token to be open"
    ), Y(_) ? (r.line++, r.column = 1, r.offset += _ === p.carriageReturnLineFeed ? 2 : 1, G(), en("position: after eol: `%j`", r)) : _ !== p.virtualSpace && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    s[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = _, u = !0;
  }
  function M(_, L) {
    const B = L || {};
    return B.type = _, B.start = I(), C(typeof _ == "string", "expected string type"), C(_.length > 0, "expected non-empty string"), en("enter: `%s`", _), c.events.push(["enter", B, c]), a.push(B), B;
  }
  function T(_) {
    C(typeof _ == "string", "expected string type"), C(_.length > 0, "expected non-empty string");
    const L = a.pop();
    return C(L, "cannot close w/o open tokens"), L.end = I(), C(_ === L.type, "expected exit token to match current token"), C(
      !(L.start._index === L.end._index && L.start._bufferIndex === L.end._bufferIndex),
      "expected non-empty token (`" + _ + "`)"
    ), en("exit: `%s`", L.type), c.events.push(["exit", L, c]), L;
  }
  function K(_, L) {
    ae(_, L.from);
  }
  function q(_, L) {
    L.restore();
  }
  function ne(_, L) {
    return B;
    function B(ie, F, ve) {
      let Oe, x, le, ee;
      return Array.isArray(ie) ? (
        /* c8 ignore next 1 */
        de(ie)
      ) : "tokenize" in ie ? (
        // Looks like a construct.
        de([
          /** @type {Construct} */
          ie
        ])
      ) : k(ie);
      function k(Q) {
        return Pe;
        function Pe(we) {
          const Ae = we !== null && Q[we], et = we !== null && Q.null, tt = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ae) ? Ae : Ae ? [Ae] : [],
            ...Array.isArray(et) ? et : et ? [et] : []
          ];
          return de(tt)(we);
        }
      }
      function de(Q) {
        return Oe = Q, x = 0, Q.length === 0 ? (C(ve, "expected `bogusState` to be given"), ve) : re(Q[x]);
      }
      function re(Q) {
        return Pe;
        function Pe(we) {
          return ee = X(), le = Q, Q.partial || (c.currentConstruct = Q), C(
            c.parser.constructs.disable.null,
            "expected `disable.null` to be populated"
          ), Q.name && c.parser.constructs.disable.null.includes(Q.name) ? Ee(we) : Q.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            L ? Object.assign(Object.create(c), L) : c,
            h,
            ue,
            Ee
          )(we);
        }
      }
      function ue(Q) {
        return C(Q === g, "expected code"), u = !0, _(le, ee), F;
      }
      function Ee(Q) {
        return C(Q === g, "expected code"), u = !0, ee.restore(), ++x < Oe.length ? re(Oe[x]) : ve;
      }
    }
  }
  function ae(_, L) {
    _.resolveAll && !o.includes(_) && o.push(_), _.resolve && Lt(
      c.events,
      L,
      c.events.length - L,
      _.resolve(c.events.slice(L), c)
    ), _.resolveTo && (c.events = _.resolveTo(c.events, c)), C(
      _.partial || c.events.length === 0 || c.events[c.events.length - 1][0] === "exit",
      "expected last token to end"
    );
  }
  function X() {
    const _ = I(), L = c.previous, B = c.currentConstruct, ie = c.events.length, F = Array.from(a);
    return { from: ie, restore: ve };
    function ve() {
      r = _, c.previous = L, c.currentConstruct = B, c.events.length = ie, a = F, G(), en("position: restore: `%j`", r);
    }
  }
  function G() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function ld(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, o = t.end._bufferIndex;
  let s;
  if (n === i)
    C(o > -1, "expected non-negative end buffer index"), C(r > -1, "expected non-negative start buffer index"), s = [e[n].slice(r, o)];
  else {
    if (s = e.slice(n, i), r > -1) {
      const a = s[0];
      typeof a == "string" ? s[0] = a.slice(r) : (C(r === 0, "expected `startBufferIndex` to be `0`"), s.shift());
    }
    o > 0 && s.push(e[i].slice(0, o));
  }
  return s;
}
function cd(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const o = e[n];
    let s;
    if (typeof o == "string")
      s = o;
    else
      switch (o) {
        case p.carriageReturn: {
          s = Mt.cr;
          break;
        }
        case p.lineFeed: {
          s = Mt.lf;
          break;
        }
        case p.carriageReturnLineFeed: {
          s = Mt.cr + Mt.lf;
          break;
        }
        case p.horizontalTab: {
          s = t ? Mt.space : Mt.ht;
          break;
        }
        case p.virtualSpace: {
          if (!t && i) continue;
          s = Mt.space;
          break;
        }
        default:
          C(typeof o == "number", "expected number"), s = String.fromCharCode(o);
      }
    i = o === p.horizontalTab, r.push(s);
  }
  return r.join("");
}
function ud(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      hc([td, ...(e || {}).extensions || []])
    ),
    content: i(Cc),
    defined: [],
    document: i(Ec),
    flow: i(Vu),
    lazy: {},
    string: i(zu),
    text: i(Bu)
  };
  return r;
  function i(o) {
    return s;
    function s(a) {
      return ad(r, o, a);
    }
  }
}
function dd(e) {
  for (; !Bo(e); )
    ;
  return e;
}
const Vi = /[\0\t\n\r]/g;
function pd() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(o, s, a) {
    const u = [];
    let h, c, m, g, f;
    for (o = t + (typeof o == "string" ? o.toString() : new TextDecoder(s || void 0).decode(o)), m = 0, t = "", n && (o.charCodeAt(0) === p.byteOrderMarker && m++, n = void 0); m < o.length; ) {
      if (Vi.lastIndex = m, h = Vi.exec(o), g = h && h.index !== void 0 ? h.index : o.length, f = o.charCodeAt(g), !h) {
        t = o.slice(m);
        break;
      }
      if (f === p.lf && m === g && r)
        u.push(p.carriageReturnLineFeed), r = void 0;
      else
        switch (r && (u.push(p.carriageReturn), r = void 0), m < g && (u.push(o.slice(m, g)), e += g - m), f) {
          case p.nul: {
            u.push(p.replacementCharacter), e++;
            break;
          }
          case p.ht: {
            for (c = Math.ceil(e / z.tabSize) * z.tabSize, u.push(p.horizontalTab); e++ < c; ) u.push(p.virtualSpace);
            break;
          }
          case p.lf: {
            u.push(p.lineFeed), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      m = g + 1;
    }
    return a && (r && u.push(p.carriageReturn), t && u.push(t), u.push(p.eof)), u;
  }
}
const hd = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function md(e) {
  return e.replace(hd, fd);
}
function fd(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === p.numberSign) {
    const i = n.charCodeAt(1), o = i === p.lowercaseX || i === p.uppercaseX;
    return Wo(
      n.slice(o ? 2 : 1),
      o ? z.numericBaseHexadecimal : z.numericBaseDecimal
    );
  }
  return qr(n) || e;
}
const Ko = {}.hasOwnProperty;
function gd(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), kd(n)(
    dd(
      ud(n).document().write(pd()(e, t, !0))
    )
  );
}
function kd(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: o(ct),
      autolinkProtocol: ne,
      autolinkEmail: ne,
      atxHeading: o(He),
      blockQuote: o(we),
      characterEscape: ne,
      characterReference: ne,
      codeFenced: o(Ae),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: o(Ae, s),
      codeText: o(et, s),
      codeTextData: ne,
      data: ne,
      codeFlowValue: ne,
      definition: o(tt),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: o(yt),
      hardBreakEscape: o(nt),
      hardBreakTrailing: o(nt),
      htmlFlow: o(xt, s),
      htmlFlowData: ne,
      htmlText: o(xt, s),
      htmlTextData: ne,
      image: o(lt),
      label: s,
      link: o(ct),
      listItem: o(Pt),
      listItemValue: g,
      listOrdered: o(vt, m),
      listUnordered: o(vt),
      paragraph: o(St),
      reference: k,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: o(He),
      strong: o(zt),
      thematicBreak: o(Ye)
    },
    exit: {
      atxHeading: u(),
      atxHeadingSequence: M,
      autolink: u(),
      autolinkEmail: Pe,
      autolinkProtocol: Q,
      blockQuote: u(),
      characterEscapeValue: ae,
      characterReferenceMarkerHexadecimal: re,
      characterReferenceMarkerNumeric: re,
      characterReferenceValue: ue,
      characterReference: Ee,
      codeFenced: u(I),
      codeFencedFence: w,
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: E,
      codeFlowValue: ae,
      codeIndented: u(y),
      codeText: u(B),
      codeTextData: ae,
      data: ae,
      definition: u(),
      definitionDestinationString: P,
      definitionLabelString: D,
      definitionTitleString: U,
      emphasis: u(),
      hardBreakEscape: u(G),
      hardBreakTrailing: u(G),
      htmlFlow: u(_),
      htmlFlowData: ae,
      htmlText: u(L),
      htmlTextData: ae,
      image: u(F),
      label: Oe,
      labelText: ve,
      lineEnding: X,
      link: u(ie),
      listItem: u(),
      listOrdered: u(),
      listUnordered: u(),
      paragraph: u(),
      referenceString: de,
      resourceDestinationString: x,
      resourceTitleString: le,
      resource: ee,
      setextHeading: u(q),
      setextHeadingLineSequence: K,
      setextHeadingText: T,
      strong: u(),
      thematicBreak: u()
    }
  };
  Xo(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(v) {
    let S = { type: "root", children: [] };
    const H = {
      stack: [S],
      tokenStack: [],
      config: t,
      enter: a,
      exit: h,
      buffer: s,
      resume: c,
      data: n
    }, Z = [];
    let pe = -1;
    for (; ++pe < v.length; )
      if (v[pe][1].type === d.listOrdered || v[pe][1].type === d.listUnordered)
        if (v[pe][0] === "enter")
          Z.push(pe);
        else {
          const Se = Z.pop();
          C(typeof Se == "number", "expected list ot be open"), pe = i(v, Se, pe);
        }
    for (pe = -1; ++pe < v.length; ) {
      const Se = t[v[pe][0]];
      Ko.call(Se, v[pe][1].type) && Se[v[pe][1].type].call(
        Object.assign(
          { sliceSerialize: v[pe][2].sliceSerialize },
          H
        ),
        v[pe][1]
      );
    }
    if (H.tokenStack.length > 0) {
      const Se = H.tokenStack[H.tokenStack.length - 1];
      (Se[1] || Fi).call(H, void 0, Se[0]);
    }
    for (S.position = {
      start: $t(
        v.length > 0 ? v[0][1].start : { line: 1, column: 1, offset: 0 }
      ),
      end: $t(
        v.length > 0 ? v[v.length - 2][1].end : { line: 1, column: 1, offset: 0 }
      )
    }, pe = -1; ++pe < t.transforms.length; )
      S = t.transforms[pe](S) || S;
    return S;
  }
  function i(v, S, H) {
    let Z = S - 1, pe = -1, Se = !1, rt, We, it, Ie;
    for (; ++Z <= H; ) {
      const Te = v[Z];
      switch (Te[1].type) {
        case d.listUnordered:
        case d.listOrdered:
        case d.blockQuote: {
          Te[0] === "enter" ? pe++ : pe--, Ie = void 0;
          break;
        }
        case d.lineEndingBlank: {
          Te[0] === "enter" && (rt && !Ie && !pe && !it && (it = Z), Ie = void 0);
          break;
        }
        case d.linePrefix:
        case d.listItemValue:
        case d.listItemMarker:
        case d.listItemPrefix:
        case d.listItemPrefixWhitespace:
          break;
        default:
          Ie = void 0;
      }
      if (!pe && Te[0] === "enter" && Te[1].type === d.listItemPrefix || pe === -1 && Te[0] === "exit" && (Te[1].type === d.listUnordered || Te[1].type === d.listOrdered)) {
        if (rt) {
          let Ke = Z;
          for (We = void 0; Ke--; ) {
            const ze = v[Ke];
            if (ze[1].type === d.lineEnding || ze[1].type === d.lineEndingBlank) {
              if (ze[0] === "exit") continue;
              We && (v[We][1].type = d.lineEndingBlank, Se = !0), ze[1].type = d.lineEnding, We = Ke;
            } else if (!(ze[1].type === d.linePrefix || ze[1].type === d.blockQuotePrefix || ze[1].type === d.blockQuotePrefixWhitespace || ze[1].type === d.blockQuoteMarker || ze[1].type === d.listItemIndent)) break;
          }
          it && (!We || it < We) && (rt._spread = !0), rt.end = Object.assign(
            {},
            We ? v[We][1].start : Te[1].end
          ), v.splice(We || Z, 0, ["exit", rt, Te[2]]), Z++, H++;
        }
        if (Te[1].type === d.listItemPrefix) {
          const Ke = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Te[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          rt = Ke, v.splice(Z, 0, ["enter", Ke, Te[2]]), Z++, H++, it = void 0, Ie = !0;
        }
      }
    }
    return v[S][1]._spread = Se, H;
  }
  function o(v, S) {
    return H;
    function H(Z) {
      a.call(this, v(Z), Z), S && S.call(this, Z);
    }
  }
  function s() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function a(v, S, H) {
    const Z = this.stack[this.stack.length - 1];
    C(Z, "expected `parent`"), C("children" in Z, "expected `parent`"), Z.children.push(v), this.stack.push(v), this.tokenStack.push([S, H || void 0]), v.position = {
      start: $t(S.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function u(v) {
    return S;
    function S(H) {
      v && v.call(this, H), h.call(this, H);
    }
  }
  function h(v, S) {
    const H = this.stack.pop();
    C(H, "expected `node`");
    const Z = this.tokenStack.pop();
    if (Z)
      Z[0].type !== v.type && (S ? S.call(this, v, Z[0]) : (Z[1] || Fi).call(this, v, Z[0]));
    else throw new Error(
      "Cannot close `" + v.type + "` (" + wn({ start: v.start, end: v.end }) + "): it’s not open"
    );
    C(H.type !== "fragment", "unexpected fragment `exit`ed"), C(H.position, "expected `position` to be defined"), H.position.end = $t(v.end);
  }
  function c() {
    return dc(this.stack.pop());
  }
  function m() {
    this.data.expectingFirstListItemValue = !0;
  }
  function g(v) {
    if (this.data.expectingFirstListItemValue) {
      const S = this.stack[this.stack.length - 2];
      C(S, "expected nodes on stack"), C(S.type === "list", "expected list on stack"), S.start = Number.parseInt(
        this.sliceSerialize(v),
        z.numericBaseDecimal
      ), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function f() {
    const v = this.resume(), S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C(S.type === "code", "expected code on stack"), S.lang = v;
  }
  function E() {
    const v = this.resume(), S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C(S.type === "code", "expected code on stack"), S.meta = v;
  }
  function w() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function I() {
    const v = this.resume(), S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C(S.type === "code", "expected code on stack"), S.value = v.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function y() {
    const v = this.resume(), S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C(S.type === "code", "expected code on stack"), S.value = v.replace(/(\r?\n|\r)$/g, "");
  }
  function D(v) {
    const S = this.resume(), H = this.stack[this.stack.length - 1];
    C(H, "expected node on stack"), C(H.type === "definition", "expected definition on stack"), H.label = S, H.identifier = dn(
      this.sliceSerialize(v)
    ).toLowerCase();
  }
  function U() {
    const v = this.resume(), S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C(S.type === "definition", "expected definition on stack"), S.title = v;
  }
  function P() {
    const v = this.resume(), S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C(S.type === "definition", "expected definition on stack"), S.url = v;
  }
  function M(v) {
    const S = this.stack[this.stack.length - 1];
    if (C(S, "expected node on stack"), C(S.type === "heading", "expected heading on stack"), !S.depth) {
      const H = this.sliceSerialize(v).length;
      C(
        H === 1 || H === 2 || H === 3 || H === 4 || H === 5 || H === 6,
        "expected `depth` between `1` and `6`"
      ), S.depth = H;
    }
  }
  function T() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function K(v) {
    const S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C(S.type === "heading", "expected heading on stack"), S.depth = this.sliceSerialize(v).codePointAt(0) === p.equalsTo ? 1 : 2;
  }
  function q() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function ne(v) {
    const S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C("children" in S, "expected parent on stack");
    const H = S.children;
    let Z = H[H.length - 1];
    (!Z || Z.type !== "text") && (Z = Tt(), Z.position = {
      start: $t(v.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, H.push(Z)), this.stack.push(Z);
  }
  function ae(v) {
    const S = this.stack.pop();
    C(S, "expected a `node` to be on the stack"), C("value" in S, "expected a `literal` to be on the stack"), C(S.position, "expected `node` to have an open position"), S.value += this.sliceSerialize(v), S.position.end = $t(v.end);
  }
  function X(v) {
    const S = this.stack[this.stack.length - 1];
    if (C(S, "expected `node`"), this.data.atHardBreak) {
      C("children" in S, "expected `parent`");
      const H = S.children[S.children.length - 1];
      C(H.position, "expected tail to have a starting position"), H.position.end = $t(v.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(S.type) && (ne.call(this, v), ae.call(this, v));
  }
  function G() {
    this.data.atHardBreak = !0;
  }
  function _() {
    const v = this.resume(), S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C(S.type === "html", "expected html on stack"), S.value = v;
  }
  function L() {
    const v = this.resume(), S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C(S.type === "html", "expected html on stack"), S.value = v;
  }
  function B() {
    const v = this.resume(), S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C(S.type === "inlineCode", "expected inline code on stack"), S.value = v;
  }
  function ie() {
    const v = this.stack[this.stack.length - 1];
    if (C(v, "expected node on stack"), C(v.type === "link", "expected link on stack"), this.data.inReference) {
      const S = this.data.referenceType || "shortcut";
      v.type += "Reference", v.referenceType = S, delete v.url, delete v.title;
    } else
      delete v.identifier, delete v.label;
    this.data.referenceType = void 0;
  }
  function F() {
    const v = this.stack[this.stack.length - 1];
    if (C(v, "expected node on stack"), C(v.type === "image", "expected image on stack"), this.data.inReference) {
      const S = this.data.referenceType || "shortcut";
      v.type += "Reference", v.referenceType = S, delete v.url, delete v.title;
    } else
      delete v.identifier, delete v.label;
    this.data.referenceType = void 0;
  }
  function ve(v) {
    const S = this.sliceSerialize(v), H = this.stack[this.stack.length - 2];
    C(H, "expected ancestor on stack"), C(
      H.type === "image" || H.type === "link",
      "expected image or link on stack"
    ), H.label = md(S), H.identifier = dn(S).toLowerCase();
  }
  function Oe() {
    const v = this.stack[this.stack.length - 1];
    C(v, "expected node on stack"), C(v.type === "fragment", "expected fragment on stack");
    const S = this.resume(), H = this.stack[this.stack.length - 1];
    if (C(H, "expected node on stack"), C(
      H.type === "image" || H.type === "link",
      "expected image or link on stack"
    ), this.data.inReference = !0, H.type === "link") {
      const Z = v.children;
      H.children = Z;
    } else
      H.alt = S;
  }
  function x() {
    const v = this.resume(), S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C(
      S.type === "image" || S.type === "link",
      "expected image or link on stack"
    ), S.url = v;
  }
  function le() {
    const v = this.resume(), S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C(
      S.type === "image" || S.type === "link",
      "expected image or link on stack"
    ), S.title = v;
  }
  function ee() {
    this.data.inReference = void 0;
  }
  function k() {
    this.data.referenceType = "collapsed";
  }
  function de(v) {
    const S = this.resume(), H = this.stack[this.stack.length - 1];
    C(H, "expected node on stack"), C(
      H.type === "image" || H.type === "link",
      "expected image reference or link reference on stack"
    ), H.label = S, H.identifier = dn(
      this.sliceSerialize(v)
    ).toLowerCase(), this.data.referenceType = "full";
  }
  function re(v) {
    C(
      v.type === "characterReferenceMarkerNumeric" || v.type === "characterReferenceMarkerHexadecimal"
    ), this.data.characterReferenceType = v.type;
  }
  function ue(v) {
    const S = this.sliceSerialize(v), H = this.data.characterReferenceType;
    let Z;
    if (H)
      Z = Wo(
        S,
        H === d.characterReferenceMarkerNumeric ? z.numericBaseDecimal : z.numericBaseHexadecimal
      ), this.data.characterReferenceType = void 0;
    else {
      const Se = qr(S);
      C(Se !== !1, "expected reference to decode"), Z = Se;
    }
    const pe = this.stack[this.stack.length - 1];
    C(pe, "expected `node`"), C("value" in pe, "expected `node.value`"), pe.value += Z;
  }
  function Ee(v) {
    const S = this.stack.pop();
    C(S, "expected `node`"), C(S.position, "expected `node.position`"), S.position.end = $t(v.end);
  }
  function Q(v) {
    ae.call(this, v);
    const S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C(S.type === "link", "expected link on stack"), S.url = this.sliceSerialize(v);
  }
  function Pe(v) {
    ae.call(this, v);
    const S = this.stack[this.stack.length - 1];
    C(S, "expected node on stack"), C(S.type === "link", "expected link on stack"), S.url = "mailto:" + this.sliceSerialize(v);
  }
  function we() {
    return { type: "blockquote", children: [] };
  }
  function Ae() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function et() {
    return { type: "inlineCode", value: "" };
  }
  function tt() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function yt() {
    return { type: "emphasis", children: [] };
  }
  function He() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function nt() {
    return { type: "break" };
  }
  function xt() {
    return { type: "html", value: "" };
  }
  function lt() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function ct() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function vt(v) {
    return {
      type: "list",
      ordered: v.type === "listOrdered",
      start: null,
      spread: v._spread,
      children: []
    };
  }
  function Pt(v) {
    return {
      type: "listItem",
      spread: v._spread,
      checked: null,
      children: []
    };
  }
  function St() {
    return { type: "paragraph", children: [] };
  }
  function zt() {
    return { type: "strong", children: [] };
  }
  function Tt() {
    return { type: "text", value: "" };
  }
  function Ye() {
    return { type: "thematicBreak" };
  }
}
function $t(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function Xo(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Xo(e, r) : bd(e, r);
  }
}
function bd(e, t) {
  let n;
  for (n in t)
    if (Ko.call(t, n))
      switch (n) {
        case "canContainEols": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "transforms": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = t[n];
          r && Object.assign(e[n], r);
          break;
        }
      }
}
function Fi(e, t) {
  throw e ? new Error(
    "Cannot close `" + e.type + "` (" + wn({ start: e.start, end: e.end }) + "): a different token (`" + t.type + "`, " + wn({ start: t.start, end: t.end }) + ") is open"
  ) : new Error(
    "Cannot close document, a token (`" + t.type + "`, " + wn({ start: t.start, end: t.end }) + ") is still open"
  );
}
function xd(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return gd(r, {
      ...t.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: t.data("micromarkExtensions") || [],
      mdastExtensions: t.data("fromMarkdownExtensions") || []
    });
  }
}
function Nd(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Cd(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function wd(e, t) {
  const n = t.value ? t.value + `
` : "", r = {};
  t.lang && (r.className = ["language-" + t.lang]);
  let i = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: n }]
  };
  return t.meta && (i.data = { meta: t.meta }), e.patch(t, i), i = e.applyData(t, i), i = { type: "element", tagName: "pre", properties: {}, children: [i] }, e.patch(t, i), i;
}
function Ed(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function yd(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function vd(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = mn(r.toLowerCase()), o = e.footnoteOrder.indexOf(r);
  let s, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), s = e.footnoteOrder.length) : s = o + 1, a += 1, e.footnoteCounts.set(r, a);
  const u = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(s) }]
  };
  e.patch(t, u);
  const h = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [u]
  };
  return e.patch(t, h), e.applyData(t, h);
}
function Sd(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Td(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function Jo(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), o = i[0];
  o && o.type === "text" ? o.value = "[" + o.value : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return s && s.type === "text" ? s.value += r : i.push({ type: "text", value: r }), i;
}
function _d(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Jo(e, t);
  const i = { src: mn(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, o), e.applyData(t, o);
}
function Dd(e, t) {
  const n = { src: mn(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function Od(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [n]
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Id(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Jo(e, t);
  const i = { href: mn(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, o), e.applyData(t, o);
}
function jd(e, t) {
  const n = { href: mn(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Rd(e, t, n) {
  const r = e.all(t), i = n ? Md(n) : Qo(t), o = {}, s = [];
  if (typeof t.checked == "boolean") {
    const c = r[0];
    let m;
    c && c.type === "element" && c.tagName === "p" ? m = c : (m = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(m)), m.children.length > 0 && m.children.unshift({ type: "text", value: " " }), m.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), o.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const c = r[a];
    (i || a !== 0 || c.type !== "element" || c.tagName !== "p") && s.push({ type: "text", value: `
` }), c.type === "element" && c.tagName === "p" && !i ? s.push(...c.children) : s.push(c);
  }
  const u = r[r.length - 1];
  u && (i || u.type !== "element" || u.tagName !== "p") && s.push({ type: "text", value: `
` });
  const h = { type: "element", tagName: "li", properties: o, children: s };
  return e.patch(t, h), e.applyData(t, h);
}
function Md(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = Qo(n[r]);
  }
  return t;
}
function Qo(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function Ud(e, t) {
  const n = {}, r = e.all(t);
  let i = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length; ) {
    const s = r[i];
    if (s.type === "element" && s.tagName === "li" && s.properties && Array.isArray(s.properties.className) && s.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const o = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(r, !0)
  };
  return e.patch(t, o), e.applyData(t, o);
}
function Ad(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Ld(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Pd(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Wd(e, t) {
  const n = e.all(t), r = n.shift(), i = [];
  if (r) {
    const s = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(t.children[0], s), i.push(s);
  }
  if (n.length > 0) {
    const s = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(n, !0)
    }, a = zr(t.children[1]), u = jo(t.children[t.children.length - 1]);
    a && u && (s.position = { start: a, end: u }), i.push(s);
  }
  const o = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, o), e.applyData(t, o);
}
function Vd(e, t, n) {
  const r = n ? n.children : void 0, o = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", s = n && n.type === "table" ? n.align : void 0, a = s ? s.length : t.children.length;
  let u = -1;
  const h = [];
  for (; ++u < a; ) {
    const m = t.children[u], g = {}, f = s ? s[u] : void 0;
    f && (g.align = f);
    let E = { type: "element", tagName: o, properties: g, children: [] };
    m && (E.children = e.all(m), e.patch(m, E), E = e.applyData(m, E)), h.push(E);
  }
  const c = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(h, !0)
  };
  return e.patch(t, c), e.applyData(t, c);
}
function Fd(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Hi = 9, zi = 32;
function Hd(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const o = [];
  for (; r; )
    o.push(
      Bi(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return o.push(Bi(t.slice(i), i > 0, !1)), o.join("");
}
function Bi(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let o = e.codePointAt(r);
    for (; o === Hi || o === zi; )
      r++, o = e.codePointAt(r);
  }
  if (n) {
    let o = e.codePointAt(i - 1);
    for (; o === Hi || o === zi; )
      i--, o = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function zd(e, t) {
  const n = { type: "text", value: Hd(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Bd(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Gd = {
  blockquote: Nd,
  break: Cd,
  code: wd,
  delete: Ed,
  emphasis: yd,
  footnoteReference: vd,
  heading: Sd,
  html: Td,
  imageReference: _d,
  image: Dd,
  inlineCode: Od,
  linkReference: Id,
  link: jd,
  listItem: Rd,
  list: Ud,
  paragraph: Ad,
  // @ts-expect-error: root is different, but hard to type.
  root: Ld,
  strong: Pd,
  table: Wd,
  tableCell: Fd,
  tableRow: Vd,
  text: zd,
  thematicBreak: Bd,
  toml: An,
  yaml: An,
  definition: An,
  footnoteDefinition: An
};
function An() {
}
const es = -1, Xn = 0, yn = 1, $n = 2, Kr = 3, Xr = 4, Jr = 5, Qr = 6, ts = 7, ns = 8, Gi = typeof self == "object" ? self : globalThis, $d = (e, t) => {
  const n = (i, o) => (e.set(o, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [o, s] = t[i];
    switch (o) {
      case Xn:
      case es:
        return n(s, i);
      case yn: {
        const a = n([], i);
        for (const u of s)
          a.push(r(u));
        return a;
      }
      case $n: {
        const a = n({}, i);
        for (const [u, h] of s)
          a[r(u)] = r(h);
        return a;
      }
      case Kr:
        return n(new Date(s), i);
      case Xr: {
        const { source: a, flags: u } = s;
        return n(new RegExp(a, u), i);
      }
      case Jr: {
        const a = n(/* @__PURE__ */ new Map(), i);
        for (const [u, h] of s)
          a.set(r(u), r(h));
        return a;
      }
      case Qr: {
        const a = n(/* @__PURE__ */ new Set(), i);
        for (const u of s)
          a.add(r(u));
        return a;
      }
      case ts: {
        const { name: a, message: u } = s;
        return n(new Gi[a](u), i);
      }
      case ns:
        return n(BigInt(s), i);
      case "BigInt":
        return n(Object(BigInt(s)), i);
      case "ArrayBuffer":
        return n(new Uint8Array(s).buffer, s);
      case "DataView": {
        const { buffer: a } = new Uint8Array(s);
        return n(new DataView(a), s);
      }
    }
    return n(new Gi[o](s), i);
  };
  return r;
}, $i = (e) => $d(/* @__PURE__ */ new Map(), e)(0), an = "", { toString: qd } = {}, { keys: Zd } = Object, Cn = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Xn, t];
  const n = qd.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [yn, an];
    case "Object":
      return [$n, an];
    case "Date":
      return [Kr, an];
    case "RegExp":
      return [Xr, an];
    case "Map":
      return [Jr, an];
    case "Set":
      return [Qr, an];
    case "DataView":
      return [yn, n];
  }
  return n.includes("Array") ? [yn, n] : n.includes("Error") ? [ts, n] : [$n, n];
}, Ln = ([e, t]) => e === Xn && (t === "function" || t === "symbol"), Yd = (e, t, n, r) => {
  const i = (s, a) => {
    const u = r.push(s) - 1;
    return n.set(a, u), u;
  }, o = (s) => {
    if (n.has(s))
      return n.get(s);
    let [a, u] = Cn(s);
    switch (a) {
      case Xn: {
        let c = s;
        switch (u) {
          case "bigint":
            a = ns, c = s.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + u);
            c = null;
            break;
          case "undefined":
            return i([es], s);
        }
        return i([a, c], s);
      }
      case yn: {
        if (u) {
          let g = s;
          return u === "DataView" ? g = new Uint8Array(s.buffer) : u === "ArrayBuffer" && (g = new Uint8Array(s)), i([u, [...g]], s);
        }
        const c = [], m = i([a, c], s);
        for (const g of s)
          c.push(o(g));
        return m;
      }
      case $n: {
        if (u)
          switch (u) {
            case "BigInt":
              return i([u, s.toString()], s);
            case "Boolean":
            case "Number":
            case "String":
              return i([u, s.valueOf()], s);
          }
        if (t && "toJSON" in s)
          return o(s.toJSON());
        const c = [], m = i([a, c], s);
        for (const g of Zd(s))
          (e || !Ln(Cn(s[g]))) && c.push([o(g), o(s[g])]);
        return m;
      }
      case Kr:
        return i([a, s.toISOString()], s);
      case Xr: {
        const { source: c, flags: m } = s;
        return i([a, { source: c, flags: m }], s);
      }
      case Jr: {
        const c = [], m = i([a, c], s);
        for (const [g, f] of s)
          (e || !(Ln(Cn(g)) || Ln(Cn(f)))) && c.push([o(g), o(f)]);
        return m;
      }
      case Qr: {
        const c = [], m = i([a, c], s);
        for (const g of s)
          (e || !Ln(Cn(g))) && c.push(o(g));
        return m;
      }
    }
    const { message: h } = s;
    return i([a, { name: u, message: h }], s);
  };
  return o;
}, qi = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return Yd(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, qn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? $i(qi(e, t)) : structuredClone(e)
) : (e, t) => $i(qi(e, t));
function Kd(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function Xd(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function Jd(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || Kd, r = e.options.footnoteBackLabel || Xd, i = e.options.footnoteLabel || "Footnotes", o = e.options.footnoteLabelTagName || "h2", s = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let u = -1;
  for (; ++u < e.footnoteOrder.length; ) {
    const h = e.footnoteById.get(
      e.footnoteOrder[u]
    );
    if (!h)
      continue;
    const c = e.all(h), m = String(h.identifier).toUpperCase(), g = mn(m.toLowerCase());
    let f = 0;
    const E = [], w = e.footnoteCounts.get(m);
    for (; w !== void 0 && ++f <= w; ) {
      E.length > 0 && E.push({ type: "text", value: " " });
      let D = typeof n == "string" ? n : n(u, f);
      typeof D == "string" && (D = { type: "text", value: D }), E.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + g + (f > 1 ? "-" + f : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(u, f),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(D) ? D : [D]
      });
    }
    const I = c[c.length - 1];
    if (I && I.type === "element" && I.tagName === "p") {
      const D = I.children[I.children.length - 1];
      D && D.type === "text" ? D.value += " " : I.children.push({ type: "text", value: " " }), I.children.push(...E);
    } else
      c.push(...E);
    const y = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + g },
      children: e.wrap(c, !0)
    };
    e.patch(h, y), a.push(y);
  }
  if (a.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: o,
          properties: {
            ...qn(s),
            id: "footnote-label"
          },
          children: [{ type: "text", value: i }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(a, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const rs = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(e) {
    if (e == null)
      return np;
    if (typeof e == "function")
      return Jn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Qd(e) : ep(e);
    if (typeof e == "string")
      return tp(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function Qd(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = rs(e[n]);
  return Jn(r);
  function r(...i) {
    let o = -1;
    for (; ++o < t.length; )
      if (t[o].apply(this, i)) return !0;
    return !1;
  }
}
function ep(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Jn(n);
  function n(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let o;
    for (o in e)
      if (i[o] !== t[o]) return !1;
    return !0;
  }
}
function tp(e) {
  return Jn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Jn(e) {
  return t;
  function t(n, r, i) {
    return !!(rp(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function np() {
  return !0;
}
function rp(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const is = [], ip = !0, Zi = !1, op = "skip";
function sp(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const o = rs(i), s = r ? -1 : 1;
  a(e, void 0, [])();
  function a(u, h, c) {
    const m = (
      /** @type {Record<string, unknown>} */
      u && typeof u == "object" ? u : {}
    );
    if (typeof m.type == "string") {
      const f = (
        // `hast`
        typeof m.tagName == "string" ? m.tagName : (
          // `xast`
          typeof m.name == "string" ? m.name : void 0
        )
      );
      Object.defineProperty(g, "name", {
        value: "node (" + (u.type + (f ? "<" + f + ">" : "")) + ")"
      });
    }
    return g;
    function g() {
      let f = is, E, w, I;
      if ((!t || o(u, h, c[c.length - 1] || void 0)) && (f = ap(n(u, c)), f[0] === Zi))
        return f;
      if ("children" in u && u.children) {
        const y = (
          /** @type {UnistParent} */
          u
        );
        if (y.children && f[0] !== op)
          for (w = (r ? y.children.length : -1) + s, I = c.concat(y); w > -1 && w < y.children.length; ) {
            const D = y.children[w];
            if (E = a(D, w, I)(), E[0] === Zi)
              return E;
            w = typeof E[1] == "number" ? E[1] : w + s;
          }
      }
      return f;
    }
  }
}
function ap(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [ip, e] : e == null ? is : [e];
}
function os(e, t, n, r) {
  let i, o, s;
  typeof t == "function" && typeof n != "function" ? (o = void 0, s = t, i = n) : (o = t, s = n, i = r), sp(e, o, a, i);
  function a(u, h) {
    const c = h[h.length - 1], m = c ? c.children.indexOf(u) : void 0;
    return s(u, m, c);
  }
}
const Ur = {}.hasOwnProperty, lp = {};
function cp(e, t) {
  const n = t || lp, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = { ...Gd, ...n.handlers }, a = {
    all: h,
    applyData: dp,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: o,
    footnoteOrder: [],
    handlers: s,
    one: u,
    options: n,
    patch: up,
    wrap: hp
  };
  return os(e, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const m = c.type === "definition" ? r : i, g = String(c.identifier).toUpperCase();
      m.has(g) || m.set(g, c);
    }
  }), a;
  function u(c, m) {
    const g = c.type, f = a.handlers[g];
    if (Ur.call(a.handlers, g) && f)
      return f(a, c, m);
    if (a.options.passThrough && a.options.passThrough.includes(g)) {
      if ("children" in c) {
        const { children: w, ...I } = c, y = qn(I);
        return y.children = a.all(c), y;
      }
      return qn(c);
    }
    return (a.options.unknownHandler || pp)(a, c, m);
  }
  function h(c) {
    const m = [];
    if ("children" in c) {
      const g = c.children;
      let f = -1;
      for (; ++f < g.length; ) {
        const E = a.one(g[f], c);
        if (E) {
          if (f && g[f - 1].type === "break" && (!Array.isArray(E) && E.type === "text" && (E.value = Yi(E.value)), !Array.isArray(E) && E.type === "element")) {
            const w = E.children[0];
            w && w.type === "text" && (w.value = Yi(w.value));
          }
          Array.isArray(E) ? m.push(...E) : m.push(E);
        }
      }
    }
    return m;
  }
}
function up(e, t) {
  e.position && (t.position = zl(e));
}
function dp(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, o = e.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element")
        n.tagName = r;
      else {
        const s = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: s };
      }
    n.type === "element" && o && Object.assign(n.properties, qn(o)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function pp(e, t) {
  const n = t.data || {}, r = "value" in t && !(Ur.call(n, "hProperties") || Ur.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function hp(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Yi(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function Ki(e, t) {
  const n = cp(e, t), r = n.one(e, void 0), i = Jd(n), o = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && (C("children" in o), o.children.push({ type: "text", value: `
` }, i)), o;
}
function mp(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      Ki(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      Ki(n, { file: r, ...e || t })
    );
  };
}
function Xi(e) {
  if (e)
    throw e;
}
var Hn = Object.prototype.hasOwnProperty, ss = Object.prototype.toString, Ji = Object.defineProperty, Qi = Object.getOwnPropertyDescriptor, eo = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : ss.call(t) === "[object Array]";
}, to = function(t) {
  if (!t || ss.call(t) !== "[object Object]")
    return !1;
  var n = Hn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && Hn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || Hn.call(t, i);
}, no = function(t, n) {
  Ji && n.name === "__proto__" ? Ji(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, ro = function(t, n) {
  if (n === "__proto__")
    if (Hn.call(t, n)) {
      if (Qi)
        return Qi(t, n).value;
    } else return;
  return t[n];
}, fp = function e() {
  var t, n, r, i, o, s, a = arguments[0], u = 1, h = arguments.length, c = !1;
  for (typeof a == "boolean" && (c = a, a = arguments[1] || {}, u = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); u < h; ++u)
    if (t = arguments[u], t != null)
      for (n in t)
        r = ro(a, n), i = ro(t, n), a !== i && (c && i && (to(i) || (o = eo(i))) ? (o ? (o = !1, s = r && eo(r) ? r : []) : s = r && to(r) ? r : {}, no(a, { name: n, newValue: e(c, s, i) })) : typeof i < "u" && no(a, { name: n, newValue: i }));
  return a;
};
const pr = /* @__PURE__ */ Wr(fp);
function Ar(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function gp() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let o = -1;
    const s = i.pop();
    if (typeof s != "function")
      throw new TypeError("Expected function as last argument, not " + s);
    a(null, ...i);
    function a(u, ...h) {
      const c = e[++o];
      let m = -1;
      if (u) {
        s(u);
        return;
      }
      for (; ++m < i.length; )
        (h[m] === null || h[m] === void 0) && (h[m] = i[m]);
      i = h, c ? kp(c, a)(...h) : s(null, ...h);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), t;
  }
}
function kp(e, t) {
  let n;
  return r;
  function r(...s) {
    const a = e.length > s.length;
    let u;
    a && s.push(i);
    try {
      u = e.apply(this, s);
    } catch (h) {
      const c = (
        /** @type {Error} */
        h
      );
      if (a && n)
        throw c;
      return i(c);
    }
    a || (u && u.then && typeof u.then == "function" ? u.then(o, i) : u instanceof Error ? i(u) : o(u));
  }
  function i(s, ...a) {
    n || (n = !0, t(s, ...a));
  }
  function o(s) {
    i(null, s);
  }
}
const Rt = { basename: bp, dirname: xp, extname: Np, join: Cp, sep: "/" };
function bp(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  _n(e);
  let n = 0, r = -1, i = e.length, o;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (o) {
          n = i + 1;
          break;
        }
      } else r < 0 && (o = !0, r = i + 1);
    return r < 0 ? "" : e.slice(n, r);
  }
  if (t === e)
    return "";
  let s = -1, a = t.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (o) {
        n = i + 1;
        break;
      }
    } else
      s < 0 && (o = !0, s = i + 1), a > -1 && (e.codePointAt(i) === t.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = s));
  return n === r ? r = s : r < 0 && (r = e.length), e.slice(n, r);
}
function xp(e) {
  if (_n(e), e.length === 0)
    return ".";
  let t = -1, n = e.length, r;
  for (; --n; )
    if (e.codePointAt(n) === 47) {
      if (r) {
        t = n;
        break;
      }
    } else r || (r = !0);
  return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function Np(e) {
  _n(e);
  let t = e.length, n = -1, r = 0, i = -1, o = 0, s;
  for (; t--; ) {
    const a = e.codePointAt(t);
    if (a === 47) {
      if (s) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (s = !0, n = t + 1), a === 46 ? i < 0 ? i = t : o !== 1 && (o = 1) : i > -1 && (o = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  o === 0 || // The (right-most) trimmed path component is exactly `..`.
  o === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function Cp(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    _n(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : wp(n);
}
function wp(e) {
  _n(e);
  const t = e.codePointAt(0) === 47;
  let n = Ep(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function Ep(e, t) {
  let n = "", r = 0, i = -1, o = 0, s = -1, a, u;
  for (; ++s <= e.length; ) {
    if (s < e.length)
      a = e.codePointAt(s);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === s - 1 || o === 1)) if (i !== s - 1 && o === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (u = n.lastIndexOf("/"), u !== n.length - 1) {
              u < 0 ? (n = "", r = 0) : (n = n.slice(0, u), r = n.length - 1 - n.lastIndexOf("/")), i = s, o = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = s, o = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + e.slice(i + 1, s) : n = e.slice(i + 1, s), r = s - i - 1;
      i = s, o = 0;
    } else a === 46 && o > -1 ? o++ : o = -1;
  }
  return n;
}
function _n(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const yp = { cwd: vp };
function vp() {
  return "/";
}
function Lr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Sp(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Lr(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return Tp(e);
}
function Tp(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const t = e.pathname;
  let n = -1;
  for (; ++n < t.length; )
    if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
      const r = t.codePointAt(n + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(t);
}
const hr = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class as {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(t) {
    let n;
    t ? Lr(t) ? n = { path: t } : typeof t == "string" || _p(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : yp.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < hr.length; ) {
      const o = hr[r];
      o in n && n[o] !== void 0 && n[o] !== null && (this[o] = o === "history" ? [...n[o]] : n[o]);
    }
    let i;
    for (i in n)
      hr.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Rt.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(t) {
    fr(t, "basename"), mr(t, "basename"), this.path = Rt.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Rt.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(t) {
    io(this.basename, "dirname"), this.path = Rt.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Rt.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(t) {
    if (mr(t, "extname"), io(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Rt.join(this.dirname, this.stem + (t || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(t) {
    Lr(t) && (t = Sp(t)), fr(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Rt.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(t) {
    fr(t, "stem"), mr(t, "stem"), this.path = Rt.join(this.dirname || "", t + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(t, n, r) {
    const i = this.message(t, n, r);
    throw i.fatal = !0, i;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(t, n, r) {
    const i = this.message(t, n, r);
    return i.fatal = void 0, i;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(t, n, r) {
    const i = new Qe(
      // @ts-expect-error: the overloads are fine.
      t,
      n,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(t) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(t || void 0).decode(this.value);
  }
}
function mr(e, t) {
  if (e && e.includes(Rt.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + Rt.sep + "`"
    );
}
function fr(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function io(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function _p(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Dp = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(e) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[e], o = function() {
      return i.apply(o, arguments);
    };
    return Object.setPrototypeOf(o, r), o;
  }
), Op = {}.hasOwnProperty;
class ei extends Dp {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = gp();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const t = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new ei()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(pr(!0, {}, this.namespace)), t;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(t, n) {
    return typeof t == "string" ? arguments.length === 2 ? (br("data", this.frozen), this.namespace[t] = n, this) : Op.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (br("data", this.frozen), this.namespace = t, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const t = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = n.call(t, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(t) {
    this.freeze();
    const n = Pn(t), r = this.parser || this.Parser;
    return gr("parse", r), r(String(n), n);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(t, n) {
    const r = this;
    return this.freeze(), gr("process", this.parser || this.Parser), kr("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(o, s) {
      const a = Pn(t), u = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(u, a, function(c, m, g) {
        if (c || !m || !g)
          return h(c);
        const f = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          m
        ), E = r.stringify(f, g);
        Rp(E) ? g.value = E : g.result = E, h(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          g
        );
      });
      function h(c, m) {
        c || !m ? s(c) : o ? o(m) : (C(n, "`done` is defined if `resolve` is not"), n(void 0, m));
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(t) {
    let n = !1, r;
    return this.freeze(), gr("processSync", this.parser || this.Parser), kr("processSync", this.compiler || this.Compiler), this.process(t, i), so("processSync", "process", n), C(r, "we either bailed on an error or have a tree"), r;
    function i(o, s) {
      n = !0, Xi(o), r = s;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(t, n, r) {
    oo(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? o(void 0, r) : new Promise(o);
    function o(s, a) {
      C(
        typeof n != "function",
        "`file` can’t be a `done` anymore, we checked"
      );
      const u = Pn(n);
      i.run(t, u, h);
      function h(c, m, g) {
        const f = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          m || t
        );
        c ? a(c) : s ? s(f) : (C(r, "`done` is defined if `resolve` is not"), r(void 0, f, g));
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(t, n) {
    let r = !1, i;
    return this.run(t, n, o), so("runSync", "run", r), C(i, "we either bailed on an error or have a tree"), i;
    function o(s, a) {
      Xi(s), i = a, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(t, n) {
    this.freeze();
    const r = Pn(n), i = this.compiler || this.Compiler;
    return kr("stringify", i), oo(t), i(t, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(t, ...n) {
    const r = this.attachers, i = this.namespace;
    if (br("use", this.frozen), t != null) if (typeof t == "function")
      u(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? a(t) : s(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function o(h) {
      if (typeof h == "function")
        u(h, []);
      else if (typeof h == "object")
        if (Array.isArray(h)) {
          const [c, ...m] = (
            /** @type {PluginTuple<Array<unknown>>} */
            h
          );
          u(c, m);
        } else
          s(h);
      else
        throw new TypeError("Expected usable value, not `" + h + "`");
    }
    function s(h) {
      if (!("plugins" in h) && !("settings" in h))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(h.plugins), h.settings && (i.settings = pr(!0, i.settings, h.settings));
    }
    function a(h) {
      let c = -1;
      if (h != null) if (Array.isArray(h))
        for (; ++c < h.length; ) {
          const m = h[c];
          o(m);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + h + "`");
    }
    function u(h, c) {
      let m = -1, g = -1;
      for (; ++m < r.length; )
        if (r[m][0] === h) {
          g = m;
          break;
        }
      if (g === -1)
        r.push([h, ...c]);
      else if (c.length > 0) {
        let [f, ...E] = c;
        const w = r[g][1];
        Ar(w) && Ar(f) && (f = pr(!0, w, f)), r[g] = [h, f, ...E];
      }
    }
  }
}
const Ip = new ei().freeze();
function gr(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function kr(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function br(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function oo(e) {
  if (!Ar(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function so(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function Pn(e) {
  return jp(e) ? e : new as(e);
}
function jp(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Rp(e) {
  return typeof e == "string" || Mp(e);
}
function Mp(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Up = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", ao = [], lo = { allowDangerousHtml: !0 }, Ap = /^(https?|ircs?|mailto|xmpp)$/i, Lp = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  { from: "className", id: "remove-classname" },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function co(e) {
  const t = Pp(e), n = Wp(e);
  return Vp(t.runSync(t.parse(n), n), e);
}
function Pp(e) {
  const t = e.rehypePlugins || ao, n = e.remarkPlugins || ao, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...lo } : lo;
  return Ip().use(xd).use(n).use(mp, r).use(t);
}
function Wp(e) {
  const t = e.children || "", n = new as();
  return typeof t == "string" ? n.value = t : vr(
    "Unexpected value `" + t + "` for `children` prop, expected `string`"
  ), n;
}
function Vp(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, o = t.disallowedElements, s = t.skipHtml, a = t.unwrapDisallowed, u = t.urlTransform || Fp;
  for (const c of Lp)
    Object.hasOwn(t, c.from) && vr(
      "Unexpected `" + c.from + "` prop, " + (c.to ? "use `" + c.to + "` instead" : "remove it") + " (see <" + Up + "#" + c.id + "> for more info)"
    );
  return n && o && vr(
    "Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other"
  ), os(e, h), Zl(e, {
    Fragment: ys,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: Es,
    jsxs: ws,
    passKeys: !0,
    passNode: !0
  });
  function h(c, m, g) {
    if (c.type === "raw" && g && typeof m == "number")
      return s ? g.children.splice(m, 1) : g.children[m] = { type: "text", value: c.value }, m;
    if (c.type === "element") {
      let f;
      for (f in lr)
        if (Object.hasOwn(lr, f) && Object.hasOwn(c.properties, f)) {
          const E = c.properties[f], w = lr[f];
          (w === null || w.includes(c.tagName)) && (c.properties[f] = u(String(E || ""), f, c));
        }
    }
    if (c.type === "element") {
      let f = n ? !n.includes(c.tagName) : o ? o.includes(c.tagName) : !1;
      if (!f && r && typeof m == "number" && (f = !r(c, m, g)), f && g && typeof m == "number")
        return a && c.children ? g.children.splice(m, 1, ...c.children) : g.children.splice(m, 1), m;
    }
  }
}
function Fp(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    Ap.test(e.slice(0, t)) ? e : ""
  );
}
function Hp({ children: e, isStreaming: t }) {
  const [n, r] = Ne(!0), [i, o] = Ne(!1);
  Ot.useEffect(() => {
    !t && !i ? (o(!0), r(!1)) : t && (o(!1), r(!0));
  }, [t, i]);
  const s = () => {
    t || r(!n);
  }, a = Ot.Children.map(e, (u) => {
    if (Ot.isValidElement(u)) {
      if (u.type === ls)
        return Ot.cloneElement(
          u,
          {
            onToggle: s,
            isExpanded: n
          }
        );
      if (u.type === cs)
        return Ot.cloneElement(
          u,
          {
            isVisible: n
          }
        );
    }
    return u;
  });
  return /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__reasoning", children: a }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
    lineNumber: 68,
    columnNumber: 10
  }, this);
}
function ls({
  title: e,
  status: t = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const o = () => /* @__PURE__ */ l.jsxDEV(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ l.jsxDEV(
          "mask",
          {
            id: "mask0_64_36210",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "16",
            height: "16",
            children: /* @__PURE__ */ l.jsxDEV("rect", { width: "16", height: "16", fill: "#D9D9D9" }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
              lineNumber: 96,
              columnNumber: 11
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
            lineNumber: 87,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_64_36210)", children: /* @__PURE__ */ l.jsxDEV(
          "path",
          {
            d: "M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z",
            fill: "#637381"
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
            lineNumber: 99,
            columnNumber: 11
          },
          this
        ) }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
          lineNumber: 98,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
      lineNumber: 80,
      columnNumber: 7
    },
    this
  ), s = t === "completed" || e.includes(se.UI_TEXT.THINKING) || e.includes(se.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ l.jsxDEV(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${s ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: s ? r : void 0,
      style: { cursor: s ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__reasoning-icon", children: o() }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
          lineNumber: 121,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ l.jsxDEV("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ l.jsxDEV("span", { className: "chat-wrapper__reasoning-duration", children: n }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
            lineNumber: 125,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
          lineNumber: 122,
          columnNumber: 7
        }, this),
        s && /* @__PURE__ */ l.jsxDEV(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ l.jsxDEV(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ l.jsxDEV(
                    "mask",
                    {
                      id: "mask0_44_18068",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ l.jsxDEV("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" }, void 0, !1, {
                        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
                        lineNumber: 150,
                        columnNumber: 15
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
                      lineNumber: 141,
                      columnNumber: 13
                    },
                    this
                  ),
                  /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ l.jsxDEV(
                    "path",
                    {
                      d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                      fill: "#637381"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
                      lineNumber: 153,
                      columnNumber: 15
                    },
                    this
                  ) }, void 0, !1, {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
                    lineNumber: 152,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
                lineNumber: 134,
                columnNumber: 11
              },
              this
            )
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
            lineNumber: 129,
            columnNumber: 9
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
      lineNumber: 114,
      columnNumber: 5
    },
    this
  );
}
function cs({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__reasoning-text", children: e }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
    lineNumber: 173,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Reasoning.tsx",
    lineNumber: 172,
    columnNumber: 5
  }, this) : null;
}
function zp({ children: e }) {
  return /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__tooling-handle", children: e }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
}
function Bp({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var u, h;
  const o = () => {
    if (!r || !i) return null;
    const c = i.find((m) => m.name === r);
    return (c == null ? void 0 : c.description) || null;
  };
  let s;
  if (r != null && r.startsWith("lat_")) {
    const c = (u = n == null ? void 0 : n.parameters) == null ? void 0 : u.query, m = (h = n == null ? void 0 : n.parameters) == null ? void 0 : h.url;
    s = c || m || "Executing tool...";
  } else
    s = o();
  s && (s.startsWith("http://") || s.startsWith("https://") || (s = s.charAt(0).toUpperCase() + s.slice(1)));
  const a = () => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ l.jsxDEV(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ l.jsxDEV(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ l.jsxDEV("rect", { width: "16", height: "16", fill: "#D9D9D9" }, void 0, !1, {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                      lineNumber: 81,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 72,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ l.jsxDEV(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 84,
                    columnNumber: 21
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                  lineNumber: 83,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 65,
              columnNumber: 17
            },
            this
          ) : /* @__PURE__ */ l.jsxDEV(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ l.jsxDEV(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ l.jsxDEV("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" }, void 0, !1, {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                      lineNumber: 107,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 98,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ l.jsxDEV(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 110,
                    columnNumber: 21
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                  lineNumber: 109,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 91,
              columnNumber: 17
            },
            this
          ) }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 63,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ l.jsxDEV("span", { children: s }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 118,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ l.jsxDEV(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ l.jsxDEV(
                    "mask",
                    {
                      id: "mask0_64_36278",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ l.jsxDEV(
                        "rect",
                        {
                          y: "0.381836",
                          width: "16",
                          height: "16",
                          fill: "#D9D9D9"
                        },
                        void 0,
                        !1,
                        {
                          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                          lineNumber: 172,
                          columnNumber: 23
                        },
                        this
                      )
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                      lineNumber: 163,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ l.jsxDEV(
                    "path",
                    {
                      d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                      fill: "#637381"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                      lineNumber: 180,
                      columnNumber: 23
                    },
                    this
                  ) }, void 0, !1, {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 179,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                lineNumber: 156,
                columnNumber: 19
              },
              this
            ) }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 155,
              columnNumber: 17
            }, this) }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 154,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ l.jsxDEV("span", { children: "Running..." }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 188,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 153,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
          lineNumber: 62,
          columnNumber: 11
        }, this);
      case "completed":
        return /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ l.jsxDEV(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ l.jsxDEV(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ l.jsxDEV("rect", { width: "16", height: "16", fill: "#D9D9D9" }, void 0, !1, {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                      lineNumber: 213,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 204,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ l.jsxDEV(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 216,
                    columnNumber: 21
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                  lineNumber: 215,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 197,
              columnNumber: 17
            },
            this
          ) : /* @__PURE__ */ l.jsxDEV(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ l.jsxDEV(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ l.jsxDEV("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" }, void 0, !1, {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                      lineNumber: 239,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 230,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ l.jsxDEV(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 242,
                    columnNumber: 21
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                  lineNumber: 241,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 223,
              columnNumber: 17
            },
            this
          ) }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 195,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ l.jsxDEV("span", { children: s }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 250,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ l.jsxDEV(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ l.jsxDEV(
                    "mask",
                    {
                      id: "mask0_64_36345",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ l.jsxDEV(
                        "rect",
                        {
                          y: "0.381836",
                          width: "16",
                          height: "16",
                          fill: "#D9D9D9"
                        },
                        void 0,
                        !1,
                        {
                          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                          lineNumber: 271,
                          columnNumber: 23
                        },
                        this
                      )
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                      lineNumber: 262,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_64_36345)", children: /* @__PURE__ */ l.jsxDEV(
                    "path",
                    {
                      d: "M7.1501 10.7819L11.1168 6.83193L10.2668 5.98193L7.1501 9.08193L5.73343 7.68193L4.88343 8.53193L7.1501 10.7819ZM8.0001 14.7819C7.12232 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.643 2.1001 10.8653C1.76676 10.0875 1.6001 9.25971 1.6001 8.38193C1.6001 7.49304 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73899 2.81527 5.51676 2.48193C6.29454 2.1486 7.12232 1.98193 8.0001 1.98193C8.88899 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11805 13.9001 5.89027C14.2334 6.66249 14.4001 7.49304 14.4001 8.38193C14.4001 9.25971 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.264 13.9486 10.4918 14.2819C9.71954 14.6153 8.88899 14.7819 8.0001 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819Z",
                      fill: "#4EAD13"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                      lineNumber: 279,
                      columnNumber: 23
                    },
                    this
                  ) }, void 0, !1, {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 278,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                lineNumber: 255,
                columnNumber: 19
              },
              this
            ) }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 254,
              columnNumber: 17
            }, this) }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 253,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ l.jsxDEV("span", { children: "Completed" }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 287,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 252,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
          lineNumber: 194,
          columnNumber: 11
        }, this);
      case "error":
        return /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ l.jsxDEV(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ l.jsxDEV(
                "path",
                {
                  d: "M18 6L6 18M6 6L18 18",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                void 0,
                !1,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                  lineNumber: 302,
                  columnNumber: 17
                },
                this
              )
            },
            void 0,
            !1,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 295,
              columnNumber: 15
            },
            this
          ) }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 294,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ l.jsxDEV("span", { className: "chat-wrapper__tooling-handle-title", children: e }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 311,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
          lineNumber: 293,
          columnNumber: 11
        }, this);
      default:
        return /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ l.jsxDEV(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ l.jsxDEV(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ l.jsxDEV("rect", { width: "16", height: "16", fill: "#D9D9D9" }, void 0, !1, {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                      lineNumber: 335,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 326,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ l.jsxDEV(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 338,
                    columnNumber: 21
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                  lineNumber: 337,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 319,
              columnNumber: 17
            },
            this
          ) : /* @__PURE__ */ l.jsxDEV(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ l.jsxDEV(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ l.jsxDEV("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" }, void 0, !1, {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                      lineNumber: 361,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 352,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ l.jsxDEV(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 364,
                    columnNumber: 21
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                  lineNumber: 363,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 345,
              columnNumber: 17
            },
            this
          ) }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 317,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ l.jsxDEV("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }, void 0, !0, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 372,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ l.jsxDEV(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ l.jsxDEV(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ l.jsxDEV(
                      "rect",
                      {
                        y: "0.000488281",
                        width: "16",
                        height: "16",
                        fill: "#D9D9D9"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                        lineNumber: 391,
                        columnNumber: 21
                      },
                      this
                    )
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 382,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ l.jsxDEV(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 399,
                    columnNumber: 21
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                  lineNumber: 398,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 375,
              columnNumber: 17
            },
            this
          ) }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 374,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 373,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ l.jsxDEV(
            "svg",
            {
              width: "20",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ l.jsxDEV(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ l.jsxDEV("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" }, void 0, !1, {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                      lineNumber: 425,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 416,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ l.jsxDEV(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                    lineNumber: 428,
                    columnNumber: 21
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
                  lineNumber: 427,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
              lineNumber: 409,
              columnNumber: 17
            },
            this
          ) }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 408,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 407,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ l.jsxDEV("span", { children: "Pending..." }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
            lineNumber: 436,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
          lineNumber: 316,
          columnNumber: 11
        }, this);
    }
  };
  return /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__tooling-handle-trigger", children: a() }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ToolingHandle.tsx",
    lineNumber: 443,
    columnNumber: 5
  }, this);
}
function us({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ l.jsxDEV("span", {}, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Loader.tsx",
      lineNumber: 10,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ l.jsxDEV("span", {}, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Loader.tsx",
      lineNumber: 11,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ l.jsxDEV("span", {}, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Loader.tsx",
      lineNumber: 12,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Loader.tsx",
    lineNumber: 9,
    columnNumber: 7
  }, this) : t === "pulse" ? /* @__PURE__ */ l.jsxDEV(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    },
    void 0,
    !1,
    {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Loader.tsx",
      lineNumber: 19,
      columnNumber: 7
    },
    this
  ) : /* @__PURE__ */ l.jsxDEV(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: e, height: e }
    },
    void 0,
    !1,
    {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/Loader.tsx",
      lineNumber: 27,
      columnNumber: 5
    },
    this
  );
}
const Gp = ({ message: e }) => {
  const [t, n] = Ne(!0), r = () => e.role === "system" ? /* @__PURE__ */ l.jsxDEV("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
    /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ l.jsxDEV(
      "svg",
      {
        width: "20",
        height: "16",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ l.jsxDEV(
            "mask",
            {
              id: "mask0_64_36257",
              style: { maskType: "alpha" },
              maskUnits: "userSpaceOnUse",
              x: "0",
              y: "0",
              width: "16",
              height: "17",
              children: /* @__PURE__ */ l.jsxDEV("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
                lineNumber: 32,
                columnNumber: 17
              }, void 0)
            },
            void 0,
            !1,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
              lineNumber: 23,
              columnNumber: 15
            },
            void 0
          ),
          /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ l.jsxDEV(
            "path",
            {
              d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
              fill: "#637381"
            },
            void 0,
            !1,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
              lineNumber: 35,
              columnNumber: 17
            },
            void 0
          ) }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
            lineNumber: 34,
            columnNumber: 15
          }, void 0)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
        lineNumber: 16,
        columnNumber: 13
      },
      void 0
    ) }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
      lineNumber: 15,
      columnNumber: 11
    }, void 0),
    /* @__PURE__ */ l.jsxDEV("span", { children: "AI text input <show-toolname>..." }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
      lineNumber: 42,
      columnNumber: 11
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
    lineNumber: 14,
    columnNumber: 9
  }, void 0) : /* @__PURE__ */ l.jsxDEV("span", { children: "System Message" }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
    lineNumber: 46,
    columnNumber: 12
  }, void 0);
  return /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ l.jsxDEV(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!t),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          r(),
          /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ l.jsxDEV(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              style: {
                transform: t ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease"
              },
              children: [
                /* @__PURE__ */ l.jsxDEV(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ l.jsxDEV("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" }, void 0, !1, {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
                      lineNumber: 78,
                      columnNumber: 15
                    }, void 0)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
                    lineNumber: 69,
                    columnNumber: 13
                  },
                  void 0
                ),
                /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ l.jsxDEV(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
                    lineNumber: 81,
                    columnNumber: 15
                  },
                  void 0
                ) }, void 0, !1, {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
                  lineNumber: 80,
                  columnNumber: 13
                }, void 0)
              ]
            },
            void 0,
            !0,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
              lineNumber: 58,
              columnNumber: 11
            },
            void 0
          ) }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
            lineNumber: 57,
            columnNumber: 9
          }, void 0)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
        lineNumber: 51,
        columnNumber: 7
      },
      void 0
    ),
    t && /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__system-message-content", children: /* @__PURE__ */ l.jsxDEV("span", { children: e.content }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
      lineNumber: 91,
      columnNumber: 11
    }, void 0) }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
      lineNumber: 90,
      columnNumber: 9
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SystemMessageCollapsible.tsx",
    lineNumber: 50,
    columnNumber: 5
  }, void 0);
};
function ds({
  imageUrl: e,
  isOpen: t,
  onClose: n,
  alt: r = "Image preview"
}) {
  const i = ce((s) => {
    s.key === "Escape" && n();
  }, [n]), o = ce((s) => {
    s.target === s.currentTarget && n();
  }, [n]);
  return Le(() => (t ? (document.addEventListener("keydown", i), document.body.style.overflow = "hidden") : (document.removeEventListener("keydown", i), document.body.style.overflow = ""), () => {
    document.removeEventListener("keydown", i), document.body.style.overflow = "";
  }), [t, i]), !t || !e ? null : /* @__PURE__ */ l.jsxDEV(
    "div",
    {
      className: "image-preview-modal__backdrop",
      onClick: o,
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        cursor: "zoom-out"
      },
      children: [
        /* @__PURE__ */ l.jsxDEV(
          "button",
          {
            onClick: n,
            style: {
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s",
              zIndex: 1e4
            },
            onMouseEnter: (s) => {
              s.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            },
            onMouseLeave: (s) => {
              s.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            },
            title: "Close (Esc)",
            children: "×"
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ImagePreviewModal.tsx",
            lineNumber: 70,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ l.jsxDEV(
          "div",
          {
            style: {
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "default"
            },
            onClick: (s) => s.stopPropagation(),
            children: /* @__PURE__ */ l.jsxDEV(
              "img",
              {
                src: e,
                alt: r,
                style: {
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  opacity: 1
                  // Ensure image is visible by default
                },
                onLoad: (s) => {
                  s.currentTarget.style.opacity = "1", s.currentTarget.style.transition = "opacity 0.2s";
                }
              },
              void 0,
              !1,
              {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ImagePreviewModal.tsx",
                lineNumber: 113,
                columnNumber: 9
              },
              this
            )
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ImagePreviewModal.tsx",
            lineNumber: 102,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ l.jsxDEV(
          "div",
          {
            style: {
              position: "absolute",
              bottom: "20px",
              left: "0",
              right: "0",
              width: "100%",
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "14px",
              textAlign: "center",
              pointerEvents: "none"
            },
            children: "Press Esc or click outside to close"
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ImagePreviewModal.tsx",
            lineNumber: 133,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ImagePreviewModal.tsx",
      lineNumber: 52,
      columnNumber: 5
    },
    this
  );
}
const ps = Ns(null);
function $p({ children: e, value: t }) {
  return /* @__PURE__ */ l.jsxDEV(ps.Provider, { value: t, children: e }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/contexts/ChatContext.tsx",
    lineNumber: 93,
    columnNumber: 5
  }, this);
}
function Dn() {
  const e = Cs(ps);
  if (!e)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return e;
}
const hs = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ l.jsxDEV("pre", { className: "chat-wrapper__code-block", ...t, children: e }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
    lineNumber: 19,
    columnNumber: 5
  }, void 0),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ l.jsxDEV("code", { className: "chat-wrapper__inline-code", ...n, children: e }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
    lineNumber: 26,
    columnNumber: 7
  }, void 0) : /* @__PURE__ */ l.jsxDEV("code", { className: "chat-wrapper__code", ...n, children: e }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
    lineNumber: 30,
    columnNumber: 7
  }, void 0),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ l.jsxDEV("ul", { className: "chat-wrapper__list", ...t, children: e }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, void 0),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ l.jsxDEV("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
    lineNumber: 41,
    columnNumber: 5
  }, void 0),
  li: ({ children: e, ...t }) => /* @__PURE__ */ l.jsxDEV("li", { className: "chat-wrapper__list-item", ...t, children: e }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
    lineNumber: 46,
    columnNumber: 5
  }, void 0),
  hr: ({ ...e }) => /* @__PURE__ */ l.jsxDEV("hr", { className: "chat-wrapper__hr", ...e }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
    lineNumber: 51,
    columnNumber: 5
  }, void 0)
}, qp = {
  ...hs,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ l.jsxDEV("code", { className: "chat-wrapper__inline-code", ...n, children: e }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
    lineNumber: 60,
    columnNumber: 7
  }, void 0) : /* @__PURE__ */ l.jsxDEV("code", { className: "chat-wrapper__code", ...n, children: e }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
    lineNumber: 64,
    columnNumber: 7
  }, void 0)
}, ms = uo(
  ({ message: e }) => {
    const {
      getReasoningTitle: t,
      getReasoningStatus: n,
      getReasoningDuration: r,
      getReasoningContentOnly: i,
      getToolingTitle: o,
      getToolingStatus: s,
      clientTools: a,
      currentAssistantMessageIdRef: u,
      onRetryMessage: h
    } = Dn(), [c, m] = Ne(!1), [g, f] = Ne(!1), [E, w] = Ne(null), I = ce(async () => {
      try {
        await navigator.clipboard.writeText(e.content), m(!0), setTimeout(() => m(!1), 2e3);
      } catch (_) {
        console.error("Failed to copy message:", _);
      }
    }, [e.content]), y = ce(() => {
      h && h(e.id);
    }, [h, e.id]), D = ce((_) => {
      w(_);
    }, []), U = ce((_) => {
      if (_.startsWith("data:image/") && _.includes("thumbnailUrl=")) {
        const L = _.match(/cdnUrl=([^;]+)/), B = _.match(/filename=([^;]+)/), ie = L ? decodeURIComponent(L[1]) : _;
        return {
          // TODO: Switch back to thumbnailUrl when backend provides proper thumbnail URLs
          // Currently using cdnUrl for both thumbnail and full image display
          thumbnailUrl: ie,
          // Using cdnUrl temporarily instead of thumbnailUrl
          cdnUrl: ie,
          filename: B ? decodeURIComponent(B[1]) : "image"
        };
      }
      return {
        thumbnailUrl: _,
        cdnUrl: _,
        filename: "image"
      };
    }, []), P = ce(() => {
      w(null);
    }, []), M = () => /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ l.jsxDEV(us, { size: 16, variant: "dots" }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
        lineNumber: 143,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ l.jsxDEV("span", { children: se.UI_TEXT.THINKING }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
        lineNumber: 144,
        columnNumber: 9
      }, void 0)
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
      lineNumber: 142,
      columnNumber: 7
    }, void 0), T = () => h && /* @__PURE__ */ l.jsxDEV(
      "button",
      {
        className: "chat-wrapper__retry-button",
        onClick: y,
        children: "Retry"
      },
      void 0,
      !1,
      {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
        lineNumber: 151,
        columnNumber: 9
      },
      void 0
    ), K = () => /* @__PURE__ */ l.jsxDEV(l.Fragment, { children: [
      /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ l.jsxDEV(
        "button",
        {
          className: `chat-wrapper__copy-button ${g ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: I,
          title: "Copy message",
          children: /* @__PURE__ */ l.jsxDEV(Ya, {}, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
            lineNumber: 168,
            columnNumber: 13
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
          lineNumber: 163,
          columnNumber: 11
        },
        void 0
      ) }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
        lineNumber: 162,
        columnNumber: 9
      }, void 0),
      c && /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__copied-notification", children: "Copied!" }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
        lineNumber: 172,
        columnNumber: 11
      }, void 0)
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
      lineNumber: 161,
      columnNumber: 7
    }, void 0), q = () => /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ l.jsxDEV(co, { components: hs, children: e.content }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
        lineNumber: 181,
        columnNumber: 13
      }, void 0) }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
        lineNumber: 180,
        columnNumber: 11
      }, void 0),
      K()
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
      lineNumber: 179,
      columnNumber: 9
    }, void 0) }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
      lineNumber: 178,
      columnNumber: 7
    }, void 0), ne = () => /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ l.jsxDEV(co, { components: qp, children: e.content }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
        lineNumber: 193,
        columnNumber: 11
      }, void 0) }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
        lineNumber: 192,
        columnNumber: 9
      }, void 0),
      e.media && e.media.length > 0 && /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__media", children: e.media.map((_, L) => {
        const B = U(_);
        return /* @__PURE__ */ l.jsxDEV(
          "img",
          {
            src: B.cdnUrl,
            alt: `Uploaded content ${L + 1}`,
            className: "chat-wrapper__media-image chat-wrapper__media-image--clickable",
            onClick: () => D(B.cdnUrl),
            style: {
              cursor: "zoom-in",
              transition: "transform 0.2s, box-shadow 0.2s"
            },
            onMouseEnter: (ie) => {
              ie.currentTarget.style.transform = "scale(1.02)", ie.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
            },
            onMouseLeave: (ie) => {
              ie.currentTarget.style.transform = "scale(1)", ie.currentTarget.style.boxShadow = "";
            },
            title: "Click to view full size"
          },
          L,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
            lineNumber: 203,
            columnNumber: 17
          },
          void 0
        );
      }) }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
        lineNumber: 198,
        columnNumber: 11
      }, void 0)
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
      lineNumber: 191,
      columnNumber: 7
    }, void 0), ae = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === u.current ? M() : e.role === "system" ? /* @__PURE__ */ l.jsxDEV(Gp, { message: e }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
      lineNumber: 243,
      columnNumber: 16
    }, void 0) : e.role === "assistant" ? q() : ne(), X = () => /* @__PURE__ */ l.jsxDEV(Hp, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ l.jsxDEV(
        ls,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
          lineNumber: 257,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ l.jsxDEV(cs, { children: i(e.content) }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
        lineNumber: 262,
        columnNumber: 9
      }, void 0)
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
      lineNumber: 256,
      columnNumber: 7
    }, void 0), G = () => {
      var _;
      return /* @__PURE__ */ l.jsxDEV(zp, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ l.jsxDEV(
        Bp,
        {
          title: o(e.content, e.isStreaming),
          status: s(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (_ = e.toolData) == null ? void 0 : _.toolName,
          clientTools: a
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
          lineNumber: 270,
          columnNumber: 9
        },
        void 0
      ) }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
        lineNumber: 269,
        columnNumber: 7
      }, void 0);
    };
    return /* @__PURE__ */ l.jsxDEV(l.Fragment, { children: [
      /* @__PURE__ */ l.jsxDEV(
        "div",
        {
          className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
          onMouseEnter: () => e.role === "assistant" && f(!0),
          onMouseLeave: () => e.role === "assistant" && f(!1),
          children: e.role === "reasoning" ? X() : e.role === "tooling" ? G() : /* @__PURE__ */ l.jsxDEV(l.Fragment, { children: [
            /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__message-content", children: ae() }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
              lineNumber: 305,
              columnNumber: 15
            }, void 0),
            e.role === "user" && e.hasError && !e.isRetrying && T()
          ] }, void 0, !0, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
            lineNumber: 304,
            columnNumber: 13
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
          lineNumber: 282,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ l.jsxDEV(
        ds,
        {
          imageUrl: E,
          isOpen: !!E,
          onClose: P,
          alt: "Message image"
        },
        void 0,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
          lineNumber: 314,
          columnNumber: 9
        },
        void 0
      )
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessageItem.tsx",
      lineNumber: 281,
      columnNumber: 7
    }, void 0);
  }
);
ms.displayName = "MessageItem";
const Zp = ({ isVisible: e }) => e ? /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ l.jsxDEV("span", {}, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ThinkingBubble.tsx",
    lineNumber: 15,
    columnNumber: 13
  }, void 0),
  /* @__PURE__ */ l.jsxDEV("span", {}, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ThinkingBubble.tsx",
    lineNumber: 16,
    columnNumber: 13
  }, void 0),
  /* @__PURE__ */ l.jsxDEV("span", {}, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ThinkingBubble.tsx",
    lineNumber: 17,
    columnNumber: 13
  }, void 0)
] }, void 0, !0, {
  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ThinkingBubble.tsx",
  lineNumber: 14,
  columnNumber: 11
}, void 0) }, void 0, !1, {
  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ThinkingBubble.tsx",
  lineNumber: 13,
  columnNumber: 9
}, void 0) }, void 0, !1, {
  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ThinkingBubble.tsx",
  lineNumber: 12,
  columnNumber: 7
}, void 0) }, void 0, !1, {
  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ThinkingBubble.tsx",
  lineNumber: 11,
  columnNumber: 5
}, void 0) : null, fs = Zn((e, t) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = Dn();
  return /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__messages", children: [
    n.map((o) => /* @__PURE__ */ l.jsxDEV(
      ms,
      {
        message: o
      },
      o.id,
      !1,
      {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessagesList.tsx",
        lineNumber: 22,
        columnNumber: 9
      },
      void 0
    )),
    /* @__PURE__ */ l.jsxDEV(Zp, { isVisible: r && !i }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessagesList.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ l.jsxDEV("div", { ref: t }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessagesList.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/MessagesList.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, void 0);
});
fs.displayName = "MessagesList";
const It = (...e) => e.filter(Boolean).join(" "), Yp = () => /* @__PURE__ */ l.jsxDEV(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ l.jsxDEV("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ l.jsxDEV(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
            lineNumber: 19,
            columnNumber: 7
          },
          void 0
        ),
        /* @__PURE__ */ l.jsxDEV("g", { clipPath: "url(#clip0_121_23927)", children: /* @__PURE__ */ l.jsxDEV(
          "path",
          {
            d: "M16.3333 26.3541L18.2133 28.2341L25.6666 20.7941V37.0208H28.3333V20.7941L35.7733 28.2474L37.6666 26.3541L26.9999 15.6874L16.3333 26.3541Z",
            fill: "white"
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
            lineNumber: 25,
            columnNumber: 9
          },
          void 0
        ) }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
          lineNumber: 24,
          columnNumber: 7
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
        lineNumber: 18,
        columnNumber: 5
      }, void 0),
      /* @__PURE__ */ l.jsxDEV("defs", { children: [
        /* @__PURE__ */ l.jsxDEV(
          "filter",
          {
            id: "filter0_dd_121_23927",
            x: "0",
            y: "0.354126",
            width: "54",
            height: "54",
            filterUnits: "userSpaceOnUse",
            colorInterpolationFilters: "sRGB",
            children: [
              /* @__PURE__ */ l.jsxDEV("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                lineNumber: 41,
                columnNumber: 9
              }, void 0),
              /* @__PURE__ */ l.jsxDEV(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                },
                void 0,
                !1,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                  lineNumber: 42,
                  columnNumber: 9
                },
                void 0
              ),
              /* @__PURE__ */ l.jsxDEV("feOffset", { dy: "1" }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                lineNumber: 48,
                columnNumber: 9
              }, void 0),
              /* @__PURE__ */ l.jsxDEV("feGaussianBlur", { stdDeviation: "1" }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                lineNumber: 49,
                columnNumber: 9
              }, void 0),
              /* @__PURE__ */ l.jsxDEV("feComposite", { in2: "hardAlpha", operator: "out" }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                lineNumber: 50,
                columnNumber: 9
              }, void 0),
              /* @__PURE__ */ l.jsxDEV(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                },
                void 0,
                !1,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                  lineNumber: 51,
                  columnNumber: 9
                },
                void 0
              ),
              /* @__PURE__ */ l.jsxDEV(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_121_23927"
                },
                void 0,
                !1,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                  lineNumber: 55,
                  columnNumber: 9
                },
                void 0
              ),
              /* @__PURE__ */ l.jsxDEV(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                },
                void 0,
                !1,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                  lineNumber: 60,
                  columnNumber: 9
                },
                void 0
              ),
              /* @__PURE__ */ l.jsxDEV("feOffset", { dy: "1" }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                lineNumber: 66,
                columnNumber: 9
              }, void 0),
              /* @__PURE__ */ l.jsxDEV("feGaussianBlur", { stdDeviation: "1.5" }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                lineNumber: 67,
                columnNumber: 9
              }, void 0),
              /* @__PURE__ */ l.jsxDEV("feComposite", { in2: "hardAlpha", operator: "out" }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                lineNumber: 68,
                columnNumber: 9
              }, void 0),
              /* @__PURE__ */ l.jsxDEV(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                },
                void 0,
                !1,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                  lineNumber: 69,
                  columnNumber: 9
                },
                void 0
              ),
              /* @__PURE__ */ l.jsxDEV(
                "feBlend",
                {
                  mode: "normal",
                  in2: "effect1_dropShadow_121_23927",
                  result: "effect2_dropShadow_121_23927"
                },
                void 0,
                !1,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                  lineNumber: 73,
                  columnNumber: 9
                },
                void 0
              ),
              /* @__PURE__ */ l.jsxDEV(
                "feBlend",
                {
                  mode: "normal",
                  in: "SourceGraphic",
                  in2: "effect2_dropShadow_121_23927",
                  result: "shape"
                },
                void 0,
                !1,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                  lineNumber: 78,
                  columnNumber: 9
                },
                void 0
              )
            ]
          },
          void 0,
          !0,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
            lineNumber: 32,
            columnNumber: 7
          },
          void 0
        ),
        /* @__PURE__ */ l.jsxDEV("clipPath", { id: "clip0_121_23927", children: /* @__PURE__ */ l.jsxDEV(
          "rect",
          {
            width: "32",
            height: "32",
            fill: "white",
            transform: "translate(11 10.3541)"
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
            lineNumber: 86,
            columnNumber: 9
          },
          void 0
        ) }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
          lineNumber: 85,
          columnNumber: 7
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
        lineNumber: 31,
        columnNumber: 5
      }, void 0)
    ]
  },
  void 0,
  !0,
  {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
    lineNumber: 11,
    columnNumber: 3
  },
  void 0
), Kp = () => /* @__PURE__ */ l.jsxDEV(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ l.jsxDEV("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ l.jsxDEV(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "inherit",
            shapeRendering: "crispEdges"
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
            lineNumber: 107,
            columnNumber: 7
          },
          void 0
        ),
        /* @__PURE__ */ l.jsxDEV("rect", { x: "19", y: "19.3541", width: "16", height: "16", rx: "2", fill: "white" }, void 0, !1, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
          lineNumber: 112,
          columnNumber: 7
        }, void 0)
      ] }, void 0, !0, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
        lineNumber: 106,
        columnNumber: 5
      }, void 0),
      /* @__PURE__ */ l.jsxDEV("defs", { children: /* @__PURE__ */ l.jsxDEV(
        "filter",
        {
          id: "filter0_dd_121_23927",
          x: "0",
          y: "0.354126",
          width: "54",
          height: "54",
          filterUnits: "userSpaceOnUse",
          colorInterpolationFilters: "sRGB",
          children: [
            /* @__PURE__ */ l.jsxDEV("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
              lineNumber: 124,
              columnNumber: 9
            }, void 0),
            /* @__PURE__ */ l.jsxDEV(
              "feColorMatrix",
              {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
              },
              void 0,
              !1,
              {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                lineNumber: 125,
                columnNumber: 9
              },
              void 0
            ),
            /* @__PURE__ */ l.jsxDEV("feOffset", { dy: "1" }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
              lineNumber: 131,
              columnNumber: 9
            }, void 0),
            /* @__PURE__ */ l.jsxDEV("feGaussianBlur", { stdDeviation: "1" }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
              lineNumber: 132,
              columnNumber: 9
            }, void 0),
            /* @__PURE__ */ l.jsxDEV("feComposite", { in2: "hardAlpha", operator: "out" }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
              lineNumber: 133,
              columnNumber: 9
            }, void 0),
            /* @__PURE__ */ l.jsxDEV(
              "feColorMatrix",
              {
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
              },
              void 0,
              !1,
              {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                lineNumber: 134,
                columnNumber: 9
              },
              void 0
            ),
            /* @__PURE__ */ l.jsxDEV(
              "feBlend",
              {
                mode: "normal",
                in2: "BackgroundImageFix",
                result: "effect1_dropShadow_121_23927"
              },
              void 0,
              !1,
              {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                lineNumber: 138,
                columnNumber: 9
              },
              void 0
            ),
            /* @__PURE__ */ l.jsxDEV(
              "feColorMatrix",
              {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
              },
              void 0,
              !1,
              {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                lineNumber: 143,
                columnNumber: 9
              },
              void 0
            ),
            /* @__PURE__ */ l.jsxDEV("feOffset", { dy: "1" }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
              lineNumber: 149,
              columnNumber: 9
            }, void 0),
            /* @__PURE__ */ l.jsxDEV("feGaussianBlur", { stdDeviation: "1.5" }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
              lineNumber: 150,
              columnNumber: 9
            }, void 0),
            /* @__PURE__ */ l.jsxDEV("feComposite", { in2: "hardAlpha", operator: "out" }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
              lineNumber: 151,
              columnNumber: 9
            }, void 0),
            /* @__PURE__ */ l.jsxDEV(
              "feColorMatrix",
              {
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              },
              void 0,
              !1,
              {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                lineNumber: 152,
                columnNumber: 9
              },
              void 0
            ),
            /* @__PURE__ */ l.jsxDEV(
              "feBlend",
              {
                mode: "normal",
                in2: "effect1_dropShadow_121_23927",
                result: "effect2_dropShadow_121_23927"
              },
              void 0,
              !1,
              {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                lineNumber: 156,
                columnNumber: 9
              },
              void 0
            ),
            /* @__PURE__ */ l.jsxDEV(
              "feBlend",
              {
                mode: "normal",
                in: "SourceGraphic",
                in2: "effect2_dropShadow_121_23927",
                result: "shape"
              },
              void 0,
              !1,
              {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
                lineNumber: 161,
                columnNumber: 9
              },
              void 0
            )
          ]
        },
        void 0,
        !0,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
          lineNumber: 115,
          columnNumber: 7
        },
        void 0
      ) }, void 0, !1, {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
        lineNumber: 114,
        columnNumber: 5
      }, void 0)
    ]
  },
  void 0,
  !0,
  {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
    lineNumber: 99,
    columnNumber: 3
  },
  void 0
), Xp = ({ className: e, ...t }) => /* @__PURE__ */ l.jsxDEV("form", { className: It("chat-wrapper__prompt-input", e), ...t }, void 0, !1, {
  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
  lineNumber: 177,
  columnNumber: 3
}, void 0), gs = Zn(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: o,
    ...s
  }, a) => {
    const u = (h) => {
      if (h.key === "Enter") {
        if (h.shiftKey)
          return;
        h.preventDefault();
        const c = h.currentTarget.form;
        if (c) {
          const m = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          c.dispatchEvent(m);
        }
      }
      o == null || o(h);
    };
    return /* @__PURE__ */ l.jsxDEV(
      "textarea",
      {
        ref: a,
        className: It("chat-wrapper__prompt-textarea", t),
        name: "message",
        onChange: e,
        onKeyDown: u,
        placeholder: n,
        style: {
          minHeight: `${r}px`,
          maxHeight: `${i}px`
        },
        ...s
      },
      void 0,
      !1,
      {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
        lineNumber: 224,
        columnNumber: 7
      },
      void 0
    );
  }
);
gs.displayName = "PromptInputTextarea";
const Jp = ({
  className: e,
  ...t
}) => /* @__PURE__ */ l.jsxDEV("div", { className: It("chat-wrapper__prompt-toolbar", e), ...t }, void 0, !1, {
  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
  lineNumber: 251,
  columnNumber: 3
}, void 0), Qp = ({
  className: e,
  ...t
}) => /* @__PURE__ */ l.jsxDEV("div", { className: It("chat-wrapper__prompt-tools", e), ...t }, void 0, !1, {
  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
  lineNumber: 262,
  columnNumber: 3
}, void 0), eh = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const o = t === "default" && (typeof r == "string" || Ot.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ l.jsxDEV(
    "button",
    {
      className: It(
        "chat-wrapper__prompt-button",
        `chat-wrapper__prompt-button--${e}`,
        `chat-wrapper__prompt-button--${o}`,
        n
      ),
      type: "button",
      ...i,
      children: r
    },
    void 0,
    !1,
    {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
      lineNumber: 287,
      columnNumber: 5
    },
    void 0
  );
}, th = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = kt.IDLE,
  children: i,
  disabled: o,
  ...s
}) => {
  const a = Nr(r);
  let u = a ? /* @__PURE__ */ l.jsxDEV(Kp, {}, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
    lineNumber: 321,
    columnNumber: 42
  }, void 0) : /* @__PURE__ */ l.jsxDEV(Yp, {}, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
    lineNumber: 321,
    columnNumber: 57
  }, void 0);
  return /* @__PURE__ */ l.jsxDEV(
    "button",
    {
      className: It(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${t}`,
        `chat-wrapper__prompt-submit--${n}`,
        !o && "chat-wrapper__prompt-submit--enabled",
        a && "chat-wrapper__prompt-submit--stop",
        e
      ),
      type: a ? "button" : "submit",
      disabled: o,
      ...s,
      children: i ?? u
    },
    void 0,
    !1,
    {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
      lineNumber: 324,
      columnNumber: 5
    },
    void 0
  );
}, Eh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ l.jsxDEV("select", { className: It("chat-wrapper__prompt-select", e), ...n, children: t }, void 0, !1, {
  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
  lineNumber: 351,
  columnNumber: 3
}, void 0), yh = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ l.jsxDEV(
  "button",
  {
    className: It("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  },
  void 0,
  !1,
  {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
    lineNumber: 364,
    columnNumber: 3
  },
  void 0
), vh = ({
  className: e,
  ...t
}) => /* @__PURE__ */ l.jsxDEV(
  "div",
  {
    className: It("chat-wrapper__prompt-select-content", e),
    ...t
  },
  void 0,
  !1,
  {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
    lineNumber: 380,
    columnNumber: 3
  },
  void 0
), Sh = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ l.jsxDEV(
  "div",
  {
    className: It("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  },
  void 0,
  !1,
  {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
    lineNumber: 396,
    columnNumber: 3
  },
  void 0
), Th = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ l.jsxDEV(
  "span",
  {
    className: It("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  },
  void 0,
  !1,
  {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/PromptInput.tsx",
    lineNumber: 413,
    columnNumber: 3
  },
  void 0
), nh = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = Ne(0), [o, s] = Ne(!1), [a, u] = Ne(0);
  return Le(() => {
    if (!t || e.length <= 1) return;
    const h = setInterval(() => {
      s(!0), setTimeout(() => {
        i((c) => (c + 1) % e.length), u((c) => c + 1), s(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(h);
  }, [t, e.length]), Le(() => {
    t || (i(0), s(!1), u(0));
  }, [t]), /* @__PURE__ */ l.jsxDEV(
    "div",
    {
      className: `animated-placeholder-container ${n}`,
      children: /* @__PURE__ */ l.jsxDEV(
        "span",
        {
          className: `animated-placeholder-text ${o ? "transitioning" : ""}`,
          children: e[r]
        },
        a,
        !1,
        {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/AnimatedPlaceholder.tsx",
          lineNumber: 49,
          columnNumber: 7
        },
        void 0
      )
    },
    void 0,
    !1,
    {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/AnimatedPlaceholder.tsx",
      lineNumber: 46,
      columnNumber: 5
    },
    void 0
  );
}, rh = Zn((e, t) => {
  const {
    placeholderTexts: n,
    isStreaming: r,
    isLoadingConversation: i,
    chatStatus: o,
    fileUploadEnabled: s,
    chipName: a,
    chipLogo: u,
    messages: h,
    onSubmit: c,
    onFileUpload: m,
    onStopGeneration: g,
    connectionState: f
  } = Dn(), E = r || i || f !== gt.CONNECTED, w = f === gt.CONNECTED, I = h.length > 0, [y, D] = Ne(""), [U, P] = Ne([]), [M, T] = Ne(!1), [K, q] = Ne(null), [ne, ae] = Ne(null), [X, G] = Ne(!1), _ = qe(null), L = ce((ee) => {
    if (ee.startsWith("data:image/") && ee.includes("thumbnailUrl=")) {
      const k = ee.match(/cdnUrl=([^;]+)/), de = ee.match(/filename=([^;]+)/), re = k ? decodeURIComponent(k[1]) : ee;
      return {
        // TODO: Switch back to thumbnailUrl when backend provides proper thumbnail URLs
        // Currently using cdnUrl for both thumbnail and full image display
        thumbnailUrl: re,
        // Using cdnUrl temporarily instead of thumbnailUrl
        cdnUrl: re,
        filename: de ? decodeURIComponent(de[1]) : "image"
      };
    }
    return {
      thumbnailUrl: ee,
      cdnUrl: ee,
      filename: "image"
    };
  }, []), B = ce(
    (ee) => {
      const { cdnUrl: k } = L(ee);
      ae(k), G(!0);
    },
    [L]
  ), ie = n && n.length > 0 ? n : ["What would you like to know?"], F = y.length === 0 && !I && ie.length > 1;
  po(t, () => ({
    focus: () => {
      var ee;
      (ee = _.current) == null || ee.focus();
    },
    setText: (ee) => {
      D(ee), setTimeout(() => {
        if (_.current) {
          _.current.focus();
          const k = ee.length;
          _.current.setSelectionRange(k, k);
        }
      }, 0);
    }
  }));
  const ve = ce(
    (ee) => {
      ee.preventDefault();
      const de = new FormData(ee.currentTarget).get("message");
      if (de != null && de.trim()) {
        const re = Gn(de.trim(), !1);
        if (!re.trim()) {
          console.warn("Message was blocked due to security concerns");
          return;
        }
        c(re, U), D(""), P([]);
      }
    },
    [c, U]
  ), Oe = ce(
    (ee) => {
      const de = ee.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      D(de);
    },
    []
  ), x = ce(
    async (ee) => {
      var re;
      const de = Array.from(((re = ee.clipboardData) == null ? void 0 : re.items) || []).filter((ue) => ue.type.startsWith("image/"));
      if (de.length > 0) {
        ee.preventDefault();
        try {
          T(!0), q(null);
          const ue = await Promise.all(
            de.map((Ee) => {
              const Q = Ee.getAsFile();
              return Q ? new File(
                [Q],
                `clipboard-image-${Date.now()}.${Q.type.split("/")[1]}`,
                {
                  type: Q.type
                }
              ) : null;
            })
          ).then((Ee) => Ee.filter(Boolean));
          if (ue.length > 0) {
            const Ee = ue.filter((Q) => Q.size > 10485760 ? (console.warn(
              `File too large: ${Q.name} (${Q.size} bytes)`
            ), q("Image too large. Maximum size is 10MB."), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ].includes(Q.type) ? !0 : (console.warn(
              `File type not allowed: ${Q.name} (${Q.type})`
            ), q(
              "Image type not supported. Please use JPEG, PNG, GIF, or WebP."
            ), !1));
            if (Ee.length > 0) {
              const Q = await m(Ee);
              P(Q), q(null);
            }
          }
        } catch (ue) {
          console.error("Clipboard paste error:", ue), q(
            ue instanceof Error ? ue.message : "Failed to paste image"
          );
        } finally {
          T(!1);
        }
      }
    },
    [m]
  ), le = ce(async () => {
    const ee = document.createElement("input");
    ee.type = "file", ee.accept = "image/*", ee.multiple = !1, ee.onchange = async (k) => {
      const de = k.target.files;
      if (de)
        try {
          T(!0), q(null);
          const re = Array.from(de).filter((ue) => {
            const Ee = _a(ue.name);
            return Ee !== ue.name && console.warn(
              `File name sanitized: ${ue.name} -> ${Ee}`
            ), ue.size > 10 * 1024 * 1024 ? (console.warn(`File too large: ${ue.name} (${ue.size} bytes)`), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ].includes(ue.type) ? !0 : (console.warn(
              `File type not allowed: ${ue.name} (${ue.type})`
            ), !1);
          });
          if (re.length > 0) {
            const ue = await m(re);
            P(ue), q(null);
          }
        } catch (re) {
          console.error("File upload error:", re), q(
            re instanceof Error ? re.message : "Upload failed"
          );
        } finally {
          T(!1);
        }
    }, ee.click();
  }, [m]);
  return /* @__PURE__ */ l.jsxDEV(
    Xp,
    {
      onSubmit: ve,
      style: { position: "relative" },
      className: E ? "chat-wrapper__prompt-input--disabled" : "",
      children: [
        /* @__PURE__ */ l.jsxDEV(
          gs,
          {
            ref: _,
            name: "message",
            value: y,
            onChange: Oe,
            onPaste: x,
            placeholder: "",
            disabled: E
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
            lineNumber: 323,
            columnNumber: 7
          },
          void 0
        ),
        !y.trim() && w && /* @__PURE__ */ l.jsxDEV(
          nh,
          {
            placeholderTexts: ie,
            shouldAnimate: F
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
            lineNumber: 335,
            columnNumber: 9
          },
          void 0
        ),
        M && /* @__PURE__ */ l.jsxDEV(
          "div",
          {
            style: {
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#f8fafc",
              border: "1px dashed #cbd5e1",
              borderRadius: "8px",
              margin: "8px 0"
            },
            children: [
              /* @__PURE__ */ l.jsxDEV(
                "div",
                {
                  style: {
                    width: "20px",
                    height: "20px",
                    border: "2px solid #e2e8f0",
                    borderTop: "2px solid #3b82f6",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }
                },
                void 0,
                !1,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                  lineNumber: 355,
                  columnNumber: 11
                },
                void 0
              ),
              /* @__PURE__ */ l.jsxDEV("span", { style: { color: "#64748b", fontSize: "14px" }, children: "Uploading image..." }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                lineNumber: 365,
                columnNumber: 11
              }, void 0)
            ]
          },
          void 0,
          !0,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
            lineNumber: 343,
            columnNumber: 9
          },
          void 0
        ),
        K && /* @__PURE__ */ l.jsxDEV(
          "div",
          {
            style: {
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              margin: "8px 0"
            },
            children: [
              /* @__PURE__ */ l.jsxDEV("span", { style: { color: "#ef4444", fontSize: "14px" }, children: [
                "❌ ",
                K
              ] }, void 0, !0, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                lineNumber: 385,
                columnNumber: 11
              }, void 0),
              /* @__PURE__ */ l.jsxDEV(
                "button",
                {
                  onClick: () => q(null),
                  style: {
                    marginLeft: "auto",
                    background: "none",
                    border: "none",
                    color: "#ef4444",
                    cursor: "pointer",
                    fontSize: "16px"
                  },
                  children: "×"
                },
                void 0,
                !1,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                  lineNumber: 388,
                  columnNumber: 11
                },
                void 0
              )
            ]
          },
          void 0,
          !0,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
            lineNumber: 373,
            columnNumber: 9
          },
          void 0
        ),
        U.length > 0 && /* @__PURE__ */ l.jsxDEV(
          "div",
          {
            style: {
              padding: "8px 16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center"
            },
            children: U.map((ee, k) => {
              const de = ee.startsWith("data:image/"), re = ee.startsWith("http://") || ee.startsWith("https://"), ue = de || re, Ee = ue ? L(ee) : null;
              return /* @__PURE__ */ l.jsxDEV(
                "div",
                {
                  style: {
                    position: "relative",
                    display: "inline-block"
                  },
                  children: [
                    ue ? /* @__PURE__ */ l.jsxDEV(
                      "div",
                      {
                        style: {
                          position: "relative",
                          width: "56px",
                          height: "56px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "1px solid #e2e8f0",
                          cursor: "pointer"
                        },
                        onClick: () => B(ee),
                        title: "Click to view full image",
                        children: [
                          /* @__PURE__ */ l.jsxDEV(
                            "img",
                            {
                              src: (Ee == null ? void 0 : Ee.thumbnailUrl) || ee,
                              alt: `Attachment ${k + 1}`,
                              style: {
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                              }
                            },
                            void 0,
                            !1,
                            {
                              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                              lineNumber: 448,
                              columnNumber: 21
                            },
                            void 0
                          ),
                          /* @__PURE__ */ l.jsxDEV(
                            "div",
                            {
                              style: {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                zIndex: 1
                              }
                            },
                            void 0,
                            !1,
                            {
                              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                              lineNumber: 458,
                              columnNumber: 21
                            },
                            void 0
                          ),
                          /* @__PURE__ */ l.jsxDEV(
                            "div",
                            {
                              style: {
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                color: "white",
                                fontSize: "16px",
                                zIndex: 2,
                                opacity: 0.8,
                                pointerEvents: "none"
                              }
                            },
                            void 0,
                            !1,
                            {
                              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                              lineNumber: 470,
                              columnNumber: 21
                            },
                            void 0
                          )
                        ]
                      },
                      void 0,
                      !0,
                      {
                        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                        lineNumber: 434,
                        columnNumber: 19
                      },
                      void 0
                    ) : /* @__PURE__ */ l.jsxDEV(
                      "div",
                      {
                        style: {
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#1f2937",
                          borderRadius: "12px",
                          padding: "8px 12px",
                          minWidth: "200px",
                          maxWidth: "300px"
                        },
                        children: [
                          /* @__PURE__ */ l.jsxDEV(
                            "div",
                            {
                              style: {
                                width: "40px",
                                height: "40px",
                                backgroundColor: "#8b5cf6",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "12px",
                                flexShrink: 0
                              },
                              children: /* @__PURE__ */ l.jsxDEV(
                                "svg",
                                {
                                  width: "24",
                                  height: "25",
                                  viewBox: "0 0 24 25",
                                  fill: "none",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  children: [
                                    /* @__PURE__ */ l.jsxDEV(
                                      "mask",
                                      {
                                        id: "mask0_190_623",
                                        style: { maskType: "alpha" },
                                        maskUnits: "userSpaceOnUse",
                                        x: "0",
                                        y: "0",
                                        width: "24",
                                        height: "25",
                                        children: /* @__PURE__ */ l.jsxDEV(
                                          "rect",
                                          {
                                            y: "0.354126",
                                            width: "24",
                                            height: "24",
                                            fill: "#D9D9D9"
                                          },
                                          void 0,
                                          !1,
                                          {
                                            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                                            lineNumber: 527,
                                            columnNumber: 27
                                          },
                                          void 0
                                        )
                                      },
                                      void 0,
                                      !1,
                                      {
                                        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                                        lineNumber: 518,
                                        columnNumber: 25
                                      },
                                      void 0
                                    ),
                                    /* @__PURE__ */ l.jsxDEV("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ l.jsxDEV(
                                      "path",
                                      {
                                        d: "M8.19225 13.0079H15.8077V11.5079H8.19225V13.0079ZM8.19225 15.8926H15.8077V14.3926H8.19225V15.8926ZM8.19225 18.7771H12.8077V17.2771H8.19225V18.7771ZM6.30775 21.8541C5.80258 21.8541 5.375 21.6791 5.025 21.3291C4.675 20.9791 4.5 20.5515 4.5 20.0464V4.66188C4.5 4.15671 4.675 3.72913 5.025 3.37913C5.375 3.02913 5.80258 2.85413 6.30775 2.85413H14.25L19.5 8.10413V20.0464C19.5 20.5515 19.325 20.9791 18.975 21.3291C18.625 21.6791 18.1974 21.8541 17.6923 21.8541H6.30775ZM13.5 8.85413V4.35413H6.30775C6.23075 4.35413 6.16025 4.38621 6.09625 4.45038C6.03208 4.51438 6 4.58488 6 4.66188V20.0464C6 20.1234 6.03208 20.1939 6.09625 20.2579C6.16025 20.322 6.23075 20.3541 6.30775 20.3541H17.6923C17.7692 20.3541 17.8398 20.322 17.9038 20.2579C17.9679 20.1939 18 20.1234 18 20.0464V8.85413H13.5Z",
                                        fill: "white"
                                      },
                                      void 0,
                                      !1,
                                      {
                                        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                                        lineNumber: 535,
                                        columnNumber: 27
                                      },
                                      void 0
                                    ) }, void 0, !1, {
                                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                                      lineNumber: 534,
                                      columnNumber: 25
                                    }, void 0)
                                  ]
                                },
                                void 0,
                                !0,
                                {
                                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                                  lineNumber: 511,
                                  columnNumber: 23
                                },
                                void 0
                              )
                            },
                            void 0,
                            !1,
                            {
                              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                              lineNumber: 498,
                              columnNumber: 21
                            },
                            void 0
                          ),
                          /* @__PURE__ */ l.jsxDEV("div", { style: { flex: 1, minWidth: 0 }, children: [
                            /* @__PURE__ */ l.jsxDEV(
                              "div",
                              {
                                style: {
                                  color: "white",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  marginBottom: "2px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  maxWidth: "100px"
                                },
                                children: (() => {
                                  const Q = ee.match(/name=([^;]+)/);
                                  return Q ? decodeURIComponent(Q[1]) : "document.pdf";
                                })()
                              },
                              void 0,
                              !1,
                              {
                                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                                lineNumber: 545,
                                columnNumber: 23
                              },
                              void 0
                            ),
                            /* @__PURE__ */ l.jsxDEV(
                              "div",
                              {
                                style: {
                                  color: "#9ca3af",
                                  fontSize: "12px",
                                  textTransform: "uppercase"
                                },
                                children: (() => {
                                  const Q = ee.match(/data:([^;]+)/);
                                  if (Q) {
                                    const Pe = Q[1];
                                    switch (Pe) {
                                      case "application/pdf":
                                        return "PDF";
                                      case "application/msword":
                                      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                                        return "DOC";
                                      case "application/vnd.ms-excel":
                                      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                                        return "XLS";
                                      case "application/vnd.ms-powerpoint":
                                      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                                        return "PPT";
                                      case "text/plain":
                                        return "TXT";
                                      case "text/csv":
                                        return "CSV";
                                      case "application/json":
                                        return "JSON";
                                      case "application/xml":
                                      case "text/xml":
                                        return "XML";
                                      case "application/zip":
                                        return "ZIP";
                                      case "application/x-rar-compressed":
                                        return "RAR";
                                      default:
                                        const we = Pe.split("/")[1];
                                        return we ? we.toUpperCase().substring(0, 4) : "FILE";
                                    }
                                  }
                                  return "FILE";
                                })()
                              },
                              void 0,
                              !1,
                              {
                                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                                lineNumber: 566,
                                columnNumber: 23
                              },
                              void 0
                            )
                          ] }, void 0, !0, {
                            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                            lineNumber: 544,
                            columnNumber: 21
                          }, void 0)
                        ]
                      },
                      void 0,
                      !0,
                      {
                        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                        lineNumber: 485,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ l.jsxDEV(
                      "button",
                      {
                        onClick: () => {
                          P(
                            (Q) => Q.filter((Pe, we) => we !== k)
                          ), K && q(null);
                        },
                        style: {
                          position: "absolute",
                          top: ue ? "6px" : "8px",
                          right: ue ? "6px" : "8px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "transparent",
                          border: "2px solid white",
                          color: "white",
                          fontSize: "14px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 2,
                          // Above the overlay
                          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                          fontWeight: "bold",
                          transition: "all 0.2s"
                        },
                        title: "Remove attachment",
                        children: "×"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                        lineNumber: 617,
                        columnNumber: 17
                      },
                      void 0
                    )
                  ]
                },
                k,
                !0,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                  lineNumber: 426,
                  columnNumber: 15
                },
                void 0
              );
            })
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
            lineNumber: 406,
            columnNumber: 9
          },
          void 0
        ),
        /* @__PURE__ */ l.jsxDEV(Jp, { children: [
          /* @__PURE__ */ l.jsxDEV(Qp, { children: [
            s && /* @__PURE__ */ l.jsxDEV(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center"
                },
                children: [
                  /* @__PURE__ */ l.jsxDEV(
                    eh,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: le,
                      title: M ? "Uploading..." : U.length > 0 ? `${U.length} image(s) attached` : "Attach image",
                      disabled: E || M,
                      style: {
                        position: "relative"
                      },
                      children: /* @__PURE__ */ l.jsxDEV(
                        "svg",
                        {
                          width: "36",
                          height: "37",
                          viewBox: "0 0 36 37",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                          children: [
                            /* @__PURE__ */ l.jsxDEV(
                              "rect",
                              {
                                y: "0.354126",
                                width: "36",
                                height: "36",
                                rx: "18",
                                fill: "#F4F6F8"
                              },
                              void 0,
                              !1,
                              {
                                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                                lineNumber: 689,
                                columnNumber: 19
                              },
                              void 0
                            ),
                            /* @__PURE__ */ l.jsxDEV("g", { clipPath: "url(#clip0_121_9706)", children: /* @__PURE__ */ l.jsxDEV(
                              "path",
                              {
                                d: "M21.3334 13.3541V22.9374C21.3334 24.7791 19.8417 26.2708 18 26.2708C16.1584 26.2708 14.6667 24.7791 14.6667 22.9374V12.5208C14.6667 11.3708 15.6 10.4374 16.75 10.4374C17.9 10.4374 18.8334 11.3708 18.8334 12.5208V21.2708C18.8334 21.7291 18.4584 22.1041 18 22.1041C17.5417 22.1041 17.1667 21.7291 17.1667 21.2708V13.3541H15.9167V21.2708C15.9167 22.4208 16.85 23.3541 18 23.3541C19.15 23.3541 20.0834 22.4208 20.0834 21.2708V12.5208C20.0834 10.6791 18.5917 9.18744 16.75 9.18744C14.9084 9.18744 13.4167 10.6791 13.4167 12.5208V22.9374C13.4167 25.4708 15.4667 27.5208 18 27.5208C20.5334 27.5208 22.5834 25.4708 22.5834 22.9374V13.3541H21.3334Z",
                                fill: "#212B36"
                              },
                              void 0,
                              !1,
                              {
                                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                                lineNumber: 697,
                                columnNumber: 21
                              },
                              void 0
                            ) }, void 0, !1, {
                              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                              lineNumber: 696,
                              columnNumber: 19
                            }, void 0),
                            /* @__PURE__ */ l.jsxDEV("defs", { children: /* @__PURE__ */ l.jsxDEV("clipPath", { id: "clip0_121_9706", children: /* @__PURE__ */ l.jsxDEV(
                              "rect",
                              {
                                width: "20",
                                height: "20",
                                fill: "white",
                                transform: "translate(8 8.35413)"
                              },
                              void 0,
                              !1,
                              {
                                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                                lineNumber: 704,
                                columnNumber: 23
                              },
                              void 0
                            ) }, void 0, !1, {
                              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                              lineNumber: 703,
                              columnNumber: 21
                            }, void 0) }, void 0, !1, {
                              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                              lineNumber: 702,
                              columnNumber: 19
                            }, void 0)
                          ]
                        },
                        void 0,
                        !0,
                        {
                          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                          lineNumber: 682,
                          columnNumber: 17
                        },
                        void 0
                      )
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                      lineNumber: 666,
                      columnNumber: 15
                    },
                    void 0
                  ),
                  /* @__PURE__ */ l.jsxDEV(
                    "span",
                    {
                      onClick: M ? void 0 : le,
                      style: {
                        fontSize: "12px",
                        color: M ? "#94a3b8" : "#919EAB",
                        marginLeft: "4px",
                        cursor: M ? "not-allowed" : "pointer"
                      },
                      children: M ? "Uploading..." : "Attach"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                      lineNumber: 714,
                      columnNumber: 15
                    },
                    void 0
                  )
                ]
              },
              void 0,
              !0,
              {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                lineNumber: 660,
                columnNumber: 13
              },
              void 0
            ),
            s && a && /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__divider" }, void 0, !1, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
              lineNumber: 728,
              columnNumber: 13
            }, void 0),
            a && /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__restaurant-chip", children: [
              u && /* @__PURE__ */ l.jsxDEV(
                "img",
                {
                  src: u,
                  alt: "Chip logo",
                  className: "chat-wrapper__restaurant-logo"
                },
                void 0,
                !1,
                {
                  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                  lineNumber: 733,
                  columnNumber: 17
                },
                void 0
              ),
              /* @__PURE__ */ l.jsxDEV("span", { className: "chat-wrapper__restaurant-name", children: a }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
                lineNumber: 739,
                columnNumber: 15
              }, void 0)
            ] }, void 0, !0, {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
              lineNumber: 731,
              columnNumber: 13
            }, void 0)
          ] }, void 0, !0, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
            lineNumber: 658,
            columnNumber: 9
          }, void 0),
          /* @__PURE__ */ l.jsxDEV(
            th,
            {
              status: o,
              disabled: Nr(o) ? !1 : !y.trim() || E,
              onClick: Nr(o) && g ? () => {
                g();
              } : void 0
            },
            void 0,
            !1,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
              lineNumber: 743,
              columnNumber: 9
            },
            void 0
          )
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
          lineNumber: 657,
          columnNumber: 7
        }, void 0),
        /* @__PURE__ */ l.jsxDEV(
          ds,
          {
            imageUrl: ne,
            isOpen: X,
            onClose: () => {
              G(!1), ae(null);
            },
            alt: "Image preview"
          },
          void 0,
          !1,
          {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
            lineNumber: 761,
            columnNumber: 7
          },
          void 0
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatInput.tsx",
      lineNumber: 318,
      columnNumber: 5
    },
    void 0
  );
}), ih = () => {
  const { suggestedPrompts: e, chatInputRef: t } = Dn();
  if (!e || e.length === 0)
    return null;
  const n = (r) => {
    t.current && t.current.setText(r.description);
  };
  return /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__suggested-prompts", children: [
    /* @__PURE__ */ l.jsxDEV("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SuggestedPrompts.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((r, i) => /* @__PURE__ */ l.jsxDEV(
      "button",
      {
        className: "chat-wrapper__suggested-prompt-card",
        onClick: () => n(r),
        children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__suggested-prompt-content", children: [
          /* @__PURE__ */ l.jsxDEV("h4", { className: "chat-wrapper__suggested-prompt-title", children: r.title }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SuggestedPrompts.tsx",
            lineNumber: 38,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ l.jsxDEV("p", { className: "chat-wrapper__suggested-prompt-description", children: r.description }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SuggestedPrompts.tsx",
            lineNumber: 41,
            columnNumber: 15
          }, void 0)
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SuggestedPrompts.tsx",
          lineNumber: 37,
          columnNumber: 13
        }, void 0)
      },
      i,
      !1,
      {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SuggestedPrompts.tsx",
        lineNumber: 32,
        columnNumber: 11
      },
      void 0
    )) }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SuggestedPrompts.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, void 0)
  ] }, void 0, !0, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/SuggestedPrompts.tsx",
    lineNumber: 28,
    columnNumber: 5
  }, void 0);
}, oh = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ l.jsxDEV(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ l.jsxDEV(us, { size: e, variant: "dots" }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/InlineLoader.tsx",
      lineNumber: 19,
      columnNumber: 9
    }, void 0) }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/InlineLoader.tsx",
      lineNumber: 18,
      columnNumber: 7
    }, void 0)
  },
  void 0,
  !1,
  {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/InlineLoader.tsx",
    lineNumber: 13,
    columnNumber: 5
  },
  void 0
), sh = ({
  headerName: e,
  headerDescription: t
}) => /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__main-header", children: [
  /* @__PURE__ */ l.jsxDEV("h1", { className: "chat-wrapper__main-title", children: e }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatMainHeader.tsx",
    lineNumber: 14,
    columnNumber: 7
  }, void 0),
  t && /* @__PURE__ */ l.jsxDEV("p", { className: "chat-wrapper__description", children: t }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatMainHeader.tsx",
    lineNumber: 16,
    columnNumber: 9
  }, void 0)
] }, void 0, !0, {
  fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatMainHeader.tsx",
  lineNumber: 13,
  columnNumber: 5
}, void 0), ah = () => {
  const {
    messages: e,
    isLoadingConversation: t,
    isStreaming: n,
    headerName: r,
    headerDescription: i,
    suggestedPrompts: o,
    messagesEndRef: s,
    chatInputRef: a,
    isOffline: u
    // conversationError,
  } = Dn(), h = Ut.state.shouldShowMainHeader(
    e.length,
    n,
    t
  ), c = Ut.state.shouldShowSuggestedPrompts(
    e.length,
    n,
    t,
    o
  ), m = Ut.state.getContentAreaClass(
    e.length,
    n,
    t
  );
  return /* @__PURE__ */ l.jsxDEV(l.Fragment, { children: [
    h && /* @__PURE__ */ l.jsxDEV("div", { style: u ? { paddingTop: "32px" } : void 0, children: /* @__PURE__ */ l.jsxDEV(
      sh,
      {
        headerName: r,
        headerDescription: i
      },
      void 0,
      !1,
      {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatContent.tsx",
        lineNumber: 56,
        columnNumber: 11
      },
      void 0
    ) }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatContent.tsx",
      lineNumber: 55,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ l.jsxDEV(
      "div",
      {
        className: m,
        style: u ? { paddingTop: "32px" } : void 0,
        children: [
          t && e.length === 0 ? /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ l.jsxDEV(oh, { fullHeight: !0 }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatContent.tsx",
            lineNumber: 71,
            columnNumber: 13
          }, void 0) }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatContent.tsx",
            lineNumber: 70,
            columnNumber: 11
          }, void 0) : /* @__PURE__ */ l.jsxDEV(fs, { ref: s }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatContent.tsx",
            lineNumber: 74,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ l.jsxDEV("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ l.jsxDEV(rh, { ref: a }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatContent.tsx",
            lineNumber: 79,
            columnNumber: 11
          }, void 0) }, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatContent.tsx",
            lineNumber: 78,
            columnNumber: 9
          }, void 0),
          c && /* @__PURE__ */ l.jsxDEV(ih, {}, void 0, !1, {
            fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatContent.tsx",
            lineNumber: 83,
            columnNumber: 40
          }, void 0)
        ]
      },
      void 0,
      !0,
      {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatContent.tsx",
        lineNumber: 64,
        columnNumber: 7
      },
      void 0
    )
  ] }, void 0, !0, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/chat/ChatContent.tsx",
    lineNumber: 52,
    columnNumber: 5
  }, void 0);
};
function lh({
  isVisible: e,
  isReconnecting: t = !1
}) {
  return e ? /* @__PURE__ */ l.jsxDEV("div", { className: "network-status-banner", children: /* @__PURE__ */ l.jsxDEV("div", { className: "network-status-banner__content", children: t ? /* @__PURE__ */ l.jsxDEV(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxDEV("div", { className: "network-status-banner__spinner" }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/NetworkStatusBanner.tsx",
      lineNumber: 21,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ l.jsxDEV("span", { children: "Reconnecting..." }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/NetworkStatusBanner.tsx",
      lineNumber: 22,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/NetworkStatusBanner.tsx",
    lineNumber: 20,
    columnNumber: 11
  }, this) : /* @__PURE__ */ l.jsxDEV(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxDEV("div", { className: "network-status-banner__icon", children: "⚠️" }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/NetworkStatusBanner.tsx",
      lineNumber: 26,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ l.jsxDEV("span", { children: "No internet connection" }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/NetworkStatusBanner.tsx",
      lineNumber: 27,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/NetworkStatusBanner.tsx",
    lineNumber: 25,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/NetworkStatusBanner.tsx",
    lineNumber: 18,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/NetworkStatusBanner.tsx",
    lineNumber: 17,
    columnNumber: 5
  }, this) : null;
}
const ks = Zn(
  ({
    // Authentication and entity context
    auth: e,
    // Server configuration
    chatServerUrl: t,
    chatServerKey: n,
    // Conversation configuration
    metadata: r,
    // Existing props
    config: i,
    tools: o,
    devMode: s = !1,
    contextHelpers: a
  }, u) => {
    var Qt, Gt;
    const { token: h, entityId: c, entityType: m } = e;
    Ut.validation.validateAuthProps({
      userMpAuthToken: h,
      chatServerUrl: t,
      chatServerKey: n
    });
    const g = Fe(() => Ut.url.convertWebSocketToHttp(t), [t]), f = Fe(
      () => new Wa({
        apiUrl: g,
        userMpAuthToken: h,
        chatServerKey: n
      }),
      [g, h, n]
    ), E = Fe(() => o && o.length > 0 ? o.map(({ execute: j, ...be }) => be) : [], [o]), w = Ua(), { isOnline: I, wasOffline: y } = Pa(), D = qe(!0), U = oe((j) => j.isModalOpen), P = oe((j) => j.isCollapsed), M = oe((j) => j.currentMode), T = oe((j) => j.openModal), K = oe((j) => j.closeModal), q = oe((j) => j.toggleCollapse), ne = oe((j) => j.toggleFullscreen), ae = oe((j) => j.setCurrentMode), X = oe((j) => j.chatStatus), G = oe((j) => j.setChatStatus), _ = oe((j) => j.streamingStatus), L = oe((j) => j.setStreamingStatus), B = oe(
      (j) => j.isLoadingConversation
    ), ie = oe(
      (j) => j.setIsLoadingConversation
    ), F = oe((j) => j.conversationError), ve = oe(
      (j) => j.setConversationError
    ), Oe = oe((j) => j.setCurrentThreadId), x = oe((j) => j.providerResId), le = oe((j) => j.setProviderResId), ee = oe((j) => j.isDevSettingsOpen), k = oe(
      (j) => j.setIsDevSettingsOpen
    ), de = oe((j) => j.isStreaming), re = oe((j) => j.setIsStreaming), ue = oe((j) => j.isThinking), Ee = oe((j) => j.setIsThinking), Q = oe((j) => j.streamingContent), Pe = oe((j) => j.isHandlingTool);
    Le(() => {
      i.mode && ae(i.mode);
    }, [i.mode, ae]), Le(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const j = (be) => {
        be.key === "Escape" && M === "modal" && U && K();
      };
      if (M === "modal" && U)
        return document.addEventListener("keydown", j), () => document.removeEventListener("keydown", j);
    }, [M, U, K]);
    const {
      messages: we,
      setMessages: Ae,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: et,
      getReasoningStatus: tt,
      getReasoningDuration: yt,
      getReasoningContentOnly: He,
      getReasoningTitle: nt,
      getToolingTitle: xt,
      getToolingStatus: lt,
      handleSetMessage: ct,
      handleReasoningUpdate: vt,
      handleChatFinished: Pt,
      handleChatError: St,
      stopGeneration: zt
    } = w, Tt = qe(null), Ye = qe(null), v = qe(null), S = ce(
      (j) => {
        le(j.providerResId), Oe(j.threadId), j.canUpdateMetadata && r && Object.keys(r).length > 0 && v.current && v.current.updateMetadata(j.providerResId, { metadata: r }).then(() => {
          console.log("[ChatWrapper] ✅ Metadata update successful");
        }).catch((be) => {
          console.error(
            "[ChatWrapper] ❌ Failed to update metadata:",
            be
          );
        });
      },
      [le, Oe, r]
    ), H = ce(
      (j) => {
        var be, b;
        switch (console.log("[ChatWrapper] System event received:", j), j.type) {
          case Ct.CHAT_COMPLETED:
            (be = j.data) != null && be.conversationId && le(j.data.conversationId), Pt(), G(kt.IDLE), L(ln.IDLE), setTimeout(() => {
              var O;
              (O = Ye.current) == null || O.focus();
            }, 0);
            break;
          case Ct.CHAT_ERROR:
            (b = j.data) != null && b.error && St(j.data.error);
            break;
          case Ct.CONNECTION_LOST:
            break;
          case Ct.CONNECTION_RESTORED:
            break;
          case Ct.RECONNECTING:
            break;
        }
      },
      [
        Pt,
        St,
        le,
        Oe
      ]
    ), {
      chatClient: Z,
      connectionState: pe,
      // reconnectAttempts: reconnectAttempt,
      connectChatClient: Se
    } = ia({
      // Authentication and server properties
      userMpAuthToken: h,
      chatServerUrl: t,
      chatServerKey: n,
      // Entity configuration
      entityId: c,
      entityType: m,
      // Tools configuration
      tools: o,
      // Other properties
      contextHelpers: a,
      onSetMessage: ct,
      onSystemEvent: H,
      onReasoningUpdate: vt,
      onThreadCreated: S
    });
    Le(() => {
      v.current = Z;
    }, [Z]), La({
      metadata: r,
      chatClient: Z,
      currentProviderResId: x,
      isLoadingConversation: B,
      messages: we,
      entityId: c,
      entityType: m
    }), Le(() => {
      y && I && D.current ? (console.log(
        "[ChatWrapper] Network restored, attempting reconnection..."
      ), Se().catch((j) => {
        const be = pn(
          j,
          "NetworkReconnection"
        );
        D.current = be.isRetryable, be.isRetryable || console.warn(
          `[ChatWrapper] Network reconnection failed with non-retryable error: ${be.reason}`
        );
      })) : y && I && !D.current && console.warn(
        "[ChatWrapper] Network restored but last error was non-retryable (CORS/auth), skipping reconnection"
      );
    }, [I, y, Se]);
    const rt = ce(() => {
      zt(), G(kt.IDLE), L(ln.IDLE), Z && x ? (console.log(
        "[ChatWrapper] Sending stop_run message for conversation:",
        x
      ), Z.stopRun(x)) : console.warn(
        "[ChatWrapper] Cannot send stop_run: missing chatClient or currentProviderResId"
      );
    }, [
      zt,
      Z,
      x,
      G,
      L
    ]);
    po(
      u,
      () => ({
        updateMetadata: (j) => {
          if (!Z) {
            console.warn(
              "ChatWrapper: Cannot update metadata - chat client not initialized"
            );
            return;
          }
          if (!x) {
            console.warn(
              "ChatWrapper: Cannot update metadata - no active conversation (providerResId not set)"
            );
            return;
          }
          Z.updateMetadata(x, j).catch((be) => {
            console.error(
              "ChatWrapper: Failed to update thread metadata:",
              be
            );
          });
        }
      }),
      [Z, x]
    );
    const We = Fe(
      () => Z ? new Va(Z, {
        onError: i.onError
      }) : null,
      [Z, i.onError]
    ), {
      resetConversationLoader: it
      /*, reloadConversation*/
    } = Aa({
      entityId: c,
      entityType: m,
      httpApiUrl: g,
      userMpAuthToken: h,
      chatServerKey: n,
      messages: we,
      setMessages: Ae,
      setIsLoadingConversation: ie,
      setConversationError: ve,
      setCurrentThreadId: Oe,
      setProviderResId: le,
      metadata: r
    }), Ie = qe(null), Te = ce(() => {
      Ie.current && cancelAnimationFrame(Ie.current), Ie.current = requestAnimationFrame(() => {
        var j;
        (j = Tt.current) == null || j.scrollIntoView({ behavior: "smooth" }), Ie.current = null;
      });
    }, []);
    Le(() => {
      Te();
    }, [we, Te]), Le(() => {
      Q && Te();
    }, [Q, Te]), Le(() => {
      i.onStreamingStatusChange && i.onStreamingStatusChange(_);
    }, [_, i]), Le(() => () => {
      Ie.current && cancelAnimationFrame(Ie.current);
    }, []);
    const Ke = ce(
      async (j, be) => {
        if (!j.trim() || de || !We || !Z)
          return;
        re(!0), Ee(!0), G(kt.SUBMITTED), L(ln.STARTING);
        const b = We.createUserMessage(
          j,
          be
        );
        Ae((O) => [...O, b]);
        try {
          await Z.onTriggerMessage({
            message: b.content,
            media: be,
            providerResId: x || void 0
          }), G(kt.STREAMING);
        } catch (O) {
          Ee(!1), G(kt.ERROR), Ae(
            (W) => W.map(
              (te) => te.id === b.id ? {
                ...te,
                hasError: !0,
                errorMessage: pe !== gt.CONNECTED ? "Failed to send message." : O instanceof Error ? O.message : "Failed to send message"
              } : te
            )
          ), re(!1), G(kt.IDLE), L(ln.IDLE);
        }
      },
      [
        We,
        Z,
        de,
        pe,
        Ae,
        re,
        Ee,
        G,
        L,
        x
      ]
    ), ze = ce(
      async (j) => await f.uploadFiles(j),
      [f]
    ), Yt = Fe(
      () => Ut.css.getContainerClasses(
        M,
        i.position,
        i.theme,
        P,
        i.constrainedHeight
      ),
      [
        M,
        i.position,
        i.theme,
        P,
        i.constrainedHeight
      ]
    ), Wt = ce(() => {
      M === "modal" ? T() : q();
    }, [M, T, q]), ut = ce(() => {
      k(!0);
    }, [k]), Bt = ce(
      (j) => {
        Ye.current && Ye.current.setText(j.description);
      },
      []
    ), Nt = Fe(
      () => ({
        messages: we,
        isStreaming: de,
        isThinking: ue,
        isHandlingTool: Pe
      }),
      [we, de, ue, Pe]
    ), Kt = Fe(
      () => ({
        isLoadingConversation: B,
        chatStatus: X,
        conversationError: F,
        isOffline: !I,
        connectionState: pe
      }),
      [
        B,
        X,
        F,
        I,
        pe
      ]
    ), rn = Fe(
      () => {
        var j;
        return {
          headerName: i.headerName,
          headerDescription: i.headerDescription,
          placeholderTexts: i.placeholderTexts,
          chipName: i.chipName,
          chipLogo: i.chipLogo,
          suggestedPrompts: i.suggestedPrompts,
          clientTools: E,
          fileUploadEnabled: (j = i.features) == null ? void 0 : j.fileUpload
        };
      },
      [
        i.headerName,
        i.headerDescription,
        i.placeholderTexts,
        i.chipName,
        i.chipLogo,
        i.suggestedPrompts,
        (Qt = i.features) == null ? void 0 : Qt.fileUpload,
        E
      ]
    ), je = Fe(
      () => ({
        getReasoningTitle: nt,
        getReasoningStatus: tt,
        getReasoningDuration: yt,
        getReasoningContentOnly: He,
        getToolingTitle: xt,
        getToolingStatus: lt
      }),
      [
        nt,
        tt,
        yt,
        He,
        xt,
        lt
      ]
    ), _t = ce(
      async (j) => {
        const be = we.find((b) => b.id === j);
        if (be) {
          Ae((b) => b.map(
            (O) => O.id === j ? {
              ...O,
              hasError: !1,
              isRetrying: !0,
              errorMessage: void 0
            } : O
          ));
          try {
            it(), await Se(), await (Z == null ? void 0 : Z.onTriggerMessage({
              message: be.content,
              media: be.media,
              providerResId: x || void 0
            })), Ae(
              (b) => b.map(
                (O) => O.id === j ? { ...O, isRetrying: !1 } : O
              )
            );
          } catch (b) {
            Ae(
              (O) => O.map(
                (W) => W.id === j ? {
                  ...W,
                  isRetrying: !1,
                  hasError: !0,
                  errorMessage: b instanceof Error ? b.message : "Retry failed"
                } : W
              )
            );
          }
        }
      },
      [
        we,
        Ae,
        it,
        Se,
        Ke
      ]
    ), Xt = Fe(
      () => ({
        onSubmit: Ke,
        onFileUpload: ze,
        onStopGeneration: rt,
        onPromptSelect: Bt,
        onRetryMessage: _t
      }),
      [
        Ke,
        ze,
        rt,
        Bt,
        _t
      ]
    ), Jt = Fe(
      () => ({
        ...Nt,
        ...Kt,
        ...rn,
        ...je,
        ...Xt,
        currentAssistantMessageIdRef: et,
        messagesEndRef: Tt,
        chatInputRef: Ye
      }),
      [
        Nt,
        Kt,
        rn,
        je,
        Xt,
        et,
        Tt,
        Ye
      ]
    );
    return Fe(
      () => Ut.state.shouldShowBubble(
        M,
        U,
        P
      ),
      [M, U, P]
    ) ? /* @__PURE__ */ l.jsxDEV(ki, { children: /* @__PURE__ */ l.jsxDEV(
      Ka,
      {
        mode: M,
        headerName: i.headerName,
        bubbleText: i.bubbleText,
        showBubbleText: ((Gt = i.features) == null ? void 0 : Gt.showBubbleText) !== !1,
        onClick: Wt
      },
      void 0,
      !1,
      {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatWrapper.tsx",
        lineNumber: 842,
        columnNumber: 11
      },
      void 0
    ) }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatWrapper.tsx",
      lineNumber: 841,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ l.jsxDEV(ki, { children: /* @__PURE__ */ l.jsxDEV(
      za,
      {
        onError: (j) => {
          console.error("WebSocket error in ChatWrapper:", j), i.onError && i.onError(j);
        },
        children: /* @__PURE__ */ l.jsxDEV("div", { className: Yt, style: i.customStyles, children: [
          /* @__PURE__ */ l.jsxDEV(
            lh,
            {
              isVisible: !I,
              isReconnecting: pe === gt.RECONNECTING
            },
            void 0,
            !1,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatWrapper.tsx",
              lineNumber: 864,
              columnNumber: 13
            },
            void 0
          ),
          s && i.headerVisible === !1 && /* @__PURE__ */ l.jsxDEV(
            "button",
            {
              className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
              onClick: ut,
              title: "Developer Settings",
              children: /* @__PURE__ */ l.jsxDEV(Eo, { size: 16 }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatWrapper.tsx",
                lineNumber: 885,
                columnNumber: 17
              }, void 0)
            },
            void 0,
            !1,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatWrapper.tsx",
              lineNumber: 880,
              columnNumber: 15
            },
            void 0
          ),
          Ut.state.shouldShowHeader(i.headerVisible) && /* @__PURE__ */ l.jsxDEV(
            Xa,
            {
              headerName: i.headerName,
              mode: M,
              isCollapsed: P,
              isModalOpen: U,
              devMode: s,
              onClose: K,
              onToggleFullscreen: ne,
              onToggleCollapse: q,
              onOpenSettings: ut
            },
            void 0,
            !1,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatWrapper.tsx",
              lineNumber: 891,
              columnNumber: 15
            },
            void 0
          ),
          !P && /* @__PURE__ */ l.jsxDEV(
            Ba,
            {
              onError: (j) => {
                console.error("File upload error:", j), i.onError && i.onError(j);
              },
              children: /* @__PURE__ */ l.jsxDEV($p, { value: Jt, children: /* @__PURE__ */ l.jsxDEV(ah, {}, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatWrapper.tsx",
                lineNumber: 915,
                columnNumber: 19
              }, void 0) }, void 0, !1, {
                fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatWrapper.tsx",
                lineNumber: 914,
                columnNumber: 17
              }, void 0)
            },
            void 0,
            !1,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatWrapper.tsx",
              lineNumber: 906,
              columnNumber: 15
            },
            void 0
          ),
          /* @__PURE__ */ l.jsxDEV(
            qs,
            {
              isOpen: ee,
              onClose: () => k(!1),
              apiUrl: g,
              userMpAuthToken: h,
              chatServerKey: n
            },
            void 0,
            !1,
            {
              fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatWrapper.tsx",
              lineNumber: 921,
              columnNumber: 13
            },
            void 0
          )
        ] }, void 0, !0, {
          fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatWrapper.tsx",
          lineNumber: 863,
          columnNumber: 11
        }, void 0)
      },
      void 0,
      !1,
      {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatWrapper.tsx",
        lineNumber: 855,
        columnNumber: 9
      },
      void 0
    ) }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ChatWrapper.tsx",
      lineNumber: 854,
      columnNumber: 7
    }, void 0);
  }
);
ks.displayName = "ChatWrapperContainer";
const _h = uo(ks);
function Dh({
  isConnected: e,
  isConnecting: t = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 1 / 0,
  onRetry: o,
  autoHideDuration: s = 3e3
}) {
  const [a, u] = Ne("hidden"), [h, c] = Ne(!1);
  if (Le(() => {
    console.log("[ConnectionNotification] State update:", {
      isConnected: e,
      isConnecting: t,
      isReconnecting: n,
      reconnectAttempt: r,
      wasDisconnected: h,
      currentState: a
    }), t ? u("connecting") : !e && !n ? (c(!0), i !== 1 / 0 && r >= i ? u("error") : u("hidden")) : n ? (console.log("[ConnectionNotification] Setting state to RECONNECTING"), u("reconnecting")) : e && h ? (u("hidden"), c(!1)) : e && !h && u("hidden");
  }, [e, t, n, r, i, h, s]), a === "hidden")
    return null;
  const m = () => {
    o && o();
  }, f = (() => {
    switch (a) {
      case "connecting":
        return {
          icon: "🔄",
          title: "Connecting...",
          message: "Establishing connection to the server"
        };
      case "reconnecting":
        return {
          icon: "🔄",
          title: "Reconnecting...",
          message: i === 1 / 0 ? `Attempting to restore connection (${r})` : `Attempting to restore connection (${r}/${i})`
        };
      case "error":
        return {
          icon: "❌",
          title: "Connection Failed",
          message: "Unable to connect to the server. Please check your internet connection and try again."
        };
      default:
        return null;
    }
  })();
  return f ? a === "connecting" ? /* @__PURE__ */ l.jsxDEV("div", { className: `connection-notification connection-notification--${a}`, children: /* @__PURE__ */ l.jsxDEV("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ l.jsxDEV("div", { className: "connection-notification__bubble" }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
      lineNumber: 139,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ l.jsxDEV("div", { className: "connection-notification__bubble" }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
      lineNumber: 140,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ l.jsxDEV("div", { className: "connection-notification__bubble" }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
      lineNumber: 141,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
    lineNumber: 138,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
    lineNumber: 137,
    columnNumber: 7
  }, this) : a === "reconnecting" ? (console.log("[ConnectionNotification] RENDERING RECONNECTING BANNER", { reconnectAttempt: r }), /* @__PURE__ */ l.jsxDEV("div", { className: `connection-notification connection-notification--banner connection-notification--${a}`, children: /* @__PURE__ */ l.jsxDEV("div", { className: "connection-notification__banner-content", children: [
    /* @__PURE__ */ l.jsxDEV("span", { className: "connection-notification__banner-spinner" }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
      lineNumber: 153,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ l.jsxDEV("span", { className: "connection-notification__banner-text", children: [
      "Reconnecting... (attempt ",
      r,
      ")"
    ] }, void 0, !0, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
      lineNumber: 154,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
    lineNumber: 152,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
    lineNumber: 151,
    columnNumber: 7
  }, this)) : /* @__PURE__ */ l.jsxDEV("div", { className: `connection-notification connection-notification--${a}`, children: /* @__PURE__ */ l.jsxDEV("div", { className: "connection-notification__content", children: [
    /* @__PURE__ */ l.jsxDEV("div", { className: "connection-notification__icon", children: f.icon }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
      lineNumber: 166,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ l.jsxDEV("div", { className: "connection-notification__title", children: f.title }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
      lineNumber: 167,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ l.jsxDEV("div", { className: "connection-notification__message", children: f.message }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
      lineNumber: 168,
      columnNumber: 9
    }, this),
    o && /* @__PURE__ */ l.jsxDEV("div", { className: "connection-notification__actions", children: /* @__PURE__ */ l.jsxDEV(
      "button",
      {
        className: "connection-notification__retry-btn primary",
        onClick: m,
        children: "Try Again"
      },
      void 0,
      !1,
      {
        fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
        lineNumber: 172,
        columnNumber: 13
      },
      this
    ) }, void 0, !1, {
      fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
      lineNumber: 171,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
    lineNumber: 165,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/Users/jack-ho/Working/Oddle/coding/oddle-wrapper-chat-ui/src/components/ConnectionNotification.tsx",
    lineNumber: 164,
    columnNumber: 5
  }, this) : null;
}
export {
  nh as AnimatedPlaceholder,
  kt as CHAT_STATUS,
  Ga as ChatIcon,
  _h as ChatWrapper,
  $a as CloseIcon,
  Za as CollapseIcon,
  Dh as ConnectionNotification,
  Ya as CopyIcon,
  qs as DevSettings,
  Ts as EntityType,
  qa as FullscreenIcon,
  oh as InlineLoader,
  us as Loader,
  Je as PROCESSING_STATUS,
  Xp as PromptInput,
  eh as PromptInputButton,
  Eh as PromptInputModelSelect,
  vh as PromptInputModelSelectContent,
  Sh as PromptInputModelSelectItem,
  yh as PromptInputModelSelectTrigger,
  Th as PromptInputModelSelectValue,
  th as PromptInputSubmit,
  gs as PromptInputTextarea,
  Jp as PromptInputToolbar,
  Qp as PromptInputTools,
  Hp as Reasoning,
  cs as ReasoningContent,
  ls as ReasoningTrigger,
  ln as STREAMING_STATUS,
  Eo as SettingsIcon,
  ih as SuggestedPrompts,
  Os as fetchThreadMessages,
  Nr as isChatActive,
  hh as isChatError,
  ph as isChatIdle,
  mh as isProcessingActive,
  fh as isProcessingComplete,
  gh as isProcessingError,
  ho as updateThread,
  mo as updateThreadMetadata,
  bh as useChatState,
  xh as useConversationState,
  Ch as useDevState,
  kh as useLayoutState,
  Nh as useThreadState,
  wh as useUIState,
  oe as useUIStore
};
