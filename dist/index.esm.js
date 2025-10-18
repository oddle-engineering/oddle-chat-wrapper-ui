var hl = Object.defineProperty;
var fl = (e, t, n) => t in e ? hl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var he = (e, t, n) => fl(e, typeof t != "symbol" ? t + "" : t, n);
import { jsxs as O, jsx as h, Fragment as Nn } from "react/jsx-runtime";
import dl, { forwardRef as ml, useState as fe, useCallback as me, memo as Zn, useRef as xt, useMemo as $t, useEffect as wt } from "react";
function gl(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const yl = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Cl = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, wl = {};
function wr(e, t) {
  return (wl.jsx ? Cl : yl).test(e);
}
const xl = /[ \t\n\f\r]/g;
function kl(e) {
  return typeof e == "object" ? e.type === "text" ? xr(e.value) : !1 : xr(e);
}
function xr(e) {
  return e.replace(xl, "") === "";
}
class jt {
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
jt.prototype.normal = {};
jt.prototype.property = {};
jt.prototype.space = void 0;
function Ci(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new jt(n, r, t);
}
function Mn(e) {
  return e.toLowerCase();
}
class Me {
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
Me.prototype.attribute = "";
Me.prototype.booleanish = !1;
Me.prototype.boolean = !1;
Me.prototype.commaOrSpaceSeparated = !1;
Me.prototype.commaSeparated = !1;
Me.prototype.defined = !1;
Me.prototype.mustUseProperty = !1;
Me.prototype.number = !1;
Me.prototype.overloadedBoolean = !1;
Me.prototype.property = "";
Me.prototype.spaceSeparated = !1;
Me.prototype.space = void 0;
let bl = 0;
const H = bt(), Ce = bt(), Dn = bt(), S = bt(), ne = bt(), Tt = bt(), Oe = bt();
function bt() {
  return 2 ** ++bl;
}
const Rn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: H,
  booleanish: Ce,
  commaOrSpaceSeparated: Oe,
  commaSeparated: Tt,
  number: S,
  overloadedBoolean: Dn,
  spaceSeparated: ne
}, Symbol.toStringTag, { value: "Module" })), dn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Rn)
);
class Gn extends Me {
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
    if (super(t, n), kr(this, "space", i), typeof r == "number")
      for (; ++l < dn.length; ) {
        const o = dn[l];
        kr(this, dn[l], (r & Rn[o]) === Rn[o]);
      }
  }
}
Gn.prototype.defined = !0;
function kr(e, t, n) {
  n && (e[t] = n);
}
function It(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const l = new Gn(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (l.mustUseProperty = !0), t[r] = l, n[Mn(r)] = r, n[Mn(l.attribute)] = r;
  }
  return new jt(t, n, e.space);
}
const wi = It({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Ce,
    ariaAutoComplete: null,
    ariaBusy: Ce,
    ariaChecked: Ce,
    ariaColCount: S,
    ariaColIndex: S,
    ariaColSpan: S,
    ariaControls: ne,
    ariaCurrent: null,
    ariaDescribedBy: ne,
    ariaDetails: null,
    ariaDisabled: Ce,
    ariaDropEffect: ne,
    ariaErrorMessage: null,
    ariaExpanded: Ce,
    ariaFlowTo: ne,
    ariaGrabbed: Ce,
    ariaHasPopup: null,
    ariaHidden: Ce,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: ne,
    ariaLevel: S,
    ariaLive: null,
    ariaModal: Ce,
    ariaMultiLine: Ce,
    ariaMultiSelectable: Ce,
    ariaOrientation: null,
    ariaOwns: ne,
    ariaPlaceholder: null,
    ariaPosInSet: S,
    ariaPressed: Ce,
    ariaReadOnly: Ce,
    ariaRelevant: null,
    ariaRequired: Ce,
    ariaRoleDescription: ne,
    ariaRowCount: S,
    ariaRowIndex: S,
    ariaRowSpan: S,
    ariaSelected: Ce,
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
function xi(e, t) {
  return t in e ? e[t] : t;
}
function ki(e, t) {
  return xi(e, t.toLowerCase());
}
const Sl = It({
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
    accept: Tt,
    acceptCharset: ne,
    accessKey: ne,
    action: null,
    allow: null,
    allowFullScreen: H,
    allowPaymentRequest: H,
    allowUserMedia: H,
    alt: null,
    as: null,
    async: H,
    autoCapitalize: null,
    autoComplete: ne,
    autoFocus: H,
    autoPlay: H,
    blocking: ne,
    capture: null,
    charSet: null,
    checked: H,
    cite: null,
    className: ne,
    cols: S,
    colSpan: null,
    content: null,
    contentEditable: Ce,
    controls: H,
    controlsList: ne,
    coords: S | Tt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: H,
    defer: H,
    dir: null,
    dirName: null,
    disabled: H,
    download: Dn,
    draggable: Ce,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: H,
    formTarget: null,
    headers: ne,
    height: S,
    hidden: Dn,
    high: S,
    href: null,
    hrefLang: null,
    htmlFor: ne,
    httpEquiv: ne,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: H,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: H,
    itemId: null,
    itemProp: ne,
    itemRef: ne,
    itemScope: H,
    itemType: ne,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: H,
    low: S,
    manifest: null,
    max: null,
    maxLength: S,
    media: null,
    method: null,
    min: null,
    minLength: S,
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
    optimum: S,
    pattern: null,
    ping: ne,
    placeholder: null,
    playsInline: H,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: H,
    referrerPolicy: null,
    rel: ne,
    required: H,
    reversed: H,
    rows: S,
    rowSpan: S,
    sandbox: ne,
    scope: null,
    scoped: H,
    seamless: H,
    selected: H,
    shadowRootClonable: H,
    shadowRootDelegatesFocus: H,
    shadowRootMode: null,
    shape: null,
    size: S,
    sizes: null,
    slot: null,
    span: S,
    spellCheck: Ce,
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
    typeMustMatch: H,
    useMap: null,
    value: Ce,
    width: S,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: ne,
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
    rightMargin: S,
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
    disablePictureInPicture: H,
    disableRemotePlayback: H,
    prefix: null,
    property: null,
    results: S,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: ki
}), _l = It({
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
    about: Oe,
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
    className: ne,
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
    download: H,
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
    g1: Tt,
    g2: Tt,
    glyphName: Tt,
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
    kernelMatrix: Oe,
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
    ping: ne,
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
    property: Oe,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Oe,
    rev: Oe,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Oe,
    requiredFeatures: Oe,
    requiredFonts: Oe,
    requiredFormats: Oe,
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
    strokeDashArray: Oe,
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
    systemLanguage: Oe,
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
    typeOf: Oe,
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
  transform: xi
}), bi = It({
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
}), Si = It({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: ki
}), _i = It({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), El = {
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
}, Tl = /[A-Z]/g, br = /-[a-z]/g, Al = /^data[-\w.:]+$/i;
function Il(e, t) {
  const n = Mn(t);
  let r = t, i = Me;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Al.test(t)) {
    if (t.charAt(4) === "-") {
      const l = t.slice(5).replace(br, Ll);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = t.slice(4);
      if (!br.test(l)) {
        let o = l.replace(Tl, vl);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    i = Gn;
  }
  return new i(r, t);
}
function vl(e) {
  return "-" + e.toLowerCase();
}
function Ll(e) {
  return e.charAt(1).toUpperCase();
}
const Nl = Ci([wi, Sl, bi, Si, _i], "html"), qn = Ci([wi, _l, bi, Si, _i], "svg");
function Ml(e) {
  return e.join(" ").trim();
}
var tn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ei(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Yn = {}, Sr = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Dl = /\n/g, Rl = /^\s*/, Ol = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Pl = /^:\s*/, zl = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Fl = /^[;\s]*/, Bl = /^\s+|\s+$/g, Ul = `
`, _r = "/", Er = "*", kt = "", Hl = "comment", jl = "declaration", Wl = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(w) {
    var k = w.match(Dl);
    k && (n += k.length);
    var A = w.lastIndexOf(Ul);
    r = ~A ? w.length - A : r + w.length;
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
      var A = k[0];
      return i(A), e = e.slice(A.length), k;
    }
  }
  function u() {
    s(Rl);
  }
  function c(w) {
    var k;
    for (w = w || []; k = f(); )
      k !== !1 && w.push(k);
    return w;
  }
  function f() {
    var w = l();
    if (!(_r != e.charAt(0) || Er != e.charAt(1))) {
      for (var k = 2; kt != e.charAt(k) && (Er != e.charAt(k) || _r != e.charAt(k + 1)); )
        ++k;
      if (k += 2, kt === e.charAt(k - 1))
        return a("End of comment missing");
      var A = e.slice(2, k - 2);
      return r += 2, i(A), e = e.slice(k), r += 2, w({
        type: Hl,
        comment: A
      });
    }
  }
  function y() {
    var w = l(), k = s(Ol);
    if (k) {
      if (f(), !s(Pl)) return a("property missing ':'");
      var A = s(zl), b = w({
        type: jl,
        property: Tr(k[0].replace(Sr, kt)),
        value: A ? Tr(A[0].replace(Sr, kt)) : kt
      });
      return s(Fl), b;
    }
  }
  function p() {
    var w = [];
    c(w);
    for (var k; k = y(); )
      k !== !1 && (w.push(k), c(w));
    return w;
  }
  return u(), p();
};
function Tr(e) {
  return e ? e.replace(Bl, kt) : kt;
}
var Vl = tn && tn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.default = Zl;
var $l = Vl(Wl);
function Zl(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, $l.default)(e), i = typeof t == "function";
  return r.forEach(function(l) {
    if (l.type === "declaration") {
      var o = l.property, a = l.value;
      i ? t(o, a, l) : a && (n = n || {}, n[o] = a);
    }
  }), n;
}
var on = {};
Object.defineProperty(on, "__esModule", { value: !0 });
on.camelCase = void 0;
var Gl = /^--[a-zA-Z0-9_-]+$/, ql = /-([a-z])/g, Yl = /^[^-]+$/, Xl = /^-(webkit|moz|ms|o|khtml)-/, Kl = /^-(ms)-/, Jl = function(e) {
  return !e || Yl.test(e) || Gl.test(e);
}, Ql = function(e, t) {
  return t.toUpperCase();
}, Ar = function(e, t) {
  return "".concat(t, "-");
}, eo = function(e, t) {
  return t === void 0 && (t = {}), Jl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Kl, Ar) : e = e.replace(Xl, Ar), e.replace(ql, Ql));
};
on.camelCase = eo;
var to = tn && tn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, no = to(Yn), ro = on;
function On(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, no.default)(e, function(r, i) {
    r && i && (n[(0, ro.camelCase)(r, t)] = i);
  }), n;
}
On.default = On;
var io = On;
const lo = /* @__PURE__ */ Ei(io), Ti = Ai("end"), Xn = Ai("start");
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
function oo(e) {
  const t = Xn(e), n = Ti(e);
  if (t && n)
    return { start: t, end: n };
}
function Ft(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Ir(e.position) : "start" in e || "end" in e ? Ir(e) : "line" in e || "column" in e ? Pn(e) : "";
}
function Pn(e) {
  return vr(e && e.line) + ":" + vr(e && e.column);
}
function Ir(e) {
  return Pn(e && e.start) + "-" + Pn(e && e.end);
}
function vr(e) {
  return e && typeof e == "number" ? e : 1;
}
class _e extends Error {
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
    this.ancestors = l.ancestors || void 0, this.cause = l.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = Ft(l.place) || "1:1", this.place = l.place || void 0, this.reason = this.message, this.ruleId = l.ruleId || void 0, this.source = l.source || void 0, this.stack = o && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
_e.prototype.file = "";
_e.prototype.name = "";
_e.prototype.reason = "";
_e.prototype.message = "";
_e.prototype.stack = "";
_e.prototype.column = void 0;
_e.prototype.line = void 0;
_e.prototype.ancestors = void 0;
_e.prototype.cause = void 0;
_e.prototype.fatal = void 0;
_e.prototype.place = void 0;
_e.prototype.ruleId = void 0;
_e.prototype.source = void 0;
const Kn = {}.hasOwnProperty, ao = /* @__PURE__ */ new Map(), so = /[A-Z]/g, uo = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), co = /* @__PURE__ */ new Set(["td", "th"]), Ii = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function po(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = xo(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = wo(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? qn : Nl,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, l = vi(i, e, void 0);
  return l && typeof l != "string" ? l : i.create(
    e,
    i.Fragment,
    { children: l || void 0 },
    void 0
  );
}
function vi(e, t, n) {
  if (t.type === "element")
    return ho(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return fo(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return go(e, t, n);
  if (t.type === "mdxjsEsm")
    return mo(e, t);
  if (t.type === "root")
    return yo(e, t, n);
  if (t.type === "text")
    return Co(e, t);
}
function ho(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = qn, e.schema = i), e.ancestors.push(t);
  const l = Ni(e, t.tagName, !1), o = ko(e, t);
  let a = Qn(e, t);
  return uo.has(t.tagName) && (a = a.filter(function(s) {
    return typeof s == "string" ? !kl(s) : !0;
  })), Li(e, o, l, t), Jn(o, a), e.ancestors.pop(), e.schema = r, e.create(t, l, o, n);
}
function fo(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Ht(e, t.position);
}
function mo(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Ht(e, t.position);
}
function go(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = qn, e.schema = i), e.ancestors.push(t);
  const l = t.name === null ? e.Fragment : Ni(e, t.name, !0), o = bo(e, t), a = Qn(e, t);
  return Li(e, o, l, t), Jn(o, a), e.ancestors.pop(), e.schema = r, e.create(t, l, o, n);
}
function yo(e, t, n) {
  const r = {};
  return Jn(r, Qn(e, t)), e.create(t, e.Fragment, r, n);
}
function Co(e, t) {
  return t.value;
}
function Li(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function Jn(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function wo(e, t, n) {
  return r;
  function r(i, l, o, a) {
    const u = Array.isArray(o.children) ? n : t;
    return a ? u(l, o, a) : u(l, o);
  }
}
function xo(e, t) {
  return n;
  function n(r, i, l, o) {
    const a = Array.isArray(l.children), s = Xn(r);
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
function ko(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && Kn.call(t.properties, i)) {
      const l = So(e, i, t.properties[i]);
      if (l) {
        const [o, a] = l;
        e.tableCellAlignToStyle && o === "align" && typeof a == "string" && co.has(t.tagName) ? r = a : n[o] = a;
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
function bo(e, t) {
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
        Ht(e, t.position);
    else {
      const i = r.name;
      let l;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, l = e.evaluater.evaluateExpression(a.expression);
        } else
          Ht(e, t.position);
      else
        l = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      l;
    }
  return n;
}
function Qn(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : ao;
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
    const a = vi(e, l, o);
    a !== void 0 && n.push(a);
  }
  return n;
}
function So(e, t, n) {
  const r = Il(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? gl(n) : Ml(n)), r.property === "style") {
      let i = typeof n == "object" ? n : _o(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Eo(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? El[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function _o(e, t) {
  try {
    return lo(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new _e("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Ii + "#cannot-parse-style-attribute", i;
  }
}
function Ni(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let l = -1, o;
    for (; ++l < i.length; ) {
      const a = wr(i[l]) ? { type: "Identifier", name: i[l] } : { type: "Literal", value: i[l] };
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
    r = wr(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return Kn.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Ht(e);
}
function Ht(e, t) {
  const n = new _e(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Ii + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Eo(e) {
  const t = {};
  let n;
  for (n in e)
    Kn.call(e, n) && (t[To(n)] = e[n]);
  return t;
}
function To(e) {
  let t = e.replace(so, Ao);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Ao(e) {
  return "-" + e.toLowerCase();
}
const mn = {
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
}, Io = {};
function vo(e, t) {
  const n = Io, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Mi(e, r, i);
}
function Mi(e, t, n) {
  if (Lo(e)) {
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
    r[i] = Mi(e[i], t, n);
  return r.join("");
}
function Lo(e) {
  return !!(e && typeof e == "object");
}
const Nr = document.createElement("i");
function er(e) {
  const t = "&" + e + ";";
  Nr.innerHTML = t;
  const n = Nr.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function Ke(e, t, n, r) {
  const i = e.length;
  let l = 0, o;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(t, n), e.splice(...o);
  else
    for (n && e.splice(t, n); l < r.length; )
      o = r.slice(l, l + 1e4), o.unshift(t, 0), e.splice(...o), l += 1e4, t += 1e4;
}
function ze(e, t) {
  return e.length > 0 ? (Ke(e, e.length, 0, t), e) : t;
}
const Mr = {}.hasOwnProperty;
function No(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    Mo(t, e[n]);
  return t;
}
function Mo(e, t) {
  let n;
  for (n in t) {
    const i = (Mr.call(e, n) ? e[n] : void 0) || (e[n] = {}), l = t[n];
    let o;
    if (l)
      for (o in l) {
        Mr.call(i, o) || (i[o] = []);
        const a = l[o];
        Do(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function Do(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  Ke(e, 0, 0, r);
}
function Di(e, t) {
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
function At(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Xe = dt(/[A-Za-z]/), Pe = dt(/[\dA-Za-z]/), Ro = dt(/[#-'*+\--9=?A-Z^-~]/);
function zn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Fn = dt(/\d/), Oo = dt(/[\dA-Fa-f]/), Po = dt(/[!-/:-@[-`{-~]/);
function B(e) {
  return e !== null && e < -2;
}
function Ne(e) {
  return e !== null && (e < 0 || e === 32);
}
function Q(e) {
  return e === -2 || e === -1 || e === 32;
}
const zo = dt(new RegExp("\\p{P}|\\p{S}", "u")), Fo = dt(/\s/);
function dt(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function vt(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const l = e.charCodeAt(n);
    let o = "";
    if (l === 37 && Pe(e.charCodeAt(n + 1)) && Pe(e.charCodeAt(n + 2)))
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
function re(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let l = 0;
  return o;
  function o(s) {
    return Q(s) ? (e.enter(n), a(s)) : t(s);
  }
  function a(s) {
    return Q(s) && l++ < i ? (e.consume(s), a) : (e.exit(n), t(s));
  }
}
const Bo = {
  tokenize: Uo
};
function Uo(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), re(e, t, "linePrefix");
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
    return B(a) ? (e.consume(a), e.exit("chunkText"), l) : (e.consume(a), o);
  }
}
const Ho = {
  tokenize: jo
}, Dr = {
  tokenize: Wo
};
function jo(e) {
  const t = this, n = [];
  let r = 0, i, l, o;
  return a;
  function a(I) {
    if (r < n.length) {
      const z = n[r];
      return t.containerState = z[1], e.attempt(z[0].continuation, s, u)(I);
    }
    return u(I);
  }
  function s(I) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && D();
      const z = t.events.length;
      let X = z, x;
      for (; X--; )
        if (t.events[X][0] === "exit" && t.events[X][1].type === "chunkFlow") {
          x = t.events[X][1].end;
          break;
        }
      b(r);
      let q = z;
      for (; q < t.events.length; )
        t.events[q][1].end = {
          ...x
        }, q++;
      return Ke(t.events, X + 1, 0, t.events.slice(z)), t.events.length = q, u(I);
    }
    return a(I);
  }
  function u(I) {
    if (r === n.length) {
      if (!i)
        return y(I);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return w(I);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(Dr, c, f)(I);
  }
  function c(I) {
    return i && D(), b(r), y(I);
  }
  function f(I) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, w(I);
  }
  function y(I) {
    return t.containerState = {}, e.attempt(Dr, p, w)(I);
  }
  function p(I) {
    return r++, n.push([t.currentConstruct, t.containerState]), y(I);
  }
  function w(I) {
    if (I === null) {
      i && D(), b(0), e.consume(I);
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
      A(e.exit("chunkFlow"), !0), b(0), e.consume(I);
      return;
    }
    return B(I) ? (e.consume(I), A(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, a) : (e.consume(I), k);
  }
  function A(I, z) {
    const X = t.sliceStream(I);
    if (z && X.push(null), I.previous = l, l && (l.next = I), l = I, i.defineSkip(I.start), i.write(X), t.parser.lazy[I.start.line]) {
      let x = i.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          i.events[x][1].start.offset < o && // …and either is not ended yet…
          (!i.events[x][1].end || // …or ends after it.
          i.events[x][1].end.offset > o)
        )
          return;
      const q = t.events.length;
      let ie = q, Z, K;
      for (; ie--; )
        if (t.events[ie][0] === "exit" && t.events[ie][1].type === "chunkFlow") {
          if (Z) {
            K = t.events[ie][1].end;
            break;
          }
          Z = !0;
        }
      for (b(r), x = q; x < t.events.length; )
        t.events[x][1].end = {
          ...K
        }, x++;
      Ke(t.events, ie + 1, 0, t.events.slice(q)), t.events.length = x;
    }
  }
  function b(I) {
    let z = n.length;
    for (; z-- > I; ) {
      const X = n[z];
      t.containerState = X[1], X[0].exit.call(t, e);
    }
    n.length = I;
  }
  function D() {
    i.write([null]), l = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Wo(e, t, n) {
  return re(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Rr(e) {
  if (e === null || Ne(e) || Fo(e))
    return 1;
  if (zo(e))
    return 2;
}
function tr(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll;
    l && !r.includes(l) && (t = l(t, n), r.push(l));
  }
  return t;
}
const Bn = {
  name: "attention",
  resolveAll: Vo,
  tokenize: $o
};
function Vo(e, t) {
  let n = -1, r, i, l, o, a, s, u, c;
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
          Or(f, -s), Or(y, s), o = {
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
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = ze(u, [["enter", e[r][1], t], ["exit", e[r][1], t]])), u = ze(u, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["enter", l, t]]), u = ze(u, tr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), u = ze(u, [["exit", l, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (c = 2, u = ze(u, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : c = 0, Ke(e, r - 1, n - r + 3, u), n = r + u.length - c - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function $o(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Rr(r);
  let l;
  return o;
  function o(s) {
    return l = s, e.enter("attentionSequence"), a(s);
  }
  function a(s) {
    if (s === l)
      return e.consume(s), a;
    const u = e.exit("attentionSequence"), c = Rr(s), f = !c || c === 2 && i || n.includes(s), y = !i || i === 2 && c || n.includes(r);
    return u._open = !!(l === 42 ? f : f && (i || !y)), u._close = !!(l === 42 ? y : y && (c || !f)), t(s);
  }
}
function Or(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const Zo = {
  name: "autolink",
  tokenize: Go
};
function Go(e, t, n) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), l;
  }
  function l(p) {
    return Xe(p) ? (e.consume(p), o) : p === 64 ? n(p) : u(p);
  }
  function o(p) {
    return p === 43 || p === 45 || p === 46 || Pe(p) ? (r = 1, a(p)) : u(p);
  }
  function a(p) {
    return p === 58 ? (e.consume(p), r = 0, s) : (p === 43 || p === 45 || p === 46 || Pe(p)) && r++ < 32 ? (e.consume(p), a) : (r = 0, u(p));
  }
  function s(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : p === null || p === 32 || p === 60 || zn(p) ? n(p) : (e.consume(p), s);
  }
  function u(p) {
    return p === 64 ? (e.consume(p), c) : Ro(p) ? (e.consume(p), u) : n(p);
  }
  function c(p) {
    return Pe(p) ? f(p) : n(p);
  }
  function f(p) {
    return p === 46 ? (e.consume(p), r = 0, c) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : y(p);
  }
  function y(p) {
    if ((p === 45 || Pe(p)) && r++ < 63) {
      const w = p === 45 ? y : f;
      return e.consume(p), w;
    }
    return n(p);
  }
}
const an = {
  partial: !0,
  tokenize: qo
};
function qo(e, t, n) {
  return r;
  function r(l) {
    return Q(l) ? re(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || B(l) ? t(l) : n(l);
  }
}
const Ri = {
  continuation: {
    tokenize: Xo
  },
  exit: Ko,
  name: "blockQuote",
  tokenize: Yo
};
function Yo(e, t, n) {
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
    return Q(o) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(o), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(o));
  }
}
function Xo(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return Q(o) ? re(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : l(o);
  }
  function l(o) {
    return e.attempt(Ri, t, n)(o);
  }
}
function Ko(e) {
  e.exit("blockQuote");
}
const Oi = {
  name: "characterEscape",
  tokenize: Jo
};
function Jo(e, t, n) {
  return r;
  function r(l) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(l), e.exit("escapeMarker"), i;
  }
  function i(l) {
    return Po(l) ? (e.enter("characterEscapeValue"), e.consume(l), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(l);
  }
}
const Pi = {
  name: "characterReference",
  tokenize: Qo
};
function Qo(e, t, n) {
  const r = this;
  let i = 0, l, o;
  return a;
  function a(f) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), s;
  }
  function s(f) {
    return f === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(f), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), l = 31, o = Pe, c(f));
  }
  function u(f) {
    return f === 88 || f === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(f), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), l = 6, o = Oo, c) : (e.enter("characterReferenceValue"), l = 7, o = Fn, c(f));
  }
  function c(f) {
    if (f === 59 && i) {
      const y = e.exit("characterReferenceValue");
      return o === Pe && !er(r.sliceSerialize(y)) ? n(f) : (e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return o(f) && i++ < l ? (e.consume(f), c) : n(f);
  }
}
const Pr = {
  partial: !0,
  tokenize: ta
}, zr = {
  concrete: !0,
  name: "codeFenced",
  tokenize: ea
};
function ea(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: X
  };
  let l = 0, o = 0, a;
  return s;
  function s(x) {
    return u(x);
  }
  function u(x) {
    const q = r.events[r.events.length - 1];
    return l = q && q[1].type === "linePrefix" ? q[2].sliceSerialize(q[1], !0).length : 0, a = x, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), c(x);
  }
  function c(x) {
    return x === a ? (o++, e.consume(x), c) : o < 3 ? n(x) : (e.exit("codeFencedFenceSequence"), Q(x) ? re(e, f, "whitespace")(x) : f(x));
  }
  function f(x) {
    return x === null || B(x) ? (e.exit("codeFencedFence"), r.interrupt ? t(x) : e.check(Pr, k, z)(x)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), y(x));
  }
  function y(x) {
    return x === null || B(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), f(x)) : Q(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), re(e, p, "whitespace")(x)) : x === 96 && x === a ? n(x) : (e.consume(x), y);
  }
  function p(x) {
    return x === null || B(x) ? f(x) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), w(x));
  }
  function w(x) {
    return x === null || B(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), f(x)) : x === 96 && x === a ? n(x) : (e.consume(x), w);
  }
  function k(x) {
    return e.attempt(i, z, A)(x);
  }
  function A(x) {
    return e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), b;
  }
  function b(x) {
    return l > 0 && Q(x) ? re(e, D, "linePrefix", l + 1)(x) : D(x);
  }
  function D(x) {
    return x === null || B(x) ? e.check(Pr, k, z)(x) : (e.enter("codeFlowValue"), I(x));
  }
  function I(x) {
    return x === null || B(x) ? (e.exit("codeFlowValue"), D(x)) : (e.consume(x), I);
  }
  function z(x) {
    return e.exit("codeFenced"), t(x);
  }
  function X(x, q, ie) {
    let Z = 0;
    return K;
    function K(W) {
      return x.enter("lineEnding"), x.consume(W), x.exit("lineEnding"), v;
    }
    function v(W) {
      return x.enter("codeFencedFence"), Q(W) ? re(x, M, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(W) : M(W);
    }
    function M(W) {
      return W === a ? (x.enter("codeFencedFenceSequence"), ee(W)) : ie(W);
    }
    function ee(W) {
      return W === a ? (Z++, x.consume(W), ee) : Z >= o ? (x.exit("codeFencedFenceSequence"), Q(W) ? re(x, J, "whitespace")(W) : J(W)) : ie(W);
    }
    function J(W) {
      return W === null || B(W) ? (x.exit("codeFencedFence"), q(W)) : ie(W);
    }
  }
}
function ta(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? n(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
const gn = {
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
    return e.enter("codeIndented"), re(e, l, "linePrefix", 5)(u);
  }
  function l(u) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? o(u) : n(u);
  }
  function o(u) {
    return u === null ? s(u) : B(u) ? e.attempt(na, o, s)(u) : (e.enter("codeFlowValue"), a(u));
  }
  function a(u) {
    return u === null || B(u) ? (e.exit("codeFlowValue"), o(u)) : (e.consume(u), a);
  }
  function s(u) {
    return e.exit("codeIndented"), t(u);
  }
}
function ia(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : B(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : re(e, l, "linePrefix", 5)(o);
  }
  function l(o) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(o) : B(o) ? i(o) : n(o);
  }
}
const la = {
  name: "codeText",
  previous: aa,
  resolve: oa,
  tokenize: sa
};
function oa(e) {
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
  let r = 0, i, l;
  return o;
  function o(f) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(f);
  }
  function a(f) {
    return f === 96 ? (e.consume(f), r++, a) : (e.exit("codeTextSequence"), s(f));
  }
  function s(f) {
    return f === null ? n(f) : f === 32 ? (e.enter("space"), e.consume(f), e.exit("space"), s) : f === 96 ? (l = e.enter("codeTextSequence"), i = 0, c(f)) : B(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(f));
  }
  function u(f) {
    return f === null || f === 32 || f === 96 || B(f) ? (e.exit("codeTextData"), s(f)) : (e.consume(f), u);
  }
  function c(f) {
    return f === 96 ? (e.consume(f), i++, c) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(f)) : (l.type = "codeTextData", u(f));
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
    const l = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && Nt(this.left, r), l.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Nt(this.left, t);
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
    this.setCursor(0), Nt(this.right, t.reverse());
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
        Nt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Nt(this.left, n.reverse());
      }
  }
}
function Nt(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function zi(e) {
  const t = {};
  let n = -1, r, i, l, o, a, s, u;
  const c = new ua(e);
  for (; ++n < c.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = c.get(n), n && r[1].type === "chunkFlow" && c.get(n - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, l = 0, l < s.length && s[l][1].type === "lineEndingBlank" && (l += 2), l < s.length && s[l][1].type === "content"))
      for (; ++l < s.length && s[l][1].type !== "content"; )
        s[l][1].type === "chunkText" && (s[l][1]._isInFirstContentOfListItem = !0, l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, ca(c, n)), n = t[n], u = !0);
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
  return Ke(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !u;
}
function ca(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const l = [];
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const a = o.events, s = [], u = {};
  let c, f, y = -1, p = n, w = 0, k = 0;
  const A = [k];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    l.push(i), p._tokenizer || (c = r.sliceStream(p), p.next || c.push(null), f && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(c), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), f = p, p = p.next;
  }
  for (p = n; ++y < a.length; )
    // Find a void token that includes a break.
    a[y][0] === "exit" && a[y - 1][0] === "enter" && a[y][1].type === a[y - 1][1].type && a[y][1].start.line !== a[y][1].end.line && (k = y + 1, A.push(k), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : A.pop(), y = A.length; y--; ) {
    const b = a.slice(A[y], A[y + 1]), D = l.pop();
    s.push([D, D + b.length - 1]), e.splice(D, 2, b);
  }
  for (s.reverse(), y = -1; ++y < s.length; )
    u[w + s[y][0]] = w + s[y][1], w += s[y][1] - s[y][0] - 1;
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
  return zi(e), e;
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
    return a === null ? l(a) : B(a) ? e.check(ha, o, l)(a) : (e.consume(a), i);
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
function ma(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), re(e, l, "linePrefix");
  }
  function l(o) {
    if (o === null || B(o))
      return n(o);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function Fi(e, t, n, r, i, l, o, a, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let c = 0;
  return f;
  function f(b) {
    return b === 60 ? (e.enter(r), e.enter(i), e.enter(l), e.consume(b), e.exit(l), y) : b === null || b === 32 || b === 41 || zn(b) ? n(b) : (e.enter(r), e.enter(o), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), k(b));
  }
  function y(b) {
    return b === 62 ? (e.enter(l), e.consume(b), e.exit(l), e.exit(i), e.exit(r), t) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), p(b));
  }
  function p(b) {
    return b === 62 ? (e.exit("chunkString"), e.exit(a), y(b)) : b === null || b === 60 || B(b) ? n(b) : (e.consume(b), b === 92 ? w : p);
  }
  function w(b) {
    return b === 60 || b === 62 || b === 92 ? (e.consume(b), p) : p(b);
  }
  function k(b) {
    return !c && (b === null || b === 41 || Ne(b)) ? (e.exit("chunkString"), e.exit(a), e.exit(o), e.exit(r), t(b)) : c < u && b === 40 ? (e.consume(b), c++, k) : b === 41 ? (e.consume(b), c--, k) : b === null || b === 32 || b === 40 || zn(b) ? n(b) : (e.consume(b), b === 92 ? A : k);
  }
  function A(b) {
    return b === 40 || b === 41 || b === 92 ? (e.consume(b), k) : k(b);
  }
}
function Bi(e, t, n, r, i, l) {
  const o = this;
  let a = 0, s;
  return u;
  function u(p) {
    return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(l), c;
  }
  function c(p) {
    return a > 999 || p === null || p === 91 || p === 93 && !s || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !a && "_hiddenFootnoteSupport" in o.parser.constructs ? n(p) : p === 93 ? (e.exit(l), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : B(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), c) : (e.enter("chunkString", {
      contentType: "string"
    }), f(p));
  }
  function f(p) {
    return p === null || p === 91 || p === 93 || B(p) || a++ > 999 ? (e.exit("chunkString"), c(p)) : (e.consume(p), s || (s = !Q(p)), p === 92 ? y : f);
  }
  function y(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), a++, f) : f(p);
  }
}
function Ui(e, t, n, r, i, l) {
  let o;
  return a;
  function a(y) {
    return y === 34 || y === 39 || y === 40 ? (e.enter(r), e.enter(i), e.consume(y), e.exit(i), o = y === 40 ? 41 : y, s) : n(y);
  }
  function s(y) {
    return y === o ? (e.enter(i), e.consume(y), e.exit(i), e.exit(r), t) : (e.enter(l), u(y));
  }
  function u(y) {
    return y === o ? (e.exit(l), s(o)) : y === null ? n(y) : B(y) ? (e.enter("lineEnding"), e.consume(y), e.exit("lineEnding"), re(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), c(y));
  }
  function c(y) {
    return y === o || y === null || B(y) ? (e.exit("chunkString"), u(y)) : (e.consume(y), y === 92 ? f : c);
  }
  function f(y) {
    return y === o || y === 92 ? (e.consume(y), c) : c(y);
  }
}
function Bt(e, t) {
  let n;
  return r;
  function r(i) {
    return B(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : Q(i) ? re(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
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
  return l;
  function l(p) {
    return e.enter("definition"), o(p);
  }
  function o(p) {
    return Bi.call(
      r,
      e,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(p);
  }
  function a(p) {
    return i = At(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), s) : n(p);
  }
  function s(p) {
    return Ne(p) ? Bt(e, u)(p) : u(p);
  }
  function u(p) {
    return Fi(
      e,
      c,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(p);
  }
  function c(p) {
    return e.attempt(ya, f, f)(p);
  }
  function f(p) {
    return Q(p) ? re(e, y, "whitespace")(p) : y(p);
  }
  function y(p) {
    return p === null || B(p) ? (e.exit("definition"), r.parser.defined.push(i), t(p)) : n(p);
  }
}
function wa(e, t, n) {
  return r;
  function r(a) {
    return Ne(a) ? Bt(e, i)(a) : n(a);
  }
  function i(a) {
    return Ui(e, l, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function l(a) {
    return Q(a) ? re(e, o, "whitespace")(a) : o(a);
  }
  function o(a) {
    return a === null || B(a) ? t(a) : n(a);
  }
}
const xa = {
  name: "hardBreakEscape",
  tokenize: ka
};
function ka(e, t, n) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return B(l) ? (e.exit("hardBreakEscape"), t(l)) : n(l);
  }
}
const ba = {
  name: "headingAtx",
  resolve: Sa,
  tokenize: _a
};
function Sa(e, t) {
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
  }, Ke(e, r, n - r + 1, [["enter", i, t], ["enter", l, t], ["exit", l, t], ["exit", i, t]])), e;
}
function _a(e, t, n) {
  let r = 0;
  return i;
  function i(c) {
    return e.enter("atxHeading"), l(c);
  }
  function l(c) {
    return e.enter("atxHeadingSequence"), o(c);
  }
  function o(c) {
    return c === 35 && r++ < 6 ? (e.consume(c), o) : c === null || Ne(c) ? (e.exit("atxHeadingSequence"), a(c)) : n(c);
  }
  function a(c) {
    return c === 35 ? (e.enter("atxHeadingSequence"), s(c)) : c === null || B(c) ? (e.exit("atxHeading"), t(c)) : Q(c) ? re(e, a, "whitespace")(c) : (e.enter("atxHeadingText"), u(c));
  }
  function s(c) {
    return c === 35 ? (e.consume(c), s) : (e.exit("atxHeadingSequence"), a(c));
  }
  function u(c) {
    return c === null || c === 35 || Ne(c) ? (e.exit("atxHeadingText"), a(c)) : (e.consume(c), u);
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
], Fr = ["pre", "script", "style", "textarea"], Ta = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: va,
  tokenize: La
}, Aa = {
  partial: !0,
  tokenize: Ma
}, Ia = {
  partial: !0,
  tokenize: Na
};
function va(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function La(e, t, n) {
  const r = this;
  let i, l, o, a, s;
  return u;
  function u(d) {
    return c(d);
  }
  function c(d) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(d), f;
  }
  function f(d) {
    return d === 33 ? (e.consume(d), y) : d === 47 ? (e.consume(d), l = !0, k) : d === 63 ? (e.consume(d), i = 3, r.interrupt ? t : m) : Xe(d) ? (e.consume(d), o = String.fromCharCode(d), A) : n(d);
  }
  function y(d) {
    return d === 45 ? (e.consume(d), i = 2, p) : d === 91 ? (e.consume(d), i = 5, a = 0, w) : Xe(d) ? (e.consume(d), i = 4, r.interrupt ? t : m) : n(d);
  }
  function p(d) {
    return d === 45 ? (e.consume(d), r.interrupt ? t : m) : n(d);
  }
  function w(d) {
    const pe = "CDATA[";
    return d === pe.charCodeAt(a++) ? (e.consume(d), a === pe.length ? r.interrupt ? t : M : w) : n(d);
  }
  function k(d) {
    return Xe(d) ? (e.consume(d), o = String.fromCharCode(d), A) : n(d);
  }
  function A(d) {
    if (d === null || d === 47 || d === 62 || Ne(d)) {
      const pe = d === 47, V = o.toLowerCase();
      return !pe && !l && Fr.includes(V) ? (i = 1, r.interrupt ? t(d) : M(d)) : Ea.includes(o.toLowerCase()) ? (i = 6, pe ? (e.consume(d), b) : r.interrupt ? t(d) : M(d)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(d) : l ? D(d) : I(d));
    }
    return d === 45 || Pe(d) ? (e.consume(d), o += String.fromCharCode(d), A) : n(d);
  }
  function b(d) {
    return d === 62 ? (e.consume(d), r.interrupt ? t : M) : n(d);
  }
  function D(d) {
    return Q(d) ? (e.consume(d), D) : K(d);
  }
  function I(d) {
    return d === 47 ? (e.consume(d), K) : d === 58 || d === 95 || Xe(d) ? (e.consume(d), z) : Q(d) ? (e.consume(d), I) : K(d);
  }
  function z(d) {
    return d === 45 || d === 46 || d === 58 || d === 95 || Pe(d) ? (e.consume(d), z) : X(d);
  }
  function X(d) {
    return d === 61 ? (e.consume(d), x) : Q(d) ? (e.consume(d), X) : I(d);
  }
  function x(d) {
    return d === null || d === 60 || d === 61 || d === 62 || d === 96 ? n(d) : d === 34 || d === 39 ? (e.consume(d), s = d, q) : Q(d) ? (e.consume(d), x) : ie(d);
  }
  function q(d) {
    return d === s ? (e.consume(d), s = null, Z) : d === null || B(d) ? n(d) : (e.consume(d), q);
  }
  function ie(d) {
    return d === null || d === 34 || d === 39 || d === 47 || d === 60 || d === 61 || d === 62 || d === 96 || Ne(d) ? X(d) : (e.consume(d), ie);
  }
  function Z(d) {
    return d === 47 || d === 62 || Q(d) ? I(d) : n(d);
  }
  function K(d) {
    return d === 62 ? (e.consume(d), v) : n(d);
  }
  function v(d) {
    return d === null || B(d) ? M(d) : Q(d) ? (e.consume(d), v) : n(d);
  }
  function M(d) {
    return d === 45 && i === 2 ? (e.consume(d), de) : d === 60 && i === 1 ? (e.consume(d), le) : d === 62 && i === 4 ? (e.consume(d), G) : d === 63 && i === 3 ? (e.consume(d), m) : d === 93 && i === 5 ? (e.consume(d), Ie) : B(d) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Aa, ce, ee)(d)) : d === null || B(d) ? (e.exit("htmlFlowData"), ee(d)) : (e.consume(d), M);
  }
  function ee(d) {
    return e.check(Ia, J, ce)(d);
  }
  function J(d) {
    return e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), W;
  }
  function W(d) {
    return d === null || B(d) ? ee(d) : (e.enter("htmlFlowData"), M(d));
  }
  function de(d) {
    return d === 45 ? (e.consume(d), m) : M(d);
  }
  function le(d) {
    return d === 47 ? (e.consume(d), o = "", ge) : M(d);
  }
  function ge(d) {
    if (d === 62) {
      const pe = o.toLowerCase();
      return Fr.includes(pe) ? (e.consume(d), G) : M(d);
    }
    return Xe(d) && o.length < 8 ? (e.consume(d), o += String.fromCharCode(d), ge) : M(d);
  }
  function Ie(d) {
    return d === 93 ? (e.consume(d), m) : M(d);
  }
  function m(d) {
    return d === 62 ? (e.consume(d), G) : d === 45 && i === 2 ? (e.consume(d), m) : M(d);
  }
  function G(d) {
    return d === null || B(d) ? (e.exit("htmlFlowData"), ce(d)) : (e.consume(d), G);
  }
  function ce(d) {
    return e.exit("htmlFlow"), t(d);
  }
}
function Na(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return B(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l) : n(o);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function Ma(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(an, t, n);
  }
}
const Da = {
  name: "htmlText",
  tokenize: Ra
};
function Ra(e, t, n) {
  const r = this;
  let i, l, o;
  return a;
  function a(m) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(m), s;
  }
  function s(m) {
    return m === 33 ? (e.consume(m), u) : m === 47 ? (e.consume(m), X) : m === 63 ? (e.consume(m), I) : Xe(m) ? (e.consume(m), ie) : n(m);
  }
  function u(m) {
    return m === 45 ? (e.consume(m), c) : m === 91 ? (e.consume(m), l = 0, w) : Xe(m) ? (e.consume(m), D) : n(m);
  }
  function c(m) {
    return m === 45 ? (e.consume(m), p) : n(m);
  }
  function f(m) {
    return m === null ? n(m) : m === 45 ? (e.consume(m), y) : B(m) ? (o = f, le(m)) : (e.consume(m), f);
  }
  function y(m) {
    return m === 45 ? (e.consume(m), p) : f(m);
  }
  function p(m) {
    return m === 62 ? de(m) : m === 45 ? y(m) : f(m);
  }
  function w(m) {
    const G = "CDATA[";
    return m === G.charCodeAt(l++) ? (e.consume(m), l === G.length ? k : w) : n(m);
  }
  function k(m) {
    return m === null ? n(m) : m === 93 ? (e.consume(m), A) : B(m) ? (o = k, le(m)) : (e.consume(m), k);
  }
  function A(m) {
    return m === 93 ? (e.consume(m), b) : k(m);
  }
  function b(m) {
    return m === 62 ? de(m) : m === 93 ? (e.consume(m), b) : k(m);
  }
  function D(m) {
    return m === null || m === 62 ? de(m) : B(m) ? (o = D, le(m)) : (e.consume(m), D);
  }
  function I(m) {
    return m === null ? n(m) : m === 63 ? (e.consume(m), z) : B(m) ? (o = I, le(m)) : (e.consume(m), I);
  }
  function z(m) {
    return m === 62 ? de(m) : I(m);
  }
  function X(m) {
    return Xe(m) ? (e.consume(m), x) : n(m);
  }
  function x(m) {
    return m === 45 || Pe(m) ? (e.consume(m), x) : q(m);
  }
  function q(m) {
    return B(m) ? (o = q, le(m)) : Q(m) ? (e.consume(m), q) : de(m);
  }
  function ie(m) {
    return m === 45 || Pe(m) ? (e.consume(m), ie) : m === 47 || m === 62 || Ne(m) ? Z(m) : n(m);
  }
  function Z(m) {
    return m === 47 ? (e.consume(m), de) : m === 58 || m === 95 || Xe(m) ? (e.consume(m), K) : B(m) ? (o = Z, le(m)) : Q(m) ? (e.consume(m), Z) : de(m);
  }
  function K(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || Pe(m) ? (e.consume(m), K) : v(m);
  }
  function v(m) {
    return m === 61 ? (e.consume(m), M) : B(m) ? (o = v, le(m)) : Q(m) ? (e.consume(m), v) : Z(m);
  }
  function M(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (e.consume(m), i = m, ee) : B(m) ? (o = M, le(m)) : Q(m) ? (e.consume(m), M) : (e.consume(m), J);
  }
  function ee(m) {
    return m === i ? (e.consume(m), i = void 0, W) : m === null ? n(m) : B(m) ? (o = ee, le(m)) : (e.consume(m), ee);
  }
  function J(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96 ? n(m) : m === 47 || m === 62 || Ne(m) ? Z(m) : (e.consume(m), J);
  }
  function W(m) {
    return m === 47 || m === 62 || Ne(m) ? Z(m) : n(m);
  }
  function de(m) {
    return m === 62 ? (e.consume(m), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(m);
  }
  function le(m) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), ge;
  }
  function ge(m) {
    return Q(m) ? re(e, Ie, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m) : Ie(m);
  }
  function Ie(m) {
    return e.enter("htmlTextData"), o(m);
  }
}
const nr = {
  name: "labelEnd",
  resolveAll: Fa,
  resolveTo: Ba,
  tokenize: Ua
}, Oa = {
  tokenize: Ha
}, Pa = {
  tokenize: ja
}, za = {
  tokenize: Wa
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
  return e.length !== n.length && Ke(e, 0, e.length, n), e;
}
function Ba(e, t) {
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
  return a = [["enter", s, t], ["enter", u, t]], a = ze(a, e.slice(l + 1, l + r + 3)), a = ze(a, [["enter", c, t]]), a = ze(a, tr(t.parser.constructs.insideSpan.null, e.slice(l + r + 4, o - 3), t)), a = ze(a, [["exit", c, t], e[o - 2], e[o - 1], ["exit", u, t]]), a = ze(a, e.slice(o + 1)), a = ze(a, [["exit", s, t]]), Ke(e, l, e.length, a), e;
}
function Ua(e, t, n) {
  const r = this;
  let i = r.events.length, l, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      l = r.events[i][1];
      break;
    }
  return a;
  function a(y) {
    return l ? l._inactive ? f(y) : (o = r.parser.defined.includes(At(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(y), e.exit("labelMarker"), e.exit("labelEnd"), s) : n(y);
  }
  function s(y) {
    return y === 40 ? e.attempt(Oa, c, o ? c : f)(y) : y === 91 ? e.attempt(Pa, c, o ? u : f)(y) : o ? c(y) : f(y);
  }
  function u(y) {
    return e.attempt(za, c, f)(y);
  }
  function c(y) {
    return t(y);
  }
  function f(y) {
    return l._balanced = !0, n(y);
  }
}
function Ha(e, t, n) {
  return r;
  function r(f) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), i;
  }
  function i(f) {
    return Ne(f) ? Bt(e, l)(f) : l(f);
  }
  function l(f) {
    return f === 41 ? c(f) : Fi(e, o, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(f);
  }
  function o(f) {
    return Ne(f) ? Bt(e, s)(f) : c(f);
  }
  function a(f) {
    return n(f);
  }
  function s(f) {
    return f === 34 || f === 39 || f === 40 ? Ui(e, u, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(f) : c(f);
  }
  function u(f) {
    return Ne(f) ? Bt(e, c)(f) : c(f);
  }
  function c(f) {
    return f === 41 ? (e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), e.exit("resource"), t) : n(f);
  }
}
function ja(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return Bi.call(r, e, l, o, "reference", "referenceMarker", "referenceString")(a);
  }
  function l(a) {
    return r.parser.defined.includes(At(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(a) : n(a);
  }
  function o(a) {
    return n(a);
  }
}
function Wa(e, t, n) {
  return r;
  function r(l) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), i;
  }
  function i(l) {
    return l === 93 ? (e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), e.exit("reference"), t) : n(l);
  }
}
const Va = {
  name: "labelStartImage",
  resolveAll: nr.resolveAll,
  tokenize: $a
};
function $a(e, t, n) {
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
const Za = {
  name: "labelStartLink",
  resolveAll: nr.resolveAll,
  tokenize: Ga
};
function Ga(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), l;
  }
  function l(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const yn = {
  name: "lineEnding",
  tokenize: qa
};
function qa(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), re(e, t, "linePrefix");
  }
}
const Kt = {
  name: "thematicBreak",
  tokenize: Ya
};
function Ya(e, t, n) {
  let r = 0, i;
  return l;
  function l(u) {
    return e.enter("thematicBreak"), o(u);
  }
  function o(u) {
    return i = u, a(u);
  }
  function a(u) {
    return u === i ? (e.enter("thematicBreakSequence"), s(u)) : r >= 3 && (u === null || B(u)) ? (e.exit("thematicBreak"), t(u)) : n(u);
  }
  function s(u) {
    return u === i ? (e.consume(u), r++, s) : (e.exit("thematicBreakSequence"), Q(u) ? re(e, a, "whitespace")(u) : a(u));
  }
}
const Le = {
  continuation: {
    tokenize: Qa
  },
  exit: ts,
  name: "list",
  tokenize: Ja
}, Xa = {
  partial: !0,
  tokenize: ns
}, Ka = {
  partial: !0,
  tokenize: es
};
function Ja(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let l = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return a;
  function a(p) {
    const w = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (w === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : Fn(p)) {
      if (r.containerState.type || (r.containerState.type = w, e.enter(w, {
        _container: !0
      })), w === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(Kt, n, u)(p) : u(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(p);
    }
    return n(p);
  }
  function s(p) {
    return Fn(p) && ++o < 10 ? (e.consume(p), s) : (!r.interrupt || o < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), u(p)) : n(p);
  }
  function u(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      an,
      // Can’t be empty when interrupting.
      r.interrupt ? n : c,
      e.attempt(Xa, y, f)
    );
  }
  function c(p) {
    return r.containerState.initialBlankLine = !0, l++, y(p);
  }
  function f(p) {
    return Q(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), y) : n(p);
  }
  function y(p) {
    return r.containerState.size = l + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(p);
  }
}
function Qa(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(an, i, l);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, re(e, t, "listItemIndent", r.containerState.size + 1)(a);
  }
  function l(a) {
    return r.containerState.furtherBlankLines || !Q(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Ka, t, o)(a));
  }
  function o(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, re(e, e.attempt(Le, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function es(e, t, n) {
  const r = this;
  return re(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(l) : n(l);
  }
}
function ts(e) {
  e.exit(this.containerState.type);
}
function ns(e, t, n) {
  const r = this;
  return re(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return !Q(l) && o && o[1].type === "listItemPrefixWhitespace" ? t(l) : n(l);
  }
}
const Br = {
  name: "setextUnderline",
  resolveTo: rs,
  tokenize: is
};
function rs(e, t) {
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
function is(e, t, n) {
  const r = this;
  let i;
  return l;
  function l(u) {
    let c = r.events.length, f;
    for (; c--; )
      if (r.events[c][1].type !== "lineEnding" && r.events[c][1].type !== "linePrefix" && r.events[c][1].type !== "content") {
        f = r.events[c][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || f) ? (e.enter("setextHeadingLine"), i = u, o(u)) : n(u);
  }
  function o(u) {
    return e.enter("setextHeadingLineSequence"), a(u);
  }
  function a(u) {
    return u === i ? (e.consume(u), a) : (e.exit("setextHeadingLineSequence"), Q(u) ? re(e, s, "lineSuffix")(u) : s(u));
  }
  function s(u) {
    return u === null || B(u) ? (e.exit("setextHeadingLine"), t(u)) : n(u);
  }
}
const ls = {
  tokenize: os
};
function os(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    an,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, re(e, e.attempt(this.parser.constructs.flow, i, e.attempt(pa, i)), "linePrefix"))
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
const as = {
  resolveAll: ji()
}, ss = Hi("string"), us = Hi("text");
function Hi(e) {
  return {
    resolveAll: ji(e === "text" ? cs : void 0),
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
      const f = i[c];
      let y = -1;
      if (f)
        for (; ++y < f.length; ) {
          const p = f[y];
          if (!p.previous || p.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function ji(e) {
  return t;
  function t(n, r) {
    let i = -1, l;
    for (; ++i <= n.length; )
      l === void 0 ? n[i] && n[i][1].type === "data" && (l = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== l + 2 && (n[l][1].end = n[i - 1][1].end, n.splice(l + 2, i - l - 2), i = l + 2), l = void 0);
    return e ? e(n, r) : n;
  }
}
function cs(e, t) {
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
const ps = {
  42: Le,
  43: Le,
  45: Le,
  48: Le,
  49: Le,
  50: Le,
  51: Le,
  52: Le,
  53: Le,
  54: Le,
  55: Le,
  56: Le,
  57: Le,
  62: Ri
}, hs = {
  91: ga
}, fs = {
  [-2]: gn,
  [-1]: gn,
  32: gn
}, ds = {
  35: ba,
  42: Kt,
  45: [Br, Kt],
  60: Ta,
  61: Br,
  95: Kt,
  96: zr,
  126: zr
}, ms = {
  38: Pi,
  92: Oi
}, gs = {
  [-5]: yn,
  [-4]: yn,
  [-3]: yn,
  33: Va,
  38: Pi,
  42: Bn,
  60: [Zo, Da],
  91: Za,
  92: [xa, Oi],
  93: nr,
  95: Bn,
  96: la
}, ys = {
  null: [Bn, as]
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
  const i = {}, l = [];
  let o = [], a = [];
  const s = {
    attempt: q(X),
    check: q(x),
    consume: D,
    enter: I,
    exit: z,
    interrupt: q(x, {
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
    sliceSerialize: y,
    sliceStream: p,
    write: f
  };
  let c = t.tokenize.call(u, s);
  return t.resolveAll && l.push(t), u;
  function f(v) {
    return o = ze(o, v), A(), o[o.length - 1] !== null ? [] : (ie(t, 0), u.events = tr(l, u.events, u), u.events);
  }
  function y(v, M) {
    return Ss(p(v), M);
  }
  function p(v) {
    return bs(o, v);
  }
  function w() {
    const {
      _bufferIndex: v,
      _index: M,
      line: ee,
      column: J,
      offset: W
    } = r;
    return {
      _bufferIndex: v,
      _index: M,
      line: ee,
      column: J,
      offset: W
    };
  }
  function k(v) {
    i[v.line] = v.column, K();
  }
  function A() {
    let v;
    for (; r._index < o.length; ) {
      const M = o[r._index];
      if (typeof M == "string")
        for (v = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === v && r._bufferIndex < M.length; )
          b(M.charCodeAt(r._bufferIndex));
      else
        b(M);
    }
  }
  function b(v) {
    c = c(v);
  }
  function D(v) {
    B(v) ? (r.line++, r.column = 1, r.offset += v === -3 ? 2 : 1, K()) : v !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = v;
  }
  function I(v, M) {
    const ee = M || {};
    return ee.type = v, ee.start = w(), u.events.push(["enter", ee, u]), a.push(ee), ee;
  }
  function z(v) {
    const M = a.pop();
    return M.end = w(), u.events.push(["exit", M, u]), M;
  }
  function X(v, M) {
    ie(v, M.from);
  }
  function x(v, M) {
    M.restore();
  }
  function q(v, M) {
    return ee;
    function ee(J, W, de) {
      let le, ge, Ie, m;
      return Array.isArray(J) ? (
        /* c8 ignore next 1 */
        ce(J)
      ) : "tokenize" in J ? (
        // Looks like a construct.
        ce([
          /** @type {Construct} */
          J
        ])
      ) : G(J);
      function G(oe) {
        return Be;
        function Be(we) {
          const Ue = we !== null && oe[we], be = we !== null && oe.null, $e = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ue) ? Ue : Ue ? [Ue] : [],
            ...Array.isArray(be) ? be : be ? [be] : []
          ];
          return ce($e)(we);
        }
      }
      function ce(oe) {
        return le = oe, ge = 0, oe.length === 0 ? de : d(oe[ge]);
      }
      function d(oe) {
        return Be;
        function Be(we) {
          return m = Z(), Ie = oe, oe.partial || (u.currentConstruct = oe), oe.name && u.parser.constructs.disable.null.includes(oe.name) ? V() : oe.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            M ? Object.assign(Object.create(u), M) : u,
            s,
            pe,
            V
          )(we);
        }
      }
      function pe(oe) {
        return v(Ie, m), W;
      }
      function V(oe) {
        return m.restore(), ++ge < le.length ? d(le[ge]) : de;
      }
    }
  }
  function ie(v, M) {
    v.resolveAll && !l.includes(v) && l.push(v), v.resolve && Ke(u.events, M, u.events.length - M, v.resolve(u.events.slice(M), u)), v.resolveTo && (u.events = v.resolveTo(u.events, u));
  }
  function Z() {
    const v = w(), M = u.previous, ee = u.currentConstruct, J = u.events.length, W = Array.from(a);
    return {
      from: J,
      restore: de
    };
    function de() {
      r = v, u.previous = M, u.currentConstruct = ee, u.events.length = J, a = W, K();
    }
  }
  function K() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function bs(e, t) {
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
function Ss(e, t) {
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
function _s(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      No([xs, ...(e || {}).extensions || []])
    ),
    content: i(Bo),
    defined: [],
    document: i(Ho),
    flow: i(ls),
    lazy: {},
    string: i(ss),
    text: i(us)
  };
  return r;
  function i(l) {
    return o;
    function o(a) {
      return ks(r, l, a);
    }
  }
}
function Es(e) {
  for (; !zi(e); )
    ;
  return e;
}
const Ur = /[\0\t\n\r]/g;
function Ts() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(l, o, a) {
    const s = [];
    let u, c, f, y, p;
    for (l = t + (typeof l == "string" ? l.toString() : new TextDecoder(o || void 0).decode(l)), f = 0, t = "", n && (l.charCodeAt(0) === 65279 && f++, n = void 0); f < l.length; ) {
      if (Ur.lastIndex = f, u = Ur.exec(l), y = u && u.index !== void 0 ? u.index : l.length, p = l.charCodeAt(y), !u) {
        t = l.slice(f);
        break;
      }
      if (p === 10 && f === y && r)
        s.push(-3), r = void 0;
      else
        switch (r && (s.push(-5), r = void 0), f < y && (s.push(l.slice(f, y)), e += y - f), p) {
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
const As = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Is(e) {
  return e.replace(As, vs);
}
function vs(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), l = i === 120 || i === 88;
    return Di(n.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return er(n) || e;
}
const Wi = {}.hasOwnProperty;
function Ls(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Ns(n)(Es(_s(n).document().write(Ts()(e, t, !0))));
}
function Ns(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(et),
      autolinkProtocol: Z,
      autolinkEmail: Z,
      atxHeading: l(De),
      blockQuote: l(be),
      characterEscape: Z,
      characterReference: Z,
      codeFenced: l($e),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l($e, o),
      codeText: l(mt, o),
      codeTextData: Z,
      data: Z,
      codeFlowValue: Z,
      definition: l(He),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(Je),
      hardBreakEscape: l(Qe),
      hardBreakTrailing: l(Qe),
      htmlFlow: l(ut, o),
      htmlFlowData: Z,
      htmlText: l(ut, o),
      htmlTextData: Z,
      image: l(Ze),
      label: o,
      link: l(et),
      listItem: l(nt),
      listItemValue: y,
      listOrdered: l(tt, f),
      listUnordered: l(tt),
      paragraph: l(gt),
      reference: d,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: l(De),
      strong: l(Lt),
      thematicBreak: l(rt)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: X,
      autolink: s(),
      autolinkEmail: Ue,
      autolinkProtocol: we,
      blockQuote: s(),
      characterEscapeValue: K,
      characterReferenceMarkerHexadecimal: V,
      characterReferenceMarkerNumeric: V,
      characterReferenceValue: oe,
      characterReference: Be,
      codeFenced: s(A),
      codeFencedFence: k,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: w,
      codeFlowValue: K,
      codeIndented: s(b),
      codeText: s(W),
      codeTextData: K,
      data: K,
      definition: s(),
      definitionDestinationString: z,
      definitionLabelString: D,
      definitionTitleString: I,
      emphasis: s(),
      hardBreakEscape: s(M),
      hardBreakTrailing: s(M),
      htmlFlow: s(ee),
      htmlFlowData: K,
      htmlText: s(J),
      htmlTextData: K,
      image: s(le),
      label: Ie,
      labelText: ge,
      lineEnding: v,
      link: s(de),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: pe,
      resourceDestinationString: m,
      resourceTitleString: G,
      resource: ce,
      setextHeading: s(ie),
      setextHeadingLineSequence: q,
      setextHeadingText: x,
      strong: s(),
      thematicBreak: s()
    }
  };
  Vi(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(C) {
    let E = {
      type: "root",
      children: []
    };
    const F = {
      stack: [E],
      tokenStack: [],
      config: t,
      enter: a,
      exit: u,
      buffer: o,
      resume: c,
      data: n
    }, j = [];
    let Y = -1;
    for (; ++Y < C.length; )
      if (C[Y][1].type === "listOrdered" || C[Y][1].type === "listUnordered")
        if (C[Y][0] === "enter")
          j.push(Y);
        else {
          const xe = j.pop();
          Y = i(C, xe, Y);
        }
    for (Y = -1; ++Y < C.length; ) {
      const xe = t[C[Y][0]];
      Wi.call(xe, C[Y][1].type) && xe[C[Y][1].type].call(Object.assign({
        sliceSerialize: C[Y][2].sliceSerialize
      }, F), C[Y][1]);
    }
    if (F.tokenStack.length > 0) {
      const xe = F.tokenStack[F.tokenStack.length - 1];
      (xe[1] || Hr).call(F, void 0, xe[0]);
    }
    for (E.position = {
      start: ft(C.length > 0 ? C[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: ft(C.length > 0 ? C[C.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Y = -1; ++Y < t.transforms.length; )
      E = t.transforms[Y](E) || E;
    return E;
  }
  function i(C, E, F) {
    let j = E - 1, Y = -1, xe = !1, Re, T, P, U;
    for (; ++j <= F; ) {
      const L = C[j];
      switch (L[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          L[0] === "enter" ? Y++ : Y--, U = void 0;
          break;
        }
        case "lineEndingBlank": {
          L[0] === "enter" && (Re && !U && !Y && !P && (P = j), U = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          U = void 0;
      }
      if (!Y && L[0] === "enter" && L[1].type === "listItemPrefix" || Y === -1 && L[0] === "exit" && (L[1].type === "listUnordered" || L[1].type === "listOrdered")) {
        if (Re) {
          let se = j;
          for (T = void 0; se--; ) {
            const ae = C[se];
            if (ae[1].type === "lineEnding" || ae[1].type === "lineEndingBlank") {
              if (ae[0] === "exit") continue;
              T && (C[T][1].type = "lineEndingBlank", xe = !0), ae[1].type = "lineEnding", T = se;
            } else if (!(ae[1].type === "linePrefix" || ae[1].type === "blockQuotePrefix" || ae[1].type === "blockQuotePrefixWhitespace" || ae[1].type === "blockQuoteMarker" || ae[1].type === "listItemIndent")) break;
          }
          P && (!T || P < T) && (Re._spread = !0), Re.end = Object.assign({}, T ? C[T][1].start : L[1].end), C.splice(T || j, 0, ["exit", Re, L[2]]), j++, F++;
        }
        if (L[1].type === "listItemPrefix") {
          const se = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, L[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Re = se, C.splice(j, 0, ["enter", se, L[2]]), j++, F++, P = void 0, U = !0;
        }
      }
    }
    return C[E][1]._spread = xe, F;
  }
  function l(C, E) {
    return F;
    function F(j) {
      a.call(this, C(j), j), E && E.call(this, j);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(C, E, F) {
    this.stack[this.stack.length - 1].children.push(C), this.stack.push(C), this.tokenStack.push([E, F || void 0]), C.position = {
      start: ft(E.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(C) {
    return E;
    function E(F) {
      C && C.call(this, F), u.call(this, F);
    }
  }
  function u(C, E) {
    const F = this.stack.pop(), j = this.tokenStack.pop();
    if (j)
      j[0].type !== C.type && (E ? E.call(this, C, j[0]) : (j[1] || Hr).call(this, C, j[0]));
    else throw new Error("Cannot close `" + C.type + "` (" + Ft({
      start: C.start,
      end: C.end
    }) + "): it’s not open");
    F.position.end = ft(C.end);
  }
  function c() {
    return vo(this.stack.pop());
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
  function p() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.lang = C;
  }
  function w() {
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
  function D(C) {
    const E = this.resume(), F = this.stack[this.stack.length - 1];
    F.label = E, F.identifier = At(this.sliceSerialize(C)).toLowerCase();
  }
  function I() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = C;
  }
  function z() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = C;
  }
  function X(C) {
    const E = this.stack[this.stack.length - 1];
    if (!E.depth) {
      const F = this.sliceSerialize(C).length;
      E.depth = F;
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function q(C) {
    const E = this.stack[this.stack.length - 1];
    E.depth = this.sliceSerialize(C).codePointAt(0) === 61 ? 1 : 2;
  }
  function ie() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function Z(C) {
    const F = this.stack[this.stack.length - 1].children;
    let j = F[F.length - 1];
    (!j || j.type !== "text") && (j = St(), j.position = {
      start: ft(C.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, F.push(j)), this.stack.push(j);
  }
  function K(C) {
    const E = this.stack.pop();
    E.value += this.sliceSerialize(C), E.position.end = ft(C.end);
  }
  function v(C) {
    const E = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const F = E.children[E.children.length - 1];
      F.position.end = ft(C.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(E.type) && (Z.call(this, C), K.call(this, C));
  }
  function M() {
    this.data.atHardBreak = !0;
  }
  function ee() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = C;
  }
  function J() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = C;
  }
  function W() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = C;
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
  function le() {
    const C = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      C.type += "Reference", C.referenceType = E, delete C.url, delete C.title;
    } else
      delete C.identifier, delete C.label;
    this.data.referenceType = void 0;
  }
  function ge(C) {
    const E = this.sliceSerialize(C), F = this.stack[this.stack.length - 2];
    F.label = Is(E), F.identifier = At(E).toLowerCase();
  }
  function Ie() {
    const C = this.stack[this.stack.length - 1], E = this.resume(), F = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, F.type === "link") {
      const j = C.children;
      F.children = j;
    } else
      F.alt = E;
  }
  function m() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = C;
  }
  function G() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = C;
  }
  function ce() {
    this.data.inReference = void 0;
  }
  function d() {
    this.data.referenceType = "collapsed";
  }
  function pe(C) {
    const E = this.resume(), F = this.stack[this.stack.length - 1];
    F.label = E, F.identifier = At(this.sliceSerialize(C)).toLowerCase(), this.data.referenceType = "full";
  }
  function V(C) {
    this.data.characterReferenceType = C.type;
  }
  function oe(C) {
    const E = this.sliceSerialize(C), F = this.data.characterReferenceType;
    let j;
    F ? (j = Di(E, F === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : j = er(E);
    const Y = this.stack[this.stack.length - 1];
    Y.value += j;
  }
  function Be(C) {
    const E = this.stack.pop();
    E.position.end = ft(C.end);
  }
  function we(C) {
    K.call(this, C);
    const E = this.stack[this.stack.length - 1];
    E.url = this.sliceSerialize(C);
  }
  function Ue(C) {
    K.call(this, C);
    const E = this.stack[this.stack.length - 1];
    E.url = "mailto:" + this.sliceSerialize(C);
  }
  function be() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function $e() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function mt() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function He() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Je() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function De() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Qe() {
    return {
      type: "break"
    };
  }
  function ut() {
    return {
      type: "html",
      value: ""
    };
  }
  function Ze() {
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
  function tt(C) {
    return {
      type: "list",
      ordered: C.type === "listOrdered",
      start: null,
      spread: C._spread,
      children: []
    };
  }
  function nt(C) {
    return {
      type: "listItem",
      spread: C._spread,
      checked: null,
      children: []
    };
  }
  function gt() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Lt() {
    return {
      type: "strong",
      children: []
    };
  }
  function St() {
    return {
      type: "text",
      value: ""
    };
  }
  function rt() {
    return {
      type: "thematicBreak"
    };
  }
}
function ft(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function Vi(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Vi(e, r) : Ms(e, r);
  }
}
function Ms(e, t) {
  let n;
  for (n in t)
    if (Wi.call(t, n))
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
function Hr(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Ft({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Ft({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Ft({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function Ds(e) {
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
function Rs(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Os(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function Ps(e, t) {
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
function Bs(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = vt(r.toLowerCase()), l = e.footnoteOrder.indexOf(r);
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
function Us(e, t) {
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
function $i(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), l = i[0];
  l && l.type === "text" ? l.value = "[" + l.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function js(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return $i(e, t);
  const i = { src: vt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, l), e.applyData(t, l);
}
function Ws(e, t) {
  const n = { src: vt(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function Vs(e, t) {
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
    return $i(e, t);
  const i = { href: vt(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, l), e.applyData(t, l);
}
function Zs(e, t) {
  const n = { href: vt(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Gs(e, t, n) {
  const r = e.all(t), i = n ? qs(n) : Zi(t), l = {}, o = [];
  if (typeof t.checked == "boolean") {
    const c = r[0];
    let f;
    c && c.type === "element" && c.tagName === "p" ? f = c : (f = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(f)), f.children.length > 0 && f.children.unshift({ type: "text", value: " " }), f.children.unshift({
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
function qs(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = Zi(n[r]);
  }
  return t;
}
function Zi(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function Ys(e, t) {
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
function Xs(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Ks(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Js(e, t) {
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
    }, a = Xn(t.children[1]), s = Ti(t.children[t.children.length - 1]);
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
function eu(e, t, n) {
  const r = n ? n.children : void 0, l = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, a = o ? o.length : t.children.length;
  let s = -1;
  const u = [];
  for (; ++s < a; ) {
    const f = t.children[s], y = {}, p = o ? o[s] : void 0;
    p && (y.align = p);
    let w = { type: "element", tagName: l, properties: y, children: [] };
    f && (w.children = e.all(f), e.patch(f, w), w = e.applyData(f, w)), u.push(w);
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
const jr = 9, Wr = 32;
function nu(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const l = [];
  for (; r; )
    l.push(
      Vr(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return l.push(Vr(t.slice(i), i > 0, !1)), l.join("");
}
function Vr(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let l = e.codePointAt(r);
    for (; l === jr || l === Wr; )
      r++, l = e.codePointAt(r);
  }
  if (n) {
    let l = e.codePointAt(i - 1);
    for (; l === jr || l === Wr; )
      i--, l = e.codePointAt(i - 1);
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
const lu = {
  blockquote: Rs,
  break: Os,
  code: Ps,
  delete: zs,
  emphasis: Fs,
  footnoteReference: Bs,
  heading: Us,
  html: Hs,
  imageReference: js,
  image: Ws,
  inlineCode: Vs,
  linkReference: $s,
  link: Zs,
  listItem: Gs,
  list: Ys,
  paragraph: Xs,
  // @ts-expect-error: root is different, but hard to type.
  root: Ks,
  strong: Js,
  table: Qs,
  tableCell: tu,
  tableRow: eu,
  text: ru,
  thematicBreak: iu,
  toml: Zt,
  yaml: Zt,
  definition: Zt,
  footnoteDefinition: Zt
};
function Zt() {
}
const Gi = -1, sn = 0, Ut = 1, nn = 2, rr = 3, ir = 4, lr = 5, or = 6, qi = 7, Yi = 8, $r = typeof self == "object" ? self : globalThis, ou = (e, t) => {
  const n = (i, l) => (e.set(l, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [l, o] = t[i];
    switch (l) {
      case sn:
      case Gi:
        return n(o, i);
      case Ut: {
        const a = n([], i);
        for (const s of o)
          a.push(r(s));
        return a;
      }
      case nn: {
        const a = n({}, i);
        for (const [s, u] of o)
          a[r(s)] = r(u);
        return a;
      }
      case rr:
        return n(new Date(o), i);
      case ir: {
        const { source: a, flags: s } = o;
        return n(new RegExp(a, s), i);
      }
      case lr: {
        const a = n(/* @__PURE__ */ new Map(), i);
        for (const [s, u] of o)
          a.set(r(s), r(u));
        return a;
      }
      case or: {
        const a = n(/* @__PURE__ */ new Set(), i);
        for (const s of o)
          a.add(r(s));
        return a;
      }
      case qi: {
        const { name: a, message: s } = o;
        return n(new $r[a](s), i);
      }
      case Yi:
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
    return n(new $r[l](o), i);
  };
  return r;
}, Zr = (e) => ou(/* @__PURE__ */ new Map(), e)(0), Et = "", { toString: au } = {}, { keys: su } = Object, Mt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [sn, t];
  const n = au.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [Ut, Et];
    case "Object":
      return [nn, Et];
    case "Date":
      return [rr, Et];
    case "RegExp":
      return [ir, Et];
    case "Map":
      return [lr, Et];
    case "Set":
      return [or, Et];
    case "DataView":
      return [Ut, n];
  }
  return n.includes("Array") ? [Ut, n] : n.includes("Error") ? [qi, n] : [nn, n];
}, Gt = ([e, t]) => e === sn && (t === "function" || t === "symbol"), uu = (e, t, n, r) => {
  const i = (o, a) => {
    const s = r.push(o) - 1;
    return n.set(a, s), s;
  }, l = (o) => {
    if (n.has(o))
      return n.get(o);
    let [a, s] = Mt(o);
    switch (a) {
      case sn: {
        let c = o;
        switch (s) {
          case "bigint":
            a = Yi, c = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            c = null;
            break;
          case "undefined":
            return i([Gi], o);
        }
        return i([a, c], o);
      }
      case Ut: {
        if (s) {
          let y = o;
          return s === "DataView" ? y = new Uint8Array(o.buffer) : s === "ArrayBuffer" && (y = new Uint8Array(o)), i([s, [...y]], o);
        }
        const c = [], f = i([a, c], o);
        for (const y of o)
          c.push(l(y));
        return f;
      }
      case nn: {
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
        const c = [], f = i([a, c], o);
        for (const y of su(o))
          (e || !Gt(Mt(o[y]))) && c.push([l(y), l(o[y])]);
        return f;
      }
      case rr:
        return i([a, o.toISOString()], o);
      case ir: {
        const { source: c, flags: f } = o;
        return i([a, { source: c, flags: f }], o);
      }
      case lr: {
        const c = [], f = i([a, c], o);
        for (const [y, p] of o)
          (e || !(Gt(Mt(y)) || Gt(Mt(p)))) && c.push([l(y), l(p)]);
        return f;
      }
      case or: {
        const c = [], f = i([a, c], o);
        for (const y of o)
          (e || !Gt(Mt(y))) && c.push(l(y));
        return f;
      }
    }
    const { message: u } = o;
    return i([a, { name: s, message: u }], o);
  };
  return l;
}, Gr = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return uu(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, rn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Zr(Gr(e, t)) : structuredClone(e)
) : (e, t) => Zr(Gr(e, t));
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
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || cu, r = e.options.footnoteBackLabel || pu, i = e.options.footnoteLabel || "Footnotes", l = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!u)
      continue;
    const c = e.all(u), f = String(u.identifier).toUpperCase(), y = vt(f.toLowerCase());
    let p = 0;
    const w = [], k = e.footnoteCounts.get(f);
    for (; k !== void 0 && ++p <= k; ) {
      w.length > 0 && w.push({ type: "text", value: " " });
      let D = typeof n == "string" ? n : n(s, p);
      typeof D == "string" && (D = { type: "text", value: D }), w.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + y + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(D) ? D : [D]
      });
    }
    const A = c[c.length - 1];
    if (A && A.type === "element" && A.tagName === "p") {
      const D = A.children[A.children.length - 1];
      D && D.type === "text" ? D.value += " " : A.children.push({ type: "text", value: " " }), A.children.push(...w);
    } else
      c.push(...w);
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
          tagName: l,
          properties: {
            ...rn(o),
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
const Xi = (
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
      return un(e);
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
    t[n] = Xi(e[n]);
  return un(r);
  function r(...i) {
    let l = -1;
    for (; ++l < t.length; )
      if (t[l].apply(this, i)) return !0;
    return !1;
  }
}
function du(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return un(n);
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
function mu(e) {
  return un(t);
  function t(n) {
    return n && n.type === e;
  }
}
function un(e) {
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
const Ki = [], Cu = !0, qr = !1, wu = "skip";
function xu(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const l = Xi(i), o = r ? -1 : 1;
  a(e, void 0, [])();
  function a(s, u, c) {
    const f = (
      /** @type {Record<string, unknown>} */
      s && typeof s == "object" ? s : {}
    );
    if (typeof f.type == "string") {
      const p = (
        // `hast`
        typeof f.tagName == "string" ? f.tagName : (
          // `xast`
          typeof f.name == "string" ? f.name : void 0
        )
      );
      Object.defineProperty(y, "name", {
        value: "node (" + (s.type + (p ? "<" + p + ">" : "")) + ")"
      });
    }
    return y;
    function y() {
      let p = Ki, w, k, A;
      if ((!t || l(s, u, c[c.length - 1] || void 0)) && (p = ku(n(s, c)), p[0] === qr))
        return p;
      if ("children" in s && s.children) {
        const b = (
          /** @type {UnistParent} */
          s
        );
        if (b.children && p[0] !== wu)
          for (k = (r ? b.children.length : -1) + o, A = c.concat(b); k > -1 && k < b.children.length; ) {
            const D = b.children[k];
            if (w = a(D, k, A)(), w[0] === qr)
              return w;
            k = typeof w[1] == "number" ? w[1] : k + o;
          }
      }
      return p;
    }
  }
}
function ku(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Cu, e] : e == null ? Ki : [e];
}
function Ji(e, t, n, r) {
  let i, l, o;
  typeof t == "function" && typeof n != "function" ? (l = void 0, o = t, i = n) : (l = t, o = n, i = r), xu(e, l, a, i);
  function a(s, u) {
    const c = u[u.length - 1], f = c ? c.children.indexOf(s) : void 0;
    return o(s, f, c);
  }
}
const Un = {}.hasOwnProperty, bu = {};
function Su(e, t) {
  const n = t || bu, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), o = { ...lu, ...n.handlers }, a = {
    all: u,
    applyData: Eu,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: l,
    footnoteOrder: [],
    handlers: o,
    one: s,
    options: n,
    patch: _u,
    wrap: Au
  };
  return Ji(e, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const f = c.type === "definition" ? r : i, y = String(c.identifier).toUpperCase();
      f.has(y) || f.set(y, c);
    }
  }), a;
  function s(c, f) {
    const y = c.type, p = a.handlers[y];
    if (Un.call(a.handlers, y) && p)
      return p(a, c, f);
    if (a.options.passThrough && a.options.passThrough.includes(y)) {
      if ("children" in c) {
        const { children: k, ...A } = c, b = rn(A);
        return b.children = a.all(c), b;
      }
      return rn(c);
    }
    return (a.options.unknownHandler || Tu)(a, c, f);
  }
  function u(c) {
    const f = [];
    if ("children" in c) {
      const y = c.children;
      let p = -1;
      for (; ++p < y.length; ) {
        const w = a.one(y[p], c);
        if (w) {
          if (p && y[p - 1].type === "break" && (!Array.isArray(w) && w.type === "text" && (w.value = Yr(w.value)), !Array.isArray(w) && w.type === "element")) {
            const k = w.children[0];
            k && k.type === "text" && (k.value = Yr(k.value));
          }
          Array.isArray(w) ? f.push(...w) : f.push(w);
        }
      }
    }
    return f;
  }
}
function _u(e, t) {
  e.position && (t.position = oo(e));
}
function Eu(e, t) {
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
    n.type === "element" && l && Object.assign(n.properties, rn(l)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function Tu(e, t) {
  const n = t.data || {}, r = "value" in t && !(Un.call(n, "hProperties") || Un.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Au(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Yr(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function Xr(e, t) {
  const n = Su(e, t), r = n.one(e, void 0), i = hu(n), l = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && l.children.push({ type: "text", value: `
` }, i), l;
}
function Iu(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      Xr(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      Xr(n, { file: r, ...e || t })
    );
  };
}
function Kr(e) {
  if (e)
    throw e;
}
var Jt = Object.prototype.hasOwnProperty, Qi = Object.prototype.toString, Jr = Object.defineProperty, Qr = Object.getOwnPropertyDescriptor, ei = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : Qi.call(t) === "[object Array]";
}, ti = function(t) {
  if (!t || Qi.call(t) !== "[object Object]")
    return !1;
  var n = Jt.call(t, "constructor"), r = t.constructor && t.constructor.prototype && Jt.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || Jt.call(t, i);
}, ni = function(t, n) {
  Jr && n.name === "__proto__" ? Jr(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, ri = function(t, n) {
  if (n === "__proto__")
    if (Jt.call(t, n)) {
      if (Qr)
        return Qr(t, n).value;
    } else return;
  return t[n];
}, vu = function e() {
  var t, n, r, i, l, o, a = arguments[0], s = 1, u = arguments.length, c = !1;
  for (typeof a == "boolean" && (c = a, a = arguments[1] || {}, s = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); s < u; ++s)
    if (t = arguments[s], t != null)
      for (n in t)
        r = ri(a, n), i = ri(t, n), a !== i && (c && i && (ti(i) || (l = ei(i))) ? (l ? (l = !1, o = r && ei(r) ? r : []) : o = r && ti(r) ? r : {}, ni(a, { name: n, newValue: e(c, o, i) })) : typeof i < "u" && ni(a, { name: n, newValue: i }));
  return a;
};
const Cn = /* @__PURE__ */ Ei(vu);
function Hn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Lu() {
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
      let f = -1;
      if (s) {
        o(s);
        return;
      }
      for (; ++f < i.length; )
        (u[f] === null || u[f] === void 0) && (u[f] = i[f]);
      i = u, c ? Nu(c, a)(...u) : o(null, ...u);
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
function Nu(e, t) {
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
const Ye = { basename: Mu, dirname: Du, extname: Ru, join: Ou, sep: "/" };
function Mu(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  Wt(e);
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
function Du(e) {
  if (Wt(e), e.length === 0)
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
function Ru(e) {
  Wt(e);
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
function Ou(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    Wt(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : Pu(n);
}
function Pu(e) {
  Wt(e);
  const t = e.codePointAt(0) === 47;
  let n = zu(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function zu(e, t) {
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
function Wt(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const Fu = { cwd: Bu };
function Bu() {
  return "/";
}
function jn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Uu(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!jn(e)) {
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
const wn = (
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
class el {
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
    t ? jn(t) ? n = { path: t } : typeof t == "string" || ju(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : Fu.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < wn.length; ) {
      const l = wn[r];
      l in n && n[l] !== void 0 && n[l] !== null && (this[l] = l === "history" ? [...n[l]] : n[l]);
    }
    let i;
    for (i in n)
      wn.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Ye.basename(this.path) : void 0;
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
    kn(t, "basename"), xn(t, "basename"), this.path = Ye.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Ye.dirname(this.path) : void 0;
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
    ii(this.basename, "dirname"), this.path = Ye.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Ye.extname(this.path) : void 0;
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
    if (xn(t, "extname"), ii(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Ye.join(this.dirname, this.stem + (t || ""));
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
    jn(t) && (t = Uu(t)), kn(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Ye.basename(this.path, this.extname) : void 0;
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
    kn(t, "stem"), xn(t, "stem"), this.path = Ye.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new _e(
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
function xn(e, t) {
  if (e && e.includes(Ye.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + Ye.sep + "`"
    );
}
function kn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function ii(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function ju(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Wu = (
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
), Vu = {}.hasOwnProperty;
class ar extends Wu {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Lu();
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
      new ar()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Cn(!0, {}, this.namespace)), t;
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
    return typeof t == "string" ? arguments.length === 2 ? (_n("data", this.frozen), this.namespace[t] = n, this) : Vu.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (_n("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = qt(t), r = this.parser || this.Parser;
    return bn("parse", r), r(String(n), n);
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
    return this.freeze(), bn("process", this.parser || this.Parser), Sn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(l, o) {
      const a = qt(t), s = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(s, a, function(c, f, y) {
        if (c || !f || !y)
          return u(c);
        const p = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          f
        ), w = r.stringify(p, y);
        Gu(w) ? y.value = w : y.result = w, u(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          y
        );
      });
      function u(c, f) {
        c || !f ? o(c) : l ? l(f) : n(void 0, f);
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
    return this.freeze(), bn("processSync", this.parser || this.Parser), Sn("processSync", this.compiler || this.Compiler), this.process(t, i), oi("processSync", "process", n), r;
    function i(l, o) {
      n = !0, Kr(l), r = o;
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
    return !r && typeof n == "function" && (r = n, n = void 0), r ? l(void 0, r) : new Promise(l);
    function l(o, a) {
      const s = qt(n);
      i.run(t, s, u);
      function u(c, f, y) {
        const p = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          f || t
        );
        c ? a(c) : o ? o(p) : r(void 0, p, y);
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
    return this.run(t, n, l), oi("runSync", "run", r), i;
    function l(o, a) {
      Kr(o), i = a, r = !0;
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
    const r = qt(n), i = this.compiler || this.Compiler;
    return Sn("stringify", i), li(t), i(t, r);
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
    if (_n("use", this.frozen), t != null) if (typeof t == "function")
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
          const [c, ...f] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          s(c, f);
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
      a(u.plugins), u.settings && (i.settings = Cn(!0, i.settings, u.settings));
    }
    function a(u) {
      let c = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++c < u.length; ) {
          const f = u[c];
          l(f);
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
        let [p, ...w] = c;
        const k = r[y][1];
        Hn(k) && Hn(p) && (p = Cn(!0, k, p)), r[y] = [u, p, ...w];
      }
    }
  }
}
const $u = new ar().freeze();
function bn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Sn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function _n(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function li(e) {
  if (!Hn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function oi(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function qt(e) {
  return Zu(e) ? e : new el(e);
}
function Zu(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Gu(e) {
  return typeof e == "string" || qu(e);
}
function qu(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Yu = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", ai = [], si = { allowDangerousHtml: !0 }, Xu = /^(https?|ircs?|mailto|xmpp)$/i, Ku = [
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
function ln(e) {
  const t = Ju(e), n = Qu(e);
  return ec(t.runSync(t.parse(n), n), e);
}
function Ju(e) {
  const t = e.rehypePlugins || ai, n = e.remarkPlugins || ai, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...si } : si;
  return $u().use(Ds).use(n).use(Iu, r).use(t);
}
function Qu(e) {
  const t = e.children || "", n = new el();
  return typeof t == "string" && (n.value = t), n;
}
function ec(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, l = t.disallowedElements, o = t.skipHtml, a = t.unwrapDisallowed, s = t.urlTransform || tc;
  for (const c of Ku)
    Object.hasOwn(t, c.from) && ("" + c.from + (c.to ? "use `" + c.to + "` instead" : "remove it") + Yu + c.id, void 0);
  return Ji(e, u), po(e, {
    Fragment: Nn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: h,
    jsxs: O,
    passKeys: !0,
    passNode: !0
  });
  function u(c, f, y) {
    if (c.type === "raw" && y && typeof f == "number")
      return o ? y.children.splice(f, 1) : y.children[f] = { type: "text", value: c.value }, f;
    if (c.type === "element") {
      let p;
      for (p in mn)
        if (Object.hasOwn(mn, p) && Object.hasOwn(c.properties, p)) {
          const w = c.properties[p], k = mn[p];
          (k === null || k.includes(c.tagName)) && (c.properties[p] = s(String(w || ""), p, c));
        }
    }
    if (c.type === "element") {
      let p = n ? !n.includes(c.tagName) : l ? l.includes(c.tagName) : !1;
      if (!p && r && typeof f == "number" && (p = !r(c, f, y)), p && y && typeof f == "number")
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
const Ve = (...e) => e.filter(Boolean).join(" "), nc = () => /* @__PURE__ */ O(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ O("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ h(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            "shape-rendering": "crispEdges"
          }
        ),
        /* @__PURE__ */ h("g", { "clip-path": "url(#clip0_121_23927)", children: /* @__PURE__ */ h(
          "path",
          {
            d: "M16.3333 26.3541L18.2133 28.2341L25.6666 20.7941V37.0208H28.3333V20.7941L35.7733 28.2474L37.6666 26.3541L26.9999 15.6874L16.3333 26.3541Z",
            fill: "white"
          }
        ) })
      ] }),
      /* @__PURE__ */ O("defs", { children: [
        /* @__PURE__ */ O(
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
              /* @__PURE__ */ h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }),
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
), rc = ({ className: e, ...t }) => /* @__PURE__ */ h("form", { className: Ve("chat-wrapper__prompt-input", e), ...t }), tl = ml(
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
          const f = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          c.dispatchEvent(f);
        }
      }
      l == null || l(u);
    };
    return /* @__PURE__ */ h(
      "textarea",
      {
        ref: a,
        className: Ve("chat-wrapper__prompt-textarea", t),
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
tl.displayName = "PromptInputTextarea";
const ic = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: Ve("chat-wrapper__prompt-toolbar", e), ...t }), lc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h("div", { className: Ve("chat-wrapper__prompt-tools", e), ...t }), oc = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const l = t === "default" && (typeof r == "string" || dl.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ h(
    "button",
    {
      className: Ve(
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
}, ac = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = "idle",
  children: i,
  disabled: l,
  ...o
}) => {
  let a = /* @__PURE__ */ h(nc, {});
  const s = l || r === "submitted" || r === "streaming";
  return /* @__PURE__ */ h(
    "button",
    {
      className: Ve(
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
}, Gc = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ h("select", { className: Ve("chat-wrapper__prompt-select", e), ...n, children: t }), qc = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ h(
  "button",
  {
    className: Ve("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), Yc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ h(
  "div",
  {
    className: Ve("chat-wrapper__prompt-select-content", e),
    ...t
  }
), Xc = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ h(
  "div",
  {
    className: Ve("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), Kc = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ h(
  "span",
  {
    className: Ve("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
);
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: nl,
  setPrototypeOf: ui,
  isFrozen: sc,
  getPrototypeOf: uc,
  getOwnPropertyDescriptor: cc
} = Object;
let {
  freeze: Te,
  seal: Fe,
  create: Wn
} = Object, {
  apply: Vn,
  construct: $n
} = typeof Reflect < "u" && Reflect;
Te || (Te = function(t) {
  return t;
});
Fe || (Fe = function(t) {
  return t;
});
Vn || (Vn = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), l = 2; l < r; l++)
    i[l - 2] = arguments[l];
  return t.apply(n, i);
});
$n || ($n = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const Yt = Ae(Array.prototype.forEach), pc = Ae(Array.prototype.lastIndexOf), ci = Ae(Array.prototype.pop), Dt = Ae(Array.prototype.push), hc = Ae(Array.prototype.splice), Qt = Ae(String.prototype.toLowerCase), En = Ae(String.prototype.toString), Tn = Ae(String.prototype.match), Rt = Ae(String.prototype.replace), fc = Ae(String.prototype.indexOf), dc = Ae(String.prototype.trim), We = Ae(Object.prototype.hasOwnProperty), Ee = Ae(RegExp.prototype.test), Ot = mc(TypeError);
function Ae(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Vn(e, t, r);
  };
}
function mc(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return $n(e, n);
  };
}
function $(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Qt;
  ui && ui(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const l = n(i);
      l !== i && (sc(t) || (t[r] = l), i = l);
    }
    e[i] = !0;
  }
  return e;
}
function gc(e) {
  for (let t = 0; t < e.length; t++)
    We(e, t) || (e[t] = null);
  return e;
}
function st(e) {
  const t = Wn(null);
  for (const [n, r] of nl(e))
    We(e, n) && (Array.isArray(r) ? t[n] = gc(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = st(r) : t[n] = r);
  return t;
}
function Pt(e, t) {
  for (; e !== null; ) {
    const r = cc(e, t);
    if (r) {
      if (r.get)
        return Ae(r.get);
      if (typeof r.value == "function")
        return Ae(r.value);
    }
    e = uc(e);
  }
  function n() {
    return null;
  }
  return n;
}
const pi = Te(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), An = Te(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), In = Te(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), yc = Te(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), vn = Te(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Cc = Te(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), hi = Te(["#text"]), fi = Te(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Ln = Te(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), di = Te(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Xt = Te(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), wc = Fe(/\{\{[\w\W]*|[\w\W]*\}\}/gm), xc = Fe(/<%[\w\W]*|[\w\W]*%>/gm), kc = Fe(/\$\{[\w\W]*/gm), bc = Fe(/^data-[\-\w.\u00B7-\uFFFF]+$/), Sc = Fe(/^aria-[\-\w]+$/), rl = Fe(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), _c = Fe(/^(?:\w+script|data):/i), Ec = Fe(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), il = Fe(/^html$/i), Tc = Fe(/^[a-z][.\w]*(-[.\w]+)+$/i);
var mi = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Sc,
  ATTR_WHITESPACE: Ec,
  CUSTOM_ELEMENT: Tc,
  DATA_ATTR: bc,
  DOCTYPE_NAME: il,
  ERB_EXPR: xc,
  IS_ALLOWED_URI: rl,
  IS_SCRIPT_OR_DATA: _c,
  MUSTACHE_EXPR: wc,
  TMPLIT_EXPR: kc
});
const zt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Ac = function() {
  return typeof window > "u" ? null : window;
}, Ic = function(t, n) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let r = null;
  const i = "data-tt-policy-suffix";
  n && n.hasAttribute(i) && (r = n.getAttribute(i));
  const l = "dompurify" + (r ? "#" + r : "");
  try {
    return t.createPolicy(l, {
      createHTML(o) {
        return o;
      },
      createScriptURL(o) {
        return o;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + l + " could not be created."), null;
  }
}, gi = function() {
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
function ll() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ac();
  const t = (R) => ll(R);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== zt.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: l,
    HTMLTemplateElement: o,
    Node: a,
    Element: s,
    NodeFilter: u,
    NamedNodeMap: c = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: f,
    DOMParser: y,
    trustedTypes: p
  } = e, w = s.prototype, k = Pt(w, "cloneNode"), A = Pt(w, "remove"), b = Pt(w, "nextSibling"), D = Pt(w, "childNodes"), I = Pt(w, "parentNode");
  if (typeof o == "function") {
    const R = n.createElement("template");
    R.content && R.content.ownerDocument && (n = R.content.ownerDocument);
  }
  let z, X = "";
  const {
    implementation: x,
    createNodeIterator: q,
    createDocumentFragment: ie,
    getElementsByTagName: Z
  } = n, {
    importNode: K
  } = r;
  let v = gi();
  t.isSupported = typeof nl == "function" && typeof I == "function" && x && x.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: M,
    ERB_EXPR: ee,
    TMPLIT_EXPR: J,
    DATA_ATTR: W,
    ARIA_ATTR: de,
    IS_SCRIPT_OR_DATA: le,
    ATTR_WHITESPACE: ge,
    CUSTOM_ELEMENT: Ie
  } = mi;
  let {
    IS_ALLOWED_URI: m
  } = mi, G = null;
  const ce = $({}, [...pi, ...An, ...In, ...vn, ...hi]);
  let d = null;
  const pe = $({}, [...fi, ...Ln, ...di, ...Xt]);
  let V = Object.seal(Wn(null, {
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
  })), oe = null, Be = null;
  const we = Object.seal(Wn(null, {
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
  let Ue = !0, be = !0, $e = !1, mt = !0, He = !1, Je = !0, De = !1, Qe = !1, ut = !1, Ze = !1, et = !1, tt = !1, nt = !0, gt = !1;
  const Lt = "user-content-";
  let St = !0, rt = !1, C = {}, E = null;
  const F = $({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let j = null;
  const Y = $({}, ["audio", "video", "img", "source", "image", "track"]);
  let xe = null;
  const Re = $({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), T = "http://www.w3.org/1998/Math/MathML", P = "http://www.w3.org/2000/svg", U = "http://www.w3.org/1999/xhtml";
  let L = U, se = !1, ae = null;
  const ct = $({}, [T, P, U], En);
  let pt = $({}, ["mi", "mo", "mn", "ms", "mtext"]), it = $({}, ["annotation-xml"]);
  const cn = $({}, ["title", "style", "font", "a", "script"]);
  let Ge = null;
  const yt = ["application/xhtml+xml", "text/html"], lt = "text/html";
  let te = null, je = null;
  const ht = n.createElement("form"), Vt = function(g) {
    return g instanceof RegExp || g instanceof Function;
  }, pn = function() {
    let g = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(je && je === g)) {
      if ((!g || typeof g != "object") && (g = {}), g = st(g), Ge = // eslint-disable-next-line unicorn/prefer-includes
      yt.indexOf(g.PARSER_MEDIA_TYPE) === -1 ? lt : g.PARSER_MEDIA_TYPE, te = Ge === "application/xhtml+xml" ? En : Qt, G = We(g, "ALLOWED_TAGS") ? $({}, g.ALLOWED_TAGS, te) : ce, d = We(g, "ALLOWED_ATTR") ? $({}, g.ALLOWED_ATTR, te) : pe, ae = We(g, "ALLOWED_NAMESPACES") ? $({}, g.ALLOWED_NAMESPACES, En) : ct, xe = We(g, "ADD_URI_SAFE_ATTR") ? $(st(Re), g.ADD_URI_SAFE_ATTR, te) : Re, j = We(g, "ADD_DATA_URI_TAGS") ? $(st(Y), g.ADD_DATA_URI_TAGS, te) : Y, E = We(g, "FORBID_CONTENTS") ? $({}, g.FORBID_CONTENTS, te) : F, oe = We(g, "FORBID_TAGS") ? $({}, g.FORBID_TAGS, te) : st({}), Be = We(g, "FORBID_ATTR") ? $({}, g.FORBID_ATTR, te) : st({}), C = We(g, "USE_PROFILES") ? g.USE_PROFILES : !1, Ue = g.ALLOW_ARIA_ATTR !== !1, be = g.ALLOW_DATA_ATTR !== !1, $e = g.ALLOW_UNKNOWN_PROTOCOLS || !1, mt = g.ALLOW_SELF_CLOSE_IN_ATTR !== !1, He = g.SAFE_FOR_TEMPLATES || !1, Je = g.SAFE_FOR_XML !== !1, De = g.WHOLE_DOCUMENT || !1, Ze = g.RETURN_DOM || !1, et = g.RETURN_DOM_FRAGMENT || !1, tt = g.RETURN_TRUSTED_TYPE || !1, ut = g.FORCE_BODY || !1, nt = g.SANITIZE_DOM !== !1, gt = g.SANITIZE_NAMED_PROPS || !1, St = g.KEEP_CONTENT !== !1, rt = g.IN_PLACE || !1, m = g.ALLOWED_URI_REGEXP || rl, L = g.NAMESPACE || U, pt = g.MATHML_TEXT_INTEGRATION_POINTS || pt, it = g.HTML_INTEGRATION_POINTS || it, V = g.CUSTOM_ELEMENT_HANDLING || {}, g.CUSTOM_ELEMENT_HANDLING && Vt(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (V.tagNameCheck = g.CUSTOM_ELEMENT_HANDLING.tagNameCheck), g.CUSTOM_ELEMENT_HANDLING && Vt(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (V.attributeNameCheck = g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), g.CUSTOM_ELEMENT_HANDLING && typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (V.allowCustomizedBuiltInElements = g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), He && (be = !1), et && (Ze = !0), C && (G = $({}, hi), d = [], C.html === !0 && ($(G, pi), $(d, fi)), C.svg === !0 && ($(G, An), $(d, Ln), $(d, Xt)), C.svgFilters === !0 && ($(G, In), $(d, Ln), $(d, Xt)), C.mathMl === !0 && ($(G, vn), $(d, di), $(d, Xt))), g.ADD_TAGS && (typeof g.ADD_TAGS == "function" ? we.tagCheck = g.ADD_TAGS : (G === ce && (G = st(G)), $(G, g.ADD_TAGS, te))), g.ADD_ATTR && (typeof g.ADD_ATTR == "function" ? we.attributeCheck = g.ADD_ATTR : (d === pe && (d = st(d)), $(d, g.ADD_ATTR, te))), g.ADD_URI_SAFE_ATTR && $(xe, g.ADD_URI_SAFE_ATTR, te), g.FORBID_CONTENTS && (E === F && (E = st(E)), $(E, g.FORBID_CONTENTS, te)), St && (G["#text"] = !0), De && $(G, ["html", "head", "body"]), G.table && ($(G, ["tbody"]), delete oe.tbody), g.TRUSTED_TYPES_POLICY) {
        if (typeof g.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Ot('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof g.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Ot('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        z = g.TRUSTED_TYPES_POLICY, X = z.createHTML("");
      } else
        z === void 0 && (z = Ic(p, i)), z !== null && typeof X == "string" && (X = z.createHTML(""));
      Te && Te(g), je = g;
    }
  }, sr = $({}, [...An, ...In, ...yc]), ur = $({}, [...vn, ...Cc]), cl = function(g) {
    let _ = I(g);
    (!_ || !_.tagName) && (_ = {
      namespaceURI: L,
      tagName: "template"
    });
    const N = Qt(g.tagName), ue = Qt(_.tagName);
    return ae[g.namespaceURI] ? g.namespaceURI === P ? _.namespaceURI === U ? N === "svg" : _.namespaceURI === T ? N === "svg" && (ue === "annotation-xml" || pt[ue]) : !!sr[N] : g.namespaceURI === T ? _.namespaceURI === U ? N === "math" : _.namespaceURI === P ? N === "math" && it[ue] : !!ur[N] : g.namespaceURI === U ? _.namespaceURI === P && !it[ue] || _.namespaceURI === T && !pt[ue] ? !1 : !ur[N] && (cn[N] || !sr[N]) : !!(Ge === "application/xhtml+xml" && ae[g.namespaceURI]) : !1;
  }, qe = function(g) {
    Dt(t.removed, {
      element: g
    });
    try {
      I(g).removeChild(g);
    } catch {
      A(g);
    }
  }, Ct = function(g, _) {
    try {
      Dt(t.removed, {
        attribute: _.getAttributeNode(g),
        from: _
      });
    } catch {
      Dt(t.removed, {
        attribute: null,
        from: _
      });
    }
    if (_.removeAttribute(g), g === "is")
      if (Ze || et)
        try {
          qe(_);
        } catch {
        }
      else
        try {
          _.setAttribute(g, "");
        } catch {
        }
  }, cr = function(g) {
    let _ = null, N = null;
    if (ut)
      g = "<remove></remove>" + g;
    else {
      const ye = Tn(g, /^[\r\n\t ]+/);
      N = ye && ye[0];
    }
    Ge === "application/xhtml+xml" && L === U && (g = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + g + "</body></html>");
    const ue = z ? z.createHTML(g) : g;
    if (L === U)
      try {
        _ = new y().parseFromString(ue, Ge);
      } catch {
      }
    if (!_ || !_.documentElement) {
      _ = x.createDocument(L, "template", null);
      try {
        _.documentElement.innerHTML = se ? X : ue;
      } catch {
      }
    }
    const Se = _.body || _.documentElement;
    return g && N && Se.insertBefore(n.createTextNode(N), Se.childNodes[0] || null), L === U ? Z.call(_, De ? "html" : "body")[0] : De ? _.documentElement : Se;
  }, pr = function(g) {
    return q.call(
      g.ownerDocument || g,
      g,
      // eslint-disable-next-line no-bitwise
      u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT | u.SHOW_PROCESSING_INSTRUCTION | u.SHOW_CDATA_SECTION,
      null
    );
  }, hn = function(g) {
    return g instanceof f && (typeof g.nodeName != "string" || typeof g.textContent != "string" || typeof g.removeChild != "function" || !(g.attributes instanceof c) || typeof g.removeAttribute != "function" || typeof g.setAttribute != "function" || typeof g.namespaceURI != "string" || typeof g.insertBefore != "function" || typeof g.hasChildNodes != "function");
  }, hr = function(g) {
    return typeof a == "function" && g instanceof a;
  };
  function ot(R, g, _) {
    Yt(R, (N) => {
      N.call(t, g, _, je);
    });
  }
  const fr = function(g) {
    let _ = null;
    if (ot(v.beforeSanitizeElements, g, null), hn(g))
      return qe(g), !0;
    const N = te(g.nodeName);
    if (ot(v.uponSanitizeElement, g, {
      tagName: N,
      allowedTags: G
    }), Je && g.hasChildNodes() && !hr(g.firstElementChild) && Ee(/<[/\w!]/g, g.innerHTML) && Ee(/<[/\w!]/g, g.textContent) || g.nodeType === zt.progressingInstruction || Je && g.nodeType === zt.comment && Ee(/<[/\w]/g, g.data))
      return qe(g), !0;
    if (!(we.tagCheck instanceof Function && we.tagCheck(N)) && (!G[N] || oe[N])) {
      if (!oe[N] && mr(N) && (V.tagNameCheck instanceof RegExp && Ee(V.tagNameCheck, N) || V.tagNameCheck instanceof Function && V.tagNameCheck(N)))
        return !1;
      if (St && !E[N]) {
        const ue = I(g) || g.parentNode, Se = D(g) || g.childNodes;
        if (Se && ue) {
          const ye = Se.length;
          for (let ve = ye - 1; ve >= 0; --ve) {
            const at = k(Se[ve], !0);
            at.__removalCount = (g.__removalCount || 0) + 1, ue.insertBefore(at, b(g));
          }
        }
      }
      return qe(g), !0;
    }
    return g instanceof s && !cl(g) || (N === "noscript" || N === "noembed" || N === "noframes") && Ee(/<\/no(script|embed|frames)/i, g.innerHTML) ? (qe(g), !0) : (He && g.nodeType === zt.text && (_ = g.textContent, Yt([M, ee, J], (ue) => {
      _ = Rt(_, ue, " ");
    }), g.textContent !== _ && (Dt(t.removed, {
      element: g.cloneNode()
    }), g.textContent = _)), ot(v.afterSanitizeElements, g, null), !1);
  }, dr = function(g, _, N) {
    if (nt && (_ === "id" || _ === "name") && (N in n || N in ht))
      return !1;
    if (!(be && !Be[_] && Ee(W, _))) {
      if (!(Ue && Ee(de, _))) {
        if (!(we.attributeCheck instanceof Function && we.attributeCheck(_, g))) {
          if (!d[_] || Be[_]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(mr(g) && (V.tagNameCheck instanceof RegExp && Ee(V.tagNameCheck, g) || V.tagNameCheck instanceof Function && V.tagNameCheck(g)) && (V.attributeNameCheck instanceof RegExp && Ee(V.attributeNameCheck, _) || V.attributeNameCheck instanceof Function && V.attributeNameCheck(_, g)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              _ === "is" && V.allowCustomizedBuiltInElements && (V.tagNameCheck instanceof RegExp && Ee(V.tagNameCheck, N) || V.tagNameCheck instanceof Function && V.tagNameCheck(N)))
            ) return !1;
          } else if (!xe[_]) {
            if (!Ee(m, Rt(N, ge, ""))) {
              if (!((_ === "src" || _ === "xlink:href" || _ === "href") && g !== "script" && fc(N, "data:") === 0 && j[g])) {
                if (!($e && !Ee(le, Rt(N, ge, "")))) {
                  if (N)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, mr = function(g) {
    return g !== "annotation-xml" && Tn(g, Ie);
  }, gr = function(g) {
    ot(v.beforeSanitizeAttributes, g, null);
    const {
      attributes: _
    } = g;
    if (!_ || hn(g))
      return;
    const N = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: d,
      forceKeepAttr: void 0
    };
    let ue = _.length;
    for (; ue--; ) {
      const Se = _[ue], {
        name: ye,
        namespaceURI: ve,
        value: at
      } = Se, _t = te(ye), fn = at;
      let ke = ye === "value" ? fn : dc(fn);
      if (N.attrName = _t, N.attrValue = ke, N.keepAttr = !0, N.forceKeepAttr = void 0, ot(v.uponSanitizeAttribute, g, N), ke = N.attrValue, gt && (_t === "id" || _t === "name") && (Ct(ye, g), ke = Lt + ke), Je && Ee(/((--!?|])>)|<\/(style|title|textarea)/i, ke)) {
        Ct(ye, g);
        continue;
      }
      if (_t === "attributename" && Tn(ke, "href")) {
        Ct(ye, g);
        continue;
      }
      if (N.forceKeepAttr)
        continue;
      if (!N.keepAttr) {
        Ct(ye, g);
        continue;
      }
      if (!mt && Ee(/\/>/i, ke)) {
        Ct(ye, g);
        continue;
      }
      He && Yt([M, ee, J], (Cr) => {
        ke = Rt(ke, Cr, " ");
      });
      const yr = te(g.nodeName);
      if (!dr(yr, _t, ke)) {
        Ct(ye, g);
        continue;
      }
      if (z && typeof p == "object" && typeof p.getAttributeType == "function" && !ve)
        switch (p.getAttributeType(yr, _t)) {
          case "TrustedHTML": {
            ke = z.createHTML(ke);
            break;
          }
          case "TrustedScriptURL": {
            ke = z.createScriptURL(ke);
            break;
          }
        }
      if (ke !== fn)
        try {
          ve ? g.setAttributeNS(ve, ye, ke) : g.setAttribute(ye, ke), hn(g) ? qe(g) : ci(t.removed);
        } catch {
          Ct(ye, g);
        }
    }
    ot(v.afterSanitizeAttributes, g, null);
  }, pl = function R(g) {
    let _ = null;
    const N = pr(g);
    for (ot(v.beforeSanitizeShadowDOM, g, null); _ = N.nextNode(); )
      ot(v.uponSanitizeShadowNode, _, null), fr(_), gr(_), _.content instanceof l && R(_.content);
    ot(v.afterSanitizeShadowDOM, g, null);
  };
  return t.sanitize = function(R) {
    let g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ = null, N = null, ue = null, Se = null;
    if (se = !R, se && (R = "<!-->"), typeof R != "string" && !hr(R))
      if (typeof R.toString == "function") {
        if (R = R.toString(), typeof R != "string")
          throw Ot("dirty is not a string, aborting");
      } else
        throw Ot("toString is not a function");
    if (!t.isSupported)
      return R;
    if (Qe || pn(g), t.removed = [], typeof R == "string" && (rt = !1), rt) {
      if (R.nodeName) {
        const at = te(R.nodeName);
        if (!G[at] || oe[at])
          throw Ot("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (R instanceof a)
      _ = cr("<!---->"), N = _.ownerDocument.importNode(R, !0), N.nodeType === zt.element && N.nodeName === "BODY" || N.nodeName === "HTML" ? _ = N : _.appendChild(N);
    else {
      if (!Ze && !He && !De && // eslint-disable-next-line unicorn/prefer-includes
      R.indexOf("<") === -1)
        return z && tt ? z.createHTML(R) : R;
      if (_ = cr(R), !_)
        return Ze ? null : tt ? X : "";
    }
    _ && ut && qe(_.firstChild);
    const ye = pr(rt ? R : _);
    for (; ue = ye.nextNode(); )
      fr(ue), gr(ue), ue.content instanceof l && pl(ue.content);
    if (rt)
      return R;
    if (Ze) {
      if (et)
        for (Se = ie.call(_.ownerDocument); _.firstChild; )
          Se.appendChild(_.firstChild);
      else
        Se = _;
      return (d.shadowroot || d.shadowrootmode) && (Se = K.call(r, Se, !0)), Se;
    }
    let ve = De ? _.outerHTML : _.innerHTML;
    return De && G["!doctype"] && _.ownerDocument && _.ownerDocument.doctype && _.ownerDocument.doctype.name && Ee(il, _.ownerDocument.doctype.name) && (ve = "<!DOCTYPE " + _.ownerDocument.doctype.name + `>
` + ve), He && Yt([M, ee, J], (at) => {
      ve = Rt(ve, at, " ");
    }), z && tt ? z.createHTML(ve) : ve;
  }, t.setConfig = function() {
    let R = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    pn(R), Qe = !0;
  }, t.clearConfig = function() {
    je = null, Qe = !1;
  }, t.isValidAttribute = function(R, g, _) {
    je || pn({});
    const N = te(R), ue = te(g);
    return dr(N, ue, _);
  }, t.addHook = function(R, g) {
    typeof g == "function" && Dt(v[R], g);
  }, t.removeHook = function(R, g) {
    if (g !== void 0) {
      const _ = pc(v[R], g);
      return _ === -1 ? void 0 : hc(v[R], _, 1)[0];
    }
    return ci(v[R]);
  }, t.removeHooks = function(R) {
    v[R] = [];
  }, t.removeAllHooks = function() {
    v = gi();
  }, t;
}
var ol = ll();
const vc = {
  // For user messages - very strict, no HTML allowed except basic formatting
  userMessage: {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "code", "pre", "br"],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: !0,
    ALLOW_DATA_ATTR: !1
  },
  // For assistant messages - allow more formatting but still secure
  assistantMessage: {
    ALLOWED_TAGS: [
      "p",
      "br",
      "b",
      "i",
      "em",
      "strong",
      "code",
      "pre",
      "ul",
      "ol",
      "li",
      "blockquote",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6"
    ],
    ALLOWED_ATTR: ["class"],
    KEEP_CONTENT: !0,
    ALLOW_DATA_ATTR: !1
  },
  // For plain text only - strips all HTML
  plainText: {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: !0
  }
};
function Lc(e, t = "userMessage") {
  if (typeof e != "string")
    return console.warn("sanitizeInput received non-string input:", typeof e), "";
  if (!e.trim())
    return "";
  try {
    const n = vc[t], r = ol.sanitize(e, n);
    return al(r) ? (console.warn("Suspicious content detected and removed:", e), r.replace(/javascript:/gi, "").replace(/data:/gi, "")) : r;
  } catch (n) {
    return console.error("Error sanitizing input:", n), "";
  }
}
function al(e) {
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
function en(e, t = !1) {
  return Lc(e, t ? "assistantMessage" : "userMessage");
}
function Nc(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function yi(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || al(e));
  } catch {
    return !1;
  }
}
function Mc() {
  ol.addHook("beforeSanitizeAttributes", (e) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      e.hasAttribute(n) && e.removeAttribute(n);
    }), e.hasAttribute("href")) {
      const n = e.getAttribute("href");
      n && !yi(n) && e.removeAttribute("href");
    }
    if (e.hasAttribute("src")) {
      const n = e.getAttribute("src");
      n && !yi(n) && e.removeAttribute("src");
    }
  });
}
Mc();
const Dc = ({
  placeholder: e = "What would you like to know?",
  disabled: t = !1,
  chatStatus: n,
  uploadedMedia: r,
  fileUploadEnabled: i = !1,
  onSubmit: l,
  onFileUpload: o,
  onClearMedia: a,
  onStopGeneration: s
}) => {
  const [u, c] = fe(""), f = me(
    (w) => {
      w.preventDefault();
      const A = new FormData(w.currentTarget).get("message");
      if (A != null && A.trim()) {
        const b = en(A.trim(), !1);
        if (!b.trim()) {
          console.warn("Message was blocked due to security concerns");
          return;
        }
        l(b, r), c(""), a();
      }
    },
    [l, r, a]
  ), y = me((w) => {
    const A = w.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
    c(A);
  }, []), p = me(() => {
    const w = document.createElement("input");
    w.type = "file", w.accept = "image/*,text/*,.pdf,.doc,.docx", w.multiple = !0, w.onchange = (k) => {
      const A = k.target.files;
      if (A) {
        const b = Array.from(A).filter((D) => {
          const I = Nc(D.name);
          return I !== D.name && console.warn(`File name sanitized: ${D.name} -> ${I}`), D.size > 10485760 ? (console.warn(`File too large: ${D.name} (${D.size} bytes)`), !1) : [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "text/plain",
            "text/csv",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ].includes(D.type) ? !0 : (console.warn(`File type not allowed: ${D.name} (${D.type})`), !1);
        });
        b.length > 0 && o(b);
      }
    }, w.click();
  }, [o]);
  return /* @__PURE__ */ O(rc, { onSubmit: f, children: [
    /* @__PURE__ */ h(
      tl,
      {
        name: "message",
        value: u,
        onChange: y,
        placeholder: e,
        disabled: t
      }
    ),
    /* @__PURE__ */ O(ic, { children: [
      /* @__PURE__ */ h(lc, { children: i && /* @__PURE__ */ O(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ O(
              oc,
              {
                variant: "ghost",
                size: "icon",
                onClick: p,
                title: r.length > 0 ? `${r.length} file(s) attached` : "Attach files",
                disabled: t,
                style: {
                  position: "relative",
                  color: r.length > 0 ? "#3b82f6" : void 0
                },
                children: [
                  /* @__PURE__ */ h(
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
                          d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49L13.1 2.41a4 4 0 015.66 5.66L9.41 17.41a2 2 0 01-2.83-2.83L15.9 5.24",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      )
                    }
                  ),
                  r.length > 0 && /* @__PURE__ */ h(
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
            /* @__PURE__ */ h(
              "span",
              {
                onClick: p,
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
      /* @__PURE__ */ h(
        ac,
        {
          status: n,
          disabled: !u.trim() && n !== "streaming",
          onClick: n === "streaming" && s ? () => {
            s();
          } : void 0
        }
      )
    ] })
  ] });
};
function Rc({ children: e }) {
  return /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning", children: e });
}
function Oc({
  title: e,
  status: t = "processing"
}) {
  return /* @__PURE__ */ O("div", { className: "chat-wrapper__reasoning-trigger", children: [
    /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-icon", children: (() => {
      switch (t) {
        case "completed":
          return /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-checkmark", children: /* @__PURE__ */ h(
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
          return /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-error", children: /* @__PURE__ */ h(
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
          return /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-processing", children: /* @__PURE__ */ h(
            "svg",
            {
              width: "10",
              height: "14",
              viewBox: "0 0 10 14",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ h(
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
    /* @__PURE__ */ h("span", { className: "chat-wrapper__reasoning-title", children: e }),
    (e.includes("Thinking") || e.includes("Processing")) && /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-arrow", children: /* @__PURE__ */ O(
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
    ) })
  ] });
}
function Pc({ children: e }) {
  return /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__reasoning-text", children: e }) });
}
function zc({ children: e }) {
  return /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function Fc({
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
  return /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ O("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
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
          /* @__PURE__ */ h("span", { children: o }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
            "svg",
            {
              width: "16",
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
          /* @__PURE__ */ h("span", { children: "Running..." })
        ] });
      case "completed":
        return /* @__PURE__ */ O("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
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
          /* @__PURE__ */ h("span", { children: o }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
            "svg",
            {
              width: "16",
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
                    children: /* @__PURE__ */ h("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
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
        ] });
      case "error":
        return /* @__PURE__ */ O("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ h(
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
        return /* @__PURE__ */ O("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
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
          /* @__PURE__ */ O("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
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
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
            "svg",
            {
              width: "16",
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
function Bc({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ O("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
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
class Uc {
  constructor() {
    he(this, "sessionId", "");
    he(this, "ws", null);
    he(this, "isConnected", !1);
    he(this, "onSetMessage");
    he(this, "onSystemMessage");
    he(this, "onBusinessDataUpdate");
    he(this, "onReasoningUpdate");
    he(this, "clientTools", {});
    he(this, "toolSchemas", []);
    he(this, "businessContext", {});
    he(this, "reconnectAttempts", 0);
    he(this, "maxReconnectAttempts", 5);
    he(this, "reconnectTimer", null);
    he(this, "reconnectDelay", 1e3);
    // Start with 1 second
    he(this, "heartbeatInterval", null);
    he(this, "isReconnecting", !1);
    he(this, "visibilityChangeHandler");
    he(this, "initResolve");
    he(this, "initReject");
    this.sessionId = `business_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, this.visibilityChangeHandler = () => {
      document.visibilityState === "visible" && !this.isConnected && !this.isReconnecting && (console.log("Tab became visible, checking connection..."), this.attemptReconnect());
    }, typeof document < "u" && document.addEventListener("visibilitychange", this.visibilityChangeHandler);
  }
  async onInit(t) {
    return this.onSetMessage = t.onSetMessage, this.onSystemMessage = t.onSystemMessage, this.onBusinessDataUpdate = t.onBusinessDataUpdate, this.onReasoningUpdate = t.onReasoningUpdate, this.clientTools = t.clientTools || {}, this.toolSchemas = t.toolSchemas || [], this.businessContext = t.businessContext, new Promise((n, r) => {
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
      if (this.ws = new WebSocket("ws://localhost:3000/ws"), !this.ws) {
        (t = this.initReject) == null || t.call(this, new Error("WebSocket not initialized"));
        return;
      }
      this.ws.onopen = () => {
        this.isConnected = !0, this.isReconnecting = !1, this.reconnectAttempts = 0, this.reconnectDelay = 1e3, console.log("WebSocket connected"), this.startHeartbeat();
      }, this.ws.onerror = (r) => {
        var i, l;
        if (console.error("WebSocket connection error:", r), r instanceof Event) {
          console.log("Falling back to demo mode..."), this.isConnected = !0, this.onSystemMessage && this.onSystemMessage("⚠️ Using demo mode - WebSocket unavailable"), (i = this.initResolve) == null || i.call(this);
          return;
        }
        (l = this.initReject) == null || l.call(this, r);
      }, this.ws.onmessage = (r) => {
        var l, o;
        const i = this.handleWebSocketMessage(r);
        i && i.type === "tools_configured" && (this.onSystemMessage && this.onSystemMessage("✅ Client tools configured successfully"), (l = this.initResolve) == null || l.call(this)), i && i.type === "session_established" && (!this.toolSchemas || this.toolSchemas.length === 0) && ((o = this.initResolve) == null || o.call(this));
      }, this.ws.onclose = (r) => {
        this.isConnected = !1, this.stopHeartbeat(), console.log("WebSocket disconnected", { code: r.code, reason: r.reason }), r.code !== 1e3 && r.code !== 1001 && this.attemptReconnect();
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
    this.isReconnecting = !0, this.reconnectAttempts++, console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`), this.onSystemMessage && this.onSystemMessage(`🔄 Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`), this.reconnectTimer = window.setTimeout(() => {
      this.isConnected || this.connectWebSocket();
    }, this.reconnectDelay), this.reconnectDelay = Math.min(this.reconnectDelay * 1.5, 3e4);
  }
  connectWebSocket() {
    try {
      this.ws && this.ws.close(), this.ws = new WebSocket("ws://localhost:3000/ws"), this.ws.onopen = () => {
        var t;
        this.isConnected = !0, this.isReconnecting = !1, this.reconnectAttempts = 0, this.reconnectDelay = 1e3, console.log("WebSocket reconnected successfully"), this.startHeartbeat(), this.onSystemMessage && this.onSystemMessage("✅ Connection restored"), this.toolSchemas && this.toolSchemas.length > 0 && ((t = this.ws) == null || t.send(JSON.stringify({
          type: "configure_tools",
          toolSchemas: this.toolSchemas,
          businessContext: this.businessContext
        })));
      }, this.ws.onerror = (t) => {
        console.error("WebSocket reconnection error:", t), this.isReconnecting = !1, setTimeout(() => this.attemptReconnect(), this.reconnectDelay);
      }, this.ws.onclose = (t) => {
        this.isConnected = !1, this.isReconnecting = !1, this.stopHeartbeat(), t.code !== 1e3 && t.code !== 1001 && this.attemptReconnect();
      }, this.ws.onmessage = (t) => {
        this.handleWebSocketMessage(t);
      };
    } catch (t) {
      console.error("Error creating WebSocket:", t), this.isReconnecting = !1, setTimeout(() => this.attemptReconnect(), this.reconnectDelay);
    }
  }
  startHeartbeat() {
    this.stopHeartbeat(), this.heartbeatInterval = window.setInterval(() => {
      this.ws && this.ws.readyState === WebSocket.OPEN ? this.ws.send(JSON.stringify({
        type: "heartbeat_ping",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        pingTime: Date.now()
      })) : (console.log("WebSocket not ready for heartbeat, attempting reconnect..."), this.stopHeartbeat(), this.attemptReconnect());
    }, 3e4);
  }
  stopHeartbeat() {
    this.heartbeatInterval && (clearInterval(this.heartbeatInterval), this.heartbeatInterval = null);
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
    this.reconnectTimer && (window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null), this.stopHeartbeat(), typeof document < "u" && this.visibilityChangeHandler && document.removeEventListener("visibilitychange", this.visibilityChangeHandler), this.ws && (this.ws.close(1e3, "Manual disconnect"), this.ws = null), this.isConnected = !1, this.isReconnecting = !1, this.reconnectAttempts = 0;
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
const sl = Zn(({
  message: e,
  getReasoningTitle: t,
  getReasoningStatus: n,
  getToolingTitle: r,
  getToolingStatus: i,
  clientTools: l,
  currentAssistantMessageIdRef: o
}) => {
  var a;
  return /* @__PURE__ */ h(
    "div",
    {
      className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
      children: e.role === "reasoning" ? (
        /* Reasoning message - no content wrapper */
        /* @__PURE__ */ O(Rc, { isStreaming: e.isStreaming || !1, children: [
          /* @__PURE__ */ h(
            Oc,
            {
              title: t(
                e.content,
                e.isStreaming
              ),
              status: n(
                e.content,
                e.isStreaming
              )
            }
          ),
          /* @__PURE__ */ h(Pc, { children: e.content })
        ] })
      ) : e.role === "tooling" ? (
        /* Tooling message - no content wrapper */
        /* @__PURE__ */ h(zc, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ h(
          Fc,
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
      ) : /* @__PURE__ */ h("div", { className: "chat-wrapper__message-content", children: e.role === "assistant" && e.isStreaming && e.content === "" && e.id === o.current ? (
        /* Show streaming indicator when no content yet */
        /* @__PURE__ */ O("div", { className: "chat-wrapper__streaming-placeholder", children: [
          /* @__PURE__ */ h(Bc, { size: 16, variant: "dots" }),
          /* @__PURE__ */ h("span", { children: "Thinking" })
        ] })
      ) : e.role === "system" ? (
        /* System message with collapsible tool result */
        /* @__PURE__ */ h(Hc, { message: e })
      ) : e.role === "assistant" ? (
        /* Assistant message with regular markdown display */
        /* @__PURE__ */ h("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(
          ln,
          {
            components: {
              pre: ({ children: s }) => /* @__PURE__ */ h("pre", { className: "chat-wrapper__code-block", children: s }),
              code: ({ children: s, className: u }) => !u ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", children: s }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code-block", children: s }),
              ul: ({ children: s }) => /* @__PURE__ */ h("ul", { className: "chat-wrapper__list", children: s }),
              ol: ({ children: s }) => /* @__PURE__ */ h("ol", { className: "chat-wrapper__ordered-list", children: s }),
              li: ({ children: s }) => /* @__PURE__ */ h("li", { className: "chat-wrapper__list-item", children: s })
            },
            children: e.content
          }
        ) }) })
      ) : (
        /* User message display with markdown */
        /* @__PURE__ */ O("div", { className: "chat-wrapper__regular-message", children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(
            ln,
            {
              components: {
                pre: ({ children: s }) => /* @__PURE__ */ h("pre", { className: "chat-wrapper__code-block", children: s }),
                code: ({ children: s, className: u }) => !u ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", children: s }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code", children: s }),
                p: ({ children: s }) => /* @__PURE__ */ h("p", { className: "chat-wrapper__paragraph", children: s }),
                h1: ({ children: s }) => /* @__PURE__ */ h("h1", { className: "chat-wrapper__heading-1", children: s }),
                h2: ({ children: s }) => /* @__PURE__ */ h("h2", { className: "chat-wrapper__heading-2", children: s }),
                h3: ({ children: s }) => /* @__PURE__ */ h("h3", { className: "chat-wrapper__heading-3", children: s }),
                ul: ({ children: s }) => /* @__PURE__ */ h("ul", { className: "chat-wrapper__list", children: s }),
                ol: ({ children: s }) => /* @__PURE__ */ h("ol", { className: "chat-wrapper__ordered-list", children: s }),
                li: ({ children: s }) => /* @__PURE__ */ h("li", { className: "chat-wrapper__list-item", children: s }),
                blockquote: ({ children: s }) => /* @__PURE__ */ h("blockquote", { className: "chat-wrapper__blockquote", children: s }),
                strong: ({ children: s }) => /* @__PURE__ */ h("strong", { className: "chat-wrapper__bold", children: s }),
                em: ({ children: s }) => /* @__PURE__ */ h("em", { className: "chat-wrapper__italic", children: s })
              },
              children: e.content.trim()
            }
          ) }),
          e.role === "user" && e.media && e.media.length > 0 && /* @__PURE__ */ h("div", { className: "chat-wrapper__media-grid", children: e.media.map((s, u) => /* @__PURE__ */ h(
            "div",
            {
              className: "chat-wrapper__media-item",
              children: /* @__PURE__ */ h(
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
sl.displayName = "MessageComponent";
const ul = Zn(({
  content: e,
  messageId: t
}) => !t || !e ? null : /* @__PURE__ */ h("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__message-content", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(
  ln,
  {
    components: {
      pre: ({ children: n }) => /* @__PURE__ */ h("pre", { className: "chat-wrapper__code-block", children: n }),
      code: ({ children: n, className: r }) => !r ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", children: n }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code-block", children: n }),
      ul: ({ children: n }) => /* @__PURE__ */ h("ul", { className: "chat-wrapper__list", children: n }),
      ol: ({ children: n }) => /* @__PURE__ */ h("ol", { className: "chat-wrapper__ordered-list", children: n }),
      li: ({ children: n }) => /* @__PURE__ */ h("li", { className: "chat-wrapper__list-item", children: n })
    },
    children: e
  }
) }) }) }) }));
ul.displayName = "StreamingMessage";
function Hc({ message: e }) {
  const [t, n] = fe(!0);
  return console.log("clog message:", e), /* @__PURE__ */ O("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ h(
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
        children: e.role === "system" ? /* @__PURE__ */ O("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
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
          /* @__PURE__ */ O("span", { children: [
            "AI text input <show-toolname>",
            "..."
          ] }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
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
          ) }) }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
            "svg",
            {
              width: "16",
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
        ] }) : e.role === "assistant" ? e.isStreaming ? /* @__PURE__ */ O("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h(
            "svg",
            {
              width: "10",
              height: "14",
              viewBox: "0 0 10 14",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ h(
                "path",
                {
                  d: "M3.79576 11.3819C3.46532 11.3819 3.18343 11.2644 2.9501 11.0294C2.71676 10.7944 2.6001 10.5119 2.6001 10.1819V9.06527C1.96676 8.65082 1.4751 8.11943 1.1251 7.4711C0.775098 6.82277 0.600098 6.12638 0.600098 5.38193C0.600098 4.15627 1.02665 3.11649 1.87976 2.2626C2.73288 1.40882 3.77176 0.981934 4.99643 0.981934C6.2211 0.981934 7.26121 1.40882 8.11676 2.2626C8.97232 3.11649 9.4001 4.15627 9.4001 5.38193C9.4001 6.12438 9.2251 6.8211 8.8751 7.4721C8.5251 8.1231 8.03343 8.65416 7.4001 9.06527V10.1819C7.4001 10.5119 7.28243 10.7944 7.0471 11.0294C6.81188 11.2644 6.52904 11.3819 6.1986 11.3819H3.79576ZM3.8001 10.1819H6.2001V8.41527L6.7501 8.06527C7.20565 7.77638 7.56121 7.39204 7.81676 6.91227C8.07232 6.43249 8.2001 5.92238 8.2001 5.38193C8.2001 4.4966 7.88771 3.74193 7.26293 3.11793C6.63826 2.49393 5.88271 2.18193 4.99626 2.18193C4.10993 2.18193 3.35565 2.49393 2.73343 3.11793C2.11121 3.74193 1.8001 4.4966 1.8001 5.38193C1.8001 5.92238 1.92788 6.43249 2.18343 6.91227C2.43899 7.39204 2.79454 7.77638 3.2501 8.06527L3.8001 8.41527V10.1819ZM3.8001 13.7819C3.57343 13.7819 3.38343 13.7053 3.2301 13.5519C3.07676 13.3986 3.0001 13.2086 3.0001 12.9819V12.5819H7.0001V12.9819C7.0001 13.2086 6.92343 13.3986 6.7701 13.5519C6.61676 13.7053 6.42676 13.7819 6.2001 13.7819H3.8001Z",
                  fill: "#637381"
                }
              )
            }
          ) }),
          /* @__PURE__ */ h("span", { children: "Thinking..." }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
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
          ) }) })
        ] }) : /* @__PURE__ */ O("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ h(
                "path",
                {
                  d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z",
                  fill: "#10b981"
                }
              )
            }
          ) }),
          /* @__PURE__ */ h("span", { children: "Thought" }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
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
          ) }) })
        ] }) : "💬 Message"
      }
    ),
    t && /* @__PURE__ */ h(
      "div",
      {
        className: "chat-wrapper__system-message-content",
        style: {
          padding: "0 12px 12px 0px"
        },
        children: /* @__PURE__ */ h("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ h(
          ln,
          {
            components: {
              pre: ({ children: i }) => /* @__PURE__ */ h("pre", { className: "chat-wrapper__code-block", children: i }),
              code: ({ children: i, className: l }) => !l ? /* @__PURE__ */ h("code", { className: "chat-wrapper__inline-code", children: i }) : /* @__PURE__ */ h("code", { className: "chat-wrapper__code", children: i }),
              p: ({ children: i }) => /* @__PURE__ */ h("p", { className: "chat-wrapper__paragraph", children: i }),
              strong: ({ children: i }) => /* @__PURE__ */ h("strong", { className: "chat-wrapper__bold", children: i }),
              em: ({ children: i }) => /* @__PURE__ */ h("em", { className: "chat-wrapper__italic", children: i })
            },
            children: e.content.trim()
          }
        ) })
      }
    )
  ] });
}
function jc({
  apiUrl: e,
  config: t,
  tools: n,
  clientTools: r,
  initialMessages: i = []
}) {
  var Re;
  const [l, o] = fe(
    null
  ), [a, s] = fe(!1), [u, c] = fe(""), f = xt(null), [y, p] = fe(i), [w, k] = fe(!1), [A, b] = fe(!1), [D, I] = fe("idle"), [z, X] = fe(!1), [x, q] = fe(t.mode), [ie] = fe([]), [Z, K] = fe([]), [v, M] = fe(""), [ee, J] = fe(!1), [, W] = fe(""), [de, le] = fe(""), [ge, Ie] = fe(!1), [, m] = fe(/* @__PURE__ */ new Map()), G = xt(null), ce = xt(null), d = xt(!0), pe = xt(""), V = me(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), oe = $t(
    () => (T, P) => P === !1 ? T.includes("❌") ? "error" : "completed" : T.includes("✅ Completed:") || T.includes("✅") ? "completed" : T.includes("❌") ? "error" : "processing",
    []
  ), Be = $t(
    () => (T, P) => P === !1 ? T.includes("❌") ? "Error" : "Completed" : T.includes("✅ Completed:") || T.includes("✅") ? "Completed" : T.includes("❌") ? "Error" : (T.includes("🔧 Handling:"), "Thinking..."),
    []
  ), we = $t(
    () => (T, P) => P === !1 ? T.includes("❌") ? "Tool Error" : "Tool Completed" : T.includes("✅ Completed:") || T.includes("✅") ? "Tool Completed" : T.includes("❌") ? "Tool Error" : (T.includes("🔧 Handling:"), "Tool Processing..."),
    []
  ), Ue = $t(
    () => (T, P) => P === !1 ? T.includes("❌") ? "error" : "completed" : T.includes("✅ Completed:") || T.includes("✅") ? "completed" : T.includes("❌") ? "error" : "processing",
    []
  ), be = me(
    (T, P) => {
      const L = en(P, T === "assistant");
      p((se) => [
        ...se,
        {
          id: V(),
          role: T,
          content: L,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [V]
  ), $e = me(
    () => {
      if (k(!1), J(!1), I("idle"), ce.current && pe.current) {
        const T = en(pe.current, !0), P = {
          id: ce.current,
          role: "assistant",
          content: T,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !1
        };
        p((U) => [...U, P]), ce.current = null, pe.current = "", le("");
      }
    },
    []
  ), mt = me(
    (T) => {
      console.error("Chat error:", T), k(!1), J(!1), I("error"), ce.current = null, pe.current = "", le(""), be("system", `❌ Chat error: ${T}`);
    },
    [be]
  ), He = me(async () => {
    try {
      const T = new Uc();
      f.current = T, o(T), c(T.getSessionId());
      const P = {};
      await T.onInit({
        toolSchemas: r,
        clientTools: n,
        businessContext: P,
        onSetMessage: (U) => {
          const L = en(U, !0);
          if (ce.current)
            pe.current += L, le(pe.current);
          else {
            J(!1);
            const se = V();
            ce.current = se, pe.current = L, le(L);
          }
        },
        onSystemMessage: (U) => {
          if (U.includes("Chat completed"))
            $e();
          else if (U.includes("Chat error")) {
            const L = U.match(/Chat error: (.+)/);
            L && mt(L[1]);
          }
        },
        onReasoningUpdate: (U, L, se) => {
          console.log("🤔 Reasoning update:", {
            isThinking: U,
            content: L,
            toolCallRequest: se
          });
          const { callId: ae } = se || {};
          if (Ie(U), W(L), !ae) {
            console.log("⚠️ No callId provided for reasoning update");
            return;
          }
          const ct = L.includes("🔧 Handling:"), pt = L.includes("✅ Completed:"), it = L.includes("❌ Error:");
          console.log("🔍 Debug reasoning conditions:", {
            isToolStarted: ct,
            isToolCompleted: pt,
            isToolError: it,
            callId: ae,
            isHandlingTool: ge
          }), m((cn) => {
            const Ge = new Map(cn), yt = Ge.get(ae);
            if (ct && !yt) {
              const lt = L.match(/🔧 Handling: (.+)/), te = lt ? lt[1] : "Unknown Tool", je = V();
              Ge.set(ae, je);
              const ht = {
                id: je,
                role: "tooling",
                content: L,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0,
                toolData: {
                  ...se,
                  toolName: te,
                  callId: ae,
                  status: "processing"
                }
              };
              p((Vt) => [...Vt, ht]);
            } else if ((pt || it) && yt) {
              const lt = L.match(
                /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
              ), te = lt ? lt[1] : "Unknown Tool";
              p(
                (je) => je.map(
                  (ht) => ht.id === yt ? {
                    ...ht,
                    content: L,
                    isStreaming: !1,
                    // Mark as completed
                    toolData: {
                      ...ht.toolData,
                      toolName: te,
                      status: it ? "error" : "completed",
                      callId: ae ?? ""
                    }
                  } : ht
                )
              ), Ge.delete(ae);
            } else yt && ge && !pt && !it && p(
              (lt) => lt.map(
                (te) => te.id === yt ? {
                  ...te,
                  content: L,
                  isStreaming: !0
                } : te
              )
            );
            return Ge;
          });
        },
        onBusinessDataUpdate: (U) => {
          t.onBusinessDataUpdate && t.onBusinessDataUpdate(U);
        }
      }), s(!0), console.log("BusinessAgentClient connected");
    } catch (T) {
      console.error("Error connecting BusinessAgentClient:", T), s(!1);
    }
  }, [
    e,
    r,
    n,
    t,
    V,
    be,
    $e,
    mt
  ]), Je = me(() => {
    f.current && (f.current.disconnect(), f.current = null), o(null), s(!1), c("");
  }, []), De = me(() => {
    console.log("🔍 DEBUG: resetToolHandling called! Stack trace:"), console.trace(), Ie(!1), d.current = !0;
  }, []), Qe = me(() => {
    var T;
    (T = G.current) == null || T.scrollIntoView({ behavior: "smooth" });
  }, []);
  wt(() => {
    Qe();
  }, [y, Qe]), wt(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(v);
  }, [v, t]), wt(() => {
    console.log("🔍 DEBUG: isHandlingTool state changed:", ge);
  }, [ge]), wt(() => {
    console.log(
      "💭 DEBUG: isHandlingReasoning state changed:"
    );
  }, []), wt(() => (console.log("Connecting BusinessAgentClient..."), He(), () => {
    Je();
  }), [He, Je]), wt(() => {
    const T = setInterval(() => {
      if (f.current) {
        const P = f.current.getConnectionStatus();
        s(P.connected);
      }
    }, 1e3);
    return () => clearInterval(T);
  }, []);
  const ut = me(
    async (T, P) => {
      if (!T.trim() || w || !l || !a)
        return;
      const U = {
        id: V(),
        role: "user",
        content: T.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: P
      };
      p((L) => [...L, U]), k(!0), J(!0), I("submitted"), M("Starting...");
      try {
        await l.onTriggerMessage(U.content), I("streaming");
      } catch (L) {
        console.error("Agent client send error:", L), J(!1), I("error"), be(
          "system",
          `Sorry, there was an error: ${L instanceof Error ? L.message : "Unknown error"}`
        ), t.onError && t.onError(
          L instanceof Error ? L : new Error("Unknown error")
        ), k(!1), I("idle"), M("");
      }
    },
    [w, l, a, V, be, t]
  ), Ze = me(() => {
    k(!1), I("idle"), M(""), J(!1), W(""), ce.current = null, pe.current = "", le(""), De();
  }, [De]), et = me(async (T) => {
    console.log("Files selected:", T);
    const P = [];
    for (const U of T)
      try {
        if (U.type.startsWith("image/")) {
          const L = new FileReader(), se = await new Promise((ae, ct) => {
            L.onload = () => ae(L.result), L.onerror = ct, L.readAsDataURL(U);
          });
          P.push(se);
        } else if (U.type.startsWith("text/") || U.name.endsWith(".txt")) {
          const L = new FileReader(), se = await new Promise((ae, ct) => {
            L.onload = () => ae(L.result), L.onerror = ct, L.readAsText(U);
          });
          console.log("Text file content:", se);
        } else
          console.log("File type not supported for preview:", U.type), P.push(`data:application/octet-stream;base64,${U.name}`);
      } catch (L) {
        console.error("Error processing file:", L);
      }
    P.length > 0 && (K((U) => [...U, ...P]), console.log("Added media:", P));
  }, []), tt = me(() => {
    b(!0);
  }, []), nt = me(() => {
    b(!1);
  }, []), gt = me(() => {
    X((T) => !T);
  }, []), Lt = me(() => {
    q((T) => T === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  wt(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const T = (P) => {
      P.key === "Escape" && x === "modal" && A && nt();
    };
    if (x === "modal" && A)
      return document.addEventListener("keydown", T), () => document.removeEventListener("keydown", T);
  }, [x, A, nt]);
  const rt = ((...T) => T.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${x}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`,
    z && "chat-wrapper--collapsed",
    x === "embedded" && t.constrainedHeight && "chat-wrapper--constrained"
  ), C = () => x === "modal" && A ? /* @__PURE__ */ h("div", { className: "chat-wrapper-overlay", onClick: nt }) : null, E = () => {
    var P;
    if (x === "modal" && !A || x === "sidebar" && z || x === "fullscreen" && z) {
      const U = x === "modal" ? tt : gt, L = x === "modal" ? `Open ${t.appName}` : `Expand ${t.appName}`;
      return /* @__PURE__ */ O(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: U,
          title: L,
          children: [
            /* @__PURE__ */ O(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: "chat-wrapper__bubble-icon",
                children: [
                  /* @__PURE__ */ h(
                    "path",
                    {
                      d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
                      fill: "currentColor"
                    }
                  ),
                  /* @__PURE__ */ h("circle", { cx: "7", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ h("circle", { cx: "12", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ h("circle", { cx: "17", cy: "10", r: "1", fill: "currentColor" })
                ]
              }
            ),
            ((P = t.features) == null ? void 0 : P.showBubbleText) !== !1 && /* @__PURE__ */ h("span", { className: "chat-wrapper__bubble-text", children: t.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, F = () => x === "modal" && A ? /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: nt,
      title: "Close chat",
      children: /* @__PURE__ */ h(
        "svg",
        {
          width: "20",
          height: "20",
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
  ) : null, j = () => {
    if ((x === "sidebar" || x === "fullscreen") && !z) {
      const T = x === "fullscreen";
      return /* @__PURE__ */ h(
        "button",
        {
          className: T ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: Lt,
          title: T ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ h(
            "svg",
            {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: T ? (
                // Minimize icon (arrows pointing inward)
                /* @__PURE__ */ h(
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
                /* @__PURE__ */ h(
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
  }, Y = () => (x === "sidebar" || x === "fullscreen") && !z ? /* @__PURE__ */ h(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: gt,
      title: "Collapse chat",
      children: /* @__PURE__ */ h(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ h(
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
  ) : null, xe = () => {
    var T;
    return !((T = t.features) != null && T.showToolResults) || ie.length === 0 ? null : /* @__PURE__ */ O("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ h("h4", { children: "Tool Results" }),
      /* @__PURE__ */ h("div", { className: "chat-wrapper__tool-results-list", children: ie.map((P) => /* @__PURE__ */ O("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ h("div", { className: "chat-wrapper__tool-result-title", children: P.title }),
        P.description && /* @__PURE__ */ h("div", { className: "chat-wrapper__tool-result-description", children: P.description }),
        /* @__PURE__ */ O("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          P.status || "completed"
        ] })
      ] }, P.id)) })
    ] });
  };
  return x === "modal" && !A || (x === "sidebar" || x === "fullscreen") && z ? E() : (console.log("clog messages", y), /* @__PURE__ */ O(Nn, { children: [
    C(),
    /* @__PURE__ */ O("div", { className: rt, style: t.customStyles, children: [
      /* @__PURE__ */ O("div", { className: "chat-wrapper__header", children: [
        /* @__PURE__ */ O("div", { className: "chat-wrapper__title-area", children: [
          /* @__PURE__ */ h("h2", { className: "chat-wrapper__title", children: t.appName }),
          /* @__PURE__ */ h("div", { className: "chat-wrapper__connection-status", children: /* @__PURE__ */ h(
            "span",
            {
              className: `chat-wrapper__connection-indicator ${a ? "connected" : "disconnected"}`,
              title: a ? `Connected to WebSocket${u ? ` (Session: ${u.slice(-8)})` : ""}` : "Disconnected from WebSocket",
              children: a ? "🟢" : "🔴"
            }
          ) })
        ] }),
        /* @__PURE__ */ O("div", { className: "chat-wrapper__header-controls", children: [
          j(),
          Y(),
          F()
        ] })
      ] }),
      !z && /* @__PURE__ */ O(Nn, { children: [
        /* @__PURE__ */ O("div", { className: "chat-wrapper__messages", children: [
          y.map((T) => /* @__PURE__ */ h(
            sl,
            {
              message: T,
              getReasoningTitle: Be,
              getReasoningStatus: oe,
              getToolingTitle: we,
              getToolingStatus: Ue,
              clientTools: r || [],
              currentAssistantMessageIdRef: ce
            },
            T.id
          )),
          ce.current && de && /* @__PURE__ */ h(
            ul,
            {
              content: de,
              messageId: ce.current
            }
          ),
          ee && !ge && /* @__PURE__ */ h("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ h("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ O("div", { className: "chat-wrapper__thinking-dots", children: [
            /* @__PURE__ */ h("span", {}),
            /* @__PURE__ */ h("span", {}),
            /* @__PURE__ */ h("span", {})
          ] }) }) }) }),
          /* @__PURE__ */ h("div", { ref: G })
        ] }),
        xe(),
        Z.length > 0 && /* @__PURE__ */ O(
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
              /* @__PURE__ */ O(
                "span",
                {
                  style: {
                    fontSize: "12px",
                    color: "#6b7280",
                    fontWeight: "500"
                  },
                  children: [
                    Z.length,
                    " file",
                    Z.length > 1 ? "s" : "",
                    " attached:"
                  ]
                }
              ),
              Z.map((T, P) => /* @__PURE__ */ O(
                "div",
                {
                  style: {
                    position: "relative",
                    display: "inline-block"
                  },
                  children: [
                    T.startsWith("data:image/") ? /* @__PURE__ */ h(
                      "img",
                      {
                        src: T,
                        alt: `Attachment ${P + 1}`,
                        style: {
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          border: "1px solid #e2e8f0"
                        }
                      }
                    ) : /* @__PURE__ */ h(
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
                    /* @__PURE__ */ h(
                      "button",
                      {
                        onClick: () => {
                          K(
                            (U) => U.filter((L, se) => se !== P)
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
                P
              ))
            ]
          }
        ),
        /* @__PURE__ */ h(
          Dc,
          {
            placeholder: t.placeholder,
            disabled: w,
            chatStatus: D,
            uploadedMedia: Z,
            fileUploadEnabled: (Re = t.features) == null ? void 0 : Re.fileUpload,
            onSubmit: (T, P) => ut(T, P),
            onFileUpload: et,
            onClearMedia: () => K([]),
            onStopGeneration: Ze
          }
        )
      ] }),
      t.onError && /* @__PURE__ */ h("div", { className: "chat-wrapper__error-boundary" })
    ] })
  ] }));
}
const Jc = Zn(jc);
class Wc {
  constructor(t, n) {
    he(this, "baseUrl");
    he(this, "apiKey");
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
function Qc(e, t) {
  const [n, r] = fe([]), [i, l] = fe(!1), [o, a] = fe(null), s = xt(null), u = xt(new Wc(e, t)), c = me(async () => {
    try {
      const p = await u.current.initConversation();
      return s.current = p, p;
    } catch (p) {
      throw a(p), p;
    }
  }, []), f = me(
    async (p) => {
      s.current || await c();
      const w = {
        id: Date.now().toString(),
        role: "user",
        content: p,
        timestamp: /* @__PURE__ */ new Date()
      };
      r((A) => [...A, w]), l(!0), a(null);
      const k = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      r((A) => [...A, k]);
      try {
        const A = u.current.streamMessage(
          s.current,
          p
        );
        for await (const b of A)
          r(
            (D) => D.map(
              (I) => I.id === k.id ? { ...I, content: I.content + b } : I
            )
          );
        r(
          (b) => b.map(
            (D) => D.id === k.id ? { ...D, isStreaming: !1 } : D
          )
        );
      } catch (A) {
        a(A), r((b) => b.filter((D) => D.id !== k.id));
      } finally {
        l(!1);
      }
    },
    [c]
  ), y = me(() => {
    r([]), s.current = null;
  }, []);
  return {
    messages: n,
    isLoading: i,
    error: o,
    sendMessage: f,
    clearMessages: y
  };
}
export {
  Jc as ChatWrapper,
  Bc as Loader,
  rc as PromptInput,
  oc as PromptInputButton,
  Gc as PromptInputModelSelect,
  Yc as PromptInputModelSelectContent,
  Xc as PromptInputModelSelectItem,
  qc as PromptInputModelSelectTrigger,
  Kc as PromptInputModelSelectValue,
  ac as PromptInputSubmit,
  tl as PromptInputTextarea,
  ic as PromptInputToolbar,
  lc as PromptInputTools,
  Rc as Reasoning,
  Pc as ReasoningContent,
  Oc as ReasoningTrigger,
  Qc as useChatConnection
};
