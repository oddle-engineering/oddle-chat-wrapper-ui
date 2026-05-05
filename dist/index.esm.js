var Kl = Object.defineProperty;
var Yl = (t, e, n) => e in t ? Kl(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ne = (t, e, n) => Yl(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as p, jsxs as O, Fragment as Yt } from "react/jsx-runtime";
import zt, { createContext as Yr, useContext as Xr, useState as Re, useEffect as Fe, useRef as ge, useMemo as Ze, useCallback as ce, Component as oa, memo as Jr, forwardRef as Cr, useImperativeHandle as Co } from "react";
import { createPortal as Xl } from "react-dom";
const Ue = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, _t = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: ""
}, lt = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error"
}, Mi = (t) => t === Ue.SUBMITTED || t === Ue.STREAMING, _0 = (t) => t === Ue.IDLE, S0 = (t) => t === Ue.ERROR, b0 = (t) => t === lt.PROCESSING, v0 = (t) => t === lt.COMPLETED, T0 = (t) => t === lt.ERROR;
var Jl = /* @__PURE__ */ ((t) => (t.BRAND = "BRAND", t.ACCOUNT = "ACCOUNT", t.USER = "USER", t))(Jl || {}), Je = /* @__PURE__ */ ((t) => (t.DISCONNECTED = "disconnected", t.CONNECTING = "connecting", t.CONNECTED = "connected", t.RECONNECTING = "reconnecting", t))(Je || {});
const Ql = Symbol("Let zodToJsonSchema decide on which parser to use"), Aa = {
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
}, ec = (t) => typeof t == "string" ? {
  ...Aa,
  name: t
} : {
  ...Aa,
  ...t
}, tc = (t) => {
  const e = ec(t), n = e.name !== void 0 ? [...e.basePath, e.definitionPath, e.name] : e.basePath;
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
function xo(t, e, n, r) {
  r != null && r.errorMessages && n && (t.errorMessage = {
    ...t.errorMessage,
    [e]: n
  });
}
function ze(t, e, n, r, i) {
  t[e] = n, xo(t, e, r, i);
}
const ko = (t, e) => {
  let n = 0;
  for (; n < t.length && n < e.length && t[n] === e[n]; n++)
    ;
  return [(t.length - n).toString(), ...e.slice(n)].join("/");
};
var Me;
(function(t) {
  t.assertEqual = (i) => {
  };
  function e(i) {
  }
  t.assertIs = e;
  function n(i) {
    throw new Error();
  }
  t.assertNever = n, t.arrayToEnum = (i) => {
    const a = {};
    for (const s of i)
      a[s] = s;
    return a;
  }, t.getValidEnumValues = (i) => {
    const a = t.objectKeys(i).filter((o) => typeof i[i[o]] != "number"), s = {};
    for (const o of a)
      s[o] = i[o];
    return t.objectValues(s);
  }, t.objectValues = (i) => t.objectKeys(i).map(function(a) {
    return i[a];
  }), t.objectKeys = typeof Object.keys == "function" ? (i) => Object.keys(i) : (i) => {
    const a = [];
    for (const s in i)
      Object.prototype.hasOwnProperty.call(i, s) && a.push(s);
    return a;
  }, t.find = (i, a) => {
    for (const s of i)
      if (a(s))
        return s;
  }, t.isInteger = typeof Number.isInteger == "function" ? (i) => Number.isInteger(i) : (i) => typeof i == "number" && Number.isFinite(i) && Math.floor(i) === i;
  function r(i, a = " | ") {
    return i.map((s) => typeof s == "string" ? `'${s}'` : s).join(a);
  }
  t.joinValues = r, t.jsonStringifyReplacer = (i, a) => typeof a == "bigint" ? a.toString() : a;
})(Me || (Me = {}));
var Oa;
(function(t) {
  t.mergeShapes = (e, n) => ({
    ...e,
    ...n
    // second overwrites first
  });
})(Oa || (Oa = {}));
const re = Me.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), un = (t) => {
  switch (typeof t) {
    case "undefined":
      return re.undefined;
    case "string":
      return re.string;
    case "number":
      return Number.isNaN(t) ? re.nan : re.number;
    case "boolean":
      return re.boolean;
    case "function":
      return re.function;
    case "bigint":
      return re.bigint;
    case "symbol":
      return re.symbol;
    case "object":
      return Array.isArray(t) ? re.array : t === null ? re.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? re.promise : typeof Map < "u" && t instanceof Map ? re.map : typeof Set < "u" && t instanceof Set ? re.set : typeof Date < "u" && t instanceof Date ? re.date : re.object;
    default:
      return re.unknown;
  }
}, U = Me.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class rn extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (r) => {
      this.issues = [...this.issues, r];
    }, this.addIssues = (r = []) => {
      this.issues = [...this.issues, ...r];
    };
    const n = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : this.__proto__ = n, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const n = e || function(a) {
      return a.message;
    }, r = { _errors: [] }, i = (a) => {
      for (const s of a.issues)
        if (s.code === "invalid_union")
          s.unionErrors.map(i);
        else if (s.code === "invalid_return_type")
          i(s.returnTypeError);
        else if (s.code === "invalid_arguments")
          i(s.argumentsError);
        else if (s.path.length === 0)
          r._errors.push(n(s));
        else {
          let o = r, l = 0;
          for (; l < s.path.length; ) {
            const u = s.path[l];
            l === s.path.length - 1 ? (o[u] = o[u] || { _errors: [] }, o[u]._errors.push(n(s))) : o[u] = o[u] || { _errors: [] }, o = o[u], l++;
          }
        }
    };
    return i(this), r;
  }
  static assert(e) {
    if (!(e instanceof rn))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, Me.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (n) => n.message) {
    const n = {}, r = [];
    for (const i of this.issues)
      if (i.path.length > 0) {
        const a = i.path[0];
        n[a] = n[a] || [], n[a].push(e(i));
      } else
        r.push(e(i));
    return { formErrors: r, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
rn.create = (t) => new rn(t);
const Li = (t, e) => {
  let n;
  switch (t.code) {
    case U.invalid_type:
      t.received === re.undefined ? n = "Required" : n = `Expected ${t.expected}, received ${t.received}`;
      break;
    case U.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(t.expected, Me.jsonStringifyReplacer)}`;
      break;
    case U.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${Me.joinValues(t.keys, ", ")}`;
      break;
    case U.invalid_union:
      n = "Invalid input";
      break;
    case U.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${Me.joinValues(t.options)}`;
      break;
    case U.invalid_enum_value:
      n = `Invalid enum value. Expected ${Me.joinValues(t.options)}, received '${t.received}'`;
      break;
    case U.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case U.invalid_return_type:
      n = "Invalid function return type";
      break;
    case U.invalid_date:
      n = "Invalid date";
      break;
    case U.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (n = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? n = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? n = `Invalid input: must end with "${t.validation.endsWith}"` : Me.assertNever(t.validation) : t.validation !== "regex" ? n = `Invalid ${t.validation}` : n = "Invalid";
      break;
    case U.too_small:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "bigint" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : n = "Invalid input";
      break;
    case U.too_big:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? n = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : n = "Invalid input";
      break;
    case U.custom:
      n = "Invalid input";
      break;
    case U.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case U.not_multiple_of:
      n = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case U.not_finite:
      n = "Number must be finite";
      break;
    default:
      n = e.defaultError, Me.assertNever(t);
  }
  return { message: n };
};
let nc = Li;
function rc() {
  return nc;
}
const ic = (t) => {
  const { data: e, path: n, errorMaps: r, issueData: i } = t, a = [...n, ...i.path || []], s = {
    ...i,
    path: a
  };
  if (i.message !== void 0)
    return {
      ...i,
      path: a,
      message: i.message
    };
  let o = "";
  const l = r.filter((u) => !!u).slice().reverse();
  for (const u of l)
    o = u(s, { data: e, defaultError: o }).message;
  return {
    ...i,
    path: a,
    message: o
  };
};
function J(t, e) {
  const n = rc(), r = ic({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      // contextual error map is first priority
      t.schemaErrorMap,
      // then schema-bound map if available
      n,
      // then global override map
      n === Li ? void 0 : Li
      // then global default map
    ].filter((i) => !!i)
  });
  t.common.issues.push(r);
}
class bt {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, n) {
    const r = [];
    for (const i of n) {
      if (i.status === "aborted")
        return xe;
      i.status === "dirty" && e.dirty(), r.push(i.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, n) {
    const r = [];
    for (const i of n) {
      const a = await i.key, s = await i.value;
      r.push({
        key: a,
        value: s
      });
    }
    return bt.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, n) {
    const r = {};
    for (const i of n) {
      const { key: a, value: s } = i;
      if (a.status === "aborted" || s.status === "aborted")
        return xe;
      a.status === "dirty" && e.dirty(), s.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof s.value < "u" || i.alwaysSet) && (r[a.value] = s.value);
    }
    return { status: e.value, value: r };
  }
}
const xe = Object.freeze({
  status: "aborted"
}), or = (t) => ({ status: "dirty", value: t }), Mt = (t) => ({ status: "valid", value: t }), Ma = (t) => t.status === "aborted", La = (t) => t.status === "dirty", Fn = (t) => t.status === "valid", Fr = (t) => typeof Promise < "u" && t instanceof Promise;
var se;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(se || (se = {}));
class pn {
  constructor(e, n, r, i) {
    this._cachedPath = [], this.parent = e, this.data = n, this._path = r, this._key = i;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Pa = (t, e) => {
  if (Fn(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const n = new rn(t.common.issues);
      return this._error = n, this._error;
    }
  };
};
function ve(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: n, required_error: r, description: i } = t;
  if (e && (n || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: i } : { errorMap: (s, o) => {
    const { message: l } = t;
    return s.code === "invalid_enum_value" ? { message: l ?? o.defaultError } : typeof o.data > "u" ? { message: l ?? r ?? o.defaultError } : s.code !== "invalid_type" ? { message: o.defaultError } : { message: l ?? n ?? o.defaultError };
  }, description: i };
}
class Oe {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return un(e.data);
  }
  _getOrReturnCtx(e, n) {
    return n || {
      common: e.parent.common,
      data: e.data,
      parsedType: un(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new bt(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: un(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const n = this._parse(e);
    if (Fr(n))
      throw new Error("Synchronous parse encountered promise.");
    return n;
  }
  _parseAsync(e) {
    const n = this._parse(e);
    return Promise.resolve(n);
  }
  parse(e, n) {
    const r = this.safeParse(e, n);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(e, n) {
    const r = {
      common: {
        issues: [],
        async: (n == null ? void 0 : n.async) ?? !1,
        contextualErrorMap: n == null ? void 0 : n.errorMap
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: un(e)
    }, i = this._parseSync({ data: e, path: r.path, parent: r });
    return Pa(r, i);
  }
  "~validate"(e) {
    var r, i;
    const n = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: un(e)
    };
    if (!this["~standard"].async)
      try {
        const a = this._parseSync({ data: e, path: [], parent: n });
        return Fn(a) ? {
          value: a.value
        } : {
          issues: n.common.issues
        };
      } catch (a) {
        (i = (r = a == null ? void 0 : a.message) == null ? void 0 : r.toLowerCase()) != null && i.includes("encountered") && (this["~standard"].async = !0), n.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: n }).then((a) => Fn(a) ? {
      value: a.value
    } : {
      issues: n.common.issues
    });
  }
  async parseAsync(e, n) {
    const r = await this.safeParseAsync(e, n);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(e, n) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: n == null ? void 0 : n.errorMap,
        async: !0
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: un(e)
    }, i = this._parse({ data: e, path: r.path, parent: r }), a = await (Fr(i) ? i : Promise.resolve(i));
    return Pa(r, a);
  }
  refine(e, n) {
    const r = (i) => typeof n == "string" || typeof n > "u" ? { message: n } : typeof n == "function" ? n(i) : n;
    return this._refinement((i, a) => {
      const s = e(i), o = () => a.addIssue({
        code: U.custom,
        ...r(i)
      });
      return typeof Promise < "u" && s instanceof Promise ? s.then((l) => l ? !0 : (o(), !1)) : s ? !0 : (o(), !1);
    });
  }
  refinement(e, n) {
    return this._refinement((r, i) => e(r) ? !0 : (i.addIssue(typeof n == "function" ? n(r, i) : n), !1));
  }
  _refinement(e) {
    return new Hn({
      schema: this,
      typeName: B.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (n) => this["~validate"](n)
    };
  }
  optional() {
    return hn.create(this, this._def);
  }
  nullable() {
    return Un.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Xt.create(this);
  }
  promise() {
    return $r.create(this, this._def);
  }
  or(e) {
    return Hr.create([this, e], this._def);
  }
  and(e) {
    return Ur.create(this, e, this._def);
  }
  transform(e) {
    return new Hn({
      ...ve(this._def),
      schema: this,
      typeName: B.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const n = typeof e == "function" ? e : () => e;
    return new Fi({
      ...ve(this._def),
      innerType: this,
      defaultValue: n,
      typeName: B.ZodDefault
    });
  }
  brand() {
    return new Ec({
      typeName: B.ZodBranded,
      type: this,
      ...ve(this._def)
    });
  }
  catch(e) {
    const n = typeof e == "function" ? e : () => e;
    return new zi({
      ...ve(this._def),
      innerType: this,
      catchValue: n,
      typeName: B.ZodCatch
    });
  }
  describe(e) {
    const n = this.constructor;
    return new n({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return la.create(this, e);
  }
  readonly() {
    return Hi.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const ac = /^c[^\s-]{8,}$/i, sc = /^[0-9a-z]+$/, oc = /^[0-9A-HJKMNP-TV-Z]{26}$/i, lc = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, cc = /^[a-z0-9_-]{21}$/i, uc = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, dc = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, hc = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, pc = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let oi;
const fc = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, gc = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, mc = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, yc = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, wc = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Cc = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, _o = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", xc = new RegExp(`^${_o}$`);
function So(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const n = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${n}`;
}
function kc(t) {
  return new RegExp(`^${So(t)}$`);
}
function _c(t) {
  let e = `${_o}T${So(t)}`;
  const n = [];
  return n.push(t.local ? "Z?" : "Z"), t.offset && n.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${n.join("|")})`, new RegExp(`^${e}$`);
}
function Sc(t, e) {
  return !!((e === "v4" || !e) && fc.test(t) || (e === "v6" || !e) && mc.test(t));
}
function bc(t, e) {
  if (!uc.test(t))
    return !1;
  try {
    const [n] = t.split(".");
    if (!n)
      return !1;
    const r = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="), i = JSON.parse(atob(r));
    return !(typeof i != "object" || i === null || "typ" in i && (i == null ? void 0 : i.typ) !== "JWT" || !i.alg || e && i.alg !== e);
  } catch {
    return !1;
  }
}
function vc(t, e) {
  return !!((e === "v4" || !e) && gc.test(t) || (e === "v6" || !e) && yc.test(t));
}
class dn extends Oe {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== re.string) {
      const a = this._getOrReturnCtx(e);
      return J(a, {
        code: U.invalid_type,
        expected: re.string,
        received: a.parsedType
      }), xe;
    }
    const r = new bt();
    let i;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (i = this._getOrReturnCtx(e, i), J(i, {
          code: U.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (i = this._getOrReturnCtx(e, i), J(i, {
          code: U.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "length") {
        const s = e.data.length > a.value, o = e.data.length < a.value;
        (s || o) && (i = this._getOrReturnCtx(e, i), s ? J(i, {
          code: U.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : o && J(i, {
          code: U.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), r.dirty());
      } else if (a.kind === "email")
        hc.test(e.data) || (i = this._getOrReturnCtx(e, i), J(i, {
          validation: "email",
          code: U.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "emoji")
        oi || (oi = new RegExp(pc, "u")), oi.test(e.data) || (i = this._getOrReturnCtx(e, i), J(i, {
          validation: "emoji",
          code: U.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "uuid")
        lc.test(e.data) || (i = this._getOrReturnCtx(e, i), J(i, {
          validation: "uuid",
          code: U.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "nanoid")
        cc.test(e.data) || (i = this._getOrReturnCtx(e, i), J(i, {
          validation: "nanoid",
          code: U.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid")
        ac.test(e.data) || (i = this._getOrReturnCtx(e, i), J(i, {
          validation: "cuid",
          code: U.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid2")
        sc.test(e.data) || (i = this._getOrReturnCtx(e, i), J(i, {
          validation: "cuid2",
          code: U.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "ulid")
        oc.test(e.data) || (i = this._getOrReturnCtx(e, i), J(i, {
          validation: "ulid",
          code: U.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          i = this._getOrReturnCtx(e, i), J(i, {
            validation: "url",
            code: U.invalid_string,
            message: a.message
          }), r.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (i = this._getOrReturnCtx(e, i), J(i, {
        validation: "regex",
        code: U.invalid_string,
        message: a.message
      }), r.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (i = this._getOrReturnCtx(e, i), J(i, {
        code: U.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), r.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (i = this._getOrReturnCtx(e, i), J(i, {
        code: U.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (i = this._getOrReturnCtx(e, i), J(i, {
        code: U.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "datetime" ? _c(a).test(e.data) || (i = this._getOrReturnCtx(e, i), J(i, {
        code: U.invalid_string,
        validation: "datetime",
        message: a.message
      }), r.dirty()) : a.kind === "date" ? xc.test(e.data) || (i = this._getOrReturnCtx(e, i), J(i, {
        code: U.invalid_string,
        validation: "date",
        message: a.message
      }), r.dirty()) : a.kind === "time" ? kc(a).test(e.data) || (i = this._getOrReturnCtx(e, i), J(i, {
        code: U.invalid_string,
        validation: "time",
        message: a.message
      }), r.dirty()) : a.kind === "duration" ? dc.test(e.data) || (i = this._getOrReturnCtx(e, i), J(i, {
        validation: "duration",
        code: U.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "ip" ? Sc(e.data, a.version) || (i = this._getOrReturnCtx(e, i), J(i, {
        validation: "ip",
        code: U.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "jwt" ? bc(e.data, a.alg) || (i = this._getOrReturnCtx(e, i), J(i, {
        validation: "jwt",
        code: U.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "cidr" ? vc(e.data, a.version) || (i = this._getOrReturnCtx(e, i), J(i, {
        validation: "cidr",
        code: U.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "base64" ? wc.test(e.data) || (i = this._getOrReturnCtx(e, i), J(i, {
        validation: "base64",
        code: U.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "base64url" ? Cc.test(e.data) || (i = this._getOrReturnCtx(e, i), J(i, {
        validation: "base64url",
        code: U.invalid_string,
        message: a.message
      }), r.dirty()) : Me.assertNever(a);
    return { status: r.value, value: e.data };
  }
  _regex(e, n, r) {
    return this.refinement((i) => e.test(i), {
      validation: n,
      code: U.invalid_string,
      ...se.errToObj(r)
    });
  }
  _addCheck(e) {
    return new dn({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...se.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...se.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...se.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...se.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...se.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...se.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...se.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...se.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...se.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...se.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...se.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...se.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...se.errToObj(e) });
  }
  datetime(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (e == null ? void 0 : e.offset) ?? !1,
      local: (e == null ? void 0 : e.local) ?? !1,
      ...se.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...se.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...se.errToObj(e) });
  }
  regex(e, n) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...se.errToObj(n)
    });
  }
  includes(e, n) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: n == null ? void 0 : n.position,
      ...se.errToObj(n == null ? void 0 : n.message)
    });
  }
  startsWith(e, n) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...se.errToObj(n)
    });
  }
  endsWith(e, n) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...se.errToObj(n)
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...se.errToObj(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...se.errToObj(n)
    });
  }
  length(e, n) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...se.errToObj(n)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, se.errToObj(e));
  }
  trim() {
    return new dn({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new dn({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new dn({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
dn.create = (t) => new dn({
  checks: [],
  typeName: B.ZodString,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...ve(t)
});
function Tc(t, e) {
  const n = (t.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, i = n > r ? n : r, a = Number.parseInt(t.toFixed(i).replace(".", "")), s = Number.parseInt(e.toFixed(i).replace(".", ""));
  return a % s / 10 ** i;
}
class pr extends Oe {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== re.number) {
      const a = this._getOrReturnCtx(e);
      return J(a, {
        code: U.invalid_type,
        expected: re.number,
        received: a.parsedType
      }), xe;
    }
    let r;
    const i = new bt();
    for (const a of this._def.checks)
      a.kind === "int" ? Me.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), J(r, {
        code: U.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), i.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), J(r, {
        code: U.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), i.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), J(r, {
        code: U.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), i.dirty()) : a.kind === "multipleOf" ? Tc(e.data, a.value) !== 0 && (r = this._getOrReturnCtx(e, r), J(r, {
        code: U.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), i.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), J(r, {
        code: U.not_finite,
        message: a.message
      }), i.dirty()) : Me.assertNever(a);
    return { status: i.value, value: e.data };
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, se.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, se.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, se.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, se.toString(n));
  }
  setLimit(e, n, r, i) {
    return new pr({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: se.toString(i)
        }
      ]
    });
  }
  _addCheck(e) {
    return new pr({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: se.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: se.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: se.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: se.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: se.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: se.toString(n)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: se.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: se.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: se.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && Me.isInteger(e.value));
  }
  get isFinite() {
    let e = null, n = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (n === null || r.value > n) && (n = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(n) && Number.isFinite(e);
  }
}
pr.create = (t) => new pr({
  checks: [],
  typeName: B.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...ve(t)
});
class fr extends Oe {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== re.bigint)
      return this._getInvalidInput(e);
    let r;
    const i = new bt();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), J(r, {
        code: U.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), i.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), J(r, {
        code: U.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), i.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), J(r, {
        code: U.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), i.dirty()) : Me.assertNever(a);
    return { status: i.value, value: e.data };
  }
  _getInvalidInput(e) {
    const n = this._getOrReturnCtx(e);
    return J(n, {
      code: U.invalid_type,
      expected: re.bigint,
      received: n.parsedType
    }), xe;
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, se.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, se.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, se.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, se.toString(n));
  }
  setLimit(e, n, r, i) {
    return new fr({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: se.toString(i)
        }
      ]
    });
  }
  _addCheck(e) {
    return new fr({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: se.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: se.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: se.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: se.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: se.toString(n)
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
fr.create = (t) => new fr({
  checks: [],
  typeName: B.ZodBigInt,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...ve(t)
});
class Pi extends Oe {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== re.boolean) {
      const r = this._getOrReturnCtx(e);
      return J(r, {
        code: U.invalid_type,
        expected: re.boolean,
        received: r.parsedType
      }), xe;
    }
    return Mt(e.data);
  }
}
Pi.create = (t) => new Pi({
  typeName: B.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...ve(t)
});
class zr extends Oe {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== re.date) {
      const a = this._getOrReturnCtx(e);
      return J(a, {
        code: U.invalid_type,
        expected: re.date,
        received: a.parsedType
      }), xe;
    }
    if (Number.isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return J(a, {
        code: U.invalid_date
      }), xe;
    }
    const r = new bt();
    let i;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (i = this._getOrReturnCtx(e, i), J(i, {
        code: U.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), r.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (i = this._getOrReturnCtx(e, i), J(i, {
        code: U.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), r.dirty()) : Me.assertNever(a);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new zr({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: se.toString(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: se.toString(n)
    });
  }
  get minDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
}
zr.create = (t) => new zr({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: B.ZodDate,
  ...ve(t)
});
class Da extends Oe {
  _parse(e) {
    if (this._getType(e) !== re.symbol) {
      const r = this._getOrReturnCtx(e);
      return J(r, {
        code: U.invalid_type,
        expected: re.symbol,
        received: r.parsedType
      }), xe;
    }
    return Mt(e.data);
  }
}
Da.create = (t) => new Da({
  typeName: B.ZodSymbol,
  ...ve(t)
});
class Fa extends Oe {
  _parse(e) {
    if (this._getType(e) !== re.undefined) {
      const r = this._getOrReturnCtx(e);
      return J(r, {
        code: U.invalid_type,
        expected: re.undefined,
        received: r.parsedType
      }), xe;
    }
    return Mt(e.data);
  }
}
Fa.create = (t) => new Fa({
  typeName: B.ZodUndefined,
  ...ve(t)
});
class za extends Oe {
  _parse(e) {
    if (this._getType(e) !== re.null) {
      const r = this._getOrReturnCtx(e);
      return J(r, {
        code: U.invalid_type,
        expected: re.null,
        received: r.parsedType
      }), xe;
    }
    return Mt(e.data);
  }
}
za.create = (t) => new za({
  typeName: B.ZodNull,
  ...ve(t)
});
class Ha extends Oe {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return Mt(e.data);
  }
}
Ha.create = (t) => new Ha({
  typeName: B.ZodAny,
  ...ve(t)
});
class Ua extends Oe {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return Mt(e.data);
  }
}
Ua.create = (t) => new Ua({
  typeName: B.ZodUnknown,
  ...ve(t)
});
class fn extends Oe {
  _parse(e) {
    const n = this._getOrReturnCtx(e);
    return J(n, {
      code: U.invalid_type,
      expected: re.never,
      received: n.parsedType
    }), xe;
  }
}
fn.create = (t) => new fn({
  typeName: B.ZodNever,
  ...ve(t)
});
class $a extends Oe {
  _parse(e) {
    if (this._getType(e) !== re.undefined) {
      const r = this._getOrReturnCtx(e);
      return J(r, {
        code: U.invalid_type,
        expected: re.void,
        received: r.parsedType
      }), xe;
    }
    return Mt(e.data);
  }
}
$a.create = (t) => new $a({
  typeName: B.ZodVoid,
  ...ve(t)
});
class Xt extends Oe {
  _parse(e) {
    const { ctx: n, status: r } = this._processInputParams(e), i = this._def;
    if (n.parsedType !== re.array)
      return J(n, {
        code: U.invalid_type,
        expected: re.array,
        received: n.parsedType
      }), xe;
    if (i.exactLength !== null) {
      const s = n.data.length > i.exactLength.value, o = n.data.length < i.exactLength.value;
      (s || o) && (J(n, {
        code: s ? U.too_big : U.too_small,
        minimum: o ? i.exactLength.value : void 0,
        maximum: s ? i.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: i.exactLength.message
      }), r.dirty());
    }
    if (i.minLength !== null && n.data.length < i.minLength.value && (J(n, {
      code: U.too_small,
      minimum: i.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.minLength.message
    }), r.dirty()), i.maxLength !== null && n.data.length > i.maxLength.value && (J(n, {
      code: U.too_big,
      maximum: i.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.maxLength.message
    }), r.dirty()), n.common.async)
      return Promise.all([...n.data].map((s, o) => i.type._parseAsync(new pn(n, s, n.path, o)))).then((s) => bt.mergeArray(r, s));
    const a = [...n.data].map((s, o) => i.type._parseSync(new pn(n, s, n.path, o)));
    return bt.mergeArray(r, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, n) {
    return new Xt({
      ...this._def,
      minLength: { value: e, message: se.toString(n) }
    });
  }
  max(e, n) {
    return new Xt({
      ...this._def,
      maxLength: { value: e, message: se.toString(n) }
    });
  }
  length(e, n) {
    return new Xt({
      ...this._def,
      exactLength: { value: e, message: se.toString(n) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Xt.create = (t, e) => new Xt({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: B.ZodArray,
  ...ve(e)
});
function Mn(t) {
  if (t instanceof Qe) {
    const e = {};
    for (const n in t.shape) {
      const r = t.shape[n];
      e[n] = hn.create(Mn(r));
    }
    return new Qe({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof Xt ? new Xt({
    ...t._def,
    type: Mn(t.element)
  }) : t instanceof hn ? hn.create(Mn(t.unwrap())) : t instanceof Un ? Un.create(Mn(t.unwrap())) : t instanceof vn ? vn.create(t.items.map((e) => Mn(e))) : t;
}
class Qe extends Oe {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), n = Me.objectKeys(e);
    return this._cached = { shape: e, keys: n }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== re.object) {
      const u = this._getOrReturnCtx(e);
      return J(u, {
        code: U.invalid_type,
        expected: re.object,
        received: u.parsedType
      }), xe;
    }
    const { status: r, ctx: i } = this._processInputParams(e), { shape: a, keys: s } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof fn && this._def.unknownKeys === "strip"))
      for (const u in i.data)
        s.includes(u) || o.push(u);
    const l = [];
    for (const u of s) {
      const c = a[u], d = i.data[u];
      l.push({
        key: { status: "valid", value: u },
        value: c._parse(new pn(i, d, i.path, u)),
        alwaysSet: u in i.data
      });
    }
    if (this._def.catchall instanceof fn) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const c of o)
          l.push({
            key: { status: "valid", value: c },
            value: { status: "valid", value: i.data[c] }
          });
      else if (u === "strict")
        o.length > 0 && (J(i, {
          code: U.unrecognized_keys,
          keys: o
        }), r.dirty());
      else if (u !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const c of o) {
        const d = i.data[c];
        l.push({
          key: { status: "valid", value: c },
          value: u._parse(
            new pn(i, d, i.path, c)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: c in i.data
        });
      }
    }
    return i.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const c of l) {
        const d = await c.key, f = await c.value;
        u.push({
          key: d,
          value: f,
          alwaysSet: c.alwaysSet
        });
      }
      return u;
    }).then((u) => bt.mergeObjectSync(r, u)) : bt.mergeObjectSync(r, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return se.errToObj, new Qe({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (n, r) => {
          var a, s;
          const i = ((s = (a = this._def).errorMap) == null ? void 0 : s.call(a, n, r).message) ?? r.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: se.errToObj(e).message ?? i
          } : {
            message: i
          };
        }
      } : {}
    });
  }
  strip() {
    return new Qe({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new Qe({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new Qe({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new Qe({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: B.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, n) {
    return this.augment({ [e]: n });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new Qe({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const n = {};
    for (const r of Me.objectKeys(e))
      e[r] && this.shape[r] && (n[r] = this.shape[r]);
    return new Qe({
      ...this._def,
      shape: () => n
    });
  }
  omit(e) {
    const n = {};
    for (const r of Me.objectKeys(this.shape))
      e[r] || (n[r] = this.shape[r]);
    return new Qe({
      ...this._def,
      shape: () => n
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return Mn(this);
  }
  partial(e) {
    const n = {};
    for (const r of Me.objectKeys(this.shape)) {
      const i = this.shape[r];
      e && !e[r] ? n[r] = i : n[r] = i.optional();
    }
    return new Qe({
      ...this._def,
      shape: () => n
    });
  }
  required(e) {
    const n = {};
    for (const r of Me.objectKeys(this.shape))
      if (e && !e[r])
        n[r] = this.shape[r];
      else {
        let a = this.shape[r];
        for (; a instanceof hn; )
          a = a._def.innerType;
        n[r] = a;
      }
    return new Qe({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return bo(Me.objectKeys(this.shape));
  }
}
Qe.create = (t, e) => new Qe({
  shape: () => t,
  unknownKeys: "strip",
  catchall: fn.create(),
  typeName: B.ZodObject,
  ...ve(e)
});
Qe.strictCreate = (t, e) => new Qe({
  shape: () => t,
  unknownKeys: "strict",
  catchall: fn.create(),
  typeName: B.ZodObject,
  ...ve(e)
});
Qe.lazycreate = (t, e) => new Qe({
  shape: t,
  unknownKeys: "strip",
  catchall: fn.create(),
  typeName: B.ZodObject,
  ...ve(e)
});
class Hr extends Oe {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = this._def.options;
    function i(a) {
      for (const o of a)
        if (o.result.status === "valid")
          return o.result;
      for (const o of a)
        if (o.result.status === "dirty")
          return n.common.issues.push(...o.ctx.common.issues), o.result;
      const s = a.map((o) => new rn(o.ctx.common.issues));
      return J(n, {
        code: U.invalid_union,
        unionErrors: s
      }), xe;
    }
    if (n.common.async)
      return Promise.all(r.map(async (a) => {
        const s = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: n.data,
            path: n.path,
            parent: s
          }),
          ctx: s
        };
      })).then(i);
    {
      let a;
      const s = [];
      for (const l of r) {
        const u = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        }, c = l._parseSync({
          data: n.data,
          path: n.path,
          parent: u
        });
        if (c.status === "valid")
          return c;
        c.status === "dirty" && !a && (a = { result: c, ctx: u }), u.common.issues.length && s.push(u.common.issues);
      }
      if (a)
        return n.common.issues.push(...a.ctx.common.issues), a.result;
      const o = s.map((l) => new rn(l));
      return J(n, {
        code: U.invalid_union,
        unionErrors: o
      }), xe;
    }
  }
  get options() {
    return this._def.options;
  }
}
Hr.create = (t, e) => new Hr({
  options: t,
  typeName: B.ZodUnion,
  ...ve(e)
});
function Di(t, e) {
  const n = un(t), r = un(e);
  if (t === e)
    return { valid: !0, data: t };
  if (n === re.object && r === re.object) {
    const i = Me.objectKeys(e), a = Me.objectKeys(t).filter((o) => i.indexOf(o) !== -1), s = { ...t, ...e };
    for (const o of a) {
      const l = Di(t[o], e[o]);
      if (!l.valid)
        return { valid: !1 };
      s[o] = l.data;
    }
    return { valid: !0, data: s };
  } else if (n === re.array && r === re.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const i = [];
    for (let a = 0; a < t.length; a++) {
      const s = t[a], o = e[a], l = Di(s, o);
      if (!l.valid)
        return { valid: !1 };
      i.push(l.data);
    }
    return { valid: !0, data: i };
  } else return n === re.date && r === re.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class Ur extends Oe {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), i = (a, s) => {
      if (Ma(a) || Ma(s))
        return xe;
      const o = Di(a.value, s.value);
      return o.valid ? ((La(a) || La(s)) && n.dirty(), { status: n.value, value: o.data }) : (J(r, {
        code: U.invalid_intersection_types
      }), xe);
    };
    return r.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }),
      this._def.right._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      })
    ]).then(([a, s]) => i(a, s)) : i(this._def.left._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }), this._def.right._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }));
  }
}
Ur.create = (t, e, n) => new Ur({
  left: t,
  right: e,
  typeName: B.ZodIntersection,
  ...ve(n)
});
class vn extends Oe {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== re.array)
      return J(r, {
        code: U.invalid_type,
        expected: re.array,
        received: r.parsedType
      }), xe;
    if (r.data.length < this._def.items.length)
      return J(r, {
        code: U.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), xe;
    !this._def.rest && r.data.length > this._def.items.length && (J(r, {
      code: U.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const a = [...r.data].map((s, o) => {
      const l = this._def.items[o] || this._def.rest;
      return l ? l._parse(new pn(r, s, r.path, o)) : null;
    }).filter((s) => !!s);
    return r.common.async ? Promise.all(a).then((s) => bt.mergeArray(n, s)) : bt.mergeArray(n, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new vn({
      ...this._def,
      rest: e
    });
  }
}
vn.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new vn({
    items: t,
    typeName: B.ZodTuple,
    rest: null,
    ...ve(e)
  });
};
class Ba extends Oe {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== re.map)
      return J(r, {
        code: U.invalid_type,
        expected: re.map,
        received: r.parsedType
      }), xe;
    const i = this._def.keyType, a = this._def.valueType, s = [...r.data.entries()].map(([o, l], u) => ({
      key: i._parse(new pn(r, o, r.path, [u, "key"])),
      value: a._parse(new pn(r, l, r.path, [u, "value"]))
    }));
    if (r.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const l of s) {
          const u = await l.key, c = await l.value;
          if (u.status === "aborted" || c.status === "aborted")
            return xe;
          (u.status === "dirty" || c.status === "dirty") && n.dirty(), o.set(u.value, c.value);
        }
        return { status: n.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const l of s) {
        const u = l.key, c = l.value;
        if (u.status === "aborted" || c.status === "aborted")
          return xe;
        (u.status === "dirty" || c.status === "dirty") && n.dirty(), o.set(u.value, c.value);
      }
      return { status: n.value, value: o };
    }
  }
}
Ba.create = (t, e, n) => new Ba({
  valueType: e,
  keyType: t,
  typeName: B.ZodMap,
  ...ve(n)
});
class gr extends Oe {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== re.set)
      return J(r, {
        code: U.invalid_type,
        expected: re.set,
        received: r.parsedType
      }), xe;
    const i = this._def;
    i.minSize !== null && r.data.size < i.minSize.value && (J(r, {
      code: U.too_small,
      minimum: i.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.minSize.message
    }), n.dirty()), i.maxSize !== null && r.data.size > i.maxSize.value && (J(r, {
      code: U.too_big,
      maximum: i.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.maxSize.message
    }), n.dirty());
    const a = this._def.valueType;
    function s(l) {
      const u = /* @__PURE__ */ new Set();
      for (const c of l) {
        if (c.status === "aborted")
          return xe;
        c.status === "dirty" && n.dirty(), u.add(c.value);
      }
      return { status: n.value, value: u };
    }
    const o = [...r.data.values()].map((l, u) => a._parse(new pn(r, l, r.path, u)));
    return r.common.async ? Promise.all(o).then((l) => s(l)) : s(o);
  }
  min(e, n) {
    return new gr({
      ...this._def,
      minSize: { value: e, message: se.toString(n) }
    });
  }
  max(e, n) {
    return new gr({
      ...this._def,
      maxSize: { value: e, message: se.toString(n) }
    });
  }
  size(e, n) {
    return this.min(e, n).max(e, n);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
gr.create = (t, e) => new gr({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: B.ZodSet,
  ...ve(e)
});
class ja extends Oe {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
ja.create = (t, e) => new ja({
  getter: t,
  typeName: B.ZodLazy,
  ...ve(e)
});
class Va extends Oe {
  _parse(e) {
    if (e.data !== this._def.value) {
      const n = this._getOrReturnCtx(e);
      return J(n, {
        received: n.data,
        code: U.invalid_literal,
        expected: this._def.value
      }), xe;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Va.create = (t, e) => new Va({
  value: t,
  typeName: B.ZodLiteral,
  ...ve(e)
});
function bo(t, e) {
  return new zn({
    values: t,
    typeName: B.ZodEnum,
    ...ve(e)
  });
}
class zn extends Oe {
  _parse(e) {
    if (typeof e.data != "string") {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return J(n, {
        expected: Me.joinValues(r),
        received: n.parsedType,
        code: U.invalid_type
      }), xe;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return J(n, {
        received: n.data,
        code: U.invalid_enum_value,
        options: r
      }), xe;
    }
    return Mt(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  get Values() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  get Enum() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  extract(e, n = this._def) {
    return zn.create(e, {
      ...this._def,
      ...n
    });
  }
  exclude(e, n = this._def) {
    return zn.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...n
    });
  }
}
zn.create = bo;
class Za extends Oe {
  _parse(e) {
    const n = Me.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== re.string && r.parsedType !== re.number) {
      const i = Me.objectValues(n);
      return J(r, {
        expected: Me.joinValues(i),
        received: r.parsedType,
        code: U.invalid_type
      }), xe;
    }
    if (this._cache || (this._cache = new Set(Me.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const i = Me.objectValues(n);
      return J(r, {
        received: r.data,
        code: U.invalid_enum_value,
        options: i
      }), xe;
    }
    return Mt(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Za.create = (t, e) => new Za({
  values: t,
  typeName: B.ZodNativeEnum,
  ...ve(e)
});
class $r extends Oe {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== re.promise && n.common.async === !1)
      return J(n, {
        code: U.invalid_type,
        expected: re.promise,
        received: n.parsedType
      }), xe;
    const r = n.parsedType === re.promise ? n.data : Promise.resolve(n.data);
    return Mt(r.then((i) => this._def.type.parseAsync(i, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
$r.create = (t, e) => new $r({
  type: t,
  typeName: B.ZodPromise,
  ...ve(e)
});
class Hn extends Oe {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === B.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), i = this._def.effect || null, a = {
      addIssue: (s) => {
        J(r, s), s.fatal ? n.abort() : n.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), i.type === "preprocess") {
      const s = i.transform(r.data, a);
      if (r.common.async)
        return Promise.resolve(s).then(async (o) => {
          if (n.value === "aborted")
            return xe;
          const l = await this._def.schema._parseAsync({
            data: o,
            path: r.path,
            parent: r
          });
          return l.status === "aborted" ? xe : l.status === "dirty" || n.value === "dirty" ? or(l.value) : l;
        });
      {
        if (n.value === "aborted")
          return xe;
        const o = this._def.schema._parseSync({
          data: s,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? xe : o.status === "dirty" || n.value === "dirty" ? or(o.value) : o;
      }
    }
    if (i.type === "refinement") {
      const s = (o) => {
        const l = i.refinement(o, a);
        if (r.common.async)
          return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? xe : (o.status === "dirty" && n.dirty(), s(o.value), { status: n.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => o.status === "aborted" ? xe : (o.status === "dirty" && n.dirty(), s(o.value).then(() => ({ status: n.value, value: o.value }))));
    }
    if (i.type === "transform")
      if (r.common.async === !1) {
        const s = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!Fn(s))
          return xe;
        const o = i.transform(s.value, a);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((s) => Fn(s) ? Promise.resolve(i.transform(s.value, a)).then((o) => ({
          status: n.value,
          value: o
        })) : xe);
    Me.assertNever(i);
  }
}
Hn.create = (t, e, n) => new Hn({
  schema: t,
  typeName: B.ZodEffects,
  effect: e,
  ...ve(n)
});
Hn.createWithPreprocess = (t, e, n) => new Hn({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: B.ZodEffects,
  ...ve(n)
});
class hn extends Oe {
  _parse(e) {
    return this._getType(e) === re.undefined ? Mt(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
hn.create = (t, e) => new hn({
  innerType: t,
  typeName: B.ZodOptional,
  ...ve(e)
});
class Un extends Oe {
  _parse(e) {
    return this._getType(e) === re.null ? Mt(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Un.create = (t, e) => new Un({
  innerType: t,
  typeName: B.ZodNullable,
  ...ve(e)
});
class Fi extends Oe {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    let r = n.data;
    return n.parsedType === re.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Fi.create = (t, e) => new Fi({
  innerType: t,
  typeName: B.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...ve(e)
});
class zi extends Oe {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = {
      ...n,
      common: {
        ...n.common,
        issues: []
      }
    }, i = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return Fr(i) ? i.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new rn(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new rn(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
zi.create = (t, e) => new zi({
  innerType: t,
  typeName: B.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...ve(e)
});
class Wa extends Oe {
  _parse(e) {
    if (this._getType(e) !== re.nan) {
      const r = this._getOrReturnCtx(e);
      return J(r, {
        code: U.invalid_type,
        expected: re.nan,
        received: r.parsedType
      }), xe;
    }
    return { status: "valid", value: e.data };
  }
}
Wa.create = (t) => new Wa({
  typeName: B.ZodNaN,
  ...ve(t)
});
class Ec extends Oe {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = n.data;
    return this._def.type._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class la extends Oe {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? xe : a.status === "dirty" ? (n.dirty(), or(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const i = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return i.status === "aborted" ? xe : i.status === "dirty" ? (n.dirty(), {
        status: "dirty",
        value: i.value
      }) : this._def.out._parseSync({
        data: i.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, n) {
    return new la({
      in: e,
      out: n,
      typeName: B.ZodPipeline
    });
  }
}
class Hi extends Oe {
  _parse(e) {
    const n = this._def.innerType._parse(e), r = (i) => (Fn(i) && (i.value = Object.freeze(i.value)), i);
    return Fr(n) ? n.then((i) => r(i)) : r(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Hi.create = (t, e) => new Hi({
  innerType: t,
  typeName: B.ZodReadonly,
  ...ve(e)
});
var B;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(B || (B = {}));
const bn = dn.create, Rc = Pi.create;
fn.create;
const vo = Xt.create, ca = Qe.create;
Hr.create;
Ur.create;
vn.create;
const Ic = zn.create;
$r.create;
hn.create;
Un.create;
function wt(t) {
  if (t.target !== "openAi")
    return {};
  const e = [
    ...t.basePath,
    t.definitionPath,
    t.openAiAnyTypeName
  ];
  return t.flags.hasReferencedOpenAiAnyType = !0, {
    $ref: t.$refStrategy === "relative" ? ko(e, t.currentPath) : e.join("/")
  };
}
function Nc(t, e) {
  var r, i, a;
  const n = {
    type: "array"
  };
  return (r = t.type) != null && r._def && ((a = (i = t.type) == null ? void 0 : i._def) == null ? void 0 : a.typeName) !== B.ZodAny && (n.items = Pe(t.type._def, {
    ...e,
    currentPath: [...e.currentPath, "items"]
  })), t.minLength && ze(n, "minItems", t.minLength.value, t.minLength.message, e), t.maxLength && ze(n, "maxItems", t.maxLength.value, t.maxLength.message, e), t.exactLength && (ze(n, "minItems", t.exactLength.value, t.exactLength.message, e), ze(n, "maxItems", t.exactLength.value, t.exactLength.message, e)), n;
}
function Ac(t, e) {
  const n = {
    type: "integer",
    format: "int64"
  };
  if (!t.checks)
    return n;
  for (const r of t.checks)
    switch (r.kind) {
      case "min":
        e.target === "jsonSchema7" ? r.inclusive ? ze(n, "minimum", r.value, r.message, e) : ze(n, "exclusiveMinimum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMinimum = !0), ze(n, "minimum", r.value, r.message, e));
        break;
      case "max":
        e.target === "jsonSchema7" ? r.inclusive ? ze(n, "maximum", r.value, r.message, e) : ze(n, "exclusiveMaximum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMaximum = !0), ze(n, "maximum", r.value, r.message, e));
        break;
      case "multipleOf":
        ze(n, "multipleOf", r.value, r.message, e);
        break;
    }
  return n;
}
function Oc() {
  return {
    type: "boolean"
  };
}
function To(t, e) {
  return Pe(t.type._def, e);
}
const Mc = (t, e) => Pe(t.innerType._def, e);
function Eo(t, e, n) {
  const r = n ?? e.dateStrategy;
  if (Array.isArray(r))
    return {
      anyOf: r.map((i, a) => Eo(t, e, i))
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
      return Lc(t, e);
  }
}
const Lc = (t, e) => {
  const n = {
    type: "integer",
    format: "unix-time"
  };
  if (e.target === "openApi3")
    return n;
  for (const r of t.checks)
    switch (r.kind) {
      case "min":
        ze(
          n,
          "minimum",
          r.value,
          // This is in milliseconds
          r.message,
          e
        );
        break;
      case "max":
        ze(
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
function Pc(t, e) {
  return {
    ...Pe(t.innerType._def, e),
    default: t.defaultValue()
  };
}
function Dc(t, e) {
  return e.effectStrategy === "input" ? Pe(t.schema._def, e) : wt(e);
}
function Fc(t) {
  return {
    type: "string",
    enum: Array.from(t.values)
  };
}
const zc = (t) => "type" in t && t.type === "string" ? !1 : "allOf" in t;
function Hc(t, e) {
  const n = [
    Pe(t.left._def, {
      ...e,
      currentPath: [...e.currentPath, "allOf", "0"]
    }),
    Pe(t.right._def, {
      ...e,
      currentPath: [...e.currentPath, "allOf", "1"]
    })
  ].filter((a) => !!a);
  let r = e.target === "jsonSchema2019-09" ? { unevaluatedProperties: !1 } : void 0;
  const i = [];
  return n.forEach((a) => {
    if (zc(a))
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
function Uc(t, e) {
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
let li;
const Pt = {
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
  emoji: () => (li === void 0 && (li = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), li),
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
function Ro(t, e) {
  const n = {
    type: "string"
  };
  if (t.checks)
    for (const r of t.checks)
      switch (r.kind) {
        case "min":
          ze(n, "minLength", typeof n.minLength == "number" ? Math.max(n.minLength, r.value) : r.value, r.message, e);
          break;
        case "max":
          ze(n, "maxLength", typeof n.maxLength == "number" ? Math.min(n.maxLength, r.value) : r.value, r.message, e);
          break;
        case "email":
          switch (e.emailStrategy) {
            case "format:email":
              Dt(n, "email", r.message, e);
              break;
            case "format:idn-email":
              Dt(n, "idn-email", r.message, e);
              break;
            case "pattern:zod":
              ut(n, Pt.email, r.message, e);
              break;
          }
          break;
        case "url":
          Dt(n, "uri", r.message, e);
          break;
        case "uuid":
          Dt(n, "uuid", r.message, e);
          break;
        case "regex":
          ut(n, r.regex, r.message, e);
          break;
        case "cuid":
          ut(n, Pt.cuid, r.message, e);
          break;
        case "cuid2":
          ut(n, Pt.cuid2, r.message, e);
          break;
        case "startsWith":
          ut(n, RegExp(`^${ci(r.value, e)}`), r.message, e);
          break;
        case "endsWith":
          ut(n, RegExp(`${ci(r.value, e)}$`), r.message, e);
          break;
        case "datetime":
          Dt(n, "date-time", r.message, e);
          break;
        case "date":
          Dt(n, "date", r.message, e);
          break;
        case "time":
          Dt(n, "time", r.message, e);
          break;
        case "duration":
          Dt(n, "duration", r.message, e);
          break;
        case "length":
          ze(n, "minLength", typeof n.minLength == "number" ? Math.max(n.minLength, r.value) : r.value, r.message, e), ze(n, "maxLength", typeof n.maxLength == "number" ? Math.min(n.maxLength, r.value) : r.value, r.message, e);
          break;
        case "includes": {
          ut(n, RegExp(ci(r.value, e)), r.message, e);
          break;
        }
        case "ip": {
          r.version !== "v6" && Dt(n, "ipv4", r.message, e), r.version !== "v4" && Dt(n, "ipv6", r.message, e);
          break;
        }
        case "base64url":
          ut(n, Pt.base64url, r.message, e);
          break;
        case "jwt":
          ut(n, Pt.jwt, r.message, e);
          break;
        case "cidr": {
          r.version !== "v6" && ut(n, Pt.ipv4Cidr, r.message, e), r.version !== "v4" && ut(n, Pt.ipv6Cidr, r.message, e);
          break;
        }
        case "emoji":
          ut(n, Pt.emoji(), r.message, e);
          break;
        case "ulid": {
          ut(n, Pt.ulid, r.message, e);
          break;
        }
        case "base64": {
          switch (e.base64Strategy) {
            case "format:binary": {
              Dt(n, "binary", r.message, e);
              break;
            }
            case "contentEncoding:base64": {
              ze(n, "contentEncoding", "base64", r.message, e);
              break;
            }
            case "pattern:zod": {
              ut(n, Pt.base64, r.message, e);
              break;
            }
          }
          break;
        }
        case "nanoid":
          ut(n, Pt.nanoid, r.message, e);
      }
  return n;
}
function ci(t, e) {
  return e.patternStrategy === "escape" ? Bc(t) : t;
}
const $c = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function Bc(t) {
  let e = "";
  for (let n = 0; n < t.length; n++)
    $c.has(t[n]) || (e += "\\"), e += t[n];
  return e;
}
function Dt(t, e, n, r) {
  var i;
  t.format || (i = t.anyOf) != null && i.some((a) => a.format) ? (t.anyOf || (t.anyOf = []), t.format && (t.anyOf.push({
    format: t.format,
    ...t.errorMessage && r.errorMessages && {
      errorMessage: { format: t.errorMessage.format }
    }
  }), delete t.format, t.errorMessage && (delete t.errorMessage.format, Object.keys(t.errorMessage).length === 0 && delete t.errorMessage)), t.anyOf.push({
    format: e,
    ...n && r.errorMessages && { errorMessage: { format: n } }
  })) : ze(t, "format", e, n, r);
}
function ut(t, e, n, r) {
  var i;
  t.pattern || (i = t.allOf) != null && i.some((a) => a.pattern) ? (t.allOf || (t.allOf = []), t.pattern && (t.allOf.push({
    pattern: t.pattern,
    ...t.errorMessage && r.errorMessages && {
      errorMessage: { pattern: t.errorMessage.pattern }
    }
  }), delete t.pattern, t.errorMessage && (delete t.errorMessage.pattern, Object.keys(t.errorMessage).length === 0 && delete t.errorMessage)), t.allOf.push({
    pattern: Ga(e, r),
    ...n && r.errorMessages && { errorMessage: { pattern: n } }
  })) : ze(t, "pattern", Ga(e, r), n, r);
}
function Ga(t, e) {
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
function Io(t, e) {
  var r, i, a, s, o, l;
  if (e.target === "openAi" && console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead."), e.target === "openApi3" && ((r = t.keyType) == null ? void 0 : r._def.typeName) === B.ZodEnum)
    return {
      type: "object",
      required: t.keyType._def.values,
      properties: t.keyType._def.values.reduce((u, c) => ({
        ...u,
        [c]: Pe(t.valueType._def, {
          ...e,
          currentPath: [...e.currentPath, "properties", c]
        }) ?? wt(e)
      }), {}),
      additionalProperties: e.rejectedAdditionalProperties
    };
  const n = {
    type: "object",
    additionalProperties: Pe(t.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalProperties"]
    }) ?? e.allowedAdditionalProperties
  };
  if (e.target === "openApi3")
    return n;
  if (((i = t.keyType) == null ? void 0 : i._def.typeName) === B.ZodString && ((a = t.keyType._def.checks) != null && a.length)) {
    const { type: u, ...c } = Ro(t.keyType._def, e);
    return {
      ...n,
      propertyNames: c
    };
  } else {
    if (((s = t.keyType) == null ? void 0 : s._def.typeName) === B.ZodEnum)
      return {
        ...n,
        propertyNames: {
          enum: t.keyType._def.values
        }
      };
    if (((o = t.keyType) == null ? void 0 : o._def.typeName) === B.ZodBranded && t.keyType._def.type._def.typeName === B.ZodString && ((l = t.keyType._def.type._def.checks) != null && l.length)) {
      const { type: u, ...c } = To(t.keyType._def, e);
      return {
        ...n,
        propertyNames: c
      };
    }
  }
  return n;
}
function jc(t, e) {
  if (e.mapStrategy === "record")
    return Io(t, e);
  const n = Pe(t.keyType._def, {
    ...e,
    currentPath: [...e.currentPath, "items", "items", "0"]
  }) || wt(e), r = Pe(t.valueType._def, {
    ...e,
    currentPath: [...e.currentPath, "items", "items", "1"]
  }) || wt(e);
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
function Vc(t) {
  const e = t.values, r = Object.keys(t.values).filter((a) => typeof e[e[a]] != "number").map((a) => e[a]), i = Array.from(new Set(r.map((a) => typeof a)));
  return {
    type: i.length === 1 ? i[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: r
  };
}
function Zc(t) {
  return t.target === "openAi" ? void 0 : {
    not: wt({
      ...t,
      currentPath: [...t.currentPath, "not"]
    })
  };
}
function Wc(t) {
  return t.target === "openApi3" ? {
    enum: ["null"],
    nullable: !0
  } : {
    type: "null"
  };
}
const Br = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function Gc(t, e) {
  if (e.target === "openApi3")
    return qa(t, e);
  const n = t.options instanceof Map ? Array.from(t.options.values()) : t.options;
  if (n.every((r) => r._def.typeName in Br && (!r._def.checks || !r._def.checks.length))) {
    const r = n.reduce((i, a) => {
      const s = Br[a._def.typeName];
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
  return qa(t, e);
}
const qa = (t, e) => {
  const n = (t.options instanceof Map ? Array.from(t.options.values()) : t.options).map((r, i) => Pe(r._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", `${i}`]
  })).filter((r) => !!r && (!e.strictUnions || typeof r == "object" && Object.keys(r).length > 0));
  return n.length ? { anyOf: n } : void 0;
};
function qc(t, e) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(t.innerType._def.typeName) && (!t.innerType._def.checks || !t.innerType._def.checks.length))
    return e.target === "openApi3" ? {
      type: Br[t.innerType._def.typeName],
      nullable: !0
    } : {
      type: [
        Br[t.innerType._def.typeName],
        "null"
      ]
    };
  if (e.target === "openApi3") {
    const r = Pe(t.innerType._def, {
      ...e,
      currentPath: [...e.currentPath]
    });
    return r && "$ref" in r ? { allOf: [r], nullable: !0 } : r && { ...r, nullable: !0 };
  }
  const n = Pe(t.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", "0"]
  });
  return n && { anyOf: [n, { type: "null" }] };
}
function Kc(t, e) {
  const n = {
    type: "number"
  };
  if (!t.checks)
    return n;
  for (const r of t.checks)
    switch (r.kind) {
      case "int":
        n.type = "integer", xo(n, "type", r.message, e);
        break;
      case "min":
        e.target === "jsonSchema7" ? r.inclusive ? ze(n, "minimum", r.value, r.message, e) : ze(n, "exclusiveMinimum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMinimum = !0), ze(n, "minimum", r.value, r.message, e));
        break;
      case "max":
        e.target === "jsonSchema7" ? r.inclusive ? ze(n, "maximum", r.value, r.message, e) : ze(n, "exclusiveMaximum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMaximum = !0), ze(n, "maximum", r.value, r.message, e));
        break;
      case "multipleOf":
        ze(n, "multipleOf", r.value, r.message, e);
        break;
    }
  return n;
}
function Yc(t, e) {
  const n = e.target === "openAi", r = {
    type: "object",
    properties: {}
  }, i = [], a = t.shape();
  for (const o in a) {
    let l = a[o];
    if (l === void 0 || l._def === void 0)
      continue;
    let u = Jc(l);
    u && n && (l._def.typeName === "ZodOptional" && (l = l._def.innerType), l.isNullable() || (l = l.nullable()), u = !1);
    const c = Pe(l._def, {
      ...e,
      currentPath: [...e.currentPath, "properties", o],
      propertyPath: [...e.currentPath, "properties", o]
    });
    c !== void 0 && (r.properties[o] = c, u || i.push(o));
  }
  i.length && (r.required = i);
  const s = Xc(t, e);
  return s !== void 0 && (r.additionalProperties = s), r;
}
function Xc(t, e) {
  if (t.catchall._def.typeName !== "ZodNever")
    return Pe(t.catchall._def, {
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
function Jc(t) {
  try {
    return t.isOptional();
  } catch {
    return !0;
  }
}
const Qc = (t, e) => {
  var r;
  if (e.currentPath.toString() === ((r = e.propertyPath) == null ? void 0 : r.toString()))
    return Pe(t.innerType._def, e);
  const n = Pe(t.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", "1"]
  });
  return n ? {
    anyOf: [
      {
        not: wt(e)
      },
      n
    ]
  } : wt(e);
}, eu = (t, e) => {
  if (e.pipeStrategy === "input")
    return Pe(t.in._def, e);
  if (e.pipeStrategy === "output")
    return Pe(t.out._def, e);
  const n = Pe(t.in._def, {
    ...e,
    currentPath: [...e.currentPath, "allOf", "0"]
  }), r = Pe(t.out._def, {
    ...e,
    currentPath: [...e.currentPath, "allOf", n ? "1" : "0"]
  });
  return {
    allOf: [n, r].filter((i) => i !== void 0)
  };
};
function tu(t, e) {
  return Pe(t.type._def, e);
}
function nu(t, e) {
  const r = {
    type: "array",
    uniqueItems: !0,
    items: Pe(t.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, "items"]
    })
  };
  return t.minSize && ze(r, "minItems", t.minSize.value, t.minSize.message, e), t.maxSize && ze(r, "maxItems", t.maxSize.value, t.maxSize.message, e), r;
}
function ru(t, e) {
  return t.rest ? {
    type: "array",
    minItems: t.items.length,
    items: t.items.map((n, r) => Pe(n._def, {
      ...e,
      currentPath: [...e.currentPath, "items", `${r}`]
    })).reduce((n, r) => r === void 0 ? n : [...n, r], []),
    additionalItems: Pe(t.rest._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalItems"]
    })
  } : {
    type: "array",
    minItems: t.items.length,
    maxItems: t.items.length,
    items: t.items.map((n, r) => Pe(n._def, {
      ...e,
      currentPath: [...e.currentPath, "items", `${r}`]
    })).reduce((n, r) => r === void 0 ? n : [...n, r], [])
  };
}
function iu(t) {
  return {
    not: wt(t)
  };
}
function au(t) {
  return wt(t);
}
const su = (t, e) => Pe(t.innerType._def, e), ou = (t, e, n) => {
  switch (e) {
    case B.ZodString:
      return Ro(t, n);
    case B.ZodNumber:
      return Kc(t, n);
    case B.ZodObject:
      return Yc(t, n);
    case B.ZodBigInt:
      return Ac(t, n);
    case B.ZodBoolean:
      return Oc();
    case B.ZodDate:
      return Eo(t, n);
    case B.ZodUndefined:
      return iu(n);
    case B.ZodNull:
      return Wc(n);
    case B.ZodArray:
      return Nc(t, n);
    case B.ZodUnion:
    case B.ZodDiscriminatedUnion:
      return Gc(t, n);
    case B.ZodIntersection:
      return Hc(t, n);
    case B.ZodTuple:
      return ru(t, n);
    case B.ZodRecord:
      return Io(t, n);
    case B.ZodLiteral:
      return Uc(t, n);
    case B.ZodEnum:
      return Fc(t);
    case B.ZodNativeEnum:
      return Vc(t);
    case B.ZodNullable:
      return qc(t, n);
    case B.ZodOptional:
      return Qc(t, n);
    case B.ZodMap:
      return jc(t, n);
    case B.ZodSet:
      return nu(t, n);
    case B.ZodLazy:
      return () => t.getter()._def;
    case B.ZodPromise:
      return tu(t, n);
    case B.ZodNaN:
    case B.ZodNever:
      return Zc(n);
    case B.ZodEffects:
      return Dc(t, n);
    case B.ZodAny:
      return wt(n);
    case B.ZodUnknown:
      return au(n);
    case B.ZodDefault:
      return Pc(t, n);
    case B.ZodBranded:
      return To(t, n);
    case B.ZodReadonly:
      return su(t, n);
    case B.ZodCatch:
      return Mc(t, n);
    case B.ZodPipeline:
      return eu(t, n);
    case B.ZodFunction:
    case B.ZodVoid:
    case B.ZodSymbol:
      return;
    default:
      return /* @__PURE__ */ ((r) => {
      })();
  }
};
function Pe(t, e, n = !1) {
  var o;
  const r = e.seen.get(t);
  if (e.override) {
    const l = (o = e.override) == null ? void 0 : o.call(e, t, e, r, n);
    if (l !== Ql)
      return l;
  }
  if (r && !n) {
    const l = lu(r, e);
    if (l !== void 0)
      return l;
  }
  const i = { def: t, path: e.currentPath, jsonSchema: void 0 };
  e.seen.set(t, i);
  const a = ou(t, t.typeName, e), s = typeof a == "function" ? Pe(a(), e) : a;
  if (s && cu(t, e, s), e.postProcess) {
    const l = e.postProcess(s, t, e);
    return i.jsonSchema = s, l;
  }
  return i.jsonSchema = s, s;
}
const lu = (t, e) => {
  switch (e.$refStrategy) {
    case "root":
      return { $ref: t.path.join("/") };
    case "relative":
      return { $ref: ko(e.currentPath, t.path) };
    case "none":
    case "seen":
      return t.path.length < e.currentPath.length && t.path.every((n, r) => e.currentPath[r] === n) ? (console.warn(`Recursive reference detected at ${e.currentPath.join("/")}! Defaulting to any`), wt(e)) : e.$refStrategy === "seen" ? wt(e) : void 0;
  }
}, cu = (t, e, n) => (t.description && (n.description = t.description, e.markdownDescription && (n.markdownDescription = t.description)), n), uu = (t, e) => {
  const n = tc(e);
  let r = typeof e == "object" && e.definitions ? Object.entries(e.definitions).reduce((l, [u, c]) => ({
    ...l,
    [u]: Pe(c._def, {
      ...n,
      currentPath: [...n.basePath, n.definitionPath, u]
    }, !0) ?? wt(n)
  }), {}) : void 0;
  const i = typeof e == "string" ? e : (e == null ? void 0 : e.nameStrategy) === "title" || e == null ? void 0 : e.name, a = Pe(t._def, i === void 0 ? n : {
    ...n,
    currentPath: [...n.basePath, n.definitionPath, i]
  }, !1) ?? wt(n), s = typeof e == "object" && e.name !== void 0 && e.nameStrategy === "title" ? e.name : void 0;
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
class du {
  constructor(e = []) {
    ne(this, "entries", /* @__PURE__ */ new Map());
    ne(this, "schemas", []);
    e.forEach((n) => this.add(n));
  }
  add(e) {
    this.entries.has(e.name) || (this.entries.set(e.name, e), this.schemas.push({
      name: e.name,
      description: e.description,
      propsSchemaJson: uu(e.propsSchema, {
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
const No = Yr(null);
function hu({ children: t, value: e }) {
  return /* @__PURE__ */ p(No.Provider, { value: e, children: t });
}
function jn() {
  const t = Xr(No);
  if (!t)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return t;
}
const Ao = Yr(null);
function pu({
  callId: t,
  status: e,
  source: n,
  isLatest: r,
  children: i
}) {
  return /* @__PURE__ */ p(
    Ao.Provider,
    {
      value: { callId: t, status: e, source: n, isLatest: r },
      children: i
    }
  );
}
function fu() {
  return Xr(Ao);
}
function gu() {
  const { onSubmit: t, onStopGeneration: e, isStreaming: n, chatStatus: r } = jn();
  return {
    sendMessage: t,
    stopGeneration: e,
    isStreaming: n,
    chatStatus: r
  };
}
const mu = ca({
  label: bn().optional().describe("Button label shown to the user. Keep short (≤ 32 chars)."),
  value: bn().optional().describe(
    'Optional value sent back when this option is selected. Defaults to `label`. Use this when the visible label differs from the answer you want the agent to receive (e.g. label "Yes" → value "Yes, schedule the campaign for next Friday").'
  )
}), yu = Ic([
  "single_choice",
  "multi_choice"
]), wu = ca({
  id: bn().optional().describe(
    "Stable identifier for this question. Optional — falls back to a positional id (q1, q2, …)."
  ),
  title: bn().optional().describe(
    'The question text shown above the options (e.g. "Which campaign idea do you want to run next?").'
  ),
  type: yu.optional().describe(
    "single_choice = pick exactly one (radio). multi_choice = pick one or more (checkbox). Defaults to single_choice."
  ),
  options: vo(mu).optional().describe(
    "Reply options for this question. Provide 2–6 — fewer is not a meaningful choice; more hurts readability."
  ),
  helperText: bn().optional().describe(
    'Hint shown inline after the bolded title (e.g. "Pick one", "Pick one or more"). Auto-derived from `type` when omitted.'
  ),
  allowFreeText: Rc().optional().describe(
    "When true, render a text input below the options where the user can type their own answer. For single_choice, the input is mutually exclusive with the radio picks (typing into the input deselects radios; picking a radio clears the input). For multi_choice, the typed text combines with any selected checkboxes on submit. Defaults to false."
  )
}), Cu = ca({
  prompt: bn().optional().describe(
    "Optional intro shown above the questions. Plain text only."
  ),
  questions: vo(wu).optional().describe(
    "One or more questions. When the agent provides several, the form steps through them one at a time (Back/Next navigation) and submits all answers together as a single message when the user clicks Submit on the final step."
  ),
  submitLabel: bn().optional().describe('Label for the submit button. Defaults to "Submit".')
}), xu = 6, ku = "Type your answer here…";
function _n(t, e) {
  var n;
  return ((n = t.id) == null ? void 0 : n.trim()) || `q${e + 1}`;
}
function _u(t) {
  return t === "multi_choice" ? "Pick one or more" : "Pick one";
}
function ua(t, e) {
  return (t == null ? void 0 : t.trim()) || `Option ${e + 1}`;
}
function Oo(t, e, n) {
  return (t == null ? void 0 : t.trim()) || ua(e, n);
}
function Su(t, e) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (Oo(r.value, r.label, n) === e)
      return ua(r.label, n);
  }
  return e;
}
function bu(t, e) {
  return t && t.length > 0 ? t : e && e.length > 0 ? [
    {
      id: "q1",
      type: "single_choice",
      options: e
    }
  ] : [];
}
function vu(t, e, n, r) {
  const i = [];
  return t != null && t.trim() && (i.push(t.trim()), i.push("")), e.forEach(({ question: a, qIndex: s }) => {
    var h;
    const o = _n(a, s), l = a.type ?? "single_choice", u = n[o] ?? [], c = (r[o] ?? "").trim(), d = l === "multi_choice" ? [...u, ...c ? [c] : []] : u.length > 0 ? [...u] : c ? [c] : [];
    if (d.length === 0) return;
    const f = ((h = a.title) == null ? void 0 : h.trim()) || `Q${s + 1}`;
    i.push(`${f} ${d.join(", ")}`);
  }), i.join(`
`).trim();
}
function Tu(t) {
  const { prompt: e, questions: n, submitLabel: r } = t, i = t.options, { sendMessage: a, isStreaming: s } = gu(), o = fu(), [l, u] = Re({}), [c, d] = Re({}), [f, h] = Re(!1), [w, k] = Re(1), [I, _] = Re(() => /* @__PURE__ */ new Set()), v = (o == null ? void 0 : o.isLatest) ?? !0, R = bu(n, i), M = R.map((ee, C) => ({
    question: ee,
    qIndex: C,
    opts: (ee.options ?? []).slice(0, xu)
  })).filter(
    ({ opts: ee, question: C }) => ee.length > 0 || C.allowFreeText === !0
  ), L = M.length, b = Math.max(
    1,
    Math.min(w, Math.max(L, 1))
  ), j = M.slice(0, b), $ = L > 0 && b >= L, H = f || !v;
  Fe(() => {
    if (H || L === 0 || w >= L) return;
    const ee = M[w - 1];
    if (!ee) return;
    const C = _n(ee.question, ee.qIndex), W = (l[C] ?? []).length > 0, V = (c[C] ?? "").trim().length > 0;
    (W || V) && k((y) => Math.min(y + 1, L));
  }, [l, c, H, L, w]);
  const te = (ee) => {
    const C = _n(ee.question, ee.qIndex), W = l[C] ?? [], V = (c[C] ?? "").trim();
    return W.length > 0 || V.length > 0;
  }, de = (ee, C, W) => {
    if (H) return;
    const V = _n(R[ee], ee);
    u((y) => {
      if (C === "multi_choice") {
        const Q = y[V] ?? [], K = Q.includes(W) ? Q.filter((fe) => fe !== W) : [...Q, W];
        return { ...y, [V]: K };
      }
      return { ...y, [V]: [W] };
    }), C !== "multi_choice" && (d((y) => ({ ...y, [V]: "" })), _((y) => {
      if (!y.has(V)) return y;
      const Q = new Set(y);
      return Q.delete(V), Q;
    }));
  }, G = (ee) => {
    if (H) return;
    const C = _n(R[ee], ee);
    _((W) => {
      if (W.has(C)) return W;
      const V = new Set(W);
      return V.add(C), V;
    });
  }, N = (ee, C, W) => {
    if (H) return;
    const V = _n(R[ee], ee);
    d((y) => ({ ...y, [V]: W })), C !== "multi_choice" && u((y) => ({ ...y, [V]: [] }));
  }, P = H || s || L === 0 || !$ ? !1 : M.every((ee) => (ee.question.type ?? "single_choice") === "multi_choice" ? !0 : te(ee)), F = () => {
    if (!P) return;
    const ee = vu(
      e,
      M,
      l,
      c
    );
    ee && (h(!0), a(ee));
  };
  if (L === 0)
    return null;
  const Z = (ee) => {
    var _e;
    const { question: C, qIndex: W, opts: V } = ee, y = _n(C, W), Q = C.type ?? "single_choice", K = ((_e = C.helperText) == null ? void 0 : _e.trim()) || _u(Q), fe = l[y] ?? [], he = c[y] ?? "", le = Q === "multi_choice" ? "chat-wrapper__ask-user-input-v0-option-indicator--checkbox" : "chat-wrapper__ask-user-input-v0-option-indicator--radio", Te = C.allowFreeText === !0 && (!H || he.trim().length > 0), Ie = !H && Q === "single_choice" && fe.length > 0 && !I.has(y);
    return /* @__PURE__ */ O(
      "div",
      {
        className: "chat-wrapper__ask-user-input-v0-question",
        "data-question-type": Q,
        "data-mode": Ie ? "summary" : "edit",
        children: [
          /* @__PURE__ */ O("p", { className: "chat-wrapper__ask-user-input-v0-question-title", children: [
            C.title ? /* @__PURE__ */ p("strong", { children: C.title }) : null,
            C.title && K ? " " : null,
            /* @__PURE__ */ p("span", { className: "chat-wrapper__ask-user-input-v0-helper", children: K })
          ] }),
          Ie ? /* @__PURE__ */ O(Yt, { children: [
            /* @__PURE__ */ O("p", { className: "chat-wrapper__ask-user-input-v0-summary-text", children: [
              "You selected: ",
              Su(V, fe[0])
            ] }),
            /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                className: "chat-wrapper__ask-user-input-v0-change-answer",
                onClick: () => G(W),
                children: "Change answer"
              }
            )
          ] }) : /* @__PURE__ */ O(Yt, { children: [
            V.length > 0 ? /* @__PURE__ */ p(
              "div",
              {
                className: "chat-wrapper__ask-user-input-v0-options",
                role: Q === "multi_choice" ? "group" : "radiogroup",
                children: V.map((me, De) => {
                  const je = ua(me.label, De), Ne = Oo(me.value, me.label, De), vt = fe.includes(Ne);
                  return /* @__PURE__ */ O(
                    "button",
                    {
                      type: "button",
                      className: `chat-wrapper__ask-user-input-v0-option${vt ? " chat-wrapper__ask-user-input-v0-option--picked" : ""}`,
                      disabled: H,
                      role: Q === "multi_choice" ? "checkbox" : "radio",
                      "aria-checked": vt,
                      onClick: () => de(W, Q, Ne),
                      children: [
                        /* @__PURE__ */ p(
                          "span",
                          {
                            className: `chat-wrapper__ask-user-input-v0-option-indicator ${le}`,
                            "aria-hidden": "true"
                          }
                        ),
                        /* @__PURE__ */ p("span", { className: "chat-wrapper__ask-user-input-v0-option-label", children: je })
                      ]
                    },
                    `${y}-${Ne}-${De}`
                  );
                })
              }
            ) : null,
            Te ? /* @__PURE__ */ p(
              "input",
              {
                type: "text",
                className: "chat-wrapper__ask-user-input-v0-free-text-input",
                value: he,
                onChange: (me) => N(W, Q, me.target.value),
                placeholder: ku,
                disabled: H,
                "aria-label": C.title ? `Type your answer for: ${C.title}` : "Type your answer"
              }
            ) : null
          ] })
        ]
      },
      y
    );
  }, ue = H;
  return /* @__PURE__ */ O("div", { className: "chat-wrapper__ask-user-input-v0", children: [
    e ? /* @__PURE__ */ p("p", { className: "chat-wrapper__ask-user-input-v0-prompt", children: e }) : null,
    (ue ? M : j).map(Z),
    !ue && $ ? /* @__PURE__ */ p("div", { className: "chat-wrapper__ask-user-input-v0-actions", children: /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        className: "chat-wrapper__ask-user-input-v0-submit",
        disabled: !P,
        onClick: F,
        children: (r == null ? void 0 : r.trim()) || "Submit"
      }
    ) }) : null
  ] });
}
const Eu = {
  name: "AskUserInputV0",
  description: 'Show a structured clarifying-question form with radio (single_choice) and/or checkbox (multi_choice) controls. Use whenever you would otherwise ask the user a small, well-defined set of clarifying questions before continuing — e.g. picking a campaign goal, confirming preferences, choosing a tone, narrowing an audience. Set `prompt` to an optional intro, list each question under `questions[]` with `title`, `type`, and `options[]` (2–6). Set `option.value` when the answer string sent back should differ from the visible `label`. Set `helperText` to override the default "Pick one" / "Pick one or more" hint shown inline after the title. Set `allowFreeText: true` on a question to render a text input below the options where the user can type their own answer in their own words; for single_choice the input is mutually exclusive with the radio picks (typing deselects radios), for multi_choice the typed text combines with any selected checkboxes. A question may use `allowFreeText: true` with no `options[]` to render as a pure text-input prompt. When you provide multiple `questions[]`, the form reveals them progressively inline: only the first question shows initially, and each subsequent question appears once the user picks an option or types into the input on the previous one. All revealed questions stay editable, so the user can change earlier answers before submitting. A single Submit button appears once every question is revealed and the required ones answered; clicking it sends all collected answers as a single message. The form locks after submit (the user cannot revise their answer); render a fresh AskUserInputV0 if you need a follow-up question. Do not use this for purely conversational free-form input or ranking interactions.',
  propsSchema: Cu,
  component: Tu
}, Ru = [
  Eu
];
function Iu(t) {
  return [...t ?? [], ...Ru];
}
const Nu = {
  maxReconnectAttempts: 1 / 0,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, vr = {
  NORMAL: 1e3,
  // Normal closure
  GOING_AWAY: 1001
};
var Nt = /* @__PURE__ */ ((t) => (t.CONNECTION_ESTABLISHED = "connection_established", t.CONNECTION_LOST = "connection_lost", t.CONNECTION_RESTORED = "connection_restored", t.CONNECTION_FAILED = "connection_failed", t.RECONNECTING = "reconnecting", t.CHAT_COMPLETED = "chat_completed", t.CHAT_ERROR = "chat_error", t))(Nt || {}), Vt = /* @__PURE__ */ ((t) => (t.CHAT_MESSAGE = "chat_message", t.CONFIGURE_TOOLS = "configure_tools", t.UPDATE_TOOLS = "update_tools", t.UPDATE_CONTEXT_HELPERS = "update_context_helpers", t.TOOL_CALL_RESPONSE = "tool_call_response", t.HEARTBEAT_PING = "heartbeat_ping", t.HEARTBEAT_PONG = "heartbeat_pong", t.STOP_RUN = "stop_run", t))(Vt || {}), it = /* @__PURE__ */ ((t) => (t.SESSION_ESTABLISHED = "session_established", t.TOOLS_CONFIGURED = "tools_configured", t.CLIENT_TOOLS_UPDATED = "client_tools_updated", t.CONFIGURE_TOOLS = "configure_tools", t.CHAT_EVENT = "chat_event", t.CHAT_FINISHED = "chat_finished", t.CHAT_ERROR = "chat_error", t.MESSAGES_PERSISTED = "messages_persisted", t.THREAD_CREATED = "thread_created", t.TOOL_CALL_REQUEST = "tool_call_request", t.UI_COMPONENT = "ui_component", t.HEARTBEAT_PING = "heartbeat_ping", t.HEARTBEAT_ACK = "heartbeat_ack", t.ERROR = "error", t))(it || {}), Mr = /* @__PURE__ */ ((t) => (t.PROVIDER_EVENT = "provider-event", t.LATITUDE_EVENT = "latitude-event", t.CONTENT_DELTA = "content-delta", t))(Mr || {}), cn = /* @__PURE__ */ ((t) => (t.TEXT_DELTA = "text-delta", t.REASONING_START = "reasoning-start", t.REASONING_DELTA = "reasoning-delta", t.REASONING_END = "reasoning-end", t.TOOL_CALL = "tool-call", t.TOOL_RESULT = "tool-result", t))(cn || {});
class Ln {
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
    return this.createConnectionEvent(Nt.CONNECTION_ESTABLISHED);
  }
  static connectionLost(e) {
    return this.createConnectionEvent(Nt.CONNECTION_LOST, { reason: e });
  }
  static connectionRestored() {
    return this.createConnectionEvent(Nt.CONNECTION_RESTORED);
  }
  static reconnecting(e, n) {
    return this.createConnectionEvent(Nt.RECONNECTING, { attempt: e, maxAttempts: n });
  }
  static chatCompleted(e) {
    return this.createChatEvent(Nt.CHAT_COMPLETED, { conversationId: e });
  }
  static chatError(e, n) {
    return this.createChatEvent(Nt.CHAT_ERROR, { error: e, errorCode: n });
  }
}
class nn {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(e) {
    return {
      type: Vt.CHAT_MESSAGE,
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
      type: Vt.CONFIGURE_TOOLS,
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
      type: Vt.UPDATE_TOOLS,
      toolSchemas: e,
      generativeComponents: n
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(e) {
    return {
      type: Vt.UPDATE_CONTEXT_HELPERS,
      contextHelpers: e
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(e, n) {
    return {
      type: Vt.TOOL_CALL_RESPONSE,
      callId: e,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(e, n) {
    return {
      type: Vt.TOOL_CALL_RESPONSE,
      callId: e,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: Vt.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(e, n) {
    return {
      type: Vt.HEARTBEAT_PONG,
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
      type: Vt.STOP_RUN,
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
class Au {
  constructor(e, n) {
    ne(this, "ws", null);
    ne(this, "config");
    ne(this, "connectionState");
    ne(this, "reconnectTimer", null);
    ne(this, "heartbeatInterval", null);
    ne(this, "visibilityChangeHandler");
    ne(this, "currentTicket", null);
    ne(this, "intentionalDisconnect", !1);
    // Track intentional disconnects
    ne(this, "justRefreshedTicket", !1);
    // Track if ticket was just refreshed to skip duplicate validation
    ne(this, "onOpen");
    ne(this, "onMessage");
    ne(this, "onError");
    ne(this, "onClose");
    ne(this, "onSystemEvent");
    ne(this, "onTicketRefresh");
    ne(this, "onTicketValidate");
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
      NORMAL: vr.NORMAL,
      GOING_AWAY: vr.GOING_AWAY
    }), this.intentionalDisconnect)
      return console.log("[WebSocketManager] Intentional disconnect - no reconnect"), !1;
    const { NORMAL: n } = vr, r = e !== n;
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
        Ln.connectionLost("Max reconnection attempts reached")
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
    }), (o = this.onSystemEvent) == null || o.call(this, Ln.reconnecting(e, n));
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
    this.updateConnectionState(!0, !1), this.justRefreshedTicket = !1, this.startHeartbeat(), (e = this.onSystemEvent) == null || e.call(this, Ln.connectionRestored()), (n = this.onOpen) == null || n.call(this);
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
    const e = nn.serializeHeartbeatPing();
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
    this.ws && this.ws.close(vr.NORMAL);
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
class Ou {
  constructor() {
    ne(this, "state");
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
class jr {
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
class Mo {
  constructor(e = {}) {
    ne(this, "handlers", {});
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
const pe = {
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
}, tt = {
  isThinkingMessage: (t) => t.startsWith(pe.THINKING_PREFIX) || t.startsWith(pe.REASONING_PREFIX) || t.startsWith(pe.THOUGHT_PREFIX),
  isCompletedMessage: (t) => t.includes(pe.COMPLETED_MARKER),
  isErrorMessage: (t) => t.includes(pe.ERROR_MARKER),
  isHandlingMessage: (t) => t.includes(pe.HANDLING_MARKER),
  extractDuration: (t, e) => {
    const n = t.match(pe.PATTERNS.DURATION);
    if (!n) return;
    const r = parseFloat(n[1]);
    if (e) {
      const a = e("chat.reasoning.duration.for"), s = e(r === 1 ? "chat.reasoning.duration.second" : "chat.reasoning.duration.seconds");
      return ` ${a} ${r} ${s}`;
    }
    const i = r === 1 ? pe.UI_TEXT.DURATION_SECOND : pe.UI_TEXT.DURATION_SECONDS;
    return ` ${pe.UI_TEXT.DURATION_FOR} ${r} ${i}`;
  },
  cleanReasoningContent: (t) => {
    let e = t.replace(new RegExp(`^${pe.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${pe.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${pe.THOUGHT_PREFIX}\\s*`), "");
    return e = e.replace(/\s*for [\d.]+\s+\w+$/, ""), e = e.replace(pe.PATTERNS.THOUGHT_CONTENT, ""), e.trim();
  },
  getMessageType: (t, e) => e === !1 ? tt.isErrorMessage(t) ? pe.MESSAGE_TYPES.ERROR : (tt.isThinkingMessage(t) && pe.PATTERNS.DURATION.test(t) || tt.isThinkingMessage(t), pe.MESSAGE_TYPES.THOUGHT) : tt.isCompletedMessage(t) ? pe.MESSAGE_TYPES.COMPLETED : tt.isErrorMessage(t) ? pe.MESSAGE_TYPES.ERROR : (tt.isHandlingMessage(t) || tt.isThinkingMessage(t) && !t.includes(pe.UI_TEXT.AI_IS_THINKING), pe.MESSAGE_TYPES.THINKING)
};
class Mu extends Mo {
  constructor(n) {
    super({ onReasoningUpdate: n });
    ne(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    ne(this, "reasoningContent", /* @__PURE__ */ new Map());
  }
  onHandlersUpdated(n) {
  }
  triggerReasoningUpdate(n, r, i, a, s) {
    const o = this.getHandler("onReasoningUpdate");
    if (!o) return;
    const l = jr.createReasoningCall(
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
    const s = `${pe.THINKING_PREFIX} ${a}`;
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
    const o = i || pe.UI_TEXT.THOUGHT, l = `${pe.THOUGHT_PREFIX} ${o}${s}`;
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
const Lu = "render_ui";
class Pu extends Mo {
  constructor(n = {}, r, i) {
    super({ onReasoningUpdate: r, onUIComponent: i });
    ne(this, "processedToolCalls", /* @__PURE__ */ new Set());
    ne(this, "clientTools", {});
    ne(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var s, o, l;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      if (this.processedToolCalls.add(r), i === Lu) {
        this.sendToolResponse(r, { rendered: !0 });
        return;
      }
      (s = this.getHandler("onReasoningUpdate")) == null || s(!0, `${pe.HANDLING_MARKER} ${i}`, n);
      try {
        const u = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, u), (o = this.getHandler("onReasoningUpdate")) == null || o(!1, `${pe.COMPLETED_MARKER} ${i}`, n);
      } catch (u) {
        this.sendToolError(r, u), (l = this.getHandler("onReasoningUpdate")) == null || l(!1, `${pe.ERROR_MARKER} Error: ${i} - ${u}`, n);
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
    const i = nn.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = nn.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = jr.createLatitudeToolCall(
        n.toolName,
        n.toolCallId,
        n.args || {}
      );
      r(!0, `${pe.HANDLING_MARKER} ${n.toolName}`, a);
    }
  }
  handleServerToolResult(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = jr.createLatitudeToolCall(
        n.toolName,
        n.toolCallId
      );
      r(
        !1,
        `${pe.COMPLETED_MARKER} ${n.toolName}`,
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
class Du {
  constructor(e, n = {}) {
    ne(this, "reasoningHandler");
    ne(this, "toolHandler");
    ne(this, "handlers");
    ne(this, "sendMessage");
    this.handlers = e, this.reasoningHandler = new Mu(e.onReasoningUpdate), this.toolHandler = new Pu(
      n,
      e.onReasoningUpdate,
      e.onUIComponent
    );
  }
  handleMessage(e) {
    try {
      const n = JSON.parse(e.data);
      switch (n.type) {
        case it.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case it.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case it.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case it.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case it.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case it.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case it.MESSAGES_PERSISTED:
          this.handleMessagesPersisted(n);
          break;
        case it.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case it.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case it.UI_COMPONENT:
          this.handleUIComponentMessage(n);
          break;
        case it.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case it.HEARTBEAT_ACK:
          break;
        case it.ERROR:
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
      case Mr.PROVIDER_EVENT:
        this.handleProviderEvent(e);
        break;
      case Mr.LATITUDE_EVENT:
        this.handleLatitudeEvent(e);
        break;
      case Mr.CONTENT_DELTA:
        (n = e.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, e.data.delta));
        break;
    }
  }
  handleProviderEvent(e) {
    var r, i, a;
    switch ((r = e.data) == null ? void 0 : r.type) {
      case cn.TEXT_DELTA:
        e.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, e.data.textDelta));
        break;
      case cn.REASONING_START:
        this.reasoningHandler.handleReasoningStart(e.data);
        break;
      case cn.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(e.data);
        break;
      case cn.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(e.data);
        break;
      case cn.TOOL_CALL:
        this.toolHandler.handleServerToolCall(e.data);
        break;
      case cn.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(e.data);
        break;
    }
  }
  handleLatitudeEvent(e) {
    var n;
    if (((n = e.data) == null ? void 0 : n.type) === cn.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = e.data;
      if (r.toolCallId && r.toolName) {
        const i = jr.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${pe.COMPLETED_MARKER} ${r.toolName}`,
          i
        );
      }
    }
  }
  handleChatFinished(e) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Ln.chatCompleted(e.uuid));
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
      Ln.chatError(e.error || "Unknown error")
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
    const n = nn.serializeHeartbeatPong(
      e.timestamp,
      e.pingTime
    );
    this.sendMessage(n);
  }
  handleError(e) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      Ln.chatError(e.error || "Unknown WebSocket error")
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
async function Fu(t, e, n = 1e4) {
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
function Ui(t) {
  if (!t.success || !t.ticket || !t.expiresAt)
    return !1;
  const e = new Date(t.expiresAt).getTime();
  return Date.now() < e - 3e4;
}
function Ka(t) {
  const e = Ui(t), n = new Date(t.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: e,
    expiresIn: i,
    expired: r >= n
  };
}
async function zu(t, e, n, r) {
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
function Hu(t) {
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
function $n(t, e) {
  const n = Hu(t);
  return console.error(`[${e}] Error occurred:`, {
    error: (t == null ? void 0 : t.message) || t,
    classification: n,
    shouldRetry: n.isRetryable
  }), n;
}
class Uu {
  constructor(e, n, r = {}) {
    ne(this, "ticket", null);
    ne(this, "refreshPromise", null);
    ne(this, "validationInterval", null);
    ne(this, "authData");
    ne(this, "apiUrl");
    ne(this, "config");
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
    return this.ticket && Ui(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
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
        return this.ticket = await Fu(
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
        const a = $n(i, "TicketManager");
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
      const r = Ka(this.ticket).expiresIn / 1e3;
      r < this.config.renewalThreshold && (console.log(
        `TicketManager: Ticket expires in ${r.toFixed(
          0
        )}s, renewing...`
      ), await this.refreshTicket(), console.log("TicketManager: Ticket renewed proactively"), e == null || e());
    } catch (n) {
      const r = $n(
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
    return this.ticket ? Ui(this.ticket) : !1;
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
      const e = await zu(
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
        return Ka(this.ticket).expiresIn;
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
async function $u(t, e, n) {
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
async function Bu(t, e, n, r) {
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
async function ju(t, e, n, r) {
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
class Vu {
  constructor() {
    ne(this, "config");
    ne(this, "connectionState");
    ne(this, "wsManager");
    ne(this, "messageHandler");
    ne(this, "initResolve");
    ne(this, "initReject");
    // Client tools and context
    ne(this, "toolSchemas", []);
    ne(this, "componentSchemas", []);
    ne(this, "contextHelpers", {});
    // Ticket management - now centralized in TicketManager
    ne(this, "ticketManager", null);
    // Authentication credentials for HTTP API calls
    ne(this, "authCredentials", {});
    this.config = {
      ...Nu
    }, this.connectionState = new Ou(), this.wsManager = new Au(this.config, this.connectionState), this.messageHandler = new Du({}), this.setupWebSocketHandlers();
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
    if ((n == null ? void 0 : n.type) === "authentication_error" && this.handleAuthenticationFailure(n), (n == null ? void 0 : n.type) === it.THREAD_CREATED) {
      (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onThreadCreated) == null || i.call(r, n.data);
      return;
    }
    if ((n == null ? void 0 : n.type) === it.TOOLS_CONFIGURED) {
      (a = this.initResolve) == null || a.call(this);
      return;
    }
    if ((n == null ? void 0 : n.type) === it.SESSION_ESTABLISHED) {
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
      $n(i, "TicketRefresh").isRetryable, (s = this.initReject) == null || s.call(this, i);
    }) : (r = this.initReject) == null || r.call(
      this,
      new Error(`Authentication failed: ${n == null ? void 0 : n.error}`)
    );
  }
  sendToolConfiguration() {
    const e = nn.serializeConfigureTools(
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
    }, this.ticketManager = new Uu(
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
      const l = nn.serializeChatMessage({
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
    const n = nn.serializeUpdateContextHelpers(
      this.contextHelpers
    );
    this.wsManager.send(n);
  }
  addClientTools(e, n) {
    this.messageHandler.updateClientTools(e), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = nn.serializeUpdateTools(
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
    const n = nn.serializeStopRun(e);
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
      await Bu(
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
      await ju(
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
function Zu({
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
  onThreadCreated: f,
  onMessagesPersisted: h,
  onError: w
}) {
  const [k, I] = Re(
    null
  ), [_, v] = Re(
    Je.DISCONNECTED
  ), [R, M] = Re(0), [L, b] = Re(!0), j = ge(null), $ = ge(l), H = ge(u), te = ge(c), de = ge(d), G = ge(f), N = ge(h), P = ge(t), F = ge(e), Z = ge(n), ue = ge(r), oe = ge(i), ee = ge(a), C = ge(a);
  Fe(() => {
    JSON.stringify(a) !== JSON.stringify(ee.current) && (ee.current = a, C.current = a);
  }, [a]);
  const W = ge(
    s
  ), V = ge(
    s
  );
  Fe(() => {
    JSON.stringify(s) !== JSON.stringify(W.current) && (W.current = s, V.current = s);
  }, [s]);
  const y = ge(o), Q = ge(
    o
  );
  Fe(() => {
    JSON.stringify(o) !== JSON.stringify(y.current) && (y.current = o, Q.current = o, j.current && o && j.current.updateContextHelpers(o));
  }, [o]), Fe(() => {
    $.current = l, H.current = u, te.current = c, de.current = d, G.current = f, N.current = h, P.current = t, F.current = e, Z.current = n, ue.current = r, oe.current = i;
  }, [
    l,
    u,
    c,
    d,
    f,
    h,
    t,
    e,
    n,
    r,
    i
  ]);
  const K = Ze(() => {
    const _e = C.current;
    return _e && _e.length > 0 ? _e.map(({ execute: me, ...De }) => De) : [];
  }, [C.current]), fe = Ze(() => {
    if (a && a.length > 0) {
      const _e = {};
      return a.forEach((me) => {
        _e[me.name] = me.execute;
      }), _e;
    }
    return {};
  }, [a]);
  Fe(() => {
    j.current && Object.keys(fe).length > 0 && j.current.updateClientTools(fe);
  }, [fe]);
  const he = ge(), le = ce(async () => {
    var _e;
    try {
      if (!navigator.onLine)
        throw v(Je.DISCONNECTED), b(!1), new Error("No internet connection. Please check your network and try again.");
      if (v(Je.CONNECTING), !P.current)
        throw new Error("userMpAuthToken is required");
      if (!F.current)
        throw new Error("chatServerUrl is required");
      if (!Z.current)
        throw new Error("chatServerKey is required");
      const me = new Vu();
      j.current = me, I(me);
      const De = Q.current || {};
      await me.onInit({
        // Authentication and server properties (from refs)
        userMpAuthToken: P.current,
        chatServerUrl: F.current,
        chatServerKey: Z.current,
        entityId: ue.current,
        entityType: (_e = oe.current) == null ? void 0 : _e.toString(),
        // Tools configuration
        toolSchemas: K,
        clientTools: fe,
        componentSchemas: V.current,
        contextHelpers: De,
        onSetMessage: $.current,
        onSystemEvent: H.current,
        onReasoningUpdate: te.current,
        onUIComponent: (je) => {
          var Ne;
          return (Ne = de.current) == null ? void 0 : Ne.call(de, je);
        },
        onThreadCreated: G.current,
        onMessagesPersisted: N.current,
        onError: w
      }), v(Je.CONNECTED), b(!1);
    } catch (me) {
      const De = $n(me, "WebSocketConnection");
      v(Je.DISCONNECTED), De.isRetryable ? setTimeout(() => {
        var je;
        (j.current === null || !j.current.getConnectionStatus().connected) && ((je = he.current) == null || je.call(he));
      }, 2e3) : b(!1);
    }
  }, [
    K,
    fe
    // All other props use refs to prevent reconnections
    // connectChatClient only recreates when tools change
  ]), Te = ce(() => {
    j.current && (j.current.disconnect(), j.current = null), I(null), v(Je.DISCONNECTED);
  }, []);
  he.current = le;
  const Ie = ge(!1);
  return Fe(() => (Ie.current || (Ie.current = !0, le()), () => {
    Te();
  }), []), Fe(() => {
    const _e = setInterval(() => {
      if (j.current) {
        const me = j.current.getConnectionStatus();
        if (L && _ === Je.CONNECTING)
          return;
        me.connected && _ !== Je.CONNECTED ? v(Je.CONNECTED) : me.isReconnecting && _ !== Je.RECONNECTING ? v(Je.RECONNECTING) : !me.connected && !me.isReconnecting && _ !== Je.DISCONNECTED && v(Je.DISCONNECTED), M(me.reconnectAttempts);
      }
    }, 1e3);
    return () => clearInterval(_e);
  }, [_, L]), {
    chatClient: k,
    connectionState: _,
    reconnectAttempts: R,
    isInitialConnection: L,
    connectChatClient: le,
    disconnectChatClient: Te
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: Lo,
  setPrototypeOf: Ya,
  isFrozen: Wu,
  getPrototypeOf: Gu,
  getOwnPropertyDescriptor: qu
} = Object;
let {
  freeze: ht,
  seal: Ot,
  create: $i
} = Object, {
  apply: Bi,
  construct: ji
} = typeof Reflect < "u" && Reflect;
ht || (ht = function(e) {
  return e;
});
Ot || (Ot = function(e) {
  return e;
});
Bi || (Bi = function(e, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return e.apply(n, i);
});
ji || (ji = function(e) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new e(...r);
});
const Tr = pt(Array.prototype.forEach), Ku = pt(Array.prototype.lastIndexOf), Xa = pt(Array.prototype.pop), Qn = pt(Array.prototype.push), Yu = pt(Array.prototype.splice), Lr = pt(String.prototype.toLowerCase), ui = pt(String.prototype.toString), di = pt(String.prototype.match), er = pt(String.prototype.replace), Xu = pt(String.prototype.indexOf), Ju = pt(String.prototype.trim), Ft = pt(Object.prototype.hasOwnProperty), dt = pt(RegExp.prototype.test), tr = Qu(TypeError);
function pt(t) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Bi(t, e, r);
  };
}
function Qu(t) {
  return function() {
    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
      n[r] = arguments[r];
    return ji(t, n);
  };
}
function Ee(t, e) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Lr;
  Ya && Ya(t, null);
  let r = e.length;
  for (; r--; ) {
    let i = e[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (Wu(e) || (e[r] = a), i = a);
    }
    t[i] = !0;
  }
  return t;
}
function ed(t) {
  for (let e = 0; e < t.length; e++)
    Ft(t, e) || (t[e] = null);
  return t;
}
function tn(t) {
  const e = $i(null);
  for (const [n, r] of Lo(t))
    Ft(t, n) && (Array.isArray(r) ? e[n] = ed(r) : r && typeof r == "object" && r.constructor === Object ? e[n] = tn(r) : e[n] = r);
  return e;
}
function nr(t, e) {
  for (; t !== null; ) {
    const r = qu(t, e);
    if (r) {
      if (r.get)
        return pt(r.get);
      if (typeof r.value == "function")
        return pt(r.value);
    }
    t = Gu(t);
  }
  function n() {
    return null;
  }
  return n;
}
const Ja = ht(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), hi = ht(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), pi = ht(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), td = ht(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), fi = ht(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), nd = ht(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Qa = ht(["#text"]), es = ht(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), gi = ht(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), ts = ht(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Er = ht(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), rd = Ot(/\{\{[\w\W]*|[\w\W]*\}\}/gm), id = Ot(/<%[\w\W]*|[\w\W]*%>/gm), ad = Ot(/\$\{[\w\W]*/gm), sd = Ot(/^data-[\-\w.\u00B7-\uFFFF]+$/), od = Ot(/^aria-[\-\w]+$/), Po = Ot(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), ld = Ot(/^(?:\w+script|data):/i), cd = Ot(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Do = Ot(/^html$/i), ud = Ot(/^[a-z][.\w]*(-[.\w]+)+$/i);
var ns = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: od,
  ATTR_WHITESPACE: cd,
  CUSTOM_ELEMENT: ud,
  DATA_ATTR: sd,
  DOCTYPE_NAME: Do,
  ERB_EXPR: id,
  IS_ALLOWED_URI: Po,
  IS_SCRIPT_OR_DATA: ld,
  MUSTACHE_EXPR: rd,
  TMPLIT_EXPR: ad
});
const rr = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, dd = function() {
  return typeof window > "u" ? null : window;
}, hd = function(e, n) {
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
}, rs = function() {
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
function Fo() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : dd();
  const e = (q) => Fo(q);
  if (e.version = "3.3.0", e.removed = [], !t || !t.document || t.document.nodeType !== rr.document || !t.Element)
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
    DOMParser: f,
    trustedTypes: h
  } = t, w = l.prototype, k = nr(w, "cloneNode"), I = nr(w, "remove"), _ = nr(w, "nextSibling"), v = nr(w, "childNodes"), R = nr(w, "parentNode");
  if (typeof s == "function") {
    const q = n.createElement("template");
    q.content && q.content.ownerDocument && (n = q.content.ownerDocument);
  }
  let M, L = "";
  const {
    implementation: b,
    createNodeIterator: j,
    createDocumentFragment: $,
    getElementsByTagName: H
  } = n, {
    importNode: te
  } = r;
  let de = rs();
  e.isSupported = typeof Lo == "function" && typeof R == "function" && b && b.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: G,
    ERB_EXPR: N,
    TMPLIT_EXPR: P,
    DATA_ATTR: F,
    ARIA_ATTR: Z,
    IS_SCRIPT_OR_DATA: ue,
    ATTR_WHITESPACE: oe,
    CUSTOM_ELEMENT: ee
  } = ns;
  let {
    IS_ALLOWED_URI: C
  } = ns, W = null;
  const V = Ee({}, [...Ja, ...hi, ...pi, ...fi, ...Qa]);
  let y = null;
  const Q = Ee({}, [...es, ...gi, ...ts, ...Er]);
  let K = Object.seal($i(null, {
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
  })), fe = null, he = null;
  const le = Object.seal($i(null, {
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
  let Te = !0, Ie = !0, _e = !1, me = !0, De = !1, je = !0, Ne = !1, vt = !1, Qt = !1, Lt = !1, Ut = !1, $t = !1, yn = !0, wn = !1;
  const Wn = "user-content-";
  let Cn = !0, Bt = !1, T = {}, E = null;
  const X = Ee({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let Ce = null;
  const be = Ee({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ge = null;
  const Tt = Ee({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), at = "http://www.w3.org/1998/Math/MathML", Et = "http://www.w3.org/2000/svg", nt = "http://www.w3.org/1999/xhtml";
  let Se = nt, et = !1, st = null;
  const an = Ee({}, [at, Et, nt], ui);
  let xn = Ee({}, ["mi", "mo", "mn", "ms", "mtext"]), sn = Ee({}, ["annotation-xml"]);
  const ii = Ee({}, ["title", "style", "font", "a", "script"]);
  let Rt = null;
  const Rn = ["application/xhtml+xml", "text/html"], Gn = "text/html";
  let Ke = null, on = null;
  const ai = n.createElement("form"), qn = function(x) {
    return x instanceof RegExp || x instanceof Function;
  }, In = function() {
    let x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(on && on === x)) {
      if ((!x || typeof x != "object") && (x = {}), x = tn(x), Rt = // eslint-disable-next-line unicorn/prefer-includes
      Rn.indexOf(x.PARSER_MEDIA_TYPE) === -1 ? Gn : x.PARSER_MEDIA_TYPE, Ke = Rt === "application/xhtml+xml" ? ui : Lr, W = Ft(x, "ALLOWED_TAGS") ? Ee({}, x.ALLOWED_TAGS, Ke) : V, y = Ft(x, "ALLOWED_ATTR") ? Ee({}, x.ALLOWED_ATTR, Ke) : Q, st = Ft(x, "ALLOWED_NAMESPACES") ? Ee({}, x.ALLOWED_NAMESPACES, ui) : an, Ge = Ft(x, "ADD_URI_SAFE_ATTR") ? Ee(tn(Tt), x.ADD_URI_SAFE_ATTR, Ke) : Tt, Ce = Ft(x, "ADD_DATA_URI_TAGS") ? Ee(tn(be), x.ADD_DATA_URI_TAGS, Ke) : be, E = Ft(x, "FORBID_CONTENTS") ? Ee({}, x.FORBID_CONTENTS, Ke) : X, fe = Ft(x, "FORBID_TAGS") ? Ee({}, x.FORBID_TAGS, Ke) : tn({}), he = Ft(x, "FORBID_ATTR") ? Ee({}, x.FORBID_ATTR, Ke) : tn({}), T = Ft(x, "USE_PROFILES") ? x.USE_PROFILES : !1, Te = x.ALLOW_ARIA_ATTR !== !1, Ie = x.ALLOW_DATA_ATTR !== !1, _e = x.ALLOW_UNKNOWN_PROTOCOLS || !1, me = x.ALLOW_SELF_CLOSE_IN_ATTR !== !1, De = x.SAFE_FOR_TEMPLATES || !1, je = x.SAFE_FOR_XML !== !1, Ne = x.WHOLE_DOCUMENT || !1, Lt = x.RETURN_DOM || !1, Ut = x.RETURN_DOM_FRAGMENT || !1, $t = x.RETURN_TRUSTED_TYPE || !1, Qt = x.FORCE_BODY || !1, yn = x.SANITIZE_DOM !== !1, wn = x.SANITIZE_NAMED_PROPS || !1, Cn = x.KEEP_CONTENT !== !1, Bt = x.IN_PLACE || !1, C = x.ALLOWED_URI_REGEXP || Po, Se = x.NAMESPACE || nt, xn = x.MATHML_TEXT_INTEGRATION_POINTS || xn, sn = x.HTML_INTEGRATION_POINTS || sn, K = x.CUSTOM_ELEMENT_HANDLING || {}, x.CUSTOM_ELEMENT_HANDLING && qn(x.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (K.tagNameCheck = x.CUSTOM_ELEMENT_HANDLING.tagNameCheck), x.CUSTOM_ELEMENT_HANDLING && qn(x.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (K.attributeNameCheck = x.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), x.CUSTOM_ELEMENT_HANDLING && typeof x.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (K.allowCustomizedBuiltInElements = x.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), De && (Ie = !1), Ut && (Lt = !0), T && (W = Ee({}, Qa), y = [], T.html === !0 && (Ee(W, Ja), Ee(y, es)), T.svg === !0 && (Ee(W, hi), Ee(y, gi), Ee(y, Er)), T.svgFilters === !0 && (Ee(W, pi), Ee(y, gi), Ee(y, Er)), T.mathMl === !0 && (Ee(W, fi), Ee(y, ts), Ee(y, Er))), x.ADD_TAGS && (typeof x.ADD_TAGS == "function" ? le.tagCheck = x.ADD_TAGS : (W === V && (W = tn(W)), Ee(W, x.ADD_TAGS, Ke))), x.ADD_ATTR && (typeof x.ADD_ATTR == "function" ? le.attributeCheck = x.ADD_ATTR : (y === Q && (y = tn(y)), Ee(y, x.ADD_ATTR, Ke))), x.ADD_URI_SAFE_ATTR && Ee(Ge, x.ADD_URI_SAFE_ATTR, Ke), x.FORBID_CONTENTS && (E === X && (E = tn(E)), Ee(E, x.FORBID_CONTENTS, Ke)), Cn && (W["#text"] = !0), Ne && Ee(W, ["html", "head", "body"]), W.table && (Ee(W, ["tbody"]), delete fe.tbody), x.TRUSTED_TYPES_POLICY) {
        if (typeof x.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw tr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof x.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw tr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        M = x.TRUSTED_TYPES_POLICY, L = M.createHTML("");
      } else
        M === void 0 && (M = hd(h, i)), M !== null && typeof L == "string" && (L = M.createHTML(""));
      ht && ht(x), on = x;
    }
  }, Kn = Ee({}, [...hi, ...pi, ...td]), Yn = Ee({}, [...fi, ...nd]), _r = function(x) {
    let D = R(x);
    (!D || !D.tagName) && (D = {
      namespaceURI: Se,
      tagName: "template"
    });
    const ae = Lr(x.tagName), Ve = Lr(D.tagName);
    return st[x.namespaceURI] ? x.namespaceURI === Et ? D.namespaceURI === nt ? ae === "svg" : D.namespaceURI === at ? ae === "svg" && (Ve === "annotation-xml" || xn[Ve]) : !!Kn[ae] : x.namespaceURI === at ? D.namespaceURI === nt ? ae === "math" : D.namespaceURI === Et ? ae === "math" && sn[Ve] : !!Yn[ae] : x.namespaceURI === nt ? D.namespaceURI === Et && !sn[Ve] || D.namespaceURI === at && !xn[Ve] ? !1 : !Yn[ae] && (ii[ae] || !Kn[ae]) : !!(Rt === "application/xhtml+xml" && st[x.namespaceURI]) : !1;
  }, xt = function(x) {
    Qn(e.removed, {
      element: x
    });
    try {
      R(x).removeChild(x);
    } catch {
      I(x);
    }
  }, jt = function(x, D) {
    try {
      Qn(e.removed, {
        attribute: D.getAttributeNode(x),
        from: D
      });
    } catch {
      Qn(e.removed, {
        attribute: null,
        from: D
      });
    }
    if (D.removeAttribute(x), x === "is")
      if (Lt || Ut)
        try {
          xt(D);
        } catch {
        }
      else
        try {
          D.setAttribute(x, "");
        } catch {
        }
  }, Xn = function(x) {
    let D = null, ae = null;
    if (Qt)
      x = "<remove></remove>" + x;
    else {
      const Ye = di(x, /^[\r\n\t ]+/);
      ae = Ye && Ye[0];
    }
    Rt === "application/xhtml+xml" && Se === nt && (x = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + x + "</body></html>");
    const Ve = M ? M.createHTML(x) : x;
    if (Se === nt)
      try {
        D = new f().parseFromString(Ve, Rt);
      } catch {
      }
    if (!D || !D.documentElement) {
      D = b.createDocument(Se, "template", null);
      try {
        D.documentElement.innerHTML = et ? L : Ve;
      } catch {
      }
    }
    const ot = D.body || D.documentElement;
    return x && ae && ot.insertBefore(n.createTextNode(ae), ot.childNodes[0] || null), Se === nt ? H.call(D, Ne ? "html" : "body")[0] : Ne ? D.documentElement : ot;
  }, Sr = function(x) {
    return j.call(
      x.ownerDocument || x,
      x,
      // eslint-disable-next-line no-bitwise
      u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT | u.SHOW_PROCESSING_INSTRUCTION | u.SHOW_CDATA_SECTION,
      null
    );
  }, br = function(x) {
    return x instanceof d && (typeof x.nodeName != "string" || typeof x.textContent != "string" || typeof x.removeChild != "function" || !(x.attributes instanceof c) || typeof x.removeAttribute != "function" || typeof x.setAttribute != "function" || typeof x.namespaceURI != "string" || typeof x.insertBefore != "function" || typeof x.hasChildNodes != "function");
  }, Jn = function(x) {
    return typeof o == "function" && x instanceof o;
  };
  function It(q, x, D) {
    Tr(q, (ae) => {
      ae.call(e, x, D, on);
    });
  }
  const A = function(x) {
    let D = null;
    if (It(de.beforeSanitizeElements, x, null), br(x))
      return xt(x), !0;
    const ae = Ke(x.nodeName);
    if (It(de.uponSanitizeElement, x, {
      tagName: ae,
      allowedTags: W
    }), je && x.hasChildNodes() && !Jn(x.firstElementChild) && dt(/<[/\w!]/g, x.innerHTML) && dt(/<[/\w!]/g, x.textContent) || x.nodeType === rr.progressingInstruction || je && x.nodeType === rr.comment && dt(/<[/\w]/g, x.data))
      return xt(x), !0;
    if (!(le.tagCheck instanceof Function && le.tagCheck(ae)) && (!W[ae] || fe[ae])) {
      if (!fe[ae] && qe(ae) && (K.tagNameCheck instanceof RegExp && dt(K.tagNameCheck, ae) || K.tagNameCheck instanceof Function && K.tagNameCheck(ae)))
        return !1;
      if (Cn && !E[ae]) {
        const Ve = R(x) || x.parentNode, ot = v(x) || x.childNodes;
        if (ot && Ve) {
          const Ye = ot.length;
          for (let gt = Ye - 1; gt >= 0; --gt) {
            const en = k(ot[gt], !0);
            en.__removalCount = (x.__removalCount || 0) + 1, Ve.insertBefore(en, _(x));
          }
        }
      }
      return xt(x), !0;
    }
    return x instanceof l && !_r(x) || (ae === "noscript" || ae === "noembed" || ae === "noframes") && dt(/<\/no(script|embed|frames)/i, x.innerHTML) ? (xt(x), !0) : (De && x.nodeType === rr.text && (D = x.textContent, Tr([G, N, P], (Ve) => {
      D = er(D, Ve, " ");
    }), x.textContent !== D && (Qn(e.removed, {
      element: x.cloneNode()
    }), x.textContent = D)), It(de.afterSanitizeElements, x, null), !1);
  }, Ae = function(x, D, ae) {
    if (yn && (D === "id" || D === "name") && (ae in n || ae in ai))
      return !1;
    if (!(Ie && !he[D] && dt(F, D))) {
      if (!(Te && dt(Z, D))) {
        if (!(le.attributeCheck instanceof Function && le.attributeCheck(D, x))) {
          if (!y[D] || he[D]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(qe(x) && (K.tagNameCheck instanceof RegExp && dt(K.tagNameCheck, x) || K.tagNameCheck instanceof Function && K.tagNameCheck(x)) && (K.attributeNameCheck instanceof RegExp && dt(K.attributeNameCheck, D) || K.attributeNameCheck instanceof Function && K.attributeNameCheck(D, x)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              D === "is" && K.allowCustomizedBuiltInElements && (K.tagNameCheck instanceof RegExp && dt(K.tagNameCheck, ae) || K.tagNameCheck instanceof Function && K.tagNameCheck(ae)))
            ) return !1;
          } else if (!Ge[D]) {
            if (!dt(C, er(ae, oe, ""))) {
              if (!((D === "src" || D === "xlink:href" || D === "href") && x !== "script" && Xu(ae, "data:") === 0 && Ce[x])) {
                if (!(_e && !dt(ue, er(ae, oe, "")))) {
                  if (ae)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, qe = function(x) {
    return x !== "annotation-xml" && di(x, ee);
  }, We = function(x) {
    It(de.beforeSanitizeAttributes, x, null);
    const {
      attributes: D
    } = x;
    if (!D || br(x))
      return;
    const ae = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: y,
      forceKeepAttr: void 0
    };
    let Ve = D.length;
    for (; Ve--; ) {
      const ot = D[Ve], {
        name: Ye,
        namespaceURI: gt,
        value: en
      } = ot, Nn = Ke(Ye), si = en;
      let rt = Ye === "value" ? si : Ju(si);
      if (ae.attrName = Nn, ae.attrValue = rt, ae.keepAttr = !0, ae.forceKeepAttr = void 0, It(de.uponSanitizeAttribute, x, ae), rt = ae.attrValue, wn && (Nn === "id" || Nn === "name") && (jt(Ye, x), rt = Wn + rt), je && dt(/((--!?|])>)|<\/(style|title|textarea)/i, rt)) {
        jt(Ye, x);
        continue;
      }
      if (Nn === "attributename" && di(rt, "href")) {
        jt(Ye, x);
        continue;
      }
      if (ae.forceKeepAttr)
        continue;
      if (!ae.keepAttr) {
        jt(Ye, x);
        continue;
      }
      if (!me && dt(/\/>/i, rt)) {
        jt(Ye, x);
        continue;
      }
      De && Tr([G, N, P], (Na) => {
        rt = er(rt, Na, " ");
      });
      const Ia = Ke(x.nodeName);
      if (!Ae(Ia, Nn, rt)) {
        jt(Ye, x);
        continue;
      }
      if (M && typeof h == "object" && typeof h.getAttributeType == "function" && !gt)
        switch (h.getAttributeType(Ia, Nn)) {
          case "TrustedHTML": {
            rt = M.createHTML(rt);
            break;
          }
          case "TrustedScriptURL": {
            rt = M.createScriptURL(rt);
            break;
          }
        }
      if (rt !== si)
        try {
          gt ? x.setAttributeNS(gt, Ye, rt) : x.setAttribute(Ye, rt), br(x) ? xt(x) : Xa(e.removed);
        } catch {
          jt(Ye, x);
        }
    }
    It(de.afterSanitizeAttributes, x, null);
  }, He = function q(x) {
    let D = null;
    const ae = Sr(x);
    for (It(de.beforeSanitizeShadowDOM, x, null); D = ae.nextNode(); )
      It(de.uponSanitizeShadowNode, D, null), A(D), We(D), D.content instanceof a && q(D.content);
    It(de.afterSanitizeShadowDOM, x, null);
  };
  return e.sanitize = function(q) {
    let x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, D = null, ae = null, Ve = null, ot = null;
    if (et = !q, et && (q = "<!-->"), typeof q != "string" && !Jn(q))
      if (typeof q.toString == "function") {
        if (q = q.toString(), typeof q != "string")
          throw tr("dirty is not a string, aborting");
      } else
        throw tr("toString is not a function");
    if (!e.isSupported)
      return q;
    if (vt || In(x), e.removed = [], typeof q == "string" && (Bt = !1), Bt) {
      if (q.nodeName) {
        const en = Ke(q.nodeName);
        if (!W[en] || fe[en])
          throw tr("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (q instanceof o)
      D = Xn("<!---->"), ae = D.ownerDocument.importNode(q, !0), ae.nodeType === rr.element && ae.nodeName === "BODY" || ae.nodeName === "HTML" ? D = ae : D.appendChild(ae);
    else {
      if (!Lt && !De && !Ne && // eslint-disable-next-line unicorn/prefer-includes
      q.indexOf("<") === -1)
        return M && $t ? M.createHTML(q) : q;
      if (D = Xn(q), !D)
        return Lt ? null : $t ? L : "";
    }
    D && Qt && xt(D.firstChild);
    const Ye = Sr(Bt ? q : D);
    for (; Ve = Ye.nextNode(); )
      A(Ve), We(Ve), Ve.content instanceof a && He(Ve.content);
    if (Bt)
      return q;
    if (Lt) {
      if (Ut)
        for (ot = $.call(D.ownerDocument); D.firstChild; )
          ot.appendChild(D.firstChild);
      else
        ot = D;
      return (y.shadowroot || y.shadowrootmode) && (ot = te.call(r, ot, !0)), ot;
    }
    let gt = Ne ? D.outerHTML : D.innerHTML;
    return Ne && W["!doctype"] && D.ownerDocument && D.ownerDocument.doctype && D.ownerDocument.doctype.name && dt(Do, D.ownerDocument.doctype.name) && (gt = "<!DOCTYPE " + D.ownerDocument.doctype.name + `>
` + gt), De && Tr([G, N, P], (en) => {
      gt = er(gt, en, " ");
    }), M && $t ? M.createHTML(gt) : gt;
  }, e.setConfig = function() {
    let q = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    In(q), vt = !0;
  }, e.clearConfig = function() {
    on = null, vt = !1;
  }, e.isValidAttribute = function(q, x, D) {
    on || In({});
    const ae = Ke(q), Ve = Ke(x);
    return Ae(ae, Ve, D);
  }, e.addHook = function(q, x) {
    typeof x == "function" && Qn(de[q], x);
  }, e.removeHook = function(q, x) {
    if (x !== void 0) {
      const D = Ku(de[q], x);
      return D === -1 ? void 0 : Yu(de[q], D, 1)[0];
    }
    return Xa(de[q]);
  }, e.removeHooks = function(q) {
    de[q] = [];
  }, e.removeAllHooks = function() {
    de = rs();
  }, e;
}
var zo = Fo();
const pd = {
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
function fd(t, e = "userMessage") {
  if (typeof t != "string")
    return console.warn("sanitizeInput received non-string input:", typeof t), "";
  if (!t.trim())
    return "";
  try {
    const n = pd[e], r = zo.sanitize(t, n);
    return Ho(r) ? (console.warn("Suspicious content detected and removed:", t), r.replace(/javascript:/gi, "").replace(/data:/gi, "")) : r;
  } catch (n) {
    return console.error("Error sanitizing input:", n), "";
  }
}
function Ho(t) {
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
function da(t, e = !1) {
  const n = "___NEWLINE___", r = t.replace(/\n/g, n);
  return fd(r, e ? "assistantMessage" : "userMessage").replace(new RegExp(n, "g"), `
`);
}
function gd(t) {
  return typeof t != "string" ? "" : t.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function is(t) {
  if (typeof t != "string") return !1;
  try {
    const e = new URL(t);
    return !(!["http:", "https:", "data:"].includes(e.protocol) || Ho(t));
  } catch {
    return !1;
  }
}
function md() {
  zo.addHook("beforeSanitizeAttributes", (t) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      t.hasAttribute(n) && t.removeAttribute(n);
    }), t.hasAttribute("href")) {
      const n = t.getAttribute("href");
      n && !is(n) && t.removeAttribute("href");
    }
    if (t.hasAttribute("src")) {
      const n = t.getAttribute("src");
      n && !is(n) && t.removeAttribute("src");
    }
  });
}
md();
function yd() {
  const [t, e] = Re([]), n = ce(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = ce(
    (s, o) => {
      const u = da(o, s === "assistant");
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
  ), i = ce((s, o) => {
    e(
      (l) => l.map((u) => u.id === s ? { ...u, ...o } : u)
    );
  }, []), a = ce(
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
const as = (t) => {
  let e;
  const n = /* @__PURE__ */ new Set(), r = (u, c) => {
    const d = typeof u == "function" ? u(e) : u;
    if (!Object.is(d, e)) {
      const f = e;
      e = c ?? (typeof d != "object" || d === null) ? d : Object.assign({}, e, d), n.forEach((h) => h(e, f));
    }
  }, i = () => e, o = { setState: r, getState: i, getInitialState: () => l, subscribe: (u) => (n.add(u), () => n.delete(u)) }, l = e = t(r, i, o);
  return o;
}, wd = (t) => t ? as(t) : as, Cd = (t) => t;
function xd(t, e = Cd) {
  const n = zt.useSyncExternalStore(
    t.subscribe,
    zt.useCallback(() => e(t.getState()), [t, e]),
    zt.useCallback(() => e(t.getInitialState()), [t, e])
  );
  return zt.useDebugValue(n), n;
}
const kd = (t) => {
  const e = wd(t), n = (r) => xd(e, r);
  return Object.assign(n, e), n;
}, _d = (t) => kd, ss = { BASE_URL: "/", DEV: !0, MODE: "production", PROD: !1, SSR: !1, VITE_APP_TOLGEE_API_KEY: "tgpak_ge4v6ytcm5xtozdlobzxk4twgyzwqntjoe3xi4bwozygu5q", VITE_APP_TOLGEE_API_URL: "https://tolgee-translation.oddleapp.com", VITE_APP_TOLGEE_PROJECT_ID: "19", VITE_USER_NODE_ENV: "development" }, mr = /* @__PURE__ */ new Map(), Rr = (t) => {
  const e = mr.get(t);
  return e ? Object.fromEntries(
    Object.entries(e.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, Sd = (t, e, n) => {
  if (t === void 0)
    return {
      type: "untracked",
      connection: e.connect(n)
    };
  const r = mr.get(n.name);
  if (r)
    return { type: "tracked", store: t, ...r };
  const i = {
    connection: e.connect(n),
    stores: {}
  };
  return mr.set(n.name, i), { type: "tracked", store: t, ...i };
}, bd = (t, e) => {
  if (e === void 0) return;
  const n = mr.get(t);
  n && (delete n.stores[e], Object.keys(n.stores).length === 0 && mr.delete(t));
}, vd = (t) => {
  var e, n;
  if (!t) return;
  const r = t.split(`
`), i = r.findIndex(
    (s) => s.includes("api.setState")
  );
  if (i < 0) return;
  const a = ((e = r[i + 1]) == null ? void 0 : e.trim()) || "";
  return (n = /.+ (.+) .+/.exec(a)) == null ? void 0 : n[1];
}, Td = (t, e = {}) => (n, r, i) => {
  const { enabled: a, anonymousActionType: s, store: o, ...l } = e;
  let u;
  try {
    u = (a ?? (ss ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!u)
    return t(n, r, i);
  const { connection: c, ...d } = Sd(o, u, l);
  let f = !0;
  i.setState = (k, I, _) => {
    const v = n(k, I);
    if (!f) return v;
    const R = _ === void 0 ? {
      type: s || vd(new Error().stack) || "anonymous"
    } : typeof _ == "string" ? { type: _ } : _;
    return o === void 0 ? (c == null || c.send(R, r()), v) : (c == null || c.send(
      {
        ...R,
        type: `${o}/${R.type}`
      },
      {
        ...Rr(l.name),
        [o]: i.getState()
      }
    ), v);
  }, i.devtools = {
    cleanup: () => {
      c && typeof c.unsubscribe == "function" && c.unsubscribe(), bd(l.name, o);
    }
  };
  const h = (...k) => {
    const I = f;
    f = !1, n(...k), f = I;
  }, w = t(i.setState, r, i);
  if (d.type === "untracked" ? c == null || c.init(w) : (d.stores[d.store] = i, c == null || c.init(
    Object.fromEntries(
      Object.entries(d.stores).map(([k, I]) => [
        k,
        k === d.store ? w : I.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let k = !1;
    const I = i.dispatch;
    i.dispatch = (..._) => {
      (ss ? "production" : void 0) !== "production" && _[0].type === "__setState" && !k && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), k = !0), I(..._);
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
        return mi(
          k.payload,
          (_) => {
            if (_.type === "__setState") {
              if (o === void 0) {
                h(_.state);
                return;
              }
              Object.keys(_.state).length !== 1 && console.error(
                `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
              );
              const v = _.state[o];
              if (v == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(v) && h(v);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(_);
          }
        );
      case "DISPATCH":
        switch (k.payload.type) {
          case "RESET":
            return h(w), o === void 0 ? c == null ? void 0 : c.init(i.getState()) : c == null ? void 0 : c.init(Rr(l.name));
          case "COMMIT":
            if (o === void 0) {
              c == null || c.init(i.getState());
              return;
            }
            return c == null ? void 0 : c.init(Rr(l.name));
          case "ROLLBACK":
            return mi(k.state, (_) => {
              if (o === void 0) {
                h(_), c == null || c.init(i.getState());
                return;
              }
              h(_[o]), c == null || c.init(Rr(l.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return mi(k.state, (_) => {
              if (o === void 0) {
                h(_);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(_[o]) && h(_[o]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: _ } = k.payload, v = (I = _.computedStates.slice(-1)[0]) == null ? void 0 : I.state;
            if (!v) return;
            h(o === void 0 ? v : v[o]), c == null || c.send(
              null,
              // FIXME no-any
              _
            );
            return;
          }
          case "PAUSE_RECORDING":
            return f = !f;
        }
        return;
    }
  }), w;
}, Ed = Td, mi = (t, e) => {
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
}, Rd = (t) => ({
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
}), Id = (t) => ({
  // Initial state
  chatStatus: Ue.IDLE,
  streamingStatus: _t.IDLE,
  // Actions
  setChatStatus: (e) => t({ chatStatus: e }),
  setStreamingStatus: (e) => t({ streamingStatus: e }),
  resetChatStatus: () => t({
    chatStatus: Ue.IDLE,
    streamingStatus: _t.IDLE
  })
}), Nd = (t) => ({
  // Initial state
  isLoadingConversation: !1,
  conversationError: null,
  // Actions
  setIsLoadingConversation: (e) => t({ isLoadingConversation: e }),
  setConversationError: (e) => t({ conversationError: e }),
  clearConversationError: () => t({ conversationError: null })
}), Ad = (t) => ({
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
}), Od = (t) => ({
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
}), ye = _d()(
  Ed(
    (...t) => ({
      ...Rd(...t),
      ...Id(...t),
      ...Nd(...t),
      ...Ad(...t),
      ...Od(...t)
    }),
    {
      name: "ChatUI-Store"
    }
  )
), E0 = () => ye((t) => ({
  isModalOpen: t.isModalOpen,
  isCollapsed: t.isCollapsed,
  currentMode: t.currentMode,
  openModal: t.openModal,
  closeModal: t.closeModal,
  toggleCollapse: t.toggleCollapse,
  toggleFullscreen: t.toggleFullscreen
})), R0 = () => ye((t) => ({
  chatStatus: t.chatStatus,
  streamingStatus: t.streamingStatus,
  setChatStatus: t.setChatStatus,
  setStreamingStatus: t.setStreamingStatus,
  resetChatStatus: t.resetChatStatus
})), I0 = () => ye((t) => ({
  isLoadingConversation: t.isLoadingConversation,
  conversationError: t.conversationError,
  setIsLoadingConversation: t.setIsLoadingConversation,
  setConversationError: t.setConversationError,
  clearConversationError: t.clearConversationError
})), N0 = () => ye((t) => ({
  currentThreadId: t.currentThreadId,
  providerResId: t.providerResId,
  setCurrentThreadId: t.setCurrentThreadId,
  setProviderResId: t.setProviderResId,
  clearThreadData: t.clearThreadData
}));
function Md() {
  const t = ye((v) => v.isStreaming), e = ye((v) => v.setIsStreaming), n = ye((v) => v.isThinking), r = ye((v) => v.setIsThinking), i = ye((v) => v.streamingContent), a = ye((v) => v.setStreamingContent), s = ye((v) => v.isHandlingTool), o = ye((v) => v.setIsHandlingTool), l = ye((v) => v.startStreaming), u = ye((v) => v.stopStreaming), c = ye((v) => v.clearStreamingBuffers), d = ye((v) => v.resetToolHandling), f = ge(""), h = Ze(() => ({
    get current() {
      return ye.getState().currentAssistantMessageId;
    },
    set current(v) {
      ye.getState().setCurrentAssistantMessageId(v);
    }
  }), []), w = ce((v) => {
    v ? l(v) : (e(!0), r(!0), a("")), f.current = "";
  }, [l, e, r, a]), k = ce(() => {
    u(), f.current = "";
  }, [u]), I = ce(() => {
    d();
  }, [d]), _ = ce(() => {
    c(), f.current = "";
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
    streamingContentRef: f,
    // Actions
    startStreaming: w,
    stopStreaming: k,
    resetToolHandling: I,
    clearStreamingBuffers: _
  };
}
const we = (t) => typeof t == "string", ir = () => {
  let t, e;
  const n = new Promise((r, i) => {
    t = r, e = i;
  });
  return n.resolve = t, n.reject = e, n;
}, os = (t) => t == null ? "" : "" + t, Ld = (t, e, n) => {
  t.forEach((r) => {
    e[r] && (n[r] = e[r]);
  });
}, Pd = /###/g, ls = (t) => t && t.indexOf("###") > -1 ? t.replace(Pd, ".") : t, cs = (t) => !t || we(t), lr = (t, e, n) => {
  const r = we(e) ? e.split(".") : e;
  let i = 0;
  for (; i < r.length - 1; ) {
    if (cs(t)) return {};
    const a = ls(r[i]);
    !t[a] && n && (t[a] = new n()), Object.prototype.hasOwnProperty.call(t, a) ? t = t[a] : t = {}, ++i;
  }
  return cs(t) ? {} : {
    obj: t,
    k: ls(r[i])
  };
}, us = (t, e, n) => {
  const {
    obj: r,
    k: i
  } = lr(t, e, Object);
  if (r !== void 0 || e.length === 1) {
    r[i] = n;
    return;
  }
  let a = e[e.length - 1], s = e.slice(0, e.length - 1), o = lr(t, s, Object);
  for (; o.obj === void 0 && s.length; )
    a = `${s[s.length - 1]}.${a}`, s = s.slice(0, s.length - 1), o = lr(t, s, Object), o != null && o.obj && typeof o.obj[`${o.k}.${a}`] < "u" && (o.obj = void 0);
  o.obj[`${o.k}.${a}`] = n;
}, Dd = (t, e, n, r) => {
  const {
    obj: i,
    k: a
  } = lr(t, e, Object);
  i[a] = i[a] || [], i[a].push(n);
}, Vr = (t, e) => {
  const {
    obj: n,
    k: r
  } = lr(t, e);
  if (n && Object.prototype.hasOwnProperty.call(n, r))
    return n[r];
}, Fd = (t, e, n) => {
  const r = Vr(t, n);
  return r !== void 0 ? r : Vr(e, n);
}, Uo = (t, e, n) => {
  for (const r in e)
    r !== "__proto__" && r !== "constructor" && (r in t ? we(t[r]) || t[r] instanceof String || we(e[r]) || e[r] instanceof String ? n && (t[r] = e[r]) : Uo(t[r], e[r], n) : t[r] = e[r]);
  return t;
}, An = (t) => t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var zd = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
const Hd = (t) => we(t) ? t.replace(/[&<>"'\/]/g, (e) => zd[e]) : t;
class Ud {
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
const $d = [" ", ",", "?", "!", ";"], Bd = new Ud(20), jd = (t, e, n) => {
  e = e || "", n = n || "";
  const r = $d.filter((s) => e.indexOf(s) < 0 && n.indexOf(s) < 0);
  if (r.length === 0) return !0;
  const i = Bd.getRegExp(`(${r.map((s) => s === "?" ? "\\?" : s).join("|")})`);
  let a = !i.test(t);
  if (!a) {
    const s = t.indexOf(n);
    s > 0 && !i.test(t.substring(0, s)) && (a = !0);
  }
  return a;
}, Vi = (t, e, n = ".") => {
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
}, yr = (t) => t == null ? void 0 : t.replace("_", "-"), Vd = {
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
class Zr {
  constructor(e, n = {}) {
    this.init(e, n);
  }
  init(e, n = {}) {
    this.prefix = n.prefix || "i18next:", this.logger = e || Vd, this.options = n, this.debug = n.debug;
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
    return i && !this.debug ? null : (we(e[0]) && (e[0] = `${r}${this.prefix} ${e[0]}`), this.logger[n](e));
  }
  create(e) {
    return new Zr(this.logger, {
      prefix: `${this.prefix}:${e}:`,
      ...this.options
    });
  }
  clone(e) {
    return e = e || this.options, e.prefix = e.prefix || this.prefix, new Zr(this.logger, e);
  }
}
var Kt = new Zr();
class Qr {
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
class ds extends Qr {
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
    e.indexOf(".") > -1 ? o = e.split(".") : (o = [e, n], r && (Array.isArray(r) ? o.push(...r) : we(r) && a ? o.push(...r.split(a)) : o.push(r)));
    const l = Vr(this.data, o);
    return !l && !n && !r && e.indexOf(".") > -1 && (e = o[0], n = o[1], r = o.slice(2).join(".")), l || !s || !we(r) ? l : Vi((c = (u = this.data) == null ? void 0 : u[e]) == null ? void 0 : c[n], r, a);
  }
  addResource(e, n, r, i, a = {
    silent: !1
  }) {
    const s = a.keySeparator !== void 0 ? a.keySeparator : this.options.keySeparator;
    let o = [e, n];
    r && (o = o.concat(s ? r.split(s) : r)), e.indexOf(".") > -1 && (o = e.split("."), i = n, n = o[1]), this.addNamespaces(n), us(this.data, o, i), a.silent || this.emit("added", e, n, r, i);
  }
  addResources(e, n, r, i = {
    silent: !1
  }) {
    for (const a in r)
      (we(r[a]) || Array.isArray(r[a])) && this.addResource(e, n, a, r[a], {
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
    let l = Vr(this.data, o) || {};
    s.skipCopy || (r = JSON.parse(JSON.stringify(r))), i ? Uo(l, r, a) : l = {
      ...l,
      ...r
    }, us(this.data, o, l), s.silent || this.emit("added", e, n, r);
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
var $o = {
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
const Bo = Symbol("i18next/PATH_KEY");
function Zd() {
  const t = [], e = /* @__PURE__ */ Object.create(null);
  let n;
  return e.get = (r, i) => {
    var a;
    return (a = n == null ? void 0 : n.revoke) == null || a.call(n), i === Bo ? t : (t.push(i), n = Proxy.revocable(r, e), n.proxy);
  }, Proxy.revocable(/* @__PURE__ */ Object.create(null), e).proxy;
}
function Zi(t, e) {
  const {
    [Bo]: n
  } = t(Zd());
  return n.join((e == null ? void 0 : e.keySeparator) ?? ".");
}
const hs = {}, yi = (t) => !we(t) && typeof t != "boolean" && typeof t != "number";
class Wr extends Qr {
  constructor(e, n = {}) {
    super(), Ld(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = Kt.create("translator");
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
    const a = yi(i.res);
    return !(r.returnObjects === !1 && a);
  }
  extractFromKey(e, n) {
    let r = n.nsSeparator !== void 0 ? n.nsSeparator : this.options.nsSeparator;
    r === void 0 && (r = ":");
    const i = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator;
    let a = n.ns || this.options.defaultNS || [];
    const s = r && e.indexOf(r) > -1, o = !this.options.userDefinedKeySeparator && !n.keySeparator && !this.options.userDefinedNsSeparator && !n.nsSeparator && !jd(e, r, i);
    if (s && !o) {
      const l = e.match(this.interpolator.nestingRegexp);
      if (l && l.length > 0)
        return {
          key: e,
          namespaces: we(a) ? [a] : a
        };
      const u = e.split(r);
      (r !== i || r === i && this.options.ns.indexOf(u[0]) > -1) && (a = u.shift()), e = u.join(i);
    }
    return {
      key: e,
      namespaces: we(a) ? [a] : a
    };
  }
  translate(e, n, r) {
    let i = typeof n == "object" ? {
      ...n
    } : n;
    if (typeof i != "object" && this.options.overloadTranslationOptionHandler && (i = this.options.overloadTranslationOptionHandler(arguments)), typeof i == "object" && (i = {
      ...i
    }), i || (i = {}), e == null) return "";
    typeof e == "function" && (e = Zi(e, {
      ...this.options,
      ...i
    })), Array.isArray(e) || (e = [String(e)]);
    const a = i.returnDetails !== void 0 ? i.returnDetails : this.options.returnDetails, s = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator, {
      key: o,
      namespaces: l
    } = this.extractFromKey(e[e.length - 1], i), u = l[l.length - 1];
    let c = i.nsSeparator !== void 0 ? i.nsSeparator : this.options.nsSeparator;
    c === void 0 && (c = ":");
    const d = i.lng || this.language, f = i.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if ((d == null ? void 0 : d.toLowerCase()) === "cimode")
      return f ? a ? {
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
    let w = h == null ? void 0 : h.res;
    const k = (h == null ? void 0 : h.usedKey) || o, I = (h == null ? void 0 : h.exactUsedKey) || o, _ = ["[object Number]", "[object Function]", "[object RegExp]"], v = i.joinArrays !== void 0 ? i.joinArrays : this.options.joinArrays, R = !this.i18nFormat || this.i18nFormat.handleAsObject, M = i.count !== void 0 && !we(i.count), L = Wr.hasDefaultValue(i), b = M ? this.pluralResolver.getSuffix(d, i.count, i) : "", j = i.ordinal && M ? this.pluralResolver.getSuffix(d, i.count, {
      ordinal: !1
    }) : "", $ = M && !i.ordinal && i.count === 0, H = $ && i[`defaultValue${this.options.pluralSeparator}zero`] || i[`defaultValue${b}`] || i[`defaultValue${j}`] || i.defaultValue;
    let te = w;
    R && !w && L && (te = H);
    const de = yi(te), G = Object.prototype.toString.apply(te);
    if (R && te && de && _.indexOf(G) < 0 && !(we(v) && Array.isArray(te))) {
      if (!i.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const N = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(k, te, {
          ...i,
          ns: l
        }) : `key '${o} (${this.language})' returned an object instead of string.`;
        return a ? (h.res = N, h.usedParams = this.getUsedParamsDetails(i), h) : N;
      }
      if (s) {
        const N = Array.isArray(te), P = N ? [] : {}, F = N ? I : k;
        for (const Z in te)
          if (Object.prototype.hasOwnProperty.call(te, Z)) {
            const ue = `${F}${s}${Z}`;
            L && !w ? P[Z] = this.translate(ue, {
              ...i,
              defaultValue: yi(H) ? H[Z] : void 0,
              joinArrays: !1,
              ns: l
            }) : P[Z] = this.translate(ue, {
              ...i,
              joinArrays: !1,
              ns: l
            }), P[Z] === ue && (P[Z] = te[Z]);
          }
        w = P;
      }
    } else if (R && we(v) && Array.isArray(w))
      w = w.join(v), w && (w = this.extendTranslation(w, e, i, r));
    else {
      let N = !1, P = !1;
      !this.isValidLookup(w) && L && (N = !0, w = H), this.isValidLookup(w) || (P = !0, w = o);
      const Z = (i.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && P ? void 0 : w, ue = L && H !== w && this.options.updateMissing;
      if (P || N || ue) {
        if (this.logger.log(ue ? "updateKey" : "missingKey", d, u, o, ue ? H : w), s) {
          const W = this.resolve(o, {
            ...i,
            keySeparator: !1
          });
          W && W.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let oe = [];
        const ee = this.languageUtils.getFallbackCodes(this.options.fallbackLng, i.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && ee && ee[0])
          for (let W = 0; W < ee.length; W++)
            oe.push(ee[W]);
        else this.options.saveMissingTo === "all" ? oe = this.languageUtils.toResolveHierarchy(i.lng || this.language) : oe.push(i.lng || this.language);
        const C = (W, V, y) => {
          var K;
          const Q = L && y !== w ? y : Z;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(W, u, V, Q, ue, i) : (K = this.backendConnector) != null && K.saveMissing && this.backendConnector.saveMissing(W, u, V, Q, ue, i), this.emit("missingKey", W, u, V, w);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && M ? oe.forEach((W) => {
          const V = this.pluralResolver.getSuffixes(W, i);
          $ && i[`defaultValue${this.options.pluralSeparator}zero`] && V.indexOf(`${this.options.pluralSeparator}zero`) < 0 && V.push(`${this.options.pluralSeparator}zero`), V.forEach((y) => {
            C([W], o + y, i[`defaultValue${y}`] || H);
          });
        }) : C(oe, o, H));
      }
      w = this.extendTranslation(w, e, i, h, r), P && w === o && this.options.appendNamespaceToMissingKey && (w = `${u}${c}${o}`), (P || N) && this.options.parseMissingKeyHandler && (w = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${u}${c}${o}` : o, N ? w : void 0, i));
    }
    return a ? (h.res = w, h.usedParams = this.getUsedParamsDetails(i), h) : w;
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
      const c = we(e) && (((u = r == null ? void 0 : r.interpolation) == null ? void 0 : u.skipOnVariables) !== void 0 ? r.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let d;
      if (c) {
        const h = e.match(this.interpolator.nestingRegexp);
        d = h && h.length;
      }
      let f = r.replace && !we(r.replace) ? r.replace : r;
      if (this.options.interpolation.defaultVariables && (f = {
        ...this.options.interpolation.defaultVariables,
        ...f
      }), e = this.interpolator.interpolate(e, f, r.lng || this.language || i.usedLng, r), c) {
        const h = e.match(this.interpolator.nestingRegexp), w = h && h.length;
        d < w && (r.nest = !1);
      }
      !r.lng && i && i.res && (r.lng = this.language || i.usedLng), r.nest !== !1 && (e = this.interpolator.nest(e, (...h) => (a == null ? void 0 : a[0]) === h[0] && !r.context ? (this.logger.warn(`It seems you are nesting recursively key: ${h[0]} in key: ${n[0]}`), null) : this.translate(...h, n), r)), r.interpolation && this.interpolator.reset();
    }
    const s = r.postProcess || this.options.postProcess, o = we(s) ? [s] : s;
    return e != null && (o != null && o.length) && r.applyPostProcessor !== !1 && (e = $o.handle(o, e, n, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: {
        ...i,
        usedParams: this.getUsedParamsDetails(r)
      },
      ...r
    } : r, this)), e;
  }
  resolve(e, n = {}) {
    let r, i, a, s, o;
    return we(e) && (e = [e]), e.forEach((l) => {
      if (this.isValidLookup(r)) return;
      const u = this.extractFromKey(l, n), c = u.key;
      i = c;
      let d = u.namespaces;
      this.options.fallbackNS && (d = d.concat(this.options.fallbackNS));
      const f = n.count !== void 0 && !we(n.count), h = f && !n.ordinal && n.count === 0, w = n.context !== void 0 && (we(n.context) || typeof n.context == "number") && n.context !== "", k = n.lngs ? n.lngs : this.languageUtils.toResolveHierarchy(n.lng || this.language, n.fallbackLng);
      d.forEach((I) => {
        var _, v;
        this.isValidLookup(r) || (o = I, !hs[`${k[0]}-${I}`] && ((_ = this.utils) != null && _.hasLoadedNamespace) && !((v = this.utils) != null && v.hasLoadedNamespace(o)) && (hs[`${k[0]}-${I}`] = !0, this.logger.warn(`key "${i}" for languages "${k.join(", ")}" won't get resolved as namespace "${o}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), k.forEach((R) => {
          var b;
          if (this.isValidLookup(r)) return;
          s = R;
          const M = [c];
          if ((b = this.i18nFormat) != null && b.addLookupKeys)
            this.i18nFormat.addLookupKeys(M, c, R, I, n);
          else {
            let j;
            f && (j = this.pluralResolver.getSuffix(R, n.count, n));
            const $ = `${this.options.pluralSeparator}zero`, H = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (f && (n.ordinal && j.indexOf(H) === 0 && M.push(c + j.replace(H, this.options.pluralSeparator)), M.push(c + j), h && M.push(c + $)), w) {
              const te = `${c}${this.options.contextSeparator || "_"}${n.context}`;
              M.push(te), f && (n.ordinal && j.indexOf(H) === 0 && M.push(te + j.replace(H, this.options.pluralSeparator)), M.push(te + j), h && M.push(te + $));
            }
          }
          let L;
          for (; L = M.pop(); )
            this.isValidLookup(r) || (a = L, r = this.getResource(R, I, L, n));
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
    const n = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"], r = e.replace && !we(e.replace);
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
class ps {
  constructor(e) {
    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = Kt.create("languageUtils");
  }
  getScriptPartFromCode(e) {
    if (e = yr(e), !e || e.indexOf("-") < 0) return null;
    const n = e.split("-");
    return n.length === 2 || (n.pop(), n[n.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(n.join("-"));
  }
  getLanguagePartFromCode(e) {
    if (e = yr(e), !e || e.indexOf("-") < 0) return e;
    const n = e.split("-");
    return this.formatLanguageCode(n[0]);
  }
  formatLanguageCode(e) {
    if (we(e) && e.indexOf("-") > -1) {
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
    if (typeof e == "function" && (e = e(n)), we(e) && (e = [e]), Array.isArray(e)) return e;
    if (!n) return e.default || [];
    let r = e[n];
    return r || (r = e[this.getScriptPartFromCode(n)]), r || (r = e[this.formatLanguageCode(n)]), r || (r = e[this.getLanguagePartFromCode(n)]), r || (r = e.default), r || [];
  }
  toResolveHierarchy(e, n) {
    const r = this.getFallbackCodes((n === !1 ? [] : n) || this.options.fallbackLng || [], e), i = [], a = (s) => {
      s && (this.isSupportedCode(s) ? i.push(s) : this.logger.warn(`rejecting language code not found in supportedLngs: ${s}`));
    };
    return we(e) && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && a(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && a(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && a(this.getLanguagePartFromCode(e))) : we(e) && a(this.formatLanguageCode(e)), r.forEach((s) => {
      i.indexOf(s) < 0 && a(this.formatLanguageCode(s));
    }), i;
  }
}
const fs = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
}, gs = {
  select: (t) => t === 1 ? "one" : "other",
  resolvedOptions: () => ({
    pluralCategories: ["one", "other"]
  })
};
class Wd {
  constructor(e, n = {}) {
    this.languageUtils = e, this.options = n, this.logger = Kt.create("pluralResolver"), this.pluralRulesCache = {};
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(e, n = {}) {
    const r = yr(e === "dev" ? "en" : e), i = n.ordinal ? "ordinal" : "cardinal", a = JSON.stringify({
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
        return this.logger.error("No Intl support, please use an Intl polyfill!"), gs;
      if (!e.match(/-|_/)) return gs;
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
    return r || (r = this.getRule("dev", n)), r ? r.resolvedOptions().pluralCategories.sort((i, a) => fs[i] - fs[a]).map((i) => `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${i}`) : [];
  }
  getSuffix(e, n, r = {}) {
    const i = this.getRule(e, r);
    return i ? `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${i.select(n)}` : (this.logger.warn(`no plural rule found for: ${e}`), this.getSuffix("dev", n, r));
  }
}
const ms = (t, e, n, r = ".", i = !0) => {
  let a = Fd(t, e, n);
  return !a && i && we(n) && (a = Vi(t, n, r), a === void 0 && (a = Vi(e, n, r))), a;
}, wi = (t) => t.replace(/\$/g, "$$$$");
class ys {
  constructor(e = {}) {
    var n;
    this.logger = Kt.create("interpolator"), this.options = e, this.format = ((n = e == null ? void 0 : e.interpolation) == null ? void 0 : n.format) || ((r) => r), this.init(e);
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
      nestingPrefix: f,
      nestingPrefixEscaped: h,
      nestingSuffix: w,
      nestingSuffixEscaped: k,
      nestingOptionsSeparator: I,
      maxReplaces: _,
      alwaysFormat: v
    } = e.interpolation;
    this.escape = n !== void 0 ? n : Hd, this.escapeValue = r !== void 0 ? r : !0, this.useRawValueToEscape = i !== void 0 ? i : !1, this.prefix = a ? An(a) : s || "{{", this.suffix = o ? An(o) : l || "}}", this.formatSeparator = u || ",", this.unescapePrefix = c ? "" : d || "-", this.unescapeSuffix = this.unescapePrefix ? "" : c || "", this.nestingPrefix = f ? An(f) : h || An("$t("), this.nestingSuffix = w ? An(w) : k || An(")"), this.nestingOptionsSeparator = I || ",", this.maxReplaces = _ || 1e3, this.alwaysFormat = v !== void 0 ? v : !1, this.resetRegExp();
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
    const l = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}, u = (w) => {
      if (w.indexOf(this.formatSeparator) < 0) {
        const v = ms(n, l, w, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(v, void 0, r, {
          ...i,
          ...n,
          interpolationkey: w
        }) : v;
      }
      const k = w.split(this.formatSeparator), I = k.shift().trim(), _ = k.join(this.formatSeparator).trim();
      return this.format(ms(n, l, I, this.options.keySeparator, this.options.ignoreJSONStructure), _, r, {
        ...i,
        ...n,
        interpolationkey: I
      });
    };
    this.resetRegExp();
    const c = (i == null ? void 0 : i.missingInterpolationHandler) || this.options.missingInterpolationHandler, d = ((h = i == null ? void 0 : i.interpolation) == null ? void 0 : h.skipOnVariables) !== void 0 ? i.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (w) => wi(w)
    }, {
      regex: this.regexp,
      safeValue: (w) => this.escapeValue ? wi(this.escape(w)) : wi(w)
    }].forEach((w) => {
      for (o = 0; a = w.regex.exec(e); ) {
        const k = a[1].trim();
        if (s = u(k), s === void 0)
          if (typeof c == "function") {
            const _ = c(e, a, i);
            s = we(_) ? _ : "";
          } else if (i && Object.prototype.hasOwnProperty.call(i, k))
            s = "";
          else if (d) {
            s = a[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${k} for interpolating ${e}`), s = "";
        else !we(s) && !this.useRawValueToEscape && (s = os(s));
        const I = w.safeValue(s);
        if (e = e.replace(a[0], I), d ? (w.regex.lastIndex += s.length, w.regex.lastIndex -= a[0].length) : w.regex.lastIndex = 0, o++, o >= this.maxReplaces)
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
      let f = `{${d[1]}`;
      l = d[0], f = this.interpolate(f, s);
      const h = f.match(/'/g), w = f.match(/"/g);
      (((h == null ? void 0 : h.length) ?? 0) % 2 === 0 && !w || w.length % 2 !== 0) && (f = f.replace(/'/g, '"'));
      try {
        s = JSON.parse(f), u && (s = {
          ...u,
          ...s
        });
      } catch (k) {
        return this.logger.warn(`failed parsing options string in nesting for key ${l}`, k), `${l}${c}${f}`;
      }
      return s.defaultValue && s.defaultValue.indexOf(this.prefix) > -1 && delete s.defaultValue, l;
    };
    for (; i = this.nestingRegexp.exec(e); ) {
      let l = [];
      s = {
        ...r
      }, s = s.replace && !we(s.replace) ? s.replace : s, s.applyPostProcessor = !1, delete s.defaultValue;
      const u = /{.*}/.test(i[1]) ? i[1].lastIndexOf("}") + 1 : i[1].indexOf(this.formatSeparator);
      if (u !== -1 && (l = i[1].slice(u).split(this.formatSeparator).map((c) => c.trim()).filter(Boolean), i[1] = i[1].slice(0, u)), a = n(o.call(this, i[1].trim(), s), s), a && i[0] === e && !we(a)) return a;
      we(a) || (a = os(a)), a || (this.logger.warn(`missed to resolve ${i[1]} for nesting ${e}`), a = ""), l.length && (a = l.reduce((c, d) => this.format(c, d, r.lng, {
        ...r,
        interpolationkey: i[1].trim()
      }), a.trim())), e = e.replace(i[0], a), this.regexp.lastIndex = 0;
    }
    return e;
  }
}
const Gd = (t) => {
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
}, ws = (t) => {
  const e = {};
  return (n, r, i) => {
    let a = i;
    i && i.interpolationkey && i.formatParams && i.formatParams[i.interpolationkey] && i[i.interpolationkey] && (a = {
      ...a,
      [i.interpolationkey]: void 0
    });
    const s = r + JSON.stringify(a);
    let o = e[s];
    return o || (o = t(yr(r), i), e[s] = o), o(n);
  };
}, qd = (t) => (e, n, r) => t(yr(n), r)(e);
class Kd {
  constructor(e = {}) {
    this.logger = Kt.create("formatter"), this.options = e, this.init(e);
  }
  init(e, n = {
    interpolation: {}
  }) {
    this.formatSeparator = n.interpolation.formatSeparator || ",";
    const r = n.cacheInBuiltFormats ? ws : qd;
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
    this.formats[e.toLowerCase().trim()] = ws(n);
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
      } = Gd(l);
      if (this.formats[u]) {
        let f = o;
        try {
          const h = ((d = i == null ? void 0 : i.formatParams) == null ? void 0 : d[i.interpolationkey]) || {}, w = h.locale || h.lng || i.locale || i.lng || r;
          f = this.formats[u](o, w, {
            ...c,
            ...i,
            ...h
          });
        } catch (h) {
          this.logger.warn(h);
        }
        return f;
      } else
        this.logger.warn(`there was no format function for ${u}`);
      return o;
    }, e);
  }
}
const Yd = (t, e) => {
  t.pending[e] !== void 0 && (delete t.pending[e], t.pendingCount--);
};
class Xd extends Qr {
  constructor(e, n, r, i = {}) {
    var a, s;
    super(), this.backend = e, this.store = n, this.services = r, this.languageUtils = r.languageUtils, this.options = i, this.logger = Kt.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = i.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = i.maxRetries >= 0 ? i.maxRetries : 5, this.retryTimeout = i.retryTimeout >= 1 ? i.retryTimeout : 350, this.state = {}, this.queue = [], (s = (a = this.backend) == null ? void 0 : a.init) == null || s.call(a, r, i.backend, i);
  }
  queueLoad(e, n, r, i) {
    const a = {}, s = {}, o = {}, l = {};
    return e.forEach((u) => {
      let c = !0;
      n.forEach((d) => {
        const f = `${u}|${d}`;
        !r.reload && this.store.hasResourceBundle(u, d) ? this.state[f] = 2 : this.state[f] < 0 || (this.state[f] === 1 ? s[f] === void 0 && (s[f] = !0) : (this.state[f] = 1, c = !1, s[f] === void 0 && (s[f] = !0), a[f] === void 0 && (a[f] = !0), l[d] === void 0 && (l[d] = !0)));
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
      Dd(l.loaded, [a], s), Yd(l, e), n && l.errors.push(n), l.pendingCount === 0 && !l.done && (Object.keys(l.loaded).forEach((u) => {
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
    we(e) && (e = this.languageUtils.toResolveHierarchy(e)), we(n) && (n = [n]);
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
    var l, u, c, d, f;
    if ((u = (l = this.services) == null ? void 0 : l.utils) != null && u.hasLoadedNamespace && !((d = (c = this.services) == null ? void 0 : c.utils) != null && d.hasLoadedNamespace(n))) {
      this.logger.warn(`did not save key "${r}" as the namespace "${n}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(r == null || r === "")) {
      if ((f = this.backend) != null && f.create) {
        const h = {
          ...s,
          isUpdate: a
        }, w = this.backend.create.bind(this.backend);
        if (w.length < 6)
          try {
            let k;
            w.length === 5 ? k = w(e, n, r, i, h) : k = w(e, n, r, i), k && typeof k.then == "function" ? k.then((I) => o(null, I)).catch(o) : o(null, k);
          } catch (k) {
            o(k);
          }
        else
          w(e, n, r, i, o, h);
      }
      !e || !e[0] || this.store.addResource(e[0], n, r, i);
    }
  }
}
const Ci = () => ({
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
    if (typeof t[1] == "object" && (e = t[1]), we(t[1]) && (e.defaultValue = t[1]), we(t[2]) && (e.tDescription = t[2]), typeof t[2] == "object" || typeof t[3] == "object") {
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
}), Cs = (t) => {
  var e, n;
  return we(t.ns) && (t.ns = [t.ns]), we(t.fallbackLng) && (t.fallbackLng = [t.fallbackLng]), we(t.fallbackNS) && (t.fallbackNS = [t.fallbackNS]), ((n = (e = t.supportedLngs) == null ? void 0 : e.indexOf) == null ? void 0 : n.call(e, "cimode")) < 0 && (t.supportedLngs = t.supportedLngs.concat(["cimode"])), typeof t.initImmediate == "boolean" && (t.initAsync = t.initImmediate), t;
}, Ir = () => {
}, Jd = (t) => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(t)).forEach((n) => {
    typeof t[n] == "function" && (t[n] = t[n].bind(t));
  });
};
class cr extends Qr {
  constructor(e = {}, n) {
    if (super(), this.options = Cs(e), this.services = {}, this.logger = Kt, this.modules = {
      external: []
    }, Jd(this), n && !this.isInitialized && !e.isClone) {
      if (!this.options.initAsync)
        return this.init(e, n), this;
      setTimeout(() => {
        this.init(e, n);
      }, 0);
    }
  }
  init(e = {}, n) {
    this.isInitializing = !0, typeof e == "function" && (n = e, e = {}), e.defaultNS == null && e.ns && (we(e.ns) ? e.defaultNS = e.ns : e.ns.indexOf("translation") < 0 && (e.defaultNS = e.ns[0]));
    const r = Ci();
    this.options = {
      ...r,
      ...this.options,
      ...Cs(e)
    }, this.options.interpolation = {
      ...r.interpolation,
      ...this.options.interpolation
    }, e.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = e.keySeparator), e.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = e.nsSeparator), typeof this.options.overloadTranslationOptionHandler != "function" && (this.options.overloadTranslationOptionHandler = r.overloadTranslationOptionHandler);
    const i = (u) => u ? typeof u == "function" ? new u() : u : null;
    if (!this.options.isClone) {
      this.modules.logger ? Kt.init(i(this.modules.logger), this.options) : Kt.init(null, this.options);
      let u;
      this.modules.formatter ? u = this.modules.formatter : u = Kd;
      const c = new ps(this.options);
      this.store = new ds(this.options.resources, this.options);
      const d = this.services;
      d.logger = Kt, d.resourceStore = this.store, d.languageUtils = c, d.pluralResolver = new Wd(c, {
        prepend: this.options.pluralSeparator,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), this.options.interpolation.format && this.options.interpolation.format !== r.interpolation.format && this.logger.deprecate("init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting"), u && (!this.options.interpolation.format || this.options.interpolation.format === r.interpolation.format) && (d.formatter = i(u), d.formatter.init && d.formatter.init(d, this.options), this.options.interpolation.format = d.formatter.format.bind(d.formatter)), d.interpolator = new ys(this.options), d.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, d.backendConnector = new Xd(i(this.modules.backend), d.resourceStore, d, this.options), d.backendConnector.on("*", (h, ...w) => {
        this.emit(h, ...w);
      }), this.modules.languageDetector && (d.languageDetector = i(this.modules.languageDetector), d.languageDetector.init && d.languageDetector.init(d, this.options.detection, this.options)), this.modules.i18nFormat && (d.i18nFormat = i(this.modules.i18nFormat), d.i18nFormat.init && d.i18nFormat.init(this)), this.translator = new Wr(this.services, this.options), this.translator.on("*", (h, ...w) => {
        this.emit(h, ...w);
      }), this.modules.external.forEach((h) => {
        h.init && h.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, n || (n = Ir), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const u = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      u.length > 0 && u[0] !== "dev" && (this.options.lng = u[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((u) => {
      this[u] = (...c) => this.store[u](...c);
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((u) => {
      this[u] = (...c) => (this.store[u](...c), this);
    });
    const o = ir(), l = () => {
      const u = (c, d) => {
        this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), o.resolve(d), n(c, d);
      };
      if (this.languages && !this.isInitialized) return u(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, u);
    };
    return this.options.resources || !this.options.initAsync ? l() : setTimeout(l, 0), o;
  }
  loadResources(e, n = Ir) {
    var a, s;
    let r = n;
    const i = we(e) ? e : this.language;
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
    const i = ir();
    return typeof e == "function" && (r = e, e = void 0), typeof n == "function" && (r = n, n = void 0), e || (e = this.languages), n || (n = this.options.ns), r || (r = Ir), this.services.backendConnector.reload(e, n, (a) => {
      i.resolve(), r(a);
    }), i;
  }
  use(e) {
    if (!e) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!e.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return e.type === "backend" && (this.modules.backend = e), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && (this.modules.languageDetector = e), e.type === "i18nFormat" && (this.modules.i18nFormat = e), e.type === "postProcessor" && $o.addPostProcessor(e), e.type === "formatter" && (this.modules.formatter = e), e.type === "3rdParty" && this.modules.external.push(e), this;
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
    const r = ir();
    this.emit("languageChanging", e);
    const i = (o) => {
      this.language = o, this.languages = this.services.languageUtils.toResolveHierarchy(o), this.resolvedLanguage = void 0, this.setResolvedLanguage(o);
    }, a = (o, l) => {
      l ? this.isLanguageChangingTo === e && (i(l), this.translator.changeLanguage(l), this.isLanguageChangingTo = void 0, this.emit("languageChanged", l), this.logger.log("languageChanged", l)) : this.isLanguageChangingTo = void 0, r.resolve((...u) => this.t(...u)), n && n(o, (...u) => this.t(...u));
    }, s = (o) => {
      var c, d;
      !e && !o && this.services.languageDetector && (o = []);
      const l = we(o) ? o : o && o[0], u = this.store.hasLanguageSomeTranslations(l) ? l : this.services.languageUtils.getBestMatchFromCodes(we(o) ? [o] : o);
      u && (this.language || i(u), this.translator.language || this.translator.changeLanguage(u), (d = (c = this.services.languageDetector) == null ? void 0 : c.cacheUserLanguage) == null || d.call(c, u)), this.loadResources(u, (f) => {
        a(f, u);
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
      return l.keyPrefix && Array.isArray(a) ? c = a.map((d) => (typeof d == "function" && (d = Zi(d, {
        ...this.options,
        ...s
      })), `${l.keyPrefix}${u}${d}`)) : (typeof a == "function" && (a = Zi(a, {
        ...this.options,
        ...s
      })), c = l.keyPrefix ? `${l.keyPrefix}${u}${a}` : a), this.t(c, l);
    };
    return we(e) ? i.lng = e : i.lngs = e, i.ns = n, i.keyPrefix = r, i;
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
    const r = ir();
    return this.options.ns ? (we(e) && (e = [e]), e.forEach((i) => {
      this.options.ns.indexOf(i) < 0 && this.options.ns.push(i);
    }), this.loadResources((i) => {
      r.resolve(), n && n(i);
    }), r) : (n && n(), Promise.resolve());
  }
  loadLanguages(e, n) {
    const r = ir();
    we(e) && (e = [e]);
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
    const n = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], r = ((a = this.services) == null ? void 0 : a.languageUtils) || new ps(Ci());
    return e.toLowerCase().indexOf("-latn") > 1 ? "ltr" : n.indexOf(r.getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance(e = {}, n) {
    const r = new cr(e, n);
    return r.createInstance = cr.createInstance, r;
  }
  cloneInstance(e = {}, n = Ir) {
    const r = e.forkResourceStore;
    r && delete e.forkResourceStore;
    const i = {
      ...this.options,
      ...e,
      isClone: !0
    }, a = new cr(i);
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
      a.store = new ds(o, i), a.services.resourceStore = a.store;
    }
    if (e.interpolation) {
      const l = {
        ...Ci().interpolation,
        ...this.options.interpolation,
        ...e.interpolation
      }, u = {
        ...i,
        interpolation: l
      };
      a.services.interpolator = new ys(u);
    }
    return a.translator = new Wr(a.services, i), a.translator.on("*", (o, ...l) => {
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
const ft = cr.createInstance();
ft.createInstance;
ft.dir;
ft.init;
ft.loadResources;
ft.reloadResources;
ft.use;
ft.changeLanguage;
ft.getFixedT;
ft.t;
ft.exists;
ft.setDefaultNamespace;
ft.hasLoadedNamespace;
ft.loadNamespaces;
ft.loadLanguages;
var Gr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ha(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
const Qd = (t, e, n, r) => {
  var a, s, o, l;
  const i = [n, {
    code: e,
    ...r || {}
  }];
  if ((s = (a = t == null ? void 0 : t.services) == null ? void 0 : a.logger) != null && s.forward)
    return t.services.logger.forward(i, "warn", "react-i18next::", !0);
  Tn(i[0]) && (i[0] = `react-i18next:: ${i[0]}`), (l = (o = t == null ? void 0 : t.services) == null ? void 0 : o.logger) != null && l.warn ? t.services.logger.warn(...i) : console != null && console.warn && console.warn(...i);
}, xs = {}, jo = (t, e, n, r) => {
  Tn(n) && xs[n] || (Tn(n) && (xs[n] = /* @__PURE__ */ new Date()), Qd(t, e, n, r));
}, Vo = (t, e) => () => {
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
}, Wi = (t, e, n) => {
  t.loadNamespaces(e, Vo(t, n));
}, ks = (t, e, n, r) => {
  if (Tn(n) && (n = [n]), t.options.preload && t.options.preload.indexOf(e) > -1) return Wi(t, n, r);
  n.forEach((i) => {
    t.options.ns.indexOf(i) < 0 && t.options.ns.push(i);
  }), t.loadLanguages(e, Vo(t, r));
}, eh = (t, e, n = {}) => !e.languages || !e.languages.length ? (jo(e, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
  languages: e.languages
}), !0) : e.hasLoadedNamespace(t, {
  lng: n.lng,
  precheck: (r, i) => {
    if (n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && r.services.backendConnector.backend && r.isLanguageChangingTo && !i(r.isLanguageChangingTo, t)) return !1;
  }
}), Tn = (t) => typeof t == "string", th = (t) => typeof t == "object" && t !== null, nh = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, rh = {
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
}, ih = (t) => rh[t], ah = (t) => t.replace(nh, ih);
let Gi = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: ah,
  transDefaultProps: void 0
};
const sh = (t = {}) => {
  Gi = {
    ...Gi,
    ...t
  };
}, oh = () => Gi;
let Zo;
const lh = (t) => {
  Zo = t;
}, ch = () => Zo, uh = {
  type: "3rdParty",
  init(t) {
    sh(t.options.react), lh(t);
  }
}, dh = Yr();
class hh {
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
var Wo = { exports: {} }, Go = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bn = zt;
function ph(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var fh = typeof Object.is == "function" ? Object.is : ph, gh = Bn.useState, mh = Bn.useEffect, yh = Bn.useLayoutEffect, wh = Bn.useDebugValue;
function Ch(t, e) {
  var n = e(), r = gh({ inst: { value: n, getSnapshot: e } }), i = r[0].inst, a = r[1];
  return yh(
    function() {
      i.value = n, i.getSnapshot = e, xi(i) && a({ inst: i });
    },
    [t, n, e]
  ), mh(
    function() {
      return xi(i) && a({ inst: i }), t(function() {
        xi(i) && a({ inst: i });
      });
    },
    [t]
  ), wh(n), n;
}
function xi(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !fh(t, n);
  } catch {
    return !0;
  }
}
function xh(t, e) {
  return e();
}
var kh = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? xh : Ch;
Go.useSyncExternalStore = Bn.useSyncExternalStore !== void 0 ? Bn.useSyncExternalStore : kh;
Wo.exports = Go;
var _h = Wo.exports;
const Sh = (t, e) => Tn(e) ? e : th(e) && Tn(e.defaultValue) ? e.defaultValue : Array.isArray(t) ? t[t.length - 1] : t, bh = {
  t: Sh,
  ready: !1
}, vh = () => () => {
}, Th = (t, e = {}) => {
  var H, te, de;
  const {
    i18n: n
  } = e, {
    i18n: r,
    defaultNS: i
  } = Xr(dh) || {}, a = n || r || ch();
  a && !a.reportNamespaces && (a.reportNamespaces = new hh()), a || jo(a, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
  const s = Ze(() => {
    var G;
    return {
      ...oh(),
      ...(G = a == null ? void 0 : a.options) == null ? void 0 : G.react,
      ...e
    };
  }, [a, e]), {
    useSuspense: o,
    keyPrefix: l
  } = s, u = i || ((H = a == null ? void 0 : a.options) == null ? void 0 : H.defaultNS), c = Tn(u) ? [u] : u || ["translation"], d = Ze(() => c, c);
  (de = (te = a == null ? void 0 : a.reportNamespaces) == null ? void 0 : te.addUsedNamespaces) == null || de.call(te, d);
  const f = ge(0), h = ce((G) => {
    if (!a) return vh;
    const {
      bindI18n: N,
      bindI18nStore: P
    } = s, F = () => {
      f.current += 1, G();
    };
    return N && a.on(N, F), P && a.store.on(P, F), () => {
      N && N.split(" ").forEach((Z) => a.off(Z, F)), P && P.split(" ").forEach((Z) => a.store.off(Z, F));
    };
  }, [a, s]), w = ge(), k = ce(() => {
    if (!a)
      return bh;
    const G = !!(a.isInitialized || a.initializedStoreOnce) && d.every((oe) => eh(oe, a, s)), N = e.lng || a.language, P = f.current, F = w.current;
    if (F && F.ready === G && F.lng === N && F.keyPrefix === l && F.revision === P)
      return F;
    const ue = {
      t: a.getFixedT(N, s.nsMode === "fallback" ? d : d[0], l),
      ready: G,
      lng: N,
      keyPrefix: l,
      revision: P
    };
    return w.current = ue, ue;
  }, [a, d, l, s, e.lng]), [I, _] = Re(0), {
    t: v,
    ready: R
  } = _h.useSyncExternalStore(h, k, k);
  Fe(() => {
    if (a && !R && !o) {
      const G = () => _((N) => N + 1);
      e.lng ? ks(a, e.lng, d, G) : Wi(a, d, G);
    }
  }, [a, e.lng, d, R, o, I]);
  const M = a || {}, L = ge(null), b = ge(), j = (G) => {
    const N = Object.getOwnPropertyDescriptors(G);
    N.__original && delete N.__original;
    const P = Object.create(Object.getPrototypeOf(G), N);
    if (!Object.prototype.hasOwnProperty.call(P, "__original"))
      try {
        Object.defineProperty(P, "__original", {
          value: G,
          writable: !1,
          enumerable: !1,
          configurable: !1
        });
      } catch {
      }
    return P;
  }, $ = Ze(() => {
    const G = M, N = G == null ? void 0 : G.language;
    let P = G;
    G && (L.current && L.current.__original === G ? b.current !== N ? (P = j(G), L.current = P, b.current = N) : P = L.current : (P = j(G), L.current = P, b.current = N));
    const F = [v, P, R];
    return F.t = v, F.i18n = P, F.ready = R, F;
  }, [v, M, R, M.resolvedLanguage, M.language, M.languages]);
  if (a && o && !R)
    throw new Promise((G) => {
      const N = () => G();
      e.lng ? ks(a, e.lng, d, N) : Wi(a, d, N);
    });
  return $;
};
async function qo({
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
      return console.warn(`Translations not found for locale '${r}', falling back to 'en'`), qo({
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
const Eh = () => {
  const t = ft.createInstance();
  return t.use(uh), t;
}, Ko = Yr(null), Rh = {
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
function Ih({
  children: t,
  locale: e = "en",
  chatServerUrl: n,
  chatServerKey: r,
  mpAuthToken: i,
  fallback: a
}) {
  const [s] = Re(() => Eh()), [o, l] = Re(!0), [u, c] = Re(!1), [d, f] = Re(null), h = ge(!1), w = ce(
    async (_, v) => {
      s.isInitialized ? (s.addResourceBundle(
        v,
        "translation",
        _,
        !0,
        !0
      ), await s.changeLanguage(v)) : await s.init({
        lng: v,
        fallbackLng: "en",
        resources: {
          [v]: {
            translation: _
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
  Fe(() => {
    if (h.current)
      return;
    let _ = !0;
    return (async () => {
      l(!0), f(null);
      try {
        const R = await qo({
          chatServerUrl: n,
          chatServerKey: r,
          mpAuthToken: i,
          locale: e
        });
        if (!_) return;
        await w(R, e), h.current = !0, c(!0);
      } catch (R) {
        if (!_) return;
        console.error("Failed to load translations:", R), f(
          R instanceof Error ? R : new Error("Failed to load translations")
        ), await w(Rh, "en"), h.current = !0, c(!0);
      } finally {
        _ && l(!1);
      }
    })(), () => {
      _ = !1;
    };
  }, [e, n, r, i, w]);
  const k = ce(
    (_, v) => s.isInitialized && s.t(_, v) || _,
    [s]
  ), I = Ze(
    () => ({
      t: k,
      locale: e,
      isLoading: o,
      isReady: u,
      error: d
    }),
    [k, e, o, u, d]
  );
  return o && a ? /* @__PURE__ */ p(Yt, { children: a }) : /* @__PURE__ */ p(Ko.Provider, { value: I, children: t });
}
function gn() {
  const t = Xr(Ko);
  if (!t)
    throw new Error(
      "useTranslations must be used within TranslationProvider. Make sure your component is wrapped with <TranslationProvider>."
    );
  return t;
}
function A0() {
  return Th();
}
function Nh() {
  const { t } = gn(), e = ce(
    (a, s) => s === !1 ? tt.isErrorMessage(a) ? lt.ERROR : lt.COMPLETED : tt.isCompletedMessage(a) ? lt.COMPLETED : tt.isErrorMessage(a) ? lt.ERROR : lt.PROCESSING,
    []
  ), n = ce(
    (a) => tt.extractDuration(a, t),
    [t]
  ), r = ce(
    (a) => tt.cleanReasoningContent(a),
    []
  ), i = ce(
    (a, s) => {
      switch (tt.getMessageType(
        a,
        s
      )) {
        case pe.MESSAGE_TYPES.ERROR:
          return t("chat.reasoning.error");
        case pe.MESSAGE_TYPES.COMPLETED:
          return t("chat.reasoning.completed");
        case pe.MESSAGE_TYPES.THOUGHT:
          return t("chat.reasoning.thought");
        case pe.MESSAGE_TYPES.THINKING:
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
function Ah() {
  const { t } = gn(), e = ce(
    (r, i) => i === !1 ? r.includes(pe.ERROR_MARKER) ? t("chat.tools.failed") : t("chat.tools.completed") : r.includes(pe.COMPLETED_MARKER) || r.includes("✅") ? t("chat.tools.completed") : r.includes(pe.ERROR_MARKER) ? t("chat.tools.failed") : (r.includes(pe.HANDLING_MARKER), t("chat.tools.executing")),
    [t]
  ), n = ce(
    (r, i) => i === !1 ? r.includes(pe.ERROR_MARKER) ? lt.ERROR : lt.COMPLETED : r.includes(pe.COMPLETED_MARKER) || r.includes("✅") ? lt.COMPLETED : r.includes(pe.ERROR_MARKER) ? lt.ERROR : lt.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: n
  };
}
function Oh({
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
  const f = ge(/* @__PURE__ */ new Map()), h = ge(/* @__PURE__ */ new Map()), w = ce(() => {
    window.responseTimeoutId && (clearTimeout(window.responseTimeoutId), window.responseTimeoutId = null, !l.current && t((L) => {
      var j;
      const b = (j = L.map(($, H) => ({ msg: $, index: H })).filter(({ msg: $ }) => $.role === "user").pop()) == null ? void 0 : j.index;
      return b === void 0 ? L : L.map(
        ($, H) => H === b && ($.hasError || $.isRetrying) ? { ...$, hasError: !1, errorMessage: void 0, isRetrying: !1 } : $
      );
    }));
  }, [l, t]), k = ce(() => {
    if (l.current && u.current) {
      const L = da(
        u.current,
        !0
      );
      return n(
        l.current,
        L,
        !1
      ), c(), !0;
    }
    return !1;
  }, [
    l,
    u,
    n,
    c
  ]), I = ce(
    (L) => {
      if (w(), l.current)
        u.current += L, s(u.current), n(
          l.current,
          u.current,
          !0
        );
      else {
        i(!1);
        const b = r();
        l.current = b, u.current = L, s(L);
        const j = {
          id: b,
          role: "assistant",
          content: L,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        t(($) => [...$, j]);
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
  ), _ = ce(
    (L, b, j) => {
      const { callId: $ } = j || {};
      if (o(L), !$) return;
      const H = tt.isThinkingMessage(b) && !pe.PATTERNS.DURATION.test(b), te = tt.isThinkingMessage(b) && pe.PATTERNS.DURATION.test(b), de = tt.isHandlingMessage(b), G = tt.isCompletedMessage(b), N = tt.isErrorMessage(b);
      if (H || te) {
        const F = f.current.get($);
        if (H && !F) {
          k();
          const Z = r();
          f.current.set($, Z);
          const ue = {
            id: Z,
            role: "reasoning",
            content: b,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          t((oe) => [...oe, ue]);
        } else te && F ? (n(F, b, !1), f.current.delete($)) : F && H && n(F, b, !0);
      }
      const P = h.current.get($);
      if (de && !P) {
        k();
        const F = b.match(
          pe.PATTERNS.HANDLING_TOOL
        ), Z = F ? F[1] : "Unknown Tool", ue = r();
        h.current.set($, ue);
        const oe = {
          id: ue,
          role: "tooling",
          content: b,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...j,
            toolName: Z,
            callId: $,
            status: lt.PROCESSING
          }
        };
        t((ee) => [...ee, oe]);
      } else if ((G || N) && P) {
        const F = b.match(
          pe.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), Z = F ? F[1] : "Unknown Tool";
        t(
          (ue) => ue.map(
            (oe) => oe.id === P ? {
              ...oe,
              content: b,
              isStreaming: !1,
              toolData: {
                ...oe.toolData,
                toolName: Z,
                status: N ? lt.ERROR : lt.COMPLETED,
                callId: $ ?? ""
              }
            } : oe
          )
        ), h.current.delete($);
      } else P && L && !G && !N && n(P, b, !0);
    },
    [
      o,
      k,
      r,
      t,
      n
    ]
  ), v = ce(() => {
    w(), a(!1), i(!1), k();
  }, [
    w,
    a,
    i,
    k
  ]), R = ce(
    (L) => {
      a(!1), i(!1), k(), e("system", `❌ Chat error: ${L}`);
    },
    [
      a,
      i,
      k,
      e
    ]
  ), M = ce(() => {
    a(!1), i(!1), c(), d();
  }, [
    a,
    i,
    c,
    d
  ]);
  return {
    handleSetMessage: I,
    handleReasoningUpdate: _,
    handleChatFinished: v,
    handleChatError: R,
    stopGeneration: M,
    finalizeCurrentStreamingMessage: k,
    clearResponseError: w
  };
}
function Mh() {
  const t = yd(), e = Md(), n = Nh(), r = Ah(), i = Oh({
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
    finalizeCurrentStreamingMessage: i.finalizeCurrentStreamingMessage,
    clearResponseError: i.clearResponseError
  };
}
function O0({ initialMode: t = "sidebar" }) {
  const e = ye();
  return Fe(() => {
    t && e.currentMode !== t && e.setCurrentMode(t);
  }, [t]), Fe(() => {
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
function Lh(t) {
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
            status: "complete",
            source: "history"
          }
        });
  return e;
}
function Ph({
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
  isConnected: f = !0,
  // Default to true for backward compatibility
  onConversationInitialized: h
}) {
  const w = ge(!1), k = async () => {
    if (f) {
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
      if (!w.current && !(a.length > 0))
        try {
          o(!0), l(null);
          const _ = await $u(
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
          s(Lh(_.messages)), _.threadId && u(_.threadId), _.providerResId && c(_.providerResId), _.messages.length > 0 && h && h(), w.current = !0;
        } catch (_) {
          $n(_, "ConversationLoader"), l(
            _ instanceof Error ? _.message : "Failed to load conversation"
          ), w.current = !0;
        } finally {
          o(!1);
        }
    }
  };
  return Fe(() => {
    k();
  }, [
    f,
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
    hasLoadedConversationRef: w,
    resetConversationLoader: () => {
      w.current = !1;
    },
    reloadConversation: k
  };
}
function _s(t) {
  if (!t || typeof t != "object") return !1;
  const e = Object.keys(t);
  return e.length === 0 ? !1 : e.some((n) => t[n] != null);
}
function Dh({
  metadata: t,
  chatClient: e,
  currentProviderResId: n,
  isLoadingConversation: r,
  messages: i = [],
  entityId: a,
  entityType: s
}) {
  const o = ge(void 0), l = ge(!1), u = ge(null), c = ge(void 0), d = ge(null);
  return Fe(() => {
    if (r || !e)
      return;
    const f = !n && i.length === 0, h = !!n;
    if (f && (!a || !s) || h && !n)
      return;
    if (!l.current) {
      l.current = !0, o.current = t, d.current = n;
      return;
    }
    const w = !d.current && n, k = o.current !== t;
    if (w) {
      if (console.log("[useMetadataSync] 🆕 Thread just created, syncing initial metadata"), d.current = n, _s(t) && c.current !== t) {
        console.log("[useMetadataSync] 📤 Syncing metadata to newly created thread:", t);
        const v = e.updateMetadata(n, { metadata: t }).then(() => {
          console.log("[useMetadataSync] ✅ Initial metadata synced successfully"), o.current = t, c.current = t, u.current = null;
        }).catch((R) => {
          console.error(
            "[useMetadataSync] ❌ Failed to sync initial metadata to new thread:",
            R
          ), u.current = null;
        });
        u.current = v;
      }
      return;
    }
    if (d.current = n, !k)
      return;
    if (!_s(t)) {
      o.current = t;
      return;
    }
    if (f)
      console.log("[useMetadataSync] 📝 Draft state: tracking metadata for future sync"), o.current = t;
    else if (h) {
      if (console.log("[useMetadataSync] 🔄 Existing thread: updating metadata"), c.current === t)
        return;
      if (u.current) {
        u.current.finally(() => {
          if (c.current !== t) {
            const v = e.updateMetadata(n, { metadata: t }).then(() => {
              console.log("[useMetadataSync] ✅ Metadata updated successfully (queued)"), o.current = t, c.current = t, u.current = null;
            }).catch((R) => {
              console.error(
                "[useMetadataSync] ❌ Failed to update existing thread metadata:",
                R
              ), u.current = null;
            });
            u.current = v;
          }
        });
        return;
      }
      const _ = e.updateMetadata(n, { metadata: t }).then(() => {
        console.log("[useMetadataSync] ✅ Metadata updated successfully"), o.current = t, c.current = t, u.current = null;
      }).catch((v) => {
        console.error(
          "[useMetadataSync] ❌ Failed to update existing thread metadata:",
          v
        ), u.current = null;
      });
      u.current = _;
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
function Fh() {
  const [t, e] = Re(navigator.onLine), [n, r] = Re(!1);
  return Fe(() => {
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
class zh {
  // 15MB
  constructor(e) {
    ne(this, "config");
    ne(this, "defaultFolder", "chat-uploads");
    ne(this, "defaultMaxFileSize", 15 * 1024 * 1024);
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
            u.data && Array.isArray(u.data) ? c = u.data.map((d, f) => this.processUploadResult(e[f], d)) : Array.isArray(u) ? c = u.map((d, f) => this.processUploadResult(e[f], d)) : c = [this.processUploadResult(e[0], u)], a.forEach((d) => {
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
class Hh {
  constructor(e, n = {}) {
    ne(this, "config");
    ne(this, "chatClient");
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
const Uh = {
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
}, Yo = {
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
}, $h = {
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
    if (!Yo.isValidWebSocketUrl(t))
      throw new Error(`Invalid WebSocket URL: ${t}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (t) => t.trim().length > 0
}, Xo = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...t) => t.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (t, e, n, r, i) => Xo.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${t}`,
    e && `chat-wrapper--${e}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    t === "embedded" && i && "chat-wrapper--constrained"
  )
}, Jo = {
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
  getUserFriendlyErrorMessage: (t) => Jo.isNetworkError(t) ? "Connection error. Please check your internet connection and try again." : t.message.includes("authentication") || t.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : t.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, Gt = {
  state: Uh,
  url: Yo,
  validation: $h,
  css: Xo,
  error: Jo
};
class Ss extends oa {
  constructor(n) {
    super(n);
    ne(this, "resetTimeoutId", null);
    ne(this, "resetErrorBoundary", () => {
      this.resetTimeoutId && clearTimeout(this.resetTimeoutId), this.setState({
        hasError: !1,
        error: void 0,
        errorInfo: void 0
      });
    });
    ne(this, "handleRetry", () => {
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
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ p("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ O("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ p("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ p("p", { className: "chat-wrapper__error-message", children: Gt.error.getUserFriendlyErrorMessage(r) }),
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
      })() && /* @__PURE__ */ O("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ p("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ p("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : i;
  }
}
class Bh extends oa {
  constructor(n) {
    super(n);
    ne(this, "retryCount", 0);
    ne(this, "retryTimeoutId", null);
    ne(this, "handleRetry", () => {
      const { maxRetries: n = 3, retryDelay: r = 1e3, onRetry: i } = this.props;
      this.retryCount >= n || (this.setState({ isRetrying: !0 }), this.retryCount++, this.retryTimeoutId = window.setTimeout(() => {
        this.setState({
          hasError: !1,
          error: void 0,
          isRetrying: !1
        }), i && i();
      }, r * this.retryCount));
    });
    ne(this, "handleManualReset", () => {
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
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || Gt.error.isNetworkError(r)) ? /* @__PURE__ */ p("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ O("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ p("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ p("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ O("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ p("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ O(Yt, { children: [
        this.retryCount < s && /* @__PURE__ */ O(
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
      })() && /* @__PURE__ */ O("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ p("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ p("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
}
class jh extends oa {
  constructor(n) {
    super(n);
    ne(this, "handleRetry", () => {
      this.setState({
        hasError: !1,
        error: void 0,
        failedFiles: void 0
      }), this.props.onRetry && this.props.onRetry();
    });
    ne(this, "handleDismiss", () => {
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
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ p("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ O("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ p("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ p("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ O("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ p("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ p("ul", { className: "chat-wrapper__failed-files-list", children: i.map((l, u) => /* @__PURE__ */ p("li", { className: "chat-wrapper__failed-file", children: l }, u)) })
      ] }),
      /* @__PURE__ */ O("div", { className: "chat-wrapper__error-actions", children: [
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
      })() && /* @__PURE__ */ O("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ p("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ p("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
  getFileUploadErrorMessage(n) {
    return n.message.includes("size") || n.message.includes("large") ? "File size is too large. Please try with smaller files." : n.message.includes("type") || n.message.includes("format") ? "File type is not supported. Please try with different file types." : n.message.includes("network") || n.message.includes("connection") ? "Network error during upload. Please check your connection and try again." : n.message.includes("timeout") ? "Upload timed out. Please try again with smaller files or better connection." : "Failed to upload files. Please try again.";
  }
}
const Vh = ({
  className: t,
  onClick: e,
  size: n = 24,
  color: r = "currentColor"
}) => /* @__PURE__ */ O(
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
), Zh = ({
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
), Wh = ({
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
), Gh = ({
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
), M0 = ({
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
), qh = ({
  className: t,
  onClick: e,
  size: n = 18,
  color: r = "currentColor"
}) => /* @__PURE__ */ O(
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
), Kh = ({
  mode: t,
  headerName: e,
  bubbleText: n,
  showBubbleText: r = !0,
  onClick: i
}) => {
  const a = t === "modal" ? `Open ${e}` : `Expand ${e}`;
  return /* @__PURE__ */ O(
    "button",
    {
      className: "chat-wrapper__bubble-button",
      onClick: i,
      title: a,
      children: [
        /* @__PURE__ */ p(Vh, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ p("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, Yh = ({
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
      children: /* @__PURE__ */ p(Zh, { size: 20 })
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
          children: /* @__PURE__ */ p(Wh, { size: 20, isFullscreen: c })
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
      children: /* @__PURE__ */ p(Gh, { size: 20 })
    }
  ) : null;
  return /* @__PURE__ */ O("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ p("h2", { className: "chat-wrapper__title", children: t }) }),
    /* @__PURE__ */ O("div", { className: "chat-wrapper__header-controls", children: [
      l(),
      u(),
      o()
    ] })
  ] });
};
class Xh extends Error {
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
    ne(
      this,
      "name",
      /** @type {const} */
      "Assertion"
    );
    ne(
      this,
      "code",
      /** @type {const} */
      "ERR_ASSERTION"
    );
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.actual = r, this.expected = i, this.generated = s, this.operator = a;
  }
}
function S(t, e) {
  Qo(
    !!t,
    !1,
    !0,
    "ok",
    "Expected value to be truthy",
    e
  );
}
function qi(t) {
  Qo(!1, !1, !0, "ok", "Unreachable", t);
}
function Qo(t, e, n, r, i, a) {
  if (!t)
    throw a instanceof Error ? a : new Xh(
      a || i,
      e,
      n,
      r,
      !a
    );
}
function Jh(t, e) {
  const n = {};
  return (t[t.length - 1] === "" ? [...t, ""] : t).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Qh = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ep = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, tp = {};
function bs(t, e) {
  return (tp.jsx ? ep : Qh).test(t);
}
const np = /[ \t\n\f\r]/g;
function rp(t) {
  return typeof t == "object" ? t.type === "text" ? vs(t.value) : !1 : vs(t);
}
function vs(t) {
  return t.replace(np, "") === "";
}
class xr {
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
xr.prototype.normal = {};
xr.prototype.property = {};
xr.prototype.space = void 0;
function el(t, e) {
  const n = {}, r = {};
  for (const i of t)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new xr(n, r, e);
}
function Ki(t) {
  return t.toLowerCase();
}
class Ct {
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
Ct.prototype.attribute = "";
Ct.prototype.booleanish = !1;
Ct.prototype.boolean = !1;
Ct.prototype.commaOrSpaceSeparated = !1;
Ct.prototype.commaSeparated = !1;
Ct.prototype.defined = !1;
Ct.prototype.mustUseProperty = !1;
Ct.prototype.number = !1;
Ct.prototype.overloadedBoolean = !1;
Ct.prototype.property = "";
Ct.prototype.spaceSeparated = !1;
Ct.prototype.space = void 0;
let ip = 0;
const ke = En(), Xe = En(), Yi = En(), z = En(), $e = En(), Pn = En(), kt = En();
function En() {
  return 2 ** ++ip;
}
const Xi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: ke,
  booleanish: Xe,
  commaOrSpaceSeparated: kt,
  commaSeparated: Pn,
  number: z,
  overloadedBoolean: Yi,
  spaceSeparated: $e
}, Symbol.toStringTag, { value: "Module" })), ki = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Xi)
);
class pa extends Ct {
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
    if (super(e, n), Ts(this, "space", i), typeof r == "number")
      for (; ++a < ki.length; ) {
        const s = ki[a];
        Ts(this, ki[a], (r & Xi[s]) === Xi[s]);
      }
  }
}
pa.prototype.defined = !0;
function Ts(t, e, n) {
  n && (t[e] = n);
}
function Vn(t) {
  const e = {}, n = {};
  for (const [r, i] of Object.entries(t.properties)) {
    const a = new pa(
      r,
      t.transform(t.attributes || {}, r),
      i,
      t.space
    );
    t.mustUseProperty && t.mustUseProperty.includes(r) && (a.mustUseProperty = !0), e[r] = a, n[Ki(r)] = r, n[Ki(a.attribute)] = r;
  }
  return new xr(e, n, t.space);
}
const tl = Vn({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Xe,
    ariaAutoComplete: null,
    ariaBusy: Xe,
    ariaChecked: Xe,
    ariaColCount: z,
    ariaColIndex: z,
    ariaColSpan: z,
    ariaControls: $e,
    ariaCurrent: null,
    ariaDescribedBy: $e,
    ariaDetails: null,
    ariaDisabled: Xe,
    ariaDropEffect: $e,
    ariaErrorMessage: null,
    ariaExpanded: Xe,
    ariaFlowTo: $e,
    ariaGrabbed: Xe,
    ariaHasPopup: null,
    ariaHidden: Xe,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: $e,
    ariaLevel: z,
    ariaLive: null,
    ariaModal: Xe,
    ariaMultiLine: Xe,
    ariaMultiSelectable: Xe,
    ariaOrientation: null,
    ariaOwns: $e,
    ariaPlaceholder: null,
    ariaPosInSet: z,
    ariaPressed: Xe,
    ariaReadOnly: Xe,
    ariaRelevant: null,
    ariaRequired: Xe,
    ariaRoleDescription: $e,
    ariaRowCount: z,
    ariaRowIndex: z,
    ariaRowSpan: z,
    ariaSelected: Xe,
    ariaSetSize: z,
    ariaSort: null,
    ariaValueMax: z,
    ariaValueMin: z,
    ariaValueNow: z,
    ariaValueText: null,
    role: null
  },
  transform(t, e) {
    return e === "role" ? e : "aria-" + e.slice(4).toLowerCase();
  }
});
function nl(t, e) {
  return e in t ? t[e] : e;
}
function rl(t, e) {
  return nl(t, e.toLowerCase());
}
const ap = Vn({
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
    accept: Pn,
    acceptCharset: $e,
    accessKey: $e,
    action: null,
    allow: null,
    allowFullScreen: ke,
    allowPaymentRequest: ke,
    allowUserMedia: ke,
    alt: null,
    as: null,
    async: ke,
    autoCapitalize: null,
    autoComplete: $e,
    autoFocus: ke,
    autoPlay: ke,
    blocking: $e,
    capture: null,
    charSet: null,
    checked: ke,
    cite: null,
    className: $e,
    cols: z,
    colSpan: null,
    content: null,
    contentEditable: Xe,
    controls: ke,
    controlsList: $e,
    coords: z | Pn,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: ke,
    defer: ke,
    dir: null,
    dirName: null,
    disabled: ke,
    download: Yi,
    draggable: Xe,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: ke,
    formTarget: null,
    headers: $e,
    height: z,
    hidden: Yi,
    high: z,
    href: null,
    hrefLang: null,
    htmlFor: $e,
    httpEquiv: $e,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: ke,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: ke,
    itemId: null,
    itemProp: $e,
    itemRef: $e,
    itemScope: ke,
    itemType: $e,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: ke,
    low: z,
    manifest: null,
    max: null,
    maxLength: z,
    media: null,
    method: null,
    min: null,
    minLength: z,
    multiple: ke,
    muted: ke,
    name: null,
    nonce: null,
    noModule: ke,
    noValidate: ke,
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
    open: ke,
    optimum: z,
    pattern: null,
    ping: $e,
    placeholder: null,
    playsInline: ke,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: ke,
    referrerPolicy: null,
    rel: $e,
    required: ke,
    reversed: ke,
    rows: z,
    rowSpan: z,
    sandbox: $e,
    scope: null,
    scoped: ke,
    seamless: ke,
    selected: ke,
    shadowRootClonable: ke,
    shadowRootDelegatesFocus: ke,
    shadowRootMode: null,
    shape: null,
    size: z,
    sizes: null,
    slot: null,
    span: z,
    spellCheck: Xe,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: z,
    step: null,
    style: null,
    tabIndex: z,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: ke,
    useMap: null,
    value: Xe,
    width: z,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: $e,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: z,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: z,
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
    compact: ke,
    // Lists. Use CSS to reduce space between items instead
    declare: ke,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: z,
    // `<img>` and `<object>`
    leftMargin: z,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: z,
    // `<body>`
    marginWidth: z,
    // `<body>`
    noResize: ke,
    // `<frame>`
    noHref: ke,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: ke,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: ke,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: z,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: Xe,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: z,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: z,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: ke,
    disableRemotePlayback: ke,
    prefix: null,
    property: null,
    results: z,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: rl
}), sp = Vn({
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
    about: kt,
    accentHeight: z,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: z,
    amplitude: z,
    arabicForm: null,
    ascent: z,
    attributeName: null,
    attributeType: null,
    azimuth: z,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: z,
    by: null,
    calcMode: null,
    capHeight: z,
    className: $e,
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
    descent: z,
    diffuseConstant: z,
    direction: null,
    display: null,
    dur: null,
    divisor: z,
    dominantBaseline: null,
    download: ke,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: z,
    enableBackground: null,
    end: null,
    event: null,
    exponent: z,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: z,
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
    g1: Pn,
    g2: Pn,
    glyphName: Pn,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: z,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: z,
    horizOriginX: z,
    horizOriginY: z,
    id: null,
    ideographic: z,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: z,
    k: z,
    k1: z,
    k2: z,
    k3: z,
    k4: z,
    kernelMatrix: kt,
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
    limitingConeAngle: z,
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
    mediaSize: z,
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
    overlinePosition: z,
    overlineThickness: z,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: z,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: $e,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: z,
    pointsAtY: z,
    pointsAtZ: z,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: kt,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: kt,
    rev: kt,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: kt,
    requiredFeatures: kt,
    requiredFonts: kt,
    requiredFormats: kt,
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
    specularConstant: z,
    specularExponent: z,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: z,
    strikethroughThickness: z,
    string: null,
    stroke: null,
    strokeDashArray: kt,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: z,
    strokeOpacity: z,
    strokeWidth: null,
    style: null,
    surfaceScale: z,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: kt,
    tabIndex: z,
    tableValues: null,
    target: null,
    targetX: z,
    targetY: z,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: kt,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: z,
    underlineThickness: z,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: z,
    values: null,
    vAlphabetic: z,
    vMathematical: z,
    vectorEffect: null,
    vHanging: z,
    vIdeographic: z,
    version: null,
    vertAdvY: z,
    vertOriginX: z,
    vertOriginY: z,
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
    xHeight: z,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: nl
}), il = Vn({
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
}), al = Vn({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: rl
}), sl = Vn({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(t, e) {
    return "xml:" + e.slice(3).toLowerCase();
  }
}), op = {
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
}, lp = /[A-Z]/g, Es = /-[a-z]/g, cp = /^data[-\w.:]+$/i;
function up(t, e) {
  const n = Ki(e);
  let r = e, i = Ct;
  if (n in t.normal)
    return t.property[t.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && cp.test(e)) {
    if (e.charAt(4) === "-") {
      const a = e.slice(5).replace(Es, hp);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = e.slice(4);
      if (!Es.test(a)) {
        let s = a.replace(lp, dp);
        s.charAt(0) !== "-" && (s = "-" + s), e = "data" + s;
      }
    }
    i = pa;
  }
  return new i(r, e);
}
function dp(t) {
  return "-" + t.toLowerCase();
}
function hp(t) {
  return t.charAt(1).toUpperCase();
}
const pp = el([tl, ap, il, al, sl], "html"), fa = el([tl, sp, il, al, sl], "svg");
function fp(t) {
  return t.join(" ").trim();
}
var ga = {}, Rs = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, gp = /\n/g, mp = /^\s*/, yp = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, wp = /^:\s*/, Cp = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, xp = /^[;\s]*/, kp = /^\s+|\s+$/g, _p = `
`, Is = "/", Ns = "*", Sn = "", Sp = "comment", bp = "declaration", vp = function(t, e) {
  if (typeof t != "string")
    throw new TypeError("First argument must be a string");
  if (!t) return [];
  e = e || {};
  var n = 1, r = 1;
  function i(w) {
    var k = w.match(gp);
    k && (n += k.length);
    var I = w.lastIndexOf(_p);
    r = ~I ? w.length - I : r + w.length;
  }
  function a() {
    var w = { line: n, column: r };
    return function(k) {
      return k.position = new s(w), u(), k;
    };
  }
  function s(w) {
    this.start = w, this.end = { line: n, column: r }, this.source = e.source;
  }
  s.prototype.content = t;
  function o(w) {
    var k = new Error(
      e.source + ":" + n + ":" + r + ": " + w
    );
    if (k.reason = w, k.filename = e.source, k.line = n, k.column = r, k.source = t, !e.silent) throw k;
  }
  function l(w) {
    var k = w.exec(t);
    if (k) {
      var I = k[0];
      return i(I), t = t.slice(I.length), k;
    }
  }
  function u() {
    l(mp);
  }
  function c(w) {
    var k;
    for (w = w || []; k = d(); )
      k !== !1 && w.push(k);
    return w;
  }
  function d() {
    var w = a();
    if (!(Is != t.charAt(0) || Ns != t.charAt(1))) {
      for (var k = 2; Sn != t.charAt(k) && (Ns != t.charAt(k) || Is != t.charAt(k + 1)); )
        ++k;
      if (k += 2, Sn === t.charAt(k - 1))
        return o("End of comment missing");
      var I = t.slice(2, k - 2);
      return r += 2, i(I), t = t.slice(k), r += 2, w({
        type: Sp,
        comment: I
      });
    }
  }
  function f() {
    var w = a(), k = l(yp);
    if (k) {
      if (d(), !l(wp)) return o("property missing ':'");
      var I = l(Cp), _ = w({
        type: bp,
        property: As(k[0].replace(Rs, Sn)),
        value: I ? As(I[0].replace(Rs, Sn)) : Sn
      });
      return l(xp), _;
    }
  }
  function h() {
    var w = [];
    c(w);
    for (var k; k = f(); )
      k !== !1 && (w.push(k), c(w));
    return w;
  }
  return u(), h();
};
function As(t) {
  return t ? t.replace(kp, Sn) : Sn;
}
var Tp = Gr && Gr.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(ga, "__esModule", { value: !0 });
ga.default = Rp;
var Ep = Tp(vp);
function Rp(t, e) {
  var n = null;
  if (!t || typeof t != "string")
    return n;
  var r = (0, Ep.default)(t), i = typeof e == "function";
  return r.forEach(function(a) {
    if (a.type === "declaration") {
      var s = a.property, o = a.value;
      i ? e(s, o, a) : o && (n = n || {}, n[s] = o);
    }
  }), n;
}
var ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
ei.camelCase = void 0;
var Ip = /^--[a-zA-Z0-9_-]+$/, Np = /-([a-z])/g, Ap = /^[^-]+$/, Op = /^-(webkit|moz|ms|o|khtml)-/, Mp = /^-(ms)-/, Lp = function(t) {
  return !t || Ap.test(t) || Ip.test(t);
}, Pp = function(t, e) {
  return e.toUpperCase();
}, Os = function(t, e) {
  return "".concat(e, "-");
}, Dp = function(t, e) {
  return e === void 0 && (e = {}), Lp(t) ? t : (t = t.toLowerCase(), e.reactCompat ? t = t.replace(Mp, Os) : t = t.replace(Op, Os), t.replace(Np, Pp));
};
ei.camelCase = Dp;
var Fp = Gr && Gr.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
}, zp = Fp(ga), Hp = ei;
function Ji(t, e) {
  var n = {};
  return !t || typeof t != "string" || (0, zp.default)(t, function(r, i) {
    r && i && (n[(0, Hp.camelCase)(r, e)] = i);
  }), n;
}
Ji.default = Ji;
var Up = Ji;
const $p = /* @__PURE__ */ ha(Up), ol = ll("end"), ma = ll("start");
function ll(t) {
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
function Bp(t) {
  const e = ma(t), n = ol(t);
  if (e && n)
    return { start: e, end: n };
}
function ur(t) {
  return !t || typeof t != "object" ? "" : "position" in t || "type" in t ? Ms(t.position) : "start" in t || "end" in t ? Ms(t) : "line" in t || "column" in t ? Qi(t) : "";
}
function Qi(t) {
  return Ls(t && t.line) + ":" + Ls(t && t.column);
}
function Ms(t) {
  return Qi(t && t.start) + "-" + Qi(t && t.end);
}
function Ls(t) {
  return t && typeof t == "number" ? t : 1;
}
class ct extends Error {
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
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = o ? o.line : void 0, this.name = ur(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = s && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
ct.prototype.file = "";
ct.prototype.name = "";
ct.prototype.reason = "";
ct.prototype.message = "";
ct.prototype.stack = "";
ct.prototype.column = void 0;
ct.prototype.line = void 0;
ct.prototype.ancestors = void 0;
ct.prototype.cause = void 0;
ct.prototype.fatal = void 0;
ct.prototype.place = void 0;
ct.prototype.ruleId = void 0;
ct.prototype.source = void 0;
const ya = {}.hasOwnProperty, jp = /* @__PURE__ */ new Map(), Vp = /[A-Z]/g, Zp = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Wp = /* @__PURE__ */ new Set(["td", "th"]), cl = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Gp(t, e) {
  if (!e || e.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = e.filePath || void 0;
  let r;
  if (e.development) {
    if (typeof e.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = tf(n, e.jsxDEV);
  } else {
    if (typeof e.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof e.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = ef(n, e.jsx, e.jsxs);
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
    schema: e.space === "svg" ? fa : pp,
    stylePropertyNameCase: e.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: e.tableCellAlignToStyle !== !1
  }, a = ul(i, t, void 0);
  return a && typeof a != "string" ? a : i.create(
    t,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function ul(t, e, n) {
  if (e.type === "element")
    return qp(t, e, n);
  if (e.type === "mdxFlowExpression" || e.type === "mdxTextExpression")
    return Kp(t, e);
  if (e.type === "mdxJsxFlowElement" || e.type === "mdxJsxTextElement")
    return Xp(t, e, n);
  if (e.type === "mdxjsEsm")
    return Yp(t, e);
  if (e.type === "root")
    return Jp(t, e, n);
  if (e.type === "text")
    return Qp(t, e);
}
function qp(t, e, n) {
  const r = t.schema;
  let i = r;
  e.tagName.toLowerCase() === "svg" && r.space === "html" && (i = fa, t.schema = i), t.ancestors.push(e);
  const a = hl(t, e.tagName, !1), s = nf(t, e);
  let o = Ca(t, e);
  return Zp.has(e.tagName) && (o = o.filter(function(l) {
    return typeof l == "string" ? !rp(l) : !0;
  })), dl(t, s, a, e), wa(s, o), t.ancestors.pop(), t.schema = r, t.create(e, a, s, n);
}
function Kp(t, e) {
  if (e.data && e.data.estree && t.evaluater) {
    const r = e.data.estree.body[0];
    return S(r.type === "ExpressionStatement"), /** @type {Child | undefined} */
    t.evaluater.evaluateExpression(r.expression);
  }
  wr(t, e.position);
}
function Yp(t, e) {
  if (e.data && e.data.estree && t.evaluater)
    return (
      /** @type {Child | undefined} */
      t.evaluater.evaluateProgram(e.data.estree)
    );
  wr(t, e.position);
}
function Xp(t, e, n) {
  const r = t.schema;
  let i = r;
  e.name === "svg" && r.space === "html" && (i = fa, t.schema = i), t.ancestors.push(e);
  const a = e.name === null ? t.Fragment : hl(t, e.name, !0), s = rf(t, e), o = Ca(t, e);
  return dl(t, s, a, e), wa(s, o), t.ancestors.pop(), t.schema = r, t.create(e, a, s, n);
}
function Jp(t, e, n) {
  const r = {};
  return wa(r, Ca(t, e)), t.create(e, t.Fragment, r, n);
}
function Qp(t, e) {
  return e.value;
}
function dl(t, e, n, r) {
  typeof n != "string" && n !== t.Fragment && t.passNode && (e.node = r);
}
function wa(t, e) {
  if (e.length > 0) {
    const n = e.length > 1 ? e : e[0];
    n && (t.children = n);
  }
}
function ef(t, e, n) {
  return r;
  function r(i, a, s, o) {
    const u = Array.isArray(s.children) ? n : e;
    return o ? u(a, s, o) : u(a, s);
  }
}
function tf(t, e) {
  return n;
  function n(r, i, a, s) {
    const o = Array.isArray(a.children), l = ma(r);
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
function nf(t, e) {
  const n = {};
  let r, i;
  for (i in e.properties)
    if (i !== "children" && ya.call(e.properties, i)) {
      const a = af(t, i, e.properties[i]);
      if (a) {
        const [s, o] = a;
        t.tableCellAlignToStyle && s === "align" && typeof o == "string" && Wp.has(e.tagName) ? r = o : n[s] = o;
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
function rf(t, e) {
  const n = {};
  for (const r of e.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && t.evaluater) {
        const a = r.data.estree.body[0];
        S(a.type === "ExpressionStatement");
        const s = a.expression;
        S(s.type === "ObjectExpression");
        const o = s.properties[0];
        S(o.type === "SpreadElement"), Object.assign(
          n,
          t.evaluater.evaluateExpression(o.argument)
        );
      } else
        wr(t, e.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && t.evaluater) {
          const o = r.value.data.estree.body[0];
          S(o.type === "ExpressionStatement"), a = t.evaluater.evaluateExpression(o.expression);
        } else
          wr(t, e.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function Ca(t, e) {
  const n = [];
  let r = -1;
  const i = t.passKeys ? /* @__PURE__ */ new Map() : jp;
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
    const o = ul(t, a, s);
    o !== void 0 && n.push(o);
  }
  return n;
}
function af(t, e, n) {
  const r = up(t.schema, e);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Jh(n) : fp(n)), r.property === "style") {
      let i = typeof n == "object" ? n : sf(t, String(n));
      return t.stylePropertyNameCase === "css" && (i = of(i)), ["style", i];
    }
    return [
      t.elementAttributeNameCase === "react" && r.space ? op[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function sf(t, e) {
  try {
    return $p(e, { reactCompat: !0 });
  } catch (n) {
    if (t.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new ct("Cannot parse `style` attribute", {
      ancestors: t.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = t.filePath || void 0, i.url = cl + "#cannot-parse-style-attribute", i;
  }
}
function hl(t, e, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: e };
  else if (e.includes(".")) {
    const i = e.split(".");
    let a = -1, s;
    for (; ++a < i.length; ) {
      const o = bs(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
      s = s ? {
        type: "MemberExpression",
        object: s,
        property: o,
        computed: !!(a && o.type === "Literal"),
        optional: !1
      } : o;
    }
    S(s, "always a result"), r = s;
  } else
    r = bs(e) && !/^[a-z]/.test(e) ? { type: "Identifier", name: e } : { type: "Literal", value: e };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return ya.call(t.components, i) ? t.components[i] : i;
  }
  if (t.evaluater)
    return t.evaluater.evaluateExpression(r);
  wr(t);
}
function wr(t, e) {
  const n = new ct(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: t.ancestors,
      place: e,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = t.filePath || void 0, n.url = cl + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function of(t) {
  const e = {};
  let n;
  for (n in t)
    ya.call(t, n) && (e[lf(n)] = t[n]);
  return e;
}
function lf(t) {
  let e = t.replace(Vp, cf);
  return e.slice(0, 3) === "ms-" && (e = "-" + e), e;
}
function cf(t) {
  return "-" + t.toLowerCase();
}
const _i = {
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
}, uf = {};
function df(t, e) {
  const n = uf, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return pl(t, r, i);
}
function pl(t, e, n) {
  if (hf(t)) {
    if ("value" in t)
      return t.type === "html" && !n ? "" : t.value;
    if (e && "alt" in t && t.alt)
      return t.alt;
    if ("children" in t)
      return Ps(t.children, e, n);
  }
  return Array.isArray(t) ? Ps(t, e, n) : "";
}
function Ps(t, e, n) {
  const r = [];
  let i = -1;
  for (; ++i < t.length; )
    r[i] = pl(t[i], e, n);
  return r.join("");
}
function hf(t) {
  return !!(t && typeof t == "object");
}
const Ds = document.createElement("i");
function xa(t) {
  const e = "&" + t + ";";
  Ds.innerHTML = e;
  const n = Ds.textContent;
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
), Y = (
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
), g = (
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
), Wt = (
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
function Jt(t, e, n, r) {
  const i = t.length;
  let a = 0, s;
  if (e < 0 ? e = -e > i ? 0 : i + e : e = e > i ? i : e, n = n > 0 ? n : 0, r.length < Y.v8MaxSafeChunkSize)
    s = Array.from(r), s.unshift(e, n), t.splice(...s);
  else
    for (n && t.splice(e, n); a < r.length; )
      s = r.slice(
        a,
        a + Y.v8MaxSafeChunkSize
      ), s.unshift(e, 0), t.splice(...s), a += Y.v8MaxSafeChunkSize, e += Y.v8MaxSafeChunkSize;
}
function At(t, e) {
  return t.length > 0 ? (Jt(t, t.length, 0, e), t) : e;
}
const Fs = {}.hasOwnProperty;
function pf(t) {
  const e = {};
  let n = -1;
  for (; ++n < t.length; )
    ff(e, t[n]);
  return e;
}
function ff(t, e) {
  let n;
  for (n in e) {
    const i = (Fs.call(t, n) ? t[n] : void 0) || (t[n] = {}), a = e[n];
    let s;
    if (a)
      for (s in a) {
        Fs.call(i, s) || (i[s] = []);
        const o = a[s];
        gf(
          // @ts-expect-error Looks like a list.
          i[s],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function gf(t, e) {
  let n = -1;
  const r = [];
  for (; ++n < e.length; )
    (e[n].add === "after" ? t : r).push(e[n]);
  Jt(t, 0, 0, r);
}
function fl(t, e) {
  const n = Number.parseInt(t, e);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < m.ht || n === m.vt || n > m.cr && n < m.space || // Control character (DEL) of C0, and C1 controls.
    n > m.tilde && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? Wt.replacementCharacter : String.fromCodePoint(n)
  );
}
function Dn(t) {
  return t.replace(/[\t\n\r ]+/g, Wt.space).replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const qt = mn(/[A-Za-z]/), St = mn(/[\dA-Za-z]/), mf = mn(/[#-'*+\--9=?A-Z^-~]/);
function ea(t) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    t !== null && (t < m.space || t === m.del)
  );
}
const ta = mn(/\d/), yf = mn(/[\dA-Fa-f]/), wf = mn(/[!-/:-@[-`{-~]/);
function ie(t) {
  return t !== null && t < m.horizontalTab;
}
function yt(t) {
  return t !== null && (t < m.nul || t === m.space);
}
function Le(t) {
  return t === m.horizontalTab || t === m.virtualSpace || t === m.space;
}
const Cf = mn(new RegExp("\\p{P}|\\p{S}", "u")), xf = mn(/\s/);
function mn(t) {
  return e;
  function e(n) {
    return n !== null && n > -1 && t.test(String.fromCharCode(n));
  }
}
function Zn(t) {
  const e = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < t.length; ) {
    const a = t.charCodeAt(n);
    let s = "";
    if (a === m.percentSign && St(t.charCodeAt(n + 1)) && St(t.charCodeAt(n + 2)))
      i = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (s = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const o = t.charCodeAt(n + 1);
      a < 56320 && o > 56319 && o < 57344 ? (s = String.fromCharCode(a, o), i = 1) : s = Wt.replacementCharacter;
    } else
      s = String.fromCharCode(a);
    s && (e.push(t.slice(r, n), encodeURIComponent(s)), r = n + i + 1, s = ""), i && (n += i, i = 0);
  }
  return e.join("") + t.slice(r);
}
function Be(t, e, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return s;
  function s(l) {
    return Le(l) ? (t.enter(n), o(l)) : e(l);
  }
  function o(l) {
    return Le(l) && a++ < i ? (t.consume(l), o) : (t.exit(n), e(l));
  }
}
const kf = { tokenize: _f };
function _f(t) {
  const e = t.attempt(
    this.parser.constructs.contentInitial,
    r,
    i
  );
  let n;
  return e;
  function r(o) {
    if (S(
      o === m.eof || ie(o),
      "expected eol or eof"
    ), o === m.eof) {
      t.consume(o);
      return;
    }
    return t.enter(g.lineEnding), t.consume(o), t.exit(g.lineEnding), Be(t, e, g.linePrefix);
  }
  function i(o) {
    return S(
      o !== m.eof && !ie(o),
      "expected anything other than a line ending or EOF"
    ), t.enter(g.paragraph), a(o);
  }
  function a(o) {
    const l = t.enter(g.chunkText, {
      contentType: Y.contentTypeText,
      previous: n
    });
    return n && (n.next = l), n = l, s(o);
  }
  function s(o) {
    if (o === m.eof) {
      t.exit(g.chunkText), t.exit(g.paragraph), t.consume(o);
      return;
    }
    return ie(o) ? (t.consume(o), t.exit(g.chunkText), a) : (t.consume(o), s);
  }
}
const Sf = { tokenize: bf }, zs = { tokenize: vf };
function bf(t) {
  const e = this, n = [];
  let r = 0, i, a, s;
  return o;
  function o(R) {
    if (r < n.length) {
      const M = n[r];
      return e.containerState = M[1], S(
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
    if (S(
      e.containerState,
      "expected `containerState` to be defined after continuation"
    ), r++, e.containerState._closeFlow) {
      e.containerState._closeFlow = void 0, i && v();
      const M = e.events.length;
      let L = M, b;
      for (; L--; )
        if (e.events[L][0] === "exit" && e.events[L][1].type === g.chunkFlow) {
          b = e.events[L][1].end;
          break;
        }
      S(b, "could not find previous flow chunk"), _(r);
      let j = M;
      for (; j < e.events.length; )
        e.events[j][1].end = { ...b }, j++;
      return Jt(
        e.events,
        L + 1,
        0,
        e.events.slice(M)
      ), e.events.length = j, u(R);
    }
    return o(R);
  }
  function u(R) {
    if (r === n.length) {
      if (!i)
        return f(R);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return w(R);
      e.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return e.containerState = {}, t.check(
      zs,
      c,
      d
    )(R);
  }
  function c(R) {
    return i && v(), _(r), f(R);
  }
  function d(R) {
    return e.parser.lazy[e.now().line] = r !== n.length, s = e.now().offset, w(R);
  }
  function f(R) {
    return e.containerState = {}, t.attempt(
      zs,
      h,
      w
    )(R);
  }
  function h(R) {
    return S(
      e.currentConstruct,
      "expected `currentConstruct` to be defined on tokenizer"
    ), S(
      e.containerState,
      "expected `containerState` to be defined on tokenizer"
    ), r++, n.push([e.currentConstruct, e.containerState]), f(R);
  }
  function w(R) {
    if (R === m.eof) {
      i && v(), _(0), t.consume(R);
      return;
    }
    return i = i || e.parser.flow(e.now()), t.enter(g.chunkFlow, {
      _tokenizer: i,
      contentType: Y.contentTypeFlow,
      previous: a
    }), k(R);
  }
  function k(R) {
    if (R === m.eof) {
      I(t.exit(g.chunkFlow), !0), _(0), t.consume(R);
      return;
    }
    return ie(R) ? (t.consume(R), I(t.exit(g.chunkFlow)), r = 0, e.interrupt = void 0, o) : (t.consume(R), k);
  }
  function I(R, M) {
    S(i, "expected `childFlow` to be defined when continuing");
    const L = e.sliceStream(R);
    if (M && L.push(null), R.previous = a, a && (a.next = R), a = R, i.defineSkip(R.start), i.write(L), e.parser.lazy[R.start.line]) {
      let b = i.events.length;
      for (; b--; )
        if (
          // The token starts before the line ending…
          i.events[b][1].start.offset < s && // …and either is not ended yet…
          (!i.events[b][1].end || // …or ends after it.
          i.events[b][1].end.offset > s)
        )
          return;
      const j = e.events.length;
      let $ = j, H, te;
      for (; $--; )
        if (e.events[$][0] === "exit" && e.events[$][1].type === g.chunkFlow) {
          if (H) {
            te = e.events[$][1].end;
            break;
          }
          H = !0;
        }
      for (S(te, "could not find previous flow chunk"), _(r), b = j; b < e.events.length; )
        e.events[b][1].end = { ...te }, b++;
      Jt(
        e.events,
        $ + 1,
        0,
        e.events.slice(j)
      ), e.events.length = b;
    }
  }
  function _(R) {
    let M = n.length;
    for (; M-- > R; ) {
      const L = n[M];
      e.containerState = L[1], S(
        L[0].exit,
        "expected `exit` to be defined on container construct"
      ), L[0].exit.call(e, t);
    }
    n.length = R;
  }
  function v() {
    S(
      e.containerState,
      "expected `containerState` to be defined when closing flow"
    ), S(i, "expected `childFlow` to be defined when closing it"), i.write([m.eof]), a = void 0, i = void 0, e.containerState._closeFlow = void 0;
  }
}
function vf(t, e, n) {
  return S(
    this.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), Be(
    t,
    t.attempt(this.parser.constructs.document, e, n),
    g.linePrefix,
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : Y.tabSize
  );
}
function Hs(t) {
  if (t === m.eof || yt(t) || xf(t))
    return Y.characterGroupWhitespace;
  if (Cf(t))
    return Y.characterGroupPunctuation;
}
function ka(t, e, n) {
  const r = [];
  let i = -1;
  for (; ++i < t.length; ) {
    const a = t[i].resolveAll;
    a && !r.includes(a) && (e = a(e, n), r.push(a));
  }
  return e;
}
const na = {
  name: "attention",
  resolveAll: Tf,
  tokenize: Ef
};
function Tf(t, e) {
  let n = -1, r, i, a, s, o, l, u, c;
  for (; ++n < t.length; )
    if (t[n][0] === "enter" && t[n][1].type === "attentionSequence" && t[n][1]._close) {
      for (r = n; r--; )
        if (t[r][0] === "exit" && t[r][1].type === "attentionSequence" && t[r][1]._open && // If the markers are the same:
        e.sliceSerialize(t[r][1]).charCodeAt(0) === e.sliceSerialize(t[n][1]).charCodeAt(0)) {
          if ((t[r][1]._close || t[n][1]._open) && (t[n][1].end.offset - t[n][1].start.offset) % 3 && !((t[r][1].end.offset - t[r][1].start.offset + t[n][1].end.offset - t[n][1].start.offset) % 3))
            continue;
          l = t[r][1].end.offset - t[r][1].start.offset > 1 && t[n][1].end.offset - t[n][1].start.offset > 1 ? 2 : 1;
          const d = { ...t[r][1].end }, f = { ...t[n][1].start };
          Us(d, -l), Us(f, l), s = {
            type: l > 1 ? g.strongSequence : g.emphasisSequence,
            start: d,
            end: { ...t[r][1].end }
          }, o = {
            type: l > 1 ? g.strongSequence : g.emphasisSequence,
            start: { ...t[n][1].start },
            end: f
          }, a = {
            type: l > 1 ? g.strongText : g.emphasisText,
            start: { ...t[r][1].end },
            end: { ...t[n][1].start }
          }, i = {
            type: l > 1 ? g.strong : g.emphasis,
            start: { ...s.start },
            end: { ...o.end }
          }, t[r][1].end = { ...s.start }, t[n][1].start = { ...o.end }, u = [], t[r][1].end.offset - t[r][1].start.offset && (u = At(u, [
            ["enter", t[r][1], e],
            ["exit", t[r][1], e]
          ])), u = At(u, [
            ["enter", i, e],
            ["enter", s, e],
            ["exit", s, e],
            ["enter", a, e]
          ]), S(
            e.parser.constructs.insideSpan.null,
            "expected `insideSpan` to be populated"
          ), u = At(
            u,
            ka(
              e.parser.constructs.insideSpan.null,
              t.slice(r + 1, n),
              e
            )
          ), u = At(u, [
            ["exit", a, e],
            ["enter", o, e],
            ["exit", o, e],
            ["exit", i, e]
          ]), t[n][1].end.offset - t[n][1].start.offset ? (c = 2, u = At(u, [
            ["enter", t[n][1], e],
            ["exit", t[n][1], e]
          ])) : c = 0, Jt(t, r - 1, n - r + 3, u), n = r + u.length - c - 2;
          break;
        }
    }
  for (n = -1; ++n < t.length; )
    t[n][1].type === "attentionSequence" && (t[n][1].type = "data");
  return t;
}
function Ef(t, e) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Hs(r);
  let a;
  return s;
  function s(l) {
    return S(
      l === m.asterisk || l === m.underscore,
      "expected asterisk or underscore"
    ), a = l, t.enter("attentionSequence"), o(l);
  }
  function o(l) {
    if (l === a)
      return t.consume(l), o;
    const u = t.exit("attentionSequence"), c = Hs(l);
    S(n, "expected `attentionMarkers` to be populated");
    const d = !c || c === Y.characterGroupPunctuation && i || n.includes(l), f = !i || i === Y.characterGroupPunctuation && c || n.includes(r);
    return u._open = !!(a === m.asterisk ? d : d && (i || !f)), u._close = !!(a === m.asterisk ? f : f && (c || !d)), e(l);
  }
}
function Us(t, e) {
  t.column += e, t.offset += e, t._bufferIndex += e;
}
const Rf = { name: "autolink", tokenize: If };
function If(t, e, n) {
  let r = 0;
  return i;
  function i(h) {
    return S(h === m.lessThan, "expected `<`"), t.enter(g.autolink), t.enter(g.autolinkMarker), t.consume(h), t.exit(g.autolinkMarker), t.enter(g.autolinkProtocol), a;
  }
  function a(h) {
    return qt(h) ? (t.consume(h), s) : h === m.atSign ? n(h) : u(h);
  }
  function s(h) {
    return h === m.plusSign || h === m.dash || h === m.dot || St(h) ? (r = 1, o(h)) : u(h);
  }
  function o(h) {
    return h === m.colon ? (t.consume(h), r = 0, l) : (h === m.plusSign || h === m.dash || h === m.dot || St(h)) && r++ < Y.autolinkSchemeSizeMax ? (t.consume(h), o) : (r = 0, u(h));
  }
  function l(h) {
    return h === m.greaterThan ? (t.exit(g.autolinkProtocol), t.enter(g.autolinkMarker), t.consume(h), t.exit(g.autolinkMarker), t.exit(g.autolink), e) : h === m.eof || h === m.space || h === m.lessThan || ea(h) ? n(h) : (t.consume(h), l);
  }
  function u(h) {
    return h === m.atSign ? (t.consume(h), c) : mf(h) ? (t.consume(h), u) : n(h);
  }
  function c(h) {
    return St(h) ? d(h) : n(h);
  }
  function d(h) {
    return h === m.dot ? (t.consume(h), r = 0, c) : h === m.greaterThan ? (t.exit(g.autolinkProtocol).type = g.autolinkEmail, t.enter(g.autolinkMarker), t.consume(h), t.exit(g.autolinkMarker), t.exit(g.autolink), e) : f(h);
  }
  function f(h) {
    if ((h === m.dash || St(h)) && r++ < Y.autolinkDomainSizeMax) {
      const w = h === m.dash ? f : d;
      return t.consume(h), w;
    }
    return n(h);
  }
}
const ti = { partial: !0, tokenize: Nf };
function Nf(t, e, n) {
  return r;
  function r(a) {
    return Le(a) ? Be(t, i, g.linePrefix)(a) : i(a);
  }
  function i(a) {
    return a === m.eof || ie(a) ? e(a) : n(a);
  }
}
const gl = {
  continuation: { tokenize: Of },
  exit: Mf,
  name: "blockQuote",
  tokenize: Af
};
function Af(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    if (s === m.greaterThan) {
      const o = r.containerState;
      return S(o, "expected `containerState` to be defined in container"), o.open || (t.enter(g.blockQuote, { _container: !0 }), o.open = !0), t.enter(g.blockQuotePrefix), t.enter(g.blockQuoteMarker), t.consume(s), t.exit(g.blockQuoteMarker), a;
    }
    return n(s);
  }
  function a(s) {
    return Le(s) ? (t.enter(g.blockQuotePrefixWhitespace), t.consume(s), t.exit(g.blockQuotePrefixWhitespace), t.exit(g.blockQuotePrefix), e) : (t.exit(g.blockQuotePrefix), e(s));
  }
}
function Of(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return Le(s) ? (S(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Be(
      t,
      a,
      g.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : Y.tabSize
    )(s)) : a(s);
  }
  function a(s) {
    return t.attempt(gl, e, n)(s);
  }
}
function Mf(t) {
  t.exit(g.blockQuote);
}
const ml = {
  name: "characterEscape",
  tokenize: Lf
};
function Lf(t, e, n) {
  return r;
  function r(a) {
    return S(a === m.backslash, "expected `\\`"), t.enter(g.characterEscape), t.enter(g.escapeMarker), t.consume(a), t.exit(g.escapeMarker), i;
  }
  function i(a) {
    return wf(a) ? (t.enter(g.characterEscapeValue), t.consume(a), t.exit(g.characterEscapeValue), t.exit(g.characterEscape), e) : n(a);
  }
}
const yl = {
  name: "characterReference",
  tokenize: Pf
};
function Pf(t, e, n) {
  const r = this;
  let i = 0, a, s;
  return o;
  function o(d) {
    return S(d === m.ampersand, "expected `&`"), t.enter(g.characterReference), t.enter(g.characterReferenceMarker), t.consume(d), t.exit(g.characterReferenceMarker), l;
  }
  function l(d) {
    return d === m.numberSign ? (t.enter(g.characterReferenceMarkerNumeric), t.consume(d), t.exit(g.characterReferenceMarkerNumeric), u) : (t.enter(g.characterReferenceValue), a = Y.characterReferenceNamedSizeMax, s = St, c(d));
  }
  function u(d) {
    return d === m.uppercaseX || d === m.lowercaseX ? (t.enter(g.characterReferenceMarkerHexadecimal), t.consume(d), t.exit(g.characterReferenceMarkerHexadecimal), t.enter(g.characterReferenceValue), a = Y.characterReferenceHexadecimalSizeMax, s = yf, c) : (t.enter(g.characterReferenceValue), a = Y.characterReferenceDecimalSizeMax, s = ta, c(d));
  }
  function c(d) {
    if (d === m.semicolon && i) {
      const f = t.exit(g.characterReferenceValue);
      return s === St && !xa(r.sliceSerialize(f)) ? n(d) : (t.enter(g.characterReferenceMarker), t.consume(d), t.exit(g.characterReferenceMarker), t.exit(g.characterReference), e);
    }
    return s(d) && i++ < a ? (t.consume(d), c) : n(d);
  }
}
const $s = {
  partial: !0,
  tokenize: Ff
}, Bs = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Df
};
function Df(t, e, n) {
  const r = this, i = { partial: !0, tokenize: L };
  let a = 0, s = 0, o;
  return l;
  function l(b) {
    return u(b);
  }
  function u(b) {
    S(
      b === m.graveAccent || b === m.tilde,
      "expected `` ` `` or `~`"
    );
    const j = r.events[r.events.length - 1];
    return a = j && j[1].type === g.linePrefix ? j[2].sliceSerialize(j[1], !0).length : 0, o = b, t.enter(g.codeFenced), t.enter(g.codeFencedFence), t.enter(g.codeFencedFenceSequence), c(b);
  }
  function c(b) {
    return b === o ? (s++, t.consume(b), c) : s < Y.codeFencedSequenceSizeMin ? n(b) : (t.exit(g.codeFencedFenceSequence), Le(b) ? Be(t, d, g.whitespace)(b) : d(b));
  }
  function d(b) {
    return b === m.eof || ie(b) ? (t.exit(g.codeFencedFence), r.interrupt ? e(b) : t.check($s, k, M)(b)) : (t.enter(g.codeFencedFenceInfo), t.enter(g.chunkString, { contentType: Y.contentTypeString }), f(b));
  }
  function f(b) {
    return b === m.eof || ie(b) ? (t.exit(g.chunkString), t.exit(g.codeFencedFenceInfo), d(b)) : Le(b) ? (t.exit(g.chunkString), t.exit(g.codeFencedFenceInfo), Be(t, h, g.whitespace)(b)) : b === m.graveAccent && b === o ? n(b) : (t.consume(b), f);
  }
  function h(b) {
    return b === m.eof || ie(b) ? d(b) : (t.enter(g.codeFencedFenceMeta), t.enter(g.chunkString, { contentType: Y.contentTypeString }), w(b));
  }
  function w(b) {
    return b === m.eof || ie(b) ? (t.exit(g.chunkString), t.exit(g.codeFencedFenceMeta), d(b)) : b === m.graveAccent && b === o ? n(b) : (t.consume(b), w);
  }
  function k(b) {
    return S(ie(b), "expected eol"), t.attempt(i, M, I)(b);
  }
  function I(b) {
    return S(ie(b), "expected eol"), t.enter(g.lineEnding), t.consume(b), t.exit(g.lineEnding), _;
  }
  function _(b) {
    return a > 0 && Le(b) ? Be(
      t,
      v,
      g.linePrefix,
      a + 1
    )(b) : v(b);
  }
  function v(b) {
    return b === m.eof || ie(b) ? t.check($s, k, M)(b) : (t.enter(g.codeFlowValue), R(b));
  }
  function R(b) {
    return b === m.eof || ie(b) ? (t.exit(g.codeFlowValue), v(b)) : (t.consume(b), R);
  }
  function M(b) {
    return t.exit(g.codeFenced), e(b);
  }
  function L(b, j, $) {
    let H = 0;
    return te;
    function te(F) {
      return S(ie(F), "expected eol"), b.enter(g.lineEnding), b.consume(F), b.exit(g.lineEnding), de;
    }
    function de(F) {
      return S(
        r.parser.constructs.disable.null,
        "expected `disable.null` to be populated"
      ), b.enter(g.codeFencedFence), Le(F) ? Be(
        b,
        G,
        g.linePrefix,
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : Y.tabSize
      )(F) : G(F);
    }
    function G(F) {
      return F === o ? (b.enter(g.codeFencedFenceSequence), N(F)) : $(F);
    }
    function N(F) {
      return F === o ? (H++, b.consume(F), N) : H >= s ? (b.exit(g.codeFencedFenceSequence), Le(F) ? Be(b, P, g.whitespace)(F) : P(F)) : $(F);
    }
    function P(F) {
      return F === m.eof || ie(F) ? (b.exit(g.codeFencedFence), j(F)) : $(F);
    }
  }
}
function Ff(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return s === m.eof ? n(s) : (S(ie(s), "expected eol"), t.enter(g.lineEnding), t.consume(s), t.exit(g.lineEnding), a);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : e(s);
  }
}
const Si = {
  name: "codeIndented",
  tokenize: Hf
}, zf = { partial: !0, tokenize: Uf };
function Hf(t, e, n) {
  const r = this;
  return i;
  function i(u) {
    return S(Le(u)), t.enter(g.codeIndented), Be(
      t,
      a,
      g.linePrefix,
      Y.tabSize + 1
    )(u);
  }
  function a(u) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === g.linePrefix && c[2].sliceSerialize(c[1], !0).length >= Y.tabSize ? s(u) : n(u);
  }
  function s(u) {
    return u === m.eof ? l(u) : ie(u) ? t.attempt(zf, s, l)(u) : (t.enter(g.codeFlowValue), o(u));
  }
  function o(u) {
    return u === m.eof || ie(u) ? (t.exit(g.codeFlowValue), s(u)) : (t.consume(u), o);
  }
  function l(u) {
    return t.exit(g.codeIndented), e(u);
  }
}
function Uf(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line] ? n(s) : ie(s) ? (t.enter(g.lineEnding), t.consume(s), t.exit(g.lineEnding), i) : Be(
      t,
      a,
      g.linePrefix,
      Y.tabSize + 1
    )(s);
  }
  function a(s) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === g.linePrefix && o[2].sliceSerialize(o[1], !0).length >= Y.tabSize ? e(s) : ie(s) ? i(s) : n(s);
  }
}
const $f = {
  name: "codeText",
  previous: wl,
  resolve: Bf,
  tokenize: jf
};
function Bf(t) {
  let e = t.length - 4, n = 3, r, i;
  if ((t[n][1].type === g.lineEnding || t[n][1].type === "space") && (t[e][1].type === g.lineEnding || t[e][1].type === "space")) {
    for (r = n; ++r < e; )
      if (t[r][1].type === g.codeTextData) {
        t[n][1].type = g.codeTextPadding, t[e][1].type = g.codeTextPadding, n += 2, e -= 2;
        break;
      }
  }
  for (r = n - 1, e++; ++r <= e; )
    i === void 0 ? r !== e && t[r][1].type !== g.lineEnding && (i = r) : (r === e || t[r][1].type === g.lineEnding) && (t[i][1].type = g.codeTextData, r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), e -= r - i - 2, r = i + 2), i = void 0);
  return t;
}
function wl(t) {
  return t !== m.graveAccent || this.events[this.events.length - 1][1].type === g.characterEscape;
}
function jf(t, e, n) {
  const r = this;
  let i = 0, a, s;
  return o;
  function o(f) {
    return S(f === m.graveAccent, "expected `` ` ``"), S(wl.call(r, r.previous), "expected correct previous"), t.enter(g.codeText), t.enter(g.codeTextSequence), l(f);
  }
  function l(f) {
    return f === m.graveAccent ? (t.consume(f), i++, l) : (t.exit(g.codeTextSequence), u(f));
  }
  function u(f) {
    return f === m.eof ? n(f) : f === m.space ? (t.enter("space"), t.consume(f), t.exit("space"), u) : f === m.graveAccent ? (s = t.enter(g.codeTextSequence), a = 0, d(f)) : ie(f) ? (t.enter(g.lineEnding), t.consume(f), t.exit(g.lineEnding), u) : (t.enter(g.codeTextData), c(f));
  }
  function c(f) {
    return f === m.eof || f === m.space || f === m.graveAccent || ie(f) ? (t.exit(g.codeTextData), u(f)) : (t.consume(f), c);
  }
  function d(f) {
    return f === m.graveAccent ? (t.consume(f), a++, d) : a === i ? (t.exit(g.codeTextSequence), t.exit(g.codeText), e(f)) : (s.type = g.codeTextData, c(f));
  }
}
class Vf {
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
    return r && ar(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), ar(this.left, e);
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
    this.setCursor(0), ar(this.right, e.reverse());
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
        ar(this.right, n.reverse());
      } else {
        const n = this.right.splice(
          this.left.length + this.right.length - e,
          Number.POSITIVE_INFINITY
        );
        ar(this.left, n.reverse());
      }
  }
}
function ar(t, e) {
  let n = 0;
  if (e.length < Y.v8MaxSafeChunkSize)
    t.push(...e);
  else
    for (; n < e.length; )
      t.push(
        ...e.slice(n, n + Y.v8MaxSafeChunkSize)
      ), n += Y.v8MaxSafeChunkSize;
}
function Cl(t) {
  const e = {};
  let n = -1, r, i, a, s, o, l, u;
  const c = new Vf(t);
  for (; ++n < c.length; ) {
    for (; n in e; )
      n = e[n];
    if (r = c.get(n), n && r[1].type === g.chunkFlow && c.get(n - 1)[1].type === g.listItemPrefix && (S(r[1]._tokenizer, "expected `_tokenizer` on subtokens"), l = r[1]._tokenizer.events, a = 0, a < l.length && l[a][1].type === g.lineEndingBlank && (a += 2), a < l.length && l[a][1].type === g.content))
      for (; ++a < l.length && l[a][1].type !== g.content; )
        l[a][1].type === g.chunkText && (l[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(e, Zf(c, n)), n = e[n], u = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (s = c.get(a), s[1].type === g.lineEnding || s[1].type === g.lineEndingBlank)
          s[0] === "enter" && (i && (c.get(i)[1].type = g.lineEndingBlank), s[1].type = g.lineEnding, i = a);
        else if (!(s[1].type === g.linePrefix || s[1].type === g.listItemIndent)) break;
      i && (r[1].end = { ...c.get(i)[1].start }, o = c.slice(i, n), o.unshift(r), c.splice(i, n - i + 1, o));
    }
  }
  return Jt(t, 0, Number.POSITIVE_INFINITY, c.slice(0)), !u;
}
function Zf(t, e) {
  const n = t.get(e)[1], r = t.get(e)[2];
  let i = e - 1;
  const a = [];
  S(n.contentType, "expected `contentType` on subtokens");
  let s = n._tokenizer;
  s || (s = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  const o = s.events, l = [], u = {};
  let c, d, f = -1, h = n, w = 0, k = 0;
  const I = [k];
  for (; h; ) {
    for (; t.get(++i)[1] !== h; )
      ;
    S(
      !d || h.previous === d,
      "expected previous to match"
    ), S(!d || d.next === h, "expected next to match"), a.push(i), h._tokenizer || (c = r.sliceStream(h), h.next || c.push(m.eof), d && s.defineSkip(h.start), h._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0), s.write(c), h._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)), d = h, h = h.next;
  }
  for (h = n; ++f < o.length; )
    // Find a void token that includes a break.
    o[f][0] === "exit" && o[f - 1][0] === "enter" && o[f][1].type === o[f - 1][1].type && o[f][1].start.line !== o[f][1].end.line && (S(h, "expected a current token"), k = f + 1, I.push(k), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (s.events = [], h ? (h._tokenizer = void 0, h.previous = void 0, S(!h.next, "expected no next token")) : I.pop(), f = I.length; f--; ) {
    const _ = o.slice(I[f], I[f + 1]), v = a.pop();
    S(v !== void 0, "expected a start position when splicing"), l.push([v, v + _.length - 1]), t.splice(v, 2, _);
  }
  for (l.reverse(), f = -1; ++f < l.length; )
    u[w + l[f][0]] = w + l[f][1], w += l[f][1] - l[f][0] - 1;
  return u;
}
const Wf = { resolve: qf, tokenize: Kf }, Gf = { partial: !0, tokenize: Yf };
function qf(t) {
  return Cl(t), t;
}
function Kf(t, e) {
  let n;
  return r;
  function r(o) {
    return S(
      o !== m.eof && !ie(o),
      "expected no eof or eol"
    ), t.enter(g.content), n = t.enter(g.chunkContent, {
      contentType: Y.contentTypeContent
    }), i(o);
  }
  function i(o) {
    return o === m.eof ? a(o) : ie(o) ? t.check(
      Gf,
      s,
      a
    )(o) : (t.consume(o), i);
  }
  function a(o) {
    return t.exit(g.chunkContent), t.exit(g.content), e(o);
  }
  function s(o) {
    return S(ie(o), "expected eol"), t.consume(o), t.exit(g.chunkContent), S(n, "expected previous token"), n.next = t.enter(g.chunkContent, {
      contentType: Y.contentTypeContent,
      previous: n
    }), n = n.next, i;
  }
}
function Yf(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return S(ie(s), "expected a line ending"), t.exit(g.chunkContent), t.enter(g.lineEnding), t.consume(s), t.exit(g.lineEnding), Be(t, a, g.linePrefix);
  }
  function a(s) {
    if (s === m.eof || ie(s))
      return n(s);
    S(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    );
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === g.linePrefix && o[2].sliceSerialize(o[1], !0).length >= Y.tabSize ? e(s) : t.interrupt(r.parser.constructs.flow, n, e)(s);
  }
}
function xl(t, e, n, r, i, a, s, o, l) {
  const u = l || Number.POSITIVE_INFINITY;
  let c = 0;
  return d;
  function d(_) {
    return _ === m.lessThan ? (t.enter(r), t.enter(i), t.enter(a), t.consume(_), t.exit(a), f) : _ === m.eof || _ === m.space || _ === m.rightParenthesis || ea(_) ? n(_) : (t.enter(r), t.enter(s), t.enter(o), t.enter(g.chunkString, { contentType: Y.contentTypeString }), k(_));
  }
  function f(_) {
    return _ === m.greaterThan ? (t.enter(a), t.consume(_), t.exit(a), t.exit(i), t.exit(r), e) : (t.enter(o), t.enter(g.chunkString, { contentType: Y.contentTypeString }), h(_));
  }
  function h(_) {
    return _ === m.greaterThan ? (t.exit(g.chunkString), t.exit(o), f(_)) : _ === m.eof || _ === m.lessThan || ie(_) ? n(_) : (t.consume(_), _ === m.backslash ? w : h);
  }
  function w(_) {
    return _ === m.lessThan || _ === m.greaterThan || _ === m.backslash ? (t.consume(_), h) : h(_);
  }
  function k(_) {
    return !c && (_ === m.eof || _ === m.rightParenthesis || yt(_)) ? (t.exit(g.chunkString), t.exit(o), t.exit(s), t.exit(r), e(_)) : c < u && _ === m.leftParenthesis ? (t.consume(_), c++, k) : _ === m.rightParenthesis ? (t.consume(_), c--, k) : _ === m.eof || _ === m.space || _ === m.leftParenthesis || ea(_) ? n(_) : (t.consume(_), _ === m.backslash ? I : k);
  }
  function I(_) {
    return _ === m.leftParenthesis || _ === m.rightParenthesis || _ === m.backslash ? (t.consume(_), k) : k(_);
  }
}
function kl(t, e, n, r, i, a) {
  const s = this;
  let o = 0, l;
  return u;
  function u(h) {
    return S(h === m.leftSquareBracket, "expected `[`"), t.enter(r), t.enter(i), t.consume(h), t.exit(i), t.enter(a), c;
  }
  function c(h) {
    return o > Y.linkReferenceSizeMax || h === m.eof || h === m.leftSquareBracket || h === m.rightSquareBracket && !l || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === m.caret && !o && "_hiddenFootnoteSupport" in s.parser.constructs ? n(h) : h === m.rightSquareBracket ? (t.exit(a), t.enter(i), t.consume(h), t.exit(i), t.exit(r), e) : ie(h) ? (t.enter(g.lineEnding), t.consume(h), t.exit(g.lineEnding), c) : (t.enter(g.chunkString, { contentType: Y.contentTypeString }), d(h));
  }
  function d(h) {
    return h === m.eof || h === m.leftSquareBracket || h === m.rightSquareBracket || ie(h) || o++ > Y.linkReferenceSizeMax ? (t.exit(g.chunkString), c(h)) : (t.consume(h), l || (l = !Le(h)), h === m.backslash ? f : d);
  }
  function f(h) {
    return h === m.leftSquareBracket || h === m.backslash || h === m.rightSquareBracket ? (t.consume(h), o++, d) : d(h);
  }
}
function _l(t, e, n, r, i, a) {
  let s;
  return o;
  function o(f) {
    return f === m.quotationMark || f === m.apostrophe || f === m.leftParenthesis ? (t.enter(r), t.enter(i), t.consume(f), t.exit(i), s = f === m.leftParenthesis ? m.rightParenthesis : f, l) : n(f);
  }
  function l(f) {
    return f === s ? (t.enter(i), t.consume(f), t.exit(i), t.exit(r), e) : (t.enter(a), u(f));
  }
  function u(f) {
    return f === s ? (t.exit(a), l(s)) : f === m.eof ? n(f) : ie(f) ? (t.enter(g.lineEnding), t.consume(f), t.exit(g.lineEnding), Be(t, u, g.linePrefix)) : (t.enter(g.chunkString, { contentType: Y.contentTypeString }), c(f));
  }
  function c(f) {
    return f === s || f === m.eof || ie(f) ? (t.exit(g.chunkString), u(f)) : (t.consume(f), f === m.backslash ? d : c);
  }
  function d(f) {
    return f === s || f === m.backslash ? (t.consume(f), c) : c(f);
  }
}
function dr(t, e) {
  let n;
  return r;
  function r(i) {
    return ie(i) ? (t.enter(g.lineEnding), t.consume(i), t.exit(g.lineEnding), n = !0, r) : Le(i) ? Be(
      t,
      r,
      n ? g.linePrefix : g.lineSuffix
    )(i) : e(i);
  }
}
const Xf = { name: "definition", tokenize: Qf }, Jf = { partial: !0, tokenize: eg };
function Qf(t, e, n) {
  const r = this;
  let i;
  return a;
  function a(h) {
    return t.enter(g.definition), s(h);
  }
  function s(h) {
    return S(h === m.leftSquareBracket, "expected `[`"), kl.call(
      r,
      t,
      o,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      g.definitionLabel,
      g.definitionLabelMarker,
      g.definitionLabelString
    )(h);
  }
  function o(h) {
    return i = Dn(
      r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
    ), h === m.colon ? (t.enter(g.definitionMarker), t.consume(h), t.exit(g.definitionMarker), l) : n(h);
  }
  function l(h) {
    return yt(h) ? dr(t, u)(h) : u(h);
  }
  function u(h) {
    return xl(
      t,
      c,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      g.definitionDestination,
      g.definitionDestinationLiteral,
      g.definitionDestinationLiteralMarker,
      g.definitionDestinationRaw,
      g.definitionDestinationString
    )(h);
  }
  function c(h) {
    return t.attempt(Jf, d, d)(h);
  }
  function d(h) {
    return Le(h) ? Be(t, f, g.whitespace)(h) : f(h);
  }
  function f(h) {
    return h === m.eof || ie(h) ? (t.exit(g.definition), r.parser.defined.push(i), e(h)) : n(h);
  }
}
function eg(t, e, n) {
  return r;
  function r(o) {
    return yt(o) ? dr(t, i)(o) : n(o);
  }
  function i(o) {
    return _l(
      t,
      a,
      n,
      g.definitionTitle,
      g.definitionTitleMarker,
      g.definitionTitleString
    )(o);
  }
  function a(o) {
    return Le(o) ? Be(
      t,
      s,
      g.whitespace
    )(o) : s(o);
  }
  function s(o) {
    return o === m.eof || ie(o) ? e(o) : n(o);
  }
}
const tg = {
  name: "hardBreakEscape",
  tokenize: ng
};
function ng(t, e, n) {
  return r;
  function r(a) {
    return S(a === m.backslash, "expected `\\`"), t.enter(g.hardBreakEscape), t.consume(a), i;
  }
  function i(a) {
    return ie(a) ? (t.exit(g.hardBreakEscape), e(a)) : n(a);
  }
}
const rg = {
  name: "headingAtx",
  resolve: ig,
  tokenize: ag
};
function ig(t, e) {
  let n = t.length - 2, r = 3, i, a;
  return t[r][1].type === g.whitespace && (r += 2), n - 2 > r && t[n][1].type === g.whitespace && (n -= 2), t[n][1].type === g.atxHeadingSequence && (r === n - 1 || n - 4 > r && t[n - 2][1].type === g.whitespace) && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: g.atxHeadingText,
    start: t[r][1].start,
    end: t[n][1].end
  }, a = {
    type: g.chunkText,
    start: t[r][1].start,
    end: t[n][1].end,
    contentType: Y.contentTypeText
  }, Jt(t, r, n - r + 1, [
    ["enter", i, e],
    ["enter", a, e],
    ["exit", a, e],
    ["exit", i, e]
  ])), t;
}
function ag(t, e, n) {
  let r = 0;
  return i;
  function i(c) {
    return t.enter(g.atxHeading), a(c);
  }
  function a(c) {
    return S(c === m.numberSign, "expected `#`"), t.enter(g.atxHeadingSequence), s(c);
  }
  function s(c) {
    return c === m.numberSign && r++ < Y.atxHeadingOpeningFenceSizeMax ? (t.consume(c), s) : c === m.eof || yt(c) ? (t.exit(g.atxHeadingSequence), o(c)) : n(c);
  }
  function o(c) {
    return c === m.numberSign ? (t.enter(g.atxHeadingSequence), l(c)) : c === m.eof || ie(c) ? (t.exit(g.atxHeading), e(c)) : Le(c) ? Be(t, o, g.whitespace)(c) : (t.enter(g.atxHeadingText), u(c));
  }
  function l(c) {
    return c === m.numberSign ? (t.consume(c), l) : (t.exit(g.atxHeadingSequence), o(c));
  }
  function u(c) {
    return c === m.eof || c === m.numberSign || yt(c) ? (t.exit(g.atxHeadingText), o(c)) : (t.consume(c), u);
  }
}
const sg = [
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
], js = ["pre", "script", "style", "textarea"], og = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: ug,
  tokenize: dg
}, lg = { partial: !0, tokenize: pg }, cg = {
  partial: !0,
  tokenize: hg
};
function ug(t) {
  let e = t.length;
  for (; e-- && !(t[e][0] === "enter" && t[e][1].type === g.htmlFlow); )
    ;
  return e > 1 && t[e - 2][1].type === g.linePrefix && (t[e][1].start = t[e - 2][1].start, t[e + 1][1].start = t[e - 2][1].start, t.splice(e - 2, 2)), t;
}
function dg(t, e, n) {
  const r = this;
  let i, a, s, o, l;
  return u;
  function u(y) {
    return c(y);
  }
  function c(y) {
    return S(y === m.lessThan, "expected `<`"), t.enter(g.htmlFlow), t.enter(g.htmlFlowData), t.consume(y), d;
  }
  function d(y) {
    return y === m.exclamationMark ? (t.consume(y), f) : y === m.slash ? (t.consume(y), a = !0, k) : y === m.questionMark ? (t.consume(y), i = Y.htmlInstruction, r.interrupt ? e : C) : qt(y) ? (S(y !== null), t.consume(y), s = String.fromCharCode(y), I) : n(y);
  }
  function f(y) {
    return y === m.dash ? (t.consume(y), i = Y.htmlComment, h) : y === m.leftSquareBracket ? (t.consume(y), i = Y.htmlCdata, o = 0, w) : qt(y) ? (t.consume(y), i = Y.htmlDeclaration, r.interrupt ? e : C) : n(y);
  }
  function h(y) {
    return y === m.dash ? (t.consume(y), r.interrupt ? e : C) : n(y);
  }
  function w(y) {
    const Q = Y.cdataOpeningString;
    return y === Q.charCodeAt(o++) ? (t.consume(y), o === Q.length ? r.interrupt ? e : G : w) : n(y);
  }
  function k(y) {
    return qt(y) ? (S(y !== null), t.consume(y), s = String.fromCharCode(y), I) : n(y);
  }
  function I(y) {
    if (y === m.eof || y === m.slash || y === m.greaterThan || yt(y)) {
      const Q = y === m.slash, K = s.toLowerCase();
      return !Q && !a && js.includes(K) ? (i = Y.htmlRaw, r.interrupt ? e(y) : G(y)) : sg.includes(s.toLowerCase()) ? (i = Y.htmlBasic, Q ? (t.consume(y), _) : r.interrupt ? e(y) : G(y)) : (i = Y.htmlComplete, r.interrupt && !r.parser.lazy[r.now().line] ? n(y) : a ? v(y) : R(y));
    }
    return y === m.dash || St(y) ? (t.consume(y), s += String.fromCharCode(y), I) : n(y);
  }
  function _(y) {
    return y === m.greaterThan ? (t.consume(y), r.interrupt ? e : G) : n(y);
  }
  function v(y) {
    return Le(y) ? (t.consume(y), v) : te(y);
  }
  function R(y) {
    return y === m.slash ? (t.consume(y), te) : y === m.colon || y === m.underscore || qt(y) ? (t.consume(y), M) : Le(y) ? (t.consume(y), R) : te(y);
  }
  function M(y) {
    return y === m.dash || y === m.dot || y === m.colon || y === m.underscore || St(y) ? (t.consume(y), M) : L(y);
  }
  function L(y) {
    return y === m.equalsTo ? (t.consume(y), b) : Le(y) ? (t.consume(y), L) : R(y);
  }
  function b(y) {
    return y === m.eof || y === m.lessThan || y === m.equalsTo || y === m.greaterThan || y === m.graveAccent ? n(y) : y === m.quotationMark || y === m.apostrophe ? (t.consume(y), l = y, j) : Le(y) ? (t.consume(y), b) : $(y);
  }
  function j(y) {
    return y === l ? (t.consume(y), l = null, H) : y === m.eof || ie(y) ? n(y) : (t.consume(y), j);
  }
  function $(y) {
    return y === m.eof || y === m.quotationMark || y === m.apostrophe || y === m.slash || y === m.lessThan || y === m.equalsTo || y === m.greaterThan || y === m.graveAccent || yt(y) ? L(y) : (t.consume(y), $);
  }
  function H(y) {
    return y === m.slash || y === m.greaterThan || Le(y) ? R(y) : n(y);
  }
  function te(y) {
    return y === m.greaterThan ? (t.consume(y), de) : n(y);
  }
  function de(y) {
    return y === m.eof || ie(y) ? G(y) : Le(y) ? (t.consume(y), de) : n(y);
  }
  function G(y) {
    return y === m.dash && i === Y.htmlComment ? (t.consume(y), Z) : y === m.lessThan && i === Y.htmlRaw ? (t.consume(y), ue) : y === m.greaterThan && i === Y.htmlDeclaration ? (t.consume(y), W) : y === m.questionMark && i === Y.htmlInstruction ? (t.consume(y), C) : y === m.rightSquareBracket && i === Y.htmlCdata ? (t.consume(y), ee) : ie(y) && (i === Y.htmlBasic || i === Y.htmlComplete) ? (t.exit(g.htmlFlowData), t.check(
      lg,
      V,
      N
    )(y)) : y === m.eof || ie(y) ? (t.exit(g.htmlFlowData), N(y)) : (t.consume(y), G);
  }
  function N(y) {
    return t.check(
      cg,
      P,
      V
    )(y);
  }
  function P(y) {
    return S(ie(y)), t.enter(g.lineEnding), t.consume(y), t.exit(g.lineEnding), F;
  }
  function F(y) {
    return y === m.eof || ie(y) ? N(y) : (t.enter(g.htmlFlowData), G(y));
  }
  function Z(y) {
    return y === m.dash ? (t.consume(y), C) : G(y);
  }
  function ue(y) {
    return y === m.slash ? (t.consume(y), s = "", oe) : G(y);
  }
  function oe(y) {
    if (y === m.greaterThan) {
      const Q = s.toLowerCase();
      return js.includes(Q) ? (t.consume(y), W) : G(y);
    }
    return qt(y) && s.length < Y.htmlRawSizeMax ? (S(y !== null), t.consume(y), s += String.fromCharCode(y), oe) : G(y);
  }
  function ee(y) {
    return y === m.rightSquareBracket ? (t.consume(y), C) : G(y);
  }
  function C(y) {
    return y === m.greaterThan ? (t.consume(y), W) : y === m.dash && i === Y.htmlComment ? (t.consume(y), C) : G(y);
  }
  function W(y) {
    return y === m.eof || ie(y) ? (t.exit(g.htmlFlowData), V(y)) : (t.consume(y), W);
  }
  function V(y) {
    return t.exit(g.htmlFlow), e(y);
  }
}
function hg(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return ie(s) ? (t.enter(g.lineEnding), t.consume(s), t.exit(g.lineEnding), a) : n(s);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : e(s);
  }
}
function pg(t, e, n) {
  return r;
  function r(i) {
    return S(ie(i), "expected a line ending"), t.enter(g.lineEnding), t.consume(i), t.exit(g.lineEnding), t.attempt(ti, e, n);
  }
}
const fg = { name: "htmlText", tokenize: gg };
function gg(t, e, n) {
  const r = this;
  let i, a, s;
  return o;
  function o(C) {
    return S(C === m.lessThan, "expected `<`"), t.enter(g.htmlText), t.enter(g.htmlTextData), t.consume(C), l;
  }
  function l(C) {
    return C === m.exclamationMark ? (t.consume(C), u) : C === m.slash ? (t.consume(C), L) : C === m.questionMark ? (t.consume(C), R) : qt(C) ? (t.consume(C), $) : n(C);
  }
  function u(C) {
    return C === m.dash ? (t.consume(C), c) : C === m.leftSquareBracket ? (t.consume(C), a = 0, w) : qt(C) ? (t.consume(C), v) : n(C);
  }
  function c(C) {
    return C === m.dash ? (t.consume(C), h) : n(C);
  }
  function d(C) {
    return C === m.eof ? n(C) : C === m.dash ? (t.consume(C), f) : ie(C) ? (s = d, ue(C)) : (t.consume(C), d);
  }
  function f(C) {
    return C === m.dash ? (t.consume(C), h) : d(C);
  }
  function h(C) {
    return C === m.greaterThan ? Z(C) : C === m.dash ? f(C) : d(C);
  }
  function w(C) {
    const W = Y.cdataOpeningString;
    return C === W.charCodeAt(a++) ? (t.consume(C), a === W.length ? k : w) : n(C);
  }
  function k(C) {
    return C === m.eof ? n(C) : C === m.rightSquareBracket ? (t.consume(C), I) : ie(C) ? (s = k, ue(C)) : (t.consume(C), k);
  }
  function I(C) {
    return C === m.rightSquareBracket ? (t.consume(C), _) : k(C);
  }
  function _(C) {
    return C === m.greaterThan ? Z(C) : C === m.rightSquareBracket ? (t.consume(C), _) : k(C);
  }
  function v(C) {
    return C === m.eof || C === m.greaterThan ? Z(C) : ie(C) ? (s = v, ue(C)) : (t.consume(C), v);
  }
  function R(C) {
    return C === m.eof ? n(C) : C === m.questionMark ? (t.consume(C), M) : ie(C) ? (s = R, ue(C)) : (t.consume(C), R);
  }
  function M(C) {
    return C === m.greaterThan ? Z(C) : R(C);
  }
  function L(C) {
    return qt(C) ? (t.consume(C), b) : n(C);
  }
  function b(C) {
    return C === m.dash || St(C) ? (t.consume(C), b) : j(C);
  }
  function j(C) {
    return ie(C) ? (s = j, ue(C)) : Le(C) ? (t.consume(C), j) : Z(C);
  }
  function $(C) {
    return C === m.dash || St(C) ? (t.consume(C), $) : C === m.slash || C === m.greaterThan || yt(C) ? H(C) : n(C);
  }
  function H(C) {
    return C === m.slash ? (t.consume(C), Z) : C === m.colon || C === m.underscore || qt(C) ? (t.consume(C), te) : ie(C) ? (s = H, ue(C)) : Le(C) ? (t.consume(C), H) : Z(C);
  }
  function te(C) {
    return C === m.dash || C === m.dot || C === m.colon || C === m.underscore || St(C) ? (t.consume(C), te) : de(C);
  }
  function de(C) {
    return C === m.equalsTo ? (t.consume(C), G) : ie(C) ? (s = de, ue(C)) : Le(C) ? (t.consume(C), de) : H(C);
  }
  function G(C) {
    return C === m.eof || C === m.lessThan || C === m.equalsTo || C === m.greaterThan || C === m.graveAccent ? n(C) : C === m.quotationMark || C === m.apostrophe ? (t.consume(C), i = C, N) : ie(C) ? (s = G, ue(C)) : Le(C) ? (t.consume(C), G) : (t.consume(C), P);
  }
  function N(C) {
    return C === i ? (t.consume(C), i = void 0, F) : C === m.eof ? n(C) : ie(C) ? (s = N, ue(C)) : (t.consume(C), N);
  }
  function P(C) {
    return C === m.eof || C === m.quotationMark || C === m.apostrophe || C === m.lessThan || C === m.equalsTo || C === m.graveAccent ? n(C) : C === m.slash || C === m.greaterThan || yt(C) ? H(C) : (t.consume(C), P);
  }
  function F(C) {
    return C === m.slash || C === m.greaterThan || yt(C) ? H(C) : n(C);
  }
  function Z(C) {
    return C === m.greaterThan ? (t.consume(C), t.exit(g.htmlTextData), t.exit(g.htmlText), e) : n(C);
  }
  function ue(C) {
    return S(s, "expected return state"), S(ie(C), "expected eol"), t.exit(g.htmlTextData), t.enter(g.lineEnding), t.consume(C), t.exit(g.lineEnding), oe;
  }
  function oe(C) {
    return S(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Le(C) ? Be(
      t,
      ee,
      g.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : Y.tabSize
    )(C) : ee(C);
  }
  function ee(C) {
    return t.enter(g.htmlTextData), s(C);
  }
}
const _a = {
  name: "labelEnd",
  resolveAll: Cg,
  resolveTo: xg,
  tokenize: kg
}, mg = { tokenize: _g }, yg = { tokenize: Sg }, wg = { tokenize: bg };
function Cg(t) {
  let e = -1;
  const n = [];
  for (; ++e < t.length; ) {
    const r = t[e][1];
    if (n.push(t[e]), r.type === g.labelImage || r.type === g.labelLink || r.type === g.labelEnd) {
      const i = r.type === g.labelImage ? 4 : 2;
      r.type = g.data, e += i;
    }
  }
  return t.length !== n.length && Jt(t, 0, t.length, n), t;
}
function xg(t, e) {
  let n = t.length, r = 0, i, a, s, o;
  for (; n--; )
    if (i = t[n][1], a) {
      if (i.type === g.link || i.type === g.labelLink && i._inactive)
        break;
      t[n][0] === "enter" && i.type === g.labelLink && (i._inactive = !0);
    } else if (s) {
      if (t[n][0] === "enter" && (i.type === g.labelImage || i.type === g.labelLink) && !i._balanced && (a = n, i.type !== g.labelLink)) {
        r = 2;
        break;
      }
    } else i.type === g.labelEnd && (s = n);
  S(a !== void 0, "`open` is supposed to be found"), S(s !== void 0, "`close` is supposed to be found");
  const l = {
    type: t[a][1].type === g.labelLink ? g.link : g.image,
    start: { ...t[a][1].start },
    end: { ...t[t.length - 1][1].end }
  }, u = {
    type: g.label,
    start: { ...t[a][1].start },
    end: { ...t[s][1].end }
  }, c = {
    type: g.labelText,
    start: { ...t[a + r + 2][1].end },
    end: { ...t[s - 2][1].start }
  };
  return o = [
    ["enter", l, e],
    ["enter", u, e]
  ], o = At(o, t.slice(a + 1, a + r + 3)), o = At(o, [["enter", c, e]]), S(
    e.parser.constructs.insideSpan.null,
    "expected `insideSpan.null` to be populated"
  ), o = At(
    o,
    ka(
      e.parser.constructs.insideSpan.null,
      t.slice(a + r + 4, s - 3),
      e
    )
  ), o = At(o, [
    ["exit", c, e],
    t[s - 2],
    t[s - 1],
    ["exit", u, e]
  ]), o = At(o, t.slice(s + 1)), o = At(o, [["exit", l, e]]), Jt(t, a, t.length, o), t;
}
function kg(t, e, n) {
  const r = this;
  let i = r.events.length, a, s;
  for (; i--; )
    if ((r.events[i][1].type === g.labelImage || r.events[i][1].type === g.labelLink) && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return o;
  function o(f) {
    return S(f === m.rightSquareBracket, "expected `]`"), a ? a._inactive ? d(f) : (s = r.parser.defined.includes(
      Dn(
        r.sliceSerialize({ start: a.end, end: r.now() })
      )
    ), t.enter(g.labelEnd), t.enter(g.labelMarker), t.consume(f), t.exit(g.labelMarker), t.exit(g.labelEnd), l) : n(f);
  }
  function l(f) {
    return f === m.leftParenthesis ? t.attempt(
      mg,
      c,
      s ? c : d
    )(f) : f === m.leftSquareBracket ? t.attempt(
      yg,
      c,
      s ? u : d
    )(f) : s ? c(f) : d(f);
  }
  function u(f) {
    return t.attempt(
      wg,
      c,
      d
    )(f);
  }
  function c(f) {
    return e(f);
  }
  function d(f) {
    return a._balanced = !0, n(f);
  }
}
function _g(t, e, n) {
  return r;
  function r(d) {
    return S(d === m.leftParenthesis, "expected left paren"), t.enter(g.resource), t.enter(g.resourceMarker), t.consume(d), t.exit(g.resourceMarker), i;
  }
  function i(d) {
    return yt(d) ? dr(t, a)(d) : a(d);
  }
  function a(d) {
    return d === m.rightParenthesis ? c(d) : xl(
      t,
      s,
      o,
      g.resourceDestination,
      g.resourceDestinationLiteral,
      g.resourceDestinationLiteralMarker,
      g.resourceDestinationRaw,
      g.resourceDestinationString,
      Y.linkResourceDestinationBalanceMax
    )(d);
  }
  function s(d) {
    return yt(d) ? dr(t, l)(d) : c(d);
  }
  function o(d) {
    return n(d);
  }
  function l(d) {
    return d === m.quotationMark || d === m.apostrophe || d === m.leftParenthesis ? _l(
      t,
      u,
      n,
      g.resourceTitle,
      g.resourceTitleMarker,
      g.resourceTitleString
    )(d) : c(d);
  }
  function u(d) {
    return yt(d) ? dr(t, c)(d) : c(d);
  }
  function c(d) {
    return d === m.rightParenthesis ? (t.enter(g.resourceMarker), t.consume(d), t.exit(g.resourceMarker), t.exit(g.resource), e) : n(d);
  }
}
function Sg(t, e, n) {
  const r = this;
  return i;
  function i(o) {
    return S(o === m.leftSquareBracket, "expected left bracket"), kl.call(
      r,
      t,
      a,
      s,
      g.reference,
      g.referenceMarker,
      g.referenceString
    )(o);
  }
  function a(o) {
    return r.parser.defined.includes(
      Dn(
        r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
      )
    ) ? e(o) : n(o);
  }
  function s(o) {
    return n(o);
  }
}
function bg(t, e, n) {
  return r;
  function r(a) {
    return S(a === m.leftSquareBracket, "expected left bracket"), t.enter(g.reference), t.enter(g.referenceMarker), t.consume(a), t.exit(g.referenceMarker), i;
  }
  function i(a) {
    return a === m.rightSquareBracket ? (t.enter(g.referenceMarker), t.consume(a), t.exit(g.referenceMarker), t.exit(g.reference), e) : n(a);
  }
}
const vg = {
  name: "labelStartImage",
  resolveAll: _a.resolveAll,
  tokenize: Tg
};
function Tg(t, e, n) {
  const r = this;
  return i;
  function i(o) {
    return S(o === m.exclamationMark, "expected `!`"), t.enter(g.labelImage), t.enter(g.labelImageMarker), t.consume(o), t.exit(g.labelImageMarker), a;
  }
  function a(o) {
    return o === m.leftSquareBracket ? (t.enter(g.labelMarker), t.consume(o), t.exit(g.labelMarker), t.exit(g.labelImage), s) : n(o);
  }
  function s(o) {
    return o === m.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : e(o);
  }
}
const Eg = {
  name: "labelStartLink",
  resolveAll: _a.resolveAll,
  tokenize: Rg
};
function Rg(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return S(s === m.leftSquareBracket, "expected `[`"), t.enter(g.labelLink), t.enter(g.labelMarker), t.consume(s), t.exit(g.labelMarker), t.exit(g.labelLink), a;
  }
  function a(s) {
    return s === m.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : e(s);
  }
}
const bi = { name: "lineEnding", tokenize: Ig };
function Ig(t, e) {
  return n;
  function n(r) {
    return S(ie(r), "expected eol"), t.enter(g.lineEnding), t.consume(r), t.exit(g.lineEnding), Be(t, e, g.linePrefix);
  }
}
const Pr = {
  name: "thematicBreak",
  tokenize: Ng
};
function Ng(t, e, n) {
  let r = 0, i;
  return a;
  function a(u) {
    return t.enter(g.thematicBreak), s(u);
  }
  function s(u) {
    return S(
      u === m.asterisk || u === m.dash || u === m.underscore,
      "expected `*`, `-`, or `_`"
    ), i = u, o(u);
  }
  function o(u) {
    return u === i ? (t.enter(g.thematicBreakSequence), l(u)) : r >= Y.thematicBreakMarkerCountMin && (u === m.eof || ie(u)) ? (t.exit(g.thematicBreak), e(u)) : n(u);
  }
  function l(u) {
    return u === i ? (t.consume(u), r++, l) : (t.exit(g.thematicBreakSequence), Le(u) ? Be(t, o, g.whitespace)(u) : o(u));
  }
}
const mt = {
  continuation: { tokenize: Lg },
  exit: Dg,
  name: "list",
  tokenize: Mg
}, Ag = {
  partial: !0,
  tokenize: Fg
}, Og = { partial: !0, tokenize: Pg };
function Mg(t, e, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === g.linePrefix ? i[2].sliceSerialize(i[1], !0).length : 0, s = 0;
  return o;
  function o(h) {
    S(r.containerState, "expected state");
    const w = r.containerState.type || (h === m.asterisk || h === m.plusSign || h === m.dash ? g.listUnordered : g.listOrdered);
    if (w === g.listUnordered ? !r.containerState.marker || h === r.containerState.marker : ta(h)) {
      if (r.containerState.type || (r.containerState.type = w, t.enter(w, { _container: !0 })), w === g.listUnordered)
        return t.enter(g.listItemPrefix), h === m.asterisk || h === m.dash ? t.check(Pr, n, u)(h) : u(h);
      if (!r.interrupt || h === m.digit1)
        return t.enter(g.listItemPrefix), t.enter(g.listItemValue), l(h);
    }
    return n(h);
  }
  function l(h) {
    return S(r.containerState, "expected state"), ta(h) && ++s < Y.listItemValueSizeMax ? (t.consume(h), l) : (!r.interrupt || s < 2) && (r.containerState.marker ? h === r.containerState.marker : h === m.rightParenthesis || h === m.dot) ? (t.exit(g.listItemValue), u(h)) : n(h);
  }
  function u(h) {
    return S(r.containerState, "expected state"), S(h !== m.eof, "eof (`null`) is not a marker"), t.enter(g.listItemMarker), t.consume(h), t.exit(g.listItemMarker), r.containerState.marker = r.containerState.marker || h, t.check(
      ti,
      // Can’t be empty when interrupting.
      r.interrupt ? n : c,
      t.attempt(
        Ag,
        f,
        d
      )
    );
  }
  function c(h) {
    return S(r.containerState, "expected state"), r.containerState.initialBlankLine = !0, a++, f(h);
  }
  function d(h) {
    return Le(h) ? (t.enter(g.listItemPrefixWhitespace), t.consume(h), t.exit(g.listItemPrefixWhitespace), f) : n(h);
  }
  function f(h) {
    return S(r.containerState, "expected state"), r.containerState.size = a + r.sliceSerialize(t.exit(g.listItemPrefix), !0).length, e(h);
  }
}
function Lg(t, e, n) {
  const r = this;
  return S(r.containerState, "expected state"), r.containerState._closeFlow = void 0, t.check(ti, i, a);
  function i(o) {
    return S(r.containerState, "expected state"), S(typeof r.containerState.size == "number", "expected size"), r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, Be(
      t,
      e,
      g.listItemIndent,
      r.containerState.size + 1
    )(o);
  }
  function a(o) {
    return S(r.containerState, "expected state"), r.containerState.furtherBlankLines || !Le(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, t.attempt(Og, e, s)(o));
  }
  function s(o) {
    return S(r.containerState, "expected state"), r.containerState._closeFlow = !0, r.interrupt = void 0, S(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Be(
      t,
      t.attempt(mt, e, n),
      g.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : Y.tabSize
    )(o);
  }
}
function Pg(t, e, n) {
  const r = this;
  return S(r.containerState, "expected state"), S(typeof r.containerState.size == "number", "expected size"), Be(
    t,
    i,
    g.listItemIndent,
    r.containerState.size + 1
  );
  function i(a) {
    S(r.containerState, "expected state");
    const s = r.events[r.events.length - 1];
    return s && s[1].type === g.listItemIndent && s[2].sliceSerialize(s[1], !0).length === r.containerState.size ? e(a) : n(a);
  }
}
function Dg(t) {
  S(this.containerState, "expected state"), S(typeof this.containerState.type == "string", "expected type"), t.exit(this.containerState.type);
}
function Fg(t, e, n) {
  const r = this;
  return S(
    r.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), Be(
    t,
    i,
    g.listItemPrefixWhitespace,
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : Y.tabSize + 1
  );
  function i(a) {
    const s = r.events[r.events.length - 1];
    return !Le(a) && s && s[1].type === g.listItemPrefixWhitespace ? e(a) : n(a);
  }
}
const Vs = {
  name: "setextUnderline",
  resolveTo: zg,
  tokenize: Hg
};
function zg(t, e) {
  let n = t.length, r, i, a;
  for (; n--; )
    if (t[n][0] === "enter") {
      if (t[n][1].type === g.content) {
        r = n;
        break;
      }
      t[n][1].type === g.paragraph && (i = n);
    } else
      t[n][1].type === g.content && t.splice(n, 1), !a && t[n][1].type === g.definition && (a = n);
  S(i !== void 0, "expected a `text` index to be found"), S(r !== void 0, "expected a `text` index to be found"), S(t[r][2] === e, "enter context should be same"), S(
    t[t.length - 1][2] === e,
    "enter context should be same"
  );
  const s = {
    type: g.setextHeading,
    start: { ...t[r][1].start },
    end: { ...t[t.length - 1][1].end }
  };
  return t[i][1].type = g.setextHeadingText, a ? (t.splice(i, 0, ["enter", s, e]), t.splice(a + 1, 0, ["exit", t[r][1], e]), t[r][1].end = { ...t[a][1].end }) : t[r][1] = s, t.push(["exit", s, e]), t;
}
function Hg(t, e, n) {
  const r = this;
  let i;
  return a;
  function a(u) {
    let c = r.events.length, d;
    for (S(
      u === m.dash || u === m.equalsTo,
      "expected `=` or `-`"
    ); c--; )
      if (r.events[c][1].type !== g.lineEnding && r.events[c][1].type !== g.linePrefix && r.events[c][1].type !== g.content) {
        d = r.events[c][1].type === g.paragraph;
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || d) ? (t.enter(g.setextHeadingLine), i = u, s(u)) : n(u);
  }
  function s(u) {
    return t.enter(g.setextHeadingLineSequence), o(u);
  }
  function o(u) {
    return u === i ? (t.consume(u), o) : (t.exit(g.setextHeadingLineSequence), Le(u) ? Be(t, l, g.lineSuffix)(u) : l(u));
  }
  function l(u) {
    return u === m.eof || ie(u) ? (t.exit(g.setextHeadingLine), e(u)) : n(u);
  }
}
const Ug = { tokenize: $g };
function $g(t) {
  const e = this, n = t.attempt(
    // Try to parse a blank line.
    ti,
    r,
    // Try to parse initial flow (essentially, only code).
    t.attempt(
      this.parser.constructs.flowInitial,
      i,
      Be(
        t,
        t.attempt(
          this.parser.constructs.flow,
          i,
          t.attempt(Wf, i)
        ),
        g.linePrefix
      )
    )
  );
  return n;
  function r(a) {
    if (S(
      a === m.eof || ie(a),
      "expected eol or eof"
    ), a === m.eof) {
      t.consume(a);
      return;
    }
    return t.enter(g.lineEndingBlank), t.consume(a), t.exit(g.lineEndingBlank), e.currentConstruct = void 0, n;
  }
  function i(a) {
    if (S(
      a === m.eof || ie(a),
      "expected eol or eof"
    ), a === m.eof) {
      t.consume(a);
      return;
    }
    return t.enter(g.lineEnding), t.consume(a), t.exit(g.lineEnding), e.currentConstruct = void 0, n;
  }
}
const Bg = { resolveAll: bl() }, jg = Sl("string"), Vg = Sl("text");
function Sl(t) {
  return {
    resolveAll: bl(
      t === "text" ? Zg : void 0
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
      return n.enter(g.data), n.consume(c), l;
    }
    function l(c) {
      return u(c) ? (n.exit(g.data), a(c)) : (n.consume(c), l);
    }
    function u(c) {
      if (c === m.eof)
        return !0;
      const d = i[c];
      let f = -1;
      if (d)
        for (S(Array.isArray(d), "expected `disable.null` to be populated"); ++f < d.length; ) {
          const h = d[f];
          if (!h.previous || h.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function bl(t) {
  return e;
  function e(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === g.data && (a = i, i++) : (!n[i] || n[i][1].type !== g.data) && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return t ? t(n, r) : n;
  }
}
function Zg(t, e) {
  let n = 0;
  for (; ++n <= t.length; )
    if ((n === t.length || t[n][1].type === g.lineEnding) && t[n - 1][1].type === g.data) {
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
          type: n === t.length || l || o < Y.hardBreakPrefixSizeMin ? g.lineSuffix : g.hardBreakTrailing,
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
const Wg = {
  [m.asterisk]: mt,
  [m.plusSign]: mt,
  [m.dash]: mt,
  [m.digit0]: mt,
  [m.digit1]: mt,
  [m.digit2]: mt,
  [m.digit3]: mt,
  [m.digit4]: mt,
  [m.digit5]: mt,
  [m.digit6]: mt,
  [m.digit7]: mt,
  [m.digit8]: mt,
  [m.digit9]: mt,
  [m.greaterThan]: gl
}, Gg = {
  [m.leftSquareBracket]: Xf
}, qg = {
  [m.horizontalTab]: Si,
  [m.virtualSpace]: Si,
  [m.space]: Si
}, Kg = {
  [m.numberSign]: rg,
  [m.asterisk]: Pr,
  [m.dash]: [Vs, Pr],
  [m.lessThan]: og,
  [m.equalsTo]: Vs,
  [m.underscore]: Pr,
  [m.graveAccent]: Bs,
  [m.tilde]: Bs
}, Yg = {
  [m.ampersand]: yl,
  [m.backslash]: ml
}, Xg = {
  [m.carriageReturn]: bi,
  [m.lineFeed]: bi,
  [m.carriageReturnLineFeed]: bi,
  [m.exclamationMark]: vg,
  [m.ampersand]: yl,
  [m.asterisk]: na,
  [m.lessThan]: [Rf, fg],
  [m.leftSquareBracket]: Eg,
  [m.backslash]: [tg, ml],
  [m.rightSquareBracket]: _a,
  [m.underscore]: na,
  [m.graveAccent]: $f
}, Jg = { null: [na, Bg] }, Qg = { null: [m.asterisk, m.underscore] }, e1 = { null: [] }, t1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Qg,
  contentInitial: Gg,
  disable: e1,
  document: Wg,
  flow: Kg,
  flowInitial: qg,
  insideSpan: Jg,
  string: Yg,
  text: Xg
}, Symbol.toStringTag, { value: "Module" }));
var ra = { exports: {} }, vi, Zs;
function n1() {
  if (Zs) return vi;
  Zs = 1;
  var t = 1e3, e = t * 60, n = e * 60, r = n * 24, i = r * 7, a = r * 365.25;
  vi = function(c, d) {
    d = d || {};
    var f = typeof c;
    if (f === "string" && c.length > 0)
      return s(c);
    if (f === "number" && isFinite(c))
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
        var f = parseFloat(d[1]), h = (d[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return f * a;
          case "weeks":
          case "week":
          case "w":
            return f * i;
          case "days":
          case "day":
          case "d":
            return f * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return f * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return f * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return f * t;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return f;
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
  function u(c, d, f, h) {
    var w = d >= f * 1.5;
    return Math.round(c / f) + " " + h + (w ? "s" : "");
  }
  return vi;
}
function r1(t) {
  n.debug = n, n.default = n, n.coerce = l, n.disable = s, n.enable = i, n.enabled = o, n.humanize = n1(), n.destroy = u, Object.keys(t).forEach((c) => {
    n[c] = t[c];
  }), n.names = [], n.skips = [], n.formatters = {};
  function e(c) {
    let d = 0;
    for (let f = 0; f < c.length; f++)
      d = (d << 5) - d + c.charCodeAt(f), d |= 0;
    return n.colors[Math.abs(d) % n.colors.length];
  }
  n.selectColor = e;
  function n(c) {
    let d, f = null, h, w;
    function k(...I) {
      if (!k.enabled)
        return;
      const _ = k, v = Number(/* @__PURE__ */ new Date()), R = v - (d || v);
      _.diff = R, _.prev = d, _.curr = v, d = v, I[0] = n.coerce(I[0]), typeof I[0] != "string" && I.unshift("%O");
      let M = 0;
      I[0] = I[0].replace(/%([a-zA-Z%])/g, (b, j) => {
        if (b === "%%")
          return "%";
        M++;
        const $ = n.formatters[j];
        if (typeof $ == "function") {
          const H = I[M];
          b = $.call(_, H), I.splice(M, 1), M--;
        }
        return b;
      }), n.formatArgs.call(_, I), (_.log || n.log).apply(_, I);
    }
    return k.namespace = c, k.useColors = n.useColors(), k.color = n.selectColor(c), k.extend = r, k.destroy = n.destroy, Object.defineProperty(k, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => f !== null ? f : (h !== n.namespaces && (h = n.namespaces, w = n.enabled(c)), w),
      set: (I) => {
        f = I;
      }
    }), typeof n.init == "function" && n.init(k), k;
  }
  function r(c, d) {
    const f = n(this.namespace + (typeof d > "u" ? ":" : d) + c);
    return f.log = this.log, f;
  }
  function i(c) {
    n.save(c), n.namespaces = c, n.names = [], n.skips = [];
    const d = (typeof c == "string" ? c : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
    for (const f of d)
      f[0] === "-" ? n.skips.push(f.slice(1)) : n.names.push(f);
  }
  function a(c, d) {
    let f = 0, h = 0, w = -1, k = 0;
    for (; f < c.length; )
      if (h < d.length && (d[h] === c[f] || d[h] === "*"))
        d[h] === "*" ? (w = h, k = f, h++) : (f++, h++);
      else if (w !== -1)
        h = w + 1, k++, f = k;
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
var i1 = r1;
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
    l[0].replace(/%[a-zA-Z%]/g, (f) => {
      f !== "%%" && (c++, f === "%c" && (d = c));
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
  t.exports = i1(e);
  const { formatters: o } = t.exports;
  o.j = function(l) {
    try {
      return JSON.stringify(l);
    } catch (u) {
      return "[UnexpectedJSONParseError]: " + u.message;
    }
  };
})(ra, ra.exports);
var a1 = ra.exports;
const s1 = /* @__PURE__ */ ha(a1), kn = s1("micromark");
function o1(t, e, n) {
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
    attempt: H(j),
    check: H($),
    consume: M,
    enter: L,
    exit: b,
    interrupt: H($, { interrupt: !0 })
  }, c = {
    code: m.eof,
    containerState: {},
    defineSkip: _,
    events: [],
    now: I,
    parser: t,
    previous: m.eof,
    sliceSerialize: w,
    sliceStream: k,
    write: h
  };
  let d = e.tokenize.call(c, u), f;
  return e.resolveAll && a.push(e), c;
  function h(N) {
    return s = At(s, N), v(), s[s.length - 1] !== m.eof ? [] : (te(e, 0), c.events = ka(a, c.events, c), c.events);
  }
  function w(N, P) {
    return c1(k(N), P);
  }
  function k(N) {
    return l1(s, N);
  }
  function I() {
    const { _bufferIndex: N, _index: P, line: F, column: Z, offset: ue } = r;
    return { _bufferIndex: N, _index: P, line: F, column: Z, offset: ue };
  }
  function _(N) {
    i[N.line] = N.column, G(), kn("position: define skip: `%j`", r);
  }
  function v() {
    let N;
    for (; r._index < s.length; ) {
      const P = s[r._index];
      if (typeof P == "string")
        for (N = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === N && r._bufferIndex < P.length; )
          R(P.charCodeAt(r._bufferIndex));
      else
        R(P);
    }
  }
  function R(N) {
    S(l === !0, "expected character to be consumed"), l = void 0, kn("main: passing `%s` to %s", N, d && d.name), f = N, S(typeof d == "function", "expected state"), d = d(N);
  }
  function M(N) {
    S(N === f, "expected given code to equal expected code"), kn("consume: `%s`", N), S(
      l === void 0,
      "expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used"
    ), S(
      N === null ? c.events.length === 0 || c.events[c.events.length - 1][0] === "exit" : c.events[c.events.length - 1][0] === "enter",
      "expected last token to be open"
    ), ie(N) ? (r.line++, r.column = 1, r.offset += N === m.carriageReturnLineFeed ? 2 : 1, G(), kn("position: after eol: `%j`", r)) : N !== m.virtualSpace && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    s[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = N, l = !0;
  }
  function L(N, P) {
    const F = P || {};
    return F.type = N, F.start = I(), S(typeof N == "string", "expected string type"), S(N.length > 0, "expected non-empty string"), kn("enter: `%s`", N), c.events.push(["enter", F, c]), o.push(F), F;
  }
  function b(N) {
    S(typeof N == "string", "expected string type"), S(N.length > 0, "expected non-empty string");
    const P = o.pop();
    return S(P, "cannot close w/o open tokens"), P.end = I(), S(N === P.type, "expected exit token to match current token"), S(
      !(P.start._index === P.end._index && P.start._bufferIndex === P.end._bufferIndex),
      "expected non-empty token (`" + N + "`)"
    ), kn("exit: `%s`", P.type), c.events.push(["exit", P, c]), P;
  }
  function j(N, P) {
    te(N, P.from);
  }
  function $(N, P) {
    P.restore();
  }
  function H(N, P) {
    return F;
    function F(Z, ue, oe) {
      let ee, C, W, V;
      return Array.isArray(Z) ? (
        /* c8 ignore next 1 */
        Q(Z)
      ) : "tokenize" in Z ? (
        // Looks like a construct.
        Q([
          /** @type {Construct} */
          Z
        ])
      ) : y(Z);
      function y(le) {
        return Te;
        function Te(Ie) {
          const _e = Ie !== null && le[Ie], me = Ie !== null && le.null, De = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(_e) ? _e : _e ? [_e] : [],
            ...Array.isArray(me) ? me : me ? [me] : []
          ];
          return Q(De)(Ie);
        }
      }
      function Q(le) {
        return ee = le, C = 0, le.length === 0 ? (S(oe, "expected `bogusState` to be given"), oe) : K(le[C]);
      }
      function K(le) {
        return Te;
        function Te(Ie) {
          return V = de(), W = le, le.partial || (c.currentConstruct = le), S(
            c.parser.constructs.disable.null,
            "expected `disable.null` to be populated"
          ), le.name && c.parser.constructs.disable.null.includes(le.name) ? he(Ie) : le.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            P ? Object.assign(Object.create(c), P) : c,
            u,
            fe,
            he
          )(Ie);
        }
      }
      function fe(le) {
        return S(le === f, "expected code"), l = !0, N(W, V), ue;
      }
      function he(le) {
        return S(le === f, "expected code"), l = !0, V.restore(), ++C < ee.length ? K(ee[C]) : oe;
      }
    }
  }
  function te(N, P) {
    N.resolveAll && !a.includes(N) && a.push(N), N.resolve && Jt(
      c.events,
      P,
      c.events.length - P,
      N.resolve(c.events.slice(P), c)
    ), N.resolveTo && (c.events = N.resolveTo(c.events, c)), S(
      N.partial || c.events.length === 0 || c.events[c.events.length - 1][0] === "exit",
      "expected last token to end"
    );
  }
  function de() {
    const N = I(), P = c.previous, F = c.currentConstruct, Z = c.events.length, ue = Array.from(o);
    return { from: Z, restore: oe };
    function oe() {
      r = N, c.previous = P, c.currentConstruct = F, c.events.length = Z, o = ue, G(), kn("position: restore: `%j`", r);
    }
  }
  function G() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function l1(t, e) {
  const n = e.start._index, r = e.start._bufferIndex, i = e.end._index, a = e.end._bufferIndex;
  let s;
  if (n === i)
    S(a > -1, "expected non-negative end buffer index"), S(r > -1, "expected non-negative start buffer index"), s = [t[n].slice(r, a)];
  else {
    if (s = t.slice(n, i), r > -1) {
      const o = s[0];
      typeof o == "string" ? s[0] = o.slice(r) : (S(r === 0, "expected `startBufferIndex` to be `0`"), s.shift());
    }
    a > 0 && s.push(t[i].slice(0, a));
  }
  return s;
}
function c1(t, e) {
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
          s = Wt.cr;
          break;
        }
        case m.lineFeed: {
          s = Wt.lf;
          break;
        }
        case m.carriageReturnLineFeed: {
          s = Wt.cr + Wt.lf;
          break;
        }
        case m.horizontalTab: {
          s = e ? Wt.space : Wt.ht;
          break;
        }
        case m.virtualSpace: {
          if (!e && i) continue;
          s = Wt.space;
          break;
        }
        default:
          S(typeof a == "number", "expected number"), s = String.fromCharCode(a);
      }
    i = a === m.horizontalTab, r.push(s);
  }
  return r.join("");
}
function u1(t) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      pf([t1, ...(t || {}).extensions || []])
    ),
    content: i(kf),
    defined: [],
    document: i(Sf),
    flow: i(Ug),
    lazy: {},
    string: i(jg),
    text: i(Vg)
  };
  return r;
  function i(a) {
    return s;
    function s(o) {
      return o1(r, a, o);
    }
  }
}
function d1(t) {
  for (; !Cl(t); )
    ;
  return t;
}
const Ws = /[\0\t\n\r]/g;
function h1() {
  let t = 1, e = "", n = !0, r;
  return i;
  function i(a, s, o) {
    const l = [];
    let u, c, d, f, h;
    for (a = e + (typeof a == "string" ? a.toString() : new TextDecoder(s || void 0).decode(a)), d = 0, e = "", n && (a.charCodeAt(0) === m.byteOrderMarker && d++, n = void 0); d < a.length; ) {
      if (Ws.lastIndex = d, u = Ws.exec(a), f = u && u.index !== void 0 ? u.index : a.length, h = a.charCodeAt(f), !u) {
        e = a.slice(d);
        break;
      }
      if (h === m.lf && d === f && r)
        l.push(m.carriageReturnLineFeed), r = void 0;
      else
        switch (r && (l.push(m.carriageReturn), r = void 0), d < f && (l.push(a.slice(d, f)), t += f - d), h) {
          case m.nul: {
            l.push(m.replacementCharacter), t++;
            break;
          }
          case m.ht: {
            for (c = Math.ceil(t / Y.tabSize) * Y.tabSize, l.push(m.horizontalTab); t++ < c; ) l.push(m.virtualSpace);
            break;
          }
          case m.lf: {
            l.push(m.lineFeed), t = 1;
            break;
          }
          default:
            r = !0, t = 1;
        }
      d = f + 1;
    }
    return o && (r && l.push(m.carriageReturn), e && l.push(e), l.push(m.eof)), l;
  }
}
const p1 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function f1(t) {
  return t.replace(p1, g1);
}
function g1(t, e, n) {
  if (e)
    return e;
  if (n.charCodeAt(0) === m.numberSign) {
    const i = n.charCodeAt(1), a = i === m.lowercaseX || i === m.uppercaseX;
    return fl(
      n.slice(a ? 2 : 1),
      a ? Y.numericBaseHexadecimal : Y.numericBaseDecimal
    );
  }
  return xa(n) || t;
}
const vl = {}.hasOwnProperty;
function m1(t, e, n) {
  return typeof e != "string" && (n = e, e = void 0), y1(n)(
    d1(
      u1(n).document().write(h1()(t, e, !0))
    )
  );
}
function y1(t) {
  const e = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(Ut),
      autolinkProtocol: H,
      autolinkEmail: H,
      atxHeading: a(Ne),
      blockQuote: a(Ie),
      characterEscape: H,
      characterReference: H,
      codeFenced: a(_e),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: a(_e, s),
      codeText: a(me, s),
      codeTextData: H,
      data: H,
      codeFlowValue: H,
      definition: a(De),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: a(je),
      hardBreakEscape: a(vt),
      hardBreakTrailing: a(vt),
      htmlFlow: a(Qt, s),
      htmlFlowData: H,
      htmlText: a(Qt, s),
      htmlTextData: H,
      image: a(Lt),
      label: s,
      link: a(Ut),
      listItem: a(yn),
      listItemValue: f,
      listOrdered: a($t, d),
      listUnordered: a($t),
      paragraph: a(wn),
      reference: y,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: a(Ne),
      strong: a(Wn),
      thematicBreak: a(Bt)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: L,
      autolink: l(),
      autolinkEmail: Te,
      autolinkProtocol: le,
      blockQuote: l(),
      characterEscapeValue: te,
      characterReferenceMarkerHexadecimal: K,
      characterReferenceMarkerNumeric: K,
      characterReferenceValue: fe,
      characterReference: he,
      codeFenced: l(I),
      codeFencedFence: k,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: w,
      codeFlowValue: te,
      codeIndented: l(_),
      codeText: l(F),
      codeTextData: te,
      data: te,
      definition: l(),
      definitionDestinationString: M,
      definitionLabelString: v,
      definitionTitleString: R,
      emphasis: l(),
      hardBreakEscape: l(G),
      hardBreakTrailing: l(G),
      htmlFlow: l(N),
      htmlFlowData: te,
      htmlText: l(P),
      htmlTextData: te,
      image: l(ue),
      label: ee,
      labelText: oe,
      lineEnding: de,
      link: l(Z),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: Q,
      resourceDestinationString: C,
      resourceTitleString: W,
      resource: V,
      setextHeading: l($),
      setextHeadingLineSequence: j,
      setextHeadingText: b,
      strong: l(),
      thematicBreak: l()
    }
  };
  Tl(e, (t || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(T) {
    let E = { type: "root", children: [] };
    const X = {
      stack: [E],
      tokenStack: [],
      config: e,
      enter: o,
      exit: u,
      buffer: s,
      resume: c,
      data: n
    }, Ce = [];
    let be = -1;
    for (; ++be < T.length; )
      if (T[be][1].type === g.listOrdered || T[be][1].type === g.listUnordered)
        if (T[be][0] === "enter")
          Ce.push(be);
        else {
          const Ge = Ce.pop();
          S(typeof Ge == "number", "expected list ot be open"), be = i(T, Ge, be);
        }
    for (be = -1; ++be < T.length; ) {
      const Ge = e[T[be][0]];
      vl.call(Ge, T[be][1].type) && Ge[T[be][1].type].call(
        Object.assign(
          { sliceSerialize: T[be][2].sliceSerialize },
          X
        ),
        T[be][1]
      );
    }
    if (X.tokenStack.length > 0) {
      const Ge = X.tokenStack[X.tokenStack.length - 1];
      (Ge[1] || Gs).call(X, void 0, Ge[0]);
    }
    for (E.position = {
      start: ln(
        T.length > 0 ? T[0][1].start : { line: 1, column: 1, offset: 0 }
      ),
      end: ln(
        T.length > 0 ? T[T.length - 2][1].end : { line: 1, column: 1, offset: 0 }
      )
    }, be = -1; ++be < e.transforms.length; )
      E = e.transforms[be](E) || E;
    return E;
  }
  function i(T, E, X) {
    let Ce = E - 1, be = -1, Ge = !1, Tt, at, Et, nt;
    for (; ++Ce <= X; ) {
      const Se = T[Ce];
      switch (Se[1].type) {
        case g.listUnordered:
        case g.listOrdered:
        case g.blockQuote: {
          Se[0] === "enter" ? be++ : be--, nt = void 0;
          break;
        }
        case g.lineEndingBlank: {
          Se[0] === "enter" && (Tt && !nt && !be && !Et && (Et = Ce), nt = void 0);
          break;
        }
        case g.linePrefix:
        case g.listItemValue:
        case g.listItemMarker:
        case g.listItemPrefix:
        case g.listItemPrefixWhitespace:
          break;
        default:
          nt = void 0;
      }
      if (!be && Se[0] === "enter" && Se[1].type === g.listItemPrefix || be === -1 && Se[0] === "exit" && (Se[1].type === g.listUnordered || Se[1].type === g.listOrdered)) {
        if (Tt) {
          let et = Ce;
          for (at = void 0; et--; ) {
            const st = T[et];
            if (st[1].type === g.lineEnding || st[1].type === g.lineEndingBlank) {
              if (st[0] === "exit") continue;
              at && (T[at][1].type = g.lineEndingBlank, Ge = !0), st[1].type = g.lineEnding, at = et;
            } else if (!(st[1].type === g.linePrefix || st[1].type === g.blockQuotePrefix || st[1].type === g.blockQuotePrefixWhitespace || st[1].type === g.blockQuoteMarker || st[1].type === g.listItemIndent)) break;
          }
          Et && (!at || Et < at) && (Tt._spread = !0), Tt.end = Object.assign(
            {},
            at ? T[at][1].start : Se[1].end
          ), T.splice(at || Ce, 0, ["exit", Tt, Se[2]]), Ce++, X++;
        }
        if (Se[1].type === g.listItemPrefix) {
          const et = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Se[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Tt = et, T.splice(Ce, 0, ["enter", et, Se[2]]), Ce++, X++, Et = void 0, nt = !0;
        }
      }
    }
    return T[E][1]._spread = Ge, X;
  }
  function a(T, E) {
    return X;
    function X(Ce) {
      o.call(this, T(Ce), Ce), E && E.call(this, Ce);
    }
  }
  function s() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function o(T, E, X) {
    const Ce = this.stack[this.stack.length - 1];
    S(Ce, "expected `parent`"), S("children" in Ce, "expected `parent`"), Ce.children.push(T), this.stack.push(T), this.tokenStack.push([E, X || void 0]), T.position = {
      start: ln(E.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function l(T) {
    return E;
    function E(X) {
      T && T.call(this, X), u.call(this, X);
    }
  }
  function u(T, E) {
    const X = this.stack.pop();
    S(X, "expected `node`");
    const Ce = this.tokenStack.pop();
    if (Ce)
      Ce[0].type !== T.type && (E ? E.call(this, T, Ce[0]) : (Ce[1] || Gs).call(this, T, Ce[0]));
    else throw new Error(
      "Cannot close `" + T.type + "` (" + ur({ start: T.start, end: T.end }) + "): it’s not open"
    );
    S(X.type !== "fragment", "unexpected fragment `exit`ed"), S(X.position, "expected `position` to be defined"), X.position.end = ln(T.end);
  }
  function c() {
    return df(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function f(T) {
    if (this.data.expectingFirstListItemValue) {
      const E = this.stack[this.stack.length - 2];
      S(E, "expected nodes on stack"), S(E.type === "list", "expected list on stack"), E.start = Number.parseInt(
        this.sliceSerialize(T),
        Y.numericBaseDecimal
      ), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S(E.type === "code", "expected code on stack"), E.lang = T;
  }
  function w() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S(E.type === "code", "expected code on stack"), E.meta = T;
  }
  function k() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function I() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S(E.type === "code", "expected code on stack"), E.value = T.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function _() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S(E.type === "code", "expected code on stack"), E.value = T.replace(/(\r?\n|\r)$/g, "");
  }
  function v(T) {
    const E = this.resume(), X = this.stack[this.stack.length - 1];
    S(X, "expected node on stack"), S(X.type === "definition", "expected definition on stack"), X.label = E, X.identifier = Dn(
      this.sliceSerialize(T)
    ).toLowerCase();
  }
  function R() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S(E.type === "definition", "expected definition on stack"), E.title = T;
  }
  function M() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S(E.type === "definition", "expected definition on stack"), E.url = T;
  }
  function L(T) {
    const E = this.stack[this.stack.length - 1];
    if (S(E, "expected node on stack"), S(E.type === "heading", "expected heading on stack"), !E.depth) {
      const X = this.sliceSerialize(T).length;
      S(
        X === 1 || X === 2 || X === 3 || X === 4 || X === 5 || X === 6,
        "expected `depth` between `1` and `6`"
      ), E.depth = X;
    }
  }
  function b() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function j(T) {
    const E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S(E.type === "heading", "expected heading on stack"), E.depth = this.sliceSerialize(T).codePointAt(0) === m.equalsTo ? 1 : 2;
  }
  function $() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function H(T) {
    const E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S("children" in E, "expected parent on stack");
    const X = E.children;
    let Ce = X[X.length - 1];
    (!Ce || Ce.type !== "text") && (Ce = Cn(), Ce.position = {
      start: ln(T.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, X.push(Ce)), this.stack.push(Ce);
  }
  function te(T) {
    const E = this.stack.pop();
    S(E, "expected a `node` to be on the stack"), S("value" in E, "expected a `literal` to be on the stack"), S(E.position, "expected `node` to have an open position"), E.value += this.sliceSerialize(T), E.position.end = ln(T.end);
  }
  function de(T) {
    const E = this.stack[this.stack.length - 1];
    if (S(E, "expected `node`"), this.data.atHardBreak) {
      S("children" in E, "expected `parent`");
      const X = E.children[E.children.length - 1];
      S(X.position, "expected tail to have a starting position"), X.position.end = ln(T.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && e.canContainEols.includes(E.type) && (H.call(this, T), te.call(this, T));
  }
  function G() {
    this.data.atHardBreak = !0;
  }
  function N() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S(E.type === "html", "expected html on stack"), E.value = T;
  }
  function P() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S(E.type === "html", "expected html on stack"), E.value = T;
  }
  function F() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S(E.type === "inlineCode", "expected inline code on stack"), E.value = T;
  }
  function Z() {
    const T = this.stack[this.stack.length - 1];
    if (S(T, "expected node on stack"), S(T.type === "link", "expected link on stack"), this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      T.type += "Reference", T.referenceType = E, delete T.url, delete T.title;
    } else
      delete T.identifier, delete T.label;
    this.data.referenceType = void 0;
  }
  function ue() {
    const T = this.stack[this.stack.length - 1];
    if (S(T, "expected node on stack"), S(T.type === "image", "expected image on stack"), this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      T.type += "Reference", T.referenceType = E, delete T.url, delete T.title;
    } else
      delete T.identifier, delete T.label;
    this.data.referenceType = void 0;
  }
  function oe(T) {
    const E = this.sliceSerialize(T), X = this.stack[this.stack.length - 2];
    S(X, "expected ancestor on stack"), S(
      X.type === "image" || X.type === "link",
      "expected image or link on stack"
    ), X.label = f1(E), X.identifier = Dn(E).toLowerCase();
  }
  function ee() {
    const T = this.stack[this.stack.length - 1];
    S(T, "expected node on stack"), S(T.type === "fragment", "expected fragment on stack");
    const E = this.resume(), X = this.stack[this.stack.length - 1];
    if (S(X, "expected node on stack"), S(
      X.type === "image" || X.type === "link",
      "expected image or link on stack"
    ), this.data.inReference = !0, X.type === "link") {
      const Ce = T.children;
      X.children = Ce;
    } else
      X.alt = E;
  }
  function C() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S(
      E.type === "image" || E.type === "link",
      "expected image or link on stack"
    ), E.url = T;
  }
  function W() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S(
      E.type === "image" || E.type === "link",
      "expected image or link on stack"
    ), E.title = T;
  }
  function V() {
    this.data.inReference = void 0;
  }
  function y() {
    this.data.referenceType = "collapsed";
  }
  function Q(T) {
    const E = this.resume(), X = this.stack[this.stack.length - 1];
    S(X, "expected node on stack"), S(
      X.type === "image" || X.type === "link",
      "expected image reference or link reference on stack"
    ), X.label = E, X.identifier = Dn(
      this.sliceSerialize(T)
    ).toLowerCase(), this.data.referenceType = "full";
  }
  function K(T) {
    S(
      T.type === "characterReferenceMarkerNumeric" || T.type === "characterReferenceMarkerHexadecimal"
    ), this.data.characterReferenceType = T.type;
  }
  function fe(T) {
    const E = this.sliceSerialize(T), X = this.data.characterReferenceType;
    let Ce;
    if (X)
      Ce = fl(
        E,
        X === g.characterReferenceMarkerNumeric ? Y.numericBaseDecimal : Y.numericBaseHexadecimal
      ), this.data.characterReferenceType = void 0;
    else {
      const Ge = xa(E);
      S(Ge !== !1, "expected reference to decode"), Ce = Ge;
    }
    const be = this.stack[this.stack.length - 1];
    S(be, "expected `node`"), S("value" in be, "expected `node.value`"), be.value += Ce;
  }
  function he(T) {
    const E = this.stack.pop();
    S(E, "expected `node`"), S(E.position, "expected `node.position`"), E.position.end = ln(T.end);
  }
  function le(T) {
    te.call(this, T);
    const E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S(E.type === "link", "expected link on stack"), E.url = this.sliceSerialize(T);
  }
  function Te(T) {
    te.call(this, T);
    const E = this.stack[this.stack.length - 1];
    S(E, "expected node on stack"), S(E.type === "link", "expected link on stack"), E.url = "mailto:" + this.sliceSerialize(T);
  }
  function Ie() {
    return { type: "blockquote", children: [] };
  }
  function _e() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function me() {
    return { type: "inlineCode", value: "" };
  }
  function De() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function je() {
    return { type: "emphasis", children: [] };
  }
  function Ne() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function vt() {
    return { type: "break" };
  }
  function Qt() {
    return { type: "html", value: "" };
  }
  function Lt() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function Ut() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function $t(T) {
    return {
      type: "list",
      ordered: T.type === "listOrdered",
      start: null,
      spread: T._spread,
      children: []
    };
  }
  function yn(T) {
    return {
      type: "listItem",
      spread: T._spread,
      checked: null,
      children: []
    };
  }
  function wn() {
    return { type: "paragraph", children: [] };
  }
  function Wn() {
    return { type: "strong", children: [] };
  }
  function Cn() {
    return { type: "text", value: "" };
  }
  function Bt() {
    return { type: "thematicBreak" };
  }
}
function ln(t) {
  return { line: t.line, column: t.column, offset: t.offset };
}
function Tl(t, e) {
  let n = -1;
  for (; ++n < e.length; ) {
    const r = e[n];
    Array.isArray(r) ? Tl(t, r) : w1(t, r);
  }
}
function w1(t, e) {
  let n;
  for (n in e)
    if (vl.call(e, n))
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
function Gs(t, e) {
  throw t ? new Error(
    "Cannot close `" + t.type + "` (" + ur({ start: t.start, end: t.end }) + "): a different token (`" + e.type + "`, " + ur({ start: e.start, end: e.end }) + ") is open"
  ) : new Error(
    "Cannot close document, a token (`" + e.type + "`, " + ur({ start: e.start, end: e.end }) + ") is still open"
  );
}
function C1(t) {
  const e = this;
  e.parser = n;
  function n(r) {
    return m1(r, {
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
function x1(t, e) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: t.wrap(t.all(e), !0)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function k1(t, e) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return t.patch(e, n), [t.applyData(e, n), { type: "text", value: `
` }];
}
function _1(t, e) {
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
function S1(t, e) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function b1(t, e) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function v1(t, e) {
  const n = typeof t.options.clobberPrefix == "string" ? t.options.clobberPrefix : "user-content-", r = String(e.identifier).toUpperCase(), i = Zn(r.toLowerCase()), a = t.footnoteOrder.indexOf(r);
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
function T1(t, e) {
  const n = {
    type: "element",
    tagName: "h" + e.depth,
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function E1(t, e) {
  if (t.options.allowDangerousHtml) {
    const n = { type: "raw", value: e.value };
    return t.patch(e, n), t.applyData(e, n);
  }
}
function El(t, e) {
  const n = e.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (e.label || e.identifier) + "]"), e.type === "imageReference")
    return [{ type: "text", value: "![" + e.alt + r }];
  const i = t.all(e), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return s && s.type === "text" ? s.value += r : i.push({ type: "text", value: r }), i;
}
function R1(t, e) {
  const n = String(e.identifier).toUpperCase(), r = t.definitionById.get(n);
  if (!r)
    return El(t, e);
  const i = { src: Zn(r.url || ""), alt: e.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return t.patch(e, a), t.applyData(e, a);
}
function I1(t, e) {
  const n = { src: Zn(e.url) };
  e.alt !== null && e.alt !== void 0 && (n.alt = e.alt), e.title !== null && e.title !== void 0 && (n.title = e.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return t.patch(e, r), t.applyData(e, r);
}
function N1(t, e) {
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
function A1(t, e) {
  const n = String(e.identifier).toUpperCase(), r = t.definitionById.get(n);
  if (!r)
    return El(t, e);
  const i = { href: Zn(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: t.all(e)
  };
  return t.patch(e, a), t.applyData(e, a);
}
function O1(t, e) {
  const n = { href: Zn(e.url) };
  e.title !== null && e.title !== void 0 && (n.title = e.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: t.all(e)
  };
  return t.patch(e, r), t.applyData(e, r);
}
function M1(t, e, n) {
  const r = t.all(e), i = n ? L1(n) : Rl(e), a = {}, s = [];
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
function L1(t) {
  let e = !1;
  if (t.type === "list") {
    e = t.spread || !1;
    const n = t.children;
    let r = -1;
    for (; !e && ++r < n.length; )
      e = Rl(n[r]);
  }
  return e;
}
function Rl(t) {
  const e = t.spread;
  return e ?? t.children.length > 1;
}
function P1(t, e) {
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
function D1(t, e) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function F1(t, e) {
  const n = { type: "root", children: t.wrap(t.all(e)) };
  return t.patch(e, n), t.applyData(e, n);
}
function z1(t, e) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function H1(t, e) {
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
    }, o = ma(e.children[1]), l = ol(e.children[e.children.length - 1]);
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
function U1(t, e, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(e) : 1) === 0 ? "th" : "td", s = n && n.type === "table" ? n.align : void 0, o = s ? s.length : e.children.length;
  let l = -1;
  const u = [];
  for (; ++l < o; ) {
    const d = e.children[l], f = {}, h = s ? s[l] : void 0;
    h && (f.align = h);
    let w = { type: "element", tagName: a, properties: f, children: [] };
    d && (w.children = t.all(d), t.patch(d, w), w = t.applyData(d, w)), u.push(w);
  }
  const c = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: t.wrap(u, !0)
  };
  return t.patch(e, c), t.applyData(e, c);
}
function $1(t, e) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
const qs = 9, Ks = 32;
function B1(t) {
  const e = String(t), n = /\r?\n|\r/g;
  let r = n.exec(e), i = 0;
  const a = [];
  for (; r; )
    a.push(
      Ys(e.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(e);
  return a.push(Ys(e.slice(i), i > 0, !1)), a.join("");
}
function Ys(t, e, n) {
  let r = 0, i = t.length;
  if (e) {
    let a = t.codePointAt(r);
    for (; a === qs || a === Ks; )
      r++, a = t.codePointAt(r);
  }
  if (n) {
    let a = t.codePointAt(i - 1);
    for (; a === qs || a === Ks; )
      i--, a = t.codePointAt(i - 1);
  }
  return i > r ? t.slice(r, i) : "";
}
function j1(t, e) {
  const n = { type: "text", value: B1(String(e.value)) };
  return t.patch(e, n), t.applyData(e, n);
}
function V1(t, e) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return t.patch(e, n), t.applyData(e, n);
}
const Z1 = {
  blockquote: x1,
  break: k1,
  code: _1,
  delete: S1,
  emphasis: b1,
  footnoteReference: v1,
  heading: T1,
  html: E1,
  imageReference: R1,
  image: I1,
  inlineCode: N1,
  linkReference: A1,
  link: O1,
  listItem: M1,
  list: P1,
  paragraph: D1,
  // @ts-expect-error: root is different, but hard to type.
  root: F1,
  strong: z1,
  table: H1,
  tableCell: $1,
  tableRow: U1,
  text: j1,
  thematicBreak: V1,
  toml: Nr,
  yaml: Nr,
  definition: Nr,
  footnoteDefinition: Nr
};
function Nr() {
}
const Il = -1, ni = 0, hr = 1, qr = 2, Sa = 3, ba = 4, va = 5, Ta = 6, Nl = 7, Al = 8, Xs = typeof self == "object" ? self : globalThis, W1 = (t, e) => {
  const n = (i, a) => (t.set(a, i), i), r = (i) => {
    if (t.has(i))
      return t.get(i);
    const [a, s] = e[i];
    switch (a) {
      case ni:
      case Il:
        return n(s, i);
      case hr: {
        const o = n([], i);
        for (const l of s)
          o.push(r(l));
        return o;
      }
      case qr: {
        const o = n({}, i);
        for (const [l, u] of s)
          o[r(l)] = r(u);
        return o;
      }
      case Sa:
        return n(new Date(s), i);
      case ba: {
        const { source: o, flags: l } = s;
        return n(new RegExp(o, l), i);
      }
      case va: {
        const o = n(/* @__PURE__ */ new Map(), i);
        for (const [l, u] of s)
          o.set(r(l), r(u));
        return o;
      }
      case Ta: {
        const o = n(/* @__PURE__ */ new Set(), i);
        for (const l of s)
          o.add(r(l));
        return o;
      }
      case Nl: {
        const { name: o, message: l } = s;
        return n(new Xs[o](l), i);
      }
      case Al:
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
    return n(new Xs[a](s), i);
  };
  return r;
}, Js = (t) => W1(/* @__PURE__ */ new Map(), t)(0), On = "", { toString: G1 } = {}, { keys: q1 } = Object, sr = (t) => {
  const e = typeof t;
  if (e !== "object" || !t)
    return [ni, e];
  const n = G1.call(t).slice(8, -1);
  switch (n) {
    case "Array":
      return [hr, On];
    case "Object":
      return [qr, On];
    case "Date":
      return [Sa, On];
    case "RegExp":
      return [ba, On];
    case "Map":
      return [va, On];
    case "Set":
      return [Ta, On];
    case "DataView":
      return [hr, n];
  }
  return n.includes("Array") ? [hr, n] : n.includes("Error") ? [Nl, n] : [qr, n];
}, Ar = ([t, e]) => t === ni && (e === "function" || e === "symbol"), K1 = (t, e, n, r) => {
  const i = (s, o) => {
    const l = r.push(s) - 1;
    return n.set(o, l), l;
  }, a = (s) => {
    if (n.has(s))
      return n.get(s);
    let [o, l] = sr(s);
    switch (o) {
      case ni: {
        let c = s;
        switch (l) {
          case "bigint":
            o = Al, c = s.toString();
            break;
          case "function":
          case "symbol":
            if (t)
              throw new TypeError("unable to serialize " + l);
            c = null;
            break;
          case "undefined":
            return i([Il], s);
        }
        return i([o, c], s);
      }
      case hr: {
        if (l) {
          let f = s;
          return l === "DataView" ? f = new Uint8Array(s.buffer) : l === "ArrayBuffer" && (f = new Uint8Array(s)), i([l, [...f]], s);
        }
        const c = [], d = i([o, c], s);
        for (const f of s)
          c.push(a(f));
        return d;
      }
      case qr: {
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
        for (const f of q1(s))
          (t || !Ar(sr(s[f]))) && c.push([a(f), a(s[f])]);
        return d;
      }
      case Sa:
        return i([o, s.toISOString()], s);
      case ba: {
        const { source: c, flags: d } = s;
        return i([o, { source: c, flags: d }], s);
      }
      case va: {
        const c = [], d = i([o, c], s);
        for (const [f, h] of s)
          (t || !(Ar(sr(f)) || Ar(sr(h)))) && c.push([a(f), a(h)]);
        return d;
      }
      case Ta: {
        const c = [], d = i([o, c], s);
        for (const f of s)
          (t || !Ar(sr(f))) && c.push(a(f));
        return d;
      }
    }
    const { message: u } = s;
    return i([o, { name: l, message: u }], s);
  };
  return a;
}, Qs = (t, { json: e, lossy: n } = {}) => {
  const r = [];
  return K1(!(e || n), !!e, /* @__PURE__ */ new Map(), r)(t), r;
}, Kr = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (t, e) => e && ("json" in e || "lossy" in e) ? Js(Qs(t, e)) : structuredClone(t)
) : (t, e) => Js(Qs(t, e));
function Y1(t, e) {
  const n = [{ type: "text", value: "↩" }];
  return e > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(e) }]
  }), n;
}
function X1(t, e) {
  return "Back to reference " + (t + 1) + (e > 1 ? "-" + e : "");
}
function J1(t) {
  const e = typeof t.options.clobberPrefix == "string" ? t.options.clobberPrefix : "user-content-", n = t.options.footnoteBackContent || Y1, r = t.options.footnoteBackLabel || X1, i = t.options.footnoteLabel || "Footnotes", a = t.options.footnoteLabelTagName || "h2", s = t.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let l = -1;
  for (; ++l < t.footnoteOrder.length; ) {
    const u = t.footnoteById.get(
      t.footnoteOrder[l]
    );
    if (!u)
      continue;
    const c = t.all(u), d = String(u.identifier).toUpperCase(), f = Zn(d.toLowerCase());
    let h = 0;
    const w = [], k = t.footnoteCounts.get(d);
    for (; k !== void 0 && ++h <= k; ) {
      w.length > 0 && w.push({ type: "text", value: " " });
      let v = typeof n == "string" ? n : n(l, h);
      typeof v == "string" && (v = { type: "text", value: v }), w.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + e + "fnref-" + f + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(l, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(v) ? v : [v]
      });
    }
    const I = c[c.length - 1];
    if (I && I.type === "element" && I.tagName === "p") {
      const v = I.children[I.children.length - 1];
      v && v.type === "text" ? v.value += " " : I.children.push({ type: "text", value: " " }), I.children.push(...w);
    } else
      c.push(...w);
    const _ = {
      type: "element",
      tagName: "li",
      properties: { id: e + "fn-" + f },
      children: t.wrap(c, !0)
    };
    t.patch(u, _), o.push(_);
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
            ...Kr(s),
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
const Ea = (
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
      return nm;
    if (typeof t == "function")
      return ri(t);
    if (typeof t == "object")
      return Array.isArray(t) ? Q1(t) : em(t);
    if (typeof t == "string")
      return tm(t);
    throw new Error("Expected function, string, or object as test");
  }
);
function Q1(t) {
  const e = [];
  let n = -1;
  for (; ++n < t.length; )
    e[n] = Ea(t[n]);
  return ri(r);
  function r(...i) {
    let a = -1;
    for (; ++a < e.length; )
      if (e[a].apply(this, i)) return !0;
    return !1;
  }
}
function em(t) {
  const e = (
    /** @type {Record<string, unknown>} */
    t
  );
  return ri(n);
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
function tm(t) {
  return ri(e);
  function e(n) {
    return n && n.type === t;
  }
}
function ri(t) {
  return e;
  function e(n, r, i) {
    return !!(rm(n) && t.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function nm() {
  return !0;
}
function rm(t) {
  return t !== null && typeof t == "object" && "type" in t;
}
const Ol = [], im = !0, eo = !1, am = "skip";
function Ml(t, e, n, r) {
  let i;
  typeof e == "function" && typeof n != "function" ? (r = n, n = e) : i = e;
  const a = Ea(i), s = r ? -1 : 1;
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
      Object.defineProperty(f, "name", {
        value: "node (" + (l.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return f;
    function f() {
      let h = Ol, w, k, I;
      if ((!e || a(l, u, c[c.length - 1] || void 0)) && (h = sm(n(l, c)), h[0] === eo))
        return h;
      if ("children" in l && l.children) {
        const _ = (
          /** @type {UnistParent} */
          l
        );
        if (_.children && h[0] !== am)
          for (k = (r ? _.children.length : -1) + s, I = c.concat(_); k > -1 && k < _.children.length; ) {
            const v = _.children[k];
            if (w = o(v, k, I)(), w[0] === eo)
              return w;
            k = typeof w[1] == "number" ? w[1] : k + s;
          }
      }
      return h;
    }
  }
}
function sm(t) {
  return Array.isArray(t) ? t : typeof t == "number" ? [im, t] : t == null ? Ol : [t];
}
function Ll(t, e, n, r) {
  let i, a, s;
  typeof e == "function" && typeof n != "function" ? (a = void 0, s = e, i = n) : (a = e, s = n, i = r), Ml(t, a, o, i);
  function o(l, u) {
    const c = u[u.length - 1], d = c ? c.children.indexOf(l) : void 0;
    return s(l, d, c);
  }
}
const ia = {}.hasOwnProperty, om = {};
function lm(t, e) {
  const n = e || om, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = { ...Z1, ...n.handlers }, o = {
    all: u,
    applyData: um,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: s,
    one: l,
    options: n,
    patch: cm,
    wrap: hm
  };
  return Ll(t, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const d = c.type === "definition" ? r : i, f = String(c.identifier).toUpperCase();
      d.has(f) || d.set(f, c);
    }
  }), o;
  function l(c, d) {
    const f = c.type, h = o.handlers[f];
    if (ia.call(o.handlers, f) && h)
      return h(o, c, d);
    if (o.options.passThrough && o.options.passThrough.includes(f)) {
      if ("children" in c) {
        const { children: k, ...I } = c, _ = Kr(I);
        return _.children = o.all(c), _;
      }
      return Kr(c);
    }
    return (o.options.unknownHandler || dm)(o, c, d);
  }
  function u(c) {
    const d = [];
    if ("children" in c) {
      const f = c.children;
      let h = -1;
      for (; ++h < f.length; ) {
        const w = o.one(f[h], c);
        if (w) {
          if (h && f[h - 1].type === "break" && (!Array.isArray(w) && w.type === "text" && (w.value = to(w.value)), !Array.isArray(w) && w.type === "element")) {
            const k = w.children[0];
            k && k.type === "text" && (k.value = to(k.value));
          }
          Array.isArray(w) ? d.push(...w) : d.push(w);
        }
      }
    }
    return d;
  }
}
function cm(t, e) {
  t.position && (e.position = Bp(t));
}
function um(t, e) {
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
    n.type === "element" && a && Object.assign(n.properties, Kr(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function dm(t, e) {
  const n = e.data || {}, r = "value" in e && !(ia.call(n, "hProperties") || ia.call(n, "hChildren")) ? { type: "text", value: e.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, r), t.applyData(e, r);
}
function hm(t, e) {
  const n = [];
  let r = -1;
  for (e && n.push({ type: "text", value: `
` }); ++r < t.length; )
    r && n.push({ type: "text", value: `
` }), n.push(t[r]);
  return e && t.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function to(t) {
  let e = 0, n = t.charCodeAt(e);
  for (; n === 9 || n === 32; )
    e++, n = t.charCodeAt(e);
  return t.slice(e);
}
function no(t, e) {
  const n = lm(t, e), r = n.one(t, void 0), i = J1(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && (S("children" in a), a.children.push({ type: "text", value: `
` }, i)), a;
}
function pm(t, e) {
  return t && "run" in t ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      no(n, { file: r, ...e })
    );
    await t.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      no(n, { file: r, ...t || e })
    );
  };
}
function ro(t) {
  if (t)
    throw t;
}
var Dr = Object.prototype.hasOwnProperty, Pl = Object.prototype.toString, io = Object.defineProperty, ao = Object.getOwnPropertyDescriptor, so = function(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : Pl.call(e) === "[object Array]";
}, oo = function(e) {
  if (!e || Pl.call(e) !== "[object Object]")
    return !1;
  var n = Dr.call(e, "constructor"), r = e.constructor && e.constructor.prototype && Dr.call(e.constructor.prototype, "isPrototypeOf");
  if (e.constructor && !n && !r)
    return !1;
  var i;
  for (i in e)
    ;
  return typeof i > "u" || Dr.call(e, i);
}, lo = function(e, n) {
  io && n.name === "__proto__" ? io(e, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : e[n.name] = n.newValue;
}, co = function(e, n) {
  if (n === "__proto__")
    if (Dr.call(e, n)) {
      if (ao)
        return ao(e, n).value;
    } else return;
  return e[n];
}, fm = function t() {
  var e, n, r, i, a, s, o = arguments[0], l = 1, u = arguments.length, c = !1;
  for (typeof o == "boolean" && (c = o, o = arguments[1] || {}, l = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); l < u; ++l)
    if (e = arguments[l], e != null)
      for (n in e)
        r = co(o, n), i = co(e, n), o !== i && (c && i && (oo(i) || (a = so(i))) ? (a ? (a = !1, s = r && so(r) ? r : []) : s = r && oo(r) ? r : {}, lo(o, { name: n, newValue: t(c, s, i) })) : typeof i < "u" && lo(o, { name: n, newValue: i }));
  return o;
};
const Ti = /* @__PURE__ */ ha(fm);
function aa(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function gm() {
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
      i = u, c ? mm(c, o)(...u) : s(null, ...u);
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
function mm(t, e) {
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
const Zt = { basename: ym, dirname: wm, extname: Cm, join: xm, sep: "/" };
function ym(t, e) {
  if (e !== void 0 && typeof e != "string")
    throw new TypeError('"ext" argument must be a string');
  kr(t);
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
function wm(t) {
  if (kr(t), t.length === 0)
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
function Cm(t) {
  kr(t);
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
function xm(...t) {
  let e = -1, n;
  for (; ++e < t.length; )
    kr(t[e]), t[e] && (n = n === void 0 ? t[e] : n + "/" + t[e]);
  return n === void 0 ? "." : km(n);
}
function km(t) {
  kr(t);
  const e = t.codePointAt(0) === 47;
  let n = _m(t, !e);
  return n.length === 0 && !e && (n = "."), n.length > 0 && t.codePointAt(t.length - 1) === 47 && (n += "/"), e ? "/" + n : n;
}
function _m(t, e) {
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
function kr(t) {
  if (typeof t != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(t)
    );
}
const Sm = { cwd: bm };
function bm() {
  return "/";
}
function sa(t) {
  return !!(t !== null && typeof t == "object" && "href" in t && t.href && "protocol" in t && t.protocol && // @ts-expect-error: indexing is fine.
  t.auth === void 0);
}
function vm(t) {
  if (typeof t == "string")
    t = new URL(t);
  else if (!sa(t)) {
    const e = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + t + "`"
    );
    throw e.code = "ERR_INVALID_ARG_TYPE", e;
  }
  if (t.protocol !== "file:") {
    const e = new TypeError("The URL must be of scheme file");
    throw e.code = "ERR_INVALID_URL_SCHEME", e;
  }
  return Tm(t);
}
function Tm(t) {
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
const Ei = (
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
class Dl {
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
    e ? sa(e) ? n = { path: e } : typeof e == "string" || Em(e) ? n = { value: e } : n = e : n = {}, this.cwd = "cwd" in n ? "" : Sm.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Ei.length; ) {
      const a = Ei[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      Ei.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Zt.basename(this.path) : void 0;
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
    Ii(e, "basename"), Ri(e, "basename"), this.path = Zt.join(this.dirname || "", e);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Zt.dirname(this.path) : void 0;
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
    uo(this.basename, "dirname"), this.path = Zt.join(e || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Zt.extname(this.path) : void 0;
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
    if (Ri(e, "extname"), uo(this.dirname, "extname"), e) {
      if (e.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (e.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Zt.join(this.dirname, this.stem + (e || ""));
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
    sa(e) && (e = vm(e)), Ii(e, "path"), this.path !== e && this.history.push(e);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Zt.basename(this.path, this.extname) : void 0;
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
    Ii(e, "stem"), Ri(e, "stem"), this.path = Zt.join(this.dirname || "", e + (this.extname || ""));
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
    const i = new ct(
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
function Ri(t, e) {
  if (t && t.includes(Zt.sep))
    throw new Error(
      "`" + e + "` cannot be a path: did not expect `" + Zt.sep + "`"
    );
}
function Ii(t, e) {
  if (!t)
    throw new Error("`" + e + "` cannot be empty");
}
function uo(t, e) {
  if (!t)
    throw new Error("Setting `" + e + "` requires `path` to be set too");
}
function Em(t) {
  return !!(t && typeof t == "object" && "byteLength" in t && "byteOffset" in t);
}
const Rm = (
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
), Im = {}.hasOwnProperty;
class Ra extends Rm {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = gm();
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
      new Ra()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      e.use(...r);
    }
    return e.data(Ti(!0, {}, this.namespace)), e;
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
    return typeof e == "string" ? arguments.length === 2 ? (Oi("data", this.frozen), this.namespace[e] = n, this) : Im.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (Oi("data", this.frozen), this.namespace = e, this) : this.namespace;
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
    const n = Or(e), r = this.parser || this.Parser;
    return Ni("parse", r), r(String(n), n);
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
    return this.freeze(), Ni("process", this.parser || this.Parser), Ai("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, s) {
      const o = Or(e), l = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(o)
      );
      r.run(l, o, function(c, d, f) {
        if (c || !d || !f)
          return u(c);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          d
        ), w = r.stringify(h, f);
        Om(w) ? f.value = w : f.result = w, u(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          f
        );
      });
      function u(c, d) {
        c || !d ? s(c) : a ? a(d) : (S(n, "`done` is defined if `resolve` is not"), n(void 0, d));
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
    return this.freeze(), Ni("processSync", this.parser || this.Parser), Ai("processSync", this.compiler || this.Compiler), this.process(e, i), po("processSync", "process", n), S(r, "we either bailed on an error or have a tree"), r;
    function i(a, s) {
      n = !0, ro(a), r = s;
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
    ho(e), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(s, o) {
      S(
        typeof n != "function",
        "`file` can’t be a `done` anymore, we checked"
      );
      const l = Or(n);
      i.run(e, l, u);
      function u(c, d, f) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          d || e
        );
        c ? o(c) : s ? s(h) : (S(r, "`done` is defined if `resolve` is not"), r(void 0, h, f));
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
    return this.run(e, n, a), po("runSync", "run", r), S(i, "we either bailed on an error or have a tree"), i;
    function a(s, o) {
      ro(s), i = o, r = !0;
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
    const r = Or(n), i = this.compiler || this.Compiler;
    return Ai("stringify", i), ho(e), i(e, r);
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
    if (Oi("use", this.frozen), e != null) if (typeof e == "function")
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
      o(u.plugins), u.settings && (i.settings = Ti(!0, i.settings, u.settings));
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
      let d = -1, f = -1;
      for (; ++d < r.length; )
        if (r[d][0] === u) {
          f = d;
          break;
        }
      if (f === -1)
        r.push([u, ...c]);
      else if (c.length > 0) {
        let [h, ...w] = c;
        const k = r[f][1];
        aa(k) && aa(h) && (h = Ti(!0, k, h)), r[f] = [u, h, ...w];
      }
    }
  }
}
const Nm = new Ra().freeze();
function Ni(t, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + t + "` without `parser`");
}
function Ai(t, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + t + "` without `compiler`");
}
function Oi(t, e) {
  if (e)
    throw new Error(
      "Cannot call `" + t + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function ho(t) {
  if (!aa(t) || typeof t.type != "string")
    throw new TypeError("Expected node, got `" + t + "`");
}
function po(t, e, n) {
  if (!n)
    throw new Error(
      "`" + t + "` finished async. Use `" + e + "` instead"
    );
}
function Or(t) {
  return Am(t) ? t : new Dl(t);
}
function Am(t) {
  return !!(t && typeof t == "object" && "message" in t && "messages" in t);
}
function Om(t) {
  return typeof t == "string" || Mm(t);
}
function Mm(t) {
  return !!(t && typeof t == "object" && "byteLength" in t && "byteOffset" in t);
}
const Lm = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", fo = [], go = { allowDangerousHtml: !0 }, Pm = /^(https?|ircs?|mailto|xmpp)$/i, Dm = [
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
function mo(t) {
  const e = Fm(t), n = zm(t);
  return Hm(e.runSync(e.parse(n), n), t);
}
function Fm(t) {
  const e = t.rehypePlugins || fo, n = t.remarkPlugins || fo, r = t.remarkRehypeOptions ? { ...t.remarkRehypeOptions, ...go } : go;
  return Nm().use(C1).use(n).use(pm, r).use(e);
}
function zm(t) {
  const e = t.children || "", n = new Dl();
  return typeof e == "string" ? n.value = e : qi(
    "Unexpected value `" + e + "` for `children` prop, expected `string`"
  ), n;
}
function Hm(t, e) {
  const n = e.allowedElements, r = e.allowElement, i = e.components, a = e.disallowedElements, s = e.skipHtml, o = e.unwrapDisallowed, l = e.urlTransform || Um;
  for (const c of Dm)
    Object.hasOwn(e, c.from) && qi(
      "Unexpected `" + c.from + "` prop, " + (c.to ? "use `" + c.to + "` instead" : "remove it") + " (see <" + Lm + "#" + c.id + "> for more info)"
    );
  return n && a && qi(
    "Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other"
  ), Ll(t, u), Gp(t, {
    Fragment: Yt,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: p,
    jsxs: O,
    passKeys: !0,
    passNode: !0
  });
  function u(c, d, f) {
    if (c.type === "raw" && f && typeof d == "number")
      return s ? f.children.splice(d, 1) : f.children[d] = { type: "text", value: c.value }, d;
    if (c.type === "element") {
      let h;
      for (h in _i)
        if (Object.hasOwn(_i, h) && Object.hasOwn(c.properties, h)) {
          const w = c.properties[h], k = _i[h];
          (k === null || k.includes(c.tagName)) && (c.properties[h] = l(String(w || ""), h, c));
        }
    }
    if (c.type === "element") {
      let h = n ? !n.includes(c.tagName) : a ? a.includes(c.tagName) : !1;
      if (!h && r && typeof d == "number" && (h = !r(c, d, f)), h && f && typeof d == "number")
        return o && c.children ? f.children.splice(d, 1, ...c.children) : f.children.splice(d, 1), d;
    }
  }
}
function Um(t) {
  const e = t.indexOf(":"), n = t.indexOf("?"), r = t.indexOf("#"), i = t.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    e === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && e > i || n !== -1 && e > n || r !== -1 && e > r || // It is a protocol, it should be allowed.
    Pm.test(t.slice(0, e)) ? t : ""
  );
}
function $m(t) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Bm(t, e, n) {
  const i = Ea({}.ignore || []), a = jm(e);
  let s = -1;
  for (; ++s < a.length; )
    Ml(t, "text", o);
  function o(u, c) {
    let d = -1, f;
    for (; ++d < c.length; ) {
      const h = c[d], w = f ? f.children : void 0;
      if (i(
        h,
        w ? w.indexOf(h) : void 0,
        f
      ))
        return;
      f = h;
    }
    if (f)
      return l(u, c);
  }
  function l(u, c) {
    const d = c[c.length - 1], f = a[s][0], h = a[s][1];
    let w = 0;
    const I = d.children.indexOf(u);
    let _ = !1, v = [];
    f.lastIndex = 0;
    let R = f.exec(u.value);
    for (; R; ) {
      const M = R.index, L = {
        index: R.index,
        input: R.input,
        stack: [...c, u]
      };
      let b = h(...R, L);
      if (typeof b == "string" && (b = b.length > 0 ? { type: "text", value: b } : void 0), b === !1 ? f.lastIndex = M + 1 : (w !== M && v.push({
        type: "text",
        value: u.value.slice(w, M)
      }), Array.isArray(b) ? v.push(...b) : b && v.push(b), w = M + R[0].length, _ = !0), !f.global)
        break;
      R = f.exec(u.value);
    }
    return _ ? (w < u.value.length && v.push({ type: "text", value: u.value.slice(w) }), d.children.splice(I, 1, ...v)) : v = [u], I + v.length;
  }
}
function jm(t) {
  const e = [];
  if (!Array.isArray(t))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const n = !t[0] || Array.isArray(t[0]) ? t : [t];
  let r = -1;
  for (; ++r < n.length; ) {
    const i = n[r];
    e.push([Vm(i[0]), Zm(i[1])]);
  }
  return e;
}
function Vm(t) {
  return typeof t == "string" ? new RegExp($m(t), "g") : t;
}
function Zm(t) {
  return typeof t == "function" ? t : function() {
    return t;
  };
}
function Wm(t) {
  Bm(t, [/\r?\n|\r/g, Gm]);
}
function Gm() {
  return { type: "break" };
}
function yo() {
  return function(t) {
    Wm(t);
  };
}
function qm({ children: t, isStreaming: e }) {
  const [n, r] = Re(!0), [i, a] = Re(!1), [s, o] = Re("");
  zt.useEffect(() => {
    !e && !i ? (a(!0), r(!1)) : e && (a(!1), r(!0));
  }, [e, i]);
  const l = () => {
    e || r(!n);
  }, u = zt.Children.map(t, (c) => {
    if (zt.isValidElement(c)) {
      if (c.type === Fl) {
        const d = c.props;
        return d.title && d.title !== s && o(d.title), zt.cloneElement(
          c,
          {
            onToggle: l,
            isExpanded: n
          }
        );
      }
      if (c.type === zl)
        return zt.cloneElement(
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
function Fl({
  title: t,
  status: e = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const { t: a } = gn(), s = () => /* @__PURE__ */ O(
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
  return /* @__PURE__ */ O(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${o ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: o ? r : void 0,
      style: { cursor: o ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-icon", children: s() }),
        /* @__PURE__ */ O("span", { className: "chat-wrapper__reasoning-title", children: [
          t,
          n && e === "completed" && /* @__PURE__ */ p("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        o && /* @__PURE__ */ p(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ O(
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
function zl({
  children: t,
  isVisible: e = !0,
  title: n = ""
}) {
  return !e || !(n.toLowerCase().includes("thinking") || n.toLowerCase().includes("thought")) ? null : /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-text", children: t }) });
}
function Km({ children: t }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle", children: t });
}
function Ym({
  title: t,
  status: e = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var u, c;
  const { t: a } = gn(), s = () => {
    if (!r || !i) return null;
    const d = i.find((f) => f.name === r);
    return (d == null ? void 0 : d.description) || null;
  };
  let o;
  if (r != null && r.startsWith("lat_")) {
    const d = (u = n == null ? void 0 : n.parameters) == null ? void 0 : u.query, f = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.url;
    o = d || f || a("chat.tools.executing");
  } else
    o = s();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (e) {
      case "processing":
        return /* @__PURE__ */ O("div", { className: "chat-wrapper__tooling-handle-trigger-content chat-wrapper__tooling-handle-trigger-content--processing", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ O(
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
          ) : /* @__PURE__ */ O(
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
          /* @__PURE__ */ O("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-spinner" }),
            /* @__PURE__ */ p("span", { children: a("chat.tools.executing") })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ O("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ O(
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
          ) : /* @__PURE__ */ O(
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
          /* @__PURE__ */ O("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
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
        return /* @__PURE__ */ O("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
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
        return /* @__PURE__ */ O("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ O(
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
          ) : /* @__PURE__ */ O(
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
          /* @__PURE__ */ O("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
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
const Hl = Jr(
  ({
    registry: t,
    componentName: e,
    props: n,
    status: r,
    callId: i,
    source: a = "live",
    isLatest: s = !1
  }) => {
    const o = t == null ? void 0 : t.get(e);
    if (!o)
      return /* @__PURE__ */ p(Ul, { name: e, variant: r === "complete" ? "rehydrated" : "live" });
    const l = o.component;
    return /* @__PURE__ */ p(
      "div",
      {
        className: "chat-wrapper__generative-component",
        "data-component-name": e,
        "data-streaming": r === "streaming" ? "true" : void 0,
        "data-source": a,
        children: /* @__PURE__ */ p(
          pu,
          {
            callId: i,
            status: r,
            source: a,
            isLatest: s,
            children: /* @__PURE__ */ p(l, { ...n })
          }
        )
      }
    );
  }
);
Hl.displayName = "GenerativeComponentRenderer";
const Ul = Jr(
  ({ name: t, variant: e = "live" }) => e === "rehydrated" ? /* @__PURE__ */ O("div", { className: "chat-wrapper__generative-component-unknown", role: "note", children: [
    /* @__PURE__ */ p("strong", { children: "This card is no longer available." }),
    /* @__PURE__ */ p("div", { className: "chat-wrapper__generative-component-unknown-hint", children: "It was rendered in a previous conversation but the component is no longer part of this dashboard." })
  ] }) : /* @__PURE__ */ O("div", { className: "chat-wrapper__generative-component-unknown", role: "alert", children: [
    /* @__PURE__ */ p("strong", { children: "Unknown component:" }),
    " ",
    /* @__PURE__ */ p("code", { children: t }),
    /* @__PURE__ */ O("div", { className: "chat-wrapper__generative-component-unknown-hint", children: [
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
Ul.displayName = "UnknownComponentFallback";
const Xm = ({ message: t }) => {
  const [e, n] = Re(!0);
  return /* @__PURE__ */ O("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ O(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!e),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          t.role === "system" ? /* @__PURE__ */ O("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ O(
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
function $l({
  imageUrl: t,
  isOpen: e,
  onClose: n,
  alt: r = "Image preview"
}) {
  const i = ce((s) => {
    s.key === "Escape" && (s.stopImmediatePropagation(), n());
  }, [n]), a = ce((s) => {
    s.target === s.currentTarget && n();
  }, [n]);
  return Fe(() => {
    const s = document.querySelector(".chat-wrapper__messages"), o = (l) => l.preventDefault();
    return e ? (document.addEventListener("keydown", i, { capture: !0 }), document.body.style.overflow = "hidden", s && (s.style.overflowY = "hidden", s.addEventListener("wheel", o, { passive: !1 }))) : (document.removeEventListener("keydown", i, { capture: !0 }), document.body.style.overflow = "", s && (s.style.overflowY = "", s.removeEventListener("wheel", o))), () => {
      document.removeEventListener("keydown", i, { capture: !0 }), document.body.style.overflow = "", s && (s.style.overflowY = "", s.removeEventListener("wheel", o));
    };
  }, [e, i]), !e || !t ? null : Xl(
    /* @__PURE__ */ O(
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
const Bl = ({ className: t }) => /* @__PURE__ */ O(
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
), jl = ({ onImageClick: t, className: e, style: n, title: r, ...i }) => {
  const [a, s] = Re(!1), o = ge(null);
  return a ? /* @__PURE__ */ O("div", { className: `chat-wrapper__image-unavailable ${e ?? ""}`, children: [
    /* @__PURE__ */ O("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
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
}, Jm = (t) => {
  let e = t.replace(
    new RegExp("(?<!\\]\\()(?<!!.*\\]\\()https:\\/\\/ucarecdn\\.com\\/[^\\s)>]+", "g"),
    (n) => `![image](${n})`
  );
  return e = e.replace(
    new RegExp("(?<!\\]\\()(?<!!\\[.*\\]\\()(?<!\\()(https?:\\/\\/[^\\s)>]+)", "g"),
    (n) => `[${n}](${n})`
  ), e;
}, Qm = (t) => ({
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
    jl,
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
}), Vl = Jr(
  ({ message: t, isLatestUiComponent: e = !1 }) => {
    var oe;
    const {
      getReasoningTitle: n,
      getReasoningStatus: r,
      getReasoningDuration: i,
      getReasoningContentOnly: a,
      getToolingTitle: s,
      getToolingStatus: o,
      clientTools: l,
      generativeRegistry: u,
      currentAssistantMessageIdRef: c,
      onRetryMessage: d
    } = jn(), { t: f } = gn(), [h, w] = Re(!1), [k, I] = Re(!1), [_, v] = Re(null), R = ce(async () => {
      try {
        await navigator.clipboard.writeText(t.content), w(!0), setTimeout(() => w(!1), 2e3);
      } catch (ee) {
        console.error("Failed to copy message:", ee);
      }
    }, [t.content]), M = ce(() => {
      d && d(t.id);
    }, [d, t.id]), L = ce((ee) => {
      v(ee);
    }, []), b = ce(() => {
      v(null);
    }, []), j = () => /* @__PURE__ */ p("div", { className: "chat-wrapper__streaming-placeholder", children: /* @__PURE__ */ p(Bl, {}) }), $ = () => d && /* @__PURE__ */ p(
      "button",
      {
        className: "chat-wrapper__retry-button",
        onClick: M,
        children: f("chat.errors.retry")
      }
    ), H = () => /* @__PURE__ */ O(Yt, { children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ p(
        "button",
        {
          className: `chat-wrapper__copy-button ${k ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: R,
          title: "Copy message",
          children: /* @__PURE__ */ p(qh, {})
        }
      ) }),
      h && /* @__PURE__ */ p("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), te = Ze(() => Qm(L), [L]), de = () => /* @__PURE__ */ p("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ O("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
        mo,
        {
          components: te,
          remarkPlugins: [yo],
          children: Jm(t.content)
        },
        `${t.id}-${t.isStreaming ? "streaming" : "final"}`
      ) }),
      H()
    ] }) }), G = () => /* @__PURE__ */ O("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
        mo,
        {
          remarkPlugins: [yo],
          components: te,
          children: t.content
        },
        `${t.id}-user`
      ) }),
      t.media && t.media.length > 0 && /* @__PURE__ */ p("div", { className: "chat-wrapper__media", children: t.media.map((ee, C) => /* @__PURE__ */ p(
        jl,
        {
          src: ee,
          alt: `Uploaded content ${C + 1}`,
          className: "chat-wrapper__media-image chat-wrapper__media-image--clickable",
          onImageClick: () => L(ee),
          style: {
            cursor: "zoom-in",
            transition: "transform 0.2s, box-shadow 0.2s"
          },
          onMouseEnter: (W) => {
            W.currentTarget.style.transform = "scale(1.02)", W.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
          },
          onMouseLeave: (W) => {
            W.currentTarget.style.transform = "scale(1)", W.currentTarget.style.boxShadow = "";
          },
          title: "Click to view full size"
        },
        C
      )) })
    ] }), N = () => t.role === "assistant" && t.isStreaming && t.content === "" && t.id === c.current ? j() : t.role === "system" ? /* @__PURE__ */ p(Xm, { message: t }) : t.role === "assistant" ? de() : G(), P = () => /* @__PURE__ */ O(qm, { isStreaming: t.isStreaming || !1, children: [
      /* @__PURE__ */ p(
        Fl,
        {
          title: n(t.content, t.isStreaming),
          status: r(t.content, t.isStreaming),
          duration: i(t.content)
        }
      ),
      /* @__PURE__ */ p(zl, { children: a(t.content) })
    ] }), F = () => {
      var ee;
      return /* @__PURE__ */ p(Km, { isStreaming: t.isStreaming || !1, children: /* @__PURE__ */ p(
        Ym,
        {
          title: s(t.content, t.isStreaming),
          status: o(t.content, t.isStreaming),
          toolData: t.toolData,
          toolName: (ee = t.toolData) == null ? void 0 : ee.toolName,
          clientTools: l
        }
      ) });
    }, Z = () => t.uiComponent ? /* @__PURE__ */ p(
      Hl,
      {
        registry: u,
        componentName: t.uiComponent.name,
        props: t.uiComponent.props,
        status: t.uiComponent.status,
        callId: t.uiComponent.callId,
        source: t.uiComponent.source,
        isLatest: e
      }
    ) : null;
    return t.role === "assistant" && !t.isStreaming && (t.content ?? "").trim() === "" && (((oe = t.uiComponents) == null ? void 0 : oe.length) ?? 0) > 0 ? null : /* @__PURE__ */ O(Yt, { children: [
      /* @__PURE__ */ p(
        "div",
        {
          className: `chat-wrapper__message chat-wrapper__message--${t.role === "system" ? "assistant" : t.role === "reasoning" ? "reasoning" : t.role === "tooling" ? "tooling" : t.role === "ui-component" ? "ui-component" : t.role}`,
          onMouseEnter: () => t.role === "assistant" && I(!0),
          onMouseLeave: () => t.role === "assistant" && I(!1),
          children: t.role === "reasoning" ? P() : t.role === "tooling" ? F() : t.role === "ui-component" ? Z() : /* @__PURE__ */ O(Yt, { children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__message-content", children: N() }),
            t.role === "user" && t.hasError && !t.isRetrying && $()
          ] })
        }
      ),
      /* @__PURE__ */ p(
        $l,
        {
          imageUrl: _,
          isOpen: !!_,
          onClose: b,
          alt: "Message image"
        }
      )
    ] });
  }
);
Vl.displayName = "MessageItem";
const e0 = ({ isVisible: t }) => t ? /* @__PURE__ */ p("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ p(Bl, {}) }) }) }) : null, Zl = Cr((t, e) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = jn(), a = Ze(() => {
    var s;
    for (let o = n.length - 1; o >= 0; o--) {
      const l = n[o];
      if (l.role === "user") return null;
      if (l.role === "ui-component" && ((s = l.uiComponent) != null && s.callId))
        return l.uiComponent.callId;
    }
    return null;
  }, [n]);
  return /* @__PURE__ */ O("div", { className: "chat-wrapper__messages", children: [
    n.map((s) => {
      var o;
      return /* @__PURE__ */ p(
        Vl,
        {
          message: s,
          isLatestUiComponent: !!((o = s.uiComponent) != null && o.callId) && s.uiComponent.callId === a
        },
        s.id
      );
    }),
    /* @__PURE__ */ p(e0, { isVisible: r && !i }),
    /* @__PURE__ */ p("div", { ref: e })
  ] });
});
Zl.displayName = "MessagesList";
const Ht = (...t) => t.filter(Boolean).join(" "), t0 = () => /* @__PURE__ */ O(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ O("g", { filter: "url(#filter0_dd_121_23927)", children: [
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
), n0 = () => /* @__PURE__ */ O(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ O("g", { filter: "url(#filter0_dd_stop_121_23927)", children: [
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
      /* @__PURE__ */ p("defs", { children: /* @__PURE__ */ O(
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
), r0 = ({ className: t, ...e }) => /* @__PURE__ */ p("form", { className: Ht("chat-wrapper__prompt-input", t), ...e }), Wl = Cr(
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
        className: Ht("chat-wrapper__prompt-textarea", e),
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
Wl.displayName = "PromptInputTextarea";
const i0 = ({
  className: t,
  ...e
}) => /* @__PURE__ */ p("div", { className: Ht("chat-wrapper__prompt-toolbar", t), ...e }), a0 = ({
  className: t,
  ...e
}) => /* @__PURE__ */ p("div", { className: Ht("chat-wrapper__prompt-tools", t), ...e }), s0 = ({
  variant: t = "ghost",
  size: e = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = e === "default" && (typeof r == "string" || zt.Children.count(r) === 1) ? "icon" : e;
  return /* @__PURE__ */ p(
    "button",
    {
      className: Ht(
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
}, o0 = ({
  className: t,
  variant: e = "default",
  size: n = "icon",
  status: r = Ue.IDLE,
  children: i,
  disabled: a,
  ...s
}) => {
  const o = Mi(r);
  let l = o ? /* @__PURE__ */ p(n0, {}) : /* @__PURE__ */ p(t0, {});
  return /* @__PURE__ */ p(
    "button",
    {
      className: Ht(
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
}, L0 = ({
  className: t,
  children: e,
  ...n
}) => /* @__PURE__ */ p("select", { className: Ht("chat-wrapper__prompt-select", t), ...n, children: e }), P0 = ({
  className: t,
  children: e,
  ...n
}) => /* @__PURE__ */ p(
  "button",
  {
    className: Ht("chat-wrapper__prompt-select-trigger", t),
    type: "button",
    ...n,
    children: e
  }
), D0 = ({
  className: t,
  ...e
}) => /* @__PURE__ */ p(
  "div",
  {
    className: Ht("chat-wrapper__prompt-select-content", t),
    ...e
  }
), F0 = ({
  className: t,
  value: e,
  ...n
}) => /* @__PURE__ */ p(
  "div",
  {
    className: Ht("chat-wrapper__prompt-select-item", t),
    "data-value": e,
    ...n
  }
), z0 = ({
  className: t,
  placeholder: e,
  ...n
}) => /* @__PURE__ */ p(
  "span",
  {
    className: Ht("chat-wrapper__prompt-select-value", t),
    ...n,
    children: e
  }
), l0 = ({
  placeholderTexts: t,
  shouldAnimate: e,
  className: n = ""
}) => {
  const [r, i] = Re(0), [a, s] = Re(!1), [o, l] = Re(0);
  return Fe(() => {
    if (!e || t.length <= 1) return;
    const u = setInterval(() => {
      s(!0), setTimeout(() => {
        i((c) => (c + 1) % t.length), l((c) => c + 1), s(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(u);
  }, [e, t.length]), Fe(() => {
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
}, c0 = Cr((t, e) => {
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
    onFileUpload: f,
    onStopGeneration: h
  } = jn(), { t: w } = gn(), k = r || i, I = c.length > 0, [_, v] = Re(""), [R, M] = Re([]), [L, b] = Re([]), [j, $] = Re(null), [H, te] = Re(null), [de, G] = Re(!1), N = ge(null), P = ce((V) => {
    te(V), G(!0);
  }, []), F = ce((V) => new Promise((y, Q) => {
    const K = new FileReader();
    K.onload = () => y(K.result), K.onerror = Q, K.readAsDataURL(V);
  }), []), Z = n && n.length > 0 ? n : [w("chat.input.placeholder")], ue = _.length === 0 && !I && Z.length > 1;
  Co(
    e,
    () => ({
      focus: () => {
        var V;
        (V = N.current) == null || V.focus();
      },
      setText: (V) => {
        v(V), setTimeout(() => {
          if (N.current) {
            N.current.focus();
            const y = V.length;
            N.current.setSelectionRange(y, y);
          }
        }, 0);
      },
      textareaRef: N
    }),
    []
  );
  const oe = ce(
    (V) => {
      V.preventDefault();
      const Q = new FormData(V.currentTarget).get("message");
      if (Q != null && Q.trim()) {
        const K = da(Q.trim(), !1);
        if (!K.trim())
          return;
        d(K, R), v(""), M([]);
      }
    },
    [d, R]
  ), ee = ce(
    (V) => {
      const Q = V.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      v(Q), j && Q.trim() && $(null);
    },
    [j]
  ), C = ce(
    async (V) => {
      var K;
      const Q = Array.from(((K = V.clipboardData) == null ? void 0 : K.items) || []).filter((fe) => fe.type.startsWith("image/"));
      if (Q.length > 0) {
        V.preventDefault(), $(null);
        try {
          const fe = await Promise.all(
            Q.map((he) => {
              const le = he.getAsFile();
              return le ? new File(
                [le],
                `clipboard-image-${Date.now()}.${le.type.split("/")[1]}`,
                {
                  type: le.type
                }
              ) : null;
            })
          ).then((he) => he.filter(Boolean));
          if (fe.length > 0) {
            const he = fe.filter((le) => {
              const Te = (o == null ? void 0 : o.maxFileSize) ?? 15728640;
              return le.size > Te ? ($(
                w("chat.fileUpload.sizeLimitExceeded", {
                  maxSize: Math.round(Te / 1048576)
                })
              ), !1) : ((o == null ? void 0 : o.allowedTypes) ?? [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp"
              ]).includes(le.type) ? !0 : ($(w("chat.fileUpload.typeNotAllowed")), !1);
            });
            if (he.length > 0) {
              const le = (o == null ? void 0 : o.maxFiles) ?? 5;
              if (R.length + L.length + he.length > le) {
                $(
                  w("chat.fileUpload.maxFilesExceeded", { maxFiles: le })
                );
                return;
              }
              const Ie = he.map(async (me) => ({
                file: me,
                preview: await F(me),
                isUploading: !0,
                progress: 0
              })), _e = await Promise.all(Ie);
              b((me) => [...me, ..._e]);
              try {
                const me = await f(he);
                b(
                  (De) => De.filter((je) => !he.includes(je.file))
                ), M((De) => [...De, ...me]), $(null);
              } catch {
                b(
                  (De) => De.filter((je) => !he.includes(je.file))
                ), $(w("chat.errors.connection"));
              }
            }
          }
        } catch (fe) {
          $(
            fe instanceof Error ? fe.message : w("chat.errors.unexpected")
          ), b([]);
        }
      }
    },
    [
      f,
      o,
      R,
      L,
      F,
      w
    ]
  ), W = ce(async () => {
    const V = document.createElement("input");
    V.type = "file", V.accept = "image/*", V.multiple = !0, V.onchange = async (y) => {
      const Q = y.target.files;
      if (Q)
        try {
          $(null);
          const K = Array.from(Q).filter((fe) => {
            const he = gd(fe.name);
            fe.name;
            const le = (o == null ? void 0 : o.maxFileSize) ?? 15 * 1024 * 1024;
            return fe.size > le ? ($(
              w("chat.fileUpload.sizeLimitExceeded", {
                maxSize: Math.round(le / (1024 * 1024))
              })
            ), !1) : ((o == null ? void 0 : o.allowedTypes) ?? [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ]).includes(fe.type) ? !0 : ($(w("chat.fileUpload.typeNotAllowed")), !1);
          });
          if (K.length > 0) {
            const fe = (o == null ? void 0 : o.maxFiles) ?? 5;
            if (R.length + L.length + K.length > fe) {
              $(
                w("chat.fileUpload.maxFilesExceeded", { maxFiles: fe })
              );
              return;
            }
            const le = K.map(async (Ie) => ({
              file: Ie,
              preview: await F(Ie),
              isUploading: !0,
              progress: 0
            })), Te = await Promise.all(le);
            b((Ie) => [...Ie, ...Te]);
            try {
              const Ie = await f(K);
              b(
                (_e) => _e.filter((me) => !K.includes(me.file))
              ), M((_e) => [..._e, ...Ie]), $(null);
            } catch {
              b(
                (_e) => _e.filter((me) => !K.includes(me.file))
              ), $(w("chat.errors.connection"));
            }
          }
        } catch (K) {
          $(
            K instanceof Error ? K.message : w("chat.errors.unexpected")
          ), b([]);
        }
    }, V.click();
  }, [
    f,
    o,
    R,
    L,
    F,
    w
  ]);
  return /* @__PURE__ */ O(
    r0,
    {
      onSubmit: oe,
      className: `${k ? "chat-wrapper__prompt-input--disabled" : ""} ${R.length > 0 || L.length > 0 || j ? "chat-wrapper__prompt-input--with-media" : ""}`,
      children: [
        /* @__PURE__ */ p(
          Wl,
          {
            ref: N,
            name: "message",
            value: _,
            onChange: ee,
            onPaste: C,
            placeholder: "",
            disabled: k
          }
        ),
        !_.trim() && /* @__PURE__ */ p(
          l0,
          {
            placeholderTexts: Z,
            shouldAnimate: ue
          }
        ),
        j && /* @__PURE__ */ O("div", { className: "chat-wrapper__upload-error", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__upload-error-icon", children: /* @__PURE__ */ p("span", { className: "chat-wrapper__upload-error-icon-text", children: "!" }) }),
          /* @__PURE__ */ p("span", { className: "chat-wrapper__upload-error-message", children: j }),
          /* @__PURE__ */ p(
            "button",
            {
              className: "chat-wrapper__upload-error-dismiss",
              onClick: () => $(null),
              title: "Dismiss",
              children: "×"
            }
          )
        ] }),
        (R.length > 0 || L.length > 0) && /* @__PURE__ */ O("div", { className: "chat-wrapper__media-preview-container", children: [
          L.map((V, y) => /* @__PURE__ */ O(
            "div",
            {
              className: "chat-wrapper__media-item-wrapper",
              children: [
                /* @__PURE__ */ O("div", { className: "chat-wrapper__uploading-thumbnail", children: [
                  /* @__PURE__ */ p(
                    "img",
                    {
                      src: V.preview,
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
                      b(
                        (Q) => Q.filter((K, fe) => fe !== y)
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
          R.map((V, y) => {
            const Q = V.startsWith("data:image/"), K = V.startsWith("http://") || V.startsWith("https://"), fe = Q || K;
            return /* @__PURE__ */ O(
              "div",
              {
                className: "chat-wrapper__media-item-wrapper",
                children: [
                  fe ? /* @__PURE__ */ O(
                    "div",
                    {
                      className: "chat-wrapper__media-thumbnail",
                      onClick: () => P(V),
                      title: "Click to view full image",
                      children: [
                        /* @__PURE__ */ p(
                          "img",
                          {
                            src: V,
                            alt: `Attachment ${y + 1}`,
                            className: "chat-wrapper__media-thumbnail-image"
                          }
                        ),
                        /* @__PURE__ */ p("div", { className: "chat-wrapper__media-thumbnail-overlay" }),
                        /* @__PURE__ */ p("div", { className: "chat-wrapper__media-thumbnail-zoom-icon" })
                      ]
                    }
                  ) : /* @__PURE__ */ O("div", { className: "chat-wrapper__file-preview", children: [
                    /* @__PURE__ */ p("div", { className: "chat-wrapper__file-icon-container", children: /* @__PURE__ */ O(
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
                    /* @__PURE__ */ O("div", { className: "chat-wrapper__file-info", children: [
                      /* @__PURE__ */ p("div", { className: "chat-wrapper__file-name", children: (() => {
                        const he = V.match(/name=([^;]+)/);
                        return he ? decodeURIComponent(he[1]) : "document.pdf";
                      })() }),
                      /* @__PURE__ */ p("div", { className: "chat-wrapper__file-type", children: (() => {
                        const he = V.match(/data:([^;]+)/);
                        if (he) {
                          const le = he[1];
                          switch (le) {
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
                              const Te = le.split("/")[1];
                              return Te ? Te.toUpperCase().substring(0, 4) : "FILE";
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
                          (he) => he.filter((le, Te) => Te !== y)
                        ), j && $(null);
                      },
                      className: `chat-wrapper__media-remove-button ${fe ? "" : "chat-wrapper__media-remove-button--file"}`,
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
        /* @__PURE__ */ O(i0, { children: [
          /* @__PURE__ */ O(a0, { children: [
            s && /* @__PURE__ */ p("div", { className: "chat-wrapper__file-upload-container", children: /* @__PURE__ */ p(
              s0,
              {
                variant: "ghost",
                size: "icon",
                onClick: W,
                title: L.length > 0 ? `Uploading ${L.length} file(s)...` : R.length > 0 ? `${R.length}/${(o == null ? void 0 : o.maxFiles) ?? 5} image(s) attached` : `Attach images (max ${(o == null ? void 0 : o.maxFiles) ?? 5} files, ${Math.round(
                  ((o == null ? void 0 : o.maxFileSize) ?? 15 * 1024 * 1024) / (1024 * 1024)
                )}MB each)`,
                disabled: k || L.length > 0,
                children: /* @__PURE__ */ O(
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
            l && /* @__PURE__ */ O("div", { className: "chat-wrapper__restaurant-chip", children: [
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
            o0,
            {
              status: a,
              disabled: Mi(a) ? !1 : !_.trim() || k || L.length > 0,
              onClick: Mi(a) && h ? () => {
                h();
              } : void 0
            }
          )
        ] }),
        /* @__PURE__ */ p(
          $l,
          {
            imageUrl: H,
            isOpen: de,
            onClose: () => {
              G(!1), te(null);
            },
            alt: "Image preview"
          }
        )
      ]
    }
  );
}), u0 = () => {
  const { suggestedPrompts: t, chatInputRef: e, enableSuggestedPromptsAnimation: n = !0 } = jn(), r = ge(!1), i = ge(null), a = ge(null);
  if (Fe(() => () => {
    i.current && cancelAnimationFrame(i.current), a.current && clearTimeout(a.current);
  }, []), !t || t.length === 0)
    return null;
  const s = ce((h) => {
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
    const w = (I = e.current.textareaRef) == null ? void 0 : I.current;
    if (!w) {
      console.warn("Textarea ref not available, using fallback"), e.current.setText(h.description);
      return;
    }
    e.current.setText(""), w.focus(), r.current = !0;
    let k = !1;
    return h.description.length > 0 && e.current.setText(h.description[0]), a.current = setTimeout(() => {
      let _ = 1;
      const v = 10, R = () => {
        if (k || !e.current) {
          r.current = !1, a.current = null;
          return;
        }
        if (_ < h.description.length) {
          const M = h.description.substring(0, _ + 1);
          w.value = M;
          const L = new Event("input", { bubbles: !0 });
          w.dispatchEvent(L), _++, a.current = setTimeout(R, v);
        } else
          r.current = !1, a.current = null, e.current && e.current.setText(h.description);
      };
      R();
    }, 10), () => {
      k = !0, a.current && (clearTimeout(a.current), a.current = null), r.current = !1;
    };
  }, [e, n]), o = ge(null), l = ge({ isDown: !1, startX: 0, scrollLeft: 0, hasDragged: !1 }), u = ce((h) => {
    const w = o.current;
    w && (l.current = { isDown: !0, startX: h.pageX - w.offsetLeft, scrollLeft: w.scrollLeft, hasDragged: !1 }, w.style.cursor = "grabbing", w.style.userSelect = "none");
  }, []), c = ce((h) => {
    const w = o.current;
    if (!w || !l.current.isDown) return;
    const I = h.pageX - w.offsetLeft - l.current.startX;
    Math.abs(I) > 4 && (l.current.hasDragged = !0), w.scrollLeft = l.current.scrollLeft - I;
  }, []), d = ce(() => {
    const h = o.current;
    h && (l.current.isDown = !1, h.style.cursor = "grab", h.style.userSelect = "");
  }, []), f = ce((h) => {
    l.current.hasDragged && (h.stopPropagation(), l.current.hasDragged = !1);
  }, []);
  return /* @__PURE__ */ O("div", { className: "chat-wrapper__suggested-prompts", children: [
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
        onClickCapture: f,
        style: { cursor: "grab" },
        children: t.map((h, w) => /* @__PURE__ */ p(
          "button",
          {
            className: "chat-wrapper__suggested-prompt-card",
            onClick: () => s(h),
            title: h.description,
            children: /* @__PURE__ */ O("div", { className: "chat-wrapper__suggested-prompt-content", children: [
              /* @__PURE__ */ p("h4", { className: "chat-wrapper__suggested-prompt-title", children: h.title }),
              /* @__PURE__ */ p("p", { className: "chat-wrapper__suggested-prompt-description", children: h.description })
            ] })
          },
          w
        ))
      }
    )
  ] });
};
function d0({ size: t = 16, variant: e = "dots" }) {
  return e === "dots" ? /* @__PURE__ */ O("div", { className: "chat-wrapper__loader-dots", style: { fontSize: t }, children: [
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
const h0 = ({
  size: t = 20,
  fullHeight: e = !1
}) => /* @__PURE__ */ p(
  "div",
  {
    className: `chat-wrapper__inline-loader ${e ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ p("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ p(d0, { size: t, variant: "dots" }) })
  }
), p0 = () => /* @__PURE__ */ O("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ O("g", { clipPath: "url(#clip0_1219_24100)", children: [
    /* @__PURE__ */ p("path", { d: "M19 9L20.25 6.25L23 5L20.25 3.75L19 1L17.75 3.75L15 5L17.75 6.25L19 9Z", fill: "#637381" }),
    /* @__PURE__ */ p("path", { d: "M19 15L17.75 17.75L15 19L17.75 20.25L19 23L20.25 20.25L23 19L20.25 17.75L19 15Z", fill: "#637381" }),
    /* @__PURE__ */ p("path", { d: "M11.5 9.5L9 4L6.5 9.5L1 12L6.5 14.5L9 20L11.5 14.5L17 12L11.5 9.5ZM9.99 12.99L9 15.17L8.01 12.99L5.83 12L8.01 11.01L9 8.83L9.99 11.01L12.17 12L9.99 12.99Z", fill: "#637381" })
  ] }),
  /* @__PURE__ */ p("defs", { children: /* @__PURE__ */ p("clipPath", { id: "clip0_1219_24100", children: /* @__PURE__ */ p("rect", { width: "24", height: "24", fill: "white" }) }) })
] }), wo = ({
  headerName: t,
  headerDescription: e,
  showIcon: n = !1
}) => /* @__PURE__ */ O("div", { className: "chat-wrapper__main-header", children: [
  n && /* @__PURE__ */ p("div", { className: "chat-wrapper__main-header-icon", children: /* @__PURE__ */ p(p0, {}) }),
  /* @__PURE__ */ p("h1", { className: "chat-wrapper__main-title", children: t }),
  e && /* @__PURE__ */ p("p", { className: "chat-wrapper__description", children: e })
] }), f0 = () => /* @__PURE__ */ O("div", { className: "chat-wrapper__skeleton", children: [
  /* @__PURE__ */ O("div", { className: "chat-wrapper__skeleton-header", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-title" }),
    /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-description" })
  ] }),
  /* @__PURE__ */ O("div", { className: "chat-wrapper__skeleton-content", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-input", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-input-field" }) }),
    /* @__PURE__ */ O("div", { className: "chat-wrapper__skeleton-prompts", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompts-title" }),
      /* @__PURE__ */ O("div", { className: "chat-wrapper__skeleton-prompts-grid", children: [
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" })
      ] })
    ] })
  ] })
] }), g0 = ({
  errorType: t = "unknown",
  errorMessage: e,
  retryCount: n = 0,
  onRetry: r,
  footer: i
}) => {
  const { t: a } = gn(), s = () => {
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
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__connection-error-overlay", children: /* @__PURE__ */ O("div", { className: "chat-wrapper__connection-error-card", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__connection-error-icon", children: /* @__PURE__ */ O(
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
    n > 0 && /* @__PURE__ */ O("p", { className: "chat-wrapper__connection-error-retry-count", children: [
      "Retry attempt: ",
      n
    ] }),
    r && /* @__PURE__ */ O(
      "button",
      {
        className: "chat-wrapper__connection-error-button",
        onClick: r,
        children: [
          /* @__PURE__ */ O(
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
}, m0 = () => {
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
    isInitialConnection: f,
    conversationError: h,
    onRetryConnection: w
  } = jn(), k = e || t.length === 0 && (f || d === Je.CONNECTING), I = t.length === 0 && !e && d === Je.DISCONNECTED && !f;
  if (k || I)
    return /* @__PURE__ */ O("div", { style: { position: "relative", height: "100%" }, children: [
      /* @__PURE__ */ p(f0, {}),
      I && /* @__PURE__ */ p(
        g0,
        {
          errorType: c ? "network" : "server",
          errorMessage: h || void 0,
          onRetry: w,
          footer: o
        }
      )
    ] });
  const _ = Gt.state.shouldShowMainHeader(
    t.length,
    n,
    e
  ), v = Gt.state.shouldShowSuggestedPrompts(
    t.length,
    n,
    e,
    a,
    s
  ), R = Gt.state.getContentAreaClass(
    t.length,
    n,
    e,
    v
  ), M = R.includes("compact");
  return /* @__PURE__ */ O("div", { className: `chat-wrapper__scroll-container${v ? " chat-wrapper__scroll-container--scrollable" : ""}`, children: [
    _ && !M && /* @__PURE__ */ p("div", { style: c ? { paddingTop: "48px" } : void 0, children: /* @__PURE__ */ p(
      wo,
      {
        headerName: r,
        headerDescription: i,
        showIcon: !1
      }
    ) }),
    /* @__PURE__ */ O(
      "div",
      {
        className: R,
        style: c && t.length > 0 ? { paddingTop: "72px" } : void 0,
        children: [
          _ && M && /* @__PURE__ */ p("div", { style: {
            flex: "1 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: c ? "48px" : void 0
          }, children: /* @__PURE__ */ p(
            wo,
            {
              headerName: r,
              headerDescription: i,
              showIcon: !0
            }
          ) }),
          !M && (e && t.length === 0 ? /* @__PURE__ */ p("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ p(h0, { fullHeight: !0 }) }) : /* @__PURE__ */ p(Zl, { ref: l })),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ p(c0, { ref: u }) })
        ]
      }
    ),
    v && /* @__PURE__ */ p(u0, {}),
    v && o && /* @__PURE__ */ p("div", { children: o })
  ] });
};
function y0({
  isVisible: t,
  isReconnecting: e = !1
}) {
  const { t: n } = gn();
  return t ? /* @__PURE__ */ p("div", { className: "network-status-banner", children: /* @__PURE__ */ p("div", { className: "network-status-banner__content", children: e ? /* @__PURE__ */ O(Yt, { children: [
    /* @__PURE__ */ p("div", { className: "network-status-banner__spinner" }),
    /* @__PURE__ */ p("span", { children: n("chat.connection.reconnecting") })
  ] }) : /* @__PURE__ */ O(Yt, { children: [
    /* @__PURE__ */ p("div", { className: "network-status-banner__icon", children: /* @__PURE__ */ p("span", { className: "network-status-banner__icon-text", children: "!" }) }),
    /* @__PURE__ */ p("span", { className: "network-status-banner__message", children: n("chat.errors.connection") })
  ] }) }) }) : null;
}
const Gl = Cr(
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
    var Jn, It;
    const { token: c, entityId: d, entityType: f } = t;
    Gt.validation.validateAuthProps({
      userMpAuthToken: c,
      chatServerUrl: e,
      chatServerKey: n
    });
    const h = Ze(() => Gt.url.convertWebSocketToHttp(e), [e]), w = Ze(
      () => {
        var A, Ae;
        return new zh({
          apiUrl: h,
          userMpAuthToken: c,
          chatServerKey: n,
          maxFileSize: (A = a.fileUploadConfig) == null ? void 0 : A.maxFileSize,
          allowedTypes: (Ae = a.fileUploadConfig) == null ? void 0 : Ae.allowedTypes
        });
      },
      [h, c, n, a.fileUploadConfig]
    ), k = Ze(() => s && s.length > 0 ? s.map(({ execute: A, ...Ae }) => Ae) : [], [s]), I = Ze(
      () => Iu(o),
      [o]
    ), _ = Ze(
      () => new du(I),
      [I]
    ), v = Ze(
      () => _.getSchemas(),
      [_]
    ), R = Mh(), { isOnline: M, wasOffline: L } = Fh(), b = ge(!0), j = ye((A) => A.isModalOpen), $ = ye((A) => A.isCollapsed), H = ye((A) => A.currentMode), te = ye((A) => A.openModal), de = ye((A) => A.closeModal), G = ye((A) => A.toggleCollapse), N = ye((A) => A.toggleFullscreen), P = ye((A) => A.setCurrentMode), F = ye((A) => A.chatStatus), Z = ye((A) => A.setChatStatus), ue = ye((A) => A.streamingStatus), oe = ye((A) => A.setStreamingStatus), ee = ye(
      (A) => A.isLoadingConversation
    ), C = ye(
      (A) => A.setIsLoadingConversation
    ), W = ye((A) => A.conversationError), V = ye(
      (A) => A.setConversationError
    ), y = ye((A) => A.setCurrentThreadId), Q = ye((A) => A.providerResId), K = ye((A) => A.setProviderResId), fe = ye((A) => A.isStreaming), he = ye((A) => A.setIsStreaming), le = ye((A) => A.isThinking), Te = ye((A) => A.setIsThinking), Ie = ye((A) => A.streamingContent), _e = ye(
      (A) => A.setStreamingContent
    ), me = ye((A) => A.isHandlingTool), De = ye((A) => A.setIsHandlingTool);
    Fe(() => {
      a.mode && P(a.mode);
    }, [a.mode, P]), Fe(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const A = (Ae) => {
        Ae.key === "Escape" && H === "modal" && j && de();
      };
      if (H === "modal" && j)
        return document.addEventListener("keydown", A), () => document.removeEventListener("keydown", A);
    }, [H, j, de]);
    const {
      messages: je,
      setMessages: Ne,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: vt,
      getReasoningStatus: Qt,
      getReasoningDuration: Lt,
      getReasoningContentOnly: Ut,
      getReasoningTitle: $t,
      getToolingTitle: yn,
      getToolingStatus: wn,
      handleSetMessage: Wn,
      handleReasoningUpdate: Cn,
      handleChatFinished: Bt,
      handleChatError: T,
      stopGeneration: E,
      clearResponseError: X
    } = R, Ce = ge(null), be = ge(null), Ge = ge(!1), Tt = ge(null), at = ce(
      (A) => {
        A.status !== "streaming" && (X(), Ne((Ae) => {
          const qe = Ae.findIndex(
            (He) => {
              var q;
              return ((q = He.uiComponent) == null ? void 0 : q.callId) === A.callId;
            }
          ), We = {
            id: qe >= 0 ? Ae[qe].id : A.callId,
            role: "ui-component",
            content: "",
            timestamp: qe >= 0 ? Ae[qe].timestamp : /* @__PURE__ */ new Date(),
            uiComponent: {
              name: A.componentName,
              props: A.props,
              callId: A.callId,
              status: A.status
            }
          };
          if (qe >= 0) {
            const He = [...Ae];
            return He[qe] = We, He;
          }
          return [...Ae, We];
        }));
      },
      [Ne, X]
    ), Et = ce(
      (A) => {
        K(A.providerResId), y(A.threadId);
      },
      [K, y]
    ), nt = ce(
      (A) => {
        var Ae, qe;
        switch (A.type) {
          case Nt.CHAT_COMPLETED:
            (Ae = A.data) != null && Ae.conversationId && K(A.data.conversationId), Bt(), Z(Ue.IDLE), oe(_t.IDLE), setTimeout(() => {
              var We;
              (We = be.current) == null || We.focus();
            }, 0);
            break;
          case Nt.CHAT_ERROR:
            (qe = A.data) != null && qe.error && T(A.data.error);
            break;
          case Nt.CONNECTION_LOST:
            break;
          case Nt.CONNECTION_RESTORED:
            break;
          case Nt.RECONNECTING:
            break;
        }
      },
      [
        Bt,
        T,
        K,
        y
      ]
    ), {
      chatClient: Se,
      connectionState: et,
      // reconnectAttempts: reconnectAttempt,
      isInitialConnection: st,
      connectChatClient: an
    } = Zu({
      // Authentication and server properties
      userMpAuthToken: c,
      chatServerUrl: e,
      chatServerKey: n,
      // Entity configuration
      entityId: d,
      entityType: f,
      // Tools configuration
      tools: s,
      // Generative-UI components
      componentSchemas: v,
      // Other properties
      contextHelpers: l,
      onSetMessage: Wn,
      onSystemEvent: nt,
      onReasoningUpdate: Cn,
      onUIComponent: at,
      onThreadCreated: Et,
      onMessagesPersisted: a.onMessagesPersisted,
      onError: a.onError
    });
    Fe(() => {
      Tt.current = Se;
    }, [Se]), Dh({
      metadata: r,
      chatClient: Se,
      currentProviderResId: Q,
      isLoadingConversation: ee,
      messages: je,
      entityId: d,
      entityType: f
    }), Fe(() => {
      L && M && b.current ? an().catch((A) => {
        const Ae = $n(
          A,
          "NetworkReconnection"
        );
        b.current = Ae.isRetryable, Ae.isRetryable || console.warn(
          `[ChatWrapper] Network reconnection failed with non-retryable error: ${Ae.reason}`
        );
      }) : L && M && !b.current && console.warn(
        "[ChatWrapper] Network restored but last error was non-retryable (CORS/auth), skipping reconnection"
      );
    }, [M, L, an]);
    const xn = ce(() => {
      E(), Z(Ue.IDLE), oe(_t.IDLE), Se && Q && Se.stopRun(Q);
    }, [
      E,
      Z,
      oe,
      Se,
      Q
    ]);
    Co(
      u,
      () => ({
        updateMetadata: (A) => {
          Se && Q && Se.updateMetadata(Q, A).catch((Ae) => {
          });
        }
      }),
      [Se, Q]
    );
    const sn = Ze(
      () => Se ? new Hh(Se, {
        onError: a.onError
      }) : null,
      [Se, a.onError]
    ), {
      resetConversationLoader: ii
      /*, reloadConversation*/
    } = Ph({
      entityId: d,
      entityType: f,
      httpApiUrl: h,
      userMpAuthToken: c,
      chatServerKey: n,
      messages: je,
      setMessages: Ne,
      setIsLoadingConversation: C,
      setConversationError: V,
      setCurrentThreadId: y,
      setProviderResId: K,
      metadata: r,
      isConnected: et === Je.CONNECTED,
      // Only load after connection established
      onConversationInitialized: a.onConversationInitialized ? () => {
        var A;
        Ge.current = !0, (A = a.onConversationInitialized) == null || A.call(a);
      } : void 0
    }), Rt = ge(null), Rn = ce(() => {
      Rt.current && cancelAnimationFrame(Rt.current), Rt.current = requestAnimationFrame(() => {
        var A;
        (A = Ce.current) == null || A.scrollIntoView({ behavior: "smooth" }), Rt.current = null;
      });
    }, []);
    Fe(() => {
      Rn();
    }, [je, Rn]), Fe(() => {
      Ie && Rn();
    }, [Ie, Rn]), Fe(() => {
      a.onStreamingStatusChange && a.onStreamingStatusChange(ue);
    }, [ue, a]), Fe(() => () => {
      Rt.current && cancelAnimationFrame(Rt.current);
    }, []), Fe(() => () => {
      Ne([]), he(!1), Te(!1), _e(""), De(!1), Z(Ue.IDLE), oe(_t.IDLE), C(!1), V(null), y(null), K(null);
    }, [
      Ne,
      he,
      Te,
      _e,
      De,
      Z,
      oe,
      C,
      V,
      y,
      K
    ]);
    const Gn = ce(
      async (A, Ae) => {
        if (!A.trim() || fe || !sn || !Se)
          return;
        he(!0), Te(!0), Z(Ue.SUBMITTED), oe(_t.STARTING);
        const qe = sn.createUserMessage(
          A,
          Ae
        );
        if (Ne((He) => [...He, qe]), a.onConversationInitialized && !Ge.current && (Ge.current = !0, a.onConversationInitialized()), !navigator.onLine) {
          Te(!1), Z(Ue.ERROR), Ne(
            (He) => He.map(
              (q) => q.id === qe.id ? {
                ...q,
                hasError: !0,
                isRetrying: !1,
                errorMessage: "No internet connection. Please check your network and try again."
              } : q
            )
          ), he(!1), Z(Ue.IDLE), oe(_t.IDLE);
          return;
        }
        try {
          const He = new Promise((x, D) => {
            setTimeout(() => D(new Error("Message send timeout - connection may be lost")), 5e3);
          });
          await Promise.race([
            Se.onTriggerMessage({
              message: qe.content,
              media: Ae,
              providerResId: Q || void 0,
              mcpHeaders: i
            }),
            He
          ]), Z(Ue.STREAMING);
          const q = setTimeout(() => {
            Te(!1), Z(Ue.ERROR), Ne(
              (x) => x.map(
                (D) => D.id === qe.id ? {
                  ...D,
                  hasError: !0,
                  isRetrying: !1,
                  errorMessage: "No response received. Connection may be lost."
                } : D
              )
            ), he(!1), Z(Ue.IDLE), oe(_t.IDLE);
          }, 12e4);
          window.responseTimeoutId = q;
        } catch (He) {
          Te(!1), Z(Ue.ERROR), Ne(
            (q) => q.map(
              (x) => x.id === qe.id ? {
                ...x,
                hasError: !0,
                isRetrying: !1,
                // Explicitly ensure not in retrying state
                errorMessage: et !== Je.CONNECTED ? "Connection lost. Message not sent." : He instanceof Error ? He.message : "Failed to send message. Please try again."
              } : x
            )
          ), he(!1), Z(Ue.IDLE), oe(_t.IDLE);
        }
      },
      [
        sn,
        Se,
        fe,
        et,
        Ne,
        he,
        Te,
        Z,
        oe,
        Q
      ]
    ), Ke = ce(
      async (A) => await w.uploadFiles(A),
      [w]
    ), on = Ze(
      () => Gt.css.getContainerClasses(
        H,
        a.position,
        a.theme,
        $,
        a.constrainedHeight
      ),
      [
        H,
        a.position,
        a.theme,
        $,
        a.constrainedHeight
      ]
    ), ai = ce(() => {
      H === "modal" ? te() : G();
    }, [H, te, G]), qn = ce(
      (A) => {
        be.current && be.current.setText(A.description);
      },
      []
    ), In = Ze(
      () => ({
        messages: je,
        isStreaming: fe,
        isThinking: le,
        isHandlingTool: me
      }),
      [je, fe, le, me]
    ), Kn = Ze(
      () => ({
        isLoadingConversation: ee,
        chatStatus: F,
        conversationError: W,
        isOffline: !M,
        connectionState: et,
        isInitialConnection: st
      }),
      [
        ee,
        F,
        W,
        M,
        et,
        st
      ]
    ), Yn = Ze(
      () => {
        var A, Ae, qe, We;
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
          generativeRegistry: _,
          fileUploadEnabled: (A = a.features) == null ? void 0 : A.fileUpload,
          fileUploadConfig: {
            maxFiles: ((Ae = a.fileUploadConfig) == null ? void 0 : Ae.maxFiles) ?? 5,
            maxFileSize: ((qe = a.fileUploadConfig) == null ? void 0 : qe.maxFileSize) ?? 15 * 1024 * 1024,
            // 15MB default
            allowedTypes: ((We = a.fileUploadConfig) == null ? void 0 : We.allowedTypes) ?? [
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
        (Jn = a.features) == null ? void 0 : Jn.fileUpload,
        a.fileUploadConfig,
        k,
        _
      ]
    ), _r = Ze(
      () => ({
        getReasoningTitle: $t,
        getReasoningStatus: Qt,
        getReasoningDuration: Lt,
        getReasoningContentOnly: Ut,
        getToolingTitle: yn,
        getToolingStatus: wn
      }),
      [
        $t,
        Qt,
        Lt,
        Ut,
        yn,
        wn
      ]
    ), xt = ce(
      async (A) => {
        const Ae = je.find((We) => We.id === A);
        if (!Ae)
          return;
        if (he(!0), Te(!0), Z(Ue.SUBMITTED), oe(_t.STARTING), Ne((We) => We.map(
          (He) => He.id === A ? {
            ...He,
            hasError: !1,
            isRetrying: !0,
            errorMessage: void 0
          } : He
        )), !navigator.onLine) {
          Te(!1), he(!1), Z(Ue.ERROR), Ne(
            (We) => We.map(
              (He) => He.id === A ? {
                ...He,
                isRetrying: !1,
                hasError: !0,
                errorMessage: "Still no internet connection. Please check your network and try again."
              } : He
            )
          ), Z(Ue.IDLE), oe(_t.IDLE);
          return;
        }
        try {
          et !== Je.CONNECTED && await an(), await (Se == null ? void 0 : Se.onTriggerMessage({
            message: Ae.content,
            media: Ae.media,
            providerResId: Q || void 0,
            mcpHeaders: i
          })), Z(Ue.STREAMING);
          const We = setTimeout(() => {
            Te(!1), Z(Ue.ERROR), Ne(
              (He) => He.map(
                (q) => q.id === A ? {
                  ...q,
                  hasError: !0,
                  isRetrying: !1,
                  errorMessage: "No response received. Connection may be lost."
                } : q
              )
            ), he(!1), Z(Ue.IDLE), oe(_t.IDLE);
          }, 12e4);
          window.responseTimeoutId = We;
        } catch (We) {
          Te(!1), he(!1), Z(Ue.ERROR), oe(_t.IDLE), Ne(
            (He) => He.map(
              (q) => q.id === A ? {
                ...q,
                isRetrying: !1,
                hasError: !0,
                errorMessage: We instanceof Error ? We.message : "Retry failed. Please try again."
              } : q
            )
          ), Z(Ue.IDLE);
        }
      },
      [
        je,
        Ne,
        ii,
        an,
        Gn
      ]
    ), jt = ce(async () => {
      try {
        await an();
      } catch (A) {
        console.error("Failed to reconnect:", A);
      }
    }, [an]), Xn = Ze(
      () => ({
        onSubmit: Gn,
        onFileUpload: Ke,
        onStopGeneration: xn,
        onPromptSelect: qn,
        onRetryMessage: xt,
        onRetryConnection: jt
      }),
      [
        Gn,
        Ke,
        xn,
        qn,
        xt,
        jt
      ]
    ), Sr = Ze(
      () => ({
        ...In,
        ...Kn,
        ...Yn,
        ..._r,
        ...Xn,
        currentAssistantMessageIdRef: vt,
        messagesEndRef: Ce,
        chatInputRef: be
      }),
      [
        In,
        Kn,
        Yn,
        _r,
        Xn,
        vt,
        Ce,
        be
      ]
    );
    return Ze(
      () => Gt.state.shouldShowBubble(
        H,
        j,
        $
      ),
      [H, j, $]
    ) ? /* @__PURE__ */ p(Ss, { children: /* @__PURE__ */ p(
      Kh,
      {
        mode: H,
        headerName: a.headerName,
        bubbleText: a.bubbleText,
        showBubbleText: ((It = a.features) == null ? void 0 : It.showBubbleText) !== !1,
        onClick: ai
      }
    ) }) : /* @__PURE__ */ p(Ss, { children: /* @__PURE__ */ p(
      Bh,
      {
        onError: (A) => {
          a.onError && a.onError(A);
        },
        children: /* @__PURE__ */ O("div", { className: on, style: a.customStyles, children: [
          /* @__PURE__ */ p(
            y0,
            {
              isVisible: !M,
              isReconnecting: et === Je.RECONNECTING
            }
          ),
          Gt.state.shouldShowHeader(a.headerVisible) && /* @__PURE__ */ p(
            Yh,
            {
              headerName: a.headerName,
              mode: H,
              isCollapsed: $,
              isModalOpen: j,
              onClose: de,
              onToggleFullscreen: N,
              onToggleCollapse: G
            }
          ),
          !$ && /* @__PURE__ */ p(
            jh,
            {
              onError: (A) => {
                a.onError && a.onError(A);
              },
              children: /* @__PURE__ */ p(hu, { value: Sr, children: /* @__PURE__ */ p(m0, {}) })
            }
          )
        ] })
      }
    ) });
  }
);
Gl.displayName = "ChatWrapperInner";
const ql = Cr(
  (t, e) => {
    const { auth: n, chatServerUrl: r, chatServerKey: i, contextHelpers: a } = t, s = (a == null ? void 0 : a.locale) || "en";
    return /* @__PURE__ */ p(
      Ih,
      {
        locale: s,
        chatServerUrl: r,
        chatServerKey: i,
        mpAuthToken: n.token,
        children: /* @__PURE__ */ p(Gl, { ref: e, ...t })
      }
    );
  }
);
ql.displayName = "ChatWrapperContainer";
const H0 = Jr(ql);
function U0({
  isConnected: t,
  isConnecting: e = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 1 / 0,
  onRetry: a,
  autoHideDuration: s = 3e3
}) {
  const [o, l] = Re("hidden"), [u, c] = Re(!1);
  if (Fe(() => {
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
  return h ? o === "connecting" ? /* @__PURE__ */ p("div", { className: `connection-notification connection-notification--${o}`, children: /* @__PURE__ */ O("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ p("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ p("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ p("div", { className: "connection-notification__bubble" })
  ] }) }) : o === "reconnecting" ? /* @__PURE__ */ p("div", { className: `connection-notification connection-notification--banner connection-notification--${o}`, children: /* @__PURE__ */ O("div", { className: "connection-notification__banner-content", children: [
    /* @__PURE__ */ p("span", { className: "connection-notification__banner-spinner" }),
    /* @__PURE__ */ O("span", { className: "connection-notification__banner-text", children: [
      "Reconnecting... (attempt ",
      r,
      ")"
    ] })
  ] }) }) : /* @__PURE__ */ p("div", { className: `connection-notification connection-notification--${o}`, children: /* @__PURE__ */ O("div", { className: "connection-notification__content", children: [
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
  l0 as AnimatedPlaceholder,
  Ue as CHAT_STATUS,
  Vh as ChatIcon,
  f0 as ChatSkeleton,
  H0 as ChatWrapper,
  Zh as CloseIcon,
  Gh as CollapseIcon,
  du as ComponentRegistry,
  g0 as ConnectionError,
  U0 as ConnectionNotification,
  qh as CopyIcon,
  Jl as EntityType,
  Wh as FullscreenIcon,
  Hl as GenerativeComponentRenderer,
  h0 as InlineLoader,
  d0 as Loader,
  lt as PROCESSING_STATUS,
  r0 as PromptInput,
  s0 as PromptInputButton,
  L0 as PromptInputModelSelect,
  D0 as PromptInputModelSelectContent,
  F0 as PromptInputModelSelectItem,
  P0 as PromptInputModelSelectTrigger,
  z0 as PromptInputModelSelectValue,
  o0 as PromptInputSubmit,
  Wl as PromptInputTextarea,
  i0 as PromptInputToolbar,
  a0 as PromptInputTools,
  qm as Reasoning,
  zl as ReasoningContent,
  Fl as ReasoningTrigger,
  _t as STREAMING_STATUS,
  M0 as SettingsIcon,
  u0 as SuggestedPrompts,
  Ih as TranslationProvider,
  Ul as UnknownComponentFallback,
  $u as fetchThreadMessages,
  qo as fetchTranslations,
  Mi as isChatActive,
  S0 as isChatError,
  _0 as isChatIdle,
  b0 as isProcessingActive,
  v0 as isProcessingComplete,
  T0 as isProcessingError,
  Bu as updateThread,
  ju as updateThreadMetadata,
  gu as useChatActions,
  R0 as useChatState,
  I0 as useConversationState,
  fu as useGenerativeRender,
  A0 as useI18next,
  E0 as useLayoutState,
  N0 as useThreadState,
  gn as useTranslations,
  O0 as useUIState,
  ye as useUIStore
};
