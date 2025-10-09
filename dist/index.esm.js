var Mr = Object.defineProperty;
var Rr = (e, n, t) => n in e ? Mr(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var bn = (e, n, t) => Rr(e, typeof n != "symbol" ? n + "" : n, t);
import { jsxs as Y, jsx as k, Fragment as zn } from "react/jsx-runtime";
import Fr, { forwardRef as Br, useState as ie, useRef as Ke, useCallback as se, useEffect as on } from "react";
function jr(e, n) {
  const t = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const Hr = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Vr = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ur = {};
function ot(e, n) {
  return (Ur.jsx ? Vr : Hr).test(e);
}
const qr = /[ \t\n\f\r]/g;
function $r(e) {
  return typeof e == "object" ? e.type === "text" ? at(e.value) : !1 : at(e);
}
function at(e) {
  return e.replace(qr, "") === "";
}
class en {
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
  constructor(n, t, r) {
    this.normal = t, this.property = n, r && (this.space = r);
  }
}
en.prototype.normal = {};
en.prototype.property = {};
en.prototype.space = void 0;
function Gt(e, n) {
  const t = {}, r = {};
  for (const i of e)
    Object.assign(t, i.property), Object.assign(r, i.normal);
  return new en(t, r, n);
}
function On(e) {
  return e.toLowerCase();
}
class ce {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(n, t) {
    this.attribute = t, this.property = n;
  }
}
ce.prototype.attribute = "";
ce.prototype.booleanish = !1;
ce.prototype.boolean = !1;
ce.prototype.commaOrSpaceSeparated = !1;
ce.prototype.commaSeparated = !1;
ce.prototype.defined = !1;
ce.prototype.mustUseProperty = !1;
ce.prototype.number = !1;
ce.prototype.overloadedBoolean = !1;
ce.prototype.property = "";
ce.prototype.spaceSeparated = !1;
ce.prototype.space = void 0;
let Wr = 0;
const O = Re(), ee = Re(), Dn = Re(), C = Re(), $ = Re(), He = Re(), me = Re();
function Re() {
  return 2 ** ++Wr;
}
const Mn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: O,
  booleanish: ee,
  commaOrSpaceSeparated: me,
  commaSeparated: He,
  number: C,
  overloadedBoolean: Dn,
  spaceSeparated: $
}, Symbol.toStringTag, { value: "Module" })), Sn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Mn)
);
class $n extends ce {
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
  constructor(n, t, r, i) {
    let l = -1;
    if (super(n, t), st(this, "space", i), typeof r == "number")
      for (; ++l < Sn.length; ) {
        const o = Sn[l];
        st(this, Sn[l], (r & Mn[o]) === Mn[o]);
      }
  }
}
$n.prototype.defined = !0;
function st(e, n, t) {
  t && (e[n] = t);
}
function Ue(e) {
  const n = {}, t = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const l = new $n(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (l.mustUseProperty = !0), n[r] = l, t[On(r)] = r, t[On(l.attribute)] = r;
  }
  return new en(n, t, e.space);
}
const Zt = Ue({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: ee,
    ariaAutoComplete: null,
    ariaBusy: ee,
    ariaChecked: ee,
    ariaColCount: C,
    ariaColIndex: C,
    ariaColSpan: C,
    ariaControls: $,
    ariaCurrent: null,
    ariaDescribedBy: $,
    ariaDetails: null,
    ariaDisabled: ee,
    ariaDropEffect: $,
    ariaErrorMessage: null,
    ariaExpanded: ee,
    ariaFlowTo: $,
    ariaGrabbed: ee,
    ariaHasPopup: null,
    ariaHidden: ee,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: $,
    ariaLevel: C,
    ariaLive: null,
    ariaModal: ee,
    ariaMultiLine: ee,
    ariaMultiSelectable: ee,
    ariaOrientation: null,
    ariaOwns: $,
    ariaPlaceholder: null,
    ariaPosInSet: C,
    ariaPressed: ee,
    ariaReadOnly: ee,
    ariaRelevant: null,
    ariaRequired: ee,
    ariaRoleDescription: $,
    ariaRowCount: C,
    ariaRowIndex: C,
    ariaRowSpan: C,
    ariaSelected: ee,
    ariaSetSize: C,
    ariaSort: null,
    ariaValueMax: C,
    ariaValueMin: C,
    ariaValueNow: C,
    ariaValueText: null,
    role: null
  },
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  }
});
function er(e, n) {
  return n in e ? e[n] : n;
}
function nr(e, n) {
  return er(e, n.toLowerCase());
}
const Xr = Ue({
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
    accept: He,
    acceptCharset: $,
    accessKey: $,
    action: null,
    allow: null,
    allowFullScreen: O,
    allowPaymentRequest: O,
    allowUserMedia: O,
    alt: null,
    as: null,
    async: O,
    autoCapitalize: null,
    autoComplete: $,
    autoFocus: O,
    autoPlay: O,
    blocking: $,
    capture: null,
    charSet: null,
    checked: O,
    cite: null,
    className: $,
    cols: C,
    colSpan: null,
    content: null,
    contentEditable: ee,
    controls: O,
    controlsList: $,
    coords: C | He,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: O,
    defer: O,
    dir: null,
    dirName: null,
    disabled: O,
    download: Dn,
    draggable: ee,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: O,
    formTarget: null,
    headers: $,
    height: C,
    hidden: Dn,
    high: C,
    href: null,
    hrefLang: null,
    htmlFor: $,
    httpEquiv: $,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: O,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: O,
    itemId: null,
    itemProp: $,
    itemRef: $,
    itemScope: O,
    itemType: $,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: O,
    low: C,
    manifest: null,
    max: null,
    maxLength: C,
    media: null,
    method: null,
    min: null,
    minLength: C,
    multiple: O,
    muted: O,
    name: null,
    nonce: null,
    noModule: O,
    noValidate: O,
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
    open: O,
    optimum: C,
    pattern: null,
    ping: $,
    placeholder: null,
    playsInline: O,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: O,
    referrerPolicy: null,
    rel: $,
    required: O,
    reversed: O,
    rows: C,
    rowSpan: C,
    sandbox: $,
    scope: null,
    scoped: O,
    seamless: O,
    selected: O,
    shadowRootClonable: O,
    shadowRootDelegatesFocus: O,
    shadowRootMode: null,
    shape: null,
    size: C,
    sizes: null,
    slot: null,
    span: C,
    spellCheck: ee,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: C,
    step: null,
    style: null,
    tabIndex: C,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: O,
    useMap: null,
    value: ee,
    width: C,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: $,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: C,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: C,
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
    compact: O,
    // Lists. Use CSS to reduce space between items instead
    declare: O,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: C,
    // `<img>` and `<object>`
    leftMargin: C,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: C,
    // `<body>`
    marginWidth: C,
    // `<body>`
    noResize: O,
    // `<frame>`
    noHref: O,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: O,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: O,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: C,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: ee,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: C,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: C,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: O,
    disableRemotePlayback: O,
    prefix: null,
    property: null,
    results: C,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: nr
}), Yr = Ue({
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
    about: me,
    accentHeight: C,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: C,
    amplitude: C,
    arabicForm: null,
    ascent: C,
    attributeName: null,
    attributeType: null,
    azimuth: C,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: C,
    by: null,
    calcMode: null,
    capHeight: C,
    className: $,
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
    descent: C,
    diffuseConstant: C,
    direction: null,
    display: null,
    dur: null,
    divisor: C,
    dominantBaseline: null,
    download: O,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: C,
    enableBackground: null,
    end: null,
    event: null,
    exponent: C,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: C,
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
    g1: He,
    g2: He,
    glyphName: He,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: C,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: C,
    horizOriginX: C,
    horizOriginY: C,
    id: null,
    ideographic: C,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: C,
    k: C,
    k1: C,
    k2: C,
    k3: C,
    k4: C,
    kernelMatrix: me,
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
    limitingConeAngle: C,
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
    mediaSize: C,
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
    overlinePosition: C,
    overlineThickness: C,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: C,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: $,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: C,
    pointsAtY: C,
    pointsAtZ: C,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: me,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: me,
    rev: me,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: me,
    requiredFeatures: me,
    requiredFonts: me,
    requiredFormats: me,
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
    specularConstant: C,
    specularExponent: C,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: C,
    strikethroughThickness: C,
    string: null,
    stroke: null,
    strokeDashArray: me,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: C,
    strokeOpacity: C,
    strokeWidth: null,
    style: null,
    surfaceScale: C,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: me,
    tabIndex: C,
    tableValues: null,
    target: null,
    targetX: C,
    targetY: C,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: me,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: C,
    underlineThickness: C,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: C,
    values: null,
    vAlphabetic: C,
    vMathematical: C,
    vectorEffect: null,
    vHanging: C,
    vIdeographic: C,
    version: null,
    vertAdvY: C,
    vertOriginX: C,
    vertOriginY: C,
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
    xHeight: C,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: er
}), tr = Ue({
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
  transform(e, n) {
    return "xlink:" + n.slice(5).toLowerCase();
  }
}), rr = Ue({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: nr
}), ir = Ue({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, n) {
    return "xml:" + n.slice(3).toLowerCase();
  }
}), Kr = {
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
}, Qr = /[A-Z]/g, ut = /-[a-z]/g, Jr = /^data[-\w.:]+$/i;
function Gr(e, n) {
  const t = On(n);
  let r = n, i = ce;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && Jr.test(n)) {
    if (n.charAt(4) === "-") {
      const l = n.slice(5).replace(ut, ei);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = n.slice(4);
      if (!ut.test(l)) {
        let o = l.replace(Qr, Zr);
        o.charAt(0) !== "-" && (o = "-" + o), n = "data" + o;
      }
    }
    i = $n;
  }
  return new i(r, n);
}
function Zr(e) {
  return "-" + e.toLowerCase();
}
function ei(e) {
  return e.charAt(1).toUpperCase();
}
const ni = Gt([Zt, Xr, tr, rr, ir], "html"), Wn = Gt([Zt, Yr, tr, rr, ir], "svg");
function ti(e) {
  return e.join(" ").trim();
}
var hn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function lr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Xn = {}, ct = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, ri = /\n/g, ii = /^\s*/, li = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, oi = /^:\s*/, ai = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, si = /^[;\s]*/, ui = /^\s+|\s+$/g, ci = `
`, pt = "/", ht = "*", Me = "", pi = "comment", hi = "declaration", fi = function(e, n) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  n = n || {};
  var t = 1, r = 1;
  function i(y) {
    var x = y.match(ri);
    x && (t += x.length);
    var I = y.lastIndexOf(ci);
    r = ~I ? y.length - I : r + y.length;
  }
  function l() {
    var y = { line: t, column: r };
    return function(x) {
      return x.position = new o(y), c(), x;
    };
  }
  function o(y) {
    this.start = y, this.end = { line: t, column: r }, this.source = n.source;
  }
  o.prototype.content = e;
  function a(y) {
    var x = new Error(
      n.source + ":" + t + ":" + r + ": " + y
    );
    if (x.reason = y, x.filename = n.source, x.line = t, x.column = r, x.source = e, !n.silent) throw x;
  }
  function s(y) {
    var x = y.exec(e);
    if (x) {
      var I = x[0];
      return i(I), e = e.slice(I.length), x;
    }
  }
  function c() {
    s(ii);
  }
  function u(y) {
    var x;
    for (y = y || []; x = h(); )
      x !== !1 && y.push(x);
    return y;
  }
  function h() {
    var y = l();
    if (!(pt != e.charAt(0) || ht != e.charAt(1))) {
      for (var x = 2; Me != e.charAt(x) && (ht != e.charAt(x) || pt != e.charAt(x + 1)); )
        ++x;
      if (x += 2, Me === e.charAt(x - 1))
        return a("End of comment missing");
      var I = e.slice(2, x - 2);
      return r += 2, i(I), e = e.slice(x), r += 2, y({
        type: pi,
        comment: I
      });
    }
  }
  function m() {
    var y = l(), x = s(li);
    if (x) {
      if (h(), !s(oi)) return a("property missing ':'");
      var I = s(ai), b = y({
        type: hi,
        property: ft(x[0].replace(ct, Me)),
        value: I ? ft(I[0].replace(ct, Me)) : Me
      });
      return s(si), b;
    }
  }
  function p() {
    var y = [];
    u(y);
    for (var x; x = m(); )
      x !== !1 && (y.push(x), u(y));
    return y;
  }
  return c(), p();
};
function ft(e) {
  return e ? e.replace(ui, Me) : Me;
}
var di = hn && hn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Xn, "__esModule", { value: !0 });
Xn.default = gi;
var mi = di(fi);
function gi(e, n) {
  var t = null;
  if (!e || typeof e != "string")
    return t;
  var r = (0, mi.default)(e), i = typeof n == "function";
  return r.forEach(function(l) {
    if (l.type === "declaration") {
      var o = l.property, a = l.value;
      i ? n(o, a, l) : a && (t = t || {}, t[o] = a);
    }
  }), t;
}
var mn = {};
Object.defineProperty(mn, "__esModule", { value: !0 });
mn.camelCase = void 0;
var yi = /^--[a-zA-Z0-9_-]+$/, xi = /-([a-z])/g, wi = /^[^-]+$/, ki = /^-(webkit|moz|ms|o|khtml)-/, bi = /^-(ms)-/, Si = function(e) {
  return !e || wi.test(e) || yi.test(e);
}, Ci = function(e, n) {
  return n.toUpperCase();
}, dt = function(e, n) {
  return "".concat(n, "-");
}, Ei = function(e, n) {
  return n === void 0 && (n = {}), Si(e) ? e : (e = e.toLowerCase(), n.reactCompat ? e = e.replace(bi, dt) : e = e.replace(ki, dt), e.replace(xi, Ci));
};
mn.camelCase = Ei;
var _i = hn && hn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, Ii = _i(Xn), Ti = mn;
function Rn(e, n) {
  var t = {};
  return !e || typeof e != "string" || (0, Ii.default)(e, function(r, i) {
    r && i && (t[(0, Ti.camelCase)(r, n)] = i);
  }), t;
}
Rn.default = Rn;
var Pi = Rn;
const Ni = /* @__PURE__ */ lr(Pi), or = ar("end"), Yn = ar("start");
function ar(e) {
  return n;
  function n(t) {
    const r = t && t.position && t.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function Ai(e) {
  const n = Yn(e), t = or(e);
  if (n && t)
    return { start: n, end: t };
}
function Qe(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? mt(e.position) : "start" in e || "end" in e ? mt(e) : "line" in e || "column" in e ? Fn(e) : "";
}
function Fn(e) {
  return gt(e && e.line) + ":" + gt(e && e.column);
}
function mt(e) {
  return Fn(e && e.start) + "-" + Fn(e && e.end);
}
function gt(e) {
  return e && typeof e == "number" ? e : 1;
}
class le extends Error {
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
  constructor(n, t, r) {
    super(), typeof t == "string" && (r = t, t = void 0);
    let i = "", l = {}, o = !1;
    if (t && ("line" in t && "column" in t ? l = { place: t } : "start" in t && "end" in t ? l = { place: t } : "type" in t ? l = {
      ancestors: [t],
      place: t.position
    } : l = { ...t }), typeof n == "string" ? i = n : !l.cause && n && (o = !0, i = n.message, l.cause = n), !l.ruleId && !l.source && typeof r == "string") {
      const s = r.indexOf(":");
      s === -1 ? l.ruleId = r : (l.source = r.slice(0, s), l.ruleId = r.slice(s + 1));
    }
    if (!l.place && l.ancestors && l.ancestors) {
      const s = l.ancestors[l.ancestors.length - 1];
      s && (l.place = s.position);
    }
    const a = l.place && "start" in l.place ? l.place.start : l.place;
    this.ancestors = l.ancestors || void 0, this.cause = l.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = Qe(l.place) || "1:1", this.place = l.place || void 0, this.reason = this.message, this.ruleId = l.ruleId || void 0, this.source = l.source || void 0, this.stack = o && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
le.prototype.file = "";
le.prototype.name = "";
le.prototype.reason = "";
le.prototype.message = "";
le.prototype.stack = "";
le.prototype.column = void 0;
le.prototype.line = void 0;
le.prototype.ancestors = void 0;
le.prototype.cause = void 0;
le.prototype.fatal = void 0;
le.prototype.place = void 0;
le.prototype.ruleId = void 0;
le.prototype.source = void 0;
const Kn = {}.hasOwnProperty, vi = /* @__PURE__ */ new Map(), Li = /[A-Z]/g, zi = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Oi = /* @__PURE__ */ new Set(["td", "th"]), sr = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Di(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = n.filePath || void 0;
  let r;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Ui(t, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Vi(t, n.jsx, n.jsxs);
  }
  const i = {
    Fragment: n.Fragment,
    ancestors: [],
    components: n.components || {},
    create: r,
    elementAttributeNameCase: n.elementAttributeNameCase || "react",
    evaluater: n.createEvaluater ? n.createEvaluater() : void 0,
    filePath: t,
    ignoreInvalidStyle: n.ignoreInvalidStyle || !1,
    passKeys: n.passKeys !== !1,
    passNode: n.passNode || !1,
    schema: n.space === "svg" ? Wn : ni,
    stylePropertyNameCase: n.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: n.tableCellAlignToStyle !== !1
  }, l = ur(i, e, void 0);
  return l && typeof l != "string" ? l : i.create(
    e,
    i.Fragment,
    { children: l || void 0 },
    void 0
  );
}
function ur(e, n, t) {
  if (n.type === "element")
    return Mi(e, n, t);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return Ri(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return Bi(e, n, t);
  if (n.type === "mdxjsEsm")
    return Fi(e, n);
  if (n.type === "root")
    return ji(e, n, t);
  if (n.type === "text")
    return Hi(e, n);
}
function Mi(e, n, t) {
  const r = e.schema;
  let i = r;
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Wn, e.schema = i), e.ancestors.push(n);
  const l = pr(e, n.tagName, !1), o = qi(e, n);
  let a = Jn(e, n);
  return zi.has(n.tagName) && (a = a.filter(function(s) {
    return typeof s == "string" ? !$r(s) : !0;
  })), cr(e, o, l, n), Qn(o, a), e.ancestors.pop(), e.schema = r, e.create(n, l, o, t);
}
function Ri(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Ze(e, n.position);
}
function Fi(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(n.data.estree)
    );
  Ze(e, n.position);
}
function Bi(e, n, t) {
  const r = e.schema;
  let i = r;
  n.name === "svg" && r.space === "html" && (i = Wn, e.schema = i), e.ancestors.push(n);
  const l = n.name === null ? e.Fragment : pr(e, n.name, !0), o = $i(e, n), a = Jn(e, n);
  return cr(e, o, l, n), Qn(o, a), e.ancestors.pop(), e.schema = r, e.create(n, l, o, t);
}
function ji(e, n, t) {
  const r = {};
  return Qn(r, Jn(e, n)), e.create(n, e.Fragment, r, t);
}
function Hi(e, n) {
  return n.value;
}
function cr(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function Qn(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0];
    t && (e.children = t);
  }
}
function Vi(e, n, t) {
  return r;
  function r(i, l, o, a) {
    const c = Array.isArray(o.children) ? t : n;
    return a ? c(l, o, a) : c(l, o);
  }
}
function Ui(e, n) {
  return t;
  function t(r, i, l, o) {
    const a = Array.isArray(l.children), s = Yn(r);
    return n(
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
function qi(e, n) {
  const t = {};
  let r, i;
  for (i in n.properties)
    if (i !== "children" && Kn.call(n.properties, i)) {
      const l = Wi(e, i, n.properties[i]);
      if (l) {
        const [o, a] = l;
        e.tableCellAlignToStyle && o === "align" && typeof a == "string" && Oi.has(n.tagName) ? r = a : t[o] = a;
      }
    }
  if (r) {
    const l = (
      /** @type {Style} */
      t.style || (t.style = {})
    );
    l[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return t;
}
function $i(e, n) {
  const t = {};
  for (const r of n.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const l = r.data.estree.body[0];
        l.type;
        const o = l.expression;
        o.type;
        const a = o.properties[0];
        a.type, Object.assign(
          t,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        Ze(e, n.position);
    else {
      const i = r.name;
      let l;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, l = e.evaluater.evaluateExpression(a.expression);
        } else
          Ze(e, n.position);
      else
        l = r.value === null ? !0 : r.value;
      t[i] = /** @type {Props[keyof Props]} */
      l;
    }
  return t;
}
function Jn(e, n) {
  const t = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : vi;
  for (; ++r < n.children.length; ) {
    const l = n.children[r];
    let o;
    if (e.passKeys) {
      const s = l.type === "element" ? l.tagName : l.type === "mdxJsxFlowElement" || l.type === "mdxJsxTextElement" ? l.name : void 0;
      if (s) {
        const c = i.get(s) || 0;
        o = s + "-" + c, i.set(s, c + 1);
      }
    }
    const a = ur(e, l, o);
    a !== void 0 && t.push(a);
  }
  return t;
}
function Wi(e, n, t) {
  const r = Gr(e.schema, n);
  if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
    if (Array.isArray(t) && (t = r.commaSeparated ? jr(t) : ti(t)), r.property === "style") {
      let i = typeof t == "object" ? t : Xi(e, String(t));
      return e.stylePropertyNameCase === "css" && (i = Yi(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Kr[r.property] || r.property : r.attribute,
      t
    ];
  }
}
function Xi(e, n) {
  try {
    return Ni(n, { reactCompat: !0 });
  } catch (t) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      t
    ), i = new le("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = sr + "#cannot-parse-style-attribute", i;
  }
}
function pr(e, n, t) {
  let r;
  if (!t)
    r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const i = n.split(".");
    let l = -1, o;
    for (; ++l < i.length; ) {
      const a = ot(i[l]) ? { type: "Identifier", name: i[l] } : { type: "Literal", value: i[l] };
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
    r = ot(n) && !/^[a-z]/.test(n) ? { type: "Identifier", name: n } : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return Kn.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Ze(e);
}
function Ze(e, n) {
  const t = new le(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: n,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw t.file = e.filePath || void 0, t.url = sr + "#cannot-handle-mdx-estrees-without-createevaluater", t;
}
function Yi(e) {
  const n = {};
  let t;
  for (t in e)
    Kn.call(e, t) && (n[Ki(t)] = e[t]);
  return n;
}
function Ki(e) {
  let n = e.replace(Li, Qi);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function Qi(e) {
  return "-" + e.toLowerCase();
}
const Cn = {
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
}, Ji = {};
function Gi(e, n) {
  const t = Ji, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, i = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return hr(e, r, i);
}
function hr(e, n, t) {
  if (Zi(e)) {
    if ("value" in e)
      return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return yt(e.children, n, t);
  }
  return Array.isArray(e) ? yt(e, n, t) : "";
}
function yt(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = hr(e[i], n, t);
  return r.join("");
}
function Zi(e) {
  return !!(e && typeof e == "object");
}
const xt = document.createElement("i");
function Gn(e) {
  const n = "&" + e + ";";
  xt.innerHTML = n;
  const t = xt.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t
  );
}
function Ee(e, n, t, r) {
  const i = e.length;
  let l = 0, o;
  if (n < 0 ? n = -n > i ? 0 : i + n : n = n > i ? i : n, t = t > 0 ? t : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(n, t), e.splice(...o);
  else
    for (t && e.splice(n, t); l < r.length; )
      o = r.slice(l, l + 1e4), o.unshift(n, 0), e.splice(...o), l += 1e4, n += 1e4;
}
function ye(e, n) {
  return e.length > 0 ? (Ee(e, e.length, 0, n), e) : n;
}
const wt = {}.hasOwnProperty;
function el(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    nl(n, e[t]);
  return n;
}
function nl(e, n) {
  let t;
  for (t in n) {
    const i = (wt.call(e, t) ? e[t] : void 0) || (e[t] = {}), l = n[t];
    let o;
    if (l)
      for (o in l) {
        wt.call(i, o) || (i[o] = []);
        const a = l[o];
        tl(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function tl(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  Ee(e, 0, 0, r);
}
function fr(e, n) {
  const t = Number.parseInt(e, n);
  return (
    // C0 except for HT, LF, FF, CR, space.
    t < 9 || t === 11 || t > 13 && t < 32 || // Control character (DEL) of C0, and C1 controls.
    t > 126 && t < 160 || // Lone high surrogates and low surrogates.
    t > 55295 && t < 57344 || // Noncharacters.
    t > 64975 && t < 65008 || /* eslint-disable no-bitwise */
    (t & 65535) === 65535 || (t & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    t > 1114111 ? "�" : String.fromCodePoint(t)
  );
}
function Ve(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Ce = ve(/[A-Za-z]/), ge = ve(/[\dA-Za-z]/), rl = ve(/[#-'*+\--9=?A-Z^-~]/);
function Bn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const jn = ve(/\d/), il = ve(/[\dA-Fa-f]/), ll = ve(/[!-/:-@[-`{-~]/);
function A(e) {
  return e !== null && e < -2;
}
function ue(e) {
  return e !== null && (e < 0 || e === 32);
}
function F(e) {
  return e === -2 || e === -1 || e === 32;
}
const ol = ve(new RegExp("\\p{P}|\\p{S}", "u")), al = ve(/\s/);
function ve(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function qe(e) {
  const n = [];
  let t = -1, r = 0, i = 0;
  for (; ++t < e.length; ) {
    const l = e.charCodeAt(t);
    let o = "";
    if (l === 37 && ge(e.charCodeAt(t + 1)) && ge(e.charCodeAt(t + 2)))
      i = 2;
    else if (l < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l)) || (o = String.fromCharCode(l));
    else if (l > 55295 && l < 57344) {
      const a = e.charCodeAt(t + 1);
      l < 56320 && a > 56319 && a < 57344 ? (o = String.fromCharCode(l, a), i = 1) : o = "�";
    } else
      o = String.fromCharCode(l);
    o && (n.push(e.slice(r, t), encodeURIComponent(o)), r = t + i + 1, o = ""), i && (t += i, i = 0);
  }
  return n.join("") + e.slice(r);
}
function W(e, n, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let l = 0;
  return o;
  function o(s) {
    return F(s) ? (e.enter(t), a(s)) : n(s);
  }
  function a(s) {
    return F(s) && l++ < i ? (e.consume(s), a) : (e.exit(t), n(s));
  }
}
const sl = {
  tokenize: ul
};
function ul(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, i);
  let t;
  return n;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), W(e, n, "linePrefix");
  }
  function i(a) {
    return e.enter("paragraph"), l(a);
  }
  function l(a) {
    const s = e.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = s), t = s, o(a);
  }
  function o(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return A(a) ? (e.consume(a), e.exit("chunkText"), l) : (e.consume(a), o);
  }
}
const cl = {
  tokenize: pl
}, kt = {
  tokenize: hl
};
function pl(e) {
  const n = this, t = [];
  let r = 0, i, l, o;
  return a;
  function a(T) {
    if (r < t.length) {
      const H = t[r];
      return n.containerState = H[1], e.attempt(H[0].continuation, s, c)(T);
    }
    return c(T);
  }
  function s(T) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, i && v();
      const H = n.events.length;
      let U = H, w;
      for (; U--; )
        if (n.events[U][0] === "exit" && n.events[U][1].type === "chunkFlow") {
          w = n.events[U][1].end;
          break;
        }
      b(r);
      let R = H;
      for (; R < n.events.length; )
        n.events[R][1].end = {
          ...w
        }, R++;
      return Ee(n.events, U + 1, 0, n.events.slice(H)), n.events.length = R, c(T);
    }
    return a(T);
  }
  function c(T) {
    if (r === t.length) {
      if (!i)
        return m(T);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return y(T);
      n.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(kt, u, h)(T);
  }
  function u(T) {
    return i && v(), b(r), m(T);
  }
  function h(T) {
    return n.parser.lazy[n.now().line] = r !== t.length, o = n.now().offset, y(T);
  }
  function m(T) {
    return n.containerState = {}, e.attempt(kt, p, y)(T);
  }
  function p(T) {
    return r++, t.push([n.currentConstruct, n.containerState]), m(T);
  }
  function y(T) {
    if (T === null) {
      i && v(), b(0), e.consume(T);
      return;
    }
    return i = i || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: l
    }), x(T);
  }
  function x(T) {
    if (T === null) {
      I(e.exit("chunkFlow"), !0), b(0), e.consume(T);
      return;
    }
    return A(T) ? (e.consume(T), I(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, a) : (e.consume(T), x);
  }
  function I(T, H) {
    const U = n.sliceStream(T);
    if (H && U.push(null), T.previous = l, l && (l.next = T), l = T, i.defineSkip(T.start), i.write(U), n.parser.lazy[T.start.line]) {
      let w = i.events.length;
      for (; w--; )
        if (
          // The token starts before the line ending…
          i.events[w][1].start.offset < o && // …and either is not ended yet…
          (!i.events[w][1].end || // …or ends after it.
          i.events[w][1].end.offset > o)
        )
          return;
      const R = n.events.length;
      let K = R, B, j;
      for (; K--; )
        if (n.events[K][0] === "exit" && n.events[K][1].type === "chunkFlow") {
          if (B) {
            j = n.events[K][1].end;
            break;
          }
          B = !0;
        }
      for (b(r), w = R; w < n.events.length; )
        n.events[w][1].end = {
          ...j
        }, w++;
      Ee(n.events, K + 1, 0, n.events.slice(R)), n.events.length = w;
    }
  }
  function b(T) {
    let H = t.length;
    for (; H-- > T; ) {
      const U = t[H];
      n.containerState = U[1], U[0].exit.call(n, e);
    }
    t.length = T;
  }
  function v() {
    i.write([null]), l = void 0, i = void 0, n.containerState._closeFlow = void 0;
  }
}
function hl(e, n, t) {
  return W(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function bt(e) {
  if (e === null || ue(e) || al(e))
    return 1;
  if (ol(e))
    return 2;
}
function Zn(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll;
    l && !r.includes(l) && (n = l(n, t), r.push(l));
  }
  return n;
}
const Hn = {
  name: "attention",
  resolveAll: fl,
  tokenize: dl
};
function fl(e, n) {
  let t = -1, r, i, l, o, a, s, c, u;
  for (; ++t < e.length; )
    if (e[t][0] === "enter" && e[t][1].type === "attentionSequence" && e[t][1]._close) {
      for (r = t; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        n.sliceSerialize(e[r][1]).charCodeAt(0) === n.sliceSerialize(e[t][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[t][1]._open) && (e[t][1].end.offset - e[t][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[t][1].end.offset - e[t][1].start.offset) % 3))
            continue;
          s = e[r][1].end.offset - e[r][1].start.offset > 1 && e[t][1].end.offset - e[t][1].start.offset > 1 ? 2 : 1;
          const h = {
            ...e[r][1].end
          }, m = {
            ...e[t][1].start
          };
          St(h, -s), St(m, s), o = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: h,
            end: {
              ...e[r][1].end
            }
          }, a = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[t][1].start
            },
            end: m
          }, l = {
            type: s > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[t][1].start
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
          }, e[t][1].start = {
            ...a.end
          }, c = [], e[r][1].end.offset - e[r][1].start.offset && (c = ye(c, [["enter", e[r][1], n], ["exit", e[r][1], n]])), c = ye(c, [["enter", i, n], ["enter", o, n], ["exit", o, n], ["enter", l, n]]), c = ye(c, Zn(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), c = ye(c, [["exit", l, n], ["enter", a, n], ["exit", a, n], ["exit", i, n]]), e[t][1].end.offset - e[t][1].start.offset ? (u = 2, c = ye(c, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : u = 0, Ee(e, r - 1, t - r + 3, c), t = r + c.length - u - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function dl(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, i = bt(r);
  let l;
  return o;
  function o(s) {
    return l = s, e.enter("attentionSequence"), a(s);
  }
  function a(s) {
    if (s === l)
      return e.consume(s), a;
    const c = e.exit("attentionSequence"), u = bt(s), h = !u || u === 2 && i || t.includes(s), m = !i || i === 2 && u || t.includes(r);
    return c._open = !!(l === 42 ? h : h && (i || !m)), c._close = !!(l === 42 ? m : m && (u || !h)), n(s);
  }
}
function St(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const ml = {
  name: "autolink",
  tokenize: gl
};
function gl(e, n, t) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), l;
  }
  function l(p) {
    return Ce(p) ? (e.consume(p), o) : p === 64 ? t(p) : c(p);
  }
  function o(p) {
    return p === 43 || p === 45 || p === 46 || ge(p) ? (r = 1, a(p)) : c(p);
  }
  function a(p) {
    return p === 58 ? (e.consume(p), r = 0, s) : (p === 43 || p === 45 || p === 46 || ge(p)) && r++ < 32 ? (e.consume(p), a) : (r = 0, c(p));
  }
  function s(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), n) : p === null || p === 32 || p === 60 || Bn(p) ? t(p) : (e.consume(p), s);
  }
  function c(p) {
    return p === 64 ? (e.consume(p), u) : rl(p) ? (e.consume(p), c) : t(p);
  }
  function u(p) {
    return ge(p) ? h(p) : t(p);
  }
  function h(p) {
    return p === 46 ? (e.consume(p), r = 0, u) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), n) : m(p);
  }
  function m(p) {
    if ((p === 45 || ge(p)) && r++ < 63) {
      const y = p === 45 ? m : h;
      return e.consume(p), y;
    }
    return t(p);
  }
}
const gn = {
  partial: !0,
  tokenize: yl
};
function yl(e, n, t) {
  return r;
  function r(l) {
    return F(l) ? W(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || A(l) ? n(l) : t(l);
  }
}
const dr = {
  continuation: {
    tokenize: wl
  },
  exit: kl,
  name: "blockQuote",
  tokenize: xl
};
function xl(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    if (o === 62) {
      const a = r.containerState;
      return a.open || (e.enter("blockQuote", {
        _container: !0
      }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(o), e.exit("blockQuoteMarker"), l;
    }
    return t(o);
  }
  function l(o) {
    return F(o) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(o), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), n) : (e.exit("blockQuotePrefix"), n(o));
  }
}
function wl(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return F(o) ? W(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : l(o);
  }
  function l(o) {
    return e.attempt(dr, n, t)(o);
  }
}
function kl(e) {
  e.exit("blockQuote");
}
const mr = {
  name: "characterEscape",
  tokenize: bl
};
function bl(e, n, t) {
  return r;
  function r(l) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(l), e.exit("escapeMarker"), i;
  }
  function i(l) {
    return ll(l) ? (e.enter("characterEscapeValue"), e.consume(l), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(l);
  }
}
const gr = {
  name: "characterReference",
  tokenize: Sl
};
function Sl(e, n, t) {
  const r = this;
  let i = 0, l, o;
  return a;
  function a(h) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(h), e.exit("characterReferenceMarker"), s;
  }
  function s(h) {
    return h === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(h), e.exit("characterReferenceMarkerNumeric"), c) : (e.enter("characterReferenceValue"), l = 31, o = ge, u(h));
  }
  function c(h) {
    return h === 88 || h === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(h), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), l = 6, o = il, u) : (e.enter("characterReferenceValue"), l = 7, o = jn, u(h));
  }
  function u(h) {
    if (h === 59 && i) {
      const m = e.exit("characterReferenceValue");
      return o === ge && !Gn(r.sliceSerialize(m)) ? t(h) : (e.enter("characterReferenceMarker"), e.consume(h), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return o(h) && i++ < l ? (e.consume(h), u) : t(h);
  }
}
const Ct = {
  partial: !0,
  tokenize: El
}, Et = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Cl
};
function Cl(e, n, t) {
  const r = this, i = {
    partial: !0,
    tokenize: U
  };
  let l = 0, o = 0, a;
  return s;
  function s(w) {
    return c(w);
  }
  function c(w) {
    const R = r.events[r.events.length - 1];
    return l = R && R[1].type === "linePrefix" ? R[2].sliceSerialize(R[1], !0).length : 0, a = w, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(w);
  }
  function u(w) {
    return w === a ? (o++, e.consume(w), u) : o < 3 ? t(w) : (e.exit("codeFencedFenceSequence"), F(w) ? W(e, h, "whitespace")(w) : h(w));
  }
  function h(w) {
    return w === null || A(w) ? (e.exit("codeFencedFence"), r.interrupt ? n(w) : e.check(Ct, x, H)(w)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), m(w));
  }
  function m(w) {
    return w === null || A(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), h(w)) : F(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), W(e, p, "whitespace")(w)) : w === 96 && w === a ? t(w) : (e.consume(w), m);
  }
  function p(w) {
    return w === null || A(w) ? h(w) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), y(w));
  }
  function y(w) {
    return w === null || A(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), h(w)) : w === 96 && w === a ? t(w) : (e.consume(w), y);
  }
  function x(w) {
    return e.attempt(i, H, I)(w);
  }
  function I(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), b;
  }
  function b(w) {
    return l > 0 && F(w) ? W(e, v, "linePrefix", l + 1)(w) : v(w);
  }
  function v(w) {
    return w === null || A(w) ? e.check(Ct, x, H)(w) : (e.enter("codeFlowValue"), T(w));
  }
  function T(w) {
    return w === null || A(w) ? (e.exit("codeFlowValue"), v(w)) : (e.consume(w), T);
  }
  function H(w) {
    return e.exit("codeFenced"), n(w);
  }
  function U(w, R, K) {
    let B = 0;
    return j;
    function j(z) {
      return w.enter("lineEnding"), w.consume(z), w.exit("lineEnding"), P;
    }
    function P(z) {
      return w.enter("codeFencedFence"), F(z) ? W(w, N, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(z) : N(z);
    }
    function N(z) {
      return z === a ? (w.enter("codeFencedFenceSequence"), M(z)) : K(z);
    }
    function M(z) {
      return z === a ? (B++, w.consume(z), M) : B >= o ? (w.exit("codeFencedFenceSequence"), F(z) ? W(w, Q, "whitespace")(z) : Q(z)) : K(z);
    }
    function Q(z) {
      return z === null || A(z) ? (w.exit("codeFencedFence"), R(z)) : K(z);
    }
  }
}
function El(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? t(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o);
  }
}
const En = {
  name: "codeIndented",
  tokenize: Il
}, _l = {
  partial: !0,
  tokenize: Tl
};
function Il(e, n, t) {
  const r = this;
  return i;
  function i(c) {
    return e.enter("codeIndented"), W(e, l, "linePrefix", 5)(c);
  }
  function l(c) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? o(c) : t(c);
  }
  function o(c) {
    return c === null ? s(c) : A(c) ? e.attempt(_l, o, s)(c) : (e.enter("codeFlowValue"), a(c));
  }
  function a(c) {
    return c === null || A(c) ? (e.exit("codeFlowValue"), o(c)) : (e.consume(c), a);
  }
  function s(c) {
    return e.exit("codeIndented"), n(c);
  }
}
function Tl(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? t(o) : A(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : W(e, l, "linePrefix", 5)(o);
  }
  function l(o) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(o) : A(o) ? i(o) : t(o);
  }
}
const Pl = {
  name: "codeText",
  previous: Al,
  resolve: Nl,
  tokenize: vl
};
function Nl(e) {
  let n = e.length - 4, t = 3, r, i;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        e[t][1].type = "codeTextPadding", e[n][1].type = "codeTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    i === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (i = r) : (r === n || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), n -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function Al(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function vl(e, n, t) {
  let r = 0, i, l;
  return o;
  function o(h) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(h);
  }
  function a(h) {
    return h === 96 ? (e.consume(h), r++, a) : (e.exit("codeTextSequence"), s(h));
  }
  function s(h) {
    return h === null ? t(h) : h === 32 ? (e.enter("space"), e.consume(h), e.exit("space"), s) : h === 96 ? (l = e.enter("codeTextSequence"), i = 0, u(h)) : A(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), s) : (e.enter("codeTextData"), c(h));
  }
  function c(h) {
    return h === null || h === 32 || h === 96 || A(h) ? (e.exit("codeTextData"), s(h)) : (e.consume(h), c);
  }
  function u(h) {
    return h === 96 ? (e.consume(h), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(h)) : (l.type = "codeTextData", c(h));
  }
}
class Ll {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(n) {
    this.left = n ? [...n] : [], this.right = [];
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
  get(n) {
    if (n < 0 || n >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + n + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return n < this.left.length ? this.left[n] : this.right[this.right.length - n + this.left.length - 1];
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
  slice(n, t) {
    const r = t ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(n, r) : n > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - n + this.left.length).reverse() : this.left.slice(n).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
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
  splice(n, t, r) {
    const i = t || 0;
    this.setCursor(Math.trunc(n));
    const l = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && Xe(this.left, r), l.reverse();
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
  push(n) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(n);
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
  pushMany(n) {
    this.setCursor(Number.POSITIVE_INFINITY), Xe(this.left, n);
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
  unshift(n) {
    this.setCursor(0), this.right.push(n);
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
  unshiftMany(n) {
    this.setCursor(0), Xe(this.right, n.reverse());
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
  setCursor(n) {
    if (!(n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0))
      if (n < this.left.length) {
        const t = this.left.splice(n, Number.POSITIVE_INFINITY);
        Xe(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        Xe(this.left, t.reverse());
      }
  }
}
function Xe(e, n) {
  let t = 0;
  if (n.length < 1e4)
    e.push(...n);
  else
    for (; t < n.length; )
      e.push(...n.slice(t, t + 1e4)), t += 1e4;
}
function yr(e) {
  const n = {};
  let t = -1, r, i, l, o, a, s, c;
  const u = new Ll(e);
  for (; ++t < u.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = u.get(t), t && r[1].type === "chunkFlow" && u.get(t - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, l = 0, l < s.length && s[l][1].type === "lineEndingBlank" && (l += 2), l < s.length && s[l][1].type === "content"))
      for (; ++l < s.length && s[l][1].type !== "content"; )
        s[l][1].type === "chunkText" && (s[l][1]._isInFirstContentOfListItem = !0, l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, zl(u, t)), t = n[t], c = !0);
    else if (r[1]._container) {
      for (l = t, i = void 0; l--; )
        if (o = u.get(l), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
          o[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = l);
        else if (!(o[1].type === "linePrefix" || o[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...u.get(i)[1].start
      }, a = u.slice(i, t), a.unshift(r), u.splice(i, t - i + 1, a));
    }
  }
  return Ee(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !c;
}
function zl(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let i = n - 1;
  const l = [];
  let o = t._tokenizer;
  o || (o = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const a = o.events, s = [], c = {};
  let u, h, m = -1, p = t, y = 0, x = 0;
  const I = [x];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    l.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), h && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), h = p, p = p.next;
  }
  for (p = t; ++m < a.length; )
    // Find a void token that includes a break.
    a[m][0] === "exit" && a[m - 1][0] === "enter" && a[m][1].type === a[m - 1][1].type && a[m][1].start.line !== a[m][1].end.line && (x = m + 1, I.push(x), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : I.pop(), m = I.length; m--; ) {
    const b = a.slice(I[m], I[m + 1]), v = l.pop();
    s.push([v, v + b.length - 1]), e.splice(v, 2, b);
  }
  for (s.reverse(), m = -1; ++m < s.length; )
    c[y + s[m][0]] = y + s[m][1], y += s[m][1] - s[m][0] - 1;
  return c;
}
const Ol = {
  resolve: Ml,
  tokenize: Rl
}, Dl = {
  partial: !0,
  tokenize: Fl
};
function Ml(e) {
  return yr(e), e;
}
function Rl(e, n) {
  let t;
  return r;
  function r(a) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? l(a) : A(a) ? e.check(Dl, o, l)(a) : (e.consume(a), i);
  }
  function l(a) {
    return e.exit("chunkContent"), e.exit("content"), n(a);
  }
  function o(a) {
    return e.consume(a), e.exit("chunkContent"), t.next = e.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, i;
  }
}
function Fl(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), W(e, l, "linePrefix");
  }
  function l(o) {
    if (o === null || A(o))
      return t(o);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(o) : e.interrupt(r.parser.constructs.flow, t, n)(o);
  }
}
function xr(e, n, t, r, i, l, o, a, s) {
  const c = s || Number.POSITIVE_INFINITY;
  let u = 0;
  return h;
  function h(b) {
    return b === 60 ? (e.enter(r), e.enter(i), e.enter(l), e.consume(b), e.exit(l), m) : b === null || b === 32 || b === 41 || Bn(b) ? t(b) : (e.enter(r), e.enter(o), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), x(b));
  }
  function m(b) {
    return b === 62 ? (e.enter(l), e.consume(b), e.exit(l), e.exit(i), e.exit(r), n) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), p(b));
  }
  function p(b) {
    return b === 62 ? (e.exit("chunkString"), e.exit(a), m(b)) : b === null || b === 60 || A(b) ? t(b) : (e.consume(b), b === 92 ? y : p);
  }
  function y(b) {
    return b === 60 || b === 62 || b === 92 ? (e.consume(b), p) : p(b);
  }
  function x(b) {
    return !u && (b === null || b === 41 || ue(b)) ? (e.exit("chunkString"), e.exit(a), e.exit(o), e.exit(r), n(b)) : u < c && b === 40 ? (e.consume(b), u++, x) : b === 41 ? (e.consume(b), u--, x) : b === null || b === 32 || b === 40 || Bn(b) ? t(b) : (e.consume(b), b === 92 ? I : x);
  }
  function I(b) {
    return b === 40 || b === 41 || b === 92 ? (e.consume(b), x) : x(b);
  }
}
function wr(e, n, t, r, i, l) {
  const o = this;
  let a = 0, s;
  return c;
  function c(p) {
    return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(l), u;
  }
  function u(p) {
    return a > 999 || p === null || p === 91 || p === 93 && !s || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !a && "_hiddenFootnoteSupport" in o.parser.constructs ? t(p) : p === 93 ? (e.exit(l), e.enter(i), e.consume(p), e.exit(i), e.exit(r), n) : A(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), h(p));
  }
  function h(p) {
    return p === null || p === 91 || p === 93 || A(p) || a++ > 999 ? (e.exit("chunkString"), u(p)) : (e.consume(p), s || (s = !F(p)), p === 92 ? m : h);
  }
  function m(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), a++, h) : h(p);
  }
}
function kr(e, n, t, r, i, l) {
  let o;
  return a;
  function a(m) {
    return m === 34 || m === 39 || m === 40 ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), o = m === 40 ? 41 : m, s) : t(m);
  }
  function s(m) {
    return m === o ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), n) : (e.enter(l), c(m));
  }
  function c(m) {
    return m === o ? (e.exit(l), s(o)) : m === null ? t(m) : A(m) ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), W(e, c, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), u(m));
  }
  function u(m) {
    return m === o || m === null || A(m) ? (e.exit("chunkString"), c(m)) : (e.consume(m), m === 92 ? h : u);
  }
  function h(m) {
    return m === o || m === 92 ? (e.consume(m), u) : u(m);
  }
}
function Je(e, n) {
  let t;
  return r;
  function r(i) {
    return A(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), t = !0, r) : F(i) ? W(e, r, t ? "linePrefix" : "lineSuffix")(i) : n(i);
  }
}
const Bl = {
  name: "definition",
  tokenize: Hl
}, jl = {
  partial: !0,
  tokenize: Vl
};
function Hl(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(p) {
    return e.enter("definition"), o(p);
  }
  function o(p) {
    return wr.call(
      r,
      e,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(p);
  }
  function a(p) {
    return i = Ve(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), s) : t(p);
  }
  function s(p) {
    return ue(p) ? Je(e, c)(p) : c(p);
  }
  function c(p) {
    return xr(
      e,
      u,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(p);
  }
  function u(p) {
    return e.attempt(jl, h, h)(p);
  }
  function h(p) {
    return F(p) ? W(e, m, "whitespace")(p) : m(p);
  }
  function m(p) {
    return p === null || A(p) ? (e.exit("definition"), r.parser.defined.push(i), n(p)) : t(p);
  }
}
function Vl(e, n, t) {
  return r;
  function r(a) {
    return ue(a) ? Je(e, i)(a) : t(a);
  }
  function i(a) {
    return kr(e, l, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function l(a) {
    return F(a) ? W(e, o, "whitespace")(a) : o(a);
  }
  function o(a) {
    return a === null || A(a) ? n(a) : t(a);
  }
}
const Ul = {
  name: "hardBreakEscape",
  tokenize: ql
};
function ql(e, n, t) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return A(l) ? (e.exit("hardBreakEscape"), n(l)) : t(l);
  }
}
const $l = {
  name: "headingAtx",
  resolve: Wl,
  tokenize: Xl
};
function Wl(e, n) {
  let t = e.length - 2, r = 3, i, l;
  return e[r][1].type === "whitespace" && (r += 2), t - 2 > r && e[t][1].type === "whitespace" && (t -= 2), e[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && e[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[t][1].end
  }, l = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[t][1].end,
    contentType: "text"
  }, Ee(e, r, t - r + 1, [["enter", i, n], ["enter", l, n], ["exit", l, n], ["exit", i, n]])), e;
}
function Xl(e, n, t) {
  let r = 0;
  return i;
  function i(u) {
    return e.enter("atxHeading"), l(u);
  }
  function l(u) {
    return e.enter("atxHeadingSequence"), o(u);
  }
  function o(u) {
    return u === 35 && r++ < 6 ? (e.consume(u), o) : u === null || ue(u) ? (e.exit("atxHeadingSequence"), a(u)) : t(u);
  }
  function a(u) {
    return u === 35 ? (e.enter("atxHeadingSequence"), s(u)) : u === null || A(u) ? (e.exit("atxHeading"), n(u)) : F(u) ? W(e, a, "whitespace")(u) : (e.enter("atxHeadingText"), c(u));
  }
  function s(u) {
    return u === 35 ? (e.consume(u), s) : (e.exit("atxHeadingSequence"), a(u));
  }
  function c(u) {
    return u === null || u === 35 || ue(u) ? (e.exit("atxHeadingText"), a(u)) : (e.consume(u), c);
  }
}
const Yl = [
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
], _t = ["pre", "script", "style", "textarea"], Kl = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Gl,
  tokenize: Zl
}, Ql = {
  partial: !0,
  tokenize: no
}, Jl = {
  partial: !0,
  tokenize: eo
};
function Gl(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function Zl(e, n, t) {
  const r = this;
  let i, l, o, a, s;
  return c;
  function c(d) {
    return u(d);
  }
  function u(d) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(d), h;
  }
  function h(d) {
    return d === 33 ? (e.consume(d), m) : d === 47 ? (e.consume(d), l = !0, x) : d === 63 ? (e.consume(d), i = 3, r.interrupt ? n : f) : Ce(d) ? (e.consume(d), o = String.fromCharCode(d), I) : t(d);
  }
  function m(d) {
    return d === 45 ? (e.consume(d), i = 2, p) : d === 91 ? (e.consume(d), i = 5, a = 0, y) : Ce(d) ? (e.consume(d), i = 4, r.interrupt ? n : f) : t(d);
  }
  function p(d) {
    return d === 45 ? (e.consume(d), r.interrupt ? n : f) : t(d);
  }
  function y(d) {
    const he = "CDATA[";
    return d === he.charCodeAt(a++) ? (e.consume(d), a === he.length ? r.interrupt ? n : N : y) : t(d);
  }
  function x(d) {
    return Ce(d) ? (e.consume(d), o = String.fromCharCode(d), I) : t(d);
  }
  function I(d) {
    if (d === null || d === 47 || d === 62 || ue(d)) {
      const he = d === 47, _e = o.toLowerCase();
      return !he && !l && _t.includes(_e) ? (i = 1, r.interrupt ? n(d) : N(d)) : Yl.includes(o.toLowerCase()) ? (i = 6, he ? (e.consume(d), b) : r.interrupt ? n(d) : N(d)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(d) : l ? v(d) : T(d));
    }
    return d === 45 || ge(d) ? (e.consume(d), o += String.fromCharCode(d), I) : t(d);
  }
  function b(d) {
    return d === 62 ? (e.consume(d), r.interrupt ? n : N) : t(d);
  }
  function v(d) {
    return F(d) ? (e.consume(d), v) : j(d);
  }
  function T(d) {
    return d === 47 ? (e.consume(d), j) : d === 58 || d === 95 || Ce(d) ? (e.consume(d), H) : F(d) ? (e.consume(d), T) : j(d);
  }
  function H(d) {
    return d === 45 || d === 46 || d === 58 || d === 95 || ge(d) ? (e.consume(d), H) : U(d);
  }
  function U(d) {
    return d === 61 ? (e.consume(d), w) : F(d) ? (e.consume(d), U) : T(d);
  }
  function w(d) {
    return d === null || d === 60 || d === 61 || d === 62 || d === 96 ? t(d) : d === 34 || d === 39 ? (e.consume(d), s = d, R) : F(d) ? (e.consume(d), w) : K(d);
  }
  function R(d) {
    return d === s ? (e.consume(d), s = null, B) : d === null || A(d) ? t(d) : (e.consume(d), R);
  }
  function K(d) {
    return d === null || d === 34 || d === 39 || d === 47 || d === 60 || d === 61 || d === 62 || d === 96 || ue(d) ? U(d) : (e.consume(d), K);
  }
  function B(d) {
    return d === 47 || d === 62 || F(d) ? T(d) : t(d);
  }
  function j(d) {
    return d === 62 ? (e.consume(d), P) : t(d);
  }
  function P(d) {
    return d === null || A(d) ? N(d) : F(d) ? (e.consume(d), P) : t(d);
  }
  function N(d) {
    return d === 45 && i === 2 ? (e.consume(d), ne) : d === 60 && i === 1 ? (e.consume(d), J) : d === 62 && i === 4 ? (e.consume(d), X) : d === 63 && i === 3 ? (e.consume(d), f) : d === 93 && i === 5 ? (e.consume(d), oe) : A(d) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Ql, pe, M)(d)) : d === null || A(d) ? (e.exit("htmlFlowData"), M(d)) : (e.consume(d), N);
  }
  function M(d) {
    return e.check(Jl, Q, pe)(d);
  }
  function Q(d) {
    return e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), z;
  }
  function z(d) {
    return d === null || A(d) ? M(d) : (e.enter("htmlFlowData"), N(d));
  }
  function ne(d) {
    return d === 45 ? (e.consume(d), f) : N(d);
  }
  function J(d) {
    return d === 47 ? (e.consume(d), o = "", re) : N(d);
  }
  function re(d) {
    if (d === 62) {
      const he = o.toLowerCase();
      return _t.includes(he) ? (e.consume(d), X) : N(d);
    }
    return Ce(d) && o.length < 8 ? (e.consume(d), o += String.fromCharCode(d), re) : N(d);
  }
  function oe(d) {
    return d === 93 ? (e.consume(d), f) : N(d);
  }
  function f(d) {
    return d === 62 ? (e.consume(d), X) : d === 45 && i === 2 ? (e.consume(d), f) : N(d);
  }
  function X(d) {
    return d === null || A(d) ? (e.exit("htmlFlowData"), pe(d)) : (e.consume(d), X);
  }
  function pe(d) {
    return e.exit("htmlFlow"), n(d);
  }
}
function eo(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return A(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l) : t(o);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o);
  }
}
function no(e, n, t) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(gn, n, t);
  }
}
const to = {
  name: "htmlText",
  tokenize: ro
};
function ro(e, n, t) {
  const r = this;
  let i, l, o;
  return a;
  function a(f) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(f), s;
  }
  function s(f) {
    return f === 33 ? (e.consume(f), c) : f === 47 ? (e.consume(f), U) : f === 63 ? (e.consume(f), T) : Ce(f) ? (e.consume(f), K) : t(f);
  }
  function c(f) {
    return f === 45 ? (e.consume(f), u) : f === 91 ? (e.consume(f), l = 0, y) : Ce(f) ? (e.consume(f), v) : t(f);
  }
  function u(f) {
    return f === 45 ? (e.consume(f), p) : t(f);
  }
  function h(f) {
    return f === null ? t(f) : f === 45 ? (e.consume(f), m) : A(f) ? (o = h, J(f)) : (e.consume(f), h);
  }
  function m(f) {
    return f === 45 ? (e.consume(f), p) : h(f);
  }
  function p(f) {
    return f === 62 ? ne(f) : f === 45 ? m(f) : h(f);
  }
  function y(f) {
    const X = "CDATA[";
    return f === X.charCodeAt(l++) ? (e.consume(f), l === X.length ? x : y) : t(f);
  }
  function x(f) {
    return f === null ? t(f) : f === 93 ? (e.consume(f), I) : A(f) ? (o = x, J(f)) : (e.consume(f), x);
  }
  function I(f) {
    return f === 93 ? (e.consume(f), b) : x(f);
  }
  function b(f) {
    return f === 62 ? ne(f) : f === 93 ? (e.consume(f), b) : x(f);
  }
  function v(f) {
    return f === null || f === 62 ? ne(f) : A(f) ? (o = v, J(f)) : (e.consume(f), v);
  }
  function T(f) {
    return f === null ? t(f) : f === 63 ? (e.consume(f), H) : A(f) ? (o = T, J(f)) : (e.consume(f), T);
  }
  function H(f) {
    return f === 62 ? ne(f) : T(f);
  }
  function U(f) {
    return Ce(f) ? (e.consume(f), w) : t(f);
  }
  function w(f) {
    return f === 45 || ge(f) ? (e.consume(f), w) : R(f);
  }
  function R(f) {
    return A(f) ? (o = R, J(f)) : F(f) ? (e.consume(f), R) : ne(f);
  }
  function K(f) {
    return f === 45 || ge(f) ? (e.consume(f), K) : f === 47 || f === 62 || ue(f) ? B(f) : t(f);
  }
  function B(f) {
    return f === 47 ? (e.consume(f), ne) : f === 58 || f === 95 || Ce(f) ? (e.consume(f), j) : A(f) ? (o = B, J(f)) : F(f) ? (e.consume(f), B) : ne(f);
  }
  function j(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || ge(f) ? (e.consume(f), j) : P(f);
  }
  function P(f) {
    return f === 61 ? (e.consume(f), N) : A(f) ? (o = P, J(f)) : F(f) ? (e.consume(f), P) : B(f);
  }
  function N(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? t(f) : f === 34 || f === 39 ? (e.consume(f), i = f, M) : A(f) ? (o = N, J(f)) : F(f) ? (e.consume(f), N) : (e.consume(f), Q);
  }
  function M(f) {
    return f === i ? (e.consume(f), i = void 0, z) : f === null ? t(f) : A(f) ? (o = M, J(f)) : (e.consume(f), M);
  }
  function Q(f) {
    return f === null || f === 34 || f === 39 || f === 60 || f === 61 || f === 96 ? t(f) : f === 47 || f === 62 || ue(f) ? B(f) : (e.consume(f), Q);
  }
  function z(f) {
    return f === 47 || f === 62 || ue(f) ? B(f) : t(f);
  }
  function ne(f) {
    return f === 62 ? (e.consume(f), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(f);
  }
  function J(f) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), re;
  }
  function re(f) {
    return F(f) ? W(e, oe, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : oe(f);
  }
  function oe(f) {
    return e.enter("htmlTextData"), o(f);
  }
}
const et = {
  name: "labelEnd",
  resolveAll: ao,
  resolveTo: so,
  tokenize: uo
}, io = {
  tokenize: co
}, lo = {
  tokenize: po
}, oo = {
  tokenize: ho
};
function ao(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += i;
    }
  }
  return e.length !== t.length && Ee(e, 0, e.length, t), e;
}
function so(e, n) {
  let t = e.length, r = 0, i, l, o, a;
  for (; t--; )
    if (i = e[t][1], l) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (o) {
      if (e[t][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (l = t, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (o = t);
  const s = {
    type: e[l][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, c = {
    type: "label",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[o][1].end
    }
  }, u = {
    type: "labelText",
    start: {
      ...e[l + r + 2][1].end
    },
    end: {
      ...e[o - 2][1].start
    }
  };
  return a = [["enter", s, n], ["enter", c, n]], a = ye(a, e.slice(l + 1, l + r + 3)), a = ye(a, [["enter", u, n]]), a = ye(a, Zn(n.parser.constructs.insideSpan.null, e.slice(l + r + 4, o - 3), n)), a = ye(a, [["exit", u, n], e[o - 2], e[o - 1], ["exit", c, n]]), a = ye(a, e.slice(o + 1)), a = ye(a, [["exit", s, n]]), Ee(e, l, e.length, a), e;
}
function uo(e, n, t) {
  const r = this;
  let i = r.events.length, l, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      l = r.events[i][1];
      break;
    }
  return a;
  function a(m) {
    return l ? l._inactive ? h(m) : (o = r.parser.defined.includes(Ve(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(m), e.exit("labelMarker"), e.exit("labelEnd"), s) : t(m);
  }
  function s(m) {
    return m === 40 ? e.attempt(io, u, o ? u : h)(m) : m === 91 ? e.attempt(lo, u, o ? c : h)(m) : o ? u(m) : h(m);
  }
  function c(m) {
    return e.attempt(oo, u, h)(m);
  }
  function u(m) {
    return n(m);
  }
  function h(m) {
    return l._balanced = !0, t(m);
  }
}
function co(e, n, t) {
  return r;
  function r(h) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(h), e.exit("resourceMarker"), i;
  }
  function i(h) {
    return ue(h) ? Je(e, l)(h) : l(h);
  }
  function l(h) {
    return h === 41 ? u(h) : xr(e, o, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(h);
  }
  function o(h) {
    return ue(h) ? Je(e, s)(h) : u(h);
  }
  function a(h) {
    return t(h);
  }
  function s(h) {
    return h === 34 || h === 39 || h === 40 ? kr(e, c, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(h) : u(h);
  }
  function c(h) {
    return ue(h) ? Je(e, u)(h) : u(h);
  }
  function u(h) {
    return h === 41 ? (e.enter("resourceMarker"), e.consume(h), e.exit("resourceMarker"), e.exit("resource"), n) : t(h);
  }
}
function po(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return wr.call(r, e, l, o, "reference", "referenceMarker", "referenceString")(a);
  }
  function l(a) {
    return r.parser.defined.includes(Ve(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(a) : t(a);
  }
  function o(a) {
    return t(a);
  }
}
function ho(e, n, t) {
  return r;
  function r(l) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), i;
  }
  function i(l) {
    return l === 93 ? (e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), e.exit("reference"), n) : t(l);
  }
}
const fo = {
  name: "labelStartImage",
  resolveAll: et.resolveAll,
  tokenize: mo
};
function mo(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), l;
  }
  function l(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), o) : t(a);
  }
  function o(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(a) : n(a);
  }
}
const go = {
  name: "labelStartLink",
  resolveAll: et.resolveAll,
  tokenize: yo
};
function yo(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), l;
  }
  function l(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(o) : n(o);
  }
}
const _n = {
  name: "lineEnding",
  tokenize: xo
};
function xo(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), W(e, n, "linePrefix");
  }
}
const cn = {
  name: "thematicBreak",
  tokenize: wo
};
function wo(e, n, t) {
  let r = 0, i;
  return l;
  function l(c) {
    return e.enter("thematicBreak"), o(c);
  }
  function o(c) {
    return i = c, a(c);
  }
  function a(c) {
    return c === i ? (e.enter("thematicBreakSequence"), s(c)) : r >= 3 && (c === null || A(c)) ? (e.exit("thematicBreak"), n(c)) : t(c);
  }
  function s(c) {
    return c === i ? (e.consume(c), r++, s) : (e.exit("thematicBreakSequence"), F(c) ? W(e, a, "whitespace")(c) : a(c));
  }
}
const ae = {
  continuation: {
    tokenize: Co
  },
  exit: _o,
  name: "list",
  tokenize: So
}, ko = {
  partial: !0,
  tokenize: Io
}, bo = {
  partial: !0,
  tokenize: Eo
};
function So(e, n, t) {
  const r = this, i = r.events[r.events.length - 1];
  let l = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return a;
  function a(p) {
    const y = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (y === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : jn(p)) {
      if (r.containerState.type || (r.containerState.type = y, e.enter(y, {
        _container: !0
      })), y === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(cn, t, c)(p) : c(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(p);
    }
    return t(p);
  }
  function s(p) {
    return jn(p) && ++o < 10 ? (e.consume(p), s) : (!r.interrupt || o < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), c(p)) : t(p);
  }
  function c(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      gn,
      // Can’t be empty when interrupting.
      r.interrupt ? t : u,
      e.attempt(ko, m, h)
    );
  }
  function u(p) {
    return r.containerState.initialBlankLine = !0, l++, m(p);
  }
  function h(p) {
    return F(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), m) : t(p);
  }
  function m(p) {
    return r.containerState.size = l + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, n(p);
  }
}
function Co(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(gn, i, l);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, W(e, n, "listItemIndent", r.containerState.size + 1)(a);
  }
  function l(a) {
    return r.containerState.furtherBlankLines || !F(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(bo, n, o)(a));
  }
  function o(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, W(e, e.attempt(ae, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function Eo(e, n, t) {
  const r = this;
  return W(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? n(l) : t(l);
  }
}
function _o(e) {
  e.exit(this.containerState.type);
}
function Io(e, n, t) {
  const r = this;
  return W(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return !F(l) && o && o[1].type === "listItemPrefixWhitespace" ? n(l) : t(l);
  }
}
const It = {
  name: "setextUnderline",
  resolveTo: To,
  tokenize: Po
};
function To(e, n) {
  let t = e.length, r, i, l;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (i = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1), !l && e[t][1].type === "definition" && (l = t);
  const o = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", l ? (e.splice(i, 0, ["enter", o, n]), e.splice(l + 1, 0, ["exit", e[r][1], n]), e[r][1].end = {
    ...e[l][1].end
  }) : e[r][1] = o, e.push(["exit", o, n]), e;
}
function Po(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(c) {
    let u = r.events.length, h;
    for (; u--; )
      if (r.events[u][1].type !== "lineEnding" && r.events[u][1].type !== "linePrefix" && r.events[u][1].type !== "content") {
        h = r.events[u][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || h) ? (e.enter("setextHeadingLine"), i = c, o(c)) : t(c);
  }
  function o(c) {
    return e.enter("setextHeadingLineSequence"), a(c);
  }
  function a(c) {
    return c === i ? (e.consume(c), a) : (e.exit("setextHeadingLineSequence"), F(c) ? W(e, s, "lineSuffix")(c) : s(c));
  }
  function s(c) {
    return c === null || A(c) ? (e.exit("setextHeadingLine"), n(c)) : t(c);
  }
}
const No = {
  tokenize: Ao
};
function Ao(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    gn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, W(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Ol, i)), "linePrefix"))
  );
  return t;
  function r(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(l), e.exit("lineEndingBlank"), n.currentConstruct = void 0, t;
  }
  function i(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), n.currentConstruct = void 0, t;
  }
}
const vo = {
  resolveAll: Sr()
}, Lo = br("string"), zo = br("text");
function br(e) {
  return {
    resolveAll: Sr(e === "text" ? Oo : void 0),
    tokenize: n
  };
  function n(t) {
    const r = this, i = this.parser.constructs[e], l = t.attempt(i, o, a);
    return o;
    function o(u) {
      return c(u) ? l(u) : a(u);
    }
    function a(u) {
      if (u === null) {
        t.consume(u);
        return;
      }
      return t.enter("data"), t.consume(u), s;
    }
    function s(u) {
      return c(u) ? (t.exit("data"), l(u)) : (t.consume(u), s);
    }
    function c(u) {
      if (u === null)
        return !0;
      const h = i[u];
      let m = -1;
      if (h)
        for (; ++m < h.length; ) {
          const p = h[m];
          if (!p.previous || p.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Sr(e) {
  return n;
  function n(t, r) {
    let i = -1, l;
    for (; ++i <= t.length; )
      l === void 0 ? t[i] && t[i][1].type === "data" && (l = i, i++) : (!t[i] || t[i][1].type !== "data") && (i !== l + 2 && (t[l][1].end = t[i - 1][1].end, t.splice(l + 2, i - l - 2), i = l + 2), l = void 0);
    return e ? e(t, r) : t;
  }
}
function Oo(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === "lineEnding") && e[t - 1][1].type === "data") {
      const r = e[t - 1][1], i = n.sliceStream(r);
      let l = i.length, o = -1, a = 0, s;
      for (; l--; ) {
        const c = i[l];
        if (typeof c == "string") {
          for (o = c.length; c.charCodeAt(o - 1) === 32; )
            a++, o--;
          if (o) break;
          o = -1;
        } else if (c === -2)
          s = !0, a++;
        else if (c !== -1) {
          l++;
          break;
        }
      }
      if (n._contentTypeTextTrailing && t === e.length && (a = 0), a) {
        const c = {
          type: t === e.length || s || a < 2 ? "lineSuffix" : "hardBreakTrailing",
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
          ...c.start
        }, r.start.offset === r.end.offset ? Object.assign(r, c) : (e.splice(t, 0, ["enter", c, n], ["exit", c, n]), t += 2);
      }
      t++;
    }
  return e;
}
const Do = {
  42: ae,
  43: ae,
  45: ae,
  48: ae,
  49: ae,
  50: ae,
  51: ae,
  52: ae,
  53: ae,
  54: ae,
  55: ae,
  56: ae,
  57: ae,
  62: dr
}, Mo = {
  91: Bl
}, Ro = {
  [-2]: En,
  [-1]: En,
  32: En
}, Fo = {
  35: $l,
  42: cn,
  45: [It, cn],
  60: Kl,
  61: It,
  95: cn,
  96: Et,
  126: Et
}, Bo = {
  38: gr,
  92: mr
}, jo = {
  [-5]: _n,
  [-4]: _n,
  [-3]: _n,
  33: fo,
  38: gr,
  42: Hn,
  60: [ml, to],
  91: go,
  92: [Ul, mr],
  93: et,
  95: Hn,
  96: Pl
}, Ho = {
  null: [Hn, vo]
}, Vo = {
  null: [42, 95]
}, Uo = {
  null: []
}, qo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Vo,
  contentInitial: Mo,
  disable: Uo,
  document: Do,
  flow: Fo,
  flowInitial: Ro,
  insideSpan: Ho,
  string: Bo,
  text: jo
}, Symbol.toStringTag, { value: "Module" }));
function $o(e, n, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const i = {}, l = [];
  let o = [], a = [];
  const s = {
    attempt: R(U),
    check: R(w),
    consume: v,
    enter: T,
    exit: H,
    interrupt: R(w, {
      interrupt: !0
    })
  }, c = {
    code: null,
    containerState: {},
    defineSkip: x,
    events: [],
    now: y,
    parser: e,
    previous: null,
    sliceSerialize: m,
    sliceStream: p,
    write: h
  };
  let u = n.tokenize.call(c, s);
  return n.resolveAll && l.push(n), c;
  function h(P) {
    return o = ye(o, P), I(), o[o.length - 1] !== null ? [] : (K(n, 0), c.events = Zn(l, c.events, c), c.events);
  }
  function m(P, N) {
    return Xo(p(P), N);
  }
  function p(P) {
    return Wo(o, P);
  }
  function y() {
    const {
      _bufferIndex: P,
      _index: N,
      line: M,
      column: Q,
      offset: z
    } = r;
    return {
      _bufferIndex: P,
      _index: N,
      line: M,
      column: Q,
      offset: z
    };
  }
  function x(P) {
    i[P.line] = P.column, j();
  }
  function I() {
    let P;
    for (; r._index < o.length; ) {
      const N = o[r._index];
      if (typeof N == "string")
        for (P = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === P && r._bufferIndex < N.length; )
          b(N.charCodeAt(r._bufferIndex));
      else
        b(N);
    }
  }
  function b(P) {
    u = u(P);
  }
  function v(P) {
    A(P) ? (r.line++, r.column = 1, r.offset += P === -3 ? 2 : 1, j()) : P !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = P;
  }
  function T(P, N) {
    const M = N || {};
    return M.type = P, M.start = y(), c.events.push(["enter", M, c]), a.push(M), M;
  }
  function H(P) {
    const N = a.pop();
    return N.end = y(), c.events.push(["exit", N, c]), N;
  }
  function U(P, N) {
    K(P, N.from);
  }
  function w(P, N) {
    N.restore();
  }
  function R(P, N) {
    return M;
    function M(Q, z, ne) {
      let J, re, oe, f;
      return Array.isArray(Q) ? (
        /* c8 ignore next 1 */
        pe(Q)
      ) : "tokenize" in Q ? (
        // Looks like a construct.
        pe([
          /** @type {Construct} */
          Q
        ])
      ) : X(Q);
      function X(te) {
        return Le;
        function Le(fe) {
          const Ie = fe !== null && te[fe], ze = fe !== null && te.null, Fe = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ie) ? Ie : Ie ? [Ie] : [],
            ...Array.isArray(ze) ? ze : ze ? [ze] : []
          ];
          return pe(Fe)(fe);
        }
      }
      function pe(te) {
        return J = te, re = 0, te.length === 0 ? ne : d(te[re]);
      }
      function d(te) {
        return Le;
        function Le(fe) {
          return f = B(), oe = te, te.partial || (c.currentConstruct = te), te.name && c.parser.constructs.disable.null.includes(te.name) ? _e() : te.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            N ? Object.assign(Object.create(c), N) : c,
            s,
            he,
            _e
          )(fe);
        }
      }
      function he(te) {
        return P(oe, f), z;
      }
      function _e(te) {
        return f.restore(), ++re < J.length ? d(J[re]) : ne;
      }
    }
  }
  function K(P, N) {
    P.resolveAll && !l.includes(P) && l.push(P), P.resolve && Ee(c.events, N, c.events.length - N, P.resolve(c.events.slice(N), c)), P.resolveTo && (c.events = P.resolveTo(c.events, c));
  }
  function B() {
    const P = y(), N = c.previous, M = c.currentConstruct, Q = c.events.length, z = Array.from(a);
    return {
      from: Q,
      restore: ne
    };
    function ne() {
      r = P, c.previous = N, c.currentConstruct = M, c.events.length = Q, a = z, j();
    }
  }
  function j() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Wo(e, n) {
  const t = n.start._index, r = n.start._bufferIndex, i = n.end._index, l = n.end._bufferIndex;
  let o;
  if (t === i)
    o = [e[t].slice(r, l)];
  else {
    if (o = e.slice(t, i), r > -1) {
      const a = o[0];
      typeof a == "string" ? o[0] = a.slice(r) : o.shift();
    }
    l > 0 && o.push(e[i].slice(0, l));
  }
  return o;
}
function Xo(e, n) {
  let t = -1;
  const r = [];
  let i;
  for (; ++t < e.length; ) {
    const l = e[t];
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
        o = n ? " " : "	";
        break;
      }
      case -1: {
        if (!n && i) continue;
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
function Yo(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      el([qo, ...(e || {}).extensions || []])
    ),
    content: i(sl),
    defined: [],
    document: i(cl),
    flow: i(No),
    lazy: {},
    string: i(Lo),
    text: i(zo)
  };
  return r;
  function i(l) {
    return o;
    function o(a) {
      return $o(r, l, a);
    }
  }
}
function Ko(e) {
  for (; !yr(e); )
    ;
  return e;
}
const Tt = /[\0\t\n\r]/g;
function Qo() {
  let e = 1, n = "", t = !0, r;
  return i;
  function i(l, o, a) {
    const s = [];
    let c, u, h, m, p;
    for (l = n + (typeof l == "string" ? l.toString() : new TextDecoder(o || void 0).decode(l)), h = 0, n = "", t && (l.charCodeAt(0) === 65279 && h++, t = void 0); h < l.length; ) {
      if (Tt.lastIndex = h, c = Tt.exec(l), m = c && c.index !== void 0 ? c.index : l.length, p = l.charCodeAt(m), !c) {
        n = l.slice(h);
        break;
      }
      if (p === 10 && h === m && r)
        s.push(-3), r = void 0;
      else
        switch (r && (s.push(-5), r = void 0), h < m && (s.push(l.slice(h, m)), e += m - h), p) {
          case 0: {
            s.push(65533), e++;
            break;
          }
          case 9: {
            for (u = Math.ceil(e / 4) * 4, s.push(-2); e++ < u; ) s.push(-1);
            break;
          }
          case 10: {
            s.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      h = m + 1;
    }
    return a && (r && s.push(-5), n && s.push(n), s.push(null)), s;
  }
}
const Jo = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Go(e) {
  return e.replace(Jo, Zo);
}
function Zo(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1), l = i === 120 || i === 88;
    return fr(t.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return Gn(t) || e;
}
const Cr = {}.hasOwnProperty;
function ea(e, n, t) {
  return typeof n != "string" && (t = n, n = void 0), na(t)(Ko(Yo(t).document().write(Qo()(e, n, !0))));
}
function na(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(q),
      autolinkProtocol: B,
      autolinkEmail: B,
      atxHeading: l(rn),
      blockQuote: l(ze),
      characterEscape: B,
      characterReference: B,
      codeFenced: l(Fe),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l(Fe, o),
      codeText: l(wn, o),
      codeTextData: B,
      data: B,
      codeFlowValue: B,
      definition: l(tn),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(kn),
      hardBreakEscape: l(ln),
      hardBreakTrailing: l(ln),
      htmlFlow: l(S, o),
      htmlFlowData: B,
      htmlText: l(S, o),
      htmlTextData: B,
      image: l(_),
      label: o,
      link: l(q),
      listItem: l(Te),
      listItemValue: m,
      listOrdered: l(Z, h),
      listUnordered: l(Z),
      paragraph: l(G),
      reference: d,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: l(rn),
      strong: l(xe),
      thematicBreak: l(Oe)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: U,
      autolink: s(),
      autolinkEmail: Ie,
      autolinkProtocol: fe,
      blockQuote: s(),
      characterEscapeValue: j,
      characterReferenceMarkerHexadecimal: _e,
      characterReferenceMarkerNumeric: _e,
      characterReferenceValue: te,
      characterReference: Le,
      codeFenced: s(I),
      codeFencedFence: x,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: y,
      codeFlowValue: j,
      codeIndented: s(b),
      codeText: s(z),
      codeTextData: j,
      data: j,
      definition: s(),
      definitionDestinationString: H,
      definitionLabelString: v,
      definitionTitleString: T,
      emphasis: s(),
      hardBreakEscape: s(N),
      hardBreakTrailing: s(N),
      htmlFlow: s(M),
      htmlFlowData: j,
      htmlText: s(Q),
      htmlTextData: j,
      image: s(J),
      label: oe,
      labelText: re,
      lineEnding: P,
      link: s(ne),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: he,
      resourceDestinationString: f,
      resourceTitleString: X,
      resource: pe,
      setextHeading: s(K),
      setextHeadingLineSequence: R,
      setextHeadingText: w,
      strong: s(),
      thematicBreak: s()
    }
  };
  Er(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(g) {
    let E = {
      type: "root",
      children: []
    };
    const L = {
      stack: [E],
      tokenStack: [],
      config: n,
      enter: a,
      exit: c,
      buffer: o,
      resume: u,
      data: t
    }, D = [];
    let V = -1;
    for (; ++V < g.length; )
      if (g[V][1].type === "listOrdered" || g[V][1].type === "listUnordered")
        if (g[V][0] === "enter")
          D.push(V);
        else {
          const ke = D.pop();
          V = i(g, ke, V);
        }
    for (V = -1; ++V < g.length; ) {
      const ke = n[g[V][0]];
      Cr.call(ke, g[V][1].type) && ke[g[V][1].type].call(Object.assign({
        sliceSerialize: g[V][2].sliceSerialize
      }, L), g[V][1]);
    }
    if (L.tokenStack.length > 0) {
      const ke = L.tokenStack[L.tokenStack.length - 1];
      (ke[1] || Pt).call(L, void 0, ke[0]);
    }
    for (E.position = {
      start: Ae(g.length > 0 ? g[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Ae(g.length > 0 ? g[g.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, V = -1; ++V < n.transforms.length; )
      E = n.transforms[V](E) || E;
    return E;
  }
  function i(g, E, L) {
    let D = E - 1, V = -1, ke = !1, De, Pe, $e, We;
    for (; ++D <= L; ) {
      const de = g[D];
      switch (de[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          de[0] === "enter" ? V++ : V--, We = void 0;
          break;
        }
        case "lineEndingBlank": {
          de[0] === "enter" && (De && !We && !V && !$e && ($e = D), We = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          We = void 0;
      }
      if (!V && de[0] === "enter" && de[1].type === "listItemPrefix" || V === -1 && de[0] === "exit" && (de[1].type === "listUnordered" || de[1].type === "listOrdered")) {
        if (De) {
          let Be = D;
          for (Pe = void 0; Be--; ) {
            const Ne = g[Be];
            if (Ne[1].type === "lineEnding" || Ne[1].type === "lineEndingBlank") {
              if (Ne[0] === "exit") continue;
              Pe && (g[Pe][1].type = "lineEndingBlank", ke = !0), Ne[1].type = "lineEnding", Pe = Be;
            } else if (!(Ne[1].type === "linePrefix" || Ne[1].type === "blockQuotePrefix" || Ne[1].type === "blockQuotePrefixWhitespace" || Ne[1].type === "blockQuoteMarker" || Ne[1].type === "listItemIndent")) break;
          }
          $e && (!Pe || $e < Pe) && (De._spread = !0), De.end = Object.assign({}, Pe ? g[Pe][1].start : de[1].end), g.splice(Pe || D, 0, ["exit", De, de[2]]), D++, L++;
        }
        if (de[1].type === "listItemPrefix") {
          const Be = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, de[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          De = Be, g.splice(D, 0, ["enter", Be, de[2]]), D++, L++, $e = void 0, We = !0;
        }
      }
    }
    return g[E][1]._spread = ke, L;
  }
  function l(g, E) {
    return L;
    function L(D) {
      a.call(this, g(D), D), E && E.call(this, D);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(g, E, L) {
    this.stack[this.stack.length - 1].children.push(g), this.stack.push(g), this.tokenStack.push([E, L || void 0]), g.position = {
      start: Ae(E.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(g) {
    return E;
    function E(L) {
      g && g.call(this, L), c.call(this, L);
    }
  }
  function c(g, E) {
    const L = this.stack.pop(), D = this.tokenStack.pop();
    if (D)
      D[0].type !== g.type && (E ? E.call(this, g, D[0]) : (D[1] || Pt).call(this, g, D[0]));
    else throw new Error("Cannot close `" + g.type + "` (" + Qe({
      start: g.start,
      end: g.end
    }) + "): it’s not open");
    L.position.end = Ae(g.end);
  }
  function u() {
    return Gi(this.stack.pop());
  }
  function h() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(g) {
    if (this.data.expectingFirstListItemValue) {
      const E = this.stack[this.stack.length - 2];
      E.start = Number.parseInt(this.sliceSerialize(g), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.lang = g;
  }
  function y() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.meta = g;
  }
  function x() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function I() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = g.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function b() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = g.replace(/(\r?\n|\r)$/g, "");
  }
  function v(g) {
    const E = this.resume(), L = this.stack[this.stack.length - 1];
    L.label = E, L.identifier = Ve(this.sliceSerialize(g)).toLowerCase();
  }
  function T() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = g;
  }
  function H() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = g;
  }
  function U(g) {
    const E = this.stack[this.stack.length - 1];
    if (!E.depth) {
      const L = this.sliceSerialize(g).length;
      E.depth = L;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function R(g) {
    const E = this.stack[this.stack.length - 1];
    E.depth = this.sliceSerialize(g).codePointAt(0) === 61 ? 1 : 2;
  }
  function K() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function B(g) {
    const L = this.stack[this.stack.length - 1].children;
    let D = L[L.length - 1];
    (!D || D.type !== "text") && (D = we(), D.position = {
      start: Ae(g.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, L.push(D)), this.stack.push(D);
  }
  function j(g) {
    const E = this.stack.pop();
    E.value += this.sliceSerialize(g), E.position.end = Ae(g.end);
  }
  function P(g) {
    const E = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const L = E.children[E.children.length - 1];
      L.position.end = Ae(g.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(E.type) && (B.call(this, g), j.call(this, g));
  }
  function N() {
    this.data.atHardBreak = !0;
  }
  function M() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = g;
  }
  function Q() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = g;
  }
  function z() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = g;
  }
  function ne() {
    const g = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      g.type += "Reference", g.referenceType = E, delete g.url, delete g.title;
    } else
      delete g.identifier, delete g.label;
    this.data.referenceType = void 0;
  }
  function J() {
    const g = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      g.type += "Reference", g.referenceType = E, delete g.url, delete g.title;
    } else
      delete g.identifier, delete g.label;
    this.data.referenceType = void 0;
  }
  function re(g) {
    const E = this.sliceSerialize(g), L = this.stack[this.stack.length - 2];
    L.label = Go(E), L.identifier = Ve(E).toLowerCase();
  }
  function oe() {
    const g = this.stack[this.stack.length - 1], E = this.resume(), L = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, L.type === "link") {
      const D = g.children;
      L.children = D;
    } else
      L.alt = E;
  }
  function f() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = g;
  }
  function X() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = g;
  }
  function pe() {
    this.data.inReference = void 0;
  }
  function d() {
    this.data.referenceType = "collapsed";
  }
  function he(g) {
    const E = this.resume(), L = this.stack[this.stack.length - 1];
    L.label = E, L.identifier = Ve(this.sliceSerialize(g)).toLowerCase(), this.data.referenceType = "full";
  }
  function _e(g) {
    this.data.characterReferenceType = g.type;
  }
  function te(g) {
    const E = this.sliceSerialize(g), L = this.data.characterReferenceType;
    let D;
    L ? (D = fr(E, L === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : D = Gn(E);
    const V = this.stack[this.stack.length - 1];
    V.value += D;
  }
  function Le(g) {
    const E = this.stack.pop();
    E.position.end = Ae(g.end);
  }
  function fe(g) {
    j.call(this, g);
    const E = this.stack[this.stack.length - 1];
    E.url = this.sliceSerialize(g);
  }
  function Ie(g) {
    j.call(this, g);
    const E = this.stack[this.stack.length - 1];
    E.url = "mailto:" + this.sliceSerialize(g);
  }
  function ze() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function Fe() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function wn() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function tn() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function kn() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function rn() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function ln() {
    return {
      type: "break"
    };
  }
  function S() {
    return {
      type: "html",
      value: ""
    };
  }
  function _() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function q() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Z(g) {
    return {
      type: "list",
      ordered: g.type === "listOrdered",
      start: null,
      spread: g._spread,
      children: []
    };
  }
  function Te(g) {
    return {
      type: "listItem",
      spread: g._spread,
      checked: null,
      children: []
    };
  }
  function G() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function xe() {
    return {
      type: "strong",
      children: []
    };
  }
  function we() {
    return {
      type: "text",
      value: ""
    };
  }
  function Oe() {
    return {
      type: "thematicBreak"
    };
  }
}
function Ae(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function Er(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? Er(e, r) : ta(e, r);
  }
}
function ta(e, n) {
  let t;
  for (t in n)
    if (Cr.call(n, t))
      switch (t) {
        case "canContainEols": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "transforms": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = n[t];
          r && Object.assign(e[t], r);
          break;
        }
      }
}
function Pt(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Qe({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + Qe({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + Qe({
    start: n.start,
    end: n.end
  }) + ") is still open");
}
function ra(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return ea(r, {
      ...n.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: n.data("micromarkExtensions") || [],
      mdastExtensions: n.data("fromMarkdownExtensions") || []
    });
  }
}
function ia(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function la(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(n, t), [e.applyData(n, t), { type: "text", value: `
` }];
}
function oa(e, n) {
  const t = n.value ? n.value + `
` : "", r = {};
  n.lang && (r.className = ["language-" + n.lang]);
  let i = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: t }]
  };
  return n.meta && (i.data = { meta: n.meta }), e.patch(n, i), i = e.applyData(n, i), i = { type: "element", tagName: "pre", properties: {}, children: [i] }, e.patch(n, i), i;
}
function aa(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function sa(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function ua(e, n) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(n.identifier).toUpperCase(), i = qe(r.toLowerCase()), l = e.footnoteOrder.indexOf(r);
  let o, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = l + 1, a += 1, e.footnoteCounts.set(r, a);
  const s = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + t + "fn-" + i,
      id: t + "fnref-" + i + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(o) }]
  };
  e.patch(n, s);
  const c = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [s]
  };
  return e.patch(n, c), e.applyData(n, c);
}
function ca(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function pa(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function _r(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (n.label || n.identifier) + "]"), n.type === "imageReference")
    return [{ type: "text", value: "![" + n.alt + r }];
  const i = e.all(n), l = i[0];
  l && l.type === "text" ? l.value = "[" + l.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function ha(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return _r(e, n);
  const i = { src: qe(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(n, l), e.applyData(n, l);
}
function fa(e, n) {
  const t = { src: qe(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function da(e, n) {
  const t = { type: "text", value: n.value.replace(/\r?\n|\r/g, " ") };
  e.patch(n, t);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [t]
  };
  return e.patch(n, r), e.applyData(n, r);
}
function ma(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return _r(e, n);
  const i = { href: qe(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(n)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function ga(e, n) {
  const t = { href: qe(n.url) };
  n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: t,
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function ya(e, n, t) {
  const r = e.all(n), i = t ? xa(t) : Ir(n), l = {}, o = [];
  if (typeof n.checked == "boolean") {
    const u = r[0];
    let h;
    u && u.type === "element" && u.tagName === "p" ? h = u : (h = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(h)), h.children.length > 0 && h.children.unshift({ type: "text", value: " " }), h.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: n.checked, disabled: !0 },
      children: []
    }), l.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const u = r[a];
    (i || a !== 0 || u.type !== "element" || u.tagName !== "p") && o.push({ type: "text", value: `
` }), u.type === "element" && u.tagName === "p" && !i ? o.push(...u.children) : o.push(u);
  }
  const s = r[r.length - 1];
  s && (i || s.type !== "element" || s.tagName !== "p") && o.push({ type: "text", value: `
` });
  const c = { type: "element", tagName: "li", properties: l, children: o };
  return e.patch(n, c), e.applyData(n, c);
}
function xa(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; )
      n = Ir(t[r]);
  }
  return n;
}
function Ir(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function wa(e, n) {
  const t = {}, r = e.all(n);
  let i = -1;
  for (typeof n.start == "number" && n.start !== 1 && (t.start = n.start); ++i < r.length; ) {
    const o = r[i];
    if (o.type === "element" && o.tagName === "li" && o.properties && Array.isArray(o.properties.className) && o.properties.className.includes("task-list-item")) {
      t.className = ["contains-task-list"];
      break;
    }
  }
  const l = {
    type: "element",
    tagName: n.ordered ? "ol" : "ul",
    properties: t,
    children: e.wrap(r, !0)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function ka(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function ba(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Sa(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Ca(e, n) {
  const t = e.all(n), r = t.shift(), i = [];
  if (r) {
    const o = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(n.children[0], o), i.push(o);
  }
  if (t.length > 0) {
    const o = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(t, !0)
    }, a = Yn(n.children[1]), s = or(n.children[n.children.length - 1]);
    a && s && (o.position = { start: a, end: s }), i.push(o);
  }
  const l = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function Ea(e, n, t) {
  const r = t ? t.children : void 0, l = (r ? r.indexOf(n) : 1) === 0 ? "th" : "td", o = t && t.type === "table" ? t.align : void 0, a = o ? o.length : n.children.length;
  let s = -1;
  const c = [];
  for (; ++s < a; ) {
    const h = n.children[s], m = {}, p = o ? o[s] : void 0;
    p && (m.align = p);
    let y = { type: "element", tagName: l, properties: m, children: [] };
    h && (y.children = e.all(h), e.patch(h, y), y = e.applyData(h, y)), c.push(y);
  }
  const u = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(c, !0)
  };
  return e.patch(n, u), e.applyData(n, u);
}
function _a(e, n) {
  const t = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Nt = 9, At = 32;
function Ia(e) {
  const n = String(e), t = /\r?\n|\r/g;
  let r = t.exec(n), i = 0;
  const l = [];
  for (; r; )
    l.push(
      vt(n.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = t.exec(n);
  return l.push(vt(n.slice(i), i > 0, !1)), l.join("");
}
function vt(e, n, t) {
  let r = 0, i = e.length;
  if (n) {
    let l = e.codePointAt(r);
    for (; l === Nt || l === At; )
      r++, l = e.codePointAt(r);
  }
  if (t) {
    let l = e.codePointAt(i - 1);
    for (; l === Nt || l === At; )
      i--, l = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function Ta(e, n) {
  const t = { type: "text", value: Ia(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Pa(e, n) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Na = {
  blockquote: ia,
  break: la,
  code: oa,
  delete: aa,
  emphasis: sa,
  footnoteReference: ua,
  heading: ca,
  html: pa,
  imageReference: ha,
  image: fa,
  inlineCode: da,
  linkReference: ma,
  link: ga,
  listItem: ya,
  list: wa,
  paragraph: ka,
  // @ts-expect-error: root is different, but hard to type.
  root: ba,
  strong: Sa,
  table: Ca,
  tableCell: _a,
  tableRow: Ea,
  text: Ta,
  thematicBreak: Pa,
  toml: an,
  yaml: an,
  definition: an,
  footnoteDefinition: an
};
function an() {
}
const Tr = -1, yn = 0, Ge = 1, fn = 2, nt = 3, tt = 4, rt = 5, it = 6, Pr = 7, Nr = 8, Lt = typeof self == "object" ? self : globalThis, Aa = (e, n) => {
  const t = (i, l) => (e.set(l, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [l, o] = n[i];
    switch (l) {
      case yn:
      case Tr:
        return t(o, i);
      case Ge: {
        const a = t([], i);
        for (const s of o)
          a.push(r(s));
        return a;
      }
      case fn: {
        const a = t({}, i);
        for (const [s, c] of o)
          a[r(s)] = r(c);
        return a;
      }
      case nt:
        return t(new Date(o), i);
      case tt: {
        const { source: a, flags: s } = o;
        return t(new RegExp(a, s), i);
      }
      case rt: {
        const a = t(/* @__PURE__ */ new Map(), i);
        for (const [s, c] of o)
          a.set(r(s), r(c));
        return a;
      }
      case it: {
        const a = t(/* @__PURE__ */ new Set(), i);
        for (const s of o)
          a.add(r(s));
        return a;
      }
      case Pr: {
        const { name: a, message: s } = o;
        return t(new Lt[a](s), i);
      }
      case Nr:
        return t(BigInt(o), i);
      case "BigInt":
        return t(Object(BigInt(o)), i);
      case "ArrayBuffer":
        return t(new Uint8Array(o).buffer, o);
      case "DataView": {
        const { buffer: a } = new Uint8Array(o);
        return t(new DataView(a), o);
      }
    }
    return t(new Lt[l](o), i);
  };
  return r;
}, zt = (e) => Aa(/* @__PURE__ */ new Map(), e)(0), je = "", { toString: va } = {}, { keys: La } = Object, Ye = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [yn, n];
  const t = va.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [Ge, je];
    case "Object":
      return [fn, je];
    case "Date":
      return [nt, je];
    case "RegExp":
      return [tt, je];
    case "Map":
      return [rt, je];
    case "Set":
      return [it, je];
    case "DataView":
      return [Ge, t];
  }
  return t.includes("Array") ? [Ge, t] : t.includes("Error") ? [Pr, t] : [fn, t];
}, sn = ([e, n]) => e === yn && (n === "function" || n === "symbol"), za = (e, n, t, r) => {
  const i = (o, a) => {
    const s = r.push(o) - 1;
    return t.set(a, s), s;
  }, l = (o) => {
    if (t.has(o))
      return t.get(o);
    let [a, s] = Ye(o);
    switch (a) {
      case yn: {
        let u = o;
        switch (s) {
          case "bigint":
            a = Nr, u = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            u = null;
            break;
          case "undefined":
            return i([Tr], o);
        }
        return i([a, u], o);
      }
      case Ge: {
        if (s) {
          let m = o;
          return s === "DataView" ? m = new Uint8Array(o.buffer) : s === "ArrayBuffer" && (m = new Uint8Array(o)), i([s, [...m]], o);
        }
        const u = [], h = i([a, u], o);
        for (const m of o)
          u.push(l(m));
        return h;
      }
      case fn: {
        if (s)
          switch (s) {
            case "BigInt":
              return i([s, o.toString()], o);
            case "Boolean":
            case "Number":
            case "String":
              return i([s, o.valueOf()], o);
          }
        if (n && "toJSON" in o)
          return l(o.toJSON());
        const u = [], h = i([a, u], o);
        for (const m of La(o))
          (e || !sn(Ye(o[m]))) && u.push([l(m), l(o[m])]);
        return h;
      }
      case nt:
        return i([a, o.toISOString()], o);
      case tt: {
        const { source: u, flags: h } = o;
        return i([a, { source: u, flags: h }], o);
      }
      case rt: {
        const u = [], h = i([a, u], o);
        for (const [m, p] of o)
          (e || !(sn(Ye(m)) || sn(Ye(p)))) && u.push([l(m), l(p)]);
        return h;
      }
      case it: {
        const u = [], h = i([a, u], o);
        for (const m of o)
          (e || !sn(Ye(m))) && u.push(l(m));
        return h;
      }
    }
    const { message: c } = o;
    return i([a, { name: s, message: c }], o);
  };
  return l;
}, Ot = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return za(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, dn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? zt(Ot(e, n)) : structuredClone(e)
) : (e, n) => zt(Ot(e, n));
function Oa(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return n > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(n) }]
  }), t;
}
function Da(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function Ma(e) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || Oa, r = e.options.footnoteBackLabel || Da, i = e.options.footnoteLabel || "Footnotes", l = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const c = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!c)
      continue;
    const u = e.all(c), h = String(c.identifier).toUpperCase(), m = qe(h.toLowerCase());
    let p = 0;
    const y = [], x = e.footnoteCounts.get(h);
    for (; x !== void 0 && ++p <= x; ) {
      y.length > 0 && y.push({ type: "text", value: " " });
      let v = typeof t == "string" ? t : t(s, p);
      typeof v == "string" && (v = { type: "text", value: v }), y.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + n + "fnref-" + m + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(v) ? v : [v]
      });
    }
    const I = u[u.length - 1];
    if (I && I.type === "element" && I.tagName === "p") {
      const v = I.children[I.children.length - 1];
      v && v.type === "text" ? v.value += " " : I.children.push({ type: "text", value: " " }), I.children.push(...y);
    } else
      u.push(...y);
    const b = {
      type: "element",
      tagName: "li",
      properties: { id: n + "fn-" + m },
      children: e.wrap(u, !0)
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
          tagName: l,
          properties: {
            ...dn(o),
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
const Ar = (
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
      return ja;
    if (typeof e == "function")
      return xn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Ra(e) : Fa(e);
    if (typeof e == "string")
      return Ba(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function Ra(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = Ar(e[t]);
  return xn(r);
  function r(...i) {
    let l = -1;
    for (; ++l < n.length; )
      if (n[l].apply(this, i)) return !0;
    return !1;
  }
}
function Fa(e) {
  const n = (
    /** @type {Record<string, unknown>} */
    e
  );
  return xn(t);
  function t(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let l;
    for (l in e)
      if (i[l] !== n[l]) return !1;
    return !0;
  }
}
function Ba(e) {
  return xn(n);
  function n(t) {
    return t && t.type === e;
  }
}
function xn(e) {
  return n;
  function n(t, r, i) {
    return !!(Ha(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function ja() {
  return !0;
}
function Ha(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const vr = [], Va = !0, Dt = !1, Ua = "skip";
function qa(e, n, t, r) {
  let i;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : i = n;
  const l = Ar(i), o = r ? -1 : 1;
  a(e, void 0, [])();
  function a(s, c, u) {
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
      Object.defineProperty(m, "name", {
        value: "node (" + (s.type + (p ? "<" + p + ">" : "")) + ")"
      });
    }
    return m;
    function m() {
      let p = vr, y, x, I;
      if ((!n || l(s, c, u[u.length - 1] || void 0)) && (p = $a(t(s, u)), p[0] === Dt))
        return p;
      if ("children" in s && s.children) {
        const b = (
          /** @type {UnistParent} */
          s
        );
        if (b.children && p[0] !== Ua)
          for (x = (r ? b.children.length : -1) + o, I = u.concat(b); x > -1 && x < b.children.length; ) {
            const v = b.children[x];
            if (y = a(v, x, I)(), y[0] === Dt)
              return y;
            x = typeof y[1] == "number" ? y[1] : x + o;
          }
      }
      return p;
    }
  }
}
function $a(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Va, e] : e == null ? vr : [e];
}
function Lr(e, n, t, r) {
  let i, l, o;
  typeof n == "function" && typeof t != "function" ? (l = void 0, o = n, i = t) : (l = n, o = t, i = r), qa(e, l, a, i);
  function a(s, c) {
    const u = c[c.length - 1], h = u ? u.children.indexOf(s) : void 0;
    return o(s, h, u);
  }
}
const Vn = {}.hasOwnProperty, Wa = {};
function Xa(e, n) {
  const t = n || Wa, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), o = { ...Na, ...t.handlers }, a = {
    all: c,
    applyData: Ka,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: l,
    footnoteOrder: [],
    handlers: o,
    one: s,
    options: t,
    patch: Ya,
    wrap: Ja
  };
  return Lr(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const h = u.type === "definition" ? r : i, m = String(u.identifier).toUpperCase();
      h.has(m) || h.set(m, u);
    }
  }), a;
  function s(u, h) {
    const m = u.type, p = a.handlers[m];
    if (Vn.call(a.handlers, m) && p)
      return p(a, u, h);
    if (a.options.passThrough && a.options.passThrough.includes(m)) {
      if ("children" in u) {
        const { children: x, ...I } = u, b = dn(I);
        return b.children = a.all(u), b;
      }
      return dn(u);
    }
    return (a.options.unknownHandler || Qa)(a, u, h);
  }
  function c(u) {
    const h = [];
    if ("children" in u) {
      const m = u.children;
      let p = -1;
      for (; ++p < m.length; ) {
        const y = a.one(m[p], u);
        if (y) {
          if (p && m[p - 1].type === "break" && (!Array.isArray(y) && y.type === "text" && (y.value = Mt(y.value)), !Array.isArray(y) && y.type === "element")) {
            const x = y.children[0];
            x && x.type === "text" && (x.value = Mt(x.value));
          }
          Array.isArray(y) ? h.push(...y) : h.push(y);
        }
      }
    }
    return h;
  }
}
function Ya(e, n) {
  e.position && (n.position = Ai(e));
}
function Ka(e, n) {
  let t = n;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, l = e.data.hProperties;
    if (typeof r == "string")
      if (t.type === "element")
        t.tagName = r;
      else {
        const o = "children" in t ? t.children : [t];
        t = { type: "element", tagName: r, properties: {}, children: o };
      }
    t.type === "element" && l && Object.assign(t.properties, dn(l)), "children" in t && t.children && i !== null && i !== void 0 && (t.children = i);
  }
  return t;
}
function Qa(e, n) {
  const t = n.data || {}, r = "value" in n && !(Vn.call(t, "hProperties") || Vn.call(t, "hChildren")) ? { type: "text", value: n.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function Ja(e, n) {
  const t = [];
  let r = -1;
  for (n && t.push({ type: "text", value: `
` }); ++r < e.length; )
    r && t.push({ type: "text", value: `
` }), t.push(e[r]);
  return n && e.length > 0 && t.push({ type: "text", value: `
` }), t;
}
function Mt(e) {
  let n = 0, t = e.charCodeAt(n);
  for (; t === 9 || t === 32; )
    n++, t = e.charCodeAt(n);
  return e.slice(n);
}
function Rt(e, n) {
  const t = Xa(e, n), r = t.one(e, void 0), i = Ma(t), l = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && l.children.push({ type: "text", value: `
` }, i), l;
}
function Ga(e, n) {
  return e && "run" in e ? async function(t, r) {
    const i = (
      /** @type {HastRoot} */
      Rt(t, { file: r, ...n })
    );
    await e.run(i, r);
  } : function(t, r) {
    return (
      /** @type {HastRoot} */
      Rt(t, { file: r, ...e || n })
    );
  };
}
function Ft(e) {
  if (e)
    throw e;
}
var pn = Object.prototype.hasOwnProperty, zr = Object.prototype.toString, Bt = Object.defineProperty, jt = Object.getOwnPropertyDescriptor, Ht = function(n) {
  return typeof Array.isArray == "function" ? Array.isArray(n) : zr.call(n) === "[object Array]";
}, Vt = function(n) {
  if (!n || zr.call(n) !== "[object Object]")
    return !1;
  var t = pn.call(n, "constructor"), r = n.constructor && n.constructor.prototype && pn.call(n.constructor.prototype, "isPrototypeOf");
  if (n.constructor && !t && !r)
    return !1;
  var i;
  for (i in n)
    ;
  return typeof i > "u" || pn.call(n, i);
}, Ut = function(n, t) {
  Bt && t.name === "__proto__" ? Bt(n, t.name, {
    enumerable: !0,
    configurable: !0,
    value: t.newValue,
    writable: !0
  }) : n[t.name] = t.newValue;
}, qt = function(n, t) {
  if (t === "__proto__")
    if (pn.call(n, t)) {
      if (jt)
        return jt(n, t).value;
    } else return;
  return n[t];
}, Za = function e() {
  var n, t, r, i, l, o, a = arguments[0], s = 1, c = arguments.length, u = !1;
  for (typeof a == "boolean" && (u = a, a = arguments[1] || {}, s = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); s < c; ++s)
    if (n = arguments[s], n != null)
      for (t in n)
        r = qt(a, t), i = qt(n, t), a !== i && (u && i && (Vt(i) || (l = Ht(i))) ? (l ? (l = !1, o = r && Ht(r) ? r : []) : o = r && Vt(r) ? r : {}, Ut(a, { name: t, newValue: e(u, o, i) })) : typeof i < "u" && Ut(a, { name: t, newValue: i }));
  return a;
};
const In = /* @__PURE__ */ lr(Za);
function Un(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function es() {
  const e = [], n = { run: t, use: r };
  return n;
  function t(...i) {
    let l = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    a(null, ...i);
    function a(s, ...c) {
      const u = e[++l];
      let h = -1;
      if (s) {
        o(s);
        return;
      }
      for (; ++h < i.length; )
        (c[h] === null || c[h] === void 0) && (c[h] = i[h]);
      i = c, u ? ns(u, a)(...c) : o(null, ...c);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), n;
  }
}
function ns(e, n) {
  let t;
  return r;
  function r(...o) {
    const a = e.length > o.length;
    let s;
    a && o.push(i);
    try {
      s = e.apply(this, o);
    } catch (c) {
      const u = (
        /** @type {Error} */
        c
      );
      if (a && t)
        throw u;
      return i(u);
    }
    a || (s && s.then && typeof s.then == "function" ? s.then(l, i) : s instanceof Error ? i(s) : l(s));
  }
  function i(o, ...a) {
    t || (t = !0, n(o, ...a));
  }
  function l(o) {
    i(null, o);
  }
}
const Se = { basename: ts, dirname: rs, extname: is, join: ls, sep: "/" };
function ts(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  nn(e);
  let t = 0, r = -1, i = e.length, l;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (l) {
          t = i + 1;
          break;
        }
      } else r < 0 && (l = !0, r = i + 1);
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e)
    return "";
  let o = -1, a = n.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (l) {
        t = i + 1;
        break;
      }
    } else
      o < 0 && (l = !0, o = i + 1), a > -1 && (e.codePointAt(i) === n.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = o));
  return t === r ? r = o : r < 0 && (r = e.length), e.slice(t, r);
}
function rs(e) {
  if (nn(e), e.length === 0)
    return ".";
  let n = -1, t = e.length, r;
  for (; --t; )
    if (e.codePointAt(t) === 47) {
      if (r) {
        n = t;
        break;
      }
    } else r || (r = !0);
  return n < 0 ? e.codePointAt(0) === 47 ? "/" : "." : n === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, n);
}
function is(e) {
  nn(e);
  let n = e.length, t = -1, r = 0, i = -1, l = 0, o;
  for (; n--; ) {
    const a = e.codePointAt(n);
    if (a === 47) {
      if (o) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && (o = !0, t = n + 1), a === 46 ? i < 0 ? i = n : l !== 1 && (l = 1) : i > -1 && (l = -1);
  }
  return i < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  l === 0 || // The (right-most) trimmed path component is exactly `..`.
  l === 1 && i === t - 1 && i === r + 1 ? "" : e.slice(i, t);
}
function ls(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    nn(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : os(t);
}
function os(e) {
  nn(e);
  const n = e.codePointAt(0) === 47;
  let t = as(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function as(e, n) {
  let t = "", r = 0, i = -1, l = 0, o = -1, a, s;
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
        if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
          if (t.length > 2) {
            if (s = t.lastIndexOf("/"), s !== t.length - 1) {
              s < 0 ? (t = "", r = 0) : (t = t.slice(0, s), r = t.length - 1 - t.lastIndexOf("/")), i = o, l = 0;
              continue;
            }
          } else if (t.length > 0) {
            t = "", r = 0, i = o, l = 0;
            continue;
          }
        }
        n && (t = t.length > 0 ? t + "/.." : "..", r = 2);
      } else
        t.length > 0 ? t += "/" + e.slice(i + 1, o) : t = e.slice(i + 1, o), r = o - i - 1;
      i = o, l = 0;
    } else a === 46 && l > -1 ? l++ : l = -1;
  }
  return t;
}
function nn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const ss = { cwd: us };
function us() {
  return "/";
}
function qn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function cs(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!qn(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw n.code = "ERR_INVALID_ARG_TYPE", n;
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw n.code = "ERR_INVALID_URL_SCHEME", n;
  }
  return ps(e);
}
function ps(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const n = e.pathname;
  let t = -1;
  for (; ++t < n.length; )
    if (n.codePointAt(t) === 37 && n.codePointAt(t + 1) === 50) {
      const r = n.codePointAt(t + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(n);
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
class Or {
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
  constructor(n) {
    let t;
    n ? qn(n) ? t = { path: n } : typeof n == "string" || hs(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : ss.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Tn.length; ) {
      const l = Tn[r];
      l in t && t[l] !== void 0 && t[l] !== null && (this[l] = l === "history" ? [...t[l]] : t[l]);
    }
    let i;
    for (i in t)
      Tn.includes(i) || (this[i] = t[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Se.basename(this.path) : void 0;
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
  set basename(n) {
    Nn(n, "basename"), Pn(n, "basename"), this.path = Se.join(this.dirname || "", n);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Se.dirname(this.path) : void 0;
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
  set dirname(n) {
    $t(this.basename, "dirname"), this.path = Se.join(n || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Se.extname(this.path) : void 0;
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
  set extname(n) {
    if (Pn(n, "extname"), $t(this.dirname, "extname"), n) {
      if (n.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (n.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Se.join(this.dirname, this.stem + (n || ""));
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
  set path(n) {
    qn(n) && (n = cs(n)), Nn(n, "path"), this.path !== n && this.history.push(n);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Se.basename(this.path, this.extname) : void 0;
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
  set stem(n) {
    Nn(n, "stem"), Pn(n, "stem"), this.path = Se.join(this.dirname || "", n + (this.extname || ""));
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
  fail(n, t, r) {
    const i = this.message(n, t, r);
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
  info(n, t, r) {
    const i = this.message(n, t, r);
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
  message(n, t, r) {
    const i = new le(
      // @ts-expect-error: the overloads are fine.
      n,
      t,
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
  toString(n) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(n || void 0).decode(this.value);
  }
}
function Pn(e, n) {
  if (e && e.includes(Se.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + Se.sep + "`"
    );
}
function Nn(e, n) {
  if (!e)
    throw new Error("`" + n + "` cannot be empty");
}
function $t(e, n) {
  if (!e)
    throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function hs(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const fs = (
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
), ds = {}.hasOwnProperty;
class lt extends fs {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = es();
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
    const n = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new lt()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data(In(!0, {}, this.namespace)), n;
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
  data(n, t) {
    return typeof n == "string" ? arguments.length === 2 ? (Ln("data", this.frozen), this.namespace[n] = t, this) : ds.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (Ln("data", this.frozen), this.namespace = n, this) : this.namespace;
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
    const n = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = t.call(n, ...r);
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
  parse(n) {
    this.freeze();
    const t = un(n), r = this.parser || this.Parser;
    return An("parse", r), r(String(t), t);
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
  process(n, t) {
    const r = this;
    return this.freeze(), An("process", this.parser || this.Parser), vn("process", this.compiler || this.Compiler), t ? i(void 0, t) : new Promise(i);
    function i(l, o) {
      const a = un(n), s = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(s, a, function(u, h, m) {
        if (u || !h || !m)
          return c(u);
        const p = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          h
        ), y = r.stringify(p, m);
        ys(y) ? m.value = y : m.result = y, c(
          u,
          /** @type {VFileWithOutput<CompileResult>} */
          m
        );
      });
      function c(u, h) {
        u || !h ? o(u) : l ? l(h) : t(void 0, h);
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
  processSync(n) {
    let t = !1, r;
    return this.freeze(), An("processSync", this.parser || this.Parser), vn("processSync", this.compiler || this.Compiler), this.process(n, i), Xt("processSync", "process", t), r;
    function i(l, o) {
      t = !0, Ft(l), r = o;
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
  run(n, t, r) {
    Wt(n), this.freeze();
    const i = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? l(void 0, r) : new Promise(l);
    function l(o, a) {
      const s = un(t);
      i.run(n, s, c);
      function c(u, h, m) {
        const p = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          h || n
        );
        u ? a(u) : o ? o(p) : r(void 0, p, m);
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
  runSync(n, t) {
    let r = !1, i;
    return this.run(n, t, l), Xt("runSync", "run", r), i;
    function l(o, a) {
      Ft(o), i = a, r = !0;
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
  stringify(n, t) {
    this.freeze();
    const r = un(t), i = this.compiler || this.Compiler;
    return vn("stringify", i), Wt(n), i(n, r);
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
  use(n, ...t) {
    const r = this.attachers, i = this.namespace;
    if (Ln("use", this.frozen), n != null) if (typeof n == "function")
      s(n, t);
    else if (typeof n == "object")
      Array.isArray(n) ? a(n) : o(n);
    else
      throw new TypeError("Expected usable value, not `" + n + "`");
    return this;
    function l(c) {
      if (typeof c == "function")
        s(c, []);
      else if (typeof c == "object")
        if (Array.isArray(c)) {
          const [u, ...h] = (
            /** @type {PluginTuple<Array<unknown>>} */
            c
          );
          s(u, h);
        } else
          o(c);
      else
        throw new TypeError("Expected usable value, not `" + c + "`");
    }
    function o(c) {
      if (!("plugins" in c) && !("settings" in c))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(c.plugins), c.settings && (i.settings = In(!0, i.settings, c.settings));
    }
    function a(c) {
      let u = -1;
      if (c != null) if (Array.isArray(c))
        for (; ++u < c.length; ) {
          const h = c[u];
          l(h);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + c + "`");
    }
    function s(c, u) {
      let h = -1, m = -1;
      for (; ++h < r.length; )
        if (r[h][0] === c) {
          m = h;
          break;
        }
      if (m === -1)
        r.push([c, ...u]);
      else if (u.length > 0) {
        let [p, ...y] = u;
        const x = r[m][1];
        Un(x) && Un(p) && (p = In(!0, x, p)), r[m] = [c, p, ...y];
      }
    }
  }
}
const ms = new lt().freeze();
function An(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function vn(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Ln(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Wt(e) {
  if (!Un(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Xt(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function un(e) {
  return gs(e) ? e : new Or(e);
}
function gs(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function ys(e) {
  return typeof e == "string" || xs(e);
}
function xs(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const ws = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Yt = [], Kt = { allowDangerousHtml: !0 }, ks = /^(https?|ircs?|mailto|xmpp)$/i, bs = [
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
function Qt(e) {
  const n = Ss(e), t = Cs(e);
  return Es(n.runSync(n.parse(t), t), e);
}
function Ss(e) {
  const n = e.rehypePlugins || Yt, t = e.remarkPlugins || Yt, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Kt } : Kt;
  return ms().use(ra).use(t).use(Ga, r).use(n);
}
function Cs(e) {
  const n = e.children || "", t = new Or();
  return typeof n == "string" && (t.value = n), t;
}
function Es(e, n) {
  const t = n.allowedElements, r = n.allowElement, i = n.components, l = n.disallowedElements, o = n.skipHtml, a = n.unwrapDisallowed, s = n.urlTransform || _s;
  for (const u of bs)
    Object.hasOwn(n, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + ws + u.id, void 0);
  return Lr(e, c), Di(e, {
    Fragment: zn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: k,
    jsxs: Y,
    passKeys: !0,
    passNode: !0
  });
  function c(u, h, m) {
    if (u.type === "raw" && m && typeof h == "number")
      return o ? m.children.splice(h, 1) : m.children[h] = { type: "text", value: u.value }, h;
    if (u.type === "element") {
      let p;
      for (p in Cn)
        if (Object.hasOwn(Cn, p) && Object.hasOwn(u.properties, p)) {
          const y = u.properties[p], x = Cn[p];
          (x === null || x.includes(u.tagName)) && (u.properties[p] = s(String(y || ""), p, u));
        }
    }
    if (u.type === "element") {
      let p = t ? !t.includes(u.tagName) : l ? l.includes(u.tagName) : !1;
      if (!p && r && typeof h == "number" && (p = !r(u, h, m)), p && m && typeof h == "number")
        return a && u.children ? m.children.splice(h, 1, ...u.children) : m.children.splice(h, 1), h;
    }
  }
}
function _s(e) {
  const n = e.indexOf(":"), t = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && n > i || t !== -1 && n > t || r !== -1 && n > r || // It is a protocol, it should be allowed.
    ks.test(e.slice(0, n)) ? e : ""
  );
}
const be = (...e) => e.filter(Boolean).join(" "), Is = ({ className: e }) => /* @__PURE__ */ k("svg", { className: e, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ k("path", { d: "M2 21L23 12L2 3V10L17 12L2 14V21Z", fill: "currentColor" }) }), Ts = ({ className: e }) => /* @__PURE__ */ k("svg", { className: e, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ k("path", { d: "M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) }), Ps = ({ className: e }) => /* @__PURE__ */ k("svg", { className: e, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ k("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", fill: "currentColor" }) }), Ns = ({ className: e }) => /* @__PURE__ */ k("svg", { className: e, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ k("path", { d: "M18 6L6 18M6 6L18 18", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) }), As = ({ className: e, ...n }) => /* @__PURE__ */ k(
  "form",
  {
    className: be(
      "chat-wrapper__prompt-input",
      e
    ),
    ...n
  }
), Dr = Br(({
  onChange: e,
  className: n,
  placeholder: t = "What would you like to know?",
  minHeight: r = 48,
  maxHeight: i = 164,
  onKeyDown: l,
  ...o
}, a) => {
  const s = (c) => {
    if (c.key === "Enter") {
      if (c.shiftKey)
        return;
      c.preventDefault();
      const u = c.currentTarget.form;
      if (u) {
        const h = new Event("submit", { cancelable: !0, bubbles: !0 });
        u.dispatchEvent(h);
      }
    }
    l == null || l(c);
  };
  return /* @__PURE__ */ k(
    "textarea",
    {
      ref: a,
      className: be(
        "chat-wrapper__prompt-textarea",
        n
      ),
      name: "message",
      onChange: e,
      onKeyDown: s,
      placeholder: t,
      style: {
        minHeight: `${r}px`,
        maxHeight: `${i}px`
      },
      ...o
    }
  );
});
Dr.displayName = "PromptInputTextarea";
const vs = ({
  className: e,
  ...n
}) => /* @__PURE__ */ k(
  "div",
  {
    className: be("chat-wrapper__prompt-toolbar", e),
    ...n
  }
), Ls = ({
  className: e,
  ...n
}) => /* @__PURE__ */ k(
  "div",
  {
    className: be("chat-wrapper__prompt-tools", e),
    ...n
  }
), Jt = ({
  variant: e = "ghost",
  size: n = "default",
  className: t,
  children: r,
  ...i
}) => {
  const l = n === "default" && (typeof r == "string" || Fr.Children.count(r) === 1) ? "icon" : n;
  return /* @__PURE__ */ k(
    "button",
    {
      className: be(
        "chat-wrapper__prompt-button",
        `chat-wrapper__prompt-button--${e}`,
        `chat-wrapper__prompt-button--${l}`,
        t
      ),
      type: "button",
      ...i,
      children: r
    }
  );
}, zs = ({
  className: e,
  variant: n = "default",
  size: t = "icon",
  status: r = "idle",
  children: i,
  disabled: l,
  ...o
}) => {
  let a = /* @__PURE__ */ k(Is, { className: "chat-wrapper__prompt-icon" });
  r === "submitted" ? a = /* @__PURE__ */ k(Ts, { className: "chat-wrapper__prompt-icon chat-wrapper__prompt-icon--spin" }) : r === "streaming" ? a = /* @__PURE__ */ k(Ps, { className: "chat-wrapper__prompt-icon" }) : r === "error" && (a = /* @__PURE__ */ k(Ns, { className: "chat-wrapper__prompt-icon" }));
  const s = l || r === "submitted" || r === "streaming";
  return /* @__PURE__ */ k(
    "button",
    {
      className: be(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${n}`,
        `chat-wrapper__prompt-submit--${t}`,
        r === "streaming" && "chat-wrapper__prompt-submit--stop",
        e
      ),
      type: "submit",
      disabled: s,
      ...o,
      children: i ?? a
    }
  );
}, Vs = ({ className: e, children: n, ...t }) => /* @__PURE__ */ k(
  "select",
  {
    className: be("chat-wrapper__prompt-select", e),
    ...t,
    children: n
  }
), Us = ({
  className: e,
  children: n,
  ...t
}) => /* @__PURE__ */ k(
  "button",
  {
    className: be("chat-wrapper__prompt-select-trigger", e),
    type: "button",
    ...t,
    children: n
  }
), qs = ({
  className: e,
  ...n
}) => /* @__PURE__ */ k(
  "div",
  {
    className: be("chat-wrapper__prompt-select-content", e),
    ...n
  }
), $s = ({
  className: e,
  value: n,
  ...t
}) => /* @__PURE__ */ k(
  "div",
  {
    className: be("chat-wrapper__prompt-select-item", e),
    "data-value": n,
    ...t
  }
), Ws = ({
  className: e,
  placeholder: n,
  ...t
}) => /* @__PURE__ */ k(
  "span",
  {
    className: be("chat-wrapper__prompt-select-value", e),
    ...t,
    children: n
  }
);
function Os({ children: e }) {
  return /* @__PURE__ */ k("div", { className: "chat-wrapper__reasoning", children: e });
}
function Ds({ title: e }) {
  return /* @__PURE__ */ Y("div", { className: "chat-wrapper__reasoning-trigger", children: [
    /* @__PURE__ */ k("div", { className: "chat-wrapper__reasoning-icon", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__reasoning-spinner" }) }),
    /* @__PURE__ */ k("span", { className: "chat-wrapper__reasoning-title", children: e })
  ] });
}
function Ms({ children: e }) {
  return /* @__PURE__ */ k("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ k("div", { className: "chat-wrapper__reasoning-text", children: e }) });
}
function Rs({ size: e = 16, variant: n = "dots" }) {
  return n === "dots" ? /* @__PURE__ */ Y("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ k("span", {}),
    /* @__PURE__ */ k("span", {}),
    /* @__PURE__ */ k("span", {})
  ] }) : n === "pulse" ? /* @__PURE__ */ k(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ k(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: e, height: e }
    }
  );
}
function Xs({
  apiUrl: e,
  config: n,
  tools: t,
  initialMessages: r = []
}) {
  console.log("ChatWrapper config:", n);
  const [i, l] = ie(r), [o, a] = ie(""), [s, c] = ie(!1), [u, h] = ie(null), [m, p] = ie(!1), [y, x] = ie("idle"), [I, b] = ie(!1), [v, T] = ie([]), [H, U] = ie([]), [w, R] = ie([]), [K, B] = ie([]), [j, P] = ie(""), [N, M] = ie(!1), [Q, z] = ie(""), ne = Ke(null), J = Ke(null), re = Ke(null), oe = se(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), f = se(() => {
    var S;
    (S = ne.current) == null || S.scrollIntoView({ behavior: "smooth" });
  }, []);
  on(() => {
    t && Object.keys(t).length > 0 && console.log("Available tools:", Object.keys(t));
  }, [t]), on(() => {
    f();
  }, [i, f]), on(() => {
    n.onStreamingStatusChange && n.onStreamingStatusChange(j);
  }, [j, n]);
  const X = se(
    (S) => {
      const _ = J.current;
      _ && l(
        (q) => q.map((Z) => Z.id === _ ? S(Z) : Z)
      );
    },
    []
  ), pe = se(
    (S) => {
      var _, q, Z, Te, G, xe, we, Oe;
      switch (console.log("Processing stream event:", S.type, S), S.type) {
        case "event":
          S.event === "latitude-event" ? ((_ = S.data) == null ? void 0 : _.type) === "chain-started" ? (P("Planning chain started"), M(!0), z(
            "🔗 Starting comprehensive planning chain..."
          )) : ((q = S.data) == null ? void 0 : q.type) === "step-started" ? (P("Planning step started"), M(!0), z("📊 Executing planning step...")) : ((Z = S.data) == null ? void 0 : Z.type) === "provider-completed" ? (P("AI planning completed"), M(!1), z(""), (Te = S.data.response) != null && Te.text && X((g) => ({
            ...g,
            content: S.data.response.text,
            isStreaming: !1
          }))) : ((G = S.data) == null ? void 0 : G.type) === "chain-completed" && (P("Planning completed"), M(!1), z(""), S.data.uuid && h(S.data.uuid), X((g) => ({
            ...g,
            isStreaming: !1
          }))) : S.event === "provider-event" && ((xe = S.data) == null ? void 0 : xe.type) === "text-delta" && (M(!1), z(""), X((g) => ({
            ...g,
            content: g.content + S.data.textDelta
          })));
          break;
        case "text-delta":
          S.content && X((g) => ({
            ...g,
            content: g.content + S.content
          }));
          break;
        case "tool-result":
          if (console.log("Tool result received:", S), S.tool && S.data && (S.data.id || S.data.success)) {
            const g = {
              id: S.data.id || oe(),
              title: S.data.title || `${S.tool} result`,
              description: S.data.description,
              status: S.data.status || "completed",
              created_at: S.data.created_at || (/* @__PURE__ */ new Date()).toISOString(),
              ...S.data
            };
            T((E) => [...E, g]);
          }
          S.todos && (U(S.todos), n.onToolResult && n.onToolResult("todos", S.todos)), S.briefs && (R(S.briefs), n.onToolResult && n.onToolResult("briefs", S.briefs));
          break;
        case "finished":
          P("Stream finished"), S.uuid && h(S.uuid), (Oe = (we = S.result) == null ? void 0 : we.response) != null && Oe.text ? X((g) => ({
            ...g,
            content: S.result.response.text,
            isStreaming: !1
          })) : X((g) => ({
            ...g,
            isStreaming: !1
          }));
          break;
        case "stream-error":
          console.error("Stream error:", S.error), X((g) => ({
            ...g,
            content: `Stream Error: ${S.error}`,
            isStreaming: !1
          }));
          break;
        case "error":
          console.error("API error:", S.error), X((g) => ({
            ...g,
            content: `Error: ${S.error}`,
            isStreaming: !1
          }));
          break;
      }
    },
    [X, oe, n]
  ), d = se(
    async (S, _) => {
      if (!S.trim() || s) return;
      const q = {
        id: oe(),
        role: "user",
        content: S.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: _
      };
      l((G) => [...G, q]), c(!0), x("submitted"), P("Starting...");
      const Z = oe();
      J.current = Z;
      const Te = {
        id: Z,
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      l((G) => [...G, Te]);
      try {
        re.current = new AbortController();
        const G = n.endpoint === "brief-planner" ? `${e}/api/brief-planner` : u ? `${e}/api/conversation/${u}` : `${e}/api/conversation/init`, xe = n.endpoint === "brief-planner" ? {
          messages: [...i, q],
          promptPath: n.promptPath || "briefPlanner",
          conversationUuid: u,
          todos: H,
          // Send current todos to the API
          briefs: w,
          // Send current briefs to the API
          media: _ || []
          // Use media from function parameter, not uploadedMedia
        } : {
          message: S.trim(),
          tools: t ? Object.keys(t) : []
        };
        console.log("Sending request to:", G), console.log("Request payload:", JSON.stringify(xe, null, 2));
        const we = await fetch(G, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...n.apiKey && { Authorization: `Bearer ${n.apiKey}` }
          },
          body: JSON.stringify(xe),
          signal: re.current.signal
        });
        if (!we.ok)
          throw new Error(`HTTP error! status: ${we.status}`);
        x("streaming"), await he(we);
      } catch (G) {
        G instanceof Error && G.name === "AbortError" ? console.log("Request aborted") : (console.error("Request error:", G), x("error"), X((xe) => ({
          ...xe,
          content: `Sorry, there was an error: ${G instanceof Error ? G.message : "Unknown error"}`,
          isStreaming: !1
        })), n.onError && n.onError(
          G instanceof Error ? G : new Error("Unknown error")
        ));
      } finally {
        c(!1), x("idle"), P(""), M(!1), z(""), re.current = null, J.current = null;
      }
    },
    [
      s,
      oe,
      i,
      u,
      H,
      w,
      K,
      t,
      n,
      e,
      X,
      pe
    ]
  ), he = se(
    async (S) => {
      var Te;
      const _ = (Te = S.body) == null ? void 0 : Te.getReader(), q = new TextDecoder();
      if (!_)
        throw new Error("No response body reader available");
      let Z = "";
      for (; ; ) {
        const { done: G, value: xe } = await _.read();
        if (G) {
          console.log("Stream completed");
          break;
        }
        Z += q.decode(xe, { stream: !0 });
        const we = Z.split(/\r?\n/);
        Z = we.pop() || "";
        for (const Oe of we)
          if (Oe.startsWith("data: ")) {
            const g = Oe.slice(6).trim();
            if (g === "[DONE]" || g === "")
              continue;
            try {
              const E = JSON.parse(g);
              pe(E);
            } catch (E) {
              console.error("Failed to parse event:", E);
            }
          }
      }
    },
    [pe]
  ), _e = se(() => {
    re.current && (re.current.abort(), c(!1), x("idle"), P(""), M(!1), z(""));
  }, []), te = se(() => {
    l(r), h(null), T([]), U([]), R([]), B([]), x("idle"), P(""), M(!1), z(""), console.log("Chat cleared");
  }, [r]), Le = se(() => {
    p(!0);
  }, []), fe = se(() => {
    p(!1);
  }, []), Ie = se(() => {
    b((S) => !S);
  }, []);
  on(() => {
    const S = (_) => {
      _.key === "Escape" && n.mode === "modal" && m && fe();
    };
    if (n.mode === "modal" && m)
      return document.addEventListener("keydown", S), () => document.removeEventListener("keydown", S);
  }, [n.mode, m, fe]);
  const Fe = ((...S) => S.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${n.mode}`,
    n.position && `chat-wrapper--${n.position}`,
    n.theme && `chat-wrapper--${n.theme}`,
    I && "chat-wrapper--collapsed"
  ), wn = () => n.mode === "modal" && m ? /* @__PURE__ */ k("div", { className: "chat-wrapper-overlay", onClick: fe }) : null, tn = () => {
    var _;
    if (n.mode === "modal" && !m || n.mode === "sidebar" && I || n.mode === "fullscreen" && I) {
      const q = n.mode === "modal" ? Le : Ie, Z = n.mode === "modal" ? `Open ${n.appName}` : `Expand ${n.appName}`;
      return /* @__PURE__ */ Y(
        "button",
        {
          className: "chat-wrapper__bubble-button",
          onClick: q,
          title: Z,
          children: [
            /* @__PURE__ */ Y(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: "chat-wrapper__bubble-icon",
                children: [
                  /* @__PURE__ */ k(
                    "path",
                    {
                      d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
                      fill: "currentColor"
                    }
                  ),
                  /* @__PURE__ */ k("circle", { cx: "7", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ k("circle", { cx: "12", cy: "10", r: "1", fill: "currentColor" }),
                  /* @__PURE__ */ k("circle", { cx: "17", cy: "10", r: "1", fill: "currentColor" })
                ]
              }
            ),
            ((_ = n.features) == null ? void 0 : _.showBubbleText) !== !1 && /* @__PURE__ */ k("span", { className: "chat-wrapper__bubble-text", children: n.bubbleText || "Chat" })
          ]
        }
      );
    }
    return null;
  }, kn = () => n.mode === "modal" && m ? /* @__PURE__ */ k(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: fe,
      title: "Close chat",
      children: /* @__PURE__ */ k(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ k(
            "path",
            {
              d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
              fill: "currentColor"
            }
          )
        }
      )
    }
  ) : null, rn = () => {
    const S = (n.mode === "sidebar" || n.mode === "fullscreen") && !I;
    return console.log("renderCollapseButton - mode:", n.mode, "isCollapsed:", I, "shouldShow:", S), S ? /* @__PURE__ */ k(
      "button",
      {
        className: "chat-wrapper__collapse-button",
        onClick: Ie,
        title: "Collapse chat",
        style: { background: "red", color: "white" },
        children: "⬇"
      }
    ) : null;
  }, ln = () => {
    var S;
    return !((S = n.features) != null && S.showToolResults) || v.length === 0 ? null : /* @__PURE__ */ Y("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ k("h4", { children: "Tool Results" }),
      /* @__PURE__ */ k("div", { className: "chat-wrapper__tool-results-list", children: v.map((_) => /* @__PURE__ */ Y("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ k("div", { className: "chat-wrapper__tool-result-title", children: _.title }),
        _.description && /* @__PURE__ */ k("div", { className: "chat-wrapper__tool-result-description", children: _.description }),
        /* @__PURE__ */ Y("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          _.status || "completed"
        ] })
      ] }, _.id)) })
    ] });
  };
  return n.mode === "modal" && !m || (n.mode === "sidebar" || n.mode === "fullscreen") && I ? tn() : /* @__PURE__ */ Y(zn, { children: [
    wn(),
    /* @__PURE__ */ Y("div", { className: Fe, style: n.customStyles, children: [
      /* @__PURE__ */ Y("div", { className: "chat-wrapper__header", children: [
        /* @__PURE__ */ k("h2", { className: "chat-wrapper__title", children: n.appName }),
        /* @__PURE__ */ Y("div", { className: "chat-wrapper__header-controls", children: [
          rn(),
          kn()
        ] })
      ] }),
      !I && /* @__PURE__ */ Y(zn, { children: [
        /* @__PURE__ */ Y("div", { className: "chat-wrapper__messages", children: [
          i.map((S) => /* @__PURE__ */ k(
            "div",
            {
              className: `chat-wrapper__message chat-wrapper__message--${S.role}`,
              children: /* @__PURE__ */ k("div", { className: "chat-wrapper__message-content", children: S.role === "assistant" && S.isStreaming && N ? /* @__PURE__ */ Y("div", { className: "chat-wrapper__message-with-reasoning", children: [
                /* @__PURE__ */ Y(Os, { isStreaming: N, children: [
                  /* @__PURE__ */ k(Ds, { title: "Thinking..." }),
                  /* @__PURE__ */ k(Ms, { children: Q })
                ] }),
                S.content && /* @__PURE__ */ k("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ k(
                  Qt,
                  {
                    components: {
                      pre: ({ children: _ }) => /* @__PURE__ */ k("pre", { className: "chat-wrapper__code-block", children: _ }),
                      code: ({ children: _, className: q }) => !q ? /* @__PURE__ */ k("code", { className: "chat-wrapper__inline-code", children: _ }) : /* @__PURE__ */ k("code", { className: "chat-wrapper__code", children: _ }),
                      p: ({ children: _ }) => /* @__PURE__ */ k("p", { className: "chat-wrapper__paragraph", children: _ }),
                      h1: ({ children: _ }) => /* @__PURE__ */ k("h1", { className: "chat-wrapper__heading-1", children: _ }),
                      h2: ({ children: _ }) => /* @__PURE__ */ k("h2", { className: "chat-wrapper__heading-2", children: _ }),
                      h3: ({ children: _ }) => /* @__PURE__ */ k("h3", { className: "chat-wrapper__heading-3", children: _ }),
                      ul: ({ children: _ }) => /* @__PURE__ */ k("ul", { className: "chat-wrapper__list", children: _ }),
                      ol: ({ children: _ }) => /* @__PURE__ */ k("ol", { className: "chat-wrapper__ordered-list", children: _ }),
                      li: ({ children: _ }) => /* @__PURE__ */ k("li", { className: "chat-wrapper__list-item", children: _ }),
                      blockquote: ({ children: _ }) => /* @__PURE__ */ k("blockquote", { className: "chat-wrapper__blockquote", children: _ }),
                      strong: ({ children: _ }) => /* @__PURE__ */ k("strong", { className: "chat-wrapper__bold", children: _ }),
                      em: ({ children: _ }) => /* @__PURE__ */ k("em", { className: "chat-wrapper__italic", children: _ })
                    },
                    children: S.content.trim()
                  }
                ) })
              ] }) : S.isStreaming && S.content === "" && !N ? (
                /* Show streaming indicator when no reasoning */
                /* @__PURE__ */ Y("div", { className: "chat-wrapper__streaming-placeholder", children: [
                  /* @__PURE__ */ k(Rs, { size: 16, variant: "dots" }),
                  /* @__PURE__ */ k("span", { children: "Thinking" })
                ] })
              ) : (
                /* Regular message display with markdown */
                /* @__PURE__ */ Y("div", { className: "chat-wrapper__regular-message", children: [
                  S.role === "user" && S.media && S.media.length > 0 && /* @__PURE__ */ k("div", { className: "chat-wrapper__media-grid", children: S.media.map((_, q) => /* @__PURE__ */ k(
                    "div",
                    {
                      className: "chat-wrapper__media-item",
                      children: /* @__PURE__ */ k(
                        "img",
                        {
                          src: _,
                          alt: `Attached image ${q + 1}`,
                          className: "chat-wrapper__media-image"
                        }
                      )
                    },
                    q
                  )) }),
                  /* @__PURE__ */ Y("div", { className: "chat-wrapper__markdown-content", children: [
                    /* @__PURE__ */ k(
                      Qt,
                      {
                        components: {
                          pre: ({ children: _ }) => /* @__PURE__ */ k("pre", { className: "chat-wrapper__code-block", children: _ }),
                          code: ({ children: _, className: q }) => !q ? /* @__PURE__ */ k("code", { className: "chat-wrapper__inline-code", children: _ }) : /* @__PURE__ */ k("code", { className: "chat-wrapper__code", children: _ }),
                          p: ({ children: _ }) => /* @__PURE__ */ k("p", { className: "chat-wrapper__paragraph", children: _ }),
                          h1: ({ children: _ }) => /* @__PURE__ */ k("h1", { className: "chat-wrapper__heading-1", children: _ }),
                          h2: ({ children: _ }) => /* @__PURE__ */ k("h2", { className: "chat-wrapper__heading-2", children: _ }),
                          h3: ({ children: _ }) => /* @__PURE__ */ k("h3", { className: "chat-wrapper__heading-3", children: _ }),
                          ul: ({ children: _ }) => /* @__PURE__ */ k("ul", { className: "chat-wrapper__list", children: _ }),
                          ol: ({ children: _ }) => /* @__PURE__ */ k("ol", { className: "chat-wrapper__ordered-list", children: _ }),
                          li: ({ children: _ }) => /* @__PURE__ */ k("li", { className: "chat-wrapper__list-item", children: _ }),
                          blockquote: ({ children: _ }) => /* @__PURE__ */ k("blockquote", { className: "chat-wrapper__blockquote", children: _ }),
                          strong: ({ children: _ }) => /* @__PURE__ */ k("strong", { className: "chat-wrapper__bold", children: _ }),
                          em: ({ children: _ }) => /* @__PURE__ */ k("em", { className: "chat-wrapper__italic", children: _ })
                        },
                        children: S.content.trim()
                      }
                    ),
                    S.isStreaming && /* @__PURE__ */ k("span", { className: "chat-wrapper__streaming-indicator", children: "..." })
                  ] })
                ] })
              ) })
            },
            S.id
          )),
          /* @__PURE__ */ k("div", { ref: ne })
        ] }),
        ln(),
        /* @__PURE__ */ Y(
          As,
          {
            onSubmit: (S) => {
              S.preventDefault();
              const q = new FormData(S.currentTarget).get("message");
              q != null && q.trim() && (d(q.trim()), a(""));
            },
            children: [
              /* @__PURE__ */ k(
                Dr,
                {
                  value: o,
                  onChange: (S) => a(S.target.value),
                  placeholder: n.placeholder || "What would you like to know?",
                  disabled: s
                }
              ),
              /* @__PURE__ */ Y(vs, { children: [
                /* @__PURE__ */ Y(Ls, { children: [
                  i.length > 0 && /* @__PURE__ */ k(
                    Jt,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: te,
                      title: "Clear chat",
                      disabled: s,
                      children: /* @__PURE__ */ k(
                        "svg",
                        {
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                          children: /* @__PURE__ */ k(
                            "path",
                            {
                              d: "M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              strokeLinejoin: "round"
                            }
                          )
                        }
                      )
                    }
                  ),
                  t && Object.keys(t).length > 0 && /* @__PURE__ */ Y(
                    Jt,
                    {
                      variant: "ghost",
                      size: "sm",
                      disabled: s,
                      title: `${Object.keys(t).length} tools available`,
                      children: [
                        "🛠️ Tools (",
                        Object.keys(t).length,
                        ")"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ k(
                  zs,
                  {
                    status: y,
                    disabled: !o.trim() && y !== "streaming",
                    onClick: y === "streaming" ? _e : void 0,
                    title: y === "streaming" ? "Stop generation" : y === "submitted" ? "Submitting..." : "Send message"
                  }
                )
              ] })
            ]
          }
        )
      ] }),
      n.onError && /* @__PURE__ */ k("div", { className: "chat-wrapper__error-boundary" })
    ] })
  ] });
}
class Fs {
  constructor(n, t) {
    bn(this, "baseUrl");
    bn(this, "apiKey");
    this.baseUrl = n, this.apiKey = t;
  }
  getHeaders() {
    const n = {
      "Content-Type": "application/json"
    };
    return this.apiKey && (n.Authorization = `Bearer ${this.apiKey}`), n;
  }
  async initConversation() {
    const n = await fetch(`${this.baseUrl}/api/conversation/init`, {
      method: "POST",
      headers: this.getHeaders()
    });
    if (!n.ok) throw new Error("Failed to initialize conversation");
    return (await n.json()).conversationId;
  }
  async *streamMessage(n, t) {
    const r = await fetch(
      `${this.baseUrl}/api/conversation/${n}`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ message: t })
      }
    );
    if (!r.ok) throw new Error("Failed to send message");
    if (!r.body) throw new Error("No response body");
    const i = r.body.getReader(), l = new TextDecoder();
    for (; ; ) {
      const { done: o, value: a } = await i.read();
      if (o) break;
      const c = l.decode(a).split(`
`);
      for (const u of c)
        if (u.startsWith("data: ")) {
          const h = u.slice(6);
          if (h === "[DONE]") return;
          try {
            yield JSON.parse(h).content || "";
          } catch (m) {
            console.error("Failed to parse chunk:", m);
          }
        }
    }
  }
}
function Ys(e, n) {
  const [t, r] = ie([]), [i, l] = ie(!1), [o, a] = ie(null), s = Ke(null), c = Ke(new Fs(e, n)), u = se(async () => {
    try {
      const p = await c.current.initConversation();
      return s.current = p, p;
    } catch (p) {
      throw a(p), p;
    }
  }, []), h = se(
    async (p) => {
      s.current || await u();
      const y = {
        id: Date.now().toString(),
        role: "user",
        content: p,
        timestamp: /* @__PURE__ */ new Date()
      };
      r((I) => [...I, y]), l(!0), a(null);
      const x = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      r((I) => [...I, x]);
      try {
        const I = c.current.streamMessage(
          s.current,
          p
        );
        for await (const b of I)
          r(
            (v) => v.map(
              (T) => T.id === x.id ? { ...T, content: T.content + b } : T
            )
          );
        r(
          (b) => b.map(
            (v) => v.id === x.id ? { ...v, isStreaming: !1 } : v
          )
        );
      } catch (I) {
        a(I), r((b) => b.filter((v) => v.id !== x.id));
      } finally {
        l(!1);
      }
    },
    [u]
  ), m = se(() => {
    r([]), s.current = null;
  }, []);
  return {
    messages: t,
    isLoading: i,
    error: o,
    sendMessage: h,
    clearMessages: m
  };
}
export {
  Xs as ChatWrapper,
  Rs as Loader,
  As as PromptInput,
  Jt as PromptInputButton,
  Vs as PromptInputModelSelect,
  qs as PromptInputModelSelectContent,
  $s as PromptInputModelSelectItem,
  Us as PromptInputModelSelectTrigger,
  Ws as PromptInputModelSelectValue,
  zs as PromptInputSubmit,
  Dr as PromptInputTextarea,
  vs as PromptInputToolbar,
  Ls as PromptInputTools,
  Os as Reasoning,
  Ms as ReasoningContent,
  Ds as ReasoningTrigger,
  Ys as useChatConnection
};
