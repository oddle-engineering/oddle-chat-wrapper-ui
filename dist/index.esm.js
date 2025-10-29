var ba = Object.defineProperty;
var Sa = (e, t, n) => t in e ? ba(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ne = (e, t, n) => Sa(e, typeof t != "symbol" ? t + "" : t, n);
import { jsxs as v, jsx as s, Fragment as xn } from "react/jsx-runtime";
import Ht, { forwardRef as Ii, useState as X, useEffect as lt, useRef as mt, useImperativeHandle as Ea, useCallback as ce, memo as hr, useMemo as At } from "react";
function Ta(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const va = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Aa = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ia = {};
function Ir(e, t) {
  return (Ia.jsx ? Aa : va).test(e);
}
const Na = /[ \t\n\f\r]/g;
function La(e) {
  return typeof e == "object" ? e.type === "text" ? Nr(e.value) : !1 : Nr(e);
}
function Nr(e) {
  return e.replace(Na, "") === "";
}
class an {
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
an.prototype.normal = {};
an.prototype.property = {};
an.prototype.space = void 0;
function Ni(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new an(n, r, t);
}
function Kn(e) {
  return e.toLowerCase();
}
class je {
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
je.prototype.attribute = "";
je.prototype.booleanish = !1;
je.prototype.boolean = !1;
je.prototype.commaOrSpaceSeparated = !1;
je.prototype.commaSeparated = !1;
je.prototype.defined = !1;
je.prototype.mustUseProperty = !1;
je.prototype.number = !1;
je.prototype.overloadedBoolean = !1;
je.prototype.property = "";
je.prototype.spaceSeparated = !1;
je.prototype.space = void 0;
let Ra = 0;
const W = Nt(), we = Nt(), Qn = Nt(), E = Nt(), le = Nt(), Ut = Nt(), Ge = Nt();
function Nt() {
  return 2 ** ++Ra;
}
const Jn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: W,
  booleanish: we,
  commaOrSpaceSeparated: Ge,
  commaSeparated: Ut,
  number: E,
  overloadedBoolean: Qn,
  spaceSeparated: le
}, Symbol.toStringTag, { value: "Module" })), On = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Jn)
);
class pr extends je {
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
    if (super(t, n), Lr(this, "space", i), typeof r == "number")
      for (; ++a < On.length; ) {
        const l = On[a];
        Lr(this, On[a], (r & Jn[l]) === Jn[l]);
      }
  }
}
pr.prototype.defined = !0;
function Lr(e, t, n) {
  n && (e[t] = n);
}
function Bt(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new pr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[Kn(r)] = r, n[Kn(a.attribute)] = r;
  }
  return new an(t, n, e.space);
}
const Li = Bt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: we,
    ariaAutoComplete: null,
    ariaBusy: we,
    ariaChecked: we,
    ariaColCount: E,
    ariaColIndex: E,
    ariaColSpan: E,
    ariaControls: le,
    ariaCurrent: null,
    ariaDescribedBy: le,
    ariaDetails: null,
    ariaDisabled: we,
    ariaDropEffect: le,
    ariaErrorMessage: null,
    ariaExpanded: we,
    ariaFlowTo: le,
    ariaGrabbed: we,
    ariaHasPopup: null,
    ariaHidden: we,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: le,
    ariaLevel: E,
    ariaLive: null,
    ariaModal: we,
    ariaMultiLine: we,
    ariaMultiSelectable: we,
    ariaOrientation: null,
    ariaOwns: le,
    ariaPlaceholder: null,
    ariaPosInSet: E,
    ariaPressed: we,
    ariaReadOnly: we,
    ariaRelevant: null,
    ariaRequired: we,
    ariaRoleDescription: le,
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
function Ri(e, t) {
  return t in e ? e[t] : t;
}
function Mi(e, t) {
  return Ri(e, t.toLowerCase());
}
const Ma = Bt({
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
    accept: Ut,
    acceptCharset: le,
    accessKey: le,
    action: null,
    allow: null,
    allowFullScreen: W,
    allowPaymentRequest: W,
    allowUserMedia: W,
    alt: null,
    as: null,
    async: W,
    autoCapitalize: null,
    autoComplete: le,
    autoFocus: W,
    autoPlay: W,
    blocking: le,
    capture: null,
    charSet: null,
    checked: W,
    cite: null,
    className: le,
    cols: E,
    colSpan: null,
    content: null,
    contentEditable: we,
    controls: W,
    controlsList: le,
    coords: E | Ut,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: W,
    defer: W,
    dir: null,
    dirName: null,
    disabled: W,
    download: Qn,
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
    headers: le,
    height: E,
    hidden: Qn,
    high: E,
    href: null,
    hrefLang: null,
    htmlFor: le,
    httpEquiv: le,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: W,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: W,
    itemId: null,
    itemProp: le,
    itemRef: le,
    itemScope: W,
    itemType: le,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: W,
    low: E,
    manifest: null,
    max: null,
    maxLength: E,
    media: null,
    method: null,
    min: null,
    minLength: E,
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
    optimum: E,
    pattern: null,
    ping: le,
    placeholder: null,
    playsInline: W,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: W,
    referrerPolicy: null,
    rel: le,
    required: W,
    reversed: W,
    rows: E,
    rowSpan: E,
    sandbox: le,
    scope: null,
    scoped: W,
    seamless: W,
    selected: W,
    shadowRootClonable: W,
    shadowRootDelegatesFocus: W,
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
    typeMustMatch: W,
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
    archive: le,
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
    disablePictureInPicture: W,
    disableRemotePlayback: W,
    prefix: null,
    property: null,
    results: E,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Mi
}), Oa = Bt({
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
    className: le,
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
    download: W,
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
    g1: Ut,
    g2: Ut,
    glyphName: Ut,
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
    ping: le,
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
  transform: Ri
}), Oi = Bt({
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
}), Di = Bt({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Mi
}), Pi = Bt({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), Da = {
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
}, Pa = /[A-Z]/g, Rr = /-[a-z]/g, Ha = /^data[-\w.:]+$/i;
function Ua(e, t) {
  const n = Kn(t);
  let r = t, i = je;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Ha.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(Rr, Fa);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!Rr.test(a)) {
        let l = a.replace(Pa, za);
        l.charAt(0) !== "-" && (l = "-" + l), t = "data" + l;
      }
    }
    i = pr;
  }
  return new i(r, t);
}
function za(e) {
  return "-" + e.toLowerCase();
}
function Fa(e) {
  return e.charAt(1).toUpperCase();
}
const Ba = Ni([Li, Ma, Oi, Di, Pi], "html"), dr = Ni([Li, Oa, Oi, Di, Pi], "svg");
function Va(e) {
  return e.join(" ").trim();
}
var _n = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Hi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var fr = {}, Mr = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, ja = /\n/g, Wa = /^\s*/, $a = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Za = /^:\s*/, Ga = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, qa = /^[;\s]*/, Ya = /^\s+|\s+$/g, Xa = `
`, Or = "/", Dr = "*", It = "", Ka = "comment", Qa = "declaration", Ja = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(_) {
    var y = _.match(ja);
    y && (n += y.length);
    var N = _.lastIndexOf(Xa);
    r = ~N ? _.length - N : r + _.length;
  }
  function a() {
    var _ = { line: n, column: r };
    return function(y) {
      return y.position = new l(_), h(), y;
    };
  }
  function l(_) {
    this.start = _, this.end = { line: n, column: r }, this.source = t.source;
  }
  l.prototype.content = e;
  function o(_) {
    var y = new Error(
      t.source + ":" + n + ":" + r + ": " + _
    );
    if (y.reason = _, y.filename = t.source, y.line = n, y.column = r, y.source = e, !t.silent) throw y;
  }
  function c(_) {
    var y = _.exec(e);
    if (y) {
      var N = y[0];
      return i(N), e = e.slice(N.length), y;
    }
  }
  function h() {
    c(Wa);
  }
  function u(_) {
    var y;
    for (_ = _ || []; y = d(); )
      y !== !1 && _.push(y);
    return _;
  }
  function d() {
    var _ = a();
    if (!(Or != e.charAt(0) || Dr != e.charAt(1))) {
      for (var y = 2; It != e.charAt(y) && (Dr != e.charAt(y) || Or != e.charAt(y + 1)); )
        ++y;
      if (y += 2, It === e.charAt(y - 1))
        return o("End of comment missing");
      var N = e.slice(2, y - 2);
      return r += 2, i(N), e = e.slice(y), r += 2, _({
        type: Ka,
        comment: N
      });
    }
  }
  function C() {
    var _ = a(), y = c($a);
    if (y) {
      if (d(), !c(Za)) return o("property missing ':'");
      var N = c(Ga), k = _({
        type: Qa,
        property: Pr(y[0].replace(Mr, It)),
        value: N ? Pr(N[0].replace(Mr, It)) : It
      });
      return c(qa), k;
    }
  }
  function p() {
    var _ = [];
    u(_);
    for (var y; y = C(); )
      y !== !1 && (_.push(y), u(_));
    return _;
  }
  return h(), p();
};
function Pr(e) {
  return e ? e.replace(Ya, It) : It;
}
var el = _n && _n.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(fr, "__esModule", { value: !0 });
fr.default = nl;
const tl = el(Ja);
function nl(e, t) {
  let n = null;
  if (!e || typeof e != "string")
    return n;
  const r = (0, tl.default)(e), i = typeof t == "function";
  return r.forEach((a) => {
    if (a.type !== "declaration")
      return;
    const { property: l, value: o } = a;
    i ? t(l, o, a) : o && (n = n || {}, n[l] = o);
  }), n;
}
var En = {};
Object.defineProperty(En, "__esModule", { value: !0 });
En.camelCase = void 0;
var rl = /^--[a-zA-Z0-9_-]+$/, il = /-([a-z])/g, al = /^[^-]+$/, ll = /^-(webkit|moz|ms|o|khtml)-/, ol = /^-(ms)-/, sl = function(e) {
  return !e || al.test(e) || rl.test(e);
}, cl = function(e, t) {
  return t.toUpperCase();
}, Hr = function(e, t) {
  return "".concat(t, "-");
}, ul = function(e, t) {
  return t === void 0 && (t = {}), sl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(ol, Hr) : e = e.replace(ll, Hr), e.replace(il, cl));
};
En.camelCase = ul;
var hl = _n && _n.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, pl = hl(fr), dl = En;
function er(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, pl.default)(e, function(r, i) {
    r && i && (n[(0, dl.camelCase)(r, t)] = i);
  }), n;
}
er.default = er;
var fl = er;
const ml = /* @__PURE__ */ Hi(fl), Ui = zi("end"), mr = zi("start");
function zi(e) {
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
function gl(e) {
  const t = mr(e), n = Ui(e);
  if (t && n)
    return { start: t, end: n };
}
function en(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Ur(e.position) : "start" in e || "end" in e ? Ur(e) : "line" in e || "column" in e ? tr(e) : "";
}
function tr(e) {
  return zr(e && e.line) + ":" + zr(e && e.column);
}
function Ur(e) {
  return tr(e && e.start) + "-" + tr(e && e.end);
}
function zr(e) {
  return e && typeof e == "number" ? e : 1;
}
class Le extends Error {
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
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = o ? o.line : void 0, this.name = en(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = l && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Le.prototype.file = "";
Le.prototype.name = "";
Le.prototype.reason = "";
Le.prototype.message = "";
Le.prototype.stack = "";
Le.prototype.column = void 0;
Le.prototype.line = void 0;
Le.prototype.ancestors = void 0;
Le.prototype.cause = void 0;
Le.prototype.fatal = void 0;
Le.prototype.place = void 0;
Le.prototype.ruleId = void 0;
Le.prototype.source = void 0;
const gr = {}.hasOwnProperty, Cl = /* @__PURE__ */ new Map(), yl = /[A-Z]/g, wl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), xl = /* @__PURE__ */ new Set(["td", "th"]), Fi = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function _l(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Il(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Al(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? dr : Ba,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = Bi(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function Bi(e, t, n) {
  if (t.type === "element")
    return kl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return bl(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return El(e, t, n);
  if (t.type === "mdxjsEsm")
    return Sl(e, t);
  if (t.type === "root")
    return Tl(e, t, n);
  if (t.type === "text")
    return vl(e, t);
}
function kl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = dr, e.schema = i), e.ancestors.push(t);
  const a = ji(e, t.tagName, !1), l = Nl(e, t);
  let o = yr(e, t);
  return wl.has(t.tagName) && (o = o.filter(function(c) {
    return typeof c == "string" ? !La(c) : !0;
  })), Vi(e, l, a, t), Cr(l, o), e.ancestors.pop(), e.schema = r, e.create(t, a, l, n);
}
function bl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  rn(e, t.position);
}
function Sl(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  rn(e, t.position);
}
function El(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = dr, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : ji(e, t.name, !0), l = Ll(e, t), o = yr(e, t);
  return Vi(e, l, a, t), Cr(l, o), e.ancestors.pop(), e.schema = r, e.create(t, a, l, n);
}
function Tl(e, t, n) {
  const r = {};
  return Cr(r, yr(e, t)), e.create(t, e.Fragment, r, n);
}
function vl(e, t) {
  return t.value;
}
function Vi(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function Cr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function Al(e, t, n) {
  return r;
  function r(i, a, l, o) {
    const h = Array.isArray(l.children) ? n : t;
    return o ? h(a, l, o) : h(a, l);
  }
}
function Il(e, t) {
  return n;
  function n(r, i, a, l) {
    const o = Array.isArray(a.children), c = mr(r);
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
function Nl(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && gr.call(t.properties, i)) {
      const a = Rl(e, i, t.properties[i]);
      if (a) {
        const [l, o] = a;
        e.tableCellAlignToStyle && l === "align" && typeof o == "string" && xl.has(t.tagName) ? r = o : n[l] = o;
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
function Ll(e, t) {
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
        rn(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const o = r.value.data.estree.body[0];
          o.type, a = e.evaluater.evaluateExpression(o.expression);
        } else
          rn(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function yr(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Cl;
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
    const o = Bi(e, a, l);
    o !== void 0 && n.push(o);
  }
  return n;
}
function Rl(e, t, n) {
  const r = Ua(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Ta(n) : Va(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Ml(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Ol(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Da[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Ml(e, t) {
  try {
    return ml(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new Le("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Fi + "#cannot-parse-style-attribute", i;
  }
}
function ji(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let a = -1, l;
    for (; ++a < i.length; ) {
      const o = Ir(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
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
    r = Ir(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return gr.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  rn(e);
}
function rn(e, t) {
  const n = new Le(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Fi + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Ol(e) {
  const t = {};
  let n;
  for (n in e)
    gr.call(e, n) && (t[Dl(n)] = e[n]);
  return t;
}
function Dl(e) {
  let t = e.replace(yl, Pl);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Pl(e) {
  return "-" + e.toLowerCase();
}
const Dn = {
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
}, Hl = {};
function Ul(e, t) {
  const n = Hl, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Wi(e, r, i);
}
function Wi(e, t, n) {
  if (zl(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Fr(e.children, t, n);
  }
  return Array.isArray(e) ? Fr(e, t, n) : "";
}
function Fr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Wi(e[i], t, n);
  return r.join("");
}
function zl(e) {
  return !!(e && typeof e == "object");
}
const Br = document.createElement("i");
function wr(e) {
  const t = "&" + e + ";";
  Br.innerHTML = t;
  const n = Br.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function st(e, t, n, r) {
  const i = e.length;
  let a = 0, l;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    l = Array.from(r), l.unshift(t, n), e.splice(...l);
  else
    for (n && e.splice(t, n); a < r.length; )
      l = r.slice(a, a + 1e4), l.unshift(t, 0), e.splice(...l), a += 1e4, t += 1e4;
}
function et(e, t) {
  return e.length > 0 ? (st(e, e.length, 0, t), e) : t;
}
const Vr = {}.hasOwnProperty;
function Fl(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    Bl(t, e[n]);
  return t;
}
function Bl(e, t) {
  let n;
  for (n in t) {
    const i = (Vr.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let l;
    if (a)
      for (l in a) {
        Vr.call(i, l) || (i[l] = []);
        const o = a[l];
        Vl(
          // @ts-expect-error Looks like a list.
          i[l],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function Vl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  st(e, 0, 0, r);
}
function $i(e, t) {
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
const ot = Et(/[A-Za-z]/), qe = Et(/[\dA-Za-z]/), jl = Et(/[#-'*+\--9=?A-Z^-~]/);
function nr(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const rr = Et(/\d/), Wl = Et(/[\dA-Fa-f]/), $l = Et(/[!-/:-@[-`{-~]/);
function F(e) {
  return e !== null && e < -2;
}
function Ve(e) {
  return e !== null && (e < 0 || e === 32);
}
function re(e) {
  return e === -2 || e === -1 || e === 32;
}
const Zl = Et(new RegExp("\\p{P}|\\p{S}", "u")), Gl = Et(/\s/);
function Et(e) {
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
    let l = "";
    if (a === 37 && qe(e.charCodeAt(n + 1)) && qe(e.charCodeAt(n + 2)))
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
function oe(e, t, n, r) {
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
const ql = {
  tokenize: Yl
};
function Yl(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), oe(e, t, "linePrefix");
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
    return F(o) ? (e.consume(o), e.exit("chunkText"), a) : (e.consume(o), l);
  }
}
const Xl = {
  tokenize: Kl
}, jr = {
  tokenize: Ql
};
function Kl(e) {
  const t = this, n = [];
  let r = 0, i, a, l;
  return o;
  function o(R) {
    if (r < n.length) {
      const P = n[r];
      return t.containerState = P[1], e.attempt(P[0].continuation, c, h)(R);
    }
    return h(R);
  }
  function c(R) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && z();
      const P = t.events.length;
      let Z = P, w;
      for (; Z--; )
        if (t.events[Z][0] === "exit" && t.events[Z][1].type === "chunkFlow") {
          w = t.events[Z][1].end;
          break;
        }
      k(r);
      let U = P;
      for (; U < t.events.length; )
        t.events[U][1].end = {
          ...w
        }, U++;
      return st(t.events, Z + 1, 0, t.events.slice(P)), t.events.length = U, h(R);
    }
    return o(R);
  }
  function h(R) {
    if (r === n.length) {
      if (!i)
        return C(R);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return _(R);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(jr, u, d)(R);
  }
  function u(R) {
    return i && z(), k(r), C(R);
  }
  function d(R) {
    return t.parser.lazy[t.now().line] = r !== n.length, l = t.now().offset, _(R);
  }
  function C(R) {
    return t.containerState = {}, e.attempt(jr, p, _)(R);
  }
  function p(R) {
    return r++, n.push([t.currentConstruct, t.containerState]), C(R);
  }
  function _(R) {
    if (R === null) {
      i && z(), k(0), e.consume(R);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: a
    }), y(R);
  }
  function y(R) {
    if (R === null) {
      N(e.exit("chunkFlow"), !0), k(0), e.consume(R);
      return;
    }
    return F(R) ? (e.consume(R), N(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, o) : (e.consume(R), y);
  }
  function N(R, P) {
    const Z = t.sliceStream(R);
    if (P && Z.push(null), R.previous = a, a && (a.next = R), a = R, i.defineSkip(R.start), i.write(Z), t.parser.lazy[R.start.line]) {
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
      let V = U, $, D;
      for (; V--; )
        if (t.events[V][0] === "exit" && t.events[V][1].type === "chunkFlow") {
          if ($) {
            D = t.events[V][1].end;
            break;
          }
          $ = !0;
        }
      for (k(r), w = U; w < t.events.length; )
        t.events[w][1].end = {
          ...D
        }, w++;
      st(t.events, V + 1, 0, t.events.slice(U)), t.events.length = w;
    }
  }
  function k(R) {
    let P = n.length;
    for (; P-- > R; ) {
      const Z = n[P];
      t.containerState = Z[1], Z[0].exit.call(t, e);
    }
    n.length = R;
  }
  function z() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Ql(e, t, n) {
  return oe(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Wr(e) {
  if (e === null || Ve(e) || Gl(e))
    return 1;
  if (Zl(e))
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
const ir = {
  name: "attention",
  resolveAll: Jl,
  tokenize: eo
};
function Jl(e, t) {
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
          $r(d, -c), $r(C, c), l = {
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
          }, h = [], e[r][1].end.offset - e[r][1].start.offset && (h = et(h, [["enter", e[r][1], t], ["exit", e[r][1], t]])), h = et(h, [["enter", i, t], ["enter", l, t], ["exit", l, t], ["enter", a, t]]), h = et(h, xr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), h = et(h, [["exit", a, t], ["enter", o, t], ["exit", o, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, h = et(h, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : u = 0, st(e, r - 1, n - r + 3, h), n = r + h.length - u - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function eo(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Wr(r);
  let a;
  return l;
  function l(c) {
    return a = c, e.enter("attentionSequence"), o(c);
  }
  function o(c) {
    if (c === a)
      return e.consume(c), o;
    const h = e.exit("attentionSequence"), u = Wr(c), d = !u || u === 2 && i || n.includes(c), C = !i || i === 2 && u || n.includes(r);
    return h._open = !!(a === 42 ? d : d && (i || !C)), h._close = !!(a === 42 ? C : C && (u || !d)), t(c);
  }
}
function $r(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const to = {
  name: "autolink",
  tokenize: no
};
function no(e, t, n) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(p) {
    return ot(p) ? (e.consume(p), l) : p === 64 ? n(p) : h(p);
  }
  function l(p) {
    return p === 43 || p === 45 || p === 46 || qe(p) ? (r = 1, o(p)) : h(p);
  }
  function o(p) {
    return p === 58 ? (e.consume(p), r = 0, c) : (p === 43 || p === 45 || p === 46 || qe(p)) && r++ < 32 ? (e.consume(p), o) : (r = 0, h(p));
  }
  function c(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : p === null || p === 32 || p === 60 || nr(p) ? n(p) : (e.consume(p), c);
  }
  function h(p) {
    return p === 64 ? (e.consume(p), u) : jl(p) ? (e.consume(p), h) : n(p);
  }
  function u(p) {
    return qe(p) ? d(p) : n(p);
  }
  function d(p) {
    return p === 46 ? (e.consume(p), r = 0, u) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : C(p);
  }
  function C(p) {
    if ((p === 45 || qe(p)) && r++ < 63) {
      const _ = p === 45 ? C : d;
      return e.consume(p), _;
    }
    return n(p);
  }
}
const Tn = {
  partial: !0,
  tokenize: ro
};
function ro(e, t, n) {
  return r;
  function r(a) {
    return re(a) ? oe(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || F(a) ? t(a) : n(a);
  }
}
const Zi = {
  continuation: {
    tokenize: ao
  },
  exit: lo,
  name: "blockQuote",
  tokenize: io
};
function io(e, t, n) {
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
function ao(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return re(l) ? oe(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : a(l);
  }
  function a(l) {
    return e.attempt(Zi, t, n)(l);
  }
}
function lo(e) {
  e.exit("blockQuote");
}
const Gi = {
  name: "characterEscape",
  tokenize: oo
};
function oo(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return $l(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const qi = {
  name: "characterReference",
  tokenize: so
};
function so(e, t, n) {
  const r = this;
  let i = 0, a, l;
  return o;
  function o(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), c;
  }
  function c(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), h) : (e.enter("characterReferenceValue"), a = 31, l = qe, u(d));
  }
  function h(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, l = Wl, u) : (e.enter("characterReferenceValue"), a = 7, l = rr, u(d));
  }
  function u(d) {
    if (d === 59 && i) {
      const C = e.exit("characterReferenceValue");
      return l === qe && !wr(r.sliceSerialize(C)) ? n(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return l(d) && i++ < a ? (e.consume(d), u) : n(d);
  }
}
const Zr = {
  partial: !0,
  tokenize: uo
}, Gr = {
  concrete: !0,
  name: "codeFenced",
  tokenize: co
};
function co(e, t, n) {
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
    return w === o ? (l++, e.consume(w), u) : l < 3 ? n(w) : (e.exit("codeFencedFenceSequence"), re(w) ? oe(e, d, "whitespace")(w) : d(w));
  }
  function d(w) {
    return w === null || F(w) ? (e.exit("codeFencedFence"), r.interrupt ? t(w) : e.check(Zr, y, P)(w)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), C(w));
  }
  function C(w) {
    return w === null || F(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(w)) : re(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), oe(e, p, "whitespace")(w)) : w === 96 && w === o ? n(w) : (e.consume(w), C);
  }
  function p(w) {
    return w === null || F(w) ? d(w) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), _(w));
  }
  function _(w) {
    return w === null || F(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(w)) : w === 96 && w === o ? n(w) : (e.consume(w), _);
  }
  function y(w) {
    return e.attempt(i, P, N)(w);
  }
  function N(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), k;
  }
  function k(w) {
    return a > 0 && re(w) ? oe(e, z, "linePrefix", a + 1)(w) : z(w);
  }
  function z(w) {
    return w === null || F(w) ? e.check(Zr, y, P)(w) : (e.enter("codeFlowValue"), R(w));
  }
  function R(w) {
    return w === null || F(w) ? (e.exit("codeFlowValue"), z(w)) : (e.consume(w), R);
  }
  function P(w) {
    return e.exit("codeFenced"), t(w);
  }
  function Z(w, U, V) {
    let $ = 0;
    return D;
    function D(G) {
      return w.enter("lineEnding"), w.consume(G), w.exit("lineEnding"), I;
    }
    function I(G) {
      return w.enter("codeFencedFence"), re(G) ? oe(w, M, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(G) : M(G);
    }
    function M(G) {
      return G === o ? (w.enter("codeFencedFenceSequence"), q(G)) : V(G);
    }
    function q(G) {
      return G === o ? ($++, w.consume(G), q) : $ >= l ? (w.exit("codeFencedFenceSequence"), re(G) ? oe(w, ae, "whitespace")(G) : ae(G)) : V(G);
    }
    function ae(G) {
      return G === null || F(G) ? (w.exit("codeFencedFence"), U(G)) : V(G);
    }
  }
}
function uo(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return l === null ? n(l) : (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), a);
  }
  function a(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
const Pn = {
  name: "codeIndented",
  tokenize: po
}, ho = {
  partial: !0,
  tokenize: fo
};
function po(e, t, n) {
  const r = this;
  return i;
  function i(h) {
    return e.enter("codeIndented"), oe(e, a, "linePrefix", 5)(h);
  }
  function a(h) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? l(h) : n(h);
  }
  function l(h) {
    return h === null ? c(h) : F(h) ? e.attempt(ho, l, c)(h) : (e.enter("codeFlowValue"), o(h));
  }
  function o(h) {
    return h === null || F(h) ? (e.exit("codeFlowValue"), l(h)) : (e.consume(h), o);
  }
  function c(h) {
    return e.exit("codeIndented"), t(h);
  }
}
function fo(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line] ? n(l) : F(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), i) : oe(e, a, "linePrefix", 5)(l);
  }
  function a(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(l) : F(l) ? i(l) : n(l);
  }
}
const mo = {
  name: "codeText",
  previous: Co,
  resolve: go,
  tokenize: yo
};
function go(e) {
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
function Co(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function yo(e, t, n) {
  let r = 0, i, a;
  return l;
  function l(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), o(d);
  }
  function o(d) {
    return d === 96 ? (e.consume(d), r++, o) : (e.exit("codeTextSequence"), c(d));
  }
  function c(d) {
    return d === null ? n(d) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), c) : d === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(d)) : F(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), c) : (e.enter("codeTextData"), h(d));
  }
  function h(d) {
    return d === null || d === 32 || d === 96 || F(d) ? (e.exit("codeTextData"), c(d)) : (e.consume(d), h);
  }
  function u(d) {
    return d === 96 ? (e.consume(d), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(d)) : (a.type = "codeTextData", h(d));
  }
}
class wo {
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
    return r && Gt(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Gt(this.left, t);
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
    this.setCursor(0), Gt(this.right, t.reverse());
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
        Gt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Gt(this.left, n.reverse());
      }
  }
}
function Gt(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function Yi(e) {
  const t = {};
  let n = -1, r, i, a, l, o, c, h;
  const u = new wo(e);
  for (; ++n < u.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === "lineEndingBlank" && (a += 2), a < c.length && c[a][1].type === "content"))
      for (; ++a < c.length && c[a][1].type !== "content"; )
        c[a][1].type === "chunkText" && (c[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, xo(u, n)), n = t[n], h = !0);
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
  return st(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !h;
}
function xo(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let l = n._tokenizer;
  l || (l = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (l._contentTypeTextTrailing = !0));
  const o = l.events, c = [], h = {};
  let u, d, C = -1, p = n, _ = 0, y = 0;
  const N = [y];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && l.defineSkip(p.start), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(u), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
  }
  for (p = n; ++C < o.length; )
    // Find a void token that includes a break.
    o[C][0] === "exit" && o[C - 1][0] === "enter" && o[C][1].type === o[C - 1][1].type && o[C][1].start.line !== o[C][1].end.line && (y = C + 1, N.push(y), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (l.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : N.pop(), C = N.length; C--; ) {
    const k = o.slice(N[C], N[C + 1]), z = a.pop();
    c.push([z, z + k.length - 1]), e.splice(z, 2, k);
  }
  for (c.reverse(), C = -1; ++C < c.length; )
    h[_ + c[C][0]] = _ + c[C][1], _ += c[C][1] - c[C][0] - 1;
  return h;
}
const _o = {
  resolve: bo,
  tokenize: So
}, ko = {
  partial: !0,
  tokenize: Eo
};
function bo(e) {
  return Yi(e), e;
}
function So(e, t) {
  let n;
  return r;
  function r(o) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(o);
  }
  function i(o) {
    return o === null ? a(o) : F(o) ? e.check(ko, l, a)(o) : (e.consume(o), i);
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
function Eo(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), oe(e, a, "linePrefix");
  }
  function a(l) {
    if (l === null || F(l))
      return n(l);
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(l) : e.interrupt(r.parser.constructs.flow, n, t)(l);
  }
}
function Xi(e, t, n, r, i, a, l, o, c) {
  const h = c || Number.POSITIVE_INFINITY;
  let u = 0;
  return d;
  function d(k) {
    return k === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(k), e.exit(a), C) : k === null || k === 32 || k === 41 || nr(k) ? n(k) : (e.enter(r), e.enter(l), e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), y(k));
  }
  function C(k) {
    return k === 62 ? (e.enter(a), e.consume(k), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), p(k));
  }
  function p(k) {
    return k === 62 ? (e.exit("chunkString"), e.exit(o), C(k)) : k === null || k === 60 || F(k) ? n(k) : (e.consume(k), k === 92 ? _ : p);
  }
  function _(k) {
    return k === 60 || k === 62 || k === 92 ? (e.consume(k), p) : p(k);
  }
  function y(k) {
    return !u && (k === null || k === 41 || Ve(k)) ? (e.exit("chunkString"), e.exit(o), e.exit(l), e.exit(r), t(k)) : u < h && k === 40 ? (e.consume(k), u++, y) : k === 41 ? (e.consume(k), u--, y) : k === null || k === 32 || k === 40 || nr(k) ? n(k) : (e.consume(k), k === 92 ? N : y);
  }
  function N(k) {
    return k === 40 || k === 41 || k === 92 ? (e.consume(k), y) : y(k);
  }
}
function Ki(e, t, n, r, i, a) {
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
    p === 94 && !o && "_hiddenFootnoteSupport" in l.parser.constructs ? n(p) : p === 93 ? (e.exit(a), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : F(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), d(p));
  }
  function d(p) {
    return p === null || p === 91 || p === 93 || F(p) || o++ > 999 ? (e.exit("chunkString"), u(p)) : (e.consume(p), c || (c = !re(p)), p === 92 ? C : d);
  }
  function C(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), o++, d) : d(p);
  }
}
function Qi(e, t, n, r, i, a) {
  let l;
  return o;
  function o(C) {
    return C === 34 || C === 39 || C === 40 ? (e.enter(r), e.enter(i), e.consume(C), e.exit(i), l = C === 40 ? 41 : C, c) : n(C);
  }
  function c(C) {
    return C === l ? (e.enter(i), e.consume(C), e.exit(i), e.exit(r), t) : (e.enter(a), h(C));
  }
  function h(C) {
    return C === l ? (e.exit(a), c(l)) : C === null ? n(C) : F(C) ? (e.enter("lineEnding"), e.consume(C), e.exit("lineEnding"), oe(e, h, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), u(C));
  }
  function u(C) {
    return C === l || C === null || F(C) ? (e.exit("chunkString"), h(C)) : (e.consume(C), C === 92 ? d : u);
  }
  function d(C) {
    return C === l || C === 92 ? (e.consume(C), u) : u(C);
  }
}
function tn(e, t) {
  let n;
  return r;
  function r(i) {
    return F(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : re(i) ? oe(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const To = {
  name: "definition",
  tokenize: Ao
}, vo = {
  partial: !0,
  tokenize: Io
};
function Ao(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(p) {
    return e.enter("definition"), l(p);
  }
  function l(p) {
    return Ki.call(
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
    return i = zt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), c) : n(p);
  }
  function c(p) {
    return Ve(p) ? tn(e, h)(p) : h(p);
  }
  function h(p) {
    return Xi(
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
    return e.attempt(vo, d, d)(p);
  }
  function d(p) {
    return re(p) ? oe(e, C, "whitespace")(p) : C(p);
  }
  function C(p) {
    return p === null || F(p) ? (e.exit("definition"), r.parser.defined.push(i), t(p)) : n(p);
  }
}
function Io(e, t, n) {
  return r;
  function r(o) {
    return Ve(o) ? tn(e, i)(o) : n(o);
  }
  function i(o) {
    return Qi(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
  }
  function a(o) {
    return re(o) ? oe(e, l, "whitespace")(o) : l(o);
  }
  function l(o) {
    return o === null || F(o) ? t(o) : n(o);
  }
}
const No = {
  name: "hardBreakEscape",
  tokenize: Lo
};
function Lo(e, t, n) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), i;
  }
  function i(a) {
    return F(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
  }
}
const Ro = {
  name: "headingAtx",
  resolve: Mo,
  tokenize: Oo
};
function Mo(e, t) {
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
function Oo(e, t, n) {
  let r = 0;
  return i;
  function i(u) {
    return e.enter("atxHeading"), a(u);
  }
  function a(u) {
    return e.enter("atxHeadingSequence"), l(u);
  }
  function l(u) {
    return u === 35 && r++ < 6 ? (e.consume(u), l) : u === null || Ve(u) ? (e.exit("atxHeadingSequence"), o(u)) : n(u);
  }
  function o(u) {
    return u === 35 ? (e.enter("atxHeadingSequence"), c(u)) : u === null || F(u) ? (e.exit("atxHeading"), t(u)) : re(u) ? oe(e, o, "whitespace")(u) : (e.enter("atxHeadingText"), h(u));
  }
  function c(u) {
    return u === 35 ? (e.consume(u), c) : (e.exit("atxHeadingSequence"), o(u));
  }
  function h(u) {
    return u === null || u === 35 || Ve(u) ? (e.exit("atxHeadingText"), o(u)) : (e.consume(u), h);
  }
}
const Do = [
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
], qr = ["pre", "script", "style", "textarea"], Po = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: zo,
  tokenize: Fo
}, Ho = {
  partial: !0,
  tokenize: Vo
}, Uo = {
  partial: !0,
  tokenize: Bo
};
function zo(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Fo(e, t, n) {
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
    return f === 33 ? (e.consume(f), C) : f === 47 ? (e.consume(f), a = !0, y) : f === 63 ? (e.consume(f), i = 3, r.interrupt ? t : g) : ot(f) ? (e.consume(f), l = String.fromCharCode(f), N) : n(f);
  }
  function C(f) {
    return f === 45 ? (e.consume(f), i = 2, p) : f === 91 ? (e.consume(f), i = 5, o = 0, _) : ot(f) ? (e.consume(f), i = 4, r.interrupt ? t : g) : n(f);
  }
  function p(f) {
    return f === 45 ? (e.consume(f), r.interrupt ? t : g) : n(f);
  }
  function _(f) {
    const me = "CDATA[";
    return f === me.charCodeAt(o++) ? (e.consume(f), o === me.length ? r.interrupt ? t : M : _) : n(f);
  }
  function y(f) {
    return ot(f) ? (e.consume(f), l = String.fromCharCode(f), N) : n(f);
  }
  function N(f) {
    if (f === null || f === 47 || f === 62 || Ve(f)) {
      const me = f === 47, ee = l.toLowerCase();
      return !me && !a && qr.includes(ee) ? (i = 1, r.interrupt ? t(f) : M(f)) : Do.includes(l.toLowerCase()) ? (i = 6, me ? (e.consume(f), k) : r.interrupt ? t(f) : M(f)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(f) : a ? z(f) : R(f));
    }
    return f === 45 || qe(f) ? (e.consume(f), l += String.fromCharCode(f), N) : n(f);
  }
  function k(f) {
    return f === 62 ? (e.consume(f), r.interrupt ? t : M) : n(f);
  }
  function z(f) {
    return re(f) ? (e.consume(f), z) : D(f);
  }
  function R(f) {
    return f === 47 ? (e.consume(f), D) : f === 58 || f === 95 || ot(f) ? (e.consume(f), P) : re(f) ? (e.consume(f), R) : D(f);
  }
  function P(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || qe(f) ? (e.consume(f), P) : Z(f);
  }
  function Z(f) {
    return f === 61 ? (e.consume(f), w) : re(f) ? (e.consume(f), Z) : R(f);
  }
  function w(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), c = f, U) : re(f) ? (e.consume(f), w) : V(f);
  }
  function U(f) {
    return f === c ? (e.consume(f), c = null, $) : f === null || F(f) ? n(f) : (e.consume(f), U);
  }
  function V(f) {
    return f === null || f === 34 || f === 39 || f === 47 || f === 60 || f === 61 || f === 62 || f === 96 || Ve(f) ? Z(f) : (e.consume(f), V);
  }
  function $(f) {
    return f === 47 || f === 62 || re(f) ? R(f) : n(f);
  }
  function D(f) {
    return f === 62 ? (e.consume(f), I) : n(f);
  }
  function I(f) {
    return f === null || F(f) ? M(f) : re(f) ? (e.consume(f), I) : n(f);
  }
  function M(f) {
    return f === 45 && i === 2 ? (e.consume(f), xe) : f === 60 && i === 1 ? (e.consume(f), fe) : f === 62 && i === 4 ? (e.consume(f), Q) : f === 63 && i === 3 ? (e.consume(f), g) : f === 93 && i === 5 ? (e.consume(f), We) : F(f) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Ho, ve, q)(f)) : f === null || F(f) ? (e.exit("htmlFlowData"), q(f)) : (e.consume(f), M);
  }
  function q(f) {
    return e.check(Uo, ae, ve)(f);
  }
  function ae(f) {
    return e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), G;
  }
  function G(f) {
    return f === null || F(f) ? q(f) : (e.enter("htmlFlowData"), M(f));
  }
  function xe(f) {
    return f === 45 ? (e.consume(f), g) : M(f);
  }
  function fe(f) {
    return f === 47 ? (e.consume(f), l = "", be) : M(f);
  }
  function be(f) {
    if (f === 62) {
      const me = l.toLowerCase();
      return qr.includes(me) ? (e.consume(f), Q) : M(f);
    }
    return ot(f) && l.length < 8 ? (e.consume(f), l += String.fromCharCode(f), be) : M(f);
  }
  function We(f) {
    return f === 93 ? (e.consume(f), g) : M(f);
  }
  function g(f) {
    return f === 62 ? (e.consume(f), Q) : f === 45 && i === 2 ? (e.consume(f), g) : M(f);
  }
  function Q(f) {
    return f === null || F(f) ? (e.exit("htmlFlowData"), ve(f)) : (e.consume(f), Q);
  }
  function ve(f) {
    return e.exit("htmlFlow"), t(f);
  }
}
function Bo(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return F(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), a) : n(l);
  }
  function a(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
function Vo(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(Tn, t, n);
  }
}
const jo = {
  name: "htmlText",
  tokenize: Wo
};
function Wo(e, t, n) {
  const r = this;
  let i, a, l;
  return o;
  function o(g) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), c;
  }
  function c(g) {
    return g === 33 ? (e.consume(g), h) : g === 47 ? (e.consume(g), Z) : g === 63 ? (e.consume(g), R) : ot(g) ? (e.consume(g), V) : n(g);
  }
  function h(g) {
    return g === 45 ? (e.consume(g), u) : g === 91 ? (e.consume(g), a = 0, _) : ot(g) ? (e.consume(g), z) : n(g);
  }
  function u(g) {
    return g === 45 ? (e.consume(g), p) : n(g);
  }
  function d(g) {
    return g === null ? n(g) : g === 45 ? (e.consume(g), C) : F(g) ? (l = d, fe(g)) : (e.consume(g), d);
  }
  function C(g) {
    return g === 45 ? (e.consume(g), p) : d(g);
  }
  function p(g) {
    return g === 62 ? xe(g) : g === 45 ? C(g) : d(g);
  }
  function _(g) {
    const Q = "CDATA[";
    return g === Q.charCodeAt(a++) ? (e.consume(g), a === Q.length ? y : _) : n(g);
  }
  function y(g) {
    return g === null ? n(g) : g === 93 ? (e.consume(g), N) : F(g) ? (l = y, fe(g)) : (e.consume(g), y);
  }
  function N(g) {
    return g === 93 ? (e.consume(g), k) : y(g);
  }
  function k(g) {
    return g === 62 ? xe(g) : g === 93 ? (e.consume(g), k) : y(g);
  }
  function z(g) {
    return g === null || g === 62 ? xe(g) : F(g) ? (l = z, fe(g)) : (e.consume(g), z);
  }
  function R(g) {
    return g === null ? n(g) : g === 63 ? (e.consume(g), P) : F(g) ? (l = R, fe(g)) : (e.consume(g), R);
  }
  function P(g) {
    return g === 62 ? xe(g) : R(g);
  }
  function Z(g) {
    return ot(g) ? (e.consume(g), w) : n(g);
  }
  function w(g) {
    return g === 45 || qe(g) ? (e.consume(g), w) : U(g);
  }
  function U(g) {
    return F(g) ? (l = U, fe(g)) : re(g) ? (e.consume(g), U) : xe(g);
  }
  function V(g) {
    return g === 45 || qe(g) ? (e.consume(g), V) : g === 47 || g === 62 || Ve(g) ? $(g) : n(g);
  }
  function $(g) {
    return g === 47 ? (e.consume(g), xe) : g === 58 || g === 95 || ot(g) ? (e.consume(g), D) : F(g) ? (l = $, fe(g)) : re(g) ? (e.consume(g), $) : xe(g);
  }
  function D(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || qe(g) ? (e.consume(g), D) : I(g);
  }
  function I(g) {
    return g === 61 ? (e.consume(g), M) : F(g) ? (l = I, fe(g)) : re(g) ? (e.consume(g), I) : $(g);
  }
  function M(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), i = g, q) : F(g) ? (l = M, fe(g)) : re(g) ? (e.consume(g), M) : (e.consume(g), ae);
  }
  function q(g) {
    return g === i ? (e.consume(g), i = void 0, G) : g === null ? n(g) : F(g) ? (l = q, fe(g)) : (e.consume(g), q);
  }
  function ae(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? n(g) : g === 47 || g === 62 || Ve(g) ? $(g) : (e.consume(g), ae);
  }
  function G(g) {
    return g === 47 || g === 62 || Ve(g) ? $(g) : n(g);
  }
  function xe(g) {
    return g === 62 ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(g);
  }
  function fe(g) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), be;
  }
  function be(g) {
    return re(g) ? oe(e, We, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(g) : We(g);
  }
  function We(g) {
    return e.enter("htmlTextData"), l(g);
  }
}
const _r = {
  name: "labelEnd",
  resolveAll: qo,
  resolveTo: Yo,
  tokenize: Xo
}, $o = {
  tokenize: Ko
}, Zo = {
  tokenize: Qo
}, Go = {
  tokenize: Jo
};
function qo(e) {
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
function Yo(e, t) {
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
  return o = [["enter", c, t], ["enter", h, t]], o = et(o, e.slice(a + 1, a + r + 3)), o = et(o, [["enter", u, t]]), o = et(o, xr(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, l - 3), t)), o = et(o, [["exit", u, t], e[l - 2], e[l - 1], ["exit", h, t]]), o = et(o, e.slice(l + 1)), o = et(o, [["exit", c, t]]), st(e, a, e.length, o), e;
}
function Xo(e, t, n) {
  const r = this;
  let i = r.events.length, a, l;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return o;
  function o(C) {
    return a ? a._inactive ? d(C) : (l = r.parser.defined.includes(zt(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(C), e.exit("labelMarker"), e.exit("labelEnd"), c) : n(C);
  }
  function c(C) {
    return C === 40 ? e.attempt($o, u, l ? u : d)(C) : C === 91 ? e.attempt(Zo, u, l ? h : d)(C) : l ? u(C) : d(C);
  }
  function h(C) {
    return e.attempt(Go, u, d)(C);
  }
  function u(C) {
    return t(C);
  }
  function d(C) {
    return a._balanced = !0, n(C);
  }
}
function Ko(e, t, n) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), i;
  }
  function i(d) {
    return Ve(d) ? tn(e, a)(d) : a(d);
  }
  function a(d) {
    return d === 41 ? u(d) : Xi(e, l, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function l(d) {
    return Ve(d) ? tn(e, c)(d) : u(d);
  }
  function o(d) {
    return n(d);
  }
  function c(d) {
    return d === 34 || d === 39 || d === 40 ? Qi(e, h, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : u(d);
  }
  function h(d) {
    return Ve(d) ? tn(e, u)(d) : u(d);
  }
  function u(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), t) : n(d);
  }
}
function Qo(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return Ki.call(r, e, a, l, "reference", "referenceMarker", "referenceString")(o);
  }
  function a(o) {
    return r.parser.defined.includes(zt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(o) : n(o);
  }
  function l(o) {
    return n(o);
  }
}
function Jo(e, t, n) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), i;
  }
  function i(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), t) : n(a);
  }
}
const es = {
  name: "labelStartImage",
  resolveAll: _r.resolveAll,
  tokenize: ts
};
function ts(e, t, n) {
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
const ns = {
  name: "labelStartLink",
  resolveAll: _r.resolveAll,
  tokenize: rs
};
function rs(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(l), e.exit("labelMarker"), e.exit("labelLink"), a;
  }
  function a(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : t(l);
  }
}
const Hn = {
  name: "lineEnding",
  tokenize: is
};
function is(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), oe(e, t, "linePrefix");
  }
}
const mn = {
  name: "thematicBreak",
  tokenize: as
};
function as(e, t, n) {
  let r = 0, i;
  return a;
  function a(h) {
    return e.enter("thematicBreak"), l(h);
  }
  function l(h) {
    return i = h, o(h);
  }
  function o(h) {
    return h === i ? (e.enter("thematicBreakSequence"), c(h)) : r >= 3 && (h === null || F(h)) ? (e.exit("thematicBreak"), t(h)) : n(h);
  }
  function c(h) {
    return h === i ? (e.consume(h), r++, c) : (e.exit("thematicBreakSequence"), re(h) ? oe(e, o, "whitespace")(h) : o(h));
  }
}
const Be = {
  continuation: {
    tokenize: cs
  },
  exit: hs,
  name: "list",
  tokenize: ss
}, ls = {
  partial: !0,
  tokenize: ps
}, os = {
  partial: !0,
  tokenize: us
};
function ss(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, l = 0;
  return o;
  function o(p) {
    const _ = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (_ === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : rr(p)) {
      if (r.containerState.type || (r.containerState.type = _, e.enter(_, {
        _container: !0
      })), _ === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(mn, n, h)(p) : h(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), c(p);
    }
    return n(p);
  }
  function c(p) {
    return rr(p) && ++l < 10 ? (e.consume(p), c) : (!r.interrupt || l < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), h(p)) : n(p);
  }
  function h(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      Tn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : u,
      e.attempt(ls, C, d)
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
function cs(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Tn, i, a);
  function i(o) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, oe(e, t, "listItemIndent", r.containerState.size + 1)(o);
  }
  function a(o) {
    return r.containerState.furtherBlankLines || !re(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(os, t, l)(o));
  }
  function l(o) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, oe(e, e.attempt(Be, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
  }
}
function us(e, t, n) {
  const r = this;
  return oe(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function hs(e) {
  e.exit(this.containerState.type);
}
function ps(e, t, n) {
  const r = this;
  return oe(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const l = r.events[r.events.length - 1];
    return !re(a) && l && l[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const Yr = {
  name: "setextUnderline",
  resolveTo: ds,
  tokenize: fs
};
function ds(e, t) {
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
function fs(e, t, n) {
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
    return h === i ? (e.consume(h), o) : (e.exit("setextHeadingLineSequence"), re(h) ? oe(e, c, "lineSuffix")(h) : c(h));
  }
  function c(h) {
    return h === null || F(h) ? (e.exit("setextHeadingLine"), t(h)) : n(h);
  }
}
const ms = {
  tokenize: gs
};
function gs(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    Tn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, oe(e, e.attempt(this.parser.constructs.flow, i, e.attempt(_o, i)), "linePrefix"))
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
const Cs = {
  resolveAll: ea()
}, ys = Ji("string"), ws = Ji("text");
function Ji(e) {
  return {
    resolveAll: ea(e === "text" ? xs : void 0),
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
function ea(e) {
  return t;
  function t(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === "data" && (a = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function xs(e, t) {
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
const _s = {
  42: Be,
  43: Be,
  45: Be,
  48: Be,
  49: Be,
  50: Be,
  51: Be,
  52: Be,
  53: Be,
  54: Be,
  55: Be,
  56: Be,
  57: Be,
  62: Zi
}, ks = {
  91: To
}, bs = {
  [-2]: Pn,
  [-1]: Pn,
  32: Pn
}, Ss = {
  35: Ro,
  42: mn,
  45: [Yr, mn],
  60: Po,
  61: Yr,
  95: mn,
  96: Gr,
  126: Gr
}, Es = {
  38: qi,
  92: Gi
}, Ts = {
  [-5]: Hn,
  [-4]: Hn,
  [-3]: Hn,
  33: es,
  38: qi,
  42: ir,
  60: [to, jo],
  91: ns,
  92: [No, Gi],
  93: _r,
  95: ir,
  96: mo
}, vs = {
  null: [ir, Cs]
}, As = {
  null: [42, 95]
}, Is = {
  null: []
}, Ns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: As,
  contentInitial: ks,
  disable: Is,
  document: _s,
  flow: Ss,
  flowInitial: bs,
  insideSpan: vs,
  string: Es,
  text: Ts
}, Symbol.toStringTag, { value: "Module" }));
function Ls(e, t, n) {
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
    enter: R,
    exit: P,
    interrupt: U(w, {
      interrupt: !0
    })
  }, h = {
    code: null,
    containerState: {},
    defineSkip: y,
    events: [],
    now: _,
    parser: e,
    previous: null,
    sliceSerialize: C,
    sliceStream: p,
    write: d
  };
  let u = t.tokenize.call(h, c);
  return t.resolveAll && a.push(t), h;
  function d(I) {
    return l = et(l, I), N(), l[l.length - 1] !== null ? [] : (V(t, 0), h.events = xr(a, h.events, h), h.events);
  }
  function C(I, M) {
    return Ms(p(I), M);
  }
  function p(I) {
    return Rs(l, I);
  }
  function _() {
    const {
      _bufferIndex: I,
      _index: M,
      line: q,
      column: ae,
      offset: G
    } = r;
    return {
      _bufferIndex: I,
      _index: M,
      line: q,
      column: ae,
      offset: G
    };
  }
  function y(I) {
    i[I.line] = I.column, D();
  }
  function N() {
    let I;
    for (; r._index < l.length; ) {
      const M = l[r._index];
      if (typeof M == "string")
        for (I = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === I && r._bufferIndex < M.length; )
          k(M.charCodeAt(r._bufferIndex));
      else
        k(M);
    }
  }
  function k(I) {
    u = u(I);
  }
  function z(I) {
    F(I) ? (r.line++, r.column = 1, r.offset += I === -3 ? 2 : 1, D()) : I !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[r._index].length && (r._bufferIndex = -1, r._index++)), h.previous = I;
  }
  function R(I, M) {
    const q = M || {};
    return q.type = I, q.start = _(), h.events.push(["enter", q, h]), o.push(q), q;
  }
  function P(I) {
    const M = o.pop();
    return M.end = _(), h.events.push(["exit", M, h]), M;
  }
  function Z(I, M) {
    V(I, M.from);
  }
  function w(I, M) {
    M.restore();
  }
  function U(I, M) {
    return q;
    function q(ae, G, xe) {
      let fe, be, We, g;
      return Array.isArray(ae) ? (
        /* c8 ignore next 1 */
        ve(ae)
      ) : "tokenize" in ae ? (
        // Looks like a construct.
        ve([
          /** @type {Construct} */
          ae
        ])
      ) : Q(ae);
      function Q(ie) {
        return Ue;
        function Ue(_e) {
          const Ye = _e !== null && ie[_e], Xe = _e !== null && ie.null, ct = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ye) ? Ye : Ye ? [Ye] : [],
            ...Array.isArray(Xe) ? Xe : Xe ? [Xe] : []
          ];
          return ve(ct)(_e);
        }
      }
      function ve(ie) {
        return fe = ie, be = 0, ie.length === 0 ? xe : f(ie[be]);
      }
      function f(ie) {
        return Ue;
        function Ue(_e) {
          return g = $(), We = ie, ie.partial || (h.currentConstruct = ie), ie.name && h.parser.constructs.disable.null.includes(ie.name) ? ee() : ie.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            M ? Object.assign(Object.create(h), M) : h,
            c,
            me,
            ee
          )(_e);
        }
      }
      function me(ie) {
        return I(We, g), G;
      }
      function ee(ie) {
        return g.restore(), ++be < fe.length ? f(fe[be]) : xe;
      }
    }
  }
  function V(I, M) {
    I.resolveAll && !a.includes(I) && a.push(I), I.resolve && st(h.events, M, h.events.length - M, I.resolve(h.events.slice(M), h)), I.resolveTo && (h.events = I.resolveTo(h.events, h));
  }
  function $() {
    const I = _(), M = h.previous, q = h.currentConstruct, ae = h.events.length, G = Array.from(o);
    return {
      from: ae,
      restore: xe
    };
    function xe() {
      r = I, h.previous = M, h.currentConstruct = q, h.events.length = ae, o = G, D();
    }
  }
  function D() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Rs(e, t) {
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
function Ms(e, t) {
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
function Os(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Fl([Ns, ...(e || {}).extensions || []])
    ),
    content: i(ql),
    defined: [],
    document: i(Xl),
    flow: i(ms),
    lazy: {},
    string: i(ys),
    text: i(ws)
  };
  return r;
  function i(a) {
    return l;
    function l(o) {
      return Ls(r, a, o);
    }
  }
}
function Ds(e) {
  for (; !Yi(e); )
    ;
  return e;
}
const Xr = /[\0\t\n\r]/g;
function Ps() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, l, o) {
    const c = [];
    let h, u, d, C, p;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(l || void 0).decode(a)), d = 0, t = "", n && (a.charCodeAt(0) === 65279 && d++, n = void 0); d < a.length; ) {
      if (Xr.lastIndex = d, h = Xr.exec(a), C = h && h.index !== void 0 ? h.index : a.length, p = a.charCodeAt(C), !h) {
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
const Hs = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Us(e) {
  return e.replace(Hs, zs);
}
function zs(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return $i(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return wr(n) || e;
}
const ta = {}.hasOwnProperty;
function Fs(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Bs(n)(Ds(Os(n).document().write(Ps()(e, t, !0))));
}
function Bs(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(Qe),
      autolinkProtocol: $,
      autolinkEmail: $,
      atxHeading: a(Re),
      blockQuote: a(Xe),
      characterEscape: $,
      characterReference: $,
      codeFenced: a(ct),
      codeFencedFenceInfo: l,
      codeFencedFenceMeta: l,
      codeIndented: a(ct, l),
      codeText: a(Lt, l),
      codeTextData: $,
      data: $,
      codeFlowValue: $,
      definition: a(Ke),
      definitionDestinationString: l,
      definitionLabelString: l,
      definitionTitleString: l,
      emphasis: a(ut),
      hardBreakEscape: a(Ae),
      hardBreakTrailing: a(Ae),
      htmlFlow: a(yt, l),
      htmlFlowData: $,
      htmlText: a(yt, l),
      htmlTextData: $,
      image: a(Ie),
      label: l,
      link: a(Qe),
      listItem: a(Rt),
      listItemValue: C,
      listOrdered: a(Ne, d),
      listUnordered: a(Ne),
      paragraph: a(Mt),
      reference: f,
      referenceString: l,
      resourceDestinationString: l,
      resourceTitleString: l,
      setextHeading: a(Re),
      strong: a(jt),
      thematicBreak: a(ht)
    },
    exit: {
      atxHeading: c(),
      atxHeadingSequence: Z,
      autolink: c(),
      autolinkEmail: Ye,
      autolinkProtocol: _e,
      blockQuote: c(),
      characterEscapeValue: D,
      characterReferenceMarkerHexadecimal: ee,
      characterReferenceMarkerNumeric: ee,
      characterReferenceValue: ie,
      characterReference: Ue,
      codeFenced: c(N),
      codeFencedFence: y,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: _,
      codeFlowValue: D,
      codeIndented: c(k),
      codeText: c(G),
      codeTextData: D,
      data: D,
      definition: c(),
      definitionDestinationString: P,
      definitionLabelString: z,
      definitionTitleString: R,
      emphasis: c(),
      hardBreakEscape: c(M),
      hardBreakTrailing: c(M),
      htmlFlow: c(q),
      htmlFlowData: D,
      htmlText: c(ae),
      htmlTextData: D,
      image: c(fe),
      label: We,
      labelText: be,
      lineEnding: I,
      link: c(xe),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: me,
      resourceDestinationString: g,
      resourceTitleString: Q,
      resource: ve,
      setextHeading: c(V),
      setextHeadingLineSequence: U,
      setextHeadingText: w,
      strong: c(),
      thematicBreak: c()
    }
  };
  na(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(x) {
    let S = {
      type: "root",
      children: []
    };
    const H = {
      stack: [S],
      tokenStack: [],
      config: t,
      enter: o,
      exit: h,
      buffer: l,
      resume: u,
      data: n
    }, j = [];
    let J = -1;
    for (; ++J < x.length; )
      if (x[J][1].type === "listOrdered" || x[J][1].type === "listUnordered")
        if (x[J][0] === "enter")
          j.push(J);
        else {
          const ke = j.pop();
          J = i(x, ke, J);
        }
    for (J = -1; ++J < x.length; ) {
      const ke = t[x[J][0]];
      ta.call(ke, x[J][1].type) && ke[x[J][1].type].call(Object.assign({
        sliceSerialize: x[J][2].sliceSerialize
      }, H), x[J][1]);
    }
    if (H.tokenStack.length > 0) {
      const ke = H.tokenStack[H.tokenStack.length - 1];
      (ke[1] || Kr).call(H, void 0, ke[0]);
    }
    for (S.position = {
      start: kt(x.length > 0 ? x[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: kt(x.length > 0 ? x[x.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, J = -1; ++J < t.transforms.length; )
      S = t.transforms[J](S) || S;
    return S;
  }
  function i(x, S, H) {
    let j = S - 1, J = -1, ke = !1, $e, Se, Ee, ge;
    for (; ++j <= H; ) {
      const he = x[j];
      switch (he[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          he[0] === "enter" ? J++ : J--, ge = void 0;
          break;
        }
        case "lineEndingBlank": {
          he[0] === "enter" && ($e && !ge && !J && !Ee && (Ee = j), ge = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          ge = void 0;
      }
      if (!J && he[0] === "enter" && he[1].type === "listItemPrefix" || J === -1 && he[0] === "exit" && (he[1].type === "listUnordered" || he[1].type === "listOrdered")) {
        if ($e) {
          let Je = j;
          for (Se = void 0; Je--; ) {
            const Me = x[Je];
            if (Me[1].type === "lineEnding" || Me[1].type === "lineEndingBlank") {
              if (Me[0] === "exit") continue;
              Se && (x[Se][1].type = "lineEndingBlank", ke = !0), Me[1].type = "lineEnding", Se = Je;
            } else if (!(Me[1].type === "linePrefix" || Me[1].type === "blockQuotePrefix" || Me[1].type === "blockQuotePrefixWhitespace" || Me[1].type === "blockQuoteMarker" || Me[1].type === "listItemIndent")) break;
          }
          Ee && (!Se || Ee < Se) && ($e._spread = !0), $e.end = Object.assign({}, Se ? x[Se][1].start : he[1].end), x.splice(Se || j, 0, ["exit", $e, he[2]]), j++, H++;
        }
        if (he[1].type === "listItemPrefix") {
          const Je = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, he[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          $e = Je, x.splice(j, 0, ["enter", Je, he[2]]), j++, H++, Ee = void 0, ge = !0;
        }
      }
    }
    return x[S][1]._spread = ke, H;
  }
  function a(x, S) {
    return H;
    function H(j) {
      o.call(this, x(j), j), S && S.call(this, j);
    }
  }
  function l() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function o(x, S, H) {
    this.stack[this.stack.length - 1].children.push(x), this.stack.push(x), this.tokenStack.push([S, H || void 0]), x.position = {
      start: kt(S.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function c(x) {
    return S;
    function S(H) {
      x && x.call(this, H), h.call(this, H);
    }
  }
  function h(x, S) {
    const H = this.stack.pop(), j = this.tokenStack.pop();
    if (j)
      j[0].type !== x.type && (S ? S.call(this, x, j[0]) : (j[1] || Kr).call(this, x, j[0]));
    else throw new Error("Cannot close `" + x.type + "` (" + en({
      start: x.start,
      end: x.end
    }) + "): it’s not open");
    H.position.end = kt(x.end);
  }
  function u() {
    return Ul(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function C(x) {
    if (this.data.expectingFirstListItemValue) {
      const S = this.stack[this.stack.length - 2];
      S.start = Number.parseInt(this.sliceSerialize(x), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const x = this.resume(), S = this.stack[this.stack.length - 1];
    S.lang = x;
  }
  function _() {
    const x = this.resume(), S = this.stack[this.stack.length - 1];
    S.meta = x;
  }
  function y() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function N() {
    const x = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = x.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function k() {
    const x = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = x.replace(/(\r?\n|\r)$/g, "");
  }
  function z(x) {
    const S = this.resume(), H = this.stack[this.stack.length - 1];
    H.label = S, H.identifier = zt(this.sliceSerialize(x)).toLowerCase();
  }
  function R() {
    const x = this.resume(), S = this.stack[this.stack.length - 1];
    S.title = x;
  }
  function P() {
    const x = this.resume(), S = this.stack[this.stack.length - 1];
    S.url = x;
  }
  function Z(x) {
    const S = this.stack[this.stack.length - 1];
    if (!S.depth) {
      const H = this.sliceSerialize(x).length;
      S.depth = H;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function U(x) {
    const S = this.stack[this.stack.length - 1];
    S.depth = this.sliceSerialize(x).codePointAt(0) === 61 ? 1 : 2;
  }
  function V() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function $(x) {
    const H = this.stack[this.stack.length - 1].children;
    let j = H[H.length - 1];
    (!j || j.type !== "text") && (j = Tt(), j.position = {
      start: kt(x.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, H.push(j)), this.stack.push(j);
  }
  function D(x) {
    const S = this.stack.pop();
    S.value += this.sliceSerialize(x), S.position.end = kt(x.end);
  }
  function I(x) {
    const S = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const H = S.children[S.children.length - 1];
      H.position.end = kt(x.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(S.type) && ($.call(this, x), D.call(this, x));
  }
  function M() {
    this.data.atHardBreak = !0;
  }
  function q() {
    const x = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = x;
  }
  function ae() {
    const x = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = x;
  }
  function G() {
    const x = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = x;
  }
  function xe() {
    const x = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const S = this.data.referenceType || "shortcut";
      x.type += "Reference", x.referenceType = S, delete x.url, delete x.title;
    } else
      delete x.identifier, delete x.label;
    this.data.referenceType = void 0;
  }
  function fe() {
    const x = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const S = this.data.referenceType || "shortcut";
      x.type += "Reference", x.referenceType = S, delete x.url, delete x.title;
    } else
      delete x.identifier, delete x.label;
    this.data.referenceType = void 0;
  }
  function be(x) {
    const S = this.sliceSerialize(x), H = this.stack[this.stack.length - 2];
    H.label = Us(S), H.identifier = zt(S).toLowerCase();
  }
  function We() {
    const x = this.stack[this.stack.length - 1], S = this.resume(), H = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, H.type === "link") {
      const j = x.children;
      H.children = j;
    } else
      H.alt = S;
  }
  function g() {
    const x = this.resume(), S = this.stack[this.stack.length - 1];
    S.url = x;
  }
  function Q() {
    const x = this.resume(), S = this.stack[this.stack.length - 1];
    S.title = x;
  }
  function ve() {
    this.data.inReference = void 0;
  }
  function f() {
    this.data.referenceType = "collapsed";
  }
  function me(x) {
    const S = this.resume(), H = this.stack[this.stack.length - 1];
    H.label = S, H.identifier = zt(this.sliceSerialize(x)).toLowerCase(), this.data.referenceType = "full";
  }
  function ee(x) {
    this.data.characterReferenceType = x.type;
  }
  function ie(x) {
    const S = this.sliceSerialize(x), H = this.data.characterReferenceType;
    let j;
    H ? (j = $i(S, H === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : j = wr(S);
    const J = this.stack[this.stack.length - 1];
    J.value += j;
  }
  function Ue(x) {
    const S = this.stack.pop();
    S.position.end = kt(x.end);
  }
  function _e(x) {
    D.call(this, x);
    const S = this.stack[this.stack.length - 1];
    S.url = this.sliceSerialize(x);
  }
  function Ye(x) {
    D.call(this, x);
    const S = this.stack[this.stack.length - 1];
    S.url = "mailto:" + this.sliceSerialize(x);
  }
  function Xe() {
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
  function Lt() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Ke() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function ut() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Re() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Ae() {
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
  function Ie() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Qe() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Ne(x) {
    return {
      type: "list",
      ordered: x.type === "listOrdered",
      start: null,
      spread: x._spread,
      children: []
    };
  }
  function Rt(x) {
    return {
      type: "listItem",
      spread: x._spread,
      checked: null,
      children: []
    };
  }
  function Mt() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function jt() {
    return {
      type: "strong",
      children: []
    };
  }
  function Tt() {
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
function kt(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function na(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? na(e, r) : Vs(e, r);
  }
}
function Vs(e, t) {
  let n;
  for (n in t)
    if (ta.call(t, n))
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
function Kr(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + en({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + en({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + en({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function js(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return Fs(r, {
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
function Ws(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function $s(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function Zs(e, t) {
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
function Gs(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function qs(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Ys(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Vt(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
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
function Xs(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Ks(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function ra(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const l = i[i.length - 1];
  return l && l.type === "text" ? l.value += r : i.push({ type: "text", value: r }), i;
}
function Qs(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return ra(e, t);
  const i = { src: Vt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function Js(e, t) {
  const n = { src: Vt(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function e1(e, t) {
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
function t1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return ra(e, t);
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
function n1(e, t) {
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
function r1(e, t, n) {
  const r = e.all(t), i = n ? i1(n) : ia(t), a = {}, l = [];
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
function i1(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = ia(n[r]);
  }
  return t;
}
function ia(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function a1(e, t) {
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
function l1(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function o1(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function s1(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function c1(e, t) {
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
    }, o = mr(t.children[1]), c = Ui(t.children[t.children.length - 1]);
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
function u1(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", l = n && n.type === "table" ? n.align : void 0, o = l ? l.length : t.children.length;
  let c = -1;
  const h = [];
  for (; ++c < o; ) {
    const d = t.children[c], C = {}, p = l ? l[c] : void 0;
    p && (C.align = p);
    let _ = { type: "element", tagName: a, properties: C, children: [] };
    d && (_.children = e.all(d), e.patch(d, _), _ = e.applyData(d, _)), h.push(_);
  }
  const u = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(h, !0)
  };
  return e.patch(t, u), e.applyData(t, u);
}
function h1(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Qr = 9, Jr = 32;
function p1(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const a = [];
  for (; r; )
    a.push(
      ei(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return a.push(ei(t.slice(i), i > 0, !1)), a.join("");
}
function ei(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let a = e.codePointAt(r);
    for (; a === Qr || a === Jr; )
      r++, a = e.codePointAt(r);
  }
  if (n) {
    let a = e.codePointAt(i - 1);
    for (; a === Qr || a === Jr; )
      i--, a = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function d1(e, t) {
  const n = { type: "text", value: p1(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function f1(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const m1 = {
  blockquote: Ws,
  break: $s,
  code: Zs,
  delete: Gs,
  emphasis: qs,
  footnoteReference: Ys,
  heading: Xs,
  html: Ks,
  imageReference: Qs,
  image: Js,
  inlineCode: e1,
  linkReference: t1,
  link: n1,
  listItem: r1,
  list: a1,
  paragraph: l1,
  // @ts-expect-error: root is different, but hard to type.
  root: o1,
  strong: s1,
  table: c1,
  tableCell: h1,
  tableRow: u1,
  text: d1,
  thematicBreak: f1,
  toml: un,
  yaml: un,
  definition: un,
  footnoteDefinition: un
};
function un() {
}
const aa = -1, vn = 0, nn = 1, kn = 2, kr = 3, br = 4, Sr = 5, Er = 6, la = 7, oa = 8, ti = typeof self == "object" ? self : globalThis, g1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, l] = t[i];
    switch (a) {
      case vn:
      case aa:
        return n(l, i);
      case nn: {
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
      case kr:
        return n(new Date(l), i);
      case br: {
        const { source: o, flags: c } = l;
        return n(new RegExp(o, c), i);
      }
      case Sr: {
        const o = n(/* @__PURE__ */ new Map(), i);
        for (const [c, h] of l)
          o.set(r(c), r(h));
        return o;
      }
      case Er: {
        const o = n(/* @__PURE__ */ new Set(), i);
        for (const c of l)
          o.add(r(c));
        return o;
      }
      case la: {
        const { name: o, message: c } = l;
        return n(new ti[o](c), i);
      }
      case oa:
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
    return n(new ti[a](l), i);
  };
  return r;
}, ni = (e) => g1(/* @__PURE__ */ new Map(), e)(0), Pt = "", { toString: C1 } = {}, { keys: y1 } = Object, qt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [vn, t];
  const n = C1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [nn, Pt];
    case "Object":
      return [kn, Pt];
    case "Date":
      return [kr, Pt];
    case "RegExp":
      return [br, Pt];
    case "Map":
      return [Sr, Pt];
    case "Set":
      return [Er, Pt];
    case "DataView":
      return [nn, n];
  }
  return n.includes("Array") ? [nn, n] : n.includes("Error") ? [la, n] : [kn, n];
}, hn = ([e, t]) => e === vn && (t === "function" || t === "symbol"), w1 = (e, t, n, r) => {
  const i = (l, o) => {
    const c = r.push(l) - 1;
    return n.set(o, c), c;
  }, a = (l) => {
    if (n.has(l))
      return n.get(l);
    let [o, c] = qt(l);
    switch (o) {
      case vn: {
        let u = l;
        switch (c) {
          case "bigint":
            o = oa, u = l.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + c);
            u = null;
            break;
          case "undefined":
            return i([aa], l);
        }
        return i([o, u], l);
      }
      case nn: {
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
        for (const C of y1(l))
          (e || !hn(qt(l[C]))) && u.push([a(C), a(l[C])]);
        return d;
      }
      case kr:
        return i([o, l.toISOString()], l);
      case br: {
        const { source: u, flags: d } = l;
        return i([o, { source: u, flags: d }], l);
      }
      case Sr: {
        const u = [], d = i([o, u], l);
        for (const [C, p] of l)
          (e || !(hn(qt(C)) || hn(qt(p)))) && u.push([a(C), a(p)]);
        return d;
      }
      case Er: {
        const u = [], d = i([o, u], l);
        for (const C of l)
          (e || !hn(qt(C))) && u.push(a(C));
        return d;
      }
    }
    const { message: h } = l;
    return i([o, { name: c, message: h }], l);
  };
  return a;
}, ri = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return w1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, bn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? ni(ri(e, t)) : structuredClone(e)
) : (e, t) => ni(ri(e, t));
function x1(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function _1(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function k1(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || x1, r = e.options.footnoteBackLabel || _1, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", l = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let c = -1;
  for (; ++c < e.footnoteOrder.length; ) {
    const h = e.footnoteById.get(
      e.footnoteOrder[c]
    );
    if (!h)
      continue;
    const u = e.all(h), d = String(h.identifier).toUpperCase(), C = Vt(d.toLowerCase());
    let p = 0;
    const _ = [], y = e.footnoteCounts.get(d);
    for (; y !== void 0 && ++p <= y; ) {
      _.length > 0 && _.push({ type: "text", value: " " });
      let z = typeof n == "string" ? n : n(c, p);
      typeof z == "string" && (z = { type: "text", value: z }), _.push({
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
    const N = u[u.length - 1];
    if (N && N.type === "element" && N.tagName === "p") {
      const z = N.children[N.children.length - 1];
      z && z.type === "text" ? z.value += " " : N.children.push({ type: "text", value: " " }), N.children.push(..._);
    } else
      u.push(..._);
    const k = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + C },
      children: e.wrap(u, !0)
    };
    e.patch(h, k), o.push(k);
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
            ...bn(l),
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
const sa = (
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
      return T1;
    if (typeof e == "function")
      return An(e);
    if (typeof e == "object")
      return Array.isArray(e) ? b1(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        S1(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return E1(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function b1(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = sa(e[n]);
  return An(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function S1(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return An(n);
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
function E1(e) {
  return An(t);
  function t(n) {
    return n && n.type === e;
  }
}
function An(e) {
  return t;
  function t(n, r, i) {
    return !!(v1(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function T1() {
  return !0;
}
function v1(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const ca = [], A1 = !0, ii = !1, I1 = "skip";
function N1(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = sa(i), l = r ? -1 : 1;
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
      let p = ca, _, y, N;
      if ((!t || a(c, h, u[u.length - 1] || void 0)) && (p = L1(n(c, u)), p[0] === ii))
        return p;
      if ("children" in c && c.children) {
        const k = (
          /** @type {UnistParent} */
          c
        );
        if (k.children && p[0] !== I1)
          for (y = (r ? k.children.length : -1) + l, N = u.concat(k); y > -1 && y < k.children.length; ) {
            const z = k.children[y];
            if (_ = o(z, y, N)(), _[0] === ii)
              return _;
            y = typeof _[1] == "number" ? _[1] : y + l;
          }
      }
      return p;
    }
  }
}
function L1(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [A1, e] : e == null ? ca : [e];
}
function ua(e, t, n, r) {
  let i, a, l;
  typeof t == "function" && typeof n != "function" ? (a = void 0, l = t, i = n) : (a = t, l = n, i = r), N1(e, a, o, i);
  function o(c, h) {
    const u = h[h.length - 1], d = u ? u.children.indexOf(c) : void 0;
    return l(c, d, u);
  }
}
const ar = {}.hasOwnProperty, R1 = {};
function M1(e, t) {
  const n = t || R1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = { ...m1, ...n.handlers }, o = {
    all: h,
    applyData: D1,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: l,
    one: c,
    options: n,
    patch: O1,
    wrap: H1
  };
  return ua(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const d = u.type === "definition" ? r : i, C = String(u.identifier).toUpperCase();
      d.has(C) || d.set(C, u);
    }
  }), o;
  function c(u, d) {
    const C = u.type, p = o.handlers[C];
    if (ar.call(o.handlers, C) && p)
      return p(o, u, d);
    if (o.options.passThrough && o.options.passThrough.includes(C)) {
      if ("children" in u) {
        const { children: y, ...N } = u, k = bn(N);
        return k.children = o.all(u), k;
      }
      return bn(u);
    }
    return (o.options.unknownHandler || P1)(o, u, d);
  }
  function h(u) {
    const d = [];
    if ("children" in u) {
      const C = u.children;
      let p = -1;
      for (; ++p < C.length; ) {
        const _ = o.one(C[p], u);
        if (_) {
          if (p && C[p - 1].type === "break" && (!Array.isArray(_) && _.type === "text" && (_.value = ai(_.value)), !Array.isArray(_) && _.type === "element")) {
            const y = _.children[0];
            y && y.type === "text" && (y.value = ai(y.value));
          }
          Array.isArray(_) ? d.push(..._) : d.push(_);
        }
      }
    }
    return d;
  }
}
function O1(e, t) {
  e.position && (t.position = gl(e));
}
function D1(e, t) {
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
    n.type === "element" && a && Object.assign(n.properties, bn(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function P1(e, t) {
  const n = t.data || {}, r = "value" in t && !(ar.call(n, "hProperties") || ar.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function H1(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function ai(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function li(e, t) {
  const n = M1(e, t), r = n.one(e, void 0), i = k1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function U1(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      li(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      li(n, { file: r, ...e || t })
    );
  };
}
function oi(e) {
  if (e)
    throw e;
}
var gn = Object.prototype.hasOwnProperty, ha = Object.prototype.toString, si = Object.defineProperty, ci = Object.getOwnPropertyDescriptor, ui = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : ha.call(t) === "[object Array]";
}, hi = function(t) {
  if (!t || ha.call(t) !== "[object Object]")
    return !1;
  var n = gn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && gn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || gn.call(t, i);
}, pi = function(t, n) {
  si && n.name === "__proto__" ? si(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, di = function(t, n) {
  if (n === "__proto__")
    if (gn.call(t, n)) {
      if (ci)
        return ci(t, n).value;
    } else return;
  return t[n];
}, z1 = function e() {
  var t, n, r, i, a, l, o = arguments[0], c = 1, h = arguments.length, u = !1;
  for (typeof o == "boolean" && (u = o, o = arguments[1] || {}, c = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); c < h; ++c)
    if (t = arguments[c], t != null)
      for (n in t)
        r = di(o, n), i = di(t, n), o !== i && (u && i && (hi(i) || (a = ui(i))) ? (a ? (a = !1, l = r && ui(r) ? r : []) : l = r && hi(r) ? r : {}, pi(o, { name: n, newValue: e(u, l, i) })) : typeof i < "u" && pi(o, { name: n, newValue: i }));
  return o;
};
const Un = /* @__PURE__ */ Hi(z1);
function lr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function F1() {
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
      i = h, u ? B1(u, o)(...h) : l(null, ...h);
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
function B1(e, t) {
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
const at = { basename: V1, dirname: j1, extname: W1, join: $1, sep: "/" };
function V1(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  ln(e);
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
function j1(e) {
  if (ln(e), e.length === 0)
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
function W1(e) {
  ln(e);
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
function $1(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    ln(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : Z1(n);
}
function Z1(e) {
  ln(e);
  const t = e.codePointAt(0) === 47;
  let n = G1(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function G1(e, t) {
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
function ln(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const q1 = { cwd: Y1 };
function Y1() {
  return "/";
}
function or(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function X1(e) {
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
  return K1(e);
}
function K1(e) {
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
class pa {
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
    t ? or(t) ? n = { path: t } : typeof t == "string" || Q1(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : q1.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
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
    return typeof this.path == "string" ? at.basename(this.path) : void 0;
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
    Bn(t, "basename"), Fn(t, "basename"), this.path = at.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? at.dirname(this.path) : void 0;
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
    fi(this.basename, "dirname"), this.path = at.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? at.extname(this.path) : void 0;
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
    if (Fn(t, "extname"), fi(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = at.join(this.dirname, this.stem + (t || ""));
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
    or(t) && (t = X1(t)), Bn(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? at.basename(this.path, this.extname) : void 0;
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
    Bn(t, "stem"), Fn(t, "stem"), this.path = at.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new Le(
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
function Fn(e, t) {
  if (e && e.includes(at.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + at.sep + "`"
    );
}
function Bn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function fi(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function Q1(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const J1 = (
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
), ec = {}.hasOwnProperty;
class Tr extends J1 {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = F1();
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
      new Tr()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Un(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (Wn("data", this.frozen), this.namespace[t] = n, this) : ec.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Wn("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = pn(t), r = this.parser || this.Parser;
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
    function i(a, l) {
      const o = pn(t), c = (
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
        ), _ = r.stringify(p, C);
        rc(_) ? C.value = _ : C.result = _, h(
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
    return this.freeze(), Vn("processSync", this.parser || this.Parser), jn("processSync", this.compiler || this.Compiler), this.process(t, i), gi("processSync", "process", n), r;
    function i(a, l) {
      n = !0, oi(a), r = l;
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
    mi(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(l, o) {
      const c = pn(n);
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
    return this.run(t, n, a), gi("runSync", "run", r), i;
    function a(l, o) {
      oi(l), i = o, r = !0;
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
    const r = pn(n), i = this.compiler || this.Compiler;
    return jn("stringify", i), mi(t), i(t, r);
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
    if (Wn("use", this.frozen), t != null) if (typeof t == "function")
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
      o(h.plugins), h.settings && (i.settings = Un(!0, i.settings, h.settings));
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
        let [p, ..._] = u;
        const y = r[C][1];
        lr(y) && lr(p) && (p = Un(!0, y, p)), r[C] = [h, p, ..._];
      }
    }
  }
}
const tc = new Tr().freeze();
function Vn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function jn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Wn(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function mi(e) {
  if (!lr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function gi(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function pn(e) {
  return nc(e) ? e : new pa(e);
}
function nc(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function rc(e) {
  return typeof e == "string" || ic(e);
}
function ic(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const ac = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Ci = [], yi = { allowDangerousHtml: !0 }, lc = /^(https?|ircs?|mailto|xmpp)$/i, oc = [
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
  const t = sc(e), n = cc(e);
  return uc(t.runSync(t.parse(n), n), e);
}
function sc(e) {
  const t = e.rehypePlugins || Ci, n = e.remarkPlugins || Ci, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...yi } : yi;
  return tc().use(js).use(n).use(U1, r).use(t);
}
function cc(e) {
  const t = e.children || "", n = new pa();
  return typeof t == "string" && (n.value = t), n;
}
function uc(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, l = t.skipHtml, o = t.unwrapDisallowed, c = t.urlTransform || hc;
  for (const u of oc)
    Object.hasOwn(t, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + ac + u.id, void 0);
  return ua(e, h), _l(e, {
    Fragment: xn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: s,
    jsxs: v,
    passKeys: !0,
    passNode: !0
  });
  function h(u, d, C) {
    if (u.type === "raw" && C && typeof d == "number")
      return l ? C.children.splice(d, 1) : C.children[d] = { type: "text", value: u.value }, d;
    if (u.type === "element") {
      let p;
      for (p in Dn)
        if (Object.hasOwn(Dn, p) && Object.hasOwn(u.properties, p)) {
          const _ = u.properties[p], y = Dn[p];
          (y === null || y.includes(u.tagName)) && (u.properties[p] = c(String(_ || ""), p, u));
        }
    }
    if (u.type === "element") {
      let p = n ? !n.includes(u.tagName) : a ? a.includes(u.tagName) : !1;
      if (!p && r && typeof d == "number" && (p = !r(u, d, C)), p && C && typeof d == "number")
        return o && u.children ? C.children.splice(d, 1, ...u.children) : C.children.splice(d, 1), d;
    }
  }
}
function hc(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    lc.test(e.slice(0, t)) ? e : ""
  );
}
const it = (...e) => e.filter(Boolean).join(" "), pc = () => /* @__PURE__ */ v(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ v("g", { filter: "url(#filter0_dd_121_23927)", children: [
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
), dc = ({ className: e, ...t }) => /* @__PURE__ */ s("form", { className: it("chat-wrapper__prompt-input", e), ...t }), da = Ii(
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
        className: it("chat-wrapper__prompt-textarea", t),
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
da.displayName = "PromptInputTextarea";
const fc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ s("div", { className: it("chat-wrapper__prompt-toolbar", e), ...t }), mc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ s("div", { className: it("chat-wrapper__prompt-tools", e), ...t }), gc = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || Ht.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ s(
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
}, Cc = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = "idle",
  children: i,
  disabled: a,
  ...l
}) => {
  let o = /* @__PURE__ */ s(pc, {});
  const c = a || r === "submitted" || r === "streaming";
  return /* @__PURE__ */ s(
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
      disabled: c,
      ...l,
      children: i ?? o
    }
  );
}, du = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ s("select", { className: it("chat-wrapper__prompt-select", e), ...n, children: t }), fu = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ s(
  "button",
  {
    className: it("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), mu = ({
  className: e,
  ...t
}) => /* @__PURE__ */ s(
  "div",
  {
    className: it("chat-wrapper__prompt-select-content", e),
    ...t
  }
), gu = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ s(
  "div",
  {
    className: it("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), Cu = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ s(
  "span",
  {
    className: it("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), yc = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = X(0), [a, l] = X(!1), [o, c] = X(0);
  return lt(() => {
    if (!t || e.length <= 1) return;
    const h = setInterval(() => {
      l(!0), setTimeout(() => {
        i((u) => (u + 1) % e.length), c((u) => u + 1), l(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(h);
  }, [t, e.length]), lt(() => {
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
  entries: fa,
  setPrototypeOf: wi,
  isFrozen: wc,
  getPrototypeOf: xc,
  getOwnPropertyDescriptor: _c
} = Object;
let {
  freeze: Pe,
  seal: tt,
  create: sr
} = Object, {
  apply: cr,
  construct: ur
} = typeof Reflect < "u" && Reflect;
Pe || (Pe = function(t) {
  return t;
});
tt || (tt = function(t) {
  return t;
});
cr || (cr = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
ur || (ur = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const dn = He(Array.prototype.forEach), kc = He(Array.prototype.lastIndexOf), xi = He(Array.prototype.pop), Yt = He(Array.prototype.push), bc = He(Array.prototype.splice), Cn = He(String.prototype.toLowerCase), $n = He(String.prototype.toString), Zn = He(String.prototype.match), Xt = He(String.prototype.replace), Sc = He(String.prototype.indexOf), Ec = He(String.prototype.trim), nt = He(Object.prototype.hasOwnProperty), Oe = He(RegExp.prototype.test), Kt = Tc(TypeError);
function He(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return cr(e, t, r);
  };
}
function Tc(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return ur(e, n);
  };
}
function Y(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Cn;
  wi && wi(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (wc(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function vc(e) {
  for (let t = 0; t < e.length; t++)
    nt(e, t) || (e[t] = null);
  return e;
}
function gt(e) {
  const t = sr(null);
  for (const [n, r] of fa(e))
    nt(e, n) && (Array.isArray(r) ? t[n] = vc(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = gt(r) : t[n] = r);
  return t;
}
function Qt(e, t) {
  for (; e !== null; ) {
    const r = _c(e, t);
    if (r) {
      if (r.get)
        return He(r.get);
      if (typeof r.value == "function")
        return He(r.value);
    }
    e = xc(e);
  }
  function n() {
    return null;
  }
  return n;
}
const _i = Pe(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Gn = Pe(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), qn = Pe(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Ac = Pe(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Yn = Pe(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Ic = Pe(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), ki = Pe(["#text"]), bi = Pe(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Xn = Pe(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Si = Pe(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), fn = Pe(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Nc = tt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Lc = tt(/<%[\w\W]*|[\w\W]*%>/gm), Rc = tt(/\$\{[\w\W]*/gm), Mc = tt(/^data-[\-\w.\u00B7-\uFFFF]+$/), Oc = tt(/^aria-[\-\w]+$/), ma = tt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Dc = tt(/^(?:\w+script|data):/i), Pc = tt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), ga = tt(/^html$/i), Hc = tt(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Ei = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Oc,
  ATTR_WHITESPACE: Pc,
  CUSTOM_ELEMENT: Hc,
  DATA_ATTR: Mc,
  DOCTYPE_NAME: ga,
  ERB_EXPR: Lc,
  IS_ALLOWED_URI: ma,
  IS_SCRIPT_OR_DATA: Dc,
  MUSTACHE_EXPR: Nc,
  TMPLIT_EXPR: Rc
});
const Jt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Uc = function() {
  return typeof window > "u" ? null : window;
}, zc = function(t, n) {
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
}, Ti = function() {
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
function Ca() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Uc();
  const t = (O) => Ca(O);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== Jt.document || !e.Element)
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
  } = e, _ = c.prototype, y = Qt(_, "cloneNode"), N = Qt(_, "remove"), k = Qt(_, "nextSibling"), z = Qt(_, "childNodes"), R = Qt(_, "parentNode");
  if (typeof l == "function") {
    const O = n.createElement("template");
    O.content && O.content.ownerDocument && (n = O.content.ownerDocument);
  }
  let P, Z = "";
  const {
    implementation: w,
    createNodeIterator: U,
    createDocumentFragment: V,
    getElementsByTagName: $
  } = n, {
    importNode: D
  } = r;
  let I = Ti();
  t.isSupported = typeof fa == "function" && typeof R == "function" && w && w.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: M,
    ERB_EXPR: q,
    TMPLIT_EXPR: ae,
    DATA_ATTR: G,
    ARIA_ATTR: xe,
    IS_SCRIPT_OR_DATA: fe,
    ATTR_WHITESPACE: be,
    CUSTOM_ELEMENT: We
  } = Ei;
  let {
    IS_ALLOWED_URI: g
  } = Ei, Q = null;
  const ve = Y({}, [..._i, ...Gn, ...qn, ...Yn, ...ki]);
  let f = null;
  const me = Y({}, [...bi, ...Xn, ...Si, ...fn]);
  let ee = Object.seal(sr(null, {
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
  })), ie = null, Ue = null;
  const _e = Object.seal(sr(null, {
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
  let Ye = !0, Xe = !0, ct = !1, Lt = !0, Ke = !1, ut = !0, Re = !1, Ae = !1, yt = !1, Ie = !1, Qe = !1, Ne = !1, Rt = !0, Mt = !1;
  const jt = "user-content-";
  let Tt = !0, ht = !1, x = {}, S = null;
  const H = Y({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let j = null;
  const J = Y({}, ["audio", "video", "img", "source", "image", "track"]);
  let ke = null;
  const $e = Y({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Se = "http://www.w3.org/1998/Math/MathML", Ee = "http://www.w3.org/2000/svg", ge = "http://www.w3.org/1999/xhtml";
  let he = ge, Je = !1, Me = null;
  const In = Y({}, [Se, Ee, ge], $n);
  let wt = Y({}, ["mi", "mo", "mn", "ms", "mtext"]), vt = Y({}, ["annotation-xml"]);
  const Nn = Y({}, ["title", "style", "font", "a", "script"]);
  let Ot = null;
  const Ln = ["application/xhtml+xml", "text/html"], on = "text/html";
  let Ce = null, xt = null;
  const Rn = n.createElement("form"), sn = function(m) {
    return m instanceof RegExp || m instanceof Function;
  }, Wt = function() {
    let m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(xt && xt === m)) {
      if ((!m || typeof m != "object") && (m = {}), m = gt(m), Ot = // eslint-disable-next-line unicorn/prefer-includes
      Ln.indexOf(m.PARSER_MEDIA_TYPE) === -1 ? on : m.PARSER_MEDIA_TYPE, Ce = Ot === "application/xhtml+xml" ? $n : Cn, Q = nt(m, "ALLOWED_TAGS") ? Y({}, m.ALLOWED_TAGS, Ce) : ve, f = nt(m, "ALLOWED_ATTR") ? Y({}, m.ALLOWED_ATTR, Ce) : me, Me = nt(m, "ALLOWED_NAMESPACES") ? Y({}, m.ALLOWED_NAMESPACES, $n) : In, ke = nt(m, "ADD_URI_SAFE_ATTR") ? Y(gt($e), m.ADD_URI_SAFE_ATTR, Ce) : $e, j = nt(m, "ADD_DATA_URI_TAGS") ? Y(gt(J), m.ADD_DATA_URI_TAGS, Ce) : J, S = nt(m, "FORBID_CONTENTS") ? Y({}, m.FORBID_CONTENTS, Ce) : H, ie = nt(m, "FORBID_TAGS") ? Y({}, m.FORBID_TAGS, Ce) : gt({}), Ue = nt(m, "FORBID_ATTR") ? Y({}, m.FORBID_ATTR, Ce) : gt({}), x = nt(m, "USE_PROFILES") ? m.USE_PROFILES : !1, Ye = m.ALLOW_ARIA_ATTR !== !1, Xe = m.ALLOW_DATA_ATTR !== !1, ct = m.ALLOW_UNKNOWN_PROTOCOLS || !1, Lt = m.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ke = m.SAFE_FOR_TEMPLATES || !1, ut = m.SAFE_FOR_XML !== !1, Re = m.WHOLE_DOCUMENT || !1, Ie = m.RETURN_DOM || !1, Qe = m.RETURN_DOM_FRAGMENT || !1, Ne = m.RETURN_TRUSTED_TYPE || !1, yt = m.FORCE_BODY || !1, Rt = m.SANITIZE_DOM !== !1, Mt = m.SANITIZE_NAMED_PROPS || !1, Tt = m.KEEP_CONTENT !== !1, ht = m.IN_PLACE || !1, g = m.ALLOWED_URI_REGEXP || ma, he = m.NAMESPACE || ge, wt = m.MATHML_TEXT_INTEGRATION_POINTS || wt, vt = m.HTML_INTEGRATION_POINTS || vt, ee = m.CUSTOM_ELEMENT_HANDLING || {}, m.CUSTOM_ELEMENT_HANDLING && sn(m.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (ee.tagNameCheck = m.CUSTOM_ELEMENT_HANDLING.tagNameCheck), m.CUSTOM_ELEMENT_HANDLING && sn(m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (ee.attributeNameCheck = m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), m.CUSTOM_ELEMENT_HANDLING && typeof m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (ee.allowCustomizedBuiltInElements = m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Ke && (Xe = !1), Qe && (Ie = !0), x && (Q = Y({}, ki), f = [], x.html === !0 && (Y(Q, _i), Y(f, bi)), x.svg === !0 && (Y(Q, Gn), Y(f, Xn), Y(f, fn)), x.svgFilters === !0 && (Y(Q, qn), Y(f, Xn), Y(f, fn)), x.mathMl === !0 && (Y(Q, Yn), Y(f, Si), Y(f, fn))), m.ADD_TAGS && (typeof m.ADD_TAGS == "function" ? _e.tagCheck = m.ADD_TAGS : (Q === ve && (Q = gt(Q)), Y(Q, m.ADD_TAGS, Ce))), m.ADD_ATTR && (typeof m.ADD_ATTR == "function" ? _e.attributeCheck = m.ADD_ATTR : (f === me && (f = gt(f)), Y(f, m.ADD_ATTR, Ce))), m.ADD_URI_SAFE_ATTR && Y(ke, m.ADD_URI_SAFE_ATTR, Ce), m.FORBID_CONTENTS && (S === H && (S = gt(S)), Y(S, m.FORBID_CONTENTS, Ce)), Tt && (Q["#text"] = !0), Re && Y(Q, ["html", "head", "body"]), Q.table && (Y(Q, ["tbody"]), delete ie.tbody), m.TRUSTED_TYPES_POLICY) {
        if (typeof m.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Kt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof m.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Kt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        P = m.TRUSTED_TYPES_POLICY, Z = P.createHTML("");
      } else
        P === void 0 && (P = zc(p, i)), P !== null && typeof Z == "string" && (Z = P.createHTML(""));
      Pe && Pe(m), xt = m;
    }
  }, cn = Y({}, [...Gn, ...qn, ...Ac]), $t = Y({}, [...Yn, ...Ic]), T = function(m) {
    let b = R(m);
    (!b || !b.tagName) && (b = {
      namespaceURI: he,
      tagName: "template"
    });
    const A = Cn(m.tagName), te = Cn(b.tagName);
    return Me[m.namespaceURI] ? m.namespaceURI === Ee ? b.namespaceURI === ge ? A === "svg" : b.namespaceURI === Se ? A === "svg" && (te === "annotation-xml" || wt[te]) : !!cn[A] : m.namespaceURI === Se ? b.namespaceURI === ge ? A === "math" : b.namespaceURI === Ee ? A === "math" && vt[te] : !!$t[A] : m.namespaceURI === ge ? b.namespaceURI === Ee && !vt[te] || b.namespaceURI === Se && !wt[te] ? !1 : !$t[A] && (Nn[A] || !cn[A]) : !!(Ot === "application/xhtml+xml" && Me[m.namespaceURI]) : !1;
  }, L = function(m) {
    Yt(t.removed, {
      element: m
    });
    try {
      R(m).removeChild(m);
    } catch {
      N(m);
    }
  }, K = function(m, b) {
    try {
      Yt(t.removed, {
        attribute: b.getAttributeNode(m),
        from: b
      });
    } catch {
      Yt(t.removed, {
        attribute: null,
        from: b
      });
    }
    if (b.removeAttribute(m), m === "is")
      if (Ie || Qe)
        try {
          L(b);
        } catch {
        }
      else
        try {
          b.setAttribute(m, "");
        } catch {
        }
  }, B = function(m) {
    let b = null, A = null;
    if (yt)
      m = "<remove></remove>" + m;
    else {
      const de = Zn(m, /^[\r\n\t ]+/);
      A = de && de[0];
    }
    Ot === "application/xhtml+xml" && he === ge && (m = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + m + "</body></html>");
    const te = P ? P.createHTML(m) : m;
    if (he === ge)
      try {
        b = new C().parseFromString(te, Ot);
      } catch {
      }
    if (!b || !b.documentElement) {
      b = w.createDocument(he, "template", null);
      try {
        b.documentElement.innerHTML = Je ? Z : te;
      } catch {
      }
    }
    const ue = b.body || b.documentElement;
    return m && A && ue.insertBefore(n.createTextNode(A), ue.childNodes[0] || null), he === ge ? $.call(b, Re ? "html" : "body")[0] : Re ? b.documentElement : ue;
  }, se = function(m) {
    return U.call(
      m.ownerDocument || m,
      m,
      // eslint-disable-next-line no-bitwise
      h.SHOW_ELEMENT | h.SHOW_COMMENT | h.SHOW_TEXT | h.SHOW_PROCESSING_INSTRUCTION | h.SHOW_CDATA_SECTION,
      null
    );
  }, ye = function(m) {
    return m instanceof d && (typeof m.nodeName != "string" || typeof m.textContent != "string" || typeof m.removeChild != "function" || !(m.attributes instanceof u) || typeof m.removeAttribute != "function" || typeof m.setAttribute != "function" || typeof m.namespaceURI != "string" || typeof m.insertBefore != "function" || typeof m.hasChildNodes != "function");
  }, ze = function(m) {
    return typeof o == "function" && m instanceof o;
  };
  function pe(O, m, b) {
    dn(O, (A) => {
      A.call(t, m, b, xt);
    });
  }
  const Ze = function(m) {
    let b = null;
    if (pe(I.beforeSanitizeElements, m, null), ye(m))
      return L(m), !0;
    const A = Ce(m.nodeName);
    if (pe(I.uponSanitizeElement, m, {
      tagName: A,
      allowedTags: Q
    }), ut && m.hasChildNodes() && !ze(m.firstElementChild) && Oe(/<[/\w!]/g, m.innerHTML) && Oe(/<[/\w!]/g, m.textContent) || m.nodeType === Jt.progressingInstruction || ut && m.nodeType === Jt.comment && Oe(/<[/\w]/g, m.data))
      return L(m), !0;
    if (!(_e.tagCheck instanceof Function && _e.tagCheck(A)) && (!Q[A] || ie[A])) {
      if (!ie[A] && _t(A) && (ee.tagNameCheck instanceof RegExp && Oe(ee.tagNameCheck, A) || ee.tagNameCheck instanceof Function && ee.tagNameCheck(A)))
        return !1;
      if (Tt && !S[A]) {
        const te = R(m) || m.parentNode, ue = z(m) || m.childNodes;
        if (ue && te) {
          const de = ue.length;
          for (let Fe = de - 1; Fe >= 0; --Fe) {
            const ft = y(ue[Fe], !0);
            ft.__removalCount = (m.__removalCount || 0) + 1, te.insertBefore(ft, k(m));
          }
        }
      }
      return L(m), !0;
    }
    return m instanceof c && !T(m) || (A === "noscript" || A === "noembed" || A === "noframes") && Oe(/<\/no(script|embed|frames)/i, m.innerHTML) ? (L(m), !0) : (Ke && m.nodeType === Jt.text && (b = m.textContent, dn([M, q, ae], (te) => {
      b = Xt(b, te, " ");
    }), m.textContent !== b && (Yt(t.removed, {
      element: m.cloneNode()
    }), m.textContent = b)), pe(I.afterSanitizeElements, m, null), !1);
  }, pt = function(m, b, A) {
    if (Rt && (b === "id" || b === "name") && (A in n || A in Rn))
      return !1;
    if (!(Xe && !Ue[b] && Oe(G, b))) {
      if (!(Ye && Oe(xe, b))) {
        if (!(_e.attributeCheck instanceof Function && _e.attributeCheck(b, m))) {
          if (!f[b] || Ue[b]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(_t(m) && (ee.tagNameCheck instanceof RegExp && Oe(ee.tagNameCheck, m) || ee.tagNameCheck instanceof Function && ee.tagNameCheck(m)) && (ee.attributeNameCheck instanceof RegExp && Oe(ee.attributeNameCheck, b) || ee.attributeNameCheck instanceof Function && ee.attributeNameCheck(b, m)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              b === "is" && ee.allowCustomizedBuiltInElements && (ee.tagNameCheck instanceof RegExp && Oe(ee.tagNameCheck, A) || ee.tagNameCheck instanceof Function && ee.tagNameCheck(A)))
            ) return !1;
          } else if (!ke[b]) {
            if (!Oe(g, Xt(A, be, ""))) {
              if (!((b === "src" || b === "xlink:href" || b === "href") && m !== "script" && Sc(A, "data:") === 0 && j[m])) {
                if (!(ct && !Oe(fe, Xt(A, be, "")))) {
                  if (A)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, _t = function(m) {
    return m !== "annotation-xml" && Zn(m, We);
  }, dt = function(m) {
    pe(I.beforeSanitizeAttributes, m, null);
    const {
      attributes: b
    } = m;
    if (!b || ye(m))
      return;
    const A = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: f,
      forceKeepAttr: void 0
    };
    let te = b.length;
    for (; te--; ) {
      const ue = b[te], {
        name: de,
        namespaceURI: Fe,
        value: ft
      } = ue, Dt = Ce(de), Mn = ft;
      let Te = de === "value" ? Mn : Ec(Mn);
      if (A.attrName = Dt, A.attrValue = Te, A.keepAttr = !0, A.forceKeepAttr = void 0, pe(I.uponSanitizeAttribute, m, A), Te = A.attrValue, Mt && (Dt === "id" || Dt === "name") && (K(de, m), Te = jt + Te), ut && Oe(/((--!?|])>)|<\/(style|title|textarea)/i, Te)) {
        K(de, m);
        continue;
      }
      if (Dt === "attributename" && Zn(Te, "href")) {
        K(de, m);
        continue;
      }
      if (A.forceKeepAttr)
        continue;
      if (!A.keepAttr) {
        K(de, m);
        continue;
      }
      if (!Lt && Oe(/\/>/i, Te)) {
        K(de, m);
        continue;
      }
      Ke && dn([M, q, ae], (Ar) => {
        Te = Xt(Te, Ar, " ");
      });
      const vr = Ce(m.nodeName);
      if (!pt(vr, Dt, Te)) {
        K(de, m);
        continue;
      }
      if (P && typeof p == "object" && typeof p.getAttributeType == "function" && !Fe)
        switch (p.getAttributeType(vr, Dt)) {
          case "TrustedHTML": {
            Te = P.createHTML(Te);
            break;
          }
          case "TrustedScriptURL": {
            Te = P.createScriptURL(Te);
            break;
          }
        }
      if (Te !== Mn)
        try {
          Fe ? m.setAttributeNS(Fe, de, Te) : m.setAttribute(de, Te), ye(m) ? L(m) : xi(t.removed);
        } catch {
          K(de, m);
        }
    }
    pe(I.afterSanitizeAttributes, m, null);
  }, Zt = function O(m) {
    let b = null;
    const A = se(m);
    for (pe(I.beforeSanitizeShadowDOM, m, null); b = A.nextNode(); )
      pe(I.uponSanitizeShadowNode, b, null), Ze(b), dt(b), b.content instanceof a && O(b.content);
    pe(I.afterSanitizeShadowDOM, m, null);
  };
  return t.sanitize = function(O) {
    let m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, b = null, A = null, te = null, ue = null;
    if (Je = !O, Je && (O = "<!-->"), typeof O != "string" && !ze(O))
      if (typeof O.toString == "function") {
        if (O = O.toString(), typeof O != "string")
          throw Kt("dirty is not a string, aborting");
      } else
        throw Kt("toString is not a function");
    if (!t.isSupported)
      return O;
    if (Ae || Wt(m), t.removed = [], typeof O == "string" && (ht = !1), ht) {
      if (O.nodeName) {
        const ft = Ce(O.nodeName);
        if (!Q[ft] || ie[ft])
          throw Kt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (O instanceof o)
      b = B("<!---->"), A = b.ownerDocument.importNode(O, !0), A.nodeType === Jt.element && A.nodeName === "BODY" || A.nodeName === "HTML" ? b = A : b.appendChild(A);
    else {
      if (!Ie && !Ke && !Re && // eslint-disable-next-line unicorn/prefer-includes
      O.indexOf("<") === -1)
        return P && Ne ? P.createHTML(O) : O;
      if (b = B(O), !b)
        return Ie ? null : Ne ? Z : "";
    }
    b && yt && L(b.firstChild);
    const de = se(ht ? O : b);
    for (; te = de.nextNode(); )
      Ze(te), dt(te), te.content instanceof a && Zt(te.content);
    if (ht)
      return O;
    if (Ie) {
      if (Qe)
        for (ue = V.call(b.ownerDocument); b.firstChild; )
          ue.appendChild(b.firstChild);
      else
        ue = b;
      return (f.shadowroot || f.shadowrootmode) && (ue = D.call(r, ue, !0)), ue;
    }
    let Fe = Re ? b.outerHTML : b.innerHTML;
    return Re && Q["!doctype"] && b.ownerDocument && b.ownerDocument.doctype && b.ownerDocument.doctype.name && Oe(ga, b.ownerDocument.doctype.name) && (Fe = "<!DOCTYPE " + b.ownerDocument.doctype.name + `>
` + Fe), Ke && dn([M, q, ae], (ft) => {
      Fe = Xt(Fe, ft, " ");
    }), P && Ne ? P.createHTML(Fe) : Fe;
  }, t.setConfig = function() {
    let O = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Wt(O), Ae = !0;
  }, t.clearConfig = function() {
    xt = null, Ae = !1;
  }, t.isValidAttribute = function(O, m, b) {
    xt || Wt({});
    const A = Ce(O), te = Ce(m);
    return pt(A, te, b);
  }, t.addHook = function(O, m) {
    typeof m == "function" && Yt(I[O], m);
  }, t.removeHook = function(O, m) {
    if (m !== void 0) {
      const b = kc(I[O], m);
      return b === -1 ? void 0 : bc(I[O], b, 1)[0];
    }
    return xi(I[O]);
  }, t.removeHooks = function(O) {
    I[O] = [];
  }, t.removeAllHooks = function() {
    I = Ti();
  }, t;
}
var Fc = Ca();
function Bc(e) {
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
function yn(e, t = !1) {
  return e;
}
function Vc(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function vi(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || Bc(e));
  } catch {
    return !1;
  }
}
function jc() {
  Fc.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !vi(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !vi(n) && e.removeAttribute("src");
    }
  });
}
jc();
const Wc = Ii(
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
    const [C, p] = X(""), [_, y] = X([]), N = mt(null), k = t && t.length > 0 ? t : [e], z = C.length === 0 && !o && k.length > 1;
    Ea(d, () => ({
      focus: () => {
        var w;
        (w = N.current) == null || w.focus();
      },
      setText: (w) => {
        p(w), setTimeout(() => {
          var U;
          (U = N.current) == null || U.focus();
        }, 0);
      }
    }));
    const R = ce(
      (w) => {
        w.preventDefault();
        const V = new FormData(w.currentTarget).get("message");
        if (V != null && V.trim()) {
          const $ = yn(V.trim(), !1);
          if (!$.trim()) {
            console.warn("Message was blocked due to security concerns");
            return;
          }
          c($, _), p(""), y([]);
        }
      },
      [c, _]
    ), P = ce(
      (w) => {
        const V = w.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
        p(V);
      },
      []
    ), Z = ce(async () => {
      const w = document.createElement("input");
      w.type = "file", w.accept = "image/*", w.multiple = !1, w.onchange = async (U) => {
        const V = U.target.files;
        if (V) {
          const $ = Array.from(V).filter((D) => {
            const I = Vc(D.name);
            return I !== D.name && console.warn(
              `File name sanitized: ${D.name} -> ${I}`
            ), D.size > 10485760 ? (console.warn(`File too large: ${D.name} (${D.size} bytes)`), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ].includes(D.type) ? !0 : (console.warn(
              `File type not allowed: ${D.name} (${D.type})`
            ), !1);
          });
          if ($.length > 0) {
            const D = await h($);
            y(D);
          }
        }
      }, w.click();
    }, [h]);
    return /* @__PURE__ */ v(dc, { onSubmit: R, style: { position: "relative" }, children: [
      /* @__PURE__ */ s(
        da,
        {
          ref: N,
          name: "message",
          value: C,
          onChange: P,
          placeholder: "",
          disabled: n
        }
      ),
      !C.trim() && /* @__PURE__ */ s(
        yc,
        {
          placeholderTexts: k,
          shouldAnimate: z
        }
      ),
      _.length > 0 && /* @__PURE__ */ s(
        "div",
        {
          style: {
            padding: "8px 16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center"
          },
          children: _.map((w, U) => {
            const V = w.startsWith("data:image/"), $ = w.startsWith("http://") || w.startsWith("https://"), D = V || $;
            return /* @__PURE__ */ v(
              "div",
              {
                style: {
                  position: "relative",
                  display: "inline-block"
                },
                children: [
                  D ? /* @__PURE__ */ v(
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
                            children: /* @__PURE__ */ v(
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
                        /* @__PURE__ */ v("div", { style: { flex: 1, minWidth: 0 }, children: [
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
                                  const M = I[1];
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
                                      const q = M.split("/")[1];
                                      return q ? q.toUpperCase().substring(0, 4) : "FILE";
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
                          (I) => I.filter((M, q) => q !== U)
                        );
                      },
                      style: {
                        position: "absolute",
                        top: D ? "6px" : "8px",
                        right: D ? "6px" : "8px",
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
      /* @__PURE__ */ v(fc, { children: [
        /* @__PURE__ */ v(mc, { children: [
          i && /* @__PURE__ */ v(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center"
              },
              children: [
                /* @__PURE__ */ s(
                  gc,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: Z,
                    title: _.length > 0 ? `${_.length} image(s) attached` : "Attach image",
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
          a && /* @__PURE__ */ v("div", { className: "chat-wrapper__restaurant-chip", children: [
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
          Cc,
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
), $c = ({
  prompts: e,
  onPromptSelect: t
}) => /* @__PURE__ */ v("div", { className: "chat-wrapper__suggested-prompts", children: [
  /* @__PURE__ */ s("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
  /* @__PURE__ */ s("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((n, r) => /* @__PURE__ */ s(
    "button",
    {
      className: "chat-wrapper__suggested-prompt-card",
      onClick: () => t(n),
      children: /* @__PURE__ */ v("div", { className: "chat-wrapper__suggested-prompt-content", children: [
        /* @__PURE__ */ s("h4", { className: "chat-wrapper__suggested-prompt-title", children: n.title }),
        /* @__PURE__ */ s("p", { className: "chat-wrapper__suggested-prompt-description", children: n.description })
      ] })
    },
    r
  )) })
] });
function Zc({ children: e, isStreaming: t }) {
  const [n, r] = X(!0), [i, a] = X(!1);
  Ht.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const l = () => {
    t || r(!n);
  }, o = Ht.Children.map(e, (c) => {
    if (Ht.isValidElement(c)) {
      if (c.type === ya)
        return Ht.cloneElement(
          c,
          {
            onToggle: l,
            isExpanded: n
          }
        );
      if (c.type === wa)
        return Ht.cloneElement(
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
function ya({
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
  ), l = t === "completed" || e.includes("Thinking") || e.includes("Processing");
  return /* @__PURE__ */ v(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${l ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: l ? r : void 0,
      style: { cursor: l ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ s("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ v("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ s("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        l && /* @__PURE__ */ s(
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
function wa({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ s("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function Gc({ children: e }) {
  return /* @__PURE__ */ s("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function qc({
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
        return /* @__PURE__ */ v("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ v("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ s("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ s("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ s("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ s("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ v(
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
          /* @__PURE__ */ v("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
        return /* @__PURE__ */ v("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ v("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ s("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ s("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ s("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ s("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ v(
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
          /* @__PURE__ */ v("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
        return /* @__PURE__ */ v("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
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
        return /* @__PURE__ */ v("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ v("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ s("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ s("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ s("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ s("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ v(
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
          /* @__PURE__ */ v("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
function xa({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ v("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
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
const Yc = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ s(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ s("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ s(xa, { size: e, variant: "dots" }) })
  }
);
async function Xc(e, t) {
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
async function Kc(e, t, n) {
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
const Qc = ({
  isOpen: e,
  onClose: t,
  app: n,
  apiUrl: r
}) => {
  const [i, a] = X(null), [l, o] = X(""), [c, h] = X(""), [u, d] = X(!1), [C, p] = X(null);
  lt(() => {
    e && !i && _();
  }, [e]);
  const _ = ce(async () => {
    d(!0), p(null);
    try {
      const k = await Xc(r, n);
      a(k), o(k.promptPath), h(k.versionUuid);
    } catch (k) {
      p(k instanceof Error ? k.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", k);
    } finally {
      d(!1);
    }
  }, [r, n]), y = ce(async () => {
    if (i) {
      d(!0), p(null);
      try {
        const k = await Kc(r, n, {
          promptPath: l,
          versionUuid: c,
          isDefault: i.isDefault
        });
        a(k), t(), window.location.reload();
      } catch (k) {
        p(k instanceof Error ? k.message : "Failed to update configuration"), console.error("Error updating agent configuration:", k);
      } finally {
        d(!1);
      }
    }
  }, [r, n, l, c, i, t]), N = ce(() => {
    i && (o(i.promptPath), h(i.versionUuid)), p(null), t();
  }, [i, t]);
  return e ? /* @__PURE__ */ s("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ s("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ s(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: N,
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
    /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-content", children: [
      u && /* @__PURE__ */ s("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      C && /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ v("p", { children: [
          "Error: ",
          C
        ] }),
        /* @__PURE__ */ s(
          "button",
          {
            onClick: _,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      i && !u && /* @__PURE__ */ v(xn, { children: [
        /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ s("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ s(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: l,
              onChange: (k) => o(k.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: u
            }
          ),
          /* @__PURE__ */ s("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ s("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ s(
            "input",
            {
              id: "version-uuid",
              type: "text",
              value: c,
              onChange: (k) => h(k.target.value),
              placeholder: "e.g., 123e4567-e89b-12d3-a456-426614174000",
              className: "chat-wrapper__dev-settings-input",
              disabled: u
            }
          ),
          /* @__PURE__ */ s("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ s("div", { className: "chat-wrapper__dev-settings-info", children: /* @__PURE__ */ v("p", { children: [
          /* @__PURE__ */ s("strong", { children: "App:" }),
          " ",
          n
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ s(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: N,
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
}, Jc = ({ className: e, onClick: t }) => /* @__PURE__ */ v(
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
), eu = {
  maxReconnectAttempts: 5,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, Ai = {
  NORMAL: 1e3,
  GOING_AWAY: 1001
};
var rt = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(rt || {}), Ct = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e))(Ct || {}), De = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.TOOL_CALL_REQUEST = "tool_call_request", e.BUSINESS_DATA_UPDATE = "business_data_update", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(De || {}), wn = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(wn || {}), bt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(bt || {});
class Ft {
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
    return this.createConnectionEvent(rt.CONNECTION_ESTABLISHED);
  }
  static connectionLost(t) {
    return this.createConnectionEvent(rt.CONNECTION_LOST, { reason: t });
  }
  static connectionRestored() {
    return this.createConnectionEvent(rt.CONNECTION_RESTORED);
  }
  static reconnecting(t, n) {
    return this.createConnectionEvent(rt.RECONNECTING, { attempt: t, maxAttempts: n });
  }
  static chatCompleted(t) {
    return this.createChatEvent(rt.CHAT_COMPLETED, { conversationId: t });
  }
  static chatError(t, n) {
    return this.createChatEvent(rt.CHAT_ERROR, { error: t, errorCode: n });
  }
}
class St {
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
   * Helper method to create and serialize a message in one call
   */
  static serializeChatMessage(t) {
    return this.serialize(this.createChatMessage(t));
  }
  static serializeConfigureTools(t, n) {
    return this.serialize(this.createConfigureToolsMessage(t, n));
  }
  static serializeUpdateTools(t) {
    return this.serialize(this.createUpdateToolsMessage(t));
  }
  static serializeUpdateContextHelpers(t) {
    return this.serialize(this.createUpdateContextHelpersMessage(t));
  }
  static serializeToolCallSuccess(t, n) {
    return this.serialize(this.createToolCallSuccessResponse(t, n));
  }
  static serializeToolCallError(t, n) {
    return this.serialize(this.createToolCallErrorResponse(t, n));
  }
  static serializeHeartbeatPing() {
    return this.serialize(this.createHeartbeatPing());
  }
  static serializeHeartbeatPong(t, n) {
    return this.serialize(this.createHeartbeatPong(t, n));
  }
}
class tu {
  constructor(t, n) {
    ne(this, "ws", null);
    ne(this, "config");
    ne(this, "connectionState");
    ne(this, "reconnectTimer", null);
    ne(this, "heartbeatInterval", null);
    ne(this, "visibilityChangeHandler");
    ne(this, "onOpen");
    ne(this, "onMessage");
    ne(this, "onError");
    ne(this, "onClose");
    ne(this, "onSystemEvent");
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
    this.ws && (this.ws.onopen = () => {
      var r;
      this.connectionState.setConnected(!0), this.connectionState.setReconnecting(!1), this.connectionState.resetReconnectAttempts(), this.connectionState.updateReconnectDelay(this.config.reconnectDelay), this.startHeartbeat(), (r = this.onOpen) == null || r.call(this), t == null || t();
    }, this.ws.onerror = (r) => {
      var i;
      (i = this.onError) == null || i.call(this, r), r instanceof Event && t ? (this.connectionState.setConnected(!0), t()) : n == null || n(r);
    }, this.ws.onmessage = (r) => {
      var i;
      (i = this.onMessage) == null || i.call(this, r);
    }, this.ws.onclose = (r) => {
      var l;
      this.connectionState.setConnected(!1), this.stopHeartbeat(), (l = this.onClose) == null || l.call(this, r);
      const { NORMAL: i, GOING_AWAY: a } = Ai;
      r.code !== i && r.code !== a && this.attemptReconnect();
    });
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
        Ft.connectionLost("Max reconnection attempts reached")
      ));
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    (a = this.onSystemEvent) == null || a.call(this, Ft.reconnecting(t, n)), this.reconnectTimer = window.setTimeout(() => {
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
      this.connectionState.setReconnecting(!1), setTimeout(
        () => this.attemptReconnect(),
        this.connectionState.reconnectDelay
      );
    }
  }
  setupReconnectHandlers() {
    this.ws && (this.ws.onopen = () => {
      var t, n;
      this.connectionState.setConnected(!0), this.connectionState.setReconnecting(!1), this.connectionState.resetReconnectAttempts(), this.connectionState.updateReconnectDelay(this.config.reconnectDelay), this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Ft.connectionRestored()), (n = this.onOpen) == null || n.call(this);
    }, this.ws.onerror = () => {
      this.connectionState.setReconnecting(!1), setTimeout(
        () => this.attemptReconnect(),
        this.connectionState.reconnectDelay
      );
    }, this.ws.onclose = (t) => {
      this.connectionState.setConnected(!1), this.connectionState.setReconnecting(!1), this.stopHeartbeat();
      const { NORMAL: n, GOING_AWAY: r } = Ai;
      t.code !== n && t.code !== r && this.attemptReconnect();
    }, this.ws.onmessage = (t) => {
      var n;
      (n = this.onMessage) == null || n.call(this, t);
    });
  }
  startHeartbeat() {
  }
  sendHeartbeat() {
    const t = St.serializeHeartbeatPing();
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
class nu {
  constructor() {
    ne(this, "state");
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
class ru {
  constructor(t) {
    ne(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    ne(this, "reasoningContent", /* @__PURE__ */ new Map());
    ne(this, "onReasoningUpdate");
    this.onReasoningUpdate = t;
  }
  handleReasoningStart(t) {
    const n = t.id || "reasoning";
    this.reasoningStartTimes.set(n, Date.now()), this.reasoningContent.set(n, "");
  }
  handleReasoningDelta(t) {
    if (this.onReasoningUpdate && t.text) {
      const n = t.id || "reasoning", i = (this.reasoningContent.get(n) || "") + t.text;
      this.reasoningContent.set(n, i);
      const a = {
        toolName: "reasoning",
        callId: n,
        parameters: { phase: "thinking", text: i }
      };
      this.onReasoningUpdate(!0, `🧠 ${i}`, a);
    }
  }
  handleReasoningEnd(t) {
    const n = t.id || "reasoning", r = this.reasoningContent.get(n) || "", i = this.reasoningStartTimes.get(n);
    let a = "";
    if (i && (a = ` for ${((Date.now() - i) / 1e3).toFixed(1)} seconds`, this.reasoningStartTimes.delete(n)), this.onReasoningUpdate) {
      const l = {
        toolName: "reasoning",
        callId: n,
        parameters: {
          phase: "end",
          duration: a,
          fullContent: r
        }
      }, c = `🧠 ${r || "Thought"}${a}`;
      this.onReasoningUpdate(!1, c, l);
    }
    this.reasoningContent.delete(n);
  }
  setReasoningUpdateHandler(t) {
    this.onReasoningUpdate = t;
  }
}
class iu {
  constructor(t = {}, n) {
    ne(this, "processedToolCalls", /* @__PURE__ */ new Set());
    ne(this, "clientTools", {});
    ne(this, "onReasoningUpdate");
    ne(this, "sendMessage");
    this.clientTools = t, this.onReasoningUpdate = n;
  }
  async handleToolCallRequest(t) {
    var a, l, o;
    const { callId: n, toolName: r, parameters: i } = t;
    if (!this.processedToolCalls.has(n)) {
      this.processedToolCalls.add(n), (a = this.onReasoningUpdate) == null || a.call(this, !0, `🔧 Handling: ${r}`, t);
      try {
        const c = await this.executeToolFunction(r, i);
        this.sendToolResponse(n, c), (l = this.onReasoningUpdate) == null || l.call(this, !1, `✅ Completed: ${r}`, t);
      } catch (c) {
        this.sendToolError(n, c), (o = this.onReasoningUpdate) == null || o.call(this, !1, `❌ Error: ${r} - ${c}`, t);
      }
    }
  }
  async executeToolFunction(t, n) {
    const r = this.clientTools[t];
    if (!r)
      throw new Error(`Tool not found: ${t}`);
    return await r(n);
  }
  sendToolResponse(t, n) {
    if (!this.sendMessage)
      return;
    const r = St.serializeToolCallSuccess(t, n);
    this.sendMessage(r);
  }
  sendToolError(t, n) {
    if (!this.sendMessage)
      return;
    const r = n instanceof Error ? n.message : "Unknown error", i = St.serializeToolCallError(t, r);
    this.sendMessage(i);
  }
  handleServerToolCall(t) {
    var n;
    if (this.onReasoningUpdate && ((n = t.toolName) != null && n.startsWith("lat_")) && t.toolCallId) {
      const r = {
        toolName: t.toolName,
        callId: t.toolCallId,
        parameters: t.args || {}
      };
      this.onReasoningUpdate(!0, `🔧 Handling: ${t.toolName}`, r);
    }
  }
  handleServerToolResult(t) {
    var n;
    if (this.onReasoningUpdate && ((n = t.toolName) != null && n.startsWith("lat_")) && t.toolCallId) {
      const r = {
        toolName: t.toolName,
        callId: t.toolCallId,
        parameters: {}
      };
      this.onReasoningUpdate(
        !1,
        `✅ Completed: ${t.toolName}`,
        r
      );
    }
  }
  clearProcessedToolCalls() {
    this.processedToolCalls.clear();
  }
  updateClientTools(t) {
    this.clientTools = { ...this.clientTools, ...t };
  }
  setSendMessageHandler(t) {
    this.sendMessage = t;
  }
  setReasoningUpdateHandler(t) {
    this.onReasoningUpdate = t;
  }
}
class au {
  constructor(t, n = {}) {
    ne(this, "reasoningHandler");
    ne(this, "toolHandler");
    ne(this, "handlers");
    ne(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new ru(t.onReasoningUpdate), this.toolHandler = new iu(n, t.onReasoningUpdate);
  }
  handleMessage(t) {
    try {
      const n = JSON.parse(t.data);
      switch (n.type) {
        case De.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case De.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case De.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case De.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case De.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case De.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case De.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case De.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case De.BUSINESS_DATA_UPDATE:
          this.handleBusinessDataUpdate(n);
          break;
        case De.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case De.HEARTBEAT_ACK:
          break;
        case De.ERROR:
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
      case wn.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case wn.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case wn.CONTENT_DELTA:
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
        const i = {
          toolName: r.toolName,
          callId: r.toolCallId,
          parameters: {}
        };
        this.handlers.onReasoningUpdate(
          !1,
          `✅ Completed: ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Ft.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Ft.chatError(t.error || "Unknown error"));
  }
  handleToolCallRequest(t) {
    this.toolHandler.handleToolCallRequest(t);
  }
  handleBusinessDataUpdate(t) {
    this.handlers.onBusinessDataUpdate && this.handlers.onBusinessDataUpdate(t.data);
  }
  handleHeartbeatPing(t) {
    if (!this.sendMessage)
      return;
    const n = St.serializeHeartbeatPong(
      t.timestamp,
      t.pingTime
    );
    this.sendMessage(n);
  }
  handleError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Ft.chatError(t.error || "Unknown WebSocket error"));
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
    Object.assign(this.handlers, t), t.onReasoningUpdate && (this.reasoningHandler.setReasoningUpdateHandler(t.onReasoningUpdate), this.toolHandler.setReasoningUpdateHandler(t.onReasoningUpdate));
  }
}
class lu {
  constructor() {
    ne(this, "config");
    ne(this, "connectionState");
    ne(this, "wsManager");
    ne(this, "messageHandler");
    ne(this, "initResolve");
    // Client tools and context
    ne(this, "toolSchemas", []);
    ne(this, "contextHelpers", {});
    this.config = {
      ...eu
    }, this.connectionState = new nu(), this.wsManager = new tu(this.config, this.connectionState), this.messageHandler = new au({}), this.setupWebSocketHandlers();
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
    (n == null ? void 0 : n.type) === De.TOOLS_CONFIGURED && ((r = this.initResolve) == null || r.call(this)), (n == null ? void 0 : n.type) === De.SESSION_ESTABLISHED && (!this.toolSchemas || this.toolSchemas.length === 0) && ((i = this.initResolve) == null || i.call(this));
  }
  handleConnectionOpen() {
    this.toolSchemas && this.toolSchemas.length > 0 && this.sendToolConfiguration();
  }
  sendToolConfiguration() {
    const t = St.serializeConfigureTools(
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
      onBusinessDataUpdate: t.onBusinessDataUpdate,
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
  async onTriggerMessage(t, n = "UD21", r, i, a) {
    if (!this.connectionState.isConnected)
      throw new Error("Client not connected");
    try {
      this.messageHandler.clearProcessedToolCalls();
      const l = St.serializeChatMessage({
        content: t,
        app: n,
        media: r,
        userId: this.config.userId,
        convUuid: i,
        agentPromptPath: a,
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
    const n = St.serializeUpdateContextHelpers(this.contextHelpers);
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = St.serializeUpdateTools(this.toolSchemas);
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
async function yu(e, t, n) {
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
async function wu(e, t) {
  const n = `${e}/threads/conv/${t}`, r = await fetch(n);
  if (!r.ok) {
    const i = await r.json().catch(() => ({
      error: "Thread not found"
    }));
    throw new Error(i.error || "Thread not found");
  }
  return r.json();
}
async function ou(e, t) {
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
async function xu(e, t) {
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
async function _u(e, t, n, r) {
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
const _a = hr(
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
    var _;
    const [h, u] = X(!1), [d, C] = X(!1), p = ce(async () => {
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
          /* @__PURE__ */ v(Zc, { isStreaming: e.isStreaming || !1, children: [
            /* @__PURE__ */ s(
              ya,
              {
                title: t(e.content, e.isStreaming),
                status: n(e.content, e.isStreaming),
                duration: r(e.content)
              }
            ),
            /* @__PURE__ */ s(wa, { children: i(e.content) })
          ] })
        ) : e.role === "tooling" ? (
          /* Tooling message - no content wrapper */
          /* @__PURE__ */ s(Gc, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ s(
            qc,
            {
              title: a(e.content, e.isStreaming),
              status: l(e.content, e.isStreaming),
              toolData: e.toolData,
              toolName: (_ = e.toolData) == null ? void 0 : _.toolName,
              clientTools: o
            }
          ) })
        ) : /* @__PURE__ */ s("div", { className: "chat-wrapper__message-content", children: e.role === "assistant" && e.isStreaming && e.content === "" && e.id === c.current ? (
          /* Show streaming indicator when no content yet */
          /* @__PURE__ */ v("div", { className: "chat-wrapper__streaming-placeholder", children: [
            /* @__PURE__ */ s(xa, { size: 16, variant: "dots" }),
            /* @__PURE__ */ s("span", { children: "Thinking" })
          ] })
        ) : e.role === "system" ? (
          /* System message with collapsible tool result */
          /* @__PURE__ */ s(su, { message: e })
        ) : e.role === "assistant" ? (
          /* Assistant message with regular markdown display */
          /* @__PURE__ */ v("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: [
            d && /* @__PURE__ */ s(
              "button",
              {
                className: "chat-wrapper__copy-button",
                onClick: p,
                title: "Copy message",
                children: /* @__PURE__ */ s(Jc, {})
              }
            ),
            h && /* @__PURE__ */ s("div", { className: "chat-wrapper__copied-notification", children: "Copied!" }),
            /* @__PURE__ */ s("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ s(
              Sn,
              {
                components: {
                  pre: ({ children: y }) => /* @__PURE__ */ s("pre", { className: "chat-wrapper__code-block", children: y }),
                  code: ({ children: y, className: N }) => !N ? /* @__PURE__ */ s("code", { className: "chat-wrapper__inline-code", children: y }) : /* @__PURE__ */ s("code", { className: "chat-wrapper__code-block", children: y }),
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
          /* @__PURE__ */ v("div", { className: "chat-wrapper__regular-message", children: [
            /* @__PURE__ */ s("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ s(
              Sn,
              {
                components: {
                  pre: ({ children: y }) => /* @__PURE__ */ s("pre", { className: "chat-wrapper__code-block", children: y }),
                  code: ({ children: y, className: N }) => !N ? /* @__PURE__ */ s("code", { className: "chat-wrapper__inline-code", children: y }) : /* @__PURE__ */ s("code", { className: "chat-wrapper__code", children: y }),
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
                children: e.media.map((y, N) => {
                  const k = y.startsWith("data:image/"), z = y.startsWith("http://") || y.startsWith("https://");
                  return /* @__PURE__ */ s(
                    "div",
                    {
                      style: {
                        position: "relative",
                        display: "inline-block"
                      },
                      children: k || z ? /* @__PURE__ */ v(
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
                                alt: `Attachment ${N + 1}`,
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
                                children: /* @__PURE__ */ v(
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
                            /* @__PURE__ */ v("div", { style: { flex: 1, minWidth: 0 }, children: [
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
_a.displayName = "MessageComponent";
const ka = hr(
  ({ content: e, messageId: t }) => !t || !e ? null : /* @__PURE__ */ s("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__message-content", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ s(
    Sn,
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
ka.displayName = "StreamingMessage";
function su({ message: e }) {
  const [t, n] = X(!0);
  return /* @__PURE__ */ v("div", { className: "chat-wrapper__system-message", children: [
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
        children: e.role === "system" ? /* @__PURE__ */ v("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
          /* @__PURE__ */ v("span", { children: [
            "AI text input <show-toolname>",
            "..."
          ] }),
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
        ] }) : e.role === "assistant" ? e.isStreaming ? /* @__PURE__ */ v("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
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
          /* @__PURE__ */ s("span", { children: "Thinking..." }),
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
        ] }) : /* @__PURE__ */ v("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
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
          /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ v(
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
          Sn,
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
function cu({
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
  var $t;
  const h = ce((T) => T.replace(
    /^wss?:\/\//,
    (L) => L === "wss://" ? "https://" : "http://"
  ), []), u = At(() => h(e), [e, h]), [d, C] = X(
    null
  ), [p, _] = X(!1), y = mt(null), [N, k] = X(i), [z, R] = X(!1), [P, Z] = X(!1), [w, U] = X("idle"), [V, $] = X(!1), [D, I] = X(t.mode), [M, q] = X(!1), [ae, G] = X(
    null
  ), [xe, fe] = X(null), [be, We] = X(null), [g] = X([]), [Q, ve] = X(""), [f, me] = X(!1), [, ee] = X(""), [ie, Ue] = X(""), [_e, Ye] = X(!1), [, Xe] = X(
    /* @__PURE__ */ new Map()
  ), [, ct] = X(
    /* @__PURE__ */ new Map()
  ), [Lt, Ke] = X(!1), ut = mt(null), Re = mt(null), Ae = mt(null), yt = mt(!0), Ie = mt(""), Qe = mt(!1), Ne = ce(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), Rt = At(
    () => (T, L) => L === !1 ? T.includes("❌") ? "error" : "completed" : T.includes("✅ Completed:") || T.includes("✅") ? "completed" : T.includes("❌") ? "error" : "processing",
    []
  ), Mt = At(
    () => (T) => {
      const L = T.match(/for ([\d.]+) seconds/);
      return L ? ` for ${L[1]} seconds` : void 0;
    },
    []
  ), jt = At(
    () => (T) => {
      let L = T.replace(/^🧠\s*/, "");
      return L = L.replace(/\s*for [\d.]+\s*seconds$/, ""), L = L.replace(/\*\*(.*?)\*\*/g, ""), L;
    },
    []
  ), Tt = At(
    () => (T, L) => (console.log("🔍 getReasoningTitle:", { content: T, isStreaming: L }), L === !1 ? T.includes("❌") ? "Error" : (T.includes("🧠") && T.includes("for") && T.includes("seconds") || T.includes("🧠 Thought"), "Thought") : T.includes("✅ Completed:") || T.includes("✅") ? "Completed" : T.includes("❌") ? "Error" : (T.includes("🔧 Handling:") || T.includes("🧠") && !T.includes("AI is thinking"), "Thinking...")),
    []
  ), ht = At(
    () => (T, L) => L === !1 ? T.includes("❌") ? "Tool Error" : "Tool Completed" : T.includes("✅ Completed:") || T.includes("✅") ? "Tool Completed" : T.includes("❌") ? "Tool Error" : (T.includes("🔧 Handling:"), "Tool Processing..."),
    []
  ), x = At(
    () => (T, L) => L === !1 ? T.includes("❌") ? "error" : "completed" : T.includes("✅ Completed:") || T.includes("✅") ? "completed" : T.includes("❌") ? "error" : "processing",
    []
  ), S = ce(
    (T, L) => {
      const B = yn(L, T === "assistant");
      k((se) => [
        ...se,
        {
          id: Ne(),
          role: T,
          content: B,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [Ne]
  ), H = ce(() => {
    if (Ae.current && Ie.current) {
      const T = yn(
        Ie.current,
        !0
      ), L = {
        id: Ae.current,
        role: "assistant",
        content: T,
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !1
      };
      return k((K) => [...K, L]), Ae.current = null, Ie.current = "", Ue(""), !0;
    }
    return !1;
  }, []), j = ce(() => {
    R(!1), me(!1), U("idle"), H(), setTimeout(() => {
      var T;
      (T = Re.current) == null || T.focus();
    }, 0);
  }, [H]), J = ce(
    (T) => {
      console.error("Chat error:", T), R(!1), me(!1), U("error"), H(), S("system", `❌ Chat error: ${T}`);
    },
    [S, H]
  ), ke = ce(async () => {
    try {
      const T = new lu();
      y.current = T, C(T);
      const L = c || {};
      await T.onInit({
        apiUrl: e,
        userId: a,
        toolSchemas: r,
        clientTools: n,
        contextHelpers: L,
        onSetMessage: (K) => {
          const B = yn(K, !0);
          if (Ae.current)
            Ie.current += B, Ue(Ie.current);
          else {
            me(!1);
            const se = Ne();
            Ae.current = se, Ie.current = B, Ue(B);
          }
        },
        onSystemEvent: (K) => {
          var B;
          switch (K.type) {
            case rt.CHAT_COMPLETED:
              j();
              break;
            case rt.CHAT_ERROR:
              (B = K.data) != null && B.error && J(K.data.error);
              break;
            case rt.CONNECTION_LOST:
              break;
            case rt.CONNECTION_RESTORED:
              break;
            default:
              break;
          }
        },
        onReasoningUpdate: (K, B, se) => {
          console.log("🤔 Reasoning update:", {
            isThinking: K,
            content: B,
            toolCallRequest: se
          });
          const { callId: ye } = se || {};
          if (Ye(K), ee(B), !ye) {
            console.log("⚠️ No callId provided for reasoning update");
            return;
          }
          const ze = !1, pe = B.includes("🧠") && !B.includes("for") && !B.includes("seconds"), Ze = B.includes("🧠") && B.includes("for") && B.includes("seconds"), pt = B.includes("🔧 Handling:"), _t = B.includes("✅ Completed:"), dt = B.includes("❌ Error:");
          console.log("🔍 Debug reasoning conditions:", {
            isReasoningStarted: ze,
            isReasoningThinking: pe,
            isReasoningCompleted: Ze,
            isToolStarted: pt,
            isToolCompleted: _t,
            isToolError: dt,
            callId: ye,
            isHandlingTool: _e
          }), (pe || Ze) && ct((Zt) => {
            const O = new Map(Zt), m = O.get(ye);
            if (pe && !m) {
              H();
              const b = Ne();
              O.set(ye, b);
              const A = {
                id: b,
                role: "reasoning",
                content: B,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0
              };
              k((te) => [...te, A]);
            } else Ze && m ? (k(
              (b) => b.map(
                (A) => A.id === m ? {
                  ...A,
                  content: B,
                  isStreaming: !1
                  // Mark as completed
                } : A
              )
            ), O.delete(ye)) : m && pe && k(
              (b) => b.map(
                (A) => A.id === m ? {
                  ...A,
                  content: B,
                  isStreaming: !0
                } : A
              )
            );
            return O;
          }), Xe((Zt) => {
            const O = new Map(Zt), m = O.get(ye);
            if (pt && !m) {
              H();
              const b = B.match(/🔧 Handling: (.+)/), A = b ? b[1] : "Unknown Tool", te = Ne();
              O.set(ye, te);
              const ue = {
                id: te,
                role: "tooling",
                content: B,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0,
                toolData: {
                  ...se,
                  toolName: A,
                  callId: ye,
                  status: "processing"
                }
              };
              k((de) => [...de, ue]);
            } else if ((_t || dt) && m) {
              const b = B.match(
                /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
              ), A = b ? b[1] : "Unknown Tool";
              k(
                (te) => te.map(
                  (ue) => ue.id === m ? {
                    ...ue,
                    content: B,
                    isStreaming: !1,
                    // Mark as completed
                    toolData: {
                      ...ue.toolData,
                      toolName: A,
                      status: dt ? "error" : "completed",
                      callId: ye ?? ""
                    }
                  } : ue
                )
              ), O.delete(ye);
            } else m && _e && !_t && !dt && k(
              (b) => b.map(
                (A) => A.id === m ? {
                  ...A,
                  content: B,
                  isStreaming: !0
                } : A
              )
            );
            return O;
          });
        },
        onBusinessDataUpdate: (K) => {
          t.onBusinessDataUpdate && t.onBusinessDataUpdate(K);
        }
      }), _(!0), console.log("WebSocketChatClient connected");
    } catch (T) {
      console.error("Error connecting WebSocketChatClient:", T), _(!1);
    }
  }, [
    e,
    r,
    n,
    t,
    Ne,
    S,
    j,
    J,
    H
  ]), $e = ce(() => {
    y.current && (y.current.disconnect(), y.current = null), C(null), _(!1);
  }, []), Se = ce(() => {
    console.log("🔍 DEBUG: resetToolHandling called! Stack trace:"), console.trace(), Ye(!1), yt.current = !0;
  }, []), Ee = mt(null), ge = ce(() => {
    Ee.current && cancelAnimationFrame(Ee.current), Ee.current = requestAnimationFrame(() => {
      var T;
      (T = ut.current) == null || T.scrollIntoView({ behavior: "smooth" }), Ee.current = null;
    });
  }, []);
  lt(() => {
    ge();
  }, [N, ge]), lt(() => {
    ie && ge();
  }, [ie, ge]), lt(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(Q);
  }, [Q, t]), lt(() => (console.log("Connecting WebSocketChatClient..."), ke(), () => {
    $e(), Ee.current && cancelAnimationFrame(Ee.current);
  }), [ke, $e]), lt(() => {
    const T = setInterval(() => {
      if (y.current) {
        const L = y.current.getConnectionStatus();
        _(L.connected);
      }
    }, 1e3);
    return () => clearInterval(T);
  }, []), lt(() => {
    (async () => {
      if (a && !Qe.current && !M && !(N.length > 0))
        try {
          q(!0), G(null), console.log(`📚 Fetching threads for user: ${a}`);
          const L = [];
          if (L.length === 0) {
            console.log("ℹ️ No threads found for user"), q(!1), Qe.current = !0;
            return;
          }
          const K = L[0];
          console.log(
            `📖 Loading thread: ${K.id} (${K.title})`
          ), fe(K.id), We(K.convUuid);
          const B = await ou(
            u,
            K.id
          );
          console.log(`✅ Loaded ${B.length} messages`), k(B), Qe.current = !0;
        } catch (L) {
          console.error("❌ Error loading conversation:", L), G(
            L instanceof Error ? L.message : "Failed to load conversation"
          ), Qe.current = !0;
        } finally {
          q(!1);
        }
    })();
  }, [a, u]);
  const he = ce(
    async (T, L) => {
      if (!T.trim() || z || !d || !p)
        return;
      const K = {
        id: Ne(),
        role: "user",
        content: T.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: L
      };
      k((B) => [...B, K]), R(!0), me(!0), U("submitted"), ve("Starting...");
      try {
        await d.onTriggerMessage(
          K.content,
          o,
          L,
          be || void 0,
          void 0
        ), U("streaming");
      } catch (B) {
        console.error("Agent client send error:", B), me(!1), U("error"), S(
          "system",
          `Sorry, there was an error: ${B instanceof Error ? B.message : "Unknown error"}`
        ), t.onError && t.onError(
          B instanceof Error ? B : new Error("Unknown error")
        ), R(!1), U("idle"), ve("");
      }
    },
    [
      z,
      d,
      p,
      Ne,
      S,
      t,
      be
    ]
  ), Je = ce(() => {
    R(!1), U("idle"), ve(""), me(!1), ee(""), Ae.current = null, Ie.current = "", Ue(""), Se();
  }, [Se]), Me = ce(
    async (T) => {
      console.log("Files selected:", T);
      const L = [], K = e, B = "chat-uploads";
      for (const se of T)
        try {
          const ye = new FormData();
          ye.append("file", se), ye.append("folder", B), console.log(`Uploading file: ${se.name} to ${K}/upload`);
          const ze = await fetch(`${K}/upload`, {
            method: "POST",
            body: ye
          }), pe = await ze.json();
          if (ze.ok)
            console.log("✅ Upload successful:", pe), se.type.startsWith("image/") ? L.push(pe.url) : L.push(
              `data:${se.type};name=${encodeURIComponent(
                pe.fileName || se.name
              )};url=${encodeURIComponent(pe.url)}`
            );
          else if (console.error("❌ Upload failed:", pe.error), se.type.startsWith("image/")) {
            const Ze = new FileReader(), pt = await new Promise(
              (_t, dt) => {
                Ze.onload = () => _t(Ze.result), Ze.onerror = dt, Ze.readAsDataURL(se);
              }
            );
            L.push(pt);
          } else
            L.push(
              `data:${se.type};name=${encodeURIComponent(
                se.name
              )};base64,placeholder`
            );
        } catch (ye) {
          console.error("Error uploading file:", ye);
          try {
            if (se.type.startsWith("image/")) {
              const ze = new FileReader(), pe = await new Promise(
                (Ze, pt) => {
                  ze.onload = () => Ze(ze.result), ze.onerror = pt, ze.readAsDataURL(se);
                }
              );
              L.push(pe);
            } else
              L.push(
                `data:${se.type};name=${encodeURIComponent(
                  se.name
                )};base64,placeholder`
              );
          } catch (ze) {
            console.error("Error in fallback encoding:", ze);
          }
        }
      return console.log("Added media:", L), L;
    },
    [e]
  ), In = ce(() => {
    Z(!0);
  }, []), wt = ce(() => {
    Z(!1);
  }, []), vt = ce(() => {
    $((T) => !T);
  }, []), Nn = ce(() => {
    I((T) => T === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  lt(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const T = (L) => {
      L.key === "Escape" && D === "modal" && P && wt();
    };
    if (D === "modal" && P)
      return document.addEventListener("keydown", T), () => document.removeEventListener("keydown", T);
  }, [D, P, wt]);
  const Ln = ((...T) => T.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${D}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`,
    V && "chat-wrapper--collapsed",
    D === "embedded" && t.constrainedHeight && "chat-wrapper--constrained"
  ), on = () => {
    var L;
    if (D === "modal" && !P || D === "sidebar" && V || D === "fullscreen" && V) {
      const K = D === "modal" ? In : vt, B = D === "modal" ? `Open ${t.appName}` : `Expand ${t.appName}`;
      return /* @__PURE__ */ v(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: K,
          title: B,
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
            ((L = t.features) == null ? void 0 : L.showBubbleText) !== !1 && /* @__PURE__ */ s("span", { className: "chat-wrapper__bubble-text", children: t.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, Ce = () => D === "modal" && P ? /* @__PURE__ */ s(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: wt,
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
  ) : null, xt = () => {
    if ((D === "sidebar" || D === "fullscreen") && !V) {
      const T = D === "fullscreen";
      return /* @__PURE__ */ s(
        "button",
        {
          className: T ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: Nn,
          title: T ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ s(
            "svg",
            {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: T ? (
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
  }, Rn = () => (D === "sidebar" || D === "fullscreen") && !V ? /* @__PURE__ */ s(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: vt,
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
  ) : null, sn = () => l && t.headerVisible !== !1 ? /* @__PURE__ */ s(
    "button",
    {
      className: "chat-wrapper__settings-button",
      onClick: () => Ke(!0),
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
  ) : null, Wt = () => !l || t.headerVisible !== !1 ? null : /* @__PURE__ */ s(
    "button",
    {
      className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
      onClick: () => Ke(!0),
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
  ), cn = () => {
    var T;
    return !((T = t.features) != null && T.showToolResults) || g.length === 0 ? null : /* @__PURE__ */ v("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ s("h4", { children: "Tool Results" }),
      /* @__PURE__ */ s("div", { className: "chat-wrapper__tool-results-list", children: g.map((L) => /* @__PURE__ */ v("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ s("div", { className: "chat-wrapper__tool-result-title", children: L.title }),
        L.description && /* @__PURE__ */ s("div", { className: "chat-wrapper__tool-result-description", children: L.description }),
        /* @__PURE__ */ v("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          L.status || "completed"
        ] })
      ] }, L.id)) })
    ] });
  };
  return D === "modal" && !P || (D === "sidebar" || D === "fullscreen") && V ? on() : /* @__PURE__ */ s(xn, { children: /* @__PURE__ */ v("div", { className: Ln, style: t.customStyles, children: [
    Wt(),
    t.headerVisible !== !1 && /* @__PURE__ */ v("div", { className: "chat-wrapper__header", children: [
      /* @__PURE__ */ s("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ s("h2", { className: "chat-wrapper__title", children: t.appName }) }),
      /* @__PURE__ */ v("div", { className: "chat-wrapper__header-controls", children: [
        sn(),
        xt(),
        Rn(),
        Ce()
      ] })
    ] }),
    !V && /* @__PURE__ */ v(xn, { children: [
      ae && /* @__PURE__ */ s("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ v("p", { children: [
        "⚠️ ",
        ae
      ] }) }),
      N.length === 0 && !z && !M && /* @__PURE__ */ v("div", { className: "chat-wrapper__main-header", children: [
        /* @__PURE__ */ s("h1", { className: "chat-wrapper__main-title", children: t.appName }),
        t.description && /* @__PURE__ */ s("p", { className: "chat-wrapper__description", children: t.description })
      ] }),
      /* @__PURE__ */ v(
        "div",
        {
          className: `chat-wrapper__content ${N.length === 0 && !z && !M ? "chat-wrapper__content--empty" : "chat-wrapper__content--with-messages"}`,
          children: [
            /* @__PURE__ */ v("div", { className: "chat-wrapper__messages", children: [
              M && N.length === 0 && /* @__PURE__ */ s(Yc, { fullHeight: !0 }),
              N.map((T) => /* @__PURE__ */ s(
                _a,
                {
                  message: T,
                  getReasoningTitle: Tt,
                  getReasoningStatus: Rt,
                  getReasoningDuration: Mt,
                  getReasoningContentOnly: jt,
                  getToolingTitle: ht,
                  getToolingStatus: x,
                  clientTools: r || [],
                  currentAssistantMessageIdRef: Ae
                },
                T.id
              )),
              Ae.current && ie && /* @__PURE__ */ s(
                ka,
                {
                  content: ie,
                  messageId: Ae.current
                }
              ),
              f && !_e && /* @__PURE__ */ s("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ s("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ v("div", { className: "chat-wrapper__thinking-dots", children: [
                /* @__PURE__ */ s("span", {}),
                /* @__PURE__ */ s("span", {}),
                /* @__PURE__ */ s("span", {})
              ] }) }) }) }),
              /* @__PURE__ */ s("div", { ref: ut })
            ] }),
            cn(),
            /* @__PURE__ */ s("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ s(
              Wc,
              {
                ref: Re,
                placeholder: t.placeholder,
                placeholderTexts: t.placeholderTexts,
                disabled: z,
                chatStatus: w,
                fileUploadEnabled: ($t = t.features) == null ? void 0 : $t.fileUpload,
                restaurantName: t.restaurantName,
                restaurantLogo: t.restaurantLogo,
                hasMessages: N.length > 0,
                onSubmit: (T, L) => he(T, L),
                onFileUpload: Me,
                onStopGeneration: Je
              }
            ) }),
            N.length === 0 && !z && !M && t.suggestedPrompts && /* @__PURE__ */ s(
              $c,
              {
                prompts: t.suggestedPrompts,
                onPromptSelect: (T) => {
                  Re.current && Re.current.setText(T.description);
                }
              }
            )
          ]
        }
      )
    ] }),
    t.onError && /* @__PURE__ */ s("div", { className: "chat-wrapper__error-boundary" }),
    /* @__PURE__ */ s(
      Qc,
      {
        isOpen: Lt,
        onClose: () => Ke(!1),
        app: o,
        apiUrl: e
      }
    )
  ] }) });
}
const ku = hr(cu);
export {
  yc as AnimatedPlaceholder,
  ku as ChatWrapper,
  Qc as DevSettings,
  Yc as InlineLoader,
  xa as Loader,
  dc as PromptInput,
  gc as PromptInputButton,
  du as PromptInputModelSelect,
  mu as PromptInputModelSelectContent,
  gu as PromptInputModelSelectItem,
  fu as PromptInputModelSelectTrigger,
  Cu as PromptInputModelSelectValue,
  Cc as PromptInputSubmit,
  da as PromptInputTextarea,
  fc as PromptInputToolbar,
  mc as PromptInputTools,
  Zc as Reasoning,
  wa as ReasoningContent,
  ya as ReasoningTrigger,
  $c as SuggestedPrompts,
  _u as createThread,
  xu as fetchMessagesByConvUuid,
  wu as fetchThreadByConvUuid,
  ou as fetchThreadMessages,
  yu as fetchUserThreads
};
