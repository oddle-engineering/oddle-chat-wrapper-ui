var va = Object.defineProperty;
var La = (e, t, n) => t in e ? va(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var oe = (e, t, n) => La(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as d, jsxs as I, Fragment as Qt } from "react/jsx-runtime";
import Dt, { forwardRef as rr, useState as ne, useEffect as et, useRef as Tt, useImperativeHandle as Ma, useCallback as se, memo as Li, useMemo as It } from "react";
const Ue = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, Gn = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, Ae = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, Mc = (e) => e === Ue.SUBMITTED || e === Ue.STREAMING, Oc = (e) => e === Ue.IDLE, Dc = (e) => e === Ue.ERROR, Pc = (e) => e === Ae.PROCESSING, Hc = (e) => e === Ae.COMPLETED, Uc = (e) => e === Ae.ERROR, tt = (...e) => e.filter(Boolean).join(" "), Oa = () => /* @__PURE__ */ I(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ I("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ d(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ d("g", { clipPath: "url(#clip0_121_23927)", children: /* @__PURE__ */ d(
          "path",
          {
            d: "M16.3333 26.3541L18.2133 28.2341L25.6666 20.7941V37.0208H28.3333V20.7941L35.7733 28.2474L37.6666 26.3541L26.9999 15.6874L16.3333 26.3541Z",
            fill: "white"
          }
        ) })
      ] }),
      /* @__PURE__ */ I("defs", { children: [
        /* @__PURE__ */ I(
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
              /* @__PURE__ */ d("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ d(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ d("feOffset", { dy: "1" }),
              /* @__PURE__ */ d("feGaussianBlur", { stdDeviation: "1" }),
              /* @__PURE__ */ d("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ d(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                }
              ),
              /* @__PURE__ */ d(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ d(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ d("feOffset", { dy: "1" }),
              /* @__PURE__ */ d("feGaussianBlur", { stdDeviation: "1.5" }),
              /* @__PURE__ */ d("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ d(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                }
              ),
              /* @__PURE__ */ d(
                "feBlend",
                {
                  mode: "normal",
                  in2: "effect1_dropShadow_121_23927",
                  result: "effect2_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ d(
                "feBlend",
                {
                  mode: "normal",
                  in: "SourceGraphic",
                  in2: "effect2_dropShadow_121_23927",
                  result: "shape"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ d("clipPath", { id: "clip0_121_23927", children: /* @__PURE__ */ d(
          "rect",
          {
            width: "32",
            height: "32",
            fill: "white",
            transform: "translate(11 10.3541)"
          }
        ) })
      ] })
    ]
  }
), Da = ({ className: e, ...t }) => /* @__PURE__ */ d("form", { className: tt("chat-wrapper__prompt-input", e), ...t }), Mi = rr(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...o
  }, l) => {
    const s = (c) => {
      if (c.key === "Enter") {
        if (c.shiftKey)
          return;
        c.preventDefault();
        const u = c.currentTarget.form;
        if (u) {
          const p = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          u.dispatchEvent(p);
        }
      }
      a == null || a(c);
    };
    return /* @__PURE__ */ d(
      "textarea",
      {
        ref: l,
        className: tt("chat-wrapper__prompt-textarea", t),
        name: "message",
        onChange: e,
        onKeyDown: s,
        placeholder: n,
        style: {
          minHeight: `${r}px`,
          maxHeight: `${i}px`
        },
        ...o
      }
    );
  }
);
Mi.displayName = "PromptInputTextarea";
const Pa = ({
  className: e,
  ...t
}) => /* @__PURE__ */ d("div", { className: tt("chat-wrapper__prompt-toolbar", e), ...t }), Ha = ({
  className: e,
  ...t
}) => /* @__PURE__ */ d("div", { className: tt("chat-wrapper__prompt-tools", e), ...t }), Ua = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || Dt.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ d(
    "button",
    {
      className: tt(
        "chat-wrapper__prompt-button",
        `chat-wrapper__prompt-button--${e}`,
        `chat-wrapper__prompt-button--${a}`,
        n
      ),
      type: "button",
      ...i,
      children: r
    }
  );
}, Fa = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = Ue.IDLE,
  children: i,
  disabled: a,
  ...o
}) => {
  let l = /* @__PURE__ */ d(Oa, {});
  const s = a || r === Ue.SUBMITTED || r === Ue.STREAMING;
  return /* @__PURE__ */ d(
    "button",
    {
      className: tt(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${t}`,
        `chat-wrapper__prompt-submit--${n}`,
        // status === "streaming" && "chat-wrapper__prompt-submit--stop",
        e
      ),
      type: "submit",
      disabled: s,
      ...o,
      children: i ?? l
    }
  );
}, Fc = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ d("select", { className: tt("chat-wrapper__prompt-select", e), ...n, children: t }), zc = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ d(
  "button",
  {
    className: tt("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), Bc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ d(
  "div",
  {
    className: tt("chat-wrapper__prompt-select-content", e),
    ...t
  }
), Gc = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ d(
  "div",
  {
    className: tt("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), Vc = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ d(
  "span",
  {
    className: tt("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), za = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = ne(0), [a, o] = ne(!1), [l, s] = ne(0);
  return et(() => {
    if (!t || e.length <= 1) return;
    const c = setInterval(() => {
      o(!0), setTimeout(() => {
        i((u) => (u + 1) % e.length), s((u) => u + 1), o(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(c);
  }, [t, e.length]), et(() => {
    t || (i(0), o(!1), s(0));
  }, [t]), /* @__PURE__ */ d(
    "div",
    {
      className: `animated-placeholder-container ${n}`,
      children: /* @__PURE__ */ d(
        "span",
        {
          className: `animated-placeholder-text ${a ? "transitioning" : ""}`,
          children: e[r]
        },
        l
      )
    }
  );
};
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: Oi,
  setPrototypeOf: vr,
  isFrozen: Ba,
  getPrototypeOf: Ga,
  getOwnPropertyDescriptor: Va
} = Object;
let {
  freeze: ve,
  seal: Ye,
  create: Vn
} = Object, {
  apply: jn,
  construct: $n
} = typeof Reflect < "u" && Reflect;
ve || (ve = function(t) {
  return t;
});
Ye || (Ye = function(t) {
  return t;
});
jn || (jn = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
$n || ($n = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const nn = Le(Array.prototype.forEach), ja = Le(Array.prototype.lastIndexOf), Lr = Le(Array.prototype.pop), Gt = Le(Array.prototype.push), $a = Le(Array.prototype.splice), sn = Le(String.prototype.toLowerCase), kn = Le(String.prototype.toString), bn = Le(String.prototype.match), Vt = Le(String.prototype.replace), Wa = Le(String.prototype.indexOf), Za = Le(String.prototype.trim), Qe = Le(Object.prototype.hasOwnProperty), Ne = Le(RegExp.prototype.test), jt = qa(TypeError);
function Le(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return jn(e, t, r);
  };
}
function qa(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return $n(e, n);
  };
}
function J(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : sn;
  vr && vr(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (Ba(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function Xa(e) {
  for (let t = 0; t < e.length; t++)
    Qe(e, t) || (e[t] = null);
  return e;
}
function mt(e) {
  const t = Vn(null);
  for (const [n, r] of Oi(e))
    Qe(e, n) && (Array.isArray(r) ? t[n] = Xa(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = mt(r) : t[n] = r);
  return t;
}
function $t(e, t) {
  for (; e !== null; ) {
    const r = Va(e, t);
    if (r) {
      if (r.get)
        return Le(r.get);
      if (typeof r.value == "function")
        return Le(r.value);
    }
    e = Ga(e);
  }
  function n() {
    return null;
  }
  return n;
}
const Mr = ve(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), An = ve(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), In = ve(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Ya = ve(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Rn = ve(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Ka = ve(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Or = ve(["#text"]), Dr = ve(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Nn = ve(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Pr = ve(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), rn = ve(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Qa = Ye(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Ja = Ye(/<%[\w\W]*|[\w\W]*%>/gm), eo = Ye(/\$\{[\w\W]*/gm), to = Ye(/^data-[\-\w.\u00B7-\uFFFF]+$/), no = Ye(/^aria-[\-\w]+$/), Di = Ye(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), ro = Ye(/^(?:\w+script|data):/i), io = Ye(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Pi = Ye(/^html$/i), ao = Ye(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Hr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: no,
  ATTR_WHITESPACE: io,
  CUSTOM_ELEMENT: ao,
  DATA_ATTR: to,
  DOCTYPE_NAME: Pi,
  ERB_EXPR: Ja,
  IS_ALLOWED_URI: Di,
  IS_SCRIPT_OR_DATA: ro,
  MUSTACHE_EXPR: Qa,
  TMPLIT_EXPR: eo
});
const Wt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, oo = function() {
  return typeof window > "u" ? null : window;
}, lo = function(t, n) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let r = null;
  const i = "data-tt-policy-suffix";
  n && n.hasAttribute(i) && (r = n.getAttribute(i));
  const a = "dompurify" + (r ? "#" + r : "");
  try {
    return t.createPolicy(a, {
      createHTML(o) {
        return o;
      },
      createScriptURL(o) {
        return o;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + a + " could not be created."), null;
  }
}, Ur = function() {
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
function Hi() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : oo();
  const t = (O) => Hi(O);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== Wt.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: o,
    Node: l,
    Element: s,
    NodeFilter: c,
    NamedNodeMap: u = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: p,
    DOMParser: g,
    trustedTypes: h
  } = e, y = s.prototype, S = $t(y, "cloneNode"), R = $t(y, "remove"), _ = $t(y, "nextSibling"), H = $t(y, "childNodes"), N = $t(y, "parentNode");
  if (typeof o == "function") {
    const O = n.createElement("template");
    O.content && O.content.ownerDocument && (n = O.content.ownerDocument);
  }
  let P, j = "";
  const {
    implementation: w,
    createNodeIterator: D,
    createDocumentFragment: Z,
    getElementsByTagName: z
  } = n, {
    importNode: U
  } = r;
  let b = Ur();
  t.isSupported = typeof Oi == "function" && typeof N == "function" && w && w.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: v,
    ERB_EXPR: Q,
    TMPLIT_EXPR: M,
    DATA_ATTR: A,
    ARIA_ATTR: ee,
    IS_SCRIPT_OR_DATA: Y,
    ATTR_WHITESPACE: ue,
    CUSTOM_ELEMENT: me
  } = Hr;
  let {
    IS_ALLOWED_URI: f
  } = Hr, te = null;
  const ge = J({}, [...Mr, ...An, ...In, ...Rn, ...Or]);
  let m = null;
  const le = J({}, [...Dr, ...Nn, ...Pr, ...rn]);
  let V = Object.seal(Vn(null, {
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
  })), q = null, ae = null;
  const de = Object.seal(Vn(null, {
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
  let Se = !0, Re = !0, ut = !1, vt = !0, je = !1, Ct = !0, $e = !1, ct = !1, yt = !1, Ke = !1, We = !1, ht = !1, wt = !0, bt = !1;
  const nt = "user-content-";
  let rt = !0, pt = !1, E = {}, k = null;
  const F = J({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let X = null;
  const re = J({}, ["audio", "video", "img", "source", "image", "track"]);
  let xe = null;
  const Ze = J({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), ke = "http://www.w3.org/1998/Math/MathML", Be = "http://www.w3.org/2000/svg", K = "http://www.w3.org/1999/xhtml";
  let $ = K, Ce = !1, pe = null;
  const Me = J({}, [ke, Be, K], kn);
  let it = J({}, ["mi", "mo", "mn", "ms", "mtext"]), Oe = J({}, ["annotation-xml"]);
  const Et = J({}, ["title", "style", "font", "a", "script"]);
  let qe = null;
  const Bt = ["application/xhtml+xml", "text/html"], Sn = "text/html";
  let ye = null, Lt = null;
  const Ia = n.createElement("form"), wr = function(C) {
    return C instanceof RegExp || C instanceof Function;
  }, _n = function() {
    let C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Lt && Lt === C)) {
      if ((!C || typeof C != "object") && (C = {}), C = mt(C), qe = // eslint-disable-next-line unicorn/prefer-includes
      Bt.indexOf(C.PARSER_MEDIA_TYPE) === -1 ? Sn : C.PARSER_MEDIA_TYPE, ye = qe === "application/xhtml+xml" ? kn : sn, te = Qe(C, "ALLOWED_TAGS") ? J({}, C.ALLOWED_TAGS, ye) : ge, m = Qe(C, "ALLOWED_ATTR") ? J({}, C.ALLOWED_ATTR, ye) : le, pe = Qe(C, "ALLOWED_NAMESPACES") ? J({}, C.ALLOWED_NAMESPACES, kn) : Me, xe = Qe(C, "ADD_URI_SAFE_ATTR") ? J(mt(Ze), C.ADD_URI_SAFE_ATTR, ye) : Ze, X = Qe(C, "ADD_DATA_URI_TAGS") ? J(mt(re), C.ADD_DATA_URI_TAGS, ye) : re, k = Qe(C, "FORBID_CONTENTS") ? J({}, C.FORBID_CONTENTS, ye) : F, q = Qe(C, "FORBID_TAGS") ? J({}, C.FORBID_TAGS, ye) : mt({}), ae = Qe(C, "FORBID_ATTR") ? J({}, C.FORBID_ATTR, ye) : mt({}), E = Qe(C, "USE_PROFILES") ? C.USE_PROFILES : !1, Se = C.ALLOW_ARIA_ATTR !== !1, Re = C.ALLOW_DATA_ATTR !== !1, ut = C.ALLOW_UNKNOWN_PROTOCOLS || !1, vt = C.ALLOW_SELF_CLOSE_IN_ATTR !== !1, je = C.SAFE_FOR_TEMPLATES || !1, Ct = C.SAFE_FOR_XML !== !1, $e = C.WHOLE_DOCUMENT || !1, Ke = C.RETURN_DOM || !1, We = C.RETURN_DOM_FRAGMENT || !1, ht = C.RETURN_TRUSTED_TYPE || !1, yt = C.FORCE_BODY || !1, wt = C.SANITIZE_DOM !== !1, bt = C.SANITIZE_NAMED_PROPS || !1, rt = C.KEEP_CONTENT !== !1, pt = C.IN_PLACE || !1, f = C.ALLOWED_URI_REGEXP || Di, $ = C.NAMESPACE || K, it = C.MATHML_TEXT_INTEGRATION_POINTS || it, Oe = C.HTML_INTEGRATION_POINTS || Oe, V = C.CUSTOM_ELEMENT_HANDLING || {}, C.CUSTOM_ELEMENT_HANDLING && wr(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (V.tagNameCheck = C.CUSTOM_ELEMENT_HANDLING.tagNameCheck), C.CUSTOM_ELEMENT_HANDLING && wr(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (V.attributeNameCheck = C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), C.CUSTOM_ELEMENT_HANDLING && typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (V.allowCustomizedBuiltInElements = C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), je && (Re = !1), We && (Ke = !0), E && (te = J({}, Or), m = [], E.html === !0 && (J(te, Mr), J(m, Dr)), E.svg === !0 && (J(te, An), J(m, Nn), J(m, rn)), E.svgFilters === !0 && (J(te, In), J(m, Nn), J(m, rn)), E.mathMl === !0 && (J(te, Rn), J(m, Pr), J(m, rn))), C.ADD_TAGS && (typeof C.ADD_TAGS == "function" ? de.tagCheck = C.ADD_TAGS : (te === ge && (te = mt(te)), J(te, C.ADD_TAGS, ye))), C.ADD_ATTR && (typeof C.ADD_ATTR == "function" ? de.attributeCheck = C.ADD_ATTR : (m === le && (m = mt(m)), J(m, C.ADD_ATTR, ye))), C.ADD_URI_SAFE_ATTR && J(xe, C.ADD_URI_SAFE_ATTR, ye), C.FORBID_CONTENTS && (k === F && (k = mt(k)), J(k, C.FORBID_CONTENTS, ye)), rt && (te["#text"] = !0), $e && J(te, ["html", "head", "body"]), te.table && (J(te, ["tbody"]), delete q.tbody), C.TRUSTED_TYPES_POLICY) {
        if (typeof C.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw jt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof C.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw jt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        P = C.TRUSTED_TYPES_POLICY, j = P.createHTML("");
      } else
        P === void 0 && (P = lo(h, i)), P !== null && typeof j == "string" && (j = P.createHTML(""));
      ve && ve(C), Lt = C;
    }
  }, Er = J({}, [...An, ...In, ...Ya]), Sr = J({}, [...Rn, ...Ka]), Ra = function(C) {
    let T = N(C);
    (!T || !T.tagName) && (T = {
      namespaceURI: $,
      tagName: "template"
    });
    const L = sn(C.tagName), fe = sn(T.tagName);
    return pe[C.namespaceURI] ? C.namespaceURI === Be ? T.namespaceURI === K ? L === "svg" : T.namespaceURI === ke ? L === "svg" && (fe === "annotation-xml" || it[fe]) : !!Er[L] : C.namespaceURI === ke ? T.namespaceURI === K ? L === "math" : T.namespaceURI === Be ? L === "math" && Oe[fe] : !!Sr[L] : C.namespaceURI === K ? T.namespaceURI === Be && !Oe[fe] || T.namespaceURI === ke && !it[fe] ? !1 : !Sr[L] && (Et[L] || !Er[L]) : !!(qe === "application/xhtml+xml" && pe[C.namespaceURI]) : !1;
  }, at = function(C) {
    Gt(t.removed, {
      element: C
    });
    try {
      N(C).removeChild(C);
    } catch {
      R(C);
    }
  }, At = function(C, T) {
    try {
      Gt(t.removed, {
        attribute: T.getAttributeNode(C),
        from: T
      });
    } catch {
      Gt(t.removed, {
        attribute: null,
        from: T
      });
    }
    if (T.removeAttribute(C), C === "is")
      if (Ke || We)
        try {
          at(T);
        } catch {
        }
      else
        try {
          T.setAttribute(C, "");
        } catch {
        }
  }, _r = function(C) {
    let T = null, L = null;
    if (yt)
      C = "<remove></remove>" + C;
    else {
      const we = bn(C, /^[\r\n\t ]+/);
      L = we && we[0];
    }
    qe === "application/xhtml+xml" && $ === K && (C = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + C + "</body></html>");
    const fe = P ? P.createHTML(C) : C;
    if ($ === K)
      try {
        T = new g().parseFromString(fe, qe);
      } catch {
      }
    if (!T || !T.documentElement) {
      T = w.createDocument($, "template", null);
      try {
        T.documentElement.innerHTML = Ce ? j : fe;
      } catch {
      }
    }
    const be = T.body || T.documentElement;
    return C && L && be.insertBefore(n.createTextNode(L), be.childNodes[0] || null), $ === K ? z.call(T, $e ? "html" : "body")[0] : $e ? T.documentElement : be;
  }, xr = function(C) {
    return D.call(
      C.ownerDocument || C,
      C,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, xn = function(C) {
    return C instanceof p && (typeof C.nodeName != "string" || typeof C.textContent != "string" || typeof C.removeChild != "function" || !(C.attributes instanceof u) || typeof C.removeAttribute != "function" || typeof C.setAttribute != "function" || typeof C.namespaceURI != "string" || typeof C.insertBefore != "function" || typeof C.hasChildNodes != "function");
  }, Tr = function(C) {
    return typeof l == "function" && C instanceof l;
  };
  function dt(O, C, T) {
    nn(O, (L) => {
      L.call(t, C, T, Lt);
    });
  }
  const kr = function(C) {
    let T = null;
    if (dt(b.beforeSanitizeElements, C, null), xn(C))
      return at(C), !0;
    const L = ye(C.nodeName);
    if (dt(b.uponSanitizeElement, C, {
      tagName: L,
      allowedTags: te
    }), Ct && C.hasChildNodes() && !Tr(C.firstElementChild) && Ne(/<[/\w!]/g, C.innerHTML) && Ne(/<[/\w!]/g, C.textContent) || C.nodeType === Wt.progressingInstruction || Ct && C.nodeType === Wt.comment && Ne(/<[/\w]/g, C.data))
      return at(C), !0;
    if (!(de.tagCheck instanceof Function && de.tagCheck(L)) && (!te[L] || q[L])) {
      if (!q[L] && Ar(L) && (V.tagNameCheck instanceof RegExp && Ne(V.tagNameCheck, L) || V.tagNameCheck instanceof Function && V.tagNameCheck(L)))
        return !1;
      if (rt && !k[L]) {
        const fe = N(C) || C.parentNode, be = H(C) || C.childNodes;
        if (be && fe) {
          const we = be.length;
          for (let De = we - 1; De >= 0; --De) {
            const ft = S(be[De], !0);
            ft.__removalCount = (C.__removalCount || 0) + 1, fe.insertBefore(ft, _(C));
          }
        }
      }
      return at(C), !0;
    }
    return C instanceof s && !Ra(C) || (L === "noscript" || L === "noembed" || L === "noframes") && Ne(/<\/no(script|embed|frames)/i, C.innerHTML) ? (at(C), !0) : (je && C.nodeType === Wt.text && (T = C.textContent, nn([v, Q, M], (fe) => {
      T = Vt(T, fe, " ");
    }), C.textContent !== T && (Gt(t.removed, {
      element: C.cloneNode()
    }), C.textContent = T)), dt(b.afterSanitizeElements, C, null), !1);
  }, br = function(C, T, L) {
    if (wt && (T === "id" || T === "name") && (L in n || L in Ia))
      return !1;
    if (!(Re && !ae[T] && Ne(A, T))) {
      if (!(Se && Ne(ee, T))) {
        if (!(de.attributeCheck instanceof Function && de.attributeCheck(T, C))) {
          if (!m[T] || ae[T]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Ar(C) && (V.tagNameCheck instanceof RegExp && Ne(V.tagNameCheck, C) || V.tagNameCheck instanceof Function && V.tagNameCheck(C)) && (V.attributeNameCheck instanceof RegExp && Ne(V.attributeNameCheck, T) || V.attributeNameCheck instanceof Function && V.attributeNameCheck(T, C)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              T === "is" && V.allowCustomizedBuiltInElements && (V.tagNameCheck instanceof RegExp && Ne(V.tagNameCheck, L) || V.tagNameCheck instanceof Function && V.tagNameCheck(L)))
            ) return !1;
          } else if (!xe[T]) {
            if (!Ne(f, Vt(L, ue, ""))) {
              if (!((T === "src" || T === "xlink:href" || T === "href") && C !== "script" && Wa(L, "data:") === 0 && X[C])) {
                if (!(ut && !Ne(Y, Vt(L, ue, "")))) {
                  if (L)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Ar = function(C) {
    return C !== "annotation-xml" && bn(C, me);
  }, Ir = function(C) {
    dt(b.beforeSanitizeAttributes, C, null);
    const {
      attributes: T
    } = C;
    if (!T || xn(C))
      return;
    const L = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: m,
      forceKeepAttr: void 0
    };
    let fe = T.length;
    for (; fe--; ) {
      const be = T[fe], {
        name: we,
        namespaceURI: De,
        value: ft
      } = be, Mt = ye(we), Tn = ft;
      let Te = we === "value" ? Tn : Za(Tn);
      if (L.attrName = Mt, L.attrValue = Te, L.keepAttr = !0, L.forceKeepAttr = void 0, dt(b.uponSanitizeAttribute, C, L), Te = L.attrValue, bt && (Mt === "id" || Mt === "name") && (At(we, C), Te = nt + Te), Ct && Ne(/((--!?|])>)|<\/(style|title|textarea)/i, Te)) {
        At(we, C);
        continue;
      }
      if (Mt === "attributename" && bn(Te, "href")) {
        At(we, C);
        continue;
      }
      if (L.forceKeepAttr)
        continue;
      if (!L.keepAttr) {
        At(we, C);
        continue;
      }
      if (!vt && Ne(/\/>/i, Te)) {
        At(we, C);
        continue;
      }
      je && nn([v, Q, M], (Nr) => {
        Te = Vt(Te, Nr, " ");
      });
      const Rr = ye(C.nodeName);
      if (!br(Rr, Mt, Te)) {
        At(we, C);
        continue;
      }
      if (P && typeof h == "object" && typeof h.getAttributeType == "function" && !De)
        switch (h.getAttributeType(Rr, Mt)) {
          case "TrustedHTML": {
            Te = P.createHTML(Te);
            break;
          }
          case "TrustedScriptURL": {
            Te = P.createScriptURL(Te);
            break;
          }
        }
      if (Te !== Tn)
        try {
          De ? C.setAttributeNS(De, we, Te) : C.setAttribute(we, Te), xn(C) ? at(C) : Lr(t.removed);
        } catch {
          At(we, C);
        }
    }
    dt(b.afterSanitizeAttributes, C, null);
  }, Na = function O(C) {
    let T = null;
    const L = xr(C);
    for (dt(b.beforeSanitizeShadowDOM, C, null); T = L.nextNode(); )
      dt(b.uponSanitizeShadowNode, T, null), kr(T), Ir(T), T.content instanceof a && O(T.content);
    dt(b.afterSanitizeShadowDOM, C, null);
  };
  return t.sanitize = function(O) {
    let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, T = null, L = null, fe = null, be = null;
    if (Ce = !O, Ce && (O = "<!-->"), typeof O != "string" && !Tr(O))
      if (typeof O.toString == "function") {
        if (O = O.toString(), typeof O != "string")
          throw jt("dirty is not a string, aborting");
      } else
        throw jt("toString is not a function");
    if (!t.isSupported)
      return O;
    if (ct || _n(C), t.removed = [], typeof O == "string" && (pt = !1), pt) {
      if (O.nodeName) {
        const ft = ye(O.nodeName);
        if (!te[ft] || q[ft])
          throw jt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (O instanceof l)
      T = _r("<!---->"), L = T.ownerDocument.importNode(O, !0), L.nodeType === Wt.element && L.nodeName === "BODY" || L.nodeName === "HTML" ? T = L : T.appendChild(L);
    else {
      if (!Ke && !je && !$e && // eslint-disable-next-line unicorn/prefer-includes
      O.indexOf("<") === -1)
        return P && ht ? P.createHTML(O) : O;
      if (T = _r(O), !T)
        return Ke ? null : ht ? j : "";
    }
    T && yt && at(T.firstChild);
    const we = xr(pt ? O : T);
    for (; fe = we.nextNode(); )
      kr(fe), Ir(fe), fe.content instanceof a && Na(fe.content);
    if (pt)
      return O;
    if (Ke) {
      if (We)
        for (be = Z.call(T.ownerDocument); T.firstChild; )
          be.appendChild(T.firstChild);
      else
        be = T;
      return (m.shadowroot || m.shadowrootmode) && (be = U.call(r, be, !0)), be;
    }
    let De = $e ? T.outerHTML : T.innerHTML;
    return $e && te["!doctype"] && T.ownerDocument && T.ownerDocument.doctype && T.ownerDocument.doctype.name && Ne(Pi, T.ownerDocument.doctype.name) && (De = "<!DOCTYPE " + T.ownerDocument.doctype.name + `>
` + De), je && nn([v, Q, M], (ft) => {
      De = Vt(De, ft, " ");
    }), P && ht ? P.createHTML(De) : De;
  }, t.setConfig = function() {
    let O = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _n(O), ct = !0;
  }, t.clearConfig = function() {
    Lt = null, ct = !1;
  }, t.isValidAttribute = function(O, C, T) {
    Lt || _n({});
    const L = ye(O), fe = ye(C);
    return br(L, fe, T);
  }, t.addHook = function(O, C) {
    typeof C == "function" && Gt(b[O], C);
  }, t.removeHook = function(O, C) {
    if (C !== void 0) {
      const T = ja(b[O], C);
      return T === -1 ? void 0 : $a(b[O], T, 1)[0];
    }
    return Lr(b[O]);
  }, t.removeHooks = function(O) {
    b[O] = [];
  }, t.removeAllHooks = function() {
    b = Ur();
  }, t;
}
var so = Hi();
function uo(e) {
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
function un(e, t = !1) {
  return e;
}
function co(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function Fr(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || uo(e));
  } catch {
    return !1;
  }
}
function ho() {
  so.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !Fr(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !Fr(n) && e.removeAttribute("src");
    }
  });
}
ho();
const po = rr(
  ({
    placeholder: e = "What would you like to know?",
    placeholderTexts: t,
    disabled: n = !1,
    chatStatus: r,
    fileUploadEnabled: i = !1,
    restaurantName: a,
    restaurantLogo: o,
    hasMessages: l = !1,
    onSubmit: s,
    onFileUpload: c,
    onStopGeneration: u
  }, p) => {
    const [g, h] = ne(""), [y, S] = ne([]), R = Tt(null), _ = t && t.length > 0 ? t : [e], H = g.length === 0 && !l && _.length > 1;
    Ma(p, () => ({
      focus: () => {
        var w;
        (w = R.current) == null || w.focus();
      },
      setText: (w) => {
        h(w), setTimeout(() => {
          var D;
          (D = R.current) == null || D.focus();
        }, 0);
      }
    }));
    const N = se(
      (w) => {
        w.preventDefault();
        const Z = new FormData(w.currentTarget).get("message");
        if (Z != null && Z.trim()) {
          const z = un(Z.trim(), !1);
          if (!z.trim()) {
            console.warn("Message was blocked due to security concerns");
            return;
          }
          s(z, y), h(""), S([]);
        }
      },
      [s, y]
    ), P = se(
      (w) => {
        const Z = w.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
        h(Z);
      },
      []
    ), j = se(async () => {
      const w = document.createElement("input");
      w.type = "file", w.accept = "image/*", w.multiple = !1, w.onchange = async (D) => {
        const Z = D.target.files;
        if (Z) {
          const z = Array.from(Z).filter((U) => {
            const b = co(U.name);
            return b !== U.name && console.warn(
              `File name sanitized: ${U.name} -> ${b}`
            ), U.size > 10485760 ? (console.warn(`File too large: ${U.name} (${U.size} bytes)`), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ].includes(U.type) ? !0 : (console.warn(
              `File type not allowed: ${U.name} (${U.type})`
            ), !1);
          });
          if (z.length > 0) {
            const U = await c(z);
            S(U);
          }
        }
      }, w.click();
    }, [c]);
    return /* @__PURE__ */ I(Da, { onSubmit: N, style: { position: "relative" }, children: [
      /* @__PURE__ */ d(
        Mi,
        {
          ref: R,
          name: "message",
          value: g,
          onChange: P,
          placeholder: "",
          disabled: n
        }
      ),
      !g.trim() && /* @__PURE__ */ d(
        za,
        {
          placeholderTexts: _,
          shouldAnimate: H
        }
      ),
      y.length > 0 && /* @__PURE__ */ d(
        "div",
        {
          style: {
            padding: "8px 16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center"
          },
          children: y.map((w, D) => {
            const Z = w.startsWith("data:image/"), z = w.startsWith("http://") || w.startsWith("https://"), U = Z || z;
            return /* @__PURE__ */ I(
              "div",
              {
                style: {
                  position: "relative",
                  display: "inline-block"
                },
                children: [
                  U ? /* @__PURE__ */ I(
                    "div",
                    {
                      style: {
                        position: "relative",
                        width: "56px",
                        height: "56px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid #e2e8f0"
                      },
                      children: [
                        /* @__PURE__ */ d(
                          "img",
                          {
                            src: w,
                            alt: `Attachment ${D + 1}`,
                            style: {
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }
                          }
                        ),
                        /* @__PURE__ */ d(
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
                          }
                        )
                      ]
                    }
                  ) : /* @__PURE__ */ I(
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
                        /* @__PURE__ */ d(
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
                            children: /* @__PURE__ */ I(
                              "svg",
                              {
                                width: "24",
                                height: "25",
                                viewBox: "0 0 24 25",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: [
                                  /* @__PURE__ */ d(
                                    "mask",
                                    {
                                      id: "mask0_190_623",
                                      style: { maskType: "alpha" },
                                      maskUnits: "userSpaceOnUse",
                                      x: "0",
                                      y: "0",
                                      width: "24",
                                      height: "25",
                                      children: /* @__PURE__ */ d(
                                        "rect",
                                        {
                                          y: "0.354126",
                                          width: "24",
                                          height: "24",
                                          fill: "#D9D9D9"
                                        }
                                      )
                                    }
                                  ),
                                  /* @__PURE__ */ d("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ d(
                                    "path",
                                    {
                                      d: "M8.19225 13.0079H15.8077V11.5079H8.19225V13.0079ZM8.19225 15.8926H15.8077V14.3926H8.19225V15.8926ZM8.19225 18.7771H12.8077V17.2771H8.19225V18.7771ZM6.30775 21.8541C5.80258 21.8541 5.375 21.6791 5.025 21.3291C4.675 20.9791 4.5 20.5515 4.5 20.0464V4.66188C4.5 4.15671 4.675 3.72913 5.025 3.37913C5.375 3.02913 5.80258 2.85413 6.30775 2.85413H14.25L19.5 8.10413V20.0464C19.5 20.5515 19.325 20.9791 18.975 21.3291C18.625 21.6791 18.1974 21.8541 17.6923 21.8541H6.30775ZM13.5 8.85413V4.35413H6.30775C6.23075 4.35413 6.16025 4.38621 6.09625 4.45038C6.03208 4.51438 6 4.58488 6 4.66188V20.0464C6 20.1234 6.03208 20.1939 6.09625 20.2579C6.16025 20.322 6.23075 20.3541 6.30775 20.3541H17.6923C17.7692 20.3541 17.8398 20.322 17.9038 20.2579C17.9679 20.1939 18 20.1234 18 20.0464V8.85413H13.5Z",
                                      fill: "white"
                                    }
                                  ) })
                                ]
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ I("div", { style: { flex: 1, minWidth: 0 }, children: [
                          /* @__PURE__ */ d(
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
                                const b = w.match(/name=([^;]+)/);
                                return b ? decodeURIComponent(b[1]) : "document.pdf";
                              })()
                            }
                          ),
                          /* @__PURE__ */ d(
                            "div",
                            {
                              style: {
                                color: "#9ca3af",
                                fontSize: "12px",
                                textTransform: "uppercase"
                              },
                              children: (() => {
                                const b = w.match(/data:([^;]+)/);
                                if (b) {
                                  const v = b[1];
                                  switch (v) {
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
                                      const Q = v.split("/")[1];
                                      return Q ? Q.toUpperCase().substring(0, 4) : "FILE";
                                  }
                                }
                                return "FILE";
                              })()
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ d(
                    "button",
                    {
                      onClick: () => {
                        S(
                          (b) => b.filter((v, Q) => Q !== D)
                        );
                      },
                      style: {
                        position: "absolute",
                        top: U ? "6px" : "8px",
                        right: U ? "6px" : "8px",
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
                    }
                  )
                ]
              },
              D
            );
          })
        }
      ),
      /* @__PURE__ */ I(Pa, { children: [
        /* @__PURE__ */ I(Ha, { children: [
          i && /* @__PURE__ */ I(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center"
              },
              children: [
                /* @__PURE__ */ d(
                  Ua,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: j,
                    title: y.length > 0 ? `${y.length} image(s) attached` : "Attach image",
                    disabled: n,
                    style: {
                      position: "relative"
                    },
                    children: /* @__PURE__ */ I(
                      "svg",
                      {
                        width: "36",
                        height: "37",
                        viewBox: "0 0 36 37",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [
                          /* @__PURE__ */ d(
                            "rect",
                            {
                              y: "0.354126",
                              width: "36",
                              height: "36",
                              rx: "18",
                              fill: "#F4F6F8"
                            }
                          ),
                          /* @__PURE__ */ d("g", { "clip-path": "url(#clip0_121_9706)", children: /* @__PURE__ */ d(
                            "path",
                            {
                              d: "M21.3334 13.3541V22.9374C21.3334 24.7791 19.8417 26.2708 18 26.2708C16.1584 26.2708 14.6667 24.7791 14.6667 22.9374V12.5208C14.6667 11.3708 15.6 10.4374 16.75 10.4374C17.9 10.4374 18.8334 11.3708 18.8334 12.5208V21.2708C18.8334 21.7291 18.4584 22.1041 18 22.1041C17.5417 22.1041 17.1667 21.7291 17.1667 21.2708V13.3541H15.9167V21.2708C15.9167 22.4208 16.85 23.3541 18 23.3541C19.15 23.3541 20.0834 22.4208 20.0834 21.2708V12.5208C20.0834 10.6791 18.5917 9.18744 16.75 9.18744C14.9084 9.18744 13.4167 10.6791 13.4167 12.5208V22.9374C13.4167 25.4708 15.4667 27.5208 18 27.5208C20.5334 27.5208 22.5834 25.4708 22.5834 22.9374V13.3541H21.3334Z",
                              fill: "#212B36"
                            }
                          ) }),
                          /* @__PURE__ */ d("defs", { children: /* @__PURE__ */ d("clipPath", { id: "clip0_121_9706", children: /* @__PURE__ */ d(
                            "rect",
                            {
                              width: "20",
                              height: "20",
                              fill: "white",
                              transform: "translate(8 8.35413)"
                            }
                          ) }) })
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ d(
                  "span",
                  {
                    onClick: j,
                    style: {
                      fontSize: "12px",
                      color: "#919EAB",
                      marginLeft: "4px",
                      cursor: "pointer"
                    },
                    children: "Attach"
                  }
                )
              ]
            }
          ),
          i && a && /* @__PURE__ */ d("div", { className: "chat-wrapper__divider" }),
          a && /* @__PURE__ */ I("div", { className: "chat-wrapper__restaurant-chip", children: [
            o && /* @__PURE__ */ d(
              "img",
              {
                src: o,
                alt: "Restaurant logo",
                className: "chat-wrapper__restaurant-logo"
              }
            ),
            /* @__PURE__ */ d("span", { className: "chat-wrapper__restaurant-name", children: a })
          ] })
        ] }),
        /* @__PURE__ */ d(
          Fa,
          {
            status: r,
            disabled: !g.trim() && r !== Ue.STREAMING,
            onClick: r === Ue.STREAMING && u ? () => {
              u();
            } : void 0
          }
        )
      ] })
    ] });
  }
), fo = ({
  prompts: e,
  onPromptSelect: t
}) => /* @__PURE__ */ I("div", { className: "chat-wrapper__suggested-prompts", children: [
  /* @__PURE__ */ d("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
  /* @__PURE__ */ d("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((n, r) => /* @__PURE__ */ d(
    "button",
    {
      className: "chat-wrapper__suggested-prompt-card",
      onClick: () => t(n),
      children: /* @__PURE__ */ I("div", { className: "chat-wrapper__suggested-prompt-content", children: [
        /* @__PURE__ */ d("h4", { className: "chat-wrapper__suggested-prompt-title", children: n.title }),
        /* @__PURE__ */ d("p", { className: "chat-wrapper__suggested-prompt-description", children: n.description })
      ] })
    },
    r
  )) })
] });
function Ui({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ I("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ d("span", {}),
    /* @__PURE__ */ d("span", {}),
    /* @__PURE__ */ d("span", {})
  ] }) : t === "pulse" ? /* @__PURE__ */ d(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ d(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: e, height: e }
    }
  );
}
const mo = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ d(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ d("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ d(Ui, { size: e, variant: "dots" }) })
  }
);
async function go(e, t) {
  const n = await fetch(`${e}/agent-configurations/${t}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!n.ok) {
    const i = await n.json().catch(() => ({}));
    throw new Error(
      i.message || `Failed to get agent configuration: ${n.statusText}`
    );
  }
  return (await n.json()).configuration;
}
async function Co(e, t, n) {
  const r = await fetch(`${e}/agent-configurations/${t}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(n)
  });
  if (!r.ok) {
    const a = await r.json().catch(() => ({}));
    throw new Error(
      a.message || `Failed to update agent configuration: ${r.statusText}`
    );
  }
  return (await r.json()).configuration;
}
const yo = ({
  isOpen: e,
  onClose: t,
  app: n,
  apiUrl: r
}) => {
  const [i, a] = ne(null), [o, l] = ne(""), [s, c] = ne(""), [u, p] = ne(!1), [g, h] = ne(null);
  et(() => {
    e && !i && y();
  }, [e]);
  const y = se(async () => {
    p(!0), h(null);
    try {
      const _ = await go(r, n);
      a(_), l(_.promptPath), c(_.versionUuid);
    } catch (_) {
      h(_ instanceof Error ? _.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", _);
    } finally {
      p(!1);
    }
  }, [r, n]), S = se(async () => {
    if (i) {
      p(!0), h(null);
      try {
        const _ = await Co(r, n, {
          promptPath: o,
          versionUuid: s,
          isDefault: i.isDefault
        });
        a(_), t(), window.location.reload();
      } catch (_) {
        h(_ instanceof Error ? _.message : "Failed to update configuration"), console.error("Error updating agent configuration:", _);
      } finally {
        p(!1);
      }
    }
  }, [r, n, o, s, i, t]), R = se(() => {
    i && (l(i.promptPath), c(i.versionUuid)), h(null), t();
  }, [i, t]);
  return e ? /* @__PURE__ */ d("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ d("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ d(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: R,
          title: "Close settings",
          children: /* @__PURE__ */ d(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ d(
                "path",
                {
                  d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
                  fill: "currentColor"
                }
              )
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-content", children: [
      u && /* @__PURE__ */ d("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      g && /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ I("p", { children: [
          "Error: ",
          g
        ] }),
        /* @__PURE__ */ d(
          "button",
          {
            onClick: y,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      i && !u && /* @__PURE__ */ I(Qt, { children: [
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ d("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ d(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: o,
              onChange: (_) => l(_.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: u
            }
          ),
          /* @__PURE__ */ d("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ d("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ d(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: s,
              onChange: (_) => c(_.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: u
            }
          ),
          /* @__PURE__ */ d("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ d("div", { className: "chat-wrapper__dev-settings-info", children: /* @__PURE__ */ I("p", { children: [
          /* @__PURE__ */ d("strong", { children: "App:" }),
          " ",
          n
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ d(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: R,
          disabled: u,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ d(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: S,
          disabled: u || !i,
          children: u ? "Saving..." : "Save"
        }
      )
    ] })
  ] }) }) : null;
};
function wo(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Eo = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, So = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, _o = {};
function zr(e, t) {
  return (_o.jsx ? So : Eo).test(e);
}
const xo = /[ \t\n\f\r]/g;
function To(e) {
  return typeof e == "object" ? e.type === "text" ? Br(e.value) : !1 : Br(e);
}
function Br(e) {
  return e.replace(xo, "") === "";
}
class en {
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
en.prototype.normal = {};
en.prototype.property = {};
en.prototype.space = void 0;
function Fi(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new en(n, r, t);
}
function Wn(e) {
  return e.toLowerCase();
}
class ze {
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
ze.prototype.attribute = "";
ze.prototype.booleanish = !1;
ze.prototype.boolean = !1;
ze.prototype.commaOrSpaceSeparated = !1;
ze.prototype.commaSeparated = !1;
ze.prototype.defined = !1;
ze.prototype.mustUseProperty = !1;
ze.prototype.number = !1;
ze.prototype.overloadedBoolean = !1;
ze.prototype.property = "";
ze.prototype.spaceSeparated = !1;
ze.prototype.space = void 0;
let ko = 0;
const W = Nt(), Ee = Nt(), Zn = Nt(), x = Nt(), ce = Nt(), Pt = Nt(), Ge = Nt();
function Nt() {
  return 2 ** ++ko;
}
const qn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: W,
  booleanish: Ee,
  commaOrSpaceSeparated: Ge,
  commaSeparated: Pt,
  number: x,
  overloadedBoolean: Zn,
  spaceSeparated: ce
}, Symbol.toStringTag, { value: "Module" })), vn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(qn)
);
class ir extends ze {
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
    let a = -1;
    if (super(t, n), Gr(this, "space", i), typeof r == "number")
      for (; ++a < vn.length; ) {
        const o = vn[a];
        Gr(this, vn[a], (r & qn[o]) === qn[o]);
      }
  }
}
ir.prototype.defined = !0;
function Gr(e, t, n) {
  n && (e[t] = n);
}
function Ft(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new ir(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[Wn(r)] = r, n[Wn(a.attribute)] = r;
  }
  return new en(t, n, e.space);
}
const zi = Ft({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Ee,
    ariaAutoComplete: null,
    ariaBusy: Ee,
    ariaChecked: Ee,
    ariaColCount: x,
    ariaColIndex: x,
    ariaColSpan: x,
    ariaControls: ce,
    ariaCurrent: null,
    ariaDescribedBy: ce,
    ariaDetails: null,
    ariaDisabled: Ee,
    ariaDropEffect: ce,
    ariaErrorMessage: null,
    ariaExpanded: Ee,
    ariaFlowTo: ce,
    ariaGrabbed: Ee,
    ariaHasPopup: null,
    ariaHidden: Ee,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: ce,
    ariaLevel: x,
    ariaLive: null,
    ariaModal: Ee,
    ariaMultiLine: Ee,
    ariaMultiSelectable: Ee,
    ariaOrientation: null,
    ariaOwns: ce,
    ariaPlaceholder: null,
    ariaPosInSet: x,
    ariaPressed: Ee,
    ariaReadOnly: Ee,
    ariaRelevant: null,
    ariaRequired: Ee,
    ariaRoleDescription: ce,
    ariaRowCount: x,
    ariaRowIndex: x,
    ariaRowSpan: x,
    ariaSelected: Ee,
    ariaSetSize: x,
    ariaSort: null,
    ariaValueMax: x,
    ariaValueMin: x,
    ariaValueNow: x,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function Bi(e, t) {
  return t in e ? e[t] : t;
}
function Gi(e, t) {
  return Bi(e, t.toLowerCase());
}
const bo = Ft({
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
    accept: Pt,
    acceptCharset: ce,
    accessKey: ce,
    action: null,
    allow: null,
    allowFullScreen: W,
    allowPaymentRequest: W,
    allowUserMedia: W,
    alt: null,
    as: null,
    async: W,
    autoCapitalize: null,
    autoComplete: ce,
    autoFocus: W,
    autoPlay: W,
    blocking: ce,
    capture: null,
    charSet: null,
    checked: W,
    cite: null,
    className: ce,
    cols: x,
    colSpan: null,
    content: null,
    contentEditable: Ee,
    controls: W,
    controlsList: ce,
    coords: x | Pt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: W,
    defer: W,
    dir: null,
    dirName: null,
    disabled: W,
    download: Zn,
    draggable: Ee,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: W,
    formTarget: null,
    headers: ce,
    height: x,
    hidden: Zn,
    high: x,
    href: null,
    hrefLang: null,
    htmlFor: ce,
    httpEquiv: ce,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: W,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: W,
    itemId: null,
    itemProp: ce,
    itemRef: ce,
    itemScope: W,
    itemType: ce,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: W,
    low: x,
    manifest: null,
    max: null,
    maxLength: x,
    media: null,
    method: null,
    min: null,
    minLength: x,
    multiple: W,
    muted: W,
    name: null,
    nonce: null,
    noModule: W,
    noValidate: W,
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
    open: W,
    optimum: x,
    pattern: null,
    ping: ce,
    placeholder: null,
    playsInline: W,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: W,
    referrerPolicy: null,
    rel: ce,
    required: W,
    reversed: W,
    rows: x,
    rowSpan: x,
    sandbox: ce,
    scope: null,
    scoped: W,
    seamless: W,
    selected: W,
    shadowRootClonable: W,
    shadowRootDelegatesFocus: W,
    shadowRootMode: null,
    shape: null,
    size: x,
    sizes: null,
    slot: null,
    span: x,
    spellCheck: Ee,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: x,
    step: null,
    style: null,
    tabIndex: x,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: W,
    useMap: null,
    value: Ee,
    width: x,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: ce,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: x,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: x,
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
    compact: W,
    // Lists. Use CSS to reduce space between items instead
    declare: W,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: x,
    // `<img>` and `<object>`
    leftMargin: x,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: x,
    // `<body>`
    marginWidth: x,
    // `<body>`
    noResize: W,
    // `<frame>`
    noHref: W,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: W,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: W,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: x,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: Ee,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: x,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: x,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: W,
    disableRemotePlayback: W,
    prefix: null,
    property: null,
    results: x,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Gi
}), Ao = Ft({
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
    about: Ge,
    accentHeight: x,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: x,
    amplitude: x,
    arabicForm: null,
    ascent: x,
    attributeName: null,
    attributeType: null,
    azimuth: x,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: x,
    by: null,
    calcMode: null,
    capHeight: x,
    className: ce,
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
    descent: x,
    diffuseConstant: x,
    direction: null,
    display: null,
    dur: null,
    divisor: x,
    dominantBaseline: null,
    download: W,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: x,
    enableBackground: null,
    end: null,
    event: null,
    exponent: x,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: x,
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
    g1: Pt,
    g2: Pt,
    glyphName: Pt,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: x,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: x,
    horizOriginX: x,
    horizOriginY: x,
    id: null,
    ideographic: x,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: x,
    k: x,
    k1: x,
    k2: x,
    k3: x,
    k4: x,
    kernelMatrix: Ge,
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
    limitingConeAngle: x,
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
    mediaSize: x,
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
    overlinePosition: x,
    overlineThickness: x,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: x,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: ce,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: x,
    pointsAtY: x,
    pointsAtZ: x,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Ge,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Ge,
    rev: Ge,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Ge,
    requiredFeatures: Ge,
    requiredFonts: Ge,
    requiredFormats: Ge,
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
    specularConstant: x,
    specularExponent: x,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: x,
    strikethroughThickness: x,
    string: null,
    stroke: null,
    strokeDashArray: Ge,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: x,
    strokeOpacity: x,
    strokeWidth: null,
    style: null,
    surfaceScale: x,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Ge,
    tabIndex: x,
    tableValues: null,
    target: null,
    targetX: x,
    targetY: x,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Ge,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: x,
    underlineThickness: x,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: x,
    values: null,
    vAlphabetic: x,
    vMathematical: x,
    vectorEffect: null,
    vHanging: x,
    vIdeographic: x,
    version: null,
    vertAdvY: x,
    vertOriginX: x,
    vertOriginY: x,
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
    xHeight: x,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Bi
}), Vi = Ft({
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
}), ji = Ft({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Gi
}), $i = Ft({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), Io = {
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
}, Ro = /[A-Z]/g, Vr = /-[a-z]/g, No = /^data[-\w.:]+$/i;
function vo(e, t) {
  const n = Wn(t);
  let r = t, i = ze;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && No.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(Vr, Mo);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!Vr.test(a)) {
        let o = a.replace(Ro, Lo);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    i = ir;
  }
  return new i(r, t);
}
function Lo(e) {
  return "-" + e.toLowerCase();
}
function Mo(e) {
  return e.charAt(1).toUpperCase();
}
const Oo = Fi([zi, bo, Vi, ji, $i], "html"), ar = Fi([zi, Ao, Vi, ji, $i], "svg");
function Do(e) {
  return e.join(" ").trim();
}
var dn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Wi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var or = {}, jr = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Po = /\n/g, Ho = /^\s*/, Uo = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Fo = /^:\s*/, zo = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Bo = /^[;\s]*/, Go = /^\s+|\s+$/g, Vo = `
`, $r = "/", Wr = "*", Rt = "", jo = "comment", $o = "declaration", Wo = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(y) {
    var S = y.match(Po);
    S && (n += S.length);
    var R = y.lastIndexOf(Vo);
    r = ~R ? y.length - R : r + y.length;
  }
  function a() {
    var y = { line: n, column: r };
    return function(S) {
      return S.position = new o(y), c(), S;
    };
  }
  function o(y) {
    this.start = y, this.end = { line: n, column: r }, this.source = t.source;
  }
  o.prototype.content = e;
  function l(y) {
    var S = new Error(
      t.source + ":" + n + ":" + r + ": " + y
    );
    if (S.reason = y, S.filename = t.source, S.line = n, S.column = r, S.source = e, !t.silent) throw S;
  }
  function s(y) {
    var S = y.exec(e);
    if (S) {
      var R = S[0];
      return i(R), e = e.slice(R.length), S;
    }
  }
  function c() {
    s(Ho);
  }
  function u(y) {
    var S;
    for (y = y || []; S = p(); )
      S !== !1 && y.push(S);
    return y;
  }
  function p() {
    var y = a();
    if (!($r != e.charAt(0) || Wr != e.charAt(1))) {
      for (var S = 2; Rt != e.charAt(S) && (Wr != e.charAt(S) || $r != e.charAt(S + 1)); )
        ++S;
      if (S += 2, Rt === e.charAt(S - 1))
        return l("End of comment missing");
      var R = e.slice(2, S - 2);
      return r += 2, i(R), e = e.slice(S), r += 2, y({
        type: jo,
        comment: R
      });
    }
  }
  function g() {
    var y = a(), S = s(Uo);
    if (S) {
      if (p(), !s(Fo)) return l("property missing ':'");
      var R = s(zo), _ = y({
        type: $o,
        property: Zr(S[0].replace(jr, Rt)),
        value: R ? Zr(R[0].replace(jr, Rt)) : Rt
      });
      return s(Bo), _;
    }
  }
  function h() {
    var y = [];
    u(y);
    for (var S; S = g(); )
      S !== !1 && (y.push(S), u(y));
    return y;
  }
  return c(), h();
};
function Zr(e) {
  return e ? e.replace(Go, Rt) : Rt;
}
var Zo = dn && dn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(or, "__esModule", { value: !0 });
or.default = Xo;
const qo = Zo(Wo);
function Xo(e, t) {
  let n = null;
  if (!e || typeof e != "string")
    return n;
  const r = (0, qo.default)(e), i = typeof t == "function";
  return r.forEach((a) => {
    if (a.type !== "declaration")
      return;
    const { property: o, value: l } = a;
    i ? t(o, l, a) : l && (n = n || {}, n[o] = l);
  }), n;
}
var Cn = {};
Object.defineProperty(Cn, "__esModule", { value: !0 });
Cn.camelCase = void 0;
var Yo = /^--[a-zA-Z0-9_-]+$/, Ko = /-([a-z])/g, Qo = /^[^-]+$/, Jo = /^-(webkit|moz|ms|o|khtml)-/, el = /^-(ms)-/, tl = function(e) {
  return !e || Qo.test(e) || Yo.test(e);
}, nl = function(e, t) {
  return t.toUpperCase();
}, qr = function(e, t) {
  return "".concat(t, "-");
}, rl = function(e, t) {
  return t === void 0 && (t = {}), tl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(el, qr) : e = e.replace(Jo, qr), e.replace(Ko, nl));
};
Cn.camelCase = rl;
var il = dn && dn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, al = il(or), ol = Cn;
function Xn(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, al.default)(e, function(r, i) {
    r && i && (n[(0, ol.camelCase)(r, t)] = i);
  }), n;
}
Xn.default = Xn;
var ll = Xn;
const sl = /* @__PURE__ */ Wi(ll), Zi = qi("end"), lr = qi("start");
function qi(e) {
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
function ul(e) {
  const t = lr(e), n = Zi(e);
  if (t && n)
    return { start: t, end: n };
}
function Xt(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Xr(e.position) : "start" in e || "end" in e ? Xr(e) : "line" in e || "column" in e ? Yn(e) : "";
}
function Yn(e) {
  return Yr(e && e.line) + ":" + Yr(e && e.column);
}
function Xr(e) {
  return Yn(e && e.start) + "-" + Yn(e && e.end);
}
function Yr(e) {
  return e && typeof e == "number" ? e : 1;
}
class Ie extends Error {
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
    let i = "", a = {}, o = !1;
    if (n && ("line" in n && "column" in n ? a = { place: n } : "start" in n && "end" in n ? a = { place: n } : "type" in n ? a = {
      ancestors: [n],
      place: n.position
    } : a = { ...n }), typeof t == "string" ? i = t : !a.cause && t && (o = !0, i = t.message, a.cause = t), !a.ruleId && !a.source && typeof r == "string") {
      const s = r.indexOf(":");
      s === -1 ? a.ruleId = r : (a.source = r.slice(0, s), a.ruleId = r.slice(s + 1));
    }
    if (!a.place && a.ancestors && a.ancestors) {
      const s = a.ancestors[a.ancestors.length - 1];
      s && (a.place = s.position);
    }
    const l = a.place && "start" in a.place ? a.place.start : a.place;
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = l ? l.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = l ? l.line : void 0, this.name = Xt(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = o && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Ie.prototype.file = "";
Ie.prototype.name = "";
Ie.prototype.reason = "";
Ie.prototype.message = "";
Ie.prototype.stack = "";
Ie.prototype.column = void 0;
Ie.prototype.line = void 0;
Ie.prototype.ancestors = void 0;
Ie.prototype.cause = void 0;
Ie.prototype.fatal = void 0;
Ie.prototype.place = void 0;
Ie.prototype.ruleId = void 0;
Ie.prototype.source = void 0;
const sr = {}.hasOwnProperty, cl = /* @__PURE__ */ new Map(), hl = /[A-Z]/g, pl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), dl = /* @__PURE__ */ new Set(["td", "th"]), Xi = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function fl(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = _l(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Sl(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? ar : Oo,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = Yi(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function Yi(e, t, n) {
  if (t.type === "element")
    return ml(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return gl(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return yl(e, t, n);
  if (t.type === "mdxjsEsm")
    return Cl(e, t);
  if (t.type === "root")
    return wl(e, t, n);
  if (t.type === "text")
    return El(e, t);
}
function ml(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = ar, e.schema = i), e.ancestors.push(t);
  const a = Qi(e, t.tagName, !1), o = xl(e, t);
  let l = cr(e, t);
  return pl.has(t.tagName) && (l = l.filter(function(s) {
    return typeof s == "string" ? !To(s) : !0;
  })), Ki(e, o, a, t), ur(o, l), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function gl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Jt(e, t.position);
}
function Cl(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Jt(e, t.position);
}
function yl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = ar, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : Qi(e, t.name, !0), o = Tl(e, t), l = cr(e, t);
  return Ki(e, o, a, t), ur(o, l), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function wl(e, t, n) {
  const r = {};
  return ur(r, cr(e, t)), e.create(t, e.Fragment, r, n);
}
function El(e, t) {
  return t.value;
}
function Ki(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function ur(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function Sl(e, t, n) {
  return r;
  function r(i, a, o, l) {
    const c = Array.isArray(o.children) ? n : t;
    return l ? c(a, o, l) : c(a, o);
  }
}
function _l(e, t) {
  return n;
  function n(r, i, a, o) {
    const l = Array.isArray(a.children), s = lr(r);
    return t(
      i,
      a,
      o,
      l,
      {
        columnNumber: s ? s.column - 1 : void 0,
        fileName: e,
        lineNumber: s ? s.line : void 0
      },
      void 0
    );
  }
}
function xl(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && sr.call(t.properties, i)) {
      const a = kl(e, i, t.properties[i]);
      if (a) {
        const [o, l] = a;
        e.tableCellAlignToStyle && o === "align" && typeof l == "string" && dl.has(t.tagName) ? r = l : n[o] = l;
      }
    }
  if (r) {
    const a = (
      /** @type {Style} */
      n.style || (n.style = {})
    );
    a[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function Tl(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const a = r.data.estree.body[0];
        a.type;
        const o = a.expression;
        o.type;
        const l = o.properties[0];
        l.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(l.argument)
        );
      } else
        Jt(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const l = r.value.data.estree.body[0];
          l.type, a = e.evaluater.evaluateExpression(l.expression);
        } else
          Jt(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function cr(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : cl;
  for (; ++r < t.children.length; ) {
    const a = t.children[r];
    let o;
    if (e.passKeys) {
      const s = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (s) {
        const c = i.get(s) || 0;
        o = s + "-" + c, i.set(s, c + 1);
      }
    }
    const l = Yi(e, a, o);
    l !== void 0 && n.push(l);
  }
  return n;
}
function kl(e, t, n) {
  const r = vo(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? wo(n) : Do(n)), r.property === "style") {
      let i = typeof n == "object" ? n : bl(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Al(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Io[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function bl(e, t) {
  try {
    return sl(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new Ie("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Xi + "#cannot-parse-style-attribute", i;
  }
}
function Qi(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let a = -1, o;
    for (; ++a < i.length; ) {
      const l = zr(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
      o = o ? {
        type: "MemberExpression",
        object: o,
        property: l,
        computed: !!(a && l.type === "Literal"),
        optional: !1
      } : l;
    }
    r = o;
  } else
    r = zr(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return sr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Jt(e);
}
function Jt(e, t) {
  const n = new Ie(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Xi + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Al(e) {
  const t = {};
  let n;
  for (n in e)
    sr.call(e, n) && (t[Il(n)] = e[n]);
  return t;
}
function Il(e) {
  let t = e.replace(hl, Rl);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Rl(e) {
  return "-" + e.toLowerCase();
}
const Ln = {
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
}, Nl = {};
function vl(e, t) {
  const n = Nl, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Ji(e, r, i);
}
function Ji(e, t, n) {
  if (Ll(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Kr(e.children, t, n);
  }
  return Array.isArray(e) ? Kr(e, t, n) : "";
}
function Kr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Ji(e[i], t, n);
  return r.join("");
}
function Ll(e) {
  return !!(e && typeof e == "object");
}
const Qr = document.createElement("i");
function hr(e) {
  const t = "&" + e + ";";
  Qr.innerHTML = t;
  const n = Qr.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function st(e, t, n, r) {
  const i = e.length;
  let a = 0, o;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(t, n), e.splice(...o);
  else
    for (n && e.splice(t, n); a < r.length; )
      o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
function Xe(e, t) {
  return e.length > 0 ? (st(e, e.length, 0, t), e) : t;
}
const Jr = {}.hasOwnProperty;
function Ml(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    Ol(t, e[n]);
  return t;
}
function Ol(e, t) {
  let n;
  for (n in t) {
    const i = (Jr.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let o;
    if (a)
      for (o in a) {
        Jr.call(i, o) || (i[o] = []);
        const l = a[o];
        Dl(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(l) ? l : l ? [l] : []
        );
      }
  }
}
function Dl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  st(e, 0, 0, r);
}
function ea(e, t) {
  const n = Number.parseInt(e, t);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < 9 || n === 11 || n > 13 && n < 32 || // Control character (DEL) of C0, and C1 controls.
    n > 126 && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? "�" : String.fromCodePoint(n)
  );
}
function Ht(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const lt = kt(/[A-Za-z]/), Ve = kt(/[\dA-Za-z]/), Pl = kt(/[#-'*+\--9=?A-Z^-~]/);
function Kn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Qn = kt(/\d/), Hl = kt(/[\dA-Fa-f]/), Ul = kt(/[!-/:-@[-`{-~]/);
function G(e) {
  return e !== null && e < -2;
}
function Fe(e) {
  return e !== null && (e < 0 || e === 32);
}
function ie(e) {
  return e === -2 || e === -1 || e === 32;
}
const Fl = kt(new RegExp("\\p{P}|\\p{S}", "u")), zl = kt(/\s/);
function kt(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function zt(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let o = "";
    if (a === 37 && Ve(e.charCodeAt(n + 1)) && Ve(e.charCodeAt(n + 2)))
      i = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (o = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const l = e.charCodeAt(n + 1);
      a < 56320 && l > 56319 && l < 57344 ? (o = String.fromCharCode(a, l), i = 1) : o = "�";
    } else
      o = String.fromCharCode(a);
    o && (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, o = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function he(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return o;
  function o(s) {
    return ie(s) ? (e.enter(n), l(s)) : t(s);
  }
  function l(s) {
    return ie(s) && a++ < i ? (e.consume(s), l) : (e.exit(n), t(s));
  }
}
const Bl = {
  tokenize: Gl
};
function Gl(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), he(e, t, "linePrefix");
  }
  function i(l) {
    return e.enter("paragraph"), a(l);
  }
  function a(l) {
    const s = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = s), n = s, o(l);
  }
  function o(l) {
    if (l === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(l);
      return;
    }
    return G(l) ? (e.consume(l), e.exit("chunkText"), a) : (e.consume(l), o);
  }
}
const Vl = {
  tokenize: jl
}, ei = {
  tokenize: $l
};
function jl(e) {
  const t = this, n = [];
  let r = 0, i, a, o;
  return l;
  function l(N) {
    if (r < n.length) {
      const P = n[r];
      return t.containerState = P[1], e.attempt(P[0].continuation, s, c)(N);
    }
    return c(N);
  }
  function s(N) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && H();
      const P = t.events.length;
      let j = P, w;
      for (; j--; )
        if (t.events[j][0] === "exit" && t.events[j][1].type === "chunkFlow") {
          w = t.events[j][1].end;
          break;
        }
      _(r);
      let D = P;
      for (; D < t.events.length; )
        t.events[D][1].end = {
          ...w
        }, D++;
      return st(t.events, j + 1, 0, t.events.slice(P)), t.events.length = D, c(N);
    }
    return l(N);
  }
  function c(N) {
    if (r === n.length) {
      if (!i)
        return g(N);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return y(N);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(ei, u, p)(N);
  }
  function u(N) {
    return i && H(), _(r), g(N);
  }
  function p(N) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, y(N);
  }
  function g(N) {
    return t.containerState = {}, e.attempt(ei, h, y)(N);
  }
  function h(N) {
    return r++, n.push([t.currentConstruct, t.containerState]), g(N);
  }
  function y(N) {
    if (N === null) {
      i && H(), _(0), e.consume(N);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: a
    }), S(N);
  }
  function S(N) {
    if (N === null) {
      R(e.exit("chunkFlow"), !0), _(0), e.consume(N);
      return;
    }
    return G(N) ? (e.consume(N), R(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, l) : (e.consume(N), S);
  }
  function R(N, P) {
    const j = t.sliceStream(N);
    if (P && j.push(null), N.previous = a, a && (a.next = N), a = N, i.defineSkip(N.start), i.write(j), t.parser.lazy[N.start.line]) {
      let w = i.events.length;
      for (; w--; )
        if (
          // The token starts before the line ending…
          i.events[w][1].start.offset < o && // …and either is not ended yet…
          (!i.events[w][1].end || // …or ends after it.
          i.events[w][1].end.offset > o)
        )
          return;
      const D = t.events.length;
      let Z = D, z, U;
      for (; Z--; )
        if (t.events[Z][0] === "exit" && t.events[Z][1].type === "chunkFlow") {
          if (z) {
            U = t.events[Z][1].end;
            break;
          }
          z = !0;
        }
      for (_(r), w = D; w < t.events.length; )
        t.events[w][1].end = {
          ...U
        }, w++;
      st(t.events, Z + 1, 0, t.events.slice(D)), t.events.length = w;
    }
  }
  function _(N) {
    let P = n.length;
    for (; P-- > N; ) {
      const j = n[P];
      t.containerState = j[1], j[0].exit.call(t, e);
    }
    n.length = N;
  }
  function H() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function $l(e, t, n) {
  return he(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function ti(e) {
  if (e === null || Fe(e) || zl(e))
    return 1;
  if (Fl(e))
    return 2;
}
function pr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const Jn = {
  name: "attention",
  resolveAll: Wl,
  tokenize: Zl
};
function Wl(e, t) {
  let n = -1, r, i, a, o, l, s, c, u;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          s = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const p = {
            ...e[r][1].end
          }, g = {
            ...e[n][1].start
          };
          ni(p, -s), ni(g, s), o = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: p,
            end: {
              ...e[r][1].end
            }
          }, l = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: g
          }, a = {
            type: s > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[n][1].start
            }
          }, i = {
            type: s > 1 ? "strong" : "emphasis",
            start: {
              ...o.start
            },
            end: {
              ...l.end
            }
          }, e[r][1].end = {
            ...o.start
          }, e[n][1].start = {
            ...l.end
          }, c = [], e[r][1].end.offset - e[r][1].start.offset && (c = Xe(c, [["enter", e[r][1], t], ["exit", e[r][1], t]])), c = Xe(c, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["enter", a, t]]), c = Xe(c, pr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), c = Xe(c, [["exit", a, t], ["enter", l, t], ["exit", l, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, c = Xe(c, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : u = 0, st(e, r - 1, n - r + 3, c), n = r + c.length - u - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Zl(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = ti(r);
  let a;
  return o;
  function o(s) {
    return a = s, e.enter("attentionSequence"), l(s);
  }
  function l(s) {
    if (s === a)
      return e.consume(s), l;
    const c = e.exit("attentionSequence"), u = ti(s), p = !u || u === 2 && i || n.includes(s), g = !i || i === 2 && u || n.includes(r);
    return c._open = !!(a === 42 ? p : p && (i || !g)), c._close = !!(a === 42 ? g : g && (u || !p)), t(s);
  }
}
function ni(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const ql = {
  name: "autolink",
  tokenize: Xl
};
function Xl(e, t, n) {
  let r = 0;
  return i;
  function i(h) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(h) {
    return lt(h) ? (e.consume(h), o) : h === 64 ? n(h) : c(h);
  }
  function o(h) {
    return h === 43 || h === 45 || h === 46 || Ve(h) ? (r = 1, l(h)) : c(h);
  }
  function l(h) {
    return h === 58 ? (e.consume(h), r = 0, s) : (h === 43 || h === 45 || h === 46 || Ve(h)) && r++ < 32 ? (e.consume(h), l) : (r = 0, c(h));
  }
  function s(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : h === null || h === 32 || h === 60 || Kn(h) ? n(h) : (e.consume(h), s);
  }
  function c(h) {
    return h === 64 ? (e.consume(h), u) : Pl(h) ? (e.consume(h), c) : n(h);
  }
  function u(h) {
    return Ve(h) ? p(h) : n(h);
  }
  function p(h) {
    return h === 46 ? (e.consume(h), r = 0, u) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : g(h);
  }
  function g(h) {
    if ((h === 45 || Ve(h)) && r++ < 63) {
      const y = h === 45 ? g : p;
      return e.consume(h), y;
    }
    return n(h);
  }
}
const yn = {
  partial: !0,
  tokenize: Yl
};
function Yl(e, t, n) {
  return r;
  function r(a) {
    return ie(a) ? he(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || G(a) ? t(a) : n(a);
  }
}
const ta = {
  continuation: {
    tokenize: Ql
  },
  exit: Jl,
  name: "blockQuote",
  tokenize: Kl
};
function Kl(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    if (o === 62) {
      const l = r.containerState;
      return l.open || (e.enter("blockQuote", {
        _container: !0
      }), l.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(o), e.exit("blockQuoteMarker"), a;
    }
    return n(o);
  }
  function a(o) {
    return ie(o) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(o), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(o));
  }
}
function Ql(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return ie(o) ? he(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : a(o);
  }
  function a(o) {
    return e.attempt(ta, t, n)(o);
  }
}
function Jl(e) {
  e.exit("blockQuote");
}
const na = {
  name: "characterEscape",
  tokenize: es
};
function es(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return Ul(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const ra = {
  name: "characterReference",
  tokenize: ts
};
function ts(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return l;
  function l(p) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), s;
  }
  function s(p) {
    return p === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(p), e.exit("characterReferenceMarkerNumeric"), c) : (e.enter("characterReferenceValue"), a = 31, o = Ve, u(p));
  }
  function c(p) {
    return p === 88 || p === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(p), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, o = Hl, u) : (e.enter("characterReferenceValue"), a = 7, o = Qn, u(p));
  }
  function u(p) {
    if (p === 59 && i) {
      const g = e.exit("characterReferenceValue");
      return o === Ve && !hr(r.sliceSerialize(g)) ? n(p) : (e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return o(p) && i++ < a ? (e.consume(p), u) : n(p);
  }
}
const ri = {
  partial: !0,
  tokenize: rs
}, ii = {
  concrete: !0,
  name: "codeFenced",
  tokenize: ns
};
function ns(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: j
  };
  let a = 0, o = 0, l;
  return s;
  function s(w) {
    return c(w);
  }
  function c(w) {
    const D = r.events[r.events.length - 1];
    return a = D && D[1].type === "linePrefix" ? D[2].sliceSerialize(D[1], !0).length : 0, l = w, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(w);
  }
  function u(w) {
    return w === l ? (o++, e.consume(w), u) : o < 3 ? n(w) : (e.exit("codeFencedFenceSequence"), ie(w) ? he(e, p, "whitespace")(w) : p(w));
  }
  function p(w) {
    return w === null || G(w) ? (e.exit("codeFencedFence"), r.interrupt ? t(w) : e.check(ri, S, P)(w)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), g(w));
  }
  function g(w) {
    return w === null || G(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), p(w)) : ie(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), he(e, h, "whitespace")(w)) : w === 96 && w === l ? n(w) : (e.consume(w), g);
  }
  function h(w) {
    return w === null || G(w) ? p(w) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), y(w));
  }
  function y(w) {
    return w === null || G(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), p(w)) : w === 96 && w === l ? n(w) : (e.consume(w), y);
  }
  function S(w) {
    return e.attempt(i, P, R)(w);
  }
  function R(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), _;
  }
  function _(w) {
    return a > 0 && ie(w) ? he(e, H, "linePrefix", a + 1)(w) : H(w);
  }
  function H(w) {
    return w === null || G(w) ? e.check(ri, S, P)(w) : (e.enter("codeFlowValue"), N(w));
  }
  function N(w) {
    return w === null || G(w) ? (e.exit("codeFlowValue"), H(w)) : (e.consume(w), N);
  }
  function P(w) {
    return e.exit("codeFenced"), t(w);
  }
  function j(w, D, Z) {
    let z = 0;
    return U;
    function U(A) {
      return w.enter("lineEnding"), w.consume(A), w.exit("lineEnding"), b;
    }
    function b(A) {
      return w.enter("codeFencedFence"), ie(A) ? he(w, v, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(A) : v(A);
    }
    function v(A) {
      return A === l ? (w.enter("codeFencedFenceSequence"), Q(A)) : Z(A);
    }
    function Q(A) {
      return A === l ? (z++, w.consume(A), Q) : z >= o ? (w.exit("codeFencedFenceSequence"), ie(A) ? he(w, M, "whitespace")(A) : M(A)) : Z(A);
    }
    function M(A) {
      return A === null || G(A) ? (w.exit("codeFencedFence"), D(A)) : Z(A);
    }
  }
}
function rs(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? n(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), a);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
const Mn = {
  name: "codeIndented",
  tokenize: as
}, is = {
  partial: !0,
  tokenize: os
};
function as(e, t, n) {
  const r = this;
  return i;
  function i(c) {
    return e.enter("codeIndented"), he(e, a, "linePrefix", 5)(c);
  }
  function a(c) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? o(c) : n(c);
  }
  function o(c) {
    return c === null ? s(c) : G(c) ? e.attempt(is, o, s)(c) : (e.enter("codeFlowValue"), l(c));
  }
  function l(c) {
    return c === null || G(c) ? (e.exit("codeFlowValue"), o(c)) : (e.consume(c), l);
  }
  function s(c) {
    return e.exit("codeIndented"), t(c);
  }
}
function os(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : G(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : he(e, a, "linePrefix", 5)(o);
  }
  function a(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? t(o) : G(o) ? i(o) : n(o);
  }
}
const ls = {
  name: "codeText",
  previous: us,
  resolve: ss,
  tokenize: cs
};
function ss(e) {
  let t = e.length - 4, n = 3, r, i;
  if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
    for (r = n; ++r < t; )
      if (e[r][1].type === "codeTextData") {
        e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function us(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function cs(e, t, n) {
  let r = 0, i, a;
  return o;
  function o(p) {
    return e.enter("codeText"), e.enter("codeTextSequence"), l(p);
  }
  function l(p) {
    return p === 96 ? (e.consume(p), r++, l) : (e.exit("codeTextSequence"), s(p));
  }
  function s(p) {
    return p === null ? n(p) : p === 32 ? (e.enter("space"), e.consume(p), e.exit("space"), s) : p === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(p)) : G(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), s) : (e.enter("codeTextData"), c(p));
  }
  function c(p) {
    return p === null || p === 32 || p === 96 || G(p) ? (e.exit("codeTextData"), s(p)) : (e.consume(p), c);
  }
  function u(p) {
    return p === 96 ? (e.consume(p), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(p)) : (a.type = "codeTextData", c(p));
  }
}
class hs {
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
      throw new RangeError("Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
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
    return r < this.left.length ? this.left.slice(t, r) : t > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - t + this.left.length).reverse() : this.left.slice(t).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
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
    const a = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && Zt(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Zt(this.left, t);
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
    this.setCursor(0), Zt(this.right, t.reverse());
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
        Zt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Zt(this.left, n.reverse());
      }
  }
}
function Zt(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function ia(e) {
  const t = {};
  let n = -1, r, i, a, o, l, s, c;
  const u = new hs(e);
  for (; ++n < u.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, a = 0, a < s.length && s[a][1].type === "lineEndingBlank" && (a += 2), a < s.length && s[a][1].type === "content"))
      for (; ++a < s.length && s[a][1].type !== "content"; )
        s[a][1].type === "chunkText" && (s[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, ps(u, n)), n = t[n], c = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (o = u.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
          o[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
        else if (!(o[1].type === "linePrefix" || o[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...u.get(i)[1].start
      }, l = u.slice(i, n), l.unshift(r), u.splice(i, n - i + 1, l));
    }
  }
  return st(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !c;
}
function ps(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const l = o.events, s = [], c = {};
  let u, p, g = -1, h = n, y = 0, S = 0;
  const R = [S];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; )
      ;
    a.push(i), h._tokenizer || (u = r.sliceStream(h), h.next || u.push(null), p && o.defineSkip(h.start), h._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), h._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), p = h, h = h.next;
  }
  for (h = n; ++g < l.length; )
    // Find a void token that includes a break.
    l[g][0] === "exit" && l[g - 1][0] === "enter" && l[g][1].type === l[g - 1][1].type && l[g][1].start.line !== l[g][1].end.line && (S = g + 1, R.push(S), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (o.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : R.pop(), g = R.length; g--; ) {
    const _ = l.slice(R[g], R[g + 1]), H = a.pop();
    s.push([H, H + _.length - 1]), e.splice(H, 2, _);
  }
  for (s.reverse(), g = -1; ++g < s.length; )
    c[y + s[g][0]] = y + s[g][1], y += s[g][1] - s[g][0] - 1;
  return c;
}
const ds = {
  resolve: ms,
  tokenize: gs
}, fs = {
  partial: !0,
  tokenize: Cs
};
function ms(e) {
  return ia(e), e;
}
function gs(e, t) {
  let n;
  return r;
  function r(l) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(l);
  }
  function i(l) {
    return l === null ? a(l) : G(l) ? e.check(fs, o, a)(l) : (e.consume(l), i);
  }
  function a(l) {
    return e.exit("chunkContent"), e.exit("content"), t(l);
  }
  function o(l) {
    return e.consume(l), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, i;
  }
}
function Cs(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), he(e, a, "linePrefix");
  }
  function a(o) {
    if (o === null || G(o))
      return n(o);
    const l = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function aa(e, t, n, r, i, a, o, l, s) {
  const c = s || Number.POSITIVE_INFINITY;
  let u = 0;
  return p;
  function p(_) {
    return _ === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(_), e.exit(a), g) : _ === null || _ === 32 || _ === 41 || Kn(_) ? n(_) : (e.enter(r), e.enter(o), e.enter(l), e.enter("chunkString", {
      contentType: "string"
    }), S(_));
  }
  function g(_) {
    return _ === 62 ? (e.enter(a), e.consume(_), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(l), e.enter("chunkString", {
      contentType: "string"
    }), h(_));
  }
  function h(_) {
    return _ === 62 ? (e.exit("chunkString"), e.exit(l), g(_)) : _ === null || _ === 60 || G(_) ? n(_) : (e.consume(_), _ === 92 ? y : h);
  }
  function y(_) {
    return _ === 60 || _ === 62 || _ === 92 ? (e.consume(_), h) : h(_);
  }
  function S(_) {
    return !u && (_ === null || _ === 41 || Fe(_)) ? (e.exit("chunkString"), e.exit(l), e.exit(o), e.exit(r), t(_)) : u < c && _ === 40 ? (e.consume(_), u++, S) : _ === 41 ? (e.consume(_), u--, S) : _ === null || _ === 32 || _ === 40 || Kn(_) ? n(_) : (e.consume(_), _ === 92 ? R : S);
  }
  function R(_) {
    return _ === 40 || _ === 41 || _ === 92 ? (e.consume(_), S) : S(_);
  }
}
function oa(e, t, n, r, i, a) {
  const o = this;
  let l = 0, s;
  return c;
  function c(h) {
    return e.enter(r), e.enter(i), e.consume(h), e.exit(i), e.enter(a), u;
  }
  function u(h) {
    return l > 999 || h === null || h === 91 || h === 93 && !s || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === 94 && !l && "_hiddenFootnoteSupport" in o.parser.constructs ? n(h) : h === 93 ? (e.exit(a), e.enter(i), e.consume(h), e.exit(i), e.exit(r), t) : G(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), p(h));
  }
  function p(h) {
    return h === null || h === 91 || h === 93 || G(h) || l++ > 999 ? (e.exit("chunkString"), u(h)) : (e.consume(h), s || (s = !ie(h)), h === 92 ? g : p);
  }
  function g(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), l++, p) : p(h);
  }
}
function la(e, t, n, r, i, a) {
  let o;
  return l;
  function l(g) {
    return g === 34 || g === 39 || g === 40 ? (e.enter(r), e.enter(i), e.consume(g), e.exit(i), o = g === 40 ? 41 : g, s) : n(g);
  }
  function s(g) {
    return g === o ? (e.enter(i), e.consume(g), e.exit(i), e.exit(r), t) : (e.enter(a), c(g));
  }
  function c(g) {
    return g === o ? (e.exit(a), s(o)) : g === null ? n(g) : G(g) ? (e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), he(e, c, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), u(g));
  }
  function u(g) {
    return g === o || g === null || G(g) ? (e.exit("chunkString"), c(g)) : (e.consume(g), g === 92 ? p : u);
  }
  function p(g) {
    return g === o || g === 92 ? (e.consume(g), u) : u(g);
  }
}
function Yt(e, t) {
  let n;
  return r;
  function r(i) {
    return G(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : ie(i) ? he(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const ys = {
  name: "definition",
  tokenize: Es
}, ws = {
  partial: !0,
  tokenize: Ss
};
function Es(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(h) {
    return e.enter("definition"), o(h);
  }
  function o(h) {
    return oa.call(
      r,
      e,
      l,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(h);
  }
  function l(h) {
    return i = Ht(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), s) : n(h);
  }
  function s(h) {
    return Fe(h) ? Yt(e, c)(h) : c(h);
  }
  function c(h) {
    return aa(
      e,
      u,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(h);
  }
  function u(h) {
    return e.attempt(ws, p, p)(h);
  }
  function p(h) {
    return ie(h) ? he(e, g, "whitespace")(h) : g(h);
  }
  function g(h) {
    return h === null || G(h) ? (e.exit("definition"), r.parser.defined.push(i), t(h)) : n(h);
  }
}
function Ss(e, t, n) {
  return r;
  function r(l) {
    return Fe(l) ? Yt(e, i)(l) : n(l);
  }
  function i(l) {
    return la(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(l);
  }
  function a(l) {
    return ie(l) ? he(e, o, "whitespace")(l) : o(l);
  }
  function o(l) {
    return l === null || G(l) ? t(l) : n(l);
  }
}
const _s = {
  name: "hardBreakEscape",
  tokenize: xs
};
function xs(e, t, n) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), i;
  }
  function i(a) {
    return G(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
  }
}
const Ts = {
  name: "headingAtx",
  resolve: ks,
  tokenize: bs
};
function ks(e, t) {
  let n = e.length - 2, r = 3, i, a;
  return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[n][1].end
  }, a = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[n][1].end,
    contentType: "text"
  }, st(e, r, n - r + 1, [["enter", i, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]])), e;
}
function bs(e, t, n) {
  let r = 0;
  return i;
  function i(u) {
    return e.enter("atxHeading"), a(u);
  }
  function a(u) {
    return e.enter("atxHeadingSequence"), o(u);
  }
  function o(u) {
    return u === 35 && r++ < 6 ? (e.consume(u), o) : u === null || Fe(u) ? (e.exit("atxHeadingSequence"), l(u)) : n(u);
  }
  function l(u) {
    return u === 35 ? (e.enter("atxHeadingSequence"), s(u)) : u === null || G(u) ? (e.exit("atxHeading"), t(u)) : ie(u) ? he(e, l, "whitespace")(u) : (e.enter("atxHeadingText"), c(u));
  }
  function s(u) {
    return u === 35 ? (e.consume(u), s) : (e.exit("atxHeadingSequence"), l(u));
  }
  function c(u) {
    return u === null || u === 35 || Fe(u) ? (e.exit("atxHeadingText"), l(u)) : (e.consume(u), c);
  }
}
const As = [
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
], ai = ["pre", "script", "style", "textarea"], Is = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: vs,
  tokenize: Ls
}, Rs = {
  partial: !0,
  tokenize: Os
}, Ns = {
  partial: !0,
  tokenize: Ms
};
function vs(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Ls(e, t, n) {
  const r = this;
  let i, a, o, l, s;
  return c;
  function c(m) {
    return u(m);
  }
  function u(m) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(m), p;
  }
  function p(m) {
    return m === 33 ? (e.consume(m), g) : m === 47 ? (e.consume(m), a = !0, S) : m === 63 ? (e.consume(m), i = 3, r.interrupt ? t : f) : lt(m) ? (e.consume(m), o = String.fromCharCode(m), R) : n(m);
  }
  function g(m) {
    return m === 45 ? (e.consume(m), i = 2, h) : m === 91 ? (e.consume(m), i = 5, l = 0, y) : lt(m) ? (e.consume(m), i = 4, r.interrupt ? t : f) : n(m);
  }
  function h(m) {
    return m === 45 ? (e.consume(m), r.interrupt ? t : f) : n(m);
  }
  function y(m) {
    const le = "CDATA[";
    return m === le.charCodeAt(l++) ? (e.consume(m), l === le.length ? r.interrupt ? t : v : y) : n(m);
  }
  function S(m) {
    return lt(m) ? (e.consume(m), o = String.fromCharCode(m), R) : n(m);
  }
  function R(m) {
    if (m === null || m === 47 || m === 62 || Fe(m)) {
      const le = m === 47, V = o.toLowerCase();
      return !le && !a && ai.includes(V) ? (i = 1, r.interrupt ? t(m) : v(m)) : As.includes(o.toLowerCase()) ? (i = 6, le ? (e.consume(m), _) : r.interrupt ? t(m) : v(m)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(m) : a ? H(m) : N(m));
    }
    return m === 45 || Ve(m) ? (e.consume(m), o += String.fromCharCode(m), R) : n(m);
  }
  function _(m) {
    return m === 62 ? (e.consume(m), r.interrupt ? t : v) : n(m);
  }
  function H(m) {
    return ie(m) ? (e.consume(m), H) : U(m);
  }
  function N(m) {
    return m === 47 ? (e.consume(m), U) : m === 58 || m === 95 || lt(m) ? (e.consume(m), P) : ie(m) ? (e.consume(m), N) : U(m);
  }
  function P(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || Ve(m) ? (e.consume(m), P) : j(m);
  }
  function j(m) {
    return m === 61 ? (e.consume(m), w) : ie(m) ? (e.consume(m), j) : N(m);
  }
  function w(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (e.consume(m), s = m, D) : ie(m) ? (e.consume(m), w) : Z(m);
  }
  function D(m) {
    return m === s ? (e.consume(m), s = null, z) : m === null || G(m) ? n(m) : (e.consume(m), D);
  }
  function Z(m) {
    return m === null || m === 34 || m === 39 || m === 47 || m === 60 || m === 61 || m === 62 || m === 96 || Fe(m) ? j(m) : (e.consume(m), Z);
  }
  function z(m) {
    return m === 47 || m === 62 || ie(m) ? N(m) : n(m);
  }
  function U(m) {
    return m === 62 ? (e.consume(m), b) : n(m);
  }
  function b(m) {
    return m === null || G(m) ? v(m) : ie(m) ? (e.consume(m), b) : n(m);
  }
  function v(m) {
    return m === 45 && i === 2 ? (e.consume(m), ee) : m === 60 && i === 1 ? (e.consume(m), Y) : m === 62 && i === 4 ? (e.consume(m), te) : m === 63 && i === 3 ? (e.consume(m), f) : m === 93 && i === 5 ? (e.consume(m), me) : G(m) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Rs, ge, Q)(m)) : m === null || G(m) ? (e.exit("htmlFlowData"), Q(m)) : (e.consume(m), v);
  }
  function Q(m) {
    return e.check(Ns, M, ge)(m);
  }
  function M(m) {
    return e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), A;
  }
  function A(m) {
    return m === null || G(m) ? Q(m) : (e.enter("htmlFlowData"), v(m));
  }
  function ee(m) {
    return m === 45 ? (e.consume(m), f) : v(m);
  }
  function Y(m) {
    return m === 47 ? (e.consume(m), o = "", ue) : v(m);
  }
  function ue(m) {
    if (m === 62) {
      const le = o.toLowerCase();
      return ai.includes(le) ? (e.consume(m), te) : v(m);
    }
    return lt(m) && o.length < 8 ? (e.consume(m), o += String.fromCharCode(m), ue) : v(m);
  }
  function me(m) {
    return m === 93 ? (e.consume(m), f) : v(m);
  }
  function f(m) {
    return m === 62 ? (e.consume(m), te) : m === 45 && i === 2 ? (e.consume(m), f) : v(m);
  }
  function te(m) {
    return m === null || G(m) ? (e.exit("htmlFlowData"), ge(m)) : (e.consume(m), te);
  }
  function ge(m) {
    return e.exit("htmlFlow"), t(m);
  }
}
function Ms(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return G(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), a) : n(o);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function Os(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(yn, t, n);
  }
}
const Ds = {
  name: "htmlText",
  tokenize: Ps
};
function Ps(e, t, n) {
  const r = this;
  let i, a, o;
  return l;
  function l(f) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(f), s;
  }
  function s(f) {
    return f === 33 ? (e.consume(f), c) : f === 47 ? (e.consume(f), j) : f === 63 ? (e.consume(f), N) : lt(f) ? (e.consume(f), Z) : n(f);
  }
  function c(f) {
    return f === 45 ? (e.consume(f), u) : f === 91 ? (e.consume(f), a = 0, y) : lt(f) ? (e.consume(f), H) : n(f);
  }
  function u(f) {
    return f === 45 ? (e.consume(f), h) : n(f);
  }
  function p(f) {
    return f === null ? n(f) : f === 45 ? (e.consume(f), g) : G(f) ? (o = p, Y(f)) : (e.consume(f), p);
  }
  function g(f) {
    return f === 45 ? (e.consume(f), h) : p(f);
  }
  function h(f) {
    return f === 62 ? ee(f) : f === 45 ? g(f) : p(f);
  }
  function y(f) {
    const te = "CDATA[";
    return f === te.charCodeAt(a++) ? (e.consume(f), a === te.length ? S : y) : n(f);
  }
  function S(f) {
    return f === null ? n(f) : f === 93 ? (e.consume(f), R) : G(f) ? (o = S, Y(f)) : (e.consume(f), S);
  }
  function R(f) {
    return f === 93 ? (e.consume(f), _) : S(f);
  }
  function _(f) {
    return f === 62 ? ee(f) : f === 93 ? (e.consume(f), _) : S(f);
  }
  function H(f) {
    return f === null || f === 62 ? ee(f) : G(f) ? (o = H, Y(f)) : (e.consume(f), H);
  }
  function N(f) {
    return f === null ? n(f) : f === 63 ? (e.consume(f), P) : G(f) ? (o = N, Y(f)) : (e.consume(f), N);
  }
  function P(f) {
    return f === 62 ? ee(f) : N(f);
  }
  function j(f) {
    return lt(f) ? (e.consume(f), w) : n(f);
  }
  function w(f) {
    return f === 45 || Ve(f) ? (e.consume(f), w) : D(f);
  }
  function D(f) {
    return G(f) ? (o = D, Y(f)) : ie(f) ? (e.consume(f), D) : ee(f);
  }
  function Z(f) {
    return f === 45 || Ve(f) ? (e.consume(f), Z) : f === 47 || f === 62 || Fe(f) ? z(f) : n(f);
  }
  function z(f) {
    return f === 47 ? (e.consume(f), ee) : f === 58 || f === 95 || lt(f) ? (e.consume(f), U) : G(f) ? (o = z, Y(f)) : ie(f) ? (e.consume(f), z) : ee(f);
  }
  function U(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || Ve(f) ? (e.consume(f), U) : b(f);
  }
  function b(f) {
    return f === 61 ? (e.consume(f), v) : G(f) ? (o = b, Y(f)) : ie(f) ? (e.consume(f), b) : z(f);
  }
  function v(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), i = f, Q) : G(f) ? (o = v, Y(f)) : ie(f) ? (e.consume(f), v) : (e.consume(f), M);
  }
  function Q(f) {
    return f === i ? (e.consume(f), i = void 0, A) : f === null ? n(f) : G(f) ? (o = Q, Y(f)) : (e.consume(f), Q);
  }
  function M(f) {
    return f === null || f === 34 || f === 39 || f === 60 || f === 61 || f === 96 ? n(f) : f === 47 || f === 62 || Fe(f) ? z(f) : (e.consume(f), M);
  }
  function A(f) {
    return f === 47 || f === 62 || Fe(f) ? z(f) : n(f);
  }
  function ee(f) {
    return f === 62 ? (e.consume(f), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(f);
  }
  function Y(f) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), ue;
  }
  function ue(f) {
    return ie(f) ? he(e, me, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : me(f);
  }
  function me(f) {
    return e.enter("htmlTextData"), o(f);
  }
}
const dr = {
  name: "labelEnd",
  resolveAll: zs,
  resolveTo: Bs,
  tokenize: Gs
}, Hs = {
  tokenize: Vs
}, Us = {
  tokenize: js
}, Fs = {
  tokenize: $s
};
function zs(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e.length !== n.length && st(e, 0, e.length, n), e;
}
function Bs(e, t) {
  let n = e.length, r = 0, i, a, o, l;
  for (; n--; )
    if (i = e[n][1], a) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (o) {
      if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (a = n, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (o = n);
  const s = {
    type: e[a][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[a][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, c = {
    type: "label",
    start: {
      ...e[a][1].start
    },
    end: {
      ...e[o][1].end
    }
  }, u = {
    type: "labelText",
    start: {
      ...e[a + r + 2][1].end
    },
    end: {
      ...e[o - 2][1].start
    }
  };
  return l = [["enter", s, t], ["enter", c, t]], l = Xe(l, e.slice(a + 1, a + r + 3)), l = Xe(l, [["enter", u, t]]), l = Xe(l, pr(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t)), l = Xe(l, [["exit", u, t], e[o - 2], e[o - 1], ["exit", c, t]]), l = Xe(l, e.slice(o + 1)), l = Xe(l, [["exit", s, t]]), st(e, a, e.length, l), e;
}
function Gs(e, t, n) {
  const r = this;
  let i = r.events.length, a, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return l;
  function l(g) {
    return a ? a._inactive ? p(g) : (o = r.parser.defined.includes(Ht(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(g), e.exit("labelMarker"), e.exit("labelEnd"), s) : n(g);
  }
  function s(g) {
    return g === 40 ? e.attempt(Hs, u, o ? u : p)(g) : g === 91 ? e.attempt(Us, u, o ? c : p)(g) : o ? u(g) : p(g);
  }
  function c(g) {
    return e.attempt(Fs, u, p)(g);
  }
  function u(g) {
    return t(g);
  }
  function p(g) {
    return a._balanced = !0, n(g);
  }
}
function Vs(e, t, n) {
  return r;
  function r(p) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), i;
  }
  function i(p) {
    return Fe(p) ? Yt(e, a)(p) : a(p);
  }
  function a(p) {
    return p === 41 ? u(p) : aa(e, o, l, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(p);
  }
  function o(p) {
    return Fe(p) ? Yt(e, s)(p) : u(p);
  }
  function l(p) {
    return n(p);
  }
  function s(p) {
    return p === 34 || p === 39 || p === 40 ? la(e, c, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(p) : u(p);
  }
  function c(p) {
    return Fe(p) ? Yt(e, u)(p) : u(p);
  }
  function u(p) {
    return p === 41 ? (e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), e.exit("resource"), t) : n(p);
  }
}
function js(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return oa.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(l);
  }
  function a(l) {
    return r.parser.defined.includes(Ht(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(l) : n(l);
  }
  function o(l) {
    return n(l);
  }
}
function $s(e, t, n) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), i;
  }
  function i(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), t) : n(a);
  }
}
const Ws = {
  name: "labelStartImage",
  resolveAll: dr.resolveAll,
  tokenize: Zs
};
function Zs(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(l), e.exit("labelImageMarker"), a;
  }
  function a(l) {
    return l === 91 ? (e.enter("labelMarker"), e.consume(l), e.exit("labelMarker"), e.exit("labelImage"), o) : n(l);
  }
  function o(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : t(l);
  }
}
const qs = {
  name: "labelStartLink",
  resolveAll: dr.resolveAll,
  tokenize: Xs
};
function Xs(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), a;
  }
  function a(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const On = {
  name: "lineEnding",
  tokenize: Ys
};
function Ys(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), he(e, t, "linePrefix");
  }
}
const cn = {
  name: "thematicBreak",
  tokenize: Ks
};
function Ks(e, t, n) {
  let r = 0, i;
  return a;
  function a(c) {
    return e.enter("thematicBreak"), o(c);
  }
  function o(c) {
    return i = c, l(c);
  }
  function l(c) {
    return c === i ? (e.enter("thematicBreakSequence"), s(c)) : r >= 3 && (c === null || G(c)) ? (e.exit("thematicBreak"), t(c)) : n(c);
  }
  function s(c) {
    return c === i ? (e.consume(c), r++, s) : (e.exit("thematicBreakSequence"), ie(c) ? he(e, l, "whitespace")(c) : l(c));
  }
}
const Pe = {
  continuation: {
    tokenize: t1
  },
  exit: r1,
  name: "list",
  tokenize: e1
}, Qs = {
  partial: !0,
  tokenize: i1
}, Js = {
  partial: !0,
  tokenize: n1
};
function e1(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return l;
  function l(h) {
    const y = r.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (y === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : Qn(h)) {
      if (r.containerState.type || (r.containerState.type = y, e.enter(y, {
        _container: !0
      })), y === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(cn, n, c)(h) : c(h);
      if (!r.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(h);
    }
    return n(h);
  }
  function s(h) {
    return Qn(h) && ++o < 10 ? (e.consume(h), s) : (!r.interrupt || o < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), c(h)) : n(h);
  }
  function c(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e.check(
      yn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : u,
      e.attempt(Qs, g, p)
    );
  }
  function u(h) {
    return r.containerState.initialBlankLine = !0, a++, g(h);
  }
  function p(h) {
    return ie(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), g) : n(h);
  }
  function g(h) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(h);
  }
}
function t1(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(yn, i, a);
  function i(l) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, he(e, t, "listItemIndent", r.containerState.size + 1)(l);
  }
  function a(l) {
    return r.containerState.furtherBlankLines || !ie(l) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(l)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Js, t, o)(l));
  }
  function o(l) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, he(e, e.attempt(Pe, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l);
  }
}
function n1(e, t, n) {
  const r = this;
  return he(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function r1(e) {
  e.exit(this.containerState.type);
}
function i1(e, t, n) {
  const r = this;
  return he(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const o = r.events[r.events.length - 1];
    return !ie(a) && o && o[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const oi = {
  name: "setextUnderline",
  resolveTo: a1,
  tokenize: o1
};
function a1(e, t) {
  let n = e.length, r, i, a;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === "content") {
        r = n;
        break;
      }
      e[n][1].type === "paragraph" && (i = n);
    } else
      e[n][1].type === "content" && e.splice(n, 1), !a && e[n][1].type === "definition" && (a = n);
  const o = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", a ? (e.splice(i, 0, ["enter", o, t]), e.splice(a + 1, 0, ["exit", e[r][1], t]), e[r][1].end = {
    ...e[a][1].end
  }) : e[r][1] = o, e.push(["exit", o, t]), e;
}
function o1(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(c) {
    let u = r.events.length, p;
    for (; u--; )
      if (r.events[u][1].type !== "lineEnding" && r.events[u][1].type !== "linePrefix" && r.events[u][1].type !== "content") {
        p = r.events[u][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || p) ? (e.enter("setextHeadingLine"), i = c, o(c)) : n(c);
  }
  function o(c) {
    return e.enter("setextHeadingLineSequence"), l(c);
  }
  function l(c) {
    return c === i ? (e.consume(c), l) : (e.exit("setextHeadingLineSequence"), ie(c) ? he(e, s, "lineSuffix")(c) : s(c));
  }
  function s(c) {
    return c === null || G(c) ? (e.exit("setextHeadingLine"), t(c)) : n(c);
  }
}
const l1 = {
  tokenize: s1
};
function s1(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    yn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, he(e, e.attempt(this.parser.constructs.flow, i, e.attempt(ds, i)), "linePrefix"))
  );
  return n;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(a), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
  }
  function i(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), t.currentConstruct = void 0, n;
  }
}
const u1 = {
  resolveAll: ua()
}, c1 = sa("string"), h1 = sa("text");
function sa(e) {
  return {
    resolveAll: ua(e === "text" ? p1 : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], a = n.attempt(i, o, l);
    return o;
    function o(u) {
      return c(u) ? a(u) : l(u);
    }
    function l(u) {
      if (u === null) {
        n.consume(u);
        return;
      }
      return n.enter("data"), n.consume(u), s;
    }
    function s(u) {
      return c(u) ? (n.exit("data"), a(u)) : (n.consume(u), s);
    }
    function c(u) {
      if (u === null)
        return !0;
      const p = i[u];
      let g = -1;
      if (p)
        for (; ++g < p.length; ) {
          const h = p[g];
          if (!h.previous || h.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function ua(e) {
  return t;
  function t(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === "data" && (a = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function p1(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let a = i.length, o = -1, l = 0, s;
      for (; a--; ) {
        const c = i[a];
        if (typeof c == "string") {
          for (o = c.length; c.charCodeAt(o - 1) === 32; )
            l++, o--;
          if (o) break;
          o = -1;
        } else if (c === -2)
          s = !0, l++;
        else if (c !== -1) {
          a++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (l = 0), l) {
        const c = {
          type: n === e.length || s || l < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: a ? o : r.start._bufferIndex + o,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - l,
            offset: r.end.offset - l
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...c.start
        }, r.start.offset === r.end.offset ? Object.assign(r, c) : (e.splice(n, 0, ["enter", c, t], ["exit", c, t]), n += 2);
      }
      n++;
    }
  return e;
}
const d1 = {
  42: Pe,
  43: Pe,
  45: Pe,
  48: Pe,
  49: Pe,
  50: Pe,
  51: Pe,
  52: Pe,
  53: Pe,
  54: Pe,
  55: Pe,
  56: Pe,
  57: Pe,
  62: ta
}, f1 = {
  91: ys
}, m1 = {
  [-2]: Mn,
  [-1]: Mn,
  32: Mn
}, g1 = {
  35: Ts,
  42: cn,
  45: [oi, cn],
  60: Is,
  61: oi,
  95: cn,
  96: ii,
  126: ii
}, C1 = {
  38: ra,
  92: na
}, y1 = {
  [-5]: On,
  [-4]: On,
  [-3]: On,
  33: Ws,
  38: ra,
  42: Jn,
  60: [ql, Ds],
  91: qs,
  92: [_s, na],
  93: dr,
  95: Jn,
  96: ls
}, w1 = {
  null: [Jn, u1]
}, E1 = {
  null: [42, 95]
}, S1 = {
  null: []
}, _1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: E1,
  contentInitial: f1,
  disable: S1,
  document: d1,
  flow: g1,
  flowInitial: m1,
  insideSpan: w1,
  string: C1,
  text: y1
}, Symbol.toStringTag, { value: "Module" }));
function x1(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, a = [];
  let o = [], l = [];
  const s = {
    attempt: D(j),
    check: D(w),
    consume: H,
    enter: N,
    exit: P,
    interrupt: D(w, {
      interrupt: !0
    })
  }, c = {
    code: null,
    containerState: {},
    defineSkip: S,
    events: [],
    now: y,
    parser: e,
    previous: null,
    sliceSerialize: g,
    sliceStream: h,
    write: p
  };
  let u = t.tokenize.call(c, s);
  return t.resolveAll && a.push(t), c;
  function p(b) {
    return o = Xe(o, b), R(), o[o.length - 1] !== null ? [] : (Z(t, 0), c.events = pr(a, c.events, c), c.events);
  }
  function g(b, v) {
    return k1(h(b), v);
  }
  function h(b) {
    return T1(o, b);
  }
  function y() {
    const {
      _bufferIndex: b,
      _index: v,
      line: Q,
      column: M,
      offset: A
    } = r;
    return {
      _bufferIndex: b,
      _index: v,
      line: Q,
      column: M,
      offset: A
    };
  }
  function S(b) {
    i[b.line] = b.column, U();
  }
  function R() {
    let b;
    for (; r._index < o.length; ) {
      const v = o[r._index];
      if (typeof v == "string")
        for (b = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === b && r._bufferIndex < v.length; )
          _(v.charCodeAt(r._bufferIndex));
      else
        _(v);
    }
  }
  function _(b) {
    u = u(b);
  }
  function H(b) {
    G(b) ? (r.line++, r.column = 1, r.offset += b === -3 ? 2 : 1, U()) : b !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = b;
  }
  function N(b, v) {
    const Q = v || {};
    return Q.type = b, Q.start = y(), c.events.push(["enter", Q, c]), l.push(Q), Q;
  }
  function P(b) {
    const v = l.pop();
    return v.end = y(), c.events.push(["exit", v, c]), v;
  }
  function j(b, v) {
    Z(b, v.from);
  }
  function w(b, v) {
    v.restore();
  }
  function D(b, v) {
    return Q;
    function Q(M, A, ee) {
      let Y, ue, me, f;
      return Array.isArray(M) ? (
        /* c8 ignore next 1 */
        ge(M)
      ) : "tokenize" in M ? (
        // Looks like a construct.
        ge([
          /** @type {Construct} */
          M
        ])
      ) : te(M);
      function te(q) {
        return ae;
        function ae(de) {
          const Se = de !== null && q[de], Re = de !== null && q.null, ut = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Se) ? Se : Se ? [Se] : [],
            ...Array.isArray(Re) ? Re : Re ? [Re] : []
          ];
          return ge(ut)(de);
        }
      }
      function ge(q) {
        return Y = q, ue = 0, q.length === 0 ? ee : m(q[ue]);
      }
      function m(q) {
        return ae;
        function ae(de) {
          return f = z(), me = q, q.partial || (c.currentConstruct = q), q.name && c.parser.constructs.disable.null.includes(q.name) ? V() : q.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            v ? Object.assign(Object.create(c), v) : c,
            s,
            le,
            V
          )(de);
        }
      }
      function le(q) {
        return b(me, f), A;
      }
      function V(q) {
        return f.restore(), ++ue < Y.length ? m(Y[ue]) : ee;
      }
    }
  }
  function Z(b, v) {
    b.resolveAll && !a.includes(b) && a.push(b), b.resolve && st(c.events, v, c.events.length - v, b.resolve(c.events.slice(v), c)), b.resolveTo && (c.events = b.resolveTo(c.events, c));
  }
  function z() {
    const b = y(), v = c.previous, Q = c.currentConstruct, M = c.events.length, A = Array.from(l);
    return {
      from: M,
      restore: ee
    };
    function ee() {
      r = b, c.previous = v, c.currentConstruct = Q, c.events.length = M, l = A, U();
    }
  }
  function U() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function T1(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex;
  let o;
  if (n === i)
    o = [e[n].slice(r, a)];
  else {
    if (o = e.slice(n, i), r > -1) {
      const l = o[0];
      typeof l == "string" ? o[0] = l.slice(r) : o.shift();
    }
    a > 0 && o.push(e[i].slice(0, a));
  }
  return o;
}
function k1(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const a = e[n];
    let o;
    if (typeof a == "string")
      o = a;
    else switch (a) {
      case -5: {
        o = "\r";
        break;
      }
      case -4: {
        o = `
`;
        break;
      }
      case -3: {
        o = `\r
`;
        break;
      }
      case -2: {
        o = t ? " " : "	";
        break;
      }
      case -1: {
        if (!t && i) continue;
        o = " ";
        break;
      }
      default:
        o = String.fromCharCode(a);
    }
    i = a === -2, r.push(o);
  }
  return r.join("");
}
function b1(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Ml([_1, ...(e || {}).extensions || []])
    ),
    content: i(Bl),
    defined: [],
    document: i(Vl),
    flow: i(l1),
    lazy: {},
    string: i(c1),
    text: i(h1)
  };
  return r;
  function i(a) {
    return o;
    function o(l) {
      return x1(r, a, l);
    }
  }
}
function A1(e) {
  for (; !ia(e); )
    ;
  return e;
}
const li = /[\0\t\n\r]/g;
function I1() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, o, l) {
    const s = [];
    let c, u, p, g, h;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(o || void 0).decode(a)), p = 0, t = "", n && (a.charCodeAt(0) === 65279 && p++, n = void 0); p < a.length; ) {
      if (li.lastIndex = p, c = li.exec(a), g = c && c.index !== void 0 ? c.index : a.length, h = a.charCodeAt(g), !c) {
        t = a.slice(p);
        break;
      }
      if (h === 10 && p === g && r)
        s.push(-3), r = void 0;
      else
        switch (r && (s.push(-5), r = void 0), p < g && (s.push(a.slice(p, g)), e += g - p), h) {
          case 0: {
            s.push(65533), e++;
            break;
          }
          case 9: {
            for (u = Math.ceil(e / 4) * 4, s.push(-2); e++ < u; ) s.push(-1);
            break;
          }
          case 10: {
            s.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      p = g + 1;
    }
    return l && (r && s.push(-5), t && s.push(t), s.push(null)), s;
  }
}
const R1 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function N1(e) {
  return e.replace(R1, v1);
}
function v1(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return ea(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return hr(n) || e;
}
const ca = {}.hasOwnProperty;
function L1(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), M1(n)(A1(b1(n).document().write(I1()(e, t, !0))));
}
function M1(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(We),
      autolinkProtocol: z,
      autolinkEmail: z,
      atxHeading: a($e),
      blockQuote: a(Re),
      characterEscape: z,
      characterReference: z,
      codeFenced: a(ut),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: a(ut, o),
      codeText: a(vt, o),
      codeTextData: z,
      data: z,
      codeFlowValue: z,
      definition: a(je),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: a(Ct),
      hardBreakEscape: a(ct),
      hardBreakTrailing: a(ct),
      htmlFlow: a(yt, o),
      htmlFlowData: z,
      htmlText: a(yt, o),
      htmlTextData: z,
      image: a(Ke),
      label: o,
      link: a(We),
      listItem: a(wt),
      listItemValue: g,
      listOrdered: a(ht, p),
      listUnordered: a(ht),
      paragraph: a(bt),
      reference: m,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: a($e),
      strong: a(nt),
      thematicBreak: a(pt)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: j,
      autolink: s(),
      autolinkEmail: Se,
      autolinkProtocol: de,
      blockQuote: s(),
      characterEscapeValue: U,
      characterReferenceMarkerHexadecimal: V,
      characterReferenceMarkerNumeric: V,
      characterReferenceValue: q,
      characterReference: ae,
      codeFenced: s(R),
      codeFencedFence: S,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: y,
      codeFlowValue: U,
      codeIndented: s(_),
      codeText: s(A),
      codeTextData: U,
      data: U,
      definition: s(),
      definitionDestinationString: P,
      definitionLabelString: H,
      definitionTitleString: N,
      emphasis: s(),
      hardBreakEscape: s(v),
      hardBreakTrailing: s(v),
      htmlFlow: s(Q),
      htmlFlowData: U,
      htmlText: s(M),
      htmlTextData: U,
      image: s(Y),
      label: me,
      labelText: ue,
      lineEnding: b,
      link: s(ee),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: le,
      resourceDestinationString: f,
      resourceTitleString: te,
      resource: ge,
      setextHeading: s(Z),
      setextHeadingLineSequence: D,
      setextHeadingText: w,
      strong: s(),
      thematicBreak: s()
    }
  };
  ha(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(E) {
    let k = {
      type: "root",
      children: []
    };
    const F = {
      stack: [k],
      tokenStack: [],
      config: t,
      enter: l,
      exit: c,
      buffer: o,
      resume: u,
      data: n
    }, X = [];
    let re = -1;
    for (; ++re < E.length; )
      if (E[re][1].type === "listOrdered" || E[re][1].type === "listUnordered")
        if (E[re][0] === "enter")
          X.push(re);
        else {
          const xe = X.pop();
          re = i(E, xe, re);
        }
    for (re = -1; ++re < E.length; ) {
      const xe = t[E[re][0]];
      ca.call(xe, E[re][1].type) && xe[E[re][1].type].call(Object.assign({
        sliceSerialize: E[re][2].sliceSerialize
      }, F), E[re][1]);
    }
    if (F.tokenStack.length > 0) {
      const xe = F.tokenStack[F.tokenStack.length - 1];
      (xe[1] || si).call(F, void 0, xe[0]);
    }
    for (k.position = {
      start: St(E.length > 0 ? E[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: St(E.length > 0 ? E[E.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, re = -1; ++re < t.transforms.length; )
      k = t.transforms[re](k) || k;
    return k;
  }
  function i(E, k, F) {
    let X = k - 1, re = -1, xe = !1, Ze, ke, Be, K;
    for (; ++X <= F; ) {
      const $ = E[X];
      switch ($[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          $[0] === "enter" ? re++ : re--, K = void 0;
          break;
        }
        case "lineEndingBlank": {
          $[0] === "enter" && (Ze && !K && !re && !Be && (Be = X), K = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          K = void 0;
      }
      if (!re && $[0] === "enter" && $[1].type === "listItemPrefix" || re === -1 && $[0] === "exit" && ($[1].type === "listUnordered" || $[1].type === "listOrdered")) {
        if (Ze) {
          let Ce = X;
          for (ke = void 0; Ce--; ) {
            const pe = E[Ce];
            if (pe[1].type === "lineEnding" || pe[1].type === "lineEndingBlank") {
              if (pe[0] === "exit") continue;
              ke && (E[ke][1].type = "lineEndingBlank", xe = !0), pe[1].type = "lineEnding", ke = Ce;
            } else if (!(pe[1].type === "linePrefix" || pe[1].type === "blockQuotePrefix" || pe[1].type === "blockQuotePrefixWhitespace" || pe[1].type === "blockQuoteMarker" || pe[1].type === "listItemIndent")) break;
          }
          Be && (!ke || Be < ke) && (Ze._spread = !0), Ze.end = Object.assign({}, ke ? E[ke][1].start : $[1].end), E.splice(ke || X, 0, ["exit", Ze, $[2]]), X++, F++;
        }
        if ($[1].type === "listItemPrefix") {
          const Ce = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, $[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ze = Ce, E.splice(X, 0, ["enter", Ce, $[2]]), X++, F++, Be = void 0, K = !0;
        }
      }
    }
    return E[k][1]._spread = xe, F;
  }
  function a(E, k) {
    return F;
    function F(X) {
      l.call(this, E(X), X), k && k.call(this, X);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function l(E, k, F) {
    this.stack[this.stack.length - 1].children.push(E), this.stack.push(E), this.tokenStack.push([k, F || void 0]), E.position = {
      start: St(k.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(E) {
    return k;
    function k(F) {
      E && E.call(this, F), c.call(this, F);
    }
  }
  function c(E, k) {
    const F = this.stack.pop(), X = this.tokenStack.pop();
    if (X)
      X[0].type !== E.type && (k ? k.call(this, E, X[0]) : (X[1] || si).call(this, E, X[0]));
    else throw new Error("Cannot close `" + E.type + "` (" + Xt({
      start: E.start,
      end: E.end
    }) + "): it’s not open");
    F.position.end = St(E.end);
  }
  function u() {
    return vl(this.stack.pop());
  }
  function p() {
    this.data.expectingFirstListItemValue = !0;
  }
  function g(E) {
    if (this.data.expectingFirstListItemValue) {
      const k = this.stack[this.stack.length - 2];
      k.start = Number.parseInt(this.sliceSerialize(E), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const E = this.resume(), k = this.stack[this.stack.length - 1];
    k.lang = E;
  }
  function y() {
    const E = this.resume(), k = this.stack[this.stack.length - 1];
    k.meta = E;
  }
  function S() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function R() {
    const E = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function _() {
    const E = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = E.replace(/(\r?\n|\r)$/g, "");
  }
  function H(E) {
    const k = this.resume(), F = this.stack[this.stack.length - 1];
    F.label = k, F.identifier = Ht(this.sliceSerialize(E)).toLowerCase();
  }
  function N() {
    const E = this.resume(), k = this.stack[this.stack.length - 1];
    k.title = E;
  }
  function P() {
    const E = this.resume(), k = this.stack[this.stack.length - 1];
    k.url = E;
  }
  function j(E) {
    const k = this.stack[this.stack.length - 1];
    if (!k.depth) {
      const F = this.sliceSerialize(E).length;
      k.depth = F;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function D(E) {
    const k = this.stack[this.stack.length - 1];
    k.depth = this.sliceSerialize(E).codePointAt(0) === 61 ? 1 : 2;
  }
  function Z() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function z(E) {
    const F = this.stack[this.stack.length - 1].children;
    let X = F[F.length - 1];
    (!X || X.type !== "text") && (X = rt(), X.position = {
      start: St(E.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, F.push(X)), this.stack.push(X);
  }
  function U(E) {
    const k = this.stack.pop();
    k.value += this.sliceSerialize(E), k.position.end = St(E.end);
  }
  function b(E) {
    const k = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const F = k.children[k.children.length - 1];
      F.position.end = St(E.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(k.type) && (z.call(this, E), U.call(this, E));
  }
  function v() {
    this.data.atHardBreak = !0;
  }
  function Q() {
    const E = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = E;
  }
  function M() {
    const E = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = E;
  }
  function A() {
    const E = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = E;
  }
  function ee() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const k = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = k, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function Y() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const k = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = k, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function ue(E) {
    const k = this.sliceSerialize(E), F = this.stack[this.stack.length - 2];
    F.label = N1(k), F.identifier = Ht(k).toLowerCase();
  }
  function me() {
    const E = this.stack[this.stack.length - 1], k = this.resume(), F = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, F.type === "link") {
      const X = E.children;
      F.children = X;
    } else
      F.alt = k;
  }
  function f() {
    const E = this.resume(), k = this.stack[this.stack.length - 1];
    k.url = E;
  }
  function te() {
    const E = this.resume(), k = this.stack[this.stack.length - 1];
    k.title = E;
  }
  function ge() {
    this.data.inReference = void 0;
  }
  function m() {
    this.data.referenceType = "collapsed";
  }
  function le(E) {
    const k = this.resume(), F = this.stack[this.stack.length - 1];
    F.label = k, F.identifier = Ht(this.sliceSerialize(E)).toLowerCase(), this.data.referenceType = "full";
  }
  function V(E) {
    this.data.characterReferenceType = E.type;
  }
  function q(E) {
    const k = this.sliceSerialize(E), F = this.data.characterReferenceType;
    let X;
    F ? (X = ea(k, F === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : X = hr(k);
    const re = this.stack[this.stack.length - 1];
    re.value += X;
  }
  function ae(E) {
    const k = this.stack.pop();
    k.position.end = St(E.end);
  }
  function de(E) {
    U.call(this, E);
    const k = this.stack[this.stack.length - 1];
    k.url = this.sliceSerialize(E);
  }
  function Se(E) {
    U.call(this, E);
    const k = this.stack[this.stack.length - 1];
    k.url = "mailto:" + this.sliceSerialize(E);
  }
  function Re() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function ut() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function vt() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function je() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Ct() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function $e() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function ct() {
    return {
      type: "break"
    };
  }
  function yt() {
    return {
      type: "html",
      value: ""
    };
  }
  function Ke() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function We() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function ht(E) {
    return {
      type: "list",
      ordered: E.type === "listOrdered",
      start: null,
      spread: E._spread,
      children: []
    };
  }
  function wt(E) {
    return {
      type: "listItem",
      spread: E._spread,
      checked: null,
      children: []
    };
  }
  function bt() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function nt() {
    return {
      type: "strong",
      children: []
    };
  }
  function rt() {
    return {
      type: "text",
      value: ""
    };
  }
  function pt() {
    return {
      type: "thematicBreak"
    };
  }
}
function St(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function ha(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? ha(e, r) : O1(e, r);
  }
}
function O1(e, t) {
  let n;
  for (n in t)
    if (ca.call(t, n))
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
function si(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Xt({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Xt({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Xt({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function D1(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return L1(r, {
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
function P1(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function H1(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function U1(e, t) {
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
function F1(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function z1(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function B1(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = zt(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
  let o, l = e.footnoteCounts.get(r);
  l === void 0 ? (l = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = a + 1, l += 1, e.footnoteCounts.set(r, l);
  const s = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (l > 1 ? "-" + l : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(o) }]
  };
  e.patch(t, s);
  const c = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [s]
  };
  return e.patch(t, c), e.applyData(t, c);
}
function G1(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function V1(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function pa(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function j1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return pa(e, t);
  const i = { src: zt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function $1(e, t) {
  const n = { src: zt(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function W1(e, t) {
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
function Z1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return pa(e, t);
  const i = { href: zt(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function q1(e, t) {
  const n = { href: zt(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function X1(e, t, n) {
  const r = e.all(t), i = n ? Y1(n) : da(t), a = {}, o = [];
  if (typeof t.checked == "boolean") {
    const u = r[0];
    let p;
    u && u.type === "element" && u.tagName === "p" ? p = u : (p = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(p)), p.children.length > 0 && p.children.unshift({ type: "text", value: " " }), p.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), a.className = ["task-list-item"];
  }
  let l = -1;
  for (; ++l < r.length; ) {
    const u = r[l];
    (i || l !== 0 || u.type !== "element" || u.tagName !== "p") && o.push({ type: "text", value: `
` }), u.type === "element" && u.tagName === "p" && !i ? o.push(...u.children) : o.push(u);
  }
  const s = r[r.length - 1];
  s && (i || s.type !== "element" || s.tagName !== "p") && o.push({ type: "text", value: `
` });
  const c = { type: "element", tagName: "li", properties: a, children: o };
  return e.patch(t, c), e.applyData(t, c);
}
function Y1(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = da(n[r]);
  }
  return t;
}
function da(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function K1(e, t) {
  const n = {}, r = e.all(t);
  let i = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length; ) {
    const o = r[i];
    if (o.type === "element" && o.tagName === "li" && o.properties && Array.isArray(o.properties.className) && o.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const a = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(r, !0)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function Q1(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function J1(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function eu(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function tu(e, t) {
  const n = e.all(t), r = n.shift(), i = [];
  if (r) {
    const o = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(t.children[0], o), i.push(o);
  }
  if (n.length > 0) {
    const o = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(n, !0)
    }, l = lr(t.children[1]), s = Zi(t.children[t.children.length - 1]);
    l && s && (o.position = { start: l, end: s }), i.push(o);
  }
  const a = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function nu(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, l = o ? o.length : t.children.length;
  let s = -1;
  const c = [];
  for (; ++s < l; ) {
    const p = t.children[s], g = {}, h = o ? o[s] : void 0;
    h && (g.align = h);
    let y = { type: "element", tagName: a, properties: g, children: [] };
    p && (y.children = e.all(p), e.patch(p, y), y = e.applyData(p, y)), c.push(y);
  }
  const u = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(c, !0)
  };
  return e.patch(t, u), e.applyData(t, u);
}
function ru(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const ui = 9, ci = 32;
function iu(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const a = [];
  for (; r; )
    a.push(
      hi(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return a.push(hi(t.slice(i), i > 0, !1)), a.join("");
}
function hi(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let a = e.codePointAt(r);
    for (; a === ui || a === ci; )
      r++, a = e.codePointAt(r);
  }
  if (n) {
    let a = e.codePointAt(i - 1);
    for (; a === ui || a === ci; )
      i--, a = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function au(e, t) {
  const n = { type: "text", value: iu(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function ou(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const lu = {
  blockquote: P1,
  break: H1,
  code: U1,
  delete: F1,
  emphasis: z1,
  footnoteReference: B1,
  heading: G1,
  html: V1,
  imageReference: j1,
  image: $1,
  inlineCode: W1,
  linkReference: Z1,
  link: q1,
  listItem: X1,
  list: K1,
  paragraph: Q1,
  // @ts-expect-error: root is different, but hard to type.
  root: J1,
  strong: eu,
  table: tu,
  tableCell: ru,
  tableRow: nu,
  text: au,
  thematicBreak: ou,
  toml: an,
  yaml: an,
  definition: an,
  footnoteDefinition: an
};
function an() {
}
const fa = -1, wn = 0, Kt = 1, fn = 2, fr = 3, mr = 4, gr = 5, Cr = 6, ma = 7, ga = 8, pi = typeof self == "object" ? self : globalThis, su = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, o] = t[i];
    switch (a) {
      case wn:
      case fa:
        return n(o, i);
      case Kt: {
        const l = n([], i);
        for (const s of o)
          l.push(r(s));
        return l;
      }
      case fn: {
        const l = n({}, i);
        for (const [s, c] of o)
          l[r(s)] = r(c);
        return l;
      }
      case fr:
        return n(new Date(o), i);
      case mr: {
        const { source: l, flags: s } = o;
        return n(new RegExp(l, s), i);
      }
      case gr: {
        const l = n(/* @__PURE__ */ new Map(), i);
        for (const [s, c] of o)
          l.set(r(s), r(c));
        return l;
      }
      case Cr: {
        const l = n(/* @__PURE__ */ new Set(), i);
        for (const s of o)
          l.add(r(s));
        return l;
      }
      case ma: {
        const { name: l, message: s } = o;
        return n(new pi[l](s), i);
      }
      case ga:
        return n(BigInt(o), i);
      case "BigInt":
        return n(Object(BigInt(o)), i);
      case "ArrayBuffer":
        return n(new Uint8Array(o).buffer, o);
      case "DataView": {
        const { buffer: l } = new Uint8Array(o);
        return n(new DataView(l), o);
      }
    }
    return n(new pi[a](o), i);
  };
  return r;
}, di = (e) => su(/* @__PURE__ */ new Map(), e)(0), Ot = "", { toString: uu } = {}, { keys: cu } = Object, qt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [wn, t];
  const n = uu.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [Kt, Ot];
    case "Object":
      return [fn, Ot];
    case "Date":
      return [fr, Ot];
    case "RegExp":
      return [mr, Ot];
    case "Map":
      return [gr, Ot];
    case "Set":
      return [Cr, Ot];
    case "DataView":
      return [Kt, n];
  }
  return n.includes("Array") ? [Kt, n] : n.includes("Error") ? [ma, n] : [fn, n];
}, on = ([e, t]) => e === wn && (t === "function" || t === "symbol"), hu = (e, t, n, r) => {
  const i = (o, l) => {
    const s = r.push(o) - 1;
    return n.set(l, s), s;
  }, a = (o) => {
    if (n.has(o))
      return n.get(o);
    let [l, s] = qt(o);
    switch (l) {
      case wn: {
        let u = o;
        switch (s) {
          case "bigint":
            l = ga, u = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            u = null;
            break;
          case "undefined":
            return i([fa], o);
        }
        return i([l, u], o);
      }
      case Kt: {
        if (s) {
          let g = o;
          return s === "DataView" ? g = new Uint8Array(o.buffer) : s === "ArrayBuffer" && (g = new Uint8Array(o)), i([s, [...g]], o);
        }
        const u = [], p = i([l, u], o);
        for (const g of o)
          u.push(a(g));
        return p;
      }
      case fn: {
        if (s)
          switch (s) {
            case "BigInt":
              return i([s, o.toString()], o);
            case "Boolean":
            case "Number":
            case "String":
              return i([s, o.valueOf()], o);
          }
        if (t && "toJSON" in o)
          return a(o.toJSON());
        const u = [], p = i([l, u], o);
        for (const g of cu(o))
          (e || !on(qt(o[g]))) && u.push([a(g), a(o[g])]);
        return p;
      }
      case fr:
        return i([l, o.toISOString()], o);
      case mr: {
        const { source: u, flags: p } = o;
        return i([l, { source: u, flags: p }], o);
      }
      case gr: {
        const u = [], p = i([l, u], o);
        for (const [g, h] of o)
          (e || !(on(qt(g)) || on(qt(h)))) && u.push([a(g), a(h)]);
        return p;
      }
      case Cr: {
        const u = [], p = i([l, u], o);
        for (const g of o)
          (e || !on(qt(g))) && u.push(a(g));
        return p;
      }
    }
    const { message: c } = o;
    return i([l, { name: s, message: c }], o);
  };
  return a;
}, fi = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return hu(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, mn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? di(fi(e, t)) : structuredClone(e)
) : (e, t) => di(fi(e, t));
function pu(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function du(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function fu(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || pu, r = e.options.footnoteBackLabel || du, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, l = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const c = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!c)
      continue;
    const u = e.all(c), p = String(c.identifier).toUpperCase(), g = zt(p.toLowerCase());
    let h = 0;
    const y = [], S = e.footnoteCounts.get(p);
    for (; S !== void 0 && ++h <= S; ) {
      y.length > 0 && y.push({ type: "text", value: " " });
      let H = typeof n == "string" ? n : n(s, h);
      typeof H == "string" && (H = { type: "text", value: H }), y.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + g + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(H) ? H : [H]
      });
    }
    const R = u[u.length - 1];
    if (R && R.type === "element" && R.tagName === "p") {
      const H = R.children[R.children.length - 1];
      H && H.type === "text" ? H.value += " " : R.children.push({ type: "text", value: " " }), R.children.push(...y);
    } else
      u.push(...y);
    const _ = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + g },
      children: e.wrap(u, !0)
    };
    e.patch(c, _), l.push(_);
  }
  if (l.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: a,
          properties: {
            ...mn(o),
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
          children: e.wrap(l, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const Ca = (
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
      return yu;
    if (typeof e == "function")
      return En(e);
    if (typeof e == "object")
      return Array.isArray(e) ? mu(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        gu(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return Cu(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function mu(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Ca(e[n]);
  return En(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function gu(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return En(n);
  function n(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let a;
    for (a in e)
      if (i[a] !== t[a]) return !1;
    return !0;
  }
}
function Cu(e) {
  return En(t);
  function t(n) {
    return n && n.type === e;
  }
}
function En(e) {
  return t;
  function t(n, r, i) {
    return !!(wu(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function yu() {
  return !0;
}
function wu(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const ya = [], Eu = !0, mi = !1, Su = "skip";
function _u(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = Ca(i), o = r ? -1 : 1;
  l(e, void 0, [])();
  function l(s, c, u) {
    const p = (
      /** @type {Record<string, unknown>} */
      s && typeof s == "object" ? s : {}
    );
    if (typeof p.type == "string") {
      const h = (
        // `hast`
        typeof p.tagName == "string" ? p.tagName : (
          // `xast`
          typeof p.name == "string" ? p.name : void 0
        )
      );
      Object.defineProperty(g, "name", {
        value: "node (" + (s.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return g;
    function g() {
      let h = ya, y, S, R;
      if ((!t || a(s, c, u[u.length - 1] || void 0)) && (h = xu(n(s, u)), h[0] === mi))
        return h;
      if ("children" in s && s.children) {
        const _ = (
          /** @type {UnistParent} */
          s
        );
        if (_.children && h[0] !== Su)
          for (S = (r ? _.children.length : -1) + o, R = u.concat(_); S > -1 && S < _.children.length; ) {
            const H = _.children[S];
            if (y = l(H, S, R)(), y[0] === mi)
              return y;
            S = typeof y[1] == "number" ? y[1] : S + o;
          }
      }
      return h;
    }
  }
}
function xu(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Eu, e] : e == null ? ya : [e];
}
function wa(e, t, n, r) {
  let i, a, o;
  typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), _u(e, a, l, i);
  function l(s, c) {
    const u = c[c.length - 1], p = u ? u.children.indexOf(s) : void 0;
    return o(s, p, u);
  }
}
const er = {}.hasOwnProperty, Tu = {};
function ku(e, t) {
  const n = t || Tu, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = { ...lu, ...n.handlers }, l = {
    all: c,
    applyData: Au,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: o,
    one: s,
    options: n,
    patch: bu,
    wrap: Ru
  };
  return wa(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const p = u.type === "definition" ? r : i, g = String(u.identifier).toUpperCase();
      p.has(g) || p.set(g, u);
    }
  }), l;
  function s(u, p) {
    const g = u.type, h = l.handlers[g];
    if (er.call(l.handlers, g) && h)
      return h(l, u, p);
    if (l.options.passThrough && l.options.passThrough.includes(g)) {
      if ("children" in u) {
        const { children: S, ...R } = u, _ = mn(R);
        return _.children = l.all(u), _;
      }
      return mn(u);
    }
    return (l.options.unknownHandler || Iu)(l, u, p);
  }
  function c(u) {
    const p = [];
    if ("children" in u) {
      const g = u.children;
      let h = -1;
      for (; ++h < g.length; ) {
        const y = l.one(g[h], u);
        if (y) {
          if (h && g[h - 1].type === "break" && (!Array.isArray(y) && y.type === "text" && (y.value = gi(y.value)), !Array.isArray(y) && y.type === "element")) {
            const S = y.children[0];
            S && S.type === "text" && (S.value = gi(S.value));
          }
          Array.isArray(y) ? p.push(...y) : p.push(y);
        }
      }
    }
    return p;
  }
}
function bu(e, t) {
  e.position && (t.position = ul(e));
}
function Au(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, a = e.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element")
        n.tagName = r;
      else {
        const o = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: o };
      }
    n.type === "element" && a && Object.assign(n.properties, mn(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function Iu(e, t) {
  const n = t.data || {}, r = "value" in t && !(er.call(n, "hProperties") || er.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Ru(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function gi(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function Ci(e, t) {
  const n = ku(e, t), r = n.one(e, void 0), i = fu(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function Nu(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      Ci(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      Ci(n, { file: r, ...e || t })
    );
  };
}
function yi(e) {
  if (e)
    throw e;
}
var hn = Object.prototype.hasOwnProperty, Ea = Object.prototype.toString, wi = Object.defineProperty, Ei = Object.getOwnPropertyDescriptor, Si = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : Ea.call(t) === "[object Array]";
}, _i = function(t) {
  if (!t || Ea.call(t) !== "[object Object]")
    return !1;
  var n = hn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && hn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || hn.call(t, i);
}, xi = function(t, n) {
  wi && n.name === "__proto__" ? wi(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, Ti = function(t, n) {
  if (n === "__proto__")
    if (hn.call(t, n)) {
      if (Ei)
        return Ei(t, n).value;
    } else return;
  return t[n];
}, vu = function e() {
  var t, n, r, i, a, o, l = arguments[0], s = 1, c = arguments.length, u = !1;
  for (typeof l == "boolean" && (u = l, l = arguments[1] || {}, s = 2), (l == null || typeof l != "object" && typeof l != "function") && (l = {}); s < c; ++s)
    if (t = arguments[s], t != null)
      for (n in t)
        r = Ti(l, n), i = Ti(t, n), l !== i && (u && i && (_i(i) || (a = Si(i))) ? (a ? (a = !1, o = r && Si(r) ? r : []) : o = r && _i(r) ? r : {}, xi(l, { name: n, newValue: e(u, o, i) })) : typeof i < "u" && xi(l, { name: n, newValue: i }));
  return l;
};
const Dn = /* @__PURE__ */ Wi(vu);
function tr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Lu() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let a = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    l(null, ...i);
    function l(s, ...c) {
      const u = e[++a];
      let p = -1;
      if (s) {
        o(s);
        return;
      }
      for (; ++p < i.length; )
        (c[p] === null || c[p] === void 0) && (c[p] = i[p]);
      i = c, u ? Mu(u, l)(...c) : o(null, ...c);
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
function Mu(e, t) {
  let n;
  return r;
  function r(...o) {
    const l = e.length > o.length;
    let s;
    l && o.push(i);
    try {
      s = e.apply(this, o);
    } catch (c) {
      const u = (
        /** @type {Error} */
        c
      );
      if (l && n)
        throw u;
      return i(u);
    }
    l || (s && s.then && typeof s.then == "function" ? s.then(a, i) : s instanceof Error ? i(s) : a(s));
  }
  function i(o, ...l) {
    n || (n = !0, t(o, ...l));
  }
  function a(o) {
    i(null, o);
  }
}
const ot = { basename: Ou, dirname: Du, extname: Pu, join: Hu, sep: "/" };
function Ou(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  tn(e);
  let n = 0, r = -1, i = e.length, a;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (a) {
          n = i + 1;
          break;
        }
      } else r < 0 && (a = !0, r = i + 1);
    return r < 0 ? "" : e.slice(n, r);
  }
  if (t === e)
    return "";
  let o = -1, l = t.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (a) {
        n = i + 1;
        break;
      }
    } else
      o < 0 && (a = !0, o = i + 1), l > -1 && (e.codePointAt(i) === t.codePointAt(l--) ? l < 0 && (r = i) : (l = -1, r = o));
  return n === r ? r = o : r < 0 && (r = e.length), e.slice(n, r);
}
function Du(e) {
  if (tn(e), e.length === 0)
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
function Pu(e) {
  tn(e);
  let t = e.length, n = -1, r = 0, i = -1, a = 0, o;
  for (; t--; ) {
    const l = e.codePointAt(t);
    if (l === 47) {
      if (o) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (o = !0, n = t + 1), l === 46 ? i < 0 ? i = t : a !== 1 && (a = 1) : i > -1 && (a = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  a === 0 || // The (right-most) trimmed path component is exactly `..`.
  a === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function Hu(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    tn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : Uu(n);
}
function Uu(e) {
  tn(e);
  const t = e.codePointAt(0) === 47;
  let n = Fu(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function Fu(e, t) {
  let n = "", r = 0, i = -1, a = 0, o = -1, l, s;
  for (; ++o <= e.length; ) {
    if (o < e.length)
      l = e.codePointAt(o);
    else {
      if (l === 47)
        break;
      l = 47;
    }
    if (l === 47) {
      if (!(i === o - 1 || a === 1)) if (i !== o - 1 && a === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (s = n.lastIndexOf("/"), s !== n.length - 1) {
              s < 0 ? (n = "", r = 0) : (n = n.slice(0, s), r = n.length - 1 - n.lastIndexOf("/")), i = o, a = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = o, a = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + e.slice(i + 1, o) : n = e.slice(i + 1, o), r = o - i - 1;
      i = o, a = 0;
    } else l === 46 && a > -1 ? a++ : a = -1;
  }
  return n;
}
function tn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const zu = { cwd: Bu };
function Bu() {
  return "/";
}
function nr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Gu(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!nr(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return Vu(e);
}
function Vu(e) {
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
const Pn = (
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
class Sa {
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
    t ? nr(t) ? n = { path: t } : typeof t == "string" || ju(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : zu.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Pn.length; ) {
      const a = Pn[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      Pn.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? ot.basename(this.path) : void 0;
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
    Un(t, "basename"), Hn(t, "basename"), this.path = ot.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? ot.dirname(this.path) : void 0;
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
    ki(this.basename, "dirname"), this.path = ot.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? ot.extname(this.path) : void 0;
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
    if (Hn(t, "extname"), ki(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ot.join(this.dirname, this.stem + (t || ""));
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
    nr(t) && (t = Gu(t)), Un(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? ot.basename(this.path, this.extname) : void 0;
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
    Un(t, "stem"), Hn(t, "stem"), this.path = ot.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new Ie(
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
function Hn(e, t) {
  if (e && e.includes(ot.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ot.sep + "`"
    );
}
function Un(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function ki(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function ju(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const $u = (
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
    ), i = r[e], a = function() {
      return i.apply(a, arguments);
    };
    return Object.setPrototypeOf(a, r), a;
  }
), Wu = {}.hasOwnProperty;
class yr extends $u {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Lu();
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
      new yr()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Dn(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (Bn("data", this.frozen), this.namespace[t] = n, this) : Wu.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Bn("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = ln(t), r = this.parser || this.Parser;
    return Fn("parse", r), r(String(n), n);
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
    return this.freeze(), Fn("process", this.parser || this.Parser), zn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, o) {
      const l = ln(t), s = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(l)
      );
      r.run(s, l, function(u, p, g) {
        if (u || !p || !g)
          return c(u);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          p
        ), y = r.stringify(h, g);
        Xu(y) ? g.value = y : g.result = y, c(
          u,
          /** @type {VFileWithOutput<CompileResult>} */
          g
        );
      });
      function c(u, p) {
        u || !p ? o(u) : a ? a(p) : n(void 0, p);
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
    return this.freeze(), Fn("processSync", this.parser || this.Parser), zn("processSync", this.compiler || this.Compiler), this.process(t, i), Ai("processSync", "process", n), r;
    function i(a, o) {
      n = !0, yi(a), r = o;
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
    bi(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(o, l) {
      const s = ln(n);
      i.run(t, s, c);
      function c(u, p, g) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          p || t
        );
        u ? l(u) : o ? o(h) : r(void 0, h, g);
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
    return this.run(t, n, a), Ai("runSync", "run", r), i;
    function a(o, l) {
      yi(o), i = l, r = !0;
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
    const r = ln(n), i = this.compiler || this.Compiler;
    return zn("stringify", i), bi(t), i(t, r);
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
    if (Bn("use", this.frozen), t != null) if (typeof t == "function")
      s(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? l(t) : o(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function a(c) {
      if (typeof c == "function")
        s(c, []);
      else if (typeof c == "object")
        if (Array.isArray(c)) {
          const [u, ...p] = (
            /** @type {PluginTuple<Array<unknown>>} */
            c
          );
          s(u, p);
        } else
          o(c);
      else
        throw new TypeError("Expected usable value, not `" + c + "`");
    }
    function o(c) {
      if (!("plugins" in c) && !("settings" in c))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      l(c.plugins), c.settings && (i.settings = Dn(!0, i.settings, c.settings));
    }
    function l(c) {
      let u = -1;
      if (c != null) if (Array.isArray(c))
        for (; ++u < c.length; ) {
          const p = c[u];
          a(p);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + c + "`");
    }
    function s(c, u) {
      let p = -1, g = -1;
      for (; ++p < r.length; )
        if (r[p][0] === c) {
          g = p;
          break;
        }
      if (g === -1)
        r.push([c, ...u]);
      else if (u.length > 0) {
        let [h, ...y] = u;
        const S = r[g][1];
        tr(S) && tr(h) && (h = Dn(!0, S, h)), r[g] = [c, h, ...y];
      }
    }
  }
}
const Zu = new yr().freeze();
function Fn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function zn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Bn(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function bi(e) {
  if (!tr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Ai(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function ln(e) {
  return qu(e) ? e : new Sa(e);
}
function qu(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Xu(e) {
  return typeof e == "string" || Yu(e);
}
function Yu(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Ku = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Ii = [], Ri = { allowDangerousHtml: !0 }, Qu = /^(https?|ircs?|mailto|xmpp)$/i, Ju = [
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
function Ni(e) {
  const t = ec(e), n = tc(e);
  return nc(t.runSync(t.parse(n), n), e);
}
function ec(e) {
  const t = e.rehypePlugins || Ii, n = e.remarkPlugins || Ii, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Ri } : Ri;
  return Zu().use(D1).use(n).use(Nu, r).use(t);
}
function tc(e) {
  const t = e.children || "", n = new Sa();
  return typeof t == "string" && (n.value = t), n;
}
function nc(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, l = t.unwrapDisallowed, s = t.urlTransform || rc;
  for (const u of Ju)
    Object.hasOwn(t, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + Ku + u.id, void 0);
  return wa(e, c), fl(e, {
    Fragment: Qt,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: d,
    jsxs: I,
    passKeys: !0,
    passNode: !0
  });
  function c(u, p, g) {
    if (u.type === "raw" && g && typeof p == "number")
      return o ? g.children.splice(p, 1) : g.children[p] = { type: "text", value: u.value }, p;
    if (u.type === "element") {
      let h;
      for (h in Ln)
        if (Object.hasOwn(Ln, h) && Object.hasOwn(u.properties, h)) {
          const y = u.properties[h], S = Ln[h];
          (S === null || S.includes(u.tagName)) && (u.properties[h] = s(String(y || ""), h, u));
        }
    }
    if (u.type === "element") {
      let h = n ? !n.includes(u.tagName) : a ? a.includes(u.tagName) : !1;
      if (!h && r && typeof p == "number" && (h = !r(u, p, g)), h && g && typeof p == "number")
        return l && u.children ? g.children.splice(p, 1, ...u.children) : g.children.splice(p, 1), p;
    }
  }
}
function rc(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    Qu.test(e.slice(0, t)) ? e : ""
  );
}
const B = {
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
}, _e = {
  isThinkingMessage: (e) => e.startsWith(B.THINKING_PREFIX) || e.startsWith(B.REASONING_PREFIX) || e.startsWith(B.THOUGHT_PREFIX),
  isCompletedMessage: (e) => e.includes(B.COMPLETED_MARKER),
  isErrorMessage: (e) => e.includes(B.ERROR_MARKER),
  isHandlingMessage: (e) => e.includes(B.HANDLING_MARKER),
  extractDuration: (e) => {
    const t = e.match(B.PATTERNS.DURATION);
    return t ? ` for ${t[1]} seconds` : void 0;
  },
  cleanReasoningContent: (e) => {
    let t = e.replace(new RegExp(`^${B.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${B.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${B.THOUGHT_PREFIX}\\s*`), "");
    return t = t.replace(/\s*for [\d.]+\s*seconds$/, ""), t = t.replace(B.PATTERNS.THOUGHT_CONTENT, ""), t.trim();
  },
  getMessageType: (e, t) => t === !1 ? _e.isErrorMessage(e) ? B.MESSAGE_TYPES.ERROR : (_e.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || _e.isThinkingMessage(e), B.MESSAGE_TYPES.THOUGHT) : _e.isCompletedMessage(e) ? B.MESSAGE_TYPES.COMPLETED : _e.isErrorMessage(e) ? B.MESSAGE_TYPES.ERROR : (_e.isHandlingMessage(e) || _e.isThinkingMessage(e) && !e.includes(B.UI_TEXT.AI_IS_THINKING), B.MESSAGE_TYPES.THINKING)
};
function ic({ children: e, isStreaming: t }) {
  const [n, r] = ne(!0), [i, a] = ne(!1);
  Dt.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const o = () => {
    t || r(!n);
  }, l = Dt.Children.map(e, (s) => {
    if (Dt.isValidElement(s)) {
      if (s.type === _a)
        return Dt.cloneElement(
          s,
          {
            onToggle: o,
            isExpanded: n
          }
        );
      if (s.type === xa)
        return Dt.cloneElement(
          s,
          {
            isVisible: n
          }
        );
    }
    return s;
  });
  return /* @__PURE__ */ d("div", { className: "chat-wrapper__reasoning", children: l });
}
function _a({
  title: e,
  status: t = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const a = () => /* @__PURE__ */ I(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ d(
          "mask",
          {
            id: "mask0_64_36210",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "16",
            height: "16",
            children: /* @__PURE__ */ d("rect", { width: "16", height: "16", fill: "#D9D9D9" })
          }
        ),
        /* @__PURE__ */ d("g", { mask: "url(#mask0_64_36210)", children: /* @__PURE__ */ d(
          "path",
          {
            d: "M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z",
            fill: "#637381"
          }
        ) })
      ]
    }
  ), o = t === "completed" || e.includes(B.UI_TEXT.THINKING) || e.includes(B.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ I(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${o ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: o ? r : void 0,
      style: { cursor: o ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ d("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ I("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ d("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        o && /* @__PURE__ */ d(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ I(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ d(
                    "mask",
                    {
                      id: "mask0_44_18068",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ d("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ d("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ d(
                    "path",
                    {
                      d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function xa({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ d("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function ac({ children: e }) {
  return /* @__PURE__ */ d("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function oc({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var s, c;
  console.log("clog toolData", n);
  const a = () => {
    if (!r || !i) return null;
    const u = i.find((p) => p.name === r);
    return (u == null ? void 0 : u.description) || null;
  };
  let o;
  if (r != null && r.startsWith("lat_")) {
    const u = (s = n == null ? void 0 : n.parameters) == null ? void 0 : s.query, p = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.url;
    o = u || p || "Executing tool...";
  } else
    o = a();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ d("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ d(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ d("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ d("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ d(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ d(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ d("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ d("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ d(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ d("span", { children: o }),
          /* @__PURE__ */ I("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ d(
                    "mask",
                    {
                      id: "mask0_64_36278",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ d(
                        "rect",
                        {
                          y: "0.381836",
                          width: "16",
                          height: "16",
                          fill: "#D9D9D9"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ d("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ d(
                    "path",
                    {
                      d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ d("span", { children: "Running..." })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ d(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ d("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ d("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ d(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ d(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ d("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ d("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ d(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ d("span", { children: o }),
          /* @__PURE__ */ I("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ d(
                    "mask",
                    {
                      id: "mask0_64_36345",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ d(
                        "rect",
                        {
                          y: "0.381836",
                          width: "16",
                          height: "16",
                          fill: "#D9D9D9"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ d("g", { mask: "url(#mask0_64_36345)", children: /* @__PURE__ */ d(
                    "path",
                    {
                      d: "M7.1501 10.7819L11.1168 6.83193L10.2668 5.98193L7.1501 9.08193L5.73343 7.68193L4.88343 8.53193L7.1501 10.7819ZM8.0001 14.7819C7.12232 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.643 2.1001 10.8653C1.76676 10.0875 1.6001 9.25971 1.6001 8.38193C1.6001 7.49304 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73899 2.81527 5.51676 2.48193C6.29454 2.1486 7.12232 1.98193 8.0001 1.98193C8.88899 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11805 13.9001 5.89027C14.2334 6.66249 14.4001 7.49304 14.4001 8.38193C14.4001 9.25971 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.264 13.9486 10.4918 14.2819C9.71954 14.6153 8.88899 14.7819 8.0001 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819Z",
                      fill: "#4EAD13"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ d("span", { children: "Completed" })
          ] })
        ] });
      case "error":
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ d("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ d(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ d(
                "path",
                {
                  d: "M18 6L6 18M6 6L18 18",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          ) }),
          /* @__PURE__ */ d("span", { className: "chat-wrapper__tooling-handle-title", children: e })
        ] });
      default:
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ d(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ d("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ d("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ d(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ d(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ d("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ d("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ d(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ I("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ d(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ d(
                      "rect",
                      {
                        y: "0.000488281",
                        width: "16",
                        height: "16",
                        fill: "#D9D9D9"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ d("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ d(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ d(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ d("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ d("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ d(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ d("span", { children: "Pending..." })
        ] });
    }
  })() });
}
const lc = ({
  className: e,
  onClick: t,
  size: n = 24,
  color: r = "currentColor"
}) => /* @__PURE__ */ I(
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
      /* @__PURE__ */ d(
        "path",
        {
          d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
          fill: r
        }
      ),
      /* @__PURE__ */ d("circle", { cx: "7", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ d("circle", { cx: "12", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ d("circle", { cx: "17", cy: "10", r: "1", fill: r })
    ]
  }
), sc = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ d(
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
    children: /* @__PURE__ */ d(
      "path",
      {
        d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
        fill: r
      }
    )
  }
), uc = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor",
  isFullscreen: i = !1
}) => /* @__PURE__ */ d(
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
      /* @__PURE__ */ d(
        "path",
        {
          d: "M8 3v3a2 2 0 01-2 2H3M21 8h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3M16 21v-3a2 2 0 012-2h3",
          stroke: r,
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    ) : (
      // Fullscreen icon (arrows pointing outward)
      /* @__PURE__ */ d(
        "path",
        {
          d: "M7 14H5v5h5v-2M5 10V5h5v2M17 14h2v5h-5v-2M19 10V5h-5v2",
          stroke: r,
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    )
  }
), cc = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ d(
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
    children: /* @__PURE__ */ d(
      "path",
      {
        d: "M18 12l-3 3-3-3m-6 3l-3 3-3-3",
        stroke: r,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
), vi = ({
  className: e,
  onClick: t,
  size: n = 16,
  color: r = "currentColor"
}) => /* @__PURE__ */ d(
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
    children: /* @__PURE__ */ d(
      "path",
      {
        d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
        fill: r
      }
    )
  }
), hc = ({
  className: e,
  onClick: t,
  size: n = 18,
  color: r = "currentColor"
}) => /* @__PURE__ */ I(
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
      /* @__PURE__ */ d("mask", { id: "mask0_444_23118", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "18", height: "18", children: /* @__PURE__ */ d("rect", { width: "18", height: "18", fill: "#D9D9D9" }) }),
      /* @__PURE__ */ d("g", { mask: "url(#mask0_444_23118)", children: /* @__PURE__ */ d(
        "path",
        {
          d: "M5.8498 13.4998C5.47855 13.4998 5.16074 13.3676 4.89637 13.1032C4.63199 12.8389 4.4998 12.5211 4.4998 12.1498V3.1498C4.4998 2.77855 4.63199 2.46074 4.89637 2.19637C5.16074 1.93199 5.47855 1.7998 5.8498 1.7998H14.8498C15.2211 1.7998 15.5389 1.93199 15.8032 2.19637C16.0676 2.46074 16.1998 2.77855 16.1998 3.1498V12.1498C16.1998 12.5211 16.0676 12.8389 15.8032 13.1032C15.5389 13.3676 15.2211 13.4998 14.8498 13.4998H5.8498ZM5.8498 12.1498H14.8498V3.1498H5.8498V12.1498ZM3.1498 16.1998C2.77855 16.1998 2.46074 16.0676 2.19637 15.8032C1.93199 15.5389 1.7998 15.2211 1.7998 14.8498V4.4998H3.1498V14.8498H13.4998V16.1998H3.1498Z",
          fill: r
        }
      ) })
    ]
  }
), pc = ({ message: e }) => {
  const [t, n] = ne(!0);
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ I(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!t),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          e.role === "system" ? /* @__PURE__ */ I("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
              "svg",
              {
                width: "20",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ d(
                    "mask",
                    {
                      id: "mask0_64_36257",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ d("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ d("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ d(
                    "path",
                    {
                      d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }),
            /* @__PURE__ */ d("span", { children: "AI text input <show-toolname>..." })
          ] }) : /* @__PURE__ */ d("span", { children: "System Message" }),
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
                /* @__PURE__ */ d(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ d("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ d("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ d(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) })
        ]
      }
    ),
    t && /* @__PURE__ */ d("div", { className: "chat-wrapper__system-message-content", children: /* @__PURE__ */ d("span", { children: e.content }) })
  ] });
}, Ta = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ d("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ d("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ d("code", { className: "chat-wrapper__code-block", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ d("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ d("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ d("li", { className: "chat-wrapper__list-item", ...t, children: e })
}, dc = {
  ...Ta,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ d("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ d("code", { className: "chat-wrapper__code", ...n, children: e })
}, ka = Li(
  ({
    message: e,
    getReasoningTitle: t,
    getReasoningStatus: n,
    getReasoningDuration: r,
    getReasoningContentOnly: i,
    getToolingTitle: a,
    getToolingStatus: o,
    clientTools: l,
    currentAssistantMessageIdRef: s
  }) => {
    const [c, u] = ne(!1), [p, g] = ne(!1), h = se(async () => {
      try {
        await navigator.clipboard.writeText(e.content), u(!0), setTimeout(() => u(!1), 2e3);
      } catch (j) {
        console.error("Failed to copy message:", j);
      }
    }, [e.content]), y = () => /* @__PURE__ */ I("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ d(Ui, { size: 16, variant: "dots" }),
      /* @__PURE__ */ d("span", { children: B.UI_TEXT.THINKING })
    ] }), S = () => /* @__PURE__ */ I(Qt, { children: [
      /* @__PURE__ */ d("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ d(
        "button",
        {
          className: `chat-wrapper__copy-button ${p ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: h,
          title: "Copy message",
          children: /* @__PURE__ */ d(hc, {})
        }
      ) }),
      c && /* @__PURE__ */ d("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), R = () => /* @__PURE__ */ d("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ d("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ d(Ni, { components: Ta, children: e.content }) }),
      S()
    ] }) }), _ = () => /* @__PURE__ */ I("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ d("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ d(Ni, { components: dc, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ d("div", { className: "chat-wrapper__media", children: e.media.map((j, w) => /* @__PURE__ */ d(
        "img",
        {
          src: j,
          alt: `Uploaded content ${w + 1}`,
          className: "chat-wrapper__media-image"
        },
        w
      )) })
    ] }), H = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === s.current ? y() : e.role === "system" ? /* @__PURE__ */ d(pc, { message: e }) : e.role === "assistant" ? R() : _(), N = () => /* @__PURE__ */ I(ic, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ d(
        _a,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ d(xa, { children: i(e.content) })
    ] }), P = () => {
      var j;
      return /* @__PURE__ */ d(ac, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ d(
        oc,
        {
          title: a(e.content, e.isStreaming),
          status: o(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (j = e.toolData) == null ? void 0 : j.toolName,
          clientTools: l
        }
      ) });
    };
    return /* @__PURE__ */ d(
      "div",
      {
        className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
        onMouseEnter: () => e.role === "assistant" && g(!0),
        onMouseLeave: () => e.role === "assistant" && g(!1),
        children: e.role === "reasoning" ? N() : e.role === "tooling" ? P() : /* @__PURE__ */ d("div", { className: "chat-wrapper__message-content", children: H() })
      }
    );
  }
);
ka.displayName = "MessageItem";
const fc = ({ isVisible: e }) => e ? /* @__PURE__ */ d("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ d("span", {}),
  /* @__PURE__ */ d("span", {}),
  /* @__PURE__ */ d("span", {})
] }) }) }) }) : null, ba = rr(({
  messages: e,
  isThinking: t,
  isHandlingTool: n,
  getReasoningTitle: r,
  getReasoningStatus: i,
  getReasoningDuration: a,
  getReasoningContentOnly: o,
  getToolingTitle: l,
  getToolingStatus: s,
  clientTools: c,
  currentAssistantMessageIdRef: u
}, p) => /* @__PURE__ */ I("div", { className: "chat-wrapper__messages", children: [
  e.map((g) => /* @__PURE__ */ d(
    ka,
    {
      message: g,
      getReasoningTitle: r,
      getReasoningStatus: i,
      getReasoningDuration: a,
      getReasoningContentOnly: o,
      getToolingTitle: l,
      getToolingStatus: s,
      clientTools: c,
      currentAssistantMessageIdRef: u
    },
    g.id
  )),
  /* @__PURE__ */ d(fc, { isVisible: t && !n }),
  /* @__PURE__ */ d("div", { ref: p })
] }));
ba.displayName = "MessagesList";
const mc = {
  maxReconnectAttempts: 5,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, gc = {
  NORMAL: 1e3,
  GOING_AWAY: 1001
};
var Je = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(Je || {}), gt = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e))(gt || {}), He = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(He || {}), pn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(pn || {}), _t = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(_t || {});
class Ut {
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
    return this.createConnectionEvent(Je.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(Je.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(Je.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(Je.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(Je.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(Je.CHAT_ERROR, { error: t, errorCode: n });
  }
}
class xt {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(t) {
    return {
      type: gt.CHAT_MESSAGE,
      content: t.content,
      app: t.app,
      media: t.media || [],
      saveToDatabase: t.saveToDatabase ?? !1,
      userId: t.userId,
      convUuid: t.convUuid,
      agentPromptPath: t.agentPromptPath
    };
  }
  /**
   * Create a configure tools message
   */
  static createConfigureToolsMessage(t, n) {
    return {
      type: gt.CONFIGURE_TOOLS,
      toolSchemas: t,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(t) {
    return {
      type: gt.UPDATE_TOOLS,
      toolSchemas: t
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(t) {
    return {
      type: gt.UPDATE_CONTEXT_HELPERS,
      contextHelpers: t
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(t, n) {
    return {
      type: gt.TOOL_CALL_RESPONSE,
      callId: t,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(t, n) {
    return {
      type: gt.TOOL_CALL_RESPONSE,
      callId: t,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: gt.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(t, n) {
    return {
      type: gt.HEARTBEAT_PONG,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      originalTimestamp: t,
      pingTime: n
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
}
class Cc {
  constructor(t, n) {
    oe(this, "ws", null);
    oe(this, "config");
    oe(this, "connectionState");
    oe(this, "reconnectTimer", null);
    oe(this, "heartbeatInterval", null);
    oe(this, "visibilityChangeHandler");
    oe(this, "onOpen");
    oe(this, "onMessage");
    oe(this, "onError");
    oe(this, "onClose");
    oe(this, "onSystemEvent");
    this.config = t, this.connectionState = n, this.visibilityChangeHandler = this.handleVisibilityChange.bind(this), this.registerVisibilityHandler();
  }
  connect() {
    return new Promise((t, n) => {
      try {
        const r = this.buildWebSocketUrl();
        if (this.ws = new WebSocket(r), !this.ws) {
          n(new Error("WebSocket not initialized"));
          return;
        }
        this.setupEventHandlers(t, n);
      } catch (r) {
        n(r);
      }
    });
  }
  buildWebSocketUrl() {
    return this.config.apiUrl.replace(/^https?:\/\//, "ws://") + "/ws";
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
    (i = this.onError) == null || i.call(this, t), t instanceof Event && n ? (this.connectionState.setConnected(!0), n()) : r == null || r(t);
  }
  handleConnectionClosed(t) {
    var n;
    this.processConnectionClosure(t), (n = this.onClose) == null || n.call(this, t), this.shouldReconnectAfterClose(t.code) && this.attemptReconnect();
  }
  updateConnectionState(t, n) {
    this.connectionState.setConnected(t), this.connectionState.setReconnecting(n), this.connectionState.resetReconnectAttempts(), this.connectionState.updateReconnectDelay(this.config.reconnectDelay);
  }
  processConnectionClosure(t) {
    this.connectionState.setConnected(!1), this.stopHeartbeat();
  }
  shouldReconnectAfterClose(t) {
    const { NORMAL: n, GOING_AWAY: r } = gc;
    return t !== n && t !== r;
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
    var i, a;
    if (this.connectionState.isReconnecting || this.connectionState.reconnectAttempts >= this.config.maxReconnectAttempts) {
      this.connectionState.reconnectAttempts >= this.config.maxReconnectAttempts && ((i = this.onSystemEvent) == null || i.call(
        this,
        Ut.connectionLost("Max reconnection attempts reached")
      ));
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    (a = this.onSystemEvent) == null || a.call(this, Ut.reconnecting(t, n)), this.reconnectTimer = window.setTimeout(() => {
      this.connectionState.isConnected || this.reconnect();
    }, this.connectionState.reconnectDelay);
    const r = Math.min(this.connectionState.reconnectDelay * 1.5, 3e4);
    this.connectionState.updateReconnectDelay(r);
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
  setupReconnectHandlers() {
    this.ws && (this.ws.onopen = () => this.handleReconnectionOpened(), this.ws.onerror = () => this.handleReconnectionError(), this.ws.onmessage = (t) => {
      var n;
      return (n = this.onMessage) == null ? void 0 : n.call(this, t);
    }, this.ws.onclose = (t) => this.handleReconnectionClosed(t));
  }
  handleReconnectionOpened() {
    var t, n;
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Ut.connectionRestored()), (n = this.onOpen) == null || n.call(this);
  }
  handleReconnectionError() {
    this.scheduleReconnectAfterError();
  }
  scheduleReconnectAfterError() {
    this.connectionState.setReconnecting(!1), setTimeout(
      () => this.attemptReconnect(),
      this.connectionState.reconnectDelay
    );
  }
  handleReconnectionClosed(t) {
    this.processConnectionClosure(t), this.connectionState.setReconnecting(!1), this.shouldReconnectAfterClose(t.code) && this.attemptReconnect();
  }
  startHeartbeat() {
  }
  sendHeartbeat() {
    const t = xt.serializeHeartbeatPing();
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
    this.ws && this.ws.close();
  }
  disconnect() {
    this.clearTimers(), this.removeEventListeners(), this.closeConnection(), this.connectionState.reset(), this.ws = null;
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
class yc {
  constructor() {
    oe(this, "state");
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
class gn {
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
class Aa {
  constructor(t = {}) {
    oe(this, "handlers", {});
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
class wc extends Aa {
  constructor(n) {
    super({ onReasoningUpdate: n });
    oe(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    oe(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, o) {
    const l = this.getHandler("onReasoningUpdate");
    if (!l) return;
    const s = gn.createReasoningCall(
      i,
      a,
      o || {}
    );
    l(n, r, s);
  }
  handleReasoningStart(n) {
    const r = n.id || "reasoning";
    this.reasoningStartTimes.set(r, Date.now()), this.reasoningContent.set(r, "");
  }
  handleReasoningDelta(n) {
    if (!n.text) return;
    const r = n.id || "reasoning", a = (this.reasoningContent.get(r) || "") + n.text;
    this.reasoningContent.set(r, a);
    const o = `${B.THINKING_PREFIX} ${a}`;
    this.triggerReasoningUpdate(
      !0,
      o,
      r,
      "thinking",
      { text: a }
    );
  }
  handleReasoningEnd(n) {
    const r = n.id || "reasoning", i = this.reasoningContent.get(r) || "", a = this.reasoningStartTimes.get(r);
    let o = "";
    a && (o = ` for ${((Date.now() - a) / 1e3).toFixed(1)} seconds`, this.reasoningStartTimes.delete(r));
    const l = i || B.UI_TEXT.THOUGHT, s = `${B.THOUGHT_PREFIX} ${l}${o}`;
    this.triggerReasoningUpdate(
      !1,
      s,
      r,
      "end",
      { duration: o, fullContent: i }
    ), this.reasoningContent.delete(r);
  }
  setReasoningUpdateHandler(n) {
    this.updateEventHandlers({ onReasoningUpdate: n });
  }
}
class Ec extends Aa {
  constructor(n = {}, r) {
    super({ onReasoningUpdate: r });
    oe(this, "processedToolCalls", /* @__PURE__ */ new Set());
    oe(this, "clientTools", {});
    oe(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var o, l, s;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (o = this.getHandler("onReasoningUpdate")) == null || o(!0, `${B.HANDLING_MARKER} ${i}`, n);
      try {
        const c = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, c), (l = this.getHandler("onReasoningUpdate")) == null || l(!1, `${B.COMPLETED_MARKER} ${i}`, n);
      } catch (c) {
        this.sendToolError(r, c), (s = this.getHandler("onReasoningUpdate")) == null || s(!1, `${B.ERROR_MARKER} Error: ${i} - ${c}`, n);
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
    const i = xt.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = xt.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = gn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId,
        n.args || {}
      );
      r(!0, `${B.HANDLING_MARKER} ${n.toolName}`, a);
    }
  }
  handleServerToolResult(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = gn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId
      );
      r(
        !1,
        `${B.COMPLETED_MARKER} ${n.toolName}`,
        a
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
class Sc {
  constructor(t, n = {}) {
    oe(this, "reasoningHandler");
    oe(this, "toolHandler");
    oe(this, "handlers");
    oe(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new wc(t.onReasoningUpdate), this.toolHandler = new Ec(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case He.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case He.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case He.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case He.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case He.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case He.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case He.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case He.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case He.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case He.HEARTBEAT_ACK:
          break;
        case He.ERROR:
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
      case pn.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case pn.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case pn.CONTENT_DELTA:
        (n = t.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, t.data.delta));
        break;
    }
  }
  handleProviderEvent(t) {
    var r, i, a;
    switch ((r = t.data) == null ? void 0 : r.type) {
      case _t.TEXT_DELTA:
        t.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, t.data.textDelta));
        break;
      case _t.REASONING_START:
        this.reasoningHandler.handleReasoningStart(t.data);
        break;
      case _t.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(t.data);
        break;
      case _t.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(t.data);
        break;
      case _t.TOOL_CALL:
        this.toolHandler.handleServerToolCall(t.data);
        break;
      case _t.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(t.data);
        break;
    }
  }
  handleLatitudeEvent(t) {
    var n;
    if (((n = t.data) == null ? void 0 : n.type) === _t.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = t.data;
      if (r.toolCallId && r.toolName) {
        const i = gn.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${B.COMPLETED_MARKER} ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Ut.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Ut.chatError(t.error || "Unknown error"));
  }
  handleToolCallRequest(t) {
    this.toolHandler.handleToolCallRequest(t);
  }
  handleHeartbeatPing(t) {
    if (!this.sendMessage)
      return;
    const n = xt.serializeHeartbeatPong(
      t.timestamp,
      t.pingTime
    );
    this.sendMessage(n);
  }
  handleError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Ut.chatError(t.error || "Unknown WebSocket error"));
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
class _c {
  constructor() {
    oe(this, "config");
    oe(this, "connectionState");
    oe(this, "wsManager");
    oe(this, "messageHandler");
    oe(this, "initResolve");
    // Client tools and context
    oe(this, "toolSchemas", []);
    oe(this, "contextHelpers", {});
    this.config = {
      ...mc
    }, this.connectionState = new yc(), this.wsManager = new Cc(this.config, this.connectionState), this.messageHandler = new Sc({}), this.setupWebSocketHandlers();
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
    var r, i;
    const n = this.messageHandler.handleMessage(t);
    (n == null ? void 0 : n.type) === He.TOOLS_CONFIGURED && ((r = this.initResolve) == null || r.call(this)), (n == null ? void 0 : n.type) === He.SESSION_ESTABLISHED && (!this.toolSchemas || this.toolSchemas.length === 0) && ((i = this.initResolve) == null || i.call(this));
  }
  handleConnectionOpen() {
    this.toolSchemas && this.toolSchemas.length > 0 && this.sendToolConfiguration();
  }
  sendToolConfiguration() {
    const t = xt.serializeConfigureTools(
      this.toolSchemas,
      this.contextHelpers
    );
    this.wsManager.send(t);
  }
  async onInit(t) {
    return this.setupEventHandlers(t), this.setupToolsAndContext(t), this.updateConfig(t), new Promise((n) => {
      this.initResolve = n, this.wsManager.connect().then(() => {
        (!this.toolSchemas || this.toolSchemas.length === 0) && n();
      }).catch(() => {
        n();
      });
    });
  }
  setupEventHandlers(t) {
    const n = {
      onSetMessage: t.onSetMessage,
      onSystemEvent: t.onSystemEvent,
      onReasoningUpdate: t.onReasoningUpdate
    };
    this.messageHandler.updateEventHandlers(n);
  }
  setupToolsAndContext(t) {
    this.toolSchemas = t.toolSchemas || [], this.contextHelpers = t.contextHelpers, t.clientTools && this.messageHandler.updateClientTools(t.clientTools);
  }
  updateConfig(t) {
    t.apiUrl && (this.config.apiUrl = t.apiUrl), t.userId && (this.config.userId = t.userId);
  }
  async onTriggerMessage(t) {
    if (!this.connectionState.isConnected)
      throw new Error("Client not connected");
    const {
      message: n,
      app: r = "UD21",
      media: i,
      convUuid: a,
      agentPromptPath: o
    } = t;
    try {
      this.messageHandler.clearProcessedToolCalls();
      const l = xt.serializeChatMessage({
        content: n,
        app: r,
        media: i,
        userId: this.config.userId,
        convUuid: a,
        agentPromptPath: o,
        saveToDatabase: !1
      });
      this.wsManager.send(l);
    } catch (l) {
      throw l;
    }
  }
  disconnect() {
    this.wsManager.disconnect();
  }
  isClientConnected() {
    return this.connectionState.isConnected;
  }
  updateContextHelpers(t) {
    this.contextHelpers = { ...this.contextHelpers, ...t };
    const n = xt.serializeUpdateContextHelpers(this.contextHelpers);
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = xt.serializeUpdateTools(this.toolSchemas);
    this.wsManager.send(r);
  }
  getConnectionStatus() {
    return {
      connected: this.connectionState.isConnected,
      reconnectAttempts: this.connectionState.reconnectAttempts,
      isReconnecting: this.connectionState.isReconnecting,
      websocketState: this.wsManager.getWebSocketState()
    };
  }
}
const xc = (...e) => e.filter(Boolean).join(" ");
function Tc({
  apiUrl: e,
  userId: t,
  clientTools: n,
  tools: r,
  contextHelpers: i,
  onSetMessage: a,
  onSystemEvent: o,
  onReasoningUpdate: l
}) {
  const [s, c] = ne(null), [u, p] = ne(!1), g = Tt(null), h = se(async () => {
    try {
      const S = new _c();
      g.current = S, c(S);
      const R = i || {};
      await S.onInit({
        apiUrl: e,
        userId: t,
        toolSchemas: n,
        clientTools: r,
        contextHelpers: R,
        onSetMessage: a,
        onSystemEvent: o,
        onReasoningUpdate: l
      }), p(!0);
    } catch (S) {
      console.error("Error connecting WebSocketChatClient:", S), p(!1);
    }
  }, [
    e,
    t,
    n,
    r,
    i,
    a,
    o,
    l
  ]), y = se(() => {
    g.current && (g.current.disconnect(), g.current = null), c(null), p(!1);
  }, []);
  return et(() => (h(), () => {
    y();
  }), [h, y]), et(() => {
    const S = setInterval(() => {
      if (g.current) {
        const R = g.current.getConnectionStatus();
        p(R.connected);
      }
    }, 1e3);
    return () => clearInterval(S);
  }, []), {
    agentClient: s,
    isConnected: u,
    connectAgentClient: h,
    disconnectAgentClient: y
  };
}
function kc({ initialMessages: e = [] }) {
  const [t, n] = ne(e), [r, i] = ne(!1), [a, o] = ne(!1), [l, s] = ne(""), [c, u] = ne(!1), [, p] = ne(
    /* @__PURE__ */ new Map()
  ), [, g] = ne(
    /* @__PURE__ */ new Map()
  ), h = Tt(null), y = Tt(""), S = se(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), R = It(
    () => (M, A) => A === !1 ? _e.isErrorMessage(M) ? Ae.ERROR : Ae.COMPLETED : _e.isCompletedMessage(M) ? Ae.COMPLETED : _e.isErrorMessage(M) ? Ae.ERROR : Ae.PROCESSING,
    []
  ), _ = It(
    () => (M) => _e.extractDuration(M),
    []
  ), H = It(
    () => (M) => _e.cleanReasoningContent(M),
    []
  ), N = It(
    () => (M, A) => {
      switch (_e.getMessageType(M, A)) {
        case B.MESSAGE_TYPES.ERROR:
          return "Error";
        case B.MESSAGE_TYPES.COMPLETED:
          return "Completed";
        case B.MESSAGE_TYPES.THOUGHT:
          return B.UI_TEXT.THOUGHT;
        case B.MESSAGE_TYPES.THINKING:
        default:
          return B.UI_TEXT.THINKING_ELLIPSIS;
      }
    },
    []
  ), P = It(
    () => (M, A) => A === !1 ? M.includes(B.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : M.includes(B.COMPLETED_MARKER) || M.includes("✅") ? "Tool Completed" : M.includes(B.ERROR_MARKER) ? "Tool Error" : (M.includes(B.HANDLING_MARKER), "Tool Processing..."),
    []
  ), j = It(
    () => (M, A) => A === !1 ? M.includes(B.ERROR_MARKER) ? Ae.ERROR : Ae.COMPLETED : M.includes(B.COMPLETED_MARKER) || M.includes("✅") ? Ae.COMPLETED : M.includes(B.ERROR_MARKER) ? Ae.ERROR : Ae.PROCESSING,
    []
  ), w = se(
    (M, A) => {
      const Y = un(A, M === "assistant");
      n((ue) => [
        ...ue,
        {
          id: S(),
          role: M,
          content: Y,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [S]
  ), D = se(() => {
    if (h.current && y.current) {
      const M = un(y.current, !0);
      return n(
        (A) => A.map(
          (ee) => ee.id === h.current ? {
            ...ee,
            content: M,
            isStreaming: !1
          } : ee
        )
      ), h.current = null, y.current = "", s(""), !0;
    }
    return !1;
  }, []), Z = se((M) => {
    const A = un(M, !0);
    if (h.current)
      y.current += A, s(y.current), n(
        (ee) => ee.map(
          (Y) => Y.id === h.current ? {
            ...Y,
            content: y.current,
            isStreaming: !0
          } : Y
        )
      );
    else {
      o(!1);
      const ee = S();
      h.current = ee, y.current = A, s(A);
      const Y = {
        id: ee,
        role: "assistant",
        content: A,
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      n((ue) => [...ue, Y]);
    }
  }, [S]), z = se(
    (M, A, ee) => {
      const { callId: Y } = ee || {};
      if (u(M), !Y) return;
      const ue = _e.isThinkingMessage(A) && !A.includes("for") && !A.includes("seconds"), me = _e.isThinkingMessage(A) && A.includes("for") && A.includes("seconds"), f = _e.isHandlingMessage(A), te = _e.isCompletedMessage(A), ge = _e.isErrorMessage(A);
      (ue || me) && g((m) => {
        const le = new Map(m), V = le.get(Y);
        if (ue && !V) {
          D();
          const q = S();
          le.set(Y, q);
          const ae = {
            id: q,
            role: "reasoning",
            content: A,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          n((de) => [...de, ae]);
        } else me && V ? (n(
          (q) => q.map(
            (ae) => ae.id === V ? {
              ...ae,
              content: A,
              isStreaming: !1
            } : ae
          )
        ), le.delete(Y)) : V && ue && n(
          (q) => q.map(
            (ae) => ae.id === V ? {
              ...ae,
              content: A,
              isStreaming: !0
            } : ae
          )
        );
        return le;
      }), p((m) => {
        const le = new Map(m), V = le.get(Y);
        if (f && !V) {
          D();
          const q = A.match(
            B.PATTERNS.HANDLING_TOOL
          ), ae = q ? q[1] : "Unknown Tool", de = S();
          le.set(Y, de);
          const Se = {
            id: de,
            role: "tooling",
            content: A,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0,
            toolData: {
              ...ee,
              toolName: ae,
              callId: Y,
              status: Ae.PROCESSING
            }
          };
          n((Re) => [...Re, Se]);
        } else if ((te || ge) && V) {
          const q = A.match(
            B.PATTERNS.COMPLETED_OR_ERROR_TOOL
          ), ae = q ? q[1] : "Unknown Tool";
          n(
            (de) => de.map(
              (Se) => Se.id === V ? {
                ...Se,
                content: A,
                isStreaming: !1,
                toolData: {
                  ...Se.toolData,
                  toolName: ae,
                  status: ge ? Ae.ERROR : Ae.COMPLETED,
                  callId: Y ?? ""
                }
              } : Se
            )
          ), le.delete(Y);
        } else V && c && !te && !ge && n(
          (q) => q.map(
            (ae) => ae.id === V ? {
              ...ae,
              content: A,
              isStreaming: !0
            } : ae
          )
        );
        return le;
      });
    },
    [D, S]
  ), U = se(() => {
    i(!1), o(!1), D();
  }, [D]), b = se(
    (M) => {
      console.error("Chat error:", M), i(!1), o(!1), D(), w("system", `❌ Chat error: ${M}`);
    },
    [w, D]
  ), v = se(() => {
    u(!1);
  }, []), Q = se(() => {
    i(!1), o(!1), h.current = null, y.current = "", s(""), v();
  }, [v]);
  return {
    // State
    messages: t,
    setMessages: n,
    isStreaming: r,
    setIsStreaming: i,
    isThinking: a,
    setIsThinking: o,
    streamingContent: l,
    isHandlingTool: c,
    currentAssistantMessageIdRef: h,
    // Helper functions
    getReasoningStatus: R,
    getReasoningDuration: _,
    getReasoningContentOnly: H,
    getReasoningTitle: N,
    getToolingTitle: P,
    getToolingStatus: j,
    // Actions
    addMessage: w,
    handleSetMessage: Z,
    handleReasoningUpdate: z,
    handleChatFinished: U,
    handleChatError: b,
    stopGeneration: Q,
    finalizeCurrentStreamingMessage: D
  };
}
function bc({ initialMode: e = "sidebar" }) {
  const [t, n] = ne(!1), [r, i] = ne(!1), [a, o] = ne(e), [l, s] = ne(Ue.IDLE), [c, u] = ne(Gn.IDLE), [p, g] = ne(!1), [h, y] = ne(null), [S, R] = ne(null), [_, H] = ne(null), [N, P] = ne(!1), j = se(() => {
    n(!0);
  }, []), w = se(() => {
    n(!1);
  }, []), D = se(() => {
    i((z) => !z);
  }, []), Z = se(() => {
    o((z) => z === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  return et(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const z = (U) => {
      U.key === "Escape" && a === "modal" && t && w();
    };
    if (a === "modal" && t)
      return document.addEventListener("keydown", z), () => document.removeEventListener("keydown", z);
  }, [a, t, w]), {
    // Modal and layout state
    isModalOpen: t,
    setIsModalOpen: n,
    isCollapsed: r,
    setIsCollapsed: i,
    currentMode: a,
    setCurrentMode: o,
    // Chat state
    chatStatus: l,
    setChatStatus: s,
    streamingStatus: c,
    setStreamingStatus: u,
    // Conversation state
    isLoadingConversation: p,
    setIsLoadingConversation: g,
    conversationError: h,
    setConversationError: y,
    // Thread state
    currentThreadId: S,
    setCurrentThreadId: R,
    currentConvUuid: _,
    setCurrentConvUuid: H,
    // Dev mode state
    isDevSettingsOpen: N,
    setIsDevSettingsOpen: P,
    // Actions
    openModal: j,
    closeModal: w,
    toggleCollapse: D,
    toggleFullscreen: Z
  };
}
async function jc(e, t, n) {
  const r = new URLSearchParams();
  n != null && n.includeArchived && r.append("includeArchived", "true"), n != null && n.limit && r.append("limit", n.limit.toString());
  const i = `${e}/threads/user/${t}${r.toString() ? `?${r.toString()}` : ""}`, a = await fetch(i);
  if (!a.ok) {
    const l = await a.json().catch(() => ({
      error: "Failed to fetch threads"
    }));
    throw new Error(l.error || "Failed to fetch threads");
  }
  return (await a.json()).threads;
}
async function $c(e, t) {
  const n = `${e}/threads/conv/${t}`, r = await fetch(n);
  if (!r.ok) {
    const i = await r.json().catch(() => ({
      error: "Thread not found"
    }));
    throw new Error(i.error || "Thread not found");
  }
  return r.json();
}
async function Ac(e, t) {
  const n = `${e}/messages/thread/${t}?format=client`, r = await fetch(n);
  if (!r.ok) {
    const a = await r.json().catch(() => ({
      error: "Failed to fetch messages"
    }));
    throw new Error(a.error || "Failed to fetch messages");
  }
  return (await r.json()).messages.map((a) => ({
    ...a,
    timestamp: new Date(a.timestamp)
  }));
}
async function Wc(e, t) {
  const n = `${e}/messages/conv/${t}?format=client`, r = await fetch(n);
  if (!r.ok) {
    const a = await r.json().catch(() => ({
      error: "Failed to fetch messages"
    }));
    throw new Error(a.error || "Failed to fetch messages");
  }
  return (await r.json()).messages.map((a) => ({
    ...a,
    timestamp: new Date(a.timestamp)
  }));
}
async function Zc(e, t, n, r) {
  const i = `${e}/threads`, a = await fetch(i, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: t,
      convUuid: n,
      title: (r == null ? void 0 : r.title) || "New conversation",
      agentType: (r == null ? void 0 : r.agentType) || "shop"
    })
  });
  if (!a.ok) {
    const o = await a.json().catch(() => ({
      error: "Failed to create thread"
    }));
    throw new Error(o.error || "Failed to create thread");
  }
  return a.json();
}
function Ic({
  userId: e,
  httpApiUrl: t,
  messages: n,
  setMessages: r,
  setIsLoadingConversation: i,
  setConversationError: a,
  setCurrentThreadId: o,
  setCurrentConvUuid: l
}) {
  const s = Tt(!1);
  return et(() => {
    (async () => {
      if (e && !s.current && !(n.length > 0))
        try {
          i(!0), a(null);
          const u = [];
          if (u.length === 0) {
            i(!1), s.current = !0;
            return;
          }
          const p = u[0];
          o(p.id), l(p.convUuid);
          const g = await Ac(t, p.id);
          r(g), s.current = !0;
        } catch (u) {
          console.error("❌ Error loading conversation:", u), a(
            u instanceof Error ? u.message : "Failed to load conversation"
          ), s.current = !0;
        } finally {
          i(!1);
        }
    })();
  }, [
    e,
    t,
    n.length,
    r,
    i,
    a,
    o,
    l
  ]), {
    hasLoadedConversationRef: s
  };
}
function Rc({
  apiUrl: e,
  config: t,
  tools: n,
  clientTools: r,
  initialMessages: i = [],
  userId: a,
  devMode: o = !1,
  app: l,
  contextHelpers: s
}) {
  var Be;
  const c = se((K) => K.replace(
    /^wss?:\/\//,
    ($) => $ === "wss://" ? "https://" : "http://"
  ), []), u = It(() => c(e), [e, c]), p = kc({ initialMessages: i }), g = bc({ initialMode: t.mode }), {
    messages: h,
    setMessages: y,
    isStreaming: S,
    setIsStreaming: R,
    isThinking: _,
    setIsThinking: H,
    streamingContent: N,
    isHandlingTool: P,
    currentAssistantMessageIdRef: j,
    getReasoningStatus: w,
    getReasoningDuration: D,
    getReasoningContentOnly: Z,
    getReasoningTitle: z,
    getToolingTitle: U,
    getToolingStatus: b,
    addMessage: v,
    handleSetMessage: Q,
    handleReasoningUpdate: M,
    handleChatFinished: A,
    handleChatError: ee,
    stopGeneration: Y
  } = p, {
    isModalOpen: ue,
    isCollapsed: me,
    currentMode: f,
    chatStatus: te,
    setChatStatus: ge,
    streamingStatus: m,
    setStreamingStatus: le,
    isLoadingConversation: V,
    setIsLoadingConversation: q,
    conversationError: ae,
    setConversationError: de,
    setCurrentThreadId: Se,
    currentConvUuid: Re,
    setCurrentConvUuid: ut,
    isDevSettingsOpen: vt,
    setIsDevSettingsOpen: je,
    openModal: Ct,
    closeModal: $e,
    toggleCollapse: ct,
    toggleFullscreen: yt
  } = g, Ke = Tt(null), We = Tt(null), ht = se((K) => {
    var $;
    switch (K.type) {
      case Je.CHAT_COMPLETED:
        A(), setTimeout(() => {
          var Ce;
          (Ce = We.current) == null || Ce.focus();
        }, 0);
        break;
      case Je.CHAT_ERROR:
        ($ = K.data) != null && $.error && ee(K.data.error);
        break;
      case Je.CONNECTION_LOST:
      case Je.CONNECTION_RESTORED:
    }
  }, [A, ee]), { agentClient: wt, isConnected: bt } = Tc({
    apiUrl: e,
    userId: a,
    clientTools: r,
    tools: n,
    contextHelpers: s,
    onSetMessage: Q,
    onSystemEvent: ht,
    onReasoningUpdate: M
  });
  Ic({
    userId: a,
    httpApiUrl: u,
    messages: h,
    setMessages: y,
    setIsLoadingConversation: q,
    setConversationError: de,
    setCurrentThreadId: Se,
    setCurrentConvUuid: ut
  });
  const nt = Tt(null), rt = se(() => {
    nt.current && cancelAnimationFrame(nt.current), nt.current = requestAnimationFrame(() => {
      var K;
      (K = Ke.current) == null || K.scrollIntoView({ behavior: "smooth" }), nt.current = null;
    });
  }, []);
  et(() => {
    rt();
  }, [h, rt]), et(() => {
    N && rt();
  }, [N, rt]), et(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(m);
  }, [m, t]), et(() => () => {
    nt.current && cancelAnimationFrame(nt.current);
  }, []);
  const pt = se(
    async (K, $) => {
      if (!K.trim() || S || !wt || !bt)
        return;
      const Ce = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        role: "user",
        content: K.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: $
      };
      y((pe) => [...pe, Ce]), R(!0), H(!0), ge(Ue.SUBMITTED), le(Gn.STARTING);
      try {
        await wt.onTriggerMessage({
          message: Ce.content,
          app: l,
          media: $,
          convUuid: Re || void 0,
          agentPromptPath: void 0
        }), ge(Ue.STREAMING);
      } catch (pe) {
        console.error("Agent client send error:", pe), H(!1), ge(Ue.ERROR), v(
          "system",
          `Sorry, there was an error: ${pe instanceof Error ? pe.message : "Unknown error"}`
        ), t.onError && t.onError(
          pe instanceof Error ? pe : new Error("Unknown error")
        ), R(!1), ge(Ue.IDLE), le(Gn.IDLE);
      }
    },
    [
      S,
      wt,
      bt,
      y,
      R,
      H,
      ge,
      le,
      v,
      t,
      l,
      Re
    ]
  ), E = se(
    async (K) => {
      const $ = [], Ce = e, pe = "chat-uploads";
      for (const Me of K)
        try {
          const it = new FormData();
          it.append("file", Me), it.append("folder", pe);
          const Oe = await fetch(`${Ce}/upload`, {
            method: "POST",
            body: it
          }), Et = await Oe.json();
          if (Oe.ok)
            Me.type.startsWith("image/") ? $.push(Et.url) : $.push(
              `data:${Me.type};name=${encodeURIComponent(
                Et.fileName || Me.name
              )};url=${encodeURIComponent(Et.url)}`
            );
          else if (console.error("❌ Upload failed:", Et.error), Me.type.startsWith("image/")) {
            const qe = new FileReader(), Bt = await new Promise(
              (Sn, ye) => {
                qe.onload = () => Sn(qe.result), qe.onerror = ye, qe.readAsDataURL(Me);
              }
            );
            $.push(Bt);
          } else
            $.push(
              `data:${Me.type};name=${encodeURIComponent(
                Me.name
              )};base64,placeholder`
            );
        } catch (it) {
          console.error("Error uploading file:", it);
          try {
            if (Me.type.startsWith("image/")) {
              const Oe = new FileReader(), Et = await new Promise(
                (qe, Bt) => {
                  Oe.onload = () => qe(Oe.result), Oe.onerror = Bt, Oe.readAsDataURL(Me);
                }
              );
              $.push(Et);
            } else
              $.push(
                `data:${Me.type};name=${encodeURIComponent(
                  Me.name
                )};base64,placeholder`
              );
          } catch (Oe) {
            console.error("Error in fallback encoding:", Oe);
          }
        }
      return $;
    },
    [e]
  ), k = xc(
    "chat-wrapper",
    `chat-wrapper--${f}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`,
    me && "chat-wrapper--collapsed",
    f === "embedded" && t.constrainedHeight && "chat-wrapper--constrained"
  ), F = () => {
    var $;
    if (f === "modal" && !ue || f === "sidebar" && me || f === "fullscreen" && me) {
      const Ce = f === "modal" ? Ct : ct, pe = f === "modal" ? `Open ${t.appName}` : `Expand ${t.appName}`;
      return /* @__PURE__ */ I(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: Ce,
          title: pe,
          children: [
            /* @__PURE__ */ d(lc, { className: "chat-wrapper__bubble-icon", size: 24 }),
            (($ = t.features) == null ? void 0 : $.showBubbleText) !== !1 && /* @__PURE__ */ d("span", { className: "chat-wrapper__bubble-text", children: t.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, X = () => f === "modal" && ue ? /* @__PURE__ */ d(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: $e,
      title: "Close chat",
      children: /* @__PURE__ */ d(sc, { size: 20 })
    }
  ) : null, re = () => {
    if ((f === "sidebar" || f === "fullscreen") && !me) {
      const K = f === "fullscreen";
      return /* @__PURE__ */ d(
        "button",
        {
          className: K ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: yt,
          title: K ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ d(uc, { size: 20, isFullscreen: K })
        }
      );
    }
    return null;
  }, xe = () => (f === "sidebar" || f === "fullscreen") && !me ? /* @__PURE__ */ d(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: ct,
      title: "Collapse chat",
      children: /* @__PURE__ */ d(cc, { size: 20 })
    }
  ) : null, Ze = () => o && t.headerVisible !== !1 ? /* @__PURE__ */ d(
    "button",
    {
      className: "chat-wrapper__settings-button",
      onClick: () => je(!0),
      title: "Developer Settings",
      children: /* @__PURE__ */ d(vi, { size: 16 })
    }
  ) : null, ke = () => !o || t.headerVisible !== !1 ? null : /* @__PURE__ */ d(
    "button",
    {
      className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
      onClick: () => je(!0),
      title: "Developer Settings",
      children: /* @__PURE__ */ d(vi, { size: 16 })
    }
  );
  return f === "modal" && !ue || (f === "sidebar" || f === "fullscreen") && me ? F() : /* @__PURE__ */ d(Qt, { children: /* @__PURE__ */ I("div", { className: k, style: t.customStyles, children: [
    ke(),
    t.headerVisible !== !1 && /* @__PURE__ */ I("div", { className: "chat-wrapper__header", children: [
      /* @__PURE__ */ d("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ d("h2", { className: "chat-wrapper__title", children: t.appName }) }),
      /* @__PURE__ */ I("div", { className: "chat-wrapper__header-controls", children: [
        Ze(),
        re(),
        xe(),
        X()
      ] })
    ] }),
    !me && /* @__PURE__ */ I(Qt, { children: [
      ae && /* @__PURE__ */ d("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ I("p", { children: [
        "⚠️ ",
        ae
      ] }) }),
      h.length === 0 && !S && !V && /* @__PURE__ */ I("div", { className: "chat-wrapper__main-header", children: [
        /* @__PURE__ */ d("h1", { className: "chat-wrapper__main-title", children: t.appName }),
        t.description && /* @__PURE__ */ d("p", { className: "chat-wrapper__description", children: t.description })
      ] }),
      /* @__PURE__ */ I(
        "div",
        {
          className: `chat-wrapper__content ${h.length === 0 && !S && !V ? "chat-wrapper__content--empty" : "chat-wrapper__content--with-messages"}`,
          children: [
            V && h.length === 0 ? /* @__PURE__ */ d("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ d(mo, { fullHeight: !0 }) }) : /* @__PURE__ */ d(
              ba,
              {
                ref: Ke,
                messages: h,
                isThinking: _,
                isHandlingTool: P,
                getReasoningTitle: z,
                getReasoningStatus: w,
                getReasoningDuration: D,
                getReasoningContentOnly: Z,
                getToolingTitle: U,
                getToolingStatus: b,
                clientTools: r || [],
                currentAssistantMessageIdRef: j
              }
            ),
            /* @__PURE__ */ d("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ d(
              po,
              {
                ref: We,
                placeholder: t.placeholder,
                placeholderTexts: t.placeholderTexts,
                disabled: S,
                chatStatus: te,
                fileUploadEnabled: (Be = t.features) == null ? void 0 : Be.fileUpload,
                restaurantName: t.restaurantName,
                restaurantLogo: t.restaurantLogo,
                hasMessages: h.length > 0,
                onSubmit: (K, $) => pt(K, $),
                onFileUpload: E,
                onStopGeneration: Y
              }
            ) }),
            h.length === 0 && !S && !V && t.suggestedPrompts && /* @__PURE__ */ d(
              fo,
              {
                prompts: t.suggestedPrompts,
                onPromptSelect: (K) => {
                  We.current && We.current.setText(K.description);
                }
              }
            )
          ]
        }
      )
    ] }),
    t.onError && /* @__PURE__ */ d("div", { className: "chat-wrapper__error-boundary" }),
    /* @__PURE__ */ d(
      yo,
      {
        isOpen: vt,
        onClose: () => je(!1),
        app: l,
        apiUrl: e
      }
    )
  ] }) });
}
const qc = Li(Rc);
export {
  za as AnimatedPlaceholder,
  Ue as CHAT_STATUS,
  lc as ChatIcon,
  qc as ChatWrapper,
  sc as CloseIcon,
  cc as CollapseIcon,
  hc as CopyIcon,
  yo as DevSettings,
  uc as FullscreenIcon,
  mo as InlineLoader,
  Ui as Loader,
  Ae as PROCESSING_STATUS,
  Da as PromptInput,
  Ua as PromptInputButton,
  Fc as PromptInputModelSelect,
  Bc as PromptInputModelSelectContent,
  Gc as PromptInputModelSelectItem,
  zc as PromptInputModelSelectTrigger,
  Vc as PromptInputModelSelectValue,
  Fa as PromptInputSubmit,
  Mi as PromptInputTextarea,
  Pa as PromptInputToolbar,
  Ha as PromptInputTools,
  ic as Reasoning,
  xa as ReasoningContent,
  _a as ReasoningTrigger,
  Gn as STREAMING_STATUS,
  vi as SettingsIcon,
  fo as SuggestedPrompts,
  Zc as createThread,
  Wc as fetchMessagesByConvUuid,
  $c as fetchThreadByConvUuid,
  Ac as fetchThreadMessages,
  jc as fetchUserThreads,
  Mc as isChatActive,
  Dc as isChatError,
  Oc as isChatIdle,
  Pc as isProcessingActive,
  Hc as isProcessingComplete,
  Uc as isProcessingError
};
