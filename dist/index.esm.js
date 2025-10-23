var ho = Object.defineProperty;
var fo = (e, t, n) => t in e ? ho(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var le = (e, t, n) => fo(e, typeof t != "symbol" ? t + "" : t, n);
import { jsxs as L, jsx as p, Fragment as Fn } from "react/jsx-runtime";
import mo, { forwardRef as wi, useState as re, useRef as ft, useImperativeHandle as go, useCallback as ue, memo as Qn, useMemo as Ft, useEffect as bt } from "react";
function yo(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Co = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, wo = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, xo = {};
function xr(e, t) {
  return (xo.jsx ? wo : Co).test(e);
}
const ko = /[ \t\n\f\r]/g;
function bo(e) {
  return typeof e == "object" ? e.type === "text" ? kr(e.value) : !1 : kr(e);
}
function kr(e) {
  return e.replace(ko, "") === "";
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
function xi(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new Xt(n, r, t);
}
function Un(e) {
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
let _o = 0;
const H = It(), de = It(), Bn = It(), _ = It(), ie = It(), Dt = It(), Ge = It();
function It() {
  return 2 ** ++_o;
}
const Hn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: H,
  booleanish: de,
  commaOrSpaceSeparated: Ge,
  commaSeparated: Dt,
  number: _,
  overloadedBoolean: Bn,
  spaceSeparated: ie
}, Symbol.toStringTag, { value: "Module" })), kn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Hn)
);
class er extends We {
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
    if (super(t, n), br(this, "space", i), typeof r == "number")
      for (; ++o < kn.length; ) {
        const l = kn[o];
        br(this, kn[o], (r & Hn[l]) === Hn[l]);
      }
  }
}
er.prototype.defined = !0;
function br(e, t, n) {
  n && (e[t] = n);
}
function Ot(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const o = new er(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (o.mustUseProperty = !0), t[r] = o, n[Un(r)] = r, n[Un(o.attribute)] = r;
  }
  return new Xt(t, n, e.space);
}
const ki = Ot({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: de,
    ariaAutoComplete: null,
    ariaBusy: de,
    ariaChecked: de,
    ariaColCount: _,
    ariaColIndex: _,
    ariaColSpan: _,
    ariaControls: ie,
    ariaCurrent: null,
    ariaDescribedBy: ie,
    ariaDetails: null,
    ariaDisabled: de,
    ariaDropEffect: ie,
    ariaErrorMessage: null,
    ariaExpanded: de,
    ariaFlowTo: ie,
    ariaGrabbed: de,
    ariaHasPopup: null,
    ariaHidden: de,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: ie,
    ariaLevel: _,
    ariaLive: null,
    ariaModal: de,
    ariaMultiLine: de,
    ariaMultiSelectable: de,
    ariaOrientation: null,
    ariaOwns: ie,
    ariaPlaceholder: null,
    ariaPosInSet: _,
    ariaPressed: de,
    ariaReadOnly: de,
    ariaRelevant: null,
    ariaRequired: de,
    ariaRoleDescription: ie,
    ariaRowCount: _,
    ariaRowIndex: _,
    ariaRowSpan: _,
    ariaSelected: de,
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
function bi(e, t) {
  return t in e ? e[t] : t;
}
function _i(e, t) {
  return bi(e, t.toLowerCase());
}
const So = Ot({
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
    acceptCharset: ie,
    accessKey: ie,
    action: null,
    allow: null,
    allowFullScreen: H,
    allowPaymentRequest: H,
    allowUserMedia: H,
    alt: null,
    as: null,
    async: H,
    autoCapitalize: null,
    autoComplete: ie,
    autoFocus: H,
    autoPlay: H,
    blocking: ie,
    capture: null,
    charSet: null,
    checked: H,
    cite: null,
    className: ie,
    cols: _,
    colSpan: null,
    content: null,
    contentEditable: de,
    controls: H,
    controlsList: ie,
    coords: _ | Dt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: H,
    defer: H,
    dir: null,
    dirName: null,
    disabled: H,
    download: Bn,
    draggable: de,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: H,
    formTarget: null,
    headers: ie,
    height: _,
    hidden: Bn,
    high: _,
    href: null,
    hrefLang: null,
    htmlFor: ie,
    httpEquiv: ie,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: H,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: H,
    itemId: null,
    itemProp: ie,
    itemRef: ie,
    itemScope: H,
    itemType: ie,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: H,
    low: _,
    manifest: null,
    max: null,
    maxLength: _,
    media: null,
    method: null,
    min: null,
    minLength: _,
    multiple: H,
    muted: H,
    name: null,
    nonce: null,
    noModule: H,
    noValidate: H,
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
    open: H,
    optimum: _,
    pattern: null,
    ping: ie,
    placeholder: null,
    playsInline: H,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: H,
    referrerPolicy: null,
    rel: ie,
    required: H,
    reversed: H,
    rows: _,
    rowSpan: _,
    sandbox: ie,
    scope: null,
    scoped: H,
    seamless: H,
    selected: H,
    shadowRootClonable: H,
    shadowRootDelegatesFocus: H,
    shadowRootMode: null,
    shape: null,
    size: _,
    sizes: null,
    slot: null,
    span: _,
    spellCheck: de,
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
    typeMustMatch: H,
    useMap: null,
    value: de,
    width: _,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: ie,
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
    compact: H,
    // Lists. Use CSS to reduce space between items instead
    declare: H,
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
    noResize: H,
    // `<frame>`
    noHref: H,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: H,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: H,
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
    scrolling: de,
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
    disablePictureInPicture: H,
    disableRemotePlayback: H,
    prefix: null,
    property: null,
    results: _,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: _i
}), Eo = Ot({
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
    className: ie,
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
    download: H,
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
    g1: Dt,
    g2: Dt,
    glyphName: Dt,
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
    ping: ie,
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
  transform: bi
}), Si = Ot({
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
}), Ei = Ot({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: _i
}), Ti = Ot({
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
}, vo = /[A-Z]/g, _r = /-[a-z]/g, Io = /^data[-\w.:]+$/i;
function Ao(e, t) {
  const n = Un(t);
  let r = t, i = We;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Io.test(t)) {
    if (t.charAt(4) === "-") {
      const o = t.slice(5).replace(_r, Lo);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = t.slice(4);
      if (!_r.test(o)) {
        let l = o.replace(vo, No);
        l.charAt(0) !== "-" && (l = "-" + l), t = "data" + l;
      }
    }
    i = er;
  }
  return new i(r, t);
}
function No(e) {
  return "-" + e.toLowerCase();
}
function Lo(e) {
  return e.charAt(1).toUpperCase();
}
const Mo = xi([ki, So, Si, Ei, Ti], "html"), tr = xi([ki, Eo, Si, Ei, Ti], "svg");
function Ro(e) {
  return e.join(" ").trim();
}
var pn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function vi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var nr = {}, Sr = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Do = /\n/g, Po = /^\s*/, Oo = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, zo = /^:\s*/, Fo = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Uo = /^[;\s]*/, Bo = /^\s+|\s+$/g, Ho = `
`, Er = "/", Tr = "*", vt = "", jo = "comment", Vo = "declaration", Wo = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(x) {
    var k = x.match(Do);
    k && (n += k.length);
    var M = x.lastIndexOf(Ho);
    r = ~M ? x.length - M : r + x.length;
  }
  function o() {
    var x = { line: n, column: r };
    return function(k) {
      return k.position = new l(x), u(), k;
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
  function s(x) {
    var k = x.exec(e);
    if (k) {
      var M = k[0];
      return i(M), e = e.slice(M.length), k;
    }
  }
  function u() {
    s(Po);
  }
  function c(x) {
    var k;
    for (x = x || []; k = f(); )
      k !== !1 && x.push(k);
    return x;
  }
  function f() {
    var x = o();
    if (!(Er != e.charAt(0) || Tr != e.charAt(1))) {
      for (var k = 2; vt != e.charAt(k) && (Tr != e.charAt(k) || Er != e.charAt(k + 1)); )
        ++k;
      if (k += 2, vt === e.charAt(k - 1))
        return a("End of comment missing");
      var M = e.slice(2, k - 2);
      return r += 2, i(M), e = e.slice(k), r += 2, x({
        type: jo,
        comment: M
      });
    }
  }
  function y() {
    var x = o(), k = s(Oo);
    if (k) {
      if (f(), !s(zo)) return a("property missing ':'");
      var M = s(Fo), b = x({
        type: Vo,
        property: vr(k[0].replace(Sr, vt)),
        value: M ? vr(M[0].replace(Sr, vt)) : vt
      });
      return s(Uo), b;
    }
  }
  function h() {
    var x = [];
    c(x);
    for (var k; k = y(); )
      k !== !1 && (x.push(k), c(x));
    return x;
  }
  return u(), h();
};
function vr(e) {
  return e ? e.replace(Bo, vt) : vt;
}
var $o = pn && pn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.default = qo;
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
var mn = {};
Object.defineProperty(mn, "__esModule", { value: !0 });
mn.camelCase = void 0;
var Go = /^--[a-zA-Z0-9_-]+$/, Yo = /-([a-z])/g, Xo = /^[^-]+$/, Jo = /^-(webkit|moz|ms|o|khtml)-/, Ko = /^-(ms)-/, Qo = function(e) {
  return !e || Xo.test(e) || Go.test(e);
}, el = function(e, t) {
  return t.toUpperCase();
}, Ir = function(e, t) {
  return "".concat(t, "-");
}, tl = function(e, t) {
  return t === void 0 && (t = {}), Qo(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Ko, Ir) : e = e.replace(Jo, Ir), e.replace(Yo, el));
};
mn.camelCase = tl;
var nl = pn && pn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, rl = nl(nr), il = mn;
function jn(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, rl.default)(e, function(r, i) {
    r && i && (n[(0, il.camelCase)(r, t)] = i);
  }), n;
}
jn.default = jn;
var ol = jn;
const ll = /* @__PURE__ */ vi(ol), Ii = Ai("end"), rr = Ai("start");
function Ai(e) {
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
  const t = rr(e), n = Ii(e);
  if (t && n)
    return { start: t, end: n };
}
function Zt(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Ar(e.position) : "start" in e || "end" in e ? Ar(e) : "line" in e || "column" in e ? Vn(e) : "";
}
function Vn(e) {
  return Nr(e && e.line) + ":" + Nr(e && e.column);
}
function Ar(e) {
  return Vn(e && e.start) + "-" + Vn(e && e.end);
}
function Nr(e) {
  return e && typeof e == "number" ? e : 1;
}
class Te extends Error {
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
      const s = r.indexOf(":");
      s === -1 ? o.ruleId = r : (o.source = r.slice(0, s), o.ruleId = r.slice(s + 1));
    }
    if (!o.place && o.ancestors && o.ancestors) {
      const s = o.ancestors[o.ancestors.length - 1];
      s && (o.place = s.position);
    }
    const a = o.place && "start" in o.place ? o.place.start : o.place;
    this.ancestors = o.ancestors || void 0, this.cause = o.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = Zt(o.place) || "1:1", this.place = o.place || void 0, this.reason = this.message, this.ruleId = o.ruleId || void 0, this.source = o.source || void 0, this.stack = l && o.cause && typeof o.cause.stack == "string" ? o.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Te.prototype.file = "";
Te.prototype.name = "";
Te.prototype.reason = "";
Te.prototype.message = "";
Te.prototype.stack = "";
Te.prototype.column = void 0;
Te.prototype.line = void 0;
Te.prototype.ancestors = void 0;
Te.prototype.cause = void 0;
Te.prototype.fatal = void 0;
Te.prototype.place = void 0;
Te.prototype.ruleId = void 0;
Te.prototype.source = void 0;
const ir = {}.hasOwnProperty, sl = /* @__PURE__ */ new Map(), ul = /[A-Z]/g, cl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), pl = /* @__PURE__ */ new Set(["td", "th"]), Ni = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
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
    schema: t.space === "svg" ? tr : Mo,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, o = Li(i, e, void 0);
  return o && typeof o != "string" ? o : i.create(
    e,
    i.Fragment,
    { children: o || void 0 },
    void 0
  );
}
function Li(e, t, n) {
  if (t.type === "element")
    return fl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return dl(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return gl(e, t, n);
  if (t.type === "mdxjsEsm")
    return ml(e, t);
  if (t.type === "root")
    return yl(e, t, n);
  if (t.type === "text")
    return Cl(e, t);
}
function fl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = tr, e.schema = i), e.ancestors.push(t);
  const o = Ri(e, t.tagName, !1), l = kl(e, t);
  let a = lr(e, t);
  return cl.has(t.tagName) && (a = a.filter(function(s) {
    return typeof s == "string" ? !bo(s) : !0;
  })), Mi(e, l, o, t), or(l, a), e.ancestors.pop(), e.schema = r, e.create(t, o, l, n);
}
function dl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Yt(e, t.position);
}
function ml(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Yt(e, t.position);
}
function gl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = tr, e.schema = i), e.ancestors.push(t);
  const o = t.name === null ? e.Fragment : Ri(e, t.name, !0), l = bl(e, t), a = lr(e, t);
  return Mi(e, l, o, t), or(l, a), e.ancestors.pop(), e.schema = r, e.create(t, o, l, n);
}
function yl(e, t, n) {
  const r = {};
  return or(r, lr(e, t)), e.create(t, e.Fragment, r, n);
}
function Cl(e, t) {
  return t.value;
}
function Mi(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function or(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function wl(e, t, n) {
  return r;
  function r(i, o, l, a) {
    const u = Array.isArray(l.children) ? n : t;
    return a ? u(o, l, a) : u(o, l);
  }
}
function xl(e, t) {
  return n;
  function n(r, i, o, l) {
    const a = Array.isArray(o.children), s = rr(r);
    return t(
      i,
      o,
      l,
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
function kl(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && ir.call(t.properties, i)) {
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
        Yt(e, t.position);
    else {
      const i = r.name;
      let o;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, o = e.evaluater.evaluateExpression(a.expression);
        } else
          Yt(e, t.position);
      else
        o = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      o;
    }
  return n;
}
function lr(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : sl;
  for (; ++r < t.children.length; ) {
    const o = t.children[r];
    let l;
    if (e.passKeys) {
      const s = o.type === "element" ? o.tagName : o.type === "mdxJsxFlowElement" || o.type === "mdxJsxTextElement" ? o.name : void 0;
      if (s) {
        const u = i.get(s) || 0;
        l = s + "-" + u, i.set(s, u + 1);
      }
    }
    const a = Li(e, o, l);
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
    ), i = new Te("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Ni + "#cannot-parse-style-attribute", i;
  }
}
function Ri(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let o = -1, l;
    for (; ++o < i.length; ) {
      const a = xr(i[o]) ? { type: "Identifier", name: i[o] } : { type: "Literal", value: i[o] };
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
    r = xr(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return ir.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Yt(e);
}
function Yt(e, t) {
  const n = new Te(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Ni + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function El(e) {
  const t = {};
  let n;
  for (n in e)
    ir.call(e, n) && (t[Tl(n)] = e[n]);
  return t;
}
function Tl(e) {
  let t = e.replace(ul, vl);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function vl(e) {
  return "-" + e.toLowerCase();
}
const bn = {
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
  return Di(e, r, i);
}
function Di(e, t, n) {
  if (Nl(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Lr(e.children, t, n);
  }
  return Array.isArray(e) ? Lr(e, t, n) : "";
}
function Lr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Di(e[i], t, n);
  return r.join("");
}
function Nl(e) {
  return !!(e && typeof e == "object");
}
const Mr = document.createElement("i");
function ar(e) {
  const t = "&" + e + ";";
  Mr.innerHTML = t;
  const n = Mr.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function mt(e, t, n, r) {
  const i = e.length;
  let o = 0, l;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    l = Array.from(r), l.unshift(t, n), e.splice(...l);
  else
    for (n && e.splice(t, n); o < r.length; )
      l = r.slice(o, o + 1e4), l.unshift(t, 0), e.splice(...l), o += 1e4, t += 1e4;
}
function Qe(e, t) {
  return e.length > 0 ? (mt(e, e.length, 0, t), e) : t;
}
const Rr = {}.hasOwnProperty;
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
    const i = (Rr.call(e, n) ? e[n] : void 0) || (e[n] = {}), o = t[n];
    let l;
    if (o)
      for (l in o) {
        Rr.call(i, l) || (i[l] = []);
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
  mt(e, 0, 0, r);
}
function Pi(e, t) {
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
function Pt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const dt = St(/[A-Za-z]/), Ye = St(/[\dA-Za-z]/), Dl = St(/[#-'*+\--9=?A-Z^-~]/);
function Wn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const $n = St(/\d/), Pl = St(/[\dA-Fa-f]/), Ol = St(/[!-/:-@[-`{-~]/);
function B(e) {
  return e !== null && e < -2;
}
function Ve(e) {
  return e !== null && (e < 0 || e === 32);
}
function K(e) {
  return e === -2 || e === -1 || e === 32;
}
const zl = St(new RegExp("\\p{P}|\\p{S}", "u")), Fl = St(/\s/);
function St(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function zt(e) {
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
function oe(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let o = 0;
  return l;
  function l(s) {
    return K(s) ? (e.enter(n), a(s)) : t(s);
  }
  function a(s) {
    return K(s) && o++ < i ? (e.consume(s), a) : (e.exit(n), t(s));
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
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), oe(e, t, "linePrefix");
  }
  function i(a) {
    return e.enter("paragraph"), o(a);
  }
  function o(a) {
    const s = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = s), n = s, l(a);
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
}, Dr = {
  tokenize: Vl
};
function jl(e) {
  const t = this, n = [];
  let r = 0, i, o, l;
  return a;
  function a(T) {
    if (r < n.length) {
      const P = n[r];
      return t.containerState = P[1], e.attempt(P[0].continuation, s, u)(T);
    }
    return u(T);
  }
  function s(T) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && I();
      const P = t.events.length;
      let V = P, w;
      for (; V--; )
        if (t.events[V][0] === "exit" && t.events[V][1].type === "chunkFlow") {
          w = t.events[V][1].end;
          break;
        }
      b(r);
      let F = P;
      for (; F < t.events.length; )
        t.events[F][1].end = {
          ...w
        }, F++;
      return mt(t.events, V + 1, 0, t.events.slice(P)), t.events.length = F, u(T);
    }
    return a(T);
  }
  function u(T) {
    if (r === n.length) {
      if (!i)
        return y(T);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return x(T);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(Dr, c, f)(T);
  }
  function c(T) {
    return i && I(), b(r), y(T);
  }
  function f(T) {
    return t.parser.lazy[t.now().line] = r !== n.length, l = t.now().offset, x(T);
  }
  function y(T) {
    return t.containerState = {}, e.attempt(Dr, h, x)(T);
  }
  function h(T) {
    return r++, n.push([t.currentConstruct, t.containerState]), y(T);
  }
  function x(T) {
    if (T === null) {
      i && I(), b(0), e.consume(T);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: o
    }), k(T);
  }
  function k(T) {
    if (T === null) {
      M(e.exit("chunkFlow"), !0), b(0), e.consume(T);
      return;
    }
    return B(T) ? (e.consume(T), M(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, a) : (e.consume(T), k);
  }
  function M(T, P) {
    const V = t.sliceStream(T);
    if (P && V.push(null), T.previous = o, o && (o.next = T), o = T, i.defineSkip(T.start), i.write(V), t.parser.lazy[T.start.line]) {
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
      let Q = F, O, ee;
      for (; Q--; )
        if (t.events[Q][0] === "exit" && t.events[Q][1].type === "chunkFlow") {
          if (O) {
            ee = t.events[Q][1].end;
            break;
          }
          O = !0;
        }
      for (b(r), w = F; w < t.events.length; )
        t.events[w][1].end = {
          ...ee
        }, w++;
      mt(t.events, Q + 1, 0, t.events.slice(F)), t.events.length = w;
    }
  }
  function b(T) {
    let P = n.length;
    for (; P-- > T; ) {
      const V = n[P];
      t.containerState = V[1], V[0].exit.call(t, e);
    }
    n.length = T;
  }
  function I() {
    i.write([null]), o = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Vl(e, t, n) {
  return oe(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Pr(e) {
  if (e === null || Ve(e) || Fl(e))
    return 1;
  if (zl(e))
    return 2;
}
function sr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const o = e[i].resolveAll;
    o && !r.includes(o) && (t = o(t, n), r.push(o));
  }
  return t;
}
const Zn = {
  name: "attention",
  resolveAll: Wl,
  tokenize: $l
};
function Wl(e, t) {
  let n = -1, r, i, o, l, a, s, u, c;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          s = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const f = {
            ...e[r][1].end
          }, y = {
            ...e[n][1].start
          };
          Or(f, -s), Or(y, s), l = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: f,
            end: {
              ...e[r][1].end
            }
          }, a = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: y
          }, o = {
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
              ...a.end
            }
          }, e[r][1].end = {
            ...l.start
          }, e[n][1].start = {
            ...a.end
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = Qe(u, [["enter", e[r][1], t], ["exit", e[r][1], t]])), u = Qe(u, [["enter", i, t], ["enter", l, t], ["exit", l, t], ["enter", o, t]]), u = Qe(u, sr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), u = Qe(u, [["exit", o, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (c = 2, u = Qe(u, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : c = 0, mt(e, r - 1, n - r + 3, u), n = r + u.length - c - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function $l(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Pr(r);
  let o;
  return l;
  function l(s) {
    return o = s, e.enter("attentionSequence"), a(s);
  }
  function a(s) {
    if (s === o)
      return e.consume(s), a;
    const u = e.exit("attentionSequence"), c = Pr(s), f = !c || c === 2 && i || n.includes(s), y = !i || i === 2 && c || n.includes(r);
    return u._open = !!(o === 42 ? f : f && (i || !y)), u._close = !!(o === 42 ? y : y && (c || !f)), t(s);
  }
}
function Or(e, t) {
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
    return dt(h) ? (e.consume(h), l) : h === 64 ? n(h) : u(h);
  }
  function l(h) {
    return h === 43 || h === 45 || h === 46 || Ye(h) ? (r = 1, a(h)) : u(h);
  }
  function a(h) {
    return h === 58 ? (e.consume(h), r = 0, s) : (h === 43 || h === 45 || h === 46 || Ye(h)) && r++ < 32 ? (e.consume(h), a) : (r = 0, u(h));
  }
  function s(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : h === null || h === 32 || h === 60 || Wn(h) ? n(h) : (e.consume(h), s);
  }
  function u(h) {
    return h === 64 ? (e.consume(h), c) : Dl(h) ? (e.consume(h), u) : n(h);
  }
  function c(h) {
    return Ye(h) ? f(h) : n(h);
  }
  function f(h) {
    return h === 46 ? (e.consume(h), r = 0, c) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : y(h);
  }
  function y(h) {
    if ((h === 45 || Ye(h)) && r++ < 63) {
      const x = h === 45 ? y : f;
      return e.consume(h), x;
    }
    return n(h);
  }
}
const gn = {
  partial: !0,
  tokenize: Gl
};
function Gl(e, t, n) {
  return r;
  function r(o) {
    return K(o) ? oe(e, i, "linePrefix")(o) : i(o);
  }
  function i(o) {
    return o === null || B(o) ? t(o) : n(o);
  }
}
const Oi = {
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
    return K(l) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(l), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(l));
  }
}
function Xl(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return K(l) ? oe(e, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : o(l);
  }
  function o(l) {
    return e.attempt(Oi, t, n)(l);
  }
}
function Jl(e) {
  e.exit("blockQuote");
}
const zi = {
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
const Fi = {
  name: "characterReference",
  tokenize: Ql
};
function Ql(e, t, n) {
  const r = this;
  let i = 0, o, l;
  return a;
  function a(f) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), s;
  }
  function s(f) {
    return f === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(f), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), o = 31, l = Ye, c(f));
  }
  function u(f) {
    return f === 88 || f === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(f), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), o = 6, l = Pl, c) : (e.enter("characterReferenceValue"), o = 7, l = $n, c(f));
  }
  function c(f) {
    if (f === 59 && i) {
      const y = e.exit("characterReferenceValue");
      return l === Ye && !ar(r.sliceSerialize(y)) ? n(f) : (e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return l(f) && i++ < o ? (e.consume(f), c) : n(f);
  }
}
const zr = {
  partial: !0,
  tokenize: ta
}, Fr = {
  concrete: !0,
  name: "codeFenced",
  tokenize: ea
};
function ea(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: V
  };
  let o = 0, l = 0, a;
  return s;
  function s(w) {
    return u(w);
  }
  function u(w) {
    const F = r.events[r.events.length - 1];
    return o = F && F[1].type === "linePrefix" ? F[2].sliceSerialize(F[1], !0).length : 0, a = w, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), c(w);
  }
  function c(w) {
    return w === a ? (l++, e.consume(w), c) : l < 3 ? n(w) : (e.exit("codeFencedFenceSequence"), K(w) ? oe(e, f, "whitespace")(w) : f(w));
  }
  function f(w) {
    return w === null || B(w) ? (e.exit("codeFencedFence"), r.interrupt ? t(w) : e.check(zr, k, P)(w)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), y(w));
  }
  function y(w) {
    return w === null || B(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), f(w)) : K(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), oe(e, h, "whitespace")(w)) : w === 96 && w === a ? n(w) : (e.consume(w), y);
  }
  function h(w) {
    return w === null || B(w) ? f(w) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), x(w));
  }
  function x(w) {
    return w === null || B(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), f(w)) : w === 96 && w === a ? n(w) : (e.consume(w), x);
  }
  function k(w) {
    return e.attempt(i, P, M)(w);
  }
  function M(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), b;
  }
  function b(w) {
    return o > 0 && K(w) ? oe(e, I, "linePrefix", o + 1)(w) : I(w);
  }
  function I(w) {
    return w === null || B(w) ? e.check(zr, k, P)(w) : (e.enter("codeFlowValue"), T(w));
  }
  function T(w) {
    return w === null || B(w) ? (e.exit("codeFlowValue"), I(w)) : (e.consume(w), T);
  }
  function P(w) {
    return e.exit("codeFenced"), t(w);
  }
  function V(w, F, Q) {
    let O = 0;
    return ee;
    function ee($) {
      return w.enter("lineEnding"), w.consume($), w.exit("lineEnding"), A;
    }
    function A($) {
      return w.enter("codeFencedFence"), K($) ? oe(w, D, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)($) : D($);
    }
    function D($) {
      return $ === a ? (w.enter("codeFencedFenceSequence"), J($)) : Q($);
    }
    function J($) {
      return $ === a ? (O++, w.consume($), J) : O >= l ? (w.exit("codeFencedFenceSequence"), K($) ? oe(w, ne, "whitespace")($) : ne($)) : Q($);
    }
    function ne($) {
      return $ === null || B($) ? (w.exit("codeFencedFence"), F($)) : Q($);
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
const _n = {
  name: "codeIndented",
  tokenize: ra
}, na = {
  partial: !0,
  tokenize: ia
};
function ra(e, t, n) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("codeIndented"), oe(e, o, "linePrefix", 5)(u);
  }
  function o(u) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? l(u) : n(u);
  }
  function l(u) {
    return u === null ? s(u) : B(u) ? e.attempt(na, l, s)(u) : (e.enter("codeFlowValue"), a(u));
  }
  function a(u) {
    return u === null || B(u) ? (e.exit("codeFlowValue"), l(u)) : (e.consume(u), a);
  }
  function s(u) {
    return e.exit("codeIndented"), t(u);
  }
}
function ia(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line] ? n(l) : B(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), i) : oe(e, o, "linePrefix", 5)(l);
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
  function l(f) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(f);
  }
  function a(f) {
    return f === 96 ? (e.consume(f), r++, a) : (e.exit("codeTextSequence"), s(f));
  }
  function s(f) {
    return f === null ? n(f) : f === 32 ? (e.enter("space"), e.consume(f), e.exit("space"), s) : f === 96 ? (o = e.enter("codeTextSequence"), i = 0, c(f)) : B(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(f));
  }
  function u(f) {
    return f === null || f === 32 || f === 96 || B(f) ? (e.exit("codeTextData"), s(f)) : (e.consume(f), u);
  }
  function c(f) {
    return f === 96 ? (e.consume(f), i++, c) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(f)) : (o.type = "codeTextData", u(f));
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
    return r && Ut(this.left, r), o.reverse();
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
function Ui(e) {
  const t = {};
  let n = -1, r, i, o, l, a, s, u;
  const c = new ua(e);
  for (; ++n < c.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = c.get(n), n && r[1].type === "chunkFlow" && c.get(n - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, o = 0, o < s.length && s[o][1].type === "lineEndingBlank" && (o += 2), o < s.length && s[o][1].type === "content"))
      for (; ++o < s.length && s[o][1].type !== "content"; )
        s[o][1].type === "chunkText" && (s[o][1]._isInFirstContentOfListItem = !0, o++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, ca(c, n)), n = t[n], u = !0);
    else if (r[1]._container) {
      for (o = n, i = void 0; o--; )
        if (l = c.get(o), l[1].type === "lineEnding" || l[1].type === "lineEndingBlank")
          l[0] === "enter" && (i && (c.get(i)[1].type = "lineEndingBlank"), l[1].type = "lineEnding", i = o);
        else if (!(l[1].type === "linePrefix" || l[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...c.get(i)[1].start
      }, a = c.slice(i, n), a.unshift(r), c.splice(i, n - i + 1, a));
    }
  }
  return mt(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !u;
}
function ca(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const o = [];
  let l = n._tokenizer;
  l || (l = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (l._contentTypeTextTrailing = !0));
  const a = l.events, s = [], u = {};
  let c, f, y = -1, h = n, x = 0, k = 0;
  const M = [k];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; )
      ;
    o.push(i), h._tokenizer || (c = r.sliceStream(h), h.next || c.push(null), f && l.defineSkip(h.start), h._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(c), h._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), f = h, h = h.next;
  }
  for (h = n; ++y < a.length; )
    // Find a void token that includes a break.
    a[y][0] === "exit" && a[y - 1][0] === "enter" && a[y][1].type === a[y - 1][1].type && a[y][1].start.line !== a[y][1].end.line && (k = y + 1, M.push(k), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (l.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : M.pop(), y = M.length; y--; ) {
    const b = a.slice(M[y], M[y + 1]), I = o.pop();
    s.push([I, I + b.length - 1]), e.splice(I, 2, b);
  }
  for (s.reverse(), y = -1; ++y < s.length; )
    u[x + s[y][0]] = x + s[y][1], x += s[y][1] - s[y][0] - 1;
  return u;
}
const pa = {
  resolve: fa,
  tokenize: da
}, ha = {
  partial: !0,
  tokenize: ma
};
function fa(e) {
  return Ui(e), e;
}
function da(e, t) {
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
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), oe(e, o, "linePrefix");
  }
  function o(l) {
    if (l === null || B(l))
      return n(l);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(l) : e.interrupt(r.parser.constructs.flow, n, t)(l);
  }
}
function Bi(e, t, n, r, i, o, l, a, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let c = 0;
  return f;
  function f(b) {
    return b === 60 ? (e.enter(r), e.enter(i), e.enter(o), e.consume(b), e.exit(o), y) : b === null || b === 32 || b === 41 || Wn(b) ? n(b) : (e.enter(r), e.enter(l), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), k(b));
  }
  function y(b) {
    return b === 62 ? (e.enter(o), e.consume(b), e.exit(o), e.exit(i), e.exit(r), t) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), h(b));
  }
  function h(b) {
    return b === 62 ? (e.exit("chunkString"), e.exit(a), y(b)) : b === null || b === 60 || B(b) ? n(b) : (e.consume(b), b === 92 ? x : h);
  }
  function x(b) {
    return b === 60 || b === 62 || b === 92 ? (e.consume(b), h) : h(b);
  }
  function k(b) {
    return !c && (b === null || b === 41 || Ve(b)) ? (e.exit("chunkString"), e.exit(a), e.exit(l), e.exit(r), t(b)) : c < u && b === 40 ? (e.consume(b), c++, k) : b === 41 ? (e.consume(b), c--, k) : b === null || b === 32 || b === 40 || Wn(b) ? n(b) : (e.consume(b), b === 92 ? M : k);
  }
  function M(b) {
    return b === 40 || b === 41 || b === 92 ? (e.consume(b), k) : k(b);
  }
}
function Hi(e, t, n, r, i, o) {
  const l = this;
  let a = 0, s;
  return u;
  function u(h) {
    return e.enter(r), e.enter(i), e.consume(h), e.exit(i), e.enter(o), c;
  }
  function c(h) {
    return a > 999 || h === null || h === 91 || h === 93 && !s || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === 94 && !a && "_hiddenFootnoteSupport" in l.parser.constructs ? n(h) : h === 93 ? (e.exit(o), e.enter(i), e.consume(h), e.exit(i), e.exit(r), t) : B(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), c) : (e.enter("chunkString", {
      contentType: "string"
    }), f(h));
  }
  function f(h) {
    return h === null || h === 91 || h === 93 || B(h) || a++ > 999 ? (e.exit("chunkString"), c(h)) : (e.consume(h), s || (s = !K(h)), h === 92 ? y : f);
  }
  function y(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), a++, f) : f(h);
  }
}
function ji(e, t, n, r, i, o) {
  let l;
  return a;
  function a(y) {
    return y === 34 || y === 39 || y === 40 ? (e.enter(r), e.enter(i), e.consume(y), e.exit(i), l = y === 40 ? 41 : y, s) : n(y);
  }
  function s(y) {
    return y === l ? (e.enter(i), e.consume(y), e.exit(i), e.exit(r), t) : (e.enter(o), u(y));
  }
  function u(y) {
    return y === l ? (e.exit(o), s(l)) : y === null ? n(y) : B(y) ? (e.enter("lineEnding"), e.consume(y), e.exit("lineEnding"), oe(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), c(y));
  }
  function c(y) {
    return y === l || y === null || B(y) ? (e.exit("chunkString"), u(y)) : (e.consume(y), y === 92 ? f : c);
  }
  function f(y) {
    return y === l || y === 92 ? (e.consume(y), c) : c(y);
  }
}
function qt(e, t) {
  let n;
  return r;
  function r(i) {
    return B(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : K(i) ? oe(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
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
    return Hi.call(
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
    return i = Pt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), s) : n(h);
  }
  function s(h) {
    return Ve(h) ? qt(e, u)(h) : u(h);
  }
  function u(h) {
    return Bi(
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
    return e.attempt(ya, f, f)(h);
  }
  function f(h) {
    return K(h) ? oe(e, y, "whitespace")(h) : y(h);
  }
  function y(h) {
    return h === null || B(h) ? (e.exit("definition"), r.parser.defined.push(i), t(h)) : n(h);
  }
}
function wa(e, t, n) {
  return r;
  function r(a) {
    return Ve(a) ? qt(e, i)(a) : n(a);
  }
  function i(a) {
    return ji(e, o, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function o(a) {
    return K(a) ? oe(e, l, "whitespace")(a) : l(a);
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
  }, mt(e, r, n - r + 1, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["exit", i, t]])), e;
}
function Sa(e, t, n) {
  let r = 0;
  return i;
  function i(c) {
    return e.enter("atxHeading"), o(c);
  }
  function o(c) {
    return e.enter("atxHeadingSequence"), l(c);
  }
  function l(c) {
    return c === 35 && r++ < 6 ? (e.consume(c), l) : c === null || Ve(c) ? (e.exit("atxHeadingSequence"), a(c)) : n(c);
  }
  function a(c) {
    return c === 35 ? (e.enter("atxHeadingSequence"), s(c)) : c === null || B(c) ? (e.exit("atxHeading"), t(c)) : K(c) ? oe(e, a, "whitespace")(c) : (e.enter("atxHeadingText"), u(c));
  }
  function s(c) {
    return c === 35 ? (e.consume(c), s) : (e.exit("atxHeadingSequence"), a(c));
  }
  function u(c) {
    return c === null || c === 35 || Ve(c) ? (e.exit("atxHeadingText"), a(c)) : (e.consume(c), u);
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
], Ur = ["pre", "script", "style", "textarea"], Ta = {
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
  let i, o, l, a, s;
  return u;
  function u(d) {
    return c(d);
  }
  function c(d) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(d), f;
  }
  function f(d) {
    return d === 33 ? (e.consume(d), y) : d === 47 ? (e.consume(d), o = !0, k) : d === 63 ? (e.consume(d), i = 3, r.interrupt ? t : m) : dt(d) ? (e.consume(d), l = String.fromCharCode(d), M) : n(d);
  }
  function y(d) {
    return d === 45 ? (e.consume(d), i = 2, h) : d === 91 ? (e.consume(d), i = 5, a = 0, x) : dt(d) ? (e.consume(d), i = 4, r.interrupt ? t : m) : n(d);
  }
  function h(d) {
    return d === 45 ? (e.consume(d), r.interrupt ? t : m) : n(d);
  }
  function x(d) {
    const ye = "CDATA[";
    return d === ye.charCodeAt(a++) ? (e.consume(d), a === ye.length ? r.interrupt ? t : D : x) : n(d);
  }
  function k(d) {
    return dt(d) ? (e.consume(d), l = String.fromCharCode(d), M) : n(d);
  }
  function M(d) {
    if (d === null || d === 47 || d === 62 || Ve(d)) {
      const ye = d === 47, Y = l.toLowerCase();
      return !ye && !o && Ur.includes(Y) ? (i = 1, r.interrupt ? t(d) : D(d)) : Ea.includes(l.toLowerCase()) ? (i = 6, ye ? (e.consume(d), b) : r.interrupt ? t(d) : D(d)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(d) : o ? I(d) : T(d));
    }
    return d === 45 || Ye(d) ? (e.consume(d), l += String.fromCharCode(d), M) : n(d);
  }
  function b(d) {
    return d === 62 ? (e.consume(d), r.interrupt ? t : D) : n(d);
  }
  function I(d) {
    return K(d) ? (e.consume(d), I) : ee(d);
  }
  function T(d) {
    return d === 47 ? (e.consume(d), ee) : d === 58 || d === 95 || dt(d) ? (e.consume(d), P) : K(d) ? (e.consume(d), T) : ee(d);
  }
  function P(d) {
    return d === 45 || d === 46 || d === 58 || d === 95 || Ye(d) ? (e.consume(d), P) : V(d);
  }
  function V(d) {
    return d === 61 ? (e.consume(d), w) : K(d) ? (e.consume(d), V) : T(d);
  }
  function w(d) {
    return d === null || d === 60 || d === 61 || d === 62 || d === 96 ? n(d) : d === 34 || d === 39 ? (e.consume(d), s = d, F) : K(d) ? (e.consume(d), w) : Q(d);
  }
  function F(d) {
    return d === s ? (e.consume(d), s = null, O) : d === null || B(d) ? n(d) : (e.consume(d), F);
  }
  function Q(d) {
    return d === null || d === 34 || d === 39 || d === 47 || d === 60 || d === 61 || d === 62 || d === 96 || Ve(d) ? V(d) : (e.consume(d), Q);
  }
  function O(d) {
    return d === 47 || d === 62 || K(d) ? T(d) : n(d);
  }
  function ee(d) {
    return d === 62 ? (e.consume(d), A) : n(d);
  }
  function A(d) {
    return d === null || B(d) ? D(d) : K(d) ? (e.consume(d), A) : n(d);
  }
  function D(d) {
    return d === 45 && i === 2 ? (e.consume(d), he) : d === 60 && i === 1 ? (e.consume(d), ce) : d === 62 && i === 4 ? (e.consume(d), q) : d === 63 && i === 3 ? (e.consume(d), m) : d === 93 && i === 5 ? (e.consume(d), De) : B(d) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(va, Pe, J)(d)) : d === null || B(d) ? (e.exit("htmlFlowData"), J(d)) : (e.consume(d), D);
  }
  function J(d) {
    return e.check(Ia, ne, Pe)(d);
  }
  function ne(d) {
    return e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), $;
  }
  function $(d) {
    return d === null || B(d) ? J(d) : (e.enter("htmlFlowData"), D(d));
  }
  function he(d) {
    return d === 45 ? (e.consume(d), m) : D(d);
  }
  function ce(d) {
    return d === 47 ? (e.consume(d), l = "", be) : D(d);
  }
  function be(d) {
    if (d === 62) {
      const ye = l.toLowerCase();
      return Ur.includes(ye) ? (e.consume(d), q) : D(d);
    }
    return dt(d) && l.length < 8 ? (e.consume(d), l += String.fromCharCode(d), be) : D(d);
  }
  function De(d) {
    return d === 93 ? (e.consume(d), m) : D(d);
  }
  function m(d) {
    return d === 62 ? (e.consume(d), q) : d === 45 && i === 2 ? (e.consume(d), m) : D(d);
  }
  function q(d) {
    return d === null || B(d) ? (e.exit("htmlFlowData"), Pe(d)) : (e.consume(d), q);
  }
  function Pe(d) {
    return e.exit("htmlFlow"), t(d);
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
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(gn, t, n);
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
  function a(m) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(m), s;
  }
  function s(m) {
    return m === 33 ? (e.consume(m), u) : m === 47 ? (e.consume(m), V) : m === 63 ? (e.consume(m), T) : dt(m) ? (e.consume(m), Q) : n(m);
  }
  function u(m) {
    return m === 45 ? (e.consume(m), c) : m === 91 ? (e.consume(m), o = 0, x) : dt(m) ? (e.consume(m), I) : n(m);
  }
  function c(m) {
    return m === 45 ? (e.consume(m), h) : n(m);
  }
  function f(m) {
    return m === null ? n(m) : m === 45 ? (e.consume(m), y) : B(m) ? (l = f, ce(m)) : (e.consume(m), f);
  }
  function y(m) {
    return m === 45 ? (e.consume(m), h) : f(m);
  }
  function h(m) {
    return m === 62 ? he(m) : m === 45 ? y(m) : f(m);
  }
  function x(m) {
    const q = "CDATA[";
    return m === q.charCodeAt(o++) ? (e.consume(m), o === q.length ? k : x) : n(m);
  }
  function k(m) {
    return m === null ? n(m) : m === 93 ? (e.consume(m), M) : B(m) ? (l = k, ce(m)) : (e.consume(m), k);
  }
  function M(m) {
    return m === 93 ? (e.consume(m), b) : k(m);
  }
  function b(m) {
    return m === 62 ? he(m) : m === 93 ? (e.consume(m), b) : k(m);
  }
  function I(m) {
    return m === null || m === 62 ? he(m) : B(m) ? (l = I, ce(m)) : (e.consume(m), I);
  }
  function T(m) {
    return m === null ? n(m) : m === 63 ? (e.consume(m), P) : B(m) ? (l = T, ce(m)) : (e.consume(m), T);
  }
  function P(m) {
    return m === 62 ? he(m) : T(m);
  }
  function V(m) {
    return dt(m) ? (e.consume(m), w) : n(m);
  }
  function w(m) {
    return m === 45 || Ye(m) ? (e.consume(m), w) : F(m);
  }
  function F(m) {
    return B(m) ? (l = F, ce(m)) : K(m) ? (e.consume(m), F) : he(m);
  }
  function Q(m) {
    return m === 45 || Ye(m) ? (e.consume(m), Q) : m === 47 || m === 62 || Ve(m) ? O(m) : n(m);
  }
  function O(m) {
    return m === 47 ? (e.consume(m), he) : m === 58 || m === 95 || dt(m) ? (e.consume(m), ee) : B(m) ? (l = O, ce(m)) : K(m) ? (e.consume(m), O) : he(m);
  }
  function ee(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || Ye(m) ? (e.consume(m), ee) : A(m);
  }
  function A(m) {
    return m === 61 ? (e.consume(m), D) : B(m) ? (l = A, ce(m)) : K(m) ? (e.consume(m), A) : O(m);
  }
  function D(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (e.consume(m), i = m, J) : B(m) ? (l = D, ce(m)) : K(m) ? (e.consume(m), D) : (e.consume(m), ne);
  }
  function J(m) {
    return m === i ? (e.consume(m), i = void 0, $) : m === null ? n(m) : B(m) ? (l = J, ce(m)) : (e.consume(m), J);
  }
  function ne(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96 ? n(m) : m === 47 || m === 62 || Ve(m) ? O(m) : (e.consume(m), ne);
  }
  function $(m) {
    return m === 47 || m === 62 || Ve(m) ? O(m) : n(m);
  }
  function he(m) {
    return m === 62 ? (e.consume(m), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(m);
  }
  function ce(m) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), be;
  }
  function be(m) {
    return K(m) ? oe(e, De, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m) : De(m);
  }
  function De(m) {
    return e.enter("htmlTextData"), l(m);
  }
}
const ur = {
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
  return e.length !== n.length && mt(e, 0, e.length, n), e;
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
  const s = {
    type: e[o][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[o][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, u = {
    type: "label",
    start: {
      ...e[o][1].start
    },
    end: {
      ...e[l][1].end
    }
  }, c = {
    type: "labelText",
    start: {
      ...e[o + r + 2][1].end
    },
    end: {
      ...e[l - 2][1].start
    }
  };
  return a = [["enter", s, t], ["enter", u, t]], a = Qe(a, e.slice(o + 1, o + r + 3)), a = Qe(a, [["enter", c, t]]), a = Qe(a, sr(t.parser.constructs.insideSpan.null, e.slice(o + r + 4, l - 3), t)), a = Qe(a, [["exit", c, t], e[l - 2], e[l - 1], ["exit", u, t]]), a = Qe(a, e.slice(l + 1)), a = Qe(a, [["exit", s, t]]), mt(e, o, e.length, a), e;
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
  function a(y) {
    return o ? o._inactive ? f(y) : (l = r.parser.defined.includes(Pt(r.sliceSerialize({
      start: o.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(y), e.exit("labelMarker"), e.exit("labelEnd"), s) : n(y);
  }
  function s(y) {
    return y === 40 ? e.attempt(Pa, c, l ? c : f)(y) : y === 91 ? e.attempt(Oa, c, l ? u : f)(y) : l ? c(y) : f(y);
  }
  function u(y) {
    return e.attempt(za, c, f)(y);
  }
  function c(y) {
    return t(y);
  }
  function f(y) {
    return o._balanced = !0, n(y);
  }
}
function Ha(e, t, n) {
  return r;
  function r(f) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), i;
  }
  function i(f) {
    return Ve(f) ? qt(e, o)(f) : o(f);
  }
  function o(f) {
    return f === 41 ? c(f) : Bi(e, l, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(f);
  }
  function l(f) {
    return Ve(f) ? qt(e, s)(f) : c(f);
  }
  function a(f) {
    return n(f);
  }
  function s(f) {
    return f === 34 || f === 39 || f === 40 ? ji(e, u, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(f) : c(f);
  }
  function u(f) {
    return Ve(f) ? qt(e, c)(f) : c(f);
  }
  function c(f) {
    return f === 41 ? (e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), e.exit("resource"), t) : n(f);
  }
}
function ja(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return Hi.call(r, e, o, l, "reference", "referenceMarker", "referenceString")(a);
  }
  function o(a) {
    return r.parser.defined.includes(Pt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(a) : n(a);
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
  resolveAll: ur.resolveAll,
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
  resolveAll: ur.resolveAll,
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
const Sn = {
  name: "lineEnding",
  tokenize: Ga
};
function Ga(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), oe(e, t, "linePrefix");
  }
}
const an = {
  name: "thematicBreak",
  tokenize: Ya
};
function Ya(e, t, n) {
  let r = 0, i;
  return o;
  function o(u) {
    return e.enter("thematicBreak"), l(u);
  }
  function l(u) {
    return i = u, a(u);
  }
  function a(u) {
    return u === i ? (e.enter("thematicBreakSequence"), s(u)) : r >= 3 && (u === null || B(u)) ? (e.exit("thematicBreak"), t(u)) : n(u);
  }
  function s(u) {
    return u === i ? (e.consume(u), r++, s) : (e.exit("thematicBreakSequence"), K(u) ? oe(e, a, "whitespace")(u) : a(u));
  }
}
const je = {
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
    if (x === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : $n(h)) {
      if (r.containerState.type || (r.containerState.type = x, e.enter(x, {
        _container: !0
      })), x === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(an, n, u)(h) : u(h);
      if (!r.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(h);
    }
    return n(h);
  }
  function s(h) {
    return $n(h) && ++l < 10 ? (e.consume(h), s) : (!r.interrupt || l < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), u(h)) : n(h);
  }
  function u(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e.check(
      gn,
      // Can’t be empty when interrupting.
      r.interrupt ? n : c,
      e.attempt(Xa, y, f)
    );
  }
  function c(h) {
    return r.containerState.initialBlankLine = !0, o++, y(h);
  }
  function f(h) {
    return K(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), y) : n(h);
  }
  function y(h) {
    return r.containerState.size = o + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(h);
  }
}
function Qa(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(gn, i, o);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, oe(e, t, "listItemIndent", r.containerState.size + 1)(a);
  }
  function o(a) {
    return r.containerState.furtherBlankLines || !K(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Ja, t, l)(a));
  }
  function l(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, oe(e, e.attempt(je, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function es(e, t, n) {
  const r = this;
  return oe(e, i, "listItemIndent", r.containerState.size + 1);
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
  return oe(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return !K(o) && l && l[1].type === "listItemPrefixWhitespace" ? t(o) : n(o);
  }
}
const Br = {
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
  function o(u) {
    let c = r.events.length, f;
    for (; c--; )
      if (r.events[c][1].type !== "lineEnding" && r.events[c][1].type !== "linePrefix" && r.events[c][1].type !== "content") {
        f = r.events[c][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || f) ? (e.enter("setextHeadingLine"), i = u, l(u)) : n(u);
  }
  function l(u) {
    return e.enter("setextHeadingLineSequence"), a(u);
  }
  function a(u) {
    return u === i ? (e.consume(u), a) : (e.exit("setextHeadingLineSequence"), K(u) ? oe(e, s, "lineSuffix")(u) : s(u));
  }
  function s(u) {
    return u === null || B(u) ? (e.exit("setextHeadingLine"), t(u)) : n(u);
  }
}
const os = {
  tokenize: ls
};
function ls(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    gn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, oe(e, e.attempt(this.parser.constructs.flow, i, e.attempt(pa, i)), "linePrefix"))
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
  resolveAll: Wi()
}, ss = Vi("string"), us = Vi("text");
function Vi(e) {
  return {
    resolveAll: Wi(e === "text" ? cs : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], o = n.attempt(i, l, a);
    return l;
    function l(c) {
      return u(c) ? o(c) : a(c);
    }
    function a(c) {
      if (c === null) {
        n.consume(c);
        return;
      }
      return n.enter("data"), n.consume(c), s;
    }
    function s(c) {
      return u(c) ? (n.exit("data"), o(c)) : (n.consume(c), s);
    }
    function u(c) {
      if (c === null)
        return !0;
      const f = i[c];
      let y = -1;
      if (f)
        for (; ++y < f.length; ) {
          const h = f[y];
          if (!h.previous || h.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Wi(e) {
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
      let o = i.length, l = -1, a = 0, s;
      for (; o--; ) {
        const u = i[o];
        if (typeof u == "string") {
          for (l = u.length; u.charCodeAt(l - 1) === 32; )
            a++, l--;
          if (l) break;
          l = -1;
        } else if (u === -2)
          s = !0, a++;
        else if (u !== -1) {
          o++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (a = 0), a) {
        const u = {
          type: n === e.length || s || a < 2 ? "lineSuffix" : "hardBreakTrailing",
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
          ...u.start
        }, r.start.offset === r.end.offset ? Object.assign(r, u) : (e.splice(n, 0, ["enter", u, t], ["exit", u, t]), n += 2);
      }
      n++;
    }
  return e;
}
const ps = {
  42: je,
  43: je,
  45: je,
  48: je,
  49: je,
  50: je,
  51: je,
  52: je,
  53: je,
  54: je,
  55: je,
  56: je,
  57: je,
  62: Oi
}, hs = {
  91: ga
}, fs = {
  [-2]: _n,
  [-1]: _n,
  32: _n
}, ds = {
  35: ba,
  42: an,
  45: [Br, an],
  60: Ta,
  61: Br,
  95: an,
  96: Fr,
  126: Fr
}, ms = {
  38: Fi,
  92: zi
}, gs = {
  [-5]: Sn,
  [-4]: Sn,
  [-3]: Sn,
  33: Wa,
  38: Fi,
  42: Zn,
  60: [Zl, Ra],
  91: Za,
  92: [xa, zi],
  93: ur,
  95: Zn,
  96: oa
}, ys = {
  null: [Zn, as]
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
  flow: ds,
  flowInitial: fs,
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
  const s = {
    attempt: F(V),
    check: F(w),
    consume: I,
    enter: T,
    exit: P,
    interrupt: F(w, {
      interrupt: !0
    })
  }, u = {
    code: null,
    containerState: {},
    defineSkip: k,
    events: [],
    now: x,
    parser: e,
    previous: null,
    sliceSerialize: y,
    sliceStream: h,
    write: f
  };
  let c = t.tokenize.call(u, s);
  return t.resolveAll && o.push(t), u;
  function f(A) {
    return l = Qe(l, A), M(), l[l.length - 1] !== null ? [] : (Q(t, 0), u.events = sr(o, u.events, u), u.events);
  }
  function y(A, D) {
    return _s(h(A), D);
  }
  function h(A) {
    return bs(l, A);
  }
  function x() {
    const {
      _bufferIndex: A,
      _index: D,
      line: J,
      column: ne,
      offset: $
    } = r;
    return {
      _bufferIndex: A,
      _index: D,
      line: J,
      column: ne,
      offset: $
    };
  }
  function k(A) {
    i[A.line] = A.column, ee();
  }
  function M() {
    let A;
    for (; r._index < l.length; ) {
      const D = l[r._index];
      if (typeof D == "string")
        for (A = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === A && r._bufferIndex < D.length; )
          b(D.charCodeAt(r._bufferIndex));
      else
        b(D);
    }
  }
  function b(A) {
    c = c(A);
  }
  function I(A) {
    B(A) ? (r.line++, r.column = 1, r.offset += A === -3 ? 2 : 1, ee()) : A !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = A;
  }
  function T(A, D) {
    const J = D || {};
    return J.type = A, J.start = x(), u.events.push(["enter", J, u]), a.push(J), J;
  }
  function P(A) {
    const D = a.pop();
    return D.end = x(), u.events.push(["exit", D, u]), D;
  }
  function V(A, D) {
    Q(A, D.from);
  }
  function w(A, D) {
    D.restore();
  }
  function F(A, D) {
    return J;
    function J(ne, $, he) {
      let ce, be, De, m;
      return Array.isArray(ne) ? (
        /* c8 ignore next 1 */
        Pe(ne)
      ) : "tokenize" in ne ? (
        // Looks like a construct.
        Pe([
          /** @type {Construct} */
          ne
        ])
      ) : q(ne);
      function q(te) {
        return ve;
        function ve(ge) {
          const tt = ge !== null && te[ge], $e = ge !== null && te.null, Xe = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(tt) ? tt : tt ? [tt] : [],
            ...Array.isArray($e) ? $e : $e ? [$e] : []
          ];
          return Pe(Xe)(ge);
        }
      }
      function Pe(te) {
        return ce = te, be = 0, te.length === 0 ? he : d(te[be]);
      }
      function d(te) {
        return ve;
        function ve(ge) {
          return m = O(), De = te, te.partial || (u.currentConstruct = te), te.name && u.parser.constructs.disable.null.includes(te.name) ? Y() : te.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            D ? Object.assign(Object.create(u), D) : u,
            s,
            ye,
            Y
          )(ge);
        }
      }
      function ye(te) {
        return A(De, m), $;
      }
      function Y(te) {
        return m.restore(), ++be < ce.length ? d(ce[be]) : he;
      }
    }
  }
  function Q(A, D) {
    A.resolveAll && !o.includes(A) && o.push(A), A.resolve && mt(u.events, D, u.events.length - D, A.resolve(u.events.slice(D), u)), A.resolveTo && (u.events = A.resolveTo(u.events, u));
  }
  function O() {
    const A = x(), D = u.previous, J = u.currentConstruct, ne = u.events.length, $ = Array.from(a);
    return {
      from: ne,
      restore: he
    };
    function he() {
      r = A, u.previous = D, u.currentConstruct = J, u.events.length = ne, a = $, ee();
    }
  }
  function ee() {
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
  for (; !Ui(e); )
    ;
  return e;
}
const Hr = /[\0\t\n\r]/g;
function Ts() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(o, l, a) {
    const s = [];
    let u, c, f, y, h;
    for (o = t + (typeof o == "string" ? o.toString() : new TextDecoder(l || void 0).decode(o)), f = 0, t = "", n && (o.charCodeAt(0) === 65279 && f++, n = void 0); f < o.length; ) {
      if (Hr.lastIndex = f, u = Hr.exec(o), y = u && u.index !== void 0 ? u.index : o.length, h = o.charCodeAt(y), !u) {
        t = o.slice(f);
        break;
      }
      if (h === 10 && f === y && r)
        s.push(-3), r = void 0;
      else
        switch (r && (s.push(-5), r = void 0), f < y && (s.push(o.slice(f, y)), e += y - f), h) {
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
      f = y + 1;
    }
    return a && (r && s.push(-5), t && s.push(t), s.push(null)), s;
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
    return Pi(n.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return ar(n) || e;
}
const $i = {}.hasOwnProperty;
function Ns(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Ls(n)(Es(Ss(n).document().write(Ts()(e, t, !0))));
}
function Ls(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: o(gt),
      autolinkProtocol: O,
      autolinkEmail: O,
      atxHeading: o(Ie),
      blockQuote: o($e),
      characterEscape: O,
      characterReference: O,
      codeFenced: o(Xe),
      codeFencedFenceInfo: l,
      codeFencedFenceMeta: l,
      codeIndented: o(Xe, l),
      codeText: o(Oe, l),
      codeTextData: O,
      data: O,
      codeFlowValue: O,
      definition: o(lt),
      definitionDestinationString: l,
      definitionLabelString: l,
      definitionTitleString: l,
      emphasis: o(ze),
      hardBreakEscape: o(Fe),
      hardBreakTrailing: o(Fe),
      htmlFlow: o(xt, l),
      htmlFlowData: O,
      htmlText: o(xt, l),
      htmlTextData: O,
      image: o(at),
      label: l,
      link: o(gt),
      listItem: o(st),
      listItemValue: y,
      listOrdered: o(yt, f),
      listUnordered: o(yt),
      paragraph: o(nt),
      reference: d,
      referenceString: l,
      resourceDestinationString: l,
      resourceTitleString: l,
      setextHeading: o(Ie),
      strong: o(At),
      thematicBreak: o(ut)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: V,
      autolink: s(),
      autolinkEmail: tt,
      autolinkProtocol: ge,
      blockQuote: s(),
      characterEscapeValue: ee,
      characterReferenceMarkerHexadecimal: Y,
      characterReferenceMarkerNumeric: Y,
      characterReferenceValue: te,
      characterReference: ve,
      codeFenced: s(M),
      codeFencedFence: k,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: x,
      codeFlowValue: ee,
      codeIndented: s(b),
      codeText: s($),
      codeTextData: ee,
      data: ee,
      definition: s(),
      definitionDestinationString: P,
      definitionLabelString: I,
      definitionTitleString: T,
      emphasis: s(),
      hardBreakEscape: s(D),
      hardBreakTrailing: s(D),
      htmlFlow: s(J),
      htmlFlowData: ee,
      htmlText: s(ne),
      htmlTextData: ee,
      image: s(ce),
      label: De,
      labelText: be,
      lineEnding: A,
      link: s(he),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: ye,
      resourceDestinationString: m,
      resourceTitleString: q,
      resource: Pe,
      setextHeading: s(Q),
      setextHeadingLineSequence: F,
      setextHeadingText: w,
      strong: s(),
      thematicBreak: s()
    }
  };
  Zi(t, (e || {}).mdastExtensions || []);
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
      exit: u,
      buffer: l,
      resume: c,
      data: n
    }, j = [];
    let X = -1;
    for (; ++X < C.length; )
      if (C[X][1].type === "listOrdered" || C[X][1].type === "listUnordered")
        if (C[X][0] === "enter")
          j.push(X);
        else {
          const Ce = j.pop();
          X = i(C, Ce, X);
        }
    for (X = -1; ++X < C.length; ) {
      const Ce = t[C[X][0]];
      $i.call(Ce, C[X][1].type) && Ce[C[X][1].type].call(Object.assign({
        sliceSerialize: C[X][2].sliceSerialize
      }, U), C[X][1]);
    }
    if (U.tokenStack.length > 0) {
      const Ce = U.tokenStack[U.tokenStack.length - 1];
      (Ce[1] || jr).call(U, void 0, Ce[0]);
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
    }, X = -1; ++X < t.transforms.length; )
      E = t.transforms[X](E) || E;
    return E;
  }
  function i(C, E, U) {
    let j = E - 1, X = -1, Ce = !1, Je, me, Ze, we;
    for (; ++j <= U; ) {
      const pe = C[j];
      switch (pe[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          pe[0] === "enter" ? X++ : X--, we = void 0;
          break;
        }
        case "lineEndingBlank": {
          pe[0] === "enter" && (Je && !we && !X && !Ze && (Ze = j), we = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          we = void 0;
      }
      if (!X && pe[0] === "enter" && pe[1].type === "listItemPrefix" || X === -1 && pe[0] === "exit" && (pe[1].type === "listUnordered" || pe[1].type === "listOrdered")) {
        if (Je) {
          let Ke = j;
          for (me = void 0; Ke--; ) {
            const Ae = C[Ke];
            if (Ae[1].type === "lineEnding" || Ae[1].type === "lineEndingBlank") {
              if (Ae[0] === "exit") continue;
              me && (C[me][1].type = "lineEndingBlank", Ce = !0), Ae[1].type = "lineEnding", me = Ke;
            } else if (!(Ae[1].type === "linePrefix" || Ae[1].type === "blockQuotePrefix" || Ae[1].type === "blockQuotePrefixWhitespace" || Ae[1].type === "blockQuoteMarker" || Ae[1].type === "listItemIndent")) break;
          }
          Ze && (!me || Ze < me) && (Je._spread = !0), Je.end = Object.assign({}, me ? C[me][1].start : pe[1].end), C.splice(me || j, 0, ["exit", Je, pe[2]]), j++, U++;
        }
        if (pe[1].type === "listItemPrefix") {
          const Ke = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, pe[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Je = Ke, C.splice(j, 0, ["enter", Ke, pe[2]]), j++, U++, Ze = void 0, we = !0;
        }
      }
    }
    return C[E][1]._spread = Ce, U;
  }
  function o(C, E) {
    return U;
    function U(j) {
      a.call(this, C(j), j), E && E.call(this, j);
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
  function s(C) {
    return E;
    function E(U) {
      C && C.call(this, U), u.call(this, U);
    }
  }
  function u(C, E) {
    const U = this.stack.pop(), j = this.tokenStack.pop();
    if (j)
      j[0].type !== C.type && (E ? E.call(this, C, j[0]) : (j[1] || jr).call(this, C, j[0]));
    else throw new Error("Cannot close `" + C.type + "` (" + Zt({
      start: C.start,
      end: C.end
    }) + "): it’s not open");
    U.position.end = _t(C.end);
  }
  function c() {
    return Al(this.stack.pop());
  }
  function f() {
    this.data.expectingFirstListItemValue = !0;
  }
  function y(C) {
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
  function M() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = C.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function b() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = C.replace(/(\r?\n|\r)$/g, "");
  }
  function I(C) {
    const E = this.resume(), U = this.stack[this.stack.length - 1];
    U.label = E, U.identifier = Pt(this.sliceSerialize(C)).toLowerCase();
  }
  function T() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = C;
  }
  function P() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = C;
  }
  function V(C) {
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
  function Q() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function O(C) {
    const U = this.stack[this.stack.length - 1].children;
    let j = U[U.length - 1];
    (!j || j.type !== "text") && (j = kt(), j.position = {
      start: _t(C.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, U.push(j)), this.stack.push(j);
  }
  function ee(C) {
    const E = this.stack.pop();
    E.value += this.sliceSerialize(C), E.position.end = _t(C.end);
  }
  function A(C) {
    const E = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const U = E.children[E.children.length - 1];
      U.position.end = _t(C.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(E.type) && (O.call(this, C), ee.call(this, C));
  }
  function D() {
    this.data.atHardBreak = !0;
  }
  function J() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = C;
  }
  function ne() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = C;
  }
  function $() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = C;
  }
  function he() {
    const C = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      C.type += "Reference", C.referenceType = E, delete C.url, delete C.title;
    } else
      delete C.identifier, delete C.label;
    this.data.referenceType = void 0;
  }
  function ce() {
    const C = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      C.type += "Reference", C.referenceType = E, delete C.url, delete C.title;
    } else
      delete C.identifier, delete C.label;
    this.data.referenceType = void 0;
  }
  function be(C) {
    const E = this.sliceSerialize(C), U = this.stack[this.stack.length - 2];
    U.label = Is(E), U.identifier = Pt(E).toLowerCase();
  }
  function De() {
    const C = this.stack[this.stack.length - 1], E = this.resume(), U = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, U.type === "link") {
      const j = C.children;
      U.children = j;
    } else
      U.alt = E;
  }
  function m() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = C;
  }
  function q() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = C;
  }
  function Pe() {
    this.data.inReference = void 0;
  }
  function d() {
    this.data.referenceType = "collapsed";
  }
  function ye(C) {
    const E = this.resume(), U = this.stack[this.stack.length - 1];
    U.label = E, U.identifier = Pt(this.sliceSerialize(C)).toLowerCase(), this.data.referenceType = "full";
  }
  function Y(C) {
    this.data.characterReferenceType = C.type;
  }
  function te(C) {
    const E = this.sliceSerialize(C), U = this.data.characterReferenceType;
    let j;
    U ? (j = Pi(E, U === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : j = ar(E);
    const X = this.stack[this.stack.length - 1];
    X.value += j;
  }
  function ve(C) {
    const E = this.stack.pop();
    E.position.end = _t(C.end);
  }
  function ge(C) {
    ee.call(this, C);
    const E = this.stack[this.stack.length - 1];
    E.url = this.sliceSerialize(C);
  }
  function tt(C) {
    ee.call(this, C);
    const E = this.stack[this.stack.length - 1];
    E.url = "mailto:" + this.sliceSerialize(C);
  }
  function $e() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function Xe() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Oe() {
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
  function ze() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Ie() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Fe() {
    return {
      type: "break"
    };
  }
  function xt() {
    return {
      type: "html",
      value: ""
    };
  }
  function at() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function gt() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function yt(C) {
    return {
      type: "list",
      ordered: C.type === "listOrdered",
      start: null,
      spread: C._spread,
      children: []
    };
  }
  function st(C) {
    return {
      type: "listItem",
      spread: C._spread,
      checked: null,
      children: []
    };
  }
  function nt() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function At() {
    return {
      type: "strong",
      children: []
    };
  }
  function kt() {
    return {
      type: "text",
      value: ""
    };
  }
  function ut() {
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
function Zi(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Zi(e, r) : Ms(e, r);
  }
}
function Ms(e, t) {
  let n;
  for (n in t)
    if ($i.call(t, n))
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
function jr(e, t) {
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
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = zt(r.toLowerCase()), o = e.footnoteOrder.indexOf(r);
  let l, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), l = e.footnoteOrder.length) : l = o + 1, a += 1, e.footnoteCounts.set(r, a);
  const s = {
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
  e.patch(t, s);
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [s]
  };
  return e.patch(t, u), e.applyData(t, u);
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
function qi(e, t) {
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
    return qi(e, t);
  const i = { src: zt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, o), e.applyData(t, o);
}
function Vs(e, t) {
  const n = { src: zt(t.url) };
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
    return qi(e, t);
  const i = { href: zt(r.url || "") };
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
  const n = { href: zt(t.url) };
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
  const r = e.all(t), i = n ? Gs(n) : Gi(t), o = {}, l = [];
  if (typeof t.checked == "boolean") {
    const c = r[0];
    let f;
    c && c.type === "element" && c.tagName === "p" ? f = c : (f = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(f)), f.children.length > 0 && f.children.unshift({ type: "text", value: " " }), f.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), o.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const c = r[a];
    (i || a !== 0 || c.type !== "element" || c.tagName !== "p") && l.push({ type: "text", value: `
` }), c.type === "element" && c.tagName === "p" && !i ? l.push(...c.children) : l.push(c);
  }
  const s = r[r.length - 1];
  s && (i || s.type !== "element" || s.tagName !== "p") && l.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: o, children: l };
  return e.patch(t, u), e.applyData(t, u);
}
function Gs(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = Gi(n[r]);
  }
  return t;
}
function Gi(e) {
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
    }, a = rr(t.children[1]), s = Ii(t.children[t.children.length - 1]);
    a && s && (l.position = { start: a, end: s }), i.push(l);
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
  let s = -1;
  const u = [];
  for (; ++s < a; ) {
    const f = t.children[s], y = {}, h = l ? l[s] : void 0;
    h && (y.align = h);
    let x = { type: "element", tagName: o, properties: y, children: [] };
    f && (x.children = e.all(f), e.patch(f, x), x = e.applyData(f, x)), u.push(x);
  }
  const c = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(t, c), e.applyData(t, c);
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
const Vr = 9, Wr = 32;
function nu(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const o = [];
  for (; r; )
    o.push(
      $r(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return o.push($r(t.slice(i), i > 0, !1)), o.join("");
}
function $r(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let o = e.codePointAt(r);
    for (; o === Vr || o === Wr; )
      r++, o = e.codePointAt(r);
  }
  if (n) {
    let o = e.codePointAt(i - 1);
    for (; o === Vr || o === Wr; )
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
  toml: tn,
  yaml: tn,
  definition: tn,
  footnoteDefinition: tn
};
function tn() {
}
const Yi = -1, yn = 0, Gt = 1, hn = 2, cr = 3, pr = 4, hr = 5, fr = 6, Xi = 7, Ji = 8, Zr = typeof self == "object" ? self : globalThis, lu = (e, t) => {
  const n = (i, o) => (e.set(o, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [o, l] = t[i];
    switch (o) {
      case yn:
      case Yi:
        return n(l, i);
      case Gt: {
        const a = n([], i);
        for (const s of l)
          a.push(r(s));
        return a;
      }
      case hn: {
        const a = n({}, i);
        for (const [s, u] of l)
          a[r(s)] = r(u);
        return a;
      }
      case cr:
        return n(new Date(l), i);
      case pr: {
        const { source: a, flags: s } = l;
        return n(new RegExp(a, s), i);
      }
      case hr: {
        const a = n(/* @__PURE__ */ new Map(), i);
        for (const [s, u] of l)
          a.set(r(s), r(u));
        return a;
      }
      case fr: {
        const a = n(/* @__PURE__ */ new Set(), i);
        for (const s of l)
          a.add(r(s));
        return a;
      }
      case Xi: {
        const { name: a, message: s } = l;
        return n(new Zr[a](s), i);
      }
      case Ji:
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
    return n(new Zr[o](l), i);
  };
  return r;
}, qr = (e) => lu(/* @__PURE__ */ new Map(), e)(0), Rt = "", { toString: au } = {}, { keys: su } = Object, Bt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [yn, t];
  const n = au.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [Gt, Rt];
    case "Object":
      return [hn, Rt];
    case "Date":
      return [cr, Rt];
    case "RegExp":
      return [pr, Rt];
    case "Map":
      return [hr, Rt];
    case "Set":
      return [fr, Rt];
    case "DataView":
      return [Gt, n];
  }
  return n.includes("Array") ? [Gt, n] : n.includes("Error") ? [Xi, n] : [hn, n];
}, nn = ([e, t]) => e === yn && (t === "function" || t === "symbol"), uu = (e, t, n, r) => {
  const i = (l, a) => {
    const s = r.push(l) - 1;
    return n.set(a, s), s;
  }, o = (l) => {
    if (n.has(l))
      return n.get(l);
    let [a, s] = Bt(l);
    switch (a) {
      case yn: {
        let c = l;
        switch (s) {
          case "bigint":
            a = Ji, c = l.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            c = null;
            break;
          case "undefined":
            return i([Yi], l);
        }
        return i([a, c], l);
      }
      case Gt: {
        if (s) {
          let y = l;
          return s === "DataView" ? y = new Uint8Array(l.buffer) : s === "ArrayBuffer" && (y = new Uint8Array(l)), i([s, [...y]], l);
        }
        const c = [], f = i([a, c], l);
        for (const y of l)
          c.push(o(y));
        return f;
      }
      case hn: {
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
          return o(l.toJSON());
        const c = [], f = i([a, c], l);
        for (const y of su(l))
          (e || !nn(Bt(l[y]))) && c.push([o(y), o(l[y])]);
        return f;
      }
      case cr:
        return i([a, l.toISOString()], l);
      case pr: {
        const { source: c, flags: f } = l;
        return i([a, { source: c, flags: f }], l);
      }
      case hr: {
        const c = [], f = i([a, c], l);
        for (const [y, h] of l)
          (e || !(nn(Bt(y)) || nn(Bt(h)))) && c.push([o(y), o(h)]);
        return f;
      }
      case fr: {
        const c = [], f = i([a, c], l);
        for (const y of l)
          (e || !nn(Bt(y))) && c.push(o(y));
        return f;
      }
    }
    const { message: u } = l;
    return i([a, { name: s, message: u }], l);
  };
  return o;
}, Gr = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return uu(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, fn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? qr(Gr(e, t)) : structuredClone(e)
) : (e, t) => qr(Gr(e, t));
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
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!u)
      continue;
    const c = e.all(u), f = String(u.identifier).toUpperCase(), y = zt(f.toLowerCase());
    let h = 0;
    const x = [], k = e.footnoteCounts.get(f);
    for (; k !== void 0 && ++h <= k; ) {
      x.length > 0 && x.push({ type: "text", value: " " });
      let I = typeof n == "string" ? n : n(s, h);
      typeof I == "string" && (I = { type: "text", value: I }), x.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + y + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(I) ? I : [I]
      });
    }
    const M = c[c.length - 1];
    if (M && M.type === "element" && M.tagName === "p") {
      const I = M.children[M.children.length - 1];
      I && I.type === "text" ? I.value += " " : M.children.push({ type: "text", value: " " }), M.children.push(...x);
    } else
      c.push(...x);
    const b = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + y },
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
const Ki = (
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
      return Cn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? fu(e) : du(e);
    if (typeof e == "string")
      return mu(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function fu(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Ki(e[n]);
  return Cn(r);
  function r(...i) {
    let o = -1;
    for (; ++o < t.length; )
      if (t[o].apply(this, i)) return !0;
    return !1;
  }
}
function du(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Cn(n);
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
  return Cn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Cn(e) {
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
const Qi = [], Cu = !0, Yr = !1, wu = "skip";
function xu(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const o = Ki(i), l = r ? -1 : 1;
  a(e, void 0, [])();
  function a(s, u, c) {
    const f = (
      /** @type {Record<string, unknown>} */
      s && typeof s == "object" ? s : {}
    );
    if (typeof f.type == "string") {
      const h = (
        // `hast`
        typeof f.tagName == "string" ? f.tagName : (
          // `xast`
          typeof f.name == "string" ? f.name : void 0
        )
      );
      Object.defineProperty(y, "name", {
        value: "node (" + (s.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return y;
    function y() {
      let h = Qi, x, k, M;
      if ((!t || o(s, u, c[c.length - 1] || void 0)) && (h = ku(n(s, c)), h[0] === Yr))
        return h;
      if ("children" in s && s.children) {
        const b = (
          /** @type {UnistParent} */
          s
        );
        if (b.children && h[0] !== wu)
          for (k = (r ? b.children.length : -1) + l, M = c.concat(b); k > -1 && k < b.children.length; ) {
            const I = b.children[k];
            if (x = a(I, k, M)(), x[0] === Yr)
              return x;
            k = typeof x[1] == "number" ? x[1] : k + l;
          }
      }
      return h;
    }
  }
}
function ku(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Cu, e] : e == null ? Qi : [e];
}
function eo(e, t, n, r) {
  let i, o, l;
  typeof t == "function" && typeof n != "function" ? (o = void 0, l = t, i = n) : (o = t, l = n, i = r), xu(e, o, a, i);
  function a(s, u) {
    const c = u[u.length - 1], f = c ? c.children.indexOf(s) : void 0;
    return l(s, f, c);
  }
}
const qn = {}.hasOwnProperty, bu = {};
function _u(e, t) {
  const n = t || bu, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), l = { ...ou, ...n.handlers }, a = {
    all: u,
    applyData: Eu,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: o,
    footnoteOrder: [],
    handlers: l,
    one: s,
    options: n,
    patch: Su,
    wrap: vu
  };
  return eo(e, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const f = c.type === "definition" ? r : i, y = String(c.identifier).toUpperCase();
      f.has(y) || f.set(y, c);
    }
  }), a;
  function s(c, f) {
    const y = c.type, h = a.handlers[y];
    if (qn.call(a.handlers, y) && h)
      return h(a, c, f);
    if (a.options.passThrough && a.options.passThrough.includes(y)) {
      if ("children" in c) {
        const { children: k, ...M } = c, b = fn(M);
        return b.children = a.all(c), b;
      }
      return fn(c);
    }
    return (a.options.unknownHandler || Tu)(a, c, f);
  }
  function u(c) {
    const f = [];
    if ("children" in c) {
      const y = c.children;
      let h = -1;
      for (; ++h < y.length; ) {
        const x = a.one(y[h], c);
        if (x) {
          if (h && y[h - 1].type === "break" && (!Array.isArray(x) && x.type === "text" && (x.value = Xr(x.value)), !Array.isArray(x) && x.type === "element")) {
            const k = x.children[0];
            k && k.type === "text" && (k.value = Xr(k.value));
          }
          Array.isArray(x) ? f.push(...x) : f.push(x);
        }
      }
    }
    return f;
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
  const n = t.data || {}, r = "value" in t && !(qn.call(n, "hProperties") || qn.call(n, "hChildren")) ? { type: "text", value: t.value } : {
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
function Xr(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function Jr(e, t) {
  const n = _u(e, t), r = n.one(e, void 0), i = hu(n), o = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && o.children.push({ type: "text", value: `
` }, i), o;
}
function Iu(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      Jr(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      Jr(n, { file: r, ...e || t })
    );
  };
}
function Kr(e) {
  if (e)
    throw e;
}
var sn = Object.prototype.hasOwnProperty, to = Object.prototype.toString, Qr = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, ti = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : to.call(t) === "[object Array]";
}, ni = function(t) {
  if (!t || to.call(t) !== "[object Object]")
    return !1;
  var n = sn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && sn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || sn.call(t, i);
}, ri = function(t, n) {
  Qr && n.name === "__proto__" ? Qr(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, ii = function(t, n) {
  if (n === "__proto__")
    if (sn.call(t, n)) {
      if (ei)
        return ei(t, n).value;
    } else return;
  return t[n];
}, Au = function e() {
  var t, n, r, i, o, l, a = arguments[0], s = 1, u = arguments.length, c = !1;
  for (typeof a == "boolean" && (c = a, a = arguments[1] || {}, s = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); s < u; ++s)
    if (t = arguments[s], t != null)
      for (n in t)
        r = ii(a, n), i = ii(t, n), a !== i && (c && i && (ni(i) || (o = ti(i))) ? (o ? (o = !1, l = r && ti(r) ? r : []) : l = r && ni(r) ? r : {}, ri(a, { name: n, newValue: e(c, l, i) })) : typeof i < "u" && ri(a, { name: n, newValue: i }));
  return a;
};
const En = /* @__PURE__ */ vi(Au);
function Gn(e) {
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
    function a(s, ...u) {
      const c = e[++o];
      let f = -1;
      if (s) {
        l(s);
        return;
      }
      for (; ++f < i.length; )
        (u[f] === null || u[f] === void 0) && (u[f] = i[f]);
      i = u, c ? Lu(c, a)(...u) : l(null, ...u);
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
    let s;
    a && l.push(i);
    try {
      s = e.apply(this, l);
    } catch (u) {
      const c = (
        /** @type {Error} */
        u
      );
      if (a && n)
        throw c;
      return i(c);
    }
    a || (s && s.then && typeof s.then == "function" ? s.then(o, i) : s instanceof Error ? i(s) : o(s));
  }
  function i(l, ...a) {
    n || (n = !0, t(l, ...a));
  }
  function o(l) {
    i(null, l);
  }
}
const ht = { basename: Mu, dirname: Ru, extname: Du, join: Pu, sep: "/" };
function Mu(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  Jt(e);
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
function Du(e) {
  Jt(e);
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
    Jt(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : Ou(n);
}
function Ou(e) {
  Jt(e);
  const t = e.codePointAt(0) === 47;
  let n = zu(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function zu(e, t) {
  let n = "", r = 0, i = -1, o = 0, l = -1, a, s;
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
            if (s = n.lastIndexOf("/"), s !== n.length - 1) {
              s < 0 ? (n = "", r = 0) : (n = n.slice(0, s), r = n.length - 1 - n.lastIndexOf("/")), i = l, o = 0;
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
function Jt(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const Fu = { cwd: Uu };
function Uu() {
  return "/";
}
function Yn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Bu(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Yn(e)) {
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
const Tn = (
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
class no {
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
    t ? Yn(t) ? n = { path: t } : typeof t == "string" || ju(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : Fu.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Tn.length; ) {
      const o = Tn[r];
      o in n && n[o] !== void 0 && n[o] !== null && (this[o] = o === "history" ? [...n[o]] : n[o]);
    }
    let i;
    for (i in n)
      Tn.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? ht.basename(this.path) : void 0;
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
    In(t, "basename"), vn(t, "basename"), this.path = ht.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? ht.dirname(this.path) : void 0;
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
    oi(this.basename, "dirname"), this.path = ht.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? ht.extname(this.path) : void 0;
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
    if (vn(t, "extname"), oi(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ht.join(this.dirname, this.stem + (t || ""));
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
    Yn(t) && (t = Bu(t)), In(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? ht.basename(this.path, this.extname) : void 0;
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
    In(t, "stem"), vn(t, "stem"), this.path = ht.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new Te(
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
function vn(e, t) {
  if (e && e.includes(ht.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ht.sep + "`"
    );
}
function In(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function oi(e, t) {
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
class dr extends Vu {
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
      new dr()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(En(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (Ln("data", this.frozen), this.namespace[t] = n, this) : Wu.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Ln("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = rn(t), r = this.parser || this.Parser;
    return An("parse", r), r(String(n), n);
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
    return this.freeze(), An("process", this.parser || this.Parser), Nn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(o, l) {
      const a = rn(t), s = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(s, a, function(c, f, y) {
        if (c || !f || !y)
          return u(c);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          f
        ), x = r.stringify(h, y);
        qu(x) ? y.value = x : y.result = x, u(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          y
        );
      });
      function u(c, f) {
        c || !f ? l(c) : o ? o(f) : n(void 0, f);
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
    return this.freeze(), An("processSync", this.parser || this.Parser), Nn("processSync", this.compiler || this.Compiler), this.process(t, i), ai("processSync", "process", n), r;
    function i(o, l) {
      n = !0, Kr(o), r = l;
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
    li(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? o(void 0, r) : new Promise(o);
    function o(l, a) {
      const s = rn(n);
      i.run(t, s, u);
      function u(c, f, y) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          f || t
        );
        c ? a(c) : l ? l(h) : r(void 0, h, y);
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
    return this.run(t, n, o), ai("runSync", "run", r), i;
    function o(l, a) {
      Kr(l), i = a, r = !0;
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
    const r = rn(n), i = this.compiler || this.Compiler;
    return Nn("stringify", i), li(t), i(t, r);
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
    if (Ln("use", this.frozen), t != null) if (typeof t == "function")
      s(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? a(t) : l(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function o(u) {
      if (typeof u == "function")
        s(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [c, ...f] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          s(c, f);
        } else
          l(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function l(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(u.plugins), u.settings && (i.settings = En(!0, i.settings, u.settings));
    }
    function a(u) {
      let c = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++c < u.length; ) {
          const f = u[c];
          o(f);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function s(u, c) {
      let f = -1, y = -1;
      for (; ++f < r.length; )
        if (r[f][0] === u) {
          y = f;
          break;
        }
      if (y === -1)
        r.push([u, ...c]);
      else if (c.length > 0) {
        let [h, ...x] = c;
        const k = r[y][1];
        Gn(k) && Gn(h) && (h = En(!0, k, h)), r[y] = [u, h, ...x];
      }
    }
  }
}
const $u = new dr().freeze();
function An(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Nn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Ln(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function li(e) {
  if (!Gn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function ai(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function rn(e) {
  return Zu(e) ? e : new no(e);
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
const Yu = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", si = [], ui = { allowDangerousHtml: !0 }, Xu = /^(https?|ircs?|mailto|xmpp)$/i, Ju = [
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
function dn(e) {
  const t = Ku(e), n = Qu(e);
  return ec(t.runSync(t.parse(n), n), e);
}
function Ku(e) {
  const t = e.rehypePlugins || si, n = e.remarkPlugins || si, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...ui } : ui;
  return $u().use(Rs).use(n).use(Iu, r).use(t);
}
function Qu(e) {
  const t = e.children || "", n = new no();
  return typeof t == "string" && (n.value = t), n;
}
function ec(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, o = t.disallowedElements, l = t.skipHtml, a = t.unwrapDisallowed, s = t.urlTransform || tc;
  for (const c of Ju)
    Object.hasOwn(t, c.from) && ("" + c.from + (c.to ? "use `" + c.to + "` instead" : "remove it") + Yu + c.id, void 0);
  return eo(e, u), hl(e, {
    Fragment: Fn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: p,
    jsxs: L,
    passKeys: !0,
    passNode: !0
  });
  function u(c, f, y) {
    if (c.type === "raw" && y && typeof f == "number")
      return l ? y.children.splice(f, 1) : y.children[f] = { type: "text", value: c.value }, f;
    if (c.type === "element") {
      let h;
      for (h in bn)
        if (Object.hasOwn(bn, h) && Object.hasOwn(c.properties, h)) {
          const x = c.properties[h], k = bn[h];
          (k === null || k.includes(c.tagName)) && (c.properties[h] = s(String(x || ""), h, c));
        }
    }
    if (c.type === "element") {
      let h = n ? !n.includes(c.tagName) : o ? o.includes(c.tagName) : !1;
      if (!h && r && typeof f == "number" && (h = !r(c, f, y)), h && y && typeof f == "number")
        return a && c.children ? y.children.splice(f, 1, ...c.children) : y.children.splice(f, 1), f;
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
const ot = (...e) => e.filter(Boolean).join(" "), nc = () => /* @__PURE__ */ L(
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
), rc = ({ className: e, ...t }) => /* @__PURE__ */ p("form", { className: ot("chat-wrapper__prompt-input", e), ...t }), ro = wi(
  ({
    onChange: e,
    className: t,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: o,
    ...l
  }, a) => {
    const s = (u) => {
      if (u.key === "Enter") {
        if (u.shiftKey)
          return;
        u.preventDefault();
        const c = u.currentTarget.form;
        if (c) {
          const f = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          c.dispatchEvent(f);
        }
      }
      o == null || o(u);
    };
    return /* @__PURE__ */ p(
      "textarea",
      {
        ref: a,
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
ro.displayName = "PromptInputTextarea";
const ic = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p("div", { className: ot("chat-wrapper__prompt-toolbar", e), ...t }), oc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p("div", { className: ot("chat-wrapper__prompt-tools", e), ...t }), lc = ({
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
      className: ot(
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
  const s = o || r === "submitted" || r === "streaming";
  return /* @__PURE__ */ p(
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
      children: i ?? a
    }
  );
}, Yc = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ p("select", { className: ot("chat-wrapper__prompt-select", e), ...n, children: t }), Xc = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ p(
  "button",
  {
    className: ot("chat-wrapper__prompt-select-trigger", e),
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
    className: ot("chat-wrapper__prompt-select-content", e),
    ...t
  }
), Kc = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ p(
  "div",
  {
    className: ot("chat-wrapper__prompt-select-item", e),
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
    className: ot("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
);
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: io,
  setPrototypeOf: ci,
  isFrozen: sc,
  getPrototypeOf: uc,
  getOwnPropertyDescriptor: cc
} = Object;
let {
  freeze: Me,
  seal: et,
  create: Xn
} = Object, {
  apply: Jn,
  construct: Kn
} = typeof Reflect < "u" && Reflect;
Me || (Me = function(t) {
  return t;
});
et || (et = function(t) {
  return t;
});
Jn || (Jn = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++)
    i[o - 2] = arguments[o];
  return t.apply(n, i);
});
Kn || (Kn = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const on = Re(Array.prototype.forEach), pc = Re(Array.prototype.lastIndexOf), pi = Re(Array.prototype.pop), Ht = Re(Array.prototype.push), hc = Re(Array.prototype.splice), un = Re(String.prototype.toLowerCase), Mn = Re(String.prototype.toString), Rn = Re(String.prototype.match), jt = Re(String.prototype.replace), fc = Re(String.prototype.indexOf), dc = Re(String.prototype.trim), it = Re(Object.prototype.hasOwnProperty), Le = Re(RegExp.prototype.test), Vt = mc(TypeError);
function Re(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Jn(e, t, r);
  };
}
function mc(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return Kn(e, n);
  };
}
function W(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : un;
  ci && ci(e, null);
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
    it(e, t) || (e[t] = null);
  return e;
}
function wt(e) {
  const t = Xn(null);
  for (const [n, r] of io(e))
    it(e, n) && (Array.isArray(r) ? t[n] = gc(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = wt(r) : t[n] = r);
  return t;
}
function Wt(e, t) {
  for (; e !== null; ) {
    const r = cc(e, t);
    if (r) {
      if (r.get)
        return Re(r.get);
      if (typeof r.value == "function")
        return Re(r.value);
    }
    e = uc(e);
  }
  function n() {
    return null;
  }
  return n;
}
const hi = Me(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Dn = Me(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Pn = Me(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), yc = Me(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), On = Me(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Cc = Me(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), fi = Me(["#text"]), di = Me(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), zn = Me(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), mi = Me(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), ln = Me(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), wc = et(/\{\{[\w\W]*|[\w\W]*\}\}/gm), xc = et(/<%[\w\W]*|[\w\W]*%>/gm), kc = et(/\$\{[\w\W]*/gm), bc = et(/^data-[\-\w.\u00B7-\uFFFF]+$/), _c = et(/^aria-[\-\w]+$/), oo = et(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Sc = et(/^(?:\w+script|data):/i), Ec = et(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), lo = et(/^html$/i), Tc = et(/^[a-z][.\w]*(-[.\w]+)+$/i);
var gi = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: _c,
  ATTR_WHITESPACE: Ec,
  CUSTOM_ELEMENT: Tc,
  DATA_ATTR: bc,
  DOCTYPE_NAME: lo,
  ERB_EXPR: xc,
  IS_ALLOWED_URI: oo,
  IS_SCRIPT_OR_DATA: Sc,
  MUSTACHE_EXPR: wc,
  TMPLIT_EXPR: kc
});
const $t = {
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
}, yi = function() {
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
function ao() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vc();
  const t = (z) => ao(z);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== $t.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: o,
    HTMLTemplateElement: l,
    Node: a,
    Element: s,
    NodeFilter: u,
    NamedNodeMap: c = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: f,
    DOMParser: y,
    trustedTypes: h
  } = e, x = s.prototype, k = Wt(x, "cloneNode"), M = Wt(x, "remove"), b = Wt(x, "nextSibling"), I = Wt(x, "childNodes"), T = Wt(x, "parentNode");
  if (typeof l == "function") {
    const z = n.createElement("template");
    z.content && z.content.ownerDocument && (n = z.content.ownerDocument);
  }
  let P, V = "";
  const {
    implementation: w,
    createNodeIterator: F,
    createDocumentFragment: Q,
    getElementsByTagName: O
  } = n, {
    importNode: ee
  } = r;
  let A = yi();
  t.isSupported = typeof io == "function" && typeof T == "function" && w && w.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: D,
    ERB_EXPR: J,
    TMPLIT_EXPR: ne,
    DATA_ATTR: $,
    ARIA_ATTR: he,
    IS_SCRIPT_OR_DATA: ce,
    ATTR_WHITESPACE: be,
    CUSTOM_ELEMENT: De
  } = gi;
  let {
    IS_ALLOWED_URI: m
  } = gi, q = null;
  const Pe = W({}, [...hi, ...Dn, ...Pn, ...On, ...fi]);
  let d = null;
  const ye = W({}, [...di, ...zn, ...mi, ...ln]);
  let Y = Object.seal(Xn(null, {
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
  })), te = null, ve = null;
  const ge = Object.seal(Xn(null, {
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
  let tt = !0, $e = !0, Xe = !1, Oe = !0, lt = !1, ze = !0, Ie = !1, Fe = !1, xt = !1, at = !1, gt = !1, yt = !1, st = !0, nt = !1;
  const At = "user-content-";
  let kt = !0, ut = !1, C = {}, E = null;
  const U = W({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let j = null;
  const X = W({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ce = null;
  const Je = W({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), me = "http://www.w3.org/1998/Math/MathML", Ze = "http://www.w3.org/2000/svg", we = "http://www.w3.org/1999/xhtml";
  let pe = we, Ke = !1, Ae = null;
  const Kt = W({}, [me, Ze, we], Mn);
  let Nt = W({}, ["mi", "mo", "mn", "ms", "mtext"]), Lt = W({}, ["annotation-xml"]);
  const wn = W({}, ["title", "style", "font", "a", "script"]);
  let Et = null;
  const Qt = ["application/xhtml+xml", "text/html"], v = "text/html";
  let N = null, G = null;
  const Z = n.createElement("form"), ae = function(g) {
    return g instanceof RegExp || g instanceof Function;
  }, xe = function() {
    let g = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(G && G === g)) {
      if ((!g || typeof g != "object") && (g = {}), g = wt(g), Et = // eslint-disable-next-line unicorn/prefer-includes
      Qt.indexOf(g.PARSER_MEDIA_TYPE) === -1 ? v : g.PARSER_MEDIA_TYPE, N = Et === "application/xhtml+xml" ? Mn : un, q = it(g, "ALLOWED_TAGS") ? W({}, g.ALLOWED_TAGS, N) : Pe, d = it(g, "ALLOWED_ATTR") ? W({}, g.ALLOWED_ATTR, N) : ye, Ae = it(g, "ALLOWED_NAMESPACES") ? W({}, g.ALLOWED_NAMESPACES, Mn) : Kt, Ce = it(g, "ADD_URI_SAFE_ATTR") ? W(wt(Je), g.ADD_URI_SAFE_ATTR, N) : Je, j = it(g, "ADD_DATA_URI_TAGS") ? W(wt(X), g.ADD_DATA_URI_TAGS, N) : X, E = it(g, "FORBID_CONTENTS") ? W({}, g.FORBID_CONTENTS, N) : U, te = it(g, "FORBID_TAGS") ? W({}, g.FORBID_TAGS, N) : wt({}), ve = it(g, "FORBID_ATTR") ? W({}, g.FORBID_ATTR, N) : wt({}), C = it(g, "USE_PROFILES") ? g.USE_PROFILES : !1, tt = g.ALLOW_ARIA_ATTR !== !1, $e = g.ALLOW_DATA_ATTR !== !1, Xe = g.ALLOW_UNKNOWN_PROTOCOLS || !1, Oe = g.ALLOW_SELF_CLOSE_IN_ATTR !== !1, lt = g.SAFE_FOR_TEMPLATES || !1, ze = g.SAFE_FOR_XML !== !1, Ie = g.WHOLE_DOCUMENT || !1, at = g.RETURN_DOM || !1, gt = g.RETURN_DOM_FRAGMENT || !1, yt = g.RETURN_TRUSTED_TYPE || !1, xt = g.FORCE_BODY || !1, st = g.SANITIZE_DOM !== !1, nt = g.SANITIZE_NAMED_PROPS || !1, kt = g.KEEP_CONTENT !== !1, ut = g.IN_PLACE || !1, m = g.ALLOWED_URI_REGEXP || oo, pe = g.NAMESPACE || we, Nt = g.MATHML_TEXT_INTEGRATION_POINTS || Nt, Lt = g.HTML_INTEGRATION_POINTS || Lt, Y = g.CUSTOM_ELEMENT_HANDLING || {}, g.CUSTOM_ELEMENT_HANDLING && ae(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (Y.tagNameCheck = g.CUSTOM_ELEMENT_HANDLING.tagNameCheck), g.CUSTOM_ELEMENT_HANDLING && ae(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (Y.attributeNameCheck = g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), g.CUSTOM_ELEMENT_HANDLING && typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (Y.allowCustomizedBuiltInElements = g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), lt && ($e = !1), gt && (at = !0), C && (q = W({}, fi), d = [], C.html === !0 && (W(q, hi), W(d, di)), C.svg === !0 && (W(q, Dn), W(d, zn), W(d, ln)), C.svgFilters === !0 && (W(q, Pn), W(d, zn), W(d, ln)), C.mathMl === !0 && (W(q, On), W(d, mi), W(d, ln))), g.ADD_TAGS && (typeof g.ADD_TAGS == "function" ? ge.tagCheck = g.ADD_TAGS : (q === Pe && (q = wt(q)), W(q, g.ADD_TAGS, N))), g.ADD_ATTR && (typeof g.ADD_ATTR == "function" ? ge.attributeCheck = g.ADD_ATTR : (d === ye && (d = wt(d)), W(d, g.ADD_ATTR, N))), g.ADD_URI_SAFE_ATTR && W(Ce, g.ADD_URI_SAFE_ATTR, N), g.FORBID_CONTENTS && (E === U && (E = wt(E)), W(E, g.FORBID_CONTENTS, N)), kt && (q["#text"] = !0), Ie && W(q, ["html", "head", "body"]), q.table && (W(q, ["tbody"]), delete te.tbody), g.TRUSTED_TYPES_POLICY) {
        if (typeof g.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Vt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof g.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Vt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        P = g.TRUSTED_TYPES_POLICY, V = P.createHTML("");
      } else
        P === void 0 && (P = Ic(h, i)), P !== null && typeof V == "string" && (V = P.createHTML(""));
      Me && Me(g), G = g;
    }
  }, Ne = W({}, [...Dn, ...Pn, ...yc]), Ue = W({}, [...On, ...Cc]), qe = function(g) {
    let S = T(g);
    (!S || !S.tagName) && (S = {
      namespaceURI: pe,
      tagName: "template"
    });
    const R = un(g.tagName), se = un(S.tagName);
    return Ae[g.namespaceURI] ? g.namespaceURI === Ze ? S.namespaceURI === we ? R === "svg" : S.namespaceURI === me ? R === "svg" && (se === "annotation-xml" || Nt[se]) : !!Ne[R] : g.namespaceURI === me ? S.namespaceURI === we ? R === "math" : S.namespaceURI === Ze ? R === "math" && Lt[se] : !!Ue[R] : g.namespaceURI === we ? S.namespaceURI === Ze && !Lt[se] || S.namespaceURI === me && !Nt[se] ? !1 : !Ue[R] && (wn[R] || !Ne[R]) : !!(Et === "application/xhtml+xml" && Ae[g.namespaceURI]) : !1;
  }, _e = function(g) {
    Ht(t.removed, {
      element: g
    });
    try {
      T(g).removeChild(g);
    } catch {
      M(g);
    }
  }, Be = function(g, S) {
    try {
      Ht(t.removed, {
        attribute: S.getAttributeNode(g),
        from: S
      });
    } catch {
      Ht(t.removed, {
        attribute: null,
        from: S
      });
    }
    if (S.removeAttribute(g), g === "is")
      if (at || gt)
        try {
          _e(S);
        } catch {
        }
      else
        try {
          S.setAttribute(g, "");
        } catch {
        }
  }, ct = function(g) {
    let S = null, R = null;
    if (xt)
      g = "<remove></remove>" + g;
    else {
      const fe = Rn(g, /^[\r\n\t ]+/);
      R = fe && fe[0];
    }
    Et === "application/xhtml+xml" && pe === we && (g = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + g + "</body></html>");
    const se = P ? P.createHTML(g) : g;
    if (pe === we)
      try {
        S = new y().parseFromString(se, Et);
      } catch {
      }
    if (!S || !S.documentElement) {
      S = w.createDocument(pe, "template", null);
      try {
        S.documentElement.innerHTML = Ke ? V : se;
      } catch {
      }
    }
    const Ee = S.body || S.documentElement;
    return g && R && Ee.insertBefore(n.createTextNode(R), Ee.childNodes[0] || null), pe === we ? O.call(S, Ie ? "html" : "body")[0] : Ie ? S.documentElement : Ee;
  }, pt = function(g) {
    return F.call(
      g.ownerDocument || g,
      g,
      // eslint-disable-next-line no-bitwise
      u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT | u.SHOW_PROCESSING_INSTRUCTION | u.SHOW_CDATA_SECTION,
      null
    );
  }, rt = function(g) {
    return g instanceof f && (typeof g.nodeName != "string" || typeof g.textContent != "string" || typeof g.removeChild != "function" || !(g.attributes instanceof c) || typeof g.removeAttribute != "function" || typeof g.setAttribute != "function" || typeof g.namespaceURI != "string" || typeof g.insertBefore != "function" || typeof g.hasChildNodes != "function");
  }, Tt = function(g) {
    return typeof a == "function" && g instanceof a;
  };
  function Se(z, g, S) {
    on(z, (R) => {
      R.call(t, g, S, G);
    });
  }
  const en = function(g) {
    let S = null;
    if (Se(A.beforeSanitizeElements, g, null), rt(g))
      return _e(g), !0;
    const R = N(g.nodeName);
    if (Se(A.uponSanitizeElement, g, {
      tagName: R,
      allowedTags: q
    }), ze && g.hasChildNodes() && !Tt(g.firstElementChild) && Le(/<[/\w!]/g, g.innerHTML) && Le(/<[/\w!]/g, g.textContent) || g.nodeType === $t.progressingInstruction || ze && g.nodeType === $t.comment && Le(/<[/\w]/g, g.data))
      return _e(g), !0;
    if (!(ge.tagCheck instanceof Function && ge.tagCheck(R)) && (!q[R] || te[R])) {
      if (!te[R] && gr(R) && (Y.tagNameCheck instanceof RegExp && Le(Y.tagNameCheck, R) || Y.tagNameCheck instanceof Function && Y.tagNameCheck(R)))
        return !1;
      if (kt && !E[R]) {
        const se = T(g) || g.parentNode, Ee = I(g) || g.childNodes;
        if (Ee && se) {
          const fe = Ee.length;
          for (let He = fe - 1; He >= 0; --He) {
            const Ct = k(Ee[He], !0);
            Ct.__removalCount = (g.__removalCount || 0) + 1, se.insertBefore(Ct, b(g));
          }
        }
      }
      return _e(g), !0;
    }
    return g instanceof s && !qe(g) || (R === "noscript" || R === "noembed" || R === "noframes") && Le(/<\/no(script|embed|frames)/i, g.innerHTML) ? (_e(g), !0) : (lt && g.nodeType === $t.text && (S = g.textContent, on([D, J, ne], (se) => {
      S = jt(S, se, " ");
    }), g.textContent !== S && (Ht(t.removed, {
      element: g.cloneNode()
    }), g.textContent = S)), Se(A.afterSanitizeElements, g, null), !1);
  }, mr = function(g, S, R) {
    if (st && (S === "id" || S === "name") && (R in n || R in Z))
      return !1;
    if (!($e && !ve[S] && Le($, S))) {
      if (!(tt && Le(he, S))) {
        if (!(ge.attributeCheck instanceof Function && ge.attributeCheck(S, g))) {
          if (!d[S] || ve[S]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(gr(g) && (Y.tagNameCheck instanceof RegExp && Le(Y.tagNameCheck, g) || Y.tagNameCheck instanceof Function && Y.tagNameCheck(g)) && (Y.attributeNameCheck instanceof RegExp && Le(Y.attributeNameCheck, S) || Y.attributeNameCheck instanceof Function && Y.attributeNameCheck(S, g)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              S === "is" && Y.allowCustomizedBuiltInElements && (Y.tagNameCheck instanceof RegExp && Le(Y.tagNameCheck, R) || Y.tagNameCheck instanceof Function && Y.tagNameCheck(R)))
            ) return !1;
          } else if (!Ce[S]) {
            if (!Le(m, jt(R, be, ""))) {
              if (!((S === "src" || S === "xlink:href" || S === "href") && g !== "script" && fc(R, "data:") === 0 && j[g])) {
                if (!(Xe && !Le(ce, jt(R, be, "")))) {
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
  }, gr = function(g) {
    return g !== "annotation-xml" && Rn(g, De);
  }, yr = function(g) {
    Se(A.beforeSanitizeAttributes, g, null);
    const {
      attributes: S
    } = g;
    if (!S || rt(g))
      return;
    const R = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: d,
      forceKeepAttr: void 0
    };
    let se = S.length;
    for (; se--; ) {
      const Ee = S[se], {
        name: fe,
        namespaceURI: He,
        value: Ct
      } = Ee, Mt = N(fe), xn = Ct;
      let ke = fe === "value" ? xn : dc(xn);
      if (R.attrName = Mt, R.attrValue = ke, R.keepAttr = !0, R.forceKeepAttr = void 0, Se(A.uponSanitizeAttribute, g, R), ke = R.attrValue, nt && (Mt === "id" || Mt === "name") && (Be(fe, g), ke = At + ke), ze && Le(/((--!?|])>)|<\/(style|title|textarea)/i, ke)) {
        Be(fe, g);
        continue;
      }
      if (Mt === "attributename" && Rn(ke, "href")) {
        Be(fe, g);
        continue;
      }
      if (R.forceKeepAttr)
        continue;
      if (!R.keepAttr) {
        Be(fe, g);
        continue;
      }
      if (!Oe && Le(/\/>/i, ke)) {
        Be(fe, g);
        continue;
      }
      lt && on([D, J, ne], (wr) => {
        ke = jt(ke, wr, " ");
      });
      const Cr = N(g.nodeName);
      if (!mr(Cr, Mt, ke)) {
        Be(fe, g);
        continue;
      }
      if (P && typeof h == "object" && typeof h.getAttributeType == "function" && !He)
        switch (h.getAttributeType(Cr, Mt)) {
          case "TrustedHTML": {
            ke = P.createHTML(ke);
            break;
          }
          case "TrustedScriptURL": {
            ke = P.createScriptURL(ke);
            break;
          }
        }
      if (ke !== xn)
        try {
          He ? g.setAttributeNS(He, fe, ke) : g.setAttribute(fe, ke), rt(g) ? _e(g) : pi(t.removed);
        } catch {
          Be(fe, g);
        }
    }
    Se(A.afterSanitizeAttributes, g, null);
  }, po = function z(g) {
    let S = null;
    const R = pt(g);
    for (Se(A.beforeSanitizeShadowDOM, g, null); S = R.nextNode(); )
      Se(A.uponSanitizeShadowNode, S, null), en(S), yr(S), S.content instanceof o && z(S.content);
    Se(A.afterSanitizeShadowDOM, g, null);
  };
  return t.sanitize = function(z) {
    let g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, S = null, R = null, se = null, Ee = null;
    if (Ke = !z, Ke && (z = "<!-->"), typeof z != "string" && !Tt(z))
      if (typeof z.toString == "function") {
        if (z = z.toString(), typeof z != "string")
          throw Vt("dirty is not a string, aborting");
      } else
        throw Vt("toString is not a function");
    if (!t.isSupported)
      return z;
    if (Fe || xe(g), t.removed = [], typeof z == "string" && (ut = !1), ut) {
      if (z.nodeName) {
        const Ct = N(z.nodeName);
        if (!q[Ct] || te[Ct])
          throw Vt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (z instanceof a)
      S = ct("<!---->"), R = S.ownerDocument.importNode(z, !0), R.nodeType === $t.element && R.nodeName === "BODY" || R.nodeName === "HTML" ? S = R : S.appendChild(R);
    else {
      if (!at && !lt && !Ie && // eslint-disable-next-line unicorn/prefer-includes
      z.indexOf("<") === -1)
        return P && yt ? P.createHTML(z) : z;
      if (S = ct(z), !S)
        return at ? null : yt ? V : "";
    }
    S && xt && _e(S.firstChild);
    const fe = pt(ut ? z : S);
    for (; se = fe.nextNode(); )
      en(se), yr(se), se.content instanceof o && po(se.content);
    if (ut)
      return z;
    if (at) {
      if (gt)
        for (Ee = Q.call(S.ownerDocument); S.firstChild; )
          Ee.appendChild(S.firstChild);
      else
        Ee = S;
      return (d.shadowroot || d.shadowrootmode) && (Ee = ee.call(r, Ee, !0)), Ee;
    }
    let He = Ie ? S.outerHTML : S.innerHTML;
    return Ie && q["!doctype"] && S.ownerDocument && S.ownerDocument.doctype && S.ownerDocument.doctype.name && Le(lo, S.ownerDocument.doctype.name) && (He = "<!DOCTYPE " + S.ownerDocument.doctype.name + `>
` + He), lt && on([D, J, ne], (Ct) => {
      He = jt(He, Ct, " ");
    }), P && yt ? P.createHTML(He) : He;
  }, t.setConfig = function() {
    let z = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    xe(z), Fe = !0;
  }, t.clearConfig = function() {
    G = null, Fe = !1;
  }, t.isValidAttribute = function(z, g, S) {
    G || xe({});
    const R = N(z), se = N(g);
    return mr(R, se, S);
  }, t.addHook = function(z, g) {
    typeof g == "function" && Ht(A[z], g);
  }, t.removeHook = function(z, g) {
    if (g !== void 0) {
      const S = pc(A[z], g);
      return S === -1 ? void 0 : hc(A[z], S, 1)[0];
    }
    return pi(A[z]);
  }, t.removeHooks = function(z) {
    A[z] = [];
  }, t.removeAllHooks = function() {
    A = yi();
  }, t;
}
var Ac = ao();
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
function cn(e, t = !1) {
  return e;
}
function Lc(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function Ci(e) {
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
      n && !Ci(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !Ci(n) && e.removeAttribute("src");
    }
  });
}
Mc();
const Rc = wi(
  ({
    placeholder: e = "What would you like to know?",
    disabled: t = !1,
    chatStatus: n,
    fileUploadEnabled: r = !1,
    restaurantName: i,
    restaurantLogo: o,
    onSubmit: l,
    onFileUpload: a,
    onStopGeneration: s
  }, u) => {
    const [c, f] = re(""), [y, h] = re([]), x = ft(null);
    go(u, () => ({
      focus: () => {
        var I;
        (I = x.current) == null || I.focus();
      },
      setText: (I) => {
        f(I), setTimeout(() => {
          var T;
          (T = x.current) == null || T.focus();
        }, 0);
      }
    }));
    const k = ue(
      (I) => {
        I.preventDefault();
        const P = new FormData(I.currentTarget).get("message");
        if (P != null && P.trim()) {
          const V = cn(P.trim(), !1);
          if (!V.trim()) {
            console.warn("Message was blocked due to security concerns");
            return;
          }
          l(V, y), f(""), h([]);
        }
      },
      [l, y]
    ), M = ue(
      (I) => {
        const P = I.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
        f(P);
      },
      []
    ), b = ue(async () => {
      const I = document.createElement("input");
      I.type = "file", I.accept = "image/*,text/*,.pdf,.doc,.docx", I.multiple = !0, I.onchange = async (T) => {
        const P = T.target.files;
        if (P) {
          const V = Array.from(P).filter((w) => {
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
          if (V.length > 0) {
            const w = await a(V);
            h((F) => [...F, ...w]);
          }
        }
      }, I.click();
    }, [a]);
    return /* @__PURE__ */ L(rc, { onSubmit: k, children: [
      /* @__PURE__ */ p(
        ro,
        {
          ref: x,
          name: "message",
          value: c,
          onChange: M,
          placeholder: e,
          disabled: t
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
          children: y.map((I, T) => {
            const P = I.startsWith("data:image/"), V = I.startsWith("http://") || I.startsWith("https://"), w = P || V;
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
                            alt: `Attachment ${T + 1}`,
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
                                  const Q = F[1];
                                  switch (Q) {
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
                                      const O = Q.split("/")[1];
                                      return O ? O.toUpperCase().substring(0, 4) : "FILE";
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
                          (F) => F.filter((Q, O) => O !== T)
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
              T
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
                    title: y.length > 0 ? `${y.length} file(s) attached` : "Attach files",
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
            disabled: !c.trim() && n !== "streaming",
            onClick: n === "streaming" && s ? () => {
              s();
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
  var s, u;
  console.log("clog toolData", n);
  const o = () => {
    if (!r || !i) return null;
    const c = i.find((f) => f.name === r);
    return (c == null ? void 0 : c.description) || null;
  };
  let l;
  if (r != null && r.startsWith("lat_")) {
    const c = (s = n == null ? void 0 : n.parameters) == null ? void 0 : s.query, f = (u = n == null ? void 0 : n.parameters) == null ? void 0 : u.url;
    l = c || f || "Executing tool...";
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
function so({ size: e = 16, variant: t = "dots" }) {
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
    le(this, "sessionId", "");
    le(this, "ws", null);
    le(this, "isConnected", !1);
    le(this, "apiUrl", "http://localhost:3000");
    le(this, "userId", "");
    // Store userId from props
    le(this, "onSetMessage");
    le(this, "onSystemMessage");
    le(this, "onBusinessDataUpdate");
    le(this, "onReasoningUpdate");
    le(this, "clientTools", {});
    le(this, "toolSchemas", []);
    le(this, "businessContext", {});
    le(this, "reconnectAttempts", 0);
    le(this, "maxReconnectAttempts", 5);
    le(this, "reconnectTimer", null);
    le(this, "reconnectDelay", 1e3);
    // Start with 1 second
    le(this, "heartbeatInterval", null);
    le(this, "isReconnecting", !1);
    le(this, "visibilityChangeHandler");
    le(this, "initResolve");
    le(this, "initReject");
    le(this, "processedToolCalls", /* @__PURE__ */ new Set());
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
    var n, r, i, o, l;
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
              const u = a.data;
              if (console.log(
                "🔧 clog Server-side tool call detected:",
                u
              ), this.onReasoningUpdate && u.toolName && u.toolCallId && u.toolName.startsWith("lat_")) {
                const c = {
                  toolName: u.toolName,
                  callId: u.toolCallId,
                  parameters: u.args || {}
                };
                this.onReasoningUpdate(
                  !0,
                  `🔧 Handling: ${u.toolName}`,
                  c
                );
              }
            } else if (((i = a.data) == null ? void 0 : i.type) === "tool-result" && a.data.toolName.startsWith("lat_")) {
              const u = a.data;
              if (console.log(
                "✅ clog Server-side tool result detected:",
                u
              ), this.onReasoningUpdate && u.toolCallId) {
                const c = {
                  toolName: u.toolName || "Unknown Tool",
                  callId: u.toolCallId,
                  parameters: {}
                };
                this.onReasoningUpdate(
                  !1,
                  `✅ Completed: ${u.toolName || "Unknown Tool"}`,
                  c
                );
              }
            }
          } else if (a.event === "latitude-event" && (console.log("Latitude event:", (o = a.data) == null ? void 0 : o.type, a.data), ((l = a.data) == null ? void 0 : l.type) === "tool-result" && this.onReasoningUpdate)) {
            const u = a.data;
            if (u.toolCallId && u.toolName) {
              const c = {
                toolName: u.toolName,
                callId: u.toolCallId,
                parameters: {}
              };
              this.onReasoningUpdate(
                !1,
                `✅ Completed: ${u.toolName}`,
                c
              );
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
          console.log("📥 Received tool_call_request:", a);
          const s = a;
          if (console.log(`📋 Tool details - Name: ${s.toolName}, CallId: ${s.callId}`), this.processedToolCalls.has(s.callId)) {
            console.warn(`⚠️ Duplicate tool call detected for callId: ${s.callId}, ignoring`);
            break;
          }
          this.processedToolCalls.add(s.callId), this.handleToolCallRequest(s);
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
const uo = Qn(
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
            /* @__PURE__ */ p(so, { size: 16, variant: "dots" }),
            /* @__PURE__ */ p("span", { children: "Thinking" })
          ] })
        ) : e.role === "system" ? (
          /* System message with collapsible tool result */
          /* @__PURE__ */ p(Vc, { message: e })
        ) : e.role === "assistant" ? (
          /* Assistant message with regular markdown display */
          /* @__PURE__ */ p("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
            dn,
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
          /* @__PURE__ */ L("div", { className: "chat-wrapper__regular-message", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
              dn,
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
                children: e.media.map((s, u) => {
                  const c = s.startsWith("data:image/"), f = s.startsWith("http://") || s.startsWith("https://");
                  return /* @__PURE__ */ p(
                    "div",
                    {
                      style: {
                        position: "relative",
                        display: "inline-block"
                      },
                      children: c || f ? /* @__PURE__ */ L(
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
                                src: s,
                                alt: `Attachment ${u + 1}`,
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
                                    const h = s.match(/name=([^;]+)/);
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
                                    const h = s.match(/data:([^;]+)/);
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
                    u
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
uo.displayName = "MessageComponent";
const co = Qn(
  ({ content: e, messageId: t }) => !t || !e ? null : /* @__PURE__ */ p("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__message-content", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
    dn,
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
co.displayName = "StreamingMessage";
function Vc({ message: e }) {
  const [t, n] = re(!0);
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
          dn,
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
  var Qt;
  const l = ue((v) => v.replace(/^wss?:\/\//, (N) => N === "wss://" ? "https://" : "http://"), []), a = Ft(() => l(e), [e, l]), [s, u] = re(
    null
  ), [c, f] = re(!1), [y, h] = re(""), x = ft(null), [k, M] = re(i), [b, I] = re(!1), [T, P] = re(!1), [V, w] = re("idle"), [F, Q] = re(!1), [O, ee] = re(t.mode), [A, D] = re(!1), [J, ne] = re(
    null
  ), [$, he] = re(null), [ce, be] = re(null), [De] = re([]), [m, q] = re(""), [Pe, d] = re(!1), [, ye] = re(""), [Y, te] = re(""), [ve, ge] = re(!1), [, tt] = re(
    /* @__PURE__ */ new Map()
  ), $e = ft(null), Xe = ft(null), Oe = ft(null), lt = ft(!0), ze = ft(""), Ie = ft(!1), Fe = ue(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), xt = Ft(
    () => (v, N) => N === !1 ? v.includes("❌") ? "error" : "completed" : v.includes("✅ Completed:") || v.includes("✅") ? "completed" : v.includes("❌") ? "error" : "processing",
    []
  ), at = Ft(
    () => (v, N) => N === !1 ? v.includes("❌") ? "Error" : "Completed" : v.includes("✅ Completed:") || v.includes("✅") ? "Completed" : v.includes("❌") ? "Error" : (v.includes("🔧 Handling:"), "Thinking..."),
    []
  ), gt = Ft(
    () => (v, N) => N === !1 ? v.includes("❌") ? "Tool Error" : "Tool Completed" : v.includes("✅ Completed:") || v.includes("✅") ? "Tool Completed" : v.includes("❌") ? "Tool Error" : (v.includes("🔧 Handling:"), "Tool Processing..."),
    []
  ), yt = Ft(
    () => (v, N) => N === !1 ? v.includes("❌") ? "error" : "completed" : v.includes("✅ Completed:") || v.includes("✅") ? "completed" : v.includes("❌") ? "error" : "processing",
    []
  ), st = ue(
    (v, N) => {
      const Z = cn(N, v === "assistant");
      M((ae) => [
        ...ae,
        {
          id: Fe(),
          role: v,
          content: Z,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [Fe]
  ), nt = ue(() => {
    if (Oe.current && ze.current) {
      const v = cn(
        ze.current,
        !0
      ), N = {
        id: Oe.current,
        role: "assistant",
        content: v,
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !1
      };
      return M((G) => [...G, N]), Oe.current = null, ze.current = "", te(""), !0;
    }
    return !1;
  }, []), At = ue(() => {
    I(!1), d(!1), w("idle"), nt(), console.log("clog focus..."), setTimeout(() => {
      var v;
      (v = Xe.current) == null || v.focus();
    }, 0);
  }, [nt]), kt = ue(
    (v) => {
      console.error("Chat error:", v), I(!1), d(!1), w("error"), nt(), st("system", `❌ Chat error: ${v}`);
    },
    [st, nt]
  ), ut = ue(async () => {
    try {
      const v = new Bc();
      x.current = v, u(v), h(v.getSessionId());
      const N = {};
      await v.onInit({
        apiUrl: e,
        userId: o,
        toolSchemas: r,
        clientTools: n,
        businessContext: N,
        onSetMessage: (G) => {
          const Z = cn(G, !0);
          if (Oe.current)
            ze.current += Z, te(ze.current);
          else {
            d(!1);
            const ae = Fe();
            Oe.current = ae, ze.current = Z, te(Z);
          }
        },
        onSystemMessage: (G) => {
          if (G.includes("Chat completed"))
            At();
          else if (G.includes("Chat error")) {
            const Z = G.match(/Chat error: (.+)/);
            Z && kt(Z[1]);
          }
        },
        onReasoningUpdate: (G, Z, ae) => {
          console.log("🤔 Reasoning update:", {
            isThinking: G,
            content: Z,
            toolCallRequest: ae
          });
          const { callId: xe } = ae || {};
          if (ge(G), ye(Z), !xe) {
            console.log("⚠️ No callId provided for reasoning update");
            return;
          }
          const Ne = Z.includes("🔧 Handling:"), Ue = Z.includes("✅ Completed:"), qe = Z.includes("❌ Error:");
          console.log("🔍 Debug reasoning conditions:", {
            isToolStarted: Ne,
            isToolCompleted: Ue,
            isToolError: qe,
            callId: xe,
            isHandlingTool: ve
          }), tt((_e) => {
            const Be = new Map(_e), ct = Be.get(xe);
            if (Ne && !ct) {
              nt();
              const pt = Z.match(/🔧 Handling: (.+)/), rt = pt ? pt[1] : "Unknown Tool", Tt = Fe();
              Be.set(xe, Tt);
              const Se = {
                id: Tt,
                role: "tooling",
                content: Z,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0,
                toolData: {
                  ...ae,
                  toolName: rt,
                  callId: xe,
                  status: "processing"
                }
              };
              M((en) => [...en, Se]);
            } else if ((Ue || qe) && ct) {
              const pt = Z.match(
                /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
              ), rt = pt ? pt[1] : "Unknown Tool";
              M(
                (Tt) => Tt.map(
                  (Se) => Se.id === ct ? {
                    ...Se,
                    content: Z,
                    isStreaming: !1,
                    // Mark as completed
                    toolData: {
                      ...Se.toolData,
                      toolName: rt,
                      status: qe ? "error" : "completed",
                      callId: xe ?? ""
                    }
                  } : Se
                )
              ), Be.delete(xe);
            } else ct && ve && !Ue && !qe && M(
              (pt) => pt.map(
                (rt) => rt.id === ct ? {
                  ...rt,
                  content: Z,
                  isStreaming: !0
                } : rt
              )
            );
            return Be;
          });
        },
        onBusinessDataUpdate: (G) => {
          t.onBusinessDataUpdate && t.onBusinessDataUpdate(G);
        }
      }), f(!0), console.log("BusinessAgentClient connected");
    } catch (v) {
      console.error("Error connecting BusinessAgentClient:", v), f(!1);
    }
  }, [
    e,
    r,
    n,
    t,
    Fe,
    st,
    At,
    kt,
    nt
  ]), C = ue(() => {
    x.current && (x.current.disconnect(), x.current = null), u(null), f(!1), h("");
  }, []), E = ue(() => {
    console.log("🔍 DEBUG: resetToolHandling called! Stack trace:"), console.trace(), ge(!1), lt.current = !0;
  }, []), U = ue(() => {
    var v;
    (v = $e.current) == null || v.scrollIntoView({ behavior: "smooth" });
  }, []);
  bt(() => {
    U();
  }, [k, U]), bt(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(m);
  }, [m, t]), bt(() => {
    console.log("🔍 DEBUG: isHandlingTool state changed:", ve);
  }, [ve]), bt(() => {
    console.log("💭 DEBUG: isHandlingReasoning state changed:");
  }, []), bt(() => (console.log("Connecting BusinessAgentClient..."), ut(), () => {
    C();
  }), [ut, C]), bt(() => {
    const v = setInterval(() => {
      if (x.current) {
        const N = x.current.getConnectionStatus();
        f(N.connected);
      }
    }, 1e3);
    return () => clearInterval(v);
  }, []), bt(() => {
    (async () => {
      if (o && !Ie.current && !A && !(k.length > 0))
        try {
          D(!0), ne(null), console.log(`📚 Fetching threads for user: ${o}`);
          const N = await Hc(a, o, {
            limit: 1
            // Get only the first/most recent thread
          });
          if (N.length === 0) {
            console.log("ℹ️ No threads found for user"), D(!1), Ie.current = !0;
            return;
          }
          const G = N[0];
          console.log(
            `📖 Loading thread: ${G.id} (${G.title})`
          ), he(G.id), be(G.convUuid);
          const Z = await jc(
            a,
            G.id
          );
          console.log(`✅ Loaded ${Z.length} messages`), M(Z), Ie.current = !0;
        } catch (N) {
          console.error("❌ Error loading conversation:", N), ne(
            N instanceof Error ? N.message : "Failed to load conversation"
          ), Ie.current = !0;
        } finally {
          D(!1);
        }
    })();
  }, [o, a]);
  const j = ue(
    async (v, N) => {
      if (!v.trim() || b || !s || !c)
        return;
      const G = {
        id: Fe(),
        role: "user",
        content: v.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: N
      };
      M((Z) => [...Z, G]), I(!0), d(!0), w("submitted"), q("Starting...");
      try {
        await s.onTriggerMessage(
          G.content,
          "shop",
          N,
          ce || void 0
        ), w("streaming");
      } catch (Z) {
        console.error("Agent client send error:", Z), d(!1), w("error"), st(
          "system",
          `Sorry, there was an error: ${Z instanceof Error ? Z.message : "Unknown error"}`
        ), t.onError && t.onError(
          Z instanceof Error ? Z : new Error("Unknown error")
        ), I(!1), w("idle"), q("");
      }
    },
    [
      b,
      s,
      c,
      Fe,
      st,
      t,
      ce
    ]
  ), X = ue(() => {
    I(!1), w("idle"), q(""), d(!1), ye(""), Oe.current = null, ze.current = "", te(""), E();
  }, [E]), Ce = ue(
    async (v) => {
      console.log("Files selected:", v);
      const N = [], G = e || "http://localhost:3000", Z = "chat-uploads";
      for (const ae of v)
        try {
          const xe = new FormData();
          xe.append("file", ae), xe.append("folder", Z), console.log(`Uploading file: ${ae.name} to ${G}/upload`);
          const Ne = await fetch(`${G}/upload`, {
            method: "POST",
            body: xe
          }), Ue = await Ne.json();
          if (Ne.ok)
            console.log("✅ Upload successful:", Ue), ae.type.startsWith("image/") ? N.push(Ue.url) : N.push(
              `data:${ae.type};name=${encodeURIComponent(
                Ue.fileName || ae.name
              )};url=${encodeURIComponent(Ue.url)}`
            );
          else if (console.error("❌ Upload failed:", Ue.error), ae.type.startsWith("image/")) {
            const qe = new FileReader(), _e = await new Promise(
              (Be, ct) => {
                qe.onload = () => Be(qe.result), qe.onerror = ct, qe.readAsDataURL(ae);
              }
            );
            N.push(_e);
          } else
            N.push(
              `data:${ae.type};name=${encodeURIComponent(
                ae.name
              )};base64,placeholder`
            );
        } catch (xe) {
          console.error("Error uploading file:", xe);
          try {
            if (ae.type.startsWith("image/")) {
              const Ne = new FileReader(), Ue = await new Promise(
                (qe, _e) => {
                  Ne.onload = () => qe(Ne.result), Ne.onerror = _e, Ne.readAsDataURL(ae);
                }
              );
              N.push(Ue);
            } else
              N.push(
                `data:${ae.type};name=${encodeURIComponent(
                  ae.name
                )};base64,placeholder`
              );
          } catch (Ne) {
            console.error("Error in fallback encoding:", Ne);
          }
        }
      return console.log("Added media:", N), N;
    },
    [e]
  ), Je = ue(() => {
    P(!0);
  }, []), me = ue(() => {
    P(!1);
  }, []), Ze = ue(() => {
    Q((v) => !v);
  }, []), we = ue(() => {
    ee((v) => v === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  bt(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const v = (N) => {
      N.key === "Escape" && O === "modal" && T && me();
    };
    if (O === "modal" && T)
      return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [O, T, me]);
  const Ke = ((...v) => v.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${O}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`,
    F && "chat-wrapper--collapsed",
    O === "embedded" && t.constrainedHeight && "chat-wrapper--constrained"
  ), Ae = () => O === "modal" && T ? /* @__PURE__ */ p("div", { className: "chat-wrapper-overlay", onClick: me }) : null, Kt = () => {
    var N;
    if (O === "modal" && !T || O === "sidebar" && F || O === "fullscreen" && F) {
      const G = O === "modal" ? Je : Ze, Z = O === "modal" ? `Open ${t.appName}` : `Expand ${t.appName}`;
      return /* @__PURE__ */ L(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: G,
          title: Z,
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
            ((N = t.features) == null ? void 0 : N.showBubbleText) !== !1 && /* @__PURE__ */ p("span", { className: "chat-wrapper__bubble-text", children: t.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, Nt = () => O === "modal" && T ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: me,
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
  ) : null, Lt = () => {
    if ((O === "sidebar" || O === "fullscreen") && !F) {
      const v = O === "fullscreen";
      return /* @__PURE__ */ p(
        "button",
        {
          className: v ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: we,
          title: v ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ p(
            "svg",
            {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: v ? (
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
  }, wn = () => (O === "sidebar" || O === "fullscreen") && !F ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: Ze,
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
  ) : null, Et = () => {
    var v;
    return !((v = t.features) != null && v.showToolResults) || De.length === 0 ? null : /* @__PURE__ */ L("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ p("h4", { children: "Tool Results" }),
      /* @__PURE__ */ p("div", { className: "chat-wrapper__tool-results-list", children: De.map((N) => /* @__PURE__ */ L("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ p("div", { className: "chat-wrapper__tool-result-title", children: N.title }),
        N.description && /* @__PURE__ */ p("div", { className: "chat-wrapper__tool-result-description", children: N.description }),
        /* @__PURE__ */ L("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          N.status || "completed"
        ] })
      ] }, N.id)) })
    ] });
  };
  return O === "modal" && !T || (O === "sidebar" || O === "fullscreen") && F ? Kt() : /* @__PURE__ */ L(Fn, { children: [
    Ae(),
    A && /* @__PURE__ */ p("div", { className: "chat-wrapper__loading-overlay", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__loading-overlay-content", children: /* @__PURE__ */ p(so, { size: 32, variant: "dots" }) }) }),
    /* @__PURE__ */ L("div", { className: Ke, style: t.customStyles, children: [
      t.headerVisible !== !1 && /* @__PURE__ */ L("div", { className: "chat-wrapper__header", children: [
        /* @__PURE__ */ L("div", { className: "chat-wrapper__title-area", children: [
          /* @__PURE__ */ p("h2", { className: "chat-wrapper__title", children: t.appName }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__connection-status", children: /* @__PURE__ */ p(
            "span",
            {
              className: `chat-wrapper__connection-indicator ${c ? "connected" : "disconnected"}`,
              title: c ? `Connected to WebSocket${y ? ` (Session: ${y.slice(-8)})` : ""}` : "Disconnected from WebSocket",
              children: c ? "🟢" : "🔴"
            }
          ) })
        ] }),
        /* @__PURE__ */ L("div", { className: "chat-wrapper__header-controls", children: [
          Lt(),
          wn(),
          Nt()
        ] })
      ] }),
      !F && /* @__PURE__ */ L(Fn, { children: [
        J && /* @__PURE__ */ p("div", { className: "chat-wrapper__conversation-error", children: /* @__PURE__ */ L("p", { children: [
          "⚠️ ",
          J
        ] }) }),
        k.length === 0 && !b && !A && /* @__PURE__ */ L("div", { className: "chat-wrapper__main-header", children: [
          /* @__PURE__ */ p("h1", { className: "chat-wrapper__main-title", children: t.appName }),
          t.description && /* @__PURE__ */ p("p", { className: "chat-wrapper__description", children: t.description })
        ] }),
        /* @__PURE__ */ L(
          "div",
          {
            className: `chat-wrapper__content ${k.length === 0 && !b ? "chat-wrapper__content--empty" : "chat-wrapper__content--with-messages"}`,
            children: [
              /* @__PURE__ */ L("div", { className: "chat-wrapper__messages", children: [
                k.map((v) => /* @__PURE__ */ p(
                  uo,
                  {
                    message: v,
                    getReasoningTitle: at,
                    getReasoningStatus: xt,
                    getToolingTitle: gt,
                    getToolingStatus: yt,
                    clientTools: r || [],
                    currentAssistantMessageIdRef: Oe
                  },
                  v.id
                )),
                Oe.current && Y && /* @__PURE__ */ p(
                  co,
                  {
                    content: Y,
                    messageId: Oe.current
                  }
                ),
                Pe && !ve && /* @__PURE__ */ p("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ L("div", { className: "chat-wrapper__thinking-dots", children: [
                  /* @__PURE__ */ p("span", {}),
                  /* @__PURE__ */ p("span", {}),
                  /* @__PURE__ */ p("span", {})
                ] }) }) }) }),
                /* @__PURE__ */ p("div", { ref: $e })
              ] }),
              Et(),
              /* @__PURE__ */ p("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ p(
                Rc,
                {
                  ref: Xe,
                  placeholder: t.placeholder,
                  disabled: b,
                  chatStatus: V,
                  fileUploadEnabled: (Qt = t.features) == null ? void 0 : Qt.fileUpload,
                  restaurantName: t.restaurantName,
                  restaurantLogo: t.restaurantLogo,
                  onSubmit: (v, N) => j(v, N),
                  onFileUpload: Ce,
                  onStopGeneration: X
                }
              ) }),
              k.length === 0 && !b && t.suggestedPrompts && /* @__PURE__ */ p(
                Dc,
                {
                  prompts: t.suggestedPrompts,
                  onPromptSelect: (v) => {
                    Xe.current && Xe.current.setText(v.description);
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
const r1 = Qn(Wc);
class $c {
  constructor(t, n) {
    le(this, "baseUrl");
    le(this, "apiKey");
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
      const u = o.decode(a).split(`
`);
      for (const c of u)
        if (c.startsWith("data: ")) {
          const f = c.slice(6);
          if (f === "[DONE]") return;
          try {
            yield JSON.parse(f).content || "";
          } catch (y) {
            console.error("Failed to parse chunk:", y);
          }
        }
    }
  }
}
function i1(e, t) {
  const [n, r] = re([]), [i, o] = re(!1), [l, a] = re(null), s = ft(null), u = ft(new $c(e, t)), c = ue(async () => {
    try {
      const h = await u.current.initConversation();
      return s.current = h, h;
    } catch (h) {
      throw a(h), h;
    }
  }, []), f = ue(
    async (h) => {
      s.current || await c();
      const x = {
        id: Date.now().toString(),
        role: "user",
        content: h,
        timestamp: /* @__PURE__ */ new Date()
      };
      r((M) => [...M, x]), o(!0), a(null);
      const k = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      r((M) => [...M, k]);
      try {
        const M = u.current.streamMessage(
          s.current,
          h
        );
        for await (const b of M)
          r(
            (I) => I.map(
              (T) => T.id === k.id ? { ...T, content: T.content + b } : T
            )
          );
        r(
          (b) => b.map(
            (I) => I.id === k.id ? { ...I, isStreaming: !1 } : I
          )
        );
      } catch (M) {
        a(M), r((b) => b.filter((I) => I.id !== k.id));
      } finally {
        o(!1);
      }
    },
    [c]
  ), y = ue(() => {
    r([]), s.current = null;
  }, []);
  return {
    messages: n,
    isLoading: i,
    error: l,
    sendMessage: f,
    clearMessages: y
  };
}
export {
  r1 as ChatWrapper,
  so as Loader,
  rc as PromptInput,
  lc as PromptInputButton,
  Yc as PromptInputModelSelect,
  Jc as PromptInputModelSelectContent,
  Kc as PromptInputModelSelectItem,
  Xc as PromptInputModelSelectTrigger,
  Qc as PromptInputModelSelectValue,
  ac as PromptInputSubmit,
  ro as PromptInputTextarea,
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
