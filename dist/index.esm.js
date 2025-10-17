var Wr = Object.defineProperty;
var qr = (e, t, n) => t in e ? Wr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var se = (e, t, n) => qr(e, typeof t != "symbol" ? t + "" : t, n);
import { jsxs as A, jsx as d, Fragment as Ut } from "react/jsx-runtime";
import Yr, { forwardRef as Xr, memo as Jr, useState as te, useRef as He, useCallback as ee, useEffect as De } from "react";
function Gr(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Qr = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Kr = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ei = {};
function gn(e, t) {
  return (ei.jsx ? Kr : Qr).test(e);
}
const ti = /[ \t\n\f\r]/g;
function ni(e) {
  return typeof e == "object" ? e.type === "text" ? yn(e.value) : !1 : yn(e);
}
function yn(e) {
  return e.replace(ti, "") === "";
}
class nt {
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
nt.prototype.normal = {};
nt.prototype.property = {};
nt.prototype.space = void 0;
function or(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new nt(n, r, t);
}
function Ht(e) {
  return e.toLowerCase();
}
class pe {
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
pe.prototype.attribute = "";
pe.prototype.booleanish = !1;
pe.prototype.boolean = !1;
pe.prototype.commaOrSpaceSeparated = !1;
pe.prototype.commaSeparated = !1;
pe.prototype.defined = !1;
pe.prototype.mustUseProperty = !1;
pe.prototype.number = !1;
pe.prototype.overloadedBoolean = !1;
pe.prototype.property = "";
pe.prototype.spaceSeparated = !1;
pe.prototype.space = void 0;
let ri = 0;
const R = Oe(), re = Oe(), jt = Oe(), S = Oe(), Y = Oe(), je = Oe(), ge = Oe();
function Oe() {
  return 2 ** ++ri;
}
const Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: R,
  booleanish: re,
  commaOrSpaceSeparated: ge,
  commaSeparated: je,
  number: S,
  overloadedBoolean: jt,
  spaceSeparated: Y
}, Symbol.toStringTag, { value: "Module" })), Lt = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Vt)
);
class Kt extends pe {
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
    let l = -1;
    if (super(t, n), Cn(this, "space", i), typeof r == "number")
      for (; ++l < Lt.length; ) {
        const o = Lt[l];
        Cn(this, Lt[l], (r & Vt[o]) === Vt[o]);
      }
  }
}
Kt.prototype.defined = !0;
function Cn(e, t, n) {
  n && (e[t] = n);
}
function $e(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const l = new Kt(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (l.mustUseProperty = !0), t[r] = l, n[Ht(r)] = r, n[Ht(l.attribute)] = r;
  }
  return new nt(t, n, e.space);
}
const ar = $e({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: re,
    ariaAutoComplete: null,
    ariaBusy: re,
    ariaChecked: re,
    ariaColCount: S,
    ariaColIndex: S,
    ariaColSpan: S,
    ariaControls: Y,
    ariaCurrent: null,
    ariaDescribedBy: Y,
    ariaDetails: null,
    ariaDisabled: re,
    ariaDropEffect: Y,
    ariaErrorMessage: null,
    ariaExpanded: re,
    ariaFlowTo: Y,
    ariaGrabbed: re,
    ariaHasPopup: null,
    ariaHidden: re,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: Y,
    ariaLevel: S,
    ariaLive: null,
    ariaModal: re,
    ariaMultiLine: re,
    ariaMultiSelectable: re,
    ariaOrientation: null,
    ariaOwns: Y,
    ariaPlaceholder: null,
    ariaPosInSet: S,
    ariaPressed: re,
    ariaReadOnly: re,
    ariaRelevant: null,
    ariaRequired: re,
    ariaRoleDescription: Y,
    ariaRowCount: S,
    ariaRowIndex: S,
    ariaRowSpan: S,
    ariaSelected: re,
    ariaSetSize: S,
    ariaSort: null,
    ariaValueMax: S,
    ariaValueMin: S,
    ariaValueNow: S,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function sr(e, t) {
  return t in e ? e[t] : t;
}
function ur(e, t) {
  return sr(e, t.toLowerCase());
}
const ii = $e({
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
    acceptCharset: Y,
    accessKey: Y,
    action: null,
    allow: null,
    allowFullScreen: R,
    allowPaymentRequest: R,
    allowUserMedia: R,
    alt: null,
    as: null,
    async: R,
    autoCapitalize: null,
    autoComplete: Y,
    autoFocus: R,
    autoPlay: R,
    blocking: Y,
    capture: null,
    charSet: null,
    checked: R,
    cite: null,
    className: Y,
    cols: S,
    colSpan: null,
    content: null,
    contentEditable: re,
    controls: R,
    controlsList: Y,
    coords: S | je,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: R,
    defer: R,
    dir: null,
    dirName: null,
    disabled: R,
    download: jt,
    draggable: re,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: R,
    formTarget: null,
    headers: Y,
    height: S,
    hidden: jt,
    high: S,
    href: null,
    hrefLang: null,
    htmlFor: Y,
    httpEquiv: Y,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: R,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: R,
    itemId: null,
    itemProp: Y,
    itemRef: Y,
    itemScope: R,
    itemType: Y,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: R,
    low: S,
    manifest: null,
    max: null,
    maxLength: S,
    media: null,
    method: null,
    min: null,
    minLength: S,
    multiple: R,
    muted: R,
    name: null,
    nonce: null,
    noModule: R,
    noValidate: R,
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
    open: R,
    optimum: S,
    pattern: null,
    ping: Y,
    placeholder: null,
    playsInline: R,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: R,
    referrerPolicy: null,
    rel: Y,
    required: R,
    reversed: R,
    rows: S,
    rowSpan: S,
    sandbox: Y,
    scope: null,
    scoped: R,
    seamless: R,
    selected: R,
    shadowRootClonable: R,
    shadowRootDelegatesFocus: R,
    shadowRootMode: null,
    shape: null,
    size: S,
    sizes: null,
    slot: null,
    span: S,
    spellCheck: re,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: S,
    step: null,
    style: null,
    tabIndex: S,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: R,
    useMap: null,
    value: re,
    width: S,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: Y,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: S,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: S,
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
    compact: R,
    // Lists. Use CSS to reduce space between items instead
    declare: R,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: S,
    // `<img>` and `<object>`
    leftMargin: S,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: S,
    // `<body>`
    marginWidth: S,
    // `<body>`
    noResize: R,
    // `<frame>`
    noHref: R,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: R,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: R,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: S,
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
    topMargin: S,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: S,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: R,
    disableRemotePlayback: R,
    prefix: null,
    property: null,
    results: S,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: ur
}), li = $e({
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
    accentHeight: S,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: S,
    amplitude: S,
    arabicForm: null,
    ascent: S,
    attributeName: null,
    attributeType: null,
    azimuth: S,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: S,
    by: null,
    calcMode: null,
    capHeight: S,
    className: Y,
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
    descent: S,
    diffuseConstant: S,
    direction: null,
    display: null,
    dur: null,
    divisor: S,
    dominantBaseline: null,
    download: R,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: S,
    enableBackground: null,
    end: null,
    event: null,
    exponent: S,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: S,
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
    hanging: S,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: S,
    horizOriginX: S,
    horizOriginY: S,
    id: null,
    ideographic: S,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: S,
    k: S,
    k1: S,
    k2: S,
    k3: S,
    k4: S,
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
    limitingConeAngle: S,
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
    mediaSize: S,
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
    overlinePosition: S,
    overlineThickness: S,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: S,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: Y,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: S,
    pointsAtY: S,
    pointsAtZ: S,
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
    specularConstant: S,
    specularExponent: S,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: S,
    strikethroughThickness: S,
    string: null,
    stroke: null,
    strokeDashArray: ge,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: S,
    strokeOpacity: S,
    strokeWidth: null,
    style: null,
    surfaceScale: S,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: ge,
    tabIndex: S,
    tableValues: null,
    target: null,
    targetX: S,
    targetY: S,
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
    underlinePosition: S,
    underlineThickness: S,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: S,
    values: null,
    vAlphabetic: S,
    vMathematical: S,
    vectorEffect: null,
    vHanging: S,
    vIdeographic: S,
    version: null,
    vertAdvY: S,
    vertOriginX: S,
    vertOriginY: S,
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
    xHeight: S,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: sr
}), cr = $e({
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
}), hr = $e({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: ur
}), pr = $e({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), oi = {
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
}, ai = /[A-Z]/g, wn = /-[a-z]/g, si = /^data[-\w.:]+$/i;
function ui(e, t) {
  const n = Ht(t);
  let r = t, i = pe;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && si.test(t)) {
    if (t.charAt(4) === "-") {
      const l = t.slice(5).replace(wn, hi);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = t.slice(4);
      if (!wn.test(l)) {
        let o = l.replace(ai, ci);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    i = Kt;
  }
  return new i(r, t);
}
function ci(e) {
  return "-" + e.toLowerCase();
}
function hi(e) {
  return e.charAt(1).toUpperCase();
}
const pi = or([ar, ii, cr, hr, pr], "html"), en = or([ar, li, cr, hr, pr], "svg");
function di(e) {
  return e.join(" ").trim();
}
var Ct = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function dr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var tn = {}, xn = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, fi = /\n/g, mi = /^\s*/, gi = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, yi = /^:\s*/, Ci = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, wi = /^[;\s]*/, xi = /^\s+|\s+$/g, ki = `
`, kn = "/", bn = "*", ze = "", bi = "comment", Si = "declaration", _i = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(w) {
    var k = w.match(fi);
    k && (n += k.length);
    var L = w.lastIndexOf(ki);
    r = ~L ? w.length - L : r + w.length;
  }
  function l() {
    var w = { line: n, column: r };
    return function(k) {
      return k.position = new o(w), u(), k;
    };
  }
  function o(w) {
    this.start = w, this.end = { line: n, column: r }, this.source = t.source;
  }
  o.prototype.content = e;
  function a(w) {
    var k = new Error(
      t.source + ":" + n + ":" + r + ": " + w
    );
    if (k.reason = w, k.filename = t.source, k.line = n, k.column = r, k.source = e, !t.silent) throw k;
  }
  function s(w) {
    var k = w.exec(e);
    if (k) {
      var L = k[0];
      return i(L), e = e.slice(L.length), k;
    }
  }
  function u() {
    s(mi);
  }
  function c(w) {
    var k;
    for (w = w || []; k = p(); )
      k !== !1 && w.push(k);
    return w;
  }
  function p() {
    var w = l();
    if (!(kn != e.charAt(0) || bn != e.charAt(1))) {
      for (var k = 2; ze != e.charAt(k) && (bn != e.charAt(k) || kn != e.charAt(k + 1)); )
        ++k;
      if (k += 2, ze === e.charAt(k - 1))
        return a("End of comment missing");
      var L = e.slice(2, k - 2);
      return r += 2, i(L), e = e.slice(k), r += 2, w({
        type: bi,
        comment: L
      });
    }
  }
  function g() {
    var w = l(), k = s(gi);
    if (k) {
      if (p(), !s(yi)) return a("property missing ':'");
      var L = s(Ci), b = w({
        type: Si,
        property: Sn(k[0].replace(xn, ze)),
        value: L ? Sn(L[0].replace(xn, ze)) : ze
      });
      return s(wi), b;
    }
  }
  function h() {
    var w = [];
    c(w);
    for (var k; k = g(); )
      k !== !1 && (w.push(k), c(w));
    return w;
  }
  return u(), h();
};
function Sn(e) {
  return e ? e.replace(xi, ze) : ze;
}
var vi = Ct && Ct.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(tn, "__esModule", { value: !0 });
tn.default = Ii;
var Ei = vi(_i);
function Ii(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, Ei.default)(e), i = typeof t == "function";
  return r.forEach(function(l) {
    if (l.type === "declaration") {
      var o = l.property, a = l.value;
      i ? t(o, a, l) : a && (n = n || {}, n[o] = a);
    }
  }), n;
}
var kt = {};
Object.defineProperty(kt, "__esModule", { value: !0 });
kt.camelCase = void 0;
var Ti = /^--[a-zA-Z0-9_-]+$/, Li = /-([a-z])/g, Ni = /^[^-]+$/, Mi = /^-(webkit|moz|ms|o|khtml)-/, Ai = /^-(ms)-/, Pi = function(e) {
  return !e || Ni.test(e) || Ti.test(e);
}, Di = function(e, t) {
  return t.toUpperCase();
}, _n = function(e, t) {
  return "".concat(t, "-");
}, zi = function(e, t) {
  return t === void 0 && (t = {}), Pi(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Ai, _n) : e = e.replace(Mi, _n), e.replace(Li, Di));
};
kt.camelCase = zi;
var Oi = Ct && Ct.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, Ri = Oi(tn), Bi = kt;
function $t(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, Ri.default)(e, function(r, i) {
    r && i && (n[(0, Bi.camelCase)(r, t)] = i);
  }), n;
}
$t.default = $t;
var Fi = $t;
const Ui = /* @__PURE__ */ dr(Fi), fr = mr("end"), nn = mr("start");
function mr(e) {
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
function Hi(e) {
  const t = nn(e), n = fr(e);
  if (t && n)
    return { start: t, end: n };
}
function Qe(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? vn(e.position) : "start" in e || "end" in e ? vn(e) : "line" in e || "column" in e ? Zt(e) : "";
}
function Zt(e) {
  return En(e && e.line) + ":" + En(e && e.column);
}
function vn(e) {
  return Zt(e && e.start) + "-" + Zt(e && e.end);
}
function En(e) {
  return e && typeof e == "number" ? e : 1;
}
class ae extends Error {
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
    let i = "", l = {}, o = !1;
    if (n && ("line" in n && "column" in n ? l = { place: n } : "start" in n && "end" in n ? l = { place: n } : "type" in n ? l = {
      ancestors: [n],
      place: n.position
    } : l = { ...n }), typeof t == "string" ? i = t : !l.cause && t && (o = !0, i = t.message, l.cause = t), !l.ruleId && !l.source && typeof r == "string") {
      const s = r.indexOf(":");
      s === -1 ? l.ruleId = r : (l.source = r.slice(0, s), l.ruleId = r.slice(s + 1));
    }
    if (!l.place && l.ancestors && l.ancestors) {
      const s = l.ancestors[l.ancestors.length - 1];
      s && (l.place = s.position);
    }
    const a = l.place && "start" in l.place ? l.place.start : l.place;
    this.ancestors = l.ancestors || void 0, this.cause = l.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = Qe(l.place) || "1:1", this.place = l.place || void 0, this.reason = this.message, this.ruleId = l.ruleId || void 0, this.source = l.source || void 0, this.stack = o && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
ae.prototype.file = "";
ae.prototype.name = "";
ae.prototype.reason = "";
ae.prototype.message = "";
ae.prototype.stack = "";
ae.prototype.column = void 0;
ae.prototype.line = void 0;
ae.prototype.ancestors = void 0;
ae.prototype.cause = void 0;
ae.prototype.fatal = void 0;
ae.prototype.place = void 0;
ae.prototype.ruleId = void 0;
ae.prototype.source = void 0;
const rn = {}.hasOwnProperty, ji = /* @__PURE__ */ new Map(), Vi = /[A-Z]/g, $i = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Zi = /* @__PURE__ */ new Set(["td", "th"]), gr = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Wi(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = el(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Ki(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? en : pi,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, l = yr(i, e, void 0);
  return l && typeof l != "string" ? l : i.create(
    e,
    i.Fragment,
    { children: l || void 0 },
    void 0
  );
}
function yr(e, t, n) {
  if (t.type === "element")
    return qi(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return Yi(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return Ji(e, t, n);
  if (t.type === "mdxjsEsm")
    return Xi(e, t);
  if (t.type === "root")
    return Gi(e, t, n);
  if (t.type === "text")
    return Qi(e, t);
}
function qi(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = en, e.schema = i), e.ancestors.push(t);
  const l = wr(e, t.tagName, !1), o = tl(e, t);
  let a = on(e, t);
  return $i.has(t.tagName) && (a = a.filter(function(s) {
    return typeof s == "string" ? !ni(s) : !0;
  })), Cr(e, o, l, t), ln(o, a), e.ancestors.pop(), e.schema = r, e.create(t, l, o, n);
}
function Yi(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  tt(e, t.position);
}
function Xi(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  tt(e, t.position);
}
function Ji(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = en, e.schema = i), e.ancestors.push(t);
  const l = t.name === null ? e.Fragment : wr(e, t.name, !0), o = nl(e, t), a = on(e, t);
  return Cr(e, o, l, t), ln(o, a), e.ancestors.pop(), e.schema = r, e.create(t, l, o, n);
}
function Gi(e, t, n) {
  const r = {};
  return ln(r, on(e, t)), e.create(t, e.Fragment, r, n);
}
function Qi(e, t) {
  return t.value;
}
function Cr(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function ln(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function Ki(e, t, n) {
  return r;
  function r(i, l, o, a) {
    const u = Array.isArray(o.children) ? n : t;
    return a ? u(l, o, a) : u(l, o);
  }
}
function el(e, t) {
  return n;
  function n(r, i, l, o) {
    const a = Array.isArray(l.children), s = nn(r);
    return t(
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
function tl(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && rn.call(t.properties, i)) {
      const l = rl(e, i, t.properties[i]);
      if (l) {
        const [o, a] = l;
        e.tableCellAlignToStyle && o === "align" && typeof a == "string" && Zi.has(t.tagName) ? r = a : n[o] = a;
      }
    }
  if (r) {
    const l = (
      /** @type {Style} */
      n.style || (n.style = {})
    );
    l[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function nl(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const l = r.data.estree.body[0];
        l.type;
        const o = l.expression;
        o.type;
        const a = o.properties[0];
        a.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        tt(e, t.position);
    else {
      const i = r.name;
      let l;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, l = e.evaluater.evaluateExpression(a.expression);
        } else
          tt(e, t.position);
      else
        l = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      l;
    }
  return n;
}
function on(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : ji;
  for (; ++r < t.children.length; ) {
    const l = t.children[r];
    let o;
    if (e.passKeys) {
      const s = l.type === "element" ? l.tagName : l.type === "mdxJsxFlowElement" || l.type === "mdxJsxTextElement" ? l.name : void 0;
      if (s) {
        const u = i.get(s) || 0;
        o = s + "-" + u, i.set(s, u + 1);
      }
    }
    const a = yr(e, l, o);
    a !== void 0 && n.push(a);
  }
  return n;
}
function rl(e, t, n) {
  const r = ui(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Gr(n) : di(n)), r.property === "style") {
      let i = typeof n == "object" ? n : il(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = ll(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? oi[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function il(e, t) {
  try {
    return Ui(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new ae("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = gr + "#cannot-parse-style-attribute", i;
  }
}
function wr(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let l = -1, o;
    for (; ++l < i.length; ) {
      const a = gn(i[l]) ? { type: "Identifier", name: i[l] } : { type: "Literal", value: i[l] };
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
    r = gn(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return rn.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  tt(e);
}
function tt(e, t) {
  const n = new ae(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = gr + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function ll(e) {
  const t = {};
  let n;
  for (n in e)
    rn.call(e, n) && (t[ol(n)] = e[n]);
  return t;
}
function ol(e) {
  let t = e.replace(Vi, al);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function al(e) {
  return "-" + e.toLowerCase();
}
const Nt = {
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
}, sl = {};
function ul(e, t) {
  const n = sl, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return xr(e, r, i);
}
function xr(e, t, n) {
  if (cl(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return In(e.children, t, n);
  }
  return Array.isArray(e) ? In(e, t, n) : "";
}
function In(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = xr(e[i], t, n);
  return r.join("");
}
function cl(e) {
  return !!(e && typeof e == "object");
}
const Tn = document.createElement("i");
function an(e) {
  const t = "&" + e + ";";
  Tn.innerHTML = t;
  const n = Tn.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function ve(e, t, n, r) {
  const i = e.length;
  let l = 0, o;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(t, n), e.splice(...o);
  else
    for (n && e.splice(t, n); l < r.length; )
      o = r.slice(l, l + 1e4), o.unshift(t, 0), e.splice(...o), l += 1e4, t += 1e4;
}
function we(e, t) {
  return e.length > 0 ? (ve(e, e.length, 0, t), e) : t;
}
const Ln = {}.hasOwnProperty;
function hl(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    pl(t, e[n]);
  return t;
}
function pl(e, t) {
  let n;
  for (n in t) {
    const i = (Ln.call(e, n) ? e[n] : void 0) || (e[n] = {}), l = t[n];
    let o;
    if (l)
      for (o in l) {
        Ln.call(i, o) || (i[o] = []);
        const a = l[o];
        dl(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function dl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  ve(e, 0, 0, r);
}
function kr(e, t) {
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
function Ve(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const _e = Le(/[A-Za-z]/), ye = Le(/[\dA-Za-z]/), fl = Le(/[#-'*+\--9=?A-Z^-~]/);
function Wt(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const qt = Le(/\d/), ml = Le(/[\dA-Fa-f]/), gl = Le(/[!-/:-@[-`{-~]/);
function D(e) {
  return e !== null && e < -2;
}
function he(e) {
  return e !== null && (e < 0 || e === 32);
}
function H(e) {
  return e === -2 || e === -1 || e === 32;
}
const yl = Le(new RegExp("\\p{P}|\\p{S}", "u")), Cl = Le(/\s/);
function Le(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Ze(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const l = e.charCodeAt(n);
    let o = "";
    if (l === 37 && ye(e.charCodeAt(n + 1)) && ye(e.charCodeAt(n + 2)))
      i = 2;
    else if (l < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l)) || (o = String.fromCharCode(l));
    else if (l > 55295 && l < 57344) {
      const a = e.charCodeAt(n + 1);
      l < 56320 && a > 56319 && a < 57344 ? (o = String.fromCharCode(l, a), i = 1) : o = "�";
    } else
      o = String.fromCharCode(l);
    o && (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, o = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function X(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let l = 0;
  return o;
  function o(s) {
    return H(s) ? (e.enter(n), a(s)) : t(s);
  }
  function a(s) {
    return H(s) && l++ < i ? (e.consume(s), a) : (e.exit(n), t(s));
  }
}
const wl = {
  tokenize: xl
};
function xl(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), X(e, t, "linePrefix");
  }
  function i(a) {
    return e.enter("paragraph"), l(a);
  }
  function l(a) {
    const s = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = s), n = s, o(a);
  }
  function o(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return D(a) ? (e.consume(a), e.exit("chunkText"), l) : (e.consume(a), o);
  }
}
const kl = {
  tokenize: bl
}, Nn = {
  tokenize: Sl
};
function bl(e) {
  const t = this, n = [];
  let r = 0, i, l, o;
  return a;
  function a(I) {
    if (r < n.length) {
      const j = n[r];
      return t.containerState = j[1], e.attempt(j[0].continuation, s, u)(I);
    }
    return u(I);
  }
  function s(I) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && P();
      const j = t.events.length;
      let U = j, x;
      for (; U--; )
        if (t.events[U][0] === "exit" && t.events[U][1].type === "chunkFlow") {
          x = t.events[U][1].end;
          break;
        }
      b(r);
      let V = j;
      for (; V < t.events.length; )
        t.events[V][1].end = {
          ...x
        }, V++;
      return ve(t.events, U + 1, 0, t.events.slice(j)), t.events.length = V, u(I);
    }
    return a(I);
  }
  function u(I) {
    if (r === n.length) {
      if (!i)
        return g(I);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return w(I);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(Nn, c, p)(I);
  }
  function c(I) {
    return i && P(), b(r), g(I);
  }
  function p(I) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, w(I);
  }
  function g(I) {
    return t.containerState = {}, e.attempt(Nn, h, w)(I);
  }
  function h(I) {
    return r++, n.push([t.currentConstruct, t.containerState]), g(I);
  }
  function w(I) {
    if (I === null) {
      i && P(), b(0), e.consume(I);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: l
    }), k(I);
  }
  function k(I) {
    if (I === null) {
      L(e.exit("chunkFlow"), !0), b(0), e.consume(I);
      return;
    }
    return D(I) ? (e.consume(I), L(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, a) : (e.consume(I), k);
  }
  function L(I, j) {
    const U = t.sliceStream(I);
    if (j && U.push(null), I.previous = l, l && (l.next = I), l = I, i.defineSkip(I.start), i.write(U), t.parser.lazy[I.start.line]) {
      let x = i.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          i.events[x][1].start.offset < o && // …and either is not ended yet…
          (!i.events[x][1].end || // …or ends after it.
          i.events[x][1].end.offset > o)
        )
          return;
      const V = t.events.length;
      let O = V, $, W;
      for (; O--; )
        if (t.events[O][0] === "exit" && t.events[O][1].type === "chunkFlow") {
          if ($) {
            W = t.events[O][1].end;
            break;
          }
          $ = !0;
        }
      for (b(r), x = V; x < t.events.length; )
        t.events[x][1].end = {
          ...W
        }, x++;
      ve(t.events, O + 1, 0, t.events.slice(V)), t.events.length = x;
    }
  }
  function b(I) {
    let j = n.length;
    for (; j-- > I; ) {
      const U = n[j];
      t.containerState = U[1], U[0].exit.call(t, e);
    }
    n.length = I;
  }
  function P() {
    i.write([null]), l = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Sl(e, t, n) {
  return X(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Mn(e) {
  if (e === null || he(e) || Cl(e))
    return 1;
  if (yl(e))
    return 2;
}
function sn(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll;
    l && !r.includes(l) && (t = l(t, n), r.push(l));
  }
  return t;
}
const Yt = {
  name: "attention",
  resolveAll: _l,
  tokenize: vl
};
function _l(e, t) {
  let n = -1, r, i, l, o, a, s, u, c;
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
          An(p, -s), An(g, s), o = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: p,
            end: {
              ...e[r][1].end
            }
          }, a = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: g
          }, l = {
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
              ...a.end
            }
          }, e[r][1].end = {
            ...o.start
          }, e[n][1].start = {
            ...a.end
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = we(u, [["enter", e[r][1], t], ["exit", e[r][1], t]])), u = we(u, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["enter", l, t]]), u = we(u, sn(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), u = we(u, [["exit", l, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (c = 2, u = we(u, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : c = 0, ve(e, r - 1, n - r + 3, u), n = r + u.length - c - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function vl(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Mn(r);
  let l;
  return o;
  function o(s) {
    return l = s, e.enter("attentionSequence"), a(s);
  }
  function a(s) {
    if (s === l)
      return e.consume(s), a;
    const u = e.exit("attentionSequence"), c = Mn(s), p = !c || c === 2 && i || n.includes(s), g = !i || i === 2 && c || n.includes(r);
    return u._open = !!(l === 42 ? p : p && (i || !g)), u._close = !!(l === 42 ? g : g && (c || !p)), t(s);
  }
}
function An(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const El = {
  name: "autolink",
  tokenize: Il
};
function Il(e, t, n) {
  let r = 0;
  return i;
  function i(h) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), l;
  }
  function l(h) {
    return _e(h) ? (e.consume(h), o) : h === 64 ? n(h) : u(h);
  }
  function o(h) {
    return h === 43 || h === 45 || h === 46 || ye(h) ? (r = 1, a(h)) : u(h);
  }
  function a(h) {
    return h === 58 ? (e.consume(h), r = 0, s) : (h === 43 || h === 45 || h === 46 || ye(h)) && r++ < 32 ? (e.consume(h), a) : (r = 0, u(h));
  }
  function s(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : h === null || h === 32 || h === 60 || Wt(h) ? n(h) : (e.consume(h), s);
  }
  function u(h) {
    return h === 64 ? (e.consume(h), c) : fl(h) ? (e.consume(h), u) : n(h);
  }
  function c(h) {
    return ye(h) ? p(h) : n(h);
  }
  function p(h) {
    return h === 46 ? (e.consume(h), r = 0, c) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : g(h);
  }
  function g(h) {
    if ((h === 45 || ye(h)) && r++ < 63) {
      const w = h === 45 ? g : p;
      return e.consume(h), w;
    }
    return n(h);
  }
}
const bt = {
  partial: !0,
  tokenize: Tl
};
function Tl(e, t, n) {
  return r;
  function r(l) {
    return H(l) ? X(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || D(l) ? t(l) : n(l);
  }
}
const br = {
  continuation: {
    tokenize: Nl
  },
  exit: Ml,
  name: "blockQuote",
  tokenize: Ll
};
function Ll(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    if (o === 62) {
      const a = r.containerState;
      return a.open || (e.enter("blockQuote", {
        _container: !0
      }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(o), e.exit("blockQuoteMarker"), l;
    }
    return n(o);
  }
  function l(o) {
    return H(o) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(o), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(o));
  }
}
function Nl(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return H(o) ? X(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : l(o);
  }
  function l(o) {
    return e.attempt(br, t, n)(o);
  }
}
function Ml(e) {
  e.exit("blockQuote");
}
const Sr = {
  name: "characterEscape",
  tokenize: Al
};
function Al(e, t, n) {
  return r;
  function r(l) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(l), e.exit("escapeMarker"), i;
  }
  function i(l) {
    return gl(l) ? (e.enter("characterEscapeValue"), e.consume(l), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(l);
  }
}
const _r = {
  name: "characterReference",
  tokenize: Pl
};
function Pl(e, t, n) {
  const r = this;
  let i = 0, l, o;
  return a;
  function a(p) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), s;
  }
  function s(p) {
    return p === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(p), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), l = 31, o = ye, c(p));
  }
  function u(p) {
    return p === 88 || p === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(p), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), l = 6, o = ml, c) : (e.enter("characterReferenceValue"), l = 7, o = qt, c(p));
  }
  function c(p) {
    if (p === 59 && i) {
      const g = e.exit("characterReferenceValue");
      return o === ye && !an(r.sliceSerialize(g)) ? n(p) : (e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return o(p) && i++ < l ? (e.consume(p), c) : n(p);
  }
}
const Pn = {
  partial: !0,
  tokenize: zl
}, Dn = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Dl
};
function Dl(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: U
  };
  let l = 0, o = 0, a;
  return s;
  function s(x) {
    return u(x);
  }
  function u(x) {
    const V = r.events[r.events.length - 1];
    return l = V && V[1].type === "linePrefix" ? V[2].sliceSerialize(V[1], !0).length : 0, a = x, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), c(x);
  }
  function c(x) {
    return x === a ? (o++, e.consume(x), c) : o < 3 ? n(x) : (e.exit("codeFencedFenceSequence"), H(x) ? X(e, p, "whitespace")(x) : p(x));
  }
  function p(x) {
    return x === null || D(x) ? (e.exit("codeFencedFence"), r.interrupt ? t(x) : e.check(Pn, k, j)(x)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), g(x));
  }
  function g(x) {
    return x === null || D(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), p(x)) : H(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), X(e, h, "whitespace")(x)) : x === 96 && x === a ? n(x) : (e.consume(x), g);
  }
  function h(x) {
    return x === null || D(x) ? p(x) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), w(x));
  }
  function w(x) {
    return x === null || D(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), p(x)) : x === 96 && x === a ? n(x) : (e.consume(x), w);
  }
  function k(x) {
    return e.attempt(i, j, L)(x);
  }
  function L(x) {
    return e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), b;
  }
  function b(x) {
    return l > 0 && H(x) ? X(e, P, "linePrefix", l + 1)(x) : P(x);
  }
  function P(x) {
    return x === null || D(x) ? e.check(Pn, k, j)(x) : (e.enter("codeFlowValue"), I(x));
  }
  function I(x) {
    return x === null || D(x) ? (e.exit("codeFlowValue"), P(x)) : (e.consume(x), I);
  }
  function j(x) {
    return e.exit("codeFenced"), t(x);
  }
  function U(x, V, O) {
    let $ = 0;
    return W;
    function W(F) {
      return x.enter("lineEnding"), x.consume(F), x.exit("lineEnding"), T;
    }
    function T(F) {
      return x.enter("codeFencedFence"), H(F) ? X(x, N, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(F) : N(F);
    }
    function N(F) {
      return F === a ? (x.enter("codeFencedFenceSequence"), q(F)) : O(F);
    }
    function q(F) {
      return F === a ? ($++, x.consume(F), q) : $ >= o ? (x.exit("codeFencedFenceSequence"), H(F) ? X(x, J, "whitespace")(F) : J(F)) : O(F);
    }
    function J(F) {
      return F === null || D(F) ? (x.exit("codeFencedFence"), V(F)) : O(F);
    }
  }
}
function zl(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? n(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
const Mt = {
  name: "codeIndented",
  tokenize: Rl
}, Ol = {
  partial: !0,
  tokenize: Bl
};
function Rl(e, t, n) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("codeIndented"), X(e, l, "linePrefix", 5)(u);
  }
  function l(u) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? o(u) : n(u);
  }
  function o(u) {
    return u === null ? s(u) : D(u) ? e.attempt(Ol, o, s)(u) : (e.enter("codeFlowValue"), a(u));
  }
  function a(u) {
    return u === null || D(u) ? (e.exit("codeFlowValue"), o(u)) : (e.consume(u), a);
  }
  function s(u) {
    return e.exit("codeIndented"), t(u);
  }
}
function Bl(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : D(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : X(e, l, "linePrefix", 5)(o);
  }
  function l(o) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(o) : D(o) ? i(o) : n(o);
  }
}
const Fl = {
  name: "codeText",
  previous: Hl,
  resolve: Ul,
  tokenize: jl
};
function Ul(e) {
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
function Hl(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function jl(e, t, n) {
  let r = 0, i, l;
  return o;
  function o(p) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(p);
  }
  function a(p) {
    return p === 96 ? (e.consume(p), r++, a) : (e.exit("codeTextSequence"), s(p));
  }
  function s(p) {
    return p === null ? n(p) : p === 32 ? (e.enter("space"), e.consume(p), e.exit("space"), s) : p === 96 ? (l = e.enter("codeTextSequence"), i = 0, c(p)) : D(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(p));
  }
  function u(p) {
    return p === null || p === 32 || p === 96 || D(p) ? (e.exit("codeTextData"), s(p)) : (e.consume(p), u);
  }
  function c(p) {
    return p === 96 ? (e.consume(p), i++, c) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(p)) : (l.type = "codeTextData", u(p));
  }
}
class Vl {
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
    const l = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && Je(this.left, r), l.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Je(this.left, t);
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
    this.setCursor(0), Je(this.right, t.reverse());
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
        Je(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Je(this.left, n.reverse());
      }
  }
}
function Je(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function vr(e) {
  const t = {};
  let n = -1, r, i, l, o, a, s, u;
  const c = new Vl(e);
  for (; ++n < c.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = c.get(n), n && r[1].type === "chunkFlow" && c.get(n - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, l = 0, l < s.length && s[l][1].type === "lineEndingBlank" && (l += 2), l < s.length && s[l][1].type === "content"))
      for (; ++l < s.length && s[l][1].type !== "content"; )
        s[l][1].type === "chunkText" && (s[l][1]._isInFirstContentOfListItem = !0, l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, $l(c, n)), n = t[n], u = !0);
    else if (r[1]._container) {
      for (l = n, i = void 0; l--; )
        if (o = c.get(l), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
          o[0] === "enter" && (i && (c.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = l);
        else if (!(o[1].type === "linePrefix" || o[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...c.get(i)[1].start
      }, a = c.slice(i, n), a.unshift(r), c.splice(i, n - i + 1, a));
    }
  }
  return ve(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !u;
}
function $l(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const l = [];
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const a = o.events, s = [], u = {};
  let c, p, g = -1, h = n, w = 0, k = 0;
  const L = [k];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; )
      ;
    l.push(i), h._tokenizer || (c = r.sliceStream(h), h.next || c.push(null), p && o.defineSkip(h.start), h._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(c), h._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), p = h, h = h.next;
  }
  for (h = n; ++g < a.length; )
    // Find a void token that includes a break.
    a[g][0] === "exit" && a[g - 1][0] === "enter" && a[g][1].type === a[g - 1][1].type && a[g][1].start.line !== a[g][1].end.line && (k = g + 1, L.push(k), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (o.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : L.pop(), g = L.length; g--; ) {
    const b = a.slice(L[g], L[g + 1]), P = l.pop();
    s.push([P, P + b.length - 1]), e.splice(P, 2, b);
  }
  for (s.reverse(), g = -1; ++g < s.length; )
    u[w + s[g][0]] = w + s[g][1], w += s[g][1] - s[g][0] - 1;
  return u;
}
const Zl = {
  resolve: ql,
  tokenize: Yl
}, Wl = {
  partial: !0,
  tokenize: Xl
};
function ql(e) {
  return vr(e), e;
}
function Yl(e, t) {
  let n;
  return r;
  function r(a) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? l(a) : D(a) ? e.check(Wl, o, l)(a) : (e.consume(a), i);
  }
  function l(a) {
    return e.exit("chunkContent"), e.exit("content"), t(a);
  }
  function o(a) {
    return e.consume(a), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, i;
  }
}
function Xl(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), X(e, l, "linePrefix");
  }
  function l(o) {
    if (o === null || D(o))
      return n(o);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function Er(e, t, n, r, i, l, o, a, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let c = 0;
  return p;
  function p(b) {
    return b === 60 ? (e.enter(r), e.enter(i), e.enter(l), e.consume(b), e.exit(l), g) : b === null || b === 32 || b === 41 || Wt(b) ? n(b) : (e.enter(r), e.enter(o), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), k(b));
  }
  function g(b) {
    return b === 62 ? (e.enter(l), e.consume(b), e.exit(l), e.exit(i), e.exit(r), t) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), h(b));
  }
  function h(b) {
    return b === 62 ? (e.exit("chunkString"), e.exit(a), g(b)) : b === null || b === 60 || D(b) ? n(b) : (e.consume(b), b === 92 ? w : h);
  }
  function w(b) {
    return b === 60 || b === 62 || b === 92 ? (e.consume(b), h) : h(b);
  }
  function k(b) {
    return !c && (b === null || b === 41 || he(b)) ? (e.exit("chunkString"), e.exit(a), e.exit(o), e.exit(r), t(b)) : c < u && b === 40 ? (e.consume(b), c++, k) : b === 41 ? (e.consume(b), c--, k) : b === null || b === 32 || b === 40 || Wt(b) ? n(b) : (e.consume(b), b === 92 ? L : k);
  }
  function L(b) {
    return b === 40 || b === 41 || b === 92 ? (e.consume(b), k) : k(b);
  }
}
function Ir(e, t, n, r, i, l) {
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
    h === 94 && !a && "_hiddenFootnoteSupport" in o.parser.constructs ? n(h) : h === 93 ? (e.exit(l), e.enter(i), e.consume(h), e.exit(i), e.exit(r), t) : D(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), c) : (e.enter("chunkString", {
      contentType: "string"
    }), p(h));
  }
  function p(h) {
    return h === null || h === 91 || h === 93 || D(h) || a++ > 999 ? (e.exit("chunkString"), c(h)) : (e.consume(h), s || (s = !H(h)), h === 92 ? g : p);
  }
  function g(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), a++, p) : p(h);
  }
}
function Tr(e, t, n, r, i, l) {
  let o;
  return a;
  function a(g) {
    return g === 34 || g === 39 || g === 40 ? (e.enter(r), e.enter(i), e.consume(g), e.exit(i), o = g === 40 ? 41 : g, s) : n(g);
  }
  function s(g) {
    return g === o ? (e.enter(i), e.consume(g), e.exit(i), e.exit(r), t) : (e.enter(l), u(g));
  }
  function u(g) {
    return g === o ? (e.exit(l), s(o)) : g === null ? n(g) : D(g) ? (e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), X(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), c(g));
  }
  function c(g) {
    return g === o || g === null || D(g) ? (e.exit("chunkString"), u(g)) : (e.consume(g), g === 92 ? p : c);
  }
  function p(g) {
    return g === o || g === 92 ? (e.consume(g), c) : c(g);
  }
}
function Ke(e, t) {
  let n;
  return r;
  function r(i) {
    return D(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : H(i) ? X(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const Jl = {
  name: "definition",
  tokenize: Ql
}, Gl = {
  partial: !0,
  tokenize: Kl
};
function Ql(e, t, n) {
  const r = this;
  let i;
  return l;
  function l(h) {
    return e.enter("definition"), o(h);
  }
  function o(h) {
    return Ir.call(
      r,
      e,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(h);
  }
  function a(h) {
    return i = Ve(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), s) : n(h);
  }
  function s(h) {
    return he(h) ? Ke(e, u)(h) : u(h);
  }
  function u(h) {
    return Er(
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
    return e.attempt(Gl, p, p)(h);
  }
  function p(h) {
    return H(h) ? X(e, g, "whitespace")(h) : g(h);
  }
  function g(h) {
    return h === null || D(h) ? (e.exit("definition"), r.parser.defined.push(i), t(h)) : n(h);
  }
}
function Kl(e, t, n) {
  return r;
  function r(a) {
    return he(a) ? Ke(e, i)(a) : n(a);
  }
  function i(a) {
    return Tr(e, l, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function l(a) {
    return H(a) ? X(e, o, "whitespace")(a) : o(a);
  }
  function o(a) {
    return a === null || D(a) ? t(a) : n(a);
  }
}
const eo = {
  name: "hardBreakEscape",
  tokenize: to
};
function to(e, t, n) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return D(l) ? (e.exit("hardBreakEscape"), t(l)) : n(l);
  }
}
const no = {
  name: "headingAtx",
  resolve: ro,
  tokenize: io
};
function ro(e, t) {
  let n = e.length - 2, r = 3, i, l;
  return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[n][1].end
  }, l = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[n][1].end,
    contentType: "text"
  }, ve(e, r, n - r + 1, [["enter", i, t], ["enter", l, t], ["exit", l, t], ["exit", i, t]])), e;
}
function io(e, t, n) {
  let r = 0;
  return i;
  function i(c) {
    return e.enter("atxHeading"), l(c);
  }
  function l(c) {
    return e.enter("atxHeadingSequence"), o(c);
  }
  function o(c) {
    return c === 35 && r++ < 6 ? (e.consume(c), o) : c === null || he(c) ? (e.exit("atxHeadingSequence"), a(c)) : n(c);
  }
  function a(c) {
    return c === 35 ? (e.enter("atxHeadingSequence"), s(c)) : c === null || D(c) ? (e.exit("atxHeading"), t(c)) : H(c) ? X(e, a, "whitespace")(c) : (e.enter("atxHeadingText"), u(c));
  }
  function s(c) {
    return c === 35 ? (e.consume(c), s) : (e.exit("atxHeadingSequence"), a(c));
  }
  function u(c) {
    return c === null || c === 35 || he(c) ? (e.exit("atxHeadingText"), a(c)) : (e.consume(c), u);
  }
}
const lo = [
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
], zn = ["pre", "script", "style", "textarea"], oo = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: uo,
  tokenize: co
}, ao = {
  partial: !0,
  tokenize: po
}, so = {
  partial: !0,
  tokenize: ho
};
function uo(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function co(e, t, n) {
  const r = this;
  let i, l, o, a, s;
  return u;
  function u(m) {
    return c(m);
  }
  function c(m) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(m), p;
  }
  function p(m) {
    return m === 33 ? (e.consume(m), g) : m === 47 ? (e.consume(m), l = !0, k) : m === 63 ? (e.consume(m), i = 3, r.interrupt ? t : f) : _e(m) ? (e.consume(m), o = String.fromCharCode(m), L) : n(m);
  }
  function g(m) {
    return m === 45 ? (e.consume(m), i = 2, h) : m === 91 ? (e.consume(m), i = 5, a = 0, w) : _e(m) ? (e.consume(m), i = 4, r.interrupt ? t : f) : n(m);
  }
  function h(m) {
    return m === 45 ? (e.consume(m), r.interrupt ? t : f) : n(m);
  }
  function w(m) {
    const ie = "CDATA[";
    return m === ie.charCodeAt(a++) ? (e.consume(m), a === ie.length ? r.interrupt ? t : N : w) : n(m);
  }
  function k(m) {
    return _e(m) ? (e.consume(m), o = String.fromCharCode(m), L) : n(m);
  }
  function L(m) {
    if (m === null || m === 47 || m === 62 || he(m)) {
      const ie = m === 47, Ee = o.toLowerCase();
      return !ie && !l && zn.includes(Ee) ? (i = 1, r.interrupt ? t(m) : N(m)) : lo.includes(o.toLowerCase()) ? (i = 6, ie ? (e.consume(m), b) : r.interrupt ? t(m) : N(m)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(m) : l ? P(m) : I(m));
    }
    return m === 45 || ye(m) ? (e.consume(m), o += String.fromCharCode(m), L) : n(m);
  }
  function b(m) {
    return m === 62 ? (e.consume(m), r.interrupt ? t : N) : n(m);
  }
  function P(m) {
    return H(m) ? (e.consume(m), P) : W(m);
  }
  function I(m) {
    return m === 47 ? (e.consume(m), W) : m === 58 || m === 95 || _e(m) ? (e.consume(m), j) : H(m) ? (e.consume(m), I) : W(m);
  }
  function j(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || ye(m) ? (e.consume(m), j) : U(m);
  }
  function U(m) {
    return m === 61 ? (e.consume(m), x) : H(m) ? (e.consume(m), U) : I(m);
  }
  function x(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (e.consume(m), s = m, V) : H(m) ? (e.consume(m), x) : O(m);
  }
  function V(m) {
    return m === s ? (e.consume(m), s = null, $) : m === null || D(m) ? n(m) : (e.consume(m), V);
  }
  function O(m) {
    return m === null || m === 34 || m === 39 || m === 47 || m === 60 || m === 61 || m === 62 || m === 96 || he(m) ? U(m) : (e.consume(m), O);
  }
  function $(m) {
    return m === 47 || m === 62 || H(m) ? I(m) : n(m);
  }
  function W(m) {
    return m === 62 ? (e.consume(m), T) : n(m);
  }
  function T(m) {
    return m === null || D(m) ? N(m) : H(m) ? (e.consume(m), T) : n(m);
  }
  function N(m) {
    return m === 45 && i === 2 ? (e.consume(m), Q) : m === 60 && i === 1 ? (e.consume(m), ne) : m === 62 && i === 4 ? (e.consume(m), ue) : m === 63 && i === 3 ? (e.consume(m), f) : m === 93 && i === 5 ? (e.consume(m), Ce) : D(m) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(ao, de, q)(m)) : m === null || D(m) ? (e.exit("htmlFlowData"), q(m)) : (e.consume(m), N);
  }
  function q(m) {
    return e.check(so, J, de)(m);
  }
  function J(m) {
    return e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), F;
  }
  function F(m) {
    return m === null || D(m) ? q(m) : (e.enter("htmlFlowData"), N(m));
  }
  function Q(m) {
    return m === 45 ? (e.consume(m), f) : N(m);
  }
  function ne(m) {
    return m === 47 ? (e.consume(m), o = "", oe) : N(m);
  }
  function oe(m) {
    if (m === 62) {
      const ie = o.toLowerCase();
      return zn.includes(ie) ? (e.consume(m), ue) : N(m);
    }
    return _e(m) && o.length < 8 ? (e.consume(m), o += String.fromCharCode(m), oe) : N(m);
  }
  function Ce(m) {
    return m === 93 ? (e.consume(m), f) : N(m);
  }
  function f(m) {
    return m === 62 ? (e.consume(m), ue) : m === 45 && i === 2 ? (e.consume(m), f) : N(m);
  }
  function ue(m) {
    return m === null || D(m) ? (e.exit("htmlFlowData"), de(m)) : (e.consume(m), ue);
  }
  function de(m) {
    return e.exit("htmlFlow"), t(m);
  }
}
function ho(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return D(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l) : n(o);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function po(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(bt, t, n);
  }
}
const fo = {
  name: "htmlText",
  tokenize: mo
};
function mo(e, t, n) {
  const r = this;
  let i, l, o;
  return a;
  function a(f) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(f), s;
  }
  function s(f) {
    return f === 33 ? (e.consume(f), u) : f === 47 ? (e.consume(f), U) : f === 63 ? (e.consume(f), I) : _e(f) ? (e.consume(f), O) : n(f);
  }
  function u(f) {
    return f === 45 ? (e.consume(f), c) : f === 91 ? (e.consume(f), l = 0, w) : _e(f) ? (e.consume(f), P) : n(f);
  }
  function c(f) {
    return f === 45 ? (e.consume(f), h) : n(f);
  }
  function p(f) {
    return f === null ? n(f) : f === 45 ? (e.consume(f), g) : D(f) ? (o = p, ne(f)) : (e.consume(f), p);
  }
  function g(f) {
    return f === 45 ? (e.consume(f), h) : p(f);
  }
  function h(f) {
    return f === 62 ? Q(f) : f === 45 ? g(f) : p(f);
  }
  function w(f) {
    const ue = "CDATA[";
    return f === ue.charCodeAt(l++) ? (e.consume(f), l === ue.length ? k : w) : n(f);
  }
  function k(f) {
    return f === null ? n(f) : f === 93 ? (e.consume(f), L) : D(f) ? (o = k, ne(f)) : (e.consume(f), k);
  }
  function L(f) {
    return f === 93 ? (e.consume(f), b) : k(f);
  }
  function b(f) {
    return f === 62 ? Q(f) : f === 93 ? (e.consume(f), b) : k(f);
  }
  function P(f) {
    return f === null || f === 62 ? Q(f) : D(f) ? (o = P, ne(f)) : (e.consume(f), P);
  }
  function I(f) {
    return f === null ? n(f) : f === 63 ? (e.consume(f), j) : D(f) ? (o = I, ne(f)) : (e.consume(f), I);
  }
  function j(f) {
    return f === 62 ? Q(f) : I(f);
  }
  function U(f) {
    return _e(f) ? (e.consume(f), x) : n(f);
  }
  function x(f) {
    return f === 45 || ye(f) ? (e.consume(f), x) : V(f);
  }
  function V(f) {
    return D(f) ? (o = V, ne(f)) : H(f) ? (e.consume(f), V) : Q(f);
  }
  function O(f) {
    return f === 45 || ye(f) ? (e.consume(f), O) : f === 47 || f === 62 || he(f) ? $(f) : n(f);
  }
  function $(f) {
    return f === 47 ? (e.consume(f), Q) : f === 58 || f === 95 || _e(f) ? (e.consume(f), W) : D(f) ? (o = $, ne(f)) : H(f) ? (e.consume(f), $) : Q(f);
  }
  function W(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || ye(f) ? (e.consume(f), W) : T(f);
  }
  function T(f) {
    return f === 61 ? (e.consume(f), N) : D(f) ? (o = T, ne(f)) : H(f) ? (e.consume(f), T) : $(f);
  }
  function N(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), i = f, q) : D(f) ? (o = N, ne(f)) : H(f) ? (e.consume(f), N) : (e.consume(f), J);
  }
  function q(f) {
    return f === i ? (e.consume(f), i = void 0, F) : f === null ? n(f) : D(f) ? (o = q, ne(f)) : (e.consume(f), q);
  }
  function J(f) {
    return f === null || f === 34 || f === 39 || f === 60 || f === 61 || f === 96 ? n(f) : f === 47 || f === 62 || he(f) ? $(f) : (e.consume(f), J);
  }
  function F(f) {
    return f === 47 || f === 62 || he(f) ? $(f) : n(f);
  }
  function Q(f) {
    return f === 62 ? (e.consume(f), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(f);
  }
  function ne(f) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), oe;
  }
  function oe(f) {
    return H(f) ? X(e, Ce, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : Ce(f);
  }
  function Ce(f) {
    return e.enter("htmlTextData"), o(f);
  }
}
const un = {
  name: "labelEnd",
  resolveAll: wo,
  resolveTo: xo,
  tokenize: ko
}, go = {
  tokenize: bo
}, yo = {
  tokenize: So
}, Co = {
  tokenize: _o
};
function wo(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e.length !== n.length && ve(e, 0, e.length, n), e;
}
function xo(e, t) {
  let n = e.length, r = 0, i, l, o, a;
  for (; n--; )
    if (i = e[n][1], l) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (o) {
      if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (l = n, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (o = n);
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
  return a = [["enter", s, t], ["enter", u, t]], a = we(a, e.slice(l + 1, l + r + 3)), a = we(a, [["enter", c, t]]), a = we(a, sn(t.parser.constructs.insideSpan.null, e.slice(l + r + 4, o - 3), t)), a = we(a, [["exit", c, t], e[o - 2], e[o - 1], ["exit", u, t]]), a = we(a, e.slice(o + 1)), a = we(a, [["exit", s, t]]), ve(e, l, e.length, a), e;
}
function ko(e, t, n) {
  const r = this;
  let i = r.events.length, l, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      l = r.events[i][1];
      break;
    }
  return a;
  function a(g) {
    return l ? l._inactive ? p(g) : (o = r.parser.defined.includes(Ve(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(g), e.exit("labelMarker"), e.exit("labelEnd"), s) : n(g);
  }
  function s(g) {
    return g === 40 ? e.attempt(go, c, o ? c : p)(g) : g === 91 ? e.attempt(yo, c, o ? u : p)(g) : o ? c(g) : p(g);
  }
  function u(g) {
    return e.attempt(Co, c, p)(g);
  }
  function c(g) {
    return t(g);
  }
  function p(g) {
    return l._balanced = !0, n(g);
  }
}
function bo(e, t, n) {
  return r;
  function r(p) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), i;
  }
  function i(p) {
    return he(p) ? Ke(e, l)(p) : l(p);
  }
  function l(p) {
    return p === 41 ? c(p) : Er(e, o, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(p);
  }
  function o(p) {
    return he(p) ? Ke(e, s)(p) : c(p);
  }
  function a(p) {
    return n(p);
  }
  function s(p) {
    return p === 34 || p === 39 || p === 40 ? Tr(e, u, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(p) : c(p);
  }
  function u(p) {
    return he(p) ? Ke(e, c)(p) : c(p);
  }
  function c(p) {
    return p === 41 ? (e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), e.exit("resource"), t) : n(p);
  }
}
function So(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return Ir.call(r, e, l, o, "reference", "referenceMarker", "referenceString")(a);
  }
  function l(a) {
    return r.parser.defined.includes(Ve(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(a) : n(a);
  }
  function o(a) {
    return n(a);
  }
}
function _o(e, t, n) {
  return r;
  function r(l) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), i;
  }
  function i(l) {
    return l === 93 ? (e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), e.exit("reference"), t) : n(l);
  }
}
const vo = {
  name: "labelStartImage",
  resolveAll: un.resolveAll,
  tokenize: Eo
};
function Eo(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), l;
  }
  function l(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), o) : n(a);
  }
  function o(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(a) : t(a);
  }
}
const Io = {
  name: "labelStartLink",
  resolveAll: un.resolveAll,
  tokenize: To
};
function To(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), l;
  }
  function l(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const At = {
  name: "lineEnding",
  tokenize: Lo
};
function Lo(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), X(e, t, "linePrefix");
  }
}
const gt = {
  name: "thematicBreak",
  tokenize: No
};
function No(e, t, n) {
  let r = 0, i;
  return l;
  function l(u) {
    return e.enter("thematicBreak"), o(u);
  }
  function o(u) {
    return i = u, a(u);
  }
  function a(u) {
    return u === i ? (e.enter("thematicBreakSequence"), s(u)) : r >= 3 && (u === null || D(u)) ? (e.exit("thematicBreak"), t(u)) : n(u);
  }
  function s(u) {
    return u === i ? (e.consume(u), r++, s) : (e.exit("thematicBreakSequence"), H(u) ? X(e, a, "whitespace")(u) : a(u));
  }
}
const ce = {
  continuation: {
    tokenize: Do
  },
  exit: Oo,
  name: "list",
  tokenize: Po
}, Mo = {
  partial: !0,
  tokenize: Ro
}, Ao = {
  partial: !0,
  tokenize: zo
};
function Po(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let l = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return a;
  function a(h) {
    const w = r.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (w === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : qt(h)) {
      if (r.containerState.type || (r.containerState.type = w, e.enter(w, {
        _container: !0
      })), w === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(gt, n, u)(h) : u(h);
      if (!r.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(h);
    }
    return n(h);
  }
  function s(h) {
    return qt(h) && ++o < 10 ? (e.consume(h), s) : (!r.interrupt || o < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), u(h)) : n(h);
  }
  function u(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e.check(
      bt,
      // Can’t be empty when interrupting.
      r.interrupt ? n : c,
      e.attempt(Mo, g, p)
    );
  }
  function c(h) {
    return r.containerState.initialBlankLine = !0, l++, g(h);
  }
  function p(h) {
    return H(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), g) : n(h);
  }
  function g(h) {
    return r.containerState.size = l + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(h);
  }
}
function Do(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(bt, i, l);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, X(e, t, "listItemIndent", r.containerState.size + 1)(a);
  }
  function l(a) {
    return r.containerState.furtherBlankLines || !H(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Ao, t, o)(a));
  }
  function o(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, X(e, e.attempt(ce, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function zo(e, t, n) {
  const r = this;
  return X(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(l) : n(l);
  }
}
function Oo(e) {
  e.exit(this.containerState.type);
}
function Ro(e, t, n) {
  const r = this;
  return X(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return !H(l) && o && o[1].type === "listItemPrefixWhitespace" ? t(l) : n(l);
  }
}
const On = {
  name: "setextUnderline",
  resolveTo: Bo,
  tokenize: Fo
};
function Bo(e, t) {
  let n = e.length, r, i, l;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === "content") {
        r = n;
        break;
      }
      e[n][1].type === "paragraph" && (i = n);
    } else
      e[n][1].type === "content" && e.splice(n, 1), !l && e[n][1].type === "definition" && (l = n);
  const o = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", l ? (e.splice(i, 0, ["enter", o, t]), e.splice(l + 1, 0, ["exit", e[r][1], t]), e[r][1].end = {
    ...e[l][1].end
  }) : e[r][1] = o, e.push(["exit", o, t]), e;
}
function Fo(e, t, n) {
  const r = this;
  let i;
  return l;
  function l(u) {
    let c = r.events.length, p;
    for (; c--; )
      if (r.events[c][1].type !== "lineEnding" && r.events[c][1].type !== "linePrefix" && r.events[c][1].type !== "content") {
        p = r.events[c][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || p) ? (e.enter("setextHeadingLine"), i = u, o(u)) : n(u);
  }
  function o(u) {
    return e.enter("setextHeadingLineSequence"), a(u);
  }
  function a(u) {
    return u === i ? (e.consume(u), a) : (e.exit("setextHeadingLineSequence"), H(u) ? X(e, s, "lineSuffix")(u) : s(u));
  }
  function s(u) {
    return u === null || D(u) ? (e.exit("setextHeadingLine"), t(u)) : n(u);
  }
}
const Uo = {
  tokenize: Ho
};
function Ho(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    bt,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, X(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Zl, i)), "linePrefix"))
  );
  return n;
  function r(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(l), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
  }
  function i(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), t.currentConstruct = void 0, n;
  }
}
const jo = {
  resolveAll: Nr()
}, Vo = Lr("string"), $o = Lr("text");
function Lr(e) {
  return {
    resolveAll: Nr(e === "text" ? Zo : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], l = n.attempt(i, o, a);
    return o;
    function o(c) {
      return u(c) ? l(c) : a(c);
    }
    function a(c) {
      if (c === null) {
        n.consume(c);
        return;
      }
      return n.enter("data"), n.consume(c), s;
    }
    function s(c) {
      return u(c) ? (n.exit("data"), l(c)) : (n.consume(c), s);
    }
    function u(c) {
      if (c === null)
        return !0;
      const p = i[c];
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
function Nr(e) {
  return t;
  function t(n, r) {
    let i = -1, l;
    for (; ++i <= n.length; )
      l === void 0 ? n[i] && n[i][1].type === "data" && (l = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== l + 2 && (n[l][1].end = n[i - 1][1].end, n.splice(l + 2, i - l - 2), i = l + 2), l = void 0);
    return e ? e(n, r) : n;
  }
}
function Zo(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
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
      if (t._contentTypeTextTrailing && n === e.length && (a = 0), a) {
        const u = {
          type: n === e.length || s || a < 2 ? "lineSuffix" : "hardBreakTrailing",
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
        }, r.start.offset === r.end.offset ? Object.assign(r, u) : (e.splice(n, 0, ["enter", u, t], ["exit", u, t]), n += 2);
      }
      n++;
    }
  return e;
}
const Wo = {
  42: ce,
  43: ce,
  45: ce,
  48: ce,
  49: ce,
  50: ce,
  51: ce,
  52: ce,
  53: ce,
  54: ce,
  55: ce,
  56: ce,
  57: ce,
  62: br
}, qo = {
  91: Jl
}, Yo = {
  [-2]: Mt,
  [-1]: Mt,
  32: Mt
}, Xo = {
  35: no,
  42: gt,
  45: [On, gt],
  60: oo,
  61: On,
  95: gt,
  96: Dn,
  126: Dn
}, Jo = {
  38: _r,
  92: Sr
}, Go = {
  [-5]: At,
  [-4]: At,
  [-3]: At,
  33: vo,
  38: _r,
  42: Yt,
  60: [El, fo],
  91: Io,
  92: [eo, Sr],
  93: un,
  95: Yt,
  96: Fl
}, Qo = {
  null: [Yt, jo]
}, Ko = {
  null: [42, 95]
}, ea = {
  null: []
}, ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Ko,
  contentInitial: qo,
  disable: ea,
  document: Wo,
  flow: Xo,
  flowInitial: Yo,
  insideSpan: Qo,
  string: Jo,
  text: Go
}, Symbol.toStringTag, { value: "Module" }));
function na(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, l = [];
  let o = [], a = [];
  const s = {
    attempt: V(U),
    check: V(x),
    consume: P,
    enter: I,
    exit: j,
    interrupt: V(x, {
      interrupt: !0
    })
  }, u = {
    code: null,
    containerState: {},
    defineSkip: k,
    events: [],
    now: w,
    parser: e,
    previous: null,
    sliceSerialize: g,
    sliceStream: h,
    write: p
  };
  let c = t.tokenize.call(u, s);
  return t.resolveAll && l.push(t), u;
  function p(T) {
    return o = we(o, T), L(), o[o.length - 1] !== null ? [] : (O(t, 0), u.events = sn(l, u.events, u), u.events);
  }
  function g(T, N) {
    return ia(h(T), N);
  }
  function h(T) {
    return ra(o, T);
  }
  function w() {
    const {
      _bufferIndex: T,
      _index: N,
      line: q,
      column: J,
      offset: F
    } = r;
    return {
      _bufferIndex: T,
      _index: N,
      line: q,
      column: J,
      offset: F
    };
  }
  function k(T) {
    i[T.line] = T.column, W();
  }
  function L() {
    let T;
    for (; r._index < o.length; ) {
      const N = o[r._index];
      if (typeof N == "string")
        for (T = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === T && r._bufferIndex < N.length; )
          b(N.charCodeAt(r._bufferIndex));
      else
        b(N);
    }
  }
  function b(T) {
    c = c(T);
  }
  function P(T) {
    D(T) ? (r.line++, r.column = 1, r.offset += T === -3 ? 2 : 1, W()) : T !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = T;
  }
  function I(T, N) {
    const q = N || {};
    return q.type = T, q.start = w(), u.events.push(["enter", q, u]), a.push(q), q;
  }
  function j(T) {
    const N = a.pop();
    return N.end = w(), u.events.push(["exit", N, u]), N;
  }
  function U(T, N) {
    O(T, N.from);
  }
  function x(T, N) {
    N.restore();
  }
  function V(T, N) {
    return q;
    function q(J, F, Q) {
      let ne, oe, Ce, f;
      return Array.isArray(J) ? (
        /* c8 ignore next 1 */
        de(J)
      ) : "tokenize" in J ? (
        // Looks like a construct.
        de([
          /** @type {Construct} */
          J
        ])
      ) : ue(J);
      function ue(le) {
        return Ne;
        function Ne(ke) {
          const fe = ke !== null && le[ke], Ie = ke !== null && le.null, Me = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(fe) ? fe : fe ? [fe] : [],
            ...Array.isArray(Ie) ? Ie : Ie ? [Ie] : []
          ];
          return de(Me)(ke);
        }
      }
      function de(le) {
        return ne = le, oe = 0, le.length === 0 ? Q : m(le[oe]);
      }
      function m(le) {
        return Ne;
        function Ne(ke) {
          return f = $(), Ce = le, le.partial || (u.currentConstruct = le), le.name && u.parser.constructs.disable.null.includes(le.name) ? Ee() : le.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            N ? Object.assign(Object.create(u), N) : u,
            s,
            ie,
            Ee
          )(ke);
        }
      }
      function ie(le) {
        return T(Ce, f), F;
      }
      function Ee(le) {
        return f.restore(), ++oe < ne.length ? m(ne[oe]) : Q;
      }
    }
  }
  function O(T, N) {
    T.resolveAll && !l.includes(T) && l.push(T), T.resolve && ve(u.events, N, u.events.length - N, T.resolve(u.events.slice(N), u)), T.resolveTo && (u.events = T.resolveTo(u.events, u));
  }
  function $() {
    const T = w(), N = u.previous, q = u.currentConstruct, J = u.events.length, F = Array.from(a);
    return {
      from: J,
      restore: Q
    };
    function Q() {
      r = T, u.previous = N, u.currentConstruct = q, u.events.length = J, a = F, W();
    }
  }
  function W() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function ra(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, l = t.end._bufferIndex;
  let o;
  if (n === i)
    o = [e[n].slice(r, l)];
  else {
    if (o = e.slice(n, i), r > -1) {
      const a = o[0];
      typeof a == "string" ? o[0] = a.slice(r) : o.shift();
    }
    l > 0 && o.push(e[i].slice(0, l));
  }
  return o;
}
function ia(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const l = e[n];
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
        o = t ? " " : "	";
        break;
      }
      case -1: {
        if (!t && i) continue;
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
function la(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      hl([ta, ...(e || {}).extensions || []])
    ),
    content: i(wl),
    defined: [],
    document: i(kl),
    flow: i(Uo),
    lazy: {},
    string: i(Vo),
    text: i($o)
  };
  return r;
  function i(l) {
    return o;
    function o(a) {
      return na(r, l, a);
    }
  }
}
function oa(e) {
  for (; !vr(e); )
    ;
  return e;
}
const Rn = /[\0\t\n\r]/g;
function aa() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(l, o, a) {
    const s = [];
    let u, c, p, g, h;
    for (l = t + (typeof l == "string" ? l.toString() : new TextDecoder(o || void 0).decode(l)), p = 0, t = "", n && (l.charCodeAt(0) === 65279 && p++, n = void 0); p < l.length; ) {
      if (Rn.lastIndex = p, u = Rn.exec(l), g = u && u.index !== void 0 ? u.index : l.length, h = l.charCodeAt(g), !u) {
        t = l.slice(p);
        break;
      }
      if (h === 10 && p === g && r)
        s.push(-3), r = void 0;
      else
        switch (r && (s.push(-5), r = void 0), p < g && (s.push(l.slice(p, g)), e += g - p), h) {
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
      p = g + 1;
    }
    return a && (r && s.push(-5), t && s.push(t), s.push(null)), s;
  }
}
const sa = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function ua(e) {
  return e.replace(sa, ca);
}
function ca(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), l = i === 120 || i === 88;
    return kr(n.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return an(n) || e;
}
const Mr = {}.hasOwnProperty;
function ha(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), pa(n)(oa(la(n).document().write(aa()(e, t, !0))));
}
function pa(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(Ye),
      autolinkProtocol: $,
      autolinkEmail: $,
      atxHeading: l(We),
      blockQuote: l(Ie),
      characterEscape: $,
      characterReference: $,
      codeFenced: l(Me),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l(Me, o),
      codeText: l(it, o),
      codeTextData: $,
      data: $,
      codeFlowValue: $,
      definition: l(lt),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(ot),
      hardBreakEscape: l(qe),
      hardBreakTrailing: l(qe),
      htmlFlow: l(at, o),
      htmlFlowData: $,
      htmlText: l(at, o),
      htmlTextData: $,
      image: l(vt),
      label: o,
      link: l(Ye),
      listItem: l(Re),
      listItemValue: g,
      listOrdered: l(st, p),
      listUnordered: l(st),
      paragraph: l(ut),
      reference: m,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: l(We),
      strong: l(Et),
      thematicBreak: l(It)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: U,
      autolink: s(),
      autolinkEmail: fe,
      autolinkProtocol: ke,
      blockQuote: s(),
      characterEscapeValue: W,
      characterReferenceMarkerHexadecimal: Ee,
      characterReferenceMarkerNumeric: Ee,
      characterReferenceValue: le,
      characterReference: Ne,
      codeFenced: s(L),
      codeFencedFence: k,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: w,
      codeFlowValue: W,
      codeIndented: s(b),
      codeText: s(F),
      codeTextData: W,
      data: W,
      definition: s(),
      definitionDestinationString: j,
      definitionLabelString: P,
      definitionTitleString: I,
      emphasis: s(),
      hardBreakEscape: s(N),
      hardBreakTrailing: s(N),
      htmlFlow: s(q),
      htmlFlowData: W,
      htmlText: s(J),
      htmlTextData: W,
      image: s(ne),
      label: Ce,
      labelText: oe,
      lineEnding: T,
      link: s(Q),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: ie,
      resourceDestinationString: f,
      resourceTitleString: ue,
      resource: de,
      setextHeading: s(O),
      setextHeadingLineSequence: V,
      setextHeadingText: x,
      strong: s(),
      thematicBreak: s()
    }
  };
  Ar(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(C) {
    let v = {
      type: "root",
      children: []
    };
    const z = {
      stack: [v],
      tokenStack: [],
      config: t,
      enter: a,
      exit: u,
      buffer: o,
      resume: c,
      data: n
    }, B = [];
    let Z = -1;
    for (; ++Z < C.length; )
      if (C[Z][1].type === "listOrdered" || C[Z][1].type === "listUnordered")
        if (C[Z][0] === "enter")
          B.push(Z);
        else {
          const me = B.pop();
          Z = i(C, me, Z);
        }
    for (Z = -1; ++Z < C.length; ) {
      const me = t[C[Z][0]];
      Mr.call(me, C[Z][1].type) && me[C[Z][1].type].call(Object.assign({
        sliceSerialize: C[Z][2].sliceSerialize
      }, z), C[Z][1]);
    }
    if (z.tokenStack.length > 0) {
      const me = z.tokenStack[z.tokenStack.length - 1];
      (me[1] || Bn).call(z, void 0, me[0]);
    }
    for (v.position = {
      start: Te(C.length > 0 ? C[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Te(C.length > 0 ? C[C.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Z = -1; ++Z < t.transforms.length; )
      v = t.transforms[Z](v) || v;
    return v;
  }
  function i(C, v, z) {
    let B = v - 1, Z = -1, me = !1, be, y, M, _;
    for (; ++B <= z; ) {
      const E = C[B];
      switch (E[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          E[0] === "enter" ? Z++ : Z--, _ = void 0;
          break;
        }
        case "lineEndingBlank": {
          E[0] === "enter" && (be && !_ && !Z && !M && (M = B), _ = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          _ = void 0;
      }
      if (!Z && E[0] === "enter" && E[1].type === "listItemPrefix" || Z === -1 && E[0] === "exit" && (E[1].type === "listUnordered" || E[1].type === "listOrdered")) {
        if (be) {
          let K = B;
          for (y = void 0; K--; ) {
            const G = C[K];
            if (G[1].type === "lineEnding" || G[1].type === "lineEndingBlank") {
              if (G[0] === "exit") continue;
              y && (C[y][1].type = "lineEndingBlank", me = !0), G[1].type = "lineEnding", y = K;
            } else if (!(G[1].type === "linePrefix" || G[1].type === "blockQuotePrefix" || G[1].type === "blockQuotePrefixWhitespace" || G[1].type === "blockQuoteMarker" || G[1].type === "listItemIndent")) break;
          }
          M && (!y || M < y) && (be._spread = !0), be.end = Object.assign({}, y ? C[y][1].start : E[1].end), C.splice(y || B, 0, ["exit", be, E[2]]), B++, z++;
        }
        if (E[1].type === "listItemPrefix") {
          const K = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, E[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          be = K, C.splice(B, 0, ["enter", K, E[2]]), B++, z++, M = void 0, _ = !0;
        }
      }
    }
    return C[v][1]._spread = me, z;
  }
  function l(C, v) {
    return z;
    function z(B) {
      a.call(this, C(B), B), v && v.call(this, B);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(C, v, z) {
    this.stack[this.stack.length - 1].children.push(C), this.stack.push(C), this.tokenStack.push([v, z || void 0]), C.position = {
      start: Te(v.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(C) {
    return v;
    function v(z) {
      C && C.call(this, z), u.call(this, z);
    }
  }
  function u(C, v) {
    const z = this.stack.pop(), B = this.tokenStack.pop();
    if (B)
      B[0].type !== C.type && (v ? v.call(this, C, B[0]) : (B[1] || Bn).call(this, C, B[0]));
    else throw new Error("Cannot close `" + C.type + "` (" + Qe({
      start: C.start,
      end: C.end
    }) + "): it’s not open");
    z.position.end = Te(C.end);
  }
  function c() {
    return ul(this.stack.pop());
  }
  function p() {
    this.data.expectingFirstListItemValue = !0;
  }
  function g(C) {
    if (this.data.expectingFirstListItemValue) {
      const v = this.stack[this.stack.length - 2];
      v.start = Number.parseInt(this.sliceSerialize(C), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const C = this.resume(), v = this.stack[this.stack.length - 1];
    v.lang = C;
  }
  function w() {
    const C = this.resume(), v = this.stack[this.stack.length - 1];
    v.meta = C;
  }
  function k() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function L() {
    const C = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = C.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function b() {
    const C = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = C.replace(/(\r?\n|\r)$/g, "");
  }
  function P(C) {
    const v = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = v, z.identifier = Ve(this.sliceSerialize(C)).toLowerCase();
  }
  function I() {
    const C = this.resume(), v = this.stack[this.stack.length - 1];
    v.title = C;
  }
  function j() {
    const C = this.resume(), v = this.stack[this.stack.length - 1];
    v.url = C;
  }
  function U(C) {
    const v = this.stack[this.stack.length - 1];
    if (!v.depth) {
      const z = this.sliceSerialize(C).length;
      v.depth = z;
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function V(C) {
    const v = this.stack[this.stack.length - 1];
    v.depth = this.sliceSerialize(C).codePointAt(0) === 61 ? 1 : 2;
  }
  function O() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function $(C) {
    const z = this.stack[this.stack.length - 1].children;
    let B = z[z.length - 1];
    (!B || B.type !== "text") && (B = mn(), B.position = {
      start: Te(C.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, z.push(B)), this.stack.push(B);
  }
  function W(C) {
    const v = this.stack.pop();
    v.value += this.sliceSerialize(C), v.position.end = Te(C.end);
  }
  function T(C) {
    const v = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const z = v.children[v.children.length - 1];
      z.position.end = Te(C.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(v.type) && ($.call(this, C), W.call(this, C));
  }
  function N() {
    this.data.atHardBreak = !0;
  }
  function q() {
    const C = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = C;
  }
  function J() {
    const C = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = C;
  }
  function F() {
    const C = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = C;
  }
  function Q() {
    const C = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const v = this.data.referenceType || "shortcut";
      C.type += "Reference", C.referenceType = v, delete C.url, delete C.title;
    } else
      delete C.identifier, delete C.label;
    this.data.referenceType = void 0;
  }
  function ne() {
    const C = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const v = this.data.referenceType || "shortcut";
      C.type += "Reference", C.referenceType = v, delete C.url, delete C.title;
    } else
      delete C.identifier, delete C.label;
    this.data.referenceType = void 0;
  }
  function oe(C) {
    const v = this.sliceSerialize(C), z = this.stack[this.stack.length - 2];
    z.label = ua(v), z.identifier = Ve(v).toLowerCase();
  }
  function Ce() {
    const C = this.stack[this.stack.length - 1], v = this.resume(), z = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, z.type === "link") {
      const B = C.children;
      z.children = B;
    } else
      z.alt = v;
  }
  function f() {
    const C = this.resume(), v = this.stack[this.stack.length - 1];
    v.url = C;
  }
  function ue() {
    const C = this.resume(), v = this.stack[this.stack.length - 1];
    v.title = C;
  }
  function de() {
    this.data.inReference = void 0;
  }
  function m() {
    this.data.referenceType = "collapsed";
  }
  function ie(C) {
    const v = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = v, z.identifier = Ve(this.sliceSerialize(C)).toLowerCase(), this.data.referenceType = "full";
  }
  function Ee(C) {
    this.data.characterReferenceType = C.type;
  }
  function le(C) {
    const v = this.sliceSerialize(C), z = this.data.characterReferenceType;
    let B;
    z ? (B = kr(v, z === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : B = an(v);
    const Z = this.stack[this.stack.length - 1];
    Z.value += B;
  }
  function Ne(C) {
    const v = this.stack.pop();
    v.position.end = Te(C.end);
  }
  function ke(C) {
    W.call(this, C);
    const v = this.stack[this.stack.length - 1];
    v.url = this.sliceSerialize(C);
  }
  function fe(C) {
    W.call(this, C);
    const v = this.stack[this.stack.length - 1];
    v.url = "mailto:" + this.sliceSerialize(C);
  }
  function Ie() {
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
  function it() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function lt() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function ot() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function We() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function qe() {
    return {
      type: "break"
    };
  }
  function at() {
    return {
      type: "html",
      value: ""
    };
  }
  function vt() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Ye() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function st(C) {
    return {
      type: "list",
      ordered: C.type === "listOrdered",
      start: null,
      spread: C._spread,
      children: []
    };
  }
  function Re(C) {
    return {
      type: "listItem",
      spread: C._spread,
      checked: null,
      children: []
    };
  }
  function ut() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Et() {
    return {
      type: "strong",
      children: []
    };
  }
  function mn() {
    return {
      type: "text",
      value: ""
    };
  }
  function It() {
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
function Ar(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Ar(e, r) : da(e, r);
  }
}
function da(e, t) {
  let n;
  for (n in t)
    if (Mr.call(t, n))
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
function Bn(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Qe({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Qe({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Qe({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function fa(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return ha(r, {
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
function ma(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function ga(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function ya(e, t) {
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
function Ca(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function wa(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function xa(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Ze(r.toLowerCase()), l = e.footnoteOrder.indexOf(r);
  let o, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = l + 1, a += 1, e.footnoteCounts.set(r, a);
  const s = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (a > 1 ? "-" + a : ""),
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
function ka(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function ba(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function Pr(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), l = i[0];
  l && l.type === "text" ? l.value = "[" + l.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function Sa(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Pr(e, t);
  const i = { src: Ze(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, l), e.applyData(t, l);
}
function _a(e, t) {
  const n = { src: Ze(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function va(e, t) {
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
function Ea(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Pr(e, t);
  const i = { href: Ze(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, l), e.applyData(t, l);
}
function Ia(e, t) {
  const n = { href: Ze(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Ta(e, t, n) {
  const r = e.all(t), i = n ? La(n) : Dr(t), l = {}, o = [];
  if (typeof t.checked == "boolean") {
    const c = r[0];
    let p;
    c && c.type === "element" && c.tagName === "p" ? p = c : (p = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(p)), p.children.length > 0 && p.children.unshift({ type: "text", value: " " }), p.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
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
  return e.patch(t, u), e.applyData(t, u);
}
function La(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = Dr(n[r]);
  }
  return t;
}
function Dr(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function Na(e, t) {
  const n = {}, r = e.all(t);
  let i = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length; ) {
    const o = r[i];
    if (o.type === "element" && o.tagName === "li" && o.properties && Array.isArray(o.properties.className) && o.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const l = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(r, !0)
  };
  return e.patch(t, l), e.applyData(t, l);
}
function Ma(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Aa(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Pa(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Da(e, t) {
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
    }, a = nn(t.children[1]), s = fr(t.children[t.children.length - 1]);
    a && s && (o.position = { start: a, end: s }), i.push(o);
  }
  const l = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, l), e.applyData(t, l);
}
function za(e, t, n) {
  const r = n ? n.children : void 0, l = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, a = o ? o.length : t.children.length;
  let s = -1;
  const u = [];
  for (; ++s < a; ) {
    const p = t.children[s], g = {}, h = o ? o[s] : void 0;
    h && (g.align = h);
    let w = { type: "element", tagName: l, properties: g, children: [] };
    p && (w.children = e.all(p), e.patch(p, w), w = e.applyData(p, w)), u.push(w);
  }
  const c = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(t, c), e.applyData(t, c);
}
function Oa(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Fn = 9, Un = 32;
function Ra(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const l = [];
  for (; r; )
    l.push(
      Hn(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return l.push(Hn(t.slice(i), i > 0, !1)), l.join("");
}
function Hn(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let l = e.codePointAt(r);
    for (; l === Fn || l === Un; )
      r++, l = e.codePointAt(r);
  }
  if (n) {
    let l = e.codePointAt(i - 1);
    for (; l === Fn || l === Un; )
      i--, l = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function Ba(e, t) {
  const n = { type: "text", value: Ra(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Fa(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Ua = {
  blockquote: ma,
  break: ga,
  code: ya,
  delete: Ca,
  emphasis: wa,
  footnoteReference: xa,
  heading: ka,
  html: ba,
  imageReference: Sa,
  image: _a,
  inlineCode: va,
  linkReference: Ea,
  link: Ia,
  listItem: Ta,
  list: Na,
  paragraph: Ma,
  // @ts-expect-error: root is different, but hard to type.
  root: Aa,
  strong: Pa,
  table: Da,
  tableCell: Oa,
  tableRow: za,
  text: Ba,
  thematicBreak: Fa,
  toml: dt,
  yaml: dt,
  definition: dt,
  footnoteDefinition: dt
};
function dt() {
}
const zr = -1, St = 0, et = 1, wt = 2, cn = 3, hn = 4, pn = 5, dn = 6, Or = 7, Rr = 8, jn = typeof self == "object" ? self : globalThis, Ha = (e, t) => {
  const n = (i, l) => (e.set(l, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [l, o] = t[i];
    switch (l) {
      case St:
      case zr:
        return n(o, i);
      case et: {
        const a = n([], i);
        for (const s of o)
          a.push(r(s));
        return a;
      }
      case wt: {
        const a = n({}, i);
        for (const [s, u] of o)
          a[r(s)] = r(u);
        return a;
      }
      case cn:
        return n(new Date(o), i);
      case hn: {
        const { source: a, flags: s } = o;
        return n(new RegExp(a, s), i);
      }
      case pn: {
        const a = n(/* @__PURE__ */ new Map(), i);
        for (const [s, u] of o)
          a.set(r(s), r(u));
        return a;
      }
      case dn: {
        const a = n(/* @__PURE__ */ new Set(), i);
        for (const s of o)
          a.add(r(s));
        return a;
      }
      case Or: {
        const { name: a, message: s } = o;
        return n(new jn[a](s), i);
      }
      case Rr:
        return n(BigInt(o), i);
      case "BigInt":
        return n(Object(BigInt(o)), i);
      case "ArrayBuffer":
        return n(new Uint8Array(o).buffer, o);
      case "DataView": {
        const { buffer: a } = new Uint8Array(o);
        return n(new DataView(a), o);
      }
    }
    return n(new jn[l](o), i);
  };
  return r;
}, Vn = (e) => Ha(/* @__PURE__ */ new Map(), e)(0), Ue = "", { toString: ja } = {}, { keys: Va } = Object, Ge = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [St, t];
  const n = ja.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [et, Ue];
    case "Object":
      return [wt, Ue];
    case "Date":
      return [cn, Ue];
    case "RegExp":
      return [hn, Ue];
    case "Map":
      return [pn, Ue];
    case "Set":
      return [dn, Ue];
    case "DataView":
      return [et, n];
  }
  return n.includes("Array") ? [et, n] : n.includes("Error") ? [Or, n] : [wt, n];
}, ft = ([e, t]) => e === St && (t === "function" || t === "symbol"), $a = (e, t, n, r) => {
  const i = (o, a) => {
    const s = r.push(o) - 1;
    return n.set(a, s), s;
  }, l = (o) => {
    if (n.has(o))
      return n.get(o);
    let [a, s] = Ge(o);
    switch (a) {
      case St: {
        let c = o;
        switch (s) {
          case "bigint":
            a = Rr, c = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            c = null;
            break;
          case "undefined":
            return i([zr], o);
        }
        return i([a, c], o);
      }
      case et: {
        if (s) {
          let g = o;
          return s === "DataView" ? g = new Uint8Array(o.buffer) : s === "ArrayBuffer" && (g = new Uint8Array(o)), i([s, [...g]], o);
        }
        const c = [], p = i([a, c], o);
        for (const g of o)
          c.push(l(g));
        return p;
      }
      case wt: {
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
          return l(o.toJSON());
        const c = [], p = i([a, c], o);
        for (const g of Va(o))
          (e || !ft(Ge(o[g]))) && c.push([l(g), l(o[g])]);
        return p;
      }
      case cn:
        return i([a, o.toISOString()], o);
      case hn: {
        const { source: c, flags: p } = o;
        return i([a, { source: c, flags: p }], o);
      }
      case pn: {
        const c = [], p = i([a, c], o);
        for (const [g, h] of o)
          (e || !(ft(Ge(g)) || ft(Ge(h)))) && c.push([l(g), l(h)]);
        return p;
      }
      case dn: {
        const c = [], p = i([a, c], o);
        for (const g of o)
          (e || !ft(Ge(g))) && c.push(l(g));
        return p;
      }
    }
    const { message: u } = o;
    return i([a, { name: s, message: u }], o);
  };
  return l;
}, $n = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return $a(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, xt = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Vn($n(e, t)) : structuredClone(e)
) : (e, t) => Vn($n(e, t));
function Za(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function Wa(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function qa(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || Za, r = e.options.footnoteBackLabel || Wa, i = e.options.footnoteLabel || "Footnotes", l = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!u)
      continue;
    const c = e.all(u), p = String(u.identifier).toUpperCase(), g = Ze(p.toLowerCase());
    let h = 0;
    const w = [], k = e.footnoteCounts.get(p);
    for (; k !== void 0 && ++h <= k; ) {
      w.length > 0 && w.push({ type: "text", value: " " });
      let P = typeof n == "string" ? n : n(s, h);
      typeof P == "string" && (P = { type: "text", value: P }), w.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + g + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(P) ? P : [P]
      });
    }
    const L = c[c.length - 1];
    if (L && L.type === "element" && L.tagName === "p") {
      const P = L.children[L.children.length - 1];
      P && P.type === "text" ? P.value += " " : L.children.push({ type: "text", value: " " }), L.children.push(...w);
    } else
      c.push(...w);
    const b = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + g },
      children: e.wrap(c, !0)
    };
    e.patch(u, b), a.push(b);
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
            ...xt(o),
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
const Br = (
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
      return Ga;
    if (typeof e == "function")
      return _t(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Ya(e) : Xa(e);
    if (typeof e == "string")
      return Ja(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function Ya(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Br(e[n]);
  return _t(r);
  function r(...i) {
    let l = -1;
    for (; ++l < t.length; )
      if (t[l].apply(this, i)) return !0;
    return !1;
  }
}
function Xa(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return _t(n);
  function n(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let l;
    for (l in e)
      if (i[l] !== t[l]) return !1;
    return !0;
  }
}
function Ja(e) {
  return _t(t);
  function t(n) {
    return n && n.type === e;
  }
}
function _t(e) {
  return t;
  function t(n, r, i) {
    return !!(Qa(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Ga() {
  return !0;
}
function Qa(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Fr = [], Ka = !0, Zn = !1, es = "skip";
function ts(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const l = Br(i), o = r ? -1 : 1;
  a(e, void 0, [])();
  function a(s, u, c) {
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
      let h = Fr, w, k, L;
      if ((!t || l(s, u, c[c.length - 1] || void 0)) && (h = ns(n(s, c)), h[0] === Zn))
        return h;
      if ("children" in s && s.children) {
        const b = (
          /** @type {UnistParent} */
          s
        );
        if (b.children && h[0] !== es)
          for (k = (r ? b.children.length : -1) + o, L = c.concat(b); k > -1 && k < b.children.length; ) {
            const P = b.children[k];
            if (w = a(P, k, L)(), w[0] === Zn)
              return w;
            k = typeof w[1] == "number" ? w[1] : k + o;
          }
      }
      return h;
    }
  }
}
function ns(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Ka, e] : e == null ? Fr : [e];
}
function Ur(e, t, n, r) {
  let i, l, o;
  typeof t == "function" && typeof n != "function" ? (l = void 0, o = t, i = n) : (l = t, o = n, i = r), ts(e, l, a, i);
  function a(s, u) {
    const c = u[u.length - 1], p = c ? c.children.indexOf(s) : void 0;
    return o(s, p, c);
  }
}
const Xt = {}.hasOwnProperty, rs = {};
function is(e, t) {
  const n = t || rs, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), o = { ...Ua, ...n.handlers }, a = {
    all: u,
    applyData: os,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: l,
    footnoteOrder: [],
    handlers: o,
    one: s,
    options: n,
    patch: ls,
    wrap: ss
  };
  return Ur(e, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const p = c.type === "definition" ? r : i, g = String(c.identifier).toUpperCase();
      p.has(g) || p.set(g, c);
    }
  }), a;
  function s(c, p) {
    const g = c.type, h = a.handlers[g];
    if (Xt.call(a.handlers, g) && h)
      return h(a, c, p);
    if (a.options.passThrough && a.options.passThrough.includes(g)) {
      if ("children" in c) {
        const { children: k, ...L } = c, b = xt(L);
        return b.children = a.all(c), b;
      }
      return xt(c);
    }
    return (a.options.unknownHandler || as)(a, c, p);
  }
  function u(c) {
    const p = [];
    if ("children" in c) {
      const g = c.children;
      let h = -1;
      for (; ++h < g.length; ) {
        const w = a.one(g[h], c);
        if (w) {
          if (h && g[h - 1].type === "break" && (!Array.isArray(w) && w.type === "text" && (w.value = Wn(w.value)), !Array.isArray(w) && w.type === "element")) {
            const k = w.children[0];
            k && k.type === "text" && (k.value = Wn(k.value));
          }
          Array.isArray(w) ? p.push(...w) : p.push(w);
        }
      }
    }
    return p;
  }
}
function ls(e, t) {
  e.position && (t.position = Hi(e));
}
function os(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, l = e.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element")
        n.tagName = r;
      else {
        const o = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: o };
      }
    n.type === "element" && l && Object.assign(n.properties, xt(l)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function as(e, t) {
  const n = t.data || {}, r = "value" in t && !(Xt.call(n, "hProperties") || Xt.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function ss(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Wn(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function qn(e, t) {
  const n = is(e, t), r = n.one(e, void 0), i = qa(n), l = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && l.children.push({ type: "text", value: `
` }, i), l;
}
function us(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      qn(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      qn(n, { file: r, ...e || t })
    );
  };
}
function Yn(e) {
  if (e)
    throw e;
}
var yt = Object.prototype.hasOwnProperty, Hr = Object.prototype.toString, Xn = Object.defineProperty, Jn = Object.getOwnPropertyDescriptor, Gn = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : Hr.call(t) === "[object Array]";
}, Qn = function(t) {
  if (!t || Hr.call(t) !== "[object Object]")
    return !1;
  var n = yt.call(t, "constructor"), r = t.constructor && t.constructor.prototype && yt.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || yt.call(t, i);
}, Kn = function(t, n) {
  Xn && n.name === "__proto__" ? Xn(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, er = function(t, n) {
  if (n === "__proto__")
    if (yt.call(t, n)) {
      if (Jn)
        return Jn(t, n).value;
    } else return;
  return t[n];
}, cs = function e() {
  var t, n, r, i, l, o, a = arguments[0], s = 1, u = arguments.length, c = !1;
  for (typeof a == "boolean" && (c = a, a = arguments[1] || {}, s = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); s < u; ++s)
    if (t = arguments[s], t != null)
      for (n in t)
        r = er(a, n), i = er(t, n), a !== i && (c && i && (Qn(i) || (l = Gn(i))) ? (l ? (l = !1, o = r && Gn(r) ? r : []) : o = r && Qn(r) ? r : {}, Kn(a, { name: n, newValue: e(c, o, i) })) : typeof i < "u" && Kn(a, { name: n, newValue: i }));
  return a;
};
const Pt = /* @__PURE__ */ dr(cs);
function Jt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function hs() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let l = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    a(null, ...i);
    function a(s, ...u) {
      const c = e[++l];
      let p = -1;
      if (s) {
        o(s);
        return;
      }
      for (; ++p < i.length; )
        (u[p] === null || u[p] === void 0) && (u[p] = i[p]);
      i = u, c ? ps(c, a)(...u) : o(null, ...u);
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
function ps(e, t) {
  let n;
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
      if (a && n)
        throw c;
      return i(c);
    }
    a || (s && s.then && typeof s.then == "function" ? s.then(l, i) : s instanceof Error ? i(s) : l(s));
  }
  function i(o, ...a) {
    n || (n = !0, t(o, ...a));
  }
  function l(o) {
    i(null, o);
  }
}
const Se = { basename: ds, dirname: fs, extname: ms, join: gs, sep: "/" };
function ds(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  rt(e);
  let n = 0, r = -1, i = e.length, l;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (l) {
          n = i + 1;
          break;
        }
      } else r < 0 && (l = !0, r = i + 1);
    return r < 0 ? "" : e.slice(n, r);
  }
  if (t === e)
    return "";
  let o = -1, a = t.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (l) {
        n = i + 1;
        break;
      }
    } else
      o < 0 && (l = !0, o = i + 1), a > -1 && (e.codePointAt(i) === t.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = o));
  return n === r ? r = o : r < 0 && (r = e.length), e.slice(n, r);
}
function fs(e) {
  if (rt(e), e.length === 0)
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
function ms(e) {
  rt(e);
  let t = e.length, n = -1, r = 0, i = -1, l = 0, o;
  for (; t--; ) {
    const a = e.codePointAt(t);
    if (a === 47) {
      if (o) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (o = !0, n = t + 1), a === 46 ? i < 0 ? i = t : l !== 1 && (l = 1) : i > -1 && (l = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  l === 0 || // The (right-most) trimmed path component is exactly `..`.
  l === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function gs(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    rt(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : ys(n);
}
function ys(e) {
  rt(e);
  const t = e.codePointAt(0) === 47;
  let n = Cs(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function Cs(e, t) {
  let n = "", r = 0, i = -1, l = 0, o = -1, a, s;
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
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (s = n.lastIndexOf("/"), s !== n.length - 1) {
              s < 0 ? (n = "", r = 0) : (n = n.slice(0, s), r = n.length - 1 - n.lastIndexOf("/")), i = o, l = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = o, l = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + e.slice(i + 1, o) : n = e.slice(i + 1, o), r = o - i - 1;
      i = o, l = 0;
    } else a === 46 && l > -1 ? l++ : l = -1;
  }
  return n;
}
function rt(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const ws = { cwd: xs };
function xs() {
  return "/";
}
function Gt(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function ks(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Gt(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return bs(e);
}
function bs(e) {
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
const Dt = (
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
class jr {
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
    t ? Gt(t) ? n = { path: t } : typeof t == "string" || Ss(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : ws.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Dt.length; ) {
      const l = Dt[r];
      l in n && n[l] !== void 0 && n[l] !== null && (this[l] = l === "history" ? [...n[l]] : n[l]);
    }
    let i;
    for (i in n)
      Dt.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Se.basename(this.path) : void 0;
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
    Ot(t, "basename"), zt(t, "basename"), this.path = Se.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Se.dirname(this.path) : void 0;
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
    tr(this.basename, "dirname"), this.path = Se.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Se.extname(this.path) : void 0;
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
    if (zt(t, "extname"), tr(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Se.join(this.dirname, this.stem + (t || ""));
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
    Gt(t) && (t = ks(t)), Ot(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Se.basename(this.path, this.extname) : void 0;
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
    Ot(t, "stem"), zt(t, "stem"), this.path = Se.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new ae(
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
function zt(e, t) {
  if (e && e.includes(Se.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + Se.sep + "`"
    );
}
function Ot(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function tr(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function Ss(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const _s = (
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
), vs = {}.hasOwnProperty;
class fn extends _s {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = hs();
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
      new fn()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Pt(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (Ft("data", this.frozen), this.namespace[t] = n, this) : vs.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Ft("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = mt(t), r = this.parser || this.Parser;
    return Rt("parse", r), r(String(n), n);
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
    return this.freeze(), Rt("process", this.parser || this.Parser), Bt("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(l, o) {
      const a = mt(t), s = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(s, a, function(c, p, g) {
        if (c || !p || !g)
          return u(c);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          p
        ), w = r.stringify(h, g);
        Ts(w) ? g.value = w : g.result = w, u(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          g
        );
      });
      function u(c, p) {
        c || !p ? o(c) : l ? l(p) : n(void 0, p);
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
    return this.freeze(), Rt("processSync", this.parser || this.Parser), Bt("processSync", this.compiler || this.Compiler), this.process(t, i), rr("processSync", "process", n), r;
    function i(l, o) {
      n = !0, Yn(l), r = o;
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
    nr(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? l(void 0, r) : new Promise(l);
    function l(o, a) {
      const s = mt(n);
      i.run(t, s, u);
      function u(c, p, g) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          p || t
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
  runSync(t, n) {
    let r = !1, i;
    return this.run(t, n, l), rr("runSync", "run", r), i;
    function l(o, a) {
      Yn(o), i = a, r = !0;
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
    const r = mt(n), i = this.compiler || this.Compiler;
    return Bt("stringify", i), nr(t), i(t, r);
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
    if (Ft("use", this.frozen), t != null) if (typeof t == "function")
      s(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? a(t) : o(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function l(u) {
      if (typeof u == "function")
        s(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [c, ...p] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          s(c, p);
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
      a(u.plugins), u.settings && (i.settings = Pt(!0, i.settings, u.settings));
    }
    function a(u) {
      let c = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++c < u.length; ) {
          const p = u[c];
          l(p);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function s(u, c) {
      let p = -1, g = -1;
      for (; ++p < r.length; )
        if (r[p][0] === u) {
          g = p;
          break;
        }
      if (g === -1)
        r.push([u, ...c]);
      else if (c.length > 0) {
        let [h, ...w] = c;
        const k = r[g][1];
        Jt(k) && Jt(h) && (h = Pt(!0, k, h)), r[g] = [u, h, ...w];
      }
    }
  }
}
const Es = new fn().freeze();
function Rt(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Bt(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Ft(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function nr(e) {
  if (!Jt(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function rr(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function mt(e) {
  return Is(e) ? e : new jr(e);
}
function Is(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Ts(e) {
  return typeof e == "string" || Ls(e);
}
function Ls(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Ns = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", ir = [], lr = { allowDangerousHtml: !0 }, Ms = /^(https?|ircs?|mailto|xmpp)$/i, As = [
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
function Qt(e) {
  const t = Ps(e), n = Ds(e);
  return zs(t.runSync(t.parse(n), n), e);
}
function Ps(e) {
  const t = e.rehypePlugins || ir, n = e.remarkPlugins || ir, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...lr } : lr;
  return Es().use(fa).use(n).use(us, r).use(t);
}
function Ds(e) {
  const t = e.children || "", n = new jr();
  return typeof t == "string" && (n.value = t), n;
}
function zs(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, l = t.disallowedElements, o = t.skipHtml, a = t.unwrapDisallowed, s = t.urlTransform || Os;
  for (const c of As)
    Object.hasOwn(t, c.from) && ("" + c.from + (c.to ? "use `" + c.to + "` instead" : "remove it") + Ns + c.id, void 0);
  return Ur(e, u), Wi(e, {
    Fragment: Ut,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: d,
    jsxs: A,
    passKeys: !0,
    passNode: !0
  });
  function u(c, p, g) {
    if (c.type === "raw" && g && typeof p == "number")
      return o ? g.children.splice(p, 1) : g.children[p] = { type: "text", value: c.value }, p;
    if (c.type === "element") {
      let h;
      for (h in Nt)
        if (Object.hasOwn(Nt, h) && Object.hasOwn(c.properties, h)) {
          const w = c.properties[h], k = Nt[h];
          (k === null || k.includes(c.tagName)) && (c.properties[h] = s(String(w || ""), h, c));
        }
    }
    if (c.type === "element") {
      let h = n ? !n.includes(c.tagName) : l ? l.includes(c.tagName) : !1;
      if (!h && r && typeof p == "number" && (h = !r(c, p, g)), h && g && typeof p == "number")
        return a && c.children ? g.children.splice(p, 1, ...c.children) : g.children.splice(p, 1), p;
    }
  }
}
function Os(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    Ms.test(e.slice(0, t)) ? e : ""
  );
}
const xe = (...e) => e.filter(Boolean).join(" "), Rs = () => /* @__PURE__ */ A(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ A("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ d(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            "shape-rendering": "crispEdges"
          }
        ),
        /* @__PURE__ */ d("g", { "clip-path": "url(#clip0_121_23927)", children: /* @__PURE__ */ d(
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
            "color-interpolation-filters": "sRGB",
            children: [
              /* @__PURE__ */ d("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }),
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
), Bs = ({ className: e, ...t }) => /* @__PURE__ */ d("form", { className: xe("chat-wrapper__prompt-input", e), ...t }), Vr = Xr(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
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
          const p = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          c.dispatchEvent(p);
        }
      }
      l == null || l(u);
    };
    return /* @__PURE__ */ d(
      "textarea",
      {
        ref: a,
        className: xe("chat-wrapper__prompt-textarea", t),
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
Vr.displayName = "PromptInputTextarea";
const Fs = ({
  className: e,
  ...t
}) => /* @__PURE__ */ d("div", { className: xe("chat-wrapper__prompt-toolbar", e), ...t }), Us = ({
  className: e,
  ...t
}) => /* @__PURE__ */ d("div", { className: xe("chat-wrapper__prompt-tools", e), ...t }), Hs = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const l = t === "default" && (typeof r == "string" || Yr.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ d(
    "button",
    {
      className: xe(
        "chat-wrapper__prompt-button",
        `chat-wrapper__prompt-button--${e}`,
        `chat-wrapper__prompt-button--${l}`,
        n
      ),
      type: "button",
      ...i,
      children: r
    }
  );
}, js = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = "idle",
  children: i,
  disabled: l,
  ...o
}) => {
  let a = /* @__PURE__ */ d(Rs, {});
  const s = l || r === "submitted" || r === "streaming";
  return /* @__PURE__ */ d(
    "button",
    {
      className: xe(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${t}`,
        `chat-wrapper__prompt-submit--${n}`,
        // status === "streaming" && "chat-wrapper__prompt-submit--stop",
        e
      ),
      type: "submit",
      disabled: s,
      ...o,
      children: i ?? a
    }
  );
}, n1 = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ d("select", { className: xe("chat-wrapper__prompt-select", e), ...n, children: t }), r1 = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ d(
  "button",
  {
    className: xe("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), i1 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ d(
  "div",
  {
    className: xe("chat-wrapper__prompt-select-content", e),
    ...t
  }
), l1 = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ d(
  "div",
  {
    className: xe("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), o1 = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ d(
  "span",
  {
    className: xe("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
);
function Vs({ children: e }) {
  return /* @__PURE__ */ d("div", { className: "chat-wrapper__reasoning", children: e });
}
function $s({
  title: e,
  status: t = "processing"
}) {
  return /* @__PURE__ */ A("div", { className: "chat-wrapper__reasoning-trigger", children: [
    /* @__PURE__ */ d("div", { className: "chat-wrapper__reasoning-icon", children: (() => {
      switch (t) {
        case "completed":
          return /* @__PURE__ */ d("div", { className: "chat-wrapper__reasoning-checkmark", children: /* @__PURE__ */ d(
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
          return /* @__PURE__ */ d("div", { className: "chat-wrapper__reasoning-error", children: /* @__PURE__ */ d(
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
          return /* @__PURE__ */ d("div", { className: "chat-wrapper__reasoning-processing", children: /* @__PURE__ */ d(
            "svg",
            {
              width: "10",
              height: "14",
              viewBox: "0 0 10 14",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ d(
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
    /* @__PURE__ */ d("span", { className: "chat-wrapper__reasoning-title", children: e }),
    (e.includes("Thinking") || e.includes("Processing")) && /* @__PURE__ */ d("div", { className: "chat-wrapper__reasoning-arrow", children: /* @__PURE__ */ A(
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
    ) })
  ] });
}
function Zs({ children: e }) {
  return /* @__PURE__ */ d("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__reasoning-text", children: e }) });
}
function Ws({ children: e }) {
  return /* @__PURE__ */ d("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function qs({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  console.log("clog toolData", n);
  const o = (() => {
    if (!r || !i) return null;
    const s = i.find((u) => u.name === r);
    return (s == null ? void 0 : s.description) || null;
  })();
  return /* @__PURE__ */ d("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ A("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
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
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
            "svg",
            {
              width: "16",
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
          /* @__PURE__ */ d("span", { children: "Running..." })
        ] });
      case "completed":
        return /* @__PURE__ */ A("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
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
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
            "svg",
            {
              width: "16",
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
                    children: /* @__PURE__ */ d("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
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
        ] });
      case "error":
        return /* @__PURE__ */ A("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ d("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ d(
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
        return /* @__PURE__ */ A("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
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
          /* @__PURE__ */ A("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
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
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
            "svg",
            {
              width: "16",
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
function Ys({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ A("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
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
class Xs {
  constructor() {
    se(this, "sessionId", "");
    se(this, "ws", null);
    se(this, "isConnected", !1);
    se(this, "onSetMessage");
    se(this, "onSystemMessage");
    se(this, "onBusinessDataUpdate");
    se(this, "onReasoningUpdate");
    se(this, "clientTools", {});
    se(this, "toolSchemas", []);
    se(this, "businessContext", {});
    se(this, "reconnectAttempts", 0);
    se(this, "reconnectTimer", null);
    this.sessionId = `business_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  async onInit(t) {
    return this.onSetMessage = t.onSetMessage, this.onSystemMessage = t.onSystemMessage, this.onBusinessDataUpdate = t.onBusinessDataUpdate, this.onReasoningUpdate = t.onReasoningUpdate, this.clientTools = t.clientTools || {}, this.toolSchemas = t.toolSchemas || [], this.businessContext = t.businessContext, new Promise((n, r) => {
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
            ), n();
            return;
          }
          r(i);
        }, this.ws.onmessage = (i) => {
          const l = this.handleWebSocketMessage(i);
          l && l.type === "tools_configured" && (this.onSystemMessage && this.onSystemMessage("✅ Client tools configured successfully"), n()), l && l.type === "session_established" && (!this.toolSchemas || this.toolSchemas.length === 0) && n();
        }, this.ws.onclose = () => {
          this.isConnected = !1, console.log("WebSocket disconnected");
        };
      } catch {
        n();
      }
    });
  }
  handleWebSocketMessage(t) {
    var n, r, i, l, o;
    try {
      const a = JSON.parse(t.data);
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
            if (((n = a.data) == null ? void 0 : n.type) === "text-delta" && this.onSetMessage && a.data.textDelta)
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
  async handleToolCallRequest(t) {
    const { callId: n, toolName: r, parameters: i } = t;
    this.onReasoningUpdate && this.onReasoningUpdate(!0, `🔧 Handling: ${r}`, t);
    try {
      const l = this.clientTools[r];
      if (!l)
        throw new Error(`Tool not found: ${r}`);
      const o = await l(i);
      this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(
        JSON.stringify({
          type: "tool_call_response",
          callId: n,
          result: o
        })
      ), this.onReasoningUpdate && this.onReasoningUpdate(!1, `✅ Completed: ${r}`, t);
    } catch (l) {
      console.error("Error executing tool:", l), this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(
        JSON.stringify({
          type: "tool_call_response",
          callId: n,
          error: l instanceof Error ? l.message : "Unknown error"
        })
      ), this.onReasoningUpdate && this.onReasoningUpdate(
        !1,
        `❌ Error: ${r} - ${l}`,
        t
      );
    }
  }
  async onTriggerMessage(t, n = "shop") {
    if (!this.isConnected)
      throw new Error("Client not connected");
    if (!this.ws)
      throw new Error("WebSocket not available");
    try {
      this.ws.send(
        JSON.stringify({
          type: "chat_message",
          content: t,
          agentType: n
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
      const t = await fetch(
        `http://localhost:3007/session/${this.sessionId}/data`
      );
      if (t.ok)
        return await t.json();
    } catch (t) {
      console.error("Error fetching business data:", t);
    }
    return null;
  }
  // Method to update business context
  updateBusinessContext(t) {
    this.businessContext = { ...this.businessContext, ...t }, this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(
      JSON.stringify({
        type: "update_business_context",
        businessContext: this.businessContext
      })
    );
  }
  // Method to add new client tools
  addClientTools(t, n) {
    this.clientTools = { ...this.clientTools, ...t }, n && (this.toolSchemas = [...this.toolSchemas, ...n]), this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(
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
function Js({ message: e }) {
  const [t, n] = te(!0);
  return console.log("clog message:", e), /* @__PURE__ */ A("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ d(
      "button",
      {
        className: "chat-wrapper__system-message-trigger",
        onClick: () => n(!t),
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
        children: e.role === "system" ? /* @__PURE__ */ A("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
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
          /* @__PURE__ */ A("span", { children: [
            "AI text input <show-toolname>",
            "..."
          ] }),
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
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
          ) }) }),
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
            "svg",
            {
              width: "16",
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
        ] }) : e.role === "assistant" ? e.isStreaming ? /* @__PURE__ */ A("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ d(
            "svg",
            {
              width: "10",
              height: "14",
              viewBox: "0 0 10 14",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ d(
                "path",
                {
                  d: "M3.79576 11.3819C3.46532 11.3819 3.18343 11.2644 2.9501 11.0294C2.71676 10.7944 2.6001 10.5119 2.6001 10.1819V9.06527C1.96676 8.65082 1.4751 8.11943 1.1251 7.4711C0.775098 6.82277 0.600098 6.12638 0.600098 5.38193C0.600098 4.15627 1.02665 3.11649 1.87976 2.2626C2.73288 1.40882 3.77176 0.981934 4.99643 0.981934C6.2211 0.981934 7.26121 1.40882 8.11676 2.2626C8.97232 3.11649 9.4001 4.15627 9.4001 5.38193C9.4001 6.12438 9.2251 6.8211 8.8751 7.4721C8.5251 8.1231 8.03343 8.65416 7.4001 9.06527V10.1819C7.4001 10.5119 7.28243 10.7944 7.0471 11.0294C6.81188 11.2644 6.52904 11.3819 6.1986 11.3819H3.79576ZM3.8001 10.1819H6.2001V8.41527L6.7501 8.06527C7.20565 7.77638 7.56121 7.39204 7.81676 6.91227C8.07232 6.43249 8.2001 5.92238 8.2001 5.38193C8.2001 4.4966 7.88771 3.74193 7.26293 3.11793C6.63826 2.49393 5.88271 2.18193 4.99626 2.18193C4.10993 2.18193 3.35565 2.49393 2.73343 3.11793C2.11121 3.74193 1.8001 4.4966 1.8001 5.38193C1.8001 5.92238 1.92788 6.43249 2.18343 6.91227C2.43899 7.39204 2.79454 7.77638 3.2501 8.06527L3.8001 8.41527V10.1819ZM3.8001 13.7819C3.57343 13.7819 3.38343 13.7053 3.2301 13.5519C3.07676 13.3986 3.0001 13.2086 3.0001 12.9819V12.5819H7.0001V12.9819C7.0001 13.2086 6.92343 13.3986 6.7701 13.5519C6.61676 13.7053 6.42676 13.7819 6.2001 13.7819H3.8001Z",
                  fill: "#637381"
                }
              )
            }
          ) }),
          /* @__PURE__ */ d("span", { children: "Thinking..." }),
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
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
          ) }) })
        ] }) : /* @__PURE__ */ A("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ d(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ d(
                "path",
                {
                  d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z",
                  fill: "#10b981"
                }
              )
            }
          ) }),
          /* @__PURE__ */ d("span", { children: "Thought" }),
          /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ A(
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
          ) }) })
        ] }) : "💬 Message"
      }
    ),
    t && /* @__PURE__ */ d(
      "div",
      {
        className: "chat-wrapper__system-message-content",
        style: {
          padding: "0 12px 12px 0px"
        },
        children: /* @__PURE__ */ d("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ d(
          Qt,
          {
            components: {
              pre: ({ children: i }) => /* @__PURE__ */ d("pre", { className: "chat-wrapper__code-block", children: i }),
              code: ({ children: i, className: l }) => !l ? /* @__PURE__ */ d("code", { className: "chat-wrapper__inline-code", children: i }) : /* @__PURE__ */ d("code", { className: "chat-wrapper__code", children: i }),
              p: ({ children: i }) => /* @__PURE__ */ d("p", { className: "chat-wrapper__paragraph", children: i }),
              strong: ({ children: i }) => /* @__PURE__ */ d("strong", { className: "chat-wrapper__bold", children: i }),
              em: ({ children: i }) => /* @__PURE__ */ d("em", { className: "chat-wrapper__italic", children: i })
            },
            children: e.content.trim()
          }
        ) })
      }
    )
  ] });
}
function Gs({
  apiUrl: e,
  config: t,
  tools: n,
  clientTools: r,
  initialMessages: i = []
}) {
  var be;
  const [l, o] = te(
    null
  ), [a, s] = te(!1), [u, c] = te(""), p = He(null), [g, h] = te(i), [w, k] = te(""), [L, b] = te(!1), [P, I] = te(!1), [j, U] = te("idle"), [x, V] = te(!1), [O, $] = te(t.mode), [W] = te([]), [T, N] = te([]), [q, J] = te(""), [F, Q] = te(!1), [, ne] = te(""), [oe, Ce] = te(!1), [, f] = te(/* @__PURE__ */ new Map()), ue = He(null), de = He(null), m = He(!0), ie = ee(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), Ee = ee(
    (y, M) => M === !1 ? y.includes("❌") ? "error" : "completed" : y.includes("✅ Completed:") || y.includes("✅") ? "completed" : y.includes("❌") ? "error" : "processing",
    []
  ), le = ee(
    (y, M) => M === !1 ? y.includes("❌") ? "Error" : "Completed" : y.includes("✅ Completed:") || y.includes("✅") ? "Completed" : y.includes("❌") ? "Error" : (y.includes("🔧 Handling:"), "Thinking..."),
    []
  ), Ne = ee(
    (y, M) => M === !1 ? y.includes("❌") ? "Tool Error" : "Tool Completed" : y.includes("✅ Completed:") || y.includes("✅") ? "Tool Completed" : y.includes("❌") ? "Tool Error" : (y.includes("🔧 Handling:"), "Tool Processing..."),
    []
  ), ke = ee(
    (y, M) => M === !1 ? y.includes("❌") ? "error" : "completed" : y.includes("✅ Completed:") || y.includes("✅") ? "completed" : y.includes("❌") ? "error" : "processing",
    []
  ), fe = ee(
    (y, M) => {
      h((_) => [
        ..._,
        {
          id: ie(),
          role: y,
          content: M,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [ie]
  ), Ie = ee(
    (y) => {
      const M = de.current;
      M && h(
        (_) => _.map((E) => E.id === M ? y(E) : E)
      );
    },
    []
  ), Me = ee(
    () => {
      b(!1), Q(!1), U("idle"), Ie((y) => ({
        ...y,
        isStreaming: !1
      }));
    },
    [fe, Ie]
  ), it = ee(
    (y) => {
      console.error("Chat error:", y), b(!1), Q(!1), U("error"), fe("system", `❌ Chat error: ${y}`);
    },
    [fe]
  ), lt = ee(async () => {
    try {
      const y = new Xs();
      p.current = y, o(y), c(y.getSessionId());
      const M = {};
      await y.onInit({
        toolSchemas: r,
        clientTools: n,
        businessContext: M,
        onSetMessage: (_) => {
          h((E) => {
            const K = E[E.length - 1];
            if (K && K.role === "assistant")
              return [
                ...E.slice(0, -1),
                {
                  ...K,
                  content: K.content + _
                }
              ];
            {
              Q(!1);
              const G = ie();
              return de.current = G, [
                ...E,
                {
                  id: G,
                  role: "assistant",
                  content: _,
                  timestamp: /* @__PURE__ */ new Date(),
                  isStreaming: !0
                }
              ];
            }
          });
        },
        onSystemMessage: (_) => {
          if (_.includes("Chat completed"))
            Me();
          else if (_.includes("Chat error")) {
            const E = _.match(/Chat error: (.+)/);
            E && it(E[1]);
          }
        },
        onReasoningUpdate: (_, E, K) => {
          console.log("🤔 Reasoning update:", {
            isThinking: _,
            content: E,
            toolCallRequest: K
          });
          const { callId: G } = K || {};
          if (Ce(_), ne(E), !G) {
            console.log("⚠️ No callId provided for reasoning update");
            return;
          }
          const Be = E.includes("🔧 Handling:"), Tt = E.includes("✅ Completed:"), ct = E.includes("❌ Error:");
          console.log("🔍 Debug reasoning conditions:", {
            isToolStarted: Be,
            isToolCompleted: Tt,
            isToolError: ct,
            callId: G,
            isHandlingTool: oe
          }), f(($r) => {
            const ht = new Map($r), Xe = ht.get(G);
            if (Be && !Xe) {
              const Ae = E.match(/🔧 Handling: (.+)/), Pe = Ae ? Ae[1] : "Unknown Tool", pt = ie();
              ht.set(G, pt);
              const Fe = {
                id: pt,
                role: "tooling",
                content: E,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0,
                toolData: {
                  ...K,
                  toolName: Pe,
                  callId: G,
                  status: "processing"
                }
              };
              h((Zr) => [...Zr, Fe]);
            } else if ((Tt || ct) && Xe) {
              const Ae = E.match(
                /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
              ), Pe = Ae ? Ae[1] : "Unknown Tool";
              h(
                (pt) => pt.map(
                  (Fe) => Fe.id === Xe ? {
                    ...Fe,
                    content: E,
                    isStreaming: !1,
                    // Mark as completed
                    toolData: {
                      ...Fe.toolData,
                      toolName: Pe,
                      status: ct ? "error" : "completed",
                      callId: G ?? ""
                    }
                  } : Fe
                )
              ), ht.delete(G);
            } else Xe && oe && !Tt && !ct && h(
              (Ae) => Ae.map(
                (Pe) => Pe.id === Xe ? {
                  ...Pe,
                  content: E,
                  isStreaming: !0
                } : Pe
              )
            );
            return ht;
          });
        },
        onBusinessDataUpdate: (_) => {
          t.onBusinessDataUpdate && t.onBusinessDataUpdate(_);
        }
      }), s(!0), console.log("BusinessAgentClient connected");
    } catch (y) {
      console.error("Error connecting BusinessAgentClient:", y), s(!1);
    }
  }, [
    e,
    r,
    n,
    t,
    ie,
    fe,
    Me,
    it
  ]), ot = ee(() => {
    p.current && (p.current.disconnect(), p.current = null), o(null), s(!1), c("");
  }, []), We = ee(() => {
    console.log("🔍 DEBUG: resetToolHandling called! Stack trace:"), console.trace(), Ce(!1), m.current = !0;
  }, []), qe = ee(() => {
    var y;
    (y = ue.current) == null || y.scrollIntoView({ behavior: "smooth" });
  }, []);
  De(() => {
    qe();
  }, [g, qe]), De(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(q);
  }, [q, t]), De(() => {
    console.log("🔍 DEBUG: isHandlingTool state changed:", oe);
  }, [oe]), De(() => {
    console.log(
      "💭 DEBUG: isHandlingReasoning state changed:"
    );
  }, []), De(() => (console.log("Connecting BusinessAgentClient..."), lt(), () => {
    ot();
  }), [lt, ot]), De(() => {
    const y = setInterval(() => {
      if (p.current) {
        const M = p.current.getConnectionStatus();
        s(M.connected);
      }
    }, 1e3);
    return () => clearInterval(y);
  }, []);
  const at = ee(
    async (y, M) => {
      if (!y.trim() || L || !l || !a)
        return;
      const _ = {
        id: ie(),
        role: "user",
        content: y.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: M
      };
      h((E) => [...E, _]), b(!0), Q(!0), U("submitted"), J("Starting...");
      try {
        await l.onTriggerMessage(_.content), U("streaming");
      } catch (E) {
        console.error("Agent client send error:", E), Q(!1), U("error"), fe(
          "system",
          `Sorry, there was an error: ${E instanceof Error ? E.message : "Unknown error"}`
        ), t.onError && t.onError(
          E instanceof Error ? E : new Error("Unknown error")
        ), b(!1), U("idle"), J("");
      }
    },
    [L, l, a, ie, fe, t]
  ), vt = ee(() => {
    b(!1), U("idle"), J(""), Q(!1), ne(""), We();
  }, [We]), Ye = ee(async (y) => {
    console.log("Files selected:", y);
    const M = [];
    for (const _ of y)
      try {
        if (_.type.startsWith("image/")) {
          const E = new FileReader(), K = await new Promise((G, Be) => {
            E.onload = () => G(E.result), E.onerror = Be, E.readAsDataURL(_);
          });
          M.push(K);
        } else if (_.type.startsWith("text/") || _.name.endsWith(".txt")) {
          const E = new FileReader(), K = await new Promise((G, Be) => {
            E.onload = () => G(E.result), E.onerror = Be, E.readAsText(_);
          });
          console.log("Text file content:", K);
        } else
          console.log("File type not supported for preview:", _.type), M.push(`data:application/octet-stream;base64,${_.name}`);
      } catch (E) {
        console.error("Error processing file:", E);
      }
    M.length > 0 && (N((_) => [..._, ...M]), console.log("Added media:", M));
  }, []), st = ee(() => {
    I(!0);
  }, []), Re = ee(() => {
    I(!1);
  }, []), ut = ee(() => {
    V((y) => !y);
  }, []), Et = ee(() => {
    $((y) => y === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  De(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const y = (M) => {
      M.key === "Escape" && O === "modal" && P && Re();
    };
    if (O === "modal" && P)
      return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [O, P, Re]);
  const It = ((...y) => y.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${O}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`,
    x && "chat-wrapper--collapsed",
    O === "embedded" && t.constrainedHeight && "chat-wrapper--constrained"
  ), C = () => O === "modal" && P ? /* @__PURE__ */ d("div", { className: "chat-wrapper-overlay", onClick: Re }) : null, v = () => {
    var M;
    if (O === "modal" && !P || O === "sidebar" && x || O === "fullscreen" && x) {
      const _ = O === "modal" ? st : ut, E = O === "modal" ? `Open ${t.appName}` : `Expand ${t.appName}`;
      return /* @__PURE__ */ A(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: _,
          title: E,
          children: [
            /* @__PURE__ */ A(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: "chat-wrapper__bubble-icon",
                children: [
                  /* @__PURE__ */ d(
                    "path",
                    {
                      d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
                      fill: "currentColor"
                    }
                  ),
                  /* @__PURE__ */ d("circle", { cx: "7", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ d("circle", { cx: "12", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ d("circle", { cx: "17", cy: "10", r: "1", fill: "currentColor" })
                ]
              }
            ),
            ((M = t.features) == null ? void 0 : M.showBubbleText) !== !1 && /* @__PURE__ */ d("span", { className: "chat-wrapper__bubble-text", children: t.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, z = () => O === "modal" && P ? /* @__PURE__ */ d(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: Re,
      title: "Close chat",
      children: /* @__PURE__ */ d(
        "svg",
        {
          width: "20",
          height: "20",
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
  ) : null, B = () => {
    if ((O === "sidebar" || O === "fullscreen") && !x) {
      const y = O === "fullscreen";
      return /* @__PURE__ */ d(
        "button",
        {
          className: y ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: Et,
          title: y ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ d(
            "svg",
            {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: y ? (
                // Minimize icon (arrows pointing inward)
                /* @__PURE__ */ d(
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
                /* @__PURE__ */ d(
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
  }, Z = () => (O === "sidebar" || O === "fullscreen") && !x ? /* @__PURE__ */ d(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: ut,
      title: "Collapse chat",
      children: /* @__PURE__ */ d(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ d(
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
    var y;
    return !((y = t.features) != null && y.showToolResults) || W.length === 0 ? null : /* @__PURE__ */ A("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ d("h4", { children: "Tool Results" }),
      /* @__PURE__ */ d("div", { className: "chat-wrapper__tool-results-list", children: W.map((M) => /* @__PURE__ */ A("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ d("div", { className: "chat-wrapper__tool-result-title", children: M.title }),
        M.description && /* @__PURE__ */ d("div", { className: "chat-wrapper__tool-result-description", children: M.description }),
        /* @__PURE__ */ A("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          M.status || "completed"
        ] })
      ] }, M.id)) })
    ] });
  };
  return O === "modal" && !P || (O === "sidebar" || O === "fullscreen") && x ? v() : (console.log("clog messages", g), /* @__PURE__ */ A(Ut, { children: [
    C(),
    /* @__PURE__ */ A("div", { className: It, style: t.customStyles, children: [
      /* @__PURE__ */ A("div", { className: "chat-wrapper__header", children: [
        /* @__PURE__ */ A("div", { className: "chat-wrapper__title-area", children: [
          /* @__PURE__ */ d("h2", { className: "chat-wrapper__title", children: t.appName }),
          /* @__PURE__ */ d("div", { className: "chat-wrapper__connection-status", children: /* @__PURE__ */ d(
            "span",
            {
              className: `chat-wrapper__connection-indicator ${a ? "connected" : "disconnected"}`,
              title: a ? `Connected to WebSocket${u ? ` (Session: ${u.slice(-8)})` : ""}` : "Disconnected from WebSocket",
              children: a ? "🟢" : "🔴"
            }
          ) })
        ] }),
        /* @__PURE__ */ A("div", { className: "chat-wrapper__header-controls", children: [
          B(),
          Z(),
          z()
        ] })
      ] }),
      !x && /* @__PURE__ */ A(Ut, { children: [
        /* @__PURE__ */ A("div", { className: "chat-wrapper__messages", children: [
          g.map((y) => {
            var M;
            return /* @__PURE__ */ d(
              "div",
              {
                className: `chat-wrapper__message chat-wrapper__message--${y.role === "system" ? "assistant" : y.role === "reasoning" ? "reasoning" : y.role === "tooling" ? "tooling" : y.role}`,
                children: y.role === "reasoning" ? (
                  /* Reasoning message - no content wrapper */
                  /* @__PURE__ */ A(Vs, { isStreaming: y.isStreaming || !1, children: [
                    /* @__PURE__ */ d(
                      $s,
                      {
                        title: le(
                          y.content,
                          y.isStreaming
                        ),
                        status: Ee(
                          y.content,
                          y.isStreaming
                        )
                      }
                    ),
                    /* @__PURE__ */ d(Zs, { children: y.content })
                  ] })
                ) : y.role === "tooling" ? (
                  /* Tooling message - no content wrapper */
                  /* @__PURE__ */ d(Ws, { isStreaming: y.isStreaming || !1, children: /* @__PURE__ */ d(
                    qs,
                    {
                      title: Ne(
                        y.content,
                        y.isStreaming
                      ),
                      status: ke(
                        y.content,
                        y.isStreaming
                      ),
                      toolData: y.toolData,
                      toolName: (M = y.toolData) == null ? void 0 : M.toolName,
                      clientTools: r
                    }
                  ) })
                ) : /* @__PURE__ */ d("div", { className: "chat-wrapper__message-content", children: y.role === "assistant" && y.isStreaming && y.content === "" && y.id === de.current ? (
                  /* Show streaming indicator when no content yet */
                  /* @__PURE__ */ A("div", { className: "chat-wrapper__streaming-placeholder", children: [
                    /* @__PURE__ */ d(Ys, { size: 16, variant: "dots" }),
                    /* @__PURE__ */ d("span", { children: "Thinking" })
                  ] })
                ) : y.role === "system" ? (
                  /* System message with collapsible tool result */
                  /* @__PURE__ */ d(Js, { message: y })
                ) : y.role === "assistant" ? (
                  /* Assistant message with regular markdown display */
                  /* @__PURE__ */ d("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ d(
                    Qt,
                    {
                      components: {
                        pre: ({ children: _ }) => /* @__PURE__ */ d("pre", { className: "chat-wrapper__code-block", children: _ }),
                        code: ({ children: _, className: E }) => !E ? /* @__PURE__ */ d("code", { className: "chat-wrapper__inline-code", children: _ }) : /* @__PURE__ */ d("code", { className: "chat-wrapper__code-block", children: _ }),
                        ul: ({ children: _ }) => /* @__PURE__ */ d("ul", { className: "chat-wrapper__list", children: _ }),
                        ol: ({ children: _ }) => /* @__PURE__ */ d("ol", { className: "chat-wrapper__ordered-list", children: _ }),
                        li: ({ children: _ }) => /* @__PURE__ */ d("li", { className: "chat-wrapper__list-item", children: _ })
                      },
                      children: y.content
                    }
                  ) }) })
                ) : (
                  /* User message display with markdown */
                  /* @__PURE__ */ A("div", { className: "chat-wrapper__regular-message", children: [
                    /* @__PURE__ */ d("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ d(
                      Qt,
                      {
                        components: {
                          pre: ({ children: _ }) => /* @__PURE__ */ d("pre", { className: "chat-wrapper__code-block", children: _ }),
                          code: ({ children: _, className: E }) => !E ? /* @__PURE__ */ d("code", { className: "chat-wrapper__inline-code", children: _ }) : /* @__PURE__ */ d("code", { className: "chat-wrapper__code", children: _ }),
                          p: ({ children: _ }) => /* @__PURE__ */ d("p", { className: "chat-wrapper__paragraph", children: _ }),
                          h1: ({ children: _ }) => /* @__PURE__ */ d("h1", { className: "chat-wrapper__heading-1", children: _ }),
                          h2: ({ children: _ }) => /* @__PURE__ */ d("h2", { className: "chat-wrapper__heading-2", children: _ }),
                          h3: ({ children: _ }) => /* @__PURE__ */ d("h3", { className: "chat-wrapper__heading-3", children: _ }),
                          ul: ({ children: _ }) => /* @__PURE__ */ d("ul", { className: "chat-wrapper__list", children: _ }),
                          ol: ({ children: _ }) => /* @__PURE__ */ d("ol", { className: "chat-wrapper__ordered-list", children: _ }),
                          li: ({ children: _ }) => /* @__PURE__ */ d("li", { className: "chat-wrapper__list-item", children: _ }),
                          blockquote: ({ children: _ }) => /* @__PURE__ */ d("blockquote", { className: "chat-wrapper__blockquote", children: _ }),
                          strong: ({ children: _ }) => /* @__PURE__ */ d("strong", { className: "chat-wrapper__bold", children: _ }),
                          em: ({ children: _ }) => /* @__PURE__ */ d("em", { className: "chat-wrapper__italic", children: _ })
                        },
                        children: y.content.trim()
                      }
                    ) }),
                    y.role === "user" && y.media && y.media.length > 0 && /* @__PURE__ */ d("div", { className: "chat-wrapper__media-grid", children: y.media.map((_, E) => /* @__PURE__ */ d(
                      "div",
                      {
                        className: "chat-wrapper__media-item",
                        children: /* @__PURE__ */ d(
                          "img",
                          {
                            src: _,
                            alt: `Attached image ${E + 1}`,
                            className: "chat-wrapper__media-image"
                          }
                        )
                      },
                      E
                    )) })
                  ] })
                ) })
              },
              y.id
            );
          }),
          F && !oe && /* @__PURE__ */ d("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ d("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ A("div", { className: "chat-wrapper__thinking-dots", children: [
            /* @__PURE__ */ d("span", {}),
            /* @__PURE__ */ d("span", {}),
            /* @__PURE__ */ d("span", {})
          ] }) }) }) }),
          /* @__PURE__ */ d("div", { ref: ue })
        ] }),
        me(),
        T.length > 0 && /* @__PURE__ */ A(
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
              /* @__PURE__ */ A(
                "span",
                {
                  style: {
                    fontSize: "12px",
                    color: "#6b7280",
                    fontWeight: "500"
                  },
                  children: [
                    T.length,
                    " file",
                    T.length > 1 ? "s" : "",
                    " attached:"
                  ]
                }
              ),
              T.map((y, M) => /* @__PURE__ */ A(
                "div",
                {
                  style: {
                    position: "relative",
                    display: "inline-block"
                  },
                  children: [
                    y.startsWith("data:image/") ? /* @__PURE__ */ d(
                      "img",
                      {
                        src: y,
                        alt: `Attachment ${M + 1}`,
                        style: {
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          border: "1px solid #e2e8f0"
                        }
                      }
                    ) : /* @__PURE__ */ d(
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
                    /* @__PURE__ */ d(
                      "button",
                      {
                        onClick: () => {
                          N(
                            (_) => _.filter((E, K) => K !== M)
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
                M
              ))
            ]
          }
        ),
        /* @__PURE__ */ A(
          Bs,
          {
            onSubmit: (y) => {
              y.preventDefault();
              const _ = new FormData(y.currentTarget).get("message");
              _ != null && _.trim() && (at(_.trim(), T), k(""), N([]));
            },
            children: [
              /* @__PURE__ */ d(
                Vr,
                {
                  value: w,
                  onChange: (y) => k(y.target.value),
                  placeholder: t.placeholder || "What would you like to know?",
                  disabled: L
                }
              ),
              /* @__PURE__ */ A(Fs, { children: [
                /* @__PURE__ */ d(Us, { children: ((be = t.features) == null ? void 0 : be.fileUpload) && /* @__PURE__ */ A(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center"
                    },
                    children: [
                      /* @__PURE__ */ A(
                        Hs,
                        {
                          variant: "ghost",
                          size: "icon",
                          onClick: () => {
                            const y = document.createElement("input");
                            y.type = "file", y.accept = "image/*,text/*,.pdf,.doc,.docx", y.multiple = !0, y.onchange = (M) => {
                              const _ = M.target.files;
                              _ && Ye(Array.from(_));
                            }, y.click();
                          },
                          title: T.length > 0 ? `${T.length} file(s) attached` : "Attach files",
                          disabled: L,
                          style: {
                            position: "relative",
                            color: T.length > 0 ? "#3b82f6" : void 0
                          },
                          children: [
                            /* @__PURE__ */ d(
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
                                    d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49L13.1 2.41a4 4 0 015.66 5.66L9.41 17.41a2 2 0 01-2.83-2.83L15.9 5.24",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                  }
                                )
                              }
                            ),
                            T.length > 0 && /* @__PURE__ */ d(
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
                                children: T.length > 9 ? "9+" : T.length
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ d(
                        "span",
                        {
                          onClick: () => {
                            const y = document.createElement("input");
                            y.type = "file", y.accept = "image/*,text/*,.pdf,.doc,.docx", y.multiple = !0, y.onchange = (M) => {
                              const _ = M.target.files;
                              _ && Ye(Array.from(_));
                            }, y.click();
                          },
                          style: {
                            fontSize: "14px",
                            color: "#6b7280",
                            fontWeight: "500",
                            cursor: "pointer",
                            userSelect: "none"
                          },
                          children: "Attach"
                        }
                      ),
                      T.length > 0 && /* @__PURE__ */ d(
                        "div",
                        {
                          style: {
                            backgroundColor: "#3b82f6",
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "600",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            marginLeft: "8px",
                            minWidth: "20px",
                            textAlign: "center"
                          },
                          children: "Pantry at Five Cafe"
                        }
                      )
                    ]
                  }
                ) }),
                /* @__PURE__ */ d(
                  js,
                  {
                    status: j,
                    disabled: !w.trim() && j !== "streaming",
                    onClick: j === "streaming" ? vt : void 0,
                    title: j === "streaming" ? "Stop generation" : j === "submitted" ? "Submitting..." : "Send message"
                  }
                )
              ] })
            ]
          }
        )
      ] }),
      t.onError && /* @__PURE__ */ d("div", { className: "chat-wrapper__error-boundary" })
    ] })
  ] }));
}
const a1 = Jr(Gs);
class Qs {
  constructor(t, n) {
    se(this, "baseUrl");
    se(this, "apiKey");
    this.baseUrl = t, this.apiKey = n;
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
  async *streamMessage(t, n) {
    const r = await fetch(
      `${this.baseUrl}/api/conversation/${t}`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ message: n })
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
          const p = c.slice(6);
          if (p === "[DONE]") return;
          try {
            yield JSON.parse(p).content || "";
          } catch (g) {
            console.error("Failed to parse chunk:", g);
          }
        }
    }
  }
}
function s1(e, t) {
  const [n, r] = te([]), [i, l] = te(!1), [o, a] = te(null), s = He(null), u = He(new Qs(e, t)), c = ee(async () => {
    try {
      const h = await u.current.initConversation();
      return s.current = h, h;
    } catch (h) {
      throw a(h), h;
    }
  }, []), p = ee(
    async (h) => {
      s.current || await c();
      const w = {
        id: Date.now().toString(),
        role: "user",
        content: h,
        timestamp: /* @__PURE__ */ new Date()
      };
      r((L) => [...L, w]), l(!0), a(null);
      const k = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      r((L) => [...L, k]);
      try {
        const L = u.current.streamMessage(
          s.current,
          h
        );
        for await (const b of L)
          r(
            (P) => P.map(
              (I) => I.id === k.id ? { ...I, content: I.content + b } : I
            )
          );
        r(
          (b) => b.map(
            (P) => P.id === k.id ? { ...P, isStreaming: !1 } : P
          )
        );
      } catch (L) {
        a(L), r((b) => b.filter((P) => P.id !== k.id));
      } finally {
        l(!1);
      }
    },
    [c]
  ), g = ee(() => {
    r([]), s.current = null;
  }, []);
  return {
    messages: n,
    isLoading: i,
    error: o,
    sendMessage: p,
    clearMessages: g
  };
}
export {
  a1 as ChatWrapper,
  Ys as Loader,
  Bs as PromptInput,
  Hs as PromptInputButton,
  n1 as PromptInputModelSelect,
  i1 as PromptInputModelSelectContent,
  l1 as PromptInputModelSelectItem,
  r1 as PromptInputModelSelectTrigger,
  o1 as PromptInputModelSelectValue,
  js as PromptInputSubmit,
  Vr as PromptInputTextarea,
  Fs as PromptInputToolbar,
  Us as PromptInputTools,
  Vs as Reasoning,
  Zs as ReasoningContent,
  $s as ReasoningTrigger,
  s1 as useChatConnection
};
