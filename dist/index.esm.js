var ba = Object.defineProperty;
var Aa = (e, t, n) => t in e ? ba(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ie = (e, t, n) => Aa(e, typeof t != "symbol" ? t + "" : t, n);
import { jsxs as b, jsx as s, Fragment as En } from "react/jsx-runtime";
import Ft, { forwardRef as Ni, useState as K, useEffect as st, useRef as Ct, useImperativeHandle as va, useCallback as ue, memo as fr, useMemo as Rt } from "react";
function Ia(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Ra = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Na = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, La = {};
function Lr(e, t) {
  return (La.jsx ? Na : Ra).test(e);
}
const Ma = /[ \t\n\f\r]/g;
function Oa(e) {
  return typeof e == "object" ? e.type === "text" ? Mr(e.value) : !1 : Mr(e);
}
function Mr(e) {
  return e.replace(Ma, "") === "";
}
class on {
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
on.prototype.normal = {};
on.prototype.property = {};
on.prototype.space = void 0;
function Li(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new on(n, r, t);
}
function er(e) {
  return e.toLowerCase();
}
class We {
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
We.prototype.attribute = "";
We.prototype.booleanish = !1;
We.prototype.boolean = !1;
We.prototype.commaOrSpaceSeparated = !1;
We.prototype.commaSeparated = !1;
We.prototype.defined = !1;
We.prototype.mustUseProperty = !1;
We.prototype.number = !1;
We.prototype.overloadedBoolean = !1;
We.prototype.property = "";
We.prototype.spaceSeparated = !1;
We.prototype.space = void 0;
let Da = 0;
const W = Lt(), _e = Lt(), tr = Lt(), T = Lt(), oe = Lt(), zt = Lt(), Xe = Lt();
function Lt() {
  return 2 ** ++Da;
}
const nr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: W,
  booleanish: _e,
  commaOrSpaceSeparated: Xe,
  commaSeparated: zt,
  number: T,
  overloadedBoolean: tr,
  spaceSeparated: oe
}, Symbol.toStringTag, { value: "Module" })), Hn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(nr)
);
class mr extends We {
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
    if (super(t, n), Or(this, "space", i), typeof r == "number")
      for (; ++a < Hn.length; ) {
        const l = Hn[a];
        Or(this, Hn[a], (r & nr[l]) === nr[l]);
      }
  }
}
mr.prototype.defined = !0;
function Or(e, t, n) {
  n && (e[t] = n);
}
function Gt(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new mr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[er(r)] = r, n[er(a.attribute)] = r;
  }
  return new on(t, n, e.space);
}
const Mi = Gt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: _e,
    ariaAutoComplete: null,
    ariaBusy: _e,
    ariaChecked: _e,
    ariaColCount: T,
    ariaColIndex: T,
    ariaColSpan: T,
    ariaControls: oe,
    ariaCurrent: null,
    ariaDescribedBy: oe,
    ariaDetails: null,
    ariaDisabled: _e,
    ariaDropEffect: oe,
    ariaErrorMessage: null,
    ariaExpanded: _e,
    ariaFlowTo: oe,
    ariaGrabbed: _e,
    ariaHasPopup: null,
    ariaHidden: _e,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: oe,
    ariaLevel: T,
    ariaLive: null,
    ariaModal: _e,
    ariaMultiLine: _e,
    ariaMultiSelectable: _e,
    ariaOrientation: null,
    ariaOwns: oe,
    ariaPlaceholder: null,
    ariaPosInSet: T,
    ariaPressed: _e,
    ariaReadOnly: _e,
    ariaRelevant: null,
    ariaRequired: _e,
    ariaRoleDescription: oe,
    ariaRowCount: T,
    ariaRowIndex: T,
    ariaRowSpan: T,
    ariaSelected: _e,
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
function Oi(e, t) {
  return t in e ? e[t] : t;
}
function Di(e, t) {
  return Oi(e, t.toLowerCase());
}
const Pa = Gt({
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
    accept: zt,
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
    cols: T,
    colSpan: null,
    content: null,
    contentEditable: _e,
    controls: W,
    controlsList: oe,
    coords: T | zt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: W,
    defer: W,
    dir: null,
    dirName: null,
    disabled: W,
    download: tr,
    draggable: _e,
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
    height: T,
    hidden: tr,
    high: T,
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
    low: T,
    manifest: null,
    max: null,
    maxLength: T,
    media: null,
    method: null,
    min: null,
    minLength: T,
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
    optimum: T,
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
    rows: T,
    rowSpan: T,
    sandbox: oe,
    scope: null,
    scoped: W,
    seamless: W,
    selected: W,
    shadowRootClonable: W,
    shadowRootDelegatesFocus: W,
    shadowRootMode: null,
    shape: null,
    size: T,
    sizes: null,
    slot: null,
    span: T,
    spellCheck: _e,
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
    typeMustMatch: W,
    useMap: null,
    value: _e,
    width: T,
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
    rightMargin: T,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: _e,
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
    disablePictureInPicture: W,
    disableRemotePlayback: W,
    prefix: null,
    property: null,
    results: T,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Di
}), Ha = Gt({
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
    about: Xe,
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
    descent: T,
    diffuseConstant: T,
    direction: null,
    display: null,
    dur: null,
    divisor: T,
    dominantBaseline: null,
    download: W,
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
    g1: zt,
    g2: zt,
    glyphName: zt,
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
    kernelMatrix: Xe,
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
    ping: oe,
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
    property: Xe,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Xe,
    rev: Xe,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Xe,
    requiredFeatures: Xe,
    requiredFonts: Xe,
    requiredFormats: Xe,
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
    strokeDashArray: Xe,
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
    systemLanguage: Xe,
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
    typeOf: Xe,
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
  transform: Oi
}), Pi = Gt({
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
}), Hi = Gt({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Di
}), Ui = Gt({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), Ua = {
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
}, Fa = /[A-Z]/g, Dr = /-[a-z]/g, za = /^data[-\w.:]+$/i;
function Ba(e, t) {
  const n = er(t);
  let r = t, i = We;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && za.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(Dr, Ga);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!Dr.test(a)) {
        let l = a.replace(Fa, Va);
        l.charAt(0) !== "-" && (l = "-" + l), t = "data" + l;
      }
    }
    i = mr;
  }
  return new i(r, t);
}
function Va(e) {
  return "-" + e.toLowerCase();
}
function Ga(e) {
  return e.charAt(1).toUpperCase();
}
const ja = Li([Mi, Pa, Pi, Hi, Ui], "html"), gr = Li([Mi, Ha, Pi, Hi, Ui], "svg");
function Wa(e) {
  return e.join(" ").trim();
}
var Sn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Fi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Cr = {}, Pr = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, $a = /\n/g, Za = /^\s*/, qa = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Xa = /^:\s*/, Ya = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Ka = /^[;\s]*/, Qa = /^\s+|\s+$/g, Ja = `
`, Hr = "/", Ur = "*", Nt = "", el = "comment", tl = "declaration", nl = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(x) {
    var y = x.match($a);
    y && (n += y.length);
    var R = x.lastIndexOf(Ja);
    r = ~R ? x.length - R : r + x.length;
  }
  function a() {
    var x = { line: n, column: r };
    return function(y) {
      return y.position = new l(x), h(), y;
    };
  }
  function l(x) {
    this.start = x, this.end = { line: n, column: r }, this.source = t.source;
  }
  l.prototype.content = e;
  function o(x) {
    var y = new Error(
      t.source + ":" + n + ":" + r + ": " + x
    );
    if (y.reason = x, y.filename = t.source, y.line = n, y.column = r, y.source = e, !t.silent) throw y;
  }
  function c(x) {
    var y = x.exec(e);
    if (y) {
      var R = y[0];
      return i(R), e = e.slice(R.length), y;
    }
  }
  function h() {
    c(Za);
  }
  function u(x) {
    var y;
    for (x = x || []; y = d(); )
      y !== !1 && x.push(y);
    return x;
  }
  function d() {
    var x = a();
    if (!(Hr != e.charAt(0) || Ur != e.charAt(1))) {
      for (var y = 2; Nt != e.charAt(y) && (Ur != e.charAt(y) || Hr != e.charAt(y + 1)); )
        ++y;
      if (y += 2, Nt === e.charAt(y - 1))
        return o("End of comment missing");
      var R = e.slice(2, y - 2);
      return r += 2, i(R), e = e.slice(y), r += 2, x({
        type: el,
        comment: R
      });
    }
  }
  function C() {
    var x = a(), y = c(qa);
    if (y) {
      if (d(), !c(Xa)) return o("property missing ':'");
      var R = c(Ya), E = x({
        type: tl,
        property: Fr(y[0].replace(Pr, Nt)),
        value: R ? Fr(R[0].replace(Pr, Nt)) : Nt
      });
      return c(Ka), E;
    }
  }
  function p() {
    var x = [];
    u(x);
    for (var y; y = C(); )
      y !== !1 && (x.push(y), u(x));
    return x;
  }
  return h(), p();
};
function Fr(e) {
  return e ? e.replace(Qa, Nt) : Nt;
}
var rl = Sn && Sn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.default = al;
const il = rl(nl);
function al(e, t) {
  let n = null;
  if (!e || typeof e != "string")
    return n;
  const r = (0, il.default)(e), i = typeof t == "function";
  return r.forEach((a) => {
    if (a.type !== "declaration")
      return;
    const { property: l, value: o } = a;
    i ? t(l, o, a) : o && (n = n || {}, n[l] = o);
  }), n;
}
var vn = {};
Object.defineProperty(vn, "__esModule", { value: !0 });
vn.camelCase = void 0;
var ll = /^--[a-zA-Z0-9_-]+$/, ol = /-([a-z])/g, sl = /^[^-]+$/, cl = /^-(webkit|moz|ms|o|khtml)-/, ul = /^-(ms)-/, hl = function(e) {
  return !e || sl.test(e) || ll.test(e);
}, pl = function(e, t) {
  return t.toUpperCase();
}, zr = function(e, t) {
  return "".concat(t, "-");
}, dl = function(e, t) {
  return t === void 0 && (t = {}), hl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(ul, zr) : e = e.replace(cl, zr), e.replace(ol, pl));
};
vn.camelCase = dl;
var fl = Sn && Sn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, ml = fl(Cr), gl = vn;
function rr(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, ml.default)(e, function(r, i) {
    r && i && (n[(0, gl.camelCase)(r, t)] = i);
  }), n;
}
rr.default = rr;
var Cl = rr;
const yl = /* @__PURE__ */ Fi(Cl), zi = Bi("end"), yr = Bi("start");
function Bi(e) {
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
function wl(e) {
  const t = yr(e), n = zi(e);
  if (t && n)
    return { start: t, end: n };
}
function nn(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Br(e.position) : "start" in e || "end" in e ? Br(e) : "line" in e || "column" in e ? ir(e) : "";
}
function ir(e) {
  return Vr(e && e.line) + ":" + Vr(e && e.column);
}
function Br(e) {
  return ir(e && e.start) + "-" + ir(e && e.end);
}
function Vr(e) {
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
      const c = r.indexOf(":");
      c === -1 ? a.ruleId = r : (a.source = r.slice(0, c), a.ruleId = r.slice(c + 1));
    }
    if (!a.place && a.ancestors && a.ancestors) {
      const c = a.ancestors[a.ancestors.length - 1];
      c && (a.place = c.position);
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
const wr = {}.hasOwnProperty, _l = /* @__PURE__ */ new Map(), xl = /[A-Z]/g, El = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Sl = /* @__PURE__ */ new Set(["td", "th"]), Vi = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function kl(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Ll(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Nl(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? gr : ja,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = Gi(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function Gi(e, t, n) {
  if (t.type === "element")
    return Tl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return bl(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return vl(e, t, n);
  if (t.type === "mdxjsEsm")
    return Al(e, t);
  if (t.type === "root")
    return Il(e, t, n);
  if (t.type === "text")
    return Rl(e, t);
}
function Tl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = gr, e.schema = i), e.ancestors.push(t);
  const a = Wi(e, t.tagName, !1), l = Ml(e, t);
  let o = xr(e, t);
  return El.has(t.tagName) && (o = o.filter(function(c) {
    return typeof c == "string" ? !Oa(c) : !0;
  })), ji(e, l, a, t), _r(l, o), e.ancestors.pop(), e.schema = r, e.create(t, a, l, n);
}
function bl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  ln(e, t.position);
}
function Al(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  ln(e, t.position);
}
function vl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = gr, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : Wi(e, t.name, !0), l = Ol(e, t), o = xr(e, t);
  return ji(e, l, a, t), _r(l, o), e.ancestors.pop(), e.schema = r, e.create(t, a, l, n);
}
function Il(e, t, n) {
  const r = {};
  return _r(r, xr(e, t)), e.create(t, e.Fragment, r, n);
}
function Rl(e, t) {
  return t.value;
}
function ji(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function _r(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function Nl(e, t, n) {
  return r;
  function r(i, a, l, o) {
    const h = Array.isArray(l.children) ? n : t;
    return o ? h(a, l, o) : h(a, l);
  }
}
function Ll(e, t) {
  return n;
  function n(r, i, a, l) {
    const o = Array.isArray(a.children), c = yr(r);
    return t(
      i,
      a,
      l,
      o,
      {
        columnNumber: c ? c.column - 1 : void 0,
        fileName: e,
        lineNumber: c ? c.line : void 0
      },
      void 0
    );
  }
}
function Ml(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && wr.call(t.properties, i)) {
      const a = Dl(e, i, t.properties[i]);
      if (a) {
        const [l, o] = a;
        e.tableCellAlignToStyle && l === "align" && typeof o == "string" && Sl.has(t.tagName) ? r = o : n[l] = o;
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
function Ol(e, t) {
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
        ln(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const o = r.value.data.estree.body[0];
          o.type, a = e.evaluater.evaluateExpression(o.expression);
        } else
          ln(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function xr(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : _l;
  for (; ++r < t.children.length; ) {
    const a = t.children[r];
    let l;
    if (e.passKeys) {
      const c = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (c) {
        const h = i.get(c) || 0;
        l = c + "-" + h, i.set(c, h + 1);
      }
    }
    const o = Gi(e, a, l);
    o !== void 0 && n.push(o);
  }
  return n;
}
function Dl(e, t, n) {
  const r = Ba(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Ia(n) : Wa(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Pl(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Hl(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Ua[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Pl(e, t) {
  try {
    return yl(t, { reactCompat: !0 });
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
    throw i.file = e.filePath || void 0, i.url = Vi + "#cannot-parse-style-attribute", i;
  }
}
function Wi(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let a = -1, l;
    for (; ++a < i.length; ) {
      const o = Lr(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
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
    r = Lr(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return wr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  ln(e);
}
function ln(e, t) {
  const n = new Me(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Vi + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Hl(e) {
  const t = {};
  let n;
  for (n in e)
    wr.call(e, n) && (t[Ul(n)] = e[n]);
  return t;
}
function Ul(e) {
  let t = e.replace(xl, Fl);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Fl(e) {
  return "-" + e.toLowerCase();
}
const Un = {
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
}, zl = {};
function Bl(e, t) {
  const n = zl, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return $i(e, r, i);
}
function $i(e, t, n) {
  if (Vl(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Gr(e.children, t, n);
  }
  return Array.isArray(e) ? Gr(e, t, n) : "";
}
function Gr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = $i(e[i], t, n);
  return r.join("");
}
function Vl(e) {
  return !!(e && typeof e == "object");
}
const jr = document.createElement("i");
function Er(e) {
  const t = "&" + e + ";";
  jr.innerHTML = t;
  const n = jr.textContent;
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
function nt(e, t) {
  return e.length > 0 ? (ut(e, e.length, 0, t), e) : t;
}
const Wr = {}.hasOwnProperty;
function Gl(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    jl(t, e[n]);
  return t;
}
function jl(e, t) {
  let n;
  for (n in t) {
    const i = (Wr.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let l;
    if (a)
      for (l in a) {
        Wr.call(i, l) || (i[l] = []);
        const o = a[l];
        Wl(
          // @ts-expect-error Looks like a list.
          i[l],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function Wl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  ut(e, 0, 0, r);
}
function Zi(e, t) {
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
function Bt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const ct = At(/[A-Za-z]/), Ye = At(/[\dA-Za-z]/), $l = At(/[#-'*+\--9=?A-Z^-~]/);
function ar(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const lr = At(/\d/), Zl = At(/[\dA-Fa-f]/), ql = At(/[!-/:-@[-`{-~]/);
function B(e) {
  return e !== null && e < -2;
}
function je(e) {
  return e !== null && (e < 0 || e === 32);
}
function re(e) {
  return e === -2 || e === -1 || e === 32;
}
const Xl = At(new RegExp("\\p{P}|\\p{S}", "u")), Yl = At(/\s/);
function At(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function jt(e) {
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
function se(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return l;
  function l(c) {
    return re(c) ? (e.enter(n), o(c)) : t(c);
  }
  function o(c) {
    return re(c) && a++ < i ? (e.consume(c), o) : (e.exit(n), t(c));
  }
}
const Kl = {
  tokenize: Ql
};
function Ql(e) {
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
    const c = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = c), n = c, l(o);
  }
  function l(o) {
    if (o === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(o);
      return;
    }
    return B(o) ? (e.consume(o), e.exit("chunkText"), a) : (e.consume(o), l);
  }
}
const Jl = {
  tokenize: eo
}, $r = {
  tokenize: to
};
function eo(e) {
  const t = this, n = [];
  let r = 0, i, a, l;
  return o;
  function o(N) {
    if (r < n.length) {
      const P = n[r];
      return t.containerState = P[1], e.attempt(P[0].continuation, c, h)(N);
    }
    return h(N);
  }
  function c(N) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && z();
      const P = t.events.length;
      let Z = P, w;
      for (; Z--; )
        if (t.events[Z][0] === "exit" && t.events[Z][1].type === "chunkFlow") {
          w = t.events[Z][1].end;
          break;
        }
      E(r);
      let U = P;
      for (; U < t.events.length; )
        t.events[U][1].end = {
          ...w
        }, U++;
      return ut(t.events, Z + 1, 0, t.events.slice(P)), t.events.length = U, h(N);
    }
    return o(N);
  }
  function h(N) {
    if (r === n.length) {
      if (!i)
        return C(N);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return x(N);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check($r, u, d)(N);
  }
  function u(N) {
    return i && z(), E(r), C(N);
  }
  function d(N) {
    return t.parser.lazy[t.now().line] = r !== n.length, l = t.now().offset, x(N);
  }
  function C(N) {
    return t.containerState = {}, e.attempt($r, p, x)(N);
  }
  function p(N) {
    return r++, n.push([t.currentConstruct, t.containerState]), C(N);
  }
  function x(N) {
    if (N === null) {
      i && z(), E(0), e.consume(N);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: a
    }), y(N);
  }
  function y(N) {
    if (N === null) {
      R(e.exit("chunkFlow"), !0), E(0), e.consume(N);
      return;
    }
    return B(N) ? (e.consume(N), R(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, o) : (e.consume(N), y);
  }
  function R(N, P) {
    const Z = t.sliceStream(N);
    if (P && Z.push(null), N.previous = a, a && (a.next = N), a = N, i.defineSkip(N.start), i.write(Z), t.parser.lazy[N.start.line]) {
      let w = i.events.length;
      for (; w--; )
        if (
          // The token starts before the line ending…
          i.events[w][1].start.offset < l && // …and either is not ended yet…
          (!i.events[w][1].end || // …or ends after it.
          i.events[w][1].end.offset > l)
        )
          return;
      const U = t.events.length;
      let G = U, $, O;
      for (; G--; )
        if (t.events[G][0] === "exit" && t.events[G][1].type === "chunkFlow") {
          if ($) {
            O = t.events[G][1].end;
            break;
          }
          $ = !0;
        }
      for (E(r), w = U; w < t.events.length; )
        t.events[w][1].end = {
          ...O
        }, w++;
      ut(t.events, G + 1, 0, t.events.slice(U)), t.events.length = w;
    }
  }
  function E(N) {
    let P = n.length;
    for (; P-- > N; ) {
      const Z = n[P];
      t.containerState = Z[1], Z[0].exit.call(t, e);
    }
    n.length = N;
  }
  function z() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function to(e, t, n) {
  return se(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Zr(e) {
  if (e === null || je(e) || Yl(e))
    return 1;
  if (Xl(e))
    return 2;
}
function Sr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const or = {
  name: "attention",
  resolveAll: no,
  tokenize: ro
};
function no(e, t) {
  let n = -1, r, i, a, l, o, c, h, u;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const d = {
            ...e[r][1].end
          }, C = {
            ...e[n][1].start
          };
          qr(d, -c), qr(C, c), l = {
            type: c > 1 ? "strongSequence" : "emphasisSequence",
            start: d,
            end: {
              ...e[r][1].end
            }
          }, o = {
            type: c > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: C
          }, a = {
            type: c > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[n][1].start
            }
          }, i = {
            type: c > 1 ? "strong" : "emphasis",
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
          }, h = [], e[r][1].end.offset - e[r][1].start.offset && (h = nt(h, [["enter", e[r][1], t], ["exit", e[r][1], t]])), h = nt(h, [["enter", i, t], ["enter", l, t], ["exit", l, t], ["enter", a, t]]), h = nt(h, Sr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), h = nt(h, [["exit", a, t], ["enter", o, t], ["exit", o, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, h = nt(h, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : u = 0, ut(e, r - 1, n - r + 3, h), n = r + h.length - u - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function ro(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Zr(r);
  let a;
  return l;
  function l(c) {
    return a = c, e.enter("attentionSequence"), o(c);
  }
  function o(c) {
    if (c === a)
      return e.consume(c), o;
    const h = e.exit("attentionSequence"), u = Zr(c), d = !u || u === 2 && i || n.includes(c), C = !i || i === 2 && u || n.includes(r);
    return h._open = !!(a === 42 ? d : d && (i || !C)), h._close = !!(a === 42 ? C : C && (u || !d)), t(c);
  }
}
function qr(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const io = {
  name: "autolink",
  tokenize: ao
};
function ao(e, t, n) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(p) {
    return ct(p) ? (e.consume(p), l) : p === 64 ? n(p) : h(p);
  }
  function l(p) {
    return p === 43 || p === 45 || p === 46 || Ye(p) ? (r = 1, o(p)) : h(p);
  }
  function o(p) {
    return p === 58 ? (e.consume(p), r = 0, c) : (p === 43 || p === 45 || p === 46 || Ye(p)) && r++ < 32 ? (e.consume(p), o) : (r = 0, h(p));
  }
  function c(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : p === null || p === 32 || p === 60 || ar(p) ? n(p) : (e.consume(p), c);
  }
  function h(p) {
    return p === 64 ? (e.consume(p), u) : $l(p) ? (e.consume(p), h) : n(p);
  }
  function u(p) {
    return Ye(p) ? d(p) : n(p);
  }
  function d(p) {
    return p === 46 ? (e.consume(p), r = 0, u) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : C(p);
  }
  function C(p) {
    if ((p === 45 || Ye(p)) && r++ < 63) {
      const x = p === 45 ? C : d;
      return e.consume(p), x;
    }
    return n(p);
  }
}
const In = {
  partial: !0,
  tokenize: lo
};
function lo(e, t, n) {
  return r;
  function r(a) {
    return re(a) ? se(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || B(a) ? t(a) : n(a);
  }
}
const qi = {
  continuation: {
    tokenize: so
  },
  exit: co,
  name: "blockQuote",
  tokenize: oo
};
function oo(e, t, n) {
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
function so(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return re(l) ? se(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : a(l);
  }
  function a(l) {
    return e.attempt(qi, t, n)(l);
  }
}
function co(e) {
  e.exit("blockQuote");
}
const Xi = {
  name: "characterEscape",
  tokenize: uo
};
function uo(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return ql(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const Yi = {
  name: "characterReference",
  tokenize: ho
};
function ho(e, t, n) {
  const r = this;
  let i = 0, a, l;
  return o;
  function o(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), c;
  }
  function c(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), h) : (e.enter("characterReferenceValue"), a = 31, l = Ye, u(d));
  }
  function h(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, l = Zl, u) : (e.enter("characterReferenceValue"), a = 7, l = lr, u(d));
  }
  function u(d) {
    if (d === 59 && i) {
      const C = e.exit("characterReferenceValue");
      return l === Ye && !Er(r.sliceSerialize(C)) ? n(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return l(d) && i++ < a ? (e.consume(d), u) : n(d);
  }
}
const Xr = {
  partial: !0,
  tokenize: fo
}, Yr = {
  concrete: !0,
  name: "codeFenced",
  tokenize: po
};
function po(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: Z
  };
  let a = 0, l = 0, o;
  return c;
  function c(w) {
    return h(w);
  }
  function h(w) {
    const U = r.events[r.events.length - 1];
    return a = U && U[1].type === "linePrefix" ? U[2].sliceSerialize(U[1], !0).length : 0, o = w, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(w);
  }
  function u(w) {
    return w === o ? (l++, e.consume(w), u) : l < 3 ? n(w) : (e.exit("codeFencedFenceSequence"), re(w) ? se(e, d, "whitespace")(w) : d(w));
  }
  function d(w) {
    return w === null || B(w) ? (e.exit("codeFencedFence"), r.interrupt ? t(w) : e.check(Xr, y, P)(w)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), C(w));
  }
  function C(w) {
    return w === null || B(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(w)) : re(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), se(e, p, "whitespace")(w)) : w === 96 && w === o ? n(w) : (e.consume(w), C);
  }
  function p(w) {
    return w === null || B(w) ? d(w) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), x(w));
  }
  function x(w) {
    return w === null || B(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(w)) : w === 96 && w === o ? n(w) : (e.consume(w), x);
  }
  function y(w) {
    return e.attempt(i, P, R)(w);
  }
  function R(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), E;
  }
  function E(w) {
    return a > 0 && re(w) ? se(e, z, "linePrefix", a + 1)(w) : z(w);
  }
  function z(w) {
    return w === null || B(w) ? e.check(Xr, y, P)(w) : (e.enter("codeFlowValue"), N(w));
  }
  function N(w) {
    return w === null || B(w) ? (e.exit("codeFlowValue"), z(w)) : (e.consume(w), N);
  }
  function P(w) {
    return e.exit("codeFenced"), t(w);
  }
  function Z(w, U, G) {
    let $ = 0;
    return O;
    function O(q) {
      return w.enter("lineEnding"), w.consume(q), w.exit("lineEnding"), I;
    }
    function I(q) {
      return w.enter("codeFencedFence"), re(q) ? se(w, L, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(q) : L(q);
    }
    function L(q) {
      return q === o ? (w.enter("codeFencedFenceSequence"), X(q)) : G(q);
    }
    function X(q) {
      return q === o ? ($++, w.consume(q), X) : $ >= l ? (w.exit("codeFencedFenceSequence"), re(q) ? se(w, le, "whitespace")(q) : le(q)) : G(q);
    }
    function le(q) {
      return q === null || B(q) ? (w.exit("codeFencedFence"), U(q)) : G(q);
    }
  }
}
function fo(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return l === null ? n(l) : (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), a);
  }
  function a(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
const Fn = {
  name: "codeIndented",
  tokenize: go
}, mo = {
  partial: !0,
  tokenize: Co
};
function go(e, t, n) {
  const r = this;
  return i;
  function i(h) {
    return e.enter("codeIndented"), se(e, a, "linePrefix", 5)(h);
  }
  function a(h) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? l(h) : n(h);
  }
  function l(h) {
    return h === null ? c(h) : B(h) ? e.attempt(mo, l, c)(h) : (e.enter("codeFlowValue"), o(h));
  }
  function o(h) {
    return h === null || B(h) ? (e.exit("codeFlowValue"), l(h)) : (e.consume(h), o);
  }
  function c(h) {
    return e.exit("codeIndented"), t(h);
  }
}
function Co(e, t, n) {
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
const yo = {
  name: "codeText",
  previous: _o,
  resolve: wo,
  tokenize: xo
};
function wo(e) {
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
function _o(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function xo(e, t, n) {
  let r = 0, i, a;
  return l;
  function l(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), o(d);
  }
  function o(d) {
    return d === 96 ? (e.consume(d), r++, o) : (e.exit("codeTextSequence"), c(d));
  }
  function c(d) {
    return d === null ? n(d) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), c) : d === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(d)) : B(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), c) : (e.enter("codeTextData"), h(d));
  }
  function h(d) {
    return d === null || d === 32 || d === 96 || B(d) ? (e.exit("codeTextData"), c(d)) : (e.consume(d), h);
  }
  function u(d) {
    return d === 96 ? (e.consume(d), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(d)) : (a.type = "codeTextData", h(d));
  }
}
class Eo {
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
    return r && Xt(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Xt(this.left, t);
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
    this.setCursor(0), Xt(this.right, t.reverse());
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
        Xt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Xt(this.left, n.reverse());
      }
  }
}
function Xt(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function Ki(e) {
  const t = {};
  let n = -1, r, i, a, l, o, c, h;
  const u = new Eo(e);
  for (; ++n < u.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === "lineEndingBlank" && (a += 2), a < c.length && c[a][1].type === "content"))
      for (; ++a < c.length && c[a][1].type !== "content"; )
        c[a][1].type === "chunkText" && (c[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, So(u, n)), n = t[n], h = !0);
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
  return ut(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !h;
}
function So(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let l = n._tokenizer;
  l || (l = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (l._contentTypeTextTrailing = !0));
  const o = l.events, c = [], h = {};
  let u, d, C = -1, p = n, x = 0, y = 0;
  const R = [y];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && l.defineSkip(p.start), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(u), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
  }
  for (p = n; ++C < o.length; )
    // Find a void token that includes a break.
    o[C][0] === "exit" && o[C - 1][0] === "enter" && o[C][1].type === o[C - 1][1].type && o[C][1].start.line !== o[C][1].end.line && (y = C + 1, R.push(y), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (l.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : R.pop(), C = R.length; C--; ) {
    const E = o.slice(R[C], R[C + 1]), z = a.pop();
    c.push([z, z + E.length - 1]), e.splice(z, 2, E);
  }
  for (c.reverse(), C = -1; ++C < c.length; )
    h[x + c[C][0]] = x + c[C][1], x += c[C][1] - c[C][0] - 1;
  return h;
}
const ko = {
  resolve: bo,
  tokenize: Ao
}, To = {
  partial: !0,
  tokenize: vo
};
function bo(e) {
  return Ki(e), e;
}
function Ao(e, t) {
  let n;
  return r;
  function r(o) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(o);
  }
  function i(o) {
    return o === null ? a(o) : B(o) ? e.check(To, l, a)(o) : (e.consume(o), i);
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
function vo(e, t, n) {
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
function Qi(e, t, n, r, i, a, l, o, c) {
  const h = c || Number.POSITIVE_INFINITY;
  let u = 0;
  return d;
  function d(E) {
    return E === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(E), e.exit(a), C) : E === null || E === 32 || E === 41 || ar(E) ? n(E) : (e.enter(r), e.enter(l), e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), y(E));
  }
  function C(E) {
    return E === 62 ? (e.enter(a), e.consume(E), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), p(E));
  }
  function p(E) {
    return E === 62 ? (e.exit("chunkString"), e.exit(o), C(E)) : E === null || E === 60 || B(E) ? n(E) : (e.consume(E), E === 92 ? x : p);
  }
  function x(E) {
    return E === 60 || E === 62 || E === 92 ? (e.consume(E), p) : p(E);
  }
  function y(E) {
    return !u && (E === null || E === 41 || je(E)) ? (e.exit("chunkString"), e.exit(o), e.exit(l), e.exit(r), t(E)) : u < h && E === 40 ? (e.consume(E), u++, y) : E === 41 ? (e.consume(E), u--, y) : E === null || E === 32 || E === 40 || ar(E) ? n(E) : (e.consume(E), E === 92 ? R : y);
  }
  function R(E) {
    return E === 40 || E === 41 || E === 92 ? (e.consume(E), y) : y(E);
  }
}
function Ji(e, t, n, r, i, a) {
  const l = this;
  let o = 0, c;
  return h;
  function h(p) {
    return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(a), u;
  }
  function u(p) {
    return o > 999 || p === null || p === 91 || p === 93 && !c || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !o && "_hiddenFootnoteSupport" in l.parser.constructs ? n(p) : p === 93 ? (e.exit(a), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : B(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), d(p));
  }
  function d(p) {
    return p === null || p === 91 || p === 93 || B(p) || o++ > 999 ? (e.exit("chunkString"), u(p)) : (e.consume(p), c || (c = !re(p)), p === 92 ? C : d);
  }
  function C(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), o++, d) : d(p);
  }
}
function ea(e, t, n, r, i, a) {
  let l;
  return o;
  function o(C) {
    return C === 34 || C === 39 || C === 40 ? (e.enter(r), e.enter(i), e.consume(C), e.exit(i), l = C === 40 ? 41 : C, c) : n(C);
  }
  function c(C) {
    return C === l ? (e.enter(i), e.consume(C), e.exit(i), e.exit(r), t) : (e.enter(a), h(C));
  }
  function h(C) {
    return C === l ? (e.exit(a), c(l)) : C === null ? n(C) : B(C) ? (e.enter("lineEnding"), e.consume(C), e.exit("lineEnding"), se(e, h, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), u(C));
  }
  function u(C) {
    return C === l || C === null || B(C) ? (e.exit("chunkString"), h(C)) : (e.consume(C), C === 92 ? d : u);
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
const Io = {
  name: "definition",
  tokenize: No
}, Ro = {
  partial: !0,
  tokenize: Lo
};
function No(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(p) {
    return e.enter("definition"), l(p);
  }
  function l(p) {
    return Ji.call(
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
    return i = Bt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), c) : n(p);
  }
  function c(p) {
    return je(p) ? rn(e, h)(p) : h(p);
  }
  function h(p) {
    return Qi(
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
    return e.attempt(Ro, d, d)(p);
  }
  function d(p) {
    return re(p) ? se(e, C, "whitespace")(p) : C(p);
  }
  function C(p) {
    return p === null || B(p) ? (e.exit("definition"), r.parser.defined.push(i), t(p)) : n(p);
  }
}
function Lo(e, t, n) {
  return r;
  function r(o) {
    return je(o) ? rn(e, i)(o) : n(o);
  }
  function i(o) {
    return ea(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
  }
  function a(o) {
    return re(o) ? se(e, l, "whitespace")(o) : l(o);
  }
  function l(o) {
    return o === null || B(o) ? t(o) : n(o);
  }
}
const Mo = {
  name: "hardBreakEscape",
  tokenize: Oo
};
function Oo(e, t, n) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), i;
  }
  function i(a) {
    return B(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
  }
}
const Do = {
  name: "headingAtx",
  resolve: Po,
  tokenize: Ho
};
function Po(e, t) {
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
function Ho(e, t, n) {
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
    return u === 35 ? (e.enter("atxHeadingSequence"), c(u)) : u === null || B(u) ? (e.exit("atxHeading"), t(u)) : re(u) ? se(e, o, "whitespace")(u) : (e.enter("atxHeadingText"), h(u));
  }
  function c(u) {
    return u === 35 ? (e.consume(u), c) : (e.exit("atxHeadingSequence"), o(u));
  }
  function h(u) {
    return u === null || u === 35 || je(u) ? (e.exit("atxHeadingText"), o(u)) : (e.consume(u), h);
  }
}
const Uo = [
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
], Kr = ["pre", "script", "style", "textarea"], Fo = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Vo,
  tokenize: Go
}, zo = {
  partial: !0,
  tokenize: Wo
}, Bo = {
  partial: !0,
  tokenize: jo
};
function Vo(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Go(e, t, n) {
  const r = this;
  let i, a, l, o, c;
  return h;
  function h(f) {
    return u(f);
  }
  function u(f) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(f), d;
  }
  function d(f) {
    return f === 33 ? (e.consume(f), C) : f === 47 ? (e.consume(f), a = !0, y) : f === 63 ? (e.consume(f), i = 3, r.interrupt ? t : g) : ct(f) ? (e.consume(f), l = String.fromCharCode(f), R) : n(f);
  }
  function C(f) {
    return f === 45 ? (e.consume(f), i = 2, p) : f === 91 ? (e.consume(f), i = 5, o = 0, x) : ct(f) ? (e.consume(f), i = 4, r.interrupt ? t : g) : n(f);
  }
  function p(f) {
    return f === 45 ? (e.consume(f), r.interrupt ? t : g) : n(f);
  }
  function x(f) {
    const ge = "CDATA[";
    return f === ge.charCodeAt(o++) ? (e.consume(f), o === ge.length ? r.interrupt ? t : L : x) : n(f);
  }
  function y(f) {
    return ct(f) ? (e.consume(f), l = String.fromCharCode(f), R) : n(f);
  }
  function R(f) {
    if (f === null || f === 47 || f === 62 || je(f)) {
      const ge = f === 47, te = l.toLowerCase();
      return !ge && !a && Kr.includes(te) ? (i = 1, r.interrupt ? t(f) : L(f)) : Uo.includes(l.toLowerCase()) ? (i = 6, ge ? (e.consume(f), E) : r.interrupt ? t(f) : L(f)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(f) : a ? z(f) : N(f));
    }
    return f === 45 || Ye(f) ? (e.consume(f), l += String.fromCharCode(f), R) : n(f);
  }
  function E(f) {
    return f === 62 ? (e.consume(f), r.interrupt ? t : L) : n(f);
  }
  function z(f) {
    return re(f) ? (e.consume(f), z) : O(f);
  }
  function N(f) {
    return f === 47 ? (e.consume(f), O) : f === 58 || f === 95 || ct(f) ? (e.consume(f), P) : re(f) ? (e.consume(f), N) : O(f);
  }
  function P(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || Ye(f) ? (e.consume(f), P) : Z(f);
  }
  function Z(f) {
    return f === 61 ? (e.consume(f), w) : re(f) ? (e.consume(f), Z) : N(f);
  }
  function w(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), c = f, U) : re(f) ? (e.consume(f), w) : G(f);
  }
  function U(f) {
    return f === c ? (e.consume(f), c = null, $) : f === null || B(f) ? n(f) : (e.consume(f), U);
  }
  function G(f) {
    return f === null || f === 34 || f === 39 || f === 47 || f === 60 || f === 61 || f === 62 || f === 96 || je(f) ? Z(f) : (e.consume(f), G);
  }
  function $(f) {
    return f === 47 || f === 62 || re(f) ? N(f) : n(f);
  }
  function O(f) {
    return f === 62 ? (e.consume(f), I) : n(f);
  }
  function I(f) {
    return f === null || B(f) ? L(f) : re(f) ? (e.consume(f), I) : n(f);
  }
  function L(f) {
    return f === 45 && i === 2 ? (e.consume(f), xe) : f === 60 && i === 1 ? (e.consume(f), me) : f === 62 && i === 4 ? (e.consume(f), J) : f === 63 && i === 3 ? (e.consume(f), g) : f === 93 && i === 5 ? (e.consume(f), $e) : B(f) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(zo, Ie, X)(f)) : f === null || B(f) ? (e.exit("htmlFlowData"), X(f)) : (e.consume(f), L);
  }
  function X(f) {
    return e.check(Bo, le, Ie)(f);
  }
  function le(f) {
    return e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), q;
  }
  function q(f) {
    return f === null || B(f) ? X(f) : (e.enter("htmlFlowData"), L(f));
  }
  function xe(f) {
    return f === 45 ? (e.consume(f), g) : L(f);
  }
  function me(f) {
    return f === 47 ? (e.consume(f), l = "", Te) : L(f);
  }
  function Te(f) {
    if (f === 62) {
      const ge = l.toLowerCase();
      return Kr.includes(ge) ? (e.consume(f), J) : L(f);
    }
    return ct(f) && l.length < 8 ? (e.consume(f), l += String.fromCharCode(f), Te) : L(f);
  }
  function $e(f) {
    return f === 93 ? (e.consume(f), g) : L(f);
  }
  function g(f) {
    return f === 62 ? (e.consume(f), J) : f === 45 && i === 2 ? (e.consume(f), g) : L(f);
  }
  function J(f) {
    return f === null || B(f) ? (e.exit("htmlFlowData"), Ie(f)) : (e.consume(f), J);
  }
  function Ie(f) {
    return e.exit("htmlFlow"), t(f);
  }
}
function jo(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return B(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), a) : n(l);
  }
  function a(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
function Wo(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(In, t, n);
  }
}
const $o = {
  name: "htmlText",
  tokenize: Zo
};
function Zo(e, t, n) {
  const r = this;
  let i, a, l;
  return o;
  function o(g) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), c;
  }
  function c(g) {
    return g === 33 ? (e.consume(g), h) : g === 47 ? (e.consume(g), Z) : g === 63 ? (e.consume(g), N) : ct(g) ? (e.consume(g), G) : n(g);
  }
  function h(g) {
    return g === 45 ? (e.consume(g), u) : g === 91 ? (e.consume(g), a = 0, x) : ct(g) ? (e.consume(g), z) : n(g);
  }
  function u(g) {
    return g === 45 ? (e.consume(g), p) : n(g);
  }
  function d(g) {
    return g === null ? n(g) : g === 45 ? (e.consume(g), C) : B(g) ? (l = d, me(g)) : (e.consume(g), d);
  }
  function C(g) {
    return g === 45 ? (e.consume(g), p) : d(g);
  }
  function p(g) {
    return g === 62 ? xe(g) : g === 45 ? C(g) : d(g);
  }
  function x(g) {
    const J = "CDATA[";
    return g === J.charCodeAt(a++) ? (e.consume(g), a === J.length ? y : x) : n(g);
  }
  function y(g) {
    return g === null ? n(g) : g === 93 ? (e.consume(g), R) : B(g) ? (l = y, me(g)) : (e.consume(g), y);
  }
  function R(g) {
    return g === 93 ? (e.consume(g), E) : y(g);
  }
  function E(g) {
    return g === 62 ? xe(g) : g === 93 ? (e.consume(g), E) : y(g);
  }
  function z(g) {
    return g === null || g === 62 ? xe(g) : B(g) ? (l = z, me(g)) : (e.consume(g), z);
  }
  function N(g) {
    return g === null ? n(g) : g === 63 ? (e.consume(g), P) : B(g) ? (l = N, me(g)) : (e.consume(g), N);
  }
  function P(g) {
    return g === 62 ? xe(g) : N(g);
  }
  function Z(g) {
    return ct(g) ? (e.consume(g), w) : n(g);
  }
  function w(g) {
    return g === 45 || Ye(g) ? (e.consume(g), w) : U(g);
  }
  function U(g) {
    return B(g) ? (l = U, me(g)) : re(g) ? (e.consume(g), U) : xe(g);
  }
  function G(g) {
    return g === 45 || Ye(g) ? (e.consume(g), G) : g === 47 || g === 62 || je(g) ? $(g) : n(g);
  }
  function $(g) {
    return g === 47 ? (e.consume(g), xe) : g === 58 || g === 95 || ct(g) ? (e.consume(g), O) : B(g) ? (l = $, me(g)) : re(g) ? (e.consume(g), $) : xe(g);
  }
  function O(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || Ye(g) ? (e.consume(g), O) : I(g);
  }
  function I(g) {
    return g === 61 ? (e.consume(g), L) : B(g) ? (l = I, me(g)) : re(g) ? (e.consume(g), I) : $(g);
  }
  function L(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), i = g, X) : B(g) ? (l = L, me(g)) : re(g) ? (e.consume(g), L) : (e.consume(g), le);
  }
  function X(g) {
    return g === i ? (e.consume(g), i = void 0, q) : g === null ? n(g) : B(g) ? (l = X, me(g)) : (e.consume(g), X);
  }
  function le(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? n(g) : g === 47 || g === 62 || je(g) ? $(g) : (e.consume(g), le);
  }
  function q(g) {
    return g === 47 || g === 62 || je(g) ? $(g) : n(g);
  }
  function xe(g) {
    return g === 62 ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(g);
  }
  function me(g) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), Te;
  }
  function Te(g) {
    return re(g) ? se(e, $e, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(g) : $e(g);
  }
  function $e(g) {
    return e.enter("htmlTextData"), l(g);
  }
}
const kr = {
  name: "labelEnd",
  resolveAll: Ko,
  resolveTo: Qo,
  tokenize: Jo
}, qo = {
  tokenize: es
}, Xo = {
  tokenize: ts
}, Yo = {
  tokenize: ns
};
function Ko(e) {
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
function Qo(e, t) {
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
  const c = {
    type: e[a][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[a][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, h = {
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
  return o = [["enter", c, t], ["enter", h, t]], o = nt(o, e.slice(a + 1, a + r + 3)), o = nt(o, [["enter", u, t]]), o = nt(o, Sr(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, l - 3), t)), o = nt(o, [["exit", u, t], e[l - 2], e[l - 1], ["exit", h, t]]), o = nt(o, e.slice(l + 1)), o = nt(o, [["exit", c, t]]), ut(e, a, e.length, o), e;
}
function Jo(e, t, n) {
  const r = this;
  let i = r.events.length, a, l;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return o;
  function o(C) {
    return a ? a._inactive ? d(C) : (l = r.parser.defined.includes(Bt(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(C), e.exit("labelMarker"), e.exit("labelEnd"), c) : n(C);
  }
  function c(C) {
    return C === 40 ? e.attempt(qo, u, l ? u : d)(C) : C === 91 ? e.attempt(Xo, u, l ? h : d)(C) : l ? u(C) : d(C);
  }
  function h(C) {
    return e.attempt(Yo, u, d)(C);
  }
  function u(C) {
    return t(C);
  }
  function d(C) {
    return a._balanced = !0, n(C);
  }
}
function es(e, t, n) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), i;
  }
  function i(d) {
    return je(d) ? rn(e, a)(d) : a(d);
  }
  function a(d) {
    return d === 41 ? u(d) : Qi(e, l, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function l(d) {
    return je(d) ? rn(e, c)(d) : u(d);
  }
  function o(d) {
    return n(d);
  }
  function c(d) {
    return d === 34 || d === 39 || d === 40 ? ea(e, h, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : u(d);
  }
  function h(d) {
    return je(d) ? rn(e, u)(d) : u(d);
  }
  function u(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), t) : n(d);
  }
}
function ts(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return Ji.call(r, e, a, l, "reference", "referenceMarker", "referenceString")(o);
  }
  function a(o) {
    return r.parser.defined.includes(Bt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(o) : n(o);
  }
  function l(o) {
    return n(o);
  }
}
function ns(e, t, n) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), i;
  }
  function i(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), t) : n(a);
  }
}
const rs = {
  name: "labelStartImage",
  resolveAll: kr.resolveAll,
  tokenize: is
};
function is(e, t, n) {
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
const as = {
  name: "labelStartLink",
  resolveAll: kr.resolveAll,
  tokenize: ls
};
function ls(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(l), e.exit("labelMarker"), e.exit("labelLink"), a;
  }
  function a(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : t(l);
  }
}
const zn = {
  name: "lineEnding",
  tokenize: os
};
function os(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), se(e, t, "linePrefix");
  }
}
const Cn = {
  name: "thematicBreak",
  tokenize: ss
};
function ss(e, t, n) {
  let r = 0, i;
  return a;
  function a(h) {
    return e.enter("thematicBreak"), l(h);
  }
  function l(h) {
    return i = h, o(h);
  }
  function o(h) {
    return h === i ? (e.enter("thematicBreakSequence"), c(h)) : r >= 3 && (h === null || B(h)) ? (e.exit("thematicBreak"), t(h)) : n(h);
  }
  function c(h) {
    return h === i ? (e.consume(h), r++, c) : (e.exit("thematicBreakSequence"), re(h) ? se(e, o, "whitespace")(h) : o(h));
  }
}
const Ve = {
  continuation: {
    tokenize: ps
  },
  exit: fs,
  name: "list",
  tokenize: hs
}, cs = {
  partial: !0,
  tokenize: ms
}, us = {
  partial: !0,
  tokenize: ds
};
function hs(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, l = 0;
  return o;
  function o(p) {
    const x = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (x === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : lr(p)) {
      if (r.containerState.type || (r.containerState.type = x, e.enter(x, {
        _container: !0
      })), x === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(Cn, n, h)(p) : h(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), c(p);
    }
    return n(p);
  }
  function c(p) {
    return lr(p) && ++l < 10 ? (e.consume(p), c) : (!r.interrupt || l < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), h(p)) : n(p);
  }
  function h(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      In,
      // Can’t be empty when interrupting.
      r.interrupt ? n : u,
      e.attempt(cs, C, d)
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
function ps(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(In, i, a);
  function i(o) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, se(e, t, "listItemIndent", r.containerState.size + 1)(o);
  }
  function a(o) {
    return r.containerState.furtherBlankLines || !re(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(us, t, l)(o));
  }
  function l(o) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, se(e, e.attempt(Ve, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
  }
}
function ds(e, t, n) {
  const r = this;
  return se(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function fs(e) {
  e.exit(this.containerState.type);
}
function ms(e, t, n) {
  const r = this;
  return se(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const l = r.events[r.events.length - 1];
    return !re(a) && l && l[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const Qr = {
  name: "setextUnderline",
  resolveTo: gs,
  tokenize: Cs
};
function gs(e, t) {
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
function Cs(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(h) {
    let u = r.events.length, d;
    for (; u--; )
      if (r.events[u][1].type !== "lineEnding" && r.events[u][1].type !== "linePrefix" && r.events[u][1].type !== "content") {
        d = r.events[u][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || d) ? (e.enter("setextHeadingLine"), i = h, l(h)) : n(h);
  }
  function l(h) {
    return e.enter("setextHeadingLineSequence"), o(h);
  }
  function o(h) {
    return h === i ? (e.consume(h), o) : (e.exit("setextHeadingLineSequence"), re(h) ? se(e, c, "lineSuffix")(h) : c(h));
  }
  function c(h) {
    return h === null || B(h) ? (e.exit("setextHeadingLine"), t(h)) : n(h);
  }
}
const ys = {
  tokenize: ws
};
function ws(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    In,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, se(e, e.attempt(this.parser.constructs.flow, i, e.attempt(ko, i)), "linePrefix"))
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
const _s = {
  resolveAll: na()
}, xs = ta("string"), Es = ta("text");
function ta(e) {
  return {
    resolveAll: na(e === "text" ? Ss : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], a = n.attempt(i, l, o);
    return l;
    function l(u) {
      return h(u) ? a(u) : o(u);
    }
    function o(u) {
      if (u === null) {
        n.consume(u);
        return;
      }
      return n.enter("data"), n.consume(u), c;
    }
    function c(u) {
      return h(u) ? (n.exit("data"), a(u)) : (n.consume(u), c);
    }
    function h(u) {
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
function na(e) {
  return t;
  function t(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === "data" && (a = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function Ss(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let a = i.length, l = -1, o = 0, c;
      for (; a--; ) {
        const h = i[a];
        if (typeof h == "string") {
          for (l = h.length; h.charCodeAt(l - 1) === 32; )
            o++, l--;
          if (l) break;
          l = -1;
        } else if (h === -2)
          c = !0, o++;
        else if (h !== -1) {
          a++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (o = 0), o) {
        const h = {
          type: n === e.length || c || o < 2 ? "lineSuffix" : "hardBreakTrailing",
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
          ...h.start
        }, r.start.offset === r.end.offset ? Object.assign(r, h) : (e.splice(n, 0, ["enter", h, t], ["exit", h, t]), n += 2);
      }
      n++;
    }
  return e;
}
const ks = {
  42: Ve,
  43: Ve,
  45: Ve,
  48: Ve,
  49: Ve,
  50: Ve,
  51: Ve,
  52: Ve,
  53: Ve,
  54: Ve,
  55: Ve,
  56: Ve,
  57: Ve,
  62: qi
}, Ts = {
  91: Io
}, bs = {
  [-2]: Fn,
  [-1]: Fn,
  32: Fn
}, As = {
  35: Do,
  42: Cn,
  45: [Qr, Cn],
  60: Fo,
  61: Qr,
  95: Cn,
  96: Yr,
  126: Yr
}, vs = {
  38: Yi,
  92: Xi
}, Is = {
  [-5]: zn,
  [-4]: zn,
  [-3]: zn,
  33: rs,
  38: Yi,
  42: or,
  60: [io, $o],
  91: as,
  92: [Mo, Xi],
  93: kr,
  95: or,
  96: yo
}, Rs = {
  null: [or, _s]
}, Ns = {
  null: [42, 95]
}, Ls = {
  null: []
}, Ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Ns,
  contentInitial: Ts,
  disable: Ls,
  document: ks,
  flow: As,
  flowInitial: bs,
  insideSpan: Rs,
  string: vs,
  text: Is
}, Symbol.toStringTag, { value: "Module" }));
function Os(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, a = [];
  let l = [], o = [];
  const c = {
    attempt: U(Z),
    check: U(w),
    consume: z,
    enter: N,
    exit: P,
    interrupt: U(w, {
      interrupt: !0
    })
  }, h = {
    code: null,
    containerState: {},
    defineSkip: y,
    events: [],
    now: x,
    parser: e,
    previous: null,
    sliceSerialize: C,
    sliceStream: p,
    write: d
  };
  let u = t.tokenize.call(h, c);
  return t.resolveAll && a.push(t), h;
  function d(I) {
    return l = nt(l, I), R(), l[l.length - 1] !== null ? [] : (G(t, 0), h.events = Sr(a, h.events, h), h.events);
  }
  function C(I, L) {
    return Ps(p(I), L);
  }
  function p(I) {
    return Ds(l, I);
  }
  function x() {
    const {
      _bufferIndex: I,
      _index: L,
      line: X,
      column: le,
      offset: q
    } = r;
    return {
      _bufferIndex: I,
      _index: L,
      line: X,
      column: le,
      offset: q
    };
  }
  function y(I) {
    i[I.line] = I.column, O();
  }
  function R() {
    let I;
    for (; r._index < l.length; ) {
      const L = l[r._index];
      if (typeof L == "string")
        for (I = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === I && r._bufferIndex < L.length; )
          E(L.charCodeAt(r._bufferIndex));
      else
        E(L);
    }
  }
  function E(I) {
    u = u(I);
  }
  function z(I) {
    B(I) ? (r.line++, r.column = 1, r.offset += I === -3 ? 2 : 1, O()) : I !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[r._index].length && (r._bufferIndex = -1, r._index++)), h.previous = I;
  }
  function N(I, L) {
    const X = L || {};
    return X.type = I, X.start = x(), h.events.push(["enter", X, h]), o.push(X), X;
  }
  function P(I) {
    const L = o.pop();
    return L.end = x(), h.events.push(["exit", L, h]), L;
  }
  function Z(I, L) {
    G(I, L.from);
  }
  function w(I, L) {
    L.restore();
  }
  function U(I, L) {
    return X;
    function X(le, q, xe) {
      let me, Te, $e, g;
      return Array.isArray(le) ? (
        /* c8 ignore next 1 */
        Ie(le)
      ) : "tokenize" in le ? (
        // Looks like a construct.
        Ie([
          /** @type {Construct} */
          le
        ])
      ) : J(le);
      function J(ae) {
        return Fe;
        function Fe(Ee) {
          const Ke = Ee !== null && ae[Ee], Qe = Ee !== null && ae.null, ht = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ke) ? Ke : Ke ? [Ke] : [],
            ...Array.isArray(Qe) ? Qe : Qe ? [Qe] : []
          ];
          return Ie(ht)(Ee);
        }
      }
      function Ie(ae) {
        return me = ae, Te = 0, ae.length === 0 ? xe : f(ae[Te]);
      }
      function f(ae) {
        return Fe;
        function Fe(Ee) {
          return g = $(), $e = ae, ae.partial || (h.currentConstruct = ae), ae.name && h.parser.constructs.disable.null.includes(ae.name) ? te() : ae.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            L ? Object.assign(Object.create(h), L) : h,
            c,
            ge,
            te
          )(Ee);
        }
      }
      function ge(ae) {
        return I($e, g), q;
      }
      function te(ae) {
        return g.restore(), ++Te < me.length ? f(me[Te]) : xe;
      }
    }
  }
  function G(I, L) {
    I.resolveAll && !a.includes(I) && a.push(I), I.resolve && ut(h.events, L, h.events.length - L, I.resolve(h.events.slice(L), h)), I.resolveTo && (h.events = I.resolveTo(h.events, h));
  }
  function $() {
    const I = x(), L = h.previous, X = h.currentConstruct, le = h.events.length, q = Array.from(o);
    return {
      from: le,
      restore: xe
    };
    function xe() {
      r = I, h.previous = L, h.currentConstruct = X, h.events.length = le, o = q, O();
    }
  }
  function O() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Ds(e, t) {
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
function Ps(e, t) {
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
function Hs(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Gl([Ms, ...(e || {}).extensions || []])
    ),
    content: i(Kl),
    defined: [],
    document: i(Jl),
    flow: i(ys),
    lazy: {},
    string: i(xs),
    text: i(Es)
  };
  return r;
  function i(a) {
    return l;
    function l(o) {
      return Os(r, a, o);
    }
  }
}
function Us(e) {
  for (; !Ki(e); )
    ;
  return e;
}
const Jr = /[\0\t\n\r]/g;
function Fs() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, l, o) {
    const c = [];
    let h, u, d, C, p;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(l || void 0).decode(a)), d = 0, t = "", n && (a.charCodeAt(0) === 65279 && d++, n = void 0); d < a.length; ) {
      if (Jr.lastIndex = d, h = Jr.exec(a), C = h && h.index !== void 0 ? h.index : a.length, p = a.charCodeAt(C), !h) {
        t = a.slice(d);
        break;
      }
      if (p === 10 && d === C && r)
        c.push(-3), r = void 0;
      else
        switch (r && (c.push(-5), r = void 0), d < C && (c.push(a.slice(d, C)), e += C - d), p) {
          case 0: {
            c.push(65533), e++;
            break;
          }
          case 9: {
            for (u = Math.ceil(e / 4) * 4, c.push(-2); e++ < u; ) c.push(-1);
            break;
          }
          case 10: {
            c.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      d = C + 1;
    }
    return o && (r && c.push(-5), t && c.push(t), c.push(null)), c;
  }
}
const zs = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Bs(e) {
  return e.replace(zs, Vs);
}
function Vs(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return Zi(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return Er(n) || e;
}
const ra = {}.hasOwnProperty;
function Gs(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), js(n)(Us(Hs(n).document().write(Fs()(e, t, !0))));
}
function js(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(et),
      autolinkProtocol: $,
      autolinkEmail: $,
      atxHeading: a(Oe),
      blockQuote: a(Qe),
      characterEscape: $,
      characterReference: $,
      codeFenced: a(ht),
      codeFencedFenceInfo: l,
      codeFencedFenceMeta: l,
      codeIndented: a(ht, l),
      codeText: a(Mt, l),
      codeTextData: $,
      data: $,
      codeFlowValue: $,
      definition: a(Je),
      definitionDestinationString: l,
      definitionLabelString: l,
      definitionTitleString: l,
      emphasis: a(pt),
      hardBreakEscape: a(Re),
      hardBreakTrailing: a(Re),
      htmlFlow: a(_t, l),
      htmlFlowData: $,
      htmlText: a(_t, l),
      htmlTextData: $,
      image: a(Ne),
      label: l,
      link: a(et),
      listItem: a(Ot),
      listItemValue: C,
      listOrdered: a(Le, d),
      listUnordered: a(Le),
      paragraph: a(Dt),
      reference: f,
      referenceString: l,
      resourceDestinationString: l,
      resourceTitleString: l,
      setextHeading: a(Oe),
      strong: a(Wt),
      thematicBreak: a(dt)
    },
    exit: {
      atxHeading: c(),
      atxHeadingSequence: Z,
      autolink: c(),
      autolinkEmail: Ke,
      autolinkProtocol: Ee,
      blockQuote: c(),
      characterEscapeValue: O,
      characterReferenceMarkerHexadecimal: te,
      characterReferenceMarkerNumeric: te,
      characterReferenceValue: ae,
      characterReference: Fe,
      codeFenced: c(R),
      codeFencedFence: y,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: x,
      codeFlowValue: O,
      codeIndented: c(E),
      codeText: c(q),
      codeTextData: O,
      data: O,
      definition: c(),
      definitionDestinationString: P,
      definitionLabelString: z,
      definitionTitleString: N,
      emphasis: c(),
      hardBreakEscape: c(L),
      hardBreakTrailing: c(L),
      htmlFlow: c(X),
      htmlFlowData: O,
      htmlText: c(le),
      htmlTextData: O,
      image: c(me),
      label: $e,
      labelText: Te,
      lineEnding: I,
      link: c(xe),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: ge,
      resourceDestinationString: g,
      resourceTitleString: J,
      resource: Ie,
      setextHeading: c(G),
      setextHeadingLineSequence: U,
      setextHeadingText: w,
      strong: c(),
      thematicBreak: c()
    }
  };
  ia(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(_) {
    let k = {
      type: "root",
      children: []
    };
    const H = {
      stack: [k],
      tokenStack: [],
      config: t,
      enter: o,
      exit: h,
      buffer: l,
      resume: u,
      data: n
    }, j = [];
    let ee = -1;
    for (; ++ee < _.length; )
      if (_[ee][1].type === "listOrdered" || _[ee][1].type === "listUnordered")
        if (_[ee][0] === "enter")
          j.push(ee);
        else {
          const Se = j.pop();
          ee = i(_, Se, ee);
        }
    for (ee = -1; ++ee < _.length; ) {
      const Se = t[_[ee][0]];
      ra.call(Se, _[ee][1].type) && Se[_[ee][1].type].call(Object.assign({
        sliceSerialize: _[ee][2].sliceSerialize
      }, H), _[ee][1]);
    }
    if (H.tokenStack.length > 0) {
      const Se = H.tokenStack[H.tokenStack.length - 1];
      (Se[1] || ei).call(H, void 0, Se[0]);
    }
    for (k.position = {
      start: kt(_.length > 0 ? _[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: kt(_.length > 0 ? _[_.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, ee = -1; ++ee < t.transforms.length; )
      k = t.transforms[ee](k) || k;
    return k;
  }
  function i(_, k, H) {
    let j = k - 1, ee = -1, Se = !1, Ze, be, Ae, Ce;
    for (; ++j <= H; ) {
      const pe = _[j];
      switch (pe[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          pe[0] === "enter" ? ee++ : ee--, Ce = void 0;
          break;
        }
        case "lineEndingBlank": {
          pe[0] === "enter" && (Ze && !Ce && !ee && !Ae && (Ae = j), Ce = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Ce = void 0;
      }
      if (!ee && pe[0] === "enter" && pe[1].type === "listItemPrefix" || ee === -1 && pe[0] === "exit" && (pe[1].type === "listUnordered" || pe[1].type === "listOrdered")) {
        if (Ze) {
          let tt = j;
          for (be = void 0; tt--; ) {
            const De = _[tt];
            if (De[1].type === "lineEnding" || De[1].type === "lineEndingBlank") {
              if (De[0] === "exit") continue;
              be && (_[be][1].type = "lineEndingBlank", Se = !0), De[1].type = "lineEnding", be = tt;
            } else if (!(De[1].type === "linePrefix" || De[1].type === "blockQuotePrefix" || De[1].type === "blockQuotePrefixWhitespace" || De[1].type === "blockQuoteMarker" || De[1].type === "listItemIndent")) break;
          }
          Ae && (!be || Ae < be) && (Ze._spread = !0), Ze.end = Object.assign({}, be ? _[be][1].start : pe[1].end), _.splice(be || j, 0, ["exit", Ze, pe[2]]), j++, H++;
        }
        if (pe[1].type === "listItemPrefix") {
          const tt = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, pe[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ze = tt, _.splice(j, 0, ["enter", tt, pe[2]]), j++, H++, Ae = void 0, Ce = !0;
        }
      }
    }
    return _[k][1]._spread = Se, H;
  }
  function a(_, k) {
    return H;
    function H(j) {
      o.call(this, _(j), j), k && k.call(this, j);
    }
  }
  function l() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function o(_, k, H) {
    this.stack[this.stack.length - 1].children.push(_), this.stack.push(_), this.tokenStack.push([k, H || void 0]), _.position = {
      start: kt(k.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function c(_) {
    return k;
    function k(H) {
      _ && _.call(this, H), h.call(this, H);
    }
  }
  function h(_, k) {
    const H = this.stack.pop(), j = this.tokenStack.pop();
    if (j)
      j[0].type !== _.type && (k ? k.call(this, _, j[0]) : (j[1] || ei).call(this, _, j[0]));
    else throw new Error("Cannot close `" + _.type + "` (" + nn({
      start: _.start,
      end: _.end
    }) + "): it’s not open");
    H.position.end = kt(_.end);
  }
  function u() {
    return Bl(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function C(_) {
    if (this.data.expectingFirstListItemValue) {
      const k = this.stack[this.stack.length - 2];
      k.start = Number.parseInt(this.sliceSerialize(_), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const _ = this.resume(), k = this.stack[this.stack.length - 1];
    k.lang = _;
  }
  function x() {
    const _ = this.resume(), k = this.stack[this.stack.length - 1];
    k.meta = _;
  }
  function y() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function R() {
    const _ = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = _.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function E() {
    const _ = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = _.replace(/(\r?\n|\r)$/g, "");
  }
  function z(_) {
    const k = this.resume(), H = this.stack[this.stack.length - 1];
    H.label = k, H.identifier = Bt(this.sliceSerialize(_)).toLowerCase();
  }
  function N() {
    const _ = this.resume(), k = this.stack[this.stack.length - 1];
    k.title = _;
  }
  function P() {
    const _ = this.resume(), k = this.stack[this.stack.length - 1];
    k.url = _;
  }
  function Z(_) {
    const k = this.stack[this.stack.length - 1];
    if (!k.depth) {
      const H = this.sliceSerialize(_).length;
      k.depth = H;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function U(_) {
    const k = this.stack[this.stack.length - 1];
    k.depth = this.sliceSerialize(_).codePointAt(0) === 61 ? 1 : 2;
  }
  function G() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function $(_) {
    const H = this.stack[this.stack.length - 1].children;
    let j = H[H.length - 1];
    (!j || j.type !== "text") && (j = vt(), j.position = {
      start: kt(_.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, H.push(j)), this.stack.push(j);
  }
  function O(_) {
    const k = this.stack.pop();
    k.value += this.sliceSerialize(_), k.position.end = kt(_.end);
  }
  function I(_) {
    const k = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const H = k.children[k.children.length - 1];
      H.position.end = kt(_.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(k.type) && ($.call(this, _), O.call(this, _));
  }
  function L() {
    this.data.atHardBreak = !0;
  }
  function X() {
    const _ = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = _;
  }
  function le() {
    const _ = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = _;
  }
  function q() {
    const _ = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = _;
  }
  function xe() {
    const _ = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const k = this.data.referenceType || "shortcut";
      _.type += "Reference", _.referenceType = k, delete _.url, delete _.title;
    } else
      delete _.identifier, delete _.label;
    this.data.referenceType = void 0;
  }
  function me() {
    const _ = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const k = this.data.referenceType || "shortcut";
      _.type += "Reference", _.referenceType = k, delete _.url, delete _.title;
    } else
      delete _.identifier, delete _.label;
    this.data.referenceType = void 0;
  }
  function Te(_) {
    const k = this.sliceSerialize(_), H = this.stack[this.stack.length - 2];
    H.label = Bs(k), H.identifier = Bt(k).toLowerCase();
  }
  function $e() {
    const _ = this.stack[this.stack.length - 1], k = this.resume(), H = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, H.type === "link") {
      const j = _.children;
      H.children = j;
    } else
      H.alt = k;
  }
  function g() {
    const _ = this.resume(), k = this.stack[this.stack.length - 1];
    k.url = _;
  }
  function J() {
    const _ = this.resume(), k = this.stack[this.stack.length - 1];
    k.title = _;
  }
  function Ie() {
    this.data.inReference = void 0;
  }
  function f() {
    this.data.referenceType = "collapsed";
  }
  function ge(_) {
    const k = this.resume(), H = this.stack[this.stack.length - 1];
    H.label = k, H.identifier = Bt(this.sliceSerialize(_)).toLowerCase(), this.data.referenceType = "full";
  }
  function te(_) {
    this.data.characterReferenceType = _.type;
  }
  function ae(_) {
    const k = this.sliceSerialize(_), H = this.data.characterReferenceType;
    let j;
    H ? (j = Zi(k, H === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : j = Er(k);
    const ee = this.stack[this.stack.length - 1];
    ee.value += j;
  }
  function Fe(_) {
    const k = this.stack.pop();
    k.position.end = kt(_.end);
  }
  function Ee(_) {
    O.call(this, _);
    const k = this.stack[this.stack.length - 1];
    k.url = this.sliceSerialize(_);
  }
  function Ke(_) {
    O.call(this, _);
    const k = this.stack[this.stack.length - 1];
    k.url = "mailto:" + this.sliceSerialize(_);
  }
  function Qe() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function ht() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Mt() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Je() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function pt() {
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
  function Re() {
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
  function Ne() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function et() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Le(_) {
    return {
      type: "list",
      ordered: _.type === "listOrdered",
      start: null,
      spread: _._spread,
      children: []
    };
  }
  function Ot(_) {
    return {
      type: "listItem",
      spread: _._spread,
      checked: null,
      children: []
    };
  }
  function Dt() {
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
  function vt() {
    return {
      type: "text",
      value: ""
    };
  }
  function dt() {
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
function ia(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? ia(e, r) : Ws(e, r);
  }
}
function Ws(e, t) {
  let n;
  for (n in t)
    if (ra.call(t, n))
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
function ei(e, t) {
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
function $s(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return Gs(r, {
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
function Zs(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function qs(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function Xs(e, t) {
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
function Ys(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Ks(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Qs(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = jt(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
  let l, o = e.footnoteCounts.get(r);
  o === void 0 ? (o = 0, e.footnoteOrder.push(r), l = e.footnoteOrder.length) : l = a + 1, o += 1, e.footnoteCounts.set(r, o);
  const c = {
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
  e.patch(t, c);
  const h = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [c]
  };
  return e.patch(t, h), e.applyData(t, h);
}
function Js(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function e1(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function aa(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const l = i[i.length - 1];
  return l && l.type === "text" ? l.value += r : i.push({ type: "text", value: r }), i;
}
function t1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return aa(e, t);
  const i = { src: jt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function n1(e, t) {
  const n = { src: jt(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function r1(e, t) {
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
function i1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return aa(e, t);
  const i = { href: jt(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function a1(e, t) {
  const n = { href: jt(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function l1(e, t, n) {
  const r = e.all(t), i = n ? o1(n) : la(t), a = {}, l = [];
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
  const c = r[r.length - 1];
  c && (i || c.type !== "element" || c.tagName !== "p") && l.push({ type: "text", value: `
` });
  const h = { type: "element", tagName: "li", properties: a, children: l };
  return e.patch(t, h), e.applyData(t, h);
}
function o1(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = la(n[r]);
  }
  return t;
}
function la(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function s1(e, t) {
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
function c1(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function u1(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function h1(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function p1(e, t) {
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
    }, o = yr(t.children[1]), c = zi(t.children[t.children.length - 1]);
    o && c && (l.position = { start: o, end: c }), i.push(l);
  }
  const a = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function d1(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", l = n && n.type === "table" ? n.align : void 0, o = l ? l.length : t.children.length;
  let c = -1;
  const h = [];
  for (; ++c < o; ) {
    const d = t.children[c], C = {}, p = l ? l[c] : void 0;
    p && (C.align = p);
    let x = { type: "element", tagName: a, properties: C, children: [] };
    d && (x.children = e.all(d), e.patch(d, x), x = e.applyData(d, x)), h.push(x);
  }
  const u = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(h, !0)
  };
  return e.patch(t, u), e.applyData(t, u);
}
function f1(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const ti = 9, ni = 32;
function m1(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const a = [];
  for (; r; )
    a.push(
      ri(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return a.push(ri(t.slice(i), i > 0, !1)), a.join("");
}
function ri(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let a = e.codePointAt(r);
    for (; a === ti || a === ni; )
      r++, a = e.codePointAt(r);
  }
  if (n) {
    let a = e.codePointAt(i - 1);
    for (; a === ti || a === ni; )
      i--, a = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function g1(e, t) {
  const n = { type: "text", value: m1(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function C1(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const y1 = {
  blockquote: Zs,
  break: qs,
  code: Xs,
  delete: Ys,
  emphasis: Ks,
  footnoteReference: Qs,
  heading: Js,
  html: e1,
  imageReference: t1,
  image: n1,
  inlineCode: r1,
  linkReference: i1,
  link: a1,
  listItem: l1,
  list: s1,
  paragraph: c1,
  // @ts-expect-error: root is different, but hard to type.
  root: u1,
  strong: h1,
  table: p1,
  tableCell: f1,
  tableRow: d1,
  text: g1,
  thematicBreak: C1,
  toml: pn,
  yaml: pn,
  definition: pn,
  footnoteDefinition: pn
};
function pn() {
}
const oa = -1, Rn = 0, an = 1, kn = 2, Tr = 3, br = 4, Ar = 5, vr = 6, sa = 7, ca = 8, ii = typeof self == "object" ? self : globalThis, w1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, l] = t[i];
    switch (a) {
      case Rn:
      case oa:
        return n(l, i);
      case an: {
        const o = n([], i);
        for (const c of l)
          o.push(r(c));
        return o;
      }
      case kn: {
        const o = n({}, i);
        for (const [c, h] of l)
          o[r(c)] = r(h);
        return o;
      }
      case Tr:
        return n(new Date(l), i);
      case br: {
        const { source: o, flags: c } = l;
        return n(new RegExp(o, c), i);
      }
      case Ar: {
        const o = n(/* @__PURE__ */ new Map(), i);
        for (const [c, h] of l)
          o.set(r(c), r(h));
        return o;
      }
      case vr: {
        const o = n(/* @__PURE__ */ new Set(), i);
        for (const c of l)
          o.add(r(c));
        return o;
      }
      case sa: {
        const { name: o, message: c } = l;
        return n(new ii[o](c), i);
      }
      case ca:
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
    return n(new ii[a](l), i);
  };
  return r;
}, ai = (e) => w1(/* @__PURE__ */ new Map(), e)(0), Ut = "", { toString: _1 } = {}, { keys: x1 } = Object, Yt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Rn, t];
  const n = _1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [an, Ut];
    case "Object":
      return [kn, Ut];
    case "Date":
      return [Tr, Ut];
    case "RegExp":
      return [br, Ut];
    case "Map":
      return [Ar, Ut];
    case "Set":
      return [vr, Ut];
    case "DataView":
      return [an, n];
  }
  return n.includes("Array") ? [an, n] : n.includes("Error") ? [sa, n] : [kn, n];
}, dn = ([e, t]) => e === Rn && (t === "function" || t === "symbol"), E1 = (e, t, n, r) => {
  const i = (l, o) => {
    const c = r.push(l) - 1;
    return n.set(o, c), c;
  }, a = (l) => {
    if (n.has(l))
      return n.get(l);
    let [o, c] = Yt(l);
    switch (o) {
      case Rn: {
        let u = l;
        switch (c) {
          case "bigint":
            o = ca, u = l.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + c);
            u = null;
            break;
          case "undefined":
            return i([oa], l);
        }
        return i([o, u], l);
      }
      case an: {
        if (c) {
          let C = l;
          return c === "DataView" ? C = new Uint8Array(l.buffer) : c === "ArrayBuffer" && (C = new Uint8Array(l)), i([c, [...C]], l);
        }
        const u = [], d = i([o, u], l);
        for (const C of l)
          u.push(a(C));
        return d;
      }
      case kn: {
        if (c)
          switch (c) {
            case "BigInt":
              return i([c, l.toString()], l);
            case "Boolean":
            case "Number":
            case "String":
              return i([c, l.valueOf()], l);
          }
        if (t && "toJSON" in l)
          return a(l.toJSON());
        const u = [], d = i([o, u], l);
        for (const C of x1(l))
          (e || !dn(Yt(l[C]))) && u.push([a(C), a(l[C])]);
        return d;
      }
      case Tr:
        return i([o, l.toISOString()], l);
      case br: {
        const { source: u, flags: d } = l;
        return i([o, { source: u, flags: d }], l);
      }
      case Ar: {
        const u = [], d = i([o, u], l);
        for (const [C, p] of l)
          (e || !(dn(Yt(C)) || dn(Yt(p)))) && u.push([a(C), a(p)]);
        return d;
      }
      case vr: {
        const u = [], d = i([o, u], l);
        for (const C of l)
          (e || !dn(Yt(C))) && u.push(a(C));
        return d;
      }
    }
    const { message: h } = l;
    return i([o, { name: c, message: h }], l);
  };
  return a;
}, li = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return E1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, Tn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? ai(li(e, t)) : structuredClone(e)
) : (e, t) => ai(li(e, t));
function S1(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function k1(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function T1(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || S1, r = e.options.footnoteBackLabel || k1, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", l = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let c = -1;
  for (; ++c < e.footnoteOrder.length; ) {
    const h = e.footnoteById.get(
      e.footnoteOrder[c]
    );
    if (!h)
      continue;
    const u = e.all(h), d = String(h.identifier).toUpperCase(), C = jt(d.toLowerCase());
    let p = 0;
    const x = [], y = e.footnoteCounts.get(d);
    for (; y !== void 0 && ++p <= y; ) {
      x.length > 0 && x.push({ type: "text", value: " " });
      let z = typeof n == "string" ? n : n(c, p);
      typeof z == "string" && (z = { type: "text", value: z }), x.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + C + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(c, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(z) ? z : [z]
      });
    }
    const R = u[u.length - 1];
    if (R && R.type === "element" && R.tagName === "p") {
      const z = R.children[R.children.length - 1];
      z && z.type === "text" ? z.value += " " : R.children.push({ type: "text", value: " " }), R.children.push(...x);
    } else
      u.push(...x);
    const E = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + C },
      children: e.wrap(u, !0)
    };
    e.patch(h, E), o.push(E);
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
            ...Tn(l),
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
const ua = (
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
      return I1;
    if (typeof e == "function")
      return Nn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? b1(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        A1(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return v1(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function b1(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = ua(e[n]);
  return Nn(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function A1(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Nn(n);
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
function v1(e) {
  return Nn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Nn(e) {
  return t;
  function t(n, r, i) {
    return !!(R1(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function I1() {
  return !0;
}
function R1(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const ha = [], N1 = !0, oi = !1, L1 = "skip";
function M1(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = ua(i), l = r ? -1 : 1;
  o(e, void 0, [])();
  function o(c, h, u) {
    const d = (
      /** @type {Record<string, unknown>} */
      c && typeof c == "object" ? c : {}
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
        value: "node (" + (c.type + (p ? "<" + p + ">" : "")) + ")"
      });
    }
    return C;
    function C() {
      let p = ha, x, y, R;
      if ((!t || a(c, h, u[u.length - 1] || void 0)) && (p = O1(n(c, u)), p[0] === oi))
        return p;
      if ("children" in c && c.children) {
        const E = (
          /** @type {UnistParent} */
          c
        );
        if (E.children && p[0] !== L1)
          for (y = (r ? E.children.length : -1) + l, R = u.concat(E); y > -1 && y < E.children.length; ) {
            const z = E.children[y];
            if (x = o(z, y, R)(), x[0] === oi)
              return x;
            y = typeof x[1] == "number" ? x[1] : y + l;
          }
      }
      return p;
    }
  }
}
function O1(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [N1, e] : e == null ? ha : [e];
}
function pa(e, t, n, r) {
  let i, a, l;
  typeof t == "function" && typeof n != "function" ? (a = void 0, l = t, i = n) : (a = t, l = n, i = r), M1(e, a, o, i);
  function o(c, h) {
    const u = h[h.length - 1], d = u ? u.children.indexOf(c) : void 0;
    return l(c, d, u);
  }
}
const sr = {}.hasOwnProperty, D1 = {};
function P1(e, t) {
  const n = t || D1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = { ...y1, ...n.handlers }, o = {
    all: h,
    applyData: U1,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: l,
    one: c,
    options: n,
    patch: H1,
    wrap: z1
  };
  return pa(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const d = u.type === "definition" ? r : i, C = String(u.identifier).toUpperCase();
      d.has(C) || d.set(C, u);
    }
  }), o;
  function c(u, d) {
    const C = u.type, p = o.handlers[C];
    if (sr.call(o.handlers, C) && p)
      return p(o, u, d);
    if (o.options.passThrough && o.options.passThrough.includes(C)) {
      if ("children" in u) {
        const { children: y, ...R } = u, E = Tn(R);
        return E.children = o.all(u), E;
      }
      return Tn(u);
    }
    return (o.options.unknownHandler || F1)(o, u, d);
  }
  function h(u) {
    const d = [];
    if ("children" in u) {
      const C = u.children;
      let p = -1;
      for (; ++p < C.length; ) {
        const x = o.one(C[p], u);
        if (x) {
          if (p && C[p - 1].type === "break" && (!Array.isArray(x) && x.type === "text" && (x.value = si(x.value)), !Array.isArray(x) && x.type === "element")) {
            const y = x.children[0];
            y && y.type === "text" && (y.value = si(y.value));
          }
          Array.isArray(x) ? d.push(...x) : d.push(x);
        }
      }
    }
    return d;
  }
}
function H1(e, t) {
  e.position && (t.position = wl(e));
}
function U1(e, t) {
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
    n.type === "element" && a && Object.assign(n.properties, Tn(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function F1(e, t) {
  const n = t.data || {}, r = "value" in t && !(sr.call(n, "hProperties") || sr.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function z1(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function si(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function ci(e, t) {
  const n = P1(e, t), r = n.one(e, void 0), i = T1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function B1(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      ci(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      ci(n, { file: r, ...e || t })
    );
  };
}
function ui(e) {
  if (e)
    throw e;
}
var yn = Object.prototype.hasOwnProperty, da = Object.prototype.toString, hi = Object.defineProperty, pi = Object.getOwnPropertyDescriptor, di = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : da.call(t) === "[object Array]";
}, fi = function(t) {
  if (!t || da.call(t) !== "[object Object]")
    return !1;
  var n = yn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && yn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || yn.call(t, i);
}, mi = function(t, n) {
  hi && n.name === "__proto__" ? hi(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, gi = function(t, n) {
  if (n === "__proto__")
    if (yn.call(t, n)) {
      if (pi)
        return pi(t, n).value;
    } else return;
  return t[n];
}, V1 = function e() {
  var t, n, r, i, a, l, o = arguments[0], c = 1, h = arguments.length, u = !1;
  for (typeof o == "boolean" && (u = o, o = arguments[1] || {}, c = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); c < h; ++c)
    if (t = arguments[c], t != null)
      for (n in t)
        r = gi(o, n), i = gi(t, n), o !== i && (u && i && (fi(i) || (a = di(i))) ? (a ? (a = !1, l = r && di(r) ? r : []) : l = r && fi(r) ? r : {}, mi(o, { name: n, newValue: e(u, l, i) })) : typeof i < "u" && mi(o, { name: n, newValue: i }));
  return o;
};
const Bn = /* @__PURE__ */ Fi(V1);
function cr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function G1() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let a = -1;
    const l = i.pop();
    if (typeof l != "function")
      throw new TypeError("Expected function as last argument, not " + l);
    o(null, ...i);
    function o(c, ...h) {
      const u = e[++a];
      let d = -1;
      if (c) {
        l(c);
        return;
      }
      for (; ++d < i.length; )
        (h[d] === null || h[d] === void 0) && (h[d] = i[d]);
      i = h, u ? j1(u, o)(...h) : l(null, ...h);
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
function j1(e, t) {
  let n;
  return r;
  function r(...l) {
    const o = e.length > l.length;
    let c;
    o && l.push(i);
    try {
      c = e.apply(this, l);
    } catch (h) {
      const u = (
        /** @type {Error} */
        h
      );
      if (o && n)
        throw u;
      return i(u);
    }
    o || (c && c.then && typeof c.then == "function" ? c.then(a, i) : c instanceof Error ? i(c) : a(c));
  }
  function i(l, ...o) {
    n || (n = !0, t(l, ...o));
  }
  function a(l) {
    i(null, l);
  }
}
const ot = { basename: W1, dirname: $1, extname: Z1, join: q1, sep: "/" };
function W1(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  sn(e);
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
function $1(e) {
  if (sn(e), e.length === 0)
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
function Z1(e) {
  sn(e);
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
function q1(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    sn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : X1(n);
}
function X1(e) {
  sn(e);
  const t = e.codePointAt(0) === 47;
  let n = Y1(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function Y1(e, t) {
  let n = "", r = 0, i = -1, a = 0, l = -1, o, c;
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
            if (c = n.lastIndexOf("/"), c !== n.length - 1) {
              c < 0 ? (n = "", r = 0) : (n = n.slice(0, c), r = n.length - 1 - n.lastIndexOf("/")), i = l, a = 0;
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
function sn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const K1 = { cwd: Q1 };
function Q1() {
  return "/";
}
function ur(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function J1(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!ur(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return ec(e);
}
function ec(e) {
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
const Vn = (
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
class fa {
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
    t ? ur(t) ? n = { path: t } : typeof t == "string" || tc(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : K1.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Vn.length; ) {
      const a = Vn[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      Vn.includes(i) || (this[i] = n[i]);
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
    jn(t, "basename"), Gn(t, "basename"), this.path = ot.join(this.dirname || "", t);
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
    Ci(this.basename, "dirname"), this.path = ot.join(t || "", this.basename);
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
    if (Gn(t, "extname"), Ci(this.dirname, "extname"), t) {
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
    ur(t) && (t = J1(t)), jn(t, "path"), this.path !== t && this.history.push(t);
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
    jn(t, "stem"), Gn(t, "stem"), this.path = ot.join(this.dirname || "", t + (this.extname || ""));
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
function Gn(e, t) {
  if (e && e.includes(ot.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ot.sep + "`"
    );
}
function jn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function Ci(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function tc(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const nc = (
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
), rc = {}.hasOwnProperty;
class Ir extends nc {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = G1();
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
    return t.data(Bn(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (Zn("data", this.frozen), this.namespace[t] = n, this) : rc.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Zn("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = fn(t), r = this.parser || this.Parser;
    return Wn("parse", r), r(String(n), n);
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
    return this.freeze(), Wn("process", this.parser || this.Parser), $n("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, l) {
      const o = fn(t), c = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(o)
      );
      r.run(c, o, function(u, d, C) {
        if (u || !d || !C)
          return h(u);
        const p = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          d
        ), x = r.stringify(p, C);
        lc(x) ? C.value = x : C.result = x, h(
          u,
          /** @type {VFileWithOutput<CompileResult>} */
          C
        );
      });
      function h(u, d) {
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
    return this.freeze(), Wn("processSync", this.parser || this.Parser), $n("processSync", this.compiler || this.Compiler), this.process(t, i), wi("processSync", "process", n), r;
    function i(a, l) {
      n = !0, ui(a), r = l;
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
    yi(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(l, o) {
      const c = fn(n);
      i.run(t, c, h);
      function h(u, d, C) {
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
    return this.run(t, n, a), wi("runSync", "run", r), i;
    function a(l, o) {
      ui(l), i = o, r = !0;
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
    const r = fn(n), i = this.compiler || this.Compiler;
    return $n("stringify", i), yi(t), i(t, r);
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
    if (Zn("use", this.frozen), t != null) if (typeof t == "function")
      c(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? o(t) : l(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function a(h) {
      if (typeof h == "function")
        c(h, []);
      else if (typeof h == "object")
        if (Array.isArray(h)) {
          const [u, ...d] = (
            /** @type {PluginTuple<Array<unknown>>} */
            h
          );
          c(u, d);
        } else
          l(h);
      else
        throw new TypeError("Expected usable value, not `" + h + "`");
    }
    function l(h) {
      if (!("plugins" in h) && !("settings" in h))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      o(h.plugins), h.settings && (i.settings = Bn(!0, i.settings, h.settings));
    }
    function o(h) {
      let u = -1;
      if (h != null) if (Array.isArray(h))
        for (; ++u < h.length; ) {
          const d = h[u];
          a(d);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + h + "`");
    }
    function c(h, u) {
      let d = -1, C = -1;
      for (; ++d < r.length; )
        if (r[d][0] === h) {
          C = d;
          break;
        }
      if (C === -1)
        r.push([h, ...u]);
      else if (u.length > 0) {
        let [p, ...x] = u;
        const y = r[C][1];
        cr(y) && cr(p) && (p = Bn(!0, y, p)), r[C] = [h, p, ...x];
      }
    }
  }
}
const ic = new Ir().freeze();
function Wn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function $n(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Zn(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function yi(e) {
  if (!cr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function wi(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function fn(e) {
  return ac(e) ? e : new fa(e);
}
function ac(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function lc(e) {
  return typeof e == "string" || oc(e);
}
function oc(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const sc = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", _i = [], xi = { allowDangerousHtml: !0 }, cc = /^(https?|ircs?|mailto|xmpp)$/i, uc = [
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
function bn(e) {
  const t = hc(e), n = pc(e);
  return dc(t.runSync(t.parse(n), n), e);
}
function hc(e) {
  const t = e.rehypePlugins || _i, n = e.remarkPlugins || _i, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...xi } : xi;
  return ic().use($s).use(n).use(B1, r).use(t);
}
function pc(e) {
  const t = e.children || "", n = new fa();
  return typeof t == "string" && (n.value = t), n;
}
function dc(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, l = t.skipHtml, o = t.unwrapDisallowed, c = t.urlTransform || fc;
  for (const u of uc)
    Object.hasOwn(t, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + sc + u.id, void 0);
  return pa(e, h), kl(e, {
    Fragment: En,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: s,
    jsxs: b,
    passKeys: !0,
    passNode: !0
  });
  function h(u, d, C) {
    if (u.type === "raw" && C && typeof d == "number")
      return l ? C.children.splice(d, 1) : C.children[d] = { type: "text", value: u.value }, d;
    if (u.type === "element") {
      let p;
      for (p in Un)
        if (Object.hasOwn(Un, p) && Object.hasOwn(u.properties, p)) {
          const x = u.properties[p], y = Un[p];
          (y === null || y.includes(u.tagName)) && (u.properties[p] = c(String(x || ""), p, u));
        }
    }
    if (u.type === "element") {
      let p = n ? !n.includes(u.tagName) : a ? a.includes(u.tagName) : !1;
      if (!p && r && typeof d == "number" && (p = !r(u, d, C)), p && C && typeof d == "number")
        return o && u.children ? C.children.splice(d, 1, ...u.children) : C.children.splice(d, 1), d;
    }
  }
}
function fc(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    cc.test(e.slice(0, t)) ? e : ""
  );
}
const lt = (...e) => e.filter(Boolean).join(" "), mc = () => /* @__PURE__ */ b(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ b("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ s(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ s("g", { clipPath: "url(#clip0_121_23927)", children: /* @__PURE__ */ s(
          "path",
          {
            d: "M16.3333 26.3541L18.2133 28.2341L25.6666 20.7941V37.0208H28.3333V20.7941L35.7733 28.2474L37.6666 26.3541L26.9999 15.6874L16.3333 26.3541Z",
            fill: "white"
          }
        ) })
      ] }),
      /* @__PURE__ */ b("defs", { children: [
        /* @__PURE__ */ b(
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
              /* @__PURE__ */ s("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ s(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ s("feOffset", { dy: "1" }),
              /* @__PURE__ */ s("feGaussianBlur", { stdDeviation: "1" }),
              /* @__PURE__ */ s("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ s(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                }
              ),
              /* @__PURE__ */ s(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ s(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ s("feOffset", { dy: "1" }),
              /* @__PURE__ */ s("feGaussianBlur", { stdDeviation: "1.5" }),
              /* @__PURE__ */ s("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ s(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                }
              ),
              /* @__PURE__ */ s(
                "feBlend",
                {
                  mode: "normal",
                  in2: "effect1_dropShadow_121_23927",
                  result: "effect2_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ s(
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
        /* @__PURE__ */ s("clipPath", { id: "clip0_121_23927", children: /* @__PURE__ */ s(
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
), gc = ({ className: e, ...t }) => /* @__PURE__ */ s("form", { className: lt("chat-wrapper__prompt-input", e), ...t }), ma = Ni(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...l
  }, o) => {
    const c = (h) => {
      if (h.key === "Enter") {
        if (h.shiftKey)
          return;
        h.preventDefault();
        const u = h.currentTarget.form;
        if (u) {
          const d = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          u.dispatchEvent(d);
        }
      }
      a == null || a(h);
    };
    return /* @__PURE__ */ s(
      "textarea",
      {
        ref: o,
        className: lt("chat-wrapper__prompt-textarea", t),
        name: "message",
        onChange: e,
        onKeyDown: c,
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
ma.displayName = "PromptInputTextarea";
const Cc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ s("div", { className: lt("chat-wrapper__prompt-toolbar", e), ...t }), yc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ s("div", { className: lt("chat-wrapper__prompt-tools", e), ...t }), wc = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || Ft.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ s(
    "button",
    {
      className: lt(
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
}, _c = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = "idle",
  children: i,
  disabled: a,
  ...l
}) => {
  let o = /* @__PURE__ */ s(mc, {});
  const c = a || r === "submitted" || r === "streaming";
  return /* @__PURE__ */ s(
    "button",
    {
      className: lt(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${t}`,
        `chat-wrapper__prompt-submit--${n}`,
        // status === "streaming" && "chat-wrapper__prompt-submit--stop",
        e
      ),
      type: "submit",
      disabled: c,
      ...l,
      children: i ?? o
    }
  );
}, Cu = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ s("select", { className: lt("chat-wrapper__prompt-select", e), ...n, children: t }), yu = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ s(
  "button",
  {
    className: lt("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), wu = ({
  className: e,
  ...t
}) => /* @__PURE__ */ s(
  "div",
  {
    className: lt("chat-wrapper__prompt-select-content", e),
    ...t
  }
), _u = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ s(
  "div",
  {
    className: lt("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), xu = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ s(
  "span",
  {
    className: lt("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), xc = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = K(0), [a, l] = K(!1), [o, c] = K(0);
  return st(() => {
    if (!t || e.length <= 1) return;
    const h = setInterval(() => {
      l(!0), setTimeout(() => {
        i((u) => (u + 1) % e.length), c((u) => u + 1), l(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(h);
  }, [t, e.length]), st(() => {
    t || (i(0), l(!1), c(0));
  }, [t]), /* @__PURE__ */ s(
    "div",
    {
      className: `animated-placeholder-container ${n}`,
      children: /* @__PURE__ */ s(
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
  entries: ga,
  setPrototypeOf: Ei,
  isFrozen: Ec,
  getPrototypeOf: Sc,
  getOwnPropertyDescriptor: kc
} = Object;
let {
  freeze: He,
  seal: rt,
  create: hr
} = Object, {
  apply: pr,
  construct: dr
} = typeof Reflect < "u" && Reflect;
He || (He = function(t) {
  return t;
});
rt || (rt = function(t) {
  return t;
});
pr || (pr = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
dr || (dr = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const mn = Ue(Array.prototype.forEach), Tc = Ue(Array.prototype.lastIndexOf), Si = Ue(Array.prototype.pop), Kt = Ue(Array.prototype.push), bc = Ue(Array.prototype.splice), wn = Ue(String.prototype.toLowerCase), qn = Ue(String.prototype.toString), Xn = Ue(String.prototype.match), Qt = Ue(String.prototype.replace), Ac = Ue(String.prototype.indexOf), vc = Ue(String.prototype.trim), it = Ue(Object.prototype.hasOwnProperty), Pe = Ue(RegExp.prototype.test), Jt = Ic(TypeError);
function Ue(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return pr(e, t, r);
  };
}
function Ic(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return dr(e, n);
  };
}
function Y(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : wn;
  Ei && Ei(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (Ec(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function Rc(e) {
  for (let t = 0; t < e.length; t++)
    it(e, t) || (e[t] = null);
  return e;
}
function yt(e) {
  const t = hr(null);
  for (const [n, r] of ga(e))
    it(e, n) && (Array.isArray(r) ? t[n] = Rc(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = yt(r) : t[n] = r);
  return t;
}
function en(e, t) {
  for (; e !== null; ) {
    const r = kc(e, t);
    if (r) {
      if (r.get)
        return Ue(r.get);
      if (typeof r.value == "function")
        return Ue(r.value);
    }
    e = Sc(e);
  }
  function n() {
    return null;
  }
  return n;
}
const ki = He(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Yn = He(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Kn = He(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Nc = He(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Qn = He(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Lc = He(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Ti = He(["#text"]), bi = He(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Jn = He(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Ai = He(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), gn = He(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Mc = rt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Oc = rt(/<%[\w\W]*|[\w\W]*%>/gm), Dc = rt(/\$\{[\w\W]*/gm), Pc = rt(/^data-[\-\w.\u00B7-\uFFFF]+$/), Hc = rt(/^aria-[\-\w]+$/), Ca = rt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Uc = rt(/^(?:\w+script|data):/i), Fc = rt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), ya = rt(/^html$/i), zc = rt(/^[a-z][.\w]*(-[.\w]+)+$/i);
var vi = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Hc,
  ATTR_WHITESPACE: Fc,
  CUSTOM_ELEMENT: zc,
  DATA_ATTR: Pc,
  DOCTYPE_NAME: ya,
  ERB_EXPR: Oc,
  IS_ALLOWED_URI: Ca,
  IS_SCRIPT_OR_DATA: Uc,
  MUSTACHE_EXPR: Mc,
  TMPLIT_EXPR: Dc
});
const tn = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Bc = function() {
  return typeof window > "u" ? null : window;
}, Vc = function(t, n) {
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
}, Ii = function() {
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
function wa() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Bc();
  const t = (M) => wa(M);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== tn.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: l,
    Node: o,
    Element: c,
    NodeFilter: h,
    NamedNodeMap: u = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: C,
    trustedTypes: p
  } = e, x = c.prototype, y = en(x, "cloneNode"), R = en(x, "remove"), E = en(x, "nextSibling"), z = en(x, "childNodes"), N = en(x, "parentNode");
  if (typeof l == "function") {
    const M = n.createElement("template");
    M.content && M.content.ownerDocument && (n = M.content.ownerDocument);
  }
  let P, Z = "";
  const {
    implementation: w,
    createNodeIterator: U,
    createDocumentFragment: G,
    getElementsByTagName: $
  } = n, {
    importNode: O
  } = r;
  let I = Ii();
  t.isSupported = typeof ga == "function" && typeof N == "function" && w && w.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: L,
    ERB_EXPR: X,
    TMPLIT_EXPR: le,
    DATA_ATTR: q,
    ARIA_ATTR: xe,
    IS_SCRIPT_OR_DATA: me,
    ATTR_WHITESPACE: Te,
    CUSTOM_ELEMENT: $e
  } = vi;
  let {
    IS_ALLOWED_URI: g
  } = vi, J = null;
  const Ie = Y({}, [...ki, ...Yn, ...Kn, ...Qn, ...Ti]);
  let f = null;
  const ge = Y({}, [...bi, ...Jn, ...Ai, ...gn]);
  let te = Object.seal(hr(null, {
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
  })), ae = null, Fe = null;
  const Ee = Object.seal(hr(null, {
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
  let Ke = !0, Qe = !0, ht = !1, Mt = !0, Je = !1, pt = !0, Oe = !1, Re = !1, _t = !1, Ne = !1, et = !1, Le = !1, Ot = !0, Dt = !1;
  const Wt = "user-content-";
  let vt = !0, dt = !1, _ = {}, k = null;
  const H = Y({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let j = null;
  const ee = Y({}, ["audio", "video", "img", "source", "image", "track"]);
  let Se = null;
  const Ze = Y({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), be = "http://www.w3.org/1998/Math/MathML", Ae = "http://www.w3.org/2000/svg", Ce = "http://www.w3.org/1999/xhtml";
  let pe = Ce, tt = !1, De = null;
  const Ln = Y({}, [be, Ae, Ce], qn);
  let xt = Y({}, ["mi", "mo", "mn", "ms", "mtext"]), It = Y({}, ["annotation-xml"]);
  const Mn = Y({}, ["title", "style", "font", "a", "script"]);
  let Pt = null;
  const On = ["application/xhtml+xml", "text/html"], cn = "text/html";
  let ye = null, Et = null;
  const Dn = n.createElement("form"), un = function(m) {
    return m instanceof RegExp || m instanceof Function;
  }, $t = function() {
    let m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Et && Et === m)) {
      if ((!m || typeof m != "object") && (m = {}), m = yt(m), Pt = // eslint-disable-next-line unicorn/prefer-includes
      On.indexOf(m.PARSER_MEDIA_TYPE) === -1 ? cn : m.PARSER_MEDIA_TYPE, ye = Pt === "application/xhtml+xml" ? qn : wn, J = it(m, "ALLOWED_TAGS") ? Y({}, m.ALLOWED_TAGS, ye) : Ie, f = it(m, "ALLOWED_ATTR") ? Y({}, m.ALLOWED_ATTR, ye) : ge, De = it(m, "ALLOWED_NAMESPACES") ? Y({}, m.ALLOWED_NAMESPACES, qn) : Ln, Se = it(m, "ADD_URI_SAFE_ATTR") ? Y(yt(Ze), m.ADD_URI_SAFE_ATTR, ye) : Ze, j = it(m, "ADD_DATA_URI_TAGS") ? Y(yt(ee), m.ADD_DATA_URI_TAGS, ye) : ee, k = it(m, "FORBID_CONTENTS") ? Y({}, m.FORBID_CONTENTS, ye) : H, ae = it(m, "FORBID_TAGS") ? Y({}, m.FORBID_TAGS, ye) : yt({}), Fe = it(m, "FORBID_ATTR") ? Y({}, m.FORBID_ATTR, ye) : yt({}), _ = it(m, "USE_PROFILES") ? m.USE_PROFILES : !1, Ke = m.ALLOW_ARIA_ATTR !== !1, Qe = m.ALLOW_DATA_ATTR !== !1, ht = m.ALLOW_UNKNOWN_PROTOCOLS || !1, Mt = m.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Je = m.SAFE_FOR_TEMPLATES || !1, pt = m.SAFE_FOR_XML !== !1, Oe = m.WHOLE_DOCUMENT || !1, Ne = m.RETURN_DOM || !1, et = m.RETURN_DOM_FRAGMENT || !1, Le = m.RETURN_TRUSTED_TYPE || !1, _t = m.FORCE_BODY || !1, Ot = m.SANITIZE_DOM !== !1, Dt = m.SANITIZE_NAMED_PROPS || !1, vt = m.KEEP_CONTENT !== !1, dt = m.IN_PLACE || !1, g = m.ALLOWED_URI_REGEXP || Ca, pe = m.NAMESPACE || Ce, xt = m.MATHML_TEXT_INTEGRATION_POINTS || xt, It = m.HTML_INTEGRATION_POINTS || It, te = m.CUSTOM_ELEMENT_HANDLING || {}, m.CUSTOM_ELEMENT_HANDLING && un(m.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (te.tagNameCheck = m.CUSTOM_ELEMENT_HANDLING.tagNameCheck), m.CUSTOM_ELEMENT_HANDLING && un(m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (te.attributeNameCheck = m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), m.CUSTOM_ELEMENT_HANDLING && typeof m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (te.allowCustomizedBuiltInElements = m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Je && (Qe = !1), et && (Ne = !0), _ && (J = Y({}, Ti), f = [], _.html === !0 && (Y(J, ki), Y(f, bi)), _.svg === !0 && (Y(J, Yn), Y(f, Jn), Y(f, gn)), _.svgFilters === !0 && (Y(J, Kn), Y(f, Jn), Y(f, gn)), _.mathMl === !0 && (Y(J, Qn), Y(f, Ai), Y(f, gn))), m.ADD_TAGS && (typeof m.ADD_TAGS == "function" ? Ee.tagCheck = m.ADD_TAGS : (J === Ie && (J = yt(J)), Y(J, m.ADD_TAGS, ye))), m.ADD_ATTR && (typeof m.ADD_ATTR == "function" ? Ee.attributeCheck = m.ADD_ATTR : (f === ge && (f = yt(f)), Y(f, m.ADD_ATTR, ye))), m.ADD_URI_SAFE_ATTR && Y(Se, m.ADD_URI_SAFE_ATTR, ye), m.FORBID_CONTENTS && (k === H && (k = yt(k)), Y(k, m.FORBID_CONTENTS, ye)), vt && (J["#text"] = !0), Oe && Y(J, ["html", "head", "body"]), J.table && (Y(J, ["tbody"]), delete ae.tbody), m.TRUSTED_TYPES_POLICY) {
        if (typeof m.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Jt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof m.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Jt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        P = m.TRUSTED_TYPES_POLICY, Z = P.createHTML("");
      } else
        P === void 0 && (P = Vc(p, i)), P !== null && typeof Z == "string" && (Z = P.createHTML(""));
      He && He(m), Et = m;
    }
  }, hn = Y({}, [...Yn, ...Kn, ...Nc]), Zt = Y({}, [...Qn, ...Lc]), A = function(m) {
    let S = N(m);
    (!S || !S.tagName) && (S = {
      namespaceURI: pe,
      tagName: "template"
    });
    const v = wn(m.tagName), ne = wn(S.tagName);
    return De[m.namespaceURI] ? m.namespaceURI === Ae ? S.namespaceURI === Ce ? v === "svg" : S.namespaceURI === be ? v === "svg" && (ne === "annotation-xml" || xt[ne]) : !!hn[v] : m.namespaceURI === be ? S.namespaceURI === Ce ? v === "math" : S.namespaceURI === Ae ? v === "math" && It[ne] : !!Zt[v] : m.namespaceURI === Ce ? S.namespaceURI === Ae && !It[ne] || S.namespaceURI === be && !xt[ne] ? !1 : !Zt[v] && (Mn[v] || !hn[v]) : !!(Pt === "application/xhtml+xml" && De[m.namespaceURI]) : !1;
  }, D = function(m) {
    Kt(t.removed, {
      element: m
    });
    try {
      N(m).removeChild(m);
    } catch {
      R(m);
    }
  }, Q = function(m, S) {
    try {
      Kt(t.removed, {
        attribute: S.getAttributeNode(m),
        from: S
      });
    } catch {
      Kt(t.removed, {
        attribute: null,
        from: S
      });
    }
    if (S.removeAttribute(m), m === "is")
      if (Ne || et)
        try {
          D(S);
        } catch {
        }
      else
        try {
          S.setAttribute(m, "");
        } catch {
        }
  }, V = function(m) {
    let S = null, v = null;
    if (_t)
      m = "<remove></remove>" + m;
    else {
      const fe = Xn(m, /^[\r\n\t ]+/);
      v = fe && fe[0];
    }
    Pt === "application/xhtml+xml" && pe === Ce && (m = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + m + "</body></html>");
    const ne = P ? P.createHTML(m) : m;
    if (pe === Ce)
      try {
        S = new C().parseFromString(ne, Pt);
      } catch {
      }
    if (!S || !S.documentElement) {
      S = w.createDocument(pe, "template", null);
      try {
        S.documentElement.innerHTML = tt ? Z : ne;
      } catch {
      }
    }
    const he = S.body || S.documentElement;
    return m && v && he.insertBefore(n.createTextNode(v), he.childNodes[0] || null), pe === Ce ? $.call(S, Oe ? "html" : "body")[0] : Oe ? S.documentElement : he;
  }, ce = function(m) {
    return U.call(
      m.ownerDocument || m,
      m,
      // eslint-disable-next-line no-bitwise
      h.SHOW_ELEMENT | h.SHOW_COMMENT | h.SHOW_TEXT | h.SHOW_PROCESSING_INSTRUCTION | h.SHOW_CDATA_SECTION,
      null
    );
  }, we = function(m) {
    return m instanceof d && (typeof m.nodeName != "string" || typeof m.textContent != "string" || typeof m.removeChild != "function" || !(m.attributes instanceof u) || typeof m.removeAttribute != "function" || typeof m.setAttribute != "function" || typeof m.namespaceURI != "string" || typeof m.insertBefore != "function" || typeof m.hasChildNodes != "function");
  }, ze = function(m) {
    return typeof o == "function" && m instanceof o;
  };
  function de(M, m, S) {
    mn(M, (v) => {
      v.call(t, m, S, Et);
    });
  }
  const qe = function(m) {
    let S = null;
    if (de(I.beforeSanitizeElements, m, null), we(m))
      return D(m), !0;
    const v = ye(m.nodeName);
    if (de(I.uponSanitizeElement, m, {
      tagName: v,
      allowedTags: J
    }), pt && m.hasChildNodes() && !ze(m.firstElementChild) && Pe(/<[/\w!]/g, m.innerHTML) && Pe(/<[/\w!]/g, m.textContent) || m.nodeType === tn.progressingInstruction || pt && m.nodeType === tn.comment && Pe(/<[/\w]/g, m.data))
      return D(m), !0;
    if (!(Ee.tagCheck instanceof Function && Ee.tagCheck(v)) && (!J[v] || ae[v])) {
      if (!ae[v] && St(v) && (te.tagNameCheck instanceof RegExp && Pe(te.tagNameCheck, v) || te.tagNameCheck instanceof Function && te.tagNameCheck(v)))
        return !1;
      if (vt && !k[v]) {
        const ne = N(m) || m.parentNode, he = z(m) || m.childNodes;
        if (he && ne) {
          const fe = he.length;
          for (let Be = fe - 1; Be >= 0; --Be) {
            const gt = y(he[Be], !0);
            gt.__removalCount = (m.__removalCount || 0) + 1, ne.insertBefore(gt, E(m));
          }
        }
      }
      return D(m), !0;
    }
    return m instanceof c && !A(m) || (v === "noscript" || v === "noembed" || v === "noframes") && Pe(/<\/no(script|embed|frames)/i, m.innerHTML) ? (D(m), !0) : (Je && m.nodeType === tn.text && (S = m.textContent, mn([L, X, le], (ne) => {
      S = Qt(S, ne, " ");
    }), m.textContent !== S && (Kt(t.removed, {
      element: m.cloneNode()
    }), m.textContent = S)), de(I.afterSanitizeElements, m, null), !1);
  }, ft = function(m, S, v) {
    if (Ot && (S === "id" || S === "name") && (v in n || v in Dn))
      return !1;
    if (!(Qe && !Fe[S] && Pe(q, S))) {
      if (!(Ke && Pe(xe, S))) {
        if (!(Ee.attributeCheck instanceof Function && Ee.attributeCheck(S, m))) {
          if (!f[S] || Fe[S]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(St(m) && (te.tagNameCheck instanceof RegExp && Pe(te.tagNameCheck, m) || te.tagNameCheck instanceof Function && te.tagNameCheck(m)) && (te.attributeNameCheck instanceof RegExp && Pe(te.attributeNameCheck, S) || te.attributeNameCheck instanceof Function && te.attributeNameCheck(S, m)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              S === "is" && te.allowCustomizedBuiltInElements && (te.tagNameCheck instanceof RegExp && Pe(te.tagNameCheck, v) || te.tagNameCheck instanceof Function && te.tagNameCheck(v)))
            ) return !1;
          } else if (!Se[S]) {
            if (!Pe(g, Qt(v, Te, ""))) {
              if (!((S === "src" || S === "xlink:href" || S === "href") && m !== "script" && Ac(v, "data:") === 0 && j[m])) {
                if (!(ht && !Pe(me, Qt(v, Te, "")))) {
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
    return m !== "annotation-xml" && Xn(m, $e);
  }, mt = function(m) {
    de(I.beforeSanitizeAttributes, m, null);
    const {
      attributes: S
    } = m;
    if (!S || we(m))
      return;
    const v = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: f,
      forceKeepAttr: void 0
    };
    let ne = S.length;
    for (; ne--; ) {
      const he = S[ne], {
        name: fe,
        namespaceURI: Be,
        value: gt
      } = he, Ht = ye(fe), Pn = gt;
      let ve = fe === "value" ? Pn : vc(Pn);
      if (v.attrName = Ht, v.attrValue = ve, v.keepAttr = !0, v.forceKeepAttr = void 0, de(I.uponSanitizeAttribute, m, v), ve = v.attrValue, Dt && (Ht === "id" || Ht === "name") && (Q(fe, m), ve = Wt + ve), pt && Pe(/((--!?|])>)|<\/(style|title|textarea)/i, ve)) {
        Q(fe, m);
        continue;
      }
      if (Ht === "attributename" && Xn(ve, "href")) {
        Q(fe, m);
        continue;
      }
      if (v.forceKeepAttr)
        continue;
      if (!v.keepAttr) {
        Q(fe, m);
        continue;
      }
      if (!Mt && Pe(/\/>/i, ve)) {
        Q(fe, m);
        continue;
      }
      Je && mn([L, X, le], (Nr) => {
        ve = Qt(ve, Nr, " ");
      });
      const Rr = ye(m.nodeName);
      if (!ft(Rr, Ht, ve)) {
        Q(fe, m);
        continue;
      }
      if (P && typeof p == "object" && typeof p.getAttributeType == "function" && !Be)
        switch (p.getAttributeType(Rr, Ht)) {
          case "TrustedHTML": {
            ve = P.createHTML(ve);
            break;
          }
          case "TrustedScriptURL": {
            ve = P.createScriptURL(ve);
            break;
          }
        }
      if (ve !== Pn)
        try {
          Be ? m.setAttributeNS(Be, fe, ve) : m.setAttribute(fe, ve), we(m) ? D(m) : Si(t.removed);
        } catch {
          Q(fe, m);
        }
    }
    de(I.afterSanitizeAttributes, m, null);
  }, qt = function M(m) {
    let S = null;
    const v = ce(m);
    for (de(I.beforeSanitizeShadowDOM, m, null); S = v.nextNode(); )
      de(I.uponSanitizeShadowNode, S, null), qe(S), mt(S), S.content instanceof a && M(S.content);
    de(I.afterSanitizeShadowDOM, m, null);
  };
  return t.sanitize = function(M) {
    let m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, S = null, v = null, ne = null, he = null;
    if (tt = !M, tt && (M = "<!-->"), typeof M != "string" && !ze(M))
      if (typeof M.toString == "function") {
        if (M = M.toString(), typeof M != "string")
          throw Jt("dirty is not a string, aborting");
      } else
        throw Jt("toString is not a function");
    if (!t.isSupported)
      return M;
    if (Re || $t(m), t.removed = [], typeof M == "string" && (dt = !1), dt) {
      if (M.nodeName) {
        const gt = ye(M.nodeName);
        if (!J[gt] || ae[gt])
          throw Jt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (M instanceof o)
      S = V("<!---->"), v = S.ownerDocument.importNode(M, !0), v.nodeType === tn.element && v.nodeName === "BODY" || v.nodeName === "HTML" ? S = v : S.appendChild(v);
    else {
      if (!Ne && !Je && !Oe && // eslint-disable-next-line unicorn/prefer-includes
      M.indexOf("<") === -1)
        return P && Le ? P.createHTML(M) : M;
      if (S = V(M), !S)
        return Ne ? null : Le ? Z : "";
    }
    S && _t && D(S.firstChild);
    const fe = ce(dt ? M : S);
    for (; ne = fe.nextNode(); )
      qe(ne), mt(ne), ne.content instanceof a && qt(ne.content);
    if (dt)
      return M;
    if (Ne) {
      if (et)
        for (he = G.call(S.ownerDocument); S.firstChild; )
          he.appendChild(S.firstChild);
      else
        he = S;
      return (f.shadowroot || f.shadowrootmode) && (he = O.call(r, he, !0)), he;
    }
    let Be = Oe ? S.outerHTML : S.innerHTML;
    return Oe && J["!doctype"] && S.ownerDocument && S.ownerDocument.doctype && S.ownerDocument.doctype.name && Pe(ya, S.ownerDocument.doctype.name) && (Be = "<!DOCTYPE " + S.ownerDocument.doctype.name + `>
` + Be), Je && mn([L, X, le], (gt) => {
      Be = Qt(Be, gt, " ");
    }), P && Le ? P.createHTML(Be) : Be;
  }, t.setConfig = function() {
    let M = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    $t(M), Re = !0;
  }, t.clearConfig = function() {
    Et = null, Re = !1;
  }, t.isValidAttribute = function(M, m, S) {
    Et || $t({});
    const v = ye(M), ne = ye(m);
    return ft(v, ne, S);
  }, t.addHook = function(M, m) {
    typeof m == "function" && Kt(I[M], m);
  }, t.removeHook = function(M, m) {
    if (m !== void 0) {
      const S = Tc(I[M], m);
      return S === -1 ? void 0 : bc(I[M], S, 1)[0];
    }
    return Si(I[M]);
  }, t.removeHooks = function(M) {
    I[M] = [];
  }, t.removeAllHooks = function() {
    I = Ii();
  }, t;
}
var Gc = wa();
function jc(e) {
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
function _n(e, t = !1) {
  return e;
}
function Wc(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function Ri(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || jc(e));
  } catch {
    return !1;
  }
}
function $c() {
  Gc.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !Ri(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !Ri(n) && e.removeAttribute("src");
    }
  });
}
$c();
const Zc = Ni(
  ({
    placeholder: e = "What would you like to know?",
    placeholderTexts: t,
    disabled: n = !1,
    chatStatus: r,
    fileUploadEnabled: i = !1,
    restaurantName: a,
    restaurantLogo: l,
    hasMessages: o = !1,
    onSubmit: c,
    onFileUpload: h,
    onStopGeneration: u
  }, d) => {
    const [C, p] = K(""), [x, y] = K([]), R = Ct(null), E = t && t.length > 0 ? t : [e], z = C.length === 0 && !o && E.length > 1;
    va(d, () => ({
      focus: () => {
        var w;
        (w = R.current) == null || w.focus();
      },
      setText: (w) => {
        p(w), setTimeout(() => {
          var U;
          (U = R.current) == null || U.focus();
        }, 0);
      }
    }));
    const N = ue(
      (w) => {
        w.preventDefault();
        const G = new FormData(w.currentTarget).get("message");
        if (G != null && G.trim()) {
          const $ = _n(G.trim(), !1);
          if (!$.trim()) {
            console.warn("Message was blocked due to security concerns");
            return;
          }
          c($, x), p(""), y([]);
        }
      },
      [c, x]
    ), P = ue(
      (w) => {
        const G = w.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
        p(G);
      },
      []
    ), Z = ue(async () => {
      const w = document.createElement("input");
      w.type = "file", w.accept = "image/*", w.multiple = !1, w.onchange = async (U) => {
        const G = U.target.files;
        if (G) {
          const $ = Array.from(G).filter((O) => {
            const I = Wc(O.name);
            return I !== O.name && console.warn(
              `File name sanitized: ${O.name} -> ${I}`
            ), O.size > 10485760 ? (console.warn(`File too large: ${O.name} (${O.size} bytes)`), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ].includes(O.type) ? !0 : (console.warn(
              `File type not allowed: ${O.name} (${O.type})`
            ), !1);
          });
          if ($.length > 0) {
            const O = await h($);
            y(O);
          }
        }
      }, w.click();
    }, [h]);
    return /* @__PURE__ */ b(gc, { onSubmit: N, style: { position: "relative" }, children: [
      /* @__PURE__ */ s(
        ma,
        {
          ref: R,
          name: "message",
          value: C,
          onChange: P,
          placeholder: "",
          disabled: n
        }
      ),
      !C.trim() && /* @__PURE__ */ s(
        xc,
        {
          placeholderTexts: E,
          shouldAnimate: z
        }
      ),
      x.length > 0 && /* @__PURE__ */ s(
        "div",
        {
          style: {
            padding: "8px 16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center"
          },
          children: x.map((w, U) => {
            const G = w.startsWith("data:image/"), $ = w.startsWith("http://") || w.startsWith("https://"), O = G || $;
            return /* @__PURE__ */ b(
              "div",
              {
                style: {
                  position: "relative",
                  display: "inline-block"
                },
                children: [
                  O ? /* @__PURE__ */ b(
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
                        /* @__PURE__ */ s(
                          "img",
                          {
                            src: w,
                            alt: `Attachment ${U + 1}`,
                            style: {
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }
                          }
                        ),
                        /* @__PURE__ */ s(
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
                  ) : /* @__PURE__ */ b(
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
                        /* @__PURE__ */ s(
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
                            children: /* @__PURE__ */ b(
                              "svg",
                              {
                                width: "24",
                                height: "25",
                                viewBox: "0 0 24 25",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: [
                                  /* @__PURE__ */ s(
                                    "mask",
                                    {
                                      id: "mask0_190_623",
                                      style: { maskType: "alpha" },
                                      maskUnits: "userSpaceOnUse",
                                      x: "0",
                                      y: "0",
                                      width: "24",
                                      height: "25",
                                      children: /* @__PURE__ */ s(
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
                                  /* @__PURE__ */ s("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ s(
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
                        /* @__PURE__ */ b("div", { style: { flex: 1, minWidth: 0 }, children: [
                          /* @__PURE__ */ s(
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
                                const I = w.match(/name=([^;]+)/);
                                return I ? decodeURIComponent(I[1]) : "document.pdf";
                              })()
                            }
                          ),
                          /* @__PURE__ */ s(
                            "div",
                            {
                              style: {
                                color: "#9ca3af",
                                fontSize: "12px",
                                textTransform: "uppercase"
                              },
                              children: (() => {
                                const I = w.match(/data:([^;]+)/);
                                if (I) {
                                  const L = I[1];
                                  switch (L) {
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
                                      const X = L.split("/")[1];
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
                  /* @__PURE__ */ s(
                    "button",
                    {
                      onClick: () => {
                        y(
                          (I) => I.filter((L, X) => X !== U)
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
      /* @__PURE__ */ b(Cc, { children: [
        /* @__PURE__ */ b(yc, { children: [
          i && /* @__PURE__ */ b(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center"
              },
              children: [
                /* @__PURE__ */ s(
                  wc,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: Z,
                    title: x.length > 0 ? `${x.length} image(s) attached` : "Attach image",
                    disabled: n,
                    style: {
                      position: "relative"
                    },
                    children: /* @__PURE__ */ b(
                      "svg",
                      {
                        width: "36",
                        height: "37",
                        viewBox: "0 0 36 37",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [
                          /* @__PURE__ */ s(
                            "rect",
                            {
                              y: "0.354126",
                              width: "36",
                              height: "36",
                              rx: "18",
                              fill: "#F4F6F8"
                            }
                          ),
                          /* @__PURE__ */ s("g", { "clip-path": "url(#clip0_121_9706)", children: /* @__PURE__ */ s(
                            "path",
                            {
                              d: "M21.3334 13.3541V22.9374C21.3334 24.7791 19.8417 26.2708 18 26.2708C16.1584 26.2708 14.6667 24.7791 14.6667 22.9374V12.5208C14.6667 11.3708 15.6 10.4374 16.75 10.4374C17.9 10.4374 18.8334 11.3708 18.8334 12.5208V21.2708C18.8334 21.7291 18.4584 22.1041 18 22.1041C17.5417 22.1041 17.1667 21.7291 17.1667 21.2708V13.3541H15.9167V21.2708C15.9167 22.4208 16.85 23.3541 18 23.3541C19.15 23.3541 20.0834 22.4208 20.0834 21.2708V12.5208C20.0834 10.6791 18.5917 9.18744 16.75 9.18744C14.9084 9.18744 13.4167 10.6791 13.4167 12.5208V22.9374C13.4167 25.4708 15.4667 27.5208 18 27.5208C20.5334 27.5208 22.5834 25.4708 22.5834 22.9374V13.3541H21.3334Z",
                              fill: "#212B36"
                            }
                          ) }),
                          /* @__PURE__ */ s("defs", { children: /* @__PURE__ */ s("clipPath", { id: "clip0_121_9706", children: /* @__PURE__ */ s(
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
                /* @__PURE__ */ s(
                  "span",
                  {
                    onClick: Z,
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
          i && a && /* @__PURE__ */ s("div", { className: "chat-wrapper__divider" }),
          a && /* @__PURE__ */ b("div", { className: "chat-wrapper__restaurant-chip", children: [
            l && /* @__PURE__ */ s(
              "img",
              {
                src: l,
                alt: "Restaurant logo",
                className: "chat-wrapper__restaurant-logo"
              }
            ),
            /* @__PURE__ */ s("span", { className: "chat-wrapper__restaurant-name", children: a })
          ] })
        ] }),
        /* @__PURE__ */ s(
          _c,
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
), qc = ({
  prompts: e,
  onPromptSelect: t
}) => /* @__PURE__ */ b("div", { className: "chat-wrapper__suggested-prompts", children: [
  /* @__PURE__ */ s("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
  /* @__PURE__ */ s("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((n, r) => /* @__PURE__ */ s(
    "button",
    {
      className: "chat-wrapper__suggested-prompt-card",
      onClick: () => t(n),
      children: /* @__PURE__ */ b("div", { className: "chat-wrapper__suggested-prompt-content", children: [
        /* @__PURE__ */ s("h4", { className: "chat-wrapper__suggested-prompt-title", children: n.title }),
        /* @__PURE__ */ s("p", { className: "chat-wrapper__suggested-prompt-description", children: n.description })
      ] })
    },
    r
  )) })
] }), F = {
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
  isThinkingMessage: (e) => e.startsWith(F.THINKING_PREFIX) || e.startsWith(F.REASONING_PREFIX) || e.startsWith(F.THOUGHT_PREFIX),
  isCompletedMessage: (e) => e.includes(F.COMPLETED_MARKER),
  isErrorMessage: (e) => e.includes(F.ERROR_MARKER),
  isHandlingMessage: (e) => e.includes(F.HANDLING_MARKER),
  extractDuration: (e) => {
    const t = e.match(F.PATTERNS.DURATION);
    return t ? ` for ${t[1]} seconds` : void 0;
  },
  cleanReasoningContent: (e) => {
    let t = e.replace(new RegExp(`^${F.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${F.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${F.THOUGHT_PREFIX}\\s*`), "");
    return t = t.replace(/\s*for [\d.]+\s*seconds$/, ""), t = t.replace(F.PATTERNS.THOUGHT_CONTENT, ""), t.trim();
  },
  getMessageType: (e, t) => t === !1 ? ke.isErrorMessage(e) ? F.MESSAGE_TYPES.ERROR : (ke.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || ke.isThinkingMessage(e), F.MESSAGE_TYPES.THOUGHT) : ke.isCompletedMessage(e) ? F.MESSAGE_TYPES.COMPLETED : ke.isErrorMessage(e) ? F.MESSAGE_TYPES.ERROR : (ke.isHandlingMessage(e) || ke.isThinkingMessage(e) && !e.includes(F.UI_TEXT.AI_IS_THINKING), F.MESSAGE_TYPES.THINKING)
};
function Xc({ children: e, isStreaming: t }) {
  const [n, r] = K(!0), [i, a] = K(!1);
  Ft.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const l = () => {
    t || r(!n);
  }, o = Ft.Children.map(e, (c) => {
    if (Ft.isValidElement(c)) {
      if (c.type === _a)
        return Ft.cloneElement(
          c,
          {
            onToggle: l,
            isExpanded: n
          }
        );
      if (c.type === xa)
        return Ft.cloneElement(
          c,
          {
            isVisible: n
          }
        );
    }
    return c;
  });
  return /* @__PURE__ */ s("div", { className: "chat-wrapper__reasoning", children: o });
}
function _a({
  title: e,
  status: t = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const a = () => /* @__PURE__ */ b(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ s(
          "mask",
          {
            id: "mask0_64_36210",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "16",
            height: "16",
            children: /* @__PURE__ */ s("rect", { width: "16", height: "16", fill: "#D9D9D9" })
          }
        ),
        /* @__PURE__ */ s("g", { mask: "url(#mask0_64_36210)", children: /* @__PURE__ */ s(
          "path",
          {
            d: "M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z",
            fill: "#637381"
          }
        ) })
      ]
    }
  ), l = t === "completed" || e.includes(F.UI_TEXT.THINKING) || e.includes(F.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ b(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${l ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: l ? r : void 0,
      style: { cursor: l ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ s("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ b("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ s("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        l && /* @__PURE__ */ s(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ b(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ s(
                    "mask",
                    {
                      id: "mask0_44_18068",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ s("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ s("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ s(
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
  return t ? /* @__PURE__ */ s("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function Yc({ children: e }) {
  return /* @__PURE__ */ s("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function Kc({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var c, h;
  console.log("clog toolData", n);
  const a = () => {
    if (!r || !i) return null;
    const u = i.find((d) => d.name === r);
    return (u == null ? void 0 : u.description) || null;
  };
  let l;
  if (r != null && r.startsWith("lat_")) {
    const u = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.query, d = (h = n == null ? void 0 : n.parameters) == null ? void 0 : h.url;
    l = u || d || "Executing tool...";
  } else
    l = a();
  return l && (l.startsWith("http://") || l.startsWith("https://") || (l = l.charAt(0).toUpperCase() + l.slice(1))), /* @__PURE__ */ s("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ b("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ b("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ s("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ s("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ s("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ s("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ b(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ s(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ s("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ s("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ s(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ s("span", { children: l }),
          /* @__PURE__ */ b("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ b(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ s(
                    "mask",
                    {
                      id: "mask0_64_36278",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ s("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ s("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ s(
                    "path",
                    {
                      d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ s("span", { children: "Running..." })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ b("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ b("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ s("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ s("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ s("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ s("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ b(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ s(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ s("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ s("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ s(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ s("span", { children: l }),
          /* @__PURE__ */ b("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ b(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ s(
                    "mask",
                    {
                      id: "mask0_64_36345",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ s("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ s("g", { mask: "url(#mask0_64_36345)", children: /* @__PURE__ */ s(
                    "path",
                    {
                      d: "M7.1501 10.7819L11.1168 6.83193L10.2668 5.98193L7.1501 9.08193L5.73343 7.68193L4.88343 8.53193L7.1501 10.7819ZM8.0001 14.7819C7.12232 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.643 2.1001 10.8653C1.76676 10.0875 1.6001 9.25971 1.6001 8.38193C1.6001 7.49304 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73899 2.81527 5.51676 2.48193C6.29454 2.1486 7.12232 1.98193 8.0001 1.98193C8.88899 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11805 13.9001 5.89027C14.2334 6.66249 14.4001 7.49304 14.4001 8.38193C14.4001 9.25971 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.264 13.9486 10.4918 14.2819C9.71954 14.6153 8.88899 14.7819 8.0001 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819Z",
                      fill: "#4EAD13"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ s("span", { children: "Completed" })
          ] })
        ] });
      case "error":
        return /* @__PURE__ */ b("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ s("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ s(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ s(
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
          /* @__PURE__ */ s("span", { className: "chat-wrapper__tooling-handle-title", children: e })
        ] });
      default:
        return /* @__PURE__ */ b("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ b("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ s("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ s("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ s("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ s("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ b(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ s(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ s("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ s("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ s(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ b("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ b(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ s(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ s(
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
                /* @__PURE__ */ s("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ s(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ b(
            "svg",
            {
              width: "20",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ s(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ s("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ s("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ s(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ s("span", { children: "Pending..." })
        ] });
    }
  })() });
}
function Ea({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ b("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ s("span", {}),
    /* @__PURE__ */ s("span", {}),
    /* @__PURE__ */ s("span", {})
  ] }) : t === "pulse" ? /* @__PURE__ */ s(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ s(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: e, height: e }
    }
  );
}
const Qc = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ s(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ s("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ s(Ea, { size: e, variant: "dots" }) })
  }
);
async function Jc(e, t) {
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
async function eu(e, t, n) {
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
const tu = ({
  isOpen: e,
  onClose: t,
  app: n,
  apiUrl: r
}) => {
  const [i, a] = K(null), [l, o] = K(""), [c, h] = K(""), [u, d] = K(!1), [C, p] = K(null);
  st(() => {
    e && !i && x();
  }, [e]);
  const x = ue(async () => {
    d(!0), p(null);
    try {
      const E = await Jc(r, n);
      a(E), o(E.promptPath), h(E.versionUuid);
    } catch (E) {
      p(E instanceof Error ? E.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", E);
    } finally {
      d(!1);
    }
  }, [r, n]), y = ue(async () => {
    if (i) {
      d(!0), p(null);
      try {
        const E = await eu(r, n, {
          promptPath: l,
          versionUuid: c,
          isDefault: i.isDefault
        });
        a(E), t(), window.location.reload();
      } catch (E) {
        p(E instanceof Error ? E.message : "Failed to update configuration"), console.error("Error updating agent configuration:", E);
      } finally {
        d(!1);
      }
    }
  }, [r, n, l, c, i, t]), R = ue(() => {
    i && (o(i.promptPath), h(i.versionUuid)), p(null), t();
  }, [i, t]);
  return e ? /* @__PURE__ */ s("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ b("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ b("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ s("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ s(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: R,
          title: "Close settings",
          children: /* @__PURE__ */ s(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ s(
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
    /* @__PURE__ */ b("div", { className: "chat-wrapper__dev-settings-content", children: [
      u && /* @__PURE__ */ s("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      C && /* @__PURE__ */ b("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ b("p", { children: [
          "Error: ",
          C
        ] }),
        /* @__PURE__ */ s(
          "button",
          {
            onClick: x,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      i && !u && /* @__PURE__ */ b(En, { children: [
        /* @__PURE__ */ b("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ s("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ s(
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
          /* @__PURE__ */ s("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ b("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ s("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ s(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: c,
              onChange: (E) => h(E.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: u
            }
          ),
          /* @__PURE__ */ s("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ s("div", { className: "chat-wrapper__dev-settings-info", children: /* @__PURE__ */ b("p", { children: [
          /* @__PURE__ */ s("strong", { children: "App:" }),
          " ",
          n
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ b("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ s(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: R,
          disabled: u,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ s(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: y,
          disabled: u || !i,
          children: u ? "Saving..." : "Save"
        }
      )
    ] })
  ] }) }) : null;
}, nu = ({ className: e, onClick: t }) => /* @__PURE__ */ b(
  "svg",
  {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: e,
    onClick: t,
    style: { cursor: "pointer" },
    children: [
      /* @__PURE__ */ s("mask", { id: "mask0_444_23118", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "18", height: "18", children: /* @__PURE__ */ s("rect", { width: "18", height: "18", fill: "#D9D9D9" }) }),
      /* @__PURE__ */ s("g", { mask: "url(#mask0_444_23118)", children: /* @__PURE__ */ s("path", { d: "M5.8498 13.4998C5.47855 13.4998 5.16074 13.3676 4.89637 13.1032C4.63199 12.8389 4.4998 12.5211 4.4998 12.1498V3.1498C4.4998 2.77855 4.63199 2.46074 4.89637 2.19637C5.16074 1.93199 5.47855 1.7998 5.8498 1.7998H14.8498C15.2211 1.7998 15.5389 1.93199 15.8032 2.19637C16.0676 2.46074 16.1998 2.77855 16.1998 3.1498V12.1498C16.1998 12.5211 16.0676 12.8389 15.8032 13.1032C15.5389 13.3676 15.2211 13.4998 14.8498 13.4998H5.8498ZM5.8498 12.1498H14.8498V3.1498H5.8498V12.1498ZM3.1498 16.1998C2.77855 16.1998 2.46074 16.0676 2.19637 15.8032C1.93199 15.5389 1.7998 15.2211 1.7998 14.8498V4.4998H3.1498V14.8498H13.4998V16.1998H3.1498Z", fill: "currentColor" }) })
    ]
  }
), ru = {
  maxReconnectAttempts: 5,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, iu = {
  NORMAL: 1e3,
  GOING_AWAY: 1001
};
var at = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(at || {}), wt = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e))(wt || {}), Ge = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(Ge || {}), xn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(xn || {}), Tt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(Tt || {});
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
    return this.createConnectionEvent(at.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(at.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(at.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(at.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(at.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(at.CHAT_ERROR, { error: t, errorCode: n });
  }
}
class bt {
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
class au {
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
    const { NORMAL: n, GOING_AWAY: r } = iu;
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
    const t = bt.serializeHeartbeatPing();
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
class lu {
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
class An {
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
class Sa {
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
class ou extends Sa {
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
    const c = An.createReasoningCall(
      i,
      a,
      l || {}
    );
    o(n, r, c);
  }
  handleReasoningStart(n) {
    const r = n.id || "reasoning";
    this.reasoningStartTimes.set(r, Date.now()), this.reasoningContent.set(r, "");
  }
  handleReasoningDelta(n) {
    if (!n.text) return;
    const r = n.id || "reasoning", a = (this.reasoningContent.get(r) || "") + n.text;
    this.reasoningContent.set(r, a);
    const l = `${F.THINKING_PREFIX} ${a}`;
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
    const o = i || F.UI_TEXT.THOUGHT, c = `${F.THOUGHT_PREFIX} ${o}${l}`;
    this.triggerReasoningUpdate(
      !1,
      c,
      r,
      "end",
      { duration: l, fullContent: i }
    ), this.reasoningContent.delete(r);
  }
  setReasoningUpdateHandler(n) {
    this.updateEventHandlers({ onReasoningUpdate: n });
  }
}
class su extends Sa {
  constructor(n = {}, r) {
    super({ onReasoningUpdate: r });
    ie(this, "processedToolCalls", /* @__PURE__ */ new Set());
    ie(this, "clientTools", {});
    ie(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var l, o, c;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (l = this.getHandler("onReasoningUpdate")) == null || l(!0, `${F.HANDLING_MARKER} ${i}`, n);
      try {
        const h = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, h), (o = this.getHandler("onReasoningUpdate")) == null || o(!1, `${F.COMPLETED_MARKER} ${i}`, n);
      } catch (h) {
        this.sendToolError(r, h), (c = this.getHandler("onReasoningUpdate")) == null || c(!1, `${F.ERROR_MARKER} Error: ${i} - ${h}`, n);
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
    const i = bt.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = bt.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = An.createLatitudeToolCall(
        n.toolName,
        n.toolCallId,
        n.args || {}
      );
      r(!0, `${F.HANDLING_MARKER} ${n.toolName}`, a);
    }
  }
  handleServerToolResult(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = An.createLatitudeToolCall(
        n.toolName,
        n.toolCallId
      );
      r(
        !1,
        `${F.COMPLETED_MARKER} ${n.toolName}`,
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
class cu {
  constructor(t, n = {}) {
    ie(this, "reasoningHandler");
    ie(this, "toolHandler");
    ie(this, "handlers");
    ie(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new ou(t.onReasoningUpdate), this.toolHandler = new su(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case Ge.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case Ge.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case Ge.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case Ge.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case Ge.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case Ge.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case Ge.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case Ge.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case Ge.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case Ge.HEARTBEAT_ACK:
          break;
        case Ge.ERROR:
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
      case Tt.TEXT_DELTA:
        t.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, t.data.textDelta));
        break;
      case Tt.REASONING_START:
        this.reasoningHandler.handleReasoningStart(t.data);
        break;
      case Tt.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(t.data);
        break;
      case Tt.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(t.data);
        break;
      case Tt.TOOL_CALL:
        this.toolHandler.handleServerToolCall(t.data);
        break;
      case Tt.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(t.data);
        break;
    }
  }
  handleLatitudeEvent(t) {
    var n;
    if (((n = t.data) == null ? void 0 : n.type) === Tt.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = t.data;
      if (r.toolCallId && r.toolName) {
        const i = An.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${F.COMPLETED_MARKER} ${r.toolName}`,
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
    const n = bt.serializeHeartbeatPong(
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
class uu {
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
      ...ru
    }, this.connectionState = new lu(), this.wsManager = new au(this.config, this.connectionState), this.messageHandler = new cu({}), this.setupWebSocketHandlers();
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
    (n == null ? void 0 : n.type) === Ge.TOOLS_CONFIGURED && ((r = this.initResolve) == null || r.call(this)), (n == null ? void 0 : n.type) === Ge.SESSION_ESTABLISHED && (!this.toolSchemas || this.toolSchemas.length === 0) && ((i = this.initResolve) == null || i.call(this));
  }
  handleConnectionOpen() {
    this.toolSchemas && this.toolSchemas.length > 0 && this.sendToolConfiguration();
  }
  sendToolConfiguration() {
    const t = bt.serializeConfigureTools(
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
      const o = bt.serializeChatMessage({
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
    const n = bt.serializeUpdateContextHelpers(this.contextHelpers);
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = bt.serializeUpdateTools(this.toolSchemas);
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
async function Eu(e, t, n) {
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
async function Su(e, t) {
  const n = `${e}/threads/conv/${t}`, r = await fetch(n);
  if (!r.ok) {
    const i = await r.json().catch(() => ({
      error: "Thread not found"
    }));
    throw new Error(i.error || "Thread not found");
  }
  return r.json();
}
async function hu(e, t) {
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
async function ku(e, t) {
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
async function Tu(e, t, n, r) {
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
const ka = fr(
  ({
    message: e,
    getReasoningTitle: t,
    getReasoningStatus: n,
    getReasoningDuration: r,
    getReasoningContentOnly: i,
    getToolingTitle: a,
    getToolingStatus: l,
    clientTools: o,
    currentAssistantMessageIdRef: c
  }) => {
    var x;
    const [h, u] = K(!1), [d, C] = K(!1), p = ue(async () => {
      try {
        await navigator.clipboard.writeText(e.content), u(!0), setTimeout(() => u(!1), 2e3);
      } catch (y) {
        console.error("Failed to copy message:", y);
      }
    }, [e.content]);
    return /* @__PURE__ */ s(
      "div",
      {
        className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
        onMouseEnter: () => e.role === "assistant" && C(!0),
        onMouseLeave: () => e.role === "assistant" && C(!1),
        children: e.role === "reasoning" ? (
          /* Reasoning message - no content wrapper */
          /* @__PURE__ */ b(Xc, { isStreaming: e.isStreaming || !1, children: [
            /* @__PURE__ */ s(
              _a,
              {
                title: t(e.content, e.isStreaming),
                status: n(e.content, e.isStreaming),
                duration: r(e.content)
              }
            ),
            /* @__PURE__ */ s(xa, { children: i(e.content) })
          ] })
        ) : e.role === "tooling" ? (
          /* Tooling message - no content wrapper */
          /* @__PURE__ */ s(Yc, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ s(
            Kc,
            {
              title: a(e.content, e.isStreaming),
              status: l(e.content, e.isStreaming),
              toolData: e.toolData,
              toolName: (x = e.toolData) == null ? void 0 : x.toolName,
              clientTools: o
            }
          ) })
        ) : /* @__PURE__ */ s("div", { className: "chat-wrapper__message-content", children: e.role === "assistant" && e.isStreaming && e.content === "" && e.id === c.current ? (
          /* Show streaming indicator when no content yet */
          /* @__PURE__ */ b("div", { className: "chat-wrapper__streaming-placeholder", children: [
            /* @__PURE__ */ s(Ea, { size: 16, variant: "dots" }),
            /* @__PURE__ */ s("span", { children: F.UI_TEXT.THINKING })
          ] })
        ) : e.role === "system" ? (
          /* System message with collapsible tool result */
          /* @__PURE__ */ s(pu, { message: e })
        ) : e.role === "assistant" ? (
          /* Assistant message with regular markdown display */
          /* @__PURE__ */ b("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: [
            d && /* @__PURE__ */ s(
              "button",
              {
                className: "chat-wrapper__copy-button",
                onClick: p,
                title: "Copy message",
                children: /* @__PURE__ */ s(nu, {})
              }
            ),
            h && /* @__PURE__ */ s("div", { className: "chat-wrapper__copied-notification", children: "Copied!" }),
            /* @__PURE__ */ s("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ s(
              bn,
              {
                components: {
                  pre: ({ children: y }) => /* @__PURE__ */ s("pre", { className: "chat-wrapper__code-block", children: y }),
                  code: ({ children: y, className: R }) => !R ? /* @__PURE__ */ s("code", { className: "chat-wrapper__inline-code", children: y }) : /* @__PURE__ */ s("code", { className: "chat-wrapper__code-block", children: y }),
                  ul: ({ children: y }) => /* @__PURE__ */ s("ul", { className: "chat-wrapper__list", children: y }),
                  ol: ({ children: y }) => /* @__PURE__ */ s("ol", { className: "chat-wrapper__ordered-list", children: y }),
                  li: ({ children: y }) => /* @__PURE__ */ s("li", { className: "chat-wrapper__list-item", children: y })
                },
                children: e.content
              }
            ) })
          ] })
        ) : (
          /* User message display with markdown */
          /* @__PURE__ */ b("div", { className: "chat-wrapper__regular-message", children: [
            /* @__PURE__ */ s("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ s(
              bn,
              {
                components: {
                  pre: ({ children: y }) => /* @__PURE__ */ s("pre", { className: "chat-wrapper__code-block", children: y }),
                  code: ({ children: y, className: R }) => !R ? /* @__PURE__ */ s("code", { className: "chat-wrapper__inline-code", children: y }) : /* @__PURE__ */ s("code", { className: "chat-wrapper__code", children: y }),
                  p: ({ children: y }) => /* @__PURE__ */ s("p", { className: "chat-wrapper__paragraph", children: y }),
                  h1: ({ children: y }) => /* @__PURE__ */ s("h1", { className: "chat-wrapper__heading-1", children: y }),
                  h2: ({ children: y }) => /* @__PURE__ */ s("h2", { className: "chat-wrapper__heading-2", children: y }),
                  h3: ({ children: y }) => /* @__PURE__ */ s("h3", { className: "chat-wrapper__heading-3", children: y }),
                  ul: ({ children: y }) => /* @__PURE__ */ s("ul", { className: "chat-wrapper__list", children: y }),
                  ol: ({ children: y }) => /* @__PURE__ */ s("ol", { className: "chat-wrapper__ordered-list", children: y }),
                  li: ({ children: y }) => /* @__PURE__ */ s("li", { className: "chat-wrapper__list-item", children: y }),
                  blockquote: ({ children: y }) => /* @__PURE__ */ s("blockquote", { className: "chat-wrapper__blockquote", children: y }),
                  strong: ({ children: y }) => /* @__PURE__ */ s("strong", { className: "chat-wrapper__bold", children: y }),
                  em: ({ children: y }) => /* @__PURE__ */ s("em", { className: "chat-wrapper__italic", children: y })
                },
                children: e.content.trim()
              }
            ) }),
            e.role === "user" && e.media && e.media.length > 0 && /* @__PURE__ */ s(
              "div",
              {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "4px",
                  justifyContent: "flex-end"
                },
                children: e.media.map((y, R) => {
                  const E = y.startsWith("data:image/"), z = y.startsWith("http://") || y.startsWith("https://");
                  return /* @__PURE__ */ s(
                    "div",
                    {
                      style: {
                        position: "relative",
                        display: "inline-block"
                      },
                      children: E || z ? /* @__PURE__ */ b(
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
                            /* @__PURE__ */ s(
                              "img",
                              {
                                src: y,
                                alt: `Attachment ${R + 1}`,
                                style: {
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover"
                                }
                              }
                            ),
                            /* @__PURE__ */ s(
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
                      ) : /* @__PURE__ */ b(
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
                            /* @__PURE__ */ s(
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
                                children: /* @__PURE__ */ b(
                                  "svg",
                                  {
                                    width: "24",
                                    height: "25",
                                    viewBox: "0 0 24 25",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: [
                                      /* @__PURE__ */ s(
                                        "mask",
                                        {
                                          id: "mask0_190_623",
                                          style: { maskType: "alpha" },
                                          maskUnits: "userSpaceOnUse",
                                          x: "0",
                                          y: "0",
                                          width: "24",
                                          height: "25",
                                          children: /* @__PURE__ */ s(
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
                                      /* @__PURE__ */ s("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ s(
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
                            /* @__PURE__ */ b("div", { style: { flex: 1, minWidth: 0 }, children: [
                              /* @__PURE__ */ s(
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
                                    const P = y.match(/name=([^;]+)/);
                                    return P ? decodeURIComponent(P[1]) : "document.pdf";
                                  })()
                                }
                              ),
                              /* @__PURE__ */ s(
                                "div",
                                {
                                  style: {
                                    color: "#9ca3af",
                                    fontSize: "12px",
                                    textTransform: "uppercase"
                                  },
                                  children: (() => {
                                    const P = y.match(/data:([^;]+)/);
                                    if (P) {
                                      const Z = P[1];
                                      switch (Z) {
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
                                          const w = Z.split("/")[1];
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
                    R
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
ka.displayName = "MessageComponent";
const Ta = fr(
  ({ content: e, messageId: t }) => !t || !e ? null : /* @__PURE__ */ s("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__message-content", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ s(
    bn,
    {
      components: {
        pre: ({ children: n }) => /* @__PURE__ */ s("pre", { className: "chat-wrapper__code-block", children: n }),
        code: ({ children: n, className: r }) => !r ? /* @__PURE__ */ s("code", { className: "chat-wrapper__inline-code", children: n }) : /* @__PURE__ */ s("code", { className: "chat-wrapper__code-block", children: n }),
        ul: ({ children: n }) => /* @__PURE__ */ s("ul", { className: "chat-wrapper__list", children: n }),
        ol: ({ children: n }) => /* @__PURE__ */ s("ol", { className: "chat-wrapper__ordered-list", children: n }),
        li: ({ children: n }) => /* @__PURE__ */ s("li", { className: "chat-wrapper__list-item", children: n })
      },
      children: e
    }
  ) }) }) }) })
);
Ta.displayName = "StreamingMessage";
function pu({ message: e }) {
  const [t, n] = K(!0);
  return /* @__PURE__ */ b("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ s(
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
        children: e.role === "system" ? /* @__PURE__ */ b("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ b(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ s(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ s("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ s("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ s(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ b("span", { children: [
            "AI text input <show-toolname>",
            "..."
          ] }),
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ b(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ s(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ s("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ s("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ s(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ b(
            "svg",
            {
              width: "16",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ s(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ s("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ s("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ s(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ s("span", { children: "Pending..." })
        ] }) : e.role === "assistant" ? e.isStreaming ? /* @__PURE__ */ b("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s(
            "svg",
            {
              width: "10",
              height: "14",
              viewBox: "0 0 10 14",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ s(
                "path",
                {
                  d: "M3.79576 11.3819C3.46532 11.3819 3.18343 11.2644 2.9501 11.0294C2.71676 10.7944 2.6001 10.5119 2.6001 10.1819V9.06527C1.96676 8.65082 1.4751 8.11943 1.1251 7.4711C0.775098 6.82277 0.600098 6.12638 0.600098 5.38193C0.600098 4.15627 1.02665 3.11649 1.87976 2.2626C2.73288 1.40882 3.77176 0.981934 4.99643 0.981934C6.2211 0.981934 7.26121 1.40882 8.11676 2.2626C8.97232 3.11649 9.4001 4.15627 9.4001 5.38193C9.4001 6.12438 9.2251 6.8211 8.8751 7.4721C8.5251 8.1231 8.03343 8.65416 7.4001 9.06527V10.1819C7.4001 10.5119 7.28243 10.7944 7.0471 11.0294C6.81188 11.2644 6.52904 11.3819 6.1986 11.3819H3.79576ZM3.8001 10.1819H6.2001V8.41527L6.7501 8.06527C7.20565 7.77638 7.56121 7.39204 7.81676 6.91227C8.07232 6.43249 8.2001 5.92238 8.2001 5.38193C8.2001 4.4966 7.88771 3.74193 7.26293 3.11793C6.63826 2.49393 5.88271 2.18193 4.99626 2.18193C4.10993 2.18193 3.35565 2.49393 2.73343 3.11793C2.11121 3.74193 1.8001 4.4966 1.8001 5.38193C1.8001 5.92238 1.92788 6.43249 2.18343 6.91227C2.43899 7.39204 2.79454 7.77638 3.2501 8.06527L3.8001 8.41527V10.1819ZM3.8001 13.7819C3.57343 13.7819 3.38343 13.7053 3.2301 13.5519C3.07676 13.3986 3.0001 13.2086 3.0001 12.9819V12.5819H7.0001V12.9819C7.0001 13.2086 6.92343 13.3986 6.7701 13.5519C6.61676 13.7053 6.42676 13.7819 6.2001 13.7819H3.8001Z",
                  fill: "#637381"
                }
              )
            }
          ) }),
          /* @__PURE__ */ s("span", { children: F.UI_TEXT.THINKING_ELLIPSIS }),
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ b(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ s(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ s(
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
                /* @__PURE__ */ s("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ s(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) })
        ] }) : /* @__PURE__ */ b("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ s(
                "path",
                {
                  d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z",
                  fill: "#10b981"
                }
              )
            }
          ) }),
          /* @__PURE__ */ s("span", { children: "Thought" }),
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ b(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ s(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ s(
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
                /* @__PURE__ */ s("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ s(
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
    t && /* @__PURE__ */ s(
      "div",
      {
        className: "chat-wrapper__system-message-content",
        style: {
          padding: "0 12px 12px 0px"
        },
        children: /* @__PURE__ */ s("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ s(
          bn,
          {
            components: {
              pre: ({ children: i }) => /* @__PURE__ */ s("pre", { className: "chat-wrapper__code-block", children: i }),
              code: ({ children: i, className: a }) => !a ? /* @__PURE__ */ s("code", { className: "chat-wrapper__inline-code", children: i }) : /* @__PURE__ */ s("code", { className: "chat-wrapper__code", children: i }),
              p: ({ children: i }) => /* @__PURE__ */ s("p", { className: "chat-wrapper__paragraph", children: i }),
              strong: ({ children: i }) => /* @__PURE__ */ s("strong", { className: "chat-wrapper__bold", children: i }),
              em: ({ children: i }) => /* @__PURE__ */ s("em", { className: "chat-wrapper__italic", children: i })
            },
            children: e.content.trim()
          }
        ) })
      }
    )
  ] });
}
function du({
  apiUrl: e,
  config: t,
  tools: n,
  clientTools: r,
  initialMessages: i = [],
  userId: a,
  devMode: l = !1,
  app: o,
  contextHelpers: c
}) {
  var Zt;
  const h = ue((A) => A.replace(
    /^wss?:\/\//,
    (D) => D === "wss://" ? "https://" : "http://"
  ), []), u = Rt(() => h(e), [e, h]), [d, C] = K(
    null
  ), [p, x] = K(!1), y = Ct(null), [R, E] = K(i), [z, N] = K(!1), [P, Z] = K(!1), [w, U] = K("idle"), [G, $] = K(!1), [O, I] = K(t.mode), [L, X] = K(!1), [le, q] = K(
    null
  ), [xe, me] = K(null), [Te, $e] = K(null), [g] = K([]), [J, Ie] = K(""), [f, ge] = K(!1), [, te] = K(""), [ae, Fe] = K(""), [Ee, Ke] = K(!1), [, Qe] = K(
    /* @__PURE__ */ new Map()
  ), [, ht] = K(
    /* @__PURE__ */ new Map()
  ), [Mt, Je] = K(!1), pt = Ct(null), Oe = Ct(null), Re = Ct(null), _t = Ct(!0), Ne = Ct(""), et = Ct(!1), Le = ue(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), Ot = Rt(
    () => (A, D) => D === !1 ? ke.isErrorMessage(A) ? "error" : "completed" : ke.isCompletedMessage(A) ? "completed" : ke.isErrorMessage(A) ? "error" : "processing",
    []
  ), Dt = Rt(
    () => (A) => ke.extractDuration(A),
    []
  ), Wt = Rt(
    () => (A) => ke.cleanReasoningContent(A),
    []
  ), vt = Rt(
    () => (A, D) => {
      switch (console.log("🔍 getReasoningTitle:", { content: A, isStreaming: D }), ke.getMessageType(A, D)) {
        case F.MESSAGE_TYPES.ERROR:
          return "Error";
        case F.MESSAGE_TYPES.COMPLETED:
          return "Completed";
        case F.MESSAGE_TYPES.THOUGHT:
          return F.UI_TEXT.THOUGHT;
        case F.MESSAGE_TYPES.THINKING:
        default:
          return F.UI_TEXT.THINKING_ELLIPSIS;
      }
    },
    []
  ), dt = Rt(
    () => (A, D) => D === !1 ? A.includes(F.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : A.includes(F.COMPLETED_MARKER) || A.includes("✅") ? "Tool Completed" : A.includes(F.ERROR_MARKER) ? "Tool Error" : (A.includes(F.HANDLING_MARKER), "Tool Processing..."),
    []
  ), _ = Rt(
    () => (A, D) => D === !1 ? A.includes(F.ERROR_MARKER) ? "error" : "completed" : A.includes(F.COMPLETED_MARKER) || A.includes("✅") ? "completed" : A.includes(F.ERROR_MARKER) ? "error" : "processing",
    []
  ), k = ue(
    (A, D) => {
      const V = _n(D, A === "assistant");
      E((ce) => [
        ...ce,
        {
          id: Le(),
          role: A,
          content: V,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [Le]
  ), H = ue(() => {
    if (Re.current && Ne.current) {
      const A = _n(
        Ne.current,
        !0
      ), D = {
        id: Re.current,
        role: "assistant",
        content: A,
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !1
      };
      return E((Q) => [...Q, D]), Re.current = null, Ne.current = "", Fe(""), !0;
    }
    return !1;
  }, []), j = ue(() => {
    N(!1), ge(!1), U("idle"), H(), setTimeout(() => {
      var A;
      (A = Oe.current) == null || A.focus();
    }, 0);
  }, [H]), ee = ue(
    (A) => {
      console.error("Chat error:", A), N(!1), ge(!1), U("error"), H(), k("system", `❌ Chat error: ${A}`);
    },
    [k, H]
  ), Se = ue(async () => {
    try {
      const A = new uu();
      y.current = A, C(A);
      const D = c || {};
      await A.onInit({
        apiUrl: e,
        userId: a,
        toolSchemas: r,
        clientTools: n,
        contextHelpers: D,
        onSetMessage: (Q) => {
          const V = _n(Q, !0);
          if (Re.current)
            Ne.current += V, Fe(Ne.current);
          else {
            ge(!1);
            const ce = Le();
            Re.current = ce, Ne.current = V, Fe(V);
          }
        },
        onSystemEvent: (Q) => {
          var V;
          switch (Q.type) {
            case at.CHAT_COMPLETED:
              j();
              break;
            case at.CHAT_ERROR:
              (V = Q.data) != null && V.error && ee(Q.data.error);
              break;
            case at.CONNECTION_LOST:
              break;
            case at.CONNECTION_RESTORED:
              break;
            default:
              break;
          }
        },
        onReasoningUpdate: (Q, V, ce) => {
          console.log("🤔 Reasoning update:", {
            isThinking: Q,
            content: V,
            toolCallRequest: ce
          });
          const { callId: we } = ce || {};
          if (Ke(Q), te(V), !we) {
            console.log("⚠️ No callId provided for reasoning update");
            return;
          }
          const ze = !1, de = ke.isThinkingMessage(V) && !V.includes("for") && !V.includes("seconds"), qe = ke.isThinkingMessage(V) && V.includes("for") && V.includes("seconds"), ft = ke.isHandlingMessage(V), St = ke.isCompletedMessage(V), mt = ke.isErrorMessage(V);
          console.log("🔍 Debug reasoning conditions:", {
            isReasoningStarted: ze,
            isReasoningThinking: de,
            isReasoningCompleted: qe,
            isToolStarted: ft,
            isToolCompleted: St,
            isToolError: mt,
            callId: we,
            isHandlingTool: Ee
          }), (de || qe) && ht((qt) => {
            const M = new Map(qt), m = M.get(we);
            if (de && !m) {
              H();
              const S = Le();
              M.set(we, S);
              const v = {
                id: S,
                role: "reasoning",
                content: V,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0
              };
              E((ne) => [...ne, v]);
            } else qe && m ? (E(
              (S) => S.map(
                (v) => v.id === m ? {
                  ...v,
                  content: V,
                  isStreaming: !1
                  // Mark as completed
                } : v
              )
            ), M.delete(we)) : m && de && E(
              (S) => S.map(
                (v) => v.id === m ? {
                  ...v,
                  content: V,
                  isStreaming: !0
                } : v
              )
            );
            return M;
          }), Qe((qt) => {
            const M = new Map(qt), m = M.get(we);
            if (ft && !m) {
              H();
              const S = V.match(F.PATTERNS.HANDLING_TOOL), v = S ? S[1] : "Unknown Tool", ne = Le();
              M.set(we, ne);
              const he = {
                id: ne,
                role: "tooling",
                content: V,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0,
                toolData: {
                  ...ce,
                  toolName: v,
                  callId: we,
                  status: "processing"
                }
              };
              E((fe) => [...fe, he]);
            } else if ((St || mt) && m) {
              const S = V.match(
                F.PATTERNS.COMPLETED_OR_ERROR_TOOL
              ), v = S ? S[1] : "Unknown Tool";
              E(
                (ne) => ne.map(
                  (he) => he.id === m ? {
                    ...he,
                    content: V,
                    isStreaming: !1,
                    // Mark as completed
                    toolData: {
                      ...he.toolData,
                      toolName: v,
                      status: mt ? "error" : "completed",
                      callId: we ?? ""
                    }
                  } : he
                )
              ), M.delete(we);
            } else m && Ee && !St && !mt && E(
              (S) => S.map(
                (v) => v.id === m ? {
                  ...v,
                  content: V,
                  isStreaming: !0
                } : v
              )
            );
            return M;
          });
        }
      }), x(!0), console.log("WebSocketChatClient connected");
    } catch (A) {
      console.error("Error connecting WebSocketChatClient:", A), x(!1);
    }
  }, [
    e,
    r,
    n,
    t,
    Le,
    k,
    j,
    ee,
    H
  ]), Ze = ue(() => {
    y.current && (y.current.disconnect(), y.current = null), C(null), x(!1);
  }, []), be = ue(() => {
    console.log("🔍 DEBUG: resetToolHandling called! Stack trace:"), console.trace(), Ke(!1), _t.current = !0;
  }, []), Ae = Ct(null), Ce = ue(() => {
    Ae.current && cancelAnimationFrame(Ae.current), Ae.current = requestAnimationFrame(() => {
      var A;
      (A = pt.current) == null || A.scrollIntoView({ behavior: "smooth" }), Ae.current = null;
    });
  }, []);
  st(() => {
    Ce();
  }, [R, Ce]), st(() => {
    ae && Ce();
  }, [ae, Ce]), st(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(J);
  }, [J, t]), st(() => (console.log("Connecting WebSocketChatClient..."), Se(), () => {
    Ze(), Ae.current && cancelAnimationFrame(Ae.current);
  }), [Se, Ze]), st(() => {
    const A = setInterval(() => {
      if (y.current) {
        const D = y.current.getConnectionStatus();
        x(D.connected);
      }
    }, 1e3);
    return () => clearInterval(A);
  }, []), st(() => {
    (async () => {
      if (a && !et.current && !L && !(R.length > 0))
        try {
          X(!0), q(null), console.log(`📚 Fetching threads for user: ${a}`);
          const D = [];
          if (D.length === 0) {
            console.log("ℹ️ No threads found for user"), X(!1), et.current = !0;
            return;
          }
          const Q = D[0];
          console.log(
            `📖 Loading thread: ${Q.id} (${Q.title})`
          ), me(Q.id), $e(Q.convUuid);
          const V = await hu(
            u,
            Q.id
          );
          console.log(`✅ Loaded ${V.length} messages`), E(V), et.current = !0;
        } catch (D) {
          console.error("❌ Error loading conversation:", D), q(
            D instanceof Error ? D.message : "Failed to load conversation"
          ), et.current = !0;
        } finally {
          X(!1);
        }
    })();
  }, [a, u]);
  const pe = ue(
    async (A, D) => {
      if (!A.trim() || z || !d || !p)
        return;
      const Q = {
        id: Le(),
        role: "user",
        content: A.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: D
      };
      E((V) => [...V, Q]), N(!0), ge(!0), U("submitted"), Ie("Starting...");
      try {
        await d.onTriggerMessage({
          message: Q.content,
          app: o,
          media: D,
          convUuid: Te || void 0,
          agentPromptPath: void 0
        }), U("streaming");
      } catch (V) {
        console.error("Agent client send error:", V), ge(!1), U("error"), k(
          "system",
          `Sorry, there was an error: ${V instanceof Error ? V.message : "Unknown error"}`
        ), t.onError && t.onError(
          V instanceof Error ? V : new Error("Unknown error")
        ), N(!1), U("idle"), Ie("");
      }
    },
    [
      z,
      d,
      p,
      Le,
      k,
      t,
      Te
    ]
  ), tt = ue(() => {
    N(!1), U("idle"), Ie(""), ge(!1), te(""), Re.current = null, Ne.current = "", Fe(""), be();
  }, [be]), De = ue(
    async (A) => {
      console.log("Files selected:", A);
      const D = [], Q = e, V = "chat-uploads";
      for (const ce of A)
        try {
          const we = new FormData();
          we.append("file", ce), we.append("folder", V), console.log(`Uploading file: ${ce.name} to ${Q}/upload`);
          const ze = await fetch(`${Q}/upload`, {
            method: "POST",
            body: we
          }), de = await ze.json();
          if (ze.ok)
            console.log("✅ Upload successful:", de), ce.type.startsWith("image/") ? D.push(de.url) : D.push(
              `data:${ce.type};name=${encodeURIComponent(
                de.fileName || ce.name
              )};url=${encodeURIComponent(de.url)}`
            );
          else if (console.error("❌ Upload failed:", de.error), ce.type.startsWith("image/")) {
            const qe = new FileReader(), ft = await new Promise(
              (St, mt) => {
                qe.onload = () => St(qe.result), qe.onerror = mt, qe.readAsDataURL(ce);
              }
            );
            D.push(ft);
          } else
            D.push(
              `data:${ce.type};name=${encodeURIComponent(
                ce.name
              )};base64,placeholder`
            );
        } catch (we) {
          console.error("Error uploading file:", we);
          try {
            if (ce.type.startsWith("image/")) {
              const ze = new FileReader(), de = await new Promise(
                (qe, ft) => {
                  ze.onload = () => qe(ze.result), ze.onerror = ft, ze.readAsDataURL(ce);
                }
              );
              D.push(de);
            } else
              D.push(
                `data:${ce.type};name=${encodeURIComponent(
                  ce.name
                )};base64,placeholder`
              );
          } catch (ze) {
            console.error("Error in fallback encoding:", ze);
          }
        }
      return console.log("Added media:", D), D;
    },
    [e]
  ), Ln = ue(() => {
    Z(!0);
  }, []), xt = ue(() => {
    Z(!1);
  }, []), It = ue(() => {
    $((A) => !A);
  }, []), Mn = ue(() => {
    I((A) => A === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  st(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const A = (D) => {
      D.key === "Escape" && O === "modal" && P && xt();
    };
    if (O === "modal" && P)
      return document.addEventListener("keydown", A), () => document.removeEventListener("keydown", A);
  }, [O, P, xt]);
  const On = ((...A) => A.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${O}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`,
    G && "chat-wrapper--collapsed",
    O === "embedded" && t.constrainedHeight && "chat-wrapper--constrained"
  ), cn = () => {
    var D;
    if (O === "modal" && !P || O === "sidebar" && G || O === "fullscreen" && G) {
      const Q = O === "modal" ? Ln : It, V = O === "modal" ? `Open ${t.appName}` : `Expand ${t.appName}`;
      return /* @__PURE__ */ b(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: Q,
          title: V,
          children: [
            /* @__PURE__ */ b(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: "chat-wrapper__bubble-icon",
                children: [
                  /* @__PURE__ */ s(
                    "path",
                    {
                      d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
                      fill: "currentColor"
                    }
                  ),
                  /* @__PURE__ */ s("circle", { cx: "7", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ s("circle", { cx: "12", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ s("circle", { cx: "17", cy: "10", r: "1", fill: "currentColor" })
                ]
              }
            ),
            ((D = t.features) == null ? void 0 : D.showBubbleText) !== !1 && /* @__PURE__ */ s("span", { className: "chat-wrapper__bubble-text", children: t.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, ye = () => O === "modal" && P ? /* @__PURE__ */ s(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: xt,
      title: "Close chat",
      children: /* @__PURE__ */ s(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ s(
            "path",
            {
              d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
              fill: "currentColor"
            }
          )
        }
      )
    }
  ) : null, Et = () => {
    if ((O === "sidebar" || O === "fullscreen") && !G) {
      const A = O === "fullscreen";
      return /* @__PURE__ */ s(
        "button",
        {
          className: A ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: Mn,
          title: A ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ s(
            "svg",
            {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: A ? (
                // Minimize icon (arrows pointing inward)
                /* @__PURE__ */ s(
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
                /* @__PURE__ */ s(
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
  }, Dn = () => (O === "sidebar" || O === "fullscreen") && !G ? /* @__PURE__ */ s(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: It,
      title: "Collapse chat",
      children: /* @__PURE__ */ s(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ s(
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
  ) : null, un = () => l && t.headerVisible !== !1 ? /* @__PURE__ */ s(
    "button",
    {
      className: "chat-wrapper__settings-button",
      onClick: () => Je(!0),
      title: "Developer Settings",
      children: /* @__PURE__ */ s(
        "svg",
        {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ s(
            "path",
            {
              d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
              fill: "currentColor"
            }
          )
        }
      )
    }
  ) : null, $t = () => !l || t.headerVisible !== !1 ? null : /* @__PURE__ */ s(
    "button",
    {
      className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
      onClick: () => Je(!0),
      title: "Developer Settings",
      children: /* @__PURE__ */ s(
        "svg",
        {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ s(
            "path",
            {
              d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
              fill: "currentColor"
            }
          )
        }
      )
    }
  ), hn = () => {
    var A;
    return !((A = t.features) != null && A.showToolResults) || g.length === 0 ? null : /* @__PURE__ */ b("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ s("h4", { children: "Tool Results" }),
      /* @__PURE__ */ s("div", { className: "chat-wrapper__tool-results-list", children: g.map((D) => /* @__PURE__ */ b("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ s("div", { className: "chat-wrapper__tool-result-title", children: D.title }),
        D.description && /* @__PURE__ */ s("div", { className: "chat-wrapper__tool-result-description", children: D.description }),
        /* @__PURE__ */ b("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          D.status || "completed"
        ] })
      ] }, D.id)) })
    ] });
  };
  return O === "modal" && !P || (O === "sidebar" || O === "fullscreen") && G ? cn() : /* @__PURE__ */ s(En, { children: /* @__PURE__ */ b("div", { className: On, style: t.customStyles, children: [
    $t(),
    t.headerVisible !== !1 && /* @__PURE__ */ b("div", { className: "chat-wrapper__header", children: [
      /* @__PURE__ */ s("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ s("h2", { className: "chat-wrapper__title", children: t.appName }) }),
      /* @__PURE__ */ b("div", { className: "chat-wrapper__header-controls", children: [
        un(),
        Et(),
        Dn(),
        ye()
      ] })
    ] }),
    !G && /* @__PURE__ */ b(En, { children: [
      le && /* @__PURE__ */ s("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ b("p", { children: [
        "⚠️ ",
        le
      ] }) }),
      R.length === 0 && !z && !L && /* @__PURE__ */ b("div", { className: "chat-wrapper__main-header", children: [
        /* @__PURE__ */ s("h1", { className: "chat-wrapper__main-title", children: t.appName }),
        t.description && /* @__PURE__ */ s("p", { className: "chat-wrapper__description", children: t.description })
      ] }),
      /* @__PURE__ */ b(
        "div",
        {
          className: `chat-wrapper__content ${R.length === 0 && !z && !L ? "chat-wrapper__content--empty" : "chat-wrapper__content--with-messages"}`,
          children: [
            /* @__PURE__ */ b("div", { className: "chat-wrapper__messages", children: [
              L && R.length === 0 && /* @__PURE__ */ s(Qc, { fullHeight: !0 }),
              R.map((A) => /* @__PURE__ */ s(
                ka,
                {
                  message: A,
                  getReasoningTitle: vt,
                  getReasoningStatus: Ot,
                  getReasoningDuration: Dt,
                  getReasoningContentOnly: Wt,
                  getToolingTitle: dt,
                  getToolingStatus: _,
                  clientTools: r || [],
                  currentAssistantMessageIdRef: Re
                },
                A.id
              )),
              Re.current && ae && /* @__PURE__ */ s(
                Ta,
                {
                  content: ae,
                  messageId: Re.current
                }
              ),
              f && !Ee && /* @__PURE__ */ s("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ b("div", { className: "chat-wrapper__thinking-dots", children: [
                /* @__PURE__ */ s("span", {}),
                /* @__PURE__ */ s("span", {}),
                /* @__PURE__ */ s("span", {})
              ] }) }) }) }),
              /* @__PURE__ */ s("div", { ref: pt })
            ] }),
            hn(),
            /* @__PURE__ */ s("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ s(
              Zc,
              {
                ref: Oe,
                placeholder: t.placeholder,
                placeholderTexts: t.placeholderTexts,
                disabled: z,
                chatStatus: w,
                fileUploadEnabled: (Zt = t.features) == null ? void 0 : Zt.fileUpload,
                restaurantName: t.restaurantName,
                restaurantLogo: t.restaurantLogo,
                hasMessages: R.length > 0,
                onSubmit: (A, D) => pe(A, D),
                onFileUpload: De,
                onStopGeneration: tt
              }
            ) }),
            R.length === 0 && !z && !L && t.suggestedPrompts && /* @__PURE__ */ s(
              qc,
              {
                prompts: t.suggestedPrompts,
                onPromptSelect: (A) => {
                  Oe.current && Oe.current.setText(A.description);
                }
              }
            )
          ]
        }
      )
    ] }),
    t.onError && /* @__PURE__ */ s("div", { className: "chat-wrapper__error-boundary" }),
    /* @__PURE__ */ s(
      tu,
      {
        isOpen: Mt,
        onClose: () => Je(!1),
        app: o,
        apiUrl: e
      }
    )
  ] }) });
}
const bu = fr(du);
export {
  xc as AnimatedPlaceholder,
  bu as ChatWrapper,
  tu as DevSettings,
  Qc as InlineLoader,
  Ea as Loader,
  gc as PromptInput,
  wc as PromptInputButton,
  Cu as PromptInputModelSelect,
  wu as PromptInputModelSelectContent,
  _u as PromptInputModelSelectItem,
  yu as PromptInputModelSelectTrigger,
  xu as PromptInputModelSelectValue,
  _c as PromptInputSubmit,
  ma as PromptInputTextarea,
  Cc as PromptInputToolbar,
  yc as PromptInputTools,
  Xc as Reasoning,
  xa as ReasoningContent,
  _a as ReasoningTrigger,
  qc as SuggestedPrompts,
  Tu as createThread,
  ku as fetchMessagesByConvUuid,
  Su as fetchThreadByConvUuid,
  hu as fetchThreadMessages,
  Eu as fetchUserThreads
};
