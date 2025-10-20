var pl = Object.defineProperty;
var hl = (e, t, n) => t in e ? pl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var he = (e, t, n) => hl(e, typeof t != "symbol" ? t + "" : t, n);
import { jsxs as M, jsx as p, Fragment as Nn } from "react/jsx-runtime";
import fl, { forwardRef as Ci, useState as fe, useRef as ut, useImperativeHandle as dl, useCallback as de, memo as Zn, useMemo as $t, useEffect as xt } from "react";
function ml(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const gl = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, yl = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Cl = {};
function wr(e, t) {
  return (Cl.jsx ? yl : gl).test(e);
}
const wl = /[ \t\n\f\r]/g;
function xl(e) {
  return typeof e == "object" ? e.type === "text" ? xr(e.value) : !1 : xr(e);
}
function xr(e) {
  return e.replace(wl, "") === "";
}
class Vt {
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
Vt.prototype.normal = {};
Vt.prototype.property = {};
Vt.prototype.space = void 0;
function wi(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new Vt(n, r, t);
}
function Mn(e) {
  return e.toLowerCase();
}
class Re {
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
Re.prototype.attribute = "";
Re.prototype.booleanish = !1;
Re.prototype.boolean = !1;
Re.prototype.commaOrSpaceSeparated = !1;
Re.prototype.commaSeparated = !1;
Re.prototype.defined = !1;
Re.prototype.mustUseProperty = !1;
Re.prototype.number = !1;
Re.prototype.overloadedBoolean = !1;
Re.prototype.property = "";
Re.prototype.spaceSeparated = !1;
Re.prototype.space = void 0;
let kl = 0;
const V = bt(), ge = bt(), Rn = bt(), _ = bt(), re = bt(), Tt = bt(), Pe = bt();
function bt() {
  return 2 ** ++kl;
}
const Dn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: V,
  booleanish: ge,
  commaOrSpaceSeparated: Pe,
  commaSeparated: Tt,
  number: _,
  overloadedBoolean: Rn,
  spaceSeparated: re
}, Symbol.toStringTag, { value: "Module" })), dn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Dn)
);
class qn extends Re {
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
        kr(this, dn[l], (r & Dn[o]) === Dn[o]);
      }
  }
}
qn.prototype.defined = !0;
function kr(e, t, n) {
  n && (e[t] = n);
}
function At(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const l = new qn(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (l.mustUseProperty = !0), t[r] = l, n[Mn(r)] = r, n[Mn(l.attribute)] = r;
  }
  return new Vt(t, n, e.space);
}
const xi = At({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: ge,
    ariaAutoComplete: null,
    ariaBusy: ge,
    ariaChecked: ge,
    ariaColCount: _,
    ariaColIndex: _,
    ariaColSpan: _,
    ariaControls: re,
    ariaCurrent: null,
    ariaDescribedBy: re,
    ariaDetails: null,
    ariaDisabled: ge,
    ariaDropEffect: re,
    ariaErrorMessage: null,
    ariaExpanded: ge,
    ariaFlowTo: re,
    ariaGrabbed: ge,
    ariaHasPopup: null,
    ariaHidden: ge,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: re,
    ariaLevel: _,
    ariaLive: null,
    ariaModal: ge,
    ariaMultiLine: ge,
    ariaMultiSelectable: ge,
    ariaOrientation: null,
    ariaOwns: re,
    ariaPlaceholder: null,
    ariaPosInSet: _,
    ariaPressed: ge,
    ariaReadOnly: ge,
    ariaRelevant: null,
    ariaRequired: ge,
    ariaRoleDescription: re,
    ariaRowCount: _,
    ariaRowIndex: _,
    ariaRowSpan: _,
    ariaSelected: ge,
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
function ki(e, t) {
  return t in e ? e[t] : t;
}
function bi(e, t) {
  return ki(e, t.toLowerCase());
}
const bl = At({
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
    acceptCharset: re,
    accessKey: re,
    action: null,
    allow: null,
    allowFullScreen: V,
    allowPaymentRequest: V,
    allowUserMedia: V,
    alt: null,
    as: null,
    async: V,
    autoCapitalize: null,
    autoComplete: re,
    autoFocus: V,
    autoPlay: V,
    blocking: re,
    capture: null,
    charSet: null,
    checked: V,
    cite: null,
    className: re,
    cols: _,
    colSpan: null,
    content: null,
    contentEditable: ge,
    controls: V,
    controlsList: re,
    coords: _ | Tt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: V,
    defer: V,
    dir: null,
    dirName: null,
    disabled: V,
    download: Rn,
    draggable: ge,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: V,
    formTarget: null,
    headers: re,
    height: _,
    hidden: Rn,
    high: _,
    href: null,
    hrefLang: null,
    htmlFor: re,
    httpEquiv: re,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: V,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: V,
    itemId: null,
    itemProp: re,
    itemRef: re,
    itemScope: V,
    itemType: re,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: V,
    low: _,
    manifest: null,
    max: null,
    maxLength: _,
    media: null,
    method: null,
    min: null,
    minLength: _,
    multiple: V,
    muted: V,
    name: null,
    nonce: null,
    noModule: V,
    noValidate: V,
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
    open: V,
    optimum: _,
    pattern: null,
    ping: re,
    placeholder: null,
    playsInline: V,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: V,
    referrerPolicy: null,
    rel: re,
    required: V,
    reversed: V,
    rows: _,
    rowSpan: _,
    sandbox: re,
    scope: null,
    scoped: V,
    seamless: V,
    selected: V,
    shadowRootClonable: V,
    shadowRootDelegatesFocus: V,
    shadowRootMode: null,
    shape: null,
    size: _,
    sizes: null,
    slot: null,
    span: _,
    spellCheck: ge,
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
    typeMustMatch: V,
    useMap: null,
    value: ge,
    width: _,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: re,
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
    compact: V,
    // Lists. Use CSS to reduce space between items instead
    declare: V,
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
    noResize: V,
    // `<frame>`
    noHref: V,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: V,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: V,
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
    scrolling: ge,
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
    disablePictureInPicture: V,
    disableRemotePlayback: V,
    prefix: null,
    property: null,
    results: _,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: bi
}), _l = At({
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
    about: Pe,
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
    className: re,
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
    download: V,
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
    g1: Tt,
    g2: Tt,
    glyphName: Tt,
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
    kernelMatrix: Pe,
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
    ping: re,
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
    property: Pe,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Pe,
    rev: Pe,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Pe,
    requiredFeatures: Pe,
    requiredFonts: Pe,
    requiredFormats: Pe,
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
    strokeDashArray: Pe,
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
    systemLanguage: Pe,
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
    typeOf: Pe,
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
  transform: ki
}), _i = At({
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
}), Si = At({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: bi
}), Ei = At({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), Sl = {
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
}, El = /[A-Z]/g, br = /-[a-z]/g, Tl = /^data[-\w.:]+$/i;
function vl(e, t) {
  const n = Mn(t);
  let r = t, i = Re;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Tl.test(t)) {
    if (t.charAt(4) === "-") {
      const l = t.slice(5).replace(br, Il);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = t.slice(4);
      if (!br.test(l)) {
        let o = l.replace(El, Al);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    i = qn;
  }
  return new i(r, t);
}
function Al(e) {
  return "-" + e.toLowerCase();
}
function Il(e) {
  return e.charAt(1).toUpperCase();
}
const Ll = wi([xi, bl, _i, Si, Ei], "html"), Gn = wi([xi, _l, _i, Si, Ei], "svg");
function Nl(e) {
  return e.join(" ").trim();
}
var tn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ti(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Yn = {}, _r = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Ml = /\n/g, Rl = /^\s*/, Dl = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Ol = /^:\s*/, Pl = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, zl = /^[;\s]*/, Fl = /^\s+|\s+$/g, Bl = `
`, Sr = "/", Er = "*", kt = "", Ul = "comment", Hl = "declaration", Vl = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(x) {
    var k = x.match(Ml);
    k && (n += k.length);
    var I = x.lastIndexOf(Bl);
    r = ~I ? x.length - I : r + x.length;
  }
  function l() {
    var x = { line: n, column: r };
    return function(k) {
      return k.position = new o(x), u(), k;
    };
  }
  function o(x) {
    this.start = x, this.end = { line: n, column: r }, this.source = t.source;
  }
  o.prototype.content = e;
  function a(x) {
    var k = new Error(
      t.source + ":" + n + ":" + r + ": " + x
    );
    if (k.reason = x, k.filename = t.source, k.line = n, k.column = r, k.source = e, !t.silent) throw k;
  }
  function s(x) {
    var k = x.exec(e);
    if (k) {
      var I = k[0];
      return i(I), e = e.slice(I.length), k;
    }
  }
  function u() {
    s(Rl);
  }
  function c(x) {
    var k;
    for (x = x || []; k = f(); )
      k !== !1 && x.push(k);
    return x;
  }
  function f() {
    var x = l();
    if (!(Sr != e.charAt(0) || Er != e.charAt(1))) {
      for (var k = 2; kt != e.charAt(k) && (Er != e.charAt(k) || Sr != e.charAt(k + 1)); )
        ++k;
      if (k += 2, kt === e.charAt(k - 1))
        return a("End of comment missing");
      var I = e.slice(2, k - 2);
      return r += 2, i(I), e = e.slice(k), r += 2, x({
        type: Ul,
        comment: I
      });
    }
  }
  function g() {
    var x = l(), k = s(Dl);
    if (k) {
      if (f(), !s(Ol)) return a("property missing ':'");
      var I = s(Pl), b = x({
        type: Hl,
        property: Tr(k[0].replace(_r, kt)),
        value: I ? Tr(I[0].replace(_r, kt)) : kt
      });
      return s(zl), b;
    }
  }
  function h() {
    var x = [];
    c(x);
    for (var k; k = g(); )
      k !== !1 && (x.push(k), c(x));
    return x;
  }
  return u(), h();
};
function Tr(e) {
  return e ? e.replace(Fl, kt) : kt;
}
var jl = tn && tn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.default = $l;
var Wl = jl(Vl);
function $l(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, Wl.default)(e), i = typeof t == "function";
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
var Zl = /^--[a-zA-Z0-9_-]+$/, ql = /-([a-z])/g, Gl = /^[^-]+$/, Yl = /^-(webkit|moz|ms|o|khtml)-/, Xl = /^-(ms)-/, Jl = function(e) {
  return !e || Gl.test(e) || Zl.test(e);
}, Kl = function(e, t) {
  return t.toUpperCase();
}, vr = function(e, t) {
  return "".concat(t, "-");
}, Ql = function(e, t) {
  return t === void 0 && (t = {}), Jl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Xl, vr) : e = e.replace(Yl, vr), e.replace(ql, Kl));
};
on.camelCase = Ql;
var eo = tn && tn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, to = eo(Yn), no = on;
function On(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, to.default)(e, function(r, i) {
    r && i && (n[(0, no.camelCase)(r, t)] = i);
  }), n;
}
On.default = On;
var ro = On;
const io = /* @__PURE__ */ Ti(ro), vi = Ai("end"), Xn = Ai("start");
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
function lo(e) {
  const t = Xn(e), n = vi(e);
  if (t && n)
    return { start: t, end: n };
}
function Ft(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Ar(e.position) : "start" in e || "end" in e ? Ar(e) : "line" in e || "column" in e ? Pn(e) : "";
}
function Pn(e) {
  return Ir(e && e.line) + ":" + Ir(e && e.column);
}
function Ar(e) {
  return Pn(e && e.start) + "-" + Pn(e && e.end);
}
function Ir(e) {
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
const Jn = {}.hasOwnProperty, oo = /* @__PURE__ */ new Map(), ao = /[A-Z]/g, so = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), uo = /* @__PURE__ */ new Set(["td", "th"]), Ii = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function co(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = wo(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Co(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? Gn : Ll,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, l = Li(i, e, void 0);
  return l && typeof l != "string" ? l : i.create(
    e,
    i.Fragment,
    { children: l || void 0 },
    void 0
  );
}
function Li(e, t, n) {
  if (t.type === "element")
    return po(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return ho(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return mo(e, t, n);
  if (t.type === "mdxjsEsm")
    return fo(e, t);
  if (t.type === "root")
    return go(e, t, n);
  if (t.type === "text")
    return yo(e, t);
}
function po(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Gn, e.schema = i), e.ancestors.push(t);
  const l = Mi(e, t.tagName, !1), o = xo(e, t);
  let a = Qn(e, t);
  return so.has(t.tagName) && (a = a.filter(function(s) {
    return typeof s == "string" ? !xl(s) : !0;
  })), Ni(e, o, l, t), Kn(o, a), e.ancestors.pop(), e.schema = r, e.create(t, l, o, n);
}
function ho(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Ht(e, t.position);
}
function fo(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Ht(e, t.position);
}
function mo(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = Gn, e.schema = i), e.ancestors.push(t);
  const l = t.name === null ? e.Fragment : Mi(e, t.name, !0), o = ko(e, t), a = Qn(e, t);
  return Ni(e, o, l, t), Kn(o, a), e.ancestors.pop(), e.schema = r, e.create(t, l, o, n);
}
function go(e, t, n) {
  const r = {};
  return Kn(r, Qn(e, t)), e.create(t, e.Fragment, r, n);
}
function yo(e, t) {
  return t.value;
}
function Ni(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function Kn(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function Co(e, t, n) {
  return r;
  function r(i, l, o, a) {
    const u = Array.isArray(o.children) ? n : t;
    return a ? u(l, o, a) : u(l, o);
  }
}
function wo(e, t) {
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
function xo(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && Jn.call(t.properties, i)) {
      const l = bo(e, i, t.properties[i]);
      if (l) {
        const [o, a] = l;
        e.tableCellAlignToStyle && o === "align" && typeof a == "string" && uo.has(t.tagName) ? r = a : n[o] = a;
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
function ko(e, t) {
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
  const i = e.passKeys ? /* @__PURE__ */ new Map() : oo;
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
    const a = Li(e, l, o);
    a !== void 0 && n.push(a);
  }
  return n;
}
function bo(e, t, n) {
  const r = vl(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? ml(n) : Nl(n)), r.property === "style") {
      let i = typeof n == "object" ? n : _o(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = So(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Sl[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function _o(e, t) {
  try {
    return io(t, { reactCompat: !0 });
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
function Mi(e, t, n) {
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
    return Jn.call(e.components, i) ? e.components[i] : i;
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
function So(e) {
  const t = {};
  let n;
  for (n in e)
    Jn.call(e, n) && (t[Eo(n)] = e[n]);
  return t;
}
function Eo(e) {
  let t = e.replace(ao, To);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function To(e) {
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
}, vo = {};
function Ao(e, t) {
  const n = vo, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Ri(e, r, i);
}
function Ri(e, t, n) {
  if (Io(e)) {
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
    r[i] = Ri(e[i], t, n);
  return r.join("");
}
function Io(e) {
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
function Je(e, t, n, r) {
  const i = e.length;
  let l = 0, o;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(t, n), e.splice(...o);
  else
    for (n && e.splice(t, n); l < r.length; )
      o = r.slice(l, l + 1e4), o.unshift(t, 0), e.splice(...o), l += 1e4, t += 1e4;
}
function Fe(e, t) {
  return e.length > 0 ? (Je(e, e.length, 0, t), e) : t;
}
const Mr = {}.hasOwnProperty;
function Lo(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    No(t, e[n]);
  return t;
}
function No(e, t) {
  let n;
  for (n in t) {
    const i = (Mr.call(e, n) ? e[n] : void 0) || (e[n] = {}), l = t[n];
    let o;
    if (l)
      for (o in l) {
        Mr.call(i, o) || (i[o] = []);
        const a = l[o];
        Mo(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function Mo(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  Je(e, 0, 0, r);
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
function vt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Xe = mt(/[A-Za-z]/), ze = mt(/[\dA-Za-z]/), Ro = mt(/[#-'*+\--9=?A-Z^-~]/);
function zn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Fn = mt(/\d/), Do = mt(/[\dA-Fa-f]/), Oo = mt(/[!-/:-@[-`{-~]/);
function F(e) {
  return e !== null && e < -2;
}
function Me(e) {
  return e !== null && (e < 0 || e === 32);
}
function Q(e) {
  return e === -2 || e === -1 || e === 32;
}
const Po = mt(new RegExp("\\p{P}|\\p{S}", "u")), zo = mt(/\s/);
function mt(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function It(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const l = e.charCodeAt(n);
    let o = "";
    if (l === 37 && ze(e.charCodeAt(n + 1)) && ze(e.charCodeAt(n + 2)))
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
function ie(e, t, n, r) {
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
const Fo = {
  tokenize: Bo
};
function Bo(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), ie(e, t, "linePrefix");
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
    return F(a) ? (e.consume(a), e.exit("chunkText"), l) : (e.consume(a), o);
  }
}
const Uo = {
  tokenize: Ho
}, Rr = {
  tokenize: Vo
};
function Ho(e) {
  const t = this, n = [];
  let r = 0, i, l, o;
  return a;
  function a(v) {
    if (r < n.length) {
      const N = n[r];
      return t.containerState = N[1], e.attempt(N[0].continuation, s, u)(v);
    }
    return u(v);
  }
  function s(v) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && A();
      const N = t.events.length;
      let H = N, C;
      for (; H--; )
        if (t.events[H][0] === "exit" && t.events[H][1].type === "chunkFlow") {
          C = t.events[H][1].end;
          break;
        }
      b(r);
      let Z = N;
      for (; Z < t.events.length; )
        t.events[Z][1].end = {
          ...C
        }, Z++;
      return Je(t.events, H + 1, 0, t.events.slice(N)), t.events.length = Z, u(v);
    }
    return a(v);
  }
  function u(v) {
    if (r === n.length) {
      if (!i)
        return g(v);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return x(v);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(Rr, c, f)(v);
  }
  function c(v) {
    return i && A(), b(r), g(v);
  }
  function f(v) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, x(v);
  }
  function g(v) {
    return t.containerState = {}, e.attempt(Rr, h, x)(v);
  }
  function h(v) {
    return r++, n.push([t.currentConstruct, t.containerState]), g(v);
  }
  function x(v) {
    if (v === null) {
      i && A(), b(0), e.consume(v);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: l
    }), k(v);
  }
  function k(v) {
    if (v === null) {
      I(e.exit("chunkFlow"), !0), b(0), e.consume(v);
      return;
    }
    return F(v) ? (e.consume(v), I(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, a) : (e.consume(v), k);
  }
  function I(v, N) {
    const H = t.sliceStream(v);
    if (N && H.push(null), v.previous = l, l && (l.next = v), l = v, i.defineSkip(v.start), i.write(H), t.parser.lazy[v.start.line]) {
      let C = i.events.length;
      for (; C--; )
        if (
          // The token starts before the line ending…
          i.events[C][1].start.offset < o && // …and either is not ended yet…
          (!i.events[C][1].end || // …or ends after it.
          i.events[C][1].end.offset > o)
        )
          return;
      const Z = t.events.length;
      let te = Z, G, X;
      for (; te--; )
        if (t.events[te][0] === "exit" && t.events[te][1].type === "chunkFlow") {
          if (G) {
            X = t.events[te][1].end;
            break;
          }
          G = !0;
        }
      for (b(r), C = Z; C < t.events.length; )
        t.events[C][1].end = {
          ...X
        }, C++;
      Je(t.events, te + 1, 0, t.events.slice(Z)), t.events.length = C;
    }
  }
  function b(v) {
    let N = n.length;
    for (; N-- > v; ) {
      const H = n[N];
      t.containerState = H[1], H[0].exit.call(t, e);
    }
    n.length = v;
  }
  function A() {
    i.write([null]), l = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Vo(e, t, n) {
  return ie(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Dr(e) {
  if (e === null || Me(e) || zo(e))
    return 1;
  if (Po(e))
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
  resolveAll: jo,
  tokenize: Wo
};
function jo(e, t) {
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
          }, g = {
            ...e[n][1].start
          };
          Or(f, -s), Or(g, s), o = {
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
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = Fe(u, [["enter", e[r][1], t], ["exit", e[r][1], t]])), u = Fe(u, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["enter", l, t]]), u = Fe(u, tr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), u = Fe(u, [["exit", l, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (c = 2, u = Fe(u, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : c = 0, Je(e, r - 1, n - r + 3, u), n = r + u.length - c - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Wo(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Dr(r);
  let l;
  return o;
  function o(s) {
    return l = s, e.enter("attentionSequence"), a(s);
  }
  function a(s) {
    if (s === l)
      return e.consume(s), a;
    const u = e.exit("attentionSequence"), c = Dr(s), f = !c || c === 2 && i || n.includes(s), g = !i || i === 2 && c || n.includes(r);
    return u._open = !!(l === 42 ? f : f && (i || !g)), u._close = !!(l === 42 ? g : g && (c || !f)), t(s);
  }
}
function Or(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const $o = {
  name: "autolink",
  tokenize: Zo
};
function Zo(e, t, n) {
  let r = 0;
  return i;
  function i(h) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), l;
  }
  function l(h) {
    return Xe(h) ? (e.consume(h), o) : h === 64 ? n(h) : u(h);
  }
  function o(h) {
    return h === 43 || h === 45 || h === 46 || ze(h) ? (r = 1, a(h)) : u(h);
  }
  function a(h) {
    return h === 58 ? (e.consume(h), r = 0, s) : (h === 43 || h === 45 || h === 46 || ze(h)) && r++ < 32 ? (e.consume(h), a) : (r = 0, u(h));
  }
  function s(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : h === null || h === 32 || h === 60 || zn(h) ? n(h) : (e.consume(h), s);
  }
  function u(h) {
    return h === 64 ? (e.consume(h), c) : Ro(h) ? (e.consume(h), u) : n(h);
  }
  function c(h) {
    return ze(h) ? f(h) : n(h);
  }
  function f(h) {
    return h === 46 ? (e.consume(h), r = 0, c) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : g(h);
  }
  function g(h) {
    if ((h === 45 || ze(h)) && r++ < 63) {
      const x = h === 45 ? g : f;
      return e.consume(h), x;
    }
    return n(h);
  }
}
const an = {
  partial: !0,
  tokenize: qo
};
function qo(e, t, n) {
  return r;
  function r(l) {
    return Q(l) ? ie(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || F(l) ? t(l) : n(l);
  }
}
const Oi = {
  continuation: {
    tokenize: Yo
  },
  exit: Xo,
  name: "blockQuote",
  tokenize: Go
};
function Go(e, t, n) {
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
function Yo(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return Q(o) ? ie(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : l(o);
  }
  function l(o) {
    return e.attempt(Oi, t, n)(o);
  }
}
function Xo(e) {
  e.exit("blockQuote");
}
const Pi = {
  name: "characterEscape",
  tokenize: Jo
};
function Jo(e, t, n) {
  return r;
  function r(l) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(l), e.exit("escapeMarker"), i;
  }
  function i(l) {
    return Oo(l) ? (e.enter("characterEscapeValue"), e.consume(l), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(l);
  }
}
const zi = {
  name: "characterReference",
  tokenize: Ko
};
function Ko(e, t, n) {
  const r = this;
  let i = 0, l, o;
  return a;
  function a(f) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), s;
  }
  function s(f) {
    return f === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(f), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), l = 31, o = ze, c(f));
  }
  function u(f) {
    return f === 88 || f === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(f), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), l = 6, o = Do, c) : (e.enter("characterReferenceValue"), l = 7, o = Fn, c(f));
  }
  function c(f) {
    if (f === 59 && i) {
      const g = e.exit("characterReferenceValue");
      return o === ze && !er(r.sliceSerialize(g)) ? n(f) : (e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return o(f) && i++ < l ? (e.consume(f), c) : n(f);
  }
}
const Pr = {
  partial: !0,
  tokenize: ea
}, zr = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Qo
};
function Qo(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: H
  };
  let l = 0, o = 0, a;
  return s;
  function s(C) {
    return u(C);
  }
  function u(C) {
    const Z = r.events[r.events.length - 1];
    return l = Z && Z[1].type === "linePrefix" ? Z[2].sliceSerialize(Z[1], !0).length : 0, a = C, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), c(C);
  }
  function c(C) {
    return C === a ? (o++, e.consume(C), c) : o < 3 ? n(C) : (e.exit("codeFencedFenceSequence"), Q(C) ? ie(e, f, "whitespace")(C) : f(C));
  }
  function f(C) {
    return C === null || F(C) ? (e.exit("codeFencedFence"), r.interrupt ? t(C) : e.check(Pr, k, N)(C)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), g(C));
  }
  function g(C) {
    return C === null || F(C) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), f(C)) : Q(C) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), ie(e, h, "whitespace")(C)) : C === 96 && C === a ? n(C) : (e.consume(C), g);
  }
  function h(C) {
    return C === null || F(C) ? f(C) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), x(C));
  }
  function x(C) {
    return C === null || F(C) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), f(C)) : C === 96 && C === a ? n(C) : (e.consume(C), x);
  }
  function k(C) {
    return e.attempt(i, N, I)(C);
  }
  function I(C) {
    return e.enter("lineEnding"), e.consume(C), e.exit("lineEnding"), b;
  }
  function b(C) {
    return l > 0 && Q(C) ? ie(e, A, "linePrefix", l + 1)(C) : A(C);
  }
  function A(C) {
    return C === null || F(C) ? e.check(Pr, k, N)(C) : (e.enter("codeFlowValue"), v(C));
  }
  function v(C) {
    return C === null || F(C) ? (e.exit("codeFlowValue"), A(C)) : (e.consume(C), v);
  }
  function N(C) {
    return e.exit("codeFenced"), t(C);
  }
  function H(C, Z, te) {
    let G = 0;
    return X;
    function X(j) {
      return C.enter("lineEnding"), C.consume(j), C.exit("lineEnding"), L;
    }
    function L(j) {
      return C.enter("codeFencedFence"), Q(j) ? ie(C, R, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(j) : R(j);
    }
    function R(j) {
      return j === a ? (C.enter("codeFencedFenceSequence"), J(j)) : te(j);
    }
    function J(j) {
      return j === a ? (G++, C.consume(j), J) : G >= o ? (C.exit("codeFencedFenceSequence"), Q(j) ? ie(C, ee, "whitespace")(j) : ee(j)) : te(j);
    }
    function ee(j) {
      return j === null || F(j) ? (C.exit("codeFencedFence"), Z(j)) : te(j);
    }
  }
}
function ea(e, t, n) {
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
  tokenize: na
}, ta = {
  partial: !0,
  tokenize: ra
};
function na(e, t, n) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("codeIndented"), ie(e, l, "linePrefix", 5)(u);
  }
  function l(u) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? o(u) : n(u);
  }
  function o(u) {
    return u === null ? s(u) : F(u) ? e.attempt(ta, o, s)(u) : (e.enter("codeFlowValue"), a(u));
  }
  function a(u) {
    return u === null || F(u) ? (e.exit("codeFlowValue"), o(u)) : (e.consume(u), a);
  }
  function s(u) {
    return e.exit("codeIndented"), t(u);
  }
}
function ra(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : F(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : ie(e, l, "linePrefix", 5)(o);
  }
  function l(o) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(o) : F(o) ? i(o) : n(o);
  }
}
const ia = {
  name: "codeText",
  previous: oa,
  resolve: la,
  tokenize: aa
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
function oa(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function aa(e, t, n) {
  let r = 0, i, l;
  return o;
  function o(f) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(f);
  }
  function a(f) {
    return f === 96 ? (e.consume(f), r++, a) : (e.exit("codeTextSequence"), s(f));
  }
  function s(f) {
    return f === null ? n(f) : f === 32 ? (e.enter("space"), e.consume(f), e.exit("space"), s) : f === 96 ? (l = e.enter("codeTextSequence"), i = 0, c(f)) : F(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(f));
  }
  function u(f) {
    return f === null || f === 32 || f === 96 || F(f) ? (e.exit("codeTextData"), s(f)) : (e.consume(f), u);
  }
  function c(f) {
    return f === 96 ? (e.consume(f), i++, c) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(f)) : (l.type = "codeTextData", u(f));
  }
}
class sa {
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
function Fi(e) {
  const t = {};
  let n = -1, r, i, l, o, a, s, u;
  const c = new sa(e);
  for (; ++n < c.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = c.get(n), n && r[1].type === "chunkFlow" && c.get(n - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, l = 0, l < s.length && s[l][1].type === "lineEndingBlank" && (l += 2), l < s.length && s[l][1].type === "content"))
      for (; ++l < s.length && s[l][1].type !== "content"; )
        s[l][1].type === "chunkText" && (s[l][1]._isInFirstContentOfListItem = !0, l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, ua(c, n)), n = t[n], u = !0);
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
  return Je(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !u;
}
function ua(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const l = [];
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const a = o.events, s = [], u = {};
  let c, f, g = -1, h = n, x = 0, k = 0;
  const I = [k];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; )
      ;
    l.push(i), h._tokenizer || (c = r.sliceStream(h), h.next || c.push(null), f && o.defineSkip(h.start), h._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(c), h._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), f = h, h = h.next;
  }
  for (h = n; ++g < a.length; )
    // Find a void token that includes a break.
    a[g][0] === "exit" && a[g - 1][0] === "enter" && a[g][1].type === a[g - 1][1].type && a[g][1].start.line !== a[g][1].end.line && (k = g + 1, I.push(k), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (o.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : I.pop(), g = I.length; g--; ) {
    const b = a.slice(I[g], I[g + 1]), A = l.pop();
    s.push([A, A + b.length - 1]), e.splice(A, 2, b);
  }
  for (s.reverse(), g = -1; ++g < s.length; )
    u[x + s[g][0]] = x + s[g][1], x += s[g][1] - s[g][0] - 1;
  return u;
}
const ca = {
  resolve: ha,
  tokenize: fa
}, pa = {
  partial: !0,
  tokenize: da
};
function ha(e) {
  return Fi(e), e;
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
    return a === null ? l(a) : F(a) ? e.check(pa, o, l)(a) : (e.consume(a), i);
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
function da(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), ie(e, l, "linePrefix");
  }
  function l(o) {
    if (o === null || F(o))
      return n(o);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function Bi(e, t, n, r, i, l, o, a, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let c = 0;
  return f;
  function f(b) {
    return b === 60 ? (e.enter(r), e.enter(i), e.enter(l), e.consume(b), e.exit(l), g) : b === null || b === 32 || b === 41 || zn(b) ? n(b) : (e.enter(r), e.enter(o), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), k(b));
  }
  function g(b) {
    return b === 62 ? (e.enter(l), e.consume(b), e.exit(l), e.exit(i), e.exit(r), t) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), h(b));
  }
  function h(b) {
    return b === 62 ? (e.exit("chunkString"), e.exit(a), g(b)) : b === null || b === 60 || F(b) ? n(b) : (e.consume(b), b === 92 ? x : h);
  }
  function x(b) {
    return b === 60 || b === 62 || b === 92 ? (e.consume(b), h) : h(b);
  }
  function k(b) {
    return !c && (b === null || b === 41 || Me(b)) ? (e.exit("chunkString"), e.exit(a), e.exit(o), e.exit(r), t(b)) : c < u && b === 40 ? (e.consume(b), c++, k) : b === 41 ? (e.consume(b), c--, k) : b === null || b === 32 || b === 40 || zn(b) ? n(b) : (e.consume(b), b === 92 ? I : k);
  }
  function I(b) {
    return b === 40 || b === 41 || b === 92 ? (e.consume(b), k) : k(b);
  }
}
function Ui(e, t, n, r, i, l) {
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
    h === 94 && !a && "_hiddenFootnoteSupport" in o.parser.constructs ? n(h) : h === 93 ? (e.exit(l), e.enter(i), e.consume(h), e.exit(i), e.exit(r), t) : F(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), c) : (e.enter("chunkString", {
      contentType: "string"
    }), f(h));
  }
  function f(h) {
    return h === null || h === 91 || h === 93 || F(h) || a++ > 999 ? (e.exit("chunkString"), c(h)) : (e.consume(h), s || (s = !Q(h)), h === 92 ? g : f);
  }
  function g(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), a++, f) : f(h);
  }
}
function Hi(e, t, n, r, i, l) {
  let o;
  return a;
  function a(g) {
    return g === 34 || g === 39 || g === 40 ? (e.enter(r), e.enter(i), e.consume(g), e.exit(i), o = g === 40 ? 41 : g, s) : n(g);
  }
  function s(g) {
    return g === o ? (e.enter(i), e.consume(g), e.exit(i), e.exit(r), t) : (e.enter(l), u(g));
  }
  function u(g) {
    return g === o ? (e.exit(l), s(o)) : g === null ? n(g) : F(g) ? (e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), ie(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), c(g));
  }
  function c(g) {
    return g === o || g === null || F(g) ? (e.exit("chunkString"), u(g)) : (e.consume(g), g === 92 ? f : c);
  }
  function f(g) {
    return g === o || g === 92 ? (e.consume(g), c) : c(g);
  }
}
function Bt(e, t) {
  let n;
  return r;
  function r(i) {
    return F(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : Q(i) ? ie(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const ma = {
  name: "definition",
  tokenize: ya
}, ga = {
  partial: !0,
  tokenize: Ca
};
function ya(e, t, n) {
  const r = this;
  let i;
  return l;
  function l(h) {
    return e.enter("definition"), o(h);
  }
  function o(h) {
    return Ui.call(
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
    return i = vt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), s) : n(h);
  }
  function s(h) {
    return Me(h) ? Bt(e, u)(h) : u(h);
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
    return e.attempt(ga, f, f)(h);
  }
  function f(h) {
    return Q(h) ? ie(e, g, "whitespace")(h) : g(h);
  }
  function g(h) {
    return h === null || F(h) ? (e.exit("definition"), r.parser.defined.push(i), t(h)) : n(h);
  }
}
function Ca(e, t, n) {
  return r;
  function r(a) {
    return Me(a) ? Bt(e, i)(a) : n(a);
  }
  function i(a) {
    return Hi(e, l, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function l(a) {
    return Q(a) ? ie(e, o, "whitespace")(a) : o(a);
  }
  function o(a) {
    return a === null || F(a) ? t(a) : n(a);
  }
}
const wa = {
  name: "hardBreakEscape",
  tokenize: xa
};
function xa(e, t, n) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return F(l) ? (e.exit("hardBreakEscape"), t(l)) : n(l);
  }
}
const ka = {
  name: "headingAtx",
  resolve: ba,
  tokenize: _a
};
function ba(e, t) {
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
  }, Je(e, r, n - r + 1, [["enter", i, t], ["enter", l, t], ["exit", l, t], ["exit", i, t]])), e;
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
    return c === 35 && r++ < 6 ? (e.consume(c), o) : c === null || Me(c) ? (e.exit("atxHeadingSequence"), a(c)) : n(c);
  }
  function a(c) {
    return c === 35 ? (e.enter("atxHeadingSequence"), s(c)) : c === null || F(c) ? (e.exit("atxHeading"), t(c)) : Q(c) ? ie(e, a, "whitespace")(c) : (e.enter("atxHeadingText"), u(c));
  }
  function s(c) {
    return c === 35 ? (e.consume(c), s) : (e.exit("atxHeadingSequence"), a(c));
  }
  function u(c) {
    return c === null || c === 35 || Me(c) ? (e.exit("atxHeadingText"), a(c)) : (e.consume(c), u);
  }
}
const Sa = [
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
], Fr = ["pre", "script", "style", "textarea"], Ea = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Aa,
  tokenize: Ia
}, Ta = {
  partial: !0,
  tokenize: Na
}, va = {
  partial: !0,
  tokenize: La
};
function Aa(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Ia(e, t, n) {
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
    return d === 33 ? (e.consume(d), g) : d === 47 ? (e.consume(d), l = !0, k) : d === 63 ? (e.consume(d), i = 3, r.interrupt ? t : m) : Xe(d) ? (e.consume(d), o = String.fromCharCode(d), I) : n(d);
  }
  function g(d) {
    return d === 45 ? (e.consume(d), i = 2, h) : d === 91 ? (e.consume(d), i = 5, a = 0, x) : Xe(d) ? (e.consume(d), i = 4, r.interrupt ? t : m) : n(d);
  }
  function h(d) {
    return d === 45 ? (e.consume(d), r.interrupt ? t : m) : n(d);
  }
  function x(d) {
    const ce = "CDATA[";
    return d === ce.charCodeAt(a++) ? (e.consume(d), a === ce.length ? r.interrupt ? t : R : x) : n(d);
  }
  function k(d) {
    return Xe(d) ? (e.consume(d), o = String.fromCharCode(d), I) : n(d);
  }
  function I(d) {
    if (d === null || d === 47 || d === 62 || Me(d)) {
      const ce = d === 47, K = o.toLowerCase();
      return !ce && !l && Fr.includes(K) ? (i = 1, r.interrupt ? t(d) : R(d)) : Sa.includes(o.toLowerCase()) ? (i = 6, ce ? (e.consume(d), b) : r.interrupt ? t(d) : R(d)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(d) : l ? A(d) : v(d));
    }
    return d === 45 || ze(d) ? (e.consume(d), o += String.fromCharCode(d), I) : n(d);
  }
  function b(d) {
    return d === 62 ? (e.consume(d), r.interrupt ? t : R) : n(d);
  }
  function A(d) {
    return Q(d) ? (e.consume(d), A) : X(d);
  }
  function v(d) {
    return d === 47 ? (e.consume(d), X) : d === 58 || d === 95 || Xe(d) ? (e.consume(d), N) : Q(d) ? (e.consume(d), v) : X(d);
  }
  function N(d) {
    return d === 45 || d === 46 || d === 58 || d === 95 || ze(d) ? (e.consume(d), N) : H(d);
  }
  function H(d) {
    return d === 61 ? (e.consume(d), C) : Q(d) ? (e.consume(d), H) : v(d);
  }
  function C(d) {
    return d === null || d === 60 || d === 61 || d === 62 || d === 96 ? n(d) : d === 34 || d === 39 ? (e.consume(d), s = d, Z) : Q(d) ? (e.consume(d), C) : te(d);
  }
  function Z(d) {
    return d === s ? (e.consume(d), s = null, G) : d === null || F(d) ? n(d) : (e.consume(d), Z);
  }
  function te(d) {
    return d === null || d === 34 || d === 39 || d === 47 || d === 60 || d === 61 || d === 62 || d === 96 || Me(d) ? H(d) : (e.consume(d), te);
  }
  function G(d) {
    return d === 47 || d === 62 || Q(d) ? v(d) : n(d);
  }
  function X(d) {
    return d === 62 ? (e.consume(d), L) : n(d);
  }
  function L(d) {
    return d === null || F(d) ? R(d) : Q(d) ? (e.consume(d), L) : n(d);
  }
  function R(d) {
    return d === 45 && i === 2 ? (e.consume(d), ae) : d === 60 && i === 1 ? (e.consume(d), ue) : d === 62 && i === 4 ? (e.consume(d), W) : d === 63 && i === 3 ? (e.consume(d), m) : d === 93 && i === 5 ? (e.consume(d), Ae) : F(d) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Ta, Ie, J)(d)) : d === null || F(d) ? (e.exit("htmlFlowData"), J(d)) : (e.consume(d), R);
  }
  function J(d) {
    return e.check(va, ee, Ie)(d);
  }
  function ee(d) {
    return e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), j;
  }
  function j(d) {
    return d === null || F(d) ? J(d) : (e.enter("htmlFlowData"), R(d));
  }
  function ae(d) {
    return d === 45 ? (e.consume(d), m) : R(d);
  }
  function ue(d) {
    return d === 47 ? (e.consume(d), o = "", ke) : R(d);
  }
  function ke(d) {
    if (d === 62) {
      const ce = o.toLowerCase();
      return Fr.includes(ce) ? (e.consume(d), W) : R(d);
    }
    return Xe(d) && o.length < 8 ? (e.consume(d), o += String.fromCharCode(d), ke) : R(d);
  }
  function Ae(d) {
    return d === 93 ? (e.consume(d), m) : R(d);
  }
  function m(d) {
    return d === 62 ? (e.consume(d), W) : d === 45 && i === 2 ? (e.consume(d), m) : R(d);
  }
  function W(d) {
    return d === null || F(d) ? (e.exit("htmlFlowData"), Ie(d)) : (e.consume(d), W);
  }
  function Ie(d) {
    return e.exit("htmlFlow"), t(d);
  }
}
function La(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return F(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l) : n(o);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function Na(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(an, t, n);
  }
}
const Ma = {
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
    return m === 33 ? (e.consume(m), u) : m === 47 ? (e.consume(m), H) : m === 63 ? (e.consume(m), v) : Xe(m) ? (e.consume(m), te) : n(m);
  }
  function u(m) {
    return m === 45 ? (e.consume(m), c) : m === 91 ? (e.consume(m), l = 0, x) : Xe(m) ? (e.consume(m), A) : n(m);
  }
  function c(m) {
    return m === 45 ? (e.consume(m), h) : n(m);
  }
  function f(m) {
    return m === null ? n(m) : m === 45 ? (e.consume(m), g) : F(m) ? (o = f, ue(m)) : (e.consume(m), f);
  }
  function g(m) {
    return m === 45 ? (e.consume(m), h) : f(m);
  }
  function h(m) {
    return m === 62 ? ae(m) : m === 45 ? g(m) : f(m);
  }
  function x(m) {
    const W = "CDATA[";
    return m === W.charCodeAt(l++) ? (e.consume(m), l === W.length ? k : x) : n(m);
  }
  function k(m) {
    return m === null ? n(m) : m === 93 ? (e.consume(m), I) : F(m) ? (o = k, ue(m)) : (e.consume(m), k);
  }
  function I(m) {
    return m === 93 ? (e.consume(m), b) : k(m);
  }
  function b(m) {
    return m === 62 ? ae(m) : m === 93 ? (e.consume(m), b) : k(m);
  }
  function A(m) {
    return m === null || m === 62 ? ae(m) : F(m) ? (o = A, ue(m)) : (e.consume(m), A);
  }
  function v(m) {
    return m === null ? n(m) : m === 63 ? (e.consume(m), N) : F(m) ? (o = v, ue(m)) : (e.consume(m), v);
  }
  function N(m) {
    return m === 62 ? ae(m) : v(m);
  }
  function H(m) {
    return Xe(m) ? (e.consume(m), C) : n(m);
  }
  function C(m) {
    return m === 45 || ze(m) ? (e.consume(m), C) : Z(m);
  }
  function Z(m) {
    return F(m) ? (o = Z, ue(m)) : Q(m) ? (e.consume(m), Z) : ae(m);
  }
  function te(m) {
    return m === 45 || ze(m) ? (e.consume(m), te) : m === 47 || m === 62 || Me(m) ? G(m) : n(m);
  }
  function G(m) {
    return m === 47 ? (e.consume(m), ae) : m === 58 || m === 95 || Xe(m) ? (e.consume(m), X) : F(m) ? (o = G, ue(m)) : Q(m) ? (e.consume(m), G) : ae(m);
  }
  function X(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || ze(m) ? (e.consume(m), X) : L(m);
  }
  function L(m) {
    return m === 61 ? (e.consume(m), R) : F(m) ? (o = L, ue(m)) : Q(m) ? (e.consume(m), L) : G(m);
  }
  function R(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (e.consume(m), i = m, J) : F(m) ? (o = R, ue(m)) : Q(m) ? (e.consume(m), R) : (e.consume(m), ee);
  }
  function J(m) {
    return m === i ? (e.consume(m), i = void 0, j) : m === null ? n(m) : F(m) ? (o = J, ue(m)) : (e.consume(m), J);
  }
  function ee(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96 ? n(m) : m === 47 || m === 62 || Me(m) ? G(m) : (e.consume(m), ee);
  }
  function j(m) {
    return m === 47 || m === 62 || Me(m) ? G(m) : n(m);
  }
  function ae(m) {
    return m === 62 ? (e.consume(m), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(m);
  }
  function ue(m) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), ke;
  }
  function ke(m) {
    return Q(m) ? ie(e, Ae, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m) : Ae(m);
  }
  function Ae(m) {
    return e.enter("htmlTextData"), o(m);
  }
}
const nr = {
  name: "labelEnd",
  resolveAll: za,
  resolveTo: Fa,
  tokenize: Ba
}, Da = {
  tokenize: Ua
}, Oa = {
  tokenize: Ha
}, Pa = {
  tokenize: Va
};
function za(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e.length !== n.length && Je(e, 0, e.length, n), e;
}
function Fa(e, t) {
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
  return a = [["enter", s, t], ["enter", u, t]], a = Fe(a, e.slice(l + 1, l + r + 3)), a = Fe(a, [["enter", c, t]]), a = Fe(a, tr(t.parser.constructs.insideSpan.null, e.slice(l + r + 4, o - 3), t)), a = Fe(a, [["exit", c, t], e[o - 2], e[o - 1], ["exit", u, t]]), a = Fe(a, e.slice(o + 1)), a = Fe(a, [["exit", s, t]]), Je(e, l, e.length, a), e;
}
function Ba(e, t, n) {
  const r = this;
  let i = r.events.length, l, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      l = r.events[i][1];
      break;
    }
  return a;
  function a(g) {
    return l ? l._inactive ? f(g) : (o = r.parser.defined.includes(vt(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(g), e.exit("labelMarker"), e.exit("labelEnd"), s) : n(g);
  }
  function s(g) {
    return g === 40 ? e.attempt(Da, c, o ? c : f)(g) : g === 91 ? e.attempt(Oa, c, o ? u : f)(g) : o ? c(g) : f(g);
  }
  function u(g) {
    return e.attempt(Pa, c, f)(g);
  }
  function c(g) {
    return t(g);
  }
  function f(g) {
    return l._balanced = !0, n(g);
  }
}
function Ua(e, t, n) {
  return r;
  function r(f) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), i;
  }
  function i(f) {
    return Me(f) ? Bt(e, l)(f) : l(f);
  }
  function l(f) {
    return f === 41 ? c(f) : Bi(e, o, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(f);
  }
  function o(f) {
    return Me(f) ? Bt(e, s)(f) : c(f);
  }
  function a(f) {
    return n(f);
  }
  function s(f) {
    return f === 34 || f === 39 || f === 40 ? Hi(e, u, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(f) : c(f);
  }
  function u(f) {
    return Me(f) ? Bt(e, c)(f) : c(f);
  }
  function c(f) {
    return f === 41 ? (e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), e.exit("resource"), t) : n(f);
  }
}
function Ha(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return Ui.call(r, e, l, o, "reference", "referenceMarker", "referenceString")(a);
  }
  function l(a) {
    return r.parser.defined.includes(vt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(a) : n(a);
  }
  function o(a) {
    return n(a);
  }
}
function Va(e, t, n) {
  return r;
  function r(l) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), i;
  }
  function i(l) {
    return l === 93 ? (e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), e.exit("reference"), t) : n(l);
  }
}
const ja = {
  name: "labelStartImage",
  resolveAll: nr.resolveAll,
  tokenize: Wa
};
function Wa(e, t, n) {
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
const $a = {
  name: "labelStartLink",
  resolveAll: nr.resolveAll,
  tokenize: Za
};
function Za(e, t, n) {
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
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), ie(e, t, "linePrefix");
  }
}
const Jt = {
  name: "thematicBreak",
  tokenize: Ga
};
function Ga(e, t, n) {
  let r = 0, i;
  return l;
  function l(u) {
    return e.enter("thematicBreak"), o(u);
  }
  function o(u) {
    return i = u, a(u);
  }
  function a(u) {
    return u === i ? (e.enter("thematicBreakSequence"), s(u)) : r >= 3 && (u === null || F(u)) ? (e.exit("thematicBreak"), t(u)) : n(u);
  }
  function s(u) {
    return u === i ? (e.consume(u), r++, s) : (e.exit("thematicBreakSequence"), Q(u) ? ie(e, a, "whitespace")(u) : a(u));
  }
}
const Ne = {
  continuation: {
    tokenize: Ka
  },
  exit: es,
  name: "list",
  tokenize: Ja
}, Ya = {
  partial: !0,
  tokenize: ts
}, Xa = {
  partial: !0,
  tokenize: Qa
};
function Ja(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let l = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return a;
  function a(h) {
    const x = r.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (x === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : Fn(h)) {
      if (r.containerState.type || (r.containerState.type = x, e.enter(x, {
        _container: !0
      })), x === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(Jt, n, u)(h) : u(h);
      if (!r.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(h);
    }
    return n(h);
  }
  function s(h) {
    return Fn(h) && ++o < 10 ? (e.consume(h), s) : (!r.interrupt || o < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), u(h)) : n(h);
  }
  function u(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e.check(
      an,
      // Can’t be empty when interrupting.
      r.interrupt ? n : c,
      e.attempt(Ya, g, f)
    );
  }
  function c(h) {
    return r.containerState.initialBlankLine = !0, l++, g(h);
  }
  function f(h) {
    return Q(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), g) : n(h);
  }
  function g(h) {
    return r.containerState.size = l + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(h);
  }
}
function Ka(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(an, i, l);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, ie(e, t, "listItemIndent", r.containerState.size + 1)(a);
  }
  function l(a) {
    return r.containerState.furtherBlankLines || !Q(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Xa, t, o)(a));
  }
  function o(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, ie(e, e.attempt(Ne, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function Qa(e, t, n) {
  const r = this;
  return ie(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(l) : n(l);
  }
}
function es(e) {
  e.exit(this.containerState.type);
}
function ts(e, t, n) {
  const r = this;
  return ie(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return !Q(l) && o && o[1].type === "listItemPrefixWhitespace" ? t(l) : n(l);
  }
}
const Br = {
  name: "setextUnderline",
  resolveTo: ns,
  tokenize: rs
};
function ns(e, t) {
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
function rs(e, t, n) {
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
    return u === i ? (e.consume(u), a) : (e.exit("setextHeadingLineSequence"), Q(u) ? ie(e, s, "lineSuffix")(u) : s(u));
  }
  function s(u) {
    return u === null || F(u) ? (e.exit("setextHeadingLine"), t(u)) : n(u);
  }
}
const is = {
  tokenize: ls
};
function ls(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    an,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, ie(e, e.attempt(this.parser.constructs.flow, i, e.attempt(ca, i)), "linePrefix"))
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
const os = {
  resolveAll: ji()
}, as = Vi("string"), ss = Vi("text");
function Vi(e) {
  return {
    resolveAll: ji(e === "text" ? us : void 0),
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
      let g = -1;
      if (f)
        for (; ++g < f.length; ) {
          const h = f[g];
          if (!h.previous || h.previous.call(r, r.previous))
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
function us(e, t) {
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
const cs = {
  42: Ne,
  43: Ne,
  45: Ne,
  48: Ne,
  49: Ne,
  50: Ne,
  51: Ne,
  52: Ne,
  53: Ne,
  54: Ne,
  55: Ne,
  56: Ne,
  57: Ne,
  62: Oi
}, ps = {
  91: ma
}, hs = {
  [-2]: gn,
  [-1]: gn,
  32: gn
}, fs = {
  35: ka,
  42: Jt,
  45: [Br, Jt],
  60: Ea,
  61: Br,
  95: Jt,
  96: zr,
  126: zr
}, ds = {
  38: zi,
  92: Pi
}, ms = {
  [-5]: yn,
  [-4]: yn,
  [-3]: yn,
  33: ja,
  38: zi,
  42: Bn,
  60: [$o, Ma],
  91: $a,
  92: [wa, Pi],
  93: nr,
  95: Bn,
  96: ia
}, gs = {
  null: [Bn, os]
}, ys = {
  null: [42, 95]
}, Cs = {
  null: []
}, ws = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: ys,
  contentInitial: ps,
  disable: Cs,
  document: cs,
  flow: fs,
  flowInitial: hs,
  insideSpan: gs,
  string: ds,
  text: ms
}, Symbol.toStringTag, { value: "Module" }));
function xs(e, t, n) {
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
    attempt: Z(H),
    check: Z(C),
    consume: A,
    enter: v,
    exit: N,
    interrupt: Z(C, {
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
    sliceSerialize: g,
    sliceStream: h,
    write: f
  };
  let c = t.tokenize.call(u, s);
  return t.resolveAll && l.push(t), u;
  function f(L) {
    return o = Fe(o, L), I(), o[o.length - 1] !== null ? [] : (te(t, 0), u.events = tr(l, u.events, u), u.events);
  }
  function g(L, R) {
    return bs(h(L), R);
  }
  function h(L) {
    return ks(o, L);
  }
  function x() {
    const {
      _bufferIndex: L,
      _index: R,
      line: J,
      column: ee,
      offset: j
    } = r;
    return {
      _bufferIndex: L,
      _index: R,
      line: J,
      column: ee,
      offset: j
    };
  }
  function k(L) {
    i[L.line] = L.column, X();
  }
  function I() {
    let L;
    for (; r._index < o.length; ) {
      const R = o[r._index];
      if (typeof R == "string")
        for (L = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === L && r._bufferIndex < R.length; )
          b(R.charCodeAt(r._bufferIndex));
      else
        b(R);
    }
  }
  function b(L) {
    c = c(L);
  }
  function A(L) {
    F(L) ? (r.line++, r.column = 1, r.offset += L === -3 ? 2 : 1, X()) : L !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = L;
  }
  function v(L, R) {
    const J = R || {};
    return J.type = L, J.start = x(), u.events.push(["enter", J, u]), a.push(J), J;
  }
  function N(L) {
    const R = a.pop();
    return R.end = x(), u.events.push(["exit", R, u]), R;
  }
  function H(L, R) {
    te(L, R.from);
  }
  function C(L, R) {
    R.restore();
  }
  function Z(L, R) {
    return J;
    function J(ee, j, ae) {
      let ue, ke, Ae, m;
      return Array.isArray(ee) ? (
        /* c8 ignore next 1 */
        Ie(ee)
      ) : "tokenize" in ee ? (
        // Looks like a construct.
        Ie([
          /** @type {Construct} */
          ee
        ])
      ) : W(ee);
      function W(le) {
        return Ue;
        function Ue(ye) {
          const Se = ye !== null && le[ye], Ce = ye !== null && le.null, $e = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Se) ? Se : Se ? [Se] : [],
            ...Array.isArray(Ce) ? Ce : Ce ? [Ce] : []
          ];
          return Ie($e)(ye);
        }
      }
      function Ie(le) {
        return ue = le, ke = 0, le.length === 0 ? ae : d(le[ke]);
      }
      function d(le) {
        return Ue;
        function Ue(ye) {
          return m = G(), Ae = le, le.partial || (u.currentConstruct = le), le.name && u.parser.constructs.disable.null.includes(le.name) ? K() : le.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            R ? Object.assign(Object.create(u), R) : u,
            s,
            ce,
            K
          )(ye);
        }
      }
      function ce(le) {
        return L(Ae, m), j;
      }
      function K(le) {
        return m.restore(), ++ke < ue.length ? d(ue[ke]) : ae;
      }
    }
  }
  function te(L, R) {
    L.resolveAll && !l.includes(L) && l.push(L), L.resolve && Je(u.events, R, u.events.length - R, L.resolve(u.events.slice(R), u)), L.resolveTo && (u.events = L.resolveTo(u.events, u));
  }
  function G() {
    const L = x(), R = u.previous, J = u.currentConstruct, ee = u.events.length, j = Array.from(a);
    return {
      from: ee,
      restore: ae
    };
    function ae() {
      r = L, u.previous = R, u.currentConstruct = J, u.events.length = ee, a = j, X();
    }
  }
  function X() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function ks(e, t) {
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
function bs(e, t) {
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
      Lo([ws, ...(e || {}).extensions || []])
    ),
    content: i(Fo),
    defined: [],
    document: i(Uo),
    flow: i(is),
    lazy: {},
    string: i(as),
    text: i(ss)
  };
  return r;
  function i(l) {
    return o;
    function o(a) {
      return xs(r, l, a);
    }
  }
}
function Ss(e) {
  for (; !Fi(e); )
    ;
  return e;
}
const Ur = /[\0\t\n\r]/g;
function Es() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(l, o, a) {
    const s = [];
    let u, c, f, g, h;
    for (l = t + (typeof l == "string" ? l.toString() : new TextDecoder(o || void 0).decode(l)), f = 0, t = "", n && (l.charCodeAt(0) === 65279 && f++, n = void 0); f < l.length; ) {
      if (Ur.lastIndex = f, u = Ur.exec(l), g = u && u.index !== void 0 ? u.index : l.length, h = l.charCodeAt(g), !u) {
        t = l.slice(f);
        break;
      }
      if (h === 10 && f === g && r)
        s.push(-3), r = void 0;
      else
        switch (r && (s.push(-5), r = void 0), f < g && (s.push(l.slice(f, g)), e += g - f), h) {
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
      f = g + 1;
    }
    return a && (r && s.push(-5), t && s.push(t), s.push(null)), s;
  }
}
const Ts = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function vs(e) {
  return e.replace(Ts, As);
}
function As(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), l = i === 120 || i === 88;
    return Di(n.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return er(n) || e;
}
const Wi = {}.hasOwnProperty;
function Is(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Ls(n)(Ss(_s(n).document().write(Es()(e, t, !0))));
}
function Ls(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(et),
      autolinkProtocol: G,
      autolinkEmail: G,
      atxHeading: l(De),
      blockQuote: l(Ce),
      characterEscape: G,
      characterReference: G,
      codeFenced: l($e),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l($e, o),
      codeText: l(gt, o),
      codeTextData: G,
      data: G,
      codeFlowValue: G,
      definition: l(He),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(Ke),
      hardBreakEscape: l(Qe),
      hardBreakTrailing: l(Qe),
      htmlFlow: l(ct, o),
      htmlFlowData: G,
      htmlText: l(ct, o),
      htmlTextData: G,
      image: l(Ze),
      label: o,
      link: l(et),
      listItem: l(nt),
      listItemValue: g,
      listOrdered: l(tt, f),
      listUnordered: l(tt),
      paragraph: l(yt),
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
      atxHeadingSequence: H,
      autolink: s(),
      autolinkEmail: Se,
      autolinkProtocol: ye,
      blockQuote: s(),
      characterEscapeValue: X,
      characterReferenceMarkerHexadecimal: K,
      characterReferenceMarkerNumeric: K,
      characterReferenceValue: le,
      characterReference: Ue,
      codeFenced: s(I),
      codeFencedFence: k,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: x,
      codeFlowValue: X,
      codeIndented: s(b),
      codeText: s(j),
      codeTextData: X,
      data: X,
      definition: s(),
      definitionDestinationString: N,
      definitionLabelString: A,
      definitionTitleString: v,
      emphasis: s(),
      hardBreakEscape: s(R),
      hardBreakTrailing: s(R),
      htmlFlow: s(J),
      htmlFlowData: X,
      htmlText: s(ee),
      htmlTextData: X,
      image: s(ue),
      label: Ae,
      labelText: ke,
      lineEnding: L,
      link: s(ae),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: ce,
      resourceDestinationString: m,
      resourceTitleString: W,
      resource: Ie,
      setextHeading: s(te),
      setextHeadingLineSequence: Z,
      setextHeadingText: C,
      strong: s(),
      thematicBreak: s()
    }
  };
  $i(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(w) {
    let E = {
      type: "root",
      children: []
    };
    const z = {
      stack: [E],
      tokenStack: [],
      config: t,
      enter: a,
      exit: u,
      buffer: o,
      resume: c,
      data: n
    }, $ = [];
    let Y = -1;
    for (; ++Y < w.length; )
      if (w[Y][1].type === "listOrdered" || w[Y][1].type === "listUnordered")
        if (w[Y][0] === "enter")
          $.push(Y);
        else {
          const we = $.pop();
          Y = i(w, we, Y);
        }
    for (Y = -1; ++Y < w.length; ) {
      const we = t[w[Y][0]];
      Wi.call(we, w[Y][1].type) && we[w[Y][1].type].call(Object.assign({
        sliceSerialize: w[Y][2].sliceSerialize
      }, z), w[Y][1]);
    }
    if (z.tokenStack.length > 0) {
      const we = z.tokenStack[z.tokenStack.length - 1];
      (we[1] || Hr).call(z, void 0, we[0]);
    }
    for (E.position = {
      start: dt(w.length > 0 ? w[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: dt(w.length > 0 ? w[w.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Y = -1; ++Y < t.transforms.length; )
      E = t.transforms[Y](E) || E;
    return E;
  }
  function i(w, E, z) {
    let $ = E - 1, Y = -1, we = !1, Oe, T, B, U;
    for (; ++$ <= z; ) {
      const D = w[$];
      switch (D[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          D[0] === "enter" ? Y++ : Y--, U = void 0;
          break;
        }
        case "lineEndingBlank": {
          D[0] === "enter" && (Oe && !U && !Y && !B && (B = $), U = void 0);
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
      if (!Y && D[0] === "enter" && D[1].type === "listItemPrefix" || Y === -1 && D[0] === "exit" && (D[1].type === "listUnordered" || D[1].type === "listOrdered")) {
        if (Oe) {
          let pe = $;
          for (T = void 0; pe--; ) {
            const oe = w[pe];
            if (oe[1].type === "lineEnding" || oe[1].type === "lineEndingBlank") {
              if (oe[0] === "exit") continue;
              T && (w[T][1].type = "lineEndingBlank", we = !0), oe[1].type = "lineEnding", T = pe;
            } else if (!(oe[1].type === "linePrefix" || oe[1].type === "blockQuotePrefix" || oe[1].type === "blockQuotePrefixWhitespace" || oe[1].type === "blockQuoteMarker" || oe[1].type === "listItemIndent")) break;
          }
          B && (!T || B < T) && (Oe._spread = !0), Oe.end = Object.assign({}, T ? w[T][1].start : D[1].end), w.splice(T || $, 0, ["exit", Oe, D[2]]), $++, z++;
        }
        if (D[1].type === "listItemPrefix") {
          const pe = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, D[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Oe = pe, w.splice($, 0, ["enter", pe, D[2]]), $++, z++, B = void 0, U = !0;
        }
      }
    }
    return w[E][1]._spread = we, z;
  }
  function l(w, E) {
    return z;
    function z($) {
      a.call(this, w($), $), E && E.call(this, $);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(w, E, z) {
    this.stack[this.stack.length - 1].children.push(w), this.stack.push(w), this.tokenStack.push([E, z || void 0]), w.position = {
      start: dt(E.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(w) {
    return E;
    function E(z) {
      w && w.call(this, z), u.call(this, z);
    }
  }
  function u(w, E) {
    const z = this.stack.pop(), $ = this.tokenStack.pop();
    if ($)
      $[0].type !== w.type && (E ? E.call(this, w, $[0]) : ($[1] || Hr).call(this, w, $[0]));
    else throw new Error("Cannot close `" + w.type + "` (" + Ft({
      start: w.start,
      end: w.end
    }) + "): it’s not open");
    z.position.end = dt(w.end);
  }
  function c() {
    return Ao(this.stack.pop());
  }
  function f() {
    this.data.expectingFirstListItemValue = !0;
  }
  function g(w) {
    if (this.data.expectingFirstListItemValue) {
      const E = this.stack[this.stack.length - 2];
      E.start = Number.parseInt(this.sliceSerialize(w), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.lang = w;
  }
  function x() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.meta = w;
  }
  function k() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function I() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = w.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function b() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = w.replace(/(\r?\n|\r)$/g, "");
  }
  function A(w) {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = E, z.identifier = vt(this.sliceSerialize(w)).toLowerCase();
  }
  function v() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = w;
  }
  function N() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = w;
  }
  function H(w) {
    const E = this.stack[this.stack.length - 1];
    if (!E.depth) {
      const z = this.sliceSerialize(w).length;
      E.depth = z;
    }
  }
  function C() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function Z(w) {
    const E = this.stack[this.stack.length - 1];
    E.depth = this.sliceSerialize(w).codePointAt(0) === 61 ? 1 : 2;
  }
  function te() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function G(w) {
    const z = this.stack[this.stack.length - 1].children;
    let $ = z[z.length - 1];
    (!$ || $.type !== "text") && ($ = _t(), $.position = {
      start: dt(w.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, z.push($)), this.stack.push($);
  }
  function X(w) {
    const E = this.stack.pop();
    E.value += this.sliceSerialize(w), E.position.end = dt(w.end);
  }
  function L(w) {
    const E = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const z = E.children[E.children.length - 1];
      z.position.end = dt(w.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(E.type) && (G.call(this, w), X.call(this, w));
  }
  function R() {
    this.data.atHardBreak = !0;
  }
  function J() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = w;
  }
  function ee() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = w;
  }
  function j() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = w;
  }
  function ae() {
    const w = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      w.type += "Reference", w.referenceType = E, delete w.url, delete w.title;
    } else
      delete w.identifier, delete w.label;
    this.data.referenceType = void 0;
  }
  function ue() {
    const w = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      w.type += "Reference", w.referenceType = E, delete w.url, delete w.title;
    } else
      delete w.identifier, delete w.label;
    this.data.referenceType = void 0;
  }
  function ke(w) {
    const E = this.sliceSerialize(w), z = this.stack[this.stack.length - 2];
    z.label = vs(E), z.identifier = vt(E).toLowerCase();
  }
  function Ae() {
    const w = this.stack[this.stack.length - 1], E = this.resume(), z = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, z.type === "link") {
      const $ = w.children;
      z.children = $;
    } else
      z.alt = E;
  }
  function m() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = w;
  }
  function W() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = w;
  }
  function Ie() {
    this.data.inReference = void 0;
  }
  function d() {
    this.data.referenceType = "collapsed";
  }
  function ce(w) {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = E, z.identifier = vt(this.sliceSerialize(w)).toLowerCase(), this.data.referenceType = "full";
  }
  function K(w) {
    this.data.characterReferenceType = w.type;
  }
  function le(w) {
    const E = this.sliceSerialize(w), z = this.data.characterReferenceType;
    let $;
    z ? ($ = Di(E, z === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : $ = er(E);
    const Y = this.stack[this.stack.length - 1];
    Y.value += $;
  }
  function Ue(w) {
    const E = this.stack.pop();
    E.position.end = dt(w.end);
  }
  function ye(w) {
    X.call(this, w);
    const E = this.stack[this.stack.length - 1];
    E.url = this.sliceSerialize(w);
  }
  function Se(w) {
    X.call(this, w);
    const E = this.stack[this.stack.length - 1];
    E.url = "mailto:" + this.sliceSerialize(w);
  }
  function Ce() {
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
  function gt() {
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
  function Ke() {
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
  function ct() {
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
  function tt(w) {
    return {
      type: "list",
      ordered: w.type === "listOrdered",
      start: null,
      spread: w._spread,
      children: []
    };
  }
  function nt(w) {
    return {
      type: "listItem",
      spread: w._spread,
      checked: null,
      children: []
    };
  }
  function yt() {
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
  function _t() {
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
function dt(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function $i(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? $i(e, r) : Ns(e, r);
  }
}
function Ns(e, t) {
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
function Ms(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return Is(r, {
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
function Ds(e, t) {
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
function Ps(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function zs(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Fs(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = It(r.toLowerCase()), l = e.footnoteOrder.indexOf(r);
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
function Bs(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Us(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function Zi(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), l = i[0];
  l && l.type === "text" ? l.value = "[" + l.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function Hs(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Zi(e, t);
  const i = { src: It(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, l), e.applyData(t, l);
}
function Vs(e, t) {
  const n = { src: It(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function js(e, t) {
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
function Ws(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Zi(e, t);
  const i = { href: It(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, l), e.applyData(t, l);
}
function $s(e, t) {
  const n = { href: It(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Zs(e, t, n) {
  const r = e.all(t), i = n ? qs(n) : qi(t), l = {}, o = [];
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
      t = qi(n[r]);
  }
  return t;
}
function qi(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function Gs(e, t) {
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
function Ys(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Xs(e, t) {
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
function Ks(e, t) {
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
    }, a = Xn(t.children[1]), s = vi(t.children[t.children.length - 1]);
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
function Qs(e, t, n) {
  const r = n ? n.children : void 0, l = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, a = o ? o.length : t.children.length;
  let s = -1;
  const u = [];
  for (; ++s < a; ) {
    const f = t.children[s], g = {}, h = o ? o[s] : void 0;
    h && (g.align = h);
    let x = { type: "element", tagName: l, properties: g, children: [] };
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
function eu(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Vr = 9, jr = 32;
function tu(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const l = [];
  for (; r; )
    l.push(
      Wr(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return l.push(Wr(t.slice(i), i > 0, !1)), l.join("");
}
function Wr(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let l = e.codePointAt(r);
    for (; l === Vr || l === jr; )
      r++, l = e.codePointAt(r);
  }
  if (n) {
    let l = e.codePointAt(i - 1);
    for (; l === Vr || l === jr; )
      i--, l = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function nu(e, t) {
  const n = { type: "text", value: tu(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function ru(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const iu = {
  blockquote: Rs,
  break: Ds,
  code: Os,
  delete: Ps,
  emphasis: zs,
  footnoteReference: Fs,
  heading: Bs,
  html: Us,
  imageReference: Hs,
  image: Vs,
  inlineCode: js,
  linkReference: Ws,
  link: $s,
  listItem: Zs,
  list: Gs,
  paragraph: Ys,
  // @ts-expect-error: root is different, but hard to type.
  root: Xs,
  strong: Js,
  table: Ks,
  tableCell: eu,
  tableRow: Qs,
  text: nu,
  thematicBreak: ru,
  toml: Zt,
  yaml: Zt,
  definition: Zt,
  footnoteDefinition: Zt
};
function Zt() {
}
const Gi = -1, sn = 0, Ut = 1, nn = 2, rr = 3, ir = 4, lr = 5, or = 6, Yi = 7, Xi = 8, $r = typeof self == "object" ? self : globalThis, lu = (e, t) => {
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
      case Yi: {
        const { name: a, message: s } = o;
        return n(new $r[a](s), i);
      }
      case Xi:
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
}, Zr = (e) => lu(/* @__PURE__ */ new Map(), e)(0), Et = "", { toString: ou } = {}, { keys: au } = Object, Mt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [sn, t];
  const n = ou.call(e).slice(8, -1);
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
  return n.includes("Array") ? [Ut, n] : n.includes("Error") ? [Yi, n] : [nn, n];
}, qt = ([e, t]) => e === sn && (t === "function" || t === "symbol"), su = (e, t, n, r) => {
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
            a = Xi, c = o.toString();
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
          let g = o;
          return s === "DataView" ? g = new Uint8Array(o.buffer) : s === "ArrayBuffer" && (g = new Uint8Array(o)), i([s, [...g]], o);
        }
        const c = [], f = i([a, c], o);
        for (const g of o)
          c.push(l(g));
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
        for (const g of au(o))
          (e || !qt(Mt(o[g]))) && c.push([l(g), l(o[g])]);
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
        for (const [g, h] of o)
          (e || !(qt(Mt(g)) || qt(Mt(h)))) && c.push([l(g), l(h)]);
        return f;
      }
      case or: {
        const c = [], f = i([a, c], o);
        for (const g of o)
          (e || !qt(Mt(g))) && c.push(l(g));
        return f;
      }
    }
    const { message: u } = o;
    return i([a, { name: s, message: u }], o);
  };
  return l;
}, qr = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return su(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, rn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Zr(qr(e, t)) : structuredClone(e)
) : (e, t) => Zr(qr(e, t));
function uu(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function cu(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function pu(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || uu, r = e.options.footnoteBackLabel || cu, i = e.options.footnoteLabel || "Footnotes", l = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!u)
      continue;
    const c = e.all(u), f = String(u.identifier).toUpperCase(), g = It(f.toLowerCase());
    let h = 0;
    const x = [], k = e.footnoteCounts.get(f);
    for (; k !== void 0 && ++h <= k; ) {
      x.length > 0 && x.push({ type: "text", value: " " });
      let A = typeof n == "string" ? n : n(s, h);
      typeof A == "string" && (A = { type: "text", value: A }), x.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + g + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(A) ? A : [A]
      });
    }
    const I = c[c.length - 1];
    if (I && I.type === "element" && I.tagName === "p") {
      const A = I.children[I.children.length - 1];
      A && A.type === "text" ? A.value += " " : I.children.push({ type: "text", value: " " }), I.children.push(...x);
    } else
      c.push(...x);
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
const Ji = (
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
      return mu;
    if (typeof e == "function")
      return un(e);
    if (typeof e == "object")
      return Array.isArray(e) ? hu(e) : fu(e);
    if (typeof e == "string")
      return du(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function hu(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Ji(e[n]);
  return un(r);
  function r(...i) {
    let l = -1;
    for (; ++l < t.length; )
      if (t[l].apply(this, i)) return !0;
    return !1;
  }
}
function fu(e) {
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
function du(e) {
  return un(t);
  function t(n) {
    return n && n.type === e;
  }
}
function un(e) {
  return t;
  function t(n, r, i) {
    return !!(gu(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function mu() {
  return !0;
}
function gu(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Ki = [], yu = !0, Gr = !1, Cu = "skip";
function wu(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const l = Ji(i), o = r ? -1 : 1;
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
      Object.defineProperty(g, "name", {
        value: "node (" + (s.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return g;
    function g() {
      let h = Ki, x, k, I;
      if ((!t || l(s, u, c[c.length - 1] || void 0)) && (h = xu(n(s, c)), h[0] === Gr))
        return h;
      if ("children" in s && s.children) {
        const b = (
          /** @type {UnistParent} */
          s
        );
        if (b.children && h[0] !== Cu)
          for (k = (r ? b.children.length : -1) + o, I = c.concat(b); k > -1 && k < b.children.length; ) {
            const A = b.children[k];
            if (x = a(A, k, I)(), x[0] === Gr)
              return x;
            k = typeof x[1] == "number" ? x[1] : k + o;
          }
      }
      return h;
    }
  }
}
function xu(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [yu, e] : e == null ? Ki : [e];
}
function Qi(e, t, n, r) {
  let i, l, o;
  typeof t == "function" && typeof n != "function" ? (l = void 0, o = t, i = n) : (l = t, o = n, i = r), wu(e, l, a, i);
  function a(s, u) {
    const c = u[u.length - 1], f = c ? c.children.indexOf(s) : void 0;
    return o(s, f, c);
  }
}
const Un = {}.hasOwnProperty, ku = {};
function bu(e, t) {
  const n = t || ku, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), o = { ...iu, ...n.handlers }, a = {
    all: u,
    applyData: Su,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: l,
    footnoteOrder: [],
    handlers: o,
    one: s,
    options: n,
    patch: _u,
    wrap: Tu
  };
  return Qi(e, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const f = c.type === "definition" ? r : i, g = String(c.identifier).toUpperCase();
      f.has(g) || f.set(g, c);
    }
  }), a;
  function s(c, f) {
    const g = c.type, h = a.handlers[g];
    if (Un.call(a.handlers, g) && h)
      return h(a, c, f);
    if (a.options.passThrough && a.options.passThrough.includes(g)) {
      if ("children" in c) {
        const { children: k, ...I } = c, b = rn(I);
        return b.children = a.all(c), b;
      }
      return rn(c);
    }
    return (a.options.unknownHandler || Eu)(a, c, f);
  }
  function u(c) {
    const f = [];
    if ("children" in c) {
      const g = c.children;
      let h = -1;
      for (; ++h < g.length; ) {
        const x = a.one(g[h], c);
        if (x) {
          if (h && g[h - 1].type === "break" && (!Array.isArray(x) && x.type === "text" && (x.value = Yr(x.value)), !Array.isArray(x) && x.type === "element")) {
            const k = x.children[0];
            k && k.type === "text" && (k.value = Yr(k.value));
          }
          Array.isArray(x) ? f.push(...x) : f.push(x);
        }
      }
    }
    return f;
  }
}
function _u(e, t) {
  e.position && (t.position = lo(e));
}
function Su(e, t) {
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
function Eu(e, t) {
  const n = t.data || {}, r = "value" in t && !(Un.call(n, "hProperties") || Un.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Tu(e, t) {
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
  const n = bu(e, t), r = n.one(e, void 0), i = pu(n), l = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && l.children.push({ type: "text", value: `
` }, i), l;
}
function vu(e, t) {
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
function Jr(e) {
  if (e)
    throw e;
}
var Kt = Object.prototype.hasOwnProperty, el = Object.prototype.toString, Kr = Object.defineProperty, Qr = Object.getOwnPropertyDescriptor, ei = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : el.call(t) === "[object Array]";
}, ti = function(t) {
  if (!t || el.call(t) !== "[object Object]")
    return !1;
  var n = Kt.call(t, "constructor"), r = t.constructor && t.constructor.prototype && Kt.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || Kt.call(t, i);
}, ni = function(t, n) {
  Kr && n.name === "__proto__" ? Kr(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, ri = function(t, n) {
  if (n === "__proto__")
    if (Kt.call(t, n)) {
      if (Qr)
        return Qr(t, n).value;
    } else return;
  return t[n];
}, Au = function e() {
  var t, n, r, i, l, o, a = arguments[0], s = 1, u = arguments.length, c = !1;
  for (typeof a == "boolean" && (c = a, a = arguments[1] || {}, s = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); s < u; ++s)
    if (t = arguments[s], t != null)
      for (n in t)
        r = ri(a, n), i = ri(t, n), a !== i && (c && i && (ti(i) || (l = ei(i))) ? (l ? (l = !1, o = r && ei(r) ? r : []) : o = r && ti(r) ? r : {}, ni(a, { name: n, newValue: e(c, o, i) })) : typeof i < "u" && ni(a, { name: n, newValue: i }));
  return a;
};
const Cn = /* @__PURE__ */ Ti(Au);
function Hn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Iu() {
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
      i = u, c ? Lu(c, a)(...u) : o(null, ...u);
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
const Ye = { basename: Nu, dirname: Mu, extname: Ru, join: Du, sep: "/" };
function Nu(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  jt(e);
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
function Mu(e) {
  if (jt(e), e.length === 0)
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
  jt(e);
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
function Du(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    jt(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : Ou(n);
}
function Ou(e) {
  jt(e);
  const t = e.codePointAt(0) === 47;
  let n = Pu(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function Pu(e, t) {
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
function jt(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const zu = { cwd: Fu };
function Fu() {
  return "/";
}
function Vn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Bu(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Vn(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return Uu(e);
}
function Uu(e) {
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
class tl {
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
    t ? Vn(t) ? n = { path: t } : typeof t == "string" || Hu(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : zu.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
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
    Vn(t) && (t = Bu(t)), kn(t, "path"), this.path !== t && this.history.push(t);
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
function Hu(e) {
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
    ), i = r[e], l = function() {
      return i.apply(l, arguments);
    };
    return Object.setPrototypeOf(l, r), l;
  }
), ju = {}.hasOwnProperty;
class ar extends Vu {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Iu();
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
    return typeof t == "string" ? arguments.length === 2 ? (Sn("data", this.frozen), this.namespace[t] = n, this) : ju.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Sn("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const n = Gt(t), r = this.parser || this.Parser;
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
    return this.freeze(), bn("process", this.parser || this.Parser), _n("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(l, o) {
      const a = Gt(t), s = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(s, a, function(c, f, g) {
        if (c || !f || !g)
          return u(c);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          f
        ), x = r.stringify(h, g);
        Zu(x) ? g.value = x : g.result = x, u(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          g
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
    return this.freeze(), bn("processSync", this.parser || this.Parser), _n("processSync", this.compiler || this.Compiler), this.process(t, i), oi("processSync", "process", n), r;
    function i(l, o) {
      n = !0, Jr(l), r = o;
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
      const s = Gt(n);
      i.run(t, s, u);
      function u(c, f, g) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          f || t
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
    return this.run(t, n, l), oi("runSync", "run", r), i;
    function l(o, a) {
      Jr(o), i = a, r = !0;
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
    const r = Gt(n), i = this.compiler || this.Compiler;
    return _n("stringify", i), li(t), i(t, r);
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
    if (Sn("use", this.frozen), t != null) if (typeof t == "function")
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
      let f = -1, g = -1;
      for (; ++f < r.length; )
        if (r[f][0] === u) {
          g = f;
          break;
        }
      if (g === -1)
        r.push([u, ...c]);
      else if (c.length > 0) {
        let [h, ...x] = c;
        const k = r[g][1];
        Hn(k) && Hn(h) && (h = Cn(!0, k, h)), r[g] = [u, h, ...x];
      }
    }
  }
}
const Wu = new ar().freeze();
function bn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function _n(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Sn(e, t) {
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
function Gt(e) {
  return $u(e) ? e : new tl(e);
}
function $u(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Zu(e) {
  return typeof e == "string" || qu(e);
}
function qu(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Gu = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", ai = [], si = { allowDangerousHtml: !0 }, Yu = /^(https?|ircs?|mailto|xmpp)$/i, Xu = [
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
  const t = Ju(e), n = Ku(e);
  return Qu(t.runSync(t.parse(n), n), e);
}
function Ju(e) {
  const t = e.rehypePlugins || ai, n = e.remarkPlugins || ai, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...si } : si;
  return Wu().use(Ms).use(n).use(vu, r).use(t);
}
function Ku(e) {
  const t = e.children || "", n = new tl();
  return typeof t == "string" && (n.value = t), n;
}
function Qu(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, l = t.disallowedElements, o = t.skipHtml, a = t.unwrapDisallowed, s = t.urlTransform || e1;
  for (const c of Xu)
    Object.hasOwn(t, c.from) && ("" + c.from + (c.to ? "use `" + c.to + "` instead" : "remove it") + Gu + c.id, void 0);
  return Qi(e, u), co(e, {
    Fragment: Nn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: p,
    jsxs: M,
    passKeys: !0,
    passNode: !0
  });
  function u(c, f, g) {
    if (c.type === "raw" && g && typeof f == "number")
      return o ? g.children.splice(f, 1) : g.children[f] = { type: "text", value: c.value }, f;
    if (c.type === "element") {
      let h;
      for (h in mn)
        if (Object.hasOwn(mn, h) && Object.hasOwn(c.properties, h)) {
          const x = c.properties[h], k = mn[h];
          (k === null || k.includes(c.tagName)) && (c.properties[h] = s(String(x || ""), h, c));
        }
    }
    if (c.type === "element") {
      let h = n ? !n.includes(c.tagName) : l ? l.includes(c.tagName) : !1;
      if (!h && r && typeof f == "number" && (h = !r(c, f, g)), h && g && typeof f == "number")
        return a && c.children ? g.children.splice(f, 1, ...c.children) : g.children.splice(f, 1), f;
    }
  }
}
function e1(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    Yu.test(e.slice(0, t)) ? e : ""
  );
}
const We = (...e) => e.filter(Boolean).join(" "), t1 = () => /* @__PURE__ */ M(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ M("g", { filter: "url(#filter0_dd_121_23927)", children: [
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
      /* @__PURE__ */ M("defs", { children: [
        /* @__PURE__ */ M(
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
), n1 = ({ className: e, ...t }) => /* @__PURE__ */ p("form", { className: We("chat-wrapper__prompt-input", e), ...t }), nl = Ci(
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
    return /* @__PURE__ */ p(
      "textarea",
      {
        ref: a,
        className: We("chat-wrapper__prompt-textarea", t),
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
nl.displayName = "PromptInputTextarea";
const r1 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p("div", { className: We("chat-wrapper__prompt-toolbar", e), ...t }), i1 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p("div", { className: We("chat-wrapper__prompt-tools", e), ...t }), l1 = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const l = t === "default" && (typeof r == "string" || fl.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ p(
    "button",
    {
      className: We(
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
}, o1 = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = "idle",
  children: i,
  disabled: l,
  ...o
}) => {
  let a = /* @__PURE__ */ p(t1, {});
  const s = l || r === "submitted" || r === "streaming";
  return /* @__PURE__ */ p(
    "button",
    {
      className: We(
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
}, Z1 = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ p("select", { className: We("chat-wrapper__prompt-select", e), ...n, children: t }), q1 = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ p(
  "button",
  {
    className: We("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), G1 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p(
  "div",
  {
    className: We("chat-wrapper__prompt-select-content", e),
    ...t
  }
), Y1 = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ p(
  "div",
  {
    className: We("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), X1 = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ p(
  "span",
  {
    className: We("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
);
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: rl,
  setPrototypeOf: ui,
  isFrozen: a1,
  getPrototypeOf: s1,
  getOwnPropertyDescriptor: u1
} = Object;
let {
  freeze: Te,
  seal: Be,
  create: jn
} = Object, {
  apply: Wn,
  construct: $n
} = typeof Reflect < "u" && Reflect;
Te || (Te = function(t) {
  return t;
});
Be || (Be = function(t) {
  return t;
});
Wn || (Wn = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), l = 2; l < r; l++)
    i[l - 2] = arguments[l];
  return t.apply(n, i);
});
$n || ($n = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const Yt = ve(Array.prototype.forEach), c1 = ve(Array.prototype.lastIndexOf), ci = ve(Array.prototype.pop), Rt = ve(Array.prototype.push), p1 = ve(Array.prototype.splice), Qt = ve(String.prototype.toLowerCase), En = ve(String.prototype.toString), Tn = ve(String.prototype.match), Dt = ve(String.prototype.replace), h1 = ve(String.prototype.indexOf), f1 = ve(String.prototype.trim), je = ve(Object.prototype.hasOwnProperty), Ee = ve(RegExp.prototype.test), Ot = d1(TypeError);
function ve(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Wn(e, t, r);
  };
}
function d1(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return $n(e, n);
  };
}
function q(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Qt;
  ui && ui(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const l = n(i);
      l !== i && (a1(t) || (t[r] = l), i = l);
    }
    e[i] = !0;
  }
  return e;
}
function m1(e) {
  for (let t = 0; t < e.length; t++)
    je(e, t) || (e[t] = null);
  return e;
}
function st(e) {
  const t = jn(null);
  for (const [n, r] of rl(e))
    je(e, n) && (Array.isArray(r) ? t[n] = m1(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = st(r) : t[n] = r);
  return t;
}
function Pt(e, t) {
  for (; e !== null; ) {
    const r = u1(e, t);
    if (r) {
      if (r.get)
        return ve(r.get);
      if (typeof r.value == "function")
        return ve(r.value);
    }
    e = s1(e);
  }
  function n() {
    return null;
  }
  return n;
}
const pi = Te(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), vn = Te(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), An = Te(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), g1 = Te(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), In = Te(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), y1 = Te(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), hi = Te(["#text"]), fi = Te(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Ln = Te(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), di = Te(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Xt = Te(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), C1 = Be(/\{\{[\w\W]*|[\w\W]*\}\}/gm), w1 = Be(/<%[\w\W]*|[\w\W]*%>/gm), x1 = Be(/\$\{[\w\W]*/gm), k1 = Be(/^data-[\-\w.\u00B7-\uFFFF]+$/), b1 = Be(/^aria-[\-\w]+$/), il = Be(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), _1 = Be(/^(?:\w+script|data):/i), S1 = Be(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), ll = Be(/^html$/i), E1 = Be(/^[a-z][.\w]*(-[.\w]+)+$/i);
var mi = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: b1,
  ATTR_WHITESPACE: S1,
  CUSTOM_ELEMENT: E1,
  DATA_ATTR: k1,
  DOCTYPE_NAME: ll,
  ERB_EXPR: w1,
  IS_ALLOWED_URI: il,
  IS_SCRIPT_OR_DATA: _1,
  MUSTACHE_EXPR: C1,
  TMPLIT_EXPR: x1
});
const zt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, T1 = function() {
  return typeof window > "u" ? null : window;
}, v1 = function(t, n) {
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
function ol() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : T1();
  const t = (P) => ol(P);
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
    DOMParser: g,
    trustedTypes: h
  } = e, x = s.prototype, k = Pt(x, "cloneNode"), I = Pt(x, "remove"), b = Pt(x, "nextSibling"), A = Pt(x, "childNodes"), v = Pt(x, "parentNode");
  if (typeof o == "function") {
    const P = n.createElement("template");
    P.content && P.content.ownerDocument && (n = P.content.ownerDocument);
  }
  let N, H = "";
  const {
    implementation: C,
    createNodeIterator: Z,
    createDocumentFragment: te,
    getElementsByTagName: G
  } = n, {
    importNode: X
  } = r;
  let L = gi();
  t.isSupported = typeof rl == "function" && typeof v == "function" && C && C.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: R,
    ERB_EXPR: J,
    TMPLIT_EXPR: ee,
    DATA_ATTR: j,
    ARIA_ATTR: ae,
    IS_SCRIPT_OR_DATA: ue,
    ATTR_WHITESPACE: ke,
    CUSTOM_ELEMENT: Ae
  } = mi;
  let {
    IS_ALLOWED_URI: m
  } = mi, W = null;
  const Ie = q({}, [...pi, ...vn, ...An, ...In, ...hi]);
  let d = null;
  const ce = q({}, [...fi, ...Ln, ...di, ...Xt]);
  let K = Object.seal(jn(null, {
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
  })), le = null, Ue = null;
  const ye = Object.seal(jn(null, {
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
  let Se = !0, Ce = !0, $e = !1, gt = !0, He = !1, Ke = !0, De = !1, Qe = !1, ct = !1, Ze = !1, et = !1, tt = !1, nt = !0, yt = !1;
  const Lt = "user-content-";
  let _t = !0, rt = !1, w = {}, E = null;
  const z = q({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let $ = null;
  const Y = q({}, ["audio", "video", "img", "source", "image", "track"]);
  let we = null;
  const Oe = q({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), T = "http://www.w3.org/1998/Math/MathML", B = "http://www.w3.org/2000/svg", U = "http://www.w3.org/1999/xhtml";
  let D = U, pe = !1, oe = null;
  const pt = q({}, [T, B, U], En);
  let ht = q({}, ["mi", "mo", "mn", "ms", "mtext"]), it = q({}, ["annotation-xml"]);
  const cn = q({}, ["title", "style", "font", "a", "script"]);
  let qe = null;
  const Ct = ["application/xhtml+xml", "text/html"], lt = "text/html";
  let ne = null, Ve = null;
  const ft = n.createElement("form"), Wt = function(y) {
    return y instanceof RegExp || y instanceof Function;
  }, pn = function() {
    let y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Ve && Ve === y)) {
      if ((!y || typeof y != "object") && (y = {}), y = st(y), qe = // eslint-disable-next-line unicorn/prefer-includes
      Ct.indexOf(y.PARSER_MEDIA_TYPE) === -1 ? lt : y.PARSER_MEDIA_TYPE, ne = qe === "application/xhtml+xml" ? En : Qt, W = je(y, "ALLOWED_TAGS") ? q({}, y.ALLOWED_TAGS, ne) : Ie, d = je(y, "ALLOWED_ATTR") ? q({}, y.ALLOWED_ATTR, ne) : ce, oe = je(y, "ALLOWED_NAMESPACES") ? q({}, y.ALLOWED_NAMESPACES, En) : pt, we = je(y, "ADD_URI_SAFE_ATTR") ? q(st(Oe), y.ADD_URI_SAFE_ATTR, ne) : Oe, $ = je(y, "ADD_DATA_URI_TAGS") ? q(st(Y), y.ADD_DATA_URI_TAGS, ne) : Y, E = je(y, "FORBID_CONTENTS") ? q({}, y.FORBID_CONTENTS, ne) : z, le = je(y, "FORBID_TAGS") ? q({}, y.FORBID_TAGS, ne) : st({}), Ue = je(y, "FORBID_ATTR") ? q({}, y.FORBID_ATTR, ne) : st({}), w = je(y, "USE_PROFILES") ? y.USE_PROFILES : !1, Se = y.ALLOW_ARIA_ATTR !== !1, Ce = y.ALLOW_DATA_ATTR !== !1, $e = y.ALLOW_UNKNOWN_PROTOCOLS || !1, gt = y.ALLOW_SELF_CLOSE_IN_ATTR !== !1, He = y.SAFE_FOR_TEMPLATES || !1, Ke = y.SAFE_FOR_XML !== !1, De = y.WHOLE_DOCUMENT || !1, Ze = y.RETURN_DOM || !1, et = y.RETURN_DOM_FRAGMENT || !1, tt = y.RETURN_TRUSTED_TYPE || !1, ct = y.FORCE_BODY || !1, nt = y.SANITIZE_DOM !== !1, yt = y.SANITIZE_NAMED_PROPS || !1, _t = y.KEEP_CONTENT !== !1, rt = y.IN_PLACE || !1, m = y.ALLOWED_URI_REGEXP || il, D = y.NAMESPACE || U, ht = y.MATHML_TEXT_INTEGRATION_POINTS || ht, it = y.HTML_INTEGRATION_POINTS || it, K = y.CUSTOM_ELEMENT_HANDLING || {}, y.CUSTOM_ELEMENT_HANDLING && Wt(y.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (K.tagNameCheck = y.CUSTOM_ELEMENT_HANDLING.tagNameCheck), y.CUSTOM_ELEMENT_HANDLING && Wt(y.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (K.attributeNameCheck = y.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), y.CUSTOM_ELEMENT_HANDLING && typeof y.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (K.allowCustomizedBuiltInElements = y.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), He && (Ce = !1), et && (Ze = !0), w && (W = q({}, hi), d = [], w.html === !0 && (q(W, pi), q(d, fi)), w.svg === !0 && (q(W, vn), q(d, Ln), q(d, Xt)), w.svgFilters === !0 && (q(W, An), q(d, Ln), q(d, Xt)), w.mathMl === !0 && (q(W, In), q(d, di), q(d, Xt))), y.ADD_TAGS && (typeof y.ADD_TAGS == "function" ? ye.tagCheck = y.ADD_TAGS : (W === Ie && (W = st(W)), q(W, y.ADD_TAGS, ne))), y.ADD_ATTR && (typeof y.ADD_ATTR == "function" ? ye.attributeCheck = y.ADD_ATTR : (d === ce && (d = st(d)), q(d, y.ADD_ATTR, ne))), y.ADD_URI_SAFE_ATTR && q(we, y.ADD_URI_SAFE_ATTR, ne), y.FORBID_CONTENTS && (E === z && (E = st(E)), q(E, y.FORBID_CONTENTS, ne)), _t && (W["#text"] = !0), De && q(W, ["html", "head", "body"]), W.table && (q(W, ["tbody"]), delete le.tbody), y.TRUSTED_TYPES_POLICY) {
        if (typeof y.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Ot('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof y.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Ot('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        N = y.TRUSTED_TYPES_POLICY, H = N.createHTML("");
      } else
        N === void 0 && (N = v1(h, i)), N !== null && typeof H == "string" && (H = N.createHTML(""));
      Te && Te(y), Ve = y;
    }
  }, sr = q({}, [...vn, ...An, ...g1]), ur = q({}, [...In, ...y1]), ul = function(y) {
    let S = v(y);
    (!S || !S.tagName) && (S = {
      namespaceURI: D,
      tagName: "template"
    });
    const O = Qt(y.tagName), se = Qt(S.tagName);
    return oe[y.namespaceURI] ? y.namespaceURI === B ? S.namespaceURI === U ? O === "svg" : S.namespaceURI === T ? O === "svg" && (se === "annotation-xml" || ht[se]) : !!sr[O] : y.namespaceURI === T ? S.namespaceURI === U ? O === "math" : S.namespaceURI === B ? O === "math" && it[se] : !!ur[O] : y.namespaceURI === U ? S.namespaceURI === B && !it[se] || S.namespaceURI === T && !ht[se] ? !1 : !ur[O] && (cn[O] || !sr[O]) : !!(qe === "application/xhtml+xml" && oe[y.namespaceURI]) : !1;
  }, Ge = function(y) {
    Rt(t.removed, {
      element: y
    });
    try {
      v(y).removeChild(y);
    } catch {
      I(y);
    }
  }, wt = function(y, S) {
    try {
      Rt(t.removed, {
        attribute: S.getAttributeNode(y),
        from: S
      });
    } catch {
      Rt(t.removed, {
        attribute: null,
        from: S
      });
    }
    if (S.removeAttribute(y), y === "is")
      if (Ze || et)
        try {
          Ge(S);
        } catch {
        }
      else
        try {
          S.setAttribute(y, "");
        } catch {
        }
  }, cr = function(y) {
    let S = null, O = null;
    if (ct)
      y = "<remove></remove>" + y;
    else {
      const me = Tn(y, /^[\r\n\t ]+/);
      O = me && me[0];
    }
    qe === "application/xhtml+xml" && D === U && (y = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + y + "</body></html>");
    const se = N ? N.createHTML(y) : y;
    if (D === U)
      try {
        S = new g().parseFromString(se, qe);
      } catch {
      }
    if (!S || !S.documentElement) {
      S = C.createDocument(D, "template", null);
      try {
        S.documentElement.innerHTML = pe ? H : se;
      } catch {
      }
    }
    const be = S.body || S.documentElement;
    return y && O && be.insertBefore(n.createTextNode(O), be.childNodes[0] || null), D === U ? G.call(S, De ? "html" : "body")[0] : De ? S.documentElement : be;
  }, pr = function(y) {
    return Z.call(
      y.ownerDocument || y,
      y,
      // eslint-disable-next-line no-bitwise
      u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT | u.SHOW_PROCESSING_INSTRUCTION | u.SHOW_CDATA_SECTION,
      null
    );
  }, hn = function(y) {
    return y instanceof f && (typeof y.nodeName != "string" || typeof y.textContent != "string" || typeof y.removeChild != "function" || !(y.attributes instanceof c) || typeof y.removeAttribute != "function" || typeof y.setAttribute != "function" || typeof y.namespaceURI != "string" || typeof y.insertBefore != "function" || typeof y.hasChildNodes != "function");
  }, hr = function(y) {
    return typeof a == "function" && y instanceof a;
  };
  function ot(P, y, S) {
    Yt(P, (O) => {
      O.call(t, y, S, Ve);
    });
  }
  const fr = function(y) {
    let S = null;
    if (ot(L.beforeSanitizeElements, y, null), hn(y))
      return Ge(y), !0;
    const O = ne(y.nodeName);
    if (ot(L.uponSanitizeElement, y, {
      tagName: O,
      allowedTags: W
    }), Ke && y.hasChildNodes() && !hr(y.firstElementChild) && Ee(/<[/\w!]/g, y.innerHTML) && Ee(/<[/\w!]/g, y.textContent) || y.nodeType === zt.progressingInstruction || Ke && y.nodeType === zt.comment && Ee(/<[/\w]/g, y.data))
      return Ge(y), !0;
    if (!(ye.tagCheck instanceof Function && ye.tagCheck(O)) && (!W[O] || le[O])) {
      if (!le[O] && mr(O) && (K.tagNameCheck instanceof RegExp && Ee(K.tagNameCheck, O) || K.tagNameCheck instanceof Function && K.tagNameCheck(O)))
        return !1;
      if (_t && !E[O]) {
        const se = v(y) || y.parentNode, be = A(y) || y.childNodes;
        if (be && se) {
          const me = be.length;
          for (let Le = me - 1; Le >= 0; --Le) {
            const at = k(be[Le], !0);
            at.__removalCount = (y.__removalCount || 0) + 1, se.insertBefore(at, b(y));
          }
        }
      }
      return Ge(y), !0;
    }
    return y instanceof s && !ul(y) || (O === "noscript" || O === "noembed" || O === "noframes") && Ee(/<\/no(script|embed|frames)/i, y.innerHTML) ? (Ge(y), !0) : (He && y.nodeType === zt.text && (S = y.textContent, Yt([R, J, ee], (se) => {
      S = Dt(S, se, " ");
    }), y.textContent !== S && (Rt(t.removed, {
      element: y.cloneNode()
    }), y.textContent = S)), ot(L.afterSanitizeElements, y, null), !1);
  }, dr = function(y, S, O) {
    if (nt && (S === "id" || S === "name") && (O in n || O in ft))
      return !1;
    if (!(Ce && !Ue[S] && Ee(j, S))) {
      if (!(Se && Ee(ae, S))) {
        if (!(ye.attributeCheck instanceof Function && ye.attributeCheck(S, y))) {
          if (!d[S] || Ue[S]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(mr(y) && (K.tagNameCheck instanceof RegExp && Ee(K.tagNameCheck, y) || K.tagNameCheck instanceof Function && K.tagNameCheck(y)) && (K.attributeNameCheck instanceof RegExp && Ee(K.attributeNameCheck, S) || K.attributeNameCheck instanceof Function && K.attributeNameCheck(S, y)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              S === "is" && K.allowCustomizedBuiltInElements && (K.tagNameCheck instanceof RegExp && Ee(K.tagNameCheck, O) || K.tagNameCheck instanceof Function && K.tagNameCheck(O)))
            ) return !1;
          } else if (!we[S]) {
            if (!Ee(m, Dt(O, ke, ""))) {
              if (!((S === "src" || S === "xlink:href" || S === "href") && y !== "script" && h1(O, "data:") === 0 && $[y])) {
                if (!($e && !Ee(ue, Dt(O, ke, "")))) {
                  if (O)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, mr = function(y) {
    return y !== "annotation-xml" && Tn(y, Ae);
  }, gr = function(y) {
    ot(L.beforeSanitizeAttributes, y, null);
    const {
      attributes: S
    } = y;
    if (!S || hn(y))
      return;
    const O = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: d,
      forceKeepAttr: void 0
    };
    let se = S.length;
    for (; se--; ) {
      const be = S[se], {
        name: me,
        namespaceURI: Le,
        value: at
      } = be, St = ne(me), fn = at;
      let xe = me === "value" ? fn : f1(fn);
      if (O.attrName = St, O.attrValue = xe, O.keepAttr = !0, O.forceKeepAttr = void 0, ot(L.uponSanitizeAttribute, y, O), xe = O.attrValue, yt && (St === "id" || St === "name") && (wt(me, y), xe = Lt + xe), Ke && Ee(/((--!?|])>)|<\/(style|title|textarea)/i, xe)) {
        wt(me, y);
        continue;
      }
      if (St === "attributename" && Tn(xe, "href")) {
        wt(me, y);
        continue;
      }
      if (O.forceKeepAttr)
        continue;
      if (!O.keepAttr) {
        wt(me, y);
        continue;
      }
      if (!gt && Ee(/\/>/i, xe)) {
        wt(me, y);
        continue;
      }
      He && Yt([R, J, ee], (Cr) => {
        xe = Dt(xe, Cr, " ");
      });
      const yr = ne(y.nodeName);
      if (!dr(yr, St, xe)) {
        wt(me, y);
        continue;
      }
      if (N && typeof h == "object" && typeof h.getAttributeType == "function" && !Le)
        switch (h.getAttributeType(yr, St)) {
          case "TrustedHTML": {
            xe = N.createHTML(xe);
            break;
          }
          case "TrustedScriptURL": {
            xe = N.createScriptURL(xe);
            break;
          }
        }
      if (xe !== fn)
        try {
          Le ? y.setAttributeNS(Le, me, xe) : y.setAttribute(me, xe), hn(y) ? Ge(y) : ci(t.removed);
        } catch {
          wt(me, y);
        }
    }
    ot(L.afterSanitizeAttributes, y, null);
  }, cl = function P(y) {
    let S = null;
    const O = pr(y);
    for (ot(L.beforeSanitizeShadowDOM, y, null); S = O.nextNode(); )
      ot(L.uponSanitizeShadowNode, S, null), fr(S), gr(S), S.content instanceof l && P(S.content);
    ot(L.afterSanitizeShadowDOM, y, null);
  };
  return t.sanitize = function(P) {
    let y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, S = null, O = null, se = null, be = null;
    if (pe = !P, pe && (P = "<!-->"), typeof P != "string" && !hr(P))
      if (typeof P.toString == "function") {
        if (P = P.toString(), typeof P != "string")
          throw Ot("dirty is not a string, aborting");
      } else
        throw Ot("toString is not a function");
    if (!t.isSupported)
      return P;
    if (Qe || pn(y), t.removed = [], typeof P == "string" && (rt = !1), rt) {
      if (P.nodeName) {
        const at = ne(P.nodeName);
        if (!W[at] || le[at])
          throw Ot("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (P instanceof a)
      S = cr("<!---->"), O = S.ownerDocument.importNode(P, !0), O.nodeType === zt.element && O.nodeName === "BODY" || O.nodeName === "HTML" ? S = O : S.appendChild(O);
    else {
      if (!Ze && !He && !De && // eslint-disable-next-line unicorn/prefer-includes
      P.indexOf("<") === -1)
        return N && tt ? N.createHTML(P) : P;
      if (S = cr(P), !S)
        return Ze ? null : tt ? H : "";
    }
    S && ct && Ge(S.firstChild);
    const me = pr(rt ? P : S);
    for (; se = me.nextNode(); )
      fr(se), gr(se), se.content instanceof l && cl(se.content);
    if (rt)
      return P;
    if (Ze) {
      if (et)
        for (be = te.call(S.ownerDocument); S.firstChild; )
          be.appendChild(S.firstChild);
      else
        be = S;
      return (d.shadowroot || d.shadowrootmode) && (be = X.call(r, be, !0)), be;
    }
    let Le = De ? S.outerHTML : S.innerHTML;
    return De && W["!doctype"] && S.ownerDocument && S.ownerDocument.doctype && S.ownerDocument.doctype.name && Ee(ll, S.ownerDocument.doctype.name) && (Le = "<!DOCTYPE " + S.ownerDocument.doctype.name + `>
` + Le), He && Yt([R, J, ee], (at) => {
      Le = Dt(Le, at, " ");
    }), N && tt ? N.createHTML(Le) : Le;
  }, t.setConfig = function() {
    let P = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    pn(P), Qe = !0;
  }, t.clearConfig = function() {
    Ve = null, Qe = !1;
  }, t.isValidAttribute = function(P, y, S) {
    Ve || pn({});
    const O = ne(P), se = ne(y);
    return dr(O, se, S);
  }, t.addHook = function(P, y) {
    typeof y == "function" && Rt(L[P], y);
  }, t.removeHook = function(P, y) {
    if (y !== void 0) {
      const S = c1(L[P], y);
      return S === -1 ? void 0 : p1(L[P], S, 1)[0];
    }
    return ci(L[P]);
  }, t.removeHooks = function(P) {
    L[P] = [];
  }, t.removeAllHooks = function() {
    L = gi();
  }, t;
}
var A1 = ol();
function I1(e) {
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
  return e;
}
function L1(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function yi(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || I1(e));
  } catch {
    return !1;
  }
}
function N1() {
  A1.addHook("beforeSanitizeAttributes", (e) => {
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
N1();
const M1 = Ci(
  ({
    placeholder: e = "What would you like to know?",
    disabled: t = !1,
    chatStatus: n,
    fileUploadEnabled: r = !1,
    restaurantName: i,
    restaurantLogo: l,
    onSubmit: o,
    onFileUpload: a,
    onStopGeneration: s
  }, u) => {
    const [c, f] = fe(""), [g, h] = fe([]), x = ut(null);
    dl(u, () => ({
      focus: () => {
        var A;
        (A = x.current) == null || A.focus();
      }
    }));
    const k = de(
      (A) => {
        A.preventDefault();
        const N = new FormData(A.currentTarget).get("message");
        if (N != null && N.trim()) {
          const H = en(N.trim(), !1);
          if (!H.trim()) {
            console.warn("Message was blocked due to security concerns");
            return;
          }
          o(H, g), f(""), h([]);
        }
      },
      [o, g]
    ), I = de(
      (A) => {
        const N = A.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
        f(N);
      },
      []
    ), b = de(async () => {
      const A = document.createElement("input");
      A.type = "file", A.accept = "image/*,text/*,.pdf,.doc,.docx", A.multiple = !0, A.onchange = async (v) => {
        const N = v.target.files;
        if (N) {
          const H = Array.from(N).filter((C) => {
            const Z = L1(C.name);
            return Z !== C.name && console.warn(
              `File name sanitized: ${C.name} -> ${Z}`
            ), C.size > 10485760 ? (console.warn(`File too large: ${C.name} (${C.size} bytes)`), !1) : [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp",
              "text/plain",
              "text/csv",
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ].includes(C.type) ? !0 : (console.warn(
              `File type not allowed: ${C.name} (${C.type})`
            ), !1);
          });
          if (H.length > 0) {
            const C = await a(H);
            h((Z) => [...Z, ...C]);
          }
        }
      }, A.click();
    }, [a]);
    return /* @__PURE__ */ M(n1, { onSubmit: k, children: [
      /* @__PURE__ */ p(
        nl,
        {
          ref: x,
          name: "message",
          value: c,
          onChange: I,
          placeholder: e,
          disabled: t
        }
      ),
      g.length > 0 && /* @__PURE__ */ p(
        "div",
        {
          style: {
            padding: "12px 16px",
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center"
          },
          children: g.map((A, v) => /* @__PURE__ */ M(
            "div",
            {
              style: {
                position: "relative",
                display: "inline-block"
              },
              children: [
                A.startsWith("data:image/") ? /* @__PURE__ */ M(
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
                          src: A,
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
                ) : /* @__PURE__ */ M(
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
                          children: /* @__PURE__ */ M(
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
                      /* @__PURE__ */ M("div", { style: { flex: 1, minWidth: 0 }, children: [
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
                              const N = A.match(/name=([^;]+)/);
                              return N ? decodeURIComponent(N[1]) : "document.pdf";
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
                              const N = A.match(/data:([^;]+)/);
                              if (N) {
                                const H = N[1];
                                switch (H) {
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
                                    const C = H.split("/")[1];
                                    return C ? C.toUpperCase().substring(0, 4) : "FILE";
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
                        (N) => N.filter((H, C) => C !== v)
                      );
                    },
                    style: {
                      position: "absolute",
                      top: A.startsWith("data:image/") ? "6px" : "8px",
                      right: A.startsWith("data:image/") ? "6px" : "8px",
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
          ))
        }
      ),
      /* @__PURE__ */ M(r1, { children: [
        /* @__PURE__ */ M(i1, { children: [
          r && /* @__PURE__ */ M(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center"
              },
              children: [
                /* @__PURE__ */ p(
                  l1,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: b,
                    title: g.length > 0 ? `${g.length} file(s) attached` : "Attach files",
                    disabled: t,
                    style: {
                      position: "relative"
                    },
                    children: /* @__PURE__ */ M(
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
          i && /* @__PURE__ */ M("div", { className: "chat-wrapper__restaurant-chip", children: [
            l && /* @__PURE__ */ p(
              "img",
              {
                src: l,
                alt: "Restaurant logo",
                className: "chat-wrapper__restaurant-logo"
              }
            ),
            /* @__PURE__ */ p("span", { className: "chat-wrapper__restaurant-name", children: i })
          ] })
        ] }),
        /* @__PURE__ */ p(
          o1,
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
);
function R1({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning", children: e });
}
function D1({
  title: e,
  status: t = "processing"
}) {
  return /* @__PURE__ */ M("div", { className: "chat-wrapper__reasoning-trigger", children: [
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
    (e.includes("Thinking") || e.includes("Processing")) && /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-arrow", children: /* @__PURE__ */ M(
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
function O1({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-text", children: e }) });
}
function P1({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function z1({
  title: e,
  status: t = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var s, u;
  console.log("clog toolData", n);
  const l = () => {
    if (!r || !i) return null;
    const c = i.find((f) => f.name === r);
    return (c == null ? void 0 : c.description) || null;
  };
  let o;
  if (r != null && r.startsWith("lat_")) {
    const c = (s = n == null ? void 0 : n.parameters) == null ? void 0 : s.query, f = (u = n == null ? void 0 : n.parameters) == null ? void 0 : u.url;
    o = c || f || "Executing tool...";
  } else
    o = l();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ M("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
          /* @__PURE__ */ M("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
        return /* @__PURE__ */ M("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
          /* @__PURE__ */ M("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
        return /* @__PURE__ */ M("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
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
        return /* @__PURE__ */ M("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
          /* @__PURE__ */ M("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
function F1({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ M("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
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
class B1 {
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
    }, typeof document < "u" && document.addEventListener(
      "visibilitychange",
      this.visibilityChangeHandler
    );
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
        this.isConnected = !1, this.stopHeartbeat(), console.log("WebSocket disconnected", {
          code: r.code,
          reason: r.reason
        }), r.code !== 1e3 && r.code !== 1001 && this.attemptReconnect();
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
      this.ws && this.ws.close(), this.ws = new WebSocket("ws://localhost:3000/ws"), this.ws.onopen = () => {
        this.isConnected = !0, this.isReconnecting = !1, this.reconnectAttempts = 0, this.reconnectDelay = 1e3, console.log("WebSocket reconnected successfully"), this.startHeartbeat(), this.onSystemMessage && this.onSystemMessage("✅ Connection restored");
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
              if (console.log(
                "🔧 clog Server-side tool call detected:",
                s
              ), this.onReasoningUpdate && s.toolName && s.toolCallId && s.toolName.startsWith("lat_")) {
                const u = {
                  toolName: s.toolName,
                  callId: s.toolCallId,
                  parameters: s.args || {}
                };
                this.onReasoningUpdate(
                  !0,
                  `🔧 Handling: ${s.toolName}`,
                  u
                );
              }
            } else if (((i = a.data) == null ? void 0 : i.type) === "tool-result" && a.data.toolName.startsWith("lat_")) {
              const s = a.data;
              if (console.log(
                "✅ clog Server-side tool result detected:",
                s
              ), this.onReasoningUpdate && s.toolCallId) {
                const u = {
                  toolName: s.toolName || "Unknown Tool",
                  callId: s.toolCallId,
                  parameters: {}
                };
                this.onReasoningUpdate(
                  !1,
                  `✅ Completed: ${s.toolName || "Unknown Tool"}`,
                  u
                );
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
              this.onReasoningUpdate(
                !1,
                `✅ Completed: ${s.toolName}`,
                u
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
const al = Zn(
  ({
    message: e,
    getReasoningTitle: t,
    getReasoningStatus: n,
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
          /* @__PURE__ */ M(R1, { isStreaming: e.isStreaming || !1, children: [
            /* @__PURE__ */ p(
              D1,
              {
                title: t(e.content, e.isStreaming),
                status: n(e.content, e.isStreaming)
              }
            ),
            /* @__PURE__ */ p(O1, { children: e.content })
          ] })
        ) : e.role === "tooling" ? (
          /* Tooling message - no content wrapper */
          /* @__PURE__ */ p(P1, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ p(
            z1,
            {
              title: r(e.content, e.isStreaming),
              status: i(e.content, e.isStreaming),
              toolData: e.toolData,
              toolName: (a = e.toolData) == null ? void 0 : a.toolName,
              clientTools: l
            }
          ) })
        ) : /* @__PURE__ */ p("div", { className: "chat-wrapper__message-content", children: e.role === "assistant" && e.isStreaming && e.content === "" && e.id === o.current ? (
          /* Show streaming indicator when no content yet */
          /* @__PURE__ */ M("div", { className: "chat-wrapper__streaming-placeholder", children: [
            /* @__PURE__ */ p(F1, { size: 16, variant: "dots" }),
            /* @__PURE__ */ p("span", { children: "Thinking" })
          ] })
        ) : e.role === "system" ? (
          /* System message with collapsible tool result */
          /* @__PURE__ */ p(U1, { message: e })
        ) : e.role === "assistant" ? (
          /* Assistant message with regular markdown display */
          /* @__PURE__ */ p("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
            ln,
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
          /* @__PURE__ */ M("div", { className: "chat-wrapper__regular-message", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
              ln,
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
                  marginBottom: "4px"
                },
                children: e.media.map((s, u) => /* @__PURE__ */ p(
                  "div",
                  {
                    style: {
                      position: "relative",
                      display: "inline-block"
                    },
                    children: s.startsWith("data:image/") ? /* @__PURE__ */ M(
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
                    ) : /* @__PURE__ */ M(
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
                              children: /* @__PURE__ */ M(
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
                          /* @__PURE__ */ M("div", { style: { flex: 1, minWidth: 0 }, children: [
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
                                  const c = s.match(/name=([^;]+)/);
                                  return c ? decodeURIComponent(c[1]) : "document.pdf";
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
                                  const c = s.match(/data:([^;]+)/);
                                  if (c) {
                                    const f = c[1];
                                    switch (f) {
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
                                        const g = f.split("/")[1];
                                        return g ? g.toUpperCase().substring(0, 4) : "FILE";
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
                ))
              }
            )
          ] })
        ) })
      }
    );
  }
);
al.displayName = "MessageComponent";
const sl = Zn(
  ({ content: e, messageId: t }) => !t || !e ? null : /* @__PURE__ */ p("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__message-content", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
    ln,
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
sl.displayName = "StreamingMessage";
function U1({ message: e }) {
  const [t, n] = fe(!0);
  return console.log("clog message:", e), /* @__PURE__ */ M("div", { className: "chat-wrapper__system-message", children: [
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
        children: e.role === "system" ? /* @__PURE__ */ M("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
          /* @__PURE__ */ M("span", { children: [
            "AI text input <show-toolname>",
            "..."
          ] }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
        ] }) : e.role === "assistant" ? e.isStreaming ? /* @__PURE__ */ M("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
        ] }) : /* @__PURE__ */ M("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
          ln,
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
function H1({
  apiUrl: e,
  config: t,
  tools: n,
  clientTools: r,
  initialMessages: i = []
}) {
  var Oe;
  const [l, o] = fe(
    null
  ), [a, s] = fe(!1), [u, c] = fe(""), f = ut(null), [g, h] = fe(i), [x, k] = fe(!1), [I, b] = fe(!1), [A, v] = fe("idle"), [N, H] = fe(!1), [C, Z] = fe(t.mode), [te] = fe([]), [G, X] = fe(""), [L, R] = fe(!1), [, J] = fe(""), [ee, j] = fe(""), [ae, ue] = fe(!1), [, ke] = fe(
    /* @__PURE__ */ new Map()
  ), Ae = ut(null), m = ut(null), W = ut(null), Ie = ut(!0), d = ut(""), ce = de(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), K = $t(
    () => (T, B) => B === !1 ? T.includes("❌") ? "error" : "completed" : T.includes("✅ Completed:") || T.includes("✅") ? "completed" : T.includes("❌") ? "error" : "processing",
    []
  ), le = $t(
    () => (T, B) => B === !1 ? T.includes("❌") ? "Error" : "Completed" : T.includes("✅ Completed:") || T.includes("✅") ? "Completed" : T.includes("❌") ? "Error" : (T.includes("🔧 Handling:"), "Thinking..."),
    []
  ), Ue = $t(
    () => (T, B) => B === !1 ? T.includes("❌") ? "Tool Error" : "Tool Completed" : T.includes("✅ Completed:") || T.includes("✅") ? "Tool Completed" : T.includes("❌") ? "Tool Error" : (T.includes("🔧 Handling:"), "Tool Processing..."),
    []
  ), ye = $t(
    () => (T, B) => B === !1 ? T.includes("❌") ? "error" : "completed" : T.includes("✅ Completed:") || T.includes("✅") ? "completed" : T.includes("❌") ? "error" : "processing",
    []
  ), Se = de(
    (T, B) => {
      const D = en(B, T === "assistant");
      h((pe) => [
        ...pe,
        {
          id: ce(),
          role: T,
          content: D,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [ce]
  ), Ce = de(() => {
    if (W.current && d.current) {
      const T = en(
        d.current,
        !0
      ), B = {
        id: W.current,
        role: "assistant",
        content: T,
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !1
      };
      return h((U) => [...U, B]), W.current = null, d.current = "", j(""), !0;
    }
    return !1;
  }, []), $e = de(() => {
    k(!1), R(!1), v("idle"), Ce(), console.log("clog focus..."), setTimeout(() => {
      var T;
      (T = m.current) == null || T.focus();
    }, 0);
  }, [Ce]), gt = de(
    (T) => {
      console.error("Chat error:", T), k(!1), R(!1), v("error"), Ce(), Se("system", `❌ Chat error: ${T}`);
    },
    [Se, Ce]
  ), He = de(async () => {
    try {
      const T = new B1();
      f.current = T, o(T), c(T.getSessionId());
      const B = {};
      await T.onInit({
        toolSchemas: r,
        clientTools: n,
        businessContext: B,
        onSetMessage: (U) => {
          const D = en(U, !0);
          if (W.current)
            d.current += D, j(d.current);
          else {
            R(!1);
            const pe = ce();
            W.current = pe, d.current = D, j(D);
          }
        },
        onSystemMessage: (U) => {
          if (U.includes("Chat completed"))
            $e();
          else if (U.includes("Chat error")) {
            const D = U.match(/Chat error: (.+)/);
            D && gt(D[1]);
          }
        },
        onReasoningUpdate: (U, D, pe) => {
          console.log("🤔 Reasoning update:", {
            isThinking: U,
            content: D,
            toolCallRequest: pe
          });
          const { callId: oe } = pe || {};
          if (ue(U), J(D), !oe) {
            console.log("⚠️ No callId provided for reasoning update");
            return;
          }
          const pt = D.includes("🔧 Handling:"), ht = D.includes("✅ Completed:"), it = D.includes("❌ Error:");
          console.log("🔍 Debug reasoning conditions:", {
            isToolStarted: pt,
            isToolCompleted: ht,
            isToolError: it,
            callId: oe,
            isHandlingTool: ae
          }), ke((cn) => {
            const qe = new Map(cn), Ct = qe.get(oe);
            if (pt && !Ct) {
              Ce();
              const lt = D.match(/🔧 Handling: (.+)/), ne = lt ? lt[1] : "Unknown Tool", Ve = ce();
              qe.set(oe, Ve);
              const ft = {
                id: Ve,
                role: "tooling",
                content: D,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0,
                toolData: {
                  ...pe,
                  toolName: ne,
                  callId: oe,
                  status: "processing"
                }
              };
              h((Wt) => [...Wt, ft]);
            } else if ((ht || it) && Ct) {
              const lt = D.match(
                /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
              ), ne = lt ? lt[1] : "Unknown Tool";
              h(
                (Ve) => Ve.map(
                  (ft) => ft.id === Ct ? {
                    ...ft,
                    content: D,
                    isStreaming: !1,
                    // Mark as completed
                    toolData: {
                      ...ft.toolData,
                      toolName: ne,
                      status: it ? "error" : "completed",
                      callId: oe ?? ""
                    }
                  } : ft
                )
              ), qe.delete(oe);
            } else Ct && ae && !ht && !it && h(
              (lt) => lt.map(
                (ne) => ne.id === Ct ? {
                  ...ne,
                  content: D,
                  isStreaming: !0
                } : ne
              )
            );
            return qe;
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
    ce,
    Se,
    $e,
    gt,
    Ce
  ]), Ke = de(() => {
    f.current && (f.current.disconnect(), f.current = null), o(null), s(!1), c("");
  }, []), De = de(() => {
    console.log("🔍 DEBUG: resetToolHandling called! Stack trace:"), console.trace(), ue(!1), Ie.current = !0;
  }, []), Qe = de(() => {
    var T;
    (T = Ae.current) == null || T.scrollIntoView({ behavior: "smooth" });
  }, []);
  xt(() => {
    Qe();
  }, [g, Qe]), xt(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(G);
  }, [G, t]), xt(() => {
    console.log("🔍 DEBUG: isHandlingTool state changed:", ae);
  }, [ae]), xt(() => {
    console.log("💭 DEBUG: isHandlingReasoning state changed:");
  }, []), xt(() => (console.log("Connecting BusinessAgentClient..."), He(), () => {
    Ke();
  }), [He, Ke]), xt(() => {
    const T = setInterval(() => {
      if (f.current) {
        const B = f.current.getConnectionStatus();
        s(B.connected);
      }
    }, 1e3);
    return () => clearInterval(T);
  }, []);
  const ct = de(
    async (T, B) => {
      if (!T.trim() || x || !l || !a)
        return;
      const U = {
        id: ce(),
        role: "user",
        content: T.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: B
      };
      h((D) => [...D, U]), k(!0), R(!0), v("submitted"), X("Starting...");
      try {
        await l.onTriggerMessage(U.content), v("streaming");
      } catch (D) {
        console.error("Agent client send error:", D), R(!1), v("error"), Se(
          "system",
          `Sorry, there was an error: ${D instanceof Error ? D.message : "Unknown error"}`
        ), t.onError && t.onError(
          D instanceof Error ? D : new Error("Unknown error")
        ), k(!1), v("idle"), X("");
      }
    },
    [x, l, a, ce, Se, t]
  ), Ze = de(() => {
    k(!1), v("idle"), X(""), R(!1), J(""), W.current = null, d.current = "", j(""), De();
  }, [De]), et = de(
    async (T) => {
      console.log("Files selected:", T);
      const B = [];
      for (const U of T)
        try {
          if (U.type.startsWith("image/")) {
            const D = new FileReader(), pe = await new Promise((oe, pt) => {
              D.onload = () => oe(D.result), D.onerror = pt, D.readAsDataURL(U);
            });
            B.push(pe);
          } else if (U.type.startsWith("text/") || U.name.endsWith(".txt")) {
            const D = new FileReader(), pe = await new Promise((oe, pt) => {
              D.onload = () => oe(D.result), D.onerror = pt, D.readAsText(U);
            });
            console.log("Text file content:", pe);
          } else
            console.log("File type not supported for preview:", U.type), B.push(
              `data:${U.type};name=${encodeURIComponent(
                U.name
              )};base64,placeholder`
            );
        } catch (D) {
          console.error("Error processing file:", D);
        }
      return console.log("Added media:", B), B;
    },
    []
  ), tt = de(() => {
    b(!0);
  }, []), nt = de(() => {
    b(!1);
  }, []), yt = de(() => {
    H((T) => !T);
  }, []), Lt = de(() => {
    Z((T) => T === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  xt(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const T = (B) => {
      B.key === "Escape" && C === "modal" && I && nt();
    };
    if (C === "modal" && I)
      return document.addEventListener("keydown", T), () => document.removeEventListener("keydown", T);
  }, [C, I, nt]);
  const rt = ((...T) => T.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${C}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`,
    N && "chat-wrapper--collapsed",
    C === "embedded" && t.constrainedHeight && "chat-wrapper--constrained"
  ), w = () => C === "modal" && I ? /* @__PURE__ */ p("div", { className: "chat-wrapper-overlay", onClick: nt }) : null, E = () => {
    var B;
    if (C === "modal" && !I || C === "sidebar" && N || C === "fullscreen" && N) {
      const U = C === "modal" ? tt : yt, D = C === "modal" ? `Open ${t.appName}` : `Expand ${t.appName}`;
      return /* @__PURE__ */ M(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: U,
          title: D,
          children: [
            /* @__PURE__ */ M(
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
            ((B = t.features) == null ? void 0 : B.showBubbleText) !== !1 && /* @__PURE__ */ p("span", { className: "chat-wrapper__bubble-text", children: t.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, z = () => C === "modal" && I ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: nt,
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
  ) : null, $ = () => {
    if ((C === "sidebar" || C === "fullscreen") && !N) {
      const T = C === "fullscreen";
      return /* @__PURE__ */ p(
        "button",
        {
          className: T ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: Lt,
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
  }, Y = () => (C === "sidebar" || C === "fullscreen") && !N ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: yt,
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
  ) : null, we = () => {
    var T;
    return !((T = t.features) != null && T.showToolResults) || te.length === 0 ? null : /* @__PURE__ */ M("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ p("h4", { children: "Tool Results" }),
      /* @__PURE__ */ p("div", { className: "chat-wrapper__tool-results-list", children: te.map((B) => /* @__PURE__ */ M("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ p("div", { className: "chat-wrapper__tool-result-title", children: B.title }),
        B.description && /* @__PURE__ */ p("div", { className: "chat-wrapper__tool-result-description", children: B.description }),
        /* @__PURE__ */ M("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          B.status || "completed"
        ] })
      ] }, B.id)) })
    ] });
  };
  return C === "modal" && !I || (C === "sidebar" || C === "fullscreen") && N ? E() : (console.log("clog messages", g), /* @__PURE__ */ M(Nn, { children: [
    w(),
    /* @__PURE__ */ M("div", { className: rt, style: t.customStyles, children: [
      t.headerVisible !== !1 && /* @__PURE__ */ M("div", { className: "chat-wrapper__header", children: [
        /* @__PURE__ */ M("div", { className: "chat-wrapper__title-area", children: [
          /* @__PURE__ */ p("h2", { className: "chat-wrapper__title", children: t.appName }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__connection-status", children: /* @__PURE__ */ p(
            "span",
            {
              className: `chat-wrapper__connection-indicator ${a ? "connected" : "disconnected"}`,
              title: a ? `Connected to WebSocket${u ? ` (Session: ${u.slice(-8)})` : ""}` : "Disconnected from WebSocket",
              children: a ? "🟢" : "🔴"
            }
          ) })
        ] }),
        /* @__PURE__ */ M("div", { className: "chat-wrapper__header-controls", children: [
          $(),
          Y(),
          z()
        ] })
      ] }),
      !N && /* @__PURE__ */ M(Nn, { children: [
        g.length === 0 && !x && /* @__PURE__ */ M("div", { className: "chat-wrapper__main-header", children: [
          /* @__PURE__ */ p("h1", { className: "chat-wrapper__main-title", children: t.appName }),
          t.description && /* @__PURE__ */ p("p", { className: "chat-wrapper__description", children: t.description })
        ] }),
        /* @__PURE__ */ M(
          "div",
          {
            className: `chat-wrapper__content ${g.length === 0 && !x ? "chat-wrapper__content--empty" : "chat-wrapper__content--with-messages"}`,
            children: [
              /* @__PURE__ */ M("div", { className: "chat-wrapper__messages", children: [
                g.map((T) => /* @__PURE__ */ p(
                  al,
                  {
                    message: T,
                    getReasoningTitle: le,
                    getReasoningStatus: K,
                    getToolingTitle: Ue,
                    getToolingStatus: ye,
                    clientTools: r || [],
                    currentAssistantMessageIdRef: W
                  },
                  T.id
                )),
                W.current && ee && /* @__PURE__ */ p(
                  sl,
                  {
                    content: ee,
                    messageId: W.current
                  }
                ),
                L && !ae && /* @__PURE__ */ p("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ M("div", { className: "chat-wrapper__thinking-dots", children: [
                  /* @__PURE__ */ p("span", {}),
                  /* @__PURE__ */ p("span", {}),
                  /* @__PURE__ */ p("span", {})
                ] }) }) }) }),
                /* @__PURE__ */ p("div", { ref: Ae })
              ] }),
              we(),
              /* @__PURE__ */ p("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ p(
                M1,
                {
                  ref: m,
                  placeholder: t.placeholder,
                  disabled: x,
                  chatStatus: A,
                  fileUploadEnabled: (Oe = t.features) == null ? void 0 : Oe.fileUpload,
                  restaurantName: t.restaurantName,
                  restaurantLogo: t.restaurantLogo,
                  onSubmit: (T, B) => ct(T, B),
                  onFileUpload: et,
                  onStopGeneration: Ze
                }
              ) })
            ]
          }
        )
      ] }),
      t.onError && /* @__PURE__ */ p("div", { className: "chat-wrapper__error-boundary" })
    ] })
  ] }));
}
const J1 = Zn(H1);
class V1 {
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
          } catch (g) {
            console.error("Failed to parse chunk:", g);
          }
        }
    }
  }
}
function K1(e, t) {
  const [n, r] = fe([]), [i, l] = fe(!1), [o, a] = fe(null), s = ut(null), u = ut(new V1(e, t)), c = de(async () => {
    try {
      const h = await u.current.initConversation();
      return s.current = h, h;
    } catch (h) {
      throw a(h), h;
    }
  }, []), f = de(
    async (h) => {
      s.current || await c();
      const x = {
        id: Date.now().toString(),
        role: "user",
        content: h,
        timestamp: /* @__PURE__ */ new Date()
      };
      r((I) => [...I, x]), l(!0), a(null);
      const k = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      r((I) => [...I, k]);
      try {
        const I = u.current.streamMessage(
          s.current,
          h
        );
        for await (const b of I)
          r(
            (A) => A.map(
              (v) => v.id === k.id ? { ...v, content: v.content + b } : v
            )
          );
        r(
          (b) => b.map(
            (A) => A.id === k.id ? { ...A, isStreaming: !1 } : A
          )
        );
      } catch (I) {
        a(I), r((b) => b.filter((A) => A.id !== k.id));
      } finally {
        l(!1);
      }
    },
    [c]
  ), g = de(() => {
    r([]), s.current = null;
  }, []);
  return {
    messages: n,
    isLoading: i,
    error: o,
    sendMessage: f,
    clearMessages: g
  };
}
export {
  J1 as ChatWrapper,
  F1 as Loader,
  n1 as PromptInput,
  l1 as PromptInputButton,
  Z1 as PromptInputModelSelect,
  G1 as PromptInputModelSelectContent,
  Y1 as PromptInputModelSelectItem,
  q1 as PromptInputModelSelectTrigger,
  X1 as PromptInputModelSelectValue,
  o1 as PromptInputSubmit,
  nl as PromptInputTextarea,
  r1 as PromptInputToolbar,
  i1 as PromptInputTools,
  R1 as Reasoning,
  O1 as ReasoningContent,
  D1 as ReasoningTrigger,
  K1 as useChatConnection
};
