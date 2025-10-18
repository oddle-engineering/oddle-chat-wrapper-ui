var Jr = Object.defineProperty;
var Gr = (e, n, t) => n in e ? Jr(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var ce = (e, n, t) => Gr(e, typeof n != "symbol" ? n + "" : n, t);
import { jsxs as T, jsx as p, Fragment as Vn } from "react/jsx-runtime";
import Qr, { forwardRef as Kr, useState as Q, useCallback as te, memo as nt, useRef as ze, useMemo as fn, useEffect as De } from "react";
function ei(e, n) {
  const t = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const ni = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ti = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ri = {};
function Ct(e, n) {
  return (ri.jsx ? ti : ni).test(e);
}
const ii = /[ \t\n\f\r]/g;
function li(e) {
  return typeof e == "object" ? e.type === "text" ? wt(e.value) : !1 : wt(e);
}
function wt(e) {
  return e.replace(ii, "") === "";
}
class nn {
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
  constructor(n, t, r) {
    this.normal = t, this.property = n, r && (this.space = r);
  }
}
nn.prototype.normal = {};
nn.prototype.property = {};
nn.prototype.space = void 0;
function sr(e, n) {
  const t = {}, r = {};
  for (const i of e)
    Object.assign(t, i.property), Object.assign(r, i.normal);
  return new nn(t, r, n);
}
function $n(e) {
  return e.toLowerCase();
}
class fe {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(n, t) {
    this.attribute = t, this.property = n;
  }
}
fe.prototype.attribute = "";
fe.prototype.booleanish = !1;
fe.prototype.boolean = !1;
fe.prototype.commaOrSpaceSeparated = !1;
fe.prototype.commaSeparated = !1;
fe.prototype.defined = !1;
fe.prototype.mustUseProperty = !1;
fe.prototype.number = !1;
fe.prototype.overloadedBoolean = !1;
fe.prototype.property = "";
fe.prototype.spaceSeparated = !1;
fe.prototype.space = void 0;
let oi = 0;
const z = Re(), re = Re(), Zn = Re(), b = Re(), W = Re(), je = Re(), ge = Re();
function Re() {
  return 2 ** ++oi;
}
const qn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: z,
  booleanish: re,
  commaOrSpaceSeparated: ge,
  commaSeparated: je,
  number: b,
  overloadedBoolean: Zn,
  spaceSeparated: W
}, Symbol.toStringTag, { value: "Module" })), An = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(qn)
);
class tt extends fe {
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
  constructor(n, t, r, i) {
    let l = -1;
    if (super(n, t), xt(this, "space", i), typeof r == "number")
      for (; ++l < An.length; ) {
        const o = An[l];
        xt(this, An[l], (r & qn[o]) === qn[o]);
      }
  }
}
tt.prototype.defined = !0;
function xt(e, n, t) {
  t && (e[n] = t);
}
function $e(e) {
  const n = {}, t = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const l = new tt(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (l.mustUseProperty = !0), n[r] = l, t[$n(r)] = r, t[$n(l.attribute)] = r;
  }
  return new nn(n, t, e.space);
}
const ur = $e({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: re,
    ariaAutoComplete: null,
    ariaBusy: re,
    ariaChecked: re,
    ariaColCount: b,
    ariaColIndex: b,
    ariaColSpan: b,
    ariaControls: W,
    ariaCurrent: null,
    ariaDescribedBy: W,
    ariaDetails: null,
    ariaDisabled: re,
    ariaDropEffect: W,
    ariaErrorMessage: null,
    ariaExpanded: re,
    ariaFlowTo: W,
    ariaGrabbed: re,
    ariaHasPopup: null,
    ariaHidden: re,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: W,
    ariaLevel: b,
    ariaLive: null,
    ariaModal: re,
    ariaMultiLine: re,
    ariaMultiSelectable: re,
    ariaOrientation: null,
    ariaOwns: W,
    ariaPlaceholder: null,
    ariaPosInSet: b,
    ariaPressed: re,
    ariaReadOnly: re,
    ariaRelevant: null,
    ariaRequired: re,
    ariaRoleDescription: W,
    ariaRowCount: b,
    ariaRowIndex: b,
    ariaRowSpan: b,
    ariaSelected: re,
    ariaSetSize: b,
    ariaSort: null,
    ariaValueMax: b,
    ariaValueMin: b,
    ariaValueNow: b,
    ariaValueText: null,
    role: null
  },
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  }
});
function cr(e, n) {
  return n in e ? e[n] : n;
}
function hr(e, n) {
  return cr(e, n.toLowerCase());
}
const ai = $e({
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
    accept: je,
    acceptCharset: W,
    accessKey: W,
    action: null,
    allow: null,
    allowFullScreen: z,
    allowPaymentRequest: z,
    allowUserMedia: z,
    alt: null,
    as: null,
    async: z,
    autoCapitalize: null,
    autoComplete: W,
    autoFocus: z,
    autoPlay: z,
    blocking: W,
    capture: null,
    charSet: null,
    checked: z,
    cite: null,
    className: W,
    cols: b,
    colSpan: null,
    content: null,
    contentEditable: re,
    controls: z,
    controlsList: W,
    coords: b | je,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: z,
    defer: z,
    dir: null,
    dirName: null,
    disabled: z,
    download: Zn,
    draggable: re,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: z,
    formTarget: null,
    headers: W,
    height: b,
    hidden: Zn,
    high: b,
    href: null,
    hrefLang: null,
    htmlFor: W,
    httpEquiv: W,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: z,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: z,
    itemId: null,
    itemProp: W,
    itemRef: W,
    itemScope: z,
    itemType: W,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: z,
    low: b,
    manifest: null,
    max: null,
    maxLength: b,
    media: null,
    method: null,
    min: null,
    minLength: b,
    multiple: z,
    muted: z,
    name: null,
    nonce: null,
    noModule: z,
    noValidate: z,
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
    open: z,
    optimum: b,
    pattern: null,
    ping: W,
    placeholder: null,
    playsInline: z,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: z,
    referrerPolicy: null,
    rel: W,
    required: z,
    reversed: z,
    rows: b,
    rowSpan: b,
    sandbox: W,
    scope: null,
    scoped: z,
    seamless: z,
    selected: z,
    shadowRootClonable: z,
    shadowRootDelegatesFocus: z,
    shadowRootMode: null,
    shape: null,
    size: b,
    sizes: null,
    slot: null,
    span: b,
    spellCheck: re,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: b,
    step: null,
    style: null,
    tabIndex: b,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: z,
    useMap: null,
    value: re,
    width: b,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: W,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: b,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: b,
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
    compact: z,
    // Lists. Use CSS to reduce space between items instead
    declare: z,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: b,
    // `<img>` and `<object>`
    leftMargin: b,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: b,
    // `<body>`
    marginWidth: b,
    // `<body>`
    noResize: z,
    // `<frame>`
    noHref: z,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: z,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: z,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: b,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: re,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: b,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: b,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: z,
    disableRemotePlayback: z,
    prefix: null,
    property: null,
    results: b,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: hr
}), si = $e({
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
    about: ge,
    accentHeight: b,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: b,
    amplitude: b,
    arabicForm: null,
    ascent: b,
    attributeName: null,
    attributeType: null,
    azimuth: b,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: b,
    by: null,
    calcMode: null,
    capHeight: b,
    className: W,
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
    descent: b,
    diffuseConstant: b,
    direction: null,
    display: null,
    dur: null,
    divisor: b,
    dominantBaseline: null,
    download: z,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: b,
    enableBackground: null,
    end: null,
    event: null,
    exponent: b,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: b,
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
    g1: je,
    g2: je,
    glyphName: je,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: b,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: b,
    horizOriginX: b,
    horizOriginY: b,
    id: null,
    ideographic: b,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: b,
    k: b,
    k1: b,
    k2: b,
    k3: b,
    k4: b,
    kernelMatrix: ge,
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
    limitingConeAngle: b,
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
    mediaSize: b,
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
    overlinePosition: b,
    overlineThickness: b,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: b,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: W,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: b,
    pointsAtY: b,
    pointsAtZ: b,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: ge,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: ge,
    rev: ge,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: ge,
    requiredFeatures: ge,
    requiredFonts: ge,
    requiredFormats: ge,
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
    specularConstant: b,
    specularExponent: b,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: b,
    strikethroughThickness: b,
    string: null,
    stroke: null,
    strokeDashArray: ge,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: b,
    strokeOpacity: b,
    strokeWidth: null,
    style: null,
    surfaceScale: b,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: ge,
    tabIndex: b,
    tableValues: null,
    target: null,
    targetX: b,
    targetY: b,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: ge,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: b,
    underlineThickness: b,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: b,
    values: null,
    vAlphabetic: b,
    vMathematical: b,
    vectorEffect: null,
    vHanging: b,
    vIdeographic: b,
    version: null,
    vertAdvY: b,
    vertOriginX: b,
    vertOriginY: b,
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
    xHeight: b,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: cr
}), pr = $e({
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
  transform(e, n) {
    return "xlink:" + n.slice(5).toLowerCase();
  }
}), dr = $e({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: hr
}), fr = $e({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, n) {
    return "xml:" + n.slice(3).toLowerCase();
  }
}), ui = {
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
}, ci = /[A-Z]/g, kt = /-[a-z]/g, hi = /^data[-\w.:]+$/i;
function pi(e, n) {
  const t = $n(n);
  let r = n, i = fe;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && hi.test(n)) {
    if (n.charAt(4) === "-") {
      const l = n.slice(5).replace(kt, fi);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = n.slice(4);
      if (!kt.test(l)) {
        let o = l.replace(ci, di);
        o.charAt(0) !== "-" && (o = "-" + o), n = "data" + o;
      }
    }
    i = tt;
  }
  return new i(r, n);
}
function di(e) {
  return "-" + e.toLowerCase();
}
function fi(e) {
  return e.charAt(1).toUpperCase();
}
const mi = sr([ur, ai, pr, dr, fr], "html"), rt = sr([ur, si, pr, dr, fr], "svg");
function gi(e) {
  return e.join(" ").trim();
}
var xn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function mr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var it = {}, bt = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, yi = /\n/g, Ci = /^\s*/, wi = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, xi = /^:\s*/, ki = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, bi = /^[;\s]*/, Si = /^\s+|\s+$/g, _i = `
`, St = "/", _t = "*", Oe = "", vi = "comment", Ei = "declaration", Ii = function(e, n) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  n = n || {};
  var t = 1, r = 1;
  function i(w) {
    var x = w.match(yi);
    x && (t += x.length);
    var E = w.lastIndexOf(_i);
    r = ~E ? w.length - E : r + w.length;
  }
  function l() {
    var w = { line: t, column: r };
    return function(x) {
      return x.position = new o(w), u(), x;
    };
  }
  function o(w) {
    this.start = w, this.end = { line: t, column: r }, this.source = n.source;
  }
  o.prototype.content = e;
  function a(w) {
    var x = new Error(
      n.source + ":" + t + ":" + r + ": " + w
    );
    if (x.reason = w, x.filename = n.source, x.line = t, x.column = r, x.source = e, !n.silent) throw x;
  }
  function s(w) {
    var x = w.exec(e);
    if (x) {
      var E = x[0];
      return i(E), e = e.slice(E.length), x;
    }
  }
  function u() {
    s(Ci);
  }
  function c(w) {
    var x;
    for (w = w || []; x = d(); )
      x !== !1 && w.push(x);
    return w;
  }
  function d() {
    var w = l();
    if (!(St != e.charAt(0) || _t != e.charAt(1))) {
      for (var x = 2; Oe != e.charAt(x) && (_t != e.charAt(x) || St != e.charAt(x + 1)); )
        ++x;
      if (x += 2, Oe === e.charAt(x - 1))
        return a("End of comment missing");
      var E = e.slice(2, x - 2);
      return r += 2, i(E), e = e.slice(x), r += 2, w({
        type: vi,
        comment: E
      });
    }
  }
  function g() {
    var w = l(), x = s(wi);
    if (x) {
      if (d(), !s(xi)) return a("property missing ':'");
      var E = s(ki), k = w({
        type: Ei,
        property: vt(x[0].replace(bt, Oe)),
        value: E ? vt(E[0].replace(bt, Oe)) : Oe
      });
      return s(bi), k;
    }
  }
  function h() {
    var w = [];
    c(w);
    for (var x; x = g(); )
      x !== !1 && (w.push(x), c(w));
    return w;
  }
  return u(), h();
};
function vt(e) {
  return e ? e.replace(Si, Oe) : Oe;
}
var Ti = xn && xn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(it, "__esModule", { value: !0 });
it.default = Ni;
var Li = Ti(Ii);
function Ni(e, n) {
  var t = null;
  if (!e || typeof e != "string")
    return t;
  var r = (0, Li.default)(e), i = typeof n == "function";
  return r.forEach(function(l) {
    if (l.type === "declaration") {
      var o = l.property, a = l.value;
      i ? n(o, a, l) : a && (t = t || {}, t[o] = a);
    }
  }), t;
}
var _n = {};
Object.defineProperty(_n, "__esModule", { value: !0 });
_n.camelCase = void 0;
var Mi = /^--[a-zA-Z0-9_-]+$/, Ai = /-([a-z])/g, Pi = /^[^-]+$/, Di = /^-(webkit|moz|ms|o|khtml)-/, zi = /^-(ms)-/, Oi = function(e) {
  return !e || Pi.test(e) || Mi.test(e);
}, Ri = function(e, n) {
  return n.toUpperCase();
}, Et = function(e, n) {
  return "".concat(n, "-");
}, Bi = function(e, n) {
  return n === void 0 && (n = {}), Oi(e) ? e : (e = e.toLowerCase(), n.reactCompat ? e = e.replace(zi, Et) : e = e.replace(Di, Et), e.replace(Ai, Ri));
};
_n.camelCase = Bi;
var Fi = xn && xn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, Ui = Fi(it), Hi = _n;
function Wn(e, n) {
  var t = {};
  return !e || typeof e != "string" || (0, Ui.default)(e, function(r, i) {
    r && i && (t[(0, Hi.camelCase)(r, n)] = i);
  }), t;
}
Wn.default = Wn;
var ji = Wn;
const Vi = /* @__PURE__ */ mr(ji), gr = yr("end"), lt = yr("start");
function yr(e) {
  return n;
  function n(t) {
    const r = t && t.position && t.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function $i(e) {
  const n = lt(e), t = gr(e);
  if (n && t)
    return { start: n, end: t };
}
function Ge(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? It(e.position) : "start" in e || "end" in e ? It(e) : "line" in e || "column" in e ? Yn(e) : "";
}
function Yn(e) {
  return Tt(e && e.line) + ":" + Tt(e && e.column);
}
function It(e) {
  return Yn(e && e.start) + "-" + Yn(e && e.end);
}
function Tt(e) {
  return e && typeof e == "number" ? e : 1;
}
class se extends Error {
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
  constructor(n, t, r) {
    super(), typeof t == "string" && (r = t, t = void 0);
    let i = "", l = {}, o = !1;
    if (t && ("line" in t && "column" in t ? l = { place: t } : "start" in t && "end" in t ? l = { place: t } : "type" in t ? l = {
      ancestors: [t],
      place: t.position
    } : l = { ...t }), typeof n == "string" ? i = n : !l.cause && n && (o = !0, i = n.message, l.cause = n), !l.ruleId && !l.source && typeof r == "string") {
      const s = r.indexOf(":");
      s === -1 ? l.ruleId = r : (l.source = r.slice(0, s), l.ruleId = r.slice(s + 1));
    }
    if (!l.place && l.ancestors && l.ancestors) {
      const s = l.ancestors[l.ancestors.length - 1];
      s && (l.place = s.position);
    }
    const a = l.place && "start" in l.place ? l.place.start : l.place;
    this.ancestors = l.ancestors || void 0, this.cause = l.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = Ge(l.place) || "1:1", this.place = l.place || void 0, this.reason = this.message, this.ruleId = l.ruleId || void 0, this.source = l.source || void 0, this.stack = o && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
se.prototype.file = "";
se.prototype.name = "";
se.prototype.reason = "";
se.prototype.message = "";
se.prototype.stack = "";
se.prototype.column = void 0;
se.prototype.line = void 0;
se.prototype.ancestors = void 0;
se.prototype.cause = void 0;
se.prototype.fatal = void 0;
se.prototype.place = void 0;
se.prototype.ruleId = void 0;
se.prototype.source = void 0;
const ot = {}.hasOwnProperty, Zi = /* @__PURE__ */ new Map(), qi = /[A-Z]/g, Wi = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Yi = /* @__PURE__ */ new Set(["td", "th"]), Cr = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Xi(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = n.filePath || void 0;
  let r;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = rl(t, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = tl(t, n.jsx, n.jsxs);
  }
  const i = {
    Fragment: n.Fragment,
    ancestors: [],
    components: n.components || {},
    create: r,
    elementAttributeNameCase: n.elementAttributeNameCase || "react",
    evaluater: n.createEvaluater ? n.createEvaluater() : void 0,
    filePath: t,
    ignoreInvalidStyle: n.ignoreInvalidStyle || !1,
    passKeys: n.passKeys !== !1,
    passNode: n.passNode || !1,
    schema: n.space === "svg" ? rt : mi,
    stylePropertyNameCase: n.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: n.tableCellAlignToStyle !== !1
  }, l = wr(i, e, void 0);
  return l && typeof l != "string" ? l : i.create(
    e,
    i.Fragment,
    { children: l || void 0 },
    void 0
  );
}
function wr(e, n, t) {
  if (n.type === "element")
    return Ji(e, n, t);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return Gi(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return Ki(e, n, t);
  if (n.type === "mdxjsEsm")
    return Qi(e, n);
  if (n.type === "root")
    return el(e, n, t);
  if (n.type === "text")
    return nl(e, n);
}
function Ji(e, n, t) {
  const r = e.schema;
  let i = r;
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (i = rt, e.schema = i), e.ancestors.push(n);
  const l = kr(e, n.tagName, !1), o = il(e, n);
  let a = st(e, n);
  return Wi.has(n.tagName) && (a = a.filter(function(s) {
    return typeof s == "string" ? !li(s) : !0;
  })), xr(e, o, l, n), at(o, a), e.ancestors.pop(), e.schema = r, e.create(n, l, o, t);
}
function Gi(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  en(e, n.position);
}
function Qi(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(n.data.estree)
    );
  en(e, n.position);
}
function Ki(e, n, t) {
  const r = e.schema;
  let i = r;
  n.name === "svg" && r.space === "html" && (i = rt, e.schema = i), e.ancestors.push(n);
  const l = n.name === null ? e.Fragment : kr(e, n.name, !0), o = ll(e, n), a = st(e, n);
  return xr(e, o, l, n), at(o, a), e.ancestors.pop(), e.schema = r, e.create(n, l, o, t);
}
function el(e, n, t) {
  const r = {};
  return at(r, st(e, n)), e.create(n, e.Fragment, r, t);
}
function nl(e, n) {
  return n.value;
}
function xr(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function at(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0];
    t && (e.children = t);
  }
}
function tl(e, n, t) {
  return r;
  function r(i, l, o, a) {
    const u = Array.isArray(o.children) ? t : n;
    return a ? u(l, o, a) : u(l, o);
  }
}
function rl(e, n) {
  return t;
  function t(r, i, l, o) {
    const a = Array.isArray(l.children), s = lt(r);
    return n(
      i,
      l,
      o,
      a,
      {
        columnNumber: s ? s.column - 1 : void 0,
        fileName: e,
        lineNumber: s ? s.line : void 0
      },
      void 0
    );
  }
}
function il(e, n) {
  const t = {};
  let r, i;
  for (i in n.properties)
    if (i !== "children" && ot.call(n.properties, i)) {
      const l = ol(e, i, n.properties[i]);
      if (l) {
        const [o, a] = l;
        e.tableCellAlignToStyle && o === "align" && typeof a == "string" && Yi.has(n.tagName) ? r = a : t[o] = a;
      }
    }
  if (r) {
    const l = (
      /** @type {Style} */
      t.style || (t.style = {})
    );
    l[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return t;
}
function ll(e, n) {
  const t = {};
  for (const r of n.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const l = r.data.estree.body[0];
        l.type;
        const o = l.expression;
        o.type;
        const a = o.properties[0];
        a.type, Object.assign(
          t,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        en(e, n.position);
    else {
      const i = r.name;
      let l;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, l = e.evaluater.evaluateExpression(a.expression);
        } else
          en(e, n.position);
      else
        l = r.value === null ? !0 : r.value;
      t[i] = /** @type {Props[keyof Props]} */
      l;
    }
  return t;
}
function st(e, n) {
  const t = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Zi;
  for (; ++r < n.children.length; ) {
    const l = n.children[r];
    let o;
    if (e.passKeys) {
      const s = l.type === "element" ? l.tagName : l.type === "mdxJsxFlowElement" || l.type === "mdxJsxTextElement" ? l.name : void 0;
      if (s) {
        const u = i.get(s) || 0;
        o = s + "-" + u, i.set(s, u + 1);
      }
    }
    const a = wr(e, l, o);
    a !== void 0 && t.push(a);
  }
  return t;
}
function ol(e, n, t) {
  const r = pi(e.schema, n);
  if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
    if (Array.isArray(t) && (t = r.commaSeparated ? ei(t) : gi(t)), r.property === "style") {
      let i = typeof t == "object" ? t : al(e, String(t));
      return e.stylePropertyNameCase === "css" && (i = sl(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? ui[r.property] || r.property : r.attribute,
      t
    ];
  }
}
function al(e, n) {
  try {
    return Vi(n, { reactCompat: !0 });
  } catch (t) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      t
    ), i = new se("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Cr + "#cannot-parse-style-attribute", i;
  }
}
function kr(e, n, t) {
  let r;
  if (!t)
    r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const i = n.split(".");
    let l = -1, o;
    for (; ++l < i.length; ) {
      const a = Ct(i[l]) ? { type: "Identifier", name: i[l] } : { type: "Literal", value: i[l] };
      o = o ? {
        type: "MemberExpression",
        object: o,
        property: a,
        computed: !!(l && a.type === "Literal"),
        optional: !1
      } : a;
    }
    r = o;
  } else
    r = Ct(n) && !/^[a-z]/.test(n) ? { type: "Identifier", name: n } : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return ot.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  en(e);
}
function en(e, n) {
  const t = new se(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: n,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw t.file = e.filePath || void 0, t.url = Cr + "#cannot-handle-mdx-estrees-without-createevaluater", t;
}
function sl(e) {
  const n = {};
  let t;
  for (t in e)
    ot.call(e, t) && (n[ul(t)] = e[t]);
  return n;
}
function ul(e) {
  let n = e.replace(qi, cl);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function cl(e) {
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
}, hl = {};
function pl(e, n) {
  const t = hl, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, i = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return br(e, r, i);
}
function br(e, n, t) {
  if (dl(e)) {
    if ("value" in e)
      return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Lt(e.children, n, t);
  }
  return Array.isArray(e) ? Lt(e, n, t) : "";
}
function Lt(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = br(e[i], n, t);
  return r.join("");
}
function dl(e) {
  return !!(e && typeof e == "object");
}
const Nt = document.createElement("i");
function ut(e) {
  const n = "&" + e + ";";
  Nt.innerHTML = n;
  const t = Nt.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t
  );
}
function Ee(e, n, t, r) {
  const i = e.length;
  let l = 0, o;
  if (n < 0 ? n = -n > i ? 0 : i + n : n = n > i ? i : n, t = t > 0 ? t : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(n, t), e.splice(...o);
  else
    for (t && e.splice(n, t); l < r.length; )
      o = r.slice(l, l + 1e4), o.unshift(n, 0), e.splice(...o), l += 1e4, n += 1e4;
}
function xe(e, n) {
  return e.length > 0 ? (Ee(e, e.length, 0, n), e) : n;
}
const Mt = {}.hasOwnProperty;
function fl(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    ml(n, e[t]);
  return n;
}
function ml(e, n) {
  let t;
  for (t in n) {
    const i = (Mt.call(e, t) ? e[t] : void 0) || (e[t] = {}), l = n[t];
    let o;
    if (l)
      for (o in l) {
        Mt.call(i, o) || (i[o] = []);
        const a = l[o];
        gl(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function gl(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  Ee(e, 0, 0, r);
}
function Sr(e, n) {
  const t = Number.parseInt(e, n);
  return (
    // C0 except for HT, LF, FF, CR, space.
    t < 9 || t === 11 || t > 13 && t < 32 || // Control character (DEL) of C0, and C1 controls.
    t > 126 && t < 160 || // Lone high surrogates and low surrogates.
    t > 55295 && t < 57344 || // Noncharacters.
    t > 64975 && t < 65008 || /* eslint-disable no-bitwise */
    (t & 65535) === 65535 || (t & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    t > 1114111 ? "�" : String.fromCodePoint(t)
  );
}
function Ve(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const ve = Le(/[A-Za-z]/), ye = Le(/[\dA-Za-z]/), yl = Le(/[#-'*+\--9=?A-Z^-~]/);
function Xn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Jn = Le(/\d/), Cl = Le(/[\dA-Fa-f]/), wl = Le(/[!-/:-@[-`{-~]/);
function M(e) {
  return e !== null && e < -2;
}
function de(e) {
  return e !== null && (e < 0 || e === 32);
}
function H(e) {
  return e === -2 || e === -1 || e === 32;
}
const xl = Le(new RegExp("\\p{P}|\\p{S}", "u")), kl = Le(/\s/);
function Le(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function Ze(e) {
  const n = [];
  let t = -1, r = 0, i = 0;
  for (; ++t < e.length; ) {
    const l = e.charCodeAt(t);
    let o = "";
    if (l === 37 && ye(e.charCodeAt(t + 1)) && ye(e.charCodeAt(t + 2)))
      i = 2;
    else if (l < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l)) || (o = String.fromCharCode(l));
    else if (l > 55295 && l < 57344) {
      const a = e.charCodeAt(t + 1);
      l < 56320 && a > 56319 && a < 57344 ? (o = String.fromCharCode(l, a), i = 1) : o = "�";
    } else
      o = String.fromCharCode(l);
    o && (n.push(e.slice(r, t), encodeURIComponent(o)), r = t + i + 1, o = ""), i && (t += i, i = 0);
  }
  return n.join("") + e.slice(r);
}
function Y(e, n, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let l = 0;
  return o;
  function o(s) {
    return H(s) ? (e.enter(t), a(s)) : n(s);
  }
  function a(s) {
    return H(s) && l++ < i ? (e.consume(s), a) : (e.exit(t), n(s));
  }
}
const bl = {
  tokenize: Sl
};
function Sl(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, i);
  let t;
  return n;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), Y(e, n, "linePrefix");
  }
  function i(a) {
    return e.enter("paragraph"), l(a);
  }
  function l(a) {
    const s = e.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = s), t = s, o(a);
  }
  function o(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return M(a) ? (e.consume(a), e.exit("chunkText"), l) : (e.consume(a), o);
  }
}
const _l = {
  tokenize: vl
}, At = {
  tokenize: El
};
function vl(e) {
  const n = this, t = [];
  let r = 0, i, l, o;
  return a;
  function a(v) {
    if (r < t.length) {
      const U = t[r];
      return n.containerState = U[1], e.attempt(U[0].continuation, s, u)(v);
    }
    return u(v);
  }
  function s(v) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, i && P();
      const U = n.events.length;
      let X = U, C;
      for (; X--; )
        if (n.events[X][0] === "exit" && n.events[X][1].type === "chunkFlow") {
          C = n.events[X][1].end;
          break;
        }
      k(r);
      let j = U;
      for (; j < n.events.length; )
        n.events[j][1].end = {
          ...C
        }, j++;
      return Ee(n.events, X + 1, 0, n.events.slice(U)), n.events.length = j, u(v);
    }
    return a(v);
  }
  function u(v) {
    if (r === t.length) {
      if (!i)
        return g(v);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return w(v);
      n.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(At, c, d)(v);
  }
  function c(v) {
    return i && P(), k(r), g(v);
  }
  function d(v) {
    return n.parser.lazy[n.now().line] = r !== t.length, o = n.now().offset, w(v);
  }
  function g(v) {
    return n.containerState = {}, e.attempt(At, h, w)(v);
  }
  function h(v) {
    return r++, t.push([n.currentConstruct, n.containerState]), g(v);
  }
  function w(v) {
    if (v === null) {
      i && P(), k(0), e.consume(v);
      return;
    }
    return i = i || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: l
    }), x(v);
  }
  function x(v) {
    if (v === null) {
      E(e.exit("chunkFlow"), !0), k(0), e.consume(v);
      return;
    }
    return M(v) ? (e.consume(v), E(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, a) : (e.consume(v), x);
  }
  function E(v, U) {
    const X = n.sliceStream(v);
    if (U && X.push(null), v.previous = l, l && (l.next = v), l = v, i.defineSkip(v.start), i.write(X), n.parser.lazy[v.start.line]) {
      let C = i.events.length;
      for (; C--; )
        if (
          // The token starts before the line ending…
          i.events[C][1].start.offset < o && // …and either is not ended yet…
          (!i.events[C][1].end || // …or ends after it.
          i.events[C][1].end.offset > o)
        )
          return;
      const j = n.events.length;
      let J = j, F, V;
      for (; J--; )
        if (n.events[J][0] === "exit" && n.events[J][1].type === "chunkFlow") {
          if (F) {
            V = n.events[J][1].end;
            break;
          }
          F = !0;
        }
      for (k(r), C = j; C < n.events.length; )
        n.events[C][1].end = {
          ...V
        }, C++;
      Ee(n.events, J + 1, 0, n.events.slice(j)), n.events.length = C;
    }
  }
  function k(v) {
    let U = t.length;
    for (; U-- > v; ) {
      const X = t[U];
      n.containerState = X[1], X[0].exit.call(n, e);
    }
    t.length = v;
  }
  function P() {
    i.write([null]), l = void 0, i = void 0, n.containerState._closeFlow = void 0;
  }
}
function El(e, n, t) {
  return Y(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Pt(e) {
  if (e === null || de(e) || kl(e))
    return 1;
  if (xl(e))
    return 2;
}
function ct(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll;
    l && !r.includes(l) && (n = l(n, t), r.push(l));
  }
  return n;
}
const Gn = {
  name: "attention",
  resolveAll: Il,
  tokenize: Tl
};
function Il(e, n) {
  let t = -1, r, i, l, o, a, s, u, c;
  for (; ++t < e.length; )
    if (e[t][0] === "enter" && e[t][1].type === "attentionSequence" && e[t][1]._close) {
      for (r = t; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        n.sliceSerialize(e[r][1]).charCodeAt(0) === n.sliceSerialize(e[t][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[t][1]._open) && (e[t][1].end.offset - e[t][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[t][1].end.offset - e[t][1].start.offset) % 3))
            continue;
          s = e[r][1].end.offset - e[r][1].start.offset > 1 && e[t][1].end.offset - e[t][1].start.offset > 1 ? 2 : 1;
          const d = {
            ...e[r][1].end
          }, g = {
            ...e[t][1].start
          };
          Dt(d, -s), Dt(g, s), o = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: d,
            end: {
              ...e[r][1].end
            }
          }, a = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[t][1].start
            },
            end: g
          }, l = {
            type: s > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[t][1].start
            }
          }, i = {
            type: s > 1 ? "strong" : "emphasis",
            start: {
              ...o.start
            },
            end: {
              ...a.end
            }
          }, e[r][1].end = {
            ...o.start
          }, e[t][1].start = {
            ...a.end
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = xe(u, [["enter", e[r][1], n], ["exit", e[r][1], n]])), u = xe(u, [["enter", i, n], ["enter", o, n], ["exit", o, n], ["enter", l, n]]), u = xe(u, ct(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), u = xe(u, [["exit", l, n], ["enter", a, n], ["exit", a, n], ["exit", i, n]]), e[t][1].end.offset - e[t][1].start.offset ? (c = 2, u = xe(u, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : c = 0, Ee(e, r - 1, t - r + 3, u), t = r + u.length - c - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function Tl(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Pt(r);
  let l;
  return o;
  function o(s) {
    return l = s, e.enter("attentionSequence"), a(s);
  }
  function a(s) {
    if (s === l)
      return e.consume(s), a;
    const u = e.exit("attentionSequence"), c = Pt(s), d = !c || c === 2 && i || t.includes(s), g = !i || i === 2 && c || t.includes(r);
    return u._open = !!(l === 42 ? d : d && (i || !g)), u._close = !!(l === 42 ? g : g && (c || !d)), n(s);
  }
}
function Dt(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const Ll = {
  name: "autolink",
  tokenize: Nl
};
function Nl(e, n, t) {
  let r = 0;
  return i;
  function i(h) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), l;
  }
  function l(h) {
    return ve(h) ? (e.consume(h), o) : h === 64 ? t(h) : u(h);
  }
  function o(h) {
    return h === 43 || h === 45 || h === 46 || ye(h) ? (r = 1, a(h)) : u(h);
  }
  function a(h) {
    return h === 58 ? (e.consume(h), r = 0, s) : (h === 43 || h === 45 || h === 46 || ye(h)) && r++ < 32 ? (e.consume(h), a) : (r = 0, u(h));
  }
  function s(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), n) : h === null || h === 32 || h === 60 || Xn(h) ? t(h) : (e.consume(h), s);
  }
  function u(h) {
    return h === 64 ? (e.consume(h), c) : yl(h) ? (e.consume(h), u) : t(h);
  }
  function c(h) {
    return ye(h) ? d(h) : t(h);
  }
  function d(h) {
    return h === 46 ? (e.consume(h), r = 0, c) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), n) : g(h);
  }
  function g(h) {
    if ((h === 45 || ye(h)) && r++ < 63) {
      const w = h === 45 ? g : d;
      return e.consume(h), w;
    }
    return t(h);
  }
}
const vn = {
  partial: !0,
  tokenize: Ml
};
function Ml(e, n, t) {
  return r;
  function r(l) {
    return H(l) ? Y(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || M(l) ? n(l) : t(l);
  }
}
const _r = {
  continuation: {
    tokenize: Pl
  },
  exit: Dl,
  name: "blockQuote",
  tokenize: Al
};
function Al(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    if (o === 62) {
      const a = r.containerState;
      return a.open || (e.enter("blockQuote", {
        _container: !0
      }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(o), e.exit("blockQuoteMarker"), l;
    }
    return t(o);
  }
  function l(o) {
    return H(o) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(o), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), n) : (e.exit("blockQuotePrefix"), n(o));
  }
}
function Pl(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return H(o) ? Y(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : l(o);
  }
  function l(o) {
    return e.attempt(_r, n, t)(o);
  }
}
function Dl(e) {
  e.exit("blockQuote");
}
const vr = {
  name: "characterEscape",
  tokenize: zl
};
function zl(e, n, t) {
  return r;
  function r(l) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(l), e.exit("escapeMarker"), i;
  }
  function i(l) {
    return wl(l) ? (e.enter("characterEscapeValue"), e.consume(l), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(l);
  }
}
const Er = {
  name: "characterReference",
  tokenize: Ol
};
function Ol(e, n, t) {
  const r = this;
  let i = 0, l, o;
  return a;
  function a(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), s;
  }
  function s(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), l = 31, o = ye, c(d));
  }
  function u(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), l = 6, o = Cl, c) : (e.enter("characterReferenceValue"), l = 7, o = Jn, c(d));
  }
  function c(d) {
    if (d === 59 && i) {
      const g = e.exit("characterReferenceValue");
      return o === ye && !ut(r.sliceSerialize(g)) ? t(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return o(d) && i++ < l ? (e.consume(d), c) : t(d);
  }
}
const zt = {
  partial: !0,
  tokenize: Bl
}, Ot = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Rl
};
function Rl(e, n, t) {
  const r = this, i = {
    partial: !0,
    tokenize: X
  };
  let l = 0, o = 0, a;
  return s;
  function s(C) {
    return u(C);
  }
  function u(C) {
    const j = r.events[r.events.length - 1];
    return l = j && j[1].type === "linePrefix" ? j[2].sliceSerialize(j[1], !0).length : 0, a = C, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), c(C);
  }
  function c(C) {
    return C === a ? (o++, e.consume(C), c) : o < 3 ? t(C) : (e.exit("codeFencedFenceSequence"), H(C) ? Y(e, d, "whitespace")(C) : d(C));
  }
  function d(C) {
    return C === null || M(C) ? (e.exit("codeFencedFence"), r.interrupt ? n(C) : e.check(zt, x, U)(C)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), g(C));
  }
  function g(C) {
    return C === null || M(C) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(C)) : H(C) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), Y(e, h, "whitespace")(C)) : C === 96 && C === a ? t(C) : (e.consume(C), g);
  }
  function h(C) {
    return C === null || M(C) ? d(C) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), w(C));
  }
  function w(C) {
    return C === null || M(C) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(C)) : C === 96 && C === a ? t(C) : (e.consume(C), w);
  }
  function x(C) {
    return e.attempt(i, U, E)(C);
  }
  function E(C) {
    return e.enter("lineEnding"), e.consume(C), e.exit("lineEnding"), k;
  }
  function k(C) {
    return l > 0 && H(C) ? Y(e, P, "linePrefix", l + 1)(C) : P(C);
  }
  function P(C) {
    return C === null || M(C) ? e.check(zt, x, U)(C) : (e.enter("codeFlowValue"), v(C));
  }
  function v(C) {
    return C === null || M(C) ? (e.exit("codeFlowValue"), P(C)) : (e.consume(C), v);
  }
  function U(C) {
    return e.exit("codeFenced"), n(C);
  }
  function X(C, j, J) {
    let F = 0;
    return V;
    function V(B) {
      return C.enter("lineEnding"), C.consume(B), C.exit("lineEnding"), L;
    }
    function L(B) {
      return C.enter("codeFencedFence"), H(B) ? Y(C, I, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(B) : I(B);
    }
    function I(B) {
      return B === a ? (C.enter("codeFencedFenceSequence"), q(B)) : J(B);
    }
    function q(B) {
      return B === a ? (F++, C.consume(B), q) : F >= o ? (C.exit("codeFencedFenceSequence"), H(B) ? Y(C, Z, "whitespace")(B) : Z(B)) : J(B);
    }
    function Z(B) {
      return B === null || M(B) ? (C.exit("codeFencedFence"), j(B)) : J(B);
    }
  }
}
function Bl(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? t(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o);
  }
}
const Dn = {
  name: "codeIndented",
  tokenize: Ul
}, Fl = {
  partial: !0,
  tokenize: Hl
};
function Ul(e, n, t) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("codeIndented"), Y(e, l, "linePrefix", 5)(u);
  }
  function l(u) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? o(u) : t(u);
  }
  function o(u) {
    return u === null ? s(u) : M(u) ? e.attempt(Fl, o, s)(u) : (e.enter("codeFlowValue"), a(u));
  }
  function a(u) {
    return u === null || M(u) ? (e.exit("codeFlowValue"), o(u)) : (e.consume(u), a);
  }
  function s(u) {
    return e.exit("codeIndented"), n(u);
  }
}
function Hl(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? t(o) : M(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : Y(e, l, "linePrefix", 5)(o);
  }
  function l(o) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(o) : M(o) ? i(o) : t(o);
  }
}
const jl = {
  name: "codeText",
  previous: $l,
  resolve: Vl,
  tokenize: Zl
};
function Vl(e) {
  let n = e.length - 4, t = 3, r, i;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        e[t][1].type = "codeTextPadding", e[n][1].type = "codeTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    i === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (i = r) : (r === n || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), n -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function $l(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Zl(e, n, t) {
  let r = 0, i, l;
  return o;
  function o(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(d);
  }
  function a(d) {
    return d === 96 ? (e.consume(d), r++, a) : (e.exit("codeTextSequence"), s(d));
  }
  function s(d) {
    return d === null ? t(d) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), s) : d === 96 ? (l = e.enter("codeTextSequence"), i = 0, c(d)) : M(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(d));
  }
  function u(d) {
    return d === null || d === 32 || d === 96 || M(d) ? (e.exit("codeTextData"), s(d)) : (e.consume(d), u);
  }
  function c(d) {
    return d === 96 ? (e.consume(d), i++, c) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(d)) : (l.type = "codeTextData", u(d));
  }
}
class ql {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(n) {
    this.left = n ? [...n] : [], this.right = [];
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
  get(n) {
    if (n < 0 || n >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + n + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return n < this.left.length ? this.left[n] : this.right[this.right.length - n + this.left.length - 1];
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
  slice(n, t) {
    const r = t ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(n, r) : n > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - n + this.left.length).reverse() : this.left.slice(n).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
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
  splice(n, t, r) {
    const i = t || 0;
    this.setCursor(Math.trunc(n));
    const l = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && Xe(this.left, r), l.reverse();
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
  push(n) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(n);
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
  pushMany(n) {
    this.setCursor(Number.POSITIVE_INFINITY), Xe(this.left, n);
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
  unshift(n) {
    this.setCursor(0), this.right.push(n);
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
  unshiftMany(n) {
    this.setCursor(0), Xe(this.right, n.reverse());
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
  setCursor(n) {
    if (!(n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0))
      if (n < this.left.length) {
        const t = this.left.splice(n, Number.POSITIVE_INFINITY);
        Xe(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        Xe(this.left, t.reverse());
      }
  }
}
function Xe(e, n) {
  let t = 0;
  if (n.length < 1e4)
    e.push(...n);
  else
    for (; t < n.length; )
      e.push(...n.slice(t, t + 1e4)), t += 1e4;
}
function Ir(e) {
  const n = {};
  let t = -1, r, i, l, o, a, s, u;
  const c = new ql(e);
  for (; ++t < c.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = c.get(t), t && r[1].type === "chunkFlow" && c.get(t - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, l = 0, l < s.length && s[l][1].type === "lineEndingBlank" && (l += 2), l < s.length && s[l][1].type === "content"))
      for (; ++l < s.length && s[l][1].type !== "content"; )
        s[l][1].type === "chunkText" && (s[l][1]._isInFirstContentOfListItem = !0, l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, Wl(c, t)), t = n[t], u = !0);
    else if (r[1]._container) {
      for (l = t, i = void 0; l--; )
        if (o = c.get(l), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
          o[0] === "enter" && (i && (c.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = l);
        else if (!(o[1].type === "linePrefix" || o[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...c.get(i)[1].start
      }, a = c.slice(i, t), a.unshift(r), c.splice(i, t - i + 1, a));
    }
  }
  return Ee(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !u;
}
function Wl(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let i = n - 1;
  const l = [];
  let o = t._tokenizer;
  o || (o = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const a = o.events, s = [], u = {};
  let c, d, g = -1, h = t, w = 0, x = 0;
  const E = [x];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; )
      ;
    l.push(i), h._tokenizer || (c = r.sliceStream(h), h.next || c.push(null), d && o.defineSkip(h.start), h._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(c), h._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), d = h, h = h.next;
  }
  for (h = t; ++g < a.length; )
    // Find a void token that includes a break.
    a[g][0] === "exit" && a[g - 1][0] === "enter" && a[g][1].type === a[g - 1][1].type && a[g][1].start.line !== a[g][1].end.line && (x = g + 1, E.push(x), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (o.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : E.pop(), g = E.length; g--; ) {
    const k = a.slice(E[g], E[g + 1]), P = l.pop();
    s.push([P, P + k.length - 1]), e.splice(P, 2, k);
  }
  for (s.reverse(), g = -1; ++g < s.length; )
    u[w + s[g][0]] = w + s[g][1], w += s[g][1] - s[g][0] - 1;
  return u;
}
const Yl = {
  resolve: Jl,
  tokenize: Gl
}, Xl = {
  partial: !0,
  tokenize: Ql
};
function Jl(e) {
  return Ir(e), e;
}
function Gl(e, n) {
  let t;
  return r;
  function r(a) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? l(a) : M(a) ? e.check(Xl, o, l)(a) : (e.consume(a), i);
  }
  function l(a) {
    return e.exit("chunkContent"), e.exit("content"), n(a);
  }
  function o(a) {
    return e.consume(a), e.exit("chunkContent"), t.next = e.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, i;
  }
}
function Ql(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), Y(e, l, "linePrefix");
  }
  function l(o) {
    if (o === null || M(o))
      return t(o);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(o) : e.interrupt(r.parser.constructs.flow, t, n)(o);
  }
}
function Tr(e, n, t, r, i, l, o, a, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let c = 0;
  return d;
  function d(k) {
    return k === 60 ? (e.enter(r), e.enter(i), e.enter(l), e.consume(k), e.exit(l), g) : k === null || k === 32 || k === 41 || Xn(k) ? t(k) : (e.enter(r), e.enter(o), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), x(k));
  }
  function g(k) {
    return k === 62 ? (e.enter(l), e.consume(k), e.exit(l), e.exit(i), e.exit(r), n) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), h(k));
  }
  function h(k) {
    return k === 62 ? (e.exit("chunkString"), e.exit(a), g(k)) : k === null || k === 60 || M(k) ? t(k) : (e.consume(k), k === 92 ? w : h);
  }
  function w(k) {
    return k === 60 || k === 62 || k === 92 ? (e.consume(k), h) : h(k);
  }
  function x(k) {
    return !c && (k === null || k === 41 || de(k)) ? (e.exit("chunkString"), e.exit(a), e.exit(o), e.exit(r), n(k)) : c < u && k === 40 ? (e.consume(k), c++, x) : k === 41 ? (e.consume(k), c--, x) : k === null || k === 32 || k === 40 || Xn(k) ? t(k) : (e.consume(k), k === 92 ? E : x);
  }
  function E(k) {
    return k === 40 || k === 41 || k === 92 ? (e.consume(k), x) : x(k);
  }
}
function Lr(e, n, t, r, i, l) {
  const o = this;
  let a = 0, s;
  return u;
  function u(h) {
    return e.enter(r), e.enter(i), e.consume(h), e.exit(i), e.enter(l), c;
  }
  function c(h) {
    return a > 999 || h === null || h === 91 || h === 93 && !s || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === 94 && !a && "_hiddenFootnoteSupport" in o.parser.constructs ? t(h) : h === 93 ? (e.exit(l), e.enter(i), e.consume(h), e.exit(i), e.exit(r), n) : M(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), c) : (e.enter("chunkString", {
      contentType: "string"
    }), d(h));
  }
  function d(h) {
    return h === null || h === 91 || h === 93 || M(h) || a++ > 999 ? (e.exit("chunkString"), c(h)) : (e.consume(h), s || (s = !H(h)), h === 92 ? g : d);
  }
  function g(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), a++, d) : d(h);
  }
}
function Nr(e, n, t, r, i, l) {
  let o;
  return a;
  function a(g) {
    return g === 34 || g === 39 || g === 40 ? (e.enter(r), e.enter(i), e.consume(g), e.exit(i), o = g === 40 ? 41 : g, s) : t(g);
  }
  function s(g) {
    return g === o ? (e.enter(i), e.consume(g), e.exit(i), e.exit(r), n) : (e.enter(l), u(g));
  }
  function u(g) {
    return g === o ? (e.exit(l), s(o)) : g === null ? t(g) : M(g) ? (e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), Y(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), c(g));
  }
  function c(g) {
    return g === o || g === null || M(g) ? (e.exit("chunkString"), u(g)) : (e.consume(g), g === 92 ? d : c);
  }
  function d(g) {
    return g === o || g === 92 ? (e.consume(g), c) : c(g);
  }
}
function Qe(e, n) {
  let t;
  return r;
  function r(i) {
    return M(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), t = !0, r) : H(i) ? Y(e, r, t ? "linePrefix" : "lineSuffix")(i) : n(i);
  }
}
const Kl = {
  name: "definition",
  tokenize: no
}, eo = {
  partial: !0,
  tokenize: to
};
function no(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(h) {
    return e.enter("definition"), o(h);
  }
  function o(h) {
    return Lr.call(
      r,
      e,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(h);
  }
  function a(h) {
    return i = Ve(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), s) : t(h);
  }
  function s(h) {
    return de(h) ? Qe(e, u)(h) : u(h);
  }
  function u(h) {
    return Tr(
      e,
      c,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(h);
  }
  function c(h) {
    return e.attempt(eo, d, d)(h);
  }
  function d(h) {
    return H(h) ? Y(e, g, "whitespace")(h) : g(h);
  }
  function g(h) {
    return h === null || M(h) ? (e.exit("definition"), r.parser.defined.push(i), n(h)) : t(h);
  }
}
function to(e, n, t) {
  return r;
  function r(a) {
    return de(a) ? Qe(e, i)(a) : t(a);
  }
  function i(a) {
    return Nr(e, l, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function l(a) {
    return H(a) ? Y(e, o, "whitespace")(a) : o(a);
  }
  function o(a) {
    return a === null || M(a) ? n(a) : t(a);
  }
}
const ro = {
  name: "hardBreakEscape",
  tokenize: io
};
function io(e, n, t) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return M(l) ? (e.exit("hardBreakEscape"), n(l)) : t(l);
  }
}
const lo = {
  name: "headingAtx",
  resolve: oo,
  tokenize: ao
};
function oo(e, n) {
  let t = e.length - 2, r = 3, i, l;
  return e[r][1].type === "whitespace" && (r += 2), t - 2 > r && e[t][1].type === "whitespace" && (t -= 2), e[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && e[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[t][1].end
  }, l = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[t][1].end,
    contentType: "text"
  }, Ee(e, r, t - r + 1, [["enter", i, n], ["enter", l, n], ["exit", l, n], ["exit", i, n]])), e;
}
function ao(e, n, t) {
  let r = 0;
  return i;
  function i(c) {
    return e.enter("atxHeading"), l(c);
  }
  function l(c) {
    return e.enter("atxHeadingSequence"), o(c);
  }
  function o(c) {
    return c === 35 && r++ < 6 ? (e.consume(c), o) : c === null || de(c) ? (e.exit("atxHeadingSequence"), a(c)) : t(c);
  }
  function a(c) {
    return c === 35 ? (e.enter("atxHeadingSequence"), s(c)) : c === null || M(c) ? (e.exit("atxHeading"), n(c)) : H(c) ? Y(e, a, "whitespace")(c) : (e.enter("atxHeadingText"), u(c));
  }
  function s(c) {
    return c === 35 ? (e.consume(c), s) : (e.exit("atxHeadingSequence"), a(c));
  }
  function u(c) {
    return c === null || c === 35 || de(c) ? (e.exit("atxHeadingText"), a(c)) : (e.consume(c), u);
  }
}
const so = [
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
], Rt = ["pre", "script", "style", "textarea"], uo = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: po,
  tokenize: fo
}, co = {
  partial: !0,
  tokenize: go
}, ho = {
  partial: !0,
  tokenize: mo
};
function po(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function fo(e, n, t) {
  const r = this;
  let i, l, o, a, s;
  return u;
  function u(m) {
    return c(m);
  }
  function c(m) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(m), d;
  }
  function d(m) {
    return m === 33 ? (e.consume(m), g) : m === 47 ? (e.consume(m), l = !0, x) : m === 63 ? (e.consume(m), i = 3, r.interrupt ? n : f) : ve(m) ? (e.consume(m), o = String.fromCharCode(m), E) : t(m);
  }
  function g(m) {
    return m === 45 ? (e.consume(m), i = 2, h) : m === 91 ? (e.consume(m), i = 5, a = 0, w) : ve(m) ? (e.consume(m), i = 4, r.interrupt ? n : f) : t(m);
  }
  function h(m) {
    return m === 45 ? (e.consume(m), r.interrupt ? n : f) : t(m);
  }
  function w(m) {
    const ne = "CDATA[";
    return m === ne.charCodeAt(a++) ? (e.consume(m), a === ne.length ? r.interrupt ? n : I : w) : t(m);
  }
  function x(m) {
    return ve(m) ? (e.consume(m), o = String.fromCharCode(m), E) : t(m);
  }
  function E(m) {
    if (m === null || m === 47 || m === 62 || de(m)) {
      const ne = m === 47, ue = o.toLowerCase();
      return !ne && !l && Rt.includes(ue) ? (i = 1, r.interrupt ? n(m) : I(m)) : so.includes(o.toLowerCase()) ? (i = 6, ne ? (e.consume(m), k) : r.interrupt ? n(m) : I(m)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(m) : l ? P(m) : v(m));
    }
    return m === 45 || ye(m) ? (e.consume(m), o += String.fromCharCode(m), E) : t(m);
  }
  function k(m) {
    return m === 62 ? (e.consume(m), r.interrupt ? n : I) : t(m);
  }
  function P(m) {
    return H(m) ? (e.consume(m), P) : V(m);
  }
  function v(m) {
    return m === 47 ? (e.consume(m), V) : m === 58 || m === 95 || ve(m) ? (e.consume(m), U) : H(m) ? (e.consume(m), v) : V(m);
  }
  function U(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || ye(m) ? (e.consume(m), U) : X(m);
  }
  function X(m) {
    return m === 61 ? (e.consume(m), C) : H(m) ? (e.consume(m), X) : v(m);
  }
  function C(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? t(m) : m === 34 || m === 39 ? (e.consume(m), s = m, j) : H(m) ? (e.consume(m), C) : J(m);
  }
  function j(m) {
    return m === s ? (e.consume(m), s = null, F) : m === null || M(m) ? t(m) : (e.consume(m), j);
  }
  function J(m) {
    return m === null || m === 34 || m === 39 || m === 47 || m === 60 || m === 61 || m === 62 || m === 96 || de(m) ? X(m) : (e.consume(m), J);
  }
  function F(m) {
    return m === 47 || m === 62 || H(m) ? v(m) : t(m);
  }
  function V(m) {
    return m === 62 ? (e.consume(m), L) : t(m);
  }
  function L(m) {
    return m === null || M(m) ? I(m) : H(m) ? (e.consume(m), L) : t(m);
  }
  function I(m) {
    return m === 45 && i === 2 ? (e.consume(m), ie) : m === 60 && i === 1 ? (e.consume(m), G) : m === 62 && i === 4 ? (e.consume(m), he) : m === 63 && i === 3 ? (e.consume(m), f) : m === 93 && i === 5 ? (e.consume(m), Ce) : M(m) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(co, ee, q)(m)) : m === null || M(m) ? (e.exit("htmlFlowData"), q(m)) : (e.consume(m), I);
  }
  function q(m) {
    return e.check(ho, Z, ee)(m);
  }
  function Z(m) {
    return e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), B;
  }
  function B(m) {
    return m === null || M(m) ? q(m) : (e.enter("htmlFlowData"), I(m));
  }
  function ie(m) {
    return m === 45 ? (e.consume(m), f) : I(m);
  }
  function G(m) {
    return m === 47 ? (e.consume(m), o = "", oe) : I(m);
  }
  function oe(m) {
    if (m === 62) {
      const ne = o.toLowerCase();
      return Rt.includes(ne) ? (e.consume(m), he) : I(m);
    }
    return ve(m) && o.length < 8 ? (e.consume(m), o += String.fromCharCode(m), oe) : I(m);
  }
  function Ce(m) {
    return m === 93 ? (e.consume(m), f) : I(m);
  }
  function f(m) {
    return m === 62 ? (e.consume(m), he) : m === 45 && i === 2 ? (e.consume(m), f) : I(m);
  }
  function he(m) {
    return m === null || M(m) ? (e.exit("htmlFlowData"), ee(m)) : (e.consume(m), he);
  }
  function ee(m) {
    return e.exit("htmlFlow"), n(m);
  }
}
function mo(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return M(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l) : t(o);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o);
  }
}
function go(e, n, t) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(vn, n, t);
  }
}
const yo = {
  name: "htmlText",
  tokenize: Co
};
function Co(e, n, t) {
  const r = this;
  let i, l, o;
  return a;
  function a(f) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(f), s;
  }
  function s(f) {
    return f === 33 ? (e.consume(f), u) : f === 47 ? (e.consume(f), X) : f === 63 ? (e.consume(f), v) : ve(f) ? (e.consume(f), J) : t(f);
  }
  function u(f) {
    return f === 45 ? (e.consume(f), c) : f === 91 ? (e.consume(f), l = 0, w) : ve(f) ? (e.consume(f), P) : t(f);
  }
  function c(f) {
    return f === 45 ? (e.consume(f), h) : t(f);
  }
  function d(f) {
    return f === null ? t(f) : f === 45 ? (e.consume(f), g) : M(f) ? (o = d, G(f)) : (e.consume(f), d);
  }
  function g(f) {
    return f === 45 ? (e.consume(f), h) : d(f);
  }
  function h(f) {
    return f === 62 ? ie(f) : f === 45 ? g(f) : d(f);
  }
  function w(f) {
    const he = "CDATA[";
    return f === he.charCodeAt(l++) ? (e.consume(f), l === he.length ? x : w) : t(f);
  }
  function x(f) {
    return f === null ? t(f) : f === 93 ? (e.consume(f), E) : M(f) ? (o = x, G(f)) : (e.consume(f), x);
  }
  function E(f) {
    return f === 93 ? (e.consume(f), k) : x(f);
  }
  function k(f) {
    return f === 62 ? ie(f) : f === 93 ? (e.consume(f), k) : x(f);
  }
  function P(f) {
    return f === null || f === 62 ? ie(f) : M(f) ? (o = P, G(f)) : (e.consume(f), P);
  }
  function v(f) {
    return f === null ? t(f) : f === 63 ? (e.consume(f), U) : M(f) ? (o = v, G(f)) : (e.consume(f), v);
  }
  function U(f) {
    return f === 62 ? ie(f) : v(f);
  }
  function X(f) {
    return ve(f) ? (e.consume(f), C) : t(f);
  }
  function C(f) {
    return f === 45 || ye(f) ? (e.consume(f), C) : j(f);
  }
  function j(f) {
    return M(f) ? (o = j, G(f)) : H(f) ? (e.consume(f), j) : ie(f);
  }
  function J(f) {
    return f === 45 || ye(f) ? (e.consume(f), J) : f === 47 || f === 62 || de(f) ? F(f) : t(f);
  }
  function F(f) {
    return f === 47 ? (e.consume(f), ie) : f === 58 || f === 95 || ve(f) ? (e.consume(f), V) : M(f) ? (o = F, G(f)) : H(f) ? (e.consume(f), F) : ie(f);
  }
  function V(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || ye(f) ? (e.consume(f), V) : L(f);
  }
  function L(f) {
    return f === 61 ? (e.consume(f), I) : M(f) ? (o = L, G(f)) : H(f) ? (e.consume(f), L) : F(f);
  }
  function I(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? t(f) : f === 34 || f === 39 ? (e.consume(f), i = f, q) : M(f) ? (o = I, G(f)) : H(f) ? (e.consume(f), I) : (e.consume(f), Z);
  }
  function q(f) {
    return f === i ? (e.consume(f), i = void 0, B) : f === null ? t(f) : M(f) ? (o = q, G(f)) : (e.consume(f), q);
  }
  function Z(f) {
    return f === null || f === 34 || f === 39 || f === 60 || f === 61 || f === 96 ? t(f) : f === 47 || f === 62 || de(f) ? F(f) : (e.consume(f), Z);
  }
  function B(f) {
    return f === 47 || f === 62 || de(f) ? F(f) : t(f);
  }
  function ie(f) {
    return f === 62 ? (e.consume(f), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(f);
  }
  function G(f) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), oe;
  }
  function oe(f) {
    return H(f) ? Y(e, Ce, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : Ce(f);
  }
  function Ce(f) {
    return e.enter("htmlTextData"), o(f);
  }
}
const ht = {
  name: "labelEnd",
  resolveAll: bo,
  resolveTo: So,
  tokenize: _o
}, wo = {
  tokenize: vo
}, xo = {
  tokenize: Eo
}, ko = {
  tokenize: Io
};
function bo(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += i;
    }
  }
  return e.length !== t.length && Ee(e, 0, e.length, t), e;
}
function So(e, n) {
  let t = e.length, r = 0, i, l, o, a;
  for (; t--; )
    if (i = e[t][1], l) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (o) {
      if (e[t][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (l = t, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (o = t);
  const s = {
    type: e[l][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, u = {
    type: "label",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[o][1].end
    }
  }, c = {
    type: "labelText",
    start: {
      ...e[l + r + 2][1].end
    },
    end: {
      ...e[o - 2][1].start
    }
  };
  return a = [["enter", s, n], ["enter", u, n]], a = xe(a, e.slice(l + 1, l + r + 3)), a = xe(a, [["enter", c, n]]), a = xe(a, ct(n.parser.constructs.insideSpan.null, e.slice(l + r + 4, o - 3), n)), a = xe(a, [["exit", c, n], e[o - 2], e[o - 1], ["exit", u, n]]), a = xe(a, e.slice(o + 1)), a = xe(a, [["exit", s, n]]), Ee(e, l, e.length, a), e;
}
function _o(e, n, t) {
  const r = this;
  let i = r.events.length, l, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      l = r.events[i][1];
      break;
    }
  return a;
  function a(g) {
    return l ? l._inactive ? d(g) : (o = r.parser.defined.includes(Ve(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(g), e.exit("labelMarker"), e.exit("labelEnd"), s) : t(g);
  }
  function s(g) {
    return g === 40 ? e.attempt(wo, c, o ? c : d)(g) : g === 91 ? e.attempt(xo, c, o ? u : d)(g) : o ? c(g) : d(g);
  }
  function u(g) {
    return e.attempt(ko, c, d)(g);
  }
  function c(g) {
    return n(g);
  }
  function d(g) {
    return l._balanced = !0, t(g);
  }
}
function vo(e, n, t) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), i;
  }
  function i(d) {
    return de(d) ? Qe(e, l)(d) : l(d);
  }
  function l(d) {
    return d === 41 ? c(d) : Tr(e, o, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function o(d) {
    return de(d) ? Qe(e, s)(d) : c(d);
  }
  function a(d) {
    return t(d);
  }
  function s(d) {
    return d === 34 || d === 39 || d === 40 ? Nr(e, u, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : c(d);
  }
  function u(d) {
    return de(d) ? Qe(e, c)(d) : c(d);
  }
  function c(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), n) : t(d);
  }
}
function Eo(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return Lr.call(r, e, l, o, "reference", "referenceMarker", "referenceString")(a);
  }
  function l(a) {
    return r.parser.defined.includes(Ve(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(a) : t(a);
  }
  function o(a) {
    return t(a);
  }
}
function Io(e, n, t) {
  return r;
  function r(l) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), i;
  }
  function i(l) {
    return l === 93 ? (e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), e.exit("reference"), n) : t(l);
  }
}
const To = {
  name: "labelStartImage",
  resolveAll: ht.resolveAll,
  tokenize: Lo
};
function Lo(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), l;
  }
  function l(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), o) : t(a);
  }
  function o(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(a) : n(a);
  }
}
const No = {
  name: "labelStartLink",
  resolveAll: ht.resolveAll,
  tokenize: Mo
};
function Mo(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), l;
  }
  function l(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(o) : n(o);
  }
}
const zn = {
  name: "lineEnding",
  tokenize: Ao
};
function Ao(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), Y(e, n, "linePrefix");
  }
}
const Cn = {
  name: "thematicBreak",
  tokenize: Po
};
function Po(e, n, t) {
  let r = 0, i;
  return l;
  function l(u) {
    return e.enter("thematicBreak"), o(u);
  }
  function o(u) {
    return i = u, a(u);
  }
  function a(u) {
    return u === i ? (e.enter("thematicBreakSequence"), s(u)) : r >= 3 && (u === null || M(u)) ? (e.exit("thematicBreak"), n(u)) : t(u);
  }
  function s(u) {
    return u === i ? (e.consume(u), r++, s) : (e.exit("thematicBreakSequence"), H(u) ? Y(e, a, "whitespace")(u) : a(u));
  }
}
const pe = {
  continuation: {
    tokenize: Ro
  },
  exit: Fo,
  name: "list",
  tokenize: Oo
}, Do = {
  partial: !0,
  tokenize: Uo
}, zo = {
  partial: !0,
  tokenize: Bo
};
function Oo(e, n, t) {
  const r = this, i = r.events[r.events.length - 1];
  let l = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return a;
  function a(h) {
    const w = r.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (w === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : Jn(h)) {
      if (r.containerState.type || (r.containerState.type = w, e.enter(w, {
        _container: !0
      })), w === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(Cn, t, u)(h) : u(h);
      if (!r.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(h);
    }
    return t(h);
  }
  function s(h) {
    return Jn(h) && ++o < 10 ? (e.consume(h), s) : (!r.interrupt || o < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), u(h)) : t(h);
  }
  function u(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e.check(
      vn,
      // Can’t be empty when interrupting.
      r.interrupt ? t : c,
      e.attempt(Do, g, d)
    );
  }
  function c(h) {
    return r.containerState.initialBlankLine = !0, l++, g(h);
  }
  function d(h) {
    return H(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), g) : t(h);
  }
  function g(h) {
    return r.containerState.size = l + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, n(h);
  }
}
function Ro(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(vn, i, l);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, Y(e, n, "listItemIndent", r.containerState.size + 1)(a);
  }
  function l(a) {
    return r.containerState.furtherBlankLines || !H(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(zo, n, o)(a));
  }
  function o(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, Y(e, e.attempt(pe, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function Bo(e, n, t) {
  const r = this;
  return Y(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? n(l) : t(l);
  }
}
function Fo(e) {
  e.exit(this.containerState.type);
}
function Uo(e, n, t) {
  const r = this;
  return Y(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return !H(l) && o && o[1].type === "listItemPrefixWhitespace" ? n(l) : t(l);
  }
}
const Bt = {
  name: "setextUnderline",
  resolveTo: Ho,
  tokenize: jo
};
function Ho(e, n) {
  let t = e.length, r, i, l;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (i = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1), !l && e[t][1].type === "definition" && (l = t);
  const o = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", l ? (e.splice(i, 0, ["enter", o, n]), e.splice(l + 1, 0, ["exit", e[r][1], n]), e[r][1].end = {
    ...e[l][1].end
  }) : e[r][1] = o, e.push(["exit", o, n]), e;
}
function jo(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(u) {
    let c = r.events.length, d;
    for (; c--; )
      if (r.events[c][1].type !== "lineEnding" && r.events[c][1].type !== "linePrefix" && r.events[c][1].type !== "content") {
        d = r.events[c][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || d) ? (e.enter("setextHeadingLine"), i = u, o(u)) : t(u);
  }
  function o(u) {
    return e.enter("setextHeadingLineSequence"), a(u);
  }
  function a(u) {
    return u === i ? (e.consume(u), a) : (e.exit("setextHeadingLineSequence"), H(u) ? Y(e, s, "lineSuffix")(u) : s(u));
  }
  function s(u) {
    return u === null || M(u) ? (e.exit("setextHeadingLine"), n(u)) : t(u);
  }
}
const Vo = {
  tokenize: $o
};
function $o(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    vn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, Y(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Yl, i)), "linePrefix"))
  );
  return t;
  function r(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(l), e.exit("lineEndingBlank"), n.currentConstruct = void 0, t;
  }
  function i(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), n.currentConstruct = void 0, t;
  }
}
const Zo = {
  resolveAll: Ar()
}, qo = Mr("string"), Wo = Mr("text");
function Mr(e) {
  return {
    resolveAll: Ar(e === "text" ? Yo : void 0),
    tokenize: n
  };
  function n(t) {
    const r = this, i = this.parser.constructs[e], l = t.attempt(i, o, a);
    return o;
    function o(c) {
      return u(c) ? l(c) : a(c);
    }
    function a(c) {
      if (c === null) {
        t.consume(c);
        return;
      }
      return t.enter("data"), t.consume(c), s;
    }
    function s(c) {
      return u(c) ? (t.exit("data"), l(c)) : (t.consume(c), s);
    }
    function u(c) {
      if (c === null)
        return !0;
      const d = i[c];
      let g = -1;
      if (d)
        for (; ++g < d.length; ) {
          const h = d[g];
          if (!h.previous || h.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Ar(e) {
  return n;
  function n(t, r) {
    let i = -1, l;
    for (; ++i <= t.length; )
      l === void 0 ? t[i] && t[i][1].type === "data" && (l = i, i++) : (!t[i] || t[i][1].type !== "data") && (i !== l + 2 && (t[l][1].end = t[i - 1][1].end, t.splice(l + 2, i - l - 2), i = l + 2), l = void 0);
    return e ? e(t, r) : t;
  }
}
function Yo(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === "lineEnding") && e[t - 1][1].type === "data") {
      const r = e[t - 1][1], i = n.sliceStream(r);
      let l = i.length, o = -1, a = 0, s;
      for (; l--; ) {
        const u = i[l];
        if (typeof u == "string") {
          for (o = u.length; u.charCodeAt(o - 1) === 32; )
            a++, o--;
          if (o) break;
          o = -1;
        } else if (u === -2)
          s = !0, a++;
        else if (u !== -1) {
          l++;
          break;
        }
      }
      if (n._contentTypeTextTrailing && t === e.length && (a = 0), a) {
        const u = {
          type: t === e.length || s || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: l ? o : r.start._bufferIndex + o,
            _index: r.start._index + l,
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...u.start
        }, r.start.offset === r.end.offset ? Object.assign(r, u) : (e.splice(t, 0, ["enter", u, n], ["exit", u, n]), t += 2);
      }
      t++;
    }
  return e;
}
const Xo = {
  42: pe,
  43: pe,
  45: pe,
  48: pe,
  49: pe,
  50: pe,
  51: pe,
  52: pe,
  53: pe,
  54: pe,
  55: pe,
  56: pe,
  57: pe,
  62: _r
}, Jo = {
  91: Kl
}, Go = {
  [-2]: Dn,
  [-1]: Dn,
  32: Dn
}, Qo = {
  35: lo,
  42: Cn,
  45: [Bt, Cn],
  60: uo,
  61: Bt,
  95: Cn,
  96: Ot,
  126: Ot
}, Ko = {
  38: Er,
  92: vr
}, ea = {
  [-5]: zn,
  [-4]: zn,
  [-3]: zn,
  33: To,
  38: Er,
  42: Gn,
  60: [Ll, yo],
  91: No,
  92: [ro, vr],
  93: ht,
  95: Gn,
  96: jl
}, na = {
  null: [Gn, Zo]
}, ta = {
  null: [42, 95]
}, ra = {
  null: []
}, ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: ta,
  contentInitial: Jo,
  disable: ra,
  document: Xo,
  flow: Qo,
  flowInitial: Go,
  insideSpan: na,
  string: Ko,
  text: ea
}, Symbol.toStringTag, { value: "Module" }));
function la(e, n, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const i = {}, l = [];
  let o = [], a = [];
  const s = {
    attempt: j(X),
    check: j(C),
    consume: P,
    enter: v,
    exit: U,
    interrupt: j(C, {
      interrupt: !0
    })
  }, u = {
    code: null,
    containerState: {},
    defineSkip: x,
    events: [],
    now: w,
    parser: e,
    previous: null,
    sliceSerialize: g,
    sliceStream: h,
    write: d
  };
  let c = n.tokenize.call(u, s);
  return n.resolveAll && l.push(n), u;
  function d(L) {
    return o = xe(o, L), E(), o[o.length - 1] !== null ? [] : (J(n, 0), u.events = ct(l, u.events, u), u.events);
  }
  function g(L, I) {
    return aa(h(L), I);
  }
  function h(L) {
    return oa(o, L);
  }
  function w() {
    const {
      _bufferIndex: L,
      _index: I,
      line: q,
      column: Z,
      offset: B
    } = r;
    return {
      _bufferIndex: L,
      _index: I,
      line: q,
      column: Z,
      offset: B
    };
  }
  function x(L) {
    i[L.line] = L.column, V();
  }
  function E() {
    let L;
    for (; r._index < o.length; ) {
      const I = o[r._index];
      if (typeof I == "string")
        for (L = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === L && r._bufferIndex < I.length; )
          k(I.charCodeAt(r._bufferIndex));
      else
        k(I);
    }
  }
  function k(L) {
    c = c(L);
  }
  function P(L) {
    M(L) ? (r.line++, r.column = 1, r.offset += L === -3 ? 2 : 1, V()) : L !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = L;
  }
  function v(L, I) {
    const q = I || {};
    return q.type = L, q.start = w(), u.events.push(["enter", q, u]), a.push(q), q;
  }
  function U(L) {
    const I = a.pop();
    return I.end = w(), u.events.push(["exit", I, u]), I;
  }
  function X(L, I) {
    J(L, I.from);
  }
  function C(L, I) {
    I.restore();
  }
  function j(L, I) {
    return q;
    function q(Z, B, ie) {
      let G, oe, Ce, f;
      return Array.isArray(Z) ? (
        /* c8 ignore next 1 */
        ee(Z)
      ) : "tokenize" in Z ? (
        // Looks like a construct.
        ee([
          /** @type {Construct} */
          Z
        ])
      ) : he(Z);
      function he(le) {
        return Ne;
        function Ne(be) {
          const Ie = be !== null && le[be], we = be !== null && le.null, Me = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ie) ? Ie : Ie ? [Ie] : [],
            ...Array.isArray(we) ? we : we ? [we] : []
          ];
          return ee(Me)(be);
        }
      }
      function ee(le) {
        return G = le, oe = 0, le.length === 0 ? ie : m(le[oe]);
      }
      function m(le) {
        return Ne;
        function Ne(be) {
          return f = F(), Ce = le, le.partial || (u.currentConstruct = le), le.name && u.parser.constructs.disable.null.includes(le.name) ? ue() : le.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            I ? Object.assign(Object.create(u), I) : u,
            s,
            ne,
            ue
          )(be);
        }
      }
      function ne(le) {
        return L(Ce, f), B;
      }
      function ue(le) {
        return f.restore(), ++oe < G.length ? m(G[oe]) : ie;
      }
    }
  }
  function J(L, I) {
    L.resolveAll && !l.includes(L) && l.push(L), L.resolve && Ee(u.events, I, u.events.length - I, L.resolve(u.events.slice(I), u)), L.resolveTo && (u.events = L.resolveTo(u.events, u));
  }
  function F() {
    const L = w(), I = u.previous, q = u.currentConstruct, Z = u.events.length, B = Array.from(a);
    return {
      from: Z,
      restore: ie
    };
    function ie() {
      r = L, u.previous = I, u.currentConstruct = q, u.events.length = Z, a = B, V();
    }
  }
  function V() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function oa(e, n) {
  const t = n.start._index, r = n.start._bufferIndex, i = n.end._index, l = n.end._bufferIndex;
  let o;
  if (t === i)
    o = [e[t].slice(r, l)];
  else {
    if (o = e.slice(t, i), r > -1) {
      const a = o[0];
      typeof a == "string" ? o[0] = a.slice(r) : o.shift();
    }
    l > 0 && o.push(e[i].slice(0, l));
  }
  return o;
}
function aa(e, n) {
  let t = -1;
  const r = [];
  let i;
  for (; ++t < e.length; ) {
    const l = e[t];
    let o;
    if (typeof l == "string")
      o = l;
    else switch (l) {
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
        o = n ? " " : "	";
        break;
      }
      case -1: {
        if (!n && i) continue;
        o = " ";
        break;
      }
      default:
        o = String.fromCharCode(l);
    }
    i = l === -2, r.push(o);
  }
  return r.join("");
}
function sa(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      fl([ia, ...(e || {}).extensions || []])
    ),
    content: i(bl),
    defined: [],
    document: i(_l),
    flow: i(Vo),
    lazy: {},
    string: i(qo),
    text: i(Wo)
  };
  return r;
  function i(l) {
    return o;
    function o(a) {
      return la(r, l, a);
    }
  }
}
function ua(e) {
  for (; !Ir(e); )
    ;
  return e;
}
const Ft = /[\0\t\n\r]/g;
function ca() {
  let e = 1, n = "", t = !0, r;
  return i;
  function i(l, o, a) {
    const s = [];
    let u, c, d, g, h;
    for (l = n + (typeof l == "string" ? l.toString() : new TextDecoder(o || void 0).decode(l)), d = 0, n = "", t && (l.charCodeAt(0) === 65279 && d++, t = void 0); d < l.length; ) {
      if (Ft.lastIndex = d, u = Ft.exec(l), g = u && u.index !== void 0 ? u.index : l.length, h = l.charCodeAt(g), !u) {
        n = l.slice(d);
        break;
      }
      if (h === 10 && d === g && r)
        s.push(-3), r = void 0;
      else
        switch (r && (s.push(-5), r = void 0), d < g && (s.push(l.slice(d, g)), e += g - d), h) {
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
      d = g + 1;
    }
    return a && (r && s.push(-5), n && s.push(n), s.push(null)), s;
  }
}
const ha = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function pa(e) {
  return e.replace(ha, da);
}
function da(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1), l = i === 120 || i === 88;
    return Sr(t.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return ut(t) || e;
}
const Pr = {}.hasOwnProperty;
function fa(e, n, t) {
  return typeof n != "string" && (t = n, n = void 0), ma(t)(ua(sa(t).document().write(ca()(e, n, !0))));
}
function ma(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(sn),
      autolinkProtocol: F,
      autolinkEmail: F,
      atxHeading: l(qe),
      blockQuote: l(we),
      characterEscape: F,
      characterReference: F,
      codeFenced: l(Me),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l(Me, o),
      codeText: l(rn, o),
      codeTextData: F,
      data: F,
      codeFlowValue: F,
      definition: l(ln),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(on),
      hardBreakEscape: l(We),
      hardBreakTrailing: l(We),
      htmlFlow: l(an, o),
      htmlFlowData: F,
      htmlText: l(an, o),
      htmlTextData: F,
      image: l(Tn),
      label: o,
      link: l(sn),
      listItem: l(Be),
      listItemValue: g,
      listOrdered: l(un, d),
      listUnordered: l(un),
      paragraph: l(cn),
      reference: m,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: l(qe),
      strong: l(Ln),
      thematicBreak: l(Nn)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: X,
      autolink: s(),
      autolinkEmail: Ie,
      autolinkProtocol: be,
      blockQuote: s(),
      characterEscapeValue: V,
      characterReferenceMarkerHexadecimal: ue,
      characterReferenceMarkerNumeric: ue,
      characterReferenceValue: le,
      characterReference: Ne,
      codeFenced: s(E),
      codeFencedFence: x,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: w,
      codeFlowValue: V,
      codeIndented: s(k),
      codeText: s(B),
      codeTextData: V,
      data: V,
      definition: s(),
      definitionDestinationString: U,
      definitionLabelString: P,
      definitionTitleString: v,
      emphasis: s(),
      hardBreakEscape: s(I),
      hardBreakTrailing: s(I),
      htmlFlow: s(q),
      htmlFlowData: V,
      htmlText: s(Z),
      htmlTextData: V,
      image: s(G),
      label: Ce,
      labelText: oe,
      lineEnding: L,
      link: s(ie),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: ne,
      resourceDestinationString: f,
      resourceTitleString: he,
      resource: ee,
      setextHeading: s(J),
      setextHeadingLineSequence: j,
      setextHeadingText: C,
      strong: s(),
      thematicBreak: s()
    }
  };
  Dr(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(y) {
    let S = {
      type: "root",
      children: []
    };
    const D = {
      stack: [S],
      tokenStack: [],
      config: n,
      enter: a,
      exit: u,
      buffer: o,
      resume: c,
      data: t
    }, O = [];
    let $ = -1;
    for (; ++$ < y.length; )
      if (y[$][1].type === "listOrdered" || y[$][1].type === "listUnordered")
        if (y[$][0] === "enter")
          O.push($);
        else {
          const me = O.pop();
          $ = i(y, me, $);
        }
    for ($ = -1; ++$ < y.length; ) {
      const me = n[y[$][0]];
      Pr.call(me, y[$][1].type) && me[y[$][1].type].call(Object.assign({
        sliceSerialize: y[$][2].sliceSerialize
      }, D), y[$][1]);
    }
    if (D.tokenStack.length > 0) {
      const me = D.tokenStack[D.tokenStack.length - 1];
      (me[1] || Ut).call(D, void 0, me[0]);
    }
    for (S.position = {
      start: Te(y.length > 0 ? y[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Te(y.length > 0 ? y[y.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, $ = -1; ++$ < n.transforms.length; )
      S = n.transforms[$](S) || S;
    return S;
  }
  function i(y, S, D) {
    let O = S - 1, $ = -1, me = !1, Se, _, A, R;
    for (; ++O <= D; ) {
      const N = y[O];
      switch (N[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          N[0] === "enter" ? $++ : $--, R = void 0;
          break;
        }
        case "lineEndingBlank": {
          N[0] === "enter" && (Se && !R && !$ && !A && (A = O), R = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          R = void 0;
      }
      if (!$ && N[0] === "enter" && N[1].type === "listItemPrefix" || $ === -1 && N[0] === "exit" && (N[1].type === "listUnordered" || N[1].type === "listOrdered")) {
        if (Se) {
          let ae = O;
          for (_ = void 0; ae--; ) {
            const K = y[ae];
            if (K[1].type === "lineEnding" || K[1].type === "lineEndingBlank") {
              if (K[0] === "exit") continue;
              _ && (y[_][1].type = "lineEndingBlank", me = !0), K[1].type = "lineEnding", _ = ae;
            } else if (!(K[1].type === "linePrefix" || K[1].type === "blockQuotePrefix" || K[1].type === "blockQuotePrefixWhitespace" || K[1].type === "blockQuoteMarker" || K[1].type === "listItemIndent")) break;
          }
          A && (!_ || A < _) && (Se._spread = !0), Se.end = Object.assign({}, _ ? y[_][1].start : N[1].end), y.splice(_ || O, 0, ["exit", Se, N[2]]), O++, D++;
        }
        if (N[1].type === "listItemPrefix") {
          const ae = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, N[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Se = ae, y.splice(O, 0, ["enter", ae, N[2]]), O++, D++, A = void 0, R = !0;
        }
      }
    }
    return y[S][1]._spread = me, D;
  }
  function l(y, S) {
    return D;
    function D(O) {
      a.call(this, y(O), O), S && S.call(this, O);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(y, S, D) {
    this.stack[this.stack.length - 1].children.push(y), this.stack.push(y), this.tokenStack.push([S, D || void 0]), y.position = {
      start: Te(S.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(y) {
    return S;
    function S(D) {
      y && y.call(this, D), u.call(this, D);
    }
  }
  function u(y, S) {
    const D = this.stack.pop(), O = this.tokenStack.pop();
    if (O)
      O[0].type !== y.type && (S ? S.call(this, y, O[0]) : (O[1] || Ut).call(this, y, O[0]));
    else throw new Error("Cannot close `" + y.type + "` (" + Ge({
      start: y.start,
      end: y.end
    }) + "): it’s not open");
    D.position.end = Te(y.end);
  }
  function c() {
    return pl(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function g(y) {
    if (this.data.expectingFirstListItemValue) {
      const S = this.stack[this.stack.length - 2];
      S.start = Number.parseInt(this.sliceSerialize(y), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const y = this.resume(), S = this.stack[this.stack.length - 1];
    S.lang = y;
  }
  function w() {
    const y = this.resume(), S = this.stack[this.stack.length - 1];
    S.meta = y;
  }
  function x() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function E() {
    const y = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = y.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function k() {
    const y = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = y.replace(/(\r?\n|\r)$/g, "");
  }
  function P(y) {
    const S = this.resume(), D = this.stack[this.stack.length - 1];
    D.label = S, D.identifier = Ve(this.sliceSerialize(y)).toLowerCase();
  }
  function v() {
    const y = this.resume(), S = this.stack[this.stack.length - 1];
    S.title = y;
  }
  function U() {
    const y = this.resume(), S = this.stack[this.stack.length - 1];
    S.url = y;
  }
  function X(y) {
    const S = this.stack[this.stack.length - 1];
    if (!S.depth) {
      const D = this.sliceSerialize(y).length;
      S.depth = D;
    }
  }
  function C() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function j(y) {
    const S = this.stack[this.stack.length - 1];
    S.depth = this.sliceSerialize(y).codePointAt(0) === 61 ? 1 : 2;
  }
  function J() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function F(y) {
    const D = this.stack[this.stack.length - 1].children;
    let O = D[D.length - 1];
    (!O || O.type !== "text") && (O = yt(), O.position = {
      start: Te(y.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, D.push(O)), this.stack.push(O);
  }
  function V(y) {
    const S = this.stack.pop();
    S.value += this.sliceSerialize(y), S.position.end = Te(y.end);
  }
  function L(y) {
    const S = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const D = S.children[S.children.length - 1];
      D.position.end = Te(y.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(S.type) && (F.call(this, y), V.call(this, y));
  }
  function I() {
    this.data.atHardBreak = !0;
  }
  function q() {
    const y = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = y;
  }
  function Z() {
    const y = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = y;
  }
  function B() {
    const y = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = y;
  }
  function ie() {
    const y = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const S = this.data.referenceType || "shortcut";
      y.type += "Reference", y.referenceType = S, delete y.url, delete y.title;
    } else
      delete y.identifier, delete y.label;
    this.data.referenceType = void 0;
  }
  function G() {
    const y = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const S = this.data.referenceType || "shortcut";
      y.type += "Reference", y.referenceType = S, delete y.url, delete y.title;
    } else
      delete y.identifier, delete y.label;
    this.data.referenceType = void 0;
  }
  function oe(y) {
    const S = this.sliceSerialize(y), D = this.stack[this.stack.length - 2];
    D.label = pa(S), D.identifier = Ve(S).toLowerCase();
  }
  function Ce() {
    const y = this.stack[this.stack.length - 1], S = this.resume(), D = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, D.type === "link") {
      const O = y.children;
      D.children = O;
    } else
      D.alt = S;
  }
  function f() {
    const y = this.resume(), S = this.stack[this.stack.length - 1];
    S.url = y;
  }
  function he() {
    const y = this.resume(), S = this.stack[this.stack.length - 1];
    S.title = y;
  }
  function ee() {
    this.data.inReference = void 0;
  }
  function m() {
    this.data.referenceType = "collapsed";
  }
  function ne(y) {
    const S = this.resume(), D = this.stack[this.stack.length - 1];
    D.label = S, D.identifier = Ve(this.sliceSerialize(y)).toLowerCase(), this.data.referenceType = "full";
  }
  function ue(y) {
    this.data.characterReferenceType = y.type;
  }
  function le(y) {
    const S = this.sliceSerialize(y), D = this.data.characterReferenceType;
    let O;
    D ? (O = Sr(S, D === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : O = ut(S);
    const $ = this.stack[this.stack.length - 1];
    $.value += O;
  }
  function Ne(y) {
    const S = this.stack.pop();
    S.position.end = Te(y.end);
  }
  function be(y) {
    V.call(this, y);
    const S = this.stack[this.stack.length - 1];
    S.url = this.sliceSerialize(y);
  }
  function Ie(y) {
    V.call(this, y);
    const S = this.stack[this.stack.length - 1];
    S.url = "mailto:" + this.sliceSerialize(y);
  }
  function we() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function Me() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function rn() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function ln() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function on() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function qe() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function We() {
    return {
      type: "break"
    };
  }
  function an() {
    return {
      type: "html",
      value: ""
    };
  }
  function Tn() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function sn() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function un(y) {
    return {
      type: "list",
      ordered: y.type === "listOrdered",
      start: null,
      spread: y._spread,
      children: []
    };
  }
  function Be(y) {
    return {
      type: "listItem",
      spread: y._spread,
      checked: null,
      children: []
    };
  }
  function cn() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Ln() {
    return {
      type: "strong",
      children: []
    };
  }
  function yt() {
    return {
      type: "text",
      value: ""
    };
  }
  function Nn() {
    return {
      type: "thematicBreak"
    };
  }
}
function Te(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function Dr(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? Dr(e, r) : ga(e, r);
  }
}
function ga(e, n) {
  let t;
  for (t in n)
    if (Pr.call(n, t))
      switch (t) {
        case "canContainEols": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "transforms": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = n[t];
          r && Object.assign(e[t], r);
          break;
        }
      }
}
function Ut(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Ge({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + Ge({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + Ge({
    start: n.start,
    end: n.end
  }) + ") is still open");
}
function ya(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return fa(r, {
      ...n.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: n.data("micromarkExtensions") || [],
      mdastExtensions: n.data("fromMarkdownExtensions") || []
    });
  }
}
function Ca(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function wa(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(n, t), [e.applyData(n, t), { type: "text", value: `
` }];
}
function xa(e, n) {
  const t = n.value ? n.value + `
` : "", r = {};
  n.lang && (r.className = ["language-" + n.lang]);
  let i = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: t }]
  };
  return n.meta && (i.data = { meta: n.meta }), e.patch(n, i), i = e.applyData(n, i), i = { type: "element", tagName: "pre", properties: {}, children: [i] }, e.patch(n, i), i;
}
function ka(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function ba(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Sa(e, n) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(n.identifier).toUpperCase(), i = Ze(r.toLowerCase()), l = e.footnoteOrder.indexOf(r);
  let o, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = l + 1, a += 1, e.footnoteCounts.set(r, a);
  const s = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + t + "fn-" + i,
      id: t + "fnref-" + i + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(o) }]
  };
  e.patch(n, s);
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [s]
  };
  return e.patch(n, u), e.applyData(n, u);
}
function _a(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function va(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function zr(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (n.label || n.identifier) + "]"), n.type === "imageReference")
    return [{ type: "text", value: "![" + n.alt + r }];
  const i = e.all(n), l = i[0];
  l && l.type === "text" ? l.value = "[" + l.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function Ea(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return zr(e, n);
  const i = { src: Ze(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(n, l), e.applyData(n, l);
}
function Ia(e, n) {
  const t = { src: Ze(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function Ta(e, n) {
  const t = { type: "text", value: n.value.replace(/\r?\n|\r/g, " ") };
  e.patch(n, t);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [t]
  };
  return e.patch(n, r), e.applyData(n, r);
}
function La(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return zr(e, n);
  const i = { href: Ze(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(n)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function Na(e, n) {
  const t = { href: Ze(n.url) };
  n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: t,
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function Ma(e, n, t) {
  const r = e.all(n), i = t ? Aa(t) : Or(n), l = {}, o = [];
  if (typeof n.checked == "boolean") {
    const c = r[0];
    let d;
    c && c.type === "element" && c.tagName === "p" ? d = c : (d = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(d)), d.children.length > 0 && d.children.unshift({ type: "text", value: " " }), d.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: n.checked, disabled: !0 },
      children: []
    }), l.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const c = r[a];
    (i || a !== 0 || c.type !== "element" || c.tagName !== "p") && o.push({ type: "text", value: `
` }), c.type === "element" && c.tagName === "p" && !i ? o.push(...c.children) : o.push(c);
  }
  const s = r[r.length - 1];
  s && (i || s.type !== "element" || s.tagName !== "p") && o.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: l, children: o };
  return e.patch(n, u), e.applyData(n, u);
}
function Aa(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; )
      n = Or(t[r]);
  }
  return n;
}
function Or(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function Pa(e, n) {
  const t = {}, r = e.all(n);
  let i = -1;
  for (typeof n.start == "number" && n.start !== 1 && (t.start = n.start); ++i < r.length; ) {
    const o = r[i];
    if (o.type === "element" && o.tagName === "li" && o.properties && Array.isArray(o.properties.className) && o.properties.className.includes("task-list-item")) {
      t.className = ["contains-task-list"];
      break;
    }
  }
  const l = {
    type: "element",
    tagName: n.ordered ? "ol" : "ul",
    properties: t,
    children: e.wrap(r, !0)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function Da(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function za(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Oa(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Ra(e, n) {
  const t = e.all(n), r = t.shift(), i = [];
  if (r) {
    const o = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(n.children[0], o), i.push(o);
  }
  if (t.length > 0) {
    const o = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(t, !0)
    }, a = lt(n.children[1]), s = gr(n.children[n.children.length - 1]);
    a && s && (o.position = { start: a, end: s }), i.push(o);
  }
  const l = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function Ba(e, n, t) {
  const r = t ? t.children : void 0, l = (r ? r.indexOf(n) : 1) === 0 ? "th" : "td", o = t && t.type === "table" ? t.align : void 0, a = o ? o.length : n.children.length;
  let s = -1;
  const u = [];
  for (; ++s < a; ) {
    const d = n.children[s], g = {}, h = o ? o[s] : void 0;
    h && (g.align = h);
    let w = { type: "element", tagName: l, properties: g, children: [] };
    d && (w.children = e.all(d), e.patch(d, w), w = e.applyData(d, w)), u.push(w);
  }
  const c = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(n, c), e.applyData(n, c);
}
function Fa(e, n) {
  const t = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Ht = 9, jt = 32;
function Ua(e) {
  const n = String(e), t = /\r?\n|\r/g;
  let r = t.exec(n), i = 0;
  const l = [];
  for (; r; )
    l.push(
      Vt(n.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = t.exec(n);
  return l.push(Vt(n.slice(i), i > 0, !1)), l.join("");
}
function Vt(e, n, t) {
  let r = 0, i = e.length;
  if (n) {
    let l = e.codePointAt(r);
    for (; l === Ht || l === jt; )
      r++, l = e.codePointAt(r);
  }
  if (t) {
    let l = e.codePointAt(i - 1);
    for (; l === Ht || l === jt; )
      i--, l = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function Ha(e, n) {
  const t = { type: "text", value: Ua(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function ja(e, n) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Va = {
  blockquote: Ca,
  break: wa,
  code: xa,
  delete: ka,
  emphasis: ba,
  footnoteReference: Sa,
  heading: _a,
  html: va,
  imageReference: Ea,
  image: Ia,
  inlineCode: Ta,
  linkReference: La,
  link: Na,
  listItem: Ma,
  list: Pa,
  paragraph: Da,
  // @ts-expect-error: root is different, but hard to type.
  root: za,
  strong: Oa,
  table: Ra,
  tableCell: Fa,
  tableRow: Ba,
  text: Ha,
  thematicBreak: ja,
  toml: mn,
  yaml: mn,
  definition: mn,
  footnoteDefinition: mn
};
function mn() {
}
const Rr = -1, En = 0, Ke = 1, kn = 2, pt = 3, dt = 4, ft = 5, mt = 6, Br = 7, Fr = 8, $t = typeof self == "object" ? self : globalThis, $a = (e, n) => {
  const t = (i, l) => (e.set(l, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [l, o] = n[i];
    switch (l) {
      case En:
      case Rr:
        return t(o, i);
      case Ke: {
        const a = t([], i);
        for (const s of o)
          a.push(r(s));
        return a;
      }
      case kn: {
        const a = t({}, i);
        for (const [s, u] of o)
          a[r(s)] = r(u);
        return a;
      }
      case pt:
        return t(new Date(o), i);
      case dt: {
        const { source: a, flags: s } = o;
        return t(new RegExp(a, s), i);
      }
      case ft: {
        const a = t(/* @__PURE__ */ new Map(), i);
        for (const [s, u] of o)
          a.set(r(s), r(u));
        return a;
      }
      case mt: {
        const a = t(/* @__PURE__ */ new Set(), i);
        for (const s of o)
          a.add(r(s));
        return a;
      }
      case Br: {
        const { name: a, message: s } = o;
        return t(new $t[a](s), i);
      }
      case Fr:
        return t(BigInt(o), i);
      case "BigInt":
        return t(Object(BigInt(o)), i);
      case "ArrayBuffer":
        return t(new Uint8Array(o).buffer, o);
      case "DataView": {
        const { buffer: a } = new Uint8Array(o);
        return t(new DataView(a), o);
      }
    }
    return t(new $t[l](o), i);
  };
  return r;
}, Zt = (e) => $a(/* @__PURE__ */ new Map(), e)(0), He = "", { toString: Za } = {}, { keys: qa } = Object, Je = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [En, n];
  const t = Za.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [Ke, He];
    case "Object":
      return [kn, He];
    case "Date":
      return [pt, He];
    case "RegExp":
      return [dt, He];
    case "Map":
      return [ft, He];
    case "Set":
      return [mt, He];
    case "DataView":
      return [Ke, t];
  }
  return t.includes("Array") ? [Ke, t] : t.includes("Error") ? [Br, t] : [kn, t];
}, gn = ([e, n]) => e === En && (n === "function" || n === "symbol"), Wa = (e, n, t, r) => {
  const i = (o, a) => {
    const s = r.push(o) - 1;
    return t.set(a, s), s;
  }, l = (o) => {
    if (t.has(o))
      return t.get(o);
    let [a, s] = Je(o);
    switch (a) {
      case En: {
        let c = o;
        switch (s) {
          case "bigint":
            a = Fr, c = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            c = null;
            break;
          case "undefined":
            return i([Rr], o);
        }
        return i([a, c], o);
      }
      case Ke: {
        if (s) {
          let g = o;
          return s === "DataView" ? g = new Uint8Array(o.buffer) : s === "ArrayBuffer" && (g = new Uint8Array(o)), i([s, [...g]], o);
        }
        const c = [], d = i([a, c], o);
        for (const g of o)
          c.push(l(g));
        return d;
      }
      case kn: {
        if (s)
          switch (s) {
            case "BigInt":
              return i([s, o.toString()], o);
            case "Boolean":
            case "Number":
            case "String":
              return i([s, o.valueOf()], o);
          }
        if (n && "toJSON" in o)
          return l(o.toJSON());
        const c = [], d = i([a, c], o);
        for (const g of qa(o))
          (e || !gn(Je(o[g]))) && c.push([l(g), l(o[g])]);
        return d;
      }
      case pt:
        return i([a, o.toISOString()], o);
      case dt: {
        const { source: c, flags: d } = o;
        return i([a, { source: c, flags: d }], o);
      }
      case ft: {
        const c = [], d = i([a, c], o);
        for (const [g, h] of o)
          (e || !(gn(Je(g)) || gn(Je(h)))) && c.push([l(g), l(h)]);
        return d;
      }
      case mt: {
        const c = [], d = i([a, c], o);
        for (const g of o)
          (e || !gn(Je(g))) && c.push(l(g));
        return d;
      }
    }
    const { message: u } = o;
    return i([a, { name: s, message: u }], o);
  };
  return l;
}, qt = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return Wa(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, bn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? Zt(qt(e, n)) : structuredClone(e)
) : (e, n) => Zt(qt(e, n));
function Ya(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return n > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(n) }]
  }), t;
}
function Xa(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function Ja(e) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || Ya, r = e.options.footnoteBackLabel || Xa, i = e.options.footnoteLabel || "Footnotes", l = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!u)
      continue;
    const c = e.all(u), d = String(u.identifier).toUpperCase(), g = Ze(d.toLowerCase());
    let h = 0;
    const w = [], x = e.footnoteCounts.get(d);
    for (; x !== void 0 && ++h <= x; ) {
      w.length > 0 && w.push({ type: "text", value: " " });
      let P = typeof t == "string" ? t : t(s, h);
      typeof P == "string" && (P = { type: "text", value: P }), w.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + n + "fnref-" + g + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(P) ? P : [P]
      });
    }
    const E = c[c.length - 1];
    if (E && E.type === "element" && E.tagName === "p") {
      const P = E.children[E.children.length - 1];
      P && P.type === "text" ? P.value += " " : E.children.push({ type: "text", value: " " }), E.children.push(...w);
    } else
      c.push(...w);
    const k = {
      type: "element",
      tagName: "li",
      properties: { id: n + "fn-" + g },
      children: e.wrap(c, !0)
    };
    e.patch(u, k), a.push(k);
  }
  if (a.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: l,
          properties: {
            ...bn(o),
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
const Ur = (
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
      return es;
    if (typeof e == "function")
      return In(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Ga(e) : Qa(e);
    if (typeof e == "string")
      return Ka(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function Ga(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = Ur(e[t]);
  return In(r);
  function r(...i) {
    let l = -1;
    for (; ++l < n.length; )
      if (n[l].apply(this, i)) return !0;
    return !1;
  }
}
function Qa(e) {
  const n = (
    /** @type {Record<string, unknown>} */
    e
  );
  return In(t);
  function t(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let l;
    for (l in e)
      if (i[l] !== n[l]) return !1;
    return !0;
  }
}
function Ka(e) {
  return In(n);
  function n(t) {
    return t && t.type === e;
  }
}
function In(e) {
  return n;
  function n(t, r, i) {
    return !!(ns(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function es() {
  return !0;
}
function ns(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Hr = [], ts = !0, Wt = !1, rs = "skip";
function is(e, n, t, r) {
  let i;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : i = n;
  const l = Ur(i), o = r ? -1 : 1;
  a(e, void 0, [])();
  function a(s, u, c) {
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
      Object.defineProperty(g, "name", {
        value: "node (" + (s.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return g;
    function g() {
      let h = Hr, w, x, E;
      if ((!n || l(s, u, c[c.length - 1] || void 0)) && (h = ls(t(s, c)), h[0] === Wt))
        return h;
      if ("children" in s && s.children) {
        const k = (
          /** @type {UnistParent} */
          s
        );
        if (k.children && h[0] !== rs)
          for (x = (r ? k.children.length : -1) + o, E = c.concat(k); x > -1 && x < k.children.length; ) {
            const P = k.children[x];
            if (w = a(P, x, E)(), w[0] === Wt)
              return w;
            x = typeof w[1] == "number" ? w[1] : x + o;
          }
      }
      return h;
    }
  }
}
function ls(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [ts, e] : e == null ? Hr : [e];
}
function jr(e, n, t, r) {
  let i, l, o;
  typeof n == "function" && typeof t != "function" ? (l = void 0, o = n, i = t) : (l = n, o = t, i = r), is(e, l, a, i);
  function a(s, u) {
    const c = u[u.length - 1], d = c ? c.children.indexOf(s) : void 0;
    return o(s, d, c);
  }
}
const Qn = {}.hasOwnProperty, os = {};
function as(e, n) {
  const t = n || os, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), o = { ...Va, ...t.handlers }, a = {
    all: u,
    applyData: us,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: l,
    footnoteOrder: [],
    handlers: o,
    one: s,
    options: t,
    patch: ss,
    wrap: hs
  };
  return jr(e, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const d = c.type === "definition" ? r : i, g = String(c.identifier).toUpperCase();
      d.has(g) || d.set(g, c);
    }
  }), a;
  function s(c, d) {
    const g = c.type, h = a.handlers[g];
    if (Qn.call(a.handlers, g) && h)
      return h(a, c, d);
    if (a.options.passThrough && a.options.passThrough.includes(g)) {
      if ("children" in c) {
        const { children: x, ...E } = c, k = bn(E);
        return k.children = a.all(c), k;
      }
      return bn(c);
    }
    return (a.options.unknownHandler || cs)(a, c, d);
  }
  function u(c) {
    const d = [];
    if ("children" in c) {
      const g = c.children;
      let h = -1;
      for (; ++h < g.length; ) {
        const w = a.one(g[h], c);
        if (w) {
          if (h && g[h - 1].type === "break" && (!Array.isArray(w) && w.type === "text" && (w.value = Yt(w.value)), !Array.isArray(w) && w.type === "element")) {
            const x = w.children[0];
            x && x.type === "text" && (x.value = Yt(x.value));
          }
          Array.isArray(w) ? d.push(...w) : d.push(w);
        }
      }
    }
    return d;
  }
}
function ss(e, n) {
  e.position && (n.position = $i(e));
}
function us(e, n) {
  let t = n;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, l = e.data.hProperties;
    if (typeof r == "string")
      if (t.type === "element")
        t.tagName = r;
      else {
        const o = "children" in t ? t.children : [t];
        t = { type: "element", tagName: r, properties: {}, children: o };
      }
    t.type === "element" && l && Object.assign(t.properties, bn(l)), "children" in t && t.children && i !== null && i !== void 0 && (t.children = i);
  }
  return t;
}
function cs(e, n) {
  const t = n.data || {}, r = "value" in n && !(Qn.call(t, "hProperties") || Qn.call(t, "hChildren")) ? { type: "text", value: n.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function hs(e, n) {
  const t = [];
  let r = -1;
  for (n && t.push({ type: "text", value: `
` }); ++r < e.length; )
    r && t.push({ type: "text", value: `
` }), t.push(e[r]);
  return n && e.length > 0 && t.push({ type: "text", value: `
` }), t;
}
function Yt(e) {
  let n = 0, t = e.charCodeAt(n);
  for (; t === 9 || t === 32; )
    n++, t = e.charCodeAt(n);
  return e.slice(n);
}
function Xt(e, n) {
  const t = as(e, n), r = t.one(e, void 0), i = Ja(t), l = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && l.children.push({ type: "text", value: `
` }, i), l;
}
function ps(e, n) {
  return e && "run" in e ? async function(t, r) {
    const i = (
      /** @type {HastRoot} */
      Xt(t, { file: r, ...n })
    );
    await e.run(i, r);
  } : function(t, r) {
    return (
      /** @type {HastRoot} */
      Xt(t, { file: r, ...e || n })
    );
  };
}
function Jt(e) {
  if (e)
    throw e;
}
var wn = Object.prototype.hasOwnProperty, Vr = Object.prototype.toString, Gt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, Kt = function(n) {
  return typeof Array.isArray == "function" ? Array.isArray(n) : Vr.call(n) === "[object Array]";
}, er = function(n) {
  if (!n || Vr.call(n) !== "[object Object]")
    return !1;
  var t = wn.call(n, "constructor"), r = n.constructor && n.constructor.prototype && wn.call(n.constructor.prototype, "isPrototypeOf");
  if (n.constructor && !t && !r)
    return !1;
  var i;
  for (i in n)
    ;
  return typeof i > "u" || wn.call(n, i);
}, nr = function(n, t) {
  Gt && t.name === "__proto__" ? Gt(n, t.name, {
    enumerable: !0,
    configurable: !0,
    value: t.newValue,
    writable: !0
  }) : n[t.name] = t.newValue;
}, tr = function(n, t) {
  if (t === "__proto__")
    if (wn.call(n, t)) {
      if (Qt)
        return Qt(n, t).value;
    } else return;
  return n[t];
}, ds = function e() {
  var n, t, r, i, l, o, a = arguments[0], s = 1, u = arguments.length, c = !1;
  for (typeof a == "boolean" && (c = a, a = arguments[1] || {}, s = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); s < u; ++s)
    if (n = arguments[s], n != null)
      for (t in n)
        r = tr(a, t), i = tr(n, t), a !== i && (c && i && (er(i) || (l = Kt(i))) ? (l ? (l = !1, o = r && Kt(r) ? r : []) : o = r && er(r) ? r : {}, nr(a, { name: t, newValue: e(c, o, i) })) : typeof i < "u" && nr(a, { name: t, newValue: i }));
  return a;
};
const On = /* @__PURE__ */ mr(ds);
function Kn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function fs() {
  const e = [], n = { run: t, use: r };
  return n;
  function t(...i) {
    let l = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    a(null, ...i);
    function a(s, ...u) {
      const c = e[++l];
      let d = -1;
      if (s) {
        o(s);
        return;
      }
      for (; ++d < i.length; )
        (u[d] === null || u[d] === void 0) && (u[d] = i[d]);
      i = u, c ? ms(c, a)(...u) : o(null, ...u);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), n;
  }
}
function ms(e, n) {
  let t;
  return r;
  function r(...o) {
    const a = e.length > o.length;
    let s;
    a && o.push(i);
    try {
      s = e.apply(this, o);
    } catch (u) {
      const c = (
        /** @type {Error} */
        u
      );
      if (a && t)
        throw c;
      return i(c);
    }
    a || (s && s.then && typeof s.then == "function" ? s.then(l, i) : s instanceof Error ? i(s) : l(s));
  }
  function i(o, ...a) {
    t || (t = !0, n(o, ...a));
  }
  function l(o) {
    i(null, o);
  }
}
const _e = { basename: gs, dirname: ys, extname: Cs, join: ws, sep: "/" };
function gs(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  tn(e);
  let t = 0, r = -1, i = e.length, l;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (l) {
          t = i + 1;
          break;
        }
      } else r < 0 && (l = !0, r = i + 1);
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e)
    return "";
  let o = -1, a = n.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (l) {
        t = i + 1;
        break;
      }
    } else
      o < 0 && (l = !0, o = i + 1), a > -1 && (e.codePointAt(i) === n.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = o));
  return t === r ? r = o : r < 0 && (r = e.length), e.slice(t, r);
}
function ys(e) {
  if (tn(e), e.length === 0)
    return ".";
  let n = -1, t = e.length, r;
  for (; --t; )
    if (e.codePointAt(t) === 47) {
      if (r) {
        n = t;
        break;
      }
    } else r || (r = !0);
  return n < 0 ? e.codePointAt(0) === 47 ? "/" : "." : n === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, n);
}
function Cs(e) {
  tn(e);
  let n = e.length, t = -1, r = 0, i = -1, l = 0, o;
  for (; n--; ) {
    const a = e.codePointAt(n);
    if (a === 47) {
      if (o) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && (o = !0, t = n + 1), a === 46 ? i < 0 ? i = n : l !== 1 && (l = 1) : i > -1 && (l = -1);
  }
  return i < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  l === 0 || // The (right-most) trimmed path component is exactly `..`.
  l === 1 && i === t - 1 && i === r + 1 ? "" : e.slice(i, t);
}
function ws(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    tn(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : xs(t);
}
function xs(e) {
  tn(e);
  const n = e.codePointAt(0) === 47;
  let t = ks(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function ks(e, n) {
  let t = "", r = 0, i = -1, l = 0, o = -1, a, s;
  for (; ++o <= e.length; ) {
    if (o < e.length)
      a = e.codePointAt(o);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === o - 1 || l === 1)) if (i !== o - 1 && l === 2) {
        if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
          if (t.length > 2) {
            if (s = t.lastIndexOf("/"), s !== t.length - 1) {
              s < 0 ? (t = "", r = 0) : (t = t.slice(0, s), r = t.length - 1 - t.lastIndexOf("/")), i = o, l = 0;
              continue;
            }
          } else if (t.length > 0) {
            t = "", r = 0, i = o, l = 0;
            continue;
          }
        }
        n && (t = t.length > 0 ? t + "/.." : "..", r = 2);
      } else
        t.length > 0 ? t += "/" + e.slice(i + 1, o) : t = e.slice(i + 1, o), r = o - i - 1;
      i = o, l = 0;
    } else a === 46 && l > -1 ? l++ : l = -1;
  }
  return t;
}
function tn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const bs = { cwd: Ss };
function Ss() {
  return "/";
}
function et(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function _s(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!et(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw n.code = "ERR_INVALID_ARG_TYPE", n;
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw n.code = "ERR_INVALID_URL_SCHEME", n;
  }
  return vs(e);
}
function vs(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const n = e.pathname;
  let t = -1;
  for (; ++t < n.length; )
    if (n.codePointAt(t) === 37 && n.codePointAt(t + 1) === 50) {
      const r = n.codePointAt(t + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(n);
}
const Rn = (
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
class $r {
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
  constructor(n) {
    let t;
    n ? et(n) ? t = { path: n } : typeof n == "string" || Es(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : bs.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Rn.length; ) {
      const l = Rn[r];
      l in t && t[l] !== void 0 && t[l] !== null && (this[l] = l === "history" ? [...t[l]] : t[l]);
    }
    let i;
    for (i in t)
      Rn.includes(i) || (this[i] = t[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? _e.basename(this.path) : void 0;
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
  set basename(n) {
    Fn(n, "basename"), Bn(n, "basename"), this.path = _e.join(this.dirname || "", n);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? _e.dirname(this.path) : void 0;
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
  set dirname(n) {
    rr(this.basename, "dirname"), this.path = _e.join(n || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? _e.extname(this.path) : void 0;
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
  set extname(n) {
    if (Bn(n, "extname"), rr(this.dirname, "extname"), n) {
      if (n.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (n.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = _e.join(this.dirname, this.stem + (n || ""));
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
  set path(n) {
    et(n) && (n = _s(n)), Fn(n, "path"), this.path !== n && this.history.push(n);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? _e.basename(this.path, this.extname) : void 0;
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
  set stem(n) {
    Fn(n, "stem"), Bn(n, "stem"), this.path = _e.join(this.dirname || "", n + (this.extname || ""));
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
  fail(n, t, r) {
    const i = this.message(n, t, r);
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
  info(n, t, r) {
    const i = this.message(n, t, r);
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
  message(n, t, r) {
    const i = new se(
      // @ts-expect-error: the overloads are fine.
      n,
      t,
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
  toString(n) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(n || void 0).decode(this.value);
  }
}
function Bn(e, n) {
  if (e && e.includes(_e.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + _e.sep + "`"
    );
}
function Fn(e, n) {
  if (!e)
    throw new Error("`" + n + "` cannot be empty");
}
function rr(e, n) {
  if (!e)
    throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function Es(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Is = (
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
    ), i = r[e], l = function() {
      return i.apply(l, arguments);
    };
    return Object.setPrototypeOf(l, r), l;
  }
), Ts = {}.hasOwnProperty;
class gt extends Is {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = fs();
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
    const n = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new gt()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data(On(!0, {}, this.namespace)), n;
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
  data(n, t) {
    return typeof n == "string" ? arguments.length === 2 ? (jn("data", this.frozen), this.namespace[n] = t, this) : Ts.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (jn("data", this.frozen), this.namespace = n, this) : this.namespace;
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
    const n = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = t.call(n, ...r);
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
  parse(n) {
    this.freeze();
    const t = yn(n), r = this.parser || this.Parser;
    return Un("parse", r), r(String(t), t);
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
  process(n, t) {
    const r = this;
    return this.freeze(), Un("process", this.parser || this.Parser), Hn("process", this.compiler || this.Compiler), t ? i(void 0, t) : new Promise(i);
    function i(l, o) {
      const a = yn(n), s = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(s, a, function(c, d, g) {
        if (c || !d || !g)
          return u(c);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          d
        ), w = r.stringify(h, g);
        Ms(w) ? g.value = w : g.result = w, u(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          g
        );
      });
      function u(c, d) {
        c || !d ? o(c) : l ? l(d) : t(void 0, d);
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
  processSync(n) {
    let t = !1, r;
    return this.freeze(), Un("processSync", this.parser || this.Parser), Hn("processSync", this.compiler || this.Compiler), this.process(n, i), lr("processSync", "process", t), r;
    function i(l, o) {
      t = !0, Jt(l), r = o;
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
  run(n, t, r) {
    ir(n), this.freeze();
    const i = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? l(void 0, r) : new Promise(l);
    function l(o, a) {
      const s = yn(t);
      i.run(n, s, u);
      function u(c, d, g) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          d || n
        );
        c ? a(c) : o ? o(h) : r(void 0, h, g);
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
  runSync(n, t) {
    let r = !1, i;
    return this.run(n, t, l), lr("runSync", "run", r), i;
    function l(o, a) {
      Jt(o), i = a, r = !0;
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
  stringify(n, t) {
    this.freeze();
    const r = yn(t), i = this.compiler || this.Compiler;
    return Hn("stringify", i), ir(n), i(n, r);
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
  use(n, ...t) {
    const r = this.attachers, i = this.namespace;
    if (jn("use", this.frozen), n != null) if (typeof n == "function")
      s(n, t);
    else if (typeof n == "object")
      Array.isArray(n) ? a(n) : o(n);
    else
      throw new TypeError("Expected usable value, not `" + n + "`");
    return this;
    function l(u) {
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
      a(u.plugins), u.settings && (i.settings = On(!0, i.settings, u.settings));
    }
    function a(u) {
      let c = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++c < u.length; ) {
          const d = u[c];
          l(d);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function s(u, c) {
      let d = -1, g = -1;
      for (; ++d < r.length; )
        if (r[d][0] === u) {
          g = d;
          break;
        }
      if (g === -1)
        r.push([u, ...c]);
      else if (c.length > 0) {
        let [h, ...w] = c;
        const x = r[g][1];
        Kn(x) && Kn(h) && (h = On(!0, x, h)), r[g] = [u, h, ...w];
      }
    }
  }
}
const Ls = new gt().freeze();
function Un(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Hn(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function jn(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function ir(e) {
  if (!Kn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function lr(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function yn(e) {
  return Ns(e) ? e : new $r(e);
}
function Ns(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Ms(e) {
  return typeof e == "string" || As(e);
}
function As(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Ps = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", or = [], ar = { allowDangerousHtml: !0 }, Ds = /^(https?|ircs?|mailto|xmpp)$/i, zs = [
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
function Sn(e) {
  const n = Os(e), t = Rs(e);
  return Bs(n.runSync(n.parse(t), t), e);
}
function Os(e) {
  const n = e.rehypePlugins || or, t = e.remarkPlugins || or, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...ar } : ar;
  return Ls().use(ya).use(t).use(ps, r).use(n);
}
function Rs(e) {
  const n = e.children || "", t = new $r();
  return typeof n == "string" && (t.value = n), t;
}
function Bs(e, n) {
  const t = n.allowedElements, r = n.allowElement, i = n.components, l = n.disallowedElements, o = n.skipHtml, a = n.unwrapDisallowed, s = n.urlTransform || Fs;
  for (const c of zs)
    Object.hasOwn(n, c.from) && ("" + c.from + (c.to ? "use `" + c.to + "` instead" : "remove it") + Ps + c.id, void 0);
  return jr(e, u), Xi(e, {
    Fragment: Vn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: p,
    jsxs: T,
    passKeys: !0,
    passNode: !0
  });
  function u(c, d, g) {
    if (c.type === "raw" && g && typeof d == "number")
      return o ? g.children.splice(d, 1) : g.children[d] = { type: "text", value: c.value }, d;
    if (c.type === "element") {
      let h;
      for (h in Pn)
        if (Object.hasOwn(Pn, h) && Object.hasOwn(c.properties, h)) {
          const w = c.properties[h], x = Pn[h];
          (x === null || x.includes(c.tagName)) && (c.properties[h] = s(String(w || ""), h, c));
        }
    }
    if (c.type === "element") {
      let h = t ? !t.includes(c.tagName) : l ? l.includes(c.tagName) : !1;
      if (!h && r && typeof d == "number" && (h = !r(c, d, g)), h && g && typeof d == "number")
        return a && c.children ? g.children.splice(d, 1, ...c.children) : g.children.splice(d, 1), d;
    }
  }
}
function Fs(e) {
  const n = e.indexOf(":"), t = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && n > i || t !== -1 && n > t || r !== -1 && n > r || // It is a protocol, it should be allowed.
    Ds.test(e.slice(0, n)) ? e : ""
  );
}
const ke = (...e) => e.filter(Boolean).join(" "), Us = () => /* @__PURE__ */ T(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ T("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ p(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            "shape-rendering": "crispEdges"
          }
        ),
        /* @__PURE__ */ p("g", { "clip-path": "url(#clip0_121_23927)", children: /* @__PURE__ */ p(
          "path",
          {
            d: "M16.3333 26.3541L18.2133 28.2341L25.6666 20.7941V37.0208H28.3333V20.7941L35.7733 28.2474L37.6666 26.3541L26.9999 15.6874L16.3333 26.3541Z",
            fill: "white"
          }
        ) })
      ] }),
      /* @__PURE__ */ T("defs", { children: [
        /* @__PURE__ */ T(
          "filter",
          {
            id: "filter0_dd_121_23927",
            x: "0",
            y: "0.354126",
            width: "54",
            height: "54",
            filterUnits: "userSpaceOnUse",
            "color-interpolation-filters": "sRGB",
            children: [
              /* @__PURE__ */ p("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }),
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
), Hs = ({ className: e, ...n }) => /* @__PURE__ */ p("form", { className: ke("chat-wrapper__prompt-input", e), ...n }), Zr = Kr(
  ({
    onChange: e,
    className: n,
    placeholder: t = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: l,
    ...o
  }, a) => {
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
      l == null || l(u);
    };
    return /* @__PURE__ */ p(
      "textarea",
      {
        ref: a,
        className: ke("chat-wrapper__prompt-textarea", n),
        name: "message",
        onChange: e,
        onKeyDown: s,
        placeholder: t,
        style: {
          minHeight: `${r}px`,
          maxHeight: `${i}px`
        },
        ...o
      }
    );
  }
);
Zr.displayName = "PromptInputTextarea";
const js = ({
  className: e,
  ...n
}) => /* @__PURE__ */ p("div", { className: ke("chat-wrapper__prompt-toolbar", e), ...n }), Vs = ({
  className: e,
  ...n
}) => /* @__PURE__ */ p("div", { className: ke("chat-wrapper__prompt-tools", e), ...n }), $s = ({
  variant: e = "ghost",
  size: n = "default",
  className: t,
  children: r,
  ...i
}) => {
  const l = n === "default" && (typeof r == "string" || Qr.Children.count(r) === 1) ? "icon" : n;
  return /* @__PURE__ */ p(
    "button",
    {
      className: ke(
        "chat-wrapper__prompt-button",
        `chat-wrapper__prompt-button--${e}`,
        `chat-wrapper__prompt-button--${l}`,
        t
      ),
      type: "button",
      ...i,
      children: r
    }
  );
}, Zs = ({
  className: e,
  variant: n = "default",
  size: t = "icon",
  status: r = "idle",
  children: i,
  disabled: l,
  ...o
}) => {
  let a = /* @__PURE__ */ p(Us, {});
  const s = l || r === "submitted" || r === "streaming";
  return /* @__PURE__ */ p(
    "button",
    {
      className: ke(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${n}`,
        `chat-wrapper__prompt-submit--${t}`,
        // status === "streaming" && "chat-wrapper__prompt-submit--stop",
        e
      ),
      type: "submit",
      disabled: s,
      ...o,
      children: i ?? a
    }
  );
}, o1 = ({
  className: e,
  children: n,
  ...t
}) => /* @__PURE__ */ p("select", { className: ke("chat-wrapper__prompt-select", e), ...t, children: n }), a1 = ({
  className: e,
  children: n,
  ...t
}) => /* @__PURE__ */ p(
  "button",
  {
    className: ke("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...t,
    children: n
  }
), s1 = ({
  className: e,
  ...n
}) => /* @__PURE__ */ p(
  "div",
  {
    className: ke("chat-wrapper__prompt-select-content", e),
    ...n
  }
), u1 = ({
  className: e,
  value: n,
  ...t
}) => /* @__PURE__ */ p(
  "div",
  {
    className: ke("chat-wrapper__prompt-select-item", e),
    "data-value": n,
    ...t
  }
), c1 = ({
  className: e,
  placeholder: n,
  ...t
}) => /* @__PURE__ */ p(
  "span",
  {
    className: ke("chat-wrapper__prompt-select-value", e),
    ...t,
    children: n
  }
), qs = ({
  placeholder: e = "What would you like to know?",
  disabled: n = !1,
  chatStatus: t,
  uploadedMedia: r,
  fileUploadEnabled: i = !1,
  onSubmit: l,
  onFileUpload: o,
  onClearMedia: a,
  onStopGeneration: s
}) => {
  const [u, c] = Q(""), d = te(
    (h) => {
      h.preventDefault();
      const x = new FormData(h.currentTarget).get("message");
      x != null && x.trim() && (l(x.trim(), r), c(""), a());
    },
    [l, r, a]
  ), g = te(() => {
    const h = document.createElement("input");
    h.type = "file", h.accept = "image/*,text/*,.pdf,.doc,.docx", h.multiple = !0, h.onchange = (w) => {
      const x = w.target.files;
      x && o(Array.from(x));
    }, h.click();
  }, [o]);
  return /* @__PURE__ */ T(Hs, { onSubmit: d, children: [
    /* @__PURE__ */ p(
      Zr,
      {
        name: "message",
        value: u,
        onChange: (h) => c(h.target.value),
        placeholder: e,
        disabled: n
      }
    ),
    /* @__PURE__ */ T(js, { children: [
      /* @__PURE__ */ p(Vs, { children: i && /* @__PURE__ */ T(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ T(
              $s,
              {
                variant: "ghost",
                size: "icon",
                onClick: g,
                title: r.length > 0 ? `${r.length} file(s) attached` : "Attach files",
                disabled: n,
                style: {
                  position: "relative",
                  color: r.length > 0 ? "#3b82f6" : void 0
                },
                children: [
                  /* @__PURE__ */ p(
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
                          d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49L13.1 2.41a4 4 0 015.66 5.66L9.41 17.41a2 2 0 01-2.83-2.83L15.9 5.24",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      )
                    }
                  ),
                  r.length > 0 && /* @__PURE__ */ p(
                    "span",
                    {
                      style: {
                        position: "absolute",
                        top: "-2px",
                        right: "-2px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        borderRadius: "50%",
                        width: "12px",
                        height: "12px",
                        fontSize: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold"
                      },
                      children: r.length > 9 ? "9+" : r.length
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ p(
              "span",
              {
                onClick: g,
                style: {
                  fontSize: "12px",
                  color: "#6b7280",
                  marginLeft: "4px",
                  cursor: "pointer"
                },
                children: r.length > 0 ? `${r.length} file(s)` : "Upload files"
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ p(
        Zs,
        {
          status: t,
          disabled: !u.trim() && t !== "streaming",
          onClick: t === "streaming" && s ? () => {
            s();
          } : void 0
        }
      )
    ] })
  ] });
};
function Ws({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning", children: e });
}
function Ys({
  title: e,
  status: n = "processing"
}) {
  return /* @__PURE__ */ T("div", { className: "chat-wrapper__reasoning-trigger", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-icon", children: (() => {
      switch (n) {
        case "completed":
          return /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-checkmark", children: /* @__PURE__ */ p(
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
                  d: "M20 6L9 17L4 12",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          ) });
        case "error":
          return /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-error", children: /* @__PURE__ */ p(
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
                  d: "M18 6L6 18M6 6L18 18",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          ) });
        default:
          return /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-processing", children: /* @__PURE__ */ p(
            "svg",
            {
              width: "10",
              height: "14",
              viewBox: "0 0 10 14",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ p(
                "path",
                {
                  d: "M3.79576 11.3819C3.46532 11.3819 3.18343 11.2644 2.9501 11.0294C2.71676 10.7944 2.6001 10.5119 2.6001 10.1819V9.06527C1.96676 8.65082 1.4751 8.11943 1.1251 7.4711C0.775098 6.82277 0.600098 6.12638 0.600098 5.38193C0.600098 4.15627 1.02665 3.11649 1.87976 2.2626C2.73288 1.40882 3.77176 0.981934 4.99643 0.981934C6.2211 0.981934 7.26121 1.40882 8.11676 2.2626C8.97232 3.11649 9.4001 4.15627 9.4001 5.38193C9.4001 6.12438 9.2251 6.8211 8.8751 7.4721C8.5251 8.1231 8.03343 8.65416 7.4001 9.06527V10.1819C7.4001 10.5119 7.28243 10.7944 7.0471 11.0294C6.81188 11.2644 6.52904 11.3819 6.1986 11.3819H3.79576ZM3.8001 10.1819H6.2001V8.41527L6.7501 8.06527C7.20565 7.77638 7.56121 7.39204 7.81676 6.91227C8.07232 6.43249 8.2001 5.92238 8.2001 5.38193C8.2001 4.4966 7.88771 3.74193 7.26293 3.11793C6.63826 2.49393 5.88271 2.18193 4.99626 2.18193C4.10993 2.18193 3.35565 2.49393 2.73343 3.11793C2.11121 3.74193 1.8001 4.4966 1.8001 5.38193C1.8001 5.92238 1.92788 6.43249 2.18343 6.91227C2.43899 7.39204 2.79454 7.77638 3.2501 8.06527L3.8001 8.41527V10.1819ZM3.8001 13.7819C3.57343 13.7819 3.38343 13.7053 3.2301 13.5519C3.07676 13.3986 3.0001 13.2086 3.0001 12.9819V12.5819H7.0001V12.9819C7.0001 13.2086 6.92343 13.3986 6.7701 13.5519C6.61676 13.7053 6.42676 13.7819 6.2001 13.7819H3.8001Z",
                  fill: "#637381"
                }
              )
            }
          ) });
      }
    })() }),
    /* @__PURE__ */ p("span", { className: "chat-wrapper__reasoning-title", children: e }),
    (e.includes("Thinking") || e.includes("Processing")) && /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-arrow", children: /* @__PURE__ */ T(
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
    ) })
  ] });
}
function Xs({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-text", children: e }) });
}
function Js({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function Gs({
  title: e,
  status: n = "processing",
  toolData: t,
  toolName: r,
  clientTools: i
}) {
  console.log("clog toolData", t);
  const o = (() => {
    if (!r || !i) return null;
    const s = i.find((u) => u.name === r);
    return (s == null ? void 0 : s.description) || null;
  })();
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (n) {
      case "processing":
        return /* @__PURE__ */ T("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ T(
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ T(
            "svg",
            {
              width: "16",
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
          /* @__PURE__ */ p("span", { children: "Running..." })
        ] });
      case "completed":
        return /* @__PURE__ */ T("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ T(
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ T(
            "svg",
            {
              width: "16",
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
                    children: /* @__PURE__ */ p("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
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
        ] });
      case "error":
        return /* @__PURE__ */ T("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ p(
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
        return /* @__PURE__ */ T("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ T(
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
          /* @__PURE__ */ T("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ T(
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ T(
            "svg",
            {
              width: "16",
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
function Qs({ size: e = 16, variant: n = "dots" }) {
  return n === "dots" ? /* @__PURE__ */ T("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ p("span", {}),
    /* @__PURE__ */ p("span", {}),
    /* @__PURE__ */ p("span", {})
  ] }) : n === "pulse" ? /* @__PURE__ */ p(
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
class Ks {
  constructor() {
    ce(this, "sessionId", "");
    ce(this, "ws", null);
    ce(this, "isConnected", !1);
    ce(this, "onSetMessage");
    ce(this, "onSystemMessage");
    ce(this, "onBusinessDataUpdate");
    ce(this, "onReasoningUpdate");
    ce(this, "clientTools", {});
    ce(this, "toolSchemas", []);
    ce(this, "businessContext", {});
    ce(this, "reconnectAttempts", 0);
    ce(this, "reconnectTimer", null);
    this.sessionId = `business_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  async onInit(n) {
    return this.onSetMessage = n.onSetMessage, this.onSystemMessage = n.onSystemMessage, this.onBusinessDataUpdate = n.onBusinessDataUpdate, this.onReasoningUpdate = n.onReasoningUpdate, this.clientTools = n.clientTools || {}, this.toolSchemas = n.toolSchemas || [], this.businessContext = n.businessContext, new Promise((t, r) => {
      try {
        if (this.ws = new WebSocket("ws://localhost:3000/ws"), !this.ws) {
          r(new Error("WebSocket not initialized"));
          return;
        }
        this.ws.onopen = () => {
          this.isConnected = !0, this.reconnectAttempts = 0, console.log("WebSocket connected");
        }, this.ws.onerror = (i) => {
          if (console.error("WebSocket connection error:", i), i instanceof Event) {
            console.log("Falling back to demo mode..."), this.isConnected = !0, this.onSystemMessage && this.onSystemMessage(
              "⚠️ Using demo mode - WebSocket unavailable"
            ), t();
            return;
          }
          r(i);
        }, this.ws.onmessage = (i) => {
          const l = this.handleWebSocketMessage(i);
          l && l.type === "tools_configured" && (this.onSystemMessage && this.onSystemMessage("✅ Client tools configured successfully"), t()), l && l.type === "session_established" && (!this.toolSchemas || this.toolSchemas.length === 0) && t();
        }, this.ws.onclose = () => {
          this.isConnected = !1, console.log("WebSocket disconnected");
        };
      } catch {
        t();
      }
    });
  }
  handleWebSocketMessage(n) {
    var t, r, i, l, o;
    try {
      const a = JSON.parse(n.data);
      switch (a.type) {
        case "session_established":
          console.log("Session established:", a.sessionId), this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(
            JSON.stringify({
              type: "configure_tools",
              toolSchemas: this.toolSchemas,
              businessContext: this.businessContext
            })
          );
          break;
        case "tools_configured":
          console.log("Tools configured:", a), this.onSystemMessage && this.onSystemMessage("✅ Tools configured successfully");
          break;
        case "client_tools_updated":
          console.log("Client tools updated successfully:", a), this.onSystemMessage && this.onSystemMessage("✅ Client tools updated successfully");
          break;
        case "configure_tools":
          console.log("Configure tools request:", a), this.onSystemMessage && this.onSystemMessage("🔧 Server requested tool configuration");
          break;
        case "chat_event":
          if (a.event === "provider-event") {
            if (((t = a.data) == null ? void 0 : t.type) === "text-delta" && this.onSetMessage && a.data.textDelta)
              this.onSetMessage(a.data.textDelta);
            else if (((r = a.data) == null ? void 0 : r.type) === "tool-call") {
              const s = a.data;
              if (console.log("🔧 Server-side tool call detected:", s), this.onReasoningUpdate && s.toolName && s.toolCallId) {
                const u = {
                  toolName: s.toolName,
                  callId: s.toolCallId,
                  parameters: s.args || {}
                };
                this.onReasoningUpdate(!0, `🔧 Handling: ${s.toolName}`, u);
              }
            } else if (((i = a.data) == null ? void 0 : i.type) === "tool-result") {
              const s = a.data;
              if (console.log("✅ Server-side tool result detected:", s), this.onReasoningUpdate && s.toolCallId) {
                const u = {
                  toolName: s.toolName || "Unknown Tool",
                  callId: s.toolCallId,
                  parameters: {}
                };
                this.onReasoningUpdate(!1, `✅ Completed: ${s.toolName || "Unknown Tool"}`, u);
              }
            }
          } else if (a.event === "latitude-event" && (console.log("Latitude event:", (l = a.data) == null ? void 0 : l.type, a.data), ((o = a.data) == null ? void 0 : o.type) === "tool-result" && this.onReasoningUpdate)) {
            const s = a.data;
            if (s.toolCallId && s.toolName) {
              const u = {
                toolName: s.toolName,
                callId: s.toolCallId,
                parameters: {}
              };
              this.onReasoningUpdate(!1, `✅ Completed: ${s.toolName}`, u);
            }
          }
          a.event === "content-delta" && this.onSetMessage && a.data.delta && this.onSetMessage(a.data.delta);
          break;
        case "chat_finished":
          console.log("Chat finished:", a), this.onSystemMessage && this.onSystemMessage(`✅ Chat completed (${a.uuid})`);
          break;
        case "chat_error":
          console.error("Chat error:", a.error), this.onSystemMessage && this.onSystemMessage(`❌ Chat error: ${a.error}`);
          break;
        case "tool_call_request":
          console.log(">>>> tool_call_request:", a), this.handleToolCallRequest(a);
          break;
        case "business_data_update":
          console.log("Business data update:", a.data), this.onBusinessDataUpdate && this.onBusinessDataUpdate(a.data), this.onSystemMessage && this.onSystemMessage(
            `📊 Business data updated: ${JSON.stringify(a.data)}`
          );
          break;
        case "heartbeat_ping":
          this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(
            JSON.stringify({
              type: "heartbeat_pong",
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              originalTimestamp: a.timestamp,
              pingTime: a.pingTime
            })
          );
          break;
        case "heartbeat_ack":
          console.log("Heartbeat acknowledged");
          break;
        case "error":
          console.error("WebSocket error:", a.error), this.onSystemMessage && this.onSystemMessage(`❌ Error: ${a.error}`);
          break;
        default:
          console.log("Unknown WebSocket message:", a);
      }
      return a;
    } catch (a) {
      return console.error("Error parsing WebSocket message:", a), null;
    }
  }
  async handleToolCallRequest(n) {
    const { callId: t, toolName: r, parameters: i } = n;
    this.onReasoningUpdate && this.onReasoningUpdate(!0, `🔧 Handling: ${r}`, n);
    try {
      const l = this.clientTools[r];
      if (!l)
        throw new Error(`Tool not found: ${r}`);
      const o = await l(i);
      this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(
        JSON.stringify({
          type: "tool_call_response",
          callId: t,
          result: o
        })
      ), this.onReasoningUpdate && this.onReasoningUpdate(!1, `✅ Completed: ${r}`, n);
    } catch (l) {
      console.error("Error executing tool:", l), this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(
        JSON.stringify({
          type: "tool_call_response",
          callId: t,
          error: l instanceof Error ? l.message : "Unknown error"
        })
      ), this.onReasoningUpdate && this.onReasoningUpdate(
        !1,
        `❌ Error: ${r} - ${l}`,
        n
      );
    }
  }
  async onTriggerMessage(n, t = "shop") {
    if (!this.isConnected)
      throw new Error("Client not connected");
    if (!this.ws)
      throw new Error("WebSocket not available");
    try {
      this.ws.send(
        JSON.stringify({
          type: "chat_message",
          content: n,
          agentType: t
        })
      );
    } catch (r) {
      throw console.error("Error sending message:", r), this.onSystemMessage && this.onSystemMessage(`❌ Chat error: ${r}`), r;
    }
  }
  disconnect() {
    this.reconnectTimer && (window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null), this.ws && (this.ws.close(), this.ws = null), this.isConnected = !1;
  }
  getSessionId() {
    return this.sessionId;
  }
  isClientConnected() {
    return this.isConnected;
  }
  async getBusinessData() {
    try {
      const n = await fetch(
        `http://localhost:3007/session/${this.sessionId}/data`
      );
      if (n.ok)
        return await n.json();
    } catch (n) {
      console.error("Error fetching business data:", n);
    }
    return null;
  }
  // Method to update business context
  updateBusinessContext(n) {
    this.businessContext = { ...this.businessContext, ...n }, this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(
      JSON.stringify({
        type: "update_business_context",
        businessContext: this.businessContext
      })
    );
  }
  // Method to add new client tools
  addClientTools(n, t) {
    this.clientTools = { ...this.clientTools, ...n }, t && (this.toolSchemas = [...this.toolSchemas, ...t]), this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(
      JSON.stringify({
        type: "update_tools",
        toolSchemas: this.toolSchemas
      })
    );
  }
  // Get current connection status with more details
  getConnectionStatus() {
    return {
      connected: this.isConnected,
      sessionId: this.sessionId,
      reconnectAttempts: this.reconnectAttempts
    };
  }
}
const qr = nt(({
  message: e,
  getReasoningTitle: n,
  getReasoningStatus: t,
  getToolingTitle: r,
  getToolingStatus: i,
  clientTools: l,
  currentAssistantMessageIdRef: o
}) => {
  var a;
  return /* @__PURE__ */ p(
    "div",
    {
      className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
      children: e.role === "reasoning" ? (
        /* Reasoning message - no content wrapper */
        /* @__PURE__ */ T(Ws, { isStreaming: e.isStreaming || !1, children: [
          /* @__PURE__ */ p(
            Ys,
            {
              title: n(
                e.content,
                e.isStreaming
              ),
              status: t(
                e.content,
                e.isStreaming
              )
            }
          ),
          /* @__PURE__ */ p(Xs, { children: e.content })
        ] })
      ) : e.role === "tooling" ? (
        /* Tooling message - no content wrapper */
        /* @__PURE__ */ p(Js, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ p(
          Gs,
          {
            title: r(
              e.content,
              e.isStreaming
            ),
            status: i(
              e.content,
              e.isStreaming
            ),
            toolData: e.toolData,
            toolName: (a = e.toolData) == null ? void 0 : a.toolName,
            clientTools: l
          }
        ) })
      ) : /* @__PURE__ */ p("div", { className: "chat-wrapper__message-content", children: e.role === "assistant" && e.isStreaming && e.content === "" && e.id === o.current ? (
        /* Show streaming indicator when no content yet */
        /* @__PURE__ */ T("div", { className: "chat-wrapper__streaming-placeholder", children: [
          /* @__PURE__ */ p(Qs, { size: 16, variant: "dots" }),
          /* @__PURE__ */ p("span", { children: "Thinking" })
        ] })
      ) : e.role === "system" ? (
        /* System message with collapsible tool result */
        /* @__PURE__ */ p(e1, { message: e })
      ) : e.role === "assistant" ? (
        /* Assistant message with regular markdown display */
        /* @__PURE__ */ p("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
          Sn,
          {
            components: {
              pre: ({ children: s }) => /* @__PURE__ */ p("pre", { className: "chat-wrapper__code-block", children: s }),
              code: ({ children: s, className: u }) => !u ? /* @__PURE__ */ p("code", { className: "chat-wrapper__inline-code", children: s }) : /* @__PURE__ */ p("code", { className: "chat-wrapper__code-block", children: s }),
              ul: ({ children: s }) => /* @__PURE__ */ p("ul", { className: "chat-wrapper__list", children: s }),
              ol: ({ children: s }) => /* @__PURE__ */ p("ol", { className: "chat-wrapper__ordered-list", children: s }),
              li: ({ children: s }) => /* @__PURE__ */ p("li", { className: "chat-wrapper__list-item", children: s })
            },
            children: e.content
          }
        ) }) })
      ) : (
        /* User message display with markdown */
        /* @__PURE__ */ T("div", { className: "chat-wrapper__regular-message", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
            Sn,
            {
              components: {
                pre: ({ children: s }) => /* @__PURE__ */ p("pre", { className: "chat-wrapper__code-block", children: s }),
                code: ({ children: s, className: u }) => !u ? /* @__PURE__ */ p("code", { className: "chat-wrapper__inline-code", children: s }) : /* @__PURE__ */ p("code", { className: "chat-wrapper__code", children: s }),
                p: ({ children: s }) => /* @__PURE__ */ p("p", { className: "chat-wrapper__paragraph", children: s }),
                h1: ({ children: s }) => /* @__PURE__ */ p("h1", { className: "chat-wrapper__heading-1", children: s }),
                h2: ({ children: s }) => /* @__PURE__ */ p("h2", { className: "chat-wrapper__heading-2", children: s }),
                h3: ({ children: s }) => /* @__PURE__ */ p("h3", { className: "chat-wrapper__heading-3", children: s }),
                ul: ({ children: s }) => /* @__PURE__ */ p("ul", { className: "chat-wrapper__list", children: s }),
                ol: ({ children: s }) => /* @__PURE__ */ p("ol", { className: "chat-wrapper__ordered-list", children: s }),
                li: ({ children: s }) => /* @__PURE__ */ p("li", { className: "chat-wrapper__list-item", children: s }),
                blockquote: ({ children: s }) => /* @__PURE__ */ p("blockquote", { className: "chat-wrapper__blockquote", children: s }),
                strong: ({ children: s }) => /* @__PURE__ */ p("strong", { className: "chat-wrapper__bold", children: s }),
                em: ({ children: s }) => /* @__PURE__ */ p("em", { className: "chat-wrapper__italic", children: s })
              },
              children: e.content.trim()
            }
          ) }),
          e.role === "user" && e.media && e.media.length > 0 && /* @__PURE__ */ p("div", { className: "chat-wrapper__media-grid", children: e.media.map((s, u) => /* @__PURE__ */ p(
            "div",
            {
              className: "chat-wrapper__media-item",
              children: /* @__PURE__ */ p(
                "img",
                {
                  src: s,
                  alt: `Attached image ${u + 1}`,
                  className: "chat-wrapper__media-image"
                }
              )
            },
            u
          )) })
        ] })
      ) })
    }
  );
});
qr.displayName = "MessageComponent";
const Wr = nt(({
  content: e,
  messageId: n
}) => !n || !e ? null : /* @__PURE__ */ p("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__message-content", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
  Sn,
  {
    components: {
      pre: ({ children: t }) => /* @__PURE__ */ p("pre", { className: "chat-wrapper__code-block", children: t }),
      code: ({ children: t, className: r }) => !r ? /* @__PURE__ */ p("code", { className: "chat-wrapper__inline-code", children: t }) : /* @__PURE__ */ p("code", { className: "chat-wrapper__code-block", children: t }),
      ul: ({ children: t }) => /* @__PURE__ */ p("ul", { className: "chat-wrapper__list", children: t }),
      ol: ({ children: t }) => /* @__PURE__ */ p("ol", { className: "chat-wrapper__ordered-list", children: t }),
      li: ({ children: t }) => /* @__PURE__ */ p("li", { className: "chat-wrapper__list-item", children: t })
    },
    children: e
  }
) }) }) }) }));
Wr.displayName = "StreamingMessage";
function e1({ message: e }) {
  const [n, t] = Q(!0);
  return console.log("clog message:", e), /* @__PURE__ */ T("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ p(
      "button",
      {
        className: "chat-wrapper__system-message-trigger",
        onClick: () => t(!n),
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 0px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "14px",
          color: "#6b7280",
          textAlign: "left"
        },
        children: e.role === "system" ? /* @__PURE__ */ T("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ T(
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
          /* @__PURE__ */ T("span", { children: [
            "AI text input <show-toolname>",
            "..."
          ] }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ T(
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
          ) }) }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ T(
            "svg",
            {
              width: "16",
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
        ] }) : e.role === "assistant" ? e.isStreaming ? /* @__PURE__ */ T("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p(
            "svg",
            {
              width: "10",
              height: "14",
              viewBox: "0 0 10 14",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ p(
                "path",
                {
                  d: "M3.79576 11.3819C3.46532 11.3819 3.18343 11.2644 2.9501 11.0294C2.71676 10.7944 2.6001 10.5119 2.6001 10.1819V9.06527C1.96676 8.65082 1.4751 8.11943 1.1251 7.4711C0.775098 6.82277 0.600098 6.12638 0.600098 5.38193C0.600098 4.15627 1.02665 3.11649 1.87976 2.2626C2.73288 1.40882 3.77176 0.981934 4.99643 0.981934C6.2211 0.981934 7.26121 1.40882 8.11676 2.2626C8.97232 3.11649 9.4001 4.15627 9.4001 5.38193C9.4001 6.12438 9.2251 6.8211 8.8751 7.4721C8.5251 8.1231 8.03343 8.65416 7.4001 9.06527V10.1819C7.4001 10.5119 7.28243 10.7944 7.0471 11.0294C6.81188 11.2644 6.52904 11.3819 6.1986 11.3819H3.79576ZM3.8001 10.1819H6.2001V8.41527L6.7501 8.06527C7.20565 7.77638 7.56121 7.39204 7.81676 6.91227C8.07232 6.43249 8.2001 5.92238 8.2001 5.38193C8.2001 4.4966 7.88771 3.74193 7.26293 3.11793C6.63826 2.49393 5.88271 2.18193 4.99626 2.18193C4.10993 2.18193 3.35565 2.49393 2.73343 3.11793C2.11121 3.74193 1.8001 4.4966 1.8001 5.38193C1.8001 5.92238 1.92788 6.43249 2.18343 6.91227C2.43899 7.39204 2.79454 7.77638 3.2501 8.06527L3.8001 8.41527V10.1819ZM3.8001 13.7819C3.57343 13.7819 3.38343 13.7053 3.2301 13.5519C3.07676 13.3986 3.0001 13.2086 3.0001 12.9819V12.5819H7.0001V12.9819C7.0001 13.2086 6.92343 13.3986 6.7701 13.5519C6.61676 13.7053 6.42676 13.7819 6.2001 13.7819H3.8001Z",
                  fill: "#637381"
                }
              )
            }
          ) }),
          /* @__PURE__ */ p("span", { children: "Thinking..." }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ T(
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
          ) }) })
        ] }) : /* @__PURE__ */ T("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ p(
                "path",
                {
                  d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z",
                  fill: "#10b981"
                }
              )
            }
          ) }),
          /* @__PURE__ */ p("span", { children: "Thought" }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ T(
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
          ) }) })
        ] }) : "💬 Message"
      }
    ),
    n && /* @__PURE__ */ p(
      "div",
      {
        className: "chat-wrapper__system-message-content",
        style: {
          padding: "0 12px 12px 0px"
        },
        children: /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
          Sn,
          {
            components: {
              pre: ({ children: i }) => /* @__PURE__ */ p("pre", { className: "chat-wrapper__code-block", children: i }),
              code: ({ children: i, className: l }) => !l ? /* @__PURE__ */ p("code", { className: "chat-wrapper__inline-code", children: i }) : /* @__PURE__ */ p("code", { className: "chat-wrapper__code", children: i }),
              p: ({ children: i }) => /* @__PURE__ */ p("p", { className: "chat-wrapper__paragraph", children: i }),
              strong: ({ children: i }) => /* @__PURE__ */ p("strong", { className: "chat-wrapper__bold", children: i }),
              em: ({ children: i }) => /* @__PURE__ */ p("em", { className: "chat-wrapper__italic", children: i })
            },
            children: e.content.trim()
          }
        ) })
      }
    )
  ] });
}
function n1({
  apiUrl: e,
  config: n,
  tools: t,
  clientTools: r,
  initialMessages: i = []
}) {
  var Se;
  const [l, o] = Q(
    null
  ), [a, s] = Q(!1), [u, c] = Q(""), d = ze(null), [g, h] = Q(i), [w, x] = Q(!1), [E, k] = Q(!1), [P, v] = Q("idle"), [U, X] = Q(!1), [C, j] = Q(n.mode), [J] = Q([]), [F, V] = Q([]), [L, I] = Q(""), [q, Z] = Q(!1), [, B] = Q(""), [ie, G] = Q(""), [oe, Ce] = Q(!1), [, f] = Q(/* @__PURE__ */ new Map()), he = ze(null), ee = ze(null), m = ze(!0), ne = ze(""), ue = te(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), le = fn(
    () => (_, A) => A === !1 ? _.includes("❌") ? "error" : "completed" : _.includes("✅ Completed:") || _.includes("✅") ? "completed" : _.includes("❌") ? "error" : "processing",
    []
  ), Ne = fn(
    () => (_, A) => A === !1 ? _.includes("❌") ? "Error" : "Completed" : _.includes("✅ Completed:") || _.includes("✅") ? "Completed" : _.includes("❌") ? "Error" : (_.includes("🔧 Handling:"), "Thinking..."),
    []
  ), be = fn(
    () => (_, A) => A === !1 ? _.includes("❌") ? "Tool Error" : "Tool Completed" : _.includes("✅ Completed:") || _.includes("✅") ? "Tool Completed" : _.includes("❌") ? "Tool Error" : (_.includes("🔧 Handling:"), "Tool Processing..."),
    []
  ), Ie = fn(
    () => (_, A) => A === !1 ? _.includes("❌") ? "error" : "completed" : _.includes("✅ Completed:") || _.includes("✅") ? "completed" : _.includes("❌") ? "error" : "processing",
    []
  ), we = te(
    (_, A) => {
      h((R) => [
        ...R,
        {
          id: ue(),
          role: _,
          content: A,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [ue]
  ), Me = te(
    () => {
      if (x(!1), Z(!1), v("idle"), ee.current && ne.current) {
        const _ = {
          id: ee.current,
          role: "assistant",
          content: ne.current,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !1
        };
        h((A) => [...A, _]), ee.current = null, ne.current = "", G("");
      }
    },
    []
  ), rn = te(
    (_) => {
      console.error("Chat error:", _), x(!1), Z(!1), v("error"), ee.current = null, ne.current = "", G(""), we("system", `❌ Chat error: ${_}`);
    },
    [we]
  ), ln = te(async () => {
    try {
      const _ = new Ks();
      d.current = _, o(_), c(_.getSessionId());
      const A = {};
      await _.onInit({
        toolSchemas: r,
        clientTools: t,
        businessContext: A,
        onSetMessage: (R) => {
          if (ee.current)
            ne.current += R, G(ne.current);
          else {
            Z(!1);
            const N = ue();
            ee.current = N, ne.current = R, G(R);
          }
        },
        onSystemMessage: (R) => {
          if (R.includes("Chat completed"))
            Me();
          else if (R.includes("Chat error")) {
            const N = R.match(/Chat error: (.+)/);
            N && rn(N[1]);
          }
        },
        onReasoningUpdate: (R, N, ae) => {
          console.log("🤔 Reasoning update:", {
            isThinking: R,
            content: N,
            toolCallRequest: ae
          });
          const { callId: K } = ae || {};
          if (Ce(R), B(N), !K) {
            console.log("⚠️ No callId provided for reasoning update");
            return;
          }
          const Fe = N.includes("🔧 Handling:"), Mn = N.includes("✅ Completed:"), hn = N.includes("❌ Error:");
          console.log("🔍 Debug reasoning conditions:", {
            isToolStarted: Fe,
            isToolCompleted: Mn,
            isToolError: hn,
            callId: K,
            isHandlingTool: oe
          }), f((Yr) => {
            const pn = new Map(Yr), Ye = pn.get(K);
            if (Fe && !Ye) {
              const Ae = N.match(/🔧 Handling: (.+)/), Pe = Ae ? Ae[1] : "Unknown Tool", dn = ue();
              pn.set(K, dn);
              const Ue = {
                id: dn,
                role: "tooling",
                content: N,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0,
                toolData: {
                  ...ae,
                  toolName: Pe,
                  callId: K,
                  status: "processing"
                }
              };
              h((Xr) => [...Xr, Ue]);
            } else if ((Mn || hn) && Ye) {
              const Ae = N.match(
                /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
              ), Pe = Ae ? Ae[1] : "Unknown Tool";
              h(
                (dn) => dn.map(
                  (Ue) => Ue.id === Ye ? {
                    ...Ue,
                    content: N,
                    isStreaming: !1,
                    // Mark as completed
                    toolData: {
                      ...Ue.toolData,
                      toolName: Pe,
                      status: hn ? "error" : "completed",
                      callId: K ?? ""
                    }
                  } : Ue
                )
              ), pn.delete(K);
            } else Ye && oe && !Mn && !hn && h(
              (Ae) => Ae.map(
                (Pe) => Pe.id === Ye ? {
                  ...Pe,
                  content: N,
                  isStreaming: !0
                } : Pe
              )
            );
            return pn;
          });
        },
        onBusinessDataUpdate: (R) => {
          n.onBusinessDataUpdate && n.onBusinessDataUpdate(R);
        }
      }), s(!0), console.log("BusinessAgentClient connected");
    } catch (_) {
      console.error("Error connecting BusinessAgentClient:", _), s(!1);
    }
  }, [
    e,
    r,
    t,
    n,
    ue,
    we,
    Me,
    rn
  ]), on = te(() => {
    d.current && (d.current.disconnect(), d.current = null), o(null), s(!1), c("");
  }, []), qe = te(() => {
    console.log("🔍 DEBUG: resetToolHandling called! Stack trace:"), console.trace(), Ce(!1), m.current = !0;
  }, []), We = te(() => {
    var _;
    (_ = he.current) == null || _.scrollIntoView({ behavior: "smooth" });
  }, []);
  De(() => {
    We();
  }, [g, We]), De(() => {
    n.onStreamingStatusChange && n.onStreamingStatusChange(L);
  }, [L, n]), De(() => {
    console.log("🔍 DEBUG: isHandlingTool state changed:", oe);
  }, [oe]), De(() => {
    console.log(
      "💭 DEBUG: isHandlingReasoning state changed:"
    );
  }, []), De(() => (console.log("Connecting BusinessAgentClient..."), ln(), () => {
    on();
  }), [ln, on]), De(() => {
    const _ = setInterval(() => {
      if (d.current) {
        const A = d.current.getConnectionStatus();
        s(A.connected);
      }
    }, 1e3);
    return () => clearInterval(_);
  }, []);
  const an = te(
    async (_, A) => {
      if (!_.trim() || w || !l || !a)
        return;
      const R = {
        id: ue(),
        role: "user",
        content: _.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: A
      };
      h((N) => [...N, R]), x(!0), Z(!0), v("submitted"), I("Starting...");
      try {
        await l.onTriggerMessage(R.content), v("streaming");
      } catch (N) {
        console.error("Agent client send error:", N), Z(!1), v("error"), we(
          "system",
          `Sorry, there was an error: ${N instanceof Error ? N.message : "Unknown error"}`
        ), n.onError && n.onError(
          N instanceof Error ? N : new Error("Unknown error")
        ), x(!1), v("idle"), I("");
      }
    },
    [w, l, a, ue, we, n]
  ), Tn = te(() => {
    x(!1), v("idle"), I(""), Z(!1), B(""), ee.current = null, ne.current = "", G(""), qe();
  }, [qe]), sn = te(async (_) => {
    console.log("Files selected:", _);
    const A = [];
    for (const R of _)
      try {
        if (R.type.startsWith("image/")) {
          const N = new FileReader(), ae = await new Promise((K, Fe) => {
            N.onload = () => K(N.result), N.onerror = Fe, N.readAsDataURL(R);
          });
          A.push(ae);
        } else if (R.type.startsWith("text/") || R.name.endsWith(".txt")) {
          const N = new FileReader(), ae = await new Promise((K, Fe) => {
            N.onload = () => K(N.result), N.onerror = Fe, N.readAsText(R);
          });
          console.log("Text file content:", ae);
        } else
          console.log("File type not supported for preview:", R.type), A.push(`data:application/octet-stream;base64,${R.name}`);
      } catch (N) {
        console.error("Error processing file:", N);
      }
    A.length > 0 && (V((R) => [...R, ...A]), console.log("Added media:", A));
  }, []), un = te(() => {
    k(!0);
  }, []), Be = te(() => {
    k(!1);
  }, []), cn = te(() => {
    X((_) => !_);
  }, []), Ln = te(() => {
    j((_) => _ === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  De(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const _ = (A) => {
      A.key === "Escape" && C === "modal" && E && Be();
    };
    if (C === "modal" && E)
      return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [C, E, Be]);
  const Nn = ((..._) => _.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${C}`,
    n.position && `chat-wrapper--${n.position}`,
    n.theme && `chat-wrapper--${n.theme}`,
    U && "chat-wrapper--collapsed",
    C === "embedded" && n.constrainedHeight && "chat-wrapper--constrained"
  ), y = () => C === "modal" && E ? /* @__PURE__ */ p("div", { className: "chat-wrapper-overlay", onClick: Be }) : null, S = () => {
    var A;
    if (C === "modal" && !E || C === "sidebar" && U || C === "fullscreen" && U) {
      const R = C === "modal" ? un : cn, N = C === "modal" ? `Open ${n.appName}` : `Expand ${n.appName}`;
      return /* @__PURE__ */ T(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: R,
          title: N,
          children: [
            /* @__PURE__ */ T(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: "chat-wrapper__bubble-icon",
                children: [
                  /* @__PURE__ */ p(
                    "path",
                    {
                      d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
                      fill: "currentColor"
                    }
                  ),
                  /* @__PURE__ */ p("circle", { cx: "7", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ p("circle", { cx: "12", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ p("circle", { cx: "17", cy: "10", r: "1", fill: "currentColor" })
                ]
              }
            ),
            ((A = n.features) == null ? void 0 : A.showBubbleText) !== !1 && /* @__PURE__ */ p("span", { className: "chat-wrapper__bubble-text", children: n.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, D = () => C === "modal" && E ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: Be,
      title: "Close chat",
      children: /* @__PURE__ */ p(
        "svg",
        {
          width: "20",
          height: "20",
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
  ) : null, O = () => {
    if ((C === "sidebar" || C === "fullscreen") && !U) {
      const _ = C === "fullscreen";
      return /* @__PURE__ */ p(
        "button",
        {
          className: _ ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: Ln,
          title: _ ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ p(
            "svg",
            {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: _ ? (
                // Minimize icon (arrows pointing inward)
                /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M8 3v3a2 2 0 01-2 2H3M21 8h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3M16 21v-3a2 2 0 012-2h3",
                    stroke: "currentColor",
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
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              )
            }
          )
        }
      );
    }
    return null;
  }, $ = () => (C === "sidebar" || C === "fullscreen") && !U ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: cn,
      title: "Collapse chat",
      children: /* @__PURE__ */ p(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ p(
            "path",
            {
              d: "M18 12l-3 3-3-3m-6 3l-3 3-3-3",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        }
      )
    }
  ) : null, me = () => {
    var _;
    return !((_ = n.features) != null && _.showToolResults) || J.length === 0 ? null : /* @__PURE__ */ T("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ p("h4", { children: "Tool Results" }),
      /* @__PURE__ */ p("div", { className: "chat-wrapper__tool-results-list", children: J.map((A) => /* @__PURE__ */ T("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ p("div", { className: "chat-wrapper__tool-result-title", children: A.title }),
        A.description && /* @__PURE__ */ p("div", { className: "chat-wrapper__tool-result-description", children: A.description }),
        /* @__PURE__ */ T("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          A.status || "completed"
        ] })
      ] }, A.id)) })
    ] });
  };
  return C === "modal" && !E || (C === "sidebar" || C === "fullscreen") && U ? S() : (console.log("clog messages", g), /* @__PURE__ */ T(Vn, { children: [
    y(),
    /* @__PURE__ */ T("div", { className: Nn, style: n.customStyles, children: [
      /* @__PURE__ */ T("div", { className: "chat-wrapper__header", children: [
        /* @__PURE__ */ T("div", { className: "chat-wrapper__title-area", children: [
          /* @__PURE__ */ p("h2", { className: "chat-wrapper__title", children: n.appName }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__connection-status", children: /* @__PURE__ */ p(
            "span",
            {
              className: `chat-wrapper__connection-indicator ${a ? "connected" : "disconnected"}`,
              title: a ? `Connected to WebSocket${u ? ` (Session: ${u.slice(-8)})` : ""}` : "Disconnected from WebSocket",
              children: a ? "🟢" : "🔴"
            }
          ) })
        ] }),
        /* @__PURE__ */ T("div", { className: "chat-wrapper__header-controls", children: [
          O(),
          $(),
          D()
        ] })
      ] }),
      !U && /* @__PURE__ */ T(Vn, { children: [
        /* @__PURE__ */ T("div", { className: "chat-wrapper__messages", children: [
          g.map((_) => /* @__PURE__ */ p(
            qr,
            {
              message: _,
              getReasoningTitle: Ne,
              getReasoningStatus: le,
              getToolingTitle: be,
              getToolingStatus: Ie,
              clientTools: r || [],
              currentAssistantMessageIdRef: ee
            },
            _.id
          )),
          ee.current && ie && /* @__PURE__ */ p(
            Wr,
            {
              content: ie,
              messageId: ee.current
            }
          ),
          q && !oe && /* @__PURE__ */ p("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ T("div", { className: "chat-wrapper__thinking-dots", children: [
            /* @__PURE__ */ p("span", {}),
            /* @__PURE__ */ p("span", {}),
            /* @__PURE__ */ p("span", {})
          ] }) }) }) }),
          /* @__PURE__ */ p("div", { ref: he })
        ] }),
        me(),
        F.length > 0 && /* @__PURE__ */ T(
          "div",
          {
            style: {
              padding: "12px 16px",
              borderTop: "1px solid #e2e8f0",
              backgroundColor: "#f8fafc",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ T(
                "span",
                {
                  style: {
                    fontSize: "12px",
                    color: "#6b7280",
                    fontWeight: "500"
                  },
                  children: [
                    F.length,
                    " file",
                    F.length > 1 ? "s" : "",
                    " attached:"
                  ]
                }
              ),
              F.map((_, A) => /* @__PURE__ */ T(
                "div",
                {
                  style: {
                    position: "relative",
                    display: "inline-block"
                  },
                  children: [
                    _.startsWith("data:image/") ? /* @__PURE__ */ p(
                      "img",
                      {
                        src: _,
                        alt: `Attachment ${A + 1}`,
                        style: {
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          border: "1px solid #e2e8f0"
                        }
                      }
                    ) : /* @__PURE__ */ p(
                      "div",
                      {
                        style: {
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#e2e8f0",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          color: "#6b7280"
                        },
                        children: "📎"
                      }
                    ),
                    /* @__PURE__ */ p(
                      "button",
                      {
                        onClick: () => {
                          V(
                            (R) => R.filter((N, ae) => ae !== A)
                          );
                        },
                        style: {
                          position: "absolute",
                          top: "-4px",
                          right: "-4px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          backgroundColor: "#ef4444",
                          color: "white",
                          border: "none",
                          fontSize: "10px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        },
                        title: "Remove attachment",
                        children: "×"
                      }
                    )
                  ]
                },
                A
              ))
            ]
          }
        ),
        /* @__PURE__ */ p(
          qs,
          {
            placeholder: n.placeholder,
            disabled: w,
            chatStatus: P,
            uploadedMedia: F,
            fileUploadEnabled: (Se = n.features) == null ? void 0 : Se.fileUpload,
            onSubmit: (_, A) => an(_, A),
            onFileUpload: sn,
            onClearMedia: () => V([]),
            onStopGeneration: Tn
          }
        )
      ] }),
      n.onError && /* @__PURE__ */ p("div", { className: "chat-wrapper__error-boundary" })
    ] })
  ] }));
}
const h1 = nt(n1);
class t1 {
  constructor(n, t) {
    ce(this, "baseUrl");
    ce(this, "apiKey");
    this.baseUrl = n, this.apiKey = t;
  }
  getHeaders() {
    const n = {
      "Content-Type": "application/json"
    };
    return this.apiKey && (n.Authorization = `Bearer ${this.apiKey}`), n;
  }
  async initConversation() {
    const n = await fetch(`${this.baseUrl}/api/conversation/init`, {
      method: "POST",
      headers: this.getHeaders()
    });
    if (!n.ok) throw new Error("Failed to initialize conversation");
    return (await n.json()).conversationId;
  }
  async *streamMessage(n, t) {
    const r = await fetch(
      `${this.baseUrl}/api/conversation/${n}`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ message: t })
      }
    );
    if (!r.ok) throw new Error("Failed to send message");
    if (!r.body) throw new Error("No response body");
    const i = r.body.getReader(), l = new TextDecoder();
    for (; ; ) {
      const { done: o, value: a } = await i.read();
      if (o) break;
      const u = l.decode(a).split(`
`);
      for (const c of u)
        if (c.startsWith("data: ")) {
          const d = c.slice(6);
          if (d === "[DONE]") return;
          try {
            yield JSON.parse(d).content || "";
          } catch (g) {
            console.error("Failed to parse chunk:", g);
          }
        }
    }
  }
}
function p1(e, n) {
  const [t, r] = Q([]), [i, l] = Q(!1), [o, a] = Q(null), s = ze(null), u = ze(new t1(e, n)), c = te(async () => {
    try {
      const h = await u.current.initConversation();
      return s.current = h, h;
    } catch (h) {
      throw a(h), h;
    }
  }, []), d = te(
    async (h) => {
      s.current || await c();
      const w = {
        id: Date.now().toString(),
        role: "user",
        content: h,
        timestamp: /* @__PURE__ */ new Date()
      };
      r((E) => [...E, w]), l(!0), a(null);
      const x = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      r((E) => [...E, x]);
      try {
        const E = u.current.streamMessage(
          s.current,
          h
        );
        for await (const k of E)
          r(
            (P) => P.map(
              (v) => v.id === x.id ? { ...v, content: v.content + k } : v
            )
          );
        r(
          (k) => k.map(
            (P) => P.id === x.id ? { ...P, isStreaming: !1 } : P
          )
        );
      } catch (E) {
        a(E), r((k) => k.filter((P) => P.id !== x.id));
      } finally {
        l(!1);
      }
    },
    [c]
  ), g = te(() => {
    r([]), s.current = null;
  }, []);
  return {
    messages: t,
    isLoading: i,
    error: o,
    sendMessage: d,
    clearMessages: g
  };
}
export {
  h1 as ChatWrapper,
  Qs as Loader,
  Hs as PromptInput,
  $s as PromptInputButton,
  o1 as PromptInputModelSelect,
  s1 as PromptInputModelSelectContent,
  u1 as PromptInputModelSelectItem,
  a1 as PromptInputModelSelectTrigger,
  c1 as PromptInputModelSelectValue,
  Zs as PromptInputSubmit,
  Zr as PromptInputTextarea,
  js as PromptInputToolbar,
  Vs as PromptInputTools,
  Ws as Reasoning,
  Xs as ReasoningContent,
  Ys as ReasoningTrigger,
  p1 as useChatConnection
};
