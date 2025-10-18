var cl = Object.defineProperty;
var pl = (e, t, n) => t in e ? cl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var pe = (e, t, n) => pl(e, typeof t != "symbol" ? t + "" : t, n);
import { jsxs as P, jsx as f, Fragment as Nn } from "react/jsx-runtime";
import hl, { forwardRef as fl, useState as he, useCallback as fe, memo as Zn, useRef as wt, useMemo as qt, useEffect as Ct } from "react";
function dl(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const ml = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, gl = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, yl = {};
function wr(e, t) {
  return (yl.jsx ? gl : ml).test(e);
}
const Cl = /[ \t\n\f\r]/g;
function wl(e) {
  return typeof e == "object" ? e.type === "text" ? xr(e.value) : !1 : xr(e);
}
function xr(e) {
  return e.replace(Cl, "") === "";
}
class $t {
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
$t.prototype.normal = {};
$t.prototype.property = {};
$t.prototype.space = void 0;
function Ci(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new $t(n, r, t);
}
function Mn(e) {
  return e.toLowerCase();
}
class De {
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
De.prototype.attribute = "";
De.prototype.booleanish = !1;
De.prototype.boolean = !1;
De.prototype.commaOrSpaceSeparated = !1;
De.prototype.commaSeparated = !1;
De.prototype.defined = !1;
De.prototype.mustUseProperty = !1;
De.prototype.number = !1;
De.prototype.overloadedBoolean = !1;
De.prototype.property = "";
De.prototype.spaceSeparated = !1;
De.prototype.space = void 0;
let xl = 0;
const H = kt(), ye = kt(), Rn = kt(), _ = kt(), re = kt(), vt = kt(), ze = kt();
function kt() {
  return 2 ** ++xl;
}
const Dn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: H,
  booleanish: ye,
  commaOrSpaceSeparated: ze,
  commaSeparated: vt,
  number: _,
  overloadedBoolean: Rn,
  spaceSeparated: re
}, Symbol.toStringTag, { value: "Module" })), dn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Dn)
);
class qn extends De {
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
function Nt(e) {
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
  return new $t(t, n, e.space);
}
const wi = Nt({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: ye,
    ariaAutoComplete: null,
    ariaBusy: ye,
    ariaChecked: ye,
    ariaColCount: _,
    ariaColIndex: _,
    ariaColSpan: _,
    ariaControls: re,
    ariaCurrent: null,
    ariaDescribedBy: re,
    ariaDetails: null,
    ariaDisabled: ye,
    ariaDropEffect: re,
    ariaErrorMessage: null,
    ariaExpanded: ye,
    ariaFlowTo: re,
    ariaGrabbed: ye,
    ariaHasPopup: null,
    ariaHidden: ye,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: re,
    ariaLevel: _,
    ariaLive: null,
    ariaModal: ye,
    ariaMultiLine: ye,
    ariaMultiSelectable: ye,
    ariaOrientation: null,
    ariaOwns: re,
    ariaPlaceholder: null,
    ariaPosInSet: _,
    ariaPressed: ye,
    ariaReadOnly: ye,
    ariaRelevant: null,
    ariaRequired: ye,
    ariaRoleDescription: re,
    ariaRowCount: _,
    ariaRowIndex: _,
    ariaRowSpan: _,
    ariaSelected: ye,
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
function xi(e, t) {
  return t in e ? e[t] : t;
}
function ki(e, t) {
  return xi(e, t.toLowerCase());
}
const kl = Nt({
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
    accept: vt,
    acceptCharset: re,
    accessKey: re,
    action: null,
    allow: null,
    allowFullScreen: H,
    allowPaymentRequest: H,
    allowUserMedia: H,
    alt: null,
    as: null,
    async: H,
    autoCapitalize: null,
    autoComplete: re,
    autoFocus: H,
    autoPlay: H,
    blocking: re,
    capture: null,
    charSet: null,
    checked: H,
    cite: null,
    className: re,
    cols: _,
    colSpan: null,
    content: null,
    contentEditable: ye,
    controls: H,
    controlsList: re,
    coords: _ | vt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: H,
    defer: H,
    dir: null,
    dirName: null,
    disabled: H,
    download: Rn,
    draggable: ye,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: H,
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
    inert: H,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: H,
    itemId: null,
    itemProp: re,
    itemRef: re,
    itemScope: H,
    itemType: re,
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
    ping: re,
    placeholder: null,
    playsInline: H,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: H,
    referrerPolicy: null,
    rel: re,
    required: H,
    reversed: H,
    rows: _,
    rowSpan: _,
    sandbox: re,
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
    spellCheck: ye,
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
    value: ye,
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
    scrolling: ye,
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
  transform: ki
}), bl = Nt({
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
    about: ze,
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
    g1: vt,
    g2: vt,
    glyphName: vt,
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
    kernelMatrix: ze,
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
    property: ze,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: ze,
    rev: ze,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: ze,
    requiredFeatures: ze,
    requiredFonts: ze,
    requiredFormats: ze,
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
    strokeDashArray: ze,
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
    systemLanguage: ze,
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
    typeOf: ze,
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
  transform: xi
}), bi = Nt({
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
}), _i = Nt({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: ki
}), Si = Nt({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), _l = {
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
}, Sl = /[A-Z]/g, br = /-[a-z]/g, El = /^data[-\w.:]+$/i;
function Tl(e, t) {
  const n = Mn(t);
  let r = t, i = De;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && El.test(t)) {
    if (t.charAt(4) === "-") {
      const l = t.slice(5).replace(br, Il);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = t.slice(4);
      if (!br.test(l)) {
        let o = l.replace(Sl, Al);
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
const vl = Ci([wi, kl, bi, _i, Si], "html"), Gn = Ci([wi, bl, bi, _i, Si], "svg");
function Ll(e) {
  return e.join(" ").trim();
}
var rn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ei(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Yn = {}, _r = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Nl = /\n/g, Ml = /^\s*/, Rl = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Dl = /^:\s*/, Ol = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Pl = /^[;\s]*/, zl = /^\s+|\s+$/g, Fl = `
`, Sr = "/", Er = "*", xt = "", Bl = "comment", Ul = "declaration", Hl = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(w) {
    var k = w.match(Nl);
    k && (n += k.length);
    var A = w.lastIndexOf(Fl);
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
    s(Ml);
  }
  function c(w) {
    var k;
    for (w = w || []; k = h(); )
      k !== !1 && w.push(k);
    return w;
  }
  function h() {
    var w = l();
    if (!(Sr != e.charAt(0) || Er != e.charAt(1))) {
      for (var k = 2; xt != e.charAt(k) && (Er != e.charAt(k) || Sr != e.charAt(k + 1)); )
        ++k;
      if (k += 2, xt === e.charAt(k - 1))
        return a("End of comment missing");
      var A = e.slice(2, k - 2);
      return r += 2, i(A), e = e.slice(k), r += 2, w({
        type: Bl,
        comment: A
      });
    }
  }
  function y() {
    var w = l(), k = s(Rl);
    if (k) {
      if (h(), !s(Dl)) return a("property missing ':'");
      var A = s(Ol), b = w({
        type: Ul,
        property: Tr(k[0].replace(_r, xt)),
        value: A ? Tr(A[0].replace(_r, xt)) : xt
      });
      return s(Pl), b;
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
  return e ? e.replace(zl, xt) : xt;
}
var jl = rn && rn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.default = Vl;
var Wl = jl(Hl);
function Vl(e, t) {
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
var sn = {};
Object.defineProperty(sn, "__esModule", { value: !0 });
sn.camelCase = void 0;
var $l = /^--[a-zA-Z0-9_-]+$/, Zl = /-([a-z])/g, ql = /^[^-]+$/, Gl = /^-(webkit|moz|ms|o|khtml)-/, Yl = /^-(ms)-/, Xl = function(e) {
  return !e || ql.test(e) || $l.test(e);
}, Kl = function(e, t) {
  return t.toUpperCase();
}, Ar = function(e, t) {
  return "".concat(t, "-");
}, Jl = function(e, t) {
  return t === void 0 && (t = {}), Xl(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Yl, Ar) : e = e.replace(Gl, Ar), e.replace(Zl, Kl));
};
sn.camelCase = Jl;
var Ql = rn && rn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, eo = Ql(Yn), to = sn;
function On(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, eo.default)(e, function(r, i) {
    r && i && (n[(0, to.camelCase)(r, t)] = i);
  }), n;
}
On.default = On;
var no = On;
const ro = /* @__PURE__ */ Ei(no), Ti = Ai("end"), Xn = Ai("start");
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
function io(e) {
  const t = Xn(e), n = Ti(e);
  if (t && n)
    return { start: t, end: n };
}
function Ht(e) {
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
class Se extends Error {
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
    this.ancestors = l.ancestors || void 0, this.cause = l.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = Ht(l.place) || "1:1", this.place = l.place || void 0, this.reason = this.message, this.ruleId = l.ruleId || void 0, this.source = l.source || void 0, this.stack = o && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Se.prototype.file = "";
Se.prototype.name = "";
Se.prototype.reason = "";
Se.prototype.message = "";
Se.prototype.stack = "";
Se.prototype.column = void 0;
Se.prototype.line = void 0;
Se.prototype.ancestors = void 0;
Se.prototype.cause = void 0;
Se.prototype.fatal = void 0;
Se.prototype.place = void 0;
Se.prototype.ruleId = void 0;
Se.prototype.source = void 0;
const Kn = {}.hasOwnProperty, lo = /* @__PURE__ */ new Map(), oo = /[A-Z]/g, ao = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), so = /* @__PURE__ */ new Set(["td", "th"]), Ii = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function uo(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Co(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = yo(n, t.jsx, t.jsxs);
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
    schema: t.space === "svg" ? Gn : vl,
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
    return co(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return po(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return fo(e, t, n);
  if (t.type === "mdxjsEsm")
    return ho(e, t);
  if (t.type === "root")
    return mo(e, t, n);
  if (t.type === "text")
    return go(e, t);
}
function co(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Gn, e.schema = i), e.ancestors.push(t);
  const l = Ni(e, t.tagName, !1), o = wo(e, t);
  let a = Qn(e, t);
  return ao.has(t.tagName) && (a = a.filter(function(s) {
    return typeof s == "string" ? !wl(s) : !0;
  })), Li(e, o, l, t), Jn(o, a), e.ancestors.pop(), e.schema = r, e.create(t, l, o, n);
}
function po(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Vt(e, t.position);
}
function ho(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Vt(e, t.position);
}
function fo(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = Gn, e.schema = i), e.ancestors.push(t);
  const l = t.name === null ? e.Fragment : Ni(e, t.name, !0), o = xo(e, t), a = Qn(e, t);
  return Li(e, o, l, t), Jn(o, a), e.ancestors.pop(), e.schema = r, e.create(t, l, o, n);
}
function mo(e, t, n) {
  const r = {};
  return Jn(r, Qn(e, t)), e.create(t, e.Fragment, r, n);
}
function go(e, t) {
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
function yo(e, t, n) {
  return r;
  function r(i, l, o, a) {
    const u = Array.isArray(o.children) ? n : t;
    return a ? u(l, o, a) : u(l, o);
  }
}
function Co(e, t) {
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
function wo(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && Kn.call(t.properties, i)) {
      const l = ko(e, i, t.properties[i]);
      if (l) {
        const [o, a] = l;
        e.tableCellAlignToStyle && o === "align" && typeof a == "string" && so.has(t.tagName) ? r = a : n[o] = a;
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
function xo(e, t) {
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
        Vt(e, t.position);
    else {
      const i = r.name;
      let l;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, l = e.evaluater.evaluateExpression(a.expression);
        } else
          Vt(e, t.position);
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
  const i = e.passKeys ? /* @__PURE__ */ new Map() : lo;
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
function ko(e, t, n) {
  const r = Tl(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? dl(n) : Ll(n)), r.property === "style") {
      let i = typeof n == "object" ? n : bo(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = _o(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? _l[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function bo(e, t) {
  try {
    return ro(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new Se("Cannot parse `style` attribute", {
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
  Vt(e);
}
function Vt(e, t) {
  const n = new Se(
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
function _o(e) {
  const t = {};
  let n;
  for (n in e)
    Kn.call(e, n) && (t[So(n)] = e[n]);
  return t;
}
function So(e) {
  let t = e.replace(oo, Eo);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Eo(e) {
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
}, To = {};
function Ao(e, t) {
  const n = To, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Mi(e, r, i);
}
function Mi(e, t, n) {
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
    r[i] = Mi(e[i], t, n);
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
function Ue(e, t) {
  return e.length > 0 ? (Je(e, e.length, 0, t), e) : t;
}
const Mr = {}.hasOwnProperty;
function vo(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    Lo(t, e[n]);
  return t;
}
function Lo(e, t) {
  let n;
  for (n in t) {
    const i = (Mr.call(e, n) ? e[n] : void 0) || (e[n] = {}), l = t[n];
    let o;
    if (l)
      for (o in l) {
        Mr.call(i, o) || (i[o] = []);
        const a = l[o];
        No(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function No(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  Je(e, 0, 0, r);
}
function Ri(e, t) {
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
function Lt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Ke = ht(/[A-Za-z]/), Fe = ht(/[\dA-Za-z]/), Mo = ht(/[#-'*+\--9=?A-Z^-~]/);
function zn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Fn = ht(/\d/), Ro = ht(/[\dA-Fa-f]/), Do = ht(/[!-/:-@[-`{-~]/);
function U(e) {
  return e !== null && e < -2;
}
function Re(e) {
  return e !== null && (e < 0 || e === 32);
}
function Q(e) {
  return e === -2 || e === -1 || e === 32;
}
const Oo = ht(new RegExp("\\p{P}|\\p{S}", "u")), Po = ht(/\s/);
function ht(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Mt(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const l = e.charCodeAt(n);
    let o = "";
    if (l === 37 && Fe(e.charCodeAt(n + 1)) && Fe(e.charCodeAt(n + 2)))
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
const zo = {
  tokenize: Fo
};
function Fo(e) {
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
    return U(a) ? (e.consume(a), e.exit("chunkText"), l) : (e.consume(a), o);
  }
}
const Bo = {
  tokenize: Uo
}, Rr = {
  tokenize: Ho
};
function Uo(e) {
  const t = this, n = [];
  let r = 0, i, l, o;
  return a;
  function a(I) {
    if (r < n.length) {
      const F = n[r];
      return t.containerState = F[1], e.attempt(F[0].continuation, s, u)(I);
    }
    return u(I);
  }
  function s(I) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && M();
      const F = t.events.length;
      let X = F, x;
      for (; X--; )
        if (t.events[X][0] === "exit" && t.events[X][1].type === "chunkFlow") {
          x = t.events[X][1].end;
          break;
        }
      b(r);
      let G = F;
      for (; G < t.events.length; )
        t.events[G][1].end = {
          ...x
        }, G++;
      return Je(t.events, X + 1, 0, t.events.slice(F)), t.events.length = G, u(I);
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
    return t.containerState = {}, e.check(Rr, c, h)(I);
  }
  function c(I) {
    return i && M(), b(r), y(I);
  }
  function h(I) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, w(I);
  }
  function y(I) {
    return t.containerState = {}, e.attempt(Rr, p, w)(I);
  }
  function p(I) {
    return r++, n.push([t.currentConstruct, t.containerState]), y(I);
  }
  function w(I) {
    if (I === null) {
      i && M(), b(0), e.consume(I);
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
    return U(I) ? (e.consume(I), A(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, a) : (e.consume(I), k);
  }
  function A(I, F) {
    const X = t.sliceStream(I);
    if (F && X.push(null), I.previous = l, l && (l.next = I), l = I, i.defineSkip(I.start), i.write(X), t.parser.lazy[I.start.line]) {
      let x = i.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          i.events[x][1].start.offset < o && // …and either is not ended yet…
          (!i.events[x][1].end || // …or ends after it.
          i.events[x][1].end.offset > o)
        )
          return;
      const G = t.events.length;
      let le = G, Z, K;
      for (; le--; )
        if (t.events[le][0] === "exit" && t.events[le][1].type === "chunkFlow") {
          if (Z) {
            K = t.events[le][1].end;
            break;
          }
          Z = !0;
        }
      for (b(r), x = G; x < t.events.length; )
        t.events[x][1].end = {
          ...K
        }, x++;
      Je(t.events, le + 1, 0, t.events.slice(G)), t.events.length = x;
    }
  }
  function b(I) {
    let F = n.length;
    for (; F-- > I; ) {
      const X = n[F];
      t.containerState = X[1], X[0].exit.call(t, e);
    }
    n.length = I;
  }
  function M() {
    i.write([null]), l = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Ho(e, t, n) {
  return ie(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Dr(e) {
  if (e === null || Re(e) || Po(e))
    return 1;
  if (Oo(e))
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
          const h = {
            ...e[r][1].end
          }, y = {
            ...e[n][1].start
          };
          Or(h, -s), Or(y, s), o = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: h,
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
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = Ue(u, [["enter", e[r][1], t], ["exit", e[r][1], t]])), u = Ue(u, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["enter", l, t]]), u = Ue(u, tr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), u = Ue(u, [["exit", l, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (c = 2, u = Ue(u, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : c = 0, Je(e, r - 1, n - r + 3, u), n = r + u.length - c - 2;
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
    const u = e.exit("attentionSequence"), c = Dr(s), h = !c || c === 2 && i || n.includes(s), y = !i || i === 2 && c || n.includes(r);
    return u._open = !!(l === 42 ? h : h && (i || !y)), u._close = !!(l === 42 ? y : y && (c || !h)), t(s);
  }
}
function Or(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const Vo = {
  name: "autolink",
  tokenize: $o
};
function $o(e, t, n) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), l;
  }
  function l(p) {
    return Ke(p) ? (e.consume(p), o) : p === 64 ? n(p) : u(p);
  }
  function o(p) {
    return p === 43 || p === 45 || p === 46 || Fe(p) ? (r = 1, a(p)) : u(p);
  }
  function a(p) {
    return p === 58 ? (e.consume(p), r = 0, s) : (p === 43 || p === 45 || p === 46 || Fe(p)) && r++ < 32 ? (e.consume(p), a) : (r = 0, u(p));
  }
  function s(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : p === null || p === 32 || p === 60 || zn(p) ? n(p) : (e.consume(p), s);
  }
  function u(p) {
    return p === 64 ? (e.consume(p), c) : Mo(p) ? (e.consume(p), u) : n(p);
  }
  function c(p) {
    return Fe(p) ? h(p) : n(p);
  }
  function h(p) {
    return p === 46 ? (e.consume(p), r = 0, c) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : y(p);
  }
  function y(p) {
    if ((p === 45 || Fe(p)) && r++ < 63) {
      const w = p === 45 ? y : h;
      return e.consume(p), w;
    }
    return n(p);
  }
}
const un = {
  partial: !0,
  tokenize: Zo
};
function Zo(e, t, n) {
  return r;
  function r(l) {
    return Q(l) ? ie(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || U(l) ? t(l) : n(l);
  }
}
const Di = {
  continuation: {
    tokenize: Go
  },
  exit: Yo,
  name: "blockQuote",
  tokenize: qo
};
function qo(e, t, n) {
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
function Go(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return Q(o) ? ie(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : l(o);
  }
  function l(o) {
    return e.attempt(Di, t, n)(o);
  }
}
function Yo(e) {
  e.exit("blockQuote");
}
const Oi = {
  name: "characterEscape",
  tokenize: Xo
};
function Xo(e, t, n) {
  return r;
  function r(l) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(l), e.exit("escapeMarker"), i;
  }
  function i(l) {
    return Do(l) ? (e.enter("characterEscapeValue"), e.consume(l), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(l);
  }
}
const Pi = {
  name: "characterReference",
  tokenize: Ko
};
function Ko(e, t, n) {
  const r = this;
  let i = 0, l, o;
  return a;
  function a(h) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(h), e.exit("characterReferenceMarker"), s;
  }
  function s(h) {
    return h === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(h), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), l = 31, o = Fe, c(h));
  }
  function u(h) {
    return h === 88 || h === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(h), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), l = 6, o = Ro, c) : (e.enter("characterReferenceValue"), l = 7, o = Fn, c(h));
  }
  function c(h) {
    if (h === 59 && i) {
      const y = e.exit("characterReferenceValue");
      return o === Fe && !er(r.sliceSerialize(y)) ? n(h) : (e.enter("characterReferenceMarker"), e.consume(h), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return o(h) && i++ < l ? (e.consume(h), c) : n(h);
  }
}
const Pr = {
  partial: !0,
  tokenize: Qo
}, zr = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Jo
};
function Jo(e, t, n) {
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
    const G = r.events[r.events.length - 1];
    return l = G && G[1].type === "linePrefix" ? G[2].sliceSerialize(G[1], !0).length : 0, a = x, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), c(x);
  }
  function c(x) {
    return x === a ? (o++, e.consume(x), c) : o < 3 ? n(x) : (e.exit("codeFencedFenceSequence"), Q(x) ? ie(e, h, "whitespace")(x) : h(x));
  }
  function h(x) {
    return x === null || U(x) ? (e.exit("codeFencedFence"), r.interrupt ? t(x) : e.check(Pr, k, F)(x)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), y(x));
  }
  function y(x) {
    return x === null || U(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), h(x)) : Q(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), ie(e, p, "whitespace")(x)) : x === 96 && x === a ? n(x) : (e.consume(x), y);
  }
  function p(x) {
    return x === null || U(x) ? h(x) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), w(x));
  }
  function w(x) {
    return x === null || U(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), h(x)) : x === 96 && x === a ? n(x) : (e.consume(x), w);
  }
  function k(x) {
    return e.attempt(i, F, A)(x);
  }
  function A(x) {
    return e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), b;
  }
  function b(x) {
    return l > 0 && Q(x) ? ie(e, M, "linePrefix", l + 1)(x) : M(x);
  }
  function M(x) {
    return x === null || U(x) ? e.check(Pr, k, F)(x) : (e.enter("codeFlowValue"), I(x));
  }
  function I(x) {
    return x === null || U(x) ? (e.exit("codeFlowValue"), M(x)) : (e.consume(x), I);
  }
  function F(x) {
    return e.exit("codeFenced"), t(x);
  }
  function X(x, G, le) {
    let Z = 0;
    return K;
    function K(W) {
      return x.enter("lineEnding"), x.consume(W), x.exit("lineEnding"), v;
    }
    function v(W) {
      return x.enter("codeFencedFence"), Q(W) ? ie(x, N, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(W) : N(W);
    }
    function N(W) {
      return W === a ? (x.enter("codeFencedFenceSequence"), ee(W)) : le(W);
    }
    function ee(W) {
      return W === a ? (Z++, x.consume(W), ee) : Z >= o ? (x.exit("codeFencedFenceSequence"), Q(W) ? ie(x, J, "whitespace")(W) : J(W)) : le(W);
    }
    function J(W) {
      return W === null || U(W) ? (x.exit("codeFencedFence"), G(W)) : le(W);
    }
  }
}
function Qo(e, t, n) {
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
  tokenize: ta
}, ea = {
  partial: !0,
  tokenize: na
};
function ta(e, t, n) {
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
    return u === null ? s(u) : U(u) ? e.attempt(ea, o, s)(u) : (e.enter("codeFlowValue"), a(u));
  }
  function a(u) {
    return u === null || U(u) ? (e.exit("codeFlowValue"), o(u)) : (e.consume(u), a);
  }
  function s(u) {
    return e.exit("codeIndented"), t(u);
  }
}
function na(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : U(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : ie(e, l, "linePrefix", 5)(o);
  }
  function l(o) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(o) : U(o) ? i(o) : n(o);
  }
}
const ra = {
  name: "codeText",
  previous: la,
  resolve: ia,
  tokenize: oa
};
function ia(e) {
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
function la(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function oa(e, t, n) {
  let r = 0, i, l;
  return o;
  function o(h) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(h);
  }
  function a(h) {
    return h === 96 ? (e.consume(h), r++, a) : (e.exit("codeTextSequence"), s(h));
  }
  function s(h) {
    return h === null ? n(h) : h === 32 ? (e.enter("space"), e.consume(h), e.exit("space"), s) : h === 96 ? (l = e.enter("codeTextSequence"), i = 0, c(h)) : U(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(h));
  }
  function u(h) {
    return h === null || h === 32 || h === 96 || U(h) ? (e.exit("codeTextData"), s(h)) : (e.consume(h), u);
  }
  function c(h) {
    return h === 96 ? (e.consume(h), i++, c) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(h)) : (l.type = "codeTextData", u(h));
  }
}
class aa {
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
    return r && Dt(this.left, r), l.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Dt(this.left, t);
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
    this.setCursor(0), Dt(this.right, t.reverse());
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
        Dt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Dt(this.left, n.reverse());
      }
  }
}
function Dt(e, t) {
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
  const c = new aa(e);
  for (; ++n < c.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = c.get(n), n && r[1].type === "chunkFlow" && c.get(n - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, l = 0, l < s.length && s[l][1].type === "lineEndingBlank" && (l += 2), l < s.length && s[l][1].type === "content"))
      for (; ++l < s.length && s[l][1].type !== "content"; )
        s[l][1].type === "chunkText" && (s[l][1]._isInFirstContentOfListItem = !0, l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, sa(c, n)), n = t[n], u = !0);
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
function sa(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const l = [];
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const a = o.events, s = [], u = {};
  let c, h, y = -1, p = n, w = 0, k = 0;
  const A = [k];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    l.push(i), p._tokenizer || (c = r.sliceStream(p), p.next || c.push(null), h && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(c), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), h = p, p = p.next;
  }
  for (p = n; ++y < a.length; )
    // Find a void token that includes a break.
    a[y][0] === "exit" && a[y - 1][0] === "enter" && a[y][1].type === a[y - 1][1].type && a[y][1].start.line !== a[y][1].end.line && (k = y + 1, A.push(k), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : A.pop(), y = A.length; y--; ) {
    const b = a.slice(A[y], A[y + 1]), M = l.pop();
    s.push([M, M + b.length - 1]), e.splice(M, 2, b);
  }
  for (s.reverse(), y = -1; ++y < s.length; )
    u[w + s[y][0]] = w + s[y][1], w += s[y][1] - s[y][0] - 1;
  return u;
}
const ua = {
  resolve: pa,
  tokenize: ha
}, ca = {
  partial: !0,
  tokenize: fa
};
function pa(e) {
  return zi(e), e;
}
function ha(e, t) {
  let n;
  return r;
  function r(a) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? l(a) : U(a) ? e.check(ca, o, l)(a) : (e.consume(a), i);
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
function fa(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), ie(e, l, "linePrefix");
  }
  function l(o) {
    if (o === null || U(o))
      return n(o);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function Fi(e, t, n, r, i, l, o, a, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let c = 0;
  return h;
  function h(b) {
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
    return b === 62 ? (e.exit("chunkString"), e.exit(a), y(b)) : b === null || b === 60 || U(b) ? n(b) : (e.consume(b), b === 92 ? w : p);
  }
  function w(b) {
    return b === 60 || b === 62 || b === 92 ? (e.consume(b), p) : p(b);
  }
  function k(b) {
    return !c && (b === null || b === 41 || Re(b)) ? (e.exit("chunkString"), e.exit(a), e.exit(o), e.exit(r), t(b)) : c < u && b === 40 ? (e.consume(b), c++, k) : b === 41 ? (e.consume(b), c--, k) : b === null || b === 32 || b === 40 || zn(b) ? n(b) : (e.consume(b), b === 92 ? A : k);
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
    p === 94 && !a && "_hiddenFootnoteSupport" in o.parser.constructs ? n(p) : p === 93 ? (e.exit(l), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : U(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), c) : (e.enter("chunkString", {
      contentType: "string"
    }), h(p));
  }
  function h(p) {
    return p === null || p === 91 || p === 93 || U(p) || a++ > 999 ? (e.exit("chunkString"), c(p)) : (e.consume(p), s || (s = !Q(p)), p === 92 ? y : h);
  }
  function y(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), a++, h) : h(p);
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
    return y === o ? (e.exit(l), s(o)) : y === null ? n(y) : U(y) ? (e.enter("lineEnding"), e.consume(y), e.exit("lineEnding"), ie(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), c(y));
  }
  function c(y) {
    return y === o || y === null || U(y) ? (e.exit("chunkString"), u(y)) : (e.consume(y), y === 92 ? h : c);
  }
  function h(y) {
    return y === o || y === 92 ? (e.consume(y), c) : c(y);
  }
}
function jt(e, t) {
  let n;
  return r;
  function r(i) {
    return U(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : Q(i) ? ie(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const da = {
  name: "definition",
  tokenize: ga
}, ma = {
  partial: !0,
  tokenize: ya
};
function ga(e, t, n) {
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
    return i = Lt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), s) : n(p);
  }
  function s(p) {
    return Re(p) ? jt(e, u)(p) : u(p);
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
    return e.attempt(ma, h, h)(p);
  }
  function h(p) {
    return Q(p) ? ie(e, y, "whitespace")(p) : y(p);
  }
  function y(p) {
    return p === null || U(p) ? (e.exit("definition"), r.parser.defined.push(i), t(p)) : n(p);
  }
}
function ya(e, t, n) {
  return r;
  function r(a) {
    return Re(a) ? jt(e, i)(a) : n(a);
  }
  function i(a) {
    return Ui(e, l, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function l(a) {
    return Q(a) ? ie(e, o, "whitespace")(a) : o(a);
  }
  function o(a) {
    return a === null || U(a) ? t(a) : n(a);
  }
}
const Ca = {
  name: "hardBreakEscape",
  tokenize: wa
};
function wa(e, t, n) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return U(l) ? (e.exit("hardBreakEscape"), t(l)) : n(l);
  }
}
const xa = {
  name: "headingAtx",
  resolve: ka,
  tokenize: ba
};
function ka(e, t) {
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
function ba(e, t, n) {
  let r = 0;
  return i;
  function i(c) {
    return e.enter("atxHeading"), l(c);
  }
  function l(c) {
    return e.enter("atxHeadingSequence"), o(c);
  }
  function o(c) {
    return c === 35 && r++ < 6 ? (e.consume(c), o) : c === null || Re(c) ? (e.exit("atxHeadingSequence"), a(c)) : n(c);
  }
  function a(c) {
    return c === 35 ? (e.enter("atxHeadingSequence"), s(c)) : c === null || U(c) ? (e.exit("atxHeading"), t(c)) : Q(c) ? ie(e, a, "whitespace")(c) : (e.enter("atxHeadingText"), u(c));
  }
  function s(c) {
    return c === 35 ? (e.consume(c), s) : (e.exit("atxHeadingSequence"), a(c));
  }
  function u(c) {
    return c === null || c === 35 || Re(c) ? (e.exit("atxHeadingText"), a(c)) : (e.consume(c), u);
  }
}
const _a = [
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
], Fr = ["pre", "script", "style", "textarea"], Sa = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Aa,
  tokenize: Ia
}, Ea = {
  partial: !0,
  tokenize: La
}, Ta = {
  partial: !0,
  tokenize: va
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
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(d), h;
  }
  function h(d) {
    return d === 33 ? (e.consume(d), y) : d === 47 ? (e.consume(d), l = !0, k) : d === 63 ? (e.consume(d), i = 3, r.interrupt ? t : m) : Ke(d) ? (e.consume(d), o = String.fromCharCode(d), A) : n(d);
  }
  function y(d) {
    return d === 45 ? (e.consume(d), i = 2, p) : d === 91 ? (e.consume(d), i = 5, a = 0, w) : Ke(d) ? (e.consume(d), i = 4, r.interrupt ? t : m) : n(d);
  }
  function p(d) {
    return d === 45 ? (e.consume(d), r.interrupt ? t : m) : n(d);
  }
  function w(d) {
    const ce = "CDATA[";
    return d === ce.charCodeAt(a++) ? (e.consume(d), a === ce.length ? r.interrupt ? t : N : w) : n(d);
  }
  function k(d) {
    return Ke(d) ? (e.consume(d), o = String.fromCharCode(d), A) : n(d);
  }
  function A(d) {
    if (d === null || d === 47 || d === 62 || Re(d)) {
      const ce = d === 47, V = o.toLowerCase();
      return !ce && !l && Fr.includes(V) ? (i = 1, r.interrupt ? t(d) : N(d)) : _a.includes(o.toLowerCase()) ? (i = 6, ce ? (e.consume(d), b) : r.interrupt ? t(d) : N(d)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(d) : l ? M(d) : I(d));
    }
    return d === 45 || Fe(d) ? (e.consume(d), o += String.fromCharCode(d), A) : n(d);
  }
  function b(d) {
    return d === 62 ? (e.consume(d), r.interrupt ? t : N) : n(d);
  }
  function M(d) {
    return Q(d) ? (e.consume(d), M) : K(d);
  }
  function I(d) {
    return d === 47 ? (e.consume(d), K) : d === 58 || d === 95 || Ke(d) ? (e.consume(d), F) : Q(d) ? (e.consume(d), I) : K(d);
  }
  function F(d) {
    return d === 45 || d === 46 || d === 58 || d === 95 || Fe(d) ? (e.consume(d), F) : X(d);
  }
  function X(d) {
    return d === 61 ? (e.consume(d), x) : Q(d) ? (e.consume(d), X) : I(d);
  }
  function x(d) {
    return d === null || d === 60 || d === 61 || d === 62 || d === 96 ? n(d) : d === 34 || d === 39 ? (e.consume(d), s = d, G) : Q(d) ? (e.consume(d), x) : le(d);
  }
  function G(d) {
    return d === s ? (e.consume(d), s = null, Z) : d === null || U(d) ? n(d) : (e.consume(d), G);
  }
  function le(d) {
    return d === null || d === 34 || d === 39 || d === 47 || d === 60 || d === 61 || d === 62 || d === 96 || Re(d) ? X(d) : (e.consume(d), le);
  }
  function Z(d) {
    return d === 47 || d === 62 || Q(d) ? I(d) : n(d);
  }
  function K(d) {
    return d === 62 ? (e.consume(d), v) : n(d);
  }
  function v(d) {
    return d === null || U(d) ? N(d) : Q(d) ? (e.consume(d), v) : n(d);
  }
  function N(d) {
    return d === 45 && i === 2 ? (e.consume(d), de) : d === 60 && i === 1 ? (e.consume(d), ae) : d === 62 && i === 4 ? (e.consume(d), q) : d === 63 && i === 3 ? (e.consume(d), m) : d === 93 && i === 5 ? (e.consume(d), Ie) : U(d) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Ea, ue, ee)(d)) : d === null || U(d) ? (e.exit("htmlFlowData"), ee(d)) : (e.consume(d), N);
  }
  function ee(d) {
    return e.check(Ta, J, ue)(d);
  }
  function J(d) {
    return e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), W;
  }
  function W(d) {
    return d === null || U(d) ? ee(d) : (e.enter("htmlFlowData"), N(d));
  }
  function de(d) {
    return d === 45 ? (e.consume(d), m) : N(d);
  }
  function ae(d) {
    return d === 47 ? (e.consume(d), o = "", me) : N(d);
  }
  function me(d) {
    if (d === 62) {
      const ce = o.toLowerCase();
      return Fr.includes(ce) ? (e.consume(d), q) : N(d);
    }
    return Ke(d) && o.length < 8 ? (e.consume(d), o += String.fromCharCode(d), me) : N(d);
  }
  function Ie(d) {
    return d === 93 ? (e.consume(d), m) : N(d);
  }
  function m(d) {
    return d === 62 ? (e.consume(d), q) : d === 45 && i === 2 ? (e.consume(d), m) : N(d);
  }
  function q(d) {
    return d === null || U(d) ? (e.exit("htmlFlowData"), ue(d)) : (e.consume(d), q);
  }
  function ue(d) {
    return e.exit("htmlFlow"), t(d);
  }
}
function va(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return U(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l) : n(o);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function La(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(un, t, n);
  }
}
const Na = {
  name: "htmlText",
  tokenize: Ma
};
function Ma(e, t, n) {
  const r = this;
  let i, l, o;
  return a;
  function a(m) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(m), s;
  }
  function s(m) {
    return m === 33 ? (e.consume(m), u) : m === 47 ? (e.consume(m), X) : m === 63 ? (e.consume(m), I) : Ke(m) ? (e.consume(m), le) : n(m);
  }
  function u(m) {
    return m === 45 ? (e.consume(m), c) : m === 91 ? (e.consume(m), l = 0, w) : Ke(m) ? (e.consume(m), M) : n(m);
  }
  function c(m) {
    return m === 45 ? (e.consume(m), p) : n(m);
  }
  function h(m) {
    return m === null ? n(m) : m === 45 ? (e.consume(m), y) : U(m) ? (o = h, ae(m)) : (e.consume(m), h);
  }
  function y(m) {
    return m === 45 ? (e.consume(m), p) : h(m);
  }
  function p(m) {
    return m === 62 ? de(m) : m === 45 ? y(m) : h(m);
  }
  function w(m) {
    const q = "CDATA[";
    return m === q.charCodeAt(l++) ? (e.consume(m), l === q.length ? k : w) : n(m);
  }
  function k(m) {
    return m === null ? n(m) : m === 93 ? (e.consume(m), A) : U(m) ? (o = k, ae(m)) : (e.consume(m), k);
  }
  function A(m) {
    return m === 93 ? (e.consume(m), b) : k(m);
  }
  function b(m) {
    return m === 62 ? de(m) : m === 93 ? (e.consume(m), b) : k(m);
  }
  function M(m) {
    return m === null || m === 62 ? de(m) : U(m) ? (o = M, ae(m)) : (e.consume(m), M);
  }
  function I(m) {
    return m === null ? n(m) : m === 63 ? (e.consume(m), F) : U(m) ? (o = I, ae(m)) : (e.consume(m), I);
  }
  function F(m) {
    return m === 62 ? de(m) : I(m);
  }
  function X(m) {
    return Ke(m) ? (e.consume(m), x) : n(m);
  }
  function x(m) {
    return m === 45 || Fe(m) ? (e.consume(m), x) : G(m);
  }
  function G(m) {
    return U(m) ? (o = G, ae(m)) : Q(m) ? (e.consume(m), G) : de(m);
  }
  function le(m) {
    return m === 45 || Fe(m) ? (e.consume(m), le) : m === 47 || m === 62 || Re(m) ? Z(m) : n(m);
  }
  function Z(m) {
    return m === 47 ? (e.consume(m), de) : m === 58 || m === 95 || Ke(m) ? (e.consume(m), K) : U(m) ? (o = Z, ae(m)) : Q(m) ? (e.consume(m), Z) : de(m);
  }
  function K(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || Fe(m) ? (e.consume(m), K) : v(m);
  }
  function v(m) {
    return m === 61 ? (e.consume(m), N) : U(m) ? (o = v, ae(m)) : Q(m) ? (e.consume(m), v) : Z(m);
  }
  function N(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (e.consume(m), i = m, ee) : U(m) ? (o = N, ae(m)) : Q(m) ? (e.consume(m), N) : (e.consume(m), J);
  }
  function ee(m) {
    return m === i ? (e.consume(m), i = void 0, W) : m === null ? n(m) : U(m) ? (o = ee, ae(m)) : (e.consume(m), ee);
  }
  function J(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96 ? n(m) : m === 47 || m === 62 || Re(m) ? Z(m) : (e.consume(m), J);
  }
  function W(m) {
    return m === 47 || m === 62 || Re(m) ? Z(m) : n(m);
  }
  function de(m) {
    return m === 62 ? (e.consume(m), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(m);
  }
  function ae(m) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), me;
  }
  function me(m) {
    return Q(m) ? ie(e, Ie, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m) : Ie(m);
  }
  function Ie(m) {
    return e.enter("htmlTextData"), o(m);
  }
}
const nr = {
  name: "labelEnd",
  resolveAll: Pa,
  resolveTo: za,
  tokenize: Fa
}, Ra = {
  tokenize: Ba
}, Da = {
  tokenize: Ua
}, Oa = {
  tokenize: Ha
};
function Pa(e) {
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
function za(e, t) {
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
  return a = [["enter", s, t], ["enter", u, t]], a = Ue(a, e.slice(l + 1, l + r + 3)), a = Ue(a, [["enter", c, t]]), a = Ue(a, tr(t.parser.constructs.insideSpan.null, e.slice(l + r + 4, o - 3), t)), a = Ue(a, [["exit", c, t], e[o - 2], e[o - 1], ["exit", u, t]]), a = Ue(a, e.slice(o + 1)), a = Ue(a, [["exit", s, t]]), Je(e, l, e.length, a), e;
}
function Fa(e, t, n) {
  const r = this;
  let i = r.events.length, l, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      l = r.events[i][1];
      break;
    }
  return a;
  function a(y) {
    return l ? l._inactive ? h(y) : (o = r.parser.defined.includes(Lt(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(y), e.exit("labelMarker"), e.exit("labelEnd"), s) : n(y);
  }
  function s(y) {
    return y === 40 ? e.attempt(Ra, c, o ? c : h)(y) : y === 91 ? e.attempt(Da, c, o ? u : h)(y) : o ? c(y) : h(y);
  }
  function u(y) {
    return e.attempt(Oa, c, h)(y);
  }
  function c(y) {
    return t(y);
  }
  function h(y) {
    return l._balanced = !0, n(y);
  }
}
function Ba(e, t, n) {
  return r;
  function r(h) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(h), e.exit("resourceMarker"), i;
  }
  function i(h) {
    return Re(h) ? jt(e, l)(h) : l(h);
  }
  function l(h) {
    return h === 41 ? c(h) : Fi(e, o, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(h);
  }
  function o(h) {
    return Re(h) ? jt(e, s)(h) : c(h);
  }
  function a(h) {
    return n(h);
  }
  function s(h) {
    return h === 34 || h === 39 || h === 40 ? Ui(e, u, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(h) : c(h);
  }
  function u(h) {
    return Re(h) ? jt(e, c)(h) : c(h);
  }
  function c(h) {
    return h === 41 ? (e.enter("resourceMarker"), e.consume(h), e.exit("resourceMarker"), e.exit("resource"), t) : n(h);
  }
}
function Ua(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return Bi.call(r, e, l, o, "reference", "referenceMarker", "referenceString")(a);
  }
  function l(a) {
    return r.parser.defined.includes(Lt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(a) : n(a);
  }
  function o(a) {
    return n(a);
  }
}
function Ha(e, t, n) {
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
const Va = {
  name: "labelStartLink",
  resolveAll: nr.resolveAll,
  tokenize: $a
};
function $a(e, t, n) {
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
  tokenize: Za
};
function Za(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), ie(e, t, "linePrefix");
  }
}
const Qt = {
  name: "thematicBreak",
  tokenize: qa
};
function qa(e, t, n) {
  let r = 0, i;
  return l;
  function l(u) {
    return e.enter("thematicBreak"), o(u);
  }
  function o(u) {
    return i = u, a(u);
  }
  function a(u) {
    return u === i ? (e.enter("thematicBreakSequence"), s(u)) : r >= 3 && (u === null || U(u)) ? (e.exit("thematicBreak"), t(u)) : n(u);
  }
  function s(u) {
    return u === i ? (e.consume(u), r++, s) : (e.exit("thematicBreakSequence"), Q(u) ? ie(e, a, "whitespace")(u) : a(u));
  }
}
const Me = {
  continuation: {
    tokenize: Ka
  },
  exit: Qa,
  name: "list",
  tokenize: Xa
}, Ga = {
  partial: !0,
  tokenize: es
}, Ya = {
  partial: !0,
  tokenize: Ja
};
function Xa(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let l = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return a;
  function a(p) {
    const w = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (w === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : Fn(p)) {
      if (r.containerState.type || (r.containerState.type = w, e.enter(w, {
        _container: !0
      })), w === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(Qt, n, u)(p) : u(p);
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
      un,
      // Can’t be empty when interrupting.
      r.interrupt ? n : c,
      e.attempt(Ga, y, h)
    );
  }
  function c(p) {
    return r.containerState.initialBlankLine = !0, l++, y(p);
  }
  function h(p) {
    return Q(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), y) : n(p);
  }
  function y(p) {
    return r.containerState.size = l + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(p);
  }
}
function Ka(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(un, i, l);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, ie(e, t, "listItemIndent", r.containerState.size + 1)(a);
  }
  function l(a) {
    return r.containerState.furtherBlankLines || !Q(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Ya, t, o)(a));
  }
  function o(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, ie(e, e.attempt(Me, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function Ja(e, t, n) {
  const r = this;
  return ie(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(l) : n(l);
  }
}
function Qa(e) {
  e.exit(this.containerState.type);
}
function es(e, t, n) {
  const r = this;
  return ie(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return !Q(l) && o && o[1].type === "listItemPrefixWhitespace" ? t(l) : n(l);
  }
}
const Br = {
  name: "setextUnderline",
  resolveTo: ts,
  tokenize: ns
};
function ts(e, t) {
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
function ns(e, t, n) {
  const r = this;
  let i;
  return l;
  function l(u) {
    let c = r.events.length, h;
    for (; c--; )
      if (r.events[c][1].type !== "lineEnding" && r.events[c][1].type !== "linePrefix" && r.events[c][1].type !== "content") {
        h = r.events[c][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || h) ? (e.enter("setextHeadingLine"), i = u, o(u)) : n(u);
  }
  function o(u) {
    return e.enter("setextHeadingLineSequence"), a(u);
  }
  function a(u) {
    return u === i ? (e.consume(u), a) : (e.exit("setextHeadingLineSequence"), Q(u) ? ie(e, s, "lineSuffix")(u) : s(u));
  }
  function s(u) {
    return u === null || U(u) ? (e.exit("setextHeadingLine"), t(u)) : n(u);
  }
}
const rs = {
  tokenize: is
};
function is(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    un,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, ie(e, e.attempt(this.parser.constructs.flow, i, e.attempt(ua, i)), "linePrefix"))
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
const ls = {
  resolveAll: ji()
}, os = Hi("string"), as = Hi("text");
function Hi(e) {
  return {
    resolveAll: ji(e === "text" ? ss : void 0),
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
      const h = i[c];
      let y = -1;
      if (h)
        for (; ++y < h.length; ) {
          const p = h[y];
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
function ss(e, t) {
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
const us = {
  42: Me,
  43: Me,
  45: Me,
  48: Me,
  49: Me,
  50: Me,
  51: Me,
  52: Me,
  53: Me,
  54: Me,
  55: Me,
  56: Me,
  57: Me,
  62: Di
}, cs = {
  91: da
}, ps = {
  [-2]: gn,
  [-1]: gn,
  32: gn
}, hs = {
  35: xa,
  42: Qt,
  45: [Br, Qt],
  60: Sa,
  61: Br,
  95: Qt,
  96: zr,
  126: zr
}, fs = {
  38: Pi,
  92: Oi
}, ds = {
  [-5]: yn,
  [-4]: yn,
  [-3]: yn,
  33: ja,
  38: Pi,
  42: Bn,
  60: [Vo, Na],
  91: Va,
  92: [Ca, Oi],
  93: nr,
  95: Bn,
  96: ra
}, ms = {
  null: [Bn, ls]
}, gs = {
  null: [42, 95]
}, ys = {
  null: []
}, Cs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: gs,
  contentInitial: cs,
  disable: ys,
  document: us,
  flow: hs,
  flowInitial: ps,
  insideSpan: ms,
  string: fs,
  text: ds
}, Symbol.toStringTag, { value: "Module" }));
function ws(e, t, n) {
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
    attempt: G(X),
    check: G(x),
    consume: M,
    enter: I,
    exit: F,
    interrupt: G(x, {
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
    write: h
  };
  let c = t.tokenize.call(u, s);
  return t.resolveAll && l.push(t), u;
  function h(v) {
    return o = Ue(o, v), A(), o[o.length - 1] !== null ? [] : (le(t, 0), u.events = tr(l, u.events, u), u.events);
  }
  function y(v, N) {
    return ks(p(v), N);
  }
  function p(v) {
    return xs(o, v);
  }
  function w() {
    const {
      _bufferIndex: v,
      _index: N,
      line: ee,
      column: J,
      offset: W
    } = r;
    return {
      _bufferIndex: v,
      _index: N,
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
      const N = o[r._index];
      if (typeof N == "string")
        for (v = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === v && r._bufferIndex < N.length; )
          b(N.charCodeAt(r._bufferIndex));
      else
        b(N);
    }
  }
  function b(v) {
    c = c(v);
  }
  function M(v) {
    U(v) ? (r.line++, r.column = 1, r.offset += v === -3 ? 2 : 1, K()) : v !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = v;
  }
  function I(v, N) {
    const ee = N || {};
    return ee.type = v, ee.start = w(), u.events.push(["enter", ee, u]), a.push(ee), ee;
  }
  function F(v) {
    const N = a.pop();
    return N.end = w(), u.events.push(["exit", N, u]), N;
  }
  function X(v, N) {
    le(v, N.from);
  }
  function x(v, N) {
    N.restore();
  }
  function G(v, N) {
    return ee;
    function ee(J, W, de) {
      let ae, me, Ie, m;
      return Array.isArray(J) ? (
        /* c8 ignore next 1 */
        ue(J)
      ) : "tokenize" in J ? (
        // Looks like a construct.
        ue([
          /** @type {Construct} */
          J
        ])
      ) : q(J);
      function q(oe) {
        return je;
        function je(Ce) {
          const We = Ce !== null && oe[Ce], be = Ce !== null && oe.null, ve = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(We) ? We : We ? [We] : [],
            ...Array.isArray(be) ? be : be ? [be] : []
          ];
          return ue(ve)(Ce);
        }
      }
      function ue(oe) {
        return ae = oe, me = 0, oe.length === 0 ? de : d(oe[me]);
      }
      function d(oe) {
        return je;
        function je(Ce) {
          return m = Z(), Ie = oe, oe.partial || (u.currentConstruct = oe), oe.name && u.parser.constructs.disable.null.includes(oe.name) ? V() : oe.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            N ? Object.assign(Object.create(u), N) : u,
            s,
            ce,
            V
          )(Ce);
        }
      }
      function ce(oe) {
        return v(Ie, m), W;
      }
      function V(oe) {
        return m.restore(), ++me < ae.length ? d(ae[me]) : de;
      }
    }
  }
  function le(v, N) {
    v.resolveAll && !l.includes(v) && l.push(v), v.resolve && Je(u.events, N, u.events.length - N, v.resolve(u.events.slice(N), u)), v.resolveTo && (u.events = v.resolveTo(u.events, u));
  }
  function Z() {
    const v = w(), N = u.previous, ee = u.currentConstruct, J = u.events.length, W = Array.from(a);
    return {
      from: J,
      restore: de
    };
    function de() {
      r = v, u.previous = N, u.currentConstruct = ee, u.events.length = J, a = W, K();
    }
  }
  function K() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function xs(e, t) {
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
function ks(e, t) {
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
function bs(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      vo([Cs, ...(e || {}).extensions || []])
    ),
    content: i(zo),
    defined: [],
    document: i(Bo),
    flow: i(rs),
    lazy: {},
    string: i(os),
    text: i(as)
  };
  return r;
  function i(l) {
    return o;
    function o(a) {
      return ws(r, l, a);
    }
  }
}
function _s(e) {
  for (; !zi(e); )
    ;
  return e;
}
const Ur = /[\0\t\n\r]/g;
function Ss() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(l, o, a) {
    const s = [];
    let u, c, h, y, p;
    for (l = t + (typeof l == "string" ? l.toString() : new TextDecoder(o || void 0).decode(l)), h = 0, t = "", n && (l.charCodeAt(0) === 65279 && h++, n = void 0); h < l.length; ) {
      if (Ur.lastIndex = h, u = Ur.exec(l), y = u && u.index !== void 0 ? u.index : l.length, p = l.charCodeAt(y), !u) {
        t = l.slice(h);
        break;
      }
      if (p === 10 && h === y && r)
        s.push(-3), r = void 0;
      else
        switch (r && (s.push(-5), r = void 0), h < y && (s.push(l.slice(h, y)), e += y - h), p) {
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
      h = y + 1;
    }
    return a && (r && s.push(-5), t && s.push(t), s.push(null)), s;
  }
}
const Es = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Ts(e) {
  return e.replace(Es, As);
}
function As(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), l = i === 120 || i === 88;
    return Ri(n.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return er(n) || e;
}
const Wi = {}.hasOwnProperty;
function Is(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), vs(n)(_s(bs(n).document().write(Ss()(e, t, !0))));
}
function vs(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(nt),
      autolinkProtocol: Z,
      autolinkEmail: Z,
      atxHeading: l(Oe),
      blockQuote: l(be),
      characterEscape: Z,
      characterReference: Z,
      codeFenced: l(ve),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l(ve, o),
      codeText: l(ft, o),
      codeTextData: Z,
      data: Z,
      codeFlowValue: Z,
      definition: l(Ve),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(Qe),
      hardBreakEscape: l(et),
      hardBreakTrailing: l(et),
      htmlFlow: l(tt, o),
      htmlFlowData: Z,
      htmlText: l(tt, o),
      htmlTextData: Z,
      image: l(Ge),
      label: o,
      link: l(nt),
      listItem: l(bt),
      listItemValue: y,
      listOrdered: l(rt, h),
      listUnordered: l(rt),
      paragraph: l(it),
      reference: d,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: l(Oe),
      strong: l(_t),
      thematicBreak: l(ut)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: X,
      autolink: s(),
      autolinkEmail: We,
      autolinkProtocol: Ce,
      blockQuote: s(),
      characterEscapeValue: K,
      characterReferenceMarkerHexadecimal: V,
      characterReferenceMarkerNumeric: V,
      characterReferenceValue: oe,
      characterReference: je,
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
      definitionDestinationString: F,
      definitionLabelString: M,
      definitionTitleString: I,
      emphasis: s(),
      hardBreakEscape: s(N),
      hardBreakTrailing: s(N),
      htmlFlow: s(ee),
      htmlFlowData: K,
      htmlText: s(J),
      htmlTextData: K,
      image: s(ae),
      label: Ie,
      labelText: me,
      lineEnding: v,
      link: s(de),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: ce,
      resourceDestinationString: m,
      resourceTitleString: q,
      resource: ue,
      setextHeading: s(le),
      setextHeadingLineSequence: G,
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
    const B = {
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
          const we = j.pop();
          Y = i(C, we, Y);
        }
    for (Y = -1; ++Y < C.length; ) {
      const we = t[C[Y][0]];
      Wi.call(we, C[Y][1].type) && we[C[Y][1].type].call(Object.assign({
        sliceSerialize: C[Y][2].sliceSerialize
      }, B), C[Y][1]);
    }
    if (B.tokenStack.length > 0) {
      const we = B.tokenStack[B.tokenStack.length - 1];
      (we[1] || Hr).call(B, void 0, we[0]);
    }
    for (E.position = {
      start: pt(C.length > 0 ? C[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: pt(C.length > 0 ? C[C.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Y = -1; ++Y < t.transforms.length; )
      E = t.transforms[Y](E) || E;
    return E;
  }
  function i(C, E, B) {
    let j = E - 1, Y = -1, we = !1, Be, xe, T, R;
    for (; ++j <= B; ) {
      const z = C[j];
      switch (z[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          z[0] === "enter" ? Y++ : Y--, R = void 0;
          break;
        }
        case "lineEndingBlank": {
          z[0] === "enter" && (Be && !R && !Y && !T && (T = j), R = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          R = void 0;
      }
      if (!Y && z[0] === "enter" && z[1].type === "listItemPrefix" || Y === -1 && z[0] === "exit" && (z[1].type === "listUnordered" || z[1].type === "listOrdered")) {
        if (Be) {
          let O = j;
          for (xe = void 0; O--; ) {
            const te = C[O];
            if (te[1].type === "lineEnding" || te[1].type === "lineEndingBlank") {
              if (te[0] === "exit") continue;
              xe && (C[xe][1].type = "lineEndingBlank", we = !0), te[1].type = "lineEnding", xe = O;
            } else if (!(te[1].type === "linePrefix" || te[1].type === "blockQuotePrefix" || te[1].type === "blockQuotePrefixWhitespace" || te[1].type === "blockQuoteMarker" || te[1].type === "listItemIndent")) break;
          }
          T && (!xe || T < xe) && (Be._spread = !0), Be.end = Object.assign({}, xe ? C[xe][1].start : z[1].end), C.splice(xe || j, 0, ["exit", Be, z[2]]), j++, B++;
        }
        if (z[1].type === "listItemPrefix") {
          const O = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, z[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Be = O, C.splice(j, 0, ["enter", O, z[2]]), j++, B++, T = void 0, R = !0;
        }
      }
    }
    return C[E][1]._spread = we, B;
  }
  function l(C, E) {
    return B;
    function B(j) {
      a.call(this, C(j), j), E && E.call(this, j);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(C, E, B) {
    this.stack[this.stack.length - 1].children.push(C), this.stack.push(C), this.tokenStack.push([E, B || void 0]), C.position = {
      start: pt(E.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(C) {
    return E;
    function E(B) {
      C && C.call(this, B), u.call(this, B);
    }
  }
  function u(C, E) {
    const B = this.stack.pop(), j = this.tokenStack.pop();
    if (j)
      j[0].type !== C.type && (E ? E.call(this, C, j[0]) : (j[1] || Hr).call(this, C, j[0]));
    else throw new Error("Cannot close `" + C.type + "` (" + Ht({
      start: C.start,
      end: C.end
    }) + "): it’s not open");
    B.position.end = pt(C.end);
  }
  function c() {
    return Ao(this.stack.pop());
  }
  function h() {
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
  function M(C) {
    const E = this.resume(), B = this.stack[this.stack.length - 1];
    B.label = E, B.identifier = Lt(this.sliceSerialize(C)).toLowerCase();
  }
  function I() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = C;
  }
  function F() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = C;
  }
  function X(C) {
    const E = this.stack[this.stack.length - 1];
    if (!E.depth) {
      const B = this.sliceSerialize(C).length;
      E.depth = B;
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function G(C) {
    const E = this.stack[this.stack.length - 1];
    E.depth = this.sliceSerialize(C).codePointAt(0) === 61 ? 1 : 2;
  }
  function le() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function Z(C) {
    const B = this.stack[this.stack.length - 1].children;
    let j = B[B.length - 1];
    (!j || j.type !== "text") && (j = dt(), j.position = {
      start: pt(C.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, B.push(j)), this.stack.push(j);
  }
  function K(C) {
    const E = this.stack.pop();
    E.value += this.sliceSerialize(C), E.position.end = pt(C.end);
  }
  function v(C) {
    const E = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const B = E.children[E.children.length - 1];
      B.position.end = pt(C.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(E.type) && (Z.call(this, C), K.call(this, C));
  }
  function N() {
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
  function ae() {
    const C = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      C.type += "Reference", C.referenceType = E, delete C.url, delete C.title;
    } else
      delete C.identifier, delete C.label;
    this.data.referenceType = void 0;
  }
  function me(C) {
    const E = this.sliceSerialize(C), B = this.stack[this.stack.length - 2];
    B.label = Ts(E), B.identifier = Lt(E).toLowerCase();
  }
  function Ie() {
    const C = this.stack[this.stack.length - 1], E = this.resume(), B = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, B.type === "link") {
      const j = C.children;
      B.children = j;
    } else
      B.alt = E;
  }
  function m() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = C;
  }
  function q() {
    const C = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = C;
  }
  function ue() {
    this.data.inReference = void 0;
  }
  function d() {
    this.data.referenceType = "collapsed";
  }
  function ce(C) {
    const E = this.resume(), B = this.stack[this.stack.length - 1];
    B.label = E, B.identifier = Lt(this.sliceSerialize(C)).toLowerCase(), this.data.referenceType = "full";
  }
  function V(C) {
    this.data.characterReferenceType = C.type;
  }
  function oe(C) {
    const E = this.sliceSerialize(C), B = this.data.characterReferenceType;
    let j;
    B ? (j = Ri(E, B === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : j = er(E);
    const Y = this.stack[this.stack.length - 1];
    Y.value += j;
  }
  function je(C) {
    const E = this.stack.pop();
    E.position.end = pt(C.end);
  }
  function Ce(C) {
    K.call(this, C);
    const E = this.stack[this.stack.length - 1];
    E.url = this.sliceSerialize(C);
  }
  function We(C) {
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
  function ve() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function ft() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Ve() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Qe() {
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
  function et() {
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
  function Ge() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function nt() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function rt(C) {
    return {
      type: "list",
      ordered: C.type === "listOrdered",
      start: null,
      spread: C._spread,
      children: []
    };
  }
  function bt(C) {
    return {
      type: "listItem",
      spread: C._spread,
      checked: null,
      children: []
    };
  }
  function it() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function _t() {
    return {
      type: "strong",
      children: []
    };
  }
  function dt() {
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
function pt(e) {
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
    Array.isArray(r) ? Vi(e, r) : Ls(e, r);
  }
}
function Ls(e, t) {
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
  throw e ? new Error("Cannot close `" + e.type + "` (" + Ht({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Ht({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Ht({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function Ns(e) {
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
function Ms(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Rs(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function Ds(e, t) {
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
function Os(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Ps(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function zs(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Mt(r.toLowerCase()), l = e.footnoteOrder.indexOf(r);
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
function Fs(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Bs(e, t) {
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
function Us(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return $i(e, t);
  const i = { src: Mt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, l), e.applyData(t, l);
}
function Hs(e, t) {
  const n = { src: Mt(t.url) };
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
    return $i(e, t);
  const i = { href: Mt(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, l), e.applyData(t, l);
}
function Vs(e, t) {
  const n = { href: Mt(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function $s(e, t, n) {
  const r = e.all(t), i = n ? Zs(n) : Zi(t), l = {}, o = [];
  if (typeof t.checked == "boolean") {
    const c = r[0];
    let h;
    c && c.type === "element" && c.tagName === "p" ? h = c : (h = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(h)), h.children.length > 0 && h.children.unshift({ type: "text", value: " " }), h.children.unshift({
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
function Zs(e) {
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
function qs(e, t) {
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
function Gs(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Ys(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Xs(e, t) {
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
function Js(e, t, n) {
  const r = n ? n.children : void 0, l = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, a = o ? o.length : t.children.length;
  let s = -1;
  const u = [];
  for (; ++s < a; ) {
    const h = t.children[s], y = {}, p = o ? o[s] : void 0;
    p && (y.align = p);
    let w = { type: "element", tagName: l, properties: y, children: [] };
    h && (w.children = e.all(h), e.patch(h, w), w = e.applyData(h, w)), u.push(w);
  }
  const c = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(t, c), e.applyData(t, c);
}
function Qs(e, t) {
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
function eu(e) {
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
function tu(e, t) {
  const n = { type: "text", value: eu(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function nu(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const ru = {
  blockquote: Ms,
  break: Rs,
  code: Ds,
  delete: Os,
  emphasis: Ps,
  footnoteReference: zs,
  heading: Fs,
  html: Bs,
  imageReference: Us,
  image: Hs,
  inlineCode: js,
  linkReference: Ws,
  link: Vs,
  listItem: $s,
  list: qs,
  paragraph: Gs,
  // @ts-expect-error: root is different, but hard to type.
  root: Ys,
  strong: Xs,
  table: Ks,
  tableCell: Qs,
  tableRow: Js,
  text: tu,
  thematicBreak: nu,
  toml: Gt,
  yaml: Gt,
  definition: Gt,
  footnoteDefinition: Gt
};
function Gt() {
}
const qi = -1, cn = 0, Wt = 1, ln = 2, rr = 3, ir = 4, lr = 5, or = 6, Gi = 7, Yi = 8, $r = typeof self == "object" ? self : globalThis, iu = (e, t) => {
  const n = (i, l) => (e.set(l, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [l, o] = t[i];
    switch (l) {
      case cn:
      case qi:
        return n(o, i);
      case Wt: {
        const a = n([], i);
        for (const s of o)
          a.push(r(s));
        return a;
      }
      case ln: {
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
      case Gi: {
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
}, Zr = (e) => iu(/* @__PURE__ */ new Map(), e)(0), It = "", { toString: lu } = {}, { keys: ou } = Object, Ot = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [cn, t];
  const n = lu.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [Wt, It];
    case "Object":
      return [ln, It];
    case "Date":
      return [rr, It];
    case "RegExp":
      return [ir, It];
    case "Map":
      return [lr, It];
    case "Set":
      return [or, It];
    case "DataView":
      return [Wt, n];
  }
  return n.includes("Array") ? [Wt, n] : n.includes("Error") ? [Gi, n] : [ln, n];
}, Yt = ([e, t]) => e === cn && (t === "function" || t === "symbol"), au = (e, t, n, r) => {
  const i = (o, a) => {
    const s = r.push(o) - 1;
    return n.set(a, s), s;
  }, l = (o) => {
    if (n.has(o))
      return n.get(o);
    let [a, s] = Ot(o);
    switch (a) {
      case cn: {
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
            return i([qi], o);
        }
        return i([a, c], o);
      }
      case Wt: {
        if (s) {
          let y = o;
          return s === "DataView" ? y = new Uint8Array(o.buffer) : s === "ArrayBuffer" && (y = new Uint8Array(o)), i([s, [...y]], o);
        }
        const c = [], h = i([a, c], o);
        for (const y of o)
          c.push(l(y));
        return h;
      }
      case ln: {
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
        const c = [], h = i([a, c], o);
        for (const y of ou(o))
          (e || !Yt(Ot(o[y]))) && c.push([l(y), l(o[y])]);
        return h;
      }
      case rr:
        return i([a, o.toISOString()], o);
      case ir: {
        const { source: c, flags: h } = o;
        return i([a, { source: c, flags: h }], o);
      }
      case lr: {
        const c = [], h = i([a, c], o);
        for (const [y, p] of o)
          (e || !(Yt(Ot(y)) || Yt(Ot(p)))) && c.push([l(y), l(p)]);
        return h;
      }
      case or: {
        const c = [], h = i([a, c], o);
        for (const y of o)
          (e || !Yt(Ot(y))) && c.push(l(y));
        return h;
      }
    }
    const { message: u } = o;
    return i([a, { name: s, message: u }], o);
  };
  return l;
}, qr = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return au(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, on = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Zr(qr(e, t)) : structuredClone(e)
) : (e, t) => Zr(qr(e, t));
function su(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function uu(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function cu(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || su, r = e.options.footnoteBackLabel || uu, i = e.options.footnoteLabel || "Footnotes", l = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!u)
      continue;
    const c = e.all(u), h = String(u.identifier).toUpperCase(), y = Mt(h.toLowerCase());
    let p = 0;
    const w = [], k = e.footnoteCounts.get(h);
    for (; k !== void 0 && ++p <= k; ) {
      w.length > 0 && w.push({ type: "text", value: " " });
      let M = typeof n == "string" ? n : n(s, p);
      typeof M == "string" && (M = { type: "text", value: M }), w.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + y + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(M) ? M : [M]
      });
    }
    const A = c[c.length - 1];
    if (A && A.type === "element" && A.tagName === "p") {
      const M = A.children[A.children.length - 1];
      M && M.type === "text" ? M.value += " " : A.children.push({ type: "text", value: " " }), A.children.push(...w);
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
            ...on(o),
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
      return du;
    if (typeof e == "function")
      return pn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? pu(e) : hu(e);
    if (typeof e == "string")
      return fu(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function pu(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Xi(e[n]);
  return pn(r);
  function r(...i) {
    let l = -1;
    for (; ++l < t.length; )
      if (t[l].apply(this, i)) return !0;
    return !1;
  }
}
function hu(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return pn(n);
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
function fu(e) {
  return pn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function pn(e) {
  return t;
  function t(n, r, i) {
    return !!(mu(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function du() {
  return !0;
}
function mu(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Ki = [], gu = !0, Gr = !1, yu = "skip";
function Cu(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const l = Xi(i), o = r ? -1 : 1;
  a(e, void 0, [])();
  function a(s, u, c) {
    const h = (
      /** @type {Record<string, unknown>} */
      s && typeof s == "object" ? s : {}
    );
    if (typeof h.type == "string") {
      const p = (
        // `hast`
        typeof h.tagName == "string" ? h.tagName : (
          // `xast`
          typeof h.name == "string" ? h.name : void 0
        )
      );
      Object.defineProperty(y, "name", {
        value: "node (" + (s.type + (p ? "<" + p + ">" : "")) + ")"
      });
    }
    return y;
    function y() {
      let p = Ki, w, k, A;
      if ((!t || l(s, u, c[c.length - 1] || void 0)) && (p = wu(n(s, c)), p[0] === Gr))
        return p;
      if ("children" in s && s.children) {
        const b = (
          /** @type {UnistParent} */
          s
        );
        if (b.children && p[0] !== yu)
          for (k = (r ? b.children.length : -1) + o, A = c.concat(b); k > -1 && k < b.children.length; ) {
            const M = b.children[k];
            if (w = a(M, k, A)(), w[0] === Gr)
              return w;
            k = typeof w[1] == "number" ? w[1] : k + o;
          }
      }
      return p;
    }
  }
}
function wu(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [gu, e] : e == null ? Ki : [e];
}
function Ji(e, t, n, r) {
  let i, l, o;
  typeof t == "function" && typeof n != "function" ? (l = void 0, o = t, i = n) : (l = t, o = n, i = r), Cu(e, l, a, i);
  function a(s, u) {
    const c = u[u.length - 1], h = c ? c.children.indexOf(s) : void 0;
    return o(s, h, c);
  }
}
const Un = {}.hasOwnProperty, xu = {};
function ku(e, t) {
  const n = t || xu, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), o = { ...ru, ...n.handlers }, a = {
    all: u,
    applyData: _u,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: l,
    footnoteOrder: [],
    handlers: o,
    one: s,
    options: n,
    patch: bu,
    wrap: Eu
  };
  return Ji(e, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const h = c.type === "definition" ? r : i, y = String(c.identifier).toUpperCase();
      h.has(y) || h.set(y, c);
    }
  }), a;
  function s(c, h) {
    const y = c.type, p = a.handlers[y];
    if (Un.call(a.handlers, y) && p)
      return p(a, c, h);
    if (a.options.passThrough && a.options.passThrough.includes(y)) {
      if ("children" in c) {
        const { children: k, ...A } = c, b = on(A);
        return b.children = a.all(c), b;
      }
      return on(c);
    }
    return (a.options.unknownHandler || Su)(a, c, h);
  }
  function u(c) {
    const h = [];
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
          Array.isArray(w) ? h.push(...w) : h.push(w);
        }
      }
    }
    return h;
  }
}
function bu(e, t) {
  e.position && (t.position = io(e));
}
function _u(e, t) {
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
    n.type === "element" && l && Object.assign(n.properties, on(l)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function Su(e, t) {
  const n = t.data || {}, r = "value" in t && !(Un.call(n, "hProperties") || Un.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Eu(e, t) {
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
  const n = ku(e, t), r = n.one(e, void 0), i = cu(n), l = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && l.children.push({ type: "text", value: `
` }, i), l;
}
function Tu(e, t) {
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
var en = Object.prototype.hasOwnProperty, Qi = Object.prototype.toString, Jr = Object.defineProperty, Qr = Object.getOwnPropertyDescriptor, ei = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : Qi.call(t) === "[object Array]";
}, ti = function(t) {
  if (!t || Qi.call(t) !== "[object Object]")
    return !1;
  var n = en.call(t, "constructor"), r = t.constructor && t.constructor.prototype && en.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || en.call(t, i);
}, ni = function(t, n) {
  Jr && n.name === "__proto__" ? Jr(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, ri = function(t, n) {
  if (n === "__proto__")
    if (en.call(t, n)) {
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
const Cn = /* @__PURE__ */ Ei(Au);
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
      let h = -1;
      if (s) {
        o(s);
        return;
      }
      for (; ++h < i.length; )
        (u[h] === null || u[h] === void 0) && (u[h] = i[h]);
      i = u, c ? vu(c, a)(...u) : o(null, ...u);
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
function vu(e, t) {
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
const Xe = { basename: Lu, dirname: Nu, extname: Mu, join: Ru, sep: "/" };
function Lu(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  Zt(e);
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
function Nu(e) {
  if (Zt(e), e.length === 0)
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
function Mu(e) {
  Zt(e);
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
function Ru(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    Zt(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : Du(n);
}
function Du(e) {
  Zt(e);
  const t = e.codePointAt(0) === 47;
  let n = Ou(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function Ou(e, t) {
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
function Zt(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const Pu = { cwd: zu };
function zu() {
  return "/";
}
function jn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Fu(e) {
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
  return Bu(e);
}
function Bu(e) {
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
    t ? jn(t) ? n = { path: t } : typeof t == "string" || Uu(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : Pu.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
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
    return typeof this.path == "string" ? Xe.basename(this.path) : void 0;
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
    kn(t, "basename"), xn(t, "basename"), this.path = Xe.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Xe.dirname(this.path) : void 0;
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
    ii(this.basename, "dirname"), this.path = Xe.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Xe.extname(this.path) : void 0;
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
    this.path = Xe.join(this.dirname, this.stem + (t || ""));
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
    jn(t) && (t = Fu(t)), kn(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Xe.basename(this.path, this.extname) : void 0;
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
    kn(t, "stem"), xn(t, "stem"), this.path = Xe.join(this.dirname || "", t + (this.extname || ""));
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
    const i = new Se(
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
  if (e && e.includes(Xe.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + Xe.sep + "`"
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
function Uu(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Hu = (
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
class ar extends Hu {
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
    const n = Xt(t), r = this.parser || this.Parser;
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
      const a = Xt(t), s = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(s, a, function(c, h, y) {
        if (c || !h || !y)
          return u(c);
        const p = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          h
        ), w = r.stringify(p, y);
        $u(w) ? y.value = w : y.result = w, u(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          y
        );
      });
      function u(c, h) {
        c || !h ? o(c) : l ? l(h) : n(void 0, h);
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
      const s = Xt(n);
      i.run(t, s, u);
      function u(c, h, y) {
        const p = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          h || t
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
    const r = Xt(n), i = this.compiler || this.Compiler;
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
          const [c, ...h] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          s(c, h);
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
          const h = u[c];
          l(h);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function s(u, c) {
      let h = -1, y = -1;
      for (; ++h < r.length; )
        if (r[h][0] === u) {
          y = h;
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
function Xt(e) {
  return Vu(e) ? e : new el(e);
}
function Vu(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function $u(e) {
  return typeof e == "string" || Zu(e);
}
function Zu(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const qu = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", ai = [], si = { allowDangerousHtml: !0 }, Gu = /^(https?|ircs?|mailto|xmpp)$/i, Yu = [
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
function an(e) {
  const t = Xu(e), n = Ku(e);
  return Ju(t.runSync(t.parse(n), n), e);
}
function Xu(e) {
  const t = e.rehypePlugins || ai, n = e.remarkPlugins || ai, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...si } : si;
  return Wu().use(Ns).use(n).use(Tu, r).use(t);
}
function Ku(e) {
  const t = e.children || "", n = new el();
  return typeof t == "string" && (n.value = t), n;
}
function Ju(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, l = t.disallowedElements, o = t.skipHtml, a = t.unwrapDisallowed, s = t.urlTransform || Qu;
  for (const c of Yu)
    Object.hasOwn(t, c.from) && ("" + c.from + (c.to ? "use `" + c.to + "` instead" : "remove it") + qu + c.id, void 0);
  return Ji(e, u), uo(e, {
    Fragment: Nn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: f,
    jsxs: P,
    passKeys: !0,
    passNode: !0
  });
  function u(c, h, y) {
    if (c.type === "raw" && y && typeof h == "number")
      return o ? y.children.splice(h, 1) : y.children[h] = { type: "text", value: c.value }, h;
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
      if (!p && r && typeof h == "number" && (p = !r(c, h, y)), p && y && typeof h == "number")
        return a && c.children ? y.children.splice(h, 1, ...c.children) : y.children.splice(h, 1), h;
    }
  }
}
function Qu(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    Gu.test(e.slice(0, t)) ? e : ""
  );
}
const qe = (...e) => e.filter(Boolean).join(" "), ec = () => /* @__PURE__ */ P(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ P("g", { filter: "url(#filter0_dd_121_23927)", children: [
        /* @__PURE__ */ f(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ f("g", { clipPath: "url(#clip0_121_23927)", children: /* @__PURE__ */ f(
          "path",
          {
            d: "M16.3333 26.3541L18.2133 28.2341L25.6666 20.7941V37.0208H28.3333V20.7941L35.7733 28.2474L37.6666 26.3541L26.9999 15.6874L16.3333 26.3541Z",
            fill: "white"
          }
        ) })
      ] }),
      /* @__PURE__ */ P("defs", { children: [
        /* @__PURE__ */ P(
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
              /* @__PURE__ */ f("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
              /* @__PURE__ */ f(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ f("feOffset", { dy: "1" }),
              /* @__PURE__ */ f("feGaussianBlur", { stdDeviation: "1" }),
              /* @__PURE__ */ f("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ f(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                }
              ),
              /* @__PURE__ */ f(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ f(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ f("feOffset", { dy: "1" }),
              /* @__PURE__ */ f("feGaussianBlur", { stdDeviation: "1.5" }),
              /* @__PURE__ */ f("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ f(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                }
              ),
              /* @__PURE__ */ f(
                "feBlend",
                {
                  mode: "normal",
                  in2: "effect1_dropShadow_121_23927",
                  result: "effect2_dropShadow_121_23927"
                }
              ),
              /* @__PURE__ */ f(
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
        /* @__PURE__ */ f("clipPath", { id: "clip0_121_23927", children: /* @__PURE__ */ f(
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
), tc = ({ className: e, ...t }) => /* @__PURE__ */ f("form", { className: qe("chat-wrapper__prompt-input", e), ...t }), tl = fl(
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
          const h = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          c.dispatchEvent(h);
        }
      }
      l == null || l(u);
    };
    return /* @__PURE__ */ f(
      "textarea",
      {
        ref: a,
        className: qe("chat-wrapper__prompt-textarea", t),
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
const nc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ f("div", { className: qe("chat-wrapper__prompt-toolbar", e), ...t }), rc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ f("div", { className: qe("chat-wrapper__prompt-tools", e), ...t }), ic = ({
  variant: e = "ghost",
  size: t = "default",
  className: n,
  children: r,
  ...i
}) => {
  const l = t === "default" && (typeof r == "string" || hl.Children.count(r) === 1) ? "icon" : t;
  return /* @__PURE__ */ f(
    "button",
    {
      className: qe(
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
}, lc = ({
  className: e,
  variant: t = "default",
  size: n = "icon",
  status: r = "idle",
  children: i,
  disabled: l,
  ...o
}) => {
  let a = /* @__PURE__ */ f(ec, {});
  const s = l || r === "submitted" || r === "streaming";
  return /* @__PURE__ */ f(
    "button",
    {
      className: qe(
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
}, $c = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ f("select", { className: qe("chat-wrapper__prompt-select", e), ...n, children: t }), Zc = ({
  className: e,
  children: t,
  ...n
}) => /* @__PURE__ */ f(
  "button",
  {
    className: qe("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...n,
    children: t
  }
), qc = ({
  className: e,
  ...t
}) => /* @__PURE__ */ f(
  "div",
  {
    className: qe("chat-wrapper__prompt-select-content", e),
    ...t
  }
), Gc = ({
  className: e,
  value: t,
  ...n
}) => /* @__PURE__ */ f(
  "div",
  {
    className: qe("chat-wrapper__prompt-select-item", e),
    "data-value": t,
    ...n
  }
), Yc = ({
  className: e,
  placeholder: t,
  ...n
}) => /* @__PURE__ */ f(
  "span",
  {
    className: qe("chat-wrapper__prompt-select-value", e),
    ...n,
    children: t
  }
);
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: nl,
  setPrototypeOf: ui,
  isFrozen: oc,
  getPrototypeOf: ac,
  getOwnPropertyDescriptor: sc
} = Object;
let {
  freeze: Te,
  seal: He,
  create: Wn
} = Object, {
  apply: Vn,
  construct: $n
} = typeof Reflect < "u" && Reflect;
Te || (Te = function(t) {
  return t;
});
He || (He = function(t) {
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
const Kt = Ae(Array.prototype.forEach), uc = Ae(Array.prototype.lastIndexOf), ci = Ae(Array.prototype.pop), Pt = Ae(Array.prototype.push), cc = Ae(Array.prototype.splice), tn = Ae(String.prototype.toLowerCase), En = Ae(String.prototype.toString), Tn = Ae(String.prototype.match), zt = Ae(String.prototype.replace), pc = Ae(String.prototype.indexOf), hc = Ae(String.prototype.trim), Ze = Ae(Object.prototype.hasOwnProperty), Ee = Ae(RegExp.prototype.test), Ft = fc(TypeError);
function Ae(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Vn(e, t, r);
  };
}
function fc(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return $n(e, n);
  };
}
function $(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : tn;
  ui && ui(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const l = n(i);
      l !== i && (oc(t) || (t[r] = l), i = l);
    }
    e[i] = !0;
  }
  return e;
}
function dc(e) {
  for (let t = 0; t < e.length; t++)
    Ze(e, t) || (e[t] = null);
  return e;
}
function st(e) {
  const t = Wn(null);
  for (const [n, r] of nl(e))
    Ze(e, n) && (Array.isArray(r) ? t[n] = dc(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = st(r) : t[n] = r);
  return t;
}
function Bt(e, t) {
  for (; e !== null; ) {
    const r = sc(e, t);
    if (r) {
      if (r.get)
        return Ae(r.get);
      if (typeof r.value == "function")
        return Ae(r.value);
    }
    e = ac(e);
  }
  function n() {
    return null;
  }
  return n;
}
const pi = Te(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), An = Te(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), In = Te(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), mc = Te(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), vn = Te(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), gc = Te(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), hi = Te(["#text"]), fi = Te(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Ln = Te(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), di = Te(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Jt = Te(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), yc = He(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Cc = He(/<%[\w\W]*|[\w\W]*%>/gm), wc = He(/\$\{[\w\W]*/gm), xc = He(/^data-[\-\w.\u00B7-\uFFFF]+$/), kc = He(/^aria-[\-\w]+$/), rl = He(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), bc = He(/^(?:\w+script|data):/i), _c = He(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), il = He(/^html$/i), Sc = He(/^[a-z][.\w]*(-[.\w]+)+$/i);
var mi = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: kc,
  ATTR_WHITESPACE: _c,
  CUSTOM_ELEMENT: Sc,
  DATA_ATTR: xc,
  DOCTYPE_NAME: il,
  ERB_EXPR: Cc,
  IS_ALLOWED_URI: rl,
  IS_SCRIPT_OR_DATA: bc,
  MUSTACHE_EXPR: yc,
  TMPLIT_EXPR: wc
});
const Ut = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Ec = function() {
  return typeof window > "u" ? null : window;
}, Tc = function(t, n) {
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
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ec();
  const t = (D) => ll(D);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== Ut.document || !e.Element)
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
    HTMLFormElement: h,
    DOMParser: y,
    trustedTypes: p
  } = e, w = s.prototype, k = Bt(w, "cloneNode"), A = Bt(w, "remove"), b = Bt(w, "nextSibling"), M = Bt(w, "childNodes"), I = Bt(w, "parentNode");
  if (typeof o == "function") {
    const D = n.createElement("template");
    D.content && D.content.ownerDocument && (n = D.content.ownerDocument);
  }
  let F, X = "";
  const {
    implementation: x,
    createNodeIterator: G,
    createDocumentFragment: le,
    getElementsByTagName: Z
  } = n, {
    importNode: K
  } = r;
  let v = gi();
  t.isSupported = typeof nl == "function" && typeof I == "function" && x && x.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: N,
    ERB_EXPR: ee,
    TMPLIT_EXPR: J,
    DATA_ATTR: W,
    ARIA_ATTR: de,
    IS_SCRIPT_OR_DATA: ae,
    ATTR_WHITESPACE: me,
    CUSTOM_ELEMENT: Ie
  } = mi;
  let {
    IS_ALLOWED_URI: m
  } = mi, q = null;
  const ue = $({}, [...pi, ...An, ...In, ...vn, ...hi]);
  let d = null;
  const ce = $({}, [...fi, ...Ln, ...di, ...Jt]);
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
  })), oe = null, je = null;
  const Ce = Object.seal(Wn(null, {
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
  let We = !0, be = !0, ve = !1, ft = !0, Ve = !1, Qe = !0, Oe = !1, et = !1, tt = !1, Ge = !1, nt = !1, rt = !1, bt = !0, it = !1;
  const _t = "user-content-";
  let dt = !0, ut = !1, C = {}, E = null;
  const B = $({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let j = null;
  const Y = $({}, ["audio", "video", "img", "source", "image", "track"]);
  let we = null;
  const Be = $({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), xe = "http://www.w3.org/1998/Math/MathML", T = "http://www.w3.org/2000/svg", R = "http://www.w3.org/1999/xhtml";
  let z = R, O = !1, te = null;
  const Pe = $({}, [xe, T, R], En);
  let $e = $({}, ["mi", "mo", "mn", "ms", "mtext"]), ct = $({}, ["annotation-xml"]);
  const St = $({}, ["title", "style", "font", "a", "script"]);
  let mt = null;
  const Et = ["application/xhtml+xml", "text/html"], gt = "text/html";
  let ne = null, Le = null;
  const Tt = n.createElement("form"), lt = function(g) {
    return g instanceof RegExp || g instanceof Function;
  }, Rt = function() {
    let g = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Le && Le === g)) {
      if ((!g || typeof g != "object") && (g = {}), g = st(g), mt = // eslint-disable-next-line unicorn/prefer-includes
      Et.indexOf(g.PARSER_MEDIA_TYPE) === -1 ? gt : g.PARSER_MEDIA_TYPE, ne = mt === "application/xhtml+xml" ? En : tn, q = Ze(g, "ALLOWED_TAGS") ? $({}, g.ALLOWED_TAGS, ne) : ue, d = Ze(g, "ALLOWED_ATTR") ? $({}, g.ALLOWED_ATTR, ne) : ce, te = Ze(g, "ALLOWED_NAMESPACES") ? $({}, g.ALLOWED_NAMESPACES, En) : Pe, we = Ze(g, "ADD_URI_SAFE_ATTR") ? $(st(Be), g.ADD_URI_SAFE_ATTR, ne) : Be, j = Ze(g, "ADD_DATA_URI_TAGS") ? $(st(Y), g.ADD_DATA_URI_TAGS, ne) : Y, E = Ze(g, "FORBID_CONTENTS") ? $({}, g.FORBID_CONTENTS, ne) : B, oe = Ze(g, "FORBID_TAGS") ? $({}, g.FORBID_TAGS, ne) : st({}), je = Ze(g, "FORBID_ATTR") ? $({}, g.FORBID_ATTR, ne) : st({}), C = Ze(g, "USE_PROFILES") ? g.USE_PROFILES : !1, We = g.ALLOW_ARIA_ATTR !== !1, be = g.ALLOW_DATA_ATTR !== !1, ve = g.ALLOW_UNKNOWN_PROTOCOLS || !1, ft = g.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ve = g.SAFE_FOR_TEMPLATES || !1, Qe = g.SAFE_FOR_XML !== !1, Oe = g.WHOLE_DOCUMENT || !1, Ge = g.RETURN_DOM || !1, nt = g.RETURN_DOM_FRAGMENT || !1, rt = g.RETURN_TRUSTED_TYPE || !1, tt = g.FORCE_BODY || !1, bt = g.SANITIZE_DOM !== !1, it = g.SANITIZE_NAMED_PROPS || !1, dt = g.KEEP_CONTENT !== !1, ut = g.IN_PLACE || !1, m = g.ALLOWED_URI_REGEXP || rl, z = g.NAMESPACE || R, $e = g.MATHML_TEXT_INTEGRATION_POINTS || $e, ct = g.HTML_INTEGRATION_POINTS || ct, V = g.CUSTOM_ELEMENT_HANDLING || {}, g.CUSTOM_ELEMENT_HANDLING && lt(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (V.tagNameCheck = g.CUSTOM_ELEMENT_HANDLING.tagNameCheck), g.CUSTOM_ELEMENT_HANDLING && lt(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (V.attributeNameCheck = g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), g.CUSTOM_ELEMENT_HANDLING && typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (V.allowCustomizedBuiltInElements = g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Ve && (be = !1), nt && (Ge = !0), C && (q = $({}, hi), d = [], C.html === !0 && ($(q, pi), $(d, fi)), C.svg === !0 && ($(q, An), $(d, Ln), $(d, Jt)), C.svgFilters === !0 && ($(q, In), $(d, Ln), $(d, Jt)), C.mathMl === !0 && ($(q, vn), $(d, di), $(d, Jt))), g.ADD_TAGS && (typeof g.ADD_TAGS == "function" ? Ce.tagCheck = g.ADD_TAGS : (q === ue && (q = st(q)), $(q, g.ADD_TAGS, ne))), g.ADD_ATTR && (typeof g.ADD_ATTR == "function" ? Ce.attributeCheck = g.ADD_ATTR : (d === ce && (d = st(d)), $(d, g.ADD_ATTR, ne))), g.ADD_URI_SAFE_ATTR && $(we, g.ADD_URI_SAFE_ATTR, ne), g.FORBID_CONTENTS && (E === B && (E = st(E)), $(E, g.FORBID_CONTENTS, ne)), dt && (q["#text"] = !0), Oe && $(q, ["html", "head", "body"]), q.table && ($(q, ["tbody"]), delete oe.tbody), g.TRUSTED_TYPES_POLICY) {
        if (typeof g.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Ft('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof g.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Ft('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        F = g.TRUSTED_TYPES_POLICY, X = F.createHTML("");
      } else
        F === void 0 && (F = Tc(p, i)), F !== null && typeof X == "string" && (X = F.createHTML(""));
      Te && Te(g), Le = g;
    }
  }, sr = $({}, [...An, ...In, ...mc]), ur = $({}, [...vn, ...gc]), sl = function(g) {
    let S = I(g);
    (!S || !S.tagName) && (S = {
      namespaceURI: z,
      tagName: "template"
    });
    const L = tn(g.tagName), se = tn(S.tagName);
    return te[g.namespaceURI] ? g.namespaceURI === T ? S.namespaceURI === R ? L === "svg" : S.namespaceURI === xe ? L === "svg" && (se === "annotation-xml" || $e[se]) : !!sr[L] : g.namespaceURI === xe ? S.namespaceURI === R ? L === "math" : S.namespaceURI === T ? L === "math" && ct[se] : !!ur[L] : g.namespaceURI === R ? S.namespaceURI === T && !ct[se] || S.namespaceURI === xe && !$e[se] ? !1 : !ur[L] && (St[L] || !sr[L]) : !!(mt === "application/xhtml+xml" && te[g.namespaceURI]) : !1;
  }, Ye = function(g) {
    Pt(t.removed, {
      element: g
    });
    try {
      I(g).removeChild(g);
    } catch {
      A(g);
    }
  }, yt = function(g, S) {
    try {
      Pt(t.removed, {
        attribute: S.getAttributeNode(g),
        from: S
      });
    } catch {
      Pt(t.removed, {
        attribute: null,
        from: S
      });
    }
    if (S.removeAttribute(g), g === "is")
      if (Ge || nt)
        try {
          Ye(S);
        } catch {
        }
      else
        try {
          S.setAttribute(g, "");
        } catch {
        }
  }, cr = function(g) {
    let S = null, L = null;
    if (tt)
      g = "<remove></remove>" + g;
    else {
      const ge = Tn(g, /^[\r\n\t ]+/);
      L = ge && ge[0];
    }
    mt === "application/xhtml+xml" && z === R && (g = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + g + "</body></html>");
    const se = F ? F.createHTML(g) : g;
    if (z === R)
      try {
        S = new y().parseFromString(se, mt);
      } catch {
      }
    if (!S || !S.documentElement) {
      S = x.createDocument(z, "template", null);
      try {
        S.documentElement.innerHTML = O ? X : se;
      } catch {
      }
    }
    const _e = S.body || S.documentElement;
    return g && L && _e.insertBefore(n.createTextNode(L), _e.childNodes[0] || null), z === R ? Z.call(S, Oe ? "html" : "body")[0] : Oe ? S.documentElement : _e;
  }, pr = function(g) {
    return G.call(
      g.ownerDocument || g,
      g,
      // eslint-disable-next-line no-bitwise
      u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT | u.SHOW_PROCESSING_INSTRUCTION | u.SHOW_CDATA_SECTION,
      null
    );
  }, hn = function(g) {
    return g instanceof h && (typeof g.nodeName != "string" || typeof g.textContent != "string" || typeof g.removeChild != "function" || !(g.attributes instanceof c) || typeof g.removeAttribute != "function" || typeof g.setAttribute != "function" || typeof g.namespaceURI != "string" || typeof g.insertBefore != "function" || typeof g.hasChildNodes != "function");
  }, hr = function(g) {
    return typeof a == "function" && g instanceof a;
  };
  function ot(D, g, S) {
    Kt(D, (L) => {
      L.call(t, g, S, Le);
    });
  }
  const fr = function(g) {
    let S = null;
    if (ot(v.beforeSanitizeElements, g, null), hn(g))
      return Ye(g), !0;
    const L = ne(g.nodeName);
    if (ot(v.uponSanitizeElement, g, {
      tagName: L,
      allowedTags: q
    }), Qe && g.hasChildNodes() && !hr(g.firstElementChild) && Ee(/<[/\w!]/g, g.innerHTML) && Ee(/<[/\w!]/g, g.textContent) || g.nodeType === Ut.progressingInstruction || Qe && g.nodeType === Ut.comment && Ee(/<[/\w]/g, g.data))
      return Ye(g), !0;
    if (!(Ce.tagCheck instanceof Function && Ce.tagCheck(L)) && (!q[L] || oe[L])) {
      if (!oe[L] && mr(L) && (V.tagNameCheck instanceof RegExp && Ee(V.tagNameCheck, L) || V.tagNameCheck instanceof Function && V.tagNameCheck(L)))
        return !1;
      if (dt && !E[L]) {
        const se = I(g) || g.parentNode, _e = M(g) || g.childNodes;
        if (_e && se) {
          const ge = _e.length;
          for (let Ne = ge - 1; Ne >= 0; --Ne) {
            const at = k(_e[Ne], !0);
            at.__removalCount = (g.__removalCount || 0) + 1, se.insertBefore(at, b(g));
          }
        }
      }
      return Ye(g), !0;
    }
    return g instanceof s && !sl(g) || (L === "noscript" || L === "noembed" || L === "noframes") && Ee(/<\/no(script|embed|frames)/i, g.innerHTML) ? (Ye(g), !0) : (Ve && g.nodeType === Ut.text && (S = g.textContent, Kt([N, ee, J], (se) => {
      S = zt(S, se, " ");
    }), g.textContent !== S && (Pt(t.removed, {
      element: g.cloneNode()
    }), g.textContent = S)), ot(v.afterSanitizeElements, g, null), !1);
  }, dr = function(g, S, L) {
    if (bt && (S === "id" || S === "name") && (L in n || L in Tt))
      return !1;
    if (!(be && !je[S] && Ee(W, S))) {
      if (!(We && Ee(de, S))) {
        if (!(Ce.attributeCheck instanceof Function && Ce.attributeCheck(S, g))) {
          if (!d[S] || je[S]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(mr(g) && (V.tagNameCheck instanceof RegExp && Ee(V.tagNameCheck, g) || V.tagNameCheck instanceof Function && V.tagNameCheck(g)) && (V.attributeNameCheck instanceof RegExp && Ee(V.attributeNameCheck, S) || V.attributeNameCheck instanceof Function && V.attributeNameCheck(S, g)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              S === "is" && V.allowCustomizedBuiltInElements && (V.tagNameCheck instanceof RegExp && Ee(V.tagNameCheck, L) || V.tagNameCheck instanceof Function && V.tagNameCheck(L)))
            ) return !1;
          } else if (!we[S]) {
            if (!Ee(m, zt(L, me, ""))) {
              if (!((S === "src" || S === "xlink:href" || S === "href") && g !== "script" && pc(L, "data:") === 0 && j[g])) {
                if (!(ve && !Ee(ae, zt(L, me, "")))) {
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
  }, mr = function(g) {
    return g !== "annotation-xml" && Tn(g, Ie);
  }, gr = function(g) {
    ot(v.beforeSanitizeAttributes, g, null);
    const {
      attributes: S
    } = g;
    if (!S || hn(g))
      return;
    const L = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: d,
      forceKeepAttr: void 0
    };
    let se = S.length;
    for (; se--; ) {
      const _e = S[se], {
        name: ge,
        namespaceURI: Ne,
        value: at
      } = _e, At = ne(ge), fn = at;
      let ke = ge === "value" ? fn : hc(fn);
      if (L.attrName = At, L.attrValue = ke, L.keepAttr = !0, L.forceKeepAttr = void 0, ot(v.uponSanitizeAttribute, g, L), ke = L.attrValue, it && (At === "id" || At === "name") && (yt(ge, g), ke = _t + ke), Qe && Ee(/((--!?|])>)|<\/(style|title|textarea)/i, ke)) {
        yt(ge, g);
        continue;
      }
      if (At === "attributename" && Tn(ke, "href")) {
        yt(ge, g);
        continue;
      }
      if (L.forceKeepAttr)
        continue;
      if (!L.keepAttr) {
        yt(ge, g);
        continue;
      }
      if (!ft && Ee(/\/>/i, ke)) {
        yt(ge, g);
        continue;
      }
      Ve && Kt([N, ee, J], (Cr) => {
        ke = zt(ke, Cr, " ");
      });
      const yr = ne(g.nodeName);
      if (!dr(yr, At, ke)) {
        yt(ge, g);
        continue;
      }
      if (F && typeof p == "object" && typeof p.getAttributeType == "function" && !Ne)
        switch (p.getAttributeType(yr, At)) {
          case "TrustedHTML": {
            ke = F.createHTML(ke);
            break;
          }
          case "TrustedScriptURL": {
            ke = F.createScriptURL(ke);
            break;
          }
        }
      if (ke !== fn)
        try {
          Ne ? g.setAttributeNS(Ne, ge, ke) : g.setAttribute(ge, ke), hn(g) ? Ye(g) : ci(t.removed);
        } catch {
          yt(ge, g);
        }
    }
    ot(v.afterSanitizeAttributes, g, null);
  }, ul = function D(g) {
    let S = null;
    const L = pr(g);
    for (ot(v.beforeSanitizeShadowDOM, g, null); S = L.nextNode(); )
      ot(v.uponSanitizeShadowNode, S, null), fr(S), gr(S), S.content instanceof l && D(S.content);
    ot(v.afterSanitizeShadowDOM, g, null);
  };
  return t.sanitize = function(D) {
    let g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, S = null, L = null, se = null, _e = null;
    if (O = !D, O && (D = "<!-->"), typeof D != "string" && !hr(D))
      if (typeof D.toString == "function") {
        if (D = D.toString(), typeof D != "string")
          throw Ft("dirty is not a string, aborting");
      } else
        throw Ft("toString is not a function");
    if (!t.isSupported)
      return D;
    if (et || Rt(g), t.removed = [], typeof D == "string" && (ut = !1), ut) {
      if (D.nodeName) {
        const at = ne(D.nodeName);
        if (!q[at] || oe[at])
          throw Ft("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (D instanceof a)
      S = cr("<!---->"), L = S.ownerDocument.importNode(D, !0), L.nodeType === Ut.element && L.nodeName === "BODY" || L.nodeName === "HTML" ? S = L : S.appendChild(L);
    else {
      if (!Ge && !Ve && !Oe && // eslint-disable-next-line unicorn/prefer-includes
      D.indexOf("<") === -1)
        return F && rt ? F.createHTML(D) : D;
      if (S = cr(D), !S)
        return Ge ? null : rt ? X : "";
    }
    S && tt && Ye(S.firstChild);
    const ge = pr(ut ? D : S);
    for (; se = ge.nextNode(); )
      fr(se), gr(se), se.content instanceof l && ul(se.content);
    if (ut)
      return D;
    if (Ge) {
      if (nt)
        for (_e = le.call(S.ownerDocument); S.firstChild; )
          _e.appendChild(S.firstChild);
      else
        _e = S;
      return (d.shadowroot || d.shadowrootmode) && (_e = K.call(r, _e, !0)), _e;
    }
    let Ne = Oe ? S.outerHTML : S.innerHTML;
    return Oe && q["!doctype"] && S.ownerDocument && S.ownerDocument.doctype && S.ownerDocument.doctype.name && Ee(il, S.ownerDocument.doctype.name) && (Ne = "<!DOCTYPE " + S.ownerDocument.doctype.name + `>
` + Ne), Ve && Kt([N, ee, J], (at) => {
      Ne = zt(Ne, at, " ");
    }), F && rt ? F.createHTML(Ne) : Ne;
  }, t.setConfig = function() {
    let D = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Rt(D), et = !0;
  }, t.clearConfig = function() {
    Le = null, et = !1;
  }, t.isValidAttribute = function(D, g, S) {
    Le || Rt({});
    const L = ne(D), se = ne(g);
    return dr(L, se, S);
  }, t.addHook = function(D, g) {
    typeof g == "function" && Pt(v[D], g);
  }, t.removeHook = function(D, g) {
    if (g !== void 0) {
      const S = uc(v[D], g);
      return S === -1 ? void 0 : cc(v[D], S, 1)[0];
    }
    return ci(v[D]);
  }, t.removeHooks = function(D) {
    v[D] = [];
  }, t.removeAllHooks = function() {
    v = gi();
  }, t;
}
var Ac = ll();
function Ic(e) {
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
function nn(e, t = !1) {
  return e;
}
function vc(e) {
  return typeof e != "string" ? "" : e.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function yi(e) {
  if (typeof e != "string") return !1;
  try {
    const t = new URL(e);
    return !(!["http:", "https:", "data:"].includes(t.protocol) || Ic(e));
  } catch {
    return !1;
  }
}
function Lc() {
  Ac.addHook("beforeSanitizeAttributes", (e) => {
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
Lc();
const Nc = ({
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
  const [u, c] = he(""), h = fe(
    (w) => {
      w.preventDefault();
      const A = new FormData(w.currentTarget).get("message");
      if (A != null && A.trim()) {
        const b = nn(A.trim(), !1);
        if (!b.trim()) {
          console.warn("Message was blocked due to security concerns");
          return;
        }
        l(b, r), c(""), a();
      }
    },
    [l, r, a]
  ), y = fe((w) => {
    const A = w.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
    c(A);
  }, []), p = fe(() => {
    const w = document.createElement("input");
    w.type = "file", w.accept = "image/*,text/*,.pdf,.doc,.docx", w.multiple = !0, w.onchange = (k) => {
      const A = k.target.files;
      if (A) {
        const b = Array.from(A).filter((M) => {
          const I = vc(M.name);
          return I !== M.name && console.warn(`File name sanitized: ${M.name} -> ${I}`), M.size > 10485760 ? (console.warn(`File too large: ${M.name} (${M.size} bytes)`), !1) : [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "text/plain",
            "text/csv",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ].includes(M.type) ? !0 : (console.warn(`File type not allowed: ${M.name} (${M.type})`), !1);
        });
        b.length > 0 && o(b);
      }
    }, w.click();
  }, [o]);
  return /* @__PURE__ */ P(tc, { onSubmit: h, children: [
    /* @__PURE__ */ f(
      tl,
      {
        name: "message",
        value: u,
        onChange: y,
        placeholder: e,
        disabled: t
      }
    ),
    /* @__PURE__ */ P(nc, { children: [
      /* @__PURE__ */ f(rc, { children: i && /* @__PURE__ */ P(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ P(
              ic,
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
                  /* @__PURE__ */ f(
                    "svg",
                    {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /* @__PURE__ */ f(
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
                  r.length > 0 && /* @__PURE__ */ f(
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
            /* @__PURE__ */ f(
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
      /* @__PURE__ */ f(
        lc,
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
function Mc({ children: e }) {
  return /* @__PURE__ */ f("div", { className: "chat-wrapper__reasoning", children: e });
}
function Rc({
  title: e,
  status: t = "processing"
}) {
  return /* @__PURE__ */ P("div", { className: "chat-wrapper__reasoning-trigger", children: [
    /* @__PURE__ */ f("div", { className: "chat-wrapper__reasoning-icon", children: (() => {
      switch (t) {
        case "completed":
          return /* @__PURE__ */ f("div", { className: "chat-wrapper__reasoning-checkmark", children: /* @__PURE__ */ f(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ f(
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
          return /* @__PURE__ */ f("div", { className: "chat-wrapper__reasoning-error", children: /* @__PURE__ */ f(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ f(
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
          return /* @__PURE__ */ f("div", { className: "chat-wrapper__reasoning-processing", children: /* @__PURE__ */ f(
            "svg",
            {
              width: "10",
              height: "14",
              viewBox: "0 0 10 14",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ f(
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
    /* @__PURE__ */ f("span", { className: "chat-wrapper__reasoning-title", children: e }),
    (e.includes("Thinking") || e.includes("Processing")) && /* @__PURE__ */ f("div", { className: "chat-wrapper__reasoning-arrow", children: /* @__PURE__ */ P(
      "svg",
      {
        width: "16",
        height: "16",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ f(
            "mask",
            {
              id: "mask0_44_18068",
              style: { maskType: "alpha" },
              maskUnits: "userSpaceOnUse",
              x: "0",
              y: "0",
              width: "16",
              height: "17",
              children: /* @__PURE__ */ f("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
            }
          ),
          /* @__PURE__ */ f("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ f(
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
function Dc({ children: e }) {
  return /* @__PURE__ */ f("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__reasoning-text", children: e }) });
}
function Oc({ children: e }) {
  return /* @__PURE__ */ f("div", { className: "chat-wrapper__tooling-handle", children: e });
}
function Pc({
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
    const c = i.find((h) => h.name === r);
    return (c == null ? void 0 : c.description) || null;
  };
  let o;
  if (r != null && r.startsWith("lat_")) {
    const c = (s = n == null ? void 0 : n.parameters) == null ? void 0 : s.query, h = (u = n == null ? void 0 : n.parameters) == null ? void 0 : u.url;
    o = c || h || "Executing tool...";
  } else
    o = l();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ f("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (t) {
      case "processing":
        return /* @__PURE__ */ P("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ f("span", { children: o }),
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ f("span", { children: "Running..." })
        ] });
      case "completed":
        return /* @__PURE__ */ P("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ f("span", { children: o }),
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_64_36345",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36345)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M7.1501 10.7819L11.1168 6.83193L10.2668 5.98193L7.1501 9.08193L5.73343 7.68193L4.88343 8.53193L7.1501 10.7819ZM8.0001 14.7819C7.12232 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.643 2.1001 10.8653C1.76676 10.0875 1.6001 9.25971 1.6001 8.38193C1.6001 7.49304 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73899 2.81527 5.51676 2.48193C6.29454 2.1486 7.12232 1.98193 8.0001 1.98193C8.88899 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11805 13.9001 5.89027C14.2334 6.66249 14.4001 7.49304 14.4001 8.38193C14.4001 9.25971 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.264 13.9486 10.4918 14.2819C9.71954 14.6153 8.88899 14.7819 8.0001 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819Z",
                    fill: "#4EAD13"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ f("span", { children: "Completed" })
        ] });
      case "error":
        return /* @__PURE__ */ P("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ f("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ f(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ f(
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
          /* @__PURE__ */ f("span", { className: "chat-wrapper__tooling-handle-title", children: e })
        ] });
      default:
        return /* @__PURE__ */ P("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ P("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f(
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
                /* @__PURE__ */ f("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ f("span", { children: "Pending..." })
        ] });
    }
  })() });
}
function zc({ size: e = 16, variant: t = "dots" }) {
  return t === "dots" ? /* @__PURE__ */ P("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ f("span", {}),
    /* @__PURE__ */ f("span", {}),
    /* @__PURE__ */ f("span", {})
  ] }) : t === "pulse" ? /* @__PURE__ */ f(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ f(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: e, height: e }
    }
  );
}
class Fc {
  constructor() {
    pe(this, "sessionId", "");
    pe(this, "ws", null);
    pe(this, "isConnected", !1);
    pe(this, "onSetMessage");
    pe(this, "onSystemMessage");
    pe(this, "onBusinessDataUpdate");
    pe(this, "onReasoningUpdate");
    pe(this, "clientTools", {});
    pe(this, "toolSchemas", []);
    pe(this, "businessContext", {});
    pe(this, "reconnectAttempts", 0);
    pe(this, "maxReconnectAttempts", 5);
    pe(this, "reconnectTimer", null);
    pe(this, "reconnectDelay", 1e3);
    // Start with 1 second
    pe(this, "heartbeatInterval", null);
    pe(this, "isReconnecting", !1);
    pe(this, "visibilityChangeHandler");
    pe(this, "initResolve");
    pe(this, "initReject");
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
const ol = Zn(({
  message: e,
  getReasoningTitle: t,
  getReasoningStatus: n,
  getToolingTitle: r,
  getToolingStatus: i,
  clientTools: l,
  currentAssistantMessageIdRef: o
}) => {
  var a;
  return /* @__PURE__ */ f(
    "div",
    {
      className: `chat-wrapper__message chat-wrapper__message--${e.role === "system" ? "assistant" : e.role === "reasoning" ? "reasoning" : e.role === "tooling" ? "tooling" : e.role}`,
      children: e.role === "reasoning" ? (
        /* Reasoning message - no content wrapper */
        /* @__PURE__ */ P(Mc, { isStreaming: e.isStreaming || !1, children: [
          /* @__PURE__ */ f(
            Rc,
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
          /* @__PURE__ */ f(Dc, { children: e.content })
        ] })
      ) : e.role === "tooling" ? (
        /* Tooling message - no content wrapper */
        /* @__PURE__ */ f(Oc, { isStreaming: e.isStreaming || !1, children: /* @__PURE__ */ f(
          Pc,
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
      ) : /* @__PURE__ */ f("div", { className: "chat-wrapper__message-content", children: e.role === "assistant" && e.isStreaming && e.content === "" && e.id === o.current ? (
        /* Show streaming indicator when no content yet */
        /* @__PURE__ */ P("div", { className: "chat-wrapper__streaming-placeholder", children: [
          /* @__PURE__ */ f(zc, { size: 16, variant: "dots" }),
          /* @__PURE__ */ f("span", { children: "Thinking" })
        ] })
      ) : e.role === "system" ? (
        /* System message with collapsible tool result */
        /* @__PURE__ */ f(Bc, { message: e })
      ) : e.role === "assistant" ? (
        /* Assistant message with regular markdown display */
        /* @__PURE__ */ f("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ f(
          an,
          {
            components: {
              pre: ({ children: s }) => /* @__PURE__ */ f("pre", { className: "chat-wrapper__code-block", children: s }),
              code: ({ children: s, className: u }) => !u ? /* @__PURE__ */ f("code", { className: "chat-wrapper__inline-code", children: s }) : /* @__PURE__ */ f("code", { className: "chat-wrapper__code-block", children: s }),
              ul: ({ children: s }) => /* @__PURE__ */ f("ul", { className: "chat-wrapper__list", children: s }),
              ol: ({ children: s }) => /* @__PURE__ */ f("ol", { className: "chat-wrapper__ordered-list", children: s }),
              li: ({ children: s }) => /* @__PURE__ */ f("li", { className: "chat-wrapper__list-item", children: s })
            },
            children: e.content
          }
        ) }) })
      ) : (
        /* User message display with markdown */
        /* @__PURE__ */ P("div", { className: "chat-wrapper__regular-message", children: [
          /* @__PURE__ */ f("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ f(
            an,
            {
              components: {
                pre: ({ children: s }) => /* @__PURE__ */ f("pre", { className: "chat-wrapper__code-block", children: s }),
                code: ({ children: s, className: u }) => !u ? /* @__PURE__ */ f("code", { className: "chat-wrapper__inline-code", children: s }) : /* @__PURE__ */ f("code", { className: "chat-wrapper__code", children: s }),
                p: ({ children: s }) => /* @__PURE__ */ f("p", { className: "chat-wrapper__paragraph", children: s }),
                h1: ({ children: s }) => /* @__PURE__ */ f("h1", { className: "chat-wrapper__heading-1", children: s }),
                h2: ({ children: s }) => /* @__PURE__ */ f("h2", { className: "chat-wrapper__heading-2", children: s }),
                h3: ({ children: s }) => /* @__PURE__ */ f("h3", { className: "chat-wrapper__heading-3", children: s }),
                ul: ({ children: s }) => /* @__PURE__ */ f("ul", { className: "chat-wrapper__list", children: s }),
                ol: ({ children: s }) => /* @__PURE__ */ f("ol", { className: "chat-wrapper__ordered-list", children: s }),
                li: ({ children: s }) => /* @__PURE__ */ f("li", { className: "chat-wrapper__list-item", children: s }),
                blockquote: ({ children: s }) => /* @__PURE__ */ f("blockquote", { className: "chat-wrapper__blockquote", children: s }),
                strong: ({ children: s }) => /* @__PURE__ */ f("strong", { className: "chat-wrapper__bold", children: s }),
                em: ({ children: s }) => /* @__PURE__ */ f("em", { className: "chat-wrapper__italic", children: s })
              },
              children: e.content.trim()
            }
          ) }),
          e.role === "user" && e.media && e.media.length > 0 && /* @__PURE__ */ f("div", { className: "chat-wrapper__media-grid", children: e.media.map((s, u) => /* @__PURE__ */ f(
            "div",
            {
              className: "chat-wrapper__media-item",
              children: /* @__PURE__ */ f(
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
ol.displayName = "MessageComponent";
const al = Zn(({
  content: e,
  messageId: t
}) => !t || !e ? null : /* @__PURE__ */ f("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__message-content", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__regular-message", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ f(
  an,
  {
    components: {
      pre: ({ children: n }) => /* @__PURE__ */ f("pre", { className: "chat-wrapper__code-block", children: n }),
      code: ({ children: n, className: r }) => !r ? /* @__PURE__ */ f("code", { className: "chat-wrapper__inline-code", children: n }) : /* @__PURE__ */ f("code", { className: "chat-wrapper__code-block", children: n }),
      ul: ({ children: n }) => /* @__PURE__ */ f("ul", { className: "chat-wrapper__list", children: n }),
      ol: ({ children: n }) => /* @__PURE__ */ f("ol", { className: "chat-wrapper__ordered-list", children: n }),
      li: ({ children: n }) => /* @__PURE__ */ f("li", { className: "chat-wrapper__list-item", children: n })
    },
    children: e
  }
) }) }) }) }));
al.displayName = "StreamingMessage";
function Bc({ message: e }) {
  const [t, n] = he(!0);
  return console.log("clog message:", e), /* @__PURE__ */ P("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ f(
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
        children: e.role === "system" ? /* @__PURE__ */ P("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_64_36257",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36257)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ P("span", { children: [
            "AI text input <show-toolname>",
            "..."
          ] }),
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f("rect", { y: "0.000488281", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "17",
              viewBox: "0 0 16 17",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_64_36278",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f("rect", { y: "0.381836", width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ f("g", { mask: "url(#mask0_64_36278)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ f("span", { children: "Pending..." })
        ] }) : e.role === "assistant" ? e.isStreaming ? /* @__PURE__ */ P("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ f(
            "svg",
            {
              width: "10",
              height: "14",
              viewBox: "0 0 10 14",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ f(
                "path",
                {
                  d: "M3.79576 11.3819C3.46532 11.3819 3.18343 11.2644 2.9501 11.0294C2.71676 10.7944 2.6001 10.5119 2.6001 10.1819V9.06527C1.96676 8.65082 1.4751 8.11943 1.1251 7.4711C0.775098 6.82277 0.600098 6.12638 0.600098 5.38193C0.600098 4.15627 1.02665 3.11649 1.87976 2.2626C2.73288 1.40882 3.77176 0.981934 4.99643 0.981934C6.2211 0.981934 7.26121 1.40882 8.11676 2.2626C8.97232 3.11649 9.4001 4.15627 9.4001 5.38193C9.4001 6.12438 9.2251 6.8211 8.8751 7.4721C8.5251 8.1231 8.03343 8.65416 7.4001 9.06527V10.1819C7.4001 10.5119 7.28243 10.7944 7.0471 11.0294C6.81188 11.2644 6.52904 11.3819 6.1986 11.3819H3.79576ZM3.8001 10.1819H6.2001V8.41527L6.7501 8.06527C7.20565 7.77638 7.56121 7.39204 7.81676 6.91227C8.07232 6.43249 8.2001 5.92238 8.2001 5.38193C8.2001 4.4966 7.88771 3.74193 7.26293 3.11793C6.63826 2.49393 5.88271 2.18193 4.99626 2.18193C4.10993 2.18193 3.35565 2.49393 2.73343 3.11793C2.11121 3.74193 1.8001 4.4966 1.8001 5.38193C1.8001 5.92238 1.92788 6.43249 2.18343 6.91227C2.43899 7.39204 2.79454 7.77638 3.2501 8.06527L3.8001 8.41527V10.1819ZM3.8001 13.7819C3.57343 13.7819 3.38343 13.7053 3.2301 13.5519C3.07676 13.3986 3.0001 13.2086 3.0001 12.9819V12.5819H7.0001V12.9819C7.0001 13.2086 6.92343 13.3986 6.7701 13.5519C6.61676 13.7053 6.42676 13.7819 6.2001 13.7819H3.8001Z",
                  fill: "#637381"
                }
              )
            }
          ) }),
          /* @__PURE__ */ f("span", { children: "Thinking..." }),
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f(
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
                /* @__PURE__ */ f("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) }) })
        ] }) : /* @__PURE__ */ P("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ f(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ f(
                "path",
                {
                  d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z",
                  fill: "#10b981"
                }
              )
            }
          ) }),
          /* @__PURE__ */ f("span", { children: "Thought" }),
          /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ f(
                  "mask",
                  {
                    id: "mask0_44_18068",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "17",
                    children: /* @__PURE__ */ f(
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
                /* @__PURE__ */ f("g", { mask: "url(#mask0_44_18068)", children: /* @__PURE__ */ f(
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
    t && /* @__PURE__ */ f(
      "div",
      {
        className: "chat-wrapper__system-message-content",
        style: {
          padding: "0 12px 12px 0px"
        },
        children: /* @__PURE__ */ f("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ f(
          an,
          {
            components: {
              pre: ({ children: i }) => /* @__PURE__ */ f("pre", { className: "chat-wrapper__code-block", children: i }),
              code: ({ children: i, className: l }) => !l ? /* @__PURE__ */ f("code", { className: "chat-wrapper__inline-code", children: i }) : /* @__PURE__ */ f("code", { className: "chat-wrapper__code", children: i }),
              p: ({ children: i }) => /* @__PURE__ */ f("p", { className: "chat-wrapper__paragraph", children: i }),
              strong: ({ children: i }) => /* @__PURE__ */ f("strong", { className: "chat-wrapper__bold", children: i }),
              em: ({ children: i }) => /* @__PURE__ */ f("em", { className: "chat-wrapper__italic", children: i })
            },
            children: e.content.trim()
          }
        ) })
      }
    )
  ] });
}
function Uc({
  apiUrl: e,
  config: t,
  tools: n,
  clientTools: r,
  initialMessages: i = []
}) {
  var xe;
  const [l, o] = he(
    null
  ), [a, s] = he(!1), [u, c] = he(""), h = wt(null), [y, p] = he(i), [w, k] = he(!1), [A, b] = he(!1), [M, I] = he("idle"), [F, X] = he(!1), [x, G] = he(t.mode), [le] = he([]), [Z, K] = he([]), [v, N] = he(""), [ee, J] = he(!1), [, W] = he(""), [de, ae] = he(""), [me, Ie] = he(!1), [, m] = he(/* @__PURE__ */ new Map()), q = wt(null), ue = wt(null), d = wt(!0), ce = wt(""), V = fe(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), oe = qt(
    () => (T, R) => R === !1 ? T.includes("❌") ? "error" : "completed" : T.includes("✅ Completed:") || T.includes("✅") ? "completed" : T.includes("❌") ? "error" : "processing",
    []
  ), je = qt(
    () => (T, R) => R === !1 ? T.includes("❌") ? "Error" : "Completed" : T.includes("✅ Completed:") || T.includes("✅") ? "Completed" : T.includes("❌") ? "Error" : (T.includes("🔧 Handling:"), "Thinking..."),
    []
  ), Ce = qt(
    () => (T, R) => R === !1 ? T.includes("❌") ? "Tool Error" : "Tool Completed" : T.includes("✅ Completed:") || T.includes("✅") ? "Tool Completed" : T.includes("❌") ? "Tool Error" : (T.includes("🔧 Handling:"), "Tool Processing..."),
    []
  ), We = qt(
    () => (T, R) => R === !1 ? T.includes("❌") ? "error" : "completed" : T.includes("✅ Completed:") || T.includes("✅") ? "completed" : T.includes("❌") ? "error" : "processing",
    []
  ), be = fe(
    (T, R) => {
      const O = nn(R, T === "assistant");
      p((te) => [
        ...te,
        {
          id: V(),
          role: T,
          content: O,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [V]
  ), ve = fe(() => {
    if (ue.current && ce.current) {
      const T = nn(ce.current, !0), R = {
        id: ue.current,
        role: "assistant",
        content: T,
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !1
      };
      return p((z) => [...z, R]), ue.current = null, ce.current = "", ae(""), !0;
    }
    return !1;
  }, []), ft = fe(
    () => {
      k(!1), J(!1), I("idle"), ve();
    },
    [ve]
  ), Ve = fe(
    (T) => {
      console.error("Chat error:", T), k(!1), J(!1), I("error"), ve(), be("system", `❌ Chat error: ${T}`);
    },
    [be, ve]
  ), Qe = fe(async () => {
    try {
      const T = new Fc();
      h.current = T, o(T), c(T.getSessionId());
      const R = {};
      await T.onInit({
        toolSchemas: r,
        clientTools: n,
        businessContext: R,
        onSetMessage: (z) => {
          const O = nn(z, !0);
          if (ue.current)
            ce.current += O, ae(ce.current);
          else {
            J(!1);
            const te = V();
            ue.current = te, ce.current = O, ae(O);
          }
        },
        onSystemMessage: (z) => {
          if (z.includes("Chat completed"))
            ft();
          else if (z.includes("Chat error")) {
            const O = z.match(/Chat error: (.+)/);
            O && Ve(O[1]);
          }
        },
        onReasoningUpdate: (z, O, te) => {
          console.log("🤔 Reasoning update:", {
            isThinking: z,
            content: O,
            toolCallRequest: te
          });
          const { callId: Pe } = te || {};
          if (Ie(z), W(O), !Pe) {
            console.log("⚠️ No callId provided for reasoning update");
            return;
          }
          const $e = O.includes("🔧 Handling:"), ct = O.includes("✅ Completed:"), St = O.includes("❌ Error:");
          console.log("🔍 Debug reasoning conditions:", {
            isToolStarted: $e,
            isToolCompleted: ct,
            isToolError: St,
            callId: Pe,
            isHandlingTool: me
          }), m((mt) => {
            const Et = new Map(mt), gt = Et.get(Pe);
            if ($e && !gt) {
              ve();
              const ne = O.match(/🔧 Handling: (.+)/), Le = ne ? ne[1] : "Unknown Tool", Tt = V();
              Et.set(Pe, Tt);
              const lt = {
                id: Tt,
                role: "tooling",
                content: O,
                timestamp: /* @__PURE__ */ new Date(),
                isStreaming: !0,
                toolData: {
                  ...te,
                  toolName: Le,
                  callId: Pe,
                  status: "processing"
                }
              };
              p((Rt) => [...Rt, lt]);
            } else if ((ct || St) && gt) {
              const ne = O.match(
                /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
              ), Le = ne ? ne[1] : "Unknown Tool";
              p(
                (Tt) => Tt.map(
                  (lt) => lt.id === gt ? {
                    ...lt,
                    content: O,
                    isStreaming: !1,
                    // Mark as completed
                    toolData: {
                      ...lt.toolData,
                      toolName: Le,
                      status: St ? "error" : "completed",
                      callId: Pe ?? ""
                    }
                  } : lt
                )
              ), Et.delete(Pe);
            } else gt && me && !ct && !St && p(
              (ne) => ne.map(
                (Le) => Le.id === gt ? {
                  ...Le,
                  content: O,
                  isStreaming: !0
                } : Le
              )
            );
            return Et;
          });
        },
        onBusinessDataUpdate: (z) => {
          t.onBusinessDataUpdate && t.onBusinessDataUpdate(z);
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
    ft,
    Ve,
    ve
  ]), Oe = fe(() => {
    h.current && (h.current.disconnect(), h.current = null), o(null), s(!1), c("");
  }, []), et = fe(() => {
    console.log("🔍 DEBUG: resetToolHandling called! Stack trace:"), console.trace(), Ie(!1), d.current = !0;
  }, []), tt = fe(() => {
    var T;
    (T = q.current) == null || T.scrollIntoView({ behavior: "smooth" });
  }, []);
  Ct(() => {
    tt();
  }, [y, tt]), Ct(() => {
    t.onStreamingStatusChange && t.onStreamingStatusChange(v);
  }, [v, t]), Ct(() => {
    console.log("🔍 DEBUG: isHandlingTool state changed:", me);
  }, [me]), Ct(() => {
    console.log(
      "💭 DEBUG: isHandlingReasoning state changed:"
    );
  }, []), Ct(() => (console.log("Connecting BusinessAgentClient..."), Qe(), () => {
    Oe();
  }), [Qe, Oe]), Ct(() => {
    const T = setInterval(() => {
      if (h.current) {
        const R = h.current.getConnectionStatus();
        s(R.connected);
      }
    }, 1e3);
    return () => clearInterval(T);
  }, []);
  const Ge = fe(
    async (T, R) => {
      if (!T.trim() || w || !l || !a)
        return;
      const z = {
        id: V(),
        role: "user",
        content: T.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: R
      };
      p((O) => [...O, z]), k(!0), J(!0), I("submitted"), N("Starting...");
      try {
        await l.onTriggerMessage(z.content), I("streaming");
      } catch (O) {
        console.error("Agent client send error:", O), J(!1), I("error"), be(
          "system",
          `Sorry, there was an error: ${O instanceof Error ? O.message : "Unknown error"}`
        ), t.onError && t.onError(
          O instanceof Error ? O : new Error("Unknown error")
        ), k(!1), I("idle"), N("");
      }
    },
    [w, l, a, V, be, t]
  ), nt = fe(() => {
    k(!1), I("idle"), N(""), J(!1), W(""), ue.current = null, ce.current = "", ae(""), et();
  }, [et]), rt = fe(async (T) => {
    console.log("Files selected:", T);
    const R = [];
    for (const z of T)
      try {
        if (z.type.startsWith("image/")) {
          const O = new FileReader(), te = await new Promise((Pe, $e) => {
            O.onload = () => Pe(O.result), O.onerror = $e, O.readAsDataURL(z);
          });
          R.push(te);
        } else if (z.type.startsWith("text/") || z.name.endsWith(".txt")) {
          const O = new FileReader(), te = await new Promise((Pe, $e) => {
            O.onload = () => Pe(O.result), O.onerror = $e, O.readAsText(z);
          });
          console.log("Text file content:", te);
        } else
          console.log("File type not supported for preview:", z.type), R.push(`data:application/octet-stream;base64,${z.name}`);
      } catch (O) {
        console.error("Error processing file:", O);
      }
    R.length > 0 && (K((z) => [...z, ...R]), console.log("Added media:", R));
  }, []), bt = fe(() => {
    b(!0);
  }, []), it = fe(() => {
    b(!1);
  }, []), _t = fe(() => {
    X((T) => !T);
  }, []), dt = fe(() => {
    G((T) => T === "sidebar" ? "fullscreen" : "sidebar");
  }, []);
  Ct(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const T = (R) => {
      R.key === "Escape" && x === "modal" && A && it();
    };
    if (x === "modal" && A)
      return document.addEventListener("keydown", T), () => document.removeEventListener("keydown", T);
  }, [x, A, it]);
  const C = ((...T) => T.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${x}`,
    t.position && `chat-wrapper--${t.position}`,
    t.theme && `chat-wrapper--${t.theme}`,
    F && "chat-wrapper--collapsed",
    x === "embedded" && t.constrainedHeight && "chat-wrapper--constrained"
  ), E = () => x === "modal" && A ? /* @__PURE__ */ f("div", { className: "chat-wrapper-overlay", onClick: it }) : null, B = () => {
    var R;
    if (x === "modal" && !A || x === "sidebar" && F || x === "fullscreen" && F) {
      const z = x === "modal" ? bt : _t, O = x === "modal" ? `Open ${t.appName}` : `Expand ${t.appName}`;
      return /* @__PURE__ */ P(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: z,
          title: O,
          children: [
            /* @__PURE__ */ P(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: "chat-wrapper__bubble-icon",
                children: [
                  /* @__PURE__ */ f(
                    "path",
                    {
                      d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
                      fill: "currentColor"
                    }
                  ),
                  /* @__PURE__ */ f("circle", { cx: "7", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ f("circle", { cx: "12", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ f("circle", { cx: "17", cy: "10", r: "1", fill: "currentColor" })
                ]
              }
            ),
            ((R = t.features) == null ? void 0 : R.showBubbleText) !== !1 && /* @__PURE__ */ f("span", { className: "chat-wrapper__bubble-text", children: t.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, j = () => x === "modal" && A ? /* @__PURE__ */ f(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: it,
      title: "Close chat",
      children: /* @__PURE__ */ f(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ f(
            "path",
            {
              d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
              fill: "currentColor"
            }
          )
        }
      )
    }
  ) : null, Y = () => {
    if ((x === "sidebar" || x === "fullscreen") && !F) {
      const T = x === "fullscreen";
      return /* @__PURE__ */ f(
        "button",
        {
          className: T ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: dt,
          title: T ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ f(
            "svg",
            {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: T ? (
                // Minimize icon (arrows pointing inward)
                /* @__PURE__ */ f(
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
                /* @__PURE__ */ f(
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
  }, we = () => (x === "sidebar" || x === "fullscreen") && !F ? /* @__PURE__ */ f(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: _t,
      title: "Collapse chat",
      children: /* @__PURE__ */ f(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ f(
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
  ) : null, Be = () => {
    var T;
    return !((T = t.features) != null && T.showToolResults) || le.length === 0 ? null : /* @__PURE__ */ P("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ f("h4", { children: "Tool Results" }),
      /* @__PURE__ */ f("div", { className: "chat-wrapper__tool-results-list", children: le.map((R) => /* @__PURE__ */ P("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ f("div", { className: "chat-wrapper__tool-result-title", children: R.title }),
        R.description && /* @__PURE__ */ f("div", { className: "chat-wrapper__tool-result-description", children: R.description }),
        /* @__PURE__ */ P("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          R.status || "completed"
        ] })
      ] }, R.id)) })
    ] });
  };
  return x === "modal" && !A || (x === "sidebar" || x === "fullscreen") && F ? B() : (console.log("clog messages", y), /* @__PURE__ */ P(Nn, { children: [
    E(),
    /* @__PURE__ */ P("div", { className: C, style: t.customStyles, children: [
      /* @__PURE__ */ P("div", { className: "chat-wrapper__header", children: [
        /* @__PURE__ */ P("div", { className: "chat-wrapper__title-area", children: [
          /* @__PURE__ */ f("h2", { className: "chat-wrapper__title", children: t.appName }),
          /* @__PURE__ */ f("div", { className: "chat-wrapper__connection-status", children: /* @__PURE__ */ f(
            "span",
            {
              className: `chat-wrapper__connection-indicator ${a ? "connected" : "disconnected"}`,
              title: a ? `Connected to WebSocket${u ? ` (Session: ${u.slice(-8)})` : ""}` : "Disconnected from WebSocket",
              children: a ? "🟢" : "🔴"
            }
          ) })
        ] }),
        /* @__PURE__ */ P("div", { className: "chat-wrapper__header-controls", children: [
          Y(),
          we(),
          j()
        ] })
      ] }),
      !F && /* @__PURE__ */ P(Nn, { children: [
        /* @__PURE__ */ P("div", { className: "chat-wrapper__messages", children: [
          y.map((T) => /* @__PURE__ */ f(
            ol,
            {
              message: T,
              getReasoningTitle: je,
              getReasoningStatus: oe,
              getToolingTitle: Ce,
              getToolingStatus: We,
              clientTools: r || [],
              currentAssistantMessageIdRef: ue
            },
            T.id
          )),
          ue.current && de && /* @__PURE__ */ f(
            al,
            {
              content: de,
              messageId: ue.current
            }
          ),
          ee && !me && /* @__PURE__ */ f("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ f("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ P("div", { className: "chat-wrapper__thinking-dots", children: [
            /* @__PURE__ */ f("span", {}),
            /* @__PURE__ */ f("span", {}),
            /* @__PURE__ */ f("span", {})
          ] }) }) }) }),
          /* @__PURE__ */ f("div", { ref: q })
        ] }),
        Be(),
        Z.length > 0 && /* @__PURE__ */ P(
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
              /* @__PURE__ */ P(
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
              Z.map((T, R) => /* @__PURE__ */ P(
                "div",
                {
                  style: {
                    position: "relative",
                    display: "inline-block"
                  },
                  children: [
                    T.startsWith("data:image/") ? /* @__PURE__ */ f(
                      "img",
                      {
                        src: T,
                        alt: `Attachment ${R + 1}`,
                        style: {
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          border: "1px solid #e2e8f0"
                        }
                      }
                    ) : /* @__PURE__ */ f(
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
                    /* @__PURE__ */ f(
                      "button",
                      {
                        onClick: () => {
                          K(
                            (z) => z.filter((O, te) => te !== R)
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
                R
              ))
            ]
          }
        ),
        /* @__PURE__ */ f(
          Nc,
          {
            placeholder: t.placeholder,
            disabled: w,
            chatStatus: M,
            uploadedMedia: Z,
            fileUploadEnabled: (xe = t.features) == null ? void 0 : xe.fileUpload,
            onSubmit: (T, R) => Ge(T, R),
            onFileUpload: rt,
            onClearMedia: () => K([]),
            onStopGeneration: nt
          }
        )
      ] }),
      t.onError && /* @__PURE__ */ f("div", { className: "chat-wrapper__error-boundary" })
    ] })
  ] }));
}
const Xc = Zn(Uc);
class Hc {
  constructor(t, n) {
    pe(this, "baseUrl");
    pe(this, "apiKey");
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
          const h = c.slice(6);
          if (h === "[DONE]") return;
          try {
            yield JSON.parse(h).content || "";
          } catch (y) {
            console.error("Failed to parse chunk:", y);
          }
        }
    }
  }
}
function Kc(e, t) {
  const [n, r] = he([]), [i, l] = he(!1), [o, a] = he(null), s = wt(null), u = wt(new Hc(e, t)), c = fe(async () => {
    try {
      const p = await u.current.initConversation();
      return s.current = p, p;
    } catch (p) {
      throw a(p), p;
    }
  }, []), h = fe(
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
            (M) => M.map(
              (I) => I.id === k.id ? { ...I, content: I.content + b } : I
            )
          );
        r(
          (b) => b.map(
            (M) => M.id === k.id ? { ...M, isStreaming: !1 } : M
          )
        );
      } catch (A) {
        a(A), r((b) => b.filter((M) => M.id !== k.id));
      } finally {
        l(!1);
      }
    },
    [c]
  ), y = fe(() => {
    r([]), s.current = null;
  }, []);
  return {
    messages: n,
    isLoading: i,
    error: o,
    sendMessage: h,
    clearMessages: y
  };
}
export {
  Xc as ChatWrapper,
  zc as Loader,
  tc as PromptInput,
  ic as PromptInputButton,
  $c as PromptInputModelSelect,
  qc as PromptInputModelSelectContent,
  Gc as PromptInputModelSelectItem,
  Zc as PromptInputModelSelectTrigger,
  Yc as PromptInputModelSelectValue,
  lc as PromptInputSubmit,
  tl as PromptInputTextarea,
  nc as PromptInputToolbar,
  rc as PromptInputTools,
  Mc as Reasoning,
  Dc as ReasoningContent,
  Rc as ReasoningTrigger,
  Kc as useChatConnection
};
