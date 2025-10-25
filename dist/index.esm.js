var ho = Object.defineProperty;
var fo = (e, t, n) => t in e ? ho(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ce = (e, t, n) => fo(e, typeof t != "symbol" ? t + "" : t, n);
import { jsxs as L, jsx as p, Fragment as Hn } from "react/jsx-runtime";
import mo, { forwardRef as xi, useState as oe, useRef as pt, useImperativeHandle as go, useCallback as he, memo as nr, useMemo as Ht, useEffect as bt } from "react";
function yo(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Co = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, wo = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, xo = {};
function kr(e, t) {
  return (xo.jsx ? wo : Co).test(e);
}
const ko = /[ \t\n\f\r]/g;
function bo(e) {
  return typeof e == "object" ? e.type === "text" ? br(e.value) : !1 : br(e);
}
function br(e) {
  return e.replace(ko, "") === "";
}
class Qt {
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
Qt.prototype.normal = {};
Qt.prototype.property = {};
Qt.prototype.space = void 0;
function ki(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new Qt(n, r, t);
}
function jn(e) {
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
let _o = 0;
const j = Nt(), Ce = Nt(), Vn = Nt(), _ = Nt(), ae = Nt(), zt = Nt(), Ge = Nt();
function Nt() {
  return 2 ** ++_o;
}
const Wn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: j,
  booleanish: Ce,
  commaOrSpaceSeparated: Ge,
  commaSeparated: zt,
  number: _,
  overloadedBoolean: Vn,
  spaceSeparated: ae
}, Symbol.toStringTag, { value: "Module" })), Sn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Wn)
);
class rr extends $e {
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
    let o = -1;
    if (super(t, n), _r(this, "space", i), typeof r == "number")
      for (; ++o < Sn.length; ) {
        const l = Sn[o];
        _r(this, Sn[o], (r & Wn[l]) === Wn[l]);
      }
  }
}
rr.prototype.defined = !0;
function _r(e, t, n) {
  n && (e[t] = n);
}
function Ut(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const o = new rr(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (o.mustUseProperty = !0), t[r] = o, n[jn(r)] = r, n[jn(o.attribute)] = r;
  }
  return new Qt(t, n, e.space);
}
const bi = Ut({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Ce,
    ariaAutoComplete: null,
    ariaBusy: Ce,
    ariaChecked: Ce,
    ariaColCount: _,
    ariaColIndex: _,
    ariaColSpan: _,
    ariaControls: ae,
    ariaCurrent: null,
    ariaDescribedBy: ae,
    ariaDetails: null,
    ariaDisabled: Ce,
    ariaDropEffect: ae,
    ariaErrorMessage: null,
    ariaExpanded: Ce,
    ariaFlowTo: ae,
    ariaGrabbed: Ce,
    ariaHasPopup: null,
    ariaHidden: Ce,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: ae,
    ariaLevel: _,
    ariaLive: null,
    ariaModal: Ce,
    ariaMultiLine: Ce,
    ariaMultiSelectable: Ce,
    ariaOrientation: null,
    ariaOwns: ae,
    ariaPlaceholder: null,
    ariaPosInSet: _,
    ariaPressed: Ce,
    ariaReadOnly: Ce,
    ariaRelevant: null,
    ariaRequired: Ce,
    ariaRoleDescription: ae,
    ariaRowCount: _,
    ariaRowIndex: _,
    ariaRowSpan: _,
    ariaSelected: Ce,
    ariaSetSize: _,
    ariaSort: null,
    ariaValueMax: _,
    ariaValueMin: _,
    ariaValueNow: _,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function _i(e, t) {
  return t in e ? e[t] : t;
}
function Si(e, t) {
  return _i(e, t.toLowerCase());
}
const So = Ut({
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
    acceptCharset: ae,
    accessKey: ae,
    action: null,
    allow: null,
    allowFullScreen: j,
    allowPaymentRequest: j,
    allowUserMedia: j,
    alt: null,
    as: null,
    async: j,
    autoCapitalize: null,
    autoComplete: ae,
    autoFocus: j,
    autoPlay: j,
    blocking: ae,
    capture: null,
    charSet: null,
    checked: j,
    cite: null,
    className: ae,
    cols: _,
    colSpan: null,
    content: null,
    contentEditable: Ce,
    controls: j,
    controlsList: ae,
    coords: _ | zt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: j,
    defer: j,
    dir: null,
    dirName: null,
    disabled: j,
    download: Vn,
    draggable: Ce,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: j,
    formTarget: null,
    headers: ae,
    height: _,
    hidden: Vn,
    high: _,
    href: null,
    hrefLang: null,
    htmlFor: ae,
    httpEquiv: ae,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: j,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: j,
    itemId: null,
    itemProp: ae,
    itemRef: ae,
    itemScope: j,
    itemType: ae,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: j,
    low: _,
    manifest: null,
    max: null,
    maxLength: _,
    media: null,
    method: null,
    min: null,
    minLength: _,
    multiple: j,
    muted: j,
    name: null,
    nonce: null,
    noModule: j,
    noValidate: j,
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
    open: j,
    optimum: _,
    pattern: null,
    ping: ae,
    placeholder: null,
    playsInline: j,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: j,
    referrerPolicy: null,
    rel: ae,
    required: j,
    reversed: j,
    rows: _,
    rowSpan: _,
    sandbox: ae,
    scope: null,
    scoped: j,
    seamless: j,
    selected: j,
    shadowRootClonable: j,
    shadowRootDelegatesFocus: j,
    shadowRootMode: null,
    shape: null,
    size: _,
    sizes: null,
    slot: null,
    span: _,
    spellCheck: Ce,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: _,
    step: null,
    style: null,
    tabIndex: _,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: j,
    useMap: null,
    value: Ce,
    width: _,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: ae,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: _,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: _,
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
    compact: j,
    // Lists. Use CSS to reduce space between items instead
    declare: j,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: _,
    // `<img>` and `<object>`
    leftMargin: _,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: _,
    // `<body>`
    marginWidth: _,
    // `<body>`
    noResize: j,
    // `<frame>`
    noHref: j,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: j,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: j,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: _,
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
    topMargin: _,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: _,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: j,
    disableRemotePlayback: j,
    prefix: null,
    property: null,
    results: _,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Si
}), Eo = Ut({
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
    accentHeight: _,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: _,
    amplitude: _,
    arabicForm: null,
    ascent: _,
    attributeName: null,
    attributeType: null,
    azimuth: _,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: _,
    by: null,
    calcMode: null,
    capHeight: _,
    className: ae,
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
    descent: _,
    diffuseConstant: _,
    direction: null,
    display: null,
    dur: null,
    divisor: _,
    dominantBaseline: null,
    download: j,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: _,
    enableBackground: null,
    end: null,
    event: null,
    exponent: _,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: _,
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
    hanging: _,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: _,
    horizOriginX: _,
    horizOriginY: _,
    id: null,
    ideographic: _,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: _,
    k: _,
    k1: _,
    k2: _,
    k3: _,
    k4: _,
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
    limitingConeAngle: _,
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
    mediaSize: _,
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
    overlinePosition: _,
    overlineThickness: _,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: _,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: ae,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: _,
    pointsAtY: _,
    pointsAtZ: _,
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
    specularConstant: _,
    specularExponent: _,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: _,
    strikethroughThickness: _,
    string: null,
    stroke: null,
    strokeDashArray: Ge,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: _,
    strokeOpacity: _,
    strokeWidth: null,
    style: null,
    surfaceScale: _,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Ge,
    tabIndex: _,
    tableValues: null,
    target: null,
    targetX: _,
    targetY: _,
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
    underlinePosition: _,
    underlineThickness: _,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: _,
    values: null,
    vAlphabetic: _,
    vMathematical: _,
    vectorEffect: null,
    vHanging: _,
    vIdeographic: _,
    version: null,
    vertAdvY: _,
    vertOriginX: _,
    vertOriginY: _,
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
    xHeight: _,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: _i
}), Ei = Ut({
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
}), Ti = Ut({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Si
}), vi = Ut({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), To = {
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
}, vo = /[A-Z]/g, Sr = /-[a-z]/g, Io = /^data[-\w.:]+$/i;
function Ao(e, t) {
  const n = jn(t);
  let r = t, i = $e;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Io.test(t)) {
    if (t.charAt(4) === "-") {
      const o = t.slice(5).replace(Sr, Lo);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = t.slice(4);
      if (!Sr.test(o)) {
        let l = o.replace(vo, No);
        l.charAt(0) !== "-" && (l = "-" + l), t = "data" + l;
      }
    }
    i = rr;
  }
  return new i(r, t);
}
function No(e) {
  return "-" + e.toLowerCase();
}
function Lo(e) {
  return e.charAt(1).toUpperCase();
}
const Mo = ki([bi, So, Ei, Ti, vi], "html"), ir = ki([bi, Eo, Ei, Ti, vi], "svg");
function Ro(e) {
  return e.join(" ").trim();
}
var hn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ii(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var or = {}, Er = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Do = /\n/g, Po = /^\s*/, Oo = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, zo = /^:\s*/, Fo = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Uo = /^[;\s]*/, Bo = /^\s+|\s+$/g, Ho = `
`, Tr = "/", vr = "*", At = "", jo = "comment", Vo = "declaration", Wo = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(x) {
    var k = x.match(Do);
    k && (n += k.length);
    var A = x.lastIndexOf(Ho);
    r = ~A ? x.length - A : r + x.length;
  }
  function o() {
    var x = { line: n, column: r };
    return function(k) {
      return k.position = new l(x), c(), k;
    };
  }
  function l(x) {
    this.start = x, this.end = { line: n, column: r }, this.source = t.source;
  }
  l.prototype.content = e;
  function a(x) {
    var k = new Error(
      t.source + ":" + n + ":" + r + ": " + x
    );
    if (k.reason = x, k.filename = t.source, k.line = n, k.column = r, k.source = e, !t.silent) throw k;
  }
  function u(x) {
    var k = x.exec(e);
    if (k) {
      var A = k[0];
      return i(A), e = e.slice(A.length), k;
    }
  }
  function c() {
    u(Po);
  }
  function s(x) {
    var k;
    for (x = x || []; k = d(); )
      k !== !1 && x.push(k);
    return x;
  }
  function d() {
    var x = o();
    if (!(Tr != e.charAt(0) || vr != e.charAt(1))) {
      for (var k = 2; At != e.charAt(k) && (vr != e.charAt(k) || Tr != e.charAt(k + 1)); )
        ++k;
      if (k += 2, At === e.charAt(k - 1))
        return a("End of comment missing");
      var A = e.slice(2, k - 2);
      return r += 2, i(A), e = e.slice(k), r += 2, x({
        type: jo,
        comment: A
      });
    }
  }
  function m() {
    var x = o(), k = u(Oo);
    if (k) {
      if (d(), !u(zo)) return a("property missing ':'");
      var A = u(Fo), b = x({
        type: Vo,
        property: Ir(k[0].replace(Er, At)),
        value: A ? Ir(A[0].replace(Er, At)) : At
      });
      return u(Uo), b;
    }
  }
  function h() {
    var x = [];
    s(x);
    for (var k; k = m(); )
      k !== !1 && (x.push(k), s(x));
    return x;
  }
  return c(), h();
};
function Ir(e) {
  return e ? e.replace(Bo, At) : At;
}
var $o = hn && hn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(or, "__esModule", { value: !0 });
or.default = qo;
var Zo = $o(Wo);
function qo(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, Zo.default)(e), i = typeof t == "function";
  return r.forEach(function(o) {
    if (o.type === "declaration") {
      var l = o.property, a = o.value;
      i ? t(l, a, o) : a && (n = n || {}, n[l] = a);
    }
  }), n;
}
var gn = {};
Object.defineProperty(gn, "__esModule", { value: !0 });
gn.camelCase = void 0;
var Go = /^--[a-zA-Z0-9_-]+$/, Yo = /-([a-z])/g, Xo = /^[^-]+$/, Jo = /^-(webkit|moz|ms|o|khtml)-/, Ko = /^-(ms)-/, Qo = function(e) {
  return !e || Xo.test(e) || Go.test(e);
}, el = function(e, t) {
  return t.toUpperCase();
}, Ar = function(e, t) {
  return "".concat(t, "-");
}, tl = function(e, t) {
  return t === void 0 && (t = {}), Qo(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Ko, Ar) : e = e.replace(Jo, Ar), e.replace(Yo, el));
};
gn.camelCase = tl;
var nl = hn && hn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, rl = nl(or), il = gn;
function $n(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, rl.default)(e, function(r, i) {
    r && i && (n[(0, il.camelCase)(r, t)] = i);
  }), n;
}
$n.default = $n;
var ol = $n;
const ll = /* @__PURE__ */ Ii(ol), Ai = Ni("end"), lr = Ni("start");
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
function al(e) {
  const t = lr(e), n = Ai(e);
  if (t && n)
    return { start: t, end: n };
}
function Yt(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Nr(e.position) : "start" in e || "end" in e ? Nr(e) : "line" in e || "column" in e ? Zn(e) : "";
}
function Zn(e) {
  return Lr(e && e.line) + ":" + Lr(e && e.column);
}
function Nr(e) {
  return Zn(e && e.start) + "-" + Zn(e && e.end);
}
function Lr(e) {
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
    let i = "", o = {}, l = !1;
    if (n && ("line" in n && "column" in n ? o = { place: n } : "start" in n && "end" in n ? o = { place: n } : "type" in n ? o = {
      ancestors: [n],
      place: n.position
    } : o = { ...n }), typeof t == "string" ? i = t : !o.cause && t && (l = !0, i = t.message, o.cause = t), !o.ruleId && !o.source && typeof r == "string") {
      const u = r.indexOf(":");
      u === -1 ? o.ruleId = r : (o.source = r.slice(0, u), o.ruleId = r.slice(u + 1));
    }
    if (!o.place && o.ancestors && o.ancestors) {
      const u = o.ancestors[o.ancestors.length - 1];
      u && (o.place = u.position);
    }
    const a = o.place && "start" in o.place ? o.place.start : o.place;
    this.ancestors = o.ancestors || void 0, this.cause = o.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = Yt(o.place) || "1:1", this.place = o.place || void 0, this.reason = this.message, this.ruleId = o.ruleId || void 0, this.source = o.source || void 0, this.stack = l && o.cause && typeof o.cause.stack == "string" ? o.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
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
const ar = {}.hasOwnProperty, sl = /* @__PURE__ */ new Map(), ul = /[A-Z]/g, cl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), pl = /* @__PURE__ */ new Set(["td", "th"]), Li = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function hl(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = xl(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = wl(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? ir : Mo,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, o = Mi(i, e, void 0);
  return o && typeof o != "string" ? o : i.create(
    e,
    i.Fragment,
    { children: o || void 0 },
    void 0
  );
}
function Mi(e, t, n) {
  if (t.type === "element")
    return dl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return fl(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return gl(e, t, n);
  if (t.type === "mdxjsEsm")
    return ml(e, t);
  if (t.type === "root")
    return yl(e, t, n);
  if (t.type === "text")
    return Cl(e, t);
}
function dl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = ir, e.schema = i), e.ancestors.push(t);
  const o = Di(e, t.tagName, !1), l = kl(e, t);
  let a = ur(e, t);
  return cl.has(t.tagName) && (a = a.filter(function(u) {
    return typeof u == "string" ? !bo(u) : !0;
  })), Ri(e, l, o, t), sr(l, a), e.ancestors.pop(), e.schema = r, e.create(t, o, l, n);
}
function fl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Kt(e, t.position);
}
function ml(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Kt(e, t.position);
}
function gl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = ir, e.schema = i), e.ancestors.push(t);
  const o = t.name === null ? e.Fragment : Di(e, t.name, !0), l = bl(e, t), a = ur(e, t);
  return Ri(e, l, o, t), sr(l, a), e.ancestors.pop(), e.schema = r, e.create(t, o, l, n);
}
function yl(e, t, n) {
  const r = {};
  return sr(r, ur(e, t)), e.create(t, e.Fragment, r, n);
}
function Cl(e, t) {
  return t.value;
}
function Ri(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function sr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function wl(e, t, n) {
  return r;
  function r(i, o, l, a) {
    const c = Array.isArray(l.children) ? n : t;
    return a ? c(o, l, a) : c(o, l);
  }
}
function xl(e, t) {
  return n;
  function n(r, i, o, l) {
    const a = Array.isArray(o.children), u = lr(r);
    return t(
      i,
      o,
      l,
      a,
      {
        columnNumber: u ? u.column - 1 : void 0,
        fileName: e,
        lineNumber: u ? u.line : void 0
      },
      void 0
    );
  }
}
function kl(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && ar.call(t.properties, i)) {
      const o = _l(e, i, t.properties[i]);
      if (o) {
        const [l, a] = o;
        e.tableCellAlignToStyle && l === "align" && typeof a == "string" && pl.has(t.tagName) ? r = a : n[l] = a;
      }
    }
  if (r) {
    const o = (
      /** @type {Style} */
      n.style || (n.style = {})
    );
    o[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function bl(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const o = r.data.estree.body[0];
        o.type;
        const l = o.expression;
        l.type;
        const a = l.properties[0];
        a.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        Kt(e, t.position);
    else {
      const i = r.name;
      let o;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, o = e.evaluater.evaluateExpression(a.expression);
        } else
          Kt(e, t.position);
      else
        o = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      o;
    }
  return n;
}
function ur(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : sl;
  for (; ++r < t.children.length; ) {
    const o = t.children[r];
    let l;
    if (e.passKeys) {
      const u = o.type === "element" ? o.tagName : o.type === "mdxJsxFlowElement" || o.type === "mdxJsxTextElement" ? o.name : void 0;
      if (u) {
        const c = i.get(u) || 0;
        l = u + "-" + c, i.set(u, c + 1);
      }
    }
    const a = Mi(e, o, l);
    a !== void 0 && n.push(a);
  }
  return n;
}
function _l(e, t, n) {
  const r = Ao(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? yo(n) : Ro(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Sl(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = El(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? To[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Sl(e, t) {
  try {
    return ll(t, { reactCompat: !0 });
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
    throw i.file = e.filePath || void 0, i.url = Li + "#cannot-parse-style-attribute", i;
  }
}
function Di(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let o = -1, l;
    for (; ++o < i.length; ) {
      const a = kr(i[o]) ? { type: "Identifier", name: i[o] } : { type: "Literal", value: i[o] };
      l = l ? {
        type: "MemberExpression",
        object: l,
        property: a,
        computed: !!(o && a.type === "Literal"),
        optional: !1
      } : a;
    }
    r = l;
  } else
    r = kr(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return ar.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Kt(e);
}
function Kt(e, t) {
  const n = new Le(
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
    ar.call(e, n) && (t[Tl(n)] = e[n]);
  return t;
}
function Tl(e) {
  let t = e.replace(ul, vl);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function vl(e) {
  return "-" + e.toLowerCase();
}
const En = {
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
}, Il = {};
function Al(e, t) {
  const n = Il, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Pi(e, r, i);
}
function Pi(e, t, n) {
  if (Nl(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Mr(e.children, t, n);
  }
  return Array.isArray(e) ? Mr(e, t, n) : "";
}
function Mr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Pi(e[i], t, n);
  return r.join("");
}
function Nl(e) {
  return !!(e && typeof e == "object");
}
const Rr = document.createElement("i");
function cr(e) {
  const t = "&" + e + ";";
  Rr.innerHTML = t;
  const n = Rr.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function dt(e, t, n, r) {
  const i = e.length;
  let o = 0, l;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    l = Array.from(r), l.unshift(t, n), e.splice(...l);
  else
    for (n && e.splice(t, n); o < r.length; )
      l = r.slice(o, o + 1e4), l.unshift(t, 0), e.splice(...l), o += 1e4, t += 1e4;
}
function et(e, t) {
  return e.length > 0 ? (dt(e, e.length, 0, t), e) : t;
}
const Dr = {}.hasOwnProperty;
function Ll(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    Ml(t, e[n]);
  return t;
}
function Ml(e, t) {
  let n;
  for (n in t) {
    const i = (Dr.call(e, n) ? e[n] : void 0) || (e[n] = {}), o = t[n];
    let l;
    if (o)
      for (l in o) {
        Dr.call(i, l) || (i[l] = []);
        const a = o[l];
        Rl(
          // @ts-expect-error Looks like a list.
          i[l],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function Rl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  dt(e, 0, 0, r);
}
function Oi(e, t) {
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
function Ft(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const ht = St(/[A-Za-z]/), Ye = St(/[\dA-Za-z]/), Dl = St(/[#-'*+\--9=?A-Z^-~]/);
function qn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Gn = St(/\d/), Pl = St(/[\dA-Fa-f]/), Ol = St(/[!-/:-@[-`{-~]/);
function B(e) {
  return e !== null && e < -2;
}
function We(e) {
  return e !== null && (e < 0 || e === 32);
}
function Q(e) {
  return e === -2 || e === -1 || e === 32;
}
const zl = St(new RegExp("\\p{P}|\\p{S}", "u")), Fl = St(/\s/);
function St(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Bt(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const o = e.charCodeAt(n);
    let l = "";
    if (o === 37 && Ye(e.charCodeAt(n + 1)) && Ye(e.charCodeAt(n + 2)))
      i = 2;
    else if (o < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o)) || (l = String.fromCharCode(o));
    else if (o > 55295 && o < 57344) {
      const a = e.charCodeAt(n + 1);
      o < 56320 && a > 56319 && a < 57344 ? (l = String.fromCharCode(o, a), i = 1) : l = "�";
    } else
      l = String.fromCharCode(o);
    l && (t.push(e.slice(r, n), encodeURIComponent(l)), r = n + i + 1, l = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function se(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let o = 0;
  return l;
  function l(u) {
    return Q(u) ? (e.enter(n), a(u)) : t(u);
  }
  function a(u) {
    return Q(u) && o++ < i ? (e.consume(u), a) : (e.exit(n), t(u));
  }
}
const Ul = {
  tokenize: Bl
};
function Bl(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), se(e, t, "linePrefix");
  }
  function i(a) {
    return e.enter("paragraph"), o(a);
  }
  function o(a) {
    const u = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = u), n = u, l(a);
  }
  function l(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return B(a) ? (e.consume(a), e.exit("chunkText"), o) : (e.consume(a), l);
  }
}
const Hl = {
  tokenize: jl
}, Pr = {
  tokenize: Vl
};
function jl(e) {
  const t = this, n = [];
  let r = 0, i, o, l;
  return a;
  function a(v) {
    if (r < n.length) {
      const D = n[r];
      return t.containerState = D[1], e.attempt(D[0].continuation, u, c)(v);
    }
    return c(v);
  }
  function u(v) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && I();
      const D = t.events.length;
      let W = D, w;
      for (; W--; )
        if (t.events[W][0] === "exit" && t.events[W][1].type === "chunkFlow") {
          w = t.events[W][1].end;
          break;
        }
      b(r);
      let F = D;
      for (; F < t.events.length; )
        t.events[F][1].end = {
          ...w
        }, F++;
      return dt(t.events, W + 1, 0, t.events.slice(D)), t.events.length = F, c(v);
    }
    return a(v);
  }
  function c(v) {
    if (r === n.length) {
      if (!i)
        return m(v);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return x(v);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(Pr, s, d)(v);
  }
  function s(v) {
    return i && I(), b(r), m(v);
  }
  function d(v) {
    return t.parser.lazy[t.now().line] = r !== n.length, l = t.now().offset, x(v);
  }
  function m(v) {
    return t.containerState = {}, e.attempt(Pr, h, x)(v);
  }
  function h(v) {
    return r++, n.push([t.currentConstruct, t.containerState]), m(v);
  }
  function x(v) {
    if (v === null) {
      i && I(), b(0), e.consume(v);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: o
    }), k(v);
  }
  function k(v) {
    if (v === null) {
      A(e.exit("chunkFlow"), !0), b(0), e.consume(v);
      return;
    }
    return B(v) ? (e.consume(v), A(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, a) : (e.consume(v), k);
  }
  function A(v, D) {
    const W = t.sliceStream(v);
    if (D && W.push(null), v.previous = o, o && (o.next = v), o = v, i.defineSkip(v.start), i.write(W), t.parser.lazy[v.start.line]) {
      let w = i.events.length;
      for (; w--; )
        if (
          // The token starts before the line ending…
          i.events[w][1].start.offset < l && // …and either is not ended yet…
          (!i.events[w][1].end || // …or ends after it.
          i.events[w][1].end.offset > l)
        )
          return;
      const F = t.events.length;
      let te = F, P, ne;
      for (; te--; )
        if (t.events[te][0] === "exit" && t.events[te][1].type === "chunkFlow") {
          if (P) {
            ne = t.events[te][1].end;
            break;
          }
          P = !0;
        }
      for (b(r), w = F; w < t.events.length; )
        t.events[w][1].end = {
          ...ne
        }, w++;
      dt(t.events, te + 1, 0, t.events.slice(F)), t.events.length = w;
    }
  }
  function b(v) {
    let D = n.length;
    for (; D-- > v; ) {
      const W = n[D];
      t.containerState = W[1], W[0].exit.call(t, e);
    }
    n.length = v;
  }
  function I() {
    i.write([null]), o = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Vl(e, t, n) {
  return se(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Or(e) {
  if (e === null || We(e) || Fl(e))
    return 1;
  if (zl(e))
    return 2;
}
function pr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const o = e[i].resolveAll;
    o && !r.includes(o) && (t = o(t, n), r.push(o));
  }
  return t;
}
const Yn = {
  name: "attention",
  resolveAll: Wl,
  tokenize: $l
};
function Wl(e, t) {
  let n = -1, r, i, o, l, a, u, c, s;
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
          }, m = {
            ...e[n][1].start
          };
          zr(d, -u), zr(m, u), l = {
            type: u > 1 ? "strongSequence" : "emphasisSequence",
            start: d,
            end: {
              ...e[r][1].end
            }
          }, a = {
            type: u > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: m
          }, o = {
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
              ...a.end
            }
          }, e[r][1].end = {
            ...l.start
          }, e[n][1].start = {
            ...a.end
          }, c = [], e[r][1].end.offset - e[r][1].start.offset && (c = et(c, [["enter", e[r][1], t], ["exit", e[r][1], t]])), c = et(c, [["enter", i, t], ["enter", l, t], ["exit", l, t], ["enter", o, t]]), c = et(c, pr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), c = et(c, [["exit", o, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (s = 2, c = et(c, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : s = 0, dt(e, r - 1, n - r + 3, c), n = r + c.length - s - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function $l(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Or(r);
  let o;
  return l;
  function l(u) {
    return o = u, e.enter("attentionSequence"), a(u);
  }
  function a(u) {
    if (u === o)
      return e.consume(u), a;
    const c = e.exit("attentionSequence"), s = Or(u), d = !s || s === 2 && i || n.includes(u), m = !i || i === 2 && s || n.includes(r);
    return c._open = !!(o === 42 ? d : d && (i || !m)), c._close = !!(o === 42 ? m : m && (s || !d)), t(u);
  }
}
function zr(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const Zl = {
  name: "autolink",
  tokenize: ql
};
function ql(e, t, n) {
  let r = 0;
  return i;
  function i(h) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), o;
  }
  function o(h) {
    return ht(h) ? (e.consume(h), l) : h === 64 ? n(h) : c(h);
  }
  function l(h) {
    return h === 43 || h === 45 || h === 46 || Ye(h) ? (r = 1, a(h)) : c(h);
  }
  function a(h) {
    return h === 58 ? (e.consume(h), r = 0, u) : (h === 43 || h === 45 || h === 46 || Ye(h)) && r++ < 32 ? (e.consume(h), a) : (r = 0, c(h));
  }
  function u(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : h === null || h === 32 || h === 60 || qn(h) ? n(h) : (e.consume(h), u);
  }
  function c(h) {
    return h === 64 ? (e.consume(h), s) : Dl(h) ? (e.consume(h), c) : n(h);
  }
  function s(h) {
    return Ye(h) ? d(h) : n(h);
  }
  function d(h) {
    return h === 46 ? (e.consume(h), r = 0, s) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : m(h);
  }
  function m(h) {
    if ((h === 45 || Ye(h)) && r++ < 63) {
      const x = h === 45 ? m : d;
      return e.consume(h), x;
    }
    return n(h);
  }
}
const yn = {
  partial: !0,
  tokenize: Gl
};
function Gl(e, t, n) {
  return r;
  function r(o) {
    return Q(o) ? se(e, i, "linePrefix")(o) : i(o);
  }
  function i(o) {
    return o === null || B(o) ? t(o) : n(o);
  }
}
const zi = {
  continuation: {
    tokenize: Xl
  },
  exit: Jl,
  name: "blockQuote",
  tokenize: Yl
};
function Yl(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    if (l === 62) {
      const a = r.containerState;
      return a.open || (e.enter("blockQuote", {
        _container: !0
      }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(l), e.exit("blockQuoteMarker"), o;
    }
    return n(l);
  }
  function o(l) {
    return Q(l) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(l), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(l));
  }
}
function Xl(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return Q(l) ? se(e, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : o(l);
  }
  function o(l) {
    return e.attempt(zi, t, n)(l);
  }
}
function Jl(e) {
  e.exit("blockQuote");
}
const Fi = {
  name: "characterEscape",
  tokenize: Kl
};
function Kl(e, t, n) {
  return r;
  function r(o) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(o), e.exit("escapeMarker"), i;
  }
  function i(o) {
    return Ol(o) ? (e.enter("characterEscapeValue"), e.consume(o), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(o);
  }
}
const Ui = {
  name: "characterReference",
  tokenize: Ql
};
function Ql(e, t, n) {
  const r = this;
  let i = 0, o, l;
  return a;
  function a(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), u;
  }
  function u(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), c) : (e.enter("characterReferenceValue"), o = 31, l = Ye, s(d));
  }
  function c(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), o = 6, l = Pl, s) : (e.enter("characterReferenceValue"), o = 7, l = Gn, s(d));
  }
  function s(d) {
    if (d === 59 && i) {
      const m = e.exit("characterReferenceValue");
      return l === Ye && !cr(r.sliceSerialize(m)) ? n(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return l(d) && i++ < o ? (e.consume(d), s) : n(d);
  }
}
const Fr = {
  partial: !0,
  tokenize: ta
}, Ur = {
  concrete: !0,
  name: "codeFenced",
  tokenize: ea
};
function ea(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: W
  };
  let o = 0, l = 0, a;
  return u;
  function u(w) {
    return c(w);
  }
  function c(w) {
    const F = r.events[r.events.length - 1];
    return o = F && F[1].type === "linePrefix" ? F[2].sliceSerialize(F[1], !0).length : 0, a = w, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), s(w);
  }
  function s(w) {
    return w === a ? (l++, e.consume(w), s) : l < 3 ? n(w) : (e.exit("codeFencedFenceSequence"), Q(w) ? se(e, d, "whitespace")(w) : d(w));
  }
  function d(w) {
    return w === null || B(w) ? (e.exit("codeFencedFence"), r.interrupt ? t(w) : e.check(Fr, k, D)(w)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), m(w));
  }
  function m(w) {
    return w === null || B(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(w)) : Q(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), se(e, h, "whitespace")(w)) : w === 96 && w === a ? n(w) : (e.consume(w), m);
  }
  function h(w) {
    return w === null || B(w) ? d(w) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), x(w));
  }
  function x(w) {
    return w === null || B(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(w)) : w === 96 && w === a ? n(w) : (e.consume(w), x);
  }
  function k(w) {
    return e.attempt(i, D, A)(w);
  }
  function A(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), b;
  }
  function b(w) {
    return o > 0 && Q(w) ? se(e, I, "linePrefix", o + 1)(w) : I(w);
  }
  function I(w) {
    return w === null || B(w) ? e.check(Fr, k, D)(w) : (e.enter("codeFlowValue"), v(w));
  }
  function v(w) {
    return w === null || B(w) ? (e.exit("codeFlowValue"), I(w)) : (e.consume(w), v);
  }
  function D(w) {
    return e.exit("codeFenced"), t(w);
  }
  function W(w, F, te) {
    let P = 0;
    return ne;
    function ne(Z) {
      return w.enter("lineEnding"), w.consume(Z), w.exit("lineEnding"), N;
    }
    function N(Z) {
      return w.enter("codeFencedFence"), Q(Z) ? se(w, R, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(Z) : R(Z);
    }
    function R(Z) {
      return Z === a ? (w.enter("codeFencedFenceSequence"), J(Z)) : te(Z);
    }
    function J(Z) {
      return Z === a ? (P++, w.consume(Z), J) : P >= l ? (w.exit("codeFencedFenceSequence"), Q(Z) ? se(w, le, "whitespace")(Z) : le(Z)) : te(Z);
    }
    function le(Z) {
      return Z === null || B(Z) ? (w.exit("codeFencedFence"), F(Z)) : te(Z);
    }
  }
}
function ta(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return l === null ? n(l) : (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), o);
  }
  function o(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
const Tn = {
  name: "codeIndented",
  tokenize: ra
}, na = {
  partial: !0,
  tokenize: ia
};
function ra(e, t, n) {
  const r = this;
  return i;
  function i(c) {
    return e.enter("codeIndented"), se(e, o, "linePrefix", 5)(c);
  }
  function o(c) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? l(c) : n(c);
  }
  function l(c) {
    return c === null ? u(c) : B(c) ? e.attempt(na, l, u)(c) : (e.enter("codeFlowValue"), a(c));
  }
  function a(c) {
    return c === null || B(c) ? (e.exit("codeFlowValue"), l(c)) : (e.consume(c), a);
  }
  function u(c) {
    return e.exit("codeIndented"), t(c);
  }
}
function ia(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line] ? n(l) : B(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), i) : se(e, o, "linePrefix", 5)(l);
  }
  function o(l) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(l) : B(l) ? i(l) : n(l);
  }
}
const oa = {
  name: "codeText",
  previous: aa,
  resolve: la,
  tokenize: sa
};
function la(e) {
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
function aa(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function sa(e, t, n) {
  let r = 0, i, o;
  return l;
  function l(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(d);
  }
  function a(d) {
    return d === 96 ? (e.consume(d), r++, a) : (e.exit("codeTextSequence"), u(d));
  }
  function u(d) {
    return d === null ? n(d) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), u) : d === 96 ? (o = e.enter("codeTextSequence"), i = 0, s(d)) : B(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), u) : (e.enter("codeTextData"), c(d));
  }
  function c(d) {
    return d === null || d === 32 || d === 96 || B(d) ? (e.exit("codeTextData"), u(d)) : (e.consume(d), c);
  }
  function s(d) {
    return d === 96 ? (e.consume(d), i++, s) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(d)) : (o.type = "codeTextData", c(d));
  }
}
class ua {
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
    const o = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && jt(this.left, r), o.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), jt(this.left, t);
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
    this.setCursor(0), jt(this.right, t.reverse());
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
        jt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        jt(this.left, n.reverse());
      }
  }
}
function jt(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function Bi(e) {
  const t = {};
  let n = -1, r, i, o, l, a, u, c;
  const s = new ua(e);
  for (; ++n < s.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = s.get(n), n && r[1].type === "chunkFlow" && s.get(n - 1)[1].type === "listItemPrefix" && (u = r[1]._tokenizer.events, o = 0, o < u.length && u[o][1].type === "lineEndingBlank" && (o += 2), o < u.length && u[o][1].type === "content"))
      for (; ++o < u.length && u[o][1].type !== "content"; )
        u[o][1].type === "chunkText" && (u[o][1]._isInFirstContentOfListItem = !0, o++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, ca(s, n)), n = t[n], c = !0);
    else if (r[1]._container) {
      for (o = n, i = void 0; o--; )
        if (l = s.get(o), l[1].type === "lineEnding" || l[1].type === "lineEndingBlank")
          l[0] === "enter" && (i && (s.get(i)[1].type = "lineEndingBlank"), l[1].type = "lineEnding", i = o);
        else if (!(l[1].type === "linePrefix" || l[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...s.get(i)[1].start
      }, a = s.slice(i, n), a.unshift(r), s.splice(i, n - i + 1, a));
    }
  }
  return dt(e, 0, Number.POSITIVE_INFINITY, s.slice(0)), !c;
}
function ca(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const o = [];
  let l = n._tokenizer;
  l || (l = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (l._contentTypeTextTrailing = !0));
  const a = l.events, u = [], c = {};
  let s, d, m = -1, h = n, x = 0, k = 0;
  const A = [k];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; )
      ;
    o.push(i), h._tokenizer || (s = r.sliceStream(h), h.next || s.push(null), d && l.defineSkip(h.start), h._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(s), h._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), d = h, h = h.next;
  }
  for (h = n; ++m < a.length; )
    // Find a void token that includes a break.
    a[m][0] === "exit" && a[m - 1][0] === "enter" && a[m][1].type === a[m - 1][1].type && a[m][1].start.line !== a[m][1].end.line && (k = m + 1, A.push(k), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (l.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : A.pop(), m = A.length; m--; ) {
    const b = a.slice(A[m], A[m + 1]), I = o.pop();
    u.push([I, I + b.length - 1]), e.splice(I, 2, b);
  }
  for (u.reverse(), m = -1; ++m < u.length; )
    c[x + u[m][0]] = x + u[m][1], x += u[m][1] - u[m][0] - 1;
  return c;
}
const pa = {
  resolve: da,
  tokenize: fa
}, ha = {
  partial: !0,
  tokenize: ma
};
function da(e) {
  return Bi(e), e;
}
function fa(e, t) {
  let n;
  return r;
  function r(a) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? o(a) : B(a) ? e.check(ha, l, o)(a) : (e.consume(a), i);
  }
  function o(a) {
    return e.exit("chunkContent"), e.exit("content"), t(a);
  }
  function l(a) {
    return e.consume(a), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, i;
  }
}
function ma(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), se(e, o, "linePrefix");
  }
  function o(l) {
    if (l === null || B(l))
      return n(l);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(l) : e.interrupt(r.parser.constructs.flow, n, t)(l);
  }
}
function Hi(e, t, n, r, i, o, l, a, u) {
  const c = u || Number.POSITIVE_INFINITY;
  let s = 0;
  return d;
  function d(b) {
    return b === 60 ? (e.enter(r), e.enter(i), e.enter(o), e.consume(b), e.exit(o), m) : b === null || b === 32 || b === 41 || qn(b) ? n(b) : (e.enter(r), e.enter(l), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), k(b));
  }
  function m(b) {
    return b === 62 ? (e.enter(o), e.consume(b), e.exit(o), e.exit(i), e.exit(r), t) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), h(b));
  }
  function h(b) {
    return b === 62 ? (e.exit("chunkString"), e.exit(a), m(b)) : b === null || b === 60 || B(b) ? n(b) : (e.consume(b), b === 92 ? x : h);
  }
  function x(b) {
    return b === 60 || b === 62 || b === 92 ? (e.consume(b), h) : h(b);
  }
  function k(b) {
    return !s && (b === null || b === 41 || We(b)) ? (e.exit("chunkString"), e.exit(a), e.exit(l), e.exit(r), t(b)) : s < c && b === 40 ? (e.consume(b), s++, k) : b === 41 ? (e.consume(b), s--, k) : b === null || b === 32 || b === 40 || qn(b) ? n(b) : (e.consume(b), b === 92 ? A : k);
  }
  function A(b) {
    return b === 40 || b === 41 || b === 92 ? (e.consume(b), k) : k(b);
  }
}
function ji(e, t, n, r, i, o) {
  const l = this;
  let a = 0, u;
  return c;
  function c(h) {
    return e.enter(r), e.enter(i), e.consume(h), e.exit(i), e.enter(o), s;
  }
  function s(h) {
    return a > 999 || h === null || h === 91 || h === 93 && !u || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === 94 && !a && "_hiddenFootnoteSupport" in l.parser.constructs ? n(h) : h === 93 ? (e.exit(o), e.enter(i), e.consume(h), e.exit(i), e.exit(r), t) : B(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), s) : (e.enter("chunkString", {
      contentType: "string"
    }), d(h));
  }
  function d(h) {
    return h === null || h === 91 || h === 93 || B(h) || a++ > 999 ? (e.exit("chunkString"), s(h)) : (e.consume(h), u || (u = !Q(h)), h === 92 ? m : d);
  }
  function m(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), a++, d) : d(h);
  }
}
function Vi(e, t, n, r, i, o) {
  let l;
  return a;
  function a(m) {
    return m === 34 || m === 39 || m === 40 ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), l = m === 40 ? 41 : m, u) : n(m);
  }
  function u(m) {
    return m === l ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), t) : (e.enter(o), c(m));
  }
  function c(m) {
    return m === l ? (e.exit(o), u(l)) : m === null ? n(m) : B(m) ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), se(e, c, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), s(m));
  }
  function s(m) {
    return m === l || m === null || B(m) ? (e.exit("chunkString"), c(m)) : (e.consume(m), m === 92 ? d : s);
  }
  function d(m) {
    return m === l || m === 92 ? (e.consume(m), s) : s(m);
  }
}
function Xt(e, t) {
  let n;
  return r;
  function r(i) {
    return B(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : Q(i) ? se(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const ga = {
  name: "definition",
  tokenize: Ca
}, ya = {
  partial: !0,
  tokenize: wa
};
function Ca(e, t, n) {
  const r = this;
  let i;
  return o;
  function o(h) {
    return e.enter("definition"), l(h);
  }
  function l(h) {
    return ji.call(
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
    return i = Ft(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), u) : n(h);
  }
  function u(h) {
    return We(h) ? Xt(e, c)(h) : c(h);
  }
  function c(h) {
    return Hi(
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
    return e.attempt(ya, d, d)(h);
  }
  function d(h) {
    return Q(h) ? se(e, m, "whitespace")(h) : m(h);
  }
  function m(h) {
    return h === null || B(h) ? (e.exit("definition"), r.parser.defined.push(i), t(h)) : n(h);
  }
}
function wa(e, t, n) {
  return r;
  function r(a) {
    return We(a) ? Xt(e, i)(a) : n(a);
  }
  function i(a) {
    return Vi(e, o, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function o(a) {
    return Q(a) ? se(e, l, "whitespace")(a) : l(a);
  }
  function l(a) {
    return a === null || B(a) ? t(a) : n(a);
  }
}
const xa = {
  name: "hardBreakEscape",
  tokenize: ka
};
function ka(e, t, n) {
  return r;
  function r(o) {
    return e.enter("hardBreakEscape"), e.consume(o), i;
  }
  function i(o) {
    return B(o) ? (e.exit("hardBreakEscape"), t(o)) : n(o);
  }
}
const ba = {
  name: "headingAtx",
  resolve: _a,
  tokenize: Sa
};
function _a(e, t) {
  let n = e.length - 2, r = 3, i, o;
  return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[n][1].end
  }, o = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[n][1].end,
    contentType: "text"
  }, dt(e, r, n - r + 1, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["exit", i, t]])), e;
}
function Sa(e, t, n) {
  let r = 0;
  return i;
  function i(s) {
    return e.enter("atxHeading"), o(s);
  }
  function o(s) {
    return e.enter("atxHeadingSequence"), l(s);
  }
  function l(s) {
    return s === 35 && r++ < 6 ? (e.consume(s), l) : s === null || We(s) ? (e.exit("atxHeadingSequence"), a(s)) : n(s);
  }
  function a(s) {
    return s === 35 ? (e.enter("atxHeadingSequence"), u(s)) : s === null || B(s) ? (e.exit("atxHeading"), t(s)) : Q(s) ? se(e, a, "whitespace")(s) : (e.enter("atxHeadingText"), c(s));
  }
  function u(s) {
    return s === 35 ? (e.consume(s), u) : (e.exit("atxHeadingSequence"), a(s));
  }
  function c(s) {
    return s === null || s === 35 || We(s) ? (e.exit("atxHeadingText"), a(s)) : (e.consume(s), c);
  }
}
const Ea = [
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
], Br = ["pre", "script", "style", "textarea"], Ta = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Aa,
  tokenize: Na
}, va = {
  partial: !0,
  tokenize: Ma
}, Ia = {
  partial: !0,
  tokenize: La
};
function Aa(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Na(e, t, n) {
  const r = this;
  let i, o, l, a, u;
  return c;
  function c(f) {
    return s(f);
  }
  function s(f) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(f), d;
  }
  function d(f) {
    return f === 33 ? (e.consume(f), m) : f === 47 ? (e.consume(f), o = !0, k) : f === 63 ? (e.consume(f), i = 3, r.interrupt ? t : g) : ht(f) ? (e.consume(f), l = String.fromCharCode(f), A) : n(f);
  }
  function m(f) {
    return f === 45 ? (e.consume(f), i = 2, h) : f === 91 ? (e.consume(f), i = 5, a = 0, x) : ht(f) ? (e.consume(f), i = 4, r.interrupt ? t : g) : n(f);
  }
  function h(f) {
    return f === 45 ? (e.consume(f), r.interrupt ? t : g) : n(f);
  }
  function x(f) {
    const Se = "CDATA[";
    return f === Se.charCodeAt(a++) ? (e.consume(f), a === Se.length ? r.interrupt ? t : R : x) : n(f);
  }
  function k(f) {
    return ht(f) ? (e.consume(f), l = String.fromCharCode(f), A) : n(f);
  }
  function A(f) {
    if (f === null || f === 47 || f === 62 || We(f)) {
      const Se = f === 47, X = l.toLowerCase();
      return !Se && !o && Br.includes(X) ? (i = 1, r.interrupt ? t(f) : R(f)) : Ea.includes(l.toLowerCase()) ? (i = 6, Se ? (e.consume(f), b) : r.interrupt ? t(f) : R(f)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(f) : o ? I(f) : v(f));
    }
    return f === 45 || Ye(f) ? (e.consume(f), l += String.fromCharCode(f), A) : n(f);
  }
  function b(f) {
    return f === 62 ? (e.consume(f), r.interrupt ? t : R) : n(f);
  }
  function I(f) {
    return Q(f) ? (e.consume(f), I) : ne(f);
  }
  function v(f) {
    return f === 47 ? (e.consume(f), ne) : f === 58 || f === 95 || ht(f) ? (e.consume(f), D) : Q(f) ? (e.consume(f), v) : ne(f);
  }
  function D(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || Ye(f) ? (e.consume(f), D) : W(f);
  }
  function W(f) {
    return f === 61 ? (e.consume(f), w) : Q(f) ? (e.consume(f), W) : v(f);
  }
  function w(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), u = f, F) : Q(f) ? (e.consume(f), w) : te(f);
  }
  function F(f) {
    return f === u ? (e.consume(f), u = null, P) : f === null || B(f) ? n(f) : (e.consume(f), F);
  }
  function te(f) {
    return f === null || f === 34 || f === 39 || f === 47 || f === 60 || f === 61 || f === 62 || f === 96 || We(f) ? W(f) : (e.consume(f), te);
  }
  function P(f) {
    return f === 47 || f === 62 || Q(f) ? v(f) : n(f);
  }
  function ne(f) {
    return f === 62 ? (e.consume(f), N) : n(f);
  }
  function N(f) {
    return f === null || B(f) ? R(f) : Q(f) ? (e.consume(f), N) : n(f);
  }
  function R(f) {
    return f === 45 && i === 2 ? (e.consume(f), me) : f === 60 && i === 1 ? (e.consume(f), de) : f === 62 && i === 4 ? (e.consume(f), G) : f === 63 && i === 3 ? (e.consume(f), g) : f === 93 && i === 5 ? (e.consume(f), Fe) : B(f) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(va, Ue, J)(f)) : f === null || B(f) ? (e.exit("htmlFlowData"), J(f)) : (e.consume(f), R);
  }
  function J(f) {
    return e.check(Ia, le, Ue)(f);
  }
  function le(f) {
    return e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), Z;
  }
  function Z(f) {
    return f === null || B(f) ? J(f) : (e.enter("htmlFlowData"), R(f));
  }
  function me(f) {
    return f === 45 ? (e.consume(f), g) : R(f);
  }
  function de(f) {
    return f === 47 ? (e.consume(f), l = "", ve) : R(f);
  }
  function ve(f) {
    if (f === 62) {
      const Se = l.toLowerCase();
      return Br.includes(Se) ? (e.consume(f), G) : R(f);
    }
    return ht(f) && l.length < 8 ? (e.consume(f), l += String.fromCharCode(f), ve) : R(f);
  }
  function Fe(f) {
    return f === 93 ? (e.consume(f), g) : R(f);
  }
  function g(f) {
    return f === 62 ? (e.consume(f), G) : f === 45 && i === 2 ? (e.consume(f), g) : R(f);
  }
  function G(f) {
    return f === null || B(f) ? (e.exit("htmlFlowData"), Ue(f)) : (e.consume(f), G);
  }
  function Ue(f) {
    return e.exit("htmlFlow"), t(f);
  }
}
function La(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return B(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), o) : n(l);
  }
  function o(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
function Ma(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(yn, t, n);
  }
}
const Ra = {
  name: "htmlText",
  tokenize: Da
};
function Da(e, t, n) {
  const r = this;
  let i, o, l;
  return a;
  function a(g) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), u;
  }
  function u(g) {
    return g === 33 ? (e.consume(g), c) : g === 47 ? (e.consume(g), W) : g === 63 ? (e.consume(g), v) : ht(g) ? (e.consume(g), te) : n(g);
  }
  function c(g) {
    return g === 45 ? (e.consume(g), s) : g === 91 ? (e.consume(g), o = 0, x) : ht(g) ? (e.consume(g), I) : n(g);
  }
  function s(g) {
    return g === 45 ? (e.consume(g), h) : n(g);
  }
  function d(g) {
    return g === null ? n(g) : g === 45 ? (e.consume(g), m) : B(g) ? (l = d, de(g)) : (e.consume(g), d);
  }
  function m(g) {
    return g === 45 ? (e.consume(g), h) : d(g);
  }
  function h(g) {
    return g === 62 ? me(g) : g === 45 ? m(g) : d(g);
  }
  function x(g) {
    const G = "CDATA[";
    return g === G.charCodeAt(o++) ? (e.consume(g), o === G.length ? k : x) : n(g);
  }
  function k(g) {
    return g === null ? n(g) : g === 93 ? (e.consume(g), A) : B(g) ? (l = k, de(g)) : (e.consume(g), k);
  }
  function A(g) {
    return g === 93 ? (e.consume(g), b) : k(g);
  }
  function b(g) {
    return g === 62 ? me(g) : g === 93 ? (e.consume(g), b) : k(g);
  }
  function I(g) {
    return g === null || g === 62 ? me(g) : B(g) ? (l = I, de(g)) : (e.consume(g), I);
  }
  function v(g) {
    return g === null ? n(g) : g === 63 ? (e.consume(g), D) : B(g) ? (l = v, de(g)) : (e.consume(g), v);
  }
  function D(g) {
    return g === 62 ? me(g) : v(g);
  }
  function W(g) {
    return ht(g) ? (e.consume(g), w) : n(g);
  }
  function w(g) {
    return g === 45 || Ye(g) ? (e.consume(g), w) : F(g);
  }
  function F(g) {
    return B(g) ? (l = F, de(g)) : Q(g) ? (e.consume(g), F) : me(g);
  }
  function te(g) {
    return g === 45 || Ye(g) ? (e.consume(g), te) : g === 47 || g === 62 || We(g) ? P(g) : n(g);
  }
  function P(g) {
    return g === 47 ? (e.consume(g), me) : g === 58 || g === 95 || ht(g) ? (e.consume(g), ne) : B(g) ? (l = P, de(g)) : Q(g) ? (e.consume(g), P) : me(g);
  }
  function ne(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || Ye(g) ? (e.consume(g), ne) : N(g);
  }
  function N(g) {
    return g === 61 ? (e.consume(g), R) : B(g) ? (l = N, de(g)) : Q(g) ? (e.consume(g), N) : P(g);
  }
  function R(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), i = g, J) : B(g) ? (l = R, de(g)) : Q(g) ? (e.consume(g), R) : (e.consume(g), le);
  }
  function J(g) {
    return g === i ? (e.consume(g), i = void 0, Z) : g === null ? n(g) : B(g) ? (l = J, de(g)) : (e.consume(g), J);
  }
  function le(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? n(g) : g === 47 || g === 62 || We(g) ? P(g) : (e.consume(g), le);
  }
  function Z(g) {
    return g === 47 || g === 62 || We(g) ? P(g) : n(g);
  }
  function me(g) {
    return g === 62 ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(g);
  }
  function de(g) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), ve;
  }
  function ve(g) {
    return Q(g) ? se(e, Fe, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(g) : Fe(g);
  }
  function Fe(g) {
    return e.enter("htmlTextData"), l(g);
  }
}
const hr = {
  name: "labelEnd",
  resolveAll: Fa,
  resolveTo: Ua,
  tokenize: Ba
}, Pa = {
  tokenize: Ha
}, Oa = {
  tokenize: ja
}, za = {
  tokenize: Va
};
function Fa(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e.length !== n.length && dt(e, 0, e.length, n), e;
}
function Ua(e, t) {
  let n = e.length, r = 0, i, o, l, a;
  for (; n--; )
    if (i = e[n][1], o) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (l) {
      if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (o = n, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (l = n);
  const u = {
    type: e[o][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[o][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, c = {
    type: "label",
    start: {
      ...e[o][1].start
    },
    end: {
      ...e[l][1].end
    }
  }, s = {
    type: "labelText",
    start: {
      ...e[o + r + 2][1].end
    },
    end: {
      ...e[l - 2][1].start
    }
  };
  return a = [["enter", u, t], ["enter", c, t]], a = et(a, e.slice(o + 1, o + r + 3)), a = et(a, [["enter", s, t]]), a = et(a, pr(t.parser.constructs.insideSpan.null, e.slice(o + r + 4, l - 3), t)), a = et(a, [["exit", s, t], e[l - 2], e[l - 1], ["exit", c, t]]), a = et(a, e.slice(l + 1)), a = et(a, [["exit", u, t]]), dt(e, o, e.length, a), e;
}
function Ba(e, t, n) {
  const r = this;
  let i = r.events.length, o, l;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      o = r.events[i][1];
      break;
    }
  return a;
  function a(m) {
    return o ? o._inactive ? d(m) : (l = r.parser.defined.includes(Ft(r.sliceSerialize({
      start: o.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(m), e.exit("labelMarker"), e.exit("labelEnd"), u) : n(m);
  }
  function u(m) {
    return m === 40 ? e.attempt(Pa, s, l ? s : d)(m) : m === 91 ? e.attempt(Oa, s, l ? c : d)(m) : l ? s(m) : d(m);
  }
  function c(m) {
    return e.attempt(za, s, d)(m);
  }
  function s(m) {
    return t(m);
  }
  function d(m) {
    return o._balanced = !0, n(m);
  }
}
function Ha(e, t, n) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), i;
  }
  function i(d) {
    return We(d) ? Xt(e, o)(d) : o(d);
  }
  function o(d) {
    return d === 41 ? s(d) : Hi(e, l, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function l(d) {
    return We(d) ? Xt(e, u)(d) : s(d);
  }
  function a(d) {
    return n(d);
  }
  function u(d) {
    return d === 34 || d === 39 || d === 40 ? Vi(e, c, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : s(d);
  }
  function c(d) {
    return We(d) ? Xt(e, s)(d) : s(d);
  }
  function s(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), t) : n(d);
  }
}
function ja(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return ji.call(r, e, o, l, "reference", "referenceMarker", "referenceString")(a);
  }
  function o(a) {
    return r.parser.defined.includes(Ft(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(a) : n(a);
  }
  function l(a) {
    return n(a);
  }
}
function Va(e, t, n) {
  return r;
  function r(o) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), i;
  }
  function i(o) {
    return o === 93 ? (e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), e.exit("reference"), t) : n(o);
  }
}
const Wa = {
  name: "labelStartImage",
  resolveAll: hr.resolveAll,
  tokenize: $a
};
function $a(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), o;
  }
  function o(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), l) : n(a);
  }
  function l(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(a) : t(a);
  }
}
const Za = {
  name: "labelStartLink",
  resolveAll: hr.resolveAll,
  tokenize: qa
};
function qa(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(l), e.exit("labelMarker"), e.exit("labelLink"), o;
  }
  function o(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : t(l);
  }
}
const vn = {
  name: "lineEnding",
  tokenize: Ga
};
function Ga(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), se(e, t, "linePrefix");
  }
}
const sn = {
  name: "thematicBreak",
  tokenize: Ya
};
function Ya(e, t, n) {
  let r = 0, i;
  return o;
  function o(c) {
    return e.enter("thematicBreak"), l(c);
  }
  function l(c) {
    return i = c, a(c);
  }
  function a(c) {
    return c === i ? (e.enter("thematicBreakSequence"), u(c)) : r >= 3 && (c === null || B(c)) ? (e.exit("thematicBreak"), t(c)) : n(c);
  }
  function u(c) {
    return c === i ? (e.consume(c), r++, u) : (e.exit("thematicBreakSequence"), Q(c) ? se(e, a, "whitespace")(c) : a(c));
  }
}
const Ve = {
  continuation: {
    tokenize: Qa
  },
  exit: ts,
  name: "list",
  tokenize: Ka
}, Xa = {
  partial: !0,
  tokenize: ns
}, Ja = {
  partial: !0,
  tokenize: es
};
function Ka(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let o = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, l = 0;
  return a;
  function a(h) {
    const x = r.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (x === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : Gn(h)) {
      if (r.containerState.type || (r.containerState.type = x, e.enter(x, {
        _container: !0
      })), x === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(sn, n, c)(h) : c(h);
      if (!r.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), u(h);
    }
    return n(h);
  }
  function u(h) {
    return Gn(h) && ++l < 10 ? (e.consume(h), u) : (!r.interrupt || l < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), c(h)) : n(h);
  }
  function c(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e.check(
      yn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : s,
      e.attempt(Xa, m, d)
    );
  }
  function s(h) {
    return r.containerState.initialBlankLine = !0, o++, m(h);
  }
  function d(h) {
    return Q(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), m) : n(h);
  }
  function m(h) {
    return r.containerState.size = o + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(h);
  }
}
function Qa(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(yn, i, o);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, se(e, t, "listItemIndent", r.containerState.size + 1)(a);
  }
  function o(a) {
    return r.containerState.furtherBlankLines || !Q(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Ja, t, l)(a));
  }
  function l(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, se(e, e.attempt(Ve, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function es(e, t, n) {
  const r = this;
  return se(e, i, "listItemIndent", r.containerState.size + 1);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], !0).length === r.containerState.size ? t(o) : n(o);
  }
}
function ts(e) {
  e.exit(this.containerState.type);
}
function ns(e, t, n) {
  const r = this;
  return se(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return !Q(o) && l && l[1].type === "listItemPrefixWhitespace" ? t(o) : n(o);
  }
}
const Hr = {
  name: "setextUnderline",
  resolveTo: rs,
  tokenize: is
};
function rs(e, t) {
  let n = e.length, r, i, o;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === "content") {
        r = n;
        break;
      }
      e[n][1].type === "paragraph" && (i = n);
    } else
      e[n][1].type === "content" && e.splice(n, 1), !o && e[n][1].type === "definition" && (o = n);
  const l = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", o ? (e.splice(i, 0, ["enter", l, t]), e.splice(o + 1, 0, ["exit", e[r][1], t]), e[r][1].end = {
    ...e[o][1].end
  }) : e[r][1] = l, e.push(["exit", l, t]), e;
}
function is(e, t, n) {
  const r = this;
  let i;
  return o;
  function o(c) {
    let s = r.events.length, d;
    for (; s--; )
      if (r.events[s][1].type !== "lineEnding" && r.events[s][1].type !== "linePrefix" && r.events[s][1].type !== "content") {
        d = r.events[s][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || d) ? (e.enter("setextHeadingLine"), i = c, l(c)) : n(c);
  }
  function l(c) {
    return e.enter("setextHeadingLineSequence"), a(c);
  }
  function a(c) {
    return c === i ? (e.consume(c), a) : (e.exit("setextHeadingLineSequence"), Q(c) ? se(e, u, "lineSuffix")(c) : u(c));
  }
  function u(c) {
    return c === null || B(c) ? (e.exit("setextHeadingLine"), t(c)) : n(c);
  }
}
const os = {
  tokenize: ls
};
function ls(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    yn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, se(e, e.attempt(this.parser.constructs.flow, i, e.attempt(pa, i)), "linePrefix"))
  );
  return n;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(o), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
  }
  function i(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), t.currentConstruct = void 0, n;
  }
}
const as = {
  resolveAll: $i()
}, ss = Wi("string"), us = Wi("text");
function Wi(e) {
  return {
    resolveAll: $i(e === "text" ? cs : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], o = n.attempt(i, l, a);
    return l;
    function l(s) {
      return c(s) ? o(s) : a(s);
    }
    function a(s) {
      if (s === null) {
        n.consume(s);
        return;
      }
      return n.enter("data"), n.consume(s), u;
    }
    function u(s) {
      return c(s) ? (n.exit("data"), o(s)) : (n.consume(s), u);
    }
    function c(s) {
      if (s === null)
        return !0;
      const d = i[s];
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
function $i(e) {
  return t;
  function t(n, r) {
    let i = -1, o;
    for (; ++i <= n.length; )
      o === void 0 ? n[i] && n[i][1].type === "data" && (o = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== o + 2 && (n[o][1].end = n[i - 1][1].end, n.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
    return e ? e(n, r) : n;
  }
}
function cs(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let o = i.length, l = -1, a = 0, u;
      for (; o--; ) {
        const c = i[o];
        if (typeof c == "string") {
          for (l = c.length; c.charCodeAt(l - 1) === 32; )
            a++, l--;
          if (l) break;
          l = -1;
        } else if (c === -2)
          u = !0, a++;
        else if (c !== -1) {
          o++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (a = 0), a) {
        const c = {
          type: n === e.length || u || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: o ? l : r.start._bufferIndex + l,
            _index: r.start._index + o,
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a
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
const ps = {
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
  62: zi
}, hs = {
  91: ga
}, ds = {
  [-2]: Tn,
  [-1]: Tn,
  32: Tn
}, fs = {
  35: ba,
  42: sn,
  45: [Hr, sn],
  60: Ta,
  61: Hr,
  95: sn,
  96: Ur,
  126: Ur
}, ms = {
  38: Ui,
  92: Fi
}, gs = {
  [-5]: vn,
  [-4]: vn,
  [-3]: vn,
  33: Wa,
  38: Ui,
  42: Yn,
  60: [Zl, Ra],
  91: Za,
  92: [xa, Fi],
  93: hr,
  95: Yn,
  96: oa
}, ys = {
  null: [Yn, as]
}, Cs = {
  null: [42, 95]
}, ws = {
  null: []
}, xs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Cs,
  contentInitial: hs,
  disable: ws,
  document: ps,
  flow: fs,
  flowInitial: ds,
  insideSpan: ys,
  string: ms,
  text: gs
}, Symbol.toStringTag, { value: "Module" }));
function ks(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, o = [];
  let l = [], a = [];
  const u = {
    attempt: F(W),
    check: F(w),
    consume: I,
    enter: v,
    exit: D,
    interrupt: F(w, {
      interrupt: !0
    })
  }, c = {
    code: null,
    containerState: {},
    defineSkip: k,
    events: [],
    now: x,
    parser: e,
    previous: null,
    sliceSerialize: m,
    sliceStream: h,
    write: d
  };
  let s = t.tokenize.call(c, u);
  return t.resolveAll && o.push(t), c;
  function d(N) {
    return l = et(l, N), A(), l[l.length - 1] !== null ? [] : (te(t, 0), c.events = pr(o, c.events, c), c.events);
  }
  function m(N, R) {
    return _s(h(N), R);
  }
  function h(N) {
    return bs(l, N);
  }
  function x() {
    const {
      _bufferIndex: N,
      _index: R,
      line: J,
      column: le,
      offset: Z
    } = r;
    return {
      _bufferIndex: N,
      _index: R,
      line: J,
      column: le,
      offset: Z
    };
  }
  function k(N) {
    i[N.line] = N.column, ne();
  }
  function A() {
    let N;
    for (; r._index < l.length; ) {
      const R = l[r._index];
      if (typeof R == "string")
        for (N = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === N && r._bufferIndex < R.length; )
          b(R.charCodeAt(r._bufferIndex));
      else
        b(R);
    }
  }
  function b(N) {
    s = s(N);
  }
  function I(N) {
    B(N) ? (r.line++, r.column = 1, r.offset += N === -3 ? 2 : 1, ne()) : N !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = N;
  }
  function v(N, R) {
    const J = R || {};
    return J.type = N, J.start = x(), c.events.push(["enter", J, c]), a.push(J), J;
  }
  function D(N) {
    const R = a.pop();
    return R.end = x(), c.events.push(["exit", R, c]), R;
  }
  function W(N, R) {
    te(N, R.from);
  }
  function w(N, R) {
    R.restore();
  }
  function F(N, R) {
    return J;
    function J(le, Z, me) {
      let de, ve, Fe, g;
      return Array.isArray(le) ? (
        /* c8 ignore next 1 */
        Ue(le)
      ) : "tokenize" in le ? (
        // Looks like a construct.
        Ue([
          /** @type {Construct} */
          le
        ])
      ) : G(le);
      function G(ie) {
        return Me;
        function Me(xe) {
          const nt = xe !== null && ie[xe], Xe = xe !== null && ie.null, rt = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(nt) ? nt : nt ? [nt] : [],
            ...Array.isArray(Xe) ? Xe : Xe ? [Xe] : []
          ];
          return Ue(rt)(xe);
        }
      }
      function Ue(ie) {
        return de = ie, ve = 0, ie.length === 0 ? me : f(ie[ve]);
      }
      function f(ie) {
        return Me;
        function Me(xe) {
          return g = P(), Fe = ie, ie.partial || (c.currentConstruct = ie), ie.name && c.parser.constructs.disable.null.includes(ie.name) ? X() : ie.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            R ? Object.assign(Object.create(c), R) : c,
            u,
            Se,
            X
          )(xe);
        }
      }
      function Se(ie) {
        return N(Fe, g), Z;
      }
      function X(ie) {
        return g.restore(), ++ve < de.length ? f(de[ve]) : me;
      }
    }
  }
  function te(N, R) {
    N.resolveAll && !o.includes(N) && o.push(N), N.resolve && dt(c.events, R, c.events.length - R, N.resolve(c.events.slice(R), c)), N.resolveTo && (c.events = N.resolveTo(c.events, c));
  }
  function P() {
    const N = x(), R = c.previous, J = c.currentConstruct, le = c.events.length, Z = Array.from(a);
    return {
      from: le,
      restore: me
    };
    function me() {
      r = N, c.previous = R, c.currentConstruct = J, c.events.length = le, a = Z, ne();
    }
  }
  function ne() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function bs(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, o = t.end._bufferIndex;
  let l;
  if (n === i)
    l = [e[n].slice(r, o)];
  else {
    if (l = e.slice(n, i), r > -1) {
      const a = l[0];
      typeof a == "string" ? l[0] = a.slice(r) : l.shift();
    }
    o > 0 && l.push(e[i].slice(0, o));
  }
  return l;
}
function _s(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const o = e[n];
    let l;
    if (typeof o == "string")
      l = o;
    else switch (o) {
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
        l = String.fromCharCode(o);
    }
    i = o === -2, r.push(l);
  }
  return r.join("");
}
function Ss(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Ll([xs, ...(e || {}).extensions || []])
    ),
    content: i(Ul),
    defined: [],
    document: i(Hl),
    flow: i(os),
    lazy: {},
    string: i(ss),
    text: i(us)
  };
  return r;
  function i(o) {
    return l;
    function l(a) {
      return ks(r, o, a);
    }
  }
}
function Es(e) {
  for (; !Bi(e); )
    ;
  return e;
}
const jr = /[\0\t\n\r]/g;
function Ts() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(o, l, a) {
    const u = [];
    let c, s, d, m, h;
    for (o = t + (typeof o == "string" ? o.toString() : new TextDecoder(l || void 0).decode(o)), d = 0, t = "", n && (o.charCodeAt(0) === 65279 && d++, n = void 0); d < o.length; ) {
      if (jr.lastIndex = d, c = jr.exec(o), m = c && c.index !== void 0 ? c.index : o.length, h = o.charCodeAt(m), !c) {
        t = o.slice(d);
        break;
      }
      if (h === 10 && d === m && r)
        u.push(-3), r = void 0;
      else
        switch (r && (u.push(-5), r = void 0), d < m && (u.push(o.slice(d, m)), e += m - d), h) {
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
      d = m + 1;
    }
    return a && (r && u.push(-5), t && u.push(t), u.push(null)), u;
  }
}
const vs = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Is(e) {
  return e.replace(vs, As);
}
function As(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), o = i === 120 || i === 88;
    return Oi(n.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return cr(n) || e;
}
const Zi = {}.hasOwnProperty;
function Ns(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Ls(n)(Es(Ss(n).document().write(Ts()(e, t, !0))));
}
function Ls(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: o(ft),
      autolinkProtocol: P,
      autolinkEmail: P,
      atxHeading: o(Je),
      blockQuote: o(Xe),
      characterEscape: P,
      characterReference: P,
      codeFenced: o(rt),
      codeFencedFenceInfo: l,
      codeFencedFenceMeta: l,
      codeIndented: o(rt, l),
      codeText: o(Et, l),
      codeTextData: P,
      data: P,
      codeFlowValue: P,
      definition: o(Ze),
      definitionDestinationString: l,
      definitionLabelString: l,
      definitionTitleString: l,
      emphasis: o(Ie),
      hardBreakEscape: o(Be),
      hardBreakTrailing: o(Be),
      htmlFlow: o(it, l),
      htmlFlowData: P,
      htmlText: o(it, l),
      htmlTextData: P,
      image: o(ke),
      label: l,
      link: o(ft),
      listItem: o(Lt),
      listItemValue: m,
      listOrdered: o(mt, d),
      listUnordered: o(mt),
      paragraph: o(Mt),
      reference: f,
      referenceString: l,
      resourceDestinationString: l,
      resourceTitleString: l,
      setextHeading: o(Je),
      strong: o(gt),
      thematicBreak: o(at)
    },
    exit: {
      atxHeading: u(),
      atxHeadingSequence: W,
      autolink: u(),
      autolinkEmail: nt,
      autolinkProtocol: xe,
      blockQuote: u(),
      characterEscapeValue: ne,
      characterReferenceMarkerHexadecimal: X,
      characterReferenceMarkerNumeric: X,
      characterReferenceValue: ie,
      characterReference: Me,
      codeFenced: u(A),
      codeFencedFence: k,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: x,
      codeFlowValue: ne,
      codeIndented: u(b),
      codeText: u(Z),
      codeTextData: ne,
      data: ne,
      definition: u(),
      definitionDestinationString: D,
      definitionLabelString: I,
      definitionTitleString: v,
      emphasis: u(),
      hardBreakEscape: u(R),
      hardBreakTrailing: u(R),
      htmlFlow: u(J),
      htmlFlowData: ne,
      htmlText: u(le),
      htmlTextData: ne,
      image: u(de),
      label: Fe,
      labelText: ve,
      lineEnding: N,
      link: u(me),
      listItem: u(),
      listOrdered: u(),
      listUnordered: u(),
      paragraph: u(),
      referenceString: Se,
      resourceDestinationString: g,
      resourceTitleString: G,
      resource: Ue,
      setextHeading: u(te),
      setextHeadingLineSequence: F,
      setextHeadingText: w,
      strong: u(),
      thematicBreak: u()
    }
  };
  qi(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(C) {
    let E = {
      type: "root",
      children: []
    };
    const U = {
      stack: [E],
      tokenStack: [],
      config: t,
      enter: a,
      exit: c,
      buffer: l,
      resume: s,
      data: n
    }, H = [];
    let Y = -1;
    for (; ++Y < C.length; )
      if (C[Y][1].type === "listOrdered" || C[Y][1].type === "listUnordered")
        if (C[Y][0] === "enter")
          H.push(Y);
        else {
          const be = H.pop();
          Y = i(C, be, Y);
        }
    for (Y = -1; ++Y < C.length; ) {
      const be = t[C[Y][0]];
      Zi.call(be, C[Y][1].type) && be[C[Y][1].type].call(Object.assign({
        sliceSerialize: C[Y][2].sliceSerialize
      }, U), C[Y][1]);
    }
    if (U.tokenStack.length > 0) {
      const be = U.tokenStack[U.tokenStack.length - 1];
      (be[1] || Vr).call(U, void 0, be[0]);
    }
    for (E.position = {
      start: _t(C.length > 0 ? C[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: _t(C.length > 0 ? C[C.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Y = -1; ++Y < t.transforms.length; )
      E = t.transforms[Y](E) || E;
    return E;
  }
  function i(C, E, U) {
    let H = E - 1, Y = -1, be = !1, Ke, Ae, Qe, Ee;
    for (; ++H <= U; ) {
      const ue = C[H];
      switch (ue[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          ue[0] === "enter" ? Y++ : Y--, Ee = void 0;
          break;
        }
        case "lineEndingBlank": {
          ue[0] === "enter" && (Ke && !Ee && !Y && !Qe && (Qe = H), Ee = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Ee = void 0;
      }
      if (!Y && ue[0] === "enter" && ue[1].type === "listItemPrefix" || Y === -1 && ue[0] === "exit" && (ue[1].type === "listUnordered" || ue[1].type === "listOrdered")) {
        if (Ke) {
          let qe = H;
          for (Ae = void 0; qe--; ) {
            const Re = C[qe];
            if (Re[1].type === "lineEnding" || Re[1].type === "lineEndingBlank") {
              if (Re[0] === "exit") continue;
              Ae && (C[Ae][1].type = "lineEndingBlank", be = !0), Re[1].type = "lineEnding", Ae = qe;
            } else if (!(Re[1].type === "linePrefix" || Re[1].type === "blockQuotePrefix" || Re[1].type === "blockQuotePrefixWhitespace" || Re[1].type === "blockQuoteMarker" || Re[1].type === "listItemIndent")) break;
          }
          Qe && (!Ae || Qe < Ae) && (Ke._spread = !0), Ke.end = Object.assign({}, Ae ? C[Ae][1].start : ue[1].end), C.splice(Ae || H, 0, ["exit", Ke, ue[2]]), H++, U++;
        }
        if (ue[1].type === "listItemPrefix") {
          const qe = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, ue[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ke = qe, C.splice(H, 0, ["enter", qe, ue[2]]), H++, U++, Qe = void 0, Ee = !0;
        }
      }
    }
    return C[E][1]._spread = be, U;
  }
  function o(C, E) {
    return U;
    function U(H) {
      a.call(this, C(H), H), E && E.call(this, H);
    }
  }
  function l() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(C, E, U) {
    this.stack[this.stack.length - 1].children.push(C), this.stack.push(C), this.tokenStack.push([E, U || void 0]), C.position = {
      start: _t(E.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function u(C) {
    return E;
    function E(U) {
      C && C.call(this, U), c.call(this, U);
    }
  }
  function c(C, E) {
    const U = this.stack.pop(), H = this.tokenStack.pop();
    if (H)
      H[0].type !== C.type && (E ? E.call(this, C, H[0]) : (H[1] || Vr).call(this, C, H[0]));
    else throw new Error("Cannot close `" + C.type + "` (" + Yt({
      start: C.start,
      end: C.end
    }) + "): it’s not open");
    U.position.end = _t(C.end);
  }
  function s() {
    return Al(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(C) {
    if (this.data.expectingFirstListItemValue) {
      const E = this.stack[this.stack.length - 2];
      E.start = Number.parseInt(this.sliceSerialize(C), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.lang = C;
  }
  function x() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.meta = C;
  }
  function k() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function A() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = C.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function b() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = C.replace(/(\r?\n|\r)$/g, "");
  }
  function I(C) {
    const E = this.resume(), U = this.stack[this.stack.length - 1];
    U.label = E, U.identifier = Ft(this.sliceSerialize(C)).toLowerCase();
  }
  function v() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = C;
  }
  function D() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = C;
  }
  function W(C) {
    const E = this.stack[this.stack.length - 1];
    if (!E.depth) {
      const U = this.sliceSerialize(C).length;
      E.depth = U;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function F(C) {
    const E = this.stack[this.stack.length - 1];
    E.depth = this.sliceSerialize(C).codePointAt(0) === 61 ? 1 : 2;
  }
  function te() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function P(C) {
    const U = this.stack[this.stack.length - 1].children;
    let H = U[U.length - 1];
    (!H || H.type !== "text") && (H = He(), H.position = {
      start: _t(C.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, U.push(H)), this.stack.push(H);
  }
  function ne(C) {
    const E = this.stack.pop();
    E.value += this.sliceSerialize(C), E.position.end = _t(C.end);
  }
  function N(C) {
    const E = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const U = E.children[E.children.length - 1];
      U.position.end = _t(C.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(E.type) && (P.call(this, C), ne.call(this, C));
  }
  function R() {
    this.data.atHardBreak = !0;
  }
  function J() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = C;
  }
  function le() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = C;
  }
  function Z() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = C;
  }
  function me() {
    const C = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      C.type += "Reference", C.referenceType = E, delete C.url, delete C.title;
    } else
      delete C.identifier, delete C.label;
    this.data.referenceType = void 0;
  }
  function de() {
    const C = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      C.type += "Reference", C.referenceType = E, delete C.url, delete C.title;
    } else
      delete C.identifier, delete C.label;
    this.data.referenceType = void 0;
  }
  function ve(C) {
    const E = this.sliceSerialize(C), U = this.stack[this.stack.length - 2];
    U.label = Is(E), U.identifier = Ft(E).toLowerCase();
  }
  function Fe() {
    const C = this.stack[this.stack.length - 1], E = this.resume(), U = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, U.type === "link") {
      const H = C.children;
      U.children = H;
    } else
      U.alt = E;
  }
  function g() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = C;
  }
  function G() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = C;
  }
  function Ue() {
    this.data.inReference = void 0;
  }
  function f() {
    this.data.referenceType = "collapsed";
  }
  function Se(C) {
    const E = this.resume(), U = this.stack[this.stack.length - 1];
    U.label = E, U.identifier = Ft(this.sliceSerialize(C)).toLowerCase(), this.data.referenceType = "full";
  }
  function X(C) {
    this.data.characterReferenceType = C.type;
  }
  function ie(C) {
    const E = this.sliceSerialize(C), U = this.data.characterReferenceType;
    let H;
    U ? (H = Oi(E, U === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : H = cr(E);
    const Y = this.stack[this.stack.length - 1];
    Y.value += H;
  }
  function Me(C) {
    const E = this.stack.pop();
    E.position.end = _t(C.end);
  }
  function xe(C) {
    ne.call(this, C);
    const E = this.stack[this.stack.length - 1];
    E.url = this.sliceSerialize(C);
  }
  function nt(C) {
    ne.call(this, C);
    const E = this.stack[this.stack.length - 1];
    E.url = "mailto:" + this.sliceSerialize(C);
  }
  function Xe() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function rt() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Et() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Ze() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Ie() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Je() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Be() {
    return {
      type: "break"
    };
  }
  function it() {
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
  function ft() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function mt(C) {
    return {
      type: "list",
      ordered: C.type === "listOrdered",
      start: null,
      spread: C._spread,
      children: []
    };
  }
  function Lt(C) {
    return {
      type: "listItem",
      spread: C._spread,
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
  function gt() {
    return {
      type: "strong",
      children: []
    };
  }
  function He() {
    return {
      type: "text",
      value: ""
    };
  }
  function at() {
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
function qi(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? qi(e, r) : Ms(e, r);
  }
}
function Ms(e, t) {
  let n;
  for (n in t)
    if (Zi.call(t, n))
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
  throw e ? new Error("Cannot close `" + e.type + "` (" + Yt({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Yt({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Yt({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function Rs(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return Ns(r, {
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
function Ds(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Ps(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function Os(e, t) {
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
function zs(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Fs(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Us(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Bt(r.toLowerCase()), o = e.footnoteOrder.indexOf(r);
  let l, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), l = e.footnoteOrder.length) : l = o + 1, a += 1, e.footnoteCounts.set(r, a);
  const u = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(l) }]
  };
  e.patch(t, u);
  const c = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [u]
  };
  return e.patch(t, c), e.applyData(t, c);
}
function Bs(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Hs(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function Gi(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), o = i[0];
  o && o.type === "text" ? o.value = "[" + o.value : i.unshift({ type: "text", value: "[" });
  const l = i[i.length - 1];
  return l && l.type === "text" ? l.value += r : i.push({ type: "text", value: r }), i;
}
function js(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Gi(e, t);
  const i = { src: Bt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, o), e.applyData(t, o);
}
function Vs(e, t) {
  const n = { src: Bt(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function Ws(e, t) {
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
function $s(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Gi(e, t);
  const i = { href: Bt(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, o), e.applyData(t, o);
}
function Zs(e, t) {
  const n = { href: Bt(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function qs(e, t, n) {
  const r = e.all(t), i = n ? Gs(n) : Yi(t), o = {}, l = [];
  if (typeof t.checked == "boolean") {
    const s = r[0];
    let d;
    s && s.type === "element" && s.tagName === "p" ? d = s : (d = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(d)), d.children.length > 0 && d.children.unshift({ type: "text", value: " " }), d.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), o.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const s = r[a];
    (i || a !== 0 || s.type !== "element" || s.tagName !== "p") && l.push({ type: "text", value: `
` }), s.type === "element" && s.tagName === "p" && !i ? l.push(...s.children) : l.push(s);
  }
  const u = r[r.length - 1];
  u && (i || u.type !== "element" || u.tagName !== "p") && l.push({ type: "text", value: `
` });
  const c = { type: "element", tagName: "li", properties: o, children: l };
  return e.patch(t, c), e.applyData(t, c);
}
function Gs(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = Yi(n[r]);
  }
  return t;
}
function Yi(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function Ys(e, t) {
  const n = {}, r = e.all(t);
  let i = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length; ) {
    const l = r[i];
    if (l.type === "element" && l.tagName === "li" && l.properties && Array.isArray(l.properties.className) && l.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const o = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(r, !0)
  };
  return e.patch(t, o), e.applyData(t, o);
}
function Xs(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Js(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Ks(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Qs(e, t) {
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
    }, a = lr(t.children[1]), u = Ai(t.children[t.children.length - 1]);
    a && u && (l.position = { start: a, end: u }), i.push(l);
  }
  const o = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, o), e.applyData(t, o);
}
function eu(e, t, n) {
  const r = n ? n.children : void 0, o = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", l = n && n.type === "table" ? n.align : void 0, a = l ? l.length : t.children.length;
  let u = -1;
  const c = [];
  for (; ++u < a; ) {
    const d = t.children[u], m = {}, h = l ? l[u] : void 0;
    h && (m.align = h);
    let x = { type: "element", tagName: o, properties: m, children: [] };
    d && (x.children = e.all(d), e.patch(d, x), x = e.applyData(d, x)), c.push(x);
  }
  const s = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(c, !0)
  };
  return e.patch(t, s), e.applyData(t, s);
}
function tu(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Wr = 9, $r = 32;
function nu(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const o = [];
  for (; r; )
    o.push(
      Zr(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return o.push(Zr(t.slice(i), i > 0, !1)), o.join("");
}
function Zr(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let o = e.codePointAt(r);
    for (; o === Wr || o === $r; )
      r++, o = e.codePointAt(r);
  }
  if (n) {
    let o = e.codePointAt(i - 1);
    for (; o === Wr || o === $r; )
      i--, o = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function ru(e, t) {
  const n = { type: "text", value: nu(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function iu(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const ou = {
  blockquote: Ds,
  break: Ps,
  code: Os,
  delete: zs,
  emphasis: Fs,
  footnoteReference: Us,
  heading: Bs,
  html: Hs,
  imageReference: js,
  image: Vs,
  inlineCode: Ws,
  linkReference: $s,
  link: Zs,
  listItem: qs,
  list: Ys,
  paragraph: Xs,
  // @ts-expect-error: root is different, but hard to type.
  root: Js,
  strong: Ks,
  table: Qs,
  tableCell: tu,
  tableRow: eu,
  text: ru,
  thematicBreak: iu,
  toml: nn,
  yaml: nn,
  definition: nn,
  footnoteDefinition: nn
};
function nn() {
}
const Xi = -1, Cn = 0, Jt = 1, dn = 2, dr = 3, fr = 4, mr = 5, gr = 6, Ji = 7, Ki = 8, qr = typeof self == "object" ? self : globalThis, lu = (e, t) => {
  const n = (i, o) => (e.set(o, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [o, l] = t[i];
    switch (o) {
      case Cn:
      case Xi:
        return n(l, i);
      case Jt: {
        const a = n([], i);
        for (const u of l)
          a.push(r(u));
        return a;
      }
      case dn: {
        const a = n({}, i);
        for (const [u, c] of l)
          a[r(u)] = r(c);
        return a;
      }
      case dr:
        return n(new Date(l), i);
      case fr: {
        const { source: a, flags: u } = l;
        return n(new RegExp(a, u), i);
      }
      case mr: {
        const a = n(/* @__PURE__ */ new Map(), i);
        for (const [u, c] of l)
          a.set(r(u), r(c));
        return a;
      }
      case gr: {
        const a = n(/* @__PURE__ */ new Set(), i);
        for (const u of l)
          a.add(r(u));
        return a;
      }
      case Ji: {
        const { name: a, message: u } = l;
        return n(new qr[a](u), i);
      }
      case Ki:
        return n(BigInt(l), i);
      case "BigInt":
        return n(Object(BigInt(l)), i);
      case "ArrayBuffer":
        return n(new Uint8Array(l).buffer, l);
      case "DataView": {
        const { buffer: a } = new Uint8Array(l);
        return n(new DataView(a), l);
      }
    }
    return n(new qr[o](l), i);
  };
  return r;
}, Gr = (e) => lu(/* @__PURE__ */ new Map(), e)(0), Ot = "", { toString: au } = {}, { keys: su } = Object, Vt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Cn, t];
  const n = au.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [Jt, Ot];
    case "Object":
      return [dn, Ot];
    case "Date":
      return [dr, Ot];
    case "RegExp":
      return [fr, Ot];
    case "Map":
      return [mr, Ot];
    case "Set":
      return [gr, Ot];
    case "DataView":
      return [Jt, n];
  }
  return n.includes("Array") ? [Jt, n] : n.includes("Error") ? [Ji, n] : [dn, n];
}, rn = ([e, t]) => e === Cn && (t === "function" || t === "symbol"), uu = (e, t, n, r) => {
  const i = (l, a) => {
    const u = r.push(l) - 1;
    return n.set(a, u), u;
  }, o = (l) => {
    if (n.has(l))
      return n.get(l);
    let [a, u] = Vt(l);
    switch (a) {
      case Cn: {
        let s = l;
        switch (u) {
          case "bigint":
            a = Ki, s = l.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + u);
            s = null;
            break;
          case "undefined":
            return i([Xi], l);
        }
        return i([a, s], l);
      }
      case Jt: {
        if (u) {
          let m = l;
          return u === "DataView" ? m = new Uint8Array(l.buffer) : u === "ArrayBuffer" && (m = new Uint8Array(l)), i([u, [...m]], l);
        }
        const s = [], d = i([a, s], l);
        for (const m of l)
          s.push(o(m));
        return d;
      }
      case dn: {
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
          return o(l.toJSON());
        const s = [], d = i([a, s], l);
        for (const m of su(l))
          (e || !rn(Vt(l[m]))) && s.push([o(m), o(l[m])]);
        return d;
      }
      case dr:
        return i([a, l.toISOString()], l);
      case fr: {
        const { source: s, flags: d } = l;
        return i([a, { source: s, flags: d }], l);
      }
      case mr: {
        const s = [], d = i([a, s], l);
        for (const [m, h] of l)
          (e || !(rn(Vt(m)) || rn(Vt(h)))) && s.push([o(m), o(h)]);
        return d;
      }
      case gr: {
        const s = [], d = i([a, s], l);
        for (const m of l)
          (e || !rn(Vt(m))) && s.push(o(m));
        return d;
      }
    }
    const { message: c } = l;
    return i([a, { name: u, message: c }], l);
  };
  return o;
}, Yr = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return uu(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, fn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Gr(Yr(e, t)) : structuredClone(e)
) : (e, t) => Gr(Yr(e, t));
function cu(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function pu(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function hu(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || cu, r = e.options.footnoteBackLabel || pu, i = e.options.footnoteLabel || "Footnotes", o = e.options.footnoteLabelTagName || "h2", l = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let u = -1;
  for (; ++u < e.footnoteOrder.length; ) {
    const c = e.footnoteById.get(
      e.footnoteOrder[u]
    );
    if (!c)
      continue;
    const s = e.all(c), d = String(c.identifier).toUpperCase(), m = Bt(d.toLowerCase());
    let h = 0;
    const x = [], k = e.footnoteCounts.get(d);
    for (; k !== void 0 && ++h <= k; ) {
      x.length > 0 && x.push({ type: "text", value: " " });
      let I = typeof n == "string" ? n : n(u, h);
      typeof I == "string" && (I = { type: "text", value: I }), x.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + m + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(u, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(I) ? I : [I]
      });
    }
    const A = s[s.length - 1];
    if (A && A.type === "element" && A.tagName === "p") {
      const I = A.children[A.children.length - 1];
      I && I.type === "text" ? I.value += " " : A.children.push({ type: "text", value: " " }), A.children.push(...x);
    } else
      s.push(...x);
    const b = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + m },
      children: e.wrap(s, !0)
    };
    e.patch(c, b), a.push(b);
  }
  if (a.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: o,
          properties: {
            ...fn(l),
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
const Qi = (
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
      return gu;
    if (typeof e == "function")
      return wn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? du(e) : fu(e);
    if (typeof e == "string")
      return mu(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function du(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Qi(e[n]);
  return wn(r);
  function r(...i) {
    let o = -1;
    for (; ++o < t.length; )
      if (t[o].apply(this, i)) return !0;
    return !1;
  }
}
function fu(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return wn(n);
  function n(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let o;
    for (o in e)
      if (i[o] !== t[o]) return !1;
    return !0;
  }
}
function mu(e) {
  return wn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function wn(e) {
  return t;
  function t(n, r, i) {
    return !!(yu(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function gu() {
  return !0;
}
function yu(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const eo = [], Cu = !0, Xr = !1, wu = "skip";
function xu(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const o = Qi(i), l = r ? -1 : 1;
  a(e, void 0, [])();
  function a(u, c, s) {
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
      Object.defineProperty(m, "name", {
        value: "node (" + (u.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return m;
    function m() {
      let h = eo, x, k, A;
      if ((!t || o(u, c, s[s.length - 1] || void 0)) && (h = ku(n(u, s)), h[0] === Xr))
        return h;
      if ("children" in u && u.children) {
        const b = (
          /** @type {UnistParent} */
          u
        );
        if (b.children && h[0] !== wu)
          for (k = (r ? b.children.length : -1) + l, A = s.concat(b); k > -1 && k < b.children.length; ) {
            const I = b.children[k];
            if (x = a(I, k, A)(), x[0] === Xr)
              return x;
            k = typeof x[1] == "number" ? x[1] : k + l;
          }
      }
      return h;
    }
  }
}
function ku(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Cu, e] : e == null ? eo : [e];
}
function to(e, t, n, r) {
  let i, o, l;
  typeof t == "function" && typeof n != "function" ? (o = void 0, l = t, i = n) : (o = t, l = n, i = r), xu(e, o, a, i);
  function a(u, c) {
    const s = c[c.length - 1], d = s ? s.children.indexOf(u) : void 0;
    return l(u, d, s);
  }
}
const Xn = {}.hasOwnProperty, bu = {};
function _u(e, t) {
  const n = t || bu, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), l = { ...ou, ...n.handlers }, a = {
    all: c,
    applyData: Eu,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: o,
    footnoteOrder: [],
    handlers: l,
    one: u,
    options: n,
    patch: Su,
    wrap: vu
  };
  return to(e, function(s) {
    if (s.type === "definition" || s.type === "footnoteDefinition") {
      const d = s.type === "definition" ? r : i, m = String(s.identifier).toUpperCase();
      d.has(m) || d.set(m, s);
    }
  }), a;
  function u(s, d) {
    const m = s.type, h = a.handlers[m];
    if (Xn.call(a.handlers, m) && h)
      return h(a, s, d);
    if (a.options.passThrough && a.options.passThrough.includes(m)) {
      if ("children" in s) {
        const { children: k, ...A } = s, b = fn(A);
        return b.children = a.all(s), b;
      }
      return fn(s);
    }
    return (a.options.unknownHandler || Tu)(a, s, d);
  }
  function c(s) {
    const d = [];
    if ("children" in s) {
      const m = s.children;
      let h = -1;
      for (; ++h < m.length; ) {
        const x = a.one(m[h], s);
        if (x) {
          if (h && m[h - 1].type === "break" && (!Array.isArray(x) && x.type === "text" && (x.value = Jr(x.value)), !Array.isArray(x) && x.type === "element")) {
            const k = x.children[0];
            k && k.type === "text" && (k.value = Jr(k.value));
          }
          Array.isArray(x) ? d.push(...x) : d.push(x);
        }
      }
    }
    return d;
  }
}
function Su(e, t) {
  e.position && (t.position = al(e));
}
function Eu(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, o = e.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element")
        n.tagName = r;
      else {
        const l = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: l };
      }
    n.type === "element" && o && Object.assign(n.properties, fn(o)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function Tu(e, t) {
  const n = t.data || {}, r = "value" in t && !(Xn.call(n, "hProperties") || Xn.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function vu(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Jr(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function Kr(e, t) {
  const n = _u(e, t), r = n.one(e, void 0), i = hu(n), o = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && o.children.push({ type: "text", value: `
` }, i), o;
}
function Iu(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      Kr(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      Kr(n, { file: r, ...e || t })
    );
  };
}
function Qr(e) {
  if (e)
    throw e;
}
var un = Object.prototype.hasOwnProperty, no = Object.prototype.toString, ei = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, ni = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : no.call(t) === "[object Array]";
}, ri = function(t) {
  if (!t || no.call(t) !== "[object Object]")
    return !1;
  var n = un.call(t, "constructor"), r = t.constructor && t.constructor.prototype && un.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || un.call(t, i);
}, ii = function(t, n) {
  ei && n.name === "__proto__" ? ei(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, oi = function(t, n) {
  if (n === "__proto__")
    if (un.call(t, n)) {
      if (ti)
        return ti(t, n).value;
    } else return;
  return t[n];
}, Au = function e() {
  var t, n, r, i, o, l, a = arguments[0], u = 1, c = arguments.length, s = !1;
  for (typeof a == "boolean" && (s = a, a = arguments[1] || {}, u = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); u < c; ++u)
    if (t = arguments[u], t != null)
      for (n in t)
        r = oi(a, n), i = oi(t, n), a !== i && (s && i && (ri(i) || (o = ni(i))) ? (o ? (o = !1, l = r && ni(r) ? r : []) : l = r && ri(r) ? r : {}, ii(a, { name: n, newValue: e(s, l, i) })) : typeof i < "u" && ii(a, { name: n, newValue: i }));
  return a;
};
const In = /* @__PURE__ */ Ii(Au);
function Jn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Nu() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let o = -1;
    const l = i.pop();
    if (typeof l != "function")
      throw new TypeError("Expected function as last argument, not " + l);
    a(null, ...i);
    function a(u, ...c) {
      const s = e[++o];
      let d = -1;
      if (u) {
        l(u);
        return;
      }
      for (; ++d < i.length; )
        (c[d] === null || c[d] === void 0) && (c[d] = i[d]);
      i = c, s ? Lu(s, a)(...c) : l(null, ...c);
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
function Lu(e, t) {
  let n;
  return r;
  function r(...l) {
    const a = e.length > l.length;
    let u;
    a && l.push(i);
    try {
      u = e.apply(this, l);
    } catch (c) {
      const s = (
        /** @type {Error} */
        c
      );
      if (a && n)
        throw s;
      return i(s);
    }
    a || (u && u.then && typeof u.then == "function" ? u.then(o, i) : u instanceof Error ? i(u) : o(u));
  }
  function i(l, ...a) {
    n || (n = !0, t(l, ...a));
  }
  function o(l) {
    i(null, l);
  }
}
const ct = { basename: Mu, dirname: Ru, extname: Du, join: Pu, sep: "/" };
function Mu(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  en(e);
  let n = 0, r = -1, i = e.length, o;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (o) {
          n = i + 1;
          break;
        }
      } else r < 0 && (o = !0, r = i + 1);
    return r < 0 ? "" : e.slice(n, r);
  }
  if (t === e)
    return "";
  let l = -1, a = t.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (o) {
        n = i + 1;
        break;
      }
    } else
      l < 0 && (o = !0, l = i + 1), a > -1 && (e.codePointAt(i) === t.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = l));
  return n === r ? r = l : r < 0 && (r = e.length), e.slice(n, r);
}
function Ru(e) {
  if (en(e), e.length === 0)
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
function Du(e) {
  en(e);
  let t = e.length, n = -1, r = 0, i = -1, o = 0, l;
  for (; t--; ) {
    const a = e.codePointAt(t);
    if (a === 47) {
      if (l) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (l = !0, n = t + 1), a === 46 ? i < 0 ? i = t : o !== 1 && (o = 1) : i > -1 && (o = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  o === 0 || // The (right-most) trimmed path component is exactly `..`.
  o === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function Pu(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    en(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : Ou(n);
}
function Ou(e) {
  en(e);
  const t = e.codePointAt(0) === 47;
  let n = zu(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function zu(e, t) {
  let n = "", r = 0, i = -1, o = 0, l = -1, a, u;
  for (; ++l <= e.length; ) {
    if (l < e.length)
      a = e.codePointAt(l);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === l - 1 || o === 1)) if (i !== l - 1 && o === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (u = n.lastIndexOf("/"), u !== n.length - 1) {
              u < 0 ? (n = "", r = 0) : (n = n.slice(0, u), r = n.length - 1 - n.lastIndexOf("/")), i = l, o = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = l, o = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + e.slice(i + 1, l) : n = e.slice(i + 1, l), r = l - i - 1;
      i = l, o = 0;
    } else a === 46 && o > -1 ? o++ : o = -1;
  }
  return n;
}
function en(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const Fu = { cwd: Uu };
function Uu() {
  return "/";
}
function Kn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Bu(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Kn(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return Hu(e);
}
function Hu(e) {
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
const An = (
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
class ro {
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
    t ? Kn(t) ? n = { path: t } : typeof t == "string" || ju(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : Fu.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < An.length; ) {
      const o = An[r];
      o in n && n[o] !== void 0 && n[o] !== null && (this[o] = o === "history" ? [...n[o]] : n[o]);
    }
    let i;
    for (i in n)
      An.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? ct.basename(this.path) : void 0;
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
    Ln(t, "basename"), Nn(t, "basename"), this.path = ct.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? ct.dirname(this.path) : void 0;
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
    li(this.basename, "dirname"), this.path = ct.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? ct.extname(this.path) : void 0;
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
    if (Nn(t, "extname"), li(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ct.join(this.dirname, this.stem + (t || ""));
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
    Kn(t) && (t = Bu(t)), Ln(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? ct.basename(this.path, this.extname) : void 0;
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
    Ln(t, "stem"), Nn(t, "stem"), this.path = ct.join(this.dirname || "", t + (this.extname || ""));
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
function Nn(e, t) {
  if (e && e.includes(ct.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ct.sep + "`"
    );
}
function Ln(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function li(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function ju(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Vu = (
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
    ), i = r[e], o = function() {
      return i.apply(o, arguments);
    };
    return Object.setPrototypeOf(o, r), o;
  }
), Wu = {}.hasOwnProperty;
class yr extends Vu {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Nu();
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
    return t.data(In(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (Dn("data", this.frozen), this.namespace[t] = n, this) : Wu.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Dn("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = on(t), r = this.parser || this.Parser;
    return Mn("parse", r), r(String(n), n);
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
    return this.freeze(), Mn("process", this.parser || this.Parser), Rn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(o, l) {
      const a = on(t), u = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(u, a, function(s, d, m) {
        if (s || !d || !m)
          return c(s);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          d
        ), x = r.stringify(h, m);
        qu(x) ? m.value = x : m.result = x, c(
          s,
          /** @type {VFileWithOutput<CompileResult>} */
          m
        );
      });
      function c(s, d) {
        s || !d ? l(s) : o ? o(d) : n(void 0, d);
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
    return this.freeze(), Mn("processSync", this.parser || this.Parser), Rn("processSync", this.compiler || this.Compiler), this.process(t, i), si("processSync", "process", n), r;
    function i(o, l) {
      n = !0, Qr(o), r = l;
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
    ai(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? o(void 0, r) : new Promise(o);
    function o(l, a) {
      const u = on(n);
      i.run(t, u, c);
      function c(s, d, m) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          d || t
        );
        s ? a(s) : l ? l(h) : r(void 0, h, m);
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
    return this.run(t, n, o), si("runSync", "run", r), i;
    function o(l, a) {
      Qr(l), i = a, r = !0;
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
    const r = on(n), i = this.compiler || this.Compiler;
    return Rn("stringify", i), ai(t), i(t, r);
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
    if (Dn("use", this.frozen), t != null) if (typeof t == "function")
      u(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? a(t) : l(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function o(c) {
      if (typeof c == "function")
        u(c, []);
      else if (typeof c == "object")
        if (Array.isArray(c)) {
          const [s, ...d] = (
            /** @type {PluginTuple<Array<unknown>>} */
            c
          );
          u(s, d);
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
      a(c.plugins), c.settings && (i.settings = In(!0, i.settings, c.settings));
    }
    function a(c) {
      let s = -1;
      if (c != null) if (Array.isArray(c))
        for (; ++s < c.length; ) {
          const d = c[s];
          o(d);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + c + "`");
    }
    function u(c, s) {
      let d = -1, m = -1;
      for (; ++d < r.length; )
        if (r[d][0] === c) {
          m = d;
          break;
        }
      if (m === -1)
        r.push([c, ...s]);
      else if (s.length > 0) {
        let [h, ...x] = s;
        const k = r[m][1];
        Jn(k) && Jn(h) && (h = In(!0, k, h)), r[m] = [c, h, ...x];
      }
    }
  }
}
const $u = new yr().freeze();
function Mn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Rn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Dn(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function ai(e) {
  if (!Jn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function si(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function on(e) {
  return Zu(e) ? e : new ro(e);
}
function Zu(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function qu(e) {
  return typeof e == "string" || Gu(e);
}
function Gu(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Yu = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", ui = [], ci = { allowDangerousHtml: !0 }, Xu = /^(https?|ircs?|mailto|xmpp)$/i, Ju = [
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
function mn(e) {
  const t = Ku(e), n = Qu(e);
  return ec(t.runSync(t.parse(n), n), e);
}
function Ku(e) {
  const t = e.rehypePlugins || ui, n = e.remarkPlugins || ui, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...ci } : ci;
  return $u().use(Rs).use(n).use(Iu, r).use(t);
}
function Qu(e) {
  const t = e.children || "", n = new ro();
  return typeof t == "string" && (n.value = t), n;
}
function ec(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, o = t.disallowedElements, l = t.skipHtml, a = t.unwrapDisallowed, u = t.urlTransform || tc;
  for (const s of Ju)
    Object.hasOwn(t, s.from) && ("" + s.from + (s.to ? "use `" + s.to + "` instead" : "remove it") + Yu + s.id, void 0);
  return to(e, c), hl(e, {
    Fragment: Hn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: p,
    jsxs: L,
    passKeys: !0,
    passNode: !0
  });
  function c(s, d, m) {
    if (s.type === "raw" && m && typeof d == "number")
      return l ? m.children.splice(d, 1) : m.children[d] = { type: "text", value: s.value }, d;
    if (s.type === "element") {
      let h;
      for (h in En)
        if (Object.hasOwn(En, h) && Object.hasOwn(s.properties, h)) {
          const x = s.properties[h], k = En[h];
          (k === null || k.includes(s.tagName)) && (s.properties[h] = u(String(x || ""), h, s));
        }
    }
    if (s.type === "element") {
      let h = n ? !n.includes(s.tagName) : o ? o.includes(s.tagName) : !1;
      if (!h && r && typeof d == "number" && (h = !r(s, d, m)), h && m && typeof d == "number")
        return a && s.children ? m.children.splice(d, 1, ...s.children) : m.children.splice(d, 1), d;
    }
  }
}
function tc(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    Xu.test(e.slice(0, t)) ? e : ""
  );
}
const lt = (...e) => e.filter(Boolean).join(" "), nc = () => /* @__PURE__ */ L(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ L("g", { filter: "url(#filter0_dd_121_23927)", children: [
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
      /* @__PURE__ */ L("defs", { children: [
        /* @__PURE__ */ L(
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
), rc = ({ className: e, ...t }) => /* @__PURE__ */ p("form", { className: lt("chat-wrapper__prompt-input", e), ...t }), io = xi(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: o,
    ...l
  }, a) => {
    const u = (c) => {
      if (c.key === "Enter") {
        if (c.shiftKey)
          return;
        c.preventDefault();
        const s = c.currentTarget.form;
        if (s) {
          const d = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          s.dispatchEvent(d);
        }
      }
      o == null || o(c);
    };
    return /* @__PURE__ */ p(
      "textarea",
      {
        ref: a,
        className: lt("chat-wrapper__prompt-textarea", t),
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
io.displayName = "PromptInputTextarea";
const ic = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p("div", { className: lt("chat-wrapper__prompt-toolbar", e), ...t }), oc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p("div", { className: lt("chat-wrapper__prompt-tools", e), ...t }), lc = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const o = t === "default" && (typeof r == "string" || mo.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ p(
    "button",
    {
      className: lt(
        "chat-wrapper__prompt-button",
        `chat-wrapper__prompt-button--${e}`,
        `chat-wrapper__prompt-button--${o}`,
        n
      ),
      type: "button",
      ...i,
      children: r
    }
  );
}, ac = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = "idle",
  children: i,
  disabled: o,
  ...l
}) => {
  let a = /* @__PURE__ */ p(nc, {});
  const u = o || r === "submitted" || r === "streaming";
  return /* @__PURE__ */ p(
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
      disabled: u,
      ...l,
      children: i ?? a
    }
  );
}, Yc = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ p("select", { className: lt("chat-wrapper__prompt-select", e), ...n, children: t }), Xc = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ p(
  "button",
  {
    className: lt("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), Jc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p(
  "div",
  {
    className: lt("chat-wrapper__prompt-select-content", e),
    ...t
  }
), Kc = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ p(
  "div",
  {
    className: lt("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), Qc = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ p(
  "span",
  {
    className: lt("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
);
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: oo,
  setPrototypeOf: pi,
  isFrozen: sc,
  getPrototypeOf: uc,
  getOwnPropertyDescriptor: cc
} = Object;
let {
  freeze: Oe,
  seal: tt,
  create: Qn
} = Object, {
  apply: er,
  construct: tr
} = typeof Reflect < "u" && Reflect;
Oe || (Oe = function(t) {
  return t;
});
tt || (tt = function(t) {
  return t;
});
er || (er = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++)
    i[o - 2] = arguments[o];
  return t.apply(n, i);
});
tr || (tr = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const ln = ze(Array.prototype.forEach), pc = ze(Array.prototype.lastIndexOf), hi = ze(Array.prototype.pop), Wt = ze(Array.prototype.push), hc = ze(Array.prototype.splice), cn = ze(String.prototype.toLowerCase), Pn = ze(String.prototype.toString), On = ze(String.prototype.match), $t = ze(String.prototype.replace), dc = ze(String.prototype.indexOf), fc = ze(String.prototype.trim), ot = ze(Object.prototype.hasOwnProperty), Pe = ze(RegExp.prototype.test), Zt = mc(TypeError);
function ze(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return er(e, t, r);
  };
}
function mc(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return tr(e, n);
  };
}
function $(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : cn;
  pi && pi(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const o = n(i);
      o !== i && (sc(t) || (t[r] = o), i = o);
    }
    e[i] = !0;
  }
  return e;
}
function gc(e) {
  for (let t = 0; t < e.length; t++)
    ot(e, t) || (e[t] = null);
  return e;
}
function kt(e) {
  const t = Qn(null);
  for (const [n, r] of oo(e))
    ot(e, n) && (Array.isArray(r) ? t[n] = gc(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = kt(r) : t[n] = r);
  return t;
}
function qt(e, t) {
  for (; e !== null; ) {
    const r = cc(e, t);
    if (r) {
      if (r.get)
        return ze(r.get);
      if (typeof r.value == "function")
        return ze(r.value);
    }
    e = uc(e);
  }
  function n() {
    return null;
  }
  return n;
}
const di = Oe(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), zn = Oe(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Fn = Oe(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), yc = Oe(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Un = Oe(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Cc = Oe(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), fi = Oe(["#text"]), mi = Oe(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Bn = Oe(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), gi = Oe(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), an = Oe(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), wc = tt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), xc = tt(/<%[\w\W]*|[\w\W]*%>/gm), kc = tt(/\$\{[\w\W]*/gm), bc = tt(/^data-[\-\w.\u00B7-\uFFFF]+$/), _c = tt(/^aria-[\-\w]+$/), lo = tt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Sc = tt(/^(?:\w+script|data):/i), Ec = tt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), ao = tt(/^html$/i), Tc = tt(/^[a-z][.\w]*(-[.\w]+)+$/i);
var yi = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: _c,
  ATTR_WHITESPACE: Ec,
  CUSTOM_ELEMENT: Tc,
  DATA_ATTR: bc,
  DOCTYPE_NAME: ao,
  ERB_EXPR: xc,
  IS_ALLOWED_URI: lo,
  IS_SCRIPT_OR_DATA: Sc,
  MUSTACHE_EXPR: wc,
  TMPLIT_EXPR: kc
});
const Gt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, vc = function() {
  return typeof window > "u" ? null : window;
}, Ic = function(t, n) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let r = null;
  const i = "data-tt-policy-suffix";
  n && n.hasAttribute(i) && (r = n.getAttribute(i));
  const o = "dompurify" + (r ? "#" + r : "");
  try {
    return t.createPolicy(o, {
      createHTML(l) {
        return l;
      },
      createScriptURL(l) {
        return l;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + o + " could not be created."), null;
  }
}, Ci = function() {
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
function so() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vc();
  const t = (z) => so(z);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== Gt.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: o,
    HTMLTemplateElement: l,
    Node: a,
    Element: u,
    NodeFilter: c,
    NamedNodeMap: s = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: m,
    trustedTypes: h
  } = e, x = u.prototype, k = qt(x, "cloneNode"), A = qt(x, "remove"), b = qt(x, "nextSibling"), I = qt(x, "childNodes"), v = qt(x, "parentNode");
  if (typeof l == "function") {
    const z = n.createElement("template");
    z.content && z.content.ownerDocument && (n = z.content.ownerDocument);
  }
  let D, W = "";
  const {
    implementation: w,
    createNodeIterator: F,
    createDocumentFragment: te,
    getElementsByTagName: P
  } = n, {
    importNode: ne
  } = r;
  let N = Ci();
  t.isSupported = typeof oo == "function" && typeof v == "function" && w && w.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: R,
    ERB_EXPR: J,
    TMPLIT_EXPR: le,
    DATA_ATTR: Z,
    ARIA_ATTR: me,
    IS_SCRIPT_OR_DATA: de,
    ATTR_WHITESPACE: ve,
    CUSTOM_ELEMENT: Fe
  } = yi;
  let {
    IS_ALLOWED_URI: g
  } = yi, G = null;
  const Ue = $({}, [...di, ...zn, ...Fn, ...Un, ...fi]);
  let f = null;
  const Se = $({}, [...mi, ...Bn, ...gi, ...an]);
  let X = Object.seal(Qn(null, {
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
  })), ie = null, Me = null;
  const xe = Object.seal(Qn(null, {
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
  let nt = !0, Xe = !0, rt = !1, Et = !0, Ze = !1, Ie = !0, Je = !1, Be = !1, it = !1, ke = !1, ft = !1, mt = !1, Lt = !0, Mt = !1;
  const gt = "user-content-";
  let He = !0, at = !1, C = {}, E = null;
  const U = $({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let H = null;
  const Y = $({}, ["audio", "video", "img", "source", "image", "track"]);
  let be = null;
  const Ke = $({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Ae = "http://www.w3.org/1998/Math/MathML", Qe = "http://www.w3.org/2000/svg", Ee = "http://www.w3.org/1999/xhtml";
  let ue = Ee, qe = !1, Re = null;
  const Cr = $({}, [Ae, Qe, Ee], Pn);
  let Rt = $({}, ["mi", "mo", "mn", "ms", "mtext"]), Dt = $({}, ["annotation-xml"]);
  const tn = $({}, ["title", "style", "font", "a", "script"]);
  let Tt = null;
  const xn = ["application/xhtml+xml", "text/html"], kn = "text/html";
  let ge = null, yt = null;
  const T = n.createElement("form"), O = function(y) {
    return y instanceof RegExp || y instanceof Function;
  }, q = function() {
    let y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(yt && yt === y)) {
      if ((!y || typeof y != "object") && (y = {}), y = kt(y), Tt = // eslint-disable-next-line unicorn/prefer-includes
      xn.indexOf(y.PARSER_MEDIA_TYPE) === -1 ? kn : y.PARSER_MEDIA_TYPE, ge = Tt === "application/xhtml+xml" ? Pn : cn, G = ot(y, "ALLOWED_TAGS") ? $({}, y.ALLOWED_TAGS, ge) : Ue, f = ot(y, "ALLOWED_ATTR") ? $({}, y.ALLOWED_ATTR, ge) : Se, Re = ot(y, "ALLOWED_NAMESPACES") ? $({}, y.ALLOWED_NAMESPACES, Pn) : Cr, be = ot(y, "ADD_URI_SAFE_ATTR") ? $(kt(Ke), y.ADD_URI_SAFE_ATTR, ge) : Ke, H = ot(y, "ADD_DATA_URI_TAGS") ? $(kt(Y), y.ADD_DATA_URI_TAGS, ge) : Y, E = ot(y, "FORBID_CONTENTS") ? $({}, y.FORBID_CONTENTS, ge) : U, ie = ot(y, "FORBID_TAGS") ? $({}, y.FORBID_TAGS, ge) : kt({}), Me = ot(y, "FORBID_ATTR") ? $({}, y.FORBID_ATTR, ge) : kt({}), C = ot(y, "USE_PROFILES") ? y.USE_PROFILES : !1, nt = y.ALLOW_ARIA_ATTR !== !1, Xe = y.ALLOW_DATA_ATTR !== !1, rt = y.ALLOW_UNKNOWN_PROTOCOLS || !1, Et = y.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ze = y.SAFE_FOR_TEMPLATES || !1, Ie = y.SAFE_FOR_XML !== !1, Je = y.WHOLE_DOCUMENT || !1, ke = y.RETURN_DOM || !1, ft = y.RETURN_DOM_FRAGMENT || !1, mt = y.RETURN_TRUSTED_TYPE || !1, it = y.FORCE_BODY || !1, Lt = y.SANITIZE_DOM !== !1, Mt = y.SANITIZE_NAMED_PROPS || !1, He = y.KEEP_CONTENT !== !1, at = y.IN_PLACE || !1, g = y.ALLOWED_URI_REGEXP || lo, ue = y.NAMESPACE || Ee, Rt = y.MATHML_TEXT_INTEGRATION_POINTS || Rt, Dt = y.HTML_INTEGRATION_POINTS || Dt, X = y.CUSTOM_ELEMENT_HANDLING || {}, y.CUSTOM_ELEMENT_HANDLING && O(y.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (X.tagNameCheck = y.CUSTOM_ELEMENT_HANDLING.tagNameCheck), y.CUSTOM_ELEMENT_HANDLING && O(y.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (X.attributeNameCheck = y.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), y.CUSTOM_ELEMENT_HANDLING && typeof y.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (X.allowCustomizedBuiltInElements = y.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Ze && (Xe = !1), ft && (ke = !0), C && (G = $({}, fi), f = [], C.html === !0 && ($(G, di), $(f, mi)), C.svg === !0 && ($(G, zn), $(f, Bn), $(f, an)), C.svgFilters === !0 && ($(G, Fn), $(f, Bn), $(f, an)), C.mathMl === !0 && ($(G, Un), $(f, gi), $(f, an))), y.ADD_TAGS && (typeof y.ADD_TAGS == "function" ? xe.tagCheck = y.ADD_TAGS : (G === Ue && (G = kt(G)), $(G, y.ADD_TAGS, ge))), y.ADD_ATTR && (typeof y.ADD_ATTR == "function" ? xe.attributeCheck = y.ADD_ATTR : (f === Se && (f = kt(f)), $(f, y.ADD_ATTR, ge))), y.ADD_URI_SAFE_ATTR && $(be, y.ADD_URI_SAFE_ATTR, ge), y.FORBID_CONTENTS && (E === U && (E = kt(E)), $(E, y.FORBID_CONTENTS, ge)), He && (G["#text"] = !0), Je && $(G, ["html", "head", "body"]), G.table && ($(G, ["tbody"]), delete ie.tbody), y.TRUSTED_TYPES_POLICY) {
        if (typeof y.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Zt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof y.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Zt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        D = y.TRUSTED_TYPES_POLICY, W = D.createHTML("");
      } else
        D === void 0 && (D = Ic(h, i)), D !== null && typeof W == "string" && (W = D.createHTML(""));
      Oe && Oe(y), yt = y;
    }
  }, V = $({}, [...zn, ...Fn, ...yc]), re = $({}, [...Un, ...Cc]), fe = function(y) {
    let S = v(y);
    (!S || !S.tagName) && (S = {
      namespaceURI: ue,
      tagName: "template"
    });
    const M = cn(y.tagName), pe = cn(S.tagName);
    return Re[y.namespaceURI] ? y.namespaceURI === Qe ? S.namespaceURI === Ee ? M === "svg" : S.namespaceURI === Ae ? M === "svg" && (pe === "annotation-xml" || Rt[pe]) : !!V[M] : y.namespaceURI === Ae ? S.namespaceURI === Ee ? M === "math" : S.namespaceURI === Qe ? M === "math" && Dt[pe] : !!re[M] : y.namespaceURI === Ee ? S.namespaceURI === Qe && !Dt[pe] || S.namespaceURI === Ae && !Rt[pe] ? !1 : !re[M] && (tn[M] || !V[M]) : !!(Tt === "application/xhtml+xml" && Re[y.namespaceURI]) : !1;
  }, K = function(y) {
    Wt(t.removed, {
      element: y
    });
    try {
      v(y).removeChild(y);
    } catch {
      A(y);
    }
  }, ee = function(y, S) {
    try {
      Wt(t.removed, {
        attribute: S.getAttributeNode(y),
        from: S
      });
    } catch {
      Wt(t.removed, {
        attribute: null,
        from: S
      });
    }
    if (S.removeAttribute(y), y === "is")
      if (ke || ft)
        try {
          K(S);
        } catch {
        }
      else
        try {
          S.setAttribute(y, "");
        } catch {
        }
  }, we = function(y) {
    let S = null, M = null;
    if (it)
      y = "<remove></remove>" + y;
    else {
      const ye = On(y, /^[\r\n\t ]+/);
      M = ye && ye[0];
    }
    Tt === "application/xhtml+xml" && ue === Ee && (y = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + y + "</body></html>");
    const pe = D ? D.createHTML(y) : y;
    if (ue === Ee)
      try {
        S = new m().parseFromString(pe, Tt);
      } catch {
      }
    if (!S || !S.documentElement) {
      S = w.createDocument(ue, "template", null);
      try {
        S.documentElement.innerHTML = qe ? W : pe;
      } catch {
      }
    }
    const Ne = S.body || S.documentElement;
    return y && M && Ne.insertBefore(n.createTextNode(M), Ne.childNodes[0] || null), ue === Ee ? P.call(S, Je ? "html" : "body")[0] : Je ? S.documentElement : Ne;
  }, _e = function(y) {
    return F.call(
      y.ownerDocument || y,
      y,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, vt = function(y) {
    return y instanceof d && (typeof y.nodeName != "string" || typeof y.textContent != "string" || typeof y.removeChild != "function" || !(y.attributes instanceof s) || typeof y.removeAttribute != "function" || typeof y.setAttribute != "function" || typeof y.namespaceURI != "string" || typeof y.insertBefore != "function" || typeof y.hasChildNodes != "function");
  }, Ct = function(y) {
    return typeof a == "function" && y instanceof a;
  };
  function De(z, y, S) {
    ln(z, (M) => {
      M.call(t, y, S, yt);
    });
  }
  const st = function(y) {
    let S = null;
    if (De(N.beforeSanitizeElements, y, null), vt(y))
      return K(y), !0;
    const M = ge(y.nodeName);
    if (De(N.uponSanitizeElement, y, {
      tagName: M,
      allowedTags: G
    }), Ie && y.hasChildNodes() && !Ct(y.firstElementChild) && Pe(/<[/\w!]/g, y.innerHTML) && Pe(/<[/\w!]/g, y.textContent) || y.nodeType === Gt.progressingInstruction || Ie && y.nodeType === Gt.comment && Pe(/<[/\w]/g, y.data))
      return K(y), !0;
    if (!(xe.tagCheck instanceof Function && xe.tagCheck(M)) && (!G[M] || ie[M])) {
      if (!ie[M] && It(M) && (X.tagNameCheck instanceof RegExp && Pe(X.tagNameCheck, M) || X.tagNameCheck instanceof Function && X.tagNameCheck(M)))
        return !1;
      if (He && !E[M]) {
        const pe = v(y) || y.parentNode, Ne = I(y) || y.childNodes;
        if (Ne && pe) {
          const ye = Ne.length;
          for (let je = ye - 1; je >= 0; --je) {
            const xt = k(Ne[je], !0);
            xt.__removalCount = (y.__removalCount || 0) + 1, pe.insertBefore(xt, b(y));
          }
        }
      }
      return K(y), !0;
    }
    return y instanceof u && !fe(y) || (M === "noscript" || M === "noembed" || M === "noframes") && Pe(/<\/no(script|embed|frames)/i, y.innerHTML) ? (K(y), !0) : (Ze && y.nodeType === Gt.text && (S = y.textContent, ln([R, J, le], (pe) => {
      S = $t(S, pe, " ");
    }), y.textContent !== S && (Wt(t.removed, {
      element: y.cloneNode()
    }), y.textContent = S)), De(N.afterSanitizeElements, y, null), !1);
  }, ut = function(y, S, M) {
    if (Lt && (S === "id" || S === "name") && (M in n || M in T))
      return !1;
    if (!(Xe && !Me[S] && Pe(Z, S))) {
      if (!(nt && Pe(me, S))) {
        if (!(xe.attributeCheck instanceof Function && xe.attributeCheck(S, y))) {
          if (!f[S] || Me[S]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(It(y) && (X.tagNameCheck instanceof RegExp && Pe(X.tagNameCheck, y) || X.tagNameCheck instanceof Function && X.tagNameCheck(y)) && (X.attributeNameCheck instanceof RegExp && Pe(X.attributeNameCheck, S) || X.attributeNameCheck instanceof Function && X.attributeNameCheck(S, y)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              S === "is" && X.allowCustomizedBuiltInElements && (X.tagNameCheck instanceof RegExp && Pe(X.tagNameCheck, M) || X.tagNameCheck instanceof Function && X.tagNameCheck(M)))
            ) return !1;
          } else if (!be[S]) {
            if (!Pe(g, $t(M, ve, ""))) {
              if (!((S === "src" || S === "xlink:href" || S === "href") && y !== "script" && dc(M, "data:") === 0 && H[y])) {
                if (!(rt && !Pe(de, $t(M, ve, "")))) {
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
  }, It = function(y) {
    return y !== "annotation-xml" && On(y, Fe);
  }, wt = function(y) {
    De(N.beforeSanitizeAttributes, y, null);
    const {
      attributes: S
    } = y;
    if (!S || vt(y))
      return;
    const M = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: f,
      forceKeepAttr: void 0
    };
    let pe = S.length;
    for (; pe--; ) {
      const Ne = S[pe], {
        name: ye,
        namespaceURI: je,
        value: xt
      } = Ne, Pt = ge(ye), _n = xt;
      let Te = ye === "value" ? _n : fc(_n);
      if (M.attrName = Pt, M.attrValue = Te, M.keepAttr = !0, M.forceKeepAttr = void 0, De(N.uponSanitizeAttribute, y, M), Te = M.attrValue, Mt && (Pt === "id" || Pt === "name") && (ee(ye, y), Te = gt + Te), Ie && Pe(/((--!?|])>)|<\/(style|title|textarea)/i, Te)) {
        ee(ye, y);
        continue;
      }
      if (Pt === "attributename" && On(Te, "href")) {
        ee(ye, y);
        continue;
      }
      if (M.forceKeepAttr)
        continue;
      if (!M.keepAttr) {
        ee(ye, y);
        continue;
      }
      if (!Et && Pe(/\/>/i, Te)) {
        ee(ye, y);
        continue;
      }
      Ze && ln([R, J, le], (xr) => {
        Te = $t(Te, xr, " ");
      });
      const wr = ge(y.nodeName);
      if (!ut(wr, Pt, Te)) {
        ee(ye, y);
        continue;
      }
      if (D && typeof h == "object" && typeof h.getAttributeType == "function" && !je)
        switch (h.getAttributeType(wr, Pt)) {
          case "TrustedHTML": {
            Te = D.createHTML(Te);
            break;
          }
          case "TrustedScriptURL": {
            Te = D.createScriptURL(Te);
            break;
          }
        }
      if (Te !== _n)
        try {
          je ? y.setAttributeNS(je, ye, Te) : y.setAttribute(ye, Te), vt(y) ? K(y) : hi(t.removed);
        } catch {
          ee(ye, y);
        }
    }
    De(N.afterSanitizeAttributes, y, null);
  }, bn = function z(y) {
    let S = null;
    const M = _e(y);
    for (De(N.beforeSanitizeShadowDOM, y, null); S = M.nextNode(); )
      De(N.uponSanitizeShadowNode, S, null), st(S), wt(S), S.content instanceof o && z(S.content);
    De(N.afterSanitizeShadowDOM, y, null);
  };
  return t.sanitize = function(z) {
    let y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, S = null, M = null, pe = null, Ne = null;
    if (qe = !z, qe && (z = "<!-->"), typeof z != "string" && !Ct(z))
      if (typeof z.toString == "function") {
        if (z = z.toString(), typeof z != "string")
          throw Zt("dirty is not a string, aborting");
      } else
        throw Zt("toString is not a function");
    if (!t.isSupported)
      return z;
    if (Be || q(y), t.removed = [], typeof z == "string" && (at = !1), at) {
      if (z.nodeName) {
        const xt = ge(z.nodeName);
        if (!G[xt] || ie[xt])
          throw Zt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (z instanceof a)
      S = we("<!---->"), M = S.ownerDocument.importNode(z, !0), M.nodeType === Gt.element && M.nodeName === "BODY" || M.nodeName === "HTML" ? S = M : S.appendChild(M);
    else {
      if (!ke && !Ze && !Je && // eslint-disable-next-line unicorn/prefer-includes
      z.indexOf("<") === -1)
        return D && mt ? D.createHTML(z) : z;
      if (S = we(z), !S)
        return ke ? null : mt ? W : "";
    }
    S && it && K(S.firstChild);
    const ye = _e(at ? z : S);
    for (; pe = ye.nextNode(); )
      st(pe), wt(pe), pe.content instanceof o && bn(pe.content);
    if (at)
      return z;
    if (ke) {
      if (ft)
        for (Ne = te.call(S.ownerDocument); S.firstChild; )
          Ne.appendChild(S.firstChild);
      else
        Ne = S;
      return (f.shadowroot || f.shadowrootmode) && (Ne = ne.call(r, Ne, !0)), Ne;
    }
    let je = Je ? S.outerHTML : S.innerHTML;
    return Je && G["!doctype"] && S.ownerDocument && S.ownerDocument.doctype && S.ownerDocument.doctype.name && Pe(ao, S.ownerDocument.doctype.name) && (je = "<!DOCTYPE " + S.ownerDocument.doctype.name + `>
` + je), Ze && ln([R, J, le], (xt) => {
      je = $t(je, xt, " ");
    }), D && mt ? D.createHTML(je) : je;
  }, t.setConfig = function() {
    let z = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    q(z), Be = !0;
  }, t.clearConfig = function() {
    yt = null, Be = !1;
  }, t.isValidAttribute = function(z, y, S) {
    yt || q({});
    const M = ge(z), pe = ge(y);
    return ut(M, pe, S);
  }, t.addHook = function(z, y) {
    typeof y == "function" && Wt(N[z], y);
  }, t.removeHook = function(z, y) {
    if (y !== void 0) {
      const S = pc(N[z], y);
      return S === -1 ? void 0 : hc(N[z], S, 1)[0];
    }
    return hi(N[z]);
  }, t.removeHooks = function(z) {
    N[z] = [];
  }, t.removeAllHooks = function() {
    N = Ci();
  }, t;
}
var Ac = so();
function Nc(e) {
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
function Lc(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function wi(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || Nc(e));
  } catch {
    return !1;
  }
}
function Mc() {
  Ac.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !wi(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !wi(n) && e.removeAttribute("src");
    }
  });
}
Mc();
const Rc = xi(
  ({
    placeholder: e = "What would you like to know?",
    disabled: t = !1,
    chatStatus: n,
    fileUploadEnabled: r = !1,
    restaurantName: i,
    restaurantLogo: o,
    onSubmit: l,
    onFileUpload: a,
    onStopGeneration: u
  }, c) => {
    const [s, d] = oe(""), [m, h] = oe([]), x = pt(null);
    go(c, () => ({
      focus: () => {
        var I;
        (I = x.current) == null || I.focus();
      },
      setText: (I) => {
        d(I), setTimeout(() => {
          var v;
          (v = x.current) == null || v.focus();
        }, 0);
      }
    }));
    const k = he(
      (I) => {
        I.preventDefault();
        const D = new FormData(I.currentTarget).get("message");
        if (D != null && D.trim()) {
          const W = pn(D.trim(), !1);
          if (!W.trim()) {
            console.warn("Message was blocked due to security concerns");
            return;
          }
          l(W, m), d(""), h([]);
        }
      },
      [l, m]
    ), A = he(
      (I) => {
        const D = I.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
        d(D);
      },
      []
    ), b = he(async () => {
      const I = document.createElement("input");
      I.type = "file", I.accept = "image/*,text/*,.pdf,.doc,.docx", I.multiple = !0, I.onchange = async (v) => {
        const D = v.target.files;
        if (D) {
          const W = Array.from(D).filter((w) => {
            const F = Lc(w.name);
            return F !== w.name && console.warn(
              `File name sanitized: ${w.name} -> ${F}`
            ), w.size > 10485760 ? (console.warn(`File too large: ${w.name} (${w.size} bytes)`), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp",
              "text/plain",
              "text/csv",
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ].includes(w.type) ? !0 : (console.warn(
              `File type not allowed: ${w.name} (${w.type})`
            ), !1);
          });
          if (W.length > 0) {
            const w = await a(W);
            h((F) => [...F, ...w]);
          }
        }
      }, I.click();
    }, [a]);
    return /* @__PURE__ */ L(rc, { onSubmit: k, children: [
      /* @__PURE__ */ p(
        io,
        {
          ref: x,
          name: "message",
          value: s,
          onChange: A,
          placeholder: e,
          disabled: t
        }
      ),
      m.length > 0 && /* @__PURE__ */ p(
        "div",
        {
          style: {
            padding: "8px 16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center"
          },
          children: m.map((I, v) => {
            const D = I.startsWith("data:image/"), W = I.startsWith("http://") || I.startsWith("https://"), w = D || W;
            return /* @__PURE__ */ L(
              "div",
              {
                style: {
                  position: "relative",
                  display: "inline-block"
                },
                children: [
                  w ? /* @__PURE__ */ L(
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
                            src: I,
                            alt: `Attachment ${v + 1}`,
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
                  ) : /* @__PURE__ */ L(
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
                            children: /* @__PURE__ */ L(
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
                        /* @__PURE__ */ L("div", { style: { flex: 1, minWidth: 0 }, children: [
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
                                const F = I.match(/name=([^;]+)/);
                                return F ? decodeURIComponent(F[1]) : "document.pdf";
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
                                const F = I.match(/data:([^;]+)/);
                                if (F) {
                                  const te = F[1];
                                  switch (te) {
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
                                      const P = te.split("/")[1];
                                      return P ? P.toUpperCase().substring(0, 4) : "FILE";
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
                        h(
                          (F) => F.filter((te, P) => P !== v)
                        );
                      },
                      style: {
                        position: "absolute",
                        top: w ? "6px" : "8px",
                        right: w ? "6px" : "8px",
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
              v
            );
          })
        }
      ),
      /* @__PURE__ */ L(ic, { children: [
        /* @__PURE__ */ L(oc, { children: [
          r && /* @__PURE__ */ L(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center"
              },
              children: [
                /* @__PURE__ */ p(
                  lc,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: b,
                    title: m.length > 0 ? `${m.length} file(s) attached` : "Attach files",
                    disabled: t,
                    style: {
                      position: "relative"
                    },
                    children: /* @__PURE__ */ L(
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
                          /* @__PURE__ */ p("g", { "clip-path": "url(#clip0_121_9706)", children: /* @__PURE__ */ p(
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
                    onClick: b,
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
          r && i && /* @__PURE__ */ p("div", { className: "chat-wrapper__divider" }),
          i && /* @__PURE__ */ L("div", { className: "chat-wrapper__restaurant-chip", children: [
            o && /* @__PURE__ */ p(
              "img",
              {
                src: o,
                alt: "Restaurant logo",
                className: "chat-wrapper__restaurant-logo"
              }
            ),
            /* @__PURE__ */ p("span", { className: "chat-wrapper__restaurant-name", children: i })
          ] })
        ] }),
        /* @__PURE__ */ p(
          ac,
          {
            status: n,
            disabled: !s.trim() && n !== "streaming",
            onClick: n === "streaming" && u ? () => {
              u();
            } : void 0
          }
        )
      ] })
    ] });
  }
), Dc = ({
  prompts: e,
  onPromptSelect: t
}) => /* @__PURE__ */ L("div", { className: "chat-wrapper__suggested-prompts", children: [
  /* @__PURE__ */ p("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
  /* @__PURE__ */ p("div", { className: "chat-wrapper__suggested-prompts-grid", children: e.map((n, r) => /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__suggested-prompt-card",
      onClick: () => t(n),
      children: /* @__PURE__ */ L("div", { className: "chat-wrapper__suggested-prompt-content", children: [
        /* @__PURE__ */ p("h4", { className: "chat-wrapper__suggested-prompt-title", children: n.title }),
        /* @__PURE__ */ p("p", { className: "chat-wrapper__suggested-prompt-description", children: n.description })
      ] })
    },
    r
  )) })
] });
function Pc({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning", children: e });
}
function Oc({
  title: e,
  status: t = "processing"
}) {
  return /* @__PURE__ */ L("div", { className: "chat-wrapper__reasoning-trigger", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-icon", children: (() => {
      switch (t) {
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
    (e.includes("Thinking") || e.includes("Processing")) && /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-arrow", children: /* @__PURE__ */ L(
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
function zc({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-text", children: e }) });
}
function Fc({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function Uc({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var u, c;
  console.log("clog toolData", n);
  const o = () => {
    if (!r || !i) return null;
    const s = i.find((d) => d.name === r);
    return (s == null ? void 0 : s.description) || null;
  };
  let l;
  if (r != null && r.startsWith("lat_")) {
    const s = (u = n == null ? void 0 : n.parameters) == null ? void 0 : u.query, d = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.url;
    l = s || d || "Executing tool...";
  } else
    l = o();
  return l && (l.startsWith("http://") || l.startsWith("https://") || (l = l.charAt(0).toUpperCase() + l.slice(1))), /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ L("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
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
          /* @__PURE__ */ p("span", { children: l }),
          /* @__PURE__ */ L("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
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
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ L("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
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
          /* @__PURE__ */ p("span", { children: l }),
          /* @__PURE__ */ L("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
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
          ] })
        ] });
      case "error":
        return /* @__PURE__ */ L("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
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
        return /* @__PURE__ */ L("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
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
          /* @__PURE__ */ L("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
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
function uo({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ L("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
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
class Bc {
  // Track processed tool calls
  constructor() {
    ce(this, "sessionId", "");
    ce(this, "ws", null);
    ce(this, "isConnected", !1);
    ce(this, "apiUrl", "http://localhost:3000");
    ce(this, "userId", "");
    // Store userId from props
    ce(this, "onSetMessage");
    ce(this, "onSystemMessage");
    ce(this, "onBusinessDataUpdate");
    ce(this, "onReasoningUpdate");
    ce(this, "clientTools", {});
    ce(this, "toolSchemas", []);
    ce(this, "businessContext", {});
    ce(this, "reconnectAttempts", 0);
    ce(this, "maxReconnectAttempts", 5);
    ce(this, "reconnectTimer", null);
    ce(this, "reconnectDelay", 1e3);
    // Start with 1 second
    ce(this, "heartbeatInterval", null);
    ce(this, "isReconnecting", !1);
    ce(this, "visibilityChangeHandler");
    ce(this, "initResolve");
    ce(this, "initReject");
    ce(this, "processedToolCalls", /* @__PURE__ */ new Set());
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
        var o, l;
        if (console.error("WebSocket connection error:", i), i instanceof Event) {
          console.log("Falling back to demo mode..."), this.isConnected = !0, this.onSystemMessage && this.onSystemMessage("⚠️ Using demo mode - WebSocket unavailable"), (o = this.initResolve) == null || o.call(this);
          return;
        }
        (l = this.initReject) == null || l.call(this, i);
      }, this.ws.onmessage = (i) => {
        var l, a;
        const o = this.handleWebSocketMessage(i);
        o && o.type === "tools_configured" && (this.onSystemMessage && this.onSystemMessage("✅ Client tools configured successfully"), (l = this.initResolve) == null || l.call(this)), o && o.type === "session_established" && (!this.toolSchemas || this.toolSchemas.length === 0) && ((a = this.initResolve) == null || a.call(this));
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
    var n, r, i, o, l, a, u, c;
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
              if (console.log("💭 Reasoning started:", s.data), this.onReasoningUpdate && s.data.id) {
                const m = {
                  toolName: "reasoning",
                  callId: s.data.id,
                  parameters: {}
                };
                this.onReasoningUpdate(
                  !0,
                  "",
                  // Empty content on start - deltas will populate it
                  m
                );
              }
            } else if (((i = s.data) == null ? void 0 : i.type) === "reasoning-delta") {
              if (console.log("💭 Reasoning delta:", s.data.text), this.onReasoningUpdate && s.data.id && s.data.text) {
                const m = {
                  toolName: "reasoning",
                  callId: s.data.id,
                  parameters: {}
                };
                this.onReasoningUpdate(
                  !0,
                  s.data.text,
                  m
                );
              }
            } else if (((o = s.data) == null ? void 0 : o.type) === "reasoning-end") {
              if (console.log("💭 Reasoning ended:", s.data), this.onReasoningUpdate && s.data.id) {
                const m = {
                  toolName: "reasoning",
                  callId: s.data.id,
                  parameters: {}
                };
                this.onReasoningUpdate(
                  !1,
                  "✅ Completed reasoning",
                  m
                );
              }
            } else if (((l = s.data) == null ? void 0 : l.type) === "tool-call") {
              const m = s.data;
              if (console.log(
                "🔧 clog Server-side tool call detected:",
                m
              ), this.onReasoningUpdate && m.toolName && m.toolCallId && m.toolName.startsWith("lat_")) {
                const h = {
                  toolName: m.toolName,
                  callId: m.toolCallId,
                  parameters: m.args || {}
                };
                this.onReasoningUpdate(
                  !0,
                  `🔧 Handling: ${m.toolName}`,
                  h
                );
              }
            } else if (((a = s.data) == null ? void 0 : a.type) === "tool-result" && s.data.toolName.startsWith("lat_")) {
              const m = s.data;
              if (console.log(
                "✅ clog Server-side tool result detected:",
                m
              ), this.onReasoningUpdate && m.toolCallId) {
                const h = {
                  toolName: m.toolName || "Unknown Tool",
                  callId: m.toolCallId,
                  parameters: {}
                };
                this.onReasoningUpdate(
                  !1,
                  `✅ Completed: ${m.toolName || "Unknown Tool"}`,
                  h
                );
              }
            }
          } else if (s.event === "latitude-event" && (console.log("Latitude event:", (u = s.data) == null ? void 0 : u.type, s.data), ((c = s.data) == null ? void 0 : c.type) === "tool-result" && this.onReasoningUpdate)) {
            const m = s.data;
            if (m.toolCallId && m.toolName) {
              const h = {
                toolName: m.toolName,
                callId: m.toolCallId,
                parameters: {}
              };
              this.onReasoningUpdate(
                !1,
                `✅ Completed: ${m.toolName}`,
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
      const o = this.clientTools[r];
      if (!o) {
        const a = `Tool not found: ${r}`;
        throw console.error(a), new Error(a);
      }
      console.log(`⚙️ Executing tool: ${r} with parameters:`, i);
      const l = await o(i);
      if (console.log(`✅ Tool result for ${r}:`, l), this.ws && this.ws.readyState === WebSocket.OPEN) {
        const a = {
          type: "tool_call_response",
          callId: n,
          result: l
        };
        console.log("📤 Sending tool response:", a), this.ws.send(JSON.stringify(a));
      } else
        console.error(`❌ WebSocket not ready when trying to send response for callId: ${n}`);
      this.onReasoningUpdate && this.onReasoningUpdate(!1, `✅ Completed: ${r}`, t);
    } catch (o) {
      if (console.error(`❌ Error executing tool ${r} (callId: ${n}):`, o), this.ws && this.ws.readyState === WebSocket.OPEN) {
        const l = {
          type: "tool_call_response",
          callId: n,
          error: o instanceof Error ? o.message : "Unknown error"
        };
        console.log("📤 Sending error response:", l), this.ws.send(JSON.stringify(l));
      } else
        console.error(`❌ WebSocket not ready when trying to send error response for callId: ${n}`);
      this.onReasoningUpdate && this.onReasoningUpdate(
        !1,
        `❌ Error: ${r} - ${o}`,
        t
      );
    }
  }
  async onTriggerMessage(t, n = "shop", r, i) {
    if (!this.isConnected)
      throw new Error("Client not connected");
    if (!this.ws)
      throw new Error("WebSocket not available");
    try {
      this.processedToolCalls.clear(), console.log("🧹 Cleared processed tool calls for new message");
      const o = {
        type: "chat_message",
        content: t,
        agentType: n,
        media: r || [],
        saveToDatabase: !0,
        userId: this.userId || void 0
        // Use stored userId or fallback
      };
      i && (o.convUuid = i), this.ws.send(JSON.stringify(o));
    } catch (o) {
      throw console.error("Error sending message:", o), this.onSystemMessage && this.onSystemMessage(`❌ Chat error: ${o}`), o;
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
async function Hc(e, t, n) {
  const r = new URLSearchParams();
  n != null && n.includeArchived && r.append("includeArchived", "true"), n != null && n.limit && r.append("limit", n.limit.toString());
  const i = `${e}/threads/user/${t}${r.toString() ? `?${r.toString()}` : ""}`, o = await fetch(i);
  if (!o.ok) {
    const a = await o.json().catch(() => ({
      error: "Failed to fetch threads"
    }));
    throw new Error(a.error || "Failed to fetch threads");
  }
  return (await o.json()).threads;
}
async function e1(e, t) {
  const n = `${e}/threads/conv/${t}`, r = await fetch(n);
  if (!r.ok) {
    const i = await r.json().catch(() => ({
      error: "Thread not found"
    }));
    throw new Error(i.error || "Thread not found");
  }
  return r.json();
}
async function jc(e, t) {
  const n = `${e}/messages/thread/${t}?format=client`, r = await fetch(n);
  if (!r.ok) {
    const o = await r.json().catch(() => ({
      error: "Failed to fetch messages"
    }));
    throw new Error(o.error || "Failed to fetch messages");
  }
  return (await r.json()).messages.map((o) => ({
    ...o,
    timestamp: new Date(o.timestamp)
  }));
}
async function t1(e, t) {
  const n = `${e}/messages/conv/${t}?format=client`, r = await fetch(n);
  if (!r.ok) {
    const o = await r.json().catch(() => ({
      error: "Failed to fetch messages"
    }));
    throw new Error(o.error || "Failed to fetch messages");
  }
  return (await r.json()).messages.map((o) => ({
    ...o,
    timestamp: new Date(o.timestamp)
  }));
}
async function n1(e, t, n, r) {
  const i = `${e}/threads`, o = await fetch(i, {
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
  if (!o.ok) {
    const l = await o.json().catch(() => ({
      error: "Failed to create thread"
    }));
    throw new Error(l.error || "Failed to create thread");
  }
  return o.json();
}
const co = nr(
  ({
    message: e,
    getReasoningTitle: t,
    getReasoningStatus: n,
    getToolingTitle: r,
    getToolingStatus: i,
    clientTools: o,
    currentAssistantMessageIdRef: l
  }) => {
    var a;
    return /* @__PURE__ */ p(
      "div",
      {
        className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
        children: e.role === "reasoning" ? (
          /* Reasoning message - no content wrapper */
          /* @__PURE__ */ L(Pc, { isStreaming: e.isStreaming || !1, children: [
            /* @__PURE__ */ p(
              Oc,
              {
                title: t(e.content, e.isStreaming),
                status: n(e.content, e.isStreaming)
              }
            ),
            /* @__PURE__ */ p(zc, { children: e.content })
          ] })
        ) : e.role === "tooling" ? (
          /* Tooling message - no content wrapper */
          /* @__PURE__ */ p(Fc, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ p(
            Uc,
            {
              title: r(e.content, e.isStreaming),
              status: i(e.content, e.isStreaming),
              toolData: e.toolData,
              toolName: (a = e.toolData) == null ? void 0 : a.toolName,
              clientTools: o
            }
          ) })
        ) : /* @__PURE__ */ p("div", { className: "chat-wrapper__message-content", children: e.role === "assistant" && e.isStreaming && e.content === "" && e.id === l.current ? (
          /* Show streaming indicator when no content yet */
          /* @__PURE__ */ L("div", { className: "chat-wrapper__streaming-placeholder", children: [
            /* @__PURE__ */ p(uo, { size: 16, variant: "dots" }),
            /* @__PURE__ */ p("span", { children: "Thinking" })
          ] })
        ) : e.role === "system" ? (
          /* System message with collapsible tool result */
          /* @__PURE__ */ p(Vc, { message: e })
        ) : e.role === "assistant" ? (
          /* Assistant message with regular markdown display */
          /* @__PURE__ */ p("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
            mn,
            {
              components: {
                pre: ({ children: u }) => /* @__PURE__ */ p("pre", { className: "chat-wrapper__code-block", children: u }),
                code: ({ children: u, className: c }) => !c ? /* @__PURE__ */ p("code", { className: "chat-wrapper__inline-code", children: u }) : /* @__PURE__ */ p("code", { className: "chat-wrapper__code-block", children: u }),
                ul: ({ children: u }) => /* @__PURE__ */ p("ul", { className: "chat-wrapper__list", children: u }),
                ol: ({ children: u }) => /* @__PURE__ */ p("ol", { className: "chat-wrapper__ordered-list", children: u }),
                li: ({ children: u }) => /* @__PURE__ */ p("li", { className: "chat-wrapper__list-item", children: u })
              },
              children: e.content
            }
          ) }) })
        ) : (
          /* User message display with markdown */
          /* @__PURE__ */ L("div", { className: "chat-wrapper__regular-message", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
              mn,
              {
                components: {
                  pre: ({ children: u }) => /* @__PURE__ */ p("pre", { className: "chat-wrapper__code-block", children: u }),
                  code: ({ children: u, className: c }) => !c ? /* @__PURE__ */ p("code", { className: "chat-wrapper__inline-code", children: u }) : /* @__PURE__ */ p("code", { className: "chat-wrapper__code", children: u }),
                  p: ({ children: u }) => /* @__PURE__ */ p("p", { className: "chat-wrapper__paragraph", children: u }),
                  h1: ({ children: u }) => /* @__PURE__ */ p("h1", { className: "chat-wrapper__heading-1", children: u }),
                  h2: ({ children: u }) => /* @__PURE__ */ p("h2", { className: "chat-wrapper__heading-2", children: u }),
                  h3: ({ children: u }) => /* @__PURE__ */ p("h3", { className: "chat-wrapper__heading-3", children: u }),
                  ul: ({ children: u }) => /* @__PURE__ */ p("ul", { className: "chat-wrapper__list", children: u }),
                  ol: ({ children: u }) => /* @__PURE__ */ p("ol", { className: "chat-wrapper__ordered-list", children: u }),
                  li: ({ children: u }) => /* @__PURE__ */ p("li", { className: "chat-wrapper__list-item", children: u }),
                  blockquote: ({ children: u }) => /* @__PURE__ */ p("blockquote", { className: "chat-wrapper__blockquote", children: u }),
                  strong: ({ children: u }) => /* @__PURE__ */ p("strong", { className: "chat-wrapper__bold", children: u }),
                  em: ({ children: u }) => /* @__PURE__ */ p("em", { className: "chat-wrapper__italic", children: u })
                },
                children: e.content.trim()
              }
            ) }),
            e.role === "user" && e.media && e.media.length > 0 && /* @__PURE__ */ p(
              "div",
              {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "4px",
                  justifyContent: "flex-end"
                },
                children: e.media.map((u, c) => {
                  const s = u.startsWith("data:image/"), d = u.startsWith("http://") || u.startsWith("https://");
                  return /* @__PURE__ */ p(
                    "div",
                    {
                      style: {
                        position: "relative",
                        display: "inline-block"
                      },
                      children: s || d ? /* @__PURE__ */ L(
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
                            /* @__PURE__ */ p(
                              "img",
                              {
                                src: u,
                                alt: `Attachment ${c + 1}`,
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
                                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                                  zIndex: 1
                                }
                              }
                            )
                          ]
                        }
                      ) : /* @__PURE__ */ L(
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
                                children: /* @__PURE__ */ L(
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
                            /* @__PURE__ */ L("div", { style: { flex: 1, minWidth: 0 }, children: [
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
                                    maxWidth: "200px"
                                  },
                                  children: (() => {
                                    const h = u.match(/name=([^;]+)/);
                                    return h ? decodeURIComponent(h[1]) : "document.pdf";
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
                                    const h = u.match(/data:([^;]+)/);
                                    if (h) {
                                      const x = h[1];
                                      switch (x) {
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
                                          const k = x.split("/")[1];
                                          return k ? k.toUpperCase().substring(0, 4) : "FILE";
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
                    c
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
co.displayName = "MessageComponent";
const po = nr(
  ({ content: e, messageId: t }) => !t || !e ? null : /* @__PURE__ */ p("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__message-content", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
    mn,
    {
      components: {
        pre: ({ children: n }) => /* @__PURE__ */ p("pre", { className: "chat-wrapper__code-block", children: n }),
        code: ({ children: n, className: r }) => !r ? /* @__PURE__ */ p("code", { className: "chat-wrapper__inline-code", children: n }) : /* @__PURE__ */ p("code", { className: "chat-wrapper__code-block", children: n }),
        ul: ({ children: n }) => /* @__PURE__ */ p("ul", { className: "chat-wrapper__list", children: n }),
        ol: ({ children: n }) => /* @__PURE__ */ p("ol", { className: "chat-wrapper__ordered-list", children: n }),
        li: ({ children: n }) => /* @__PURE__ */ p("li", { className: "chat-wrapper__list-item", children: n })
      },
      children: e
    }
  ) }) }) }) })
);
po.displayName = "StreamingMessage";
function Vc({ message: e }) {
  const [t, n] = oe(!0);
  return /* @__PURE__ */ L("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ p(
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
        children: e.role === "system" ? /* @__PURE__ */ L("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
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
          /* @__PURE__ */ L("span", { children: [
            "AI text input <show-toolname>",
            "..."
          ] }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
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
        ] }) : e.role === "assistant" ? e.isStreaming ? /* @__PURE__ */ L("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
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
        ] }) : /* @__PURE__ */ L("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ L(
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
    t && /* @__PURE__ */ p(
      "div",
      {
        className: "chat-wrapper__system-message-content",
        style: {
          padding: "0 12px 12px 0px"
        },
        children: /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
          mn,
          {
            components: {
              pre: ({ children: i }) => /* @__PURE__ */ p("pre", { className: "chat-wrapper__code-block", children: i }),
              code: ({ children: i, className: o }) => !o ? /* @__PURE__ */ p("code", { className: "chat-wrapper__inline-code", children: i }) : /* @__PURE__ */ p("code", { className: "chat-wrapper__code", children: i }),
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
function Wc({
  apiUrl: e,
  config: t,
  tools: n,
  clientTools: r,
  initialMessages: i = [],
  userId: o
}) {
  var yt;
  const l = he((T) => T.replace(/^wss?:\/\//, (O) => O === "wss://" ? "https://" : "http://"), []), a = Ht(() => l(e), [e, l]), [u, c] = oe(
    null
  ), [s, d] = oe(!1), [m, h] = oe(""), x = pt(null), [k, A] = oe(i), [b, I] = oe(!1), [v, D] = oe(!1), [W, w] = oe("idle"), [F, te] = oe(!1), [P, ne] = oe(t.mode), [N, R] = oe(!1), [J, le] = oe(
    null
  ), [Z, me] = oe(null), [de, ve] = oe(null), [Fe] = oe([]), [g, G] = oe(""), [Ue, f] = oe(!1), [, Se] = oe(""), [X, ie] = oe(""), [Me, xe] = oe(!1), [, nt] = oe(
    /* @__PURE__ */ new Map()
  ), [, Xe] = oe(
    /* @__PURE__ */ new Map()
  ), [, rt] = oe(
    /* @__PURE__ */ new Map()
  ), Et = pt(null), Ze = pt(null), Ie = pt(null), Je = pt(!0), Be = pt(""), it = pt(!1), ke = he(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), ft = Ht(
    () => (T, O) => O === !1 ? T.includes("❌") ? "error" : "completed" : T.includes("✅ Completed:") || T.includes("✅") ? "completed" : T.includes("❌") ? "error" : "processing",
    []
  ), mt = Ht(
    () => (T, O) => O === !1 ? T.includes("❌") ? "Error" : "Completed" : T.includes("✅ Completed:") || T.includes("✅") ? "Completed" : T.includes("❌") ? "Error" : (T.includes("🔧 Handling:"), "Thinking..."),
    []
  ), Lt = Ht(
    () => (T, O) => O === !1 ? T.includes("❌") ? "Tool Error" : "Tool Completed" : T.includes("✅ Completed:") || T.includes("✅") ? "Tool Completed" : T.includes("❌") ? "Tool Error" : (T.includes("🔧 Handling:"), "Tool Processing..."),
    []
  ), Mt = Ht(
    () => (T, O) => O === !1 ? T.includes("❌") ? "error" : "completed" : T.includes("✅ Completed:") || T.includes("✅") ? "completed" : T.includes("❌") ? "error" : "processing",
    []
  ), gt = he(
    (T, O) => {
      const V = pn(O, T === "assistant");
      A((re) => [
        ...re,
        {
          id: ke(),
          role: T,
          content: V,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [ke]
  ), He = he(() => {
    if (Ie.current && Be.current) {
      const T = pn(
        Be.current,
        !0
      ), O = {
        id: Ie.current,
        role: "assistant",
        content: T,
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !1
      };
      return A((q) => [...q, O]), Ie.current = null, Be.current = "", ie(""), !0;
    }
    return !1;
  }, []), at = he(() => {
    I(!1), f(!1), w("idle"), He(), console.log("clog focus..."), setTimeout(() => {
      var T;
      (T = Ze.current) == null || T.focus();
    }, 0);
  }, [He]), C = he(
    (T) => {
      console.error("Chat error:", T), I(!1), f(!1), w("error"), He(), gt("system", `❌ Chat error: ${T}`);
    },
    [gt, He]
  ), E = he(
    (T, O, q) => {
      Xe((V) => {
        const re = new Map(V), fe = re.get(T);
        if (q && !fe) {
          He();
          const K = ke();
          re.set(T, K), rt((we) => {
            const _e = new Map(we);
            return _e.set(T, ""), _e;
          });
          const ee = {
            id: K,
            role: "reasoning",
            content: "",
            // Start with empty content
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          A((we) => [...we, ee]);
        } else q && fe ? rt((K) => {
          const ee = new Map(K);
          return ee.set(T, O), A(
            (we) => we.map(
              (_e) => _e.id === fe ? {
                ..._e,
                content: O,
                // Use content directly - server already accumulated it
                isStreaming: !0
              } : _e
            )
          ), ee;
        }) : !q && fe && (A(
          (K) => K.map(
            (ee) => ee.id === fe ? {
              ...ee,
              isStreaming: !1
            } : ee
          )
        ), re.delete(T), rt((K) => {
          const ee = new Map(K);
          return ee.delete(T), ee;
        }));
        return re;
      });
    },
    [ke, He]
  ), U = he(async () => {
    try {
      const T = new Bc();
      x.current = T, c(T), h(T.getSessionId());
      const O = {};
      await T.onInit({
        apiUrl: e,
        userId: o,
        toolSchemas: r,
        clientTools: n,
        businessContext: O,
        onSetMessage: (q) => {
          const V = pn(q, !0);
          if (Ie.current)
            Be.current += V, ie(Be.current);
          else {
            f(!1);
            const re = ke();
            Ie.current = re, Be.current = V, ie(V);
          }
        },
        onSystemMessage: (q) => {
          if (q.includes("Chat completed"))
            at();
          else if (q.includes("Chat error")) {
            const V = q.match(/Chat error: (.+)/);
            V && C(V[1]);
          }
        },
        onReasoningUpdate: (q, V, re) => {
          console.log("🤔 Reasoning update:", {
            isThinking: q,
            content: V,
            toolCallRequest: re
          });
          const { callId: fe, toolName: K } = re || {};
          if (!fe) {
            console.log("⚠️ No callId provided for reasoning update");
            return;
          }
          if (K === "reasoning") {
            E(fe, V, q);
            return;
          }
          xe(q), Se(V);
          const ee = V.includes("🔧 Handling:"), we = V.includes("✅ Completed:"), _e = V.includes("❌ Error:");
          console.log("🔍 Debug reasoning conditions:", {
            isToolStarted: ee,
            isToolCompleted: we,
            isToolError: _e,
            callId: fe,
            isHandlingTool: Me
          }), nt((vt) => {
            const Ct = new Map(vt), De = Ct.get(fe);
            if (ee && !De) {
              He();
              const st = V.match(/🔧 Handling: (.+)/), ut = st ? st[1] : "Unknown Tool", It = ke();
              Ct.set(fe, It);
              const wt = {
                id: It,
                role: "tooling",
                content: V,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0,
                toolData: {
                  ...re,
                  toolName: ut,
                  callId: fe,
                  status: "processing"
                }
              };
              A((bn) => [...bn, wt]);
            } else if ((we || _e) && De) {
              const st = V.match(
                /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
              ), ut = st ? st[1] : "Unknown Tool";
              A(
                (It) => It.map(
                  (wt) => wt.id === De ? {
                    ...wt,
                    content: V,
                    isStreaming: !1,
                    // Mark as completed
                    toolData: {
                      ...wt.toolData,
                      toolName: ut,
                      status: _e ? "error" : "completed",
                      callId: fe ?? ""
                    }
                  } : wt
                )
              ), Ct.delete(fe);
            } else De && Me && !we && !_e && A(
              (st) => st.map(
                (ut) => ut.id === De ? {
                  ...ut,
                  content: V,
                  isStreaming: !0
                } : ut
              )
            );
            return Ct;
          });
        },
        onBusinessDataUpdate: (q) => {
          t.onBusinessDataUpdate && t.onBusinessDataUpdate(q);
        }
      }), d(!0), console.log("BusinessAgentClient connected");
    } catch (T) {
      console.error("Error connecting BusinessAgentClient:", T), d(!1);
    }
  }, [
    e,
    r,
    n,
    t,
    ke,
    gt,
    at,
    C,
    He
  ]), H = he(() => {
    x.current && (x.current.disconnect(), x.current = null), c(null), d(!1), h("");
  }, []), Y = he(() => {
    console.log("🔍 DEBUG: resetToolHandling called! Stack trace:"), console.trace(), xe(!1), Je.current = !0;
  }, []), be = he(() => {
    var T;
    (T = Et.current) == null || T.scrollIntoView({ behavior: "smooth" });
  }, []);
  bt(() => {
    be();
  }, [k, be]), bt(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(g);
  }, [g, t]), bt(() => {
    console.log("🔍 DEBUG: isHandlingTool state changed:", Me);
  }, [Me]), bt(() => {
    console.log("💭 DEBUG: isHandlingReasoning state changed:");
  }, []), bt(() => (console.log("Connecting BusinessAgentClient..."), U(), () => {
    H();
  }), [U, H]), bt(() => {
    const T = setInterval(() => {
      if (x.current) {
        const O = x.current.getConnectionStatus();
        d(O.connected);
      }
    }, 1e3);
    return () => clearInterval(T);
  }, []), bt(() => {
    (async () => {
      if (o && !it.current && !N && !(k.length > 0))
        try {
          R(!0), le(null), console.log(`📚 Fetching threads for user: ${o}`);
          const O = await Hc(a, o, {
            limit: 1
            // Get only the first/most recent thread
          });
          if (O.length === 0) {
            console.log("ℹ️ No threads found for user"), R(!1), it.current = !0;
            return;
          }
          const q = O[0];
          console.log(
            `📖 Loading thread: ${q.id} (${q.title})`
          ), me(q.id), ve(q.convUuid);
          const V = await jc(
            a,
            q.id
          );
          console.log(`✅ Loaded ${V.length} messages`), A(V), it.current = !0;
        } catch (O) {
          console.error("❌ Error loading conversation:", O), le(
            O instanceof Error ? O.message : "Failed to load conversation"
          ), it.current = !0;
        } finally {
          R(!1);
        }
    })();
  }, [o, a]);
  const Ke = he(
    async (T, O) => {
      if (!T.trim() || b || !u || !s)
        return;
      const q = {
        id: ke(),
        role: "user",
        content: T.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: O
      };
      A((V) => [...V, q]), I(!0), f(!0), w("submitted"), G("Starting...");
      try {
        await u.onTriggerMessage(
          q.content,
          "shop",
          O,
          de || void 0
        ), w("streaming");
      } catch (V) {
        console.error("Agent client send error:", V), f(!1), w("error"), gt(
          "system",
          `Sorry, there was an error: ${V instanceof Error ? V.message : "Unknown error"}`
        ), t.onError && t.onError(
          V instanceof Error ? V : new Error("Unknown error")
        ), I(!1), w("idle"), G("");
      }
    },
    [
      b,
      u,
      s,
      ke,
      gt,
      t,
      de
    ]
  ), Ae = he(() => {
    I(!1), w("idle"), G(""), f(!1), Se(""), Ie.current = null, Be.current = "", ie(""), Y();
  }, [Y]), Qe = he(
    async (T) => {
      console.log("Files selected:", T);
      const O = [], q = e || "http://localhost:3000", V = "chat-uploads";
      for (const re of T)
        try {
          const fe = new FormData();
          fe.append("file", re), fe.append("folder", V), console.log(`Uploading file: ${re.name} to ${q}/upload`);
          const K = await fetch(`${q}/upload`, {
            method: "POST",
            body: fe
          }), ee = await K.json();
          if (K.ok)
            console.log("✅ Upload successful:", ee), re.type.startsWith("image/") ? O.push(ee.url) : O.push(
              `data:${re.type};name=${encodeURIComponent(
                ee.fileName || re.name
              )};url=${encodeURIComponent(ee.url)}`
            );
          else if (console.error("❌ Upload failed:", ee.error), re.type.startsWith("image/")) {
            const we = new FileReader(), _e = await new Promise(
              (vt, Ct) => {
                we.onload = () => vt(we.result), we.onerror = Ct, we.readAsDataURL(re);
              }
            );
            O.push(_e);
          } else
            O.push(
              `data:${re.type};name=${encodeURIComponent(
                re.name
              )};base64,placeholder`
            );
        } catch (fe) {
          console.error("Error uploading file:", fe);
          try {
            if (re.type.startsWith("image/")) {
              const K = new FileReader(), ee = await new Promise(
                (we, _e) => {
                  K.onload = () => we(K.result), K.onerror = _e, K.readAsDataURL(re);
                }
              );
              O.push(ee);
            } else
              O.push(
                `data:${re.type};name=${encodeURIComponent(
                  re.name
                )};base64,placeholder`
              );
          } catch (K) {
            console.error("Error in fallback encoding:", K);
          }
        }
      return console.log("Added media:", O), O;
    },
    [e]
  ), Ee = he(() => {
    D(!0);
  }, []), ue = he(() => {
    D(!1);
  }, []), qe = he(() => {
    te((T) => !T);
  }, []), Re = he(() => {
    ne((T) => T === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  bt(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const T = (O) => {
      O.key === "Escape" && P === "modal" && v && ue();
    };
    if (P === "modal" && v)
      return document.addEventListener("keydown", T), () => document.removeEventListener("keydown", T);
  }, [P, v, ue]);
  const Rt = ((...T) => T.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${P}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`,
    F && "chat-wrapper--collapsed",
    P === "embedded" && t.constrainedHeight && "chat-wrapper--constrained"
  ), Dt = () => P === "modal" && v ? /* @__PURE__ */ p("div", { className: "chat-wrapper-overlay", onClick: ue }) : null, tn = () => {
    var O;
    if (P === "modal" && !v || P === "sidebar" && F || P === "fullscreen" && F) {
      const q = P === "modal" ? Ee : qe, V = P === "modal" ? `Open ${t.appName}` : `Expand ${t.appName}`;
      return /* @__PURE__ */ L(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: q,
          title: V,
          children: [
            /* @__PURE__ */ L(
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
            ((O = t.features) == null ? void 0 : O.showBubbleText) !== !1 && /* @__PURE__ */ p("span", { className: "chat-wrapper__bubble-text", children: t.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, Tt = () => P === "modal" && v ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: ue,
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
  ) : null, xn = () => {
    if ((P === "sidebar" || P === "fullscreen") && !F) {
      const T = P === "fullscreen";
      return /* @__PURE__ */ p(
        "button",
        {
          className: T ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: Re,
          title: T ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ p(
            "svg",
            {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: T ? (
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
  }, kn = () => (P === "sidebar" || P === "fullscreen") && !F ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: qe,
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
  ) : null, ge = () => {
    var T;
    return !((T = t.features) != null && T.showToolResults) || Fe.length === 0 ? null : /* @__PURE__ */ L("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ p("h4", { children: "Tool Results" }),
      /* @__PURE__ */ p("div", { className: "chat-wrapper__tool-results-list", children: Fe.map((O) => /* @__PURE__ */ L("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ p("div", { className: "chat-wrapper__tool-result-title", children: O.title }),
        O.description && /* @__PURE__ */ p("div", { className: "chat-wrapper__tool-result-description", children: O.description }),
        /* @__PURE__ */ L("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          O.status || "completed"
        ] })
      ] }, O.id)) })
    ] });
  };
  return P === "modal" && !v || (P === "sidebar" || P === "fullscreen") && F ? tn() : /* @__PURE__ */ L(Hn, { children: [
    Dt(),
    N && /* @__PURE__ */ p("div", { className: "chat-wrapper__loading-overlay", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__loading-overlay-content", children: /* @__PURE__ */ p(uo, { size: 32, variant: "dots" }) }) }),
    /* @__PURE__ */ L("div", { className: Rt, style: t.customStyles, children: [
      t.headerVisible !== !1 && /* @__PURE__ */ L("div", { className: "chat-wrapper__header", children: [
        /* @__PURE__ */ L("div", { className: "chat-wrapper__title-area", children: [
          /* @__PURE__ */ p("h2", { className: "chat-wrapper__title", children: t.appName }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__connection-status", children: /* @__PURE__ */ p(
            "span",
            {
              className: `chat-wrapper__connection-indicator ${s ? "connected" : "disconnected"}`,
              title: s ? `Connected to WebSocket${m ? ` (Session: ${m.slice(-8)})` : ""}` : "Disconnected from WebSocket",
              children: s ? "🟢" : "🔴"
            }
          ) })
        ] }),
        /* @__PURE__ */ L("div", { className: "chat-wrapper__header-controls", children: [
          xn(),
          kn(),
          Tt()
        ] })
      ] }),
      !F && /* @__PURE__ */ L(Hn, { children: [
        J && /* @__PURE__ */ p("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ L("p", { children: [
          "⚠️ ",
          J
        ] }) }),
        k.length === 0 && !b && !N && /* @__PURE__ */ L("div", { className: "chat-wrapper__main-header", children: [
          /* @__PURE__ */ p("h1", { className: "chat-wrapper__main-title", children: t.appName }),
          t.description && /* @__PURE__ */ p("p", { className: "chat-wrapper__description", children: t.description })
        ] }),
        /* @__PURE__ */ L(
          "div",
          {
            className: `chat-wrapper__content ${k.length === 0 && !b ? "chat-wrapper__content--empty" : "chat-wrapper__content--with-messages"}`,
            children: [
              /* @__PURE__ */ L("div", { className: "chat-wrapper__messages", children: [
                k.map((T) => /* @__PURE__ */ p(
                  co,
                  {
                    message: T,
                    getReasoningTitle: mt,
                    getReasoningStatus: ft,
                    getToolingTitle: Lt,
                    getToolingStatus: Mt,
                    clientTools: r || [],
                    currentAssistantMessageIdRef: Ie
                  },
                  T.id
                )),
                Ie.current && X && /* @__PURE__ */ p(
                  po,
                  {
                    content: X,
                    messageId: Ie.current
                  }
                ),
                Ue && !Me && /* @__PURE__ */ p("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ L("div", { className: "chat-wrapper__thinking-dots", children: [
                  /* @__PURE__ */ p("span", {}),
                  /* @__PURE__ */ p("span", {}),
                  /* @__PURE__ */ p("span", {})
                ] }) }) }) }),
                /* @__PURE__ */ p("div", { ref: Et })
              ] }),
              ge(),
              /* @__PURE__ */ p("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ p(
                Rc,
                {
                  ref: Ze,
                  placeholder: t.placeholder,
                  disabled: b,
                  chatStatus: W,
                  fileUploadEnabled: (yt = t.features) == null ? void 0 : yt.fileUpload,
                  restaurantName: t.restaurantName,
                  restaurantLogo: t.restaurantLogo,
                  onSubmit: (T, O) => Ke(T, O),
                  onFileUpload: Qe,
                  onStopGeneration: Ae
                }
              ) }),
              k.length === 0 && !b && t.suggestedPrompts && /* @__PURE__ */ p(
                Dc,
                {
                  prompts: t.suggestedPrompts,
                  onPromptSelect: (T) => {
                    Ze.current && Ze.current.setText(T.description);
                  }
                }
              )
            ]
          }
        )
      ] }),
      t.onError && /* @__PURE__ */ p("div", { className: "chat-wrapper__error-boundary" })
    ] })
  ] });
}
const r1 = nr(Wc);
class $c {
  constructor(t, n) {
    ce(this, "baseUrl");
    ce(this, "apiKey");
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
    const i = r.body.getReader(), o = new TextDecoder();
    for (; ; ) {
      const { done: l, value: a } = await i.read();
      if (l) break;
      const c = o.decode(a).split(`
`);
      for (const s of c)
        if (s.startsWith("data: ")) {
          const d = s.slice(6);
          if (d === "[DONE]") return;
          try {
            yield JSON.parse(d).content || "";
          } catch (m) {
            console.error("Failed to parse chunk:", m);
          }
        }
    }
  }
}
function i1(e, t) {
  const [n, r] = oe([]), [i, o] = oe(!1), [l, a] = oe(null), u = pt(null), c = pt(new $c(e, t)), s = he(async () => {
    try {
      const h = await c.current.initConversation();
      return u.current = h, h;
    } catch (h) {
      throw a(h), h;
    }
  }, []), d = he(
    async (h) => {
      u.current || await s();
      const x = {
        id: Date.now().toString(),
        role: "user",
        content: h,
        timestamp: /* @__PURE__ */ new Date()
      };
      r((A) => [...A, x]), o(!0), a(null);
      const k = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      r((A) => [...A, k]);
      try {
        const A = c.current.streamMessage(
          u.current,
          h
        );
        for await (const b of A)
          r(
            (I) => I.map(
              (v) => v.id === k.id ? { ...v, content: v.content + b } : v
            )
          );
        r(
          (b) => b.map(
            (I) => I.id === k.id ? { ...I, isStreaming: !1 } : I
          )
        );
      } catch (A) {
        a(A), r((b) => b.filter((I) => I.id !== k.id));
      } finally {
        o(!1);
      }
    },
    [s]
  ), m = he(() => {
    r([]), u.current = null;
  }, []);
  return {
    messages: n,
    isLoading: i,
    error: l,
    sendMessage: d,
    clearMessages: m
  };
}
export {
  r1 as ChatWrapper,
  uo as Loader,
  rc as PromptInput,
  lc as PromptInputButton,
  Yc as PromptInputModelSelect,
  Jc as PromptInputModelSelectContent,
  Kc as PromptInputModelSelectItem,
  Xc as PromptInputModelSelectTrigger,
  Qc as PromptInputModelSelectValue,
  ac as PromptInputSubmit,
  io as PromptInputTextarea,
  ic as PromptInputToolbar,
  oc as PromptInputTools,
  Pc as Reasoning,
  zc as ReasoningContent,
  Oc as ReasoningTrigger,
  Dc as SuggestedPrompts,
  n1 as createThread,
  t1 as fetchMessagesByConvUuid,
  e1 as fetchThreadByConvUuid,
  jc as fetchThreadMessages,
  Hc as fetchUserThreads,
  i1 as useChatConnection
};
