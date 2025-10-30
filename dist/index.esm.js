var Ra = Object.defineProperty;
var La = (e, t, n) => t in e ? Ra(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ie = (e, t, n) => La(e, typeof t != "symbol" ? t + "" : t, n);
import { jsxs as S, jsx as o, Fragment as kn } from "react/jsx-runtime";
import zt, { forwardRef as mr, useState as q, useEffect as ct, useRef as Ct, useImperativeHandle as Ma, useCallback as ce, memo as An, useMemo as Rt } from "react";
function Oa(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Da = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Pa = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ha = {};
function Pr(e, t) {
  return (Ha.jsx ? Pa : Da).test(e);
}
const Ua = /[ \t\n\f\r]/g;
function Fa(e) {
  return typeof e == "object" ? e.type === "text" ? Hr(e.value) : !1 : Hr(e);
}
function Hr(e) {
  return e.replace(Ua, "") === "";
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
function Di(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new on(n, r, t);
}
function tr(e) {
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
let za = 0;
const $ = Mt(), Ce = Mt(), nr = Mt(), b = Mt(), se = Mt(), Bt = Mt(), qe = Mt();
function Mt() {
  return 2 ** ++za;
}
const rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: $,
  booleanish: Ce,
  commaOrSpaceSeparated: qe,
  commaSeparated: Bt,
  number: b,
  overloadedBoolean: nr,
  spaceSeparated: se
}, Symbol.toStringTag, { value: "Module" })), Un = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(rr)
);
class gr extends We {
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
    if (super(t, n), Ur(this, "space", i), typeof r == "number")
      for (; ++a < Un.length; ) {
        const l = Un[a];
        Ur(this, Un[a], (r & rr[l]) === rr[l]);
      }
  }
}
gr.prototype.defined = !0;
function Ur(e, t, n) {
  n && (e[t] = n);
}
function Wt(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const a = new gr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[tr(r)] = r, n[tr(a.attribute)] = r;
  }
  return new on(t, n, e.space);
}
const Pi = Wt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Ce,
    ariaAutoComplete: null,
    ariaBusy: Ce,
    ariaChecked: Ce,
    ariaColCount: b,
    ariaColIndex: b,
    ariaColSpan: b,
    ariaControls: se,
    ariaCurrent: null,
    ariaDescribedBy: se,
    ariaDetails: null,
    ariaDisabled: Ce,
    ariaDropEffect: se,
    ariaErrorMessage: null,
    ariaExpanded: Ce,
    ariaFlowTo: se,
    ariaGrabbed: Ce,
    ariaHasPopup: null,
    ariaHidden: Ce,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: se,
    ariaLevel: b,
    ariaLive: null,
    ariaModal: Ce,
    ariaMultiLine: Ce,
    ariaMultiSelectable: Ce,
    ariaOrientation: null,
    ariaOwns: se,
    ariaPlaceholder: null,
    ariaPosInSet: b,
    ariaPressed: Ce,
    ariaReadOnly: Ce,
    ariaRelevant: null,
    ariaRequired: Ce,
    ariaRoleDescription: se,
    ariaRowCount: b,
    ariaRowIndex: b,
    ariaRowSpan: b,
    ariaSelected: Ce,
    ariaSetSize: b,
    ariaSort: null,
    ariaValueMax: b,
    ariaValueMin: b,
    ariaValueNow: b,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function Hi(e, t) {
  return t in e ? e[t] : t;
}
function Ui(e, t) {
  return Hi(e, t.toLowerCase());
}
const Ba = Wt({
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
    acceptCharset: se,
    accessKey: se,
    action: null,
    allow: null,
    allowFullScreen: $,
    allowPaymentRequest: $,
    allowUserMedia: $,
    alt: null,
    as: null,
    async: $,
    autoCapitalize: null,
    autoComplete: se,
    autoFocus: $,
    autoPlay: $,
    blocking: se,
    capture: null,
    charSet: null,
    checked: $,
    cite: null,
    className: se,
    cols: b,
    colSpan: null,
    content: null,
    contentEditable: Ce,
    controls: $,
    controlsList: se,
    coords: b | Bt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: $,
    defer: $,
    dir: null,
    dirName: null,
    disabled: $,
    download: nr,
    draggable: Ce,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: $,
    formTarget: null,
    headers: se,
    height: b,
    hidden: nr,
    high: b,
    href: null,
    hrefLang: null,
    htmlFor: se,
    httpEquiv: se,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: $,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: $,
    itemId: null,
    itemProp: se,
    itemRef: se,
    itemScope: $,
    itemType: se,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: $,
    low: b,
    manifest: null,
    max: null,
    maxLength: b,
    media: null,
    method: null,
    min: null,
    minLength: b,
    multiple: $,
    muted: $,
    name: null,
    nonce: null,
    noModule: $,
    noValidate: $,
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
    open: $,
    optimum: b,
    pattern: null,
    ping: se,
    placeholder: null,
    playsInline: $,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: $,
    referrerPolicy: null,
    rel: se,
    required: $,
    reversed: $,
    rows: b,
    rowSpan: b,
    sandbox: se,
    scope: null,
    scoped: $,
    seamless: $,
    selected: $,
    shadowRootClonable: $,
    shadowRootDelegatesFocus: $,
    shadowRootMode: null,
    shape: null,
    size: b,
    sizes: null,
    slot: null,
    span: b,
    spellCheck: Ce,
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
    typeMustMatch: $,
    useMap: null,
    value: Ce,
    width: b,
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
    compact: $,
    // Lists. Use CSS to reduce space between items instead
    declare: $,
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
    noResize: $,
    // `<frame>`
    noHref: $,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: $,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: $,
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
    scrolling: Ce,
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
    disablePictureInPicture: $,
    disableRemotePlayback: $,
    prefix: null,
    property: null,
    results: b,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Ui
}), Va = Wt({
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
    descent: b,
    diffuseConstant: b,
    direction: null,
    display: null,
    dur: null,
    divisor: b,
    dominantBaseline: null,
    download: $,
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
    g1: Bt,
    g2: Bt,
    glyphName: Bt,
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
    ping: se,
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
    strokeDashArray: qe,
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
    systemLanguage: qe,
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
    typeOf: qe,
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
  transform: Hi
}), Fi = Wt({
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
}), zi = Wt({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Ui
}), Bi = Wt({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), Ga = {
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
}, ja = /[A-Z]/g, Fr = /-[a-z]/g, Wa = /^data[-\w.:]+$/i;
function $a(e, t) {
  const n = tr(t);
  let r = t, i = We;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Wa.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(Fr, qa);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!Fr.test(a)) {
        let l = a.replace(ja, Za);
        l.charAt(0) !== "-" && (l = "-" + l), t = "data" + l;
      }
    }
    i = gr;
  }
  return new i(r, t);
}
function Za(e) {
  return "-" + e.toLowerCase();
}
function qa(e) {
  return e.charAt(1).toUpperCase();
}
const Xa = Di([Pi, Ba, Fi, zi, Bi], "html"), Cr = Di([Pi, Va, Fi, zi, Bi], "svg");
function Ya(e) {
  return e.join(" ").trim();
}
var Sn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Vi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var yr = {}, zr = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Ka = /\n/g, Qa = /^\s*/, Ja = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, el = /^:\s*/, tl = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, nl = /^[;\s]*/, rl = /^\s+|\s+$/g, il = `
`, Br = "/", Vr = "*", Lt = "", al = "comment", ll = "declaration", sl = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(x) {
    var y = x.match(Ka);
    y && (n += y.length);
    var A = x.lastIndexOf(il);
    r = ~A ? x.length - A : r + x.length;
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
  function s(x) {
    var y = new Error(
      t.source + ":" + n + ":" + r + ": " + x
    );
    if (y.reason = x, y.filename = t.source, y.line = n, y.column = r, y.source = e, !t.silent) throw y;
  }
  function c(x) {
    var y = x.exec(e);
    if (y) {
      var A = y[0];
      return i(A), e = e.slice(A.length), y;
    }
  }
  function h() {
    c(Qa);
  }
  function u(x) {
    var y;
    for (x = x || []; y = d(); )
      y !== !1 && x.push(y);
    return x;
  }
  function d() {
    var x = a();
    if (!(Br != e.charAt(0) || Vr != e.charAt(1))) {
      for (var y = 2; Lt != e.charAt(y) && (Vr != e.charAt(y) || Br != e.charAt(y + 1)); )
        ++y;
      if (y += 2, Lt === e.charAt(y - 1))
        return s("End of comment missing");
      var A = e.slice(2, y - 2);
      return r += 2, i(A), e = e.slice(y), r += 2, x({
        type: al,
        comment: A
      });
    }
  }
  function C() {
    var x = a(), y = c(Ja);
    if (y) {
      if (d(), !c(el)) return s("property missing ':'");
      var A = c(tl), E = x({
        type: ll,
        property: Gr(y[0].replace(zr, Lt)),
        value: A ? Gr(A[0].replace(zr, Lt)) : Lt
      });
      return c(nl), E;
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
function Gr(e) {
  return e ? e.replace(rl, Lt) : Lt;
}
var ol = Sn && Sn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(yr, "__esModule", { value: !0 });
yr.default = ul;
const cl = ol(sl);
function ul(e, t) {
  let n = null;
  if (!e || typeof e != "string")
    return n;
  const r = (0, cl.default)(e), i = typeof t == "function";
  return r.forEach((a) => {
    if (a.type !== "declaration")
      return;
    const { property: l, value: s } = a;
    i ? t(l, s, a) : s && (n = n || {}, n[l] = s);
  }), n;
}
var In = {};
Object.defineProperty(In, "__esModule", { value: !0 });
In.camelCase = void 0;
var hl = /^--[a-zA-Z0-9_-]+$/, pl = /-([a-z])/g, dl = /^[^-]+$/, fl = /^-(webkit|moz|ms|o|khtml)-/, ml = /^-(ms)-/, gl = function(e) {
  return !e || dl.test(e) || hl.test(e);
}, Cl = function(e, t) {
  return t.toUpperCase();
}, jr = function(e, t) {
  return "".concat(t, "-");
}, yl = function(e, t) {
  return t === void 0 && (t = {}), gl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(ml, jr) : e = e.replace(fl, jr), e.replace(pl, Cl));
};
In.camelCase = yl;
var wl = Sn && Sn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, _l = wl(yr), xl = In;
function ir(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, _l.default)(e, function(r, i) {
    r && i && (n[(0, xl.camelCase)(r, t)] = i);
  }), n;
}
ir.default = ir;
var El = ir;
const kl = /* @__PURE__ */ Vi(El), Gi = ji("end"), wr = ji("start");
function ji(e) {
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
function Sl(e) {
  const t = wr(e), n = Gi(e);
  if (t && n)
    return { start: t, end: n };
}
function rn(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Wr(e.position) : "start" in e || "end" in e ? Wr(e) : "line" in e || "column" in e ? ar(e) : "";
}
function ar(e) {
  return $r(e && e.line) + ":" + $r(e && e.column);
}
function Wr(e) {
  return ar(e && e.start) + "-" + ar(e && e.end);
}
function $r(e) {
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
    const s = a.place && "start" in a.place ? a.place.start : a.place;
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = s ? s.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = s ? s.line : void 0, this.name = rn(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = l && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
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
const _r = {}.hasOwnProperty, Tl = /* @__PURE__ */ new Map(), bl = /[A-Z]/g, vl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Al = /* @__PURE__ */ new Set(["td", "th"]), Wi = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Il(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Hl(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Pl(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? Cr : Xa,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = $i(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function $i(e, t, n) {
  if (t.type === "element")
    return Nl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return Rl(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return Ml(e, t, n);
  if (t.type === "mdxjsEsm")
    return Ll(e, t);
  if (t.type === "root")
    return Ol(e, t, n);
  if (t.type === "text")
    return Dl(e, t);
}
function Nl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Cr, e.schema = i), e.ancestors.push(t);
  const a = qi(e, t.tagName, !1), l = Ul(e, t);
  let s = Er(e, t);
  return vl.has(t.tagName) && (s = s.filter(function(c) {
    return typeof c == "string" ? !Fa(c) : !0;
  })), Zi(e, l, a, t), xr(l, s), e.ancestors.pop(), e.schema = r, e.create(t, a, l, n);
}
function Rl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  sn(e, t.position);
}
function Ll(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  sn(e, t.position);
}
function Ml(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = Cr, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : qi(e, t.name, !0), l = Fl(e, t), s = Er(e, t);
  return Zi(e, l, a, t), xr(l, s), e.ancestors.pop(), e.schema = r, e.create(t, a, l, n);
}
function Ol(e, t, n) {
  const r = {};
  return xr(r, Er(e, t)), e.create(t, e.Fragment, r, n);
}
function Dl(e, t) {
  return t.value;
}
function Zi(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function xr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function Pl(e, t, n) {
  return r;
  function r(i, a, l, s) {
    const h = Array.isArray(l.children) ? n : t;
    return s ? h(a, l, s) : h(a, l);
  }
}
function Hl(e, t) {
  return n;
  function n(r, i, a, l) {
    const s = Array.isArray(a.children), c = wr(r);
    return t(
      i,
      a,
      l,
      s,
      {
        columnNumber: c ? c.column - 1 : void 0,
        fileName: e,
        lineNumber: c ? c.line : void 0
      },
      void 0
    );
  }
}
function Ul(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && _r.call(t.properties, i)) {
      const a = zl(e, i, t.properties[i]);
      if (a) {
        const [l, s] = a;
        e.tableCellAlignToStyle && l === "align" && typeof s == "string" && Al.has(t.tagName) ? r = s : n[l] = s;
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
function Fl(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const a = r.data.estree.body[0];
        a.type;
        const l = a.expression;
        l.type;
        const s = l.properties[0];
        s.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(s.argument)
        );
      } else
        sn(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const s = r.value.data.estree.body[0];
          s.type, a = e.evaluater.evaluateExpression(s.expression);
        } else
          sn(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function Er(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Tl;
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
    const s = $i(e, a, l);
    s !== void 0 && n.push(s);
  }
  return n;
}
function zl(e, t, n) {
  const r = $a(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Oa(n) : Ya(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Bl(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Vl(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Ga[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Bl(e, t) {
  try {
    return kl(t, { reactCompat: !0 });
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
    throw i.file = e.filePath || void 0, i.url = Wi + "#cannot-parse-style-attribute", i;
  }
}
function qi(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let a = -1, l;
    for (; ++a < i.length; ) {
      const s = Pr(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
      l = l ? {
        type: "MemberExpression",
        object: l,
        property: s,
        computed: !!(a && s.type === "Literal"),
        optional: !1
      } : s;
    }
    r = l;
  } else
    r = Pr(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return _r.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  sn(e);
}
function sn(e, t) {
  const n = new Me(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Wi + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Vl(e) {
  const t = {};
  let n;
  for (n in e)
    _r.call(e, n) && (t[Gl(n)] = e[n]);
  return t;
}
function Gl(e) {
  let t = e.replace(bl, jl);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function jl(e) {
  return "-" + e.toLowerCase();
}
const Fn = {
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
}, Wl = {};
function $l(e, t) {
  const n = Wl, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Xi(e, r, i);
}
function Xi(e, t, n) {
  if (Zl(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Zr(e.children, t, n);
  }
  return Array.isArray(e) ? Zr(e, t, n) : "";
}
function Zr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Xi(e[i], t, n);
  return r.join("");
}
function Zl(e) {
  return !!(e && typeof e == "object");
}
const qr = document.createElement("i");
function kr(e) {
  const t = "&" + e + ";";
  qr.innerHTML = t;
  const n = qr.textContent;
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
const Xr = {}.hasOwnProperty;
function ql(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    Xl(t, e[n]);
  return t;
}
function Xl(e, t) {
  let n;
  for (n in t) {
    const i = (Xr.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let l;
    if (a)
      for (l in a) {
        Xr.call(i, l) || (i[l] = []);
        const s = a[l];
        Yl(
          // @ts-expect-error Looks like a list.
          i[l],
          Array.isArray(s) ? s : s ? [s] : []
        );
      }
  }
}
function Yl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  ht(e, 0, 0, r);
}
function Yi(e, t) {
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
function Vt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const ut = At(/[A-Za-z]/), Xe = At(/[\dA-Za-z]/), Kl = At(/[#-'*+\--9=?A-Z^-~]/);
function lr(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const sr = At(/\d/), Ql = At(/[\dA-Fa-f]/), Jl = At(/[!-/:-@[-`{-~]/);
function B(e) {
  return e !== null && e < -2;
}
function je(e) {
  return e !== null && (e < 0 || e === 32);
}
function ne(e) {
  return e === -2 || e === -1 || e === 32;
}
const es = At(new RegExp("\\p{P}|\\p{S}", "u")), ts = At(/\s/);
function At(e) {
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
      const s = e.charCodeAt(n + 1);
      a < 56320 && s > 56319 && s < 57344 ? (l = String.fromCharCode(a, s), i = 1) : l = "�";
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
    return ne(c) ? (e.enter(n), s(c)) : t(c);
  }
  function s(c) {
    return ne(c) && a++ < i ? (e.consume(c), s) : (e.exit(n), t(c));
  }
}
const ns = {
  tokenize: rs
};
function rs(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(s) {
    if (s === null) {
      e.consume(s);
      return;
    }
    return e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), oe(e, t, "linePrefix");
  }
  function i(s) {
    return e.enter("paragraph"), a(s);
  }
  function a(s) {
    const c = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = c), n = c, l(s);
  }
  function l(s) {
    if (s === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(s);
      return;
    }
    return B(s) ? (e.consume(s), e.exit("chunkText"), a) : (e.consume(s), l);
  }
}
const is = {
  tokenize: as
}, Yr = {
  tokenize: ls
};
function as(e) {
  const t = this, n = [];
  let r = 0, i, a, l;
  return s;
  function s(N) {
    if (r < n.length) {
      const P = n[r];
      return t.containerState = P[1], e.attempt(P[0].continuation, c, h)(N);
    }
    return h(N);
  }
  function c(N) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && U();
      const P = t.events.length;
      let V = P, w;
      for (; V--; )
        if (t.events[V][0] === "exit" && t.events[V][1].type === "chunkFlow") {
          w = t.events[V][1].end;
          break;
        }
      E(r);
      let z = P;
      for (; z < t.events.length; )
        t.events[z][1].end = {
          ...w
        }, z++;
      return ht(t.events, V + 1, 0, t.events.slice(P)), t.events.length = z, h(N);
    }
    return s(N);
  }
  function h(N) {
    if (r === n.length) {
      if (!i)
        return C(N);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return x(N);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(Yr, u, d)(N);
  }
  function u(N) {
    return i && U(), E(r), C(N);
  }
  function d(N) {
    return t.parser.lazy[t.now().line] = r !== n.length, l = t.now().offset, x(N);
  }
  function C(N) {
    return t.containerState = {}, e.attempt(Yr, p, x)(N);
  }
  function p(N) {
    return r++, n.push([t.currentConstruct, t.containerState]), C(N);
  }
  function x(N) {
    if (N === null) {
      i && U(), E(0), e.consume(N);
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
      A(e.exit("chunkFlow"), !0), E(0), e.consume(N);
      return;
    }
    return B(N) ? (e.consume(N), A(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, s) : (e.consume(N), y);
  }
  function A(N, P) {
    const V = t.sliceStream(N);
    if (P && V.push(null), N.previous = a, a && (a.next = N), a = N, i.defineSkip(N.start), i.write(V), t.parser.lazy[N.start.line]) {
      let w = i.events.length;
      for (; w--; )
        if (
          // The token starts before the line ending…
          i.events[w][1].start.offset < l && // …and either is not ended yet…
          (!i.events[w][1].end || // …or ends after it.
          i.events[w][1].end.offset > l)
        )
          return;
      const z = t.events.length;
      let j = z, Z, O;
      for (; j--; )
        if (t.events[j][0] === "exit" && t.events[j][1].type === "chunkFlow") {
          if (Z) {
            O = t.events[j][1].end;
            break;
          }
          Z = !0;
        }
      for (E(r), w = z; w < t.events.length; )
        t.events[w][1].end = {
          ...O
        }, w++;
      ht(t.events, j + 1, 0, t.events.slice(z)), t.events.length = w;
    }
  }
  function E(N) {
    let P = n.length;
    for (; P-- > N; ) {
      const V = n[P];
      t.containerState = V[1], V[0].exit.call(t, e);
    }
    n.length = N;
  }
  function U() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function ls(e, t, n) {
  return oe(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Kr(e) {
  if (e === null || je(e) || ts(e))
    return 1;
  if (es(e))
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
  resolveAll: ss,
  tokenize: os
};
function ss(e, t) {
  let n = -1, r, i, a, l, s, c, h, u;
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
          Qr(d, -c), Qr(C, c), l = {
            type: c > 1 ? "strongSequence" : "emphasisSequence",
            start: d,
            end: {
              ...e[r][1].end
            }
          }, s = {
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
              ...s.end
            }
          }, e[r][1].end = {
            ...l.start
          }, e[n][1].start = {
            ...s.end
          }, h = [], e[r][1].end.offset - e[r][1].start.offset && (h = tt(h, [["enter", e[r][1], t], ["exit", e[r][1], t]])), h = tt(h, [["enter", i, t], ["enter", l, t], ["exit", l, t], ["enter", a, t]]), h = tt(h, Sr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), h = tt(h, [["exit", a, t], ["enter", s, t], ["exit", s, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, h = tt(h, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : u = 0, ht(e, r - 1, n - r + 3, h), n = r + h.length - u - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function os(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Kr(r);
  let a;
  return l;
  function l(c) {
    return a = c, e.enter("attentionSequence"), s(c);
  }
  function s(c) {
    if (c === a)
      return e.consume(c), s;
    const h = e.exit("attentionSequence"), u = Kr(c), d = !u || u === 2 && i || n.includes(c), C = !i || i === 2 && u || n.includes(r);
    return h._open = !!(a === 42 ? d : d && (i || !C)), h._close = !!(a === 42 ? C : C && (u || !d)), t(c);
  }
}
function Qr(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const cs = {
  name: "autolink",
  tokenize: us
};
function us(e, t, n) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(p) {
    return ut(p) ? (e.consume(p), l) : p === 64 ? n(p) : h(p);
  }
  function l(p) {
    return p === 43 || p === 45 || p === 46 || Xe(p) ? (r = 1, s(p)) : h(p);
  }
  function s(p) {
    return p === 58 ? (e.consume(p), r = 0, c) : (p === 43 || p === 45 || p === 46 || Xe(p)) && r++ < 32 ? (e.consume(p), s) : (r = 0, h(p));
  }
  function c(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : p === null || p === 32 || p === 60 || lr(p) ? n(p) : (e.consume(p), c);
  }
  function h(p) {
    return p === 64 ? (e.consume(p), u) : Kl(p) ? (e.consume(p), h) : n(p);
  }
  function u(p) {
    return Xe(p) ? d(p) : n(p);
  }
  function d(p) {
    return p === 46 ? (e.consume(p), r = 0, u) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : C(p);
  }
  function C(p) {
    if ((p === 45 || Xe(p)) && r++ < 63) {
      const x = p === 45 ? C : d;
      return e.consume(p), x;
    }
    return n(p);
  }
}
const Nn = {
  partial: !0,
  tokenize: hs
};
function hs(e, t, n) {
  return r;
  function r(a) {
    return ne(a) ? oe(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || B(a) ? t(a) : n(a);
  }
}
const Ki = {
  continuation: {
    tokenize: ds
  },
  exit: fs,
  name: "blockQuote",
  tokenize: ps
};
function ps(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    if (l === 62) {
      const s = r.containerState;
      return s.open || (e.enter("blockQuote", {
        _container: !0
      }), s.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(l), e.exit("blockQuoteMarker"), a;
    }
    return n(l);
  }
  function a(l) {
    return ne(l) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(l), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(l));
  }
}
function ds(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return ne(l) ? oe(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : a(l);
  }
  function a(l) {
    return e.attempt(Ki, t, n)(l);
  }
}
function fs(e) {
  e.exit("blockQuote");
}
const Qi = {
  name: "characterEscape",
  tokenize: ms
};
function ms(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return Jl(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const Ji = {
  name: "characterReference",
  tokenize: gs
};
function gs(e, t, n) {
  const r = this;
  let i = 0, a, l;
  return s;
  function s(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), c;
  }
  function c(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), h) : (e.enter("characterReferenceValue"), a = 31, l = Xe, u(d));
  }
  function h(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, l = Ql, u) : (e.enter("characterReferenceValue"), a = 7, l = sr, u(d));
  }
  function u(d) {
    if (d === 59 && i) {
      const C = e.exit("characterReferenceValue");
      return l === Xe && !kr(r.sliceSerialize(C)) ? n(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return l(d) && i++ < a ? (e.consume(d), u) : n(d);
  }
}
const Jr = {
  partial: !0,
  tokenize: ys
}, ei = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Cs
};
function Cs(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: V
  };
  let a = 0, l = 0, s;
  return c;
  function c(w) {
    return h(w);
  }
  function h(w) {
    const z = r.events[r.events.length - 1];
    return a = z && z[1].type === "linePrefix" ? z[2].sliceSerialize(z[1], !0).length : 0, s = w, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(w);
  }
  function u(w) {
    return w === s ? (l++, e.consume(w), u) : l < 3 ? n(w) : (e.exit("codeFencedFenceSequence"), ne(w) ? oe(e, d, "whitespace")(w) : d(w));
  }
  function d(w) {
    return w === null || B(w) ? (e.exit("codeFencedFence"), r.interrupt ? t(w) : e.check(Jr, y, P)(w)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), C(w));
  }
  function C(w) {
    return w === null || B(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(w)) : ne(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), oe(e, p, "whitespace")(w)) : w === 96 && w === s ? n(w) : (e.consume(w), C);
  }
  function p(w) {
    return w === null || B(w) ? d(w) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), x(w));
  }
  function x(w) {
    return w === null || B(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(w)) : w === 96 && w === s ? n(w) : (e.consume(w), x);
  }
  function y(w) {
    return e.attempt(i, P, A)(w);
  }
  function A(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), E;
  }
  function E(w) {
    return a > 0 && ne(w) ? oe(e, U, "linePrefix", a + 1)(w) : U(w);
  }
  function U(w) {
    return w === null || B(w) ? e.check(Jr, y, P)(w) : (e.enter("codeFlowValue"), N(w));
  }
  function N(w) {
    return w === null || B(w) ? (e.exit("codeFlowValue"), U(w)) : (e.consume(w), N);
  }
  function P(w) {
    return e.exit("codeFenced"), t(w);
  }
  function V(w, z, j) {
    let Z = 0;
    return O;
    function O(X) {
      return w.enter("lineEnding"), w.consume(X), w.exit("lineEnding"), v;
    }
    function v(X) {
      return w.enter("codeFencedFence"), ne(X) ? oe(w, M, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(X) : M(X);
    }
    function M(X) {
      return X === s ? (w.enter("codeFencedFenceSequence"), Y(X)) : j(X);
    }
    function Y(X) {
      return X === s ? (Z++, w.consume(X), Y) : Z >= l ? (w.exit("codeFencedFenceSequence"), ne(X) ? oe(w, ae, "whitespace")(X) : ae(X)) : j(X);
    }
    function ae(X) {
      return X === null || B(X) ? (w.exit("codeFencedFence"), z(X)) : j(X);
    }
  }
}
function ys(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return l === null ? n(l) : (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), a);
  }
  function a(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
const zn = {
  name: "codeIndented",
  tokenize: _s
}, ws = {
  partial: !0,
  tokenize: xs
};
function _s(e, t, n) {
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
    return h === null ? c(h) : B(h) ? e.attempt(ws, l, c)(h) : (e.enter("codeFlowValue"), s(h));
  }
  function s(h) {
    return h === null || B(h) ? (e.exit("codeFlowValue"), l(h)) : (e.consume(h), s);
  }
  function c(h) {
    return e.exit("codeIndented"), t(h);
  }
}
function xs(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line] ? n(l) : B(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), i) : oe(e, a, "linePrefix", 5)(l);
  }
  function a(l) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? t(l) : B(l) ? i(l) : n(l);
  }
}
const Es = {
  name: "codeText",
  previous: Ss,
  resolve: ks,
  tokenize: Ts
};
function ks(e) {
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
function Ss(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Ts(e, t, n) {
  let r = 0, i, a;
  return l;
  function l(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), s(d);
  }
  function s(d) {
    return d === 96 ? (e.consume(d), r++, s) : (e.exit("codeTextSequence"), c(d));
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
class bs {
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
function ea(e) {
  const t = {};
  let n = -1, r, i, a, l, s, c, h;
  const u = new bs(e);
  for (; ++n < u.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === "lineEndingBlank" && (a += 2), a < c.length && c[a][1].type === "content"))
      for (; ++a < c.length && c[a][1].type !== "content"; )
        c[a][1].type === "chunkText" && (c[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, vs(u, n)), n = t[n], h = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (l = u.get(a), l[1].type === "lineEnding" || l[1].type === "lineEndingBlank")
          l[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), l[1].type = "lineEnding", i = a);
        else if (!(l[1].type === "linePrefix" || l[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...u.get(i)[1].start
      }, s = u.slice(i, n), s.unshift(r), u.splice(i, n - i + 1, s));
    }
  }
  return ht(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !h;
}
function vs(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let l = n._tokenizer;
  l || (l = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (l._contentTypeTextTrailing = !0));
  const s = l.events, c = [], h = {};
  let u, d, C = -1, p = n, x = 0, y = 0;
  const A = [y];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && l.defineSkip(p.start), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(u), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
  }
  for (p = n; ++C < s.length; )
    // Find a void token that includes a break.
    s[C][0] === "exit" && s[C - 1][0] === "enter" && s[C][1].type === s[C - 1][1].type && s[C][1].start.line !== s[C][1].end.line && (y = C + 1, A.push(y), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (l.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : A.pop(), C = A.length; C--; ) {
    const E = s.slice(A[C], A[C + 1]), U = a.pop();
    c.push([U, U + E.length - 1]), e.splice(U, 2, E);
  }
  for (c.reverse(), C = -1; ++C < c.length; )
    h[x + c[C][0]] = x + c[C][1], x += c[C][1] - c[C][0] - 1;
  return h;
}
const As = {
  resolve: Ns,
  tokenize: Rs
}, Is = {
  partial: !0,
  tokenize: Ls
};
function Ns(e) {
  return ea(e), e;
}
function Rs(e, t) {
  let n;
  return r;
  function r(s) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(s);
  }
  function i(s) {
    return s === null ? a(s) : B(s) ? e.check(Is, l, a)(s) : (e.consume(s), i);
  }
  function a(s) {
    return e.exit("chunkContent"), e.exit("content"), t(s);
  }
  function l(s) {
    return e.consume(s), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, i;
  }
}
function Ls(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), oe(e, a, "linePrefix");
  }
  function a(l) {
    if (l === null || B(l))
      return n(l);
    const s = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? t(l) : e.interrupt(r.parser.constructs.flow, n, t)(l);
  }
}
function ta(e, t, n, r, i, a, l, s, c) {
  const h = c || Number.POSITIVE_INFINITY;
  let u = 0;
  return d;
  function d(E) {
    return E === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(E), e.exit(a), C) : E === null || E === 32 || E === 41 || lr(E) ? n(E) : (e.enter(r), e.enter(l), e.enter(s), e.enter("chunkString", {
      contentType: "string"
    }), y(E));
  }
  function C(E) {
    return E === 62 ? (e.enter(a), e.consume(E), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter("chunkString", {
      contentType: "string"
    }), p(E));
  }
  function p(E) {
    return E === 62 ? (e.exit("chunkString"), e.exit(s), C(E)) : E === null || E === 60 || B(E) ? n(E) : (e.consume(E), E === 92 ? x : p);
  }
  function x(E) {
    return E === 60 || E === 62 || E === 92 ? (e.consume(E), p) : p(E);
  }
  function y(E) {
    return !u && (E === null || E === 41 || je(E)) ? (e.exit("chunkString"), e.exit(s), e.exit(l), e.exit(r), t(E)) : u < h && E === 40 ? (e.consume(E), u++, y) : E === 41 ? (e.consume(E), u--, y) : E === null || E === 32 || E === 40 || lr(E) ? n(E) : (e.consume(E), E === 92 ? A : y);
  }
  function A(E) {
    return E === 40 || E === 41 || E === 92 ? (e.consume(E), y) : y(E);
  }
}
function na(e, t, n, r, i, a) {
  const l = this;
  let s = 0, c;
  return h;
  function h(p) {
    return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(a), u;
  }
  function u(p) {
    return s > 999 || p === null || p === 91 || p === 93 && !c || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !s && "_hiddenFootnoteSupport" in l.parser.constructs ? n(p) : p === 93 ? (e.exit(a), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : B(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), d(p));
  }
  function d(p) {
    return p === null || p === 91 || p === 93 || B(p) || s++ > 999 ? (e.exit("chunkString"), u(p)) : (e.consume(p), c || (c = !ne(p)), p === 92 ? C : d);
  }
  function C(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), s++, d) : d(p);
  }
}
function ra(e, t, n, r, i, a) {
  let l;
  return s;
  function s(C) {
    return C === 34 || C === 39 || C === 40 ? (e.enter(r), e.enter(i), e.consume(C), e.exit(i), l = C === 40 ? 41 : C, c) : n(C);
  }
  function c(C) {
    return C === l ? (e.enter(i), e.consume(C), e.exit(i), e.exit(r), t) : (e.enter(a), h(C));
  }
  function h(C) {
    return C === l ? (e.exit(a), c(l)) : C === null ? n(C) : B(C) ? (e.enter("lineEnding"), e.consume(C), e.exit("lineEnding"), oe(e, h, "linePrefix")) : (e.enter("chunkString", {
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
function an(e, t) {
  let n;
  return r;
  function r(i) {
    return B(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : ne(i) ? oe(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const Ms = {
  name: "definition",
  tokenize: Ds
}, Os = {
  partial: !0,
  tokenize: Ps
};
function Ds(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(p) {
    return e.enter("definition"), l(p);
  }
  function l(p) {
    return na.call(
      r,
      e,
      s,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(p);
  }
  function s(p) {
    return i = Vt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), c) : n(p);
  }
  function c(p) {
    return je(p) ? an(e, h)(p) : h(p);
  }
  function h(p) {
    return ta(
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
    return e.attempt(Os, d, d)(p);
  }
  function d(p) {
    return ne(p) ? oe(e, C, "whitespace")(p) : C(p);
  }
  function C(p) {
    return p === null || B(p) ? (e.exit("definition"), r.parser.defined.push(i), t(p)) : n(p);
  }
}
function Ps(e, t, n) {
  return r;
  function r(s) {
    return je(s) ? an(e, i)(s) : n(s);
  }
  function i(s) {
    return ra(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(s);
  }
  function a(s) {
    return ne(s) ? oe(e, l, "whitespace")(s) : l(s);
  }
  function l(s) {
    return s === null || B(s) ? t(s) : n(s);
  }
}
const Hs = {
  name: "hardBreakEscape",
  tokenize: Us
};
function Us(e, t, n) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), i;
  }
  function i(a) {
    return B(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
  }
}
const Fs = {
  name: "headingAtx",
  resolve: zs,
  tokenize: Bs
};
function zs(e, t) {
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
function Bs(e, t, n) {
  let r = 0;
  return i;
  function i(u) {
    return e.enter("atxHeading"), a(u);
  }
  function a(u) {
    return e.enter("atxHeadingSequence"), l(u);
  }
  function l(u) {
    return u === 35 && r++ < 6 ? (e.consume(u), l) : u === null || je(u) ? (e.exit("atxHeadingSequence"), s(u)) : n(u);
  }
  function s(u) {
    return u === 35 ? (e.enter("atxHeadingSequence"), c(u)) : u === null || B(u) ? (e.exit("atxHeading"), t(u)) : ne(u) ? oe(e, s, "whitespace")(u) : (e.enter("atxHeadingText"), h(u));
  }
  function c(u) {
    return u === 35 ? (e.consume(u), c) : (e.exit("atxHeadingSequence"), s(u));
  }
  function h(u) {
    return u === null || u === 35 || je(u) ? (e.exit("atxHeadingText"), s(u)) : (e.consume(u), h);
  }
}
const Vs = [
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
], ti = ["pre", "script", "style", "textarea"], Gs = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: $s,
  tokenize: Zs
}, js = {
  partial: !0,
  tokenize: Xs
}, Ws = {
  partial: !0,
  tokenize: qs
};
function $s(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Zs(e, t, n) {
  const r = this;
  let i, a, l, s, c;
  return h;
  function h(f) {
    return u(f);
  }
  function u(f) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(f), d;
  }
  function d(f) {
    return f === 33 ? (e.consume(f), C) : f === 47 ? (e.consume(f), a = !0, y) : f === 63 ? (e.consume(f), i = 3, r.interrupt ? t : g) : ut(f) ? (e.consume(f), l = String.fromCharCode(f), A) : n(f);
  }
  function C(f) {
    return f === 45 ? (e.consume(f), i = 2, p) : f === 91 ? (e.consume(f), i = 5, s = 0, x) : ut(f) ? (e.consume(f), i = 4, r.interrupt ? t : g) : n(f);
  }
  function p(f) {
    return f === 45 ? (e.consume(f), r.interrupt ? t : g) : n(f);
  }
  function x(f) {
    const de = "CDATA[";
    return f === de.charCodeAt(s++) ? (e.consume(f), s === de.length ? r.interrupt ? t : M : x) : n(f);
  }
  function y(f) {
    return ut(f) ? (e.consume(f), l = String.fromCharCode(f), A) : n(f);
  }
  function A(f) {
    if (f === null || f === 47 || f === 62 || je(f)) {
      const de = f === 47, ee = l.toLowerCase();
      return !de && !a && ti.includes(ee) ? (i = 1, r.interrupt ? t(f) : M(f)) : Vs.includes(l.toLowerCase()) ? (i = 6, de ? (e.consume(f), E) : r.interrupt ? t(f) : M(f)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(f) : a ? U(f) : N(f));
    }
    return f === 45 || Xe(f) ? (e.consume(f), l += String.fromCharCode(f), A) : n(f);
  }
  function E(f) {
    return f === 62 ? (e.consume(f), r.interrupt ? t : M) : n(f);
  }
  function U(f) {
    return ne(f) ? (e.consume(f), U) : O(f);
  }
  function N(f) {
    return f === 47 ? (e.consume(f), O) : f === 58 || f === 95 || ut(f) ? (e.consume(f), P) : ne(f) ? (e.consume(f), N) : O(f);
  }
  function P(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || Xe(f) ? (e.consume(f), P) : V(f);
  }
  function V(f) {
    return f === 61 ? (e.consume(f), w) : ne(f) ? (e.consume(f), V) : N(f);
  }
  function w(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), c = f, z) : ne(f) ? (e.consume(f), w) : j(f);
  }
  function z(f) {
    return f === c ? (e.consume(f), c = null, Z) : f === null || B(f) ? n(f) : (e.consume(f), z);
  }
  function j(f) {
    return f === null || f === 34 || f === 39 || f === 47 || f === 60 || f === 61 || f === 62 || f === 96 || je(f) ? V(f) : (e.consume(f), j);
  }
  function Z(f) {
    return f === 47 || f === 62 || ne(f) ? N(f) : n(f);
  }
  function O(f) {
    return f === 62 ? (e.consume(f), v) : n(f);
  }
  function v(f) {
    return f === null || B(f) ? M(f) : ne(f) ? (e.consume(f), v) : n(f);
  }
  function M(f) {
    return f === 45 && i === 2 ? (e.consume(f), ye) : f === 60 && i === 1 ? (e.consume(f), pe) : f === 62 && i === 4 ? (e.consume(f), Q) : f === 63 && i === 3 ? (e.consume(f), g) : f === 93 && i === 5 ? (e.consume(f), $e) : B(f) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(js, Ie, Y)(f)) : f === null || B(f) ? (e.exit("htmlFlowData"), Y(f)) : (e.consume(f), M);
  }
  function Y(f) {
    return e.check(Ws, ae, Ie)(f);
  }
  function ae(f) {
    return e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), X;
  }
  function X(f) {
    return f === null || B(f) ? Y(f) : (e.enter("htmlFlowData"), M(f));
  }
  function ye(f) {
    return f === 45 ? (e.consume(f), g) : M(f);
  }
  function pe(f) {
    return f === 47 ? (e.consume(f), l = "", Te) : M(f);
  }
  function Te(f) {
    if (f === 62) {
      const de = l.toLowerCase();
      return ti.includes(de) ? (e.consume(f), Q) : M(f);
    }
    return ut(f) && l.length < 8 ? (e.consume(f), l += String.fromCharCode(f), Te) : M(f);
  }
  function $e(f) {
    return f === 93 ? (e.consume(f), g) : M(f);
  }
  function g(f) {
    return f === 62 ? (e.consume(f), Q) : f === 45 && i === 2 ? (e.consume(f), g) : M(f);
  }
  function Q(f) {
    return f === null || B(f) ? (e.exit("htmlFlowData"), Ie(f)) : (e.consume(f), Q);
  }
  function Ie(f) {
    return e.exit("htmlFlow"), t(f);
  }
}
function qs(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return B(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), a) : n(l);
  }
  function a(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
function Xs(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(Nn, t, n);
  }
}
const Ys = {
  name: "htmlText",
  tokenize: Ks
};
function Ks(e, t, n) {
  const r = this;
  let i, a, l;
  return s;
  function s(g) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), c;
  }
  function c(g) {
    return g === 33 ? (e.consume(g), h) : g === 47 ? (e.consume(g), V) : g === 63 ? (e.consume(g), N) : ut(g) ? (e.consume(g), j) : n(g);
  }
  function h(g) {
    return g === 45 ? (e.consume(g), u) : g === 91 ? (e.consume(g), a = 0, x) : ut(g) ? (e.consume(g), U) : n(g);
  }
  function u(g) {
    return g === 45 ? (e.consume(g), p) : n(g);
  }
  function d(g) {
    return g === null ? n(g) : g === 45 ? (e.consume(g), C) : B(g) ? (l = d, pe(g)) : (e.consume(g), d);
  }
  function C(g) {
    return g === 45 ? (e.consume(g), p) : d(g);
  }
  function p(g) {
    return g === 62 ? ye(g) : g === 45 ? C(g) : d(g);
  }
  function x(g) {
    const Q = "CDATA[";
    return g === Q.charCodeAt(a++) ? (e.consume(g), a === Q.length ? y : x) : n(g);
  }
  function y(g) {
    return g === null ? n(g) : g === 93 ? (e.consume(g), A) : B(g) ? (l = y, pe(g)) : (e.consume(g), y);
  }
  function A(g) {
    return g === 93 ? (e.consume(g), E) : y(g);
  }
  function E(g) {
    return g === 62 ? ye(g) : g === 93 ? (e.consume(g), E) : y(g);
  }
  function U(g) {
    return g === null || g === 62 ? ye(g) : B(g) ? (l = U, pe(g)) : (e.consume(g), U);
  }
  function N(g) {
    return g === null ? n(g) : g === 63 ? (e.consume(g), P) : B(g) ? (l = N, pe(g)) : (e.consume(g), N);
  }
  function P(g) {
    return g === 62 ? ye(g) : N(g);
  }
  function V(g) {
    return ut(g) ? (e.consume(g), w) : n(g);
  }
  function w(g) {
    return g === 45 || Xe(g) ? (e.consume(g), w) : z(g);
  }
  function z(g) {
    return B(g) ? (l = z, pe(g)) : ne(g) ? (e.consume(g), z) : ye(g);
  }
  function j(g) {
    return g === 45 || Xe(g) ? (e.consume(g), j) : g === 47 || g === 62 || je(g) ? Z(g) : n(g);
  }
  function Z(g) {
    return g === 47 ? (e.consume(g), ye) : g === 58 || g === 95 || ut(g) ? (e.consume(g), O) : B(g) ? (l = Z, pe(g)) : ne(g) ? (e.consume(g), Z) : ye(g);
  }
  function O(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || Xe(g) ? (e.consume(g), O) : v(g);
  }
  function v(g) {
    return g === 61 ? (e.consume(g), M) : B(g) ? (l = v, pe(g)) : ne(g) ? (e.consume(g), v) : Z(g);
  }
  function M(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), i = g, Y) : B(g) ? (l = M, pe(g)) : ne(g) ? (e.consume(g), M) : (e.consume(g), ae);
  }
  function Y(g) {
    return g === i ? (e.consume(g), i = void 0, X) : g === null ? n(g) : B(g) ? (l = Y, pe(g)) : (e.consume(g), Y);
  }
  function ae(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? n(g) : g === 47 || g === 62 || je(g) ? Z(g) : (e.consume(g), ae);
  }
  function X(g) {
    return g === 47 || g === 62 || je(g) ? Z(g) : n(g);
  }
  function ye(g) {
    return g === 62 ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(g);
  }
  function pe(g) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), Te;
  }
  function Te(g) {
    return ne(g) ? oe(e, $e, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(g) : $e(g);
  }
  function $e(g) {
    return e.enter("htmlTextData"), l(g);
  }
}
const Tr = {
  name: "labelEnd",
  resolveAll: to,
  resolveTo: no,
  tokenize: ro
}, Qs = {
  tokenize: io
}, Js = {
  tokenize: ao
}, eo = {
  tokenize: lo
};
function to(e) {
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
function no(e, t) {
  let n = e.length, r = 0, i, a, l, s;
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
  return s = [["enter", c, t], ["enter", h, t]], s = tt(s, e.slice(a + 1, a + r + 3)), s = tt(s, [["enter", u, t]]), s = tt(s, Sr(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, l - 3), t)), s = tt(s, [["exit", u, t], e[l - 2], e[l - 1], ["exit", h, t]]), s = tt(s, e.slice(l + 1)), s = tt(s, [["exit", c, t]]), ht(e, a, e.length, s), e;
}
function ro(e, t, n) {
  const r = this;
  let i = r.events.length, a, l;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return s;
  function s(C) {
    return a ? a._inactive ? d(C) : (l = r.parser.defined.includes(Vt(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(C), e.exit("labelMarker"), e.exit("labelEnd"), c) : n(C);
  }
  function c(C) {
    return C === 40 ? e.attempt(Qs, u, l ? u : d)(C) : C === 91 ? e.attempt(Js, u, l ? h : d)(C) : l ? u(C) : d(C);
  }
  function h(C) {
    return e.attempt(eo, u, d)(C);
  }
  function u(C) {
    return t(C);
  }
  function d(C) {
    return a._balanced = !0, n(C);
  }
}
function io(e, t, n) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), i;
  }
  function i(d) {
    return je(d) ? an(e, a)(d) : a(d);
  }
  function a(d) {
    return d === 41 ? u(d) : ta(e, l, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function l(d) {
    return je(d) ? an(e, c)(d) : u(d);
  }
  function s(d) {
    return n(d);
  }
  function c(d) {
    return d === 34 || d === 39 || d === 40 ? ra(e, h, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : u(d);
  }
  function h(d) {
    return je(d) ? an(e, u)(d) : u(d);
  }
  function u(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), t) : n(d);
  }
}
function ao(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return na.call(r, e, a, l, "reference", "referenceMarker", "referenceString")(s);
  }
  function a(s) {
    return r.parser.defined.includes(Vt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(s) : n(s);
  }
  function l(s) {
    return n(s);
  }
}
function lo(e, t, n) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), i;
  }
  function i(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), t) : n(a);
  }
}
const so = {
  name: "labelStartImage",
  resolveAll: Tr.resolveAll,
  tokenize: oo
};
function oo(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(s), e.exit("labelImageMarker"), a;
  }
  function a(s) {
    return s === 91 ? (e.enter("labelMarker"), e.consume(s), e.exit("labelMarker"), e.exit("labelImage"), l) : n(s);
  }
  function l(s) {
    return s === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : t(s);
  }
}
const co = {
  name: "labelStartLink",
  resolveAll: Tr.resolveAll,
  tokenize: uo
};
function uo(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(l), e.exit("labelMarker"), e.exit("labelLink"), a;
  }
  function a(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : t(l);
  }
}
const Bn = {
  name: "lineEnding",
  tokenize: ho
};
function ho(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), oe(e, t, "linePrefix");
  }
}
const yn = {
  name: "thematicBreak",
  tokenize: po
};
function po(e, t, n) {
  let r = 0, i;
  return a;
  function a(h) {
    return e.enter("thematicBreak"), l(h);
  }
  function l(h) {
    return i = h, s(h);
  }
  function s(h) {
    return h === i ? (e.enter("thematicBreakSequence"), c(h)) : r >= 3 && (h === null || B(h)) ? (e.exit("thematicBreak"), t(h)) : n(h);
  }
  function c(h) {
    return h === i ? (e.consume(h), r++, c) : (e.exit("thematicBreakSequence"), ne(h) ? oe(e, s, "whitespace")(h) : s(h));
  }
}
const Ve = {
  continuation: {
    tokenize: Co
  },
  exit: wo,
  name: "list",
  tokenize: go
}, fo = {
  partial: !0,
  tokenize: _o
}, mo = {
  partial: !0,
  tokenize: yo
};
function go(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, l = 0;
  return s;
  function s(p) {
    const x = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (x === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : sr(p)) {
      if (r.containerState.type || (r.containerState.type = x, e.enter(x, {
        _container: !0
      })), x === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(yn, n, h)(p) : h(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), c(p);
    }
    return n(p);
  }
  function c(p) {
    return sr(p) && ++l < 10 ? (e.consume(p), c) : (!r.interrupt || l < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), h(p)) : n(p);
  }
  function h(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      Nn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : u,
      e.attempt(fo, C, d)
    );
  }
  function u(p) {
    return r.containerState.initialBlankLine = !0, a++, C(p);
  }
  function d(p) {
    return ne(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), C) : n(p);
  }
  function C(p) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(p);
  }
}
function Co(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Nn, i, a);
  function i(s) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, oe(e, t, "listItemIndent", r.containerState.size + 1)(s);
  }
  function a(s) {
    return r.containerState.furtherBlankLines || !ne(s) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(s)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(mo, t, l)(s));
  }
  function l(s) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, oe(e, e.attempt(Ve, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s);
  }
}
function yo(e, t, n) {
  const r = this;
  return oe(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function wo(e) {
  e.exit(this.containerState.type);
}
function _o(e, t, n) {
  const r = this;
  return oe(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const l = r.events[r.events.length - 1];
    return !ne(a) && l && l[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const ni = {
  name: "setextUnderline",
  resolveTo: xo,
  tokenize: Eo
};
function xo(e, t) {
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
function Eo(e, t, n) {
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
    return e.enter("setextHeadingLineSequence"), s(h);
  }
  function s(h) {
    return h === i ? (e.consume(h), s) : (e.exit("setextHeadingLineSequence"), ne(h) ? oe(e, c, "lineSuffix")(h) : c(h));
  }
  function c(h) {
    return h === null || B(h) ? (e.exit("setextHeadingLine"), t(h)) : n(h);
  }
}
const ko = {
  tokenize: So
};
function So(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    Nn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, oe(e, e.attempt(this.parser.constructs.flow, i, e.attempt(As, i)), "linePrefix"))
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
const To = {
  resolveAll: aa()
}, bo = ia("string"), vo = ia("text");
function ia(e) {
  return {
    resolveAll: aa(e === "text" ? Ao : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], a = n.attempt(i, l, s);
    return l;
    function l(u) {
      return h(u) ? a(u) : s(u);
    }
    function s(u) {
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
function aa(e) {
  return t;
  function t(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === "data" && (a = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function Ao(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let a = i.length, l = -1, s = 0, c;
      for (; a--; ) {
        const h = i[a];
        if (typeof h == "string") {
          for (l = h.length; h.charCodeAt(l - 1) === 32; )
            s++, l--;
          if (l) break;
          l = -1;
        } else if (h === -2)
          c = !0, s++;
        else if (h !== -1) {
          a++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (s = 0), s) {
        const h = {
          type: n === e.length || c || s < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: a ? l : r.start._bufferIndex + l,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - s,
            offset: r.end.offset - s
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
const Io = {
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
  62: Ki
}, No = {
  91: Ms
}, Ro = {
  [-2]: zn,
  [-1]: zn,
  32: zn
}, Lo = {
  35: Fs,
  42: yn,
  45: [ni, yn],
  60: Gs,
  61: ni,
  95: yn,
  96: ei,
  126: ei
}, Mo = {
  38: Ji,
  92: Qi
}, Oo = {
  [-5]: Bn,
  [-4]: Bn,
  [-3]: Bn,
  33: so,
  38: Ji,
  42: or,
  60: [cs, Ys],
  91: co,
  92: [Hs, Qi],
  93: Tr,
  95: or,
  96: Es
}, Do = {
  null: [or, To]
}, Po = {
  null: [42, 95]
}, Ho = {
  null: []
}, Uo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Po,
  contentInitial: No,
  disable: Ho,
  document: Io,
  flow: Lo,
  flowInitial: Ro,
  insideSpan: Do,
  string: Mo,
  text: Oo
}, Symbol.toStringTag, { value: "Module" }));
function Fo(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, a = [];
  let l = [], s = [];
  const c = {
    attempt: z(V),
    check: z(w),
    consume: U,
    enter: N,
    exit: P,
    interrupt: z(w, {
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
  function d(v) {
    return l = tt(l, v), A(), l[l.length - 1] !== null ? [] : (j(t, 0), h.events = Sr(a, h.events, h), h.events);
  }
  function C(v, M) {
    return Bo(p(v), M);
  }
  function p(v) {
    return zo(l, v);
  }
  function x() {
    const {
      _bufferIndex: v,
      _index: M,
      line: Y,
      column: ae,
      offset: X
    } = r;
    return {
      _bufferIndex: v,
      _index: M,
      line: Y,
      column: ae,
      offset: X
    };
  }
  function y(v) {
    i[v.line] = v.column, O();
  }
  function A() {
    let v;
    for (; r._index < l.length; ) {
      const M = l[r._index];
      if (typeof M == "string")
        for (v = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === v && r._bufferIndex < M.length; )
          E(M.charCodeAt(r._bufferIndex));
      else
        E(M);
    }
  }
  function E(v) {
    u = u(v);
  }
  function U(v) {
    B(v) ? (r.line++, r.column = 1, r.offset += v === -3 ? 2 : 1, O()) : v !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[r._index].length && (r._bufferIndex = -1, r._index++)), h.previous = v;
  }
  function N(v, M) {
    const Y = M || {};
    return Y.type = v, Y.start = x(), h.events.push(["enter", Y, h]), s.push(Y), Y;
  }
  function P(v) {
    const M = s.pop();
    return M.end = x(), h.events.push(["exit", M, h]), M;
  }
  function V(v, M) {
    j(v, M.from);
  }
  function w(v, M) {
    M.restore();
  }
  function z(v, M) {
    return Y;
    function Y(ae, X, ye) {
      let pe, Te, $e, g;
      return Array.isArray(ae) ? (
        /* c8 ignore next 1 */
        Ie(ae)
      ) : "tokenize" in ae ? (
        // Looks like a construct.
        Ie([
          /** @type {Construct} */
          ae
        ])
      ) : Q(ae);
      function Q(le) {
        return Fe;
        function Fe(xe) {
          const Ye = xe !== null && le[xe], Ke = xe !== null && le.null, pt = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ye) ? Ye : Ye ? [Ye] : [],
            ...Array.isArray(Ke) ? Ke : Ke ? [Ke] : []
          ];
          return Ie(pt)(xe);
        }
      }
      function Ie(le) {
        return pe = le, Te = 0, le.length === 0 ? ye : f(le[Te]);
      }
      function f(le) {
        return Fe;
        function Fe(xe) {
          return g = Z(), $e = le, le.partial || (h.currentConstruct = le), le.name && h.parser.constructs.disable.null.includes(le.name) ? ee() : le.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            M ? Object.assign(Object.create(h), M) : h,
            c,
            de,
            ee
          )(xe);
        }
      }
      function de(le) {
        return v($e, g), X;
      }
      function ee(le) {
        return g.restore(), ++Te < pe.length ? f(pe[Te]) : ye;
      }
    }
  }
  function j(v, M) {
    v.resolveAll && !a.includes(v) && a.push(v), v.resolve && ht(h.events, M, h.events.length - M, v.resolve(h.events.slice(M), h)), v.resolveTo && (h.events = v.resolveTo(h.events, h));
  }
  function Z() {
    const v = x(), M = h.previous, Y = h.currentConstruct, ae = h.events.length, X = Array.from(s);
    return {
      from: ae,
      restore: ye
    };
    function ye() {
      r = v, h.previous = M, h.currentConstruct = Y, h.events.length = ae, s = X, O();
    }
  }
  function O() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function zo(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex;
  let l;
  if (n === i)
    l = [e[n].slice(r, a)];
  else {
    if (l = e.slice(n, i), r > -1) {
      const s = l[0];
      typeof s == "string" ? l[0] = s.slice(r) : l.shift();
    }
    a > 0 && l.push(e[i].slice(0, a));
  }
  return l;
}
function Bo(e, t) {
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
function Vo(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      ql([Uo, ...(e || {}).extensions || []])
    ),
    content: i(ns),
    defined: [],
    document: i(is),
    flow: i(ko),
    lazy: {},
    string: i(bo),
    text: i(vo)
  };
  return r;
  function i(a) {
    return l;
    function l(s) {
      return Fo(r, a, s);
    }
  }
}
function Go(e) {
  for (; !ea(e); )
    ;
  return e;
}
const ri = /[\0\t\n\r]/g;
function jo() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, l, s) {
    const c = [];
    let h, u, d, C, p;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(l || void 0).decode(a)), d = 0, t = "", n && (a.charCodeAt(0) === 65279 && d++, n = void 0); d < a.length; ) {
      if (ri.lastIndex = d, h = ri.exec(a), C = h && h.index !== void 0 ? h.index : a.length, p = a.charCodeAt(C), !h) {
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
    return s && (r && c.push(-5), t && c.push(t), c.push(null)), c;
  }
}
const Wo = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function $o(e) {
  return e.replace(Wo, Zo);
}
function Zo(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return Yi(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return kr(n) || e;
}
const la = {}.hasOwnProperty;
function qo(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Xo(n)(Go(Vo(n).document().write(jo()(e, t, !0))));
}
function Xo(e) {
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
      hardBreakEscape: a(ze),
      hardBreakTrailing: a(ze),
      htmlFlow: a(_t, l),
      htmlFlowData: Z,
      htmlText: a(_t, l),
      htmlTextData: Z,
      image: a(Ne),
      label: l,
      link: a(Je),
      listItem: a(Dt),
      listItemValue: C,
      listOrdered: a(Re, d),
      listUnordered: a(Re),
      paragraph: a(Pt),
      reference: f,
      referenceString: l,
      resourceDestinationString: l,
      resourceTitleString: l,
      setextHeading: a(Oe),
      strong: a(Zt),
      thematicBreak: a(ft)
    },
    exit: {
      atxHeading: c(),
      atxHeadingSequence: V,
      autolink: c(),
      autolinkEmail: Ye,
      autolinkProtocol: xe,
      blockQuote: c(),
      characterEscapeValue: O,
      characterReferenceMarkerHexadecimal: ee,
      characterReferenceMarkerNumeric: ee,
      characterReferenceValue: le,
      characterReference: Fe,
      codeFenced: c(A),
      codeFencedFence: y,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: x,
      codeFlowValue: O,
      codeIndented: c(E),
      codeText: c(X),
      codeTextData: O,
      data: O,
      definition: c(),
      definitionDestinationString: P,
      definitionLabelString: U,
      definitionTitleString: N,
      emphasis: c(),
      hardBreakEscape: c(M),
      hardBreakTrailing: c(M),
      htmlFlow: c(Y),
      htmlFlowData: O,
      htmlText: c(ae),
      htmlTextData: O,
      image: c(pe),
      label: $e,
      labelText: Te,
      lineEnding: v,
      link: c(ye),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: de,
      resourceDestinationString: g,
      resourceTitleString: Q,
      resource: Ie,
      setextHeading: c(j),
      setextHeadingLineSequence: z,
      setextHeadingText: w,
      strong: c(),
      thematicBreak: c()
    }
  };
  sa(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(_) {
    let T = {
      type: "root",
      children: []
    };
    const H = {
      stack: [T],
      tokenStack: [],
      config: t,
      enter: s,
      exit: h,
      buffer: l,
      resume: u,
      data: n
    }, W = [];
    let J = -1;
    for (; ++J < _.length; )
      if (_[J][1].type === "listOrdered" || _[J][1].type === "listUnordered")
        if (_[J][0] === "enter")
          W.push(J);
        else {
          const Ee = W.pop();
          J = i(_, Ee, J);
        }
    for (J = -1; ++J < _.length; ) {
      const Ee = t[_[J][0]];
      la.call(Ee, _[J][1].type) && Ee[_[J][1].type].call(Object.assign({
        sliceSerialize: _[J][2].sliceSerialize
      }, H), _[J][1]);
    }
    if (H.tokenStack.length > 0) {
      const Ee = H.tokenStack[H.tokenStack.length - 1];
      (Ee[1] || ii).call(H, void 0, Ee[0]);
    }
    for (T.position = {
      start: Tt(_.length > 0 ? _[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Tt(_.length > 0 ? _[_.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, J = -1; ++J < t.transforms.length; )
      T = t.transforms[J](T) || T;
    return T;
  }
  function i(_, T, H) {
    let W = T - 1, J = -1, Ee = !1, Ze, be, ve, fe;
    for (; ++W <= H; ) {
      const ue = _[W];
      switch (ue[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          ue[0] === "enter" ? J++ : J--, fe = void 0;
          break;
        }
        case "lineEndingBlank": {
          ue[0] === "enter" && (Ze && !fe && !J && !ve && (ve = W), fe = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          fe = void 0;
      }
      if (!J && ue[0] === "enter" && ue[1].type === "listItemPrefix" || J === -1 && ue[0] === "exit" && (ue[1].type === "listUnordered" || ue[1].type === "listOrdered")) {
        if (Ze) {
          let et = W;
          for (be = void 0; et--; ) {
            const De = _[et];
            if (De[1].type === "lineEnding" || De[1].type === "lineEndingBlank") {
              if (De[0] === "exit") continue;
              be && (_[be][1].type = "lineEndingBlank", Ee = !0), De[1].type = "lineEnding", be = et;
            } else if (!(De[1].type === "linePrefix" || De[1].type === "blockQuotePrefix" || De[1].type === "blockQuotePrefixWhitespace" || De[1].type === "blockQuoteMarker" || De[1].type === "listItemIndent")) break;
          }
          ve && (!be || ve < be) && (Ze._spread = !0), Ze.end = Object.assign({}, be ? _[be][1].start : ue[1].end), _.splice(be || W, 0, ["exit", Ze, ue[2]]), W++, H++;
        }
        if (ue[1].type === "listItemPrefix") {
          const et = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, ue[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ze = et, _.splice(W, 0, ["enter", et, ue[2]]), W++, H++, ve = void 0, fe = !0;
        }
      }
    }
    return _[T][1]._spread = Ee, H;
  }
  function a(_, T) {
    return H;
    function H(W) {
      s.call(this, _(W), W), T && T.call(this, W);
    }
  }
  function l() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function s(_, T, H) {
    this.stack[this.stack.length - 1].children.push(_), this.stack.push(_), this.tokenStack.push([T, H || void 0]), _.position = {
      start: Tt(T.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function c(_) {
    return T;
    function T(H) {
      _ && _.call(this, H), h.call(this, H);
    }
  }
  function h(_, T) {
    const H = this.stack.pop(), W = this.tokenStack.pop();
    if (W)
      W[0].type !== _.type && (T ? T.call(this, _, W[0]) : (W[1] || ii).call(this, _, W[0]));
    else throw new Error("Cannot close `" + _.type + "` (" + rn({
      start: _.start,
      end: _.end
    }) + "): it’s not open");
    H.position.end = Tt(_.end);
  }
  function u() {
    return $l(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function C(_) {
    if (this.data.expectingFirstListItemValue) {
      const T = this.stack[this.stack.length - 2];
      T.start = Number.parseInt(this.sliceSerialize(_), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const _ = this.resume(), T = this.stack[this.stack.length - 1];
    T.lang = _;
  }
  function x() {
    const _ = this.resume(), T = this.stack[this.stack.length - 1];
    T.meta = _;
  }
  function y() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function A() {
    const _ = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = _.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function E() {
    const _ = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = _.replace(/(\r?\n|\r)$/g, "");
  }
  function U(_) {
    const T = this.resume(), H = this.stack[this.stack.length - 1];
    H.label = T, H.identifier = Vt(this.sliceSerialize(_)).toLowerCase();
  }
  function N() {
    const _ = this.resume(), T = this.stack[this.stack.length - 1];
    T.title = _;
  }
  function P() {
    const _ = this.resume(), T = this.stack[this.stack.length - 1];
    T.url = _;
  }
  function V(_) {
    const T = this.stack[this.stack.length - 1];
    if (!T.depth) {
      const H = this.sliceSerialize(_).length;
      T.depth = H;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function z(_) {
    const T = this.stack[this.stack.length - 1];
    T.depth = this.sliceSerialize(_).codePointAt(0) === 61 ? 1 : 2;
  }
  function j() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function Z(_) {
    const H = this.stack[this.stack.length - 1].children;
    let W = H[H.length - 1];
    (!W || W.type !== "text") && (W = It(), W.position = {
      start: Tt(_.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, H.push(W)), this.stack.push(W);
  }
  function O(_) {
    const T = this.stack.pop();
    T.value += this.sliceSerialize(_), T.position.end = Tt(_.end);
  }
  function v(_) {
    const T = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const H = T.children[T.children.length - 1];
      H.position.end = Tt(_.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(T.type) && (Z.call(this, _), O.call(this, _));
  }
  function M() {
    this.data.atHardBreak = !0;
  }
  function Y() {
    const _ = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = _;
  }
  function ae() {
    const _ = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = _;
  }
  function X() {
    const _ = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = _;
  }
  function ye() {
    const _ = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const T = this.data.referenceType || "shortcut";
      _.type += "Reference", _.referenceType = T, delete _.url, delete _.title;
    } else
      delete _.identifier, delete _.label;
    this.data.referenceType = void 0;
  }
  function pe() {
    const _ = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const T = this.data.referenceType || "shortcut";
      _.type += "Reference", _.referenceType = T, delete _.url, delete _.title;
    } else
      delete _.identifier, delete _.label;
    this.data.referenceType = void 0;
  }
  function Te(_) {
    const T = this.sliceSerialize(_), H = this.stack[this.stack.length - 2];
    H.label = $o(T), H.identifier = Vt(T).toLowerCase();
  }
  function $e() {
    const _ = this.stack[this.stack.length - 1], T = this.resume(), H = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, H.type === "link") {
      const W = _.children;
      H.children = W;
    } else
      H.alt = T;
  }
  function g() {
    const _ = this.resume(), T = this.stack[this.stack.length - 1];
    T.url = _;
  }
  function Q() {
    const _ = this.resume(), T = this.stack[this.stack.length - 1];
    T.title = _;
  }
  function Ie() {
    this.data.inReference = void 0;
  }
  function f() {
    this.data.referenceType = "collapsed";
  }
  function de(_) {
    const T = this.resume(), H = this.stack[this.stack.length - 1];
    H.label = T, H.identifier = Vt(this.sliceSerialize(_)).toLowerCase(), this.data.referenceType = "full";
  }
  function ee(_) {
    this.data.characterReferenceType = _.type;
  }
  function le(_) {
    const T = this.sliceSerialize(_), H = this.data.characterReferenceType;
    let W;
    H ? (W = Yi(T, H === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : W = kr(T);
    const J = this.stack[this.stack.length - 1];
    J.value += W;
  }
  function Fe(_) {
    const T = this.stack.pop();
    T.position.end = Tt(_.end);
  }
  function xe(_) {
    O.call(this, _);
    const T = this.stack[this.stack.length - 1];
    T.url = this.sliceSerialize(_);
  }
  function Ye(_) {
    O.call(this, _);
    const T = this.stack[this.stack.length - 1];
    T.url = "mailto:" + this.sliceSerialize(_);
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
  function ze() {
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
  function Je() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Re(_) {
    return {
      type: "list",
      ordered: _.type === "listOrdered",
      start: null,
      spread: _._spread,
      children: []
    };
  }
  function Dt(_) {
    return {
      type: "listItem",
      spread: _._spread,
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
  function Zt() {
    return {
      type: "strong",
      children: []
    };
  }
  function It() {
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
function Tt(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function sa(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? sa(e, r) : Yo(e, r);
  }
}
function Yo(e, t) {
  let n;
  for (n in t)
    if (la.call(t, n))
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
function ii(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + rn({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + rn({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + rn({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function Ko(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return qo(r, {
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
function Qo(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Jo(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function e1(e, t) {
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
function t1(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function n1(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function r1(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = $t(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
  let l, s = e.footnoteCounts.get(r);
  s === void 0 ? (s = 0, e.footnoteOrder.push(r), l = e.footnoteOrder.length) : l = a + 1, s += 1, e.footnoteCounts.set(r, s);
  const c = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (s > 1 ? "-" + s : ""),
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
function i1(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function a1(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function oa(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const l = i[i.length - 1];
  return l && l.type === "text" ? l.value += r : i.push({ type: "text", value: r }), i;
}
function l1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return oa(e, t);
  const i = { src: $t(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function s1(e, t) {
  const n = { src: $t(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function o1(e, t) {
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
function c1(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return oa(e, t);
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
function u1(e, t) {
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
function h1(e, t, n) {
  const r = e.all(t), i = n ? p1(n) : ca(t), a = {}, l = [];
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
  let s = -1;
  for (; ++s < r.length; ) {
    const u = r[s];
    (i || s !== 0 || u.type !== "element" || u.tagName !== "p") && l.push({ type: "text", value: `
` }), u.type === "element" && u.tagName === "p" && !i ? l.push(...u.children) : l.push(u);
  }
  const c = r[r.length - 1];
  c && (i || c.type !== "element" || c.tagName !== "p") && l.push({ type: "text", value: `
` });
  const h = { type: "element", tagName: "li", properties: a, children: l };
  return e.patch(t, h), e.applyData(t, h);
}
function p1(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = ca(n[r]);
  }
  return t;
}
function ca(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function d1(e, t) {
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
function f1(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function m1(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function g1(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function C1(e, t) {
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
    }, s = wr(t.children[1]), c = Gi(t.children[t.children.length - 1]);
    s && c && (l.position = { start: s, end: c }), i.push(l);
  }
  const a = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function y1(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", l = n && n.type === "table" ? n.align : void 0, s = l ? l.length : t.children.length;
  let c = -1;
  const h = [];
  for (; ++c < s; ) {
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
function w1(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const ai = 9, li = 32;
function _1(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const a = [];
  for (; r; )
    a.push(
      si(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return a.push(si(t.slice(i), i > 0, !1)), a.join("");
}
function si(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let a = e.codePointAt(r);
    for (; a === ai || a === li; )
      r++, a = e.codePointAt(r);
  }
  if (n) {
    let a = e.codePointAt(i - 1);
    for (; a === ai || a === li; )
      i--, a = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function x1(e, t) {
  const n = { type: "text", value: _1(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function E1(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const k1 = {
  blockquote: Qo,
  break: Jo,
  code: e1,
  delete: t1,
  emphasis: n1,
  footnoteReference: r1,
  heading: i1,
  html: a1,
  imageReference: l1,
  image: s1,
  inlineCode: o1,
  linkReference: c1,
  link: u1,
  listItem: h1,
  list: d1,
  paragraph: f1,
  // @ts-expect-error: root is different, but hard to type.
  root: m1,
  strong: g1,
  table: C1,
  tableCell: w1,
  tableRow: y1,
  text: x1,
  thematicBreak: E1,
  toml: dn,
  yaml: dn,
  definition: dn,
  footnoteDefinition: dn
};
function dn() {
}
const ua = -1, Rn = 0, ln = 1, Tn = 2, br = 3, vr = 4, Ar = 5, Ir = 6, ha = 7, pa = 8, oi = typeof self == "object" ? self : globalThis, S1 = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, l] = t[i];
    switch (a) {
      case Rn:
      case ua:
        return n(l, i);
      case ln: {
        const s = n([], i);
        for (const c of l)
          s.push(r(c));
        return s;
      }
      case Tn: {
        const s = n({}, i);
        for (const [c, h] of l)
          s[r(c)] = r(h);
        return s;
      }
      case br:
        return n(new Date(l), i);
      case vr: {
        const { source: s, flags: c } = l;
        return n(new RegExp(s, c), i);
      }
      case Ar: {
        const s = n(/* @__PURE__ */ new Map(), i);
        for (const [c, h] of l)
          s.set(r(c), r(h));
        return s;
      }
      case Ir: {
        const s = n(/* @__PURE__ */ new Set(), i);
        for (const c of l)
          s.add(r(c));
        return s;
      }
      case ha: {
        const { name: s, message: c } = l;
        return n(new oi[s](c), i);
      }
      case pa:
        return n(BigInt(l), i);
      case "BigInt":
        return n(Object(BigInt(l)), i);
      case "ArrayBuffer":
        return n(new Uint8Array(l).buffer, l);
      case "DataView": {
        const { buffer: s } = new Uint8Array(l);
        return n(new DataView(s), l);
      }
    }
    return n(new oi[a](l), i);
  };
  return r;
}, ci = (e) => S1(/* @__PURE__ */ new Map(), e)(0), Ft = "", { toString: T1 } = {}, { keys: b1 } = Object, Kt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Rn, t];
  const n = T1.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [ln, Ft];
    case "Object":
      return [Tn, Ft];
    case "Date":
      return [br, Ft];
    case "RegExp":
      return [vr, Ft];
    case "Map":
      return [Ar, Ft];
    case "Set":
      return [Ir, Ft];
    case "DataView":
      return [ln, n];
  }
  return n.includes("Array") ? [ln, n] : n.includes("Error") ? [ha, n] : [Tn, n];
}, fn = ([e, t]) => e === Rn && (t === "function" || t === "symbol"), v1 = (e, t, n, r) => {
  const i = (l, s) => {
    const c = r.push(l) - 1;
    return n.set(s, c), c;
  }, a = (l) => {
    if (n.has(l))
      return n.get(l);
    let [s, c] = Kt(l);
    switch (s) {
      case Rn: {
        let u = l;
        switch (c) {
          case "bigint":
            s = pa, u = l.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + c);
            u = null;
            break;
          case "undefined":
            return i([ua], l);
        }
        return i([s, u], l);
      }
      case ln: {
        if (c) {
          let C = l;
          return c === "DataView" ? C = new Uint8Array(l.buffer) : c === "ArrayBuffer" && (C = new Uint8Array(l)), i([c, [...C]], l);
        }
        const u = [], d = i([s, u], l);
        for (const C of l)
          u.push(a(C));
        return d;
      }
      case Tn: {
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
        const u = [], d = i([s, u], l);
        for (const C of b1(l))
          (e || !fn(Kt(l[C]))) && u.push([a(C), a(l[C])]);
        return d;
      }
      case br:
        return i([s, l.toISOString()], l);
      case vr: {
        const { source: u, flags: d } = l;
        return i([s, { source: u, flags: d }], l);
      }
      case Ar: {
        const u = [], d = i([s, u], l);
        for (const [C, p] of l)
          (e || !(fn(Kt(C)) || fn(Kt(p)))) && u.push([a(C), a(p)]);
        return d;
      }
      case Ir: {
        const u = [], d = i([s, u], l);
        for (const C of l)
          (e || !fn(Kt(C))) && u.push(a(C));
        return d;
      }
    }
    const { message: h } = l;
    return i([s, { name: c, message: h }], l);
  };
  return a;
}, ui = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return v1(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, bn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? ci(ui(e, t)) : structuredClone(e)
) : (e, t) => ci(ui(e, t));
function A1(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function I1(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function N1(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || A1, r = e.options.footnoteBackLabel || I1, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", l = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, s = [];
  let c = -1;
  for (; ++c < e.footnoteOrder.length; ) {
    const h = e.footnoteById.get(
      e.footnoteOrder[c]
    );
    if (!h)
      continue;
    const u = e.all(h), d = String(h.identifier).toUpperCase(), C = $t(d.toLowerCase());
    let p = 0;
    const x = [], y = e.footnoteCounts.get(d);
    for (; y !== void 0 && ++p <= y; ) {
      x.length > 0 && x.push({ type: "text", value: " " });
      let U = typeof n == "string" ? n : n(c, p);
      typeof U == "string" && (U = { type: "text", value: U }), x.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + C + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(c, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(U) ? U : [U]
      });
    }
    const A = u[u.length - 1];
    if (A && A.type === "element" && A.tagName === "p") {
      const U = A.children[A.children.length - 1];
      U && U.type === "text" ? U.value += " " : A.children.push({ type: "text", value: " " }), A.children.push(...x);
    } else
      u.push(...x);
    const E = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + C },
      children: e.wrap(u, !0)
    };
    e.patch(h, E), s.push(E);
  }
  if (s.length !== 0)
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
          children: e.wrap(s, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const da = (
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
      return O1;
    if (typeof e == "function")
      return Ln(e);
    if (typeof e == "object")
      return Array.isArray(e) ? R1(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        L1(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return M1(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function R1(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = da(e[n]);
  return Ln(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function L1(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Ln(n);
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
function M1(e) {
  return Ln(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Ln(e) {
  return t;
  function t(n, r, i) {
    return !!(D1(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function O1() {
  return !0;
}
function D1(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const fa = [], P1 = !0, hi = !1, H1 = "skip";
function U1(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = da(i), l = r ? -1 : 1;
  s(e, void 0, [])();
  function s(c, h, u) {
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
      let p = fa, x, y, A;
      if ((!t || a(c, h, u[u.length - 1] || void 0)) && (p = F1(n(c, u)), p[0] === hi))
        return p;
      if ("children" in c && c.children) {
        const E = (
          /** @type {UnistParent} */
          c
        );
        if (E.children && p[0] !== H1)
          for (y = (r ? E.children.length : -1) + l, A = u.concat(E); y > -1 && y < E.children.length; ) {
            const U = E.children[y];
            if (x = s(U, y, A)(), x[0] === hi)
              return x;
            y = typeof x[1] == "number" ? x[1] : y + l;
          }
      }
      return p;
    }
  }
}
function F1(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [P1, e] : e == null ? fa : [e];
}
function ma(e, t, n, r) {
  let i, a, l;
  typeof t == "function" && typeof n != "function" ? (a = void 0, l = t, i = n) : (a = t, l = n, i = r), U1(e, a, s, i);
  function s(c, h) {
    const u = h[h.length - 1], d = u ? u.children.indexOf(c) : void 0;
    return l(c, d, u);
  }
}
const cr = {}.hasOwnProperty, z1 = {};
function B1(e, t) {
  const n = t || z1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = { ...k1, ...n.handlers }, s = {
    all: h,
    applyData: G1,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: l,
    one: c,
    options: n,
    patch: V1,
    wrap: W1
  };
  return ma(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const d = u.type === "definition" ? r : i, C = String(u.identifier).toUpperCase();
      d.has(C) || d.set(C, u);
    }
  }), s;
  function c(u, d) {
    const C = u.type, p = s.handlers[C];
    if (cr.call(s.handlers, C) && p)
      return p(s, u, d);
    if (s.options.passThrough && s.options.passThrough.includes(C)) {
      if ("children" in u) {
        const { children: y, ...A } = u, E = bn(A);
        return E.children = s.all(u), E;
      }
      return bn(u);
    }
    return (s.options.unknownHandler || j1)(s, u, d);
  }
  function h(u) {
    const d = [];
    if ("children" in u) {
      const C = u.children;
      let p = -1;
      for (; ++p < C.length; ) {
        const x = s.one(C[p], u);
        if (x) {
          if (p && C[p - 1].type === "break" && (!Array.isArray(x) && x.type === "text" && (x.value = pi(x.value)), !Array.isArray(x) && x.type === "element")) {
            const y = x.children[0];
            y && y.type === "text" && (y.value = pi(y.value));
          }
          Array.isArray(x) ? d.push(...x) : d.push(x);
        }
      }
    }
    return d;
  }
}
function V1(e, t) {
  e.position && (t.position = Sl(e));
}
function G1(e, t) {
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
function j1(e, t) {
  const n = t.data || {}, r = "value" in t && !(cr.call(n, "hProperties") || cr.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function W1(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function pi(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function di(e, t) {
  const n = B1(e, t), r = n.one(e, void 0), i = N1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function $1(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      di(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      di(n, { file: r, ...e || t })
    );
  };
}
function fi(e) {
  if (e)
    throw e;
}
var wn = Object.prototype.hasOwnProperty, ga = Object.prototype.toString, mi = Object.defineProperty, gi = Object.getOwnPropertyDescriptor, Ci = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : ga.call(t) === "[object Array]";
}, yi = function(t) {
  if (!t || ga.call(t) !== "[object Object]")
    return !1;
  var n = wn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && wn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || wn.call(t, i);
}, wi = function(t, n) {
  mi && n.name === "__proto__" ? mi(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, _i = function(t, n) {
  if (n === "__proto__")
    if (wn.call(t, n)) {
      if (gi)
        return gi(t, n).value;
    } else return;
  return t[n];
}, Z1 = function e() {
  var t, n, r, i, a, l, s = arguments[0], c = 1, h = arguments.length, u = !1;
  for (typeof s == "boolean" && (u = s, s = arguments[1] || {}, c = 2), (s == null || typeof s != "object" && typeof s != "function") && (s = {}); c < h; ++c)
    if (t = arguments[c], t != null)
      for (n in t)
        r = _i(s, n), i = _i(t, n), s !== i && (u && i && (yi(i) || (a = Ci(i))) ? (a ? (a = !1, l = r && Ci(r) ? r : []) : l = r && yi(r) ? r : {}, wi(s, { name: n, newValue: e(u, l, i) })) : typeof i < "u" && wi(s, { name: n, newValue: i }));
  return s;
};
const Vn = /* @__PURE__ */ Vi(Z1);
function ur(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function q1() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let a = -1;
    const l = i.pop();
    if (typeof l != "function")
      throw new TypeError("Expected function as last argument, not " + l);
    s(null, ...i);
    function s(c, ...h) {
      const u = e[++a];
      let d = -1;
      if (c) {
        l(c);
        return;
      }
      for (; ++d < i.length; )
        (h[d] === null || h[d] === void 0) && (h[d] = i[d]);
      i = h, u ? X1(u, s)(...h) : l(null, ...h);
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
function X1(e, t) {
  let n;
  return r;
  function r(...l) {
    const s = e.length > l.length;
    let c;
    s && l.push(i);
    try {
      c = e.apply(this, l);
    } catch (h) {
      const u = (
        /** @type {Error} */
        h
      );
      if (s && n)
        throw u;
      return i(u);
    }
    s || (c && c.then && typeof c.then == "function" ? c.then(a, i) : c instanceof Error ? i(c) : a(c));
  }
  function i(l, ...s) {
    n || (n = !0, t(l, ...s));
  }
  function a(l) {
    i(null, l);
  }
}
const ot = { basename: Y1, dirname: K1, extname: Q1, join: J1, sep: "/" };
function Y1(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  cn(e);
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
  let l = -1, s = t.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (a) {
        n = i + 1;
        break;
      }
    } else
      l < 0 && (a = !0, l = i + 1), s > -1 && (e.codePointAt(i) === t.codePointAt(s--) ? s < 0 && (r = i) : (s = -1, r = l));
  return n === r ? r = l : r < 0 && (r = e.length), e.slice(n, r);
}
function K1(e) {
  if (cn(e), e.length === 0)
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
function Q1(e) {
  cn(e);
  let t = e.length, n = -1, r = 0, i = -1, a = 0, l;
  for (; t--; ) {
    const s = e.codePointAt(t);
    if (s === 47) {
      if (l) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (l = !0, n = t + 1), s === 46 ? i < 0 ? i = t : a !== 1 && (a = 1) : i > -1 && (a = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  a === 0 || // The (right-most) trimmed path component is exactly `..`.
  a === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function J1(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    cn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : ec(n);
}
function ec(e) {
  cn(e);
  const t = e.codePointAt(0) === 47;
  let n = tc(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function tc(e, t) {
  let n = "", r = 0, i = -1, a = 0, l = -1, s, c;
  for (; ++l <= e.length; ) {
    if (l < e.length)
      s = e.codePointAt(l);
    else {
      if (s === 47)
        break;
      s = 47;
    }
    if (s === 47) {
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
    } else s === 46 && a > -1 ? a++ : a = -1;
  }
  return n;
}
function cn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const nc = { cwd: rc };
function rc() {
  return "/";
}
function hr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function ic(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!hr(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return ac(e);
}
function ac(e) {
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
const Gn = (
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
class Ca {
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
    t ? hr(t) ? n = { path: t } : typeof t == "string" || lc(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : nc.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Gn.length; ) {
      const a = Gn[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      Gn.includes(i) || (this[i] = n[i]);
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
    Wn(t, "basename"), jn(t, "basename"), this.path = ot.join(this.dirname || "", t);
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
    xi(this.basename, "dirname"), this.path = ot.join(t || "", this.basename);
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
    if (jn(t, "extname"), xi(this.dirname, "extname"), t) {
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
    hr(t) && (t = ic(t)), Wn(t, "path"), this.path !== t && this.history.push(t);
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
    Wn(t, "stem"), jn(t, "stem"), this.path = ot.join(this.dirname || "", t + (this.extname || ""));
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
function jn(e, t) {
  if (e && e.includes(ot.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ot.sep + "`"
    );
}
function Wn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function xi(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function lc(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const sc = (
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
), oc = {}.hasOwnProperty;
class Nr extends sc {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = q1();
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
      new Nr()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Vn(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (qn("data", this.frozen), this.namespace[t] = n, this) : oc.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (qn("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = mn(t), r = this.parser || this.Parser;
    return $n("parse", r), r(String(n), n);
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
    return this.freeze(), $n("process", this.parser || this.Parser), Zn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, l) {
      const s = mn(t), c = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(s)
      );
      r.run(c, s, function(u, d, C) {
        if (u || !d || !C)
          return h(u);
        const p = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          d
        ), x = r.stringify(p, C);
        hc(x) ? C.value = x : C.result = x, h(
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
    return this.freeze(), $n("processSync", this.parser || this.Parser), Zn("processSync", this.compiler || this.Compiler), this.process(t, i), ki("processSync", "process", n), r;
    function i(a, l) {
      n = !0, fi(a), r = l;
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
    Ei(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(l, s) {
      const c = mn(n);
      i.run(t, c, h);
      function h(u, d, C) {
        const p = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          d || t
        );
        u ? s(u) : l ? l(p) : r(void 0, p, C);
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
    return this.run(t, n, a), ki("runSync", "run", r), i;
    function a(l, s) {
      fi(l), i = s, r = !0;
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
    const r = mn(n), i = this.compiler || this.Compiler;
    return Zn("stringify", i), Ei(t), i(t, r);
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
    if (qn("use", this.frozen), t != null) if (typeof t == "function")
      c(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? s(t) : l(t);
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
      s(h.plugins), h.settings && (i.settings = Vn(!0, i.settings, h.settings));
    }
    function s(h) {
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
        ur(y) && ur(p) && (p = Vn(!0, y, p)), r[C] = [h, p, ...x];
      }
    }
  }
}
const cc = new Nr().freeze();
function $n(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Zn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function qn(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Ei(e) {
  if (!ur(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function ki(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function mn(e) {
  return uc(e) ? e : new Ca(e);
}
function uc(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function hc(e) {
  return typeof e == "string" || pc(e);
}
function pc(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const dc = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Si = [], Ti = { allowDangerousHtml: !0 }, fc = /^(https?|ircs?|mailto|xmpp)$/i, mc = [
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
function jt(e) {
  const t = gc(e), n = Cc(e);
  return yc(t.runSync(t.parse(n), n), e);
}
function gc(e) {
  const t = e.rehypePlugins || Si, n = e.remarkPlugins || Si, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Ti } : Ti;
  return cc().use(Ko).use(n).use($1, r).use(t);
}
function Cc(e) {
  const t = e.children || "", n = new Ca();
  return typeof t == "string" && (n.value = t), n;
}
function yc(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, l = t.skipHtml, s = t.unwrapDisallowed, c = t.urlTransform || wc;
  for (const u of mc)
    Object.hasOwn(t, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + dc + u.id, void 0);
  return ma(e, h), Il(e, {
    Fragment: kn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: o,
    jsxs: S,
    passKeys: !0,
    passNode: !0
  });
  function h(u, d, C) {
    if (u.type === "raw" && C && typeof d == "number")
      return l ? C.children.splice(d, 1) : C.children[d] = { type: "text", value: u.value }, d;
    if (u.type === "element") {
      let p;
      for (p in Fn)
        if (Object.hasOwn(Fn, p) && Object.hasOwn(u.properties, p)) {
          const x = u.properties[p], y = Fn[p];
          (y === null || y.includes(u.tagName)) && (u.properties[p] = c(String(x || ""), p, u));
        }
    }
    if (u.type === "element") {
      let p = n ? !n.includes(u.tagName) : a ? a.includes(u.tagName) : !1;
      if (!p && r && typeof d == "number" && (p = !r(u, d, C)), p && C && typeof d == "number")
        return s && u.children ? C.children.splice(d, 1, ...u.children) : C.children.splice(d, 1), d;
    }
  }
}
function wc(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    fc.test(e.slice(0, t)) ? e : ""
  );
}
const st = (...e) => e.filter(Boolean).join(" "), _c = () => /* @__PURE__ */ S(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ S("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ o(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ o("g", { clipPath: "url(#clip0_121_23927)", children: /* @__PURE__ */ o(
          "path",
          {
            d: "M16.3333 26.3541L18.2133 28.2341L25.6666 20.7941V37.0208H28.3333V20.7941L35.7733 28.2474L37.6666 26.3541L26.9999 15.6874L16.3333 26.3541Z",
            fill: "white"
          }
        ) })
      ] }),
      /* @__PURE__ */ S("defs", { children: [
        /* @__PURE__ */ S(
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
              /* @__PURE__ */ o("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ o(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ o("feOffset", { dy: "1" }),
              /* @__PURE__ */ o("feGaussianBlur", { stdDeviation: "1" }),
              /* @__PURE__ */ o("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ o(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                }
              ),
              /* @__PURE__ */ o(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ o(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ o("feOffset", { dy: "1" }),
              /* @__PURE__ */ o("feGaussianBlur", { stdDeviation: "1.5" }),
              /* @__PURE__ */ o("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ o(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                }
              ),
              /* @__PURE__ */ o(
                "feBlend",
                {
                  mode: "normal",
                  in2: "effect1_dropShadow_121_23927",
                  result: "effect2_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ o(
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
        /* @__PURE__ */ o("clipPath", { id: "clip0_121_23927", children: /* @__PURE__ */ o(
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
), xc = ({ className: e, ...t }) => /* @__PURE__ */ o("form", { className: st("chat-wrapper__prompt-input", e), ...t }), ya = mr(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...l
  }, s) => {
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
    return /* @__PURE__ */ o(
      "textarea",
      {
        ref: s,
        className: st("chat-wrapper__prompt-textarea", t),
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
ya.displayName = "PromptInputTextarea";
const Ec = ({
  className: e,
  ...t
}) => /* @__PURE__ */ o("div", { className: st("chat-wrapper__prompt-toolbar", e), ...t }), kc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ o("div", { className: st("chat-wrapper__prompt-tools", e), ...t }), Sc = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = t === "default" && (typeof r == "string" || zt.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ o(
    "button",
    {
      className: st(
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
}, Tc = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = "idle",
  children: i,
  disabled: a,
  ...l
}) => {
  let s = /* @__PURE__ */ o(_c, {});
  const c = a || r === "submitted" || r === "streaming";
  return /* @__PURE__ */ o(
    "button",
    {
      className: st(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${t}`,
        `chat-wrapper__prompt-submit--${n}`,
        // status === "streaming" && "chat-wrapper__prompt-submit--stop",
        e
      ),
      type: "submit",
      disabled: c,
      ...l,
      children: i ?? s
    }
  );
}, ku = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ o("select", { className: st("chat-wrapper__prompt-select", e), ...n, children: t }), Su = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ o(
  "button",
  {
    className: st("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), Tu = ({
  className: e,
  ...t
}) => /* @__PURE__ */ o(
  "div",
  {
    className: st("chat-wrapper__prompt-select-content", e),
    ...t
  }
), bu = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ o(
  "div",
  {
    className: st("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), vu = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ o(
  "span",
  {
    className: st("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
), bc = ({
  placeholderTexts: e,
  shouldAnimate: t,
  className: n = ""
}) => {
  const [r, i] = q(0), [a, l] = q(!1), [s, c] = q(0);
  return ct(() => {
    if (!t || e.length <= 1) return;
    const h = setInterval(() => {
      l(!0), setTimeout(() => {
        i((u) => (u + 1) % e.length), c((u) => u + 1), l(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(h);
  }, [t, e.length]), ct(() => {
    t || (i(0), l(!1), c(0));
  }, [t]), /* @__PURE__ */ o(
    "div",
    {
      className: `animated-placeholder-container ${n}`,
      children: /* @__PURE__ */ o(
        "span",
        {
          className: `animated-placeholder-text ${a ? "transitioning" : ""}`,
          children: e[r]
        },
        s
      )
    }
  );
};
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: wa,
  setPrototypeOf: bi,
  isFrozen: vc,
  getPrototypeOf: Ac,
  getOwnPropertyDescriptor: Ic
} = Object;
let {
  freeze: He,
  seal: nt,
  create: pr
} = Object, {
  apply: dr,
  construct: fr
} = typeof Reflect < "u" && Reflect;
He || (He = function(t) {
  return t;
});
nt || (nt = function(t) {
  return t;
});
dr || (dr = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return t.apply(n, i);
});
fr || (fr = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const gn = Ue(Array.prototype.forEach), Nc = Ue(Array.prototype.lastIndexOf), vi = Ue(Array.prototype.pop), Qt = Ue(Array.prototype.push), Rc = Ue(Array.prototype.splice), _n = Ue(String.prototype.toLowerCase), Xn = Ue(String.prototype.toString), Yn = Ue(String.prototype.match), Jt = Ue(String.prototype.replace), Lc = Ue(String.prototype.indexOf), Mc = Ue(String.prototype.trim), at = Ue(Object.prototype.hasOwnProperty), Pe = Ue(RegExp.prototype.test), en = Oc(TypeError);
function Ue(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return dr(e, t, r);
  };
}
function Oc(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return fr(e, n);
  };
}
function K(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _n;
  bi && bi(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (vc(t) || (t[r] = a), i = a);
    }
    e[i] = !0;
  }
  return e;
}
function Dc(e) {
  for (let t = 0; t < e.length; t++)
    at(e, t) || (e[t] = null);
  return e;
}
function yt(e) {
  const t = pr(null);
  for (const [n, r] of wa(e))
    at(e, n) && (Array.isArray(r) ? t[n] = Dc(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = yt(r) : t[n] = r);
  return t;
}
function tn(e, t) {
  for (; e !== null; ) {
    const r = Ic(e, t);
    if (r) {
      if (r.get)
        return Ue(r.get);
      if (typeof r.value == "function")
        return Ue(r.value);
    }
    e = Ac(e);
  }
  function n() {
    return null;
  }
  return n;
}
const Ai = He(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Kn = He(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Qn = He(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Pc = He(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Jn = He(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Hc = He(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Ii = He(["#text"]), Ni = He(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), er = He(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Ri = He(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Cn = He(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Uc = nt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Fc = nt(/<%[\w\W]*|[\w\W]*%>/gm), zc = nt(/\$\{[\w\W]*/gm), Bc = nt(/^data-[\-\w.\u00B7-\uFFFF]+$/), Vc = nt(/^aria-[\-\w]+$/), _a = nt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Gc = nt(/^(?:\w+script|data):/i), jc = nt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), xa = nt(/^html$/i), Wc = nt(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Li = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Vc,
  ATTR_WHITESPACE: jc,
  CUSTOM_ELEMENT: Wc,
  DATA_ATTR: Bc,
  DOCTYPE_NAME: xa,
  ERB_EXPR: Fc,
  IS_ALLOWED_URI: _a,
  IS_SCRIPT_OR_DATA: Gc,
  MUSTACHE_EXPR: Uc,
  TMPLIT_EXPR: zc
});
const nn = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, $c = function() {
  return typeof window > "u" ? null : window;
}, Zc = function(t, n) {
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
}, Mi = function() {
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
function Ea() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : $c();
  const t = (L) => Ea(L);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== nn.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: l,
    Node: s,
    Element: c,
    NodeFilter: h,
    NamedNodeMap: u = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: C,
    trustedTypes: p
  } = e, x = c.prototype, y = tn(x, "cloneNode"), A = tn(x, "remove"), E = tn(x, "nextSibling"), U = tn(x, "childNodes"), N = tn(x, "parentNode");
  if (typeof l == "function") {
    const L = n.createElement("template");
    L.content && L.content.ownerDocument && (n = L.content.ownerDocument);
  }
  let P, V = "";
  const {
    implementation: w,
    createNodeIterator: z,
    createDocumentFragment: j,
    getElementsByTagName: Z
  } = n, {
    importNode: O
  } = r;
  let v = Mi();
  t.isSupported = typeof wa == "function" && typeof N == "function" && w && w.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: M,
    ERB_EXPR: Y,
    TMPLIT_EXPR: ae,
    DATA_ATTR: X,
    ARIA_ATTR: ye,
    IS_SCRIPT_OR_DATA: pe,
    ATTR_WHITESPACE: Te,
    CUSTOM_ELEMENT: $e
  } = Li;
  let {
    IS_ALLOWED_URI: g
  } = Li, Q = null;
  const Ie = K({}, [...Ai, ...Kn, ...Qn, ...Jn, ...Ii]);
  let f = null;
  const de = K({}, [...Ni, ...er, ...Ri, ...Cn]);
  let ee = Object.seal(pr(null, {
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
  })), le = null, Fe = null;
  const xe = Object.seal(pr(null, {
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
  let Ye = !0, Ke = !0, pt = !1, Ot = !0, Qe = !1, dt = !0, Oe = !1, ze = !1, _t = !1, Ne = !1, Je = !1, Re = !1, Dt = !0, Pt = !1;
  const Zt = "user-content-";
  let It = !0, ft = !1, _ = {}, T = null;
  const H = K({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let W = null;
  const J = K({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ee = null;
  const Ze = K({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), be = "http://www.w3.org/1998/Math/MathML", ve = "http://www.w3.org/2000/svg", fe = "http://www.w3.org/1999/xhtml";
  let ue = fe, et = !1, De = null;
  const Mn = K({}, [be, ve, fe], Xn);
  let xt = K({}, ["mi", "mo", "mn", "ms", "mtext"]), Nt = K({}, ["annotation-xml"]);
  const On = K({}, ["title", "style", "font", "a", "script"]);
  let Ht = null;
  const Dn = ["application/xhtml+xml", "text/html"], un = "text/html";
  let me = null, Et = null;
  const Pn = n.createElement("form"), hn = function(m) {
    return m instanceof RegExp || m instanceof Function;
  }, qt = function() {
    let m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Et && Et === m)) {
      if ((!m || typeof m != "object") && (m = {}), m = yt(m), Ht = // eslint-disable-next-line unicorn/prefer-includes
      Dn.indexOf(m.PARSER_MEDIA_TYPE) === -1 ? un : m.PARSER_MEDIA_TYPE, me = Ht === "application/xhtml+xml" ? Xn : _n, Q = at(m, "ALLOWED_TAGS") ? K({}, m.ALLOWED_TAGS, me) : Ie, f = at(m, "ALLOWED_ATTR") ? K({}, m.ALLOWED_ATTR, me) : de, De = at(m, "ALLOWED_NAMESPACES") ? K({}, m.ALLOWED_NAMESPACES, Xn) : Mn, Ee = at(m, "ADD_URI_SAFE_ATTR") ? K(yt(Ze), m.ADD_URI_SAFE_ATTR, me) : Ze, W = at(m, "ADD_DATA_URI_TAGS") ? K(yt(J), m.ADD_DATA_URI_TAGS, me) : J, T = at(m, "FORBID_CONTENTS") ? K({}, m.FORBID_CONTENTS, me) : H, le = at(m, "FORBID_TAGS") ? K({}, m.FORBID_TAGS, me) : yt({}), Fe = at(m, "FORBID_ATTR") ? K({}, m.FORBID_ATTR, me) : yt({}), _ = at(m, "USE_PROFILES") ? m.USE_PROFILES : !1, Ye = m.ALLOW_ARIA_ATTR !== !1, Ke = m.ALLOW_DATA_ATTR !== !1, pt = m.ALLOW_UNKNOWN_PROTOCOLS || !1, Ot = m.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Qe = m.SAFE_FOR_TEMPLATES || !1, dt = m.SAFE_FOR_XML !== !1, Oe = m.WHOLE_DOCUMENT || !1, Ne = m.RETURN_DOM || !1, Je = m.RETURN_DOM_FRAGMENT || !1, Re = m.RETURN_TRUSTED_TYPE || !1, _t = m.FORCE_BODY || !1, Dt = m.SANITIZE_DOM !== !1, Pt = m.SANITIZE_NAMED_PROPS || !1, It = m.KEEP_CONTENT !== !1, ft = m.IN_PLACE || !1, g = m.ALLOWED_URI_REGEXP || _a, ue = m.NAMESPACE || fe, xt = m.MATHML_TEXT_INTEGRATION_POINTS || xt, Nt = m.HTML_INTEGRATION_POINTS || Nt, ee = m.CUSTOM_ELEMENT_HANDLING || {}, m.CUSTOM_ELEMENT_HANDLING && hn(m.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (ee.tagNameCheck = m.CUSTOM_ELEMENT_HANDLING.tagNameCheck), m.CUSTOM_ELEMENT_HANDLING && hn(m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (ee.attributeNameCheck = m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), m.CUSTOM_ELEMENT_HANDLING && typeof m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (ee.allowCustomizedBuiltInElements = m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Qe && (Ke = !1), Je && (Ne = !0), _ && (Q = K({}, Ii), f = [], _.html === !0 && (K(Q, Ai), K(f, Ni)), _.svg === !0 && (K(Q, Kn), K(f, er), K(f, Cn)), _.svgFilters === !0 && (K(Q, Qn), K(f, er), K(f, Cn)), _.mathMl === !0 && (K(Q, Jn), K(f, Ri), K(f, Cn))), m.ADD_TAGS && (typeof m.ADD_TAGS == "function" ? xe.tagCheck = m.ADD_TAGS : (Q === Ie && (Q = yt(Q)), K(Q, m.ADD_TAGS, me))), m.ADD_ATTR && (typeof m.ADD_ATTR == "function" ? xe.attributeCheck = m.ADD_ATTR : (f === de && (f = yt(f)), K(f, m.ADD_ATTR, me))), m.ADD_URI_SAFE_ATTR && K(Ee, m.ADD_URI_SAFE_ATTR, me), m.FORBID_CONTENTS && (T === H && (T = yt(T)), K(T, m.FORBID_CONTENTS, me)), It && (Q["#text"] = !0), Oe && K(Q, ["html", "head", "body"]), Q.table && (K(Q, ["tbody"]), delete le.tbody), m.TRUSTED_TYPES_POLICY) {
        if (typeof m.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw en('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof m.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw en('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        P = m.TRUSTED_TYPES_POLICY, V = P.createHTML("");
      } else
        P === void 0 && (P = Zc(p, i)), P !== null && typeof V == "string" && (V = P.createHTML(""));
      He && He(m), Et = m;
    }
  }, pn = K({}, [...Kn, ...Qn, ...Pc]), Xt = K({}, [...Jn, ...Hc]), I = function(m) {
    let k = N(m);
    (!k || !k.tagName) && (k = {
      namespaceURI: ue,
      tagName: "template"
    });
    const R = _n(m.tagName), te = _n(k.tagName);
    return De[m.namespaceURI] ? m.namespaceURI === ve ? k.namespaceURI === fe ? R === "svg" : k.namespaceURI === be ? R === "svg" && (te === "annotation-xml" || xt[te]) : !!pn[R] : m.namespaceURI === be ? k.namespaceURI === fe ? R === "math" : k.namespaceURI === ve ? R === "math" && Nt[te] : !!Xt[R] : m.namespaceURI === fe ? k.namespaceURI === ve && !Nt[te] || k.namespaceURI === be && !xt[te] ? !1 : !Xt[R] && (On[R] || !pn[R]) : !!(Ht === "application/xhtml+xml" && De[m.namespaceURI]) : !1;
  }, D = function(m) {
    Qt(t.removed, {
      element: m
    });
    try {
      N(m).removeChild(m);
    } catch {
      A(m);
    }
  }, re = function(m, k) {
    try {
      Qt(t.removed, {
        attribute: k.getAttributeNode(m),
        from: k
      });
    } catch {
      Qt(t.removed, {
        attribute: null,
        from: k
      });
    }
    if (k.removeAttribute(m), m === "is")
      if (Ne || Je)
        try {
          D(k);
        } catch {
        }
      else
        try {
          k.setAttribute(m, "");
        } catch {
        }
  }, G = function(m) {
    let k = null, R = null;
    if (_t)
      m = "<remove></remove>" + m;
    else {
      const ge = Yn(m, /^[\r\n\t ]+/);
      R = ge && ge[0];
    }
    Ht === "application/xhtml+xml" && ue === fe && (m = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + m + "</body></html>");
    const te = P ? P.createHTML(m) : m;
    if (ue === fe)
      try {
        k = new C().parseFromString(te, Ht);
      } catch {
      }
    if (!k || !k.documentElement) {
      k = w.createDocument(ue, "template", null);
      try {
        k.documentElement.innerHTML = et ? V : te;
      } catch {
      }
    }
    const ke = k.body || k.documentElement;
    return m && R && ke.insertBefore(n.createTextNode(R), ke.childNodes[0] || null), ue === fe ? Z.call(k, Oe ? "html" : "body")[0] : Oe ? k.documentElement : ke;
  }, he = function(m) {
    return z.call(
      m.ownerDocument || m,
      m,
      // eslint-disable-next-line no-bitwise
      h.SHOW_ELEMENT | h.SHOW_COMMENT | h.SHOW_TEXT | h.SHOW_PROCESSING_INSTRUCTION | h.SHOW_CDATA_SECTION,
      null
    );
  }, we = function(m) {
    return m instanceof d && (typeof m.nodeName != "string" || typeof m.textContent != "string" || typeof m.removeChild != "function" || !(m.attributes instanceof u) || typeof m.removeAttribute != "function" || typeof m.setAttribute != "function" || typeof m.namespaceURI != "string" || typeof m.insertBefore != "function" || typeof m.hasChildNodes != "function");
  }, Le = function(m) {
    return typeof s == "function" && m instanceof s;
  };
  function _e(L, m, k) {
    gn(L, (R) => {
      R.call(t, m, k, Et);
    });
  }
  const rt = function(m) {
    let k = null;
    if (_e(v.beforeSanitizeElements, m, null), we(m))
      return D(m), !0;
    const R = me(m.nodeName);
    if (_e(v.uponSanitizeElement, m, {
      tagName: R,
      allowedTags: Q
    }), dt && m.hasChildNodes() && !Le(m.firstElementChild) && Pe(/<[/\w!]/g, m.innerHTML) && Pe(/<[/\w!]/g, m.textContent) || m.nodeType === nn.progressingInstruction || dt && m.nodeType === nn.comment && Pe(/<[/\w]/g, m.data))
      return D(m), !0;
    if (!(xe.tagCheck instanceof Function && xe.tagCheck(R)) && (!Q[R] || le[R])) {
      if (!le[R] && kt(R) && (ee.tagNameCheck instanceof RegExp && Pe(ee.tagNameCheck, R) || ee.tagNameCheck instanceof Function && ee.tagNameCheck(R)))
        return !1;
      if (It && !T[R]) {
        const te = N(m) || m.parentNode, ke = U(m) || m.childNodes;
        if (ke && te) {
          const ge = ke.length;
          for (let Be = ge - 1; Be >= 0; --Be) {
            const gt = y(ke[Be], !0);
            gt.__removalCount = (m.__removalCount || 0) + 1, te.insertBefore(gt, E(m));
          }
        }
      }
      return D(m), !0;
    }
    return m instanceof c && !I(m) || (R === "noscript" || R === "noembed" || R === "noframes") && Pe(/<\/no(script|embed|frames)/i, m.innerHTML) ? (D(m), !0) : (Qe && m.nodeType === nn.text && (k = m.textContent, gn([M, Y, ae], (te) => {
      k = Jt(k, te, " ");
    }), m.textContent !== k && (Qt(t.removed, {
      element: m.cloneNode()
    }), m.textContent = k)), _e(v.afterSanitizeElements, m, null), !1);
  }, mt = function(m, k, R) {
    if (Dt && (k === "id" || k === "name") && (R in n || R in Pn))
      return !1;
    if (!(Ke && !Fe[k] && Pe(X, k))) {
      if (!(Ye && Pe(ye, k))) {
        if (!(xe.attributeCheck instanceof Function && xe.attributeCheck(k, m))) {
          if (!f[k] || Fe[k]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(kt(m) && (ee.tagNameCheck instanceof RegExp && Pe(ee.tagNameCheck, m) || ee.tagNameCheck instanceof Function && ee.tagNameCheck(m)) && (ee.attributeNameCheck instanceof RegExp && Pe(ee.attributeNameCheck, k) || ee.attributeNameCheck instanceof Function && ee.attributeNameCheck(k, m)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              k === "is" && ee.allowCustomizedBuiltInElements && (ee.tagNameCheck instanceof RegExp && Pe(ee.tagNameCheck, R) || ee.tagNameCheck instanceof Function && ee.tagNameCheck(R)))
            ) return !1;
          } else if (!Ee[k]) {
            if (!Pe(g, Jt(R, Te, ""))) {
              if (!((k === "src" || k === "xlink:href" || k === "href") && m !== "script" && Lc(R, "data:") === 0 && W[m])) {
                if (!(pt && !Pe(pe, Jt(R, Te, "")))) {
                  if (R)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, kt = function(m) {
    return m !== "annotation-xml" && Yn(m, $e);
  }, St = function(m) {
    _e(v.beforeSanitizeAttributes, m, null);
    const {
      attributes: k
    } = m;
    if (!k || we(m))
      return;
    const R = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: f,
      forceKeepAttr: void 0
    };
    let te = k.length;
    for (; te--; ) {
      const ke = k[te], {
        name: ge,
        namespaceURI: Be,
        value: gt
      } = ke, Ut = me(ge), Hn = gt;
      let Ae = ge === "value" ? Hn : Mc(Hn);
      if (R.attrName = Ut, R.attrValue = Ae, R.keepAttr = !0, R.forceKeepAttr = void 0, _e(v.uponSanitizeAttribute, m, R), Ae = R.attrValue, Pt && (Ut === "id" || Ut === "name") && (re(ge, m), Ae = Zt + Ae), dt && Pe(/((--!?|])>)|<\/(style|title|textarea)/i, Ae)) {
        re(ge, m);
        continue;
      }
      if (Ut === "attributename" && Yn(Ae, "href")) {
        re(ge, m);
        continue;
      }
      if (R.forceKeepAttr)
        continue;
      if (!R.keepAttr) {
        re(ge, m);
        continue;
      }
      if (!Ot && Pe(/\/>/i, Ae)) {
        re(ge, m);
        continue;
      }
      Qe && gn([M, Y, ae], (Dr) => {
        Ae = Jt(Ae, Dr, " ");
      });
      const Or = me(m.nodeName);
      if (!mt(Or, Ut, Ae)) {
        re(ge, m);
        continue;
      }
      if (P && typeof p == "object" && typeof p.getAttributeType == "function" && !Be)
        switch (p.getAttributeType(Or, Ut)) {
          case "TrustedHTML": {
            Ae = P.createHTML(Ae);
            break;
          }
          case "TrustedScriptURL": {
            Ae = P.createScriptURL(Ae);
            break;
          }
        }
      if (Ae !== Hn)
        try {
          Be ? m.setAttributeNS(Be, ge, Ae) : m.setAttribute(ge, Ae), we(m) ? D(m) : vi(t.removed);
        } catch {
          re(ge, m);
        }
    }
    _e(v.afterSanitizeAttributes, m, null);
  }, it = function L(m) {
    let k = null;
    const R = he(m);
    for (_e(v.beforeSanitizeShadowDOM, m, null); k = R.nextNode(); )
      _e(v.uponSanitizeShadowNode, k, null), rt(k), St(k), k.content instanceof a && L(k.content);
    _e(v.afterSanitizeShadowDOM, m, null);
  };
  return t.sanitize = function(L) {
    let m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, k = null, R = null, te = null, ke = null;
    if (et = !L, et && (L = "<!-->"), typeof L != "string" && !Le(L))
      if (typeof L.toString == "function") {
        if (L = L.toString(), typeof L != "string")
          throw en("dirty is not a string, aborting");
      } else
        throw en("toString is not a function");
    if (!t.isSupported)
      return L;
    if (ze || qt(m), t.removed = [], typeof L == "string" && (ft = !1), ft) {
      if (L.nodeName) {
        const gt = me(L.nodeName);
        if (!Q[gt] || le[gt])
          throw en("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (L instanceof s)
      k = G("<!---->"), R = k.ownerDocument.importNode(L, !0), R.nodeType === nn.element && R.nodeName === "BODY" || R.nodeName === "HTML" ? k = R : k.appendChild(R);
    else {
      if (!Ne && !Qe && !Oe && // eslint-disable-next-line unicorn/prefer-includes
      L.indexOf("<") === -1)
        return P && Re ? P.createHTML(L) : L;
      if (k = G(L), !k)
        return Ne ? null : Re ? V : "";
    }
    k && _t && D(k.firstChild);
    const ge = he(ft ? L : k);
    for (; te = ge.nextNode(); )
      rt(te), St(te), te.content instanceof a && it(te.content);
    if (ft)
      return L;
    if (Ne) {
      if (Je)
        for (ke = j.call(k.ownerDocument); k.firstChild; )
          ke.appendChild(k.firstChild);
      else
        ke = k;
      return (f.shadowroot || f.shadowrootmode) && (ke = O.call(r, ke, !0)), ke;
    }
    let Be = Oe ? k.outerHTML : k.innerHTML;
    return Oe && Q["!doctype"] && k.ownerDocument && k.ownerDocument.doctype && k.ownerDocument.doctype.name && Pe(xa, k.ownerDocument.doctype.name) && (Be = "<!DOCTYPE " + k.ownerDocument.doctype.name + `>
` + Be), Qe && gn([M, Y, ae], (gt) => {
      Be = Jt(Be, gt, " ");
    }), P && Re ? P.createHTML(Be) : Be;
  }, t.setConfig = function() {
    let L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    qt(L), ze = !0;
  }, t.clearConfig = function() {
    Et = null, ze = !1;
  }, t.isValidAttribute = function(L, m, k) {
    Et || qt({});
    const R = me(L), te = me(m);
    return mt(R, te, k);
  }, t.addHook = function(L, m) {
    typeof m == "function" && Qt(v[L], m);
  }, t.removeHook = function(L, m) {
    if (m !== void 0) {
      const k = Nc(v[L], m);
      return k === -1 ? void 0 : Rc(v[L], k, 1)[0];
    }
    return vi(v[L]);
  }, t.removeHooks = function(L) {
    v[L] = [];
  }, t.removeAllHooks = function() {
    v = Mi();
  }, t;
}
var qc = Ea();
function Xc(e) {
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
function xn(e, t = !1) {
  return e;
}
function Yc(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function Oi(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || Xc(e));
  } catch {
    return !1;
  }
}
function Kc() {
  qc.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !Oi(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !Oi(n) && e.removeAttribute("src");
    }
  });
}
Kc();
const Qc = mr(
  ({
    placeholder: e = "What would you like to know?",
    placeholderTexts: t,
    disabled: n = !1,
    chatStatus: r,
    fileUploadEnabled: i = !1,
    restaurantName: a,
    restaurantLogo: l,
    hasMessages: s = !1,
    onSubmit: c,
    onFileUpload: h,
    onStopGeneration: u
  }, d) => {
    const [C, p] = q(""), [x, y] = q([]), A = Ct(null), E = t && t.length > 0 ? t : [e], U = C.length === 0 && !s && E.length > 1;
    Ma(d, () => ({
      focus: () => {
        var w;
        (w = A.current) == null || w.focus();
      },
      setText: (w) => {
        p(w), setTimeout(() => {
          var z;
          (z = A.current) == null || z.focus();
        }, 0);
      }
    }));
    const N = ce(
      (w) => {
        w.preventDefault();
        const j = new FormData(w.currentTarget).get("message");
        if (j != null && j.trim()) {
          const Z = xn(j.trim(), !1);
          if (!Z.trim()) {
            console.warn("Message was blocked due to security concerns");
            return;
          }
          c(Z, x), p(""), y([]);
        }
      },
      [c, x]
    ), P = ce(
      (w) => {
        const j = w.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
        p(j);
      },
      []
    ), V = ce(async () => {
      const w = document.createElement("input");
      w.type = "file", w.accept = "image/*", w.multiple = !1, w.onchange = async (z) => {
        const j = z.target.files;
        if (j) {
          const Z = Array.from(j).filter((O) => {
            const v = Yc(O.name);
            return v !== O.name && console.warn(
              `File name sanitized: ${O.name} -> ${v}`
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
            const O = await h(Z);
            y(O);
          }
        }
      }, w.click();
    }, [h]);
    return /* @__PURE__ */ S(xc, { onSubmit: N, style: { position: "relative" }, children: [
      /* @__PURE__ */ o(
        ya,
        {
          ref: A,
          name: "message",
          value: C,
          onChange: P,
          placeholder: "",
          disabled: n
        }
      ),
      !C.trim() && /* @__PURE__ */ o(
        bc,
        {
          placeholderTexts: E,
          shouldAnimate: U
        }
      ),
      x.length > 0 && /* @__PURE__ */ o(
        "div",
        {
          style: {
            padding: "8px 16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center"
          },
          children: x.map((w, z) => {
            const j = w.startsWith("data:image/"), Z = w.startsWith("http://") || w.startsWith("https://"), O = j || Z;
            return /* @__PURE__ */ S(
              "div",
              {
                style: {
                  position: "relative",
                  display: "inline-block"
                },
                children: [
                  O ? /* @__PURE__ */ S(
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
                        /* @__PURE__ */ o(
                          "img",
                          {
                            src: w,
                            alt: `Attachment ${z + 1}`,
                            style: {
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }
                          }
                        ),
                        /* @__PURE__ */ o(
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
                  ) : /* @__PURE__ */ S(
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
                        /* @__PURE__ */ o(
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
                            children: /* @__PURE__ */ S(
                              "svg",
                              {
                                width: "24",
                                height: "25",
                                viewBox: "0 0 24 25",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: [
                                  /* @__PURE__ */ o(
                                    "mask",
                                    {
                                      id: "mask0_190_623",
                                      style: { maskType: "alpha" },
                                      maskUnits: "userSpaceOnUse",
                                      x: "0",
                                      y: "0",
                                      width: "24",
                                      height: "25",
                                      children: /* @__PURE__ */ o(
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
                                  /* @__PURE__ */ o("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ o(
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
                        /* @__PURE__ */ S("div", { style: { flex: 1, minWidth: 0 }, children: [
                          /* @__PURE__ */ o(
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
                                const v = w.match(/name=([^;]+)/);
                                return v ? decodeURIComponent(v[1]) : "document.pdf";
                              })()
                            }
                          ),
                          /* @__PURE__ */ o(
                            "div",
                            {
                              style: {
                                color: "#9ca3af",
                                fontSize: "12px",
                                textTransform: "uppercase"
                              },
                              children: (() => {
                                const v = w.match(/data:([^;]+)/);
                                if (v) {
                                  const M = v[1];
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
                                      const Y = M.split("/")[1];
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
                  /* @__PURE__ */ o(
                    "button",
                    {
                      onClick: () => {
                        y(
                          (v) => v.filter((M, Y) => Y !== z)
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
              z
            );
          })
        }
      ),
      /* @__PURE__ */ S(Ec, { children: [
        /* @__PURE__ */ S(kc, { children: [
          i && /* @__PURE__ */ S(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center"
              },
              children: [
                /* @__PURE__ */ o(
                  Sc,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: V,
                    title: x.length > 0 ? `${x.length} image(s) attached` : "Attach image",
                    disabled: n,
                    style: {
                      position: "relative"
                    },
                    children: /* @__PURE__ */ S(
                      "svg",
                      {
                        width: "36",
                        height: "37",
                        viewBox: "0 0 36 37",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [
                          /* @__PURE__ */ o(
                            "rect",
                            {
                              y: "0.354126",
                              width: "36",
                              height: "36",
                              rx: "18",
                              fill: "#F4F6F8"
                            }
                          ),
                          /* @__PURE__ */ o("g", { "clip-path": "url(#clip0_121_9706)", children: /* @__PURE__ */ o(
                            "path",
                            {
                              d: "M21.3334 13.3541V22.9374C21.3334 24.7791 19.8417 26.2708 18 26.2708C16.1584 26.2708 14.6667 24.7791 14.6667 22.9374V12.5208C14.6667 11.3708 15.6 10.4374 16.75 10.4374C17.9 10.4374 18.8334 11.3708 18.8334 12.5208V21.2708C18.8334 21.7291 18.4584 22.1041 18 22.1041C17.5417 22.1041 17.1667 21.7291 17.1667 21.2708V13.3541H15.9167V21.2708C15.9167 22.4208 16.85 23.3541 18 23.3541C19.15 23.3541 20.0834 22.4208 20.0834 21.2708V12.5208C20.0834 10.6791 18.5917 9.18744 16.75 9.18744C14.9084 9.18744 13.4167 10.6791 13.4167 12.5208V22.9374C13.4167 25.4708 15.4667 27.5208 18 27.5208C20.5334 27.5208 22.5834 25.4708 22.5834 22.9374V13.3541H21.3334Z",
                              fill: "#212B36"
                            }
                          ) }),
                          /* @__PURE__ */ o("defs", { children: /* @__PURE__ */ o("clipPath", { id: "clip0_121_9706", children: /* @__PURE__ */ o(
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
                /* @__PURE__ */ o(
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
          i && a && /* @__PURE__ */ o("div", { className: "chat-wrapper__divider" }),
          a && /* @__PURE__ */ S("div", { className: "chat-wrapper__restaurant-chip", children: [
            l && /* @__PURE__ */ o(
              "img",
              {
                src: l,
                alt: "Restaurant logo",
                className: "chat-wrapper__restaurant-logo"
              }
            ),
            /* @__PURE__ */ o("span", { className: "chat-wrapper__restaurant-name", children: a })
          ] })
        ] }),
        /* @__PURE__ */ o(
          Tc,
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
), Jc = ({
  prompts: e,
  onPromptSelect: t
}) => /* @__PURE__ */ S("div", { className: "chat-wrapper__suggested-prompts", children: [
  /* @__PURE__ */ o("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
  /* @__PURE__ */ o("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((n, r) => /* @__PURE__ */ o(
    "button",
    {
      className: "chat-wrapper__suggested-prompt-card",
      onClick: () => t(n),
      children: /* @__PURE__ */ S("div", { className: "chat-wrapper__suggested-prompt-content", children: [
        /* @__PURE__ */ o("h4", { className: "chat-wrapper__suggested-prompt-title", children: n.title }),
        /* @__PURE__ */ o("p", { className: "chat-wrapper__suggested-prompt-description", children: n.description })
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
}, Se = {
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
  getMessageType: (e, t) => t === !1 ? Se.isErrorMessage(e) ? F.MESSAGE_TYPES.ERROR : (Se.isThinkingMessage(e) && e.includes("for") && e.includes("seconds") || Se.isThinkingMessage(e), F.MESSAGE_TYPES.THOUGHT) : Se.isCompletedMessage(e) ? F.MESSAGE_TYPES.COMPLETED : Se.isErrorMessage(e) ? F.MESSAGE_TYPES.ERROR : (Se.isHandlingMessage(e) || Se.isThinkingMessage(e) && !e.includes(F.UI_TEXT.AI_IS_THINKING), F.MESSAGE_TYPES.THINKING)
};
function ka({ children: e, isStreaming: t }) {
  const [n, r] = q(!0), [i, a] = q(!1);
  zt.useEffect(() => {
    !t && !i ? (a(!0), r(!1)) : t && (a(!1), r(!0));
  }, [t, i]);
  const l = () => {
    t || r(!n);
  }, s = zt.Children.map(e, (c) => {
    if (zt.isValidElement(c)) {
      if (c.type === Rr)
        return zt.cloneElement(
          c,
          {
            onToggle: l,
            isExpanded: n
          }
        );
      if (c.type === Lr)
        return zt.cloneElement(
          c,
          {
            isVisible: n
          }
        );
    }
    return c;
  });
  return /* @__PURE__ */ o("div", { className: "chat-wrapper__reasoning", children: s });
}
function Rr({
  title: e,
  status: t = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const a = () => /* @__PURE__ */ S(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ o(
          "mask",
          {
            id: "mask0_64_36210",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "16",
            height: "16",
            children: /* @__PURE__ */ o("rect", { width: "16", height: "16", fill: "#D9D9D9" })
          }
        ),
        /* @__PURE__ */ o("g", { mask: "url(#mask0_64_36210)", children: /* @__PURE__ */ o(
          "path",
          {
            d: "M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z",
            fill: "#637381"
          }
        ) })
      ]
    }
  ), l = t === "completed" || e.includes(F.UI_TEXT.THINKING) || e.includes(F.UI_TEXT.PROCESSING);
  return /* @__PURE__ */ S(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${l ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: l ? r : void 0,
      style: { cursor: l ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ o("div", { className: "chat-wrapper__reasoning-icon", children: a() }),
        /* @__PURE__ */ S("span", { className: "chat-wrapper__reasoning-title", children: [
          e,
          n && t === "completed" && /* @__PURE__ */ o("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        l && /* @__PURE__ */ o(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ S(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ o(
                    "mask",
                    {
                      id: "mask0_44_18068",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ o("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ o("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ o(
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
function Lr({
  children: e,
  isVisible: t = !0
}) {
  return t ? /* @__PURE__ */ o("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ o("div", { className: "chat-wrapper__reasoning-text", children: e }) }) : null;
}
function Sa({ children: e }) {
  return /* @__PURE__ */ o("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function Ta({
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
  return l && (l.startsWith("http://") || l.startsWith("https://") || (l = l.charAt(0).toUpperCase() + l.slice(1))), /* @__PURE__ */ o("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ S("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ S("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ o("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ o("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ o("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ o("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ S(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ o(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ o("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ o("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ o(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ o("span", { children: l }),
          /* @__PURE__ */ S("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ S(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ o(
                    "mask",
                    {
                      id: "mask0_64_36278",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ o("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ o("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ o(
                    "path",
                    {
                      d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ o("span", { children: "Running..." })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ S("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ S("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ o("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ o("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ o("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ o("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ S(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ o(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ o("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ o("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ o(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ o("span", { children: l }),
          /* @__PURE__ */ S("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ S(
              "svg",
              {
                width: "20",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ o(
                    "mask",
                    {
                      id: "mask0_64_36345",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ o("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ o("g", { mask: "url(#mask0_64_36345)", children: /* @__PURE__ */ o(
                    "path",
                    {
                      d: "M7.1501 10.7819L11.1168 6.83193L10.2668 5.98193L7.1501 9.08193L5.73343 7.68193L4.88343 8.53193L7.1501 10.7819ZM8.0001 14.7819C7.12232 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.643 2.1001 10.8653C1.76676 10.0875 1.6001 9.25971 1.6001 8.38193C1.6001 7.49304 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73899 2.81527 5.51676 2.48193C6.29454 2.1486 7.12232 1.98193 8.0001 1.98193C8.88899 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11805 13.9001 5.89027C14.2334 6.66249 14.4001 7.49304 14.4001 8.38193C14.4001 9.25971 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.264 13.9486 10.4918 14.2819C9.71954 14.6153 8.88899 14.7819 8.0001 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819Z",
                      fill: "#4EAD13"
                    }
                  ) })
                ]
              }
            ) }) }),
            /* @__PURE__ */ o("span", { children: "Completed" })
          ] })
        ] });
      case "error":
        return /* @__PURE__ */ S("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ o("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ o(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ o(
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
          /* @__PURE__ */ o("span", { className: "chat-wrapper__tooling-handle-title", children: e })
        ] });
      default:
        return /* @__PURE__ */ S("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ S("svg", { width: "20", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ o("mask", { id: "mask0_210_25142", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: /* @__PURE__ */ o("rect", { width: "16", height: "16", fill: "#D9D9D9" }) }),
            /* @__PURE__ */ o("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ o("path", { d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z", fill: "#637381" }) })
          ] }) : /* @__PURE__ */ S(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ o(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ o("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ o("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ o(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ S("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ S(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ o(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ o(
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
                /* @__PURE__ */ o("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ o(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ S(
            "svg",
            {
              width: "20",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ o(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ o("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ o("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ o(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ o("span", { children: "Pending..." })
        ] });
    }
  })() });
}
function Mr({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ S("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ o("span", {}),
    /* @__PURE__ */ o("span", {}),
    /* @__PURE__ */ o("span", {})
  ] }) : t === "pulse" ? /* @__PURE__ */ o(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ o(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: e, height: e }
    }
  );
}
const eu = ({
  size: e = 20,
  fullHeight: t = !1
}) => /* @__PURE__ */ o(
  "div",
  {
    className: `chat-wrapper__inline-loader ${t ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ o("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ o(Mr, { size: e, variant: "dots" }) })
  }
);
async function tu(e, t) {
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
async function nu(e, t, n) {
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
const ru = ({
  isOpen: e,
  onClose: t,
  app: n,
  apiUrl: r
}) => {
  const [i, a] = q(null), [l, s] = q(""), [c, h] = q(""), [u, d] = q(!1), [C, p] = q(null);
  ct(() => {
    e && !i && x();
  }, [e]);
  const x = ce(async () => {
    d(!0), p(null);
    try {
      const E = await tu(r, n);
      a(E), s(E.promptPath), h(E.versionUuid);
    } catch (E) {
      p(E instanceof Error ? E.message : "Failed to fetch configuration"), console.error("Error fetching agent configuration:", E);
    } finally {
      d(!1);
    }
  }, [r, n]), y = ce(async () => {
    if (i) {
      d(!0), p(null);
      try {
        const E = await nu(r, n, {
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
  }, [r, n, l, c, i, t]), A = ce(() => {
    i && (s(i.promptPath), h(i.versionUuid)), p(null), t();
  }, [i, t]);
  return e ? /* @__PURE__ */ o("div", { className: "chat-wrapper__dev-settings-overlay", children: /* @__PURE__ */ S("div", { className: "chat-wrapper__dev-settings-popup", children: [
    /* @__PURE__ */ S("div", { className: "chat-wrapper__dev-settings-header", children: [
      /* @__PURE__ */ o("h3", { children: "Developer Settings" }),
      /* @__PURE__ */ o(
        "button",
        {
          className: "chat-wrapper__dev-settings-close",
          onClick: A,
          title: "Close settings",
          children: /* @__PURE__ */ o(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ o(
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
    /* @__PURE__ */ S("div", { className: "chat-wrapper__dev-settings-content", children: [
      u && /* @__PURE__ */ o("div", { className: "chat-wrapper__dev-settings-loading", children: "Loading configuration..." }),
      C && /* @__PURE__ */ S("div", { className: "chat-wrapper__dev-settings-error", children: [
        /* @__PURE__ */ S("p", { children: [
          "Error: ",
          C
        ] }),
        /* @__PURE__ */ o(
          "button",
          {
            onClick: x,
            className: "chat-wrapper__dev-settings-retry",
            children: "Retry"
          }
        )
      ] }),
      i && !u && /* @__PURE__ */ S(kn, { children: [
        /* @__PURE__ */ S("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ o("label", { htmlFor: "agent-prompt-path", children: "Prompt Path:" }),
          /* @__PURE__ */ o(
            "input",
            {
              id: "agent-prompt-path",
              type: "text",
              value: l,
              onChange: (E) => s(E.target.value),
              placeholder: "e.g., /prompts/custom-agent.md",
              className: "chat-wrapper__dev-settings-input",
              disabled: u
            }
          ),
          /* @__PURE__ */ o("p", { className: "chat-wrapper__dev-settings-help", children: "Path to the agent prompt file." })
        ] }),
        /* @__PURE__ */ S("div", { className: "chat-wrapper__dev-settings-field", children: [
          /* @__PURE__ */ o("label", { htmlFor: "version-uuid", children: "Version UUID:" }),
          /* @__PURE__ */ o(
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
          /* @__PURE__ */ o("p", { className: "chat-wrapper__dev-settings-help", children: "Version UUID for the agent configuration." })
        ] }),
        /* @__PURE__ */ o("div", { className: "chat-wrapper__dev-settings-info", children: /* @__PURE__ */ S("p", { children: [
          /* @__PURE__ */ o("strong", { children: "App:" }),
          " ",
          n
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ S("div", { className: "chat-wrapper__dev-settings-footer", children: [
      /* @__PURE__ */ o(
        "button",
        {
          className: "chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel",
          onClick: A,
          disabled: u,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ o(
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
}, ba = ({ className: e, onClick: t }) => /* @__PURE__ */ S(
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
      /* @__PURE__ */ o("mask", { id: "mask0_444_23118", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "18", height: "18", children: /* @__PURE__ */ o("rect", { width: "18", height: "18", fill: "#D9D9D9" }) }),
      /* @__PURE__ */ o("g", { mask: "url(#mask0_444_23118)", children: /* @__PURE__ */ o("path", { d: "M5.8498 13.4998C5.47855 13.4998 5.16074 13.3676 4.89637 13.1032C4.63199 12.8389 4.4998 12.5211 4.4998 12.1498V3.1498C4.4998 2.77855 4.63199 2.46074 4.89637 2.19637C5.16074 1.93199 5.47855 1.7998 5.8498 1.7998H14.8498C15.2211 1.7998 15.5389 1.93199 15.8032 2.19637C16.0676 2.46074 16.1998 2.77855 16.1998 3.1498V12.1498C16.1998 12.5211 16.0676 12.8389 15.8032 13.1032C15.5389 13.3676 15.2211 13.4998 14.8498 13.4998H5.8498ZM5.8498 12.1498H14.8498V3.1498H5.8498V12.1498ZM3.1498 16.1998C2.77855 16.1998 2.46074 16.0676 2.19637 15.8032C1.93199 15.5389 1.7998 15.2211 1.7998 14.8498V4.4998H3.1498V14.8498H13.4998V16.1998H3.1498Z", fill: "currentColor" }) })
    ]
  }
), iu = ({ message: e }) => {
  const [t, n] = q(!0);
  return /* @__PURE__ */ S("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ S(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!t),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          e.role === "system" ? /* @__PURE__ */ S("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ S(
              "svg",
              {
                width: "20",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ o(
                    "mask",
                    {
                      id: "mask0_64_36257",
                      style: { maskType: "alpha" },
                      maskUnits: "userSpaceOnUse",
                      x: "0",
                      y: "0",
                      width: "16",
                      height: "17",
                      children: /* @__PURE__ */ o("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                    }
                  ),
                  /* @__PURE__ */ o("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ o(
                    "path",
                    {
                      d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                      fill: "#637381"
                    }
                  ) })
                ]
              }
            ) }),
            /* @__PURE__ */ o("span", { children: "AI text input <show-toolname>..." })
          ] }) : /* @__PURE__ */ o("span", { children: "System Message" }),
          /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ S(
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
                /* @__PURE__ */ o(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ o("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ o("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ o(
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
    t && /* @__PURE__ */ o("div", { className: "chat-wrapper__system-message-content", children: /* @__PURE__ */ o("span", { children: e.content }) })
  ] });
}, va = {
  pre: ({ children: e, ...t }) => /* @__PURE__ */ o("pre", { className: "chat-wrapper__code-block", ...t, children: e }),
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ o("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ o("code", { className: "chat-wrapper__code-block", ...n, children: e }),
  ul: ({ children: e, ...t }) => /* @__PURE__ */ o("ul", { className: "chat-wrapper__list", ...t, children: e }),
  ol: ({ children: e, ...t }) => /* @__PURE__ */ o("ol", { className: "chat-wrapper__ordered-list", ...t, children: e }),
  li: ({ children: e, ...t }) => /* @__PURE__ */ o("li", { className: "chat-wrapper__list-item", ...t, children: e })
}, au = {
  ...va,
  code: ({ children: e, className: t, ...n }) => !t ? /* @__PURE__ */ o("code", { className: "chat-wrapper__inline-code", ...n, children: e }) : /* @__PURE__ */ o("code", { className: "chat-wrapper__code", ...n, children: e })
}, Aa = An(({
  message: e,
  getReasoningTitle: t,
  getReasoningStatus: n,
  getReasoningDuration: r,
  getReasoningContentOnly: i,
  getToolingTitle: a,
  getToolingStatus: l,
  clientTools: s,
  currentAssistantMessageIdRef: c
}) => {
  const [h, u] = q(!1), [d, C] = q(!1), p = ce(async () => {
    try {
      await navigator.clipboard.writeText(e.content), u(!0), setTimeout(() => u(!1), 2e3);
    } catch (V) {
      console.error("Failed to copy message:", V);
    }
  }, [e.content]), x = () => /* @__PURE__ */ S("div", { className: "chat-wrapper__streaming-placeholder", children: [
    /* @__PURE__ */ o(Mr, { size: 16, variant: "dots" }),
    /* @__PURE__ */ o("span", { children: F.UI_TEXT.THINKING })
  ] }), y = () => /* @__PURE__ */ S("div", { className: "chat-wrapper__copy-button-container", children: [
    d && /* @__PURE__ */ o(
      "button",
      {
        className: "chat-wrapper__copy-button",
        onClick: p,
        title: "Copy message",
        children: /* @__PURE__ */ o(ba, {})
      }
    ),
    h && /* @__PURE__ */ o("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
  ] }), A = () => /* @__PURE__ */ o("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ S("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
    /* @__PURE__ */ o("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ o(jt, { components: va, children: e.content }) }),
    y()
  ] }) }), E = () => /* @__PURE__ */ S("div", { className: "chat-wrapper__regular-message", children: [
    /* @__PURE__ */ o("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ o(jt, { components: au, children: e.content }) }),
    e.media && e.media.length > 0 && /* @__PURE__ */ o("div", { className: "chat-wrapper__media", children: e.media.map((V, w) => /* @__PURE__ */ o(
      "img",
      {
        src: V,
        alt: `Uploaded content ${w + 1}`,
        className: "chat-wrapper__media-image"
      },
      w
    )) })
  ] }), U = () => e.role === "assistant" && e.isStreaming && e.content === "" && e.id === c.current ? x() : e.role === "system" ? /* @__PURE__ */ o(iu, { message: e }) : e.role === "assistant" ? A() : E(), N = () => /* @__PURE__ */ S(ka, { isStreaming: e.isStreaming || !1, children: [
    /* @__PURE__ */ o(
      Rr,
      {
        title: t(e.content, e.isStreaming),
        status: n(e.content, e.isStreaming),
        duration: r(e.content)
      }
    ),
    /* @__PURE__ */ o(Lr, { children: i(e.content) })
  ] }), P = () => {
    var V;
    return /* @__PURE__ */ o(Sa, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ o(
      Ta,
      {
        title: a(e.content, e.isStreaming),
        status: l(e.content, e.isStreaming),
        toolData: e.toolData,
        toolName: (V = e.toolData) == null ? void 0 : V.toolName,
        clientTools: s
      }
    ) });
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
      onMouseEnter: () => e.role === "assistant" && C(!0),
      onMouseLeave: () => e.role === "assistant" && C(!1),
      children: e.role === "reasoning" ? N() : e.role === "tooling" ? P() : /* @__PURE__ */ o("div", { className: "chat-wrapper__message-content", children: U() })
    }
  );
});
Aa.displayName = "MessageItem";
const lu = ({ isVisible: e }) => e ? /* @__PURE__ */ o("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ S("div", { className: "chat-wrapper__thinking-dots", children: [
  /* @__PURE__ */ o("span", {}),
  /* @__PURE__ */ o("span", {}),
  /* @__PURE__ */ o("span", {})
] }) }) }) }) : null, Ia = mr(({
  messages: e,
  isThinking: t,
  isHandlingTool: n,
  getReasoningTitle: r,
  getReasoningStatus: i,
  getReasoningDuration: a,
  getReasoningContentOnly: l,
  getToolingTitle: s,
  getToolingStatus: c,
  clientTools: h,
  currentAssistantMessageIdRef: u
}, d) => /* @__PURE__ */ S("div", { className: "chat-wrapper__messages", children: [
  e.map((C) => /* @__PURE__ */ o(
    Aa,
    {
      message: C,
      getReasoningTitle: r,
      getReasoningStatus: i,
      getReasoningDuration: a,
      getReasoningContentOnly: l,
      getToolingTitle: s,
      getToolingStatus: c,
      clientTools: h,
      currentAssistantMessageIdRef: u
    },
    C.id
  )),
  /* @__PURE__ */ o(lu, { isVisible: t && !n }),
  /* @__PURE__ */ o("div", { ref: d })
] }));
Ia.displayName = "MessagesList";
const su = {
  maxReconnectAttempts: 5,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, ou = {
  NORMAL: 1e3,
  GOING_AWAY: 1001
};
var lt = /* @__PURE__ */ ((e) => (e.CONNECTION_ESTABLISHED = "connection_established", e.CONNECTION_LOST = "connection_lost", e.CONNECTION_RESTORED = "connection_restored", e.CONNECTION_FAILED = "connection_failed", e.RECONNECTING = "reconnecting", e.CHAT_COMPLETED = "chat_completed", e.CHAT_ERROR = "chat_error", e))(lt || {}), wt = /* @__PURE__ */ ((e) => (e.CHAT_MESSAGE = "chat_message", e.CONFIGURE_TOOLS = "configure_tools", e.UPDATE_TOOLS = "update_tools", e.UPDATE_CONTEXT_HELPERS = "update_context_helpers", e.TOOL_CALL_RESPONSE = "tool_call_response", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_PONG = "heartbeat_pong", e))(wt || {}), Ge = /* @__PURE__ */ ((e) => (e.SESSION_ESTABLISHED = "session_established", e.TOOLS_CONFIGURED = "tools_configured", e.CLIENT_TOOLS_UPDATED = "client_tools_updated", e.CONFIGURE_TOOLS = "configure_tools", e.CHAT_EVENT = "chat_event", e.CHAT_FINISHED = "chat_finished", e.CHAT_ERROR = "chat_error", e.TOOL_CALL_REQUEST = "tool_call_request", e.HEARTBEAT_PING = "heartbeat_ping", e.HEARTBEAT_ACK = "heartbeat_ack", e.ERROR = "error", e))(Ge || {}), En = /* @__PURE__ */ ((e) => (e.PROVIDER_EVENT = "provider-event", e.LATITUDE_EVENT = "latitude-event", e.CONTENT_DELTA = "content-delta", e))(En || {}), bt = /* @__PURE__ */ ((e) => (e.TEXT_DELTA = "text-delta", e.REASONING_START = "reasoning-start", e.REASONING_DELTA = "reasoning-delta", e.REASONING_END = "reasoning-end", e.TOOL_CALL = "tool-call", e.TOOL_RESULT = "tool-result", e))(bt || {});
class Gt {
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
class vt {
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
class cu {
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
    const { NORMAL: n, GOING_AWAY: r } = ou;
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
        Gt.connectionLost("Max reconnection attempts reached")
      ));
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const t = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    (a = this.onSystemEvent) == null || a.call(this, Gt.reconnecting(t, n)), this.reconnectTimer = window.setTimeout(() => {
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
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (t = this.onSystemEvent) == null || t.call(this, Gt.connectionRestored()), (n = this.onOpen) == null || n.call(this);
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
    const t = vt.serializeHeartbeatPing();
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
class uu {
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
class vn {
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
class Na {
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
class hu extends Na {
  constructor(n) {
    super({ onReasoningUpdate: n });
    ie(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    ie(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, l) {
    const s = this.getHandler("onReasoningUpdate");
    if (!s) return;
    const c = vn.createReasoningCall(
      i,
      a,
      l || {}
    );
    s(n, r, c);
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
    const s = i || F.UI_TEXT.THOUGHT, c = `${F.THOUGHT_PREFIX} ${s}${l}`;
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
class pu extends Na {
  constructor(n = {}, r) {
    super({ onReasoningUpdate: r });
    ie(this, "processedToolCalls", /* @__PURE__ */ new Set());
    ie(this, "clientTools", {});
    ie(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var l, s, c;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      this.processedToolCalls.add(r), (l = this.getHandler("onReasoningUpdate")) == null || l(!0, `${F.HANDLING_MARKER} ${i}`, n);
      try {
        const h = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, h), (s = this.getHandler("onReasoningUpdate")) == null || s(!1, `${F.COMPLETED_MARKER} ${i}`, n);
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
    const i = vt.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = vt.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = vn.createLatitudeToolCall(
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
      const a = vn.createLatitudeToolCall(
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
class du {
  constructor(t, n = {}) {
    ie(this, "reasoningHandler");
    ie(this, "toolHandler");
    ie(this, "handlers");
    ie(this, "sendMessage");
    this.handlers = t, this.reasoningHandler = new hu(t.onReasoningUpdate), this.toolHandler = new pu(n, t.onReasoningUpdate);
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
      case En.PROVIDER_EVENT:
        this.handleProviderEvent(t);
        break;
      case En.LATITUDE_EVENT:
        this.handleLatitudeEvent(t);
        break;
      case En.CONTENT_DELTA:
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
        const i = vn.createServerToolCall(
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
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Gt.chatCompleted(t.uuid));
  }
  handleChatError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Gt.chatError(t.error || "Unknown error"));
  }
  handleToolCallRequest(t) {
    this.toolHandler.handleToolCallRequest(t);
  }
  handleHeartbeatPing(t) {
    if (!this.sendMessage)
      return;
    const n = vt.serializeHeartbeatPong(
      t.timestamp,
      t.pingTime
    );
    this.sendMessage(n);
  }
  handleError(t) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Gt.chatError(t.error || "Unknown WebSocket error"));
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
class fu {
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
      ...su
    }, this.connectionState = new uu(), this.wsManager = new cu(this.config, this.connectionState), this.messageHandler = new du({}), this.setupWebSocketHandlers();
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
    const t = vt.serializeConfigureTools(
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
      const s = vt.serializeChatMessage({
        content: n,
        app: r,
        media: i,
        userId: this.config.userId,
        convUuid: a,
        agentPromptPath: l,
        saveToDatabase: !1
      });
      this.wsManager.send(s);
    } catch (s) {
      throw s;
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
    const n = vt.serializeUpdateContextHelpers(this.contextHelpers);
    this.wsManager.send(n);
  }
  addClientTools(t, n) {
    this.messageHandler.updateClientTools(t), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = vt.serializeUpdateTools(this.toolSchemas);
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
async function Au(e, t, n) {
  const r = new URLSearchParams();
  n != null && n.includeArchived && r.append("includeArchived", "true"), n != null && n.limit && r.append("limit", n.limit.toString());
  const i = `${e}/threads/user/${t}${r.toString() ? `?${r.toString()}` : ""}`, a = await fetch(i);
  if (!a.ok) {
    const s = await a.json().catch(() => ({
      error: "Failed to fetch threads"
    }));
    throw new Error(s.error || "Failed to fetch threads");
  }
  return (await a.json()).threads;
}
async function Iu(e, t) {
  const n = `${e}/threads/conv/${t}`, r = await fetch(n);
  if (!r.ok) {
    const i = await r.json().catch(() => ({
      error: "Thread not found"
    }));
    throw new Error(i.error || "Thread not found");
  }
  return r.json();
}
async function mu(e, t) {
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
async function Nu(e, t) {
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
async function Ru(e, t, n, r) {
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
const gu = An(
  ({
    message: e,
    getReasoningTitle: t,
    getReasoningStatus: n,
    getReasoningDuration: r,
    getReasoningContentOnly: i,
    getToolingTitle: a,
    getToolingStatus: l,
    clientTools: s,
    currentAssistantMessageIdRef: c
  }) => {
    var x;
    const [h, u] = q(!1), [d, C] = q(!1), p = ce(async () => {
      try {
        await navigator.clipboard.writeText(e.content), u(!0), setTimeout(() => u(!1), 2e3);
      } catch (y) {
        console.error("Failed to copy message:", y);
      }
    }, [e.content]);
    return /* @__PURE__ */ o(
      "div",
      {
        className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
        onMouseEnter: () => e.role === "assistant" && C(!0),
        onMouseLeave: () => e.role === "assistant" && C(!1),
        children: e.role === "reasoning" ? (
          /* Reasoning message - no content wrapper */
          /* @__PURE__ */ S(ka, { isStreaming: e.isStreaming || !1, children: [
            /* @__PURE__ */ o(
              Rr,
              {
                title: t(e.content, e.isStreaming),
                status: n(e.content, e.isStreaming),
                duration: r(e.content)
              }
            ),
            /* @__PURE__ */ o(Lr, { children: i(e.content) })
          ] })
        ) : e.role === "tooling" ? (
          /* Tooling message - no content wrapper */
          /* @__PURE__ */ o(Sa, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ o(
            Ta,
            {
              title: a(e.content, e.isStreaming),
              status: l(e.content, e.isStreaming),
              toolData: e.toolData,
              toolName: (x = e.toolData) == null ? void 0 : x.toolName,
              clientTools: s
            }
          ) })
        ) : /* @__PURE__ */ o("div", { className: "chat-wrapper__message-content", children: e.role === "assistant" && e.isStreaming && e.content === "" && e.id === c.current ? (
          /* Show streaming indicator when no content yet */
          /* @__PURE__ */ S("div", { className: "chat-wrapper__streaming-placeholder", children: [
            /* @__PURE__ */ o(Mr, { size: 16, variant: "dots" }),
            /* @__PURE__ */ o("span", { children: F.UI_TEXT.THINKING })
          ] })
        ) : e.role === "system" ? (
          /* System message with collapsible tool result */
          /* @__PURE__ */ o(yu, { message: e })
        ) : e.role === "assistant" ? (
          /* Assistant message with regular markdown display */
          /* @__PURE__ */ S("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: [
            d && /* @__PURE__ */ o(
              "button",
              {
                className: "chat-wrapper__copy-button",
                onClick: p,
                title: "Copy message",
                children: /* @__PURE__ */ o(ba, {})
              }
            ),
            h && /* @__PURE__ */ o("div", { className: "chat-wrapper__copied-notification", children: "Copied!" }),
            /* @__PURE__ */ o("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ o(
              jt,
              {
                components: {
                  pre: ({ children: y }) => /* @__PURE__ */ o("pre", { className: "chat-wrapper__code-block", children: y }),
                  code: ({ children: y, className: A }) => !A ? /* @__PURE__ */ o("code", { className: "chat-wrapper__inline-code", children: y }) : /* @__PURE__ */ o("code", { className: "chat-wrapper__code-block", children: y }),
                  ul: ({ children: y }) => /* @__PURE__ */ o("ul", { className: "chat-wrapper__list", children: y }),
                  ol: ({ children: y }) => /* @__PURE__ */ o("ol", { className: "chat-wrapper__ordered-list", children: y }),
                  li: ({ children: y }) => /* @__PURE__ */ o("li", { className: "chat-wrapper__list-item", children: y })
                },
                children: e.content
              }
            ) })
          ] })
        ) : (
          /* User message display with markdown */
          /* @__PURE__ */ S("div", { className: "chat-wrapper__regular-message", children: [
            /* @__PURE__ */ o("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ o(
              jt,
              {
                components: {
                  pre: ({ children: y }) => /* @__PURE__ */ o("pre", { className: "chat-wrapper__code-block", children: y }),
                  code: ({ children: y, className: A }) => !A ? /* @__PURE__ */ o("code", { className: "chat-wrapper__inline-code", children: y }) : /* @__PURE__ */ o("code", { className: "chat-wrapper__code", children: y }),
                  p: ({ children: y }) => /* @__PURE__ */ o("p", { className: "chat-wrapper__paragraph", children: y }),
                  h1: ({ children: y }) => /* @__PURE__ */ o("h1", { className: "chat-wrapper__heading-1", children: y }),
                  h2: ({ children: y }) => /* @__PURE__ */ o("h2", { className: "chat-wrapper__heading-2", children: y }),
                  h3: ({ children: y }) => /* @__PURE__ */ o("h3", { className: "chat-wrapper__heading-3", children: y }),
                  ul: ({ children: y }) => /* @__PURE__ */ o("ul", { className: "chat-wrapper__list", children: y }),
                  ol: ({ children: y }) => /* @__PURE__ */ o("ol", { className: "chat-wrapper__ordered-list", children: y }),
                  li: ({ children: y }) => /* @__PURE__ */ o("li", { className: "chat-wrapper__list-item", children: y }),
                  blockquote: ({ children: y }) => /* @__PURE__ */ o("blockquote", { className: "chat-wrapper__blockquote", children: y }),
                  strong: ({ children: y }) => /* @__PURE__ */ o("strong", { className: "chat-wrapper__bold", children: y }),
                  em: ({ children: y }) => /* @__PURE__ */ o("em", { className: "chat-wrapper__italic", children: y })
                },
                children: e.content.trim()
              }
            ) }),
            e.role === "user" && e.media && e.media.length > 0 && /* @__PURE__ */ o(
              "div",
              {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "4px",
                  justifyContent: "flex-end"
                },
                children: e.media.map((y, A) => {
                  const E = y.startsWith("data:image/"), U = y.startsWith("http://") || y.startsWith("https://");
                  return /* @__PURE__ */ o(
                    "div",
                    {
                      style: {
                        position: "relative",
                        display: "inline-block"
                      },
                      children: E || U ? /* @__PURE__ */ S(
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
                            /* @__PURE__ */ o(
                              "img",
                              {
                                src: y,
                                alt: `Attachment ${A + 1}`,
                                style: {
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover"
                                }
                              }
                            ),
                            /* @__PURE__ */ o(
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
                      ) : /* @__PURE__ */ S(
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
                            /* @__PURE__ */ o(
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
                                children: /* @__PURE__ */ S(
                                  "svg",
                                  {
                                    width: "24",
                                    height: "25",
                                    viewBox: "0 0 24 25",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: [
                                      /* @__PURE__ */ o(
                                        "mask",
                                        {
                                          id: "mask0_190_623",
                                          style: { maskType: "alpha" },
                                          maskUnits: "userSpaceOnUse",
                                          x: "0",
                                          y: "0",
                                          width: "24",
                                          height: "25",
                                          children: /* @__PURE__ */ o(
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
                                      /* @__PURE__ */ o("g", { mask: "url(#mask0_190_623)", children: /* @__PURE__ */ o(
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
                            /* @__PURE__ */ S("div", { style: { flex: 1, minWidth: 0 }, children: [
                              /* @__PURE__ */ o(
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
                              /* @__PURE__ */ o(
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
                                      const V = P[1];
                                      switch (V) {
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
                                          const w = V.split("/")[1];
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
                    A
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
gu.displayName = "MessageComponent";
const Cu = An(
  ({ content: e, messageId: t }) => !t || !e ? null : /* @__PURE__ */ o("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ o("div", { className: "chat-wrapper__message-content", children: /* @__PURE__ */ o("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ o("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ o(
    jt,
    {
      components: {
        pre: ({ children: n }) => /* @__PURE__ */ o("pre", { className: "chat-wrapper__code-block", children: n }),
        code: ({ children: n, className: r }) => !r ? /* @__PURE__ */ o("code", { className: "chat-wrapper__inline-code", children: n }) : /* @__PURE__ */ o("code", { className: "chat-wrapper__code-block", children: n }),
        ul: ({ children: n }) => /* @__PURE__ */ o("ul", { className: "chat-wrapper__list", children: n }),
        ol: ({ children: n }) => /* @__PURE__ */ o("ol", { className: "chat-wrapper__ordered-list", children: n }),
        li: ({ children: n }) => /* @__PURE__ */ o("li", { className: "chat-wrapper__list-item", children: n })
      },
      children: e
    }
  ) }) }) }) })
);
Cu.displayName = "StreamingMessage";
function yu({ message: e }) {
  const [t, n] = q(!0);
  return /* @__PURE__ */ S("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ o(
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
        children: e.role === "system" ? /* @__PURE__ */ S("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ S(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ o(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ o("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ o("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ o(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ S("span", { children: [
            "AI text input <show-toolname>",
            "..."
          ] }),
          /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ S(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ o(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ o("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ o("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ o(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ S(
            "svg",
            {
              width: "16",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ o(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ o("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ o("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ o(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ o("span", { children: "Pending..." })
        ] }) : e.role === "assistant" ? e.isStreaming ? /* @__PURE__ */ S("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ o(
            "svg",
            {
              width: "10",
              height: "14",
              viewBox: "0 0 10 14",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ o(
                "path",
                {
                  d: "M3.79576 11.3819C3.46532 11.3819 3.18343 11.2644 2.9501 11.0294C2.71676 10.7944 2.6001 10.5119 2.6001 10.1819V9.06527C1.96676 8.65082 1.4751 8.11943 1.1251 7.4711C0.775098 6.82277 0.600098 6.12638 0.600098 5.38193C0.600098 4.15627 1.02665 3.11649 1.87976 2.2626C2.73288 1.40882 3.77176 0.981934 4.99643 0.981934C6.2211 0.981934 7.26121 1.40882 8.11676 2.2626C8.97232 3.11649 9.4001 4.15627 9.4001 5.38193C9.4001 6.12438 9.2251 6.8211 8.8751 7.4721C8.5251 8.1231 8.03343 8.65416 7.4001 9.06527V10.1819C7.4001 10.5119 7.28243 10.7944 7.0471 11.0294C6.81188 11.2644 6.52904 11.3819 6.1986 11.3819H3.79576ZM3.8001 10.1819H6.2001V8.41527L6.7501 8.06527C7.20565 7.77638 7.56121 7.39204 7.81676 6.91227C8.07232 6.43249 8.2001 5.92238 8.2001 5.38193C8.2001 4.4966 7.88771 3.74193 7.26293 3.11793C6.63826 2.49393 5.88271 2.18193 4.99626 2.18193C4.10993 2.18193 3.35565 2.49393 2.73343 3.11793C2.11121 3.74193 1.8001 4.4966 1.8001 5.38193C1.8001 5.92238 1.92788 6.43249 2.18343 6.91227C2.43899 7.39204 2.79454 7.77638 3.2501 8.06527L3.8001 8.41527V10.1819ZM3.8001 13.7819C3.57343 13.7819 3.38343 13.7053 3.2301 13.5519C3.07676 13.3986 3.0001 13.2086 3.0001 12.9819V12.5819H7.0001V12.9819C7.0001 13.2086 6.92343 13.3986 6.7701 13.5519C6.61676 13.7053 6.42676 13.7819 6.2001 13.7819H3.8001Z",
                  fill: "#637381"
                }
              )
            }
          ) }),
          /* @__PURE__ */ o("span", { children: F.UI_TEXT.THINKING_ELLIPSIS }),
          /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ S(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ o(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ o(
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
                /* @__PURE__ */ o("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ o(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) })
        ] }) : /* @__PURE__ */ S("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ o(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ o(
                "path",
                {
                  d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z",
                  fill: "#10b981"
                }
              )
            }
          ) }),
          /* @__PURE__ */ o("span", { children: "Thought" }),
          /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ o("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ S(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ o(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ o(
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
                /* @__PURE__ */ o("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ o(
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
    t && /* @__PURE__ */ o(
      "div",
      {
        className: "chat-wrapper__system-message-content",
        style: {
          padding: "0 12px 12px 0px"
        },
        children: /* @__PURE__ */ o("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ o(
          jt,
          {
            components: {
              pre: ({ children: i }) => /* @__PURE__ */ o("pre", { className: "chat-wrapper__code-block", children: i }),
              code: ({ children: i, className: a }) => !a ? /* @__PURE__ */ o("code", { className: "chat-wrapper__inline-code", children: i }) : /* @__PURE__ */ o("code", { className: "chat-wrapper__code", children: i }),
              p: ({ children: i }) => /* @__PURE__ */ o("p", { className: "chat-wrapper__paragraph", children: i }),
              strong: ({ children: i }) => /* @__PURE__ */ o("strong", { className: "chat-wrapper__bold", children: i }),
              em: ({ children: i }) => /* @__PURE__ */ o("em", { className: "chat-wrapper__italic", children: i })
            },
            children: e.content.trim()
          }
        ) })
      }
    )
  ] });
}
function wu({
  apiUrl: e,
  config: t,
  tools: n,
  clientTools: r,
  initialMessages: i = [],
  userId: a,
  devMode: l = !1,
  app: s,
  contextHelpers: c
}) {
  var Xt;
  const h = ce((I) => I.replace(
    /^wss?:\/\//,
    (D) => D === "wss://" ? "https://" : "http://"
  ), []), u = Rt(() => h(e), [e, h]), [d, C] = q(
    null
  ), [p, x] = q(!1), y = Ct(null), [A, E] = q(i), [U, N] = q(!1), [P, V] = q(!1), [w, z] = q("idle"), [j, Z] = q(!1), [O, v] = q(t.mode), [M, Y] = q(!1), [ae, X] = q(
    null
  ), [ye, pe] = q(null), [Te, $e] = q(null), [g] = q([]), [Q, Ie] = q(""), [f, de] = q(!1), [, ee] = q(""), [le, Fe] = q(""), [xe, Ye] = q(!1), [, Ke] = q(
    /* @__PURE__ */ new Map()
  ), [, pt] = q(
    /* @__PURE__ */ new Map()
  ), [Ot, Qe] = q(!1), dt = Ct(null), Oe = Ct(null), ze = Ct(null), _t = Ct(!0), Ne = Ct(""), Je = Ct(!1), Re = ce(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), Dt = Rt(
    () => (I, D) => D === !1 ? Se.isErrorMessage(I) ? "error" : "completed" : Se.isCompletedMessage(I) ? "completed" : Se.isErrorMessage(I) ? "error" : "processing",
    []
  ), Pt = Rt(
    () => (I) => Se.extractDuration(I),
    []
  ), Zt = Rt(
    () => (I) => Se.cleanReasoningContent(I),
    []
  ), It = Rt(
    () => (I, D) => {
      switch (Se.getMessageType(
        I,
        D
      )) {
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
  ), ft = Rt(
    () => (I, D) => D === !1 ? I.includes(F.ERROR_MARKER) ? "Tool Error" : "Tool Completed" : I.includes(F.COMPLETED_MARKER) || I.includes("✅") ? "Tool Completed" : I.includes(F.ERROR_MARKER) ? "Tool Error" : (I.includes(F.HANDLING_MARKER), "Tool Processing..."),
    []
  ), _ = Rt(
    () => (I, D) => D === !1 ? I.includes(F.ERROR_MARKER) ? "error" : "completed" : I.includes(F.COMPLETED_MARKER) || I.includes("✅") ? "completed" : I.includes(F.ERROR_MARKER) ? "error" : "processing",
    []
  ), T = ce(
    (I, D) => {
      const G = xn(D, I === "assistant");
      E((he) => [
        ...he,
        {
          id: Re(),
          role: I,
          content: G,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [Re]
  ), H = ce(() => {
    if (ze.current && Ne.current) {
      const I = xn(
        Ne.current,
        !0
      ), D = {
        id: ze.current,
        role: "assistant",
        content: I,
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !1
      };
      return E((re) => [...re, D]), ze.current = null, Ne.current = "", Fe(""), !0;
    }
    return !1;
  }, []), W = ce(() => {
    N(!1), de(!1), z("idle"), H(), setTimeout(() => {
      var I;
      (I = Oe.current) == null || I.focus();
    }, 0);
  }, [H]), J = ce(
    (I) => {
      console.error("Chat error:", I), N(!1), de(!1), z("error"), H(), T("system", `❌ Chat error: ${I}`);
    },
    [T, H]
  ), Ee = ce(async () => {
    try {
      const I = new fu();
      y.current = I, C(I);
      const D = c || {};
      await I.onInit({
        apiUrl: e,
        userId: a,
        toolSchemas: r,
        clientTools: n,
        contextHelpers: D,
        onSetMessage: (re) => {
          const G = xn(re, !0);
          if (ze.current)
            Ne.current += G, Fe(Ne.current);
          else {
            de(!1);
            const he = Re();
            ze.current = he, Ne.current = G, Fe(G);
          }
        },
        onSystemEvent: (re) => {
          var G;
          switch (re.type) {
            case lt.CHAT_COMPLETED:
              W();
              break;
            case lt.CHAT_ERROR:
              (G = re.data) != null && G.error && J(re.data.error);
              break;
            case lt.CONNECTION_LOST:
              break;
            case lt.CONNECTION_RESTORED:
              break;
            default:
              break;
          }
        },
        onReasoningUpdate: (re, G, he) => {
          const { callId: we } = he || {};
          if (Ye(re), ee(G), !we)
            return;
          const Le = Se.isThinkingMessage(G) && !G.includes("for") && !G.includes("seconds"), _e = Se.isThinkingMessage(G) && G.includes("for") && G.includes("seconds"), rt = Se.isHandlingMessage(G), mt = Se.isCompletedMessage(G), kt = Se.isErrorMessage(G);
          (Le || _e) && pt((St) => {
            const it = new Map(St), L = it.get(we);
            if (Le && !L) {
              H();
              const m = Re();
              it.set(we, m);
              const k = {
                id: m,
                role: "reasoning",
                content: G,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0
              };
              E((R) => [...R, k]);
            } else _e && L ? (E(
              (m) => m.map(
                (k) => k.id === L ? {
                  ...k,
                  content: G,
                  isStreaming: !1
                  // Mark as completed
                } : k
              )
            ), it.delete(we)) : L && Le && E(
              (m) => m.map(
                (k) => k.id === L ? {
                  ...k,
                  content: G,
                  isStreaming: !0
                } : k
              )
            );
            return it;
          }), Ke((St) => {
            const it = new Map(St), L = it.get(we);
            if (rt && !L) {
              H();
              const m = G.match(
                F.PATTERNS.HANDLING_TOOL
              ), k = m ? m[1] : "Unknown Tool", R = Re();
              it.set(we, R);
              const te = {
                id: R,
                role: "tooling",
                content: G,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0,
                toolData: {
                  ...he,
                  toolName: k,
                  callId: we,
                  status: "processing"
                }
              };
              E((ke) => [...ke, te]);
            } else if ((mt || kt) && L) {
              const m = G.match(
                F.PATTERNS.COMPLETED_OR_ERROR_TOOL
              ), k = m ? m[1] : "Unknown Tool";
              E(
                (R) => R.map(
                  (te) => te.id === L ? {
                    ...te,
                    content: G,
                    isStreaming: !1,
                    // Mark as completed
                    toolData: {
                      ...te.toolData,
                      toolName: k,
                      status: kt ? "error" : "completed",
                      callId: we ?? ""
                    }
                  } : te
                )
              ), it.delete(we);
            } else L && xe && !mt && !kt && E(
              (m) => m.map(
                (k) => k.id === L ? {
                  ...k,
                  content: G,
                  isStreaming: !0
                } : k
              )
            );
            return it;
          });
        }
      }), x(!0);
    } catch (I) {
      console.error("Error connecting WebSocketChatClient:", I), x(!1);
    }
  }, [
    e,
    r,
    n,
    t,
    Re,
    T,
    W,
    J,
    H
  ]), Ze = ce(() => {
    y.current && (y.current.disconnect(), y.current = null), C(null), x(!1);
  }, []), be = ce(() => {
    Ye(!1), _t.current = !0;
  }, []), ve = Ct(null), fe = ce(() => {
    ve.current && cancelAnimationFrame(ve.current), ve.current = requestAnimationFrame(() => {
      var I;
      (I = dt.current) == null || I.scrollIntoView({ behavior: "smooth" }), ve.current = null;
    });
  }, []);
  ct(() => {
    fe();
  }, [A, fe]), ct(() => {
    le && fe();
  }, [le, fe]), ct(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(Q);
  }, [Q, t]), ct(() => (Ee(), () => {
    Ze(), ve.current && cancelAnimationFrame(ve.current);
  }), [Ee, Ze]), ct(() => {
    const I = setInterval(() => {
      if (y.current) {
        const D = y.current.getConnectionStatus();
        x(D.connected);
      }
    }, 1e3);
    return () => clearInterval(I);
  }, []), ct(() => {
    (async () => {
      if (a && !Je.current && !M && !(A.length > 0))
        try {
          Y(!0), X(null);
          const D = [];
          if (D.length === 0) {
            Y(!1), Je.current = !0;
            return;
          }
          const re = D[0];
          pe(re.id), $e(re.convUuid);
          const G = await mu(
            u,
            re.id
          );
          E(G), Je.current = !0;
        } catch (D) {
          console.error("❌ Error loading conversation:", D), X(
            D instanceof Error ? D.message : "Failed to load conversation"
          ), Je.current = !0;
        } finally {
          Y(!1);
        }
    })();
  }, [a, u]);
  const ue = ce(
    async (I, D) => {
      if (!I.trim() || U || !d || !p)
        return;
      const re = {
        id: Re(),
        role: "user",
        content: I.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: D
      };
      E((G) => [...G, re]), N(!0), de(!0), z("submitted"), Ie("Starting...");
      try {
        await d.onTriggerMessage({
          message: re.content,
          app: s,
          media: D,
          convUuid: Te || void 0,
          agentPromptPath: void 0
        }), z("streaming");
      } catch (G) {
        console.error("Agent client send error:", G), de(!1), z("error"), T(
          "system",
          `Sorry, there was an error: ${G instanceof Error ? G.message : "Unknown error"}`
        ), t.onError && t.onError(
          G instanceof Error ? G : new Error("Unknown error")
        ), N(!1), z("idle"), Ie("");
      }
    },
    [
      U,
      d,
      p,
      Re,
      T,
      t,
      Te
    ]
  ), et = ce(() => {
    N(!1), z("idle"), Ie(""), de(!1), ee(""), ze.current = null, Ne.current = "", Fe(""), be();
  }, [be]), De = ce(
    async (I) => {
      const D = [], re = e, G = "chat-uploads";
      for (const he of I)
        try {
          const we = new FormData();
          we.append("file", he), we.append("folder", G);
          const Le = await fetch(`${re}/upload`, {
            method: "POST",
            body: we
          }), _e = await Le.json();
          if (Le.ok)
            he.type.startsWith("image/") ? D.push(_e.url) : D.push(
              `data:${he.type};name=${encodeURIComponent(
                _e.fileName || he.name
              )};url=${encodeURIComponent(_e.url)}`
            );
          else if (console.error("❌ Upload failed:", _e.error), he.type.startsWith("image/")) {
            const rt = new FileReader(), mt = await new Promise(
              (kt, St) => {
                rt.onload = () => kt(rt.result), rt.onerror = St, rt.readAsDataURL(he);
              }
            );
            D.push(mt);
          } else
            D.push(
              `data:${he.type};name=${encodeURIComponent(
                he.name
              )};base64,placeholder`
            );
        } catch (we) {
          console.error("Error uploading file:", we);
          try {
            if (he.type.startsWith("image/")) {
              const Le = new FileReader(), _e = await new Promise(
                (rt, mt) => {
                  Le.onload = () => rt(Le.result), Le.onerror = mt, Le.readAsDataURL(he);
                }
              );
              D.push(_e);
            } else
              D.push(
                `data:${he.type};name=${encodeURIComponent(
                  he.name
                )};base64,placeholder`
              );
          } catch (Le) {
            console.error("Error in fallback encoding:", Le);
          }
        }
      return D;
    },
    [e]
  ), Mn = ce(() => {
    V(!0);
  }, []), xt = ce(() => {
    V(!1);
  }, []), Nt = ce(() => {
    Z((I) => !I);
  }, []), On = ce(() => {
    v((I) => I === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  ct(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const I = (D) => {
      D.key === "Escape" && O === "modal" && P && xt();
    };
    if (O === "modal" && P)
      return document.addEventListener("keydown", I), () => document.removeEventListener("keydown", I);
  }, [O, P, xt]);
  const Dn = ((...I) => I.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${O}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`,
    j && "chat-wrapper--collapsed",
    O === "embedded" && t.constrainedHeight && "chat-wrapper--constrained"
  ), un = () => {
    var D;
    if (O === "modal" && !P || O === "sidebar" && j || O === "fullscreen" && j) {
      const re = O === "modal" ? Mn : Nt, G = O === "modal" ? `Open ${t.appName}` : `Expand ${t.appName}`;
      return /* @__PURE__ */ S(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: re,
          title: G,
          children: [
            /* @__PURE__ */ S(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: "chat-wrapper__bubble-icon",
                children: [
                  /* @__PURE__ */ o(
                    "path",
                    {
                      d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
                      fill: "currentColor"
                    }
                  ),
                  /* @__PURE__ */ o("circle", { cx: "7", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ o("circle", { cx: "12", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ o("circle", { cx: "17", cy: "10", r: "1", fill: "currentColor" })
                ]
              }
            ),
            ((D = t.features) == null ? void 0 : D.showBubbleText) !== !1 && /* @__PURE__ */ o("span", { className: "chat-wrapper__bubble-text", children: t.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, me = () => O === "modal" && P ? /* @__PURE__ */ o(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: xt,
      title: "Close chat",
      children: /* @__PURE__ */ o(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ o(
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
    if ((O === "sidebar" || O === "fullscreen") && !j) {
      const I = O === "fullscreen";
      return /* @__PURE__ */ o(
        "button",
        {
          className: I ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: On,
          title: I ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ o(
            "svg",
            {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: I ? (
                // Minimize icon (arrows pointing inward)
                /* @__PURE__ */ o(
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
                /* @__PURE__ */ o(
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
  }, Pn = () => (O === "sidebar" || O === "fullscreen") && !j ? /* @__PURE__ */ o(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: Nt,
      title: "Collapse chat",
      children: /* @__PURE__ */ o(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ o(
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
  ) : null, hn = () => l && t.headerVisible !== !1 ? /* @__PURE__ */ o(
    "button",
    {
      className: "chat-wrapper__settings-button",
      onClick: () => Qe(!0),
      title: "Developer Settings",
      children: /* @__PURE__ */ o(
        "svg",
        {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ o(
            "path",
            {
              d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
              fill: "currentColor"
            }
          )
        }
      )
    }
  ) : null, qt = () => !l || t.headerVisible !== !1 ? null : /* @__PURE__ */ o(
    "button",
    {
      className: "chat-wrapper__settings-button chat-wrapper__settings-button--floating",
      onClick: () => Qe(!0),
      title: "Developer Settings",
      children: /* @__PURE__ */ o(
        "svg",
        {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ o(
            "path",
            {
              d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
              fill: "currentColor"
            }
          )
        }
      )
    }
  ), pn = () => {
    var I;
    return !((I = t.features) != null && I.showToolResults) || g.length === 0 ? null : /* @__PURE__ */ S("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ o("h4", { children: "Tool Results" }),
      /* @__PURE__ */ o("div", { className: "chat-wrapper__tool-results-list", children: g.map((D) => /* @__PURE__ */ S("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ o("div", { className: "chat-wrapper__tool-result-title", children: D.title }),
        D.description && /* @__PURE__ */ o("div", { className: "chat-wrapper__tool-result-description", children: D.description }),
        /* @__PURE__ */ S("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          D.status || "completed"
        ] })
      ] }, D.id)) })
    ] });
  };
  return O === "modal" && !P || (O === "sidebar" || O === "fullscreen") && j ? un() : /* @__PURE__ */ o(kn, { children: /* @__PURE__ */ S("div", { className: Dn, style: t.customStyles, children: [
    qt(),
    t.headerVisible !== !1 && /* @__PURE__ */ S("div", { className: "chat-wrapper__header", children: [
      /* @__PURE__ */ o("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ o("h2", { className: "chat-wrapper__title", children: t.appName }) }),
      /* @__PURE__ */ S("div", { className: "chat-wrapper__header-controls", children: [
        hn(),
        Et(),
        Pn(),
        me()
      ] })
    ] }),
    !j && /* @__PURE__ */ S(kn, { children: [
      ae && /* @__PURE__ */ o("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ S("p", { children: [
        "⚠️ ",
        ae
      ] }) }),
      A.length === 0 && !U && !M && /* @__PURE__ */ S("div", { className: "chat-wrapper__main-header", children: [
        /* @__PURE__ */ o("h1", { className: "chat-wrapper__main-title", children: t.appName }),
        t.description && /* @__PURE__ */ o("p", { className: "chat-wrapper__description", children: t.description })
      ] }),
      /* @__PURE__ */ S(
        "div",
        {
          className: `chat-wrapper__content ${A.length === 0 && !U && !M ? "chat-wrapper__content--empty" : "chat-wrapper__content--with-messages"}`,
          children: [
            M && A.length === 0 ? /* @__PURE__ */ o("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ o(eu, { fullHeight: !0 }) }) : /* @__PURE__ */ o(
              Ia,
              {
                ref: dt,
                messages: A,
                isThinking: f,
                isHandlingTool: xe,
                getReasoningTitle: It,
                getReasoningStatus: Dt,
                getReasoningDuration: Pt,
                getReasoningContentOnly: Zt,
                getToolingTitle: ft,
                getToolingStatus: _,
                clientTools: r || [],
                currentAssistantMessageIdRef: ze
              }
            ),
            pn(),
            /* @__PURE__ */ o("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ o(
              Qc,
              {
                ref: Oe,
                placeholder: t.placeholder,
                placeholderTexts: t.placeholderTexts,
                disabled: U,
                chatStatus: w,
                fileUploadEnabled: (Xt = t.features) == null ? void 0 : Xt.fileUpload,
                restaurantName: t.restaurantName,
                restaurantLogo: t.restaurantLogo,
                hasMessages: A.length > 0,
                onSubmit: (I, D) => ue(I, D),
                onFileUpload: De,
                onStopGeneration: et
              }
            ) }),
            A.length === 0 && !U && !M && t.suggestedPrompts && /* @__PURE__ */ o(
              Jc,
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
    t.onError && /* @__PURE__ */ o("div", { className: "chat-wrapper__error-boundary" }),
    /* @__PURE__ */ o(
      ru,
      {
        isOpen: Ot,
        onClose: () => Qe(!1),
        app: s,
        apiUrl: e
      }
    )
  ] }) });
}
const Lu = An(wu);
export {
  bc as AnimatedPlaceholder,
  Lu as ChatWrapper,
  ru as DevSettings,
  eu as InlineLoader,
  Mr as Loader,
  xc as PromptInput,
  Sc as PromptInputButton,
  ku as PromptInputModelSelect,
  Tu as PromptInputModelSelectContent,
  bu as PromptInputModelSelectItem,
  Su as PromptInputModelSelectTrigger,
  vu as PromptInputModelSelectValue,
  Tc as PromptInputSubmit,
  ya as PromptInputTextarea,
  Ec as PromptInputToolbar,
  kc as PromptInputTools,
  ka as Reasoning,
  Lr as ReasoningContent,
  Rr as ReasoningTrigger,
  Jc as SuggestedPrompts,
  Ru as createThread,
  Nu as fetchMessagesByConvUuid,
  Iu as fetchThreadByConvUuid,
  mu as fetchThreadMessages,
  Au as fetchUserThreads
};
