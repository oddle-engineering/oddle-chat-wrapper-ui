var zr = Object.defineProperty;
var Or = (e, n, t) => n in e ? zr(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var yn = (e, n, t) => Or(e, typeof n != "symbol" ? n + "" : n, t);
import { jsxs as J, jsx as E, Fragment as Wt } from "react/jsx-runtime";
import { useState as oe, useRef as Qe, useCallback as fe, useEffect as rn } from "react";
function Dr(e, n) {
  const t = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const Rr = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Mr = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Fr = {};
function nt(e, n) {
  return (Fr.jsx ? Mr : Rr).test(e);
}
const Br = /[ \t\n\f\r]/g;
function jr(e) {
  return typeof e == "object" ? e.type === "text" ? tt(e.value) : !1 : tt(e);
}
function tt(e) {
  return e.replace(Br, "") === "";
}
class nn {
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
nn.prototype.normal = {};
nn.prototype.property = {};
nn.prototype.space = void 0;
function Yt(e, n) {
  const t = {}, r = {};
  for (const i of e)
    Object.assign(t, i.property), Object.assign(r, i.normal);
  return new nn(t, r, n);
}
function Nn(e) {
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
let Hr = 0;
const z = Fe(), G = Fe(), An = Fe(), b = Fe(), $ = Fe(), Ue = Fe(), he = Fe();
function Fe() {
  return 2 ** ++Hr;
}
const vn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: z,
  booleanish: G,
  commaOrSpaceSeparated: he,
  commaSeparated: Ue,
  number: b,
  overloadedBoolean: An,
  spaceSeparated: $
}, Symbol.toStringTag, { value: "Module" })), xn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(vn)
);
class jn extends ue {
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
    if (super(n, t), rt(this, "space", i), typeof r == "number")
      for (; ++l < xn.length; ) {
        const o = xn[l];
        rt(this, xn[l], (r & vn[o]) === vn[o]);
      }
  }
}
jn.prototype.defined = !0;
function rt(e, n, t) {
  t && (e[n] = t);
}
function qe(e) {
  const n = {}, t = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const l = new jn(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (l.mustUseProperty = !0), n[r] = l, t[Nn(r)] = r, t[Nn(l.attribute)] = r;
  }
  return new nn(n, t, e.space);
}
const Xt = qe({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: G,
    ariaAutoComplete: null,
    ariaBusy: G,
    ariaChecked: G,
    ariaColCount: b,
    ariaColIndex: b,
    ariaColSpan: b,
    ariaControls: $,
    ariaCurrent: null,
    ariaDescribedBy: $,
    ariaDetails: null,
    ariaDisabled: G,
    ariaDropEffect: $,
    ariaErrorMessage: null,
    ariaExpanded: G,
    ariaFlowTo: $,
    ariaGrabbed: G,
    ariaHasPopup: null,
    ariaHidden: G,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: $,
    ariaLevel: b,
    ariaLive: null,
    ariaModal: G,
    ariaMultiLine: G,
    ariaMultiSelectable: G,
    ariaOrientation: null,
    ariaOwns: $,
    ariaPlaceholder: null,
    ariaPosInSet: b,
    ariaPressed: G,
    ariaReadOnly: G,
    ariaRelevant: null,
    ariaRequired: G,
    ariaRoleDescription: $,
    ariaRowCount: b,
    ariaRowIndex: b,
    ariaRowSpan: b,
    ariaSelected: G,
    ariaSetSize: b,
    ariaSort: null,
    ariaValueMax: b,
    ariaValueMin: b,
    ariaValueNow: b,
    ariaValueText: null,
    role: null
  },
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  }
});
function Kt(e, n) {
  return n in e ? e[n] : n;
}
function Qt(e, n) {
  return Kt(e, n.toLowerCase());
}
const Ur = qe({
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
    acceptCharset: $,
    accessKey: $,
    action: null,
    allow: null,
    allowFullScreen: z,
    allowPaymentRequest: z,
    allowUserMedia: z,
    alt: null,
    as: null,
    async: z,
    autoCapitalize: null,
    autoComplete: $,
    autoFocus: z,
    autoPlay: z,
    blocking: $,
    capture: null,
    charSet: null,
    checked: z,
    cite: null,
    className: $,
    cols: b,
    colSpan: null,
    content: null,
    contentEditable: G,
    controls: z,
    controlsList: $,
    coords: b | Ue,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: z,
    defer: z,
    dir: null,
    dirName: null,
    disabled: z,
    download: An,
    draggable: G,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: z,
    formTarget: null,
    headers: $,
    height: b,
    hidden: An,
    high: b,
    href: null,
    hrefLang: null,
    htmlFor: $,
    httpEquiv: $,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: z,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: z,
    itemId: null,
    itemProp: $,
    itemRef: $,
    itemScope: z,
    itemType: $,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: z,
    low: b,
    manifest: null,
    max: null,
    maxLength: b,
    media: null,
    method: null,
    min: null,
    minLength: b,
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
    optimum: b,
    pattern: null,
    ping: $,
    placeholder: null,
    playsInline: z,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: z,
    referrerPolicy: null,
    rel: $,
    required: z,
    reversed: z,
    rows: b,
    rowSpan: b,
    sandbox: $,
    scope: null,
    scoped: z,
    seamless: z,
    selected: z,
    shadowRootClonable: z,
    shadowRootDelegatesFocus: z,
    shadowRootMode: null,
    shape: null,
    size: b,
    sizes: null,
    slot: null,
    span: b,
    spellCheck: G,
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
    typeMustMatch: z,
    useMap: null,
    value: G,
    width: b,
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
    rightMargin: b,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: G,
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
    disablePictureInPicture: z,
    disableRemotePlayback: z,
    prefix: null,
    property: null,
    results: b,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Qt
}), Vr = qe({
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
    about: he,
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
    descent: b,
    diffuseConstant: b,
    direction: null,
    display: null,
    dur: null,
    divisor: b,
    dominantBaseline: null,
    download: z,
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
    g1: Ue,
    g2: Ue,
    glyphName: Ue,
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
    kernelMatrix: he,
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
    ping: $,
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
    property: he,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: he,
    rev: he,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: he,
    requiredFeatures: he,
    requiredFonts: he,
    requiredFormats: he,
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
    strokeDashArray: he,
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
    systemLanguage: he,
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
    typeOf: he,
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
  transform: Kt
}), Jt = qe({
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
}), Gt = qe({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Qt
}), Zt = qe({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, n) {
    return "xml:" + n.slice(3).toLowerCase();
  }
}), qr = {
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
}, $r = /[A-Z]/g, it = /-[a-z]/g, Wr = /^data[-\w.:]+$/i;
function Yr(e, n) {
  const t = Nn(n);
  let r = n, i = ue;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && Wr.test(n)) {
    if (n.charAt(4) === "-") {
      const l = n.slice(5).replace(it, Kr);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = n.slice(4);
      if (!it.test(l)) {
        let o = l.replace($r, Xr);
        o.charAt(0) !== "-" && (o = "-" + o), n = "data" + o;
      }
    }
    i = jn;
  }
  return new i(r, n);
}
function Xr(e) {
  return "-" + e.toLowerCase();
}
function Kr(e) {
  return e.charAt(1).toUpperCase();
}
const Qr = Yt([Xt, Ur, Jt, Gt, Zt], "html"), Hn = Yt([Xt, Vr, Jt, Gt, Zt], "svg");
function Jr(e) {
  return e.join(" ").trim();
}
var cn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function er(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Un = {}, lt = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Gr = /\n/g, Zr = /^\s*/, ei = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, ni = /^:\s*/, ti = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, ri = /^[;\s]*/, ii = /^\s+|\s+$/g, li = `
`, ot = "/", at = "*", Me = "", oi = "comment", ai = "declaration", si = function(e, n) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  n = n || {};
  var t = 1, r = 1;
  function i(y) {
    var k = y.match(Gr);
    k && (t += k.length);
    var T = y.lastIndexOf(li);
    r = ~T ? y.length - T : r + y.length;
  }
  function l() {
    var y = { line: t, column: r };
    return function(k) {
      return k.position = new o(y), c(), k;
    };
  }
  function o(y) {
    this.start = y, this.end = { line: t, column: r }, this.source = n.source;
  }
  o.prototype.content = e;
  function a(y) {
    var k = new Error(
      n.source + ":" + t + ":" + r + ": " + y
    );
    if (k.reason = y, k.filename = n.source, k.line = t, k.column = r, k.source = e, !n.silent) throw k;
  }
  function s(y) {
    var k = y.exec(e);
    if (k) {
      var T = k[0];
      return i(T), e = e.slice(T.length), k;
    }
  }
  function c() {
    s(Zr);
  }
  function u(y) {
    var k;
    for (y = y || []; k = h(); )
      k !== !1 && y.push(k);
    return y;
  }
  function h() {
    var y = l();
    if (!(ot != e.charAt(0) || at != e.charAt(1))) {
      for (var k = 2; Me != e.charAt(k) && (at != e.charAt(k) || ot != e.charAt(k + 1)); )
        ++k;
      if (k += 2, Me === e.charAt(k - 1))
        return a("End of comment missing");
      var T = e.slice(2, k - 2);
      return r += 2, i(T), e = e.slice(k), r += 2, y({
        type: oi,
        comment: T
      });
    }
  }
  function m() {
    var y = l(), k = s(ei);
    if (k) {
      if (h(), !s(ni)) return a("property missing ':'");
      var T = s(ti), w = y({
        type: ai,
        property: st(k[0].replace(lt, Me)),
        value: T ? st(T[0].replace(lt, Me)) : Me
      });
      return s(ri), w;
    }
  }
  function p() {
    var y = [];
    u(y);
    for (var k; k = m(); )
      k !== !1 && (y.push(k), u(y));
    return y;
  }
  return c(), p();
};
function st(e) {
  return e ? e.replace(ii, Me) : Me;
}
var ui = cn && cn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Un, "__esModule", { value: !0 });
Un.default = pi;
var ci = ui(si);
function pi(e, n) {
  var t = null;
  if (!e || typeof e != "string")
    return t;
  var r = (0, ci.default)(e), i = typeof n == "function";
  return r.forEach(function(l) {
    if (l.type === "declaration") {
      var o = l.property, a = l.value;
      i ? n(o, a, l) : a && (t = t || {}, t[o] = a);
    }
  }), t;
}
var fn = {};
Object.defineProperty(fn, "__esModule", { value: !0 });
fn.camelCase = void 0;
var hi = /^--[a-zA-Z0-9_-]+$/, fi = /-([a-z])/g, di = /^[^-]+$/, mi = /^-(webkit|moz|ms|o|khtml)-/, gi = /^-(ms)-/, yi = function(e) {
  return !e || di.test(e) || hi.test(e);
}, xi = function(e, n) {
  return n.toUpperCase();
}, ut = function(e, n) {
  return "".concat(n, "-");
}, ki = function(e, n) {
  return n === void 0 && (n = {}), yi(e) ? e : (e = e.toLowerCase(), n.reactCompat ? e = e.replace(gi, ut) : e = e.replace(mi, ut), e.replace(fi, xi));
};
fn.camelCase = ki;
var wi = cn && cn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, bi = wi(Un), Si = fn;
function Ln(e, n) {
  var t = {};
  return !e || typeof e != "string" || (0, bi.default)(e, function(r, i) {
    r && i && (t[(0, Si.camelCase)(r, n)] = i);
  }), t;
}
Ln.default = Ln;
var Ci = Ln;
const Ei = /* @__PURE__ */ er(Ci), nr = tr("end"), Vn = tr("start");
function tr(e) {
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
function _i(e) {
  const n = Vn(e), t = nr(e);
  if (n && t)
    return { start: n, end: t };
}
function Je(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? ct(e.position) : "start" in e || "end" in e ? ct(e) : "line" in e || "column" in e ? zn(e) : "";
}
function zn(e) {
  return pt(e && e.line) + ":" + pt(e && e.column);
}
function ct(e) {
  return zn(e && e.start) + "-" + zn(e && e.end);
}
function pt(e) {
  return e && typeof e == "number" ? e : 1;
}
class ie extends Error {
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
    this.ancestors = l.ancestors || void 0, this.cause = l.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = Je(l.place) || "1:1", this.place = l.place || void 0, this.reason = this.message, this.ruleId = l.ruleId || void 0, this.source = l.source || void 0, this.stack = o && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
ie.prototype.file = "";
ie.prototype.name = "";
ie.prototype.reason = "";
ie.prototype.message = "";
ie.prototype.stack = "";
ie.prototype.column = void 0;
ie.prototype.line = void 0;
ie.prototype.ancestors = void 0;
ie.prototype.cause = void 0;
ie.prototype.fatal = void 0;
ie.prototype.place = void 0;
ie.prototype.ruleId = void 0;
ie.prototype.source = void 0;
const qn = {}.hasOwnProperty, Ii = /* @__PURE__ */ new Map(), Ti = /[A-Z]/g, Pi = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Ni = /* @__PURE__ */ new Set(["td", "th"]), rr = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Ai(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = n.filePath || void 0;
  let r;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Fi(t, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Mi(t, n.jsx, n.jsxs);
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
    schema: n.space === "svg" ? Hn : Qr,
    stylePropertyNameCase: n.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: n.tableCellAlignToStyle !== !1
  }, l = ir(i, e, void 0);
  return l && typeof l != "string" ? l : i.create(
    e,
    i.Fragment,
    { children: l || void 0 },
    void 0
  );
}
function ir(e, n, t) {
  if (n.type === "element")
    return vi(e, n, t);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return Li(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return Oi(e, n, t);
  if (n.type === "mdxjsEsm")
    return zi(e, n);
  if (n.type === "root")
    return Di(e, n, t);
  if (n.type === "text")
    return Ri(e, n);
}
function vi(e, n, t) {
  const r = e.schema;
  let i = r;
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Hn, e.schema = i), e.ancestors.push(n);
  const l = or(e, n.tagName, !1), o = Bi(e, n);
  let a = Wn(e, n);
  return Pi.has(n.tagName) && (a = a.filter(function(s) {
    return typeof s == "string" ? !jr(s) : !0;
  })), lr(e, o, l, n), $n(o, a), e.ancestors.pop(), e.schema = r, e.create(n, l, o, t);
}
function Li(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  en(e, n.position);
}
function zi(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(n.data.estree)
    );
  en(e, n.position);
}
function Oi(e, n, t) {
  const r = e.schema;
  let i = r;
  n.name === "svg" && r.space === "html" && (i = Hn, e.schema = i), e.ancestors.push(n);
  const l = n.name === null ? e.Fragment : or(e, n.name, !0), o = ji(e, n), a = Wn(e, n);
  return lr(e, o, l, n), $n(o, a), e.ancestors.pop(), e.schema = r, e.create(n, l, o, t);
}
function Di(e, n, t) {
  const r = {};
  return $n(r, Wn(e, n)), e.create(n, e.Fragment, r, t);
}
function Ri(e, n) {
  return n.value;
}
function lr(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function $n(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0];
    t && (e.children = t);
  }
}
function Mi(e, n, t) {
  return r;
  function r(i, l, o, a) {
    const c = Array.isArray(o.children) ? t : n;
    return a ? c(l, o, a) : c(l, o);
  }
}
function Fi(e, n) {
  return t;
  function t(r, i, l, o) {
    const a = Array.isArray(l.children), s = Vn(r);
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
function Bi(e, n) {
  const t = {};
  let r, i;
  for (i in n.properties)
    if (i !== "children" && qn.call(n.properties, i)) {
      const l = Hi(e, i, n.properties[i]);
      if (l) {
        const [o, a] = l;
        e.tableCellAlignToStyle && o === "align" && typeof a == "string" && Ni.has(n.tagName) ? r = a : t[o] = a;
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
function ji(e, n) {
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
        en(e, n.position);
    else {
      const i = r.name;
      let l;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, l = e.evaluater.evaluateExpression(a.expression);
        } else
          en(e, n.position);
      else
        l = r.value === null ? !0 : r.value;
      t[i] = /** @type {Props[keyof Props]} */
      l;
    }
  return t;
}
function Wn(e, n) {
  const t = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Ii;
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
    const a = ir(e, l, o);
    a !== void 0 && t.push(a);
  }
  return t;
}
function Hi(e, n, t) {
  const r = Yr(e.schema, n);
  if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
    if (Array.isArray(t) && (t = r.commaSeparated ? Dr(t) : Jr(t)), r.property === "style") {
      let i = typeof t == "object" ? t : Ui(e, String(t));
      return e.stylePropertyNameCase === "css" && (i = Vi(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? qr[r.property] || r.property : r.attribute,
      t
    ];
  }
}
function Ui(e, n) {
  try {
    return Ei(n, { reactCompat: !0 });
  } catch (t) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      t
    ), i = new ie("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = rr + "#cannot-parse-style-attribute", i;
  }
}
function or(e, n, t) {
  let r;
  if (!t)
    r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const i = n.split(".");
    let l = -1, o;
    for (; ++l < i.length; ) {
      const a = nt(i[l]) ? { type: "Identifier", name: i[l] } : { type: "Literal", value: i[l] };
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
    r = nt(n) && !/^[a-z]/.test(n) ? { type: "Identifier", name: n } : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return qn.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  en(e);
}
function en(e, n) {
  const t = new ie(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: n,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw t.file = e.filePath || void 0, t.url = rr + "#cannot-handle-mdx-estrees-without-createevaluater", t;
}
function Vi(e) {
  const n = {};
  let t;
  for (t in e)
    qn.call(e, t) && (n[qi(t)] = e[t]);
  return n;
}
function qi(e) {
  let n = e.replace(Ti, $i);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function $i(e) {
  return "-" + e.toLowerCase();
}
const kn = {
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
}, Wi = {};
function Yi(e, n) {
  const t = Wi, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, i = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return ar(e, r, i);
}
function ar(e, n, t) {
  if (Xi(e)) {
    if ("value" in e)
      return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return ht(e.children, n, t);
  }
  return Array.isArray(e) ? ht(e, n, t) : "";
}
function ht(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = ar(e[i], n, t);
  return r.join("");
}
function Xi(e) {
  return !!(e && typeof e == "object");
}
const ft = document.createElement("i");
function Yn(e) {
  const n = "&" + e + ";";
  ft.innerHTML = n;
  const t = ft.textContent;
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
function ge(e, n) {
  return e.length > 0 ? (_e(e, e.length, 0, n), e) : n;
}
const dt = {}.hasOwnProperty;
function Ki(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    Qi(n, e[t]);
  return n;
}
function Qi(e, n) {
  let t;
  for (t in n) {
    const i = (dt.call(e, t) ? e[t] : void 0) || (e[t] = {}), l = n[t];
    let o;
    if (l)
      for (o in l) {
        dt.call(i, o) || (i[o] = []);
        const a = l[o];
        Ji(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function Ji(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  _e(e, 0, 0, r);
}
function sr(e, n) {
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
const Ee = ze(/[A-Za-z]/), de = ze(/[\dA-Za-z]/), Gi = ze(/[#-'*+\--9=?A-Z^-~]/);
function On(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Dn = ze(/\d/), Zi = ze(/[\dA-Fa-f]/), el = ze(/[!-/:-@[-`{-~]/);
function A(e) {
  return e !== null && e < -2;
}
function se(e) {
  return e !== null && (e < 0 || e === 32);
}
function F(e) {
  return e === -2 || e === -1 || e === 32;
}
const nl = ze(new RegExp("\\p{P}|\\p{S}", "u")), tl = ze(/\s/);
function ze(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function $e(e) {
  const n = [];
  let t = -1, r = 0, i = 0;
  for (; ++t < e.length; ) {
    const l = e.charCodeAt(t);
    let o = "";
    if (l === 37 && de(e.charCodeAt(t + 1)) && de(e.charCodeAt(t + 2)))
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
const rl = {
  tokenize: il
};
function il(e) {
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
const ll = {
  tokenize: ol
}, mt = {
  tokenize: al
};
function ol(e) {
  const n = this, t = [];
  let r = 0, i, l, o;
  return a;
  function a(I) {
    if (r < t.length) {
      const V = t[r];
      return n.containerState = V[1], e.attempt(V[0].continuation, s, c)(I);
    }
    return c(I);
  }
  function s(I) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, i && v();
      const V = n.events.length;
      let Y = V, x;
      for (; Y--; )
        if (n.events[Y][0] === "exit" && n.events[Y][1].type === "chunkFlow") {
          x = n.events[Y][1].end;
          break;
        }
      w(r);
      let D = V;
      for (; D < n.events.length; )
        n.events[D][1].end = {
          ...x
        }, D++;
      return _e(n.events, Y + 1, 0, n.events.slice(V)), n.events.length = D, c(I);
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
    return n.containerState = {}, e.check(mt, u, h)(I);
  }
  function u(I) {
    return i && v(), w(r), m(I);
  }
  function h(I) {
    return n.parser.lazy[n.now().line] = r !== t.length, o = n.now().offset, y(I);
  }
  function m(I) {
    return n.containerState = {}, e.attempt(mt, p, y)(I);
  }
  function p(I) {
    return r++, t.push([n.currentConstruct, n.containerState]), m(I);
  }
  function y(I) {
    if (I === null) {
      i && v(), w(0), e.consume(I);
      return;
    }
    return i = i || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: l
    }), k(I);
  }
  function k(I) {
    if (I === null) {
      T(e.exit("chunkFlow"), !0), w(0), e.consume(I);
      return;
    }
    return A(I) ? (e.consume(I), T(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, a) : (e.consume(I), k);
  }
  function T(I, V) {
    const Y = n.sliceStream(I);
    if (V && Y.push(null), I.previous = l, l && (l.next = I), l = I, i.defineSkip(I.start), i.write(Y), n.parser.lazy[I.start.line]) {
      let x = i.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          i.events[x][1].start.offset < o && // …and either is not ended yet…
          (!i.events[x][1].end || // …or ends after it.
          i.events[x][1].end.offset > o)
        )
          return;
      const D = n.events.length;
      let X = D, R, B;
      for (; X--; )
        if (n.events[X][0] === "exit" && n.events[X][1].type === "chunkFlow") {
          if (R) {
            B = n.events[X][1].end;
            break;
          }
          R = !0;
        }
      for (w(r), x = D; x < n.events.length; )
        n.events[x][1].end = {
          ...B
        }, x++;
      _e(n.events, X + 1, 0, n.events.slice(D)), n.events.length = x;
    }
  }
  function w(I) {
    let V = t.length;
    for (; V-- > I; ) {
      const Y = t[V];
      n.containerState = Y[1], Y[0].exit.call(n, e);
    }
    t.length = I;
  }
  function v() {
    i.write([null]), l = void 0, i = void 0, n.containerState._closeFlow = void 0;
  }
}
function al(e, n, t) {
  return W(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function gt(e) {
  if (e === null || se(e) || tl(e))
    return 1;
  if (nl(e))
    return 2;
}
function Xn(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll;
    l && !r.includes(l) && (n = l(n, t), r.push(l));
  }
  return n;
}
const Rn = {
  name: "attention",
  resolveAll: sl,
  tokenize: ul
};
function sl(e, n) {
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
          yt(h, -s), yt(m, s), o = {
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
          }, c = [], e[r][1].end.offset - e[r][1].start.offset && (c = ge(c, [["enter", e[r][1], n], ["exit", e[r][1], n]])), c = ge(c, [["enter", i, n], ["enter", o, n], ["exit", o, n], ["enter", l, n]]), c = ge(c, Xn(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), c = ge(c, [["exit", l, n], ["enter", a, n], ["exit", a, n], ["exit", i, n]]), e[t][1].end.offset - e[t][1].start.offset ? (u = 2, c = ge(c, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : u = 0, _e(e, r - 1, t - r + 3, c), t = r + c.length - u - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function ul(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, i = gt(r);
  let l;
  return o;
  function o(s) {
    return l = s, e.enter("attentionSequence"), a(s);
  }
  function a(s) {
    if (s === l)
      return e.consume(s), a;
    const c = e.exit("attentionSequence"), u = gt(s), h = !u || u === 2 && i || t.includes(s), m = !i || i === 2 && u || t.includes(r);
    return c._open = !!(l === 42 ? h : h && (i || !m)), c._close = !!(l === 42 ? m : m && (u || !h)), n(s);
  }
}
function yt(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const cl = {
  name: "autolink",
  tokenize: pl
};
function pl(e, n, t) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), l;
  }
  function l(p) {
    return Ee(p) ? (e.consume(p), o) : p === 64 ? t(p) : c(p);
  }
  function o(p) {
    return p === 43 || p === 45 || p === 46 || de(p) ? (r = 1, a(p)) : c(p);
  }
  function a(p) {
    return p === 58 ? (e.consume(p), r = 0, s) : (p === 43 || p === 45 || p === 46 || de(p)) && r++ < 32 ? (e.consume(p), a) : (r = 0, c(p));
  }
  function s(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), n) : p === null || p === 32 || p === 60 || On(p) ? t(p) : (e.consume(p), s);
  }
  function c(p) {
    return p === 64 ? (e.consume(p), u) : Gi(p) ? (e.consume(p), c) : t(p);
  }
  function u(p) {
    return de(p) ? h(p) : t(p);
  }
  function h(p) {
    return p === 46 ? (e.consume(p), r = 0, u) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), n) : m(p);
  }
  function m(p) {
    if ((p === 45 || de(p)) && r++ < 63) {
      const y = p === 45 ? m : h;
      return e.consume(p), y;
    }
    return t(p);
  }
}
const dn = {
  partial: !0,
  tokenize: hl
};
function hl(e, n, t) {
  return r;
  function r(l) {
    return F(l) ? W(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || A(l) ? n(l) : t(l);
  }
}
const ur = {
  continuation: {
    tokenize: dl
  },
  exit: ml,
  name: "blockQuote",
  tokenize: fl
};
function fl(e, n, t) {
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
function dl(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return F(o) ? W(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : l(o);
  }
  function l(o) {
    return e.attempt(ur, n, t)(o);
  }
}
function ml(e) {
  e.exit("blockQuote");
}
const cr = {
  name: "characterEscape",
  tokenize: gl
};
function gl(e, n, t) {
  return r;
  function r(l) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(l), e.exit("escapeMarker"), i;
  }
  function i(l) {
    return el(l) ? (e.enter("characterEscapeValue"), e.consume(l), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(l);
  }
}
const pr = {
  name: "characterReference",
  tokenize: yl
};
function yl(e, n, t) {
  const r = this;
  let i = 0, l, o;
  return a;
  function a(h) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(h), e.exit("characterReferenceMarker"), s;
  }
  function s(h) {
    return h === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(h), e.exit("characterReferenceMarkerNumeric"), c) : (e.enter("characterReferenceValue"), l = 31, o = de, u(h));
  }
  function c(h) {
    return h === 88 || h === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(h), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), l = 6, o = Zi, u) : (e.enter("characterReferenceValue"), l = 7, o = Dn, u(h));
  }
  function u(h) {
    if (h === 59 && i) {
      const m = e.exit("characterReferenceValue");
      return o === de && !Yn(r.sliceSerialize(m)) ? t(h) : (e.enter("characterReferenceMarker"), e.consume(h), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return o(h) && i++ < l ? (e.consume(h), u) : t(h);
  }
}
const xt = {
  partial: !0,
  tokenize: kl
}, kt = {
  concrete: !0,
  name: "codeFenced",
  tokenize: xl
};
function xl(e, n, t) {
  const r = this, i = {
    partial: !0,
    tokenize: Y
  };
  let l = 0, o = 0, a;
  return s;
  function s(x) {
    return c(x);
  }
  function c(x) {
    const D = r.events[r.events.length - 1];
    return l = D && D[1].type === "linePrefix" ? D[2].sliceSerialize(D[1], !0).length : 0, a = x, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(x);
  }
  function u(x) {
    return x === a ? (o++, e.consume(x), u) : o < 3 ? t(x) : (e.exit("codeFencedFenceSequence"), F(x) ? W(e, h, "whitespace")(x) : h(x));
  }
  function h(x) {
    return x === null || A(x) ? (e.exit("codeFencedFence"), r.interrupt ? n(x) : e.check(xt, k, V)(x)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), m(x));
  }
  function m(x) {
    return x === null || A(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), h(x)) : F(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), W(e, p, "whitespace")(x)) : x === 96 && x === a ? t(x) : (e.consume(x), m);
  }
  function p(x) {
    return x === null || A(x) ? h(x) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), y(x));
  }
  function y(x) {
    return x === null || A(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), h(x)) : x === 96 && x === a ? t(x) : (e.consume(x), y);
  }
  function k(x) {
    return e.attempt(i, V, T)(x);
  }
  function T(x) {
    return e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), w;
  }
  function w(x) {
    return l > 0 && F(x) ? W(e, v, "linePrefix", l + 1)(x) : v(x);
  }
  function v(x) {
    return x === null || A(x) ? e.check(xt, k, V)(x) : (e.enter("codeFlowValue"), I(x));
  }
  function I(x) {
    return x === null || A(x) ? (e.exit("codeFlowValue"), v(x)) : (e.consume(x), I);
  }
  function V(x) {
    return e.exit("codeFenced"), n(x);
  }
  function Y(x, D, X) {
    let R = 0;
    return B;
    function B(O) {
      return x.enter("lineEnding"), x.consume(O), x.exit("lineEnding"), P;
    }
    function P(O) {
      return x.enter("codeFencedFence"), F(O) ? W(x, N, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(O) : N(O);
    }
    function N(O) {
      return O === a ? (x.enter("codeFencedFenceSequence"), H(O)) : X(O);
    }
    function H(O) {
      return O === a ? (R++, x.consume(O), H) : R >= o ? (x.exit("codeFencedFenceSequence"), F(O) ? W(x, q, "whitespace")(O) : q(O)) : X(O);
    }
    function q(O) {
      return O === null || A(O) ? (x.exit("codeFencedFence"), D(O)) : X(O);
    }
  }
}
function kl(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? t(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o);
  }
}
const wn = {
  name: "codeIndented",
  tokenize: bl
}, wl = {
  partial: !0,
  tokenize: Sl
};
function bl(e, n, t) {
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
    return c === null ? s(c) : A(c) ? e.attempt(wl, o, s)(c) : (e.enter("codeFlowValue"), a(c));
  }
  function a(c) {
    return c === null || A(c) ? (e.exit("codeFlowValue"), o(c)) : (e.consume(c), a);
  }
  function s(c) {
    return e.exit("codeIndented"), n(c);
  }
}
function Sl(e, n, t) {
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
const Cl = {
  name: "codeText",
  previous: _l,
  resolve: El,
  tokenize: Il
};
function El(e) {
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
function _l(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Il(e, n, t) {
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
class Tl {
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
function hr(e) {
  const n = {};
  let t = -1, r, i, l, o, a, s, c;
  const u = new Tl(e);
  for (; ++t < u.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = u.get(t), t && r[1].type === "chunkFlow" && u.get(t - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, l = 0, l < s.length && s[l][1].type === "lineEndingBlank" && (l += 2), l < s.length && s[l][1].type === "content"))
      for (; ++l < s.length && s[l][1].type !== "content"; )
        s[l][1].type === "chunkText" && (s[l][1]._isInFirstContentOfListItem = !0, l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, Pl(u, t)), t = n[t], c = !0);
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
function Pl(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let i = n - 1;
  const l = [];
  let o = t._tokenizer;
  o || (o = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const a = o.events, s = [], c = {};
  let u, h, m = -1, p = t, y = 0, k = 0;
  const T = [k];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    l.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), h && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), h = p, p = p.next;
  }
  for (p = t; ++m < a.length; )
    // Find a void token that includes a break.
    a[m][0] === "exit" && a[m - 1][0] === "enter" && a[m][1].type === a[m - 1][1].type && a[m][1].start.line !== a[m][1].end.line && (k = m + 1, T.push(k), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : T.pop(), m = T.length; m--; ) {
    const w = a.slice(T[m], T[m + 1]), v = l.pop();
    s.push([v, v + w.length - 1]), e.splice(v, 2, w);
  }
  for (s.reverse(), m = -1; ++m < s.length; )
    c[y + s[m][0]] = y + s[m][1], y += s[m][1] - s[m][0] - 1;
  return c;
}
const Nl = {
  resolve: vl,
  tokenize: Ll
}, Al = {
  partial: !0,
  tokenize: zl
};
function vl(e) {
  return hr(e), e;
}
function Ll(e, n) {
  let t;
  return r;
  function r(a) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? l(a) : A(a) ? e.check(Al, o, l)(a) : (e.consume(a), i);
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
function zl(e, n, t) {
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
function fr(e, n, t, r, i, l, o, a, s) {
  const c = s || Number.POSITIVE_INFINITY;
  let u = 0;
  return h;
  function h(w) {
    return w === 60 ? (e.enter(r), e.enter(i), e.enter(l), e.consume(w), e.exit(l), m) : w === null || w === 32 || w === 41 || On(w) ? t(w) : (e.enter(r), e.enter(o), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), k(w));
  }
  function m(w) {
    return w === 62 ? (e.enter(l), e.consume(w), e.exit(l), e.exit(i), e.exit(r), n) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), p(w));
  }
  function p(w) {
    return w === 62 ? (e.exit("chunkString"), e.exit(a), m(w)) : w === null || w === 60 || A(w) ? t(w) : (e.consume(w), w === 92 ? y : p);
  }
  function y(w) {
    return w === 60 || w === 62 || w === 92 ? (e.consume(w), p) : p(w);
  }
  function k(w) {
    return !u && (w === null || w === 41 || se(w)) ? (e.exit("chunkString"), e.exit(a), e.exit(o), e.exit(r), n(w)) : u < c && w === 40 ? (e.consume(w), u++, k) : w === 41 ? (e.consume(w), u--, k) : w === null || w === 32 || w === 40 || On(w) ? t(w) : (e.consume(w), w === 92 ? T : k);
  }
  function T(w) {
    return w === 40 || w === 41 || w === 92 ? (e.consume(w), k) : k(w);
  }
}
function dr(e, n, t, r, i, l) {
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
function mr(e, n, t, r, i, l) {
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
function Ge(e, n) {
  let t;
  return r;
  function r(i) {
    return A(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), t = !0, r) : F(i) ? W(e, r, t ? "linePrefix" : "lineSuffix")(i) : n(i);
  }
}
const Ol = {
  name: "definition",
  tokenize: Rl
}, Dl = {
  partial: !0,
  tokenize: Ml
};
function Rl(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(p) {
    return e.enter("definition"), o(p);
  }
  function o(p) {
    return dr.call(
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
    return se(p) ? Ge(e, c)(p) : c(p);
  }
  function c(p) {
    return fr(
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
    return e.attempt(Dl, h, h)(p);
  }
  function h(p) {
    return F(p) ? W(e, m, "whitespace")(p) : m(p);
  }
  function m(p) {
    return p === null || A(p) ? (e.exit("definition"), r.parser.defined.push(i), n(p)) : t(p);
  }
}
function Ml(e, n, t) {
  return r;
  function r(a) {
    return se(a) ? Ge(e, i)(a) : t(a);
  }
  function i(a) {
    return mr(e, l, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function l(a) {
    return F(a) ? W(e, o, "whitespace")(a) : o(a);
  }
  function o(a) {
    return a === null || A(a) ? n(a) : t(a);
  }
}
const Fl = {
  name: "hardBreakEscape",
  tokenize: Bl
};
function Bl(e, n, t) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return A(l) ? (e.exit("hardBreakEscape"), n(l)) : t(l);
  }
}
const jl = {
  name: "headingAtx",
  resolve: Hl,
  tokenize: Ul
};
function Hl(e, n) {
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
function Ul(e, n, t) {
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
    return u === 35 ? (e.enter("atxHeadingSequence"), s(u)) : u === null || A(u) ? (e.exit("atxHeading"), n(u)) : F(u) ? W(e, a, "whitespace")(u) : (e.enter("atxHeadingText"), c(u));
  }
  function s(u) {
    return u === 35 ? (e.consume(u), s) : (e.exit("atxHeadingSequence"), a(u));
  }
  function c(u) {
    return u === null || u === 35 || se(u) ? (e.exit("atxHeadingText"), a(u)) : (e.consume(u), c);
  }
}
const Vl = [
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
], wt = ["pre", "script", "style", "textarea"], ql = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Yl,
  tokenize: Xl
}, $l = {
  partial: !0,
  tokenize: Ql
}, Wl = {
  partial: !0,
  tokenize: Kl
};
function Yl(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function Xl(e, n, t) {
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
    return d === 33 ? (e.consume(d), m) : d === 47 ? (e.consume(d), l = !0, k) : d === 63 ? (e.consume(d), i = 3, r.interrupt ? n : f) : Ee(d) ? (e.consume(d), o = String.fromCharCode(d), T) : t(d);
  }
  function m(d) {
    return d === 45 ? (e.consume(d), i = 2, p) : d === 91 ? (e.consume(d), i = 5, a = 0, y) : Ee(d) ? (e.consume(d), i = 4, r.interrupt ? n : f) : t(d);
  }
  function p(d) {
    return d === 45 ? (e.consume(d), r.interrupt ? n : f) : t(d);
  }
  function y(d) {
    const re = "CDATA[";
    return d === re.charCodeAt(a++) ? (e.consume(d), a === re.length ? r.interrupt ? n : N : y) : t(d);
  }
  function k(d) {
    return Ee(d) ? (e.consume(d), o = String.fromCharCode(d), T) : t(d);
  }
  function T(d) {
    if (d === null || d === 47 || d === 62 || se(d)) {
      const re = d === 47, Pe = o.toLowerCase();
      return !re && !l && wt.includes(Pe) ? (i = 1, r.interrupt ? n(d) : N(d)) : Vl.includes(o.toLowerCase()) ? (i = 6, re ? (e.consume(d), w) : r.interrupt ? n(d) : N(d)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(d) : l ? v(d) : I(d));
    }
    return d === 45 || de(d) ? (e.consume(d), o += String.fromCharCode(d), T) : t(d);
  }
  function w(d) {
    return d === 62 ? (e.consume(d), r.interrupt ? n : N) : t(d);
  }
  function v(d) {
    return F(d) ? (e.consume(d), v) : B(d);
  }
  function I(d) {
    return d === 47 ? (e.consume(d), B) : d === 58 || d === 95 || Ee(d) ? (e.consume(d), V) : F(d) ? (e.consume(d), I) : B(d);
  }
  function V(d) {
    return d === 45 || d === 46 || d === 58 || d === 95 || de(d) ? (e.consume(d), V) : Y(d);
  }
  function Y(d) {
    return d === 61 ? (e.consume(d), x) : F(d) ? (e.consume(d), Y) : I(d);
  }
  function x(d) {
    return d === null || d === 60 || d === 61 || d === 62 || d === 96 ? t(d) : d === 34 || d === 39 ? (e.consume(d), s = d, D) : F(d) ? (e.consume(d), x) : X(d);
  }
  function D(d) {
    return d === s ? (e.consume(d), s = null, R) : d === null || A(d) ? t(d) : (e.consume(d), D);
  }
  function X(d) {
    return d === null || d === 34 || d === 39 || d === 47 || d === 60 || d === 61 || d === 62 || d === 96 || se(d) ? Y(d) : (e.consume(d), X);
  }
  function R(d) {
    return d === 47 || d === 62 || F(d) ? I(d) : t(d);
  }
  function B(d) {
    return d === 62 ? (e.consume(d), P) : t(d);
  }
  function P(d) {
    return d === null || A(d) ? N(d) : F(d) ? (e.consume(d), P) : t(d);
  }
  function N(d) {
    return d === 45 && i === 2 ? (e.consume(d), Z) : d === 60 && i === 1 ? (e.consume(d), j) : d === 62 && i === 4 ? (e.consume(d), ce) : d === 63 && i === 3 ? (e.consume(d), f) : d === 93 && i === 5 ? (e.consume(d), ye) : A(d) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check($l, xe, H)(d)) : d === null || A(d) ? (e.exit("htmlFlowData"), H(d)) : (e.consume(d), N);
  }
  function H(d) {
    return e.check(Wl, q, xe)(d);
  }
  function q(d) {
    return e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), O;
  }
  function O(d) {
    return d === null || A(d) ? H(d) : (e.enter("htmlFlowData"), N(d));
  }
  function Z(d) {
    return d === 45 ? (e.consume(d), f) : N(d);
  }
  function j(d) {
    return d === 47 ? (e.consume(d), o = "", le) : N(d);
  }
  function le(d) {
    if (d === 62) {
      const re = o.toLowerCase();
      return wt.includes(re) ? (e.consume(d), ce) : N(d);
    }
    return Ee(d) && o.length < 8 ? (e.consume(d), o += String.fromCharCode(d), le) : N(d);
  }
  function ye(d) {
    return d === 93 ? (e.consume(d), f) : N(d);
  }
  function f(d) {
    return d === 62 ? (e.consume(d), ce) : d === 45 && i === 2 ? (e.consume(d), f) : N(d);
  }
  function ce(d) {
    return d === null || A(d) ? (e.exit("htmlFlowData"), xe(d)) : (e.consume(d), ce);
  }
  function xe(d) {
    return e.exit("htmlFlow"), n(d);
  }
}
function Kl(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return A(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l) : t(o);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o);
  }
}
function Ql(e, n, t) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(dn, n, t);
  }
}
const Jl = {
  name: "htmlText",
  tokenize: Gl
};
function Gl(e, n, t) {
  const r = this;
  let i, l, o;
  return a;
  function a(f) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(f), s;
  }
  function s(f) {
    return f === 33 ? (e.consume(f), c) : f === 47 ? (e.consume(f), Y) : f === 63 ? (e.consume(f), I) : Ee(f) ? (e.consume(f), X) : t(f);
  }
  function c(f) {
    return f === 45 ? (e.consume(f), u) : f === 91 ? (e.consume(f), l = 0, y) : Ee(f) ? (e.consume(f), v) : t(f);
  }
  function u(f) {
    return f === 45 ? (e.consume(f), p) : t(f);
  }
  function h(f) {
    return f === null ? t(f) : f === 45 ? (e.consume(f), m) : A(f) ? (o = h, j(f)) : (e.consume(f), h);
  }
  function m(f) {
    return f === 45 ? (e.consume(f), p) : h(f);
  }
  function p(f) {
    return f === 62 ? Z(f) : f === 45 ? m(f) : h(f);
  }
  function y(f) {
    const ce = "CDATA[";
    return f === ce.charCodeAt(l++) ? (e.consume(f), l === ce.length ? k : y) : t(f);
  }
  function k(f) {
    return f === null ? t(f) : f === 93 ? (e.consume(f), T) : A(f) ? (o = k, j(f)) : (e.consume(f), k);
  }
  function T(f) {
    return f === 93 ? (e.consume(f), w) : k(f);
  }
  function w(f) {
    return f === 62 ? Z(f) : f === 93 ? (e.consume(f), w) : k(f);
  }
  function v(f) {
    return f === null || f === 62 ? Z(f) : A(f) ? (o = v, j(f)) : (e.consume(f), v);
  }
  function I(f) {
    return f === null ? t(f) : f === 63 ? (e.consume(f), V) : A(f) ? (o = I, j(f)) : (e.consume(f), I);
  }
  function V(f) {
    return f === 62 ? Z(f) : I(f);
  }
  function Y(f) {
    return Ee(f) ? (e.consume(f), x) : t(f);
  }
  function x(f) {
    return f === 45 || de(f) ? (e.consume(f), x) : D(f);
  }
  function D(f) {
    return A(f) ? (o = D, j(f)) : F(f) ? (e.consume(f), D) : Z(f);
  }
  function X(f) {
    return f === 45 || de(f) ? (e.consume(f), X) : f === 47 || f === 62 || se(f) ? R(f) : t(f);
  }
  function R(f) {
    return f === 47 ? (e.consume(f), Z) : f === 58 || f === 95 || Ee(f) ? (e.consume(f), B) : A(f) ? (o = R, j(f)) : F(f) ? (e.consume(f), R) : Z(f);
  }
  function B(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || de(f) ? (e.consume(f), B) : P(f);
  }
  function P(f) {
    return f === 61 ? (e.consume(f), N) : A(f) ? (o = P, j(f)) : F(f) ? (e.consume(f), P) : R(f);
  }
  function N(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? t(f) : f === 34 || f === 39 ? (e.consume(f), i = f, H) : A(f) ? (o = N, j(f)) : F(f) ? (e.consume(f), N) : (e.consume(f), q);
  }
  function H(f) {
    return f === i ? (e.consume(f), i = void 0, O) : f === null ? t(f) : A(f) ? (o = H, j(f)) : (e.consume(f), H);
  }
  function q(f) {
    return f === null || f === 34 || f === 39 || f === 60 || f === 61 || f === 96 ? t(f) : f === 47 || f === 62 || se(f) ? R(f) : (e.consume(f), q);
  }
  function O(f) {
    return f === 47 || f === 62 || se(f) ? R(f) : t(f);
  }
  function Z(f) {
    return f === 62 ? (e.consume(f), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(f);
  }
  function j(f) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), le;
  }
  function le(f) {
    return F(f) ? W(e, ye, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : ye(f);
  }
  function ye(f) {
    return e.enter("htmlTextData"), o(f);
  }
}
const Kn = {
  name: "labelEnd",
  resolveAll: to,
  resolveTo: ro,
  tokenize: io
}, Zl = {
  tokenize: lo
}, eo = {
  tokenize: oo
}, no = {
  tokenize: ao
};
function to(e) {
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
function ro(e, n) {
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
  return a = [["enter", s, n], ["enter", c, n]], a = ge(a, e.slice(l + 1, l + r + 3)), a = ge(a, [["enter", u, n]]), a = ge(a, Xn(n.parser.constructs.insideSpan.null, e.slice(l + r + 4, o - 3), n)), a = ge(a, [["exit", u, n], e[o - 2], e[o - 1], ["exit", c, n]]), a = ge(a, e.slice(o + 1)), a = ge(a, [["exit", s, n]]), _e(e, l, e.length, a), e;
}
function io(e, n, t) {
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
    return m === 40 ? e.attempt(Zl, u, o ? u : h)(m) : m === 91 ? e.attempt(eo, u, o ? c : h)(m) : o ? u(m) : h(m);
  }
  function c(m) {
    return e.attempt(no, u, h)(m);
  }
  function u(m) {
    return n(m);
  }
  function h(m) {
    return l._balanced = !0, t(m);
  }
}
function lo(e, n, t) {
  return r;
  function r(h) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(h), e.exit("resourceMarker"), i;
  }
  function i(h) {
    return se(h) ? Ge(e, l)(h) : l(h);
  }
  function l(h) {
    return h === 41 ? u(h) : fr(e, o, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(h);
  }
  function o(h) {
    return se(h) ? Ge(e, s)(h) : u(h);
  }
  function a(h) {
    return t(h);
  }
  function s(h) {
    return h === 34 || h === 39 || h === 40 ? mr(e, c, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(h) : u(h);
  }
  function c(h) {
    return se(h) ? Ge(e, u)(h) : u(h);
  }
  function u(h) {
    return h === 41 ? (e.enter("resourceMarker"), e.consume(h), e.exit("resourceMarker"), e.exit("resource"), n) : t(h);
  }
}
function oo(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return dr.call(r, e, l, o, "reference", "referenceMarker", "referenceString")(a);
  }
  function l(a) {
    return r.parser.defined.includes(Ve(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(a) : t(a);
  }
  function o(a) {
    return t(a);
  }
}
function ao(e, n, t) {
  return r;
  function r(l) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), i;
  }
  function i(l) {
    return l === 93 ? (e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), e.exit("reference"), n) : t(l);
  }
}
const so = {
  name: "labelStartImage",
  resolveAll: Kn.resolveAll,
  tokenize: uo
};
function uo(e, n, t) {
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
const co = {
  name: "labelStartLink",
  resolveAll: Kn.resolveAll,
  tokenize: po
};
function po(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), l;
  }
  function l(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(o) : n(o);
  }
}
const bn = {
  name: "lineEnding",
  tokenize: ho
};
function ho(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), W(e, n, "linePrefix");
  }
}
const sn = {
  name: "thematicBreak",
  tokenize: fo
};
function fo(e, n, t) {
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
    tokenize: xo
  },
  exit: wo,
  name: "list",
  tokenize: yo
}, mo = {
  partial: !0,
  tokenize: bo
}, go = {
  partial: !0,
  tokenize: ko
};
function yo(e, n, t) {
  const r = this, i = r.events[r.events.length - 1];
  let l = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return a;
  function a(p) {
    const y = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (y === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : Dn(p)) {
      if (r.containerState.type || (r.containerState.type = y, e.enter(y, {
        _container: !0
      })), y === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(sn, t, c)(p) : c(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(p);
    }
    return t(p);
  }
  function s(p) {
    return Dn(p) && ++o < 10 ? (e.consume(p), s) : (!r.interrupt || o < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), c(p)) : t(p);
  }
  function c(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      dn,
      // Can’t be empty when interrupting.
      r.interrupt ? t : u,
      e.attempt(mo, m, h)
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
function xo(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(dn, i, l);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, W(e, n, "listItemIndent", r.containerState.size + 1)(a);
  }
  function l(a) {
    return r.containerState.furtherBlankLines || !F(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(go, n, o)(a));
  }
  function o(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, W(e, e.attempt(ae, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function ko(e, n, t) {
  const r = this;
  return W(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? n(l) : t(l);
  }
}
function wo(e) {
  e.exit(this.containerState.type);
}
function bo(e, n, t) {
  const r = this;
  return W(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return !F(l) && o && o[1].type === "listItemPrefixWhitespace" ? n(l) : t(l);
  }
}
const bt = {
  name: "setextUnderline",
  resolveTo: So,
  tokenize: Co
};
function So(e, n) {
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
function Co(e, n, t) {
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
const Eo = {
  tokenize: _o
};
function _o(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    dn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, W(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Nl, i)), "linePrefix"))
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
const Io = {
  resolveAll: yr()
}, To = gr("string"), Po = gr("text");
function gr(e) {
  return {
    resolveAll: yr(e === "text" ? No : void 0),
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
function yr(e) {
  return n;
  function n(t, r) {
    let i = -1, l;
    for (; ++i <= t.length; )
      l === void 0 ? t[i] && t[i][1].type === "data" && (l = i, i++) : (!t[i] || t[i][1].type !== "data") && (i !== l + 2 && (t[l][1].end = t[i - 1][1].end, t.splice(l + 2, i - l - 2), i = l + 2), l = void 0);
    return e ? e(t, r) : t;
  }
}
function No(e, n) {
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
const Ao = {
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
  62: ur
}, vo = {
  91: Ol
}, Lo = {
  [-2]: wn,
  [-1]: wn,
  32: wn
}, zo = {
  35: jl,
  42: sn,
  45: [bt, sn],
  60: ql,
  61: bt,
  95: sn,
  96: kt,
  126: kt
}, Oo = {
  38: pr,
  92: cr
}, Do = {
  [-5]: bn,
  [-4]: bn,
  [-3]: bn,
  33: so,
  38: pr,
  42: Rn,
  60: [cl, Jl],
  91: co,
  92: [Fl, cr],
  93: Kn,
  95: Rn,
  96: Cl
}, Ro = {
  null: [Rn, Io]
}, Mo = {
  null: [42, 95]
}, Fo = {
  null: []
}, Bo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Mo,
  contentInitial: vo,
  disable: Fo,
  document: Ao,
  flow: zo,
  flowInitial: Lo,
  insideSpan: Ro,
  string: Oo,
  text: Do
}, Symbol.toStringTag, { value: "Module" }));
function jo(e, n, t) {
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
    attempt: D(Y),
    check: D(x),
    consume: v,
    enter: I,
    exit: V,
    interrupt: D(x, {
      interrupt: !0
    })
  }, c = {
    code: null,
    containerState: {},
    defineSkip: k,
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
    return o = ge(o, P), T(), o[o.length - 1] !== null ? [] : (X(n, 0), c.events = Xn(l, c.events, c), c.events);
  }
  function m(P, N) {
    return Uo(p(P), N);
  }
  function p(P) {
    return Ho(o, P);
  }
  function y() {
    const {
      _bufferIndex: P,
      _index: N,
      line: H,
      column: q,
      offset: O
    } = r;
    return {
      _bufferIndex: P,
      _index: N,
      line: H,
      column: q,
      offset: O
    };
  }
  function k(P) {
    i[P.line] = P.column, B();
  }
  function T() {
    let P;
    for (; r._index < o.length; ) {
      const N = o[r._index];
      if (typeof N == "string")
        for (P = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === P && r._bufferIndex < N.length; )
          w(N.charCodeAt(r._bufferIndex));
      else
        w(N);
    }
  }
  function w(P) {
    u = u(P);
  }
  function v(P) {
    A(P) ? (r.line++, r.column = 1, r.offset += P === -3 ? 2 : 1, B()) : P !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = P;
  }
  function I(P, N) {
    const H = N || {};
    return H.type = P, H.start = y(), c.events.push(["enter", H, c]), a.push(H), H;
  }
  function V(P) {
    const N = a.pop();
    return N.end = y(), c.events.push(["exit", N, c]), N;
  }
  function Y(P, N) {
    X(P, N.from);
  }
  function x(P, N) {
    N.restore();
  }
  function D(P, N) {
    return H;
    function H(q, O, Z) {
      let j, le, ye, f;
      return Array.isArray(q) ? (
        /* c8 ignore next 1 */
        xe(q)
      ) : "tokenize" in q ? (
        // Looks like a construct.
        xe([
          /** @type {Construct} */
          q
        ])
      ) : ce(q);
      function ce(ee) {
        return Oe;
        function Oe(be) {
          const Ne = be !== null && ee[be], Ae = be !== null && ee.null, Be = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ne) ? Ne : Ne ? [Ne] : [],
            ...Array.isArray(Ae) ? Ae : Ae ? [Ae] : []
          ];
          return xe(Be)(be);
        }
      }
      function xe(ee) {
        return j = ee, le = 0, ee.length === 0 ? Z : d(ee[le]);
      }
      function d(ee) {
        return Oe;
        function Oe(be) {
          return f = R(), ye = ee, ee.partial || (c.currentConstruct = ee), ee.name && c.parser.constructs.disable.null.includes(ee.name) ? Pe() : ee.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            N ? Object.assign(Object.create(c), N) : c,
            s,
            re,
            Pe
          )(be);
        }
      }
      function re(ee) {
        return P(ye, f), O;
      }
      function Pe(ee) {
        return f.restore(), ++le < j.length ? d(j[le]) : Z;
      }
    }
  }
  function X(P, N) {
    P.resolveAll && !l.includes(P) && l.push(P), P.resolve && _e(c.events, N, c.events.length - N, P.resolve(c.events.slice(N), c)), P.resolveTo && (c.events = P.resolveTo(c.events, c));
  }
  function R() {
    const P = y(), N = c.previous, H = c.currentConstruct, q = c.events.length, O = Array.from(a);
    return {
      from: q,
      restore: Z
    };
    function Z() {
      r = P, c.previous = N, c.currentConstruct = H, c.events.length = q, a = O, B();
    }
  }
  function B() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Ho(e, n) {
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
function Uo(e, n) {
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
function Vo(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Ki([Bo, ...(e || {}).extensions || []])
    ),
    content: i(rl),
    defined: [],
    document: i(ll),
    flow: i(Eo),
    lazy: {},
    string: i(To),
    text: i(Po)
  };
  return r;
  function i(l) {
    return o;
    function o(a) {
      return jo(r, l, a);
    }
  }
}
function qo(e) {
  for (; !hr(e); )
    ;
  return e;
}
const St = /[\0\t\n\r]/g;
function $o() {
  let e = 1, n = "", t = !0, r;
  return i;
  function i(l, o, a) {
    const s = [];
    let c, u, h, m, p;
    for (l = n + (typeof l == "string" ? l.toString() : new TextDecoder(o || void 0).decode(l)), h = 0, n = "", t && (l.charCodeAt(0) === 65279 && h++, t = void 0); h < l.length; ) {
      if (St.lastIndex = h, c = St.exec(l), m = c && c.index !== void 0 ? c.index : l.length, p = l.charCodeAt(m), !c) {
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
const Wo = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Yo(e) {
  return e.replace(Wo, Xo);
}
function Xo(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1), l = i === 120 || i === 88;
    return sr(t.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return Yn(t) || e;
}
const xr = {}.hasOwnProperty;
function Ko(e, n, t) {
  return typeof n != "string" && (t = n, n = void 0), Qo(t)(qo(Vo(t).document().write($o()(e, n, !0))));
}
function Qo(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(me),
      autolinkProtocol: R,
      autolinkEmail: R,
      atxHeading: l(te),
      blockQuote: l(Ae),
      characterEscape: R,
      characterReference: R,
      codeFenced: l(Be),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l(Be, o),
      codeText: l(S, o),
      codeTextData: R,
      data: R,
      codeFlowValue: R,
      definition: l(_),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(ne),
      hardBreakEscape: l(Se),
      hardBreakTrailing: l(Se),
      htmlFlow: l(Q, o),
      htmlFlowData: R,
      htmlText: l(Q, o),
      htmlTextData: R,
      image: l(ke),
      label: o,
      link: l(me),
      listItem: l(K),
      listItemValue: m,
      listOrdered: l(ve, h),
      listUnordered: l(ve),
      paragraph: l(De),
      reference: d,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: l(te),
      strong: l(Ar),
      thematicBreak: l(Lr)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: Y,
      autolink: s(),
      autolinkEmail: Ne,
      autolinkProtocol: be,
      blockQuote: s(),
      characterEscapeValue: B,
      characterReferenceMarkerHexadecimal: Pe,
      characterReferenceMarkerNumeric: Pe,
      characterReferenceValue: ee,
      characterReference: Oe,
      codeFenced: s(T),
      codeFencedFence: k,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: y,
      codeFlowValue: B,
      codeIndented: s(w),
      codeText: s(O),
      codeTextData: B,
      data: B,
      definition: s(),
      definitionDestinationString: V,
      definitionLabelString: v,
      definitionTitleString: I,
      emphasis: s(),
      hardBreakEscape: s(N),
      hardBreakTrailing: s(N),
      htmlFlow: s(H),
      htmlFlowData: B,
      htmlText: s(q),
      htmlTextData: B,
      image: s(j),
      label: ye,
      labelText: le,
      lineEnding: P,
      link: s(Z),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: re,
      resourceDestinationString: f,
      resourceTitleString: ce,
      resource: xe,
      setextHeading: s(X),
      setextHeadingLineSequence: D,
      setextHeadingText: x,
      strong: s(),
      thematicBreak: s()
    }
  };
  kr(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(g) {
    let C = {
      type: "root",
      children: []
    };
    const L = {
      stack: [C],
      tokenStack: [],
      config: n,
      enter: a,
      exit: c,
      buffer: o,
      resume: u,
      data: t
    }, M = [];
    let U = -1;
    for (; ++U < g.length; )
      if (g[U][1].type === "listOrdered" || g[U][1].type === "listUnordered")
        if (g[U][0] === "enter")
          M.push(U);
        else {
          const we = M.pop();
          U = i(g, we, U);
        }
    for (U = -1; ++U < g.length; ) {
      const we = n[g[U][0]];
      xr.call(we, g[U][1].type) && we[g[U][1].type].call(Object.assign({
        sliceSerialize: g[U][2].sliceSerialize
      }, L), g[U][1]);
    }
    if (L.tokenStack.length > 0) {
      const we = L.tokenStack[L.tokenStack.length - 1];
      (we[1] || Ct).call(L, void 0, we[0]);
    }
    for (C.position = {
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
    }, U = -1; ++U < n.transforms.length; )
      C = n.transforms[U](C) || C;
    return C;
  }
  function i(g, C, L) {
    let M = C - 1, U = -1, we = !1, Re, Ie, We, Ye;
    for (; ++M <= L; ) {
      const pe = g[M];
      switch (pe[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          pe[0] === "enter" ? U++ : U--, Ye = void 0;
          break;
        }
        case "lineEndingBlank": {
          pe[0] === "enter" && (Re && !Ye && !U && !We && (We = M), Ye = void 0);
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
      if (!U && pe[0] === "enter" && pe[1].type === "listItemPrefix" || U === -1 && pe[0] === "exit" && (pe[1].type === "listUnordered" || pe[1].type === "listOrdered")) {
        if (Re) {
          let je = M;
          for (Ie = void 0; je--; ) {
            const Te = g[je];
            if (Te[1].type === "lineEnding" || Te[1].type === "lineEndingBlank") {
              if (Te[0] === "exit") continue;
              Ie && (g[Ie][1].type = "lineEndingBlank", we = !0), Te[1].type = "lineEnding", Ie = je;
            } else if (!(Te[1].type === "linePrefix" || Te[1].type === "blockQuotePrefix" || Te[1].type === "blockQuotePrefixWhitespace" || Te[1].type === "blockQuoteMarker" || Te[1].type === "listItemIndent")) break;
          }
          We && (!Ie || We < Ie) && (Re._spread = !0), Re.end = Object.assign({}, Ie ? g[Ie][1].start : pe[1].end), g.splice(Ie || M, 0, ["exit", Re, pe[2]]), M++, L++;
        }
        if (pe[1].type === "listItemPrefix") {
          const je = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, pe[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Re = je, g.splice(M, 0, ["enter", je, pe[2]]), M++, L++, We = void 0, Ye = !0;
        }
      }
    }
    return g[C][1]._spread = we, L;
  }
  function l(g, C) {
    return L;
    function L(M) {
      a.call(this, g(M), M), C && C.call(this, M);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(g, C, L) {
    this.stack[this.stack.length - 1].children.push(g), this.stack.push(g), this.tokenStack.push([C, L || void 0]), g.position = {
      start: Le(C.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(g) {
    return C;
    function C(L) {
      g && g.call(this, L), c.call(this, L);
    }
  }
  function c(g, C) {
    const L = this.stack.pop(), M = this.tokenStack.pop();
    if (M)
      M[0].type !== g.type && (C ? C.call(this, g, M[0]) : (M[1] || Ct).call(this, g, M[0]));
    else throw new Error("Cannot close `" + g.type + "` (" + Je({
      start: g.start,
      end: g.end
    }) + "): it’s not open");
    L.position.end = Le(g.end);
  }
  function u() {
    return Yi(this.stack.pop());
  }
  function h() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(g) {
    if (this.data.expectingFirstListItemValue) {
      const C = this.stack[this.stack.length - 2];
      C.start = Number.parseInt(this.sliceSerialize(g), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const g = this.resume(), C = this.stack[this.stack.length - 1];
    C.lang = g;
  }
  function y() {
    const g = this.resume(), C = this.stack[this.stack.length - 1];
    C.meta = g;
  }
  function k() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function T() {
    const g = this.resume(), C = this.stack[this.stack.length - 1];
    C.value = g.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function w() {
    const g = this.resume(), C = this.stack[this.stack.length - 1];
    C.value = g.replace(/(\r?\n|\r)$/g, "");
  }
  function v(g) {
    const C = this.resume(), L = this.stack[this.stack.length - 1];
    L.label = C, L.identifier = Ve(this.sliceSerialize(g)).toLowerCase();
  }
  function I() {
    const g = this.resume(), C = this.stack[this.stack.length - 1];
    C.title = g;
  }
  function V() {
    const g = this.resume(), C = this.stack[this.stack.length - 1];
    C.url = g;
  }
  function Y(g) {
    const C = this.stack[this.stack.length - 1];
    if (!C.depth) {
      const L = this.sliceSerialize(g).length;
      C.depth = L;
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function D(g) {
    const C = this.stack[this.stack.length - 1];
    C.depth = this.sliceSerialize(g).codePointAt(0) === 61 ? 1 : 2;
  }
  function X() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function R(g) {
    const L = this.stack[this.stack.length - 1].children;
    let M = L[L.length - 1];
    (!M || M.type !== "text") && (M = vr(), M.position = {
      start: Le(g.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, L.push(M)), this.stack.push(M);
  }
  function B(g) {
    const C = this.stack.pop();
    C.value += this.sliceSerialize(g), C.position.end = Le(g.end);
  }
  function P(g) {
    const C = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const L = C.children[C.children.length - 1];
      L.position.end = Le(g.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(C.type) && (R.call(this, g), B.call(this, g));
  }
  function N() {
    this.data.atHardBreak = !0;
  }
  function H() {
    const g = this.resume(), C = this.stack[this.stack.length - 1];
    C.value = g;
  }
  function q() {
    const g = this.resume(), C = this.stack[this.stack.length - 1];
    C.value = g;
  }
  function O() {
    const g = this.resume(), C = this.stack[this.stack.length - 1];
    C.value = g;
  }
  function Z() {
    const g = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const C = this.data.referenceType || "shortcut";
      g.type += "Reference", g.referenceType = C, delete g.url, delete g.title;
    } else
      delete g.identifier, delete g.label;
    this.data.referenceType = void 0;
  }
  function j() {
    const g = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const C = this.data.referenceType || "shortcut";
      g.type += "Reference", g.referenceType = C, delete g.url, delete g.title;
    } else
      delete g.identifier, delete g.label;
    this.data.referenceType = void 0;
  }
  function le(g) {
    const C = this.sliceSerialize(g), L = this.stack[this.stack.length - 2];
    L.label = Yo(C), L.identifier = Ve(C).toLowerCase();
  }
  function ye() {
    const g = this.stack[this.stack.length - 1], C = this.resume(), L = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, L.type === "link") {
      const M = g.children;
      L.children = M;
    } else
      L.alt = C;
  }
  function f() {
    const g = this.resume(), C = this.stack[this.stack.length - 1];
    C.url = g;
  }
  function ce() {
    const g = this.resume(), C = this.stack[this.stack.length - 1];
    C.title = g;
  }
  function xe() {
    this.data.inReference = void 0;
  }
  function d() {
    this.data.referenceType = "collapsed";
  }
  function re(g) {
    const C = this.resume(), L = this.stack[this.stack.length - 1];
    L.label = C, L.identifier = Ve(this.sliceSerialize(g)).toLowerCase(), this.data.referenceType = "full";
  }
  function Pe(g) {
    this.data.characterReferenceType = g.type;
  }
  function ee(g) {
    const C = this.sliceSerialize(g), L = this.data.characterReferenceType;
    let M;
    L ? (M = sr(C, L === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : M = Yn(C);
    const U = this.stack[this.stack.length - 1];
    U.value += M;
  }
  function Oe(g) {
    const C = this.stack.pop();
    C.position.end = Le(g.end);
  }
  function be(g) {
    B.call(this, g);
    const C = this.stack[this.stack.length - 1];
    C.url = this.sliceSerialize(g);
  }
  function Ne(g) {
    B.call(this, g);
    const C = this.stack[this.stack.length - 1];
    C.url = "mailto:" + this.sliceSerialize(g);
  }
  function Ae() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function Be() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function S() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function _() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function ne() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function te() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Se() {
    return {
      type: "break"
    };
  }
  function Q() {
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
  function me() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function ve(g) {
    return {
      type: "list",
      ordered: g.type === "listOrdered",
      start: null,
      spread: g._spread,
      children: []
    };
  }
  function K(g) {
    return {
      type: "listItem",
      spread: g._spread,
      checked: null,
      children: []
    };
  }
  function De() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Ar() {
    return {
      type: "strong",
      children: []
    };
  }
  function vr() {
    return {
      type: "text",
      value: ""
    };
  }
  function Lr() {
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
function kr(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? kr(e, r) : Jo(e, r);
  }
}
function Jo(e, n) {
  let t;
  for (t in n)
    if (xr.call(n, t))
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
function Ct(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Je({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + Je({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + Je({
    start: n.start,
    end: n.end
  }) + ") is still open");
}
function Go(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return Ko(r, {
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
function Zo(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function ea(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(n, t), [e.applyData(n, t), { type: "text", value: `
` }];
}
function na(e, n) {
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
function ta(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function ra(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function ia(e, n) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(n.identifier).toUpperCase(), i = $e(r.toLowerCase()), l = e.footnoteOrder.indexOf(r);
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
function la(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function oa(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function wr(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (n.label || n.identifier) + "]"), n.type === "imageReference")
    return [{ type: "text", value: "![" + n.alt + r }];
  const i = e.all(n), l = i[0];
  l && l.type === "text" ? l.value = "[" + l.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function aa(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return wr(e, n);
  const i = { src: $e(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(n, l), e.applyData(n, l);
}
function sa(e, n) {
  const t = { src: $e(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function ua(e, n) {
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
function ca(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return wr(e, n);
  const i = { href: $e(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(n)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function pa(e, n) {
  const t = { href: $e(n.url) };
  n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: t,
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function ha(e, n, t) {
  const r = e.all(n), i = t ? fa(t) : br(n), l = {}, o = [];
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
function fa(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; )
      n = br(t[r]);
  }
  return n;
}
function br(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function da(e, n) {
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
function ma(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function ga(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function ya(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function xa(e, n) {
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
    }, a = Vn(n.children[1]), s = nr(n.children[n.children.length - 1]);
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
function ka(e, n, t) {
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
function wa(e, n) {
  const t = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Et = 9, _t = 32;
function ba(e) {
  const n = String(e), t = /\r?\n|\r/g;
  let r = t.exec(n), i = 0;
  const l = [];
  for (; r; )
    l.push(
      It(n.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = t.exec(n);
  return l.push(It(n.slice(i), i > 0, !1)), l.join("");
}
function It(e, n, t) {
  let r = 0, i = e.length;
  if (n) {
    let l = e.codePointAt(r);
    for (; l === Et || l === _t; )
      r++, l = e.codePointAt(r);
  }
  if (t) {
    let l = e.codePointAt(i - 1);
    for (; l === Et || l === _t; )
      i--, l = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function Sa(e, n) {
  const t = { type: "text", value: ba(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Ca(e, n) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Ea = {
  blockquote: Zo,
  break: ea,
  code: na,
  delete: ta,
  emphasis: ra,
  footnoteReference: ia,
  heading: la,
  html: oa,
  imageReference: aa,
  image: sa,
  inlineCode: ua,
  linkReference: ca,
  link: pa,
  listItem: ha,
  list: da,
  paragraph: ma,
  // @ts-expect-error: root is different, but hard to type.
  root: ga,
  strong: ya,
  table: xa,
  tableCell: wa,
  tableRow: ka,
  text: Sa,
  thematicBreak: Ca,
  toml: ln,
  yaml: ln,
  definition: ln,
  footnoteDefinition: ln
};
function ln() {
}
const Sr = -1, mn = 0, Ze = 1, pn = 2, Qn = 3, Jn = 4, Gn = 5, Zn = 6, Cr = 7, Er = 8, Tt = typeof self == "object" ? self : globalThis, _a = (e, n) => {
  const t = (i, l) => (e.set(l, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [l, o] = n[i];
    switch (l) {
      case mn:
      case Sr:
        return t(o, i);
      case Ze: {
        const a = t([], i);
        for (const s of o)
          a.push(r(s));
        return a;
      }
      case pn: {
        const a = t({}, i);
        for (const [s, c] of o)
          a[r(s)] = r(c);
        return a;
      }
      case Qn:
        return t(new Date(o), i);
      case Jn: {
        const { source: a, flags: s } = o;
        return t(new RegExp(a, s), i);
      }
      case Gn: {
        const a = t(/* @__PURE__ */ new Map(), i);
        for (const [s, c] of o)
          a.set(r(s), r(c));
        return a;
      }
      case Zn: {
        const a = t(/* @__PURE__ */ new Set(), i);
        for (const s of o)
          a.add(r(s));
        return a;
      }
      case Cr: {
        const { name: a, message: s } = o;
        return t(new Tt[a](s), i);
      }
      case Er:
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
    return t(new Tt[l](o), i);
  };
  return r;
}, Pt = (e) => _a(/* @__PURE__ */ new Map(), e)(0), He = "", { toString: Ia } = {}, { keys: Ta } = Object, Ke = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [mn, n];
  const t = Ia.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [Ze, He];
    case "Object":
      return [pn, He];
    case "Date":
      return [Qn, He];
    case "RegExp":
      return [Jn, He];
    case "Map":
      return [Gn, He];
    case "Set":
      return [Zn, He];
    case "DataView":
      return [Ze, t];
  }
  return t.includes("Array") ? [Ze, t] : t.includes("Error") ? [Cr, t] : [pn, t];
}, on = ([e, n]) => e === mn && (n === "function" || n === "symbol"), Pa = (e, n, t, r) => {
  const i = (o, a) => {
    const s = r.push(o) - 1;
    return t.set(a, s), s;
  }, l = (o) => {
    if (t.has(o))
      return t.get(o);
    let [a, s] = Ke(o);
    switch (a) {
      case mn: {
        let u = o;
        switch (s) {
          case "bigint":
            a = Er, u = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            u = null;
            break;
          case "undefined":
            return i([Sr], o);
        }
        return i([a, u], o);
      }
      case Ze: {
        if (s) {
          let m = o;
          return s === "DataView" ? m = new Uint8Array(o.buffer) : s === "ArrayBuffer" && (m = new Uint8Array(o)), i([s, [...m]], o);
        }
        const u = [], h = i([a, u], o);
        for (const m of o)
          u.push(l(m));
        return h;
      }
      case pn: {
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
        for (const m of Ta(o))
          (e || !on(Ke(o[m]))) && u.push([l(m), l(o[m])]);
        return h;
      }
      case Qn:
        return i([a, o.toISOString()], o);
      case Jn: {
        const { source: u, flags: h } = o;
        return i([a, { source: u, flags: h }], o);
      }
      case Gn: {
        const u = [], h = i([a, u], o);
        for (const [m, p] of o)
          (e || !(on(Ke(m)) || on(Ke(p)))) && u.push([l(m), l(p)]);
        return h;
      }
      case Zn: {
        const u = [], h = i([a, u], o);
        for (const m of o)
          (e || !on(Ke(m))) && u.push(l(m));
        return h;
      }
    }
    const { message: c } = o;
    return i([a, { name: s, message: c }], o);
  };
  return l;
}, Nt = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return Pa(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, hn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? Pt(Nt(e, n)) : structuredClone(e)
) : (e, n) => Pt(Nt(e, n));
function Na(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return n > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(n) }]
  }), t;
}
function Aa(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function va(e) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || Na, r = e.options.footnoteBackLabel || Aa, i = e.options.footnoteLabel || "Footnotes", l = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const c = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!c)
      continue;
    const u = e.all(c), h = String(c.identifier).toUpperCase(), m = $e(h.toLowerCase());
    let p = 0;
    const y = [], k = e.footnoteCounts.get(h);
    for (; k !== void 0 && ++p <= k; ) {
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
    const T = u[u.length - 1];
    if (T && T.type === "element" && T.tagName === "p") {
      const v = T.children[T.children.length - 1];
      v && v.type === "text" ? v.value += " " : T.children.push({ type: "text", value: " " }), T.children.push(...y);
    } else
      u.push(...y);
    const w = {
      type: "element",
      tagName: "li",
      properties: { id: n + "fn-" + m },
      children: e.wrap(u, !0)
    };
    e.patch(c, w), a.push(w);
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
            ...hn(o),
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
const _r = (
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
      return Da;
    if (typeof e == "function")
      return gn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? La(e) : za(e);
    if (typeof e == "string")
      return Oa(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function La(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = _r(e[t]);
  return gn(r);
  function r(...i) {
    let l = -1;
    for (; ++l < n.length; )
      if (n[l].apply(this, i)) return !0;
    return !1;
  }
}
function za(e) {
  const n = (
    /** @type {Record<string, unknown>} */
    e
  );
  return gn(t);
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
function Oa(e) {
  return gn(n);
  function n(t) {
    return t && t.type === e;
  }
}
function gn(e) {
  return n;
  function n(t, r, i) {
    return !!(Ra(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Da() {
  return !0;
}
function Ra(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Ir = [], Ma = !0, At = !1, Fa = "skip";
function Ba(e, n, t, r) {
  let i;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : i = n;
  const l = _r(i), o = r ? -1 : 1;
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
      let p = Ir, y, k, T;
      if ((!n || l(s, c, u[u.length - 1] || void 0)) && (p = ja(t(s, u)), p[0] === At))
        return p;
      if ("children" in s && s.children) {
        const w = (
          /** @type {UnistParent} */
          s
        );
        if (w.children && p[0] !== Fa)
          for (k = (r ? w.children.length : -1) + o, T = u.concat(w); k > -1 && k < w.children.length; ) {
            const v = w.children[k];
            if (y = a(v, k, T)(), y[0] === At)
              return y;
            k = typeof y[1] == "number" ? y[1] : k + o;
          }
      }
      return p;
    }
  }
}
function ja(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Ma, e] : e == null ? Ir : [e];
}
function Tr(e, n, t, r) {
  let i, l, o;
  typeof n == "function" && typeof t != "function" ? (l = void 0, o = n, i = t) : (l = n, o = t, i = r), Ba(e, l, a, i);
  function a(s, c) {
    const u = c[c.length - 1], h = u ? u.children.indexOf(s) : void 0;
    return o(s, h, u);
  }
}
const Mn = {}.hasOwnProperty, Ha = {};
function Ua(e, n) {
  const t = n || Ha, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), o = { ...Ea, ...t.handlers }, a = {
    all: c,
    applyData: qa,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: l,
    footnoteOrder: [],
    handlers: o,
    one: s,
    options: t,
    patch: Va,
    wrap: Wa
  };
  return Tr(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const h = u.type === "definition" ? r : i, m = String(u.identifier).toUpperCase();
      h.has(m) || h.set(m, u);
    }
  }), a;
  function s(u, h) {
    const m = u.type, p = a.handlers[m];
    if (Mn.call(a.handlers, m) && p)
      return p(a, u, h);
    if (a.options.passThrough && a.options.passThrough.includes(m)) {
      if ("children" in u) {
        const { children: k, ...T } = u, w = hn(T);
        return w.children = a.all(u), w;
      }
      return hn(u);
    }
    return (a.options.unknownHandler || $a)(a, u, h);
  }
  function c(u) {
    const h = [];
    if ("children" in u) {
      const m = u.children;
      let p = -1;
      for (; ++p < m.length; ) {
        const y = a.one(m[p], u);
        if (y) {
          if (p && m[p - 1].type === "break" && (!Array.isArray(y) && y.type === "text" && (y.value = vt(y.value)), !Array.isArray(y) && y.type === "element")) {
            const k = y.children[0];
            k && k.type === "text" && (k.value = vt(k.value));
          }
          Array.isArray(y) ? h.push(...y) : h.push(y);
        }
      }
    }
    return h;
  }
}
function Va(e, n) {
  e.position && (n.position = _i(e));
}
function qa(e, n) {
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
    t.type === "element" && l && Object.assign(t.properties, hn(l)), "children" in t && t.children && i !== null && i !== void 0 && (t.children = i);
  }
  return t;
}
function $a(e, n) {
  const t = n.data || {}, r = "value" in n && !(Mn.call(t, "hProperties") || Mn.call(t, "hChildren")) ? { type: "text", value: n.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function Wa(e, n) {
  const t = [];
  let r = -1;
  for (n && t.push({ type: "text", value: `
` }); ++r < e.length; )
    r && t.push({ type: "text", value: `
` }), t.push(e[r]);
  return n && e.length > 0 && t.push({ type: "text", value: `
` }), t;
}
function vt(e) {
  let n = 0, t = e.charCodeAt(n);
  for (; t === 9 || t === 32; )
    n++, t = e.charCodeAt(n);
  return e.slice(n);
}
function Lt(e, n) {
  const t = Ua(e, n), r = t.one(e, void 0), i = va(t), l = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && l.children.push({ type: "text", value: `
` }, i), l;
}
function Ya(e, n) {
  return e && "run" in e ? async function(t, r) {
    const i = (
      /** @type {HastRoot} */
      Lt(t, { file: r, ...n })
    );
    await e.run(i, r);
  } : function(t, r) {
    return (
      /** @type {HastRoot} */
      Lt(t, { file: r, ...e || n })
    );
  };
}
function zt(e) {
  if (e)
    throw e;
}
var un = Object.prototype.hasOwnProperty, Pr = Object.prototype.toString, Ot = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, Rt = function(n) {
  return typeof Array.isArray == "function" ? Array.isArray(n) : Pr.call(n) === "[object Array]";
}, Mt = function(n) {
  if (!n || Pr.call(n) !== "[object Object]")
    return !1;
  var t = un.call(n, "constructor"), r = n.constructor && n.constructor.prototype && un.call(n.constructor.prototype, "isPrototypeOf");
  if (n.constructor && !t && !r)
    return !1;
  var i;
  for (i in n)
    ;
  return typeof i > "u" || un.call(n, i);
}, Ft = function(n, t) {
  Ot && t.name === "__proto__" ? Ot(n, t.name, {
    enumerable: !0,
    configurable: !0,
    value: t.newValue,
    writable: !0
  }) : n[t.name] = t.newValue;
}, Bt = function(n, t) {
  if (t === "__proto__")
    if (un.call(n, t)) {
      if (Dt)
        return Dt(n, t).value;
    } else return;
  return n[t];
}, Xa = function e() {
  var n, t, r, i, l, o, a = arguments[0], s = 1, c = arguments.length, u = !1;
  for (typeof a == "boolean" && (u = a, a = arguments[1] || {}, s = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); s < c; ++s)
    if (n = arguments[s], n != null)
      for (t in n)
        r = Bt(a, t), i = Bt(n, t), a !== i && (u && i && (Mt(i) || (l = Rt(i))) ? (l ? (l = !1, o = r && Rt(r) ? r : []) : o = r && Mt(r) ? r : {}, Ft(a, { name: t, newValue: e(u, o, i) })) : typeof i < "u" && Ft(a, { name: t, newValue: i }));
  return a;
};
const Sn = /* @__PURE__ */ er(Xa);
function Fn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Ka() {
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
      i = c, u ? Qa(u, a)(...c) : o(null, ...c);
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
function Qa(e, n) {
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
const Ce = { basename: Ja, dirname: Ga, extname: Za, join: es, sep: "/" };
function Ja(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  tn(e);
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
function Ga(e) {
  if (tn(e), e.length === 0)
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
function Za(e) {
  tn(e);
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
function es(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    tn(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : ns(t);
}
function ns(e) {
  tn(e);
  const n = e.codePointAt(0) === 47;
  let t = ts(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function ts(e, n) {
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
function tn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const rs = { cwd: is };
function is() {
  return "/";
}
function Bn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function ls(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Bn(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw n.code = "ERR_INVALID_ARG_TYPE", n;
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw n.code = "ERR_INVALID_URL_SCHEME", n;
  }
  return os(e);
}
function os(e) {
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
const Cn = (
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
class Nr {
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
    n ? Bn(n) ? t = { path: n } : typeof n == "string" || as(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : rs.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Cn.length; ) {
      const l = Cn[r];
      l in t && t[l] !== void 0 && t[l] !== null && (this[l] = l === "history" ? [...t[l]] : t[l]);
    }
    let i;
    for (i in t)
      Cn.includes(i) || (this[i] = t[i]);
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
    _n(n, "basename"), En(n, "basename"), this.path = Ce.join(this.dirname || "", n);
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
    jt(this.basename, "dirname"), this.path = Ce.join(n || "", this.basename);
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
    if (En(n, "extname"), jt(this.dirname, "extname"), n) {
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
    Bn(n) && (n = ls(n)), _n(n, "path"), this.path !== n && this.history.push(n);
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
    _n(n, "stem"), En(n, "stem"), this.path = Ce.join(this.dirname || "", n + (this.extname || ""));
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
    const i = new ie(
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
function En(e, n) {
  if (e && e.includes(Ce.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + Ce.sep + "`"
    );
}
function _n(e, n) {
  if (!e)
    throw new Error("`" + n + "` cannot be empty");
}
function jt(e, n) {
  if (!e)
    throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function as(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const ss = (
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
), us = {}.hasOwnProperty;
class et extends ss {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Ka();
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
      new et()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data(Sn(!0, {}, this.namespace)), n;
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
    return typeof n == "string" ? arguments.length === 2 ? (Pn("data", this.frozen), this.namespace[n] = t, this) : us.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (Pn("data", this.frozen), this.namespace = n, this) : this.namespace;
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
    const t = an(n), r = this.parser || this.Parser;
    return In("parse", r), r(String(t), t);
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
    return this.freeze(), In("process", this.parser || this.Parser), Tn("process", this.compiler || this.Compiler), t ? i(void 0, t) : new Promise(i);
    function i(l, o) {
      const a = an(n), s = (
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
        hs(y) ? m.value = y : m.result = y, c(
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
    return this.freeze(), In("processSync", this.parser || this.Parser), Tn("processSync", this.compiler || this.Compiler), this.process(n, i), Ut("processSync", "process", t), r;
    function i(l, o) {
      t = !0, zt(l), r = o;
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
    Ht(n), this.freeze();
    const i = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? l(void 0, r) : new Promise(l);
    function l(o, a) {
      const s = an(t);
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
    return this.run(n, t, l), Ut("runSync", "run", r), i;
    function l(o, a) {
      zt(o), i = a, r = !0;
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
    const r = an(t), i = this.compiler || this.Compiler;
    return Tn("stringify", i), Ht(n), i(n, r);
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
    if (Pn("use", this.frozen), n != null) if (typeof n == "function")
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
      a(c.plugins), c.settings && (i.settings = Sn(!0, i.settings, c.settings));
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
        const k = r[m][1];
        Fn(k) && Fn(p) && (p = Sn(!0, k, p)), r[m] = [c, p, ...y];
      }
    }
  }
}
const cs = new et().freeze();
function In(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Tn(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Pn(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Ht(e) {
  if (!Fn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Ut(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function an(e) {
  return ps(e) ? e : new Nr(e);
}
function ps(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function hs(e) {
  return typeof e == "string" || fs(e);
}
function fs(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const ds = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Vt = [], qt = { allowDangerousHtml: !0 }, ms = /^(https?|ircs?|mailto|xmpp)$/i, gs = [
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
function $t(e) {
  const n = ys(e), t = xs(e);
  return ks(n.runSync(n.parse(t), t), e);
}
function ys(e) {
  const n = e.rehypePlugins || Vt, t = e.remarkPlugins || Vt, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...qt } : qt;
  return cs().use(Go).use(t).use(Ya, r).use(n);
}
function xs(e) {
  const n = e.children || "", t = new Nr();
  return typeof n == "string" && (t.value = n), t;
}
function ks(e, n) {
  const t = n.allowedElements, r = n.allowElement, i = n.components, l = n.disallowedElements, o = n.skipHtml, a = n.unwrapDisallowed, s = n.urlTransform || ws;
  for (const u of gs)
    Object.hasOwn(n, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + ds + u.id, void 0);
  return Tr(e, c), Ai(e, {
    Fragment: Wt,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: E,
    jsxs: J,
    passKeys: !0,
    passNode: !0
  });
  function c(u, h, m) {
    if (u.type === "raw" && m && typeof h == "number")
      return o ? m.children.splice(h, 1) : m.children[h] = { type: "text", value: u.value }, h;
    if (u.type === "element") {
      let p;
      for (p in kn)
        if (Object.hasOwn(kn, p) && Object.hasOwn(u.properties, p)) {
          const y = u.properties[p], k = kn[p];
          (k === null || k.includes(u.tagName)) && (u.properties[p] = s(String(y || ""), p, u));
        }
    }
    if (u.type === "element") {
      let p = t ? !t.includes(u.tagName) : l ? l.includes(u.tagName) : !1;
      if (!p && r && typeof h == "number" && (p = !r(u, h, m)), p && m && typeof h == "number")
        return a && u.children ? m.children.splice(h, 1, ...u.children) : m.children.splice(h, 1), h;
    }
  }
}
function ws(e) {
  const n = e.indexOf(":"), t = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && n > i || t !== -1 && n > t || r !== -1 && n > r || // It is a protocol, it should be allowed.
    ms.test(e.slice(0, n)) ? e : ""
  );
}
function bs({
  onSend: e,
  disabled: n,
  placeholder: t,
  value: r,
  onChange: i,
  onStop: l,
  onClear: o,
  showStopButton: a,
  showClearButton: s
}) {
  const c = () => {
    const p = r || "";
    p.trim() && !n && (e(p.trim()), i && i(""));
  };
  return /* @__PURE__ */ J("div", { className: "chat-wrapper__input", children: [
    /* @__PURE__ */ E(
      "textarea",
      {
        value: r || "",
        onChange: (p) => i ? i(p.target.value) : void 0,
        onKeyPress: (p) => {
          p.key === "Enter" && !p.shiftKey && (p.preventDefault(), c());
        },
        placeholder: t,
        disabled: n,
        className: "chat-wrapper__textarea",
        rows: 1
      }
    ),
    /* @__PURE__ */ J("div", { className: "chat-wrapper__input-buttons", children: [
      a && /* @__PURE__ */ E(
        "button",
        {
          onClick: () => {
            l && l();
          },
          className: "chat-wrapper__stop-button",
          title: "Stop generation",
          children: "Stop"
        }
      ),
      s && !n && /* @__PURE__ */ E(
        "button",
        {
          onClick: () => {
            o && o();
          },
          className: "chat-wrapper__clear-button",
          title: "Clear chat",
          children: "Clear"
        }
      ),
      /* @__PURE__ */ E(
        "button",
        {
          onClick: c,
          disabled: n || !(r != null && r.trim()),
          className: "chat-wrapper__send-button",
          children: n ? "Sending..." : "Send"
        }
      )
    ] })
  ] });
}
function Ss({ children: e }) {
  return /* @__PURE__ */ E("div", { className: "chat-wrapper__reasoning", children: e });
}
function Cs({ title: e }) {
  return /* @__PURE__ */ J("div", { className: "chat-wrapper__reasoning-trigger", children: [
    /* @__PURE__ */ E("div", { className: "chat-wrapper__reasoning-icon", children: /* @__PURE__ */ E("div", { className: "chat-wrapper__reasoning-spinner" }) }),
    /* @__PURE__ */ E("span", { className: "chat-wrapper__reasoning-title", children: e })
  ] });
}
function Es({ children: e }) {
  return /* @__PURE__ */ E("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ E("div", { className: "chat-wrapper__reasoning-text", children: e }) });
}
function _s({ size: e = 16, variant: n = "dots" }) {
  return n === "dots" ? /* @__PURE__ */ J("div", { className: "chat-wrapper__loader-dots", style: { fontSize: e }, children: [
    /* @__PURE__ */ E("span", {}),
    /* @__PURE__ */ E("span", {}),
    /* @__PURE__ */ E("span", {})
  ] }) : n === "pulse" ? /* @__PURE__ */ E(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: e, height: e }
    }
  ) : /* @__PURE__ */ E(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: e, height: e }
    }
  );
}
function As({
  apiUrl: e,
  config: n,
  tools: t,
  initialMessages: r = []
}) {
  const [i, l] = oe(r), [o, a] = oe(""), [s, c] = oe(!1), [u, h] = oe(null), [m, p] = oe(!1), [y, k] = oe([]), [T, w] = oe([]), [v, I] = oe([]), [V, Y] = oe([]), [x, D] = oe(""), [X, R] = oe(!1), [B, P] = oe(""), N = Qe(null), H = Qe(null), q = Qe(null), O = fe(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), Z = fe(() => {
    var S;
    (S = N.current) == null || S.scrollIntoView({ behavior: "smooth" });
  }, []);
  rn(() => {
    t && Object.keys(t).length > 0 && console.log("Available tools:", Object.keys(t));
  }, [t]), rn(() => {
    Z();
  }, [i, Z]), rn(() => {
    n.onStreamingStatusChange && n.onStreamingStatusChange(x);
  }, [x, n]);
  const j = fe(
    (S) => {
      const _ = H.current;
      _ && l(
        (ne) => ne.map((te) => te.id === _ ? S(te) : te)
      );
    },
    []
  ), le = fe(
    (S) => {
      var _, ne, te, Se, Q, ke, me, ve;
      switch (console.log("Processing stream event:", S.type, S), S.type) {
        case "event":
          S.event === "latitude-event" ? ((_ = S.data) == null ? void 0 : _.type) === "chain-started" ? (D("Planning chain started"), R(!0), P(
            "🔗 Starting comprehensive planning chain..."
          )) : ((ne = S.data) == null ? void 0 : ne.type) === "step-started" ? (D("Planning step started"), R(!0), P("📊 Executing planning step...")) : ((te = S.data) == null ? void 0 : te.type) === "provider-completed" ? (D("AI planning completed"), R(!1), P(""), (Se = S.data.response) != null && Se.text && j((K) => ({
            ...K,
            content: S.data.response.text,
            isStreaming: !1
          }))) : ((Q = S.data) == null ? void 0 : Q.type) === "chain-completed" && (D("Planning completed"), R(!1), P(""), S.data.uuid && h(S.data.uuid), j((K) => ({
            ...K,
            isStreaming: !1
          }))) : S.event === "provider-event" && ((ke = S.data) == null ? void 0 : ke.type) === "text-delta" && (R(!1), P(""), j((K) => ({
            ...K,
            content: K.content + S.data.textDelta
          })));
          break;
        case "text-delta":
          S.content && j((K) => ({
            ...K,
            content: K.content + S.content
          }));
          break;
        case "tool-result":
          if (console.log("Tool result received:", S), S.tool && S.data && (S.data.id || S.data.success)) {
            const K = {
              id: S.data.id || O(),
              title: S.data.title || `${S.tool} result`,
              description: S.data.description,
              status: S.data.status || "completed",
              created_at: S.data.created_at || (/* @__PURE__ */ new Date()).toISOString(),
              ...S.data
            };
            k((De) => [...De, K]);
          }
          S.todos && (w(S.todos), n.onToolResult && n.onToolResult("todos", S.todos)), S.briefs && (I(S.briefs), n.onToolResult && n.onToolResult("briefs", S.briefs));
          break;
        case "finished":
          D("Stream finished"), S.uuid && h(S.uuid), (ve = (me = S.result) == null ? void 0 : me.response) != null && ve.text ? j((K) => ({
            ...K,
            content: S.result.response.text,
            isStreaming: !1
          })) : j((K) => ({
            ...K,
            isStreaming: !1
          }));
          break;
        case "stream-error":
          console.error("Stream error:", S.error), j((K) => ({
            ...K,
            content: `Stream Error: ${S.error}`,
            isStreaming: !1
          }));
          break;
        case "error":
          console.error("API error:", S.error), j((K) => ({
            ...K,
            content: `Error: ${S.error}`,
            isStreaming: !1
          }));
          break;
      }
    },
    [j, O, n]
  ), ye = fe(
    async (S, _) => {
      if (!S.trim() || s) return;
      const ne = {
        id: O(),
        role: "user",
        content: S.trim(),
        timestamp: /* @__PURE__ */ new Date(),
        media: _
      };
      l((Q) => [...Q, ne]), c(!0), D("Starting...");
      const te = O();
      H.current = te;
      const Se = {
        id: te,
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      l((Q) => [...Q, Se]);
      try {
        q.current = new AbortController();
        const Q = n.endpoint === "brief-planner" ? `${e}/api/brief-planner` : u ? `${e}/api/conversation/${u}` : `${e}/api/conversation/init`, ke = n.endpoint === "brief-planner" ? {
          messages: [...i, ne],
          promptPath: n.promptPath || "briefPlanner",
          conversationUuid: u,
          todos: T,
          // Send current todos to the API
          briefs: v,
          // Send current briefs to the API
          media: _ || []
          // Use media from function parameter, not uploadedMedia
        } : {
          message: S.trim(),
          tools: t ? Object.keys(t) : []
        };
        console.log("Sending request to:", Q), console.log("Request payload:", JSON.stringify(ke, null, 2));
        const me = await fetch(Q, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...n.apiKey && { Authorization: `Bearer ${n.apiKey}` }
          },
          body: JSON.stringify(ke),
          signal: q.current.signal
        });
        if (!me.ok)
          throw new Error(`HTTP error! status: ${me.status}`);
        await f(me);
      } catch (Q) {
        Q instanceof Error && Q.name === "AbortError" ? console.log("Request aborted") : (console.error("Request error:", Q), j((ke) => ({
          ...ke,
          content: `Sorry, there was an error: ${Q instanceof Error ? Q.message : "Unknown error"}`,
          isStreaming: !1
        })), n.onError && n.onError(
          Q instanceof Error ? Q : new Error("Unknown error")
        ));
      } finally {
        c(!1), D(""), R(!1), P(""), q.current = null, H.current = null;
      }
    },
    [
      s,
      O,
      i,
      u,
      T,
      v,
      V,
      t,
      n,
      e,
      j,
      le
    ]
  ), f = fe(
    async (S) => {
      var Se;
      const _ = (Se = S.body) == null ? void 0 : Se.getReader(), ne = new TextDecoder();
      if (!_)
        throw new Error("No response body reader available");
      let te = "";
      for (; ; ) {
        const { done: Q, value: ke } = await _.read();
        if (Q) {
          console.log("Stream completed");
          break;
        }
        te += ne.decode(ke, { stream: !0 });
        const me = te.split(/\r?\n/);
        te = me.pop() || "";
        for (const ve of me)
          if (ve.startsWith("data: ")) {
            const K = ve.slice(6).trim();
            if (K === "[DONE]" || K === "")
              continue;
            try {
              const De = JSON.parse(K);
              le(De);
            } catch (De) {
              console.error("Failed to parse event:", De);
            }
          }
      }
    },
    [le]
  ), ce = fe(() => {
    q.current && (q.current.abort(), c(!1), D(""), R(!1), P(""));
  }, []), xe = fe(() => {
    l(r), h(null), k([]), w([]), I([]), Y([]), D(""), R(!1), P(""), console.log("Chat cleared");
  }, [r]), d = fe(() => {
    p(!0);
  }, []), re = fe(() => {
    p(!1);
  }, []);
  rn(() => {
    const S = (_) => {
      _.key === "Escape" && n.mode === "modal" && m && re();
    };
    if (n.mode === "modal" && m)
      return document.addEventListener("keydown", S), () => document.removeEventListener("keydown", S);
  }, [n.mode, m, re]);
  const ee = ((...S) => S.filter(Boolean).join(" "))(
    "chat-wrapper",
    `chat-wrapper--${n.mode}`,
    n.position && `chat-wrapper--${n.position}`,
    n.theme && `chat-wrapper--${n.theme}`
  ), Oe = () => n.mode === "modal" && m ? /* @__PURE__ */ E(
    "div",
    {
      className: "chat-wrapper-overlay",
      onClick: re
    }
  ) : null, be = () => {
    var S;
    return n.mode === "modal" && !m ? /* @__PURE__ */ J(
      "button",
      {
        className: "chat-wrapper__bubble-button",
        onClick: d,
        title: `Open ${n.appName}`,
        children: [
          /* @__PURE__ */ J(
            "svg",
            {
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: "chat-wrapper__bubble-icon",
              children: [
                /* @__PURE__ */ E(
                  "path",
                  {
                    d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
                    fill: "currentColor"
                  }
                ),
                /* @__PURE__ */ E("circle", { cx: "7", cy: "10", r: "1", fill: "currentColor" }),
                /* @__PURE__ */ E("circle", { cx: "12", cy: "10", r: "1", fill: "currentColor" }),
                /* @__PURE__ */ E("circle", { cx: "17", cy: "10", r: "1", fill: "currentColor" })
              ]
            }
          ),
          ((S = n.features) == null ? void 0 : S.showBubbleText) !== !1 && /* @__PURE__ */ E("span", { className: "chat-wrapper__bubble-text", children: n.bubbleText || "Chat" })
        ]
      }
    ) : null;
  }, Ne = () => n.mode === "modal" && m ? /* @__PURE__ */ E(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: re,
      title: "Close chat",
      children: /* @__PURE__ */ E(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ E(
            "path",
            {
              d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
              fill: "currentColor"
            }
          )
        }
      )
    }
  ) : null, Ae = () => !X || !B ? null : /* @__PURE__ */ E("div", { className: "chat-wrapper__thinking", children: /* @__PURE__ */ J("div", { className: "chat-wrapper__thinking-content", children: [
    /* @__PURE__ */ E("span", { className: "chat-wrapper__thinking-spinner" }),
    /* @__PURE__ */ E("span", { children: B })
  ] }) }), Be = () => {
    var S;
    return !((S = n.features) != null && S.showToolResults) || y.length === 0 ? null : /* @__PURE__ */ J("div", { className: "chat-wrapper__tool-results", children: [
      /* @__PURE__ */ E("h4", { children: "Tool Results" }),
      /* @__PURE__ */ E("div", { className: "chat-wrapper__tool-results-list", children: y.map((_) => /* @__PURE__ */ J("div", { className: "chat-wrapper__tool-result", children: [
        /* @__PURE__ */ E("div", { className: "chat-wrapper__tool-result-title", children: _.title }),
        _.description && /* @__PURE__ */ E("div", { className: "chat-wrapper__tool-result-description", children: _.description }),
        /* @__PURE__ */ J("div", { className: "chat-wrapper__tool-result-meta", children: [
          "Status: ",
          _.status || "completed"
        ] })
      ] }, _.id)) })
    ] });
  };
  return n.mode === "modal" && !m ? be() : /* @__PURE__ */ J(Wt, { children: [
    Oe(),
    /* @__PURE__ */ J("div", { className: ee, style: n.customStyles, children: [
      /* @__PURE__ */ J("div", { className: "chat-wrapper__header", children: [
        /* @__PURE__ */ E("h2", { className: "chat-wrapper__title", children: n.appName }),
        Ne(),
        x && /* @__PURE__ */ E("div", { className: "chat-wrapper__status", children: x })
      ] }),
      Ae(),
      /* @__PURE__ */ J("div", { className: "chat-wrapper__messages", children: [
        i.map((S) => /* @__PURE__ */ J(
          "div",
          {
            className: `chat-wrapper__message chat-wrapper__message--${S.role}`,
            children: [
              /* @__PURE__ */ E("div", { className: "chat-wrapper__message-content", children: S.role === "assistant" && S.isStreaming && X ? /* @__PURE__ */ J("div", { className: "chat-wrapper__message-with-reasoning", children: [
                /* @__PURE__ */ J(Ss, { isStreaming: X, children: [
                  /* @__PURE__ */ E(Cs, { title: "Planning Brief" }),
                  /* @__PURE__ */ E(Es, { children: B })
                ] }),
                S.content && /* @__PURE__ */ E("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ E(
                  $t,
                  {
                    components: {
                      pre: ({ children: _ }) => /* @__PURE__ */ E("pre", { className: "chat-wrapper__code-block", children: _ }),
                      code: ({ children: _, className: ne }) => !ne ? /* @__PURE__ */ E("code", { className: "chat-wrapper__inline-code", children: _ }) : /* @__PURE__ */ E("code", { className: "chat-wrapper__code", children: _ }),
                      p: ({ children: _ }) => /* @__PURE__ */ E("p", { className: "chat-wrapper__paragraph", children: _ }),
                      h1: ({ children: _ }) => /* @__PURE__ */ E("h1", { className: "chat-wrapper__heading-1", children: _ }),
                      h2: ({ children: _ }) => /* @__PURE__ */ E("h2", { className: "chat-wrapper__heading-2", children: _ }),
                      h3: ({ children: _ }) => /* @__PURE__ */ E("h3", { className: "chat-wrapper__heading-3", children: _ }),
                      ul: ({ children: _ }) => /* @__PURE__ */ E("ul", { className: "chat-wrapper__list", children: _ }),
                      ol: ({ children: _ }) => /* @__PURE__ */ E("ol", { className: "chat-wrapper__ordered-list", children: _ }),
                      li: ({ children: _ }) => /* @__PURE__ */ E("li", { className: "chat-wrapper__list-item", children: _ }),
                      blockquote: ({ children: _ }) => /* @__PURE__ */ E("blockquote", { className: "chat-wrapper__blockquote", children: _ }),
                      strong: ({ children: _ }) => /* @__PURE__ */ E("strong", { className: "chat-wrapper__bold", children: _ }),
                      em: ({ children: _ }) => /* @__PURE__ */ E("em", { className: "chat-wrapper__italic", children: _ })
                    },
                    children: S.content.trim()
                  }
                ) })
              ] }) : S.isStreaming && S.content === "" && !X ? (
                /* Show streaming indicator when no reasoning */
                /* @__PURE__ */ J("div", { className: "chat-wrapper__streaming-placeholder", children: [
                  /* @__PURE__ */ E(_s, { size: 16, variant: "dots" }),
                  /* @__PURE__ */ E("span", { children: "Creating your brief..." }),
                  x && /* @__PURE__ */ J("span", { className: "chat-wrapper__streaming-status", children: [
                    "(",
                    x,
                    ")"
                  ] })
                ] })
              ) : (
                /* Regular message display with markdown */
                /* @__PURE__ */ J("div", { className: "chat-wrapper__regular-message", children: [
                  S.role === "user" && S.media && S.media.length > 0 && /* @__PURE__ */ E("div", { className: "chat-wrapper__media-grid", children: S.media.map((_, ne) => /* @__PURE__ */ E("div", { className: "chat-wrapper__media-item", children: /* @__PURE__ */ E(
                    "img",
                    {
                      src: _,
                      alt: `Attached image ${ne + 1}`,
                      className: "chat-wrapper__media-image"
                    }
                  ) }, ne)) }),
                  /* @__PURE__ */ J("div", { className: "chat-wrapper__markdown-content", children: [
                    /* @__PURE__ */ E(
                      $t,
                      {
                        components: {
                          pre: ({ children: _ }) => /* @__PURE__ */ E("pre", { className: "chat-wrapper__code-block", children: _ }),
                          code: ({ children: _, className: ne }) => !ne ? /* @__PURE__ */ E("code", { className: "chat-wrapper__inline-code", children: _ }) : /* @__PURE__ */ E("code", { className: "chat-wrapper__code", children: _ }),
                          p: ({ children: _ }) => /* @__PURE__ */ E("p", { className: "chat-wrapper__paragraph", children: _ }),
                          h1: ({ children: _ }) => /* @__PURE__ */ E("h1", { className: "chat-wrapper__heading-1", children: _ }),
                          h2: ({ children: _ }) => /* @__PURE__ */ E("h2", { className: "chat-wrapper__heading-2", children: _ }),
                          h3: ({ children: _ }) => /* @__PURE__ */ E("h3", { className: "chat-wrapper__heading-3", children: _ }),
                          ul: ({ children: _ }) => /* @__PURE__ */ E("ul", { className: "chat-wrapper__list", children: _ }),
                          ol: ({ children: _ }) => /* @__PURE__ */ E("ol", { className: "chat-wrapper__ordered-list", children: _ }),
                          li: ({ children: _ }) => /* @__PURE__ */ E("li", { className: "chat-wrapper__list-item", children: _ }),
                          blockquote: ({ children: _ }) => /* @__PURE__ */ E("blockquote", { className: "chat-wrapper__blockquote", children: _ }),
                          strong: ({ children: _ }) => /* @__PURE__ */ E("strong", { className: "chat-wrapper__bold", children: _ }),
                          em: ({ children: _ }) => /* @__PURE__ */ E("em", { className: "chat-wrapper__italic", children: _ })
                        },
                        children: S.content.trim()
                      }
                    ),
                    S.isStreaming && /* @__PURE__ */ E("span", { className: "chat-wrapper__streaming-indicator", children: "..." })
                  ] })
                ] })
              ) }),
              /* @__PURE__ */ E("div", { className: "chat-wrapper__message-timestamp", children: S.timestamp.toLocaleTimeString() })
            ]
          },
          S.id
        )),
        /* @__PURE__ */ E("div", { ref: N })
      ] }),
      Be(),
      /* @__PURE__ */ E(
        bs,
        {
          onSend: ye,
          disabled: s,
          placeholder: n.placeholder || "Type a message...",
          value: o,
          onChange: a,
          onStop: ce,
          onClear: xe,
          showStopButton: s,
          showClearButton: i.length > 0
        }
      ),
      n.onError && /* @__PURE__ */ E("div", { className: "chat-wrapper__error-boundary" })
    ] })
  ] });
}
class Is {
  constructor(n, t) {
    yn(this, "baseUrl");
    yn(this, "apiKey");
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
function vs(e, n) {
  const [t, r] = oe([]), [i, l] = oe(!1), [o, a] = oe(null), s = Qe(null), c = Qe(new Is(e, n)), u = fe(async () => {
    try {
      const p = await c.current.initConversation();
      return s.current = p, p;
    } catch (p) {
      throw a(p), p;
    }
  }, []), h = fe(
    async (p) => {
      s.current || await u();
      const y = {
        id: Date.now().toString(),
        role: "user",
        content: p,
        timestamp: /* @__PURE__ */ new Date()
      };
      r((T) => [...T, y]), l(!0), a(null);
      const k = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: !0
      };
      r((T) => [...T, k]);
      try {
        const T = c.current.streamMessage(
          s.current,
          p
        );
        for await (const w of T)
          r(
            (v) => v.map(
              (I) => I.id === k.id ? { ...I, content: I.content + w } : I
            )
          );
        r(
          (w) => w.map(
            (v) => v.id === k.id ? { ...v, isStreaming: !1 } : v
          )
        );
      } catch (T) {
        a(T), r((w) => w.filter((v) => v.id !== k.id));
      } finally {
        l(!1);
      }
    },
    [u]
  ), m = fe(() => {
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
  As as ChatWrapper,
  _s as Loader,
  Ss as Reasoning,
  Es as ReasoningContent,
  Cs as ReasoningTrigger,
  vs as useChatConnection
};
