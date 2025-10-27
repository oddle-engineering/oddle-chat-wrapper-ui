var ma = Object.defineProperty;
var ga = (e, t, n) => t in e ? ma(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ae = (e, t, n) => ga(e, typeof t != "symbol" ? t + "" : t, n);
import { jsxs as I, jsx as c, Fragment as dn } from "react/jsx-runtime";
import Lt, { forwardRef as ki, useState as X, useEffect as Ke, useRef as rt, useImperativeHandle as Ca, useCallback as oe, memo as rr, useMemo as St } from "react";
function ya(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const wa = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, xa = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ka = {};
function br(e, t) {
  return (ka.jsx ? xa : wa).test(e);
}
const ba = /[ \t\n\f\r]/g;
function _a(e) {
  return typeof e == "object" ? e.type === "text" ? _r(e.value) : !1 : _r(e);
}
function _r(e) {
  return e.replace(ba, "") === "";
}
class Xt {
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
Xt.prototype.normal = {};
Xt.prototype.property = {};
Xt.prototype.space = void 0;
function bi(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new Xt(n, r, t);
}
function $n(e) {
  return e.toLowerCase();
}
class He {
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
He.prototype.attribute = "";
He.prototype.booleanish = !1;
He.prototype.boolean = !1;
He.prototype.commaOrSpaceSeparated = !1;
He.prototype.commaSeparated = !1;
He.prototype.defined = !1;
He.prototype.mustUseProperty = !1;
He.prototype.number = !1;
He.prototype.overloadedBoolean = !1;
He.prototype.property = "";
He.prototype.spaceSeparated = !1;
He.prototype.space = void 0;
let Sa = 0;
const Z = Et(), we = Et(), Vn = Et(), E = Et(), se = Et(), Dt = Et(), Ge = Et();
function Et() {
  return 2 ** ++Sa;
}
const Wn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: Z,
  booleanish: we,
  commaOrSpaceSeparated: Ge,
  commaSeparated: Dt,
  number: E,
  overloadedBoolean: Vn,
  spaceSeparated: se
}, Symbol.toStringTag, { value: "Module" })), En = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Wn)
);
class ir extends He {
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
    if (super(t, n), Sr(this, "space", i), typeof r == "number")
      for (; ++a < En.length; ) {
        const l = En[a];
        Sr(this, En[a], (r & Wn[l]) === Wn[l]);
      }
  }
}
ir.prototype.defined = !0;
function Sr(e, t, n) {
  n && (e[t] = n);
}
function Pt(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new ir(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[$n(r)] = r, n[$n(a.attribute)] = r;
  }
  return new Xt(t, n, e.space);
}
const _i = Pt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: we,
    ariaAutoComplete: null,
    ariaBusy: we,
    ariaChecked: we,
    ariaColCount: E,
    ariaColIndex: E,
    ariaColSpan: E,
    ariaControls: se,
    ariaCurrent: null,
    ariaDescribedBy: se,
    ariaDetails: null,
    ariaDisabled: we,
    ariaDropEffect: se,
    ariaErrorMessage: null,
    ariaExpanded: we,
    ariaFlowTo: se,
    ariaGrabbed: we,
    ariaHasPopup: null,
    ariaHidden: we,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: se,
    ariaLevel: E,
    ariaLive: null,
    ariaModal: we,
    ariaMultiLine: we,
    ariaMultiSelectable: we,
    ariaOrientation: null,
    ariaOwns: se,
    ariaPlaceholder: null,
    ariaPosInSet: E,
    ariaPressed: we,
    ariaReadOnly: we,
    ariaRelevant: null,
    ariaRequired: we,
    ariaRoleDescription: se,
    ariaRowCount: E,
    ariaRowIndex: E,
    ariaRowSpan: E,
    ariaSelected: we,
    ariaSetSize: E,
    ariaSort: null,
    ariaValueMax: E,
    ariaValueMin: E,
    ariaValueNow: E,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function Si(e, t) {
  return t in e ? e[t] : t;
}
function Ti(e, t) {
  return Si(e, t.toLowerCase());
}
const Ta = Pt({
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
    accept: Dt,
    acceptCharset: se,
    accessKey: se,
    action: null,
    allow: null,
    allowFullScreen: Z,
    allowPaymentRequest: Z,
    allowUserMedia: Z,
    alt: null,
    as: null,
    async: Z,
    autoCapitalize: null,
    autoComplete: se,
    autoFocus: Z,
    autoPlay: Z,
    blocking: se,
    capture: null,
    charSet: null,
    checked: Z,
    cite: null,
    className: se,
    cols: E,
    colSpan: null,
    content: null,
    contentEditable: we,
    controls: Z,
    controlsList: se,
    coords: E | Dt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: Z,
    defer: Z,
    dir: null,
    dirName: null,
    disabled: Z,
    download: Vn,
    draggable: we,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: Z,
    formTarget: null,
    headers: se,
    height: E,
    hidden: Vn,
    high: E,
    href: null,
    hrefLang: null,
    htmlFor: se,
    httpEquiv: se,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: Z,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: Z,
    itemId: null,
    itemProp: se,
    itemRef: se,
    itemScope: Z,
    itemType: se,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: Z,
    low: E,
    manifest: null,
    max: null,
    maxLength: E,
    media: null,
    method: null,
    min: null,
    minLength: E,
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
    optimum: E,
    pattern: null,
    ping: se,
    placeholder: null,
    playsInline: Z,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: Z,
    referrerPolicy: null,
    rel: se,
    required: Z,
    reversed: Z,
    rows: E,
    rowSpan: E,
    sandbox: se,
    scope: null,
    scoped: Z,
    seamless: Z,
    selected: Z,
    shadowRootClonable: Z,
    shadowRootDelegatesFocus: Z,
    shadowRootMode: null,
    shape: null,
    size: E,
    sizes: null,
    slot: null,
    span: E,
    spellCheck: we,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: E,
    step: null,
    style: null,
    tabIndex: E,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: Z,
    useMap: null,
    value: we,
    width: E,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: se,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: E,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: E,
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
    hSpace: E,
    // `<img>` and `<object>`
    leftMargin: E,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: E,
    // `<body>`
    marginWidth: E,
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
    rightMargin: E,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: we,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: E,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: E,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: Z,
    disableRemotePlayback: Z,
    prefix: null,
    property: null,
    results: E,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Ti
}), Ea = Pt({
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
    accentHeight: E,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: E,
    amplitude: E,
    arabicForm: null,
    ascent: E,
    attributeName: null,
    attributeType: null,
    azimuth: E,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: E,
    by: null,
    calcMode: null,
    capHeight: E,
    className: se,
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
    descent: E,
    diffuseConstant: E,
    direction: null,
    display: null,
    dur: null,
    divisor: E,
    dominantBaseline: null,
    download: Z,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: E,
    enableBackground: null,
    end: null,
    event: null,
    exponent: E,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: E,
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
    g1: Dt,
    g2: Dt,
    glyphName: Dt,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: E,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: E,
    horizOriginX: E,
    horizOriginY: E,
    id: null,
    ideographic: E,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: E,
    k: E,
    k1: E,
    k2: E,
    k3: E,
    k4: E,
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
    limitingConeAngle: E,
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
    mediaSize: E,
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
    overlinePosition: E,
    overlineThickness: E,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: E,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: se,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: E,
    pointsAtY: E,
    pointsAtZ: E,
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
    specularConstant: E,
    specularExponent: E,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: E,
    strikethroughThickness: E,
    string: null,
    stroke: null,
    strokeDashArray: Ge,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: E,
    strokeOpacity: E,
    strokeWidth: null,
    style: null,
    surfaceScale: E,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Ge,
    tabIndex: E,
    tableValues: null,
    target: null,
    targetX: E,
    targetY: E,
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
    underlinePosition: E,
    underlineThickness: E,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: E,
    values: null,
    vAlphabetic: E,
    vMathematical: E,
    vectorEffect: null,
    vHanging: E,
    vIdeographic: E,
    version: null,
    vertAdvY: E,
    vertOriginX: E,
    vertOriginY: E,
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
    xHeight: E,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Si
}), Ei = Pt({
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
}), vi = Pt({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Ti
}), Ii = Pt({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), va = {
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
}, Ia = /[A-Z]/g, Tr = /-[a-z]/g, Aa = /^data[-\w.:]+$/i;
function Ma(e, t) {
  const n = $n(t);
  let r = t, i = He;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Aa.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(Tr, La);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!Tr.test(a)) {
        let l = a.replace(Ia, Na);
        l.charAt(0) !== "-" && (l = "-" + l), t = "data" + l;
      }
    }
    i = ir;
  }
  return new i(r, t);
}
function Na(e) {
  return "-" + e.toLowerCase();
}
function La(e) {
  return e.charAt(1).toUpperCase();
}
const Da = bi([_i, Ta, Ei, vi, Ii], "html"), ar = bi([_i, Ea, Ei, vi, Ii], "svg");
function Ra(e) {
  return e.join(" ").trim();
}
var fn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ai(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var lr = {}, Er = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Pa = /\n/g, Oa = /^\s*/, Fa = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, za = /^:\s*/, Ua = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Ba = /^[;\s]*/, Ha = /^\s+|\s+$/g, ja = `
`, vr = "/", Ir = "*", Tt = "", $a = "comment", Va = "declaration", Wa = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(y) {
    var b = y.match(Pa);
    b && (n += b.length);
    var A = y.lastIndexOf(ja);
    r = ~A ? y.length - A : r + y.length;
  }
  function a() {
    var y = { line: n, column: r };
    return function(b) {
      return b.position = new l(y), p(), b;
    };
  }
  function l(y) {
    this.start = y, this.end = { line: n, column: r }, this.source = t.source;
  }
  l.prototype.content = e;
  function o(y) {
    var b = new Error(
      t.source + ":" + n + ":" + r + ": " + y
    );
    if (b.reason = y, b.filename = t.source, b.line = n, b.column = r, b.source = e, !t.silent) throw b;
  }
  function u(y) {
    var b = y.exec(e);
    if (b) {
      var A = b[0];
      return i(A), e = e.slice(A.length), b;
    }
  }
  function p() {
    u(Oa);
  }
  function s(y) {
    var b;
    for (y = y || []; b = d(); )
      b !== !1 && y.push(b);
    return y;
  }
  function d() {
    var y = a();
    if (!(vr != e.charAt(0) || Ir != e.charAt(1))) {
      for (var b = 2; Tt != e.charAt(b) && (Ir != e.charAt(b) || vr != e.charAt(b + 1)); )
        ++b;
      if (b += 2, Tt === e.charAt(b - 1))
        return o("End of comment missing");
      var A = e.slice(2, b - 2);
      return r += 2, i(A), e = e.slice(b), r += 2, y({
        type: $a,
        comment: A
      });
    }
  }
  function f() {
    var y = a(), b = u(Fa);
    if (b) {
      if (d(), !u(za)) return o("property missing ':'");
      var A = u(Ua), w = y({
        type: Va,
        property: Ar(b[0].replace(Er, Tt)),
        value: A ? Ar(A[0].replace(Er, Tt)) : Tt
      });
      return u(Ba), w;
    }
  }
  function h() {
    var y = [];
    s(y);
    for (var b; b = f(); )
      b !== !1 && (y.push(b), s(y));
    return y;
  }
  return p(), h();
};
function Ar(e) {
  return e ? e.replace(Ha, Tt) : Tt;
}
var Za = fn && fn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(lr, "__esModule", { value: !0 });
lr.default = Ga;
var qa = Za(Wa);
function Ga(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, qa.default)(e), i = typeof t == "function";
  return r.forEach(function(a) {
    if (a.type === "declaration") {
      var l = a.property, o = a.value;
      i ? t(l, o, a) : o && (n = n || {}, n[l] = o);
    }
  }), n;
}
var yn = {};
Object.defineProperty(yn, "__esModule", { value: !0 });
yn.camelCase = void 0;
var Ya = /^--[a-zA-Z0-9_-]+$/, Xa = /-([a-z])/g, Ja = /^[^-]+$/, Ka = /^-(webkit|moz|ms|o|khtml)-/, Qa = /^-(ms)-/, el = function(e) {
  return !e || Ja.test(e) || Ya.test(e);
}, tl = function(e, t) {
  return t.toUpperCase();
}, Mr = function(e, t) {
  return "".concat(t, "-");
}, nl = function(e, t) {
  return t === void 0 && (t = {}), el(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Qa, Mr) : e = e.replace(Ka, Mr), e.replace(Xa, tl));
};
yn.camelCase = nl;
var rl = fn && fn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, il = rl(lr), al = yn;
function Zn(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, il.default)(e, function(r, i) {
    r && i && (n[(0, al.camelCase)(r, t)] = i);
  }), n;
}
Zn.default = Zn;
var ll = Zn;
const ol = /* @__PURE__ */ Ai(ll), Mi = Ni("end"), or = Ni("start");
function Ni(e) {
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
function sl(e) {
  const t = or(e), n = Mi(e);
  if (t && n)
    return { start: t, end: n };
}
function Zt(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Nr(e.position) : "start" in e || "end" in e ? Nr(e) : "line" in e || "column" in e ? qn(e) : "";
}
function qn(e) {
  return Lr(e && e.line) + ":" + Lr(e && e.column);
}
function Nr(e) {
  return qn(e && e.start) + "-" + qn(e && e.end);
}
function Lr(e) {
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
    let i = "", a = {}, l = !1;
    if (n && ("line" in n && "column" in n ? a = { place: n } : "start" in n && "end" in n ? a = { place: n } : "type" in n ? a = {
      ancestors: [n],
      place: n.position
    } : a = { ...n }), typeof t == "string" ? i = t : !a.cause && t && (l = !0, i = t.message, a.cause = t), !a.ruleId && !a.source && typeof r == "string") {
      const u = r.indexOf(":");
      u === -1 ? a.ruleId = r : (a.source = r.slice(0, u), a.ruleId = r.slice(u + 1));
    }
    if (!a.place && a.ancestors && a.ancestors) {
      const u = a.ancestors[a.ancestors.length - 1];
      u && (a.place = u.position);
    }
    const o = a.place && "start" in a.place ? a.place.start : a.place;
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = o ? o.line : void 0, this.name = Zt(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = l && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
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
const sr = {}.hasOwnProperty, cl = /* @__PURE__ */ new Map(), ul = /[A-Z]/g, pl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), hl = /* @__PURE__ */ new Set(["td", "th"]), Li = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function dl(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = kl(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = xl(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? ar : Da,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = Di(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function Di(e, t, n) {
  if (t.type === "element")
    return fl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return ml(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return Cl(e, t, n);
  if (t.type === "mdxjsEsm")
    return gl(e, t);
  if (t.type === "root")
    return yl(e, t, n);
  if (t.type === "text")
    return wl(e, t);
}
function fl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = ar, e.schema = i), e.ancestors.push(t);
  const a = Pi(e, t.tagName, !1), l = bl(e, t);
  let o = ur(e, t);
  return pl.has(t.tagName) && (o = o.filter(function(u) {
    return typeof u == "string" ? !_a(u) : !0;
  })), Ri(e, l, a, t), cr(l, o), e.ancestors.pop(), e.schema = r, e.create(t, a, l, n);
}
function ml(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Yt(e, t.position);
}
function gl(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Yt(e, t.position);
}
function Cl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = ar, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : Pi(e, t.name, !0), l = _l(e, t), o = ur(e, t);
  return Ri(e, l, a, t), cr(l, o), e.ancestors.pop(), e.schema = r, e.create(t, a, l, n);
}
function yl(e, t, n) {
  const r = {};
  return cr(r, ur(e, t)), e.create(t, e.Fragment, r, n);
}
function wl(e, t) {
  return t.value;
}
function Ri(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function cr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function xl(e, t, n) {
  return r;
  function r(i, a, l, o) {
    const p = Array.isArray(l.children) ? n : t;
    return o ? p(a, l, o) : p(a, l);
  }
}
function kl(e, t) {
  return n;
  function n(r, i, a, l) {
    const o = Array.isArray(a.children), u = or(r);
    return t(
      i,
      a,
      l,
      o,
      {
        columnNumber: u ? u.column - 1 : void 0,
        fileName: e,
        lineNumber: u ? u.line : void 0
      },
      void 0
    );
  }
}
function bl(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && sr.call(t.properties, i)) {
      const a = Sl(e, i, t.properties[i]);
      if (a) {
        const [l, o] = a;
        e.tableCellAlignToStyle && l === "align" && typeof o == "string" && hl.has(t.tagName) ? r = o : n[l] = o;
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
function _l(e, t) {
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
        Yt(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const o = r.value.data.estree.body[0];
          o.type, a = e.evaluater.evaluateExpression(o.expression);
        } else
          Yt(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function ur(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : cl;
  for (; ++r < t.children.length; ) {
    const a = t.children[r];
    let l;
    if (e.passKeys) {
      const u = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (u) {
        const p = i.get(u) || 0;
        l = u + "-" + p, i.set(u, p + 1);
      }
    }
    const o = Di(e, a, l);
    o !== void 0 && n.push(o);
  }
  return n;
}
function Sl(e, t, n) {
  const r = Ma(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? ya(n) : Ra(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Tl(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = El(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? va[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Tl(e, t) {
  try {
    return ol(t, { reactCompat: !0 });
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
    throw i.file = e.filePath || void 0, i.url = Li + "#cannot-parse-style-attribute", i;
  }
}
function Pi(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let a = -1, l;
    for (; ++a < i.length; ) {
      const o = br(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
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
    r = br(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return sr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Yt(e);
}
function Yt(e, t) {
  const n = new Ie(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Li + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function El(e) {
  const t = {};
  let n;
  for (n in e)
    sr.call(e, n) && (t[vl(n)] = e[n]);
  return t;
}
function vl(e) {
  let t = e.replace(ul, Il);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Il(e) {
  return "-" + e.toLowerCase();
}
const vn = {
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
}, Al = {};
function Ml(e, t) {
  const n = Al, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Oi(e, r, i);
}
function Oi(e, t, n) {
  if (Nl(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Dr(e.children, t, n);
  }
  return Array.isArray(e) ? Dr(e, t, n) : "";
}
function Dr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Oi(e[i], t, n);
  return r.join("");
}
function Nl(e) {
  return !!(e && typeof e == "object");
}
const Rr = document.createElement("i");
function pr(e) {
  const t = "&" + e + ";";
  Rr.innerHTML = t;
  const n = Rr.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function ut(e, t, n, r) {
  const i = e.length;
  let a = 0, l;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    l = Array.from(r), l.unshift(t, n), e.splice(...l);
  else
    for (n && e.splice(t, n); a < r.length; )
      l = r.slice(a, a + 1e4), l.unshift(t, 0), e.splice(...l), a += 1e4, t += 1e4;
}
function Qe(e, t) {
  return e.length > 0 ? (ut(e, e.length, 0, t), e) : t;
}
const Pr = {}.hasOwnProperty;
function Ll(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    Dl(t, e[n]);
  return t;
}
function Dl(e, t) {
  let n;
  for (n in t) {
    const i = (Pr.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let l;
    if (a)
      for (l in a) {
        Pr.call(i, l) || (i[l] = []);
        const o = a[l];
        Rl(
          // @ts-expect-error Looks like a list.
          i[l],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function Rl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  ut(e, 0, 0, r);
}
function Fi(e, t) {
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
function Rt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const ct = kt(/[A-Za-z]/), Ye = kt(/[\dA-Za-z]/), Pl = kt(/[#-'*+\--9=?A-Z^-~]/);
function Gn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Yn = kt(/\d/), Ol = kt(/[\dA-Fa-f]/), Fl = kt(/[!-/:-@[-`{-~]/);
function z(e) {
  return e !== null && e < -2;
}
function Be(e) {
  return e !== null && (e < 0 || e === 32);
}
function te(e) {
  return e === -2 || e === -1 || e === 32;
}
const zl = kt(new RegExp("\\p{P}|\\p{S}", "u")), Ul = kt(/\s/);
function kt(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Ot(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let l = "";
    if (a === 37 && Ye(e.charCodeAt(n + 1)) && Ye(e.charCodeAt(n + 2)))
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
function ce(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return l;
  function l(u) {
    return te(u) ? (e.enter(n), o(u)) : t(u);
  }
  function o(u) {
    return te(u) && a++ < i ? (e.consume(u), o) : (e.exit(n), t(u));
  }
}
const Bl = {
  tokenize: Hl
};
function Hl(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), ce(e, t, "linePrefix");
  }
  function i(o) {
    return e.enter("paragraph"), a(o);
  }
  function a(o) {
    const u = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = u), n = u, l(o);
  }
  function l(o) {
    if (o === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(o);
      return;
    }
    return z(o) ? (e.consume(o), e.exit("chunkText"), a) : (e.consume(o), l);
  }
}
const jl = {
  tokenize: $l
}, Or = {
  tokenize: Vl
};
function $l(e) {
  const t = this, n = [];
  let r = 0, i, a, l;
  return o;
  function o(N) {
    if (r < n.length) {
      const F = n[r];
      return t.containerState = F[1], e.attempt(F[0].continuation, u, p)(N);
    }
    return p(N);
  }
  function u(N) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && R();
      const F = t.events.length;
      let q = F, k;
      for (; q--; )
        if (t.events[q][0] === "exit" && t.events[q][1].type === "chunkFlow") {
          k = t.events[q][1].end;
          break;
        }
      w(r);
      let $ = F;
      for (; $ < t.events.length; )
        t.events[$][1].end = {
          ...k
        }, $++;
      return ut(t.events, q + 1, 0, t.events.slice(F)), t.events.length = $, p(N);
    }
    return o(N);
  }
  function p(N) {
    if (r === n.length) {
      if (!i)
        return f(N);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return y(N);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(Or, s, d)(N);
  }
  function s(N) {
    return i && R(), w(r), f(N);
  }
  function d(N) {
    return t.parser.lazy[t.now().line] = r !== n.length, l = t.now().offset, y(N);
  }
  function f(N) {
    return t.containerState = {}, e.attempt(Or, h, y)(N);
  }
  function h(N) {
    return r++, n.push([t.currentConstruct, t.containerState]), f(N);
  }
  function y(N) {
    if (N === null) {
      i && R(), w(0), e.consume(N);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: a
    }), b(N);
  }
  function b(N) {
    if (N === null) {
      A(e.exit("chunkFlow"), !0), w(0), e.consume(N);
      return;
    }
    return z(N) ? (e.consume(N), A(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, o) : (e.consume(N), b);
  }
  function A(N, F) {
    const q = t.sliceStream(N);
    if (F && q.push(null), N.previous = a, a && (a.next = N), a = N, i.defineSkip(N.start), i.write(q), t.parser.lazy[N.start.line]) {
      let k = i.events.length;
      for (; k--; )
        if (
          // The token starts before the line ending…
          i.events[k][1].start.offset < l && // …and either is not ended yet…
          (!i.events[k][1].end || // …or ends after it.
          i.events[k][1].end.offset > l)
        )
          return;
      const $ = t.events.length;
      let V = $, H, j;
      for (; V--; )
        if (t.events[V][0] === "exit" && t.events[V][1].type === "chunkFlow") {
          if (H) {
            j = t.events[V][1].end;
            break;
          }
          H = !0;
        }
      for (w(r), k = $; k < t.events.length; )
        t.events[k][1].end = {
          ...j
        }, k++;
      ut(t.events, V + 1, 0, t.events.slice($)), t.events.length = k;
    }
  }
  function w(N) {
    let F = n.length;
    for (; F-- > N; ) {
      const q = n[F];
      t.containerState = q[1], q[0].exit.call(t, e);
    }
    n.length = N;
  }
  function R() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Vl(e, t, n) {
  return ce(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Fr(e) {
  if (e === null || Be(e) || Ul(e))
    return 1;
  if (zl(e))
    return 2;
}
function hr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const Xn = {
  name: "attention",
  resolveAll: Wl,
  tokenize: Zl
};
function Wl(e, t) {
  let n = -1, r, i, a, l, o, u, p, s;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          u = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const d = {
            ...e[r][1].end
          }, f = {
            ...e[n][1].start
          };
          zr(d, -u), zr(f, u), l = {
            type: u > 1 ? "strongSequence" : "emphasisSequence",
            start: d,
            end: {
              ...e[r][1].end
            }
          }, o = {
            type: u > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: f
          }, a = {
            type: u > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[n][1].start
            }
          }, i = {
            type: u > 1 ? "strong" : "emphasis",
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
          }, p = [], e[r][1].end.offset - e[r][1].start.offset && (p = Qe(p, [["enter", e[r][1], t], ["exit", e[r][1], t]])), p = Qe(p, [["enter", i, t], ["enter", l, t], ["exit", l, t], ["enter", a, t]]), p = Qe(p, hr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), p = Qe(p, [["exit", a, t], ["enter", o, t], ["exit", o, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (s = 2, p = Qe(p, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : s = 0, ut(e, r - 1, n - r + 3, p), n = r + p.length - s - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Zl(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Fr(r);
  let a;
  return l;
  function l(u) {
    return a = u, e.enter("attentionSequence"), o(u);
  }
  function o(u) {
    if (u === a)
      return e.consume(u), o;
    const p = e.exit("attentionSequence"), s = Fr(u), d = !s || s === 2 && i || n.includes(u), f = !i || i === 2 && s || n.includes(r);
    return p._open = !!(a === 42 ? d : d && (i || !f)), p._close = !!(a === 42 ? f : f && (s || !d)), t(u);
  }
}
function zr(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const ql = {
  name: "autolink",
  tokenize: Gl
};
function Gl(e, t, n) {
  let r = 0;
  return i;
  function i(h) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(h) {
    return ct(h) ? (e.consume(h), l) : h === 64 ? n(h) : p(h);
  }
  function l(h) {
    return h === 43 || h === 45 || h === 46 || Ye(h) ? (r = 1, o(h)) : p(h);
  }
  function o(h) {
    return h === 58 ? (e.consume(h), r = 0, u) : (h === 43 || h === 45 || h === 46 || Ye(h)) && r++ < 32 ? (e.consume(h), o) : (r = 0, p(h));
  }
  function u(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : h === null || h === 32 || h === 60 || Gn(h) ? n(h) : (e.consume(h), u);
  }
  function p(h) {
    return h === 64 ? (e.consume(h), s) : Pl(h) ? (e.consume(h), p) : n(h);
  }
  function s(h) {
    return Ye(h) ? d(h) : n(h);
  }
  function d(h) {
    return h === 46 ? (e.consume(h), r = 0, s) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : f(h);
  }
  function f(h) {
    if ((h === 45 || Ye(h)) && r++ < 63) {
      const y = h === 45 ? f : d;
      return e.consume(h), y;
    }
    return n(h);
  }
}
const wn = {
  partial: !0,
  tokenize: Yl
};
function Yl(e, t, n) {
  return r;
  function r(a) {
    return te(a) ? ce(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || z(a) ? t(a) : n(a);
  }
}
const zi = {
  continuation: {
    tokenize: Jl
  },
  exit: Kl,
  name: "blockQuote",
  tokenize: Xl
};
function Xl(e, t, n) {
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
    return te(l) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(l), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(l));
  }
}
function Jl(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return te(l) ? ce(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : a(l);
  }
  function a(l) {
    return e.attempt(zi, t, n)(l);
  }
}
function Kl(e) {
  e.exit("blockQuote");
}
const Ui = {
  name: "characterEscape",
  tokenize: Ql
};
function Ql(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return Fl(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const Bi = {
  name: "characterReference",
  tokenize: eo
};
function eo(e, t, n) {
  const r = this;
  let i = 0, a, l;
  return o;
  function o(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), u;
  }
  function u(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), p) : (e.enter("characterReferenceValue"), a = 31, l = Ye, s(d));
  }
  function p(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, l = Ol, s) : (e.enter("characterReferenceValue"), a = 7, l = Yn, s(d));
  }
  function s(d) {
    if (d === 59 && i) {
      const f = e.exit("characterReferenceValue");
      return l === Ye && !pr(r.sliceSerialize(f)) ? n(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return l(d) && i++ < a ? (e.consume(d), s) : n(d);
  }
}
const Ur = {
  partial: !0,
  tokenize: no
}, Br = {
  concrete: !0,
  name: "codeFenced",
  tokenize: to
};
function to(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: q
  };
  let a = 0, l = 0, o;
  return u;
  function u(k) {
    return p(k);
  }
  function p(k) {
    const $ = r.events[r.events.length - 1];
    return a = $ && $[1].type === "linePrefix" ? $[2].sliceSerialize($[1], !0).length : 0, o = k, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), s(k);
  }
  function s(k) {
    return k === o ? (l++, e.consume(k), s) : l < 3 ? n(k) : (e.exit("codeFencedFenceSequence"), te(k) ? ce(e, d, "whitespace")(k) : d(k));
  }
  function d(k) {
    return k === null || z(k) ? (e.exit("codeFencedFence"), r.interrupt ? t(k) : e.check(Ur, b, F)(k)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), f(k));
  }
  function f(k) {
    return k === null || z(k) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(k)) : te(k) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), ce(e, h, "whitespace")(k)) : k === 96 && k === o ? n(k) : (e.consume(k), f);
  }
  function h(k) {
    return k === null || z(k) ? d(k) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), y(k));
  }
  function y(k) {
    return k === null || z(k) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(k)) : k === 96 && k === o ? n(k) : (e.consume(k), y);
  }
  function b(k) {
    return e.attempt(i, F, A)(k);
  }
  function A(k) {
    return e.enter("lineEnding"), e.consume(k), e.exit("lineEnding"), w;
  }
  function w(k) {
    return a > 0 && te(k) ? ce(e, R, "linePrefix", a + 1)(k) : R(k);
  }
  function R(k) {
    return k === null || z(k) ? e.check(Ur, b, F)(k) : (e.enter("codeFlowValue"), N(k));
  }
  function N(k) {
    return k === null || z(k) ? (e.exit("codeFlowValue"), R(k)) : (e.consume(k), N);
  }
  function F(k) {
    return e.exit("codeFenced"), t(k);
  }
  function q(k, $, V) {
    let H = 0;
    return j;
    function j(Y) {
      return k.enter("lineEnding"), k.consume(Y), k.exit("lineEnding"), T;
    }
    function T(Y) {
      return k.enter("codeFencedFence"), te(Y) ? ce(k, D, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(Y) : D(Y);
    }
    function D(Y) {
      return Y === o ? (k.enter("codeFencedFenceSequence"), G(Y)) : V(Y);
    }
    function G(Y) {
      return Y === o ? (H++, k.consume(Y), G) : H >= l ? (k.exit("codeFencedFenceSequence"), te(Y) ? ce(k, re, "whitespace")(Y) : re(Y)) : V(Y);
    }
    function re(Y) {
      return Y === null || z(Y) ? (k.exit("codeFencedFence"), $(Y)) : V(Y);
    }
  }
}
function no(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return l === null ? n(l) : (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), a);
  }
  function a(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
const In = {
  name: "codeIndented",
  tokenize: io
}, ro = {
  partial: !0,
  tokenize: ao
};
function io(e, t, n) {
  const r = this;
  return i;
  function i(p) {
    return e.enter("codeIndented"), ce(e, a, "linePrefix", 5)(p);
  }
  function a(p) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? l(p) : n(p);
  }
  function l(p) {
    return p === null ? u(p) : z(p) ? e.attempt(ro, l, u)(p) : (e.enter("codeFlowValue"), o(p));
  }
  function o(p) {
    return p === null || z(p) ? (e.exit("codeFlowValue"), l(p)) : (e.consume(p), o);
  }
  function u(p) {
    return e.exit("codeIndented"), t(p);
  }
}
function ao(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line] ? n(l) : z(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), i) : ce(e, a, "linePrefix", 5)(l);
  }
  function a(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(l) : z(l) ? i(l) : n(l);
  }
}
const lo = {
  name: "codeText",
  previous: so,
  resolve: oo,
  tokenize: co
};
function oo(e) {
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
function so(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function co(e, t, n) {
  let r = 0, i, a;
  return l;
  function l(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), o(d);
  }
  function o(d) {
    return d === 96 ? (e.consume(d), r++, o) : (e.exit("codeTextSequence"), u(d));
  }
  function u(d) {
    return d === null ? n(d) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), u) : d === 96 ? (a = e.enter("codeTextSequence"), i = 0, s(d)) : z(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), u) : (e.enter("codeTextData"), p(d));
  }
  function p(d) {
    return d === null || d === 32 || d === 96 || z(d) ? (e.exit("codeTextData"), u(d)) : (e.consume(d), p);
  }
  function s(d) {
    return d === 96 ? (e.consume(d), i++, s) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(d)) : (a.type = "codeTextData", p(d));
  }
}
class uo {
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
    return r && Ut(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Ut(this.left, t);
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
    this.setCursor(0), Ut(this.right, t.reverse());
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
        Ut(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Ut(this.left, n.reverse());
      }
  }
}
function Ut(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function Hi(e) {
  const t = {};
  let n = -1, r, i, a, l, o, u, p;
  const s = new uo(e);
  for (; ++n < s.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = s.get(n), n && r[1].type === "chunkFlow" && s.get(n - 1)[1].type === "listItemPrefix" && (u = r[1]._tokenizer.events, a = 0, a < u.length && u[a][1].type === "lineEndingBlank" && (a += 2), a < u.length && u[a][1].type === "content"))
      for (; ++a < u.length && u[a][1].type !== "content"; )
        u[a][1].type === "chunkText" && (u[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, po(s, n)), n = t[n], p = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (l = s.get(a), l[1].type === "lineEnding" || l[1].type === "lineEndingBlank")
          l[0] === "enter" && (i && (s.get(i)[1].type = "lineEndingBlank"), l[1].type = "lineEnding", i = a);
        else if (!(l[1].type === "linePrefix" || l[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...s.get(i)[1].start
      }, o = s.slice(i, n), o.unshift(r), s.splice(i, n - i + 1, o));
    }
  }
  return ut(e, 0, Number.POSITIVE_INFINITY, s.slice(0)), !p;
}
function po(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let l = n._tokenizer;
  l || (l = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (l._contentTypeTextTrailing = !0));
  const o = l.events, u = [], p = {};
  let s, d, f = -1, h = n, y = 0, b = 0;
  const A = [b];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; )
      ;
    a.push(i), h._tokenizer || (s = r.sliceStream(h), h.next || s.push(null), d && l.defineSkip(h.start), h._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(s), h._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), d = h, h = h.next;
  }
  for (h = n; ++f < o.length; )
    // Find a void token that includes a break.
    o[f][0] === "exit" && o[f - 1][0] === "enter" && o[f][1].type === o[f - 1][1].type && o[f][1].start.line !== o[f][1].end.line && (b = f + 1, A.push(b), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (l.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : A.pop(), f = A.length; f--; ) {
    const w = o.slice(A[f], A[f + 1]), R = a.pop();
    u.push([R, R + w.length - 1]), e.splice(R, 2, w);
  }
  for (u.reverse(), f = -1; ++f < u.length; )
    p[y + u[f][0]] = y + u[f][1], y += u[f][1] - u[f][0] - 1;
  return p;
}
const ho = {
  resolve: mo,
  tokenize: go
}, fo = {
  partial: !0,
  tokenize: Co
};
function mo(e) {
  return Hi(e), e;
}
function go(e, t) {
  let n;
  return r;
  function r(o) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(o);
  }
  function i(o) {
    return o === null ? a(o) : z(o) ? e.check(fo, l, a)(o) : (e.consume(o), i);
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
function Co(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), ce(e, a, "linePrefix");
  }
  function a(l) {
    if (l === null || z(l))
      return n(l);
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(l) : e.interrupt(r.parser.constructs.flow, n, t)(l);
  }
}
function ji(e, t, n, r, i, a, l, o, u) {
  const p = u || Number.POSITIVE_INFINITY;
  let s = 0;
  return d;
  function d(w) {
    return w === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(w), e.exit(a), f) : w === null || w === 32 || w === 41 || Gn(w) ? n(w) : (e.enter(r), e.enter(l), e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), b(w));
  }
  function f(w) {
    return w === 62 ? (e.enter(a), e.consume(w), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), h(w));
  }
  function h(w) {
    return w === 62 ? (e.exit("chunkString"), e.exit(o), f(w)) : w === null || w === 60 || z(w) ? n(w) : (e.consume(w), w === 92 ? y : h);
  }
  function y(w) {
    return w === 60 || w === 62 || w === 92 ? (e.consume(w), h) : h(w);
  }
  function b(w) {
    return !s && (w === null || w === 41 || Be(w)) ? (e.exit("chunkString"), e.exit(o), e.exit(l), e.exit(r), t(w)) : s < p && w === 40 ? (e.consume(w), s++, b) : w === 41 ? (e.consume(w), s--, b) : w === null || w === 32 || w === 40 || Gn(w) ? n(w) : (e.consume(w), w === 92 ? A : b);
  }
  function A(w) {
    return w === 40 || w === 41 || w === 92 ? (e.consume(w), b) : b(w);
  }
}
function $i(e, t, n, r, i, a) {
  const l = this;
  let o = 0, u;
  return p;
  function p(h) {
    return e.enter(r), e.enter(i), e.consume(h), e.exit(i), e.enter(a), s;
  }
  function s(h) {
    return o > 999 || h === null || h === 91 || h === 93 && !u || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === 94 && !o && "_hiddenFootnoteSupport" in l.parser.constructs ? n(h) : h === 93 ? (e.exit(a), e.enter(i), e.consume(h), e.exit(i), e.exit(r), t) : z(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), s) : (e.enter("chunkString", {
      contentType: "string"
    }), d(h));
  }
  function d(h) {
    return h === null || h === 91 || h === 93 || z(h) || o++ > 999 ? (e.exit("chunkString"), s(h)) : (e.consume(h), u || (u = !te(h)), h === 92 ? f : d);
  }
  function f(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), o++, d) : d(h);
  }
}
function Vi(e, t, n, r, i, a) {
  let l;
  return o;
  function o(f) {
    return f === 34 || f === 39 || f === 40 ? (e.enter(r), e.enter(i), e.consume(f), e.exit(i), l = f === 40 ? 41 : f, u) : n(f);
  }
  function u(f) {
    return f === l ? (e.enter(i), e.consume(f), e.exit(i), e.exit(r), t) : (e.enter(a), p(f));
  }
  function p(f) {
    return f === l ? (e.exit(a), u(l)) : f === null ? n(f) : z(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), ce(e, p, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), s(f));
  }
  function s(f) {
    return f === l || f === null || z(f) ? (e.exit("chunkString"), p(f)) : (e.consume(f), f === 92 ? d : s);
  }
  function d(f) {
    return f === l || f === 92 ? (e.consume(f), s) : s(f);
  }
}
function qt(e, t) {
  let n;
  return r;
  function r(i) {
    return z(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : te(i) ? ce(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const yo = {
  name: "definition",
  tokenize: xo
}, wo = {
  partial: !0,
  tokenize: ko
};
function xo(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(h) {
    return e.enter("definition"), l(h);
  }
  function l(h) {
    return $i.call(
      r,
      e,
      o,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(h);
  }
  function o(h) {
    return i = Rt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), u) : n(h);
  }
  function u(h) {
    return Be(h) ? qt(e, p)(h) : p(h);
  }
  function p(h) {
    return ji(
      e,
      s,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(h);
  }
  function s(h) {
    return e.attempt(wo, d, d)(h);
  }
  function d(h) {
    return te(h) ? ce(e, f, "whitespace")(h) : f(h);
  }
  function f(h) {
    return h === null || z(h) ? (e.exit("definition"), r.parser.defined.push(i), t(h)) : n(h);
  }
}
function ko(e, t, n) {
  return r;
  function r(o) {
    return Be(o) ? qt(e, i)(o) : n(o);
  }
  function i(o) {
    return Vi(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
  }
  function a(o) {
    return te(o) ? ce(e, l, "whitespace")(o) : l(o);
  }
  function l(o) {
    return o === null || z(o) ? t(o) : n(o);
  }
}
const bo = {
  name: "hardBreakEscape",
  tokenize: _o
};
function _o(e, t, n) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), i;
  }
  function i(a) {
    return z(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
  }
}
const So = {
  name: "headingAtx",
  resolve: To,
  tokenize: Eo
};
function To(e, t) {
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
  }, ut(e, r, n - r + 1, [["enter", i, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]])), e;
}
function Eo(e, t, n) {
  let r = 0;
  return i;
  function i(s) {
    return e.enter("atxHeading"), a(s);
  }
  function a(s) {
    return e.enter("atxHeadingSequence"), l(s);
  }
  function l(s) {
    return s === 35 && r++ < 6 ? (e.consume(s), l) : s === null || Be(s) ? (e.exit("atxHeadingSequence"), o(s)) : n(s);
  }
  function o(s) {
    return s === 35 ? (e.enter("atxHeadingSequence"), u(s)) : s === null || z(s) ? (e.exit("atxHeading"), t(s)) : te(s) ? ce(e, o, "whitespace")(s) : (e.enter("atxHeadingText"), p(s));
  }
  function u(s) {
    return s === 35 ? (e.consume(s), u) : (e.exit("atxHeadingSequence"), o(s));
  }
  function p(s) {
    return s === null || s === 35 || Be(s) ? (e.exit("atxHeadingText"), o(s)) : (e.consume(s), p);
  }
}
const vo = [
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
], Hr = ["pre", "script", "style", "textarea"], Io = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: No,
  tokenize: Lo
}, Ao = {
  partial: !0,
  tokenize: Ro
}, Mo = {
  partial: !0,
  tokenize: Do
};
function No(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Lo(e, t, n) {
  const r = this;
  let i, a, l, o, u;
  return p;
  function p(m) {
    return s(m);
  }
  function s(m) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(m), d;
  }
  function d(m) {
    return m === 33 ? (e.consume(m), f) : m === 47 ? (e.consume(m), a = !0, b) : m === 63 ? (e.consume(m), i = 3, r.interrupt ? t : C) : ct(m) ? (e.consume(m), l = String.fromCharCode(m), A) : n(m);
  }
  function f(m) {
    return m === 45 ? (e.consume(m), i = 2, h) : m === 91 ? (e.consume(m), i = 5, o = 0, y) : ct(m) ? (e.consume(m), i = 4, r.interrupt ? t : C) : n(m);
  }
  function h(m) {
    return m === 45 ? (e.consume(m), r.interrupt ? t : C) : n(m);
  }
  function y(m) {
    const Te = "CDATA[";
    return m === Te.charCodeAt(o++) ? (e.consume(m), o === Te.length ? r.interrupt ? t : D : y) : n(m);
  }
  function b(m) {
    return ct(m) ? (e.consume(m), l = String.fromCharCode(m), A) : n(m);
  }
  function A(m) {
    if (m === null || m === 47 || m === 62 || Be(m)) {
      const Te = m === 47, K = l.toLowerCase();
      return !Te && !a && Hr.includes(K) ? (i = 1, r.interrupt ? t(m) : D(m)) : vo.includes(l.toLowerCase()) ? (i = 6, Te ? (e.consume(m), w) : r.interrupt ? t(m) : D(m)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(m) : a ? R(m) : N(m));
    }
    return m === 45 || Ye(m) ? (e.consume(m), l += String.fromCharCode(m), A) : n(m);
  }
  function w(m) {
    return m === 62 ? (e.consume(m), r.interrupt ? t : D) : n(m);
  }
  function R(m) {
    return te(m) ? (e.consume(m), R) : j(m);
  }
  function N(m) {
    return m === 47 ? (e.consume(m), j) : m === 58 || m === 95 || ct(m) ? (e.consume(m), F) : te(m) ? (e.consume(m), N) : j(m);
  }
  function F(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || Ye(m) ? (e.consume(m), F) : q(m);
  }
  function q(m) {
    return m === 61 ? (e.consume(m), k) : te(m) ? (e.consume(m), q) : N(m);
  }
  function k(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (e.consume(m), u = m, $) : te(m) ? (e.consume(m), k) : V(m);
  }
  function $(m) {
    return m === u ? (e.consume(m), u = null, H) : m === null || z(m) ? n(m) : (e.consume(m), $);
  }
  function V(m) {
    return m === null || m === 34 || m === 39 || m === 47 || m === 60 || m === 61 || m === 62 || m === 96 || Be(m) ? q(m) : (e.consume(m), V);
  }
  function H(m) {
    return m === 47 || m === 62 || te(m) ? N(m) : n(m);
  }
  function j(m) {
    return m === 62 ? (e.consume(m), T) : n(m);
  }
  function T(m) {
    return m === null || z(m) ? D(m) : te(m) ? (e.consume(m), T) : n(m);
  }
  function D(m) {
    return m === 45 && i === 2 ? (e.consume(m), fe) : m === 60 && i === 1 ? (e.consume(m), Ce) : m === 62 && i === 4 ? (e.consume(m), Q) : m === 63 && i === 3 ? (e.consume(m), C) : m === 93 && i === 5 ? (e.consume(m), Fe) : z(m) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Ao, Ae, G)(m)) : m === null || z(m) ? (e.exit("htmlFlowData"), G(m)) : (e.consume(m), D);
  }
  function G(m) {
    return e.check(Mo, re, Ae)(m);
  }
  function re(m) {
    return e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), Y;
  }
  function Y(m) {
    return m === null || z(m) ? G(m) : (e.enter("htmlFlowData"), D(m));
  }
  function fe(m) {
    return m === 45 ? (e.consume(m), C) : D(m);
  }
  function Ce(m) {
    return m === 47 ? (e.consume(m), l = "", Se) : D(m);
  }
  function Se(m) {
    if (m === 62) {
      const Te = l.toLowerCase();
      return Hr.includes(Te) ? (e.consume(m), Q) : D(m);
    }
    return ct(m) && l.length < 8 ? (e.consume(m), l += String.fromCharCode(m), Se) : D(m);
  }
  function Fe(m) {
    return m === 93 ? (e.consume(m), C) : D(m);
  }
  function C(m) {
    return m === 62 ? (e.consume(m), Q) : m === 45 && i === 2 ? (e.consume(m), C) : D(m);
  }
  function Q(m) {
    return m === null || z(m) ? (e.exit("htmlFlowData"), Ae(m)) : (e.consume(m), Q);
  }
  function Ae(m) {
    return e.exit("htmlFlow"), t(m);
  }
}
function Do(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return z(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), a) : n(l);
  }
  function a(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
function Ro(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(wn, t, n);
  }
}
const Po = {
  name: "htmlText",
  tokenize: Oo
};
function Oo(e, t, n) {
  const r = this;
  let i, a, l;
  return o;
  function o(C) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(C), u;
  }
  function u(C) {
    return C === 33 ? (e.consume(C), p) : C === 47 ? (e.consume(C), q) : C === 63 ? (e.consume(C), N) : ct(C) ? (e.consume(C), V) : n(C);
  }
  function p(C) {
    return C === 45 ? (e.consume(C), s) : C === 91 ? (e.consume(C), a = 0, y) : ct(C) ? (e.consume(C), R) : n(C);
  }
  function s(C) {
    return C === 45 ? (e.consume(C), h) : n(C);
  }
  function d(C) {
    return C === null ? n(C) : C === 45 ? (e.consume(C), f) : z(C) ? (l = d, Ce(C)) : (e.consume(C), d);
  }
  function f(C) {
    return C === 45 ? (e.consume(C), h) : d(C);
  }
  function h(C) {
    return C === 62 ? fe(C) : C === 45 ? f(C) : d(C);
  }
  function y(C) {
    const Q = "CDATA[";
    return C === Q.charCodeAt(a++) ? (e.consume(C), a === Q.length ? b : y) : n(C);
  }
  function b(C) {
    return C === null ? n(C) : C === 93 ? (e.consume(C), A) : z(C) ? (l = b, Ce(C)) : (e.consume(C), b);
  }
  function A(C) {
    return C === 93 ? (e.consume(C), w) : b(C);
  }
  function w(C) {
    return C === 62 ? fe(C) : C === 93 ? (e.consume(C), w) : b(C);
  }
  function R(C) {
    return C === null || C === 62 ? fe(C) : z(C) ? (l = R, Ce(C)) : (e.consume(C), R);
  }
  function N(C) {
    return C === null ? n(C) : C === 63 ? (e.consume(C), F) : z(C) ? (l = N, Ce(C)) : (e.consume(C), N);
  }
  function F(C) {
    return C === 62 ? fe(C) : N(C);
  }
  function q(C) {
    return ct(C) ? (e.consume(C), k) : n(C);
  }
  function k(C) {
    return C === 45 || Ye(C) ? (e.consume(C), k) : $(C);
  }
  function $(C) {
    return z(C) ? (l = $, Ce(C)) : te(C) ? (e.consume(C), $) : fe(C);
  }
  function V(C) {
    return C === 45 || Ye(C) ? (e.consume(C), V) : C === 47 || C === 62 || Be(C) ? H(C) : n(C);
  }
  function H(C) {
    return C === 47 ? (e.consume(C), fe) : C === 58 || C === 95 || ct(C) ? (e.consume(C), j) : z(C) ? (l = H, Ce(C)) : te(C) ? (e.consume(C), H) : fe(C);
  }
  function j(C) {
    return C === 45 || C === 46 || C === 58 || C === 95 || Ye(C) ? (e.consume(C), j) : T(C);
  }
  function T(C) {
    return C === 61 ? (e.consume(C), D) : z(C) ? (l = T, Ce(C)) : te(C) ? (e.consume(C), T) : H(C);
  }
  function D(C) {
    return C === null || C === 60 || C === 61 || C === 62 || C === 96 ? n(C) : C === 34 || C === 39 ? (e.consume(C), i = C, G) : z(C) ? (l = D, Ce(C)) : te(C) ? (e.consume(C), D) : (e.consume(C), re);
  }
  function G(C) {
    return C === i ? (e.consume(C), i = void 0, Y) : C === null ? n(C) : z(C) ? (l = G, Ce(C)) : (e.consume(C), G);
  }
  function re(C) {
    return C === null || C === 34 || C === 39 || C === 60 || C === 61 || C === 96 ? n(C) : C === 47 || C === 62 || Be(C) ? H(C) : (e.consume(C), re);
  }
  function Y(C) {
    return C === 47 || C === 62 || Be(C) ? H(C) : n(C);
  }
  function fe(C) {
    return C === 62 ? (e.consume(C), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(C);
  }
  function Ce(C) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(C), e.exit("lineEnding"), Se;
  }
  function Se(C) {
    return te(C) ? ce(e, Fe, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(C) : Fe(C);
  }
  function Fe(C) {
    return e.enter("htmlTextData"), l(C);
  }
}
const dr = {
  name: "labelEnd",
  resolveAll: Bo,
  resolveTo: Ho,
  tokenize: jo
}, Fo = {
  tokenize: $o
}, zo = {
  tokenize: Vo
}, Uo = {
  tokenize: Wo
};
function Bo(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e.length !== n.length && ut(e, 0, e.length, n), e;
}
function Ho(e, t) {
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
  const u = {
    type: e[a][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[a][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, p = {
    type: "label",
    start: {
      ...e[a][1].start
    },
    end: {
      ...e[l][1].end
    }
  }, s = {
    type: "labelText",
    start: {
      ...e[a + r + 2][1].end
    },
    end: {
      ...e[l - 2][1].start
    }
  };
  return o = [["enter", u, t], ["enter", p, t]], o = Qe(o, e.slice(a + 1, a + r + 3)), o = Qe(o, [["enter", s, t]]), o = Qe(o, hr(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, l - 3), t)), o = Qe(o, [["exit", s, t], e[l - 2], e[l - 1], ["exit", p, t]]), o = Qe(o, e.slice(l + 1)), o = Qe(o, [["exit", u, t]]), ut(e, a, e.length, o), e;
}
function jo(e, t, n) {
  const r = this;
  let i = r.events.length, a, l;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return o;
  function o(f) {
    return a ? a._inactive ? d(f) : (l = r.parser.defined.includes(Rt(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(f), e.exit("labelMarker"), e.exit("labelEnd"), u) : n(f);
  }
  function u(f) {
    return f === 40 ? e.attempt(Fo, s, l ? s : d)(f) : f === 91 ? e.attempt(zo, s, l ? p : d)(f) : l ? s(f) : d(f);
  }
  function p(f) {
    return e.attempt(Uo, s, d)(f);
  }
  function s(f) {
    return t(f);
  }
  function d(f) {
    return a._balanced = !0, n(f);
  }
}
function $o(e, t, n) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), i;
  }
  function i(d) {
    return Be(d) ? qt(e, a)(d) : a(d);
  }
  function a(d) {
    return d === 41 ? s(d) : ji(e, l, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function l(d) {
    return Be(d) ? qt(e, u)(d) : s(d);
  }
  function o(d) {
    return n(d);
  }
  function u(d) {
    return d === 34 || d === 39 || d === 40 ? Vi(e, p, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : s(d);
  }
  function p(d) {
    return Be(d) ? qt(e, s)(d) : s(d);
  }
  function s(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), t) : n(d);
  }
}
function Vo(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return $i.call(r, e, a, l, "reference", "referenceMarker", "referenceString")(o);
  }
  function a(o) {
    return r.parser.defined.includes(Rt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(o) : n(o);
  }
  function l(o) {
    return n(o);
  }
}
function Wo(e, t, n) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), i;
  }
  function i(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), t) : n(a);
  }
}
const Zo = {
  name: "labelStartImage",
  resolveAll: dr.resolveAll,
  tokenize: qo
};
function qo(e, t, n) {
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
const Go = {
  name: "labelStartLink",
  resolveAll: dr.resolveAll,
  tokenize: Yo
};
function Yo(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(l), e.exit("labelMarker"), e.exit("labelLink"), a;
  }
  function a(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : t(l);
  }
}
const An = {
  name: "lineEnding",
  tokenize: Xo
};
function Xo(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), ce(e, t, "linePrefix");
  }
}
const cn = {
  name: "thematicBreak",
  tokenize: Jo
};
function Jo(e, t, n) {
  let r = 0, i;
  return a;
  function a(p) {
    return e.enter("thematicBreak"), l(p);
  }
  function l(p) {
    return i = p, o(p);
  }
  function o(p) {
    return p === i ? (e.enter("thematicBreakSequence"), u(p)) : r >= 3 && (p === null || z(p)) ? (e.exit("thematicBreak"), t(p)) : n(p);
  }
  function u(p) {
    return p === i ? (e.consume(p), r++, u) : (e.exit("thematicBreakSequence"), te(p) ? ce(e, o, "whitespace")(p) : o(p));
  }
}
const Ue = {
  continuation: {
    tokenize: ts
  },
  exit: rs,
  name: "list",
  tokenize: es
}, Ko = {
  partial: !0,
  tokenize: is
}, Qo = {
  partial: !0,
  tokenize: ns
};
function es(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, l = 0;
  return o;
  function o(h) {
    const y = r.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (y === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : Yn(h)) {
      if (r.containerState.type || (r.containerState.type = y, e.enter(y, {
        _container: !0
      })), y === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(cn, n, p)(h) : p(h);
      if (!r.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), u(h);
    }
    return n(h);
  }
  function u(h) {
    return Yn(h) && ++l < 10 ? (e.consume(h), u) : (!r.interrupt || l < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), p(h)) : n(h);
  }
  function p(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e.check(
      wn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : s,
      e.attempt(Ko, f, d)
    );
  }
  function s(h) {
    return r.containerState.initialBlankLine = !0, a++, f(h);
  }
  function d(h) {
    return te(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), f) : n(h);
  }
  function f(h) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(h);
  }
}
function ts(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(wn, i, a);
  function i(o) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, ce(e, t, "listItemIndent", r.containerState.size + 1)(o);
  }
  function a(o) {
    return r.containerState.furtherBlankLines || !te(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Qo, t, l)(o));
  }
  function l(o) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, ce(e, e.attempt(Ue, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
  }
}
function ns(e, t, n) {
  const r = this;
  return ce(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function rs(e) {
  e.exit(this.containerState.type);
}
function is(e, t, n) {
  const r = this;
  return ce(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const l = r.events[r.events.length - 1];
    return !te(a) && l && l[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const jr = {
  name: "setextUnderline",
  resolveTo: as,
  tokenize: ls
};
function as(e, t) {
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
function ls(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(p) {
    let s = r.events.length, d;
    for (; s--; )
      if (r.events[s][1].type !== "lineEnding" && r.events[s][1].type !== "linePrefix" && r.events[s][1].type !== "content") {
        d = r.events[s][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || d) ? (e.enter("setextHeadingLine"), i = p, l(p)) : n(p);
  }
  function l(p) {
    return e.enter("setextHeadingLineSequence"), o(p);
  }
  function o(p) {
    return p === i ? (e.consume(p), o) : (e.exit("setextHeadingLineSequence"), te(p) ? ce(e, u, "lineSuffix")(p) : u(p));
  }
  function u(p) {
    return p === null || z(p) ? (e.exit("setextHeadingLine"), t(p)) : n(p);
  }
}
const os = {
  tokenize: ss
};
function ss(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    wn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, ce(e, e.attempt(this.parser.constructs.flow, i, e.attempt(ho, i)), "linePrefix"))
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
const cs = {
  resolveAll: Zi()
}, us = Wi("string"), ps = Wi("text");
function Wi(e) {
  return {
    resolveAll: Zi(e === "text" ? hs : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], a = n.attempt(i, l, o);
    return l;
    function l(s) {
      return p(s) ? a(s) : o(s);
    }
    function o(s) {
      if (s === null) {
        n.consume(s);
        return;
      }
      return n.enter("data"), n.consume(s), u;
    }
    function u(s) {
      return p(s) ? (n.exit("data"), a(s)) : (n.consume(s), u);
    }
    function p(s) {
      if (s === null)
        return !0;
      const d = i[s];
      let f = -1;
      if (d)
        for (; ++f < d.length; ) {
          const h = d[f];
          if (!h.previous || h.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Zi(e) {
  return t;
  function t(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === "data" && (a = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function hs(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let a = i.length, l = -1, o = 0, u;
      for (; a--; ) {
        const p = i[a];
        if (typeof p == "string") {
          for (l = p.length; p.charCodeAt(l - 1) === 32; )
            o++, l--;
          if (l) break;
          l = -1;
        } else if (p === -2)
          u = !0, o++;
        else if (p !== -1) {
          a++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (o = 0), o) {
        const p = {
          type: n === e.length || u || o < 2 ? "lineSuffix" : "hardBreakTrailing",
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
          ...p.start
        }, r.start.offset === r.end.offset ? Object.assign(r, p) : (e.splice(n, 0, ["enter", p, t], ["exit", p, t]), n += 2);
      }
      n++;
    }
  return e;
}
const ds = {
  42: Ue,
  43: Ue,
  45: Ue,
  48: Ue,
  49: Ue,
  50: Ue,
  51: Ue,
  52: Ue,
  53: Ue,
  54: Ue,
  55: Ue,
  56: Ue,
  57: Ue,
  62: zi
}, fs = {
  91: yo
}, ms = {
  [-2]: In,
  [-1]: In,
  32: In
}, gs = {
  35: So,
  42: cn,
  45: [jr, cn],
  60: Io,
  61: jr,
  95: cn,
  96: Br,
  126: Br
}, Cs = {
  38: Bi,
  92: Ui
}, ys = {
  [-5]: An,
  [-4]: An,
  [-3]: An,
  33: Zo,
  38: Bi,
  42: Xn,
  60: [ql, Po],
  91: Go,
  92: [bo, Ui],
  93: dr,
  95: Xn,
  96: lo
}, ws = {
  null: [Xn, cs]
}, xs = {
  null: [42, 95]
}, ks = {
  null: []
}, bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: xs,
  contentInitial: fs,
  disable: ks,
  document: ds,
  flow: gs,
  flowInitial: ms,
  insideSpan: ws,
  string: Cs,
  text: ys
}, Symbol.toStringTag, { value: "Module" }));
function _s(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, a = [];
  let l = [], o = [];
  const u = {
    attempt: $(q),
    check: $(k),
    consume: R,
    enter: N,
    exit: F,
    interrupt: $(k, {
      interrupt: !0
    })
  }, p = {
    code: null,
    containerState: {},
    defineSkip: b,
    events: [],
    now: y,
    parser: e,
    previous: null,
    sliceSerialize: f,
    sliceStream: h,
    write: d
  };
  let s = t.tokenize.call(p, u);
  return t.resolveAll && a.push(t), p;
  function d(T) {
    return l = Qe(l, T), A(), l[l.length - 1] !== null ? [] : (V(t, 0), p.events = hr(a, p.events, p), p.events);
  }
  function f(T, D) {
    return Ts(h(T), D);
  }
  function h(T) {
    return Ss(l, T);
  }
  function y() {
    const {
      _bufferIndex: T,
      _index: D,
      line: G,
      column: re,
      offset: Y
    } = r;
    return {
      _bufferIndex: T,
      _index: D,
      line: G,
      column: re,
      offset: Y
    };
  }
  function b(T) {
    i[T.line] = T.column, j();
  }
  function A() {
    let T;
    for (; r._index < l.length; ) {
      const D = l[r._index];
      if (typeof D == "string")
        for (T = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === T && r._bufferIndex < D.length; )
          w(D.charCodeAt(r._bufferIndex));
      else
        w(D);
    }
  }
  function w(T) {
    s = s(T);
  }
  function R(T) {
    z(T) ? (r.line++, r.column = 1, r.offset += T === -3 ? 2 : 1, j()) : T !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[r._index].length && (r._bufferIndex = -1, r._index++)), p.previous = T;
  }
  function N(T, D) {
    const G = D || {};
    return G.type = T, G.start = y(), p.events.push(["enter", G, p]), o.push(G), G;
  }
  function F(T) {
    const D = o.pop();
    return D.end = y(), p.events.push(["exit", D, p]), D;
  }
  function q(T, D) {
    V(T, D.from);
  }
  function k(T, D) {
    D.restore();
  }
  function $(T, D) {
    return G;
    function G(re, Y, fe) {
      let Ce, Se, Fe, C;
      return Array.isArray(re) ? (
        /* c8 ignore next 1 */
        Ae(re)
      ) : "tokenize" in re ? (
        // Looks like a construct.
        Ae([
          /** @type {Construct} */
          re
        ])
      ) : Q(re);
      function Q(le) {
        return ze;
        function ze(ye) {
          const Me = ye !== null && le[ye], je = ye !== null && le.null, pt = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Me) ? Me : Me ? [Me] : [],
            ...Array.isArray(je) ? je : je ? [je] : []
          ];
          return Ae(pt)(ye);
        }
      }
      function Ae(le) {
        return Ce = le, Se = 0, le.length === 0 ? fe : m(le[Se]);
      }
      function m(le) {
        return ze;
        function ze(ye) {
          return C = H(), Fe = le, le.partial || (p.currentConstruct = le), le.name && p.parser.constructs.disable.null.includes(le.name) ? K() : le.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            D ? Object.assign(Object.create(p), D) : p,
            u,
            Te,
            K
          )(ye);
        }
      }
      function Te(le) {
        return T(Fe, C), Y;
      }
      function K(le) {
        return C.restore(), ++Se < Ce.length ? m(Ce[Se]) : fe;
      }
    }
  }
  function V(T, D) {
    T.resolveAll && !a.includes(T) && a.push(T), T.resolve && ut(p.events, D, p.events.length - D, T.resolve(p.events.slice(D), p)), T.resolveTo && (p.events = T.resolveTo(p.events, p));
  }
  function H() {
    const T = y(), D = p.previous, G = p.currentConstruct, re = p.events.length, Y = Array.from(o);
    return {
      from: re,
      restore: fe
    };
    function fe() {
      r = T, p.previous = D, p.currentConstruct = G, p.events.length = re, o = Y, j();
    }
  }
  function j() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Ss(e, t) {
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
function Ts(e, t) {
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
function Es(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Ll([bs, ...(e || {}).extensions || []])
    ),
    content: i(Bl),
    defined: [],
    document: i(jl),
    flow: i(os),
    lazy: {},
    string: i(us),
    text: i(ps)
  };
  return r;
  function i(a) {
    return l;
    function l(o) {
      return _s(r, a, o);
    }
  }
}
function vs(e) {
  for (; !Hi(e); )
    ;
  return e;
}
const $r = /[\0\t\n\r]/g;
function Is() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, l, o) {
    const u = [];
    let p, s, d, f, h;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(l || void 0).decode(a)), d = 0, t = "", n && (a.charCodeAt(0) === 65279 && d++, n = void 0); d < a.length; ) {
      if ($r.lastIndex = d, p = $r.exec(a), f = p && p.index !== void 0 ? p.index : a.length, h = a.charCodeAt(f), !p) {
        t = a.slice(d);
        break;
      }
      if (h === 10 && d === f && r)
        u.push(-3), r = void 0;
      else
        switch (r && (u.push(-5), r = void 0), d < f && (u.push(a.slice(d, f)), e += f - d), h) {
          case 0: {
            u.push(65533), e++;
            break;
          }
          case 9: {
            for (s = Math.ceil(e / 4) * 4, u.push(-2); e++ < s; ) u.push(-1);
            break;
          }
          case 10: {
            u.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      d = f + 1;
    }
    return o && (r && u.push(-5), t && u.push(t), u.push(null)), u;
  }
}
const As = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Ms(e) {
  return e.replace(As, Ns);
}
function Ns(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return Fi(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return pr(n) || e;
}
const qi = {}.hasOwnProperty;
function Ls(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Ds(n)(vs(Es(n).document().write(Is()(e, t, !0))));
}
function Ds(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(Ne),
      autolinkProtocol: H,
      autolinkEmail: H,
      atxHeading: a($e),
      blockQuote: a(je),
      characterEscape: H,
      characterReference: H,
      codeFenced: a(pt),
      codeFencedFenceInfo: l,
      codeFencedFenceMeta: l,
      codeIndented: a(pt, l),
      codeText: a(vt, l),
      codeTextData: H,
      data: H,
      codeFlowValue: H,
      definition: a(at),
      definitionDestinationString: l,
      definitionLabelString: l,
      definitionTitleString: l,
      emphasis: a(lt),
      hardBreakEscape: a(tt),
      hardBreakTrailing: a(tt),
      htmlFlow: a(Ee, l),
      htmlFlowData: H,
      htmlText: a(Ee, l),
      htmlTextData: H,
      image: a(ot),
      label: l,
      link: a(Ne),
      listItem: a(Ve),
      listItemValue: f,
      listOrdered: a(Xe, d),
      listUnordered: a(Xe),
      paragraph: a(It),
      reference: m,
      referenceString: l,
      resourceDestinationString: l,
      resourceTitleString: l,
      setextHeading: a($e),
      strong: a(Ft),
      thematicBreak: a(ht)
    },
    exit: {
      atxHeading: u(),
      atxHeadingSequence: q,
      autolink: u(),
      autolinkEmail: Me,
      autolinkProtocol: ye,
      blockQuote: u(),
      characterEscapeValue: j,
      characterReferenceMarkerHexadecimal: K,
      characterReferenceMarkerNumeric: K,
      characterReferenceValue: le,
      characterReference: ze,
      codeFenced: u(A),
      codeFencedFence: b,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: y,
      codeFlowValue: j,
      codeIndented: u(w),
      codeText: u(Y),
      codeTextData: j,
      data: j,
      definition: u(),
      definitionDestinationString: F,
      definitionLabelString: R,
      definitionTitleString: N,
      emphasis: u(),
      hardBreakEscape: u(D),
      hardBreakTrailing: u(D),
      htmlFlow: u(G),
      htmlFlowData: j,
      htmlText: u(re),
      htmlTextData: j,
      image: u(Ce),
      label: Fe,
      labelText: Se,
      lineEnding: T,
      link: u(fe),
      listItem: u(),
      listOrdered: u(),
      listUnordered: u(),
      paragraph: u(),
      referenceString: Te,
      resourceDestinationString: C,
      resourceTitleString: Q,
      resource: Ae,
      setextHeading: u(V),
      setextHeadingLineSequence: $,
      setextHeadingText: k,
      strong: u(),
      thematicBreak: u()
    }
  };
  Gi(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(x) {
    let v = {
      type: "root",
      children: []
    };
    const O = {
      stack: [v],
      tokenStack: [],
      config: t,
      enter: o,
      exit: p,
      buffer: l,
      resume: s,
      data: n
    }, U = [];
    let ee = -1;
    for (; ++ee < x.length; )
      if (x[ee][1].type === "listOrdered" || x[ee][1].type === "listUnordered")
        if (x[ee][0] === "enter")
          U.push(ee);
        else {
          const ke = U.pop();
          ee = i(x, ke, ee);
        }
    for (ee = -1; ++ee < x.length; ) {
      const ke = t[x[ee][0]];
      qi.call(ke, x[ee][1].type) && ke[x[ee][1].type].call(Object.assign({
        sliceSerialize: x[ee][2].sliceSerialize
      }, O), x[ee][1]);
    }
    if (O.tokenStack.length > 0) {
      const ke = O.tokenStack[O.tokenStack.length - 1];
      (ke[1] || Vr).call(O, void 0, ke[0]);
    }
    for (v.position = {
      start: xt(x.length > 0 ? x[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: xt(x.length > 0 ? x[x.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, ee = -1; ++ee < t.transforms.length; )
      v = t.transforms[ee](v) || v;
    return v;
  }
  function i(x, v, O) {
    let U = v - 1, ee = -1, ke = !1, We, be, Ze, de;
    for (; ++U <= O; ) {
      const ue = x[U];
      switch (ue[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          ue[0] === "enter" ? ee++ : ee--, de = void 0;
          break;
        }
        case "lineEndingBlank": {
          ue[0] === "enter" && (We && !de && !ee && !Ze && (Ze = U), de = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          de = void 0;
      }
      if (!ee && ue[0] === "enter" && ue[1].type === "listItemPrefix" || ee === -1 && ue[0] === "exit" && (ue[1].type === "listUnordered" || ue[1].type === "listOrdered")) {
        if (We) {
          let Je = U;
          for (be = void 0; Je--; ) {
            const Le = x[Je];
            if (Le[1].type === "lineEnding" || Le[1].type === "lineEndingBlank") {
              if (Le[0] === "exit") continue;
              be && (x[be][1].type = "lineEndingBlank", ke = !0), Le[1].type = "lineEnding", be = Je;
            } else if (!(Le[1].type === "linePrefix" || Le[1].type === "blockQuotePrefix" || Le[1].type === "blockQuotePrefixWhitespace" || Le[1].type === "blockQuoteMarker" || Le[1].type === "listItemIndent")) break;
          }
          Ze && (!be || Ze < be) && (We._spread = !0), We.end = Object.assign({}, be ? x[be][1].start : ue[1].end), x.splice(be || U, 0, ["exit", We, ue[2]]), U++, O++;
        }
        if (ue[1].type === "listItemPrefix") {
          const Je = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, ue[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          We = Je, x.splice(U, 0, ["enter", Je, ue[2]]), U++, O++, Ze = void 0, de = !0;
        }
      }
    }
    return x[v][1]._spread = ke, O;
  }
  function a(x, v) {
    return O;
    function O(U) {
      o.call(this, x(U), U), v && v.call(this, U);
    }
  }
  function l() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function o(x, v, O) {
    this.stack[this.stack.length - 1].children.push(x), this.stack.push(x), this.tokenStack.push([v, O || void 0]), x.position = {
      start: xt(v.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function u(x) {
    return v;
    function v(O) {
      x && x.call(this, O), p.call(this, O);
    }
  }
  function p(x, v) {
    const O = this.stack.pop(), U = this.tokenStack.pop();
    if (U)
      U[0].type !== x.type && (v ? v.call(this, x, U[0]) : (U[1] || Vr).call(this, x, U[0]));
    else throw new Error("Cannot close `" + x.type + "` (" + Zt({
      start: x.start,
      end: x.end
    }) + "): it’s not open");
    O.position.end = xt(x.end);
  }
  function s() {
    return Ml(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function f(x) {
    if (this.data.expectingFirstListItemValue) {
      const v = this.stack[this.stack.length - 2];
      v.start = Number.parseInt(this.sliceSerialize(x), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const x = this.resume(), v = this.stack[this.stack.length - 1];
    v.lang = x;
  }
  function y() {
    const x = this.resume(), v = this.stack[this.stack.length - 1];
    v.meta = x;
  }
  function b() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function A() {
    const x = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = x.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function w() {
    const x = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = x.replace(/(\r?\n|\r)$/g, "");
  }
  function R(x) {
    const v = this.resume(), O = this.stack[this.stack.length - 1];
    O.label = v, O.identifier = Rt(this.sliceSerialize(x)).toLowerCase();
  }
  function N() {
    const x = this.resume(), v = this.stack[this.stack.length - 1];
    v.title = x;
  }
  function F() {
    const x = this.resume(), v = this.stack[this.stack.length - 1];
    v.url = x;
  }
  function q(x) {
    const v = this.stack[this.stack.length - 1];
    if (!v.depth) {
      const O = this.sliceSerialize(x).length;
      v.depth = O;
    }
  }
  function k() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function $(x) {
    const v = this.stack[this.stack.length - 1];
    v.depth = this.sliceSerialize(x).codePointAt(0) === 61 ? 1 : 2;
  }
  function V() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function H(x) {
    const O = this.stack[this.stack.length - 1].children;
    let U = O[O.length - 1];
    (!U || U.type !== "text") && (U = bt(), U.position = {
      start: xt(x.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, O.push(U)), this.stack.push(U);
  }
  function j(x) {
    const v = this.stack.pop();
    v.value += this.sliceSerialize(x), v.position.end = xt(x.end);
  }
  function T(x) {
    const v = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const O = v.children[v.children.length - 1];
      O.position.end = xt(x.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(v.type) && (H.call(this, x), j.call(this, x));
  }
  function D() {
    this.data.atHardBreak = !0;
  }
  function G() {
    const x = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = x;
  }
  function re() {
    const x = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = x;
  }
  function Y() {
    const x = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = x;
  }
  function fe() {
    const x = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const v = this.data.referenceType || "shortcut";
      x.type += "Reference", x.referenceType = v, delete x.url, delete x.title;
    } else
      delete x.identifier, delete x.label;
    this.data.referenceType = void 0;
  }
  function Ce() {
    const x = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const v = this.data.referenceType || "shortcut";
      x.type += "Reference", x.referenceType = v, delete x.url, delete x.title;
    } else
      delete x.identifier, delete x.label;
    this.data.referenceType = void 0;
  }
  function Se(x) {
    const v = this.sliceSerialize(x), O = this.stack[this.stack.length - 2];
    O.label = Ms(v), O.identifier = Rt(v).toLowerCase();
  }
  function Fe() {
    const x = this.stack[this.stack.length - 1], v = this.resume(), O = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, O.type === "link") {
      const U = x.children;
      O.children = U;
    } else
      O.alt = v;
  }
  function C() {
    const x = this.resume(), v = this.stack[this.stack.length - 1];
    v.url = x;
  }
  function Q() {
    const x = this.resume(), v = this.stack[this.stack.length - 1];
    v.title = x;
  }
  function Ae() {
    this.data.inReference = void 0;
  }
  function m() {
    this.data.referenceType = "collapsed";
  }
  function Te(x) {
    const v = this.resume(), O = this.stack[this.stack.length - 1];
    O.label = v, O.identifier = Rt(this.sliceSerialize(x)).toLowerCase(), this.data.referenceType = "full";
  }
  function K(x) {
    this.data.characterReferenceType = x.type;
  }
  function le(x) {
    const v = this.sliceSerialize(x), O = this.data.characterReferenceType;
    let U;
    O ? (U = Fi(v, O === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : U = pr(v);
    const ee = this.stack[this.stack.length - 1];
    ee.value += U;
  }
  function ze(x) {
    const v = this.stack.pop();
    v.position.end = xt(x.end);
  }
  function ye(x) {
    j.call(this, x);
    const v = this.stack[this.stack.length - 1];
    v.url = this.sliceSerialize(x);
  }
  function Me(x) {
    j.call(this, x);
    const v = this.stack[this.stack.length - 1];
    v.url = "mailto:" + this.sliceSerialize(x);
  }
  function je() {
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
  function vt() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function at() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function lt() {
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
  function tt() {
    return {
      type: "break"
    };
  }
  function Ee() {
    return {
      type: "html",
      value: ""
    };
  }
  function ot() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Ne() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Xe(x) {
    return {
      type: "list",
      ordered: x.type === "listOrdered",
      start: null,
      spread: x._spread,
      children: []
    };
  }
  function Ve(x) {
    return {
      type: "listItem",
      spread: x._spread,
      checked: null,
      children: []
    };
  }
  function It() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Ft() {
    return {
      type: "strong",
      children: []
    };
  }
  function bt() {
    return {
      type: "text",
      value: ""
    };
  }
  function ht() {
    return {
      type: "thematicBreak"
    };
  }
}
function xt(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function Gi(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Gi(e, r) : Rs(e, r);
  }
}
function Rs(e, t) {
  let n;
  for (n in t)
    if (qi.call(t, n))
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
function Vr(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Zt({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Zt({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Zt({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function Ps(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return Ls(r, {
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
function Os(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Fs(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function zs(e, t) {
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
function Us(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Bs(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Hs(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Ot(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
  let l, o = e.footnoteCounts.get(r);
  o === void 0 ? (o = 0, e.footnoteOrder.push(r), l = e.footnoteOrder.length) : l = a + 1, o += 1, e.footnoteCounts.set(r, o);
  const u = {
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
  e.patch(t, u);
  const p = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [u]
  };
  return e.patch(t, p), e.applyData(t, p);
}
function js(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function $s(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function Yi(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const l = i[i.length - 1];
  return l && l.type === "text" ? l.value += r : i.push({ type: "text", value: r }), i;
}
function Vs(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Yi(e, t);
  const i = { src: Ot(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function Ws(e, t) {
  const n = { src: Ot(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function Zs(e, t) {
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
function qs(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Yi(e, t);
  const i = { href: Ot(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function Gs(e, t) {
  const n = { href: Ot(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Ys(e, t, n) {
  const r = e.all(t), i = n ? Xs(n) : Xi(t), a = {}, l = [];
  if (typeof t.checked == "boolean") {
    const s = r[0];
    let d;
    s && s.type === "element" && s.tagName === "p" ? d = s : (d = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(d)), d.children.length > 0 && d.children.unshift({ type: "text", value: " " }), d.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), a.className = ["task-list-item"];
  }
  let o = -1;
  for (; ++o < r.length; ) {
    const s = r[o];
    (i || o !== 0 || s.type !== "element" || s.tagName !== "p") && l.push({ type: "text", value: `
` }), s.type === "element" && s.tagName === "p" && !i ? l.push(...s.children) : l.push(s);
  }
  const u = r[r.length - 1];
  u && (i || u.type !== "element" || u.tagName !== "p") && l.push({ type: "text", value: `
` });
  const p = { type: "element", tagName: "li", properties: a, children: l };
  return e.patch(t, p), e.applyData(t, p);
}
function Xs(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = Xi(n[r]);
  }
  return t;
}
function Xi(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function Js(e, t) {
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
function Ks(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Qs(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function e1(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function t1(e, t) {
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
    }, o = or(t.children[1]), u = Mi(t.children[t.children.length - 1]);
    o && u && (l.position = { start: o, end: u }), i.push(l);
  }
  const a = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function n1(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", l = n && n.type === "table" ? n.align : void 0, o = l ? l.length : t.children.length;
  let u = -1;
  const p = [];
  for (; ++u < o; ) {
    const d = t.children[u], f = {}, h = l ? l[u] : void 0;
    h && (f.align = h);
    let y = { type: "element", tagName: a, properties: f, children: [] };
    d && (y.children = e.all(d), e.patch(d, y), y = e.applyData(d, y)), p.push(y);
  }
  const s = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(p, !0)
  };
  return e.patch(t, s), e.applyData(t, s);
}
function r1(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Wr = 9, Zr = 32;
function i1(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const a = [];
  for (; r; )
    a.push(
      qr(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return a.push(qr(t.slice(i), i > 0, !1)), a.join("");
}
function qr(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let a = e.codePointAt(r);
    for (; a === Wr || a === Zr; )
      r++, a = e.codePointAt(r);
  }
  if (n) {
    let a = e.codePointAt(i - 1);
    for (; a === Wr || a === Zr; )
      i--, a = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function a1(e, t) {
  const n = { type: "text", value: i1(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function l1(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const o1 = {
  blockquote: Os,
  break: Fs,
  code: zs,
  delete: Us,
  emphasis: Bs,
  footnoteReference: Hs,
  heading: js,
  html: $s,
  imageReference: Vs,
  image: Ws,
  inlineCode: Zs,
  linkReference: qs,
  link: Gs,
  listItem: Ys,
  list: Js,
  paragraph: Ks,
  // @ts-expect-error: root is different, but hard to type.
  root: Qs,
  strong: e1,
  table: t1,
  tableCell: r1,
  tableRow: n1,
  text: a1,
  thematicBreak: l1,
  toml: rn,
  yaml: rn,
  definition: rn,
  footnoteDefinition: rn
};
function rn() {
}
const Ji = -1, xn = 0, Gt = 1, mn = 2, fr = 3, mr = 4, gr = 5, Cr = 6, Ki = 7, Qi = 8, Gr = typeof self == "object" ? self : globalThis, s1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, l] = t[i];
    switch (a) {
      case xn:
      case Ji:
        return n(l, i);
      case Gt: {
        const o = n([], i);
        for (const u of l)
          o.push(r(u));
        return o;
      }
      case mn: {
        const o = n({}, i);
        for (const [u, p] of l)
          o[r(u)] = r(p);
        return o;
      }
      case fr:
        return n(new Date(l), i);
      case mr: {
        const { source: o, flags: u } = l;
        return n(new RegExp(o, u), i);
      }
      case gr: {
        const o = n(/* @__PURE__ */ new Map(), i);
        for (const [u, p] of l)
          o.set(r(u), r(p));
        return o;
      }
      case Cr: {
        const o = n(/* @__PURE__ */ new Set(), i);
        for (const u of l)
          o.add(r(u));
        return o;
      }
      case Ki: {
        const { name: o, message: u } = l;
        return n(new Gr[o](u), i);
      }
      case Qi:
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
    return n(new Gr[a](l), i);
  };
  return r;
}, Yr = (e) => s1(/* @__PURE__ */ new Map(), e)(0), Nt = "", { toString: c1 } = {}, { keys: u1 } = Object, Bt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [xn, t];
  const n = c1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [Gt, Nt];
    case "Object":
      return [mn, Nt];
    case "Date":
      return [fr, Nt];
    case "RegExp":
      return [mr, Nt];
    case "Map":
      return [gr, Nt];
    case "Set":
      return [Cr, Nt];
    case "DataView":
      return [Gt, n];
  }
  return n.includes("Array") ? [Gt, n] : n.includes("Error") ? [Ki, n] : [mn, n];
}, an = ([e, t]) => e === xn && (t === "function" || t === "symbol"), p1 = (e, t, n, r) => {
  const i = (l, o) => {
    const u = r.push(l) - 1;
    return n.set(o, u), u;
  }, a = (l) => {
    if (n.has(l))
      return n.get(l);
    let [o, u] = Bt(l);
    switch (o) {
      case xn: {
        let s = l;
        switch (u) {
          case "bigint":
            o = Qi, s = l.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + u);
            s = null;
            break;
          case "undefined":
            return i([Ji], l);
        }
        return i([o, s], l);
      }
      case Gt: {
        if (u) {
          let f = l;
          return u === "DataView" ? f = new Uint8Array(l.buffer) : u === "ArrayBuffer" && (f = new Uint8Array(l)), i([u, [...f]], l);
        }
        const s = [], d = i([o, s], l);
        for (const f of l)
          s.push(a(f));
        return d;
      }
      case mn: {
        if (u)
          switch (u) {
            case "BigInt":
              return i([u, l.toString()], l);
            case "Boolean":
            case "Number":
            case "String":
              return i([u, l.valueOf()], l);
          }
        if (t && "toJSON" in l)
          return a(l.toJSON());
        const s = [], d = i([o, s], l);
        for (const f of u1(l))
          (e || !an(Bt(l[f]))) && s.push([a(f), a(l[f])]);
        return d;
      }
      case fr:
        return i([o, l.toISOString()], l);
      case mr: {
        const { source: s, flags: d } = l;
        return i([o, { source: s, flags: d }], l);
      }
      case gr: {
        const s = [], d = i([o, s], l);
        for (const [f, h] of l)
          (e || !(an(Bt(f)) || an(Bt(h)))) && s.push([a(f), a(h)]);
        return d;
      }
      case Cr: {
        const s = [], d = i([o, s], l);
        for (const f of l)
          (e || !an(Bt(f))) && s.push(a(f));
        return d;
      }
    }
    const { message: p } = l;
    return i([o, { name: u, message: p }], l);
  };
  return a;
}, Xr = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return p1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, gn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Yr(Xr(e, t)) : structuredClone(e)
) : (e, t) => Yr(Xr(e, t));
function h1(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function d1(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function f1(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || h1, r = e.options.footnoteBackLabel || d1, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", l = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let u = -1;
  for (; ++u < e.footnoteOrder.length; ) {
    const p = e.footnoteById.get(
      e.footnoteOrder[u]
    );
    if (!p)
      continue;
    const s = e.all(p), d = String(p.identifier).toUpperCase(), f = Ot(d.toLowerCase());
    let h = 0;
    const y = [], b = e.footnoteCounts.get(d);
    for (; b !== void 0 && ++h <= b; ) {
      y.length > 0 && y.push({ type: "text", value: " " });
      let R = typeof n == "string" ? n : n(u, h);
      typeof R == "string" && (R = { type: "text", value: R }), y.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + f + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(u, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(R) ? R : [R]
      });
    }
    const A = s[s.length - 1];
    if (A && A.type === "element" && A.tagName === "p") {
      const R = A.children[A.children.length - 1];
      R && R.type === "text" ? R.value += " " : A.children.push({ type: "text", value: " " }), A.children.push(...y);
    } else
      s.push(...y);
    const w = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + f },
      children: e.wrap(s, !0)
    };
    e.patch(p, w), o.push(w);
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
            ...gn(l),
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
const ea = (
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
      return y1;
    if (typeof e == "function")
      return kn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? m1(e) : g1(e);
    if (typeof e == "string")
      return C1(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function m1(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = ea(e[n]);
  return kn(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function g1(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return kn(n);
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
function C1(e) {
  return kn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function kn(e) {
  return t;
  function t(n, r, i) {
    return !!(w1(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function y1() {
  return !0;
}
function w1(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const ta = [], x1 = !0, Jr = !1, k1 = "skip";
function b1(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = ea(i), l = r ? -1 : 1;
  o(e, void 0, [])();
  function o(u, p, s) {
    const d = (
      /** @type {Record<string, unknown>} */
      u && typeof u == "object" ? u : {}
    );
    if (typeof d.type == "string") {
      const h = (
        // `hast`
        typeof d.tagName == "string" ? d.tagName : (
          // `xast`
          typeof d.name == "string" ? d.name : void 0
        )
      );
      Object.defineProperty(f, "name", {
        value: "node (" + (u.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return f;
    function f() {
      let h = ta, y, b, A;
      if ((!t || a(u, p, s[s.length - 1] || void 0)) && (h = _1(n(u, s)), h[0] === Jr))
        return h;
      if ("children" in u && u.children) {
        const w = (
          /** @type {UnistParent} */
          u
        );
        if (w.children && h[0] !== k1)
          for (b = (r ? w.children.length : -1) + l, A = s.concat(w); b > -1 && b < w.children.length; ) {
            const R = w.children[b];
            if (y = o(R, b, A)(), y[0] === Jr)
              return y;
            b = typeof y[1] == "number" ? y[1] : b + l;
          }
      }
      return h;
    }
  }
}
function _1(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [x1, e] : e == null ? ta : [e];
}
function na(e, t, n, r) {
  let i, a, l;
  typeof t == "function" && typeof n != "function" ? (a = void 0, l = t, i = n) : (a = t, l = n, i = r), b1(e, a, o, i);
  function o(u, p) {
    const s = p[p.length - 1], d = s ? s.children.indexOf(u) : void 0;
    return l(u, d, s);
  }
}
const Jn = {}.hasOwnProperty, S1 = {};
function T1(e, t) {
  const n = t || S1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = { ...o1, ...n.handlers }, o = {
    all: p,
    applyData: v1,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: l,
    one: u,
    options: n,
    patch: E1,
    wrap: A1
  };
  return na(e, function(s) {
    if (s.type === "definition" || s.type === "footnoteDefinition") {
      const d = s.type === "definition" ? r : i, f = String(s.identifier).toUpperCase();
      d.has(f) || d.set(f, s);
    }
  }), o;
  function u(s, d) {
    const f = s.type, h = o.handlers[f];
    if (Jn.call(o.handlers, f) && h)
      return h(o, s, d);
    if (o.options.passThrough && o.options.passThrough.includes(f)) {
      if ("children" in s) {
        const { children: b, ...A } = s, w = gn(A);
        return w.children = o.all(s), w;
      }
      return gn(s);
    }
    return (o.options.unknownHandler || I1)(o, s, d);
  }
  function p(s) {
    const d = [];
    if ("children" in s) {
      const f = s.children;
      let h = -1;
      for (; ++h < f.length; ) {
        const y = o.one(f[h], s);
        if (y) {
          if (h && f[h - 1].type === "break" && (!Array.isArray(y) && y.type === "text" && (y.value = Kr(y.value)), !Array.isArray(y) && y.type === "element")) {
            const b = y.children[0];
            b && b.type === "text" && (b.value = Kr(b.value));
          }
          Array.isArray(y) ? d.push(...y) : d.push(y);
        }
      }
    }
    return d;
  }
}
function E1(e, t) {
  e.position && (t.position = sl(e));
}
function v1(e, t) {
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
    n.type === "element" && a && Object.assign(n.properties, gn(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function I1(e, t) {
  const n = t.data || {}, r = "value" in t && !(Jn.call(n, "hProperties") || Jn.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function A1(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Kr(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function Qr(e, t) {
  const n = T1(e, t), r = n.one(e, void 0), i = f1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function M1(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      Qr(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      Qr(n, { file: r, ...e || t })
    );
  };
}
function ei(e) {
  if (e)
    throw e;
}
var un = Object.prototype.hasOwnProperty, ra = Object.prototype.toString, ti = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, ri = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : ra.call(t) === "[object Array]";
}, ii = function(t) {
  if (!t || ra.call(t) !== "[object Object]")
    return !1;
  var n = un.call(t, "constructor"), r = t.constructor && t.constructor.prototype && un.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || un.call(t, i);
}, ai = function(t, n) {
  ti && n.name === "__proto__" ? ti(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, li = function(t, n) {
  if (n === "__proto__")
    if (un.call(t, n)) {
      if (ni)
        return ni(t, n).value;
    } else return;
  return t[n];
}, N1 = function e() {
  var t, n, r, i, a, l, o = arguments[0], u = 1, p = arguments.length, s = !1;
  for (typeof o == "boolean" && (s = o, o = arguments[1] || {}, u = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); u < p; ++u)
    if (t = arguments[u], t != null)
      for (n in t)
        r = li(o, n), i = li(t, n), o !== i && (s && i && (ii(i) || (a = ri(i))) ? (a ? (a = !1, l = r && ri(r) ? r : []) : l = r && ii(r) ? r : {}, ai(o, { name: n, newValue: e(s, l, i) })) : typeof i < "u" && ai(o, { name: n, newValue: i }));
  return o;
};
const Mn = /* @__PURE__ */ Ai(N1);
function Kn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function L1() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let a = -1;
    const l = i.pop();
    if (typeof l != "function")
      throw new TypeError("Expected function as last argument, not " + l);
    o(null, ...i);
    function o(u, ...p) {
      const s = e[++a];
      let d = -1;
      if (u) {
        l(u);
        return;
      }
      for (; ++d < i.length; )
        (p[d] === null || p[d] === void 0) && (p[d] = i[d]);
      i = p, s ? D1(s, o)(...p) : l(null, ...p);
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
function D1(e, t) {
  let n;
  return r;
  function r(...l) {
    const o = e.length > l.length;
    let u;
    o && l.push(i);
    try {
      u = e.apply(this, l);
    } catch (p) {
      const s = (
        /** @type {Error} */
        p
      );
      if (o && n)
        throw s;
      return i(s);
    }
    o || (u && u.then && typeof u.then == "function" ? u.then(a, i) : u instanceof Error ? i(u) : a(u));
  }
  function i(l, ...o) {
    n || (n = !0, t(l, ...o));
  }
  function a(l) {
    i(null, l);
  }
}
const st = { basename: R1, dirname: P1, extname: O1, join: F1, sep: "/" };
function R1(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  Jt(e);
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
function P1(e) {
  if (Jt(e), e.length === 0)
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
function O1(e) {
  Jt(e);
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
function F1(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    Jt(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : z1(n);
}
function z1(e) {
  Jt(e);
  const t = e.codePointAt(0) === 47;
  let n = U1(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function U1(e, t) {
  let n = "", r = 0, i = -1, a = 0, l = -1, o, u;
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
            if (u = n.lastIndexOf("/"), u !== n.length - 1) {
              u < 0 ? (n = "", r = 0) : (n = n.slice(0, u), r = n.length - 1 - n.lastIndexOf("/")), i = l, a = 0;
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
function Jt(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const B1 = { cwd: H1 };
function H1() {
  return "/";
}
function Qn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function j1(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Qn(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return $1(e);
}
function $1(e) {
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
const Nn = (
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
class ia {
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
    t ? Qn(t) ? n = { path: t } : typeof t == "string" || V1(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : B1.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Nn.length; ) {
      const a = Nn[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      Nn.includes(i) || (this[i] = n[i]);
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
    Dn(t, "basename"), Ln(t, "basename"), this.path = st.join(this.dirname || "", t);
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
    oi(this.basename, "dirname"), this.path = st.join(t || "", this.basename);
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
    if (Ln(t, "extname"), oi(this.dirname, "extname"), t) {
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
    Qn(t) && (t = j1(t)), Dn(t, "path"), this.path !== t && this.history.push(t);
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
    Dn(t, "stem"), Ln(t, "stem"), this.path = st.join(this.dirname || "", t + (this.extname || ""));
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
function Ln(e, t) {
  if (e && e.includes(st.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + st.sep + "`"
    );
}
function Dn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function oi(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function V1(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const W1 = (
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
), Z1 = {}.hasOwnProperty;
class yr extends W1 {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = L1();
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
    return t.data(Mn(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (On("data", this.frozen), this.namespace[t] = n, this) : Z1.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (On("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    return Rn("parse", r), r(String(n), n);
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
    return this.freeze(), Rn("process", this.parser || this.Parser), Pn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, l) {
      const o = ln(t), u = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(o)
      );
      r.run(u, o, function(s, d, f) {
        if (s || !d || !f)
          return p(s);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          d
        ), y = r.stringify(h, f);
        Y1(y) ? f.value = y : f.result = y, p(
          s,
          /** @type {VFileWithOutput<CompileResult>} */
          f
        );
      });
      function p(s, d) {
        s || !d ? l(s) : a ? a(d) : n(void 0, d);
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
    return this.freeze(), Rn("processSync", this.parser || this.Parser), Pn("processSync", this.compiler || this.Compiler), this.process(t, i), ci("processSync", "process", n), r;
    function i(a, l) {
      n = !0, ei(a), r = l;
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
    si(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(l, o) {
      const u = ln(n);
      i.run(t, u, p);
      function p(s, d, f) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          d || t
        );
        s ? o(s) : l ? l(h) : r(void 0, h, f);
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
    return this.run(t, n, a), ci("runSync", "run", r), i;
    function a(l, o) {
      ei(l), i = o, r = !0;
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
    return Pn("stringify", i), si(t), i(t, r);
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
    if (On("use", this.frozen), t != null) if (typeof t == "function")
      u(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? o(t) : l(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function a(p) {
      if (typeof p == "function")
        u(p, []);
      else if (typeof p == "object")
        if (Array.isArray(p)) {
          const [s, ...d] = (
            /** @type {PluginTuple<Array<unknown>>} */
            p
          );
          u(s, d);
        } else
          l(p);
      else
        throw new TypeError("Expected usable value, not `" + p + "`");
    }
    function l(p) {
      if (!("plugins" in p) && !("settings" in p))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      o(p.plugins), p.settings && (i.settings = Mn(!0, i.settings, p.settings));
    }
    function o(p) {
      let s = -1;
      if (p != null) if (Array.isArray(p))
        for (; ++s < p.length; ) {
          const d = p[s];
          a(d);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + p + "`");
    }
    function u(p, s) {
      let d = -1, f = -1;
      for (; ++d < r.length; )
        if (r[d][0] === p) {
          f = d;
          break;
        }
      if (f === -1)
        r.push([p, ...s]);
      else if (s.length > 0) {
        let [h, ...y] = s;
        const b = r[f][1];
        Kn(b) && Kn(h) && (h = Mn(!0, b, h)), r[f] = [p, h, ...y];
      }
    }
  }
}
const q1 = new yr().freeze();
function Rn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Pn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function On(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function si(e) {
  if (!Kn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function ci(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function ln(e) {
  return G1(e) ? e : new ia(e);
}
function G1(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Y1(e) {
  return typeof e == "string" || X1(e);
}
function X1(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const J1 = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", ui = [], pi = { allowDangerousHtml: !0 }, K1 = /^(https?|ircs?|mailto|xmpp)$/i, Q1 = [
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
function Cn(e) {
  const t = ec(e), n = tc(e);
  return nc(t.runSync(t.parse(n), n), e);
}
function ec(e) {
  const t = e.rehypePlugins || ui, n = e.remarkPlugins || ui, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...pi } : pi;
  return q1().use(Ps).use(n).use(M1, r).use(t);
}
function tc(e) {
  const t = e.children || "", n = new ia();
  return typeof t == "string" && (n.value = t), n;
}
function nc(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, l = t.skipHtml, o = t.unwrapDisallowed, u = t.urlTransform || rc;
  for (const s of Q1)
    Object.hasOwn(t, s.from) && ("" + s.from + (s.to ? "use `" + s.to + "` instead" : "remove it") + J1 + s.id, void 0);
  return na(e, p), dl(e, {
    Fragment: dn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: c,
    jsxs: I,
    passKeys: !0,
    passNode: !0
  });
  function p(s, d, f) {
    if (s.type === "raw" && f && typeof d == "number")
      return l ? f.children.splice(d, 1) : f.children[d] = { type: "text", value: s.value }, d;
    if (s.type === "element") {
      let h;
      for (h in vn)
        if (Object.hasOwn(vn, h) && Object.hasOwn(s.properties, h)) {
          const y = s.properties[h], b = vn[h];
          (b === null || b.includes(s.tagName)) && (s.properties[h] = u(String(y || ""), h, s));
        }
    }
    if (s.type === "element") {
      let h = n ? !n.includes(s.tagName) : a ? a.includes(s.tagName) : !1;
      if (!h && r && typeof d == "number" && (h = !r(s, d, f)), h && f && typeof d == "number")
        return o && s.children ? f.children.splice(d, 1, ...s.children) : f.children.splice(d, 1), d;
    }
  }
}
function rc(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    K1.test(e.slice(0, t)) ? e : ""
  );
}
const it = (...e) => e.filter(Boolean).join(" "), ic = () => /* @__PURE__ */ I(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ I("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ c(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ c("g", { clipPath: "url(#clip0_121_23927)", children: /* @__PURE__ */ c(
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
              /* @__PURE__ */ c("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ c(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ c("feOffset", { dy: "1" }),
              /* @__PURE__ */ c("feGaussianBlur", { stdDeviation: "1" }),
              /* @__PURE__ */ c("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ c(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                }
              ),
              /* @__PURE__ */ c(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ c(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ c("feOffset", { dy: "1" }),
              /* @__PURE__ */ c("feGaussianBlur", { stdDeviation: "1.5" }),
              /* @__PURE__ */ c("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ c(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                }
              ),
              /* @__PURE__ */ c(
                "feBlend",
                {
                  mode: "normal",
                  in2: "effect1_dropShadow_121_23927",
                  result: "effect2_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ c(
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
        /* @__PURE__ */ c("clipPath", { id: "clip0_121_23927", children: /* @__PURE__ */ c(
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
), ac = ({ className: e, ...t }) => /* @__PURE__ */ c("form", { className: it("chat-wrapper__prompt-input", e), ...t }), aa = ki(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...l
  }, o) => {
    const u = (p) => {
      if (p.key === "Enter") {
        if (p.shiftKey)
          return;
        p.preventDefault();
        const s = p.currentTarget.form;
        if (s) {
          const d = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          s.dispatchEvent(d);
        }
      }
      a == null || a(p);
    };
    return /* @__PURE__ */ c(
      "textarea",
      {
        ref: o,
        className: it("chat-wrapper__prompt-textarea", t),
        name: "message",
        onChange: e,
        onKeyDown: u,
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
aa.displayName = "PromptInputTextarea";
const lc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ c("div", { className: it("chat-wrapper__prompt-toolbar", e), ...t }), oc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ c("div", { className: it("chat-wrapper__prompt-tools", e), ...t }), sc = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || Lt.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ c(
    "button",
    {
      className: it(
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
}, cc = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = "idle",
  children: i,
  disabled: a,
  ...l
}) => {
  let o = /* @__PURE__ */ c(ic, {});
  const u = a || r === "submitted" || r === "streaming";
  return /* @__PURE__ */ c(
    "button",
    {
      className: it(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${t}`,
        `chat-wrapper__prompt-submit--${n}`,
        // status === "streaming" && "chat-wrapper__prompt-submit--stop",
        e
      ),
      type: "submit",
      disabled: u,
      ...l,
      children: i ?? o
    }
  );
}, Qc = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ c("select", { className: it("chat-wrapper__prompt-select", e), ...n, children: t }), eu = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ c(
  "button",
  {
    className: it("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), tu = ({
  className: e,
  ...t
}) => /* @__PURE__ */ c(
  "div",
  {
    className: it("chat-wrapper__prompt-select-content", e),
    ...t
  }
), nu = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ c(
  "div",
  {
    className: it("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), ru = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ c(
  "span",
  {
    className: it("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), uc = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = X(0), [a, l] = X(!1), [o, u] = X(0);
  return Ke(() => {
    if (!t || e.length <= 1) return;
    const p = setInterval(() => {
      l(!0), setTimeout(() => {
        i((s) => (s + 1) % e.length), u((s) => s + 1), l(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(p);
  }, [t, e.length]), Ke(() => {
    t || (i(0), l(!1), u(0));
  }, [t]), /* @__PURE__ */ c(
    "div",
    {
      className: `animated-placeholder-container ${n}`,
      children: /* @__PURE__ */ c(
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
  entries: la,
  setPrototypeOf: hi,
  isFrozen: pc,
  getPrototypeOf: hc,
  getOwnPropertyDescriptor: dc
} = Object;
let {
  freeze: Pe,
  seal: et,
  create: er
} = Object, {
  apply: tr,
  construct: nr
} = typeof Reflect < "u" && Reflect;
Pe || (Pe = function(t) {
  return t;
});
et || (et = function(t) {
  return t;
});
tr || (tr = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
nr || (nr = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const on = Oe(Array.prototype.forEach), fc = Oe(Array.prototype.lastIndexOf), di = Oe(Array.prototype.pop), Ht = Oe(Array.prototype.push), mc = Oe(Array.prototype.splice), pn = Oe(String.prototype.toLowerCase), Fn = Oe(String.prototype.toString), zn = Oe(String.prototype.match), jt = Oe(String.prototype.replace), gc = Oe(String.prototype.indexOf), Cc = Oe(String.prototype.trim), nt = Oe(Object.prototype.hasOwnProperty), Re = Oe(RegExp.prototype.test), $t = yc(TypeError);
function Oe(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return tr(e, t, r);
  };
}
function yc(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return nr(e, n);
  };
}
function J(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : pn;
  hi && hi(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (pc(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function wc(e) {
  for (let t = 0; t < e.length; t++)
    nt(e, t) || (e[t] = null);
  return e;
}
function mt(e) {
  const t = er(null);
  for (const [n, r] of la(e))
    nt(e, n) && (Array.isArray(r) ? t[n] = wc(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = mt(r) : t[n] = r);
  return t;
}
function Vt(e, t) {
  for (; e !== null; ) {
    const r = dc(e, t);
    if (r) {
      if (r.get)
        return Oe(r.get);
      if (typeof r.value == "function")
        return Oe(r.value);
    }
    e = hc(e);
  }
  function n() {
    return null;
  }
  return n;
}
const fi = Pe(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Un = Pe(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Bn = Pe(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), xc = Pe(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Hn = Pe(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), kc = Pe(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), mi = Pe(["#text"]), gi = Pe(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), jn = Pe(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Ci = Pe(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), sn = Pe(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), bc = et(/\{\{[\w\W]*|[\w\W]*\}\}/gm), _c = et(/<%[\w\W]*|[\w\W]*%>/gm), Sc = et(/\$\{[\w\W]*/gm), Tc = et(/^data-[\-\w.\u00B7-\uFFFF]+$/), Ec = et(/^aria-[\-\w]+$/), oa = et(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), vc = et(/^(?:\w+script|data):/i), Ic = et(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), sa = et(/^html$/i), Ac = et(/^[a-z][.\w]*(-[.\w]+)+$/i);
var yi = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Ec,
  ATTR_WHITESPACE: Ic,
  CUSTOM_ELEMENT: Ac,
  DATA_ATTR: Tc,
  DOCTYPE_NAME: sa,
  ERB_EXPR: _c,
  IS_ALLOWED_URI: oa,
  IS_SCRIPT_OR_DATA: vc,
  MUSTACHE_EXPR: bc,
  TMPLIT_EXPR: Sc
});
const Wt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Mc = function() {
  return typeof window > "u" ? null : window;
}, Nc = function(t, n) {
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
}, wi = function() {
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
function ca() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Mc();
  const t = (P) => ca(P);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== Wt.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: l,
    Node: o,
    Element: u,
    NodeFilter: p,
    NamedNodeMap: s = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: f,
    trustedTypes: h
  } = e, y = u.prototype, b = Vt(y, "cloneNode"), A = Vt(y, "remove"), w = Vt(y, "nextSibling"), R = Vt(y, "childNodes"), N = Vt(y, "parentNode");
  if (typeof l == "function") {
    const P = n.createElement("template");
    P.content && P.content.ownerDocument && (n = P.content.ownerDocument);
  }
  let F, q = "";
  const {
    implementation: k,
    createNodeIterator: $,
    createDocumentFragment: V,
    getElementsByTagName: H
  } = n, {
    importNode: j
  } = r;
  let T = wi();
  t.isSupported = typeof la == "function" && typeof N == "function" && k && k.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: D,
    ERB_EXPR: G,
    TMPLIT_EXPR: re,
    DATA_ATTR: Y,
    ARIA_ATTR: fe,
    IS_SCRIPT_OR_DATA: Ce,
    ATTR_WHITESPACE: Se,
    CUSTOM_ELEMENT: Fe
  } = yi;
  let {
    IS_ALLOWED_URI: C
  } = yi, Q = null;
  const Ae = J({}, [...fi, ...Un, ...Bn, ...Hn, ...mi]);
  let m = null;
  const Te = J({}, [...gi, ...jn, ...Ci, ...sn]);
  let K = Object.seal(er(null, {
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
  const ye = Object.seal(er(null, {
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
  let Me = !0, je = !0, pt = !1, vt = !0, at = !1, lt = !0, $e = !1, tt = !1, Ee = !1, ot = !1, Ne = !1, Xe = !1, Ve = !0, It = !1;
  const Ft = "user-content-";
  let bt = !0, ht = !1, x = {}, v = null;
  const O = J({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let U = null;
  const ee = J({}, ["audio", "video", "img", "source", "image", "track"]);
  let ke = null;
  const We = J({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), be = "http://www.w3.org/1998/Math/MathML", Ze = "http://www.w3.org/2000/svg", de = "http://www.w3.org/1999/xhtml";
  let ue = de, Je = !1, Le = null;
  const bn = J({}, [be, Ze, de], Fn);
  let At = J({}, ["mi", "mo", "mn", "ms", "mtext"]), gt = J({}, ["annotation-xml"]);
  const Kt = J({}, ["title", "style", "font", "a", "script"]);
  let _t = null;
  const wr = ["application/xhtml+xml", "text/html"], _n = "text/html";
  let me = null, Ct = null;
  const Sn = n.createElement("form"), Qt = function(g) {
    return g instanceof RegExp || g instanceof Function;
  }, zt = function() {
    let g = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Ct && Ct === g)) {
      if ((!g || typeof g != "object") && (g = {}), g = mt(g), _t = // eslint-disable-next-line unicorn/prefer-includes
      wr.indexOf(g.PARSER_MEDIA_TYPE) === -1 ? _n : g.PARSER_MEDIA_TYPE, me = _t === "application/xhtml+xml" ? Fn : pn, Q = nt(g, "ALLOWED_TAGS") ? J({}, g.ALLOWED_TAGS, me) : Ae, m = nt(g, "ALLOWED_ATTR") ? J({}, g.ALLOWED_ATTR, me) : Te, Le = nt(g, "ALLOWED_NAMESPACES") ? J({}, g.ALLOWED_NAMESPACES, Fn) : bn, ke = nt(g, "ADD_URI_SAFE_ATTR") ? J(mt(We), g.ADD_URI_SAFE_ATTR, me) : We, U = nt(g, "ADD_DATA_URI_TAGS") ? J(mt(ee), g.ADD_DATA_URI_TAGS, me) : ee, v = nt(g, "FORBID_CONTENTS") ? J({}, g.FORBID_CONTENTS, me) : O, le = nt(g, "FORBID_TAGS") ? J({}, g.FORBID_TAGS, me) : mt({}), ze = nt(g, "FORBID_ATTR") ? J({}, g.FORBID_ATTR, me) : mt({}), x = nt(g, "USE_PROFILES") ? g.USE_PROFILES : !1, Me = g.ALLOW_ARIA_ATTR !== !1, je = g.ALLOW_DATA_ATTR !== !1, pt = g.ALLOW_UNKNOWN_PROTOCOLS || !1, vt = g.ALLOW_SELF_CLOSE_IN_ATTR !== !1, at = g.SAFE_FOR_TEMPLATES || !1, lt = g.SAFE_FOR_XML !== !1, $e = g.WHOLE_DOCUMENT || !1, ot = g.RETURN_DOM || !1, Ne = g.RETURN_DOM_FRAGMENT || !1, Xe = g.RETURN_TRUSTED_TYPE || !1, Ee = g.FORCE_BODY || !1, Ve = g.SANITIZE_DOM !== !1, It = g.SANITIZE_NAMED_PROPS || !1, bt = g.KEEP_CONTENT !== !1, ht = g.IN_PLACE || !1, C = g.ALLOWED_URI_REGEXP || oa, ue = g.NAMESPACE || de, At = g.MATHML_TEXT_INTEGRATION_POINTS || At, gt = g.HTML_INTEGRATION_POINTS || gt, K = g.CUSTOM_ELEMENT_HANDLING || {}, g.CUSTOM_ELEMENT_HANDLING && Qt(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (K.tagNameCheck = g.CUSTOM_ELEMENT_HANDLING.tagNameCheck), g.CUSTOM_ELEMENT_HANDLING && Qt(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (K.attributeNameCheck = g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), g.CUSTOM_ELEMENT_HANDLING && typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (K.allowCustomizedBuiltInElements = g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), at && (je = !1), Ne && (ot = !0), x && (Q = J({}, mi), m = [], x.html === !0 && (J(Q, fi), J(m, gi)), x.svg === !0 && (J(Q, Un), J(m, jn), J(m, sn)), x.svgFilters === !0 && (J(Q, Bn), J(m, jn), J(m, sn)), x.mathMl === !0 && (J(Q, Hn), J(m, Ci), J(m, sn))), g.ADD_TAGS && (typeof g.ADD_TAGS == "function" ? ye.tagCheck = g.ADD_TAGS : (Q === Ae && (Q = mt(Q)), J(Q, g.ADD_TAGS, me))), g.ADD_ATTR && (typeof g.ADD_ATTR == "function" ? ye.attributeCheck = g.ADD_ATTR : (m === Te && (m = mt(m)), J(m, g.ADD_ATTR, me))), g.ADD_URI_SAFE_ATTR && J(ke, g.ADD_URI_SAFE_ATTR, me), g.FORBID_CONTENTS && (v === O && (v = mt(v)), J(v, g.FORBID_CONTENTS, me)), bt && (Q["#text"] = !0), $e && J(Q, ["html", "head", "body"]), Q.table && (J(Q, ["tbody"]), delete le.tbody), g.TRUSTED_TYPES_POLICY) {
        if (typeof g.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw $t('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof g.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw $t('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        F = g.TRUSTED_TYPES_POLICY, q = F.createHTML("");
      } else
        F === void 0 && (F = Nc(h, i)), F !== null && typeof q == "string" && (q = F.createHTML(""));
      Pe && Pe(g), Ct = g;
    }
  }, en = J({}, [...Un, ...Bn, ...xc]), tn = J({}, [...Hn, ...kc]), nn = function(g) {
    let _ = N(g);
    (!_ || !_.tagName) && (_ = {
      namespaceURI: ue,
      tagName: "template"
    });
    const M = pn(g.tagName), W = pn(_.tagName);
    return Le[g.namespaceURI] ? g.namespaceURI === Ze ? _.namespaceURI === de ? M === "svg" : _.namespaceURI === be ? M === "svg" && (W === "annotation-xml" || At[W]) : !!en[M] : g.namespaceURI === be ? _.namespaceURI === de ? M === "math" : _.namespaceURI === Ze ? M === "math" && gt[W] : !!tn[M] : g.namespaceURI === de ? _.namespaceURI === Ze && !gt[W] || _.namespaceURI === be && !At[W] ? !1 : !tn[M] && (Kt[M] || !en[M]) : !!(_t === "application/xhtml+xml" && Le[g.namespaceURI]) : !1;
  }, S = function(g) {
    Ht(t.removed, {
      element: g
    });
    try {
      N(g).removeChild(g);
    } catch {
      A(g);
    }
  }, L = function(g, _) {
    try {
      Ht(t.removed, {
        attribute: _.getAttributeNode(g),
        from: _
      });
    } catch {
      Ht(t.removed, {
        attribute: null,
        from: _
      });
    }
    if (_.removeAttribute(g), g === "is")
      if (ot || Ne)
        try {
          S(_);
        } catch {
        }
      else
        try {
          _.setAttribute(g, "");
        } catch {
        }
  }, ne = function(g) {
    let _ = null, M = null;
    if (Ee)
      g = "<remove></remove>" + g;
    else {
      const ie = zn(g, /^[\r\n\t ]+/);
      M = ie && ie[0];
    }
    _t === "application/xhtml+xml" && ue === de && (g = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + g + "</body></html>");
    const W = F ? F.createHTML(g) : g;
    if (ue === de)
      try {
        _ = new f().parseFromString(W, _t);
      } catch {
      }
    if (!_ || !_.documentElement) {
      _ = k.createDocument(ue, "template", null);
      try {
        _.documentElement.innerHTML = Je ? q : W;
      } catch {
      }
    }
    const he = _.body || _.documentElement;
    return g && M && he.insertBefore(n.createTextNode(M), he.childNodes[0] || null), ue === de ? H.call(_, $e ? "html" : "body")[0] : $e ? _.documentElement : he;
  }, B = function(g) {
    return $.call(
      g.ownerDocument || g,
      g,
      // eslint-disable-next-line no-bitwise
      p.SHOW_ELEMENT | p.SHOW_COMMENT | p.SHOW_TEXT | p.SHOW_PROCESSING_INSTRUCTION | p.SHOW_CDATA_SECTION,
      null
    );
  }, pe = function(g) {
    return g instanceof d && (typeof g.nodeName != "string" || typeof g.textContent != "string" || typeof g.removeChild != "function" || !(g.attributes instanceof s) || typeof g.removeAttribute != "function" || typeof g.setAttribute != "function" || typeof g.namespaceURI != "string" || typeof g.insertBefore != "function" || typeof g.hasChildNodes != "function");
  }, xe = function(g) {
    return typeof o == "function" && g instanceof o;
  };
  function ge(P, g, _) {
    on(P, (M) => {
      M.call(t, g, _, Ct);
    });
  }
  const De = function(g) {
    let _ = null;
    if (ge(T.beforeSanitizeElements, g, null), pe(g))
      return S(g), !0;
    const M = me(g.nodeName);
    if (ge(T.uponSanitizeElement, g, {
      tagName: M,
      allowedTags: Q
    }), lt && g.hasChildNodes() && !xe(g.firstElementChild) && Re(/<[/\w!]/g, g.innerHTML) && Re(/<[/\w!]/g, g.textContent) || g.nodeType === Wt.progressingInstruction || lt && g.nodeType === Wt.comment && Re(/<[/\w]/g, g.data))
      return S(g), !0;
    if (!(ye.tagCheck instanceof Function && ye.tagCheck(M)) && (!Q[M] || le[M])) {
      if (!le[M] && dt(M) && (K.tagNameCheck instanceof RegExp && Re(K.tagNameCheck, M) || K.tagNameCheck instanceof Function && K.tagNameCheck(M)))
        return !1;
      if (bt && !v[M]) {
        const W = N(g) || g.parentNode, he = R(g) || g.childNodes;
        if (he && W) {
          const ie = he.length;
          for (let ve = ie - 1; ve >= 0; --ve) {
            const ft = b(he[ve], !0);
            ft.__removalCount = (g.__removalCount || 0) + 1, W.insertBefore(ft, w(g));
          }
        }
      }
      return S(g), !0;
    }
    return g instanceof u && !nn(g) || (M === "noscript" || M === "noembed" || M === "noframes") && Re(/<\/no(script|embed|frames)/i, g.innerHTML) ? (S(g), !0) : (at && g.nodeType === Wt.text && (_ = g.textContent, on([D, G, re], (W) => {
      _ = jt(_, W, " ");
    }), g.textContent !== _ && (Ht(t.removed, {
      element: g.cloneNode()
    }), g.textContent = _)), ge(T.afterSanitizeElements, g, null), !1);
  }, qe = function(g, _, M) {
    if (Ve && (_ === "id" || _ === "name") && (M in n || M in Sn))
      return !1;
    if (!(je && !ze[_] && Re(Y, _))) {
      if (!(Me && Re(fe, _))) {
        if (!(ye.attributeCheck instanceof Function && ye.attributeCheck(_, g))) {
          if (!m[_] || ze[_]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(dt(g) && (K.tagNameCheck instanceof RegExp && Re(K.tagNameCheck, g) || K.tagNameCheck instanceof Function && K.tagNameCheck(g)) && (K.attributeNameCheck instanceof RegExp && Re(K.attributeNameCheck, _) || K.attributeNameCheck instanceof Function && K.attributeNameCheck(_, g)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              _ === "is" && K.allowCustomizedBuiltInElements && (K.tagNameCheck instanceof RegExp && Re(K.tagNameCheck, M) || K.tagNameCheck instanceof Function && K.tagNameCheck(M)))
            ) return !1;
          } else if (!ke[_]) {
            if (!Re(C, jt(M, Se, ""))) {
              if (!((_ === "src" || _ === "xlink:href" || _ === "href") && g !== "script" && gc(M, "data:") === 0 && U[g])) {
                if (!(pt && !Re(Ce, jt(M, Se, "")))) {
                  if (M)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, dt = function(g) {
    return g !== "annotation-xml" && zn(g, Fe);
  }, yt = function(g) {
    ge(T.beforeSanitizeAttributes, g, null);
    const {
      attributes: _
    } = g;
    if (!_ || pe(g))
      return;
    const M = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: m,
      forceKeepAttr: void 0
    };
    let W = _.length;
    for (; W--; ) {
      const he = _[W], {
        name: ie,
        namespaceURI: ve,
        value: ft
      } = he, Mt = me(ie), Tn = ft;
      let _e = ie === "value" ? Tn : Cc(Tn);
      if (M.attrName = Mt, M.attrValue = _e, M.keepAttr = !0, M.forceKeepAttr = void 0, ge(T.uponSanitizeAttribute, g, M), _e = M.attrValue, It && (Mt === "id" || Mt === "name") && (L(ie, g), _e = Ft + _e), lt && Re(/((--!?|])>)|<\/(style|title|textarea)/i, _e)) {
        L(ie, g);
        continue;
      }
      if (Mt === "attributename" && zn(_e, "href")) {
        L(ie, g);
        continue;
      }
      if (M.forceKeepAttr)
        continue;
      if (!M.keepAttr) {
        L(ie, g);
        continue;
      }
      if (!vt && Re(/\/>/i, _e)) {
        L(ie, g);
        continue;
      }
      at && on([D, G, re], (kr) => {
        _e = jt(_e, kr, " ");
      });
      const xr = me(g.nodeName);
      if (!qe(xr, Mt, _e)) {
        L(ie, g);
        continue;
      }
      if (F && typeof h == "object" && typeof h.getAttributeType == "function" && !ve)
        switch (h.getAttributeType(xr, Mt)) {
          case "TrustedHTML": {
            _e = F.createHTML(_e);
            break;
          }
          case "TrustedScriptURL": {
            _e = F.createScriptURL(_e);
            break;
          }
        }
      if (_e !== Tn)
        try {
          ve ? g.setAttributeNS(ve, ie, _e) : g.setAttribute(ie, _e), pe(g) ? S(g) : di(t.removed);
        } catch {
          L(ie, g);
        }
    }
    ge(T.afterSanitizeAttributes, g, null);
  }, wt = function P(g) {
    let _ = null;
    const M = B(g);
    for (ge(T.beforeSanitizeShadowDOM, g, null); _ = M.nextNode(); )
      ge(T.uponSanitizeShadowNode, _, null), De(_), yt(_), _.content instanceof a && P(_.content);
    ge(T.afterSanitizeShadowDOM, g, null);
  };
  return t.sanitize = function(P) {
    let g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ = null, M = null, W = null, he = null;
    if (Je = !P, Je && (P = "<!-->"), typeof P != "string" && !xe(P))
      if (typeof P.toString == "function") {
        if (P = P.toString(), typeof P != "string")
          throw $t("dirty is not a string, aborting");
      } else
        throw $t("toString is not a function");
    if (!t.isSupported)
      return P;
    if (tt || zt(g), t.removed = [], typeof P == "string" && (ht = !1), ht) {
      if (P.nodeName) {
        const ft = me(P.nodeName);
        if (!Q[ft] || le[ft])
          throw $t("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (P instanceof o)
      _ = ne("<!---->"), M = _.ownerDocument.importNode(P, !0), M.nodeType === Wt.element && M.nodeName === "BODY" || M.nodeName === "HTML" ? _ = M : _.appendChild(M);
    else {
      if (!ot && !at && !$e && // eslint-disable-next-line unicorn/prefer-includes
      P.indexOf("<") === -1)
        return F && Xe ? F.createHTML(P) : P;
      if (_ = ne(P), !_)
        return ot ? null : Xe ? q : "";
    }
    _ && Ee && S(_.firstChild);
    const ie = B(ht ? P : _);
    for (; W = ie.nextNode(); )
      De(W), yt(W), W.content instanceof a && wt(W.content);
    if (ht)
      return P;
    if (ot) {
      if (Ne)
        for (he = V.call(_.ownerDocument); _.firstChild; )
          he.appendChild(_.firstChild);
      else
        he = _;
      return (m.shadowroot || m.shadowrootmode) && (he = j.call(r, he, !0)), he;
    }
    let ve = $e ? _.outerHTML : _.innerHTML;
    return $e && Q["!doctype"] && _.ownerDocument && _.ownerDocument.doctype && _.ownerDocument.doctype.name && Re(sa, _.ownerDocument.doctype.name) && (ve = "<!DOCTYPE " + _.ownerDocument.doctype.name + `>
` + ve), at && on([D, G, re], (ft) => {
      ve = jt(ve, ft, " ");
    }), F && Xe ? F.createHTML(ve) : ve;
  }, t.setConfig = function() {
    let P = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    zt(P), tt = !0;
  }, t.clearConfig = function() {
    Ct = null, tt = !1;
  }, t.isValidAttribute = function(P, g, _) {
    Ct || zt({});
    const M = me(P), W = me(g);
    return qe(M, W, _);
  }, t.addHook = function(P, g) {
    typeof g == "function" && Ht(T[P], g);
  }, t.removeHook = function(P, g) {
    if (g !== void 0) {
      const _ = fc(T[P], g);
      return _ === -1 ? void 0 : mc(T[P], _, 1)[0];
    }
    return di(T[P]);
  }, t.removeHooks = function(P) {
    T[P] = [];
  }, t.removeAllHooks = function() {
    T = wi();
  }, t;
}
var Lc = ca();
function Dc(e) {
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
function hn(e, t = !1) {
  return e;
}
function Rc(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function xi(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || Dc(e));
  } catch {
    return !1;
  }
}
function Pc() {
  Lc.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !xi(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !xi(n) && e.removeAttribute("src");
    }
  });
}
Pc();
const Oc = ki(
  ({
    placeholder: e = "What would you like to know?",
    placeholderTexts: t,
    disabled: n = !1,
    chatStatus: r,
    fileUploadEnabled: i = !1,
    restaurantName: a,
    restaurantLogo: l,
    hasMessages: o = !1,
    onSubmit: u,
    onFileUpload: p,
    onStopGeneration: s
  }, d) => {
    const [f, h] = X(""), [y, b] = X([]), A = rt(null), w = t && t.length > 0 ? t : [e], R = f.length === 0 && !o && w.length > 1;
    Ca(d, () => ({
      focus: () => {
        var k;
        (k = A.current) == null || k.focus();
      },
      setText: (k) => {
        h(k), setTimeout(() => {
          var $;
          ($ = A.current) == null || $.focus();
        }, 0);
      }
    }));
    const N = oe(
      (k) => {
        k.preventDefault();
        const V = new FormData(k.currentTarget).get("message");
        if (V != null && V.trim()) {
          const H = hn(V.trim(), !1);
          if (!H.trim()) {
            console.warn("Message was blocked due to security concerns");
            return;
          }
          u(H, y), h(""), b([]);
        }
      },
      [u, y]
    ), F = oe(
      (k) => {
        const V = k.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
        h(V);
      },
      []
    ), q = oe(async () => {
      const k = document.createElement("input");
      k.type = "file", k.accept = "image/*", k.multiple = !1, k.onchange = async ($) => {
        const V = $.target.files;
        if (V) {
          const H = Array.from(V).filter((j) => {
            const T = Rc(j.name);
            return T !== j.name && console.warn(
              `File name sanitized: ${j.name} -> ${T}`
            ), j.size > 10485760 ? (console.warn(`File too large: ${j.name} (${j.size} bytes)`), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ].includes(j.type) ? !0 : (console.warn(
              `File type not allowed: ${j.name} (${j.type})`
            ), !1);
          });
          if (H.length > 0) {
            const j = await p(H);
            b(j);
          }
        }
      }, k.click();
    }, [p]);
    return /* @__PURE__ */ I(ac, { onSubmit: N, style: { position: "relative" }, children: [
      /* @__PURE__ */ c(
        aa,
        {
          ref: A,
          name: "message",
          value: f,
          onChange: F,
          placeholder: "",
          disabled: n
        }
      ),
      !f.trim() && /* @__PURE__ */ c(
        uc,
        {
          placeholderTexts: w,
          shouldAnimate: R
        }
      ),
      y.length > 0 && /* @__PURE__ */ c(
        "div",
        {
          style: {
            padding: "8px 16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center"
          },
          children: y.map((k, $) => {
            const V = k.startsWith("data:image/"), H = k.startsWith("http://") || k.startsWith("https://"), j = V || H;
            return /* @__PURE__ */ I(
              "div",
              {
                style: {
                  position: "relative",
                  display: "inline-block"
                },
                children: [
                  j ? /* @__PURE__ */ I(
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
                        /* @__PURE__ */ c(
                          "img",
                          {
                            src: k,
                            alt: `Attachment ${$ + 1}`,
                            style: {
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }
                          }
                        ),
                        /* @__PURE__ */ c(
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
                        /* @__PURE__ */ c(
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
                                  /* @__PURE__ */ c(
                                    "mask",
                                    {
                                      id: "mask0_190_623",
                                      style: { maskType: "alpha" },
                                      maskUnits: "userSpaceOnUse",
                                      x: "0",
                                      y: "0",
                                      width: "24",
                                      height: "25",
                                      children: /* @__PURE__ */ c(
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
                                  /* @__PURE__ */ c("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ c(
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
                          /* @__PURE__ */ c(
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
                                const T = k.match(/name=([^;]+)/);
                                return T ? decodeURIComponent(T[1]) : "document.pdf";
                              })()
                            }
                          ),
                          /* @__PURE__ */ c(
                            "div",
                            {
                              style: {
                                color: "#9ca3af",
                                fontSize: "12px",
                                textTransform: "uppercase"
                              },
                              children: (() => {
                                const T = k.match(/data:([^;]+)/);
                                if (T) {
                                  const D = T[1];
                                  switch (D) {
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
                                      const G = D.split("/")[1];
                                      return G ? G.toUpperCase().substring(0, 4) : "FILE";
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
                  /* @__PURE__ */ c(
                    "button",
                    {
                      onClick: () => {
                        b(
                          (T) => T.filter((D, G) => G !== $)
                        );
                      },
                      style: {
                        position: "absolute",
                        top: j ? "6px" : "8px",
                        right: j ? "6px" : "8px",
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
              $
            );
          })
        }
      ),
      /* @__PURE__ */ I(lc, { children: [
        /* @__PURE__ */ I(oc, { children: [
          i && /* @__PURE__ */ I(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center"
              },
              children: [
                /* @__PURE__ */ c(
                  sc,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: q,
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
                          /* @__PURE__ */ c(
                            "rect",
                            {
                              y: "0.354126",
                              width: "36",
                              height: "36",
                              rx: "18",
                              fill: "#F4F6F8"
                            }
                          ),
                          /* @__PURE__ */ c("g", { "clip-path": "url(#clip0_121_9706)", children: /* @__PURE__ */ c(
                            "path",
                            {
                              d: "M21.3334 13.3541V22.9374C21.3334 24.7791 19.8417 26.2708 18 26.2708C16.1584 26.2708 14.6667 24.7791 14.6667 22.9374V12.5208C14.6667 11.3708 15.6 10.4374 16.75 10.4374C17.9 10.4374 18.8334 11.3708 18.8334 12.5208V21.2708C18.8334 21.7291 18.4584 22.1041 18 22.1041C17.5417 22.1041 17.1667 21.7291 17.1667 21.2708V13.3541H15.9167V21.2708C15.9167 22.4208 16.85 23.3541 18 23.3541C19.15 23.3541 20.0834 22.4208 20.0834 21.2708V12.5208C20.0834 10.6791 18.5917 9.18744 16.75 9.18744C14.9084 9.18744 13.4167 10.6791 13.4167 12.5208V22.9374C13.4167 25.4708 15.4667 27.5208 18 27.5208C20.5334 27.5208 22.5834 25.4708 22.5834 22.9374V13.3541H21.3334Z",
                              fill: "#212B36"
                            }
                          ) }),
                          /* @__PURE__ */ c("defs", { children: /* @__PURE__ */ c("clipPath", { id: "clip0_121_9706", children: /* @__PURE__ */ c(
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
                /* @__PURE__ */ c(
                  "span",
                  {
                    onClick: q,
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
          i && a && /* @__PURE__ */ c("div", { className: "chat-wrapper__divider" }),
          a && /* @__PURE__ */ I("div", { className: "chat-wrapper__restaurant-chip", children: [
            l && /* @__PURE__ */ c(
              "img",
              {
                src: l,
                alt: "Restaurant logo",
                className: "chat-wrapper__restaurant-logo"
              }
            ),
            /* @__PURE__ */ c("span", { className: "chat-wrapper__restaurant-name", children: a })
          ] })
        ] }),
        /* @__PURE__ */ c(
          cc,
          {
            status: r,
            disabled: !f.trim() && r !== "streaming",
            onClick: r === "streaming" && s ? () => {
              s();
            } : void 0
          }
        )
      ] })
    ] });
  }
), Fc = ({
  prompts: e,
  onPromptSelect: t
}) => /* @__PURE__ */ I("div", { className: "chat-wrapper__suggested-prompts", children: [
  /* @__PURE__ */ c("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
  /* @__PURE__ */ c("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((n, r) => /* @__PURE__ */ c(
    "button",
    {
      className: "chat-wrapper__suggested-prompt-card",
      onClick: () => t(n),
      children: /* @__PURE__ */ I("div", { className: "chat-wrapper__suggested-prompt-content", children: [
        /* @__PURE__ */ c("h4", { className: "chat-wrapper__suggested-prompt-title", children: n.title }),
        /* @__PURE__ */ c("p", { className: "chat-wrapper__suggested-prompt-description", children: n.description })
      ] })
    },
    r
  )) })
] });
function zc({ children: e, isStreaming: t }) {
  const [n, r] = X(!0), [i, a] = X(!1);
  Lt.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const l = () => {
    t || r(!n);
  }, o = Lt.Children.map(e, (u) => {
    if (Lt.isValidElement(u)) {
      if (u.type === ua)
        return Lt.cloneElement(
          u,
          {
            onToggle: l,
            isExpanded: n
          }
        );
      if (u.type === pa)
        return Lt.cloneElement(
          u,
          {
            isVisible: n
          }
        );
    }
    return u;
  });
  return /* @__PURE__ */ c("div", { className: "chat-wrapper__reasoning", children: o });
}
function ua({
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
        /* @__PURE__ */ c(
          "mask",
          {
            id: "mask0_64_36210",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "16",
            height: "16",
            children: /* @__PURE__ */ c("rect", { width: "16", height: "16", fill: "#D9D9D9" })
          }
        ),
        /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36210)", children: /* @__PURE__ */ c(
          "path",
          {
            d: "M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z",
            fill: "#637381"
          }
        ) })
      ]
    }
  ), l = t === "completed" || e.includes("Thinking") || e.includes("Processing");
  return /* @__PURE__ */ I(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${l ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: l ? r : void 0,
      style: { cursor: l ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ c("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ I("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ c("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        l && /* @__PURE__ */ c(
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
                  /* @__PURE__ */ c(
                    "mask",
                    {
                      id: "mask0_44_18068",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ c("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ c("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ c(
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
function pa({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ c("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function Uc({ children: e }) {
  return /* @__PURE__ */ c("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function Bc({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var u, p;
  console.log("clog toolData", n);
  const a = () => {
    if (!r || !i) return null;
    const s = i.find((d) => d.name === r);
    return (s == null ? void 0 : s.description) || null;
  };
  let l;
  if (r != null && r.startsWith("lat_")) {
    const s = (u = n == null ? void 0 : n.parameters) == null ? void 0 : u.query, d = (p = n == null ? void 0 : n.parameters) == null ? void 0 : p.url;
    l = s || d || "Executing tool...";
  } else
    l = a();
  return l && (l.startsWith("http://") || l.startsWith("https://") || (l = l.charAt(0).toUpperCase() + l.slice(1))), /* @__PURE__ */ c("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ c("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ c("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ c("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ c("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ c("span", { children: l }),
          /* @__PURE__ */ I("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ c(
                    "mask",
                    {
                      id: "mask0_64_36278",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ c("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ c(
                    "path",
                    {
                      d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ c("span", { children: "Running..." })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ c("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ c("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ c("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ c("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ c("span", { children: l }),
          /* @__PURE__ */ I("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ c(
                    "mask",
                    {
                      id: "mask0_64_36345",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ c("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36345)", children: /* @__PURE__ */ c(
                    "path",
                    {
                      d: "M7.1501 10.7819L11.1168 6.83193L10.2668 5.98193L7.1501 9.08193L5.73343 7.68193L4.88343 8.53193L7.1501 10.7819ZM8.0001 14.7819C7.12232 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.643 2.1001 10.8653C1.76676 10.0875 1.6001 9.25971 1.6001 8.38193C1.6001 7.49304 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73899 2.81527 5.51676 2.48193C6.29454 2.1486 7.12232 1.98193 8.0001 1.98193C8.88899 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11805 13.9001 5.89027C14.2334 6.66249 14.4001 7.49304 14.4001 8.38193C14.4001 9.25971 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.264 13.9486 10.4918 14.2819C9.71954 14.6153 8.88899 14.7819 8.0001 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819Z",
                      fill: "#4EAD13"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ c("span", { children: "Completed" })
          ] })
        ] });
      case "error":
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ c(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ c(
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
          /* @__PURE__ */ c("span", { className: "chat-wrapper__tooling-handle-title", children: e })
        ] });
      default:
        return /* @__PURE__ */ I("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ I("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ c("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ c("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ c("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ c("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ c(
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
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c(
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
                /* @__PURE__ */ c("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ c("span", { children: "Pending..." })
        ] });
    }
  })() });
}
function ha({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ I("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ c("span", {}),
    /* @__PURE__ */ c("span", {}),
    /* @__PURE__ */ c("span", {})
  ] }) : t === "pulse" ? /* @__PURE__ */ c(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ c(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: e, height: e }
    }
  );
}
const Hc = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ c(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ c("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ c(ha, { size: e, variant: "dots" }) })
  }
);
async function jc(e, t) {
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
async function $c(e, t, n) {
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
const Vc = ({
  isOpen: e,
  onClose: t,
  app: n,
  apiUrl: r
}) => {
  const [i, a] = X(null), [l, o] = X(""), [u, p] = X(""), [s, d] = X(!1), [f, h] = X(null);
  Ke(() => {
    e && !i && y();
  }, [e]);
  const y = oe(async () => {
    d(!0), h(null);
    try {
      const w = await jc(r, n);
      a(w), o(w.promptPath), p(w.versionUuid);
    } catch (w) {
      h(w instanceof Error ? w.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", w);
    } finally {
      d(!1);
    }
  }, [r, n]), b = oe(async () => {
    if (i) {
      d(!0), h(null);
      try {
        const w = await $c(r, n, {
          promptPath: l,
          versionUuid: u,
          isDefault: i.isDefault
        });
        a(w), t(), window.location.reload();
      } catch (w) {
        h(w instanceof Error ? w.message : "Failed to update configuration"), console.error("Error updating agent configuration:", w);
      } finally {
        d(!1);
      }
    }
  }, [r, n, l, u, i, t]), A = oe(() => {
    i && (o(i.promptPath), p(i.versionUuid)), h(null), t();
  }, [i, t]);
  return e ? /* @__PURE__ */ c("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ c("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ c(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: A,
          title: "Close settings",
          children: /* @__PURE__ */ c(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ c(
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
      s && /* @__PURE__ */ c("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      f && /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ I("p", { children: [
          "Error: ",
          f
        ] }),
        /* @__PURE__ */ c(
          "button",
          {
            onClick: y,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      i && !s && /* @__PURE__ */ I(dn, { children: [
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ c("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ c(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: l,
              onChange: (w) => o(w.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: s
            }
          ),
          /* @__PURE__ */ c("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ c("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ c(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: u,
              onChange: (w) => p(w.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: s
            }
          ),
          /* @__PURE__ */ c("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ c("div", { className: "chat-wrapper__dev-settings-info", children: /* @__PURE__ */ I("p", { children: [
          /* @__PURE__ */ c("strong", { children: "App:" }),
          " ",
          n
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ I("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ c(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: A,
          disabled: s,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ c(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: b,
          disabled: s || !i,
          children: s ? "Saving..." : "Save"
        }
      )
    ] })
  ] }) }) : null;
};
class Wc {
  // Track accumulated reasoning content by ID
  constructor() {
    ae(this, "sessionId", "");
    ae(this, "ws", null);
    ae(this, "isConnected", !1);
    ae(this, "apiUrl", "http://localhost:3000");
    ae(this, "userId", "");
    // Store userId from props
    ae(this, "onSetMessage");
    ae(this, "onSystemMessage");
    ae(this, "onBusinessDataUpdate");
    ae(this, "onReasoningUpdate");
    ae(this, "clientTools", {});
    ae(this, "toolSchemas", []);
    ae(this, "businessContext", {});
    ae(this, "reconnectAttempts", 0);
    ae(this, "maxReconnectAttempts", 5);
    ae(this, "reconnectTimer", null);
    ae(this, "reconnectDelay", 1e3);
    // Start with 1 second
    ae(this, "heartbeatInterval", null);
    ae(this, "isReconnecting", !1);
    ae(this, "visibilityChangeHandler");
    ae(this, "initResolve");
    ae(this, "initReject");
    ae(this, "processedToolCalls", /* @__PURE__ */ new Set());
    // Track processed tool calls
    ae(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    // Track reasoning start times by ID
    ae(this, "reasoningContent", /* @__PURE__ */ new Map());
    this.sessionId = `business_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, this.visibilityChangeHandler = () => {
      document.visibilityState === "visible" && !this.isConnected && !this.isReconnecting && (console.log("Tab became visible, checking connection..."), this.attemptReconnect());
    }, typeof document < "u" && document.addEventListener(
      "visibilitychange",
      this.visibilityChangeHandler
    );
  }
  async onInit(t) {
    return this.onSetMessage = t.onSetMessage, this.onSystemMessage = t.onSystemMessage, this.onBusinessDataUpdate = t.onBusinessDataUpdate, this.onReasoningUpdate = t.onReasoningUpdate, this.clientTools = t.clientTools || {}, this.toolSchemas = t.toolSchemas || [], this.businessContext = t.businessContext, t.apiUrl && (this.apiUrl = t.apiUrl), t.userId && (this.userId = t.userId), new Promise((n, r) => {
      try {
        this.initResolve = n, this.initReject = r, this.connectWebSocketForInit();
      } catch {
        console.log("Falling back to demo mode..."), n();
      }
    });
  }
  connectWebSocketForInit() {
    var t, n;
    try {
      const r = this.apiUrl.replace(/^https?:\/\//, "ws://") + "/ws";
      if (this.ws = new WebSocket(r), !this.ws) {
        (t = this.initReject) == null || t.call(this, new Error("WebSocket not initialized"));
        return;
      }
      this.ws.onopen = () => {
        this.isConnected = !0, this.isReconnecting = !1, this.reconnectAttempts = 0, this.reconnectDelay = 1e3, console.log("WebSocket connected"), this.startHeartbeat();
      }, this.ws.onerror = (i) => {
        var a, l;
        if (console.error("WebSocket connection error:", i), i instanceof Event) {
          console.log("Falling back to demo mode..."), this.isConnected = !0, this.onSystemMessage && this.onSystemMessage("⚠️ Using demo mode - WebSocket unavailable"), (a = this.initResolve) == null || a.call(this);
          return;
        }
        (l = this.initReject) == null || l.call(this, i);
      }, this.ws.onmessage = (i) => {
        var l, o;
        const a = this.handleWebSocketMessage(i);
        a && a.type === "tools_configured" && (this.onSystemMessage && this.onSystemMessage("✅ Client tools configured successfully"), (l = this.initResolve) == null || l.call(this)), a && a.type === "session_established" && (!this.toolSchemas || this.toolSchemas.length === 0) && ((o = this.initResolve) == null || o.call(this));
      }, this.ws.onclose = (i) => {
        this.isConnected = !1, this.stopHeartbeat(), console.log("WebSocket disconnected", {
          code: i.code,
          reason: i.reason
        }), i.code !== 1e3 && i.code !== 1001 && this.attemptReconnect();
      };
    } catch (r) {
      (n = this.initReject) == null || n.call(this, r);
    }
  }
  attemptReconnect() {
    if (this.isReconnecting || this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.reconnectAttempts >= this.maxReconnectAttempts && (console.log("Max reconnection attempts reached"), this.onSystemMessage && this.onSystemMessage("❌ Connection lost - please refresh the page"));
      return;
    }
    this.isReconnecting = !0, this.reconnectAttempts++, console.log(
      `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
    ), this.onSystemMessage && this.onSystemMessage(
      `🔄 Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
    ), this.reconnectTimer = window.setTimeout(() => {
      this.isConnected || this.connectWebSocket();
    }, this.reconnectDelay), this.reconnectDelay = Math.min(this.reconnectDelay * 1.5, 3e4);
  }
  connectWebSocket() {
    try {
      this.ws && this.ws.close();
      const t = this.apiUrl.replace(/^https?:\/\//, "ws://") + "/ws";
      this.ws = new WebSocket(t), this.ws.onopen = () => {
        this.isConnected = !0, this.isReconnecting = !1, this.reconnectAttempts = 0, this.reconnectDelay = 1e3, console.log("WebSocket reconnected successfully"), this.startHeartbeat(), this.onSystemMessage && this.onSystemMessage("✅ Connection restored");
      }, this.ws.onerror = (n) => {
        console.error("WebSocket reconnection error:", n), this.isReconnecting = !1, setTimeout(() => this.attemptReconnect(), this.reconnectDelay);
      }, this.ws.onclose = (n) => {
        this.isConnected = !1, this.isReconnecting = !1, this.stopHeartbeat(), n.code !== 1e3 && n.code !== 1001 && this.attemptReconnect();
      }, this.ws.onmessage = (n) => {
        this.handleWebSocketMessage(n);
      };
    } catch (t) {
      console.error("Error creating WebSocket:", t), this.isReconnecting = !1, setTimeout(() => this.attemptReconnect(), this.reconnectDelay);
    }
  }
  startHeartbeat() {
  }
  stopHeartbeat() {
    this.heartbeatInterval && (clearInterval(this.heartbeatInterval), this.heartbeatInterval = null);
  }
  handleWebSocketMessage(t) {
    var n, r, i, a, l, o, u, p;
    try {
      const s = JSON.parse(t.data);
      switch (s.type) {
        case "session_established":
          console.log("Session established:", s.sessionId), this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(
            JSON.stringify({
              type: "configure_tools",
              toolSchemas: this.toolSchemas,
              businessContext: this.businessContext
            })
          );
          break;
        case "tools_configured":
          console.log("Tools configured:", s), this.onSystemMessage && this.onSystemMessage("✅ Tools configured successfully");
          break;
        case "client_tools_updated":
          console.log("Client tools updated successfully:", s), this.onSystemMessage && this.onSystemMessage("✅ Client tools updated successfully");
          break;
        case "configure_tools":
          console.log("Configure tools request:", s), this.onSystemMessage && this.onSystemMessage("🔧 Server requested tool configuration");
          break;
        case "chat_event":
          if (s.event === "provider-event") {
            if (((n = s.data) == null ? void 0 : n.type) === "text-delta" && this.onSetMessage && s.data.textDelta)
              this.onSetMessage(s.data.textDelta);
            else if (((r = s.data) == null ? void 0 : r.type) === "reasoning-start") {
              console.log("🧠 Reasoning started:", s.data);
              const f = s.data.id || "reasoning";
              this.reasoningStartTimes.set(f, Date.now()), this.reasoningContent.set(f, "");
            } else if (((i = s.data) == null ? void 0 : i.type) === "reasoning-delta") {
              if (console.log("🧠 Reasoning delta:", s.data), this.onReasoningUpdate && s.data.text) {
                const f = s.data.id || "reasoning", y = (this.reasoningContent.get(f) || "") + s.data.text;
                this.reasoningContent.set(f, y);
                const b = {
                  toolName: "reasoning",
                  callId: f,
                  parameters: { phase: "thinking", text: y }
                };
                this.onReasoningUpdate(
                  !0,
                  `🧠 ${y}`,
                  b
                );
              }
            } else if (((a = s.data) == null ? void 0 : a.type) === "reasoning-end") {
              console.log("🧠 Reasoning completed:", s.data);
              const f = s.data.id || "reasoning", h = this.reasoningContent.get(f) || "", y = this.reasoningStartTimes.get(f);
              let b = "";
              if (y && (b = ` for ${((Date.now() - y) / 1e3).toFixed(1)} seconds`, this.reasoningStartTimes.delete(f)), console.log("🧠 Reasoning end details:", {
                reasoningId: f,
                accumulatedContent: h.length > 0 ? h.substring(0, 100) + "..." : "EMPTY",
                durationText: b,
                hasStartTime: !!y
              }), this.onReasoningUpdate) {
                const A = {
                  toolName: "reasoning",
                  callId: f,
                  parameters: {
                    phase: "end",
                    duration: b,
                    fullContent: h
                  }
                }, R = `🧠 ${h || "Thought"}${b}`;
                console.log("🧠 Sending final reasoning update:", R), this.onReasoningUpdate(
                  !1,
                  R,
                  A
                );
              }
              this.reasoningContent.delete(f);
            } else if (((l = s.data) == null ? void 0 : l.type) === "tool-call") {
              const f = s.data;
              if (console.log(
                "🔧 clog Server-side tool call detected:",
                f
              ), this.onReasoningUpdate && f.toolName && f.toolCallId && f.toolName.startsWith("lat_")) {
                const h = {
                  toolName: f.toolName,
                  callId: f.toolCallId,
                  parameters: f.args || {}
                };
                this.onReasoningUpdate(
                  !0,
                  `🔧 Handling: ${f.toolName}`,
                  h
                );
              }
            } else if (((o = s.data) == null ? void 0 : o.type) === "tool-result" && s.data.toolName.startsWith("lat_")) {
              const f = s.data;
              if (console.log(
                "✅ clog Server-side tool result detected:",
                f
              ), this.onReasoningUpdate && f.toolCallId) {
                const h = {
                  toolName: f.toolName || "Unknown Tool",
                  callId: f.toolCallId,
                  parameters: {}
                };
                this.onReasoningUpdate(
                  !1,
                  `✅ Completed: ${f.toolName || "Unknown Tool"}`,
                  h
                );
              }
            }
          } else if (s.event === "latitude-event" && (console.log("Latitude event:", (u = s.data) == null ? void 0 : u.type, s.data), ((p = s.data) == null ? void 0 : p.type) === "tool-result" && this.onReasoningUpdate)) {
            const f = s.data;
            if (f.toolCallId && f.toolName) {
              const h = {
                toolName: f.toolName,
                callId: f.toolCallId,
                parameters: {}
              };
              this.onReasoningUpdate(
                !1,
                `✅ Completed: ${f.toolName}`,
                h
              );
            }
          }
          s.event === "content-delta" && this.onSetMessage && s.data.delta && this.onSetMessage(s.data.delta);
          break;
        case "chat_finished":
          console.log("Chat finished:", s), this.onSystemMessage && this.onSystemMessage(`✅ Chat completed (${s.uuid})`);
          break;
        case "chat_error":
          console.error("Chat error:", s.error), this.onSystemMessage && this.onSystemMessage(`❌ Chat error: ${s.error}`);
          break;
        case "tool_call_request":
          console.log("📥 Received tool_call_request:", s);
          const d = s;
          if (console.log(`📋 Tool details - Name: ${d.toolName}, CallId: ${d.callId}`), this.processedToolCalls.has(d.callId)) {
            console.warn(`⚠️ Duplicate tool call detected for callId: ${d.callId}, ignoring`);
            break;
          }
          this.processedToolCalls.add(d.callId), this.handleToolCallRequest(d);
          break;
        case "business_data_update":
          console.log("Business data update:", s.data), this.onBusinessDataUpdate && this.onBusinessDataUpdate(s.data), this.onSystemMessage && this.onSystemMessage(
            `📊 Business data updated: ${JSON.stringify(s.data)}`
          );
          break;
        case "heartbeat_ping":
          this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(
            JSON.stringify({
              type: "heartbeat_pong",
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              originalTimestamp: s.timestamp,
              pingTime: s.pingTime
            })
          );
          break;
        case "heartbeat_ack":
          console.log("Heartbeat acknowledged");
          break;
        case "error":
          console.error("WebSocket error:", s.error), this.onSystemMessage && this.onSystemMessage(`❌ Error: ${s.error}`);
          break;
        default:
          console.log("Unknown WebSocket message:", s);
      }
      return s;
    } catch (s) {
      return console.error("Error parsing WebSocket message:", s), null;
    }
  }
  async handleToolCallRequest(t) {
    const { callId: n, toolName: r, parameters: i } = t;
    console.log(`🔧 Processing tool call: ${r} with callId: ${n}`), this.onReasoningUpdate && this.onReasoningUpdate(!0, `🔧 Handling: ${r}`, t);
    try {
      const a = this.clientTools[r];
      if (!a) {
        const o = `Tool not found: ${r}`;
        throw console.error(o), new Error(o);
      }
      console.log(`⚙️ Executing tool: ${r} with parameters:`, i);
      const l = await a(i);
      if (console.log(`✅ Tool result for ${r}:`, l), this.ws && this.ws.readyState === WebSocket.OPEN) {
        const o = {
          type: "tool_call_response",
          callId: n,
          result: l
        };
        console.log("📤 Sending tool response:", o), this.ws.send(JSON.stringify(o));
      } else
        console.error(`❌ WebSocket not ready when trying to send response for callId: ${n}`);
      this.onReasoningUpdate && this.onReasoningUpdate(!1, `✅ Completed: ${r}`, t);
    } catch (a) {
      if (console.error(`❌ Error executing tool ${r} (callId: ${n}):`, a), this.ws && this.ws.readyState === WebSocket.OPEN) {
        const l = {
          type: "tool_call_response",
          callId: n,
          error: a instanceof Error ? a.message : "Unknown error"
        };
        console.log("📤 Sending error response:", l), this.ws.send(JSON.stringify(l));
      } else
        console.error(`❌ WebSocket not ready when trying to send error response for callId: ${n}`);
      this.onReasoningUpdate && this.onReasoningUpdate(
        !1,
        `❌ Error: ${r} - ${a}`,
        t
      );
    }
  }
  async onTriggerMessage(t, n = "UD21", r, i, a) {
    if (!this.isConnected)
      throw new Error("Client not connected");
    if (!this.ws)
      throw new Error("WebSocket not available");
    try {
      this.processedToolCalls.clear(), console.log("🧹 Cleared processed tool calls for new message");
      const l = {
        type: "chat_message",
        content: t,
        app: n,
        media: r || [],
        saveToDatabase: !1,
        userId: this.userId || void 0
        // Use stored userId or fallback
      };
      i && (l.convUuid = i), a && a.trim() && (l.agentPromptPath = a.trim()), this.ws.send(JSON.stringify(l));
    } catch (l) {
      throw console.error("Error sending message:", l), this.onSystemMessage && this.onSystemMessage(`❌ Chat error: ${l}`), l;
    }
  }
  disconnect() {
    this.reconnectTimer && (window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null), this.stopHeartbeat(), typeof document < "u" && this.visibilityChangeHandler && document.removeEventListener(
      "visibilitychange",
      this.visibilityChangeHandler
    ), this.ws && (this.ws.close(1e3, "Manual disconnect"), this.ws = null), this.isConnected = !1, this.isReconnecting = !1, this.reconnectAttempts = 0;
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
      reconnectAttempts: this.reconnectAttempts,
      isReconnecting: this.isReconnecting,
      websocketState: this.ws ? this.getWebSocketStateString() : "null"
    };
  }
  getWebSocketStateString() {
    if (!this.ws) return "null";
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return "CONNECTING";
      case WebSocket.OPEN:
        return "OPEN";
      case WebSocket.CLOSING:
        return "CLOSING";
      case WebSocket.CLOSED:
        return "CLOSED";
      default:
        return "UNKNOWN";
    }
  }
}
async function iu(e, t, n) {
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
async function au(e, t) {
  const n = `${e}/threads/conv/${t}`, r = await fetch(n);
  if (!r.ok) {
    const i = await r.json().catch(() => ({
      error: "Thread not found"
    }));
    throw new Error(i.error || "Thread not found");
  }
  return r.json();
}
async function Zc(e, t) {
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
async function lu(e, t) {
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
async function ou(e, t, n, r) {
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
const da = rr(
  ({
    message: e,
    getReasoningTitle: t,
    getReasoningStatus: n,
    getReasoningDuration: r,
    getReasoningContentOnly: i,
    getToolingTitle: a,
    getToolingStatus: l,
    clientTools: o,
    currentAssistantMessageIdRef: u
  }) => {
    var p;
    return /* @__PURE__ */ c(
      "div",
      {
        className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
        children: e.role === "reasoning" ? (
          /* Reasoning message - no content wrapper */
          /* @__PURE__ */ I(zc, { isStreaming: e.isStreaming || !1, children: [
            /* @__PURE__ */ c(
              ua,
              {
                title: t(e.content, e.isStreaming),
                status: n(e.content, e.isStreaming),
                duration: r(e.content)
              }
            ),
            /* @__PURE__ */ c(pa, { children: i(e.content) })
          ] })
        ) : e.role === "tooling" ? (
          /* Tooling message - no content wrapper */
          /* @__PURE__ */ c(Uc, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ c(
            Bc,
            {
              title: a(e.content, e.isStreaming),
              status: l(e.content, e.isStreaming),
              toolData: e.toolData,
              toolName: (p = e.toolData) == null ? void 0 : p.toolName,
              clientTools: o
            }
          ) })
        ) : /* @__PURE__ */ c("div", { className: "chat-wrapper__message-content", children: e.role === "assistant" && e.isStreaming && e.content === "" && e.id === u.current ? (
          /* Show streaming indicator when no content yet */
          /* @__PURE__ */ I("div", { className: "chat-wrapper__streaming-placeholder", children: [
            /* @__PURE__ */ c(ha, { size: 16, variant: "dots" }),
            /* @__PURE__ */ c("span", { children: "Thinking" })
          ] })
        ) : e.role === "system" ? (
          /* System message with collapsible tool result */
          /* @__PURE__ */ c(qc, { message: e })
        ) : e.role === "assistant" ? (
          /* Assistant message with regular markdown display */
          /* @__PURE__ */ c("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ c(
            Cn,
            {
              components: {
                pre: ({ children: s }) => /* @__PURE__ */ c("pre", { className: "chat-wrapper__code-block", children: s }),
                code: ({ children: s, className: d }) => !d ? /* @__PURE__ */ c("code", { className: "chat-wrapper__inline-code", children: s }) : /* @__PURE__ */ c("code", { className: "chat-wrapper__code-block", children: s }),
                ul: ({ children: s }) => /* @__PURE__ */ c("ul", { className: "chat-wrapper__list", children: s }),
                ol: ({ children: s }) => /* @__PURE__ */ c("ol", { className: "chat-wrapper__ordered-list", children: s }),
                li: ({ children: s }) => /* @__PURE__ */ c("li", { className: "chat-wrapper__list-item", children: s })
              },
              children: e.content
            }
          ) }) })
        ) : (
          /* User message display with markdown */
          /* @__PURE__ */ I("div", { className: "chat-wrapper__regular-message", children: [
            /* @__PURE__ */ c("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ c(
              Cn,
              {
                components: {
                  pre: ({ children: s }) => /* @__PURE__ */ c("pre", { className: "chat-wrapper__code-block", children: s }),
                  code: ({ children: s, className: d }) => !d ? /* @__PURE__ */ c("code", { className: "chat-wrapper__inline-code", children: s }) : /* @__PURE__ */ c("code", { className: "chat-wrapper__code", children: s }),
                  p: ({ children: s }) => /* @__PURE__ */ c("p", { className: "chat-wrapper__paragraph", children: s }),
                  h1: ({ children: s }) => /* @__PURE__ */ c("h1", { className: "chat-wrapper__heading-1", children: s }),
                  h2: ({ children: s }) => /* @__PURE__ */ c("h2", { className: "chat-wrapper__heading-2", children: s }),
                  h3: ({ children: s }) => /* @__PURE__ */ c("h3", { className: "chat-wrapper__heading-3", children: s }),
                  ul: ({ children: s }) => /* @__PURE__ */ c("ul", { className: "chat-wrapper__list", children: s }),
                  ol: ({ children: s }) => /* @__PURE__ */ c("ol", { className: "chat-wrapper__ordered-list", children: s }),
                  li: ({ children: s }) => /* @__PURE__ */ c("li", { className: "chat-wrapper__list-item", children: s }),
                  blockquote: ({ children: s }) => /* @__PURE__ */ c("blockquote", { className: "chat-wrapper__blockquote", children: s }),
                  strong: ({ children: s }) => /* @__PURE__ */ c("strong", { className: "chat-wrapper__bold", children: s }),
                  em: ({ children: s }) => /* @__PURE__ */ c("em", { className: "chat-wrapper__italic", children: s })
                },
                children: e.content.trim()
              }
            ) }),
            e.role === "user" && e.media && e.media.length > 0 && /* @__PURE__ */ c(
              "div",
              {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "4px",
                  justifyContent: "flex-end"
                },
                children: e.media.map((s, d) => {
                  const f = s.startsWith("data:image/"), h = s.startsWith("http://") || s.startsWith("https://");
                  return /* @__PURE__ */ c(
                    "div",
                    {
                      style: {
                        position: "relative",
                        display: "inline-block"
                      },
                      children: f || h ? /* @__PURE__ */ I(
                        "div",
                        {
                          style: {
                            position: "relative",
                            width: "56px",
                            height: "56px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            border: "1px solid #e2e8f0",
                            justifyContent: "flex-end"
                          },
                          children: [
                            /* @__PURE__ */ c(
                              "img",
                              {
                                src: s,
                                alt: `Attachment ${d + 1}`,
                                style: {
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover"
                                }
                              }
                            ),
                            /* @__PURE__ */ c(
                              "div",
                              {
                                style: {
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: "rgba(0, 0, 0, 0.2)",
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
                            borderRadius: "8px",
                            padding: "8px",
                            minWidth: "200px",
                            maxWidth: "300px",
                            height: "56px"
                          },
                          children: [
                            /* @__PURE__ */ c(
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
                                      /* @__PURE__ */ c(
                                        "mask",
                                        {
                                          id: "mask0_190_623",
                                          style: { maskType: "alpha" },
                                          maskUnits: "userSpaceOnUse",
                                          x: "0",
                                          y: "0",
                                          width: "24",
                                          height: "25",
                                          children: /* @__PURE__ */ c(
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
                                      /* @__PURE__ */ c("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ c(
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
                              /* @__PURE__ */ c(
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
                                    maxWidth: "200px"
                                  },
                                  children: (() => {
                                    const b = s.match(/name=([^;]+)/);
                                    return b ? decodeURIComponent(b[1]) : "document.pdf";
                                  })()
                                }
                              ),
                              /* @__PURE__ */ c(
                                "div",
                                {
                                  style: {
                                    color: "#9ca3af",
                                    fontSize: "12px",
                                    textTransform: "uppercase"
                                  },
                                  children: (() => {
                                    const b = s.match(/data:([^;]+)/);
                                    if (b) {
                                      const A = b[1];
                                      switch (A) {
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
                                          const w = A.split("/")[1];
                                          return w ? w.toUpperCase().substring(0, 4) : "FILE";
                                      }
                                    }
                                    return "FILE";
                                  })()
                                }
                              )
                            ] })
                          ]
                        }
                      )
                    },
                    d
                  );
                })
              }
            )
          ] })
        ) })
      }
    );
  }
);
da.displayName = "MessageComponent";
const fa = rr(
  ({ content: e, messageId: t }) => !t || !e ? null : /* @__PURE__ */ c("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__message-content", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ c(
    Cn,
    {
      components: {
        pre: ({ children: n }) => /* @__PURE__ */ c("pre", { className: "chat-wrapper__code-block", children: n }),
        code: ({ children: n, className: r }) => !r ? /* @__PURE__ */ c("code", { className: "chat-wrapper__inline-code", children: n }) : /* @__PURE__ */ c("code", { className: "chat-wrapper__code-block", children: n }),
        ul: ({ children: n }) => /* @__PURE__ */ c("ul", { className: "chat-wrapper__list", children: n }),
        ol: ({ children: n }) => /* @__PURE__ */ c("ol", { className: "chat-wrapper__ordered-list", children: n }),
        li: ({ children: n }) => /* @__PURE__ */ c("li", { className: "chat-wrapper__list-item", children: n })
      },
      children: e
    }
  ) }) }) }) })
);
fa.displayName = "StreamingMessage";
function qc({ message: e }) {
  const [t, n] = X(!0);
  return /* @__PURE__ */ I("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ c(
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
        children: e.role === "system" ? /* @__PURE__ */ I("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ c(
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
            "AI text input <show-toolname>",
            "..."
          ] }),
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
            "svg",
            {
              width: "16",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ c("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ c("span", { children: "Pending..." })
        ] }) : e.role === "assistant" ? e.isStreaming ? /* @__PURE__ */ I("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c(
            "svg",
            {
              width: "10",
              height: "14",
              viewBox: "0 0 10 14",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ c(
                "path",
                {
                  d: "M3.79576 11.3819C3.46532 11.3819 3.18343 11.2644 2.9501 11.0294C2.71676 10.7944 2.6001 10.5119 2.6001 10.1819V9.06527C1.96676 8.65082 1.4751 8.11943 1.1251 7.4711C0.775098 6.82277 0.600098 6.12638 0.600098 5.38193C0.600098 4.15627 1.02665 3.11649 1.87976 2.2626C2.73288 1.40882 3.77176 0.981934 4.99643 0.981934C6.2211 0.981934 7.26121 1.40882 8.11676 2.2626C8.97232 3.11649 9.4001 4.15627 9.4001 5.38193C9.4001 6.12438 9.2251 6.8211 8.8751 7.4721C8.5251 8.1231 8.03343 8.65416 7.4001 9.06527V10.1819C7.4001 10.5119 7.28243 10.7944 7.0471 11.0294C6.81188 11.2644 6.52904 11.3819 6.1986 11.3819H3.79576ZM3.8001 10.1819H6.2001V8.41527L6.7501 8.06527C7.20565 7.77638 7.56121 7.39204 7.81676 6.91227C8.07232 6.43249 8.2001 5.92238 8.2001 5.38193C8.2001 4.4966 7.88771 3.74193 7.26293 3.11793C6.63826 2.49393 5.88271 2.18193 4.99626 2.18193C4.10993 2.18193 3.35565 2.49393 2.73343 3.11793C2.11121 3.74193 1.8001 4.4966 1.8001 5.38193C1.8001 5.92238 1.92788 6.43249 2.18343 6.91227C2.43899 7.39204 2.79454 7.77638 3.2501 8.06527L3.8001 8.41527V10.1819ZM3.8001 13.7819C3.57343 13.7819 3.38343 13.7053 3.2301 13.5519C3.07676 13.3986 3.0001 13.2086 3.0001 12.9819V12.5819H7.0001V12.9819C7.0001 13.2086 6.92343 13.3986 6.7701 13.5519C6.61676 13.7053 6.42676 13.7819 6.2001 13.7819H3.8001Z",
                  fill: "#637381"
                }
              )
            }
          ) }),
          /* @__PURE__ */ c("span", { children: "Thinking..." }),
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c(
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
                /* @__PURE__ */ c("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ c(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) })
        ] }) : /* @__PURE__ */ I("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ c(
                "path",
                {
                  d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z",
                  fill: "#10b981"
                }
              )
            }
          ) }),
          /* @__PURE__ */ c("span", { children: "Thought" }),
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ I(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ c(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ c(
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
                /* @__PURE__ */ c("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ c(
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
    t && /* @__PURE__ */ c(
      "div",
      {
        className: "chat-wrapper__system-message-content",
        style: {
          padding: "0 12px 12px 0px"
        },
        children: /* @__PURE__ */ c("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ c(
          Cn,
          {
            components: {
              pre: ({ children: i }) => /* @__PURE__ */ c("pre", { className: "chat-wrapper__code-block", children: i }),
              code: ({ children: i, className: a }) => !a ? /* @__PURE__ */ c("code", { className: "chat-wrapper__inline-code", children: i }) : /* @__PURE__ */ c("code", { className: "chat-wrapper__code", children: i }),
              p: ({ children: i }) => /* @__PURE__ */ c("p", { className: "chat-wrapper__paragraph", children: i }),
              strong: ({ children: i }) => /* @__PURE__ */ c("strong", { className: "chat-wrapper__bold", children: i }),
              em: ({ children: i }) => /* @__PURE__ */ c("em", { className: "chat-wrapper__italic", children: i })
            },
            children: e.content.trim()
          }
        ) })
      }
    )
  ] });
}
function Gc({
  apiUrl: e,
  config: t,
  tools: n,
  clientTools: r,
  initialMessages: i = [],
  userId: a,
  devMode: l = !1,
  app: o
}) {
  var nn;
  const u = oe((S) => S.replace(
    /^wss?:\/\//,
    (L) => L === "wss://" ? "https://" : "http://"
  ), []), p = St(() => u(e), [e, u]), [s, d] = X(
    null
  ), [f, h] = X(!1), [y, b] = X(""), A = rt(null), [w, R] = X(i), [N, F] = X(!1), [q, k] = X(!1), [$, V] = X("idle"), [H, j] = X(!1), [T, D] = X(t.mode), [G, re] = X(!1), [Y, fe] = X(
    null
  ), [Ce, Se] = X(null), [Fe, C] = X(null), [Q] = X([]), [Ae, m] = X(""), [Te, K] = X(!1), [, le] = X(""), [ze, ye] = X(""), [Me, je] = X(!1), [, pt] = X(
    /* @__PURE__ */ new Map()
  ), [, vt] = X(
    /* @__PURE__ */ new Map()
  ), [at, lt] = X(!1), $e = rt(null), tt = rt(null), Ee = rt(null), ot = rt(!0), Ne = rt(""), Xe = rt(!1), Ve = oe(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), It = St(
    () => (S, L) => L === !1 ? S.includes("❌") ? "error" : "completed" : S.includes("✅ Completed:") || S.includes("✅") ? "completed" : S.includes("❌") ? "error" : "processing",
    []
  ), Ft = St(
    () => (S) => {
      const L = S.match(/for ([\d.]+) seconds/);
      return L ? ` for ${L[1]} seconds` : void 0;
    },
    []
  ), bt = St(
    () => (S) => {
      let L = S.replace(/^🧠\s*/, "");
      return L = L.replace(/\s*for [\d.]+\s*seconds$/, ""), L = L.replace(/\*\*(.*?)\*\*/g, ""), L;
    },
    []
  ), ht = St(
    () => (S, L) => (console.log("🔍 getReasoningTitle:", { content: S, isStreaming: L }), L === !1 ? S.includes("❌") ? "Error" : (S.includes("🧠") && S.includes("for") && S.includes("seconds") || S.includes("🧠 Thought"), "Thought") : S.includes("✅ Completed:") || S.includes("✅") ? "Completed" : S.includes("❌") ? "Error" : (S.includes("🔧 Handling:") || S.includes("🧠") && !S.includes("AI is thinking"), "Thinking...")),
    []
  ), x = St(
    () => (S, L) => L === !1 ? S.includes("❌") ? "Tool Error" : "Tool Completed" : S.includes("✅ Completed:") || S.includes("✅") ? "Tool Completed" : S.includes("❌") ? "Tool Error" : (S.includes("🔧 Handling:"), "Tool Processing..."),
    []
  ), v = St(
    () => (S, L) => L === !1 ? S.includes("❌") ? "error" : "completed" : S.includes("✅ Completed:") || S.includes("✅") ? "completed" : S.includes("❌") ? "error" : "processing",
    []
  ), O = oe(
    (S, L) => {
      const B = hn(L, S === "assistant");
      R((pe) => [
        ...pe,
        {
          id: Ve(),
          role: S,
          content: B,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [Ve]
  ), U = oe(() => {
    if (Ee.current && Ne.current) {
      const S = hn(
        Ne.current,
        !0
      ), L = {
        id: Ee.current,
        role: "assistant",
        content: S,
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !1
      };
      return R((ne) => [...ne, L]), Ee.current = null, Ne.current = "", ye(""), !0;
    }
    return !1;
  }, []), ee = oe(() => {
    F(!1), K(!1), V("idle"), U(), console.log("clog focus..."), setTimeout(() => {
      var S;
      (S = tt.current) == null || S.focus();
    }, 0);
  }, [U]), ke = oe(
    (S) => {
      console.error("Chat error:", S), F(!1), K(!1), V("error"), U(), O("system", `❌ Chat error: ${S}`);
    },
    [O, U]
  ), We = oe(async () => {
    try {
      const S = new Wc();
      A.current = S, d(S), b(S.getSessionId());
      const L = {};
      await S.onInit({
        apiUrl: e,
        userId: a,
        toolSchemas: r,
        clientTools: n,
        businessContext: L,
        onSetMessage: (ne) => {
          const B = hn(ne, !0);
          if (Ee.current)
            Ne.current += B, ye(Ne.current);
          else {
            K(!1);
            const pe = Ve();
            Ee.current = pe, Ne.current = B, ye(B);
          }
        },
        onSystemMessage: (ne) => {
          if (ne.includes("Chat completed"))
            ee();
          else if (ne.includes("Chat error")) {
            const B = ne.match(/Chat error: (.+)/);
            B && ke(B[1]);
          }
        },
        onReasoningUpdate: (ne, B, pe) => {
          console.log("🤔 Reasoning update:", {
            isThinking: ne,
            content: B,
            toolCallRequest: pe
          });
          const { callId: xe } = pe || {};
          if (je(ne), le(B), !xe) {
            console.log("⚠️ No callId provided for reasoning update");
            return;
          }
          const ge = !1, De = B.includes("🧠") && !B.includes("for") && !B.includes("seconds"), qe = B.includes("🧠") && B.includes("for") && B.includes("seconds"), dt = B.includes("🔧 Handling:"), yt = B.includes("✅ Completed:"), wt = B.includes("❌ Error:");
          console.log("🔍 Debug reasoning conditions:", {
            isReasoningStarted: ge,
            isReasoningThinking: De,
            isReasoningCompleted: qe,
            isToolStarted: dt,
            isToolCompleted: yt,
            isToolError: wt,
            callId: xe,
            isHandlingTool: Me
          }), (De || qe) && vt((P) => {
            const g = new Map(P), _ = g.get(xe);
            if (De && !_) {
              U();
              const M = Ve();
              g.set(xe, M);
              const W = {
                id: M,
                role: "reasoning",
                content: B,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0
              };
              R((he) => [...he, W]);
            } else qe && _ ? (R(
              (M) => M.map(
                (W) => W.id === _ ? {
                  ...W,
                  content: B,
                  isStreaming: !1
                  // Mark as completed
                } : W
              )
            ), g.delete(xe)) : _ && De && R(
              (M) => M.map(
                (W) => W.id === _ ? {
                  ...W,
                  content: B,
                  isStreaming: !0
                } : W
              )
            );
            return g;
          }), pt((P) => {
            const g = new Map(P), _ = g.get(xe);
            if (dt && !_) {
              U();
              const M = B.match(/🔧 Handling: (.+)/), W = M ? M[1] : "Unknown Tool", he = Ve();
              g.set(xe, he);
              const ie = {
                id: he,
                role: "tooling",
                content: B,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0,
                toolData: {
                  ...pe,
                  toolName: W,
                  callId: xe,
                  status: "processing"
                }
              };
              R((ve) => [...ve, ie]);
            } else if ((yt || wt) && _) {
              const M = B.match(
                /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
              ), W = M ? M[1] : "Unknown Tool";
              R(
                (he) => he.map(
                  (ie) => ie.id === _ ? {
                    ...ie,
                    content: B,
                    isStreaming: !1,
                    // Mark as completed
                    toolData: {
                      ...ie.toolData,
                      toolName: W,
                      status: wt ? "error" : "completed",
                      callId: xe ?? ""
                    }
                  } : ie
                )
              ), g.delete(xe);
            } else _ && Me && !yt && !wt && R(
              (M) => M.map(
                (W) => W.id === _ ? {
                  ...W,
                  content: B,
                  isStreaming: !0
                } : W
              )
            );
            return g;
          });
        },
        onBusinessDataUpdate: (ne) => {
          t.onBusinessDataUpdate && t.onBusinessDataUpdate(ne);
        }
      }), h(!0), console.log("BusinessAgentClient connected");
    } catch (S) {
      console.error("Error connecting BusinessAgentClient:", S), h(!1);
    }
  }, [
    e,
    r,
    n,
    t,
    Ve,
    O,
    ee,
    ke,
    U
  ]), be = oe(() => {
    A.current && (A.current.disconnect(), A.current = null), d(null), h(!1), b("");
  }, []), Ze = oe(() => {
    console.log("🔍 DEBUG: resetToolHandling called! Stack trace:"), console.trace(), je(!1), ot.current = !0;
  }, []), de = rt(null), ue = oe(() => {
    de.current && cancelAnimationFrame(de.current), de.current = requestAnimationFrame(() => {
      var S;
      (S = $e.current) == null || S.scrollIntoView({ behavior: "smooth" }), de.current = null;
    });
  }, []);
  Ke(() => {
    ue();
  }, [w, ue]), Ke(() => {
    ze && ue();
  }, [ze, ue]), Ke(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(Ae);
  }, [Ae, t]), Ke(() => {
    console.log("🔍 DEBUG: isHandlingTool state changed:", Me);
  }, [Me]), Ke(() => {
    console.log("💭 DEBUG: isHandlingReasoning state changed:");
  }, []), Ke(() => (console.log("Connecting BusinessAgentClient..."), We(), () => {
    be(), de.current && cancelAnimationFrame(de.current);
  }), [We, be]), Ke(() => {
    const S = setInterval(() => {
      if (A.current) {
        const L = A.current.getConnectionStatus();
        h(L.connected);
      }
    }, 1e3);
    return () => clearInterval(S);
  }, []), Ke(() => {
    (async () => {
      if (a && !Xe.current && !G && !(w.length > 0))
        try {
          re(!0), fe(null), console.log(`📚 Fetching threads for user: ${a}`);
          const L = [];
          if (L.length === 0) {
            console.log("ℹ️ No threads found for user"), re(!1), Xe.current = !0;
            return;
          }
          const ne = L[0];
          console.log(
            `📖 Loading thread: ${ne.id} (${ne.title})`
          ), Se(ne.id), C(ne.convUuid);
          const B = await Zc(
            p,
            ne.id
          );
          console.log(`✅ Loaded ${B.length} messages`), R(B), Xe.current = !0;
        } catch (L) {
          console.error("❌ Error loading conversation:", L), fe(
            L instanceof Error ? L.message : "Failed to load conversation"
          ), Xe.current = !0;
        } finally {
          re(!1);
        }
    })();
  }, [a, p]);
  const Je = oe(
    async (S, L) => {
      if (!S.trim() || N || !s || !f)
        return;
      const ne = {
        id: Ve(),
        role: "user",
        content: S.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: L
      };
      R((B) => [...B, ne]), F(!0), K(!0), V("submitted"), m("Starting...");
      try {
        await s.onTriggerMessage(
          ne.content,
          o,
          L,
          Fe || void 0,
          void 0
        ), V("streaming");
      } catch (B) {
        console.error("Agent client send error:", B), K(!1), V("error"), O(
          "system",
          `Sorry, there was an error: ${B instanceof Error ? B.message : "Unknown error"}`
        ), t.onError && t.onError(
          B instanceof Error ? B : new Error("Unknown error")
        ), F(!1), V("idle"), m("");
      }
    },
    [
      N,
      s,
      f,
      Ve,
      O,
      t,
      Fe
    ]
  ), Le = oe(() => {
    F(!1), V("idle"), m(""), K(!1), le(""), Ee.current = null, Ne.current = "", ye(""), Ze();
  }, [Ze]), bn = oe(
    async (S) => {
      console.log("Files selected:", S);
      const L = [], ne = e || "http://localhost:3000", B = "chat-uploads";
      for (const pe of S)
        try {
          const xe = new FormData();
          xe.append("file", pe), xe.append("folder", B), console.log(`Uploading file: ${pe.name} to ${ne}/upload`);
          const ge = await fetch(`${ne}/upload`, {
            method: "POST",
            body: xe
          }), De = await ge.json();
          if (ge.ok)
            console.log("✅ Upload successful:", De), pe.type.startsWith("image/") ? L.push(De.url) : L.push(
              `data:${pe.type};name=${encodeURIComponent(
                De.fileName || pe.name
              )};url=${encodeURIComponent(De.url)}`
            );
          else if (console.error("❌ Upload failed:", De.error), pe.type.startsWith("image/")) {
            const qe = new FileReader(), dt = await new Promise(
              (yt, wt) => {
                qe.onload = () => yt(qe.result), qe.onerror = wt, qe.readAsDataURL(pe);
              }
            );
            L.push(dt);
          } else
            L.push(
              `data:${pe.type};name=${encodeURIComponent(
                pe.name
              )};base64,placeholder`
            );
        } catch (xe) {
          console.error("Error uploading file:", xe);
          try {
            if (pe.type.startsWith("image/")) {
              const ge = new FileReader(), De = await new Promise(
                (qe, dt) => {
                  ge.onload = () => qe(ge.result), ge.onerror = dt, ge.readAsDataURL(pe);
                }
              );
              L.push(De);
            } else
              L.push(
                `data:${pe.type};name=${encodeURIComponent(
                  pe.name
                )};base64,placeholder`
              );
          } catch (ge) {
            console.error("Error in fallback encoding:", ge);
          }
        }
      return console.log("Added media:", L), L;
    },
    [e]
  ), At = oe(() => {
    k(!0);
  }, []), gt = oe(() => {
    k(!1);
  }, []), Kt = oe(() => {
    j((S) => !S);
  }, []), _t = oe(() => {
    D((S) => S === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  Ke(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const S = (L) => {
      L.key === "Escape" && T === "modal" && q && gt();
    };
    if (T === "modal" && q)
      return document.addEventListener("keydown", S), () => document.removeEventListener("keydown", S);
  }, [T, q, gt]);
  const _n = ((...S) => S.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${T}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`,
    H && "chat-wrapper--collapsed",
    T === "embedded" && t.constrainedHeight && "chat-wrapper--constrained"
  ), me = () => {
    var L;
    if (T === "modal" && !q || T === "sidebar" && H || T === "fullscreen" && H) {
      const ne = T === "modal" ? At : Kt, B = T === "modal" ? `Open ${t.appName}` : `Expand ${t.appName}`;
      return /* @__PURE__ */ I(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: ne,
          title: B,
          children: [
            /* @__PURE__ */ I(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: "chat-wrapper__bubble-icon",
                children: [
                  /* @__PURE__ */ c(
                    "path",
                    {
                      d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
                      fill: "currentColor"
                    }
                  ),
                  /* @__PURE__ */ c("circle", { cx: "7", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ c("circle", { cx: "12", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ c("circle", { cx: "17", cy: "10", r: "1", fill: "currentColor" })
                ]
              }
            ),
            ((L = t.features) == null ? void 0 : L.showBubbleText) !== !1 && /* @__PURE__ */ c("span", { className: "chat-wrapper__bubble-text", children: t.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, Ct = () => T === "modal" && q ? /* @__PURE__ */ c(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: gt,
      title: "Close chat",
      children: /* @__PURE__ */ c(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ c(
            "path",
            {
              d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
              fill: "currentColor"
            }
          )
        }
      )
    }
  ) : null, Sn = () => {
    if ((T === "sidebar" || T === "fullscreen") && !H) {
      const S = T === "fullscreen";
      return /* @__PURE__ */ c(
        "button",
        {
          className: S ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: _t,
          title: S ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ c(
            "svg",
            {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: S ? (
                // Minimize icon (arrows pointing inward)
                /* @__PURE__ */ c(
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
                /* @__PURE__ */ c(
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
  }, Qt = () => (T === "sidebar" || T === "fullscreen") && !H ? /* @__PURE__ */ c(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: Kt,
      title: "Collapse chat",
      children: /* @__PURE__ */ c(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ c(
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
  ) : null, zt = () => l && t.headerVisible !== !1 ? /* @__PURE__ */ c(
    "button",
    {
      className: "chat-wrapper__settings-button",
      onClick: () => lt(!0),
      title: "Developer Settings",
      children: /* @__PURE__ */ c(
        "svg",
        {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ c(
            "path",
            {
              d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
              fill: "currentColor"
            }
          )
        }
      )
    }
  ) : null, en = () => !l || t.headerVisible !== !1 ? null : /* @__PURE__ */ c(
    "button",
    {
      className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
      onClick: () => lt(!0),
      title: "Developer Settings",
      children: /* @__PURE__ */ c(
        "svg",
        {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ c(
            "path",
            {
              d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
              fill: "currentColor"
            }
          )
        }
      )
    }
  ), tn = () => {
    var S;
    return !((S = t.features) != null && S.showToolResults) || Q.length === 0 ? null : /* @__PURE__ */ I("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ c("h4", { children: "Tool Results" }),
      /* @__PURE__ */ c("div", { className: "chat-wrapper__tool-results-list", children: Q.map((L) => /* @__PURE__ */ I("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ c("div", { className: "chat-wrapper__tool-result-title", children: L.title }),
        L.description && /* @__PURE__ */ c("div", { className: "chat-wrapper__tool-result-description", children: L.description }),
        /* @__PURE__ */ I("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          L.status || "completed"
        ] })
      ] }, L.id)) })
    ] });
  };
  return T === "modal" && !q || (T === "sidebar" || T === "fullscreen") && H ? me() : (console.log("clog messages", w), /* @__PURE__ */ c(dn, { children: /* @__PURE__ */ I("div", { className: _n, style: t.customStyles, children: [
    en(),
    t.headerVisible !== !1 && /* @__PURE__ */ I("div", { className: "chat-wrapper__header", children: [
      /* @__PURE__ */ I("div", { className: "chat-wrapper__title-area", children: [
        /* @__PURE__ */ c("h2", { className: "chat-wrapper__title", children: t.appName }),
        /* @__PURE__ */ c("div", { className: "chat-wrapper__connection-status", children: /* @__PURE__ */ c(
          "span",
          {
            className: `chat-wrapper__connection-indicator ${f ? "connected" : "disconnected"}`,
            title: f ? `Connected to WebSocket${y ? ` (Session: ${y.slice(-8)})` : ""}` : "Disconnected from WebSocket",
            children: f ? "🟢" : "🔴"
          }
        ) })
      ] }),
      /* @__PURE__ */ I("div", { className: "chat-wrapper__header-controls", children: [
        zt(),
        Sn(),
        Qt(),
        Ct()
      ] })
    ] }),
    !H && /* @__PURE__ */ I(dn, { children: [
      Y && /* @__PURE__ */ c("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ I("p", { children: [
        "⚠️ ",
        Y
      ] }) }),
      w.length === 0 && !N && !G && /* @__PURE__ */ I("div", { className: "chat-wrapper__main-header", children: [
        /* @__PURE__ */ c("h1", { className: "chat-wrapper__main-title", children: t.appName }),
        t.description && /* @__PURE__ */ c("p", { className: "chat-wrapper__description", children: t.description })
      ] }),
      /* @__PURE__ */ I(
        "div",
        {
          className: `chat-wrapper__content ${w.length === 0 && !N && !G ? "chat-wrapper__content--empty" : "chat-wrapper__content--with-messages"}`,
          children: [
            /* @__PURE__ */ I("div", { className: "chat-wrapper__messages", children: [
              G && w.length === 0 && /* @__PURE__ */ c(Hc, { fullHeight: !0 }),
              w.map((S) => /* @__PURE__ */ c(
                da,
                {
                  message: S,
                  getReasoningTitle: ht,
                  getReasoningStatus: It,
                  getReasoningDuration: Ft,
                  getReasoningContentOnly: bt,
                  getToolingTitle: x,
                  getToolingStatus: v,
                  clientTools: r || [],
                  currentAssistantMessageIdRef: Ee
                },
                S.id
              )),
              Ee.current && ze && /* @__PURE__ */ c(
                fa,
                {
                  content: ze,
                  messageId: Ee.current
                }
              ),
              Te && !Me && /* @__PURE__ */ c("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ I("div", { className: "chat-wrapper__thinking-dots", children: [
                /* @__PURE__ */ c("span", {}),
                /* @__PURE__ */ c("span", {}),
                /* @__PURE__ */ c("span", {})
              ] }) }) }) }),
              /* @__PURE__ */ c("div", { ref: $e })
            ] }),
            tn(),
            /* @__PURE__ */ c("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ c(
              Oc,
              {
                ref: tt,
                placeholder: t.placeholder,
                placeholderTexts: t.placeholderTexts,
                disabled: N,
                chatStatus: $,
                fileUploadEnabled: (nn = t.features) == null ? void 0 : nn.fileUpload,
                restaurantName: t.restaurantName,
                restaurantLogo: t.restaurantLogo,
                hasMessages: w.length > 0,
                onSubmit: (S, L) => Je(S, L),
                onFileUpload: bn,
                onStopGeneration: Le
              }
            ) }),
            w.length === 0 && !N && !G && t.suggestedPrompts && /* @__PURE__ */ c(
              Fc,
              {
                prompts: t.suggestedPrompts,
                onPromptSelect: (S) => {
                  tt.current && tt.current.setText(S.description);
                }
              }
            )
          ]
        }
      )
    ] }),
    t.onError && /* @__PURE__ */ c("div", { className: "chat-wrapper__error-boundary" }),
    /* @__PURE__ */ c(
      Vc,
      {
        isOpen: at,
        onClose: () => lt(!1),
        app: o,
        apiUrl: e
      }
    )
  ] }) }));
}
const su = rr(Gc);
class Yc {
  constructor(t, n) {
    ae(this, "baseUrl");
    ae(this, "apiKey");
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
    const i = r.body.getReader(), a = new TextDecoder();
    for (; ; ) {
      const { done: l, value: o } = await i.read();
      if (l) break;
      const p = a.decode(o).split(`
`);
      for (const s of p)
        if (s.startsWith("data: ")) {
          const d = s.slice(6);
          if (d === "[DONE]") return;
          try {
            yield JSON.parse(d).content || "";
          } catch (f) {
            console.error("Failed to parse chunk:", f);
          }
        }
    }
  }
}
function cu(e, t) {
  const [n, r] = X([]), [i, a] = X(!1), [l, o] = X(null), u = rt(null), p = rt(new Yc(e, t)), s = oe(async () => {
    try {
      const h = await p.current.initConversation();
      return u.current = h, h;
    } catch (h) {
      throw o(h), h;
    }
  }, []), d = oe(
    async (h) => {
      u.current || await s();
      const y = {
        id: Date.now().toString(),
        role: "user",
        content: h,
        timestamp: /* @__PURE__ */ new Date()
      };
      r((A) => [...A, y]), a(!0), o(null);
      const b = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      r((A) => [...A, b]);
      try {
        const A = p.current.streamMessage(
          u.current,
          h
        );
        for await (const w of A)
          r(
            (R) => R.map(
              (N) => N.id === b.id ? { ...N, content: N.content + w } : N
            )
          );
        r(
          (w) => w.map(
            (R) => R.id === b.id ? { ...R, isStreaming: !1 } : R
          )
        );
      } catch (A) {
        o(A), r((w) => w.filter((R) => R.id !== b.id));
      } finally {
        a(!1);
      }
    },
    [s]
  ), f = oe(() => {
    r([]), u.current = null;
  }, []);
  return {
    messages: n,
    isLoading: i,
    error: l,
    sendMessage: d,
    clearMessages: f
  };
}
export {
  uc as AnimatedPlaceholder,
  su as ChatWrapper,
  Vc as DevSettings,
  Hc as InlineLoader,
  ha as Loader,
  ac as PromptInput,
  sc as PromptInputButton,
  Qc as PromptInputModelSelect,
  tu as PromptInputModelSelectContent,
  nu as PromptInputModelSelectItem,
  eu as PromptInputModelSelectTrigger,
  ru as PromptInputModelSelectValue,
  cc as PromptInputSubmit,
  aa as PromptInputTextarea,
  lc as PromptInputToolbar,
  oc as PromptInputTools,
  zc as Reasoning,
  pa as ReasoningContent,
  ua as ReasoningTrigger,
  Fc as SuggestedPrompts,
  ou as createThread,
  lu as fetchMessagesByConvUuid,
  au as fetchThreadByConvUuid,
  Zc as fetchThreadMessages,
  iu as fetchUserThreads,
  cu as useChatConnection
};
