var Mr = Object.defineProperty;
var Rr = (e, n, t) => n in e ? Mr(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var kn = (e, n, t) => Rr(e, typeof n != "symbol" ? n + "" : n, t);
import { jsxs as K, jsx as w, Fragment as Qt } from "react/jsx-runtime";
import Fr, { forwardRef as Br, useState as ie, useRef as Je, useCallback as de, useEffect as ln } from "react";
function jr(e, n) {
  const t = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const Hr = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Vr = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ur = {};
function it(e, n) {
  return (Ur.jsx ? Vr : Hr).test(e);
}
const qr = /[ \t\n\f\r]/g;
function $r(e) {
  return typeof e == "object" ? e.type === "text" ? lt(e.value) : !1 : lt(e);
}
function lt(e) {
  return e.replace(qr, "") === "";
}
class tn {
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
tn.prototype.normal = {};
tn.prototype.property = {};
tn.prototype.space = void 0;
function Jt(e, n) {
  const t = {}, r = {};
  for (const i of e)
    Object.assign(t, i.property), Object.assign(r, i.normal);
  return new tn(t, r, n);
}
function Ln(e) {
  return e.toLowerCase();
}
class ue {
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
ue.prototype.attribute = "";
ue.prototype.booleanish = !1;
ue.prototype.boolean = !1;
ue.prototype.commaOrSpaceSeparated = !1;
ue.prototype.commaSeparated = !1;
ue.prototype.defined = !1;
ue.prototype.mustUseProperty = !1;
ue.prototype.number = !1;
ue.prototype.overloadedBoolean = !1;
ue.prototype.property = "";
ue.prototype.spaceSeparated = !1;
ue.prototype.space = void 0;
let Wr = 0;
const z = Fe(), te = Fe(), zn = Fe(), S = Fe(), q = Fe(), Ue = Fe(), fe = Fe();
function Fe() {
  return 2 ** ++Wr;
}
const On = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: z,
  booleanish: te,
  commaOrSpaceSeparated: fe,
  commaSeparated: Ue,
  number: S,
  overloadedBoolean: zn,
  spaceSeparated: q
}, Symbol.toStringTag, { value: "Module" })), bn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(On)
);
class Un extends ue {
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
    if (super(n, t), ot(this, "space", i), typeof r == "number")
      for (; ++l < bn.length; ) {
        const o = bn[l];
        ot(this, bn[l], (r & On[o]) === On[o]);
      }
  }
}
Un.prototype.defined = !0;
function ot(e, n, t) {
  t && (e[n] = t);
}
function $e(e) {
  const n = {}, t = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const l = new Un(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (l.mustUseProperty = !0), n[r] = l, t[Ln(r)] = r, t[Ln(l.attribute)] = r;
  }
  return new tn(n, t, e.space);
}
const Gt = $e({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: te,
    ariaAutoComplete: null,
    ariaBusy: te,
    ariaChecked: te,
    ariaColCount: S,
    ariaColIndex: S,
    ariaColSpan: S,
    ariaControls: q,
    ariaCurrent: null,
    ariaDescribedBy: q,
    ariaDetails: null,
    ariaDisabled: te,
    ariaDropEffect: q,
    ariaErrorMessage: null,
    ariaExpanded: te,
    ariaFlowTo: q,
    ariaGrabbed: te,
    ariaHasPopup: null,
    ariaHidden: te,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: q,
    ariaLevel: S,
    ariaLive: null,
    ariaModal: te,
    ariaMultiLine: te,
    ariaMultiSelectable: te,
    ariaOrientation: null,
    ariaOwns: q,
    ariaPlaceholder: null,
    ariaPosInSet: S,
    ariaPressed: te,
    ariaReadOnly: te,
    ariaRelevant: null,
    ariaRequired: te,
    ariaRoleDescription: q,
    ariaRowCount: S,
    ariaRowIndex: S,
    ariaRowSpan: S,
    ariaSelected: te,
    ariaSetSize: S,
    ariaSort: null,
    ariaValueMax: S,
    ariaValueMin: S,
    ariaValueNow: S,
    ariaValueText: null,
    role: null
  },
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  }
});
function Zt(e, n) {
  return n in e ? e[n] : n;
}
function er(e, n) {
  return Zt(e, n.toLowerCase());
}
const Xr = $e({
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
    accept: Ue,
    acceptCharset: q,
    accessKey: q,
    action: null,
    allow: null,
    allowFullScreen: z,
    allowPaymentRequest: z,
    allowUserMedia: z,
    alt: null,
    as: null,
    async: z,
    autoCapitalize: null,
    autoComplete: q,
    autoFocus: z,
    autoPlay: z,
    blocking: q,
    capture: null,
    charSet: null,
    checked: z,
    cite: null,
    className: q,
    cols: S,
    colSpan: null,
    content: null,
    contentEditable: te,
    controls: z,
    controlsList: q,
    coords: S | Ue,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: z,
    defer: z,
    dir: null,
    dirName: null,
    disabled: z,
    download: zn,
    draggable: te,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: z,
    formTarget: null,
    headers: q,
    height: S,
    hidden: zn,
    high: S,
    href: null,
    hrefLang: null,
    htmlFor: q,
    httpEquiv: q,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: z,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: z,
    itemId: null,
    itemProp: q,
    itemRef: q,
    itemScope: z,
    itemType: q,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: z,
    low: S,
    manifest: null,
    max: null,
    maxLength: S,
    media: null,
    method: null,
    min: null,
    minLength: S,
    multiple: z,
    muted: z,
    name: null,
    nonce: null,
    noModule: z,
    noValidate: z,
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
    open: z,
    optimum: S,
    pattern: null,
    ping: q,
    placeholder: null,
    playsInline: z,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: z,
    referrerPolicy: null,
    rel: q,
    required: z,
    reversed: z,
    rows: S,
    rowSpan: S,
    sandbox: q,
    scope: null,
    scoped: z,
    seamless: z,
    selected: z,
    shadowRootClonable: z,
    shadowRootDelegatesFocus: z,
    shadowRootMode: null,
    shape: null,
    size: S,
    sizes: null,
    slot: null,
    span: S,
    spellCheck: te,
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
    typeMustMatch: z,
    useMap: null,
    value: te,
    width: S,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: q,
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
    compact: z,
    // Lists. Use CSS to reduce space between items instead
    declare: z,
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
    noResize: z,
    // `<frame>`
    noHref: z,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: z,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: z,
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
    scrolling: te,
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
    disablePictureInPicture: z,
    disableRemotePlayback: z,
    prefix: null,
    property: null,
    results: S,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: er
}), Yr = $e({
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
    about: fe,
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
    className: q,
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
    download: z,
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
    g1: Ue,
    g2: Ue,
    glyphName: Ue,
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
    kernelMatrix: fe,
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
    ping: q,
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
    property: fe,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: fe,
    rev: fe,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: fe,
    requiredFeatures: fe,
    requiredFonts: fe,
    requiredFormats: fe,
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
    strokeDashArray: fe,
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
    systemLanguage: fe,
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
    typeOf: fe,
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
  transform: Zt
}), nr = $e({
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
}), tr = $e({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: er
}), rr = $e({
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
}, Qr = /[A-Z]/g, at = /-[a-z]/g, Jr = /^data[-\w.:]+$/i;
function Gr(e, n) {
  const t = Ln(n);
  let r = n, i = ue;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && Jr.test(n)) {
    if (n.charAt(4) === "-") {
      const l = n.slice(5).replace(at, ei);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = n.slice(4);
      if (!at.test(l)) {
        let o = l.replace(Qr, Zr);
        o.charAt(0) !== "-" && (o = "-" + o), n = "data" + o;
      }
    }
    i = Un;
  }
  return new i(r, n);
}
function Zr(e) {
  return "-" + e.toLowerCase();
}
function ei(e) {
  return e.charAt(1).toUpperCase();
}
const ni = Jt([Gt, Xr, nr, tr, rr], "html"), qn = Jt([Gt, Yr, nr, tr, rr], "svg");
function ti(e) {
  return e.join(" ").trim();
}
var pn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ir(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var $n = {}, st = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, ri = /\n/g, ii = /^\s*/, li = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, oi = /^:\s*/, ai = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, si = /^[;\s]*/, ui = /^\s+|\s+$/g, ci = `
`, ut = "/", ct = "*", Re = "", pi = "comment", hi = "declaration", fi = function(e, n) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  n = n || {};
  var t = 1, r = 1;
  function i(y) {
    var x = y.match(ri);
    x && (t += x.length);
    var T = y.lastIndexOf(ci);
    r = ~T ? y.length - T : r + y.length;
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
      var T = x[0];
      return i(T), e = e.slice(T.length), x;
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
    if (!(ut != e.charAt(0) || ct != e.charAt(1))) {
      for (var x = 2; Re != e.charAt(x) && (ct != e.charAt(x) || ut != e.charAt(x + 1)); )
        ++x;
      if (x += 2, Re === e.charAt(x - 1))
        return a("End of comment missing");
      var T = e.slice(2, x - 2);
      return r += 2, i(T), e = e.slice(x), r += 2, y({
        type: pi,
        comment: T
      });
    }
  }
  function m() {
    var y = l(), x = s(li);
    if (x) {
      if (h(), !s(oi)) return a("property missing ':'");
      var T = s(ai), b = y({
        type: hi,
        property: pt(x[0].replace(st, Re)),
        value: T ? pt(T[0].replace(st, Re)) : Re
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
function pt(e) {
  return e ? e.replace(ui, Re) : Re;
}
var di = pn && pn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty($n, "__esModule", { value: !0 });
$n.default = gi;
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
var dn = {};
Object.defineProperty(dn, "__esModule", { value: !0 });
dn.camelCase = void 0;
var yi = /^--[a-zA-Z0-9_-]+$/, xi = /-([a-z])/g, wi = /^[^-]+$/, ki = /^-(webkit|moz|ms|o|khtml)-/, bi = /^-(ms)-/, Si = function(e) {
  return !e || wi.test(e) || yi.test(e);
}, Ci = function(e, n) {
  return n.toUpperCase();
}, ht = function(e, n) {
  return "".concat(n, "-");
}, Ei = function(e, n) {
  return n === void 0 && (n = {}), Si(e) ? e : (e = e.toLowerCase(), n.reactCompat ? e = e.replace(bi, ht) : e = e.replace(ki, ht), e.replace(xi, Ci));
};
dn.camelCase = Ei;
var _i = pn && pn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, Ii = _i($n), Ti = dn;
function Dn(e, n) {
  var t = {};
  return !e || typeof e != "string" || (0, Ii.default)(e, function(r, i) {
    r && i && (t[(0, Ti.camelCase)(r, n)] = i);
  }), t;
}
Dn.default = Dn;
var Pi = Dn;
const Ni = /* @__PURE__ */ ir(Pi), lr = or("end"), Wn = or("start");
function or(e) {
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
function vi(e) {
  const n = Wn(e), t = lr(e);
  if (n && t)
    return { start: n, end: t };
}
function Ge(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? ft(e.position) : "start" in e || "end" in e ? ft(e) : "line" in e || "column" in e ? Mn(e) : "";
}
function Mn(e) {
  return dt(e && e.line) + ":" + dt(e && e.column);
}
function ft(e) {
  return Mn(e && e.start) + "-" + Mn(e && e.end);
}
function dt(e) {
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
    this.ancestors = l.ancestors || void 0, this.cause = l.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = Ge(l.place) || "1:1", this.place = l.place || void 0, this.reason = this.message, this.ruleId = l.ruleId || void 0, this.source = l.source || void 0, this.stack = o && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
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
const Xn = {}.hasOwnProperty, Ai = /* @__PURE__ */ new Map(), Li = /[A-Z]/g, zi = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Oi = /* @__PURE__ */ new Set(["td", "th"]), ar = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
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
    schema: n.space === "svg" ? qn : ni,
    stylePropertyNameCase: n.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: n.tableCellAlignToStyle !== !1
  }, l = sr(i, e, void 0);
  return l && typeof l != "string" ? l : i.create(
    e,
    i.Fragment,
    { children: l || void 0 },
    void 0
  );
}
function sr(e, n, t) {
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
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (i = qn, e.schema = i), e.ancestors.push(n);
  const l = cr(e, n.tagName, !1), o = qi(e, n);
  let a = Kn(e, n);
  return zi.has(n.tagName) && (a = a.filter(function(s) {
    return typeof s == "string" ? !$r(s) : !0;
  })), ur(e, o, l, n), Yn(o, a), e.ancestors.pop(), e.schema = r, e.create(n, l, o, t);
}
function Ri(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  nn(e, n.position);
}
function Fi(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(n.data.estree)
    );
  nn(e, n.position);
}
function Bi(e, n, t) {
  const r = e.schema;
  let i = r;
  n.name === "svg" && r.space === "html" && (i = qn, e.schema = i), e.ancestors.push(n);
  const l = n.name === null ? e.Fragment : cr(e, n.name, !0), o = $i(e, n), a = Kn(e, n);
  return ur(e, o, l, n), Yn(o, a), e.ancestors.pop(), e.schema = r, e.create(n, l, o, t);
}
function ji(e, n, t) {
  const r = {};
  return Yn(r, Kn(e, n)), e.create(n, e.Fragment, r, t);
}
function Hi(e, n) {
  return n.value;
}
function ur(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function Yn(e, n) {
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
    const a = Array.isArray(l.children), s = Wn(r);
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
    if (i !== "children" && Xn.call(n.properties, i)) {
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
        nn(e, n.position);
    else {
      const i = r.name;
      let l;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, l = e.evaluater.evaluateExpression(a.expression);
        } else
          nn(e, n.position);
      else
        l = r.value === null ? !0 : r.value;
      t[i] = /** @type {Props[keyof Props]} */
      l;
    }
  return t;
}
function Kn(e, n) {
  const t = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Ai;
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
    const a = sr(e, l, o);
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
    throw i.file = e.filePath || void 0, i.url = ar + "#cannot-parse-style-attribute", i;
  }
}
function cr(e, n, t) {
  let r;
  if (!t)
    r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const i = n.split(".");
    let l = -1, o;
    for (; ++l < i.length; ) {
      const a = it(i[l]) ? { type: "Identifier", name: i[l] } : { type: "Literal", value: i[l] };
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
    r = it(n) && !/^[a-z]/.test(n) ? { type: "Identifier", name: n } : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return Xn.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  nn(e);
}
function nn(e, n) {
  const t = new le(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: n,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw t.file = e.filePath || void 0, t.url = ar + "#cannot-handle-mdx-estrees-without-createevaluater", t;
}
function Yi(e) {
  const n = {};
  let t;
  for (t in e)
    Xn.call(e, t) && (n[Ki(t)] = e[t]);
  return n;
}
function Ki(e) {
  let n = e.replace(Li, Qi);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function Qi(e) {
  return "-" + e.toLowerCase();
}
const Sn = {
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
  return pr(e, r, i);
}
function pr(e, n, t) {
  if (Zi(e)) {
    if ("value" in e)
      return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return mt(e.children, n, t);
  }
  return Array.isArray(e) ? mt(e, n, t) : "";
}
function mt(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = pr(e[i], n, t);
  return r.join("");
}
function Zi(e) {
  return !!(e && typeof e == "object");
}
const gt = document.createElement("i");
function Qn(e) {
  const n = "&" + e + ";";
  gt.innerHTML = n;
  const t = gt.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t
  );
}
function _e(e, n, t, r) {
  const i = e.length;
  let l = 0, o;
  if (n < 0 ? n = -n > i ? 0 : i + n : n = n > i ? i : n, t = t > 0 ? t : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(n, t), e.splice(...o);
  else
    for (t && e.splice(n, t); l < r.length; )
      o = r.slice(l, l + 1e4), o.unshift(n, 0), e.splice(...o), l += 1e4, n += 1e4;
}
function ye(e, n) {
  return e.length > 0 ? (_e(e, e.length, 0, n), e) : n;
}
const yt = {}.hasOwnProperty;
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
    const i = (yt.call(e, t) ? e[t] : void 0) || (e[t] = {}), l = n[t];
    let o;
    if (l)
      for (o in l) {
        yt.call(i, o) || (i[o] = []);
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
  _e(e, 0, 0, r);
}
function hr(e, n) {
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
function qe(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Ee = ze(/[A-Za-z]/), me = ze(/[\dA-Za-z]/), rl = ze(/[#-'*+\--9=?A-Z^-~]/);
function Rn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Fn = ze(/\d/), il = ze(/[\dA-Fa-f]/), ll = ze(/[!-/:-@[-`{-~]/);
function v(e) {
  return e !== null && e < -2;
}
function se(e) {
  return e !== null && (e < 0 || e === 32);
}
function F(e) {
  return e === -2 || e === -1 || e === 32;
}
const ol = ze(new RegExp("\\p{P}|\\p{S}", "u")), al = ze(/\s/);
function ze(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function We(e) {
  const n = [];
  let t = -1, r = 0, i = 0;
  for (; ++t < e.length; ) {
    const l = e.charCodeAt(t);
    let o = "";
    if (l === 37 && me(e.charCodeAt(t + 1)) && me(e.charCodeAt(t + 2)))
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
function $(e, n, t, r) {
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
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), $(e, n, "linePrefix");
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
    return v(a) ? (e.consume(a), e.exit("chunkText"), l) : (e.consume(a), o);
  }
}
const cl = {
  tokenize: pl
}, xt = {
  tokenize: hl
};
function pl(e) {
  const n = this, t = [];
  let r = 0, i, l, o;
  return a;
  function a(I) {
    if (r < t.length) {
      const H = t[r];
      return n.containerState = H[1], e.attempt(H[0].continuation, s, c)(I);
    }
    return c(I);
  }
  function s(I) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, i && A();
      const H = n.events.length;
      let U = H, k;
      for (; U--; )
        if (n.events[U][0] === "exit" && n.events[U][1].type === "chunkFlow") {
          k = n.events[U][1].end;
          break;
        }
      b(r);
      let B = H;
      for (; B < n.events.length; )
        n.events[B][1].end = {
          ...k
        }, B++;
      return _e(n.events, U + 1, 0, n.events.slice(H)), n.events.length = B, c(I);
    }
    return a(I);
  }
  function c(I) {
    if (r === t.length) {
      if (!i)
        return m(I);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return y(I);
      n.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(xt, u, h)(I);
  }
  function u(I) {
    return i && A(), b(r), m(I);
  }
  function h(I) {
    return n.parser.lazy[n.now().line] = r !== t.length, o = n.now().offset, y(I);
  }
  function m(I) {
    return n.containerState = {}, e.attempt(xt, p, y)(I);
  }
  function p(I) {
    return r++, t.push([n.currentConstruct, n.containerState]), m(I);
  }
  function y(I) {
    if (I === null) {
      i && A(), b(0), e.consume(I);
      return;
    }
    return i = i || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: l
    }), x(I);
  }
  function x(I) {
    if (I === null) {
      T(e.exit("chunkFlow"), !0), b(0), e.consume(I);
      return;
    }
    return v(I) ? (e.consume(I), T(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, a) : (e.consume(I), x);
  }
  function T(I, H) {
    const U = n.sliceStream(I);
    if (H && U.push(null), I.previous = l, l && (l.next = I), l = I, i.defineSkip(I.start), i.write(U), n.parser.lazy[I.start.line]) {
      let k = i.events.length;
      for (; k--; )
        if (
          // The token starts before the line ending…
          i.events[k][1].start.offset < o && // …and either is not ended yet…
          (!i.events[k][1].end || // …or ends after it.
          i.events[k][1].end.offset > o)
        )
          return;
      const B = n.events.length;
      let W = B, O, j;
      for (; W--; )
        if (n.events[W][0] === "exit" && n.events[W][1].type === "chunkFlow") {
          if (O) {
            j = n.events[W][1].end;
            break;
          }
          O = !0;
        }
      for (b(r), k = B; k < n.events.length; )
        n.events[k][1].end = {
          ...j
        }, k++;
      _e(n.events, W + 1, 0, n.events.slice(B)), n.events.length = k;
    }
  }
  function b(I) {
    let H = t.length;
    for (; H-- > I; ) {
      const U = t[H];
      n.containerState = U[1], U[0].exit.call(n, e);
    }
    t.length = I;
  }
  function A() {
    i.write([null]), l = void 0, i = void 0, n.containerState._closeFlow = void 0;
  }
}
function hl(e, n, t) {
  return $(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function wt(e) {
  if (e === null || se(e) || al(e))
    return 1;
  if (ol(e))
    return 2;
}
function Jn(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll;
    l && !r.includes(l) && (n = l(n, t), r.push(l));
  }
  return n;
}
const Bn = {
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
          kt(h, -s), kt(m, s), o = {
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
          }, c = [], e[r][1].end.offset - e[r][1].start.offset && (c = ye(c, [["enter", e[r][1], n], ["exit", e[r][1], n]])), c = ye(c, [["enter", i, n], ["enter", o, n], ["exit", o, n], ["enter", l, n]]), c = ye(c, Jn(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), c = ye(c, [["exit", l, n], ["enter", a, n], ["exit", a, n], ["exit", i, n]]), e[t][1].end.offset - e[t][1].start.offset ? (u = 2, c = ye(c, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : u = 0, _e(e, r - 1, t - r + 3, c), t = r + c.length - u - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function dl(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, i = wt(r);
  let l;
  return o;
  function o(s) {
    return l = s, e.enter("attentionSequence"), a(s);
  }
  function a(s) {
    if (s === l)
      return e.consume(s), a;
    const c = e.exit("attentionSequence"), u = wt(s), h = !u || u === 2 && i || t.includes(s), m = !i || i === 2 && u || t.includes(r);
    return c._open = !!(l === 42 ? h : h && (i || !m)), c._close = !!(l === 42 ? m : m && (u || !h)), n(s);
  }
}
function kt(e, n) {
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
    return Ee(p) ? (e.consume(p), o) : p === 64 ? t(p) : c(p);
  }
  function o(p) {
    return p === 43 || p === 45 || p === 46 || me(p) ? (r = 1, a(p)) : c(p);
  }
  function a(p) {
    return p === 58 ? (e.consume(p), r = 0, s) : (p === 43 || p === 45 || p === 46 || me(p)) && r++ < 32 ? (e.consume(p), a) : (r = 0, c(p));
  }
  function s(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), n) : p === null || p === 32 || p === 60 || Rn(p) ? t(p) : (e.consume(p), s);
  }
  function c(p) {
    return p === 64 ? (e.consume(p), u) : rl(p) ? (e.consume(p), c) : t(p);
  }
  function u(p) {
    return me(p) ? h(p) : t(p);
  }
  function h(p) {
    return p === 46 ? (e.consume(p), r = 0, u) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), n) : m(p);
  }
  function m(p) {
    if ((p === 45 || me(p)) && r++ < 63) {
      const y = p === 45 ? m : h;
      return e.consume(p), y;
    }
    return t(p);
  }
}
const mn = {
  partial: !0,
  tokenize: yl
};
function yl(e, n, t) {
  return r;
  function r(l) {
    return F(l) ? $(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || v(l) ? n(l) : t(l);
  }
}
const fr = {
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
    return F(o) ? $(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : l(o);
  }
  function l(o) {
    return e.attempt(fr, n, t)(o);
  }
}
function kl(e) {
  e.exit("blockQuote");
}
const dr = {
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
const mr = {
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
    return h === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(h), e.exit("characterReferenceMarkerNumeric"), c) : (e.enter("characterReferenceValue"), l = 31, o = me, u(h));
  }
  function c(h) {
    return h === 88 || h === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(h), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), l = 6, o = il, u) : (e.enter("characterReferenceValue"), l = 7, o = Fn, u(h));
  }
  function u(h) {
    if (h === 59 && i) {
      const m = e.exit("characterReferenceValue");
      return o === me && !Qn(r.sliceSerialize(m)) ? t(h) : (e.enter("characterReferenceMarker"), e.consume(h), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return o(h) && i++ < l ? (e.consume(h), u) : t(h);
  }
}
const bt = {
  partial: !0,
  tokenize: El
}, St = {
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
  function s(k) {
    return c(k);
  }
  function c(k) {
    const B = r.events[r.events.length - 1];
    return l = B && B[1].type === "linePrefix" ? B[2].sliceSerialize(B[1], !0).length : 0, a = k, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(k);
  }
  function u(k) {
    return k === a ? (o++, e.consume(k), u) : o < 3 ? t(k) : (e.exit("codeFencedFenceSequence"), F(k) ? $(e, h, "whitespace")(k) : h(k));
  }
  function h(k) {
    return k === null || v(k) ? (e.exit("codeFencedFence"), r.interrupt ? n(k) : e.check(bt, x, H)(k)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), m(k));
  }
  function m(k) {
    return k === null || v(k) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), h(k)) : F(k) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), $(e, p, "whitespace")(k)) : k === 96 && k === a ? t(k) : (e.consume(k), m);
  }
  function p(k) {
    return k === null || v(k) ? h(k) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), y(k));
  }
  function y(k) {
    return k === null || v(k) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), h(k)) : k === 96 && k === a ? t(k) : (e.consume(k), y);
  }
  function x(k) {
    return e.attempt(i, H, T)(k);
  }
  function T(k) {
    return e.enter("lineEnding"), e.consume(k), e.exit("lineEnding"), b;
  }
  function b(k) {
    return l > 0 && F(k) ? $(e, A, "linePrefix", l + 1)(k) : A(k);
  }
  function A(k) {
    return k === null || v(k) ? e.check(bt, x, H)(k) : (e.enter("codeFlowValue"), I(k));
  }
  function I(k) {
    return k === null || v(k) ? (e.exit("codeFlowValue"), A(k)) : (e.consume(k), I);
  }
  function H(k) {
    return e.exit("codeFenced"), n(k);
  }
  function U(k, B, W) {
    let O = 0;
    return j;
    function j(D) {
      return k.enter("lineEnding"), k.consume(D), k.exit("lineEnding"), P;
    }
    function P(D) {
      return k.enter("codeFencedFence"), F(D) ? $(k, N, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(D) : N(D);
    }
    function N(D) {
      return D === a ? (k.enter("codeFencedFenceSequence"), R(D)) : W(D);
    }
    function R(D) {
      return D === a ? (O++, k.consume(D), R) : O >= o ? (k.exit("codeFencedFenceSequence"), F(D) ? $(k, Q, "whitespace")(D) : Q(D)) : W(D);
    }
    function Q(D) {
      return D === null || v(D) ? (k.exit("codeFencedFence"), B(D)) : W(D);
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
const Cn = {
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
    return e.enter("codeIndented"), $(e, l, "linePrefix", 5)(c);
  }
  function l(c) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? o(c) : t(c);
  }
  function o(c) {
    return c === null ? s(c) : v(c) ? e.attempt(_l, o, s)(c) : (e.enter("codeFlowValue"), a(c));
  }
  function a(c) {
    return c === null || v(c) ? (e.exit("codeFlowValue"), o(c)) : (e.consume(c), a);
  }
  function s(c) {
    return e.exit("codeIndented"), n(c);
  }
}
function Tl(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? t(o) : v(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : $(e, l, "linePrefix", 5)(o);
  }
  function l(o) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(o) : v(o) ? i(o) : t(o);
  }
}
const Pl = {
  name: "codeText",
  previous: vl,
  resolve: Nl,
  tokenize: Al
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
function vl(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Al(e, n, t) {
  let r = 0, i, l;
  return o;
  function o(h) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(h);
  }
  function a(h) {
    return h === 96 ? (e.consume(h), r++, a) : (e.exit("codeTextSequence"), s(h));
  }
  function s(h) {
    return h === null ? t(h) : h === 32 ? (e.enter("space"), e.consume(h), e.exit("space"), s) : h === 96 ? (l = e.enter("codeTextSequence"), i = 0, u(h)) : v(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), s) : (e.enter("codeTextData"), c(h));
  }
  function c(h) {
    return h === null || h === 32 || h === 96 || v(h) ? (e.exit("codeTextData"), s(h)) : (e.consume(h), c);
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
    return r && Ke(this.left, r), l.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Ke(this.left, n);
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
    this.setCursor(0), Ke(this.right, n.reverse());
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
        Ke(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        Ke(this.left, t.reverse());
      }
  }
}
function Ke(e, n) {
  let t = 0;
  if (n.length < 1e4)
    e.push(...n);
  else
    for (; t < n.length; )
      e.push(...n.slice(t, t + 1e4)), t += 1e4;
}
function gr(e) {
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
  return _e(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !c;
}
function zl(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let i = n - 1;
  const l = [];
  let o = t._tokenizer;
  o || (o = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const a = o.events, s = [], c = {};
  let u, h, m = -1, p = t, y = 0, x = 0;
  const T = [x];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    l.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), h && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), h = p, p = p.next;
  }
  for (p = t; ++m < a.length; )
    // Find a void token that includes a break.
    a[m][0] === "exit" && a[m - 1][0] === "enter" && a[m][1].type === a[m - 1][1].type && a[m][1].start.line !== a[m][1].end.line && (x = m + 1, T.push(x), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : T.pop(), m = T.length; m--; ) {
    const b = a.slice(T[m], T[m + 1]), A = l.pop();
    s.push([A, A + b.length - 1]), e.splice(A, 2, b);
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
  return gr(e), e;
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
    return a === null ? l(a) : v(a) ? e.check(Dl, o, l)(a) : (e.consume(a), i);
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
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), $(e, l, "linePrefix");
  }
  function l(o) {
    if (o === null || v(o))
      return t(o);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(o) : e.interrupt(r.parser.constructs.flow, t, n)(o);
  }
}
function yr(e, n, t, r, i, l, o, a, s) {
  const c = s || Number.POSITIVE_INFINITY;
  let u = 0;
  return h;
  function h(b) {
    return b === 60 ? (e.enter(r), e.enter(i), e.enter(l), e.consume(b), e.exit(l), m) : b === null || b === 32 || b === 41 || Rn(b) ? t(b) : (e.enter(r), e.enter(o), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), x(b));
  }
  function m(b) {
    return b === 62 ? (e.enter(l), e.consume(b), e.exit(l), e.exit(i), e.exit(r), n) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), p(b));
  }
  function p(b) {
    return b === 62 ? (e.exit("chunkString"), e.exit(a), m(b)) : b === null || b === 60 || v(b) ? t(b) : (e.consume(b), b === 92 ? y : p);
  }
  function y(b) {
    return b === 60 || b === 62 || b === 92 ? (e.consume(b), p) : p(b);
  }
  function x(b) {
    return !u && (b === null || b === 41 || se(b)) ? (e.exit("chunkString"), e.exit(a), e.exit(o), e.exit(r), n(b)) : u < c && b === 40 ? (e.consume(b), u++, x) : b === 41 ? (e.consume(b), u--, x) : b === null || b === 32 || b === 40 || Rn(b) ? t(b) : (e.consume(b), b === 92 ? T : x);
  }
  function T(b) {
    return b === 40 || b === 41 || b === 92 ? (e.consume(b), x) : x(b);
  }
}
function xr(e, n, t, r, i, l) {
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
    p === 94 && !a && "_hiddenFootnoteSupport" in o.parser.constructs ? t(p) : p === 93 ? (e.exit(l), e.enter(i), e.consume(p), e.exit(i), e.exit(r), n) : v(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), h(p));
  }
  function h(p) {
    return p === null || p === 91 || p === 93 || v(p) || a++ > 999 ? (e.exit("chunkString"), u(p)) : (e.consume(p), s || (s = !F(p)), p === 92 ? m : h);
  }
  function m(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), a++, h) : h(p);
  }
}
function wr(e, n, t, r, i, l) {
  let o;
  return a;
  function a(m) {
    return m === 34 || m === 39 || m === 40 ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), o = m === 40 ? 41 : m, s) : t(m);
  }
  function s(m) {
    return m === o ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), n) : (e.enter(l), c(m));
  }
  function c(m) {
    return m === o ? (e.exit(l), s(o)) : m === null ? t(m) : v(m) ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), $(e, c, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), u(m));
  }
  function u(m) {
    return m === o || m === null || v(m) ? (e.exit("chunkString"), c(m)) : (e.consume(m), m === 92 ? h : u);
  }
  function h(m) {
    return m === o || m === 92 ? (e.consume(m), u) : u(m);
  }
}
function Ze(e, n) {
  let t;
  return r;
  function r(i) {
    return v(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), t = !0, r) : F(i) ? $(e, r, t ? "linePrefix" : "lineSuffix")(i) : n(i);
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
    return xr.call(
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
    return i = qe(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), s) : t(p);
  }
  function s(p) {
    return se(p) ? Ze(e, c)(p) : c(p);
  }
  function c(p) {
    return yr(
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
    return F(p) ? $(e, m, "whitespace")(p) : m(p);
  }
  function m(p) {
    return p === null || v(p) ? (e.exit("definition"), r.parser.defined.push(i), n(p)) : t(p);
  }
}
function Vl(e, n, t) {
  return r;
  function r(a) {
    return se(a) ? Ze(e, i)(a) : t(a);
  }
  function i(a) {
    return wr(e, l, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function l(a) {
    return F(a) ? $(e, o, "whitespace")(a) : o(a);
  }
  function o(a) {
    return a === null || v(a) ? n(a) : t(a);
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
    return v(l) ? (e.exit("hardBreakEscape"), n(l)) : t(l);
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
  }, _e(e, r, t - r + 1, [["enter", i, n], ["enter", l, n], ["exit", l, n], ["exit", i, n]])), e;
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
    return u === 35 && r++ < 6 ? (e.consume(u), o) : u === null || se(u) ? (e.exit("atxHeadingSequence"), a(u)) : t(u);
  }
  function a(u) {
    return u === 35 ? (e.enter("atxHeadingSequence"), s(u)) : u === null || v(u) ? (e.exit("atxHeading"), n(u)) : F(u) ? $(e, a, "whitespace")(u) : (e.enter("atxHeadingText"), c(u));
  }
  function s(u) {
    return u === 35 ? (e.consume(u), s) : (e.exit("atxHeadingSequence"), a(u));
  }
  function c(u) {
    return u === null || u === 35 || se(u) ? (e.exit("atxHeadingText"), a(u)) : (e.consume(u), c);
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
], Ct = ["pre", "script", "style", "textarea"], Kl = {
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
    return d === 33 ? (e.consume(d), m) : d === 47 ? (e.consume(d), l = !0, x) : d === 63 ? (e.consume(d), i = 3, r.interrupt ? n : f) : Ee(d) ? (e.consume(d), o = String.fromCharCode(d), T) : t(d);
  }
  function m(d) {
    return d === 45 ? (e.consume(d), i = 2, p) : d === 91 ? (e.consume(d), i = 5, a = 0, y) : Ee(d) ? (e.consume(d), i = 4, r.interrupt ? n : f) : t(d);
  }
  function p(d) {
    return d === 45 ? (e.consume(d), r.interrupt ? n : f) : t(d);
  }
  function y(d) {
    const pe = "CDATA[";
    return d === pe.charCodeAt(a++) ? (e.consume(d), a === pe.length ? r.interrupt ? n : N : y) : t(d);
  }
  function x(d) {
    return Ee(d) ? (e.consume(d), o = String.fromCharCode(d), T) : t(d);
  }
  function T(d) {
    if (d === null || d === 47 || d === 62 || se(d)) {
      const pe = d === 47, Ie = o.toLowerCase();
      return !pe && !l && Ct.includes(Ie) ? (i = 1, r.interrupt ? n(d) : N(d)) : Yl.includes(o.toLowerCase()) ? (i = 6, pe ? (e.consume(d), b) : r.interrupt ? n(d) : N(d)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(d) : l ? A(d) : I(d));
    }
    return d === 45 || me(d) ? (e.consume(d), o += String.fromCharCode(d), T) : t(d);
  }
  function b(d) {
    return d === 62 ? (e.consume(d), r.interrupt ? n : N) : t(d);
  }
  function A(d) {
    return F(d) ? (e.consume(d), A) : j(d);
  }
  function I(d) {
    return d === 47 ? (e.consume(d), j) : d === 58 || d === 95 || Ee(d) ? (e.consume(d), H) : F(d) ? (e.consume(d), I) : j(d);
  }
  function H(d) {
    return d === 45 || d === 46 || d === 58 || d === 95 || me(d) ? (e.consume(d), H) : U(d);
  }
  function U(d) {
    return d === 61 ? (e.consume(d), k) : F(d) ? (e.consume(d), U) : I(d);
  }
  function k(d) {
    return d === null || d === 60 || d === 61 || d === 62 || d === 96 ? t(d) : d === 34 || d === 39 ? (e.consume(d), s = d, B) : F(d) ? (e.consume(d), k) : W(d);
  }
  function B(d) {
    return d === s ? (e.consume(d), s = null, O) : d === null || v(d) ? t(d) : (e.consume(d), B);
  }
  function W(d) {
    return d === null || d === 34 || d === 39 || d === 47 || d === 60 || d === 61 || d === 62 || d === 96 || se(d) ? U(d) : (e.consume(d), W);
  }
  function O(d) {
    return d === 47 || d === 62 || F(d) ? I(d) : t(d);
  }
  function j(d) {
    return d === 62 ? (e.consume(d), P) : t(d);
  }
  function P(d) {
    return d === null || v(d) ? N(d) : F(d) ? (e.consume(d), P) : t(d);
  }
  function N(d) {
    return d === 45 && i === 2 ? (e.consume(d), G) : d === 60 && i === 1 ? (e.consume(d), J) : d === 62 && i === 4 ? (e.consume(d), ce) : d === 63 && i === 3 ? (e.consume(d), f) : d === 93 && i === 5 ? (e.consume(d), ne) : v(d) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Ql, xe, R)(d)) : d === null || v(d) ? (e.exit("htmlFlowData"), R(d)) : (e.consume(d), N);
  }
  function R(d) {
    return e.check(Jl, Q, xe)(d);
  }
  function Q(d) {
    return e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), D;
  }
  function D(d) {
    return d === null || v(d) ? R(d) : (e.enter("htmlFlowData"), N(d));
  }
  function G(d) {
    return d === 45 ? (e.consume(d), f) : N(d);
  }
  function J(d) {
    return d === 47 ? (e.consume(d), o = "", oe) : N(d);
  }
  function oe(d) {
    if (d === 62) {
      const pe = o.toLowerCase();
      return Ct.includes(pe) ? (e.consume(d), ce) : N(d);
    }
    return Ee(d) && o.length < 8 ? (e.consume(d), o += String.fromCharCode(d), oe) : N(d);
  }
  function ne(d) {
    return d === 93 ? (e.consume(d), f) : N(d);
  }
  function f(d) {
    return d === 62 ? (e.consume(d), ce) : d === 45 && i === 2 ? (e.consume(d), f) : N(d);
  }
  function ce(d) {
    return d === null || v(d) ? (e.exit("htmlFlowData"), xe(d)) : (e.consume(d), ce);
  }
  function xe(d) {
    return e.exit("htmlFlow"), n(d);
  }
}
function eo(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return v(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l) : t(o);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o);
  }
}
function no(e, n, t) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(mn, n, t);
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
    return f === 33 ? (e.consume(f), c) : f === 47 ? (e.consume(f), U) : f === 63 ? (e.consume(f), I) : Ee(f) ? (e.consume(f), W) : t(f);
  }
  function c(f) {
    return f === 45 ? (e.consume(f), u) : f === 91 ? (e.consume(f), l = 0, y) : Ee(f) ? (e.consume(f), A) : t(f);
  }
  function u(f) {
    return f === 45 ? (e.consume(f), p) : t(f);
  }
  function h(f) {
    return f === null ? t(f) : f === 45 ? (e.consume(f), m) : v(f) ? (o = h, J(f)) : (e.consume(f), h);
  }
  function m(f) {
    return f === 45 ? (e.consume(f), p) : h(f);
  }
  function p(f) {
    return f === 62 ? G(f) : f === 45 ? m(f) : h(f);
  }
  function y(f) {
    const ce = "CDATA[";
    return f === ce.charCodeAt(l++) ? (e.consume(f), l === ce.length ? x : y) : t(f);
  }
  function x(f) {
    return f === null ? t(f) : f === 93 ? (e.consume(f), T) : v(f) ? (o = x, J(f)) : (e.consume(f), x);
  }
  function T(f) {
    return f === 93 ? (e.consume(f), b) : x(f);
  }
  function b(f) {
    return f === 62 ? G(f) : f === 93 ? (e.consume(f), b) : x(f);
  }
  function A(f) {
    return f === null || f === 62 ? G(f) : v(f) ? (o = A, J(f)) : (e.consume(f), A);
  }
  function I(f) {
    return f === null ? t(f) : f === 63 ? (e.consume(f), H) : v(f) ? (o = I, J(f)) : (e.consume(f), I);
  }
  function H(f) {
    return f === 62 ? G(f) : I(f);
  }
  function U(f) {
    return Ee(f) ? (e.consume(f), k) : t(f);
  }
  function k(f) {
    return f === 45 || me(f) ? (e.consume(f), k) : B(f);
  }
  function B(f) {
    return v(f) ? (o = B, J(f)) : F(f) ? (e.consume(f), B) : G(f);
  }
  function W(f) {
    return f === 45 || me(f) ? (e.consume(f), W) : f === 47 || f === 62 || se(f) ? O(f) : t(f);
  }
  function O(f) {
    return f === 47 ? (e.consume(f), G) : f === 58 || f === 95 || Ee(f) ? (e.consume(f), j) : v(f) ? (o = O, J(f)) : F(f) ? (e.consume(f), O) : G(f);
  }
  function j(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || me(f) ? (e.consume(f), j) : P(f);
  }
  function P(f) {
    return f === 61 ? (e.consume(f), N) : v(f) ? (o = P, J(f)) : F(f) ? (e.consume(f), P) : O(f);
  }
  function N(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? t(f) : f === 34 || f === 39 ? (e.consume(f), i = f, R) : v(f) ? (o = N, J(f)) : F(f) ? (e.consume(f), N) : (e.consume(f), Q);
  }
  function R(f) {
    return f === i ? (e.consume(f), i = void 0, D) : f === null ? t(f) : v(f) ? (o = R, J(f)) : (e.consume(f), R);
  }
  function Q(f) {
    return f === null || f === 34 || f === 39 || f === 60 || f === 61 || f === 96 ? t(f) : f === 47 || f === 62 || se(f) ? O(f) : (e.consume(f), Q);
  }
  function D(f) {
    return f === 47 || f === 62 || se(f) ? O(f) : t(f);
  }
  function G(f) {
    return f === 62 ? (e.consume(f), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(f);
  }
  function J(f) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), oe;
  }
  function oe(f) {
    return F(f) ? $(e, ne, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : ne(f);
  }
  function ne(f) {
    return e.enter("htmlTextData"), o(f);
  }
}
const Gn = {
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
  return e.length !== t.length && _e(e, 0, e.length, t), e;
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
  return a = [["enter", s, n], ["enter", c, n]], a = ye(a, e.slice(l + 1, l + r + 3)), a = ye(a, [["enter", u, n]]), a = ye(a, Jn(n.parser.constructs.insideSpan.null, e.slice(l + r + 4, o - 3), n)), a = ye(a, [["exit", u, n], e[o - 2], e[o - 1], ["exit", c, n]]), a = ye(a, e.slice(o + 1)), a = ye(a, [["exit", s, n]]), _e(e, l, e.length, a), e;
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
    return l ? l._inactive ? h(m) : (o = r.parser.defined.includes(qe(r.sliceSerialize({
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
    return se(h) ? Ze(e, l)(h) : l(h);
  }
  function l(h) {
    return h === 41 ? u(h) : yr(e, o, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(h);
  }
  function o(h) {
    return se(h) ? Ze(e, s)(h) : u(h);
  }
  function a(h) {
    return t(h);
  }
  function s(h) {
    return h === 34 || h === 39 || h === 40 ? wr(e, c, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(h) : u(h);
  }
  function c(h) {
    return se(h) ? Ze(e, u)(h) : u(h);
  }
  function u(h) {
    return h === 41 ? (e.enter("resourceMarker"), e.consume(h), e.exit("resourceMarker"), e.exit("resource"), n) : t(h);
  }
}
function po(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return xr.call(r, e, l, o, "reference", "referenceMarker", "referenceString")(a);
  }
  function l(a) {
    return r.parser.defined.includes(qe(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(a) : t(a);
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
  resolveAll: Gn.resolveAll,
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
  resolveAll: Gn.resolveAll,
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
const En = {
  name: "lineEnding",
  tokenize: xo
};
function xo(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), $(e, n, "linePrefix");
  }
}
const un = {
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
    return c === i ? (e.enter("thematicBreakSequence"), s(c)) : r >= 3 && (c === null || v(c)) ? (e.exit("thematicBreak"), n(c)) : t(c);
  }
  function s(c) {
    return c === i ? (e.consume(c), r++, s) : (e.exit("thematicBreakSequence"), F(c) ? $(e, a, "whitespace")(c) : a(c));
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
    if (y === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : Fn(p)) {
      if (r.containerState.type || (r.containerState.type = y, e.enter(y, {
        _container: !0
      })), y === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(un, t, c)(p) : c(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(p);
    }
    return t(p);
  }
  function s(p) {
    return Fn(p) && ++o < 10 ? (e.consume(p), s) : (!r.interrupt || o < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), c(p)) : t(p);
  }
  function c(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      mn,
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
  return r.containerState._closeFlow = void 0, e.check(mn, i, l);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, $(e, n, "listItemIndent", r.containerState.size + 1)(a);
  }
  function l(a) {
    return r.containerState.furtherBlankLines || !F(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(bo, n, o)(a));
  }
  function o(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, $(e, e.attempt(ae, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function Eo(e, n, t) {
  const r = this;
  return $(e, i, "listItemIndent", r.containerState.size + 1);
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
  return $(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return !F(l) && o && o[1].type === "listItemPrefixWhitespace" ? n(l) : t(l);
  }
}
const Et = {
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
    return c === i ? (e.consume(c), a) : (e.exit("setextHeadingLineSequence"), F(c) ? $(e, s, "lineSuffix")(c) : s(c));
  }
  function s(c) {
    return c === null || v(c) ? (e.exit("setextHeadingLine"), n(c)) : t(c);
  }
}
const No = {
  tokenize: vo
};
function vo(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    mn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, $(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Ol, i)), "linePrefix"))
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
const Ao = {
  resolveAll: br()
}, Lo = kr("string"), zo = kr("text");
function kr(e) {
  return {
    resolveAll: br(e === "text" ? Oo : void 0),
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
function br(e) {
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
  62: fr
}, Mo = {
  91: Bl
}, Ro = {
  [-2]: Cn,
  [-1]: Cn,
  32: Cn
}, Fo = {
  35: $l,
  42: un,
  45: [Et, un],
  60: Kl,
  61: Et,
  95: un,
  96: St,
  126: St
}, Bo = {
  38: mr,
  92: dr
}, jo = {
  [-5]: En,
  [-4]: En,
  [-3]: En,
  33: fo,
  38: mr,
  42: Bn,
  60: [ml, to],
  91: go,
  92: [Ul, dr],
  93: Gn,
  95: Bn,
  96: Pl
}, Ho = {
  null: [Bn, Ao]
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
    attempt: B(U),
    check: B(k),
    consume: A,
    enter: I,
    exit: H,
    interrupt: B(k, {
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
    return o = ye(o, P), T(), o[o.length - 1] !== null ? [] : (W(n, 0), c.events = Jn(l, c.events, c), c.events);
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
      line: R,
      column: Q,
      offset: D
    } = r;
    return {
      _bufferIndex: P,
      _index: N,
      line: R,
      column: Q,
      offset: D
    };
  }
  function x(P) {
    i[P.line] = P.column, j();
  }
  function T() {
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
  function A(P) {
    v(P) ? (r.line++, r.column = 1, r.offset += P === -3 ? 2 : 1, j()) : P !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = P;
  }
  function I(P, N) {
    const R = N || {};
    return R.type = P, R.start = y(), c.events.push(["enter", R, c]), a.push(R), R;
  }
  function H(P) {
    const N = a.pop();
    return N.end = y(), c.events.push(["exit", N, c]), N;
  }
  function U(P, N) {
    W(P, N.from);
  }
  function k(P, N) {
    N.restore();
  }
  function B(P, N) {
    return R;
    function R(Q, D, G) {
      let J, oe, ne, f;
      return Array.isArray(Q) ? (
        /* c8 ignore next 1 */
        xe(Q)
      ) : "tokenize" in Q ? (
        // Looks like a construct.
        xe([
          /** @type {Construct} */
          Q
        ])
      ) : ce(Q);
      function ce(Z) {
        return Be;
        function Be(Se) {
          const ve = Se !== null && Z[Se], Ae = Se !== null && Z.null, je = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(ve) ? ve : ve ? [ve] : [],
            ...Array.isArray(Ae) ? Ae : Ae ? [Ae] : []
          ];
          return xe(je)(Se);
        }
      }
      function xe(Z) {
        return J = Z, oe = 0, Z.length === 0 ? G : d(Z[oe]);
      }
      function d(Z) {
        return Be;
        function Be(Se) {
          return f = O(), ne = Z, Z.partial || (c.currentConstruct = Z), Z.name && c.parser.constructs.disable.null.includes(Z.name) ? Ie() : Z.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            N ? Object.assign(Object.create(c), N) : c,
            s,
            pe,
            Ie
          )(Se);
        }
      }
      function pe(Z) {
        return P(ne, f), D;
      }
      function Ie(Z) {
        return f.restore(), ++oe < J.length ? d(J[oe]) : G;
      }
    }
  }
  function W(P, N) {
    P.resolveAll && !l.includes(P) && l.push(P), P.resolve && _e(c.events, N, c.events.length - N, P.resolve(c.events.slice(N), c)), P.resolveTo && (c.events = P.resolveTo(c.events, c));
  }
  function O() {
    const P = y(), N = c.previous, R = c.currentConstruct, Q = c.events.length, D = Array.from(a);
    return {
      from: Q,
      restore: G
    };
    function G() {
      r = P, c.previous = N, c.currentConstruct = R, c.events.length = Q, a = D, j();
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
  for (; !gr(e); )
    ;
  return e;
}
const _t = /[\0\t\n\r]/g;
function Qo() {
  let e = 1, n = "", t = !0, r;
  return i;
  function i(l, o, a) {
    const s = [];
    let c, u, h, m, p;
    for (l = n + (typeof l == "string" ? l.toString() : new TextDecoder(o || void 0).decode(l)), h = 0, n = "", t && (l.charCodeAt(0) === 65279 && h++, t = void 0); h < l.length; ) {
      if (_t.lastIndex = h, c = _t.exec(l), m = c && c.index !== void 0 ? c.index : l.length, p = l.charCodeAt(m), !c) {
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
    return hr(t.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return Qn(t) || e;
}
const Sr = {}.hasOwnProperty;
function ea(e, n, t) {
  return typeof n != "string" && (t = n, n = void 0), na(t)(Ko(Yo(t).document().write(Qo()(e, n, !0))));
}
function na(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(ee),
      autolinkProtocol: O,
      autolinkEmail: O,
      atxHeading: l(_),
      blockQuote: l(Ae),
      characterEscape: O,
      characterReference: O,
      codeFenced: l(je),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l(je, o),
      codeText: l(xn, o),
      codeTextData: O,
      data: O,
      codeFlowValue: O,
      definition: l(wn),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(C),
      hardBreakEscape: l(Y),
      hardBreakTrailing: l(Y),
      htmlFlow: l(re, o),
      htmlFlowData: O,
      htmlText: l(re, o),
      htmlTextData: O,
      image: l(Te),
      label: o,
      link: l(ee),
      listItem: l(we),
      listItemValue: m,
      listOrdered: l(ge, h),
      listUnordered: l(ge),
      paragraph: l(Oe),
      reference: d,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: l(_),
      strong: l(X),
      thematicBreak: l(Dr)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: U,
      autolink: s(),
      autolinkEmail: ve,
      autolinkProtocol: Se,
      blockQuote: s(),
      characterEscapeValue: j,
      characterReferenceMarkerHexadecimal: Ie,
      characterReferenceMarkerNumeric: Ie,
      characterReferenceValue: Z,
      characterReference: Be,
      codeFenced: s(T),
      codeFencedFence: x,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: y,
      codeFlowValue: j,
      codeIndented: s(b),
      codeText: s(D),
      codeTextData: j,
      data: j,
      definition: s(),
      definitionDestinationString: H,
      definitionLabelString: A,
      definitionTitleString: I,
      emphasis: s(),
      hardBreakEscape: s(N),
      hardBreakTrailing: s(N),
      htmlFlow: s(R),
      htmlFlowData: j,
      htmlText: s(Q),
      htmlTextData: j,
      image: s(J),
      label: ne,
      labelText: oe,
      lineEnding: P,
      link: s(G),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: pe,
      resourceDestinationString: f,
      resourceTitleString: ce,
      resource: xe,
      setextHeading: s(W),
      setextHeadingLineSequence: B,
      setextHeadingText: k,
      strong: s(),
      thematicBreak: s()
    }
  };
  Cr(n, (e || {}).mdastExtensions || []);
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
    }, M = [];
    let V = -1;
    for (; ++V < g.length; )
      if (g[V][1].type === "listOrdered" || g[V][1].type === "listUnordered")
        if (g[V][0] === "enter")
          M.push(V);
        else {
          const ke = M.pop();
          V = i(g, ke, V);
        }
    for (V = -1; ++V < g.length; ) {
      const ke = n[g[V][0]];
      Sr.call(ke, g[V][1].type) && ke[g[V][1].type].call(Object.assign({
        sliceSerialize: g[V][2].sliceSerialize
      }, L), g[V][1]);
    }
    if (L.tokenStack.length > 0) {
      const ke = L.tokenStack[L.tokenStack.length - 1];
      (ke[1] || It).call(L, void 0, ke[0]);
    }
    for (E.position = {
      start: Le(g.length > 0 ? g[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Le(g.length > 0 ? g[g.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, V = -1; ++V < n.transforms.length; )
      E = n.transforms[V](E) || E;
    return E;
  }
  function i(g, E, L) {
    let M = E - 1, V = -1, ke = !1, Me, Pe, Xe, Ye;
    for (; ++M <= L; ) {
      const he = g[M];
      switch (he[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          he[0] === "enter" ? V++ : V--, Ye = void 0;
          break;
        }
        case "lineEndingBlank": {
          he[0] === "enter" && (Me && !Ye && !V && !Xe && (Xe = M), Ye = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Ye = void 0;
      }
      if (!V && he[0] === "enter" && he[1].type === "listItemPrefix" || V === -1 && he[0] === "exit" && (he[1].type === "listUnordered" || he[1].type === "listOrdered")) {
        if (Me) {
          let He = M;
          for (Pe = void 0; He--; ) {
            const Ne = g[He];
            if (Ne[1].type === "lineEnding" || Ne[1].type === "lineEndingBlank") {
              if (Ne[0] === "exit") continue;
              Pe && (g[Pe][1].type = "lineEndingBlank", ke = !0), Ne[1].type = "lineEnding", Pe = He;
            } else if (!(Ne[1].type === "linePrefix" || Ne[1].type === "blockQuotePrefix" || Ne[1].type === "blockQuotePrefixWhitespace" || Ne[1].type === "blockQuoteMarker" || Ne[1].type === "listItemIndent")) break;
          }
          Xe && (!Pe || Xe < Pe) && (Me._spread = !0), Me.end = Object.assign({}, Pe ? g[Pe][1].start : he[1].end), g.splice(Pe || M, 0, ["exit", Me, he[2]]), M++, L++;
        }
        if (he[1].type === "listItemPrefix") {
          const He = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, he[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Me = He, g.splice(M, 0, ["enter", He, he[2]]), M++, L++, Xe = void 0, Ye = !0;
        }
      }
    }
    return g[E][1]._spread = ke, L;
  }
  function l(g, E) {
    return L;
    function L(M) {
      a.call(this, g(M), M), E && E.call(this, M);
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
      start: Le(E.start),
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
    const L = this.stack.pop(), M = this.tokenStack.pop();
    if (M)
      M[0].type !== g.type && (E ? E.call(this, g, M[0]) : (M[1] || It).call(this, g, M[0]));
    else throw new Error("Cannot close `" + g.type + "` (" + Ge({
      start: g.start,
      end: g.end
    }) + "): it’s not open");
    L.position.end = Le(g.end);
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
  function T() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = g.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function b() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = g.replace(/(\r?\n|\r)$/g, "");
  }
  function A(g) {
    const E = this.resume(), L = this.stack[this.stack.length - 1];
    L.label = E, L.identifier = qe(this.sliceSerialize(g)).toLowerCase();
  }
  function I() {
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
  function k() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function B(g) {
    const E = this.stack[this.stack.length - 1];
    E.depth = this.sliceSerialize(g).codePointAt(0) === 61 ? 1 : 2;
  }
  function W() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function O(g) {
    const L = this.stack[this.stack.length - 1].children;
    let M = L[L.length - 1];
    (!M || M.type !== "text") && (M = De(), M.position = {
      start: Le(g.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, L.push(M)), this.stack.push(M);
  }
  function j(g) {
    const E = this.stack.pop();
    E.value += this.sliceSerialize(g), E.position.end = Le(g.end);
  }
  function P(g) {
    const E = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const L = E.children[E.children.length - 1];
      L.position.end = Le(g.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(E.type) && (O.call(this, g), j.call(this, g));
  }
  function N() {
    this.data.atHardBreak = !0;
  }
  function R() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = g;
  }
  function Q() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = g;
  }
  function D() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = g;
  }
  function G() {
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
  function oe(g) {
    const E = this.sliceSerialize(g), L = this.stack[this.stack.length - 2];
    L.label = Go(E), L.identifier = qe(E).toLowerCase();
  }
  function ne() {
    const g = this.stack[this.stack.length - 1], E = this.resume(), L = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, L.type === "link") {
      const M = g.children;
      L.children = M;
    } else
      L.alt = E;
  }
  function f() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = g;
  }
  function ce() {
    const g = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = g;
  }
  function xe() {
    this.data.inReference = void 0;
  }
  function d() {
    this.data.referenceType = "collapsed";
  }
  function pe(g) {
    const E = this.resume(), L = this.stack[this.stack.length - 1];
    L.label = E, L.identifier = qe(this.sliceSerialize(g)).toLowerCase(), this.data.referenceType = "full";
  }
  function Ie(g) {
    this.data.characterReferenceType = g.type;
  }
  function Z(g) {
    const E = this.sliceSerialize(g), L = this.data.characterReferenceType;
    let M;
    L ? (M = hr(E, L === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : M = Qn(E);
    const V = this.stack[this.stack.length - 1];
    V.value += M;
  }
  function Be(g) {
    const E = this.stack.pop();
    E.position.end = Le(g.end);
  }
  function Se(g) {
    j.call(this, g);
    const E = this.stack[this.stack.length - 1];
    E.url = this.sliceSerialize(g);
  }
  function ve(g) {
    j.call(this, g);
    const E = this.stack[this.stack.length - 1];
    E.url = "mailto:" + this.sliceSerialize(g);
  }
  function Ae() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function je() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function xn() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function wn() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function C() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function _() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Y() {
    return {
      type: "break"
    };
  }
  function re() {
    return {
      type: "html",
      value: ""
    };
  }
  function Te() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function ee() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function ge(g) {
    return {
      type: "list",
      ordered: g.type === "listOrdered",
      start: null,
      spread: g._spread,
      children: []
    };
  }
  function we(g) {
    return {
      type: "listItem",
      spread: g._spread,
      checked: null,
      children: []
    };
  }
  function Oe() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function X() {
    return {
      type: "strong",
      children: []
    };
  }
  function De() {
    return {
      type: "text",
      value: ""
    };
  }
  function Dr() {
    return {
      type: "thematicBreak"
    };
  }
}
function Le(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function Cr(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? Cr(e, r) : ta(e, r);
  }
}
function ta(e, n) {
  let t;
  for (t in n)
    if (Sr.call(n, t))
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
function It(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Ge({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + Ge({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + Ge({
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
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(n.identifier).toUpperCase(), i = We(r.toLowerCase()), l = e.footnoteOrder.indexOf(r);
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
function Er(e, n) {
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
    return Er(e, n);
  const i = { src: We(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(n, l), e.applyData(n, l);
}
function fa(e, n) {
  const t = { src: We(n.url) };
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
    return Er(e, n);
  const i = { href: We(r.url || "") };
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
  const t = { href: We(n.url) };
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
  const r = e.all(n), i = t ? xa(t) : _r(n), l = {}, o = [];
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
      n = _r(t[r]);
  }
  return n;
}
function _r(e) {
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
    }, a = Wn(n.children[1]), s = lr(n.children[n.children.length - 1]);
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
const Tt = 9, Pt = 32;
function Ia(e) {
  const n = String(e), t = /\r?\n|\r/g;
  let r = t.exec(n), i = 0;
  const l = [];
  for (; r; )
    l.push(
      Nt(n.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = t.exec(n);
  return l.push(Nt(n.slice(i), i > 0, !1)), l.join("");
}
function Nt(e, n, t) {
  let r = 0, i = e.length;
  if (n) {
    let l = e.codePointAt(r);
    for (; l === Tt || l === Pt; )
      r++, l = e.codePointAt(r);
  }
  if (t) {
    let l = e.codePointAt(i - 1);
    for (; l === Tt || l === Pt; )
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
  toml: on,
  yaml: on,
  definition: on,
  footnoteDefinition: on
};
function on() {
}
const Ir = -1, gn = 0, en = 1, hn = 2, Zn = 3, et = 4, nt = 5, tt = 6, Tr = 7, Pr = 8, vt = typeof self == "object" ? self : globalThis, va = (e, n) => {
  const t = (i, l) => (e.set(l, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [l, o] = n[i];
    switch (l) {
      case gn:
      case Ir:
        return t(o, i);
      case en: {
        const a = t([], i);
        for (const s of o)
          a.push(r(s));
        return a;
      }
      case hn: {
        const a = t({}, i);
        for (const [s, c] of o)
          a[r(s)] = r(c);
        return a;
      }
      case Zn:
        return t(new Date(o), i);
      case et: {
        const { source: a, flags: s } = o;
        return t(new RegExp(a, s), i);
      }
      case nt: {
        const a = t(/* @__PURE__ */ new Map(), i);
        for (const [s, c] of o)
          a.set(r(s), r(c));
        return a;
      }
      case tt: {
        const a = t(/* @__PURE__ */ new Set(), i);
        for (const s of o)
          a.add(r(s));
        return a;
      }
      case Tr: {
        const { name: a, message: s } = o;
        return t(new vt[a](s), i);
      }
      case Pr:
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
    return t(new vt[l](o), i);
  };
  return r;
}, At = (e) => va(/* @__PURE__ */ new Map(), e)(0), Ve = "", { toString: Aa } = {}, { keys: La } = Object, Qe = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [gn, n];
  const t = Aa.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [en, Ve];
    case "Object":
      return [hn, Ve];
    case "Date":
      return [Zn, Ve];
    case "RegExp":
      return [et, Ve];
    case "Map":
      return [nt, Ve];
    case "Set":
      return [tt, Ve];
    case "DataView":
      return [en, t];
  }
  return t.includes("Array") ? [en, t] : t.includes("Error") ? [Tr, t] : [hn, t];
}, an = ([e, n]) => e === gn && (n === "function" || n === "symbol"), za = (e, n, t, r) => {
  const i = (o, a) => {
    const s = r.push(o) - 1;
    return t.set(a, s), s;
  }, l = (o) => {
    if (t.has(o))
      return t.get(o);
    let [a, s] = Qe(o);
    switch (a) {
      case gn: {
        let u = o;
        switch (s) {
          case "bigint":
            a = Pr, u = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            u = null;
            break;
          case "undefined":
            return i([Ir], o);
        }
        return i([a, u], o);
      }
      case en: {
        if (s) {
          let m = o;
          return s === "DataView" ? m = new Uint8Array(o.buffer) : s === "ArrayBuffer" && (m = new Uint8Array(o)), i([s, [...m]], o);
        }
        const u = [], h = i([a, u], o);
        for (const m of o)
          u.push(l(m));
        return h;
      }
      case hn: {
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
          (e || !an(Qe(o[m]))) && u.push([l(m), l(o[m])]);
        return h;
      }
      case Zn:
        return i([a, o.toISOString()], o);
      case et: {
        const { source: u, flags: h } = o;
        return i([a, { source: u, flags: h }], o);
      }
      case nt: {
        const u = [], h = i([a, u], o);
        for (const [m, p] of o)
          (e || !(an(Qe(m)) || an(Qe(p)))) && u.push([l(m), l(p)]);
        return h;
      }
      case tt: {
        const u = [], h = i([a, u], o);
        for (const m of o)
          (e || !an(Qe(m))) && u.push(l(m));
        return h;
      }
    }
    const { message: c } = o;
    return i([a, { name: s, message: c }], o);
  };
  return l;
}, Lt = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return za(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, fn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? At(Lt(e, n)) : structuredClone(e)
) : (e, n) => At(Lt(e, n));
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
    const u = e.all(c), h = String(c.identifier).toUpperCase(), m = We(h.toLowerCase());
    let p = 0;
    const y = [], x = e.footnoteCounts.get(h);
    for (; x !== void 0 && ++p <= x; ) {
      y.length > 0 && y.push({ type: "text", value: " " });
      let A = typeof t == "string" ? t : t(s, p);
      typeof A == "string" && (A = { type: "text", value: A }), y.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + n + "fnref-" + m + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(A) ? A : [A]
      });
    }
    const T = u[u.length - 1];
    if (T && T.type === "element" && T.tagName === "p") {
      const A = T.children[T.children.length - 1];
      A && A.type === "text" ? A.value += " " : T.children.push({ type: "text", value: " " }), T.children.push(...y);
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
            ...fn(o),
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
const Nr = (
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
      return yn(e);
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
    n[t] = Nr(e[t]);
  return yn(r);
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
  return yn(t);
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
  return yn(n);
  function n(t) {
    return t && t.type === e;
  }
}
function yn(e) {
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
const vr = [], Va = !0, zt = !1, Ua = "skip";
function qa(e, n, t, r) {
  let i;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : i = n;
  const l = Nr(i), o = r ? -1 : 1;
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
      let p = vr, y, x, T;
      if ((!n || l(s, c, u[u.length - 1] || void 0)) && (p = $a(t(s, u)), p[0] === zt))
        return p;
      if ("children" in s && s.children) {
        const b = (
          /** @type {UnistParent} */
          s
        );
        if (b.children && p[0] !== Ua)
          for (x = (r ? b.children.length : -1) + o, T = u.concat(b); x > -1 && x < b.children.length; ) {
            const A = b.children[x];
            if (y = a(A, x, T)(), y[0] === zt)
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
function Ar(e, n, t, r) {
  let i, l, o;
  typeof n == "function" && typeof t != "function" ? (l = void 0, o = n, i = t) : (l = n, o = t, i = r), qa(e, l, a, i);
  function a(s, c) {
    const u = c[c.length - 1], h = u ? u.children.indexOf(s) : void 0;
    return o(s, h, u);
  }
}
const jn = {}.hasOwnProperty, Wa = {};
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
  return Ar(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const h = u.type === "definition" ? r : i, m = String(u.identifier).toUpperCase();
      h.has(m) || h.set(m, u);
    }
  }), a;
  function s(u, h) {
    const m = u.type, p = a.handlers[m];
    if (jn.call(a.handlers, m) && p)
      return p(a, u, h);
    if (a.options.passThrough && a.options.passThrough.includes(m)) {
      if ("children" in u) {
        const { children: x, ...T } = u, b = fn(T);
        return b.children = a.all(u), b;
      }
      return fn(u);
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
          if (p && m[p - 1].type === "break" && (!Array.isArray(y) && y.type === "text" && (y.value = Ot(y.value)), !Array.isArray(y) && y.type === "element")) {
            const x = y.children[0];
            x && x.type === "text" && (x.value = Ot(x.value));
          }
          Array.isArray(y) ? h.push(...y) : h.push(y);
        }
      }
    }
    return h;
  }
}
function Ya(e, n) {
  e.position && (n.position = vi(e));
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
    t.type === "element" && l && Object.assign(t.properties, fn(l)), "children" in t && t.children && i !== null && i !== void 0 && (t.children = i);
  }
  return t;
}
function Qa(e, n) {
  const t = n.data || {}, r = "value" in n && !(jn.call(t, "hProperties") || jn.call(t, "hChildren")) ? { type: "text", value: n.value } : {
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
function Ot(e) {
  let n = 0, t = e.charCodeAt(n);
  for (; t === 9 || t === 32; )
    n++, t = e.charCodeAt(n);
  return e.slice(n);
}
function Dt(e, n) {
  const t = Xa(e, n), r = t.one(e, void 0), i = Ma(t), l = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && l.children.push({ type: "text", value: `
` }, i), l;
}
function Ga(e, n) {
  return e && "run" in e ? async function(t, r) {
    const i = (
      /** @type {HastRoot} */
      Dt(t, { file: r, ...n })
    );
    await e.run(i, r);
  } : function(t, r) {
    return (
      /** @type {HastRoot} */
      Dt(t, { file: r, ...e || n })
    );
  };
}
function Mt(e) {
  if (e)
    throw e;
}
var cn = Object.prototype.hasOwnProperty, Lr = Object.prototype.toString, Rt = Object.defineProperty, Ft = Object.getOwnPropertyDescriptor, Bt = function(n) {
  return typeof Array.isArray == "function" ? Array.isArray(n) : Lr.call(n) === "[object Array]";
}, jt = function(n) {
  if (!n || Lr.call(n) !== "[object Object]")
    return !1;
  var t = cn.call(n, "constructor"), r = n.constructor && n.constructor.prototype && cn.call(n.constructor.prototype, "isPrototypeOf");
  if (n.constructor && !t && !r)
    return !1;
  var i;
  for (i in n)
    ;
  return typeof i > "u" || cn.call(n, i);
}, Ht = function(n, t) {
  Rt && t.name === "__proto__" ? Rt(n, t.name, {
    enumerable: !0,
    configurable: !0,
    value: t.newValue,
    writable: !0
  }) : n[t.name] = t.newValue;
}, Vt = function(n, t) {
  if (t === "__proto__")
    if (cn.call(n, t)) {
      if (Ft)
        return Ft(n, t).value;
    } else return;
  return n[t];
}, Za = function e() {
  var n, t, r, i, l, o, a = arguments[0], s = 1, c = arguments.length, u = !1;
  for (typeof a == "boolean" && (u = a, a = arguments[1] || {}, s = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); s < c; ++s)
    if (n = arguments[s], n != null)
      for (t in n)
        r = Vt(a, t), i = Vt(n, t), a !== i && (u && i && (jt(i) || (l = Bt(i))) ? (l ? (l = !1, o = r && Bt(r) ? r : []) : o = r && jt(r) ? r : {}, Ht(a, { name: t, newValue: e(u, o, i) })) : typeof i < "u" && Ht(a, { name: t, newValue: i }));
  return a;
};
const _n = /* @__PURE__ */ ir(Za);
function Hn(e) {
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
const Ce = { basename: ts, dirname: rs, extname: is, join: ls, sep: "/" };
function ts(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  rn(e);
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
  if (rn(e), e.length === 0)
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
  rn(e);
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
    rn(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : os(t);
}
function os(e) {
  rn(e);
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
function rn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const ss = { cwd: us };
function us() {
  return "/";
}
function Vn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function cs(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Vn(e)) {
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
const In = (
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
class zr {
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
    n ? Vn(n) ? t = { path: n } : typeof n == "string" || hs(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : ss.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < In.length; ) {
      const l = In[r];
      l in t && t[l] !== void 0 && t[l] !== null && (this[l] = l === "history" ? [...t[l]] : t[l]);
    }
    let i;
    for (i in t)
      In.includes(i) || (this[i] = t[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Ce.basename(this.path) : void 0;
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
    Pn(n, "basename"), Tn(n, "basename"), this.path = Ce.join(this.dirname || "", n);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Ce.dirname(this.path) : void 0;
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
    Ut(this.basename, "dirname"), this.path = Ce.join(n || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Ce.extname(this.path) : void 0;
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
    if (Tn(n, "extname"), Ut(this.dirname, "extname"), n) {
      if (n.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (n.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Ce.join(this.dirname, this.stem + (n || ""));
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
    Vn(n) && (n = cs(n)), Pn(n, "path"), this.path !== n && this.history.push(n);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Ce.basename(this.path, this.extname) : void 0;
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
    Pn(n, "stem"), Tn(n, "stem"), this.path = Ce.join(this.dirname || "", n + (this.extname || ""));
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
function Tn(e, n) {
  if (e && e.includes(Ce.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + Ce.sep + "`"
    );
}
function Pn(e, n) {
  if (!e)
    throw new Error("`" + n + "` cannot be empty");
}
function Ut(e, n) {
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
class rt extends fs {
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
      new rt()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data(_n(!0, {}, this.namespace)), n;
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
    return typeof n == "string" ? arguments.length === 2 ? (An("data", this.frozen), this.namespace[n] = t, this) : ds.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (An("data", this.frozen), this.namespace = n, this) : this.namespace;
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
    const t = sn(n), r = this.parser || this.Parser;
    return Nn("parse", r), r(String(t), t);
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
    return this.freeze(), Nn("process", this.parser || this.Parser), vn("process", this.compiler || this.Compiler), t ? i(void 0, t) : new Promise(i);
    function i(l, o) {
      const a = sn(n), s = (
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
    return this.freeze(), Nn("processSync", this.parser || this.Parser), vn("processSync", this.compiler || this.Compiler), this.process(n, i), $t("processSync", "process", t), r;
    function i(l, o) {
      t = !0, Mt(l), r = o;
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
    qt(n), this.freeze();
    const i = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? l(void 0, r) : new Promise(l);
    function l(o, a) {
      const s = sn(t);
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
    return this.run(n, t, l), $t("runSync", "run", r), i;
    function l(o, a) {
      Mt(o), i = a, r = !0;
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
    const r = sn(t), i = this.compiler || this.Compiler;
    return vn("stringify", i), qt(n), i(n, r);
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
    if (An("use", this.frozen), n != null) if (typeof n == "function")
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
      a(c.plugins), c.settings && (i.settings = _n(!0, i.settings, c.settings));
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
        Hn(x) && Hn(p) && (p = _n(!0, x, p)), r[m] = [c, p, ...y];
      }
    }
  }
}
const ms = new rt().freeze();
function Nn(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function vn(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function An(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function qt(e) {
  if (!Hn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function $t(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function sn(e) {
  return gs(e) ? e : new zr(e);
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
const ws = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Wt = [], Xt = { allowDangerousHtml: !0 }, ks = /^(https?|ircs?|mailto|xmpp)$/i, bs = [
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
function Yt(e) {
  const n = Ss(e), t = Cs(e);
  return Es(n.runSync(n.parse(t), t), e);
}
function Ss(e) {
  const n = e.rehypePlugins || Wt, t = e.remarkPlugins || Wt, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Xt } : Xt;
  return ms().use(ra).use(t).use(Ga, r).use(n);
}
function Cs(e) {
  const n = e.children || "", t = new zr();
  return typeof n == "string" && (t.value = n), t;
}
function Es(e, n) {
  const t = n.allowedElements, r = n.allowElement, i = n.components, l = n.disallowedElements, o = n.skipHtml, a = n.unwrapDisallowed, s = n.urlTransform || _s;
  for (const u of bs)
    Object.hasOwn(n, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + ws + u.id, void 0);
  return Ar(e, c), Di(e, {
    Fragment: Qt,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: w,
    jsxs: K,
    passKeys: !0,
    passNode: !0
  });
  function c(u, h, m) {
    if (u.type === "raw" && m && typeof h == "number")
      return o ? m.children.splice(h, 1) : m.children[h] = { type: "text", value: u.value }, h;
    if (u.type === "element") {
      let p;
      for (p in Sn)
        if (Object.hasOwn(Sn, p) && Object.hasOwn(u.properties, p)) {
          const y = u.properties[p], x = Sn[p];
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
const be = (...e) => e.filter(Boolean).join(" "), Is = ({ className: e }) => /* @__PURE__ */ w("svg", { className: e, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ w("path", { d: "M2 21L23 12L2 3V10L17 12L2 14V21Z", fill: "currentColor" }) }), Ts = ({ className: e }) => /* @__PURE__ */ w("svg", { className: e, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ w("path", { d: "M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) }), Ps = ({ className: e }) => /* @__PURE__ */ w("svg", { className: e, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ w("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", fill: "currentColor" }) }), Ns = ({ className: e }) => /* @__PURE__ */ w("svg", { className: e, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ w("path", { d: "M18 6L6 18M6 6L18 18", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) }), vs = ({ className: e, ...n }) => /* @__PURE__ */ w(
  "form",
  {
    className: be(
      "chat-wrapper__prompt-input",
      e
    ),
    ...n
  }
), Or = Br(({
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
  return /* @__PURE__ */ w(
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
Or.displayName = "PromptInputTextarea";
const As = ({
  className: e,
  ...n
}) => /* @__PURE__ */ w(
  "div",
  {
    className: be("chat-wrapper__prompt-toolbar", e),
    ...n
  }
), Ls = ({
  className: e,
  ...n
}) => /* @__PURE__ */ w(
  "div",
  {
    className: be("chat-wrapper__prompt-tools", e),
    ...n
  }
), Kt = ({
  variant: e = "ghost",
  size: n = "default",
  className: t,
  children: r,
  ...i
}) => {
  const l = n === "default" && (typeof r == "string" || Fr.Children.count(r) === 1) ? "icon" : n;
  return /* @__PURE__ */ w(
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
  let a = /* @__PURE__ */ w(Is, { className: "chat-wrapper__prompt-icon" });
  r === "submitted" ? a = /* @__PURE__ */ w(Ts, { className: "chat-wrapper__prompt-icon chat-wrapper__prompt-icon--spin" }) : r === "streaming" ? a = /* @__PURE__ */ w(Ps, { className: "chat-wrapper__prompt-icon" }) : r === "error" && (a = /* @__PURE__ */ w(Ns, { className: "chat-wrapper__prompt-icon" }));
  const s = l || r === "submitted" || r === "streaming";
  return /* @__PURE__ */ w(
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
}, Vs = ({ className: e, children: n, ...t }) => /* @__PURE__ */ w(
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
}) => /* @__PURE__ */ w(
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
}) => /* @__PURE__ */ w(
  "div",
  {
    className: be("chat-wrapper__prompt-select-content", e),
    ...n
  }
), $s = ({
  className: e,
  value: n,
  ...t
}) => /* @__PURE__ */ w(
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
}) => /* @__PURE__ */ w(
  "span",
  {
    className: be("chat-wrapper__prompt-select-value", e),
    ...t,
    children: n
  }
);
function Os({ children: e }) {
  return /* @__PURE__ */ w("div", { className: "chat-wrapper__reasoning", children: e });
}
function Ds({ title: e }) {
  return /* @__PURE__ */ K("div", { className: "chat-wrapper__reasoning-trigger", children: [
    /* @__PURE__ */ w("div", { className: "chat-wrapper__reasoning-icon", children: /* @__PURE__ */ w("div", { className: "chat-wrapper__reasoning-spinner" }) }),
    /* @__PURE__ */ w("span", { className: "chat-wrapper__reasoning-title", children: e })
  ] });
}
function Ms({ children: e }) {
  return /* @__PURE__ */ w("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ w("div", { className: "chat-wrapper__reasoning-text", children: e }) });
}
function Rs({ size: e = 16, variant: n = "dots" }) {
  return n === "dots" ? /* @__PURE__ */ K("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ w("span", {}),
    /* @__PURE__ */ w("span", {}),
    /* @__PURE__ */ w("span", {})
  ] }) : n === "pulse" ? /* @__PURE__ */ w(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ w(
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
  const [i, l] = ie(r), [o, a] = ie(""), [s, c] = ie(!1), [u, h] = ie(null), [m, p] = ie(!1), [y, x] = ie("idle"), [T, b] = ie([]), [A, I] = ie([]), [H, U] = ie([]), [k, B] = ie([]), [W, O] = ie(""), [j, P] = ie(!1), [N, R] = ie(""), Q = Je(null), D = Je(null), G = Je(null), J = de(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), oe = de(() => {
    var C;
    (C = Q.current) == null || C.scrollIntoView({ behavior: "smooth" });
  }, []);
  ln(() => {
    t && Object.keys(t).length > 0 && console.log("Available tools:", Object.keys(t));
  }, [t]), ln(() => {
    oe();
  }, [i, oe]), ln(() => {
    n.onStreamingStatusChange && n.onStreamingStatusChange(W);
  }, [W, n]);
  const ne = de(
    (C) => {
      const _ = D.current;
      _ && l(
        (Y) => Y.map((re) => re.id === _ ? C(re) : re)
      );
    },
    []
  ), f = de(
    (C) => {
      var _, Y, re, Te, ee, ge, we, Oe;
      switch (console.log("Processing stream event:", C.type, C), C.type) {
        case "event":
          C.event === "latitude-event" ? ((_ = C.data) == null ? void 0 : _.type) === "chain-started" ? (O("Planning chain started"), P(!0), R(
            "🔗 Starting comprehensive planning chain..."
          )) : ((Y = C.data) == null ? void 0 : Y.type) === "step-started" ? (O("Planning step started"), P(!0), R("📊 Executing planning step...")) : ((re = C.data) == null ? void 0 : re.type) === "provider-completed" ? (O("AI planning completed"), P(!1), R(""), (Te = C.data.response) != null && Te.text && ne((X) => ({
            ...X,
            content: C.data.response.text,
            isStreaming: !1
          }))) : ((ee = C.data) == null ? void 0 : ee.type) === "chain-completed" && (O("Planning completed"), P(!1), R(""), C.data.uuid && h(C.data.uuid), ne((X) => ({
            ...X,
            isStreaming: !1
          }))) : C.event === "provider-event" && ((ge = C.data) == null ? void 0 : ge.type) === "text-delta" && (P(!1), R(""), ne((X) => ({
            ...X,
            content: X.content + C.data.textDelta
          })));
          break;
        case "text-delta":
          C.content && ne((X) => ({
            ...X,
            content: X.content + C.content
          }));
          break;
        case "tool-result":
          if (console.log("Tool result received:", C), C.tool && C.data && (C.data.id || C.data.success)) {
            const X = {
              id: C.data.id || J(),
              title: C.data.title || `${C.tool} result`,
              description: C.data.description,
              status: C.data.status || "completed",
              created_at: C.data.created_at || (/* @__PURE__ */ new Date()).toISOString(),
              ...C.data
            };
            b((De) => [...De, X]);
          }
          C.todos && (I(C.todos), n.onToolResult && n.onToolResult("todos", C.todos)), C.briefs && (U(C.briefs), n.onToolResult && n.onToolResult("briefs", C.briefs));
          break;
        case "finished":
          O("Stream finished"), C.uuid && h(C.uuid), (Oe = (we = C.result) == null ? void 0 : we.response) != null && Oe.text ? ne((X) => ({
            ...X,
            content: C.result.response.text,
            isStreaming: !1
          })) : ne((X) => ({
            ...X,
            isStreaming: !1
          }));
          break;
        case "stream-error":
          console.error("Stream error:", C.error), ne((X) => ({
            ...X,
            content: `Stream Error: ${C.error}`,
            isStreaming: !1
          }));
          break;
        case "error":
          console.error("API error:", C.error), ne((X) => ({
            ...X,
            content: `Error: ${C.error}`,
            isStreaming: !1
          }));
          break;
      }
    },
    [ne, J, n]
  ), ce = de(
    async (C, _) => {
      if (!C.trim() || s) return;
      const Y = {
        id: J(),
        role: "user",
        content: C.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: _
      };
      l((ee) => [...ee, Y]), c(!0), x("submitted"), O("Starting...");
      const re = J();
      D.current = re;
      const Te = {
        id: re,
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      l((ee) => [...ee, Te]);
      try {
        G.current = new AbortController();
        const ee = n.endpoint === "brief-planner" ? `${e}/api/brief-planner` : u ? `${e}/api/conversation/${u}` : `${e}/api/conversation/init`, ge = n.endpoint === "brief-planner" ? {
          messages: [...i, Y],
          promptPath: n.promptPath || "briefPlanner",
          conversationUuid: u,
          todos: A,
          // Send current todos to the API
          briefs: H,
          // Send current briefs to the API
          media: _ || []
          // Use media from function parameter, not uploadedMedia
        } : {
          message: C.trim(),
          tools: t ? Object.keys(t) : []
        };
        console.log("Sending request to:", ee), console.log("Request payload:", JSON.stringify(ge, null, 2));
        const we = await fetch(ee, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...n.apiKey && { Authorization: `Bearer ${n.apiKey}` }
          },
          body: JSON.stringify(ge),
          signal: G.current.signal
        });
        if (!we.ok)
          throw new Error(`HTTP error! status: ${we.status}`);
        x("streaming"), await xe(we);
      } catch (ee) {
        ee instanceof Error && ee.name === "AbortError" ? console.log("Request aborted") : (console.error("Request error:", ee), x("error"), ne((ge) => ({
          ...ge,
          content: `Sorry, there was an error: ${ee instanceof Error ? ee.message : "Unknown error"}`,
          isStreaming: !1
        })), n.onError && n.onError(
          ee instanceof Error ? ee : new Error("Unknown error")
        ));
      } finally {
        c(!1), x("idle"), O(""), P(!1), R(""), G.current = null, D.current = null;
      }
    },
    [
      s,
      J,
      i,
      u,
      A,
      H,
      k,
      t,
      n,
      e,
      ne,
      f
    ]
  ), xe = de(
    async (C) => {
      var Te;
      const _ = (Te = C.body) == null ? void 0 : Te.getReader(), Y = new TextDecoder();
      if (!_)
        throw new Error("No response body reader available");
      let re = "";
      for (; ; ) {
        const { done: ee, value: ge } = await _.read();
        if (ee) {
          console.log("Stream completed");
          break;
        }
        re += Y.decode(ge, { stream: !0 });
        const we = re.split(/\r?\n/);
        re = we.pop() || "";
        for (const Oe of we)
          if (Oe.startsWith("data: ")) {
            const X = Oe.slice(6).trim();
            if (X === "[DONE]" || X === "")
              continue;
            try {
              const De = JSON.parse(X);
              f(De);
            } catch (De) {
              console.error("Failed to parse event:", De);
            }
          }
      }
    },
    [f]
  ), d = de(() => {
    G.current && (G.current.abort(), c(!1), x("idle"), O(""), P(!1), R(""));
  }, []), pe = de(() => {
    l(r), h(null), b([]), I([]), U([]), B([]), x("idle"), O(""), P(!1), R(""), console.log("Chat cleared");
  }, [r]), Ie = de(() => {
    p(!0);
  }, []), Z = de(() => {
    p(!1);
  }, []);
  ln(() => {
    const C = (_) => {
      _.key === "Escape" && n.mode === "modal" && m && Z();
    };
    if (n.mode === "modal" && m)
      return document.addEventListener("keydown", C), () => document.removeEventListener("keydown", C);
  }, [n.mode, m, Z]);
  const Se = ((...C) => C.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${n.mode}`,
    n.position && `chat-wrapper--${n.position}`,
    n.theme && `chat-wrapper--${n.theme}`
  ), ve = () => n.mode === "modal" && m ? /* @__PURE__ */ w("div", { className: "chat-wrapper-overlay", onClick: Z }) : null, Ae = () => {
    var C;
    return n.mode === "modal" && !m ? /* @__PURE__ */ K(
      "button",
      {
        className: "chat-wrapper__bubble-button",
        onClick: Ie,
        title: `Open ${n.appName}`,
        children: [
          /* @__PURE__ */ K(
            "svg",
            {
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: "chat-wrapper__bubble-icon",
              children: [
                /* @__PURE__ */ w(
                  "path",
                  {
                    d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
                    fill: "currentColor"
                  }
                ),
                /* @__PURE__ */ w("circle", { cx: "7", cy: "10", r: "1", fill: "currentColor" }),
                /* @__PURE__ */ w("circle", { cx: "12", cy: "10", r: "1", fill: "currentColor" }),
                /* @__PURE__ */ w("circle", { cx: "17", cy: "10", r: "1", fill: "currentColor" })
              ]
            }
          ),
          ((C = n.features) == null ? void 0 : C.showBubbleText) !== !1 && /* @__PURE__ */ w("span", { className: "chat-wrapper__bubble-text", children: n.bubbleText || "Chat" })
        ]
      }
    ) : null;
  }, je = () => n.mode === "modal" && m ? /* @__PURE__ */ w(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: Z,
      title: "Close chat",
      children: /* @__PURE__ */ w(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ w(
            "path",
            {
              d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
              fill: "currentColor"
            }
          )
        }
      )
    }
  ) : null, xn = () => !j || !N ? null : /* @__PURE__ */ w("div", { className: "chat-wrapper__thinking", children: /* @__PURE__ */ K("div", { className: "chat-wrapper__thinking-content", children: [
    /* @__PURE__ */ w("span", { className: "chat-wrapper__thinking-spinner" }),
    /* @__PURE__ */ w("span", { children: N })
  ] }) }), wn = () => {
    var C;
    return !((C = n.features) != null && C.showToolResults) || T.length === 0 ? null : /* @__PURE__ */ K("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ w("h4", { children: "Tool Results" }),
      /* @__PURE__ */ w("div", { className: "chat-wrapper__tool-results-list", children: T.map((_) => /* @__PURE__ */ K("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ w("div", { className: "chat-wrapper__tool-result-title", children: _.title }),
        _.description && /* @__PURE__ */ w("div", { className: "chat-wrapper__tool-result-description", children: _.description }),
        /* @__PURE__ */ K("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          _.status || "completed"
        ] })
      ] }, _.id)) })
    ] });
  };
  return n.mode === "modal" && !m ? Ae() : /* @__PURE__ */ K(Qt, { children: [
    ve(),
    /* @__PURE__ */ K("div", { className: Se, style: n.customStyles, children: [
      /* @__PURE__ */ K("div", { className: "chat-wrapper__header", children: [
        /* @__PURE__ */ w("h2", { className: "chat-wrapper__title", children: n.appName }),
        je()
      ] }),
      xn(),
      /* @__PURE__ */ K("div", { className: "chat-wrapper__messages", children: [
        i.map((C) => /* @__PURE__ */ K(
          "div",
          {
            className: `chat-wrapper__message chat-wrapper__message--${C.role}`,
            children: [
              /* @__PURE__ */ w("div", { className: "chat-wrapper__message-content", children: C.role === "assistant" && C.isStreaming && j ? /* @__PURE__ */ K("div", { className: "chat-wrapper__message-with-reasoning", children: [
                /* @__PURE__ */ K(Os, { isStreaming: j, children: [
                  /* @__PURE__ */ w(Ds, { title: "Planning Brief" }),
                  /* @__PURE__ */ w(Ms, { children: N })
                ] }),
                C.content && /* @__PURE__ */ w("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ w(
                  Yt,
                  {
                    components: {
                      pre: ({ children: _ }) => /* @__PURE__ */ w("pre", { className: "chat-wrapper__code-block", children: _ }),
                      code: ({ children: _, className: Y }) => !Y ? /* @__PURE__ */ w("code", { className: "chat-wrapper__inline-code", children: _ }) : /* @__PURE__ */ w("code", { className: "chat-wrapper__code", children: _ }),
                      p: ({ children: _ }) => /* @__PURE__ */ w("p", { className: "chat-wrapper__paragraph", children: _ }),
                      h1: ({ children: _ }) => /* @__PURE__ */ w("h1", { className: "chat-wrapper__heading-1", children: _ }),
                      h2: ({ children: _ }) => /* @__PURE__ */ w("h2", { className: "chat-wrapper__heading-2", children: _ }),
                      h3: ({ children: _ }) => /* @__PURE__ */ w("h3", { className: "chat-wrapper__heading-3", children: _ }),
                      ul: ({ children: _ }) => /* @__PURE__ */ w("ul", { className: "chat-wrapper__list", children: _ }),
                      ol: ({ children: _ }) => /* @__PURE__ */ w("ol", { className: "chat-wrapper__ordered-list", children: _ }),
                      li: ({ children: _ }) => /* @__PURE__ */ w("li", { className: "chat-wrapper__list-item", children: _ }),
                      blockquote: ({ children: _ }) => /* @__PURE__ */ w("blockquote", { className: "chat-wrapper__blockquote", children: _ }),
                      strong: ({ children: _ }) => /* @__PURE__ */ w("strong", { className: "chat-wrapper__bold", children: _ }),
                      em: ({ children: _ }) => /* @__PURE__ */ w("em", { className: "chat-wrapper__italic", children: _ })
                    },
                    children: C.content.trim()
                  }
                ) })
              ] }) : C.isStreaming && C.content === "" && !j ? (
                /* Show streaming indicator when no reasoning */
                /* @__PURE__ */ K("div", { className: "chat-wrapper__streaming-placeholder", children: [
                  /* @__PURE__ */ w(Rs, { size: 16, variant: "dots" }),
                  /* @__PURE__ */ w("span", { children: "Creating your brief..." }),
                  W && /* @__PURE__ */ K("span", { className: "chat-wrapper__streaming-status", children: [
                    "(",
                    W,
                    ")"
                  ] })
                ] })
              ) : (
                /* Regular message display with markdown */
                /* @__PURE__ */ K("div", { className: "chat-wrapper__regular-message", children: [
                  C.role === "user" && C.media && C.media.length > 0 && /* @__PURE__ */ w("div", { className: "chat-wrapper__media-grid", children: C.media.map((_, Y) => /* @__PURE__ */ w(
                    "div",
                    {
                      className: "chat-wrapper__media-item",
                      children: /* @__PURE__ */ w(
                        "img",
                        {
                          src: _,
                          alt: `Attached image ${Y + 1}`,
                          className: "chat-wrapper__media-image"
                        }
                      )
                    },
                    Y
                  )) }),
                  /* @__PURE__ */ K("div", { className: "chat-wrapper__markdown-content", children: [
                    /* @__PURE__ */ w(
                      Yt,
                      {
                        components: {
                          pre: ({ children: _ }) => /* @__PURE__ */ w("pre", { className: "chat-wrapper__code-block", children: _ }),
                          code: ({ children: _, className: Y }) => !Y ? /* @__PURE__ */ w("code", { className: "chat-wrapper__inline-code", children: _ }) : /* @__PURE__ */ w("code", { className: "chat-wrapper__code", children: _ }),
                          p: ({ children: _ }) => /* @__PURE__ */ w("p", { className: "chat-wrapper__paragraph", children: _ }),
                          h1: ({ children: _ }) => /* @__PURE__ */ w("h1", { className: "chat-wrapper__heading-1", children: _ }),
                          h2: ({ children: _ }) => /* @__PURE__ */ w("h2", { className: "chat-wrapper__heading-2", children: _ }),
                          h3: ({ children: _ }) => /* @__PURE__ */ w("h3", { className: "chat-wrapper__heading-3", children: _ }),
                          ul: ({ children: _ }) => /* @__PURE__ */ w("ul", { className: "chat-wrapper__list", children: _ }),
                          ol: ({ children: _ }) => /* @__PURE__ */ w("ol", { className: "chat-wrapper__ordered-list", children: _ }),
                          li: ({ children: _ }) => /* @__PURE__ */ w("li", { className: "chat-wrapper__list-item", children: _ }),
                          blockquote: ({ children: _ }) => /* @__PURE__ */ w("blockquote", { className: "chat-wrapper__blockquote", children: _ }),
                          strong: ({ children: _ }) => /* @__PURE__ */ w("strong", { className: "chat-wrapper__bold", children: _ }),
                          em: ({ children: _ }) => /* @__PURE__ */ w("em", { className: "chat-wrapper__italic", children: _ })
                        },
                        children: C.content.trim()
                      }
                    ),
                    C.isStreaming && /* @__PURE__ */ w("span", { className: "chat-wrapper__streaming-indicator", children: "..." })
                  ] })
                ] })
              ) }),
              /* @__PURE__ */ w("div", { className: "chat-wrapper__message-timestamp", children: C.timestamp.toLocaleTimeString() })
            ]
          },
          C.id
        )),
        /* @__PURE__ */ w("div", { ref: Q })
      ] }),
      wn(),
      /* @__PURE__ */ K(
        vs,
        {
          onSubmit: (C) => {
            C.preventDefault();
            const Y = new FormData(C.currentTarget).get("message");
            Y != null && Y.trim() && (ce(Y.trim()), a(""));
          },
          children: [
            /* @__PURE__ */ w(
              Or,
              {
                value: o,
                onChange: (C) => a(C.target.value),
                placeholder: n.placeholder || "What would you like to know?",
                disabled: s
              }
            ),
            /* @__PURE__ */ K(As, { children: [
              /* @__PURE__ */ K(Ls, { children: [
                i.length > 0 && /* @__PURE__ */ w(
                  Kt,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: pe,
                    title: "Clear chat",
                    disabled: s,
                    children: /* @__PURE__ */ w("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ w("path", { d: "M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
                  }
                ),
                t && Object.keys(t).length > 0 && /* @__PURE__ */ K(
                  Kt,
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
              /* @__PURE__ */ w(
                zs,
                {
                  status: y,
                  disabled: !o.trim() && y !== "streaming",
                  onClick: y === "streaming" ? d : void 0,
                  title: y === "streaming" ? "Stop generation" : y === "submitted" ? "Submitting..." : "Send message"
                }
              )
            ] })
          ]
        }
      ),
      n.onError && /* @__PURE__ */ w("div", { className: "chat-wrapper__error-boundary" })
    ] })
  ] });
}
class Fs {
  constructor(n, t) {
    kn(this, "baseUrl");
    kn(this, "apiKey");
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
  const [t, r] = ie([]), [i, l] = ie(!1), [o, a] = ie(null), s = Je(null), c = Je(new Fs(e, n)), u = de(async () => {
    try {
      const p = await c.current.initConversation();
      return s.current = p, p;
    } catch (p) {
      throw a(p), p;
    }
  }, []), h = de(
    async (p) => {
      s.current || await u();
      const y = {
        id: Date.now().toString(),
        role: "user",
        content: p,
        timestamp: /* @__PURE__ */ new Date()
      };
      r((T) => [...T, y]), l(!0), a(null);
      const x = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      r((T) => [...T, x]);
      try {
        const T = c.current.streamMessage(
          s.current,
          p
        );
        for await (const b of T)
          r(
            (A) => A.map(
              (I) => I.id === x.id ? { ...I, content: I.content + b } : I
            )
          );
        r(
          (b) => b.map(
            (A) => A.id === x.id ? { ...A, isStreaming: !1 } : A
          )
        );
      } catch (T) {
        a(T), r((b) => b.filter((A) => A.id !== x.id));
      } finally {
        l(!1);
      }
    },
    [u]
  ), m = de(() => {
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
  vs as PromptInput,
  Kt as PromptInputButton,
  Vs as PromptInputModelSelect,
  qs as PromptInputModelSelectContent,
  $s as PromptInputModelSelectItem,
  Us as PromptInputModelSelectTrigger,
  Ws as PromptInputModelSelectValue,
  zs as PromptInputSubmit,
  Or as PromptInputTextarea,
  As as PromptInputToolbar,
  Ls as PromptInputTools,
  Os as Reasoning,
  Ms as ReasoningContent,
  Ds as ReasoningTrigger,
  Ys as useChatConnection
};
