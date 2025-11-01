var va = Object.defineProperty;
var La = (e, t, n) => t in e ? va(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ae = (e, t, n) => La(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as p, jsxs as I, Fragment as tn } from "react/jsx-runtime";
import Ut, { forwardRef as lr, useState as ee, useEffect as tt, useRef as kt, useImperativeHandle as Ma, useCallback as se, memo as Mi, useMemo as vt } from "react";
const Fe = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, Wn = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, Ie = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, Du = (e) => e === Fe.SUBMITTED || e === Fe.STREAMING, Pu = (e) => e === Fe.IDLE, Hu = (e) => e === Fe.ERROR, Uu = (e) => e === Ie.PROCESSING, Fu = (e) => e === Ie.COMPLETED, zu = (e) => e === Ie.ERROR, nt = (...e) => e.filter(Boolean).join(" "), Oa = () => /* @__PURE__ */ I(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ I("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ p(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ p("g", { clipPath: "url(#clip0_121_23927)", children: /* @__PURE__ */ p(
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
              /* @__PURE__ */ p("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ p(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ p("feOffset", { dy: "1" }),
              /* @__PURE__ */ p("feGaussianBlur", { stdDeviation: "1" }),
              /* @__PURE__ */ p("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ p(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                }
              ),
              /* @__PURE__ */ p(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ p(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ p("feOffset", { dy: "1" }),
              /* @__PURE__ */ p("feGaussianBlur", { stdDeviation: "1.5" }),
              /* @__PURE__ */ p("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ p(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                }
              ),
              /* @__PURE__ */ p(
                "feBlend",
                {
                  mode: "normal",
                  in2: "effect1_dropShadow_121_23927",
                  result: "effect2_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ p(
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
        /* @__PURE__ */ p("clipPath", { id: "clip0_121_23927", children: /* @__PURE__ */ p(
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
), Da = ({ className: e, ...t }) => /* @__PURE__ */ p("form", { className: nt("chat-wrapper__prompt-input", e), ...t }), Oi = lr(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...o
  }, l) => {
    const s = (u) => {
      if (u.key === "Enter") {
        if (u.shiftKey)
          return;
        u.preventDefault();
        const c = u.currentTarget.form;
        if (c) {
          const d = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          c.dispatchEvent(d);
        }
      }
      a == null || a(u);
    };
    return /* @__PURE__ */ p(
      "textarea",
      {
        ref: l,
        className: nt("chat-wrapper__prompt-textarea", t),
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
Oi.displayName = "PromptInputTextarea";
const Pa = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p("div", { className: nt("chat-wrapper__prompt-toolbar", e), ...t }), Ha = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p("div", { className: nt("chat-wrapper__prompt-tools", e), ...t }), Ua = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || Ut.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ p(
    "button",
    {
      className: nt(
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
  status: r = Fe.IDLE,
  children: i,
  disabled: a,
  ...o
}) => {
  let l = /* @__PURE__ */ p(Oa, {});
  const s = a || r === Fe.SUBMITTED || r === Fe.STREAMING;
  return /* @__PURE__ */ p(
    "button",
    {
      className: nt(
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
}, Bu = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ p("select", { className: nt("chat-wrapper__prompt-select", e), ...n, children: t }), Gu = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ p(
  "button",
  {
    className: nt("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), Vu = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p(
  "div",
  {
    className: nt("chat-wrapper__prompt-select-content", e),
    ...t
  }
), ju = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ p(
  "div",
  {
    className: nt("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), $u = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ p(
  "span",
  {
    className: nt("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), za = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = ee(0), [a, o] = ee(!1), [l, s] = ee(0);
  return tt(() => {
    if (!t || e.length <= 1) return;
    const u = setInterval(() => {
      o(!0), setTimeout(() => {
        i((c) => (c + 1) % e.length), s((c) => c + 1), o(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(u);
  }, [t, e.length]), tt(() => {
    t || (i(0), o(!1), s(0));
  }, [t]), /* @__PURE__ */ p(
    "div",
    {
      className: `animated-placeholder-container ${n}`,
      children: /* @__PURE__ */ p(
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
  entries: Di,
  setPrototypeOf: Lr,
  isFrozen: Ba,
  getPrototypeOf: Ga,
  getOwnPropertyDescriptor: Va
} = Object;
let {
  freeze: Me,
  seal: Ye,
  create: Zn
} = Object, {
  apply: qn,
  construct: Xn
} = typeof Reflect < "u" && Reflect;
Me || (Me = function(t) {
  return t;
});
Ye || (Ye = function(t) {
  return t;
});
qn || (qn = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
Xn || (Xn = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const cn = Oe(Array.prototype.forEach), ja = Oe(Array.prototype.lastIndexOf), Mr = Oe(Array.prototype.pop), $t = Oe(Array.prototype.push), $a = Oe(Array.prototype.splice), fn = Oe(String.prototype.toLowerCase), In = Oe(String.prototype.toString), Nn = Oe(String.prototype.match), Wt = Oe(String.prototype.replace), Wa = Oe(String.prototype.indexOf), Za = Oe(String.prototype.trim), Je = Oe(Object.prototype.hasOwnProperty), Le = Oe(RegExp.prototype.test), Zt = qa(TypeError);
function Oe(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return qn(e, t, r);
  };
}
function qa(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return Xn(e, n);
  };
}
function K(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : fn;
  Lr && Lr(e, null);
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
    Je(e, t) || (e[t] = null);
  return e;
}
function gt(e) {
  const t = Zn(null);
  for (const [n, r] of Di(e))
    Je(e, n) && (Array.isArray(r) ? t[n] = Xa(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = gt(r) : t[n] = r);
  return t;
}
function qt(e, t) {
  for (; e !== null; ) {
    const r = Va(e, t);
    if (r) {
      if (r.get)
        return Oe(r.get);
      if (typeof r.value == "function")
        return Oe(r.value);
    }
    e = Ga(e);
  }
  function n() {
    return null;
  }
  return n;
}
const Or = Me(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), vn = Me(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Ln = Me(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Ya = Me(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Mn = Me(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Ka = Me(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Dr = Me(["#text"]), Pr = Me(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), On = Me(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Hr = Me(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), un = Me(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Qa = Ye(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Ja = Ye(/<%[\w\W]*|[\w\W]*%>/gm), eo = Ye(/\$\{[\w\W]*/gm), to = Ye(/^data-[\-\w.\u00B7-\uFFFF]+$/), no = Ye(/^aria-[\-\w]+$/), Pi = Ye(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), ro = Ye(/^(?:\w+script|data):/i), io = Ye(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Hi = Ye(/^html$/i), ao = Ye(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Ur = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: no,
  ATTR_WHITESPACE: io,
  CUSTOM_ELEMENT: ao,
  DATA_ATTR: to,
  DOCTYPE_NAME: Hi,
  ERB_EXPR: Ja,
  IS_ALLOWED_URI: Pi,
  IS_SCRIPT_OR_DATA: ro,
  MUSTACHE_EXPR: Qa,
  TMPLIT_EXPR: eo
});
const Xt = {
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
}, Fr = function() {
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
function Ui() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : oo();
  const t = (U) => Ui(U);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== Xt.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: o,
    Node: l,
    Element: s,
    NodeFilter: u,
    NamedNodeMap: c = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: m,
    trustedTypes: h
  } = e, y = s.prototype, S = qt(y, "cloneNode"), N = qt(y, "remove"), _ = qt(y, "nextSibling"), M = qt(y, "childNodes"), x = qt(y, "parentNode");
  if (typeof o == "function") {
    const U = n.createElement("template");
    U.content && U.content.ownerDocument && (n = U.content.ownerDocument);
  }
  let L, z = "";
  const {
    implementation: w,
    createNodeIterator: H,
    createDocumentFragment: W,
    getElementsByTagName: G
  } = n, {
    importNode: B
  } = r;
  let A = Fr();
  t.isSupported = typeof Di == "function" && typeof x == "function" && w && w.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: v,
    ERB_EXPR: Y,
    TMPLIT_EXPR: D,
    DATA_ATTR: R,
    ARIA_ATTR: J,
    IS_SCRIPT_OR_DATA: q,
    ATTR_WHITESPACE: de,
    CUSTOM_ELEMENT: Ae
  } = Ur;
  let {
    IS_ALLOWED_URI: g
  } = Ur, Q = null;
  const we = K({}, [...Or, ...vn, ...Ln, ...Mn, ...Dr]);
  let f = null;
  const ne = K({}, [...Pr, ...On, ...Hr, ...un]);
  let P = Object.seal(Zn(null, {
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
  })), X = null, te = null;
  const he = Object.seal(Zn(null, {
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
  let ge = !0, Se = !0, ct = !1, At = !0, rt = !1, yt = !0, Ge = !1, wt = !1, Et = !1, $e = !1, ut = !1, ht = !1, Rt = !0, Ot = !1;
  const Dt = "user-content-";
  let it = !0, pt = !1, E = {}, b = null;
  const F = K({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let $ = null;
  const re = K({}, ["audio", "video", "img", "source", "image", "track"]);
  let _e = null;
  const We = K({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), xe = "http://www.w3.org/1998/Math/MathML", Ze = "http://www.w3.org/2000/svg", Te = "http://www.w3.org/1999/xhtml";
  let me = Te, qe = !1, ve = null;
  const on = K({}, [xe, Ze, Te], In);
  let le = K({}, ["mi", "mo", "mn", "ms", "mtext"]), pe = K({}, ["annotation-xml"]);
  const Ke = K({}, ["title", "style", "font", "a", "script"]);
  let ke = null;
  const De = ["application/xhtml+xml", "text/html"], It = "text/html";
  let oe = null, Qe = null;
  const St = n.createElement("form"), dt = function(C) {
    return C instanceof RegExp || C instanceof Function;
  }, jt = function() {
    let C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Qe && Qe === C)) {
      if ((!C || typeof C != "object") && (C = {}), C = gt(C), ke = // eslint-disable-next-line unicorn/prefer-includes
      De.indexOf(C.PARSER_MEDIA_TYPE) === -1 ? It : C.PARSER_MEDIA_TYPE, oe = ke === "application/xhtml+xml" ? In : fn, Q = Je(C, "ALLOWED_TAGS") ? K({}, C.ALLOWED_TAGS, oe) : we, f = Je(C, "ALLOWED_ATTR") ? K({}, C.ALLOWED_ATTR, oe) : ne, ve = Je(C, "ALLOWED_NAMESPACES") ? K({}, C.ALLOWED_NAMESPACES, In) : on, _e = Je(C, "ADD_URI_SAFE_ATTR") ? K(gt(We), C.ADD_URI_SAFE_ATTR, oe) : We, $ = Je(C, "ADD_DATA_URI_TAGS") ? K(gt(re), C.ADD_DATA_URI_TAGS, oe) : re, b = Je(C, "FORBID_CONTENTS") ? K({}, C.FORBID_CONTENTS, oe) : F, X = Je(C, "FORBID_TAGS") ? K({}, C.FORBID_TAGS, oe) : gt({}), te = Je(C, "FORBID_ATTR") ? K({}, C.FORBID_ATTR, oe) : gt({}), E = Je(C, "USE_PROFILES") ? C.USE_PROFILES : !1, ge = C.ALLOW_ARIA_ATTR !== !1, Se = C.ALLOW_DATA_ATTR !== !1, ct = C.ALLOW_UNKNOWN_PROTOCOLS || !1, At = C.ALLOW_SELF_CLOSE_IN_ATTR !== !1, rt = C.SAFE_FOR_TEMPLATES || !1, yt = C.SAFE_FOR_XML !== !1, Ge = C.WHOLE_DOCUMENT || !1, $e = C.RETURN_DOM || !1, ut = C.RETURN_DOM_FRAGMENT || !1, ht = C.RETURN_TRUSTED_TYPE || !1, Et = C.FORCE_BODY || !1, Rt = C.SANITIZE_DOM !== !1, Ot = C.SANITIZE_NAMED_PROPS || !1, it = C.KEEP_CONTENT !== !1, pt = C.IN_PLACE || !1, g = C.ALLOWED_URI_REGEXP || Pi, me = C.NAMESPACE || Te, le = C.MATHML_TEXT_INTEGRATION_POINTS || le, pe = C.HTML_INTEGRATION_POINTS || pe, P = C.CUSTOM_ELEMENT_HANDLING || {}, C.CUSTOM_ELEMENT_HANDLING && dt(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (P.tagNameCheck = C.CUSTOM_ELEMENT_HANDLING.tagNameCheck), C.CUSTOM_ELEMENT_HANDLING && dt(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (P.attributeNameCheck = C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), C.CUSTOM_ELEMENT_HANDLING && typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (P.allowCustomizedBuiltInElements = C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), rt && (Se = !1), ut && ($e = !0), E && (Q = K({}, Dr), f = [], E.html === !0 && (K(Q, Or), K(f, Pr)), E.svg === !0 && (K(Q, vn), K(f, On), K(f, un)), E.svgFilters === !0 && (K(Q, Ln), K(f, On), K(f, un)), E.mathMl === !0 && (K(Q, Mn), K(f, Hr), K(f, un))), C.ADD_TAGS && (typeof C.ADD_TAGS == "function" ? he.tagCheck = C.ADD_TAGS : (Q === we && (Q = gt(Q)), K(Q, C.ADD_TAGS, oe))), C.ADD_ATTR && (typeof C.ADD_ATTR == "function" ? he.attributeCheck = C.ADD_ATTR : (f === ne && (f = gt(f)), K(f, C.ADD_ATTR, oe))), C.ADD_URI_SAFE_ATTR && K(_e, C.ADD_URI_SAFE_ATTR, oe), C.FORBID_CONTENTS && (b === F && (b = gt(b)), K(b, C.FORBID_CONTENTS, oe)), it && (Q["#text"] = !0), Ge && K(Q, ["html", "head", "body"]), Q.table && (K(Q, ["tbody"]), delete X.tbody), C.TRUSTED_TYPES_POLICY) {
        if (typeof C.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Zt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof C.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Zt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        L = C.TRUSTED_TYPES_POLICY, z = L.createHTML("");
      } else
        L === void 0 && (L = lo(h, i)), L !== null && typeof z == "string" && (z = L.createHTML(""));
      Me && Me(C), Qe = C;
    }
  }, ln = K({}, [...vn, ...Ln, ...Ya]), sn = K({}, [...Mn, ...Ka]), Ia = function(C) {
    let k = x(C);
    (!k || !k.tagName) && (k = {
      namespaceURI: me,
      tagName: "template"
    });
    const O = fn(C.tagName), fe = fn(k.tagName);
    return ve[C.namespaceURI] ? C.namespaceURI === Ze ? k.namespaceURI === Te ? O === "svg" : k.namespaceURI === xe ? O === "svg" && (fe === "annotation-xml" || le[fe]) : !!ln[O] : C.namespaceURI === xe ? k.namespaceURI === Te ? O === "math" : k.namespaceURI === Ze ? O === "math" && pe[fe] : !!sn[O] : C.namespaceURI === Te ? k.namespaceURI === Ze && !pe[fe] || k.namespaceURI === xe && !le[fe] ? !1 : !sn[O] && (Ke[O] || !ln[O]) : !!(ke === "application/xhtml+xml" && ve[C.namespaceURI]) : !1;
  }, at = function(C) {
    $t(t.removed, {
      element: C
    });
    try {
      x(C).removeChild(C);
    } catch {
      N(C);
    }
  }, Nt = function(C, k) {
    try {
      $t(t.removed, {
        attribute: k.getAttributeNode(C),
        from: k
      });
    } catch {
      $t(t.removed, {
        attribute: null,
        from: k
      });
    }
    if (k.removeAttribute(C), C === "is")
      if ($e || ut)
        try {
          at(k);
        } catch {
        }
      else
        try {
          k.setAttribute(C, "");
        } catch {
        }
  }, xr = function(C) {
    let k = null, O = null;
    if (Et)
      C = "<remove></remove>" + C;
    else {
      const Ce = Nn(C, /^[\r\n\t ]+/);
      O = Ce && Ce[0];
    }
    ke === "application/xhtml+xml" && me === Te && (C = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + C + "</body></html>");
    const fe = L ? L.createHTML(C) : C;
    if (me === Te)
      try {
        k = new m().parseFromString(fe, ke);
      } catch {
      }
    if (!k || !k.documentElement) {
      k = w.createDocument(me, "template", null);
      try {
        k.documentElement.innerHTML = qe ? z : fe;
      } catch {
      }
    }
    const Re = k.body || k.documentElement;
    return C && O && Re.insertBefore(n.createTextNode(O), Re.childNodes[0] || null), me === Te ? G.call(k, Ge ? "html" : "body")[0] : Ge ? k.documentElement : Re;
  }, Tr = function(C) {
    return H.call(
      C.ownerDocument || C,
      C,
      // eslint-disable-next-line no-bitwise
      u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT | u.SHOW_PROCESSING_INSTRUCTION | u.SHOW_CDATA_SECTION,
      null
    );
  }, An = function(C) {
    return C instanceof d && (typeof C.nodeName != "string" || typeof C.textContent != "string" || typeof C.removeChild != "function" || !(C.attributes instanceof c) || typeof C.removeAttribute != "function" || typeof C.setAttribute != "function" || typeof C.namespaceURI != "string" || typeof C.insertBefore != "function" || typeof C.hasChildNodes != "function");
  }, kr = function(C) {
    return typeof l == "function" && C instanceof l;
  };
  function ft(U, C, k) {
    cn(U, (O) => {
      O.call(t, C, k, Qe);
    });
  }
  const br = function(C) {
    let k = null;
    if (ft(A.beforeSanitizeElements, C, null), An(C))
      return at(C), !0;
    const O = oe(C.nodeName);
    if (ft(A.uponSanitizeElement, C, {
      tagName: O,
      allowedTags: Q
    }), yt && C.hasChildNodes() && !kr(C.firstElementChild) && Le(/<[/\w!]/g, C.innerHTML) && Le(/<[/\w!]/g, C.textContent) || C.nodeType === Xt.progressingInstruction || yt && C.nodeType === Xt.comment && Le(/<[/\w]/g, C.data))
      return at(C), !0;
    if (!(he.tagCheck instanceof Function && he.tagCheck(O)) && (!Q[O] || X[O])) {
      if (!X[O] && Rr(O) && (P.tagNameCheck instanceof RegExp && Le(P.tagNameCheck, O) || P.tagNameCheck instanceof Function && P.tagNameCheck(O)))
        return !1;
      if (it && !b[O]) {
        const fe = x(C) || C.parentNode, Re = M(C) || C.childNodes;
        if (Re && fe) {
          const Ce = Re.length;
          for (let Pe = Ce - 1; Pe >= 0; --Pe) {
            const mt = S(Re[Pe], !0);
            mt.__removalCount = (C.__removalCount || 0) + 1, fe.insertBefore(mt, _(C));
          }
        }
      }
      return at(C), !0;
    }
    return C instanceof s && !Ia(C) || (O === "noscript" || O === "noembed" || O === "noframes") && Le(/<\/no(script|embed|frames)/i, C.innerHTML) ? (at(C), !0) : (rt && C.nodeType === Xt.text && (k = C.textContent, cn([v, Y, D], (fe) => {
      k = Wt(k, fe, " ");
    }), C.textContent !== k && ($t(t.removed, {
      element: C.cloneNode()
    }), C.textContent = k)), ft(A.afterSanitizeElements, C, null), !1);
  }, Ar = function(C, k, O) {
    if (Rt && (k === "id" || k === "name") && (O in n || O in St))
      return !1;
    if (!(Se && !te[k] && Le(R, k))) {
      if (!(ge && Le(J, k))) {
        if (!(he.attributeCheck instanceof Function && he.attributeCheck(k, C))) {
          if (!f[k] || te[k]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Rr(C) && (P.tagNameCheck instanceof RegExp && Le(P.tagNameCheck, C) || P.tagNameCheck instanceof Function && P.tagNameCheck(C)) && (P.attributeNameCheck instanceof RegExp && Le(P.attributeNameCheck, k) || P.attributeNameCheck instanceof Function && P.attributeNameCheck(k, C)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              k === "is" && P.allowCustomizedBuiltInElements && (P.tagNameCheck instanceof RegExp && Le(P.tagNameCheck, O) || P.tagNameCheck instanceof Function && P.tagNameCheck(O)))
            ) return !1;
          } else if (!_e[k]) {
            if (!Le(g, Wt(O, de, ""))) {
              if (!((k === "src" || k === "xlink:href" || k === "href") && C !== "script" && Wa(O, "data:") === 0 && $[C])) {
                if (!(ct && !Le(q, Wt(O, de, "")))) {
                  if (O)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Rr = function(C) {
    return C !== "annotation-xml" && Nn(C, Ae);
  }, Ir = function(C) {
    ft(A.beforeSanitizeAttributes, C, null);
    const {
      attributes: k
    } = C;
    if (!k || An(C))
      return;
    const O = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: f,
      forceKeepAttr: void 0
    };
    let fe = k.length;
    for (; fe--; ) {
      const Re = k[fe], {
        name: Ce,
        namespaceURI: Pe,
        value: mt
      } = Re, Pt = oe(Ce), Rn = mt;
      let be = Ce === "value" ? Rn : Za(Rn);
      if (O.attrName = Pt, O.attrValue = be, O.keepAttr = !0, O.forceKeepAttr = void 0, ft(A.uponSanitizeAttribute, C, O), be = O.attrValue, Ot && (Pt === "id" || Pt === "name") && (Nt(Ce, C), be = Dt + be), yt && Le(/((--!?|])>)|<\/(style|title|textarea)/i, be)) {
        Nt(Ce, C);
        continue;
      }
      if (Pt === "attributename" && Nn(be, "href")) {
        Nt(Ce, C);
        continue;
      }
      if (O.forceKeepAttr)
        continue;
      if (!O.keepAttr) {
        Nt(Ce, C);
        continue;
      }
      if (!At && Le(/\/>/i, be)) {
        Nt(Ce, C);
        continue;
      }
      rt && cn([v, Y, D], (vr) => {
        be = Wt(be, vr, " ");
      });
      const Nr = oe(C.nodeName);
      if (!Ar(Nr, Pt, be)) {
        Nt(Ce, C);
        continue;
      }
      if (L && typeof h == "object" && typeof h.getAttributeType == "function" && !Pe)
        switch (h.getAttributeType(Nr, Pt)) {
          case "TrustedHTML": {
            be = L.createHTML(be);
            break;
          }
          case "TrustedScriptURL": {
            be = L.createScriptURL(be);
            break;
          }
        }
      if (be !== Rn)
        try {
          Pe ? C.setAttributeNS(Pe, Ce, be) : C.setAttribute(Ce, be), An(C) ? at(C) : Mr(t.removed);
        } catch {
          Nt(Ce, C);
        }
    }
    ft(A.afterSanitizeAttributes, C, null);
  }, Na = function U(C) {
    let k = null;
    const O = Tr(C);
    for (ft(A.beforeSanitizeShadowDOM, C, null); k = O.nextNode(); )
      ft(A.uponSanitizeShadowNode, k, null), br(k), Ir(k), k.content instanceof a && U(k.content);
    ft(A.afterSanitizeShadowDOM, C, null);
  };
  return t.sanitize = function(U) {
    let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, k = null, O = null, fe = null, Re = null;
    if (qe = !U, qe && (U = "<!-->"), typeof U != "string" && !kr(U))
      if (typeof U.toString == "function") {
        if (U = U.toString(), typeof U != "string")
          throw Zt("dirty is not a string, aborting");
      } else
        throw Zt("toString is not a function");
    if (!t.isSupported)
      return U;
    if (wt || jt(C), t.removed = [], typeof U == "string" && (pt = !1), pt) {
      if (U.nodeName) {
        const mt = oe(U.nodeName);
        if (!Q[mt] || X[mt])
          throw Zt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (U instanceof l)
      k = xr("<!---->"), O = k.ownerDocument.importNode(U, !0), O.nodeType === Xt.element && O.nodeName === "BODY" || O.nodeName === "HTML" ? k = O : k.appendChild(O);
    else {
      if (!$e && !rt && !Ge && // eslint-disable-next-line unicorn/prefer-includes
      U.indexOf("<") === -1)
        return L && ht ? L.createHTML(U) : U;
      if (k = xr(U), !k)
        return $e ? null : ht ? z : "";
    }
    k && Et && at(k.firstChild);
    const Ce = Tr(pt ? U : k);
    for (; fe = Ce.nextNode(); )
      br(fe), Ir(fe), fe.content instanceof a && Na(fe.content);
    if (pt)
      return U;
    if ($e) {
      if (ut)
        for (Re = W.call(k.ownerDocument); k.firstChild; )
          Re.appendChild(k.firstChild);
      else
        Re = k;
      return (f.shadowroot || f.shadowrootmode) && (Re = B.call(r, Re, !0)), Re;
    }
    let Pe = Ge ? k.outerHTML : k.innerHTML;
    return Ge && Q["!doctype"] && k.ownerDocument && k.ownerDocument.doctype && k.ownerDocument.doctype.name && Le(Hi, k.ownerDocument.doctype.name) && (Pe = "<!DOCTYPE " + k.ownerDocument.doctype.name + `>
` + Pe), rt && cn([v, Y, D], (mt) => {
      Pe = Wt(Pe, mt, " ");
    }), L && ht ? L.createHTML(Pe) : Pe;
  }, t.setConfig = function() {
    let U = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    jt(U), wt = !0;
  }, t.clearConfig = function() {
    Qe = null, wt = !1;
  }, t.isValidAttribute = function(U, C, k) {
    Qe || jt({});
    const O = oe(U), fe = oe(C);
    return Ar(O, fe, k);
  }, t.addHook = function(U, C) {
    typeof C == "function" && $t(A[U], C);
  }, t.removeHook = function(U, C) {
    if (C !== void 0) {
      const k = ja(A[U], C);
      return k === -1 ? void 0 : $a(A[U], k, 1)[0];
    }
    return Mr(A[U]);
  }, t.removeHooks = function(U) {
    A[U] = [];
  }, t.removeAllHooks = function() {
    A = Fr();
  }, t;
}
var so = Ui();
function co(e) {
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
function mn(e, t = !1) {
  return e;
}
function uo(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function zr(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || co(e));
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
      n && !zr(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !zr(n) && e.removeAttribute("src");
    }
  });
}
ho();
const po = lr(
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
    onFileUpload: u,
    onStopGeneration: c
  }, d) => {
    const [m, h] = ee(""), [y, S] = ee([]), N = kt(null), _ = t && t.length > 0 ? t : [e], M = m.length === 0 && !l && _.length > 1;
    Ma(d, () => ({
      focus: () => {
        var w;
        (w = N.current) == null || w.focus();
      },
      setText: (w) => {
        h(w), setTimeout(() => {
          var H;
          (H = N.current) == null || H.focus();
        }, 0);
      }
    }));
    const x = se(
      (w) => {
        w.preventDefault();
        const W = new FormData(w.currentTarget).get("message");
        if (W != null && W.trim()) {
          const G = mn(W.trim(), !1);
          if (!G.trim()) {
            console.warn("Message was blocked due to security concerns");
            return;
          }
          s(G, y), h(""), S([]);
        }
      },
      [s, y]
    ), L = se(
      (w) => {
        const W = w.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
        h(W);
      },
      []
    ), z = se(async () => {
      const w = document.createElement("input");
      w.type = "file", w.accept = "image/*", w.multiple = !1, w.onchange = async (H) => {
        const W = H.target.files;
        if (W) {
          const G = Array.from(W).filter((B) => {
            const A = uo(B.name);
            return A !== B.name && console.warn(
              `File name sanitized: ${B.name} -> ${A}`
            ), B.size > 10485760 ? (console.warn(`File too large: ${B.name} (${B.size} bytes)`), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ].includes(B.type) ? !0 : (console.warn(
              `File type not allowed: ${B.name} (${B.type})`
            ), !1);
          });
          if (G.length > 0) {
            const B = await u(G);
            S(B);
          }
        }
      }, w.click();
    }, [u]);
    return /* @__PURE__ */ I(Da, { onSubmit: x, style: { position: "relative" }, children: [
      /* @__PURE__ */ p(
        Oi,
        {
          ref: N,
          name: "message",
          value: m,
          onChange: L,
          placeholder: "",
          disabled: n
        }
      ),
      !m.trim() && /* @__PURE__ */ p(
        za,
        {
          placeholderTexts: _,
          shouldAnimate: M
        }
      ),
      y.length > 0 && /* @__PURE__ */ p(
        "div",
        {
          style: {
            padding: "8px 16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center"
          },
          children: y.map((w, H) => {
            const W = w.startsWith("data:image/"), G = w.startsWith("http://") || w.startsWith("https://"), B = W || G;
            return /* @__PURE__ */ I(
              "div",
              {
                style: {
                  position: "relative",
                  display: "inline-block"
                },
                children: [
                  B ? /* @__PURE__ */ I(
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
                        /* @__PURE__ */ p(
                          "img",
                          {
                            src: w,
                            alt: `Attachment ${H + 1}`,
                            style: {
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }
                          }
                        ),
                        /* @__PURE__ */ p(
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
                        /* @__PURE__ */ p(
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
                                  /* @__PURE__ */ p(
                                    "mask",
                                    {
                                      id: "mask0_190_623",
                                      style: { maskType: "alpha" },
                                      maskUnits: "userSpaceOnUse",
                                      x: "0",
                                      y: "0",
                                      width: "24",
                                      height: "25",
                                      children: /* @__PURE__ */ p(
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
                                  /* @__PURE__ */ p("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ p(
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
                          /* @__PURE__ */ p(
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
                                const A = w.match(/name=([^;]+)/);
                                return A ? decodeURIComponent(A[1]) : "document.pdf";
                              })()
                            }
                          ),
                          /* @__PURE__ */ p(
                            "div",
                            {
                              style: {
                                color: "#9ca3af",
                                fontSize: "12px",
                                textTransform: "uppercase"
                              },
                              children: (() => {
                                const A = w.match(/data:([^;]+)/);
                                if (A) {
                                  const v = A[1];
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
                                      const Y = v.split("/")[1];
                                      return Y ? Y.toUpperCase().substring(0, 4) : "FILE";
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
                  /* @__PURE__ */ p(
                    "button",
                    {
                      onClick: () => {
                        S(
                          (A) => A.filter((v, Y) => Y !== H)
                        );
                      },
                      style: {
                        position: "absolute",
                        top: B ? "6px" : "8px",
                        right: B ? "6px" : "8px",
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
              H
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
                /* @__PURE__ */ p(
                  Ua,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: z,
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
                          /* @__PURE__ */ p(
                            "rect",
                            {
                              y: "0.354126",
                              width: "36",
                              height: "36",
                              rx: "18",
                              fill: "#F4F6F8"
                            }
                          ),
                          /* @__PURE__ */ p("g", { clipPath: "url(#clip0_121_9706)", children: /* @__PURE__ */ p(
                            "path",
                            {
                              d: "M21.3334 13.3541V22.9374C21.3334 24.7791 19.8417 26.2708 18 26.2708C16.1584 26.2708 14.6667 24.7791 14.6667 22.9374V12.5208C14.6667 11.3708 15.6 10.4374 16.75 10.4374C17.9 10.4374 18.8334 11.3708 18.8334 12.5208V21.2708C18.8334 21.7291 18.4584 22.1041 18 22.1041C17.5417 22.1041 17.1667 21.7291 17.1667 21.2708V13.3541H15.9167V21.2708C15.9167 22.4208 16.85 23.3541 18 23.3541C19.15 23.3541 20.0834 22.4208 20.0834 21.2708V12.5208C20.0834 10.6791 18.5917 9.18744 16.75 9.18744C14.9084 9.18744 13.4167 10.6791 13.4167 12.5208V22.9374C13.4167 25.4708 15.4667 27.5208 18 27.5208C20.5334 27.5208 22.5834 25.4708 22.5834 22.9374V13.3541H21.3334Z",
                              fill: "#212B36"
                            }
                          ) }),
                          /* @__PURE__ */ p("defs", { children: /* @__PURE__ */ p("clipPath", { id: "clip0_121_9706", children: /* @__PURE__ */ p(
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
                /* @__PURE__ */ p(
                  "span",
                  {
                    onClick: z,
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
          i && a && /* @__PURE__ */ p("div", { className: "chat-wrapper__divider" }),
          a && /* @__PURE__ */ I("div", { className: "chat-wrapper__restaurant-chip", children: [
            o && /* @__PURE__ */ p(
              "img",
              {
                src: o,
                alt: "Restaurant logo",
                className: "chat-wrapper__restaurant-logo"
              }
            ),
            /* @__PURE__ */ p("span", { className: "chat-wrapper__restaurant-name", children: a })
          ] })
        ] }),
        /* @__PURE__ */ p(
          Fa,
          {
            status: r,
            disabled: !m.trim() && r !== Fe.STREAMING,
            onClick: r === Fe.STREAMING && c ? () => {
              c();
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
  /* @__PURE__ */ p("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
  /* @__PURE__ */ p("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((n, r) => /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__suggested-prompt-card",
      onClick: () => t(n),
      children: /* @__PURE__ */ I("div", { className: "chat-wrapper__suggested-prompt-content", children: [
        /* @__PURE__ */ p("h4", { className: "chat-wrapper__suggested-prompt-title", children: n.title }),
        /* @__PURE__ */ p("p", { className: "chat-wrapper__suggested-prompt-description", children: n.description })
      ] })
    },
    r
  )) })
] });
function Fi({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ I("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ p("span", {}),
    /* @__PURE__ */ p("span", {}),
    /* @__PURE__ */ p("span", {})
  ] }) : t === "pulse" ? /* @__PURE__ */ p(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ p(
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
}) => /* @__PURE__ */ p(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ p("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ p(Fi, { size: e, variant: "dots" }) })
  }
);
async function go(e, t, n) {
  const r = {
    "Content-Type": "application/json"
  };
  n != null && n.userMpAuthToken && (r.Authorization = `Bearer ${n.userMpAuthToken}`), n != null && n.chatServerKey && (r["X-Chat-Server-Key"] = n.chatServerKey);
  const i = await fetch(`${e}/agent-configurations/${t}`, {
    method: "GET",
    headers: r
  });
  if (!i.ok) {
    const o = await i.json().catch(() => ({}));
    throw new Error(
      o.message || `Failed to get agent configuration: ${i.statusText}`
    );
  }
  return (await i.json()).configuration;
}
async function Co(e, t, n, r) {
  const i = {
    "Content-Type": "application/json"
  };
  r != null && r.userMpAuthToken && (i.Authorization = `Bearer ${r.userMpAuthToken}`), r != null && r.chatServerKey && (i["X-Chat-Server-Key"] = r.chatServerKey);
  const a = await fetch(`${e}/agent-configurations/${t}`, {
    method: "PUT",
    headers: i,
    body: JSON.stringify(n)
  });
  if (!a.ok) {
    const l = await a.json().catch(() => ({}));
    throw new Error(
      l.message || `Failed to update agent configuration: ${a.statusText}`
    );
  }
  return (await a.json()).configuration;
}
const yo = ({
  isOpen: e,
  onClose: t,
  app: n,
  apiUrl: r,
  userMpAuthToken: i,
  chatServerKey: a
}) => {
  const [o, l] = ee(null), [s, u] = ee(""), [c, d] = ee(""), [m, h] = ee(!1), [y, S] = ee(null);
  tt(() => {
    e && !o && N();
  }, [e]);
  const N = se(async () => {
    h(!0), S(null);
    try {
      const x = await go(r, n, {
        userMpAuthToken: i,
        chatServerKey: a
      });
      l(x), u(x.promptPath), d(x.versionUuid);
    } catch (x) {
      S(x instanceof Error ? x.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", x);
    } finally {
      h(!1);
    }
  }, [r, n, i, a]), _ = se(async () => {
    if (o) {
      h(!0), S(null);
      try {
        const x = await Co(r, n, {
          promptPath: s,
          versionUuid: c,
          isDefault: o.isDefault
        }, {
          userMpAuthToken: i,
          chatServerKey: a
        });
        l(x), t(), window.location.reload();
      } catch (x) {
        S(x instanceof Error ? x.message : "Failed to update configuration"), console.error("Error updating agent configuration:", x);
      } finally {
        h(!1);
      }
    }
  }, [r, n, s, c, o, t, i, a]), M = se(() => {
    o && (u(o.promptPath), d(o.versionUuid)), S(null), t();
  }, [o, t]);
  return e ? /* @__PURE__ */ p("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ p("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ p(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: M,
          title: "Close settings",
          children: /* @__PURE__ */ p(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ p(
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
      m && /* @__PURE__ */ p("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      y && /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ I("p", { children: [
          "Error: ",
          y
        ] }),
        /* @__PURE__ */ p(
          "button",
          {
            onClick: N,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      o && !m && /* @__PURE__ */ I(tn, { children: [
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ p("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ p(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: s,
              onChange: (x) => u(x.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: m
            }
          ),
          /* @__PURE__ */ p("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ p("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ p(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: c,
              onChange: (x) => d(x.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: m
            }
          ),
          /* @__PURE__ */ p("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__dev-settings-info", children: /* @__PURE__ */ I("p", { children: [
          /* @__PURE__ */ p("strong", { children: "App:" }),
          " ",
          n
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ p(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: M,
          disabled: m,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: _,
          disabled: m || !o,
          children: m ? "Saving..." : "Save"
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
function Br(e, t) {
  return (_o.jsx ? So : Eo).test(e);
}
const xo = /[ \t\n\f\r]/g;
function To(e) {
  return typeof e == "object" ? e.type === "text" ? Gr(e.value) : !1 : Gr(e);
}
function Gr(e) {
  return e.replace(xo, "") === "";
}
class rn {
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
rn.prototype.normal = {};
rn.prototype.property = {};
rn.prototype.space = void 0;
function zi(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new rn(n, r, t);
}
function Yn(e) {
  return e.toLowerCase();
}
class Be {
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
Be.prototype.attribute = "";
Be.prototype.booleanish = !1;
Be.prototype.boolean = !1;
Be.prototype.commaOrSpaceSeparated = !1;
Be.prototype.commaSeparated = !1;
Be.prototype.defined = !1;
Be.prototype.mustUseProperty = !1;
Be.prototype.number = !1;
Be.prototype.overloadedBoolean = !1;
Be.prototype.property = "";
Be.prototype.spaceSeparated = !1;
Be.prototype.space = void 0;
let ko = 0;
const Z = Mt(), ye = Mt(), Kn = Mt(), T = Mt(), ce = Mt(), Ft = Mt(), Ve = Mt();
function Mt() {
  return 2 ** ++ko;
}
const Qn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: Z,
  booleanish: ye,
  commaOrSpaceSeparated: Ve,
  commaSeparated: Ft,
  number: T,
  overloadedBoolean: Kn,
  spaceSeparated: ce
}, Symbol.toStringTag, { value: "Module" })), Dn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Qn)
);
class sr extends Be {
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
    if (super(t, n), Vr(this, "space", i), typeof r == "number")
      for (; ++a < Dn.length; ) {
        const o = Dn[a];
        Vr(this, Dn[a], (r & Qn[o]) === Qn[o]);
      }
  }
}
sr.prototype.defined = !0;
function Vr(e, t, n) {
  n && (e[t] = n);
}
function Gt(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new sr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[Yn(r)] = r, n[Yn(a.attribute)] = r;
  }
  return new rn(t, n, e.space);
}
const Bi = Gt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: ye,
    ariaAutoComplete: null,
    ariaBusy: ye,
    ariaChecked: ye,
    ariaColCount: T,
    ariaColIndex: T,
    ariaColSpan: T,
    ariaControls: ce,
    ariaCurrent: null,
    ariaDescribedBy: ce,
    ariaDetails: null,
    ariaDisabled: ye,
    ariaDropEffect: ce,
    ariaErrorMessage: null,
    ariaExpanded: ye,
    ariaFlowTo: ce,
    ariaGrabbed: ye,
    ariaHasPopup: null,
    ariaHidden: ye,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: ce,
    ariaLevel: T,
    ariaLive: null,
    ariaModal: ye,
    ariaMultiLine: ye,
    ariaMultiSelectable: ye,
    ariaOrientation: null,
    ariaOwns: ce,
    ariaPlaceholder: null,
    ariaPosInSet: T,
    ariaPressed: ye,
    ariaReadOnly: ye,
    ariaRelevant: null,
    ariaRequired: ye,
    ariaRoleDescription: ce,
    ariaRowCount: T,
    ariaRowIndex: T,
    ariaRowSpan: T,
    ariaSelected: ye,
    ariaSetSize: T,
    ariaSort: null,
    ariaValueMax: T,
    ariaValueMin: T,
    ariaValueNow: T,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function Gi(e, t) {
  return t in e ? e[t] : t;
}
function Vi(e, t) {
  return Gi(e, t.toLowerCase());
}
const bo = Gt({
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
    accept: Ft,
    acceptCharset: ce,
    accessKey: ce,
    action: null,
    allow: null,
    allowFullScreen: Z,
    allowPaymentRequest: Z,
    allowUserMedia: Z,
    alt: null,
    as: null,
    async: Z,
    autoCapitalize: null,
    autoComplete: ce,
    autoFocus: Z,
    autoPlay: Z,
    blocking: ce,
    capture: null,
    charSet: null,
    checked: Z,
    cite: null,
    className: ce,
    cols: T,
    colSpan: null,
    content: null,
    contentEditable: ye,
    controls: Z,
    controlsList: ce,
    coords: T | Ft,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: Z,
    defer: Z,
    dir: null,
    dirName: null,
    disabled: Z,
    download: Kn,
    draggable: ye,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: Z,
    formTarget: null,
    headers: ce,
    height: T,
    hidden: Kn,
    high: T,
    href: null,
    hrefLang: null,
    htmlFor: ce,
    httpEquiv: ce,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: Z,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: Z,
    itemId: null,
    itemProp: ce,
    itemRef: ce,
    itemScope: Z,
    itemType: ce,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: Z,
    low: T,
    manifest: null,
    max: null,
    maxLength: T,
    media: null,
    method: null,
    min: null,
    minLength: T,
    multiple: Z,
    muted: Z,
    name: null,
    nonce: null,
    noModule: Z,
    noValidate: Z,
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
    open: Z,
    optimum: T,
    pattern: null,
    ping: ce,
    placeholder: null,
    playsInline: Z,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: Z,
    referrerPolicy: null,
    rel: ce,
    required: Z,
    reversed: Z,
    rows: T,
    rowSpan: T,
    sandbox: ce,
    scope: null,
    scoped: Z,
    seamless: Z,
    selected: Z,
    shadowRootClonable: Z,
    shadowRootDelegatesFocus: Z,
    shadowRootMode: null,
    shape: null,
    size: T,
    sizes: null,
    slot: null,
    span: T,
    spellCheck: ye,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: T,
    step: null,
    style: null,
    tabIndex: T,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: Z,
    useMap: null,
    value: ye,
    width: T,
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
    border: T,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: T,
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
    compact: Z,
    // Lists. Use CSS to reduce space between items instead
    declare: Z,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: T,
    // `<img>` and `<object>`
    leftMargin: T,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: T,
    // `<body>`
    marginWidth: T,
    // `<body>`
    noResize: Z,
    // `<frame>`
    noHref: Z,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: Z,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: Z,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: T,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: ye,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: T,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: T,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: Z,
    disableRemotePlayback: Z,
    prefix: null,
    property: null,
    results: T,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Vi
}), Ao = Gt({
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
    about: Ve,
    accentHeight: T,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: T,
    amplitude: T,
    arabicForm: null,
    ascent: T,
    attributeName: null,
    attributeType: null,
    azimuth: T,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: T,
    by: null,
    calcMode: null,
    capHeight: T,
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
    descent: T,
    diffuseConstant: T,
    direction: null,
    display: null,
    dur: null,
    divisor: T,
    dominantBaseline: null,
    download: Z,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: T,
    enableBackground: null,
    end: null,
    event: null,
    exponent: T,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: T,
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
    g1: Ft,
    g2: Ft,
    glyphName: Ft,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: T,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: T,
    horizOriginX: T,
    horizOriginY: T,
    id: null,
    ideographic: T,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: T,
    k: T,
    k1: T,
    k2: T,
    k3: T,
    k4: T,
    kernelMatrix: Ve,
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
    limitingConeAngle: T,
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
    mediaSize: T,
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
    overlinePosition: T,
    overlineThickness: T,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: T,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: ce,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: T,
    pointsAtY: T,
    pointsAtZ: T,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Ve,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Ve,
    rev: Ve,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Ve,
    requiredFeatures: Ve,
    requiredFonts: Ve,
    requiredFormats: Ve,
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
    specularConstant: T,
    specularExponent: T,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: T,
    strikethroughThickness: T,
    string: null,
    stroke: null,
    strokeDashArray: Ve,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: T,
    strokeOpacity: T,
    strokeWidth: null,
    style: null,
    surfaceScale: T,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Ve,
    tabIndex: T,
    tableValues: null,
    target: null,
    targetX: T,
    targetY: T,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Ve,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: T,
    underlineThickness: T,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: T,
    values: null,
    vAlphabetic: T,
    vMathematical: T,
    vectorEffect: null,
    vHanging: T,
    vIdeographic: T,
    version: null,
    vertAdvY: T,
    vertOriginX: T,
    vertOriginY: T,
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
    xHeight: T,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Gi
}), ji = Gt({
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
}), $i = Gt({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Vi
}), Wi = Gt({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), Ro = {
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
}, Io = /[A-Z]/g, jr = /-[a-z]/g, No = /^data[-\w.:]+$/i;
function vo(e, t) {
  const n = Yn(t);
  let r = t, i = Be;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && No.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(jr, Mo);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!jr.test(a)) {
        let o = a.replace(Io, Lo);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    i = sr;
  }
  return new i(r, t);
}
function Lo(e) {
  return "-" + e.toLowerCase();
}
function Mo(e) {
  return e.charAt(1).toUpperCase();
}
const Oo = zi([Bi, bo, ji, $i, Wi], "html"), cr = zi([Bi, Ao, ji, $i, Wi], "svg");
function Do(e) {
  return e.join(" ").trim();
}
var wn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Zi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ur = {}, $r = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Po = /\n/g, Ho = /^\s*/, Uo = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Fo = /^:\s*/, zo = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Bo = /^[;\s]*/, Go = /^\s+|\s+$/g, Vo = `
`, Wr = "/", Zr = "*", Lt = "", jo = "comment", $o = "declaration", Wo = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(y) {
    var S = y.match(Po);
    S && (n += S.length);
    var N = y.lastIndexOf(Vo);
    r = ~N ? y.length - N : r + y.length;
  }
  function a() {
    var y = { line: n, column: r };
    return function(S) {
      return S.position = new o(y), u(), S;
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
      var N = S[0];
      return i(N), e = e.slice(N.length), S;
    }
  }
  function u() {
    s(Ho);
  }
  function c(y) {
    var S;
    for (y = y || []; S = d(); )
      S !== !1 && y.push(S);
    return y;
  }
  function d() {
    var y = a();
    if (!(Wr != e.charAt(0) || Zr != e.charAt(1))) {
      for (var S = 2; Lt != e.charAt(S) && (Zr != e.charAt(S) || Wr != e.charAt(S + 1)); )
        ++S;
      if (S += 2, Lt === e.charAt(S - 1))
        return l("End of comment missing");
      var N = e.slice(2, S - 2);
      return r += 2, i(N), e = e.slice(S), r += 2, y({
        type: jo,
        comment: N
      });
    }
  }
  function m() {
    var y = a(), S = s(Uo);
    if (S) {
      if (d(), !s(Fo)) return l("property missing ':'");
      var N = s(zo), _ = y({
        type: $o,
        property: qr(S[0].replace($r, Lt)),
        value: N ? qr(N[0].replace($r, Lt)) : Lt
      });
      return s(Bo), _;
    }
  }
  function h() {
    var y = [];
    c(y);
    for (var S; S = m(); )
      S !== !1 && (y.push(S), c(y));
    return y;
  }
  return u(), h();
};
function qr(e) {
  return e ? e.replace(Go, Lt) : Lt;
}
var Zo = wn && wn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(ur, "__esModule", { value: !0 });
ur.default = Xo;
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
var xn = {};
Object.defineProperty(xn, "__esModule", { value: !0 });
xn.camelCase = void 0;
var Yo = /^--[a-zA-Z0-9_-]+$/, Ko = /-([a-z])/g, Qo = /^[^-]+$/, Jo = /^-(webkit|moz|ms|o|khtml)-/, el = /^-(ms)-/, tl = function(e) {
  return !e || Qo.test(e) || Yo.test(e);
}, nl = function(e, t) {
  return t.toUpperCase();
}, Xr = function(e, t) {
  return "".concat(t, "-");
}, rl = function(e, t) {
  return t === void 0 && (t = {}), tl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(el, Xr) : e = e.replace(Jo, Xr), e.replace(Ko, nl));
};
xn.camelCase = rl;
var il = wn && wn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, al = il(ur), ol = xn;
function Jn(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, al.default)(e, function(r, i) {
    r && i && (n[(0, ol.camelCase)(r, t)] = i);
  }), n;
}
Jn.default = Jn;
var ll = Jn;
const sl = /* @__PURE__ */ Zi(ll), qi = Xi("end"), hr = Xi("start");
function Xi(e) {
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
function cl(e) {
  const t = hr(e), n = qi(e);
  if (t && n)
    return { start: t, end: n };
}
function Qt(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Yr(e.position) : "start" in e || "end" in e ? Yr(e) : "line" in e || "column" in e ? er(e) : "";
}
function er(e) {
  return Kr(e && e.line) + ":" + Kr(e && e.column);
}
function Yr(e) {
  return er(e && e.start) + "-" + er(e && e.end);
}
function Kr(e) {
  return e && typeof e == "number" ? e : 1;
}
class Ne extends Error {
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
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = l ? l.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = l ? l.line : void 0, this.name = Qt(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = o && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Ne.prototype.file = "";
Ne.prototype.name = "";
Ne.prototype.reason = "";
Ne.prototype.message = "";
Ne.prototype.stack = "";
Ne.prototype.column = void 0;
Ne.prototype.line = void 0;
Ne.prototype.ancestors = void 0;
Ne.prototype.cause = void 0;
Ne.prototype.fatal = void 0;
Ne.prototype.place = void 0;
Ne.prototype.ruleId = void 0;
Ne.prototype.source = void 0;
const pr = {}.hasOwnProperty, ul = /* @__PURE__ */ new Map(), hl = /[A-Z]/g, pl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), dl = /* @__PURE__ */ new Set(["td", "th"]), Yi = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
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
    schema: t.space === "svg" ? cr : Oo,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = Ki(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function Ki(e, t, n) {
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
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = cr, e.schema = i), e.ancestors.push(t);
  const a = Ji(e, t.tagName, !1), o = xl(e, t);
  let l = fr(e, t);
  return pl.has(t.tagName) && (l = l.filter(function(s) {
    return typeof s == "string" ? !To(s) : !0;
  })), Qi(e, o, a, t), dr(o, l), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function gl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  nn(e, t.position);
}
function Cl(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  nn(e, t.position);
}
function yl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = cr, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : Ji(e, t.name, !0), o = Tl(e, t), l = fr(e, t);
  return Qi(e, o, a, t), dr(o, l), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function wl(e, t, n) {
  const r = {};
  return dr(r, fr(e, t)), e.create(t, e.Fragment, r, n);
}
function El(e, t) {
  return t.value;
}
function Qi(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function dr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function Sl(e, t, n) {
  return r;
  function r(i, a, o, l) {
    const u = Array.isArray(o.children) ? n : t;
    return l ? u(a, o, l) : u(a, o);
  }
}
function _l(e, t) {
  return n;
  function n(r, i, a, o) {
    const l = Array.isArray(a.children), s = hr(r);
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
    if (i !== "children" && pr.call(t.properties, i)) {
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
        nn(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const l = r.value.data.estree.body[0];
          l.type, a = e.evaluater.evaluateExpression(l.expression);
        } else
          nn(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function fr(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : ul;
  for (; ++r < t.children.length; ) {
    const a = t.children[r];
    let o;
    if (e.passKeys) {
      const s = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (s) {
        const u = i.get(s) || 0;
        o = s + "-" + u, i.set(s, u + 1);
      }
    }
    const l = Ki(e, a, o);
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
      e.elementAttributeNameCase === "react" && r.space ? Ro[r.property] || r.property : r.attribute,
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
    ), i = new Ne("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Yi + "#cannot-parse-style-attribute", i;
  }
}
function Ji(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let a = -1, o;
    for (; ++a < i.length; ) {
      const l = Br(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
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
    r = Br(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return pr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  nn(e);
}
function nn(e, t) {
  const n = new Ne(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Yi + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Al(e) {
  const t = {};
  let n;
  for (n in e)
    pr.call(e, n) && (t[Rl(n)] = e[n]);
  return t;
}
function Rl(e) {
  let t = e.replace(hl, Il);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Il(e) {
  return "-" + e.toLowerCase();
}
const Pn = {
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
  return ea(e, r, i);
}
function ea(e, t, n) {
  if (Ll(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Qr(e.children, t, n);
  }
  return Array.isArray(e) ? Qr(e, t, n) : "";
}
function Qr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = ea(e[i], t, n);
  return r.join("");
}
function Ll(e) {
  return !!(e && typeof e == "object");
}
const Jr = document.createElement("i");
function mr(e) {
  const t = "&" + e + ";";
  Jr.innerHTML = t;
  const n = Jr.textContent;
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
const ei = {}.hasOwnProperty;
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
    const i = (ei.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let o;
    if (a)
      for (o in a) {
        ei.call(i, o) || (i[o] = []);
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
function ta(e, t) {
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
function zt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const lt = bt(/[A-Za-z]/), je = bt(/[\dA-Za-z]/), Pl = bt(/[#-'*+\--9=?A-Z^-~]/);
function tr(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const nr = bt(/\d/), Hl = bt(/[\dA-Fa-f]/), Ul = bt(/[!-/:-@[-`{-~]/);
function j(e) {
  return e !== null && e < -2;
}
function ze(e) {
  return e !== null && (e < 0 || e === 32);
}
function ie(e) {
  return e === -2 || e === -1 || e === 32;
}
const Fl = bt(new RegExp("\\p{P}|\\p{S}", "u")), zl = bt(/\s/);
function bt(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Vt(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let o = "";
    if (a === 37 && je(e.charCodeAt(n + 1)) && je(e.charCodeAt(n + 2)))
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
function ue(e, t, n, r) {
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
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), ue(e, t, "linePrefix");
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
    return j(l) ? (e.consume(l), e.exit("chunkText"), a) : (e.consume(l), o);
  }
}
const Vl = {
  tokenize: jl
}, ti = {
  tokenize: $l
};
function jl(e) {
  const t = this, n = [];
  let r = 0, i, a, o;
  return l;
  function l(x) {
    if (r < n.length) {
      const L = n[r];
      return t.containerState = L[1], e.attempt(L[0].continuation, s, u)(x);
    }
    return u(x);
  }
  function s(x) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && M();
      const L = t.events.length;
      let z = L, w;
      for (; z--; )
        if (t.events[z][0] === "exit" && t.events[z][1].type === "chunkFlow") {
          w = t.events[z][1].end;
          break;
        }
      _(r);
      let H = L;
      for (; H < t.events.length; )
        t.events[H][1].end = {
          ...w
        }, H++;
      return st(t.events, z + 1, 0, t.events.slice(L)), t.events.length = H, u(x);
    }
    return l(x);
  }
  function u(x) {
    if (r === n.length) {
      if (!i)
        return m(x);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return y(x);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(ti, c, d)(x);
  }
  function c(x) {
    return i && M(), _(r), m(x);
  }
  function d(x) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, y(x);
  }
  function m(x) {
    return t.containerState = {}, e.attempt(ti, h, y)(x);
  }
  function h(x) {
    return r++, n.push([t.currentConstruct, t.containerState]), m(x);
  }
  function y(x) {
    if (x === null) {
      i && M(), _(0), e.consume(x);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: a
    }), S(x);
  }
  function S(x) {
    if (x === null) {
      N(e.exit("chunkFlow"), !0), _(0), e.consume(x);
      return;
    }
    return j(x) ? (e.consume(x), N(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, l) : (e.consume(x), S);
  }
  function N(x, L) {
    const z = t.sliceStream(x);
    if (L && z.push(null), x.previous = a, a && (a.next = x), a = x, i.defineSkip(x.start), i.write(z), t.parser.lazy[x.start.line]) {
      let w = i.events.length;
      for (; w--; )
        if (
          // The token starts before the line ending…
          i.events[w][1].start.offset < o && // …and either is not ended yet…
          (!i.events[w][1].end || // …or ends after it.
          i.events[w][1].end.offset > o)
        )
          return;
      const H = t.events.length;
      let W = H, G, B;
      for (; W--; )
        if (t.events[W][0] === "exit" && t.events[W][1].type === "chunkFlow") {
          if (G) {
            B = t.events[W][1].end;
            break;
          }
          G = !0;
        }
      for (_(r), w = H; w < t.events.length; )
        t.events[w][1].end = {
          ...B
        }, w++;
      st(t.events, W + 1, 0, t.events.slice(H)), t.events.length = w;
    }
  }
  function _(x) {
    let L = n.length;
    for (; L-- > x; ) {
      const z = n[L];
      t.containerState = z[1], z[0].exit.call(t, e);
    }
    n.length = x;
  }
  function M() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function $l(e, t, n) {
  return ue(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function ni(e) {
  if (e === null || ze(e) || zl(e))
    return 1;
  if (Fl(e))
    return 2;
}
function gr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const rr = {
  name: "attention",
  resolveAll: Wl,
  tokenize: Zl
};
function Wl(e, t) {
  let n = -1, r, i, a, o, l, s, u, c;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          s = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const d = {
            ...e[r][1].end
          }, m = {
            ...e[n][1].start
          };
          ri(d, -s), ri(m, s), o = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: d,
            end: {
              ...e[r][1].end
            }
          }, l = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: m
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
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = Xe(u, [["enter", e[r][1], t], ["exit", e[r][1], t]])), u = Xe(u, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["enter", a, t]]), u = Xe(u, gr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), u = Xe(u, [["exit", a, t], ["enter", l, t], ["exit", l, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (c = 2, u = Xe(u, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : c = 0, st(e, r - 1, n - r + 3, u), n = r + u.length - c - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Zl(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = ni(r);
  let a;
  return o;
  function o(s) {
    return a = s, e.enter("attentionSequence"), l(s);
  }
  function l(s) {
    if (s === a)
      return e.consume(s), l;
    const u = e.exit("attentionSequence"), c = ni(s), d = !c || c === 2 && i || n.includes(s), m = !i || i === 2 && c || n.includes(r);
    return u._open = !!(a === 42 ? d : d && (i || !m)), u._close = !!(a === 42 ? m : m && (c || !d)), t(s);
  }
}
function ri(e, t) {
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
    return lt(h) ? (e.consume(h), o) : h === 64 ? n(h) : u(h);
  }
  function o(h) {
    return h === 43 || h === 45 || h === 46 || je(h) ? (r = 1, l(h)) : u(h);
  }
  function l(h) {
    return h === 58 ? (e.consume(h), r = 0, s) : (h === 43 || h === 45 || h === 46 || je(h)) && r++ < 32 ? (e.consume(h), l) : (r = 0, u(h));
  }
  function s(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : h === null || h === 32 || h === 60 || tr(h) ? n(h) : (e.consume(h), s);
  }
  function u(h) {
    return h === 64 ? (e.consume(h), c) : Pl(h) ? (e.consume(h), u) : n(h);
  }
  function c(h) {
    return je(h) ? d(h) : n(h);
  }
  function d(h) {
    return h === 46 ? (e.consume(h), r = 0, c) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : m(h);
  }
  function m(h) {
    if ((h === 45 || je(h)) && r++ < 63) {
      const y = h === 45 ? m : d;
      return e.consume(h), y;
    }
    return n(h);
  }
}
const Tn = {
  partial: !0,
  tokenize: Yl
};
function Yl(e, t, n) {
  return r;
  function r(a) {
    return ie(a) ? ue(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || j(a) ? t(a) : n(a);
  }
}
const na = {
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
    return ie(o) ? ue(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : a(o);
  }
  function a(o) {
    return e.attempt(na, t, n)(o);
  }
}
function Jl(e) {
  e.exit("blockQuote");
}
const ra = {
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
const ia = {
  name: "characterReference",
  tokenize: ts
};
function ts(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return l;
  function l(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), s;
  }
  function s(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), a = 31, o = je, c(d));
  }
  function u(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, o = Hl, c) : (e.enter("characterReferenceValue"), a = 7, o = nr, c(d));
  }
  function c(d) {
    if (d === 59 && i) {
      const m = e.exit("characterReferenceValue");
      return o === je && !mr(r.sliceSerialize(m)) ? n(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return o(d) && i++ < a ? (e.consume(d), c) : n(d);
  }
}
const ii = {
  partial: !0,
  tokenize: rs
}, ai = {
  concrete: !0,
  name: "codeFenced",
  tokenize: ns
};
function ns(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: z
  };
  let a = 0, o = 0, l;
  return s;
  function s(w) {
    return u(w);
  }
  function u(w) {
    const H = r.events[r.events.length - 1];
    return a = H && H[1].type === "linePrefix" ? H[2].sliceSerialize(H[1], !0).length : 0, l = w, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), c(w);
  }
  function c(w) {
    return w === l ? (o++, e.consume(w), c) : o < 3 ? n(w) : (e.exit("codeFencedFenceSequence"), ie(w) ? ue(e, d, "whitespace")(w) : d(w));
  }
  function d(w) {
    return w === null || j(w) ? (e.exit("codeFencedFence"), r.interrupt ? t(w) : e.check(ii, S, L)(w)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), m(w));
  }
  function m(w) {
    return w === null || j(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(w)) : ie(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), ue(e, h, "whitespace")(w)) : w === 96 && w === l ? n(w) : (e.consume(w), m);
  }
  function h(w) {
    return w === null || j(w) ? d(w) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), y(w));
  }
  function y(w) {
    return w === null || j(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(w)) : w === 96 && w === l ? n(w) : (e.consume(w), y);
  }
  function S(w) {
    return e.attempt(i, L, N)(w);
  }
  function N(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), _;
  }
  function _(w) {
    return a > 0 && ie(w) ? ue(e, M, "linePrefix", a + 1)(w) : M(w);
  }
  function M(w) {
    return w === null || j(w) ? e.check(ii, S, L)(w) : (e.enter("codeFlowValue"), x(w));
  }
  function x(w) {
    return w === null || j(w) ? (e.exit("codeFlowValue"), M(w)) : (e.consume(w), x);
  }
  function L(w) {
    return e.exit("codeFenced"), t(w);
  }
  function z(w, H, W) {
    let G = 0;
    return B;
    function B(R) {
      return w.enter("lineEnding"), w.consume(R), w.exit("lineEnding"), A;
    }
    function A(R) {
      return w.enter("codeFencedFence"), ie(R) ? ue(w, v, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(R) : v(R);
    }
    function v(R) {
      return R === l ? (w.enter("codeFencedFenceSequence"), Y(R)) : W(R);
    }
    function Y(R) {
      return R === l ? (G++, w.consume(R), Y) : G >= o ? (w.exit("codeFencedFenceSequence"), ie(R) ? ue(w, D, "whitespace")(R) : D(R)) : W(R);
    }
    function D(R) {
      return R === null || j(R) ? (w.exit("codeFencedFence"), H(R)) : W(R);
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
const Hn = {
  name: "codeIndented",
  tokenize: as
}, is = {
  partial: !0,
  tokenize: os
};
function as(e, t, n) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("codeIndented"), ue(e, a, "linePrefix", 5)(u);
  }
  function a(u) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? o(u) : n(u);
  }
  function o(u) {
    return u === null ? s(u) : j(u) ? e.attempt(is, o, s)(u) : (e.enter("codeFlowValue"), l(u));
  }
  function l(u) {
    return u === null || j(u) ? (e.exit("codeFlowValue"), o(u)) : (e.consume(u), l);
  }
  function s(u) {
    return e.exit("codeIndented"), t(u);
  }
}
function os(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : j(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : ue(e, a, "linePrefix", 5)(o);
  }
  function a(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? t(o) : j(o) ? i(o) : n(o);
  }
}
const ls = {
  name: "codeText",
  previous: cs,
  resolve: ss,
  tokenize: us
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
function cs(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function us(e, t, n) {
  let r = 0, i, a;
  return o;
  function o(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), l(d);
  }
  function l(d) {
    return d === 96 ? (e.consume(d), r++, l) : (e.exit("codeTextSequence"), s(d));
  }
  function s(d) {
    return d === null ? n(d) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), s) : d === 96 ? (a = e.enter("codeTextSequence"), i = 0, c(d)) : j(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(d));
  }
  function u(d) {
    return d === null || d === 32 || d === 96 || j(d) ? (e.exit("codeTextData"), s(d)) : (e.consume(d), u);
  }
  function c(d) {
    return d === 96 ? (e.consume(d), i++, c) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(d)) : (a.type = "codeTextData", u(d));
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
    return r && Yt(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Yt(this.left, t);
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
    this.setCursor(0), Yt(this.right, t.reverse());
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
        Yt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Yt(this.left, n.reverse());
      }
  }
}
function Yt(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function aa(e) {
  const t = {};
  let n = -1, r, i, a, o, l, s, u;
  const c = new hs(e);
  for (; ++n < c.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = c.get(n), n && r[1].type === "chunkFlow" && c.get(n - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, a = 0, a < s.length && s[a][1].type === "lineEndingBlank" && (a += 2), a < s.length && s[a][1].type === "content"))
      for (; ++a < s.length && s[a][1].type !== "content"; )
        s[a][1].type === "chunkText" && (s[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, ps(c, n)), n = t[n], u = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (o = c.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
          o[0] === "enter" && (i && (c.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
        else if (!(o[1].type === "linePrefix" || o[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...c.get(i)[1].start
      }, l = c.slice(i, n), l.unshift(r), c.splice(i, n - i + 1, l));
    }
  }
  return st(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !u;
}
function ps(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const l = o.events, s = [], u = {};
  let c, d, m = -1, h = n, y = 0, S = 0;
  const N = [S];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; )
      ;
    a.push(i), h._tokenizer || (c = r.sliceStream(h), h.next || c.push(null), d && o.defineSkip(h.start), h._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(c), h._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), d = h, h = h.next;
  }
  for (h = n; ++m < l.length; )
    // Find a void token that includes a break.
    l[m][0] === "exit" && l[m - 1][0] === "enter" && l[m][1].type === l[m - 1][1].type && l[m][1].start.line !== l[m][1].end.line && (S = m + 1, N.push(S), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (o.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : N.pop(), m = N.length; m--; ) {
    const _ = l.slice(N[m], N[m + 1]), M = a.pop();
    s.push([M, M + _.length - 1]), e.splice(M, 2, _);
  }
  for (s.reverse(), m = -1; ++m < s.length; )
    u[y + s[m][0]] = y + s[m][1], y += s[m][1] - s[m][0] - 1;
  return u;
}
const ds = {
  resolve: ms,
  tokenize: gs
}, fs = {
  partial: !0,
  tokenize: Cs
};
function ms(e) {
  return aa(e), e;
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
    return l === null ? a(l) : j(l) ? e.check(fs, o, a)(l) : (e.consume(l), i);
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
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), ue(e, a, "linePrefix");
  }
  function a(o) {
    if (o === null || j(o))
      return n(o);
    const l = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function oa(e, t, n, r, i, a, o, l, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let c = 0;
  return d;
  function d(_) {
    return _ === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(_), e.exit(a), m) : _ === null || _ === 32 || _ === 41 || tr(_) ? n(_) : (e.enter(r), e.enter(o), e.enter(l), e.enter("chunkString", {
      contentType: "string"
    }), S(_));
  }
  function m(_) {
    return _ === 62 ? (e.enter(a), e.consume(_), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(l), e.enter("chunkString", {
      contentType: "string"
    }), h(_));
  }
  function h(_) {
    return _ === 62 ? (e.exit("chunkString"), e.exit(l), m(_)) : _ === null || _ === 60 || j(_) ? n(_) : (e.consume(_), _ === 92 ? y : h);
  }
  function y(_) {
    return _ === 60 || _ === 62 || _ === 92 ? (e.consume(_), h) : h(_);
  }
  function S(_) {
    return !c && (_ === null || _ === 41 || ze(_)) ? (e.exit("chunkString"), e.exit(l), e.exit(o), e.exit(r), t(_)) : c < u && _ === 40 ? (e.consume(_), c++, S) : _ === 41 ? (e.consume(_), c--, S) : _ === null || _ === 32 || _ === 40 || tr(_) ? n(_) : (e.consume(_), _ === 92 ? N : S);
  }
  function N(_) {
    return _ === 40 || _ === 41 || _ === 92 ? (e.consume(_), S) : S(_);
  }
}
function la(e, t, n, r, i, a) {
  const o = this;
  let l = 0, s;
  return u;
  function u(h) {
    return e.enter(r), e.enter(i), e.consume(h), e.exit(i), e.enter(a), c;
  }
  function c(h) {
    return l > 999 || h === null || h === 91 || h === 93 && !s || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === 94 && !l && "_hiddenFootnoteSupport" in o.parser.constructs ? n(h) : h === 93 ? (e.exit(a), e.enter(i), e.consume(h), e.exit(i), e.exit(r), t) : j(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), c) : (e.enter("chunkString", {
      contentType: "string"
    }), d(h));
  }
  function d(h) {
    return h === null || h === 91 || h === 93 || j(h) || l++ > 999 ? (e.exit("chunkString"), c(h)) : (e.consume(h), s || (s = !ie(h)), h === 92 ? m : d);
  }
  function m(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), l++, d) : d(h);
  }
}
function sa(e, t, n, r, i, a) {
  let o;
  return l;
  function l(m) {
    return m === 34 || m === 39 || m === 40 ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), o = m === 40 ? 41 : m, s) : n(m);
  }
  function s(m) {
    return m === o ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), t) : (e.enter(a), u(m));
  }
  function u(m) {
    return m === o ? (e.exit(a), s(o)) : m === null ? n(m) : j(m) ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), ue(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), c(m));
  }
  function c(m) {
    return m === o || m === null || j(m) ? (e.exit("chunkString"), u(m)) : (e.consume(m), m === 92 ? d : c);
  }
  function d(m) {
    return m === o || m === 92 ? (e.consume(m), c) : c(m);
  }
}
function Jt(e, t) {
  let n;
  return r;
  function r(i) {
    return j(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : ie(i) ? ue(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
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
    return la.call(
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
    return i = zt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), s) : n(h);
  }
  function s(h) {
    return ze(h) ? Jt(e, u)(h) : u(h);
  }
  function u(h) {
    return oa(
      e,
      c,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(h);
  }
  function c(h) {
    return e.attempt(ws, d, d)(h);
  }
  function d(h) {
    return ie(h) ? ue(e, m, "whitespace")(h) : m(h);
  }
  function m(h) {
    return h === null || j(h) ? (e.exit("definition"), r.parser.defined.push(i), t(h)) : n(h);
  }
}
function Ss(e, t, n) {
  return r;
  function r(l) {
    return ze(l) ? Jt(e, i)(l) : n(l);
  }
  function i(l) {
    return sa(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(l);
  }
  function a(l) {
    return ie(l) ? ue(e, o, "whitespace")(l) : o(l);
  }
  function o(l) {
    return l === null || j(l) ? t(l) : n(l);
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
    return j(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
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
  function i(c) {
    return e.enter("atxHeading"), a(c);
  }
  function a(c) {
    return e.enter("atxHeadingSequence"), o(c);
  }
  function o(c) {
    return c === 35 && r++ < 6 ? (e.consume(c), o) : c === null || ze(c) ? (e.exit("atxHeadingSequence"), l(c)) : n(c);
  }
  function l(c) {
    return c === 35 ? (e.enter("atxHeadingSequence"), s(c)) : c === null || j(c) ? (e.exit("atxHeading"), t(c)) : ie(c) ? ue(e, l, "whitespace")(c) : (e.enter("atxHeadingText"), u(c));
  }
  function s(c) {
    return c === 35 ? (e.consume(c), s) : (e.exit("atxHeadingSequence"), l(c));
  }
  function u(c) {
    return c === null || c === 35 || ze(c) ? (e.exit("atxHeadingText"), l(c)) : (e.consume(c), u);
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
], oi = ["pre", "script", "style", "textarea"], Rs = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: vs,
  tokenize: Ls
}, Is = {
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
  return u;
  function u(f) {
    return c(f);
  }
  function c(f) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(f), d;
  }
  function d(f) {
    return f === 33 ? (e.consume(f), m) : f === 47 ? (e.consume(f), a = !0, S) : f === 63 ? (e.consume(f), i = 3, r.interrupt ? t : g) : lt(f) ? (e.consume(f), o = String.fromCharCode(f), N) : n(f);
  }
  function m(f) {
    return f === 45 ? (e.consume(f), i = 2, h) : f === 91 ? (e.consume(f), i = 5, l = 0, y) : lt(f) ? (e.consume(f), i = 4, r.interrupt ? t : g) : n(f);
  }
  function h(f) {
    return f === 45 ? (e.consume(f), r.interrupt ? t : g) : n(f);
  }
  function y(f) {
    const ne = "CDATA[";
    return f === ne.charCodeAt(l++) ? (e.consume(f), l === ne.length ? r.interrupt ? t : v : y) : n(f);
  }
  function S(f) {
    return lt(f) ? (e.consume(f), o = String.fromCharCode(f), N) : n(f);
  }
  function N(f) {
    if (f === null || f === 47 || f === 62 || ze(f)) {
      const ne = f === 47, P = o.toLowerCase();
      return !ne && !a && oi.includes(P) ? (i = 1, r.interrupt ? t(f) : v(f)) : As.includes(o.toLowerCase()) ? (i = 6, ne ? (e.consume(f), _) : r.interrupt ? t(f) : v(f)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(f) : a ? M(f) : x(f));
    }
    return f === 45 || je(f) ? (e.consume(f), o += String.fromCharCode(f), N) : n(f);
  }
  function _(f) {
    return f === 62 ? (e.consume(f), r.interrupt ? t : v) : n(f);
  }
  function M(f) {
    return ie(f) ? (e.consume(f), M) : B(f);
  }
  function x(f) {
    return f === 47 ? (e.consume(f), B) : f === 58 || f === 95 || lt(f) ? (e.consume(f), L) : ie(f) ? (e.consume(f), x) : B(f);
  }
  function L(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || je(f) ? (e.consume(f), L) : z(f);
  }
  function z(f) {
    return f === 61 ? (e.consume(f), w) : ie(f) ? (e.consume(f), z) : x(f);
  }
  function w(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), s = f, H) : ie(f) ? (e.consume(f), w) : W(f);
  }
  function H(f) {
    return f === s ? (e.consume(f), s = null, G) : f === null || j(f) ? n(f) : (e.consume(f), H);
  }
  function W(f) {
    return f === null || f === 34 || f === 39 || f === 47 || f === 60 || f === 61 || f === 62 || f === 96 || ze(f) ? z(f) : (e.consume(f), W);
  }
  function G(f) {
    return f === 47 || f === 62 || ie(f) ? x(f) : n(f);
  }
  function B(f) {
    return f === 62 ? (e.consume(f), A) : n(f);
  }
  function A(f) {
    return f === null || j(f) ? v(f) : ie(f) ? (e.consume(f), A) : n(f);
  }
  function v(f) {
    return f === 45 && i === 2 ? (e.consume(f), J) : f === 60 && i === 1 ? (e.consume(f), q) : f === 62 && i === 4 ? (e.consume(f), Q) : f === 63 && i === 3 ? (e.consume(f), g) : f === 93 && i === 5 ? (e.consume(f), Ae) : j(f) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Is, we, Y)(f)) : f === null || j(f) ? (e.exit("htmlFlowData"), Y(f)) : (e.consume(f), v);
  }
  function Y(f) {
    return e.check(Ns, D, we)(f);
  }
  function D(f) {
    return e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), R;
  }
  function R(f) {
    return f === null || j(f) ? Y(f) : (e.enter("htmlFlowData"), v(f));
  }
  function J(f) {
    return f === 45 ? (e.consume(f), g) : v(f);
  }
  function q(f) {
    return f === 47 ? (e.consume(f), o = "", de) : v(f);
  }
  function de(f) {
    if (f === 62) {
      const ne = o.toLowerCase();
      return oi.includes(ne) ? (e.consume(f), Q) : v(f);
    }
    return lt(f) && o.length < 8 ? (e.consume(f), o += String.fromCharCode(f), de) : v(f);
  }
  function Ae(f) {
    return f === 93 ? (e.consume(f), g) : v(f);
  }
  function g(f) {
    return f === 62 ? (e.consume(f), Q) : f === 45 && i === 2 ? (e.consume(f), g) : v(f);
  }
  function Q(f) {
    return f === null || j(f) ? (e.exit("htmlFlowData"), we(f)) : (e.consume(f), Q);
  }
  function we(f) {
    return e.exit("htmlFlow"), t(f);
  }
}
function Ms(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return j(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), a) : n(o);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function Os(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(Tn, t, n);
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
  function l(g) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), s;
  }
  function s(g) {
    return g === 33 ? (e.consume(g), u) : g === 47 ? (e.consume(g), z) : g === 63 ? (e.consume(g), x) : lt(g) ? (e.consume(g), W) : n(g);
  }
  function u(g) {
    return g === 45 ? (e.consume(g), c) : g === 91 ? (e.consume(g), a = 0, y) : lt(g) ? (e.consume(g), M) : n(g);
  }
  function c(g) {
    return g === 45 ? (e.consume(g), h) : n(g);
  }
  function d(g) {
    return g === null ? n(g) : g === 45 ? (e.consume(g), m) : j(g) ? (o = d, q(g)) : (e.consume(g), d);
  }
  function m(g) {
    return g === 45 ? (e.consume(g), h) : d(g);
  }
  function h(g) {
    return g === 62 ? J(g) : g === 45 ? m(g) : d(g);
  }
  function y(g) {
    const Q = "CDATA[";
    return g === Q.charCodeAt(a++) ? (e.consume(g), a === Q.length ? S : y) : n(g);
  }
  function S(g) {
    return g === null ? n(g) : g === 93 ? (e.consume(g), N) : j(g) ? (o = S, q(g)) : (e.consume(g), S);
  }
  function N(g) {
    return g === 93 ? (e.consume(g), _) : S(g);
  }
  function _(g) {
    return g === 62 ? J(g) : g === 93 ? (e.consume(g), _) : S(g);
  }
  function M(g) {
    return g === null || g === 62 ? J(g) : j(g) ? (o = M, q(g)) : (e.consume(g), M);
  }
  function x(g) {
    return g === null ? n(g) : g === 63 ? (e.consume(g), L) : j(g) ? (o = x, q(g)) : (e.consume(g), x);
  }
  function L(g) {
    return g === 62 ? J(g) : x(g);
  }
  function z(g) {
    return lt(g) ? (e.consume(g), w) : n(g);
  }
  function w(g) {
    return g === 45 || je(g) ? (e.consume(g), w) : H(g);
  }
  function H(g) {
    return j(g) ? (o = H, q(g)) : ie(g) ? (e.consume(g), H) : J(g);
  }
  function W(g) {
    return g === 45 || je(g) ? (e.consume(g), W) : g === 47 || g === 62 || ze(g) ? G(g) : n(g);
  }
  function G(g) {
    return g === 47 ? (e.consume(g), J) : g === 58 || g === 95 || lt(g) ? (e.consume(g), B) : j(g) ? (o = G, q(g)) : ie(g) ? (e.consume(g), G) : J(g);
  }
  function B(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || je(g) ? (e.consume(g), B) : A(g);
  }
  function A(g) {
    return g === 61 ? (e.consume(g), v) : j(g) ? (o = A, q(g)) : ie(g) ? (e.consume(g), A) : G(g);
  }
  function v(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), i = g, Y) : j(g) ? (o = v, q(g)) : ie(g) ? (e.consume(g), v) : (e.consume(g), D);
  }
  function Y(g) {
    return g === i ? (e.consume(g), i = void 0, R) : g === null ? n(g) : j(g) ? (o = Y, q(g)) : (e.consume(g), Y);
  }
  function D(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? n(g) : g === 47 || g === 62 || ze(g) ? G(g) : (e.consume(g), D);
  }
  function R(g) {
    return g === 47 || g === 62 || ze(g) ? G(g) : n(g);
  }
  function J(g) {
    return g === 62 ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(g);
  }
  function q(g) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), de;
  }
  function de(g) {
    return ie(g) ? ue(e, Ae, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(g) : Ae(g);
  }
  function Ae(g) {
    return e.enter("htmlTextData"), o(g);
  }
}
const Cr = {
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
  }, u = {
    type: "label",
    start: {
      ...e[a][1].start
    },
    end: {
      ...e[o][1].end
    }
  }, c = {
    type: "labelText",
    start: {
      ...e[a + r + 2][1].end
    },
    end: {
      ...e[o - 2][1].start
    }
  };
  return l = [["enter", s, t], ["enter", u, t]], l = Xe(l, e.slice(a + 1, a + r + 3)), l = Xe(l, [["enter", c, t]]), l = Xe(l, gr(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t)), l = Xe(l, [["exit", c, t], e[o - 2], e[o - 1], ["exit", u, t]]), l = Xe(l, e.slice(o + 1)), l = Xe(l, [["exit", s, t]]), st(e, a, e.length, l), e;
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
  function l(m) {
    return a ? a._inactive ? d(m) : (o = r.parser.defined.includes(zt(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(m), e.exit("labelMarker"), e.exit("labelEnd"), s) : n(m);
  }
  function s(m) {
    return m === 40 ? e.attempt(Hs, c, o ? c : d)(m) : m === 91 ? e.attempt(Us, c, o ? u : d)(m) : o ? c(m) : d(m);
  }
  function u(m) {
    return e.attempt(Fs, c, d)(m);
  }
  function c(m) {
    return t(m);
  }
  function d(m) {
    return a._balanced = !0, n(m);
  }
}
function Vs(e, t, n) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), i;
  }
  function i(d) {
    return ze(d) ? Jt(e, a)(d) : a(d);
  }
  function a(d) {
    return d === 41 ? c(d) : oa(e, o, l, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function o(d) {
    return ze(d) ? Jt(e, s)(d) : c(d);
  }
  function l(d) {
    return n(d);
  }
  function s(d) {
    return d === 34 || d === 39 || d === 40 ? sa(e, u, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : c(d);
  }
  function u(d) {
    return ze(d) ? Jt(e, c)(d) : c(d);
  }
  function c(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), t) : n(d);
  }
}
function js(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return la.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(l);
  }
  function a(l) {
    return r.parser.defined.includes(zt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(l) : n(l);
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
  resolveAll: Cr.resolveAll,
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
  resolveAll: Cr.resolveAll,
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
const Un = {
  name: "lineEnding",
  tokenize: Ys
};
function Ys(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), ue(e, t, "linePrefix");
  }
}
const gn = {
  name: "thematicBreak",
  tokenize: Ks
};
function Ks(e, t, n) {
  let r = 0, i;
  return a;
  function a(u) {
    return e.enter("thematicBreak"), o(u);
  }
  function o(u) {
    return i = u, l(u);
  }
  function l(u) {
    return u === i ? (e.enter("thematicBreakSequence"), s(u)) : r >= 3 && (u === null || j(u)) ? (e.exit("thematicBreak"), t(u)) : n(u);
  }
  function s(u) {
    return u === i ? (e.consume(u), r++, s) : (e.exit("thematicBreakSequence"), ie(u) ? ue(e, l, "whitespace")(u) : l(u));
  }
}
const He = {
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
    if (y === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : nr(h)) {
      if (r.containerState.type || (r.containerState.type = y, e.enter(y, {
        _container: !0
      })), y === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(gn, n, u)(h) : u(h);
      if (!r.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(h);
    }
    return n(h);
  }
  function s(h) {
    return nr(h) && ++o < 10 ? (e.consume(h), s) : (!r.interrupt || o < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), u(h)) : n(h);
  }
  function u(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e.check(
      Tn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : c,
      e.attempt(Qs, m, d)
    );
  }
  function c(h) {
    return r.containerState.initialBlankLine = !0, a++, m(h);
  }
  function d(h) {
    return ie(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), m) : n(h);
  }
  function m(h) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(h);
  }
}
function t1(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Tn, i, a);
  function i(l) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, ue(e, t, "listItemIndent", r.containerState.size + 1)(l);
  }
  function a(l) {
    return r.containerState.furtherBlankLines || !ie(l) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(l)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Js, t, o)(l));
  }
  function o(l) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, ue(e, e.attempt(He, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l);
  }
}
function n1(e, t, n) {
  const r = this;
  return ue(e, i, "listItemIndent", r.containerState.size + 1);
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
  return ue(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const o = r.events[r.events.length - 1];
    return !ie(a) && o && o[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const li = {
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
  function a(u) {
    let c = r.events.length, d;
    for (; c--; )
      if (r.events[c][1].type !== "lineEnding" && r.events[c][1].type !== "linePrefix" && r.events[c][1].type !== "content") {
        d = r.events[c][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || d) ? (e.enter("setextHeadingLine"), i = u, o(u)) : n(u);
  }
  function o(u) {
    return e.enter("setextHeadingLineSequence"), l(u);
  }
  function l(u) {
    return u === i ? (e.consume(u), l) : (e.exit("setextHeadingLineSequence"), ie(u) ? ue(e, s, "lineSuffix")(u) : s(u));
  }
  function s(u) {
    return u === null || j(u) ? (e.exit("setextHeadingLine"), t(u)) : n(u);
  }
}
const l1 = {
  tokenize: s1
};
function s1(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    Tn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, ue(e, e.attempt(this.parser.constructs.flow, i, e.attempt(ds, i)), "linePrefix"))
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
const c1 = {
  resolveAll: ua()
}, u1 = ca("string"), h1 = ca("text");
function ca(e) {
  return {
    resolveAll: ua(e === "text" ? p1 : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], a = n.attempt(i, o, l);
    return o;
    function o(c) {
      return u(c) ? a(c) : l(c);
    }
    function l(c) {
      if (c === null) {
        n.consume(c);
        return;
      }
      return n.enter("data"), n.consume(c), s;
    }
    function s(c) {
      return u(c) ? (n.exit("data"), a(c)) : (n.consume(c), s);
    }
    function u(c) {
      if (c === null)
        return !0;
      const d = i[c];
      let m = -1;
      if (d)
        for (; ++m < d.length; ) {
          const h = d[m];
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
        const u = i[a];
        if (typeof u == "string") {
          for (o = u.length; u.charCodeAt(o - 1) === 32; )
            l++, o--;
          if (o) break;
          o = -1;
        } else if (u === -2)
          s = !0, l++;
        else if (u !== -1) {
          a++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (l = 0), l) {
        const u = {
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
          ...u.start
        }, r.start.offset === r.end.offset ? Object.assign(r, u) : (e.splice(n, 0, ["enter", u, t], ["exit", u, t]), n += 2);
      }
      n++;
    }
  return e;
}
const d1 = {
  42: He,
  43: He,
  45: He,
  48: He,
  49: He,
  50: He,
  51: He,
  52: He,
  53: He,
  54: He,
  55: He,
  56: He,
  57: He,
  62: na
}, f1 = {
  91: ys
}, m1 = {
  [-2]: Hn,
  [-1]: Hn,
  32: Hn
}, g1 = {
  35: Ts,
  42: gn,
  45: [li, gn],
  60: Rs,
  61: li,
  95: gn,
  96: ai,
  126: ai
}, C1 = {
  38: ia,
  92: ra
}, y1 = {
  [-5]: Un,
  [-4]: Un,
  [-3]: Un,
  33: Ws,
  38: ia,
  42: rr,
  60: [ql, Ds],
  91: qs,
  92: [_s, ra],
  93: Cr,
  95: rr,
  96: ls
}, w1 = {
  null: [rr, c1]
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
    attempt: H(z),
    check: H(w),
    consume: M,
    enter: x,
    exit: L,
    interrupt: H(w, {
      interrupt: !0
    })
  }, u = {
    code: null,
    containerState: {},
    defineSkip: S,
    events: [],
    now: y,
    parser: e,
    previous: null,
    sliceSerialize: m,
    sliceStream: h,
    write: d
  };
  let c = t.tokenize.call(u, s);
  return t.resolveAll && a.push(t), u;
  function d(A) {
    return o = Xe(o, A), N(), o[o.length - 1] !== null ? [] : (W(t, 0), u.events = gr(a, u.events, u), u.events);
  }
  function m(A, v) {
    return k1(h(A), v);
  }
  function h(A) {
    return T1(o, A);
  }
  function y() {
    const {
      _bufferIndex: A,
      _index: v,
      line: Y,
      column: D,
      offset: R
    } = r;
    return {
      _bufferIndex: A,
      _index: v,
      line: Y,
      column: D,
      offset: R
    };
  }
  function S(A) {
    i[A.line] = A.column, B();
  }
  function N() {
    let A;
    for (; r._index < o.length; ) {
      const v = o[r._index];
      if (typeof v == "string")
        for (A = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === A && r._bufferIndex < v.length; )
          _(v.charCodeAt(r._bufferIndex));
      else
        _(v);
    }
  }
  function _(A) {
    c = c(A);
  }
  function M(A) {
    j(A) ? (r.line++, r.column = 1, r.offset += A === -3 ? 2 : 1, B()) : A !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = A;
  }
  function x(A, v) {
    const Y = v || {};
    return Y.type = A, Y.start = y(), u.events.push(["enter", Y, u]), l.push(Y), Y;
  }
  function L(A) {
    const v = l.pop();
    return v.end = y(), u.events.push(["exit", v, u]), v;
  }
  function z(A, v) {
    W(A, v.from);
  }
  function w(A, v) {
    v.restore();
  }
  function H(A, v) {
    return Y;
    function Y(D, R, J) {
      let q, de, Ae, g;
      return Array.isArray(D) ? (
        /* c8 ignore next 1 */
        we(D)
      ) : "tokenize" in D ? (
        // Looks like a construct.
        we([
          /** @type {Construct} */
          D
        ])
      ) : Q(D);
      function Q(X) {
        return te;
        function te(he) {
          const ge = he !== null && X[he], Se = he !== null && X.null, ct = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(ge) ? ge : ge ? [ge] : [],
            ...Array.isArray(Se) ? Se : Se ? [Se] : []
          ];
          return we(ct)(he);
        }
      }
      function we(X) {
        return q = X, de = 0, X.length === 0 ? J : f(X[de]);
      }
      function f(X) {
        return te;
        function te(he) {
          return g = G(), Ae = X, X.partial || (u.currentConstruct = X), X.name && u.parser.constructs.disable.null.includes(X.name) ? P() : X.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            v ? Object.assign(Object.create(u), v) : u,
            s,
            ne,
            P
          )(he);
        }
      }
      function ne(X) {
        return A(Ae, g), R;
      }
      function P(X) {
        return g.restore(), ++de < q.length ? f(q[de]) : J;
      }
    }
  }
  function W(A, v) {
    A.resolveAll && !a.includes(A) && a.push(A), A.resolve && st(u.events, v, u.events.length - v, A.resolve(u.events.slice(v), u)), A.resolveTo && (u.events = A.resolveTo(u.events, u));
  }
  function G() {
    const A = y(), v = u.previous, Y = u.currentConstruct, D = u.events.length, R = Array.from(l);
    return {
      from: D,
      restore: J
    };
    function J() {
      r = A, u.previous = v, u.currentConstruct = Y, u.events.length = D, l = R, B();
    }
  }
  function B() {
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
    string: i(u1),
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
  for (; !aa(e); )
    ;
  return e;
}
const si = /[\0\t\n\r]/g;
function R1() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, o, l) {
    const s = [];
    let u, c, d, m, h;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(o || void 0).decode(a)), d = 0, t = "", n && (a.charCodeAt(0) === 65279 && d++, n = void 0); d < a.length; ) {
      if (si.lastIndex = d, u = si.exec(a), m = u && u.index !== void 0 ? u.index : a.length, h = a.charCodeAt(m), !u) {
        t = a.slice(d);
        break;
      }
      if (h === 10 && d === m && r)
        s.push(-3), r = void 0;
      else
        switch (r && (s.push(-5), r = void 0), d < m && (s.push(a.slice(d, m)), e += m - d), h) {
          case 0: {
            s.push(65533), e++;
            break;
          }
          case 9: {
            for (c = Math.ceil(e / 4) * 4, s.push(-2); e++ < c; ) s.push(-1);
            break;
          }
          case 10: {
            s.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      d = m + 1;
    }
    return l && (r && s.push(-5), t && s.push(t), s.push(null)), s;
  }
}
const I1 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function N1(e) {
  return e.replace(I1, v1);
}
function v1(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return ta(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return mr(n) || e;
}
const ha = {}.hasOwnProperty;
function L1(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), M1(n)(A1(b1(n).document().write(R1()(e, t, !0))));
}
function M1(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(ut),
      autolinkProtocol: G,
      autolinkEmail: G,
      atxHeading: a(Ge),
      blockQuote: a(Se),
      characterEscape: G,
      characterReference: G,
      codeFenced: a(ct),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: a(ct, o),
      codeText: a(At, o),
      codeTextData: G,
      data: G,
      codeFlowValue: G,
      definition: a(rt),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: a(yt),
      hardBreakEscape: a(wt),
      hardBreakTrailing: a(wt),
      htmlFlow: a(Et, o),
      htmlFlowData: G,
      htmlText: a(Et, o),
      htmlTextData: G,
      image: a($e),
      label: o,
      link: a(ut),
      listItem: a(Rt),
      listItemValue: m,
      listOrdered: a(ht, d),
      listUnordered: a(ht),
      paragraph: a(Ot),
      reference: f,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: a(Ge),
      strong: a(Dt),
      thematicBreak: a(pt)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: z,
      autolink: s(),
      autolinkEmail: ge,
      autolinkProtocol: he,
      blockQuote: s(),
      characterEscapeValue: B,
      characterReferenceMarkerHexadecimal: P,
      characterReferenceMarkerNumeric: P,
      characterReferenceValue: X,
      characterReference: te,
      codeFenced: s(N),
      codeFencedFence: S,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: y,
      codeFlowValue: B,
      codeIndented: s(_),
      codeText: s(R),
      codeTextData: B,
      data: B,
      definition: s(),
      definitionDestinationString: L,
      definitionLabelString: M,
      definitionTitleString: x,
      emphasis: s(),
      hardBreakEscape: s(v),
      hardBreakTrailing: s(v),
      htmlFlow: s(Y),
      htmlFlowData: B,
      htmlText: s(D),
      htmlTextData: B,
      image: s(q),
      label: Ae,
      labelText: de,
      lineEnding: A,
      link: s(J),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: ne,
      resourceDestinationString: g,
      resourceTitleString: Q,
      resource: we,
      setextHeading: s(W),
      setextHeadingLineSequence: H,
      setextHeadingText: w,
      strong: s(),
      thematicBreak: s()
    }
  };
  pa(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(E) {
    let b = {
      type: "root",
      children: []
    };
    const F = {
      stack: [b],
      tokenStack: [],
      config: t,
      enter: l,
      exit: u,
      buffer: o,
      resume: c,
      data: n
    }, $ = [];
    let re = -1;
    for (; ++re < E.length; )
      if (E[re][1].type === "listOrdered" || E[re][1].type === "listUnordered")
        if (E[re][0] === "enter")
          $.push(re);
        else {
          const _e = $.pop();
          re = i(E, _e, re);
        }
    for (re = -1; ++re < E.length; ) {
      const _e = t[E[re][0]];
      ha.call(_e, E[re][1].type) && _e[E[re][1].type].call(Object.assign({
        sliceSerialize: E[re][2].sliceSerialize
      }, F), E[re][1]);
    }
    if (F.tokenStack.length > 0) {
      const _e = F.tokenStack[F.tokenStack.length - 1];
      (_e[1] || ci).call(F, void 0, _e[0]);
    }
    for (b.position = {
      start: _t(E.length > 0 ? E[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: _t(E.length > 0 ? E[E.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, re = -1; ++re < t.transforms.length; )
      b = t.transforms[re](b) || b;
    return b;
  }
  function i(E, b, F) {
    let $ = b - 1, re = -1, _e = !1, We, xe, Ze, Te;
    for (; ++$ <= F; ) {
      const me = E[$];
      switch (me[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          me[0] === "enter" ? re++ : re--, Te = void 0;
          break;
        }
        case "lineEndingBlank": {
          me[0] === "enter" && (We && !Te && !re && !Ze && (Ze = $), Te = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Te = void 0;
      }
      if (!re && me[0] === "enter" && me[1].type === "listItemPrefix" || re === -1 && me[0] === "exit" && (me[1].type === "listUnordered" || me[1].type === "listOrdered")) {
        if (We) {
          let qe = $;
          for (xe = void 0; qe--; ) {
            const ve = E[qe];
            if (ve[1].type === "lineEnding" || ve[1].type === "lineEndingBlank") {
              if (ve[0] === "exit") continue;
              xe && (E[xe][1].type = "lineEndingBlank", _e = !0), ve[1].type = "lineEnding", xe = qe;
            } else if (!(ve[1].type === "linePrefix" || ve[1].type === "blockQuotePrefix" || ve[1].type === "blockQuotePrefixWhitespace" || ve[1].type === "blockQuoteMarker" || ve[1].type === "listItemIndent")) break;
          }
          Ze && (!xe || Ze < xe) && (We._spread = !0), We.end = Object.assign({}, xe ? E[xe][1].start : me[1].end), E.splice(xe || $, 0, ["exit", We, me[2]]), $++, F++;
        }
        if (me[1].type === "listItemPrefix") {
          const qe = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, me[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          We = qe, E.splice($, 0, ["enter", qe, me[2]]), $++, F++, Ze = void 0, Te = !0;
        }
      }
    }
    return E[b][1]._spread = _e, F;
  }
  function a(E, b) {
    return F;
    function F($) {
      l.call(this, E($), $), b && b.call(this, $);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function l(E, b, F) {
    this.stack[this.stack.length - 1].children.push(E), this.stack.push(E), this.tokenStack.push([b, F || void 0]), E.position = {
      start: _t(b.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(E) {
    return b;
    function b(F) {
      E && E.call(this, F), u.call(this, F);
    }
  }
  function u(E, b) {
    const F = this.stack.pop(), $ = this.tokenStack.pop();
    if ($)
      $[0].type !== E.type && (b ? b.call(this, E, $[0]) : ($[1] || ci).call(this, E, $[0]));
    else throw new Error("Cannot close `" + E.type + "` (" + Qt({
      start: E.start,
      end: E.end
    }) + "): it’s not open");
    F.position.end = _t(E.end);
  }
  function c() {
    return vl(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(E) {
    if (this.data.expectingFirstListItemValue) {
      const b = this.stack[this.stack.length - 2];
      b.start = Number.parseInt(this.sliceSerialize(E), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.lang = E;
  }
  function y() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.meta = E;
  }
  function S() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function N() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function _() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = E.replace(/(\r?\n|\r)$/g, "");
  }
  function M(E) {
    const b = this.resume(), F = this.stack[this.stack.length - 1];
    F.label = b, F.identifier = zt(this.sliceSerialize(E)).toLowerCase();
  }
  function x() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.title = E;
  }
  function L() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.url = E;
  }
  function z(E) {
    const b = this.stack[this.stack.length - 1];
    if (!b.depth) {
      const F = this.sliceSerialize(E).length;
      b.depth = F;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function H(E) {
    const b = this.stack[this.stack.length - 1];
    b.depth = this.sliceSerialize(E).codePointAt(0) === 61 ? 1 : 2;
  }
  function W() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function G(E) {
    const F = this.stack[this.stack.length - 1].children;
    let $ = F[F.length - 1];
    (!$ || $.type !== "text") && ($ = it(), $.position = {
      start: _t(E.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, F.push($)), this.stack.push($);
  }
  function B(E) {
    const b = this.stack.pop();
    b.value += this.sliceSerialize(E), b.position.end = _t(E.end);
  }
  function A(E) {
    const b = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const F = b.children[b.children.length - 1];
      F.position.end = _t(E.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(b.type) && (G.call(this, E), B.call(this, E));
  }
  function v() {
    this.data.atHardBreak = !0;
  }
  function Y() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = E;
  }
  function D() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = E;
  }
  function R() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = E;
  }
  function J() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const b = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = b, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function q() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const b = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = b, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function de(E) {
    const b = this.sliceSerialize(E), F = this.stack[this.stack.length - 2];
    F.label = N1(b), F.identifier = zt(b).toLowerCase();
  }
  function Ae() {
    const E = this.stack[this.stack.length - 1], b = this.resume(), F = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, F.type === "link") {
      const $ = E.children;
      F.children = $;
    } else
      F.alt = b;
  }
  function g() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.url = E;
  }
  function Q() {
    const E = this.resume(), b = this.stack[this.stack.length - 1];
    b.title = E;
  }
  function we() {
    this.data.inReference = void 0;
  }
  function f() {
    this.data.referenceType = "collapsed";
  }
  function ne(E) {
    const b = this.resume(), F = this.stack[this.stack.length - 1];
    F.label = b, F.identifier = zt(this.sliceSerialize(E)).toLowerCase(), this.data.referenceType = "full";
  }
  function P(E) {
    this.data.characterReferenceType = E.type;
  }
  function X(E) {
    const b = this.sliceSerialize(E), F = this.data.characterReferenceType;
    let $;
    F ? ($ = ta(b, F === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : $ = mr(b);
    const re = this.stack[this.stack.length - 1];
    re.value += $;
  }
  function te(E) {
    const b = this.stack.pop();
    b.position.end = _t(E.end);
  }
  function he(E) {
    B.call(this, E);
    const b = this.stack[this.stack.length - 1];
    b.url = this.sliceSerialize(E);
  }
  function ge(E) {
    B.call(this, E);
    const b = this.stack[this.stack.length - 1];
    b.url = "mailto:" + this.sliceSerialize(E);
  }
  function Se() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function ct() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function At() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function rt() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function yt() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Ge() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function wt() {
    return {
      type: "break"
    };
  }
  function Et() {
    return {
      type: "html",
      value: ""
    };
  }
  function $e() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function ut() {
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
  function Rt(E) {
    return {
      type: "listItem",
      spread: E._spread,
      checked: null,
      children: []
    };
  }
  function Ot() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Dt() {
    return {
      type: "strong",
      children: []
    };
  }
  function it() {
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
function _t(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function pa(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? pa(e, r) : O1(e, r);
  }
}
function O1(e, t) {
  let n;
  for (n in t)
    if (ha.call(t, n))
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
function ci(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Qt({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Qt({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Qt({
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
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Vt(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
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
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [s]
  };
  return e.patch(t, u), e.applyData(t, u);
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
function da(e, t) {
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
    return da(e, t);
  const i = { src: Vt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function $1(e, t) {
  const n = { src: Vt(t.url) };
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
    return da(e, t);
  const i = { href: Vt(r.url || "") };
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
  const n = { href: Vt(t.url) };
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
  const r = e.all(t), i = n ? Y1(n) : fa(t), a = {}, o = [];
  if (typeof t.checked == "boolean") {
    const c = r[0];
    let d;
    c && c.type === "element" && c.tagName === "p" ? d = c : (d = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(d)), d.children.length > 0 && d.children.unshift({ type: "text", value: " " }), d.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), a.className = ["task-list-item"];
  }
  let l = -1;
  for (; ++l < r.length; ) {
    const c = r[l];
    (i || l !== 0 || c.type !== "element" || c.tagName !== "p") && o.push({ type: "text", value: `
` }), c.type === "element" && c.tagName === "p" && !i ? o.push(...c.children) : o.push(c);
  }
  const s = r[r.length - 1];
  s && (i || s.type !== "element" || s.tagName !== "p") && o.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: a, children: o };
  return e.patch(t, u), e.applyData(t, u);
}
function Y1(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = fa(n[r]);
  }
  return t;
}
function fa(e) {
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
function ec(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function tc(e, t) {
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
    }, l = hr(t.children[1]), s = qi(t.children[t.children.length - 1]);
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
function nc(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, l = o ? o.length : t.children.length;
  let s = -1;
  const u = [];
  for (; ++s < l; ) {
    const d = t.children[s], m = {}, h = o ? o[s] : void 0;
    h && (m.align = h);
    let y = { type: "element", tagName: a, properties: m, children: [] };
    d && (y.children = e.all(d), e.patch(d, y), y = e.applyData(d, y)), u.push(y);
  }
  const c = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(t, c), e.applyData(t, c);
}
function rc(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const ui = 9, hi = 32;
function ic(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const a = [];
  for (; r; )
    a.push(
      pi(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return a.push(pi(t.slice(i), i > 0, !1)), a.join("");
}
function pi(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let a = e.codePointAt(r);
    for (; a === ui || a === hi; )
      r++, a = e.codePointAt(r);
  }
  if (n) {
    let a = e.codePointAt(i - 1);
    for (; a === ui || a === hi; )
      i--, a = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function ac(e, t) {
  const n = { type: "text", value: ic(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function oc(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const lc = {
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
  strong: ec,
  table: tc,
  tableCell: rc,
  tableRow: nc,
  text: ac,
  thematicBreak: oc,
  toml: hn,
  yaml: hn,
  definition: hn,
  footnoteDefinition: hn
};
function hn() {
}
const ma = -1, kn = 0, en = 1, En = 2, yr = 3, wr = 4, Er = 5, Sr = 6, ga = 7, Ca = 8, di = typeof self == "object" ? self : globalThis, sc = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, o] = t[i];
    switch (a) {
      case kn:
      case ma:
        return n(o, i);
      case en: {
        const l = n([], i);
        for (const s of o)
          l.push(r(s));
        return l;
      }
      case En: {
        const l = n({}, i);
        for (const [s, u] of o)
          l[r(s)] = r(u);
        return l;
      }
      case yr:
        return n(new Date(o), i);
      case wr: {
        const { source: l, flags: s } = o;
        return n(new RegExp(l, s), i);
      }
      case Er: {
        const l = n(/* @__PURE__ */ new Map(), i);
        for (const [s, u] of o)
          l.set(r(s), r(u));
        return l;
      }
      case Sr: {
        const l = n(/* @__PURE__ */ new Set(), i);
        for (const s of o)
          l.add(r(s));
        return l;
      }
      case ga: {
        const { name: l, message: s } = o;
        return n(new di[l](s), i);
      }
      case Ca:
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
    return n(new di[a](o), i);
  };
  return r;
}, fi = (e) => sc(/* @__PURE__ */ new Map(), e)(0), Ht = "", { toString: cc } = {}, { keys: uc } = Object, Kt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [kn, t];
  const n = cc.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [en, Ht];
    case "Object":
      return [En, Ht];
    case "Date":
      return [yr, Ht];
    case "RegExp":
      return [wr, Ht];
    case "Map":
      return [Er, Ht];
    case "Set":
      return [Sr, Ht];
    case "DataView":
      return [en, n];
  }
  return n.includes("Array") ? [en, n] : n.includes("Error") ? [ga, n] : [En, n];
}, pn = ([e, t]) => e === kn && (t === "function" || t === "symbol"), hc = (e, t, n, r) => {
  const i = (o, l) => {
    const s = r.push(o) - 1;
    return n.set(l, s), s;
  }, a = (o) => {
    if (n.has(o))
      return n.get(o);
    let [l, s] = Kt(o);
    switch (l) {
      case kn: {
        let c = o;
        switch (s) {
          case "bigint":
            l = Ca, c = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            c = null;
            break;
          case "undefined":
            return i([ma], o);
        }
        return i([l, c], o);
      }
      case en: {
        if (s) {
          let m = o;
          return s === "DataView" ? m = new Uint8Array(o.buffer) : s === "ArrayBuffer" && (m = new Uint8Array(o)), i([s, [...m]], o);
        }
        const c = [], d = i([l, c], o);
        for (const m of o)
          c.push(a(m));
        return d;
      }
      case En: {
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
        const c = [], d = i([l, c], o);
        for (const m of uc(o))
          (e || !pn(Kt(o[m]))) && c.push([a(m), a(o[m])]);
        return d;
      }
      case yr:
        return i([l, o.toISOString()], o);
      case wr: {
        const { source: c, flags: d } = o;
        return i([l, { source: c, flags: d }], o);
      }
      case Er: {
        const c = [], d = i([l, c], o);
        for (const [m, h] of o)
          (e || !(pn(Kt(m)) || pn(Kt(h)))) && c.push([a(m), a(h)]);
        return d;
      }
      case Sr: {
        const c = [], d = i([l, c], o);
        for (const m of o)
          (e || !pn(Kt(m))) && c.push(a(m));
        return d;
      }
    }
    const { message: u } = o;
    return i([l, { name: s, message: u }], o);
  };
  return a;
}, mi = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return hc(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, Sn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? fi(mi(e, t)) : structuredClone(e)
) : (e, t) => fi(mi(e, t));
function pc(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function dc(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function fc(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || pc, r = e.options.footnoteBackLabel || dc, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, l = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!u)
      continue;
    const c = e.all(u), d = String(u.identifier).toUpperCase(), m = Vt(d.toLowerCase());
    let h = 0;
    const y = [], S = e.footnoteCounts.get(d);
    for (; S !== void 0 && ++h <= S; ) {
      y.length > 0 && y.push({ type: "text", value: " " });
      let M = typeof n == "string" ? n : n(s, h);
      typeof M == "string" && (M = { type: "text", value: M }), y.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + m + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(M) ? M : [M]
      });
    }
    const N = c[c.length - 1];
    if (N && N.type === "element" && N.tagName === "p") {
      const M = N.children[N.children.length - 1];
      M && M.type === "text" ? M.value += " " : N.children.push({ type: "text", value: " " }), N.children.push(...y);
    } else
      c.push(...y);
    const _ = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + m },
      children: e.wrap(c, !0)
    };
    e.patch(u, _), l.push(_);
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
            ...Sn(o),
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
const ya = (
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
      return yc;
    if (typeof e == "function")
      return bn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? mc(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        gc(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return Cc(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function mc(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = ya(e[n]);
  return bn(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function gc(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return bn(n);
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
function Cc(e) {
  return bn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function bn(e) {
  return t;
  function t(n, r, i) {
    return !!(wc(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function yc() {
  return !0;
}
function wc(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const wa = [], Ec = !0, gi = !1, Sc = "skip";
function _c(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = ya(i), o = r ? -1 : 1;
  l(e, void 0, [])();
  function l(s, u, c) {
    const d = (
      /** @type {Record<string, unknown>} */
      s && typeof s == "object" ? s : {}
    );
    if (typeof d.type == "string") {
      const h = (
        // `hast`
        typeof d.tagName == "string" ? d.tagName : (
          // `xast`
          typeof d.name == "string" ? d.name : void 0
        )
      );
      Object.defineProperty(m, "name", {
        value: "node (" + (s.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return m;
    function m() {
      let h = wa, y, S, N;
      if ((!t || a(s, u, c[c.length - 1] || void 0)) && (h = xc(n(s, c)), h[0] === gi))
        return h;
      if ("children" in s && s.children) {
        const _ = (
          /** @type {UnistParent} */
          s
        );
        if (_.children && h[0] !== Sc)
          for (S = (r ? _.children.length : -1) + o, N = c.concat(_); S > -1 && S < _.children.length; ) {
            const M = _.children[S];
            if (y = l(M, S, N)(), y[0] === gi)
              return y;
            S = typeof y[1] == "number" ? y[1] : S + o;
          }
      }
      return h;
    }
  }
}
function xc(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Ec, e] : e == null ? wa : [e];
}
function Ea(e, t, n, r) {
  let i, a, o;
  typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), _c(e, a, l, i);
  function l(s, u) {
    const c = u[u.length - 1], d = c ? c.children.indexOf(s) : void 0;
    return o(s, d, c);
  }
}
const ir = {}.hasOwnProperty, Tc = {};
function kc(e, t) {
  const n = t || Tc, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = { ...lc, ...n.handlers }, l = {
    all: u,
    applyData: Ac,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: o,
    one: s,
    options: n,
    patch: bc,
    wrap: Ic
  };
  return Ea(e, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const d = c.type === "definition" ? r : i, m = String(c.identifier).toUpperCase();
      d.has(m) || d.set(m, c);
    }
  }), l;
  function s(c, d) {
    const m = c.type, h = l.handlers[m];
    if (ir.call(l.handlers, m) && h)
      return h(l, c, d);
    if (l.options.passThrough && l.options.passThrough.includes(m)) {
      if ("children" in c) {
        const { children: S, ...N } = c, _ = Sn(N);
        return _.children = l.all(c), _;
      }
      return Sn(c);
    }
    return (l.options.unknownHandler || Rc)(l, c, d);
  }
  function u(c) {
    const d = [];
    if ("children" in c) {
      const m = c.children;
      let h = -1;
      for (; ++h < m.length; ) {
        const y = l.one(m[h], c);
        if (y) {
          if (h && m[h - 1].type === "break" && (!Array.isArray(y) && y.type === "text" && (y.value = Ci(y.value)), !Array.isArray(y) && y.type === "element")) {
            const S = y.children[0];
            S && S.type === "text" && (S.value = Ci(S.value));
          }
          Array.isArray(y) ? d.push(...y) : d.push(y);
        }
      }
    }
    return d;
  }
}
function bc(e, t) {
  e.position && (t.position = cl(e));
}
function Ac(e, t) {
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
    n.type === "element" && a && Object.assign(n.properties, Sn(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function Rc(e, t) {
  const n = t.data || {}, r = "value" in t && !(ir.call(n, "hProperties") || ir.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Ic(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Ci(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function yi(e, t) {
  const n = kc(e, t), r = n.one(e, void 0), i = fc(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function Nc(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      yi(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      yi(n, { file: r, ...e || t })
    );
  };
}
function wi(e) {
  if (e)
    throw e;
}
var Cn = Object.prototype.hasOwnProperty, Sa = Object.prototype.toString, Ei = Object.defineProperty, Si = Object.getOwnPropertyDescriptor, _i = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : Sa.call(t) === "[object Array]";
}, xi = function(t) {
  if (!t || Sa.call(t) !== "[object Object]")
    return !1;
  var n = Cn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && Cn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || Cn.call(t, i);
}, Ti = function(t, n) {
  Ei && n.name === "__proto__" ? Ei(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, ki = function(t, n) {
  if (n === "__proto__")
    if (Cn.call(t, n)) {
      if (Si)
        return Si(t, n).value;
    } else return;
  return t[n];
}, vc = function e() {
  var t, n, r, i, a, o, l = arguments[0], s = 1, u = arguments.length, c = !1;
  for (typeof l == "boolean" && (c = l, l = arguments[1] || {}, s = 2), (l == null || typeof l != "object" && typeof l != "function") && (l = {}); s < u; ++s)
    if (t = arguments[s], t != null)
      for (n in t)
        r = ki(l, n), i = ki(t, n), l !== i && (c && i && (xi(i) || (a = _i(i))) ? (a ? (a = !1, o = r && _i(r) ? r : []) : o = r && xi(r) ? r : {}, Ti(l, { name: n, newValue: e(c, o, i) })) : typeof i < "u" && Ti(l, { name: n, newValue: i }));
  return l;
};
const Fn = /* @__PURE__ */ Zi(vc);
function ar(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Lc() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let a = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    l(null, ...i);
    function l(s, ...u) {
      const c = e[++a];
      let d = -1;
      if (s) {
        o(s);
        return;
      }
      for (; ++d < i.length; )
        (u[d] === null || u[d] === void 0) && (u[d] = i[d]);
      i = u, c ? Mc(c, l)(...u) : o(null, ...u);
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
function Mc(e, t) {
  let n;
  return r;
  function r(...o) {
    const l = e.length > o.length;
    let s;
    l && o.push(i);
    try {
      s = e.apply(this, o);
    } catch (u) {
      const c = (
        /** @type {Error} */
        u
      );
      if (l && n)
        throw c;
      return i(c);
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
const ot = { basename: Oc, dirname: Dc, extname: Pc, join: Hc, sep: "/" };
function Oc(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  an(e);
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
function Dc(e) {
  if (an(e), e.length === 0)
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
function Pc(e) {
  an(e);
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
function Hc(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    an(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : Uc(n);
}
function Uc(e) {
  an(e);
  const t = e.codePointAt(0) === 47;
  let n = Fc(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function Fc(e, t) {
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
function an(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const zc = { cwd: Bc };
function Bc() {
  return "/";
}
function or(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Gc(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!or(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return Vc(e);
}
function Vc(e) {
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
const zn = (
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
class _a {
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
    t ? or(t) ? n = { path: t } : typeof t == "string" || jc(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : zc.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < zn.length; ) {
      const a = zn[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      zn.includes(i) || (this[i] = n[i]);
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
    Gn(t, "basename"), Bn(t, "basename"), this.path = ot.join(this.dirname || "", t);
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
    bi(this.basename, "dirname"), this.path = ot.join(t || "", this.basename);
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
    if (Bn(t, "extname"), bi(this.dirname, "extname"), t) {
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
    or(t) && (t = Gc(t)), Gn(t, "path"), this.path !== t && this.history.push(t);
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
    Gn(t, "stem"), Bn(t, "stem"), this.path = ot.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new Ne(
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
function Bn(e, t) {
  if (e && e.includes(ot.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ot.sep + "`"
    );
}
function Gn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function bi(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function jc(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const $c = (
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
), Wc = {}.hasOwnProperty;
class _r extends $c {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Lc();
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
      new _r()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Fn(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? ($n("data", this.frozen), this.namespace[t] = n, this) : Wc.call(this.namespace, t) && this.namespace[t] || void 0 : t ? ($n("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = dn(t), r = this.parser || this.Parser;
    return Vn("parse", r), r(String(n), n);
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
    return this.freeze(), Vn("process", this.parser || this.Parser), jn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, o) {
      const l = dn(t), s = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(l)
      );
      r.run(s, l, function(c, d, m) {
        if (c || !d || !m)
          return u(c);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          d
        ), y = r.stringify(h, m);
        Xc(y) ? m.value = y : m.result = y, u(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          m
        );
      });
      function u(c, d) {
        c || !d ? o(c) : a ? a(d) : n(void 0, d);
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
    return this.freeze(), Vn("processSync", this.parser || this.Parser), jn("processSync", this.compiler || this.Compiler), this.process(t, i), Ri("processSync", "process", n), r;
    function i(a, o) {
      n = !0, wi(a), r = o;
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
    Ai(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(o, l) {
      const s = dn(n);
      i.run(t, s, u);
      function u(c, d, m) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          d || t
        );
        c ? l(c) : o ? o(h) : r(void 0, h, m);
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
    return this.run(t, n, a), Ri("runSync", "run", r), i;
    function a(o, l) {
      wi(o), i = l, r = !0;
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
    const r = dn(n), i = this.compiler || this.Compiler;
    return jn("stringify", i), Ai(t), i(t, r);
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
    if ($n("use", this.frozen), t != null) if (typeof t == "function")
      s(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? l(t) : o(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function a(u) {
      if (typeof u == "function")
        s(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [c, ...d] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          s(c, d);
        } else
          o(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function o(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      l(u.plugins), u.settings && (i.settings = Fn(!0, i.settings, u.settings));
    }
    function l(u) {
      let c = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++c < u.length; ) {
          const d = u[c];
          a(d);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function s(u, c) {
      let d = -1, m = -1;
      for (; ++d < r.length; )
        if (r[d][0] === u) {
          m = d;
          break;
        }
      if (m === -1)
        r.push([u, ...c]);
      else if (c.length > 0) {
        let [h, ...y] = c;
        const S = r[m][1];
        ar(S) && ar(h) && (h = Fn(!0, S, h)), r[m] = [u, h, ...y];
      }
    }
  }
}
const Zc = new _r().freeze();
function Vn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function jn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function $n(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Ai(e) {
  if (!ar(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Ri(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function dn(e) {
  return qc(e) ? e : new _a(e);
}
function qc(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Xc(e) {
  return typeof e == "string" || Yc(e);
}
function Yc(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Kc = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Ii = [], Ni = { allowDangerousHtml: !0 }, Qc = /^(https?|ircs?|mailto|xmpp)$/i, Jc = [
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
function vi(e) {
  const t = eu(e), n = tu(e);
  return nu(t.runSync(t.parse(n), n), e);
}
function eu(e) {
  const t = e.rehypePlugins || Ii, n = e.remarkPlugins || Ii, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Ni } : Ni;
  return Zc().use(D1).use(n).use(Nc, r).use(t);
}
function tu(e) {
  const t = e.children || "", n = new _a();
  return typeof t == "string" && (n.value = t), n;
}
function nu(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, l = t.unwrapDisallowed, s = t.urlTransform || ru;
  for (const c of Jc)
    Object.hasOwn(t, c.from) && ("" + c.from + (c.to ? "use `" + c.to + "` instead" : "remove it") + Kc + c.id, void 0);
  return Ea(e, u), fl(e, {
    Fragment: tn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: p,
    jsxs: I,
    passKeys: !0,
    passNode: !0
  });
  function u(c, d, m) {
    if (c.type === "raw" && m && typeof d == "number")
      return o ? m.children.splice(d, 1) : m.children[d] = { type: "text", value: c.value }, d;
    if (c.type === "element") {
      let h;
      for (h in Pn)
        if (Object.hasOwn(Pn, h) && Object.hasOwn(c.properties, h)) {
          const y = c.properties[h], S = Pn[h];
          (S === null || S.includes(c.tagName)) && (c.properties[h] = s(String(y || ""), h, c));
        }
    }
    if (c.type === "element") {
      let h = n ? !n.includes(c.tagName) : a ? a.includes(c.tagName) : !1;
      if (!h && r && typeof d == "number" && (h = !r(c, d, m)), h && m && typeof d == "number")
        return l && c.children ? m.children.splice(d, 1, ...c.children) : m.children.splice(d, 1), d;
    }
  }
}
function ru(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    Qc.test(e.slice(0, t)) ? e : ""
  );
}
const V = {
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
}, Ee = {
  isThinkingMessage: (e) => e.startsWith(V.THINKING_PREFIX) || e.startsWith(V.REASONING_PREFIX) || e.startsWith(V.THOUGHT_PREFIX),
  isCompletedMessage: (e) => e.includes(V.COMPLETED_MARKER),
  isErrorMessage: (e) => e.includes(V.ERROR_MARKER),
  isHandlingMessage: (e) => e.includes(V.HANDLING_MARKER),
  extractDuration: (e) => {
    const t = e.match(V.PATTERNS.DURATION);
    return t ? ` for ${t[1]} seconds` : void 0;
  },
  cleanReasoningContent: (e) => {
    let t = e.replace(new RegExp(`^${V.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${V.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${V.THOUGHT_PREFIX}\\s*`), "");
    return t = t.replace(/\s*for [\d.]+\s*seconds$/, ""), t = t.replace(V.PATTERNS.THOUGHT_CONTENT, ""), t.trim();
  },
  getMessageType: (e, t) => t === !1 ? Ee.isErrorMessage(e) ? V.MESSAGE_TYPES.ERROR : (Ee.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || Ee.isThinkingMessage(e), V.MESSAGE_TYPES.THOUGHT) : Ee.isCompletedMessage(e) ? V.MESSAGE_TYPES.COMPLETED : Ee.isErrorMessage(e) ? V.MESSAGE_TYPES.ERROR : (Ee.isHandlingMessage(e) || Ee.isThinkingMessage(e) && !e.includes(V.UI_TEXT.AI_IS_THINKING), V.MESSAGE_TYPES.THINKING)
};
function iu({ children: e, isStreaming: t }) {
  const [n, r] = ee(!0), [i, a] = ee(!1);
  Ut.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const o = () => {
    t || r(!n);
  }, l = Ut.Children.map(e, (s) => {
    if (Ut.isValidElement(s)) {
      if (s.type === xa)
        return Ut.cloneElement(
          s,
          {
            onToggle: o,
            isExpanded: n
          }
        );
      if (s.type === Ta)
        return Ut.cloneElement(
          s,
          {
            isVisible: n
          }
        );
    }
    return s;
  });
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning", children: l });
}
function xa({
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
        /* @__PURE__ */ p(
          "mask",
          {
            id: "mask0_64_36210",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "16",
            height: "16",
            children: /* @__PURE__ */ p("rect", { width: "16", height: "16", fill: "#D9D9D9" })
          }
        ),
        /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36210)", children: /* @__PURE__ */ p(
          "path",
          {
            d: "M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z",
            fill: "#637381"
          }
        ) })
      ]
    }
  ), o = t === "completed" || e.includes(V.UI_TEXT.THINKING) || e.includes(V.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ I(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${o ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: o ? r : void 0,
      style: { cursor: o ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ I("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ p("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        o && /* @__PURE__ */ p(
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
                  /* @__PURE__ */ p(
                    "mask",
                    {
                      id: "mask0_44_18068",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ p("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ p("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ p(
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
function Ta({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function au({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function ou({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var s, u;
  console.log("clog toolData", n);
  const a = () => {
    if (!r || !i) return null;
    const c = i.find((d) => d.name === r);
    return (c == null ? void 0 : c.description) || null;
  };
  let o;
  if (r != null && r.startsWith("lat_")) {
    const c = (s = n == null ? void 0 : n.parameters) == null ? void 0 : s.query, d = (u = n == null ? void 0 : n.parameters) == null ? void 0 : u.url;
    o = c || d || "Executing tool...";
  } else
    o = a();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ p("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ p(
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
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ p("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ p("span", { children: o }),
          /* @__PURE__ */ I("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ p(
                    "mask",
                    {
                      id: "mask0_64_36278",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ p(
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
                  /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ p(
                    "path",
                    {
                      d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ p("span", { children: "Running..." })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ p("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ p(
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
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ p("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ p("span", { children: o }),
          /* @__PURE__ */ I("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ p(
                    "mask",
                    {
                      id: "mask0_64_36345",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ p(
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
                  /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36345)", children: /* @__PURE__ */ p(
                    "path",
                    {
                      d: "M7.1501 10.7819L11.1168 6.83193L10.2668 5.98193L7.1501 9.08193L5.73343 7.68193L4.88343 8.53193L7.1501 10.7819ZM8.0001 14.7819C7.12232 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.643 2.1001 10.8653C1.76676 10.0875 1.6001 9.25971 1.6001 8.38193C1.6001 7.49304 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73899 2.81527 5.51676 2.48193C6.29454 2.1486 7.12232 1.98193 8.0001 1.98193C8.88899 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11805 13.9001 5.89027C14.2334 6.66249 14.4001 7.49304 14.4001 8.38193C14.4001 9.25971 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.264 13.9486 10.4918 14.2819C9.71954 14.6153 8.88899 14.7819 8.0001 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819Z",
                      fill: "#4EAD13"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ p("span", { children: "Completed" })
          ] })
        ] });
      case "error":
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ p(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ p(
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
          /* @__PURE__ */ p("span", { className: "chat-wrapper__tooling-handle-title", children: e })
        ] });
      default:
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ p("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ p(
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
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ p("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ p(
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ p(
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
                /* @__PURE__ */ p("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ p("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ p("span", { children: "Pending..." })
        ] });
    }
  })() });
}
const lu = ({
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
      /* @__PURE__ */ p(
        "path",
        {
          d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
          fill: r
        }
      ),
      /* @__PURE__ */ p("circle", { cx: "7", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ p("circle", { cx: "12", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ p("circle", { cx: "17", cy: "10", r: "1", fill: r })
    ]
  }
), su = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ p(
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
    children: /* @__PURE__ */ p(
      "path",
      {
        d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
        fill: r
      }
    )
  }
), cu = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor",
  isFullscreen: i = !1
}) => /* @__PURE__ */ p(
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
      /* @__PURE__ */ p(
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
      /* @__PURE__ */ p(
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
), uu = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ p(
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
    children: /* @__PURE__ */ p(
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
), Li = ({
  className: e,
  onClick: t,
  size: n = 16,
  color: r = "currentColor"
}) => /* @__PURE__ */ p(
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
    children: /* @__PURE__ */ p(
      "path",
      {
        d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
        fill: r
      }
    )
  }
), hu = ({
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
      /* @__PURE__ */ p("mask", { id: "mask0_444_23118", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "18", height: "18", children: /* @__PURE__ */ p("rect", { width: "18", height: "18", fill: "#D9D9D9" }) }),
      /* @__PURE__ */ p("g", { mask: "url(#mask0_444_23118)", children: /* @__PURE__ */ p(
        "path",
        {
          d: "M5.8498 13.4998C5.47855 13.4998 5.16074 13.3676 4.89637 13.1032C4.63199 12.8389 4.4998 12.5211 4.4998 12.1498V3.1498C4.4998 2.77855 4.63199 2.46074 4.89637 2.19637C5.16074 1.93199 5.47855 1.7998 5.8498 1.7998H14.8498C15.2211 1.7998 15.5389 1.93199 15.8032 2.19637C16.0676 2.46074 16.1998 2.77855 16.1998 3.1498V12.1498C16.1998 12.5211 16.0676 12.8389 15.8032 13.1032C15.5389 13.3676 15.2211 13.4998 14.8498 13.4998H5.8498ZM5.8498 12.1498H14.8498V3.1498H5.8498V12.1498ZM3.1498 16.1998C2.77855 16.1998 2.46074 16.0676 2.19637 15.8032C1.93199 15.5389 1.7998 15.2211 1.7998 14.8498V4.4998H3.1498V14.8498H13.4998V16.1998H3.1498Z",
          fill: r
        }
      ) })
    ]
  }
), pu = ({ message: e }) => {
  const [t, n] = ee(!0);
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ I(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!t),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          e.role === "system" ? /* @__PURE__ */ I("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
              "svg",
              {
                width: "20",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ p(
                    "mask",
                    {
                      id: "mask0_64_36257",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ p("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ p(
                    "path",
                    {
                      d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }),
            /* @__PURE__ */ p("span", { children: "AI text input <show-toolname>..." })
          ] }) : /* @__PURE__ */ p("span", { children: "System Message" }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
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
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ p("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ p(
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
    t && /* @__PURE__ */ p("div", { className: "chat-wrapper__system-message-content", children: /* @__PURE__ */ p("span", { children: e.content }) })
  ] });
}, ka = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ p("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ p("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ p("code", { className: "chat-wrapper__code-block", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ p("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ p("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ p("li", { className: "chat-wrapper__list-item", ...t, children: e })
}, du = {
  ...ka,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ p("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ p("code", { className: "chat-wrapper__code", ...n, children: e })
}, ba = Mi(
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
    const [u, c] = ee(!1), [d, m] = ee(!1), h = se(async () => {
      try {
        await navigator.clipboard.writeText(e.content), c(!0), setTimeout(() => c(!1), 2e3);
      } catch (z) {
        console.error("Failed to copy message:", z);
      }
    }, [e.content]), y = () => /* @__PURE__ */ I("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ p(Fi, { size: 16, variant: "dots" }),
      /* @__PURE__ */ p("span", { children: V.UI_TEXT.THINKING })
    ] }), S = () => /* @__PURE__ */ I(tn, { children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ p(
        "button",
        {
          className: `chat-wrapper__copy-button ${d ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: h,
          title: "Copy message",
          children: /* @__PURE__ */ p(hu, {})
        }
      ) }),
      u && /* @__PURE__ */ p("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), N = () => /* @__PURE__ */ p("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(vi, { components: ka, children: e.content }) }),
      S()
    ] }) }), _ = () => /* @__PURE__ */ I("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(vi, { components: du, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ p("div", { className: "chat-wrapper__media", children: e.media.map((z, w) => /* @__PURE__ */ p(
        "img",
        {
          src: z,
          alt: `Uploaded content ${w + 1}`,
          className: "chat-wrapper__media-image"
        },
        w
      )) })
    ] }), M = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === s.current ? y() : e.role === "system" ? /* @__PURE__ */ p(pu, { message: e }) : e.role === "assistant" ? N() : _(), x = () => /* @__PURE__ */ I(iu, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ p(
        xa,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ p(Ta, { children: i(e.content) })
    ] }), L = () => {
      var z;
      return /* @__PURE__ */ p(au, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ p(
        ou,
        {
          title: a(e.content, e.isStreaming),
          status: o(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (z = e.toolData) == null ? void 0 : z.toolName,
          clientTools: l
        }
      ) });
    };
    return /* @__PURE__ */ p(
      "div",
      {
        className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
        onMouseEnter: () => e.role === "assistant" && m(!0),
        onMouseLeave: () => e.role === "assistant" && m(!1),
        children: e.role === "reasoning" ? x() : e.role === "tooling" ? L() : /* @__PURE__ */ p("div", { className: "chat-wrapper__message-content", children: M() })
      }
    );
  }
);
ba.displayName = "MessageItem";
const fu = ({ isVisible: e }) => e ? /* @__PURE__ */ p("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ p("span", {}),
  /* @__PURE__ */ p("span", {}),
  /* @__PURE__ */ p("span", {})
] }) }) }) }) : null, Aa = lr(({
  messages: e,
  isThinking: t,
  isHandlingTool: n,
  getReasoningTitle: r,
  getReasoningStatus: i,
  getReasoningDuration: a,
  getReasoningContentOnly: o,
  getToolingTitle: l,
  getToolingStatus: s,
  clientTools: u,
  currentAssistantMessageIdRef: c
}, d) => /* @__PURE__ */ I("div", { className: "chat-wrapper__messages", children: [
  e.map((m) => /* @__PURE__ */ p(
    ba,
    {
      message: m,
      getReasoningTitle: r,
      getReasoningStatus: i,
      getReasoningDuration: a,
      getReasoningContentOnly: o,
      getToolingTitle: l,
      getToolingStatus: s,
      clientTools: u,
      currentAssistantMessageIdRef: c
    },
    m.id
  )),
  /* @__PURE__ */ p(fu, { isVisible: t && !n }),
  /* @__PURE__ */ p("div", { ref: d })
] }));
Aa.displayName = "MessagesList";
const mu = {
  maxReconnectAttempts: 5,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, gu = {
  NORMAL: 1e3,
  GOING_AWAY: 1001
};
var et = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(et || {}), Ct = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e))(Ct || {}), Ue = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(Ue || {}), yn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(yn || {}), xt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(xt || {});
class Bt {
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
    return this.createConnectionEvent(et.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(et.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(et.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(et.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(et.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(et.CHAT_ERROR, { error: t, errorCode: n });
  }
}
class Tt {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(t) {
    return {
      type: Ct.CHAT_MESSAGE,
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
      type: Ct.CONFIGURE_TOOLS,
      toolSchemas: t,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(t) {
    return {
      type: Ct.UPDATE_TOOLS,
      toolSchemas: t
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(t) {
    return {
      type: Ct.UPDATE_CONTEXT_HELPERS,
      contextHelpers: t
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(t, n) {
    return {
      type: Ct.TOOL_CALL_RESPONSE,
      callId: t,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(t, n) {
    return {
      type: Ct.TOOL_CALL_RESPONSE,
      callId: t,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: Ct.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(t, n) {
    return {
      type: Ct.HEARTBEAT_PONG,
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
class Cu {
  constructor(t, n) {
    ae(this, "ws", null);
    ae(this, "config");
    ae(this, "connectionState");
    ae(this, "reconnectTimer", null);
    ae(this, "heartbeatInterval", null);
    ae(this, "visibilityChangeHandler");
    ae(this, "onOpen");
    ae(this, "onMessage");
    ae(this, "onError");
    ae(this, "onClose");
    ae(this, "onSystemEvent");
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
    const { NORMAL: n, GOING_AWAY: r } = gu;
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
        Bt.connectionLost("Max reconnection attempts reached")
      ));
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    (a = this.onSystemEvent) == null || a.call(this, Bt.reconnecting(t, n)), this.reconnectTimer = window.setTimeout(() => {
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
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Bt.connectionRestored()), (n = this.onOpen) == null || n.call(this);
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
    const t = Tt.serializeHeartbeatPing();
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
class yu {
  constructor() {
    ae(this, "state");
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
class _n {
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
class Ra {
  constructor(t = {}) {
    ae(this, "handlers", {});
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
class wu extends Ra {
  constructor(n) {
    super({ onReasoningUpdate: n });
    ae(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    ae(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, o) {
    const l = this.getHandler("onReasoningUpdate");
    if (!l) return;
    const s = _n.createReasoningCall(
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
    const o = `${V.THINKING_PREFIX} ${a}`;
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
    const l = i || V.UI_TEXT.THOUGHT, s = `${V.THOUGHT_PREFIX} ${l}${o}`;
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
class Eu extends Ra {
  constructor(n = {}, r) {
    super({ onReasoningUpdate: r });
    ae(this, "processedToolCalls", /* @__PURE__ */ new Set());
    ae(this, "clientTools", {});
    ae(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var o, l, s;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (o = this.getHandler("onReasoningUpdate")) == null || o(!0, `${V.HANDLING_MARKER} ${i}`, n);
      try {
        const u = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, u), (l = this.getHandler("onReasoningUpdate")) == null || l(!1, `${V.COMPLETED_MARKER} ${i}`, n);
      } catch (u) {
        this.sendToolError(r, u), (s = this.getHandler("onReasoningUpdate")) == null || s(!1, `${V.ERROR_MARKER} Error: ${i} - ${u}`, n);
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
    const i = Tt.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = Tt.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = _n.createLatitudeToolCall(
        n.toolName,
        n.toolCallId,
        n.args || {}
      );
      r(!0, `${V.HANDLING_MARKER} ${n.toolName}`, a);
    }
  }
  handleServerToolResult(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = _n.createLatitudeToolCall(
        n.toolName,
        n.toolCallId
      );
      r(
        !1,
        `${V.COMPLETED_MARKER} ${n.toolName}`,
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
class Su {
  constructor(t, n = {}) {
    ae(this, "reasoningHandler");
    ae(this, "toolHandler");
    ae(this, "handlers");
    ae(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new wu(t.onReasoningUpdate), this.toolHandler = new Eu(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case Ue.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case Ue.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case Ue.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case Ue.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case Ue.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case Ue.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case Ue.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case Ue.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case Ue.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case Ue.HEARTBEAT_ACK:
          break;
        case Ue.ERROR:
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
      case yn.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case yn.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case yn.CONTENT_DELTA:
        (n = t.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, t.data.delta));
        break;
    }
  }
  handleProviderEvent(t) {
    var r, i, a;
    switch ((r = t.data) == null ? void 0 : r.type) {
      case xt.TEXT_DELTA:
        t.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, t.data.textDelta));
        break;
      case xt.REASONING_START:
        this.reasoningHandler.handleReasoningStart(t.data);
        break;
      case xt.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(t.data);
        break;
      case xt.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(t.data);
        break;
      case xt.TOOL_CALL:
        this.toolHandler.handleServerToolCall(t.data);
        break;
      case xt.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(t.data);
        break;
    }
  }
  handleLatitudeEvent(t) {
    var n;
    if (((n = t.data) == null ? void 0 : n.type) === xt.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = t.data;
      if (r.toolCallId && r.toolName) {
        const i = _n.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${V.COMPLETED_MARKER} ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Bt.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Bt.chatError(t.error || "Unknown error"));
  }
  handleToolCallRequest(t) {
    this.toolHandler.handleToolCallRequest(t);
  }
  handleHeartbeatPing(t) {
    if (!this.sendMessage)
      return;
    const n = Tt.serializeHeartbeatPong(
      t.timestamp,
      t.pingTime
    );
    this.sendMessage(n);
  }
  handleError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Bt.chatError(t.error || "Unknown WebSocket error"));
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
class _u {
  constructor() {
    ae(this, "config");
    ae(this, "connectionState");
    ae(this, "wsManager");
    ae(this, "messageHandler");
    ae(this, "initResolve");
    // Client tools and context
    ae(this, "toolSchemas", []);
    ae(this, "contextHelpers", {});
    this.config = {
      ...mu
    }, this.connectionState = new yu(), this.wsManager = new Cu(this.config, this.connectionState), this.messageHandler = new Su({}), this.setupWebSocketHandlers();
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
    (n == null ? void 0 : n.type) === Ue.TOOLS_CONFIGURED && ((r = this.initResolve) == null || r.call(this)), (n == null ? void 0 : n.type) === Ue.SESSION_ESTABLISHED && (!this.toolSchemas || this.toolSchemas.length === 0) && ((i = this.initResolve) == null || i.call(this));
  }
  handleConnectionOpen() {
    this.toolSchemas && this.toolSchemas.length > 0 && this.sendToolConfiguration();
  }
  sendToolConfiguration() {
    const t = Tt.serializeConfigureTools(
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
    t.chatServerUrl && (this.config.apiUrl = t.chatServerUrl), t.userId && (this.config.userId = t.userId);
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
      const l = Tt.serializeChatMessage({
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
    const n = Tt.serializeUpdateContextHelpers(this.contextHelpers);
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = Tt.serializeUpdateTools(this.toolSchemas);
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
const xu = (...e) => e.filter(Boolean).join(" ");
function Tu({
  // Authentication and server properties
  userMpAuthToken: e,
  chatServerUrl: t,
  chatServerKey: n,
  // Entity configuration
  providerResId: r,
  userId: i,
  entityId: a,
  entityType: o,
  // Existing properties
  clientTools: l,
  tools: s,
  contextHelpers: u,
  onSetMessage: c,
  onSystemEvent: d,
  onReasoningUpdate: m
}) {
  const [h, y] = ee(null), [S, N] = ee(!1), _ = kt(null), M = se(async () => {
    try {
      if (!e)
        throw new Error("userMpAuthToken is required");
      if (!t)
        throw new Error("chatServerUrl is required");
      if (!n)
        throw new Error("chatServerKey is required");
      if (!i)
        throw new Error("userId is required");
      const L = new _u();
      _.current = L, y(L);
      const z = u || {};
      await L.onInit({
        // Authentication and server properties
        userMpAuthToken: e,
        chatServerUrl: t,
        chatServerKey: n,
        // Entity configuration
        providerResId: r,
        userId: i,
        entityId: a,
        entityType: o == null ? void 0 : o.toString(),
        // Existing properties
        toolSchemas: l,
        clientTools: s,
        contextHelpers: z,
        onSetMessage: c,
        onSystemEvent: d,
        onReasoningUpdate: m
      }), N(!0);
    } catch (L) {
      console.error("Error connecting WebSocketChatClient:", L), N(!1);
    }
  }, [
    e,
    t,
    n,
    r,
    i,
    a,
    o,
    l,
    s,
    u,
    c,
    d,
    m
  ]), x = se(() => {
    _.current && (_.current.disconnect(), _.current = null), y(null), N(!1);
  }, []);
  return tt(() => (M(), () => {
    x();
  }), [M, x]), tt(() => {
    const L = setInterval(() => {
      if (_.current) {
        const z = _.current.getConnectionStatus();
        N(z.connected);
      }
    }, 1e3);
    return () => clearInterval(L);
  }, []), {
    agentClient: h,
    isConnected: S,
    connectAgentClient: M,
    disconnectAgentClient: x
  };
}
function ku({ initialMessages: e = [] }) {
  const [t, n] = ee(e), [r, i] = ee(!1), [a, o] = ee(!1), [l, s] = ee(""), [u, c] = ee(!1), [, d] = ee(
    /* @__PURE__ */ new Map()
  ), [, m] = ee(
    /* @__PURE__ */ new Map()
  ), h = kt(null), y = kt(""), S = se(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), N = vt(
    () => (D, R) => R === !1 ? Ee.isErrorMessage(D) ? Ie.ERROR : Ie.COMPLETED : Ee.isCompletedMessage(D) ? Ie.COMPLETED : Ee.isErrorMessage(D) ? Ie.ERROR : Ie.PROCESSING,
    []
  ), _ = vt(
    () => (D) => Ee.extractDuration(D),
    []
  ), M = vt(
    () => (D) => Ee.cleanReasoningContent(D),
    []
  ), x = vt(
    () => (D, R) => {
      switch (Ee.getMessageType(D, R)) {
        case V.MESSAGE_TYPES.ERROR:
          return "Error";
        case V.MESSAGE_TYPES.COMPLETED:
          return "Completed";
        case V.MESSAGE_TYPES.THOUGHT:
          return V.UI_TEXT.THOUGHT;
        case V.MESSAGE_TYPES.THINKING:
        default:
          return V.UI_TEXT.THINKING_ELLIPSIS;
      }
    },
    []
  ), L = vt(
    () => (D, R) => R === !1 ? D.includes(V.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : D.includes(V.COMPLETED_MARKER) || D.includes("✅") ? "Tool Completed" : D.includes(V.ERROR_MARKER) ? "Tool Error" : (D.includes(V.HANDLING_MARKER), "Tool Processing..."),
    []
  ), z = vt(
    () => (D, R) => R === !1 ? D.includes(V.ERROR_MARKER) ? Ie.ERROR : Ie.COMPLETED : D.includes(V.COMPLETED_MARKER) || D.includes("✅") ? Ie.COMPLETED : D.includes(V.ERROR_MARKER) ? Ie.ERROR : Ie.PROCESSING,
    []
  ), w = se(
    (D, R) => {
      const q = mn(R, D === "assistant");
      n((de) => [
        ...de,
        {
          id: S(),
          role: D,
          content: q,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [S]
  ), H = se(() => {
    if (h.current && y.current) {
      const D = mn(y.current, !0);
      return n(
        (R) => R.map(
          (J) => J.id === h.current ? {
            ...J,
            content: D,
            isStreaming: !1
          } : J
        )
      ), h.current = null, y.current = "", s(""), !0;
    }
    return !1;
  }, []), W = se((D) => {
    const R = mn(D, !0);
    if (h.current)
      y.current += R, s(y.current), n(
        (J) => J.map(
          (q) => q.id === h.current ? {
            ...q,
            content: y.current,
            isStreaming: !0
          } : q
        )
      );
    else {
      o(!1);
      const J = S();
      h.current = J, y.current = R, s(R);
      const q = {
        id: J,
        role: "assistant",
        content: R,
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      n((de) => [...de, q]);
    }
  }, [S]), G = se(
    (D, R, J) => {
      const { callId: q } = J || {};
      if (c(D), !q) return;
      const de = Ee.isThinkingMessage(R) && !R.includes("for") && !R.includes("seconds"), Ae = Ee.isThinkingMessage(R) && R.includes("for") && R.includes("seconds"), g = Ee.isHandlingMessage(R), Q = Ee.isCompletedMessage(R), we = Ee.isErrorMessage(R);
      (de || Ae) && m((f) => {
        const ne = new Map(f), P = ne.get(q);
        if (de && !P) {
          H();
          const X = S();
          ne.set(q, X);
          const te = {
            id: X,
            role: "reasoning",
            content: R,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          n((he) => [...he, te]);
        } else Ae && P ? (n(
          (X) => X.map(
            (te) => te.id === P ? {
              ...te,
              content: R,
              isStreaming: !1
            } : te
          )
        ), ne.delete(q)) : P && de && n(
          (X) => X.map(
            (te) => te.id === P ? {
              ...te,
              content: R,
              isStreaming: !0
            } : te
          )
        );
        return ne;
      }), d((f) => {
        const ne = new Map(f), P = ne.get(q);
        if (g && !P) {
          H();
          const X = R.match(
            V.PATTERNS.HANDLING_TOOL
          ), te = X ? X[1] : "Unknown Tool", he = S();
          ne.set(q, he);
          const ge = {
            id: he,
            role: "tooling",
            content: R,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0,
            toolData: {
              ...J,
              toolName: te,
              callId: q,
              status: Ie.PROCESSING
            }
          };
          n((Se) => [...Se, ge]);
        } else if ((Q || we) && P) {
          const X = R.match(
            V.PATTERNS.COMPLETED_OR_ERROR_TOOL
          ), te = X ? X[1] : "Unknown Tool";
          n(
            (he) => he.map(
              (ge) => ge.id === P ? {
                ...ge,
                content: R,
                isStreaming: !1,
                toolData: {
                  ...ge.toolData,
                  toolName: te,
                  status: we ? Ie.ERROR : Ie.COMPLETED,
                  callId: q ?? ""
                }
              } : ge
            )
          ), ne.delete(q);
        } else P && u && !Q && !we && n(
          (X) => X.map(
            (te) => te.id === P ? {
              ...te,
              content: R,
              isStreaming: !0
            } : te
          )
        );
        return ne;
      });
    },
    [H, S]
  ), B = se(() => {
    i(!1), o(!1), H();
  }, [H]), A = se(
    (D) => {
      console.error("Chat error:", D), i(!1), o(!1), H(), w("system", `❌ Chat error: ${D}`);
    },
    [w, H]
  ), v = se(() => {
    c(!1);
  }, []), Y = se(() => {
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
    isHandlingTool: u,
    currentAssistantMessageIdRef: h,
    // Helper functions
    getReasoningStatus: N,
    getReasoningDuration: _,
    getReasoningContentOnly: M,
    getReasoningTitle: x,
    getToolingTitle: L,
    getToolingStatus: z,
    // Actions
    addMessage: w,
    handleSetMessage: W,
    handleReasoningUpdate: G,
    handleChatFinished: B,
    handleChatError: A,
    stopGeneration: Y,
    finalizeCurrentStreamingMessage: H
  };
}
function bu({ initialMode: e = "sidebar" }) {
  const [t, n] = ee(!1), [r, i] = ee(!1), [a, o] = ee(e), [l, s] = ee(Fe.IDLE), [u, c] = ee(Wn.IDLE), [d, m] = ee(!1), [h, y] = ee(null), [S, N] = ee(null), [_, M] = ee(null), [x, L] = ee(!1), z = se(() => {
    n(!0);
  }, []), w = se(() => {
    n(!1);
  }, []), H = se(() => {
    i((G) => !G);
  }, []), W = se(() => {
    o((G) => G === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  return tt(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const G = (B) => {
      B.key === "Escape" && a === "modal" && t && w();
    };
    if (a === "modal" && t)
      return document.addEventListener("keydown", G), () => document.removeEventListener("keydown", G);
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
    streamingStatus: u,
    setStreamingStatus: c,
    // Conversation state
    isLoadingConversation: d,
    setIsLoadingConversation: m,
    conversationError: h,
    setConversationError: y,
    // Thread state
    currentThreadId: S,
    setCurrentThreadId: N,
    currentConvUuid: _,
    setCurrentConvUuid: M,
    // Dev mode state
    isDevSettingsOpen: x,
    setIsDevSettingsOpen: L,
    // Actions
    openModal: z,
    closeModal: w,
    toggleCollapse: H,
    toggleFullscreen: W
  };
}
async function Wu(e, t, n) {
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
async function Zu(e, t) {
  const n = `${e}/threads/conv/${t}`, r = await fetch(n);
  if (!r.ok) {
    const i = await r.json().catch(() => ({
      error: "Thread not found"
    }));
    throw new Error(i.error || "Thread not found");
  }
  return r.json();
}
async function Au(e, t, n) {
  const r = `${e}/messages/thread/${t}?format=client`, i = {};
  n != null && n.userMpAuthToken && (i.Authorization = `Bearer ${n.userMpAuthToken}`), n != null && n.chatServerKey && (i["X-Chat-Server-Key"] = n.chatServerKey);
  const a = await fetch(r, { headers: i });
  if (!a.ok) {
    const l = await a.json().catch(() => ({
      error: "Failed to fetch messages"
    }));
    throw new Error(l.error || "Failed to fetch messages");
  }
  return (await a.json()).messages.map((l) => ({
    ...l,
    timestamp: new Date(l.timestamp)
  }));
}
async function qu(e, t) {
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
async function Xu(e, t, n, r) {
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
function Ru({
  userId: e,
  httpApiUrl: t,
  userMpAuthToken: n,
  chatServerKey: r,
  messages: i,
  setMessages: a,
  setIsLoadingConversation: o,
  setConversationError: l,
  setCurrentThreadId: s,
  setCurrentConvUuid: u
}) {
  const c = kt(!1);
  return tt(() => {
    (async () => {
      if (!e) {
        console.error("userId is required for conversation loading");
        return;
      }
      if (!t) {
        console.error("httpApiUrl is required for conversation loading");
        return;
      }
      if (!n) {
        console.error("userMpAuthToken is required for conversation loading");
        return;
      }
      if (!r) {
        console.error("chatServerKey is required for conversation loading");
        return;
      }
      if (!c.current && !(i.length > 0))
        try {
          o(!0), l(null);
          const m = [];
          if (m.length === 0) {
            o(!1), c.current = !0;
            return;
          }
          const h = m[0];
          s(h.id), u(h.convUuid);
          const y = await Au(t, h.id, {
            userMpAuthToken: n,
            chatServerKey: r
          });
          a(y), c.current = !0;
        } catch (m) {
          console.error("❌ Error loading conversation:", m), l(
            m instanceof Error ? m.message : "Failed to load conversation"
          ), c.current = !0;
        } finally {
          o(!1);
        }
    })();
  }, [
    e,
    t,
    n,
    r,
    i.length,
    a,
    o,
    l,
    s,
    u
  ]), {
    hasLoadedConversationRef: c
  };
}
function Iu({
  // Authentication and server configuration
  userMpAuthToken: e,
  chatServerUrl: t,
  chatServerKey: n,
  // Entity and conversation configuration
  providerResId: r,
  userId: i,
  entityId: a,
  entityType: o,
  // App identification
  app: l,
  // Existing props
  config: s,
  tools: u,
  clientTools: c,
  initialMessages: d = [],
  devMode: m = !1,
  contextHelpers: h
}) {
  var on;
  if (!e)
    throw new Error("ChatWrapper: userMpAuthToken is required");
  if (!t)
    throw new Error("ChatWrapper: chatServerUrl is required");
  if (!n)
    throw new Error("ChatWrapper: chatServerKey is required");
  if (!i)
    throw new Error("ChatWrapper: userId is required");
  const y = se((le) => le.replace(
    /^wss?:\/\//,
    (pe) => pe === "wss://" ? "https://" : "http://"
  ), []), S = vt(() => y(t), [t, y]), N = ku({ initialMessages: d }), _ = bu({ initialMode: s.mode }), {
    messages: M,
    setMessages: x,
    isStreaming: L,
    setIsStreaming: z,
    isThinking: w,
    setIsThinking: H,
    streamingContent: W,
    isHandlingTool: G,
    currentAssistantMessageIdRef: B,
    getReasoningStatus: A,
    getReasoningDuration: v,
    getReasoningContentOnly: Y,
    getReasoningTitle: D,
    getToolingTitle: R,
    getToolingStatus: J,
    addMessage: q,
    handleSetMessage: de,
    handleReasoningUpdate: Ae,
    handleChatFinished: g,
    handleChatError: Q,
    stopGeneration: we
  } = N, {
    isModalOpen: f,
    isCollapsed: ne,
    currentMode: P,
    chatStatus: X,
    setChatStatus: te,
    streamingStatus: he,
    setStreamingStatus: ge,
    isLoadingConversation: Se,
    setIsLoadingConversation: ct,
    conversationError: At,
    setConversationError: rt,
    setCurrentThreadId: yt,
    currentConvUuid: Ge,
    setCurrentConvUuid: wt,
    isDevSettingsOpen: Et,
    setIsDevSettingsOpen: $e,
    openModal: ut,
    closeModal: ht,
    toggleCollapse: Rt,
    toggleFullscreen: Ot
  } = _, Dt = kt(null), it = kt(null), pt = se((le) => {
    var pe;
    switch (le.type) {
      case et.CHAT_COMPLETED:
        g(), setTimeout(() => {
          var Ke;
          (Ke = it.current) == null || Ke.focus();
        }, 0);
        break;
      case et.CHAT_ERROR:
        (pe = le.data) != null && pe.error && Q(le.data.error);
        break;
      case et.CONNECTION_LOST:
      case et.CONNECTION_RESTORED:
    }
  }, [g, Q]), { agentClient: E, isConnected: b } = Tu({
    // Authentication and server properties
    userMpAuthToken: e,
    chatServerUrl: t,
    chatServerKey: n,
    // Entity configuration
    providerResId: r,
    userId: i,
    entityId: a,
    entityType: o,
    // Existing properties
    clientTools: c,
    tools: u,
    contextHelpers: h,
    onSetMessage: de,
    onSystemEvent: pt,
    onReasoningUpdate: Ae
  });
  Ru({
    userId: i,
    httpApiUrl: S,
    userMpAuthToken: e,
    chatServerKey: n,
    messages: M,
    setMessages: x,
    setIsLoadingConversation: ct,
    setConversationError: rt,
    setCurrentThreadId: yt,
    setCurrentConvUuid: wt
  });
  const F = kt(null), $ = se(() => {
    F.current && cancelAnimationFrame(F.current), F.current = requestAnimationFrame(() => {
      var le;
      (le = Dt.current) == null || le.scrollIntoView({ behavior: "smooth" }), F.current = null;
    });
  }, []);
  tt(() => {
    $();
  }, [M, $]), tt(() => {
    W && $();
  }, [W, $]), tt(() => {
    s.onStreamingStatusChange && s.onStreamingStatusChange(he);
  }, [he, s]), tt(() => () => {
    F.current && cancelAnimationFrame(F.current);
  }, []);
  const re = se(
    async (le, pe) => {
      if (!le.trim() || L || !E || !b)
        return;
      const Ke = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        role: "user",
        content: le.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: pe
      };
      x((ke) => [...ke, Ke]), z(!0), H(!0), te(Fe.SUBMITTED), ge(Wn.STARTING);
      try {
        await E.onTriggerMessage({
          message: Ke.content,
          app: l,
          media: pe,
          convUuid: Ge || void 0,
          agentPromptPath: void 0
        }), te(Fe.STREAMING);
      } catch (ke) {
        console.error("Agent client send error:", ke), H(!1), te(Fe.ERROR), q(
          "system",
          `Sorry, there was an error: ${ke instanceof Error ? ke.message : "Unknown error"}`
        ), s.onError && s.onError(
          ke instanceof Error ? ke : new Error("Unknown error")
        ), z(!1), te(Fe.IDLE), ge(Wn.IDLE);
      }
    },
    [
      L,
      E,
      b,
      x,
      z,
      H,
      te,
      ge,
      q,
      s,
      l,
      Ge
    ]
  ), _e = se(
    async (le) => {
      const pe = [], Ke = S, ke = "chat-uploads";
      for (const De of le)
        try {
          const It = new FormData();
          It.append("file", De), It.append("folder", ke);
          const oe = {};
          e && (oe.Authorization = `Bearer ${e}`), n && (oe["X-Chat-Server-Key"] = n);
          const Qe = await fetch(`${Ke}/upload`, {
            method: "POST",
            headers: oe,
            body: It
          }), St = await Qe.json();
          if (Qe.ok)
            De.type.startsWith("image/") ? pe.push(St.url) : pe.push(
              `data:${De.type};name=${encodeURIComponent(
                St.fileName || De.name
              )};url=${encodeURIComponent(St.url)}`
            );
          else if (console.error("❌ Upload failed:", St.error), De.type.startsWith("image/")) {
            const dt = new FileReader(), jt = await new Promise(
              (ln, sn) => {
                dt.onload = () => ln(dt.result), dt.onerror = sn, dt.readAsDataURL(De);
              }
            );
            pe.push(jt);
          } else
            pe.push(
              `data:${De.type};name=${encodeURIComponent(
                De.name
              )};base64,placeholder`
            );
        } catch (It) {
          console.error("Error uploading file:", It);
          try {
            if (De.type.startsWith("image/")) {
              const oe = new FileReader(), Qe = await new Promise(
                (St, dt) => {
                  oe.onload = () => St(oe.result), oe.onerror = dt, oe.readAsDataURL(De);
                }
              );
              pe.push(Qe);
            } else
              pe.push(
                `data:${De.type};name=${encodeURIComponent(
                  De.name
                )};base64,placeholder`
              );
          } catch (oe) {
            console.error("Error in fallback encoding:", oe);
          }
        }
      return pe;
    },
    [S, e, n]
  ), We = xu(
    "chat-wrapper",
    `chat-wrapper--${P}`,
    s.position && `chat-wrapper--${s.position}`,
    s.theme && `chat-wrapper--${s.theme}`,
    ne && "chat-wrapper--collapsed",
    P === "embedded" && s.constrainedHeight && "chat-wrapper--constrained"
  ), xe = () => {
    var pe;
    if (P === "modal" && !f || P === "sidebar" && ne || P === "fullscreen" && ne) {
      const Ke = P === "modal" ? ut : Rt, ke = P === "modal" ? `Open ${s.appName}` : `Expand ${s.appName}`;
      return /* @__PURE__ */ I(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: Ke,
          title: ke,
          children: [
            /* @__PURE__ */ p(lu, { className: "chat-wrapper__bubble-icon", size: 24 }),
            ((pe = s.features) == null ? void 0 : pe.showBubbleText) !== !1 && /* @__PURE__ */ p("span", { className: "chat-wrapper__bubble-text", children: s.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, Ze = () => P === "modal" && f ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: ht,
      title: "Close chat",
      children: /* @__PURE__ */ p(su, { size: 20 })
    }
  ) : null, Te = () => {
    if ((P === "sidebar" || P === "fullscreen") && !ne) {
      const le = P === "fullscreen";
      return /* @__PURE__ */ p(
        "button",
        {
          className: le ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: Ot,
          title: le ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ p(cu, { size: 20, isFullscreen: le })
        }
      );
    }
    return null;
  }, me = () => (P === "sidebar" || P === "fullscreen") && !ne ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: Rt,
      title: "Collapse chat",
      children: /* @__PURE__ */ p(uu, { size: 20 })
    }
  ) : null, qe = () => m && s.headerVisible !== !1 ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__settings-button",
      onClick: () => $e(!0),
      title: "Developer Settings",
      children: /* @__PURE__ */ p(Li, { size: 16 })
    }
  ) : null, ve = () => !m || s.headerVisible !== !1 ? null : /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
      onClick: () => $e(!0),
      title: "Developer Settings",
      children: /* @__PURE__ */ p(Li, { size: 16 })
    }
  );
  return P === "modal" && !f || (P === "sidebar" || P === "fullscreen") && ne ? xe() : /* @__PURE__ */ p(tn, { children: /* @__PURE__ */ I("div", { className: We, style: s.customStyles, children: [
    ve(),
    s.headerVisible !== !1 && /* @__PURE__ */ I("div", { className: "chat-wrapper__header", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ p("h2", { className: "chat-wrapper__title", children: s.appName }) }),
      /* @__PURE__ */ I("div", { className: "chat-wrapper__header-controls", children: [
        qe(),
        Te(),
        me(),
        Ze()
      ] })
    ] }),
    !ne && /* @__PURE__ */ I(tn, { children: [
      At && /* @__PURE__ */ p("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ I("p", { children: [
        "⚠️ ",
        At
      ] }) }),
      M.length === 0 && !L && !Se && /* @__PURE__ */ I("div", { className: "chat-wrapper__main-header", children: [
        /* @__PURE__ */ p("h1", { className: "chat-wrapper__main-title", children: s.appName }),
        s.description && /* @__PURE__ */ p("p", { className: "chat-wrapper__description", children: s.description })
      ] }),
      /* @__PURE__ */ I(
        "div",
        {
          className: `chat-wrapper__content ${M.length === 0 && !L && !Se ? "chat-wrapper__content--empty" : "chat-wrapper__content--with-messages"}`,
          children: [
            Se && M.length === 0 ? /* @__PURE__ */ p("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ p(mo, { fullHeight: !0 }) }) : /* @__PURE__ */ p(
              Aa,
              {
                ref: Dt,
                messages: M,
                isThinking: w,
                isHandlingTool: G,
                getReasoningTitle: D,
                getReasoningStatus: A,
                getReasoningDuration: v,
                getReasoningContentOnly: Y,
                getToolingTitle: R,
                getToolingStatus: J,
                clientTools: c || [],
                currentAssistantMessageIdRef: B
              }
            ),
            /* @__PURE__ */ p("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ p(
              po,
              {
                ref: it,
                placeholder: s.placeholder,
                placeholderTexts: s.placeholderTexts,
                disabled: L,
                chatStatus: X,
                fileUploadEnabled: (on = s.features) == null ? void 0 : on.fileUpload,
                restaurantName: s.restaurantName,
                restaurantLogo: s.restaurantLogo,
                hasMessages: M.length > 0,
                onSubmit: (le, pe) => re(le, pe),
                onFileUpload: _e,
                onStopGeneration: we
              }
            ) }),
            M.length === 0 && !L && !Se && s.suggestedPrompts && /* @__PURE__ */ p(
              fo,
              {
                prompts: s.suggestedPrompts,
                onPromptSelect: (le) => {
                  it.current && it.current.setText(le.description);
                }
              }
            )
          ]
        }
      )
    ] }),
    s.onError && /* @__PURE__ */ p("div", { className: "chat-wrapper__error-boundary" }),
    /* @__PURE__ */ p(
      yo,
      {
        isOpen: Et,
        onClose: () => $e(!1),
        app: l,
        apiUrl: S,
        userMpAuthToken: e,
        chatServerKey: n
      }
    )
  ] }) });
}
const Yu = Mi(Iu);
var Nu = /* @__PURE__ */ ((e) => (e.BRAND = "BRAND", e.ACCOUNT = "ACCOUNT", e.USER = "USER", e))(Nu || {}), vu = /* @__PURE__ */ ((e) => (e.UD21 = "UD21", e.Host = "Host", e.Reserve = "Reserve", e))(vu || {});
export {
  za as AnimatedPlaceholder,
  vu as App,
  Fe as CHAT_STATUS,
  lu as ChatIcon,
  Yu as ChatWrapper,
  su as CloseIcon,
  uu as CollapseIcon,
  hu as CopyIcon,
  yo as DevSettings,
  Nu as EntityType,
  cu as FullscreenIcon,
  mo as InlineLoader,
  Fi as Loader,
  Ie as PROCESSING_STATUS,
  Da as PromptInput,
  Ua as PromptInputButton,
  Bu as PromptInputModelSelect,
  Vu as PromptInputModelSelectContent,
  ju as PromptInputModelSelectItem,
  Gu as PromptInputModelSelectTrigger,
  $u as PromptInputModelSelectValue,
  Fa as PromptInputSubmit,
  Oi as PromptInputTextarea,
  Pa as PromptInputToolbar,
  Ha as PromptInputTools,
  iu as Reasoning,
  Ta as ReasoningContent,
  xa as ReasoningTrigger,
  Wn as STREAMING_STATUS,
  Li as SettingsIcon,
  fo as SuggestedPrompts,
  Xu as createThread,
  qu as fetchMessagesByConvUuid,
  Zu as fetchThreadByConvUuid,
  Au as fetchThreadMessages,
  Wu as fetchUserThreads,
  Du as isChatActive,
  Hu as isChatError,
  Pu as isChatIdle,
  Uu as isProcessingActive,
  Fu as isProcessingComplete,
  zu as isProcessingError
};
