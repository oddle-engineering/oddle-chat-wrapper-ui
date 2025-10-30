var Ia = Object.defineProperty;
var Ra = (e, t, n) => t in e ? Ia(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ie = (e, t, n) => Ra(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as h, jsxs as A, Fragment as ln } from "react/jsx-runtime";
import zt, { forwardRef as dr, useState as K, useEffect as ut, useRef as Ct, useImperativeHandle as va, useCallback as he, memo as Li, useMemo as Nt } from "react";
const ot = (...e) => e.filter(Boolean).join(" "), Na = () => /* @__PURE__ */ A(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ A("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ h(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ h("g", { clipPath: "url(#clip0_121_23927)", children: /* @__PURE__ */ h(
          "path",
          {
            d: "M16.3333 26.3541L18.2133 28.2341L25.6666 20.7941V37.0208H28.3333V20.7941L35.7733 28.2474L37.6666 26.3541L26.9999 15.6874L16.3333 26.3541Z",
            fill: "white"
          }
        ) })
      ] }),
      /* @__PURE__ */ A("defs", { children: [
        /* @__PURE__ */ A(
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
              /* @__PURE__ */ h("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ h(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ h("feOffset", { dy: "1" }),
              /* @__PURE__ */ h("feGaussianBlur", { stdDeviation: "1" }),
              /* @__PURE__ */ h("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ h(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                }
              ),
              /* @__PURE__ */ h(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ h(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ h("feOffset", { dy: "1" }),
              /* @__PURE__ */ h("feGaussianBlur", { stdDeviation: "1.5" }),
              /* @__PURE__ */ h("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ h(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                }
              ),
              /* @__PURE__ */ h(
                "feBlend",
                {
                  mode: "normal",
                  in2: "effect1_dropShadow_121_23927",
                  result: "effect2_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ h(
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
        /* @__PURE__ */ h("clipPath", { id: "clip0_121_23927", children: /* @__PURE__ */ h(
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
), La = ({ className: e, ...t }) => /* @__PURE__ */ h("form", { className: ot("chat-wrapper__prompt-input", e), ...t }), Mi = dr(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...l
  }, o) => {
    const s = (c) => {
      if (c.key === "Enter") {
        if (c.shiftKey)
          return;
        c.preventDefault();
        const u = c.currentTarget.form;
        if (u) {
          const d = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          u.dispatchEvent(d);
        }
      }
      a == null || a(c);
    };
    return /* @__PURE__ */ h(
      "textarea",
      {
        ref: o,
        className: ot("chat-wrapper__prompt-textarea", t),
        name: "message",
        onChange: e,
        onKeyDown: s,
        placeholder: n,
        style: {
          minHeight: `${r}px`,
          maxHeight: `${i}px`
        },
        ...l
      }
    );
  }
);
Mi.displayName = "PromptInputTextarea";
const Ma = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: ot("chat-wrapper__prompt-toolbar", e), ...t }), Oa = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: ot("chat-wrapper__prompt-tools", e), ...t }), Da = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || zt.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ h(
    "button",
    {
      className: ot(
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
}, Pa = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = "idle",
  children: i,
  disabled: a,
  ...l
}) => {
  let o = /* @__PURE__ */ h(Na, {});
  const s = a || r === "submitted" || r === "streaming";
  return /* @__PURE__ */ h(
    "button",
    {
      className: ot(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${t}`,
        `chat-wrapper__prompt-submit--${n}`,
        // status === "streaming" && "chat-wrapper__prompt-submit--stop",
        e
      ),
      type: "submit",
      disabled: s,
      ...l,
      children: i ?? o
    }
  );
}, kc = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ h("select", { className: ot("chat-wrapper__prompt-select", e), ...n, children: t }), bc = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ h(
  "button",
  {
    className: ot("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), Ac = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h(
  "div",
  {
    className: ot("chat-wrapper__prompt-select-content", e),
    ...t
  }
), Ic = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ h(
  "div",
  {
    className: ot("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), Rc = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ h(
  "span",
  {
    className: ot("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), Ha = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = K(0), [a, l] = K(!1), [o, s] = K(0);
  return ut(() => {
    if (!t || e.length <= 1) return;
    const c = setInterval(() => {
      l(!0), setTimeout(() => {
        i((u) => (u + 1) % e.length), s((u) => u + 1), l(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(c);
  }, [t, e.length]), ut(() => {
    t || (i(0), l(!1), s(0));
  }, [t]), /* @__PURE__ */ h(
    "div",
    {
      className: `animated-placeholder-container ${n}`,
      children: /* @__PURE__ */ h(
        "span",
        {
          className: `animated-placeholder-text ${a ? "transitioning" : ""}`,
          children: e[r]
        },
        o
      )
    }
  );
};
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: Oi,
  setPrototypeOf: Nr,
  isFrozen: Ua,
  getPrototypeOf: Fa,
  getOwnPropertyDescriptor: za
} = Object;
let {
  freeze: Ue,
  seal: nt,
  create: Jn
} = Object, {
  apply: er,
  construct: tr
} = typeof Reflect < "u" && Reflect;
Ue || (Ue = function(t) {
  return t;
});
nt || (nt = function(t) {
  return t;
});
er || (er = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
tr || (tr = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const dn = Fe(Array.prototype.forEach), Ba = Fe(Array.prototype.lastIndexOf), Lr = Fe(Array.prototype.pop), Xt = Fe(Array.prototype.push), Ga = Fe(Array.prototype.splice), yn = Fe(String.prototype.toLowerCase), Pn = Fe(String.prototype.toString), Hn = Fe(String.prototype.match), Yt = Fe(String.prototype.replace), Va = Fe(String.prototype.indexOf), ja = Fe(String.prototype.trim), at = Fe(Object.prototype.hasOwnProperty), He = Fe(RegExp.prototype.test), Kt = $a(TypeError);
function Fe(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return er(e, t, r);
  };
}
function $a(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return tr(e, n);
  };
}
function Y(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : yn;
  Nr && Nr(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (Ua(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function Wa(e) {
  for (let t = 0; t < e.length; t++)
    at(e, t) || (e[t] = null);
  return e;
}
function yt(e) {
  const t = Jn(null);
  for (const [n, r] of Oi(e))
    at(e, n) && (Array.isArray(r) ? t[n] = Wa(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = yt(r) : t[n] = r);
  return t;
}
function Qt(e, t) {
  for (; e !== null; ) {
    const r = za(e, t);
    if (r) {
      if (r.get)
        return Fe(r.get);
      if (typeof r.value == "function")
        return Fe(r.value);
    }
    e = Fa(e);
  }
  function n() {
    return null;
  }
  return n;
}
const Mr = Ue(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Un = Ue(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Fn = Ue(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Za = Ue(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), zn = Ue(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), qa = Ue(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Or = Ue(["#text"]), Dr = Ue(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Bn = Ue(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Pr = Ue(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), fn = Ue(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Xa = nt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Ya = nt(/<%[\w\W]*|[\w\W]*%>/gm), Ka = nt(/\$\{[\w\W]*/gm), Qa = nt(/^data-[\-\w.\u00B7-\uFFFF]+$/), Ja = nt(/^aria-[\-\w]+$/), Di = nt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), el = nt(/^(?:\w+script|data):/i), tl = nt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Pi = nt(/^html$/i), nl = nt(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Hr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Ja,
  ATTR_WHITESPACE: tl,
  CUSTOM_ELEMENT: nl,
  DATA_ATTR: Qa,
  DOCTYPE_NAME: Pi,
  ERB_EXPR: Ya,
  IS_ALLOWED_URI: Di,
  IS_SCRIPT_OR_DATA: el,
  MUSTACHE_EXPR: Xa,
  TMPLIT_EXPR: Ka
});
const Jt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, rl = function() {
  return typeof window > "u" ? null : window;
}, il = function(t, n) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let r = null;
  const i = "data-tt-policy-suffix";
  n && n.hasAttribute(i) && (r = n.getAttribute(i));
  const a = "dompurify" + (r ? "#" + r : "");
  try {
    return t.createPolicy(a, {
      createHTML(l) {
        return l;
      },
      createScriptURL(l) {
        return l;
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
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : rl();
  const t = (L) => Hi(L);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== Jt.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: l,
    Node: o,
    Element: s,
    NodeFilter: c,
    NamedNodeMap: u = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: C,
    trustedTypes: p
  } = e, _ = s.prototype, S = Qt(_, "cloneNode"), N = Qt(_, "remove"), E = Qt(_, "nextSibling"), F = Qt(_, "childNodes"), R = Qt(_, "parentNode");
  if (typeof l == "function") {
    const L = n.createElement("template");
    L.content && L.content.ownerDocument && (n = L.content.ownerDocument);
  }
  let H, V = "";
  const {
    implementation: y,
    createNodeIterator: U,
    createDocumentFragment: j,
    getElementsByTagName: Z
  } = n, {
    importNode: O
  } = r;
  let b = Ur();
  t.isSupported = typeof Oi == "function" && typeof R == "function" && y && y.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: M,
    ERB_EXPR: X,
    TMPLIT_EXPR: ae,
    DATA_ATTR: q,
    ARIA_ATTR: we,
    IS_SCRIPT_OR_DATA: de,
    ATTR_WHITESPACE: be,
    CUSTOM_ELEMENT: We
  } = Hr;
  let {
    IS_ALLOWED_URI: g
  } = Hr, Q = null;
  const Ne = Y({}, [...Mr, ...Un, ...Fn, ...zn, ...Or]);
  let f = null;
  const fe = Y({}, [...Dr, ...Bn, ...Pr, ...fn]);
  let ee = Object.seal(Jn(null, {
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
  })), le = null, ze = null;
  const Ee = Object.seal(Jn(null, {
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
  let Ye = !0, Ke = !0, pt = !1, Ot = !0, Qe = !1, dt = !0, Oe = !1, De = !1, _t = !1, Ae = !1, Je = !1, Le = !1, Dt = !0, Pt = !1;
  const Wt = "user-content-";
  let Rt = !0, ft = !1, w = {}, T = null;
  const P = Y({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let $ = null;
  const J = Y({}, ["audio", "video", "img", "source", "image", "track"]);
  let xe = null;
  const Ze = Y({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Ie = "http://www.w3.org/1998/Math/MathML", Re = "http://www.w3.org/2000/svg", me = "http://www.w3.org/1999/xhtml";
  let pe = me, et = !1, Pe = null;
  const Nn = Y({}, [Ie, Re, me], Pn);
  let Et = Y({}, ["mi", "mo", "mn", "ms", "mtext"]), vt = Y({}, ["annotation-xml"]);
  const Ln = Y({}, ["title", "style", "font", "a", "script"]);
  let Ht = null;
  const Mn = ["application/xhtml+xml", "text/html"], cn = "text/html";
  let ge = null, xt = null;
  const On = n.createElement("form"), hn = function(m) {
    return m instanceof RegExp || m instanceof Function;
  }, Zt = function() {
    let m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(xt && xt === m)) {
      if ((!m || typeof m != "object") && (m = {}), m = yt(m), Ht = // eslint-disable-next-line unicorn/prefer-includes
      Mn.indexOf(m.PARSER_MEDIA_TYPE) === -1 ? cn : m.PARSER_MEDIA_TYPE, ge = Ht === "application/xhtml+xml" ? Pn : yn, Q = at(m, "ALLOWED_TAGS") ? Y({}, m.ALLOWED_TAGS, ge) : Ne, f = at(m, "ALLOWED_ATTR") ? Y({}, m.ALLOWED_ATTR, ge) : fe, Pe = at(m, "ALLOWED_NAMESPACES") ? Y({}, m.ALLOWED_NAMESPACES, Pn) : Nn, xe = at(m, "ADD_URI_SAFE_ATTR") ? Y(yt(Ze), m.ADD_URI_SAFE_ATTR, ge) : Ze, $ = at(m, "ADD_DATA_URI_TAGS") ? Y(yt(J), m.ADD_DATA_URI_TAGS, ge) : J, T = at(m, "FORBID_CONTENTS") ? Y({}, m.FORBID_CONTENTS, ge) : P, le = at(m, "FORBID_TAGS") ? Y({}, m.FORBID_TAGS, ge) : yt({}), ze = at(m, "FORBID_ATTR") ? Y({}, m.FORBID_ATTR, ge) : yt({}), w = at(m, "USE_PROFILES") ? m.USE_PROFILES : !1, Ye = m.ALLOW_ARIA_ATTR !== !1, Ke = m.ALLOW_DATA_ATTR !== !1, pt = m.ALLOW_UNKNOWN_PROTOCOLS || !1, Ot = m.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Qe = m.SAFE_FOR_TEMPLATES || !1, dt = m.SAFE_FOR_XML !== !1, Oe = m.WHOLE_DOCUMENT || !1, Ae = m.RETURN_DOM || !1, Je = m.RETURN_DOM_FRAGMENT || !1, Le = m.RETURN_TRUSTED_TYPE || !1, _t = m.FORCE_BODY || !1, Dt = m.SANITIZE_DOM !== !1, Pt = m.SANITIZE_NAMED_PROPS || !1, Rt = m.KEEP_CONTENT !== !1, ft = m.IN_PLACE || !1, g = m.ALLOWED_URI_REGEXP || Di, pe = m.NAMESPACE || me, Et = m.MATHML_TEXT_INTEGRATION_POINTS || Et, vt = m.HTML_INTEGRATION_POINTS || vt, ee = m.CUSTOM_ELEMENT_HANDLING || {}, m.CUSTOM_ELEMENT_HANDLING && hn(m.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (ee.tagNameCheck = m.CUSTOM_ELEMENT_HANDLING.tagNameCheck), m.CUSTOM_ELEMENT_HANDLING && hn(m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (ee.attributeNameCheck = m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), m.CUSTOM_ELEMENT_HANDLING && typeof m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (ee.allowCustomizedBuiltInElements = m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Qe && (Ke = !1), Je && (Ae = !0), w && (Q = Y({}, Or), f = [], w.html === !0 && (Y(Q, Mr), Y(f, Dr)), w.svg === !0 && (Y(Q, Un), Y(f, Bn), Y(f, fn)), w.svgFilters === !0 && (Y(Q, Fn), Y(f, Bn), Y(f, fn)), w.mathMl === !0 && (Y(Q, zn), Y(f, Pr), Y(f, fn))), m.ADD_TAGS && (typeof m.ADD_TAGS == "function" ? Ee.tagCheck = m.ADD_TAGS : (Q === Ne && (Q = yt(Q)), Y(Q, m.ADD_TAGS, ge))), m.ADD_ATTR && (typeof m.ADD_ATTR == "function" ? Ee.attributeCheck = m.ADD_ATTR : (f === fe && (f = yt(f)), Y(f, m.ADD_ATTR, ge))), m.ADD_URI_SAFE_ATTR && Y(xe, m.ADD_URI_SAFE_ATTR, ge), m.FORBID_CONTENTS && (T === P && (T = yt(T)), Y(T, m.FORBID_CONTENTS, ge)), Rt && (Q["#text"] = !0), Oe && Y(Q, ["html", "head", "body"]), Q.table && (Y(Q, ["tbody"]), delete le.tbody), m.TRUSTED_TYPES_POLICY) {
        if (typeof m.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Kt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof m.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Kt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        H = m.TRUSTED_TYPES_POLICY, V = H.createHTML("");
      } else
        H === void 0 && (H = il(p, i)), H !== null && typeof V == "string" && (V = H.createHTML(""));
      Ue && Ue(m), xt = m;
    }
  }, pn = Y({}, [...Un, ...Fn, ...Za]), qt = Y({}, [...zn, ...qa]), I = function(m) {
    let x = R(m);
    (!x || !x.tagName) && (x = {
      namespaceURI: pe,
      tagName: "template"
    });
    const v = yn(m.tagName), ne = yn(x.tagName);
    return Pe[m.namespaceURI] ? m.namespaceURI === Re ? x.namespaceURI === me ? v === "svg" : x.namespaceURI === Ie ? v === "svg" && (ne === "annotation-xml" || Et[ne]) : !!pn[v] : m.namespaceURI === Ie ? x.namespaceURI === me ? v === "math" : x.namespaceURI === Re ? v === "math" && vt[ne] : !!qt[v] : m.namespaceURI === me ? x.namespaceURI === Re && !vt[ne] || x.namespaceURI === Ie && !Et[ne] ? !1 : !qt[v] && (Ln[v] || !pn[v]) : !!(Ht === "application/xhtml+xml" && Pe[m.namespaceURI]) : !1;
  }, D = function(m) {
    Xt(t.removed, {
      element: m
    });
    try {
      R(m).removeChild(m);
    } catch {
      N(m);
    }
  }, te = function(m, x) {
    try {
      Xt(t.removed, {
        attribute: x.getAttributeNode(m),
        from: x
      });
    } catch {
      Xt(t.removed, {
        attribute: null,
        from: x
      });
    }
    if (x.removeAttribute(m), m === "is")
      if (Ae || Je)
        try {
          D(x);
        } catch {
        }
      else
        try {
          x.setAttribute(m, "");
        } catch {
        }
  }, G = function(m) {
    let x = null, v = null;
    if (_t)
      m = "<remove></remove>" + m;
    else {
      const Ce = Hn(m, /^[\r\n\t ]+/);
      v = Ce && Ce[0];
    }
    Ht === "application/xhtml+xml" && pe === me && (m = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + m + "</body></html>");
    const ne = H ? H.createHTML(m) : m;
    if (pe === me)
      try {
        x = new C().parseFromString(ne, Ht);
      } catch {
      }
    if (!x || !x.documentElement) {
      x = y.createDocument(pe, "template", null);
      try {
        x.documentElement.innerHTML = et ? V : ne;
      } catch {
      }
    }
    const Te = x.body || x.documentElement;
    return m && v && Te.insertBefore(n.createTextNode(v), Te.childNodes[0] || null), pe === me ? Z.call(x, Oe ? "html" : "body")[0] : Oe ? x.documentElement : Te;
  }, ue = function(m) {
    return U.call(
      m.ownerDocument || m,
      m,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, ce = function(m) {
    return m instanceof d && (typeof m.nodeName != "string" || typeof m.textContent != "string" || typeof m.removeChild != "function" || !(m.attributes instanceof u) || typeof m.removeAttribute != "function" || typeof m.setAttribute != "function" || typeof m.namespaceURI != "string" || typeof m.insertBefore != "function" || typeof m.hasChildNodes != "function");
  }, Se = function(m) {
    return typeof o == "function" && m instanceof o;
  };
  function _e(L, m, x) {
    dn(L, (v) => {
      v.call(t, m, x, xt);
    });
  }
  const rt = function(m) {
    let x = null;
    if (_e(b.beforeSanitizeElements, m, null), ce(m))
      return D(m), !0;
    const v = ge(m.nodeName);
    if (_e(b.uponSanitizeElement, m, {
      tagName: v,
      allowedTags: Q
    }), dt && m.hasChildNodes() && !Se(m.firstElementChild) && He(/<[/\w!]/g, m.innerHTML) && He(/<[/\w!]/g, m.textContent) || m.nodeType === Jt.progressingInstruction || dt && m.nodeType === Jt.comment && He(/<[/\w]/g, m.data))
      return D(m), !0;
    if (!(Ee.tagCheck instanceof Function && Ee.tagCheck(v)) && (!Q[v] || le[v])) {
      if (!le[v] && St(v) && (ee.tagNameCheck instanceof RegExp && He(ee.tagNameCheck, v) || ee.tagNameCheck instanceof Function && ee.tagNameCheck(v)))
        return !1;
      if (Rt && !T[v]) {
        const ne = R(m) || m.parentNode, Te = F(m) || m.childNodes;
        if (Te && ne) {
          const Ce = Te.length;
          for (let Be = Ce - 1; Be >= 0; --Be) {
            const gt = S(Te[Be], !0);
            gt.__removalCount = (m.__removalCount || 0) + 1, ne.insertBefore(gt, E(m));
          }
        }
      }
      return D(m), !0;
    }
    return m instanceof s && !I(m) || (v === "noscript" || v === "noembed" || v === "noframes") && He(/<\/no(script|embed|frames)/i, m.innerHTML) ? (D(m), !0) : (Qe && m.nodeType === Jt.text && (x = m.textContent, dn([M, X, ae], (ne) => {
      x = Yt(x, ne, " ");
    }), m.textContent !== x && (Xt(t.removed, {
      element: m.cloneNode()
    }), m.textContent = x)), _e(b.afterSanitizeElements, m, null), !1);
  }, mt = function(m, x, v) {
    if (Dt && (x === "id" || x === "name") && (v in n || v in On))
      return !1;
    if (!(Ke && !ze[x] && He(q, x))) {
      if (!(Ye && He(we, x))) {
        if (!(Ee.attributeCheck instanceof Function && Ee.attributeCheck(x, m))) {
          if (!f[x] || ze[x]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(St(m) && (ee.tagNameCheck instanceof RegExp && He(ee.tagNameCheck, m) || ee.tagNameCheck instanceof Function && ee.tagNameCheck(m)) && (ee.attributeNameCheck instanceof RegExp && He(ee.attributeNameCheck, x) || ee.attributeNameCheck instanceof Function && ee.attributeNameCheck(x, m)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              x === "is" && ee.allowCustomizedBuiltInElements && (ee.tagNameCheck instanceof RegExp && He(ee.tagNameCheck, v) || ee.tagNameCheck instanceof Function && ee.tagNameCheck(v)))
            ) return !1;
          } else if (!xe[x]) {
            if (!He(g, Yt(v, be, ""))) {
              if (!((x === "src" || x === "xlink:href" || x === "href") && m !== "script" && Va(v, "data:") === 0 && $[m])) {
                if (!(pt && !He(de, Yt(v, be, "")))) {
                  if (v)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, St = function(m) {
    return m !== "annotation-xml" && Hn(m, We);
  }, Tt = function(m) {
    _e(b.beforeSanitizeAttributes, m, null);
    const {
      attributes: x
    } = m;
    if (!x || ce(m))
      return;
    const v = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: f,
      forceKeepAttr: void 0
    };
    let ne = x.length;
    for (; ne--; ) {
      const Te = x[ne], {
        name: Ce,
        namespaceURI: Be,
        value: gt
      } = Te, Ut = ge(Ce), Dn = gt;
      let ve = Ce === "value" ? Dn : ja(Dn);
      if (v.attrName = Ut, v.attrValue = ve, v.keepAttr = !0, v.forceKeepAttr = void 0, _e(b.uponSanitizeAttribute, m, v), ve = v.attrValue, Pt && (Ut === "id" || Ut === "name") && (te(Ce, m), ve = Wt + ve), dt && He(/((--!?|])>)|<\/(style|title|textarea)/i, ve)) {
        te(Ce, m);
        continue;
      }
      if (Ut === "attributename" && Hn(ve, "href")) {
        te(Ce, m);
        continue;
      }
      if (v.forceKeepAttr)
        continue;
      if (!v.keepAttr) {
        te(Ce, m);
        continue;
      }
      if (!Ot && He(/\/>/i, ve)) {
        te(Ce, m);
        continue;
      }
      Qe && dn([M, X, ae], (vr) => {
        ve = Yt(ve, vr, " ");
      });
      const Rr = ge(m.nodeName);
      if (!mt(Rr, Ut, ve)) {
        te(Ce, m);
        continue;
      }
      if (H && typeof p == "object" && typeof p.getAttributeType == "function" && !Be)
        switch (p.getAttributeType(Rr, Ut)) {
          case "TrustedHTML": {
            ve = H.createHTML(ve);
            break;
          }
          case "TrustedScriptURL": {
            ve = H.createScriptURL(ve);
            break;
          }
        }
      if (ve !== Dn)
        try {
          Be ? m.setAttributeNS(Be, Ce, ve) : m.setAttribute(Ce, ve), ce(m) ? D(m) : Lr(t.removed);
        } catch {
          te(Ce, m);
        }
    }
    _e(b.afterSanitizeAttributes, m, null);
  }, it = function L(m) {
    let x = null;
    const v = ue(m);
    for (_e(b.beforeSanitizeShadowDOM, m, null); x = v.nextNode(); )
      _e(b.uponSanitizeShadowNode, x, null), rt(x), Tt(x), x.content instanceof a && L(x.content);
    _e(b.afterSanitizeShadowDOM, m, null);
  };
  return t.sanitize = function(L) {
    let m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, x = null, v = null, ne = null, Te = null;
    if (et = !L, et && (L = "<!-->"), typeof L != "string" && !Se(L))
      if (typeof L.toString == "function") {
        if (L = L.toString(), typeof L != "string")
          throw Kt("dirty is not a string, aborting");
      } else
        throw Kt("toString is not a function");
    if (!t.isSupported)
      return L;
    if (De || Zt(m), t.removed = [], typeof L == "string" && (ft = !1), ft) {
      if (L.nodeName) {
        const gt = ge(L.nodeName);
        if (!Q[gt] || le[gt])
          throw Kt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (L instanceof o)
      x = G("<!---->"), v = x.ownerDocument.importNode(L, !0), v.nodeType === Jt.element && v.nodeName === "BODY" || v.nodeName === "HTML" ? x = v : x.appendChild(v);
    else {
      if (!Ae && !Qe && !Oe && // eslint-disable-next-line unicorn/prefer-includes
      L.indexOf("<") === -1)
        return H && Le ? H.createHTML(L) : L;
      if (x = G(L), !x)
        return Ae ? null : Le ? V : "";
    }
    x && _t && D(x.firstChild);
    const Ce = ue(ft ? L : x);
    for (; ne = Ce.nextNode(); )
      rt(ne), Tt(ne), ne.content instanceof a && it(ne.content);
    if (ft)
      return L;
    if (Ae) {
      if (Je)
        for (Te = j.call(x.ownerDocument); x.firstChild; )
          Te.appendChild(x.firstChild);
      else
        Te = x;
      return (f.shadowroot || f.shadowrootmode) && (Te = O.call(r, Te, !0)), Te;
    }
    let Be = Oe ? x.outerHTML : x.innerHTML;
    return Oe && Q["!doctype"] && x.ownerDocument && x.ownerDocument.doctype && x.ownerDocument.doctype.name && He(Pi, x.ownerDocument.doctype.name) && (Be = "<!DOCTYPE " + x.ownerDocument.doctype.name + `>
` + Be), Qe && dn([M, X, ae], (gt) => {
      Be = Yt(Be, gt, " ");
    }), H && Le ? H.createHTML(Be) : Be;
  }, t.setConfig = function() {
    let L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Zt(L), De = !0;
  }, t.clearConfig = function() {
    xt = null, De = !1;
  }, t.isValidAttribute = function(L, m, x) {
    xt || Zt({});
    const v = ge(L), ne = ge(m);
    return mt(v, ne, x);
  }, t.addHook = function(L, m) {
    typeof m == "function" && Xt(b[L], m);
  }, t.removeHook = function(L, m) {
    if (m !== void 0) {
      const x = Ba(b[L], m);
      return x === -1 ? void 0 : Ga(b[L], x, 1)[0];
    }
    return Lr(b[L]);
  }, t.removeHooks = function(L) {
    b[L] = [];
  }, t.removeAllHooks = function() {
    b = Ur();
  }, t;
}
var al = Hi();
function ll(e) {
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
function wn(e, t = !1) {
  return e;
}
function ol(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function Fr(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || ll(e));
  } catch {
    return !1;
  }
}
function sl() {
  al.addHook("beforeSanitizeAttributes", (e) => {
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
sl();
const ul = dr(
  ({
    placeholder: e = "What would you like to know?",
    placeholderTexts: t,
    disabled: n = !1,
    chatStatus: r,
    fileUploadEnabled: i = !1,
    restaurantName: a,
    restaurantLogo: l,
    hasMessages: o = !1,
    onSubmit: s,
    onFileUpload: c,
    onStopGeneration: u
  }, d) => {
    const [C, p] = K(""), [_, S] = K([]), N = Ct(null), E = t && t.length > 0 ? t : [e], F = C.length === 0 && !o && E.length > 1;
    va(d, () => ({
      focus: () => {
        var y;
        (y = N.current) == null || y.focus();
      },
      setText: (y) => {
        p(y), setTimeout(() => {
          var U;
          (U = N.current) == null || U.focus();
        }, 0);
      }
    }));
    const R = he(
      (y) => {
        y.preventDefault();
        const j = new FormData(y.currentTarget).get("message");
        if (j != null && j.trim()) {
          const Z = wn(j.trim(), !1);
          if (!Z.trim()) {
            console.warn("Message was blocked due to security concerns");
            return;
          }
          s(Z, _), p(""), S([]);
        }
      },
      [s, _]
    ), H = he(
      (y) => {
        const j = y.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
        p(j);
      },
      []
    ), V = he(async () => {
      const y = document.createElement("input");
      y.type = "file", y.accept = "image/*", y.multiple = !1, y.onchange = async (U) => {
        const j = U.target.files;
        if (j) {
          const Z = Array.from(j).filter((O) => {
            const b = ol(O.name);
            return b !== O.name && console.warn(
              `File name sanitized: ${O.name} -> ${b}`
            ), O.size > 10485760 ? (console.warn(`File too large: ${O.name} (${O.size} bytes)`), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ].includes(O.type) ? !0 : (console.warn(
              `File type not allowed: ${O.name} (${O.type})`
            ), !1);
          });
          if (Z.length > 0) {
            const O = await c(Z);
            S(O);
          }
        }
      }, y.click();
    }, [c]);
    return /* @__PURE__ */ A(La, { onSubmit: R, style: { position: "relative" }, children: [
      /* @__PURE__ */ h(
        Mi,
        {
          ref: N,
          name: "message",
          value: C,
          onChange: H,
          placeholder: "",
          disabled: n
        }
      ),
      !C.trim() && /* @__PURE__ */ h(
        Ha,
        {
          placeholderTexts: E,
          shouldAnimate: F
        }
      ),
      _.length > 0 && /* @__PURE__ */ h(
        "div",
        {
          style: {
            padding: "8px 16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center"
          },
          children: _.map((y, U) => {
            const j = y.startsWith("data:image/"), Z = y.startsWith("http://") || y.startsWith("https://"), O = j || Z;
            return /* @__PURE__ */ A(
              "div",
              {
                style: {
                  position: "relative",
                  display: "inline-block"
                },
                children: [
                  O ? /* @__PURE__ */ A(
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
                        /* @__PURE__ */ h(
                          "img",
                          {
                            src: y,
                            alt: `Attachment ${U + 1}`,
                            style: {
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }
                          }
                        ),
                        /* @__PURE__ */ h(
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
                  ) : /* @__PURE__ */ A(
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
                        /* @__PURE__ */ h(
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
                            children: /* @__PURE__ */ A(
                              "svg",
                              {
                                width: "24",
                                height: "25",
                                viewBox: "0 0 24 25",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: [
                                  /* @__PURE__ */ h(
                                    "mask",
                                    {
                                      id: "mask0_190_623",
                                      style: { maskType: "alpha" },
                                      maskUnits: "userSpaceOnUse",
                                      x: "0",
                                      y: "0",
                                      width: "24",
                                      height: "25",
                                      children: /* @__PURE__ */ h(
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
                                  /* @__PURE__ */ h("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ h(
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
                        /* @__PURE__ */ A("div", { style: { flex: 1, minWidth: 0 }, children: [
                          /* @__PURE__ */ h(
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
                                const b = y.match(/name=([^;]+)/);
                                return b ? decodeURIComponent(b[1]) : "document.pdf";
                              })()
                            }
                          ),
                          /* @__PURE__ */ h(
                            "div",
                            {
                              style: {
                                color: "#9ca3af",
                                fontSize: "12px",
                                textTransform: "uppercase"
                              },
                              children: (() => {
                                const b = y.match(/data:([^;]+)/);
                                if (b) {
                                  const M = b[1];
                                  switch (M) {
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
                                      const X = M.split("/")[1];
                                      return X ? X.toUpperCase().substring(0, 4) : "FILE";
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
                  /* @__PURE__ */ h(
                    "button",
                    {
                      onClick: () => {
                        S(
                          (b) => b.filter((M, X) => X !== U)
                        );
                      },
                      style: {
                        position: "absolute",
                        top: O ? "6px" : "8px",
                        right: O ? "6px" : "8px",
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
              U
            );
          })
        }
      ),
      /* @__PURE__ */ A(Ma, { children: [
        /* @__PURE__ */ A(Oa, { children: [
          i && /* @__PURE__ */ A(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center"
              },
              children: [
                /* @__PURE__ */ h(
                  Da,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: V,
                    title: _.length > 0 ? `${_.length} image(s) attached` : "Attach image",
                    disabled: n,
                    style: {
                      position: "relative"
                    },
                    children: /* @__PURE__ */ A(
                      "svg",
                      {
                        width: "36",
                        height: "37",
                        viewBox: "0 0 36 37",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [
                          /* @__PURE__ */ h(
                            "rect",
                            {
                              y: "0.354126",
                              width: "36",
                              height: "36",
                              rx: "18",
                              fill: "#F4F6F8"
                            }
                          ),
                          /* @__PURE__ */ h("g", { "clip-path": "url(#clip0_121_9706)", children: /* @__PURE__ */ h(
                            "path",
                            {
                              d: "M21.3334 13.3541V22.9374C21.3334 24.7791 19.8417 26.2708 18 26.2708C16.1584 26.2708 14.6667 24.7791 14.6667 22.9374V12.5208C14.6667 11.3708 15.6 10.4374 16.75 10.4374C17.9 10.4374 18.8334 11.3708 18.8334 12.5208V21.2708C18.8334 21.7291 18.4584 22.1041 18 22.1041C17.5417 22.1041 17.1667 21.7291 17.1667 21.2708V13.3541H15.9167V21.2708C15.9167 22.4208 16.85 23.3541 18 23.3541C19.15 23.3541 20.0834 22.4208 20.0834 21.2708V12.5208C20.0834 10.6791 18.5917 9.18744 16.75 9.18744C14.9084 9.18744 13.4167 10.6791 13.4167 12.5208V22.9374C13.4167 25.4708 15.4667 27.5208 18 27.5208C20.5334 27.5208 22.5834 25.4708 22.5834 22.9374V13.3541H21.3334Z",
                              fill: "#212B36"
                            }
                          ) }),
                          /* @__PURE__ */ h("defs", { children: /* @__PURE__ */ h("clipPath", { id: "clip0_121_9706", children: /* @__PURE__ */ h(
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
                /* @__PURE__ */ h(
                  "span",
                  {
                    onClick: V,
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
          i && a && /* @__PURE__ */ h("div", { className: "chat-wrapper__divider" }),
          a && /* @__PURE__ */ A("div", { className: "chat-wrapper__restaurant-chip", children: [
            l && /* @__PURE__ */ h(
              "img",
              {
                src: l,
                alt: "Restaurant logo",
                className: "chat-wrapper__restaurant-logo"
              }
            ),
            /* @__PURE__ */ h("span", { className: "chat-wrapper__restaurant-name", children: a })
          ] })
        ] }),
        /* @__PURE__ */ h(
          Pa,
          {
            status: r,
            disabled: !C.trim() && r !== "streaming",
            onClick: r === "streaming" && u ? () => {
              u();
            } : void 0
          }
        )
      ] })
    ] });
  }
), cl = ({
  prompts: e,
  onPromptSelect: t
}) => /* @__PURE__ */ A("div", { className: "chat-wrapper__suggested-prompts", children: [
  /* @__PURE__ */ h("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
  /* @__PURE__ */ h("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((n, r) => /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__suggested-prompt-card",
      onClick: () => t(n),
      children: /* @__PURE__ */ A("div", { className: "chat-wrapper__suggested-prompt-content", children: [
        /* @__PURE__ */ h("h4", { className: "chat-wrapper__suggested-prompt-title", children: n.title }),
        /* @__PURE__ */ h("p", { className: "chat-wrapper__suggested-prompt-description", children: n.description })
      ] })
    },
    r
  )) })
] });
function Ui({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ A("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ h("span", {}),
    /* @__PURE__ */ h("span", {}),
    /* @__PURE__ */ h("span", {})
  ] }) : t === "pulse" ? /* @__PURE__ */ h(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ h(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: e, height: e }
    }
  );
}
const hl = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ h(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ h("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ h(Ui, { size: e, variant: "dots" }) })
  }
);
async function pl(e, t) {
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
async function dl(e, t, n) {
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
const fl = ({
  isOpen: e,
  onClose: t,
  app: n,
  apiUrl: r
}) => {
  const [i, a] = K(null), [l, o] = K(""), [s, c] = K(""), [u, d] = K(!1), [C, p] = K(null);
  ut(() => {
    e && !i && _();
  }, [e]);
  const _ = he(async () => {
    d(!0), p(null);
    try {
      const E = await pl(r, n);
      a(E), o(E.promptPath), c(E.versionUuid);
    } catch (E) {
      p(E instanceof Error ? E.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", E);
    } finally {
      d(!1);
    }
  }, [r, n]), S = he(async () => {
    if (i) {
      d(!0), p(null);
      try {
        const E = await dl(r, n, {
          promptPath: l,
          versionUuid: s,
          isDefault: i.isDefault
        });
        a(E), t(), window.location.reload();
      } catch (E) {
        p(E instanceof Error ? E.message : "Failed to update configuration"), console.error("Error updating agent configuration:", E);
      } finally {
        d(!1);
      }
    }
  }, [r, n, l, s, i, t]), N = he(() => {
    i && (o(i.promptPath), c(i.versionUuid)), p(null), t();
  }, [i, t]);
  return e ? /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ h("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: N,
          title: "Close settings",
          children: /* @__PURE__ */ h(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ h(
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
    /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-content", children: [
      u && /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      C && /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ A("p", { children: [
          "Error: ",
          C
        ] }),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: _,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      i && !u && /* @__PURE__ */ A(ln, { children: [
        /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: l,
              onChange: (E) => o(E.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: u
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ h("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ h(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: s,
              onChange: (E) => c(E.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: u
            }
          ),
          /* @__PURE__ */ h("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ h("div", { className: "chat-wrapper__dev-settings-info", children: /* @__PURE__ */ A("p", { children: [
          /* @__PURE__ */ h("strong", { children: "App:" }),
          " ",
          n
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ A("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ h(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: N,
          disabled: u,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ h(
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
function ml(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const gl = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Cl = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, yl = {};
function zr(e, t) {
  return (yl.jsx ? Cl : gl).test(e);
}
const wl = /[ \t\n\f\r]/g;
function _l(e) {
  return typeof e == "object" ? e.type === "text" ? Br(e.value) : !1 : Br(e);
}
function Br(e) {
  return e.replace(wl, "") === "";
}
class sn {
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
sn.prototype.normal = {};
sn.prototype.property = {};
sn.prototype.space = void 0;
function Fi(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new sn(n, r, t);
}
function nr(e) {
  return e.toLowerCase();
}
class $e {
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
$e.prototype.attribute = "";
$e.prototype.booleanish = !1;
$e.prototype.boolean = !1;
$e.prototype.commaOrSpaceSeparated = !1;
$e.prototype.commaSeparated = !1;
$e.prototype.defined = !1;
$e.prototype.mustUseProperty = !1;
$e.prototype.number = !1;
$e.prototype.overloadedBoolean = !1;
$e.prototype.property = "";
$e.prototype.spaceSeparated = !1;
$e.prototype.space = void 0;
let El = 0;
const W = Mt(), ye = Mt(), rr = Mt(), k = Mt(), oe = Mt(), Bt = Mt(), qe = Mt();
function Mt() {
  return 2 ** ++El;
}
const ir = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: W,
  booleanish: ye,
  commaOrSpaceSeparated: qe,
  commaSeparated: Bt,
  number: k,
  overloadedBoolean: rr,
  spaceSeparated: oe
}, Symbol.toStringTag, { value: "Module" })), Gn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(ir)
);
class fr extends $e {
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
      for (; ++a < Gn.length; ) {
        const l = Gn[a];
        Gr(this, Gn[a], (r & ir[l]) === ir[l]);
      }
  }
}
fr.prototype.defined = !0;
function Gr(e, t, n) {
  n && (e[t] = n);
}
function jt(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new fr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[nr(r)] = r, n[nr(a.attribute)] = r;
  }
  return new sn(t, n, e.space);
}
const zi = jt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: ye,
    ariaAutoComplete: null,
    ariaBusy: ye,
    ariaChecked: ye,
    ariaColCount: k,
    ariaColIndex: k,
    ariaColSpan: k,
    ariaControls: oe,
    ariaCurrent: null,
    ariaDescribedBy: oe,
    ariaDetails: null,
    ariaDisabled: ye,
    ariaDropEffect: oe,
    ariaErrorMessage: null,
    ariaExpanded: ye,
    ariaFlowTo: oe,
    ariaGrabbed: ye,
    ariaHasPopup: null,
    ariaHidden: ye,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: oe,
    ariaLevel: k,
    ariaLive: null,
    ariaModal: ye,
    ariaMultiLine: ye,
    ariaMultiSelectable: ye,
    ariaOrientation: null,
    ariaOwns: oe,
    ariaPlaceholder: null,
    ariaPosInSet: k,
    ariaPressed: ye,
    ariaReadOnly: ye,
    ariaRelevant: null,
    ariaRequired: ye,
    ariaRoleDescription: oe,
    ariaRowCount: k,
    ariaRowIndex: k,
    ariaRowSpan: k,
    ariaSelected: ye,
    ariaSetSize: k,
    ariaSort: null,
    ariaValueMax: k,
    ariaValueMin: k,
    ariaValueNow: k,
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
const xl = jt({
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
    accept: Bt,
    acceptCharset: oe,
    accessKey: oe,
    action: null,
    allow: null,
    allowFullScreen: W,
    allowPaymentRequest: W,
    allowUserMedia: W,
    alt: null,
    as: null,
    async: W,
    autoCapitalize: null,
    autoComplete: oe,
    autoFocus: W,
    autoPlay: W,
    blocking: oe,
    capture: null,
    charSet: null,
    checked: W,
    cite: null,
    className: oe,
    cols: k,
    colSpan: null,
    content: null,
    contentEditable: ye,
    controls: W,
    controlsList: oe,
    coords: k | Bt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: W,
    defer: W,
    dir: null,
    dirName: null,
    disabled: W,
    download: rr,
    draggable: ye,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: W,
    formTarget: null,
    headers: oe,
    height: k,
    hidden: rr,
    high: k,
    href: null,
    hrefLang: null,
    htmlFor: oe,
    httpEquiv: oe,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: W,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: W,
    itemId: null,
    itemProp: oe,
    itemRef: oe,
    itemScope: W,
    itemType: oe,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: W,
    low: k,
    manifest: null,
    max: null,
    maxLength: k,
    media: null,
    method: null,
    min: null,
    minLength: k,
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
    optimum: k,
    pattern: null,
    ping: oe,
    placeholder: null,
    playsInline: W,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: W,
    referrerPolicy: null,
    rel: oe,
    required: W,
    reversed: W,
    rows: k,
    rowSpan: k,
    sandbox: oe,
    scope: null,
    scoped: W,
    seamless: W,
    selected: W,
    shadowRootClonable: W,
    shadowRootDelegatesFocus: W,
    shadowRootMode: null,
    shape: null,
    size: k,
    sizes: null,
    slot: null,
    span: k,
    spellCheck: ye,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: k,
    step: null,
    style: null,
    tabIndex: k,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: W,
    useMap: null,
    value: ye,
    width: k,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: oe,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: k,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: k,
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
    hSpace: k,
    // `<img>` and `<object>`
    leftMargin: k,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: k,
    // `<body>`
    marginWidth: k,
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
    rightMargin: k,
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
    topMargin: k,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: k,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: W,
    disableRemotePlayback: W,
    prefix: null,
    property: null,
    results: k,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Gi
}), Sl = jt({
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
    about: qe,
    accentHeight: k,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: k,
    amplitude: k,
    arabicForm: null,
    ascent: k,
    attributeName: null,
    attributeType: null,
    azimuth: k,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: k,
    by: null,
    calcMode: null,
    capHeight: k,
    className: oe,
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
    descent: k,
    diffuseConstant: k,
    direction: null,
    display: null,
    dur: null,
    divisor: k,
    dominantBaseline: null,
    download: W,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: k,
    enableBackground: null,
    end: null,
    event: null,
    exponent: k,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: k,
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
    g1: Bt,
    g2: Bt,
    glyphName: Bt,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: k,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: k,
    horizOriginX: k,
    horizOriginY: k,
    id: null,
    ideographic: k,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: k,
    k,
    k1: k,
    k2: k,
    k3: k,
    k4: k,
    kernelMatrix: qe,
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
    limitingConeAngle: k,
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
    mediaSize: k,
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
    overlinePosition: k,
    overlineThickness: k,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: k,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: oe,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: k,
    pointsAtY: k,
    pointsAtZ: k,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: qe,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: qe,
    rev: qe,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: qe,
    requiredFeatures: qe,
    requiredFonts: qe,
    requiredFormats: qe,
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
    specularConstant: k,
    specularExponent: k,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: k,
    strikethroughThickness: k,
    string: null,
    stroke: null,
    strokeDashArray: qe,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: k,
    strokeOpacity: k,
    strokeWidth: null,
    style: null,
    surfaceScale: k,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: qe,
    tabIndex: k,
    tableValues: null,
    target: null,
    targetX: k,
    targetY: k,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: qe,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: k,
    underlineThickness: k,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: k,
    values: null,
    vAlphabetic: k,
    vMathematical: k,
    vectorEffect: null,
    vHanging: k,
    vIdeographic: k,
    version: null,
    vertAdvY: k,
    vertOriginX: k,
    vertOriginY: k,
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
    xHeight: k,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Bi
}), Vi = jt({
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
}), ji = jt({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Gi
}), $i = jt({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), Tl = {
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
}, kl = /[A-Z]/g, Vr = /-[a-z]/g, bl = /^data[-\w.:]+$/i;
function Al(e, t) {
  const n = nr(t);
  let r = t, i = $e;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && bl.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(Vr, Rl);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!Vr.test(a)) {
        let l = a.replace(kl, Il);
        l.charAt(0) !== "-" && (l = "-" + l), t = "data" + l;
      }
    }
    i = fr;
  }
  return new i(r, t);
}
function Il(e) {
  return "-" + e.toLowerCase();
}
function Rl(e) {
  return e.charAt(1).toUpperCase();
}
const vl = Fi([zi, xl, Vi, ji, $i], "html"), mr = Fi([zi, Sl, Vi, ji, $i], "svg");
function Nl(e) {
  return e.join(" ").trim();
}
var Sn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Wi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var gr = {}, jr = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Ll = /\n/g, Ml = /^\s*/, Ol = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Dl = /^:\s*/, Pl = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Hl = /^[;\s]*/, Ul = /^\s+|\s+$/g, Fl = `
`, $r = "/", Wr = "*", Lt = "", zl = "comment", Bl = "declaration", Gl = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(_) {
    var S = _.match(Ll);
    S && (n += S.length);
    var N = _.lastIndexOf(Fl);
    r = ~N ? _.length - N : r + _.length;
  }
  function a() {
    var _ = { line: n, column: r };
    return function(S) {
      return S.position = new l(_), c(), S;
    };
  }
  function l(_) {
    this.start = _, this.end = { line: n, column: r }, this.source = t.source;
  }
  l.prototype.content = e;
  function o(_) {
    var S = new Error(
      t.source + ":" + n + ":" + r + ": " + _
    );
    if (S.reason = _, S.filename = t.source, S.line = n, S.column = r, S.source = e, !t.silent) throw S;
  }
  function s(_) {
    var S = _.exec(e);
    if (S) {
      var N = S[0];
      return i(N), e = e.slice(N.length), S;
    }
  }
  function c() {
    s(Ml);
  }
  function u(_) {
    var S;
    for (_ = _ || []; S = d(); )
      S !== !1 && _.push(S);
    return _;
  }
  function d() {
    var _ = a();
    if (!($r != e.charAt(0) || Wr != e.charAt(1))) {
      for (var S = 2; Lt != e.charAt(S) && (Wr != e.charAt(S) || $r != e.charAt(S + 1)); )
        ++S;
      if (S += 2, Lt === e.charAt(S - 1))
        return o("End of comment missing");
      var N = e.slice(2, S - 2);
      return r += 2, i(N), e = e.slice(S), r += 2, _({
        type: zl,
        comment: N
      });
    }
  }
  function C() {
    var _ = a(), S = s(Ol);
    if (S) {
      if (d(), !s(Dl)) return o("property missing ':'");
      var N = s(Pl), E = _({
        type: Bl,
        property: Zr(S[0].replace(jr, Lt)),
        value: N ? Zr(N[0].replace(jr, Lt)) : Lt
      });
      return s(Hl), E;
    }
  }
  function p() {
    var _ = [];
    u(_);
    for (var S; S = C(); )
      S !== !1 && (_.push(S), u(_));
    return _;
  }
  return c(), p();
};
function Zr(e) {
  return e ? e.replace(Ul, Lt) : Lt;
}
var Vl = Sn && Sn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.default = $l;
const jl = Vl(Gl);
function $l(e, t) {
  let n = null;
  if (!e || typeof e != "string")
    return n;
  const r = (0, jl.default)(e), i = typeof t == "function";
  return r.forEach((a) => {
    if (a.type !== "declaration")
      return;
    const { property: l, value: o } = a;
    i ? t(l, o, a) : o && (n = n || {}, n[l] = o);
  }), n;
}
var An = {};
Object.defineProperty(An, "__esModule", { value: !0 });
An.camelCase = void 0;
var Wl = /^--[a-zA-Z0-9_-]+$/, Zl = /-([a-z])/g, ql = /^[^-]+$/, Xl = /^-(webkit|moz|ms|o|khtml)-/, Yl = /^-(ms)-/, Kl = function(e) {
  return !e || ql.test(e) || Wl.test(e);
}, Ql = function(e, t) {
  return t.toUpperCase();
}, qr = function(e, t) {
  return "".concat(t, "-");
}, Jl = function(e, t) {
  return t === void 0 && (t = {}), Kl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Yl, qr) : e = e.replace(Xl, qr), e.replace(Zl, Ql));
};
An.camelCase = Jl;
var eo = Sn && Sn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, to = eo(gr), no = An;
function ar(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, to.default)(e, function(r, i) {
    r && i && (n[(0, no.camelCase)(r, t)] = i);
  }), n;
}
ar.default = ar;
var ro = ar;
const io = /* @__PURE__ */ Wi(ro), Zi = qi("end"), Cr = qi("start");
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
function ao(e) {
  const t = Cr(e), n = Zi(e);
  if (t && n)
    return { start: t, end: n };
}
function nn(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Xr(e.position) : "start" in e || "end" in e ? Xr(e) : "line" in e || "column" in e ? lr(e) : "";
}
function lr(e) {
  return Yr(e && e.line) + ":" + Yr(e && e.column);
}
function Xr(e) {
  return lr(e && e.start) + "-" + lr(e && e.end);
}
function Yr(e) {
  return e && typeof e == "number" ? e : 1;
}
class Me extends Error {
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
    let i = "", a = {}, l = !1;
    if (n && ("line" in n && "column" in n ? a = { place: n } : "start" in n && "end" in n ? a = { place: n } : "type" in n ? a = {
      ancestors: [n],
      place: n.position
    } : a = { ...n }), typeof t == "string" ? i = t : !a.cause && t && (l = !0, i = t.message, a.cause = t), !a.ruleId && !a.source && typeof r == "string") {
      const s = r.indexOf(":");
      s === -1 ? a.ruleId = r : (a.source = r.slice(0, s), a.ruleId = r.slice(s + 1));
    }
    if (!a.place && a.ancestors && a.ancestors) {
      const s = a.ancestors[a.ancestors.length - 1];
      s && (a.place = s.position);
    }
    const o = a.place && "start" in a.place ? a.place.start : a.place;
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = o ? o.line : void 0, this.name = nn(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = l && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Me.prototype.file = "";
Me.prototype.name = "";
Me.prototype.reason = "";
Me.prototype.message = "";
Me.prototype.stack = "";
Me.prototype.column = void 0;
Me.prototype.line = void 0;
Me.prototype.ancestors = void 0;
Me.prototype.cause = void 0;
Me.prototype.fatal = void 0;
Me.prototype.place = void 0;
Me.prototype.ruleId = void 0;
Me.prototype.source = void 0;
const yr = {}.hasOwnProperty, lo = /* @__PURE__ */ new Map(), oo = /[A-Z]/g, so = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), uo = /* @__PURE__ */ new Set(["td", "th"]), Xi = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function co(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = wo(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = yo(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? mr : vl,
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
    return ho(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return po(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return mo(e, t, n);
  if (t.type === "mdxjsEsm")
    return fo(e, t);
  if (t.type === "root")
    return go(e, t, n);
  if (t.type === "text")
    return Co(e, t);
}
function ho(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = mr, e.schema = i), e.ancestors.push(t);
  const a = Qi(e, t.tagName, !1), l = _o(e, t);
  let o = _r(e, t);
  return so.has(t.tagName) && (o = o.filter(function(s) {
    return typeof s == "string" ? !_l(s) : !0;
  })), Ki(e, l, a, t), wr(l, o), e.ancestors.pop(), e.schema = r, e.create(t, a, l, n);
}
function po(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  on(e, t.position);
}
function fo(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  on(e, t.position);
}
function mo(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = mr, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : Qi(e, t.name, !0), l = Eo(e, t), o = _r(e, t);
  return Ki(e, l, a, t), wr(l, o), e.ancestors.pop(), e.schema = r, e.create(t, a, l, n);
}
function go(e, t, n) {
  const r = {};
  return wr(r, _r(e, t)), e.create(t, e.Fragment, r, n);
}
function Co(e, t) {
  return t.value;
}
function Ki(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function wr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function yo(e, t, n) {
  return r;
  function r(i, a, l, o) {
    const c = Array.isArray(l.children) ? n : t;
    return o ? c(a, l, o) : c(a, l);
  }
}
function wo(e, t) {
  return n;
  function n(r, i, a, l) {
    const o = Array.isArray(a.children), s = Cr(r);
    return t(
      i,
      a,
      l,
      o,
      {
        columnNumber: s ? s.column - 1 : void 0,
        fileName: e,
        lineNumber: s ? s.line : void 0
      },
      void 0
    );
  }
}
function _o(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && yr.call(t.properties, i)) {
      const a = xo(e, i, t.properties[i]);
      if (a) {
        const [l, o] = a;
        e.tableCellAlignToStyle && l === "align" && typeof o == "string" && uo.has(t.tagName) ? r = o : n[l] = o;
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
function Eo(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const a = r.data.estree.body[0];
        a.type;
        const l = a.expression;
        l.type;
        const o = l.properties[0];
        o.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(o.argument)
        );
      } else
        on(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const o = r.value.data.estree.body[0];
          o.type, a = e.evaluater.evaluateExpression(o.expression);
        } else
          on(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function _r(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : lo;
  for (; ++r < t.children.length; ) {
    const a = t.children[r];
    let l;
    if (e.passKeys) {
      const s = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (s) {
        const c = i.get(s) || 0;
        l = s + "-" + c, i.set(s, c + 1);
      }
    }
    const o = Yi(e, a, l);
    o !== void 0 && n.push(o);
  }
  return n;
}
function xo(e, t, n) {
  const r = Al(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? ml(n) : Nl(n)), r.property === "style") {
      let i = typeof n == "object" ? n : So(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = To(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Tl[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function So(e, t) {
  try {
    return io(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new Me("Cannot parse `style` attribute", {
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
    let a = -1, l;
    for (; ++a < i.length; ) {
      const o = zr(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
      l = l ? {
        type: "MemberExpression",
        object: l,
        property: o,
        computed: !!(a && o.type === "Literal"),
        optional: !1
      } : o;
    }
    r = l;
  } else
    r = zr(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return yr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  on(e);
}
function on(e, t) {
  const n = new Me(
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
function To(e) {
  const t = {};
  let n;
  for (n in e)
    yr.call(e, n) && (t[ko(n)] = e[n]);
  return t;
}
function ko(e) {
  let t = e.replace(oo, bo);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function bo(e) {
  return "-" + e.toLowerCase();
}
const Vn = {
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
}, Ao = {};
function Io(e, t) {
  const n = Ao, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Ji(e, r, i);
}
function Ji(e, t, n) {
  if (Ro(e)) {
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
function Ro(e) {
  return !!(e && typeof e == "object");
}
const Qr = document.createElement("i");
function Er(e) {
  const t = "&" + e + ";";
  Qr.innerHTML = t;
  const n = Qr.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function ht(e, t, n, r) {
  const i = e.length;
  let a = 0, l;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    l = Array.from(r), l.unshift(t, n), e.splice(...l);
  else
    for (n && e.splice(t, n); a < r.length; )
      l = r.slice(a, a + 1e4), l.unshift(t, 0), e.splice(...l), a += 1e4, t += 1e4;
}
function tt(e, t) {
  return e.length > 0 ? (ht(e, e.length, 0, t), e) : t;
}
const Jr = {}.hasOwnProperty;
function vo(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    No(t, e[n]);
  return t;
}
function No(e, t) {
  let n;
  for (n in t) {
    const i = (Jr.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let l;
    if (a)
      for (l in a) {
        Jr.call(i, l) || (i[l] = []);
        const o = a[l];
        Lo(
          // @ts-expect-error Looks like a list.
          i[l],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function Lo(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  ht(e, 0, 0, r);
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
function Gt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const ct = It(/[A-Za-z]/), Xe = It(/[\dA-Za-z]/), Mo = It(/[#-'*+\--9=?A-Z^-~]/);
function or(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const sr = It(/\d/), Oo = It(/[\dA-Fa-f]/), Do = It(/[!-/:-@[-`{-~]/);
function B(e) {
  return e !== null && e < -2;
}
function je(e) {
  return e !== null && (e < 0 || e === 32);
}
function re(e) {
  return e === -2 || e === -1 || e === 32;
}
const Po = It(new RegExp("\\p{P}|\\p{S}", "u")), Ho = It(/\s/);
function It(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function $t(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let l = "";
    if (a === 37 && Xe(e.charCodeAt(n + 1)) && Xe(e.charCodeAt(n + 2)))
      i = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (l = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const o = e.charCodeAt(n + 1);
      a < 56320 && o > 56319 && o < 57344 ? (l = String.fromCharCode(a, o), i = 1) : l = "�";
    } else
      l = String.fromCharCode(a);
    l && (t.push(e.slice(r, n), encodeURIComponent(l)), r = n + i + 1, l = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function se(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return l;
  function l(s) {
    return re(s) ? (e.enter(n), o(s)) : t(s);
  }
  function o(s) {
    return re(s) && a++ < i ? (e.consume(s), o) : (e.exit(n), t(s));
  }
}
const Uo = {
  tokenize: Fo
};
function Fo(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), se(e, t, "linePrefix");
  }
  function i(o) {
    return e.enter("paragraph"), a(o);
  }
  function a(o) {
    const s = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = s), n = s, l(o);
  }
  function l(o) {
    if (o === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(o);
      return;
    }
    return B(o) ? (e.consume(o), e.exit("chunkText"), a) : (e.consume(o), l);
  }
}
const zo = {
  tokenize: Bo
}, ei = {
  tokenize: Go
};
function Bo(e) {
  const t = this, n = [];
  let r = 0, i, a, l;
  return o;
  function o(R) {
    if (r < n.length) {
      const H = n[r];
      return t.containerState = H[1], e.attempt(H[0].continuation, s, c)(R);
    }
    return c(R);
  }
  function s(R) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && F();
      const H = t.events.length;
      let V = H, y;
      for (; V--; )
        if (t.events[V][0] === "exit" && t.events[V][1].type === "chunkFlow") {
          y = t.events[V][1].end;
          break;
        }
      E(r);
      let U = H;
      for (; U < t.events.length; )
        t.events[U][1].end = {
          ...y
        }, U++;
      return ht(t.events, V + 1, 0, t.events.slice(H)), t.events.length = U, c(R);
    }
    return o(R);
  }
  function c(R) {
    if (r === n.length) {
      if (!i)
        return C(R);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return _(R);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(ei, u, d)(R);
  }
  function u(R) {
    return i && F(), E(r), C(R);
  }
  function d(R) {
    return t.parser.lazy[t.now().line] = r !== n.length, l = t.now().offset, _(R);
  }
  function C(R) {
    return t.containerState = {}, e.attempt(ei, p, _)(R);
  }
  function p(R) {
    return r++, n.push([t.currentConstruct, t.containerState]), C(R);
  }
  function _(R) {
    if (R === null) {
      i && F(), E(0), e.consume(R);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: a
    }), S(R);
  }
  function S(R) {
    if (R === null) {
      N(e.exit("chunkFlow"), !0), E(0), e.consume(R);
      return;
    }
    return B(R) ? (e.consume(R), N(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, o) : (e.consume(R), S);
  }
  function N(R, H) {
    const V = t.sliceStream(R);
    if (H && V.push(null), R.previous = a, a && (a.next = R), a = R, i.defineSkip(R.start), i.write(V), t.parser.lazy[R.start.line]) {
      let y = i.events.length;
      for (; y--; )
        if (
          // The token starts before the line ending…
          i.events[y][1].start.offset < l && // …and either is not ended yet…
          (!i.events[y][1].end || // …or ends after it.
          i.events[y][1].end.offset > l)
        )
          return;
      const U = t.events.length;
      let j = U, Z, O;
      for (; j--; )
        if (t.events[j][0] === "exit" && t.events[j][1].type === "chunkFlow") {
          if (Z) {
            O = t.events[j][1].end;
            break;
          }
          Z = !0;
        }
      for (E(r), y = U; y < t.events.length; )
        t.events[y][1].end = {
          ...O
        }, y++;
      ht(t.events, j + 1, 0, t.events.slice(U)), t.events.length = y;
    }
  }
  function E(R) {
    let H = n.length;
    for (; H-- > R; ) {
      const V = n[H];
      t.containerState = V[1], V[0].exit.call(t, e);
    }
    n.length = R;
  }
  function F() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Go(e, t, n) {
  return se(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function ti(e) {
  if (e === null || je(e) || Ho(e))
    return 1;
  if (Po(e))
    return 2;
}
function xr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const ur = {
  name: "attention",
  resolveAll: Vo,
  tokenize: jo
};
function Vo(e, t) {
  let n = -1, r, i, a, l, o, s, c, u;
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
          }, C = {
            ...e[n][1].start
          };
          ni(d, -s), ni(C, s), l = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: d,
            end: {
              ...e[r][1].end
            }
          }, o = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: C
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
              ...l.start
            },
            end: {
              ...o.end
            }
          }, e[r][1].end = {
            ...l.start
          }, e[n][1].start = {
            ...o.end
          }, c = [], e[r][1].end.offset - e[r][1].start.offset && (c = tt(c, [["enter", e[r][1], t], ["exit", e[r][1], t]])), c = tt(c, [["enter", i, t], ["enter", l, t], ["exit", l, t], ["enter", a, t]]), c = tt(c, xr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), c = tt(c, [["exit", a, t], ["enter", o, t], ["exit", o, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, c = tt(c, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : u = 0, ht(e, r - 1, n - r + 3, c), n = r + c.length - u - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function jo(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = ti(r);
  let a;
  return l;
  function l(s) {
    return a = s, e.enter("attentionSequence"), o(s);
  }
  function o(s) {
    if (s === a)
      return e.consume(s), o;
    const c = e.exit("attentionSequence"), u = ti(s), d = !u || u === 2 && i || n.includes(s), C = !i || i === 2 && u || n.includes(r);
    return c._open = !!(a === 42 ? d : d && (i || !C)), c._close = !!(a === 42 ? C : C && (u || !d)), t(s);
  }
}
function ni(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const $o = {
  name: "autolink",
  tokenize: Wo
};
function Wo(e, t, n) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(p) {
    return ct(p) ? (e.consume(p), l) : p === 64 ? n(p) : c(p);
  }
  function l(p) {
    return p === 43 || p === 45 || p === 46 || Xe(p) ? (r = 1, o(p)) : c(p);
  }
  function o(p) {
    return p === 58 ? (e.consume(p), r = 0, s) : (p === 43 || p === 45 || p === 46 || Xe(p)) && r++ < 32 ? (e.consume(p), o) : (r = 0, c(p));
  }
  function s(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : p === null || p === 32 || p === 60 || or(p) ? n(p) : (e.consume(p), s);
  }
  function c(p) {
    return p === 64 ? (e.consume(p), u) : Mo(p) ? (e.consume(p), c) : n(p);
  }
  function u(p) {
    return Xe(p) ? d(p) : n(p);
  }
  function d(p) {
    return p === 46 ? (e.consume(p), r = 0, u) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : C(p);
  }
  function C(p) {
    if ((p === 45 || Xe(p)) && r++ < 63) {
      const _ = p === 45 ? C : d;
      return e.consume(p), _;
    }
    return n(p);
  }
}
const In = {
  partial: !0,
  tokenize: Zo
};
function Zo(e, t, n) {
  return r;
  function r(a) {
    return re(a) ? se(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || B(a) ? t(a) : n(a);
  }
}
const ta = {
  continuation: {
    tokenize: Xo
  },
  exit: Yo,
  name: "blockQuote",
  tokenize: qo
};
function qo(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    if (l === 62) {
      const o = r.containerState;
      return o.open || (e.enter("blockQuote", {
        _container: !0
      }), o.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(l), e.exit("blockQuoteMarker"), a;
    }
    return n(l);
  }
  function a(l) {
    return re(l) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(l), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(l));
  }
}
function Xo(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return re(l) ? se(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : a(l);
  }
  function a(l) {
    return e.attempt(ta, t, n)(l);
  }
}
function Yo(e) {
  e.exit("blockQuote");
}
const na = {
  name: "characterEscape",
  tokenize: Ko
};
function Ko(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return Do(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const ra = {
  name: "characterReference",
  tokenize: Qo
};
function Qo(e, t, n) {
  const r = this;
  let i = 0, a, l;
  return o;
  function o(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), s;
  }
  function s(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), c) : (e.enter("characterReferenceValue"), a = 31, l = Xe, u(d));
  }
  function c(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, l = Oo, u) : (e.enter("characterReferenceValue"), a = 7, l = sr, u(d));
  }
  function u(d) {
    if (d === 59 && i) {
      const C = e.exit("characterReferenceValue");
      return l === Xe && !Er(r.sliceSerialize(C)) ? n(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return l(d) && i++ < a ? (e.consume(d), u) : n(d);
  }
}
const ri = {
  partial: !0,
  tokenize: es
}, ii = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Jo
};
function Jo(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: V
  };
  let a = 0, l = 0, o;
  return s;
  function s(y) {
    return c(y);
  }
  function c(y) {
    const U = r.events[r.events.length - 1];
    return a = U && U[1].type === "linePrefix" ? U[2].sliceSerialize(U[1], !0).length : 0, o = y, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(y);
  }
  function u(y) {
    return y === o ? (l++, e.consume(y), u) : l < 3 ? n(y) : (e.exit("codeFencedFenceSequence"), re(y) ? se(e, d, "whitespace")(y) : d(y));
  }
  function d(y) {
    return y === null || B(y) ? (e.exit("codeFencedFence"), r.interrupt ? t(y) : e.check(ri, S, H)(y)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), C(y));
  }
  function C(y) {
    return y === null || B(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(y)) : re(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), se(e, p, "whitespace")(y)) : y === 96 && y === o ? n(y) : (e.consume(y), C);
  }
  function p(y) {
    return y === null || B(y) ? d(y) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), _(y));
  }
  function _(y) {
    return y === null || B(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(y)) : y === 96 && y === o ? n(y) : (e.consume(y), _);
  }
  function S(y) {
    return e.attempt(i, H, N)(y);
  }
  function N(y) {
    return e.enter("lineEnding"), e.consume(y), e.exit("lineEnding"), E;
  }
  function E(y) {
    return a > 0 && re(y) ? se(e, F, "linePrefix", a + 1)(y) : F(y);
  }
  function F(y) {
    return y === null || B(y) ? e.check(ri, S, H)(y) : (e.enter("codeFlowValue"), R(y));
  }
  function R(y) {
    return y === null || B(y) ? (e.exit("codeFlowValue"), F(y)) : (e.consume(y), R);
  }
  function H(y) {
    return e.exit("codeFenced"), t(y);
  }
  function V(y, U, j) {
    let Z = 0;
    return O;
    function O(q) {
      return y.enter("lineEnding"), y.consume(q), y.exit("lineEnding"), b;
    }
    function b(q) {
      return y.enter("codeFencedFence"), re(q) ? se(y, M, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(q) : M(q);
    }
    function M(q) {
      return q === o ? (y.enter("codeFencedFenceSequence"), X(q)) : j(q);
    }
    function X(q) {
      return q === o ? (Z++, y.consume(q), X) : Z >= l ? (y.exit("codeFencedFenceSequence"), re(q) ? se(y, ae, "whitespace")(q) : ae(q)) : j(q);
    }
    function ae(q) {
      return q === null || B(q) ? (y.exit("codeFencedFence"), U(q)) : j(q);
    }
  }
}
function es(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return l === null ? n(l) : (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), a);
  }
  function a(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
const jn = {
  name: "codeIndented",
  tokenize: ns
}, ts = {
  partial: !0,
  tokenize: rs
};
function ns(e, t, n) {
  const r = this;
  return i;
  function i(c) {
    return e.enter("codeIndented"), se(e, a, "linePrefix", 5)(c);
  }
  function a(c) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? l(c) : n(c);
  }
  function l(c) {
    return c === null ? s(c) : B(c) ? e.attempt(ts, l, s)(c) : (e.enter("codeFlowValue"), o(c));
  }
  function o(c) {
    return c === null || B(c) ? (e.exit("codeFlowValue"), l(c)) : (e.consume(c), o);
  }
  function s(c) {
    return e.exit("codeIndented"), t(c);
  }
}
function rs(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line] ? n(l) : B(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), i) : se(e, a, "linePrefix", 5)(l);
  }
  function a(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(l) : B(l) ? i(l) : n(l);
  }
}
const is = {
  name: "codeText",
  previous: ls,
  resolve: as,
  tokenize: os
};
function as(e) {
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
function ls(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function os(e, t, n) {
  let r = 0, i, a;
  return l;
  function l(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), o(d);
  }
  function o(d) {
    return d === 96 ? (e.consume(d), r++, o) : (e.exit("codeTextSequence"), s(d));
  }
  function s(d) {
    return d === null ? n(d) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), s) : d === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(d)) : B(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), s) : (e.enter("codeTextData"), c(d));
  }
  function c(d) {
    return d === null || d === 32 || d === 96 || B(d) ? (e.exit("codeTextData"), s(d)) : (e.consume(d), c);
  }
  function u(d) {
    return d === 96 ? (e.consume(d), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(d)) : (a.type = "codeTextData", c(d));
  }
}
class ss {
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
    return r && en(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), en(this.left, t);
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
    this.setCursor(0), en(this.right, t.reverse());
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
        en(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        en(this.left, n.reverse());
      }
  }
}
function en(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function ia(e) {
  const t = {};
  let n = -1, r, i, a, l, o, s, c;
  const u = new ss(e);
  for (; ++n < u.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, a = 0, a < s.length && s[a][1].type === "lineEndingBlank" && (a += 2), a < s.length && s[a][1].type === "content"))
      for (; ++a < s.length && s[a][1].type !== "content"; )
        s[a][1].type === "chunkText" && (s[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, us(u, n)), n = t[n], c = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (l = u.get(a), l[1].type === "lineEnding" || l[1].type === "lineEndingBlank")
          l[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), l[1].type = "lineEnding", i = a);
        else if (!(l[1].type === "linePrefix" || l[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...u.get(i)[1].start
      }, o = u.slice(i, n), o.unshift(r), u.splice(i, n - i + 1, o));
    }
  }
  return ht(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !c;
}
function us(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let l = n._tokenizer;
  l || (l = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (l._contentTypeTextTrailing = !0));
  const o = l.events, s = [], c = {};
  let u, d, C = -1, p = n, _ = 0, S = 0;
  const N = [S];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && l.defineSkip(p.start), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(u), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
  }
  for (p = n; ++C < o.length; )
    // Find a void token that includes a break.
    o[C][0] === "exit" && o[C - 1][0] === "enter" && o[C][1].type === o[C - 1][1].type && o[C][1].start.line !== o[C][1].end.line && (S = C + 1, N.push(S), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (l.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : N.pop(), C = N.length; C--; ) {
    const E = o.slice(N[C], N[C + 1]), F = a.pop();
    s.push([F, F + E.length - 1]), e.splice(F, 2, E);
  }
  for (s.reverse(), C = -1; ++C < s.length; )
    c[_ + s[C][0]] = _ + s[C][1], _ += s[C][1] - s[C][0] - 1;
  return c;
}
const cs = {
  resolve: ps,
  tokenize: ds
}, hs = {
  partial: !0,
  tokenize: fs
};
function ps(e) {
  return ia(e), e;
}
function ds(e, t) {
  let n;
  return r;
  function r(o) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(o);
  }
  function i(o) {
    return o === null ? a(o) : B(o) ? e.check(hs, l, a)(o) : (e.consume(o), i);
  }
  function a(o) {
    return e.exit("chunkContent"), e.exit("content"), t(o);
  }
  function l(o) {
    return e.consume(o), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, i;
  }
}
function fs(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), se(e, a, "linePrefix");
  }
  function a(l) {
    if (l === null || B(l))
      return n(l);
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(l) : e.interrupt(r.parser.constructs.flow, n, t)(l);
  }
}
function aa(e, t, n, r, i, a, l, o, s) {
  const c = s || Number.POSITIVE_INFINITY;
  let u = 0;
  return d;
  function d(E) {
    return E === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(E), e.exit(a), C) : E === null || E === 32 || E === 41 || or(E) ? n(E) : (e.enter(r), e.enter(l), e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), S(E));
  }
  function C(E) {
    return E === 62 ? (e.enter(a), e.consume(E), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), p(E));
  }
  function p(E) {
    return E === 62 ? (e.exit("chunkString"), e.exit(o), C(E)) : E === null || E === 60 || B(E) ? n(E) : (e.consume(E), E === 92 ? _ : p);
  }
  function _(E) {
    return E === 60 || E === 62 || E === 92 ? (e.consume(E), p) : p(E);
  }
  function S(E) {
    return !u && (E === null || E === 41 || je(E)) ? (e.exit("chunkString"), e.exit(o), e.exit(l), e.exit(r), t(E)) : u < c && E === 40 ? (e.consume(E), u++, S) : E === 41 ? (e.consume(E), u--, S) : E === null || E === 32 || E === 40 || or(E) ? n(E) : (e.consume(E), E === 92 ? N : S);
  }
  function N(E) {
    return E === 40 || E === 41 || E === 92 ? (e.consume(E), S) : S(E);
  }
}
function la(e, t, n, r, i, a) {
  const l = this;
  let o = 0, s;
  return c;
  function c(p) {
    return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(a), u;
  }
  function u(p) {
    return o > 999 || p === null || p === 91 || p === 93 && !s || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !o && "_hiddenFootnoteSupport" in l.parser.constructs ? n(p) : p === 93 ? (e.exit(a), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : B(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), d(p));
  }
  function d(p) {
    return p === null || p === 91 || p === 93 || B(p) || o++ > 999 ? (e.exit("chunkString"), u(p)) : (e.consume(p), s || (s = !re(p)), p === 92 ? C : d);
  }
  function C(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), o++, d) : d(p);
  }
}
function oa(e, t, n, r, i, a) {
  let l;
  return o;
  function o(C) {
    return C === 34 || C === 39 || C === 40 ? (e.enter(r), e.enter(i), e.consume(C), e.exit(i), l = C === 40 ? 41 : C, s) : n(C);
  }
  function s(C) {
    return C === l ? (e.enter(i), e.consume(C), e.exit(i), e.exit(r), t) : (e.enter(a), c(C));
  }
  function c(C) {
    return C === l ? (e.exit(a), s(l)) : C === null ? n(C) : B(C) ? (e.enter("lineEnding"), e.consume(C), e.exit("lineEnding"), se(e, c, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), u(C));
  }
  function u(C) {
    return C === l || C === null || B(C) ? (e.exit("chunkString"), c(C)) : (e.consume(C), C === 92 ? d : u);
  }
  function d(C) {
    return C === l || C === 92 ? (e.consume(C), u) : u(C);
  }
}
function rn(e, t) {
  let n;
  return r;
  function r(i) {
    return B(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : re(i) ? se(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const ms = {
  name: "definition",
  tokenize: Cs
}, gs = {
  partial: !0,
  tokenize: ys
};
function Cs(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(p) {
    return e.enter("definition"), l(p);
  }
  function l(p) {
    return la.call(
      r,
      e,
      o,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(p);
  }
  function o(p) {
    return i = Gt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), s) : n(p);
  }
  function s(p) {
    return je(p) ? rn(e, c)(p) : c(p);
  }
  function c(p) {
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
    )(p);
  }
  function u(p) {
    return e.attempt(gs, d, d)(p);
  }
  function d(p) {
    return re(p) ? se(e, C, "whitespace")(p) : C(p);
  }
  function C(p) {
    return p === null || B(p) ? (e.exit("definition"), r.parser.defined.push(i), t(p)) : n(p);
  }
}
function ys(e, t, n) {
  return r;
  function r(o) {
    return je(o) ? rn(e, i)(o) : n(o);
  }
  function i(o) {
    return oa(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
  }
  function a(o) {
    return re(o) ? se(e, l, "whitespace")(o) : l(o);
  }
  function l(o) {
    return o === null || B(o) ? t(o) : n(o);
  }
}
const ws = {
  name: "hardBreakEscape",
  tokenize: _s
};
function _s(e, t, n) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), i;
  }
  function i(a) {
    return B(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
  }
}
const Es = {
  name: "headingAtx",
  resolve: xs,
  tokenize: Ss
};
function xs(e, t) {
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
  }, ht(e, r, n - r + 1, [["enter", i, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]])), e;
}
function Ss(e, t, n) {
  let r = 0;
  return i;
  function i(u) {
    return e.enter("atxHeading"), a(u);
  }
  function a(u) {
    return e.enter("atxHeadingSequence"), l(u);
  }
  function l(u) {
    return u === 35 && r++ < 6 ? (e.consume(u), l) : u === null || je(u) ? (e.exit("atxHeadingSequence"), o(u)) : n(u);
  }
  function o(u) {
    return u === 35 ? (e.enter("atxHeadingSequence"), s(u)) : u === null || B(u) ? (e.exit("atxHeading"), t(u)) : re(u) ? se(e, o, "whitespace")(u) : (e.enter("atxHeadingText"), c(u));
  }
  function s(u) {
    return u === 35 ? (e.consume(u), s) : (e.exit("atxHeadingSequence"), o(u));
  }
  function c(u) {
    return u === null || u === 35 || je(u) ? (e.exit("atxHeadingText"), o(u)) : (e.consume(u), c);
  }
}
const Ts = [
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
], ai = ["pre", "script", "style", "textarea"], ks = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Is,
  tokenize: Rs
}, bs = {
  partial: !0,
  tokenize: Ns
}, As = {
  partial: !0,
  tokenize: vs
};
function Is(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Rs(e, t, n) {
  const r = this;
  let i, a, l, o, s;
  return c;
  function c(f) {
    return u(f);
  }
  function u(f) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(f), d;
  }
  function d(f) {
    return f === 33 ? (e.consume(f), C) : f === 47 ? (e.consume(f), a = !0, S) : f === 63 ? (e.consume(f), i = 3, r.interrupt ? t : g) : ct(f) ? (e.consume(f), l = String.fromCharCode(f), N) : n(f);
  }
  function C(f) {
    return f === 45 ? (e.consume(f), i = 2, p) : f === 91 ? (e.consume(f), i = 5, o = 0, _) : ct(f) ? (e.consume(f), i = 4, r.interrupt ? t : g) : n(f);
  }
  function p(f) {
    return f === 45 ? (e.consume(f), r.interrupt ? t : g) : n(f);
  }
  function _(f) {
    const fe = "CDATA[";
    return f === fe.charCodeAt(o++) ? (e.consume(f), o === fe.length ? r.interrupt ? t : M : _) : n(f);
  }
  function S(f) {
    return ct(f) ? (e.consume(f), l = String.fromCharCode(f), N) : n(f);
  }
  function N(f) {
    if (f === null || f === 47 || f === 62 || je(f)) {
      const fe = f === 47, ee = l.toLowerCase();
      return !fe && !a && ai.includes(ee) ? (i = 1, r.interrupt ? t(f) : M(f)) : Ts.includes(l.toLowerCase()) ? (i = 6, fe ? (e.consume(f), E) : r.interrupt ? t(f) : M(f)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(f) : a ? F(f) : R(f));
    }
    return f === 45 || Xe(f) ? (e.consume(f), l += String.fromCharCode(f), N) : n(f);
  }
  function E(f) {
    return f === 62 ? (e.consume(f), r.interrupt ? t : M) : n(f);
  }
  function F(f) {
    return re(f) ? (e.consume(f), F) : O(f);
  }
  function R(f) {
    return f === 47 ? (e.consume(f), O) : f === 58 || f === 95 || ct(f) ? (e.consume(f), H) : re(f) ? (e.consume(f), R) : O(f);
  }
  function H(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || Xe(f) ? (e.consume(f), H) : V(f);
  }
  function V(f) {
    return f === 61 ? (e.consume(f), y) : re(f) ? (e.consume(f), V) : R(f);
  }
  function y(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), s = f, U) : re(f) ? (e.consume(f), y) : j(f);
  }
  function U(f) {
    return f === s ? (e.consume(f), s = null, Z) : f === null || B(f) ? n(f) : (e.consume(f), U);
  }
  function j(f) {
    return f === null || f === 34 || f === 39 || f === 47 || f === 60 || f === 61 || f === 62 || f === 96 || je(f) ? V(f) : (e.consume(f), j);
  }
  function Z(f) {
    return f === 47 || f === 62 || re(f) ? R(f) : n(f);
  }
  function O(f) {
    return f === 62 ? (e.consume(f), b) : n(f);
  }
  function b(f) {
    return f === null || B(f) ? M(f) : re(f) ? (e.consume(f), b) : n(f);
  }
  function M(f) {
    return f === 45 && i === 2 ? (e.consume(f), we) : f === 60 && i === 1 ? (e.consume(f), de) : f === 62 && i === 4 ? (e.consume(f), Q) : f === 63 && i === 3 ? (e.consume(f), g) : f === 93 && i === 5 ? (e.consume(f), We) : B(f) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(bs, Ne, X)(f)) : f === null || B(f) ? (e.exit("htmlFlowData"), X(f)) : (e.consume(f), M);
  }
  function X(f) {
    return e.check(As, ae, Ne)(f);
  }
  function ae(f) {
    return e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), q;
  }
  function q(f) {
    return f === null || B(f) ? X(f) : (e.enter("htmlFlowData"), M(f));
  }
  function we(f) {
    return f === 45 ? (e.consume(f), g) : M(f);
  }
  function de(f) {
    return f === 47 ? (e.consume(f), l = "", be) : M(f);
  }
  function be(f) {
    if (f === 62) {
      const fe = l.toLowerCase();
      return ai.includes(fe) ? (e.consume(f), Q) : M(f);
    }
    return ct(f) && l.length < 8 ? (e.consume(f), l += String.fromCharCode(f), be) : M(f);
  }
  function We(f) {
    return f === 93 ? (e.consume(f), g) : M(f);
  }
  function g(f) {
    return f === 62 ? (e.consume(f), Q) : f === 45 && i === 2 ? (e.consume(f), g) : M(f);
  }
  function Q(f) {
    return f === null || B(f) ? (e.exit("htmlFlowData"), Ne(f)) : (e.consume(f), Q);
  }
  function Ne(f) {
    return e.exit("htmlFlow"), t(f);
  }
}
function vs(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return B(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), a) : n(l);
  }
  function a(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
function Ns(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(In, t, n);
  }
}
const Ls = {
  name: "htmlText",
  tokenize: Ms
};
function Ms(e, t, n) {
  const r = this;
  let i, a, l;
  return o;
  function o(g) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), s;
  }
  function s(g) {
    return g === 33 ? (e.consume(g), c) : g === 47 ? (e.consume(g), V) : g === 63 ? (e.consume(g), R) : ct(g) ? (e.consume(g), j) : n(g);
  }
  function c(g) {
    return g === 45 ? (e.consume(g), u) : g === 91 ? (e.consume(g), a = 0, _) : ct(g) ? (e.consume(g), F) : n(g);
  }
  function u(g) {
    return g === 45 ? (e.consume(g), p) : n(g);
  }
  function d(g) {
    return g === null ? n(g) : g === 45 ? (e.consume(g), C) : B(g) ? (l = d, de(g)) : (e.consume(g), d);
  }
  function C(g) {
    return g === 45 ? (e.consume(g), p) : d(g);
  }
  function p(g) {
    return g === 62 ? we(g) : g === 45 ? C(g) : d(g);
  }
  function _(g) {
    const Q = "CDATA[";
    return g === Q.charCodeAt(a++) ? (e.consume(g), a === Q.length ? S : _) : n(g);
  }
  function S(g) {
    return g === null ? n(g) : g === 93 ? (e.consume(g), N) : B(g) ? (l = S, de(g)) : (e.consume(g), S);
  }
  function N(g) {
    return g === 93 ? (e.consume(g), E) : S(g);
  }
  function E(g) {
    return g === 62 ? we(g) : g === 93 ? (e.consume(g), E) : S(g);
  }
  function F(g) {
    return g === null || g === 62 ? we(g) : B(g) ? (l = F, de(g)) : (e.consume(g), F);
  }
  function R(g) {
    return g === null ? n(g) : g === 63 ? (e.consume(g), H) : B(g) ? (l = R, de(g)) : (e.consume(g), R);
  }
  function H(g) {
    return g === 62 ? we(g) : R(g);
  }
  function V(g) {
    return ct(g) ? (e.consume(g), y) : n(g);
  }
  function y(g) {
    return g === 45 || Xe(g) ? (e.consume(g), y) : U(g);
  }
  function U(g) {
    return B(g) ? (l = U, de(g)) : re(g) ? (e.consume(g), U) : we(g);
  }
  function j(g) {
    return g === 45 || Xe(g) ? (e.consume(g), j) : g === 47 || g === 62 || je(g) ? Z(g) : n(g);
  }
  function Z(g) {
    return g === 47 ? (e.consume(g), we) : g === 58 || g === 95 || ct(g) ? (e.consume(g), O) : B(g) ? (l = Z, de(g)) : re(g) ? (e.consume(g), Z) : we(g);
  }
  function O(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || Xe(g) ? (e.consume(g), O) : b(g);
  }
  function b(g) {
    return g === 61 ? (e.consume(g), M) : B(g) ? (l = b, de(g)) : re(g) ? (e.consume(g), b) : Z(g);
  }
  function M(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), i = g, X) : B(g) ? (l = M, de(g)) : re(g) ? (e.consume(g), M) : (e.consume(g), ae);
  }
  function X(g) {
    return g === i ? (e.consume(g), i = void 0, q) : g === null ? n(g) : B(g) ? (l = X, de(g)) : (e.consume(g), X);
  }
  function ae(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? n(g) : g === 47 || g === 62 || je(g) ? Z(g) : (e.consume(g), ae);
  }
  function q(g) {
    return g === 47 || g === 62 || je(g) ? Z(g) : n(g);
  }
  function we(g) {
    return g === 62 ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(g);
  }
  function de(g) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), be;
  }
  function be(g) {
    return re(g) ? se(e, We, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(g) : We(g);
  }
  function We(g) {
    return e.enter("htmlTextData"), l(g);
  }
}
const Sr = {
  name: "labelEnd",
  resolveAll: Hs,
  resolveTo: Us,
  tokenize: Fs
}, Os = {
  tokenize: zs
}, Ds = {
  tokenize: Bs
}, Ps = {
  tokenize: Gs
};
function Hs(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e.length !== n.length && ht(e, 0, e.length, n), e;
}
function Us(e, t) {
  let n = e.length, r = 0, i, a, l, o;
  for (; n--; )
    if (i = e[n][1], a) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (l) {
      if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (a = n, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (l = n);
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
      ...e[l][1].end
    }
  }, u = {
    type: "labelText",
    start: {
      ...e[a + r + 2][1].end
    },
    end: {
      ...e[l - 2][1].start
    }
  };
  return o = [["enter", s, t], ["enter", c, t]], o = tt(o, e.slice(a + 1, a + r + 3)), o = tt(o, [["enter", u, t]]), o = tt(o, xr(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, l - 3), t)), o = tt(o, [["exit", u, t], e[l - 2], e[l - 1], ["exit", c, t]]), o = tt(o, e.slice(l + 1)), o = tt(o, [["exit", s, t]]), ht(e, a, e.length, o), e;
}
function Fs(e, t, n) {
  const r = this;
  let i = r.events.length, a, l;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return o;
  function o(C) {
    return a ? a._inactive ? d(C) : (l = r.parser.defined.includes(Gt(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(C), e.exit("labelMarker"), e.exit("labelEnd"), s) : n(C);
  }
  function s(C) {
    return C === 40 ? e.attempt(Os, u, l ? u : d)(C) : C === 91 ? e.attempt(Ds, u, l ? c : d)(C) : l ? u(C) : d(C);
  }
  function c(C) {
    return e.attempt(Ps, u, d)(C);
  }
  function u(C) {
    return t(C);
  }
  function d(C) {
    return a._balanced = !0, n(C);
  }
}
function zs(e, t, n) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), i;
  }
  function i(d) {
    return je(d) ? rn(e, a)(d) : a(d);
  }
  function a(d) {
    return d === 41 ? u(d) : aa(e, l, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function l(d) {
    return je(d) ? rn(e, s)(d) : u(d);
  }
  function o(d) {
    return n(d);
  }
  function s(d) {
    return d === 34 || d === 39 || d === 40 ? oa(e, c, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : u(d);
  }
  function c(d) {
    return je(d) ? rn(e, u)(d) : u(d);
  }
  function u(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), t) : n(d);
  }
}
function Bs(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return la.call(r, e, a, l, "reference", "referenceMarker", "referenceString")(o);
  }
  function a(o) {
    return r.parser.defined.includes(Gt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(o) : n(o);
  }
  function l(o) {
    return n(o);
  }
}
function Gs(e, t, n) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), i;
  }
  function i(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), t) : n(a);
  }
}
const Vs = {
  name: "labelStartImage",
  resolveAll: Sr.resolveAll,
  tokenize: js
};
function js(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(o), e.exit("labelImageMarker"), a;
  }
  function a(o) {
    return o === 91 ? (e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelImage"), l) : n(o);
  }
  function l(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const $s = {
  name: "labelStartLink",
  resolveAll: Sr.resolveAll,
  tokenize: Ws
};
function Ws(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(l), e.exit("labelMarker"), e.exit("labelLink"), a;
  }
  function a(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : t(l);
  }
}
const $n = {
  name: "lineEnding",
  tokenize: Zs
};
function Zs(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), se(e, t, "linePrefix");
  }
}
const _n = {
  name: "thematicBreak",
  tokenize: qs
};
function qs(e, t, n) {
  let r = 0, i;
  return a;
  function a(c) {
    return e.enter("thematicBreak"), l(c);
  }
  function l(c) {
    return i = c, o(c);
  }
  function o(c) {
    return c === i ? (e.enter("thematicBreakSequence"), s(c)) : r >= 3 && (c === null || B(c)) ? (e.exit("thematicBreak"), t(c)) : n(c);
  }
  function s(c) {
    return c === i ? (e.consume(c), r++, s) : (e.exit("thematicBreakSequence"), re(c) ? se(e, o, "whitespace")(c) : o(c));
  }
}
const Ge = {
  continuation: {
    tokenize: Qs
  },
  exit: e1,
  name: "list",
  tokenize: Ks
}, Xs = {
  partial: !0,
  tokenize: t1
}, Ys = {
  partial: !0,
  tokenize: Js
};
function Ks(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, l = 0;
  return o;
  function o(p) {
    const _ = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (_ === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : sr(p)) {
      if (r.containerState.type || (r.containerState.type = _, e.enter(_, {
        _container: !0
      })), _ === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(_n, n, c)(p) : c(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(p);
    }
    return n(p);
  }
  function s(p) {
    return sr(p) && ++l < 10 ? (e.consume(p), s) : (!r.interrupt || l < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), c(p)) : n(p);
  }
  function c(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      In,
      // Can’t be empty when interrupting.
      r.interrupt ? n : u,
      e.attempt(Xs, C, d)
    );
  }
  function u(p) {
    return r.containerState.initialBlankLine = !0, a++, C(p);
  }
  function d(p) {
    return re(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), C) : n(p);
  }
  function C(p) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(p);
  }
}
function Qs(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(In, i, a);
  function i(o) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, se(e, t, "listItemIndent", r.containerState.size + 1)(o);
  }
  function a(o) {
    return r.containerState.furtherBlankLines || !re(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Ys, t, l)(o));
  }
  function l(o) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, se(e, e.attempt(Ge, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
  }
}
function Js(e, t, n) {
  const r = this;
  return se(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function e1(e) {
  e.exit(this.containerState.type);
}
function t1(e, t, n) {
  const r = this;
  return se(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const l = r.events[r.events.length - 1];
    return !re(a) && l && l[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const li = {
  name: "setextUnderline",
  resolveTo: n1,
  tokenize: r1
};
function n1(e, t) {
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
  const l = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", a ? (e.splice(i, 0, ["enter", l, t]), e.splice(a + 1, 0, ["exit", e[r][1], t]), e[r][1].end = {
    ...e[a][1].end
  }) : e[r][1] = l, e.push(["exit", l, t]), e;
}
function r1(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(c) {
    let u = r.events.length, d;
    for (; u--; )
      if (r.events[u][1].type !== "lineEnding" && r.events[u][1].type !== "linePrefix" && r.events[u][1].type !== "content") {
        d = r.events[u][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || d) ? (e.enter("setextHeadingLine"), i = c, l(c)) : n(c);
  }
  function l(c) {
    return e.enter("setextHeadingLineSequence"), o(c);
  }
  function o(c) {
    return c === i ? (e.consume(c), o) : (e.exit("setextHeadingLineSequence"), re(c) ? se(e, s, "lineSuffix")(c) : s(c));
  }
  function s(c) {
    return c === null || B(c) ? (e.exit("setextHeadingLine"), t(c)) : n(c);
  }
}
const i1 = {
  tokenize: a1
};
function a1(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    In,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, se(e, e.attempt(this.parser.constructs.flow, i, e.attempt(cs, i)), "linePrefix"))
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
const l1 = {
  resolveAll: ua()
}, o1 = sa("string"), s1 = sa("text");
function sa(e) {
  return {
    resolveAll: ua(e === "text" ? u1 : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], a = n.attempt(i, l, o);
    return l;
    function l(u) {
      return c(u) ? a(u) : o(u);
    }
    function o(u) {
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
      const d = i[u];
      let C = -1;
      if (d)
        for (; ++C < d.length; ) {
          const p = d[C];
          if (!p.previous || p.previous.call(r, r.previous))
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
function u1(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let a = i.length, l = -1, o = 0, s;
      for (; a--; ) {
        const c = i[a];
        if (typeof c == "string") {
          for (l = c.length; c.charCodeAt(l - 1) === 32; )
            o++, l--;
          if (l) break;
          l = -1;
        } else if (c === -2)
          s = !0, o++;
        else if (c !== -1) {
          a++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (o = 0), o) {
        const c = {
          type: n === e.length || s || o < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: a ? l : r.start._bufferIndex + l,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - o,
            offset: r.end.offset - o
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
const c1 = {
  42: Ge,
  43: Ge,
  45: Ge,
  48: Ge,
  49: Ge,
  50: Ge,
  51: Ge,
  52: Ge,
  53: Ge,
  54: Ge,
  55: Ge,
  56: Ge,
  57: Ge,
  62: ta
}, h1 = {
  91: ms
}, p1 = {
  [-2]: jn,
  [-1]: jn,
  32: jn
}, d1 = {
  35: Es,
  42: _n,
  45: [li, _n],
  60: ks,
  61: li,
  95: _n,
  96: ii,
  126: ii
}, f1 = {
  38: ra,
  92: na
}, m1 = {
  [-5]: $n,
  [-4]: $n,
  [-3]: $n,
  33: Vs,
  38: ra,
  42: ur,
  60: [$o, Ls],
  91: $s,
  92: [ws, na],
  93: Sr,
  95: ur,
  96: is
}, g1 = {
  null: [ur, l1]
}, C1 = {
  null: [42, 95]
}, y1 = {
  null: []
}, w1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: C1,
  contentInitial: h1,
  disable: y1,
  document: c1,
  flow: d1,
  flowInitial: p1,
  insideSpan: g1,
  string: f1,
  text: m1
}, Symbol.toStringTag, { value: "Module" }));
function _1(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, a = [];
  let l = [], o = [];
  const s = {
    attempt: U(V),
    check: U(y),
    consume: F,
    enter: R,
    exit: H,
    interrupt: U(y, {
      interrupt: !0
    })
  }, c = {
    code: null,
    containerState: {},
    defineSkip: S,
    events: [],
    now: _,
    parser: e,
    previous: null,
    sliceSerialize: C,
    sliceStream: p,
    write: d
  };
  let u = t.tokenize.call(c, s);
  return t.resolveAll && a.push(t), c;
  function d(b) {
    return l = tt(l, b), N(), l[l.length - 1] !== null ? [] : (j(t, 0), c.events = xr(a, c.events, c), c.events);
  }
  function C(b, M) {
    return x1(p(b), M);
  }
  function p(b) {
    return E1(l, b);
  }
  function _() {
    const {
      _bufferIndex: b,
      _index: M,
      line: X,
      column: ae,
      offset: q
    } = r;
    return {
      _bufferIndex: b,
      _index: M,
      line: X,
      column: ae,
      offset: q
    };
  }
  function S(b) {
    i[b.line] = b.column, O();
  }
  function N() {
    let b;
    for (; r._index < l.length; ) {
      const M = l[r._index];
      if (typeof M == "string")
        for (b = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === b && r._bufferIndex < M.length; )
          E(M.charCodeAt(r._bufferIndex));
      else
        E(M);
    }
  }
  function E(b) {
    u = u(b);
  }
  function F(b) {
    B(b) ? (r.line++, r.column = 1, r.offset += b === -3 ? 2 : 1, O()) : b !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = b;
  }
  function R(b, M) {
    const X = M || {};
    return X.type = b, X.start = _(), c.events.push(["enter", X, c]), o.push(X), X;
  }
  function H(b) {
    const M = o.pop();
    return M.end = _(), c.events.push(["exit", M, c]), M;
  }
  function V(b, M) {
    j(b, M.from);
  }
  function y(b, M) {
    M.restore();
  }
  function U(b, M) {
    return X;
    function X(ae, q, we) {
      let de, be, We, g;
      return Array.isArray(ae) ? (
        /* c8 ignore next 1 */
        Ne(ae)
      ) : "tokenize" in ae ? (
        // Looks like a construct.
        Ne([
          /** @type {Construct} */
          ae
        ])
      ) : Q(ae);
      function Q(le) {
        return ze;
        function ze(Ee) {
          const Ye = Ee !== null && le[Ee], Ke = Ee !== null && le.null, pt = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ye) ? Ye : Ye ? [Ye] : [],
            ...Array.isArray(Ke) ? Ke : Ke ? [Ke] : []
          ];
          return Ne(pt)(Ee);
        }
      }
      function Ne(le) {
        return de = le, be = 0, le.length === 0 ? we : f(le[be]);
      }
      function f(le) {
        return ze;
        function ze(Ee) {
          return g = Z(), We = le, le.partial || (c.currentConstruct = le), le.name && c.parser.constructs.disable.null.includes(le.name) ? ee() : le.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            M ? Object.assign(Object.create(c), M) : c,
            s,
            fe,
            ee
          )(Ee);
        }
      }
      function fe(le) {
        return b(We, g), q;
      }
      function ee(le) {
        return g.restore(), ++be < de.length ? f(de[be]) : we;
      }
    }
  }
  function j(b, M) {
    b.resolveAll && !a.includes(b) && a.push(b), b.resolve && ht(c.events, M, c.events.length - M, b.resolve(c.events.slice(M), c)), b.resolveTo && (c.events = b.resolveTo(c.events, c));
  }
  function Z() {
    const b = _(), M = c.previous, X = c.currentConstruct, ae = c.events.length, q = Array.from(o);
    return {
      from: ae,
      restore: we
    };
    function we() {
      r = b, c.previous = M, c.currentConstruct = X, c.events.length = ae, o = q, O();
    }
  }
  function O() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function E1(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex;
  let l;
  if (n === i)
    l = [e[n].slice(r, a)];
  else {
    if (l = e.slice(n, i), r > -1) {
      const o = l[0];
      typeof o == "string" ? l[0] = o.slice(r) : l.shift();
    }
    a > 0 && l.push(e[i].slice(0, a));
  }
  return l;
}
function x1(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const a = e[n];
    let l;
    if (typeof a == "string")
      l = a;
    else switch (a) {
      case -5: {
        l = "\r";
        break;
      }
      case -4: {
        l = `
`;
        break;
      }
      case -3: {
        l = `\r
`;
        break;
      }
      case -2: {
        l = t ? " " : "	";
        break;
      }
      case -1: {
        if (!t && i) continue;
        l = " ";
        break;
      }
      default:
        l = String.fromCharCode(a);
    }
    i = a === -2, r.push(l);
  }
  return r.join("");
}
function S1(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      vo([w1, ...(e || {}).extensions || []])
    ),
    content: i(Uo),
    defined: [],
    document: i(zo),
    flow: i(i1),
    lazy: {},
    string: i(o1),
    text: i(s1)
  };
  return r;
  function i(a) {
    return l;
    function l(o) {
      return _1(r, a, o);
    }
  }
}
function T1(e) {
  for (; !ia(e); )
    ;
  return e;
}
const oi = /[\0\t\n\r]/g;
function k1() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, l, o) {
    const s = [];
    let c, u, d, C, p;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(l || void 0).decode(a)), d = 0, t = "", n && (a.charCodeAt(0) === 65279 && d++, n = void 0); d < a.length; ) {
      if (oi.lastIndex = d, c = oi.exec(a), C = c && c.index !== void 0 ? c.index : a.length, p = a.charCodeAt(C), !c) {
        t = a.slice(d);
        break;
      }
      if (p === 10 && d === C && r)
        s.push(-3), r = void 0;
      else
        switch (r && (s.push(-5), r = void 0), d < C && (s.push(a.slice(d, C)), e += C - d), p) {
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
      d = C + 1;
    }
    return o && (r && s.push(-5), t && s.push(t), s.push(null)), s;
  }
}
const b1 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function A1(e) {
  return e.replace(b1, I1);
}
function I1(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return ea(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return Er(n) || e;
}
const ca = {}.hasOwnProperty;
function R1(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), v1(n)(T1(S1(n).document().write(k1()(e, t, !0))));
}
function v1(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(Je),
      autolinkProtocol: Z,
      autolinkEmail: Z,
      atxHeading: a(Oe),
      blockQuote: a(Ke),
      characterEscape: Z,
      characterReference: Z,
      codeFenced: a(pt),
      codeFencedFenceInfo: l,
      codeFencedFenceMeta: l,
      codeIndented: a(pt, l),
      codeText: a(Ot, l),
      codeTextData: Z,
      data: Z,
      codeFlowValue: Z,
      definition: a(Qe),
      definitionDestinationString: l,
      definitionLabelString: l,
      definitionTitleString: l,
      emphasis: a(dt),
      hardBreakEscape: a(De),
      hardBreakTrailing: a(De),
      htmlFlow: a(_t, l),
      htmlFlowData: Z,
      htmlText: a(_t, l),
      htmlTextData: Z,
      image: a(Ae),
      label: l,
      link: a(Je),
      listItem: a(Dt),
      listItemValue: C,
      listOrdered: a(Le, d),
      listUnordered: a(Le),
      paragraph: a(Pt),
      reference: f,
      referenceString: l,
      resourceDestinationString: l,
      resourceTitleString: l,
      setextHeading: a(Oe),
      strong: a(Wt),
      thematicBreak: a(ft)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: V,
      autolink: s(),
      autolinkEmail: Ye,
      autolinkProtocol: Ee,
      blockQuote: s(),
      characterEscapeValue: O,
      characterReferenceMarkerHexadecimal: ee,
      characterReferenceMarkerNumeric: ee,
      characterReferenceValue: le,
      characterReference: ze,
      codeFenced: s(N),
      codeFencedFence: S,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: _,
      codeFlowValue: O,
      codeIndented: s(E),
      codeText: s(q),
      codeTextData: O,
      data: O,
      definition: s(),
      definitionDestinationString: H,
      definitionLabelString: F,
      definitionTitleString: R,
      emphasis: s(),
      hardBreakEscape: s(M),
      hardBreakTrailing: s(M),
      htmlFlow: s(X),
      htmlFlowData: O,
      htmlText: s(ae),
      htmlTextData: O,
      image: s(de),
      label: We,
      labelText: be,
      lineEnding: b,
      link: s(we),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: fe,
      resourceDestinationString: g,
      resourceTitleString: Q,
      resource: Ne,
      setextHeading: s(j),
      setextHeadingLineSequence: U,
      setextHeadingText: y,
      strong: s(),
      thematicBreak: s()
    }
  };
  ha(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(w) {
    let T = {
      type: "root",
      children: []
    };
    const P = {
      stack: [T],
      tokenStack: [],
      config: t,
      enter: o,
      exit: c,
      buffer: l,
      resume: u,
      data: n
    }, $ = [];
    let J = -1;
    for (; ++J < w.length; )
      if (w[J][1].type === "listOrdered" || w[J][1].type === "listUnordered")
        if (w[J][0] === "enter")
          $.push(J);
        else {
          const xe = $.pop();
          J = i(w, xe, J);
        }
    for (J = -1; ++J < w.length; ) {
      const xe = t[w[J][0]];
      ca.call(xe, w[J][1].type) && xe[w[J][1].type].call(Object.assign({
        sliceSerialize: w[J][2].sliceSerialize
      }, P), w[J][1]);
    }
    if (P.tokenStack.length > 0) {
      const xe = P.tokenStack[P.tokenStack.length - 1];
      (xe[1] || si).call(P, void 0, xe[0]);
    }
    for (T.position = {
      start: kt(w.length > 0 ? w[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: kt(w.length > 0 ? w[w.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, J = -1; ++J < t.transforms.length; )
      T = t.transforms[J](T) || T;
    return T;
  }
  function i(w, T, P) {
    let $ = T - 1, J = -1, xe = !1, Ze, Ie, Re, me;
    for (; ++$ <= P; ) {
      const pe = w[$];
      switch (pe[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          pe[0] === "enter" ? J++ : J--, me = void 0;
          break;
        }
        case "lineEndingBlank": {
          pe[0] === "enter" && (Ze && !me && !J && !Re && (Re = $), me = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          me = void 0;
      }
      if (!J && pe[0] === "enter" && pe[1].type === "listItemPrefix" || J === -1 && pe[0] === "exit" && (pe[1].type === "listUnordered" || pe[1].type === "listOrdered")) {
        if (Ze) {
          let et = $;
          for (Ie = void 0; et--; ) {
            const Pe = w[et];
            if (Pe[1].type === "lineEnding" || Pe[1].type === "lineEndingBlank") {
              if (Pe[0] === "exit") continue;
              Ie && (w[Ie][1].type = "lineEndingBlank", xe = !0), Pe[1].type = "lineEnding", Ie = et;
            } else if (!(Pe[1].type === "linePrefix" || Pe[1].type === "blockQuotePrefix" || Pe[1].type === "blockQuotePrefixWhitespace" || Pe[1].type === "blockQuoteMarker" || Pe[1].type === "listItemIndent")) break;
          }
          Re && (!Ie || Re < Ie) && (Ze._spread = !0), Ze.end = Object.assign({}, Ie ? w[Ie][1].start : pe[1].end), w.splice(Ie || $, 0, ["exit", Ze, pe[2]]), $++, P++;
        }
        if (pe[1].type === "listItemPrefix") {
          const et = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, pe[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ze = et, w.splice($, 0, ["enter", et, pe[2]]), $++, P++, Re = void 0, me = !0;
        }
      }
    }
    return w[T][1]._spread = xe, P;
  }
  function a(w, T) {
    return P;
    function P($) {
      o.call(this, w($), $), T && T.call(this, $);
    }
  }
  function l() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function o(w, T, P) {
    this.stack[this.stack.length - 1].children.push(w), this.stack.push(w), this.tokenStack.push([T, P || void 0]), w.position = {
      start: kt(T.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(w) {
    return T;
    function T(P) {
      w && w.call(this, P), c.call(this, P);
    }
  }
  function c(w, T) {
    const P = this.stack.pop(), $ = this.tokenStack.pop();
    if ($)
      $[0].type !== w.type && (T ? T.call(this, w, $[0]) : ($[1] || si).call(this, w, $[0]));
    else throw new Error("Cannot close `" + w.type + "` (" + nn({
      start: w.start,
      end: w.end
    }) + "): it’s not open");
    P.position.end = kt(w.end);
  }
  function u() {
    return Io(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function C(w) {
    if (this.data.expectingFirstListItemValue) {
      const T = this.stack[this.stack.length - 2];
      T.start = Number.parseInt(this.sliceSerialize(w), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const w = this.resume(), T = this.stack[this.stack.length - 1];
    T.lang = w;
  }
  function _() {
    const w = this.resume(), T = this.stack[this.stack.length - 1];
    T.meta = w;
  }
  function S() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function N() {
    const w = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = w.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function E() {
    const w = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = w.replace(/(\r?\n|\r)$/g, "");
  }
  function F(w) {
    const T = this.resume(), P = this.stack[this.stack.length - 1];
    P.label = T, P.identifier = Gt(this.sliceSerialize(w)).toLowerCase();
  }
  function R() {
    const w = this.resume(), T = this.stack[this.stack.length - 1];
    T.title = w;
  }
  function H() {
    const w = this.resume(), T = this.stack[this.stack.length - 1];
    T.url = w;
  }
  function V(w) {
    const T = this.stack[this.stack.length - 1];
    if (!T.depth) {
      const P = this.sliceSerialize(w).length;
      T.depth = P;
    }
  }
  function y() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function U(w) {
    const T = this.stack[this.stack.length - 1];
    T.depth = this.sliceSerialize(w).codePointAt(0) === 61 ? 1 : 2;
  }
  function j() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function Z(w) {
    const P = this.stack[this.stack.length - 1].children;
    let $ = P[P.length - 1];
    (!$ || $.type !== "text") && ($ = Rt(), $.position = {
      start: kt(w.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, P.push($)), this.stack.push($);
  }
  function O(w) {
    const T = this.stack.pop();
    T.value += this.sliceSerialize(w), T.position.end = kt(w.end);
  }
  function b(w) {
    const T = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const P = T.children[T.children.length - 1];
      P.position.end = kt(w.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(T.type) && (Z.call(this, w), O.call(this, w));
  }
  function M() {
    this.data.atHardBreak = !0;
  }
  function X() {
    const w = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = w;
  }
  function ae() {
    const w = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = w;
  }
  function q() {
    const w = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = w;
  }
  function we() {
    const w = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const T = this.data.referenceType || "shortcut";
      w.type += "Reference", w.referenceType = T, delete w.url, delete w.title;
    } else
      delete w.identifier, delete w.label;
    this.data.referenceType = void 0;
  }
  function de() {
    const w = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const T = this.data.referenceType || "shortcut";
      w.type += "Reference", w.referenceType = T, delete w.url, delete w.title;
    } else
      delete w.identifier, delete w.label;
    this.data.referenceType = void 0;
  }
  function be(w) {
    const T = this.sliceSerialize(w), P = this.stack[this.stack.length - 2];
    P.label = A1(T), P.identifier = Gt(T).toLowerCase();
  }
  function We() {
    const w = this.stack[this.stack.length - 1], T = this.resume(), P = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, P.type === "link") {
      const $ = w.children;
      P.children = $;
    } else
      P.alt = T;
  }
  function g() {
    const w = this.resume(), T = this.stack[this.stack.length - 1];
    T.url = w;
  }
  function Q() {
    const w = this.resume(), T = this.stack[this.stack.length - 1];
    T.title = w;
  }
  function Ne() {
    this.data.inReference = void 0;
  }
  function f() {
    this.data.referenceType = "collapsed";
  }
  function fe(w) {
    const T = this.resume(), P = this.stack[this.stack.length - 1];
    P.label = T, P.identifier = Gt(this.sliceSerialize(w)).toLowerCase(), this.data.referenceType = "full";
  }
  function ee(w) {
    this.data.characterReferenceType = w.type;
  }
  function le(w) {
    const T = this.sliceSerialize(w), P = this.data.characterReferenceType;
    let $;
    P ? ($ = ea(T, P === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : $ = Er(T);
    const J = this.stack[this.stack.length - 1];
    J.value += $;
  }
  function ze(w) {
    const T = this.stack.pop();
    T.position.end = kt(w.end);
  }
  function Ee(w) {
    O.call(this, w);
    const T = this.stack[this.stack.length - 1];
    T.url = this.sliceSerialize(w);
  }
  function Ye(w) {
    O.call(this, w);
    const T = this.stack[this.stack.length - 1];
    T.url = "mailto:" + this.sliceSerialize(w);
  }
  function Ke() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function pt() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Ot() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Qe() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function dt() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Oe() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function De() {
    return {
      type: "break"
    };
  }
  function _t() {
    return {
      type: "html",
      value: ""
    };
  }
  function Ae() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Je() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Le(w) {
    return {
      type: "list",
      ordered: w.type === "listOrdered",
      start: null,
      spread: w._spread,
      children: []
    };
  }
  function Dt(w) {
    return {
      type: "listItem",
      spread: w._spread,
      checked: null,
      children: []
    };
  }
  function Pt() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Wt() {
    return {
      type: "strong",
      children: []
    };
  }
  function Rt() {
    return {
      type: "text",
      value: ""
    };
  }
  function ft() {
    return {
      type: "thematicBreak"
    };
  }
}
function kt(e) {
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
    Array.isArray(r) ? ha(e, r) : N1(e, r);
  }
}
function N1(e, t) {
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
  throw e ? new Error("Cannot close `" + e.type + "` (" + nn({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + nn({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + nn({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function L1(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return R1(r, {
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
function M1(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function O1(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function D1(e, t) {
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
function P1(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function H1(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function U1(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = $t(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
  let l, o = e.footnoteCounts.get(r);
  o === void 0 ? (o = 0, e.footnoteOrder.push(r), l = e.footnoteOrder.length) : l = a + 1, o += 1, e.footnoteCounts.set(r, o);
  const s = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (o > 1 ? "-" + o : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(l) }]
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
function F1(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function z1(e, t) {
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
  const l = i[i.length - 1];
  return l && l.type === "text" ? l.value += r : i.push({ type: "text", value: r }), i;
}
function B1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return pa(e, t);
  const i = { src: $t(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function G1(e, t) {
  const n = { src: $t(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function V1(e, t) {
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
function j1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return pa(e, t);
  const i = { href: $t(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function $1(e, t) {
  const n = { href: $t(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function W1(e, t, n) {
  const r = e.all(t), i = n ? Z1(n) : da(t), a = {}, l = [];
  if (typeof t.checked == "boolean") {
    const u = r[0];
    let d;
    u && u.type === "element" && u.tagName === "p" ? d = u : (d = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(d)), d.children.length > 0 && d.children.unshift({ type: "text", value: " " }), d.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), a.className = ["task-list-item"];
  }
  let o = -1;
  for (; ++o < r.length; ) {
    const u = r[o];
    (i || o !== 0 || u.type !== "element" || u.tagName !== "p") && l.push({ type: "text", value: `
` }), u.type === "element" && u.tagName === "p" && !i ? l.push(...u.children) : l.push(u);
  }
  const s = r[r.length - 1];
  s && (i || s.type !== "element" || s.tagName !== "p") && l.push({ type: "text", value: `
` });
  const c = { type: "element", tagName: "li", properties: a, children: l };
  return e.patch(t, c), e.applyData(t, c);
}
function Z1(e) {
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
function q1(e, t) {
  const n = {}, r = e.all(t);
  let i = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length; ) {
    const l = r[i];
    if (l.type === "element" && l.tagName === "li" && l.properties && Array.isArray(l.properties.className) && l.properties.className.includes("task-list-item")) {
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
function X1(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Y1(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function K1(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Q1(e, t) {
  const n = e.all(t), r = n.shift(), i = [];
  if (r) {
    const l = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(t.children[0], l), i.push(l);
  }
  if (n.length > 0) {
    const l = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(n, !0)
    }, o = Cr(t.children[1]), s = Zi(t.children[t.children.length - 1]);
    o && s && (l.position = { start: o, end: s }), i.push(l);
  }
  const a = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function J1(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", l = n && n.type === "table" ? n.align : void 0, o = l ? l.length : t.children.length;
  let s = -1;
  const c = [];
  for (; ++s < o; ) {
    const d = t.children[s], C = {}, p = l ? l[s] : void 0;
    p && (C.align = p);
    let _ = { type: "element", tagName: a, properties: C, children: [] };
    d && (_.children = e.all(d), e.patch(d, _), _ = e.applyData(d, _)), c.push(_);
  }
  const u = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(c, !0)
  };
  return e.patch(t, u), e.applyData(t, u);
}
function eu(e, t) {
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
function tu(e) {
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
function nu(e, t) {
  const n = { type: "text", value: tu(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function ru(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const iu = {
  blockquote: M1,
  break: O1,
  code: D1,
  delete: P1,
  emphasis: H1,
  footnoteReference: U1,
  heading: F1,
  html: z1,
  imageReference: B1,
  image: G1,
  inlineCode: V1,
  linkReference: j1,
  link: $1,
  listItem: W1,
  list: q1,
  paragraph: X1,
  // @ts-expect-error: root is different, but hard to type.
  root: Y1,
  strong: K1,
  table: Q1,
  tableCell: eu,
  tableRow: J1,
  text: nu,
  thematicBreak: ru,
  toml: mn,
  yaml: mn,
  definition: mn,
  footnoteDefinition: mn
};
function mn() {
}
const fa = -1, Rn = 0, an = 1, Tn = 2, Tr = 3, kr = 4, br = 5, Ar = 6, ma = 7, ga = 8, pi = typeof self == "object" ? self : globalThis, au = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, l] = t[i];
    switch (a) {
      case Rn:
      case fa:
        return n(l, i);
      case an: {
        const o = n([], i);
        for (const s of l)
          o.push(r(s));
        return o;
      }
      case Tn: {
        const o = n({}, i);
        for (const [s, c] of l)
          o[r(s)] = r(c);
        return o;
      }
      case Tr:
        return n(new Date(l), i);
      case kr: {
        const { source: o, flags: s } = l;
        return n(new RegExp(o, s), i);
      }
      case br: {
        const o = n(/* @__PURE__ */ new Map(), i);
        for (const [s, c] of l)
          o.set(r(s), r(c));
        return o;
      }
      case Ar: {
        const o = n(/* @__PURE__ */ new Set(), i);
        for (const s of l)
          o.add(r(s));
        return o;
      }
      case ma: {
        const { name: o, message: s } = l;
        return n(new pi[o](s), i);
      }
      case ga:
        return n(BigInt(l), i);
      case "BigInt":
        return n(Object(BigInt(l)), i);
      case "ArrayBuffer":
        return n(new Uint8Array(l).buffer, l);
      case "DataView": {
        const { buffer: o } = new Uint8Array(l);
        return n(new DataView(o), l);
      }
    }
    return n(new pi[a](l), i);
  };
  return r;
}, di = (e) => au(/* @__PURE__ */ new Map(), e)(0), Ft = "", { toString: lu } = {}, { keys: ou } = Object, tn = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Rn, t];
  const n = lu.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [an, Ft];
    case "Object":
      return [Tn, Ft];
    case "Date":
      return [Tr, Ft];
    case "RegExp":
      return [kr, Ft];
    case "Map":
      return [br, Ft];
    case "Set":
      return [Ar, Ft];
    case "DataView":
      return [an, n];
  }
  return n.includes("Array") ? [an, n] : n.includes("Error") ? [ma, n] : [Tn, n];
}, gn = ([e, t]) => e === Rn && (t === "function" || t === "symbol"), su = (e, t, n, r) => {
  const i = (l, o) => {
    const s = r.push(l) - 1;
    return n.set(o, s), s;
  }, a = (l) => {
    if (n.has(l))
      return n.get(l);
    let [o, s] = tn(l);
    switch (o) {
      case Rn: {
        let u = l;
        switch (s) {
          case "bigint":
            o = ga, u = l.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            u = null;
            break;
          case "undefined":
            return i([fa], l);
        }
        return i([o, u], l);
      }
      case an: {
        if (s) {
          let C = l;
          return s === "DataView" ? C = new Uint8Array(l.buffer) : s === "ArrayBuffer" && (C = new Uint8Array(l)), i([s, [...C]], l);
        }
        const u = [], d = i([o, u], l);
        for (const C of l)
          u.push(a(C));
        return d;
      }
      case Tn: {
        if (s)
          switch (s) {
            case "BigInt":
              return i([s, l.toString()], l);
            case "Boolean":
            case "Number":
            case "String":
              return i([s, l.valueOf()], l);
          }
        if (t && "toJSON" in l)
          return a(l.toJSON());
        const u = [], d = i([o, u], l);
        for (const C of ou(l))
          (e || !gn(tn(l[C]))) && u.push([a(C), a(l[C])]);
        return d;
      }
      case Tr:
        return i([o, l.toISOString()], l);
      case kr: {
        const { source: u, flags: d } = l;
        return i([o, { source: u, flags: d }], l);
      }
      case br: {
        const u = [], d = i([o, u], l);
        for (const [C, p] of l)
          (e || !(gn(tn(C)) || gn(tn(p)))) && u.push([a(C), a(p)]);
        return d;
      }
      case Ar: {
        const u = [], d = i([o, u], l);
        for (const C of l)
          (e || !gn(tn(C))) && u.push(a(C));
        return d;
      }
    }
    const { message: c } = l;
    return i([o, { name: s, message: c }], l);
  };
  return a;
}, fi = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return su(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, kn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? di(fi(e, t)) : structuredClone(e)
) : (e, t) => di(fi(e, t));
function uu(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function cu(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function hu(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || uu, r = e.options.footnoteBackLabel || cu, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", l = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const c = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!c)
      continue;
    const u = e.all(c), d = String(c.identifier).toUpperCase(), C = $t(d.toLowerCase());
    let p = 0;
    const _ = [], S = e.footnoteCounts.get(d);
    for (; S !== void 0 && ++p <= S; ) {
      _.length > 0 && _.push({ type: "text", value: " " });
      let F = typeof n == "string" ? n : n(s, p);
      typeof F == "string" && (F = { type: "text", value: F }), _.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + C + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(F) ? F : [F]
      });
    }
    const N = u[u.length - 1];
    if (N && N.type === "element" && N.tagName === "p") {
      const F = N.children[N.children.length - 1];
      F && F.type === "text" ? F.value += " " : N.children.push({ type: "text", value: " " }), N.children.push(..._);
    } else
      u.push(..._);
    const E = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + C },
      children: e.wrap(u, !0)
    };
    e.patch(c, E), o.push(E);
  }
  if (o.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: a,
          properties: {
            ...kn(l),
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
          children: e.wrap(o, !0)
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
      return mu;
    if (typeof e == "function")
      return vn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? pu(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        du(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return fu(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function pu(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Ca(e[n]);
  return vn(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function du(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return vn(n);
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
function fu(e) {
  return vn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function vn(e) {
  return t;
  function t(n, r, i) {
    return !!(gu(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function mu() {
  return !0;
}
function gu(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const ya = [], Cu = !0, mi = !1, yu = "skip";
function wu(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = Ca(i), l = r ? -1 : 1;
  o(e, void 0, [])();
  function o(s, c, u) {
    const d = (
      /** @type {Record<string, unknown>} */
      s && typeof s == "object" ? s : {}
    );
    if (typeof d.type == "string") {
      const p = (
        // `hast`
        typeof d.tagName == "string" ? d.tagName : (
          // `xast`
          typeof d.name == "string" ? d.name : void 0
        )
      );
      Object.defineProperty(C, "name", {
        value: "node (" + (s.type + (p ? "<" + p + ">" : "")) + ")"
      });
    }
    return C;
    function C() {
      let p = ya, _, S, N;
      if ((!t || a(s, c, u[u.length - 1] || void 0)) && (p = _u(n(s, u)), p[0] === mi))
        return p;
      if ("children" in s && s.children) {
        const E = (
          /** @type {UnistParent} */
          s
        );
        if (E.children && p[0] !== yu)
          for (S = (r ? E.children.length : -1) + l, N = u.concat(E); S > -1 && S < E.children.length; ) {
            const F = E.children[S];
            if (_ = o(F, S, N)(), _[0] === mi)
              return _;
            S = typeof _[1] == "number" ? _[1] : S + l;
          }
      }
      return p;
    }
  }
}
function _u(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Cu, e] : e == null ? ya : [e];
}
function wa(e, t, n, r) {
  let i, a, l;
  typeof t == "function" && typeof n != "function" ? (a = void 0, l = t, i = n) : (a = t, l = n, i = r), wu(e, a, o, i);
  function o(s, c) {
    const u = c[c.length - 1], d = u ? u.children.indexOf(s) : void 0;
    return l(s, d, u);
  }
}
const cr = {}.hasOwnProperty, Eu = {};
function xu(e, t) {
  const n = t || Eu, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = { ...iu, ...n.handlers }, o = {
    all: c,
    applyData: Tu,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: l,
    one: s,
    options: n,
    patch: Su,
    wrap: bu
  };
  return wa(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const d = u.type === "definition" ? r : i, C = String(u.identifier).toUpperCase();
      d.has(C) || d.set(C, u);
    }
  }), o;
  function s(u, d) {
    const C = u.type, p = o.handlers[C];
    if (cr.call(o.handlers, C) && p)
      return p(o, u, d);
    if (o.options.passThrough && o.options.passThrough.includes(C)) {
      if ("children" in u) {
        const { children: S, ...N } = u, E = kn(N);
        return E.children = o.all(u), E;
      }
      return kn(u);
    }
    return (o.options.unknownHandler || ku)(o, u, d);
  }
  function c(u) {
    const d = [];
    if ("children" in u) {
      const C = u.children;
      let p = -1;
      for (; ++p < C.length; ) {
        const _ = o.one(C[p], u);
        if (_) {
          if (p && C[p - 1].type === "break" && (!Array.isArray(_) && _.type === "text" && (_.value = gi(_.value)), !Array.isArray(_) && _.type === "element")) {
            const S = _.children[0];
            S && S.type === "text" && (S.value = gi(S.value));
          }
          Array.isArray(_) ? d.push(..._) : d.push(_);
        }
      }
    }
    return d;
  }
}
function Su(e, t) {
  e.position && (t.position = ao(e));
}
function Tu(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, a = e.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element")
        n.tagName = r;
      else {
        const l = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: l };
      }
    n.type === "element" && a && Object.assign(n.properties, kn(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function ku(e, t) {
  const n = t.data || {}, r = "value" in t && !(cr.call(n, "hProperties") || cr.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function bu(e, t) {
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
  const n = xu(e, t), r = n.one(e, void 0), i = hu(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function Au(e, t) {
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
var En = Object.prototype.hasOwnProperty, _a = Object.prototype.toString, wi = Object.defineProperty, _i = Object.getOwnPropertyDescriptor, Ei = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : _a.call(t) === "[object Array]";
}, xi = function(t) {
  if (!t || _a.call(t) !== "[object Object]")
    return !1;
  var n = En.call(t, "constructor"), r = t.constructor && t.constructor.prototype && En.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || En.call(t, i);
}, Si = function(t, n) {
  wi && n.name === "__proto__" ? wi(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, Ti = function(t, n) {
  if (n === "__proto__")
    if (En.call(t, n)) {
      if (_i)
        return _i(t, n).value;
    } else return;
  return t[n];
}, Iu = function e() {
  var t, n, r, i, a, l, o = arguments[0], s = 1, c = arguments.length, u = !1;
  for (typeof o == "boolean" && (u = o, o = arguments[1] || {}, s = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); s < c; ++s)
    if (t = arguments[s], t != null)
      for (n in t)
        r = Ti(o, n), i = Ti(t, n), o !== i && (u && i && (xi(i) || (a = Ei(i))) ? (a ? (a = !1, l = r && Ei(r) ? r : []) : l = r && xi(r) ? r : {}, Si(o, { name: n, newValue: e(u, l, i) })) : typeof i < "u" && Si(o, { name: n, newValue: i }));
  return o;
};
const Wn = /* @__PURE__ */ Wi(Iu);
function hr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Ru() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let a = -1;
    const l = i.pop();
    if (typeof l != "function")
      throw new TypeError("Expected function as last argument, not " + l);
    o(null, ...i);
    function o(s, ...c) {
      const u = e[++a];
      let d = -1;
      if (s) {
        l(s);
        return;
      }
      for (; ++d < i.length; )
        (c[d] === null || c[d] === void 0) && (c[d] = i[d]);
      i = c, u ? vu(u, o)(...c) : l(null, ...c);
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
function vu(e, t) {
  let n;
  return r;
  function r(...l) {
    const o = e.length > l.length;
    let s;
    o && l.push(i);
    try {
      s = e.apply(this, l);
    } catch (c) {
      const u = (
        /** @type {Error} */
        c
      );
      if (o && n)
        throw u;
      return i(u);
    }
    o || (s && s.then && typeof s.then == "function" ? s.then(a, i) : s instanceof Error ? i(s) : a(s));
  }
  function i(l, ...o) {
    n || (n = !0, t(l, ...o));
  }
  function a(l) {
    i(null, l);
  }
}
const st = { basename: Nu, dirname: Lu, extname: Mu, join: Ou, sep: "/" };
function Nu(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  un(e);
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
  let l = -1, o = t.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (a) {
        n = i + 1;
        break;
      }
    } else
      l < 0 && (a = !0, l = i + 1), o > -1 && (e.codePointAt(i) === t.codePointAt(o--) ? o < 0 && (r = i) : (o = -1, r = l));
  return n === r ? r = l : r < 0 && (r = e.length), e.slice(n, r);
}
function Lu(e) {
  if (un(e), e.length === 0)
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
function Mu(e) {
  un(e);
  let t = e.length, n = -1, r = 0, i = -1, a = 0, l;
  for (; t--; ) {
    const o = e.codePointAt(t);
    if (o === 47) {
      if (l) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (l = !0, n = t + 1), o === 46 ? i < 0 ? i = t : a !== 1 && (a = 1) : i > -1 && (a = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  a === 0 || // The (right-most) trimmed path component is exactly `..`.
  a === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function Ou(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    un(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : Du(n);
}
function Du(e) {
  un(e);
  const t = e.codePointAt(0) === 47;
  let n = Pu(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function Pu(e, t) {
  let n = "", r = 0, i = -1, a = 0, l = -1, o, s;
  for (; ++l <= e.length; ) {
    if (l < e.length)
      o = e.codePointAt(l);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(i === l - 1 || a === 1)) if (i !== l - 1 && a === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (s = n.lastIndexOf("/"), s !== n.length - 1) {
              s < 0 ? (n = "", r = 0) : (n = n.slice(0, s), r = n.length - 1 - n.lastIndexOf("/")), i = l, a = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = l, a = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + e.slice(i + 1, l) : n = e.slice(i + 1, l), r = l - i - 1;
      i = l, a = 0;
    } else o === 46 && a > -1 ? a++ : a = -1;
  }
  return n;
}
function un(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const Hu = { cwd: Uu };
function Uu() {
  return "/";
}
function pr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Fu(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!pr(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return zu(e);
}
function zu(e) {
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
const Zn = (
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
class Ea {
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
    t ? pr(t) ? n = { path: t } : typeof t == "string" || Bu(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : Hu.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Zn.length; ) {
      const a = Zn[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      Zn.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? st.basename(this.path) : void 0;
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
    Xn(t, "basename"), qn(t, "basename"), this.path = st.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? st.dirname(this.path) : void 0;
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
    ki(this.basename, "dirname"), this.path = st.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? st.extname(this.path) : void 0;
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
    if (qn(t, "extname"), ki(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = st.join(this.dirname, this.stem + (t || ""));
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
    pr(t) && (t = Fu(t)), Xn(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? st.basename(this.path, this.extname) : void 0;
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
    Xn(t, "stem"), qn(t, "stem"), this.path = st.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new Me(
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
function qn(e, t) {
  if (e && e.includes(st.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + st.sep + "`"
    );
}
function Xn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function ki(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function Bu(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Gu = (
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
), Vu = {}.hasOwnProperty;
class Ir extends Gu {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Ru();
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
      new Ir()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Wn(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (Qn("data", this.frozen), this.namespace[t] = n, this) : Vu.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Qn("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = Cn(t), r = this.parser || this.Parser;
    return Yn("parse", r), r(String(n), n);
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
    return this.freeze(), Yn("process", this.parser || this.Parser), Kn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, l) {
      const o = Cn(t), s = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(o)
      );
      r.run(s, o, function(u, d, C) {
        if (u || !d || !C)
          return c(u);
        const p = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          d
        ), _ = r.stringify(p, C);
        Wu(_) ? C.value = _ : C.result = _, c(
          u,
          /** @type {VFileWithOutput<CompileResult>} */
          C
        );
      });
      function c(u, d) {
        u || !d ? l(u) : a ? a(d) : n(void 0, d);
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
    return this.freeze(), Yn("processSync", this.parser || this.Parser), Kn("processSync", this.compiler || this.Compiler), this.process(t, i), Ai("processSync", "process", n), r;
    function i(a, l) {
      n = !0, yi(a), r = l;
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
    function a(l, o) {
      const s = Cn(n);
      i.run(t, s, c);
      function c(u, d, C) {
        const p = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          d || t
        );
        u ? o(u) : l ? l(p) : r(void 0, p, C);
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
    function a(l, o) {
      yi(l), i = o, r = !0;
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
    const r = Cn(n), i = this.compiler || this.Compiler;
    return Kn("stringify", i), bi(t), i(t, r);
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
    if (Qn("use", this.frozen), t != null) if (typeof t == "function")
      s(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? o(t) : l(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function a(c) {
      if (typeof c == "function")
        s(c, []);
      else if (typeof c == "object")
        if (Array.isArray(c)) {
          const [u, ...d] = (
            /** @type {PluginTuple<Array<unknown>>} */
            c
          );
          s(u, d);
        } else
          l(c);
      else
        throw new TypeError("Expected usable value, not `" + c + "`");
    }
    function l(c) {
      if (!("plugins" in c) && !("settings" in c))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      o(c.plugins), c.settings && (i.settings = Wn(!0, i.settings, c.settings));
    }
    function o(c) {
      let u = -1;
      if (c != null) if (Array.isArray(c))
        for (; ++u < c.length; ) {
          const d = c[u];
          a(d);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + c + "`");
    }
    function s(c, u) {
      let d = -1, C = -1;
      for (; ++d < r.length; )
        if (r[d][0] === c) {
          C = d;
          break;
        }
      if (C === -1)
        r.push([c, ...u]);
      else if (u.length > 0) {
        let [p, ..._] = u;
        const S = r[C][1];
        hr(S) && hr(p) && (p = Wn(!0, S, p)), r[C] = [c, p, ..._];
      }
    }
  }
}
const ju = new Ir().freeze();
function Yn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Kn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Qn(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function bi(e) {
  if (!hr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Ai(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function Cn(e) {
  return $u(e) ? e : new Ea(e);
}
function $u(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Wu(e) {
  return typeof e == "string" || Zu(e);
}
function Zu(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const qu = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Ii = [], Ri = { allowDangerousHtml: !0 }, Xu = /^(https?|ircs?|mailto|xmpp)$/i, Yu = [
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
  const t = Ku(e), n = Qu(e);
  return Ju(t.runSync(t.parse(n), n), e);
}
function Ku(e) {
  const t = e.rehypePlugins || Ii, n = e.remarkPlugins || Ii, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Ri } : Ri;
  return ju().use(L1).use(n).use(Au, r).use(t);
}
function Qu(e) {
  const t = e.children || "", n = new Ea();
  return typeof t == "string" && (n.value = t), n;
}
function Ju(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, l = t.skipHtml, o = t.unwrapDisallowed, s = t.urlTransform || ec;
  for (const u of Yu)
    Object.hasOwn(t, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + qu + u.id, void 0);
  return wa(e, c), co(e, {
    Fragment: ln,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: h,
    jsxs: A,
    passKeys: !0,
    passNode: !0
  });
  function c(u, d, C) {
    if (u.type === "raw" && C && typeof d == "number")
      return l ? C.children.splice(d, 1) : C.children[d] = { type: "text", value: u.value }, d;
    if (u.type === "element") {
      let p;
      for (p in Vn)
        if (Object.hasOwn(Vn, p) && Object.hasOwn(u.properties, p)) {
          const _ = u.properties[p], S = Vn[p];
          (S === null || S.includes(u.tagName)) && (u.properties[p] = s(String(_ || ""), p, u));
        }
    }
    if (u.type === "element") {
      let p = n ? !n.includes(u.tagName) : a ? a.includes(u.tagName) : !1;
      if (!p && r && typeof d == "number" && (p = !r(u, d, C)), p && C && typeof d == "number")
        return o && u.children ? C.children.splice(d, 1, ...u.children) : C.children.splice(d, 1), d;
    }
  }
}
function ec(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    Xu.test(e.slice(0, t)) ? e : ""
  );
}
const z = {
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
}, ke = {
  isThinkingMessage: (e) => e.startsWith(z.THINKING_PREFIX) || e.startsWith(z.REASONING_PREFIX) || e.startsWith(z.THOUGHT_PREFIX),
  isCompletedMessage: (e) => e.includes(z.COMPLETED_MARKER),
  isErrorMessage: (e) => e.includes(z.ERROR_MARKER),
  isHandlingMessage: (e) => e.includes(z.HANDLING_MARKER),
  extractDuration: (e) => {
    const t = e.match(z.PATTERNS.DURATION);
    return t ? ` for ${t[1]} seconds` : void 0;
  },
  cleanReasoningContent: (e) => {
    let t = e.replace(new RegExp(`^${z.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${z.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${z.THOUGHT_PREFIX}\\s*`), "");
    return t = t.replace(/\s*for [\d.]+\s*seconds$/, ""), t = t.replace(z.PATTERNS.THOUGHT_CONTENT, ""), t.trim();
  },
  getMessageType: (e, t) => t === !1 ? ke.isErrorMessage(e) ? z.MESSAGE_TYPES.ERROR : (ke.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || ke.isThinkingMessage(e), z.MESSAGE_TYPES.THOUGHT) : ke.isCompletedMessage(e) ? z.MESSAGE_TYPES.COMPLETED : ke.isErrorMessage(e) ? z.MESSAGE_TYPES.ERROR : (ke.isHandlingMessage(e) || ke.isThinkingMessage(e) && !e.includes(z.UI_TEXT.AI_IS_THINKING), z.MESSAGE_TYPES.THINKING)
};
function tc({ children: e, isStreaming: t }) {
  const [n, r] = K(!0), [i, a] = K(!1);
  zt.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const l = () => {
    t || r(!n);
  }, o = zt.Children.map(e, (s) => {
    if (zt.isValidElement(s)) {
      if (s.type === xa)
        return zt.cloneElement(
          s,
          {
            onToggle: l,
            isExpanded: n
          }
        );
      if (s.type === Sa)
        return zt.cloneElement(
          s,
          {
            isVisible: n
          }
        );
    }
    return s;
  });
  return /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning", children: o });
}
function xa({
  title: e,
  status: t = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const a = () => /* @__PURE__ */ A(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ h(
          "mask",
          {
            id: "mask0_64_36210",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "16",
            height: "16",
            children: /* @__PURE__ */ h("rect", { width: "16", height: "16", fill: "#D9D9D9" })
          }
        ),
        /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36210)", children: /* @__PURE__ */ h(
          "path",
          {
            d: "M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z",
            fill: "#637381"
          }
        ) })
      ]
    }
  ), l = t === "completed" || e.includes(z.UI_TEXT.THINKING) || e.includes(z.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ A(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${l ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: l ? r : void 0,
      style: { cursor: l ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ A("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ h("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        l && /* @__PURE__ */ h(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ A(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ h(
                    "mask",
                    {
                      id: "mask0_44_18068",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ h("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ h("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ h(
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
function Sa({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function nc({ children: e }) {
  return /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function rc({
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
    const u = i.find((d) => d.name === r);
    return (u == null ? void 0 : u.description) || null;
  };
  let l;
  if (r != null && r.startsWith("lat_")) {
    const u = (s = n == null ? void 0 : n.parameters) == null ? void 0 : s.query, d = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.url;
    l = u || d || "Executing tool...";
  } else
    l = a();
  return l && (l.startsWith("http://") || l.startsWith("https://") || (l = l.charAt(0).toUpperCase() + l.slice(1))), /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ A("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ h("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ h("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ h("span", { children: l }),
          /* @__PURE__ */ A("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ h(
                    "mask",
                    {
                      id: "mask0_64_36278",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ h(
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
                  /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ h(
                    "path",
                    {
                      d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ h("span", { children: "Running..." })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ A("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ h("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ h("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ h("span", { children: l }),
          /* @__PURE__ */ A("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ h(
                    "mask",
                    {
                      id: "mask0_64_36345",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ h(
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
                  /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36345)", children: /* @__PURE__ */ h(
                    "path",
                    {
                      d: "M7.1501 10.7819L11.1168 6.83193L10.2668 5.98193L7.1501 9.08193L5.73343 7.68193L4.88343 8.53193L7.1501 10.7819ZM8.0001 14.7819C7.12232 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.643 2.1001 10.8653C1.76676 10.0875 1.6001 9.25971 1.6001 8.38193C1.6001 7.49304 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73899 2.81527 5.51676 2.48193C6.29454 2.1486 7.12232 1.98193 8.0001 1.98193C8.88899 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11805 13.9001 5.89027C14.2334 6.66249 14.4001 7.49304 14.4001 8.38193C14.4001 9.25971 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.264 13.9486 10.4918 14.2819C9.71954 14.6153 8.88899 14.7819 8.0001 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819Z",
                      fill: "#4EAD13"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ h("span", { children: "Completed" })
          ] })
        ] });
      case "error":
        return /* @__PURE__ */ A("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ h(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ h(
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
          /* @__PURE__ */ h("span", { className: "chat-wrapper__tooling-handle-title", children: e })
        ] });
      default:
        return /* @__PURE__ */ A("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ h("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ h("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ A("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ h(
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
                /* @__PURE__ */ h("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
            "svg",
            {
              width: "20",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ h("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ h(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ h("span", { children: "Pending..." })
        ] });
    }
  })() });
}
const ic = ({
  className: e,
  onClick: t,
  size: n = 24,
  color: r = "currentColor"
}) => /* @__PURE__ */ A(
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
      /* @__PURE__ */ h(
        "path",
        {
          d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
          fill: r
        }
      ),
      /* @__PURE__ */ h("circle", { cx: "7", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ h("circle", { cx: "12", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ h("circle", { cx: "17", cy: "10", r: "1", fill: r })
    ]
  }
), ac = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ h(
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
    children: /* @__PURE__ */ h(
      "path",
      {
        d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
        fill: r
      }
    )
  }
), lc = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor",
  isFullscreen: i = !1
}) => /* @__PURE__ */ h(
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
      /* @__PURE__ */ h(
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
      /* @__PURE__ */ h(
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
), oc = ({
  className: e,
  onClick: t,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ h(
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
    children: /* @__PURE__ */ h(
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
), Ni = ({
  className: e,
  onClick: t,
  size: n = 16,
  color: r = "currentColor"
}) => /* @__PURE__ */ h(
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
    children: /* @__PURE__ */ h(
      "path",
      {
        d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
        fill: r
      }
    )
  }
), sc = ({
  className: e,
  onClick: t,
  size: n = 18,
  color: r = "currentColor"
}) => /* @__PURE__ */ A(
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
      /* @__PURE__ */ h("mask", { id: "mask0_444_23118", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "18", height: "18", children: /* @__PURE__ */ h("rect", { width: "18", height: "18", fill: "#D9D9D9" }) }),
      /* @__PURE__ */ h("g", { mask: "url(#mask0_444_23118)", children: /* @__PURE__ */ h(
        "path",
        {
          d: "M5.8498 13.4998C5.47855 13.4998 5.16074 13.3676 4.89637 13.1032C4.63199 12.8389 4.4998 12.5211 4.4998 12.1498V3.1498C4.4998 2.77855 4.63199 2.46074 4.89637 2.19637C5.16074 1.93199 5.47855 1.7998 5.8498 1.7998H14.8498C15.2211 1.7998 15.5389 1.93199 15.8032 2.19637C16.0676 2.46074 16.1998 2.77855 16.1998 3.1498V12.1498C16.1998 12.5211 16.0676 12.8389 15.8032 13.1032C15.5389 13.3676 15.2211 13.4998 14.8498 13.4998H5.8498ZM5.8498 12.1498H14.8498V3.1498H5.8498V12.1498ZM3.1498 16.1998C2.77855 16.1998 2.46074 16.0676 2.19637 15.8032C1.93199 15.5389 1.7998 15.2211 1.7998 14.8498V4.4998H3.1498V14.8498H13.4998V16.1998H3.1498Z",
          fill: r
        }
      ) })
    ]
  }
), uc = ({ message: e }) => {
  const [t, n] = K(!0);
  return /* @__PURE__ */ A("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ A(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!t),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          e.role === "system" ? /* @__PURE__ */ A("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
              "svg",
              {
                width: "20",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ h(
                    "mask",
                    {
                      id: "mask0_64_36257",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ h("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ h("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ h(
                    "path",
                    {
                      d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }),
            /* @__PURE__ */ h("span", { children: "AI text input <show-toolname>..." })
          ] }) : /* @__PURE__ */ h("span", { children: "System Message" }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
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
                /* @__PURE__ */ h(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ h("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ h("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ h(
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
    t && /* @__PURE__ */ h("div", { className: "chat-wrapper__system-message-content", children: /* @__PURE__ */ h("span", { children: e.content }) })
  ] });
}, Ta = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ h("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code-block", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ h("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ h("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ h("li", { className: "chat-wrapper__list-item", ...t, children: e })
}, cc = {
  ...Ta,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code", ...n, children: e })
}, ka = Li(
  ({
    message: e,
    getReasoningTitle: t,
    getReasoningStatus: n,
    getReasoningDuration: r,
    getReasoningContentOnly: i,
    getToolingTitle: a,
    getToolingStatus: l,
    clientTools: o,
    currentAssistantMessageIdRef: s
  }) => {
    const [c, u] = K(!1), [d, C] = K(!1), p = he(async () => {
      try {
        await navigator.clipboard.writeText(e.content), u(!0), setTimeout(() => u(!1), 2e3);
      } catch (V) {
        console.error("Failed to copy message:", V);
      }
    }, [e.content]), _ = () => /* @__PURE__ */ A("div", { className: "chat-wrapper__streaming-placeholder", children: [
      /* @__PURE__ */ h(Ui, { size: 16, variant: "dots" }),
      /* @__PURE__ */ h("span", { children: z.UI_TEXT.THINKING })
    ] }), S = () => /* @__PURE__ */ A(ln, { children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ h(
        "button",
        {
          className: `chat-wrapper__copy-button ${d ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: p,
          title: "Copy message",
          children: /* @__PURE__ */ h(sc, {})
        }
      ) }),
      c && /* @__PURE__ */ h("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), N = () => /* @__PURE__ */ h("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ A("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(vi, { components: Ta, children: e.content }) }),
      S()
    ] }) }), E = () => /* @__PURE__ */ A("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(vi, { components: cc, children: e.content }) }),
      e.media && e.media.length > 0 && /* @__PURE__ */ h("div", { className: "chat-wrapper__media", children: e.media.map((V, y) => /* @__PURE__ */ h(
        "img",
        {
          src: V,
          alt: `Uploaded content ${y + 1}`,
          className: "chat-wrapper__media-image"
        },
        y
      )) })
    ] }), F = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === s.current ? _() : e.role === "system" ? /* @__PURE__ */ h(uc, { message: e }) : e.role === "assistant" ? N() : E(), R = () => /* @__PURE__ */ A(tc, { isStreaming: e.isStreaming || !1, children: [
      /* @__PURE__ */ h(
        xa,
        {
          title: t(e.content, e.isStreaming),
          status: n(e.content, e.isStreaming),
          duration: r(e.content)
        }
      ),
      /* @__PURE__ */ h(Sa, { children: i(e.content) })
    ] }), H = () => {
      var V;
      return /* @__PURE__ */ h(nc, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ h(
        rc,
        {
          title: a(e.content, e.isStreaming),
          status: l(e.content, e.isStreaming),
          toolData: e.toolData,
          toolName: (V = e.toolData) == null ? void 0 : V.toolName,
          clientTools: o
        }
      ) });
    };
    return /* @__PURE__ */ h(
      "div",
      {
        className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
        onMouseEnter: () => e.role === "assistant" && C(!0),
        onMouseLeave: () => e.role === "assistant" && C(!1),
        children: e.role === "reasoning" ? R() : e.role === "tooling" ? H() : /* @__PURE__ */ h("div", { className: "chat-wrapper__message-content", children: F() })
      }
    );
  }
);
ka.displayName = "MessageItem";
const hc = ({ isVisible: e }) => e ? /* @__PURE__ */ h("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ A("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ h("span", {}),
  /* @__PURE__ */ h("span", {}),
  /* @__PURE__ */ h("span", {})
] }) }) }) }) : null, ba = dr(({
  messages: e,
  isThinking: t,
  isHandlingTool: n,
  getReasoningTitle: r,
  getReasoningStatus: i,
  getReasoningDuration: a,
  getReasoningContentOnly: l,
  getToolingTitle: o,
  getToolingStatus: s,
  clientTools: c,
  currentAssistantMessageIdRef: u
}, d) => /* @__PURE__ */ A("div", { className: "chat-wrapper__messages", children: [
  e.map((C) => /* @__PURE__ */ h(
    ka,
    {
      message: C,
      getReasoningTitle: r,
      getReasoningStatus: i,
      getReasoningDuration: a,
      getReasoningContentOnly: l,
      getToolingTitle: o,
      getToolingStatus: s,
      clientTools: c,
      currentAssistantMessageIdRef: u
    },
    C.id
  )),
  /* @__PURE__ */ h(hc, { isVisible: t && !n }),
  /* @__PURE__ */ h("div", { ref: d })
] }));
ba.displayName = "MessagesList";
const pc = {
  maxReconnectAttempts: 5,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, dc = {
  NORMAL: 1e3,
  GOING_AWAY: 1001
};
var lt = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(lt || {}), wt = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e))(wt || {}), Ve = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(Ve || {}), xn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(xn || {}), bt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(bt || {});
class Vt {
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
    return this.createConnectionEvent(lt.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(lt.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(lt.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(lt.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(lt.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(lt.CHAT_ERROR, { error: t, errorCode: n });
  }
}
class At {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(t) {
    return {
      type: wt.CHAT_MESSAGE,
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
      type: wt.CONFIGURE_TOOLS,
      toolSchemas: t,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(t) {
    return {
      type: wt.UPDATE_TOOLS,
      toolSchemas: t
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(t) {
    return {
      type: wt.UPDATE_CONTEXT_HELPERS,
      contextHelpers: t
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(t, n) {
    return {
      type: wt.TOOL_CALL_RESPONSE,
      callId: t,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(t, n) {
    return {
      type: wt.TOOL_CALL_RESPONSE,
      callId: t,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: wt.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(t, n) {
    return {
      type: wt.HEARTBEAT_PONG,
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
class fc {
  constructor(t, n) {
    ie(this, "ws", null);
    ie(this, "config");
    ie(this, "connectionState");
    ie(this, "reconnectTimer", null);
    ie(this, "heartbeatInterval", null);
    ie(this, "visibilityChangeHandler");
    ie(this, "onOpen");
    ie(this, "onMessage");
    ie(this, "onError");
    ie(this, "onClose");
    ie(this, "onSystemEvent");
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
    const { NORMAL: n, GOING_AWAY: r } = dc;
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
        Vt.connectionLost("Max reconnection attempts reached")
      ));
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    (a = this.onSystemEvent) == null || a.call(this, Vt.reconnecting(t, n)), this.reconnectTimer = window.setTimeout(() => {
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
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Vt.connectionRestored()), (n = this.onOpen) == null || n.call(this);
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
    const t = At.serializeHeartbeatPing();
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
class mc {
  constructor() {
    ie(this, "state");
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
class bn {
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
    ie(this, "handlers", {});
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
class gc extends Aa {
  constructor(n) {
    super({ onReasoningUpdate: n });
    ie(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    ie(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, l) {
    const o = this.getHandler("onReasoningUpdate");
    if (!o) return;
    const s = bn.createReasoningCall(
      i,
      a,
      l || {}
    );
    o(n, r, s);
  }
  handleReasoningStart(n) {
    const r = n.id || "reasoning";
    this.reasoningStartTimes.set(r, Date.now()), this.reasoningContent.set(r, "");
  }
  handleReasoningDelta(n) {
    if (!n.text) return;
    const r = n.id || "reasoning", a = (this.reasoningContent.get(r) || "") + n.text;
    this.reasoningContent.set(r, a);
    const l = `${z.THINKING_PREFIX} ${a}`;
    this.triggerReasoningUpdate(
      !0,
      l,
      r,
      "thinking",
      { text: a }
    );
  }
  handleReasoningEnd(n) {
    const r = n.id || "reasoning", i = this.reasoningContent.get(r) || "", a = this.reasoningStartTimes.get(r);
    let l = "";
    a && (l = ` for ${((Date.now() - a) / 1e3).toFixed(1)} seconds`, this.reasoningStartTimes.delete(r));
    const o = i || z.UI_TEXT.THOUGHT, s = `${z.THOUGHT_PREFIX} ${o}${l}`;
    this.triggerReasoningUpdate(
      !1,
      s,
      r,
      "end",
      { duration: l, fullContent: i }
    ), this.reasoningContent.delete(r);
  }
  setReasoningUpdateHandler(n) {
    this.updateEventHandlers({ onReasoningUpdate: n });
  }
}
class Cc extends Aa {
  constructor(n = {}, r) {
    super({ onReasoningUpdate: r });
    ie(this, "processedToolCalls", /* @__PURE__ */ new Set());
    ie(this, "clientTools", {});
    ie(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var l, o, s;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (l = this.getHandler("onReasoningUpdate")) == null || l(!0, `${z.HANDLING_MARKER} ${i}`, n);
      try {
        const c = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, c), (o = this.getHandler("onReasoningUpdate")) == null || o(!1, `${z.COMPLETED_MARKER} ${i}`, n);
      } catch (c) {
        this.sendToolError(r, c), (s = this.getHandler("onReasoningUpdate")) == null || s(!1, `${z.ERROR_MARKER} Error: ${i} - ${c}`, n);
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
    const i = At.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = At.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = bn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId,
        n.args || {}
      );
      r(!0, `${z.HANDLING_MARKER} ${n.toolName}`, a);
    }
  }
  handleServerToolResult(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = bn.createLatitudeToolCall(
        n.toolName,
        n.toolCallId
      );
      r(
        !1,
        `${z.COMPLETED_MARKER} ${n.toolName}`,
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
class yc {
  constructor(t, n = {}) {
    ie(this, "reasoningHandler");
    ie(this, "toolHandler");
    ie(this, "handlers");
    ie(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new gc(t.onReasoningUpdate), this.toolHandler = new Cc(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case Ve.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case Ve.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case Ve.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case Ve.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case Ve.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case Ve.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case Ve.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case Ve.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case Ve.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case Ve.HEARTBEAT_ACK:
          break;
        case Ve.ERROR:
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
      case xn.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case xn.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case xn.CONTENT_DELTA:
        (n = t.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, t.data.delta));
        break;
    }
  }
  handleProviderEvent(t) {
    var r, i, a;
    switch ((r = t.data) == null ? void 0 : r.type) {
      case bt.TEXT_DELTA:
        t.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, t.data.textDelta));
        break;
      case bt.REASONING_START:
        this.reasoningHandler.handleReasoningStart(t.data);
        break;
      case bt.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(t.data);
        break;
      case bt.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(t.data);
        break;
      case bt.TOOL_CALL:
        this.toolHandler.handleServerToolCall(t.data);
        break;
      case bt.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(t.data);
        break;
    }
  }
  handleLatitudeEvent(t) {
    var n;
    if (((n = t.data) == null ? void 0 : n.type) === bt.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = t.data;
      if (r.toolCallId && r.toolName) {
        const i = bn.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${z.COMPLETED_MARKER} ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Vt.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Vt.chatError(t.error || "Unknown error"));
  }
  handleToolCallRequest(t) {
    this.toolHandler.handleToolCallRequest(t);
  }
  handleHeartbeatPing(t) {
    if (!this.sendMessage)
      return;
    const n = At.serializeHeartbeatPong(
      t.timestamp,
      t.pingTime
    );
    this.sendMessage(n);
  }
  handleError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Vt.chatError(t.error || "Unknown WebSocket error"));
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
class wc {
  constructor() {
    ie(this, "config");
    ie(this, "connectionState");
    ie(this, "wsManager");
    ie(this, "messageHandler");
    ie(this, "initResolve");
    // Client tools and context
    ie(this, "toolSchemas", []);
    ie(this, "contextHelpers", {});
    this.config = {
      ...pc
    }, this.connectionState = new mc(), this.wsManager = new fc(this.config, this.connectionState), this.messageHandler = new yc({}), this.setupWebSocketHandlers();
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
    (n == null ? void 0 : n.type) === Ve.TOOLS_CONFIGURED && ((r = this.initResolve) == null || r.call(this)), (n == null ? void 0 : n.type) === Ve.SESSION_ESTABLISHED && (!this.toolSchemas || this.toolSchemas.length === 0) && ((i = this.initResolve) == null || i.call(this));
  }
  handleConnectionOpen() {
    this.toolSchemas && this.toolSchemas.length > 0 && this.sendToolConfiguration();
  }
  sendToolConfiguration() {
    const t = At.serializeConfigureTools(
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
      agentPromptPath: l
    } = t;
    try {
      this.messageHandler.clearProcessedToolCalls();
      const o = At.serializeChatMessage({
        content: n,
        app: r,
        media: i,
        userId: this.config.userId,
        convUuid: a,
        agentPromptPath: l,
        saveToDatabase: !1
      });
      this.wsManager.send(o);
    } catch (o) {
      throw o;
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
    const n = At.serializeUpdateContextHelpers(this.contextHelpers);
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = At.serializeUpdateTools(this.toolSchemas);
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
async function vc(e, t, n) {
  const r = new URLSearchParams();
  n != null && n.includeArchived && r.append("includeArchived", "true"), n != null && n.limit && r.append("limit", n.limit.toString());
  const i = `${e}/threads/user/${t}${r.toString() ? `?${r.toString()}` : ""}`, a = await fetch(i);
  if (!a.ok) {
    const o = await a.json().catch(() => ({
      error: "Failed to fetch threads"
    }));
    throw new Error(o.error || "Failed to fetch threads");
  }
  return (await a.json()).threads;
}
async function Nc(e, t) {
  const n = `${e}/threads/conv/${t}`, r = await fetch(n);
  if (!r.ok) {
    const i = await r.json().catch(() => ({
      error: "Thread not found"
    }));
    throw new Error(i.error || "Thread not found");
  }
  return r.json();
}
async function _c(e, t) {
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
async function Lc(e, t) {
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
async function Mc(e, t, n, r) {
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
    const l = await a.json().catch(() => ({
      error: "Failed to create thread"
    }));
    throw new Error(l.error || "Failed to create thread");
  }
  return a.json();
}
function Ec({
  apiUrl: e,
  config: t,
  tools: n,
  clientTools: r,
  initialMessages: i = [],
  userId: a,
  devMode: l = !1,
  app: o,
  contextHelpers: s
}) {
  var qt;
  const c = he((I) => I.replace(
    /^wss?:\/\//,
    (D) => D === "wss://" ? "https://" : "http://"
  ), []), u = Nt(() => c(e), [e, c]), [d, C] = K(
    null
  ), [p, _] = K(!1), S = Ct(null), [N, E] = K(i), [F, R] = K(!1), [H, V] = K(!1), [y, U] = K("idle"), [j, Z] = K(!1), [O, b] = K(t.mode), [M, X] = K(!1), [ae, q] = K(
    null
  ), [we, de] = K(null), [be, We] = K(null), [g] = K([]), [Q, Ne] = K(""), [f, fe] = K(!1), [, ee] = K(""), [le, ze] = K(""), [Ee, Ye] = K(!1), [, Ke] = K(
    /* @__PURE__ */ new Map()
  ), [, pt] = K(
    /* @__PURE__ */ new Map()
  ), [Ot, Qe] = K(!1), dt = Ct(null), Oe = Ct(null), De = Ct(null), _t = Ct(!0), Ae = Ct(""), Je = Ct(!1), Le = he(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), Dt = Nt(
    () => (I, D) => D === !1 ? ke.isErrorMessage(I) ? "error" : "completed" : ke.isCompletedMessage(I) ? "completed" : ke.isErrorMessage(I) ? "error" : "processing",
    []
  ), Pt = Nt(
    () => (I) => ke.extractDuration(I),
    []
  ), Wt = Nt(
    () => (I) => ke.cleanReasoningContent(I),
    []
  ), Rt = Nt(
    () => (I, D) => {
      switch (ke.getMessageType(
        I,
        D
      )) {
        case z.MESSAGE_TYPES.ERROR:
          return "Error";
        case z.MESSAGE_TYPES.COMPLETED:
          return "Completed";
        case z.MESSAGE_TYPES.THOUGHT:
          return z.UI_TEXT.THOUGHT;
        case z.MESSAGE_TYPES.THINKING:
        default:
          return z.UI_TEXT.THINKING_ELLIPSIS;
      }
    },
    []
  ), ft = Nt(
    () => (I, D) => D === !1 ? I.includes(z.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : I.includes(z.COMPLETED_MARKER) || I.includes("✅") ? "Tool Completed" : I.includes(z.ERROR_MARKER) ? "Tool Error" : (I.includes(z.HANDLING_MARKER), "Tool Processing..."),
    []
  ), w = Nt(
    () => (I, D) => D === !1 ? I.includes(z.ERROR_MARKER) ? "error" : "completed" : I.includes(z.COMPLETED_MARKER) || I.includes("✅") ? "completed" : I.includes(z.ERROR_MARKER) ? "error" : "processing",
    []
  ), T = he(
    (I, D) => {
      const G = wn(D, I === "assistant");
      E((ue) => [
        ...ue,
        {
          id: Le(),
          role: I,
          content: G,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [Le]
  ), P = he(() => {
    if (De.current && Ae.current) {
      const I = wn(
        Ae.current,
        !0
      );
      return E(
        (D) => D.map(
          (te) => te.id === De.current ? {
            ...te,
            content: I,
            isStreaming: !1
          } : te
        )
      ), De.current = null, Ae.current = "", ze(""), !0;
    }
    return !1;
  }, []), $ = he(() => {
    R(!1), fe(!1), U("idle"), P(), setTimeout(() => {
      var I;
      (I = Oe.current) == null || I.focus();
    }, 0);
  }, [P]), J = he(
    (I) => {
      console.error("Chat error:", I), R(!1), fe(!1), U("error"), P(), T("system", `❌ Chat error: ${I}`);
    },
    [T, P]
  ), xe = he(async () => {
    try {
      const I = new wc();
      S.current = I, C(I);
      const D = s || {};
      await I.onInit({
        apiUrl: e,
        userId: a,
        toolSchemas: r,
        clientTools: n,
        contextHelpers: D,
        onSetMessage: (te) => {
          const G = wn(te, !0);
          if (De.current)
            Ae.current += G, ze(Ae.current), E(
              (ue) => ue.map(
                (ce) => ce.id === De.current ? {
                  ...ce,
                  content: Ae.current,
                  isStreaming: !0
                } : ce
              )
            );
          else {
            fe(!1);
            const ue = Le();
            De.current = ue, Ae.current = G, ze(G);
            const ce = {
              id: ue,
              role: "assistant",
              content: G,
              timestamp: /* @__PURE__ */ new Date(),
              isStreaming: !0
            };
            E((Se) => [...Se, ce]);
          }
        },
        onSystemEvent: (te) => {
          var G;
          switch (te.type) {
            case lt.CHAT_COMPLETED:
              $();
              break;
            case lt.CHAT_ERROR:
              (G = te.data) != null && G.error && J(te.data.error);
              break;
            case lt.CONNECTION_LOST:
              break;
            case lt.CONNECTION_RESTORED:
              break;
            default:
              break;
          }
        },
        onReasoningUpdate: (te, G, ue) => {
          const { callId: ce } = ue || {};
          if (Ye(te), ee(G), !ce)
            return;
          const Se = ke.isThinkingMessage(G) && !G.includes("for") && !G.includes("seconds"), _e = ke.isThinkingMessage(G) && G.includes("for") && G.includes("seconds"), rt = ke.isHandlingMessage(G), mt = ke.isCompletedMessage(G), St = ke.isErrorMessage(G);
          (Se || _e) && pt((Tt) => {
            const it = new Map(Tt), L = it.get(ce);
            if (Se && !L) {
              P();
              const m = Le();
              it.set(ce, m);
              const x = {
                id: m,
                role: "reasoning",
                content: G,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0
              };
              E((v) => [...v, x]);
            } else _e && L ? (E(
              (m) => m.map(
                (x) => x.id === L ? {
                  ...x,
                  content: G,
                  isStreaming: !1
                  // Mark as completed
                } : x
              )
            ), it.delete(ce)) : L && Se && E(
              (m) => m.map(
                (x) => x.id === L ? {
                  ...x,
                  content: G,
                  isStreaming: !0
                } : x
              )
            );
            return it;
          }), Ke((Tt) => {
            const it = new Map(Tt), L = it.get(ce);
            if (rt && !L) {
              P();
              const m = G.match(
                z.PATTERNS.HANDLING_TOOL
              ), x = m ? m[1] : "Unknown Tool", v = Le();
              it.set(ce, v);
              const ne = {
                id: v,
                role: "tooling",
                content: G,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0,
                toolData: {
                  ...ue,
                  toolName: x,
                  callId: ce,
                  status: "processing"
                }
              };
              E((Te) => [...Te, ne]);
            } else if ((mt || St) && L) {
              const m = G.match(
                z.PATTERNS.COMPLETED_OR_ERROR_TOOL
              ), x = m ? m[1] : "Unknown Tool";
              E(
                (v) => v.map(
                  (ne) => ne.id === L ? {
                    ...ne,
                    content: G,
                    isStreaming: !1,
                    // Mark as completed
                    toolData: {
                      ...ne.toolData,
                      toolName: x,
                      status: St ? "error" : "completed",
                      callId: ce ?? ""
                    }
                  } : ne
                )
              ), it.delete(ce);
            } else L && Ee && !mt && !St && E(
              (m) => m.map(
                (x) => x.id === L ? {
                  ...x,
                  content: G,
                  isStreaming: !0
                } : x
              )
            );
            return it;
          });
        }
      }), _(!0);
    } catch (I) {
      console.error("Error connecting WebSocketChatClient:", I), _(!1);
    }
  }, [
    e,
    r,
    n,
    t,
    Le,
    T,
    $,
    J,
    P
  ]), Ze = he(() => {
    S.current && (S.current.disconnect(), S.current = null), C(null), _(!1);
  }, []), Ie = he(() => {
    Ye(!1), _t.current = !0;
  }, []), Re = Ct(null), me = he(() => {
    Re.current && cancelAnimationFrame(Re.current), Re.current = requestAnimationFrame(() => {
      var I;
      (I = dt.current) == null || I.scrollIntoView({ behavior: "smooth" }), Re.current = null;
    });
  }, []);
  ut(() => {
    me();
  }, [N, me]), ut(() => {
    le && me();
  }, [le, me]), ut(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(Q);
  }, [Q, t]), ut(() => (xe(), () => {
    Ze(), Re.current && cancelAnimationFrame(Re.current);
  }), [xe, Ze]), ut(() => {
    const I = setInterval(() => {
      if (S.current) {
        const D = S.current.getConnectionStatus();
        _(D.connected);
      }
    }, 1e3);
    return () => clearInterval(I);
  }, []), ut(() => {
    (async () => {
      if (a && !Je.current && !M && !(N.length > 0))
        try {
          X(!0), q(null);
          const D = [];
          if (D.length === 0) {
            X(!1), Je.current = !0;
            return;
          }
          const te = D[0];
          de(te.id), We(te.convUuid);
          const G = await _c(
            u,
            te.id
          );
          E(G), Je.current = !0;
        } catch (D) {
          console.error("❌ Error loading conversation:", D), q(
            D instanceof Error ? D.message : "Failed to load conversation"
          ), Je.current = !0;
        } finally {
          X(!1);
        }
    })();
  }, [a, u]);
  const pe = he(
    async (I, D) => {
      if (!I.trim() || F || !d || !p)
        return;
      const te = {
        id: Le(),
        role: "user",
        content: I.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: D
      };
      E((G) => [...G, te]), R(!0), fe(!0), U("submitted"), Ne("Starting...");
      try {
        await d.onTriggerMessage({
          message: te.content,
          app: o,
          media: D,
          convUuid: be || void 0,
          agentPromptPath: void 0
        }), U("streaming");
      } catch (G) {
        console.error("Agent client send error:", G), fe(!1), U("error"), T(
          "system",
          `Sorry, there was an error: ${G instanceof Error ? G.message : "Unknown error"}`
        ), t.onError && t.onError(
          G instanceof Error ? G : new Error("Unknown error")
        ), R(!1), U("idle"), Ne("");
      }
    },
    [
      F,
      d,
      p,
      Le,
      T,
      t,
      be
    ]
  ), et = he(() => {
    R(!1), U("idle"), Ne(""), fe(!1), ee(""), De.current = null, Ae.current = "", ze(""), Ie();
  }, [Ie]), Pe = he(
    async (I) => {
      const D = [], te = e, G = "chat-uploads";
      for (const ue of I)
        try {
          const ce = new FormData();
          ce.append("file", ue), ce.append("folder", G);
          const Se = await fetch(`${te}/upload`, {
            method: "POST",
            body: ce
          }), _e = await Se.json();
          if (Se.ok)
            ue.type.startsWith("image/") ? D.push(_e.url) : D.push(
              `data:${ue.type};name=${encodeURIComponent(
                _e.fileName || ue.name
              )};url=${encodeURIComponent(_e.url)}`
            );
          else if (console.error("❌ Upload failed:", _e.error), ue.type.startsWith("image/")) {
            const rt = new FileReader(), mt = await new Promise(
              (St, Tt) => {
                rt.onload = () => St(rt.result), rt.onerror = Tt, rt.readAsDataURL(ue);
              }
            );
            D.push(mt);
          } else
            D.push(
              `data:${ue.type};name=${encodeURIComponent(
                ue.name
              )};base64,placeholder`
            );
        } catch (ce) {
          console.error("Error uploading file:", ce);
          try {
            if (ue.type.startsWith("image/")) {
              const Se = new FileReader(), _e = await new Promise(
                (rt, mt) => {
                  Se.onload = () => rt(Se.result), Se.onerror = mt, Se.readAsDataURL(ue);
                }
              );
              D.push(_e);
            } else
              D.push(
                `data:${ue.type};name=${encodeURIComponent(
                  ue.name
                )};base64,placeholder`
              );
          } catch (Se) {
            console.error("Error in fallback encoding:", Se);
          }
        }
      return D;
    },
    [e]
  ), Nn = he(() => {
    V(!0);
  }, []), Et = he(() => {
    V(!1);
  }, []), vt = he(() => {
    Z((I) => !I);
  }, []), Ln = he(() => {
    b((I) => I === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  ut(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const I = (D) => {
      D.key === "Escape" && O === "modal" && H && Et();
    };
    if (O === "modal" && H)
      return document.addEventListener("keydown", I), () => document.removeEventListener("keydown", I);
  }, [O, H, Et]);
  const Mn = ((...I) => I.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${O}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`,
    j && "chat-wrapper--collapsed",
    O === "embedded" && t.constrainedHeight && "chat-wrapper--constrained"
  ), cn = () => {
    var D;
    if (O === "modal" && !H || O === "sidebar" && j || O === "fullscreen" && j) {
      const te = O === "modal" ? Nn : vt, G = O === "modal" ? `Open ${t.appName}` : `Expand ${t.appName}`;
      return /* @__PURE__ */ A(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: te,
          title: G,
          children: [
            /* @__PURE__ */ h(ic, { className: "chat-wrapper__bubble-icon", size: 24 }),
            ((D = t.features) == null ? void 0 : D.showBubbleText) !== !1 && /* @__PURE__ */ h("span", { className: "chat-wrapper__bubble-text", children: t.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, ge = () => O === "modal" && H ? /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: Et,
      title: "Close chat",
      children: /* @__PURE__ */ h(ac, { size: 20 })
    }
  ) : null, xt = () => {
    if ((O === "sidebar" || O === "fullscreen") && !j) {
      const I = O === "fullscreen";
      return /* @__PURE__ */ h(
        "button",
        {
          className: I ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: Ln,
          title: I ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ h(lc, { size: 20, isFullscreen: I })
        }
      );
    }
    return null;
  }, On = () => (O === "sidebar" || O === "fullscreen") && !j ? /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: vt,
      title: "Collapse chat",
      children: /* @__PURE__ */ h(oc, { size: 20 })
    }
  ) : null, hn = () => l && t.headerVisible !== !1 ? /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__settings-button",
      onClick: () => Qe(!0),
      title: "Developer Settings",
      children: /* @__PURE__ */ h(Ni, { size: 16 })
    }
  ) : null, Zt = () => !l || t.headerVisible !== !1 ? null : /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
      onClick: () => Qe(!0),
      title: "Developer Settings",
      children: /* @__PURE__ */ h(Ni, { size: 16 })
    }
  ), pn = () => {
    var I;
    return !((I = t.features) != null && I.showToolResults) || g.length === 0 ? null : /* @__PURE__ */ A("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ h("h4", { children: "Tool Results" }),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__tool-results-list", children: g.map((D) => /* @__PURE__ */ A("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ h("div", { className: "chat-wrapper__tool-result-title", children: D.title }),
        D.description && /* @__PURE__ */ h("div", { className: "chat-wrapper__tool-result-description", children: D.description }),
        /* @__PURE__ */ A("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          D.status || "completed"
        ] })
      ] }, D.id)) })
    ] });
  };
  return O === "modal" && !H || (O === "sidebar" || O === "fullscreen") && j ? cn() : /* @__PURE__ */ h(ln, { children: /* @__PURE__ */ A("div", { className: Mn, style: t.customStyles, children: [
    Zt(),
    t.headerVisible !== !1 && /* @__PURE__ */ A("div", { className: "chat-wrapper__header", children: [
      /* @__PURE__ */ h("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ h("h2", { className: "chat-wrapper__title", children: t.appName }) }),
      /* @__PURE__ */ A("div", { className: "chat-wrapper__header-controls", children: [
        hn(),
        xt(),
        On(),
        ge()
      ] })
    ] }),
    !j && /* @__PURE__ */ A(ln, { children: [
      ae && /* @__PURE__ */ h("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ A("p", { children: [
        "⚠️ ",
        ae
      ] }) }),
      N.length === 0 && !F && !M && /* @__PURE__ */ A("div", { className: "chat-wrapper__main-header", children: [
        /* @__PURE__ */ h("h1", { className: "chat-wrapper__main-title", children: t.appName }),
        t.description && /* @__PURE__ */ h("p", { className: "chat-wrapper__description", children: t.description })
      ] }),
      /* @__PURE__ */ A(
        "div",
        {
          className: `chat-wrapper__content ${N.length === 0 && !F && !M ? "chat-wrapper__content--empty" : "chat-wrapper__content--with-messages"}`,
          children: [
            M && N.length === 0 ? /* @__PURE__ */ h("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ h(hl, { fullHeight: !0 }) }) : /* @__PURE__ */ h(
              ba,
              {
                ref: dt,
                messages: N,
                isThinking: f,
                isHandlingTool: Ee,
                getReasoningTitle: Rt,
                getReasoningStatus: Dt,
                getReasoningDuration: Pt,
                getReasoningContentOnly: Wt,
                getToolingTitle: ft,
                getToolingStatus: w,
                clientTools: r || [],
                currentAssistantMessageIdRef: De
              }
            ),
            pn(),
            /* @__PURE__ */ h("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ h(
              ul,
              {
                ref: Oe,
                placeholder: t.placeholder,
                placeholderTexts: t.placeholderTexts,
                disabled: F,
                chatStatus: y,
                fileUploadEnabled: (qt = t.features) == null ? void 0 : qt.fileUpload,
                restaurantName: t.restaurantName,
                restaurantLogo: t.restaurantLogo,
                hasMessages: N.length > 0,
                onSubmit: (I, D) => pe(I, D),
                onFileUpload: Pe,
                onStopGeneration: et
              }
            ) }),
            N.length === 0 && !F && !M && t.suggestedPrompts && /* @__PURE__ */ h(
              cl,
              {
                prompts: t.suggestedPrompts,
                onPromptSelect: (I) => {
                  Oe.current && Oe.current.setText(I.description);
                }
              }
            )
          ]
        }
      )
    ] }),
    t.onError && /* @__PURE__ */ h("div", { className: "chat-wrapper__error-boundary" }),
    /* @__PURE__ */ h(
      fl,
      {
        isOpen: Ot,
        onClose: () => Qe(!1),
        app: o,
        apiUrl: e
      }
    )
  ] }) });
}
const Oc = Li(Ec);
export {
  Ha as AnimatedPlaceholder,
  ic as ChatIcon,
  Oc as ChatWrapper,
  ac as CloseIcon,
  oc as CollapseIcon,
  sc as CopyIcon,
  fl as DevSettings,
  lc as FullscreenIcon,
  hl as InlineLoader,
  Ui as Loader,
  La as PromptInput,
  Da as PromptInputButton,
  kc as PromptInputModelSelect,
  Ac as PromptInputModelSelectContent,
  Ic as PromptInputModelSelectItem,
  bc as PromptInputModelSelectTrigger,
  Rc as PromptInputModelSelectValue,
  Pa as PromptInputSubmit,
  Mi as PromptInputTextarea,
  Ma as PromptInputToolbar,
  Oa as PromptInputTools,
  tc as Reasoning,
  Sa as ReasoningContent,
  xa as ReasoningTrigger,
  Ni as SettingsIcon,
  cl as SuggestedPrompts,
  Mc as createThread,
  Lc as fetchMessagesByConvUuid,
  Nc as fetchThreadByConvUuid,
  _c as fetchThreadMessages,
  vc as fetchUserThreads
};
