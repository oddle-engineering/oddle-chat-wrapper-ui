var Fo = Object.defineProperty;
var Ho = (t, e, n) => e in t ? Fo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var q = (t, e, n) => Ho(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as p, Fragment as Xt, jsxs as P } from "react/jsx-runtime";
import _t, { useState as ke, useRef as oe, useEffect as Ne, useMemo as Ue, useCallback as ne, createContext as yi, useContext as Ci, Component as wi, memo as gr, forwardRef as jn, useImperativeHandle as hs } from "react";
import { createPortal as zo } from "react-dom";
const Me = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, gt = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, tt = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, Kr = (t) => t === Me.SUBMITTED || t === Me.STREAMING, wg = (t) => t === Me.IDLE, Sg = (t) => t === Me.ERROR, xg = (t) => t === tt.PROCESSING, kg = (t) => t === tt.COMPLETED, bg = (t) => t === tt.ERROR;
var Uo = /* @__PURE__ */ ((t) => (t.BRAND = "BRAND", t.ACCOUNT = "ACCOUNT", t.USER = "USER", t))(Uo || {}), Ge = /* @__PURE__ */ ((t) => (t.DISCONNECTED = "disconnected", t.CONNECTING = "connecting", t.CONNECTED = "connected", t.RECONNECTING = "reconnecting", t))(Ge || {});
const Bo = Symbol("Let zodToJsonSchema decide on which parser to use"), Ui = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  allowedAdditionalProperties: !0,
  rejectedAdditionalProperties: !1,
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: !1,
  definitions: {},
  errorMessages: !1,
  markdownDescription: !1,
  patternStrategy: "escape",
  applyRegexFlags: !1,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref",
  openAiAnyTypeName: "OpenAiAnyType"
}, $o = (t) => typeof t == "string" ? {
  ...Ui,
  name: t
} : {
  ...Ui,
  ...t
}, jo = (t) => {
  const e = $o(t), n = e.name !== void 0 ? [...e.basePath, e.definitionPath, e.name] : e.basePath;
  return {
    ...e,
    flags: { hasReferencedOpenAiAnyType: !1 },
    currentPath: n,
    propertyPath: void 0,
    seen: new Map(Object.entries(e.definitions).map(([r, i]) => [
      i._def,
      {
        def: i._def,
        path: [...e.basePath, e.definitionPath, r],
        // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
        jsonSchema: void 0
      }
    ]))
  };
};
function ps(t, e, n, r) {
  r != null && r.errorMessages && n && (t.errorMessage = {
    ...t.errorMessage,
    [e]: n
  });
}
function Re(t, e, n, r, i) {
  t[e] = n, ps(t, e, r, i);
}
const fs = (t, e) => {
  let n = 0;
  for (; n < t.length && n < e.length && t[n] === e[n]; n++)
    ;
  return [(t.length - n).toString(), ...e.slice(n)].join("/");
};
var he;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(he || (he = {}));
function dt(t) {
  if (t.target !== "openAi")
    return {};
  const e = [
    ...t.basePath,
    t.definitionPath,
    t.openAiAnyTypeName
  ];
  return t.flags.hasReferencedOpenAiAnyType = !0, {
    $ref: t.$refStrategy === "relative" ? fs(e, t.currentPath) : e.join("/")
  };
}
function Vo(t, e) {
  var r, i, a;
  const n = {
    type: "array"
  };
  return (r = t.type) != null && r._def && ((a = (i = t.type) == null ? void 0 : i._def) == null ? void 0 : a.typeName) !== he.ZodAny && (n.items = be(t.type._def, {
    ...e,
    currentPath: [...e.currentPath, "items"]
  })), t.minLength && Re(n, "minItems", t.minLength.value, t.minLength.message, e), t.maxLength && Re(n, "maxItems", t.maxLength.value, t.maxLength.message, e), t.exactLength && (Re(n, "minItems", t.exactLength.value, t.exactLength.message, e), Re(n, "maxItems", t.exactLength.value, t.exactLength.message, e)), n;
}
function Wo(t, e) {
  const n = {
    type: "integer",
    format: "int64"
  };
  if (!t.checks)
    return n;
  for (const r of t.checks)
    switch (r.kind) {
      case "min":
        e.target === "jsonSchema7" ? r.inclusive ? Re(n, "minimum", r.value, r.message, e) : Re(n, "exclusiveMinimum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMinimum = !0), Re(n, "minimum", r.value, r.message, e));
        break;
      case "max":
        e.target === "jsonSchema7" ? r.inclusive ? Re(n, "maximum", r.value, r.message, e) : Re(n, "exclusiveMaximum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMaximum = !0), Re(n, "maximum", r.value, r.message, e));
        break;
      case "multipleOf":
        Re(n, "multipleOf", r.value, r.message, e);
        break;
    }
  return n;
}
function Go() {
  return {
    type: "boolean"
  };
}
function gs(t, e) {
  return be(t.type._def, e);
}
const Zo = (t, e) => be(t.innerType._def, e);
function ms(t, e, n) {
  const r = n ?? e.dateStrategy;
  if (Array.isArray(r))
    return {
      anyOf: r.map((i, a) => ms(t, e, i))
    };
  switch (r) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return qo(t, e);
  }
}
const qo = (t, e) => {
  const n = {
    type: "integer",
    format: "unix-time"
  };
  if (e.target === "openApi3")
    return n;
  for (const r of t.checks)
    switch (r.kind) {
      case "min":
        Re(
          n,
          "minimum",
          r.value,
          // This is in milliseconds
          r.message,
          e
        );
        break;
      case "max":
        Re(
          n,
          "maximum",
          r.value,
          // This is in milliseconds
          r.message,
          e
        );
        break;
    }
  return n;
};
function Ko(t, e) {
  return {
    ...be(t.innerType._def, e),
    default: t.defaultValue()
  };
}
function Xo(t, e) {
  return e.effectStrategy === "input" ? be(t.schema._def, e) : dt(e);
}
function Yo(t) {
  return {
    type: "string",
    enum: Array.from(t.values)
  };
}
const Jo = (t) => "type" in t && t.type === "string" ? !1 : "allOf" in t;
function Qo(t, e) {
  const n = [
    be(t.left._def, {
      ...e,
      currentPath: [...e.currentPath, "allOf", "0"]
    }),
    be(t.right._def, {
      ...e,
      currentPath: [...e.currentPath, "allOf", "1"]
    })
  ].filter((a) => !!a);
  let r = e.target === "jsonSchema2019-09" ? { unevaluatedProperties: !1 } : void 0;
  const i = [];
  return n.forEach((a) => {
    if (Jo(a))
      i.push(...a.allOf), a.unevaluatedProperties === void 0 && (r = void 0);
    else {
      let s = a;
      if ("additionalProperties" in a && a.additionalProperties === !1) {
        const { additionalProperties: o, ...l } = a;
        s = l;
      } else
        r = void 0;
      i.push(s);
    }
  }), i.length ? {
    allOf: i,
    ...r
  } : void 0;
}
function el(t, e) {
  const n = typeof t.value;
  return n !== "bigint" && n !== "number" && n !== "boolean" && n !== "string" ? {
    type: Array.isArray(t.value) ? "array" : "object"
  } : e.target === "openApi3" ? {
    type: n === "bigint" ? "integer" : n,
    enum: [t.value]
  } : {
    type: n === "bigint" ? "integer" : n,
    const: t.value
  };
}
let Tr;
const bt = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * `a-z` was added to replicate /i flag
   */
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   *
   * Lazily instantiate since this type of regex isn't supported
   * in all envs (e.g. React Native).
   *
   * See:
   * https://github.com/colinhacks/zod/issues/2433
   * Fix in Zod:
   * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
   */
  emoji: () => (Tr === void 0 && (Tr = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), Tr),
  /**
   * Unused
   */
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  /**
   * Unused
   */
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
  jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function ys(t, e) {
  const n = {
    type: "string"
  };
  if (t.checks)
    for (const r of t.checks)
      switch (r.kind) {
        case "min":
          Re(n, "minLength", typeof n.minLength == "number" ? Math.max(n.minLength, r.value) : r.value, r.message, e);
          break;
        case "max":
          Re(n, "maxLength", typeof n.maxLength == "number" ? Math.min(n.maxLength, r.value) : r.value, r.message, e);
          break;
        case "email":
          switch (e.emailStrategy) {
            case "format:email":
              Tt(n, "email", r.message, e);
              break;
            case "format:idn-email":
              Tt(n, "idn-email", r.message, e);
              break;
            case "pattern:zod":
              rt(n, bt.email, r.message, e);
              break;
          }
          break;
        case "url":
          Tt(n, "uri", r.message, e);
          break;
        case "uuid":
          Tt(n, "uuid", r.message, e);
          break;
        case "regex":
          rt(n, r.regex, r.message, e);
          break;
        case "cuid":
          rt(n, bt.cuid, r.message, e);
          break;
        case "cuid2":
          rt(n, bt.cuid2, r.message, e);
          break;
        case "startsWith":
          rt(n, RegExp(`^${Er(r.value, e)}`), r.message, e);
          break;
        case "endsWith":
          rt(n, RegExp(`${Er(r.value, e)}$`), r.message, e);
          break;
        case "datetime":
          Tt(n, "date-time", r.message, e);
          break;
        case "date":
          Tt(n, "date", r.message, e);
          break;
        case "time":
          Tt(n, "time", r.message, e);
          break;
        case "duration":
          Tt(n, "duration", r.message, e);
          break;
        case "length":
          Re(n, "minLength", typeof n.minLength == "number" ? Math.max(n.minLength, r.value) : r.value, r.message, e), Re(n, "maxLength", typeof n.maxLength == "number" ? Math.min(n.maxLength, r.value) : r.value, r.message, e);
          break;
        case "includes": {
          rt(n, RegExp(Er(r.value, e)), r.message, e);
          break;
        }
        case "ip": {
          r.version !== "v6" && Tt(n, "ipv4", r.message, e), r.version !== "v4" && Tt(n, "ipv6", r.message, e);
          break;
        }
        case "base64url":
          rt(n, bt.base64url, r.message, e);
          break;
        case "jwt":
          rt(n, bt.jwt, r.message, e);
          break;
        case "cidr": {
          r.version !== "v6" && rt(n, bt.ipv4Cidr, r.message, e), r.version !== "v4" && rt(n, bt.ipv6Cidr, r.message, e);
          break;
        }
        case "emoji":
          rt(n, bt.emoji(), r.message, e);
          break;
        case "ulid": {
          rt(n, bt.ulid, r.message, e);
          break;
        }
        case "base64": {
          switch (e.base64Strategy) {
            case "format:binary": {
              Tt(n, "binary", r.message, e);
              break;
            }
            case "contentEncoding:base64": {
              Re(n, "contentEncoding", "base64", r.message, e);
              break;
            }
            case "pattern:zod": {
              rt(n, bt.base64, r.message, e);
              break;
            }
          }
          break;
        }
        case "nanoid":
          rt(n, bt.nanoid, r.message, e);
      }
  return n;
}
function Er(t, e) {
  return e.patternStrategy === "escape" ? nl(t) : t;
}
const tl = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function nl(t) {
  let e = "";
  for (let n = 0; n < t.length; n++)
    tl.has(t[n]) || (e += "\\"), e += t[n];
  return e;
}
function Tt(t, e, n, r) {
  var i;
  t.format || (i = t.anyOf) != null && i.some((a) => a.format) ? (t.anyOf || (t.anyOf = []), t.format && (t.anyOf.push({
    format: t.format,
    ...t.errorMessage && r.errorMessages && {
      errorMessage: { format: t.errorMessage.format }
    }
  }), delete t.format, t.errorMessage && (delete t.errorMessage.format, Object.keys(t.errorMessage).length === 0 && delete t.errorMessage)), t.anyOf.push({
    format: e,
    ...n && r.errorMessages && { errorMessage: { format: n } }
  })) : Re(t, "format", e, n, r);
}
function rt(t, e, n, r) {
  var i;
  t.pattern || (i = t.allOf) != null && i.some((a) => a.pattern) ? (t.allOf || (t.allOf = []), t.pattern && (t.allOf.push({
    pattern: t.pattern,
    ...t.errorMessage && r.errorMessages && {
      errorMessage: { pattern: t.errorMessage.pattern }
    }
  }), delete t.pattern, t.errorMessage && (delete t.errorMessage.pattern, Object.keys(t.errorMessage).length === 0 && delete t.errorMessage)), t.allOf.push({
    pattern: Bi(e, r),
    ...n && r.errorMessages && { errorMessage: { pattern: n } }
  })) : Re(t, "pattern", Bi(e, r), n, r);
}
function Bi(t, e) {
  var l;
  if (!e.applyRegexFlags || !t.flags)
    return t.source;
  const n = {
    i: t.flags.includes("i"),
    m: t.flags.includes("m"),
    s: t.flags.includes("s")
    // `.` matches newlines
  }, r = n.i ? t.source.toLowerCase() : t.source;
  let i = "", a = !1, s = !1, o = !1;
  for (let u = 0; u < r.length; u++) {
    if (a) {
      i += r[u], a = !1;
      continue;
    }
    if (n.i) {
      if (s) {
        if (r[u].match(/[a-z]/)) {
          o ? (i += r[u], i += `${r[u - 2]}-${r[u]}`.toUpperCase(), o = !1) : r[u + 1] === "-" && ((l = r[u + 2]) != null && l.match(/[a-z]/)) ? (i += r[u], o = !0) : i += `${r[u]}${r[u].toUpperCase()}`;
          continue;
        }
      } else if (r[u].match(/[a-z]/)) {
        i += `[${r[u]}${r[u].toUpperCase()}]`;
        continue;
      }
    }
    if (n.m) {
      if (r[u] === "^") {
        i += `(^|(?<=[\r
]))`;
        continue;
      } else if (r[u] === "$") {
        i += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (n.s && r[u] === ".") {
      i += s ? `${r[u]}\r
` : `[${r[u]}\r
]`;
      continue;
    }
    i += r[u], r[u] === "\\" ? a = !0 : s && r[u] === "]" ? s = !1 : !s && r[u] === "[" && (s = !0);
  }
  try {
    new RegExp(i);
  } catch {
    return console.warn(`Could not convert regex pattern at ${e.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`), t.source;
  }
  return i;
}
function Cs(t, e) {
  var r, i, a, s, o, l;
  if (e.target === "openAi" && console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead."), e.target === "openApi3" && ((r = t.keyType) == null ? void 0 : r._def.typeName) === he.ZodEnum)
    return {
      type: "object",
      required: t.keyType._def.values,
      properties: t.keyType._def.values.reduce((u, c) => ({
        ...u,
        [c]: be(t.valueType._def, {
          ...e,
          currentPath: [...e.currentPath, "properties", c]
        }) ?? dt(e)
      }), {}),
      additionalProperties: e.rejectedAdditionalProperties
    };
  const n = {
    type: "object",
    additionalProperties: be(t.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalProperties"]
    }) ?? e.allowedAdditionalProperties
  };
  if (e.target === "openApi3")
    return n;
  if (((i = t.keyType) == null ? void 0 : i._def.typeName) === he.ZodString && ((a = t.keyType._def.checks) != null && a.length)) {
    const { type: u, ...c } = ys(t.keyType._def, e);
    return {
      ...n,
      propertyNames: c
    };
  } else {
    if (((s = t.keyType) == null ? void 0 : s._def.typeName) === he.ZodEnum)
      return {
        ...n,
        propertyNames: {
          enum: t.keyType._def.values
        }
      };
    if (((o = t.keyType) == null ? void 0 : o._def.typeName) === he.ZodBranded && t.keyType._def.type._def.typeName === he.ZodString && ((l = t.keyType._def.type._def.checks) != null && l.length)) {
      const { type: u, ...c } = gs(t.keyType._def, e);
      return {
        ...n,
        propertyNames: c
      };
    }
  }
  return n;
}
function rl(t, e) {
  if (e.mapStrategy === "record")
    return Cs(t, e);
  const n = be(t.keyType._def, {
    ...e,
    currentPath: [...e.currentPath, "items", "items", "0"]
  }) || dt(e), r = be(t.valueType._def, {
    ...e,
    currentPath: [...e.currentPath, "items", "items", "1"]
  }) || dt(e);
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [n, r],
      minItems: 2,
      maxItems: 2
    }
  };
}
function il(t) {
  const e = t.values, r = Object.keys(t.values).filter((a) => typeof e[e[a]] != "number").map((a) => e[a]), i = Array.from(new Set(r.map((a) => typeof a)));
  return {
    type: i.length === 1 ? i[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: r
  };
}
function al(t) {
  return t.target === "openAi" ? void 0 : {
    not: dt({
      ...t,
      currentPath: [...t.currentPath, "not"]
    })
  };
}
function sl(t) {
  return t.target === "openApi3" ? {
    enum: ["null"],
    nullable: !0
  } : {
    type: "null"
  };
}
const or = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function ol(t, e) {
  if (e.target === "openApi3")
    return $i(t, e);
  const n = t.options instanceof Map ? Array.from(t.options.values()) : t.options;
  if (n.every((r) => r._def.typeName in or && (!r._def.checks || !r._def.checks.length))) {
    const r = n.reduce((i, a) => {
      const s = or[a._def.typeName];
      return s && !i.includes(s) ? [...i, s] : i;
    }, []);
    return {
      type: r.length > 1 ? r : r[0]
    };
  } else if (n.every((r) => r._def.typeName === "ZodLiteral" && !r.description)) {
    const r = n.reduce((i, a) => {
      const s = typeof a._def.value;
      switch (s) {
        case "string":
        case "number":
        case "boolean":
          return [...i, s];
        case "bigint":
          return [...i, "integer"];
        case "object":
          if (a._def.value === null)
            return [...i, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return i;
      }
    }, []);
    if (r.length === n.length) {
      const i = r.filter((a, s, o) => o.indexOf(a) === s);
      return {
        type: i.length > 1 ? i : i[0],
        enum: n.reduce((a, s) => a.includes(s._def.value) ? a : [...a, s._def.value], [])
      };
    }
  } else if (n.every((r) => r._def.typeName === "ZodEnum"))
    return {
      type: "string",
      enum: n.reduce((r, i) => [
        ...r,
        ...i._def.values.filter((a) => !r.includes(a))
      ], [])
    };
  return $i(t, e);
}
const $i = (t, e) => {
  const n = (t.options instanceof Map ? Array.from(t.options.values()) : t.options).map((r, i) => be(r._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", `${i}`]
  })).filter((r) => !!r && (!e.strictUnions || typeof r == "object" && Object.keys(r).length > 0));
  return n.length ? { anyOf: n } : void 0;
};
function ll(t, e) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(t.innerType._def.typeName) && (!t.innerType._def.checks || !t.innerType._def.checks.length))
    return e.target === "openApi3" ? {
      type: or[t.innerType._def.typeName],
      nullable: !0
    } : {
      type: [
        or[t.innerType._def.typeName],
        "null"
      ]
    };
  if (e.target === "openApi3") {
    const r = be(t.innerType._def, {
      ...e,
      currentPath: [...e.currentPath]
    });
    return r && "$ref" in r ? { allOf: [r], nullable: !0 } : r && { ...r, nullable: !0 };
  }
  const n = be(t.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", "0"]
  });
  return n && { anyOf: [n, { type: "null" }] };
}
function cl(t, e) {
  const n = {
    type: "number"
  };
  if (!t.checks)
    return n;
  for (const r of t.checks)
    switch (r.kind) {
      case "int":
        n.type = "integer", ps(n, "type", r.message, e);
        break;
      case "min":
        e.target === "jsonSchema7" ? r.inclusive ? Re(n, "minimum", r.value, r.message, e) : Re(n, "exclusiveMinimum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMinimum = !0), Re(n, "minimum", r.value, r.message, e));
        break;
      case "max":
        e.target === "jsonSchema7" ? r.inclusive ? Re(n, "maximum", r.value, r.message, e) : Re(n, "exclusiveMaximum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMaximum = !0), Re(n, "maximum", r.value, r.message, e));
        break;
      case "multipleOf":
        Re(n, "multipleOf", r.value, r.message, e);
        break;
    }
  return n;
}
function ul(t, e) {
  const n = e.target === "openAi", r = {
    type: "object",
    properties: {}
  }, i = [], a = t.shape();
  for (const o in a) {
    let l = a[o];
    if (l === void 0 || l._def === void 0)
      continue;
    let u = hl(l);
    u && n && (l._def.typeName === "ZodOptional" && (l = l._def.innerType), l.isNullable() || (l = l.nullable()), u = !1);
    const c = be(l._def, {
      ...e,
      currentPath: [...e.currentPath, "properties", o],
      propertyPath: [...e.currentPath, "properties", o]
    });
    c !== void 0 && (r.properties[o] = c, u || i.push(o));
  }
  i.length && (r.required = i);
  const s = dl(t, e);
  return s !== void 0 && (r.additionalProperties = s), r;
}
function dl(t, e) {
  if (t.catchall._def.typeName !== "ZodNever")
    return be(t.catchall._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalProperties"]
    });
  switch (t.unknownKeys) {
    case "passthrough":
      return e.allowedAdditionalProperties;
    case "strict":
      return e.rejectedAdditionalProperties;
    case "strip":
      return e.removeAdditionalStrategy === "strict" ? e.allowedAdditionalProperties : e.rejectedAdditionalProperties;
  }
}
function hl(t) {
  try {
    return t.isOptional();
  } catch {
    return !0;
  }
}
const pl = (t, e) => {
  var r;
  if (e.currentPath.toString() === ((r = e.propertyPath) == null ? void 0 : r.toString()))
    return be(t.innerType._def, e);
  const n = be(t.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", "1"]
  });
  return n ? {
    anyOf: [
      {
        not: dt(e)
      },
      n
    ]
  } : dt(e);
}, fl = (t, e) => {
  if (e.pipeStrategy === "input")
    return be(t.in._def, e);
  if (e.pipeStrategy === "output")
    return be(t.out._def, e);
  const n = be(t.in._def, {
    ...e,
    currentPath: [...e.currentPath, "allOf", "0"]
  }), r = be(t.out._def, {
    ...e,
    currentPath: [...e.currentPath, "allOf", n ? "1" : "0"]
  });
  return {
    allOf: [n, r].filter((i) => i !== void 0)
  };
};
function gl(t, e) {
  return be(t.type._def, e);
}
function ml(t, e) {
  const r = {
    type: "array",
    uniqueItems: !0,
    items: be(t.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, "items"]
    })
  };
  return t.minSize && Re(r, "minItems", t.minSize.value, t.minSize.message, e), t.maxSize && Re(r, "maxItems", t.maxSize.value, t.maxSize.message, e), r;
}
function yl(t, e) {
  return t.rest ? {
    type: "array",
    minItems: t.items.length,
    items: t.items.map((n, r) => be(n._def, {
      ...e,
      currentPath: [...e.currentPath, "items", `${r}`]
    })).reduce((n, r) => r === void 0 ? n : [...n, r], []),
    additionalItems: be(t.rest._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalItems"]
    })
  } : {
    type: "array",
    minItems: t.items.length,
    maxItems: t.items.length,
    items: t.items.map((n, r) => be(n._def, {
      ...e,
      currentPath: [...e.currentPath, "items", `${r}`]
    })).reduce((n, r) => r === void 0 ? n : [...n, r], [])
  };
}
function Cl(t) {
  return {
    not: dt(t)
  };
}
function wl(t) {
  return dt(t);
}
const Sl = (t, e) => be(t.innerType._def, e), xl = (t, e, n) => {
  switch (e) {
    case he.ZodString:
      return ys(t, n);
    case he.ZodNumber:
      return cl(t, n);
    case he.ZodObject:
      return ul(t, n);
    case he.ZodBigInt:
      return Wo(t, n);
    case he.ZodBoolean:
      return Go();
    case he.ZodDate:
      return ms(t, n);
    case he.ZodUndefined:
      return Cl(n);
    case he.ZodNull:
      return sl(n);
    case he.ZodArray:
      return Vo(t, n);
    case he.ZodUnion:
    case he.ZodDiscriminatedUnion:
      return ol(t, n);
    case he.ZodIntersection:
      return Qo(t, n);
    case he.ZodTuple:
      return yl(t, n);
    case he.ZodRecord:
      return Cs(t, n);
    case he.ZodLiteral:
      return el(t, n);
    case he.ZodEnum:
      return Yo(t);
    case he.ZodNativeEnum:
      return il(t);
    case he.ZodNullable:
      return ll(t, n);
    case he.ZodOptional:
      return pl(t, n);
    case he.ZodMap:
      return rl(t, n);
    case he.ZodSet:
      return ml(t, n);
    case he.ZodLazy:
      return () => t.getter()._def;
    case he.ZodPromise:
      return gl(t, n);
    case he.ZodNaN:
    case he.ZodNever:
      return al(n);
    case he.ZodEffects:
      return Xo(t, n);
    case he.ZodAny:
      return dt(n);
    case he.ZodUnknown:
      return wl(n);
    case he.ZodDefault:
      return Ko(t, n);
    case he.ZodBranded:
      return gs(t, n);
    case he.ZodReadonly:
      return Sl(t, n);
    case he.ZodCatch:
      return Zo(t, n);
    case he.ZodPipeline:
      return fl(t, n);
    case he.ZodFunction:
    case he.ZodVoid:
    case he.ZodSymbol:
      return;
    default:
      return /* @__PURE__ */ ((r) => {
      })();
  }
};
function be(t, e, n = !1) {
  var o;
  const r = e.seen.get(t);
  if (e.override) {
    const l = (o = e.override) == null ? void 0 : o.call(e, t, e, r, n);
    if (l !== Bo)
      return l;
  }
  if (r && !n) {
    const l = kl(r, e);
    if (l !== void 0)
      return l;
  }
  const i = { def: t, path: e.currentPath, jsonSchema: void 0 };
  e.seen.set(t, i);
  const a = xl(t, t.typeName, e), s = typeof a == "function" ? be(a(), e) : a;
  if (s && bl(t, e, s), e.postProcess) {
    const l = e.postProcess(s, t, e);
    return i.jsonSchema = s, l;
  }
  return i.jsonSchema = s, s;
}
const kl = (t, e) => {
  switch (e.$refStrategy) {
    case "root":
      return { $ref: t.path.join("/") };
    case "relative":
      return { $ref: fs(e.currentPath, t.path) };
    case "none":
    case "seen":
      return t.path.length < e.currentPath.length && t.path.every((n, r) => e.currentPath[r] === n) ? (console.warn(`Recursive reference detected at ${e.currentPath.join("/")}! Defaulting to any`), dt(e)) : e.$refStrategy === "seen" ? dt(e) : void 0;
  }
}, bl = (t, e, n) => (t.description && (n.description = t.description, e.markdownDescription && (n.markdownDescription = t.description)), n), Tl = (t, e) => {
  const n = jo(e);
  let r = typeof e == "object" && e.definitions ? Object.entries(e.definitions).reduce((l, [u, c]) => ({
    ...l,
    [u]: be(c._def, {
      ...n,
      currentPath: [...n.basePath, n.definitionPath, u]
    }, !0) ?? dt(n)
  }), {}) : void 0;
  const i = typeof e == "string" ? e : (e == null ? void 0 : e.nameStrategy) === "title" || e == null ? void 0 : e.name, a = be(t._def, i === void 0 ? n : {
    ...n,
    currentPath: [...n.basePath, n.definitionPath, i]
  }, !1) ?? dt(n), s = typeof e == "object" && e.name !== void 0 && e.nameStrategy === "title" ? e.name : void 0;
  s !== void 0 && (a.title = s), n.flags.hasReferencedOpenAiAnyType && (r || (r = {}), r[n.openAiAnyTypeName] || (r[n.openAiAnyTypeName] = {
    // Skipping "object" as no properties can be defined and additionalProperties must be "false"
    type: ["string", "number", "integer", "boolean", "array", "null"],
    items: {
      $ref: n.$refStrategy === "relative" ? "1" : [
        ...n.basePath,
        n.definitionPath,
        n.openAiAnyTypeName
      ].join("/")
    }
  }));
  const o = i === void 0 ? r ? {
    ...a,
    [n.definitionPath]: r
  } : a : {
    $ref: [
      ...n.$refStrategy === "relative" ? [] : n.basePath,
      n.definitionPath,
      i
    ].join("/"),
    [n.definitionPath]: {
      ...r,
      [i]: a
    }
  };
  return n.target === "jsonSchema7" ? o.$schema = "http://json-schema.org/draft-07/schema#" : (n.target === "jsonSchema2019-09" || n.target === "openAi") && (o.$schema = "https://json-schema.org/draft/2019-09/schema#"), n.target === "openAi" && ("anyOf" in o || "oneOf" in o || "allOf" in o || "type" in o && Array.isArray(o.type)) && console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property."), o;
};
class El {
  constructor(e = []) {
    q(this, "entries", /* @__PURE__ */ new Map());
    q(this, "schemas", []);
    e.forEach((n) => this.add(n));
  }
  add(e) {
    this.entries.has(e.name) || (this.entries.set(e.name, e), this.schemas.push({
      name: e.name,
      description: e.description,
      propsSchemaJson: Tl(e.propsSchema, {
        $refStrategy: "none"
      })
    }));
  }
  get(e) {
    return this.entries.get(e);
  }
  has(e) {
    return this.entries.has(e);
  }
  getSchemas() {
    return this.schemas;
  }
  size() {
    return this.entries.size;
  }
}
const _l = {
  maxReconnectAttempts: 1 / 0,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, Kn = {
  NORMAL: 1e3,
  // Normal closure
  GOING_AWAY: 1001
};
var Ct = /* @__PURE__ */ ((t) => (t.CONNECTION_ESTABLISHED = "connection_established", t.CONNECTION_LOST = "connection_lost", t.CONNECTION_RESTORED = "connection_restored", t.CONNECTION_FAILED = "connection_failed", t.RECONNECTING = "reconnecting", t.CHAT_COMPLETED = "chat_completed", t.CHAT_ERROR = "chat_error", t))(Ct || {}), At = /* @__PURE__ */ ((t) => (t.CHAT_MESSAGE = "chat_message", t.CONFIGURE_TOOLS = "configure_tools", t.UPDATE_TOOLS = "update_tools", t.UPDATE_CONTEXT_HELPERS = "update_context_helpers", t.TOOL_CALL_RESPONSE = "tool_call_response", t.HEARTBEAT_PING = "heartbeat_ping", t.HEARTBEAT_PONG = "heartbeat_pong", t.STOP_RUN = "stop_run", t))(At || {}), Xe = /* @__PURE__ */ ((t) => (t.SESSION_ESTABLISHED = "session_established", t.TOOLS_CONFIGURED = "tools_configured", t.CLIENT_TOOLS_UPDATED = "client_tools_updated", t.CONFIGURE_TOOLS = "configure_tools", t.CHAT_EVENT = "chat_event", t.CHAT_FINISHED = "chat_finished", t.CHAT_ERROR = "chat_error", t.MESSAGES_PERSISTED = "messages_persisted", t.THREAD_CREATED = "thread_created", t.TOOL_CALL_REQUEST = "tool_call_request", t.UI_COMPONENT = "ui_component", t.HEARTBEAT_PING = "heartbeat_ping", t.HEARTBEAT_ACK = "heartbeat_ack", t.ERROR = "error", t))(Xe || {}), rr = /* @__PURE__ */ ((t) => (t.PROVIDER_EVENT = "provider-event", t.LATITUDE_EVENT = "latitude-event", t.CONTENT_DELTA = "content-delta", t))(rr || {}), Kt = /* @__PURE__ */ ((t) => (t.TEXT_DELTA = "text-delta", t.REASONING_START = "reasoning-start", t.REASONING_DELTA = "reasoning-delta", t.REASONING_END = "reasoning-end", t.TOOL_CALL = "tool-call", t.TOOL_RESULT = "tool-result", t))(Kt || {});
class pn {
  static createConnectionEvent(e, n) {
    return {
      type: e,
      timestamp: /* @__PURE__ */ new Date(),
      data: n
    };
  }
  static createChatEvent(e, n) {
    return {
      type: e,
      timestamp: /* @__PURE__ */ new Date(),
      data: n
    };
  }
  // Convenience methods for common events
  static connectionEstablished() {
    return this.createConnectionEvent(Ct.CONNECTION_ESTABLISHED);
  }
  static connectionLost(e) {
    return this.createConnectionEvent(Ct.CONNECTION_LOST, { reason: e });
  }
  static connectionRestored() {
    return this.createConnectionEvent(Ct.CONNECTION_RESTORED);
  }
  static reconnecting(e, n) {
    return this.createConnectionEvent(Ct.RECONNECTING, { attempt: e, maxAttempts: n });
  }
  static chatCompleted(e) {
    return this.createChatEvent(Ct.CHAT_COMPLETED, { conversationId: e });
  }
  static chatError(e, n) {
    return this.createChatEvent(Ct.CHAT_ERROR, { error: e, errorCode: n });
  }
}
class Wt {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(e) {
    return {
      type: At.CHAT_MESSAGE,
      content: e.content,
      media: e.media || [],
      providerResId: e.providerResId,
      mcpHeaders: e.mcpHeaders
    };
  }
  /**
   * Create a configure tools message
   */
  static createConfigureToolsMessage(e, n, r) {
    return {
      type: At.CONFIGURE_TOOLS,
      toolSchemas: e,
      generativeComponents: r,
      contextHelpers: n
    };
  }
  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(e, n) {
    return {
      type: At.UPDATE_TOOLS,
      toolSchemas: e,
      generativeComponents: n
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(e) {
    return {
      type: At.UPDATE_CONTEXT_HELPERS,
      contextHelpers: e
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(e, n) {
    return {
      type: At.TOOL_CALL_RESPONSE,
      callId: e,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(e, n) {
    return {
      type: At.TOOL_CALL_RESPONSE,
      callId: e,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: At.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(e, n) {
    return {
      type: At.HEARTBEAT_PONG,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      originalTimestamp: e,
      pingTime: n
    };
  }
  /**
   * Create a stop run message
   */
  static createStopRunMessage(e) {
    return {
      type: At.STOP_RUN,
      conversationUuid: e
    };
  }
  /**
   * Serialize a message to JSON string for sending over WebSocket
   */
  static serialize(e) {
    return JSON.stringify(e);
  }
  /**
   * Generic helper to create and serialize any message in one call
   */
  static createAndSerialize(e) {
    return this.serialize(e());
  }
  /**
   * Helper methods to create and serialize messages in one call
   */
  static serializeChatMessage(e) {
    return this.createAndSerialize(() => this.createChatMessage(e));
  }
  static serializeConfigureTools(e, n, r) {
    return this.createAndSerialize(
      () => this.createConfigureToolsMessage(e, n, r)
    );
  }
  static serializeUpdateTools(e, n) {
    return this.createAndSerialize(
      () => this.createUpdateToolsMessage(e, n)
    );
  }
  static serializeUpdateContextHelpers(e) {
    return this.createAndSerialize(
      () => this.createUpdateContextHelpersMessage(e)
    );
  }
  static serializeToolCallSuccess(e, n) {
    return this.createAndSerialize(
      () => this.createToolCallSuccessResponse(e, n)
    );
  }
  static serializeToolCallError(e, n) {
    return this.createAndSerialize(
      () => this.createToolCallErrorResponse(e, n)
    );
  }
  static serializeHeartbeatPing() {
    return this.createAndSerialize(() => this.createHeartbeatPing());
  }
  static serializeHeartbeatPong(e, n) {
    return this.createAndSerialize(
      () => this.createHeartbeatPong(e, n)
    );
  }
  static serializeStopRun(e) {
    return this.createAndSerialize(
      () => this.createStopRunMessage(e)
    );
  }
}
class vl {
  constructor(e, n) {
    q(this, "ws", null);
    q(this, "config");
    q(this, "connectionState");
    q(this, "reconnectTimer", null);
    q(this, "heartbeatInterval", null);
    q(this, "visibilityChangeHandler");
    q(this, "currentTicket", null);
    q(this, "intentionalDisconnect", !1);
    // Track intentional disconnects
    q(this, "justRefreshedTicket", !1);
    // Track if ticket was just refreshed to skip duplicate validation
    q(this, "onOpen");
    q(this, "onMessage");
    q(this, "onError");
    q(this, "onClose");
    q(this, "onSystemEvent");
    q(this, "onTicketRefresh");
    q(this, "onTicketValidate");
    this.config = e, this.connectionState = n, this.visibilityChangeHandler = this.handleVisibilityChange.bind(this), this.registerVisibilityHandler();
  }
  connect(e) {
    return new Promise((n, r) => {
      try {
        this.intentionalDisconnect = !1, e && (this.currentTicket = e);
        const i = this.buildWebSocketUrl();
        if (this.ws = new WebSocket(i), !this.ws) {
          r(new Error("WebSocket not initialized"));
          return;
        }
        this.setupEventHandlers(n, r);
      } catch (i) {
        r(i);
      }
    });
  }
  buildWebSocketUrl() {
    let e = this.config.apiUrl.replace(/^https:\/\//, "wss://").replace(/^http:\/\//, "ws://");
    if (e = e.endsWith("/ws") ? e : e + "/ws", this.currentTicket) {
      const n = e.includes("?") ? "&" : "?";
      e = `${e}${n}ticket=${this.currentTicket}`;
    }
    return e;
  }
  setupEventHandlers(e, n) {
    this.ws && (this.ws.onopen = () => this.handleConnectionOpened(e), this.ws.onerror = (r) => this.handleConnectionError(r, e, n), this.ws.onmessage = (r) => {
      var i;
      return (i = this.onMessage) == null ? void 0 : i.call(this, r);
    }, this.ws.onclose = (r) => this.handleConnectionClosed(r));
  }
  handleConnectionOpened(e) {
    var n;
    this.updateConnectionState(!0, !1), this.startHeartbeat(), (n = this.onOpen) == null || n.call(this), e == null || e();
  }
  handleConnectionError(e, n, r) {
    var i;
    if ((i = this.onError) == null || i.call(this, e), this.connectionState.setConnected(!1), r) {
      r(e);
      return;
    }
    this.intentionalDisconnect || this.scheduleReconnectAfterError();
  }
  handleConnectionClosed(e) {
    var n;
    console.log("[WebSocketManager] Connection closed", {
      code: e.code,
      reason: e.reason,
      intentionalDisconnect: this.intentionalDisconnect
    }), this.processConnectionClosure(e), (n = this.onClose) == null || n.call(this, e), this.shouldReconnectAfterClose(e.code) ? (console.log(
      "[WebSocketManager] Should reconnect, calling attemptReconnect"
    ), this.attemptReconnect()) : console.log("[WebSocketManager] Should NOT reconnect");
  }
  updateConnectionState(e, n) {
    this.connectionState.setConnected(e), this.connectionState.setReconnecting(n), this.connectionState.resetReconnectAttempts(), this.connectionState.updateReconnectDelay(this.config.reconnectDelay);
  }
  processConnectionClosure(e) {
    this.connectionState.setConnected(!1), this.stopHeartbeat();
  }
  shouldReconnectAfterClose(e) {
    if (console.log("[WebSocketManager] shouldReconnectAfterClose check", {
      closeCode: e,
      intentionalDisconnect: this.intentionalDisconnect,
      NORMAL: Kn.NORMAL,
      GOING_AWAY: Kn.GOING_AWAY
    }), this.intentionalDisconnect)
      return console.log("[WebSocketManager] Intentional disconnect - no reconnect"), !1;
    const { NORMAL: n } = Kn, r = e !== n;
    return console.log("[WebSocketManager] Should reconnect?", r), r;
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
    var s, o;
    if (console.log("[WebSocketManager] attemptReconnect called", {
      reconnectAttempts: this.connectionState.reconnectAttempts,
      maxReconnectAttempts: this.config.maxReconnectAttempts,
      isReconnecting: this.connectionState.isReconnecting,
      reconnectTimer: this.reconnectTimer
    }), this.connectionState.reconnectAttempts >= this.config.maxReconnectAttempts) {
      console.log("[WebSocketManager] Max reconnection attempts reached"), (s = this.onSystemEvent) == null || s.call(
        this,
        pn.connectionLost("Max reconnection attempts reached")
      ), this.connectionState.setReconnecting(!1);
      return;
    }
    if (this.reconnectTimer !== null) {
      console.log(
        "[WebSocketManager] Reconnection already in progress, skipping"
      );
      return;
    }
    this.connectionState.setReconnecting(!0), this.connectionState.incrementReconnectAttempts();
    const e = this.connectionState.reconnectAttempts, n = this.config.maxReconnectAttempts;
    console.log("[WebSocketManager] Firing RECONNECTING event", {
      attempt: e,
      maxAttempts: n
    }), (o = this.onSystemEvent) == null || o.call(this, pn.reconnecting(e, n));
    const r = this.config.reconnectDelay, i = Math.random() * 90 + 10, a = r + i;
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null, this.connectionState.isConnected || this.reconnect();
    }, a);
  }
  async reconnect() {
    try {
      console.log("[WebSocketManager] ====== RECONNECT ATTEMPT START ======", {
        hasCurrentTicket: !!this.currentTicket,
        justRefreshedTicket: this.justRefreshedTicket,
        reconnectAttempt: this.connectionState.reconnectAttempts
      }), this.closeConnection();
      let e = !0;
      if (this.justRefreshedTicket)
        console.log(
          "[WebSocketManager] Skipping validation - ticket was just refreshed in previous attempt"
        ), e = !1, this.justRefreshedTicket = !1;
      else if (this.onTicketValidate && this.currentTicket) {
        console.log(
          "[WebSocketManager] Validating current ticket before reconnection..."
        );
        try {
          await this.onTicketValidate() ? (console.log(
            "[WebSocketManager] Current ticket is still valid, proceeding with reconnection"
          ), e = !1) : console.log(
            "[WebSocketManager] Current ticket is invalid according to server, need to get fresh ticket"
          );
        } catch (r) {
          console.error("[WebSocketManager] Failed to validate ticket with server API:", r), console.log("[WebSocketManager] Validation API failed - server might be down, will retry with fresh ticket");
        }
      } else this.currentTicket || console.log(
        "[WebSocketManager] No current ticket, need to get fresh ticket"
      );
      if (e && this.onTicketRefresh) {
        console.log(
          "[WebSocketManager] Requesting fresh ticket for reconnection..."
        );
        try {
          const r = await this.onTicketRefresh();
          this.currentTicket = r, this.justRefreshedTicket = !0, console.log(
            "[WebSocketManager] Fresh ticket obtained for reconnection"
          );
        } catch (r) {
          throw console.error(
            "[WebSocketManager] Failed to get fresh ticket:",
            r
          ), r;
        }
      } else if (e && !this.onTicketRefresh)
        throw console.warn(
          "[WebSocketManager] Need fresh ticket but no ticket refresh callback available"
        ), new Error(
          "Cannot refresh expired ticket - no refresh callback available"
        );
      console.log("[WebSocketManager] Creating WebSocket connection...");
      const n = this.buildWebSocketUrl();
      this.ws = new WebSocket(n), this.setupReconnectHandlers(), console.log("[WebSocketManager] ====== RECONNECT ATTEMPT END (connection initiated) ======");
    } catch (e) {
      console.log("[WebSocketManager] ====== RECONNECT ATTEMPT FAILED ======", e), this.scheduleReconnectAfterError();
    }
  }
  /**
   * Update the ticket for future connections
   */
  updateTicket(e) {
    this.currentTicket = e;
  }
  setupReconnectHandlers() {
    this.ws && (this.ws.onopen = () => this.handleReconnectionOpened(), this.ws.onerror = () => this.handleReconnectionError(), this.ws.onmessage = (e) => {
      var n;
      return (n = this.onMessage) == null ? void 0 : n.call(this, e);
    }, this.ws.onclose = (e) => this.handleReconnectionClosed(e));
  }
  handleReconnectionOpened() {
    var e, n;
    this.updateConnectionState(!0, !1), this.justRefreshedTicket = !1, this.startHeartbeat(), (e = this.onSystemEvent) == null || e.call(this, pn.connectionRestored()), (n = this.onOpen) == null || n.call(this);
  }
  handleReconnectionError() {
    this.scheduleReconnectAfterError();
  }
  scheduleReconnectAfterError() {
    const e = this.config.reconnectDelay, n = Math.random() * 90 + 10, r = e + n;
    this.reconnectTimer !== null && (window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null), setTimeout(() => this.attemptReconnect(), r);
  }
  handleReconnectionClosed(e) {
    this.processConnectionClosure(e), this.shouldReconnectAfterClose(e.code) ? this.attemptReconnect() : this.connectionState.setReconnecting(!1);
  }
  startHeartbeat() {
  }
  sendHeartbeat() {
    const e = Wt.serializeHeartbeatPing();
    this.send(e);
  }
  stopHeartbeat() {
    this.heartbeatInterval && (clearInterval(this.heartbeatInterval), this.heartbeatInterval = null);
  }
  send(e) {
    var n;
    ((n = this.ws) == null ? void 0 : n.readyState) === WebSocket.OPEN && this.ws.send(e);
  }
  closeConnection() {
    this.ws && this.ws.close(Kn.NORMAL);
  }
  disconnect() {
    this.intentionalDisconnect = !0, this.clearTimers(), this.removeEventListeners(), this.closeConnection(), this.connectionState.reset(), this.ws = null;
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
  setEventHandlers(e) {
    this.onOpen = e.onOpen, this.onMessage = e.onMessage, this.onError = e.onError, this.onClose = e.onClose, this.onSystemEvent = e.onSystemEvent, this.onTicketRefresh = e.onTicketRefresh, this.onTicketValidate = e.onTicketValidate;
  }
}
class Rl {
  constructor() {
    q(this, "state");
    this.state = {
      isConnected: !1,
      isReconnecting: !1,
      reconnectAttempts: 0,
      reconnectDelay: 1e3
    };
  }
  update(e) {
    Object.assign(this.state, e);
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
  setConnected(e) {
    this.state.isConnected = e;
  }
  setReconnecting(e) {
    this.state.isReconnecting = e;
  }
  incrementReconnectAttempts() {
    this.state.reconnectAttempts++;
  }
  resetReconnectAttempts() {
    this.state.reconnectAttempts = 0;
  }
  updateReconnectDelay(e) {
    this.state.reconnectDelay = e;
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
class lr {
  /**
   * Create a synthetic ToolCallRequest for server-side tool calls
   */
  static createServerToolCall(e, n, r = {}) {
    return {
      toolName: e,
      callId: n,
      parameters: r
    };
  }
  /**
   * Create a synthetic ToolCallRequest for reasoning operations
   */
  static createReasoningCall(e, n, r) {
    return {
      toolName: "reasoning",
      callId: e,
      parameters: { phase: n, ...r }
    };
  }
  /**
   * Create a synthetic ToolCallRequest for Latitude tool calls
   */
  static createLatitudeToolCall(e, n, r = {}) {
    return {
      toolName: e,
      callId: n,
      parameters: r
    };
  }
}
class ws {
  constructor(e = {}) {
    q(this, "handlers", {});
    this.handlers = e;
  }
  updateEventHandlers(e) {
    Object.assign(this.handlers, e), this.onHandlersUpdated(e);
  }
  /**
   * Hook for subclasses to react to handler updates
   */
  onHandlersUpdated(e) {
  }
  getHandler(e) {
    return this.handlers[e];
  }
}
const ae = {
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
    THOUGHT: "Thought",
    DURATION_FOR: "for",
    DURATION_SECOND: "second",
    DURATION_SECONDS: "seconds"
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
  // Detection patterns (language-agnostic)
  PATTERNS: {
    DURATION: /for ([\d.]+) \w+/,
    // Matches "for <number> <any-word>"
    THOUGHT_CONTENT: /\*\*(.*?)\*\*/g,
    HANDLING_TOOL: /🔧 Handling: (.+)/,
    COMPLETED_OR_ERROR_TOOL: /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
  }
}, Ze = {
  isThinkingMessage: (t) => t.startsWith(ae.THINKING_PREFIX) || t.startsWith(ae.REASONING_PREFIX) || t.startsWith(ae.THOUGHT_PREFIX),
  isCompletedMessage: (t) => t.includes(ae.COMPLETED_MARKER),
  isErrorMessage: (t) => t.includes(ae.ERROR_MARKER),
  isHandlingMessage: (t) => t.includes(ae.HANDLING_MARKER),
  extractDuration: (t, e) => {
    const n = t.match(ae.PATTERNS.DURATION);
    if (!n) return;
    const r = parseFloat(n[1]);
    if (e) {
      const a = e("chat.reasoning.duration.for"), s = e(r === 1 ? "chat.reasoning.duration.second" : "chat.reasoning.duration.seconds");
      return ` ${a} ${r} ${s}`;
    }
    const i = r === 1 ? ae.UI_TEXT.DURATION_SECOND : ae.UI_TEXT.DURATION_SECONDS;
    return ` ${ae.UI_TEXT.DURATION_FOR} ${r} ${i}`;
  },
  cleanReasoningContent: (t) => {
    let e = t.replace(new RegExp(`^${ae.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${ae.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${ae.THOUGHT_PREFIX}\\s*`), "");
    return e = e.replace(/\s*for [\d.]+\s+\w+$/, ""), e = e.replace(ae.PATTERNS.THOUGHT_CONTENT, ""), e.trim();
  },
  getMessageType: (t, e) => e === !1 ? Ze.isErrorMessage(t) ? ae.MESSAGE_TYPES.ERROR : (Ze.isThinkingMessage(t) && ae.PATTERNS.DURATION.test(t) || Ze.isThinkingMessage(t), ae.MESSAGE_TYPES.THOUGHT) : Ze.isCompletedMessage(t) ? ae.MESSAGE_TYPES.COMPLETED : Ze.isErrorMessage(t) ? ae.MESSAGE_TYPES.ERROR : (Ze.isHandlingMessage(t) || Ze.isThinkingMessage(t) && !t.includes(ae.UI_TEXT.AI_IS_THINKING), ae.MESSAGE_TYPES.THINKING)
};
class Il extends ws {
  constructor(n) {
    super({ onReasoningUpdate: n });
    q(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    q(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, s) {
    const o = this.getHandler("onReasoningUpdate");
    if (!o) return;
    const l = lr.createReasoningCall(
      i,
      a,
      s || {}
    );
    o(n, r, l);
  }
  handleReasoningStart(n) {
    const r = n.id || "reasoning";
    this.reasoningStartTimes.set(r, Date.now()), this.reasoningContent.set(r, "");
  }
  handleReasoningDelta(n) {
    if (!n.text) return;
    const r = n.id || "reasoning", a = (this.reasoningContent.get(r) || "") + n.text;
    this.reasoningContent.set(r, a);
    const s = `${ae.THINKING_PREFIX} ${a}`;
    this.triggerReasoningUpdate(
      !0,
      s,
      r,
      "thinking",
      { text: a }
    );
  }
  handleReasoningEnd(n) {
    const r = n.id || "reasoning", i = this.reasoningContent.get(r) || "", a = this.reasoningStartTimes.get(r);
    let s = "";
    a && (s = ` for ${((Date.now() - a) / 1e3).toFixed(0)} seconds`, this.reasoningStartTimes.delete(r));
    const o = i || ae.UI_TEXT.THOUGHT, l = `${ae.THOUGHT_PREFIX} ${o}${s}`;
    this.triggerReasoningUpdate(
      !1,
      l,
      r,
      "end",
      { duration: s, fullContent: i }
    ), this.reasoningContent.delete(r);
  }
  setReasoningUpdateHandler(n) {
    this.updateEventHandlers({ onReasoningUpdate: n });
  }
}
const Nl = "render_ui";
class Al extends ws {
  constructor(n = {}, r, i) {
    super({ onReasoningUpdate: r, onUIComponent: i });
    q(this, "processedToolCalls", /* @__PURE__ */ new Set());
    q(this, "clientTools", {});
    q(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var s, o, l;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      if (this.processedToolCalls.add(r), i === Nl) {
        this.sendToolResponse(r, { rendered: !0 });
        return;
      }
      (s = this.getHandler("onReasoningUpdate")) == null || s(!0, `${ae.HANDLING_MARKER} ${i}`, n);
      try {
        const u = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, u), (o = this.getHandler("onReasoningUpdate")) == null || o(!1, `${ae.COMPLETED_MARKER} ${i}`, n);
      } catch (u) {
        this.sendToolError(r, u), (l = this.getHandler("onReasoningUpdate")) == null || l(!1, `${ae.ERROR_MARKER} Error: ${i} - ${u}`, n);
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
    const i = Wt.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = Wt.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = lr.createLatitudeToolCall(
        n.toolName,
        n.toolCallId,
        n.args || {}
      );
      r(!0, `${ae.HANDLING_MARKER} ${n.toolName}`, a);
    }
  }
  handleServerToolResult(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = lr.createLatitudeToolCall(
        n.toolName,
        n.toolCallId
      );
      r(
        !1,
        `${ae.COMPLETED_MARKER} ${n.toolName}`,
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
class Ml {
  constructor(e, n = {}) {
    q(this, "reasoningHandler");
    q(this, "toolHandler");
    q(this, "handlers");
    q(this, "sendMessage");
    this.handlers = e, this.reasoningHandler = new Il(e.onReasoningUpdate), this.toolHandler = new Al(
      n,
      e.onReasoningUpdate,
      e.onUIComponent
    );
  }
  handleMessage(e) {
    try {
      const n = JSON.parse(e.data);
      switch (n.type) {
        case Xe.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case Xe.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case Xe.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case Xe.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case Xe.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case Xe.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case Xe.MESSAGES_PERSISTED:
          this.handleMessagesPersisted(n);
          break;
        case Xe.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case Xe.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case Xe.UI_COMPONENT:
          this.handleUIComponentMessage(n);
          break;
        case Xe.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case Xe.HEARTBEAT_ACK:
          break;
        case Xe.ERROR:
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
  handleChatEvent(e) {
    var n, r, i;
    switch (e.event) {
      case rr.PROVIDER_EVENT:
        this.handleProviderEvent(e);
        break;
      case rr.LATITUDE_EVENT:
        this.handleLatitudeEvent(e);
        break;
      case rr.CONTENT_DELTA:
        (n = e.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, e.data.delta));
        break;
    }
  }
  handleProviderEvent(e) {
    var r, i, a;
    switch ((r = e.data) == null ? void 0 : r.type) {
      case Kt.TEXT_DELTA:
        e.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, e.data.textDelta));
        break;
      case Kt.REASONING_START:
        this.reasoningHandler.handleReasoningStart(e.data);
        break;
      case Kt.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(e.data);
        break;
      case Kt.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(e.data);
        break;
      case Kt.TOOL_CALL:
        this.toolHandler.handleServerToolCall(e.data);
        break;
      case Kt.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(e.data);
        break;
    }
  }
  handleLatitudeEvent(e) {
    var n;
    if (((n = e.data) == null ? void 0 : n.type) === Kt.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = e.data;
      if (r.toolCallId && r.toolName) {
        const i = lr.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${ae.COMPLETED_MARKER} ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(e) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, pn.chatCompleted(e.uuid));
  }
  handleMessagesPersisted(e) {
    var n, r;
    this.handlers.onMessagesPersisted && this.handlers.onMessagesPersisted({
      threadId: (n = e.data) == null ? void 0 : n.threadId,
      providerResId: (r = e.data) == null ? void 0 : r.providerResId
    });
  }
  handleChatError(e) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      pn.chatError(e.error || "Unknown error")
    );
  }
  handleToolCallRequest(e) {
    this.toolHandler.handleToolCallRequest(e);
  }
  handleUIComponentMessage(e) {
    const n = this.handlers.onUIComponent;
    if (!n) return;
    const r = e, i = r.toolCallId, a = r.componentName;
    if (!i || !a) return;
    const s = r.status ?? "complete", o = r.props ?? {};
    n({
      callId: i,
      componentName: a,
      props: o,
      status: s
    });
  }
  handleHeartbeatPing(e) {
    if (!this.sendMessage)
      return;
    const n = Wt.serializeHeartbeatPong(
      e.timestamp,
      e.pingTime
    );
    this.sendMessage(n);
  }
  handleError(e) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      pn.chatError(e.error || "Unknown WebSocket error")
    );
  }
  updateClientTools(e) {
    this.toolHandler.updateClientTools(e);
  }
  clearProcessedToolCalls() {
    this.toolHandler.clearProcessedToolCalls();
  }
  setSendMessageHandler(e) {
    this.sendMessage = e, this.toolHandler.setSendMessageHandler(e);
  }
  updateEventHandlers(e) {
    Object.assign(this.handlers, e), this.reasoningHandler.updateEventHandlers(e), this.toolHandler.updateEventHandlers(e);
  }
}
async function Ol(t, e, n = 1e4) {
  const r = {
    "Content-Type": "application/json"
  };
  e != null && e.userMpAuthToken && (r["x-oddle-mp-auth-token"] = e.userMpAuthToken), e != null && e.chatServerKey && (r["x-oddle-chat-server-key"] = e.chatServerKey);
  try {
    const i = new AbortController(), a = setTimeout(() => i.abort(), n);
    try {
      const s = await fetch(`${t}/api/v1/tickets`, {
        method: "POST",
        headers: r,
        signal: i.signal,
        body: JSON.stringify({
          entityId: e.entityId,
          entityType: e.entityType,
          providerResId: e.providerResId,
          clientInfo: {
            userAgent: navigator.userAgent,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            ...e.clientInfo
          }
        })
      });
      if (clearTimeout(a), !s.ok) {
        const l = await s.json().catch(() => ({}));
        throw new Error(
          l.error || `Failed to get WebSocket ticket: ${s.statusText}`
        );
      }
      const o = await s.json();
      if (!o.success || !o.ticket)
        throw new Error(o.error || "Invalid ticket response from server");
      return o;
    } catch (s) {
      throw clearTimeout(a), s instanceof Error && s.name === "AbortError" ? new Error(`Ticket request timed out after ${n}ms`) : s;
    }
  } catch (i) {
    throw console.error("Error requesting WebSocket ticket:", i), i;
  }
}
function Xr(t) {
  if (!t.success || !t.ticket || !t.expiresAt)
    return !1;
  const e = new Date(t.expiresAt).getTime();
  return Date.now() < e - 3e4;
}
function ji(t) {
  const e = Xr(t), n = new Date(t.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: e,
    expiresIn: i,
    expired: r >= n
  };
}
async function Ll(t, e, n, r) {
  try {
    const i = {
      "Content-Type": "application/json",
      "x-oddle-mp-auth-token": n.userMpAuthToken,
      "x-oddle-chat-server-key": n.chatServerKey
    }, a = {
      ticket: e,
      ...r
    };
    console.log("[TicketAPI] Validating ticket with server:", {
      url: `${t}/api/v1/tickets/validate`,
      ticket: e.substring(0, 8) + "...",
      context: r
    });
    const s = await fetch(`${t}/api/v1/tickets/validate`, {
      method: "POST",
      headers: i,
      body: JSON.stringify(a)
    });
    if (!s.ok)
      throw new Error(`Ticket validation failed: ${s.status} ${s.statusText}`);
    const o = await s.json();
    return console.log("[TicketAPI] Server validation result:", {
      valid: o.valid,
      error: o.error,
      details: o.details
    }), o.valid || (o.retryable = !1), o;
  } catch (i) {
    console.error("[TicketAPI] Ticket validation error:", i);
    let a = "VALIDATION_ERROR", s = "Validation request failed";
    return i instanceof Error && (s = i.message, i.message.includes("fetch") ? (a = "NETWORK_ERROR", s = "Network error during ticket validation - server may be temporarily unavailable") : i.message.includes("500") || i.message.includes("502") || i.message.includes("503") ? (a = "SERVER_ERROR", s = "Server error during ticket validation - validation service may be temporarily down") : i.message.includes("timeout") && (a = "TIMEOUT_ERROR", s = "Timeout during ticket validation - validation service may be slow or overloaded")), console.log(`[TicketAPI] Validation failed with error type: ${a}`), {
      valid: !1,
      error: s,
      code: a,
      retryable: !0,
      // API failure = temporary issue, should retry
      details: {
        reason: "Validation API request failed - will retry with fresh ticket",
        retryable: !0
        // Indicate this error is retryable
      }
    };
  }
}
function Pl(t) {
  var r, i, a;
  const e = ((r = t == null ? void 0 : t.message) == null ? void 0 : r.toLowerCase()) || "", n = ((i = t == null ? void 0 : t.name) == null ? void 0 : i.toLowerCase()) || "";
  if (e.includes("connection refused") || e.includes("econnrefused") || e.includes("err_connection_refused") || e.includes("network request failed") || e.includes("failed to connect"))
    return {
      isRetryable: !0,
      reason: "Server unreachable or connection refused",
      errorType: "network"
    };
  if (n === "typeerror" && e.includes("failed to fetch"))
    return e.includes("cors") || e.includes("cross-origin") || e.includes("blocked by cors") ? {
      isRetryable: !1,
      reason: "CORS policy blocking request",
      errorType: "cors"
    } : {
      isRetryable: !0,
      reason: "Network error - server may be unreachable",
      errorType: "network"
    };
  if (e.includes("cors") || e.includes("cross-origin") || e.includes("blocked by cors"))
    return {
      isRetryable: !1,
      reason: "CORS error detected",
      errorType: "cors"
    };
  if (e.includes("unauthorized") || e.includes("forbidden") || e.includes("authentication") || e.includes("invalid token") || e.includes("expired token") || e.includes("expired authentication") || e.includes("access denied") || e.includes("ticket expired") || e.includes("invalid ticket") || e.includes("ticket revoked") || e.includes("ticket not found") || e.includes("user not found") || e.includes("entity not found") || e.includes("permission denied") || e.includes("invalid credentials"))
    return {
      isRetryable: !1,
      reason: "Authentication/authorization error",
      errorType: "auth"
    };
  if (t != null && t.status || t != null && t.response && typeof t.response == "object") {
    const s = t.status || ((a = t.response) == null ? void 0 : a.status);
    if (s === 401 || s === 403)
      return {
        isRetryable: !1,
        reason: `HTTP ${s} - authentication/permission denied`,
        errorType: "auth"
      };
    if (s === 404)
      return {
        isRetryable: !1,
        reason: "HTTP 404 - endpoint not found",
        errorType: "permission"
      };
    if (s >= 400 && s < 500)
      return {
        isRetryable: !1,
        reason: `HTTP ${s} - client error`,
        errorType: "permission"
      };
    if (s >= 500)
      return {
        isRetryable: !0,
        reason: `HTTP ${s} - server error (temporary)`,
        errorType: "server"
      };
  }
  return e.includes("network") || e.includes("timeout") || e.includes("connection") || e.includes("offline") || n === "networkerror" ? {
    isRetryable: !0,
    reason: "Network connectivity issue",
    errorType: "network"
  } : e.includes("websocket") || e.includes("ws") || n === "websocketerror" ? {
    isRetryable: !0,
    reason: "WebSocket connection issue",
    errorType: "network"
  } : {
    isRetryable: !1,
    reason: "Unknown error type",
    errorType: "unknown"
  };
}
function mn(t, e) {
  const n = Pl(t);
  return console.error(`[${e}] Error occurred:`, {
    error: (t == null ? void 0 : t.message) || t,
    classification: n,
    shouldRetry: n.isRetryable
  }), n;
}
class Dl {
  constructor(e, n, r = {}) {
    q(this, "ticket", null);
    q(this, "refreshPromise", null);
    q(this, "validationInterval", null);
    q(this, "authData");
    q(this, "apiUrl");
    q(this, "config");
    this.authData = e, this.apiUrl = this.convertToHttpUrl(n), this.config = {
      checkInterval: r.checkInterval ?? 6e4,
      renewalThreshold: r.renewalThreshold ?? 300,
      maxRetries: r.maxRetries ?? 3,
      retryBaseDelay: r.retryBaseDelay ?? 1e3,
      requestTimeout: r.requestTimeout ?? 3e4,
      // 30s for slow connections
      onError: r.onError
    };
  }
  /**
   * Convert WebSocket URL to HTTP URL for ticket requests
   * wss:// -> https://, ws:// -> http://
   * Also handles http:// and https:// (keeps them as-is)
   */
  convertToHttpUrl(e) {
    return e.replace(/^wss:\/\//, "https://").replace(/^ws:\/\//, "http://");
  }
  /**
   * Get a valid ticket, refreshing if necessary
   * This is the main entry point for getting tickets
   *
   * @returns Valid ticket string
   * @throws Error if ticket refresh fails
   */
  async getValidTicket() {
    return this.ticket && Xr(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
  }
  /**
   * Refresh the ticket, preventing duplicate refreshes
   * Multiple concurrent calls will wait for the same refresh
   *
   * This prevents race conditions by:
   * 1. Checking if refresh is in progress
   * 2. If yes, returning the same promise (all callers wait together)
   * 3. If no, starting new refresh and storing the promise
   *
   * @returns Promise that resolves to new ticket string
   */
  async refreshTicket() {
    if (this.refreshPromise)
      return console.log("TicketManager: Refresh already in progress, waiting..."), this.refreshPromise;
    this.refreshPromise = this._doRefresh();
    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }
  /**
   * Internal method to actually perform the refresh
   * Includes automatic retry logic for transient failures
   * @private
   */
  async _doRefresh() {
    const e = this.config.maxRetries, n = this.config.retryBaseDelay;
    for (let r = 1; r <= e; r++) {
      console.log(
        `TicketManager: Requesting new ticket (attempt ${r}/${e})...`,
        {
          apiUrl: this.apiUrl
        }
      );
      try {
        return this.ticket = await Ol(
          this.apiUrl,
          this.authData,
          this.config.requestTimeout
        ), console.log("TicketManager: Ticket received successfully", {
          hasTicket: !!this.ticket.ticket,
          expiresAt: this.ticket.expiresAt
        }), this.ticket.ticket;
      } catch (i) {
        console.log("[TicketManager] Caught error during ticket request:", {
          error: i instanceof Error ? i.message : i,
          attempt: r,
          maxRetries: e,
          hasOnErrorCallback: !!this.config.onError
        });
        const a = mn(i, "TicketManager");
        if (!a.isRetryable) {
          const o = `Ticket refresh failed (non-retryable - ${a.reason}): ${i instanceof Error ? i.message : "Unknown error"}`, l = new Error(o);
          throw this.config.onError ? (this.config.onError(l, {
            reason: a.reason,
            errorType: a.errorType
          }), l) : (console.warn(
            "[TicketManager] No onError callback configured, throwing error"
          ), l);
        }
        if (r === e)
          throw new Error(
            `Ticket refresh failed after ${e} attempts (${a.reason}): ${i instanceof Error ? i.message : "Unknown error"}`
          );
        const s = n * Math.pow(2, r - 1);
        console.log(
          `TicketManager: Ticket request failed (${a.reason}), retrying in ${s}ms...`
        ), await new Promise((o) => setTimeout(o, s));
      }
    }
    throw new Error("Ticket refresh failed unexpectedly");
  }
  /**
   * Start proactive ticket renewal before expiration
   * Checks ticket validity at regular intervals and renews if needed
   *
   * @param onRenewed - Optional callback when ticket is renewed
   */
  startProactiveRenewal(e) {
    this.stopProactiveRenewal(), console.log("TicketManager: Starting proactive renewal", {
      checkInterval: this.config.checkInterval,
      renewalThreshold: this.config.renewalThreshold
    }), this.validationInterval = window.setInterval(async () => {
      await this.checkAndRenew(e);
    }, this.config.checkInterval);
  }
  /**
   * Check ticket validity and renew if needed
   * @private
   */
  async checkAndRenew(e) {
    if (!this.ticket) {
      console.warn("TicketManager: No ticket to validate");
      return;
    }
    try {
      const r = ji(this.ticket).expiresIn / 1e3;
      r < this.config.renewalThreshold && (console.log(
        `TicketManager: Ticket expires in ${r.toFixed(
          0
        )}s, renewing...`
      ), await this.refreshTicket(), console.log("TicketManager: Ticket renewed proactively"), e == null || e());
    } catch (n) {
      const r = mn(
        n,
        "TicketManager:ProactiveRenewal"
      );
      if (!r.isRetryable && (console.warn(
        `TicketManager: Stopping proactive renewal due to non-retryable error: ${r.reason}`
      ), this.stopProactiveRenewal(), this.config.onError)) {
        const i = new Error(
          `Proactive ticket renewal failed (non-retryable - ${r.reason}): ${n instanceof Error ? n.message : "Unknown error"}`
        );
        this.config.onError(i, {
          reason: r.reason,
          errorType: r.errorType
        });
      }
    }
  }
  /**
   * Stop proactive renewal
   */
  stopProactiveRenewal() {
    this.validationInterval && (clearInterval(this.validationInterval), this.validationInterval = null, console.log("TicketManager: Stopped proactive renewal"));
  }
  /**
   * Check if current ticket is valid (local expiration check)
   */
  isValid() {
    return this.ticket ? Xr(this.ticket) : !1;
  }
  /**
   * Validate current ticket with server API
   * This provides authoritative server-side validation
   */
  async validateWithServer() {
    if (!this.ticket)
      return {
        valid: !1,
        error: "No ticket available to validate",
        code: "NO_TICKET"
      };
    try {
      console.log("[TicketManager] Validating ticket with server API...");
      const e = await Ll(
        this.apiUrl,
        this.ticket.ticket,
        {
          userMpAuthToken: this.authData.userMpAuthToken,
          chatServerKey: this.authData.chatServerKey
        },
        {
          entityId: this.authData.entityId,
          entityType: this.authData.entityType
        }
      );
      return console.log("[TicketManager] Server validation result:", {
        valid: e.valid,
        error: e.error,
        code: e.code,
        retryable: e.retryable
      }), e.valid || (e.retryable ? console.log(
        "[TicketManager] Validation API failed (connectivity issue) - will get fresh ticket and retry"
      ) : (console.log(
        "[TicketManager] Ticket is definitively invalid - clearing and will get fresh ticket"
      ), this.ticket = null)), e;
    } catch (e) {
      return console.error(
        "[TicketManager] Server validation failed unexpectedly:",
        e
      ), {
        valid: !1,
        error: e instanceof Error ? e.message : "Server validation failed unexpectedly",
        code: "VALIDATION_ERROR",
        details: {
          reason: "Unexpected error during validation - will retry with fresh ticket",
          retryable: !0
        }
      };
    }
  }
  /**
   * Get time until ticket expires (in milliseconds)
   */
  getExpiresIn() {
    if (this.ticket)
      try {
        return ji(this.ticket).expiresIn;
      } catch (e) {
        console.warn("TicketManager: Error getting ticket info", e);
        return;
      }
  }
  /**
   * Get ticket expiration timestamp
   */
  getExpiresAt() {
    var e;
    return (e = this.ticket) == null ? void 0 : e.expiresAt;
  }
  /**
   * Update authentication data (e.g., after user login)
   */
  updateAuthData(e) {
    this.authData = { ...this.authData, ...e }, console.log("TicketManager: Auth data updated");
  }
  /**
   * Clear ticket (e.g., on logout)
   */
  clear() {
    this.ticket = null, this.stopProactiveRenewal(), console.log("TicketManager: Ticket cleared");
  }
  /**
   * Get debug information about current ticket state
   */
  getDebugInfo() {
    return {
      hasTicket: !!this.ticket,
      isValid: this.isValid(),
      expiresAt: this.getExpiresAt(),
      expiresIn: this.getExpiresIn(),
      isRefreshing: !!this.refreshPromise
    };
  }
}
async function Fl(t, e, n) {
  const r = new URLSearchParams();
  r.append("format", "client"), e.entityId && r.append("entityId", e.entityId), e.entityType && r.append("entityType", e.entityType), console.log("Metadata to append:", e.metadata), e.metadata && Object.keys(e.metadata).length > 0 && r.append("metadata", JSON.stringify(e.metadata));
  const i = `${t}/api/v1/messages/query?${r.toString()}`, a = {
    "Content-Type": "application/json"
  };
  n != null && n.userMpAuthToken && (a["x-oddle-mp-auth-token"] = n.userMpAuthToken), n != null && n.chatServerKey && (a["x-oddle-chat-server-key"] = n.chatServerKey), console.log("Fetching thread messages from:", i);
  const s = await fetch(i, {
    method: "GET",
    headers: a
  });
  if (!s.ok)
    throw new Error(`Failed to fetch thread messages: ${s.statusText}`);
  const o = await s.json();
  return {
    messages: o.messages || [],
    providerResId: o.providerResId,
    threadId: o.threadId
  };
}
async function Hl(t, e, n, r) {
  const i = `${t}/api/v1/threads/${e}`, a = {
    "Content-Type": "application/json"
  };
  r != null && r.userMpAuthToken && (a["x-oddle-mp-auth-token"] = r.userMpAuthToken), r != null && r.chatServerKey && (a["x-oddle-chat-server-key"] = r.chatServerKey);
  const s = await fetch(i, {
    method: "PATCH",
    headers: a,
    body: JSON.stringify(n)
  });
  if (!s.ok) {
    const l = await s.json().catch(() => ({
      error: "Failed to update thread"
    }));
    throw new Error(l.error || "Failed to update thread");
  }
  const o = await s.json();
  if (!o.success)
    throw new Error(o.error || "Failed to update thread");
  return o.data;
}
async function zl(t, e, n, r) {
  const i = `${t}/api/v1/threads/${e}`, a = {
    "Content-Type": "application/json"
  };
  r != null && r.userMpAuthToken && (a["x-oddle-mp-auth-token"] = r.userMpAuthToken), r != null && r.chatServerKey && (a["x-oddle-chat-server-key"] = r.chatServerKey);
  const s = await fetch(i, {
    method: "PATCH",
    headers: a,
    body: JSON.stringify(n)
  });
  if (!s.ok) {
    const l = await s.json().catch(() => ({
      error: "Failed to update thread metadata"
    }));
    throw new Error(l.error || "Failed to update thread metadata");
  }
  const o = await s.json();
  if (!o.success)
    throw new Error(o.error || "Failed to update thread metadata");
  return o.data;
}
class Ul {
  constructor() {
    q(this, "config");
    q(this, "connectionState");
    q(this, "wsManager");
    q(this, "messageHandler");
    q(this, "initResolve");
    q(this, "initReject");
    // Client tools and context
    q(this, "toolSchemas", []);
    q(this, "componentSchemas", []);
    q(this, "contextHelpers", {});
    // Ticket management - now centralized in TicketManager
    q(this, "ticketManager", null);
    // Authentication credentials for HTTP API calls
    q(this, "authCredentials", {});
    this.config = {
      ..._l
    }, this.connectionState = new Rl(), this.wsManager = new vl(this.config, this.connectionState), this.messageHandler = new Ml({}), this.setupWebSocketHandlers();
  }
  setupWebSocketHandlers() {
    this.wsManager.setEventHandlers({
      onMessage: (e) => this.handleWebSocketMessage(e),
      onOpen: () => this.handleConnectionOpen(),
      onSystemEvent: (e) => {
        var r, i;
        (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onSystemEvent) == null || i.call(r, e);
      },
      onTicketRefresh: async () => {
        if (!this.ticketManager)
          throw new Error("TicketManager not available for ticket refresh");
        return await this.ticketManager.getValidTicket();
      },
      onTicketValidate: async () => {
        if (!this.ticketManager)
          return !1;
        try {
          return (await this.ticketManager.validateWithServer()).valid;
        } catch {
          return !1;
        }
      }
    }), this.messageHandler.setSendMessageHandler(
      (e) => this.wsManager.send(e)
    );
  }
  handleWebSocketMessage(e) {
    var r, i, a, s;
    const n = this.messageHandler.handleMessage(e);
    if ((n == null ? void 0 : n.type) === "authentication_error" && this.handleAuthenticationFailure(n), (n == null ? void 0 : n.type) === Xe.THREAD_CREATED) {
      (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onThreadCreated) == null || i.call(r, n.data);
      return;
    }
    if ((n == null ? void 0 : n.type) === Xe.TOOLS_CONFIGURED) {
      (a = this.initResolve) == null || a.call(this);
      return;
    }
    if ((n == null ? void 0 : n.type) === Xe.SESSION_ESTABLISHED) {
      const o = this.toolSchemas && this.toolSchemas.length > 0, l = this.componentSchemas && this.componentSchemas.length > 0;
      o || l ? this.sendToolConfiguration() : (s = this.initResolve) == null || s.call(this);
    }
  }
  handleConnectionOpen() {
  }
  handleAuthenticationFailure(e) {
    var r;
    const n = e;
    (n == null ? void 0 : n.code) === "TICKET_INVALID" || (n == null ? void 0 : n.code) === "TICKET_EXPIRED" ? this.refreshTicketAndReconnect().catch((i) => {
      var s;
      mn(i, "TicketRefresh").isRetryable, (s = this.initReject) == null || s.call(this, i);
    }) : (r = this.initReject) == null || r.call(
      this,
      new Error(`Authentication failed: ${n == null ? void 0 : n.error}`)
    );
  }
  sendToolConfiguration() {
    const e = Wt.serializeConfigureTools(
      this.toolSchemas,
      this.contextHelpers,
      this.componentSchemas.length > 0 ? this.componentSchemas : void 0
    );
    this.wsManager.send(e);
  }
  async onInit(e) {
    return this.setupEventHandlers(e), this.setupToolsAndContext(e), this.updateConfig(e), this.authCredentials = {
      userMpAuthToken: e.userMpAuthToken,
      chatServerKey: e.chatServerKey
    }, this.ticketManager = new Dl(
      {
        userMpAuthToken: e.userMpAuthToken,
        chatServerKey: e.chatServerKey,
        entityId: e.entityId,
        entityType: e.entityType
      },
      this.config.apiUrl,
      {
        onError: e.onError
      }
    ), new Promise(async (n, r) => {
      this.initResolve = n, this.initReject = r;
      try {
        const i = await this.ticketManager.getValidTicket();
        await this.wsManager.connect(i);
      } catch (i) {
        r(i);
      }
    });
  }
  setupEventHandlers(e) {
    const n = {
      onSetMessage: e.onSetMessage,
      onSystemEvent: e.onSystemEvent,
      onReasoningUpdate: e.onReasoningUpdate,
      onUIComponent: e.onUIComponent,
      onThreadCreated: e.onThreadCreated,
      onMessagesPersisted: e.onMessagesPersisted
    };
    this.messageHandler.updateEventHandlers(n);
  }
  setupToolsAndContext(e) {
    this.toolSchemas = e.toolSchemas || [], this.componentSchemas = e.componentSchemas || [], this.contextHelpers = e.contextHelpers, e.clientTools && this.messageHandler.updateClientTools(e.clientTools);
  }
  updateConfig(e) {
    e.chatServerUrl && (this.config.apiUrl = e.chatServerUrl);
  }
  async onTriggerMessage(e) {
    const n = this.wsManager.getWebSocketState();
    if (!this.connectionState.isConnected || n !== "OPEN") {
      const l = "Connection lost. Please check your internet connection and try again.";
      throw new Error(l);
    }
    const { message: i, media: a, providerResId: s, mcpHeaders: o } = e;
    try {
      this.messageHandler.clearProcessedToolCalls();
      const l = Wt.serializeChatMessage({
        content: i,
        media: a,
        providerResId: s,
        mcpHeaders: o
      });
      this.wsManager.send(l);
    } catch (l) {
      throw this.wsManager.getWebSocketState() !== "OPEN" ? new Error("Connection lost during message send. Please try again.") : l;
    }
  }
  disconnect() {
    var e, n;
    (e = this.ticketManager) == null || e.stopProactiveRenewal(), (n = this.ticketManager) == null || n.clear(), this.wsManager.disconnect();
  }
  isClientConnected() {
    return this.connectionState.isConnected;
  }
  updateContextHelpers(e) {
    this.contextHelpers = { ...this.contextHelpers, ...e };
    const n = Wt.serializeUpdateContextHelpers(
      this.contextHelpers
    );
    this.wsManager.send(n);
  }
  addClientTools(e, n) {
    this.messageHandler.updateClientTools(e), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = Wt.serializeUpdateTools(
      this.toolSchemas,
      this.componentSchemas.length > 0 ? this.componentSchemas : void 0
    );
    this.wsManager.send(r);
  }
  /**
   * Update client-side tool executors without modifying schemas or reconnecting
   * This ensures fresh closures when useCallback dependencies change
   */
  updateClientTools(e) {
    this.messageHandler.updateClientTools(e);
  }
  getConnectionStatus() {
    var e, n;
    return {
      connected: this.connectionState.isConnected,
      reconnectAttempts: this.connectionState.reconnectAttempts,
      isReconnecting: this.connectionState.isReconnecting,
      websocketState: this.wsManager.getWebSocketState(),
      hasValidTicket: ((e = this.ticketManager) == null ? void 0 : e.isValid()) ?? !1,
      ticketExpiresIn: (n = this.ticketManager) == null ? void 0 : n.getExpiresIn()
    };
  }
  /**
   * Force refresh the WebSocket ticket and reconnect
   * Useful when authentication fails or ticket expires
   */
  async refreshTicketAndReconnect() {
    try {
      if (!this.ticketManager)
        throw new Error("TicketManager not initialized");
      this.wsManager.disconnect();
      const e = await this.ticketManager.refreshTicket();
      this.wsManager.updateTicket(e), await this.wsManager.connect();
    } catch (e) {
      throw e;
    }
  }
  /**
   * Check if current ticket is valid
   */
  isTicketValid() {
    var e;
    return ((e = this.ticketManager) == null ? void 0 : e.isValid()) ?? !1;
  }
  /**
   * Manual reconnection method for UI to call
   * Useful for "Reconnect" buttons or retry logic
   */
  async reconnect() {
    await this.refreshTicketAndReconnect();
  }
  /**
   * Stop the current conversation run
   * Sends a stop_run message to the server to halt the current response generation
   */
  stopRun(e) {
    if (!this.connectionState.isConnected)
      return;
    const n = Wt.serializeStopRun(e);
    this.wsManager.send(n);
  }
  /**
   * Update entity information (entityId and entityType) for a conversation
   * This is useful when a conversation starts without an entity,
   * then later gets associated with one (e.g., user creates/selects an entity)
   *
   * This method:
   * 1. Makes an HTTP PATCH request to persist the entity attachment on the server
   * 2. Updates the local TicketManager auth data for future ticket renewals
   *
   * Note: This should be used for changing entity ownership (rare).
   * For updating business context (orderId, tableId, etc.), use updateMetadata() instead.
   *
   * @param providerResId - Provider resource ID (conversationId) of the thread to update
   * @param entityId - New entity ID to associate with this conversation
   * @param entityType - Entity type (BRAND or ACCOUNT)
   * @returns Promise that resolves when the update is complete
   *
   * @example
   * await client.updateEntityId('conv_abc123', 'brand_456', 'BRAND');
   */
  async updateEntityId(e, n, r) {
    if (!this.ticketManager)
      throw new Error(
        "WebSocketChatClient: Cannot update entityId - TicketManager not initialized"
      );
    try {
      await Hl(
        this.config.apiUrl,
        e,
        {
          entityId: n,
          entityType: r
        },
        this.authCredentials
      );
      const i = { entityId: n, entityType: r };
      this.ticketManager.updateAuthData(i);
    } catch (i) {
      throw i;
    }
  }
  /**
   * Update thread metadata and/or tag for a conversation
   * This is useful for updating dynamic business context without changing entity ownership
   *
   * Use this for frequently changing data like:
   * - Order IDs, table IDs, campaign IDs
   * - Status updates, priority changes
   * - Custom app-specific metadata
   *
   * This method makes an HTTP PATCH request to update only the metadata/tag fields,
   * leaving entityId and entityType unchanged.
   *
   * @param providerResId - Provider resource ID (conversationId) of the thread to update
   * @param updates - Metadata and/or tag to update
   * @returns Promise that resolves when the update is complete
   *
   * @example
   * await client.updateMetadata('conv_abc123', {
   *   metadata: { orderId: 'order_789', tableId: 'table_5', status: 'pending' }
   * });
   *
   * @example
   * await client.updateMetadata('conv_abc123', {
   *   tag: 'high-priority',
   *   metadata: { priority: 'urgent', assignedTo: 'agent-123' }
   * });
   */
  async updateMetadata(e, n) {
    try {
      await zl(
        this.config.apiUrl,
        e,
        n,
        this.authCredentials
      );
    } catch (r) {
      throw r;
    }
  }
}
function Bl({
  // Authentication and server properties
  userMpAuthToken: t,
  chatServerUrl: e,
  chatServerKey: n,
  // Entity configuration
  entityId: r,
  entityType: i,
  // Tools configuration
  tools: a,
  // Generative-UI components
  componentSchemas: s,
  // Other properties
  contextHelpers: o,
  onSetMessage: l,
  onSystemEvent: u,
  onReasoningUpdate: c,
  onUIComponent: d,
  onThreadCreated: g,
  onMessagesPersisted: h,
  onError: C
}) {
  const [k, I] = ke(
    null
  ), [b, E] = ke(
    Ge.DISCONNECTED
  ), [R, M] = ke(0), [D, T] = ke(!0), z = oe(null), U = oe(l), V = oe(u), K = oe(c), ie = oe(d), B = oe(g), N = oe(h), L = oe(t), O = oe(e), ee = oe(n), W = oe(r), de = oe(i), _e = oe(a), w = oe(a);
  Ne(() => {
    JSON.stringify(a) !== JSON.stringify(_e.current) && (_e.current = a, w.current = a);
  }, [a]);
  const te = oe(
    s
  ), G = oe(
    s
  );
  Ne(() => {
    JSON.stringify(s) !== JSON.stringify(te.current) && (te.current = s, G.current = s);
  }, [s]);
  const y = oe(o), re = oe(
    o
  );
  Ne(() => {
    JSON.stringify(o) !== JSON.stringify(y.current) && (y.current = o, re.current = o, z.current && o && z.current.updateContextHelpers(o));
  }, [o]), Ne(() => {
    U.current = l, V.current = u, K.current = c, ie.current = d, B.current = g, N.current = h, L.current = t, O.current = e, ee.current = n, W.current = r, de.current = i;
  }, [
    l,
    u,
    c,
    d,
    g,
    h,
    t,
    e,
    n,
    r,
    i
  ]);
  const Z = Ue(() => {
    const Ce = w.current;
    return Ce && Ce.length > 0 ? Ce.map(({ execute: fe, ...Ee }) => Ee) : [];
  }, [w.current]), se = Ue(() => {
    if (a && a.length > 0) {
      const Ce = {};
      return a.forEach((fe) => {
        Ce[fe.name] = fe.execute;
      }), Ce;
    }
    return {};
  }, [a]);
  Ne(() => {
    z.current && Object.keys(se).length > 0 && z.current.updateClientTools(se);
  }, [se]);
  const me = oe(), X = ne(async () => {
    var Ce;
    try {
      if (!navigator.onLine)
        throw E(Ge.DISCONNECTED), T(!1), new Error("No internet connection. Please check your network and try again.");
      if (E(Ge.CONNECTING), !L.current)
        throw new Error("userMpAuthToken is required");
      if (!O.current)
        throw new Error("chatServerUrl is required");
      if (!ee.current)
        throw new Error("chatServerKey is required");
      const fe = new Ul();
      z.current = fe, I(fe);
      const Ee = re.current || {};
      await fe.onInit({
        // Authentication and server properties (from refs)
        userMpAuthToken: L.current,
        chatServerUrl: O.current,
        chatServerKey: ee.current,
        entityId: W.current,
        entityType: (Ce = de.current) == null ? void 0 : Ce.toString(),
        // Tools configuration
        toolSchemas: Z,
        clientTools: se,
        componentSchemas: G.current,
        contextHelpers: Ee,
        onSetMessage: U.current,
        onSystemEvent: V.current,
        onReasoningUpdate: K.current,
        onUIComponent: (xe) => {
          var Ye;
          return (Ye = ie.current) == null ? void 0 : Ye.call(ie, xe);
        },
        onThreadCreated: B.current,
        onMessagesPersisted: N.current,
        onError: C
      }), E(Ge.CONNECTED), T(!1);
    } catch (fe) {
      const Ee = mn(fe, "WebSocketConnection");
      E(Ge.DISCONNECTED), Ee.isRetryable ? setTimeout(() => {
        var xe;
        (z.current === null || !z.current.getConnectionStatus().connected) && ((xe = me.current) == null || xe.call(me));
      }, 2e3) : T(!1);
    }
  }, [
    Z,
    se
    // All other props use refs to prevent reconnections
    // connectChatClient only recreates when tools change
  ]), Ae = ne(() => {
    z.current && (z.current.disconnect(), z.current = null), I(null), E(Ge.DISCONNECTED);
  }, []);
  me.current = X;
  const Te = oe(!1);
  return Ne(() => (Te.current || (Te.current = !0, X()), () => {
    Ae();
  }), []), Ne(() => {
    const Ce = setInterval(() => {
      if (z.current) {
        const fe = z.current.getConnectionStatus();
        if (D && b === Ge.CONNECTING)
          return;
        fe.connected && b !== Ge.CONNECTED ? E(Ge.CONNECTED) : fe.isReconnecting && b !== Ge.RECONNECTING ? E(Ge.RECONNECTING) : !fe.connected && !fe.isReconnecting && b !== Ge.DISCONNECTED && E(Ge.DISCONNECTED), M(fe.reconnectAttempts);
      }
    }, 1e3);
    return () => clearInterval(Ce);
  }, [b, D]), {
    chatClient: k,
    connectionState: b,
    reconnectAttempts: R,
    isInitialConnection: D,
    connectChatClient: X,
    disconnectChatClient: Ae
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: Ss,
  setPrototypeOf: Vi,
  isFrozen: $l,
  getPrototypeOf: jl,
  getOwnPropertyDescriptor: Vl
} = Object;
let {
  freeze: at,
  seal: St,
  create: Yr
} = Object, {
  apply: Jr,
  construct: Qr
} = typeof Reflect < "u" && Reflect;
at || (at = function(e) {
  return e;
});
St || (St = function(e) {
  return e;
});
Jr || (Jr = function(e, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return e.apply(n, i);
});
Qr || (Qr = function(e) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new e(...r);
});
const Xn = st(Array.prototype.forEach), Wl = st(Array.prototype.lastIndexOf), Wi = st(Array.prototype.pop), vn = st(Array.prototype.push), Gl = st(Array.prototype.splice), ir = st(String.prototype.toLowerCase), _r = st(String.prototype.toString), vr = st(String.prototype.match), Rn = st(String.prototype.replace), Zl = st(String.prototype.indexOf), ql = st(String.prototype.trim), Et = st(Object.prototype.hasOwnProperty), it = st(RegExp.prototype.test), In = Kl(TypeError);
function st(t) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Jr(t, e, r);
  };
}
function Kl(t) {
  return function() {
    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
      n[r] = arguments[r];
    return Qr(t, n);
  };
}
function ye(t, e) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ir;
  Vi && Vi(t, null);
  let r = e.length;
  for (; r--; ) {
    let i = e[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && ($l(e) || (e[r] = a), i = a);
    }
    t[i] = !0;
  }
  return t;
}
function Xl(t) {
  for (let e = 0; e < t.length; e++)
    Et(t, e) || (t[e] = null);
  return t;
}
function Vt(t) {
  const e = Yr(null);
  for (const [n, r] of Ss(t))
    Et(t, n) && (Array.isArray(r) ? e[n] = Xl(r) : r && typeof r == "object" && r.constructor === Object ? e[n] = Vt(r) : e[n] = r);
  return e;
}
function Nn(t, e) {
  for (; t !== null; ) {
    const r = Vl(t, e);
    if (r) {
      if (r.get)
        return st(r.get);
      if (typeof r.value == "function")
        return st(r.value);
    }
    t = jl(t);
  }
  function n() {
    return null;
  }
  return n;
}
const Gi = at(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Rr = at(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Ir = at(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Yl = at(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Nr = at(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Jl = at(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Zi = at(["#text"]), qi = at(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Ar = at(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Ki = at(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Yn = at(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Ql = St(/\{\{[\w\W]*|[\w\W]*\}\}/gm), ec = St(/<%[\w\W]*|[\w\W]*%>/gm), tc = St(/\$\{[\w\W]*/gm), nc = St(/^data-[\-\w.\u00B7-\uFFFF]+$/), rc = St(/^aria-[\-\w]+$/), xs = St(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), ic = St(/^(?:\w+script|data):/i), ac = St(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), ks = St(/^html$/i), sc = St(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Xi = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: rc,
  ATTR_WHITESPACE: ac,
  CUSTOM_ELEMENT: sc,
  DATA_ATTR: nc,
  DOCTYPE_NAME: ks,
  ERB_EXPR: ec,
  IS_ALLOWED_URI: xs,
  IS_SCRIPT_OR_DATA: ic,
  MUSTACHE_EXPR: Ql,
  TMPLIT_EXPR: tc
});
const An = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, oc = function() {
  return typeof window > "u" ? null : window;
}, lc = function(e, n) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let r = null;
  const i = "data-tt-policy-suffix";
  n && n.hasAttribute(i) && (r = n.getAttribute(i));
  const a = "dompurify" + (r ? "#" + r : "");
  try {
    return e.createPolicy(a, {
      createHTML(s) {
        return s;
      },
      createScriptURL(s) {
        return s;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + a + " could not be created."), null;
  }
}, Yi = function() {
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
function bs() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : oc();
  const e = (J) => bs(J);
  if (e.version = "3.3.0", e.removed = [], !t || !t.document || t.document.nodeType !== An.document || !t.Element)
    return e.isSupported = !1, e;
  let {
    document: n
  } = t;
  const r = n, i = r.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: s,
    Node: o,
    Element: l,
    NodeFilter: u,
    NamedNodeMap: c = t.NamedNodeMap || t.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: g,
    trustedTypes: h
  } = t, C = l.prototype, k = Nn(C, "cloneNode"), I = Nn(C, "remove"), b = Nn(C, "nextSibling"), E = Nn(C, "childNodes"), R = Nn(C, "parentNode");
  if (typeof s == "function") {
    const J = n.createElement("template");
    J.content && J.content.ownerDocument && (n = J.content.ownerDocument);
  }
  let M, D = "";
  const {
    implementation: T,
    createNodeIterator: z,
    createDocumentFragment: U,
    getElementsByTagName: V
  } = n, {
    importNode: K
  } = r;
  let ie = Yi();
  e.isSupported = typeof Ss == "function" && typeof R == "function" && T && T.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: B,
    ERB_EXPR: N,
    TMPLIT_EXPR: L,
    DATA_ATTR: O,
    ARIA_ATTR: ee,
    IS_SCRIPT_OR_DATA: W,
    ATTR_WHITESPACE: de,
    CUSTOM_ELEMENT: _e
  } = Xi;
  let {
    IS_ALLOWED_URI: w
  } = Xi, te = null;
  const G = ye({}, [...Gi, ...Rr, ...Ir, ...Nr, ...Zi]);
  let y = null;
  const re = ye({}, [...qi, ...Ar, ...Ki, ...Yn]);
  let Z = Object.seal(Yr(null, {
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
  })), se = null, me = null;
  const X = Object.seal(Yr(null, {
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
  let Ae = !0, Te = !0, Ce = !1, fe = !0, Ee = !1, xe = !0, Ye = !1, Ht = !1, zt = !1, xt = !1, Rt = !1, It = !1, Qt = !0, an = !1;
  const xn = "user-content-";
  let Gt = !0, Nt = !1, _ = {}, v = null;
  const $ = ye({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let ue = null;
  const we = ye({}, ["audio", "video", "img", "source", "image", "track"]);
  let $e = null;
  const yt = ye({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Je = "http://www.w3.org/1998/Math/MathML", ve = "http://www.w3.org/2000/svg", De = "http://www.w3.org/1999/xhtml";
  let Fe = De, qe = !1, Qe = null;
  const kn = ye({}, [Je, ve, De], _r);
  let sn = ye({}, ["mi", "mo", "mn", "ms", "mtext"]), kt = ye({}, ["annotation-xml"]);
  const on = ye({}, ["title", "style", "font", "a", "script"]);
  let Ut = null;
  const Gn = ["application/xhtml+xml", "text/html"], xr = "text/html";
  let je = null, Bt = null;
  const Zn = n.createElement("form"), bn = function(S) {
    return S instanceof RegExp || S instanceof Function;
  }, ln = function() {
    let S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Bt && Bt === S)) {
      if ((!S || typeof S != "object") && (S = {}), S = Vt(S), Ut = // eslint-disable-next-line unicorn/prefer-includes
      Gn.indexOf(S.PARSER_MEDIA_TYPE) === -1 ? xr : S.PARSER_MEDIA_TYPE, je = Ut === "application/xhtml+xml" ? _r : ir, te = Et(S, "ALLOWED_TAGS") ? ye({}, S.ALLOWED_TAGS, je) : G, y = Et(S, "ALLOWED_ATTR") ? ye({}, S.ALLOWED_ATTR, je) : re, Qe = Et(S, "ALLOWED_NAMESPACES") ? ye({}, S.ALLOWED_NAMESPACES, _r) : kn, $e = Et(S, "ADD_URI_SAFE_ATTR") ? ye(Vt(yt), S.ADD_URI_SAFE_ATTR, je) : yt, ue = Et(S, "ADD_DATA_URI_TAGS") ? ye(Vt(we), S.ADD_DATA_URI_TAGS, je) : we, v = Et(S, "FORBID_CONTENTS") ? ye({}, S.FORBID_CONTENTS, je) : $, se = Et(S, "FORBID_TAGS") ? ye({}, S.FORBID_TAGS, je) : Vt({}), me = Et(S, "FORBID_ATTR") ? ye({}, S.FORBID_ATTR, je) : Vt({}), _ = Et(S, "USE_PROFILES") ? S.USE_PROFILES : !1, Ae = S.ALLOW_ARIA_ATTR !== !1, Te = S.ALLOW_DATA_ATTR !== !1, Ce = S.ALLOW_UNKNOWN_PROTOCOLS || !1, fe = S.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ee = S.SAFE_FOR_TEMPLATES || !1, xe = S.SAFE_FOR_XML !== !1, Ye = S.WHOLE_DOCUMENT || !1, xt = S.RETURN_DOM || !1, Rt = S.RETURN_DOM_FRAGMENT || !1, It = S.RETURN_TRUSTED_TYPE || !1, zt = S.FORCE_BODY || !1, Qt = S.SANITIZE_DOM !== !1, an = S.SANITIZE_NAMED_PROPS || !1, Gt = S.KEEP_CONTENT !== !1, Nt = S.IN_PLACE || !1, w = S.ALLOWED_URI_REGEXP || xs, Fe = S.NAMESPACE || De, sn = S.MATHML_TEXT_INTEGRATION_POINTS || sn, kt = S.HTML_INTEGRATION_POINTS || kt, Z = S.CUSTOM_ELEMENT_HANDLING || {}, S.CUSTOM_ELEMENT_HANDLING && bn(S.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (Z.tagNameCheck = S.CUSTOM_ELEMENT_HANDLING.tagNameCheck), S.CUSTOM_ELEMENT_HANDLING && bn(S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (Z.attributeNameCheck = S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), S.CUSTOM_ELEMENT_HANDLING && typeof S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (Z.allowCustomizedBuiltInElements = S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Ee && (Te = !1), Rt && (xt = !0), _ && (te = ye({}, Zi), y = [], _.html === !0 && (ye(te, Gi), ye(y, qi)), _.svg === !0 && (ye(te, Rr), ye(y, Ar), ye(y, Yn)), _.svgFilters === !0 && (ye(te, Ir), ye(y, Ar), ye(y, Yn)), _.mathMl === !0 && (ye(te, Nr), ye(y, Ki), ye(y, Yn))), S.ADD_TAGS && (typeof S.ADD_TAGS == "function" ? X.tagCheck = S.ADD_TAGS : (te === G && (te = Vt(te)), ye(te, S.ADD_TAGS, je))), S.ADD_ATTR && (typeof S.ADD_ATTR == "function" ? X.attributeCheck = S.ADD_ATTR : (y === re && (y = Vt(y)), ye(y, S.ADD_ATTR, je))), S.ADD_URI_SAFE_ATTR && ye($e, S.ADD_URI_SAFE_ATTR, je), S.FORBID_CONTENTS && (v === $ && (v = Vt(v)), ye(v, S.FORBID_CONTENTS, je)), Gt && (te["#text"] = !0), Ye && ye(te, ["html", "head", "body"]), te.table && (ye(te, ["tbody"]), delete se.tbody), S.TRUSTED_TYPES_POLICY) {
        if (typeof S.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw In('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof S.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw In('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        M = S.TRUSTED_TYPES_POLICY, D = M.createHTML("");
      } else
        M === void 0 && (M = lc(h, i)), M !== null && typeof D == "string" && (D = M.createHTML(""));
      at && at(S), Bt = S;
    }
  }, Tn = ye({}, [...Rr, ...Ir, ...Yl]), En = ye({}, [...Nr, ...Jl]), qn = function(S) {
    let H = R(S);
    (!H || !H.tagName) && (H = {
      namespaceURI: Fe,
      tagName: "template"
    });
    const Q = ir(S.tagName), Pe = ir(H.tagName);
    return Qe[S.namespaceURI] ? S.namespaceURI === ve ? H.namespaceURI === De ? Q === "svg" : H.namespaceURI === Je ? Q === "svg" && (Pe === "annotation-xml" || sn[Pe]) : !!Tn[Q] : S.namespaceURI === Je ? H.namespaceURI === De ? Q === "math" : H.namespaceURI === ve ? Q === "math" && kt[Pe] : !!En[Q] : S.namespaceURI === De ? H.namespaceURI === ve && !kt[Pe] || H.namespaceURI === Je && !sn[Pe] ? !1 : !En[Q] && (on[Q] || !Tn[Q]) : !!(Ut === "application/xhtml+xml" && Qe[S.namespaceURI]) : !1;
  }, pt = function(S) {
    vn(e.removed, {
      element: S
    });
    try {
      R(S).removeChild(S);
    } catch {
      I(S);
    }
  }, $t = function(S, H) {
    try {
      vn(e.removed, {
        attribute: H.getAttributeNode(S),
        from: H
      });
    } catch {
      vn(e.removed, {
        attribute: null,
        from: H
      });
    }
    if (H.removeAttribute(S), S === "is")
      if (xt || Rt)
        try {
          pt(H);
        } catch {
        }
      else
        try {
          H.setAttribute(S, "");
        } catch {
        }
  }, kr = function(S) {
    let H = null, Q = null;
    if (zt)
      S = "<remove></remove>" + S;
    else {
      const Ve = vr(S, /^[\r\n\t ]+/);
      Q = Ve && Ve[0];
    }
    Ut === "application/xhtml+xml" && Fe === De && (S = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + S + "</body></html>");
    const Pe = M ? M.createHTML(S) : S;
    if (Fe === De)
      try {
        H = new g().parseFromString(Pe, Ut);
      } catch {
      }
    if (!H || !H.documentElement) {
      H = T.createDocument(Fe, "template", null);
      try {
        H.documentElement.innerHTML = qe ? D : Pe;
      } catch {
      }
    }
    const et = H.body || H.documentElement;
    return S && Q && et.insertBefore(n.createTextNode(Q), et.childNodes[0] || null), Fe === De ? V.call(H, Ye ? "html" : "body")[0] : Ye ? H.documentElement : et;
  }, _n = function(S) {
    return z.call(
      S.ownerDocument || S,
      S,
      // eslint-disable-next-line no-bitwise
      u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT | u.SHOW_PROCESSING_INSTRUCTION | u.SHOW_CDATA_SECTION,
      null
    );
  }, cn = function(S) {
    return S instanceof d && (typeof S.nodeName != "string" || typeof S.textContent != "string" || typeof S.removeChild != "function" || !(S.attributes instanceof c) || typeof S.removeAttribute != "function" || typeof S.setAttribute != "function" || typeof S.namespaceURI != "string" || typeof S.insertBefore != "function" || typeof S.hasChildNodes != "function");
  }, A = function(S) {
    return typeof o == "function" && S instanceof o;
  };
  function ge(J, S, H) {
    Xn(J, (Q) => {
      Q.call(e, S, H, Bt);
    });
  }
  const ze = function(S) {
    let H = null;
    if (ge(ie.beforeSanitizeElements, S, null), cn(S))
      return pt(S), !0;
    const Q = je(S.nodeName);
    if (ge(ie.uponSanitizeElement, S, {
      tagName: Q,
      allowedTags: te
    }), xe && S.hasChildNodes() && !A(S.firstElementChild) && it(/<[/\w!]/g, S.innerHTML) && it(/<[/\w!]/g, S.textContent) || S.nodeType === An.progressingInstruction || xe && S.nodeType === An.comment && it(/<[/\w]/g, S.data))
      return pt(S), !0;
    if (!(X.tagCheck instanceof Function && X.tagCheck(Q)) && (!te[Q] || se[Q])) {
      if (!se[Q] && Ie(Q) && (Z.tagNameCheck instanceof RegExp && it(Z.tagNameCheck, Q) || Z.tagNameCheck instanceof Function && Z.tagNameCheck(Q)))
        return !1;
      if (Gt && !v[Q]) {
        const Pe = R(S) || S.parentNode, et = E(S) || S.childNodes;
        if (et && Pe) {
          const Ve = et.length;
          for (let lt = Ve - 1; lt >= 0; --lt) {
            const jt = k(et[lt], !0);
            jt.__removalCount = (S.__removalCount || 0) + 1, Pe.insertBefore(jt, b(S));
          }
        }
      }
      return pt(S), !0;
    }
    return S instanceof l && !qn(S) || (Q === "noscript" || Q === "noembed" || Q === "noframes") && it(/<\/no(script|embed|frames)/i, S.innerHTML) ? (pt(S), !0) : (Ee && S.nodeType === An.text && (H = S.textContent, Xn([B, N, L], (Pe) => {
      H = Rn(H, Pe, " ");
    }), S.textContent !== H && (vn(e.removed, {
      element: S.cloneNode()
    }), S.textContent = H)), ge(ie.afterSanitizeElements, S, null), !1);
  }, He = function(S, H, Q) {
    if (Qt && (H === "id" || H === "name") && (Q in n || Q in Zn))
      return !1;
    if (!(Te && !me[H] && it(O, H))) {
      if (!(Ae && it(ee, H))) {
        if (!(X.attributeCheck instanceof Function && X.attributeCheck(H, S))) {
          if (!y[H] || me[H]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Ie(S) && (Z.tagNameCheck instanceof RegExp && it(Z.tagNameCheck, S) || Z.tagNameCheck instanceof Function && Z.tagNameCheck(S)) && (Z.attributeNameCheck instanceof RegExp && it(Z.attributeNameCheck, H) || Z.attributeNameCheck instanceof Function && Z.attributeNameCheck(H, S)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              H === "is" && Z.allowCustomizedBuiltInElements && (Z.tagNameCheck instanceof RegExp && it(Z.tagNameCheck, Q) || Z.tagNameCheck instanceof Function && Z.tagNameCheck(Q)))
            ) return !1;
          } else if (!$e[H]) {
            if (!it(w, Rn(Q, de, ""))) {
              if (!((H === "src" || H === "xlink:href" || H === "href") && S !== "script" && Zl(Q, "data:") === 0 && ue[S])) {
                if (!(Ce && !it(W, Rn(Q, de, "")))) {
                  if (Q)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Ie = function(S) {
    return S !== "annotation-xml" && vr(S, _e);
  }, Be = function(S) {
    ge(ie.beforeSanitizeAttributes, S, null);
    const {
      attributes: H
    } = S;
    if (!H || cn(S))
      return;
    const Q = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: y,
      forceKeepAttr: void 0
    };
    let Pe = H.length;
    for (; Pe--; ) {
      const et = H[Pe], {
        name: Ve,
        namespaceURI: lt,
        value: jt
      } = et, un = je(Ve), br = jt;
      let Ke = Ve === "value" ? br : ql(br);
      if (Q.attrName = un, Q.attrValue = Ke, Q.keepAttr = !0, Q.forceKeepAttr = void 0, ge(ie.uponSanitizeAttribute, S, Q), Ke = Q.attrValue, an && (un === "id" || un === "name") && ($t(Ve, S), Ke = xn + Ke), xe && it(/((--!?|])>)|<\/(style|title|textarea)/i, Ke)) {
        $t(Ve, S);
        continue;
      }
      if (un === "attributename" && vr(Ke, "href")) {
        $t(Ve, S);
        continue;
      }
      if (Q.forceKeepAttr)
        continue;
      if (!Q.keepAttr) {
        $t(Ve, S);
        continue;
      }
      if (!fe && it(/\/>/i, Ke)) {
        $t(Ve, S);
        continue;
      }
      Ee && Xn([B, N, L], (zi) => {
        Ke = Rn(Ke, zi, " ");
      });
      const Hi = je(S.nodeName);
      if (!He(Hi, un, Ke)) {
        $t(Ve, S);
        continue;
      }
      if (M && typeof h == "object" && typeof h.getAttributeType == "function" && !lt)
        switch (h.getAttributeType(Hi, un)) {
          case "TrustedHTML": {
            Ke = M.createHTML(Ke);
            break;
          }
          case "TrustedScriptURL": {
            Ke = M.createScriptURL(Ke);
            break;
          }
        }
      if (Ke !== br)
        try {
          lt ? S.setAttributeNS(lt, Ve, Ke) : S.setAttribute(Ve, Ke), cn(S) ? pt(S) : Wi(e.removed);
        } catch {
          $t(Ve, S);
        }
    }
    ge(ie.afterSanitizeAttributes, S, null);
  }, Zt = function J(S) {
    let H = null;
    const Q = _n(S);
    for (ge(ie.beforeSanitizeShadowDOM, S, null); H = Q.nextNode(); )
      ge(ie.uponSanitizeShadowNode, H, null), ze(H), Be(H), H.content instanceof a && J(H.content);
    ge(ie.afterSanitizeShadowDOM, S, null);
  };
  return e.sanitize = function(J) {
    let S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, H = null, Q = null, Pe = null, et = null;
    if (qe = !J, qe && (J = "<!-->"), typeof J != "string" && !A(J))
      if (typeof J.toString == "function") {
        if (J = J.toString(), typeof J != "string")
          throw In("dirty is not a string, aborting");
      } else
        throw In("toString is not a function");
    if (!e.isSupported)
      return J;
    if (Ht || ln(S), e.removed = [], typeof J == "string" && (Nt = !1), Nt) {
      if (J.nodeName) {
        const jt = je(J.nodeName);
        if (!te[jt] || se[jt])
          throw In("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (J instanceof o)
      H = kr("<!---->"), Q = H.ownerDocument.importNode(J, !0), Q.nodeType === An.element && Q.nodeName === "BODY" || Q.nodeName === "HTML" ? H = Q : H.appendChild(Q);
    else {
      if (!xt && !Ee && !Ye && // eslint-disable-next-line unicorn/prefer-includes
      J.indexOf("<") === -1)
        return M && It ? M.createHTML(J) : J;
      if (H = kr(J), !H)
        return xt ? null : It ? D : "";
    }
    H && zt && pt(H.firstChild);
    const Ve = _n(Nt ? J : H);
    for (; Pe = Ve.nextNode(); )
      ze(Pe), Be(Pe), Pe.content instanceof a && Zt(Pe.content);
    if (Nt)
      return J;
    if (xt) {
      if (Rt)
        for (et = U.call(H.ownerDocument); H.firstChild; )
          et.appendChild(H.firstChild);
      else
        et = H;
      return (y.shadowroot || y.shadowrootmode) && (et = K.call(r, et, !0)), et;
    }
    let lt = Ye ? H.outerHTML : H.innerHTML;
    return Ye && te["!doctype"] && H.ownerDocument && H.ownerDocument.doctype && H.ownerDocument.doctype.name && it(ks, H.ownerDocument.doctype.name) && (lt = "<!DOCTYPE " + H.ownerDocument.doctype.name + `>
` + lt), Ee && Xn([B, N, L], (jt) => {
      lt = Rn(lt, jt, " ");
    }), M && It ? M.createHTML(lt) : lt;
  }, e.setConfig = function() {
    let J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    ln(J), Ht = !0;
  }, e.clearConfig = function() {
    Bt = null, Ht = !1;
  }, e.isValidAttribute = function(J, S, H) {
    Bt || ln({});
    const Q = je(J), Pe = je(S);
    return He(Q, Pe, H);
  }, e.addHook = function(J, S) {
    typeof S == "function" && vn(ie[J], S);
  }, e.removeHook = function(J, S) {
    if (S !== void 0) {
      const H = Wl(ie[J], S);
      return H === -1 ? void 0 : Gl(ie[J], H, 1)[0];
    }
    return Wi(ie[J]);
  }, e.removeHooks = function(J) {
    ie[J] = [];
  }, e.removeAllHooks = function() {
    ie = Yi();
  }, e;
}
var Ts = bs();
const cc = {
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
function uc(t, e = "userMessage") {
  if (typeof t != "string")
    return console.warn("sanitizeInput received non-string input:", typeof t), "";
  if (!t.trim())
    return "";
  try {
    const n = cc[e], r = Ts.sanitize(t, n);
    return Es(r) ? (console.warn("Suspicious content detected and removed:", t), r.replace(/javascript:/gi, "").replace(/data:/gi, "")) : r;
  } catch (n) {
    return console.error("Error sanitizing input:", n), "";
  }
}
function Es(t) {
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
  ].some((n) => n.test(t));
}
function Si(t, e = !1) {
  const n = "___NEWLINE___", r = t.replace(/\n/g, n);
  return uc(r, e ? "assistantMessage" : "userMessage").replace(new RegExp(n, "g"), `
`);
}
function dc(t) {
  return typeof t != "string" ? "" : t.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function Ji(t) {
  if (typeof t != "string") return !1;
  try {
    const e = new URL(t);
    return !(!["http:", "https:", "data:"].includes(e.protocol) || Es(t));
  } catch {
    return !1;
  }
}
function hc() {
  Ts.addHook("beforeSanitizeAttributes", (t) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      t.hasAttribute(n) && t.removeAttribute(n);
    }), t.hasAttribute("href")) {
      const n = t.getAttribute("href");
      n && !Ji(n) && t.removeAttribute("href");
    }
    if (t.hasAttribute("src")) {
      const n = t.getAttribute("src");
      n && !Ji(n) && t.removeAttribute("src");
    }
  });
}
hc();
function pc() {
  const [t, e] = ke([]), n = ne(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = ne(
    (s, o) => {
      const u = Si(o, s === "assistant");
      e((c) => [
        ...c,
        {
          id: n(),
          role: s,
          content: u,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [n]
  ), i = ne((s, o) => {
    e(
      (l) => l.map((u) => u.id === s ? { ...u, ...o } : u)
    );
  }, []), a = ne(
    (s, o, l) => {
      e(
        (u) => u.map(
          (c) => c.id === s ? {
            ...c,
            content: o,
            isStreaming: l
          } : c
        )
      );
    },
    []
  );
  return {
    messages: t,
    setMessages: e,
    addMessage: r,
    updateMessage: i,
    updateMessageContent: a,
    generateId: n
  };
}
const Qi = (t) => {
  let e;
  const n = /* @__PURE__ */ new Set(), r = (u, c) => {
    const d = typeof u == "function" ? u(e) : u;
    if (!Object.is(d, e)) {
      const g = e;
      e = c ?? (typeof d != "object" || d === null) ? d : Object.assign({}, e, d), n.forEach((h) => h(e, g));
    }
  }, i = () => e, o = { setState: r, getState: i, getInitialState: () => l, subscribe: (u) => (n.add(u), () => n.delete(u)) }, l = e = t(r, i, o);
  return o;
}, fc = (t) => t ? Qi(t) : Qi, gc = (t) => t;
function mc(t, e = gc) {
  const n = _t.useSyncExternalStore(
    t.subscribe,
    _t.useCallback(() => e(t.getState()), [t, e]),
    _t.useCallback(() => e(t.getInitialState()), [t, e])
  );
  return _t.useDebugValue(n), n;
}
const yc = (t) => {
  const e = fc(t), n = (r) => mc(e, r);
  return Object.assign(n, e), n;
}, Cc = (t) => yc, ea = { BASE_URL: "/", DEV: !0, MODE: "production", PROD: !1, SSR: !1, VITE_APP_TOLGEE_API_KEY: "tgpak_ge4v6ytcm5xtozdlobzxk4twgyzwqntjoe3xi4bwozygu5q", VITE_APP_TOLGEE_API_URL: "https://tolgee-translation.oddleapp.com", VITE_APP_TOLGEE_PROJECT_ID: "19", VITE_USER_NODE_ENV: "development" }, Un = /* @__PURE__ */ new Map(), Jn = (t) => {
  const e = Un.get(t);
  return e ? Object.fromEntries(
    Object.entries(e.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, wc = (t, e, n) => {
  if (t === void 0)
    return {
      type: "untracked",
      connection: e.connect(n)
    };
  const r = Un.get(n.name);
  if (r)
    return { type: "tracked", store: t, ...r };
  const i = {
    connection: e.connect(n),
    stores: {}
  };
  return Un.set(n.name, i), { type: "tracked", store: t, ...i };
}, Sc = (t, e) => {
  if (e === void 0) return;
  const n = Un.get(t);
  n && (delete n.stores[e], Object.keys(n.stores).length === 0 && Un.delete(t));
}, xc = (t) => {
  var e, n;
  if (!t) return;
  const r = t.split(`
`), i = r.findIndex(
    (s) => s.includes("api.setState")
  );
  if (i < 0) return;
  const a = ((e = r[i + 1]) == null ? void 0 : e.trim()) || "";
  return (n = /.+ (.+) .+/.exec(a)) == null ? void 0 : n[1];
}, kc = (t, e = {}) => (n, r, i) => {
  const { enabled: a, anonymousActionType: s, store: o, ...l } = e;
  let u;
  try {
    u = (a ?? (ea ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!u)
    return t(n, r, i);
  const { connection: c, ...d } = wc(o, u, l);
  let g = !0;
  i.setState = (k, I, b) => {
    const E = n(k, I);
    if (!g) return E;
    const R = b === void 0 ? {
      type: s || xc(new Error().stack) || "anonymous"
    } : typeof b == "string" ? { type: b } : b;
    return o === void 0 ? (c == null || c.send(R, r()), E) : (c == null || c.send(
      {
        ...R,
        type: `${o}/${R.type}`
      },
      {
        ...Jn(l.name),
        [o]: i.getState()
      }
    ), E);
  }, i.devtools = {
    cleanup: () => {
      c && typeof c.unsubscribe == "function" && c.unsubscribe(), Sc(l.name, o);
    }
  };
  const h = (...k) => {
    const I = g;
    g = !1, n(...k), g = I;
  }, C = t(i.setState, r, i);
  if (d.type === "untracked" ? c == null || c.init(C) : (d.stores[d.store] = i, c == null || c.init(
    Object.fromEntries(
      Object.entries(d.stores).map(([k, I]) => [
        k,
        k === d.store ? C : I.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let k = !1;
    const I = i.dispatch;
    i.dispatch = (...b) => {
      (ea ? "production" : void 0) !== "production" && b[0].type === "__setState" && !k && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), k = !0), I(...b);
    };
  }
  return c.subscribe((k) => {
    var I;
    switch (k.type) {
      case "ACTION":
        if (typeof k.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return Mr(
          k.payload,
          (b) => {
            if (b.type === "__setState") {
              if (o === void 0) {
                h(b.state);
                return;
              }
              Object.keys(b.state).length !== 1 && console.error(
                `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
              );
              const E = b.state[o];
              if (E == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(E) && h(E);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(b);
          }
        );
      case "DISPATCH":
        switch (k.payload.type) {
          case "RESET":
            return h(C), o === void 0 ? c == null ? void 0 : c.init(i.getState()) : c == null ? void 0 : c.init(Jn(l.name));
          case "COMMIT":
            if (o === void 0) {
              c == null || c.init(i.getState());
              return;
            }
            return c == null ? void 0 : c.init(Jn(l.name));
          case "ROLLBACK":
            return Mr(k.state, (b) => {
              if (o === void 0) {
                h(b), c == null || c.init(i.getState());
                return;
              }
              h(b[o]), c == null || c.init(Jn(l.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return Mr(k.state, (b) => {
              if (o === void 0) {
                h(b);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(b[o]) && h(b[o]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: b } = k.payload, E = (I = b.computedStates.slice(-1)[0]) == null ? void 0 : I.state;
            if (!E) return;
            h(o === void 0 ? E : E[o]), c == null || c.send(
              null,
              // FIXME no-any
              b
            );
            return;
          }
          case "PAUSE_RECORDING":
            return g = !g;
        }
        return;
    }
  }), C;
}, bc = kc, Mr = (t, e) => {
  let n;
  try {
    n = JSON.parse(t);
  } catch (r) {
    console.error(
      "[zustand devtools middleware] Could not parse the received json",
      r
    );
  }
  n !== void 0 && e(n);
}, Tc = (t) => ({
  // Initial state
  isModalOpen: !1,
  isCollapsed: !1,
  currentMode: "sidebar",
  // Actions
  setIsModalOpen: (e) => t({ isModalOpen: e }),
  setIsCollapsed: (e) => t({ isCollapsed: e }),
  setCurrentMode: (e) => t({ currentMode: e }),
  openModal: () => t({ isModalOpen: !0 }),
  closeModal: () => t({ isModalOpen: !1 }),
  toggleCollapse: () => t((e) => ({ isCollapsed: !e.isCollapsed })),
  toggleFullscreen: () => t((e) => ({
    currentMode: e.currentMode === "sidebar" ? "fullscreen" : "sidebar"
  }))
}), Ec = (t) => ({
  // Initial state
  chatStatus: Me.IDLE,
  streamingStatus: gt.IDLE,
  // Actions
  setChatStatus: (e) => t({ chatStatus: e }),
  setStreamingStatus: (e) => t({ streamingStatus: e }),
  resetChatStatus: () => t({
    chatStatus: Me.IDLE,
    streamingStatus: gt.IDLE
  })
}), _c = (t) => ({
  // Initial state
  isLoadingConversation: !1,
  conversationError: null,
  // Actions
  setIsLoadingConversation: (e) => t({ isLoadingConversation: e }),
  setConversationError: (e) => t({ conversationError: e }),
  clearConversationError: () => t({ conversationError: null })
}), vc = (t) => ({
  // Initial state
  currentThreadId: null,
  providerResId: null,
  // Actions
  setCurrentThreadId: (e) => t({ currentThreadId: e }),
  setProviderResId: (e) => t({ providerResId: e }),
  clearThreadData: () => t({
    currentThreadId: null,
    providerResId: null
  })
}), Rc = (t) => ({
  // Initial state
  isStreaming: !1,
  isThinking: !1,
  streamingContent: "",
  isHandlingTool: !1,
  currentAssistantMessageId: null,
  // Individual setters
  setIsStreaming: (e) => t({ isStreaming: e }),
  setIsThinking: (e) => t({ isThinking: e }),
  setStreamingContent: (e) => t({ streamingContent: e }),
  setIsHandlingTool: (e) => t({ isHandlingTool: e }),
  setCurrentAssistantMessageId: (e) => t({ currentAssistantMessageId: e }),
  // Lifecycle actions
  startStreaming: (e) => t({
    isStreaming: !0,
    isThinking: !0,
    currentAssistantMessageId: e,
    streamingContent: "",
    isHandlingTool: !1
  }),
  stopStreaming: () => t({
    isStreaming: !1,
    isThinking: !1
  }),
  clearStreamingBuffers: () => t({
    streamingContent: "",
    currentAssistantMessageId: null
  }),
  resetToolHandling: () => t({
    isHandlingTool: !1
  })
}), le = Cc()(
  bc(
    (...t) => ({
      ...Tc(...t),
      ...Ec(...t),
      ..._c(...t),
      ...vc(...t),
      ...Rc(...t)
    }),
    {
      name: "ChatUI-Store"
    }
  )
), Tg = () => le((t) => ({
  isModalOpen: t.isModalOpen,
  isCollapsed: t.isCollapsed,
  currentMode: t.currentMode,
  openModal: t.openModal,
  closeModal: t.closeModal,
  toggleCollapse: t.toggleCollapse,
  toggleFullscreen: t.toggleFullscreen
})), Eg = () => le((t) => ({
  chatStatus: t.chatStatus,
  streamingStatus: t.streamingStatus,
  setChatStatus: t.setChatStatus,
  setStreamingStatus: t.setStreamingStatus,
  resetChatStatus: t.resetChatStatus
})), _g = () => le((t) => ({
  isLoadingConversation: t.isLoadingConversation,
  conversationError: t.conversationError,
  setIsLoadingConversation: t.setIsLoadingConversation,
  setConversationError: t.setConversationError,
  clearConversationError: t.clearConversationError
})), vg = () => le((t) => ({
  currentThreadId: t.currentThreadId,
  providerResId: t.providerResId,
  setCurrentThreadId: t.setCurrentThreadId,
  setProviderResId: t.setProviderResId,
  clearThreadData: t.clearThreadData
}));
function Ic() {
  const t = le((E) => E.isStreaming), e = le((E) => E.setIsStreaming), n = le((E) => E.isThinking), r = le((E) => E.setIsThinking), i = le((E) => E.streamingContent), a = le((E) => E.setStreamingContent), s = le((E) => E.isHandlingTool), o = le((E) => E.setIsHandlingTool), l = le((E) => E.startStreaming), u = le((E) => E.stopStreaming), c = le((E) => E.clearStreamingBuffers), d = le((E) => E.resetToolHandling), g = oe(""), h = Ue(() => ({
    get current() {
      return le.getState().currentAssistantMessageId;
    },
    set current(E) {
      le.getState().setCurrentAssistantMessageId(E);
    }
  }), []), C = ne((E) => {
    E ? l(E) : (e(!0), r(!0), a("")), g.current = "";
  }, [l, e, r, a]), k = ne(() => {
    u(), g.current = "";
  }, [u]), I = ne(() => {
    d();
  }, [d]), b = ne(() => {
    c(), g.current = "";
  }, [c]);
  return {
    // State
    isStreaming: t,
    setIsStreaming: e,
    isThinking: n,
    setIsThinking: r,
    streamingContent: i,
    setStreamingContent: a,
    isHandlingTool: s,
    setIsHandlingTool: o,
    // Refs (backward compatible interface)
    currentAssistantMessageIdRef: h,
    streamingContentRef: g,
    // Actions
    startStreaming: C,
    stopStreaming: k,
    resetToolHandling: I,
    clearStreamingBuffers: b
  };
}
const ce = (t) => typeof t == "string", Mn = () => {
  let t, e;
  const n = new Promise((r, i) => {
    t = r, e = i;
  });
  return n.resolve = t, n.reject = e, n;
}, ta = (t) => t == null ? "" : "" + t, Nc = (t, e, n) => {
  t.forEach((r) => {
    e[r] && (n[r] = e[r]);
  });
}, Ac = /###/g, na = (t) => t && t.indexOf("###") > -1 ? t.replace(Ac, ".") : t, ra = (t) => !t || ce(t), Pn = (t, e, n) => {
  const r = ce(e) ? e.split(".") : e;
  let i = 0;
  for (; i < r.length - 1; ) {
    if (ra(t)) return {};
    const a = na(r[i]);
    !t[a] && n && (t[a] = new n()), Object.prototype.hasOwnProperty.call(t, a) ? t = t[a] : t = {}, ++i;
  }
  return ra(t) ? {} : {
    obj: t,
    k: na(r[i])
  };
}, ia = (t, e, n) => {
  const {
    obj: r,
    k: i
  } = Pn(t, e, Object);
  if (r !== void 0 || e.length === 1) {
    r[i] = n;
    return;
  }
  let a = e[e.length - 1], s = e.slice(0, e.length - 1), o = Pn(t, s, Object);
  for (; o.obj === void 0 && s.length; )
    a = `${s[s.length - 1]}.${a}`, s = s.slice(0, s.length - 1), o = Pn(t, s, Object), o != null && o.obj && typeof o.obj[`${o.k}.${a}`] < "u" && (o.obj = void 0);
  o.obj[`${o.k}.${a}`] = n;
}, Mc = (t, e, n, r) => {
  const {
    obj: i,
    k: a
  } = Pn(t, e, Object);
  i[a] = i[a] || [], i[a].push(n);
}, cr = (t, e) => {
  const {
    obj: n,
    k: r
  } = Pn(t, e);
  if (n && Object.prototype.hasOwnProperty.call(n, r))
    return n[r];
}, Oc = (t, e, n) => {
  const r = cr(t, n);
  return r !== void 0 ? r : cr(e, n);
}, _s = (t, e, n) => {
  for (const r in e)
    r !== "__proto__" && r !== "constructor" && (r in t ? ce(t[r]) || t[r] instanceof String || ce(e[r]) || e[r] instanceof String ? n && (t[r] = e[r]) : _s(t[r], e[r], n) : t[r] = e[r]);
  return t;
}, dn = (t) => t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var Lc = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
const Pc = (t) => ce(t) ? t.replace(/[&<>"'\/]/g, (e) => Lc[e]) : t;
class Dc {
  constructor(e) {
    this.capacity = e, this.regExpMap = /* @__PURE__ */ new Map(), this.regExpQueue = [];
  }
  getRegExp(e) {
    const n = this.regExpMap.get(e);
    if (n !== void 0)
      return n;
    const r = new RegExp(e);
    return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()), this.regExpMap.set(e, r), this.regExpQueue.push(e), r;
  }
}
const Fc = [" ", ",", "?", "!", ";"], Hc = new Dc(20), zc = (t, e, n) => {
  e = e || "", n = n || "";
  const r = Fc.filter((s) => e.indexOf(s) < 0 && n.indexOf(s) < 0);
  if (r.length === 0) return !0;
  const i = Hc.getRegExp(`(${r.map((s) => s === "?" ? "\\?" : s).join("|")})`);
  let a = !i.test(t);
  if (!a) {
    const s = t.indexOf(n);
    s > 0 && !i.test(t.substring(0, s)) && (a = !0);
  }
  return a;
}, ei = (t, e, n = ".") => {
  if (!t) return;
  if (t[e])
    return Object.prototype.hasOwnProperty.call(t, e) ? t[e] : void 0;
  const r = e.split(n);
  let i = t;
  for (let a = 0; a < r.length; ) {
    if (!i || typeof i != "object")
      return;
    let s, o = "";
    for (let l = a; l < r.length; ++l)
      if (l !== a && (o += n), o += r[l], s = i[o], s !== void 0) {
        if (["string", "number", "boolean"].indexOf(typeof s) > -1 && l < r.length - 1)
          continue;
        a += l - a + 1;
        break;
      }
    i = s;
  }
  return i;
}, Bn = (t) => t == null ? void 0 : t.replace("_", "-"), Uc = {
  type: "logger",
  log(t) {
    this.output("log", t);
  },
  warn(t) {
    this.output("warn", t);
  },
  error(t) {
    this.output("error", t);
  },
  output(t, e) {
    var n, r;
    (r = (n = console == null ? void 0 : console[t]) == null ? void 0 : n.apply) == null || r.call(n, console, e);
  }
};
class ur {
  constructor(e, n = {}) {
    this.init(e, n);
  }
  init(e, n = {}) {
    this.prefix = n.prefix || "i18next:", this.logger = e || Uc, this.options = n, this.debug = n.debug;
  }
  log(...e) {
    return this.forward(e, "log", "", !0);
  }
  warn(...e) {
    return this.forward(e, "warn", "", !0);
  }
  error(...e) {
    return this.forward(e, "error", "");
  }
  deprecate(...e) {
    return this.forward(e, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(e, n, r, i) {
    return i && !this.debug ? null : (ce(e[0]) && (e[0] = `${r}${this.prefix} ${e[0]}`), this.logger[n](e));
  }
  create(e) {
    return new ur(this.logger, {
      prefix: `${this.prefix}:${e}:`,
      ...this.options
    });
  }
  clone(e) {
    return e = e || this.options, e.prefix = e.prefix || this.prefix, new ur(this.logger, e);
  }
}
var Dt = new ur();
class mr {
  constructor() {
    this.observers = {};
  }
  on(e, n) {
    return e.split(" ").forEach((r) => {
      this.observers[r] || (this.observers[r] = /* @__PURE__ */ new Map());
      const i = this.observers[r].get(n) || 0;
      this.observers[r].set(n, i + 1);
    }), this;
  }
  off(e, n) {
    if (this.observers[e]) {
      if (!n) {
        delete this.observers[e];
        return;
      }
      this.observers[e].delete(n);
    }
  }
  emit(e, ...n) {
    this.observers[e] && Array.from(this.observers[e].entries()).forEach(([i, a]) => {
      for (let s = 0; s < a; s++)
        i(...n);
    }), this.observers["*"] && Array.from(this.observers["*"].entries()).forEach(([i, a]) => {
      for (let s = 0; s < a; s++)
        i.apply(i, [e, ...n]);
    });
  }
}
class aa extends mr {
  constructor(e, n = {
    ns: ["translation"],
    defaultNS: "translation"
  }) {
    super(), this.data = e || {}, this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(e) {
    this.options.ns.indexOf(e) < 0 && this.options.ns.push(e);
  }
  removeNamespaces(e) {
    const n = this.options.ns.indexOf(e);
    n > -1 && this.options.ns.splice(n, 1);
  }
  getResource(e, n, r, i = {}) {
    var u, c;
    const a = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator, s = i.ignoreJSONStructure !== void 0 ? i.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let o;
    e.indexOf(".") > -1 ? o = e.split(".") : (o = [e, n], r && (Array.isArray(r) ? o.push(...r) : ce(r) && a ? o.push(...r.split(a)) : o.push(r)));
    const l = cr(this.data, o);
    return !l && !n && !r && e.indexOf(".") > -1 && (e = o[0], n = o[1], r = o.slice(2).join(".")), l || !s || !ce(r) ? l : ei((c = (u = this.data) == null ? void 0 : u[e]) == null ? void 0 : c[n], r, a);
  }
  addResource(e, n, r, i, a = {
    silent: !1
  }) {
    const s = a.keySeparator !== void 0 ? a.keySeparator : this.options.keySeparator;
    let o = [e, n];
    r && (o = o.concat(s ? r.split(s) : r)), e.indexOf(".") > -1 && (o = e.split("."), i = n, n = o[1]), this.addNamespaces(n), ia(this.data, o, i), a.silent || this.emit("added", e, n, r, i);
  }
  addResources(e, n, r, i = {
    silent: !1
  }) {
    for (const a in r)
      (ce(r[a]) || Array.isArray(r[a])) && this.addResource(e, n, a, r[a], {
        silent: !0
      });
    i.silent || this.emit("added", e, n, r);
  }
  addResourceBundle(e, n, r, i, a, s = {
    silent: !1,
    skipCopy: !1
  }) {
    let o = [e, n];
    e.indexOf(".") > -1 && (o = e.split("."), i = r, r = n, n = o[1]), this.addNamespaces(n);
    let l = cr(this.data, o) || {};
    s.skipCopy || (r = JSON.parse(JSON.stringify(r))), i ? _s(l, r, a) : l = {
      ...l,
      ...r
    }, ia(this.data, o, l), s.silent || this.emit("added", e, n, r);
  }
  removeResourceBundle(e, n) {
    this.hasResourceBundle(e, n) && delete this.data[e][n], this.removeNamespaces(n), this.emit("removed", e, n);
  }
  hasResourceBundle(e, n) {
    return this.getResource(e, n) !== void 0;
  }
  getResourceBundle(e, n) {
    return n || (n = this.options.defaultNS), this.getResource(e, n);
  }
  getDataByLanguage(e) {
    return this.data[e];
  }
  hasLanguageSomeTranslations(e) {
    const n = this.getDataByLanguage(e);
    return !!(n && Object.keys(n) || []).find((i) => n[i] && Object.keys(n[i]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var vs = {
  processors: {},
  addPostProcessor(t) {
    this.processors[t.name] = t;
  },
  handle(t, e, n, r, i) {
    return t.forEach((a) => {
      var s;
      e = ((s = this.processors[a]) == null ? void 0 : s.process(e, n, r, i)) ?? e;
    }), e;
  }
};
const Rs = Symbol("i18next/PATH_KEY");
function Bc() {
  const t = [], e = /* @__PURE__ */ Object.create(null);
  let n;
  return e.get = (r, i) => {
    var a;
    return (a = n == null ? void 0 : n.revoke) == null || a.call(n), i === Rs ? t : (t.push(i), n = Proxy.revocable(r, e), n.proxy);
  }, Proxy.revocable(/* @__PURE__ */ Object.create(null), e).proxy;
}
function ti(t, e) {
  const {
    [Rs]: n
  } = t(Bc());
  return n.join((e == null ? void 0 : e.keySeparator) ?? ".");
}
const sa = {}, Or = (t) => !ce(t) && typeof t != "boolean" && typeof t != "number";
class dr extends mr {
  constructor(e, n = {}) {
    super(), Nc(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = Dt.create("translator");
  }
  changeLanguage(e) {
    e && (this.language = e);
  }
  exists(e, n = {
    interpolation: {}
  }) {
    const r = {
      ...n
    };
    if (e == null) return !1;
    const i = this.resolve(e, r);
    if ((i == null ? void 0 : i.res) === void 0) return !1;
    const a = Or(i.res);
    return !(r.returnObjects === !1 && a);
  }
  extractFromKey(e, n) {
    let r = n.nsSeparator !== void 0 ? n.nsSeparator : this.options.nsSeparator;
    r === void 0 && (r = ":");
    const i = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator;
    let a = n.ns || this.options.defaultNS || [];
    const s = r && e.indexOf(r) > -1, o = !this.options.userDefinedKeySeparator && !n.keySeparator && !this.options.userDefinedNsSeparator && !n.nsSeparator && !zc(e, r, i);
    if (s && !o) {
      const l = e.match(this.interpolator.nestingRegexp);
      if (l && l.length > 0)
        return {
          key: e,
          namespaces: ce(a) ? [a] : a
        };
      const u = e.split(r);
      (r !== i || r === i && this.options.ns.indexOf(u[0]) > -1) && (a = u.shift()), e = u.join(i);
    }
    return {
      key: e,
      namespaces: ce(a) ? [a] : a
    };
  }
  translate(e, n, r) {
    let i = typeof n == "object" ? {
      ...n
    } : n;
    if (typeof i != "object" && this.options.overloadTranslationOptionHandler && (i = this.options.overloadTranslationOptionHandler(arguments)), typeof i == "object" && (i = {
      ...i
    }), i || (i = {}), e == null) return "";
    typeof e == "function" && (e = ti(e, {
      ...this.options,
      ...i
    })), Array.isArray(e) || (e = [String(e)]);
    const a = i.returnDetails !== void 0 ? i.returnDetails : this.options.returnDetails, s = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator, {
      key: o,
      namespaces: l
    } = this.extractFromKey(e[e.length - 1], i), u = l[l.length - 1];
    let c = i.nsSeparator !== void 0 ? i.nsSeparator : this.options.nsSeparator;
    c === void 0 && (c = ":");
    const d = i.lng || this.language, g = i.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if ((d == null ? void 0 : d.toLowerCase()) === "cimode")
      return g ? a ? {
        res: `${u}${c}${o}`,
        usedKey: o,
        exactUsedKey: o,
        usedLng: d,
        usedNS: u,
        usedParams: this.getUsedParamsDetails(i)
      } : `${u}${c}${o}` : a ? {
        res: o,
        usedKey: o,
        exactUsedKey: o,
        usedLng: d,
        usedNS: u,
        usedParams: this.getUsedParamsDetails(i)
      } : o;
    const h = this.resolve(e, i);
    let C = h == null ? void 0 : h.res;
    const k = (h == null ? void 0 : h.usedKey) || o, I = (h == null ? void 0 : h.exactUsedKey) || o, b = ["[object Number]", "[object Function]", "[object RegExp]"], E = i.joinArrays !== void 0 ? i.joinArrays : this.options.joinArrays, R = !this.i18nFormat || this.i18nFormat.handleAsObject, M = i.count !== void 0 && !ce(i.count), D = dr.hasDefaultValue(i), T = M ? this.pluralResolver.getSuffix(d, i.count, i) : "", z = i.ordinal && M ? this.pluralResolver.getSuffix(d, i.count, {
      ordinal: !1
    }) : "", U = M && !i.ordinal && i.count === 0, V = U && i[`defaultValue${this.options.pluralSeparator}zero`] || i[`defaultValue${T}`] || i[`defaultValue${z}`] || i.defaultValue;
    let K = C;
    R && !C && D && (K = V);
    const ie = Or(K), B = Object.prototype.toString.apply(K);
    if (R && K && ie && b.indexOf(B) < 0 && !(ce(E) && Array.isArray(K))) {
      if (!i.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const N = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(k, K, {
          ...i,
          ns: l
        }) : `key '${o} (${this.language})' returned an object instead of string.`;
        return a ? (h.res = N, h.usedParams = this.getUsedParamsDetails(i), h) : N;
      }
      if (s) {
        const N = Array.isArray(K), L = N ? [] : {}, O = N ? I : k;
        for (const ee in K)
          if (Object.prototype.hasOwnProperty.call(K, ee)) {
            const W = `${O}${s}${ee}`;
            D && !C ? L[ee] = this.translate(W, {
              ...i,
              defaultValue: Or(V) ? V[ee] : void 0,
              joinArrays: !1,
              ns: l
            }) : L[ee] = this.translate(W, {
              ...i,
              joinArrays: !1,
              ns: l
            }), L[ee] === W && (L[ee] = K[ee]);
          }
        C = L;
      }
    } else if (R && ce(E) && Array.isArray(C))
      C = C.join(E), C && (C = this.extendTranslation(C, e, i, r));
    else {
      let N = !1, L = !1;
      !this.isValidLookup(C) && D && (N = !0, C = V), this.isValidLookup(C) || (L = !0, C = o);
      const ee = (i.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && L ? void 0 : C, W = D && V !== C && this.options.updateMissing;
      if (L || N || W) {
        if (this.logger.log(W ? "updateKey" : "missingKey", d, u, o, W ? V : C), s) {
          const te = this.resolve(o, {
            ...i,
            keySeparator: !1
          });
          te && te.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let de = [];
        const _e = this.languageUtils.getFallbackCodes(this.options.fallbackLng, i.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && _e && _e[0])
          for (let te = 0; te < _e.length; te++)
            de.push(_e[te]);
        else this.options.saveMissingTo === "all" ? de = this.languageUtils.toResolveHierarchy(i.lng || this.language) : de.push(i.lng || this.language);
        const w = (te, G, y) => {
          var Z;
          const re = D && y !== C ? y : ee;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(te, u, G, re, W, i) : (Z = this.backendConnector) != null && Z.saveMissing && this.backendConnector.saveMissing(te, u, G, re, W, i), this.emit("missingKey", te, u, G, C);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && M ? de.forEach((te) => {
          const G = this.pluralResolver.getSuffixes(te, i);
          U && i[`defaultValue${this.options.pluralSeparator}zero`] && G.indexOf(`${this.options.pluralSeparator}zero`) < 0 && G.push(`${this.options.pluralSeparator}zero`), G.forEach((y) => {
            w([te], o + y, i[`defaultValue${y}`] || V);
          });
        }) : w(de, o, V));
      }
      C = this.extendTranslation(C, e, i, h, r), L && C === o && this.options.appendNamespaceToMissingKey && (C = `${u}${c}${o}`), (L || N) && this.options.parseMissingKeyHandler && (C = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${u}${c}${o}` : o, N ? C : void 0, i));
    }
    return a ? (h.res = C, h.usedParams = this.getUsedParamsDetails(i), h) : C;
  }
  extendTranslation(e, n, r, i, a) {
    var l, u;
    if ((l = this.i18nFormat) != null && l.parse)
      e = this.i18nFormat.parse(e, {
        ...this.options.interpolation.defaultVariables,
        ...r
      }, r.lng || this.language || i.usedLng, i.usedNS, i.usedKey, {
        resolved: i
      });
    else if (!r.skipInterpolation) {
      r.interpolation && this.interpolator.init({
        ...r,
        interpolation: {
          ...this.options.interpolation,
          ...r.interpolation
        }
      });
      const c = ce(e) && (((u = r == null ? void 0 : r.interpolation) == null ? void 0 : u.skipOnVariables) !== void 0 ? r.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let d;
      if (c) {
        const h = e.match(this.interpolator.nestingRegexp);
        d = h && h.length;
      }
      let g = r.replace && !ce(r.replace) ? r.replace : r;
      if (this.options.interpolation.defaultVariables && (g = {
        ...this.options.interpolation.defaultVariables,
        ...g
      }), e = this.interpolator.interpolate(e, g, r.lng || this.language || i.usedLng, r), c) {
        const h = e.match(this.interpolator.nestingRegexp), C = h && h.length;
        d < C && (r.nest = !1);
      }
      !r.lng && i && i.res && (r.lng = this.language || i.usedLng), r.nest !== !1 && (e = this.interpolator.nest(e, (...h) => (a == null ? void 0 : a[0]) === h[0] && !r.context ? (this.logger.warn(`It seems you are nesting recursively key: ${h[0]} in key: ${n[0]}`), null) : this.translate(...h, n), r)), r.interpolation && this.interpolator.reset();
    }
    const s = r.postProcess || this.options.postProcess, o = ce(s) ? [s] : s;
    return e != null && (o != null && o.length) && r.applyPostProcessor !== !1 && (e = vs.handle(o, e, n, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: {
        ...i,
        usedParams: this.getUsedParamsDetails(r)
      },
      ...r
    } : r, this)), e;
  }
  resolve(e, n = {}) {
    let r, i, a, s, o;
    return ce(e) && (e = [e]), e.forEach((l) => {
      if (this.isValidLookup(r)) return;
      const u = this.extractFromKey(l, n), c = u.key;
      i = c;
      let d = u.namespaces;
      this.options.fallbackNS && (d = d.concat(this.options.fallbackNS));
      const g = n.count !== void 0 && !ce(n.count), h = g && !n.ordinal && n.count === 0, C = n.context !== void 0 && (ce(n.context) || typeof n.context == "number") && n.context !== "", k = n.lngs ? n.lngs : this.languageUtils.toResolveHierarchy(n.lng || this.language, n.fallbackLng);
      d.forEach((I) => {
        var b, E;
        this.isValidLookup(r) || (o = I, !sa[`${k[0]}-${I}`] && ((b = this.utils) != null && b.hasLoadedNamespace) && !((E = this.utils) != null && E.hasLoadedNamespace(o)) && (sa[`${k[0]}-${I}`] = !0, this.logger.warn(`key "${i}" for languages "${k.join(", ")}" won't get resolved as namespace "${o}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), k.forEach((R) => {
          var T;
          if (this.isValidLookup(r)) return;
          s = R;
          const M = [c];
          if ((T = this.i18nFormat) != null && T.addLookupKeys)
            this.i18nFormat.addLookupKeys(M, c, R, I, n);
          else {
            let z;
            g && (z = this.pluralResolver.getSuffix(R, n.count, n));
            const U = `${this.options.pluralSeparator}zero`, V = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (g && (n.ordinal && z.indexOf(V) === 0 && M.push(c + z.replace(V, this.options.pluralSeparator)), M.push(c + z), h && M.push(c + U)), C) {
              const K = `${c}${this.options.contextSeparator || "_"}${n.context}`;
              M.push(K), g && (n.ordinal && z.indexOf(V) === 0 && M.push(K + z.replace(V, this.options.pluralSeparator)), M.push(K + z), h && M.push(K + U));
            }
          }
          let D;
          for (; D = M.pop(); )
            this.isValidLookup(r) || (a = D, r = this.getResource(R, I, D, n));
        }));
      });
    }), {
      res: r,
      usedKey: i,
      exactUsedKey: a,
      usedLng: s,
      usedNS: o
    };
  }
  isValidLookup(e) {
    return e !== void 0 && !(!this.options.returnNull && e === null) && !(!this.options.returnEmptyString && e === "");
  }
  getResource(e, n, r, i = {}) {
    var a;
    return (a = this.i18nFormat) != null && a.getResource ? this.i18nFormat.getResource(e, n, r, i) : this.resourceStore.getResource(e, n, r, i);
  }
  getUsedParamsDetails(e = {}) {
    const n = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"], r = e.replace && !ce(e.replace);
    let i = r ? e.replace : e;
    if (r && typeof e.count < "u" && (i.count = e.count), this.options.interpolation.defaultVariables && (i = {
      ...this.options.interpolation.defaultVariables,
      ...i
    }), !r) {
      i = {
        ...i
      };
      for (const a of n)
        delete i[a];
    }
    return i;
  }
  static hasDefaultValue(e) {
    const n = "defaultValue";
    for (const r in e)
      if (Object.prototype.hasOwnProperty.call(e, r) && n === r.substring(0, n.length) && e[r] !== void 0)
        return !0;
    return !1;
  }
}
class oa {
  constructor(e) {
    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = Dt.create("languageUtils");
  }
  getScriptPartFromCode(e) {
    if (e = Bn(e), !e || e.indexOf("-") < 0) return null;
    const n = e.split("-");
    return n.length === 2 || (n.pop(), n[n.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(n.join("-"));
  }
  getLanguagePartFromCode(e) {
    if (e = Bn(e), !e || e.indexOf("-") < 0) return e;
    const n = e.split("-");
    return this.formatLanguageCode(n[0]);
  }
  formatLanguageCode(e) {
    if (ce(e) && e.indexOf("-") > -1) {
      let n;
      try {
        n = Intl.getCanonicalLocales(e)[0];
      } catch {
      }
      return n && this.options.lowerCaseLng && (n = n.toLowerCase()), n || (this.options.lowerCaseLng ? e.toLowerCase() : e);
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e;
  }
  isSupportedCode(e) {
    return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1;
  }
  getBestMatchFromCodes(e) {
    if (!e) return null;
    let n;
    return e.forEach((r) => {
      if (n) return;
      const i = this.formatLanguageCode(r);
      (!this.options.supportedLngs || this.isSupportedCode(i)) && (n = i);
    }), !n && this.options.supportedLngs && e.forEach((r) => {
      if (n) return;
      const i = this.getScriptPartFromCode(r);
      if (this.isSupportedCode(i)) return n = i;
      const a = this.getLanguagePartFromCode(r);
      if (this.isSupportedCode(a)) return n = a;
      n = this.options.supportedLngs.find((s) => {
        if (s === a) return s;
        if (!(s.indexOf("-") < 0 && a.indexOf("-") < 0) && (s.indexOf("-") > 0 && a.indexOf("-") < 0 && s.substring(0, s.indexOf("-")) === a || s.indexOf(a) === 0 && a.length > 1))
          return s;
      });
    }), n || (n = this.getFallbackCodes(this.options.fallbackLng)[0]), n;
  }
  getFallbackCodes(e, n) {
    if (!e) return [];
    if (typeof e == "function" && (e = e(n)), ce(e) && (e = [e]), Array.isArray(e)) return e;
    if (!n) return e.default || [];
    let r = e[n];
    return r || (r = e[this.getScriptPartFromCode(n)]), r || (r = e[this.formatLanguageCode(n)]), r || (r = e[this.getLanguagePartFromCode(n)]), r || (r = e.default), r || [];
  }
  toResolveHierarchy(e, n) {
    const r = this.getFallbackCodes((n === !1 ? [] : n) || this.options.fallbackLng || [], e), i = [], a = (s) => {
      s && (this.isSupportedCode(s) ? i.push(s) : this.logger.warn(`rejecting language code not found in supportedLngs: ${s}`));
    };
    return ce(e) && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && a(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && a(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && a(this.getLanguagePartFromCode(e))) : ce(e) && a(this.formatLanguageCode(e)), r.forEach((s) => {
      i.indexOf(s) < 0 && a(this.formatLanguageCode(s));
    }), i;
  }
}
const la = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
}, ca = {
  select: (t) => t === 1 ? "one" : "other",
  resolvedOptions: () => ({
    pluralCategories: ["one", "other"]
  })
};
class $c {
  constructor(e, n = {}) {
    this.languageUtils = e, this.options = n, this.logger = Dt.create("pluralResolver"), this.pluralRulesCache = {};
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(e, n = {}) {
    const r = Bn(e === "dev" ? "en" : e), i = n.ordinal ? "ordinal" : "cardinal", a = JSON.stringify({
      cleanedCode: r,
      type: i
    });
    if (a in this.pluralRulesCache)
      return this.pluralRulesCache[a];
    let s;
    try {
      s = new Intl.PluralRules(r, {
        type: i
      });
    } catch {
      if (!Intl)
        return this.logger.error("No Intl support, please use an Intl polyfill!"), ca;
      if (!e.match(/-|_/)) return ca;
      const l = this.languageUtils.getLanguagePartFromCode(e);
      s = this.getRule(l, n);
    }
    return this.pluralRulesCache[a] = s, s;
  }
  needsPlural(e, n = {}) {
    let r = this.getRule(e, n);
    return r || (r = this.getRule("dev", n)), (r == null ? void 0 : r.resolvedOptions().pluralCategories.length) > 1;
  }
  getPluralFormsOfKey(e, n, r = {}) {
    return this.getSuffixes(e, r).map((i) => `${n}${i}`);
  }
  getSuffixes(e, n = {}) {
    let r = this.getRule(e, n);
    return r || (r = this.getRule("dev", n)), r ? r.resolvedOptions().pluralCategories.sort((i, a) => la[i] - la[a]).map((i) => `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${i}`) : [];
  }
  getSuffix(e, n, r = {}) {
    const i = this.getRule(e, r);
    return i ? `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${i.select(n)}` : (this.logger.warn(`no plural rule found for: ${e}`), this.getSuffix("dev", n, r));
  }
}
const ua = (t, e, n, r = ".", i = !0) => {
  let a = Oc(t, e, n);
  return !a && i && ce(n) && (a = ei(t, n, r), a === void 0 && (a = ei(e, n, r))), a;
}, Lr = (t) => t.replace(/\$/g, "$$$$");
class da {
  constructor(e = {}) {
    var n;
    this.logger = Dt.create("interpolator"), this.options = e, this.format = ((n = e == null ? void 0 : e.interpolation) == null ? void 0 : n.format) || ((r) => r), this.init(e);
  }
  init(e = {}) {
    e.interpolation || (e.interpolation = {
      escapeValue: !0
    });
    const {
      escape: n,
      escapeValue: r,
      useRawValueToEscape: i,
      prefix: a,
      prefixEscaped: s,
      suffix: o,
      suffixEscaped: l,
      formatSeparator: u,
      unescapeSuffix: c,
      unescapePrefix: d,
      nestingPrefix: g,
      nestingPrefixEscaped: h,
      nestingSuffix: C,
      nestingSuffixEscaped: k,
      nestingOptionsSeparator: I,
      maxReplaces: b,
      alwaysFormat: E
    } = e.interpolation;
    this.escape = n !== void 0 ? n : Pc, this.escapeValue = r !== void 0 ? r : !0, this.useRawValueToEscape = i !== void 0 ? i : !1, this.prefix = a ? dn(a) : s || "{{", this.suffix = o ? dn(o) : l || "}}", this.formatSeparator = u || ",", this.unescapePrefix = c ? "" : d || "-", this.unescapeSuffix = this.unescapePrefix ? "" : c || "", this.nestingPrefix = g ? dn(g) : h || dn("$t("), this.nestingSuffix = C ? dn(C) : k || dn(")"), this.nestingOptionsSeparator = I || ",", this.maxReplaces = b || 1e3, this.alwaysFormat = E !== void 0 ? E : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const e = (n, r) => (n == null ? void 0 : n.source) === r ? (n.lastIndex = 0, n) : new RegExp(r, "g");
    this.regexp = e(this.regexp, `${this.prefix}(.+?)${this.suffix}`), this.regexpUnescape = e(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`), this.nestingRegexp = e(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
  }
  interpolate(e, n, r, i) {
    var h;
    let a, s, o;
    const l = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}, u = (C) => {
      if (C.indexOf(this.formatSeparator) < 0) {
        const E = ua(n, l, C, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(E, void 0, r, {
          ...i,
          ...n,
          interpolationkey: C
        }) : E;
      }
      const k = C.split(this.formatSeparator), I = k.shift().trim(), b = k.join(this.formatSeparator).trim();
      return this.format(ua(n, l, I, this.options.keySeparator, this.options.ignoreJSONStructure), b, r, {
        ...i,
        ...n,
        interpolationkey: I
      });
    };
    this.resetRegExp();
    const c = (i == null ? void 0 : i.missingInterpolationHandler) || this.options.missingInterpolationHandler, d = ((h = i == null ? void 0 : i.interpolation) == null ? void 0 : h.skipOnVariables) !== void 0 ? i.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (C) => Lr(C)
    }, {
      regex: this.regexp,
      safeValue: (C) => this.escapeValue ? Lr(this.escape(C)) : Lr(C)
    }].forEach((C) => {
      for (o = 0; a = C.regex.exec(e); ) {
        const k = a[1].trim();
        if (s = u(k), s === void 0)
          if (typeof c == "function") {
            const b = c(e, a, i);
            s = ce(b) ? b : "";
          } else if (i && Object.prototype.hasOwnProperty.call(i, k))
            s = "";
          else if (d) {
            s = a[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${k} for interpolating ${e}`), s = "";
        else !ce(s) && !this.useRawValueToEscape && (s = ta(s));
        const I = C.safeValue(s);
        if (e = e.replace(a[0], I), d ? (C.regex.lastIndex += s.length, C.regex.lastIndex -= a[0].length) : C.regex.lastIndex = 0, o++, o >= this.maxReplaces)
          break;
      }
    }), e;
  }
  nest(e, n, r = {}) {
    let i, a, s;
    const o = (l, u) => {
      const c = this.nestingOptionsSeparator;
      if (l.indexOf(c) < 0) return l;
      const d = l.split(new RegExp(`${c}[ ]*{`));
      let g = `{${d[1]}`;
      l = d[0], g = this.interpolate(g, s);
      const h = g.match(/'/g), C = g.match(/"/g);
      (((h == null ? void 0 : h.length) ?? 0) % 2 === 0 && !C || C.length % 2 !== 0) && (g = g.replace(/'/g, '"'));
      try {
        s = JSON.parse(g), u && (s = {
          ...u,
          ...s
        });
      } catch (k) {
        return this.logger.warn(`failed parsing options string in nesting for key ${l}`, k), `${l}${c}${g}`;
      }
      return s.defaultValue && s.defaultValue.indexOf(this.prefix) > -1 && delete s.defaultValue, l;
    };
    for (; i = this.nestingRegexp.exec(e); ) {
      let l = [];
      s = {
        ...r
      }, s = s.replace && !ce(s.replace) ? s.replace : s, s.applyPostProcessor = !1, delete s.defaultValue;
      const u = /{.*}/.test(i[1]) ? i[1].lastIndexOf("}") + 1 : i[1].indexOf(this.formatSeparator);
      if (u !== -1 && (l = i[1].slice(u).split(this.formatSeparator).map((c) => c.trim()).filter(Boolean), i[1] = i[1].slice(0, u)), a = n(o.call(this, i[1].trim(), s), s), a && i[0] === e && !ce(a)) return a;
      ce(a) || (a = ta(a)), a || (this.logger.warn(`missed to resolve ${i[1]} for nesting ${e}`), a = ""), l.length && (a = l.reduce((c, d) => this.format(c, d, r.lng, {
        ...r,
        interpolationkey: i[1].trim()
      }), a.trim())), e = e.replace(i[0], a), this.regexp.lastIndex = 0;
    }
    return e;
  }
}
const jc = (t) => {
  let e = t.toLowerCase().trim();
  const n = {};
  if (t.indexOf("(") > -1) {
    const r = t.split("(");
    e = r[0].toLowerCase().trim();
    const i = r[1].substring(0, r[1].length - 1);
    e === "currency" && i.indexOf(":") < 0 ? n.currency || (n.currency = i.trim()) : e === "relativetime" && i.indexOf(":") < 0 ? n.range || (n.range = i.trim()) : i.split(";").forEach((s) => {
      if (s) {
        const [o, ...l] = s.split(":"), u = l.join(":").trim().replace(/^'+|'+$/g, ""), c = o.trim();
        n[c] || (n[c] = u), u === "false" && (n[c] = !1), u === "true" && (n[c] = !0), isNaN(u) || (n[c] = parseInt(u, 10));
      }
    });
  }
  return {
    formatName: e,
    formatOptions: n
  };
}, ha = (t) => {
  const e = {};
  return (n, r, i) => {
    let a = i;
    i && i.interpolationkey && i.formatParams && i.formatParams[i.interpolationkey] && i[i.interpolationkey] && (a = {
      ...a,
      [i.interpolationkey]: void 0
    });
    const s = r + JSON.stringify(a);
    let o = e[s];
    return o || (o = t(Bn(r), i), e[s] = o), o(n);
  };
}, Vc = (t) => (e, n, r) => t(Bn(n), r)(e);
class Wc {
  constructor(e = {}) {
    this.logger = Dt.create("formatter"), this.options = e, this.init(e);
  }
  init(e, n = {
    interpolation: {}
  }) {
    this.formatSeparator = n.interpolation.formatSeparator || ",";
    const r = n.cacheInBuiltFormats ? ha : Vc;
    this.formats = {
      number: r((i, a) => {
        const s = new Intl.NumberFormat(i, {
          ...a
        });
        return (o) => s.format(o);
      }),
      currency: r((i, a) => {
        const s = new Intl.NumberFormat(i, {
          ...a,
          style: "currency"
        });
        return (o) => s.format(o);
      }),
      datetime: r((i, a) => {
        const s = new Intl.DateTimeFormat(i, {
          ...a
        });
        return (o) => s.format(o);
      }),
      relativetime: r((i, a) => {
        const s = new Intl.RelativeTimeFormat(i, {
          ...a
        });
        return (o) => s.format(o, a.range || "day");
      }),
      list: r((i, a) => {
        const s = new Intl.ListFormat(i, {
          ...a
        });
        return (o) => s.format(o);
      })
    };
  }
  add(e, n) {
    this.formats[e.toLowerCase().trim()] = n;
  }
  addCached(e, n) {
    this.formats[e.toLowerCase().trim()] = ha(n);
  }
  format(e, n, r, i = {}) {
    const a = n.split(this.formatSeparator);
    if (a.length > 1 && a[0].indexOf("(") > 1 && a[0].indexOf(")") < 0 && a.find((o) => o.indexOf(")") > -1)) {
      const o = a.findIndex((l) => l.indexOf(")") > -1);
      a[0] = [a[0], ...a.splice(1, o)].join(this.formatSeparator);
    }
    return a.reduce((o, l) => {
      var d;
      const {
        formatName: u,
        formatOptions: c
      } = jc(l);
      if (this.formats[u]) {
        let g = o;
        try {
          const h = ((d = i == null ? void 0 : i.formatParams) == null ? void 0 : d[i.interpolationkey]) || {}, C = h.locale || h.lng || i.locale || i.lng || r;
          g = this.formats[u](o, C, {
            ...c,
            ...i,
            ...h
          });
        } catch (h) {
          this.logger.warn(h);
        }
        return g;
      } else
        this.logger.warn(`there was no format function for ${u}`);
      return o;
    }, e);
  }
}
const Gc = (t, e) => {
  t.pending[e] !== void 0 && (delete t.pending[e], t.pendingCount--);
};
class Zc extends mr {
  constructor(e, n, r, i = {}) {
    var a, s;
    super(), this.backend = e, this.store = n, this.services = r, this.languageUtils = r.languageUtils, this.options = i, this.logger = Dt.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = i.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = i.maxRetries >= 0 ? i.maxRetries : 5, this.retryTimeout = i.retryTimeout >= 1 ? i.retryTimeout : 350, this.state = {}, this.queue = [], (s = (a = this.backend) == null ? void 0 : a.init) == null || s.call(a, r, i.backend, i);
  }
  queueLoad(e, n, r, i) {
    const a = {}, s = {}, o = {}, l = {};
    return e.forEach((u) => {
      let c = !0;
      n.forEach((d) => {
        const g = `${u}|${d}`;
        !r.reload && this.store.hasResourceBundle(u, d) ? this.state[g] = 2 : this.state[g] < 0 || (this.state[g] === 1 ? s[g] === void 0 && (s[g] = !0) : (this.state[g] = 1, c = !1, s[g] === void 0 && (s[g] = !0), a[g] === void 0 && (a[g] = !0), l[d] === void 0 && (l[d] = !0)));
      }), c || (o[u] = !0);
    }), (Object.keys(a).length || Object.keys(s).length) && this.queue.push({
      pending: s,
      pendingCount: Object.keys(s).length,
      loaded: {},
      errors: [],
      callback: i
    }), {
      toLoad: Object.keys(a),
      pending: Object.keys(s),
      toLoadLanguages: Object.keys(o),
      toLoadNamespaces: Object.keys(l)
    };
  }
  loaded(e, n, r) {
    const i = e.split("|"), a = i[0], s = i[1];
    n && this.emit("failedLoading", a, s, n), !n && r && this.store.addResourceBundle(a, s, r, void 0, void 0, {
      skipCopy: !0
    }), this.state[e] = n ? -1 : 2, n && r && (this.state[e] = 0);
    const o = {};
    this.queue.forEach((l) => {
      Mc(l.loaded, [a], s), Gc(l, e), n && l.errors.push(n), l.pendingCount === 0 && !l.done && (Object.keys(l.loaded).forEach((u) => {
        o[u] || (o[u] = {});
        const c = l.loaded[u];
        c.length && c.forEach((d) => {
          o[u][d] === void 0 && (o[u][d] = !0);
        });
      }), l.done = !0, l.errors.length ? l.callback(l.errors) : l.callback());
    }), this.emit("loaded", o), this.queue = this.queue.filter((l) => !l.done);
  }
  read(e, n, r, i = 0, a = this.retryTimeout, s) {
    if (!e.length) return s(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: e,
        ns: n,
        fcName: r,
        tried: i,
        wait: a,
        callback: s
      });
      return;
    }
    this.readingCalls++;
    const o = (u, c) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const d = this.waitingReads.shift();
        this.read(d.lng, d.ns, d.fcName, d.tried, d.wait, d.callback);
      }
      if (u && c && i < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, e, n, r, i + 1, a * 2, s);
        }, a);
        return;
      }
      s(u, c);
    }, l = this.backend[r].bind(this.backend);
    if (l.length === 2) {
      try {
        const u = l(e, n);
        u && typeof u.then == "function" ? u.then((c) => o(null, c)).catch(o) : o(null, u);
      } catch (u) {
        o(u);
      }
      return;
    }
    return l(e, n, o);
  }
  prepareLoading(e, n, r = {}, i) {
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), i && i();
    ce(e) && (e = this.languageUtils.toResolveHierarchy(e)), ce(n) && (n = [n]);
    const a = this.queueLoad(e, n, r, i);
    if (!a.toLoad.length)
      return a.pending.length || i(), null;
    a.toLoad.forEach((s) => {
      this.loadOne(s);
    });
  }
  load(e, n, r) {
    this.prepareLoading(e, n, {}, r);
  }
  reload(e, n, r) {
    this.prepareLoading(e, n, {
      reload: !0
    }, r);
  }
  loadOne(e, n = "") {
    const r = e.split("|"), i = r[0], a = r[1];
    this.read(i, a, "read", void 0, void 0, (s, o) => {
      s && this.logger.warn(`${n}loading namespace ${a} for language ${i} failed`, s), !s && o && this.logger.log(`${n}loaded namespace ${a} for language ${i}`, o), this.loaded(e, s, o);
    });
  }
  saveMissing(e, n, r, i, a, s = {}, o = () => {
  }) {
    var l, u, c, d, g;
    if ((u = (l = this.services) == null ? void 0 : l.utils) != null && u.hasLoadedNamespace && !((d = (c = this.services) == null ? void 0 : c.utils) != null && d.hasLoadedNamespace(n))) {
      this.logger.warn(`did not save key "${r}" as the namespace "${n}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(r == null || r === "")) {
      if ((g = this.backend) != null && g.create) {
        const h = {
          ...s,
          isUpdate: a
        }, C = this.backend.create.bind(this.backend);
        if (C.length < 6)
          try {
            let k;
            C.length === 5 ? k = C(e, n, r, i, h) : k = C(e, n, r, i), k && typeof k.then == "function" ? k.then((I) => o(null, I)).catch(o) : o(null, k);
          } catch (k) {
            o(k);
          }
        else
          C(e, n, r, i, o, h);
      }
      !e || !e[0] || this.store.addResource(e[0], n, r, i);
    }
  }
}
const Pr = () => ({
  debug: !1,
  initAsync: !0,
  ns: ["translation"],
  defaultNS: ["translation"],
  fallbackLng: ["dev"],
  fallbackNS: !1,
  supportedLngs: !1,
  nonExplicitSupportedLngs: !1,
  load: "all",
  preload: !1,
  simplifyPluralSuffix: !0,
  keySeparator: ".",
  nsSeparator: ":",
  pluralSeparator: "_",
  contextSeparator: "_",
  partialBundledLanguages: !1,
  saveMissing: !1,
  updateMissing: !1,
  saveMissingTo: "fallback",
  saveMissingPlurals: !0,
  missingKeyHandler: !1,
  missingInterpolationHandler: !1,
  postProcess: !1,
  postProcessPassResolved: !1,
  returnNull: !1,
  returnEmptyString: !0,
  returnObjects: !1,
  joinArrays: !1,
  returnedObjectHandler: !1,
  parseMissingKeyHandler: !1,
  appendNamespaceToMissingKey: !1,
  appendNamespaceToCIMode: !1,
  overloadTranslationOptionHandler: (t) => {
    let e = {};
    if (typeof t[1] == "object" && (e = t[1]), ce(t[1]) && (e.defaultValue = t[1]), ce(t[2]) && (e.tDescription = t[2]), typeof t[2] == "object" || typeof t[3] == "object") {
      const n = t[3] || t[2];
      Object.keys(n).forEach((r) => {
        e[r] = n[r];
      });
    }
    return e;
  },
  interpolation: {
    escapeValue: !0,
    format: (t) => t,
    prefix: "{{",
    suffix: "}}",
    formatSeparator: ",",
    unescapePrefix: "-",
    nestingPrefix: "$t(",
    nestingSuffix: ")",
    nestingOptionsSeparator: ",",
    maxReplaces: 1e3,
    skipOnVariables: !0
  },
  cacheInBuiltFormats: !0
}), pa = (t) => {
  var e, n;
  return ce(t.ns) && (t.ns = [t.ns]), ce(t.fallbackLng) && (t.fallbackLng = [t.fallbackLng]), ce(t.fallbackNS) && (t.fallbackNS = [t.fallbackNS]), ((n = (e = t.supportedLngs) == null ? void 0 : e.indexOf) == null ? void 0 : n.call(e, "cimode")) < 0 && (t.supportedLngs = t.supportedLngs.concat(["cimode"])), typeof t.initImmediate == "boolean" && (t.initAsync = t.initImmediate), t;
}, Qn = () => {
}, qc = (t) => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(t)).forEach((n) => {
    typeof t[n] == "function" && (t[n] = t[n].bind(t));
  });
};
class Dn extends mr {
  constructor(e = {}, n) {
    if (super(), this.options = pa(e), this.services = {}, this.logger = Dt, this.modules = {
      external: []
    }, qc(this), n && !this.isInitialized && !e.isClone) {
      if (!this.options.initAsync)
        return this.init(e, n), this;
      setTimeout(() => {
        this.init(e, n);
      }, 0);
    }
  }
  init(e = {}, n) {
    this.isInitializing = !0, typeof e == "function" && (n = e, e = {}), e.defaultNS == null && e.ns && (ce(e.ns) ? e.defaultNS = e.ns : e.ns.indexOf("translation") < 0 && (e.defaultNS = e.ns[0]));
    const r = Pr();
    this.options = {
      ...r,
      ...this.options,
      ...pa(e)
    }, this.options.interpolation = {
      ...r.interpolation,
      ...this.options.interpolation
    }, e.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = e.keySeparator), e.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = e.nsSeparator), typeof this.options.overloadTranslationOptionHandler != "function" && (this.options.overloadTranslationOptionHandler = r.overloadTranslationOptionHandler);
    const i = (u) => u ? typeof u == "function" ? new u() : u : null;
    if (!this.options.isClone) {
      this.modules.logger ? Dt.init(i(this.modules.logger), this.options) : Dt.init(null, this.options);
      let u;
      this.modules.formatter ? u = this.modules.formatter : u = Wc;
      const c = new oa(this.options);
      this.store = new aa(this.options.resources, this.options);
      const d = this.services;
      d.logger = Dt, d.resourceStore = this.store, d.languageUtils = c, d.pluralResolver = new $c(c, {
        prepend: this.options.pluralSeparator,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), this.options.interpolation.format && this.options.interpolation.format !== r.interpolation.format && this.logger.deprecate("init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting"), u && (!this.options.interpolation.format || this.options.interpolation.format === r.interpolation.format) && (d.formatter = i(u), d.formatter.init && d.formatter.init(d, this.options), this.options.interpolation.format = d.formatter.format.bind(d.formatter)), d.interpolator = new da(this.options), d.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, d.backendConnector = new Zc(i(this.modules.backend), d.resourceStore, d, this.options), d.backendConnector.on("*", (h, ...C) => {
        this.emit(h, ...C);
      }), this.modules.languageDetector && (d.languageDetector = i(this.modules.languageDetector), d.languageDetector.init && d.languageDetector.init(d, this.options.detection, this.options)), this.modules.i18nFormat && (d.i18nFormat = i(this.modules.i18nFormat), d.i18nFormat.init && d.i18nFormat.init(this)), this.translator = new dr(this.services, this.options), this.translator.on("*", (h, ...C) => {
        this.emit(h, ...C);
      }), this.modules.external.forEach((h) => {
        h.init && h.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, n || (n = Qn), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const u = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      u.length > 0 && u[0] !== "dev" && (this.options.lng = u[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((u) => {
      this[u] = (...c) => this.store[u](...c);
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((u) => {
      this[u] = (...c) => (this.store[u](...c), this);
    });
    const o = Mn(), l = () => {
      const u = (c, d) => {
        this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), o.resolve(d), n(c, d);
      };
      if (this.languages && !this.isInitialized) return u(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, u);
    };
    return this.options.resources || !this.options.initAsync ? l() : setTimeout(l, 0), o;
  }
  loadResources(e, n = Qn) {
    var a, s;
    let r = n;
    const i = ce(e) ? e : this.language;
    if (typeof e == "function" && (r = e), !this.options.resources || this.options.partialBundledLanguages) {
      if ((i == null ? void 0 : i.toLowerCase()) === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return r();
      const o = [], l = (u) => {
        if (!u || u === "cimode") return;
        this.services.languageUtils.toResolveHierarchy(u).forEach((d) => {
          d !== "cimode" && o.indexOf(d) < 0 && o.push(d);
        });
      };
      i ? l(i) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((c) => l(c)), (s = (a = this.options.preload) == null ? void 0 : a.forEach) == null || s.call(a, (u) => l(u)), this.services.backendConnector.load(o, this.options.ns, (u) => {
        !u && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), r(u);
      });
    } else
      r(null);
  }
  reloadResources(e, n, r) {
    const i = Mn();
    return typeof e == "function" && (r = e, e = void 0), typeof n == "function" && (r = n, n = void 0), e || (e = this.languages), n || (n = this.options.ns), r || (r = Qn), this.services.backendConnector.reload(e, n, (a) => {
      i.resolve(), r(a);
    }), i;
  }
  use(e) {
    if (!e) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!e.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return e.type === "backend" && (this.modules.backend = e), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && (this.modules.languageDetector = e), e.type === "i18nFormat" && (this.modules.i18nFormat = e), e.type === "postProcessor" && vs.addPostProcessor(e), e.type === "formatter" && (this.modules.formatter = e), e.type === "3rdParty" && this.modules.external.push(e), this;
  }
  setResolvedLanguage(e) {
    if (!(!e || !this.languages) && !(["cimode", "dev"].indexOf(e) > -1)) {
      for (let n = 0; n < this.languages.length; n++) {
        const r = this.languages[n];
        if (!(["cimode", "dev"].indexOf(r) > -1) && this.store.hasLanguageSomeTranslations(r)) {
          this.resolvedLanguage = r;
          break;
        }
      }
      !this.resolvedLanguage && this.languages.indexOf(e) < 0 && this.store.hasLanguageSomeTranslations(e) && (this.resolvedLanguage = e, this.languages.unshift(e));
    }
  }
  changeLanguage(e, n) {
    this.isLanguageChangingTo = e;
    const r = Mn();
    this.emit("languageChanging", e);
    const i = (o) => {
      this.language = o, this.languages = this.services.languageUtils.toResolveHierarchy(o), this.resolvedLanguage = void 0, this.setResolvedLanguage(o);
    }, a = (o, l) => {
      l ? this.isLanguageChangingTo === e && (i(l), this.translator.changeLanguage(l), this.isLanguageChangingTo = void 0, this.emit("languageChanged", l), this.logger.log("languageChanged", l)) : this.isLanguageChangingTo = void 0, r.resolve((...u) => this.t(...u)), n && n(o, (...u) => this.t(...u));
    }, s = (o) => {
      var c, d;
      !e && !o && this.services.languageDetector && (o = []);
      const l = ce(o) ? o : o && o[0], u = this.store.hasLanguageSomeTranslations(l) ? l : this.services.languageUtils.getBestMatchFromCodes(ce(o) ? [o] : o);
      u && (this.language || i(u), this.translator.language || this.translator.changeLanguage(u), (d = (c = this.services.languageDetector) == null ? void 0 : c.cacheUserLanguage) == null || d.call(c, u)), this.loadResources(u, (g) => {
        a(g, u);
      });
    };
    return !e && this.services.languageDetector && !this.services.languageDetector.async ? s(this.services.languageDetector.detect()) : !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(s) : this.services.languageDetector.detect(s) : s(e), r;
  }
  getFixedT(e, n, r) {
    const i = (a, s, ...o) => {
      let l;
      typeof s != "object" ? l = this.options.overloadTranslationOptionHandler([a, s].concat(o)) : l = {
        ...s
      }, l.lng = l.lng || i.lng, l.lngs = l.lngs || i.lngs, l.ns = l.ns || i.ns, l.keyPrefix !== "" && (l.keyPrefix = l.keyPrefix || r || i.keyPrefix);
      const u = this.options.keySeparator || ".";
      let c;
      return l.keyPrefix && Array.isArray(a) ? c = a.map((d) => (typeof d == "function" && (d = ti(d, {
        ...this.options,
        ...s
      })), `${l.keyPrefix}${u}${d}`)) : (typeof a == "function" && (a = ti(a, {
        ...this.options,
        ...s
      })), c = l.keyPrefix ? `${l.keyPrefix}${u}${a}` : a), this.t(c, l);
    };
    return ce(e) ? i.lng = e : i.lngs = e, i.ns = n, i.keyPrefix = r, i;
  }
  t(...e) {
    var n;
    return (n = this.translator) == null ? void 0 : n.translate(...e);
  }
  exists(...e) {
    var n;
    return (n = this.translator) == null ? void 0 : n.exists(...e);
  }
  setDefaultNamespace(e) {
    this.options.defaultNS = e;
  }
  hasLoadedNamespace(e, n = {}) {
    if (!this.isInitialized)
      return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
    if (!this.languages || !this.languages.length)
      return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
    const r = n.lng || this.resolvedLanguage || this.languages[0], i = this.options ? this.options.fallbackLng : !1, a = this.languages[this.languages.length - 1];
    if (r.toLowerCase() === "cimode") return !0;
    const s = (o, l) => {
      const u = this.services.backendConnector.state[`${o}|${l}`];
      return u === -1 || u === 0 || u === 2;
    };
    if (n.precheck) {
      const o = n.precheck(this, s);
      if (o !== void 0) return o;
    }
    return !!(this.hasResourceBundle(r, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || s(r, e) && (!i || s(a, e)));
  }
  loadNamespaces(e, n) {
    const r = Mn();
    return this.options.ns ? (ce(e) && (e = [e]), e.forEach((i) => {
      this.options.ns.indexOf(i) < 0 && this.options.ns.push(i);
    }), this.loadResources((i) => {
      r.resolve(), n && n(i);
    }), r) : (n && n(), Promise.resolve());
  }
  loadLanguages(e, n) {
    const r = Mn();
    ce(e) && (e = [e]);
    const i = this.options.preload || [], a = e.filter((s) => i.indexOf(s) < 0 && this.services.languageUtils.isSupportedCode(s));
    return a.length ? (this.options.preload = i.concat(a), this.loadResources((s) => {
      r.resolve(), n && n(s);
    }), r) : (n && n(), Promise.resolve());
  }
  dir(e) {
    var i, a;
    if (e || (e = this.resolvedLanguage || (((i = this.languages) == null ? void 0 : i.length) > 0 ? this.languages[0] : this.language)), !e) return "rtl";
    try {
      const s = new Intl.Locale(e);
      if (s && s.getTextInfo) {
        const o = s.getTextInfo();
        if (o && o.direction) return o.direction;
      }
    } catch {
    }
    const n = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], r = ((a = this.services) == null ? void 0 : a.languageUtils) || new oa(Pr());
    return e.toLowerCase().indexOf("-latn") > 1 ? "ltr" : n.indexOf(r.getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance(e = {}, n) {
    const r = new Dn(e, n);
    return r.createInstance = Dn.createInstance, r;
  }
  cloneInstance(e = {}, n = Qn) {
    const r = e.forkResourceStore;
    r && delete e.forkResourceStore;
    const i = {
      ...this.options,
      ...e,
      isClone: !0
    }, a = new Dn(i);
    if ((e.debug !== void 0 || e.prefix !== void 0) && (a.logger = a.logger.clone(e)), ["store", "services", "language"].forEach((o) => {
      a[o] = this[o];
    }), a.services = {
      ...this.services
    }, a.services.utils = {
      hasLoadedNamespace: a.hasLoadedNamespace.bind(a)
    }, r) {
      const o = Object.keys(this.store.data).reduce((l, u) => (l[u] = {
        ...this.store.data[u]
      }, l[u] = Object.keys(l[u]).reduce((c, d) => (c[d] = {
        ...l[u][d]
      }, c), l[u]), l), {});
      a.store = new aa(o, i), a.services.resourceStore = a.store;
    }
    if (e.interpolation) {
      const l = {
        ...Pr().interpolation,
        ...this.options.interpolation,
        ...e.interpolation
      }, u = {
        ...i,
        interpolation: l
      };
      a.services.interpolator = new da(u);
    }
    return a.translator = new dr(a.services, i), a.translator.on("*", (o, ...l) => {
      a.emit(o, ...l);
    }), a.init(i, n), a.translator.options = i, a.translator.backendConnector.services.utils = {
      hasLoadedNamespace: a.hasLoadedNamespace.bind(a)
    }, a;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const ot = Dn.createInstance();
ot.createInstance;
ot.dir;
ot.init;
ot.loadResources;
ot.reloadResources;
ot.use;
ot.changeLanguage;
ot.getFixedT;
ot.t;
ot.exists;
ot.setDefaultNamespace;
ot.hasLoadedNamespace;
ot.loadNamespaces;
ot.loadLanguages;
var hr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function xi(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
const Kc = (t, e, n, r) => {
  var a, s, o, l;
  const i = [n, {
    code: e,
    ...r || {}
  }];
  if ((s = (a = t == null ? void 0 : t.services) == null ? void 0 : a.logger) != null && s.forward)
    return t.services.logger.forward(i, "warn", "react-i18next::", !0);
  nn(i[0]) && (i[0] = `react-i18next:: ${i[0]}`), (l = (o = t == null ? void 0 : t.services) == null ? void 0 : o.logger) != null && l.warn ? t.services.logger.warn(...i) : console != null && console.warn && console.warn(...i);
}, fa = {}, Is = (t, e, n, r) => {
  nn(n) && fa[n] || (nn(n) && (fa[n] = /* @__PURE__ */ new Date()), Kc(t, e, n, r));
}, Ns = (t, e) => () => {
  if (t.isInitialized)
    e();
  else {
    const n = () => {
      setTimeout(() => {
        t.off("initialized", n);
      }, 0), e();
    };
    t.on("initialized", n);
  }
}, ni = (t, e, n) => {
  t.loadNamespaces(e, Ns(t, n));
}, ga = (t, e, n, r) => {
  if (nn(n) && (n = [n]), t.options.preload && t.options.preload.indexOf(e) > -1) return ni(t, n, r);
  n.forEach((i) => {
    t.options.ns.indexOf(i) < 0 && t.options.ns.push(i);
  }), t.loadLanguages(e, Ns(t, r));
}, Xc = (t, e, n = {}) => !e.languages || !e.languages.length ? (Is(e, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
  languages: e.languages
}), !0) : e.hasLoadedNamespace(t, {
  lng: n.lng,
  precheck: (r, i) => {
    if (n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && r.services.backendConnector.backend && r.isLanguageChangingTo && !i(r.isLanguageChangingTo, t)) return !1;
  }
}), nn = (t) => typeof t == "string", Yc = (t) => typeof t == "object" && t !== null, Jc = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, Qc = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
}, eu = (t) => Qc[t], tu = (t) => t.replace(Jc, eu);
let ri = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: tu,
  transDefaultProps: void 0
};
const nu = (t = {}) => {
  ri = {
    ...ri,
    ...t
  };
}, ru = () => ri;
let As;
const iu = (t) => {
  As = t;
}, au = () => As, su = {
  type: "3rdParty",
  init(t) {
    nu(t.options.react), iu(t);
  }
}, ou = yi();
class lu {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(e) {
    e.forEach((n) => {
      this.usedNamespaces[n] || (this.usedNamespaces[n] = !0);
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
var Ms = { exports: {} }, Os = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yn = _t;
function cu(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var uu = typeof Object.is == "function" ? Object.is : cu, du = yn.useState, hu = yn.useEffect, pu = yn.useLayoutEffect, fu = yn.useDebugValue;
function gu(t, e) {
  var n = e(), r = du({ inst: { value: n, getSnapshot: e } }), i = r[0].inst, a = r[1];
  return pu(
    function() {
      i.value = n, i.getSnapshot = e, Dr(i) && a({ inst: i });
    },
    [t, n, e]
  ), hu(
    function() {
      return Dr(i) && a({ inst: i }), t(function() {
        Dr(i) && a({ inst: i });
      });
    },
    [t]
  ), fu(n), n;
}
function Dr(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !uu(t, n);
  } catch {
    return !0;
  }
}
function mu(t, e) {
  return e();
}
var yu = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? mu : gu;
Os.useSyncExternalStore = yn.useSyncExternalStore !== void 0 ? yn.useSyncExternalStore : yu;
Ms.exports = Os;
var Cu = Ms.exports;
const wu = (t, e) => nn(e) ? e : Yc(e) && nn(e.defaultValue) ? e.defaultValue : Array.isArray(t) ? t[t.length - 1] : t, Su = {
  t: wu,
  ready: !1
}, xu = () => () => {
}, ku = (t, e = {}) => {
  var V, K, ie;
  const {
    i18n: n
  } = e, {
    i18n: r,
    defaultNS: i
  } = Ci(ou) || {}, a = n || r || au();
  a && !a.reportNamespaces && (a.reportNamespaces = new lu()), a || Is(a, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
  const s = Ue(() => {
    var B;
    return {
      ...ru(),
      ...(B = a == null ? void 0 : a.options) == null ? void 0 : B.react,
      ...e
    };
  }, [a, e]), {
    useSuspense: o,
    keyPrefix: l
  } = s, u = i || ((V = a == null ? void 0 : a.options) == null ? void 0 : V.defaultNS), c = nn(u) ? [u] : u || ["translation"], d = Ue(() => c, c);
  (ie = (K = a == null ? void 0 : a.reportNamespaces) == null ? void 0 : K.addUsedNamespaces) == null || ie.call(K, d);
  const g = oe(0), h = ne((B) => {
    if (!a) return xu;
    const {
      bindI18n: N,
      bindI18nStore: L
    } = s, O = () => {
      g.current += 1, B();
    };
    return N && a.on(N, O), L && a.store.on(L, O), () => {
      N && N.split(" ").forEach((ee) => a.off(ee, O)), L && L.split(" ").forEach((ee) => a.store.off(ee, O));
    };
  }, [a, s]), C = oe(), k = ne(() => {
    if (!a)
      return Su;
    const B = !!(a.isInitialized || a.initializedStoreOnce) && d.every((de) => Xc(de, a, s)), N = e.lng || a.language, L = g.current, O = C.current;
    if (O && O.ready === B && O.lng === N && O.keyPrefix === l && O.revision === L)
      return O;
    const W = {
      t: a.getFixedT(N, s.nsMode === "fallback" ? d : d[0], l),
      ready: B,
      lng: N,
      keyPrefix: l,
      revision: L
    };
    return C.current = W, W;
  }, [a, d, l, s, e.lng]), [I, b] = ke(0), {
    t: E,
    ready: R
  } = Cu.useSyncExternalStore(h, k, k);
  Ne(() => {
    if (a && !R && !o) {
      const B = () => b((N) => N + 1);
      e.lng ? ga(a, e.lng, d, B) : ni(a, d, B);
    }
  }, [a, e.lng, d, R, o, I]);
  const M = a || {}, D = oe(null), T = oe(), z = (B) => {
    const N = Object.getOwnPropertyDescriptors(B);
    N.__original && delete N.__original;
    const L = Object.create(Object.getPrototypeOf(B), N);
    if (!Object.prototype.hasOwnProperty.call(L, "__original"))
      try {
        Object.defineProperty(L, "__original", {
          value: B,
          writable: !1,
          enumerable: !1,
          configurable: !1
        });
      } catch {
      }
    return L;
  }, U = Ue(() => {
    const B = M, N = B == null ? void 0 : B.language;
    let L = B;
    B && (D.current && D.current.__original === B ? T.current !== N ? (L = z(B), D.current = L, T.current = N) : L = D.current : (L = z(B), D.current = L, T.current = N));
    const O = [E, L, R];
    return O.t = E, O.i18n = L, O.ready = R, O;
  }, [E, M, R, M.resolvedLanguage, M.language, M.languages]);
  if (a && o && !R)
    throw new Promise((B) => {
      const N = () => B();
      e.lng ? ga(a, e.lng, d, N) : ni(a, d, N);
    });
  return U;
};
async function Ls({
  chatServerUrl: t,
  chatServerKey: e,
  mpAuthToken: n,
  locale: r
}) {
  const a = `${t.replace(/\/$/, "").replace(/^ws(s)?:/, "http$1:")}/api/v1/translations/${r}`, s = await fetch(a, {
    method: "GET",
    headers: {
      "x-oddle-chat-server-key": e,
      "x-oddle-mp-auth-token": n,
      "Content-Type": "application/json"
    }
  });
  if (!s.ok) {
    if (s.status === 404 && r !== "en")
      return console.warn(`Translations not found for locale '${r}', falling back to 'en'`), Ls({
        chatServerUrl: t,
        chatServerKey: e,
        mpAuthToken: n,
        locale: "en"
      });
    throw new Error(`Failed to fetch translations: ${s.status} ${s.statusText}`);
  }
  const o = await s.json();
  if (!o.success || !o.translations)
    throw new Error("Invalid translation response: missing translations data");
  return o.translations;
}
const bu = () => {
  const t = ot.createInstance();
  return t.use(su), t;
}, Ps = yi(null), Tu = {
  chat: {
    connection: {
      reconnecting: "Reconnecting..."
    },
    errors: {
      authentication: "Authentication error. Please refresh the page and try again.",
      connection: "Connection error. Please check your internet connection and try again.",
      retry: "Retry",
      timeout: "Request timed out. Please try again.",
      unexpected: "An unexpected error occurred. Please try again."
    },
    fileUpload: {
      maxFilesExceeded: "Maximum {{maxFiles}} files allowed",
      sizeLimitExceeded: "File size must be less than {{maxSize}}MB",
      typeNotAllowed: "Only image files are allowed"
    },
    input: {
      placeholder: "What would you like to know?"
    },
    tools: {
      completed: "Completed",
      executing: "Executing...",
      failed: "Failed"
    },
    reasoning: {
      thinking: "Thinking...",
      thought: "Thought",
      completed: "Completed",
      error: "Error",
      processing: "Processing",
      duration: {
        for: "for",
        second: "second",
        seconds: "seconds"
      }
    }
  }
};
function Eu({
  children: t,
  locale: e = "en",
  chatServerUrl: n,
  chatServerKey: r,
  mpAuthToken: i,
  fallback: a
}) {
  const [s] = ke(() => bu()), [o, l] = ke(!0), [u, c] = ke(!1), [d, g] = ke(null), h = oe(!1), C = ne(
    async (b, E) => {
      s.isInitialized ? (s.addResourceBundle(
        E,
        "translation",
        b,
        !0,
        !0
      ), await s.changeLanguage(E)) : await s.init({
        lng: E,
        fallbackLng: "en",
        resources: {
          [E]: {
            translation: b
          }
        },
        interpolation: {
          escapeValue: !1
          // React already escapes values
        },
        react: {
          useSuspense: !1
        }
      });
    },
    [s]
  );
  Ne(() => {
    if (h.current)
      return;
    let b = !0;
    return (async () => {
      l(!0), g(null);
      try {
        const R = await Ls({
          chatServerUrl: n,
          chatServerKey: r,
          mpAuthToken: i,
          locale: e
        });
        if (!b) return;
        await C(R, e), h.current = !0, c(!0);
      } catch (R) {
        if (!b) return;
        console.error("Failed to load translations:", R), g(
          R instanceof Error ? R : new Error("Failed to load translations")
        ), await C(Tu, "en"), h.current = !0, c(!0);
      } finally {
        b && l(!1);
      }
    })(), () => {
      b = !1;
    };
  }, [e, n, r, i, C]);
  const k = ne(
    (b, E) => s.isInitialized && s.t(b, E) || b,
    [s]
  ), I = Ue(
    () => ({
      t: k,
      locale: e,
      isLoading: o,
      isReady: u,
      error: d
    }),
    [k, e, o, u, d]
  );
  return o && a ? /* @__PURE__ */ p(Xt, { children: a }) : /* @__PURE__ */ p(Ps.Provider, { value: I, children: t });
}
function Yt() {
  const t = Ci(Ps);
  if (!t)
    throw new Error(
      "useTranslations must be used within TranslationProvider. Make sure your component is wrapped with <TranslationProvider>."
    );
  return t;
}
function Rg() {
  return ku();
}
function _u() {
  const { t } = Yt(), e = ne(
    (a, s) => s === !1 ? Ze.isErrorMessage(a) ? tt.ERROR : tt.COMPLETED : Ze.isCompletedMessage(a) ? tt.COMPLETED : Ze.isErrorMessage(a) ? tt.ERROR : tt.PROCESSING,
    []
  ), n = ne(
    (a) => Ze.extractDuration(a, t),
    [t]
  ), r = ne(
    (a) => Ze.cleanReasoningContent(a),
    []
  ), i = ne(
    (a, s) => {
      switch (Ze.getMessageType(
        a,
        s
      )) {
        case ae.MESSAGE_TYPES.ERROR:
          return t("chat.reasoning.error");
        case ae.MESSAGE_TYPES.COMPLETED:
          return t("chat.reasoning.completed");
        case ae.MESSAGE_TYPES.THOUGHT:
          return t("chat.reasoning.thought");
        case ae.MESSAGE_TYPES.THINKING:
        default:
          return t("chat.reasoning.thinking");
      }
    },
    [t]
  );
  return {
    getReasoningStatus: e,
    getReasoningDuration: n,
    getReasoningContentOnly: r,
    getReasoningTitle: i
  };
}
function vu() {
  const { t } = Yt(), e = ne(
    (r, i) => i === !1 ? r.includes(ae.ERROR_MARKER) ? t("chat.tools.failed") : t("chat.tools.completed") : r.includes(ae.COMPLETED_MARKER) || r.includes("✅") ? t("chat.tools.completed") : r.includes(ae.ERROR_MARKER) ? t("chat.tools.failed") : (r.includes(ae.HANDLING_MARKER), t("chat.tools.executing")),
    [t]
  ), n = ne(
    (r, i) => i === !1 ? r.includes(ae.ERROR_MARKER) ? tt.ERROR : tt.COMPLETED : r.includes(ae.COMPLETED_MARKER) || r.includes("✅") ? tt.COMPLETED : r.includes(ae.ERROR_MARKER) ? tt.ERROR : tt.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: n
  };
}
function Ru({
  setMessages: t,
  addMessage: e,
  updateMessageContent: n,
  generateId: r,
  setIsThinking: i,
  setIsStreaming: a,
  setStreamingContent: s,
  setIsHandlingTool: o,
  currentAssistantMessageIdRef: l,
  streamingContentRef: u,
  clearStreamingBuffers: c,
  resetToolHandling: d
}) {
  const g = oe(/* @__PURE__ */ new Map()), h = oe(/* @__PURE__ */ new Map()), C = ne(() => {
    if (l.current && u.current) {
      const M = Si(
        u.current,
        !0
      );
      return n(
        l.current,
        M,
        !1
      ), c(), !0;
    }
    return !1;
  }, [
    l,
    u,
    n,
    c
  ]), k = ne(
    (M) => {
      if (window.responseTimeoutId && (clearTimeout(window.responseTimeoutId), window.responseTimeoutId = null, l.current || t((D) => {
        var z;
        const T = (z = D.map((U, V) => ({ msg: U, index: V })).filter(({ msg: U }) => U.role === "user").pop()) == null ? void 0 : z.index;
        return T !== void 0 ? D.map(
          (U, V) => V === T && (U.hasError || U.isRetrying) ? { ...U, hasError: !1, errorMessage: void 0, isRetrying: !1 } : U
        ) : D;
      })), l.current)
        u.current += M, s(u.current), n(
          l.current,
          u.current,
          !0
        );
      else {
        i(!1);
        const D = r();
        l.current = D, u.current = M, s(M);
        const T = {
          id: D,
          role: "assistant",
          content: M,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        t((z) => [...z, T]);
      }
    },
    [
      l,
      u,
      s,
      n,
      i,
      r,
      t
    ]
  ), I = ne(
    (M, D, T) => {
      const { callId: z } = T || {};
      if (o(M), !z) return;
      const U = Ze.isThinkingMessage(D) && !ae.PATTERNS.DURATION.test(D), V = Ze.isThinkingMessage(D) && ae.PATTERNS.DURATION.test(D), K = Ze.isHandlingMessage(D), ie = Ze.isCompletedMessage(D), B = Ze.isErrorMessage(D);
      if (U || V) {
        const L = g.current.get(z);
        if (U && !L) {
          C();
          const O = r();
          g.current.set(z, O);
          const ee = {
            id: O,
            role: "reasoning",
            content: D,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          t((W) => [...W, ee]);
        } else V && L ? (n(L, D, !1), g.current.delete(z)) : L && U && n(L, D, !0);
      }
      const N = h.current.get(z);
      if (K && !N) {
        C();
        const L = D.match(
          ae.PATTERNS.HANDLING_TOOL
        ), O = L ? L[1] : "Unknown Tool", ee = r();
        h.current.set(z, ee);
        const W = {
          id: ee,
          role: "tooling",
          content: D,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...T,
            toolName: O,
            callId: z,
            status: tt.PROCESSING
          }
        };
        t((de) => [...de, W]);
      } else if ((ie || B) && N) {
        const L = D.match(
          ae.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), O = L ? L[1] : "Unknown Tool";
        t(
          (ee) => ee.map(
            (W) => W.id === N ? {
              ...W,
              content: D,
              isStreaming: !1,
              toolData: {
                ...W.toolData,
                toolName: O,
                status: B ? tt.ERROR : tt.COMPLETED,
                callId: z ?? ""
              }
            } : W
          )
        ), h.current.delete(z);
      } else N && M && !ie && !B && n(N, D, !0);
    },
    [
      o,
      C,
      r,
      t,
      n
    ]
  ), b = ne(() => {
    a(!1), i(!1), C();
  }, [a, i, C]), E = ne(
    (M) => {
      a(!1), i(!1), C(), e("system", `❌ Chat error: ${M}`);
    },
    [
      a,
      i,
      C,
      e
    ]
  ), R = ne(() => {
    a(!1), i(!1), c(), d();
  }, [
    a,
    i,
    c,
    d
  ]);
  return {
    handleSetMessage: k,
    handleReasoningUpdate: I,
    handleChatFinished: b,
    handleChatError: E,
    stopGeneration: R,
    finalizeCurrentStreamingMessage: C
  };
}
function Iu() {
  const t = pc(), e = Ic(), n = _u(), r = vu(), i = Ru({
    // From useMessages
    setMessages: t.setMessages,
    addMessage: t.addMessage,
    updateMessageContent: t.updateMessageContent,
    generateId: t.generateId,
    // From useStreamingState
    setIsThinking: e.setIsThinking,
    setIsStreaming: e.setIsStreaming,
    setStreamingContent: e.setStreamingContent,
    setIsHandlingTool: e.setIsHandlingTool,
    currentAssistantMessageIdRef: e.currentAssistantMessageIdRef,
    streamingContentRef: e.streamingContentRef,
    clearStreamingBuffers: e.clearStreamingBuffers,
    resetToolHandling: e.resetToolHandling
  });
  return {
    // State from useMessages
    messages: t.messages,
    setMessages: t.setMessages,
    // State from useStreamingState
    isStreaming: e.isStreaming,
    setIsStreaming: e.setIsStreaming,
    isThinking: e.isThinking,
    setIsThinking: e.setIsThinking,
    streamingContent: e.streamingContent,
    isHandlingTool: e.isHandlingTool,
    currentAssistantMessageIdRef: e.currentAssistantMessageIdRef,
    // Helper functions from useReasoningHelpers
    getReasoningStatus: n.getReasoningStatus,
    getReasoningDuration: n.getReasoningDuration,
    getReasoningContentOnly: n.getReasoningContentOnly,
    getReasoningTitle: n.getReasoningTitle,
    // Helper functions from useToolingHelpers
    getToolingTitle: r.getToolingTitle,
    getToolingStatus: r.getToolingStatus,
    // Actions from useMessages
    addMessage: t.addMessage,
    // Actions from useMessageHandlers
    handleSetMessage: i.handleSetMessage,
    handleReasoningUpdate: i.handleReasoningUpdate,
    handleChatFinished: i.handleChatFinished,
    handleChatError: i.handleChatError,
    stopGeneration: i.stopGeneration,
    finalizeCurrentStreamingMessage: i.finalizeCurrentStreamingMessage
  };
}
function Ig({ initialMode: t = "sidebar" }) {
  const e = le();
  return Ne(() => {
    t && e.currentMode !== t && e.setCurrentMode(t);
  }, [t]), Ne(() => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const n = (r) => {
      r.key === "Escape" && e.currentMode === "modal" && e.isModalOpen && e.closeModal();
    };
    if (e.currentMode === "modal" && e.isModalOpen)
      return document.addEventListener("keydown", n), () => document.removeEventListener("keydown", n);
  }, [e.currentMode, e.isModalOpen, e.closeModal]), {
    // Modal and layout state
    isModalOpen: e.isModalOpen,
    setIsModalOpen: e.setIsModalOpen,
    isCollapsed: e.isCollapsed,
    setIsCollapsed: e.setIsCollapsed,
    currentMode: e.currentMode,
    setCurrentMode: e.setCurrentMode,
    // Chat state
    chatStatus: e.chatStatus,
    setChatStatus: e.setChatStatus,
    streamingStatus: e.streamingStatus,
    setStreamingStatus: e.setStreamingStatus,
    // Conversation state
    isLoadingConversation: e.isLoadingConversation,
    setIsLoadingConversation: e.setIsLoadingConversation,
    conversationError: e.conversationError,
    setConversationError: e.setConversationError,
    // Thread state
    currentThreadId: e.currentThreadId,
    setCurrentThreadId: e.setCurrentThreadId,
    providerResId: e.providerResId,
    setProviderResId: e.setProviderResId,
    // Actions
    openModal: e.openModal,
    closeModal: e.closeModal,
    toggleCollapse: e.toggleCollapse,
    toggleFullscreen: e.toggleFullscreen
  };
}
function Nu(t) {
  var n;
  const e = [];
  for (const r of t)
    if (e.push(r), r.role === "assistant" && ((n = r.uiComponents) != null && n.length))
      for (const i of r.uiComponents)
        e.push({
          id: i.toolCallId,
          role: "ui-component",
          content: "",
          timestamp: r.timestamp,
          uiComponent: {
            name: i.componentName,
            props: i.props ?? {},
            callId: i.toolCallId,
            status: "complete"
          }
        });
  return e;
}
function Au({
  entityId: t,
  entityType: e,
  httpApiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  messages: a,
  setMessages: s,
  setIsLoadingConversation: o,
  setConversationError: l,
  setCurrentThreadId: u,
  setProviderResId: c,
  metadata: d,
  isConnected: g = !0,
  // Default to true for backward compatibility
  onConversationInitialized: h
}) {
  const C = oe(!1), k = async () => {
    if (g) {
      if (!t) {
        o(!1);
        return;
      }
      if (!d || typeof d == "object" && Object.keys(d).length === 0) {
        o(!1);
        return;
      }
      if (!n) {
        o(!1);
        return;
      }
      if (!r) {
        o(!1);
        return;
      }
      if (!i) {
        o(!1);
        return;
      }
      if (!C.current && !(a.length > 0))
        try {
          o(!0), l(null);
          const b = await Fl(
            n,
            {
              entityId: t,
              entityType: e,
              metadata: d
            },
            {
              userMpAuthToken: r,
              chatServerKey: i
            }
          );
          s(Nu(b.messages)), b.threadId && u(b.threadId), b.providerResId && c(b.providerResId), b.messages.length > 0 && h && h(), C.current = !0;
        } catch (b) {
          mn(b, "ConversationLoader"), l(
            b instanceof Error ? b.message : "Failed to load conversation"
          ), C.current = !0;
        } finally {
          o(!1);
        }
    }
  };
  return Ne(() => {
    k();
  }, [
    g,
    // Load when connection is established
    t,
    e,
    n,
    r,
    i,
    a.length,
    s,
    o,
    l,
    u,
    c,
    d
  ]), {
    hasLoadedConversationRef: C,
    resetConversationLoader: () => {
      C.current = !1;
    },
    reloadConversation: k
  };
}
function ma(t) {
  if (!t || typeof t != "object") return !1;
  const e = Object.keys(t);
  return e.length === 0 ? !1 : e.some((n) => t[n] != null);
}
function Mu({
  metadata: t,
  chatClient: e,
  currentProviderResId: n,
  isLoadingConversation: r,
  messages: i = [],
  entityId: a,
  entityType: s
}) {
  const o = oe(void 0), l = oe(!1), u = oe(null), c = oe(void 0), d = oe(null);
  return Ne(() => {
    if (r || !e)
      return;
    const g = !n && i.length === 0, h = !!n;
    if (g && (!a || !s) || h && !n)
      return;
    if (!l.current) {
      l.current = !0, o.current = t, d.current = n;
      return;
    }
    const C = !d.current && n, k = o.current !== t;
    if (C) {
      if (console.log("[useMetadataSync] 🆕 Thread just created, syncing initial metadata"), d.current = n, ma(t) && c.current !== t) {
        console.log("[useMetadataSync] 📤 Syncing metadata to newly created thread:", t);
        const E = e.updateMetadata(n, { metadata: t }).then(() => {
          console.log("[useMetadataSync] ✅ Initial metadata synced successfully"), o.current = t, c.current = t, u.current = null;
        }).catch((R) => {
          console.error(
            "[useMetadataSync] ❌ Failed to sync initial metadata to new thread:",
            R
          ), u.current = null;
        });
        u.current = E;
      }
      return;
    }
    if (d.current = n, !k)
      return;
    if (!ma(t)) {
      o.current = t;
      return;
    }
    if (g)
      console.log("[useMetadataSync] 📝 Draft state: tracking metadata for future sync"), o.current = t;
    else if (h) {
      if (console.log("[useMetadataSync] 🔄 Existing thread: updating metadata"), c.current === t)
        return;
      if (u.current) {
        u.current.finally(() => {
          if (c.current !== t) {
            const E = e.updateMetadata(n, { metadata: t }).then(() => {
              console.log("[useMetadataSync] ✅ Metadata updated successfully (queued)"), o.current = t, c.current = t, u.current = null;
            }).catch((R) => {
              console.error(
                "[useMetadataSync] ❌ Failed to update existing thread metadata:",
                R
              ), u.current = null;
            });
            u.current = E;
          }
        });
        return;
      }
      const b = e.updateMetadata(n, { metadata: t }).then(() => {
        console.log("[useMetadataSync] ✅ Metadata updated successfully"), o.current = t, c.current = t, u.current = null;
      }).catch((E) => {
        console.error(
          "[useMetadataSync] ❌ Failed to update existing thread metadata:",
          E
        ), u.current = null;
      });
      u.current = b;
    }
  }, [
    t,
    n,
    e,
    r,
    i.length,
    a,
    s
  ]), {
    // Debug info
    lastMetadata: o.current,
    hasInitialized: l.current,
    isDraftState: !n && i.length === 0,
    isExistingThread: !!n
  };
}
function Ou() {
  const [t, e] = ke(navigator.onLine), [n, r] = ke(!1);
  return Ne(() => {
    const i = () => {
      e(!0), n && r(!1);
    }, a = () => {
      e(!1), r(!0);
    };
    return window.addEventListener("online", i), window.addEventListener("offline", a), () => {
      window.removeEventListener("online", i), window.removeEventListener("offline", a);
    };
  }, [n]), { isOnline: t, wasOffline: n };
}
const Ds = yi(null);
function Lu({ children: t, value: e }) {
  return /* @__PURE__ */ p(Ds.Provider, { value: e, children: t });
}
function Cn() {
  const t = Ci(Ds);
  if (!t)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return t;
}
function Ng() {
  const { onSubmit: t, onStopGeneration: e, isStreaming: n, chatStatus: r } = Cn();
  return {
    sendMessage: t,
    stopGeneration: e,
    isStreaming: n,
    chatStatus: r
  };
}
class Pu {
  // 15MB
  constructor(e) {
    q(this, "config");
    q(this, "defaultFolder", "chat-uploads");
    q(this, "defaultMaxFileSize", 15 * 1024 * 1024);
    this.config = {
      folder: this.defaultFolder,
      maxFileSize: this.defaultMaxFileSize,
      ...e
    };
  }
  /**
   * Upload files with authentication and error handling
   * Single file: uses "file" field name
   * Multiple files: uses "files" field name in single request
   */
  async uploadFiles(e, n) {
    return e.forEach((r) => this.validateFile(r)), e.length === 1 ? [await this.uploadSingleFile(e[0], n ? (r) => {
      const i = [{
        file: e[0],
        progress: r,
        status: r === 100 ? "completed" : "uploading"
      }];
      n(i);
    } : void 0)] : this.uploadMultipleFiles(e, n);
  }
  /**
   * Upload multiple files in a single request using "files" field name
   */
  async uploadMultipleFiles(e, n) {
    const r = new FormData();
    e.forEach((s) => {
      r.append("files", s);
    }), r.append("folder", this.config.folder || this.defaultFolder);
    const i = this.buildAuthHeaders(), a = e.map((s) => ({
      file: s,
      progress: 0,
      status: "uploading"
    }));
    return new Promise((s, o) => {
      const l = new XMLHttpRequest();
      l.upload.addEventListener("progress", (u) => {
        if (u.lengthComputable && n) {
          const c = u.loaded / u.total * 100;
          a.forEach((d) => {
            d.progress = c;
          }), n([...a]);
        }
      }), l.addEventListener("load", async () => {
        if (l.status >= 200 && l.status < 300)
          try {
            const u = JSON.parse(l.responseText);
            let c;
            u.data && Array.isArray(u.data) ? c = u.data.map((d, g) => this.processUploadResult(e[g], d)) : Array.isArray(u) ? c = u.map((d, g) => this.processUploadResult(e[g], d)) : c = [this.processUploadResult(e[0], u)], a.forEach((d) => {
              d.status = "completed", d.progress = 100;
            }), n && n([...a]), s(c);
          } catch {
            a.forEach((c) => {
              c.status = "error";
            }), n && n([...a]), o(new Error("Invalid response format"));
          }
        else
          a.forEach((u) => {
            u.status = "error";
          }), n && n([...a]), o(new Error(`Upload failed with status ${l.status}`));
      }), l.addEventListener("error", () => {
        a.forEach((u) => {
          u.status = "error";
        }), n && n([...a]), o(new Error("Network error during upload"));
      }), l.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([u, c]) => {
        l.setRequestHeader(u, c);
      }), l.send(r);
    });
  }
  /**
   * Upload a single file with authentication
   */
  async uploadSingleFile(e, n) {
    const r = new FormData();
    r.append("file", e), r.append("folder", this.config.folder || this.defaultFolder);
    const i = this.buildAuthHeaders();
    return new Promise((a, s) => {
      const o = new XMLHttpRequest();
      o.upload.addEventListener("progress", (l) => {
        if (l.lengthComputable && n) {
          const u = l.loaded / l.total * 100;
          n(u);
        }
      }), o.addEventListener("load", async () => {
        if (o.status >= 200 && o.status < 300)
          try {
            const l = JSON.parse(o.responseText), u = this.processUploadResult(e, l);
            a(u);
          } catch {
            s(new Error("Invalid response format"));
          }
        else
          s(new Error(`Upload failed with status ${o.status}`));
      }), o.addEventListener("error", () => {
        s(new Error("Network error during upload"));
      }), o.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([l, u]) => {
        o.setRequestHeader(l, u);
      }), o.send(r);
    });
  }
  /**
   * Process the upload result and return the CDN URL directly
   */
  processUploadResult(e, n) {
    return n.cdnUrl || n.url;
  }
  /**
   * Validate file before upload
   */
  validateFile(e) {
    if (e.size > (this.config.maxFileSize || this.defaultMaxFileSize))
      throw new Error(
        `File ${e.name} is too large. Maximum size is ${this.formatFileSize(
          this.config.maxFileSize || this.defaultMaxFileSize
        )}`
      );
    if (this.config.allowedTypes && this.config.allowedTypes.length > 0 && !this.config.allowedTypes.some(
      (r) => e.type.startsWith(r) || e.name.toLowerCase().endsWith(r)
    ))
      throw new Error(`File type ${e.type} is not allowed`);
  }
  /**
   * Build authentication headers
   */
  buildAuthHeaders() {
    const e = {};
    return this.config.userMpAuthToken && (e["x-oddle-mp-auth-token"] = this.config.userMpAuthToken), this.config.chatServerKey && (e["x-oddle-chat-server-key"] = this.config.chatServerKey), e;
  }
  /**
   * Format file size for display
   */
  formatFileSize(e) {
    if (e === 0) return "0 Bytes";
    const n = 1024, r = ["Bytes", "KB", "MB", "GB"], i = Math.floor(Math.log(e) / Math.log(n));
    return parseFloat((e / Math.pow(n, i)).toFixed(2)) + " " + r[i];
  }
  /**
   * Update configuration
   */
  updateConfig(e) {
    this.config = { ...this.config, ...e };
  }
  /**
   * Get current configuration
   */
  getConfig() {
    return { ...this.config };
  }
}
class Du {
  constructor(e, n = {}) {
    q(this, "config");
    q(this, "chatClient");
    this.chatClient = e, this.config = n;
  }
  /**
   * Validates if a message can be submitted
   */
  canSubmit(e, n, r) {
    return !!(e.trim() && !n && this.chatClient && r);
  }
  /**
   * Creates a user message object
   */
  createUserMessage(e, n) {
    return {
      id: this.generateId(),
      role: "user",
      content: e.trim(),
      timestamp: /* @__PURE__ */ new Date(),
      media: n,
      hasError: !1,
      isRetrying: !1,
      isStreaming: !1
    };
  }
  /**
   * Submits a message to the WebSocket agent client
   * 
   * @param params - Message submission parameters
   * @returns The created user message
   * @throws Error if submission fails
   */
  async submitMessage(e) {
    const { message: n, media: r, providerResId: i } = e, a = this.createUserMessage(n, r);
    try {
      return await this.chatClient.onTriggerMessage({
        message: a.content,
        media: r,
        providerResId: i
      }), a;
    } catch (s) {
      throw this.handleError(s), s;
    }
  }
  /**
   * Handles submission errors
   */
  handleError(e) {
    const n = e instanceof Error ? e : new Error("Unknown error");
    console.error("Agent client send error:", n), this.config.onError && this.config.onError(n);
  }
  /**
   * Generates a unique message ID
   */
  generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  /**
   * Creates a system error message
   */
  createErrorMessage(e) {
    return `Sorry, there was an error: ${e instanceof Error ? e.message : "Unknown error"}`;
  }
}
const Fu = {
  /**
   * Determine if the bubble button should be shown based on mode and state
   */
  shouldShowBubble: (t, e, n) => t === "modal" && !e || (t === "sidebar" || t === "fullscreen") && n,
  /**
   * Determine if the chat is in a collapsed state
   */
  isCollapsedState: (t, e) => (t === "sidebar" || t === "fullscreen") && e,
  /**
   * Get the appropriate title text based on mode and state
   */
  getBubbleTitle: (t, e) => t === "modal" ? `Open ${e}` : `Expand ${e}`,
  /**
   * Determine if header should be visible
   */
  shouldShowHeader: (t) => t !== !1,
  /**
   * Determine if main header section should be shown
   */
  shouldShowMainHeader: (t, e, n) => t === 0 && !e && !n,
  /**
   * Get content area CSS class based on message state
   */
  getContentAreaClass: (t, e, n, r) => {
    const i = "chat-wrapper__content";
    return t === 0 && !e && !n ? r === !1 ? `${i} chat-wrapper__content--compact` : `${i} chat-wrapper__content--empty` : `${i} chat-wrapper__content--with-messages`;
  },
  /**
   * Determine if suggested prompts should be shown
   */
  shouldShowSuggestedPrompts: (t, e, n, r, i) => t === 0 && !e && !n && !!r && (i ?? !0)
}, Fs = {
  /**
   * Convert WebSocket URL to HTTP URL for REST API calls
   */
  convertWebSocketToHttp: (t) => t.replace(
    /^wss?:\/\//,
    (e) => e === "wss://" ? "https://" : "http://"
  ),
  /**
   * Validate if a URL is a valid WebSocket URL
   */
  isValidWebSocketUrl: (t) => {
    try {
      const e = new URL(t);
      return e.protocol === "ws:" || e.protocol === "wss:";
    } catch {
      return !1;
    }
  },
  /**
   * Validate if a URL is a valid HTTP URL
   */
  isValidHttpUrl: (t) => {
    try {
      const e = new URL(t);
      return e.protocol === "http:" || e.protocol === "https:";
    } catch {
      return !1;
    }
  }
}, Hu = {
  /**
   * Validate required authentication props
   */
  validateAuthProps: (t) => {
    if (!t.userMpAuthToken)
      throw new Error("ChatWrapper: userMpAuthToken is required");
    if (!t.chatServerUrl)
      throw new Error("ChatWrapper: chatServerUrl is required");
    if (!t.chatServerKey)
      throw new Error("ChatWrapper: chatServerKey is required");
  },
  /**
   * Validate WebSocket URL format
   */
  validateWebSocketUrl: (t) => {
    if (!Fs.isValidWebSocketUrl(t))
      throw new Error(`Invalid WebSocket URL: ${t}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (t) => t.trim().length > 0
}, Hs = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...t) => t.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (t, e, n, r, i) => Hs.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${t}`,
    e && `chat-wrapper--${e}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    t === "embedded" && i && "chat-wrapper--constrained"
  )
}, zs = {
  /**
   * Create a standardized error for the chat system
   */
  createChatError: (t, e, n) => {
    const r = new Error(t);
    return r.code = e, r.originalError = n, r;
  },
  /**
   * Check if an error is a network error
   */
  isNetworkError: (t) => t.message.includes("fetch") || t.message.includes("network") || t.message.includes("connection"),
  /**
   * Get user-friendly error message
   */
  getUserFriendlyErrorMessage: (t) => zs.isNetworkError(t) ? "Connection error. Please check your internet connection and try again." : t.message.includes("authentication") || t.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : t.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, Lt = {
  state: Fu,
  url: Fs,
  validation: Hu,
  css: Hs,
  error: zs
};
class ya extends wi {
  constructor(n) {
    super(n);
    q(this, "resetTimeoutId", null);
    q(this, "resetErrorBoundary", () => {
      this.resetTimeoutId && clearTimeout(this.resetTimeoutId), this.setState({
        hasError: !1,
        error: void 0,
        errorInfo: void 0
      });
    });
    q(this, "handleRetry", () => {
      this.resetTimeoutId = window.setTimeout(() => {
        this.resetErrorBoundary();
      }, 100);
    });
    this.state = { hasError: !1 };
  }
  static getDerivedStateFromError(n) {
    return {
      hasError: !0,
      error: n
    };
  }
  componentDidCatch(n, r) {
    this.setState({
      error: n,
      errorInfo: r
    }), this.props.onError && this.props.onError(n, r);
  }
  componentDidUpdate(n) {
    const { resetOnPropsChange: r, resetKeys: i } = this.props, { hasError: a } = this.state;
    if (a && r && i) {
      const s = n.resetKeys || [];
      i.some(
        (l, u) => l !== s[u]
      ) && this.resetErrorBoundary();
    }
  }
  render() {
    const { hasError: n, error: r } = this.state, { children: i, fallback: a } = this.props;
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ p("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ P("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ p("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ p("p", { className: "chat-wrapper__error-message", children: Lt.error.getUserFriendlyErrorMessage(r) }),
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-actions", children: /* @__PURE__ */ p(
        "button",
        {
          className: "chat-wrapper__error-retry",
          onClick: this.handleRetry,
          type: "button",
          children: "Try Again"
        }
      ) }),
      (() => {
        try {
          return !0;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ P("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ p("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ p("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : i;
  }
}
class zu extends wi {
  constructor(n) {
    super(n);
    q(this, "retryCount", 0);
    q(this, "retryTimeoutId", null);
    q(this, "handleRetry", () => {
      const { maxRetries: n = 3, retryDelay: r = 1e3, onRetry: i } = this.props;
      this.retryCount >= n || (this.setState({ isRetrying: !0 }), this.retryCount++, this.retryTimeoutId = window.setTimeout(() => {
        this.setState({
          hasError: !1,
          error: void 0,
          isRetrying: !1
        }), i && i();
      }, r * this.retryCount));
    });
    q(this, "handleManualReset", () => {
      this.retryCount = 0, this.setState({
        hasError: !1,
        error: void 0,
        isRetrying: !1
      }), this.props.onRetry && this.props.onRetry();
    });
    this.state = {
      hasError: !1,
      isRetrying: !1
    };
  }
  static getDerivedStateFromError(n) {
    return {
      hasError: !0,
      error: n
    };
  }
  componentDidCatch(n) {
    this.props.onError && this.props.onError(n);
  }
  componentWillUnmount() {
    this.retryTimeoutId && clearTimeout(this.retryTimeoutId);
  }
  render() {
    const { hasError: n, error: r, isRetrying: i } = this.state, { children: a, maxRetries: s = 3 } = this.props;
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || Lt.error.isNetworkError(r)) ? /* @__PURE__ */ p("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ P("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ p("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ p("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ P("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ p("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ P(Xt, { children: [
        this.retryCount < s && /* @__PURE__ */ P(
          "button",
          {
            className: "chat-wrapper__error-retry",
            onClick: this.handleRetry,
            type: "button",
            children: [
              "Retry Connection (",
              s - this.retryCount,
              " attempts left)"
            ]
          }
        ),
        /* @__PURE__ */ p(
          "button",
          {
            className: "chat-wrapper__error-reset",
            onClick: this.handleManualReset,
            type: "button",
            children: "Reset Connection"
          }
        )
      ] }) }),
      (() => {
        try {
          return !0;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ P("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ p("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ p("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
}
class Uu extends wi {
  constructor(n) {
    super(n);
    q(this, "handleRetry", () => {
      this.setState({
        hasError: !1,
        error: void 0,
        failedFiles: void 0
      }), this.props.onRetry && this.props.onRetry();
    });
    q(this, "handleDismiss", () => {
      this.setState({
        hasError: !1,
        error: void 0,
        failedFiles: void 0
      });
    });
    this.state = { hasError: !1 };
  }
  static getDerivedStateFromError(n) {
    return {
      hasError: !0,
      error: n
    };
  }
  componentDidCatch(n) {
    const r = this.extractFailedFiles(n);
    this.setState({ failedFiles: r }), this.props.onError && this.props.onError(n, r);
  }
  extractFailedFiles(n) {
    const r = /file[s]?\s*['":]?\s*([^,\n]+)/gi, i = n.message.match(r);
    return i ? i.map((a) => a.replace(/file[s]?\s*['":]?\s*/i, "").trim()) : [];
  }
  render() {
    const { hasError: n, error: r, failedFiles: i } = this.state, { children: a, allowRetry: s = !0 } = this.props;
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ p("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ P("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ p("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ p("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ P("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ p("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ p("ul", { className: "chat-wrapper__failed-files-list", children: i.map((l, u) => /* @__PURE__ */ p("li", { className: "chat-wrapper__failed-file", children: l }, u)) })
      ] }),
      /* @__PURE__ */ P("div", { className: "chat-wrapper__error-actions", children: [
        s && /* @__PURE__ */ p(
          "button",
          {
            className: "chat-wrapper__error-retry",
            onClick: this.handleRetry,
            type: "button",
            children: "Try Again"
          }
        ),
        /* @__PURE__ */ p(
          "button",
          {
            className: "chat-wrapper__error-dismiss",
            onClick: this.handleDismiss,
            type: "button",
            children: "Continue Without Files"
          }
        )
      ] }),
      (() => {
        try {
          return !0;
        } catch {
          return !1;
        }
      })() && /* @__PURE__ */ P("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ p("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ p("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
  getFileUploadErrorMessage(n) {
    return n.message.includes("size") || n.message.includes("large") ? "File size is too large. Please try with smaller files." : n.message.includes("type") || n.message.includes("format") ? "File type is not supported. Please try with different file types." : n.message.includes("network") || n.message.includes("connection") ? "Network error during upload. Please check your connection and try again." : n.message.includes("timeout") ? "Upload timed out. Please try again with smaller files or better connection." : "Failed to upload files. Please try again.";
  }
}
const Bu = ({
  className: t,
  onClick: e,
  size: n = 24,
  color: r = "currentColor"
}) => /* @__PURE__ */ P(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: t,
    onClick: e,
    style: { cursor: e ? "pointer" : "default" },
    children: [
      /* @__PURE__ */ p(
        "path",
        {
          d: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z",
          fill: r
        }
      ),
      /* @__PURE__ */ p("circle", { cx: "7", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ p("circle", { cx: "12", cy: "10", r: "1", fill: r }),
      /* @__PURE__ */ p("circle", { cx: "17", cy: "10", r: "1", fill: r })
    ]
  }
), $u = ({
  className: t,
  onClick: e,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ p(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: t,
    onClick: e,
    style: { cursor: e ? "pointer" : "default" },
    children: /* @__PURE__ */ p(
      "path",
      {
        d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
        fill: r
      }
    )
  }
), ju = ({
  className: t,
  onClick: e,
  size: n = 20,
  color: r = "currentColor",
  isFullscreen: i = !1
}) => /* @__PURE__ */ p(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: t,
    onClick: e,
    style: { cursor: e ? "pointer" : "default" },
    children: i ? (
      // Minimize icon (arrows pointing inward)
      /* @__PURE__ */ p(
        "path",
        {
          d: "M8 3v3a2 2 0 01-2 2H3M21 8h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3M16 21v-3a2 2 0 012-2h3",
          stroke: r,
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
          stroke: r,
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    )
  }
), Vu = ({
  className: t,
  onClick: e,
  size: n = 20,
  color: r = "currentColor"
}) => /* @__PURE__ */ p(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: t,
    onClick: e,
    style: { cursor: e ? "pointer" : "default" },
    children: /* @__PURE__ */ p(
      "path",
      {
        d: "M18 12l-3 3-3-3m-6 3l-3 3-3-3",
        stroke: r,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
), Ag = ({
  className: t,
  onClick: e,
  size: n = 16,
  color: r = "currentColor"
}) => /* @__PURE__ */ p(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: t,
    onClick: e,
    style: { cursor: e ? "pointer" : "default" },
    children: /* @__PURE__ */ p(
      "path",
      {
        d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
        fill: r
      }
    )
  }
), Wu = ({
  className: t,
  onClick: e,
  size: n = 18,
  color: r = "currentColor"
}) => /* @__PURE__ */ P(
  "svg",
  {
    width: n,
    height: n,
    viewBox: "0 0 18 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: t,
    onClick: e,
    style: { cursor: e ? "pointer" : "default" },
    children: [
      /* @__PURE__ */ p("mask", { id: "mask0_444_23118", style: { maskType: "alpha" }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "18", height: "18", children: /* @__PURE__ */ p("rect", { width: "18", height: "18", fill: "#D9D9D9" }) }),
      /* @__PURE__ */ p("g", { mask: "url(#mask0_444_23118)", children: /* @__PURE__ */ p(
        "path",
        {
          d: "M5.8498 13.4998C5.47855 13.4998 5.16074 13.3676 4.89637 13.1032C4.63199 12.8389 4.4998 12.5211 4.4998 12.1498V3.1498C4.4998 2.77855 4.63199 2.46074 4.89637 2.19637C5.16074 1.93199 5.47855 1.7998 5.8498 1.7998H14.8498C15.2211 1.7998 15.5389 1.93199 15.8032 2.19637C16.0676 2.46074 16.1998 2.77855 16.1998 3.1498V12.1498C16.1998 12.5211 16.0676 12.8389 15.8032 13.1032C15.5389 13.3676 15.2211 13.4998 14.8498 13.4998H5.8498ZM5.8498 12.1498H14.8498V3.1498H5.8498V12.1498ZM3.1498 16.1998C2.77855 16.1998 2.46074 16.0676 2.19637 15.8032C1.93199 15.5389 1.7998 15.2211 1.7998 14.8498V4.4998H3.1498V14.8498H13.4998V16.1998H3.1498Z",
          fill: r
        }
      ) })
    ]
  }
), Gu = ({
  mode: t,
  headerName: e,
  bubbleText: n,
  showBubbleText: r = !0,
  onClick: i
}) => {
  const a = t === "modal" ? `Open ${e}` : `Expand ${e}`;
  return /* @__PURE__ */ P(
    "button",
    {
      className: "chat-wrapper__bubble-button",
      onClick: i,
      title: a,
      children: [
        /* @__PURE__ */ p(Bu, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ p("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, Zu = ({
  headerName: t,
  mode: e,
  isCollapsed: n,
  isModalOpen: r,
  onClose: i,
  onToggleFullscreen: a,
  onToggleCollapse: s
}) => {
  const o = () => e === "modal" && r && i ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__close-button",
      onClick: i,
      title: "Close chat",
      children: /* @__PURE__ */ p($u, { size: 20 })
    }
  ) : null, l = () => {
    if ((e === "sidebar" || e === "fullscreen") && !n && a) {
      const c = e === "fullscreen";
      return /* @__PURE__ */ p(
        "button",
        {
          className: c ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: a,
          title: c ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ p(ju, { size: 20, isFullscreen: c })
        }
      );
    }
    return null;
  }, u = () => (e === "sidebar" || e === "fullscreen") && !n && s ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: s,
      title: "Collapse chat",
      children: /* @__PURE__ */ p(Vu, { size: 20 })
    }
  ) : null;
  return /* @__PURE__ */ P("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ p("h2", { className: "chat-wrapper__title", children: t }) }),
    /* @__PURE__ */ P("div", { className: "chat-wrapper__header-controls", children: [
      l(),
      u(),
      o()
    ] })
  ] });
};
class qu extends Error {
  /**
   * Create an assertion error.
   *
   * @param {string} message
   *   Message explaining error.
   * @param {unknown} actual
   *   Value.
   * @param {unknown} expected
   *   Baseline.
   * @param {string} operator
   *   Name of equality operation.
   * @param {boolean} generated
   *   Whether `message` is a custom message or not
   * @returns
   *   Instance.
   */
  // eslint-disable-next-line max-params
  constructor(n, r, i, a, s) {
    super(n);
    q(
      this,
      "name",
      /** @type {const} */
      "Assertion"
    );
    q(
      this,
      "code",
      /** @type {const} */
      "ERR_ASSERTION"
    );
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.actual = r, this.expected = i, this.generated = s, this.operator = a;
  }
}
function x(t, e) {
  Us(
    !!t,
    !1,
    !0,
    "ok",
    "Expected value to be truthy",
    e
  );
}
function ii(t) {
  Us(!1, !1, !0, "ok", "Unreachable", t);
}
function Us(t, e, n, r, i, a) {
  if (!t)
    throw a instanceof Error ? a : new qu(
      a || i,
      e,
      n,
      r,
      !a
    );
}
function Ku(t, e) {
  const n = {};
  return (t[t.length - 1] === "" ? [...t, ""] : t).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Xu = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Yu = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ju = {};
function Ca(t, e) {
  return (Ju.jsx ? Yu : Xu).test(t);
}
const Qu = /[ \t\n\f\r]/g;
function ed(t) {
  return typeof t == "object" ? t.type === "text" ? wa(t.value) : !1 : wa(t);
}
function wa(t) {
  return t.replace(Qu, "") === "";
}
class Vn {
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
  constructor(e, n, r) {
    this.normal = n, this.property = e, r && (this.space = r);
  }
}
Vn.prototype.normal = {};
Vn.prototype.property = {};
Vn.prototype.space = void 0;
function Bs(t, e) {
  const n = {}, r = {};
  for (const i of t)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new Vn(n, r, e);
}
function ai(t) {
  return t.toLowerCase();
}
class ht {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(e, n) {
    this.attribute = n, this.property = e;
  }
}
ht.prototype.attribute = "";
ht.prototype.booleanish = !1;
ht.prototype.boolean = !1;
ht.prototype.commaOrSpaceSeparated = !1;
ht.prototype.commaSeparated = !1;
ht.prototype.defined = !1;
ht.prototype.mustUseProperty = !1;
ht.prototype.number = !1;
ht.prototype.overloadedBoolean = !1;
ht.prototype.property = "";
ht.prototype.spaceSeparated = !1;
ht.prototype.space = void 0;
let td = 0;
const pe = rn(), We = rn(), si = rn(), F = rn(), Oe = rn(), fn = rn(), ft = rn();
function rn() {
  return 2 ** ++td;
}
const oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: pe,
  booleanish: We,
  commaOrSpaceSeparated: ft,
  commaSeparated: fn,
  number: F,
  overloadedBoolean: si,
  spaceSeparated: Oe
}, Symbol.toStringTag, { value: "Module" })), Fr = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(oi)
);
class ki extends ht {
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
  constructor(e, n, r, i) {
    let a = -1;
    if (super(e, n), Sa(this, "space", i), typeof r == "number")
      for (; ++a < Fr.length; ) {
        const s = Fr[a];
        Sa(this, Fr[a], (r & oi[s]) === oi[s]);
      }
  }
}
ki.prototype.defined = !0;
function Sa(t, e, n) {
  n && (t[e] = n);
}
function wn(t) {
  const e = {}, n = {};
  for (const [r, i] of Object.entries(t.properties)) {
    const a = new ki(
      r,
      t.transform(t.attributes || {}, r),
      i,
      t.space
    );
    t.mustUseProperty && t.mustUseProperty.includes(r) && (a.mustUseProperty = !0), e[r] = a, n[ai(r)] = r, n[ai(a.attribute)] = r;
  }
  return new Vn(e, n, t.space);
}
const $s = wn({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: We,
    ariaAutoComplete: null,
    ariaBusy: We,
    ariaChecked: We,
    ariaColCount: F,
    ariaColIndex: F,
    ariaColSpan: F,
    ariaControls: Oe,
    ariaCurrent: null,
    ariaDescribedBy: Oe,
    ariaDetails: null,
    ariaDisabled: We,
    ariaDropEffect: Oe,
    ariaErrorMessage: null,
    ariaExpanded: We,
    ariaFlowTo: Oe,
    ariaGrabbed: We,
    ariaHasPopup: null,
    ariaHidden: We,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: Oe,
    ariaLevel: F,
    ariaLive: null,
    ariaModal: We,
    ariaMultiLine: We,
    ariaMultiSelectable: We,
    ariaOrientation: null,
    ariaOwns: Oe,
    ariaPlaceholder: null,
    ariaPosInSet: F,
    ariaPressed: We,
    ariaReadOnly: We,
    ariaRelevant: null,
    ariaRequired: We,
    ariaRoleDescription: Oe,
    ariaRowCount: F,
    ariaRowIndex: F,
    ariaRowSpan: F,
    ariaSelected: We,
    ariaSetSize: F,
    ariaSort: null,
    ariaValueMax: F,
    ariaValueMin: F,
    ariaValueNow: F,
    ariaValueText: null,
    role: null
  },
  transform(t, e) {
    return e === "role" ? e : "aria-" + e.slice(4).toLowerCase();
  }
});
function js(t, e) {
  return e in t ? t[e] : e;
}
function Vs(t, e) {
  return js(t, e.toLowerCase());
}
const nd = wn({
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
    accept: fn,
    acceptCharset: Oe,
    accessKey: Oe,
    action: null,
    allow: null,
    allowFullScreen: pe,
    allowPaymentRequest: pe,
    allowUserMedia: pe,
    alt: null,
    as: null,
    async: pe,
    autoCapitalize: null,
    autoComplete: Oe,
    autoFocus: pe,
    autoPlay: pe,
    blocking: Oe,
    capture: null,
    charSet: null,
    checked: pe,
    cite: null,
    className: Oe,
    cols: F,
    colSpan: null,
    content: null,
    contentEditable: We,
    controls: pe,
    controlsList: Oe,
    coords: F | fn,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: pe,
    defer: pe,
    dir: null,
    dirName: null,
    disabled: pe,
    download: si,
    draggable: We,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: pe,
    formTarget: null,
    headers: Oe,
    height: F,
    hidden: si,
    high: F,
    href: null,
    hrefLang: null,
    htmlFor: Oe,
    httpEquiv: Oe,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: pe,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: pe,
    itemId: null,
    itemProp: Oe,
    itemRef: Oe,
    itemScope: pe,
    itemType: Oe,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: pe,
    low: F,
    manifest: null,
    max: null,
    maxLength: F,
    media: null,
    method: null,
    min: null,
    minLength: F,
    multiple: pe,
    muted: pe,
    name: null,
    nonce: null,
    noModule: pe,
    noValidate: pe,
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
    open: pe,
    optimum: F,
    pattern: null,
    ping: Oe,
    placeholder: null,
    playsInline: pe,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: pe,
    referrerPolicy: null,
    rel: Oe,
    required: pe,
    reversed: pe,
    rows: F,
    rowSpan: F,
    sandbox: Oe,
    scope: null,
    scoped: pe,
    seamless: pe,
    selected: pe,
    shadowRootClonable: pe,
    shadowRootDelegatesFocus: pe,
    shadowRootMode: null,
    shape: null,
    size: F,
    sizes: null,
    slot: null,
    span: F,
    spellCheck: We,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: F,
    step: null,
    style: null,
    tabIndex: F,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: pe,
    useMap: null,
    value: We,
    width: F,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: Oe,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: F,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: F,
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
    compact: pe,
    // Lists. Use CSS to reduce space between items instead
    declare: pe,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: F,
    // `<img>` and `<object>`
    leftMargin: F,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: F,
    // `<body>`
    marginWidth: F,
    // `<body>`
    noResize: pe,
    // `<frame>`
    noHref: pe,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: pe,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: pe,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: F,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: We,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: F,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: F,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: pe,
    disableRemotePlayback: pe,
    prefix: null,
    property: null,
    results: F,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Vs
}), rd = wn({
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
    about: ft,
    accentHeight: F,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: F,
    amplitude: F,
    arabicForm: null,
    ascent: F,
    attributeName: null,
    attributeType: null,
    azimuth: F,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: F,
    by: null,
    calcMode: null,
    capHeight: F,
    className: Oe,
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
    descent: F,
    diffuseConstant: F,
    direction: null,
    display: null,
    dur: null,
    divisor: F,
    dominantBaseline: null,
    download: pe,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: F,
    enableBackground: null,
    end: null,
    event: null,
    exponent: F,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: F,
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
    g1: fn,
    g2: fn,
    glyphName: fn,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: F,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: F,
    horizOriginX: F,
    horizOriginY: F,
    id: null,
    ideographic: F,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: F,
    k: F,
    k1: F,
    k2: F,
    k3: F,
    k4: F,
    kernelMatrix: ft,
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
    limitingConeAngle: F,
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
    mediaSize: F,
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
    overlinePosition: F,
    overlineThickness: F,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: F,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: Oe,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: F,
    pointsAtY: F,
    pointsAtZ: F,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: ft,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: ft,
    rev: ft,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: ft,
    requiredFeatures: ft,
    requiredFonts: ft,
    requiredFormats: ft,
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
    specularConstant: F,
    specularExponent: F,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: F,
    strikethroughThickness: F,
    string: null,
    stroke: null,
    strokeDashArray: ft,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: F,
    strokeOpacity: F,
    strokeWidth: null,
    style: null,
    surfaceScale: F,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: ft,
    tabIndex: F,
    tableValues: null,
    target: null,
    targetX: F,
    targetY: F,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: ft,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: F,
    underlineThickness: F,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: F,
    values: null,
    vAlphabetic: F,
    vMathematical: F,
    vectorEffect: null,
    vHanging: F,
    vIdeographic: F,
    version: null,
    vertAdvY: F,
    vertOriginX: F,
    vertOriginY: F,
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
    xHeight: F,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: js
}), Ws = wn({
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
  transform(t, e) {
    return "xlink:" + e.slice(5).toLowerCase();
  }
}), Gs = wn({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Vs
}), Zs = wn({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(t, e) {
    return "xml:" + e.slice(3).toLowerCase();
  }
}), id = {
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
}, ad = /[A-Z]/g, xa = /-[a-z]/g, sd = /^data[-\w.:]+$/i;
function od(t, e) {
  const n = ai(e);
  let r = e, i = ht;
  if (n in t.normal)
    return t.property[t.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && sd.test(e)) {
    if (e.charAt(4) === "-") {
      const a = e.slice(5).replace(xa, cd);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = e.slice(4);
      if (!xa.test(a)) {
        let s = a.replace(ad, ld);
        s.charAt(0) !== "-" && (s = "-" + s), e = "data" + s;
      }
    }
    i = ki;
  }
  return new i(r, e);
}
function ld(t) {
  return "-" + t.toLowerCase();
}
function cd(t) {
  return t.charAt(1).toUpperCase();
}
const ud = Bs([$s, nd, Ws, Gs, Zs], "html"), bi = Bs([$s, rd, Ws, Gs, Zs], "svg");
function dd(t) {
  return t.join(" ").trim();
}
var Ti = {}, ka = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, hd = /\n/g, pd = /^\s*/, fd = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, gd = /^:\s*/, md = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, yd = /^[;\s]*/, Cd = /^\s+|\s+$/g, wd = `
`, ba = "/", Ta = "*", tn = "", Sd = "comment", xd = "declaration", kd = function(t, e) {
  if (typeof t != "string")
    throw new TypeError("First argument must be a string");
  if (!t) return [];
  e = e || {};
  var n = 1, r = 1;
  function i(C) {
    var k = C.match(hd);
    k && (n += k.length);
    var I = C.lastIndexOf(wd);
    r = ~I ? C.length - I : r + C.length;
  }
  function a() {
    var C = { line: n, column: r };
    return function(k) {
      return k.position = new s(C), u(), k;
    };
  }
  function s(C) {
    this.start = C, this.end = { line: n, column: r }, this.source = e.source;
  }
  s.prototype.content = t;
  function o(C) {
    var k = new Error(
      e.source + ":" + n + ":" + r + ": " + C
    );
    if (k.reason = C, k.filename = e.source, k.line = n, k.column = r, k.source = t, !e.silent) throw k;
  }
  function l(C) {
    var k = C.exec(t);
    if (k) {
      var I = k[0];
      return i(I), t = t.slice(I.length), k;
    }
  }
  function u() {
    l(pd);
  }
  function c(C) {
    var k;
    for (C = C || []; k = d(); )
      k !== !1 && C.push(k);
    return C;
  }
  function d() {
    var C = a();
    if (!(ba != t.charAt(0) || Ta != t.charAt(1))) {
      for (var k = 2; tn != t.charAt(k) && (Ta != t.charAt(k) || ba != t.charAt(k + 1)); )
        ++k;
      if (k += 2, tn === t.charAt(k - 1))
        return o("End of comment missing");
      var I = t.slice(2, k - 2);
      return r += 2, i(I), t = t.slice(k), r += 2, C({
        type: Sd,
        comment: I
      });
    }
  }
  function g() {
    var C = a(), k = l(fd);
    if (k) {
      if (d(), !l(gd)) return o("property missing ':'");
      var I = l(md), b = C({
        type: xd,
        property: Ea(k[0].replace(ka, tn)),
        value: I ? Ea(I[0].replace(ka, tn)) : tn
      });
      return l(yd), b;
    }
  }
  function h() {
    var C = [];
    c(C);
    for (var k; k = g(); )
      k !== !1 && (C.push(k), c(C));
    return C;
  }
  return u(), h();
};
function Ea(t) {
  return t ? t.replace(Cd, tn) : tn;
}
var bd = hr && hr.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(Ti, "__esModule", { value: !0 });
Ti.default = Ed;
var Td = bd(kd);
function Ed(t, e) {
  var n = null;
  if (!t || typeof t != "string")
    return n;
  var r = (0, Td.default)(t), i = typeof e == "function";
  return r.forEach(function(a) {
    if (a.type === "declaration") {
      var s = a.property, o = a.value;
      i ? e(s, o, a) : o && (n = n || {}, n[s] = o);
    }
  }), n;
}
var yr = {};
Object.defineProperty(yr, "__esModule", { value: !0 });
yr.camelCase = void 0;
var _d = /^--[a-zA-Z0-9_-]+$/, vd = /-([a-z])/g, Rd = /^[^-]+$/, Id = /^-(webkit|moz|ms|o|khtml)-/, Nd = /^-(ms)-/, Ad = function(t) {
  return !t || Rd.test(t) || _d.test(t);
}, Md = function(t, e) {
  return e.toUpperCase();
}, _a = function(t, e) {
  return "".concat(e, "-");
}, Od = function(t, e) {
  return e === void 0 && (e = {}), Ad(t) ? t : (t = t.toLowerCase(), e.reactCompat ? t = t.replace(Nd, _a) : t = t.replace(Id, _a), t.replace(vd, Md));
};
yr.camelCase = Od;
var Ld = hr && hr.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
}, Pd = Ld(Ti), Dd = yr;
function li(t, e) {
  var n = {};
  return !t || typeof t != "string" || (0, Pd.default)(t, function(r, i) {
    r && i && (n[(0, Dd.camelCase)(r, e)] = i);
  }), n;
}
li.default = li;
var Fd = li;
const Hd = /* @__PURE__ */ xi(Fd), qs = Ks("end"), Ei = Ks("start");
function Ks(t) {
  return e;
  function e(n) {
    const r = n && n.position && n.position[t] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function zd(t) {
  const e = Ei(t), n = qs(t);
  if (e && n)
    return { start: e, end: n };
}
function Fn(t) {
  return !t || typeof t != "object" ? "" : "position" in t || "type" in t ? va(t.position) : "start" in t || "end" in t ? va(t) : "line" in t || "column" in t ? ci(t) : "";
}
function ci(t) {
  return Ra(t && t.line) + ":" + Ra(t && t.column);
}
function va(t) {
  return ci(t && t.start) + "-" + ci(t && t.end);
}
function Ra(t) {
  return t && typeof t == "number" ? t : 1;
}
class nt extends Error {
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
  constructor(e, n, r) {
    super(), typeof n == "string" && (r = n, n = void 0);
    let i = "", a = {}, s = !1;
    if (n && ("line" in n && "column" in n ? a = { place: n } : "start" in n && "end" in n ? a = { place: n } : "type" in n ? a = {
      ancestors: [n],
      place: n.position
    } : a = { ...n }), typeof e == "string" ? i = e : !a.cause && e && (s = !0, i = e.message, a.cause = e), !a.ruleId && !a.source && typeof r == "string") {
      const l = r.indexOf(":");
      l === -1 ? a.ruleId = r : (a.source = r.slice(0, l), a.ruleId = r.slice(l + 1));
    }
    if (!a.place && a.ancestors && a.ancestors) {
      const l = a.ancestors[a.ancestors.length - 1];
      l && (a.place = l.position);
    }
    const o = a.place && "start" in a.place ? a.place.start : a.place;
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = o ? o.line : void 0, this.name = Fn(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = s && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
nt.prototype.file = "";
nt.prototype.name = "";
nt.prototype.reason = "";
nt.prototype.message = "";
nt.prototype.stack = "";
nt.prototype.column = void 0;
nt.prototype.line = void 0;
nt.prototype.ancestors = void 0;
nt.prototype.cause = void 0;
nt.prototype.fatal = void 0;
nt.prototype.place = void 0;
nt.prototype.ruleId = void 0;
nt.prototype.source = void 0;
const _i = {}.hasOwnProperty, Ud = /* @__PURE__ */ new Map(), Bd = /[A-Z]/g, $d = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), jd = /* @__PURE__ */ new Set(["td", "th"]), Xs = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Vd(t, e) {
  if (!e || e.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = e.filePath || void 0;
  let r;
  if (e.development) {
    if (typeof e.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Jd(n, e.jsxDEV);
  } else {
    if (typeof e.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof e.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Yd(n, e.jsx, e.jsxs);
  }
  const i = {
    Fragment: e.Fragment,
    ancestors: [],
    components: e.components || {},
    create: r,
    elementAttributeNameCase: e.elementAttributeNameCase || "react",
    evaluater: e.createEvaluater ? e.createEvaluater() : void 0,
    filePath: n,
    ignoreInvalidStyle: e.ignoreInvalidStyle || !1,
    passKeys: e.passKeys !== !1,
    passNode: e.passNode || !1,
    schema: e.space === "svg" ? bi : ud,
    stylePropertyNameCase: e.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: e.tableCellAlignToStyle !== !1
  }, a = Ys(i, t, void 0);
  return a && typeof a != "string" ? a : i.create(
    t,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function Ys(t, e, n) {
  if (e.type === "element")
    return Wd(t, e, n);
  if (e.type === "mdxFlowExpression" || e.type === "mdxTextExpression")
    return Gd(t, e);
  if (e.type === "mdxJsxFlowElement" || e.type === "mdxJsxTextElement")
    return qd(t, e, n);
  if (e.type === "mdxjsEsm")
    return Zd(t, e);
  if (e.type === "root")
    return Kd(t, e, n);
  if (e.type === "text")
    return Xd(t, e);
}
function Wd(t, e, n) {
  const r = t.schema;
  let i = r;
  e.tagName.toLowerCase() === "svg" && r.space === "html" && (i = bi, t.schema = i), t.ancestors.push(e);
  const a = Qs(t, e.tagName, !1), s = Qd(t, e);
  let o = Ri(t, e);
  return $d.has(e.tagName) && (o = o.filter(function(l) {
    return typeof l == "string" ? !ed(l) : !0;
  })), Js(t, s, a, e), vi(s, o), t.ancestors.pop(), t.schema = r, t.create(e, a, s, n);
}
function Gd(t, e) {
  if (e.data && e.data.estree && t.evaluater) {
    const r = e.data.estree.body[0];
    return x(r.type === "ExpressionStatement"), /** @type {Child | undefined} */
    t.evaluater.evaluateExpression(r.expression);
  }
  $n(t, e.position);
}
function Zd(t, e) {
  if (e.data && e.data.estree && t.evaluater)
    return (
      /** @type {Child | undefined} */
      t.evaluater.evaluateProgram(e.data.estree)
    );
  $n(t, e.position);
}
function qd(t, e, n) {
  const r = t.schema;
  let i = r;
  e.name === "svg" && r.space === "html" && (i = bi, t.schema = i), t.ancestors.push(e);
  const a = e.name === null ? t.Fragment : Qs(t, e.name, !0), s = eh(t, e), o = Ri(t, e);
  return Js(t, s, a, e), vi(s, o), t.ancestors.pop(), t.schema = r, t.create(e, a, s, n);
}
function Kd(t, e, n) {
  const r = {};
  return vi(r, Ri(t, e)), t.create(e, t.Fragment, r, n);
}
function Xd(t, e) {
  return e.value;
}
function Js(t, e, n, r) {
  typeof n != "string" && n !== t.Fragment && t.passNode && (e.node = r);
}
function vi(t, e) {
  if (e.length > 0) {
    const n = e.length > 1 ? e : e[0];
    n && (t.children = n);
  }
}
function Yd(t, e, n) {
  return r;
  function r(i, a, s, o) {
    const u = Array.isArray(s.children) ? n : e;
    return o ? u(a, s, o) : u(a, s);
  }
}
function Jd(t, e) {
  return n;
  function n(r, i, a, s) {
    const o = Array.isArray(a.children), l = Ei(r);
    return e(
      i,
      a,
      s,
      o,
      {
        columnNumber: l ? l.column - 1 : void 0,
        fileName: t,
        lineNumber: l ? l.line : void 0
      },
      void 0
    );
  }
}
function Qd(t, e) {
  const n = {};
  let r, i;
  for (i in e.properties)
    if (i !== "children" && _i.call(e.properties, i)) {
      const a = th(t, i, e.properties[i]);
      if (a) {
        const [s, o] = a;
        t.tableCellAlignToStyle && s === "align" && typeof o == "string" && jd.has(e.tagName) ? r = o : n[s] = o;
      }
    }
  if (r) {
    const a = (
      /** @type {Style} */
      n.style || (n.style = {})
    );
    a[t.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function eh(t, e) {
  const n = {};
  for (const r of e.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && t.evaluater) {
        const a = r.data.estree.body[0];
        x(a.type === "ExpressionStatement");
        const s = a.expression;
        x(s.type === "ObjectExpression");
        const o = s.properties[0];
        x(o.type === "SpreadElement"), Object.assign(
          n,
          t.evaluater.evaluateExpression(o.argument)
        );
      } else
        $n(t, e.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && t.evaluater) {
          const o = r.value.data.estree.body[0];
          x(o.type === "ExpressionStatement"), a = t.evaluater.evaluateExpression(o.expression);
        } else
          $n(t, e.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function Ri(t, e) {
  const n = [];
  let r = -1;
  const i = t.passKeys ? /* @__PURE__ */ new Map() : Ud;
  for (; ++r < e.children.length; ) {
    const a = e.children[r];
    let s;
    if (t.passKeys) {
      const l = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (l) {
        const u = i.get(l) || 0;
        s = l + "-" + u, i.set(l, u + 1);
      }
    }
    const o = Ys(t, a, s);
    o !== void 0 && n.push(o);
  }
  return n;
}
function th(t, e, n) {
  const r = od(t.schema, e);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Ku(n) : dd(n)), r.property === "style") {
      let i = typeof n == "object" ? n : nh(t, String(n));
      return t.stylePropertyNameCase === "css" && (i = rh(i)), ["style", i];
    }
    return [
      t.elementAttributeNameCase === "react" && r.space ? id[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function nh(t, e) {
  try {
    return Hd(e, { reactCompat: !0 });
  } catch (n) {
    if (t.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new nt("Cannot parse `style` attribute", {
      ancestors: t.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = t.filePath || void 0, i.url = Xs + "#cannot-parse-style-attribute", i;
  }
}
function Qs(t, e, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: e };
  else if (e.includes(".")) {
    const i = e.split(".");
    let a = -1, s;
    for (; ++a < i.length; ) {
      const o = Ca(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
      s = s ? {
        type: "MemberExpression",
        object: s,
        property: o,
        computed: !!(a && o.type === "Literal"),
        optional: !1
      } : o;
    }
    x(s, "always a result"), r = s;
  } else
    r = Ca(e) && !/^[a-z]/.test(e) ? { type: "Identifier", name: e } : { type: "Literal", value: e };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return _i.call(t.components, i) ? t.components[i] : i;
  }
  if (t.evaluater)
    return t.evaluater.evaluateExpression(r);
  $n(t);
}
function $n(t, e) {
  const n = new nt(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: t.ancestors,
      place: e,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = t.filePath || void 0, n.url = Xs + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function rh(t) {
  const e = {};
  let n;
  for (n in t)
    _i.call(t, n) && (e[ih(n)] = t[n]);
  return e;
}
function ih(t) {
  let e = t.replace(Bd, ah);
  return e.slice(0, 3) === "ms-" && (e = "-" + e), e;
}
function ah(t) {
  return "-" + t.toLowerCase();
}
const Hr = {
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
}, sh = {};
function oh(t, e) {
  const n = sh, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return eo(t, r, i);
}
function eo(t, e, n) {
  if (lh(t)) {
    if ("value" in t)
      return t.type === "html" && !n ? "" : t.value;
    if (e && "alt" in t && t.alt)
      return t.alt;
    if ("children" in t)
      return Ia(t.children, e, n);
  }
  return Array.isArray(t) ? Ia(t, e, n) : "";
}
function Ia(t, e, n) {
  const r = [];
  let i = -1;
  for (; ++i < t.length; )
    r[i] = eo(t[i], e, n);
  return r.join("");
}
function lh(t) {
  return !!(t && typeof t == "object");
}
const Na = document.createElement("i");
function Ii(t) {
  const e = "&" + t + ";";
  Na.innerHTML = e;
  const n = Na.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && t !== "semi" || n === e ? !1 : n
  );
}
const m = (
  /** @type {const} */
  {
    carriageReturn: -5,
    lineFeed: -4,
    carriageReturnLineFeed: -3,
    horizontalTab: -2,
    virtualSpace: -1,
    eof: null,
    nul: 0,
    ht: 9,
    // `\t`
    lf: 10,
    // `\n`
    vt: 11,
    // `\v`
    cr: 13,
    // `\r`
    space: 32,
    exclamationMark: 33,
    // `!`
    quotationMark: 34,
    // `"`
    numberSign: 35,
    // `#`
    percentSign: 37,
    // `%`
    ampersand: 38,
    // `&`
    apostrophe: 39,
    // `'`
    leftParenthesis: 40,
    // `(`
    rightParenthesis: 41,
    // `)`
    asterisk: 42,
    // `*`
    plusSign: 43,
    // `+`
    dash: 45,
    // `-`
    dot: 46,
    // `.`
    slash: 47,
    // `/`
    digit0: 48,
    // `0`
    digit1: 49,
    // `1`
    digit2: 50,
    // `2`
    digit3: 51,
    // `3`
    digit4: 52,
    // `4`
    digit5: 53,
    // `5`
    digit6: 54,
    // `6`
    digit7: 55,
    // `7`
    digit8: 56,
    // `8`
    digit9: 57,
    // `9`
    colon: 58,
    // `:`
    semicolon: 59,
    // `;`
    lessThan: 60,
    // `<`
    equalsTo: 61,
    // `=`
    greaterThan: 62,
    // `>`
    questionMark: 63,
    // `?`
    atSign: 64,
    // `@`
    uppercaseX: 88,
    // `X`
    leftSquareBracket: 91,
    // `[`
    backslash: 92,
    // `\`
    rightSquareBracket: 93,
    // `]`
    caret: 94,
    // `^`
    underscore: 95,
    // `_`
    graveAccent: 96,
    // `` ` ``
    lowercaseX: 120,
    // `x`
    tilde: 126,
    // `~`
    del: 127,
    // Unicode Specials block.
    byteOrderMarker: 65279,
    // Unicode Specials block.
    replacementCharacter: 65533
    // `�`
  }
), j = (
  /** @type {const} */
  {
    atxHeadingOpeningFenceSizeMax: 6,
    // 6 number signs is fine, 7 isn’t.
    autolinkDomainSizeMax: 63,
    // 63 characters is fine, 64 is too many.
    autolinkSchemeSizeMax: 32,
    // 32 characters is fine, 33 is too many.
    cdataOpeningString: "CDATA[",
    // And preceded by `<![`.
    characterGroupPunctuation: 2,
    // Symbol used to indicate a character is punctuation
    characterGroupWhitespace: 1,
    // Symbol used to indicate a character is whitespace
    characterReferenceDecimalSizeMax: 7,
    // `&#9999999;`.
    characterReferenceHexadecimalSizeMax: 6,
    // `&#xff9999;`.
    characterReferenceNamedSizeMax: 31,
    // `&CounterClockwiseContourIntegral;`.
    codeFencedSequenceSizeMin: 3,
    // At least 3 ticks or tildes are needed.
    contentTypeContent: "content",
    contentTypeFlow: "flow",
    contentTypeString: "string",
    contentTypeText: "text",
    hardBreakPrefixSizeMin: 2,
    // At least 2 trailing spaces are needed.
    htmlBasic: 6,
    // Symbol for `<div`
    htmlCdata: 5,
    // Symbol for `<![CDATA[]]>`
    htmlComment: 2,
    // Symbol for `<!---->`
    htmlComplete: 7,
    // Symbol for `<x>`
    htmlDeclaration: 4,
    // Symbol for `<!doctype>`
    htmlInstruction: 3,
    // Symbol for `<?php?>`
    htmlRawSizeMax: 8,
    // Length of `textarea`.
    htmlRaw: 1,
    // Symbol for `<script>`
    linkResourceDestinationBalanceMax: 32,
    // See: <https://spec.commonmark.org/0.30/#link-destination>, <https://github.com/remarkjs/react-markdown/issues/658#issuecomment-984345577>
    linkReferenceSizeMax: 999,
    // See: <https://spec.commonmark.org/0.30/#link-label>
    listItemValueSizeMax: 10,
    // See: <https://spec.commonmark.org/0.30/#ordered-list-marker>
    numericBaseDecimal: 10,
    numericBaseHexadecimal: 16,
    tabSize: 4,
    // Tabs have a hard-coded size of 4, per CommonMark.
    thematicBreakMarkerCountMin: 3,
    // At least 3 asterisks, dashes, or underscores are needed.
    v8MaxSafeChunkSize: 1e4
    // V8 (and potentially others) have problems injecting giant arrays into other arrays, hence we operate in chunks.
  }
), f = (
  /** @type {const} */
  {
    // Generic type for data, such as in a title, a destination, etc.
    data: "data",
    // Generic type for syntactic whitespace (tabs, virtual spaces, spaces).
    // Such as, between a fenced code fence and an info string.
    whitespace: "whitespace",
    // Generic type for line endings (line feed, carriage return, carriage return +
    // line feed).
    lineEnding: "lineEnding",
    // A line ending, but ending a blank line.
    lineEndingBlank: "lineEndingBlank",
    // Generic type for whitespace (tabs, virtual spaces, spaces) at the start of a
    // line.
    linePrefix: "linePrefix",
    // Generic type for whitespace (tabs, virtual spaces, spaces) at the end of a
    // line.
    lineSuffix: "lineSuffix",
    // Whole ATX heading:
    //
    // ```markdown
    // #
    // ## Alpha
    // ### Bravo ###
    // ```
    //
    // Includes `atxHeadingSequence`, `whitespace`, `atxHeadingText`.
    atxHeading: "atxHeading",
    // Sequence of number signs in an ATX heading (`###`).
    atxHeadingSequence: "atxHeadingSequence",
    // Content in an ATX heading (`alpha`).
    // Includes text.
    atxHeadingText: "atxHeadingText",
    // Whole autolink (`<https://example.com>` or `<admin@example.com>`)
    // Includes `autolinkMarker` and `autolinkProtocol` or `autolinkEmail`.
    autolink: "autolink",
    // Email autolink w/o markers (`admin@example.com`)
    autolinkEmail: "autolinkEmail",
    // Marker around an `autolinkProtocol` or `autolinkEmail` (`<` or `>`).
    autolinkMarker: "autolinkMarker",
    // Protocol autolink w/o markers (`https://example.com`)
    autolinkProtocol: "autolinkProtocol",
    // A whole character escape (`\-`).
    // Includes `escapeMarker` and `characterEscapeValue`.
    characterEscape: "characterEscape",
    // The escaped character (`-`).
    characterEscapeValue: "characterEscapeValue",
    // A whole character reference (`&amp;`, `&#8800;`, or `&#x1D306;`).
    // Includes `characterReferenceMarker`, an optional
    // `characterReferenceMarkerNumeric`, in which case an optional
    // `characterReferenceMarkerHexadecimal`, and a `characterReferenceValue`.
    characterReference: "characterReference",
    // The start or end marker (`&` or `;`).
    characterReferenceMarker: "characterReferenceMarker",
    // Mark reference as numeric (`#`).
    characterReferenceMarkerNumeric: "characterReferenceMarkerNumeric",
    // Mark reference as numeric (`x` or `X`).
    characterReferenceMarkerHexadecimal: "characterReferenceMarkerHexadecimal",
    // Value of character reference w/o markers (`amp`, `8800`, or `1D306`).
    characterReferenceValue: "characterReferenceValue",
    // Whole fenced code:
    //
    // ````markdown
    // ```js
    // alert(1)
    // ```
    // ````
    codeFenced: "codeFenced",
    // A fenced code fence, including whitespace, sequence, info, and meta
    // (` ```js `).
    codeFencedFence: "codeFencedFence",
    // Sequence of grave accent or tilde characters (` ``` `) in a fence.
    codeFencedFenceSequence: "codeFencedFenceSequence",
    // Info word (`js`) in a fence.
    // Includes string.
    codeFencedFenceInfo: "codeFencedFenceInfo",
    // Meta words (`highlight="1"`) in a fence.
    // Includes string.
    codeFencedFenceMeta: "codeFencedFenceMeta",
    // A line of code.
    codeFlowValue: "codeFlowValue",
    // Whole indented code:
    //
    // ```markdown
    //     alert(1)
    // ```
    //
    // Includes `lineEnding`, `linePrefix`, and `codeFlowValue`.
    codeIndented: "codeIndented",
    // A text code (``` `alpha` ```).
    // Includes `codeTextSequence`, `codeTextData`, `lineEnding`, and can include
    // `codeTextPadding`.
    codeText: "codeText",
    codeTextData: "codeTextData",
    // A space or line ending right after or before a tick.
    codeTextPadding: "codeTextPadding",
    // A text code fence (` `` `).
    codeTextSequence: "codeTextSequence",
    // Whole content:
    //
    // ```markdown
    // [a]: b
    // c
    // =
    // d
    // ```
    //
    // Includes `paragraph` and `definition`.
    content: "content",
    // Whole definition:
    //
    // ```markdown
    // [micromark]: https://github.com/micromark/micromark
    // ```
    //
    // Includes `definitionLabel`, `definitionMarker`, `whitespace`,
    // `definitionDestination`, and optionally `lineEnding` and `definitionTitle`.
    definition: "definition",
    // Destination of a definition (`https://github.com/micromark/micromark` or
    // `<https://github.com/micromark/micromark>`).
    // Includes `definitionDestinationLiteral` or `definitionDestinationRaw`.
    definitionDestination: "definitionDestination",
    // Enclosed destination of a definition
    // (`<https://github.com/micromark/micromark>`).
    // Includes `definitionDestinationLiteralMarker` and optionally
    // `definitionDestinationString`.
    definitionDestinationLiteral: "definitionDestinationLiteral",
    // Markers of an enclosed definition destination (`<` or `>`).
    definitionDestinationLiteralMarker: "definitionDestinationLiteralMarker",
    // Unenclosed destination of a definition
    // (`https://github.com/micromark/micromark`).
    // Includes `definitionDestinationString`.
    definitionDestinationRaw: "definitionDestinationRaw",
    // Text in an destination (`https://github.com/micromark/micromark`).
    // Includes string.
    definitionDestinationString: "definitionDestinationString",
    // Label of a definition (`[micromark]`).
    // Includes `definitionLabelMarker` and `definitionLabelString`.
    definitionLabel: "definitionLabel",
    // Markers of a definition label (`[` or `]`).
    definitionLabelMarker: "definitionLabelMarker",
    // Value of a definition label (`micromark`).
    // Includes string.
    definitionLabelString: "definitionLabelString",
    // Marker between a label and a destination (`:`).
    definitionMarker: "definitionMarker",
    // Title of a definition (`"x"`, `'y'`, or `(z)`).
    // Includes `definitionTitleMarker` and optionally `definitionTitleString`.
    definitionTitle: "definitionTitle",
    // Marker around a title of a definition (`"`, `'`, `(`, or `)`).
    definitionTitleMarker: "definitionTitleMarker",
    // Data without markers in a title (`z`).
    // Includes string.
    definitionTitleString: "definitionTitleString",
    // Emphasis (`*alpha*`).
    // Includes `emphasisSequence` and `emphasisText`.
    emphasis: "emphasis",
    // Sequence of emphasis markers (`*` or `_`).
    emphasisSequence: "emphasisSequence",
    // Emphasis text (`alpha`).
    // Includes text.
    emphasisText: "emphasisText",
    // The character escape marker (`\`).
    escapeMarker: "escapeMarker",
    // A hard break created with a backslash (`\\n`).
    // Note: does not include the line ending.
    hardBreakEscape: "hardBreakEscape",
    // A hard break created with trailing spaces (`  \n`).
    // Does not include the line ending.
    hardBreakTrailing: "hardBreakTrailing",
    // Flow HTML:
    //
    // ```markdown
    // <div
    // ```
    //
    // Inlcudes `lineEnding`, `htmlFlowData`.
    htmlFlow: "htmlFlow",
    htmlFlowData: "htmlFlowData",
    // HTML in text (the tag in `a <i> b`).
    // Includes `lineEnding`, `htmlTextData`.
    htmlText: "htmlText",
    htmlTextData: "htmlTextData",
    // Whole image (`![alpha](bravo)`, `![alpha][bravo]`, `![alpha][]`, or
    // `![alpha]`).
    // Includes `label` and an optional `resource` or `reference`.
    image: "image",
    // Whole link label (`[*alpha*]`).
    // Includes `labelLink` or `labelImage`, `labelText`, and `labelEnd`.
    label: "label",
    // Text in an label (`*alpha*`).
    // Includes text.
    labelText: "labelText",
    // Start a link label (`[`).
    // Includes a `labelMarker`.
    labelLink: "labelLink",
    // Start an image label (`![`).
    // Includes `labelImageMarker` and `labelMarker`.
    labelImage: "labelImage",
    // Marker of a label (`[` or `]`).
    labelMarker: "labelMarker",
    // Marker to start an image (`!`).
    labelImageMarker: "labelImageMarker",
    // End a label (`]`).
    // Includes `labelMarker`.
    labelEnd: "labelEnd",
    // Whole link (`[alpha](bravo)`, `[alpha][bravo]`, `[alpha][]`, or `[alpha]`).
    // Includes `label` and an optional `resource` or `reference`.
    link: "link",
    // Whole paragraph:
    //
    // ```markdown
    // alpha
    // bravo.
    // ```
    //
    // Includes text.
    paragraph: "paragraph",
    // A reference (`[alpha]` or `[]`).
    // Includes `referenceMarker` and an optional `referenceString`.
    reference: "reference",
    // A reference marker (`[` or `]`).
    referenceMarker: "referenceMarker",
    // Reference text (`alpha`).
    // Includes string.
    referenceString: "referenceString",
    // A resource (`(https://example.com "alpha")`).
    // Includes `resourceMarker`, an optional `resourceDestination` with an optional
    // `whitespace` and `resourceTitle`.
    resource: "resource",
    // A resource destination (`https://example.com`).
    // Includes `resourceDestinationLiteral` or `resourceDestinationRaw`.
    resourceDestination: "resourceDestination",
    // A literal resource destination (`<https://example.com>`).
    // Includes `resourceDestinationLiteralMarker` and optionally
    // `resourceDestinationString`.
    resourceDestinationLiteral: "resourceDestinationLiteral",
    // A resource destination marker (`<` or `>`).
    resourceDestinationLiteralMarker: "resourceDestinationLiteralMarker",
    // A raw resource destination (`https://example.com`).
    // Includes `resourceDestinationString`.
    resourceDestinationRaw: "resourceDestinationRaw",
    // Resource destination text (`https://example.com`).
    // Includes string.
    resourceDestinationString: "resourceDestinationString",
    // A resource marker (`(` or `)`).
    resourceMarker: "resourceMarker",
    // A resource title (`"alpha"`, `'alpha'`, or `(alpha)`).
    // Includes `resourceTitleMarker` and optionally `resourceTitleString`.
    resourceTitle: "resourceTitle",
    // A resource title marker (`"`, `'`, `(`, or `)`).
    resourceTitleMarker: "resourceTitleMarker",
    // Resource destination title (`alpha`).
    // Includes string.
    resourceTitleString: "resourceTitleString",
    // Whole setext heading:
    //
    // ```markdown
    // alpha
    // bravo
    // =====
    // ```
    //
    // Includes `setextHeadingText`, `lineEnding`, `linePrefix`, and
    // `setextHeadingLine`.
    setextHeading: "setextHeading",
    // Content in a setext heading (`alpha\nbravo`).
    // Includes text.
    setextHeadingText: "setextHeadingText",
    // Underline in a setext heading, including whitespace suffix (`==`).
    // Includes `setextHeadingLineSequence`.
    setextHeadingLine: "setextHeadingLine",
    // Sequence of equals or dash characters in underline in a setext heading (`-`).
    setextHeadingLineSequence: "setextHeadingLineSequence",
    // Strong (`**alpha**`).
    // Includes `strongSequence` and `strongText`.
    strong: "strong",
    // Sequence of strong markers (`**` or `__`).
    strongSequence: "strongSequence",
    // Strong text (`alpha`).
    // Includes text.
    strongText: "strongText",
    // Whole thematic break:
    //
    // ```markdown
    // * * *
    // ```
    //
    // Includes `thematicBreakSequence` and `whitespace`.
    thematicBreak: "thematicBreak",
    // A sequence of one or more thematic break markers (`***`).
    thematicBreakSequence: "thematicBreakSequence",
    // Whole block quote:
    //
    // ```markdown
    // > a
    // >
    // > b
    // ```
    //
    // Includes `blockQuotePrefix` and flow.
    blockQuote: "blockQuote",
    // The `>` or `> ` of a block quote.
    blockQuotePrefix: "blockQuotePrefix",
    // The `>` of a block quote prefix.
    blockQuoteMarker: "blockQuoteMarker",
    // The optional ` ` of a block quote prefix.
    blockQuotePrefixWhitespace: "blockQuotePrefixWhitespace",
    // Whole ordered list:
    //
    // ```markdown
    // 1. a
    //    b
    // ```
    //
    // Includes `listItemPrefix`, flow, and optionally  `listItemIndent` on further
    // lines.
    listOrdered: "listOrdered",
    // Whole unordered list:
    //
    // ```markdown
    // - a
    //   b
    // ```
    //
    // Includes `listItemPrefix`, flow, and optionally  `listItemIndent` on further
    // lines.
    listUnordered: "listUnordered",
    // The indent of further list item lines.
    listItemIndent: "listItemIndent",
    // A marker, as in, `*`, `+`, `-`, `.`, or `)`.
    listItemMarker: "listItemMarker",
    // The thing that starts a list item, such as `1. `.
    // Includes `listItemValue` if ordered, `listItemMarker`, and
    // `listItemPrefixWhitespace` (unless followed by a line ending).
    listItemPrefix: "listItemPrefix",
    // The whitespace after a marker.
    listItemPrefixWhitespace: "listItemPrefixWhitespace",
    // The numerical value of an ordered item.
    listItemValue: "listItemValue",
    chunkContent: "chunkContent",
    chunkFlow: "chunkFlow",
    chunkText: "chunkText",
    chunkString: "chunkString"
  }
), Ot = (
  /** @type {const} */
  {
    ht: "	",
    lf: `
`,
    cr: "\r",
    space: " ",
    replacementCharacter: "�"
  }
);
function Ft(t, e, n, r) {
  const i = t.length;
  let a = 0, s;
  if (e < 0 ? e = -e > i ? 0 : i + e : e = e > i ? i : e, n = n > 0 ? n : 0, r.length < j.v8MaxSafeChunkSize)
    s = Array.from(r), s.unshift(e, n), t.splice(...s);
  else
    for (n && t.splice(e, n); a < r.length; )
      s = r.slice(
        a,
        a + j.v8MaxSafeChunkSize
      ), s.unshift(e, 0), t.splice(...s), a += j.v8MaxSafeChunkSize, e += j.v8MaxSafeChunkSize;
}
function wt(t, e) {
  return t.length > 0 ? (Ft(t, t.length, 0, e), t) : e;
}
const Aa = {}.hasOwnProperty;
function ch(t) {
  const e = {};
  let n = -1;
  for (; ++n < t.length; )
    uh(e, t[n]);
  return e;
}
function uh(t, e) {
  let n;
  for (n in e) {
    const i = (Aa.call(t, n) ? t[n] : void 0) || (t[n] = {}), a = e[n];
    let s;
    if (a)
      for (s in a) {
        Aa.call(i, s) || (i[s] = []);
        const o = a[s];
        dh(
          // @ts-expect-error Looks like a list.
          i[s],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function dh(t, e) {
  let n = -1;
  const r = [];
  for (; ++n < e.length; )
    (e[n].add === "after" ? t : r).push(e[n]);
  Ft(t, 0, 0, r);
}
function to(t, e) {
  const n = Number.parseInt(t, e);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < m.ht || n === m.vt || n > m.cr && n < m.space || // Control character (DEL) of C0, and C1 controls.
    n > m.tilde && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? Ot.replacementCharacter : String.fromCodePoint(n)
  );
}
function gn(t) {
  return t.replace(/[\t\n\r ]+/g, Ot.space).replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Pt = Jt(/[A-Za-z]/), mt = Jt(/[\dA-Za-z]/), hh = Jt(/[#-'*+\--9=?A-Z^-~]/);
function ui(t) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    t !== null && (t < m.space || t === m.del)
  );
}
const di = Jt(/\d/), ph = Jt(/[\dA-Fa-f]/), fh = Jt(/[!-/:-@[-`{-~]/);
function Y(t) {
  return t !== null && t < m.horizontalTab;
}
function ut(t) {
  return t !== null && (t < m.nul || t === m.space);
}
function Se(t) {
  return t === m.horizontalTab || t === m.virtualSpace || t === m.space;
}
const gh = Jt(new RegExp("\\p{P}|\\p{S}", "u")), mh = Jt(/\s/);
function Jt(t) {
  return e;
  function e(n) {
    return n !== null && n > -1 && t.test(String.fromCharCode(n));
  }
}
function Sn(t) {
  const e = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < t.length; ) {
    const a = t.charCodeAt(n);
    let s = "";
    if (a === m.percentSign && mt(t.charCodeAt(n + 1)) && mt(t.charCodeAt(n + 2)))
      i = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (s = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const o = t.charCodeAt(n + 1);
      a < 56320 && o > 56319 && o < 57344 ? (s = String.fromCharCode(a, o), i = 1) : s = Ot.replacementCharacter;
    } else
      s = String.fromCharCode(a);
    s && (e.push(t.slice(r, n), encodeURIComponent(s)), r = n + i + 1, s = ""), i && (n += i, i = 0);
  }
  return e.join("") + t.slice(r);
}
function Le(t, e, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return s;
  function s(l) {
    return Se(l) ? (t.enter(n), o(l)) : e(l);
  }
  function o(l) {
    return Se(l) && a++ < i ? (t.consume(l), o) : (t.exit(n), e(l));
  }
}
const yh = { tokenize: Ch };
function Ch(t) {
  const e = t.attempt(
    this.parser.constructs.contentInitial,
    r,
    i
  );
  let n;
  return e;
  function r(o) {
    if (x(
      o === m.eof || Y(o),
      "expected eol or eof"
    ), o === m.eof) {
      t.consume(o);
      return;
    }
    return t.enter(f.lineEnding), t.consume(o), t.exit(f.lineEnding), Le(t, e, f.linePrefix);
  }
  function i(o) {
    return x(
      o !== m.eof && !Y(o),
      "expected anything other than a line ending or EOF"
    ), t.enter(f.paragraph), a(o);
  }
  function a(o) {
    const l = t.enter(f.chunkText, {
      contentType: j.contentTypeText,
      previous: n
    });
    return n && (n.next = l), n = l, s(o);
  }
  function s(o) {
    if (o === m.eof) {
      t.exit(f.chunkText), t.exit(f.paragraph), t.consume(o);
      return;
    }
    return Y(o) ? (t.consume(o), t.exit(f.chunkText), a) : (t.consume(o), s);
  }
}
const wh = { tokenize: Sh }, Ma = { tokenize: xh };
function Sh(t) {
  const e = this, n = [];
  let r = 0, i, a, s;
  return o;
  function o(R) {
    if (r < n.length) {
      const M = n[r];
      return e.containerState = M[1], x(
        M[0].continuation,
        "expected `continuation` to be defined on container construct"
      ), t.attempt(
        M[0].continuation,
        l,
        u
      )(R);
    }
    return u(R);
  }
  function l(R) {
    if (x(
      e.containerState,
      "expected `containerState` to be defined after continuation"
    ), r++, e.containerState._closeFlow) {
      e.containerState._closeFlow = void 0, i && E();
      const M = e.events.length;
      let D = M, T;
      for (; D--; )
        if (e.events[D][0] === "exit" && e.events[D][1].type === f.chunkFlow) {
          T = e.events[D][1].end;
          break;
        }
      x(T, "could not find previous flow chunk"), b(r);
      let z = M;
      for (; z < e.events.length; )
        e.events[z][1].end = { ...T }, z++;
      return Ft(
        e.events,
        D + 1,
        0,
        e.events.slice(M)
      ), e.events.length = z, u(R);
    }
    return o(R);
  }
  function u(R) {
    if (r === n.length) {
      if (!i)
        return g(R);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return C(R);
      e.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return e.containerState = {}, t.check(
      Ma,
      c,
      d
    )(R);
  }
  function c(R) {
    return i && E(), b(r), g(R);
  }
  function d(R) {
    return e.parser.lazy[e.now().line] = r !== n.length, s = e.now().offset, C(R);
  }
  function g(R) {
    return e.containerState = {}, t.attempt(
      Ma,
      h,
      C
    )(R);
  }
  function h(R) {
    return x(
      e.currentConstruct,
      "expected `currentConstruct` to be defined on tokenizer"
    ), x(
      e.containerState,
      "expected `containerState` to be defined on tokenizer"
    ), r++, n.push([e.currentConstruct, e.containerState]), g(R);
  }
  function C(R) {
    if (R === m.eof) {
      i && E(), b(0), t.consume(R);
      return;
    }
    return i = i || e.parser.flow(e.now()), t.enter(f.chunkFlow, {
      _tokenizer: i,
      contentType: j.contentTypeFlow,
      previous: a
    }), k(R);
  }
  function k(R) {
    if (R === m.eof) {
      I(t.exit(f.chunkFlow), !0), b(0), t.consume(R);
      return;
    }
    return Y(R) ? (t.consume(R), I(t.exit(f.chunkFlow)), r = 0, e.interrupt = void 0, o) : (t.consume(R), k);
  }
  function I(R, M) {
    x(i, "expected `childFlow` to be defined when continuing");
    const D = e.sliceStream(R);
    if (M && D.push(null), R.previous = a, a && (a.next = R), a = R, i.defineSkip(R.start), i.write(D), e.parser.lazy[R.start.line]) {
      let T = i.events.length;
      for (; T--; )
        if (
          // The token starts before the line ending…
          i.events[T][1].start.offset < s && // …and either is not ended yet…
          (!i.events[T][1].end || // …or ends after it.
          i.events[T][1].end.offset > s)
        )
          return;
      const z = e.events.length;
      let U = z, V, K;
      for (; U--; )
        if (e.events[U][0] === "exit" && e.events[U][1].type === f.chunkFlow) {
          if (V) {
            K = e.events[U][1].end;
            break;
          }
          V = !0;
        }
      for (x(K, "could not find previous flow chunk"), b(r), T = z; T < e.events.length; )
        e.events[T][1].end = { ...K }, T++;
      Ft(
        e.events,
        U + 1,
        0,
        e.events.slice(z)
      ), e.events.length = T;
    }
  }
  function b(R) {
    let M = n.length;
    for (; M-- > R; ) {
      const D = n[M];
      e.containerState = D[1], x(
        D[0].exit,
        "expected `exit` to be defined on container construct"
      ), D[0].exit.call(e, t);
    }
    n.length = R;
  }
  function E() {
    x(
      e.containerState,
      "expected `containerState` to be defined when closing flow"
    ), x(i, "expected `childFlow` to be defined when closing it"), i.write([m.eof]), a = void 0, i = void 0, e.containerState._closeFlow = void 0;
  }
}
function xh(t, e, n) {
  return x(
    this.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), Le(
    t,
    t.attempt(this.parser.constructs.document, e, n),
    f.linePrefix,
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : j.tabSize
  );
}
function Oa(t) {
  if (t === m.eof || ut(t) || mh(t))
    return j.characterGroupWhitespace;
  if (gh(t))
    return j.characterGroupPunctuation;
}
function Ni(t, e, n) {
  const r = [];
  let i = -1;
  for (; ++i < t.length; ) {
    const a = t[i].resolveAll;
    a && !r.includes(a) && (e = a(e, n), r.push(a));
  }
  return e;
}
const hi = {
  name: "attention",
  resolveAll: kh,
  tokenize: bh
};
function kh(t, e) {
  let n = -1, r, i, a, s, o, l, u, c;
  for (; ++n < t.length; )
    if (t[n][0] === "enter" && t[n][1].type === "attentionSequence" && t[n][1]._close) {
      for (r = n; r--; )
        if (t[r][0] === "exit" && t[r][1].type === "attentionSequence" && t[r][1]._open && // If the markers are the same:
        e.sliceSerialize(t[r][1]).charCodeAt(0) === e.sliceSerialize(t[n][1]).charCodeAt(0)) {
          if ((t[r][1]._close || t[n][1]._open) && (t[n][1].end.offset - t[n][1].start.offset) % 3 && !((t[r][1].end.offset - t[r][1].start.offset + t[n][1].end.offset - t[n][1].start.offset) % 3))
            continue;
          l = t[r][1].end.offset - t[r][1].start.offset > 1 && t[n][1].end.offset - t[n][1].start.offset > 1 ? 2 : 1;
          const d = { ...t[r][1].end }, g = { ...t[n][1].start };
          La(d, -l), La(g, l), s = {
            type: l > 1 ? f.strongSequence : f.emphasisSequence,
            start: d,
            end: { ...t[r][1].end }
          }, o = {
            type: l > 1 ? f.strongSequence : f.emphasisSequence,
            start: { ...t[n][1].start },
            end: g
          }, a = {
            type: l > 1 ? f.strongText : f.emphasisText,
            start: { ...t[r][1].end },
            end: { ...t[n][1].start }
          }, i = {
            type: l > 1 ? f.strong : f.emphasis,
            start: { ...s.start },
            end: { ...o.end }
          }, t[r][1].end = { ...s.start }, t[n][1].start = { ...o.end }, u = [], t[r][1].end.offset - t[r][1].start.offset && (u = wt(u, [
            ["enter", t[r][1], e],
            ["exit", t[r][1], e]
          ])), u = wt(u, [
            ["enter", i, e],
            ["enter", s, e],
            ["exit", s, e],
            ["enter", a, e]
          ]), x(
            e.parser.constructs.insideSpan.null,
            "expected `insideSpan` to be populated"
          ), u = wt(
            u,
            Ni(
              e.parser.constructs.insideSpan.null,
              t.slice(r + 1, n),
              e
            )
          ), u = wt(u, [
            ["exit", a, e],
            ["enter", o, e],
            ["exit", o, e],
            ["exit", i, e]
          ]), t[n][1].end.offset - t[n][1].start.offset ? (c = 2, u = wt(u, [
            ["enter", t[n][1], e],
            ["exit", t[n][1], e]
          ])) : c = 0, Ft(t, r - 1, n - r + 3, u), n = r + u.length - c - 2;
          break;
        }
    }
  for (n = -1; ++n < t.length; )
    t[n][1].type === "attentionSequence" && (t[n][1].type = "data");
  return t;
}
function bh(t, e) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Oa(r);
  let a;
  return s;
  function s(l) {
    return x(
      l === m.asterisk || l === m.underscore,
      "expected asterisk or underscore"
    ), a = l, t.enter("attentionSequence"), o(l);
  }
  function o(l) {
    if (l === a)
      return t.consume(l), o;
    const u = t.exit("attentionSequence"), c = Oa(l);
    x(n, "expected `attentionMarkers` to be populated");
    const d = !c || c === j.characterGroupPunctuation && i || n.includes(l), g = !i || i === j.characterGroupPunctuation && c || n.includes(r);
    return u._open = !!(a === m.asterisk ? d : d && (i || !g)), u._close = !!(a === m.asterisk ? g : g && (c || !d)), e(l);
  }
}
function La(t, e) {
  t.column += e, t.offset += e, t._bufferIndex += e;
}
const Th = { name: "autolink", tokenize: Eh };
function Eh(t, e, n) {
  let r = 0;
  return i;
  function i(h) {
    return x(h === m.lessThan, "expected `<`"), t.enter(f.autolink), t.enter(f.autolinkMarker), t.consume(h), t.exit(f.autolinkMarker), t.enter(f.autolinkProtocol), a;
  }
  function a(h) {
    return Pt(h) ? (t.consume(h), s) : h === m.atSign ? n(h) : u(h);
  }
  function s(h) {
    return h === m.plusSign || h === m.dash || h === m.dot || mt(h) ? (r = 1, o(h)) : u(h);
  }
  function o(h) {
    return h === m.colon ? (t.consume(h), r = 0, l) : (h === m.plusSign || h === m.dash || h === m.dot || mt(h)) && r++ < j.autolinkSchemeSizeMax ? (t.consume(h), o) : (r = 0, u(h));
  }
  function l(h) {
    return h === m.greaterThan ? (t.exit(f.autolinkProtocol), t.enter(f.autolinkMarker), t.consume(h), t.exit(f.autolinkMarker), t.exit(f.autolink), e) : h === m.eof || h === m.space || h === m.lessThan || ui(h) ? n(h) : (t.consume(h), l);
  }
  function u(h) {
    return h === m.atSign ? (t.consume(h), c) : hh(h) ? (t.consume(h), u) : n(h);
  }
  function c(h) {
    return mt(h) ? d(h) : n(h);
  }
  function d(h) {
    return h === m.dot ? (t.consume(h), r = 0, c) : h === m.greaterThan ? (t.exit(f.autolinkProtocol).type = f.autolinkEmail, t.enter(f.autolinkMarker), t.consume(h), t.exit(f.autolinkMarker), t.exit(f.autolink), e) : g(h);
  }
  function g(h) {
    if ((h === m.dash || mt(h)) && r++ < j.autolinkDomainSizeMax) {
      const C = h === m.dash ? g : d;
      return t.consume(h), C;
    }
    return n(h);
  }
}
const Cr = { partial: !0, tokenize: _h };
function _h(t, e, n) {
  return r;
  function r(a) {
    return Se(a) ? Le(t, i, f.linePrefix)(a) : i(a);
  }
  function i(a) {
    return a === m.eof || Y(a) ? e(a) : n(a);
  }
}
const no = {
  continuation: { tokenize: Rh },
  exit: Ih,
  name: "blockQuote",
  tokenize: vh
};
function vh(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    if (s === m.greaterThan) {
      const o = r.containerState;
      return x(o, "expected `containerState` to be defined in container"), o.open || (t.enter(f.blockQuote, { _container: !0 }), o.open = !0), t.enter(f.blockQuotePrefix), t.enter(f.blockQuoteMarker), t.consume(s), t.exit(f.blockQuoteMarker), a;
    }
    return n(s);
  }
  function a(s) {
    return Se(s) ? (t.enter(f.blockQuotePrefixWhitespace), t.consume(s), t.exit(f.blockQuotePrefixWhitespace), t.exit(f.blockQuotePrefix), e) : (t.exit(f.blockQuotePrefix), e(s));
  }
}
function Rh(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return Se(s) ? (x(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Le(
      t,
      a,
      f.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : j.tabSize
    )(s)) : a(s);
  }
  function a(s) {
    return t.attempt(no, e, n)(s);
  }
}
function Ih(t) {
  t.exit(f.blockQuote);
}
const ro = {
  name: "characterEscape",
  tokenize: Nh
};
function Nh(t, e, n) {
  return r;
  function r(a) {
    return x(a === m.backslash, "expected `\\`"), t.enter(f.characterEscape), t.enter(f.escapeMarker), t.consume(a), t.exit(f.escapeMarker), i;
  }
  function i(a) {
    return fh(a) ? (t.enter(f.characterEscapeValue), t.consume(a), t.exit(f.characterEscapeValue), t.exit(f.characterEscape), e) : n(a);
  }
}
const io = {
  name: "characterReference",
  tokenize: Ah
};
function Ah(t, e, n) {
  const r = this;
  let i = 0, a, s;
  return o;
  function o(d) {
    return x(d === m.ampersand, "expected `&`"), t.enter(f.characterReference), t.enter(f.characterReferenceMarker), t.consume(d), t.exit(f.characterReferenceMarker), l;
  }
  function l(d) {
    return d === m.numberSign ? (t.enter(f.characterReferenceMarkerNumeric), t.consume(d), t.exit(f.characterReferenceMarkerNumeric), u) : (t.enter(f.characterReferenceValue), a = j.characterReferenceNamedSizeMax, s = mt, c(d));
  }
  function u(d) {
    return d === m.uppercaseX || d === m.lowercaseX ? (t.enter(f.characterReferenceMarkerHexadecimal), t.consume(d), t.exit(f.characterReferenceMarkerHexadecimal), t.enter(f.characterReferenceValue), a = j.characterReferenceHexadecimalSizeMax, s = ph, c) : (t.enter(f.characterReferenceValue), a = j.characterReferenceDecimalSizeMax, s = di, c(d));
  }
  function c(d) {
    if (d === m.semicolon && i) {
      const g = t.exit(f.characterReferenceValue);
      return s === mt && !Ii(r.sliceSerialize(g)) ? n(d) : (t.enter(f.characterReferenceMarker), t.consume(d), t.exit(f.characterReferenceMarker), t.exit(f.characterReference), e);
    }
    return s(d) && i++ < a ? (t.consume(d), c) : n(d);
  }
}
const Pa = {
  partial: !0,
  tokenize: Oh
}, Da = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Mh
};
function Mh(t, e, n) {
  const r = this, i = { partial: !0, tokenize: D };
  let a = 0, s = 0, o;
  return l;
  function l(T) {
    return u(T);
  }
  function u(T) {
    x(
      T === m.graveAccent || T === m.tilde,
      "expected `` ` `` or `~`"
    );
    const z = r.events[r.events.length - 1];
    return a = z && z[1].type === f.linePrefix ? z[2].sliceSerialize(z[1], !0).length : 0, o = T, t.enter(f.codeFenced), t.enter(f.codeFencedFence), t.enter(f.codeFencedFenceSequence), c(T);
  }
  function c(T) {
    return T === o ? (s++, t.consume(T), c) : s < j.codeFencedSequenceSizeMin ? n(T) : (t.exit(f.codeFencedFenceSequence), Se(T) ? Le(t, d, f.whitespace)(T) : d(T));
  }
  function d(T) {
    return T === m.eof || Y(T) ? (t.exit(f.codeFencedFence), r.interrupt ? e(T) : t.check(Pa, k, M)(T)) : (t.enter(f.codeFencedFenceInfo), t.enter(f.chunkString, { contentType: j.contentTypeString }), g(T));
  }
  function g(T) {
    return T === m.eof || Y(T) ? (t.exit(f.chunkString), t.exit(f.codeFencedFenceInfo), d(T)) : Se(T) ? (t.exit(f.chunkString), t.exit(f.codeFencedFenceInfo), Le(t, h, f.whitespace)(T)) : T === m.graveAccent && T === o ? n(T) : (t.consume(T), g);
  }
  function h(T) {
    return T === m.eof || Y(T) ? d(T) : (t.enter(f.codeFencedFenceMeta), t.enter(f.chunkString, { contentType: j.contentTypeString }), C(T));
  }
  function C(T) {
    return T === m.eof || Y(T) ? (t.exit(f.chunkString), t.exit(f.codeFencedFenceMeta), d(T)) : T === m.graveAccent && T === o ? n(T) : (t.consume(T), C);
  }
  function k(T) {
    return x(Y(T), "expected eol"), t.attempt(i, M, I)(T);
  }
  function I(T) {
    return x(Y(T), "expected eol"), t.enter(f.lineEnding), t.consume(T), t.exit(f.lineEnding), b;
  }
  function b(T) {
    return a > 0 && Se(T) ? Le(
      t,
      E,
      f.linePrefix,
      a + 1
    )(T) : E(T);
  }
  function E(T) {
    return T === m.eof || Y(T) ? t.check(Pa, k, M)(T) : (t.enter(f.codeFlowValue), R(T));
  }
  function R(T) {
    return T === m.eof || Y(T) ? (t.exit(f.codeFlowValue), E(T)) : (t.consume(T), R);
  }
  function M(T) {
    return t.exit(f.codeFenced), e(T);
  }
  function D(T, z, U) {
    let V = 0;
    return K;
    function K(O) {
      return x(Y(O), "expected eol"), T.enter(f.lineEnding), T.consume(O), T.exit(f.lineEnding), ie;
    }
    function ie(O) {
      return x(
        r.parser.constructs.disable.null,
        "expected `disable.null` to be populated"
      ), T.enter(f.codeFencedFence), Se(O) ? Le(
        T,
        B,
        f.linePrefix,
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : j.tabSize
      )(O) : B(O);
    }
    function B(O) {
      return O === o ? (T.enter(f.codeFencedFenceSequence), N(O)) : U(O);
    }
    function N(O) {
      return O === o ? (V++, T.consume(O), N) : V >= s ? (T.exit(f.codeFencedFenceSequence), Se(O) ? Le(T, L, f.whitespace)(O) : L(O)) : U(O);
    }
    function L(O) {
      return O === m.eof || Y(O) ? (T.exit(f.codeFencedFence), z(O)) : U(O);
    }
  }
}
function Oh(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return s === m.eof ? n(s) : (x(Y(s), "expected eol"), t.enter(f.lineEnding), t.consume(s), t.exit(f.lineEnding), a);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : e(s);
  }
}
const zr = {
  name: "codeIndented",
  tokenize: Ph
}, Lh = { partial: !0, tokenize: Dh };
function Ph(t, e, n) {
  const r = this;
  return i;
  function i(u) {
    return x(Se(u)), t.enter(f.codeIndented), Le(
      t,
      a,
      f.linePrefix,
      j.tabSize + 1
    )(u);
  }
  function a(u) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === f.linePrefix && c[2].sliceSerialize(c[1], !0).length >= j.tabSize ? s(u) : n(u);
  }
  function s(u) {
    return u === m.eof ? l(u) : Y(u) ? t.attempt(Lh, s, l)(u) : (t.enter(f.codeFlowValue), o(u));
  }
  function o(u) {
    return u === m.eof || Y(u) ? (t.exit(f.codeFlowValue), s(u)) : (t.consume(u), o);
  }
  function l(u) {
    return t.exit(f.codeIndented), e(u);
  }
}
function Dh(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line] ? n(s) : Y(s) ? (t.enter(f.lineEnding), t.consume(s), t.exit(f.lineEnding), i) : Le(
      t,
      a,
      f.linePrefix,
      j.tabSize + 1
    )(s);
  }
  function a(s) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === f.linePrefix && o[2].sliceSerialize(o[1], !0).length >= j.tabSize ? e(s) : Y(s) ? i(s) : n(s);
  }
}
const Fh = {
  name: "codeText",
  previous: ao,
  resolve: Hh,
  tokenize: zh
};
function Hh(t) {
  let e = t.length - 4, n = 3, r, i;
  if ((t[n][1].type === f.lineEnding || t[n][1].type === "space") && (t[e][1].type === f.lineEnding || t[e][1].type === "space")) {
    for (r = n; ++r < e; )
      if (t[r][1].type === f.codeTextData) {
        t[n][1].type = f.codeTextPadding, t[e][1].type = f.codeTextPadding, n += 2, e -= 2;
        break;
      }
  }
  for (r = n - 1, e++; ++r <= e; )
    i === void 0 ? r !== e && t[r][1].type !== f.lineEnding && (i = r) : (r === e || t[r][1].type === f.lineEnding) && (t[i][1].type = f.codeTextData, r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), e -= r - i - 2, r = i + 2), i = void 0);
  return t;
}
function ao(t) {
  return t !== m.graveAccent || this.events[this.events.length - 1][1].type === f.characterEscape;
}
function zh(t, e, n) {
  const r = this;
  let i = 0, a, s;
  return o;
  function o(g) {
    return x(g === m.graveAccent, "expected `` ` ``"), x(ao.call(r, r.previous), "expected correct previous"), t.enter(f.codeText), t.enter(f.codeTextSequence), l(g);
  }
  function l(g) {
    return g === m.graveAccent ? (t.consume(g), i++, l) : (t.exit(f.codeTextSequence), u(g));
  }
  function u(g) {
    return g === m.eof ? n(g) : g === m.space ? (t.enter("space"), t.consume(g), t.exit("space"), u) : g === m.graveAccent ? (s = t.enter(f.codeTextSequence), a = 0, d(g)) : Y(g) ? (t.enter(f.lineEnding), t.consume(g), t.exit(f.lineEnding), u) : (t.enter(f.codeTextData), c(g));
  }
  function c(g) {
    return g === m.eof || g === m.space || g === m.graveAccent || Y(g) ? (t.exit(f.codeTextData), u(g)) : (t.consume(g), c);
  }
  function d(g) {
    return g === m.graveAccent ? (t.consume(g), a++, d) : a === i ? (t.exit(f.codeTextSequence), t.exit(f.codeText), e(g)) : (s.type = f.codeTextData, c(g));
  }
}
class Uh {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(e) {
    this.left = e ? [...e] : [], this.right = [];
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
  get(e) {
    if (e < 0 || e >= this.left.length + this.right.length)
      throw new RangeError(
        "Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`"
      );
    return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
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
  slice(e, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(e, r) : e > this.left.length ? this.right.slice(
      this.right.length - r + this.left.length,
      this.right.length - e + this.left.length
    ).reverse() : this.left.slice(e).concat(
      this.right.slice(this.right.length - r + this.left.length).reverse()
    );
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
  splice(e, n, r) {
    const i = n || 0;
    this.setCursor(Math.trunc(e));
    const a = this.right.splice(
      this.right.length - i,
      Number.POSITIVE_INFINITY
    );
    return r && On(this.left, r), a.reverse();
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
  push(e) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(e);
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
  pushMany(e) {
    this.setCursor(Number.POSITIVE_INFINITY), On(this.left, e);
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
  unshift(e) {
    this.setCursor(0), this.right.push(e);
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
  unshiftMany(e) {
    this.setCursor(0), On(this.right, e.reverse());
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
  setCursor(e) {
    if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0))
      if (e < this.left.length) {
        const n = this.left.splice(e, Number.POSITIVE_INFINITY);
        On(this.right, n.reverse());
      } else {
        const n = this.right.splice(
          this.left.length + this.right.length - e,
          Number.POSITIVE_INFINITY
        );
        On(this.left, n.reverse());
      }
  }
}
function On(t, e) {
  let n = 0;
  if (e.length < j.v8MaxSafeChunkSize)
    t.push(...e);
  else
    for (; n < e.length; )
      t.push(
        ...e.slice(n, n + j.v8MaxSafeChunkSize)
      ), n += j.v8MaxSafeChunkSize;
}
function so(t) {
  const e = {};
  let n = -1, r, i, a, s, o, l, u;
  const c = new Uh(t);
  for (; ++n < c.length; ) {
    for (; n in e; )
      n = e[n];
    if (r = c.get(n), n && r[1].type === f.chunkFlow && c.get(n - 1)[1].type === f.listItemPrefix && (x(r[1]._tokenizer, "expected `_tokenizer` on subtokens"), l = r[1]._tokenizer.events, a = 0, a < l.length && l[a][1].type === f.lineEndingBlank && (a += 2), a < l.length && l[a][1].type === f.content))
      for (; ++a < l.length && l[a][1].type !== f.content; )
        l[a][1].type === f.chunkText && (l[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(e, Bh(c, n)), n = e[n], u = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (s = c.get(a), s[1].type === f.lineEnding || s[1].type === f.lineEndingBlank)
          s[0] === "enter" && (i && (c.get(i)[1].type = f.lineEndingBlank), s[1].type = f.lineEnding, i = a);
        else if (!(s[1].type === f.linePrefix || s[1].type === f.listItemIndent)) break;
      i && (r[1].end = { ...c.get(i)[1].start }, o = c.slice(i, n), o.unshift(r), c.splice(i, n - i + 1, o));
    }
  }
  return Ft(t, 0, Number.POSITIVE_INFINITY, c.slice(0)), !u;
}
function Bh(t, e) {
  const n = t.get(e)[1], r = t.get(e)[2];
  let i = e - 1;
  const a = [];
  x(n.contentType, "expected `contentType` on subtokens");
  let s = n._tokenizer;
  s || (s = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  const o = s.events, l = [], u = {};
  let c, d, g = -1, h = n, C = 0, k = 0;
  const I = [k];
  for (; h; ) {
    for (; t.get(++i)[1] !== h; )
      ;
    x(
      !d || h.previous === d,
      "expected previous to match"
    ), x(!d || d.next === h, "expected next to match"), a.push(i), h._tokenizer || (c = r.sliceStream(h), h.next || c.push(m.eof), d && s.defineSkip(h.start), h._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0), s.write(c), h._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)), d = h, h = h.next;
  }
  for (h = n; ++g < o.length; )
    // Find a void token that includes a break.
    o[g][0] === "exit" && o[g - 1][0] === "enter" && o[g][1].type === o[g - 1][1].type && o[g][1].start.line !== o[g][1].end.line && (x(h, "expected a current token"), k = g + 1, I.push(k), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (s.events = [], h ? (h._tokenizer = void 0, h.previous = void 0, x(!h.next, "expected no next token")) : I.pop(), g = I.length; g--; ) {
    const b = o.slice(I[g], I[g + 1]), E = a.pop();
    x(E !== void 0, "expected a start position when splicing"), l.push([E, E + b.length - 1]), t.splice(E, 2, b);
  }
  for (l.reverse(), g = -1; ++g < l.length; )
    u[C + l[g][0]] = C + l[g][1], C += l[g][1] - l[g][0] - 1;
  return u;
}
const $h = { resolve: Vh, tokenize: Wh }, jh = { partial: !0, tokenize: Gh };
function Vh(t) {
  return so(t), t;
}
function Wh(t, e) {
  let n;
  return r;
  function r(o) {
    return x(
      o !== m.eof && !Y(o),
      "expected no eof or eol"
    ), t.enter(f.content), n = t.enter(f.chunkContent, {
      contentType: j.contentTypeContent
    }), i(o);
  }
  function i(o) {
    return o === m.eof ? a(o) : Y(o) ? t.check(
      jh,
      s,
      a
    )(o) : (t.consume(o), i);
  }
  function a(o) {
    return t.exit(f.chunkContent), t.exit(f.content), e(o);
  }
  function s(o) {
    return x(Y(o), "expected eol"), t.consume(o), t.exit(f.chunkContent), x(n, "expected previous token"), n.next = t.enter(f.chunkContent, {
      contentType: j.contentTypeContent,
      previous: n
    }), n = n.next, i;
  }
}
function Gh(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return x(Y(s), "expected a line ending"), t.exit(f.chunkContent), t.enter(f.lineEnding), t.consume(s), t.exit(f.lineEnding), Le(t, a, f.linePrefix);
  }
  function a(s) {
    if (s === m.eof || Y(s))
      return n(s);
    x(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    );
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === f.linePrefix && o[2].sliceSerialize(o[1], !0).length >= j.tabSize ? e(s) : t.interrupt(r.parser.constructs.flow, n, e)(s);
  }
}
function oo(t, e, n, r, i, a, s, o, l) {
  const u = l || Number.POSITIVE_INFINITY;
  let c = 0;
  return d;
  function d(b) {
    return b === m.lessThan ? (t.enter(r), t.enter(i), t.enter(a), t.consume(b), t.exit(a), g) : b === m.eof || b === m.space || b === m.rightParenthesis || ui(b) ? n(b) : (t.enter(r), t.enter(s), t.enter(o), t.enter(f.chunkString, { contentType: j.contentTypeString }), k(b));
  }
  function g(b) {
    return b === m.greaterThan ? (t.enter(a), t.consume(b), t.exit(a), t.exit(i), t.exit(r), e) : (t.enter(o), t.enter(f.chunkString, { contentType: j.contentTypeString }), h(b));
  }
  function h(b) {
    return b === m.greaterThan ? (t.exit(f.chunkString), t.exit(o), g(b)) : b === m.eof || b === m.lessThan || Y(b) ? n(b) : (t.consume(b), b === m.backslash ? C : h);
  }
  function C(b) {
    return b === m.lessThan || b === m.greaterThan || b === m.backslash ? (t.consume(b), h) : h(b);
  }
  function k(b) {
    return !c && (b === m.eof || b === m.rightParenthesis || ut(b)) ? (t.exit(f.chunkString), t.exit(o), t.exit(s), t.exit(r), e(b)) : c < u && b === m.leftParenthesis ? (t.consume(b), c++, k) : b === m.rightParenthesis ? (t.consume(b), c--, k) : b === m.eof || b === m.space || b === m.leftParenthesis || ui(b) ? n(b) : (t.consume(b), b === m.backslash ? I : k);
  }
  function I(b) {
    return b === m.leftParenthesis || b === m.rightParenthesis || b === m.backslash ? (t.consume(b), k) : k(b);
  }
}
function lo(t, e, n, r, i, a) {
  const s = this;
  let o = 0, l;
  return u;
  function u(h) {
    return x(h === m.leftSquareBracket, "expected `[`"), t.enter(r), t.enter(i), t.consume(h), t.exit(i), t.enter(a), c;
  }
  function c(h) {
    return o > j.linkReferenceSizeMax || h === m.eof || h === m.leftSquareBracket || h === m.rightSquareBracket && !l || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === m.caret && !o && "_hiddenFootnoteSupport" in s.parser.constructs ? n(h) : h === m.rightSquareBracket ? (t.exit(a), t.enter(i), t.consume(h), t.exit(i), t.exit(r), e) : Y(h) ? (t.enter(f.lineEnding), t.consume(h), t.exit(f.lineEnding), c) : (t.enter(f.chunkString, { contentType: j.contentTypeString }), d(h));
  }
  function d(h) {
    return h === m.eof || h === m.leftSquareBracket || h === m.rightSquareBracket || Y(h) || o++ > j.linkReferenceSizeMax ? (t.exit(f.chunkString), c(h)) : (t.consume(h), l || (l = !Se(h)), h === m.backslash ? g : d);
  }
  function g(h) {
    return h === m.leftSquareBracket || h === m.backslash || h === m.rightSquareBracket ? (t.consume(h), o++, d) : d(h);
  }
}
function co(t, e, n, r, i, a) {
  let s;
  return o;
  function o(g) {
    return g === m.quotationMark || g === m.apostrophe || g === m.leftParenthesis ? (t.enter(r), t.enter(i), t.consume(g), t.exit(i), s = g === m.leftParenthesis ? m.rightParenthesis : g, l) : n(g);
  }
  function l(g) {
    return g === s ? (t.enter(i), t.consume(g), t.exit(i), t.exit(r), e) : (t.enter(a), u(g));
  }
  function u(g) {
    return g === s ? (t.exit(a), l(s)) : g === m.eof ? n(g) : Y(g) ? (t.enter(f.lineEnding), t.consume(g), t.exit(f.lineEnding), Le(t, u, f.linePrefix)) : (t.enter(f.chunkString, { contentType: j.contentTypeString }), c(g));
  }
  function c(g) {
    return g === s || g === m.eof || Y(g) ? (t.exit(f.chunkString), u(g)) : (t.consume(g), g === m.backslash ? d : c);
  }
  function d(g) {
    return g === s || g === m.backslash ? (t.consume(g), c) : c(g);
  }
}
function Hn(t, e) {
  let n;
  return r;
  function r(i) {
    return Y(i) ? (t.enter(f.lineEnding), t.consume(i), t.exit(f.lineEnding), n = !0, r) : Se(i) ? Le(
      t,
      r,
      n ? f.linePrefix : f.lineSuffix
    )(i) : e(i);
  }
}
const Zh = { name: "definition", tokenize: Kh }, qh = { partial: !0, tokenize: Xh };
function Kh(t, e, n) {
  const r = this;
  let i;
  return a;
  function a(h) {
    return t.enter(f.definition), s(h);
  }
  function s(h) {
    return x(h === m.leftSquareBracket, "expected `[`"), lo.call(
      r,
      t,
      o,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      f.definitionLabel,
      f.definitionLabelMarker,
      f.definitionLabelString
    )(h);
  }
  function o(h) {
    return i = gn(
      r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
    ), h === m.colon ? (t.enter(f.definitionMarker), t.consume(h), t.exit(f.definitionMarker), l) : n(h);
  }
  function l(h) {
    return ut(h) ? Hn(t, u)(h) : u(h);
  }
  function u(h) {
    return oo(
      t,
      c,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      f.definitionDestination,
      f.definitionDestinationLiteral,
      f.definitionDestinationLiteralMarker,
      f.definitionDestinationRaw,
      f.definitionDestinationString
    )(h);
  }
  function c(h) {
    return t.attempt(qh, d, d)(h);
  }
  function d(h) {
    return Se(h) ? Le(t, g, f.whitespace)(h) : g(h);
  }
  function g(h) {
    return h === m.eof || Y(h) ? (t.exit(f.definition), r.parser.defined.push(i), e(h)) : n(h);
  }
}
function Xh(t, e, n) {
  return r;
  function r(o) {
    return ut(o) ? Hn(t, i)(o) : n(o);
  }
  function i(o) {
    return co(
      t,
      a,
      n,
      f.definitionTitle,
      f.definitionTitleMarker,
      f.definitionTitleString
    )(o);
  }
  function a(o) {
    return Se(o) ? Le(
      t,
      s,
      f.whitespace
    )(o) : s(o);
  }
  function s(o) {
    return o === m.eof || Y(o) ? e(o) : n(o);
  }
}
const Yh = {
  name: "hardBreakEscape",
  tokenize: Jh
};
function Jh(t, e, n) {
  return r;
  function r(a) {
    return x(a === m.backslash, "expected `\\`"), t.enter(f.hardBreakEscape), t.consume(a), i;
  }
  function i(a) {
    return Y(a) ? (t.exit(f.hardBreakEscape), e(a)) : n(a);
  }
}
const Qh = {
  name: "headingAtx",
  resolve: ep,
  tokenize: tp
};
function ep(t, e) {
  let n = t.length - 2, r = 3, i, a;
  return t[r][1].type === f.whitespace && (r += 2), n - 2 > r && t[n][1].type === f.whitespace && (n -= 2), t[n][1].type === f.atxHeadingSequence && (r === n - 1 || n - 4 > r && t[n - 2][1].type === f.whitespace) && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: f.atxHeadingText,
    start: t[r][1].start,
    end: t[n][1].end
  }, a = {
    type: f.chunkText,
    start: t[r][1].start,
    end: t[n][1].end,
    contentType: j.contentTypeText
  }, Ft(t, r, n - r + 1, [
    ["enter", i, e],
    ["enter", a, e],
    ["exit", a, e],
    ["exit", i, e]
  ])), t;
}
function tp(t, e, n) {
  let r = 0;
  return i;
  function i(c) {
    return t.enter(f.atxHeading), a(c);
  }
  function a(c) {
    return x(c === m.numberSign, "expected `#`"), t.enter(f.atxHeadingSequence), s(c);
  }
  function s(c) {
    return c === m.numberSign && r++ < j.atxHeadingOpeningFenceSizeMax ? (t.consume(c), s) : c === m.eof || ut(c) ? (t.exit(f.atxHeadingSequence), o(c)) : n(c);
  }
  function o(c) {
    return c === m.numberSign ? (t.enter(f.atxHeadingSequence), l(c)) : c === m.eof || Y(c) ? (t.exit(f.atxHeading), e(c)) : Se(c) ? Le(t, o, f.whitespace)(c) : (t.enter(f.atxHeadingText), u(c));
  }
  function l(c) {
    return c === m.numberSign ? (t.consume(c), l) : (t.exit(f.atxHeadingSequence), o(c));
  }
  function u(c) {
    return c === m.eof || c === m.numberSign || ut(c) ? (t.exit(f.atxHeadingText), o(c)) : (t.consume(c), u);
  }
}
const np = [
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
], Fa = ["pre", "script", "style", "textarea"], rp = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: sp,
  tokenize: op
}, ip = { partial: !0, tokenize: cp }, ap = {
  partial: !0,
  tokenize: lp
};
function sp(t) {
  let e = t.length;
  for (; e-- && !(t[e][0] === "enter" && t[e][1].type === f.htmlFlow); )
    ;
  return e > 1 && t[e - 2][1].type === f.linePrefix && (t[e][1].start = t[e - 2][1].start, t[e + 1][1].start = t[e - 2][1].start, t.splice(e - 2, 2)), t;
}
function op(t, e, n) {
  const r = this;
  let i, a, s, o, l;
  return u;
  function u(y) {
    return c(y);
  }
  function c(y) {
    return x(y === m.lessThan, "expected `<`"), t.enter(f.htmlFlow), t.enter(f.htmlFlowData), t.consume(y), d;
  }
  function d(y) {
    return y === m.exclamationMark ? (t.consume(y), g) : y === m.slash ? (t.consume(y), a = !0, k) : y === m.questionMark ? (t.consume(y), i = j.htmlInstruction, r.interrupt ? e : w) : Pt(y) ? (x(y !== null), t.consume(y), s = String.fromCharCode(y), I) : n(y);
  }
  function g(y) {
    return y === m.dash ? (t.consume(y), i = j.htmlComment, h) : y === m.leftSquareBracket ? (t.consume(y), i = j.htmlCdata, o = 0, C) : Pt(y) ? (t.consume(y), i = j.htmlDeclaration, r.interrupt ? e : w) : n(y);
  }
  function h(y) {
    return y === m.dash ? (t.consume(y), r.interrupt ? e : w) : n(y);
  }
  function C(y) {
    const re = j.cdataOpeningString;
    return y === re.charCodeAt(o++) ? (t.consume(y), o === re.length ? r.interrupt ? e : B : C) : n(y);
  }
  function k(y) {
    return Pt(y) ? (x(y !== null), t.consume(y), s = String.fromCharCode(y), I) : n(y);
  }
  function I(y) {
    if (y === m.eof || y === m.slash || y === m.greaterThan || ut(y)) {
      const re = y === m.slash, Z = s.toLowerCase();
      return !re && !a && Fa.includes(Z) ? (i = j.htmlRaw, r.interrupt ? e(y) : B(y)) : np.includes(s.toLowerCase()) ? (i = j.htmlBasic, re ? (t.consume(y), b) : r.interrupt ? e(y) : B(y)) : (i = j.htmlComplete, r.interrupt && !r.parser.lazy[r.now().line] ? n(y) : a ? E(y) : R(y));
    }
    return y === m.dash || mt(y) ? (t.consume(y), s += String.fromCharCode(y), I) : n(y);
  }
  function b(y) {
    return y === m.greaterThan ? (t.consume(y), r.interrupt ? e : B) : n(y);
  }
  function E(y) {
    return Se(y) ? (t.consume(y), E) : K(y);
  }
  function R(y) {
    return y === m.slash ? (t.consume(y), K) : y === m.colon || y === m.underscore || Pt(y) ? (t.consume(y), M) : Se(y) ? (t.consume(y), R) : K(y);
  }
  function M(y) {
    return y === m.dash || y === m.dot || y === m.colon || y === m.underscore || mt(y) ? (t.consume(y), M) : D(y);
  }
  function D(y) {
    return y === m.equalsTo ? (t.consume(y), T) : Se(y) ? (t.consume(y), D) : R(y);
  }
  function T(y) {
    return y === m.eof || y === m.lessThan || y === m.equalsTo || y === m.greaterThan || y === m.graveAccent ? n(y) : y === m.quotationMark || y === m.apostrophe ? (t.consume(y), l = y, z) : Se(y) ? (t.consume(y), T) : U(y);
  }
  function z(y) {
    return y === l ? (t.consume(y), l = null, V) : y === m.eof || Y(y) ? n(y) : (t.consume(y), z);
  }
  function U(y) {
    return y === m.eof || y === m.quotationMark || y === m.apostrophe || y === m.slash || y === m.lessThan || y === m.equalsTo || y === m.greaterThan || y === m.graveAccent || ut(y) ? D(y) : (t.consume(y), U);
  }
  function V(y) {
    return y === m.slash || y === m.greaterThan || Se(y) ? R(y) : n(y);
  }
  function K(y) {
    return y === m.greaterThan ? (t.consume(y), ie) : n(y);
  }
  function ie(y) {
    return y === m.eof || Y(y) ? B(y) : Se(y) ? (t.consume(y), ie) : n(y);
  }
  function B(y) {
    return y === m.dash && i === j.htmlComment ? (t.consume(y), ee) : y === m.lessThan && i === j.htmlRaw ? (t.consume(y), W) : y === m.greaterThan && i === j.htmlDeclaration ? (t.consume(y), te) : y === m.questionMark && i === j.htmlInstruction ? (t.consume(y), w) : y === m.rightSquareBracket && i === j.htmlCdata ? (t.consume(y), _e) : Y(y) && (i === j.htmlBasic || i === j.htmlComplete) ? (t.exit(f.htmlFlowData), t.check(
      ip,
      G,
      N
    )(y)) : y === m.eof || Y(y) ? (t.exit(f.htmlFlowData), N(y)) : (t.consume(y), B);
  }
  function N(y) {
    return t.check(
      ap,
      L,
      G
    )(y);
  }
  function L(y) {
    return x(Y(y)), t.enter(f.lineEnding), t.consume(y), t.exit(f.lineEnding), O;
  }
  function O(y) {
    return y === m.eof || Y(y) ? N(y) : (t.enter(f.htmlFlowData), B(y));
  }
  function ee(y) {
    return y === m.dash ? (t.consume(y), w) : B(y);
  }
  function W(y) {
    return y === m.slash ? (t.consume(y), s = "", de) : B(y);
  }
  function de(y) {
    if (y === m.greaterThan) {
      const re = s.toLowerCase();
      return Fa.includes(re) ? (t.consume(y), te) : B(y);
    }
    return Pt(y) && s.length < j.htmlRawSizeMax ? (x(y !== null), t.consume(y), s += String.fromCharCode(y), de) : B(y);
  }
  function _e(y) {
    return y === m.rightSquareBracket ? (t.consume(y), w) : B(y);
  }
  function w(y) {
    return y === m.greaterThan ? (t.consume(y), te) : y === m.dash && i === j.htmlComment ? (t.consume(y), w) : B(y);
  }
  function te(y) {
    return y === m.eof || Y(y) ? (t.exit(f.htmlFlowData), G(y)) : (t.consume(y), te);
  }
  function G(y) {
    return t.exit(f.htmlFlow), e(y);
  }
}
function lp(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return Y(s) ? (t.enter(f.lineEnding), t.consume(s), t.exit(f.lineEnding), a) : n(s);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : e(s);
  }
}
function cp(t, e, n) {
  return r;
  function r(i) {
    return x(Y(i), "expected a line ending"), t.enter(f.lineEnding), t.consume(i), t.exit(f.lineEnding), t.attempt(Cr, e, n);
  }
}
const up = { name: "htmlText", tokenize: dp };
function dp(t, e, n) {
  const r = this;
  let i, a, s;
  return o;
  function o(w) {
    return x(w === m.lessThan, "expected `<`"), t.enter(f.htmlText), t.enter(f.htmlTextData), t.consume(w), l;
  }
  function l(w) {
    return w === m.exclamationMark ? (t.consume(w), u) : w === m.slash ? (t.consume(w), D) : w === m.questionMark ? (t.consume(w), R) : Pt(w) ? (t.consume(w), U) : n(w);
  }
  function u(w) {
    return w === m.dash ? (t.consume(w), c) : w === m.leftSquareBracket ? (t.consume(w), a = 0, C) : Pt(w) ? (t.consume(w), E) : n(w);
  }
  function c(w) {
    return w === m.dash ? (t.consume(w), h) : n(w);
  }
  function d(w) {
    return w === m.eof ? n(w) : w === m.dash ? (t.consume(w), g) : Y(w) ? (s = d, W(w)) : (t.consume(w), d);
  }
  function g(w) {
    return w === m.dash ? (t.consume(w), h) : d(w);
  }
  function h(w) {
    return w === m.greaterThan ? ee(w) : w === m.dash ? g(w) : d(w);
  }
  function C(w) {
    const te = j.cdataOpeningString;
    return w === te.charCodeAt(a++) ? (t.consume(w), a === te.length ? k : C) : n(w);
  }
  function k(w) {
    return w === m.eof ? n(w) : w === m.rightSquareBracket ? (t.consume(w), I) : Y(w) ? (s = k, W(w)) : (t.consume(w), k);
  }
  function I(w) {
    return w === m.rightSquareBracket ? (t.consume(w), b) : k(w);
  }
  function b(w) {
    return w === m.greaterThan ? ee(w) : w === m.rightSquareBracket ? (t.consume(w), b) : k(w);
  }
  function E(w) {
    return w === m.eof || w === m.greaterThan ? ee(w) : Y(w) ? (s = E, W(w)) : (t.consume(w), E);
  }
  function R(w) {
    return w === m.eof ? n(w) : w === m.questionMark ? (t.consume(w), M) : Y(w) ? (s = R, W(w)) : (t.consume(w), R);
  }
  function M(w) {
    return w === m.greaterThan ? ee(w) : R(w);
  }
  function D(w) {
    return Pt(w) ? (t.consume(w), T) : n(w);
  }
  function T(w) {
    return w === m.dash || mt(w) ? (t.consume(w), T) : z(w);
  }
  function z(w) {
    return Y(w) ? (s = z, W(w)) : Se(w) ? (t.consume(w), z) : ee(w);
  }
  function U(w) {
    return w === m.dash || mt(w) ? (t.consume(w), U) : w === m.slash || w === m.greaterThan || ut(w) ? V(w) : n(w);
  }
  function V(w) {
    return w === m.slash ? (t.consume(w), ee) : w === m.colon || w === m.underscore || Pt(w) ? (t.consume(w), K) : Y(w) ? (s = V, W(w)) : Se(w) ? (t.consume(w), V) : ee(w);
  }
  function K(w) {
    return w === m.dash || w === m.dot || w === m.colon || w === m.underscore || mt(w) ? (t.consume(w), K) : ie(w);
  }
  function ie(w) {
    return w === m.equalsTo ? (t.consume(w), B) : Y(w) ? (s = ie, W(w)) : Se(w) ? (t.consume(w), ie) : V(w);
  }
  function B(w) {
    return w === m.eof || w === m.lessThan || w === m.equalsTo || w === m.greaterThan || w === m.graveAccent ? n(w) : w === m.quotationMark || w === m.apostrophe ? (t.consume(w), i = w, N) : Y(w) ? (s = B, W(w)) : Se(w) ? (t.consume(w), B) : (t.consume(w), L);
  }
  function N(w) {
    return w === i ? (t.consume(w), i = void 0, O) : w === m.eof ? n(w) : Y(w) ? (s = N, W(w)) : (t.consume(w), N);
  }
  function L(w) {
    return w === m.eof || w === m.quotationMark || w === m.apostrophe || w === m.lessThan || w === m.equalsTo || w === m.graveAccent ? n(w) : w === m.slash || w === m.greaterThan || ut(w) ? V(w) : (t.consume(w), L);
  }
  function O(w) {
    return w === m.slash || w === m.greaterThan || ut(w) ? V(w) : n(w);
  }
  function ee(w) {
    return w === m.greaterThan ? (t.consume(w), t.exit(f.htmlTextData), t.exit(f.htmlText), e) : n(w);
  }
  function W(w) {
    return x(s, "expected return state"), x(Y(w), "expected eol"), t.exit(f.htmlTextData), t.enter(f.lineEnding), t.consume(w), t.exit(f.lineEnding), de;
  }
  function de(w) {
    return x(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Se(w) ? Le(
      t,
      _e,
      f.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : j.tabSize
    )(w) : _e(w);
  }
  function _e(w) {
    return t.enter(f.htmlTextData), s(w);
  }
}
const Ai = {
  name: "labelEnd",
  resolveAll: gp,
  resolveTo: mp,
  tokenize: yp
}, hp = { tokenize: Cp }, pp = { tokenize: wp }, fp = { tokenize: Sp };
function gp(t) {
  let e = -1;
  const n = [];
  for (; ++e < t.length; ) {
    const r = t[e][1];
    if (n.push(t[e]), r.type === f.labelImage || r.type === f.labelLink || r.type === f.labelEnd) {
      const i = r.type === f.labelImage ? 4 : 2;
      r.type = f.data, e += i;
    }
  }
  return t.length !== n.length && Ft(t, 0, t.length, n), t;
}
function mp(t, e) {
  let n = t.length, r = 0, i, a, s, o;
  for (; n--; )
    if (i = t[n][1], a) {
      if (i.type === f.link || i.type === f.labelLink && i._inactive)
        break;
      t[n][0] === "enter" && i.type === f.labelLink && (i._inactive = !0);
    } else if (s) {
      if (t[n][0] === "enter" && (i.type === f.labelImage || i.type === f.labelLink) && !i._balanced && (a = n, i.type !== f.labelLink)) {
        r = 2;
        break;
      }
    } else i.type === f.labelEnd && (s = n);
  x(a !== void 0, "`open` is supposed to be found"), x(s !== void 0, "`close` is supposed to be found");
  const l = {
    type: t[a][1].type === f.labelLink ? f.link : f.image,
    start: { ...t[a][1].start },
    end: { ...t[t.length - 1][1].end }
  }, u = {
    type: f.label,
    start: { ...t[a][1].start },
    end: { ...t[s][1].end }
  }, c = {
    type: f.labelText,
    start: { ...t[a + r + 2][1].end },
    end: { ...t[s - 2][1].start }
  };
  return o = [
    ["enter", l, e],
    ["enter", u, e]
  ], o = wt(o, t.slice(a + 1, a + r + 3)), o = wt(o, [["enter", c, e]]), x(
    e.parser.constructs.insideSpan.null,
    "expected `insideSpan.null` to be populated"
  ), o = wt(
    o,
    Ni(
      e.parser.constructs.insideSpan.null,
      t.slice(a + r + 4, s - 3),
      e
    )
  ), o = wt(o, [
    ["exit", c, e],
    t[s - 2],
    t[s - 1],
    ["exit", u, e]
  ]), o = wt(o, t.slice(s + 1)), o = wt(o, [["exit", l, e]]), Ft(t, a, t.length, o), t;
}
function yp(t, e, n) {
  const r = this;
  let i = r.events.length, a, s;
  for (; i--; )
    if ((r.events[i][1].type === f.labelImage || r.events[i][1].type === f.labelLink) && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return o;
  function o(g) {
    return x(g === m.rightSquareBracket, "expected `]`"), a ? a._inactive ? d(g) : (s = r.parser.defined.includes(
      gn(
        r.sliceSerialize({ start: a.end, end: r.now() })
      )
    ), t.enter(f.labelEnd), t.enter(f.labelMarker), t.consume(g), t.exit(f.labelMarker), t.exit(f.labelEnd), l) : n(g);
  }
  function l(g) {
    return g === m.leftParenthesis ? t.attempt(
      hp,
      c,
      s ? c : d
    )(g) : g === m.leftSquareBracket ? t.attempt(
      pp,
      c,
      s ? u : d
    )(g) : s ? c(g) : d(g);
  }
  function u(g) {
    return t.attempt(
      fp,
      c,
      d
    )(g);
  }
  function c(g) {
    return e(g);
  }
  function d(g) {
    return a._balanced = !0, n(g);
  }
}
function Cp(t, e, n) {
  return r;
  function r(d) {
    return x(d === m.leftParenthesis, "expected left paren"), t.enter(f.resource), t.enter(f.resourceMarker), t.consume(d), t.exit(f.resourceMarker), i;
  }
  function i(d) {
    return ut(d) ? Hn(t, a)(d) : a(d);
  }
  function a(d) {
    return d === m.rightParenthesis ? c(d) : oo(
      t,
      s,
      o,
      f.resourceDestination,
      f.resourceDestinationLiteral,
      f.resourceDestinationLiteralMarker,
      f.resourceDestinationRaw,
      f.resourceDestinationString,
      j.linkResourceDestinationBalanceMax
    )(d);
  }
  function s(d) {
    return ut(d) ? Hn(t, l)(d) : c(d);
  }
  function o(d) {
    return n(d);
  }
  function l(d) {
    return d === m.quotationMark || d === m.apostrophe || d === m.leftParenthesis ? co(
      t,
      u,
      n,
      f.resourceTitle,
      f.resourceTitleMarker,
      f.resourceTitleString
    )(d) : c(d);
  }
  function u(d) {
    return ut(d) ? Hn(t, c)(d) : c(d);
  }
  function c(d) {
    return d === m.rightParenthesis ? (t.enter(f.resourceMarker), t.consume(d), t.exit(f.resourceMarker), t.exit(f.resource), e) : n(d);
  }
}
function wp(t, e, n) {
  const r = this;
  return i;
  function i(o) {
    return x(o === m.leftSquareBracket, "expected left bracket"), lo.call(
      r,
      t,
      a,
      s,
      f.reference,
      f.referenceMarker,
      f.referenceString
    )(o);
  }
  function a(o) {
    return r.parser.defined.includes(
      gn(
        r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
      )
    ) ? e(o) : n(o);
  }
  function s(o) {
    return n(o);
  }
}
function Sp(t, e, n) {
  return r;
  function r(a) {
    return x(a === m.leftSquareBracket, "expected left bracket"), t.enter(f.reference), t.enter(f.referenceMarker), t.consume(a), t.exit(f.referenceMarker), i;
  }
  function i(a) {
    return a === m.rightSquareBracket ? (t.enter(f.referenceMarker), t.consume(a), t.exit(f.referenceMarker), t.exit(f.reference), e) : n(a);
  }
}
const xp = {
  name: "labelStartImage",
  resolveAll: Ai.resolveAll,
  tokenize: kp
};
function kp(t, e, n) {
  const r = this;
  return i;
  function i(o) {
    return x(o === m.exclamationMark, "expected `!`"), t.enter(f.labelImage), t.enter(f.labelImageMarker), t.consume(o), t.exit(f.labelImageMarker), a;
  }
  function a(o) {
    return o === m.leftSquareBracket ? (t.enter(f.labelMarker), t.consume(o), t.exit(f.labelMarker), t.exit(f.labelImage), s) : n(o);
  }
  function s(o) {
    return o === m.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : e(o);
  }
}
const bp = {
  name: "labelStartLink",
  resolveAll: Ai.resolveAll,
  tokenize: Tp
};
function Tp(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return x(s === m.leftSquareBracket, "expected `[`"), t.enter(f.labelLink), t.enter(f.labelMarker), t.consume(s), t.exit(f.labelMarker), t.exit(f.labelLink), a;
  }
  function a(s) {
    return s === m.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : e(s);
  }
}
const Ur = { name: "lineEnding", tokenize: Ep };
function Ep(t, e) {
  return n;
  function n(r) {
    return x(Y(r), "expected eol"), t.enter(f.lineEnding), t.consume(r), t.exit(f.lineEnding), Le(t, e, f.linePrefix);
  }
}
const ar = {
  name: "thematicBreak",
  tokenize: _p
};
function _p(t, e, n) {
  let r = 0, i;
  return a;
  function a(u) {
    return t.enter(f.thematicBreak), s(u);
  }
  function s(u) {
    return x(
      u === m.asterisk || u === m.dash || u === m.underscore,
      "expected `*`, `-`, or `_`"
    ), i = u, o(u);
  }
  function o(u) {
    return u === i ? (t.enter(f.thematicBreakSequence), l(u)) : r >= j.thematicBreakMarkerCountMin && (u === m.eof || Y(u)) ? (t.exit(f.thematicBreak), e(u)) : n(u);
  }
  function l(u) {
    return u === i ? (t.consume(u), r++, l) : (t.exit(f.thematicBreakSequence), Se(u) ? Le(t, o, f.whitespace)(u) : o(u));
  }
}
const ct = {
  continuation: { tokenize: Np },
  exit: Mp,
  name: "list",
  tokenize: Ip
}, vp = {
  partial: !0,
  tokenize: Op
}, Rp = { partial: !0, tokenize: Ap };
function Ip(t, e, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === f.linePrefix ? i[2].sliceSerialize(i[1], !0).length : 0, s = 0;
  return o;
  function o(h) {
    x(r.containerState, "expected state");
    const C = r.containerState.type || (h === m.asterisk || h === m.plusSign || h === m.dash ? f.listUnordered : f.listOrdered);
    if (C === f.listUnordered ? !r.containerState.marker || h === r.containerState.marker : di(h)) {
      if (r.containerState.type || (r.containerState.type = C, t.enter(C, { _container: !0 })), C === f.listUnordered)
        return t.enter(f.listItemPrefix), h === m.asterisk || h === m.dash ? t.check(ar, n, u)(h) : u(h);
      if (!r.interrupt || h === m.digit1)
        return t.enter(f.listItemPrefix), t.enter(f.listItemValue), l(h);
    }
    return n(h);
  }
  function l(h) {
    return x(r.containerState, "expected state"), di(h) && ++s < j.listItemValueSizeMax ? (t.consume(h), l) : (!r.interrupt || s < 2) && (r.containerState.marker ? h === r.containerState.marker : h === m.rightParenthesis || h === m.dot) ? (t.exit(f.listItemValue), u(h)) : n(h);
  }
  function u(h) {
    return x(r.containerState, "expected state"), x(h !== m.eof, "eof (`null`) is not a marker"), t.enter(f.listItemMarker), t.consume(h), t.exit(f.listItemMarker), r.containerState.marker = r.containerState.marker || h, t.check(
      Cr,
      // Can’t be empty when interrupting.
      r.interrupt ? n : c,
      t.attempt(
        vp,
        g,
        d
      )
    );
  }
  function c(h) {
    return x(r.containerState, "expected state"), r.containerState.initialBlankLine = !0, a++, g(h);
  }
  function d(h) {
    return Se(h) ? (t.enter(f.listItemPrefixWhitespace), t.consume(h), t.exit(f.listItemPrefixWhitespace), g) : n(h);
  }
  function g(h) {
    return x(r.containerState, "expected state"), r.containerState.size = a + r.sliceSerialize(t.exit(f.listItemPrefix), !0).length, e(h);
  }
}
function Np(t, e, n) {
  const r = this;
  return x(r.containerState, "expected state"), r.containerState._closeFlow = void 0, t.check(Cr, i, a);
  function i(o) {
    return x(r.containerState, "expected state"), x(typeof r.containerState.size == "number", "expected size"), r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, Le(
      t,
      e,
      f.listItemIndent,
      r.containerState.size + 1
    )(o);
  }
  function a(o) {
    return x(r.containerState, "expected state"), r.containerState.furtherBlankLines || !Se(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, t.attempt(Rp, e, s)(o));
  }
  function s(o) {
    return x(r.containerState, "expected state"), r.containerState._closeFlow = !0, r.interrupt = void 0, x(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Le(
      t,
      t.attempt(ct, e, n),
      f.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : j.tabSize
    )(o);
  }
}
function Ap(t, e, n) {
  const r = this;
  return x(r.containerState, "expected state"), x(typeof r.containerState.size == "number", "expected size"), Le(
    t,
    i,
    f.listItemIndent,
    r.containerState.size + 1
  );
  function i(a) {
    x(r.containerState, "expected state");
    const s = r.events[r.events.length - 1];
    return s && s[1].type === f.listItemIndent && s[2].sliceSerialize(s[1], !0).length === r.containerState.size ? e(a) : n(a);
  }
}
function Mp(t) {
  x(this.containerState, "expected state"), x(typeof this.containerState.type == "string", "expected type"), t.exit(this.containerState.type);
}
function Op(t, e, n) {
  const r = this;
  return x(
    r.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), Le(
    t,
    i,
    f.listItemPrefixWhitespace,
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : j.tabSize + 1
  );
  function i(a) {
    const s = r.events[r.events.length - 1];
    return !Se(a) && s && s[1].type === f.listItemPrefixWhitespace ? e(a) : n(a);
  }
}
const Ha = {
  name: "setextUnderline",
  resolveTo: Lp,
  tokenize: Pp
};
function Lp(t, e) {
  let n = t.length, r, i, a;
  for (; n--; )
    if (t[n][0] === "enter") {
      if (t[n][1].type === f.content) {
        r = n;
        break;
      }
      t[n][1].type === f.paragraph && (i = n);
    } else
      t[n][1].type === f.content && t.splice(n, 1), !a && t[n][1].type === f.definition && (a = n);
  x(i !== void 0, "expected a `text` index to be found"), x(r !== void 0, "expected a `text` index to be found"), x(t[r][2] === e, "enter context should be same"), x(
    t[t.length - 1][2] === e,
    "enter context should be same"
  );
  const s = {
    type: f.setextHeading,
    start: { ...t[r][1].start },
    end: { ...t[t.length - 1][1].end }
  };
  return t[i][1].type = f.setextHeadingText, a ? (t.splice(i, 0, ["enter", s, e]), t.splice(a + 1, 0, ["exit", t[r][1], e]), t[r][1].end = { ...t[a][1].end }) : t[r][1] = s, t.push(["exit", s, e]), t;
}
function Pp(t, e, n) {
  const r = this;
  let i;
  return a;
  function a(u) {
    let c = r.events.length, d;
    for (x(
      u === m.dash || u === m.equalsTo,
      "expected `=` or `-`"
    ); c--; )
      if (r.events[c][1].type !== f.lineEnding && r.events[c][1].type !== f.linePrefix && r.events[c][1].type !== f.content) {
        d = r.events[c][1].type === f.paragraph;
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || d) ? (t.enter(f.setextHeadingLine), i = u, s(u)) : n(u);
  }
  function s(u) {
    return t.enter(f.setextHeadingLineSequence), o(u);
  }
  function o(u) {
    return u === i ? (t.consume(u), o) : (t.exit(f.setextHeadingLineSequence), Se(u) ? Le(t, l, f.lineSuffix)(u) : l(u));
  }
  function l(u) {
    return u === m.eof || Y(u) ? (t.exit(f.setextHeadingLine), e(u)) : n(u);
  }
}
const Dp = { tokenize: Fp };
function Fp(t) {
  const e = this, n = t.attempt(
    // Try to parse a blank line.
    Cr,
    r,
    // Try to parse initial flow (essentially, only code).
    t.attempt(
      this.parser.constructs.flowInitial,
      i,
      Le(
        t,
        t.attempt(
          this.parser.constructs.flow,
          i,
          t.attempt($h, i)
        ),
        f.linePrefix
      )
    )
  );
  return n;
  function r(a) {
    if (x(
      a === m.eof || Y(a),
      "expected eol or eof"
    ), a === m.eof) {
      t.consume(a);
      return;
    }
    return t.enter(f.lineEndingBlank), t.consume(a), t.exit(f.lineEndingBlank), e.currentConstruct = void 0, n;
  }
  function i(a) {
    if (x(
      a === m.eof || Y(a),
      "expected eol or eof"
    ), a === m.eof) {
      t.consume(a);
      return;
    }
    return t.enter(f.lineEnding), t.consume(a), t.exit(f.lineEnding), e.currentConstruct = void 0, n;
  }
}
const Hp = { resolveAll: ho() }, zp = uo("string"), Up = uo("text");
function uo(t) {
  return {
    resolveAll: ho(
      t === "text" ? Bp : void 0
    ),
    tokenize: e
  };
  function e(n) {
    const r = this, i = this.parser.constructs[t], a = n.attempt(i, s, o);
    return s;
    function s(c) {
      return u(c) ? a(c) : o(c);
    }
    function o(c) {
      if (c === m.eof) {
        n.consume(c);
        return;
      }
      return n.enter(f.data), n.consume(c), l;
    }
    function l(c) {
      return u(c) ? (n.exit(f.data), a(c)) : (n.consume(c), l);
    }
    function u(c) {
      if (c === m.eof)
        return !0;
      const d = i[c];
      let g = -1;
      if (d)
        for (x(Array.isArray(d), "expected `disable.null` to be populated"); ++g < d.length; ) {
          const h = d[g];
          if (!h.previous || h.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function ho(t) {
  return e;
  function e(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === f.data && (a = i, i++) : (!n[i] || n[i][1].type !== f.data) && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return t ? t(n, r) : n;
  }
}
function Bp(t, e) {
  let n = 0;
  for (; ++n <= t.length; )
    if ((n === t.length || t[n][1].type === f.lineEnding) && t[n - 1][1].type === f.data) {
      const r = t[n - 1][1], i = e.sliceStream(r);
      let a = i.length, s = -1, o = 0, l;
      for (; a--; ) {
        const u = i[a];
        if (typeof u == "string") {
          for (s = u.length; u.charCodeAt(s - 1) === m.space; )
            o++, s--;
          if (s) break;
          s = -1;
        } else if (u === m.horizontalTab)
          l = !0, o++;
        else if (u !== m.virtualSpace) {
          a++;
          break;
        }
      }
      if (e._contentTypeTextTrailing && n === t.length && (o = 0), o) {
        const u = {
          type: n === t.length || l || o < j.hardBreakPrefixSizeMin ? f.lineSuffix : f.hardBreakTrailing,
          start: {
            _bufferIndex: a ? s : r.start._bufferIndex + s,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - o,
            offset: r.end.offset - o
          },
          end: { ...r.end }
        };
        r.end = { ...u.start }, r.start.offset === r.end.offset ? Object.assign(r, u) : (t.splice(
          n,
          0,
          ["enter", u, e],
          ["exit", u, e]
        ), n += 2);
      }
      n++;
    }
  return t;
}
const $p = {
  [m.asterisk]: ct,
  [m.plusSign]: ct,
  [m.dash]: ct,
  [m.digit0]: ct,
  [m.digit1]: ct,
  [m.digit2]: ct,
  [m.digit3]: ct,
  [m.digit4]: ct,
  [m.digit5]: ct,
  [m.digit6]: ct,
  [m.digit7]: ct,
  [m.digit8]: ct,
  [m.digit9]: ct,
  [m.greaterThan]: no
}, jp = {
  [m.leftSquareBracket]: Zh
}, Vp = {
  [m.horizontalTab]: zr,
  [m.virtualSpace]: zr,
  [m.space]: zr
}, Wp = {
  [m.numberSign]: Qh,
  [m.asterisk]: ar,
  [m.dash]: [Ha, ar],
  [m.lessThan]: rp,
  [m.equalsTo]: Ha,
  [m.underscore]: ar,
  [m.graveAccent]: Da,
  [m.tilde]: Da
}, Gp = {
  [m.ampersand]: io,
  [m.backslash]: ro
}, Zp = {
  [m.carriageReturn]: Ur,
  [m.lineFeed]: Ur,
  [m.carriageReturnLineFeed]: Ur,
  [m.exclamationMark]: xp,
  [m.ampersand]: io,
  [m.asterisk]: hi,
  [m.lessThan]: [Th, up],
  [m.leftSquareBracket]: bp,
  [m.backslash]: [Yh, ro],
  [m.rightSquareBracket]: Ai,
  [m.underscore]: hi,
  [m.graveAccent]: Fh
}, qp = { null: [hi, Hp] }, Kp = { null: [m.asterisk, m.underscore] }, Xp = { null: [] }, Yp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Kp,
  contentInitial: jp,
  disable: Xp,
  document: $p,
  flow: Wp,
  flowInitial: Vp,
  insideSpan: qp,
  string: Gp,
  text: Zp
}, Symbol.toStringTag, { value: "Module" }));
var pi = { exports: {} }, Br, za;
function Jp() {
  if (za) return Br;
  za = 1;
  var t = 1e3, e = t * 60, n = e * 60, r = n * 24, i = r * 7, a = r * 365.25;
  Br = function(c, d) {
    d = d || {};
    var g = typeof c;
    if (g === "string" && c.length > 0)
      return s(c);
    if (g === "number" && isFinite(c))
      return d.long ? l(c) : o(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function s(c) {
    if (c = String(c), !(c.length > 100)) {
      var d = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (d) {
        var g = parseFloat(d[1]), h = (d[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return g * a;
          case "weeks":
          case "week":
          case "w":
            return g * i;
          case "days":
          case "day":
          case "d":
            return g * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return g * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return g * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return g * t;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return g;
          default:
            return;
        }
      }
    }
  }
  function o(c) {
    var d = Math.abs(c);
    return d >= r ? Math.round(c / r) + "d" : d >= n ? Math.round(c / n) + "h" : d >= e ? Math.round(c / e) + "m" : d >= t ? Math.round(c / t) + "s" : c + "ms";
  }
  function l(c) {
    var d = Math.abs(c);
    return d >= r ? u(c, d, r, "day") : d >= n ? u(c, d, n, "hour") : d >= e ? u(c, d, e, "minute") : d >= t ? u(c, d, t, "second") : c + " ms";
  }
  function u(c, d, g, h) {
    var C = d >= g * 1.5;
    return Math.round(c / g) + " " + h + (C ? "s" : "");
  }
  return Br;
}
function Qp(t) {
  n.debug = n, n.default = n, n.coerce = l, n.disable = s, n.enable = i, n.enabled = o, n.humanize = Jp(), n.destroy = u, Object.keys(t).forEach((c) => {
    n[c] = t[c];
  }), n.names = [], n.skips = [], n.formatters = {};
  function e(c) {
    let d = 0;
    for (let g = 0; g < c.length; g++)
      d = (d << 5) - d + c.charCodeAt(g), d |= 0;
    return n.colors[Math.abs(d) % n.colors.length];
  }
  n.selectColor = e;
  function n(c) {
    let d, g = null, h, C;
    function k(...I) {
      if (!k.enabled)
        return;
      const b = k, E = Number(/* @__PURE__ */ new Date()), R = E - (d || E);
      b.diff = R, b.prev = d, b.curr = E, d = E, I[0] = n.coerce(I[0]), typeof I[0] != "string" && I.unshift("%O");
      let M = 0;
      I[0] = I[0].replace(/%([a-zA-Z%])/g, (T, z) => {
        if (T === "%%")
          return "%";
        M++;
        const U = n.formatters[z];
        if (typeof U == "function") {
          const V = I[M];
          T = U.call(b, V), I.splice(M, 1), M--;
        }
        return T;
      }), n.formatArgs.call(b, I), (b.log || n.log).apply(b, I);
    }
    return k.namespace = c, k.useColors = n.useColors(), k.color = n.selectColor(c), k.extend = r, k.destroy = n.destroy, Object.defineProperty(k, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => g !== null ? g : (h !== n.namespaces && (h = n.namespaces, C = n.enabled(c)), C),
      set: (I) => {
        g = I;
      }
    }), typeof n.init == "function" && n.init(k), k;
  }
  function r(c, d) {
    const g = n(this.namespace + (typeof d > "u" ? ":" : d) + c);
    return g.log = this.log, g;
  }
  function i(c) {
    n.save(c), n.namespaces = c, n.names = [], n.skips = [];
    const d = (typeof c == "string" ? c : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
    for (const g of d)
      g[0] === "-" ? n.skips.push(g.slice(1)) : n.names.push(g);
  }
  function a(c, d) {
    let g = 0, h = 0, C = -1, k = 0;
    for (; g < c.length; )
      if (h < d.length && (d[h] === c[g] || d[h] === "*"))
        d[h] === "*" ? (C = h, k = g, h++) : (g++, h++);
      else if (C !== -1)
        h = C + 1, k++, g = k;
      else
        return !1;
    for (; h < d.length && d[h] === "*"; )
      h++;
    return h === d.length;
  }
  function s() {
    const c = [
      ...n.names,
      ...n.skips.map((d) => "-" + d)
    ].join(",");
    return n.enable(""), c;
  }
  function o(c) {
    for (const d of n.skips)
      if (a(c, d))
        return !1;
    for (const d of n.names)
      if (a(c, d))
        return !0;
    return !1;
  }
  function l(c) {
    return c instanceof Error ? c.stack || c.message : c;
  }
  function u() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return n.enable(n.load()), n;
}
var ef = Qp;
(function(t, e) {
  e.formatArgs = r, e.save = i, e.load = a, e.useColors = n, e.storage = s(), e.destroy = /* @__PURE__ */ (() => {
    let l = !1;
    return () => {
      l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function n() {
    if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
      return !0;
    if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
      return !1;
    let l;
    return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function r(l) {
    if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors)
      return;
    const u = "color: " + this.color;
    l.splice(1, 0, u, "color: inherit");
    let c = 0, d = 0;
    l[0].replace(/%[a-zA-Z%]/g, (g) => {
      g !== "%%" && (c++, g === "%c" && (d = c));
    }), l.splice(d, 0, u);
  }
  e.log = console.debug || console.log || (() => {
  });
  function i(l) {
    try {
      l ? e.storage.setItem("debug", l) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function a() {
    let l;
    try {
      l = e.storage.getItem("debug") || e.storage.getItem("DEBUG");
    } catch {
    }
    return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
  }
  function s() {
    try {
      return localStorage;
    } catch {
    }
  }
  t.exports = ef(e);
  const { formatters: o } = t.exports;
  o.j = function(l) {
    try {
      return JSON.stringify(l);
    } catch (u) {
      return "[UnexpectedJSONParseError]: " + u.message;
    }
  };
})(pi, pi.exports);
var tf = pi.exports;
const nf = /* @__PURE__ */ xi(tf), en = nf("micromark");
function rf(t, e, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, a = [];
  let s = [], o = [], l = !0;
  const u = {
    attempt: V(z),
    check: V(U),
    consume: M,
    enter: D,
    exit: T,
    interrupt: V(U, { interrupt: !0 })
  }, c = {
    code: m.eof,
    containerState: {},
    defineSkip: b,
    events: [],
    now: I,
    parser: t,
    previous: m.eof,
    sliceSerialize: C,
    sliceStream: k,
    write: h
  };
  let d = e.tokenize.call(c, u), g;
  return e.resolveAll && a.push(e), c;
  function h(N) {
    return s = wt(s, N), E(), s[s.length - 1] !== m.eof ? [] : (K(e, 0), c.events = Ni(a, c.events, c), c.events);
  }
  function C(N, L) {
    return sf(k(N), L);
  }
  function k(N) {
    return af(s, N);
  }
  function I() {
    const { _bufferIndex: N, _index: L, line: O, column: ee, offset: W } = r;
    return { _bufferIndex: N, _index: L, line: O, column: ee, offset: W };
  }
  function b(N) {
    i[N.line] = N.column, B(), en("position: define skip: `%j`", r);
  }
  function E() {
    let N;
    for (; r._index < s.length; ) {
      const L = s[r._index];
      if (typeof L == "string")
        for (N = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === N && r._bufferIndex < L.length; )
          R(L.charCodeAt(r._bufferIndex));
      else
        R(L);
    }
  }
  function R(N) {
    x(l === !0, "expected character to be consumed"), l = void 0, en("main: passing `%s` to %s", N, d && d.name), g = N, x(typeof d == "function", "expected state"), d = d(N);
  }
  function M(N) {
    x(N === g, "expected given code to equal expected code"), en("consume: `%s`", N), x(
      l === void 0,
      "expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used"
    ), x(
      N === null ? c.events.length === 0 || c.events[c.events.length - 1][0] === "exit" : c.events[c.events.length - 1][0] === "enter",
      "expected last token to be open"
    ), Y(N) ? (r.line++, r.column = 1, r.offset += N === m.carriageReturnLineFeed ? 2 : 1, B(), en("position: after eol: `%j`", r)) : N !== m.virtualSpace && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    s[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = N, l = !0;
  }
  function D(N, L) {
    const O = L || {};
    return O.type = N, O.start = I(), x(typeof N == "string", "expected string type"), x(N.length > 0, "expected non-empty string"), en("enter: `%s`", N), c.events.push(["enter", O, c]), o.push(O), O;
  }
  function T(N) {
    x(typeof N == "string", "expected string type"), x(N.length > 0, "expected non-empty string");
    const L = o.pop();
    return x(L, "cannot close w/o open tokens"), L.end = I(), x(N === L.type, "expected exit token to match current token"), x(
      !(L.start._index === L.end._index && L.start._bufferIndex === L.end._bufferIndex),
      "expected non-empty token (`" + N + "`)"
    ), en("exit: `%s`", L.type), c.events.push(["exit", L, c]), L;
  }
  function z(N, L) {
    K(N, L.from);
  }
  function U(N, L) {
    L.restore();
  }
  function V(N, L) {
    return O;
    function O(ee, W, de) {
      let _e, w, te, G;
      return Array.isArray(ee) ? (
        /* c8 ignore next 1 */
        re(ee)
      ) : "tokenize" in ee ? (
        // Looks like a construct.
        re([
          /** @type {Construct} */
          ee
        ])
      ) : y(ee);
      function y(X) {
        return Ae;
        function Ae(Te) {
          const Ce = Te !== null && X[Te], fe = Te !== null && X.null, Ee = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Ce) ? Ce : Ce ? [Ce] : [],
            ...Array.isArray(fe) ? fe : fe ? [fe] : []
          ];
          return re(Ee)(Te);
        }
      }
      function re(X) {
        return _e = X, w = 0, X.length === 0 ? (x(de, "expected `bogusState` to be given"), de) : Z(X[w]);
      }
      function Z(X) {
        return Ae;
        function Ae(Te) {
          return G = ie(), te = X, X.partial || (c.currentConstruct = X), x(
            c.parser.constructs.disable.null,
            "expected `disable.null` to be populated"
          ), X.name && c.parser.constructs.disable.null.includes(X.name) ? me(Te) : X.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            L ? Object.assign(Object.create(c), L) : c,
            u,
            se,
            me
          )(Te);
        }
      }
      function se(X) {
        return x(X === g, "expected code"), l = !0, N(te, G), W;
      }
      function me(X) {
        return x(X === g, "expected code"), l = !0, G.restore(), ++w < _e.length ? Z(_e[w]) : de;
      }
    }
  }
  function K(N, L) {
    N.resolveAll && !a.includes(N) && a.push(N), N.resolve && Ft(
      c.events,
      L,
      c.events.length - L,
      N.resolve(c.events.slice(L), c)
    ), N.resolveTo && (c.events = N.resolveTo(c.events, c)), x(
      N.partial || c.events.length === 0 || c.events[c.events.length - 1][0] === "exit",
      "expected last token to end"
    );
  }
  function ie() {
    const N = I(), L = c.previous, O = c.currentConstruct, ee = c.events.length, W = Array.from(o);
    return { from: ee, restore: de };
    function de() {
      r = N, c.previous = L, c.currentConstruct = O, c.events.length = ee, o = W, B(), en("position: restore: `%j`", r);
    }
  }
  function B() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function af(t, e) {
  const n = e.start._index, r = e.start._bufferIndex, i = e.end._index, a = e.end._bufferIndex;
  let s;
  if (n === i)
    x(a > -1, "expected non-negative end buffer index"), x(r > -1, "expected non-negative start buffer index"), s = [t[n].slice(r, a)];
  else {
    if (s = t.slice(n, i), r > -1) {
      const o = s[0];
      typeof o == "string" ? s[0] = o.slice(r) : (x(r === 0, "expected `startBufferIndex` to be `0`"), s.shift());
    }
    a > 0 && s.push(t[i].slice(0, a));
  }
  return s;
}
function sf(t, e) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < t.length; ) {
    const a = t[n];
    let s;
    if (typeof a == "string")
      s = a;
    else
      switch (a) {
        case m.carriageReturn: {
          s = Ot.cr;
          break;
        }
        case m.lineFeed: {
          s = Ot.lf;
          break;
        }
        case m.carriageReturnLineFeed: {
          s = Ot.cr + Ot.lf;
          break;
        }
        case m.horizontalTab: {
          s = e ? Ot.space : Ot.ht;
          break;
        }
        case m.virtualSpace: {
          if (!e && i) continue;
          s = Ot.space;
          break;
        }
        default:
          x(typeof a == "number", "expected number"), s = String.fromCharCode(a);
      }
    i = a === m.horizontalTab, r.push(s);
  }
  return r.join("");
}
function of(t) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      ch([Yp, ...(t || {}).extensions || []])
    ),
    content: i(yh),
    defined: [],
    document: i(wh),
    flow: i(Dp),
    lazy: {},
    string: i(zp),
    text: i(Up)
  };
  return r;
  function i(a) {
    return s;
    function s(o) {
      return rf(r, a, o);
    }
  }
}
function lf(t) {
  for (; !so(t); )
    ;
  return t;
}
const Ua = /[\0\t\n\r]/g;
function cf() {
  let t = 1, e = "", n = !0, r;
  return i;
  function i(a, s, o) {
    const l = [];
    let u, c, d, g, h;
    for (a = e + (typeof a == "string" ? a.toString() : new TextDecoder(s || void 0).decode(a)), d = 0, e = "", n && (a.charCodeAt(0) === m.byteOrderMarker && d++, n = void 0); d < a.length; ) {
      if (Ua.lastIndex = d, u = Ua.exec(a), g = u && u.index !== void 0 ? u.index : a.length, h = a.charCodeAt(g), !u) {
        e = a.slice(d);
        break;
      }
      if (h === m.lf && d === g && r)
        l.push(m.carriageReturnLineFeed), r = void 0;
      else
        switch (r && (l.push(m.carriageReturn), r = void 0), d < g && (l.push(a.slice(d, g)), t += g - d), h) {
          case m.nul: {
            l.push(m.replacementCharacter), t++;
            break;
          }
          case m.ht: {
            for (c = Math.ceil(t / j.tabSize) * j.tabSize, l.push(m.horizontalTab); t++ < c; ) l.push(m.virtualSpace);
            break;
          }
          case m.lf: {
            l.push(m.lineFeed), t = 1;
            break;
          }
          default:
            r = !0, t = 1;
        }
      d = g + 1;
    }
    return o && (r && l.push(m.carriageReturn), e && l.push(e), l.push(m.eof)), l;
  }
}
const uf = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function df(t) {
  return t.replace(uf, hf);
}
function hf(t, e, n) {
  if (e)
    return e;
  if (n.charCodeAt(0) === m.numberSign) {
    const i = n.charCodeAt(1), a = i === m.lowercaseX || i === m.uppercaseX;
    return to(
      n.slice(a ? 2 : 1),
      a ? j.numericBaseHexadecimal : j.numericBaseDecimal
    );
  }
  return Ii(n) || t;
}
const po = {}.hasOwnProperty;
function pf(t, e, n) {
  return typeof e != "string" && (n = e, e = void 0), ff(n)(
    lf(
      of(n).document().write(cf()(t, e, !0))
    )
  );
}
function ff(t) {
  const e = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(Rt),
      autolinkProtocol: V,
      autolinkEmail: V,
      atxHeading: a(Ye),
      blockQuote: a(Te),
      characterEscape: V,
      characterReference: V,
      codeFenced: a(Ce),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: a(Ce, s),
      codeText: a(fe, s),
      codeTextData: V,
      data: V,
      codeFlowValue: V,
      definition: a(Ee),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: a(xe),
      hardBreakEscape: a(Ht),
      hardBreakTrailing: a(Ht),
      htmlFlow: a(zt, s),
      htmlFlowData: V,
      htmlText: a(zt, s),
      htmlTextData: V,
      image: a(xt),
      label: s,
      link: a(Rt),
      listItem: a(Qt),
      listItemValue: g,
      listOrdered: a(It, d),
      listUnordered: a(It),
      paragraph: a(an),
      reference: y,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: a(Ye),
      strong: a(xn),
      thematicBreak: a(Nt)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: D,
      autolink: l(),
      autolinkEmail: Ae,
      autolinkProtocol: X,
      blockQuote: l(),
      characterEscapeValue: K,
      characterReferenceMarkerHexadecimal: Z,
      characterReferenceMarkerNumeric: Z,
      characterReferenceValue: se,
      characterReference: me,
      codeFenced: l(I),
      codeFencedFence: k,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: C,
      codeFlowValue: K,
      codeIndented: l(b),
      codeText: l(O),
      codeTextData: K,
      data: K,
      definition: l(),
      definitionDestinationString: M,
      definitionLabelString: E,
      definitionTitleString: R,
      emphasis: l(),
      hardBreakEscape: l(B),
      hardBreakTrailing: l(B),
      htmlFlow: l(N),
      htmlFlowData: K,
      htmlText: l(L),
      htmlTextData: K,
      image: l(W),
      label: _e,
      labelText: de,
      lineEnding: ie,
      link: l(ee),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: re,
      resourceDestinationString: w,
      resourceTitleString: te,
      resource: G,
      setextHeading: l(U),
      setextHeadingLineSequence: z,
      setextHeadingText: T,
      strong: l(),
      thematicBreak: l()
    }
  };
  fo(e, (t || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(_) {
    let v = { type: "root", children: [] };
    const $ = {
      stack: [v],
      tokenStack: [],
      config: e,
      enter: o,
      exit: u,
      buffer: s,
      resume: c,
      data: n
    }, ue = [];
    let we = -1;
    for (; ++we < _.length; )
      if (_[we][1].type === f.listOrdered || _[we][1].type === f.listUnordered)
        if (_[we][0] === "enter")
          ue.push(we);
        else {
          const $e = ue.pop();
          x(typeof $e == "number", "expected list ot be open"), we = i(_, $e, we);
        }
    for (we = -1; ++we < _.length; ) {
      const $e = e[_[we][0]];
      po.call($e, _[we][1].type) && $e[_[we][1].type].call(
        Object.assign(
          { sliceSerialize: _[we][2].sliceSerialize },
          $
        ),
        _[we][1]
      );
    }
    if ($.tokenStack.length > 0) {
      const $e = $.tokenStack[$.tokenStack.length - 1];
      ($e[1] || Ba).call($, void 0, $e[0]);
    }
    for (v.position = {
      start: qt(
        _.length > 0 ? _[0][1].start : { line: 1, column: 1, offset: 0 }
      ),
      end: qt(
        _.length > 0 ? _[_.length - 2][1].end : { line: 1, column: 1, offset: 0 }
      )
    }, we = -1; ++we < e.transforms.length; )
      v = e.transforms[we](v) || v;
    return v;
  }
  function i(_, v, $) {
    let ue = v - 1, we = -1, $e = !1, yt, Je, ve, De;
    for (; ++ue <= $; ) {
      const Fe = _[ue];
      switch (Fe[1].type) {
        case f.listUnordered:
        case f.listOrdered:
        case f.blockQuote: {
          Fe[0] === "enter" ? we++ : we--, De = void 0;
          break;
        }
        case f.lineEndingBlank: {
          Fe[0] === "enter" && (yt && !De && !we && !ve && (ve = ue), De = void 0);
          break;
        }
        case f.linePrefix:
        case f.listItemValue:
        case f.listItemMarker:
        case f.listItemPrefix:
        case f.listItemPrefixWhitespace:
          break;
        default:
          De = void 0;
      }
      if (!we && Fe[0] === "enter" && Fe[1].type === f.listItemPrefix || we === -1 && Fe[0] === "exit" && (Fe[1].type === f.listUnordered || Fe[1].type === f.listOrdered)) {
        if (yt) {
          let qe = ue;
          for (Je = void 0; qe--; ) {
            const Qe = _[qe];
            if (Qe[1].type === f.lineEnding || Qe[1].type === f.lineEndingBlank) {
              if (Qe[0] === "exit") continue;
              Je && (_[Je][1].type = f.lineEndingBlank, $e = !0), Qe[1].type = f.lineEnding, Je = qe;
            } else if (!(Qe[1].type === f.linePrefix || Qe[1].type === f.blockQuotePrefix || Qe[1].type === f.blockQuotePrefixWhitespace || Qe[1].type === f.blockQuoteMarker || Qe[1].type === f.listItemIndent)) break;
          }
          ve && (!Je || ve < Je) && (yt._spread = !0), yt.end = Object.assign(
            {},
            Je ? _[Je][1].start : Fe[1].end
          ), _.splice(Je || ue, 0, ["exit", yt, Fe[2]]), ue++, $++;
        }
        if (Fe[1].type === f.listItemPrefix) {
          const qe = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Fe[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          yt = qe, _.splice(ue, 0, ["enter", qe, Fe[2]]), ue++, $++, ve = void 0, De = !0;
        }
      }
    }
    return _[v][1]._spread = $e, $;
  }
  function a(_, v) {
    return $;
    function $(ue) {
      o.call(this, _(ue), ue), v && v.call(this, ue);
    }
  }
  function s() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function o(_, v, $) {
    const ue = this.stack[this.stack.length - 1];
    x(ue, "expected `parent`"), x("children" in ue, "expected `parent`"), ue.children.push(_), this.stack.push(_), this.tokenStack.push([v, $ || void 0]), _.position = {
      start: qt(v.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function l(_) {
    return v;
    function v($) {
      _ && _.call(this, $), u.call(this, $);
    }
  }
  function u(_, v) {
    const $ = this.stack.pop();
    x($, "expected `node`");
    const ue = this.tokenStack.pop();
    if (ue)
      ue[0].type !== _.type && (v ? v.call(this, _, ue[0]) : (ue[1] || Ba).call(this, _, ue[0]));
    else throw new Error(
      "Cannot close `" + _.type + "` (" + Fn({ start: _.start, end: _.end }) + "): it’s not open"
    );
    x($.type !== "fragment", "unexpected fragment `exit`ed"), x($.position, "expected `position` to be defined"), $.position.end = qt(_.end);
  }
  function c() {
    return oh(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function g(_) {
    if (this.data.expectingFirstListItemValue) {
      const v = this.stack[this.stack.length - 2];
      x(v, "expected nodes on stack"), x(v.type === "list", "expected list on stack"), v.start = Number.parseInt(
        this.sliceSerialize(_),
        j.numericBaseDecimal
      ), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const _ = this.resume(), v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x(v.type === "code", "expected code on stack"), v.lang = _;
  }
  function C() {
    const _ = this.resume(), v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x(v.type === "code", "expected code on stack"), v.meta = _;
  }
  function k() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function I() {
    const _ = this.resume(), v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x(v.type === "code", "expected code on stack"), v.value = _.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function b() {
    const _ = this.resume(), v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x(v.type === "code", "expected code on stack"), v.value = _.replace(/(\r?\n|\r)$/g, "");
  }
  function E(_) {
    const v = this.resume(), $ = this.stack[this.stack.length - 1];
    x($, "expected node on stack"), x($.type === "definition", "expected definition on stack"), $.label = v, $.identifier = gn(
      this.sliceSerialize(_)
    ).toLowerCase();
  }
  function R() {
    const _ = this.resume(), v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x(v.type === "definition", "expected definition on stack"), v.title = _;
  }
  function M() {
    const _ = this.resume(), v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x(v.type === "definition", "expected definition on stack"), v.url = _;
  }
  function D(_) {
    const v = this.stack[this.stack.length - 1];
    if (x(v, "expected node on stack"), x(v.type === "heading", "expected heading on stack"), !v.depth) {
      const $ = this.sliceSerialize(_).length;
      x(
        $ === 1 || $ === 2 || $ === 3 || $ === 4 || $ === 5 || $ === 6,
        "expected `depth` between `1` and `6`"
      ), v.depth = $;
    }
  }
  function T() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function z(_) {
    const v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x(v.type === "heading", "expected heading on stack"), v.depth = this.sliceSerialize(_).codePointAt(0) === m.equalsTo ? 1 : 2;
  }
  function U() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function V(_) {
    const v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x("children" in v, "expected parent on stack");
    const $ = v.children;
    let ue = $[$.length - 1];
    (!ue || ue.type !== "text") && (ue = Gt(), ue.position = {
      start: qt(_.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, $.push(ue)), this.stack.push(ue);
  }
  function K(_) {
    const v = this.stack.pop();
    x(v, "expected a `node` to be on the stack"), x("value" in v, "expected a `literal` to be on the stack"), x(v.position, "expected `node` to have an open position"), v.value += this.sliceSerialize(_), v.position.end = qt(_.end);
  }
  function ie(_) {
    const v = this.stack[this.stack.length - 1];
    if (x(v, "expected `node`"), this.data.atHardBreak) {
      x("children" in v, "expected `parent`");
      const $ = v.children[v.children.length - 1];
      x($.position, "expected tail to have a starting position"), $.position.end = qt(_.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && e.canContainEols.includes(v.type) && (V.call(this, _), K.call(this, _));
  }
  function B() {
    this.data.atHardBreak = !0;
  }
  function N() {
    const _ = this.resume(), v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x(v.type === "html", "expected html on stack"), v.value = _;
  }
  function L() {
    const _ = this.resume(), v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x(v.type === "html", "expected html on stack"), v.value = _;
  }
  function O() {
    const _ = this.resume(), v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x(v.type === "inlineCode", "expected inline code on stack"), v.value = _;
  }
  function ee() {
    const _ = this.stack[this.stack.length - 1];
    if (x(_, "expected node on stack"), x(_.type === "link", "expected link on stack"), this.data.inReference) {
      const v = this.data.referenceType || "shortcut";
      _.type += "Reference", _.referenceType = v, delete _.url, delete _.title;
    } else
      delete _.identifier, delete _.label;
    this.data.referenceType = void 0;
  }
  function W() {
    const _ = this.stack[this.stack.length - 1];
    if (x(_, "expected node on stack"), x(_.type === "image", "expected image on stack"), this.data.inReference) {
      const v = this.data.referenceType || "shortcut";
      _.type += "Reference", _.referenceType = v, delete _.url, delete _.title;
    } else
      delete _.identifier, delete _.label;
    this.data.referenceType = void 0;
  }
  function de(_) {
    const v = this.sliceSerialize(_), $ = this.stack[this.stack.length - 2];
    x($, "expected ancestor on stack"), x(
      $.type === "image" || $.type === "link",
      "expected image or link on stack"
    ), $.label = df(v), $.identifier = gn(v).toLowerCase();
  }
  function _e() {
    const _ = this.stack[this.stack.length - 1];
    x(_, "expected node on stack"), x(_.type === "fragment", "expected fragment on stack");
    const v = this.resume(), $ = this.stack[this.stack.length - 1];
    if (x($, "expected node on stack"), x(
      $.type === "image" || $.type === "link",
      "expected image or link on stack"
    ), this.data.inReference = !0, $.type === "link") {
      const ue = _.children;
      $.children = ue;
    } else
      $.alt = v;
  }
  function w() {
    const _ = this.resume(), v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x(
      v.type === "image" || v.type === "link",
      "expected image or link on stack"
    ), v.url = _;
  }
  function te() {
    const _ = this.resume(), v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x(
      v.type === "image" || v.type === "link",
      "expected image or link on stack"
    ), v.title = _;
  }
  function G() {
    this.data.inReference = void 0;
  }
  function y() {
    this.data.referenceType = "collapsed";
  }
  function re(_) {
    const v = this.resume(), $ = this.stack[this.stack.length - 1];
    x($, "expected node on stack"), x(
      $.type === "image" || $.type === "link",
      "expected image reference or link reference on stack"
    ), $.label = v, $.identifier = gn(
      this.sliceSerialize(_)
    ).toLowerCase(), this.data.referenceType = "full";
  }
  function Z(_) {
    x(
      _.type === "characterReferenceMarkerNumeric" || _.type === "characterReferenceMarkerHexadecimal"
    ), this.data.characterReferenceType = _.type;
  }
  function se(_) {
    const v = this.sliceSerialize(_), $ = this.data.characterReferenceType;
    let ue;
    if ($)
      ue = to(
        v,
        $ === f.characterReferenceMarkerNumeric ? j.numericBaseDecimal : j.numericBaseHexadecimal
      ), this.data.characterReferenceType = void 0;
    else {
      const $e = Ii(v);
      x($e !== !1, "expected reference to decode"), ue = $e;
    }
    const we = this.stack[this.stack.length - 1];
    x(we, "expected `node`"), x("value" in we, "expected `node.value`"), we.value += ue;
  }
  function me(_) {
    const v = this.stack.pop();
    x(v, "expected `node`"), x(v.position, "expected `node.position`"), v.position.end = qt(_.end);
  }
  function X(_) {
    K.call(this, _);
    const v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x(v.type === "link", "expected link on stack"), v.url = this.sliceSerialize(_);
  }
  function Ae(_) {
    K.call(this, _);
    const v = this.stack[this.stack.length - 1];
    x(v, "expected node on stack"), x(v.type === "link", "expected link on stack"), v.url = "mailto:" + this.sliceSerialize(_);
  }
  function Te() {
    return { type: "blockquote", children: [] };
  }
  function Ce() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function fe() {
    return { type: "inlineCode", value: "" };
  }
  function Ee() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function xe() {
    return { type: "emphasis", children: [] };
  }
  function Ye() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Ht() {
    return { type: "break" };
  }
  function zt() {
    return { type: "html", value: "" };
  }
  function xt() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function Rt() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function It(_) {
    return {
      type: "list",
      ordered: _.type === "listOrdered",
      start: null,
      spread: _._spread,
      children: []
    };
  }
  function Qt(_) {
    return {
      type: "listItem",
      spread: _._spread,
      checked: null,
      children: []
    };
  }
  function an() {
    return { type: "paragraph", children: [] };
  }
  function xn() {
    return { type: "strong", children: [] };
  }
  function Gt() {
    return { type: "text", value: "" };
  }
  function Nt() {
    return { type: "thematicBreak" };
  }
}
function qt(t) {
  return { line: t.line, column: t.column, offset: t.offset };
}
function fo(t, e) {
  let n = -1;
  for (; ++n < e.length; ) {
    const r = e[n];
    Array.isArray(r) ? fo(t, r) : gf(t, r);
  }
}
function gf(t, e) {
  let n;
  for (n in e)
    if (po.call(e, n))
      switch (n) {
        case "canContainEols": {
          const r = e[n];
          r && t[n].push(...r);
          break;
        }
        case "transforms": {
          const r = e[n];
          r && t[n].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = e[n];
          r && Object.assign(t[n], r);
          break;
        }
      }
}
function Ba(t, e) {
  throw t ? new Error(
    "Cannot close `" + t.type + "` (" + Fn({ start: t.start, end: t.end }) + "): a different token (`" + e.type + "`, " + Fn({ start: e.start, end: e.end }) + ") is open"
  ) : new Error(
    "Cannot close document, a token (`" + e.type + "`, " + Fn({ start: e.start, end: e.end }) + ") is still open"
  );
}
function mf(t) {
  const e = this;
  e.parser = n;
  function n(r) {
    return pf(r, {
      ...e.data("settings"),
      ...t,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: e.data("micromarkExtensions") || [],
      mdastExtensions: e.data("fromMarkdownExtensions") || []
    });
  }
}
function yf(t, e) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: t.wrap(t.all(e), !0)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function Cf(t, e) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return t.patch(e, n), [t.applyData(e, n), { type: "text", value: `
` }];
}
function wf(t, e) {
  const n = e.value ? e.value + `
` : "", r = {}, i = e.lang ? e.lang.split(/\s+/) : [];
  i.length > 0 && (r.className = ["language-" + i[0]]);
  let a = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: n }]
  };
  return e.meta && (a.data = { meta: e.meta }), t.patch(e, a), a = t.applyData(e, a), a = { type: "element", tagName: "pre", properties: {}, children: [a] }, t.patch(e, a), a;
}
function Sf(t, e) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function xf(t, e) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function kf(t, e) {
  const n = typeof t.options.clobberPrefix == "string" ? t.options.clobberPrefix : "user-content-", r = String(e.identifier).toUpperCase(), i = Sn(r.toLowerCase()), a = t.footnoteOrder.indexOf(r);
  let s, o = t.footnoteCounts.get(r);
  o === void 0 ? (o = 0, t.footnoteOrder.push(r), s = t.footnoteOrder.length) : s = a + 1, o += 1, t.footnoteCounts.set(r, o);
  const l = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (o > 1 ? "-" + o : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(s) }]
  };
  t.patch(e, l);
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [l]
  };
  return t.patch(e, u), t.applyData(e, u);
}
function bf(t, e) {
  const n = {
    type: "element",
    tagName: "h" + e.depth,
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function Tf(t, e) {
  if (t.options.allowDangerousHtml) {
    const n = { type: "raw", value: e.value };
    return t.patch(e, n), t.applyData(e, n);
  }
}
function go(t, e) {
  const n = e.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (e.label || e.identifier) + "]"), e.type === "imageReference")
    return [{ type: "text", value: "![" + e.alt + r }];
  const i = t.all(e), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return s && s.type === "text" ? s.value += r : i.push({ type: "text", value: r }), i;
}
function Ef(t, e) {
  const n = String(e.identifier).toUpperCase(), r = t.definitionById.get(n);
  if (!r)
    return go(t, e);
  const i = { src: Sn(r.url || ""), alt: e.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return t.patch(e, a), t.applyData(e, a);
}
function _f(t, e) {
  const n = { src: Sn(e.url) };
  e.alt !== null && e.alt !== void 0 && (n.alt = e.alt), e.title !== null && e.title !== void 0 && (n.title = e.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return t.patch(e, r), t.applyData(e, r);
}
function vf(t, e) {
  const n = { type: "text", value: e.value.replace(/\r?\n|\r/g, " ") };
  t.patch(e, n);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [n]
  };
  return t.patch(e, r), t.applyData(e, r);
}
function Rf(t, e) {
  const n = String(e.identifier).toUpperCase(), r = t.definitionById.get(n);
  if (!r)
    return go(t, e);
  const i = { href: Sn(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: t.all(e)
  };
  return t.patch(e, a), t.applyData(e, a);
}
function If(t, e) {
  const n = { href: Sn(e.url) };
  e.title !== null && e.title !== void 0 && (n.title = e.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: t.all(e)
  };
  return t.patch(e, r), t.applyData(e, r);
}
function Nf(t, e, n) {
  const r = t.all(e), i = n ? Af(n) : mo(e), a = {}, s = [];
  if (typeof e.checked == "boolean") {
    const c = r[0];
    let d;
    c && c.type === "element" && c.tagName === "p" ? d = c : (d = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(d)), d.children.length > 0 && d.children.unshift({ type: "text", value: " " }), d.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: e.checked, disabled: !0 },
      children: []
    }), a.className = ["task-list-item"];
  }
  let o = -1;
  for (; ++o < r.length; ) {
    const c = r[o];
    (i || o !== 0 || c.type !== "element" || c.tagName !== "p") && s.push({ type: "text", value: `
` }), c.type === "element" && c.tagName === "p" && !i ? s.push(...c.children) : s.push(c);
  }
  const l = r[r.length - 1];
  l && (i || l.type !== "element" || l.tagName !== "p") && s.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: a, children: s };
  return t.patch(e, u), t.applyData(e, u);
}
function Af(t) {
  let e = !1;
  if (t.type === "list") {
    e = t.spread || !1;
    const n = t.children;
    let r = -1;
    for (; !e && ++r < n.length; )
      e = mo(n[r]);
  }
  return e;
}
function mo(t) {
  const e = t.spread;
  return e ?? t.children.length > 1;
}
function Mf(t, e) {
  const n = {}, r = t.all(e);
  let i = -1;
  for (typeof e.start == "number" && e.start !== 1 && (n.start = e.start); ++i < r.length; ) {
    const s = r[i];
    if (s.type === "element" && s.tagName === "li" && s.properties && Array.isArray(s.properties.className) && s.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const a = {
    type: "element",
    tagName: e.ordered ? "ol" : "ul",
    properties: n,
    children: t.wrap(r, !0)
  };
  return t.patch(e, a), t.applyData(e, a);
}
function Of(t, e) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function Lf(t, e) {
  const n = { type: "root", children: t.wrap(t.all(e)) };
  return t.patch(e, n), t.applyData(e, n);
}
function Pf(t, e) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function Df(t, e) {
  const n = t.all(e), r = n.shift(), i = [];
  if (r) {
    const s = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: t.wrap([r], !0)
    };
    t.patch(e.children[0], s), i.push(s);
  }
  if (n.length > 0) {
    const s = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: t.wrap(n, !0)
    }, o = Ei(e.children[1]), l = qs(e.children[e.children.length - 1]);
    o && l && (s.position = { start: o, end: l }), i.push(s);
  }
  const a = {
    type: "element",
    tagName: "table",
    properties: {},
    children: t.wrap(i, !0)
  };
  return t.patch(e, a), t.applyData(e, a);
}
function Ff(t, e, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(e) : 1) === 0 ? "th" : "td", s = n && n.type === "table" ? n.align : void 0, o = s ? s.length : e.children.length;
  let l = -1;
  const u = [];
  for (; ++l < o; ) {
    const d = e.children[l], g = {}, h = s ? s[l] : void 0;
    h && (g.align = h);
    let C = { type: "element", tagName: a, properties: g, children: [] };
    d && (C.children = t.all(d), t.patch(d, C), C = t.applyData(d, C)), u.push(C);
  }
  const c = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: t.wrap(u, !0)
  };
  return t.patch(e, c), t.applyData(e, c);
}
function Hf(t, e) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
const $a = 9, ja = 32;
function zf(t) {
  const e = String(t), n = /\r?\n|\r/g;
  let r = n.exec(e), i = 0;
  const a = [];
  for (; r; )
    a.push(
      Va(e.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(e);
  return a.push(Va(e.slice(i), i > 0, !1)), a.join("");
}
function Va(t, e, n) {
  let r = 0, i = t.length;
  if (e) {
    let a = t.codePointAt(r);
    for (; a === $a || a === ja; )
      r++, a = t.codePointAt(r);
  }
  if (n) {
    let a = t.codePointAt(i - 1);
    for (; a === $a || a === ja; )
      i--, a = t.codePointAt(i - 1);
  }
  return i > r ? t.slice(r, i) : "";
}
function Uf(t, e) {
  const n = { type: "text", value: zf(String(e.value)) };
  return t.patch(e, n), t.applyData(e, n);
}
function Bf(t, e) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return t.patch(e, n), t.applyData(e, n);
}
const $f = {
  blockquote: yf,
  break: Cf,
  code: wf,
  delete: Sf,
  emphasis: xf,
  footnoteReference: kf,
  heading: bf,
  html: Tf,
  imageReference: Ef,
  image: _f,
  inlineCode: vf,
  linkReference: Rf,
  link: If,
  listItem: Nf,
  list: Mf,
  paragraph: Of,
  // @ts-expect-error: root is different, but hard to type.
  root: Lf,
  strong: Pf,
  table: Df,
  tableCell: Hf,
  tableRow: Ff,
  text: Uf,
  thematicBreak: Bf,
  toml: er,
  yaml: er,
  definition: er,
  footnoteDefinition: er
};
function er() {
}
const yo = -1, wr = 0, zn = 1, pr = 2, Mi = 3, Oi = 4, Li = 5, Pi = 6, Co = 7, wo = 8, Wa = typeof self == "object" ? self : globalThis, jf = (t, e) => {
  const n = (i, a) => (t.set(a, i), i), r = (i) => {
    if (t.has(i))
      return t.get(i);
    const [a, s] = e[i];
    switch (a) {
      case wr:
      case yo:
        return n(s, i);
      case zn: {
        const o = n([], i);
        for (const l of s)
          o.push(r(l));
        return o;
      }
      case pr: {
        const o = n({}, i);
        for (const [l, u] of s)
          o[r(l)] = r(u);
        return o;
      }
      case Mi:
        return n(new Date(s), i);
      case Oi: {
        const { source: o, flags: l } = s;
        return n(new RegExp(o, l), i);
      }
      case Li: {
        const o = n(/* @__PURE__ */ new Map(), i);
        for (const [l, u] of s)
          o.set(r(l), r(u));
        return o;
      }
      case Pi: {
        const o = n(/* @__PURE__ */ new Set(), i);
        for (const l of s)
          o.add(r(l));
        return o;
      }
      case Co: {
        const { name: o, message: l } = s;
        return n(new Wa[o](l), i);
      }
      case wo:
        return n(BigInt(s), i);
      case "BigInt":
        return n(Object(BigInt(s)), i);
      case "ArrayBuffer":
        return n(new Uint8Array(s).buffer, s);
      case "DataView": {
        const { buffer: o } = new Uint8Array(s);
        return n(new DataView(o), s);
      }
    }
    return n(new Wa[a](s), i);
  };
  return r;
}, Ga = (t) => jf(/* @__PURE__ */ new Map(), t)(0), hn = "", { toString: Vf } = {}, { keys: Wf } = Object, Ln = (t) => {
  const e = typeof t;
  if (e !== "object" || !t)
    return [wr, e];
  const n = Vf.call(t).slice(8, -1);
  switch (n) {
    case "Array":
      return [zn, hn];
    case "Object":
      return [pr, hn];
    case "Date":
      return [Mi, hn];
    case "RegExp":
      return [Oi, hn];
    case "Map":
      return [Li, hn];
    case "Set":
      return [Pi, hn];
    case "DataView":
      return [zn, n];
  }
  return n.includes("Array") ? [zn, n] : n.includes("Error") ? [Co, n] : [pr, n];
}, tr = ([t, e]) => t === wr && (e === "function" || e === "symbol"), Gf = (t, e, n, r) => {
  const i = (s, o) => {
    const l = r.push(s) - 1;
    return n.set(o, l), l;
  }, a = (s) => {
    if (n.has(s))
      return n.get(s);
    let [o, l] = Ln(s);
    switch (o) {
      case wr: {
        let c = s;
        switch (l) {
          case "bigint":
            o = wo, c = s.toString();
            break;
          case "function":
          case "symbol":
            if (t)
              throw new TypeError("unable to serialize " + l);
            c = null;
            break;
          case "undefined":
            return i([yo], s);
        }
        return i([o, c], s);
      }
      case zn: {
        if (l) {
          let g = s;
          return l === "DataView" ? g = new Uint8Array(s.buffer) : l === "ArrayBuffer" && (g = new Uint8Array(s)), i([l, [...g]], s);
        }
        const c = [], d = i([o, c], s);
        for (const g of s)
          c.push(a(g));
        return d;
      }
      case pr: {
        if (l)
          switch (l) {
            case "BigInt":
              return i([l, s.toString()], s);
            case "Boolean":
            case "Number":
            case "String":
              return i([l, s.valueOf()], s);
          }
        if (e && "toJSON" in s)
          return a(s.toJSON());
        const c = [], d = i([o, c], s);
        for (const g of Wf(s))
          (t || !tr(Ln(s[g]))) && c.push([a(g), a(s[g])]);
        return d;
      }
      case Mi:
        return i([o, s.toISOString()], s);
      case Oi: {
        const { source: c, flags: d } = s;
        return i([o, { source: c, flags: d }], s);
      }
      case Li: {
        const c = [], d = i([o, c], s);
        for (const [g, h] of s)
          (t || !(tr(Ln(g)) || tr(Ln(h)))) && c.push([a(g), a(h)]);
        return d;
      }
      case Pi: {
        const c = [], d = i([o, c], s);
        for (const g of s)
          (t || !tr(Ln(g))) && c.push(a(g));
        return d;
      }
    }
    const { message: u } = s;
    return i([o, { name: l, message: u }], s);
  };
  return a;
}, Za = (t, { json: e, lossy: n } = {}) => {
  const r = [];
  return Gf(!(e || n), !!e, /* @__PURE__ */ new Map(), r)(t), r;
}, fr = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (t, e) => e && ("json" in e || "lossy" in e) ? Ga(Za(t, e)) : structuredClone(t)
) : (t, e) => Ga(Za(t, e));
function Zf(t, e) {
  const n = [{ type: "text", value: "↩" }];
  return e > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(e) }]
  }), n;
}
function qf(t, e) {
  return "Back to reference " + (t + 1) + (e > 1 ? "-" + e : "");
}
function Kf(t) {
  const e = typeof t.options.clobberPrefix == "string" ? t.options.clobberPrefix : "user-content-", n = t.options.footnoteBackContent || Zf, r = t.options.footnoteBackLabel || qf, i = t.options.footnoteLabel || "Footnotes", a = t.options.footnoteLabelTagName || "h2", s = t.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let l = -1;
  for (; ++l < t.footnoteOrder.length; ) {
    const u = t.footnoteById.get(
      t.footnoteOrder[l]
    );
    if (!u)
      continue;
    const c = t.all(u), d = String(u.identifier).toUpperCase(), g = Sn(d.toLowerCase());
    let h = 0;
    const C = [], k = t.footnoteCounts.get(d);
    for (; k !== void 0 && ++h <= k; ) {
      C.length > 0 && C.push({ type: "text", value: " " });
      let E = typeof n == "string" ? n : n(l, h);
      typeof E == "string" && (E = { type: "text", value: E }), C.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + e + "fnref-" + g + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(l, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(E) ? E : [E]
      });
    }
    const I = c[c.length - 1];
    if (I && I.type === "element" && I.tagName === "p") {
      const E = I.children[I.children.length - 1];
      E && E.type === "text" ? E.value += " " : I.children.push({ type: "text", value: " " }), I.children.push(...C);
    } else
      c.push(...C);
    const b = {
      type: "element",
      tagName: "li",
      properties: { id: e + "fn-" + g },
      children: t.wrap(c, !0)
    };
    t.patch(u, b), o.push(b);
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
            ...fr(s),
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
          children: t.wrap(o, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const Di = (
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
  function(t) {
    if (t == null)
      return Qf;
    if (typeof t == "function")
      return Sr(t);
    if (typeof t == "object")
      return Array.isArray(t) ? Xf(t) : Yf(t);
    if (typeof t == "string")
      return Jf(t);
    throw new Error("Expected function, string, or object as test");
  }
);
function Xf(t) {
  const e = [];
  let n = -1;
  for (; ++n < t.length; )
    e[n] = Di(t[n]);
  return Sr(r);
  function r(...i) {
    let a = -1;
    for (; ++a < e.length; )
      if (e[a].apply(this, i)) return !0;
    return !1;
  }
}
function Yf(t) {
  const e = (
    /** @type {Record<string, unknown>} */
    t
  );
  return Sr(n);
  function n(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let a;
    for (a in t)
      if (i[a] !== e[a]) return !1;
    return !0;
  }
}
function Jf(t) {
  return Sr(e);
  function e(n) {
    return n && n.type === t;
  }
}
function Sr(t) {
  return e;
  function e(n, r, i) {
    return !!(e1(n) && t.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Qf() {
  return !0;
}
function e1(t) {
  return t !== null && typeof t == "object" && "type" in t;
}
const So = [], t1 = !0, qa = !1, n1 = "skip";
function xo(t, e, n, r) {
  let i;
  typeof e == "function" && typeof n != "function" ? (r = n, n = e) : i = e;
  const a = Di(i), s = r ? -1 : 1;
  o(t, void 0, [])();
  function o(l, u, c) {
    const d = (
      /** @type {Record<string, unknown>} */
      l && typeof l == "object" ? l : {}
    );
    if (typeof d.type == "string") {
      const h = (
        // `hast`
        typeof d.tagName == "string" ? d.tagName : (
          // `xast`
          typeof d.name == "string" ? d.name : void 0
        )
      );
      Object.defineProperty(g, "name", {
        value: "node (" + (l.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return g;
    function g() {
      let h = So, C, k, I;
      if ((!e || a(l, u, c[c.length - 1] || void 0)) && (h = r1(n(l, c)), h[0] === qa))
        return h;
      if ("children" in l && l.children) {
        const b = (
          /** @type {UnistParent} */
          l
        );
        if (b.children && h[0] !== n1)
          for (k = (r ? b.children.length : -1) + s, I = c.concat(b); k > -1 && k < b.children.length; ) {
            const E = b.children[k];
            if (C = o(E, k, I)(), C[0] === qa)
              return C;
            k = typeof C[1] == "number" ? C[1] : k + s;
          }
      }
      return h;
    }
  }
}
function r1(t) {
  return Array.isArray(t) ? t : typeof t == "number" ? [t1, t] : t == null ? So : [t];
}
function ko(t, e, n, r) {
  let i, a, s;
  typeof e == "function" && typeof n != "function" ? (a = void 0, s = e, i = n) : (a = e, s = n, i = r), xo(t, a, o, i);
  function o(l, u) {
    const c = u[u.length - 1], d = c ? c.children.indexOf(l) : void 0;
    return s(l, d, c);
  }
}
const fi = {}.hasOwnProperty, i1 = {};
function a1(t, e) {
  const n = e || i1, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = { ...$f, ...n.handlers }, o = {
    all: u,
    applyData: o1,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: s,
    one: l,
    options: n,
    patch: s1,
    wrap: c1
  };
  return ko(t, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const d = c.type === "definition" ? r : i, g = String(c.identifier).toUpperCase();
      d.has(g) || d.set(g, c);
    }
  }), o;
  function l(c, d) {
    const g = c.type, h = o.handlers[g];
    if (fi.call(o.handlers, g) && h)
      return h(o, c, d);
    if (o.options.passThrough && o.options.passThrough.includes(g)) {
      if ("children" in c) {
        const { children: k, ...I } = c, b = fr(I);
        return b.children = o.all(c), b;
      }
      return fr(c);
    }
    return (o.options.unknownHandler || l1)(o, c, d);
  }
  function u(c) {
    const d = [];
    if ("children" in c) {
      const g = c.children;
      let h = -1;
      for (; ++h < g.length; ) {
        const C = o.one(g[h], c);
        if (C) {
          if (h && g[h - 1].type === "break" && (!Array.isArray(C) && C.type === "text" && (C.value = Ka(C.value)), !Array.isArray(C) && C.type === "element")) {
            const k = C.children[0];
            k && k.type === "text" && (k.value = Ka(k.value));
          }
          Array.isArray(C) ? d.push(...C) : d.push(C);
        }
      }
    }
    return d;
  }
}
function s1(t, e) {
  t.position && (e.position = zd(t));
}
function o1(t, e) {
  let n = e;
  if (t && t.data) {
    const r = t.data.hName, i = t.data.hChildren, a = t.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element")
        n.tagName = r;
      else {
        const s = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: s };
      }
    n.type === "element" && a && Object.assign(n.properties, fr(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function l1(t, e) {
  const n = e.data || {}, r = "value" in e && !(fi.call(n, "hProperties") || fi.call(n, "hChildren")) ? { type: "text", value: e.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, r), t.applyData(e, r);
}
function c1(t, e) {
  const n = [];
  let r = -1;
  for (e && n.push({ type: "text", value: `
` }); ++r < t.length; )
    r && n.push({ type: "text", value: `
` }), n.push(t[r]);
  return e && t.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Ka(t) {
  let e = 0, n = t.charCodeAt(e);
  for (; n === 9 || n === 32; )
    e++, n = t.charCodeAt(e);
  return t.slice(e);
}
function Xa(t, e) {
  const n = a1(t, e), r = n.one(t, void 0), i = Kf(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && (x("children" in a), a.children.push({ type: "text", value: `
` }, i)), a;
}
function u1(t, e) {
  return t && "run" in t ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      Xa(n, { file: r, ...e })
    );
    await t.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      Xa(n, { file: r, ...t || e })
    );
  };
}
function Ya(t) {
  if (t)
    throw t;
}
var sr = Object.prototype.hasOwnProperty, bo = Object.prototype.toString, Ja = Object.defineProperty, Qa = Object.getOwnPropertyDescriptor, es = function(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : bo.call(e) === "[object Array]";
}, ts = function(e) {
  if (!e || bo.call(e) !== "[object Object]")
    return !1;
  var n = sr.call(e, "constructor"), r = e.constructor && e.constructor.prototype && sr.call(e.constructor.prototype, "isPrototypeOf");
  if (e.constructor && !n && !r)
    return !1;
  var i;
  for (i in e)
    ;
  return typeof i > "u" || sr.call(e, i);
}, ns = function(e, n) {
  Ja && n.name === "__proto__" ? Ja(e, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : e[n.name] = n.newValue;
}, rs = function(e, n) {
  if (n === "__proto__")
    if (sr.call(e, n)) {
      if (Qa)
        return Qa(e, n).value;
    } else return;
  return e[n];
}, d1 = function t() {
  var e, n, r, i, a, s, o = arguments[0], l = 1, u = arguments.length, c = !1;
  for (typeof o == "boolean" && (c = o, o = arguments[1] || {}, l = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); l < u; ++l)
    if (e = arguments[l], e != null)
      for (n in e)
        r = rs(o, n), i = rs(e, n), o !== i && (c && i && (ts(i) || (a = es(i))) ? (a ? (a = !1, s = r && es(r) ? r : []) : s = r && ts(r) ? r : {}, ns(o, { name: n, newValue: t(c, s, i) })) : typeof i < "u" && ns(o, { name: n, newValue: i }));
  return o;
};
const $r = /* @__PURE__ */ xi(d1);
function gi(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function h1() {
  const t = [], e = { run: n, use: r };
  return e;
  function n(...i) {
    let a = -1;
    const s = i.pop();
    if (typeof s != "function")
      throw new TypeError("Expected function as last argument, not " + s);
    o(null, ...i);
    function o(l, ...u) {
      const c = t[++a];
      let d = -1;
      if (l) {
        s(l);
        return;
      }
      for (; ++d < i.length; )
        (u[d] === null || u[d] === void 0) && (u[d] = i[d]);
      i = u, c ? p1(c, o)(...u) : s(null, ...u);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return t.push(i), e;
  }
}
function p1(t, e) {
  let n;
  return r;
  function r(...s) {
    const o = t.length > s.length;
    let l;
    o && s.push(i);
    try {
      l = t.apply(this, s);
    } catch (u) {
      const c = (
        /** @type {Error} */
        u
      );
      if (o && n)
        throw c;
      return i(c);
    }
    o || (l && l.then && typeof l.then == "function" ? l.then(a, i) : l instanceof Error ? i(l) : a(l));
  }
  function i(s, ...o) {
    n || (n = !0, e(s, ...o));
  }
  function a(s) {
    i(null, s);
  }
}
const Mt = { basename: f1, dirname: g1, extname: m1, join: y1, sep: "/" };
function f1(t, e) {
  if (e !== void 0 && typeof e != "string")
    throw new TypeError('"ext" argument must be a string');
  Wn(t);
  let n = 0, r = -1, i = t.length, a;
  if (e === void 0 || e.length === 0 || e.length > t.length) {
    for (; i--; )
      if (t.codePointAt(i) === 47) {
        if (a) {
          n = i + 1;
          break;
        }
      } else r < 0 && (a = !0, r = i + 1);
    return r < 0 ? "" : t.slice(n, r);
  }
  if (e === t)
    return "";
  let s = -1, o = e.length - 1;
  for (; i--; )
    if (t.codePointAt(i) === 47) {
      if (a) {
        n = i + 1;
        break;
      }
    } else
      s < 0 && (a = !0, s = i + 1), o > -1 && (t.codePointAt(i) === e.codePointAt(o--) ? o < 0 && (r = i) : (o = -1, r = s));
  return n === r ? r = s : r < 0 && (r = t.length), t.slice(n, r);
}
function g1(t) {
  if (Wn(t), t.length === 0)
    return ".";
  let e = -1, n = t.length, r;
  for (; --n; )
    if (t.codePointAt(n) === 47) {
      if (r) {
        e = n;
        break;
      }
    } else r || (r = !0);
  return e < 0 ? t.codePointAt(0) === 47 ? "/" : "." : e === 1 && t.codePointAt(0) === 47 ? "//" : t.slice(0, e);
}
function m1(t) {
  Wn(t);
  let e = t.length, n = -1, r = 0, i = -1, a = 0, s;
  for (; e--; ) {
    const o = t.codePointAt(e);
    if (o === 47) {
      if (s) {
        r = e + 1;
        break;
      }
      continue;
    }
    n < 0 && (s = !0, n = e + 1), o === 46 ? i < 0 ? i = e : a !== 1 && (a = 1) : i > -1 && (a = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  a === 0 || // The (right-most) trimmed path component is exactly `..`.
  a === 1 && i === n - 1 && i === r + 1 ? "" : t.slice(i, n);
}
function y1(...t) {
  let e = -1, n;
  for (; ++e < t.length; )
    Wn(t[e]), t[e] && (n = n === void 0 ? t[e] : n + "/" + t[e]);
  return n === void 0 ? "." : C1(n);
}
function C1(t) {
  Wn(t);
  const e = t.codePointAt(0) === 47;
  let n = w1(t, !e);
  return n.length === 0 && !e && (n = "."), n.length > 0 && t.codePointAt(t.length - 1) === 47 && (n += "/"), e ? "/" + n : n;
}
function w1(t, e) {
  let n = "", r = 0, i = -1, a = 0, s = -1, o, l;
  for (; ++s <= t.length; ) {
    if (s < t.length)
      o = t.codePointAt(s);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(i === s - 1 || a === 1)) if (i !== s - 1 && a === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (l = n.lastIndexOf("/"), l !== n.length - 1) {
              l < 0 ? (n = "", r = 0) : (n = n.slice(0, l), r = n.length - 1 - n.lastIndexOf("/")), i = s, a = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = s, a = 0;
            continue;
          }
        }
        e && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + t.slice(i + 1, s) : n = t.slice(i + 1, s), r = s - i - 1;
      i = s, a = 0;
    } else o === 46 && a > -1 ? a++ : a = -1;
  }
  return n;
}
function Wn(t) {
  if (typeof t != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(t)
    );
}
const S1 = { cwd: x1 };
function x1() {
  return "/";
}
function mi(t) {
  return !!(t !== null && typeof t == "object" && "href" in t && t.href && "protocol" in t && t.protocol && // @ts-expect-error: indexing is fine.
  t.auth === void 0);
}
function k1(t) {
  if (typeof t == "string")
    t = new URL(t);
  else if (!mi(t)) {
    const e = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + t + "`"
    );
    throw e.code = "ERR_INVALID_ARG_TYPE", e;
  }
  if (t.protocol !== "file:") {
    const e = new TypeError("The URL must be of scheme file");
    throw e.code = "ERR_INVALID_URL_SCHEME", e;
  }
  return b1(t);
}
function b1(t) {
  if (t.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const e = t.pathname;
  let n = -1;
  for (; ++n < e.length; )
    if (e.codePointAt(n) === 37 && e.codePointAt(n + 1) === 50) {
      const r = e.codePointAt(n + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(e);
}
const jr = (
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
class To {
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
  constructor(e) {
    let n;
    e ? mi(e) ? n = { path: e } : typeof e == "string" || T1(e) ? n = { value: e } : n = e : n = {}, this.cwd = "cwd" in n ? "" : S1.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < jr.length; ) {
      const a = jr[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      jr.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Mt.basename(this.path) : void 0;
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
  set basename(e) {
    Wr(e, "basename"), Vr(e, "basename"), this.path = Mt.join(this.dirname || "", e);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Mt.dirname(this.path) : void 0;
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
  set dirname(e) {
    is(this.basename, "dirname"), this.path = Mt.join(e || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Mt.extname(this.path) : void 0;
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
  set extname(e) {
    if (Vr(e, "extname"), is(this.dirname, "extname"), e) {
      if (e.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (e.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Mt.join(this.dirname, this.stem + (e || ""));
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
  set path(e) {
    mi(e) && (e = k1(e)), Wr(e, "path"), this.path !== e && this.history.push(e);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Mt.basename(this.path, this.extname) : void 0;
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
  set stem(e) {
    Wr(e, "stem"), Vr(e, "stem"), this.path = Mt.join(this.dirname || "", e + (this.extname || ""));
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
  fail(e, n, r) {
    const i = this.message(e, n, r);
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
  info(e, n, r) {
    const i = this.message(e, n, r);
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
  message(e, n, r) {
    const i = new nt(
      // @ts-expect-error: the overloads are fine.
      e,
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
  toString(e) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(e || void 0).decode(this.value);
  }
}
function Vr(t, e) {
  if (t && t.includes(Mt.sep))
    throw new Error(
      "`" + e + "` cannot be a path: did not expect `" + Mt.sep + "`"
    );
}
function Wr(t, e) {
  if (!t)
    throw new Error("`" + e + "` cannot be empty");
}
function is(t, e) {
  if (!t)
    throw new Error("Setting `" + e + "` requires `path` to be set too");
}
function T1(t) {
  return !!(t && typeof t == "object" && "byteLength" in t && "byteOffset" in t);
}
const E1 = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(t) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[t], a = function() {
      return i.apply(a, arguments);
    };
    return Object.setPrototypeOf(a, r), a;
  }
), _1 = {}.hasOwnProperty;
class Fi extends E1 {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = h1();
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
    const e = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new Fi()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      e.use(...r);
    }
    return e.data($r(!0, {}, this.namespace)), e;
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
  data(e, n) {
    return typeof e == "string" ? arguments.length === 2 ? (qr("data", this.frozen), this.namespace[e] = n, this) : _1.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (qr("data", this.frozen), this.namespace = e, this) : this.namespace;
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
    const e = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = n.call(e, ...r);
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
  parse(e) {
    this.freeze();
    const n = nr(e), r = this.parser || this.Parser;
    return Gr("parse", r), r(String(n), n);
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
  process(e, n) {
    const r = this;
    return this.freeze(), Gr("process", this.parser || this.Parser), Zr("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, s) {
      const o = nr(e), l = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(o)
      );
      r.run(l, o, function(c, d, g) {
        if (c || !d || !g)
          return u(c);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          d
        ), C = r.stringify(h, g);
        I1(C) ? g.value = C : g.result = C, u(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          g
        );
      });
      function u(c, d) {
        c || !d ? s(c) : a ? a(d) : (x(n, "`done` is defined if `resolve` is not"), n(void 0, d));
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
  processSync(e) {
    let n = !1, r;
    return this.freeze(), Gr("processSync", this.parser || this.Parser), Zr("processSync", this.compiler || this.Compiler), this.process(e, i), ss("processSync", "process", n), x(r, "we either bailed on an error or have a tree"), r;
    function i(a, s) {
      n = !0, Ya(a), r = s;
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
  run(e, n, r) {
    as(e), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(s, o) {
      x(
        typeof n != "function",
        "`file` can’t be a `done` anymore, we checked"
      );
      const l = nr(n);
      i.run(e, l, u);
      function u(c, d, g) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          d || e
        );
        c ? o(c) : s ? s(h) : (x(r, "`done` is defined if `resolve` is not"), r(void 0, h, g));
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
  runSync(e, n) {
    let r = !1, i;
    return this.run(e, n, a), ss("runSync", "run", r), x(i, "we either bailed on an error or have a tree"), i;
    function a(s, o) {
      Ya(s), i = o, r = !0;
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
  stringify(e, n) {
    this.freeze();
    const r = nr(n), i = this.compiler || this.Compiler;
    return Zr("stringify", i), as(e), i(e, r);
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
  use(e, ...n) {
    const r = this.attachers, i = this.namespace;
    if (qr("use", this.frozen), e != null) if (typeof e == "function")
      l(e, n);
    else if (typeof e == "object")
      Array.isArray(e) ? o(e) : s(e);
    else
      throw new TypeError("Expected usable value, not `" + e + "`");
    return this;
    function a(u) {
      if (typeof u == "function")
        l(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [c, ...d] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          l(c, d);
        } else
          s(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function s(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      o(u.plugins), u.settings && (i.settings = $r(!0, i.settings, u.settings));
    }
    function o(u) {
      let c = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++c < u.length; ) {
          const d = u[c];
          a(d);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function l(u, c) {
      let d = -1, g = -1;
      for (; ++d < r.length; )
        if (r[d][0] === u) {
          g = d;
          break;
        }
      if (g === -1)
        r.push([u, ...c]);
      else if (c.length > 0) {
        let [h, ...C] = c;
        const k = r[g][1];
        gi(k) && gi(h) && (h = $r(!0, k, h)), r[g] = [u, h, ...C];
      }
    }
  }
}
const v1 = new Fi().freeze();
function Gr(t, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + t + "` without `parser`");
}
function Zr(t, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + t + "` without `compiler`");
}
function qr(t, e) {
  if (e)
    throw new Error(
      "Cannot call `" + t + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function as(t) {
  if (!gi(t) || typeof t.type != "string")
    throw new TypeError("Expected node, got `" + t + "`");
}
function ss(t, e, n) {
  if (!n)
    throw new Error(
      "`" + t + "` finished async. Use `" + e + "` instead"
    );
}
function nr(t) {
  return R1(t) ? t : new To(t);
}
function R1(t) {
  return !!(t && typeof t == "object" && "message" in t && "messages" in t);
}
function I1(t) {
  return typeof t == "string" || N1(t);
}
function N1(t) {
  return !!(t && typeof t == "object" && "byteLength" in t && "byteOffset" in t);
}
const A1 = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", os = [], ls = { allowDangerousHtml: !0 }, M1 = /^(https?|ircs?|mailto|xmpp)$/i, O1 = [
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
function cs(t) {
  const e = L1(t), n = P1(t);
  return D1(e.runSync(e.parse(n), n), t);
}
function L1(t) {
  const e = t.rehypePlugins || os, n = t.remarkPlugins || os, r = t.remarkRehypeOptions ? { ...t.remarkRehypeOptions, ...ls } : ls;
  return v1().use(mf).use(n).use(u1, r).use(e);
}
function P1(t) {
  const e = t.children || "", n = new To();
  return typeof e == "string" ? n.value = e : ii(
    "Unexpected value `" + e + "` for `children` prop, expected `string`"
  ), n;
}
function D1(t, e) {
  const n = e.allowedElements, r = e.allowElement, i = e.components, a = e.disallowedElements, s = e.skipHtml, o = e.unwrapDisallowed, l = e.urlTransform || F1;
  for (const c of O1)
    Object.hasOwn(e, c.from) && ii(
      "Unexpected `" + c.from + "` prop, " + (c.to ? "use `" + c.to + "` instead" : "remove it") + " (see <" + A1 + "#" + c.id + "> for more info)"
    );
  return n && a && ii(
    "Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other"
  ), ko(t, u), Vd(t, {
    Fragment: Xt,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: p,
    jsxs: P,
    passKeys: !0,
    passNode: !0
  });
  function u(c, d, g) {
    if (c.type === "raw" && g && typeof d == "number")
      return s ? g.children.splice(d, 1) : g.children[d] = { type: "text", value: c.value }, d;
    if (c.type === "element") {
      let h;
      for (h in Hr)
        if (Object.hasOwn(Hr, h) && Object.hasOwn(c.properties, h)) {
          const C = c.properties[h], k = Hr[h];
          (k === null || k.includes(c.tagName)) && (c.properties[h] = l(String(C || ""), h, c));
        }
    }
    if (c.type === "element") {
      let h = n ? !n.includes(c.tagName) : a ? a.includes(c.tagName) : !1;
      if (!h && r && typeof d == "number" && (h = !r(c, d, g)), h && g && typeof d == "number")
        return o && c.children ? g.children.splice(d, 1, ...c.children) : g.children.splice(d, 1), d;
    }
  }
}
function F1(t) {
  const e = t.indexOf(":"), n = t.indexOf("?"), r = t.indexOf("#"), i = t.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    e === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && e > i || n !== -1 && e > n || r !== -1 && e > r || // It is a protocol, it should be allowed.
    M1.test(t.slice(0, e)) ? t : ""
  );
}
function H1(t) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function z1(t, e, n) {
  const i = Di({}.ignore || []), a = U1(e);
  let s = -1;
  for (; ++s < a.length; )
    xo(t, "text", o);
  function o(u, c) {
    let d = -1, g;
    for (; ++d < c.length; ) {
      const h = c[d], C = g ? g.children : void 0;
      if (i(
        h,
        C ? C.indexOf(h) : void 0,
        g
      ))
        return;
      g = h;
    }
    if (g)
      return l(u, c);
  }
  function l(u, c) {
    const d = c[c.length - 1], g = a[s][0], h = a[s][1];
    let C = 0;
    const I = d.children.indexOf(u);
    let b = !1, E = [];
    g.lastIndex = 0;
    let R = g.exec(u.value);
    for (; R; ) {
      const M = R.index, D = {
        index: R.index,
        input: R.input,
        stack: [...c, u]
      };
      let T = h(...R, D);
      if (typeof T == "string" && (T = T.length > 0 ? { type: "text", value: T } : void 0), T === !1 ? g.lastIndex = M + 1 : (C !== M && E.push({
        type: "text",
        value: u.value.slice(C, M)
      }), Array.isArray(T) ? E.push(...T) : T && E.push(T), C = M + R[0].length, b = !0), !g.global)
        break;
      R = g.exec(u.value);
    }
    return b ? (C < u.value.length && E.push({ type: "text", value: u.value.slice(C) }), d.children.splice(I, 1, ...E)) : E = [u], I + E.length;
  }
}
function U1(t) {
  const e = [];
  if (!Array.isArray(t))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const n = !t[0] || Array.isArray(t[0]) ? t : [t];
  let r = -1;
  for (; ++r < n.length; ) {
    const i = n[r];
    e.push([B1(i[0]), $1(i[1])]);
  }
  return e;
}
function B1(t) {
  return typeof t == "string" ? new RegExp(H1(t), "g") : t;
}
function $1(t) {
  return typeof t == "function" ? t : function() {
    return t;
  };
}
function j1(t) {
  z1(t, [/\r?\n|\r/g, V1]);
}
function V1() {
  return { type: "break" };
}
function us() {
  return function(t) {
    j1(t);
  };
}
function W1({ children: t, isStreaming: e }) {
  const [n, r] = ke(!0), [i, a] = ke(!1), [s, o] = ke("");
  _t.useEffect(() => {
    !e && !i ? (a(!0), r(!1)) : e && (a(!1), r(!0));
  }, [e, i]);
  const l = () => {
    e || r(!n);
  }, u = _t.Children.map(t, (c) => {
    if (_t.isValidElement(c)) {
      if (c.type === Eo) {
        const d = c.props;
        return d.title && d.title !== s && o(d.title), _t.cloneElement(
          c,
          {
            onToggle: l,
            isExpanded: n
          }
        );
      }
      if (c.type === _o)
        return _t.cloneElement(
          c,
          {
            isVisible: n,
            title: s
          }
        );
    }
    return c;
  });
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning", children: u });
}
function Eo({
  title: t,
  status: e = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const { t: a } = Yt(), s = () => /* @__PURE__ */ P(
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
            id: "mask0_64_36210",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "16",
            height: "16",
            children: /* @__PURE__ */ p("rect", { width: "16", height: "16", fill: "#D9D9D9" })
          }
        ),
        /* @__PURE__ */ p("g", { mask: "url(#mask0_64_36210)", children: /* @__PURE__ */ p(
          "path",
          {
            d: "M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z",
            fill: "#637381"
          }
        ) })
      ]
    }
  ), o = e === "completed" || t.includes(a("chat.reasoning.thinking")) || t.includes(a("chat.reasoning.processing"));
  return /* @__PURE__ */ P(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${o ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: o ? r : void 0,
      style: { cursor: o ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-icon", children: s() }),
        /* @__PURE__ */ P("span", { className: "chat-wrapper__reasoning-title", children: [
          t,
          n && e === "completed" && /* @__PURE__ */ p("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        o && /* @__PURE__ */ p(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ P(
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
            )
          }
        )
      ]
    }
  );
}
function _o({
  children: t,
  isVisible: e = !0,
  title: n = ""
}) {
  return !e || !(n.toLowerCase().includes("thinking") || n.toLowerCase().includes("thought")) ? null : /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-text", children: t }) });
}
function G1({ children: t }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle", children: t });
}
function Z1({
  title: t,
  status: e = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var u, c;
  const { t: a } = Yt(), s = () => {
    if (!r || !i) return null;
    const d = i.find((g) => g.name === r);
    return (d == null ? void 0 : d.description) || null;
  };
  let o;
  if (r != null && r.startsWith("lat_")) {
    const d = (u = n == null ? void 0 : n.parameters) == null ? void 0 : u.query, g = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.url;
    o = d || g || a("chat.tools.executing");
  } else
    o = s();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (e) {
      case "processing":
        return /* @__PURE__ */ P("div", { className: "chat-wrapper__tooling-handle-trigger-content chat-wrapper__tooling-handle-trigger-content--processing", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ p("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
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
          /* @__PURE__ */ P("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-spinner" }),
            /* @__PURE__ */ p("span", { children: a("chat.tools.executing") })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ P("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ p("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
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
          /* @__PURE__ */ P("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
              "svg",
              {
                width: "20",
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
                      children: /* @__PURE__ */ p(
                        "rect",
                        {
                          y: "0.381836",
                          width: "16",
                          height: "16",
                          fill: "#D9D9D9"
                        }
                      )
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
            /* @__PURE__ */ p("span", { children: a("chat.tools.completed") })
          ] })
        ] });
      case "error":
        return /* @__PURE__ */ P("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-error", children: /* @__PURE__ */ p(
            "svg",
            {
              width: "20",
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
          /* @__PURE__ */ p("span", { className: "chat-wrapper__tooling-handle-title", children: t })
        ] });
      default:
        return /* @__PURE__ */ P("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "mask",
                  {
                    id: "mask0_210_25142",
                    style: { maskType: "alpha" },
                    maskUnits: "userSpaceOnUse",
                    x: "0",
                    y: "0",
                    width: "16",
                    height: "16",
                    children: /* @__PURE__ */ p("rect", { width: "16", height: "16", fill: "#D9D9D9" })
                  }
                ),
                /* @__PURE__ */ p("g", { mask: "url(#mask0_210_25142)", children: /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001ZM8.00001 13.1501C8.1889 12.9612 8.37778 12.6084 8.56667 12.0918C8.75556 11.5751 8.90001 11.0112 9.00001 10.4001H7.00001C7.10001 11.0112 7.24445 11.5751 7.43334 12.0918C7.62223 12.6084 7.81112 12.9612 8.00001 13.1501ZM6.48334 12.9834C6.32778 12.6501 6.19167 12.2668 6.07501 11.8334C5.95834 11.4001 5.86112 10.9223 5.78334 10.4001H3.40001C3.72223 11.0334 4.15001 11.5751 4.68334 12.0251C5.21667 12.4751 5.81667 12.7945 6.48334 12.9834ZM9.51667 12.9834C10.1833 12.7945 10.7833 12.4751 11.3167 12.0251C11.85 11.5751 12.2778 11.0334 12.6 10.4001H10.2167C10.1389 10.9223 10.0417 11.4001 9.92501 11.8334C9.80834 12.2668 9.67223 12.6501 9.51667 12.9834ZM2.95001 9.2001H5.63334C5.61112 8.98899 5.59723 8.78065 5.59167 8.5751C5.58612 8.36954 5.58334 8.16676 5.58334 7.96676C5.58334 7.76676 5.58612 7.56954 5.59167 7.3751C5.59723 7.18065 5.61112 6.98899 5.63334 6.8001H2.95001C2.89445 7.01121 2.85556 7.21399 2.83334 7.40843C2.81112 7.60288 2.80001 7.8001 2.80001 8.0001C2.80001 8.2001 2.81112 8.39732 2.83334 8.59176C2.85556 8.78621 2.89445 8.98899 2.95001 9.2001ZM6.85001 9.2001H9.15001C9.17223 8.97788 9.18612 8.76954 9.19167 8.5751C9.19723 8.38065 9.20001 8.18899 9.20001 8.0001C9.20001 7.81121 9.19723 7.61676 9.19167 7.41676C9.18612 7.21676 9.17223 7.01121 9.15001 6.8001H6.85001C6.82778 7.01121 6.8139 7.21676 6.80834 7.41676C6.80278 7.61676 6.80001 7.81121 6.80001 8.0001C6.80001 8.18899 6.80278 8.38343 6.80834 8.58343C6.8139 8.78343 6.82778 8.98899 6.85001 9.2001ZM10.3667 9.2001H13.05C13.1056 8.98899 13.1445 8.78621 13.1667 8.59176C13.1889 8.39732 13.2 8.2001 13.2 8.0001C13.2 7.8001 13.1889 7.6001 13.1667 7.4001C13.1445 7.2001 13.1056 7.0001 13.05 6.8001H10.3667C10.3889 7.01121 10.4028 7.21954 10.4083 7.4251C10.4139 7.63065 10.4167 7.83343 10.4167 8.03343C10.4167 8.23343 10.4139 8.43065 10.4083 8.6251C10.4028 8.81954 10.3889 9.01121 10.3667 9.2001ZM10.2167 5.6001H12.6C12.2778 4.96676 11.85 4.4251 11.3167 3.9751C10.7833 3.5251 10.1833 3.20565 9.51667 3.01676C9.67223 3.3501 9.80834 3.73343 9.92501 4.16676C10.0417 4.6001 10.1389 5.07788 10.2167 5.6001ZM7.00001 5.6001H9.00001C8.90001 4.98899 8.75556 4.4251 8.56667 3.90843C8.37778 3.39176 8.1889 3.03899 8.00001 2.8501C7.81112 3.03899 7.62223 3.39176 7.43334 3.90843C7.24445 4.4251 7.10001 4.98899 7.00001 5.6001ZM3.40001 5.6001H5.78334C5.86112 5.07788 5.95834 4.6001 6.07501 4.16676C6.19167 3.73343 6.32778 3.3501 6.48334 3.01676C5.81667 3.20565 5.21667 3.5251 4.68334 3.9751C4.15001 4.4251 3.72223 4.96676 3.40001 5.6001Z",
                    fill: "#637381"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
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
          /* @__PURE__ */ P("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "20",
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
          /* @__PURE__ */ p("span", { children: a("chat.tools.executing") })
        ] });
    }
  })() });
}
const vo = gr(
  ({ registry: t, componentName: e, props: n, status: r }) => {
    const i = t == null ? void 0 : t.get(e);
    if (!i)
      return /* @__PURE__ */ p(Ro, { name: e, variant: r === "complete" ? "rehydrated" : "live" });
    const a = i.component;
    return /* @__PURE__ */ p(
      "div",
      {
        className: "chat-wrapper__generative-component",
        "data-component-name": e,
        "data-streaming": r === "streaming" ? "true" : void 0,
        children: /* @__PURE__ */ p(a, { ...n })
      }
    );
  }
);
vo.displayName = "GenerativeComponentRenderer";
const Ro = gr(
  ({ name: t, variant: e = "live" }) => e === "rehydrated" ? /* @__PURE__ */ P("div", { className: "chat-wrapper__generative-component-unknown", role: "note", children: [
    /* @__PURE__ */ p("strong", { children: "This card is no longer available." }),
    /* @__PURE__ */ p("div", { className: "chat-wrapper__generative-component-unknown-hint", children: "It was rendered in a previous conversation but the component is no longer part of this dashboard." })
  ] }) : /* @__PURE__ */ P("div", { className: "chat-wrapper__generative-component-unknown", role: "alert", children: [
    /* @__PURE__ */ p("strong", { children: "Unknown component:" }),
    " ",
    /* @__PURE__ */ p("code", { children: t }),
    /* @__PURE__ */ P("div", { className: "chat-wrapper__generative-component-unknown-hint", children: [
      "Pass ",
      /* @__PURE__ */ p("code", { children: t }),
      " in ",
      /* @__PURE__ */ p("code", { children: "generativeComponents" }),
      " on",
      " ",
      /* @__PURE__ */ p("code", { children: "<ChatWrapper />" }),
      " to render it here."
    ] })
  ] })
);
Ro.displayName = "UnknownComponentFallback";
const q1 = ({ message: t }) => {
  const [e, n] = ke(!0);
  return /* @__PURE__ */ P("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ P(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!e),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          t.role === "system" ? /* @__PURE__ */ P("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
              "svg",
              {
                width: "20",
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
            /* @__PURE__ */ p("span", { children: "AI text input <show-toolname>..." })
          ] }) : /* @__PURE__ */ p("span", { children: "System Message" }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              style: {
                transform: e ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease"
              },
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
        ]
      }
    ),
    e && /* @__PURE__ */ p("div", { className: "chat-wrapper__system-message-content", children: /* @__PURE__ */ p("span", { children: t.content }) })
  ] });
};
function Io({
  imageUrl: t,
  isOpen: e,
  onClose: n,
  alt: r = "Image preview"
}) {
  const i = ne((s) => {
    s.key === "Escape" && (s.stopImmediatePropagation(), n());
  }, [n]), a = ne((s) => {
    s.target === s.currentTarget && n();
  }, [n]);
  return Ne(() => {
    const s = document.querySelector(".chat-wrapper__messages"), o = (l) => l.preventDefault();
    return e ? (document.addEventListener("keydown", i, { capture: !0 }), document.body.style.overflow = "hidden", s && (s.style.overflowY = "hidden", s.addEventListener("wheel", o, { passive: !1 }))) : (document.removeEventListener("keydown", i, { capture: !0 }), document.body.style.overflow = "", s && (s.style.overflowY = "", s.removeEventListener("wheel", o))), () => {
      document.removeEventListener("keydown", i, { capture: !0 }), document.body.style.overflow = "", s && (s.style.overflowY = "", s.removeEventListener("wheel", o));
    };
  }, [e, i]), !e || !t ? null : zo(
    /* @__PURE__ */ P(
      "div",
      {
        className: "image-preview-modal__backdrop",
        onClick: a,
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          cursor: "zoom-out"
        },
        children: [
          /* @__PURE__ */ p(
            "button",
            {
              onClick: n,
              style: {
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
                zIndex: 1e4
              },
              onMouseEnter: (s) => {
                s.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
              },
              onMouseLeave: (s) => {
                s.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              },
              title: "Close (Esc)",
              children: "×"
            }
          ),
          /* @__PURE__ */ p(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "default"
              },
              onClick: (s) => s.stopPropagation(),
              children: /* @__PURE__ */ p(
                "img",
                {
                  src: t,
                  alt: r,
                  style: {
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                    objectFit: "contain",
                    borderRadius: "8px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    opacity: 1
                  },
                  onLoad: (s) => {
                    s.currentTarget.style.opacity = "1", s.currentTarget.style.transition = "opacity 0.2s";
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ p(
            "div",
            {
              style: {
                position: "absolute",
                bottom: "20px",
                left: "0",
                right: "0",
                width: "100%",
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "14px",
                textAlign: "center",
                pointerEvents: "none"
              },
              children: "Press Esc or click outside to close"
            }
          )
        ]
      }
    ),
    document.body
  );
}
const No = ({ className: t }) => /* @__PURE__ */ P(
  "svg",
  {
    className: `chat-wrapper__pulsating-dots${t ? ` ${t}` : ""}`,
    viewBox: "0 0 170 170",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ p("circle", { className: "chat-wrapper__pulsating-ring-bg", cx: "85", cy: "85", r: "61" }),
      /* @__PURE__ */ p("circle", { className: "chat-wrapper__pulsating-ring", cx: "85", cy: "85", r: "73", fill: "none", strokeWidth: "1" }),
      /* @__PURE__ */ p("circle", { className: "chat-wrapper__pulsating-wave chat-wrapper__pulsating-wave--1", cx: "85", cy: "85", r: "85" }),
      /* @__PURE__ */ p("circle", { className: "chat-wrapper__pulsating-wave chat-wrapper__pulsating-wave--2", cx: "85", cy: "85", r: "85" }),
      /* @__PURE__ */ p("circle", { className: "chat-wrapper__pulsating-wave chat-wrapper__pulsating-wave--3", cx: "85", cy: "85", r: "85" }),
      /* @__PURE__ */ p("circle", { className: "chat-wrapper__pulsating-wave chat-wrapper__pulsating-wave--4", cx: "85", cy: "85", r: "85" })
    ]
  }
), Ao = ({ onImageClick: t, className: e, style: n, title: r, ...i }) => {
  const [a, s] = ke(!1), o = oe(null);
  return a ? /* @__PURE__ */ P("div", { className: `chat-wrapper__image-unavailable ${e ?? ""}`, children: [
    /* @__PURE__ */ P("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
      /* @__PURE__ */ p("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
      /* @__PURE__ */ p("path", { d: "M3 15l5-5 4 4 3-3 6 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ p("line", { x1: "2", y1: "2", x2: "22", y2: "22", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
    ] }),
    /* @__PURE__ */ p("span", { children: "Image unavailable" })
  ] }) : /* @__PURE__ */ p(
    "img",
    {
      ref: o,
      className: e,
      style: n,
      title: r,
      onError: () => s(!0),
      onClick: t,
      ...i
    }
  );
}, K1 = (t) => {
  let e = t.replace(
    new RegExp("(?<!\\]\\()(?<!!.*\\]\\()https:\\/\\/ucarecdn\\.com\\/[^\\s)>]+", "g"),
    (n) => `![image](${n})`
  );
  return e = e.replace(
    new RegExp("(?<!\\]\\()(?<!!\\[.*\\]\\()(?<!\\()(https?:\\/\\/[^\\s)>]+)", "g"),
    (n) => `[${n}](${n})`
  ), e;
}, X1 = (t) => ({
  p: ({ children: e, ...n }) => /* @__PURE__ */ p("p", { className: "chat-wrapper__paragraph", ...n, children: e }),
  br: ({ ...e }) => /* @__PURE__ */ p("br", { ...e }),
  pre: ({ children: e, ...n }) => /* @__PURE__ */ p("pre", { className: "chat-wrapper__code-block", ...n, children: e }),
  code: ({ children: e, className: n, ...r }) => !n ? /* @__PURE__ */ p("code", { className: "chat-wrapper__inline-code", ...r, children: e }) : /* @__PURE__ */ p("code", { className: "chat-wrapper__code", ...r, children: e }),
  ul: ({ children: e, ...n }) => /* @__PURE__ */ p("ul", { className: "chat-wrapper__list", ...n, children: e }),
  ol: ({ children: e, ...n }) => /* @__PURE__ */ p("ol", { className: "chat-wrapper__ordered-list", ...n, children: e }),
  li: ({ children: e, ...n }) => /* @__PURE__ */ p("li", { className: "chat-wrapper__list-item", ...n, children: e }),
  a: ({ href: e, children: n, ...r }) => /* @__PURE__ */ p(
    "a",
    {
      href: e,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "chat-wrapper__link",
      ...r,
      children: n
    }
  ),
  hr: ({ ...e }) => /* @__PURE__ */ p("hr", { className: "chat-wrapper__hr", ...e }),
  img: ({ src: e, alt: n, ...r }) => /* @__PURE__ */ p(
    Ao,
    {
      src: e,
      alt: n,
      className: "chat-wrapper__media-image chat-wrapper__media-image--clickable chat-wrapper__inline-image",
      onImageClick: () => e && t(e),
      style: {
        cursor: "zoom-in",
        transition: "transform 0.2s, box-shadow 0.2s"
      },
      onMouseEnter: (i) => {
        i.currentTarget.style.transform = "scale(1.02)", i.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
      },
      onMouseLeave: (i) => {
        i.currentTarget.style.transform = "scale(1)", i.currentTarget.style.boxShadow = "";
      },
      title: "Click to view full size",
      ...r
    }
  )
}), Mo = gr(
  ({ message: t }) => {
    var W;
    const {
      getReasoningTitle: e,
      getReasoningStatus: n,
      getReasoningDuration: r,
      getReasoningContentOnly: i,
      getToolingTitle: a,
      getToolingStatus: s,
      clientTools: o,
      generativeRegistry: l,
      currentAssistantMessageIdRef: u,
      onRetryMessage: c
    } = Cn(), { t: d } = Yt(), [g, h] = ke(!1), [C, k] = ke(!1), [I, b] = ke(null), E = ne(async () => {
      try {
        await navigator.clipboard.writeText(t.content), h(!0), setTimeout(() => h(!1), 2e3);
      } catch (de) {
        console.error("Failed to copy message:", de);
      }
    }, [t.content]), R = ne(() => {
      c && c(t.id);
    }, [c, t.id]), M = ne((de) => {
      b(de);
    }, []), D = ne(() => {
      b(null);
    }, []), T = () => /* @__PURE__ */ p("div", { className: "chat-wrapper__streaming-placeholder", children: /* @__PURE__ */ p(No, {}) }), z = () => c && /* @__PURE__ */ p(
      "button",
      {
        className: "chat-wrapper__retry-button",
        onClick: R,
        children: d("chat.errors.retry")
      }
    ), U = () => /* @__PURE__ */ P(Xt, { children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ p(
        "button",
        {
          className: `chat-wrapper__copy-button ${C ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: E,
          title: "Copy message",
          children: /* @__PURE__ */ p(Wu, {})
        }
      ) }),
      g && /* @__PURE__ */ p("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), V = Ue(() => X1(M), [M]), K = () => /* @__PURE__ */ p("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ P("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
        cs,
        {
          components: V,
          remarkPlugins: [us],
          children: K1(t.content)
        },
        `${t.id}-${t.isStreaming ? "streaming" : "final"}`
      ) }),
      U()
    ] }) }), ie = () => /* @__PURE__ */ P("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
        cs,
        {
          remarkPlugins: [us],
          components: V,
          children: t.content
        },
        `${t.id}-user`
      ) }),
      t.media && t.media.length > 0 && /* @__PURE__ */ p("div", { className: "chat-wrapper__media", children: t.media.map((de, _e) => /* @__PURE__ */ p(
        Ao,
        {
          src: de,
          alt: `Uploaded content ${_e + 1}`,
          className: "chat-wrapper__media-image chat-wrapper__media-image--clickable",
          onImageClick: () => M(de),
          style: {
            cursor: "zoom-in",
            transition: "transform 0.2s, box-shadow 0.2s"
          },
          onMouseEnter: (w) => {
            w.currentTarget.style.transform = "scale(1.02)", w.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
          },
          onMouseLeave: (w) => {
            w.currentTarget.style.transform = "scale(1)", w.currentTarget.style.boxShadow = "";
          },
          title: "Click to view full size"
        },
        _e
      )) })
    ] }), B = () => t.role === "assistant" && t.isStreaming && t.content === "" && t.id === u.current ? T() : t.role === "system" ? /* @__PURE__ */ p(q1, { message: t }) : t.role === "assistant" ? K() : ie(), N = () => /* @__PURE__ */ P(W1, { isStreaming: t.isStreaming || !1, children: [
      /* @__PURE__ */ p(
        Eo,
        {
          title: e(t.content, t.isStreaming),
          status: n(t.content, t.isStreaming),
          duration: r(t.content)
        }
      ),
      /* @__PURE__ */ p(_o, { children: i(t.content) })
    ] }), L = () => {
      var de;
      return /* @__PURE__ */ p(G1, { isStreaming: t.isStreaming || !1, children: /* @__PURE__ */ p(
        Z1,
        {
          title: a(t.content, t.isStreaming),
          status: s(t.content, t.isStreaming),
          toolData: t.toolData,
          toolName: (de = t.toolData) == null ? void 0 : de.toolName,
          clientTools: o
        }
      ) });
    }, O = () => t.uiComponent ? /* @__PURE__ */ p(
      vo,
      {
        registry: l,
        componentName: t.uiComponent.name,
        props: t.uiComponent.props,
        status: t.uiComponent.status
      }
    ) : null;
    return t.role === "assistant" && !t.isStreaming && (t.content ?? "").trim() === "" && (((W = t.uiComponents) == null ? void 0 : W.length) ?? 0) > 0 ? null : /* @__PURE__ */ P(Xt, { children: [
      /* @__PURE__ */ p(
        "div",
        {
          className: `chat-wrapper__message chat-wrapper__message--${t.role === "system" ? "assistant" : t.role === "reasoning" ? "reasoning" : t.role === "tooling" ? "tooling" : t.role === "ui-component" ? "ui-component" : t.role}`,
          onMouseEnter: () => t.role === "assistant" && k(!0),
          onMouseLeave: () => t.role === "assistant" && k(!1),
          children: t.role === "reasoning" ? N() : t.role === "tooling" ? L() : t.role === "ui-component" ? O() : /* @__PURE__ */ P(Xt, { children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__message-content", children: B() }),
            t.role === "user" && t.hasError && !t.isRetrying && z()
          ] })
        }
      ),
      /* @__PURE__ */ p(
        Io,
        {
          imageUrl: I,
          isOpen: !!I,
          onClose: D,
          alt: "Message image"
        }
      )
    ] });
  }
);
Mo.displayName = "MessageItem";
const Y1 = ({ isVisible: t }) => t ? /* @__PURE__ */ p("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ p(No, {}) }) }) }) : null, Oo = jn((t, e) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = Cn();
  return /* @__PURE__ */ P("div", { className: "chat-wrapper__messages", children: [
    n.map((a) => /* @__PURE__ */ p(
      Mo,
      {
        message: a
      },
      a.id
    )),
    /* @__PURE__ */ p(Y1, { isVisible: r && !i }),
    /* @__PURE__ */ p("div", { ref: e })
  ] });
});
Oo.displayName = "MessagesList";
const vt = (...t) => t.filter(Boolean).join(" "), J1 = () => /* @__PURE__ */ P(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ P("g", { filter: "url(#filter0_dd_121_23927)", children: [
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
), Q1 = () => /* @__PURE__ */ P(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ P("g", { filter: "url(#filter0_dd_stop_121_23927)", children: [
        /* @__PURE__ */ p(
          "path",
          {
            d: "M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z",
            fill: "#3D0099",
            shapeRendering: "crispEdges"
          }
        ),
        /* @__PURE__ */ p("g", { transform: "translate(11, 11.3541)", children: /* @__PURE__ */ p("path", { d: "M21.3333 10.6667V21.3333H10.6667V10.6667H21.3333ZM24 8H8V24H24V8Z", fill: "white" }) })
      ] }),
      /* @__PURE__ */ p("defs", { children: /* @__PURE__ */ P(
        "filter",
        {
          id: "filter0_dd_stop_121_23927",
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
                result: "effect1_dropShadow_stop_121_23927"
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
                in2: "effect1_dropShadow_stop_121_23927",
                result: "effect2_dropShadow_stop_121_23927"
              }
            ),
            /* @__PURE__ */ p(
              "feBlend",
              {
                mode: "normal",
                in: "SourceGraphic",
                in2: "effect2_dropShadow_stop_121_23927",
                result: "shape"
              }
            )
          ]
        }
      ) })
    ]
  }
), eg = ({ className: t, ...e }) => /* @__PURE__ */ p("form", { className: vt("chat-wrapper__prompt-input", t), ...e }), Lo = jn(
  ({
    onChange: t,
    className: e,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...s
  }, o) => {
    const l = (u) => {
      if (u.key === "Enter") {
        if (u.shiftKey)
          return;
        u.preventDefault();
        const c = u.currentTarget.form;
        if (c) {
          const d = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          c.dispatchEvent(d);
        }
      }
      a == null || a(u);
    };
    return /* @__PURE__ */ p(
      "textarea",
      {
        ref: o,
        className: vt("chat-wrapper__prompt-textarea", e),
        name: "message",
        onChange: t,
        onKeyDown: l,
        placeholder: n,
        style: {
          minHeight: `${r}px`,
          maxHeight: `${i}px`
        },
        ...s
      }
    );
  }
);
Lo.displayName = "PromptInputTextarea";
const tg = ({
  className: t,
  ...e
}) => /* @__PURE__ */ p("div", { className: vt("chat-wrapper__prompt-toolbar", t), ...e }), ng = ({
  className: t,
  ...e
}) => /* @__PURE__ */ p("div", { className: vt("chat-wrapper__prompt-tools", t), ...e }), rg = ({
  variant: t = "ghost",
  size: e = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = e === "default" && (typeof r == "string" || _t.Children.count(r) === 1) ? "icon" : e;
  return /* @__PURE__ */ p(
    "button",
    {
      className: vt(
        "chat-wrapper__prompt-button",
        `chat-wrapper__prompt-button--${t}`,
        `chat-wrapper__prompt-button--${a}`,
        n
      ),
      type: "button",
      ...i,
      children: r
    }
  );
}, ig = ({
  className: t,
  variant: e = "default",
  size: n = "icon",
  status: r = Me.IDLE,
  children: i,
  disabled: a,
  ...s
}) => {
  const o = Kr(r);
  let l = o ? /* @__PURE__ */ p(Q1, {}) : /* @__PURE__ */ p(J1, {});
  return /* @__PURE__ */ p(
    "button",
    {
      className: vt(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${e}`,
        `chat-wrapper__prompt-submit--${n}`,
        !a && "chat-wrapper__prompt-submit--enabled",
        o && "chat-wrapper__prompt-submit--stop",
        t
      ),
      type: o ? "button" : "submit",
      disabled: a,
      ...s,
      children: i ?? l
    }
  );
}, Mg = ({
  className: t,
  children: e,
  ...n
}) => /* @__PURE__ */ p("select", { className: vt("chat-wrapper__prompt-select", t), ...n, children: e }), Og = ({
  className: t,
  children: e,
  ...n
}) => /* @__PURE__ */ p(
  "button",
  {
    className: vt("chat-wrapper__prompt-select-trigger", t),
    type: "button",
    ...n,
    children: e
  }
), Lg = ({
  className: t,
  ...e
}) => /* @__PURE__ */ p(
  "div",
  {
    className: vt("chat-wrapper__prompt-select-content", t),
    ...e
  }
), Pg = ({
  className: t,
  value: e,
  ...n
}) => /* @__PURE__ */ p(
  "div",
  {
    className: vt("chat-wrapper__prompt-select-item", t),
    "data-value": e,
    ...n
  }
), Dg = ({
  className: t,
  placeholder: e,
  ...n
}) => /* @__PURE__ */ p(
  "span",
  {
    className: vt("chat-wrapper__prompt-select-value", t),
    ...n,
    children: e
  }
), ag = ({
  placeholderTexts: t,
  shouldAnimate: e,
  className: n = ""
}) => {
  const [r, i] = ke(0), [a, s] = ke(!1), [o, l] = ke(0);
  return Ne(() => {
    if (!e || t.length <= 1) return;
    const u = setInterval(() => {
      s(!0), setTimeout(() => {
        i((c) => (c + 1) % t.length), l((c) => c + 1), s(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(u);
  }, [e, t.length]), Ne(() => {
    e || (i(0), s(!1), l(0));
  }, [e]), /* @__PURE__ */ p(
    "div",
    {
      className: `animated-placeholder-container ${n}`,
      children: /* @__PURE__ */ p(
        "span",
        {
          className: `animated-placeholder-text ${a ? "transitioning" : ""}`,
          children: t[r]
        },
        o
      )
    }
  );
}, sg = jn((t, e) => {
  const {
    placeholderTexts: n,
    isStreaming: r,
    isLoadingConversation: i,
    chatStatus: a,
    fileUploadEnabled: s,
    fileUploadConfig: o,
    chipName: l,
    chipLogo: u,
    messages: c,
    onSubmit: d,
    onFileUpload: g,
    onStopGeneration: h
  } = Cn(), { t: C } = Yt(), k = r || i, I = c.length > 0, [b, E] = ke(""), [R, M] = ke([]), [D, T] = ke([]), [z, U] = ke(null), [V, K] = ke(null), [ie, B] = ke(!1), N = oe(null), L = ne((G) => {
    K(G), B(!0);
  }, []), O = ne((G) => new Promise((y, re) => {
    const Z = new FileReader();
    Z.onload = () => y(Z.result), Z.onerror = re, Z.readAsDataURL(G);
  }), []), ee = n && n.length > 0 ? n : [C("chat.input.placeholder")], W = b.length === 0 && !I && ee.length > 1;
  hs(
    e,
    () => ({
      focus: () => {
        var G;
        (G = N.current) == null || G.focus();
      },
      setText: (G) => {
        E(G), setTimeout(() => {
          if (N.current) {
            N.current.focus();
            const y = G.length;
            N.current.setSelectionRange(y, y);
          }
        }, 0);
      },
      textareaRef: N
    }),
    []
  );
  const de = ne(
    (G) => {
      G.preventDefault();
      const re = new FormData(G.currentTarget).get("message");
      if (re != null && re.trim()) {
        const Z = Si(re.trim(), !1);
        if (!Z.trim())
          return;
        d(Z, R), E(""), M([]);
      }
    },
    [d, R]
  ), _e = ne(
    (G) => {
      const re = G.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      E(re), z && re.trim() && U(null);
    },
    [z]
  ), w = ne(
    async (G) => {
      var Z;
      const re = Array.from(((Z = G.clipboardData) == null ? void 0 : Z.items) || []).filter((se) => se.type.startsWith("image/"));
      if (re.length > 0) {
        G.preventDefault(), U(null);
        try {
          const se = await Promise.all(
            re.map((me) => {
              const X = me.getAsFile();
              return X ? new File(
                [X],
                `clipboard-image-${Date.now()}.${X.type.split("/")[1]}`,
                {
                  type: X.type
                }
              ) : null;
            })
          ).then((me) => me.filter(Boolean));
          if (se.length > 0) {
            const me = se.filter((X) => {
              const Ae = (o == null ? void 0 : o.maxFileSize) ?? 15728640;
              return X.size > Ae ? (U(
                C("chat.fileUpload.sizeLimitExceeded", {
                  maxSize: Math.round(Ae / 1048576)
                })
              ), !1) : ((o == null ? void 0 : o.allowedTypes) ?? [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp"
              ]).includes(X.type) ? !0 : (U(C("chat.fileUpload.typeNotAllowed")), !1);
            });
            if (me.length > 0) {
              const X = (o == null ? void 0 : o.maxFiles) ?? 5;
              if (R.length + D.length + me.length > X) {
                U(
                  C("chat.fileUpload.maxFilesExceeded", { maxFiles: X })
                );
                return;
              }
              const Te = me.map(async (fe) => ({
                file: fe,
                preview: await O(fe),
                isUploading: !0,
                progress: 0
              })), Ce = await Promise.all(Te);
              T((fe) => [...fe, ...Ce]);
              try {
                const fe = await g(me);
                T(
                  (Ee) => Ee.filter((xe) => !me.includes(xe.file))
                ), M((Ee) => [...Ee, ...fe]), U(null);
              } catch {
                T(
                  (Ee) => Ee.filter((xe) => !me.includes(xe.file))
                ), U(C("chat.errors.connection"));
              }
            }
          }
        } catch (se) {
          U(
            se instanceof Error ? se.message : C("chat.errors.unexpected")
          ), T([]);
        }
      }
    },
    [
      g,
      o,
      R,
      D,
      O,
      C
    ]
  ), te = ne(async () => {
    const G = document.createElement("input");
    G.type = "file", G.accept = "image/*", G.multiple = !0, G.onchange = async (y) => {
      const re = y.target.files;
      if (re)
        try {
          U(null);
          const Z = Array.from(re).filter((se) => {
            const me = dc(se.name);
            se.name;
            const X = (o == null ? void 0 : o.maxFileSize) ?? 15 * 1024 * 1024;
            return se.size > X ? (U(
              C("chat.fileUpload.sizeLimitExceeded", {
                maxSize: Math.round(X / (1024 * 1024))
              })
            ), !1) : ((o == null ? void 0 : o.allowedTypes) ?? [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ]).includes(se.type) ? !0 : (U(C("chat.fileUpload.typeNotAllowed")), !1);
          });
          if (Z.length > 0) {
            const se = (o == null ? void 0 : o.maxFiles) ?? 5;
            if (R.length + D.length + Z.length > se) {
              U(
                C("chat.fileUpload.maxFilesExceeded", { maxFiles: se })
              );
              return;
            }
            const X = Z.map(async (Te) => ({
              file: Te,
              preview: await O(Te),
              isUploading: !0,
              progress: 0
            })), Ae = await Promise.all(X);
            T((Te) => [...Te, ...Ae]);
            try {
              const Te = await g(Z);
              T(
                (Ce) => Ce.filter((fe) => !Z.includes(fe.file))
              ), M((Ce) => [...Ce, ...Te]), U(null);
            } catch {
              T(
                (Ce) => Ce.filter((fe) => !Z.includes(fe.file))
              ), U(C("chat.errors.connection"));
            }
          }
        } catch (Z) {
          U(
            Z instanceof Error ? Z.message : C("chat.errors.unexpected")
          ), T([]);
        }
    }, G.click();
  }, [
    g,
    o,
    R,
    D,
    O,
    C
  ]);
  return /* @__PURE__ */ P(
    eg,
    {
      onSubmit: de,
      className: `${k ? "chat-wrapper__prompt-input--disabled" : ""} ${R.length > 0 || D.length > 0 || z ? "chat-wrapper__prompt-input--with-media" : ""}`,
      children: [
        /* @__PURE__ */ p(
          Lo,
          {
            ref: N,
            name: "message",
            value: b,
            onChange: _e,
            onPaste: w,
            placeholder: "",
            disabled: k
          }
        ),
        !b.trim() && /* @__PURE__ */ p(
          ag,
          {
            placeholderTexts: ee,
            shouldAnimate: W
          }
        ),
        z && /* @__PURE__ */ P("div", { className: "chat-wrapper__upload-error", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__upload-error-icon", children: /* @__PURE__ */ p("span", { className: "chat-wrapper__upload-error-icon-text", children: "!" }) }),
          /* @__PURE__ */ p("span", { className: "chat-wrapper__upload-error-message", children: z }),
          /* @__PURE__ */ p(
            "button",
            {
              className: "chat-wrapper__upload-error-dismiss",
              onClick: () => U(null),
              title: "Dismiss",
              children: "×"
            }
          )
        ] }),
        (R.length > 0 || D.length > 0) && /* @__PURE__ */ P("div", { className: "chat-wrapper__media-preview-container", children: [
          D.map((G, y) => /* @__PURE__ */ P(
            "div",
            {
              className: "chat-wrapper__media-item-wrapper",
              children: [
                /* @__PURE__ */ P("div", { className: "chat-wrapper__uploading-thumbnail", children: [
                  /* @__PURE__ */ p(
                    "img",
                    {
                      src: G.preview,
                      alt: `Uploading ${y + 1}`,
                      className: "chat-wrapper__uploading-thumbnail-image"
                    }
                  ),
                  /* @__PURE__ */ p("div", { className: "chat-wrapper__uploading-overlay", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__uploading-spinner" }) })
                ] }),
                /* @__PURE__ */ p(
                  "button",
                  {
                    onClick: () => {
                      T(
                        (re) => re.filter((Z, se) => se !== y)
                      );
                    },
                    className: "chat-wrapper__media-remove-button",
                    title: "Cancel upload",
                    children: "×"
                  }
                )
              ]
            },
            `uploading-${y}`
          )),
          R.map((G, y) => {
            const re = G.startsWith("data:image/"), Z = G.startsWith("http://") || G.startsWith("https://"), se = re || Z;
            return /* @__PURE__ */ P(
              "div",
              {
                className: "chat-wrapper__media-item-wrapper",
                children: [
                  se ? /* @__PURE__ */ P(
                    "div",
                    {
                      className: "chat-wrapper__media-thumbnail",
                      onClick: () => L(G),
                      title: "Click to view full image",
                      children: [
                        /* @__PURE__ */ p(
                          "img",
                          {
                            src: G,
                            alt: `Attachment ${y + 1}`,
                            className: "chat-wrapper__media-thumbnail-image"
                          }
                        ),
                        /* @__PURE__ */ p("div", { className: "chat-wrapper__media-thumbnail-overlay" }),
                        /* @__PURE__ */ p("div", { className: "chat-wrapper__media-thumbnail-zoom-icon" })
                      ]
                    }
                  ) : /* @__PURE__ */ P("div", { className: "chat-wrapper__file-preview", children: [
                    /* @__PURE__ */ p("div", { className: "chat-wrapper__file-icon-container", children: /* @__PURE__ */ P(
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
                    ) }),
                    /* @__PURE__ */ P("div", { className: "chat-wrapper__file-info", children: [
                      /* @__PURE__ */ p("div", { className: "chat-wrapper__file-name", children: (() => {
                        const me = G.match(/name=([^;]+)/);
                        return me ? decodeURIComponent(me[1]) : "document.pdf";
                      })() }),
                      /* @__PURE__ */ p("div", { className: "chat-wrapper__file-type", children: (() => {
                        const me = G.match(/data:([^;]+)/);
                        if (me) {
                          const X = me[1];
                          switch (X) {
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
                              const Ae = X.split("/")[1];
                              return Ae ? Ae.toUpperCase().substring(0, 4) : "FILE";
                          }
                        }
                        return "FILE";
                      })() })
                    ] })
                  ] }),
                  /* @__PURE__ */ p(
                    "button",
                    {
                      onClick: () => {
                        M(
                          (me) => me.filter((X, Ae) => Ae !== y)
                        ), z && U(null);
                      },
                      className: `chat-wrapper__media-remove-button ${se ? "" : "chat-wrapper__media-remove-button--file"}`,
                      title: "Remove attachment",
                      children: "×"
                    }
                  )
                ]
              },
              `uploaded-${y}`
            );
          })
        ] }),
        /* @__PURE__ */ P(tg, { children: [
          /* @__PURE__ */ P(ng, { children: [
            s && /* @__PURE__ */ p("div", { className: "chat-wrapper__file-upload-container", children: /* @__PURE__ */ p(
              rg,
              {
                variant: "ghost",
                size: "icon",
                onClick: te,
                title: D.length > 0 ? `Uploading ${D.length} file(s)...` : R.length > 0 ? `${R.length}/${(o == null ? void 0 : o.maxFiles) ?? 5} image(s) attached` : `Attach images (max ${(o == null ? void 0 : o.maxFiles) ?? 5} files, ${Math.round(
                  ((o == null ? void 0 : o.maxFileSize) ?? 15 * 1024 * 1024) / (1024 * 1024)
                )}MB each)`,
                disabled: k || D.length > 0,
                children: /* @__PURE__ */ P(
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
                      /* @__PURE__ */ p("g", { clipPath: "url(#clip0_121_9706)", children: /* @__PURE__ */ p(
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
            ) }),
            s && l && /* @__PURE__ */ p("div", { className: "chat-wrapper__divider" }),
            l && /* @__PURE__ */ P("div", { className: "chat-wrapper__restaurant-chip", children: [
              u && /* @__PURE__ */ p(
                "img",
                {
                  src: u,
                  alt: "Chip logo",
                  className: "chat-wrapper__restaurant-logo"
                }
              ),
              /* @__PURE__ */ p("span", { className: "chat-wrapper__restaurant-name", children: l })
            ] })
          ] }),
          /* @__PURE__ */ p(
            ig,
            {
              status: a,
              disabled: Kr(a) ? !1 : !b.trim() || k || D.length > 0,
              onClick: Kr(a) && h ? () => {
                h();
              } : void 0
            }
          )
        ] }),
        /* @__PURE__ */ p(
          Io,
          {
            imageUrl: V,
            isOpen: ie,
            onClose: () => {
              B(!1), K(null);
            },
            alt: "Image preview"
          }
        )
      ]
    }
  );
}), og = () => {
  const { suggestedPrompts: t, chatInputRef: e, enableSuggestedPromptsAnimation: n = !0 } = Cn(), r = oe(!1), i = oe(null), a = oe(null);
  if (Ne(() => () => {
    i.current && cancelAnimationFrame(i.current), a.current && clearTimeout(a.current);
  }, []), !t || t.length === 0)
    return null;
  const s = ne((h) => {
    var I;
    if (r.current)
      return;
    if (!e.current) {
      console.warn("Chat input ref not available");
      return;
    }
    if (!n) {
      e.current.setText(h.description), e.current.focus();
      return;
    }
    i.current && (cancelAnimationFrame(i.current), i.current = null), a.current && (clearTimeout(a.current), a.current = null);
    const C = (I = e.current.textareaRef) == null ? void 0 : I.current;
    if (!C) {
      console.warn("Textarea ref not available, using fallback"), e.current.setText(h.description);
      return;
    }
    e.current.setText(""), C.focus(), r.current = !0;
    let k = !1;
    return h.description.length > 0 && e.current.setText(h.description[0]), a.current = setTimeout(() => {
      let b = 1;
      const E = 10, R = () => {
        if (k || !e.current) {
          r.current = !1, a.current = null;
          return;
        }
        if (b < h.description.length) {
          const M = h.description.substring(0, b + 1);
          C.value = M;
          const D = new Event("input", { bubbles: !0 });
          C.dispatchEvent(D), b++, a.current = setTimeout(R, E);
        } else
          r.current = !1, a.current = null, e.current && e.current.setText(h.description);
      };
      R();
    }, 10), () => {
      k = !0, a.current && (clearTimeout(a.current), a.current = null), r.current = !1;
    };
  }, [e, n]), o = oe(null), l = oe({ isDown: !1, startX: 0, scrollLeft: 0, hasDragged: !1 }), u = ne((h) => {
    const C = o.current;
    C && (l.current = { isDown: !0, startX: h.pageX - C.offsetLeft, scrollLeft: C.scrollLeft, hasDragged: !1 }, C.style.cursor = "grabbing", C.style.userSelect = "none");
  }, []), c = ne((h) => {
    const C = o.current;
    if (!C || !l.current.isDown) return;
    const I = h.pageX - C.offsetLeft - l.current.startX;
    Math.abs(I) > 4 && (l.current.hasDragged = !0), C.scrollLeft = l.current.scrollLeft - I;
  }, []), d = ne(() => {
    const h = o.current;
    h && (l.current.isDown = !1, h.style.cursor = "grab", h.style.userSelect = "");
  }, []), g = ne((h) => {
    l.current.hasDragged && (h.stopPropagation(), l.current.hasDragged = !1);
  }, []);
  return /* @__PURE__ */ P("div", { className: "chat-wrapper__suggested-prompts", children: [
    /* @__PURE__ */ p("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
    /* @__PURE__ */ p(
      "div",
      {
        ref: o,
        className: "chat-wrapper__suggested-prompts-grid",
        onMouseDown: u,
        onMouseMove: c,
        onMouseUp: d,
        onMouseLeave: d,
        onClickCapture: g,
        style: { cursor: "grab" },
        children: t.map((h, C) => /* @__PURE__ */ p(
          "button",
          {
            className: "chat-wrapper__suggested-prompt-card",
            onClick: () => s(h),
            title: h.description,
            children: /* @__PURE__ */ P("div", { className: "chat-wrapper__suggested-prompt-content", children: [
              /* @__PURE__ */ p("h4", { className: "chat-wrapper__suggested-prompt-title", children: h.title }),
              /* @__PURE__ */ p("p", { className: "chat-wrapper__suggested-prompt-description", children: h.description })
            ] })
          },
          C
        ))
      }
    )
  ] });
};
function lg({ size: t = 16, variant: e = "dots" }) {
  return e === "dots" ? /* @__PURE__ */ P("div", { className: "chat-wrapper__loader-dots", style: { fontSize: t }, children: [
    /* @__PURE__ */ p("span", {}),
    /* @__PURE__ */ p("span", {}),
    /* @__PURE__ */ p("span", {})
  ] }) : e === "pulse" ? /* @__PURE__ */ p(
    "div",
    {
      className: "chat-wrapper__loader-pulse",
      style: { width: t, height: t }
    }
  ) : /* @__PURE__ */ p(
    "div",
    {
      className: "chat-wrapper__loader-spinner",
      style: { width: t, height: t }
    }
  );
}
const cg = ({
  size: t = 20,
  fullHeight: e = !1
}) => /* @__PURE__ */ p(
  "div",
  {
    className: `chat-wrapper__inline-loader ${e ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ p("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ p(lg, { size: t, variant: "dots" }) })
  }
), ug = () => /* @__PURE__ */ P("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ P("g", { clipPath: "url(#clip0_1219_24100)", children: [
    /* @__PURE__ */ p("path", { d: "M19 9L20.25 6.25L23 5L20.25 3.75L19 1L17.75 3.75L15 5L17.75 6.25L19 9Z", fill: "#637381" }),
    /* @__PURE__ */ p("path", { d: "M19 15L17.75 17.75L15 19L17.75 20.25L19 23L20.25 20.25L23 19L20.25 17.75L19 15Z", fill: "#637381" }),
    /* @__PURE__ */ p("path", { d: "M11.5 9.5L9 4L6.5 9.5L1 12L6.5 14.5L9 20L11.5 14.5L17 12L11.5 9.5ZM9.99 12.99L9 15.17L8.01 12.99L5.83 12L8.01 11.01L9 8.83L9.99 11.01L12.17 12L9.99 12.99Z", fill: "#637381" })
  ] }),
  /* @__PURE__ */ p("defs", { children: /* @__PURE__ */ p("clipPath", { id: "clip0_1219_24100", children: /* @__PURE__ */ p("rect", { width: "24", height: "24", fill: "white" }) }) })
] }), ds = ({
  headerName: t,
  headerDescription: e,
  showIcon: n = !1
}) => /* @__PURE__ */ P("div", { className: "chat-wrapper__main-header", children: [
  n && /* @__PURE__ */ p("div", { className: "chat-wrapper__main-header-icon", children: /* @__PURE__ */ p(ug, {}) }),
  /* @__PURE__ */ p("h1", { className: "chat-wrapper__main-title", children: t }),
  e && /* @__PURE__ */ p("p", { className: "chat-wrapper__description", children: e })
] }), dg = () => /* @__PURE__ */ P("div", { className: "chat-wrapper__skeleton", children: [
  /* @__PURE__ */ P("div", { className: "chat-wrapper__skeleton-header", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-title" }),
    /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-description" })
  ] }),
  /* @__PURE__ */ P("div", { className: "chat-wrapper__skeleton-content", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-input", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-input-field" }) }),
    /* @__PURE__ */ P("div", { className: "chat-wrapper__skeleton-prompts", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompts-title" }),
      /* @__PURE__ */ P("div", { className: "chat-wrapper__skeleton-prompts-grid", children: [
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" })
      ] })
    ] })
  ] })
] }), hg = ({
  errorType: t = "unknown",
  errorMessage: e,
  retryCount: n = 0,
  onRetry: r,
  footer: i
}) => {
  const { t: a } = Yt(), s = () => {
    if (e)
      return {
        title: a("chat.errors.connection"),
        message: e
      };
    switch (t) {
      case "network":
        return {
          title: a("chat.errors.connection"),
          message: a("chat.errors.connection")
        };
      case "auth":
        return {
          title: a("chat.errors.authentication"),
          message: a("chat.errors.authentication")
        };
      case "server":
        return {
          title: a("chat.errors.unexpected"),
          message: a("chat.errors.unexpected")
        };
      default:
        return {
          title: a("chat.errors.unexpected"),
          message: a("chat.errors.unexpected")
        };
    }
  }, { title: o, message: l } = s();
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__connection-error-overlay", children: /* @__PURE__ */ P("div", { className: "chat-wrapper__connection-error-card", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__connection-error-icon", children: /* @__PURE__ */ P(
      "svg",
      {
        width: "48",
        height: "48",
        viewBox: "0 0 48 48",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ p("circle", { cx: "24", cy: "24", r: "20", fill: "#FEE2E2" }),
          /* @__PURE__ */ p(
            "path",
            {
              d: "M24 16V26M24 30V32",
              stroke: "#DC2626",
              strokeWidth: "3",
              strokeLinecap: "round"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ p("h3", { className: "chat-wrapper__connection-error-title", children: o }),
    /* @__PURE__ */ p("p", { className: "chat-wrapper__connection-error-message", children: l }),
    n > 0 && /* @__PURE__ */ P("p", { className: "chat-wrapper__connection-error-retry-count", children: [
      "Retry attempt: ",
      n
    ] }),
    r && /* @__PURE__ */ P(
      "button",
      {
        className: "chat-wrapper__connection-error-button",
        onClick: r,
        children: [
          /* @__PURE__ */ P(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84871 2 11.5009 2.85147 12.6 4.2",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                  }
                ),
                /* @__PURE__ */ p(
                  "path",
                  {
                    d: "M12 2V4.5H9.5",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              ]
            }
          ),
          a("chat.errors.retry")
        ]
      }
    ),
    i && /* @__PURE__ */ p("div", { className: "chat-wrapper__connection-error-footer", children: i })
  ] }) });
}, pg = () => {
  const {
    messages: t,
    isLoadingConversation: e,
    isStreaming: n,
    headerName: r,
    headerDescription: i,
    suggestedPrompts: a,
    showSuggestedPromptsOnInit: s,
    footer: o,
    messagesEndRef: l,
    chatInputRef: u,
    isOffline: c,
    connectionState: d,
    isInitialConnection: g,
    conversationError: h,
    onRetryConnection: C
  } = Cn(), k = e || t.length === 0 && (g || d === Ge.CONNECTING), I = t.length === 0 && !e && d === Ge.DISCONNECTED && !g;
  if (k || I)
    return /* @__PURE__ */ P("div", { style: { position: "relative", height: "100%" }, children: [
      /* @__PURE__ */ p(dg, {}),
      I && /* @__PURE__ */ p(
        hg,
        {
          errorType: c ? "network" : "server",
          errorMessage: h || void 0,
          onRetry: C,
          footer: o
        }
      )
    ] });
  const b = Lt.state.shouldShowMainHeader(
    t.length,
    n,
    e
  ), E = Lt.state.shouldShowSuggestedPrompts(
    t.length,
    n,
    e,
    a,
    s
  ), R = Lt.state.getContentAreaClass(
    t.length,
    n,
    e,
    E
  ), M = R.includes("compact");
  return /* @__PURE__ */ P("div", { className: `chat-wrapper__scroll-container${E ? " chat-wrapper__scroll-container--scrollable" : ""}`, children: [
    b && !M && /* @__PURE__ */ p("div", { style: c ? { paddingTop: "48px" } : void 0, children: /* @__PURE__ */ p(
      ds,
      {
        headerName: r,
        headerDescription: i,
        showIcon: !1
      }
    ) }),
    /* @__PURE__ */ P(
      "div",
      {
        className: R,
        style: c && t.length > 0 ? { paddingTop: "72px" } : void 0,
        children: [
          b && M && /* @__PURE__ */ p("div", { style: {
            flex: "1 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: c ? "48px" : void 0
          }, children: /* @__PURE__ */ p(
            ds,
            {
              headerName: r,
              headerDescription: i,
              showIcon: !0
            }
          ) }),
          !M && (e && t.length === 0 ? /* @__PURE__ */ p("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ p(cg, { fullHeight: !0 }) }) : /* @__PURE__ */ p(Oo, { ref: l })),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ p(sg, { ref: u }) })
        ]
      }
    ),
    E && /* @__PURE__ */ p(og, {}),
    E && o && /* @__PURE__ */ p("div", { children: o })
  ] });
};
function fg({
  isVisible: t,
  isReconnecting: e = !1
}) {
  const { t: n } = Yt();
  return t ? /* @__PURE__ */ p("div", { className: "network-status-banner", children: /* @__PURE__ */ p("div", { className: "network-status-banner__content", children: e ? /* @__PURE__ */ P(Xt, { children: [
    /* @__PURE__ */ p("div", { className: "network-status-banner__spinner" }),
    /* @__PURE__ */ p("span", { children: n("chat.connection.reconnecting") })
  ] }) : /* @__PURE__ */ P(Xt, { children: [
    /* @__PURE__ */ p("div", { className: "network-status-banner__icon", children: /* @__PURE__ */ p("span", { className: "network-status-banner__icon-text", children: "!" }) }),
    /* @__PURE__ */ p("span", { className: "network-status-banner__message", children: n("chat.errors.connection") })
  ] }) }) }) : null;
}
const Po = jn(
  ({
    // Authentication and entity context
    auth: t,
    // Server configuration
    chatServerUrl: e,
    chatServerKey: n,
    // Conversation configuration
    metadata: r,
    mcpHeaders: i,
    // Existing props
    config: a,
    tools: s,
    // Note: Tools are stabilized internally to prevent reconnections on re-renders
    generativeComponents: o,
    contextHelpers: l
  }, u) => {
    var _n, cn;
    const { token: c, entityId: d, entityType: g } = t;
    Lt.validation.validateAuthProps({
      userMpAuthToken: c,
      chatServerUrl: e,
      chatServerKey: n
    });
    const h = Ue(() => Lt.url.convertWebSocketToHttp(e), [e]), C = Ue(
      () => {
        var A, ge;
        return new Pu({
          apiUrl: h,
          userMpAuthToken: c,
          chatServerKey: n,
          maxFileSize: (A = a.fileUploadConfig) == null ? void 0 : A.maxFileSize,
          allowedTypes: (ge = a.fileUploadConfig) == null ? void 0 : ge.allowedTypes
        });
      },
      [h, c, n, a.fileUploadConfig]
    ), k = Ue(() => s && s.length > 0 ? s.map(({ execute: A, ...ge }) => ge) : [], [s]), I = Ue(
      () => new El(o),
      [o]
    ), b = Ue(
      () => I.getSchemas(),
      [I]
    ), E = Iu(), { isOnline: R, wasOffline: M } = Ou(), D = oe(!0), T = le((A) => A.isModalOpen), z = le((A) => A.isCollapsed), U = le((A) => A.currentMode), V = le((A) => A.openModal), K = le((A) => A.closeModal), ie = le((A) => A.toggleCollapse), B = le((A) => A.toggleFullscreen), N = le((A) => A.setCurrentMode), L = le((A) => A.chatStatus), O = le((A) => A.setChatStatus), ee = le((A) => A.streamingStatus), W = le((A) => A.setStreamingStatus), de = le(
      (A) => A.isLoadingConversation
    ), _e = le(
      (A) => A.setIsLoadingConversation
    ), w = le((A) => A.conversationError), te = le(
      (A) => A.setConversationError
    ), G = le((A) => A.setCurrentThreadId), y = le((A) => A.providerResId), re = le((A) => A.setProviderResId), Z = le((A) => A.isStreaming), se = le((A) => A.setIsStreaming), me = le((A) => A.isThinking), X = le((A) => A.setIsThinking), Ae = le((A) => A.streamingContent), Te = le(
      (A) => A.setStreamingContent
    ), Ce = le((A) => A.isHandlingTool), fe = le((A) => A.setIsHandlingTool);
    Ne(() => {
      a.mode && N(a.mode);
    }, [a.mode, N]), Ne(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const A = (ge) => {
        ge.key === "Escape" && U === "modal" && T && K();
      };
      if (U === "modal" && T)
        return document.addEventListener("keydown", A), () => document.removeEventListener("keydown", A);
    }, [U, T, K]);
    const {
      messages: Ee,
      setMessages: xe,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: Ye,
      getReasoningStatus: Ht,
      getReasoningDuration: zt,
      getReasoningContentOnly: xt,
      getReasoningTitle: Rt,
      getToolingTitle: It,
      getToolingStatus: Qt,
      handleSetMessage: an,
      handleReasoningUpdate: xn,
      handleChatFinished: Gt,
      handleChatError: Nt,
      stopGeneration: _
    } = E, v = oe(null), $ = oe(null), ue = oe(!1), we = oe(null), $e = ne(
      (A) => {
        A.status !== "streaming" && xe((ge) => {
          const ze = ge.findIndex(
            (Ie) => {
              var Be;
              return ((Be = Ie.uiComponent) == null ? void 0 : Be.callId) === A.callId;
            }
          ), He = {
            id: ze >= 0 ? ge[ze].id : A.callId,
            role: "ui-component",
            content: "",
            timestamp: ze >= 0 ? ge[ze].timestamp : /* @__PURE__ */ new Date(),
            uiComponent: {
              name: A.componentName,
              props: A.props,
              callId: A.callId,
              status: A.status
            }
          };
          if (ze >= 0) {
            const Ie = [...ge];
            return Ie[ze] = He, Ie;
          }
          return [...ge, He];
        });
      },
      [xe]
    ), yt = ne(
      (A) => {
        re(A.providerResId), G(A.threadId);
      },
      [re, G]
    ), Je = ne(
      (A) => {
        var ge, ze;
        switch (A.type) {
          case Ct.CHAT_COMPLETED:
            (ge = A.data) != null && ge.conversationId && re(A.data.conversationId), Gt(), O(Me.IDLE), W(gt.IDLE), setTimeout(() => {
              var He;
              (He = $.current) == null || He.focus();
            }, 0);
            break;
          case Ct.CHAT_ERROR:
            (ze = A.data) != null && ze.error && Nt(A.data.error);
            break;
          case Ct.CONNECTION_LOST:
            break;
          case Ct.CONNECTION_RESTORED:
            break;
          case Ct.RECONNECTING:
            break;
        }
      },
      [
        Gt,
        Nt,
        re,
        G
      ]
    ), {
      chatClient: ve,
      connectionState: De,
      // reconnectAttempts: reconnectAttempt,
      isInitialConnection: Fe,
      connectChatClient: qe
    } = Bl({
      // Authentication and server properties
      userMpAuthToken: c,
      chatServerUrl: e,
      chatServerKey: n,
      // Entity configuration
      entityId: d,
      entityType: g,
      // Tools configuration
      tools: s,
      // Generative-UI components
      componentSchemas: b,
      // Other properties
      contextHelpers: l,
      onSetMessage: an,
      onSystemEvent: Je,
      onReasoningUpdate: xn,
      onUIComponent: $e,
      onThreadCreated: yt,
      onMessagesPersisted: a.onMessagesPersisted,
      onError: a.onError
    });
    Ne(() => {
      we.current = ve;
    }, [ve]), Mu({
      metadata: r,
      chatClient: ve,
      currentProviderResId: y,
      isLoadingConversation: de,
      messages: Ee,
      entityId: d,
      entityType: g
    }), Ne(() => {
      M && R && D.current ? qe().catch((A) => {
        const ge = mn(
          A,
          "NetworkReconnection"
        );
        D.current = ge.isRetryable, ge.isRetryable || console.warn(
          `[ChatWrapper] Network reconnection failed with non-retryable error: ${ge.reason}`
        );
      }) : M && R && !D.current && console.warn(
        "[ChatWrapper] Network restored but last error was non-retryable (CORS/auth), skipping reconnection"
      );
    }, [R, M, qe]);
    const Qe = ne(() => {
      _(), O(Me.IDLE), W(gt.IDLE), ve && y && ve.stopRun(y);
    }, [
      _,
      O,
      W,
      ve,
      y
    ]);
    hs(
      u,
      () => ({
        updateMetadata: (A) => {
          ve && y && ve.updateMetadata(y, A).catch((ge) => {
          });
        }
      }),
      [ve, y]
    );
    const kn = Ue(
      () => ve ? new Du(ve, {
        onError: a.onError
      }) : null,
      [ve, a.onError]
    ), {
      resetConversationLoader: sn
      /*, reloadConversation*/
    } = Au({
      entityId: d,
      entityType: g,
      httpApiUrl: h,
      userMpAuthToken: c,
      chatServerKey: n,
      messages: Ee,
      setMessages: xe,
      setIsLoadingConversation: _e,
      setConversationError: te,
      setCurrentThreadId: G,
      setProviderResId: re,
      metadata: r,
      isConnected: De === Ge.CONNECTED,
      // Only load after connection established
      onConversationInitialized: a.onConversationInitialized ? () => {
        var A;
        ue.current = !0, (A = a.onConversationInitialized) == null || A.call(a);
      } : void 0
    }), kt = oe(null), on = ne(() => {
      kt.current && cancelAnimationFrame(kt.current), kt.current = requestAnimationFrame(() => {
        var A;
        (A = v.current) == null || A.scrollIntoView({ behavior: "smooth" }), kt.current = null;
      });
    }, []);
    Ne(() => {
      on();
    }, [Ee, on]), Ne(() => {
      Ae && on();
    }, [Ae, on]), Ne(() => {
      a.onStreamingStatusChange && a.onStreamingStatusChange(ee);
    }, [ee, a]), Ne(() => () => {
      kt.current && cancelAnimationFrame(kt.current);
    }, []), Ne(() => () => {
      xe([]), se(!1), X(!1), Te(""), fe(!1), O(Me.IDLE), W(gt.IDLE), _e(!1), te(null), G(null), re(null);
    }, [
      xe,
      se,
      X,
      Te,
      fe,
      O,
      W,
      _e,
      te,
      G,
      re
    ]);
    const Ut = ne(
      async (A, ge) => {
        if (!A.trim() || Z || !kn || !ve)
          return;
        se(!0), X(!0), O(Me.SUBMITTED), W(gt.STARTING);
        const ze = kn.createUserMessage(
          A,
          ge
        );
        if (xe((Ie) => [...Ie, ze]), a.onConversationInitialized && !ue.current && (ue.current = !0, a.onConversationInitialized()), !navigator.onLine) {
          X(!1), O(Me.ERROR), xe(
            (Ie) => Ie.map(
              (Be) => Be.id === ze.id ? {
                ...Be,
                hasError: !0,
                isRetrying: !1,
                errorMessage: "No internet connection. Please check your network and try again."
              } : Be
            )
          ), se(!1), O(Me.IDLE), W(gt.IDLE);
          return;
        }
        try {
          const Ie = new Promise((Zt, J) => {
            setTimeout(() => J(new Error("Message send timeout - connection may be lost")), 5e3);
          });
          await Promise.race([
            ve.onTriggerMessage({
              message: ze.content,
              media: ge,
              providerResId: y || void 0,
              mcpHeaders: i
            }),
            Ie
          ]), O(Me.STREAMING);
          const Be = setTimeout(() => {
            X(!1), O(Me.ERROR), xe(
              (Zt) => Zt.map(
                (J) => J.id === ze.id ? {
                  ...J,
                  hasError: !0,
                  isRetrying: !1,
                  errorMessage: "No response received. Connection may be lost."
                } : J
              )
            ), se(!1), O(Me.IDLE), W(gt.IDLE);
          }, 12e4);
          window.responseTimeoutId = Be;
        } catch (Ie) {
          X(!1), O(Me.ERROR), xe(
            (Be) => Be.map(
              (Zt) => Zt.id === ze.id ? {
                ...Zt,
                hasError: !0,
                isRetrying: !1,
                // Explicitly ensure not in retrying state
                errorMessage: De !== Ge.CONNECTED ? "Connection lost. Message not sent." : Ie instanceof Error ? Ie.message : "Failed to send message. Please try again."
              } : Zt
            )
          ), se(!1), O(Me.IDLE), W(gt.IDLE);
        }
      },
      [
        kn,
        ve,
        Z,
        De,
        xe,
        se,
        X,
        O,
        W,
        y
      ]
    ), Gn = ne(
      async (A) => await C.uploadFiles(A),
      [C]
    ), xr = Ue(
      () => Lt.css.getContainerClasses(
        U,
        a.position,
        a.theme,
        z,
        a.constrainedHeight
      ),
      [
        U,
        a.position,
        a.theme,
        z,
        a.constrainedHeight
      ]
    ), je = ne(() => {
      U === "modal" ? V() : ie();
    }, [U, V, ie]), Bt = ne(
      (A) => {
        $.current && $.current.setText(A.description);
      },
      []
    ), Zn = Ue(
      () => ({
        messages: Ee,
        isStreaming: Z,
        isThinking: me,
        isHandlingTool: Ce
      }),
      [Ee, Z, me, Ce]
    ), bn = Ue(
      () => ({
        isLoadingConversation: de,
        chatStatus: L,
        conversationError: w,
        isOffline: !R,
        connectionState: De,
        isInitialConnection: Fe
      }),
      [
        de,
        L,
        w,
        R,
        De,
        Fe
      ]
    ), ln = Ue(
      () => {
        var A, ge, ze, He;
        return {
          headerName: a.headerName,
          headerDescription: a.headerDescription,
          placeholderTexts: a.placeholderTexts,
          chipName: a.chipName,
          chipLogo: a.chipLogo,
          suggestedPrompts: a.suggestedPrompts,
          enableSuggestedPromptsAnimation: a.enableSuggestedPromptsAnimation,
          showSuggestedPromptsOnInit: a.showSuggestedPromptsOnInit ?? !0,
          // Default to true for backward compatibility
          footer: a.footer,
          clientTools: k,
          generativeRegistry: I,
          fileUploadEnabled: (A = a.features) == null ? void 0 : A.fileUpload,
          fileUploadConfig: {
            maxFiles: ((ge = a.fileUploadConfig) == null ? void 0 : ge.maxFiles) ?? 5,
            maxFileSize: ((ze = a.fileUploadConfig) == null ? void 0 : ze.maxFileSize) ?? 15 * 1024 * 1024,
            // 15MB default
            allowedTypes: ((He = a.fileUploadConfig) == null ? void 0 : He.allowedTypes) ?? [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ]
          }
        };
      },
      [
        a.headerName,
        a.headerDescription,
        a.placeholderTexts,
        a.chipName,
        a.chipLogo,
        a.suggestedPrompts,
        a.enableSuggestedPromptsAnimation,
        a.showSuggestedPromptsOnInit,
        (_n = a.features) == null ? void 0 : _n.fileUpload,
        a.fileUploadConfig,
        k,
        I
      ]
    ), Tn = Ue(
      () => ({
        getReasoningTitle: Rt,
        getReasoningStatus: Ht,
        getReasoningDuration: zt,
        getReasoningContentOnly: xt,
        getToolingTitle: It,
        getToolingStatus: Qt
      }),
      [
        Rt,
        Ht,
        zt,
        xt,
        It,
        Qt
      ]
    ), En = ne(
      async (A) => {
        const ge = Ee.find((He) => He.id === A);
        if (!ge)
          return;
        if (se(!0), X(!0), O(Me.SUBMITTED), W(gt.STARTING), xe((He) => He.map(
          (Ie) => Ie.id === A ? {
            ...Ie,
            hasError: !1,
            isRetrying: !0,
            errorMessage: void 0
          } : Ie
        )), !navigator.onLine) {
          X(!1), se(!1), O(Me.ERROR), xe(
            (He) => He.map(
              (Ie) => Ie.id === A ? {
                ...Ie,
                isRetrying: !1,
                hasError: !0,
                errorMessage: "Still no internet connection. Please check your network and try again."
              } : Ie
            )
          ), O(Me.IDLE), W(gt.IDLE);
          return;
        }
        try {
          De !== Ge.CONNECTED && await qe(), await (ve == null ? void 0 : ve.onTriggerMessage({
            message: ge.content,
            media: ge.media,
            providerResId: y || void 0,
            mcpHeaders: i
          })), O(Me.STREAMING);
          const He = setTimeout(() => {
            X(!1), O(Me.ERROR), xe(
              (Ie) => Ie.map(
                (Be) => Be.id === A ? {
                  ...Be,
                  hasError: !0,
                  isRetrying: !1,
                  errorMessage: "No response received. Connection may be lost."
                } : Be
              )
            ), se(!1), O(Me.IDLE), W(gt.IDLE);
          }, 12e4);
          window.responseTimeoutId = He;
        } catch (He) {
          X(!1), se(!1), O(Me.ERROR), W(gt.IDLE), xe(
            (Ie) => Ie.map(
              (Be) => Be.id === A ? {
                ...Be,
                isRetrying: !1,
                hasError: !0,
                errorMessage: He instanceof Error ? He.message : "Retry failed. Please try again."
              } : Be
            )
          ), O(Me.IDLE);
        }
      },
      [
        Ee,
        xe,
        sn,
        qe,
        Ut
      ]
    ), qn = ne(async () => {
      try {
        await qe();
      } catch (A) {
        console.error("Failed to reconnect:", A);
      }
    }, [qe]), pt = Ue(
      () => ({
        onSubmit: Ut,
        onFileUpload: Gn,
        onStopGeneration: Qe,
        onPromptSelect: Bt,
        onRetryMessage: En,
        onRetryConnection: qn
      }),
      [
        Ut,
        Gn,
        Qe,
        Bt,
        En,
        qn
      ]
    ), $t = Ue(
      () => ({
        ...Zn,
        ...bn,
        ...ln,
        ...Tn,
        ...pt,
        currentAssistantMessageIdRef: Ye,
        messagesEndRef: v,
        chatInputRef: $
      }),
      [
        Zn,
        bn,
        ln,
        Tn,
        pt,
        Ye,
        v,
        $
      ]
    );
    return Ue(
      () => Lt.state.shouldShowBubble(
        U,
        T,
        z
      ),
      [U, T, z]
    ) ? /* @__PURE__ */ p(ya, { children: /* @__PURE__ */ p(
      Gu,
      {
        mode: U,
        headerName: a.headerName,
        bubbleText: a.bubbleText,
        showBubbleText: ((cn = a.features) == null ? void 0 : cn.showBubbleText) !== !1,
        onClick: je
      }
    ) }) : /* @__PURE__ */ p(ya, { children: /* @__PURE__ */ p(
      zu,
      {
        onError: (A) => {
          a.onError && a.onError(A);
        },
        children: /* @__PURE__ */ P("div", { className: xr, style: a.customStyles, children: [
          /* @__PURE__ */ p(
            fg,
            {
              isVisible: !R,
              isReconnecting: De === Ge.RECONNECTING
            }
          ),
          Lt.state.shouldShowHeader(a.headerVisible) && /* @__PURE__ */ p(
            Zu,
            {
              headerName: a.headerName,
              mode: U,
              isCollapsed: z,
              isModalOpen: T,
              onClose: K,
              onToggleFullscreen: B,
              onToggleCollapse: ie
            }
          ),
          !z && /* @__PURE__ */ p(
            Uu,
            {
              onError: (A) => {
                a.onError && a.onError(A);
              },
              children: /* @__PURE__ */ p(Lu, { value: $t, children: /* @__PURE__ */ p(pg, {}) })
            }
          )
        ] })
      }
    ) });
  }
);
Po.displayName = "ChatWrapperInner";
const Do = jn(
  (t, e) => {
    const { auth: n, chatServerUrl: r, chatServerKey: i, contextHelpers: a } = t, s = (a == null ? void 0 : a.locale) || "en";
    return /* @__PURE__ */ p(
      Eu,
      {
        locale: s,
        chatServerUrl: r,
        chatServerKey: i,
        mpAuthToken: n.token,
        children: /* @__PURE__ */ p(Po, { ref: e, ...t })
      }
    );
  }
);
Do.displayName = "ChatWrapperContainer";
const Fg = gr(Do);
function Hg({
  isConnected: t,
  isConnecting: e = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 1 / 0,
  onRetry: a,
  autoHideDuration: s = 3e3
}) {
  const [o, l] = ke("hidden"), [u, c] = ke(!1);
  if (Ne(() => {
    e ? l("connecting") : !t && !n ? (c(!0), i !== 1 / 0 && r >= i ? l("error") : l("hidden")) : n ? l("reconnecting") : t && u ? (l("hidden"), c(!1)) : t && !u && l("hidden");
  }, [t, e, n, r, i, u, s]), o === "hidden")
    return null;
  const d = () => {
    a && a();
  }, h = (() => {
    switch (o) {
      case "connecting":
        return {
          icon: "🔄",
          title: "Connecting...",
          message: "Establishing connection to the server"
        };
      case "reconnecting":
        return {
          icon: "🔄",
          title: "Reconnecting...",
          message: i === 1 / 0 ? `Attempting to restore connection (${r})` : `Attempting to restore connection (${r}/${i})`
        };
      case "error":
        return {
          icon: "❌",
          title: "Connection Failed",
          message: "Unable to connect to the server. Please check your internet connection and try again."
        };
      default:
        return null;
    }
  })();
  return h ? o === "connecting" ? /* @__PURE__ */ p("div", { className: `connection-notification connection-notification--${o}`, children: /* @__PURE__ */ P("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ p("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ p("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ p("div", { className: "connection-notification__bubble" })
  ] }) }) : o === "reconnecting" ? /* @__PURE__ */ p("div", { className: `connection-notification connection-notification--banner connection-notification--${o}`, children: /* @__PURE__ */ P("div", { className: "connection-notification__banner-content", children: [
    /* @__PURE__ */ p("span", { className: "connection-notification__banner-spinner" }),
    /* @__PURE__ */ P("span", { className: "connection-notification__banner-text", children: [
      "Reconnecting... (attempt ",
      r,
      ")"
    ] })
  ] }) }) : /* @__PURE__ */ p("div", { className: `connection-notification connection-notification--${o}`, children: /* @__PURE__ */ P("div", { className: "connection-notification__content", children: [
    /* @__PURE__ */ p("div", { className: "connection-notification__icon", children: h.icon }),
    /* @__PURE__ */ p("div", { className: "connection-notification__title", children: h.title }),
    /* @__PURE__ */ p("div", { className: "connection-notification__message", children: h.message }),
    a && /* @__PURE__ */ p("div", { className: "connection-notification__actions", children: /* @__PURE__ */ p(
      "button",
      {
        className: "connection-notification__retry-btn primary",
        onClick: d,
        children: "Try Again"
      }
    ) })
  ] }) }) : null;
}
export {
  ag as AnimatedPlaceholder,
  Me as CHAT_STATUS,
  Bu as ChatIcon,
  dg as ChatSkeleton,
  Fg as ChatWrapper,
  $u as CloseIcon,
  Vu as CollapseIcon,
  El as ComponentRegistry,
  hg as ConnectionError,
  Hg as ConnectionNotification,
  Wu as CopyIcon,
  Uo as EntityType,
  ju as FullscreenIcon,
  vo as GenerativeComponentRenderer,
  cg as InlineLoader,
  lg as Loader,
  tt as PROCESSING_STATUS,
  eg as PromptInput,
  rg as PromptInputButton,
  Mg as PromptInputModelSelect,
  Lg as PromptInputModelSelectContent,
  Pg as PromptInputModelSelectItem,
  Og as PromptInputModelSelectTrigger,
  Dg as PromptInputModelSelectValue,
  ig as PromptInputSubmit,
  Lo as PromptInputTextarea,
  tg as PromptInputToolbar,
  ng as PromptInputTools,
  W1 as Reasoning,
  _o as ReasoningContent,
  Eo as ReasoningTrigger,
  gt as STREAMING_STATUS,
  Ag as SettingsIcon,
  og as SuggestedPrompts,
  Eu as TranslationProvider,
  Ro as UnknownComponentFallback,
  Fl as fetchThreadMessages,
  Ls as fetchTranslations,
  Kr as isChatActive,
  Sg as isChatError,
  wg as isChatIdle,
  xg as isProcessingActive,
  kg as isProcessingComplete,
  bg as isProcessingError,
  Hl as updateThread,
  zl as updateThreadMetadata,
  Ng as useChatActions,
  Eg as useChatState,
  _g as useConversationState,
  Rg as useI18next,
  Tg as useLayoutState,
  vg as useThreadState,
  Yt as useTranslations,
  Ig as useUIState,
  le as useUIStore
};
