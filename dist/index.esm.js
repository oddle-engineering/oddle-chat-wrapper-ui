var ma = Object.defineProperty;
var ga = (e, t, n) => t in e ? ma(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var se = (e, t, n) => ga(e, typeof t != "symbol" ? t + "" : t, n);
import { jsxs as v, jsx as c, Fragment as hn } from "react/jsx-runtime";
import Lt, { forwardRef as ki, useState as Z, useEffect as Ke, useRef as it, useImperativeHandle as Ca, useCallback as ce, memo as rr, useMemo as St } from "react";
function ya(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const wa = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, xa = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ka = {};
function _r(e, t) {
  return (ka.jsx ? xa : wa).test(e);
}
const _a = /[ \t\n\f\r]/g;
function ba(e) {
  return typeof e == "object" ? e.type === "text" ? br(e.value) : !1 : br(e);
}
function br(e) {
  return e.replace(_a, "") === "";
}
class Jt {
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
Jt.prototype.normal = {};
Jt.prototype.property = {};
Jt.prototype.space = void 0;
function _i(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new Jt(n, r, t);
}
function jn(e) {
  return e.toLowerCase();
}
class Ve {
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
Ve.prototype.attribute = "";
Ve.prototype.booleanish = !1;
Ve.prototype.boolean = !1;
Ve.prototype.commaOrSpaceSeparated = !1;
Ve.prototype.commaSeparated = !1;
Ve.prototype.defined = !1;
Ve.prototype.mustUseProperty = !1;
Ve.prototype.number = !1;
Ve.prototype.overloadedBoolean = !1;
Ve.prototype.property = "";
Ve.prototype.spaceSeparated = !1;
Ve.prototype.space = void 0;
let Sa = 0;
const W = Et(), we = Et(), $n = Et(), T = Et(), pe = Et(), Dt = Et(), Ye = Et();
function Et() {
  return 2 ** ++Sa;
}
const Wn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: W,
  booleanish: we,
  commaOrSpaceSeparated: Ye,
  commaSeparated: Dt,
  number: T,
  overloadedBoolean: $n,
  spaceSeparated: pe
}, Symbol.toStringTag, { value: "Module" })), En = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Wn)
);
class ir extends Ve {
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
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[jn(r)] = r, n[jn(a.attribute)] = r;
  }
  return new Jt(t, n, e.space);
}
const bi = Pt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: we,
    ariaAutoComplete: null,
    ariaBusy: we,
    ariaChecked: we,
    ariaColCount: T,
    ariaColIndex: T,
    ariaColSpan: T,
    ariaControls: pe,
    ariaCurrent: null,
    ariaDescribedBy: pe,
    ariaDetails: null,
    ariaDisabled: we,
    ariaDropEffect: pe,
    ariaErrorMessage: null,
    ariaExpanded: we,
    ariaFlowTo: pe,
    ariaGrabbed: we,
    ariaHasPopup: null,
    ariaHidden: we,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: pe,
    ariaLevel: T,
    ariaLive: null,
    ariaModal: we,
    ariaMultiLine: we,
    ariaMultiSelectable: we,
    ariaOrientation: null,
    ariaOwns: pe,
    ariaPlaceholder: null,
    ariaPosInSet: T,
    ariaPressed: we,
    ariaReadOnly: we,
    ariaRelevant: null,
    ariaRequired: we,
    ariaRoleDescription: pe,
    ariaRowCount: T,
    ariaRowIndex: T,
    ariaRowSpan: T,
    ariaSelected: we,
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
    acceptCharset: pe,
    accessKey: pe,
    action: null,
    allow: null,
    allowFullScreen: W,
    allowPaymentRequest: W,
    allowUserMedia: W,
    alt: null,
    as: null,
    async: W,
    autoCapitalize: null,
    autoComplete: pe,
    autoFocus: W,
    autoPlay: W,
    blocking: pe,
    capture: null,
    charSet: null,
    checked: W,
    cite: null,
    className: pe,
    cols: T,
    colSpan: null,
    content: null,
    contentEditable: we,
    controls: W,
    controlsList: pe,
    coords: T | Dt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: W,
    defer: W,
    dir: null,
    dirName: null,
    disabled: W,
    download: $n,
    draggable: we,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: W,
    formTarget: null,
    headers: pe,
    height: T,
    hidden: $n,
    high: T,
    href: null,
    hrefLang: null,
    htmlFor: pe,
    httpEquiv: pe,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: W,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: W,
    itemId: null,
    itemProp: pe,
    itemRef: pe,
    itemScope: W,
    itemType: pe,
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
    ping: pe,
    placeholder: null,
    playsInline: W,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: W,
    referrerPolicy: null,
    rel: pe,
    required: W,
    reversed: W,
    rows: T,
    rowSpan: T,
    sandbox: pe,
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
    spellCheck: we,
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
    value: we,
    width: T,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: pe,
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
    scrolling: we,
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
    about: Ye,
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
    className: pe,
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
    g1: Dt,
    g2: Dt,
    glyphName: Dt,
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
    kernelMatrix: Ye,
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
    ping: pe,
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
    property: Ye,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Ye,
    rev: Ye,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Ye,
    requiredFeatures: Ye,
    requiredFonts: Ye,
    requiredFormats: Ye,
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
    strokeDashArray: Ye,
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
    systemLanguage: Ye,
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
    typeOf: Ye,
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
  const n = jn(t);
  let r = t, i = Ve;
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
const Da = _i([bi, Ta, Ei, vi, Ii], "html"), ar = _i([bi, Ea, Ei, vi, Ii], "svg");
function Ra(e) {
  return e.join(" ").trim();
}
var dn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ai(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var lr = {}, Er = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Pa = /\n/g, Oa = /^\s*/, Fa = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, za = /^:\s*/, Ua = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Ha = /^[;\s]*/, Ba = /^\s+|\s+$/g, Va = `
`, vr = "/", Ir = "*", Tt = "", ja = "comment", $a = "declaration", Wa = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(w) {
    var y = w.match(Pa);
    y && (n += y.length);
    var N = w.lastIndexOf(Va);
    r = ~N ? w.length - N : r + w.length;
  }
  function a() {
    var w = { line: n, column: r };
    return function(y) {
      return y.position = new l(w), p(), y;
    };
  }
  function l(w) {
    this.start = w, this.end = { line: n, column: r }, this.source = t.source;
  }
  l.prototype.content = e;
  function o(w) {
    var y = new Error(
      t.source + ":" + n + ":" + r + ": " + w
    );
    if (y.reason = w, y.filename = t.source, y.line = n, y.column = r, y.source = e, !t.silent) throw y;
  }
  function u(w) {
    var y = w.exec(e);
    if (y) {
      var N = y[0];
      return i(N), e = e.slice(N.length), y;
    }
  }
  function p() {
    u(Oa);
  }
  function s(w) {
    var y;
    for (w = w || []; y = d(); )
      y !== !1 && w.push(y);
    return w;
  }
  function d() {
    var w = a();
    if (!(vr != e.charAt(0) || Ir != e.charAt(1))) {
      for (var y = 2; Tt != e.charAt(y) && (Ir != e.charAt(y) || vr != e.charAt(y + 1)); )
        ++y;
      if (y += 2, Tt === e.charAt(y - 1))
        return o("End of comment missing");
      var N = e.slice(2, y - 2);
      return r += 2, i(N), e = e.slice(y), r += 2, w({
        type: ja,
        comment: N
      });
    }
  }
  function f() {
    var w = a(), y = u(Fa);
    if (y) {
      if (d(), !u(za)) return o("property missing ':'");
      var N = u(Ua), _ = w({
        type: $a,
        property: Ar(y[0].replace(Er, Tt)),
        value: N ? Ar(N[0].replace(Er, Tt)) : Tt
      });
      return u(Ha), _;
    }
  }
  function h() {
    var w = [];
    s(w);
    for (var y; y = f(); )
      y !== !1 && (w.push(y), s(w));
    return w;
  }
  return p(), h();
};
function Ar(e) {
  return e ? e.replace(Ba, Tt) : Tt;
}
var Za = dn && dn.__importDefault || function(e) {
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
var Cn = {};
Object.defineProperty(Cn, "__esModule", { value: !0 });
Cn.camelCase = void 0;
var Ya = /^--[a-zA-Z0-9_-]+$/, Xa = /-([a-z])/g, Ja = /^[^-]+$/, Ka = /^-(webkit|moz|ms|o|khtml)-/, Qa = /^-(ms)-/, el = function(e) {
  return !e || Ja.test(e) || Ya.test(e);
}, tl = function(e, t) {
  return t.toUpperCase();
}, Mr = function(e, t) {
  return "".concat(t, "-");
}, nl = function(e, t) {
  return t === void 0 && (t = {}), el(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Qa, Mr) : e = e.replace(Ka, Mr), e.replace(Xa, tl));
};
Cn.camelCase = nl;
var rl = dn && dn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, il = rl(lr), al = Cn;
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
function qt(e) {
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
class ve extends Error {
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
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = o ? o.line : void 0, this.name = qt(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = l && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
ve.prototype.file = "";
ve.prototype.name = "";
ve.prototype.reason = "";
ve.prototype.message = "";
ve.prototype.stack = "";
ve.prototype.column = void 0;
ve.prototype.line = void 0;
ve.prototype.ancestors = void 0;
ve.prototype.cause = void 0;
ve.prototype.fatal = void 0;
ve.prototype.place = void 0;
ve.prototype.ruleId = void 0;
ve.prototype.source = void 0;
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
  const a = Pi(e, t.tagName, !1), l = _l(e, t);
  let o = ur(e, t);
  return pl.has(t.tagName) && (o = o.filter(function(u) {
    return typeof u == "string" ? !ba(u) : !0;
  })), Ri(e, l, a, t), cr(l, o), e.ancestors.pop(), e.schema = r, e.create(t, a, l, n);
}
function ml(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Xt(e, t.position);
}
function gl(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Xt(e, t.position);
}
function Cl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = ar, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : Pi(e, t.name, !0), l = bl(e, t), o = ur(e, t);
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
function _l(e, t) {
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
function bl(e, t) {
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
        Xt(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const o = r.value.data.estree.body[0];
          o.type, a = e.evaluater.evaluateExpression(o.expression);
        } else
          Xt(e, t.position);
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
    ), i = new ve("Cannot parse `style` attribute", {
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
      const o = _r(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
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
    r = _r(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return sr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Xt(e);
}
function Xt(e, t) {
  const n = new ve(
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
const ct = kt(/[A-Za-z]/), Xe = kt(/[\dA-Za-z]/), Pl = kt(/[#-'*+\--9=?A-Z^-~]/);
function Gn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Yn = kt(/\d/), Ol = kt(/[\dA-Fa-f]/), Fl = kt(/[!-/:-@[-`{-~]/);
function H(e) {
  return e !== null && e < -2;
}
function Be(e) {
  return e !== null && (e < 0 || e === 32);
}
function ne(e) {
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
function he(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return l;
  function l(u) {
    return ne(u) ? (e.enter(n), o(u)) : t(u);
  }
  function o(u) {
    return ne(u) && a++ < i ? (e.consume(u), o) : (e.exit(n), t(u));
  }
}
const Hl = {
  tokenize: Bl
};
function Bl(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), he(e, t, "linePrefix");
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
    return H(o) ? (e.consume(o), e.exit("chunkText"), a) : (e.consume(o), l);
  }
}
const Vl = {
  tokenize: jl
}, Or = {
  tokenize: $l
};
function jl(e) {
  const t = this, n = [];
  let r = 0, i, a, l;
  return o;
  function o(A) {
    if (r < n.length) {
      const O = n[r];
      return t.containerState = O[1], e.attempt(O[0].continuation, u, p)(A);
    }
    return p(A);
  }
  function u(A) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && P();
      const O = t.events.length;
      let $ = O, x;
      for (; $--; )
        if (t.events[$][0] === "exit" && t.events[$][1].type === "chunkFlow") {
          x = t.events[$][1].end;
          break;
        }
      _(r);
      let V = O;
      for (; V < t.events.length; )
        t.events[V][1].end = {
          ...x
        }, V++;
      return ut(t.events, $ + 1, 0, t.events.slice(O)), t.events.length = V, p(A);
    }
    return o(A);
  }
  function p(A) {
    if (r === n.length) {
      if (!i)
        return f(A);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return w(A);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(Or, s, d)(A);
  }
  function s(A) {
    return i && P(), _(r), f(A);
  }
  function d(A) {
    return t.parser.lazy[t.now().line] = r !== n.length, l = t.now().offset, w(A);
  }
  function f(A) {
    return t.containerState = {}, e.attempt(Or, h, w)(A);
  }
  function h(A) {
    return r++, n.push([t.currentConstruct, t.containerState]), f(A);
  }
  function w(A) {
    if (A === null) {
      i && P(), _(0), e.consume(A);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: a
    }), y(A);
  }
  function y(A) {
    if (A === null) {
      N(e.exit("chunkFlow"), !0), _(0), e.consume(A);
      return;
    }
    return H(A) ? (e.consume(A), N(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, o) : (e.consume(A), y);
  }
  function N(A, O) {
    const $ = t.sliceStream(A);
    if (O && $.push(null), A.previous = a, a && (a.next = A), a = A, i.defineSkip(A.start), i.write($), t.parser.lazy[A.start.line]) {
      let x = i.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          i.events[x][1].start.offset < l && // …and either is not ended yet…
          (!i.events[x][1].end || // …or ends after it.
          i.events[x][1].end.offset > l)
        )
          return;
      const V = t.events.length;
      let J = V, B, F;
      for (; J--; )
        if (t.events[J][0] === "exit" && t.events[J][1].type === "chunkFlow") {
          if (B) {
            F = t.events[J][1].end;
            break;
          }
          B = !0;
        }
      for (_(r), x = V; x < t.events.length; )
        t.events[x][1].end = {
          ...F
        }, x++;
      ut(t.events, J + 1, 0, t.events.slice(V)), t.events.length = x;
    }
  }
  function _(A) {
    let O = n.length;
    for (; O-- > A; ) {
      const $ = n[O];
      t.containerState = $[1], $[0].exit.call(t, e);
    }
    n.length = A;
  }
  function P() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function $l(e, t, n) {
  return he(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
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
    return h === 43 || h === 45 || h === 46 || Xe(h) ? (r = 1, o(h)) : p(h);
  }
  function o(h) {
    return h === 58 ? (e.consume(h), r = 0, u) : (h === 43 || h === 45 || h === 46 || Xe(h)) && r++ < 32 ? (e.consume(h), o) : (r = 0, p(h));
  }
  function u(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : h === null || h === 32 || h === 60 || Gn(h) ? n(h) : (e.consume(h), u);
  }
  function p(h) {
    return h === 64 ? (e.consume(h), s) : Pl(h) ? (e.consume(h), p) : n(h);
  }
  function s(h) {
    return Xe(h) ? d(h) : n(h);
  }
  function d(h) {
    return h === 46 ? (e.consume(h), r = 0, s) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : f(h);
  }
  function f(h) {
    if ((h === 45 || Xe(h)) && r++ < 63) {
      const w = h === 45 ? f : d;
      return e.consume(h), w;
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
    return ne(a) ? he(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || H(a) ? t(a) : n(a);
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
    return ne(l) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(l), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(l));
  }
}
function Jl(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return ne(l) ? he(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : a(l);
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
const Hi = {
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
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), p) : (e.enter("characterReferenceValue"), a = 31, l = Xe, s(d));
  }
  function p(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, l = Ol, s) : (e.enter("characterReferenceValue"), a = 7, l = Yn, s(d));
  }
  function s(d) {
    if (d === 59 && i) {
      const f = e.exit("characterReferenceValue");
      return l === Xe && !pr(r.sliceSerialize(f)) ? n(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return l(d) && i++ < a ? (e.consume(d), s) : n(d);
  }
}
const Ur = {
  partial: !0,
  tokenize: no
}, Hr = {
  concrete: !0,
  name: "codeFenced",
  tokenize: to
};
function to(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: $
  };
  let a = 0, l = 0, o;
  return u;
  function u(x) {
    return p(x);
  }
  function p(x) {
    const V = r.events[r.events.length - 1];
    return a = V && V[1].type === "linePrefix" ? V[2].sliceSerialize(V[1], !0).length : 0, o = x, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), s(x);
  }
  function s(x) {
    return x === o ? (l++, e.consume(x), s) : l < 3 ? n(x) : (e.exit("codeFencedFenceSequence"), ne(x) ? he(e, d, "whitespace")(x) : d(x));
  }
  function d(x) {
    return x === null || H(x) ? (e.exit("codeFencedFence"), r.interrupt ? t(x) : e.check(Ur, y, O)(x)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), f(x));
  }
  function f(x) {
    return x === null || H(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(x)) : ne(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), he(e, h, "whitespace")(x)) : x === 96 && x === o ? n(x) : (e.consume(x), f);
  }
  function h(x) {
    return x === null || H(x) ? d(x) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), w(x));
  }
  function w(x) {
    return x === null || H(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(x)) : x === 96 && x === o ? n(x) : (e.consume(x), w);
  }
  function y(x) {
    return e.attempt(i, O, N)(x);
  }
  function N(x) {
    return e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), _;
  }
  function _(x) {
    return a > 0 && ne(x) ? he(e, P, "linePrefix", a + 1)(x) : P(x);
  }
  function P(x) {
    return x === null || H(x) ? e.check(Ur, y, O)(x) : (e.enter("codeFlowValue"), A(x));
  }
  function A(x) {
    return x === null || H(x) ? (e.exit("codeFlowValue"), P(x)) : (e.consume(x), A);
  }
  function O(x) {
    return e.exit("codeFenced"), t(x);
  }
  function $(x, V, J) {
    let B = 0;
    return F;
    function F(q) {
      return x.enter("lineEnding"), x.consume(q), x.exit("lineEnding"), M;
    }
    function M(q) {
      return x.enter("codeFencedFence"), ne(q) ? he(x, I, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(q) : I(q);
    }
    function I(q) {
      return q === o ? (x.enter("codeFencedFenceSequence"), K(q)) : J(q);
    }
    function K(q) {
      return q === o ? (B++, x.consume(q), K) : B >= l ? (x.exit("codeFencedFenceSequence"), ne(q) ? he(x, re, "whitespace")(q) : re(q)) : J(q);
    }
    function re(q) {
      return q === null || H(q) ? (x.exit("codeFencedFence"), V(q)) : J(q);
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
    return e.enter("codeIndented"), he(e, a, "linePrefix", 5)(p);
  }
  function a(p) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? l(p) : n(p);
  }
  function l(p) {
    return p === null ? u(p) : H(p) ? e.attempt(ro, l, u)(p) : (e.enter("codeFlowValue"), o(p));
  }
  function o(p) {
    return p === null || H(p) ? (e.exit("codeFlowValue"), l(p)) : (e.consume(p), o);
  }
  function u(p) {
    return e.exit("codeIndented"), t(p);
  }
}
function ao(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line] ? n(l) : H(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), i) : he(e, a, "linePrefix", 5)(l);
  }
  function a(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(l) : H(l) ? i(l) : n(l);
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
    return d === null ? n(d) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), u) : d === 96 ? (a = e.enter("codeTextSequence"), i = 0, s(d)) : H(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), u) : (e.enter("codeTextData"), p(d));
  }
  function p(d) {
    return d === null || d === 32 || d === 96 || H(d) ? (e.exit("codeTextData"), u(d)) : (e.consume(d), p);
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
    return r && Ht(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Ht(this.left, t);
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
    this.setCursor(0), Ht(this.right, t.reverse());
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
        Ht(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Ht(this.left, n.reverse());
      }
  }
}
function Ht(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function Bi(e) {
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
  let s, d, f = -1, h = n, w = 0, y = 0;
  const N = [y];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; )
      ;
    a.push(i), h._tokenizer || (s = r.sliceStream(h), h.next || s.push(null), d && l.defineSkip(h.start), h._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(s), h._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), d = h, h = h.next;
  }
  for (h = n; ++f < o.length; )
    // Find a void token that includes a break.
    o[f][0] === "exit" && o[f - 1][0] === "enter" && o[f][1].type === o[f - 1][1].type && o[f][1].start.line !== o[f][1].end.line && (y = f + 1, N.push(y), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (l.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : N.pop(), f = N.length; f--; ) {
    const _ = o.slice(N[f], N[f + 1]), P = a.pop();
    u.push([P, P + _.length - 1]), e.splice(P, 2, _);
  }
  for (u.reverse(), f = -1; ++f < u.length; )
    p[w + u[f][0]] = w + u[f][1], w += u[f][1] - u[f][0] - 1;
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
  return Bi(e), e;
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
    return o === null ? a(o) : H(o) ? e.check(fo, l, a)(o) : (e.consume(o), i);
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
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), he(e, a, "linePrefix");
  }
  function a(l) {
    if (l === null || H(l))
      return n(l);
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(l) : e.interrupt(r.parser.constructs.flow, n, t)(l);
  }
}
function Vi(e, t, n, r, i, a, l, o, u) {
  const p = u || Number.POSITIVE_INFINITY;
  let s = 0;
  return d;
  function d(_) {
    return _ === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(_), e.exit(a), f) : _ === null || _ === 32 || _ === 41 || Gn(_) ? n(_) : (e.enter(r), e.enter(l), e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), y(_));
  }
  function f(_) {
    return _ === 62 ? (e.enter(a), e.consume(_), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), h(_));
  }
  function h(_) {
    return _ === 62 ? (e.exit("chunkString"), e.exit(o), f(_)) : _ === null || _ === 60 || H(_) ? n(_) : (e.consume(_), _ === 92 ? w : h);
  }
  function w(_) {
    return _ === 60 || _ === 62 || _ === 92 ? (e.consume(_), h) : h(_);
  }
  function y(_) {
    return !s && (_ === null || _ === 41 || Be(_)) ? (e.exit("chunkString"), e.exit(o), e.exit(l), e.exit(r), t(_)) : s < p && _ === 40 ? (e.consume(_), s++, y) : _ === 41 ? (e.consume(_), s--, y) : _ === null || _ === 32 || _ === 40 || Gn(_) ? n(_) : (e.consume(_), _ === 92 ? N : y);
  }
  function N(_) {
    return _ === 40 || _ === 41 || _ === 92 ? (e.consume(_), y) : y(_);
  }
}
function ji(e, t, n, r, i, a) {
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
    h === 94 && !o && "_hiddenFootnoteSupport" in l.parser.constructs ? n(h) : h === 93 ? (e.exit(a), e.enter(i), e.consume(h), e.exit(i), e.exit(r), t) : H(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), s) : (e.enter("chunkString", {
      contentType: "string"
    }), d(h));
  }
  function d(h) {
    return h === null || h === 91 || h === 93 || H(h) || o++ > 999 ? (e.exit("chunkString"), s(h)) : (e.consume(h), u || (u = !ne(h)), h === 92 ? f : d);
  }
  function f(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), o++, d) : d(h);
  }
}
function $i(e, t, n, r, i, a) {
  let l;
  return o;
  function o(f) {
    return f === 34 || f === 39 || f === 40 ? (e.enter(r), e.enter(i), e.consume(f), e.exit(i), l = f === 40 ? 41 : f, u) : n(f);
  }
  function u(f) {
    return f === l ? (e.enter(i), e.consume(f), e.exit(i), e.exit(r), t) : (e.enter(a), p(f));
  }
  function p(f) {
    return f === l ? (e.exit(a), u(l)) : f === null ? n(f) : H(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), he(e, p, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), s(f));
  }
  function s(f) {
    return f === l || f === null || H(f) ? (e.exit("chunkString"), p(f)) : (e.consume(f), f === 92 ? d : s);
  }
  function d(f) {
    return f === l || f === 92 ? (e.consume(f), s) : s(f);
  }
}
function Gt(e, t) {
  let n;
  return r;
  function r(i) {
    return H(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : ne(i) ? he(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
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
    return ji.call(
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
    return Be(h) ? Gt(e, p)(h) : p(h);
  }
  function p(h) {
    return Vi(
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
    return ne(h) ? he(e, f, "whitespace")(h) : f(h);
  }
  function f(h) {
    return h === null || H(h) ? (e.exit("definition"), r.parser.defined.push(i), t(h)) : n(h);
  }
}
function ko(e, t, n) {
  return r;
  function r(o) {
    return Be(o) ? Gt(e, i)(o) : n(o);
  }
  function i(o) {
    return $i(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
  }
  function a(o) {
    return ne(o) ? he(e, l, "whitespace")(o) : l(o);
  }
  function l(o) {
    return o === null || H(o) ? t(o) : n(o);
  }
}
const _o = {
  name: "hardBreakEscape",
  tokenize: bo
};
function bo(e, t, n) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), i;
  }
  function i(a) {
    return H(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
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
    return s === 35 ? (e.enter("atxHeadingSequence"), u(s)) : s === null || H(s) ? (e.exit("atxHeading"), t(s)) : ne(s) ? he(e, o, "whitespace")(s) : (e.enter("atxHeadingText"), p(s));
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
], Br = ["pre", "script", "style", "textarea"], Io = {
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
    return m === 33 ? (e.consume(m), f) : m === 47 ? (e.consume(m), a = !0, y) : m === 63 ? (e.consume(m), i = 3, r.interrupt ? t : g) : ct(m) ? (e.consume(m), l = String.fromCharCode(m), N) : n(m);
  }
  function f(m) {
    return m === 45 ? (e.consume(m), i = 2, h) : m === 91 ? (e.consume(m), i = 5, o = 0, w) : ct(m) ? (e.consume(m), i = 4, r.interrupt ? t : g) : n(m);
  }
  function h(m) {
    return m === 45 ? (e.consume(m), r.interrupt ? t : g) : n(m);
  }
  function w(m) {
    const xe = "CDATA[";
    return m === xe.charCodeAt(o++) ? (e.consume(m), o === xe.length ? r.interrupt ? t : I : w) : n(m);
  }
  function y(m) {
    return ct(m) ? (e.consume(m), l = String.fromCharCode(m), N) : n(m);
  }
  function N(m) {
    if (m === null || m === 47 || m === 62 || Be(m)) {
      const xe = m === 47, te = l.toLowerCase();
      return !xe && !a && Br.includes(te) ? (i = 1, r.interrupt ? t(m) : I(m)) : vo.includes(l.toLowerCase()) ? (i = 6, xe ? (e.consume(m), _) : r.interrupt ? t(m) : I(m)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(m) : a ? P(m) : A(m));
    }
    return m === 45 || Xe(m) ? (e.consume(m), l += String.fromCharCode(m), N) : n(m);
  }
  function _(m) {
    return m === 62 ? (e.consume(m), r.interrupt ? t : I) : n(m);
  }
  function P(m) {
    return ne(m) ? (e.consume(m), P) : F(m);
  }
  function A(m) {
    return m === 47 ? (e.consume(m), F) : m === 58 || m === 95 || ct(m) ? (e.consume(m), O) : ne(m) ? (e.consume(m), A) : F(m);
  }
  function O(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || Xe(m) ? (e.consume(m), O) : $(m);
  }
  function $(m) {
    return m === 61 ? (e.consume(m), x) : ne(m) ? (e.consume(m), $) : A(m);
  }
  function x(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (e.consume(m), u = m, V) : ne(m) ? (e.consume(m), x) : J(m);
  }
  function V(m) {
    return m === u ? (e.consume(m), u = null, B) : m === null || H(m) ? n(m) : (e.consume(m), V);
  }
  function J(m) {
    return m === null || m === 34 || m === 39 || m === 47 || m === 60 || m === 61 || m === 62 || m === 96 || Be(m) ? $(m) : (e.consume(m), J);
  }
  function B(m) {
    return m === 47 || m === 62 || ne(m) ? A(m) : n(m);
  }
  function F(m) {
    return m === 62 ? (e.consume(m), M) : n(m);
  }
  function M(m) {
    return m === null || H(m) ? I(m) : ne(m) ? (e.consume(m), M) : n(m);
  }
  function I(m) {
    return m === 45 && i === 2 ? (e.consume(m), me) : m === 60 && i === 1 ? (e.consume(m), fe) : m === 62 && i === 4 ? (e.consume(m), ee) : m === 63 && i === 3 ? (e.consume(m), g) : m === 93 && i === 5 ? (e.consume(m), je) : H(m) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Ao, Ae, K)(m)) : m === null || H(m) ? (e.exit("htmlFlowData"), K(m)) : (e.consume(m), I);
  }
  function K(m) {
    return e.check(Mo, re, Ae)(m);
  }
  function re(m) {
    return e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), q;
  }
  function q(m) {
    return m === null || H(m) ? K(m) : (e.enter("htmlFlowData"), I(m));
  }
  function me(m) {
    return m === 45 ? (e.consume(m), g) : I(m);
  }
  function fe(m) {
    return m === 47 ? (e.consume(m), l = "", Ie) : I(m);
  }
  function Ie(m) {
    if (m === 62) {
      const xe = l.toLowerCase();
      return Br.includes(xe) ? (e.consume(m), ee) : I(m);
    }
    return ct(m) && l.length < 8 ? (e.consume(m), l += String.fromCharCode(m), Ie) : I(m);
  }
  function je(m) {
    return m === 93 ? (e.consume(m), g) : I(m);
  }
  function g(m) {
    return m === 62 ? (e.consume(m), ee) : m === 45 && i === 2 ? (e.consume(m), g) : I(m);
  }
  function ee(m) {
    return m === null || H(m) ? (e.exit("htmlFlowData"), Ae(m)) : (e.consume(m), ee);
  }
  function Ae(m) {
    return e.exit("htmlFlow"), t(m);
  }
}
function Do(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return H(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), a) : n(l);
  }
  function a(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
function Ro(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(yn, t, n);
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
  function o(g) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), u;
  }
  function u(g) {
    return g === 33 ? (e.consume(g), p) : g === 47 ? (e.consume(g), $) : g === 63 ? (e.consume(g), A) : ct(g) ? (e.consume(g), J) : n(g);
  }
  function p(g) {
    return g === 45 ? (e.consume(g), s) : g === 91 ? (e.consume(g), a = 0, w) : ct(g) ? (e.consume(g), P) : n(g);
  }
  function s(g) {
    return g === 45 ? (e.consume(g), h) : n(g);
  }
  function d(g) {
    return g === null ? n(g) : g === 45 ? (e.consume(g), f) : H(g) ? (l = d, fe(g)) : (e.consume(g), d);
  }
  function f(g) {
    return g === 45 ? (e.consume(g), h) : d(g);
  }
  function h(g) {
    return g === 62 ? me(g) : g === 45 ? f(g) : d(g);
  }
  function w(g) {
    const ee = "CDATA[";
    return g === ee.charCodeAt(a++) ? (e.consume(g), a === ee.length ? y : w) : n(g);
  }
  function y(g) {
    return g === null ? n(g) : g === 93 ? (e.consume(g), N) : H(g) ? (l = y, fe(g)) : (e.consume(g), y);
  }
  function N(g) {
    return g === 93 ? (e.consume(g), _) : y(g);
  }
  function _(g) {
    return g === 62 ? me(g) : g === 93 ? (e.consume(g), _) : y(g);
  }
  function P(g) {
    return g === null || g === 62 ? me(g) : H(g) ? (l = P, fe(g)) : (e.consume(g), P);
  }
  function A(g) {
    return g === null ? n(g) : g === 63 ? (e.consume(g), O) : H(g) ? (l = A, fe(g)) : (e.consume(g), A);
  }
  function O(g) {
    return g === 62 ? me(g) : A(g);
  }
  function $(g) {
    return ct(g) ? (e.consume(g), x) : n(g);
  }
  function x(g) {
    return g === 45 || Xe(g) ? (e.consume(g), x) : V(g);
  }
  function V(g) {
    return H(g) ? (l = V, fe(g)) : ne(g) ? (e.consume(g), V) : me(g);
  }
  function J(g) {
    return g === 45 || Xe(g) ? (e.consume(g), J) : g === 47 || g === 62 || Be(g) ? B(g) : n(g);
  }
  function B(g) {
    return g === 47 ? (e.consume(g), me) : g === 58 || g === 95 || ct(g) ? (e.consume(g), F) : H(g) ? (l = B, fe(g)) : ne(g) ? (e.consume(g), B) : me(g);
  }
  function F(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || Xe(g) ? (e.consume(g), F) : M(g);
  }
  function M(g) {
    return g === 61 ? (e.consume(g), I) : H(g) ? (l = M, fe(g)) : ne(g) ? (e.consume(g), M) : B(g);
  }
  function I(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), i = g, K) : H(g) ? (l = I, fe(g)) : ne(g) ? (e.consume(g), I) : (e.consume(g), re);
  }
  function K(g) {
    return g === i ? (e.consume(g), i = void 0, q) : g === null ? n(g) : H(g) ? (l = K, fe(g)) : (e.consume(g), K);
  }
  function re(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? n(g) : g === 47 || g === 62 || Be(g) ? B(g) : (e.consume(g), re);
  }
  function q(g) {
    return g === 47 || g === 62 || Be(g) ? B(g) : n(g);
  }
  function me(g) {
    return g === 62 ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(g);
  }
  function fe(g) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), Ie;
  }
  function Ie(g) {
    return ne(g) ? he(e, je, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(g) : je(g);
  }
  function je(g) {
    return e.enter("htmlTextData"), l(g);
  }
}
const dr = {
  name: "labelEnd",
  resolveAll: Ho,
  resolveTo: Bo,
  tokenize: Vo
}, Fo = {
  tokenize: jo
}, zo = {
  tokenize: $o
}, Uo = {
  tokenize: Wo
};
function Ho(e) {
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
function Bo(e, t) {
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
function Vo(e, t, n) {
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
function jo(e, t, n) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), i;
  }
  function i(d) {
    return Be(d) ? Gt(e, a)(d) : a(d);
  }
  function a(d) {
    return d === 41 ? s(d) : Vi(e, l, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function l(d) {
    return Be(d) ? Gt(e, u)(d) : s(d);
  }
  function o(d) {
    return n(d);
  }
  function u(d) {
    return d === 34 || d === 39 || d === 40 ? $i(e, p, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : s(d);
  }
  function p(d) {
    return Be(d) ? Gt(e, s)(d) : s(d);
  }
  function s(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), t) : n(d);
  }
}
function $o(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return ji.call(r, e, a, l, "reference", "referenceMarker", "referenceString")(o);
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
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), he(e, t, "linePrefix");
  }
}
const sn = {
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
    return p === i ? (e.enter("thematicBreakSequence"), u(p)) : r >= 3 && (p === null || H(p)) ? (e.exit("thematicBreak"), t(p)) : n(p);
  }
  function u(p) {
    return p === i ? (e.consume(p), r++, u) : (e.exit("thematicBreakSequence"), ne(p) ? he(e, o, "whitespace")(p) : o(p));
  }
}
const He = {
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
    const w = r.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (w === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : Yn(h)) {
      if (r.containerState.type || (r.containerState.type = w, e.enter(w, {
        _container: !0
      })), w === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(sn, n, p)(h) : p(h);
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
      yn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : s,
      e.attempt(Ko, f, d)
    );
  }
  function s(h) {
    return r.containerState.initialBlankLine = !0, a++, f(h);
  }
  function d(h) {
    return ne(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), f) : n(h);
  }
  function f(h) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(h);
  }
}
function ts(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(yn, i, a);
  function i(o) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, he(e, t, "listItemIndent", r.containerState.size + 1)(o);
  }
  function a(o) {
    return r.containerState.furtherBlankLines || !ne(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Qo, t, l)(o));
  }
  function l(o) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, he(e, e.attempt(He, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
  }
}
function ns(e, t, n) {
  const r = this;
  return he(e, i, "listItemIndent", r.containerState.size + 1);
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
  return he(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const l = r.events[r.events.length - 1];
    return !ne(a) && l && l[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const Vr = {
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
    return p === i ? (e.consume(p), o) : (e.exit("setextHeadingLineSequence"), ne(p) ? he(e, u, "lineSuffix")(p) : u(p));
  }
  function u(p) {
    return p === null || H(p) ? (e.exit("setextHeadingLine"), t(p)) : n(p);
  }
}
const os = {
  tokenize: ss
};
function ss(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    yn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, he(e, e.attempt(this.parser.constructs.flow, i, e.attempt(ho, i)), "linePrefix"))
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
  62: zi
}, fs = {
  91: yo
}, ms = {
  [-2]: In,
  [-1]: In,
  32: In
}, gs = {
  35: So,
  42: sn,
  45: [Vr, sn],
  60: Io,
  61: Vr,
  95: sn,
  96: Hr,
  126: Hr
}, Cs = {
  38: Hi,
  92: Ui
}, ys = {
  [-5]: An,
  [-4]: An,
  [-3]: An,
  33: Zo,
  38: Hi,
  42: Xn,
  60: [ql, Po],
  91: Go,
  92: [_o, Ui],
  93: dr,
  95: Xn,
  96: lo
}, ws = {
  null: [Xn, cs]
}, xs = {
  null: [42, 95]
}, ks = {
  null: []
}, _s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
function bs(e, t, n) {
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
    attempt: V($),
    check: V(x),
    consume: P,
    enter: A,
    exit: O,
    interrupt: V(x, {
      interrupt: !0
    })
  }, p = {
    code: null,
    containerState: {},
    defineSkip: y,
    events: [],
    now: w,
    parser: e,
    previous: null,
    sliceSerialize: f,
    sliceStream: h,
    write: d
  };
  let s = t.tokenize.call(p, u);
  return t.resolveAll && a.push(t), p;
  function d(M) {
    return l = Qe(l, M), N(), l[l.length - 1] !== null ? [] : (J(t, 0), p.events = hr(a, p.events, p), p.events);
  }
  function f(M, I) {
    return Ts(h(M), I);
  }
  function h(M) {
    return Ss(l, M);
  }
  function w() {
    const {
      _bufferIndex: M,
      _index: I,
      line: K,
      column: re,
      offset: q
    } = r;
    return {
      _bufferIndex: M,
      _index: I,
      line: K,
      column: re,
      offset: q
    };
  }
  function y(M) {
    i[M.line] = M.column, F();
  }
  function N() {
    let M;
    for (; r._index < l.length; ) {
      const I = l[r._index];
      if (typeof I == "string")
        for (M = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === M && r._bufferIndex < I.length; )
          _(I.charCodeAt(r._bufferIndex));
      else
        _(I);
    }
  }
  function _(M) {
    s = s(M);
  }
  function P(M) {
    H(M) ? (r.line++, r.column = 1, r.offset += M === -3 ? 2 : 1, F()) : M !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[r._index].length && (r._bufferIndex = -1, r._index++)), p.previous = M;
  }
  function A(M, I) {
    const K = I || {};
    return K.type = M, K.start = w(), p.events.push(["enter", K, p]), o.push(K), K;
  }
  function O(M) {
    const I = o.pop();
    return I.end = w(), p.events.push(["exit", I, p]), I;
  }
  function $(M, I) {
    J(M, I.from);
  }
  function x(M, I) {
    I.restore();
  }
  function V(M, I) {
    return K;
    function K(re, q, me) {
      let fe, Ie, je, g;
      return Array.isArray(re) ? (
        /* c8 ignore next 1 */
        Ae(re)
      ) : "tokenize" in re ? (
        // Looks like a construct.
        Ae([
          /** @type {Construct} */
          re
        ])
      ) : ee(re);
      function ee(ie) {
        return Je;
        function Je(Ce) {
          const Fe = Ce !== null && ie[Ce], Ee = Ce !== null && ie.null, lt = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Fe) ? Fe : Fe ? [Fe] : [],
            ...Array.isArray(Ee) ? Ee : Ee ? [Ee] : []
          ];
          return Ae(lt)(Ce);
        }
      }
      function Ae(ie) {
        return fe = ie, Ie = 0, ie.length === 0 ? me : m(ie[Ie]);
      }
      function m(ie) {
        return Je;
        function Je(Ce) {
          return g = B(), je = ie, ie.partial || (p.currentConstruct = ie), ie.name && p.parser.constructs.disable.null.includes(ie.name) ? te() : ie.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            I ? Object.assign(Object.create(p), I) : p,
            u,
            xe,
            te
          )(Ce);
        }
      }
      function xe(ie) {
        return M(je, g), q;
      }
      function te(ie) {
        return g.restore(), ++Ie < fe.length ? m(fe[Ie]) : me;
      }
    }
  }
  function J(M, I) {
    M.resolveAll && !a.includes(M) && a.push(M), M.resolve && ut(p.events, I, p.events.length - I, M.resolve(p.events.slice(I), p)), M.resolveTo && (p.events = M.resolveTo(p.events, p));
  }
  function B() {
    const M = w(), I = p.previous, K = p.currentConstruct, re = p.events.length, q = Array.from(o);
    return {
      from: re,
      restore: me
    };
    function me() {
      r = M, p.previous = I, p.currentConstruct = K, p.events.length = re, o = q, F();
    }
  }
  function F() {
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
      Ll([_s, ...(e || {}).extensions || []])
    ),
    content: i(Hl),
    defined: [],
    document: i(Vl),
    flow: i(os),
    lazy: {},
    string: i(us),
    text: i(ps)
  };
  return r;
  function i(a) {
    return l;
    function l(o) {
      return bs(r, a, o);
    }
  }
}
function vs(e) {
  for (; !Bi(e); )
    ;
  return e;
}
const jr = /[\0\t\n\r]/g;
function Is() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, l, o) {
    const u = [];
    let p, s, d, f, h;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(l || void 0).decode(a)), d = 0, t = "", n && (a.charCodeAt(0) === 65279 && d++, n = void 0); d < a.length; ) {
      if (jr.lastIndex = d, p = jr.exec(a), f = p && p.index !== void 0 ? p.index : a.length, h = a.charCodeAt(f), !p) {
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
      autolink: a(ht),
      autolinkProtocol: B,
      autolinkEmail: B,
      atxHeading: a(ze),
      blockQuote: a(Ee),
      characterEscape: B,
      characterReference: B,
      codeFenced: a(lt),
      codeFencedFenceInfo: l,
      codeFencedFenceMeta: l,
      codeIndented: a(lt, l),
      codeText: a(vt, l),
      codeTextData: B,
      data: B,
      codeFlowValue: B,
      definition: a(ot),
      definitionDestinationString: l,
      definitionLabelString: l,
      definitionTitleString: l,
      emphasis: a(yt),
      hardBreakEscape: a(pt),
      hardBreakTrailing: a(pt),
      htmlFlow: a(tt, l),
      htmlFlowData: B,
      htmlText: a(tt, l),
      htmlTextData: B,
      image: a(ke),
      label: l,
      link: a(ht),
      listItem: a(dt),
      listItemValue: f,
      listOrdered: a(Me, d),
      listUnordered: a(Me),
      paragraph: a($e),
      reference: m,
      referenceString: l,
      resourceDestinationString: l,
      resourceTitleString: l,
      setextHeading: a(ze),
      strong: a(Ft),
      thematicBreak: a(ft)
    },
    exit: {
      atxHeading: u(),
      atxHeadingSequence: $,
      autolink: u(),
      autolinkEmail: Fe,
      autolinkProtocol: Ce,
      blockQuote: u(),
      characterEscapeValue: F,
      characterReferenceMarkerHexadecimal: te,
      characterReferenceMarkerNumeric: te,
      characterReferenceValue: ie,
      characterReference: Je,
      codeFenced: u(N),
      codeFencedFence: y,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: w,
      codeFlowValue: F,
      codeIndented: u(_),
      codeText: u(q),
      codeTextData: F,
      data: F,
      definition: u(),
      definitionDestinationString: O,
      definitionLabelString: P,
      definitionTitleString: A,
      emphasis: u(),
      hardBreakEscape: u(I),
      hardBreakTrailing: u(I),
      htmlFlow: u(K),
      htmlFlowData: F,
      htmlText: u(re),
      htmlTextData: F,
      image: u(fe),
      label: je,
      labelText: Ie,
      lineEnding: M,
      link: u(me),
      listItem: u(),
      listOrdered: u(),
      listUnordered: u(),
      paragraph: u(),
      referenceString: xe,
      resourceDestinationString: g,
      resourceTitleString: ee,
      resource: Ae,
      setextHeading: u(J),
      setextHeadingLineSequence: V,
      setextHeadingText: x,
      strong: u(),
      thematicBreak: u()
    }
  };
  Gi(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(k) {
    let E = {
      type: "root",
      children: []
    };
    const z = {
      stack: [E],
      tokenStack: [],
      config: t,
      enter: o,
      exit: p,
      buffer: l,
      resume: s,
      data: n
    }, j = [];
    let Y = -1;
    for (; ++Y < k.length; )
      if (k[Y][1].type === "listOrdered" || k[Y][1].type === "listUnordered")
        if (k[Y][0] === "enter")
          j.push(Y);
        else {
          const _e = j.pop();
          Y = i(k, _e, Y);
        }
    for (Y = -1; ++Y < k.length; ) {
      const _e = t[k[Y][0]];
      qi.call(_e, k[Y][1].type) && _e[k[Y][1].type].call(Object.assign({
        sliceSerialize: k[Y][2].sliceSerialize
      }, z), k[Y][1]);
    }
    if (z.tokenStack.length > 0) {
      const _e = z.tokenStack[z.tokenStack.length - 1];
      (_e[1] || $r).call(z, void 0, _e[0]);
    }
    for (E.position = {
      start: xt(k.length > 0 ? k[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: xt(k.length > 0 ? k[k.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Y = -1; ++Y < t.transforms.length; )
      E = t.transforms[Y](E) || E;
    return E;
  }
  function i(k, E, z) {
    let j = E - 1, Y = -1, _e = !1, We, Se, Ze, be;
    for (; ++j <= z; ) {
      const le = k[j];
      switch (le[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          le[0] === "enter" ? Y++ : Y--, be = void 0;
          break;
        }
        case "lineEndingBlank": {
          le[0] === "enter" && (We && !be && !Y && !Ze && (Ze = j), be = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          be = void 0;
      }
      if (!Y && le[0] === "enter" && le[1].type === "listItemPrefix" || Y === -1 && le[0] === "exit" && (le[1].type === "listUnordered" || le[1].type === "listOrdered")) {
        if (We) {
          let Ne = j;
          for (Se = void 0; Ne--; ) {
            const Le = k[Ne];
            if (Le[1].type === "lineEnding" || Le[1].type === "lineEndingBlank") {
              if (Le[0] === "exit") continue;
              Se && (k[Se][1].type = "lineEndingBlank", _e = !0), Le[1].type = "lineEnding", Se = Ne;
            } else if (!(Le[1].type === "linePrefix" || Le[1].type === "blockQuotePrefix" || Le[1].type === "blockQuotePrefixWhitespace" || Le[1].type === "blockQuoteMarker" || Le[1].type === "listItemIndent")) break;
          }
          Ze && (!Se || Ze < Se) && (We._spread = !0), We.end = Object.assign({}, Se ? k[Se][1].start : le[1].end), k.splice(Se || j, 0, ["exit", We, le[2]]), j++, z++;
        }
        if (le[1].type === "listItemPrefix") {
          const Ne = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, le[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          We = Ne, k.splice(j, 0, ["enter", Ne, le[2]]), j++, z++, Ze = void 0, be = !0;
        }
      }
    }
    return k[E][1]._spread = _e, z;
  }
  function a(k, E) {
    return z;
    function z(j) {
      o.call(this, k(j), j), E && E.call(this, j);
    }
  }
  function l() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function o(k, E, z) {
    this.stack[this.stack.length - 1].children.push(k), this.stack.push(k), this.tokenStack.push([E, z || void 0]), k.position = {
      start: xt(E.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function u(k) {
    return E;
    function E(z) {
      k && k.call(this, z), p.call(this, z);
    }
  }
  function p(k, E) {
    const z = this.stack.pop(), j = this.tokenStack.pop();
    if (j)
      j[0].type !== k.type && (E ? E.call(this, k, j[0]) : (j[1] || $r).call(this, k, j[0]));
    else throw new Error("Cannot close `" + k.type + "` (" + qt({
      start: k.start,
      end: k.end
    }) + "): it’s not open");
    z.position.end = xt(k.end);
  }
  function s() {
    return Ml(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function f(k) {
    if (this.data.expectingFirstListItemValue) {
      const E = this.stack[this.stack.length - 2];
      E.start = Number.parseInt(this.sliceSerialize(k), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const k = this.resume(), E = this.stack[this.stack.length - 1];
    E.lang = k;
  }
  function w() {
    const k = this.resume(), E = this.stack[this.stack.length - 1];
    E.meta = k;
  }
  function y() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function N() {
    const k = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = k.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function _() {
    const k = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = k.replace(/(\r?\n|\r)$/g, "");
  }
  function P(k) {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = E, z.identifier = Rt(this.sliceSerialize(k)).toLowerCase();
  }
  function A() {
    const k = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = k;
  }
  function O() {
    const k = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = k;
  }
  function $(k) {
    const E = this.stack[this.stack.length - 1];
    if (!E.depth) {
      const z = this.sliceSerialize(k).length;
      E.depth = z;
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function V(k) {
    const E = this.stack[this.stack.length - 1];
    E.depth = this.sliceSerialize(k).codePointAt(0) === 61 ? 1 : 2;
  }
  function J() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function B(k) {
    const z = this.stack[this.stack.length - 1].children;
    let j = z[z.length - 1];
    (!j || j.type !== "text") && (j = _t(), j.position = {
      start: xt(k.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, z.push(j)), this.stack.push(j);
  }
  function F(k) {
    const E = this.stack.pop();
    E.value += this.sliceSerialize(k), E.position.end = xt(k.end);
  }
  function M(k) {
    const E = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const z = E.children[E.children.length - 1];
      z.position.end = xt(k.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(E.type) && (B.call(this, k), F.call(this, k));
  }
  function I() {
    this.data.atHardBreak = !0;
  }
  function K() {
    const k = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = k;
  }
  function re() {
    const k = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = k;
  }
  function q() {
    const k = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = k;
  }
  function me() {
    const k = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      k.type += "Reference", k.referenceType = E, delete k.url, delete k.title;
    } else
      delete k.identifier, delete k.label;
    this.data.referenceType = void 0;
  }
  function fe() {
    const k = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      k.type += "Reference", k.referenceType = E, delete k.url, delete k.title;
    } else
      delete k.identifier, delete k.label;
    this.data.referenceType = void 0;
  }
  function Ie(k) {
    const E = this.sliceSerialize(k), z = this.stack[this.stack.length - 2];
    z.label = Ms(E), z.identifier = Rt(E).toLowerCase();
  }
  function je() {
    const k = this.stack[this.stack.length - 1], E = this.resume(), z = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, z.type === "link") {
      const j = k.children;
      z.children = j;
    } else
      z.alt = E;
  }
  function g() {
    const k = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = k;
  }
  function ee() {
    const k = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = k;
  }
  function Ae() {
    this.data.inReference = void 0;
  }
  function m() {
    this.data.referenceType = "collapsed";
  }
  function xe(k) {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = E, z.identifier = Rt(this.sliceSerialize(k)).toLowerCase(), this.data.referenceType = "full";
  }
  function te(k) {
    this.data.characterReferenceType = k.type;
  }
  function ie(k) {
    const E = this.sliceSerialize(k), z = this.data.characterReferenceType;
    let j;
    z ? (j = Fi(E, z === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : j = pr(E);
    const Y = this.stack[this.stack.length - 1];
    Y.value += j;
  }
  function Je(k) {
    const E = this.stack.pop();
    E.position.end = xt(k.end);
  }
  function Ce(k) {
    F.call(this, k);
    const E = this.stack[this.stack.length - 1];
    E.url = this.sliceSerialize(k);
  }
  function Fe(k) {
    F.call(this, k);
    const E = this.stack[this.stack.length - 1];
    E.url = "mailto:" + this.sliceSerialize(k);
  }
  function Ee() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function lt() {
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
  function ot() {
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
  function ze() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function pt() {
    return {
      type: "break"
    };
  }
  function tt() {
    return {
      type: "html",
      value: ""
    };
  }
  function ke() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function ht() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Me(k) {
    return {
      type: "list",
      ordered: k.type === "listOrdered",
      start: null,
      spread: k._spread,
      children: []
    };
  }
  function dt(k) {
    return {
      type: "listItem",
      spread: k._spread,
      checked: null,
      children: []
    };
  }
  function $e() {
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
  function _t() {
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
function $r(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + qt({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + qt({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + qt({
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
function Hs(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Bs(e, t) {
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
function Vs(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function js(e, t) {
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
function $s(e, t) {
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
    let w = { type: "element", tagName: a, properties: f, children: [] };
    d && (w.children = e.all(d), e.patch(d, w), w = e.applyData(d, w)), p.push(w);
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
  emphasis: Hs,
  footnoteReference: Bs,
  heading: Vs,
  html: js,
  imageReference: $s,
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
  toml: nn,
  yaml: nn,
  definition: nn,
  footnoteDefinition: nn
};
function nn() {
}
const Ji = -1, wn = 0, Yt = 1, fn = 2, fr = 3, mr = 4, gr = 5, Cr = 6, Ki = 7, Qi = 8, Gr = typeof self == "object" ? self : globalThis, s1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, l] = t[i];
    switch (a) {
      case wn:
      case Ji:
        return n(l, i);
      case Yt: {
        const o = n([], i);
        for (const u of l)
          o.push(r(u));
        return o;
      }
      case fn: {
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
    return [wn, t];
  const n = c1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [Yt, Nt];
    case "Object":
      return [fn, Nt];
    case "Date":
      return [fr, Nt];
    case "RegExp":
      return [mr, Nt];
    case "Map":
      return [gr, Nt];
    case "Set":
      return [Cr, Nt];
    case "DataView":
      return [Yt, n];
  }
  return n.includes("Array") ? [Yt, n] : n.includes("Error") ? [Ki, n] : [fn, n];
}, rn = ([e, t]) => e === wn && (t === "function" || t === "symbol"), p1 = (e, t, n, r) => {
  const i = (l, o) => {
    const u = r.push(l) - 1;
    return n.set(o, u), u;
  }, a = (l) => {
    if (n.has(l))
      return n.get(l);
    let [o, u] = Bt(l);
    switch (o) {
      case wn: {
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
      case Yt: {
        if (u) {
          let f = l;
          return u === "DataView" ? f = new Uint8Array(l.buffer) : u === "ArrayBuffer" && (f = new Uint8Array(l)), i([u, [...f]], l);
        }
        const s = [], d = i([o, s], l);
        for (const f of l)
          s.push(a(f));
        return d;
      }
      case fn: {
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
          (e || !rn(Bt(l[f]))) && s.push([a(f), a(l[f])]);
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
          (e || !(rn(Bt(f)) || rn(Bt(h)))) && s.push([a(f), a(h)]);
        return d;
      }
      case Cr: {
        const s = [], d = i([o, s], l);
        for (const f of l)
          (e || !rn(Bt(f))) && s.push(a(f));
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
}, mn = typeof structuredClone == "function" ? (
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
    const w = [], y = e.footnoteCounts.get(d);
    for (; y !== void 0 && ++h <= y; ) {
      w.length > 0 && w.push({ type: "text", value: " " });
      let P = typeof n == "string" ? n : n(u, h);
      typeof P == "string" && (P = { type: "text", value: P }), w.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + f + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(u, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(P) ? P : [P]
      });
    }
    const N = s[s.length - 1];
    if (N && N.type === "element" && N.tagName === "p") {
      const P = N.children[N.children.length - 1];
      P && P.type === "text" ? P.value += " " : N.children.push({ type: "text", value: " " }), N.children.push(...w);
    } else
      s.push(...w);
    const _ = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + f },
      children: e.wrap(s, !0)
    };
    e.patch(p, _), o.push(_);
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
            ...mn(l),
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
      return xn(e);
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
  return xn(r);
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
  return xn(n);
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
  return xn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function xn(e) {
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
function _1(e, t, n, r) {
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
      let h = ta, w, y, N;
      if ((!t || a(u, p, s[s.length - 1] || void 0)) && (h = b1(n(u, s)), h[0] === Jr))
        return h;
      if ("children" in u && u.children) {
        const _ = (
          /** @type {UnistParent} */
          u
        );
        if (_.children && h[0] !== k1)
          for (y = (r ? _.children.length : -1) + l, N = s.concat(_); y > -1 && y < _.children.length; ) {
            const P = _.children[y];
            if (w = o(P, y, N)(), w[0] === Jr)
              return w;
            y = typeof w[1] == "number" ? w[1] : y + l;
          }
      }
      return h;
    }
  }
}
function b1(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [x1, e] : e == null ? ta : [e];
}
function na(e, t, n, r) {
  let i, a, l;
  typeof t == "function" && typeof n != "function" ? (a = void 0, l = t, i = n) : (a = t, l = n, i = r), _1(e, a, o, i);
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
        const { children: y, ...N } = s, _ = mn(N);
        return _.children = o.all(s), _;
      }
      return mn(s);
    }
    return (o.options.unknownHandler || I1)(o, s, d);
  }
  function p(s) {
    const d = [];
    if ("children" in s) {
      const f = s.children;
      let h = -1;
      for (; ++h < f.length; ) {
        const w = o.one(f[h], s);
        if (w) {
          if (h && f[h - 1].type === "break" && (!Array.isArray(w) && w.type === "text" && (w.value = Kr(w.value)), !Array.isArray(w) && w.type === "element")) {
            const y = w.children[0];
            y && y.type === "text" && (y.value = Kr(y.value));
          }
          Array.isArray(w) ? d.push(...w) : d.push(w);
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
    n.type === "element" && a && Object.assign(n.properties, mn(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
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
var cn = Object.prototype.hasOwnProperty, ra = Object.prototype.toString, ti = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, ri = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : ra.call(t) === "[object Array]";
}, ii = function(t) {
  if (!t || ra.call(t) !== "[object Object]")
    return !1;
  var n = cn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && cn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || cn.call(t, i);
}, ai = function(t, n) {
  ti && n.name === "__proto__" ? ti(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, li = function(t, n) {
  if (n === "__proto__")
    if (cn.call(t, n)) {
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
  Kt(e);
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
  if (Kt(e), e.length === 0)
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
  Kt(e);
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
    Kt(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : z1(n);
}
function z1(e) {
  Kt(e);
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
function Kt(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const H1 = { cwd: B1 };
function B1() {
  return "/";
}
function Qn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function V1(e) {
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
  return j1(e);
}
function j1(e) {
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
    t ? Qn(t) ? n = { path: t } : typeof t == "string" || $1(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : H1.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
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
    Qn(t) && (t = V1(t)), Dn(t, "path"), this.path !== t && this.history.push(t);
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
    const i = new ve(
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
function $1(e) {
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
    const n = an(t), r = this.parser || this.Parser;
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
      const o = an(t), u = (
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
        ), w = r.stringify(h, f);
        Y1(w) ? f.value = w : f.result = w, p(
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
      const u = an(n);
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
    const r = an(n), i = this.compiler || this.Compiler;
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
        let [h, ...w] = s;
        const y = r[f][1];
        Kn(y) && Kn(h) && (h = Mn(!0, y, h)), r[f] = [p, h, ...w];
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
function an(e) {
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
function gn(e) {
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
    Fragment: hn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: c,
    jsxs: v,
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
          const w = s.properties[h], y = vn[h];
          (y === null || y.includes(s.tagName)) && (s.properties[h] = u(String(w || ""), h, s));
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
const at = (...e) => e.filter(Boolean).join(" "), ic = () => /* @__PURE__ */ v(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ v("g", { filter: "url(#filter0_dd_121_23927)", children: [
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
      /* @__PURE__ */ v("defs", { children: [
        /* @__PURE__ */ v(
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
), ac = ({ className: e, ...t }) => /* @__PURE__ */ c("form", { className: at("chat-wrapper__prompt-input", e), ...t }), aa = ki(
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
        className: at("chat-wrapper__prompt-textarea", t),
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
}) => /* @__PURE__ */ c("div", { className: at("chat-wrapper__prompt-toolbar", e), ...t }), oc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ c("div", { className: at("chat-wrapper__prompt-tools", e), ...t }), sc = ({
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
      className: at(
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
      className: at(
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
}, eu = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ c("select", { className: at("chat-wrapper__prompt-select", e), ...n, children: t }), tu = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ c(
  "button",
  {
    className: at("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), nu = ({
  className: e,
  ...t
}) => /* @__PURE__ */ c(
  "div",
  {
    className: at("chat-wrapper__prompt-select-content", e),
    ...t
  }
), ru = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ c(
  "div",
  {
    className: at("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), iu = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ c(
  "span",
  {
    className: at("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), uc = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = Z(0), [a, l] = Z(!1), [o, u] = Z(0);
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
const ln = Oe(Array.prototype.forEach), fc = Oe(Array.prototype.lastIndexOf), di = Oe(Array.prototype.pop), Vt = Oe(Array.prototype.push), mc = Oe(Array.prototype.splice), un = Oe(String.prototype.toLowerCase), Fn = Oe(String.prototype.toString), zn = Oe(String.prototype.match), jt = Oe(String.prototype.replace), gc = Oe(String.prototype.indexOf), Cc = Oe(String.prototype.trim), rt = Oe(Object.prototype.hasOwnProperty), Re = Oe(RegExp.prototype.test), $t = yc(TypeError);
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
function X(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : un;
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
    rt(e, t) || (e[t] = null);
  return e;
}
function Ct(e) {
  const t = er(null);
  for (const [n, r] of la(e))
    rt(e, n) && (Array.isArray(r) ? t[n] = wc(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = Ct(r) : t[n] = r);
  return t;
}
function Wt(e, t) {
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
const fi = Pe(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Un = Pe(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Hn = Pe(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), xc = Pe(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Bn = Pe(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), kc = Pe(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), mi = Pe(["#text"]), gi = Pe(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Vn = Pe(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Ci = Pe(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), on = Pe(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), _c = et(/\{\{[\w\W]*|[\w\W]*\}\}/gm), bc = et(/<%[\w\W]*|[\w\W]*%>/gm), Sc = et(/\$\{[\w\W]*/gm), Tc = et(/^data-[\-\w.\u00B7-\uFFFF]+$/), Ec = et(/^aria-[\-\w]+$/), oa = et(
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
  ERB_EXPR: bc,
  IS_ALLOWED_URI: oa,
  IS_SCRIPT_OR_DATA: vc,
  MUSTACHE_EXPR: _c,
  TMPLIT_EXPR: Sc
});
const Zt = {
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
  const t = (R) => ca(R);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== Zt.document || !e.Element)
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
  } = e, w = u.prototype, y = Wt(w, "cloneNode"), N = Wt(w, "remove"), _ = Wt(w, "nextSibling"), P = Wt(w, "childNodes"), A = Wt(w, "parentNode");
  if (typeof l == "function") {
    const R = n.createElement("template");
    R.content && R.content.ownerDocument && (n = R.content.ownerDocument);
  }
  let O, $ = "";
  const {
    implementation: x,
    createNodeIterator: V,
    createDocumentFragment: J,
    getElementsByTagName: B
  } = n, {
    importNode: F
  } = r;
  let M = wi();
  t.isSupported = typeof la == "function" && typeof A == "function" && x && x.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: I,
    ERB_EXPR: K,
    TMPLIT_EXPR: re,
    DATA_ATTR: q,
    ARIA_ATTR: me,
    IS_SCRIPT_OR_DATA: fe,
    ATTR_WHITESPACE: Ie,
    CUSTOM_ELEMENT: je
  } = yi;
  let {
    IS_ALLOWED_URI: g
  } = yi, ee = null;
  const Ae = X({}, [...fi, ...Un, ...Hn, ...Bn, ...mi]);
  let m = null;
  const xe = X({}, [...gi, ...Vn, ...Ci, ...on]);
  let te = Object.seal(er(null, {
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
  })), ie = null, Je = null;
  const Ce = Object.seal(er(null, {
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
  let Fe = !0, Ee = !0, lt = !1, vt = !0, ot = !1, yt = !0, ze = !1, pt = !1, tt = !1, ke = !1, ht = !1, Me = !1, dt = !0, $e = !1;
  const Ft = "user-content-";
  let _t = !0, ft = !1, k = {}, E = null;
  const z = X({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let j = null;
  const Y = X({}, ["audio", "video", "img", "source", "image", "track"]);
  let _e = null;
  const We = X({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Se = "http://www.w3.org/1998/Math/MathML", Ze = "http://www.w3.org/2000/svg", be = "http://www.w3.org/1999/xhtml";
  let le = be, Ne = !1, Le = null;
  const kn = X({}, [Se, Ze, be], Fn);
  let It = X({}, ["mi", "mo", "mn", "ms", "mtext"]), At = X({}, ["annotation-xml"]);
  const zt = X({}, ["title", "style", "font", "a", "script"]);
  let wt = null;
  const _n = ["application/xhtml+xml", "text/html"], wr = "text/html";
  let ye = null, mt = null;
  const bn = n.createElement("form"), Qt = function(C) {
    return C instanceof RegExp || C instanceof Function;
  }, Ut = function() {
    let C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(mt && mt === C)) {
      if ((!C || typeof C != "object") && (C = {}), C = Ct(C), wt = // eslint-disable-next-line unicorn/prefer-includes
      _n.indexOf(C.PARSER_MEDIA_TYPE) === -1 ? wr : C.PARSER_MEDIA_TYPE, ye = wt === "application/xhtml+xml" ? Fn : un, ee = rt(C, "ALLOWED_TAGS") ? X({}, C.ALLOWED_TAGS, ye) : Ae, m = rt(C, "ALLOWED_ATTR") ? X({}, C.ALLOWED_ATTR, ye) : xe, Le = rt(C, "ALLOWED_NAMESPACES") ? X({}, C.ALLOWED_NAMESPACES, Fn) : kn, _e = rt(C, "ADD_URI_SAFE_ATTR") ? X(Ct(We), C.ADD_URI_SAFE_ATTR, ye) : We, j = rt(C, "ADD_DATA_URI_TAGS") ? X(Ct(Y), C.ADD_DATA_URI_TAGS, ye) : Y, E = rt(C, "FORBID_CONTENTS") ? X({}, C.FORBID_CONTENTS, ye) : z, ie = rt(C, "FORBID_TAGS") ? X({}, C.FORBID_TAGS, ye) : Ct({}), Je = rt(C, "FORBID_ATTR") ? X({}, C.FORBID_ATTR, ye) : Ct({}), k = rt(C, "USE_PROFILES") ? C.USE_PROFILES : !1, Fe = C.ALLOW_ARIA_ATTR !== !1, Ee = C.ALLOW_DATA_ATTR !== !1, lt = C.ALLOW_UNKNOWN_PROTOCOLS || !1, vt = C.ALLOW_SELF_CLOSE_IN_ATTR !== !1, ot = C.SAFE_FOR_TEMPLATES || !1, yt = C.SAFE_FOR_XML !== !1, ze = C.WHOLE_DOCUMENT || !1, ke = C.RETURN_DOM || !1, ht = C.RETURN_DOM_FRAGMENT || !1, Me = C.RETURN_TRUSTED_TYPE || !1, tt = C.FORCE_BODY || !1, dt = C.SANITIZE_DOM !== !1, $e = C.SANITIZE_NAMED_PROPS || !1, _t = C.KEEP_CONTENT !== !1, ft = C.IN_PLACE || !1, g = C.ALLOWED_URI_REGEXP || oa, le = C.NAMESPACE || be, It = C.MATHML_TEXT_INTEGRATION_POINTS || It, At = C.HTML_INTEGRATION_POINTS || At, te = C.CUSTOM_ELEMENT_HANDLING || {}, C.CUSTOM_ELEMENT_HANDLING && Qt(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (te.tagNameCheck = C.CUSTOM_ELEMENT_HANDLING.tagNameCheck), C.CUSTOM_ELEMENT_HANDLING && Qt(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (te.attributeNameCheck = C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), C.CUSTOM_ELEMENT_HANDLING && typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (te.allowCustomizedBuiltInElements = C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), ot && (Ee = !1), ht && (ke = !0), k && (ee = X({}, mi), m = [], k.html === !0 && (X(ee, fi), X(m, gi)), k.svg === !0 && (X(ee, Un), X(m, Vn), X(m, on)), k.svgFilters === !0 && (X(ee, Hn), X(m, Vn), X(m, on)), k.mathMl === !0 && (X(ee, Bn), X(m, Ci), X(m, on))), C.ADD_TAGS && (typeof C.ADD_TAGS == "function" ? Ce.tagCheck = C.ADD_TAGS : (ee === Ae && (ee = Ct(ee)), X(ee, C.ADD_TAGS, ye))), C.ADD_ATTR && (typeof C.ADD_ATTR == "function" ? Ce.attributeCheck = C.ADD_ATTR : (m === xe && (m = Ct(m)), X(m, C.ADD_ATTR, ye))), C.ADD_URI_SAFE_ATTR && X(_e, C.ADD_URI_SAFE_ATTR, ye), C.FORBID_CONTENTS && (E === z && (E = Ct(E)), X(E, C.FORBID_CONTENTS, ye)), _t && (ee["#text"] = !0), ze && X(ee, ["html", "head", "body"]), ee.table && (X(ee, ["tbody"]), delete ie.tbody), C.TRUSTED_TYPES_POLICY) {
        if (typeof C.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw $t('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof C.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw $t('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        O = C.TRUSTED_TYPES_POLICY, $ = O.createHTML("");
      } else
        O === void 0 && (O = Nc(h, i)), O !== null && typeof $ == "string" && ($ = O.createHTML(""));
      Pe && Pe(C), mt = C;
    }
  }, en = X({}, [...Un, ...Hn, ...xc]), tn = X({}, [...Bn, ...kc]), Sn = function(C) {
    let b = A(C);
    (!b || !b.tagName) && (b = {
      namespaceURI: le,
      tagName: "template"
    });
    const L = un(C.tagName), G = un(b.tagName);
    return Le[C.namespaceURI] ? C.namespaceURI === Ze ? b.namespaceURI === be ? L === "svg" : b.namespaceURI === Se ? L === "svg" && (G === "annotation-xml" || It[G]) : !!en[L] : C.namespaceURI === Se ? b.namespaceURI === be ? L === "math" : b.namespaceURI === Ze ? L === "math" && At[G] : !!tn[L] : C.namespaceURI === be ? b.namespaceURI === Ze && !At[G] || b.namespaceURI === Se && !It[G] ? !1 : !tn[L] && (zt[L] || !en[L]) : !!(wt === "application/xhtml+xml" && Le[C.namespaceURI]) : !1;
  }, qe = function(C) {
    Vt(t.removed, {
      element: C
    });
    try {
      A(C).removeChild(C);
    } catch {
      N(C);
    }
  }, S = function(C, b) {
    try {
      Vt(t.removed, {
        attribute: b.getAttributeNode(C),
        from: b
      });
    } catch {
      Vt(t.removed, {
        attribute: null,
        from: b
      });
    }
    if (b.removeAttribute(C), C === "is")
      if (ke || ht)
        try {
          qe(b);
        } catch {
        }
      else
        try {
          b.setAttribute(C, "");
        } catch {
        }
  }, D = function(C) {
    let b = null, L = null;
    if (tt)
      C = "<remove></remove>" + C;
    else {
      const oe = zn(C, /^[\r\n\t ]+/);
      L = oe && oe[0];
    }
    wt === "application/xhtml+xml" && le === be && (C = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + C + "</body></html>");
    const G = O ? O.createHTML(C) : C;
    if (le === be)
      try {
        b = new f().parseFromString(G, wt);
      } catch {
      }
    if (!b || !b.documentElement) {
      b = x.createDocument(le, "template", null);
      try {
        b.documentElement.innerHTML = Ne ? $ : G;
      } catch {
      }
    }
    const Q = b.body || b.documentElement;
    return C && L && Q.insertBefore(n.createTextNode(L), Q.childNodes[0] || null), le === be ? B.call(b, ze ? "html" : "body")[0] : ze ? b.documentElement : Q;
  }, ae = function(C) {
    return V.call(
      C.ownerDocument || C,
      C,
      // eslint-disable-next-line no-bitwise
      p.SHOW_ELEMENT | p.SHOW_COMMENT | p.SHOW_TEXT | p.SHOW_PROCESSING_INSTRUCTION | p.SHOW_CDATA_SECTION,
      null
    );
  }, U = function(C) {
    return C instanceof d && (typeof C.nodeName != "string" || typeof C.textContent != "string" || typeof C.removeChild != "function" || !(C.attributes instanceof s) || typeof C.removeAttribute != "function" || typeof C.setAttribute != "function" || typeof C.namespaceURI != "string" || typeof C.insertBefore != "function" || typeof C.hasChildNodes != "function");
  }, de = function(C) {
    return typeof o == "function" && C instanceof o;
  };
  function ue(R, C, b) {
    ln(R, (L) => {
      L.call(t, C, b, mt);
    });
  }
  const Ue = function(C) {
    let b = null;
    if (ue(M.beforeSanitizeElements, C, null), U(C))
      return qe(C), !0;
    const L = ye(C.nodeName);
    if (ue(M.uponSanitizeElement, C, {
      tagName: L,
      allowedTags: ee
    }), yt && C.hasChildNodes() && !de(C.firstElementChild) && Re(/<[/\w!]/g, C.innerHTML) && Re(/<[/\w!]/g, C.textContent) || C.nodeType === Zt.progressingInstruction || yt && C.nodeType === Zt.comment && Re(/<[/\w]/g, C.data))
      return qe(C), !0;
    if (!(Ce.tagCheck instanceof Function && Ce.tagCheck(L)) && (!ee[L] || ie[L])) {
      if (!ie[L] && Ge(L) && (te.tagNameCheck instanceof RegExp && Re(te.tagNameCheck, L) || te.tagNameCheck instanceof Function && te.tagNameCheck(L)))
        return !1;
      if (_t && !E[L]) {
        const G = A(C) || C.parentNode, Q = P(C) || C.childNodes;
        if (Q && G) {
          const oe = Q.length;
          for (let ge = oe - 1; ge >= 0; --ge) {
            const nt = y(Q[ge], !0);
            nt.__removalCount = (C.__removalCount || 0) + 1, G.insertBefore(nt, _(C));
          }
        }
      }
      return qe(C), !0;
    }
    return C instanceof u && !Sn(C) || (L === "noscript" || L === "noembed" || L === "noframes") && Re(/<\/no(script|embed|frames)/i, C.innerHTML) ? (qe(C), !0) : (ot && C.nodeType === Zt.text && (b = C.textContent, ln([I, K, re], (G) => {
      b = jt(b, G, " ");
    }), C.textContent !== b && (Vt(t.removed, {
      element: C.cloneNode()
    }), C.textContent = b)), ue(M.afterSanitizeElements, C, null), !1);
  }, De = function(C, b, L) {
    if (dt && (b === "id" || b === "name") && (L in n || L in bn))
      return !1;
    if (!(Ee && !Je[b] && Re(q, b))) {
      if (!(Fe && Re(me, b))) {
        if (!(Ce.attributeCheck instanceof Function && Ce.attributeCheck(b, C))) {
          if (!m[b] || Je[b]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Ge(C) && (te.tagNameCheck instanceof RegExp && Re(te.tagNameCheck, C) || te.tagNameCheck instanceof Function && te.tagNameCheck(C)) && (te.attributeNameCheck instanceof RegExp && Re(te.attributeNameCheck, b) || te.attributeNameCheck instanceof Function && te.attributeNameCheck(b, C)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              b === "is" && te.allowCustomizedBuiltInElements && (te.tagNameCheck instanceof RegExp && Re(te.tagNameCheck, L) || te.tagNameCheck instanceof Function && te.tagNameCheck(L)))
            ) return !1;
          } else if (!_e[b]) {
            if (!Re(g, jt(L, Ie, ""))) {
              if (!((b === "src" || b === "xlink:href" || b === "href") && C !== "script" && gc(L, "data:") === 0 && j[C])) {
                if (!(lt && !Re(fe, jt(L, Ie, "")))) {
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
  }, Ge = function(C) {
    return C !== "annotation-xml" && zn(C, je);
  }, gt = function(C) {
    ue(M.beforeSanitizeAttributes, C, null);
    const {
      attributes: b
    } = C;
    if (!b || U(C))
      return;
    const L = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: m,
      forceKeepAttr: void 0
    };
    let G = b.length;
    for (; G--; ) {
      const Q = b[G], {
        name: oe,
        namespaceURI: ge,
        value: nt
      } = Q, Mt = ye(oe), Tn = nt;
      let Te = oe === "value" ? Tn : Cc(Tn);
      if (L.attrName = Mt, L.attrValue = Te, L.keepAttr = !0, L.forceKeepAttr = void 0, ue(M.uponSanitizeAttribute, C, L), Te = L.attrValue, $e && (Mt === "id" || Mt === "name") && (S(oe, C), Te = Ft + Te), yt && Re(/((--!?|])>)|<\/(style|title|textarea)/i, Te)) {
        S(oe, C);
        continue;
      }
      if (Mt === "attributename" && zn(Te, "href")) {
        S(oe, C);
        continue;
      }
      if (L.forceKeepAttr)
        continue;
      if (!L.keepAttr) {
        S(oe, C);
        continue;
      }
      if (!vt && Re(/\/>/i, Te)) {
        S(oe, C);
        continue;
      }
      ot && ln([I, K, re], (kr) => {
        Te = jt(Te, kr, " ");
      });
      const xr = ye(C.nodeName);
      if (!De(xr, Mt, Te)) {
        S(oe, C);
        continue;
      }
      if (O && typeof h == "object" && typeof h.getAttributeType == "function" && !ge)
        switch (h.getAttributeType(xr, Mt)) {
          case "TrustedHTML": {
            Te = O.createHTML(Te);
            break;
          }
          case "TrustedScriptURL": {
            Te = O.createScriptURL(Te);
            break;
          }
        }
      if (Te !== Tn)
        try {
          ge ? C.setAttributeNS(ge, oe, Te) : C.setAttribute(oe, Te), U(C) ? qe(C) : di(t.removed);
        } catch {
          S(oe, C);
        }
    }
    ue(M.afterSanitizeAttributes, C, null);
  }, bt = function R(C) {
    let b = null;
    const L = ae(C);
    for (ue(M.beforeSanitizeShadowDOM, C, null); b = L.nextNode(); )
      ue(M.uponSanitizeShadowNode, b, null), Ue(b), gt(b), b.content instanceof a && R(b.content);
    ue(M.afterSanitizeShadowDOM, C, null);
  };
  return t.sanitize = function(R) {
    let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, b = null, L = null, G = null, Q = null;
    if (Ne = !R, Ne && (R = "<!-->"), typeof R != "string" && !de(R))
      if (typeof R.toString == "function") {
        if (R = R.toString(), typeof R != "string")
          throw $t("dirty is not a string, aborting");
      } else
        throw $t("toString is not a function");
    if (!t.isSupported)
      return R;
    if (pt || Ut(C), t.removed = [], typeof R == "string" && (ft = !1), ft) {
      if (R.nodeName) {
        const nt = ye(R.nodeName);
        if (!ee[nt] || ie[nt])
          throw $t("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (R instanceof o)
      b = D("<!---->"), L = b.ownerDocument.importNode(R, !0), L.nodeType === Zt.element && L.nodeName === "BODY" || L.nodeName === "HTML" ? b = L : b.appendChild(L);
    else {
      if (!ke && !ot && !ze && // eslint-disable-next-line unicorn/prefer-includes
      R.indexOf("<") === -1)
        return O && Me ? O.createHTML(R) : R;
      if (b = D(R), !b)
        return ke ? null : Me ? $ : "";
    }
    b && tt && qe(b.firstChild);
    const oe = ae(ft ? R : b);
    for (; G = oe.nextNode(); )
      Ue(G), gt(G), G.content instanceof a && bt(G.content);
    if (ft)
      return R;
    if (ke) {
      if (ht)
        for (Q = J.call(b.ownerDocument); b.firstChild; )
          Q.appendChild(b.firstChild);
      else
        Q = b;
      return (m.shadowroot || m.shadowrootmode) && (Q = F.call(r, Q, !0)), Q;
    }
    let ge = ze ? b.outerHTML : b.innerHTML;
    return ze && ee["!doctype"] && b.ownerDocument && b.ownerDocument.doctype && b.ownerDocument.doctype.name && Re(sa, b.ownerDocument.doctype.name) && (ge = "<!DOCTYPE " + b.ownerDocument.doctype.name + `>
` + ge), ot && ln([I, K, re], (nt) => {
      ge = jt(ge, nt, " ");
    }), O && Me ? O.createHTML(ge) : ge;
  }, t.setConfig = function() {
    let R = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Ut(R), pt = !0;
  }, t.clearConfig = function() {
    mt = null, pt = !1;
  }, t.isValidAttribute = function(R, C, b) {
    mt || Ut({});
    const L = ye(R), G = ye(C);
    return De(L, G, b);
  }, t.addHook = function(R, C) {
    typeof C == "function" && Vt(M[R], C);
  }, t.removeHook = function(R, C) {
    if (C !== void 0) {
      const b = fc(M[R], C);
      return b === -1 ? void 0 : mc(M[R], b, 1)[0];
    }
    return di(M[R]);
  }, t.removeHooks = function(R) {
    M[R] = [];
  }, t.removeAllHooks = function() {
    M = wi();
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
function pn(e, t = !1) {
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
    const [f, h] = Z(""), [w, y] = Z([]), N = it(null), _ = t && t.length > 0 ? t : [e], P = f.length === 0 && !o && _.length > 1;
    Ca(d, () => ({
      focus: () => {
        var x;
        (x = N.current) == null || x.focus();
      },
      setText: (x) => {
        h(x), setTimeout(() => {
          var V;
          (V = N.current) == null || V.focus();
        }, 0);
      }
    }));
    const A = ce(
      (x) => {
        x.preventDefault();
        const J = new FormData(x.currentTarget).get("message");
        if (J != null && J.trim()) {
          const B = pn(J.trim(), !1);
          if (!B.trim()) {
            console.warn("Message was blocked due to security concerns");
            return;
          }
          u(B, w), h(""), y([]);
        }
      },
      [u, w]
    ), O = ce(
      (x) => {
        const J = x.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
        h(J);
      },
      []
    ), $ = ce(async () => {
      const x = document.createElement("input");
      x.type = "file", x.accept = "image/*", x.multiple = !1, x.onchange = async (V) => {
        const J = V.target.files;
        if (J) {
          const B = Array.from(J).filter((F) => {
            const M = Rc(F.name);
            return M !== F.name && console.warn(
              `File name sanitized: ${F.name} -> ${M}`
            ), F.size > 10485760 ? (console.warn(`File too large: ${F.name} (${F.size} bytes)`), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ].includes(F.type) ? !0 : (console.warn(
              `File type not allowed: ${F.name} (${F.type})`
            ), !1);
          });
          if (B.length > 0) {
            const F = await p(B);
            y(F);
          }
        }
      }, x.click();
    }, [p]);
    return /* @__PURE__ */ v(ac, { onSubmit: A, style: { position: "relative" }, children: [
      /* @__PURE__ */ c(
        aa,
        {
          ref: N,
          name: "message",
          value: f,
          onChange: O,
          placeholder: "",
          disabled: n
        }
      ),
      !f.trim() && /* @__PURE__ */ c(
        uc,
        {
          placeholderTexts: _,
          shouldAnimate: P
        }
      ),
      w.length > 0 && /* @__PURE__ */ c(
        "div",
        {
          style: {
            padding: "8px 16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center"
          },
          children: w.map((x, V) => {
            const J = x.startsWith("data:image/"), B = x.startsWith("http://") || x.startsWith("https://"), F = J || B;
            return /* @__PURE__ */ v(
              "div",
              {
                style: {
                  position: "relative",
                  display: "inline-block"
                },
                children: [
                  F ? /* @__PURE__ */ v(
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
                            src: x,
                            alt: `Attachment ${V + 1}`,
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
                  ) : /* @__PURE__ */ v(
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
                            children: /* @__PURE__ */ v(
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
                        /* @__PURE__ */ v("div", { style: { flex: 1, minWidth: 0 }, children: [
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
                                const M = x.match(/name=([^;]+)/);
                                return M ? decodeURIComponent(M[1]) : "document.pdf";
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
                                const M = x.match(/data:([^;]+)/);
                                if (M) {
                                  const I = M[1];
                                  switch (I) {
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
                                      const K = I.split("/")[1];
                                      return K ? K.toUpperCase().substring(0, 4) : "FILE";
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
                        y(
                          (M) => M.filter((I, K) => K !== V)
                        );
                      },
                      style: {
                        position: "absolute",
                        top: F ? "6px" : "8px",
                        right: F ? "6px" : "8px",
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
              V
            );
          })
        }
      ),
      /* @__PURE__ */ v(lc, { children: [
        /* @__PURE__ */ v(oc, { children: [
          i && /* @__PURE__ */ v(
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
                    onClick: $,
                    title: w.length > 0 ? `${w.length} image(s) attached` : "Attach image",
                    disabled: n,
                    style: {
                      position: "relative"
                    },
                    children: /* @__PURE__ */ v(
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
                    onClick: $,
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
          a && /* @__PURE__ */ v("div", { className: "chat-wrapper__restaurant-chip", children: [
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
}) => /* @__PURE__ */ v("div", { className: "chat-wrapper__suggested-prompts", children: [
  /* @__PURE__ */ c("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
  /* @__PURE__ */ c("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((n, r) => /* @__PURE__ */ c(
    "button",
    {
      className: "chat-wrapper__suggested-prompt-card",
      onClick: () => t(n),
      children: /* @__PURE__ */ v("div", { className: "chat-wrapper__suggested-prompt-content", children: [
        /* @__PURE__ */ c("h4", { className: "chat-wrapper__suggested-prompt-title", children: n.title }),
        /* @__PURE__ */ c("p", { className: "chat-wrapper__suggested-prompt-description", children: n.description })
      ] })
    },
    r
  )) })
] });
function zc({ children: e, isStreaming: t }) {
  const [n, r] = Z(!0), [i, a] = Z(!1);
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
  const a = () => /* @__PURE__ */ v(
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
  return /* @__PURE__ */ v(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${l ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: l ? r : void 0,
      style: { cursor: l ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ c("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ v("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ c("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        l && /* @__PURE__ */ c(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ v(
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
function Hc({
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
        return /* @__PURE__ */ v("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ v("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ c("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ c("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ c("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ c("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ v(
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
          /* @__PURE__ */ v("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
        return /* @__PURE__ */ v("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ v("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ c("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ c("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ c("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ c("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ v(
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
          /* @__PURE__ */ v("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
        return /* @__PURE__ */ v("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
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
        return /* @__PURE__ */ v("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ v("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ c("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ c("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ c("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ c("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ v(
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
          /* @__PURE__ */ v("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
  return t === "dots" ? /* @__PURE__ */ v("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
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
const Bc = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ c(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ c("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ c(ha, { size: e, variant: "dots" }) })
  }
);
async function Vc(e, t) {
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
async function jc(e, t, n) {
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
const $c = ({
  isOpen: e,
  onClose: t,
  app: n,
  apiUrl: r
}) => {
  const [i, a] = Z(null), [l, o] = Z(""), [u, p] = Z(""), [s, d] = Z(!1), [f, h] = Z(null);
  Ke(() => {
    e && !i && w();
  }, [e]);
  const w = ce(async () => {
    d(!0), h(null);
    try {
      const _ = await Vc(r, n);
      a(_), o(_.promptPath), p(_.versionUuid);
    } catch (_) {
      h(_ instanceof Error ? _.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", _);
    } finally {
      d(!1);
    }
  }, [r, n]), y = ce(async () => {
    if (i) {
      d(!0), h(null);
      try {
        const _ = await jc(r, n, {
          promptPath: l,
          versionUuid: u,
          isDefault: i.isDefault
        });
        a(_), t(), window.location.reload();
      } catch (_) {
        h(_ instanceof Error ? _.message : "Failed to update configuration"), console.error("Error updating agent configuration:", _);
      } finally {
        d(!1);
      }
    }
  }, [r, n, l, u, i, t]), N = ce(() => {
    i && (o(i.promptPath), p(i.versionUuid)), h(null), t();
  }, [i, t]);
  return e ? /* @__PURE__ */ c("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ c("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ c(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: N,
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
    /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-content", children: [
      s && /* @__PURE__ */ c("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      f && /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ v("p", { children: [
          "Error: ",
          f
        ] }),
        /* @__PURE__ */ c(
          "button",
          {
            onClick: w,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      i && !s && /* @__PURE__ */ v(hn, { children: [
        /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ c("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ c(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: l,
              onChange: (_) => o(_.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: s
            }
          ),
          /* @__PURE__ */ c("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ c("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ c(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: u,
              onChange: (_) => p(_.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: s
            }
          ),
          /* @__PURE__ */ c("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ c("div", { className: "chat-wrapper__dev-settings-info", children: /* @__PURE__ */ v("p", { children: [
          /* @__PURE__ */ c("strong", { children: "App:" }),
          " ",
          n
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ c(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: N,
          disabled: s,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ c(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save",
          onClick: y,
          disabled: s || !i,
          children: s ? "Saving..." : "Save"
        }
      )
    ] })
  ] }) }) : null;
}, Wc = ({ className: e, onClick: t }) => /* @__PURE__ */ v(
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
      /* @__PURE__ */ c("mask", { id: "mask0_444_23118", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "18", height: "18", children: /* @__PURE__ */ c("rect", { width: "18", height: "18", fill: "#D9D9D9" }) }),
      /* @__PURE__ */ c("g", { mask: "url(#mask0_444_23118)", children: /* @__PURE__ */ c("path", { d: "M5.8498 13.4998C5.47855 13.4998 5.16074 13.3676 4.89637 13.1032C4.63199 12.8389 4.4998 12.5211 4.4998 12.1498V3.1498C4.4998 2.77855 4.63199 2.46074 4.89637 2.19637C5.16074 1.93199 5.47855 1.7998 5.8498 1.7998H14.8498C15.2211 1.7998 15.5389 1.93199 15.8032 2.19637C16.0676 2.46074 16.1998 2.77855 16.1998 3.1498V12.1498C16.1998 12.5211 16.0676 12.8389 15.8032 13.1032C15.5389 13.3676 15.2211 13.4998 14.8498 13.4998H5.8498ZM5.8498 12.1498H14.8498V3.1498H5.8498V12.1498ZM3.1498 16.1998C2.77855 16.1998 2.46074 16.0676 2.19637 15.8032C1.93199 15.5389 1.7998 15.2211 1.7998 14.8498V4.4998H3.1498V14.8498H13.4998V16.1998H3.1498Z", fill: "currentColor" }) })
    ]
  }
);
class Zc {
  // Track accumulated reasoning content by ID
  constructor() {
    se(this, "sessionId", "");
    se(this, "ws", null);
    se(this, "isConnected", !1);
    se(this, "apiUrl", "http://localhost:3000");
    se(this, "userId", "");
    // Store userId from props
    se(this, "onSetMessage");
    se(this, "onSystemMessage");
    se(this, "onBusinessDataUpdate");
    se(this, "onReasoningUpdate");
    se(this, "clientTools", {});
    se(this, "toolSchemas", []);
    se(this, "contextHelpers", {});
    se(this, "reconnectAttempts", 0);
    se(this, "maxReconnectAttempts", 5);
    se(this, "reconnectTimer", null);
    se(this, "reconnectDelay", 1e3);
    // Start with 1 second
    se(this, "heartbeatInterval", null);
    se(this, "isReconnecting", !1);
    se(this, "visibilityChangeHandler");
    se(this, "initResolve");
    se(this, "initReject");
    se(this, "processedToolCalls", /* @__PURE__ */ new Set());
    // Track processed tool calls
    se(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    // Track reasoning start times by ID
    se(this, "reasoningContent", /* @__PURE__ */ new Map());
    this.sessionId = `business_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, this.visibilityChangeHandler = () => {
      document.visibilityState === "visible" && !this.isConnected && !this.isReconnecting && (console.log("Tab became visible, checking connection..."), this.attemptReconnect());
    }, typeof document < "u" && document.addEventListener(
      "visibilitychange",
      this.visibilityChangeHandler
    );
  }
  async onInit(t) {
    return this.onSetMessage = t.onSetMessage, this.onSystemMessage = t.onSystemMessage, this.onBusinessDataUpdate = t.onBusinessDataUpdate, this.onReasoningUpdate = t.onReasoningUpdate, this.clientTools = t.clientTools || {}, this.toolSchemas = t.toolSchemas || [], this.contextHelpers = t.contextHelpers, t.apiUrl && (this.apiUrl = t.apiUrl), t.userId && (this.userId = t.userId), new Promise((n, r) => {
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
              contextHelpers: this.contextHelpers
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
                const f = s.data.id || "reasoning", w = (this.reasoningContent.get(f) || "") + s.data.text;
                this.reasoningContent.set(f, w);
                const y = {
                  toolName: "reasoning",
                  callId: f,
                  parameters: { phase: "thinking", text: w }
                };
                this.onReasoningUpdate(
                  !0,
                  `🧠 ${w}`,
                  y
                );
              }
            } else if (((a = s.data) == null ? void 0 : a.type) === "reasoning-end") {
              console.log("🧠 Reasoning completed:", s.data);
              const f = s.data.id || "reasoning", h = this.reasoningContent.get(f) || "", w = this.reasoningStartTimes.get(f);
              let y = "";
              if (w && (y = ` for ${((Date.now() - w) / 1e3).toFixed(1)} seconds`, this.reasoningStartTimes.delete(f)), console.log("🧠 Reasoning end details:", {
                reasoningId: f,
                accumulatedContent: h.length > 0 ? h.substring(0, 100) + "..." : "EMPTY",
                durationText: y,
                hasStartTime: !!w
              }), this.onReasoningUpdate) {
                const N = {
                  toolName: "reasoning",
                  callId: f,
                  parameters: {
                    phase: "end",
                    duration: y,
                    fullContent: h
                  }
                }, P = `🧠 ${h || "Thought"}${y}`;
                console.log("🧠 Sending final reasoning update:", P), this.onReasoningUpdate(
                  !1,
                  P,
                  N
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
  // Method to update context helpers
  updateContextHelpers(t) {
    this.contextHelpers = { ...this.contextHelpers, ...t }, this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(
      JSON.stringify({
        type: "update_context_helpers",
        contextHelpers: this.contextHelpers
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
async function au(e, t, n) {
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
async function lu(e, t) {
  const n = `${e}/threads/conv/${t}`, r = await fetch(n);
  if (!r.ok) {
    const i = await r.json().catch(() => ({
      error: "Thread not found"
    }));
    throw new Error(i.error || "Thread not found");
  }
  return r.json();
}
async function qc(e, t) {
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
async function ou(e, t) {
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
async function su(e, t, n, r) {
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
    var w;
    const [p, s] = Z(!1), [d, f] = Z(!1), h = ce(async () => {
      try {
        await navigator.clipboard.writeText(e.content), s(!0), setTimeout(() => s(!1), 2e3);
      } catch (y) {
        console.error("Failed to copy message:", y);
      }
    }, [e.content]);
    return /* @__PURE__ */ c(
      "div",
      {
        className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
        onMouseEnter: () => e.role === "assistant" && f(!0),
        onMouseLeave: () => e.role === "assistant" && f(!1),
        children: e.role === "reasoning" ? (
          /* Reasoning message - no content wrapper */
          /* @__PURE__ */ v(zc, { isStreaming: e.isStreaming || !1, children: [
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
            Hc,
            {
              title: a(e.content, e.isStreaming),
              status: l(e.content, e.isStreaming),
              toolData: e.toolData,
              toolName: (w = e.toolData) == null ? void 0 : w.toolName,
              clientTools: o
            }
          ) })
        ) : /* @__PURE__ */ c("div", { className: "chat-wrapper__message-content", children: e.role === "assistant" && e.isStreaming && e.content === "" && e.id === u.current ? (
          /* Show streaming indicator when no content yet */
          /* @__PURE__ */ v("div", { className: "chat-wrapper__streaming-placeholder", children: [
            /* @__PURE__ */ c(ha, { size: 16, variant: "dots" }),
            /* @__PURE__ */ c("span", { children: "Thinking" })
          ] })
        ) : e.role === "system" ? (
          /* System message with collapsible tool result */
          /* @__PURE__ */ c(Gc, { message: e })
        ) : e.role === "assistant" ? (
          /* Assistant message with regular markdown display */
          /* @__PURE__ */ v("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: [
            d && /* @__PURE__ */ c(
              "button",
              {
                className: "chat-wrapper__copy-button",
                onClick: h,
                title: "Copy message",
                children: /* @__PURE__ */ c(Wc, {})
              }
            ),
            p && /* @__PURE__ */ c("div", { className: "chat-wrapper__copied-notification", children: "Copied!" }),
            /* @__PURE__ */ c("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ c(
              gn,
              {
                components: {
                  pre: ({ children: y }) => /* @__PURE__ */ c("pre", { className: "chat-wrapper__code-block", children: y }),
                  code: ({ children: y, className: N }) => !N ? /* @__PURE__ */ c("code", { className: "chat-wrapper__inline-code", children: y }) : /* @__PURE__ */ c("code", { className: "chat-wrapper__code-block", children: y }),
                  ul: ({ children: y }) => /* @__PURE__ */ c("ul", { className: "chat-wrapper__list", children: y }),
                  ol: ({ children: y }) => /* @__PURE__ */ c("ol", { className: "chat-wrapper__ordered-list", children: y }),
                  li: ({ children: y }) => /* @__PURE__ */ c("li", { className: "chat-wrapper__list-item", children: y })
                },
                children: e.content
              }
            ) })
          ] })
        ) : (
          /* User message display with markdown */
          /* @__PURE__ */ v("div", { className: "chat-wrapper__regular-message", children: [
            /* @__PURE__ */ c("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ c(
              gn,
              {
                components: {
                  pre: ({ children: y }) => /* @__PURE__ */ c("pre", { className: "chat-wrapper__code-block", children: y }),
                  code: ({ children: y, className: N }) => !N ? /* @__PURE__ */ c("code", { className: "chat-wrapper__inline-code", children: y }) : /* @__PURE__ */ c("code", { className: "chat-wrapper__code", children: y }),
                  p: ({ children: y }) => /* @__PURE__ */ c("p", { className: "chat-wrapper__paragraph", children: y }),
                  h1: ({ children: y }) => /* @__PURE__ */ c("h1", { className: "chat-wrapper__heading-1", children: y }),
                  h2: ({ children: y }) => /* @__PURE__ */ c("h2", { className: "chat-wrapper__heading-2", children: y }),
                  h3: ({ children: y }) => /* @__PURE__ */ c("h3", { className: "chat-wrapper__heading-3", children: y }),
                  ul: ({ children: y }) => /* @__PURE__ */ c("ul", { className: "chat-wrapper__list", children: y }),
                  ol: ({ children: y }) => /* @__PURE__ */ c("ol", { className: "chat-wrapper__ordered-list", children: y }),
                  li: ({ children: y }) => /* @__PURE__ */ c("li", { className: "chat-wrapper__list-item", children: y }),
                  blockquote: ({ children: y }) => /* @__PURE__ */ c("blockquote", { className: "chat-wrapper__blockquote", children: y }),
                  strong: ({ children: y }) => /* @__PURE__ */ c("strong", { className: "chat-wrapper__bold", children: y }),
                  em: ({ children: y }) => /* @__PURE__ */ c("em", { className: "chat-wrapper__italic", children: y })
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
                children: e.media.map((y, N) => {
                  const _ = y.startsWith("data:image/"), P = y.startsWith("http://") || y.startsWith("https://");
                  return /* @__PURE__ */ c(
                    "div",
                    {
                      style: {
                        position: "relative",
                        display: "inline-block"
                      },
                      children: _ || P ? /* @__PURE__ */ v(
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
                                src: y,
                                alt: `Attachment ${N + 1}`,
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
                      ) : /* @__PURE__ */ v(
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
                                children: /* @__PURE__ */ v(
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
                            /* @__PURE__ */ v("div", { style: { flex: 1, minWidth: 0 }, children: [
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
                                    const O = y.match(/name=([^;]+)/);
                                    return O ? decodeURIComponent(O[1]) : "document.pdf";
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
                                    const O = y.match(/data:([^;]+)/);
                                    if (O) {
                                      const $ = O[1];
                                      switch ($) {
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
                                          const x = $.split("/")[1];
                                          return x ? x.toUpperCase().substring(0, 4) : "FILE";
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
                    N
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
    gn,
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
function Gc({ message: e }) {
  const [t, n] = Z(!0);
  return /* @__PURE__ */ v("div", { className: "chat-wrapper__system-message", children: [
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
        children: e.role === "system" ? /* @__PURE__ */ v("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
          /* @__PURE__ */ v("span", { children: [
            "AI text input <show-toolname>",
            "..."
          ] }),
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
        ] }) : e.role === "assistant" ? e.isStreaming ? /* @__PURE__ */ v("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
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
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
        ] }) : /* @__PURE__ */ v("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
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
          /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
          gn,
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
function Yc({
  apiUrl: e,
  config: t,
  tools: n,
  clientTools: r,
  initialMessages: i = [],
  userId: a,
  devMode: l = !1,
  app: o,
  contextHelpers: u
}) {
  var qe;
  const p = ce((S) => S.replace(
    /^wss?:\/\//,
    (D) => D === "wss://" ? "https://" : "http://"
  ), []), s = St(() => p(e), [e, p]), [d, f] = Z(
    null
  ), [h, w] = Z(!1), [y, N] = Z(""), _ = it(null), [P, A] = Z(i), [O, $] = Z(!1), [x, V] = Z(!1), [J, B] = Z("idle"), [F, M] = Z(!1), [I, K] = Z(t.mode), [re, q] = Z(!1), [me, fe] = Z(
    null
  ), [Ie, je] = Z(null), [g, ee] = Z(null), [Ae] = Z([]), [m, xe] = Z(""), [te, ie] = Z(!1), [, Je] = Z(""), [Ce, Fe] = Z(""), [Ee, lt] = Z(!1), [, vt] = Z(
    /* @__PURE__ */ new Map()
  ), [, ot] = Z(
    /* @__PURE__ */ new Map()
  ), [yt, ze] = Z(!1), pt = it(null), tt = it(null), ke = it(null), ht = it(!0), Me = it(""), dt = it(!1), $e = ce(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), Ft = St(
    () => (S, D) => D === !1 ? S.includes("❌") ? "error" : "completed" : S.includes("✅ Completed:") || S.includes("✅") ? "completed" : S.includes("❌") ? "error" : "processing",
    []
  ), _t = St(
    () => (S) => {
      const D = S.match(/for ([\d.]+) seconds/);
      return D ? ` for ${D[1]} seconds` : void 0;
    },
    []
  ), ft = St(
    () => (S) => {
      let D = S.replace(/^🧠\s*/, "");
      return D = D.replace(/\s*for [\d.]+\s*seconds$/, ""), D = D.replace(/\*\*(.*?)\*\*/g, ""), D;
    },
    []
  ), k = St(
    () => (S, D) => (console.log("🔍 getReasoningTitle:", { content: S, isStreaming: D }), D === !1 ? S.includes("❌") ? "Error" : (S.includes("🧠") && S.includes("for") && S.includes("seconds") || S.includes("🧠 Thought"), "Thought") : S.includes("✅ Completed:") || S.includes("✅") ? "Completed" : S.includes("❌") ? "Error" : (S.includes("🔧 Handling:") || S.includes("🧠") && !S.includes("AI is thinking"), "Thinking...")),
    []
  ), E = St(
    () => (S, D) => D === !1 ? S.includes("❌") ? "Tool Error" : "Tool Completed" : S.includes("✅ Completed:") || S.includes("✅") ? "Tool Completed" : S.includes("❌") ? "Tool Error" : (S.includes("🔧 Handling:"), "Tool Processing..."),
    []
  ), z = St(
    () => (S, D) => D === !1 ? S.includes("❌") ? "error" : "completed" : S.includes("✅ Completed:") || S.includes("✅") ? "completed" : S.includes("❌") ? "error" : "processing",
    []
  ), j = ce(
    (S, D) => {
      const U = pn(D, S === "assistant");
      A((de) => [
        ...de,
        {
          id: $e(),
          role: S,
          content: U,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [$e]
  ), Y = ce(() => {
    if (ke.current && Me.current) {
      const S = pn(
        Me.current,
        !0
      ), D = {
        id: ke.current,
        role: "assistant",
        content: S,
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !1
      };
      return A((ae) => [...ae, D]), ke.current = null, Me.current = "", Fe(""), !0;
    }
    return !1;
  }, []), _e = ce(() => {
    $(!1), ie(!1), B("idle"), Y(), setTimeout(() => {
      var S;
      (S = tt.current) == null || S.focus();
    }, 0);
  }, [Y]), We = ce(
    (S) => {
      console.error("Chat error:", S), $(!1), ie(!1), B("error"), Y(), j("system", `❌ Chat error: ${S}`);
    },
    [j, Y]
  ), Se = ce(async () => {
    try {
      const S = new Zc();
      _.current = S, f(S), N(S.getSessionId());
      const D = u || {};
      await S.onInit({
        apiUrl: e,
        userId: a,
        toolSchemas: r,
        clientTools: n,
        contextHelpers: D,
        onSetMessage: (ae) => {
          const U = pn(ae, !0);
          if (ke.current)
            Me.current += U, Fe(Me.current);
          else {
            ie(!1);
            const de = $e();
            ke.current = de, Me.current = U, Fe(U);
          }
        },
        onSystemMessage: (ae) => {
          if (ae.includes("Chat completed"))
            _e();
          else if (ae.includes("Chat error")) {
            const U = ae.match(/Chat error: (.+)/);
            U && We(U[1]);
          }
        },
        onReasoningUpdate: (ae, U, de) => {
          console.log("🤔 Reasoning update:", {
            isThinking: ae,
            content: U,
            toolCallRequest: de
          });
          const { callId: ue } = de || {};
          if (lt(ae), Je(U), !ue) {
            console.log("⚠️ No callId provided for reasoning update");
            return;
          }
          const Ue = !1, De = U.includes("🧠") && !U.includes("for") && !U.includes("seconds"), Ge = U.includes("🧠") && U.includes("for") && U.includes("seconds"), gt = U.includes("🔧 Handling:"), bt = U.includes("✅ Completed:"), R = U.includes("❌ Error:");
          console.log("🔍 Debug reasoning conditions:", {
            isReasoningStarted: Ue,
            isReasoningThinking: De,
            isReasoningCompleted: Ge,
            isToolStarted: gt,
            isToolCompleted: bt,
            isToolError: R,
            callId: ue,
            isHandlingTool: Ee
          }), (De || Ge) && ot((C) => {
            const b = new Map(C), L = b.get(ue);
            if (De && !L) {
              Y();
              const G = $e();
              b.set(ue, G);
              const Q = {
                id: G,
                role: "reasoning",
                content: U,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0
              };
              A((oe) => [...oe, Q]);
            } else Ge && L ? (A(
              (G) => G.map(
                (Q) => Q.id === L ? {
                  ...Q,
                  content: U,
                  isStreaming: !1
                  // Mark as completed
                } : Q
              )
            ), b.delete(ue)) : L && De && A(
              (G) => G.map(
                (Q) => Q.id === L ? {
                  ...Q,
                  content: U,
                  isStreaming: !0
                } : Q
              )
            );
            return b;
          }), vt((C) => {
            const b = new Map(C), L = b.get(ue);
            if (gt && !L) {
              Y();
              const G = U.match(/🔧 Handling: (.+)/), Q = G ? G[1] : "Unknown Tool", oe = $e();
              b.set(ue, oe);
              const ge = {
                id: oe,
                role: "tooling",
                content: U,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0,
                toolData: {
                  ...de,
                  toolName: Q,
                  callId: ue,
                  status: "processing"
                }
              };
              A((nt) => [...nt, ge]);
            } else if ((bt || R) && L) {
              const G = U.match(
                /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
              ), Q = G ? G[1] : "Unknown Tool";
              A(
                (oe) => oe.map(
                  (ge) => ge.id === L ? {
                    ...ge,
                    content: U,
                    isStreaming: !1,
                    // Mark as completed
                    toolData: {
                      ...ge.toolData,
                      toolName: Q,
                      status: R ? "error" : "completed",
                      callId: ue ?? ""
                    }
                  } : ge
                )
              ), b.delete(ue);
            } else L && Ee && !bt && !R && A(
              (G) => G.map(
                (Q) => Q.id === L ? {
                  ...Q,
                  content: U,
                  isStreaming: !0
                } : Q
              )
            );
            return b;
          });
        },
        onBusinessDataUpdate: (ae) => {
          t.onBusinessDataUpdate && t.onBusinessDataUpdate(ae);
        }
      }), w(!0), console.log("BusinessAgentClient connected");
    } catch (S) {
      console.error("Error connecting BusinessAgentClient:", S), w(!1);
    }
  }, [
    e,
    r,
    n,
    t,
    $e,
    j,
    _e,
    We,
    Y
  ]), Ze = ce(() => {
    _.current && (_.current.disconnect(), _.current = null), f(null), w(!1), N("");
  }, []), be = ce(() => {
    console.log("🔍 DEBUG: resetToolHandling called! Stack trace:"), console.trace(), lt(!1), ht.current = !0;
  }, []), le = it(null), Ne = ce(() => {
    le.current && cancelAnimationFrame(le.current), le.current = requestAnimationFrame(() => {
      var S;
      (S = pt.current) == null || S.scrollIntoView({ behavior: "smooth" }), le.current = null;
    });
  }, []);
  Ke(() => {
    Ne();
  }, [P, Ne]), Ke(() => {
    Ce && Ne();
  }, [Ce, Ne]), Ke(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(m);
  }, [m, t]), Ke(() => {
    console.log("🔍 DEBUG: isHandlingTool state changed:", Ee);
  }, [Ee]), Ke(() => {
    console.log("💭 DEBUG: isHandlingReasoning state changed:");
  }, []), Ke(() => (console.log("Connecting BusinessAgentClient..."), Se(), () => {
    Ze(), le.current && cancelAnimationFrame(le.current);
  }), [Se, Ze]), Ke(() => {
    const S = setInterval(() => {
      if (_.current) {
        const D = _.current.getConnectionStatus();
        w(D.connected);
      }
    }, 1e3);
    return () => clearInterval(S);
  }, []), Ke(() => {
    (async () => {
      if (a && !dt.current && !re && !(P.length > 0))
        try {
          q(!0), fe(null), console.log(`📚 Fetching threads for user: ${a}`);
          const D = [];
          if (D.length === 0) {
            console.log("ℹ️ No threads found for user"), q(!1), dt.current = !0;
            return;
          }
          const ae = D[0];
          console.log(
            `📖 Loading thread: ${ae.id} (${ae.title})`
          ), je(ae.id), ee(ae.convUuid);
          const U = await qc(
            s,
            ae.id
          );
          console.log(`✅ Loaded ${U.length} messages`), A(U), dt.current = !0;
        } catch (D) {
          console.error("❌ Error loading conversation:", D), fe(
            D instanceof Error ? D.message : "Failed to load conversation"
          ), dt.current = !0;
        } finally {
          q(!1);
        }
    })();
  }, [a, s]);
  const Le = ce(
    async (S, D) => {
      if (!S.trim() || O || !d || !h)
        return;
      const ae = {
        id: $e(),
        role: "user",
        content: S.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: D
      };
      A((U) => [...U, ae]), $(!0), ie(!0), B("submitted"), xe("Starting...");
      try {
        await d.onTriggerMessage(
          ae.content,
          o,
          D,
          g || void 0,
          void 0
        ), B("streaming");
      } catch (U) {
        console.error("Agent client send error:", U), ie(!1), B("error"), j(
          "system",
          `Sorry, there was an error: ${U instanceof Error ? U.message : "Unknown error"}`
        ), t.onError && t.onError(
          U instanceof Error ? U : new Error("Unknown error")
        ), $(!1), B("idle"), xe("");
      }
    },
    [
      O,
      d,
      h,
      $e,
      j,
      t,
      g
    ]
  ), kn = ce(() => {
    $(!1), B("idle"), xe(""), ie(!1), Je(""), ke.current = null, Me.current = "", Fe(""), be();
  }, [be]), It = ce(
    async (S) => {
      console.log("Files selected:", S);
      const D = [], ae = e || "http://localhost:3000", U = "chat-uploads";
      for (const de of S)
        try {
          const ue = new FormData();
          ue.append("file", de), ue.append("folder", U), console.log(`Uploading file: ${de.name} to ${ae}/upload`);
          const Ue = await fetch(`${ae}/upload`, {
            method: "POST",
            body: ue
          }), De = await Ue.json();
          if (Ue.ok)
            console.log("✅ Upload successful:", De), de.type.startsWith("image/") ? D.push(De.url) : D.push(
              `data:${de.type};name=${encodeURIComponent(
                De.fileName || de.name
              )};url=${encodeURIComponent(De.url)}`
            );
          else if (console.error("❌ Upload failed:", De.error), de.type.startsWith("image/")) {
            const Ge = new FileReader(), gt = await new Promise(
              (bt, R) => {
                Ge.onload = () => bt(Ge.result), Ge.onerror = R, Ge.readAsDataURL(de);
              }
            );
            D.push(gt);
          } else
            D.push(
              `data:${de.type};name=${encodeURIComponent(
                de.name
              )};base64,placeholder`
            );
        } catch (ue) {
          console.error("Error uploading file:", ue);
          try {
            if (de.type.startsWith("image/")) {
              const Ue = new FileReader(), De = await new Promise(
                (Ge, gt) => {
                  Ue.onload = () => Ge(Ue.result), Ue.onerror = gt, Ue.readAsDataURL(de);
                }
              );
              D.push(De);
            } else
              D.push(
                `data:${de.type};name=${encodeURIComponent(
                  de.name
                )};base64,placeholder`
              );
          } catch (Ue) {
            console.error("Error in fallback encoding:", Ue);
          }
        }
      return console.log("Added media:", D), D;
    },
    [e]
  ), At = ce(() => {
    V(!0);
  }, []), zt = ce(() => {
    V(!1);
  }, []), wt = ce(() => {
    M((S) => !S);
  }, []), _n = ce(() => {
    K((S) => S === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  Ke(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const S = (D) => {
      D.key === "Escape" && I === "modal" && x && zt();
    };
    if (I === "modal" && x)
      return document.addEventListener("keydown", S), () => document.removeEventListener("keydown", S);
  }, [I, x, zt]);
  const ye = ((...S) => S.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${I}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`,
    F && "chat-wrapper--collapsed",
    I === "embedded" && t.constrainedHeight && "chat-wrapper--constrained"
  ), mt = () => {
    var D;
    if (I === "modal" && !x || I === "sidebar" && F || I === "fullscreen" && F) {
      const ae = I === "modal" ? At : wt, U = I === "modal" ? `Open ${t.appName}` : `Expand ${t.appName}`;
      return /* @__PURE__ */ v(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: ae,
          title: U,
          children: [
            /* @__PURE__ */ v(
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
            ((D = t.features) == null ? void 0 : D.showBubbleText) !== !1 && /* @__PURE__ */ c("span", { className: "chat-wrapper__bubble-text", children: t.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, bn = () => I === "modal" && x ? /* @__PURE__ */ c(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: zt,
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
  ) : null, Qt = () => {
    if ((I === "sidebar" || I === "fullscreen") && !F) {
      const S = I === "fullscreen";
      return /* @__PURE__ */ c(
        "button",
        {
          className: S ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: _n,
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
  }, Ut = () => (I === "sidebar" || I === "fullscreen") && !F ? /* @__PURE__ */ c(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: wt,
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
  ) : null, en = () => l && t.headerVisible !== !1 ? /* @__PURE__ */ c(
    "button",
    {
      className: "chat-wrapper__settings-button",
      onClick: () => ze(!0),
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
  ) : null, tn = () => !l || t.headerVisible !== !1 ? null : /* @__PURE__ */ c(
    "button",
    {
      className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
      onClick: () => ze(!0),
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
  ), Sn = () => {
    var S;
    return !((S = t.features) != null && S.showToolResults) || Ae.length === 0 ? null : /* @__PURE__ */ v("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ c("h4", { children: "Tool Results" }),
      /* @__PURE__ */ c("div", { className: "chat-wrapper__tool-results-list", children: Ae.map((D) => /* @__PURE__ */ v("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ c("div", { className: "chat-wrapper__tool-result-title", children: D.title }),
        D.description && /* @__PURE__ */ c("div", { className: "chat-wrapper__tool-result-description", children: D.description }),
        /* @__PURE__ */ v("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          D.status || "completed"
        ] })
      ] }, D.id)) })
    ] });
  };
  return I === "modal" && !x || (I === "sidebar" || I === "fullscreen") && F ? mt() : /* @__PURE__ */ c(hn, { children: /* @__PURE__ */ v("div", { className: ye, style: t.customStyles, children: [
    tn(),
    t.headerVisible !== !1 && /* @__PURE__ */ v("div", { className: "chat-wrapper__header", children: [
      /* @__PURE__ */ v("div", { className: "chat-wrapper__title-area", children: [
        /* @__PURE__ */ c("h2", { className: "chat-wrapper__title", children: t.appName }),
        /* @__PURE__ */ c("div", { className: "chat-wrapper__connection-status", children: /* @__PURE__ */ c(
          "span",
          {
            className: `chat-wrapper__connection-indicator ${h ? "connected" : "disconnected"}`,
            title: h ? `Connected to WebSocket${y ? ` (Session: ${y.slice(-8)})` : ""}` : "Disconnected from WebSocket",
            children: h ? "🟢" : "🔴"
          }
        ) })
      ] }),
      /* @__PURE__ */ v("div", { className: "chat-wrapper__header-controls", children: [
        en(),
        Qt(),
        Ut(),
        bn()
      ] })
    ] }),
    !F && /* @__PURE__ */ v(hn, { children: [
      me && /* @__PURE__ */ c("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ v("p", { children: [
        "⚠️ ",
        me
      ] }) }),
      P.length === 0 && !O && !re && /* @__PURE__ */ v("div", { className: "chat-wrapper__main-header", children: [
        /* @__PURE__ */ c("h1", { className: "chat-wrapper__main-title", children: t.appName }),
        t.description && /* @__PURE__ */ c("p", { className: "chat-wrapper__description", children: t.description })
      ] }),
      /* @__PURE__ */ v(
        "div",
        {
          className: `chat-wrapper__content ${P.length === 0 && !O && !re ? "chat-wrapper__content--empty" : "chat-wrapper__content--with-messages"}`,
          children: [
            /* @__PURE__ */ v("div", { className: "chat-wrapper__messages", children: [
              re && P.length === 0 && /* @__PURE__ */ c(Bc, { fullHeight: !0 }),
              P.map((S) => /* @__PURE__ */ c(
                da,
                {
                  message: S,
                  getReasoningTitle: k,
                  getReasoningStatus: Ft,
                  getReasoningDuration: _t,
                  getReasoningContentOnly: ft,
                  getToolingTitle: E,
                  getToolingStatus: z,
                  clientTools: r || [],
                  currentAssistantMessageIdRef: ke
                },
                S.id
              )),
              ke.current && Ce && /* @__PURE__ */ c(
                fa,
                {
                  content: Ce,
                  messageId: ke.current
                }
              ),
              te && !Ee && /* @__PURE__ */ c("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ c("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ v("div", { className: "chat-wrapper__thinking-dots", children: [
                /* @__PURE__ */ c("span", {}),
                /* @__PURE__ */ c("span", {}),
                /* @__PURE__ */ c("span", {})
              ] }) }) }) }),
              /* @__PURE__ */ c("div", { ref: pt })
            ] }),
            Sn(),
            /* @__PURE__ */ c("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ c(
              Oc,
              {
                ref: tt,
                placeholder: t.placeholder,
                placeholderTexts: t.placeholderTexts,
                disabled: O,
                chatStatus: J,
                fileUploadEnabled: (qe = t.features) == null ? void 0 : qe.fileUpload,
                restaurantName: t.restaurantName,
                restaurantLogo: t.restaurantLogo,
                hasMessages: P.length > 0,
                onSubmit: (S, D) => Le(S, D),
                onFileUpload: It,
                onStopGeneration: kn
              }
            ) }),
            P.length === 0 && !O && !re && t.suggestedPrompts && /* @__PURE__ */ c(
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
      $c,
      {
        isOpen: yt,
        onClose: () => ze(!1),
        app: o,
        apiUrl: e
      }
    )
  ] }) });
}
const cu = rr(Yc);
class Xc {
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
function uu(e, t) {
  const [n, r] = Z([]), [i, a] = Z(!1), [l, o] = Z(null), u = it(null), p = it(new Xc(e, t)), s = ce(async () => {
    try {
      const h = await p.current.initConversation();
      return u.current = h, h;
    } catch (h) {
      throw o(h), h;
    }
  }, []), d = ce(
    async (h) => {
      u.current || await s();
      const w = {
        id: Date.now().toString(),
        role: "user",
        content: h,
        timestamp: /* @__PURE__ */ new Date()
      };
      r((N) => [...N, w]), a(!0), o(null);
      const y = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      r((N) => [...N, y]);
      try {
        const N = p.current.streamMessage(
          u.current,
          h
        );
        for await (const _ of N)
          r(
            (P) => P.map(
              (A) => A.id === y.id ? { ...A, content: A.content + _ } : A
            )
          );
        r(
          (_) => _.map(
            (P) => P.id === y.id ? { ...P, isStreaming: !1 } : P
          )
        );
      } catch (N) {
        o(N), r((_) => _.filter((P) => P.id !== y.id));
      } finally {
        a(!1);
      }
    },
    [s]
  ), f = ce(() => {
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
  cu as ChatWrapper,
  $c as DevSettings,
  Bc as InlineLoader,
  ha as Loader,
  ac as PromptInput,
  sc as PromptInputButton,
  eu as PromptInputModelSelect,
  nu as PromptInputModelSelectContent,
  ru as PromptInputModelSelectItem,
  tu as PromptInputModelSelectTrigger,
  iu as PromptInputModelSelectValue,
  cc as PromptInputSubmit,
  aa as PromptInputTextarea,
  lc as PromptInputToolbar,
  oc as PromptInputTools,
  zc as Reasoning,
  pa as ReasoningContent,
  ua as ReasoningTrigger,
  Fc as SuggestedPrompts,
  su as createThread,
  ou as fetchMessagesByConvUuid,
  lu as fetchThreadByConvUuid,
  qc as fetchThreadMessages,
  au as fetchUserThreads,
  uu as useChatConnection
};
